# 📚 Dossier — Agente creador de LPs Founderz
### Todo el conocimiento acumulado: archivos, brandbook, estilo de programación y lecciones aprendidas
*Compilado por DeLaIglesia — 20/08/2026*

---

# PARTE 0 — Inventario de archivos

## Archivos .md de conocimiento
| Archivo | Contenido |
|---|---|
| `memory/founderz-brand-guidelines.md` | **El brandbook completo** (320 líneas): paleta, tipografía, tokens, componentes, Mindscapes, fotografía, estructura canónica de LP, principios UX/CRO/copy, stack técnico |
| `MEMORY.md` → secciones "Founderz Design System" + "Reglas ia.founderz.com" | Reglas obligatorias aprendidas de Pablo (tracking, forms, QA móvil, noindex…) |
| `memory/lps-referencia.md` | LPs de referencia externas (MasterClass Executive ⭐) |
| `memory/maic-creativos-landing-mejoras.md` | Análisis CRO completo de la LP del MAIC (abril 2026): FOMO, H1, bullets, módulos, precio |
| `founderz-vsl-lp/AGENTS.md` | Aviso: Next.js 16 tiene breaking changes — leer docs en `node_modules/next/dist/docs/` antes de programar |
| `founderz-vsl-lp/README.md` | Boilerplate create-next-app (sin valor) |

## Material de referencia (no .md)
- `reference/FounderzBrandGuidelines_24_25.pdf` — guía de marca oficial, **source of truth absoluto**
- `founderz-maqueta/` — HTML/CSS/JS real de la LP del Máster IA para Creativos (~9k líneas): `index.html`, `css/main.css` (tema global), `css/program2026.css`, `js/Program2026.js`
- Proyecto vivo: `founderz-vsl-lp/` → **ia.founderz.com** (Vercel, Next.js 16 + React 19 + Tailwind 4)

---

# PARTE 1 — Brandbook (síntesis operativa)

## Color
- **Purple web: `#5045c8`** · hover `#2f2976` (en brand/print: `#50519E` Pantone 7669C — NO usar en web)
- **Black: `#111115`** (nunca negro puro) · **Mint Green: `#A3D9C5`** (secondary)
- Complementarios: Violet `#420D8C`, Pink `#D08EEB`, Dark Red `#931219`, Warm Red `#F25244`, Orange `#F2983E`
- Auxiliares CSS: `--violet-bg:#846ab0`, `--sunshade:#fea339`
- Opacidades mínimas: color 30%, negro 5%
- Botones: primary `#5045c8`→`#2f2976` | inverse blanco→negro | ghost transparente/purple

## Tipografía
- **Rund Display** (Göran Söderström, 2021) → fallback `"Trebuchet MS", Helvetica`
- **`letter-spacing: 0.02em` SIEMPRE** en toda la tipografía
- Pesos: Light (solo titulares grandes), Regular (cuerpo), Medium (destacar), SemiBold (headlines + CTAs)
- Escala: H1 3.5rem/2.5rem mobile · H2 2.5/2 · H3 2/1.5 · Body 1/0.875 · line-height 1 en H1, 1.2-1.25 resto
- **CLS fix obligatorio**: `@font-face "Rund Fallback"{src:local("Arial");size-adjust:75.6%}` en toda página nueva

## Layout / tokens
- Max-width contenedor: `1430px` · header `8.5rem`
- **Border-radius: `1.875rem` desktop / `1.375rem` mobile** (breakpoint 579px) · pills `100rem`
- Easing: `cubic-bezier(0.645, 0.045, 0.355, 1)` · transitions 150-250ms
- Padding vertical secciones: mín. 80px desktop / 56px mobile
- Iconos: **Google Material Symbols Rounded** — FILL sí, Weight 400, Grade -25, Optical 24

## Componentes
- Nav flotante pill blanco con sombra · Tags uppercase purple 12-13px w600 antes de cada H2
- Chips outline gris + pill · Acordeón activo = fondo lavender + texto purple
- Sombras sutiles: `0 10px 40px rgba(0,0,0,0.08)`
- Hero: imagen cinematográfica a sangre + tipografía blanca + pricing card flotante

## Mindscapes (fondos IA marca)
- Simulan sinapsis neuronales · siempre paleta oficial · logo/tipo encima SIEMPRE en blanco
- Nunca dos Mindscapes consecutivos
- Prompt base guardado en brand-guidelines.md §7

## Fotografía
- Real/documental para personas y testimonios (luz natural, close-up, diversidad)
- IA generativa para portadas/posts (motion blur, paleta sobria) — prompt base en §8

---

