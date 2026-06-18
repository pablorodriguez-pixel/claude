# Founderz Website — UI kit

A high-fidelity, interactive recreation of the Founderz marketing site, built entirely from the design-system components.

## Run
Open `index.html`. Use the top tab bar to switch between the four core screens.

## Screens
- **Home.jsx** — homepage: hero, partner marquee, interactive program cards (hover to expand), Microsoft banner, stats, feature grid, agenda, testimonials, FAQ, blog grid, CTA.
- **ProgramLP.jsx** — program landing page: dark image hero with a lead form, stats bar, sticky syllabus accordions, professors (dark), testimonials, lilac financing, CTA.
- **Empresas.jsx** — B2B landing: dark hero + form, black companies box, bordered advantage cards, purple Fundae banner, testimonials, dark CTA.
- **Pricing.jsx** — pricing tables (Másters + specialised courses with purple header), "what's included", financing FAQ and a sticky purple price bar.

## Structure
- `data.js` — shared fake content (images, programs, testimonials, FAQs…). Exposes `window.FZ`.
- `SiteChrome.jsx` — `Section`, `SiteHeader`, `SiteHeaderTransparent`, `SiteFooter` helpers (`window.*`).
- Screens compose components from `window.FounderzDesignSystem_47078d` — they do not re-implement primitives.

Images are Unsplash placeholders; swap for real Founderz photography in production.
