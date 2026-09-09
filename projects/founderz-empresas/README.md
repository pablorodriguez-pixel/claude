# LP · Founderz Empresas (B2B lead gen)

Landing de captación para **formación en IA para empresas**, con message match con el email
Elevate (customer.io): mismo copy aprobado (revisión Sara), misma prueba social y mismo
tratamiento del bloque FUNDAE, ya maquetada con el sistema visual real de Founderz.

- `index.html` — la landing (HTML + CSS + JS en un solo archivo, sin dependencias de build).
- `gracias.html` — thank-you page opcional (`/gracias`) para medir conversión con URL propia.
- `vercel.json` — clean URLs, cabeceras de seguridad y cache de HTML.

---

## 1. Conectar HubSpot (lo único que hay que editar)

Al final de `index.html` hay un único bloque de configuración:

```js
window.FZ_CONFIG = {
  hubspot: {
    region:   "eu1",
    portalId: "25912905",
    formId:   "",          // ← pegar aquí el GUID del formulario
    target:   "#fz-hubspot-form",
    redirectUrl: ""        // opcional: "/gracias"
  },
  fields: { program: "programa_de_interes", utmSource: "utm_source", /* ... */ }
};
```

**Mientras `formId` esté vacío**, la tarjeta del hero muestra un placeholder de marca con un
skeleton de campos (no se rompe el diseño). En cuanto se rellena el GUID, el formulario real de
HubSpot se monta en ese hueco con los estilos Founderz ya aplicados.

### Qué necesito de HubSpot para cerrarlo

1. **GUID del formulario** (`formId`) y confirmación de `portalId` / región.
2. **Nombres internos** de las propiedades para el enriquecimiento automático. La LP rellena
   solos, si existen como **campos ocultos en el formulario**:
   - programa de interés (el chip que ha pulsado el usuario)
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
   - URL de origen
   Si en el portal se llaman de otra forma, se cambian en `FZ_CONFIG.fields` (no hay que
   tocar nada más).
3. **Comportamiento post-envío**: mensaje inline de HubSpot (ya estilado) o redirect a
   `/gracias`. Si es redirect, poner `redirectUrl: "/gracias"`.
4. Si se quiere **tracking de HubSpot** (cookie `hubspotutk` + page views), añadir el script de
   seguimiento del portal antes de `</body>`.

El formulario se embebe con **Forms v2** (`hbspt.forms.create`) en lugar del embed nuevo por
iframe: es la única forma de que los campos hereden la tipografía Rund Display, los radios
`0.5rem`, el botón pill morado y los estados de error de la marca.

### Eventos que ya empuja la LP a `dataLayer`

| Evento | Cuándo |
|---|---|
| `lp_cta_click` | clic en cualquier CTA (con `cta_location`: header / section / sticky) |
| `lp_program_select` | clic en un chip de programa (con `program`) |
| `lp_form_view` | formulario de HubSpot listo |
| `lp_form_submit` | envío correcto (con `program`) |
| `lp_video_play` | play del testimonio |
| `lp_form_submit_thankyou` | carga de `/gracias` |

Listos para GTM/GA4 sin tocar el HTML.

---

## 2. Deploy en Vercel

Proyecto estático, sin build:

1. Vercel → **Add New Project** → importar este repo.
2. **Root Directory**: `projects/founderz-empresas`
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: vacío.
4. Deploy. `vercel.json` se aplica solo (clean URLs + cabeceras).

O desde CLI:

```bash
cd projects/founderz-empresas
vercel --prod
```

**Dominio**: `ia.founderz.com` (ya puesto en `canonical` y `og:url`). Se añade en Vercel →
Settings → Domains y se crea un CNAME `ia` → `cname.vercel-dns.com` en el DNS de founderz.com.

**CSP** (opcional, si seguridad lo pide): la LP necesita permitir
`js-eu1.hsforms.net`, `js.hsforms.net`, `forms-eu1.hsforms.com`, `player.vimeo.com`,
`founderz.com` (fuentes, logos) y `*.hubspot.com`.

---

## 3. Decisiones de diseño y CRO

**Marca**
- Tokens oficiales Brand Guidelines 24/25: morado web `#5045c8` (hover `#2f2976`), Black
  `#111115`, lavender `#ECEAFB`, mint y pink como acentos.
- Rund Display servida desde founderz.com con `font-display: swap` y preload de los dos pesos
  del above the fold. Tracking `0.02em` en todo.
- Nav flotante pill blanco con blur, radios `1.875rem` desktop / `1.375rem` mobile, botones pill
  `100rem`, tags uppercase morados antes de cada H2, acordeón activo en lavender.
- Hero con **Mindscape** hecho con gradientes CSS (0 KB de imagen, escala a cualquier viewport) y
  tipografía en blanco, como manda la guía. Un solo Mindscape en toda la página; el CTA final usa
  morado plano para no encadenar dos.

**CRO**
- Formulario **en el hero**, above the fold a 1440px: el H1, la promesa y el form entran sin scroll.
- CTA primario repetido en header, hero, chips, CTA final y **barra sticky en móvil** (aparece al
  salir del hero) — una sola acción primaria por sección.
- Eliminación de objeciones donde surgen: "sin compromiso" sobre el form, las 3 promesas de qué
  pasa después de enviar, FUNDAE explicado en 3 pasos con el matiz legal ("bonifica", no
  "financia") y nota del importe recuperable.
- Prueba social **temprana**: logos + `+700.000` / `+1.700` / `4,8/5` justo debajo del hero, y
  chips de confianza (Microsoft, FUNDAE, Trustpilot) dentro del propio hero.
- Los **chips de programa** son micro-conversión: marcan la selección, hacen scroll al form,
  enfocan el primer campo y viajan a HubSpot como "programa de interés" → el comercial llama
  sabiendo qué pidió el lead.
- Copy aprobado intacto (H1 en pregunta, 4 bullets del email, cita de Tatiana, FAQ, CTA final).
  Corregido el cuarto bullet ("las personas" en vez de repetir "tu equipo"), que era la nota
  pendiente de la revisión.

**Usabilidad y accesibilidad (WCAG AA)**
- Mobile-first (375px), breakpoint de marca `579px` + saltos a 600 / 900 / 1000 / 1100px.
- Skip link, `:focus-visible` en morado (blanco sobre fondos oscuros), targets ≥ 44px, `aria-pressed`
  en los chips, `aria-live` en la zona del form, labels reales de HubSpot (nunca placeholder-as-label).
- `prefers-reduced-motion` respetado en scroll y transiciones.
- Contraste: texto sobre lavender y sobre morado verificado a 4.5:1; el gris de cuerpo es `#5a5a5a`.

**Performance**
- Cero librerías JS. Vimeo se carga **solo al hacer clic** (fachada con play), logos en `webp` +
  `loading="lazy"`, HubSpot con `defer`, gradientes en vez de imágenes de fondo.

---

## 4. Pendiente / por confirmar

- `formId` de HubSpot y nombres internos de las propiedades ocultas.
- Foto o vídeo real para el hero si se quiere sustituir el Mindscape CSS por imagen a sangre.
- Email de contacto y dirección del footer (ahora `empresas@founderz.com` y Castellana 79).
- Si la LP vive en un subdominio propio o bajo `founderz.com/empresas-ia/`, para el canonical.
