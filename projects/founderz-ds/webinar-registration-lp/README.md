# Webinar Registration LP — paquete para `founderz-theme`

Landing de **registro de webinars** (gratuita), orientada a conversión, construida con las
convenciones del tema (`CLAUDE.md`): PHP modular, BEM + nesting, mixins de sección, `@use`
con alias de Vite, ACF con secciones toggleables (`is_active`) y formulario **HubSpot** (lazy).
Sin React.

La maqueta visual de referencia 1:1 está en la pestaña **Webinar** del UI kit
(`ui_kits/website/index.html`) de este design system.

> **Nota sobre extensiones.** Dentro de este proyecto (un design system), los archivos de
> código `.js` y `.scss` se guardan con un sufijo extra **`.txt`** (p. ej.
> `WebinarRegistrationLp.js.txt`) para que el compilador del DS no intente empaquetarlos. **Al
> copiarlos al tema, elimina el `.txt` final** para dejar la extensión real (`.js` / `.scss`).
> El ZIP descargado ya trae las extensiones correctas, sin `.txt`. Los `.php`, `.json` y este
> `README.md` se mantienen tal cual.

---

## Estructura del paquete

Todo cuelga de `theme/` replicando las rutas reales dentro de `founderz-theme/`:

```
theme/
├── templates/
│   └── webinar-registration-lp.php                         → templates/
├── partials/founderz/
│   ├── components/countdown/countdown-a.php                → partials/founderz/components/countdown/
│   └── sections/
│       ├── webinar-hero-form.php                           → partials/founderz/sections/
│       ├── webinar-value-cards.php
│       ├── webinar-agenda.php
│       ├── webinar-speaker.php
│       ├── webinar-audience.php
│       ├── webinar-testimonials.php
│       ├── webinar-faqs.php
│       └── webinar-final-cta.php
├── src/scss/
│   ├── entries/pages/webinar-registration-lp.scss          → src/scss/entries/pages/
│   └── founderz/
│       ├── components/countdown/_countdown-a.scss          → src/scss/founderz/components/countdown/
│       └── sections/webinar/                               → src/scss/founderz/sections/webinar/
│           ├── _hero-form.scss  _value-cards.scss  _agenda.scss  _speaker.scss
│           ├── _audience.scss   _testimonials.scss  _faqs.scss   _final-cta.scss
├── src/js/
│   ├── entries/pages/WebinarRegistrationLp.js              → src/js/entries/pages/
│   └── modules/WebinarCountdown.js                         → src/js/modules/
├── acf-json/
│   └── group_webinar_registration_lp.json                  → acf-json/ (sync automático)
└── snippets/
    ├── vite-enqueues.snippet.php                           → pegar en functions/enqueues/vite-enqueues.php
    └── vite.config.snippet.js                              → pegar en vite.config.js (rollupOptions.input)
```

> Las rutas SCSS usan alias del tema (`@founderz/sections/webinar/hero-form` →
> `src/scss/founderz/sections/webinar/_hero-form.scss`). Mantén la subcarpeta `webinar/`.

---

## Instalación

1. **Copia los archivos** a sus rutas reales (ver mapa de arriba). Los partials nuevos van en
   `partials/founderz/` (DS), nunca en `legacy/`.
2. **Enqueue:** pega `founderz_enqueue_webinar_registration_lp_vite()` de
   `snippets/vite-enqueues.snippet.php` en `functions/enqueues/vite-enqueues.php`.
3. **Vite:** añade la entrada de `snippets/vite.config.snippet.js` a `rollupOptions.input` en
   `vite.config.js`.
4. **ACF:** el JSON se sincroniza solo (acf-json local del tema). Si no aparece, ve a
   *Custom Fields → Tools → Sync*.
5. **Build:** `npm run build` (o `npm run dev` en local con `FOUNDERZ_VITE_DEV`).
6. **Página:** crea una *Página* (o un *Webinar*) y asígnale la plantilla
   **“Webinar Registration LP”**. Rellena los campos ACF.

---

## Cómo consume ACF

El template lee un grupo ACF por sección; cada grupo tiene `is_active` (true/false) que la
muestra u oculta sin borrar el contenido, e `id` para el anchor. Las listas (tarjetas, agenda,
perfiles, testimonios, FAQs) son **repeaters**.

| Sección | Grupo ACF | Partial |
|---|---|---|
| Hero + formulario | `hero` | `webinar-hero-form.php` |
| Qué vas a aprender | `value` | `webinar-value-cards.php` (card-e) |
| Agenda | `agenda` | `webinar-agenda.php` |
| Ponente | `speaker` | `webinar-speaker.php` |
| ¿Es para ti? | `audience` | `webinar-audience.php` |
| Testimonios | `testimonials` | `webinar-testimonials.php` (testimonial-a + Swiper) |
| FAQs | `faqs` | `webinar-faqs.php` (acordeón `#faqs-accordion`) |
| CTA final | `final_cta` | `webinar-final-cta.php` |

La **fecha del webinar** (`hero.datetime`) alimenta el contador en vivo del hero y del CTA
final: el partial `countdown-a.php` la emite en ISO 8601 en `data-end-date` y el módulo
`WebinarCountdown.js` (hook `.js--countdown`) la actualiza cada segundo.

El **formulario** es HubSpot vía `hubspot-form-lazy.php` (`hero.form_id` + portal/region). El
estado de éxito lo gestiona HubSpot (redirección a la página de *thanks* existente). Los CTAs
secundarios hacen scroll suave a `#registro` (la columna del formulario en el hero).

---

## Componentes del DS reutilizados (no se reescriben)

`button-a`, `pill-a`, `heading-a`, `card-e`, `testimonial-a` + `avatar-a`, `hubspot-form-lazy`.
Nuevos en este paquete: `countdown-a` (componente) y las 8 secciones `webinar-*`.

## Pendiente de verificar contra el tema

- **Iconos:** las claves `svg_icon` (calendar, clock, wand, cpu, rocket, check, arrow-right)
  deben existir en `SVG_ICONS` (`functions/helpers/svg_icons.php`). Ajusta las claves a las
  reales del tema si difieren.
- **Header/footer:** usa `2025-simple` / `2025-simple-dark` (como el template de registro
  existente). Cámbialo si esta landing necesita otro chrome.
- **Ritmo de fondos:** blanco → lilac → oscuro → blanco → gris → blanco → morado. Revisa que no
  choque con header/footer elegidos.
