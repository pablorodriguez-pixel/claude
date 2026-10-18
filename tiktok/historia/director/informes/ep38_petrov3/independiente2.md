# ep38 Petrov v3 (segunda revisión) — VEREDICTO: ARREGLAR  (75/100)
Exposición estimada: banda C, con techo en B. Se parece a Einstein y Semana en factura y claridad, pero el tema sigue siendo «historia de otros», como SOS. Lo que lo puede sacar de la C es el «wow» compartible («te salvó la vida»), no el debate.
Director independiente. No he leído informe.md. He medido con medir.py y he mirado los fotogramas cada 0,5 s (0–76,5 s) y a tamaño grande en 46,2 s y 72,6 s.

## Qué se ha arreglado (comprobado en imagen)
- Contradicción de «avisar»: RESUELTA. L5 dice «Si daba la alarma, sus jefes podían responder…» y L6 «cogió el teléfono y les dijo a sus jefes: «Es una falsa alarma»». En pantalla (45,5–46,5 s) se ven la etiqueta «A SUS JEFES:» y el bocadillo. Ya no queda la duda de si avisó o no. P11 ✅.
- P5: la promesa se paga a los 6,8–10,0 s («paró una guerra nuclear sin levantarse de la silla»). ✅
- «Era el sol» ya no destripa: el rótulo de la escena es «La verdad» y «¡ERA EL SOL!» entra a los 50,0 s, cuando lo dice la voz. ✅
- «Manda cientos» va unido a la frase anterior. La medalla del Ojo (55,5 s) entra entera en el encuadre. ✅

Puertas: P1 ✅ · P2 ⚠️ (dispensada: tema de la cola de «historias con drama» que aprobó el usuario; le pone techo a la nota) · P3 ✅ (3,0 s, «tú», no destripa) · P4 ✅ (miniatura: «¿TE SALVÓ LA VIDA?» + MISIL gigante, se lee a 150 px) · P5 ✅ · P6 ✅ con matiz · P7 ✅ (SNR 28 dB, -14,1 LUFS) · P8 ✅ · P9 ✅ · P10 ✅ · P11 ✅
- Queda una arruga en P11, que no la suspende: la pregunta final dice «¿dar la alarma, o colgar?», pero Petrov ni dio la alarma ni colgó: llamó y dijo que era falsa. «Colgar» no es lo que hizo, y la imagen (una mano en el auricular) se puede leer como «coger». Hay que arreglarlo.
- Ojo: 6,64 s (el límite es 6 s).

Puntuación: Tema 14/25 · Gancho+portada 17/20 · Retención 17/20 · Conversación 12/15 · Chispa 11/15 · Factura 4/5 → 75

Storytelling y ritmo:
- Se cuenta de corrido, con conectores («y en», «Y a medianoche», «Pero pensó», «Así que», «Y tres»), y en orden causal. Ya no va a trompicones. Se cumple la plantilla Napoleón: gancho → respuesta en una frase (L1) → marca → «en tres momentos» → Uno/Dos/Tres → Ojo → «O sea» → pregunta + «Os leo».
- Lo único telegráfico que queda es «misil. Luego, otro. Hasta cinco.» (26,9–30,7 s). Es un golpe dramático y cada trozo aguanta unos 1,5 s en pantalla. Se tolera.
- Las tarjetas de capítulo («La alarma», «La decisión», «La verdad») marcan bien el bucle. La de «Y tres» (47,0–47,9 s) pasa casi 1 s en amarillo vacío, con un «3» apenas visible.
- Lo que falta es CHISPA. El Vecino cuenta bien, pero casi no opina. Solo hay dos frases citables («sin levantarse de la silla» y «la bronca por el papeleo») y ningún remate tuyo. Por esto se queda en 75 y no en 80.

Abogado del diablo: es una buena historia contada por un narrador correcto, no por el Vecino. Quien llega al final no tiene una frase que repetir ni una pregunta que le toque. «¿Dar la alarma o colgar?» se contesta con una palabra o no se contesta, porque «colgar» no es lo que hizo Petrov.

