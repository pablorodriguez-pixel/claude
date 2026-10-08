#!/usr/bin/env python3
"""Descarga facturas adjuntas (PDF/XML) de un buzón de IONOS por IMAP.

Solo usa la librería estándar de Python. Abre el buzón en modo lectura:
no marca correos como leídos ni borra nada.

Credenciales por variables de entorno (o fichero .env junto al script):
    IONOS_EMAIL      tu dirección completa
    IONOS_PASSWORD   contraseña del buzón (si falta, se pide por terminal)
    IONOS_IMAP_HOST  opcional, por defecto imap.ionos.es

Ejemplos:
    python3 descargar_facturas.py --desde 2026-09-01
    python3 descargar_facturas.py --desde 2026-01-01 --hasta 2026-07-01 --remitente amazon
    python3 descargar_facturas.py --listar-carpetas
"""

import argparse
import csv
import email
import email.policy
import getpass
import hashlib
import imaplib
import os
import re
import sys
from datetime import date, datetime
from email.utils import parseaddr, parsedate_to_datetime
from pathlib import Path

DIR_SCRIPT = Path(__file__).resolve().parent
PALABRAS_DEFECTO = ["factura", "invoice", "recibo", "receipt", "fra.", "billing", "rechnung"]
EXTENSIONES = {".pdf", ".xml", ".xsig"}
MESES_IMAP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
CAMPOS_MANIFIESTO = ["fecha", "remitente", "asunto", "adjunto", "archivo", "sha256", "message_id", "carpeta"]


def cargar_env(ruta):
    """Carga KEY=VALUE de un .env sin pisar variables ya definidas."""
    if not ruta.exists():
        return
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if not linea or linea.startswith("#") or "=" not in linea:
            continue
        clave, valor = linea.split("=", 1)
        os.environ.setdefault(clave.strip(), valor.strip().strip('"').strip("'"))


def fecha_imap(d):
    return f"{d.day:02d}-{MESES_IMAP[d.month - 1]}-{d.year}"


def parse_fecha(texto):
    return datetime.strptime(texto, "%Y-%m-%d").date()


def limpiar(texto, maximo=60):
    texto = re.sub(r"[^\w.\-]+", "_", texto, flags=re.UNICODE).strip("._")
    return texto[:maximo] or "sin_nombre"


def contiene(texto, palabras):
    texto = (texto or "").lower()
    return any(p in texto for p in palabras)


def conectar(host, usuario, password):
    imap = imaplib.IMAP4_SSL(host, 993)
    imap.login(usuario, password)
    return imap


def listar_carpetas(imap):
    estado, datos = imap.list()
    if estado != "OK":
        sys.exit("No se pudieron listar las carpetas.")
    for linea in datos:
        print(linea.decode(errors="replace"))


def cargar_manifiesto(ruta):
    vistos_msg, vistos_hash = set(), set()
    if ruta.exists():
        with ruta.open(newline="", encoding="utf-8") as f:
            for fila in csv.DictReader(f):
                vistos_msg.add((fila["message_id"], fila["adjunto"]))
                vistos_hash.add(fila["sha256"])
    return vistos_msg, vistos_hash


def buscar_uids(imap, desde, hasta, remitente):
    criterios = []
    if desde:
        criterios += ["SINCE", fecha_imap(desde)]
    if hasta:
        criterios += ["BEFORE", fecha_imap(hasta)]
    if remitente:
        criterios += ["FROM", f'"{remitente}"']
    estado, datos = imap.uid("SEARCH", None, *(criterios or ["ALL"]))
    if estado != "OK":
        sys.exit(f"Error en la búsqueda IMAP: {datos}")
    return datos[0].split()


def cabeceras(imap, uids):
    """Devuelve {uid: Message} solo con cabeceras, en lotes."""
    resultado = {}
    for i in range(0, len(uids), 200):
        lote = b",".join(uids[i:i + 200])
        estado, datos = imap.uid(
            "FETCH", lote, "(BODY.PEEK[HEADER.FIELDS (SUBJECT FROM DATE MESSAGE-ID CONTENT-TYPE)])"
        )
        if estado != "OK":
            continue
        for parte in datos:
            if not isinstance(parte, tuple):
                continue
            m = re.search(rb"UID (\d+)", parte[0])
            if m:
                resultado[m.group(1)] = email.message_from_bytes(parte[1], policy=email.policy.default)
    return resultado


def mensaje_completo(imap, uid):
    estado, datos = imap.uid("FETCH", uid, "(BODY.PEEK[])")
    if estado != "OK":
        return None
    for parte in datos:
        if isinstance(parte, tuple):
            return email.message_from_bytes(parte[1], policy=email.policy.default)
    return None


def fecha_mensaje(msg):
    try:
        return parsedate_to_datetime(msg["Date"]).date()
    except (TypeError, ValueError):
        return date.today()


def adjuntos_factura(msg, asunto_coincide, palabras, amplio):
    """Itera (nombre, bytes) de los adjuntos que parecen facturas."""
    for parte in msg.walk():
        if parte.is_multipart():
            continue
        nombre = parte.get_filename()
        tipo = parte.get_content_type()
        if not nombre:
            if tipo == "application/pdf":
                nombre = "factura.pdf"
            else:
                continue
        ext = Path(nombre).suffix.lower()
        if ext not in EXTENSIONES and tipo != "application/pdf":
            continue
        if not (asunto_coincide or amplio or contiene(nombre, palabras)):
            continue
        contenido = parte.get_payload(decode=True)
        if contenido:
            yield nombre, contenido


