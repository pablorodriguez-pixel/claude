#!/usr/bin/env python3
"""
Growth OS — exporta las tres tablas a CSV.

    python3 growth-os/build_csv.py [directorio]

Existe por una razón de transporte, no de formato. El conector de Microsoft 365
sólo acepta contenido binario pegado en la llamada (imposible para un .xlsx de
97 KB), pero acepta **texto plano** sin codificar. Así que un CSV sí se puede
escribir en OneDrive desde una sesión en la nube, y un .xlsx no.

Eso convierte a estos tres ficheros en la capa de datos compartida: la escriben
el agente, el equipo y Claude para Excel, sin permisos ni integraciones.

Separador `;` y BOM UTF-8 para que Excel en español los abra en columnas al
hacer doble clic, sin pasar por el asistente de importación.
"""
import csv
import datetime as dt
import io
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
from build_excel import load, validate

COLUMNAS = {
    "proyectos": ["id", "nombre", "departamento", "subarea", "owner", "tipo", "prioridad",
                  "estado", "fase", "fecha_inicio", "fecha_fin_prevista", "avance_pct",
                  "riesgo", "presupuesto_eur", "gasto_eur", "objetivo", "impacto_esperado",
                  "notas"],
    "kpis": ["id", "proyecto_id", "nombre", "unidad", "direccion", "baseline", "target",
             "actual", "frecuencia", "fuente"],
    "hitos": ["id", "proyecto_id", "nombre", "responsable", "fecha_objetivo", "estado",
              "entregable"],
}


def render(rows, cols):
    buf = io.StringIO()
    w = csv.writer(buf, delimiter=";", lineterminator="\n")
    w.writerow(cols)
    for r in rows:
        w.writerow([
            v.strftime("%Y-%m-%d") if isinstance(v, (dt.date, dt.datetime)) else
            ("" if v is None else v)
            for v in (r.get(c, "") for c in cols)
        ])
    return buf.getvalue()


def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist"
    tax, deps, proys, kpis, hitos = load()
    validate(tax, deps, proys, kpis, hitos)
    datos = {"proyectos": proys, "kpis": kpis, "hitos": hitos}

    out.mkdir(parents=True, exist_ok=True)
    for name, cols in COLUMNAS.items():
        txt = render(datos[name], cols)
        p = out / ("%s.csv" % name)
        p.write_text(txt, encoding="utf-8")
        print("%-12s %5d bytes · %3d filas" % (p.name, len(txt.encode("utf-8")),
                                               txt.count("\n") - 1))
    print("\nPara subirlos a OneDrive desde una sesión en la nube, se pasan como texto")
    print("plano al conector de Microsoft 365 (no requiere base64 ni permisos extra).")


if __name__ == "__main__":
    main()
