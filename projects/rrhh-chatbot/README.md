# Asistente de RRHH · Founderz

Interfaz de dudas para el equipo de RRHH de Founderz, conectada a la API de Claude. Los empleados escriben una pregunta y el asistente responde **únicamente** con la información que el equipo de RRHH haya subido a la base de conocimiento.

## Funcionalidad

- **Chat**: preguntas en lenguaje natural, respuestas generadas por Claude con el historial de la conversación.
- **Base de conocimiento**: panel para pegar texto o subir archivos (`.txt`, `.md`, `.pdf`, máx. 5MB). El contenido extraído se guarda y se inyecta como contexto en cada consulta.
- El asistente está instruido para **no inventar políticas**: si la respuesta no está en los documentos subidos, lo dice explícitamente y redirige a RRHH.

## Puesta en marcha local

```bash
npm install
cp .env.example .env.local   # añade tu ANTHROPIC_API_KEY
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `ANTHROPIC_API_KEY` | Sí | Clave de la API de Claude (console.anthropic.com). |
| `ANTHROPIC_MODEL` | No | Modelo a usar. Por defecto `claude-sonnet-5`. |

## Cómo funciona la base de conocimiento

- Los documentos se guardan en `data/knowledge.json` (texto extraído, no los binarios originales).
- En cada pregunta, el backend concatena los documentos guardados (hasta un presupuesto de ~60.000 caracteres) y los pasa como contexto en el `system prompt` de Claude.
- Los PDF se procesan con [`pdf-parse`](https://www.npmjs.com/package/pdf-parse); `.txt`/`.md` se leen directamente.

> **Importante — persistencia en producción:** el almacenamiento actual usa un archivo en disco, pensado para un despliegue en un servidor Node persistente (VPS, contenedor, `next start`). Si despliegas en una plataforma serverless (p. ej. Vercel), el sistema de archivos es efímero y los documentos subidos **no sobrevivirán** entre invocaciones. Para ese caso, sustituye `lib/knowledgeStore.js` por una base de datos (Postgres, SQLite en Turso, un blob store, etc.) manteniendo la misma interfaz (`listKnowledge`, `addKnowledge`, `deleteKnowledge`, `buildKnowledgeContext`).

## Estructura

```
app/
  page.js                 → layout de la página (chat + panel de conocimiento)
  api/chat/route.js       → llamada a la API de Claude
  api/knowledge/route.js  → listar / añadir documentos
  api/knowledge/[id]/route.js → borrar un documento
components/
  ChatPanel.js            → UI del chat
  KnowledgePanel.js       → UI para subir/gestionar conocimiento
lib/
  anthropic.js            → cliente de la API de Claude + system prompt
  knowledgeStore.js       → persistencia y extracción de texto (txt/md/pdf)
```

## Próximos pasos sugeridos

- Autenticación (SSO interno) para limitar el acceso a empleados de Founderz.
- Migrar la base de conocimiento a una base de datos para despliegues serverless.
- Soporte para `.docx` (por ejemplo con `mammoth`).
- Streaming de la respuesta de Claude para reducir la percepción de latencia.
