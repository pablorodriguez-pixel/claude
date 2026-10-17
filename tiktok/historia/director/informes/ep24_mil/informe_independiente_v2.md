# Ep24 Especial 1.000 (REMONTADO, 58,3 s) — VEREDICTO: ARREGLAR  (77/100 tal cual → ~80 con 4 arreglos baratos, 0 créditos)

Revisión INDEPENDIENTE v2, modo VÍDEO. He puesto la nota ANTES de leer `informe.md` e `informe_independiente.md`; después los he leído solo para comprobar los arreglos pedidos.
No he ejecutado `medir.py`. Fotogramas propios en `/tmp/claude-0/-home-user-claude/1e3de014-1b8f-512d-8962-d580f43ead86/scratchpad/ep24_ind2/` (f_0, f_0.5, f_1, f_2, f_3; `hoja.jpg` cada 0,5 s; `mini.png` con crop 1080:1440:0:240 → 150 px; planos clave `k_*.jpg` a tamaño completo, incluidos 55,3–58,2 s y el bucle).
Material: `ep24_mil/final.mp4` (58,33 s, 1080×1920, 30 fps), `lines.json` (13 líneas), `voice_final.wav`, `mix.wav`, `clips/*.json`.

**¿Se entrega al usuario ya? NO.** Le faltan 30 minutos de arreglos sin gastar créditos (clics de voz y tres solapes). Hecho eso, se entrega.

Exposición estimada: banda C alta, con techo B (se parece a la @/SOS por ser el «origen» de algo cotidiano, que no se comprueba en el momento; el empujón de los seguidores en el especial y la votación lo pueden llevar al terreno de Semana, pero no a A: nada es «tuyo» como la altura de Napoleón).

Puertas:
- P1 ✅ El milpiés lo medio sabe la gente, pero el pago es el récord (2021, 1.306 patas), y luego la ↀ y Aladino.
- P2 ✅ justo (≈ 3,5–4/5: vale para España y Latinoamérica, «te han colado», la votación da respuesta personal; «comprobable ya», flojo).
- P3 ✅ «Milpiés: te han colado lo de las mil patas.» 0,12–2,69 s. La primera palabra es el tema, dice «te», contradice y no da la cifra. Arranca a −19/−18 dB a los 40 ms: con energía.
- P4 ✅ «¿MIL PATAS?» grande y un milpiés gigante; en la miniatura de 150 px se lee entero. Ya se mueve (diferencia media entre 0 y 0,5 s = 19).
- P5 ✅ Pagado a los 4,1 s («NI LA MITAD») y a los 7,9 s («2021» + «1.306 PATAS»).
- P6 ✅ 1.306 patas en 2021, «la mayoría no llega ni a la mitad» (casi todas las especies tienen < 400 patas), millón < it. *milione*, ↀ partida = D = 500, M por *mille*, Aladino añadido por Antoine Galland. Todo correcto. Matiz «a verificar» solo de redacción: «siglos después» es cierto respecto a los manuscritos árabes (Galland, 1704–1717).
- P7 ✅ en el QA: voz −16 LUFS, música −20 LU, SNR 27,9 dB, final −14,1 LUFS. Pero hay clics de corte en la voz (ver abajo): no suspenden el QA, sí la Factura.
- **P8 ✅ Recompensa final.** De 44,7 a 53,2 s: «Y el cuarto, el gordo: "Las mil y una noches". Aladino no venía en el libro: lo coló un francés, siglos después.» Es el dato más sorprendente y comprobado del vídeo, y el lema hace eco en la última frase. Esto es justo lo que faltaba en el Pulgar. Además, la tarjeta «4 ? el gordo, al final» se queda en pantalla durante la votación: la espera se mantiene.
- **P9 ✅ con matiz.** Hay un solo guiño de verdad (José, 34,4–36,4 s, sacado de un comentario real que está en `COMUNIDAD.md`, sin nombre de usuario). «Mil vecinos… os conozco», la votación y «Mil gracias» son el marco del especial, el hito es el propio tema. Van en UN bloque (30,2–44,5 s), no repartidos. Lo acepto. Más, no.

