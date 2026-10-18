# ep35 «¿» Cervantes (interrog3), 2.ª revisión: VEREDICTO ARREGLAR (75/100)
Director independiente. No he leído informe.md. Medido con director/medir.py, revisado cada 0,5 s (66,7 s, 134 fotogramas) y con la voz pasada por Whisper medium (en seco y en la mezcla), más una medida de formantes.

Exposición estimada: banda B (se parece a Semana: lo usas cada día y tiene historia oculta, pero no hay pelea. El giro «tu Quijote del cole está retocado» le añade algo de «wow» que se manda, aunque no llega a Napoleón/OK porque no te dice que TÚ estés equivocado).

Puertas: P1 ✅ · P2 ✅ (4/5, falla la b) · P3 ✅ · P4 ✅ · P5 ✅ · P6 ✅ (con datos a verificar) · P7 ✅ · P8 ✅ (justo) · P9 ✅ · P10 ✅ · P11 ✅ con reserva
- P3 arreglado: el gancho dura 3,0 s (0,12–3,12), dice «tú», no da la respuesta y el sello «¡NUNCA!» cae con la voz.
- P7: voz -16 LUFS, música -20 LU, SNR 28,2 dB, final -14,0 LUFS, pico real -1,2 dBTP. Gancho con [excited].
- P8: el remate (L7, 47,2–54,6) ataca algo que el espectador ha tenido en la mano: el Quijote del cole lleva signos que Cervantes no escribió. Se comprueba y es más fuerte que el gancho. Aprobado, pero justo.
- P11 (reserva): ya no hay contradicción (L1 dice «el original» y L7 «el que leíste en el cole»). Pero L3 pregunta «¿quién se lo inventó y por qué solo lo usamos nosotros?»: el paso 1 responde quién, el 2 responde por qué y el 3 («aun así, costó…») no responde a nada. Es una continuación de la historia, no una respuesta. Con una pregunta que no promete tanto, el paso 3 encaja.

Puntuación: Tema 18/25 · Gancho+portada 16/20 · Retención 16/20 · Conversación 11/15 · Chispa 11/15 · Factura 3/5 = 75
- Tema 18: cotidiano, se comprueba en el teclado y vale para España y Latinoamérica. Sube 1 punto por el giro del libro del cole. Sigue sin bronca: nadie creía que Cervantes lo usara.
- Gancho+portada 16: la portada está limpia (el «?» rosa suelto ha desaparecido) y en la miniatura se lee «¿CERVANTES NO LO USABA?» con el «¿» gigante. El gancho dura 3,0 s. Le falta pelea: no contradice nada que el espectador crea.
- Retención 16: el plano cambia cada 1–2 s en todo el vídeo y la marca llega después de responder (Plantilla Napoleón). Bajan la nota L5, con 11,0 s y 40 palabras para la idea más difícil, L6, con un plano de tipógrafo de ~5,9 s para el dato menos interesante, y el ritmo de 180,7 ppm, por encima de los 160–170 del Vecino.
- Conversación 11: la pregunta final crea dos bandos y el pique del WhatsApp ayuda. Es la misma de antes.
- Chispa 11: «cuando Cervantes llevaba más de cien años muerto», «Y ahora lo bueno» y «Cervantes tenía excusa. Tú, en el WhatsApp, no.». Lo de en medio (L5–L6) suena a profesor.
- Factura 3: en L1 la voz dice «QUIJOTO». Whisper small Y medium lo oyen igual (prob. 0,80–0,83, en seco y en la mezcla). Los formantes lo confirman: la última vocal de «Quijote» en L1 (3,99–4,01 s) tiene F1≈300–430 Hz y F2≈1.010–1.050 Hz, que es una /o/; en L7 (48,79–48,85 s) tiene F2≈1.900–2.470 Hz, una /e/ limpia. La causa es la sinalefa «Quijote‿original»: la e se funde con la o. Es la palabra clave, en la segunda frase. «Leíste» en L7 está bien: medium oye «leíste» con 0,97–0,98, así que el «le diste» de small es un fallo del modelo. Lo demás está limpio: libro final «Ep. 35 · Interrogación», bucle al fotograma 0 y transiciones de página sin cortes.

Abogado del diablo: en 26–37 s el espectador recibe 40 palabras a 180 ppm («tienes hambre» y «¿tienes hambre?» son las mismas palabras, el tono no se oye, una frase larga…). Justo después llega un paso 3 que no responde a lo que se preguntó. Ahí vuelve el «a trompicones»: no por frases cortas, sino porque se le pide hilar demasiado y demasiado deprisa en el tramo central.

