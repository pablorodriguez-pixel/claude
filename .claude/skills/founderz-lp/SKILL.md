---
name: founderz-lp
description: Crea, revisa y despliega landing pages de Founderz (ia.founderz.com) con la marca, las reglas obligatorias y el playbook CRO ya aplicados. Úsala cuando se pida una LP, landing, página de captación, registro de webinar, lead magnet, test/diagnóstico/calculadora, dossier de máster, página B2B/empresas, VSL o página de gracias; y también para auditar o mejorar una LP existente del repo. No la uses para páginas del WordPress de founderz.com.
---

# Agente de landing pages Founderz

Generas LPs para **ia.founderz.com**. Stack: Next.js 16 App Router + React 19 +
Tailwind 4 + TypeScript, todo estático, CSS en hoja externa.

## 0. Antes de escribir una línea

Lee, en este orden, solo lo que necesites:

| Fichero | Cuándo |
|---|---|
| `memory/01-reglas-obligatorias.md` | **Siempre.** Son 11 reglas no negociables. |
| `memory/02-arquetipos-lp.md` | **Siempre.** Para clasificar la petición. |
| `memory/05-cro-playbook.md` | Al escribir copy. |
| `memory/00-brand.md` | Al tocar color, tipografía o Mindscapes. |
| `memory/04-estilo-codigo.md` | Al tocar build, deploy o performance. |
| `CLAUDE.md` §1-§3 | Especificación completa de marca. |
| `refs/lp-corpus.json` | Para comparar con las 25 LPs reales de producción. |
| `refs/lps/<slug>.html` | Para copiar un patrón concreto ya probado. |

## 1. Clasifica el arquetipo

Todo empieza aquí. Los seis arquetipos y sus secciones están en
`memory/02-arquetipos-lp.md`:

- **master** — captación de máster, ticket alto (`/maic`, `/maic-dossier`)
- **webinar** — registro a evento en directo (`/webinaraiact`, `/en-septiembre-despega`)
- **leadmagnet** — test, diagnóstico o calculadora (`/diagnostico-ia`, `/calculadora-salarial-ia`)
- **b2b** — reunión comercial con empresas (`/compliance`, `/fundae`)
- **vsl** — gate de vídeo (`/`, `/creativos/video`)
- **gracias** — post-conversión (`/maic-dossier/gracias`)

Si la petición no encaja limpiamente en uno, di cuál es el más cercano y por qué
antes de maquetar.

## 2. Pregunta solo lo que no puedes deducir

