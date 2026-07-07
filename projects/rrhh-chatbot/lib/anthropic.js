import { buildKnowledgeContext } from "./knowledgeStore";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";
const MAX_HISTORY_MESSAGES = 20;

function buildSystemPrompt(knowledgeContext) {
  const base = `Eres el asistente de dudas de RRHH de Founderz (AI Business School).
Respondes en español neutro, con tuteo, en un tono profesional, cercano y directo.

Reglas:
- Responde ÚNICAMENTE usando la información del "CONTEXTO DE RRHH" de abajo.
- Si la respuesta no está en el contexto, dilo con claridad ("No tengo esa información en la documentación disponible") y sugiere contactar con el equipo de RRHH (rrhh@founderz.com) en vez de inventar una política.
- No inventes cifras, fechas, políticas ni procedimientos que no estén en el contexto.
- Sé conciso: respuestas cortas y accionables, con pasos o bullets cuando ayude.
- Si la pregunta no tiene que ver con RRHH (nóminas, vacaciones, beneficios, onboarding, políticas internas, etc.), redirige amablemente al tema.`;

  if (!knowledgeContext) {
    return `${base}\n\nCONTEXTO DE RRHH:\n(Todavía no se ha subido ningún documento. Indica al usuario que de momento no hay base de conocimiento cargada.)`;
  }

  return `${base}\n\nCONTEXTO DE RRHH:\n${knowledgeContext}`;
}

export async function askHrAssistant({ message, history = [] }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Falta configurar ANTHROPIC_API_KEY en el servidor. Añádela en .env.local y reinicia la app."
    );
  }

  const knowledgeContext = await buildKnowledgeContext();
  const system = buildSystemPrompt(knowledgeContext);

  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES).map((turn) => ({
    role: turn.role === "assistant" ? "assistant" : "user",
    content: turn.content,
  }));

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
      max_tokens: 1024,
      system,
      messages: [...trimmedHistory, { role: "user", content: message }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Error de la API de Claude (${response.status}): ${errorBody || response.statusText}`
    );
  }

  const data = await response.json();
  const reply = data.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (!reply) {
    throw new Error("Claude no ha devuelto ninguna respuesta de texto.");
  }

  return reply;
}
