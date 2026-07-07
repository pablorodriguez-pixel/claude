import { NextResponse } from "next/server";
import { deleteKnowledge } from "@/lib/knowledgeStore";

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await deleteKnowledge(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
