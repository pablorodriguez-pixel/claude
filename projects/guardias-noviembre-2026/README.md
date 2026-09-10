# Guardias · Noviembre 2026 (reparto v14)

> **Lee `NORMAS.md` antes de tocar nada.** Contiene el brief literal y las reglas del
> servicio. Es la fuente de verdad.

Cuadrante de guardias de 26 residentes (8 R1, 8 R2, 4 R3, 6 R4) sobre 28 días
(3–30 de noviembre) y 5 puestos diarios: TX (trasplante, localizada), UCQ, mayor
y 2 de quirófano. 140 puestos en total.

## Ficheros

| Fichero | Qué es |
|---|---|
| `index.html` | El cuadrante publicable (calendario + control por residente + reglas) |
| `solve.py` | Modelo CP-SAT: reparte las 28 localizadas y los 112 puestos presenciales |
| `check.py` | Verificador independiente: re-comprueba las 11 familias de reglas desde cero |
| `data.py` | Recuento por residente (guardias, findes, puentes, desglose por puesto) |
| `gen.py` | Genera `index.html` a partir de la solución |

## Uso

```
pip install ortools
python3 solve.py      # escribe sol.json
python3 check.py      # debe imprimir "ERRORES: 0"
python3 data.py       # escribe tab.json
python3 gen.py        # escribe guardias-noviembre-2026.html
```

## Dobletes

Un doblete es trabajar el día *d* y el *d*+2 sin ser el viernes-domingo ni el sábado-lunes
propios. Se han reducido de **10 a 2**, y Carlota no tiene ninguno. Quedan Sandra 6+8 —el fin de semana
de la fiesta va partido porque el viernes 6 y el domingo 8 no se pueden emparejar— y
María 10+12, que aparece al subirle la UCQ a 5.

## Sin tripletes

Nadie hace 3 guardias presenciales en 7 días, ventana que cruza la frontera del mes. El
cuadrante anterior tenía cuatro tripletes de 3 en 5 días: Aitor 20-22-24, Marc 20-22-24,
María 25-27-29 y Sandra 6-8-10. Además ningún día lleva dos R1 juntos en quirófano, salvo
el domingo 8 por la norma de la fiesta.

## Reglas modeladas

- **La rotación de UCQ es estructura, no reparto.** Los cuatro rotantes (Tony, Patricia,
  María, Carlota) hacen 5-6 guardias de UCQ cada uno y como máximo 1 fuera de la unidad;
  solo los días sueltos que quedan caen en R2. Romper esto fue el error de las v2 y v3.
- **Elegibilidad**: TX solo R4; UCQ rotantes o R2; mayor R3 o R4; quirófano R1 o R2
  (relajado el viernes 6, que solo tiene R3/R4 disponibles).
- **Topes**: R1 = 3 guardias y ≤ 1 finde; R3 entre 5 y 6; nadie por encima de 6 sin contar
  trasplante; R4 ≤ 1 finde de quirófano/UCQ/mayor y ≤ 1 tanda de finde de trasplante.
- **Tandas de trasplante**: la de finde va de **viernes a domingo** con la misma persona
  (viernes a lunes en el puente) y **cerrada por los dos lados** — el jueves anterior y el
  día siguiente los lleva otra. Las de laborables ocupan los huecos en tandas de 2-3 días.
  Ninguna tanda de finde para Carlota ni Isabel.
- **Equidad de localizadas**: el modelo parte del contaje real de junio a octubre
  (Isabel 38, Almudena 36, Carlota 34, Sandra 33, Ana G. 32, María 23) y minimiza el
  máximo acumulado, con tope de 6 localizadas al mes y de 5 para las dos rotantes.
- **Descanso**: nunca dos días presenciales seguidos. La localizada puede pegarse a una
  guardia del día anterior, pero nunca es víspera de guardia. La regla cruza el mes.
- **Emparejamientos**: viernes y domingo llevan el mismo equipo; el sábado 7 repite el
  lunes 9 festivo. El domingo 8 es la excepción documentada.
