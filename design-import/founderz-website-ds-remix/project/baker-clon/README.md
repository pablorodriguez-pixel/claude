# Baker Clon — LP MAIC (paquete para `founderz-theme`)

Clon de la landing del **Máster MAIC** (`go.founderz.com/maic-mql`), construido con las
convenciones del tema (`CLAUDE.md`): PHP modular, BEM + nesting, mixins de sección, `@use`
con alias de Vite, ACF con secciones toggleables (`is_active`) y formularios **HubSpot** (dossier).
Sin React.

Maqueta visual de referencia 1:1: pestaña **Baker clon** del UI kit
(`ui_kits/website/index.html` de este design system).

> **Sufijo `.txt`.** En este proyecto los `.js`/`.scss` se guardan con `.txt` extra para que el
> compilador del DS no los empaquete. **Al copiarlos al tema, quita el `.txt`.** PHP/JSON/MD van
> tal cual. (El ZIP descargado conserva el `.txt`; ver `INTEGRATION` para quitarlo en bloque.)

---

## Estructura (paquete → tema)

```
theme/
├── templates/baker-clon.php                                → templates/
├── partials/founderz/sections/baker-*.php                  → partials/founderz/sections/
│     hero-dossier · quotes · showcase · program · syllabus · method
│     testimonials · teachers · awards · faqs · final-cta
├── src/scss/entries/pages/baker-clon.scss(.txt)            → src/scss/entries/pages/
├── src/scss/founderz/sections/baker/_*.scss(.txt)          → src/scss/founderz/sections/baker/
├── src/js/entries/pages/BakerClon.js(.txt)                 → src/js/entries/pages/
├── acf-json/group_baker_clon_lp.json                       → acf-json/
└── snippets/{vite-enqueues.snippet.php, vite.config.snippet.js(.txt)}
```

---

## Instalación

1. Copia los archivos a sus rutas (el árbol `theme/` ya las refleja) y quita los `.txt` de
   `.js`/`.scss`:
   ```bash
   find src -name '*.txt' | while read -r f; do mv "$f" "${f%.txt}"; done
   ```
2. **Enqueue**: pega `founderz_enqueue_baker_clon_vite()` (de `snippets/`) en
   `functions/enqueues/vite-enqueues.php`.
3. **Vite**: añade `BakerClon` (de `snippets/vite.config.snippet.js`) a `rollupOptions.input`.
4. **ACF**: el JSON sincroniza solo (acf-json local). Si no: *Custom Fields → Tools → Sync*.
5. **Build**: `npm run build` (o `npm run dev`).
6. **Página**: crea una Página (o un Landing Page) con la plantilla **"Baker Clon"** y rellena
   los campos ACF (los textos del screenshot vienen como `default_value` en los campos escalares).

> ¿Prefieres que lo haga Claude Code? Usa el mismo prompt que en el paquete del webinar
> (`INTEGRATION.md`), cambiando rutas/nombres por los de `baker-clon`.

---

## Secciones (en orden) y reutilización del DS

| Sección | Grupo ACF | Reutiliza |
|---|---|---|
| Hero + dossier | `hero` | `pill-a`, `hubspot-form-lazy` |
| ¿Te suena? (quotes) | `quotes` | `heading-a` |
| Showcase alumnos | `showcase` | `heading-a`, `button-a` |
| El programa | `program` | `heading-a`, `pill-a` |
| Temario (acordeón) | `syllabus` | `heading-a` (acordeón `#syllabus-accordion`) |
| Así se aprende | `method` | `heading-a` |
| Testimonios | `testimonials` | `heading-a`, `testimonial-a` |
| Equipo docente | `teachers` | `heading-a`, `button-a` |
| Reconocimientos | `awards` | — |
| FAQ | `faqs` | `heading-a` (acordeón `#faqs-accordion`) |
| CTA final | `final_cta` | `hubspot-form-lazy` |

Formularios HubSpot (`hubspot-form-lazy.php`); los CTAs hacen scroll suave a `#dossier`.
Acordeones gestionados por el módulo `Accordion` del tema.

## A revisar contra el tema

- **Claves `SVG_ICONS`** usadas: `check`, `play`, `arrow-right`, `award`/`lock`, y las de
  especializaciones/método (`wand`, `sparkles`, `users`, `play`, `star`, `cpu`, `globe`,
  `briefcase`, `clock`, `rocket`, `calendar`). Ajústalas a las reales del tema; las
  especializaciones pueden ir como **imágenes** (campo `image`) en vez de SVG.
- **Header/footer**: `2025-simple-dark`.
- **Precio**: oculto a propósito (el modelo es dossier). El precio real se entrega en el dossier.
- **Contenido de repeaters**: ACF no admite defaults en repeaters; el contenido del screenshot
  está en la maqueta visual y como referencia aquí — cárgalo en la página o pídeme un seed WP-CLI.
