#!/usr/bin/env node
/**
 * Comprueba qué hosts alcanza esta sesión.
 *
 *   npm run egress
 *
 * Los entornos remotos de Claude Code sacan el HTTPS por el proxy de
 * HTTPS_PROXY, que aplica la allowlist del environment. Un cambio en esa
 * allowlist no llega a las sesiones ya abiertas: el contenedor tiene que
 * reciclarse para recogerlo.
 *
 * IMPORTANTE — el fetch de Node NO usa HTTPS_PROXY por defecto (undici ignora
 * las variables de proxy). Sin proxy, la petición sale por una interceptación
 * transparente que aplica una allowlist DISTINTA y más antigua, y devuelve
 * "Host not in allowlist" para hosts que por el proxy sí pasan. Eso daba falsos
 * negativos: el script marcaba api.vercel.com como bloqueado mientras curl
 * recibía 200. Se arregla con NODE_USE_ENV_PROXY=1, que activa el
 * EnvHttpProxyAgent de undici; si no está puesta, el script se relanza solo.
 *
 * Ejecuta esto al empezar una sesión para saber de entrada qué puede hacer el
 * agente por sí solo y qué tiene que pedir.
 */

// Relanzarse con el proxy activado antes de que undici se inicialice.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const { spawnSync } = await import("node:child_process");
  const r = spawnSync(process.execPath, [...process.argv.slice(1)], {
    stdio: "inherit",
    env: { ...process.env, NODE_USE_ENV_PROXY: "1", NODE_NO_WARNINGS: "1" },
  });
  process.exit(r.status ?? 1);
}
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
 * Ojo con el falso positivo: cuando el gateway deniega el host, fetch no lanza
 * — devuelve el 403 *del gateway* como si fuera la respuesta del host. Un simple
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
