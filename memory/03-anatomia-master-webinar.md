# Anatomía de las LPs de máster y webinar

Extraído del HTML de producción (`refs/lps/`) el 24/08/2026, no de la teoría:
`/maic`, `/maic-dossier`, `/webinaraiact`, `/webinar-maic`, `/en-septiembre-despega`.

---

## 1. Esqueleto de máster — `/maic`, 13 secciones

El orden real, que es el que convierte. Cada H2 abre una sección:

1. Hero — H1 + pricing card flotante a la derecha
2. `Únete a la generación de creativos con IA` — social proof temprano
3. `Estructura del programa` — temario
4. `IA aplicada a tu industria creativa` — verticalización
5. `Así se vive Founderz desde dentro.` — vídeo/experiencia
6. `Un Máster diseñado por creativos para creativos.` — diferenciador
7. `Tu nueva insignia profesional.` — certificación
8. `Profesores con mucha profesión.` — claustro
9. `La IA te da alas. Nosotros te enseñamos a volar.` — método
10. `Toma las riendas. De la IA y de tu carrera.` — CTA de cierre
11. `¿Tienes dudas? Tenemos respuestas.` — FAQ
12. `¿Tu empresa también quiere dar el salto?` — puente a B2B

**El dato que más sorprende: `/maic` no tiene formulario.** 1.497 palabras, precio
visible, y ni un input. Empuja a `/maic-dossier` y `/registro`. La LP más grande
del sitio es un catálogo, no un captador.

**`/maic-dossier` es la versión que sí pide datos**: 1.114 palabras, mismo
lenguaje visual, formulario duplicado (hero + cierre).

### Layout del hero de máster

Dos columnas que colapsan a una en móvil:

```css
.maic-hero-inner  { flex-direction: column; gap: 40px; padding-block: 60px 48px; }
.maic-hero-left   { flex: none; }                        /* copy */
.maic-hero-right  { flex: none; width: 100%; }           /* pricing card */
.maic-pricing-card{ width: 100%; max-width: 400px; }
```

La pricing card **nunca pasa de 400px** y en móvil se apila debajo del copy, no
al revés: el H1 siempre va primero.

### Acordeón

Técnica moderna de grid, no `max-height`:

```css
.maic-accordion-panel { display: grid; transition: grid-template-rows 0.35s ease; }
```

Se anima `grid-template-rows` de `0fr` a `1fr`. Da altura automática sin JS de
medición y sin el salto del `max-height` fijo. **Es el patrón a copiar.**

---

## 2. Esqueleto de webinar — `/webinaraiact`, 8 secciones

El mejor ejecutado del sitio según `05-cro-playbook.md`. 1.049 palabras: cinco
veces más que `/webinar-maic` (194w), y convierte mejor. El webinar corto no es
mejor por corto.

`/en-septiembre-despega` (639w, 9 secciones) es el otro extremo: formulario de
12 campos, el más largo del sitio, y **el único countdown de todo ia.founderz.com**.

---

## 3. Formularios — cómo están hechos de verdad

### Orden de campos, idéntico en todas

```
nombre → apellidos → email → teléfono (país + prefijo) → [cualificación] → consentimiento
```

### Cualificación B2B (`/webinaraiact`) — tres selects, en este orden

| Select | Opciones reales |
|---|---|
| Tu cargo | CEO / Fundador·a · Dirección / C-Level · RRHH / L&D · Legal / Compliance · Manager · Otro |
| Tamaño de tu empresa | 1–10 · 11–50 · 51–200 · 201–1.000 · +1.000 |
| ¿Tu equipo ya usa IA? | Sí, a diario · Sí, ocasionalmente · Todavía no |

Tres preguntas, todas de un toque, ninguna abierta. Es el techo: `/en-septiembre-despega`
sube a 12 campos y es la excepción, no el modelo.

### Consentimiento

Un solo checkbox obligatorio con el texto exacto:

> He leído y acepto los Términos y condiciones y la Política de privacidad *

`/en-septiembre-despega` añade un **segundo checkbox opcional** (marketing),
separado del obligatorio. Nunca se mezclan en uno.

### CTA

`Reservar mi plaza →` — imperativo, primera persona, flecha. Nunca "Enviar".

### Teléfono

Componente propio de país + prefijo (`ES +34` por defecto), no un `<input type="tel">`
suelto. Está en `components/CountryPhoneField.tsx`.

---

## 4. Deuda detectada en producción (arreglar en LPs nuevas)

1. **Campos sin `<label>`.** En `/webinaraiact` el único `<label>` del formulario
   es el del consentimiento; el resto se apoya solo en `placeholder`. Eso rompe
   WCAG y contradice la clase `fz-label` del design system. **En LPs nuevas,
   label siempre**, aunque vaya visualmente oculto.

2. **`autocomplete` inconsistente.** Solo `/en-septiembre-despega` lo pone
   (`given-name`, `family-name`, `email`). Las demás no. Es autorrelleno gratis
   en móvil: ponerlo siempre.

3. **Sin atributo `name`.** Los formularios son componentes controlados de React
   y los campos no llevan `name`. Funciona, pero el formulario deja de funcionar
   sin JS y complica el debug. `LeadForm.tsx` sí los pone — usar ese.

4. **Formulario duplicado.** `/maic-dossier` y `/en-septiembre-despega` repiten
   el mismo `<form>` en hero y cierre. Es correcto para CRO, pero debe ser el
   mismo componente con `ctaPosition` distinto, no dos copias del markup.

5. **Faltan los `.woff2` de RundDisplay en el repo.** Producción los precarga
   (`/fonts/RundDisplay-{SemiBold,Regular,Medium}.woff2`), pero no están
   versionados aquí. Toda LP generada desde este repo cae a Trebuchet MS y **no
   es fiel a marca**. Es la deuda más grave del sistema.

---

## 5. Tracking, tal cual está en producción

- GTM (`gtm.js` + `dataLayer`) y el script de HubSpot (`hs-scripts`) cargan en
  todas.
- **No** hay formularios embebidos de HubSpot (`hsforms`): el form es propio y
  postea a un endpoint interno `app/api/<slug>/route.ts`.
- `generate_lead` no aparece en el HTML servido porque se dispara en cliente
  tras el submit con éxito — es el comportamiento correcto de `LeadForm.tsx`.
- Las 25 LPs son `noindex, nofollow` sin excepción.

---

## 6. El fallback métrico de fuente no está aplicado (CLS)

El dossier de OpenClaw lo marca como **obligatorio en toda página nueva**:

```css
@font-face { font-family: "Rund Fallback"; src: local("Arial"); size-adjust: 75.6%; }
```

Estado real comprobado el 24/08/2026:

- **No está en `styles/founderz.css`.** Lo único que hay es
  `-webkit-text-size-adjust: 100%`, que es una propiedad distinta y no tiene
  nada que ver con el CLS.
- **Producción lo tiene mal.** El HTML de `/maic` sirve un fallback con
  `size-adjust: 100%`, es decir, sin corrección métrica: es el fallback que
  genera Next automáticamente, no el de la guía.

El `75.6%` no es decorativo — es la ratio que iguala la métrica de Arial a la de
RundDisplay. Con `100%` el texto salta al cargar la fuente real, y ese salto es
CLS que penaliza el objetivo de PSI ≥ 98.

**Qué hacer:** declarar la cara `Rund Fallback` con `size-adjust: 75.6%` en
`styles/founderz.css`, junto a los `@font-face` de RundDisplay, y usarla como
siguiente familia en `--font-sans`, antes de Trebuchet MS. Es el único punto del
dossier que quedó documentado pero sin implementar en ninguna parte.