Fugas de retención:
- 3,47–4,10: «Quijoto». A quien lo oye le chirría y se pregunta si es una errata o una IA. Arreglo: regenerar L1 sin la sinalefa (abajo).
- 9,92–12,72: marca, 2,8 s (2,4–3,2 pts/s). Se acepta porque L1 ya ha respondido.
- 26,01–27,90: el plano del Vecino con «en español, se oye» mientras la voz dice «lo hizo porque en español tienes hambre y…». El subtítulo no lleva comillas y se lee «en español tienes hambre» como si fuera literal. Arreglo: poner comillas o cursiva en los subtítulos («tienes hambre» / «¿tienes hambre?») y adelantar el bocadillo «tienes hambre.» a «español» (≈27,0 s).
- 26,01–37,05: L5 dura 11,0 s. Visualmente aguanta (3 planos de ≥ 1,5 s), pero de voz es lo más denso del vídeo. Arreglo: tempo global 0,96 (sin gastar créditos).
- 37,75–43,40: L6, el tipógrafo con «¿esto? bah…» aguanta ~5,9 s en un solo plano y es contexto sin sorpresa (~1,2 pts/s). Arreglo: partirlo en «muchísimo» (≈39,9 s) con un segundo plano: un libro impreso tachado «¿» o el tipógrafo tirando el tipo «¿» a la papelera de la prensa que ya sale.
- 60,27–63,38: pregunta final (~2 pts/s), normal. Tampoco hay que tocarla.

Edición propuesta (ordenada por impacto/coste):
  1. [voz] Regenerar SOLO L1 (borrar clips/01.*; ~105 caracteres). Hay que romper la sinalefa sin tocar el sentido. El orden nuevo encaja además con los títulos que ya salen («El Quijote» → «de 1605»):
     L1: «En el Quijote de mil seiscientos cinco, el original, no hay ni uno solo, porque el signo todavía no existía.»
     Después comprobar con Whisper medium que se oye «Quijote» (prob. ≥ 0,9) y re-clavar los find() de «original».
  2. [voz] Regenerar L3 (~70 caracteres) para que los tres pasos respondan a lo que se pregunta (pasos 1 = quién, 2 = por qué, 3 = qué pasó después):
     L3: «¿Y entonces quién se lo inventó, y por qué? Te lo cuento en tres pasos.»
     La pantalla de comparación (inglés/francés/alemán, sin «¿», y español «¡se abre!») y el título «¿Por qué solo nosotros?» se quedan, clavados a «por qué». Lo que no hace la voz lo cuenta la imagen. De paso se quita el «solo nosotros» de la voz, que es discutible (gallego, a verificar).
  3. [voz, sin créditos] Tempo global de 1,0 a 0,96: de ~181 a ~173 ppm, unos 69 s. El tramo L5 respira sin trocear nada. Las animaciones van clavadas por texto, así que basta con re-renderizar.
  4. [visual] Subtítulos de L5 con comillas: «…en español "tienes hambre" y "¿tienes hambre?" son las mismas palabras…», y el bocadillo «tienes hambre.» entrando en «español».
  5. [visual] Partir el plano del tipógrafo de L6 en «muchísimo» (≈39,9 s) con un segundo plano (tipo «¿» a la papelera o libro sin «¿» con sello «¡NI CASO!»).
  6. [visual, opcional] De 1,0 a 1,9 s el sello «¡NUNCA!» tapa la cara de Cervantes: bajarlo ~60 px para que se le vea la cara de pillado.
  Nota estimada con 1+2+4+5: 79–80. Con 3 también: 80–82. Sin el 1, no se publica: «Quijoto» es un fallo de factura en la palabra clave.

A verificar antes de publicar: que el facsímil de 1605 (BNE) no lleva ningún «¿»; que la RAE lo fijó en la Ortografía de 1754 por la ambigüedad de las preguntas largas; que en el siglo XIX todavía se imprimían libros sin él; y que las ediciones escolares del Quijote modernizan la puntuación y añaden «¿» (mirar una de Vicens Vives o Anaya). Ojo: el italiano también pregunta solo con el tono y no usa «¿». Por eso L5 lo cuenta como la razón de la Academia («lo hizo porque…») y no como una regla de la lengua. Así está bien.

Chispa:
- «Tu Quijote del cole lleva más signos que el de Cervantes. Y eso que el autor era él.»
- «La Academia se lo inventó cuando Cervantes ya no podía quejarse.»
- «Cervantes tenía excusa: llevaba cien años muerto. Tú, en el WhatsApp, no.» (ya está, y es la frase de bar)

Publicación:
- Post: «Cervantes nunca escribió un «¿». Y el Quijote que leíste en el cole está retocado. ¿Tú lo pones? #historia #español #ortografía #cervantes»
- Comentario fijado: «Sé sincero: ¿pones el «¿» en el WhatsApp o lo guardas para los exámenes? 👇»
