# Despliegue — Webinar Máster IA

Landing de captación para el webinar del Máster en IA.
Objetivo de URL: **`ia.founderz.com/webinar-maii`**

> ⚠️ Este entorno remoto de Claude Code **no tiene salida de red hacia Vercel**
> (`api.vercel.com` está bloqueado por la política de egress del entorno), así que
> el despliegue hay que lanzarlo desde fuera. Aquí tienes las tres vías.

---

## Estructura

```
projects/
├── vercel.json          # config de despliegue (cleanUrls, headers)
├── webinar-maii/
│   ├── index.html       # la landing
│   └── DEPLOY.md        # este archivo
└── augment-mba/
    └── index.html
```

Desplegando con **root = `projects/`**, cada carpeta queda servida en su ruta:
`projects/webinar-maii/index.html` → `…/webinar-maii`.

---

## Opción A — Conectar el repo a Vercel (recomendada)

1. En Vercel: **Add New → Project → Import** el repo de GitHub.
2. **Root Directory:** `projects`.
3. Framework Preset: **Other** (es estático, sin build).
4. Deploy. A partir de ahí cada push despliega solo.

## Opción B — Vercel CLI (desde tu máquina)

```bash
cd projects
vercel --prod
# token: usa el tuyo (VERCEL_TOKEN) o `vercel login`
```

## Opción C — Permitir Vercel en el entorno remoto

Si quieres que Claude despliegue desde aquí, hay que añadir `vercel.com` y
`api.vercel.com` a la política de red del entorno (ver
https://code.claude.com/docs/en/claude-code-on-the-web). Tras eso, repetimos el deploy.

---

## Dominio `ia.founderz.com/webinar-maii`

1. En el proyecto de Vercel → **Settings → Domains → Add** `ia.founderz.com`.
2. Vercel te dará un registro DNS (normalmente un **CNAME** `ia` →
   `cname.vercel-dns.com`). Hay que crearlo en el **DNS de `founderz.com`**
   (Cloudflare / el registrador que uséis). Esto **no se puede hacer desde Claude**.
3. La ruta `/webinar-maii` ya la resuelve la estructura de carpetas — no hace
   falta configurar nada más.

---

## Personalizar el webinar (clonar para otra edición)

Edita el objeto `WEBINAR` al final de `index.html`:

```js
const WEBINAR = {
  date: "2026-07-16T18:00:00+02:00",  // fecha/hora del directo (ISO 8601)
  formAction: "",                      // endpoint del CRM (HubSpot/Make/Zapier)
  redirectOnSuccess: ""                // opcional: página de gracias
};
```

Y cambia el copy de cada sección (título, ponente, agenda, testimonios).
El formulario funciona en modo demo si `formAction` está vacío (muestra el
estado de éxito sin enviar a ningún sitio).
