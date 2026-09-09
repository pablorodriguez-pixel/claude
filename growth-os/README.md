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
| 3 | Agente | Lee el Excel desde OneDrive, actualiza los YAML y hace commit con el resumen de cambios |
| 4 | Agente | Si hay cambios estructurales, ejecuta `build_excel.py` y te entrega el fichero nuevo |

El paso 3 es lo que convierte esto en un sistema con memoria: cada sincronización deja un commit,
así que se puede responder a «¿cómo estaba el portfolio hace dos meses?» con `git log`.

### Qué automatiza el agente y qué no

| Dirección | Estado |
|---|---|
| **OneDrive → repo** (leer lo que edita el equipo) | Automatizable. El conector de Microsoft 365 devuelve el contenido del `.xlsx` como filas tabuladas por hoja, que es todo lo que hace falta para reconstruir las tablas y reescribir los YAML. |
| **repo → OneDrive** (subir un fichero regenerado) | Manual. Escribir un `.xlsx` vía el conector exige pasar el binario completo en base64 dentro de la propia conversación, y el entorno de ejecución deja fuera de contexto cualquier salida de ese tamaño. El agente genera el fichero y lo entrega; tú lo dejas caer en la carpeta. |

En la práctica esto no duele: la dirección que se ejecuta cada semana es la primera. La segunda
sólo hace falta cuando cambia la estructura del sistema, no los datos.

## Ficheros

| Ruta | Qué es |
|---|---|
| `data/departamentos.yaml` | Árbol organizativo: departamentos, subáreas y owners. Añade aquí un departamento nuevo. |
| `data/proyectos.yaml` | Portfolio. Una entrada por proyecto. `id` es la clave. |
| `data/kpis.yaml` | KPIs con baseline / target / actual, ligados a `proyecto_id`. |
| `data/hitos.yaml` | Hitos con fecha objetivo y responsable, ligados a `proyecto_id`. |
| `data/taxonomia.yaml` | Listas cerradas (estados, fases, prioridades…). Alimentan los desplegables del Excel. |
| `build_excel.py` | YAML → `.xlsx`. Escribe fórmulas, nunca resultados. |
| `build_web.py` | YAML → `dist/dashboard.html`, el dashboard web. Inyecta los datos en bruto; las métricas derivadas las calcula la propia página. |
| `web/dashboard.template.html` | Plantilla del dashboard: tokens de marca, gráficos y drill-down. |
| `import_excel.py` | `.xlsx` → YAML, con resumen de cambios. Ignora las columnas calculadas. |
| `edit_excel.py` | Ediciones puntuales sobre el libro sin regenerarlo. La herramienta de escritura del agente en local. |
| `build_csv.py` | Exporta las tres tablas a CSV. Es la capa de datos que una sesión en la nube **sí** puede escribir en OneDrive. |
| `dist/Founderz_Growth_OS.xlsx` | El Excel generado. |
| `dist/dashboard.html` | El dashboard web generado. |

## Uso

