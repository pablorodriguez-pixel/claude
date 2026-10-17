# ep23 «El Vecino responde: ¿AC?» (vídeo-respuesta, experimento 3) — VEREDICTO: ARREGLAR (79/100 → 81 con dos arreglos visuales baratos)

Revisión INDEPENDIENTE (modo VÍDEO). He escrito esta nota sin leer el `informe.md` del animador. Para no sobrescribir sus frames, la medición la he hecho aparte con los mismos comandos de `director/medir.py`: fotogramas 0/0,5/1/2/3/5 s, miniatura de perfil, hoja cada 2 s, hojas densas cada 0,5 s (0–36 s), 10 fotogramas a tamaño completo y una tira del borde superior cada 0,25 s. Vídeo: `final.mp4`, 1080×1920, 30 fps, 34,13 s (voz 33,51 s).

Exposición estimada: banda C, con techo en B. Se parece a OK (banda A) porque es su secuela y la pegatina enlaza con él. Pero el que no vio OK no tiene la duda, y el que la vio ya sabe la mitad. Ningún vídeo-respuesta está calibrado todavía: este es el que lo medirá.

Puertas: P1 ✅ · P2 ✅ (4/5, como en guion) · P3 ✅ (adaptada a respuesta) · P4 ✅ · P5 ✅ · P6 ⚠️ · P7 ✅
- P3, nota: el gancho («¿Bien escrito sería A, C?») dura 1,6 s y es la frase del comentario, como pide COMUNIDAD v3.1. No dice «tú» y el «Sí» llega en el s 1,9, pero «Y es aún más absurdo» (2,9–4,3 s) reabre el hueco. Para el formato respuesta, vale.
- P6 ⚠️ (no bloquea, pero hay que arreglarlo): en 28,2–30,3 s salen tres «comentarios» con @usuario inventados (@lucia.mz «¿Y "guay"?», @nico_rr «"Chévere" me huele raro», @marta.vla «¿"Vale"?»). En un vídeo que se apoya en un comentario REAL, parecen reales. Además insinúan que guay, chévere y vale tienen una historia rara, y eso no lo hemos comprobado. Arreglo: quitar las @ y los avatares, o dejarlos como bocadillos sin nombre. Los datos del guion (oll korrect, Boston Morning Post, O.W. = oll wright, Van Buren / Old Kinderhook) coinciden con la verificación de `guion.md`, y en pantalla no sale ninguna cifra dudosa.
- P7 ✅ medido por mí sobre `final.mp4`: −14,1 LUFS integrados, pico real −1,7 dBFS, LRA 4,3. `mix_report`: SNR voz/música 27,9 dB (≥ 20). El gancho no va flojo: la L0 está a −17,8 LUFS y el cuerpo a −18,3. Los efectos y la música son los reales de ElevenLabs: están en `engine/el_sfx` (los 17 nombres de `sfx.json`, sin que falte ninguno) y en `engine/el_music/ragtime.wav`, y se crearon a las 17:30, antes que `final.mp4` (17:31).

Puntuación: Tema 20/25 · Gancho+portada 16/20 · Retención 17/20 · Conversación 11/15 · Chispa 12/15 · Factura 3/5 = **79**

