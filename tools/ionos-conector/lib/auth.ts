// Servidor OAuth 2.1 mínimo y sin base de datos para que Claude pueda conectarse.
//
// Flujo: Claude abre /authorize → el usuario escribe CONNECTOR_PASSWORD → se devuelve
// un código (PKCE S256) → Claude lo canjea en /token por un access token de 1 h y un
// refresh token de 30 días. Todo va firmado con HMAC, así que no hace falta guardar nada.
// Cambiar TOKEN_SECRET o CONNECTOR_PASSWORD invalida todas las sesiones.

import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { AuthInfo } from "@modelcontextprotocol/server";
import { getPublicOrigin } from "mcp-handler";
import { config } from "./config.js";

const DURACION_CODIGO = 5 * 60;
const DURACION_ACCESO = 60 * 60;
const DURACION_REFRESCO = 30 * 24 * 60 * 60;

const REDIRECCIONES_CLAUDE = [
  "https://claude.ai/api/mcp/auth_callback",
  "https://claude.com/api/mcp/auth_callback",
];

type Tipo = "code" | "access" | "refresh";
interface Carga {
  typ: Tipo;
  exp: number;
  cid: string;
  aud: string;
  ru?: string;
  cc?: string;
}

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const ahora = () => Math.floor(Date.now() / 1000);

function clave(): Buffer {
  // Depende también de la contraseña: cambiarla cierra todas las sesiones abiertas.
  return createHmac("sha256", config.auth.secreto).update(config.auth.password).digest();
}

function firmar(carga: Carga): string {
  const cuerpo = b64url(JSON.stringify(carga));
  return `${cuerpo}.${b64url(createHmac("sha256", clave()).update(cuerpo).digest())}`;
}

function verificar(token: string | undefined, tipo: Tipo): Carga | null {
  if (!token) return null;
  const [cuerpo, firma] = token.split(".");
  if (!cuerpo || !firma) return null;
  const esperada = createHmac("sha256", clave()).update(cuerpo).digest();
  const recibida = Buffer.from(firma, "base64url");
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) return null;
  try {
    const carga = JSON.parse(Buffer.from(cuerpo, "base64url").toString()) as Carga;
    return carga.typ === tipo && carga.exp > ahora() ? carga : null;
  } catch {
    return null;
  }
}

