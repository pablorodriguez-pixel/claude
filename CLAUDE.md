# Claude — Landing Pages Founderz (UX + CRO)

> ## ⚠️ Antes de desplegar nada, lee `README.md`
> `ia.founderz.com` sirve 25 LPs vivas cuyo fuente **no está en este repo**. Un
> deploy a producción desde aquí las borraría, y un merge a la rama de producción
> también (el proyecto de Vercel está conectado por git a este repositorio).
> `scripts/deploy.mjs` lo bloquea; no desactives la comprobación.

Este repositorio se usa para diseñar y maquetar **landing pages al estilo Founderz** combinando expertise en **UX** y **CRO** (Conversion Rate Optimization). Cuando trabajes en este repo, sigue estas reglas siempre.

> **Material de referencia oficial:**
> - `reference/founderz-maqueta/` — HTML/CSS/JS real de la landing del Máster IA para Creativos.
> - `reference/FounderzBrandGuidelines_24_25.pdf` — Guía de marca oficial 24/25. Source of truth absoluto.

---

## 1. Identidad de marca Founderz

**Posicionamiento:** Founderz — AI Business School. Formación premium en IA aplicada a negocio y creatividad. Tono profesional, aspiracional pero accesible, en español neutro con tuteo.

### Paleta de color oficial (Brand Guidelines 24/25)

| Token | Hex | Pantone | Uso |
|---|---|---|---|
| **Purple** (PRIMARY) | `#50519E` | 7669 C | Botones, links, acentos, elementos de marca |
| **Black** | `#111115` | 426 C | Texto principal (no es negro puro) |
| **White** | `#FFFFFF` | White | Fondos, texto sobre oscuro |
| Violet | `#420D8C` | Violet C | Acentos fuertes, hover, complementario |
| Pink / Lilac | `#D08EEB` | 2572 C | Chips, tags, fondos suaves |
| Mint Green | `#A3D9C5` | 573 C | Secondary color |
| Dark Red | `#931219` | 7622 C | Alertas, urgencia |
| Warm Red | `#F25244` | Warm Red C | Énfasis, CTA secundario |
| Orange | `#F2983E` | 804 C | Badges, highlights |

> **Nota de implementación:** El CSS de la web usa `#5045c8` como purple y `#2f2976` como hover (ligeramente distinto al Pantone oficial). Para **web**, usa los tokens del CSS. Para **brand/print**, usa `#50519E`. El CSS incluye también `--violet-bg: #846ab0` y `--sunshade: #fea339` como auxiliares.

**Opacidades permitidas en digital:**
- Color: mínimo 30%
- Negro: mínimo 5%
- Colores complementarios: mínimo 30%

**Botones (tokens reales del CSS):**
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

### Tipografía oficial: Rund Display

- **Familia:** `RundDisplay, "Trebuchet MS", Helvetica, sans-serif`
- **Diseñador:** Göran Söderström (2021). Sans serif con trazos sutilmente cóncavos.
- **font-display: swap** siempre.
- **Tracking:** aplicar SIEMPRE `letter-spacing: 0.02em` (2% en toda la tipografía).

**Pesos disponibles y usos:**

| Peso | Cuándo usarlo |
|---|---|
| Light / Light Italic | Solo en titulares a tamaño grande |
| **Regular / Italic** | Cuerpo de texto principal |
| **Medium / Medium Italic** | Destacar conceptos dentro del texto |
| **Semibold / Semibold Italic** | Headlines principales, CTAs |

**Escala tipográfica (desktop / mobile <580px):**

| Estilo | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| H1 | `3.5rem` | `2.5rem` | 600 (strong 700) | 1 |
| H2 | `2.5rem` | `2rem` | 600 | 1.2 |
| H3 | `2rem` | `1.5rem` | 400 (strong 700) | 1.2 |
| H4 | `1.5rem` | — | 400 | 1.2 |
| H5 | `1.25rem` | — | 400 | 1.3 |
| Body | `1rem` | `0.875rem` | 400 | 1.25 |

### Tokens de layout (CSS oficial)

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

### Iconos oficiales

**Google Material Symbols Rounded** con esta configuración:
```
FILL: sí
Weight: 400
Grade: -25
Optical size: 24
Style: Material Symbols Rounded
```

### Sistema visual