- **Tema 20.** Lo mismo que en guion: palabra diaria, duda real de la audiencia (75 me gusta), pero es una secuela con un solo dato nuevo (O.W.).
- **Gancho+portada 16.** El fotograma 0 se entiende en la miniatura de 150 px: tarjeta del comentario + bloques O y K con «?» + flecha a «A.C.?» en amarillo. Está en movimiento (los bloques se balancean de 0 a 0,5 s). Hay menos de 6 palabras grandes; el texto del comentario se lee justo. Falla una cosa: la tarjeta dibujada está arriba (y ≈ 380–660 px) y ahí es donde suele caer la pegatina nativa de «Responder con vídeo». Las dos se pueden pisar. Se arregla al subir: arrastrar la pegatina abajo, a y ≈ 1250–1400.
- **Retención 17.** Es el vídeo más denso del canal: hay un cambio visual cada 0,5–1 s en todo el metraje (lo he comprobado cada 0,5 s), sin ningún plano parado más de 1,5 s. La pregunta se renueva dos veces («Y es aún más absurdo», «¿Y por qué sobrevivió OK?»). Dura 34 s, dentro de 25–35 s. Resta: L1 (4,6–10,4 s) repite lo que ya contó ep07, y L3 (18,2–24,8 s) es contexto, aunque esté bien ilustrado con la chapa O.K. → OLD KINDERHOOK.
- **Conversación 11.** Cierra con una pregunta abierta y personal («¿Qué palabra te huele rara a ti? Os leo.») y hay comentario fijado. Pero la pregunta es vaga: «oler raro» no le dice al espectador qué tiene que contestar, y los comentarios falsos (ver P6) le hacen el trabajo.
- **Chispa 12.** Tiene buenos momentos: el absurdómetro a «¡MÁXIMO!» (3,5–4,3 s), el chat de mamá con «A.C.» → «¿¿Antes de Cristo??» (26,8–27,6 s, el mejor gag: convierte el problema de «a. C.» en chiste), «ola k ase» en el chat de grupo, la lápida «R.I.P. O.W.» con el emú asomando (18,6 s) y «O.K., otra vez» a pantalla llena. Pero en la voz se han caído dos remates de la versión aprobada: «o sea, all right» y «le contestarías a tu madre». La frase de bar («el ola k ase de la época») sí se ha quedado.
- **Factura 3.** Hay errores visibles (ver la primera fuga).

## Voz a tempo 1,2 (lo que se pidió comprobar)
- Datos: las tomas en bruto (`clips/*.mp3`) iban a ≈ 147 ppm (el `[excited]` y los deletreos las alargaron). Con atempo 1,2 queda en **176 ppm habladas**. OK (ep07) iba a 170, Einstein a 167, Septiembre a 165 y Cumpleaños a 168. Es un 3–4 % más rápido que la media del canal. No llega a ardilla, porque atempo mantiene el tono, pero queda en el límite alto. Además, el 1,2 está fuera del rango de CONTEXTO (0,94–1,0) y del 0,96 aprobado en guion, aunque el ritmo final sí es razonable.
- Whisper (`tr.py`) lo transcribe casi perfecto, también por trozos. Eso indica que se entiende bien y que no hay artefactos que se coman sílabas. **Aviso: yo no puedo escuchar.** Mi juicio se basa en la transcripción y en los tiempos por palabra. Si al oírlo suena «metálico» o con prisa, bajar a 1,12–1,15: la voz quedaría en ≈ 35,5–36 s, y para no pasar de 35 s habría que recortar el gap de la L5 (no hace falta regenerar).
- Puntos donde se atropella (según `words_table`): «Y no era la única» (10,65–11,38 s: 5 palabras en 0,73 s, a más de 400 ppm locales) y «A, C?» (1,14–1,64 s). En la segunda vez que sale (10,04–10,44 s), Whisper en un trozo suelto oye «**Aces**».
- Inteligibilidad:
  - «**Daniela**» ✅ se oye clara en las dos transcripciones (2,44–2,72 s).
  - «**A, C**» ✅ en L0 y L4 («A-C», «AC»); ⚠️ al final de L1 se funde («Aces»). La pantalla lo salva («A.C.» con sello).
  - «**O.W.**» ⚠️ Whisper oye «o tople w» las dos veces, o sea, algo como «o doble u». Un español esperaría «o uve doble», pero se entiende, y en ese momento la pantalla enseña «O.W.» gigante. Aceptable.
  - «**ola k ase**» ✅ se transcribe «hola case», que es justo como suena el meme. Se entiende perfecto.
  - Extra: «oll korrect» y «all correct» suenan IGUAL («All Correct, All Correct»). Al oído parece que tartamudea. El tachado en pantalla (6,4–8,6 s) explica la diferencia, así que se queda como está.

Abogado del diablo: el que no vio OK ve «¿AC?» y oye «All Correct» dos veces sin entender la gracia. El que sí lo vio vuelve a oír Boston y Old Kinderhook. Si la pegatina no le lleva tráfico desde OK, esto es un resumen de 34 s con un solo dato nuevo, y ese dato (O.W.) dura 4 s.

