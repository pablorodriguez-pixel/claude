# ep39 Siesta v3 — VEREDICTO: ARREGLAR  (73/100)
Director independiente (no he leído informe.md). Medido con medir.py y revisado fotograma a fotograma cada 0,5 s.

Exposición estimada: banda B (se parece a Hora/Semana: algo cotidiano y español-latino que el espectador acepta sin pelear; le falta el «me lo dices a MÍ y me escuece» de OK/Napoleón).

Puertas: P1 ✅ P2 ✅ (4/5, justo) P3 ✅ P4 ✅ P5 ✅ P6 ✅ (con aviso) P7 ✅ (27,8 dB) P8 ✅ (justo) P9 ✅ P10 ✅ P11 ✅ (con un fallo de lógica en el bucle)
- P1, aviso: «siesta viene de sexta» es una curiosidad que circula bastante en España. No está quemada, pero una parte dirá «ya lo sabía». K3 = 1.
- P2, aviso: falla la (b). Nadie cree lo contrario de «siesta es un número», así que no hay nada que contradecir. El «estás equivocado» solo aparece en el remate (las 15:30).
- P6, aviso: «si el sol sale a las seis, la sexta cae justo a las doce». Es correcto, porque la sexta es la hora que TERMINA a mediodía, y la imagen lo cuenta bien (I con el reloj a las 7… VI = 12:00). Aun así, habrá comentarios de «6, 7, 8, 9, 10, 11: eso son las once». Esto da conversación, no es un error. Pero el «Ojo» actual no lo desactiva.
- P8, justo: el remate (12:00 contra 15:30) es personal y tiene gracia, pero el dato «VI = 12:00» ya salió sellado en el s 28. En el s 44 se repite con un chiste encima. Está al nivel del gancho, no por encima.
- P11, fallo de lógica: el bucle pregunta «¿por qué una hora se llamaba sexta?», pero el paso 3 responde a otra pregunta (cómo pasó de hora a siesta). Además, en el s 11 el espectador ya sabe que era «la hora sexta», así que la pregunta suena a repetida.

Puntuación: Tema 17/25 · Gancho+portada 15/20 · Retención 15/20 · Conversación 11/15 · Chispa 11/15 · Factura 4/5 = 73

Lo que está bien (y no se toca):
- Ritmo: aquí NO va a trompicones. Hay frases completas con conectores («sino», «si…», «así que»), 11 líneas, una media de 5,3 s, ppm 172 a tempo 1,0, y el plano cambia cada 1–2 s (templo → reloj tachado de noche → amanecer → reloj de sol que va contando I, II, III). La plantilla Napoleón se cumple paso a paso.
- Se puede leer: cada línea tiene su titular arriba («Contaban desde el amanecer», «La sexta = las 12 del mediodía») y aguanta ≥ 1,5 s.
- La pantalla partida del s 47–51 («La de verdad 12:00» contra «La tuya 15:30») es lo mejor del vídeo: se entiende sin audio.
- El emú (s 31,5–32,5) sale a tiempo y no molesta. La pregunta final es personal (la hora) y hay bucle al fotograma 0.

Abogado del diablo: es una etimología, no una historia. No hay nadie que quiera algo ni ningún conflicto. Quien ya sabía lo de «sexta» se va en el s 4–7, que es justo donde se lo das, y quien no lo sabía ya está pagado en el s 7. Desde ahí solo le queda la clase de horas romanas (15–29 s) y un «Ojo» que no añade nada.

Fugas de retención:
- 3,5–7,4 s — la respuesta llega pegada al gancho (gap 0,35) y el «número» se paga enseguida — subir gap_after de L0 a 0,6 para que «número» respire con el VI en pantalla.
- 7,9–11,0 s — marca temprana, 3,1 s a 2,4–3,2 pts/s (unos 8–10 pts) — la plantilla la permite. No se toca, pero que nadie la alargue.
- 11,4–14,7 s — la pregunta del bucle repite lo que ya se sabe (no hay hueco nuevo) — reescribir L3 (abajo).
- 15,1–23,1 s — L4, 8,0 s de contexto (horas romanas), a ~1,2 pts/s — los planos cambian bien. Aguanta porque cuenta «la primera, la segunda…». No se toca.
- 39,4–44,5 s — «Ojo» de 5,1 s SIN información nueva (el sello de la RAE es autoridad, no un dato). Es la fuga más cara y la más barata de arreglar.
- 44,5–45,3 s — cortinilla marrón casi vacía antes de «La de verdad» — que entre la tarjeta en el s 44,6.

Edición propuesta (ordenada por impacto/coste):
  1. [voz] L7, el «Ojo» con un dato de verdad (unos 100 caracteres, una línea): «Ojo: las horas romanas cambiaban de largo con las estaciones, pero la sexta siempre acababa a mediodía.» Desactiva el «eso son las once», aporta el «ahhh» y deja la precisión blindada (a verificar: horae temporales; la sexta acaba en meridies). El sello «REAL ACADEMIA» se pasa al plano de L1 (s 4–5, tarjeta «SIESTA ← lat. sexta»), que ya tiene el diccionario.
  2. [voz] L8, remate MÁS fuerte que el gancho, que cierre el bucle del «número» (unos 130 caracteres): «O sea: si te la echas a las tres y media, para un romano eso ya no es la sexta… es la décima. Lo tuyo no es una siesta: son décimas.» Con el sol a las seis, 15:00–16:00 es la hora X (a verificar con esa misma simplificación). Visual: se mantiene la pantalla partida 12:00 | 15:30 y se añade el sello «X» rojo sobre «La tuya». El juego con «tener décimas» es la frase de bar. Si se prefiere no tocar la voz, el actual «llegas tarde hasta a la siesta» aprueba P8 por los pelos.
  3. [voz] L3, el bucle (unos 50 caracteres): «¿Y cómo acaba un número siendo tu siesta? En tres pasos.» Así la pregunta encaja con los tres pasos y renueva el hueco.
  4. [visual] Portada: las «zZ» del Vecino tapan la V, y en la miniatura de 150 px se lee «ZVI». Hay que sacarlas encima del sombrero, a la izquierda, y apartar el «?» rosa del borde de la V.
  5. [voz/tiempos] gap_after 0,6 en L0 y 0,5 en L3 (sin gastar créditos, solo con regenerar los tiempos).
  6. [visual] Que la tarjeta «La de verdad» entre en el s 44,6 (quitar los 0,7 s de fondo marrón vacío).
  7. [voz, opcional] «te LO echas» (el «lo» va con «número») suena raro al oído porque se espera «te la echas». Solo hay que tocarlo si se regenera L0 por otro motivo. Si se hace, que conserve la energía [excited].
Las ediciones 1+2+3 son unos 280 caracteres de ElevenLabs. Merece la pena: suben Retención (+2), Chispa (+3), Conversación (+1) y P8 pasa de justo a claro. Con 4–6 añadidos, la nota estimada es 79–81. Hay que volver a pasar el director tras el render.

Chispa (remates alternativos, con la voz del Vecino):
- «Lo tuyo no es una siesta: son décimas.»
- «Los romanos se echaban la siesta con un reloj de sol. Tú tienes despertador… y aun así llegas tarde.»
- «Cada vez que dices "me voy a echar la siesta", estás diciendo "me voy a echar la sexta". En latín, pero lo dices.»

Publicación:
- Post: «Tu siesta tiene nombre de número… y casi seguro que te la echas tarde. #siesta #historia #curiosidades #latin»
- Comentario fijado: «Sé sincero: ¿a qué hora te echas tú la siesta y cuánto te dura de verdad?»
