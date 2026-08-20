#!/usr/bin/env node
/**
 * Recoge en refs/lps/ el HTML de las LPs de producción descargadas con el MCP de
 * Vercel (`web_fetch_vercel_url`), que guarda cada respuesta en un fichero de
 * resultados de la sesión. Identifica la ruta por la cabecera `x-matched-path`,
 * así que no importa el orden en que se descargaron.
 *
 *   node scripts/_collect.mjs [directorio-de-tool-results]
 *
 * Por defecto busca en el directorio de resultados de la sesión actual de Claude
 * Code. Después, `npm run corpus` regenera refs/lp-corpus.json.
 *
 * Se necesita porque founderz.com está fuera de la política de egress de los
 * entornos remotos: no se puede hacer curl directo.
 */
import fs from "node:fs";
import path from "node:path";

const DEFAULT_GLOB = path.join(
  process.env.HOME ?? "/root",
  ".claude/projects",
);

function findResultDirs(root) {
  const out = [];
  const walk = (dir, depth) => {
    if (depth > 3 || !fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir)) {
      const full = path.join(dir, e);
      if (!fs.statSync(full).isDirectory()) continue;
      if (e === "tool-results") out.push(full);
      else walk(full, depth + 1);
    }
  };
  walk(root, 0);
  return out;
}

const arg = process.argv[2];
const dirs = arg ? [arg] : findResultDirs(DEFAULT_GLOB);
const OUT = "refs/lps";
fs.mkdirSync(OUT, { recursive: true });

let n = 0;
for (const dir of dirs) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.includes("web_fetch_vercel_url")) continue;
    let j;
    try {
      j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    } catch {
      continue;
    }
    if (!j.success || !j.text) continue;
    const route = j.headers?.["x-matched-path"];
    if (!route) continue;
    const slug = route === "/" ? "root" : route.replace(/^\//, "").replace(/\//g, "--");
    fs.writeFileSync(path.join(OUT, `${slug}.html`), j.text);
    n++;
  }
}

console.log(`${n} respuestas → ${OUT}/`);
if (!n) console.log("Nada recogido. Pasa el directorio de tool-results como argumento.");
