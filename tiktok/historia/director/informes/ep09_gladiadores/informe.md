# Ep09 Gladiadores (final.mp4, 64,7 s) — VEREDICTO: DESCARTAR tal cual → RECONVERTIR en corte corto «👎» (53/100)

Exposición estimada: banda C, con riesgo de D. Se parece a **Vikingos (≈52, 1,2 mil)**: tiene la misma estructura, «las películas y un artista del siglo XIX te mintieron sobre gente de hace 2.000 años». Es historia de otros. No dice al espectador que algo SUYO es falso, aunque podría hacerlo, porque el 👎 lo usa cada día.

Puertas:
- P1 ✅ por los pelos. Lo del pulgar no está quemado. Lo de que «no siempre morían» sí lo sabe mucha gente.
- **P2 ❌ (3/5).** (a) vida diaria: ½, porque usa el gesto pero el vídeo no se lo recuerda. (b) le dice que se equivoca: ✅. (c) comprobable en el momento: ❌. (d) España y Latinoamérica: ✅. (e) debate: ½.
- **P3 ❌.** El gancho dura 5,07 s (máx. 3,5). No hay «tú» (medir.py: gancho_apela_a_ti = false). Y se rebaja él solo: suelta «¡no significaba mátalo!» a los 2,3 s y en 2,7–5,2 s se echa atrás con «O, por lo menos, no lo sabemos». La primera palabra es «El» y el tema llega en la segunda («pulgar»): vale.
- **P4 ❌.** El fotograma 0 es una AFIRMACIÓN y no una pregunta. Además, en `miniatura_perfil.jpg` el recorte 3:4 (y ≥ 240) corta la primera línea, «El pulgar abajo». El puño gigante sí funciona y ya está en movimiento.
- P5 ✅. La promesa se paga en 13,5–15,3 s («no dicen hacia dónde»).
- P6 ✅. Los datos cuadran con lo conocido: el *verso pollice* de Juvenal (Sát. III), el *Pollice verso* de Gérôme (1872) y Augusto prohibiendo los combates *sine missione* (Suetonio, Aug. 45). En pantalla no hay ninguna cifra discutible.
- P7 ✅. Voz -16 LUFS, música -20 LU, SNR 28,3 dB y final -14 LUFS. La línea 0 va con [excited].

Puntuación: Tema 10/25 · Gancho+portada 11/20 · Retención 13/20 · Conversación 6/15 · Chispa 9/15 · Factura 4/5 = **53/100**

Abogado del diablo: es un documental de Roma bien dibujado. Pasados 5 s no hay nada que sea del espectador, y en el s 23,9 («Y hay más») cambia de tema y se pasa al mito más gastado («no siempre morían»). La segunda mitad son 27 s de enciclopedia que el algoritmo va a castigar.

Fugas de retención:
- 2,7–5,2 s (L0) — «O, por lo menos, no lo sabemos» rebaja la afirmación justo cuando se va el 40 %. — Quitarla del gancho. La duda ya va pagada en L2 («no dicen hacia dónde»).
- 9,2–23,6 s (L2+L3) — 14,4 s seguidos de contexto: un término latino, un año y un pintor francés. A ~1,2 pts/s son ~17 pts. L3 dura 7,98 s. — Quitar «de Jean-Léon Gérôme» de la voz (que se quede en el sello) y meter el puente al espectador (ver edición 1).
- 23,9–27,6 s (L4) — «Y hay más» es una promesa nueva cuando la del gancho ya está pagada: aquí se va la gente que ya tiene su respuesta. — Cortar el vídeo aquí (reconversión).
- 27,9–35,6 s (L5) — 7,65 s de lista de gastos, la línea más documental. — Sale con el corte.
- 44,3–51,2 s (Ojo) — dura 6,91 s (máx. 6) con un solo decorado (lápida + cartel). — Sale con el corte. Si se conservara, partirla en dos planos.
- 51,5–55,4 s — el cartel «★ TU MARCA AQUÍ ★» encima del podio parece una plantilla que se olvidó quitar, y habrá comentarios diciéndolo. — Si se conserva: «★ PATROCINA: EL EDITOR ★».
- 51,5–60,1 s (L9) — dura 8,62 s y junta remate + «¿Te lo creías? Sí o no», a ~2 pts/s. Es una pregunta cerrada que no da conversación. — Cambiarla por la pregunta abierta que YA está grabada en la v1.

