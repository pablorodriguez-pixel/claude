# HubSpot — formularios y taxonomía real

Leído por la REST API el 24/08/2026 con un token privado con scope `forms`.
Hasta hoy este dato no se podía verificar: el MCP de HubSpot **no puede leer
formularios** (pide reautorización), así que el Google Sheet era la única fuente.

Portal **25912905** · región EU1 · divisas EUR, COP, MXN, USD, GBP · Europe/Madrid.
Es el mismo portal que llevan hardcodeado las LPs (`js-eu1.hs-scripts.com/25912905.js`).

**216 formularios en total**, 148 relacionados con LPs.

---

## 1. Convención de nombres

Conviven **dos**, de dos épocas distintas. Hay que reconocer ambas:

| Estilo | Ejemplo | Uso |
|---|---|---|
| Guiones bajos | `ES_MAIC_Webinar` | Webinars, dossiers, info requests recientes |
| Guiones y `WEB` | `ES - WEB - MAIC - Info request (Dossier)` | Info requests de la web antigua |

Formato: `{MERCADO}_{PROGRAMA}_{TIPO}`

**Mercados** (por volumen): ES 93 · MX 32 · CO 31 · EN 26 · LATAM 14 · ALL, CH, XX 1 cada uno.
`XX` es plantilla (`XX - MAII - Download Dossier [Template]`), no usar en producción.

**Tipos observados**: `Webinar` · `DownloadDossier` · `InfoRequest` ·
`Info request (Dossier)` · `QA` · `Call Me` · `ASSET` · `VSL`.

---

## 2. Programas — la regla #8 se queda corta

`01-reglas-obligatorias.md` documenta **6 programas**: MAIC, MAII, COPILOT,
CLAUDE, GOOGLEAI, VIBECODING.

En HubSpot hay **20 códigos** en uso:

```
MAII(18) B2B(10) MAIC(7) SUPPLY(5) COPILOT(5) RAI(5) MAIS(5) MAIE(4)
MAIH(4) MAIF(4) MDEIA(3) CLAUDE(3) MAIL(3) MAICY(3) VIBECODING(1)
RRHH(1) MARKETING(1) AINSI(1) PM(1) VENTAS(1)
```

**Faltan 14 en la memoria.** El significado de cada código no está documentado en
ninguna parte del repo — solo se infiere el patrón `MAI+letra` (Máster en IA
aplicada a un vertical). **Preguntar a Pablo antes de asumir ninguno.**

---

## 3. Trampas al elegir un `hs_form_id`

### 3.1 Cinco nombres duplicados con GUID distinto

Buscar por nombre puede devolver el formulario equivocado y perder los leads:

| Nombre | GUIDs | Campos |
|---|---|---|
| `ES_MAII_InfoRequest` | `4e4570bd-1a79-45ed-91e3-2c03eddd23c8` / `f970fb30-8398-4d40-9d98-d3ec64427b16` | 12 / 11 |
| `ES_CLAUDE_InfoRequest` | `2fb5846e-2b5a-4169-a85a-a2decb5115fe` / `fa51e8e9-f61f-41d3-93d3-c0938af0c5a3` | 11 / 12 |
| `ES_SUPPLY_DownloadDossier` | `0f281b6e-8efb-401a-a98f-cdc2bf53dde4` / `b1ed0a4a-a244-460c-ba35-edcc13c1f28d` | 5 / 5 |
| `EN_CONTACT_InfoRequest` | `01bbd4e8-35d4-4a29-b202-fe27d57849bc` / `a58f5f41-0b84-4d14-a0e1-a293633c9d3a` | 5 / 6 |
| `ES_BLOG_Newsletter` | `690c7fc6-1b05-4f0f-b962-3bfdad22ec5c` / `710277d7-60f0-487c-a433-c494dbb176b6` | 3 / 4 |

**Nunca resolver un form por nombre. Siempre por GUID, y siempre desde el Sheet.**

### 3.2 Versiones `(NEW)` conviviendo con las antiguas

`ES_MAIC_Webinar` y `ES_MAIC_WEBINAR (NEW)` coexisten, igual que en CO, MX y
LATAM. No hay nada en el nombre que diga cuál está vivo. Confirmar antes de
cablear ninguno.

### 3.3 Ocho formularios de test en el mismo listado

```
CO - WEB - MAII - Info request (Dossier) TEST
ES - LP - Supply Chain - Test Leads
ES_MAIC_WEBINAR (Test A/B Job Position)
ES_MAII_WEBINAR (Test A/B Job Position)
ES_MAII_WEBINAR (TEST A/B PAID)
MX - WEB - MAII - Info request (Dossier) TEST
MX - WEB - MAII - Info request (Dossier) TEST - ENG
VSL TEST ES
```

No hay carpeta ni flag que los separe: solo la palabra «test» en el nombre.

---

## 4. Verificado: el form B2B del AI Act (regla #10)

`b87510a8-2970-4574-bd55-92ae1f9e96d4` → **`ES_B2B_InfoRequest`**. Existe, y sus
campos coinciden exactamente con lo documentado:

```
firstname · lastname · email · phone · company
country_lead · numemployees · company_industry
```

Es el único identificador del dossier que ha podido contrastarse contra la
fuente. Sigue siendo correcto.

---

## 5. Cómo leer esto en el futuro

El MCP de HubSpot **no sirve** para formularios. Por REST, con un token privado
que tenga scope `forms`:

```bash
curl -H "Authorization: Bearer $HUBSPOT_TOKEN" \
  "https://api.hubapi.com/marketing/v3/forms/?limit=100"          # v3
curl -H "Authorization: Bearer $HUBSPOT_TOKEN" \
  "https://api.hubapi.com/forms/v2/forms"                          # v2, devuelve los campos
```

La v2 trae `formFieldGroups` con los campos de cada form; la v3 no. Para
inspeccionar campos, usar v2.

Scopes comprobados en el token del 24/08: `forms` ✅ · contacts ✅ · deals ✅ ·
marketing events ✅ · pipelines ✅ · properties ✅ · companies ❌ · owners ❌.

`api.hubapi.com` está en la allowlist del environment desde el 24/08.
