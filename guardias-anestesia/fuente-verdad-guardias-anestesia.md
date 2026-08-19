# Fuente de la verdad — Cuadrante de guardias
## Servicio de Anestesiología y Reanimación

**Versión:** 0.9
**Periodo de referencia:** octubre 2026 (33 días: 1 oct – 2 nov)
**Uso previsto:** documento base para un agente automatizado de generación de cuadrantes.

> **Aviso de estado.** Este documento aún NO es ejecutable. Las secciones marcadas
> con 🔴 contienen huecos que bloquean la generación. Ver §11.

---

## 1. Propósito y alcance

Este documento define, de forma no ambigua, las reglas de asignación de guardias
del servicio para que un agente pueda generar un cuadrante mensual válido sin
intervención humana.

El agente debe:

1. Cubrir **todos** los puestos de **todos** los días del periodo.
2. No violar **ninguna** regla dura (§6).
3. Maximizar el cumplimiento de las reglas blandas (§7), en el orden de
   prioridad indicado.
4. Reportar explícitamente cualquier restricción que haya tenido que relajar.

**Principio rector:** ante conflicto, una regla dura nunca se relaja. Si el
problema resulta infactible, el agente debe detenerse y reportar el conjunto
mínimo de restricciones en conflicto, no producir un cuadrante inválido.

---

## 2. Calendario de referencia — octubre 2026

| L | M | X | J | V | S | D |
|---|---|---|---|---|---|---|
| | | | **1** | 2 | **3** | **4** |
| 5 | 6 | 7 | 8 | 9 | **10** | **11** |
| **12** 🎌 | 13 | 14 | 15 | 16 | **17** | **18** |
| 19 | 20 | 21 | 22 | 23 | **24** | **25** |
| 26 | 27 | 28 | 29 | 30 | **31** | **1 nov** 🎌 |
| **2 nov** 🎌 | | | | | | |

- **1 de octubre de 2026 = jueves.**
- 🎌 Festivos: **lun 12 oct** (Fiesta Nacional / El Pilar), **dom 1 nov**
  (Todos los Santos), **lun 2 nov** (traslado del festivo).

### 2.1 Fines de semana del periodo

| ID | Viernes | Sábado | Domingo | Lunes | Tipo |
|----|---------|--------|---------|-------|------|
| FDS-1 | 2 oct | 3 oct | 4 oct | — | Normal |
| FDS-2 | 9 oct | 10 oct | 11 oct | **12 oct** 🎌 | **Puente del Pilar** |
| FDS-3 | 16 oct | 17 oct | 18 oct | — | Normal |
| FDS-4 | 23 oct | 24 oct | 25 oct | — | Normal |
| FDS-5 | 30 oct | 31 oct | **1 nov** 🎌 | **2 nov** 🎌 | **Puente de los Santos** |

> ⚠️ **El periodo de planificación se extiende hasta el 2 de noviembre de 2026**,
> porque el puente de los Santos no cierra dentro del mes natural. Total: **33 días**.

---

## 3. Plantilla (25 residentes)

### R1 — "pequeños" (8)
`R1-01` Rosario · `R1-02` Cristina · `R1-03` Miriam · `R1-04` David ·
`R1-05` Mercedes · `R1-06` Arturo · `R1-07` Aitor · `R1-08` Fátima

### R2 (8)
`R2-01` Tania · `R2-02` Asís · `R2-03` **Patricia (R2)** · `R2-04` Eva ·
`R2-05` Emilio · `R2-06` Antonio · `R2-07` **Ana (R2)** · `R2-08` Marc

### R3 (4)
`R3-01` **Patricia (R3)** · `R3-02` Candela · `R3-03` Fabián · `R3-04` Tony

### R4 (5)
`R4-01` Carlota · `R4-02` Almudena · `R4-03` **Ana Gaudioso García (R4)** ·
`R4-04` Sandra · `R4-05` Isa

### 3.1 Desambiguación obligatoria de nombres

Hay **nombres duplicados**. El agente debe usar SIEMPRE el ID, nunca el nombre suelto.

| Nombre | Personas | Interpretación adoptada |
|--------|----------|--------------------------|
| Patricia | `R2-03`, `R3-01` | La de cupo REA = **Patricia R2** (`R2-03`). La "mayor" = **Patricia R3** (`R3-01`). 🔴 Confirmar (Q-06). |
| Ana | `R2-07`, `R4-03` | ✅ **RESUELTO.** La de trabajo externo es **Ana Gaudioso García**, `R4-03`, confirmado por el parte de guardias externo (§8.0). |

---

## 4. Puestos a cubrir — 5 por día, todos los días

| ID | Puesto | Plazas/día | Naturaleza |
|----|--------|-----------|------------|
| `TX` | Localizada de trasplante | 1 | Localizada (desde casa) — **solo R4** |
| `REA` | REA / UCQ | 1 | Presencial |
| `QX-M` | Quirófano — residente mayor | 1 | Presencial |
| `QX-P` | Quirófano — residente pequeño | 2 | Presencial |

- **Nota de nomenclatura:** "UCQ" y "REA" se usaron indistintamente en las
  instrucciones originales. Se asumen **el mismo puesto**. 🔴 Confirmar (Q-04).
- Total de asignaciones en el periodo: **33 días × 5 = 165 slots.**

---

## 5. Matriz de elegibilidad

> 🔴 **LA ELEGIBILIDAD VARÍA CADA MES.** Esta tabla es la vigente para **octubre
> 2026**, confirmada por Pablo mediante la pestaña "Plantilla y elegibilidad"
> de ese cuadrante. **Antes de generar el cuadrante de cualquier otro mes, el
> agente DEBE pedir a Pablo la tabla de elegibilidad de ese mes concreto** — no
> reutilizar esta sin confirmarlo. Ver §0 (principio de proceso) y la
> instrucción equivalente en `.claude/agents/guardias-anestesia.md`.