Puntuación: Tema 17/25 · Gancho+portada 17/20 · Retención 14/20 · Conversación 13/15 · Chispa 13/15 · Factura 3/5 = **77/100**

- Tema 17: cuatro «miles»; el mejor mecanismo visual es la ↀ (garabato → sierra → D + 500 → M con «MILLE»), y el mejor dato, Aladino. Nada que comprobar en el momento.
- Gancho+portada 17: portada de manual. Pierde un poco por el «ya lo sabía» del milpiés.
- Retención 14: de 0 a 30 s es el mejor ritmo del canal (un plano cada 1–2 s, barra 1·2·3·4, renovación «van tres más» a los 9–13 s con el emú). El bloque comunidad + votación (30,2–44,5 s, 14,3 s) no aporta ningún dato nuevo; lo sostienen la tarjeta del gordo y el gag de José, pero el que llega por el Para Ti puede irse aquí. Duración 58,3 s ✅.
- Conversación 13: votación con algo en juego (elige el próximo episodio), tres cartas que recuerdan éxitos (Napoleón 1,68, «0 killed») y el chiste de José para los fieles.
- Chispa 13: «Un milote» (con el Vecino partiéndose), «Y no: no soy tu vecino José», «Aladino no venía en el libro» (para repetir en el bar), «Mil gracias».
- Factura 3: los clics de voz y tres solapes (ver abajo).

Abogado del diablo: del s 30 al 44 el vídeo habla de la cuenta y no de los «miles». Si el algoritmo se lo enseña a no seguidores, ahí se pierde la curva, justo antes del mejor dato.

## Voz: transcripción y empalmes
`python3 -I ../engine/tr.py ep24_mil/voice_final.wav`: todo se entiende. Whisper oye «Mil pies» (no se come la M), «Millón, viene del italiano mil grande, un milote», «El mil romano no era una M, era este garabato», «El próximo lo elegís. Alejandro Magno, el mito de los ceromuertos o la revancha de Napoleón. / Vota A, B o C.», «Y el cuarto, el gordo. Las mil y una noches». Los numerales «Dos:/Tres:/Y cuatro:» ya no suenan.
- «mille» se sigue oyendo como «mil» («La M ganó luego por mil»). Lo salva la cinta «MILLE» en pantalla. Se acepta.

Empalmes (energía con numpy cada 3–20 ms, F0 por autocorrelación alrededor de cada `s`/`e` de `lines.json`):
- **Salto de tono: ninguno.** L3→L4 (~75→80 Hz), L8→L9 (cae a 70–80 Hz y retoma a 93–101), L9→L10 (70→88 Hz). La votación partida en tres suena a tres frases con pausa natural (0,22 s + 0,25 s de aire antes de «Vota»).
- **Arranques limpios**: ninguna línea empieza cortada (todas entran desde el silencio, de −60 dB o menos, a la voz en 20–60 ms). Ninguna respiración cortada al inicio.
- **Aire muerto**: antes de «El mil romano» (18,73–19,13 s) hay 0,4 s a −60 dB, que con el hueco suman 0,62 s de pausa. No suena a corte, pero sobra. Antes de «Millón» hay 0,2 s.
- **❌ Clics de corte al final de línea.** La voz pasa de golpe de la señal al cero digital, sin fundido. En `mix.wav` el salto de una muestra es de 25 a 50 veces el típico de alrededor:
  - **8,666 s** (fin de L1, «…dos mil veintiuno»): la voz sigue a −27 dB hasta el corte; salto de 0,20 en la mezcla. El «-no» se corta seco.
  - **23,298 s** (fin de L4, «…este garabato.», línea RECORTADA): tras 50 ms de silencio asoma en los últimos 3–6 ms el arranque de otro sonido (−23 dB) y se corta. Salto de 0,27. Se oye como un «tic» justo antes de «Pártelo».
  - **36,441 s** (fin de L7, «José.»): voz a −24 dB hasta el corte; salto de 0,19. El «-sé» se corta.
  - Menores: 18,51 s (fin de L3 «milote», recortada, cola que sube a −35 dB), 29,99 s (fin de L5 «mille», −32 dB), 44,46 s (fin de «Vota A, B o C»).
  - L1 y L7 no son recortes del remontaje: los `_raw.wav` ya acaban así (la ElevenLabs corta seco). Pero el motor tampoco funde, así que en la mezcla suenan. Con auriculares se nota.

