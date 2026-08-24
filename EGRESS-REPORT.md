# Informe de egress — api.vercel.com

- **Fecha/hora (UTC):** `Mon Aug 24 08:03:35 UTC 2026`
- **Arranque del contenedor:** `2026-08-24 08:02:49`

## 1. Salida de `node scripts/check-egress.mjs`

```

✗ api.vercel.com                  bloqueado por el proxy (allowlist) Deploy por REST API, logs de build, estado del proyecto
✗ founderz.com                    bloqueado por el proxy (allowlist) Descargar imágenes de WP para servirlas locales (perf)
✗ ia.founderz.com                 bloqueado por el proxy (allowlist) Verificar la LP desplegada y leer el corpus
✓ pagespeedonline.googleapis.com  HTTP 404                           Medir el PSI >= 98 de una URL de producción
✗ api.hubapi.com                  bloqueado por el proxy (allowlist) Form IDs y propiedades de deal sin preguntar
✓ sheets.googleapis.com           HTTP 400                           Sheet landing_slug -> programa (regla #8)
✓ api.github.com                  HTTP 403                           Push y PRs
✓ registry.npmjs.org              HTTP 200                           npm install

4 host(s) fuera de la allowlist: api.vercel.com, founderz.com, ia.founderz.com, api.hubapi.com
Se añaden en la política de red del environment (Claude Code en web) y
requieren abrir una sesión nueva para que apliquen.
```

## 2. Salida de `curl https://api.vercel.com/v2/user`

```
curl: (56) CONNECT tunnel failed, response 403
http_code=000
```

VEREDICTO: api.vercel.com BLOQUEADO