# PARTE 2 — Estructura canónica de LP Founderz

```
header (nav flotante) → hero (pricing card) → info-video (value prop)
→ syllabus (chips) → programme_structure (acordeón módulos)
→ testimonials → teaser (CTA secundario) → certificate → professors
→ logos empresas → fellows/comunidad → inscriptions (pricing/planes)
→ faqs → companies (B2B) → footer
```

---

# PARTE 3 — Principios UX / CRO / Copy

## UX
- Una sola H1 · contraste 3x H1 vs body · F/Z-pattern en hero
- CTAs mín. 44px alto en mobile (regla del pulgar)
- WCAG AA: contraste 4.5:1, alt, foco visible, HTML semántico
- **Mobile-first a 375px** · breakpoint Founderz `max-width: 579px`
- Imágenes webp/avif + lazy bajo el fold · font-display swap

## CRO
- CTA primario siempre visible: sticky + repetición cada 1-2 secciones
- Una sola acción primaria por sección
- Pricing card en hero: precio + financiación + 4-6 bullets + doble CTA
- Eliminación explícita de objeciones (garantía, acceso 12 meses, partners)
- **Social proof temprano** (logos Microsoft/Freepik en hero, no abajo)
- Especificidad numérica: "925€", "+20 profesores" — números > adjetivos
- Escasez honesta, sin falsos countdowns
- Above the fold (1440px): propuesta + precio + CTA sin scroll
- Trust badges cerca de cada CTA · formularios mínimos con validación inline

## Copywriting
- Tono profesional, aspiracional, directo. Tuteo
- Headline: `[Producto/Acción] + [para quién] + [resultado]`
- Subtítulo: el "cómo" en 2-3 líneas. Dolor → transformación
- Bullets: verbo de acción + beneficio concreto + número
- CTAs imperativos: "Inscríbete hoy" — nunca "Click aquí"/"Enviar"
- Prohibido: "sinergias", "ecosistema", "transformación digital"

---

# PARTE 4 — Reglas OBLIGATORIAS ia.founderz.com (aprendidas de Pablo)

1. **NOINDEX SIEMPRE**: `robots: { index:false, follow:false }` en cada layout + robots.txt `Disallow: /`. (Baja el score SEO de Lighthouse por is-crawlable — esperado e irrelevante.)
2. **GTM `GTM-5B9S6LB`**: en layout.tsx raíz (carga diferida a primera interacción o 30s) — cubre todo el dominio.
3. **HubSpot tracking**: `js-eu1.hs-scripts.com/25912905.js` en layout raíz — cubre todo automáticamente.
4. **Forms — País OBLIGATORIO**: selector de país + prefijo país en teléfono, siempre por defecto (Pablo 24/07/2026).
5. **Forms — TyC OBLIGATORIO**: checkbox required con link a founderz.com/es/politica-de-privacidad — incluir siempre por defecto.
6. **Selects en iOS Safari**: pierden la flecha con CSS custom → siempre `appearance:none` + chevron SVG (patrón `select.dx-field`).
7. **QA móvil OBLIGATORIO antes de entregar** (Pablo 31/07/2026): screenshot real a 390px — forms completos, `scrollWidth <= clientWidth`, nada cortado. Causa típica de overflow: inputs con ancho intrínseco en grids → `min-width:0` en hijos de grid e inputs/selects.
8. **Forms que generan deal**: preguntar SIEMPRE a Pablo qué propiedades de programa mandar (`program_id`, `program_name`, `program_edition`, `program_lang`, `price`, `currency`). Fuente de verdad: Google Sheet "landing_slug → programa" `1_mxzCzu9TyVlWDxnQjOu1ZWM5Pd0eB5QeIHQlHFEcBs` (incluye hs_form_id y lead_source GTM form_mql/form_lead). Programas: MAIC/MAII/COPILOT/CLAUDE/GOOGLEAI/VIBECODING con precios ES EUR / CO COP / MX MXN.
9. **Deals HubSpot**: verificar pipeline y propiedades correctas siempre.
10. **Form B2B oficial AI Act**: form-id `b87510a8-2970-4574-bd55-92ae1f9e96d4` — requiere country_lead (ISO), numemployees, 0-2/company_industry, legal consent id 141476705.
11. **GA4 Measurement ID**: pendiente de confirmación por Pablo.

---

# PARTE 5 — Estilo de programación (proyecto founderz-vsl-lp)