## Errores visibles
- **41,0–44,5 s: la tarjeta B (resaltada) monta su borde superior sobre el título «Elige: A, B o C»**: la línea del marco cruza «ge:». Se ve claramente a tamaño completo.
- **43,0–44,5 s: el rótulo «VOTA A, B o C 👇» tapa media tarjeta «4 ? el gordo, al final»**, justo la que tiene que mantener la espera.
- 51,3–53,2 s: «AÑADIDO» llega al borde derecho (x ≈ 1075) y el chip «siglos después» (x 560–1060, y 1150–1260) cae en la columna de botones de TikTok. El sello también le tapa la cabeza a Aladino (si es a propósito, se acepta).
- 47,5–50,0 s: el libro de Aladino está descentrado (margen de 10 px a la izquierda y ~90 a la derecha) y el óvalo del Vecino tapa la esquina inferior izquierda de la página. A los 51 s ya está centrado. El libro final HISTORIA sí está centrado ✅ (57,5 s).
- 50,2 s: en el golpe rosa «NO VENÍA», el óvalo roza la mano y la lámpara de la silueta de Aladino. Menor.
- 7,0 s: el óvalo tapa la cabeza del milpiés en espiral. Menor.
- Lo que está bien: sin precarga en el fotograma 0; la lupa ya enseña las patas; sellos a tiempo («NI LA MITAD» en «mitad», «2021» en «veintiuno», «500» en «quinientos», «MILLE», «EL GORDO» en «gordo», «AÑADIDO» en «coló»); el óvalo no tapa ningún texto real; los títulos quedan dentro del recorte; un solo usuario, «tu no eres mi vecino jose», sin nombre ni avatar real (es un comentario real según `COMUNIDAD.md`), con la etiqueta «comentario real»; un solo cameo del emú (10,2 s); MILOTE dentro de los márgenes, con el «¡JA!» fuera de la columna de botones; bucle: 58,2 s = fotograma 0 ✅. Los planos vacíos (marco de piedra a los 18,6 y 20,4 s) duran ≤ 0,5 s y van antes de que aparezca la M o el garabato: se aceptan.

## Fugas de retención
- 8,9–12,9 s — el hito (marca temprana) — bien resuelto: se convierte en promesa («tres miles más») con el emú. Se queda.
- 18,73–19,13 s — 0,4 s de aire antes de «El mil romano» — recortar el arranque de la L4 a 0,1 s.
- 30,2–36,4 s — «Mil vecinos… os conozco» + José (6,2 s sin datos) — se queda (es el especial), pero sin aire extra.
- 36,7–44,5 s — votación (7,8 s; la pregunta pierde ~2 pts/s) — la sostiene la tarjeta «el gordo, al final»: que se VEA entera (arreglo 2).
- 44,7–53,2 s — Aladino — el mejor tramo del final; no tocar.

