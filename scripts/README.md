# Integración con Vercel vía REST API

Cliente en bash sobre la [Vercel REST API](https://vercel.com/docs/rest-api).
Sin MCP, sin dependencias más allá de `curl` (y `jq` opcional para formatear).

## Setup

```bash
cp .env.example .env.local
# edita .env.local con tu token
```

`.env.local` está en `.gitignore`. **No lo commitees nunca.**

Genera el token en https://vercel.com/account/settings/tokens con el **scope
mínimo**: un solo equipo, no "full account". Si el token se filtra, revócalo
en esa misma página — la revocación es inmediata.

Para obtener tu `VERCEL_TEAM_ID`:

```bash
./scripts/vc teams
```

## Uso

```bash
./scripts/vc whoami                              # usuario del token
./scripts/vc teams                               # equipos accesibles
./scripts/vc projects                            # todos los proyectos
./scripts/vc project founderz-growth-lps         # detalle de un proyecto
./scripts/vc deployments founderz-growth-lps 5   # últimos 5 despliegues
./scripts/vc deployment dpl_xxxx                 # detalle de un despliegue
./scripts/vc build-logs dpl_xxxx                 # logs de build
./scripts/vc envs founderz-growth-lps            # variables de entorno
./scripts/vc domains                             # dominios del equipo
```

Llamadas crudas a cualquier endpoint:

```bash
./scripts/vc raw GET /v9/projects
./scripts/vc raw POST /v10/projects '{"name":"nueva-landing"}'
./scripts/vc raw DELETE /v9/projects/mi-proyecto
```

El `teamId` se inyecta automáticamente desde `VERCEL_TEAM_ID` en todos los
endpoints que lo aceptan (`/v2/user` y `/v2/teams` quedan excluidos porque no
lo soportan).

## Despliegues

La API de despliegue (`POST /v13/deployments`) exige subir cada fichero por
separado con su hash SHA1, lo cual no compensa hacer a mano. Para desplegar usa
la CLI, que hace ese trabajo por ti y acepta el mismo token:

```bash
npm i -g vercel
vercel --token "$VERCEL_TOKEN" link
vercel --token "$VERCEL_TOKEN" deploy --prod
```

La API queda para lo que hace bien: inspección, logs, configuración y debug.

## Códigos de salida

| Código | Significado |
|---|---|
| `0` | OK (HTTP 2xx) |
| `1` + `HTTP 401/403` | Token inválido, revocado, o sin permisos sobre el recurso |
| `1` + `HTTP 404` | Ruta o `teamId` incorrectos |
| `1` + `ERROR de red` | Host inalcanzable — DNS, o política de red bloqueando la salida |

## Nota sobre entornos remotos de Claude Code

Las sesiones de Claude Code en la nube filtran el tráfico de salida por una
lista blanca de dominios. Si `api.vercel.com` no está en ella, toda llamada
falla con `CONNECT tunnel failed, response 403` — el token nunca sale de la
máquina, así que el fallo no dice nada sobre su validez.

Para arreglarlo, añade `api.vercel.com` a la política de red del entorno.
Ver https://code.claude.com/docs/en/claude-code-on-the-web.

En local no hay proxy y los scripts funcionan directamente.