| Puesto | Quién puede cubrirlo (octubre 2026) |
|--------|----------------------|
| `QX-M` | **Solo los 7 "mayores":** Carlota, Almudena, Ana R4, Sandra, Isa (R4) + Patricia R3, Candela (R3) |
| `REA` (UCQ) | Fabián (`R3-03`), Tony (`R3-04`) y **los 8 R2**. Nadie más. |
| `QX-P` (PEQ) | Los 8 R1 **y 6 de los 8 R2** — Tania (`R2-01`) y Patricia R2 (`R2-03`) **NO** hacen `QX-P`, solo `REA`. ✅ Confirmado en la pestaña de elegibilidad de octubre 2026 (antes se asumía que los 8 R2 hacían `QX-P`; corregido). |
| `TX` | **Solo los 5 R4:** Carlota, Almudena, Ana R4, Sandra, Isa. ✅ Resuelto (Q-02). **Patricia R3 y Candela NO hacen trasplante**, pese a ser mayores. |

**Nunca son mayores:** Fabián y Tony, pese a ser R3. Solo Patricia R3 y Candela.

**Nunca hacen `QX-P`:** Tania y Patricia R2, pese a ser R2 — dedicadas solo a `REA`.

### 5.1 Principio de proceso — reconfirmar cada mes

La elegibilidad (quién puede cubrir cada puesto) **no es una propiedad fija del
roster** — puede cambiar de un mes a otro (rotaciones, cambios de año de
residencia, ajustes del servicio). El cambio de octubre 2026 (Tania/Patricia R2
excluidas de `QX-P`) es prueba de ello. **Regla dura de proceso:** antes de
generar, rellenar u optimizar el cuadrante de un mes para el que no se haya
recibido explícitamente la tabla de elegibilidad de ESE mes, el agente debe
parar y pedirla — nunca asumir que la del mes anterior sigue vigente.

---

## 6. Reglas duras (no negociables)

Un cuadrante que viole cualquiera de estas es **inválido**.

| ID | Regla |
|----|-------|
| **H-01** | Cada día del periodo tiene exactamente 1 `TX`, 1 `REA`, 1 `QX-M` y 2 `QX-P`. |
| **H-02** | Nadie ocupa más de un puesto el mismo día. |
| **H-03** | **Saliente de guardia = libra 24 h.** Quien hace guardia el día *D* no puede tener guardia el día *D+1*. Esta libranza aplica a guardias presenciales (`QX-M`, `QX-P`, `REA`); **no** impide asignar `TX` el día *D+1*, aunque es preferible evitarlo (ver S-08). ✅ Aclarado por el servicio. |
| **H-04** | **Guardia en sábado ⇒ libra domingo y lunes.** No puede tener ninguna asignación en *D+1* ni *D+2*. |
| **H-05** | **Pareja viernes–domingo.** Quien hace guardia un viernes hace también, obligatoriamente, el domingo de ese mismo fin de semana, en el mismo puesto. Se asigna como bloque indivisible. |
| **H-06** | **Exclusión de puentes.** Quien tenga cualquier asignación en el puente del Pilar (10, 11 o 12 oct) NO puede tener ninguna en el puente de los Santos (31 oct, 1 o 2 nov), y viceversa. |
| **H-07** | **Sábado de puente ⇒ se une al lunes festivo.** En FDS-2 y FDS-5, quien hace el sábado hace también el lunes festivo (12 oct / 2 nov). Esta regla **prevalece sobre H-04** en esos dos fines de semana concretos. 🔴 Confirmar (Q-05). |
| **H-08** | Se respetan las vacaciones y bloqueos. ✅ Datos recibidos (§8bis). |
| **H-09** | Solo personal elegible según §5 ocupa cada puesto. |
| **H-10** | **Bloqueos individuales de Ana R4** (§8). |
| **H-11** | Tania (`R2-01`), Patricia R2 (`R2-03`), Fabián (`R3-03`) y Tony (`R3-04`): **mínimo 6 guardias de `REA` cada uno.** |
| **H-12** | Esos mismos cuatro: **mínimo 2 fines de semana cada uno.** *(Concretado por H-16.)* |
| **H-13** | Todo residente hace **al menos 1 fin de semana**. |
| **H-14** | **No hay `TX` la víspera de una guardia.** Si un residente tiene guardia presencial el día *D*, no puede tener `TX` el día *D−1*. (Equivale a: `TX` en *D* ⇒ ninguna guardia presencial en *D+1*. `TX` consecutivas sí se permiten — lo exige H-15.) |
| **H-15** | **Agrupación del trasplante de fin de semana.** Cada fin de semana, **una sola persona** cubre `TX` todos los días del bloque, y el bloque **empieza el viernes** (✅ resuelta Q-15 — no el sábado, como se asumía en versiones anteriores de este documento). Los 5 fines de semana se reparten 1:1 entre los 5 R4, de modo que cada R4 tiene exactamente **un fin de semana de localizada**. Excepción prevista: si Ana R4 no pudiera cubrir un bloque completo, haría días sueltos. ⚠️ **La tabla forzada de §8ter/§8quater quedó obsoleta con esta resolución de Q-15** (se calculó asumiendo bloque de sábado a lunes) — no usarla sin recalcular. |
| **H-16** | **Los cuatro de REA cubren 2 fines de semana con formato fijo:** Tania, Patricia R2, Fabián y Tony hacen cada uno **un bloque viernes–domingo Y un sábado**. Esto sustituye y concreta a H-12. |
| **H-17** | **Bloqueos declarados.** Ningún residente recibe asignación en sus días bloqueados (§8bis). |
| **H-18** | **Congreso R1 de Anestesia, 23–25 oct.** Los **8 R1** están bloqueados. Esos tres días, `QX-P` lo cubren íntegramente R2. |
| **H-19** | **Vacaciones y `TX` del día previo.** El día inmediatamente anterior a un bloqueo por vacaciones de un residente, este puede cubrir guardia presencial (`QX-M`, `QX-P` o `REA`), pero **no puede** cubrir `TX`. ✅ Aclarado por el servicio — generaliza a todos los bloqueos por vacaciones el mismo criterio que H-10c aplica al trabajo externo de Ana R4. |
| **H-20** | **Tope de guardias totales por año (no solo dentro del grupo, un número concreto).** `R1`: entre 4 y 5 guardias cada uno *(la hoja de objetivos original decía 3-4, con Miriam en 4-5; confirmado por Pablo el 2026-08-18 que es 4-5 para todos — usar esto salvo corrección)*. `R2`: **exactamente 6** cada uno, ni más ni menos. `R3`: **máximo 6** cada uno. `R4`: **sin tope** — su carga la fija la suma de `MAY` + `TX` individuales (objetivo por persona en "Resumen de guardias"), que ya supera los 6 de forma естructural; no se les aplica este límite. ✅ Confirmado por Pablo el 2026-08-18 (antes solo vivía como columna "objetivo" en el Excel, sin estar escrito aquí como regla — de ahí que el generador no lo respetara como límite duro en la primera versión de octubre). |
| **H-21** | **Tope de fines de semana por persona dentro de R2: máximo 2.** Ningún R2 puede tener 3 fines de semana (bloques distintos, ver §6.1) aunque el reparto general quede dentro de la tolerancia de S-02. ✅ Confirmado por Pablo el 2026-08-18 (caso real: Eva y Antonio con 3 en la primera versión de octubre, corregido a 2). |

