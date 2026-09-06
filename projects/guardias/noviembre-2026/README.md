# Guardias — Noviembre 2026

Cuadrante de guardias de residentes para noviembre de 2026, repartido a partir del
estudio de carga y findes de octubre.

**Entregable visual:** https://claude.ai/code/artifact/ad058e1c-1586-4946-baab-c3caabe15f00

## Alcance

Del **3 al 30 de noviembre**. Los días 1 y 2 ya venían asignados en el cuadrante de
octubre (cola del puente del 31), así que no se reasignan; sí cuentan en el cómputo de
carga y de puentes.

## Estructura de la guardia

5 puestos al día:

| Puesto | Quién |
|---|---|
| `TX` trasplante | solo R4 (las 6, incluidas las que rotan en UCQ) |
| `UCQ` | los 4 rotantes (6 guardias cada uno) y R2 el resto de días |
| `MAYOR` | R3 o R4 que no roten en UCQ |
| `QX2`, `QX3` | R1 y R2 |

**Convención de emparejamiento** (extraída del cuadrante real de octubre): el viernes y
el domingo los cubre el mismo equipo; el sábado, otro distinto, que repite el lunes
festivo cuando hay puente. El trasplante no sigue este emparejamiento: va en tandas de
días seguidos.

## Reglas aplicadas

1. Bloqueos de vacaciones de los 26 residentes, respetados al 100 %.
2. Día 30: ninguna R4 de guardia por el curso R4, salvo trasplante.
3. Nadie hace dos días seguidos, salvo cuando uno de los dos es de trasplante. La regla
   cruza la frontera del mes: quien hizo guardia el 2 de noviembre no entra el día 3.
4. Puentes del bimestre: 12-oct, 31-oct (31+1+2) y 9-nov (7+8+9). Quien trabajó los dos
   de octubre libra el de noviembre; techo de 2 de 3 para todo el mundo.
5. Fiesta de bienvenida: el viernes 6 y el domingo 8 no trabaja ningún R1 ni R2, y el
   sábado 7 (con su lunes festivo emparejado, el 9) no lo trabaja ningún R1.
6. La localizada de trasplante de una R4 no cae la víspera de una guardia ni la víspera
   de un bloqueo de vacaciones.
7. Tope por nivel: ningún R3 pasa de 6 guardias al mes.
8. Equidad: se iguala primero dentro de noviembre por nivel y después se usa octubre
   como desempate, con más peso en los findes que en el total.

## Lo que cuesta la fiesta de bienvenida

El viernes 6, sin R1 ni R2, solo quedan cinco personas elegibles (Carlota, Fabián,
Patri, Sandra y Tony) y son justo las cinco que hacen falta ese día. Como quien trabaja
el viernes no puede trabajar el sábado, el 7 se quedaba sin ningún mayor. El domingo 8 es
peor: solo quedan cuatro elegibles, y una de ellas está siempre comprometida con el
sábado y su lunes festivo emparejado.

Por eso el quirófano se recorta esos dos días:

- **Viernes 6:** mayor + 1 en vez de mayor + 2.
- **Domingo 8:** solo el mayor, sin residentes acompañantes.

El mes queda en **137 puestos** en vez de 140. Alternativas descartadas: levantar la
exención del puente a Almudena o Ana G. (irían a 3 de 3 puentes) o dejar que algún R2
trabajase esos días.

## Ficheros

| Fichero | Qué es |
|---|---|
| `datos-nov2026.md` | plantilla y bloqueos tal como se recibieron |
| `octubre.py` | cuadrante real de octubre transcrito (incluye 1 y 2 de nov) |
| `exportar.py` | volca `best.pkl` a `datos_web.json` |
| `nov.py` | modelo, restricciones, función de coste y recocido simulado |
| `run.py` | lanza varias semillas y guarda la mejor solución en `best.pkl` |
| `informe.py` | valida las restricciones duras e imprime el cuadrante y los totales |
| `web.py` | genera `guardias-nov-2026.html` a partir de `datos_web.json` |
| `cuadrante_nov.json` | resultado: puesto por puesto, día a día |

## Regenerar

```sh
python3 run.py        # reparte y guarda best.pkl
python3 informe.py    # valida e imprime; reescribe cuadrante_nov.json
python3 exportar.py   # volca la solucion a datos_web.json
python3 web.py        # regenera el HTML
```

## Dos desequilibrios que no se pueden cerrar

- **María** no tiene ninguna guardia en octubre, así que su acumulado del bimestre (9)
  queda por debajo del resto de R4 (16-21). Compensarlo de golpe exigiría ponerle 16
  guardias en un mes.
- **Carlota** acaba con 10 guardias porque el trasplante del puente solo lo puede hacer
  ella: Sandra es el mayor del sábado y la norma de la localizada le prohíbe el
  trasplante la víspera. Con el tope de mayores en 9 el puente no tiene solución.
- Los **84 puestos que solo pueden cubrir R3 o R4** entre 10 personas dan 8,4 de media
  frente a 4,4 de un R1. Es estructural: solo cambia si se amplía quién puede cubrir
  trasplante o el puesto de mayor.