- **Esquinas:** cards `1.5rem–1.875rem`; botones pill `100rem`; chips `100rem`; inputs `0.5rem`.
- **Sombras:** sutiles. `0 10px 40px rgba(0,0,0,0.08)` para flotantes.
- **Nav flotante:** pill blanco con sombra, separado del top, ancho contenido. Altura `8.5rem`.
- **Tags / labels uppercase:** color purple, tracking generoso, 12-13px, weight 600, antes de cada H2.
- **Chips de herramientas:** outline 1px gris claro, fondo blanco, icono + texto, pill.
- **Acordeón:** item activo con fondo lavender + texto purple, inactivos en blanco con borde sutil.
- **Hero visual:** imagen cinematográfica/dramática a sangre. Tipografía blanca + pricing card flotante.
- **Bloques de color (Píldoras):** organización de contenido en bloques con esquinas redondeadas. Pueden contener imágenes, Mindscapes o texto.

---

## 2. Mindscapes — Sistema visual de fondos

Los **Mindscapes** son imágenes generadas con IA que simulan las sinapsis neuronales durante el proceso de aprendizaje. Son el elemento visual más distintivo de la marca.

**Reglas de uso:**
- Siempre en la paleta cromática oficial.
- Logo y tipografía encima van SIEMPRE en blanco (versión negativa).
- **Nunca** dos Mindscapes consecutivos — separar siempre con imagen real, color o blanco.
- Se pueden rotar y recortar para adaptarse al layout.
- Pueden usarse como fondo del logo/símbolo o como soporte de mensajes.

**Prompt base para generar Mindscapes nuevos:**
```
Create a detailed PET scan-inspired texture that represents the human brain's activity
during the learning process. Use warm colors (red, orange, yellow) to indicate high
metabolic activity and cooler colors (blue, green) for lower activity. Highlight areas
typically involved in learning.
```

---

## 3. Fotografía

**Dos estilos, nunca mezclados en una sola imagen:**

| Tipo | Cuándo usar | Estilo |
|---|---|---|
| **Real / Documental** | Personas, eventos, lugares, testimonios | Luz natural, close-up, diversidad de género/raza/edad |
| **IA Generativa** | Portadas de cursos, newsletters, posts, artículos | Motion blur, paleta sobria, tonos oscuros para legibilidad |

**Imágenes de programa (IA):**
- Concepto: **motion blur** como metáfora del dinamismo.
- Composición audaz, sujeto destacado, espacio para guiar la vista.
- Paleta sobria y coherente con la marca. Tonos oscuros.
- Evitar mostrar IA de forma obvia; buscar la sutileza.

**Prompt base para imágenes de programa:**
```
A blurred, abstract portrait of [persona/rol] in motion, captured in a dynamic pose
with an ethereal and ghostly effect. The figure is partially visible, with [color palette]
hues dominating the color palette. The background is soft and minimal, with a gradient.
The lighting should be soft, creating a glowing and surreal atmosphere.
Composition landscape format. --chaos 60 --ar 4:3 --v 6.1
```

---

## 4. Estructura canónica de landing Founderz

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

---

## 5. Principios UX que aplico siempre

- **Jerarquía visual clara:** una sola H1 por página, contraste 3x entre H1 y body.
- **F-pattern / Z-pattern** en hero: lo importante arriba-izquierda y centro-derecha.
- **Regla del pulgar:** CTAs mínimo 44px de alto en mobile.
- **Accesibilidad WCAG AA:** contraste 4.5:1 texto normal, `alt` en imágenes, foco visible, semántica HTML.
- **Mobile-first:** maqueto a 375px primero. Breakpoint Founderz: `max-width: 579px`.
- **Performance:** imágenes `webp/avif`, `loading="lazy"` debajo del fold, `font-display: swap`.
- **Whitespace generoso:** padding vertical de secciones mínimo 80px desktop / 56px mobile.
- **Grid:** max-width `1430px`, gutter 24px.
- **Microinteracciones:** transitions 150-250ms, easing `--ease-in-out-cubic`.

---

## 6. Principios CRO que aplico siempre

- **CTA primario siempre visible:** sticky nav con botón + repetición cada 1-2 secciones.
- **Una sola acción primaria por sección.** Secundario para los que no están listos.
- **Pricing card en hero:** precio + financiación + 4-6 bullets de valor + doble CTA.
- **Eliminación de objeciones explícita:** "Garantía de devolución", "12 meses de acceso", certificaciones de partners.
- **Social proof temprano:** logos de Microsoft/Freepik en hero, no abajo.
- **Specificidad numérica:** "925€", "40.000 créditos", "+20 profesores", "9 módulos". Números > adjetivos.
- **Escasez honesta:** "Edición 2026" sin falsos countdowns.
- **Copy de transformación:** verbos imperativos. Beneficio antes que feature.
- **Formularios mínimos:** campos imprescindibles, validación inline, botón orientado a acción.
- **Above the fold (1440px):** propuesta + precio + CTA visibles sin scroll.
- **Trust badges:** certificaciones y partners cerca de cada CTA.