function iguales(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function redireccionPermitida(uri: string): boolean {
  if ([...REDIRECCIONES_CLAUDE, ...config.auth.redireccionesExtra].includes(uri)) return true;
  try {
    // Claude Code y Claude Desktop usan una redirección local.
    const u = new URL(uri);
    return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

const recurso = (req: Request) => `${getPublicOrigin(req)}/mcp`;

const json = (datos: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(datos), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", "access-control-allow-origin": "*", ...extra },
  });

const errorOAuth = (error: string, descripcion: string, status = 400) =>
  json({ error, error_description: descripcion }, status);

export function metadatosServidor(req: Request): Response {
  const origen = getPublicOrigin(req);
  return json({
    issuer: origen,
    authorization_endpoint: `${origen}/authorize`,
    token_endpoint: `${origen}/token`,
    registration_endpoint: `${origen}/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    client_id_metadata_document_supported: true,
    scopes_supported: ["correo"],
  });
}

/** Registro dinámico de clientes (RFC 7591). No se guarda nada: se validan las redirecciones. */
export async function registrar(req: Request): Promise<Response> {
  const datos = (await req.json().catch(() => ({}))) as { redirect_uris?: string[] };
  const uris = datos.redirect_uris ?? [];
  if (!uris.length || !uris.every(redireccionPermitida)) {
    return errorOAuth("invalid_redirect_uri", "Redirección no permitida");
  }
  return json({
    ...datos,
    client_id: randomUUID(),
    client_id_issued_at: ahora(),
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
  }, 201);
}

const escapar = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function paginaLogin(params: URLSearchParams, error = ""): Response {
  const ocultos = ["client_id", "redirect_uri", "state", "code_challenge", "code_challenge_method", "resource", "scope"]
    .map(k => `<input type="hidden" name="${k}" value="${escapar(params.get(k) ?? "")}">`).join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Conectar correo</title>
<style>body{font-family:system-ui,sans-serif;background:#f4f4f8;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px}
form{background:#fff;padding:32px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.08);max-width:360px;width:100%}
h1{font-size:1.4rem;margin:0 0 8px}p{color:#555;margin:0 0 20px}input[type=password]{width:100%;padding:12px;border:1px solid #ccc;border-radius:8px;font-size:1rem;box-sizing:border-box}
button{margin-top:16px;width:100%;padding:14px;border:0;border-radius:100rem;background:#5045c8;color:#fff;font-size:1rem;cursor:pointer}
.error{color:#b00020;margin-top:12px}</style></head><body>
<form method="post" action="/authorize">${ocultos}
<h1>Conectar con Claude</h1><p>Escribe la contraseña del conector para dar acceso a tu correo.</p>
<input type="password" name="password" autocomplete="current-password" required autofocus aria-label="Contraseña">
<button type="submit">Dar acceso</button>${error ? `<p class="error">${escapar(error)}</p>` : ""}
</form></body></html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8", "x-frame-options": "DENY", "cache-control": "no-store" },
  });
}

function validarPeticion(p: URLSearchParams): string | null {
  if (!p.get("client_id")) return "Falta client_id";
  if (!redireccionPermitida(p.get("redirect_uri") ?? "")) return "Redirección no permitida";
  if (!p.get("code_challenge") || p.get("code_challenge_method") !== "S256") return "Se requiere PKCE S256";
  return null;
}

export async function autorizar(req: Request): Promise<Response> {
  if (req.method === "GET") {
    const p = new URL(req.url).searchParams;
    const error = validarPeticion(p);
    return error ? new Response(error, { status: 400 }) : paginaLogin(p);
  }

  const p = new URLSearchParams(await req.text());
  const error = validarPeticion(p);
  if (error) return new Response(error, { status: 400 });

  if (!iguales(p.get("password") ?? "", config.auth.password)) {
    await new Promise(r => setTimeout(r, 1500)); // frena intentos por fuerza bruta
    return paginaLogin(p, "Contraseña incorrecta");
  }

  const codigo = firmar({
    typ: "code",
    exp: ahora() + DURACION_CODIGO,
    cid: p.get("client_id")!,
    aud: recurso(req),
    ru: p.get("redirect_uri")!,
    cc: p.get("code_challenge")!,
  });
  const destino = new URL(p.get("redirect_uri")!);
  destino.searchParams.set("code", codigo);
  if (p.get("state")) destino.searchParams.set("state", p.get("state")!);
  return new Response(null, { status: 302, headers: { location: destino.toString() } });
}

function emitirTokens(cid: string, aud: string): Response {
  return json({
    access_token: firmar({ typ: "access", exp: ahora() + DURACION_ACCESO, cid, aud }),
    token_type: "Bearer",
    expires_in: DURACION_ACCESO,
    refresh_token: firmar({ typ: "refresh", exp: ahora() + DURACION_REFRESCO, cid, aud }),
    scope: "correo",
  });
}

export async function token(req: Request): Promise<Response> {
  const p = new URLSearchParams(await req.text());

  if (p.get("grant_type") === "authorization_code") {
    const codigo = verificar(p.get("code") ?? undefined, "code");
    if (!codigo) return errorOAuth("invalid_grant", "Código no válido o caducado");
    if (codigo.cid !== p.get("client_id") || codigo.ru !== p.get("redirect_uri")) {
      return errorOAuth("invalid_grant", "client_id o redirect_uri no coinciden");
    }
    const verificador = p.get("code_verifier") ?? "";
    const reto = createHash("sha256").update(verificador).digest("base64url");
    if (!verificador || !iguales(reto, codigo.cc ?? "")) return errorOAuth("invalid_grant", "PKCE no válido");
    return emitirTokens(codigo.cid, codigo.aud);
  }

  if (p.get("grant_type") === "refresh_token") {
    const refresco = verificar(p.get("refresh_token") ?? undefined, "refresh");
    if (!refresco) return errorOAuth("invalid_grant", "Refresh token no válido o caducado");
    return emitirTokens(refresco.cid, refresco.aud);
  }

  return errorOAuth("unsupported_grant_type", "Tipo de concesión no soportado");
}

/** Verificador de tokens para withMcpAuth. */
export function verificarAcceso(req: Request, bearer?: string): AuthInfo | undefined {
  const carga = verificar(bearer, "access");
  if (!carga || carga.aud !== recurso(req)) return undefined;
  return { token: bearer!, clientId: carga.cid, scopes: ["correo"], expiresAt: carga.exp };
}
