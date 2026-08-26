# Generador de landing pages Founderz

Agente + design system + pipeline para crear las LPs de **ia.founderz.com**.

```bash
npm install
npm run new -- --slug mi-lp --tipo webinar --titulo "Mi LP"   # andamiaje
npm run dev                                                    # desarrollo
npm run qa -- --slug mi-lp                                     # gate obligatorio
npm run deploy                                                 # preview en Vercel
```

O directamente: pídeselo al agente con **`/founderz-lp`**.

---

## ⚠️ Antes de tocar producción, lee esto

`ia.founderz.com` sirve **25 landing pages vivas** cuyo código fuente **no está
en este repositorio**. Los deploys buenos salieron del CLI en la máquina de
Pablo; el proyecto de Vercel está conectado por git a este repo, que no contenía
la app — de ahí la docena de deployments en ERROR del historial.

Consecuencias, todas reales:

1. **Un deploy a producción desde este repo borraría las 25 LPs.**
   `scripts/deploy.mjs` compara el repo con `refs/production-routes.json` y
   aborta si falta alguna ruta. **No desactives esa comprobación.**
2. **Merge de una rama de trabajo a la rama de producción = el mismo desastre**,
   por el git integration. No mergees a producción hasta resolver el punto 3.
3. **El arreglo correcto** es subir a este repo el fuente de `founderz-vsl-lp`.
   A partir de ahí, este repo es la única fuente de verdad y crear una LP es
   añadir una carpeta y hacer push.

---

## Estructura

```
app/                     una carpeta por LP: layout.tsx + page.tsx + <slug>.css
  layout.tsx             raíz: noindex + GTM + HubSpot diferidos
  robots.ts              Disallow: /
components/              LeadForm, Accordion, Section, StickyCta, LogoMarquee…
lib/                     tracking.ts (spec de eventos), countries.ts
styles/founderz.css      design system: tokens @theme + componentes fz-*
memory/                  la memoria del agente — se lee antes de generar
refs/
  production-routes.json rutas vivas en producción (guardia de deploy)
  lp-corpus.json         señales extraídas de las 25 LPs reales
  lps/*.html             HTML de producción, para copiar patrones probados
reference/               brandbook oficial + maqueta real del MAIC
scripts/                 new-lp · qa · deploy · analyze-corpus
.claude/skills/founderz-lp/  el agente
```

## Memoria del agente

| Fichero | Contenido |
|---|---|
| `memory/00-brand.md` | Qué es fuente de verdad y qué corregir de producción |
| `memory/01-reglas-obligatorias.md` | Las 11 reglas no negociables + spec de tracking |
| `memory/02-arquetipos-lp.md` | Los 6 arquetipos de LP y el veredicto del corpus |
| `memory/04-estilo-codigo.md` | Convenciones, performance y deploy |
| `memory/05-cro-playbook.md` | Playbook CRO y copy |
| `memory/99-dossier-openclaw.md` | Dossier original migrado de openclaw |

Cuando descubras un patrón que funciona, o Pablo corrija algo, **escríbelo en
`memory/`**. Es lo que hace que el agente mejore entre sesiones.

## Decisiones tomadas

- **CSS en hoja externa, nunca inline** (Pablo, 20/08/2026). Tokens en
  `styles/founderz.css`; lo propio de cada LP en `app/<slug>/<slug>.css`.
- **Tailwind 4** con tokens de marca en `@theme`.
- **`noindex, nofollow`** en todo, siempre.
- **Un solo proyecto de Vercel multi-LP**: `founderz-growth-lps`.
- **Deploy por REST API** con `VERCEL_TOKEN`, no por CLI.

## Pendientes que necesitan a Pablo

1. **Fuentes RundDisplay** (`.woff2` de Light, Regular, Medium, SemiBold) en
   `public/fonts/`. Sin ellas todo cae a Trebuchet MS y no es fiel a marca.
2. **Fuente de `founderz-vsl-lp`** en este repo (ver el aviso de arriba).
3. **`api.vercel.com` en la allowlist** del environment de Claude Code web: hoy
   está bloqueado por la política de egress y el deploy por API no puede
   conectar desde una sesión web.
4. **GA4 Measurement ID** (regla #4, sin confirmar).
5. **Imágenes y Mindscapes**: ¿repo, Vercel Blob o CDN de founderz.com?