Fugas de retención:
- **32,9–33,9 s** — **ERROR DE FACTURA**: en el borde superior (y 0–20 px) se ve la línea de precarga de fuentes: «ÁÉÍÓÚÑ¿¡ «oll korrect» O.K. A.C. O.W. ✔ ★ ✦ ❤ 👇 🤔 👀 … 😳». Viene de `ac_main.js:52` (`pre.innerHTML…`) y queda al descubierto cuando entra el pergamino. Además, el libro HISTORIA sale descentrado y cortado por la izquierda (x ≈ 0–280 de 540), sin el rótulo «Ep. N · título», y a los 33,0 s asoma el balcón por debajo del pergamino. Es el plano que enlaza con el bucle: cualquiera que lo repita lo ve. — Arreglo: precarga fuera de cuadro (`position:absolute; left:-9999px` u `opacity:0`), centrar el libro y re-renderizar solo la cola.
- 4,6–10,4 s — L1 repite ep07 y la voz suena a eco («All Correct, All Correct»). — Ya está mitigado con el tachado a→o, c→k y el sello «PROPÓSITO». Se puede dejar.
- 18,2–24,8 s — Van Buren es contexto (~1,2 pts/s). — Bien resuelto visualmente (lápidas → campaña → chapa). Nada que tocar.
- 28,2–30,3 s — pregunta + comentarios falsos. — Ver P6: quitar las @.

Edición propuesta (ordenada por impacto/coste):
  1. [visual] Ocultar la línea de precarga (`ac_main.js:52`), centrar el libro del cierre y tapar el balcón que asoma a los 33,0 s. Re-render + `audio.py` (la mezcla no cambia). Factura 3 → 5. **Con esto solo, pasa a 81.**
  2. [visual] 28,2–30,3 s: quitar @usuario y avatares de los tres bocadillos (o dejar solo «¿"guay"?», «¿"vale"?», sin nombre). Quita el riesgo de P6.
  3. [subida] Poner la pegatina nativa del comentario abajo (y ≈ 1250–1400 px), no encima de la tarjeta dibujada.
  4. [voz, opcional] Si al escucharlo suena con prisa, tempo 1,12–1,15 (gratis, sin créditos). No lo exijo: según los datos, se entiende.

Chispa (alternativas con la voz del Vecino, solo para comentarios o un futuro remontaje):
- «La falta de ortografía ganó a la ortografía. Y por goleada. 🎩»
- «Si lo hubieran escrito bien, tu madre pensaría que le hablas de antes de Cristo.»
- «O.W. murió joven. OK tuvo mejor agente: un presidente.»

Publicación:
- Texto del post: «Daniela preguntó si bien escrito sería AC. Sí… y no era la única falta a propósito 🎩» #historia #curiosidades #ok #aprendeentiktok
- Comentario fijado: «¿Qué palabra usas cada día y sospechas que esconde una historia rara? La que más me guste la investigo 👇»
- Responder a @danielaaaablopp en el comentario original: «Te he contestado en vídeo, Daniela 🎩 Tenías toda la razón.»

Portada: el fotograma 0 (s 0,0) vale como portada.

## Contraste con la autoevaluación del animador (leída DESPUÉS de poner mi nota)
- Él da 80 (PUBLICAR) y yo 79 (ARREGLAR). Coincidimos en Tema (20), Chispa (12), Factura (3) y en la banda (C, techo B).
- Su informe es anterior a la nueva mezcla: resta factura por los efectos procedurales. Con los .wav reales de ElevenLabs ese motivo ya no existe, pero yo resto por algo que él no vio: la línea de precarga de fuentes a la vista y el libro del cierre cortado (32,9–33,9 s). Por eso la factura sigue en 3.
- No mencionó que los tres «comentarios de ejemplo» llevan @usuario inventados (P6 ⚠️).
- El ritmo: él da 164 ppm (palabras / duración total, con silencios). Yo mido 176 ppm hablados (sin pausas), frente a los 165–170 de OK y otros episodios. Es rápido, pero aceptable.
- Conclusión: con el arreglo 1 (barato, sin créditos), el vídeo pasa a ≈ 81 y se puede PUBLICAR. Tal como está, no.
