#!/usr/bin/env python3
"""
Growth OS — genera el dashboard web desde los mismos YAML que el Excel.

    python3 growth-os/build_web.py

Inyecta los datos en bruto en web/dashboard.template.html y escribe
dist/dashboard.html. Las métricas derivadas (avance esperado, desviación,
semáforo, % de consecución de KPIs, alertas de hitos) NO se calculan aquí:
las calcula la propia página, igual que las calcula el Excel con fórmulas.
Así los umbrales viven en un único sitio por renderizador y no hay valores
congelados que se queden obsoletos.
"""
import datetime as dt
import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"


def iso(v):
    if isinstance(v, (dt.date, dt.datetime)):
        return v.strftime("%Y-%m-%d")
    return v


def clean(rows, date_keys):
    out = []
    for r in rows:
        d = dict(r)
        for k in date_keys:
            if k in d:
                d[k] = iso(d[k])
        out.append(d)
    return out


def main():
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist" / "dashboard.html"
    load = lambda n: yaml.safe_load((DATA / n).read_text(encoding="utf-8"))

    payload = {
        "generado": dt.date.today().strftime("%Y-%m-%d"),
        "taxonomia": load("taxonomia.yaml"),
        "departamentos": load("departamentos.yaml"),
        "proyectos": clean(load("proyectos.yaml"), ["fecha_inicio", "fecha_fin_prevista"]),
        "kpis": clean(load("kpis.yaml"), []),
        "hitos": clean(load("hitos.yaml"), ["fecha_objetivo"]),
    }
    payload["hitos"].sort(key=lambda h: (h.get("fecha_objetivo") or "9999", h["id"]))

    tpl = (ROOT / "web" / "dashboard.template.html").read_text(encoding="utf-8")
    blob = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    assert "__GROWTH_OS_DATA__" in tpl, "falta el marcador de datos en la plantilla"
    html = tpl.replace("__GROWTH_OS_DATA__", blob)

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print("Escrito %s (%d KB)" % (out, len(html) // 1024))
    print("  %d proyectos · %d KPIs · %d hitos" % (
        len(payload["proyectos"]), len(payload["kpis"]), len(payload["hitos"])))


if __name__ == "__main__":
    main()
