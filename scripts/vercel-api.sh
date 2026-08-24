#!/usr/bin/env bash
#
# Cliente minimo de la Vercel REST API.
#
# Uso:
#   ./scripts/vercel-api.sh <metodo> <ruta> [cuerpo-json]
#
# Ejemplos:
#   ./scripts/vercel-api.sh GET /v2/user
#   ./scripts/vercel-api.sh GET /v9/projects
#   ./scripts/vercel-api.sh GET "/v6/deployments?limit=5"
#   ./scripts/vercel-api.sh POST /v10/projects '{"name":"mi-landing"}'
#
# El teamId se inyecta solo desde VERCEL_TEAM_ID si no lo pones tu.
#
set -euo pipefail

API="https://api.vercel.com"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# --- Cargar credenciales -----------------------------------------------------
# Prioridad: entorno existente > .env.local > .env
if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  for f in "$ROOT/.env.local" "$ROOT/.env"; do
    if [[ -f "$f" ]]; then
      set -a; . "$f"; set +a
      break
    fi
  done
fi

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  cat >&2 <<'ERR'
ERROR: falta VERCEL_TOKEN.

Crea un .env.local en la raiz del repo con:

  VERCEL_TOKEN=vck_xxxxxxxx
  VERCEL_TEAM_ID=team_xxxxxxxx

Genera el token en https://vercel.com/account/settings/tokens
ERR
  exit 1
fi

# --- Argumentos --------------------------------------------------------------
METHOD="${1:-GET}"
PATH_ARG="${2:-/v2/user}"
BODY="${3:-}"

[[ "$PATH_ARG" == /* ]] || PATH_ARG="/$PATH_ARG"

# Inyectar teamId si esta configurado y no viene ya en la ruta
URL="${API}${PATH_ARG}"
NO_TEAM_RE='^/v[0-9]+/(user|teams)'
if [[ -n "${VERCEL_TEAM_ID:-}" \
      && "$PATH_ARG" != *"teamId="* \
      && ! "$PATH_ARG" =~ $NO_TEAM_RE ]]; then
  if [[ "$PATH_ARG" == *"?"* ]]; then
    URL="${URL}&teamId=${VERCEL_TEAM_ID}"
  else
    URL="${URL}?teamId=${VERCEL_TEAM_ID}"
  fi
fi

# --- Llamada -----------------------------------------------------------------
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

ARGS=(-sS -X "$METHOD" -o "$TMP" -w '%{http_code}'
      -H "Authorization: Bearer ${VERCEL_TOKEN}")

if [[ -n "$BODY" ]]; then
  ARGS+=(-H "Content-Type: application/json" -d "$BODY")
fi

# Respetar el CA bundle del proxy si existe (entornos Claude Code remotos)
[[ -f /root/.ccr/ca-bundle.crt ]] && ARGS+=(--cacert /root/.ccr/ca-bundle.crt)

CODE="$(curl "${ARGS[@]}" "$URL")" || CODE=000

# --- Salida ------------------------------------------------------------------
if command -v jq >/dev/null 2>&1; then
  jq . < "$TMP" 2>/dev/null || cat "$TMP"
else
  cat "$TMP"
fi
echo

case "$CODE" in
  2*) exit 0 ;;
  000) echo "ERROR de red: el host no es alcanzable (proxy/DNS/politica de red)." >&2; exit 1 ;;
  401|403) echo "ERROR HTTP $CODE: token invalido, revocado o sin permisos sobre ese recurso." >&2; exit 1 ;;
  404) echo "ERROR HTTP $CODE: recurso no encontrado (revisa la ruta o el teamId)." >&2; exit 1 ;;
  *) echo "ERROR HTTP $CODE" >&2; exit 1 ;;
esac
