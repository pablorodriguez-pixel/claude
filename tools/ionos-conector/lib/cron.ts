// Tarea diaria: guarda en Drive las facturas de los últimos días sin que haya que pedirlo.
// Las que ya estén en Drive no se duplican, así que solapar días es seguro.

import { buscarFacturas, guardarEnDrive, type Candidata } from "./facturas.js";

const DIAS_ATRAS = 3;

export async function tareaDiaria() {
  const desde = new Date(Date.now() - DIAS_ATRAS * 86_400_000).toISOString().slice(0, 10);
  const candidatas: Candidata[] = [];
  let cursor: number | undefined;
  do {
    const pagina = await buscarFacturas("INBOX", { desde }, 200, cursor);
    candidatas.push(...pagina.candidatas);
    cursor = pagina.siguiente_cursor;
  } while (cursor);

  const aGuardar = candidatas
    .filter(c => c.clase !== "por_enlace")
    .map(c => ({ uid: c.uid, destino: c.clase === "factura" ? "Facturas" as const : "Por revisar" as const }));

  const guardadas = [];
  for (let i = 0; i < aGuardar.length; i += 10) {
    guardadas.push(...await guardarEnDrive("INBOX", aGuardar.slice(i, i + 10)));
  }
  return {
    desde,
    guardadas,
    por_enlace: candidatas.filter(c => c.clase === "por_enlace").map(({ uid, de, asunto, enlaces }) => ({ uid, de, asunto, enlaces })),
  };
}
