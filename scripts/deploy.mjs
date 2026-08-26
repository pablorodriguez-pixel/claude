#!/usr/bin/env node
/**
 * Deploy a Vercel por REST API — sin CLI y sin depender del git integration.
 *
 *   npm run deploy              → preview
 *   npm run deploy:prod         → producción (con guardia, ver abajo)
 *   npm run deploy -- --project founderz-lp-lab   → otro proyecto
 *
 * Necesita VERCEL_TOKEN (en el entorno o en .env.local, que está gitignored).
 *
 * ── GUARDIA DE PRODUCCIÓN ──────────────────────────────────────────────────
 * ia.founderz.com sirve 25 LPs cuyo fuente NO está en este repo. Un deploy a
 * producción desde aquí las borraría. El script compara las rutas del repo
 * contra refs/production-routes.json y aborta si falta alguna.
 * La solución correcta NO es saltarse esto: es subir a este repo el fuente de
 * founderz-vsl-lp.
 *
 * ── NOTA SOBRE SESIONES DE CLAUDE CODE EN WEB ─────────────────────────────
 * api.vercel.com está fuera de la política de egress del entorno remoto (403 en
 * el CONNECT del proxy). Desde una sesión web este script no puede conectar:
 * hay que desplegar con el MCP de Vercel, o añadir api.vercel.com a la allowlist
 * del environment. En local y en CI funciona con normalidad.
 */
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const API = "https://api.vercel.com";
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};

/* ---------------------------------------------------------------- config */

function loadEnvLocal() {
  if (!fs.existsSync(".env.local")) return;
  for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnvLocal();

const prod = JSON.parse(fs.readFileSync("refs/production-routes.json", "utf8"));
const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID ?? prod.teamId;
const PROJECT = val("--project", prod.project);
const IS_PROD = has("--prod");

if (!TOKEN) {
  console.error(
    "\n✗ Falta VERCEL_TOKEN.\n" +
      "  Ponlo en .env.local (gitignored) o expórtalo en el entorno.\n",
  );
  process.exit(1);
}

/* ------------------------------------------------- guardia de producción */

function discoverRoutes() {
  const out = new Set();
  const walk = (dir, prefix) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
      if (entry.startsWith("_") || entry.startsWith("(")) continue;
      const full = path.join(dir, entry);
      if (!fs.statSync(full).isDirectory()) continue;
      const route = `${prefix}/${entry}`;
      const files = fs.readdirSync(full);
      if (files.some((f) => f.startsWith("page."))) out.add(route);
      if (files.some((f) => f.startsWith("route."))) out.add(route);
      walk(full, route);
    }
  };
  walk("app", "");
  if (fs.existsSync("app/page.tsx")) out.add("/");
  return out;
}

if (IS_PROD && PROJECT === prod.project) {
  const have = discoverRoutes();
  const missing = prod.pages.filter((r) => !have.has(r));
  if (missing.length) {
    console.error(
      `\n✗ DEPLOY A PRODUCCIÓN ABORTADO.\n\n` +
        `  ${PROJECT} sirve ${prod.productionDomain}, con ${prod.pages.length} LPs vivas.\n` +
        `  A este repo le faltan ${missing.length} de ellas:\n\n` +
        missing.map((r) => `    ${r}`).join("\n") +
        `\n\n  Desplegar ahora las borraría de producción.\n` +
        `  Arreglo correcto: subir a este repo el fuente de founderz-vsl-lp.\n` +
        `  Mientras tanto, usa 'npm run deploy' (preview) o --project con otro proyecto.\n`,
    );
    process.exit(1);
  }
}

/* ------------------------------------------------------------------ build */

function run(cmd, cmdArgs) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, cmdArgs, { stdio: "inherit" });
    p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`${cmd} → ${c}`))));
  });
}

if (!has("--skip-build")) {
  console.log("→ Comprobando que compila antes de subir nada…");
  await run("npx", ["next", "build"]);
}

/* ------------------------------------------------------- recogida de files */

const INCLUDE = [
  "app",
  "components",
  "lib",
  "styles",
  "public",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "postcss.config.mjs",
  "tsconfig.json",
];
const EXCLUDE = /(^|\/)(node_modules|\.next|\.git|qa|dist|\.env(\..*)?|\.DS_Store)(\/|$)/;

function collect(target, acc = []) {
  if (!fs.existsSync(target) || EXCLUDE.test(target)) return acc;
  const st = fs.statSync(target);
  if (st.isDirectory()) {
    for (const e of fs.readdirSync(target)) collect(path.join(target, e), acc);
  } else {
    acc.push(target);
  }
  return acc;
}

const files = INCLUDE.flatMap((t) => collect(t));
if (!files.length) {
  console.error("\n✗ No hay ficheros que subir.\n");
  process.exit(1);
}

/* --------------------------------------------------------------- API calls */

async function api(pathname, init = {}) {
  const url = new URL(API + pathname);
  if (TEAM) url.searchParams.set("teamId", TEAM);
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const msg = body?.error?.message ?? body?.raw ?? res.statusText;
    throw new Error(`${res.status} ${pathname} — ${msg}`);
  }
  return body;
}

console.log(`→ Subiendo ${files.length} ficheros a ${PROJECT}…`);

const manifest = [];
let uploaded = 0;
for (const file of files) {
  const data = fs.readFileSync(file);
  const sha = createHash("sha1").update(data).digest("hex");
  manifest.push({ file: file.split(path.sep).join("/"), sha, size: data.length });

  // /v2/files es idempotente: si el blob ya existe responde 200 sin re-subir.
  await api("/v2/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "x-vercel-digest": sha,
      "Content-Length": String(data.length),
    },
    body: data,
  });
  uploaded++;
  if (uploaded % 25 === 0) console.log(`   ${uploaded}/${files.length}`);
}

console.log(`→ Creando deployment (${IS_PROD ? "producción" : "preview"})…`);

const deployment = await api("/v13/deployments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: PROJECT,
    project: PROJECT,
    files: manifest,
    ...(IS_PROD ? { target: "production" } : {}),
    projectSettings: { framework: "nextjs" },
  }),
});

console.log(`  id:  ${deployment.id}`);
console.log(`  url: https://${deployment.url}`);

/* ------------------------------------------------------------------ espera */

const DEADLINE = Date.now() + 10 * 60_000;
let state = deployment.readyState ?? deployment.status;
while (!["READY", "ERROR", "CANCELED"].includes(state)) {
  if (Date.now() > DEADLINE) {
    console.error("\n✗ Timeout esperando el build. Revísalo en el dashboard.\n");
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 4000));
  const d = await api(`/v13/deployments/${deployment.id}`);
  const next = d.readyState ?? d.status;
  if (next !== state) console.log(`  ${next}`);
  state = next;
}

if (state !== "READY") {
  console.error(`\n✗ El deployment terminó en ${state}.`);
  console.error(`  Logs: https://vercel.com/${PROJECT}/${deployment.id}\n`);
  process.exit(1);
}

console.log(`\n✓ Listo: https://${deployment.url}`);
if (IS_PROD) console.log(`  Producción: https://${prod.productionDomain}\n`);
else console.log("  Es un preview. Para producción: npm run deploy:prod\n");
