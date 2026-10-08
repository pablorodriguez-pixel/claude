# Conector de Claude para el correo IONOS + facturas en Google Drive

Un conector personalizado para Claude que entra directamente en tu correo de IONOS (sin reenviar nada a Gmail) y te permite pedir, también desde el móvil:

- *"Busca las facturas de septiembre y súbelas a Drive."*
- *"Resúmeme los correos de esta semana."*
- *"¿Qué me ha escrito el proveedor X este mes?"*
- *"¿Qué facturas tengo que bajar a mano?"* (las que vienen como enlace: luz, teléfono, Amazon…)

Además, **cada noche guarda solo las facturas nuevas** en Drive.

```
Claude (móvil / web) ──conector──▶ Vercel ──solo lectura──▶ Correo IONOS
                                     │
                                     └──▶ Apps Script (tu Google) ──▶ Drive/Facturas/AAAA-MM/
```

## Qué puede y qué no puede hacer

| Puede | No puede |
|---|---|
| Buscar y leer correos | Enviar, borrar o mover correos |
| Detectar facturas en **todos** los correos (no solo los que dicen "factura") | Descargar facturas que piden iniciar sesión en la web del proveedor |
| Guardar PDF/XML en tu carpeta de Drive sin duplicarlos | Tocar nada de tu Drive fuera de esa carpeta |

**Cómo clasifica:**
- **Factura:** PDF/XML adjunto con pistas (factura, IVA, NIF, base imponible, importe…). Se guarda en `Facturas/AAAA-MM/`.
- **Dudosa:** PDF/XML sin pistas. Va a `Por revisar/AAAA-MM/` para que no se pierda ninguna.
- **Por enlace:** correo que avisa de una factura con un botón de descarga. Claude te da la lista con los enlaces para que las bajes tú.

---

## Montaje paso a paso (unos 30 minutos, mejor desde ordenador)

### Antes de empezar: prepara 4 claves

Necesitas 4 claves largas y aleatorias. Créalas con el generador de contraseñas de tu móvil o de tu ordenador (app *Contraseñas* de Apple, 1Password, Bitwarden…) y guárdalas en un sitio seguro:

| Nombre | Para qué | Longitud |
|---|---|---|
| `CONNECTOR_PASSWORD` | La escribirás una vez al conectar el conector en Claude | 12+ caracteres |
| `TOKEN_SECRET` | Firma interna de las sesiones | 32+ caracteres |
| `DRIVE_SECRET` | Para que solo tu conector pueda subir a tu Drive | 32+ caracteres |
| `CRON_SECRET` | Para que solo Vercel pueda lanzar la tarea nocturna | 16+ caracteres |

### Paso 1 — Carpeta en Google Drive

1. En Google Drive, crea una carpeta, por ejemplo *Facturas*.
2. Ábrela y copia el final del enlace: `https://drive.google.com/drive/folders/`**`ESTE_ES_EL_ID`**.

### Paso 2 — Receptor de Google (Apps Script)