```bash
# Generar el Excel desde los YAML
python3 growth-os/build_excel.py

# Generar el dashboard web desde los mismos YAML
python3 growth-os/build_web.py

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

**El orden de las pestañas no es estético.** El conector de Microsoft 365 vuelca el libro en orden
de pestañas y corta al agotar su presupuesto de lectura. Con Dashboard y Zoom delante (66 y 70
columnas, casi todas fórmulas auxiliares ocultas) el volcado se agotaba antes de llegar a
Proyectos, KPIs e Hitos, y la sincronización era imposible. Por eso las hojas de datos van
primero; `wb.active` sigue abriendo el libro en el Dashboard, así que lo que ve quien lo abre no
cambia. Si algún día reordenas las pestañas, la lectura desde OneDrive se rompe.

Las tres tablas de datos llevan filas vacías de reserva con las fórmulas ya puestas
(40 proyectos, 70 KPIs, 80 hitos), para que el equipo pueda añadir registros en Excel sin
que nadie tenga que regenerar el fichero.

## Dónde ejecutar el agente

Esto es lo que decide si el agente puede **escribir** en el Excel, y no es una cuestión de
capacidad del modelo sino de dónde corre.

| Contexto | ¿Puede escribir en el libro de OneDrive? | Por qué |
|---|---|---|
| **Cowork o Claude Code en tu máquina**, con OneDrive sincronizado | **Sí**, celda a celda | El fichero de OneDrive es un fichero local. El agente lo edita con `edit_excel.py` y el cliente de OneDrive lo sube solo. El agente nunca habla con OneDrive. |
| **Claude para Excel**, dentro del libro abierto | **Sí**, celda a celda | Corre dentro de la aplicación, con acceso directo al modelo de objetos de Excel. |
| **Claude Code en la nube** (como esta sesión) | **El `.xlsx` no; los CSV sí** | El conector sólo acepta el contenido pegado en la llamada. Un `.xlsx` hay que enviarlo en base64 (~130.000 caracteres, probado y fallido: se reproduce truncado y corrupto). Un **CSV es texto plano** y se envía sin codificar, así que se escribe sin problema. Leer el `.xlsx` sí funciona. |

O sea: **el agente se ejecuta donde está el fichero.** En la nube sirve para leer, versionar y
regenerar el dashboard; para escribir en el libro, en local o desde dentro de Excel.

## La capa de datos en CSV

El hallazgo que desbloquea la escritura desde la nube: el conector rechaza binarios grandes pero
acepta **texto plano**. Así que las tres tablas viven también como CSV en OneDrive, y esos
ficheros los puede escribir cualquiera de los tres:

| Quién | Cómo |
|---|---|
| El agente en la nube (esta sesión) | Los sube como texto plano por el conector. Sin permisos ni integraciones. |
| El equipo | Los abre en Excel Online o de escritorio y los edita como una hoja normal. |
| Claude para Excel | Los edita con el fichero abierto. |

Separador `;` para que Excel en español los abra en columnas al hacer doble clic.

El precio es que un CSV no tiene fórmulas, ni desplegables, ni formato condicional. Por eso el
análisis (semáforos, desviaciones, % de consecución) vive en el **dashboard web**, que se genera
de los mismos datos, y el libro `.xlsx` queda como superficie de lectura que se puede refrescar
desde los CSV con *Datos → Obtener datos → Desde texto/CSV*.

Es un reparto honesto: **un sitio donde escribir** (los CSV, accesibles a todos) y **dos sitios
donde mirar** (el dashboard web y el libro de Excel).

## Editar sin regenerar

`build_excel.py` reconstruye el libro desde los YAML, lo que pisa cualquier cosa que el equipo
haya escrito a mano. Para el día a día está `edit_excel.py`, que abre el libro que el equipo
está usando y toca **sólo** las celdas indicadas:

```bash
python3 growth-os/edit_excel.py ~/OneDrive/Founderz_Growth_OS.xlsx --ops '[
  {"id": "GRW-004", "estado": "En curso", "avance_pct": "70%"},
  {"id": "H-015", "estado": "Completado"},
  {"nuevo": "proyecto", "id": "GRW-013", "nombre": "...", "departamento": "Growth", "...": "..."}
]'
```

Lo que impone, y que es la razón de que exista en lugar de editar a mano:

- **Sólo columnas de entrada.** Un intento de escribir en una columna ƒ se rechaza: sobreescribir
  una fórmula rompe el recálculo de toda la columna.
- **Validación contra la taxonomía.** `estado: "Casi listo"` se rechaza antes de abrir el fichero.
- **Todo o nada.** Si una sola operación es inválida, no se escribe ninguna.
- **Las filas nuevas van a la primera fila libre de reserva**, que ya trae sus fórmulas puestas.
- El `--dry-run` enseña cada celda como `antes → después` sin tocar nada.

## Dos renderizadores, una fuente

El Excel es la interfaz de escritura; el dashboard web es la interfaz de lectura, con URL propia
para poder mirarlo desde el móvil o compartirlo. Los dos se generan de los mismos YAML, así que no
pueden contradecirse en los datos.

Lo que sí se implementa dos veces son las **reglas derivadas** (avance esperado, desviación,
semáforo, % de consecución de KPIs, alertas de hitos): una vez como fórmulas de Excel en
`build_excel.py` y otra en JavaScript dentro de la plantilla web. No hay forma de evitarlo sin
convertir una de las dos vistas en una imagen muerta. Para que no divergan en silencio, los
umbrales están agrupados en un único bloque en cada lado — `TH` en la plantilla web, y las
constantes de las fórmulas en `build_excel.py`. Si cambias un umbral, cámbialo en los dos.

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