Pregunta **siempre** (regla #8, no la deduzcas nunca):

> Si el form genera un deal, ¿qué propiedades de programa mando?
> `program_id`, `program_name`, `program_edition`, `program_lang`, `price`, `currency`.
> Fuente: Google Sheet "landing_slug → programa"
> `1_mxzCzu9TyVlWDxnQjOu1ZWM5Pd0eB5QeIHQlHFEcBs`.

Pregunta si falta y cambia el resultado: oferta y precio exactos, fecha real del
evento, formId de HubSpot, público objetivo. Lo demás (estructura, copy, orden de
secciones) lo decides tú con el playbook y lo justificas.

## 3. Genera

```bash
npm run new -- --slug <slug> --tipo <arquetipo> --titulo "Título"
```

Crea `app/<slug>/{layout.tsx,page.tsx,<slug>.css}` y `public/<slug>/` con las
reglas ya cableadas. **El andamiaje no es la LP**: sustituye cada `TODO` por copy
real. No dejes ni un `TODO` en lo que entregues.

Reglas de implementación:

- **CSS en hoja externa. Nunca inline.** Tokens y componentes `fz-*` en
  `styles/founderz.css`; lo propio de la LP en `app/<slug>/<slug>.css`. Prohibido
  `<style>` y prohibido redefinir tokens de marca en la LP.
- **Reutiliza los componentes** de `components/`: `LeadForm` (ya trae país,
  prefijo, TyC y el evento `generate_lead`), `Accordion` (`<details>` nativo,
  accesible sin JS), `Section`, `StickyCta`, `LogoMarquee`.
- **Dos LPs parecidas = una página con prop `variant`**, no dos copias. Es el
  patrón de `/compliance` + `/fundae`, que hoy comparten el 97% del texto.
- **Imágenes:** descárgalas a `public/<slug>/`, nunca hotlink a founderz.com, y
  **siempre con `width` y `height`**. Es la deuda más repetida del corpus actual
  (65 de 66 imágenes de `/maic-dossier` van sin dimensiones).
- **Un solo `<h1>`** por página. `<main id="main">` para que funcione el skip link.

## 4. Copy

Del playbook, lo que más mueve la aguja:

1. **H1 nunca vago.** `[Programa] + [dominio concreto]`, o el diferenciador
   único. Compara `/creativos` ("El vídeo que cambia cómo los creativos trabajan
   con IA") con `/creativos2` ("La IA no va a reemplazarte. Va a reemplazar al
   creativo que no sabe usarla."): el segundo gana.
2. **FOMO honesto:** oferta en top bar sticky, precio tachado con el ahorro en €,
   repetición antes del CTA final. Nunca un countdown falso.
3. **CTA concreto en imperativo:** "Inscribirme con descuento", no "Enviar".
4. Números por encima de adjetivos: "925 €", "9 módulos", "+20 profesores".
5. Tuteo, español neutro. **Prohibido**: "sinergias", "ecosistema",
   "transformación digital".

Patrones del corpus que funcionan, en `memory/05-cro-playbook.md`. Roba el
patrón, no el texto.

## 5. QA — obligatorio, sin atajos

```bash
npm run qa -- --slug <slug>
```

Verifica automáticamente noindex, GTM, HubSpot, país + prefijo, TyC,
`appearance:none`, un único `h1`, imágenes con dimensiones y alt, ausencia de CSS
inline, objetivos táctiles de 44px, y **overflow horizontal a 390px**. Deja
screenshots en `qa/<slug>-390.png` y `-1440.png`.

**Mira el de 390px antes de entregar** (regla #11). Si hay overflow, la causa
casi siempre es un input con ancho intrínseco dentro de un grid: `min-width: 0`
en los hijos del grid y en inputs/selects.

No entregues con errores de QA. Los avisos se explican; los errores se arreglan.

## 6. Deploy

```bash
npm run deploy         # preview
npm run deploy:prod    # producción — con guardia
```

Dos cosas que tienes que saber y decir cuando toque:

1. **`api.vercel.com` está bloqueado** por la política de egress de las sesiones
   de Claude Code en web. Desde una sesión web, despliega con el MCP de Vercel;
   el script funciona en local y en CI. Para arreglarlo del todo hay que añadir
   `api.vercel.com` a la allowlist del environment.
2. **La guardia de producción existe por un motivo real.** `ia.founderz.com`
   sirve 25 LPs cuyo fuente no está en este repo, así que un deploy a producción
   desde aquí las borraría. `scripts/deploy.mjs` aborta si falta alguna ruta de
   `refs/production-routes.json`. **No desactives la comprobación**: la solución
   es subir a este repo el fuente de `founderz-vsl-lp`.

## 7. Al terminar, informa así

- Qué arquetipo has usado y por qué.
- Las decisiones CRO relevantes: por qué ese H1, por qué el CTA ahí, qué
  hipótesis se puede testar.
- El resultado de QA, con el screenshot de 390px.
- Lo que has dejado pendiente y por qué (imágenes que no tenías, propiedades de
  programa sin confirmar, copy que necesita validación).

Si ves una oportunidad clara de test A/B, propónla: variante, hipótesis y métrica.
El corpus ya tiene un A/B bien planteado (`/creativos` vs `/creativos2`) del que
copiar el planteamiento.

## Aprender del corpus

`refs/lp-corpus.json` tiene las señales de las 25 LPs de producción (estructura,
copy, forms, medios, tracking, marca). Regenerar tras añadir LPs nuevas al corpus:

```bash
npm run corpus
```

Cuando descubras un patrón nuevo que funciona, o Pablo corrija algo, **escríbelo
en `memory/`**. Esa es la memoria del agente y va a git.
