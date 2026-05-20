# Claude — Landing Pages Founderz (UX + CRO)

Este repositorio se usa para diseñar y maquetar **landing pages al estilo Founderz** combinando expertise en **UX** y **CRO** (Conversion Rate Optimization). Cuando trabajes en este repo, sigue estas reglas siempre.

---

## 1. Identidad de marca Founderz

**Posicionamiento:** Founderz — AI Business School. Formación premium en IA aplicada a negocio y creatividad. Tono profesional, aspiracional pero accesible, en español neutro.

### Paleta de color

| Rol | Hex | Uso |
|---|---|---|
| Primary purple | `#5B4FE5` (aprox.) | Botones principales, enlaces, acentos, badges activos |
| Primary purple hover | `#4A3FD4` | Estado hover del primary |
| Purple soft / Lavender bg | `#E8E4FF` | Fondos de secciones secundarias, cards destacadas |
| Purple text | `#5B4FE5` | Texto de tags/labels uppercase ("TEMARIO", "CERTIFICACIÓN EXTRA") |
| Dark navy pill | `#1A1A2E` | Pills oscuros del nav (selector de idioma) |
| Ink / Texto principal | `#0F0F1A` | Headings y body |
| Muted text | `#5A5A6E` | Subtítulos y descripciones |
| White | `#FFFFFF` | Fondo principal, cards |
| Border / Divider | `#EAEAF2` | Bordes sutiles |

> Si la guía oficial trae hex distintos, **prevalecen** los oficiales. Estos son aproximaciones extraídas visualmente.

### Tipografía

- **Familia:** sans-serif moderna geométrica/humanista (estilo Inter, DM Sans, Söhne o similar).
- **Headings:** weight 600-700, tracking ligeramente apretado (`letter-spacing: -0.02em`).
- **Body:** weight 400, `line-height: 1.5-1.6`.
- **Tags / Labels:** UPPERCASE, weight 500-600, tracking generoso (`letter-spacing: 0.08em`), tamaño 12-13px, color primary purple.

### Sistema visual

- **Esquinas redondeadas:** todo (cards 16-24px, botones pill = `border-radius: 999px`, chips 999px, inputs 12px).
- **Botones tipo pill:** SIEMPRE redondeo completo. Padding generoso (`14px 28px`).
- **Sombras suaves:** `box-shadow: 0 10px 40px rgba(15, 15, 26, 0.08)` para cards flotantes.
- **Nav flotante:** pill blanco con sombra, separado del top (`margin-top: 16-24px`), centrado, ancho contenido.
- **Chips/Tags de herramientas:** outline 1px gris claro, fondo blanco, icono + texto, padding `8px 14px`, redondeo pill.
- **Acordeón:** item activo con fondo lavender (`#E8E4FF`) y texto purple; inactivos en blanco con borde sutil.
- **Hero visual:** imagen cinematográfica/dramática a sangre, sin overlays excesivos. Tipografía blanca encima.

### Componentes clave

**Botón primario**
```css
background: #5B4FE5;
color: #fff;
border-radius: 999px;
padding: 14px 28px;
font-weight: 600;
font-size: 15px;
transition: background .2s;
```

**Botón secundario (outline)**
```css
background: #fff;
color: #0F0F1A;
border: 1.5px solid #EAEAF2;
border-radius: 999px;
padding: 14px 28px;
```

**Card pricing (hero)**
```css
background: #fff;
border-radius: 24px;
padding: 32px;
box-shadow: 0 20px 60px rgba(15,15,26,0.10);
```

**Section tag**
```css
color: #5B4FE5;
text-transform: uppercase;
letter-spacing: 0.08em;
font-size: 13px;
font-weight: 600;
```

---

## 2. Estructura canónica de landing Founderz

Orden recomendado de secciones (CRO-optimizado, basado en la landing de referencia):

1. **Nav flotante** — logo centrado, items menú izquierda, idioma + login + CTA primario derecha.
2. **Hero** — split layout:
   - Izquierda: badge edición, H1 grande, meta-info (duración, formato), partners "En colaboración con + logos".
   - Derecha: **pricing card** con precio destacado, financiación, 4-6 bullets de valor, doble CTA (primario + secundario "Solicita información").
   - Fondo: imagen cinematográfica a sangre.
3. **Value proposition** — bloque centrado, texto purple, 2-3 líneas que conectan dolor + transformación.
4. **Video** — demo/testimonio embebido (autoplay muted opcional).
5. **Temario / Estructura del programa** — split:
   - Izquierda: tag "TEMARIO", H2, bullets de features, **chips de herramientas**, CTA secundario "Descargar programa".
   - Derecha: **acordeón** de módulos con descripción al expandir.
6. **¿Qué aprenderás?** — nube de tags/chips con todos los topics (refuerza amplitud).
7. **Certificación / Especializaciones** — fondo lavender, grid de cards con icono + título + descripción.
8. **Social proof** — logos de empresas donde trabajan alumni, testimonios con foto + nombre + rol.
9. **Profesores** — grid de cards con foto, nombre, empresa.
10. **FAQs** — acordeón.
11. **CTA final** — fondo purple o lavender, headline + botón primario grande.
12. **Footer** — links, legal, redes.

---

## 3. Principios UX que aplico siempre