def main():
    cargar_env(DIR_SCRIPT / ".env")

    ap = argparse.ArgumentParser(description="Descarga facturas adjuntas de IONOS por IMAP.")
    ap.add_argument("--desde", type=parse_fecha, help="Fecha inicial YYYY-MM-DD (incluida)")
    ap.add_argument("--hasta", type=parse_fecha, help="Fecha final YYYY-MM-DD (excluida)")
    ap.add_argument("--carpeta", action="append",
                    help="Carpeta IMAP (repetible). Por defecto INBOX")
    ap.add_argument("--remitente", help="Filtra por remitente (texto contenido en From)")
    ap.add_argument("--palabras", help="Palabras clave separadas por comas "
                    f"(defecto: {','.join(PALABRAS_DEFECTO)})")
    ap.add_argument("--amplio", action="store_true",
                    help="Descarga cualquier PDF/XML adjunto, aunque no haya palabras clave")
    ap.add_argument("--salida", default=str(DIR_SCRIPT / "facturas"), help="Carpeta destino")
    ap.add_argument("--dry-run", action="store_true", help="Solo muestra qué descargaría")
    ap.add_argument("--listar-carpetas", action="store_true", help="Lista las carpetas del buzón y sale")
    args = ap.parse_args()

    usuario = os.environ.get("IONOS_EMAIL") or input("Email IONOS: ").strip()
    password = os.environ.get("IONOS_PASSWORD") or getpass.getpass("Contraseña: ")
    host = os.environ.get("IONOS_IMAP_HOST", "imap.ionos.es")
    palabras = [p.strip().lower() for p in args.palabras.split(",")] if args.palabras else PALABRAS_DEFECTO

    try:
        imap = conectar(host, usuario, password)
    except imaplib.IMAP4.error as e:
        sys.exit(f"No se pudo iniciar sesión en {host}: {e}")

    try:
        if args.listar_carpetas:
            listar_carpetas(imap)
            return

        salida = Path(args.salida)
        manifiesto = salida / "manifiesto.csv"
        vistos_msg, vistos_hash = cargar_manifiesto(manifiesto)
        nuevas = []

        for carpeta in args.carpeta or ["INBOX"]:
            estado, _ = imap.select(f'"{carpeta}"', readonly=True)
            if estado != "OK":
                print(f"! No se pudo abrir la carpeta {carpeta}", file=sys.stderr)
                continue

            uids = buscar_uids(imap, args.desde, args.hasta, args.remitente)
            print(f"{carpeta}: {len(uids)} correos en el rango, revisando cabeceras...")

            for uid, cab in cabeceras(imap, uids).items():
                asunto = str(cab["Subject"] or "")
                remitente = str(cab["From"] or "")
                asunto_coincide = contiene(asunto, palabras) or contiene(remitente, palabras)
                # Sin multipart no suele haber adjuntos; solo se descarga si el asunto encaja.
                if cab.get_content_maintype() != "multipart" and not asunto_coincide:
                    continue

                msg = mensaje_completo(imap, uid)
                if msg is None:
                    continue
                msg_id = str(msg["Message-ID"] or f"uid-{carpeta}-{uid.decode()}")
                fecha = fecha_mensaje(msg)
                nombre_rem = parseaddr(remitente)[1].split("@")[-1] or parseaddr(remitente)[0]

                for nombre, contenido in adjuntos_factura(msg, asunto_coincide, palabras, args.amplio):
                    nombre_limpio = limpiar(Path(nombre).stem) + Path(nombre).suffix.lower()
                    if (msg_id, nombre_limpio) in vistos_msg:
                        continue
                    sha = hashlib.sha256(contenido).hexdigest()
                    if sha in vistos_hash:
                        continue
                    destino = salida / f"{fecha:%Y-%m}" / f"{fecha:%Y-%m-%d}_{limpiar(nombre_rem, 40)}_{nombre_limpio}"
                    vistos_msg.add((msg_id, nombre_limpio))
                    vistos_hash.add(sha)
                    print(f"  {'[dry-run] ' if args.dry_run else ''}{destino.relative_to(salida)}  ← {asunto[:70]}")
                    if args.dry_run:
                        continue
                    destino.parent.mkdir(parents=True, exist_ok=True)
                    destino.write_bytes(contenido)
                    nuevas.append({
                        "fecha": fecha.isoformat(), "remitente": remitente, "asunto": asunto, "adjunto": nombre_limpio,
                        "archivo": str(destino.relative_to(salida)), "sha256": sha,
                        "message_id": msg_id, "carpeta": carpeta,
                    })

        if nuevas:
            nuevo = not manifiesto.exists()
            with manifiesto.open("a", newline="", encoding="utf-8") as f:
                w = csv.DictWriter(f, fieldnames=CAMPOS_MANIFIESTO)
                if nuevo:
                    w.writeheader()
                w.writerows(nuevas)
        print(f"\nListo: {len(nuevas)} factura(s) nueva(s) en {salida}")
    finally:
        try:
            imap.logout()
        except Exception:
            pass


if __name__ == "__main__":
    main()
