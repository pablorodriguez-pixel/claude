# Estilo de código y entrega

## Stack

- **Next.js 16.2 (App Router) + React 19 + Tailwind 4 + TypeScript**, deploy en Vercel.
- Proyecto Vercel: **`founderz-growth-lps`** (`prj_REbeqjSroKcEUKInPLT2wC7EvT5Y`),
  team `Founderz Growth` (`team_KtTvZcyWZ67b8OLLmIUr9gnx`), dominio de producción
  **ia.founderz.com**. Los deployments antiguos siguen apareciendo con el nombre
  `founderz-vsl-lp`: es el mismo proyecto renombrado.
- ⚠️ Next 16 tiene breaking changes respecto al conocimiento de entrenamiento →
  consultar `node_modules/next/dist/docs/` antes de dar por buena una API.

## Convenciones

- Una carpeta por LP en `app/<slug>/`, con `layout.tsx` (metadata + noindex) y
  `page.tsx`.
- **CSS en hoja externa, nunca inline.** Decisión de Pablo (20/08/2026): el CSS de
  marca vive en `styles/founderz.css` (tokens Tailwind 4 con `@theme` +
  componentes `fz-*`); lo específico de una LP va en `app/<slug>/<slug>.css`
  importado por su `page.tsx`. Prohibido `<style>` inline y prohibido duplicar
  tokens.
- Componentes compartidos en `components/`. Reutilizar antes que copiar: cuando
  dos LPs comparten estructura, **una página con prop `variant`** (patrón
  `/compliance` + `/fundae`), no dos copias.
- Fuentes locales en `public/fonts/` (RundDisplay woff2, preload en layout raíz).
- Assets de cada LP en `public/<slug>/`: **descargar las imágenes de WP y
  servirlas en local**, nunca hotlinkear a founderz.com.
- API routes de leads en `app/api/<slug>/route.ts`.

## Performance — objetivo PSI ≥ 98

- Página 100% estática (prerender).
- Imágenes locales **con `width` y `height` explícitos** (la deuda de CLS más
  repetida del corpus actual), `loading="lazy"` bajo el fold, `webp`/`avif`.
- GTM y HubSpot diferidos a primera interacción o timeout.
- `preconnect` / `dns-prefetch` a dominios críticos; preload de las 3 fuentes clave.
- Fallback métrico de fuente para CLS de RundDisplay.
- Skeletons con altura reservada para embeds (anti-CLS).

## Deploy

- **Preview:** `npm run deploy` → REST API `POST /v13/deployments` sin target.
- **Producción:** `npm run deploy:prod`, protegido por guardia (ver abajo).
- El CLI de Pablo está logueado como `pablorodriguez-2456`.
- Verificación de PSI con la PageSpeed Insights API sobre la URL de producción.

### Guardia de producción — leer antes de tocar `--prod`

`ia.founderz.com` sirve **25 LPs vivas** cuyo código fuente **no está en este
repo** (los deploys buenos salieron del CLI en la máquina de Pablo; el repo que
tiene conectado el proyecto en git es `pablorodriguez-pixel/claude`, que no
contiene la app — de ahí la docena de deployments en ERROR).

Consecuencia: **un deploy a producción desde este repo borraría las 25 LPs.**
`scripts/deploy.mjs` compara las rutas del build contra
`refs/production-routes.json` y **se niega** a desplegar a producción si falta
alguna. No desactives esa comprobación: la solución correcta es subir a este
repo el fuente de `founderz-vsl-lp`.

### Egress de las sesiones de Claude Code en web

`api.vercel.com` está **bloqueado** por la política de red del entorno remoto
(403 en el CONNECT del proxy). Desde una sesión web hay que desplegar con el MCP
de Vercel. Para que `scripts/deploy.mjs` funcione también desde aquí, hay que
añadir `api.vercel.com` a la allowlist del environment en
https://code.claude.com/docs/en/claude-code-on-the-web
