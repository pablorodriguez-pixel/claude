---
description: Descarga facturas adjuntas del correo de IONOS
argument-hint: "[periodo, remitente…] p. ej. 'desde septiembre' o 'Amazon 2026'"
allowed-tools: Bash(python3 tools/ionos-facturas/descargar_facturas.py:*)
---

Descarga las facturas del buzón de IONOS con `tools/ionos-facturas/descargar_facturas.py`.

Petición: $ARGUMENTS

1. Traduce la petición a opciones del script (`--desde`, `--hasta` en formato YYYY-MM-DD, `--remitente`, `--carpeta`, `--palabras`, `--amplio`). Hoy es la fecha del sistema; si no se indica periodo, usa el mes en curso.
2. Si falta `tools/ionos-facturas/.env`, pide al usuario que lo cree a partir de `.env.example`. Nunca pidas ni escribas la contraseña en el chat.
3. Ejecuta primero con `--dry-run` y enseña la lista. Si parece correcta, ejecuta sin `--dry-run`.
4. Resume al final: cuántas facturas nuevas, de qué remitentes y dónde están (`tools/ionos-facturas/facturas/`).
