# Conectar Power BI a Claude (solo lectura)

Vía elegida: **Make como puente**. No requiere permisos de admin en Azure ni registrar
una app en el tenant. Make ya está conectado a Claude, así que una vez exista la
conexión de Power BI en Make, Claude puede consultar datasets sin más setup.

## Arquitectura

```
Claude ──MCP──> Make ──OAuth──> Power BI REST API
                 │
                 └─ escenario "PBI Bridge (read)" con el módulo
                    microsoft-power-bi:makeApiCall, ejecutado on-demand
```

`makeApiCall` permite golpear cualquier endpoint de la API de Power BI con la
conexión OAuth ya autorizada. El endpoint que da acceso real a las métricas es
`executeQueries`, que acepta DAX.

## Paso 1 — Autorizar la conexión (lo hace una persona, una vez)

Abrir el credential request de Make y autorizar con la cuenta de Microsoft que
tenga acceso a los workspaces de Power BI:

<https://eu1.make.com/252682/credentials-requests/inbox?requestId=b3405acc-b476-4494-be10-a4e208d6140d>

Scopes que pide (todos de lectura):

| Scope | Para qué |
|---|---|
| `Workspace.Read.All` | Listar workspaces |
| `Dataset.Read.All` | Listar datasets y ejecutar consultas DAX |
| `Report.Read.All` | Metadatos de reports |
| `Dashboard.Read.All` | Metadatos de dashboards y tiles |

> Si el tenant de Founderz tiene bloqueado el consentimiento de usuario, el primer
> intento devuelve `AADSTS65001` / "needs admin approval". En ese caso un admin de
> Microsoft 365 aprueba la app de Make una sola vez y ya no vuelve a pedirse.
>
> Requisito de Power BI, independiente del OAuth: en el portal de administración de
> Power BI debe estar activo **"Permitir que las entidades de servicio usen las API
> de Power BI"** o, para conexiones de usuario, el usuario debe tener rol Viewer o
> superior en el workspace. Sin rol en el workspace, la API devuelve listas vacías
> en lugar de error — no confundir con un fallo de conexión.

## Paso 2 — Escenario puente (lo crea Claude)

Escenario `PBI Bridge (read)`, scheduling `on-demand`, un único módulo:

- `microsoft-power-bi:makeApiCall`
- Parámetros mapeados desde los inputs del escenario: `url`, `method`, `body`
- Claude lo lanza con `scenarios_run` pasando esos inputs y lee la respuesta

Al ser `on-demand` no consume operaciones de Make salvo cuando Claude pregunta.

## Paso 3 — Consultas

Descubrir qué hay:

```
GET /v1.0/myorg/groups                      → workspaces
GET /v1.0/myorg/groups/{groupId}/datasets   → datasets del workspace
```

Leer métricas (lo importante):

```
POST /v1.0/myorg/groups/{groupId}/datasets/{datasetId}/executeQueries
{
  "queries": [{ "query": "EVALUATE SUMMARIZECOLUMNS(...)" }],
  "serializerSettings": { "includeNulls": true }
}
```

Límites de `executeQueries` a tener en cuenta: 1 query por llamada, máximo
100.000 filas o 1 millón de valores por consulta, y no funciona sobre datasets
con conexión en vivo a Analysis Services on-premise.

### Consultas de arranque para CRO

Sustituir los nombres de tabla/medida por los reales del modelo. Para descubrirlos:
`EVALUATE INFO.TABLES()` y `EVALUATE INFO.MEASURES()`.

```dax
-- Métricas del modelo disponibles
EVALUATE INFO.MEASURES()

-- Embudo por fuente en los últimos 30 días
EVALUATE
SUMMARIZECOLUMNS(
    'Fuente'[Canal],
    FILTER(VALUES('Fecha'[Fecha]), 'Fecha'[Fecha] >= TODAY() - 30),
    "Visitas",      [Visitas],
    "Leads",        [Leads],
    "Matriculas",   [Matriculas],
    "Conversion",   DIVIDE([Leads], [Visitas])
)

-- Conversión por landing page
EVALUATE
TOPN(
    50,
    SUMMARIZECOLUMNS(
        'Pagina'[URL],
        "Sesiones",   [Sesiones],
        "Conversion", DIVIDE([Leads], [Sesiones])
    ),
    [Sesiones], DESC
)
```

## Qué puede hacer Claude una vez conectado

- Leer conversión por landing, por canal y por cohorte, y usarla para priorizar
  tests A/B en vez de proponerlos a ciegas.
- Cruzar los datos de Power BI con HubSpot (conector ya activo) para cerrar el
  embudo de landing → lead → matrícula.
- Contrastar hipótesis de CRO contra la métrica real antes de tocar la maqueta.

## Alternativas descartadas y por qué

| Vía | Por qué no |
|---|---|
| Conector nativo de Power BI en Claude | No existe en el directorio de conectores. |
| Service principal + API REST directa desde el repo | Más robusto y sin dependencia de Make, pero exige registrar app en Azure AD y aprobación de admin del tenant. Descartado por permisos. |
| Export programado a SharePoint + conector Microsoft 365 | Cero setup y funciona hoy, pero los datos son una foto fija: no se puede preguntar nada que no estuviera en el export. Sirve como plan B. |

### Nota sobre red

Desde el contenedor de Claude Code on the web, `login.microsoftonline.com`
responde 200 y `api.powerbi.com` responde 403 sin token (comportamiento normal de
la API, no un bloqueo del proxy). La vía del service principal sería viable a
nivel de red si algún día se consiguen los permisos de Azure.
