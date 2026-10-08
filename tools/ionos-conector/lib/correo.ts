// Acceso de SOLO LECTURA al buzón de IONOS por IMAP.
// Las carpetas se abren en modo readOnly: no se marcan correos como leídos ni se borra nada.

import { ImapFlow, type FetchMessageObject, type MessageStructureObject } from "imapflow";
import { simpleParser, type ParsedMail } from "mailparser";
import { config } from "./config.js";

/** Bytes que se leen de cada correo al revisarlo en bloque (el texto suele ir al principio). */
const BYTES_VISTA_PREVIA = 120_000;

export interface Adjunto {
  nombre: string;
  tipo: string;
  tamano: number;
}

export interface ResumenCorreo {
  uid: number;
  fecha: string;
  de: string;
  para: string;
  asunto: string;
  adjuntos: Adjunto[];
  texto: string;
  html: string;
}

async function conectar(): Promise<ImapFlow> {
  const cliente = new ImapFlow({
    host: config.imap.host,
    port: config.imap.port,
    secure: config.imap.secure,
    auth: { user: config.imap.usuario, pass: config.imap.password },
    logger: false,
    disableAutoIdle: true,
  });
  await cliente.connect();
  return cliente;
}

/** Abre una carpeta en solo lectura, ejecuta fn y cierra la conexión. */
export async function conCarpeta<T>(carpeta: string, fn: (c: ImapFlow) => Promise<T>): Promise<T> {
  const cliente = await conectar();
  try {
    const bloqueo = await cliente.getMailboxLock(carpeta, { readOnly: true });
    try {
      return await fn(cliente);
    } finally {
      bloqueo.release();
    }
  } finally {
    await cliente.logout().catch(() => {});
  }
}

export async function listarCarpetas(): Promise<{ ruta: string; nombre: string; especial?: string }[]> {
  const cliente = await conectar();
  try {
    const lista = await cliente.list();
    return lista.map(c => ({ ruta: c.path, nombre: c.name, especial: c.specialUse || undefined }));
  } finally {
    await cliente.logout().catch(() => {});
  }
}

export interface Filtro {
  desde?: string;
  hasta?: string;
  remitente?: string;
  texto?: string;
}

const aFecha = (s: string) => new Date(`${s}T00:00:00Z`);

/** UIDs que cumplen el filtro, del más reciente al más antiguo. */
export async function buscarUids(c: ImapFlow, f: Filtro): Promise<number[]> {
  const criterio: Record<string, unknown> = {};
  if (f.desde) criterio.since = aFecha(f.desde);
  if (f.hasta) criterio.before = aFecha(f.hasta);
  if (f.remitente) criterio.from = f.remitente;
  if (f.texto) criterio.text = f.texto;
  if (!Object.keys(criterio).length) criterio.all = true;
  const uids = await c.search(criterio, { uid: true });
  return (uids || []).sort((a, b) => b - a);
}

/** Recorre la estructura MIME y devuelve los adjuntos sin descargarlos. */
export function adjuntosDeEstructura(nodo?: MessageStructureObject): Adjunto[] {
  if (!nodo) return [];
  if (nodo.childNodes?.length) return nodo.childNodes.flatMap(adjuntosDeEstructura);
  const nombre = nodo.dispositionParameters?.filename || nodo.parameters?.name;
  const esAdjunto = nodo.disposition === "attachment" || (nombre && !nodo.type.startsWith("text/"));
  if (!esAdjunto) return [];
  return [{ nombre: nombre || "sin_nombre", tipo: nodo.type, tamano: nodo.size ?? 0 }];
}

const direccion = (lista?: { name?: string; address?: string }[]) =>
  (lista ?? []).map(a => (a.name ? `${a.name} <${a.address}>` : a.address ?? "")).join(", ");

function aResumen(m: FetchMessageObject, parseado?: ParsedMail): ResumenCorreo {
  return {
    uid: m.uid,
    fecha: new Date(m.envelope?.date ?? m.internalDate ?? Date.now()).toISOString(),
    de: direccion(m.envelope?.from),
    para: direccion(m.envelope?.to),
    asunto: m.envelope?.subject ?? "",
    adjuntos: adjuntosDeEstructura(m.bodyStructure),
    texto: (parseado?.text ?? "").trim(),
    html: typeof parseado?.html === "string" ? parseado.html : "",
  };
}

/** Cabeceras, adjuntos y principio del texto de varios correos en una sola petición IMAP. */
export async function vistaPrevia(c: ImapFlow, uids: number[]): Promise<ResumenCorreo[]> {
  if (!uids.length) return [];
  const resultado: ResumenCorreo[] = [];
  for await (const m of c.fetch(uids, {
    uid: true, envelope: true, internalDate: true, bodyStructure: true,
    source: { maxLength: BYTES_VISTA_PREVIA },
  }, { uid: true })) {
    const parseado = m.source ? await simpleParser(m.source).catch(() => undefined) : undefined;
    resultado.push(aResumen(m, parseado));
  }
  return resultado.sort((a, b) => b.uid - a.uid);
}

/** Correo completo, incluidos los adjuntos con su contenido. */
export async function correoCompleto(c: ImapFlow, uid: number): Promise<{ resumen: ResumenCorreo; parseado: ParsedMail } | null> {
  const m = await c.fetchOne(String(uid), { uid: true, envelope: true, internalDate: true, bodyStructure: true, source: true }, { uid: true });
  if (!m || !m.source) return null;
  const parseado = await simpleParser(m.source);
  return { resumen: aResumen(m, parseado), parseado };
}