## Edición propuesta (ordenada por impacto/coste; ninguna gasta créditos)
1. [voz] **Fundido de salida de 8–10 ms al final de cada clip** (y de entrada de 3 ms) antes de concatenar en `gen_lines.py`/remontaje. En la L4, además, cortar 6 ms antes (en 23,292 s del montaje actual) para quitar el arranque fantasma. Vuelve a mezclar con `audio.py` y comprueba que en 8,67 / 23,30 / 36,44 s el salto de muestra ya no sobresale. Recortar también el aire inicial de la L4 (de 0,67 a ~0,25 s en el clip) y de la L3 (de 0,53 a ~0,3 s): −0,6 s.
2. [visual] **Votación**: bajar las tres cartas ~70 px (o subir el título) para que no se crucen con «Elige: A, B o C», y poner el rótulo «VOTA A, B o C» encima de la tarjeta «4 ?», sin taparla. Que se lea «el gordo, al final» hasta el 44,7 s.
3. [visual] **51–53 s**: escalar «AÑADIDO» al 85 % y meterlo hasta x ≤ 1000; subir «siglos después» por encima de y ≈ 1000 o moverlo a la izquierda de x ≈ 900.
4. [visual] **47,5–50 s**: centrar el libro desde el primer fotograma (como a los 51 s) y ocultar el óvalo del Vecino en el plano del libro (de 47,5 a 50,4 s), o subir el libro para que el óvalo quede debajo.

Estimación tras 1–4: Tema 17 · Gancho+portada 17 · Retención 15 · Conversación 13 · Chispa 13 · Factura 5 = **~80 → PUBLICAR justo.** Tras arreglarlo basta comprobar los tres tiempos de los clics y los fotogramas 41, 44, 49 y 52 s; no hace falta otra revisión completa.

## Comprobación contra `informe_independiente.md` (v1)
| Lo que pedía | Estado |
|---|---|
| Aladino al final; fuera el «Ojo» del infinito (L7) y Daniela/bronca/yo primero (L9) | ✅ Hecho. P8 y P9 aprobadas. 70 s → 58,3 s |
| Quitar «Dos:/Tres:/Y cuatro:» de la voz; números con la barra 1·2·3·4 | ✅ En la voz no suenan; en pantalla, «Dos: millón», «Tres: el mil romano». **Pero el recorte deja aire de 0,4 s antes de «El mil romano» y una cola con clic en «garabato» (23,30 s)** |
| L3 regenerada: «Y el cuarto, el gordo…» | ✅ Hecho, se oye limpia |
| Tarjeta «4 ?» boca abajo durante la votación, con la vuelta en «Las mil y una noches» | ✅ Hecho, pero el rótulo VOTA la tapa a medias (arreglo 2) |
| Silueta de Aladino asomando en el cierre del libro | ✅ Hecho (57,5 s) |
| Lupa con las patas dentro | ✅ |
| MILOTE al 85 % y «¡JA!» fuera de la columna | ✅ |
| Plano del Vecino «1.000» con cambios (casi infinito, os conozco) | ✅ Zoom + chips; nada parado más de 2 s |
| Tarjetas de comentarios literales | ✅ Solo queda «tu no eres mi vecino jose», literal |
| Problemas nuevos que trae el remontaje | ❌ Clics de corte (8,67 / 23,30 / 36,44 s), carta sobre el título, VOTA sobre «4 ?», AÑADIDO y «siglos después» en el borde derecho, libro descentrado a los 47,5–50 s |

## Chispa (para respuestas y el fijado)
- «Mil patas tiene uno solo. Y lo encontraron en 2021, bajo tierra, sin avisar a nadie.»
- «¿En tu libro venía Aladino? Normal: casi todos copian al francés 🎩»
- «José es el del cuarto. Yo soy el del rellano.»

## Publicación
- Post (≤ 150): «Somos 1.000 🎉 y te traigo 4 «miles» que te han colado. El último, el gordo 👀 Vota el próximo 👇 #historia #curiosidades #sabiasque #1000seguidores»
- Comentario fijado: «¿En tu libro venía Aladino? Y vota el próximo: A, B o C 👇»
- Publicar solo con el contador en ≥ 1.000. A las 48 h, contar los votos y anunciar al ganador en el siguiente vídeo; medalla 🥇 al primero.