### 6.1 Definición operativa de "hacer un fin de semana"

Para computar H-12 y H-13, un residente "hace un fin de semana" si tiene
asignación en **cualquier** día del bloque sábado–domingo (–lunes festivo si aplica)
de ese fin de semana. Un bloque **viernes+domingo** (H-05) cuenta como **un** fin
de semana, no dos.

---

## 7. Reglas blandas (preferencias, por orden de prioridad)

| ID | Preferencia | Prioridad | Peso sugerido |
|----|-------------|-----------|---------------|
| **S-01** | Los 7 mayores tienden a **5 guardias `QX-M`** cada uno. | Alta | 10 |
| **S-02** | Reparto equitativo de fines de semana (diferencia máx. 1 dentro del mismo año). | Alta | 10 |
| **S-03** | Si un residente hace un bloque viernes–domingo, que su **segundo** fin de semana sea un **sábado**. | Media | 6 |
| **S-04** | Reparto equitativo del número total de guardias dentro de cada año. | Media | 6 |
| **S-05** | Separación mínima de 3–4 días entre guardias del mismo residente. | Media | 5 |
| **S-06** | Evitar, siempre que sea posible, que los dos puestos de `QX-P` de un mismo día los cubran dos R1 (preferir 1 R1 + 1 R2). ✅ Aclarado por el servicio — sustituye a la formulación anterior ("evitar que los mismos dos R1 coincidan repetidamente"). ⚠️ **Excepción aceptada (Pablo, 2026-08-19):** con H-20 fijando R2 en exactamente 6, octubre 2026 fuerza un mínimo matemático de 9 días con 2 R1 juntos en `QX-P` (ver §13.2). Pablo eligió mantener R2 en 6 exacto y aceptar esos 9 días como excepción documentada de S-06, en vez de relajar H-20 a un rango. Aplicar el mismo criterio en meses futuros salvo que Pablo diga lo contrario. | Baja | 2 |
| **S-07** | Rotar el mayor que supervisa, para que cada R1 pase por varios mayores. | Baja | 2 |
| **S-08** | Evitar asignar `TX` el día de saliente de una guardia presencial (día *D+1* tras una guardia en *D*), aunque no está prohibido (ver H-03). ✅ Aclarado por el servicio. | Baja | 2 |

---

## 8. Restricción individual — Ana Gaudioso García (`R4-03`)

### 8.0 Parte de guardias externas (fuente: documento oficial aportado)

| Fecha | Día sem. | Turno | Tipo | Duración |
|-------|----------|-------|------|----------|
| 1 oct | Jueves | `24(T2)` | CHA | 24 h |
| 4 oct | Domingo | `MT` | SVA | Parcial |
| 7 oct | Miércoles | `24(T2)` | CHA | 24 h |
| 10 oct | Sábado | `MT` | SVA | Parcial |
| 13 oct | Martes | `24(T2)` | CHA | 24 h |
| 18 oct | Domingo | `MT` | SVA | Parcial |
| 21 oct | Miércoles | `24(T2)` | CHA | 24 h |
| 25 oct | Domingo | `24(T2)` | CHA | 24 h |
| 28 oct | Miércoles | `MT` | SVA | Parcial |

- **Turnos de 24 h (`24(T2)`, tipo CHA):** 1, 7, 13, 21, 25 → **5 días**
- **Turnos parciales (`MT`, tipo SVA):** 4, 10, 18, 28 → **4 días**

> ⚠️ Un turno `24(T2)` iniciado el día *D* **invade la mañana del día D+1**.
> Un turno `MT` termina dentro del propio día *D*. Esta diferencia es la que
> explica (casi por completo) el régimen de excepciones de H-10d.

### 8.1 Reglas derivadas