- **Jerarquía visual clara:** una sola H1 por página, contraste de tamaño 3x entre H1 y body.
- **F-pattern / Z-pattern** en hero: lo importante arriba-izquierda y centro-derecha.
- **Regla del pulgar:** CTAs alcanzables en mobile (mínimo 44px de alto).
- **Accesibilidad:** contraste WCAG AA mínimo (4.5:1 texto normal), `alt` en imágenes, foco visible en interactivos, semántica HTML (`<nav>`, `<main>`, `<section>`, `<h1-h6>`).
- **Mobile-first:** maqueto primero a 375px, luego escalo. Nada que solo funcione en desktop.
- **Performance:** imágenes en `webp/avif`, `loading="lazy"` debajo del fold, fuentes con `font-display: swap`.
- **Whitespace generoso:** padding vertical de secciones mínimo 80px desktop / 56px mobile.
- **Grid de 12 columnas** con gutter 24px, max-width container 1200-1280px.
- **Microinteracciones sutiles:** transitions de 150-250ms en hover, sin animaciones agresivas.

---

## 4. Principios CRO que aplico siempre

- **CTA primario visible siempre:** sticky nav con botón + repetición cada 1-2 secciones.
- **Una sola acción primaria por sección.** El CTA secundario es para los que no están listos (descargar PDF, solicitar info).
- **Pricing card en hero:** muestra precio + financiación + bullets de valor + doble CTA. Reduce fricción.
- **Eliminación de objeciones explícita:** "Garantía de devolución", "12 meses de acceso", certificaciones de partners.
- **Social proof temprano:** logos de Microsoft/Freepik en el hero (no abajo).
- **Specificidad numérica:** "925€", "40.000 créditos", "+20 profesores", "9 módulos", "5-15 min/clase". Los números concretos convierten más que adjetivos.
- **Escasez / urgencia honesta:** "Edición 2026" sin falsos countdowns.
- **Copy orientado a transformación:** verbos en imperativo o presente ("Lleva tu trabajo", "Domina el proceso", "Conviértete en…"). Beneficio antes que feature.
- **Reducción de fricción en formularios:** mínimos campos, validación inline, botón con texto orientado a acción ("Inscríbete hoy", no "Enviar").
- **Above the fold:** propuesta de valor + precio + CTA visibles sin scroll en desktop 1440px.
- **Trust badges:** certificaciones, garantías, logos de prensa/partners cerca de cada CTA.

---

## 5. Copywriting estilo Founderz

- **Tono:** profesional, aspiracional, directo. Tuteo (no usted).
- **Estructura headlines:** `[Producto/Acción] + [para quién] + [resultado]`. Ej: "Máster en IA Generativa para Creativos".
- **Subtítulos:** explica el "cómo" en 2-3 líneas. Conecta dolor → transformación.
- **Bullets:** verbo de acción + beneficio concreto + número si se puede.
- **CTAs:** primero persona o imperativo. "Inscríbete hoy", "Hablemos", "Solicita información". Nunca "Click aquí" ni "Enviar".
- **Sin jerga:** evita "sinergias", "ecosistema", "transformación digital" vacíos.

---

## 6. Stack técnico por defecto

Cuando me pidas maquetar, asume esto salvo que digas lo contrario:

- **HTML5 semántico** + **CSS moderno** (Grid, Flexbox, Custom Properties, `clamp()` para tipografía fluida).
- **Sin frameworks** si la landing es estática y simple.
- **Tailwind CSS** si se pide rapidez o consistencia con un design system.
- **Next.js / React** si hay componentes complejos, A/B testing, o integración con CMS.
- **Imágenes responsive:** `<picture>` con `srcset` + `webp/avif`.
- **Iconos:** Lucide o Phosphor (estilo line, peso 1.5).
- **Animaciones:** CSS puro o `framer-motion` si hay React.

Variables CSS base que añado en cada proyecto:

```css
:root {
  --color-primary: #5B4FE5;
  --color-primary-hover: #4A3FD4;
  --color-lavender: #E8E4FF;
  --color-ink: #0F0F1A;
  --color-muted: #5A5A6E;
  --color-border: #EAEAF2;
  --color-bg: #FFFFFF;

  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  --shadow-card: 0 10px 40px rgba(15, 15, 26, 0.08);
  --shadow-card-lg: 0 20px 60px rgba(15, 15, 26, 0.10);

  --container: 1240px;
  --section-py: clamp(56px, 8vw, 120px);

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}
```

---

## 7. Cómo trabajo cuando me pides una landing

1. **Pregunto primero (si no está claro):** objetivo de conversión (lead/venta/descarga), público, oferta principal, KPI a optimizar.
2. **Propongo estructura** de secciones antes de maquetar.
3. **Maqueto mobile-first**, luego desktop.
4. **Justifico decisiones de CRO** (por qué el CTA aquí, por qué este copy, qué hipótesis estoy probando).
5. **Sugiero variantes A/B** cuando vea oportunidades claras (headline alternativo, posición de pricing, color de CTA).
6. **Reviso accesibilidad y performance** antes de dar por hecho el trabajo.

---

## 8. Branch de trabajo

Desarrollo en `claude/spanish-greeting-5gAxM` (o la branch que indique la tarea). Commits descriptivos, push con `-u origin <branch>`.
