# Integración en local (Cursor / Claude Code)

El paquete `webinar-registration-lp/theme/` **replica las rutas reales** de `founderz-theme`.
Integrarlo = copiar cada archivo a su ruta equivalente dentro del tema y **quitar el sufijo
`.txt`** de los `.js`/`.scss` (ese sufijo solo existe para que el compilador del design system
no intentara empaquetarlos; no forma parte del tema).

> Nota: yo no puedo hacer commits ni tocar tu disco. Tú descargas el ZIP y lo aplicas con uno
> de los dos métodos de abajo.

---

## Mapa de rutas (paquete → tema)

```
theme/templates/webinar-registration-lp.php                      → templates/
theme/partials/founderz/components/countdown/countdown-a.php     → partials/founderz/components/countdown/
theme/partials/founderz/sections/webinar-*.php                   → partials/founderz/sections/
theme/src/scss/entries/pages/webinar-registration-lp.scss(.txt)  → src/scss/entries/pages/
theme/src/scss/founderz/components/countdown/_countdown-a.scss(.txt) → src/scss/founderz/components/countdown/
theme/src/scss/founderz/sections/webinar/_*.scss(.txt)           → src/scss/founderz/sections/webinar/
theme/src/js/entries/pages/WebinarRegistrationLp.js(.txt)        → src/js/entries/pages/
theme/src/js/modules/WebinarCountdown.js(.txt)                   → src/js/modules/
theme/acf-json/group_webinar_registration_lp.json               → acf-json/
theme/snippets/*                                                  → (pegar a mano, ver paso de wiring)
```

---

## Método A — Manual (rápido)

```bash
# 1) Descomprime el ZIP, p. ej. en ~/Downloads/webinar-registration-lp
# 2) Desde la RAÍZ del tema (wp-content/themes/founderz-theme):
cp -R ~/Downloads/webinar-registration-lp/theme/templates/.        templates/
cp -R ~/Downloads/webinar-registration-lp/theme/partials/.         partials/
cp -R ~/Downloads/webinar-registration-lp/theme/src/.              src/
cp -R ~/Downloads/webinar-registration-lp/theme/acf-json/.         acf-json/

# 3) Quitar el sufijo .txt de los archivos copiados:
find src -name '*.txt' | while read -r f; do mv "$f" "${f%.txt}"; done

# 4) Wiring (ver sección "Wiring" más abajo): enqueue + vite.config
# 5) npm run build  (o npm run dev en local)
```

---

## Método B — Con Claude Code (recomendado)

1. Descomprime el ZIP en la raíz del tema, en una carpeta temporal `_handoff/`
   (queda como `founderz-theme/_handoff/webinar-registration-lp/`).
2. Abre Claude Code en el repo del tema y pega este prompt:

```
Integra el paquete que está en _handoff/webinar-registration-lp/theme/ dentro de este tema
de WordPress (founderz-theme), respetando nuestras convenciones de CLAUDE.md.

1. Copia cada archivo a su ruta equivalente en el tema (las rutas dentro de theme/ ya
   reflejan la estructura real): templates/, partials/founderz/, src/scss/, src/js/, acf-json/.
2. Quita el sufijo .txt de todos los .js y .scss copiados (era solo para almacenamiento;
   la extensión real es .js / .scss).
3. Wiring:
   - Añade la función founderz_enqueue_webinar_registration_lp_vite() de
     theme/snippets/vite-enqueues.snippet.php a functions/enqueues/vite-enqueues.php.
   - Añade la entrada de theme/snippets/vite.config.snippet.js a rollupOptions.input en
     vite.config.js.
4. Verifica que el ACF JSON (group_webinar_registration_lp.json) queda en acf-json/ para que
   sincronice solo.
5. Revisa que las claves de iconos usadas en los partials (svg_icon: calendar, clock, wand,
   cpu, rocket, check, arrow-right) existan en functions/helpers/svg_icons.php (SVG_ICONS).
   Si alguna no existe, ajústala a la equivalente real del tema.
6. Borra la carpeta _handoff/ al terminar.
7. Ejecuta npm run build y dime si hay errores de SCSS o de resolución de imports.

No reescribas componentes del DS (button-a, pill-a, heading-a, card-e, testimonial-a,
hubspot-form-lazy): el paquete ya los reutiliza vía include/$args.
```

> En **Cursor** funciona igual: pega ese mismo prompt en el chat con el repo abierto.

---

## Wiring (si lo haces a mano)

**`functions/enqueues/vite-enqueues.php`** — añade la función de
`snippets/vite-enqueues.snippet.php` (`founderz_enqueue_webinar_registration_lp_vite()`).

**`vite.config.js`** → `build.rollupOptions.input` — añade:
```js
WebinarRegistrationLp: resolve(__dirname, "src/js/entries/pages/WebinarRegistrationLp.js"),
```

**ACF**: el JSON sincroniza solo (acf-json local). Si no aparece: *Custom Fields → Tools → Sync*.

**Página**: crea una Página (o un Webinar) y asígnale la plantilla **"Webinar Registration LP"**;
rellena los campos ACF.

---

## A revisar contra el tema

- Claves de `SVG_ICONS` (iconos) — ver paso 5 del prompt.
- Header/footer: uso `2025-simple` / `2025-simple-dark` (como el registro actual).
- Formulario: HubSpot vía `hubspot-form-lazy.php`; el éxito lo gestiona HubSpot (página de thanks).