| ID | Regla |
|----|-------|
| **H-10a** | Ninguna asignación **los 9 días de trabajo externo**. |
| **H-10b** | Sin `QX-M` ni `QX-P` el **día anterior ni el día posterior** a cada día de trabajo externo. |
| **H-10c** | Sin `TX` el **día anterior** a cada día de trabajo externo. |
| **H-10d** | Sin `TX` el **día posterior**, **salvo excepción**: sí puede hacer `TX` los días **5, 11, 19, 22 y 29** (posteriores al 4, 10, 18, 21 y 28). |

#### 8.1.1 Formulación generalizable propuesta (para reutilizar en otros meses)

H-10d está escrita como lista fija de fechas, lo que la hace inservible fuera de
octubre. La regla **derivable del tipo de turno** sería:

> *"Ana R4 puede hacer `TX` el día siguiente a un turno externo **`MT`**,
> pero no el día siguiente a un turno externo **`24(T2)`"*.

Cobertura de esta formulación: **4 de 4 días MT** caen en la lista de excepciones
(5, 11, 19, 29 ✅) y **4 de 5 días 24 h** quedan excluidos (2, 8, 14, 26 ✅).
**Único desajuste: el 22 de octubre** (posterior al 21, que es turno de 24 h).
🔴 Ver Q-10.

### 8.2 Disponibilidad calculada

**Días en que Ana R4 puede hacer `QX-M`:**

> **15, 16, 23, 30 y 31 de octubre** — y nada más.

**Días en que Ana R4 puede hacer `TX`:**

| Lectura | Días disponibles | Nº |
|---------|------------------|-----|
| Literal (lista dictada, incluye el 22) | 5, 11, 15, 16, 19, **22**, 23, 29, 30, 31 | 10 |
| Derivada del turno (excluye el 22) | 5, 11, 15, 16, 19, 23, 29, 30, 31 | 9 |

### 8.3 ⚠️ Contradicción detectada (sin cambios respecto a v0.1)

La instrucción original dice que Ana *"hará más guardias porque trabaja en otro sitio"*.
**La aritmética dice lo contrario.** De sus 5 días posibles de `QX-M`:

- **16 oct** es viernes → H-05 la arrastra al **domingo 18**, día de trabajo externo. ❌
- **23 oct** es viernes → la arrastra al **domingo 25**, día de trabajo externo. ❌
- **30 oct** es viernes → arrastra al **domingo 1 nov**. ✅ viable.
- **31 oct** es sábado de puente → H-07 la arrastra al **lunes 2 nov**. ✅ viable.
- **30 y 31** son mutuamente excluyentes por H-03/H-04.

**Conclusión: Ana R4 puede hacer como máximo 2 guardias de `QX-M`** —
el jueves 15 y **una** de las dos opciones del puente de los Santos.

El parte externo **refuerza** esta conclusión: los domingos 18 y 25 están ocupados,
por lo que ningún bloque viernes–domingo de FDS-3 ni FDS-4 es posible para ella.

### 8.4 Impacto en el resto de mayores

33 slots de `QX-M` − 2 de Ana = **31 slots para 6 mayores ≈ 5,2 cada uno.**
Esto **encaja con S-01** ("cinco guardias cada una"). Es una señal fuerte de que
los mayores cubren **solo `QX-M`**, y que `TX` corresponde a otro grupo.

---

## 8bis. Bloqueos declarados por residente

Fechas de octubre 2026. `32` = 1 nov, `33` = 2 nov.

### R1 (todos bloqueados 23–25 por congreso, H-18)

| Residente | Bloqueos | FDS que le quedan libres |
|-----------|----------|--------------------------|
| Rosario | 2–4, 21–25 | FDS-2, FDS-3, FDS-5 |
| Cristina | 2–4, 23–25 | FDS-2, FDS-3, FDS-5 |
| Miriam | 9–11, 23–25 | FDS-1, FDS-3, FDS-5 |
| David | 23–25 🔴 *(la lista empieza con una coma suelta — ¿falta una fecha?)* | FDS-1, FDS-2, FDS-3, FDS-5 |
| Mercedes | 2–4, 23–25 | FDS-2, FDS-3, FDS-5 |
| Arturo | 23–25 | FDS-1, FDS-2, FDS-3, FDS-5 |
| Aitor | 2–4, 23–25 | FDS-2, FDS-3, FDS-5 |
| Fátima | 9–11, 23–25 | FDS-1, FDS-3, FDS-5 |

### R2

| Residente | Bloqueos |
|-----------|----------|
| Tania | 10 |
| Asís | 8–9, 23–25 |
| Patricia R2 | — (ninguno) |
| Eva | 1–8 |
| Emilio | 1, 26, 30 |
| Antonio | 15–18 |
| Ana R2 | 3–4, 23–25 |
| Marc | — (ninguno) |

### R3

| Residente | Bloqueos |
|-----------|----------|
| Patricia R3 | 8–12 |
| Candela | 8–9, 22–25 |
| Fabián | 24–25 |
| Tony | 9–11 |

### R4

| Residente | Bloqueos | Nota |
|-----------|----------|------|
| Carlota | 2–4, 11, 23–25 | 🔴 *"(si se puede)"* — ¿blando todo, o solo 23–25? (Q-11) |
| Almudena | 2–4, 9–11, 15–21 | Duro |
| Ana R4 | 16–18 + los 9 días externos (§8.0) | 🔴 16–18 marcado *"(si se puede)"* |
| Sandra | 29–1 | 🔴 Se interpreta **29 oct – 1 nov** (Q-12) |
| Isa | 4, 14–18 | Duro |

---

## 8ter. ⭐ Asignación FORZADA del trasplante de fin de semana

Cruzando H-15 (un R4 por fin de semana, 1:1) con los bloqueos de §8bis y la
disponibilidad de Ana R4 (§8.2), **existe una única solución posible**.
Verificado por enumeración exhaustiva de las 120 permutaciones: **1 solución**.