Fugas de retención:
- 10,5–16,8 s: marca (3,1 s) y bucle (2,8 s) sin nada nuevo. Es lo que pide la plantilla y ahora va DESPUÉS de pagar la promesa, así que duele menos. A 2,4–3,2 pts/s, sigue siendo la mayor fuga. No se toca.
- 18,5–24,7 s (L4): militar soviético + satélites, contexto puro (~1,2 pts/s). Lo sostiene el cambio de plano cada ~1,5 s. No hay arreglo barato.
- 47,0–47,9 s: la tarjeta amarilla de «Y tres» está casi vacía. Arreglo: que «③ La verdad» y «¡TENÍA RAZÓN!» entren en K.y7 (47,02 s) y no 0,5–1 s después.
- 55,5–62,1 s: Ojo de 6,64 s. Arreglo: L8 nueva (abajo, ~5,3 s).
- 69,7–73,5 s: pregunta final (~2 pts/s), con la ambigüedad de «colgar». Arreglo: L10 nueva.

Edición propuesta (ordenada por impacto/coste):
  1. [voz, ~75 caracteres] L10: «¿Tú qué habrías hecho en su silla: creerte la pantalla, o creerte a ti? Os leo.»
     Es justo el dilema que tuvo Petrov, no contradice nada y pide una respuesta personal. Titular en pv_scenes_b.js:366: «¿Creerte la pantalla… o *a ti*?».
  2. [voz, ~100 caracteres] L9, con chispa y con el gancho que vuelve: «O sea: ese señor te salvó la vida, y el mundo no se enteró hasta quince años después… y tú, hasta hoy.»
     Cierra el «nunca has oído hablar» del segundo 0 y es la frase de bar.
  3. [voz, ~90 caracteres] L8 (Ojo ≤ 6 s): «Ojo: no le dieron ni una medalla. Según contó él, le cayó una bronca por el papeleo de esa noche.»
  4. [visual, gratis] pv_scenes_b.js:150: el sello «FALSA ALARMA» (size 96) se sale por el borde derecho a los 46,0–46,5 s. Bájalo a size ~76 y céntralo para que quede entero entre x 60 y 1020.
  5. [visual, gratis] pv_scenes_b.js:366: el titular de la pregunta (y 236, size 92) monta su segunda línea («colgar?») sobre el marco del monitor. Súbelo a y ~170 o baja el monitor 60 px.
  6. [visual, gratis] Tarjeta de «Y tres» (47,0 s): que el contenido entre con la voz, sin el segundo en amarillo vacío.
  Son unos 265 caracteres de voz (3 líneas, sin tocar el resto) más 3 cambios visuales.
  Con 4–6: ~76. Con 1–6: Tema 14 · Gancho 17 · Retención 18 · Conversación 13 · Chispa 13 · Factura 5 → ~80. Compensa: el arreglo es barato y es lo único que separa el vídeo del listón.

Chispa (alternativas del Vecino):
  - «… y tú, hasta hoy.» (cierre de L9, ver arriba)
  - «Salvó el mundo, sí, pero el formulario lo rellenó mal: funcionarios, los mismos en todas partes.» (variante del Ojo, solo si cabe en ≤ 6 s)
  - «La próxima vez que te quejes de tu jefe, acuérdate de los de Petrov.» (para el post o para las respuestas)

Publicación:
  Post: «Una pantalla dijo MISIL cinco veces y un señor decidió no creérsela. Gracias a eso estás leyendo esto.» #historia #guerrafria #curiosidades #nolosabias
  Comentario fijado: «Pantalla en rojo, cinco misiles y minutos para decidir. ¿Tú te habrías fiado de la máquina o de tu instinto? 🎩👇»

Precisión (a verificar antes de publicar): «a medianoche» (fue poco después de medianoche del 26/09/1983, hora de Moscú); «el sol reflejado en las nubes» (es la explicación aceptada); «quince años después» (se supo en 1998); lo de la medalla y la bronca va con «según contó él», y está bien así. «Paró una guerra nuclear» (L1 y el rótulo de los 7,5 s) es el relato habitual («el hombre que salvó el mundo»), pero había más gente en la cadena de mando. Como gancho se acepta; en el post y en las respuestas, mejor «evitó que se diera una alarma nuclear».
