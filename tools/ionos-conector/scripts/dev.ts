// Servidor local para probar el conector: `npm run dev` (lee las variables de .env.local).
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { manejar } from "../api/main.js";

if (existsSync(".env.local")) {
  for (const linea of readFileSync(".env.local", "utf8").split("\n")) {
    const m = linea.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const puerto = Number(process.env.PORT || 3000);
createServer(async (req, res) => {
  const cuerpo = req.method === "GET" || req.method === "HEAD" ? undefined : await new Promise<Buffer>(ok => {
    const trozos: Buffer[] = [];
    req.on("data", t => trozos.push(t)).on("end", () => ok(Buffer.concat(trozos)));
  });
  const peticion = new Request(`http://localhost:${puerto}${req.url}`, {
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: cuerpo ? new Uint8Array(cuerpo) : undefined,
  });
  const respuesta = await manejar(peticion);
  res.writeHead(respuesta.status, Object.fromEntries(respuesta.headers));
  res.end(Buffer.from(await respuesta.arrayBuffer()));
}).listen(puerto, () => console.log(`Conector en http://localhost:${puerto}/mcp`));
