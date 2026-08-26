#!/usr/bin/env node
/**
 * Gate de QA obligatorio antes de entregar cualquier LP.
 *
 *   npm run qa                      # todas las LPs del repo
 *   npm run qa -- --slug webinar-x  # solo una
 *   npm run qa -- --skip-build      # reutiliza el .next existente
 *
 * Verifica automáticamente las reglas marcadas 🤖 en memory/01-reglas-obligatorias.md
 * y deja screenshots reales en qa/ (390px y 1440px), que es lo que Pablo exige
 * ver antes de dar una LP por terminada (regla #11).
 *
 * Sale con código 1 si hay algún ERROR. Los WARN no bloquean.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

/** Puerto libre: evita choques con un servidor que haya quedado colgado. */
function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

const OUT = "qa";

const results = [];
const record = (slug, level, rule, msg) =>
  results.push({ slug, level, rule, msg });

/* ------------------------------------------------------------------ */
/* 1. Comprobaciones estáticas sobre el código fuente                  */
/* ------------------------------------------------------------------ */

function discoverPages() {
  const out = [];
  const walk = (dir, prefix) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
      if (entry.startsWith("_") || entry.startsWith("(") || entry === "api") continue;
      const full = path.join(dir, entry);
      if (!fs.statSync(full).isDirectory()) continue;
      const route = `${prefix}/${entry}`;
      if (fs.readdirSync(full).some((f) => f.startsWith("page."))) {
        out.push({ route, dir: full, slug: route.slice(1) });
      }
      walk(full, route);
    }
  };
  walk("app", "");
  return out;
}

function checkFonts() {
  const need = [
    "RundDisplay-Light.woff2",
    "RundDisplay-Regular.woff2",
    "RundDisplay-Medium.woff2",
    "RundDisplay-SemiBold.woff2",
  ];
  const missing = need.filter((f) => !fs.existsSync(path.join("public/fonts", f)));
  if (missing.length === need.length) {
    // Ninguna instalada: es setup del repo pendiente, no un defecto de la LP.
    record(
      "(global)",
      "WARN",
      "marca",
      "public/fonts/ está vacío: la LP cae a Trebuchet MS y no es fiel a marca. " +
        "Pide a Pablo los .woff2 de RundDisplay.",
    );
  } else if (missing.length) {
    // Instalación parcial: eso sí es un bug, faltarán pesos en producción.
    record(
      "(global)",
      "ERROR",
      "marca",
      `Instalación parcial de RundDisplay: faltan ${missing.join(", ")}.`,
    );
  }
}

function checkRootLayout() {
  const src = fs.readFileSync("app/layout.tsx", "utf8");
  if (!/index:\s*false/.test(src))
    record("(global)", "ERROR", "#1", "El layout raíz no fija robots index:false.");
  const deferred = fs.existsSync("components/DeferredScripts.tsx")
    ? fs.readFileSync("components/DeferredScripts.tsx", "utf8")
    : "";
  if (!/GTM-5B9S6LB/.test(deferred))
    record("(global)", "ERROR", "#2", "Falta el contenedor GTM-5B9S6LB.");
  if (!/hs-scripts\.com\/\$\{HUBSPOT_PORTAL\}|25912905/.test(deferred))
    record("(global)", "ERROR", "#3", "Falta el script de HubSpot 25912905.");
  if (!fs.existsSync("app/robots.ts"))
    record("(global)", "ERROR", "#1", "Falta app/robots.ts con Disallow: /.");
}

function checkSource(page) {
  const files = fs
    .readdirSync(page.dir)
    .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
  const src = files
    .map((f) => fs.readFileSync(path.join(page.dir, f), "utf8"))
    .join("\n");

  if (!/index:\s*false/.test(src))
    record(page.slug, "ERROR", "#1", "Sin robots index:false en su layout.");

  // CSS inline: decisión de Pablo — hoja externa, nunca inline.
  if (/<style[\s>]/.test(src))
    record(page.slug, "ERROR", "css", "Tiene un <style> inline. El CSS va en hoja externa.");
  const styleProps = [...src.matchAll(/style=\{\{([^}]*)\}\}/g)];
  for (const m of styleProps) {
    const props = m[1].split(",").filter((s) => s.trim()).length;
    if (props > 2)
      record(
        page.slug,
        "WARN",
        "css",
        `style={{…}} con ${props} propiedades. Muévelo a ${page.slug}.css.`,
      );
  }

  // Si hay un <form> propio, tiene que traer las piezas obligatorias.
  const usesLeadForm = /<LeadForm\b/.test(src);
  if (/<form\b/.test(src) && !usesLeadForm) {
    if (!/politica-de-privacidad/.test(src))
      record(page.slug, "ERROR", "#6", "Form sin enlace a la política de privacidad.");
    if (!/CountryPhoneField|country_lead/.test(src))
      record(page.slug, "ERROR", "#5", "Form sin selector de país ni prefijo.");
  }

  // Imágenes con dimensiones explícitas.
  for (const m of src.matchAll(/<(?:Image|img)\b([^>]*)>/g)) {
    const attrs = m[1];
    if (!/\bwidth[=\s]/.test(attrs) || !/\bheight[=\s]/.test(attrs))
      record(page.slug, "ERROR", "cls", "Imagen sin width/height explícitos (CLS).");
    if (!/\balt[=\s]/.test(attrs))
      record(page.slug, "ERROR", "a11y", "Imagen sin alt.");
  }

  const todos = (src.match(/TODO/g) ?? []).length;
  if (todos)
    record(page.slug, "WARN", "contenido", `${todos} TODO sin resolver.`);
}

