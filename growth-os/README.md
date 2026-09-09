# Growth OS — sistema de proyectos del departamento de Growth

Sistema de gestión de portfolio con tres niveles de zoom (**compañía → departamento/subárea →
proyecto**) cuya **fuente de la verdad son los YAML de este repo**, y cuya interfaz de trabajo
es un Excel que se genera desde esos datos y se puede volver a importar.

```
                   ┌──────────────────────────┐
   fuente de       │  growth-os/data/*.yaml   │   versionado en git,
   la verdad  ──▶  │  proyectos · kpis ·      │   auditable, diffeable
                   │  hitos · departamentos   │
                   └────────────┬─────────────┘
                                │  build_excel.py
                                ▼
                   ┌──────────────────────────┐
   interfaz   ──▶  │  Founderz_Growth_OS.xlsx │   en OneDrive / SharePoint
   de trabajo      │  8 hojas, todo fórmulas  │   lo edita el equipo
                   └────────────┬─────────────┘
                                │  import_excel.py
                                └──────────▶ vuelve a los YAML + commit
```

## El ciclo de trabajo

| Paso | Quién | Qué pasa |
|---|---|---|
| 1 | Equipo de Growth | Edita el Excel en OneDrive: estados, avances, gastos, KPIs, hitos |
| 2 | Tú | Le dices al agente **«sincroniza el Growth OS»** |
| 3 | Agente | Descarga el Excel, ejecuta `import_excel.py`, actualiza los YAML y hace commit con el resumen de cambios |
| 4 | Agente | Si hay cambios estructurales, ejecuta `build_excel.py` y vuelve a subir el fichero a OneDrive |

El paso 3 es lo que convierte esto en un sistema con memoria: cada sincronización deja un commit,
así que se puede responder a «¿cómo estaba el portfolio hace dos meses?» con `git log`.

## Ficheros

| Ruta | Qué es |
|---|---|
| `data/departamentos.yaml` | Árbol organizativo: departamentos, subáreas y owners. Añade aquí un departamento nuevo. |
| `data/proyectos.yaml` | Portfolio. Una entrada por proyecto. `id` es la clave. |
| `data/kpis.yaml` | KPIs con baseline / target / actual, ligados a `proyecto_id`. |
| `data/hitos.yaml` | Hitos con fecha objetivo y responsable, ligados a `proyecto_id`. |
| `data/taxonomia.yaml` | Listas cerradas (estados, fases, prioridades…). Alimentan los desplegables del Excel. |
| `build_excel.py` | YAML → `.xlsx`. Escribe fórmulas, nunca resultados. |
| `import_excel.py` | `.xlsx` → YAML, con resumen de cambios. Ignora las columnas calculadas. |
| `dist/Founderz_Growth_OS.xlsx` | El fichero generado. |

## Uso

```bash
# Generar el Excel desde los YAML
python3 growth-os/build_excel.py

# Traer de vuelta lo editado en Excel (--dry-run para ver los cambios sin escribir)
python3 growth-os/import_excel.py ruta/al/Founderz_Growth_OS.xlsx --dry-run
python3 growth-os/import_excel.py ruta/al/Founderz_Growth_OS.xlsx
```

`build_excel.py` valida los datos antes de escribir y aborta si encuentra ids duplicados,
departamentos o estados fuera de la taxonomía, fechas de fin anteriores al inicio, o KPIs e
hitos que apuntan a un proyecto que no existe.

## Las 8 hojas del Excel

| Hoja | Nivel | Contenido |
|---|---|---|
| **Léeme** | — | Ciclo de trabajo, reglas y leyenda de colores |
| **Dashboard** | Compañía | 9 tarjetas + portfolio por estado, por departamento y por subárea + proyectos que requieren atención + hitos calientes |
| **Zoom departamento** | Departamento / subárea | Tres filtros desplegables que recalculan tarjetas y las tablas de proyectos, KPIs e hitos |
| **Detalle proyecto** | Proyecto | Ficha completa del proyecto elegido, con sus KPIs y sus hitos |
| **Proyectos** | Datos | Tabla de entrada. Columnas A–R editables, S–AB calculadas |
| **KPIs** | Datos | Tabla de entrada. Columnas A–J editables, K–O calculadas |
| **Hitos** | Datos | Tabla de entrada. Columnas A–G editables, H–L calculadas |
| **Config** | — | Listas de los desplegables, generadas desde `taxonomia.yaml` |

Las tres tablas de datos llevan filas vacías de reserva con las fórmulas ya puestas
(40 proyectos, 70 KPIs, 80 hitos), para que el equipo pueda añadir registros en Excel sin
que nadie tenga que regenerar el fichero.

## Reglas de cálculo

Nada en el Excel está calculado a mano: todo son fórmulas que se recalculan al editar.

- **Avance esperado** = `(hoy − inicio) / (fin previsto − inicio)`, acotado a 0–100%.
  Es el avance que tocaría tener si el proyecto fuera a ritmo de calendario.
- **Desviación** = avance real − avance esperado. Por debajo de −15pp el proyecto se marca *Desviado*.
- **Semáforo** = *Vencido* si la fecha de fin ya pasó · *Inminente* si quedan ≤14 días ·
  *Desviado* si la desviación baja de −15pp · *En plazo* en el resto.
- **% consecución de un KPI** = parte del recorrido baseline→target ya cubierta, respetando la
  dirección del KPI: para los que hay que bajar (CAC, CPL, días de ciclo) el cálculo se invierte.
  100% = target alcanzado.
- **Estado de un KPI** = Conseguido ≥100% · En camino ≥70% · Atención ≥30% · Crítico por debajo.
- **Hito vencido** = fecha objetivo anterior a hoy y estado distinto de Completado o Cancelado.

Los umbrales (−15pp, 14 días, 70%/30%) son decisiones de diseño, no verdades: están en
`build_excel.py` y se cambian en un sitio.

## Añadir un departamento

El sistema está montado para escalar más allá de Growth. Añade el bloque en
`data/departamentos.yaml`:

```yaml
- nombre: Ventas
  owner: Nombre Apellido
  descripcion: ...
  subareas:
    - nombre: Inside Sales
      owner: ...
```

y regenera. El Dashboard gana su fila en «Portfolio por departamento», el Zoom lo recoge en el
desplegable y las agregaciones por subárea aparecen solas. No hay que tocar ninguna fórmula.

## Datos de ejemplo

Se entrega con 12 proyectos, 29 KPIs y 41 hitos **realistas pero inventados**, para que el
sistema se vea funcionando y sirvan de plantilla de formato. Sustitúyelos por los reales.
