#!/usr/bin/env node
/**
 * Comprueba qué hosts alcanza esta sesión.
 *
 *   npm run egress
 *
 * Los entornos remotos de Claude Code sacan todo el HTTPS por un proxy con
 * allowlist, fijada al crear el contenedor. Si la allowlist del environment
 * cambia, hay que abrir una sesión NUEVA: la que ya está corriendo mantiene la
 * política con la que arrancó.
 *
 * Ejecuta esto al empezar una sesión para saber de entrada qué puede hacer el
 * agente por sí solo y qué tiene que pedir.
 */
const TARGETS = [
  ["api.vercel.com", "Deploy por REST API, logs de build, estado del proyecto"],
  ["founderz.com", "Descargar imágenes de WP para servirlas locales (perf)"],
  ["ia.founderz.com", "Verificar la LP desplegada y leer el corpus"],
  ["pagespeedonline.googleapis.com", "Medir el PSI >= 98 de una URL de producción"],
  ["api.hubapi.com", "Form IDs y propiedades de deal sin preguntar"],
  ["sheets.googleapis.com", "Sheet landing_slug -> programa (regla #8)"],
  ["api.github.com", "Push y PRs"],
  ["registry.npmjs.org", "npm install"],
];

const TIMEOUT_MS = 12_000;

/**
 * Ojo con el falso positivo: cuando el proxy deniega el CONNECT, fetch no lanza
 * — devuelve el 403 *del proxy* como si fuera la respuesta del host. Un simple
 * `res.status` marcaría como alcanzable un host bloqueado. Hay que mirar el
 * cuerpo: el gateway responde texto plano con "Host not in allowlist".
 */
function isProxyDenial(status, body) {
  return status === 403 && /not in allowlist|policy denial/i.test(body);
}

async function probe(host) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`https://${host}/`, {
      method: "GET",
      signal: ac.signal,
      redirect: "manual",
      headers: { "User-Agent": "founderz-lp-generator/egress-check" },
    });
    const body = (await res.text()).slice(0, 300);
    if (isProxyDenial(res.status, body)) {
      return { ok: false, detail: "bloqueado por el proxy (allowlist)" };
    }
    return { ok: true, detail: `HTTP ${res.status}` };
  } catch (err) {
    const msg = String(err?.cause?.message ?? err?.message ?? err);
    if (/abort/i.test(msg)) return { ok: false, detail: "timeout" };
    return { ok: false, detail: msg.slice(0, 60) };
  } finally {
    clearTimeout(t);
  }
}

const results = await Promise.all(
  TARGETS.map(async ([host, why]) => ({ host, why, ...(await probe(host)) })),
);

const w = Math.max(...results.map((r) => r.host.length));
console.log("");
for (const r of results) {
  console.log(
    `${r.ok ? "✓" : "✗"} ${r.host.padEnd(w)}  ${r.detail.padEnd(34)} ${r.why}`,
  );
}

const blocked = results.filter((r) => !r.ok);
console.log("");
if (!blocked.length) {
  console.log("Todos los hosts alcanzables: el agente puede cerrar el ciclo solo.");
} else {
  console.log(
    `${blocked.length} host(s) fuera de la allowlist: ${blocked.map((r) => r.host).join(", ")}`,
  );
  console.log(
    "Se añaden en la política de red del environment (Claude Code en web) y\n" +
      "requieren abrir una sesión nueva para que apliquen.",
  );
}
