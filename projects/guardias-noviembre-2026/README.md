# Guardias · Noviembre 2026 (reparto v4)

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

## Reglas modeladas

- **La rotación de UCQ es estructura, no reparto.** Los cuatro rotantes (Tony, Patricia,
  María, Carlota) hacen 5-6 guardias de UCQ cada uno y como máximo 1 fuera de la unidad;
  solo los días sueltos que quedan caen en R2. Romper esto fue el error de las v2 y v3.
- **Elegibilidad**: TX solo R4; UCQ rotantes o R2; mayor R3 o R4; quirófano R1 o R2
  (relajado el viernes 6, que solo tiene R3/R4 disponibles).
- **Topes**: R1 = 3 guardias y ≤ 1 finde; R3 entre 5 y 6; nadie por encima de 6 sin contar
  trasplante; R4 ≤ 1 finde de quirófano/UCQ/mayor y ≤ 1 tanda de finde de trasplante.
- **Tandas de trasplante**: consecutivas, de 2 a 4 días, sin días sueltos; las de finde
  cogen viernes→domingo, y viernes→lunes en el puente. Ninguna para Carlota ni Isabel.
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
| Almudena | 36 | 12 | +4 | +3 | 40 | 15 |
| Carlota | 34 | 18 | +5 | +0 | 39 | 18 |
| Sandra | 33 | 16 | +6 | +3 | 39 | 19 |
| Ana G. | 32 | 9 | +6 | +3 | 38 | 12 |
| María | 23 | 11 | +5 | +3 | 28 | 14 |
| Gerard | 15 | 9 | fuera | fuera | 15 | 9 |

Nadie pasa de 40 acumuladas. Isabel baja de 6 localizadas en el mes a 2.

Carga presencial: R1 los ocho a 3; R2 siete a 5 y Patricia a 6; R3 entre 5 y 6;
R4 entre 1 y 6 sin contar trasplante.

## Los tres puntos que no cierran

- **La tanda de trasplante del puente (6–9)** no se puede sacar de Carlota/Isabel/Sandra:
  María e Isabel están de vacaciones del 1 al 9 y Almudena y Ana G. libran el puente por
  llevar 2 de 3. Va a Sandra, la que menos findes de localizada acumula de las dos
  candidatas (16 frente a 18). Coste: Sandra pasa a 19 findes y adelanta a Carlota.
  Se compensa dejándola sin ningún finde presencial y con el acumulado total más bajo
  de las cinco (37).
- **Isabel y Almudena no pueden bajar de 40.** Son 28 localizadas al mes entre seis R4,
  y María y Carlota están rotando en UCQ: con 6 guardias de unidad cada una no pasan de
  5 localizadas. Eso deja 18 de las 28 en las otras cuatro, dos de las cuales son las que
  más acumulan. Lo que sí se corrige del todo son los findes.
- **Gerard queda pendiente.** Con 15 localizadas y 9 findes desde junio es el que menos
  acumula del servicio, pero está fuera del reparto de noviembre. Si entrase, la tanda
  del puente sería suya y Carlota, Isabel y Sandra se quedarían las tres a cero.
- **El viernes 6 y el domingo 8 no se pueden emparejar**: el 6 solo admite R3/R4 (fiesta)
  y el 8 deja cuatro personas elegibles para cinco puestos. Se aplica la alternativa
  prevista: el domingo 8 va a residentes pequeños, con un R3 de mayor.

Consecuencia del reparto: con los R1 a 3 y las R4 limitadas a un finde, los ocho R2
quedan a 6 guardias (venían de 4). Es el precio de los topes nuevos: para bajarles a 5
hay que subir a los R1 a 4 o dejar que alguna R4 haga un segundo finde.