## Stack
- **Next.js 16.2 (App Router) + React 19 + Tailwind 4 (PostCSS) + TypeScript** · deploy Vercel (proyecto `founderz-vsl-lp`, dominio ia.founderz.com)
- ⚠️ Next 16 tiene breaking changes vs training data → consultar `node_modules/next/dist/docs/`
- HTML5 semántico, CSS moderno (Grid/Flexbox/custom properties/clamp), sin framework JS si es estática

## Convenciones del repo
- Una carpeta por LP en `app/<slug>/` con `layout.tsx` (metadata + noindex) + `page.tsx`
- Componentes compartidos en `app/components/` y `components/` (PhoneField, HubSpotBridge, RegisterForm…)
- Fuentes locales en `public/fonts/` (RundDisplay woff2 preload en layout raíz)
- Assets de cada LP en `public/<slug>/` — **descargar imágenes de WP y servirlas en local** (perf)
- API routes en `app/api/` para leads (ej. `maic-lead`)
- CSS: o inline `<style>` en el page, o `.css` importado por página; tokens de marca siempre

## Performance (objetivo PSI ≥98)
- Página 100% estática (prerender) · imágenes locales con width/height explícitos · lazy bajo el fold
- GTM + HubSpot diferidos a primera interacción (wheel/click/touch/key) o timeout fallback — patrón en layout raíz
- Preconnect/dns-prefetch a dominios críticos · preload de las 3 fuentes clave
- Fallback métrico de fuente (CLS) · skeletons con altura reservada para embeds (anti-CLS)
- Scripts de fixes históricos: `fix-contrast.js`, `fix-landmarks.js`, `fix-lcp.js`, `fix-youtube-bp.js` + `deploy-psi99.sh`

## Tracking webinars externos a WP (spec oficial de Pablo, 20/08/2026)
- El sitio debe vivir bajo subdominio de founderz.com (hereda cookies `hubspotutk` + `founderz_ga4_user_id`; CORS ya whitelisted para `*.founderz.com`)
- **Evento `page_load_controlled`** en toda carga: `user_id` (cookie founderz_ga4_user_id) + `hubspot_id` (hubspotutk), "notset" si faltan
- **Evento `generate_lead`** SOLO en submit exitoso: program_* = "notset", `lead_source`/`lead_type` = "form_lead", `form_id`, `form_location` (pathname), `form_email`, `cta_position` = "notset"
- Detección de éxito: v4 `hs-form-event:on-submission:success` · legacy `message` → `hsFormCallback`/`onFormSubmitted`
- **Reutilizar el mismo embed HubSpot** (portalId 25912905 + formId del webinar) — crea contacto + form submission solo
- **Evento custom `pe25912905_webinar_registration`**: POST a `https://founderz.com/wp-json/fz/v1/hubspot/webinar-registration` con email, event_id, event_name, marketing_event_id, hs_page_url/title/referrer, utk, idempotency_key (email+evento+minuto), utm_*
- `HUBSPOT_MARKETING_EVENT_ID` y `WEBINAR_NAME` configurables por webinar (no hardcodear) — en WP están como `data-event-id`, `data-marketing-event-id`, `data-event-name` en el `<main>`

## Lecciones de deploy
- `npx vercel deploy --yes` (preview, protegido por SSO) · `npx vercel --prod` (producción)
- CLI logueado como pablorodriguez-2456
- Verificación PSI vía PageSpeed Insights API sobre URL de producción

---

# PARTE 6 — LPs de referencia externas
*(contenido íntegro de memory/lps-referencia.md)*

- **MasterClass Executive** — https://www.masterclass.com/executive/program-details — LP B2B enterprise para formación de directivos. Diseño y copy muy cuidados. ⭐ Muy bien ejecutada. (Vista en Instagram Ads, feb 2026)

---

# PARTE 7 — Análisis CRO MAIC (abril 2026) — playbook reutilizable
*(síntesis de memory/maic-creativos-landing-mejoras.md)*

1. **FOMO**: top bar sticky con oferta + countdown · "Ahorra 185€" junto al precio tachado · badge "Precio especial" · repetir oferta antes del CTA final
2. **H1**: nunca vago — fórmula `[Programa] + [dominio concreto]` o diferenciador único
3. **"Qué aprenderás"**: nunca ristra de tags — 3 bloques temáticos con bullets e iconos
4. **"Para quién es"**: bullets ✅ identificables, no párrafo denso
5. **Módulos**: descripción máx. 1 línea de impacto
6. **Precio/CTA**: mostrar ahorro en €, CTA concreto ("Inscribirme con descuento") no genérico
7. Priorizar: FOMO y CTA (alto impacto/bajo esfuerzo) antes que reescrituras largas

---

*Fin del dossier. Fuentes originales intactas en las rutas indicadas.*