Edición propuesta (ordenada por impacto/coste):
  1. [voz + montaje] **RECONVERTIR en un corte de ~33 s solo sobre el pulgar.** Se reutiliza el audio que ya existe y solo se graban 2 líneas nuevas (~130 caracteres):
     - NUEVA L0 (≤ 3,5 s): «Pulgar abajo: ningún romano te dijo que significara "mátalo".» Lleva el tema primero, «te» y contradicción, y la duda pasa a L2.
     - L1 actual 5,47–8,92 s «Ese gesto te lo enseñó un cuadro. No los romanos.»
     - L2 actual 9,22–15,31 s (pollice verso).
     - L3 actual 15,59–23,57 s (cuadro 1872 + cine). Si se puede, cortar en la voz «de Jean-Léon Gérôme» (19,80–21,45) y dejar el nombre solo en el sello.
     - NUEVA remate: «O sea: ese pulgar tiene más de Hollywood que de Roma.»
     - Pregunta de la v1, que ya está grabada en `v1_lines.json`, L11 60,65–64,11 de la voz v1: «¿Qué película de romanos te has creído entera? Os leo.» Es abierta y personal, y gasta 0 créditos.
     - Marca L10 actual 60,40–64,06 s y bucle al fotograma 0.
     La segunda mitad (L4–L8, «no siempre morían») se guarda para un vídeo-respuesta cuando alguien comente «pero los mataban igual».
  2. [visual] **Portada (fotograma 0) en forma de pregunta:** «¿Pulgar abajo = "mátalo"?» (4 palabras). Bajar el recuadro del título para que empiece en y ≥ 280 px y no lo corte el recorte del perfil. El puño se queda gigante y bajando.
  3. [visual] En la nueva L0, un 👎 tipo emoji de chat al lado del puño de grabado, para que el espectador vea SU gesto (sube P2-a sin decir nada que no se pueda demostrar).
  4. [visual] Si por calendario se publicara la versión larga a pesar del veredicto: cambiar «TU MARCA AQUÍ» por «PATROCINA: EL EDITOR», partir el Ojo (44,3–51,2 s) en dos planos y poner la pregunta de la v1. Eso la sube a ~60, que sigue estando por debajo del listón.

Chispa (voz del Vecino):
- «Ese pulgar no es romano: es de atrezo.»
- «Pulgar abajo te lo enseñó Hollywood, no Juvenal.» (lo de que *Gladiator* (2000) usa el gesto está a verificar antes de nombrarla)
- Para el futuro vídeo-respuesta: «Un gladiador muerto era una inversión tirada a la arena.»

Publicación (para el corte reconvertido):
- Post: «¿Pulgar abajo = "mátalo"? Ningún texto romano lo dice. Te lo enseñó un cuadro de 1872 👎🎩 #historia #roma #mitos #sabiasque»
- Comentario fijado: «¿Qué escena de película de romanos te creíste entera? Os leo 🎩👇» (sustituye a «¿Qué otro gesto…?», que no es personal).

Si DESCARTAR: no publicar `final.mp4` tal cual. Sacar Gladiadores de la cola de `PUBLICAR_pendientes.txt` hasta que exista el corte de ~33 s, que tiene que volver a pasar por el director (el objetivo realista es banda B baja). La parte de «no siempre morían» (L4–L8) se convierte en un vídeo-respuesta de 25–35 s si sale ese comentario. Si no sale, se tira.
