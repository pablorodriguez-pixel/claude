import { NextResponse } from "next/server";
import { addKnowledge, extractTextFromFile, listKnowledge } from "@/lib/knowledgeStore";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export async function GET() {
  const items = await listKnowledge();
  // No devolvemos el contenido completo al listado para no sobrecargar el panel.
  const summary = items.map(({ id, title, sourceType, sourceName, createdAt, content }) => ({
    id,
    title,
    sourceType,
    sourceName,
    createdAt,
    preview: content.slice(0, 160),
    chars: content.length,
  }));
  return NextResponse.json({ items: summary });
}

export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      const title = formData.get("title")?.toString().trim();

      if (!(file instanceof File)) {
        return NextResponse.json({ error: "No se ha recibido ningún archivo." }, { status: 400 });
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "El archivo supera el límite de 5MB." }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const text = await extractTextFromFile(buffer, file.name);

      const item = await addKnowledge({
        title: title || file.name,
        content: text,
        sourceType: "file",
        sourceName: file.name,
      });
      return NextResponse.json({ item }, { status: 201 });
    }

    const body = await request.json();
    const item = await addKnowledge({
      title: body?.title,
      content: body?.content,
      sourceType: "text",
      sourceName: null,
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/knowledge:", error);
    return NextResponse.json(
      { error: error.message || "No se ha podido guardar el documento." },
      { status: 400 }
    );
  }
}
