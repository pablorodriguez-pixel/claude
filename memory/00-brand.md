# Marca — qué es fuente de verdad y qué corregir

La especificación completa de marca vive en dos sitios, por este orden:

1. `reference/FounderzBrandGuidelines_24_25.pdf` — **source of truth absoluto**.
2. `CLAUDE.md` §1-§3 — síntesis operativa (paleta, tipografía, escalas, tokens).
3. `reference/founderz-maqueta/css/main.css` + `program2026.css` — CSS real de la
   web de producción, de donde salen los valores web.

Implementación: `styles/founderz.css` (tokens en `@theme` de Tailwind 4 +
componentes `fz-*`). **Todo token nuevo se define ahí, nunca en la LP.**

## Print vs web

| | Print / brand | Web |
|---|---|---|
| Púrpura | `#50519E` (Pantone 7669 C) | `#5045c8`, hover `#2f2976` |
| Negro | `#111115` (Pantone 426 C) | `#111115` |

## Correcciones observadas en producción (2026-08-20)

- **Deriva del negro.** El oficial es `#111115`, pero en producción solo lo usan
  `/creativos` y `/registro`; el resto usa `#1a191d` o `#03001d`. En LPs nuevas:
  `#111115` (token `--color-ink`).
- **El púrpura sí es consistente**: `#5045c8` + `#2f2976` en las 25 LPs. No tocar.
- **Tracking `0.02em` en toda la tipografía** — regla de marca que se olvida con
  facilidad. Va en `body`, no por componente.
- **`<strong>` dentro de un titular sube a 700.** Está en el CSS real de Founderz
  y replicado en `styles/founderz.css`.
- **Nunca dos Mindscapes consecutivos.** Separar con imagen real, color o blanco.
  Logo y tipografía sobre Mindscape van siempre en blanco.
- **Iconos:** Google Material Symbols Rounded con FILL sí, weight 400, grade −25,
  optical size 24.

## Fuentes — pendiente

`RundDisplay-{Light,Regular,Medium,SemiBold}.woff2` deben estar en
`public/fonts/`. Producción los sirve desde ahí con 6 preloads por página. Si
faltan, la LP cae a Trebuchet MS y **no es fiel a marca**: `scripts/qa.mjs` lo
marca como error, no como aviso.