---

## 7. Copywriting estilo Founderz

- **Tono:** profesional, aspiracional, directo. Tuteo (no usted).
- **Headlines:** `[Producto/Acción] + [para quién] + [resultado]`. Ej: "Máster en IA Generativa para Creativos".
- **Subtítulos:** explican el "cómo" en 2-3 líneas. Dolor → transformación.
- **Bullets:** verbo de acción + beneficio concreto + número.
- **CTAs:** imperativo. "Inscríbete hoy", "Hablemos", "Solicita información". Nunca "Click aquí" ni "Enviar".
- **Sin jerga vacía:** evita "sinergias", "ecosistema", "transformación digital".

---

## 8. Stack técnico

- **HTML5 semántico** + **CSS moderno** (Grid, Flexbox, Custom Properties, `clamp()` para fluid type).
- **Sin framework JS** si la landing es estática.
- **Tailwind CSS** si pides rapidez con design system.
- **Next.js / React** si hay componentes complejos, A/B testing o CMS.
- **Imágenes responsive:** `<picture>` + `srcset` + `webp/avif`.
- **Iconos:** Google Material Symbols Rounded (config oficial) o Lucide/Phosphor como alternativa.
- **Animaciones:** CSS puro o `framer-motion` en React.

### Variables CSS base (tokens oficiales)

```css
:root {
  /* Color — brand oficial */
  --color-purple: #50519E;       /* brand oficial */
  --color-purple-web: #5045c8;   /* implementado en web */
  --color-purple-dark: #2f2976;  /* hover web */
  --color-violet: #420D8C;
  --color-pink: #D08EEB;
  --color-green: #A3D9C5;
  --color-red: #931219;
  --color-warm-red: #F25244;
  --color-orange: #F2983E;
  --color-ink: #111115;          /* black oficial */
  --color-white: #FFFFFF;
  --color-gray: #5a5a5a;
  --color-border: #b6b6b6;

  /* Buttons */
  --btn-bg: var(--color-purple-web);
  --btn-bg-hover: var(--color-purple-dark);
  --btn-color: var(--color-white);

  /* Type */
  --font-sans: RundDisplay, "Trebuchet MS", Helvetica, sans-serif;
  --line-height: 1.25;
  --letter-spacing: 0.02em;      /* tracking 2% siempre */

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

## 9. Cómo trabajo cuando me pides una landing

1. **Pregunto primero (si no está claro):** objetivo de conversión, público, oferta principal, KPI.
2. **Propongo estructura** de secciones antes de maquetar.
3. **Maqueto mobile-first**, luego desktop.
4. **Justifico decisiones CRO** (por qué CTA aquí, por qué este copy, qué hipótesis pruebo).
5. **Sugiero variantes A/B** cuando vea oportunidades claras.
6. **Reviso accesibilidad y performance** antes de cerrar.

---

## 10. Material de referencia en el repo

- `reference/FounderzBrandGuidelines_24_25.pdf` — **Guía de marca oficial 24/25.** Source of truth absoluto.
- `reference/founderz-maqueta/index.html` — HTML completo de la LP real (9k líneas).
- `reference/founderz-maqueta/css/main.css` — tema global Founderz (tokens, tipografía, botones).
- `reference/founderz-maqueta/css/program2026.css` — CSS específico de LPs de programa.
- `reference/founderz-maqueta/css/vendor-slider.css` — slider/carrusel.
- `reference/founderz-maqueta/js/Program2026.js` — JS de interactividad.

---

## 11. Cómo se trabaja ahora

Este repo ya no es solo referencia: es el **generador**. Para crear o revisar una
LP, invoca la skill **`/founderz-lp`**, que carga la memoria del agente
(`memory/`) y aplica las 11 reglas obligatorias.

```bash
npm run new -- --slug <slug> --tipo <master|webinar|leadmagnet|b2b|vsl|gracias>
npm run qa  -- --slug <slug>    # obligatorio antes de entregar
npm run deploy                  # preview
```

Reglas que este documento NO cubre y que están en `memory/`:

- `memory/01-reglas-obligatorias.md` — noindex, GTM, HubSpot, país + prefijo,
  TyC, `appearance:none` en selects iOS, QA a 390px, propiedades de programa.
- `memory/02-arquetipos-lp.md` — los 6 arquetipos y el análisis de las 25 LPs
  reales de producción.

**CSS en hoja externa, nunca inline** (decisión de Pablo, 20/08/2026): los tokens
viven en `styles/founderz.css` y lo específico de cada LP en
`app/<slug>/<slug>.css`.

Branch de trabajo: la que indique la tarea. Commits descriptivos, push con
`-u origin <branch>`.
