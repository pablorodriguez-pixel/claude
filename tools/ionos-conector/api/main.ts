// Punto de entrada único. vercel.json reescribe todas las rutas aquí con ?ruta=...

import { timingSafeEqual } from "node:crypto";
import { createMcpHandler, metadataCorsOptionsRequestHandler, protectedResourceHandler, withMcpAuth, getPublicOrigin } from "mcp-handler";
import { autorizar, metadatosServidor, registrar, token, verificarAcceso } from "../lib/auth.js";
import { config } from "../lib/config.js";
import { tareaDiaria } from "../lib/cron.js";
import { registrarHerramientas } from "../lib/mcp.js";

const mcp = withMcpAuth(
  createMcpHandler(registrarHerramientas, { serverInfo: { name: "correo-ionos", version: "1.0.0" } }),
  verificarAcceso,
  { required: true },
);

function ruta(req: Request): string {
  const url = new URL(req.url);
  const r = url.searchParams.get("ruta") ?? url.pathname.replace(/^\/api\/main/, "");
  return `/${r.replace(/^\/+|\/+$/g, "")}`;
}

function cronAutorizado(req: Request): boolean {
  const esperado = config.cronSecret;
  const recibido = req.headers.get("authorization") ?? "";
  if (!esperado) return false;
  const a = Buffer.from(recibido), b = Buffer.from(`Bearer ${esperado}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function manejar(req: Request): Promise<Response> {
  const r = ruta(req);
  try {
    if (req.method === "OPTIONS" && r.startsWith("/.well-known")) return metadataCorsOptionsRequestHandler()();

    switch (r) {
      case "/":
        return new Response("Conector de correo IONOS para Claude. Añade esta URL terminada en /mcp como conector personalizado.");
      case "/mcp":
        return mcp(req);
      case "/.well-known/oauth-protected-resource":
      case "/.well-known/oauth-protected-resource/mcp":
        return protectedResourceHandler({
          authServerUrls: [getPublicOrigin(req)],
          resourceUrl: `${getPublicOrigin(req)}/mcp`,
        })(req);
      case "/.well-known/oauth-authorization-server":
      case "/.well-known/oauth-authorization-server/mcp":
      case "/.well-known/openid-configuration":
        return metadatosServidor(req);
      case "/register":
        return req.method === "POST" ? registrar(req) : new Response(null, { status: 405 });
      case "/authorize":
        return autorizar(req);
      case "/token":
        return req.method === "POST" ? token(req) : new Response(null, { status: 405 });
      case "/cron":
        if (!cronAutorizado(req)) return new Response("No autorizado", { status: 401 });
        return Response.json(await tareaDiaria());
      default:
        return new Response("No encontrado", { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return new Response(`Error: ${e instanceof Error ? e.message : e}`, { status: 500 });
  }
}

export default { fetch: manejar };
