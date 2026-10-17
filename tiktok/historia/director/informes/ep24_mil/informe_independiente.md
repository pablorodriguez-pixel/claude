# Ep24 Especial 1.000 «4 "miles" que te han colado» — VEREDICTO: ARREGLAR  (74/100 tal cual → ~80–82 con el remontaje de abajo)

Revisión INDEPENDIENTE en modo VÍDEO (no he leído `informe.md` del animador). Material: `ep24_mil/final.mp4` (69,97 s, 1080×1920, 30 fps), `lines.json`, `guion.md`.
Fotogramas propios en `/tmp/claude-0/-home-user-claude/1e3de014-1b8f-512d-8962-d580f43ead86/scratchpad/ep24_ind/` (f_0, f_0.5, f_1, f_2, f_3; hojas cada 0,5 s `hoja_01…05.jpg`; miniatura `mini.png`; planos clave `k_*.jpg`, `A–D.jpg`).

Exposición estimada: tal cual, **banda C** (se parece a **Cleopatra**: curiosidades «de otros» bien hechas, pero la segunda mitad no le da nada al que viene del Para Ti). Arreglado, **banda B** (se parece a **Semana**: lo aceptas con un «ahhh» y lo comentas; el empujón de los seguidores por ser especial ayuda, pero no lo lleva a A: nada es «tuyo y comprobable ya» como la altura de Napoleón).

Puertas:
- P1 ✅ (el milpiés lo medio sabe la gente, pero el pago es el récord de 2021 + 1.306 y a los 13 s ya estás en Aladino).
- P2 ✅ justo (≈4/5: «comprobable ya» flojo).
- P3 ✅ «Milpiés: te han colado lo de las mil patas.» 0,12–2,69 s; dice «te», contradice, no da la cifra. Con energía (3,5 LU por encima del resto de la voz).
- P4 ✅ Portada clara en la miniatura de 150 px: «¿MIL PATAS?» grande (y ≈ 340–470, dentro del recorte 240–1680), milpiés gigante ya ondulando, chip «ESPECIAL 1.000».
- P5 ✅ Pagado a los 7,9 s (sello «NI LA MITAD» + «2021» + «1.306 PATAS»).
- P6 ✅ con dos «a verificar» (abajo).
- P7 ✅ QA de audio: voz −16 LUFS, música −20 LU, SNR 27,9 dB, final −14,1 LUFS.
- **P8 ❌ Recompensa final.** Los últimos 15 s (55–70) son: «no soy tu vecino José», una votación de 8,2 s y «Mil gracias». El último dato del vídeo es el **infinito, una conjetura que acaba en «Nadie lo ha probado»** (44,8 s). Es exactamente lo que suspendió al Pulgar: «al final no cuentas nada interesante». El dato más fuerte (Aladino) está gastado en el s 13–20.
- **P9 ❌ Una sola complicidad.** Cuento seis guiños a la comunidad: «Hoy somos mil vecinos» (8,9 s), «Mil vecinos… y os conozco» (45,0), Daniela + «bronca» + «yo primero» (49,2–54,9), José (55,1–57,2), votación (57,4–65,6), «Mil gracias» (65,8). De 45 a 70 s son **25 s seguidos de cuarta pared**. En un especial el hito ES el tema, así que acepto un bloque, no cinco.

Puntuación: Tema 17/25 · Gancho+portada 16/20 · Retención 12/20 · Conversación 13/15 · Chispa 12/15 · Factura 4/5 = **74/100**

- Tema 17: lista de 4 curiosidades; Aladino es muy bueno, milpiés y millón son simpáticos, la M romana es el mejor mecanismo visual. Nada se comprueba en el momento.
- Gancho+portada 16: portada de manual. Pierde por el «ya lo sabía» del milpiés y porque «ESPECIAL 1.000» avisa al no seguidor de que esto va de la cuenta.
- Retención 12: los primeros 38 s son lo mejor del canal en ritmo (plano nuevo cada 1–2 s, barra 1·2·3·4, renovación «van tres más» en el s 10). Luego: «Ojo» de 6,6 s (> 6), plano parado del Vecino con «1.000» de 4 s (45,0–49,0), 8 s de guiños internos, votación de 8,2 s. 70 s sin recompensa al final.
- Conversación 13: votación A/B/C con tres peticiones reales + comentarios reales: buen motor de comentarios. Bien que no esté Cortés.
- Chispa 12: «Aladino no venía en el libro», «Un milote» (con el Vecino partiéndose) y «no soy tu vecino José» son citables. Pero el final es un agradecimiento plano.
- Factura 4: limpio en general; fallos menores abajo.

