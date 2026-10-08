# Facturas IONOS → Google Drive (sin servidores)

Para cuando solo se dispone de Claude + Google. El correo hace de puente:

1. **IONOS** reenvía los correos de facturas al Gmail de la persona dueña del Drive.
2. **`GuardarFacturas.gs`** (Google Apps Script, en su cuenta) guarda cada hora los PDF/XML en su carpeta, en subcarpetas `AAAA-MM`. Los archivos quedan a su nombre.
3. **Claude** (su cuenta Pro con el conector de Google Drive) los lee, renombra, resume o pasa a una hoja.

## Paso 1 — Regla de reenvío en IONOS (tú, vale el móvil)

1. Entra en el webmail de IONOS (mail.ionos.es) → **Configuración** (⚙️) → **Filtros** → **Añadir regla**.
2. Condición: *Asunto contiene* `factura` (añade otra condición con `invoice`/`recibo` si quieres, con "cualquiera de").
3. Acción: **Reenviar / Redirigir a** `gmail-de-la-otra-persona@gmail.com` y **mantener una copia** en el buzón.
4. Guarda. Para las facturas antiguas, reenvíalas a mano una vez.

## Paso 2 — Script en la cuenta de Google de la otra persona (una vez, mejor desde ordenador)

1. Abre [script.google.com](https://script.google.com) con su cuenta → **Nuevo proyecto**.
2. Borra el contenido y pega `GuardarFacturas.gs`.
3. Rellena `CONFIG`:
   - `CARPETA_ID`: lo que va después de `/folders/` en el enlace de la carpeta de Drive.
   - `CORREO_IONOS`: tu dirección de IONOS.
4. Guarda (💾), elige la función **`instalar`** arriba y pulsa **Ejecutar**.
5. Acepta los permisos (Gmail y Drive). Si sale "Google no ha verificado esta aplicación": *Configuración avanzada → Ir a (proyecto)*. Es su propio script.

Listo: se ejecuta solo cada hora. El registro de ejecuciones está en **Ejecuciones** (menú izquierdo).

## Paso 3 — Claude

En su Claude: *Ajustes → Conectores → Google Drive → Conectar*. Después puede pedir, por ejemplo:

- "Lista las facturas de septiembre de la carpeta Facturas y súmame los importes."
- "Hazme una hoja de cálculo con proveedor, fecha e importe de cada factura de este trimestre."
