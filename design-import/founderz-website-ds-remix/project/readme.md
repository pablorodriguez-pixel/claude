# Founderz - Website - Design System

A complete, code-first design system for **Founderz**, a premium business & AI school (*"Escuela de IA y negocio"*). The visual language is clean, spacious and aspirational: confident typography, generous whitespace, a single purple accent, and flat cards with hairline borders. No decorative effects.

> The product surface in scope is the **marketing website** (Spanish). Brand: Founderz only (not Skilling).

---

## Sources

This system was reconstructed from materials supplied by the Founderz team. You don't need access to use the system, but if you have it, these enrich any future work:

- **Figma:** "Web Design.fig" — page *Founderz · Copymouse · Playground* (Home, Pricing, Empresas, MAIC, Style-Guide, Components, Icons, Hovers, and more). Token values, the component families (`button-a`, `pill-a`, `card-d…l`, `hero-a/b`, `header-a`, `footer-a`, `banner-b/c`, `testimonial-a`) and the logo geometry were lifted directly from it.
- **GitHub:** `FounderzSchool/founderz-theme` (`src/scss/founderz/`). ⚠️ **Not accessible** during this build (private; the import app isn't installed on the `FounderzSchool` org). Install the GitHub app and re-share to let a future pass cross-check the SCSS tokens. Explore: <https://github.com/FounderzSchool/founderz-theme>
- **Brand spec & fonts:** the written Founderz design spec (colors, type scale, component catalogue, page templates) and the **RundDisplay** webfont family (Light/Regular/Medium/ SemiBold), both supplied directly.

---

## CONTENT FUNDAMENTALS

How Founderz writes.

- **Language:** Spanish (España). Professional but warm and motivating.
- **Person:** speaks to the reader as **tú** ("Domina la IA", "Forma a tu equipo", "¿Preparado para…?"). First person plural for the brand ("Diseñamos", "Te llamamos").
- **Casing:** **sentence case everywhere** — headings, buttons, labels. The *only* UPPERCASE is (1) section labels above an h2 and (2) category pills. Never UPPERCASE a button.
- **Tone:** aspirational + practical. Pairs a bold promise with concrete proof ("+250.000 profesionales", "12 semanas", "certificación oficial"). Benefit-led, never hype.
- **Headlines:** short, declarative, often a single idea. e.g. *"No solo es lo que aprendes. Es cómo lo aprendes."* · *"Domina la IA y lidera el futuro de tu profesión."*
- **Eyebrow labels:** one or two words, UPPERCASE, purple (PROGRAMAS, POR QUÉ FOUNDERZ, TESTIMONIOS, PRECIOS).
- **CTAs:** action verbs — "Inscríbete", "Solicita información", "Hablemos", "Ver programas", "Descarga el temario".
- **Numbers:** Spanish formatting — thousands with a dot, prices as `2.400 €` (space + €).
- **Emoji:** none. Not part of the brand voice.

---

## VISUAL FOUNDATIONS

- **Color:** one purple (`#5045c8`) is the single dominant accent — used for **one** element per section (a CTA, a label, a stat). Backgrounds rotate through a fixed rhythm `white → grey → black → white → lilac → purple`; never two identical section backgrounds in a row (white→white is the only allowed exception). Lilac (`#e2e2f8`) is the soft accent for pills, banners and financing blocks; black (`#1a191d`) anchors high-contrast sections.
- **Type:** **RundDisplay** only — a geometric, friendly display sans. Big hero h1s drop to weight **300 (Light)**; section h2s are **600 (SemiBold)**; body is **400** at 20px/1.5. `text-wrap: balance` on every section heading; **no `max-width` on titles** — line length is controlled by container padding and balance, not a clamp.
- **Spacing:** 8px base unit (8/16/24/32/40/56/80/120). Container maxes at **1360px** with 40px (desktop) / 24px (mobile) gutters. Section vertical padding tiers: hero 120/80, standard 80/56, secondary 56/40, compact 40/32.
- **Corners:** pills & buttons `100px`, main cards `24px`, inner cards/inputs panels `16px`, FAQ accordions `10px`, inputs & feature cards `8px`.
- **Borders:** always a single `1px solid rgba(0,0,0,0.05)` hairline. Never thick or coloured borders (lilac hairline is the one accent border, on `card-f`). On dark surfaces, tiles use `rgba(255,255,255,0.05)` fill + `rgba(255,255,255,0.1)` border.
- **Elevation:** **cards are flat — no shadows.** Shadows appear *only* on dropdowns and modals (`0 4px 12px rgba(0,0,0,0.1)`).
- **Imagery:** real photography of people, teams and classes — natural, warm, professional. Background images **always** carry a dark overlay (`rgba(26,25,29,0.5)`) for legible white text. No gradients of colour anywhere (only the dark overlay on photos).
- **Motion:** restrained. Soft `cubic-bezier(0.22,1,0.36,1)` ease over \~250ms. Link arrows nudge `translateX(3px)` on hover; accordion chevrons rotate 180°; accordions open via `grid-template-rows 0fr → 1fr`; partner logos run an infinite 30s marquee. No bounces, no decorative looping animation on content.
- **Hover / press:** buttons swap to a darker/inverted fill (purple→violet-darker; white→black; outlined→filled) and shrink slightly on press (`scale .98`). Post cards flip their floating box to purple with white text. Accordion rows tint to `#f8f7ff`.
- **Transparency / blur:** sparing — a translaucent blurred header over a dark hero, a faint blur behind category chips on image cards. Otherwise solid fills.

---

## ICONOGRAPHY

- Founderz iconography is **clean single-weight outline** — thin (\~1.8px) strokes, rounded joins, 24px grid. It reads geometric and quiet, matching RundDisplay.
- The bundled **`Icon`** component ships a curated outline set (check, arrows, chevrons, sparkles, wand, play, calendar, chart, users, school, briefcase, cpu, clock, star, globe, award, rocket, plus, x, menu) painted with `currentColor`. These are Lucide-style outlines — **a documented substitution**: the Figma's own icon vectors weren't extracted wholesale, so if you need exact parity, pull the specific glyphs from the Figma *Icons* frame.
- **Brand marks:** the geometric **F** logo and the **Founderz** wordmark are real extracted vectors — see `assets/founderz-mark.svg`, `assets/founderz-wordmark.svg`, and the self-contained `Logo` component.
- **Decorative icons** get `aria-hidden="true"`. Checkmarks in lists are SVG in purple.
- **No emoji, no unicode glyphs** used as icons.

---

## Index / manifest

**Root**

- `styles.css` — the single entry point consumers link (import-only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css` (reusable classes), `interactions.css` (hover/press states).
- `assets/` — `fonts/` (RundDisplay woff2/woff), `founderz-mark.svg`, `founderz-wordmark.svg`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing) for the Design System tab.
- `SKILL.md` — portable skill manifest for Claude Code.

**Components** (`window.FounderzDesignSystem_47078d`)

- `brand/` — **Logo**
- `forms/` — **Button**, **Input**, **Field**
- `content/` — **Pill**, **LinkArrow**, **SectionHeading**, **Avatar**, **Icon**
- `cards/` — **FeatureCard**, **Accordion**, **Testimonial**, **StatCard**, **ProgramCard**, **PostCard**, **EventCard**
- `navigation/` — **Header**, **Footer**
- `sections/` — **BannerCTA**, **Banner**, **LogoMarquee**

**UI kit**

- `ui_kits/website/` — interactive recreation of the Founderz site: **Home**, **Programa**, **Empresas**, **Pricing** (open `index.html`, switch via the top tabs).

---

*Built from the Founderz Figma + brand spec. Cards and the UI kit render against the compiled `_ds_bundle.js`, which the system regenerates automatically.*
