# Claude — Landing Pages Founderz (UX + CRO)

Este repositorio se usa para diseñar y maquetar **landing pages al estilo Founderz** combinando expertise en **UX** y **CRO** (Conversion Rate Optimization). Cuando trabajes en este repo, sigue estas reglas siempre.

> **Material de referencia oficial:** `reference/founderz-maqueta/` contiene el HTML/CSS/JS real de la landing del Máster IA para Creativos descargado de founderz.com. Úsalo como source of truth para cualquier duda de estilo, estructura o tokens.

---

## 1. Identidad de marca Founderz

**Posicionamiento:** Founderz — AI Business School. Formación premium en IA aplicada a negocio y creatividad. Tono profesional, aspiracional pero accesible, en español neutro con tuteo.

### Paleta oficial (extraída de `main.css`)

```css
--black: #000;
--white: #fff;
--purple: #5045c8;          /* PRIMARY — botones, links, acentos */
--violet-darker: #2f2976;   /* Hover del primary */
--violet-bg: #846ab0;       /* Fondos secundarios morados */
--pink: #d69cee;
--green: #a3d9c5;           /* Secondary color */
--orange: #f57d73;          /* alias --warm-red */
--orange-light: #f9ae58;
--sunshade: #fea339;
--sunshade-dark: #d97706;
--red: #ff3333;
--red-dark: #d4483c;
--contrast-gray: #5a5a5a;   /* Texto secundario */
--border-form: #b6b6b6;
--main-color: var(--black); /* Texto principal */
--secondary-color: var(--green);
```

**Botones (tokens reales):**
```css
/* Primary */
--btn-bg: #5045c8;
--btn-color: #fff;
--btn-bg-hover: #2f2976;

/* Inverse (sobre fondo oscuro/imagen) */
--btn-bg: #fff;
--btn-color: #1a191d;
--btn-bg-hover: #1a191d;
--btn-color-hover: #fff;

/* Ghost / text */
--btn-bg: transparent;
--btn-color: #5045c8;
```

### Tipografía oficial

- **Familia:** `RundDisplay, "Trebuchet MS", Helvetica, sans-serif`. Custom font, `font-display: swap`.
- Si no tienes RundDisplay, fallback: **Trebuchet MS** o sustituto similar (Söhne, Inter, DM Sans). Documenta el fallback en el proyecto.

**Escala (desktop / mobile <580px):**

| Estilo | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| H1 | `3.5rem` (56px) | `2.5rem` (40px) | 600 (strong 700) | 1 |
| H2 | `2.5rem` (40px) | `2rem` (32px) | 600 | 1.2 |
| H3 | `2rem` (32px) | `1.5rem` (24px) | 400 (strong 700) | 1.2 |
| H4 | `1.5rem` (24px) | — | 400 | 1.2 |
| H5 | `1.25rem` (20px) | — | 400 | 1.3 |
| Body | `1rem` (16px) | `0.875rem` (14px) | 400 | 1.25 |

`<strong>` y `<b>` siempre suben a weight 700.

### Tokens de layout

```css
--max-width-container: 1430px;
--site-header-height: 8.5rem;
--border-radius: 1.875rem;   /* desktop — 30px */
--border-radius: 1.375rem;   /* mobile — 22px */
--main-offsize: 1rem;        /* desktop */
--main-offsize: 0.875rem;    /* mobile */
--title-offsize: 3rem;       /* desktop */
--title-offsize: 1.5625rem;  /* mobile */
--line-height: 1.25;
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
```

**Radii recurrentes:** `0.5rem`, `1.5rem`, `1.875rem` (cards), `100rem` (pills full-round), `100%` (avatares).

### Sistema visual