| Fin de semana | Días `TX` | Candidatos elegibles | **Asignado** |
|---------------|-----------|----------------------|--------------|
| FDS-1 | 3, 4 oct | Sandra | **Sandra** ← forzado |
| FDS-2 (Pilar) | 10, 11, 12 oct | Sandra, Isa | **Isa** ← forzado en cascada |
| FDS-3 | 17, 18 oct | Carlota, Sandra | **Carlota** ← forzado en cascada |
| FDS-4 | 24, 25 oct | Almudena, Sandra, Isa | **Almudena** ← forzado en cascada |
| FDS-5 (Santos) | 31 oct, 1, 2 nov | Carlota, Almudena, Ana R4, Isa | **Ana R4** ← forzado en cascada |

**Esta tabla no es una propuesta: es la única salida compatible con las reglas.**
El generador debe fijarla antes que nada. El revisor debe rechazar cualquier
cuadrante que se desvíe de ella.

**Comprobación H-06:** Isa cubre el puente del Pilar, Ana R4 el de los Santos.
Son personas distintas ✅. En consecuencia:
- **Isa** no puede tener **ninguna** asignación el 31 oct, 1 nov ni 2 nov.
- **Ana R4** no puede tener **ninguna** asignación el 10, 11 ni 12 oct.

---

## 8.5 Consecuencia crítica: Ana R4 baja a UNA sola guardia de quirófano

En v0.2 se concluyó que Ana R4 podía hacer **como máximo 2** guardias `QX-M`:
el jueves 15 y **una** opción del puente de los Santos (30+1 nov, o 31+2 nov).

Con §8ter, Ana R4 tiene `TX` los días 31 oct, 1 y 2 nov. Por H-02 (un puesto por
persona y día), **ambas opciones del puente quedan anuladas**:

- `QX-M` el viernes 30 → H-05 la arrastra al domingo 1 nov → choca con su `TX`. ❌
- `QX-M` el sábado 31 → H-07 la arrastra al lunes 2 nov → choca con su `TX`. ❌

> ### 🔻 **Ana R4 hace exactamente 1 guardia de quirófano en todo el periodo: el jueves 15 de octubre.**

Su carga total queda en: **1 × `QX-M` + el bloque `TX` de FDS-5 + `TX` de días sueltos entre semana.**

### 8.5.1 Impacto en el reparto de `QX-M`

33 slots − 1 (Ana R4) = **32 slots para 6 mayores = 5,33 de media.**

Como Patricia R3 y Candela **no llevan trasplante**, tienen mucha más holgura que
los R4. Reparto sugerido:

| Mayor | `QX-M` sugerido | `TX` | Carga total |
|-------|-----------------|------|-------------|
| Patricia R3 | 7 | 0 | 7 |
| Candela | 7 | 0 | 7 |
| Carlota | 4–5 | ~6 | ~11 |
| Almudena | 4–5 | ~6 | ~11 |
| Sandra | 4–5 | ~6 | ~11 |
| Isa | 4–5 | ~6 | ~11 |
| Ana R4 | **1** | ~7 | ~8 |

---

## 8quater. Segundo punto forzado: `QX-M` del 9 y 11 de octubre

Candidatos a `QX-M` el **viernes 9**: Carlota, Sandra, Isa
*(Almudena 9–11 ❌, Patricia R3 8–12 ❌, Candela 8–9 ❌, Ana R4 ❌)*

Candidatos el **domingo 11**: Sandra, Candela
*(Carlota bloqueada el 11 ❌, Almudena ❌, Patricia R3 ❌, Isa tiene `TX` ese día ❌)*

H-05 exige la misma persona en ambos. Intersección = **{Sandra}**.

> ### 🔻 **Sandra cubre obligatoriamente el bloque `QX-M` viernes 9 + domingo 11.**

Consecuencia: Sandra queda etiquetada como "puente del Pilar" a efectos de H-06 y
**no puede tener ninguna asignación el 31 oct, 1 ni 2 nov** (además ya estaba
bloqueada 29–1).

---

## 8quinquies. Punto de tensión: los días 23–25 (congreso R1)

Los 8 R1 están fuera (H-18). Esos tres días, `QX-P` y `REA` salen **solo de R2 + Tony**.

**Disponibles 23–25:** Tania, Patricia R2, Eva, Emilio, Antonio, Marc + Tony.
*(Asís ❌ 23–25, Ana R2 ❌ 23–25, Fabián ❌ 24–25.)* → **7 personas.**

**Necesidad de personas distintas:**

| Bloque | Personas |
|--------|----------|
| `QX-P` viernes 23 + domingo 25 (H-05) | 2 |
| `QX-P` sábado 24 | 2 |
| `REA` viernes 23 + domingo 25 (H-05) | 1 |
| `REA` sábado 24 | 1 |
| **Total** | **6** |

**7 disponibles para 6 puestos: margen de 1 persona.** Es el punto más frágil del
cuadrante. Cualquier baja imprevista en ese grupo lo rompe.


---

## 9. Aritmética de verificación

El agente debe validar estos balances antes de dar un cuadrante por bueno.

### 9.1 Puesto `QX-M` — 33 slots
7 mayores. Con Ana R4 limitada a 2 → **~5,2 guardias/mayor**. ✅ Coherente con S-01.

### 9.2 Puesto `REA` — 33 slots
Pool: Fabián, Tony + 8 R2 = 10 personas.
H-11 consume 4 × 6 = **24 slots**. Quedan **9** para repartir entre los 7 R2 restantes.
✅ Holgado.

### 9.3 Puesto `QX-P` — 66 slots
✅ Q-03 resuelta: lo cubren R1 **y** R2.

- Objetivo declarado R1: **3–4 guardias cada uno** + 1 FDS → 8 × 3,5 ≈ **28 slots**
  (más el extra de Miriam, 🔴 cifra truncada — Q-13).