**¿Es un especial a la altura?** La primera mitad sí: el usuario la aplaudiría. Entero, no: es un vídeo de 70 s que a partir del s 38 se convierte en una carta a los seguidores, con una teoría, chistes internos y una votación. El que llega por el Para Ti se va en la conjetura del infinito, y el seguidor se queda sin el «wow» final. Tal cual lo devolvería el usuario por la misma razón que el Pulgar.

Abogado del diablo: **del s 38 al 70 (el 46 % del vídeo) no hay ni un dato nuevo comprobado.** El mejor dato está en el s 13 y el vídeo termina en «Nadie lo ha probado… vota… gracias».

## Comprobación de la voz (Whisper, `../engine/tr.py`)
- «Milpiés» ✅ (lo transcribe «Mil pies»; no se come la primera palabra).
- «mille» ⚠️ Whisper oye «mil» / «1000» («La M ganó luego por mil»). Suena a «mil», no a «míle». Lo salva la cinta «MILLE» en pantalla (37,2 s); sin sonido se entiende, con sonido suena a tautología.
- «A, C» ⚠️ Whisper oye «el AC» (de corrido). Vale, porque el comentario de Daniela dice «ac?» y está subrayado en pantalla.
- «cero muertos del OK» ❌ Whisper oye **«el cero muertos de lo que hay»** (dos pasadas, completa y recortada). Solo se entiende por la tarjeta B («0 killed» / «cero muertos del OK»). Con el remontaje deja de importar tanto (la votación pasa a la mitad y la tarjeta se queda en pantalla), pero si se regenera alguna línea, esta es candidata: «…el "cero muertos" de "okey"…».
- «revancha de Napoleón» ✅ (en la pasada completa la parte en «de la / poleón», pero en la recortada sale bien).

## Errores visibles
- 5,5–8,5 s: la **lupa sobre el milpiés en espiral está vacía** (círculo blanco sin nada dentro). Parece un recurso que no ha cargado. → Que dentro se vea el detalle de las patas, o «1.306».
- 24,9–25,8 s: «MILOTE» ocupa de borde a borde (la E toca el margen derecho) y «¡JA, JA!» queda bajo la columna de botones de TikTok (x > 900). → Escala al 85 % y el «¡JA!» a la izquierda de x ≈ 880.
- 52,3–52,7 s: en la cabecera se superponen «Siempre» y el fantasma de «Otro, bronca al lunes» (fundido cruzado sucio). Desaparece si se quita la L9.
- 42,0 s: el sello «SIN PROBAR» entra cortado por el borde izquierdo durante unos fotogramas. Desaparece si se quita la L7.
- 45,0–49,0 s: plano del Vecino con «1.000» parado durante 4 s (> 2,5 s).
- 0,0 s: la antena del milpiés cruza la «A» de «PATAS». Menor; en la miniatura no se nota.
- Sin precarga en el fotograma 0, sellos a tiempo («NI LA MITAD» en «mitad», «2021» en «veintiuno», golpe rosa en «libro»), óvalo sin tapar textos, cameo del emú (10–11 s) ✅, libro final centrado ✅ (68,2 s), bucle al fotograma 0 ✅ (69,93 s = portada).
- Nombres: solo aparece «danielaaaablopp» (ya pública en ep23); los demás comentarios van sin usuario ✅. **A verificar:** la tarjeta dice «primero 🥇», pero la voz dice «yo primero». Si el comentario real era «yo primero», la tarjeta no es exacta. También «le agarre bronca al lunes»: copiar la ortografía de la captura.
- Cifras: 1.306 patas, 2021, D = 500, ↀ = 1.000, millón < it. *milione*, Galland ✅ (según la verificación del guion). «Hoy somos mil vecinos» tiene que ser verdad el día de publicar.

## Fugas de retención
- 0–5 s — «ya lo sabía» del milpiés — se compensa con los sellos; no se toca.
- 8,9–12,9 s — el hito (marca temprana, 2,4–3,2 pts/s) — 4 s bien resueltos con emú y tarjetas «?». Se queda.
- 38,2–44,8 s — **«Ojo» del infinito (6,6 s, conjetura)** — corte entero (L7).
- 45,0–49,0 s — plano parado del Vecino — se acorta con la L8 sola (3,9 s) y dos cambios de plano.
- 49,2–54,9 s — **Daniela / bronca / yo primero (guiños internos)** — corte entero (L9).
- 57,4–65,6 s — votación de 8,2 s (la pregunta pierde ~2 pts/s) — pasa a la mitad del bloque final, no al cierre.
- 55–70 s — **sin recompensa (P8)** — Aladino pasa al final.

