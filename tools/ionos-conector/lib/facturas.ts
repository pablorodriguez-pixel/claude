// Detección de facturas y subida a Google Drive (a través del Apps Script receptor).

import { config } from "./config.js";
import { buscarUids, conCarpeta, correoCompleto, vistaPrevia, type Filtro, type ResumenCorreo } from "./correo.js";

const PISTAS = [
  "factura", "fra.", "invoice", "recibo", "receipt", "rechnung", "facture",
  "iva", "nif", "cif", "base imponible", "importe", "total a pagar", "billing",
];
const PISTAS_ENLACE = /factura|invoice|recibo|receipt|descarga|download|bill|ver (mi|tu) factura/i;
const EXTENSIONES = /\.(pdf|xml|xsig)$/i;

export type Clase = "factura" | "dudosa" | "por_enlace";

export interface Candidata {
  uid: number;
  clase: Clase;
  fecha: string;
  de: string;
  asunto: string;
  adjuntos: string[];
  enlaces?: string[];
  pistas: string[];
}

function pistasEn(texto: string): string[] {
  const t = texto.toLowerCase();
  return PISTAS.filter(p => new RegExp(`(^|[^a-záéíóúñ])${p.replace(".", "\\.")}`).test(t));
}

function enlacesDeFactura(html: string, texto: string): string[] {
  const enlaces = new Set<string>();
  for (const [, url, ancla] of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const textoAncla = ancla.replace(/<[^>]+>/g, " ");
    if (url.startsWith("http") && (PISTAS_ENLACE.test(textoAncla) || PISTAS_ENLACE.test(url))) enlaces.add(url);
  }
  for (const [url] of texto.matchAll(/https?:\/\/[^\s<>"')\]]+/g)) {
    if (PISTAS_ENLACE.test(url)) enlaces.add(url);
  }
  return [...enlaces].slice(0, 5);
}

export function clasificar(c: ResumenCorreo): Candidata | null {
  const adjuntos = c.adjuntos.filter(a => EXTENSIONES.test(a.nombre) || a.tipo === "application/pdf").map(a => a.nombre);
  const pistas = [...new Set(pistasEn(`${c.asunto} ${c.de} ${c.texto.slice(0, 8000)} ${adjuntos.join(" ")}`))];
  const base = { uid: c.uid, fecha: c.fecha, de: c.de, asunto: c.asunto, adjuntos, pistas };

  if (adjuntos.length) return { ...base, clase: pistas.length ? "factura" : "dudosa" };
  if (pistas.length) {
    const enlaces = enlacesDeFactura(c.html, c.texto);
    if (enlaces.length) return { ...base, clase: "por_enlace", enlaces };
  }
  return null;
}

export interface PaginaFacturas {
  carpeta: string;
  revisados: number;
  total_en_rango: number;
  candidatas: Candidata[];
  siguiente_cursor?: number;
}

/** Revisa una página de correos (del más reciente al más antiguo) buscando facturas. */
export async function buscarFacturas(carpeta: string, filtro: Filtro, porPagina: number, cursor?: number): Promise<PaginaFacturas> {
  return conCarpeta(carpeta, async c => {
    const todos = await buscarUids(c, filtro);
    const pendientes = cursor ? todos.filter(u => u < cursor) : todos;
    const pagina = pendientes.slice(0, porPagina);
    const correos = await vistaPrevia(c, pagina);
    return {
      carpeta,
      revisados: pagina.length,
      total_en_rango: todos.length,
      candidatas: correos.map(clasificar).filter((x): x is Candidata => x !== null),
      siguiente_cursor: pendientes.length > porPagina ? pagina[pagina.length - 1] : undefined,
    };
  });
}

function fechaLocal(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: config.zonaHoraria }).format(new Date(iso));
}

const limpiar = (s: string, max = 60) =>
  s.normalize("NFC").replace(/[^\p{L}\p{N}._-]+/gu, "_").replace(/^[._]+|[._]+$/g, "").slice(0, max) || "sin_nombre";

function dominio(de: string): string {
  const m = de.match(/@([^>\s]+)/);
  return m ? m[1].toLowerCase() : de;
}

async function enviarADrive(datos: { ruta: string; nombre: string; mime: string; base64: string; descripcion: string }) {
  const res = await fetch(config.drive.url, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" }, // Apps Script no exige preflight con text/plain
    body: JSON.stringify({ secreto: config.drive.secreto, ...datos }),
    redirect: "follow",
  });
  const texto = await res.text();
  try {
    return JSON.parse(texto) as { estado: "creado" | "ya_existia" | "error"; url?: string; mensaje?: string };
  } catch {
    return { estado: "error" as const, mensaje: `Respuesta inesperada de Google (${res.status}). ¿Está bien publicada la app web?` };
  }
}

export interface PeticionGuardar {
  uid: number;
  adjunto?: string;
  destino?: "Facturas" | "Por revisar";
}

export interface ResultadoGuardar {
  uid: number;
  archivo?: string;
  estado: string;
  url?: string;
  mensaje?: string;
}

/** Descarga los PDF/XML de los correos indicados y los guarda en Drive/<destino>/<AAAA-MM>/. */
export async function guardarEnDrive(carpeta: string, peticiones: PeticionGuardar[]): Promise<ResultadoGuardar[]> {
  return conCarpeta(carpeta, async c => {
    const resultados: ResultadoGuardar[] = [];
    for (const p of peticiones) {
      const correo = await correoCompleto(c, p.uid);
      if (!correo) {
        resultados.push({ uid: p.uid, estado: "error", mensaje: "Correo no encontrado" });
        continue;
      }
      const { resumen, parseado } = correo;
      const adjuntos = parseado.attachments.filter(a =>
        (EXTENSIONES.test(a.filename ?? "") || a.contentType === "application/pdf") &&
        (!p.adjunto || a.filename === p.adjunto));
      if (!adjuntos.length) {
        resultados.push({ uid: p.uid, estado: "error", mensaje: "El correo no tiene PDF/XML adjuntos (o el nombre no coincide)" });
        continue;
      }
      const fecha = fechaLocal(resumen.fecha);
      for (const a of adjuntos) {
        const original = a.filename || "factura.pdf";
        const extension = (original.match(/\.[^.]+$/)?.[0] ?? ".pdf").toLowerCase();
        const nombre = `${fecha}_${limpiar(dominio(resumen.de), 40)}_${limpiar(original.replace(/\.[^.]+$/, ""))}${extension}`;
        const r = await enviarADrive({
          ruta: `${p.destino ?? "Facturas"}/${fecha.slice(0, 7)}`,
          nombre,
          mime: a.contentType || "application/octet-stream",
          base64: a.content.toString("base64"),
          descripcion: `De: ${resumen.de}\nAsunto: ${resumen.asunto}\nFecha: ${resumen.fecha}`,
        });
        resultados.push({ uid: p.uid, archivo: nombre, ...r });
      }
    }
    return resultados;
  });
}
