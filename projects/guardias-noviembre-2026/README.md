# Guardias · Noviembre 2026 (reparto v2)

Cuadrante de guardias de 26 residentes (8 R1, 8 R2, 4 R3, 6 R4) sobre 28 días
(3–30 de noviembre) y 5 puestos diarios: TX (trasplante, localizada), UCQ, mayor
y 2 de quirófano. 140 puestos en total.

## Ficheros

| Fichero | Qué es |
|---|---|
| `index.html` | El cuadrante publicable (calendario + control por residente + reglas) |
| `solve2.py` | Modelo CP-SAT que reparte los 112 puestos que no son trasplante |
| `check.py` | Verificador independiente: re-comprueba las 11 familias de reglas desde cero |
| `data.py` | Recuento por residente (guardias, findes, puentes, desglose por puesto) |
| `gen.py` | Genera `index.html` a partir de la solución |

## Uso

```
pip install ortools
python3 solve2.py     # escribe sol.json
python3 check.py      # debe imprimir "ERRORES: 0"
python3 data.py       # escribe tab.json
python3 gen.py        # escribe guardias-noviembre-2026.html
```

## Reglas modeladas

- **Elegibilidad**: TX solo R4; UCQ rotantes (Tony, Patricia, María, Carlota) o R2;
  mayor R3 o R4; quirófano R1 o R2 (relajado el viernes 6, que solo tiene R3/R4).
- **Topes**: R1 ≤ 3 guardias y ≤ 1 finde; R3 = 6; nadie por encima de 6 sin contar
  trasplante; R4 ≤ 1 finde de quirófano/UCQ/mayor y ≤ 1 tanda de finde de trasplante.
- **Tandas de trasplante**: consecutivas; las de finde cogen viernes→domingo, y
  viernes→lunes en el puente.
- **Descanso**: nunca dos días presenciales seguidos. La localizada puede pegarse a una
  guardia del día anterior, pero nunca es víspera de guardia. La regla cruza el mes.
- **Emparejamientos**: viernes y domingo llevan el mismo equipo; el sábado 7 repite el
  lunes 9 festivo. El domingo 8 es la excepción documentada.
- **Fiesta de bienvenida**: el viernes 6 libran R1 y R2; el sábado 7 libran los R1.
- **Puentes**: máximo 2 de los 3 del bimestre (12-oct, 31-oct, 9-nov).
- **Bloqueos**: vacaciones por residente y curso de R4 del día 30 (sin puesto
  presencial para R4 ese día; la localizada sí).

## Los dos puntos que no cierran

- **La tanda de trasplante del puente (6–9)** no se puede sacar de Carlota/Isabel/Sandra:
  María e Isabel están de vacaciones del 1 al 9 y Almudena y Ana G. libran el puente por
  llevar 2 de 3. Va a Sandra, la que menos localizadas acumula de las dos candidatas.
- **El viernes 6 y el domingo 8 no se pueden emparejar**: el 6 solo admite R3/R4 (fiesta)
  y el 8 deja cuatro personas elegibles para cinco puestos. Se aplica la alternativa
  prevista: el domingo 8 va a residentes pequeños, con un R3 de mayor.

Consecuencia del reparto: con los R1 a 3 y las R4 limitadas a un finde, los ocho R2
quedan a 6 guardias (venían de 4). Es el precio de los topes nuevos.