- Resto para R2: 66 − 28 ≈ **38 slots**.

### 9.3.1 ⚠️ Asimetría de carga R1 / R2

| Año | `QX-P` | `REA` | **Total** | Por persona |
|-----|--------|-------|-----------|-------------|
| R1 (8) | ~28 | 0 | ~28 | **~3,5** |
| R2 (8) | ~38 | 21 | ~59 | **~7,4** |

**Los R2 harían el doble de guardias que los R1.** Es lo contrario de lo habitual
(el R1 suele ser el que más guardias hace). Puede ser deliberado — R1 recién
incorporados, congreso, curva de aprendizaje — pero conviene confirmarlo, porque
es la palanca más grande que tiene el cuadrante. 🔴 Q-14.

### 9.4 Puesto `TX` — 33 slots
✅ Q-02 resuelta: **solo los 5 R4**.

- Fines de semana agrupados (H-15): 12 días (2+3+2+2+3), uno por R4.
- Días entre semana: 21 → **4,2 por R4**.
- **Total ≈ 6,6 `TX` por R4**, encima de sus ~4–5 de `QX-M`.

### 9.5 Fines de semana
5 fines de semana × 5 puestos × (2 a 3 días) = **50 a 60 slots de fin de semana**
para 25 residentes → **~2 a 2,4 asignaciones de fin de semana por persona.**
✅ H-13 (mínimo 1 FDS cada uno) es holgadamente factible.

---

## 10. Formato de salida esperado

El agente debe producir:

1. **Tabla diaria** — una fila por día, columnas: Fecha · Día · Festivo ·
   `TX` · `REA` · `QX-M` · `QX-P 1` · `QX-P 2`.
2. **Tabla por residente** — filas: residente; columnas: días 1–33; celdas con
   el código de puesto, `L` para libranza post-guardia, `V` para vacaciones,
   `EXT` para trabajo externo.
3. **Resumen de carga** — por residente: nº total de guardias, nº por puesto,
   nº de fines de semana, puente asignado (Pilar / Santos / ninguno).
4. **Informe de validación** — checklist de H-01 a H-13 con ✅/❌, y grado de
   cumplimiento de S-01 a S-07.
5. **Log de excepciones** — toda regla blanda relajada, con justificación.

Formato preferente: hoja de cálculo (`.xlsx`) con una pestaña por bloque.

---

## 11. 🔴 Decisiones pendientes

| ID | Pregunta | Estado | Impacto |
|----|----------|--------|---------|
| **Q-01** | Vacaciones y bloqueos de la plantilla | ✅ **RESUELTA** (§8bis) | — |
| **Q-02** | ¿Quién cubre `TX`? | ✅ **RESUELTA**: solo los 5 R4 | — |
| **Q-03** | ¿Los R2 hacen `QX-P`? | ✅ **RESUELTA**: sí | — |
| **Q-06** | Cuál Patricia es cuál | ✅ **RESUELTA**: Patricia R2 = cupo REA; Patricia R3 = mayor de quirófano | — |
| **Q-04** | ¿"UCQ" y "REA" son el mismo puesto? | ⚠️ Asumido que sí | Medio |
| **Q-05** | En puentes: quien hace el sábado, ¿**trabaja** el lunes festivo (H-07) o **libra** (H-04)? | ⚠️ Asumido H-07 | **Alto** — afecta a 2 de 5 FDS |
| **Q-07** | ¿La `TX` genera libranza al día siguiente? / ¿el saliente de guardia impide `TX` al día siguiente? | ✅ **RESUELTA**: `TX` en *D* no impide guardia presencial en *D+1* si no hay más restricciones (H-14 solo prohíbe `TX` la víspera de una guardia); y el saliente de una guardia presencial (H-03) no impide `TX` al día siguiente, aunque es preferible evitarlo (S-08). | — |
| **Q-08** | ¿Guardias comprometidas o cambios ya pactados? | ✅ **RESUELTA**: sí — Pablo se comprometió con Sandra a `QX-M` sábado 10 + lunes 12 oct. Genera un hueco sin cubrir en `QX-M` viernes 9 + domingo 11 (ver cuadrante de octubre, hoja Validación) porque solo Sandra podía cubrir esa pareja y H-03 le impide encadenarla con el sábado. | Medio |
| **Q-09** | ¿Enlace con el 30 sep y el 3 nov? | ✅ **RESUELTA**: no, no hay enlace. | Bajo |
| **Q-10** | ¿El 22 oct es realmente excepción de `TX` para Ana R4? | ✅ **RESUELTA**: sí, es una excepción real (se usa la lista literal de H-10d, no la fórmula derivada del tipo de turno). | Bajo en octubre, alto para generalizar |
| **Q-11** | Carlota: el *"(si se puede)"* ¿aplica a todo o solo a 23–25? | ✅ **RESUELTA**: solo a 23–25 (2–4 y 11 son bloqueo duro). Carlota prefiere no trabajar los dos puentes; si el cuadrante no cuadra, es negociable quitarle el "si se puede" de 23–25. | Medio |
| **Q-12** | Sandra "29–1": ¿es 29 oct – 1 nov? | ✅ **RESUELTA**: sí. | Medio |
| **Q-13** | **Miriam "puede hacer hasta ___ guardias" — la cifra se cortó.** | ✅ **RESUELTA**: hasta 4–5 guardias `QX-P`. | Medio |
| **Q-14** | ¿Es intencionada la asimetría R1 ~3,5 vs R2 ~7,4 guardias? | ✅ **RESUELTA**: sí, intencionada. R1: 3–4 `QX-P` + 1 FDS cada uno (Miriam 4–5). R2 sin cupo de `REA`: 1–2 `REA` cada uno además de `QX-P`. | **Alto** |
| **Q-15** | El bloque `TX` de fin de semana, ¿empieza el **viernes** o el **sábado**? | ✅ **RESUELTA**: empieza el **viernes** (ver H-15 actualizada). | Medio — cambia 5 slots |
| **Q-16** | David: la lista de bloqueos empieza con una coma suelta. ¿Falta una fecha? | ✅ **RESUELTA**: no falta nada; la coma es un resto de una entrada borrada. Bloqueo real de David = solo 23–25. | Bajo |