/* ------------------------------------------------------------------ */
/* 2. Comprobaciones en navegador real                                 */
/* ------------------------------------------------------------------ */

function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("El servidor no ha arrancado en 60 s")),
      60_000,
    );
    const onData = (buf) => {
      if (/Ready|started server|Local:/i.test(String(buf))) {
        clearTimeout(timer);
        setTimeout(resolve, 700);
      }
    };
    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`El servidor ha salido con código ${code}`));
    });
  });
}

/**
 * Los entornos remotos de Claude Code traen un Chromium preinstalado que puede no
 * coincidir con el build que espera esta versión de Playwright. Si lo encontramos,
 * lo usamos; si no, dejamos que Playwright resuelva el suyo.
 */
function resolveChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const root = "/opt/pw-browsers";
  if (!fs.existsSync(root)) return undefined;
  for (const entry of fs.readdirSync(root).sort().reverse()) {
    if (!entry.startsWith("chromium-")) continue;
    const exe = path.join(root, entry, "chrome-linux", "chrome");
    if (fs.existsSync(exe)) return exe;
  }
  return undefined;
}

async function auditInBrowser(pages, BASE) {
  fs.mkdirSync(OUT, { recursive: true });
  const executablePath = resolveChromium();
  const browser = await chromium.launch(
    executablePath ? { executablePath } : {},
  );

  for (const page of pages) {
    for (const [label, width, height] of [
      ["390", 390, 844],
      ["1440", 1440, 900],
    ]) {
      const ctx = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 2,
      });
      const p = await ctx.newPage();
      const consoleErrors = [];
      p.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));

      const res = await p.goto(BASE + page.route, { waitUntil: "load" });
      if (!res || res.status() >= 400) {
        record(page.slug, "ERROR", "http", `${page.route} responde ${res?.status()}.`);
        await ctx.close();
        continue;
      }

      const audit = await p.evaluate(() => {
        const de = document.documentElement;
        // Solo objetivos táctiles reales: no el skip link, ni los checkbox/radio,
        // ni los enlaces en línea dentro de un texto.
        const smallTargets = [...document.querySelectorAll("a,button,input,select")]
          .filter((el) => {
            if (el.closest(".fz-skip")) return false;
            if (el instanceof HTMLInputElement && ["checkbox", "radio", "hidden"].includes(el.type))
              return false;
            const display = getComputedStyle(el).display;
            if (display === "inline" || display === "none" || display === "contents")
              return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && r.height < 44;
          })
          .map((el) => el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : ""));
        return {
          scrollWidth: de.scrollWidth,
          clientWidth: de.clientWidth,
          h1: document.querySelectorAll("h1").length,
          main: document.querySelectorAll("main").length,
          robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null,
          fontFamily: getComputedStyle(document.body).fontFamily,
          usingRund: document.fonts.check('16px RundDisplay'),
          smallTargets: [...new Set(smallTargets)].slice(0, 6),
          imgsNoDims: [...document.images].filter((i) => !i.getAttribute("width")).length,
          lowContrast: (() => {
            // Contraste WCAG AA. Se salta lo que va sobre imagen o gradiente,
            // donde no se puede calcular de forma fiable desde el DOM.
            const parse = (c) => {
              const m = c.match(/[\d.]+/g);
              if (!m) return null;
              return [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]];
            };
            const lum = ([r, g, b]) => {
              const f = (v) => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
              };
              return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
            };
            const ratio = (a, b) => {
              const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
              return (l1 + 0.05) / (l2 + 0.05);
            };
            const bgOf = (el) => {
              for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
                const cs = getComputedStyle(n);
                if (cs.backgroundImage !== "none") return "skip";
                const c = parse(cs.backgroundColor);
                if (c && c[3] > 0.95) return c;
              }
              const c = parse(getComputedStyle(document.body).backgroundColor);
              return c && c[3] > 0.95 ? c : [255, 255, 255, 1];
            };
            const out = [];
            const nodes = document.querySelectorAll(
              "p,li,span,a,label,h1,h2,h3,h4,h5,h6,button,small,strong,em,td,th",
            );
            for (const el of nodes) {
              const own = [...el.childNodes].some(
                (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
              );
              if (!own) continue;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "none") continue;
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) continue;
              const fg = parse(cs.color);
              const bg = bgOf(el);
              if (!fg || bg === "skip" || fg[3] < 0.95) continue;
              const size = parseFloat(cs.fontSize);
              const bold = +cs.fontWeight >= 700;
              const min = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
              const cr = ratio(fg, bg);
              if (cr < min) {
                out.push(
                  `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""} ` +
                    `${cr.toFixed(2)}:1 (min ${min}) — texto rgb(${fg.slice(0, 3)}) sobre rgb(${bg.slice(0, 3)})`,
                );
              }
            }
            return [...new Set(out)].slice(0, 6);
          })(),
        };
      });

      if (label === "390") {
        // Regla #11: nada de scroll horizontal a 390px.
        if (audit.scrollWidth > audit.clientWidth)
          record(
            page.slug,
            "ERROR",
            "#11",
            `Overflow horizontal a 390px: scrollWidth ${audit.scrollWidth} > clientWidth ${audit.clientWidth}. ` +
              "Revisa min-width:0 en hijos de grid y en inputs/selects.",
          );
        if (audit.h1 !== 1)
          record(page.slug, "ERROR", "a11y", `${audit.h1} elementos <h1> (debe haber exactamente 1).`);
        if (audit.main === 0)
          record(page.slug, "WARN", "a11y", "Sin landmark <main>.");
        if (!/noindex/.test(audit.robots ?? ""))
          record(page.slug, "ERROR", "#1", `meta robots = "${audit.robots}".`);
        if (!audit.usingRund)
          record(page.slug, "WARN", "marca", "RundDisplay no se ha cargado; se está usando el fallback.");
        if (audit.smallTargets.length)
          record(
            page.slug,
            "WARN",
            "pulgar",
            `Objetivos táctiles por debajo de 44px: ${audit.smallTargets.join(", ")}.`,
          );
        if (audit.imgsNoDims)
          record(page.slug, "ERROR", "cls", `${audit.imgsNoDims} imágenes sin width en el DOM.`);
        for (const c of audit.lowContrast)
          record(page.slug, "ERROR", "a11y", `Contraste por debajo de AA: ${c}.`);
        for (const e of consoleErrors.slice(0, 3))
          record(page.slug, "WARN", "consola", e.slice(0, 120));
      }

      const file = path.join(OUT, `${page.slug.replace(/\//g, "--")}-${label}.png`);
      await p.screenshot({ path: file, fullPage: true });
      await ctx.close();
    }
  }

  await browser.close();
}

