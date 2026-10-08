# Descargar facturas de IONOS

Script en Python (sin dependencias) que se conecta a tu buzón de IONOS por IMAP y descarga los PDF/XML de facturas adjuntas.

- **Solo lectura:** abre el buzón en modo `readonly`, no marca correos como leídos ni borra nada.
- **Sin duplicados:** guarda un `manifiesto.csv` y compara por hash, así que puedes ejecutarlo las veces que quieras.
- **Ordenado:** `facturas/AAAA-MM/AAAA-MM-DD_remitente_nombre.pdf`.

## Configuración (una vez)

```bash
cd tools/ionos-facturas
cp .env.example .env      # y rellena IONOS_EMAIL e IONOS_PASSWORD
```

Si dejas `IONOS_PASSWORD` vacío, el script te la pide al ejecutarlo. `.env` y `facturas/` están en `.gitignore`.

> Servidor por defecto: `imap.ionos.es:993` (SSL). Si tu cuenta es de otro país, cambia `IONOS_IMAP_HOST` (p. ej. `imap.ionos.com`, `imap.ionos.de`).

## Uso

```bash
python3 descargar_facturas.py --desde 2026-09-01 --dry-run    # ver qué descargaría
python3 descargar_facturas.py --desde 2026-09-01              # descargar
python3 descargar_facturas.py --desde 2026-01-01 --remitente amazon
python3 descargar_facturas.py --listar-carpetas
python3 descargar_facturas.py --desde 2026-09-01 --carpeta INBOX --carpeta Facturas
```

| Opción | Qué hace |
|---|---|
| `--desde` / `--hasta` | Rango de fechas `YYYY-MM-DD` (`--hasta` no incluido) |
| `--carpeta` | Carpeta IMAP, repetible. Por defecto `INBOX` |
| `--remitente` | Solo correos cuyo From contenga ese texto |
| `--palabras` | Palabras clave separadas por comas (defecto: factura, invoice, recibo, receipt…) |
| `--amplio` | Descarga cualquier PDF/XML adjunto aunque no haya palabras clave |
| `--salida` | Carpeta destino (defecto `./facturas`) |
| `--dry-run` | No escribe nada, solo lista |

**Cómo decide qué es una factura:** se descarga un adjunto PDF/XML si el asunto o el remitente contienen una palabra clave, o si el propio nombre del archivo la contiene (p. ej. `Factura_123.pdf`). Con `--amplio` se descargan todos.

## Desde Claude Code

Abre Claude Code en la raíz del repo y usa:

```
/facturas desde septiembre
/facturas las de Amazon de este año
```

O pídelo con tus palabras: *"descarga las facturas de octubre de mi correo de IONOS"*.
