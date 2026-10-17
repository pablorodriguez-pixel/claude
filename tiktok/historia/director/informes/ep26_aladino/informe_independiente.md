# Ep26 ¿Aladino, un colado? (Especial 1.000) — VEREDICTO: ARREGLAR → PUBLICAR  (79/100 hoy · ~82 tras 2 arreglos de 15 min, sin voz)

Revisión INDEPENDIENTE, modo VÍDEO. Nota puesta ANTES de leer `informe.md` (autoevaluación del animador: 81). No he ejecutado `medir.py`.
Fotogramas propios: `/tmp/claude-0/-home-user-claude/1e3de014-1b8f-512d-8962-d580f43ead86/scratchpad/ep26_ind/` (f_0…f_3, mini.jpg, mini300.jpg, h/hoja_01–04 cada 0,5 s, full/*.jpg).
Material: final.mp4 63,2 s, 1080×1920, 30 fps, 1.896 fotogramas. Voz 0,12–62,19 s.

**¿Se entrega ya? NO. Faltan dos arreglos visuales baratos (re-render + audio.py, la voz no se toca). Con ellos, SÍ: PUBLICAR.**

Exposición estimada: banda B, techo A (se parece a **OK**: algo tuyo de siempre, tu cuento, resulta que te lo colaron; y a **Einstein** en el «lo acepto y lo comparto». No llega a Napoleón porque no se comprueba en el momento ni hay pelea de «yo mido 1,68»).

Puertas: P1 ✅ (justo) · P2 ✅ 4/5 · P3 ✅ · P4 ✅ · P5 ✅ · P6 ✅ · P7 ✅ · P8 ✅ · P9 ✅
- Ninguna suspendida. P1, con riesgo: «Aladino no está en el original» ya circula. Lo salva que NO vive del gancho: 282, Hanna, China, Alí Babá y la firma son capas que casi nadie conoce.
- P3: «Aladino: te lo colaron en "Las mil y una noches".» 0,12–2,85 s, primera palabra = tema, «te», contradice, no dice quién. Volumen del gancho = resto (−18,3 vs −18,6 LUFS en la pista de voz). Bien.
- P4: en 150 px se lee «¿ALADINO, UN COLADO?» y se ve el libro con el hueco. Aladino entra por la derecha: hay movimiento en el 0. El chip «ESPECIAL 1.000» (y≈203) queda fuera del recorte 3:4: correcto, no compite.
- P6: comprobado en pantalla: «1.001 NOCHES», «282», «+700 SIN CUENTO» (719), «1704», «1709», «Hanna Diyab · Alepo (Siria) · unos 20 años», «5 mai 1709 … Aladin» rotulado «(recreación)», «…de la Chine». Calendario «MAYO 1709» con el 1 en miércoles: correcto (comprobado). Nada inventado.
- P7: mix_report OK (voz −16, música −20 LU, SNR 28 dB, final −14,1 LUFS).
- Whisper: «Hanna Diab» (suena Hanna, no «Ana») ✅ · «Galland» → «Galán» (suena bien en español) ✅ · «doscientas ochenta y dos» → «282» ✅ · «Alí Babá» → «Alibaba» ✅. Único tropiezo: «el rey no la mate» → Whisper oye «el reino la mate» (6,3–9,9 s). A oído humano pasa; el subtítulo lo dice bien. No regenerar.

Puntuación: Tema 19/25 · Gancho+portada 16/20 · Retención 16/20 · Conversación 13/15 · Chispa 12/15 · Factura 3/5 = **79**
- Tema 19: tu cuento de infancia, te dice que te lo colaron, y tiene MECANISMO (libro cortado en la 282 + un chaval que rellena). Pierde por el «ya lo sabía» y porque no se comprueba ya.
- Gancho+portada 16: portada de manual. Pierde porque el gancho solo vende la capa conocida («colado»); lo que no sabe nadie (282, Alí Babá) no asoma hasta el s 15.
- Retención 16: cambio de plano cada 0,5–2 s, ninguna línea > 7 s (máx. L11 6,74 s, con cartas que se destapan). Se entiende todo a la primera sin saber nada: manuscrito árabe → 1.001 lunas → traductor → regla que se corta → viaje Alepo-París → parche cosido → pagodas → cueva → firma. La regla de la 282 es EL plano del vídeo. Pierde por 8,4 s de contexto seguidos (6,3–14,7) y el golpe amarillo de marca (38,0–39,8).
- Conversación 13: debate servido («en mi libro sí venía», «Aladino es árabe, no chino») + votación A/B/C con algo en juego.
- Chispa 12: «Exitazo», «Tal cual», «Aladino era chino», «y el libro ni lo nombra», emú con peluca entre los lectores (13,5–14,6 s). Falta la pulla cariñosa al espectador («no es culpa tuya»); el Vecino cuenta más de lo que opina.
- Factura 3: dos errores visibles que el animador no vio (abajo). El resto, limpio: bucle perfecto (último fotograma = fotograma 0), libro HISTORIA centrado, sellos dentro, óvalo sin tapar nada en reposo.

Recompensa final (P8): FUERTE. 46,4–50,6 s: «Los dos cuentos más famosos del libro los contó él… y el libro ni lo nombra», con la portada «GALLAND» en oro, los parches ALADINO y ALÍ BABÁ brillando y la pluma escribiendo «Hanna Diyab» en el lomo. Es dato comprobado, sorprendente y compartible. Es la imagen que se captura. Pero la estropea el error 1.

## Errores visibles (lo que falla hoy)
1. **Precarga del nombre en el lomo, 46,4–50,0 s (~3,6 s): se ve «Ha» escrito ANTES de que la pluma escriba**, justo en el plano de la recompensa. Parece un fallo y destripa el «ni lo nombra».
   Causa: `ep26_aladino/ala_scenes_b.js:302`, con kw=0 el clip deja visibles 110 px (60→170) del texto.
   Arreglo: cambiar `(510 - 90)` por `(620 - 90)` → `nm.style.clipPath = \`inset(-30px ${f1(90 + (1 - kw) * (620 - 90))}px -30px 60px)\`;` (a kw=0 no se ve nada). Verificar fotograma 47,0 y 50,4.
2. **Titular «Aladino» tapado por la ficha del diario, 25,9–26,8 s**: la hoja (rotada −3°) se come la mitad inferior de las letras de 140 px.
   Arreglo: `ala_scenes_b.js:77` `paperPiece(c, 140, 420, …)` → `paperPiece(c, 140, 470, …)` y el chip `ala_scenes_b.js:82` `chip(c, 300, 1060, …)` → `chip(c, 300, 1110, …)`. (Alternativa: `size: 140` → `112` en la l. 69.)
3. (Menor) Mapa 22,4–23,0 s: el marcador de Hanna se posa encima de «PARÍS» y se lee «PA_IS». `ala_scenes_b.js:32` `pin(220, 140, 'PARÍS', '', -40)` → probar `dx` = 50 para que la etiqueta quede a la derecha del pin. Opcional.
4. (Menor) 10,3–11,1 s: plano casi vacío (manuscrito pequeño arriba a la izquierda, sin titular) hasta que cae «1704». No da tiempo a irse, pero es el único hueco del vídeo. Opcional.
- Revisado y NO es error: «ALADINO: NO» a los 4,0 s se ve cortado y debajo del óvalo solo durante la caída del sello (escala 2,3); a los 4,2 s está entero y dentro. Aladino cortado en el borde derecho en el fotograma 0: está entrando, es intencionado.

Abogado del diablo: el que ya ha oído «Aladino no está en Las mil y una noches» desliza en el s 2–5, y lo que lo habría retenido (la 282 a los 15 s, Alí Babá a los 43 s) llega tarde. Entre 6,3 y 14,7 s hay 8,4 s de contexto (Sherezade + Galland 1704) sin pregunta visible.

Fugas de retención:
- 0–5 s — «ya lo sabía» (el 40 % habitual) — el sello COLADO a 1,2 s y el «Y sé quién lo coló» con silueta y «?» (4,6–6,0) son la mejor defensa. No tocar.
- 6,3–14,7 s — contexto (~1,2 pts/s → ~10 pts) — ARREGLO barato opcional: dejar un mini «?» con la silueta de Hanna en una esquina libre (arriba a la derecha, x ≤ 900, y 300–600) durante L2 y L3, para que la pregunta «¿quién?» siga abierta en pantalla.
- 36,8–39,8 s — marca «el especial de los mil» (2,4–3,2 pts/s si suena a marca) — la carta «LO MÁS BESTIA» (37,0–37,9) funciona; el golpe amarillo «ESPECIAL DE LOS 1.000» (38,0–39,8) es marca pura. Opcional: mantener la carta «?» temblando en manos del Vecino durante ese plano (`ala_scenes_b.js:177–186`).
- 50,8–57,5 s — votación (~2 pts/s) — normal: la recompensa ya está dada. No tocar.

Edición propuesta (ordenada por impacto/coste):
  1. [visual] `ala_scenes_b.js:302` `510` → `620`: el lomo vacío hasta que escribe la pluma. OBLIGATORIO.
  2. [visual] `ala_scenes_b.js:77` y `:82`: bajar la hoja del diario 50 px (420→470, chip 1060→1110). OBLIGATORIO.
  3. [visual] `ala_scenes_b.js:32`: etiqueta «PARÍS» fuera del marcador (dx −40 → 50). Opcional.
  4. [visual] mini «?» con silueta de Hanna persistente en L2–L3 (6,3–14,7 s). Opcional, +1 en retención.
  5. Después: `node ../engine/render.js $PWD video` + `python3 -I ../engine/audio.py $PWD ragtime`; comprobar fotogramas 26,2 · 47,0 · 50,4 y el bucle. Nada de voz.

Chispa (para respuestas y fijados, con la voz del Vecino):
- «Galland se quedó sin noches y se las pidió prestadas a un chaval de Alepo.»
- «Aladino era chino, Alí Babá un fichaje de última hora… y el que los trajo, sin firmar.»
- «Mil y una noches… de las que el francés tenía doscientas ochenta y dos.»

Publicación:
- Post: «Aladino no estaba en Las mil y una noches. Alí Babá tampoco. Y el que los contó, ni sale. #historia #aladino #curiosidades #1000seguidores» (≈125 caracteres + 4 hashtags)
- Comentario fijado: «¿Quién te contó a ti Aladino de pequeño: un libro, tu abuela o Disney? Y vota el próximo: A, B o C 👇»
- Publicar solo con el contador en ≥ 1.000. Respuestas preparadas: «en mi libro sí venía» (casi todas las ediciones copian la de Galland) y «Aladino es árabe» (el cuento tiene sultán; la «China» de entonces era un «muy, muy lejos»).

## Comparación con la autoevaluación (leída DESPUÉS de puntuar)
El animador puso 81 y factura 4/5 («no hay textos cortados ni tapados»). Coincidimos en tema, retención, conversación y chispa (±1). La diferencia (−2) son los dos errores visibles que no detectó: «Ha» precargado en el lomo (46,4–50,0 s) y el titular «Aladino» tapado (25,9–26,8 s). Con esos dos arreglos, la nota sube a ~82 y es PUBLICAR.