## Edición propuesta (ordenada por impacto/coste)
1. **[voz, 0 créditos: remontaje de los clips que ya existen] Aladino al final + quitar la conjetura y los guiños internos.** Orden nuevo:
   L0 milpiés → L1 → L2 «van tres miles más» → **L4 sin «Tres:»** (millón) → **L5 sin «Y cuatro:»** + L6 (M romana) → L8 «Mil vecinos: para mí, casi infinito. Y os conozco.» → L10 José → L11 votación → **L3 sin «Dos:»** (Aladino) → L12 «Mil gracias. Soy tu vecino… y esto no venía en el libro.»
   Se recortan los numerales con los tiempos de `words_table.txt` («Dos:» 13,16–13,56 → corte en 13,70; «Tres:» 20,02–20,42 → corte en 20,48; «Y cuatro:» 26,07–26,55) y los números los pone la barra 1·2·3·4 en pantalla (2 = millón, 3 = M romana, 4 = Aladino).
   Fuera: L7 (Ojo del infinito, 6,6 s) y L9 (Daniela/bronca/yo primero, 5,7 s). Duración ≈ 53 s.
   Resultado: **los últimos ~10 s son el dato más fuerte («Aladino no venía en el libro: lo coló un francés») y el lema hace eco** («…y esto no venía en el libro»). P8 ✅. Los guiños quedan en un bloque de ~14 s (casi infinito + José + votación) con la votación en medio, no al cierre. P9 ✅ (un bloque, que en un especial es el tema).
   Coste: reanimar el orden de escenas (están clavadas por texto con `find()`/`w()`) y re-renderizar; ni un carácter de ElevenLabs.
2. **[voz, opcional, ~110 caracteres] Regenerar solo la L3** para anunciar que lo mejor va al final y renovar el bucle tras la votación:
   «Y el cuarto, el gordo: «Las mil y una noches». Aladino no venía en el libro: lo coló un francés, siglos después.»
   Sube la retención del tramo de votación (el espectador sabe que falta el gordo). Si se hace, cambiar también en pantalla el anuncio de L2 a «4 · EL GORDO, AL FINAL».
3. **[visual] Mientras se vota, la tarjeta «4 ?» sigue boca abajo** y se da la vuelta en «Las mil y una noches». Así la votación no es un final, es una espera.
4. **[visual] Cierre:** cuando el libro HISTORIA se cierra, que la silueta negra de Aladino (la del golpe rosa) se quede fuera del libro, asomando, con la lámpara. Es el remate «no venía en el libro» hecho imagen.
5. **[visual] Lupa:** meter dentro el detalle de las patas o «1.306».
6. **[visual] MILOTE:** escala 85 %, «¡JA, JA!» fuera de la columna de botones.
7. **[visual] L8:** el plano del Vecino con «1.000» lleva dos cambios (zoom + «casi ∞» en «infinito», «os conozco 👀» en «conozco»), nada parado más de 2 s. Como ya no hay «Ojo», cambiar el chip «casi ∞» por «casi infinito» (el ∞ ya no se ha presentado).
8. **[texto] Tarjetas de comentarios:** copiar literal de las capturas (comprobar «yo primero» frente a «primero» y «le agarre»).

Estimación tras 1 + 5–8: Tema 18 · Gancho+portada 16 · Retención 16 · Conversación 13 · Chispa 13 · Factura 5 = **~81**. Con el 2, ~82. Sin el 1 no hay arreglo que lo apruebe: P8 y P9 siguen suspendidas.

Lo que NO tocaría: portada, gancho, sellos del milpiés, renovación del s 10 con el emú, golpe rosa «NO VENÍA EN EL LIBRO», «Un milote», la ↀ partida en D con «500». Es lo mejor que ha hecho el canal en factura.

## Chispa (voz del Vecino, para respuestas o para la L3 nueva)
- «Y el cuarto, el gordo.»
- «¿En tu libro venía Aladino? Normal: casi todos copian al francés 🎩»
- «El milpiés con mil patas existe. Lo encontraron en 2021 y aún no se lo cree ni él.»

## Publicación
- Post: «Somos 1.000 🎉 y te traigo 4 «miles» que te han colado. El último, el gordo 👀 Vota el próximo 👇 #historia #curiosidades #sabiasque #1000seguidores»
- Comentario fijado: «¿En tu libro venía Aladino? Y vota: A, B o C 👇 (A.C. no vale, Daniela 🎩)»
- Medalla 🥇 al primer «yo primero»; contar los votos a las 48 h y anunciar al ganador en el siguiente vídeo.