---

## 12. Equidad histórica entre meses (regla de proceso permanente)

Las reglas blandas S-01/S-02/S-04 equilibran la carga **dentro de un mismo mes**.
Eso no basta: un residente puede salir bien repartido en octubre y mal en los
meses siguientes si no se mira hacia atrás. Por eso, desde noviembre 2026 en
adelante:

1. **Antes de generar el cuadrante de un mes nuevo**, consultar la pestaña
   "Histórico de guardias" del Excel de trabajo (tabla resumen por persona:
   fines de semana por Viernes/Sábado/Domingo, `TX` total y desglosado en
   fin de semana/diario, festivos de Madrid cubiertos, total histórico).
2. **Dar prioridad** (más carga en el mes que se está generando) a quien
   tenga **menos guardias acumuladas** en el histórico, dentro de los límites
   que ya imponen las reglas duras H-01 a H-19 de ese mes — el histórico
   ajusta las reglas blandas, nunca relaja una regla dura.
3. **Ampliar el histórico** tras cerrar cada mes: añadir sus filas a la tabla
   en bruto de "Histórico de guardias" (están pensadas para poder añadirse
   sin tocar las fórmulas de resumen, que ya cubren un rango amplio).
4. El histórico de junio–septiembre 2026 se transcribió a mano desde
   calendarios en imagen aportados por Pablo — puede contener errores de
   lectura. Revisar con Pablo antes de usarlo para decisiones de peso.

---

## 13. Metodología y lecciones aprendidas para repartir guardias

Esto no son reglas del servicio — son lecciones de **cómo generar el reparto**
sin repetir errores ya cometidos al hacer el de octubre 2026. Léelas antes de
generar el cuadrante de cualquier mes.

### 13.1 Toda columna "objetivo" es un límite DURO, salvo que se diga lo contrario

La primera versión de octubre trató las columnas "objetivo" de la hoja
"Resumen de guardias" (Total, MAY, Tx, ucq, peq) como referencia blanda, y
optimizó solo por equilibrio relativo. Resultado: R1 acabó en 2-3 guardias,
R2 en 8, y dos R2 con 3 fines de semana — todo dentro de "lo más equilibrado
posible" pero lejos de los números reales que Pablo esperaba (R1 4-5, R2
exactamente 6). **Lección: en cuanto una celda "objetivo" tenga un número o
rango, conviértelo en restricción dura del solver antes de generar nada.**
No esperes a que alguien lo detecte a ojo en el cuadrante ya hecho.

### 13.2 Antes de fijar un número, comprueba la aritmética exacta de plazas

Antes de aceptar un objetivo como "R2 = 6 exacto" o "R1 = 4-5", suma las
plazas totales de cada puesto (`TX`=33, `REA`=33, `QX-M`=33, `QX-P`=66) y
resta lo que ya consumen los cupos fijos (H-11, H-16, MAY de mayores, etc.).
Lo que queda define lo que le toca al resto — y a veces **el número deja de
ser una elección y pasa a estar matemáticamente forzado**. Ejemplo real de
octubre: fijar `REA` de los 4 de cupo en 6 (H-11 + H-20) y `Total` de los 8
R2 en 6 exacto fuerza que `QX-P` de R1 sea **exactamente 39**, no un rango —
y con los R1 bloqueados 3 días por el congreso (H-18), eso a su vez fuerza
que **9 días tengan que llevar 2 R1 juntos en `QX-P`**, aunque S-06 pida
evitarlo. No es un fallo del generador: es aritmética. Verifícala tú antes
de prometer un número a Pablo, para poder avisar del conflicto de antemano
en vez de descubrirlo después de generar el cuadrante.

### 13.3 Ante un conflicto real entre una regla dura numérica y una blanda, no lo resuelvas tú solo

Cuando un objetivo duro (tipo H-20) y una preferencia (tipo S-06) resultan
incompatibles, no elijas cuál sacrificar por tu cuenta. Pasos:
1. Calcula el mínimo de violaciones **forzado** por aritmética (como en 13.2).
2. Confírmalo resolviendo el modelo con esa regla blanda puesta a un peso muy
   por encima de las demás (×100 o más) — si el resultado no mejora, el
   mínimo es real, no un artefacto de cómo estaban repartidos los pesos.
3. Presenta el conflicto a Pablo con el número exacto y qué reglas concretas
   chocan, y pídele que elija qué relajar. Nunca lo decidas por él.

**Precedente resuelto (octubre 2026):** ante el conflicto H-20 (R2 exacto 6)
vs. S-06 (evitar 2 R1 juntos en `QX-P`), con un mínimo forzado de 9 días,
Pablo decidió el 2026-08-19 mantener R2 en 6 exacto y aceptar los 9 días
como excepción documentada — no relajar H-20. Ver la excepción anotada en
la fila S-06 de §7. Aplica el mismo criterio por defecto en meses futuros
si vuelve a aparecer el mismo conflicto, salvo instrucción contraria.

### 13.4 Los bloqueos colectivos (congresos, festivos, puentes) reducen la capacidad disponible, no solo bloquean días sueltos

El congreso de R1 (23–25 oct) no es solo "esos tres días sin R1" — es una
reducción real de cuántos días tienen para repartir su carga total, lo que
puede forzar solapamientos en otros sitios (ver 13.2). Cada mes, antes de
fijar objetivos numéricos, identifica estos bloqueos colectivos y recalcula
la capacidad real disponible, no asumas que es igual al nº de días del mes.

