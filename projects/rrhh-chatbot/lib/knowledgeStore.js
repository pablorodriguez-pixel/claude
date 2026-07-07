import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "knowledge.json");

// Budget of characters sent to Claude as context per request. Keeps the
// system prompt within a sane size regardless of how much se ha subido.
const MAX_CONTEXT_CHARS = 60000;
const MAX_ITEM_CHARS = 20000;

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_FILE);
  } catch {
    await fs.writeFile(STORE_FILE, "[]", "utf-8");
  }
}

export async function listKnowledge() {
  await ensureStore();
  const raw = await fs.readFile(STORE_FILE, "utf-8");
  const items = JSON.parse(raw);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addKnowledge({ title, content, sourceType, sourceName }) {
  if (!title?.trim() || !content?.trim()) {
    throw new Error("El documento necesita título y contenido.");
  }
  await ensureStore();
  const items = JSON.parse(await fs.readFile(STORE_FILE, "utf-8"));
  const item = {
    id: crypto.randomUUID(),
    title: title.trim(),
    content: content.trim().slice(0, MAX_ITEM_CHARS),
    sourceType: sourceType || "text",
    sourceName: sourceName || null,
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  await fs.writeFile(STORE_FILE, JSON.stringify(items, null, 2), "utf-8");
  return item;
}

export async function deleteKnowledge(id) {
  await ensureStore();
  const items = JSON.parse(await fs.readFile(STORE_FILE, "utf-8"));
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) {
    throw new Error("No se ha encontrado ese documento.");
  }
  await fs.writeFile(STORE_FILE, JSON.stringify(next, null, 2), "utf-8");
}

// Concatena el conocimiento subido en un bloque de contexto para el system
// prompt, recortando por presupuesto de caracteres para no disparar el coste
// ni el tamaño del prompt.
export async function buildKnowledgeContext() {
  const items = await listKnowledge();
  if (items.length === 0) return null;

  let budget = MAX_CONTEXT_CHARS;
  const chunks = [];
  for (const item of items) {
    if (budget <= 0) break;
    const block = `### ${item.title}\n${item.content}`.slice(0, budget);
    chunks.push(block);
    budget -= block.length;
  }
  return chunks.join("\n\n---\n\n");
}

export async function extractTextFromFile(buffer, filename) {
  const ext = path.extname(filename).toLowerCase();

  if (ext === ".txt" || ext === ".md") {
    return buffer.toString("utf-8");
  }

  if (ext === ".pdf") {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  throw new Error(
    `Formato "${ext || "desconocido"}" no soportado. Sube .txt, .md o .pdf, o pega el texto directamente.`
  );
}
