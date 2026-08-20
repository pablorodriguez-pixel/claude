# Reglas obligatorias — ia.founderz.com

**Ninguna es negociable.** Cada una viene de una corrección real de Pablo.
El checklist de `scripts/qa.mjs` verifica automáticamente las marcadas con 🤖.

## Indexación y tracking

1. 🤖 **NOINDEX SIEMPRE** — `robots: { index: false, follow: false }` en el layout de
   cada LP **y** `robots.txt` con `Disallow: /`. Lighthouse bajará el score de SEO
   por `is-crawlable`: es esperado e irrelevante.
2. 🤖 **GTM `GTM-5B9S6LB`** en el layout raíz, diferido a la primera interacción
   (wheel/click/touch/key) o timeout de 30 s. Cubre todo el dominio.
3. 🤖 **HubSpot `js-eu1.hs-scripts.com/25912905.js`** en el layout raíz, mismo
   diferido. Cubre todo automáticamente.
4. **GA4 Measurement ID** — pendiente de confirmar por Pablo. No inventarlo.

## Formularios

5. 🤖 **País obligatorio** — selector de país + prefijo telefónico, por defecto en
   todos los forms. (Pablo, 24/07/2026)
6. 🤖 **TyC obligatorio** — checkbox `required` con enlace a
   `founderz.com/es/politica-de-privacidad`. Por defecto, siempre.
   *(Incumplido hoy en `/webinar-maic` — arreglar.)*
7. 🤖 **Selects en iOS Safari** — pierden la flecha con CSS custom. Siempre
   `appearance: none` + chevron SVG propio (patrón `select.dx-field`).
8. **Forms que generan deal** — preguntar SIEMPRE a Pablo qué propiedades de
   programa enviar: `program_id`, `program_name`, `program_edition`,
   `program_lang`, `price`, `currency`. Fuente de verdad: Google Sheet
   "landing_slug → programa" `1_mxzCzu9TyVlWDxnQjOu1ZWM5Pd0eB5QeIHQlHFEcBs`
   (incluye `hs_form_id` y `lead_source` GTM `form_mql` / `form_lead`).
   Programas: MAIC · MAII · COPILOT · CLAUDE · GOOGLEAI · VIBECODING.
   Precios en ES EUR / CO COP / MX MXN.
9. **Deals HubSpot** — verificar pipeline y propiedades correctas antes de enviar.
10. **Form B2B oficial AI Act** — form-id `b87510a8-2970-4574-bd55-92ae1f9e96d4`.
    Requiere `country_lead` (ISO), `numemployees`, `0-2/company_industry`,
    consentimiento legal id `141476705`.

## QA

11. 🤖 **QA móvil obligatorio antes de entregar** (Pablo, 31/07/2026) — screenshot
    real a **390px**: forms completos, `scrollWidth <= clientWidth`, nada cortado.
    Causa típica de overflow: inputs con ancho intrínseco dentro de grids →
    `min-width: 0` en hijos de grid y en inputs/selects.

---

## Spec de tracking de webinars externos a WP (Pablo, 20/08/2026)

- El sitio **debe** vivir bajo subdominio de `founderz.com` para heredar las
  cookies `hubspotutk` y `founderz_ga4_user_id`. CORS ya está en whitelist para
  `*.founderz.com`. Un dominio `*.vercel.app` **no** sirve para esto.
- **`page_load_controlled`** en toda carga: `user_id` (cookie
  `founderz_ga4_user_id`) + `hubspot_id` (cookie `hubspotutk`); `"notset"` si faltan.
- **`generate_lead`** solo en submit con éxito: `program_*` = `"notset"`,
  `lead_source` y `lead_type` = `"form_lead"`, `form_id`,
  `form_location` (pathname), `form_email`, `cta_position` = `"notset"`.
- Detección de éxito: v4 → evento `hs-form-event:on-submission:success`;
  legacy → `message` con `hsFormCallback` / `onFormSubmitted`.
- Reutilizar el **mismo embed de HubSpot** (portalId `25912905` + formId del
  webinar): crea contacto y form submission, nada más.
- Evento custom **`pe25912905_webinar_registration`**: POST a
  `https://founderz.com/wp-json/fz/v1/hubspot/webinar-registration` con `email`,
  `event_id`, `event_name`, `marketing_event_id`, `hs_page_url`, `hs_page_title`,
  `hs_page_referrer`, `utk`, `idempotency_key` (email + evento + minuto) y `utm_*`.
- `HUBSPOT_MARKETING_EVENT_ID` y `WEBINAR_NAME` **configurables por webinar**, no
  hardcodeados. En WP viven como `data-event-id`, `data-marketing-event-id` y
  `data-event-name` en el `<main>`.