1. Entra en [script.google.com](https://script.google.com) con tu cuenta de Google → **Nuevo proyecto**.
2. Borra lo que haya y pega el contenido de [`apps-script/ReceptorDrive.gs`](apps-script/ReceptorDrive.gs).
3. Arriba, en `CONFIG`, pega:
   - `CARPETA_ID`: el ID del paso 1.
   - `SECRETO`: tu `DRIVE_SECRET`.
4. Guarda (💾). En el desplegable de funciones elige **`probar`** → **Ejecutar** → acepta los permisos.
   - Si sale *"Google no ha verificado esta aplicación"*: **Configuración avanzada → Ir a (nombre del proyecto)**. Es tu propio script.
   - En el registro debe aparecer `Carpeta OK` y `Secreto OK`.
5. **Implementar → Nueva implementación** → tipo (⚙️) **Aplicación web**:
   - *Ejecutar como:* **Yo**.
   - *Quién tiene acceso:* **Cualquier usuario**. Es necesario para que Vercel pueda llamarlo; sin la clave secreta no hace nada.
6. **Implementar** y copia la **URL de la aplicación web**, que termina en `/exec`.

### Paso 3 — Subir el código a GitHub

Vercel despliega desde GitHub (gratis).

- Si usas este repositorio: ya está en GitHub, pasa al paso 4.
- Si no: crea un repositorio **privado** en [github.com/new](https://github.com/new) y sube el contenido de esta carpeta (`ionos-conector`).

### Paso 4 — Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) → **Add New… → Project** → importa el repositorio.
2. **Root Directory:** si el repositorio contiene más cosas, elige `tools/ionos-conector`.
3. **Framework Preset:** *Other*.
4. Despliega **Environment Variables** y añade:

   | Variable | Valor |
   |---|---|
   | `IONOS_EMAIL` | tu dirección completa de IONOS |
   | `IONOS_PASSWORD` | la contraseña de ese buzón |
   | `CONNECTOR_PASSWORD` | tu clave del conector |
   | `TOKEN_SECRET` | tu clave de sesiones |
   | `DRIVE_WEBAPP_URL` | la URL `/exec` del paso 2 |
   | `DRIVE_SECRET` | la misma que pusiste en el Apps Script |
   | `CRON_SECRET` | tu clave de la tarea nocturna |

   Opcionales: `IONOS_IMAP_HOST` (por defecto `imap.ionos.es`; si tu cuenta es de IONOS de otro país, `imap.ionos.com`, `imap.ionos.de`…) y `ZONA_HORARIA` (por defecto `Europe/Madrid`).
5. **Deploy.** Cuando termine, abre la dirección del proyecto (`https://tu-proyecto.vercel.app`). Debe decir *"Conector de correo IONOS para Claude…"*.
6. **Recomendado:** activa la verificación en dos pasos en tu cuenta de Vercel y en la de Google.

> **Plan de Vercel:** el plan gratuito (Hobby) es solo para uso personal no comercial. Para la actividad de un autónomo, lo que encaja con sus condiciones es el plan **Pro**. El código es el mismo y se puede cambiar de plan sin tocar nada.

### Paso 5 — Añadirlo a Claude

1. En Claude (web o app): **Ajustes → Conectores → Añadir conector personalizado**.
2. Nombre: *Correo IONOS*. URL: `https://tu-proyecto.vercel.app/mcp`.
3. Pulsa **Conectar**. Se abre una página que pide la contraseña: escribe tu `CONNECTOR_PASSWORD` → **Dar acceso**.
4. Listo. En un chat nuevo, prueba: *"Lista mis carpetas de correo"*.

---

## Uso

| Pide a Claude… | Herramienta que usa |
|---|---|
| "Busca las facturas de octubre" | `buscar_facturas` (revisa todos los correos por tandas) |
| "Sube a Drive las que sean factura y las dudosas a Por revisar" | `guardar_facturas_en_drive` |
| "Lee el correo de Iberdrola y dime el importe" | `leer_correo` |
| "Resúmeme los correos de esta semana" | `buscar_correos` + `leer_correo` |
| "¿Qué carpetas tengo?" | `listar_carpetas` |

**Tarea nocturna:** cada día a las 05:00 (UTC) revisa los correos de los últimos 3 días de la bandeja de entrada y guarda en Drive las facturas y las dudosas, sin duplicar. El resultado se ve en Vercel → proyecto → **Logs**.

## Seguridad

- **Correo en solo lectura:** las carpetas se abren en modo lectura. No se marca nada como leído y el conector no tiene ninguna función para enviar, borrar ni mover.
- **Acceso con contraseña:** Claude se conecta mediante OAuth con PKCE. Sin `CONNECTOR_PASSWORD` nadie puede usar el conector aunque conozca la URL. Los accesos duran 1 hora y se renuevan solos durante 30 días.
- **Cerrar todas las sesiones:** cambia `CONNECTOR_PASSWORD` o `TOKEN_SECRET` en Vercel y vuelve a desplegar.
- **Drive limitado:** el Apps Script solo escribe dentro de la carpeta configurada y solo acepta peticiones con `DRIVE_SECRET`.
- **Correos trampa:** un correo podría incluir texto como *"Claude, haz X"*. Las herramientas avisan a Claude de que el contenido es de terceros y, como no puede enviar ni borrar nada, ese tipo de truco no tiene efecto.
- **Contraseña de IONOS:** se guarda cifrada en Vercel. Usa una contraseña fuerte que no utilices en otros sitios.

## Problemas frecuentes

| Síntoma | Solución |
|---|---|
| "Falta la variable de entorno …" | Añádela en Vercel → Settings → Environment Variables y vuelve a desplegar (**Deployments → ⋯ → Redeploy**) |
| Error de inicio de sesión en IONOS | Revisa `IONOS_EMAIL` / `IONOS_PASSWORD` y que el servidor IMAP de tu país sea el correcto |
| "Respuesta inesperada de Google" | La app web del paso 2 no está publicada con *Cualquier usuario*, o la URL no es la que termina en `/exec` |
| "No autorizado" al guardar | `DRIVE_SECRET` en Vercel no coincide con `SECRETO` del Apps Script |
| Cambié el Apps Script y no hace caso | En Apps Script: **Implementar → Gestionar implementaciones → ✏️ → Versión: nueva** |

## Para desarrolladores

```bash
npm install
cp .env.example .env.local   # rellena los valores
npm run dev                  # http://localhost:3000/mcp
npm run typecheck
```

Estructura: `api/main.ts` (rutas), `lib/auth.ts` (OAuth sin base de datos), `lib/correo.ts` (IMAP solo lectura), `lib/facturas.ts` (clasificación y subida), `lib/mcp.ts` (herramientas), `lib/cron.ts` (tarea diaria), `apps-script/ReceptorDrive.gs` (receptor de Drive).