/* ------------------------------------------------------------------ */
/* 3. Orquestación                                                     */
/* ------------------------------------------------------------------ */

function run(cmd, cmdArgs) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, cmdArgs, { stdio: "inherit" });
    p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`${cmd} → ${c}`))));
  });
}

const only = val("--slug");
let pages = discoverPages();
if (only) pages = pages.filter((p) => p.slug === only || p.route === `/${only}`);
if (!pages.length) {
  console.error(`\n✗ No hay LPs que auditar${only ? ` para "${only}"` : ""}.\n`);
  process.exit(1);
}

checkFonts();
checkRootLayout();
for (const p of pages) checkSource(p);

if (!has("--skip-build")) await run("npx", ["next", "build"]);

const PORT = await freePort();
const BASE = `http://127.0.0.1:${PORT}`;
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
});
try {
  await waitForServer(server);
  await auditInBrowser(pages, BASE);
} finally {
  server.kill("SIGTERM");
}

/* ------------------------------------------------------------------ */
/* Informe                                                             */
/* ------------------------------------------------------------------ */

const errors = results.filter((r) => r.level === "ERROR");
const warns = results.filter((r) => r.level === "WARN");

console.log("\n" + "=".repeat(74));
console.log(`QA de ${pages.length} LP(s): ${errors.length} errores, ${warns.length} avisos`);
console.log("=".repeat(74));
for (const r of [...errors, ...warns]) {
  const tag = r.level === "ERROR" ? "✗" : "!";
  console.log(`${tag} [${r.slug}] ${r.rule}: ${r.msg}`);
}
if (!results.length) console.log("✓ Todo limpio.");
console.log(`\nScreenshots en ${OUT}/ — revisa el de 390px antes de entregar.\n`);

process.exit(errors.length ? 1 : 0);
