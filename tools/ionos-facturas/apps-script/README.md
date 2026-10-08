# Facturas IONOS → Google Drive (sin servidores)

Para cuando solo se dispone de Claude + Google. El correo hace de puente:

1. **IONOS** reenvía una copia de **todos** los correos al Gmail de la persona dueña del Drive (no se sabe de antemano en qué correos vienen las facturas). Se sigue usando Apple Mail igual que siempre.
2. **`GuardarFacturas.gs`** (Google Apps Script, en su cuenta) revisa cada hora todos los correos con PDF/XML y decide por pistas (asunto, texto del correo, nombre del archivo, remitente: factura, invoice, IVA, NIF, importe…):
   - `Facturas/AAAA-MM/` → los que tienen pistas claras.
   - `Por revisar/AAAA-MM/` → el resto de PDF/XML, por si alguna factura no da pistas.
   Cada archivo lleva en su descripción el remitente y el asunto. Quedan a su nombre.
3. **Claude** (su cuenta Pro con el conector de Google Drive) los lee, renombra, resume o pasa a una hoja.

## Paso 1 — Regla de reenvío en IONOS (tú, vale el móvil)

1. Entra en el webmail de IONOS (mail.ionos.es) → **Configuración** (⚙️) → **Filtros** → **Añadir regla**.
2. Condición: **todos los mensajes**.
3. Acción: **Reenviar / Redirigir a** `gmail-de-la-otra-persona@gmail.com` y **mantener una copia** en el buzón.
4. Guarda. Créala en el webmail, no en Apple Mail: las reglas de Apple Mail solo funcionan con el Mac encendido.

> Privacidad: esa cuenta de Gmail recibirá copia de todo el correo. Mejor que sea una cuenta creada solo para esto.

## Paso 2 — Script en la cuenta de Google de la otra persona (una vez, mejor desde ordenador)

1. Abre [script.google.com](https://script.google.com) con su cuenta → **Nuevo proyecto**.
2. Borra el contenido y pega `GuardarFacturas.gs`.
3. Rellena `CONFIG`:
   - `CARPETA_ID`: lo que va después de `/folders/` en el enlace de la carpeta de Drive.
   - `PISTAS`: añade palabras o nombres de proveedores habituales si quieres afinar.
   - `GUARDAR_DUDOSOS`: `false` si no quieres la carpeta "Por revisar".
4. Guarda (💾), elige la función **`instalar`** arriba y pulsa **Ejecutar**.
5. Acepta los permisos (Gmail y Drive). Si sale "Google no ha verificado esta aplicación": *Configuración avanzada → Ir a (proyecto)*. Es su propio script.

Listo: se ejecuta solo cada hora. El registro de ejecuciones está en **Ejecuciones** (menú izquierdo).

## Paso 3 — Claude

En su Claude: *Ajustes → Conectores → Google Drive → Conectar*. Después puede pedir, por ejemplo:

- "Revisa la carpeta Por revisar y dime cuáles son facturas."
- "Lista las facturas de septiembre de la carpeta Facturas y súmame los importes."
- "Hazme una hoja de cálculo con proveedor, fecha e importe de cada factura de este trimestre."
