# ep35 «¿» Cervantes (interrog3), 3.ª revisión: VEREDICTO ARREGLAR (78/100)
Director independiente. No he leído informe.md. He pasado director/medir.py, he revisado los 138 fotogramas cada 0,5 s (69,0 s), he mirado de cerca 62,6–63,6 s y 39,8–41,3 s, y he pasado Whisper medium por L1 y L7, en seco y en la mezcla.

Exposición estimada: banda B. Se parece a Semana: lo usas cada día y tiene historia oculta, pero no hay pelea. El giro del «Quijote del cole retocado» se comparte, pero no te dice que TÚ estés equivocado, así que no llega a Napoleón ni a OK.

Puertas: P1 ✅ · P2 ✅ (4/5, falla la b) · P3 ✅ · P4 ✅ · P5 ✅ · P6 ✅ (con lo de «a verificar») · P7 ✅ · P8 ✅ · P9 ✅ · P10 ✅ · P11 ✅
- Fotograma 0: la portada ESTÁ. «¿CERVANTES / NO LO USABA?», el «¿» gigante y Cervantes asomando. Se lee en la miniatura del perfil. El bucle vuelve a la portada (68,5–69,0).
- «Quijote» en L1 (3,82–4,17): Whisper medium oye «Quijote» con 0,921 en seco y 0,914 en la mezcla. ARREGLADO. «leíste» en L7: 0,972.
- P7: voz -16,0 LUFS, música -20 LU, SNR 28,3 dB, final -14,1 LUFS, pico real -1,8 dBTP. OK.
- P11: L3 ya pregunta «quién y por qué» y el paso 3 entra como «qué pasó después». Se quita la reserva.

Lo que se ha hecho del informe anterior: 1 (L1) sí · 2 (L3) sí · 3 (tempo 0,96 → 171 ppm en total) sí · 4 (comillas en L5) sí · 5 (L6 partido en tres planos: tipógrafo 39,0–41,5 / libro «¡NI CASO!» 41,5–44,5 / prensa «SIGLO XIX» y «LIBROS SIN «¿»» 44,5–48,5) sí · 6 (el sello tapa la cara) NO.

Puntuación: Tema 18/25 · Gancho+portada 16/20 · Retención 18/20 · Conversación 11/15 · Chispa 11/15 · Factura 4/5 = 78
- Tema 18: igual que antes. Es cotidiano y se comprueba en el teclado, pero nadie creía que Cervantes lo usara.
- Gancho+portada 16: la portada está bien. De 0,5 a 1,9 s el sello «¡NUNCA!» sigue tapando la cara de Cervantes (f_01.0: solo se le ve la calva), justo cuando el gancho le acusa a él. Se pierde la cara de pillado, que es la reacción que vende el gancho.
- Retención 18 (+2): el plano cambia cada 1–2 s en todo el vídeo, L6 ya no tiene un plano parado y el ritmo baja a 171 ppm. Quedan dos cosas. L5 (26,8–38,3) sigue siendo la frase más densa, con 11,5 s. Y L6 (39,0–48,2) se ha ido al otro extremo: 9,2 s a ~151 ppm («aun» 0,69 s, «muchísimo» 0,94 s, «caso» 0,84 s). La línea más lenta del vídeo es la del dato menos interesante.
- Conversación 11: igual. La pregunta final abre dos bandos y el pique del WhatsApp ayuda.
- Chispa 11: «cuando Cervantes llevaba más de cien años muerto», «Y ahora lo bueno» y «Tú, en el WhatsApp, no.» siguen funcionando. El único gag visual del tramo central, el bocadillo «¿esto? bah…» del tipógrafo, aparece en «costó» (41,24 s) y el plano se corta en ~41,5 s: está en pantalla unos 0,3 s y NO se puede leer. Ese chiste se ha perdido.
- Factura 4 (+1): «Quijote» ya se oye bien, el libro final dice «Ep. 35 · Interrogación» y no hay cortes. Pero a los 63,0 s el título final se lee «cuandoescribes,»: el rebote del pop de «escribes,» se come el hueco de 0,1 em. Dura ~0,2 s, aunque se ve en la parte grande de la pantalla.

