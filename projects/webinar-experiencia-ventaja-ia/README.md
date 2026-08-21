# LP Webinar — Convierte tu experiencia en ventaja con IA

Landing de captación para webinar gratuito. HTML estático de un solo fichero,
sin dependencias de build. Tokens extraídos de `reference/founderz-maqueta/css/main.css`.

## Antes de publicar

La página está completa a nivel de maquetación, pero **el contenido marcado con
`data-placeholder` es inventado** y hay que sustituirlo. Búscalos así:

```bash
grep -n 'data-placeholder' index.html
```

| Placeholder | Qué hay que poner | Aparece en |
|---|---|---|
| `fecha` | Fecha y hora reales del webinar | header, hero, sticky CTA (3 sitios) |
| `plazas` | Número real de plazas, o quitar el dato | hero |
| `logos` | Logos reales en SVG en vez de texto | sección social proof |
| `ponentes` | Nombres, cargos, bios y fotos reales | sección ponentes |
| `testimonios` | Testimonios reales con consentimiento | sección testimonios |

Además, sin sustituir:

- **El copy de beneficios y la agenda son una propuesta**, escrita desde el tema
  del slug. Revísala contra el guion real del webinar.
- **El formulario no envía nada.** Ver abajo.
- **Los Mindscapes son una aproximación en CSS** (`.mindscape`), gradientes
  radiales en la paleta de marca. Sustituir por los assets reales de marca.
- **RundDisplay no está incluida.** La fuente se sirve desde el tema de
  WordPress de founderz.com y no es redistribuible desde aquí. La página cae al
  fallback oficial (`Trebuchet MS`). Al integrarla en el sitio real heredará la
  tipográfica correcta; si se publica en un dominio de Vercel, hay que servir los
  `.woff2` desde ahí.

## Sobre los iconos

Las guías de marca especifican **Material Symbols Rounded**, pero esta página usa
un **sprite SVG inline** (trazos redondeados, estilo Lucide, que `CLAUDE.md`
admite como alternativa). El motivo es un modo de fallo concreto:

Material Symbols se sirve como webfont con ligaduras — el markup dice
`<span>check_circle</span>` y la fuente lo convierte en un icono. Si la hoja de
estilos de Google Fonts no llega, **el visitante lee "check_circle" en crudo**.
Se reprodujo durante el desarrollo (`ERR_CONNECTION_RESET`), y un guard con
`document.fonts.check()` no lo cubre: devuelve `true` aunque la familia no exista,
así que los iconos salían recortados a un cuadro de 1em.

Con SVG inline no hay petición externa que pueda fallar, y la página queda con
**cero dependencias de red**. Si se prefiere Material Symbols por fidelidad de
marca, la vía robusta es autoalojar los `.woff2` en el mismo dominio, no
enlazar Google Fonts.

Para cambiar un icono: edita el `<symbol>` correspondiente en el sprite al
principio del `<body>`, o apunta el `<use href="#i-...">` a otro id.

## Conectar el formulario

Ahora mismo `submit` valida en cliente y muestra el estado de éxito, sin enviar
datos. El `TODO` está al final del `<script>`.

Founderz usa HubSpot, así que lo directo es la Forms API:

```
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

Alternativa: embeber el formulario nativo de HubSpot y prescindir del markup
propio (se pierde control sobre el estilo, se gana tracking automático).

Sin esto la página **no captura leads**: no la publiques como activa.

## Decisiones de CRO

- **Formulario en el hero, no al final.** En una LP de webinar el formulario
  *es* la conversión; enterrarlo tras 6 secciones cuesta registros. Above the
  fold hay propuesta de valor, fecha, precio y formulario.
- **4 campos, 3 obligatorios.** Nombre, email y empresa. El rol es opcional
  porque sirve para segmentar pero no justifica fricción adicional.
- **"Gratis" tachando 99€.** Ancla de precio: da valor percibido a algo gratuito.
  Solo es honesto si 99€ es un precio real de referencia — si no lo es, quítalo.
- **Objeción de horario resuelta dos veces.** "En directo + grabación" en el
  hero y una FAQ dedicada. Es la razón nº1 de no registrarse en un webinar.
- **Sección "no es para ti".** Descalificar aumenta la conversión de los que sí
  encajan y reduce el no-show.
- **CTA sticky solo en mobile**, aparece al dejar atrás el hero (en desktop el
  formulario ya está visible).
- **Teaser a programas antes de la FAQ.** Monetiza al visitante caliente sin
  competir con el CTA principal.

### Variantes A/B que propondría

1. **H1**: "Convierte tu experiencia en tu mayor ventaja con IA" vs. una versión
   con la objeción de frente: "La IA no te va a sustituir. Quien la use, sí."
2. **Precio ancla**: con "99€" tachado vs. sin ancla. Mide si añade valor
   percibido o si activa desconfianza.
3. **Campos**: 3 obligatorios vs. solo email. Menos fricción contra peor
   cualificación del lead.

## Accesibilidad y estructura

Verificado con un parser de HTML y cálculo de ratios WCAG:

- Un solo `<h1>`, jerarquía de encabezados correcta
- 0 errores de balanceo de etiquetas
- Todos los `label[for]` apuntan a un `id` existente, sin `id` duplicados
- Iconos decorativos con `aria-hidden="true"`
- Errores de formulario con `role="alert"` y `aria-invalid`
- Skip link al formulario, foco visible en todo elemento interactivo
- `prefers-reduced-motion` respetado
- Todos los pares de color cumplen **WCAG AA** (mínimo del set: 4.32:1)
- Targets táctiles ≥48px
- Sin desbordamiento horizontal a 375, 768, 1440 y 1920px
- Cero peticiones de red externas

Comprobado también el comportamiento del formulario con Playwright: submit vacío
marca los 4 errores, el foco salta al primer campo inválido, el email inválido se
rechaza, el error se limpia al corregir, sin consentimiento no envía, y el envío
correcto conmuta al estado de éxito.

## Desarrollo local

```bash
python3 -m http.server 4000 --directory .
# http://localhost:4000
```