### 13.5 Verificación final: nunca declares un cuadrante bueno sin comprobación programática exhaustiva

Cada vez que se ha pedido "revísalo bien, no puedo permitirme fallos", la
única respuesta válida ha sido re-parsear el Excel real (no confiar en el
resultado cacheado del solver) y comprobar, una por una, TODAS las reglas
H y las aclaraciones dadas por Pablo en el chat — no solo las que parecen
relevantes al cambio reciente. Un cambio en un sitio (p. ej. H-20) puede
romper silenciosamente algo ya validado en otro (S-06). Repetir esta
comprobación completa después de cualquier cambio, no solo la primera vez.

---

## 14. Registro de cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 0.9 | 2026-08-19 | Resuelto el conflicto S-06 vs. H-20 detectado en la v0.8: Pablo decide mantener R2 en exactamente 6 guardias (H-20 sin relajar) y aceptar como excepción documentada los 9 días con 2 R1 juntos en `QX-P`, que era el mínimo matemáticamente forzado. Anotado en la fila S-06 (§7) y como precedente en §13.3, para aplicar el mismo criterio en meses futuros si reaparece el mismo conflicto. |
| 0.8 | 2026-08-18 | Añadido §13: metodología y lecciones aprendidas para repartir guardias (no son reglas del servicio, son cómo generar el reparto sin repetir errores) — tratar las columnas "objetivo" como límite duro por defecto, comprobar la aritmética exacta de plazas antes de fijar un número, cómo tratar un conflicto real entre regla dura numérica y regla blanda (calcular el mínimo forzado, confirmarlo con el peso al máximo, y que decida Pablo), que los bloqueos colectivos reducen capacidad real no solo bloquean días sueltos, y repetir la verificación completa tras cualquier cambio. Motivado por el conflicto real detectado entre H-20 (R2 exactamente 6) y S-06 (evitar 2 R1 juntos en PEQ), que resultó ser matemáticamente forzado a un mínimo de 9 días, no un fallo del generador. |
| 0.7 | 2026-08-18 | Nuevas reglas duras H-20 y H-21: topes de guardias totales por año como número concreto (R1 4-5, R2 exactamente 6, R3 máximo 6, R4 sin tope) y máximo 2 fines de semana por persona dentro de R2. Antes esto solo existía como columna "objetivo" en el Excel, no como regla escrita aquí, y el generador no lo trataba como límite duro — causó que la primera versión de octubre saliera con R1 en 2-3, R2 en 8, y a Eva/Antonio con 3 fines de semana. |
| 0.6 | 2026-08-10 | Sincronizadas con las respuestas ya dadas en la pestaña "Preguntas pendientes" del Excel: Q-08 (compromiso con Sandra, genera hueco en MAY 9+11 oct), Q-09, Q-10, Q-11, Q-12, Q-13, Q-14 y Q-15 resueltas. H-15 actualizada: el bloque de TX de fin de semana empieza el viernes (antes se asumía sábado) — la tabla forzada de §8ter/§8quater queda marcada como obsoleta. Añadido §12: regla permanente de equidad histórica entre meses, apoyada en la nueva pestaña "Histórico de guardias" (transcripción de junio–septiembre 2026). Añadidos al roster (fuera de la plantilla activa de octubre, "en el radar"): María y Gerard (R4), David, Paulali, Paula Durán e Inma (R3, elegibilidad de subtipo sin confirmar). |
| 0.5 | 2026-08-10 | Corregida la matriz de elegibilidad (§5): Tania y Patricia R2 NO hacen `QX-P`, solo `REA` (antes se asumía que los 8 R2 hacían `QX-P`). Añadido §5.1: principio de proceso — la elegibilidad varía cada mes, el agente debe pedirla explícitamente para cada mes nuevo en vez de reutilizar la anterior. |
| 0.4 | 2026-08-09 | Tres aclaraciones del servicio: (1) S-06 reformulada — evitar dos R1 juntos en `QX-P` el mismo día, no solo repetición de pareja; (2) nueva regla blanda S-08 y nota en H-03 — `TX` el día de saliente de guardia está permitido pero es preferible evitarlo; (3) nueva regla dura H-19 — el día previo a un bloqueo por vacaciones se permite guardia presencial pero no `TX`. Q-07 marcada como resuelta. |
| 0.1 | 2026-08-09 | Redacción inicial. Roster, calendario, reglas H-01…H-13 y S-01…S-07, restricciones de Ana R4, aritmética y 9 decisiones pendientes. |
| 0.3 | 2026-08-09 | Resueltas Q-01, Q-02, Q-03 y Q-06. Añadidos bloqueos de los 25 residentes (§8bis) y nuevas reglas H-14 a H-18. **Demostrado que la asignación de `TX` de fin de semana es única y forzada** (§8ter) y que, en consecuencia, **Ana R4 baja a 1 sola guardia de quirófano** (§8.5). Detectado un segundo punto forzado: Sandra en `QX-M` 9+11 oct (§8quater). Identificado el cuello de botella del congreso R1 (§8quinquies) y la asimetría de carga R1/R2 (§9.3.1). Nuevas preguntas Q-11 a Q-16. |
| 0.2 | 2026-08-09 | Incorporado el parte oficial de guardias externas de Ana R4 (§8.0) con tipo de turno. Resuelta la ambigüedad de las dos Anas (§3.1). Detectada la correlación entre turno `MT`/`24(T2)` y el régimen de excepciones de H-10d; propuesta formulación generalizable (§8.1.1). Nueva pregunta Q-10 (anomalía del 22 oct). Añadidos pesos sugeridos a las reglas blandas. |