Abogado del diablo: el tramo central (26,8–48,2 s, 21 s) es Academia → tono → imprenta, sin ningún golpe de humor que se pueda leer. Primero una frase de 11,5 s que va deprisa y luego otra de 9,2 s que se arrastra. El que llega a los 27 s viendo un chisme se encuentra con una clase de ortografía. Se va antes de «Y ahora lo bueno» (48,9 s), que es lo mejor del vídeo.

Fugas de retención:
- 0–5 s: lo normal (40 %). El gancho aguanta, pero sin la cara de Cervantes pierde fuerza (arreglo 1).
- 10,37–13,27: la marca dura 2,9 s (2,4–3,2 pts/s). Se acepta porque L1 ya ha respondido.
- 26,82–38,31: L5, 11,5 s y la idea más difícil. Visualmente aguanta (Vecino → bocadillos → «= MISMAS PALABRAS» → «frase larga, sin «¿»» → «¡AH, ERA PREGUNTA!»). Así se queda: rehacer la voz no compensa.
- 39,01–48,17: L6, 9,2 s de contexto a ~1,2 pts/s, ≈ 11 pts. El arreglo barato es devolverle el chiste (arreglo 2).
- 62,37–65,61: la pregunta final (~2 pts/s). Es lo normal.

Edición propuesta (ordenada por impacto/coste; todo visual, sin gastar créditos, solo hay que volver a renderizar):
  1. [visual] El bocadillo del tipógrafo tiene que leerse. En iq_scenes_b.js, en la escena del tipógrafo, cambia la entrada del bocadillo de K.costo - 0.05 a K.aun + 0.15 (≈ 39,97 s), en el pop y en la opacidad:
     set(bb, { s: pop(t, K.aun + 0.15, 0.32), r: -3 + wobble(t, 0.6, 1), o: t < K.aun + 0.15 ? 0 : 1 });
     Así queda ~1,5 s en pantalla (39,97–41,5). Mantén la cara de duda del tipógrafo (doubt) en K.costo.
  2. [visual] Que se vea la cara de pillado de Cervantes en 0,5–1,9 s. En iq_scenes_a.js, mueve el sello encima del palo del «¿», a la izquierda y fuera de Cervantes:
     const nu = stamp(cam, 40, 1000, '¡NUNCA!', { size: 100, bw: 16, z: 45, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
     Comprueba en la hoja que no tapa el subtítulo ni la cara, y que sigue cayendo en «nunca».
  3. [visual] Arregla el «cuandoescribes». En iq_scenes_b.js:298, cambia s.style.margin = '0 0.1em' por '0 0.18em' (o pon transformOrigin 'center bottom' en cada span) y comprueba el fotograma de los 63,0 s.
  Con 1+2+3: Gancho+portada 17, Chispa 12 y Factura 5, lo que da 81/100. Después hay que comprobar los fotogramas 0, 1,0, 40,5 y 63,0 s; no hace falta otra revisión completa.
  No toques la voz: L5 y L6 se quedan como están.

A verificar antes de publicar (igual que antes): que el facsímil de 1605 (BNE) no lleva ningún «¿»; que la RAE lo fijó en la Ortografía de 1754; que en el siglo XIX todavía se imprimían libros sin él; y que las ediciones escolares del Quijote añaden «¿» (mirar una de Vicens Vives o Anaya).

Chispa (por si hay otra versión; esta no se toca):
- «Tu Quijote del cole lleva más signos que el de Cervantes. Y eso que el autor era él.»
- «La Academia se lo inventó cuando Cervantes ya no podía quejarse.»
- «Cervantes tenía excusa: llevaba cien años muerto. Tú, en el WhatsApp, no.» (la frase de bar, ya está dentro)

Publicación (para cuando estén hechos los tres arreglos):
- Post: «Cervantes nunca escribió un «¿». Y el Quijote del cole está retocado. ¿Tú lo pones? #historia #español #ortografía #cervantes»
- Comentario fijado: «Sé sincero: ¿pones el «¿» en el WhatsApp o lo guardas para los exámenes? 👇»