- **Esquinas:** cards 24-30px (`1.5rem`–`1.875rem`); botones pill 100rem; chips 100rem; inputs 8px (`0.5rem`).
- **Padding botones:** generoso (≈ `0.875rem 1.75rem`), centrado óptico.
- **Sombras:** sutiles, nunca duras. `0 10px 40px rgba(0,0,0,0.08)` para flotantes.
- **Nav flotante:** pill blanco con sombra, separado del top, ancho contenido (no full-width). Altura `8.5rem` (`--site-header-height`).
- **Tags / labels uppercase:** color purple (`#5045c8`), tracking generoso, tamaño pequeño (12-13px), weight 600, antes de cada H2.
- **Chips de herramientas:** outline 1px gris claro, fondo blanco, icono + texto, pill.
- **Acordeón:** item activo con fondo lavender + texto purple, inactivos en blanco con borde sutil.
- **Hero visual:** imagen cinematográfica/dramática a sangre, sin overlays excesivos. Tipografía blanca + pricing card flotante sobre la imagen.
- **Container:** max-width `1430px`, márgenes laterales generosos.

---

## 2. Estructura canónica de landing Founderz

Orden real de secciones extraído de `reference/founderz-maqueta/index.html`:

```
<header class="header">                     — Nav flotante
<section class="hero-a">                    — Hero con pricing card lateral
<section class="info-video">                — Value prop + video
<section class="syllabus">                  — Temario (chips de herramientas)
<section class="programme_structure">       — Acordeón de módulos
<section class="testimonials">              — Testimonios de alumni
<section class="teaser">                    — Bloque transicional (CTA secundario)
<section class="certificate">               — Certificación / especializaciones
<section class="professors">                — Grid de profesores
<section class="logos">                     — Logos de empresas donde trabajan alumni
<section class="fellows">                   — Comunidad / alumni destacados
<section class="inscriptions">              — Pricing / planes / financiación
<section class="faqs">                      — Preguntas frecuentes (acordeón)
<section class="companies">                 — Llamada a empresas (B2B)
<footer class="footer-animations">          — Footer
```

Cuando construyas una landing nueva, **respeta este orden** salvo que la oferta justifique cambiarlo.

---

## 3. Principios UX que aplico siempre

- **Jerarquía visual clara:** una sola H1 por página, contraste 3x entre H1 y body.
- **F-pattern / Z-pattern** en hero: lo importante arriba-izquierda y centro-derecha.
- **Regla del pulgar:** CTAs mínimo 44px de alto en mobile.
- **Accesibilidad WCAG AA:** contraste 4.5:1 texto normal, `alt` en imágenes, foco visible, semántica (`<nav>`, `<main>`, `<section>`, `<h1-h6>`).
- **Mobile-first:** maqueto a 375px primero, luego desktop. Breakpoint Founderz: `max-width: 579px` para mobile.
- **Performance:** imágenes `webp/avif`, `loading="lazy"` debajo del fold, `font-display: swap`.
- **Whitespace generoso:** padding vertical de secciones mínimo 80px desktop / 56px mobile.
- **Grid:** max-width `1430px` (token oficial), gutter 24px.
- **Microinteracciones:** transitions 150-250ms, easing `cubic-bezier(0.645, 0.045, 0.355, 1)` (`--ease-in-out-cubic` oficial).

---

## 4. Principios CRO que aplico siempre

- **CTA primario siempre visible:** sticky nav con botón + repetición cada 1-2 secciones.
- **Una sola acción primaria por sección.** Secundario para los que no están listos (descargar PDF, solicitar info).
- **Pricing card en hero:** precio + financiación + 4-6 bullets de valor + doble CTA.
- **Eliminación de objeciones explícita:** "Garantía de devolución", "12 meses de acceso", certificaciones de partners.
- **Social proof temprano:** logos de Microsoft/Freepik en hero, no abajo.
- **Specificidad numérica:** "925€", "40.000 créditos", "+20 profesores", "9 módulos", "5-15 min/clase". Números > adjetivos.
- **Escasez honesta:** "Edición 2026" sin falsos countdowns.
- **Copy de transformación:** verbos imperativos ("Lleva tu trabajo", "Domina el proceso", "Conviértete en…"). Beneficio antes que feature.
- **Formularios mínimos:** campos imprescindibles, validación inline, botón con acción ("Inscríbete hoy", no "Enviar").
- **Above the fold (1440px):** propuesta + precio + CTA visibles sin scroll.
- **Trust badges:** certificaciones y partners cerca de cada CTA.

