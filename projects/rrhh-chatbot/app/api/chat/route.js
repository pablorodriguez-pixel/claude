import { NextResponse } from "next/server";
import { askHrAssistant } from "@/lib/anthropic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "El mensaje no puede estar vacío." }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json(
      { error: "El mensaje es demasiado largo (máx. 4000 caracteres)." },
      { status: 400 }
    );
  }

  const history = Array.isArray(body?.history) ? body.history : [];

  try {
    const reply = await askHrAssistant({ message, history });
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: error.message || "Error inesperado al consultar a Claude." },
      { status: 502 }
    );
  }
}