- **Fiesta de bienvenida**: el viernes 6 libran R1 y R2; el sábado 7 libran los R1.
- **Puentes**: máximo 2 de los 3 del bimestre (12-oct, 31-oct, 9-nov).
- **Bloqueos**: vacaciones por residente y curso de R4 del día 30 (sin puesto
  presencial para R4 ese día; la localizada sí).

## Acumulado de localizadas (junio → noviembre)

| R4 | Jun-oct | Findes | Nov | Findes | Acumulado | Findes |
|---|---|---|---|---|---|---|
| Isabel | 38 | 16 | +2 | +0 | 40 | 16 |
| Almudena | 36 | 12 | +3 | +3 | 39 | 15 |
| Carlota | 34 | 18 | +3 | +0 | 37 | 18 |
| Sandra | 33 | 16 | +5 | +3 | 38 | 19 |
| Ana G. | 32 | 9 | +7 | +3 | 39 | 12 |
| María | 23 | 11 | +8 | +3 | 31 | 14 |
| Gerard | 15 | 9 | fuera | fuera | 15 | 9 |

Acumulado de localizadas 32-40. Isabel se queda en 2 localizadas y María carga 9.

Carga presencial: R1 los ocho a 3; R2 no rotantes: Asís y Emilio a 5, y Ana, Antonio, Eva, Tania y Marc a 4 (nunca más de
2 días de UCQ), Patricia a 6;
R3: Candela, Fabián y Patri a 5, Tony a 6; R4 que no rotan a 5 exactas; Tony, Patricia y
Carlota a 6 de UCQ y María a 5 (23 de 28 días), con 5 huecos para R2.

Tandas de finde, una por R4: Ana G. el puente (6-9), Sandra el 13-15, María el 20-22 y
Almudena el 27-29. **Carlota e Isabel, ninguna.**

## Los tres puntos que no cierran

- **La tanda de trasplante del puente (6–9)** no se puede sacar de Carlota/Isabel/Sandra:
  María e Isabel están de vacaciones del 1 al 9 y Almudena y Ana G. libran el puente por
  llevar 2 de 3. Va a Sandra, la que menos findes de localizada acumula de las dos
  candidatas (16 frente a 18). Coste: Sandra pasa a 19 findes y adelanta a Carlota.
  Se compensa dejándola sin ningún finde presencial y con el acumulado total más bajo
  de las cinco (37).
- **Los R2 se quedan en 4, y quitarles guardias a los R1 no lo arregla.** Con las R4 que no
  rotan fijas en 5, los siete R2 no pasan de 29 puestos aunque los R1 bajen a cero; los R1 se
  quedan en 3 en todas las variantes. Bajando las R4 a 4 guardias, tres R2 llegarían a 5.
  R2 a 5 los siete es imposible por cualquier vía.
- **Sandra queda en 19 findes de localizada** acumulados, por delante de Carlota (18), al
  devolverle la tanda del 13-15. Solo Ana G. o Sandra pueden cogerla, y darle las dos a
  Ana G. rompe la norma de una tanda por R4.
- **Gerard queda pendiente.** Con 15 localizadas y 9 findes desde junio es el que menos
  acumula del servicio, pero está fuera del reparto de noviembre. Si entrase, la tanda
  del puente sería suya y Carlota, Isabel y Sandra se quedarían las tres a cero.
- **El viernes 6 y el domingo 8 no se pueden emparejar**: el 6 solo admite R3/R4 (fiesta)
  y el 8 deja cuatro personas elegibles para cinco puestos. Se aplica la alternativa
  prevista: el domingo 8 va a residentes pequeños, con un R3 de mayor.

Consecuencia del reparto: con los R1 a 3 y las R4 limitadas a un finde, los ocho R2
quedan a 6 guardias (venían de 4). Es el precio de los topes nuevos: para bajarles a 5
hay que subir a los R1 a 4 o dejar que alguna R4 haga un segundo finde.