---

## 5. Copywriting estilo Founderz

- **Tono:** profesional, aspiracional, directo. Tuteo (no usted).
- **Headlines:** `[Producto/Acción] + [para quién] + [resultado]`. Ej: "Máster en IA Generativa para Creativos".
- **Subtítulos:** explican el "cómo" en 2-3 líneas. Dolor → transformación.
- **Bullets:** verbo de acción + beneficio concreto + número.
- **CTAs:** imperativo. "Inscríbete hoy", "Hablemos", "Solicita información", "Descargar programa". Nunca "Click aquí" ni "Enviar".
- **Sin jerga vacía:** evita "sinergias", "ecosistema", "transformación digital".

---

## 6. Stack técnico

Cuando me pidas maquetar:

- **HTML5 semántico** + **CSS moderno** (Grid, Flexbox, Custom Properties, `clamp()` para fluid type).
- **Sin framework JS** si la landing es estática.
- **Tailwind CSS** si pides rapidez con design system.
- **Next.js / React** si hay componentes complejos, A/B testing o CMS.
- **Imágenes responsive:** `<picture>` + `srcset` + `webp/avif`.
- **Iconos:** Lucide o Phosphor (line, weight 1.5).
- **Animaciones:** CSS puro o `framer-motion` en React.

### Variables CSS base para arrancar (compatibles con tokens oficiales)

```css
:root {
  /* Color */
  --color-black: #000;
  --color-white: #fff;
  --color-purple: #5045c8;
  --color-purple-dark: #2f2976;
  --color-violet-bg: #846ab0;
  --color-pink: #d69cee;
  --color-green: #a3d9c5;
  --color-orange: #f57d73;
  --color-sunshade: #fea339;
  --color-gray: #5a5a5a;
  --color-border: #b6b6b6;

  /* Buttons */
  --btn-bg: var(--color-purple);
  --btn-bg-hover: var(--color-purple-dark);
  --btn-color: var(--color-white);

  /* Type */
  --font-sans: RundDisplay, "Trebuchet MS", Helvetica, sans-serif;
  --line-height: 1.25;

  /* Layout */
  --max-width-container: 1430px;
  --site-header-height: 8.5rem;
  --border-radius: 1.875rem;
  --border-radius-pill: 100rem;
  --section-py: clamp(56px, 8vw, 120px);

  /* Motion */
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
}

@media (max-width: 579px) {
  :root {
    --border-radius: 1.375rem;
  }
}
```

---

## 7. Cómo trabajo cuando me pides una landing

1. **Pregunto primero (si no está claro):** objetivo de conversión (lead/venta/descarga), público, oferta principal, KPI a optimizar.
2. **Propongo estructura** de secciones antes de maquetar.
3. **Maqueto mobile-first**, luego desktop.
4. **Justifico decisiones CRO** (por qué CTA aquí, por qué este copy, qué hipótesis pruebo).
5. **Sugiero variantes A/B** cuando vea oportunidades claras.
6. **Reviso accesibilidad y performance** antes de cerrar.

---

## 8. Material de referencia en el repo

- `reference/founderz-maqueta/index.html` — HTML completo de la LP real (9k líneas).
- `reference/founderz-maqueta/css/main.css` — tema global Founderz (tokens, tipografía, botones).
- `reference/founderz-maqueta/css/program2026.css` — CSS específico de LPs de programa (busca `.hero-`, `.module-`, `.pricing-`, `.faculty-`, `.sticky-`).
- `reference/founderz-maqueta/css/vendor-slider.css` — slider/carrusel.
- `reference/founderz-maqueta/js/Program2026.js` — JS de interactividad (acordeones, sticky, video).

**Stack original:** WordPress + tema `founderz-theme`, Vite, ACF, CSS vars, vanilla JS + jQuery.

---

## 9. Branch de trabajo

Desarrollo en `claude/spanish-greeting-5gAxM` (o la branch que indique la tarea). Commits descriptivos, push con `-u origin <branch>`.
