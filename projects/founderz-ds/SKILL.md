---
name: founderz-design
description: Use this skill to generate well-branded interfaces and assets for Founderz (premium IA & business school), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

Founderz is a Spanish premium school of AI and business. The look is clean, spacious and
aspirational: RundDisplay typography, a single purple accent (`#5045c8`), section backgrounds
that rotate white → grey → black → lilac → purple, flat hairline-bordered cards, pill buttons,
and real photography with dark overlays. Copy is Spanish, sentence case, addresses the reader
as "tú", and uses no emoji.

Key files:
- `readme.md` — full brand guide: content voice, visual foundations, iconography, manifest.
- `styles.css` — single CSS entry point; `@import`s all tokens + fonts (RundDisplay).
- `tokens/` — color, type, spacing, font-face, base classes and interaction states.
- `components/` — React primitives (Button, Pill, Card family, Header/Footer, etc.), each with
  a `.d.ts` contract and `.prompt.md` usage note. They expose on
  `window.FounderzDesignSystem_47078d` via the compiled `_ds_bundle.js`.
- `ui_kits/website/` — interactive recreation of the marketing site (Home/Programa/Empresas/
  Pricing) showing how the components compose.
- `assets/` — RundDisplay fonts and the Founderz logo SVGs.
- `guidelines/` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and
create static HTML files for the user to view. If working on production code, copy assets and
read the rules here to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask them what they want to build or
design, ask a few questions, and act as an expert designer who outputs HTML artifacts *or*
production code, depending on the need.
