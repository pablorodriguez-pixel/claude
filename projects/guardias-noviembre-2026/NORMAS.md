# Normas del reparto de guardias

> **Esto es la fuente de verdad.** Antes de tocar el cuadrante, leer este fichero
> completo. Las versiones v2, v3 y v4 fallaron por reconstruir de memoria en vez de
> partir de aquí.

## Brief del usuario (literal, no reinterpretar)

> LAS PERSONAS que mas localizadas de trasplante han hecho son 1º isabel, 2º almudena
> 3º carlota 4º Sandra. Siendo las personas que más fines de semana han hecho 1º carlota,
> 2º isabel, 3º Sandra
>
> Por ello quiero que equilibres las tandas de fin de semana de trasplante y se las
> quites a carlota isabel y Sandra, para ponérselas a las que han hecho menos.
> (obligatoriamente la tanda de fin de semana debe ir de viernes a domingo, en caso del
> puente de viernes a lunes)
>
> Por otro lado, en cuanto al fin de semana de la fiesta, quiero que los mismos que están
> el viernes esten el domingo, al igual que los mismos que el sábado estén el lunes. En
> caso de no ser posible respetando las normas de no más de 2/3 puentes y la norma de
> libranza de la fiesta de los r1 y r2. Pondrás el domingo 8 a resis pequeños R1 y r2.
>
> Quiero que añadas a los R3 (5-6 guardias) para liberar a los R1 y que no superen 3
> guardias
>
> Quiero que ningún residente supere 6 guardias (sin contar las de tx).
>
> De esta forma. Las r4 tienen solo 1 finde de guardia de qx/ucq + 1 finde de localizada?
> No quiero que las r4 tengas más de 1 finde de qx/ucq

## La norma que más veces se ha incumplido

**La tanda de trasplante de fin de semana va de VIERNES a DOMINGO con la MISMA persona**
(de viernes a lunes en el puente), y va **cerrada por los dos lados**: el jueves anterior
y el día siguiente al cierre los lleva otra persona. El bloque del finde no se parte ni
se estira.

Ejemplos de lo que está MAL y se ha colado en versiones anteriores:

| Tanda | Por qué está mal |
|---|---|
| `María 20-23` | Viernes a lunes sin ser puente |
| `Ana G. 12-15` | Arranca el jueves y se come el finde |
| `Almudena 26-29` | Arranca el jueves y se come el finde |

En `check.py` esto lo verifica el bloque **10b**.

## Estructura del servicio

- 26 residentes: 8 R1, 8 R2, 4 R3, 6 R4. 5 puestos al día: **TX** (trasplante,
  localizada), **UCQ**, **mayor** y **2 de quirófano**. 140 puestos en el mes.
- **TX**: solo R4. **UCQ**: rotantes o R2. **mayor**: R3 o R4. **quirófano**: R1 o R2
  (relajado solo el viernes 6, donde no hay ningún R1 ni R2 disponible).
- **La UCQ es una rotación, no un puesto que se reparta.** Los cuatro rotantes
  (Tony, Patricia, María, Carlota) hacen 5-6 guardias de UCQ cada uno y como máximo una
  fuera de la unidad. Solo los días sueltos que quedan caen en R2. Romper esto fue el
  error de la v2 y la v3.
- **Emparejamientos**: el viernes y el domingo los hace el mismo equipo (V+D); el sábado
  otro distinto, que repite el lunes festivo (S+F).
- **Descanso**: nadie hace dos días presenciales seguidos. La localizada puede pegarse a
  una guardia del día anterior, pero **nunca es víspera de guardia**. La regla cruza la
  frontera del mes.
- **Puentes**: máximo 2 de los 3 del bimestre (12-oct, 31-oct, 9-nov). El puente de
  noviembre son los días **7, 8 y 9** — el viernes 6 no es puente.
- **Fiesta de bienvenida**: el viernes 6 no trabaja ningún R1 ni R2; el sábado 7 no lo
  trabaja ningún R1.
- **Curso de R4 del día 30**: ninguna R4 en puesto presencial ese día; la localizada sí.

## Contaje de localizadas desde junio (base del equilibrio)

| | Total | Findes (vie+sáb+dom) |
|---|---|---|
| Isabel | 38 | 16 |
| Almudena | 36 | 12 |
| Carlota | 34 | **18** |
| Sandra | 33 | 16 |
| Ana G. | 32 | 9 |
| María | 23 | 11 |
| Gerard | 15 | 9 |

**Gerard está fuera del reparto de noviembre** y no cubre ningún puesto. Es el que menos
acumula del servicio: en diciembre debería entrar por delante de todos.

## Las dos cosas que no tienen solución en noviembre

1. **La tanda de trasplante del puente (6-9)** no se puede sacar de Carlota/Isabel/Sandra.
   El trasplante solo lo firma una R4: María e Isabel están de vacaciones del 1 al 9, y
   Almudena y Ana G. libran el puente por llevar 2 de 3. Quedan Carlota y Sandra. Va a
   **Sandra**, que acumula menos por los dos criterios (33 frente a 34 localizadas, 16
   frente a 18 findes). Coste: Sandra pasa a 19 findes y adelanta a Carlota.
2. **El viernes 6 y el domingo 8 no se pueden emparejar.** El 6 solo admite R3/R4 por la
   libranza de la fiesta, y el 8 deja cuatro personas elegibles para cinco puestos. Se
   aplica la alternativa del brief: **el domingo 8 va a R1 y R2**, con un R3 de mayor
   porque ese puesto solo lo firma un R3 o una R4. La unión del sábado 7 con el lunes 9
   se mantiene.

## Bloqueos de noviembre

R1 — Aitor 26-30 · Cristina 13-15, 26-30 · Fátima 13-15, 27-29 · Mercedes 26-30 ·
Rosario 13-15, 20-22 · Miriam 6-9, 20-22 · Arturo y David sin bloqueos

R2 — Ana 6-8, 20-21 · Antonio 6-9 · Asís 12, 20-22 · Emilio 4, 18 · Eva 6-10, 28-29 ·
Tania 18-23 · Marc 27-29 · Patricia sin bloqueos

R3 — Candela 6-9, 17-18, 26-29 · Fabián 7-8 · Patri 20-22, 26-29 · Tony 27-29

R4 — Carlota 13-15 · Isabel 6-9, 14-15 · María 1-15 · Almudena 11-13, 20-22 (+ exenta
del puente 7-9) · Ana G. exenta del puente 7-9 · Sandra 27-29
