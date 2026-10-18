# Ep29 Interrogación (VÍDEO, director INDEPENDIENTE) — VEREDICTO: ARREGLAR (77/100). Hoy NO se entrega; tras 3 arreglos visuales y un re-render (sin voz nueva) → ~80, PUBLICAR

Revisión hecha sin leer la autoevaluación; la nota se puso antes de mirarla. Material: fotogramas propios de final.mp4 (61,77 s, 1080×1920, 30 fps), hoja cada 0,5 s, miniatura 150 px, planos clave a tamaño completo, Whisper sobre voice_final.wav y contorno de tono (F0) de las dos «tienes hambre».

Exposición estimada: **banda B** (se parece a **Semana / Hora** más que a OK: es algo tuyo y cotidiano, pero no te dice que estés equivocado; «Tú la abres» casi te halaga. No tiene la pelea del «1,68» ni la del «OK es una falta»). Que llegue a más de 20 mil es posible, pero no es lo esperable: la pregunta final sobre faltas es la palanca que lo podría llevar a la banda A.

Puertas: P1 ✅ (por poco) · P2 ✅ 4/5 ((b) a medias) · P3 ⚠️ · P4 ✅ · P5 ✅ · P6 ⚠️ · P7 ✅ · P8 ⚠️ · P9 ✅ · P10 ✅
- P3 ⚠️ El gancho dura 3,70 s (0,12–3,82). Se pasa 0,2 s de 3,5 porque «jamás» se estira 0,8 s (3,02–3,81). No bloqueo la puerta: toda la información está dicha en el s 3,0 y el estiramiento es énfasis, no relleno. Lo penalizo en la nota (−1). Hay arreglo gratis (punto 5).
- P6 ⚠️ No hay datos falsos en pantalla: 1754, «la propone la RAE», asturiano ✓, «GALLEGO: opcional», «LA RAE: OBLIGATORIA» sin cita literal. Pero la página «DON QVIXOTE · Madrid · año 1605» es un dibujo, y la verificación obligatoria 1 (mirar la princeps en la BNE) **sigue sin hacerse**. Es lógicamente seguro (el signo es de 1754 y Cervantes murió en 1616), así que no bloqueo, pero queda «a verificar» antes de contestar comentarios del tipo «yo lo he visto en un Quijote antiguo».
- P8 ⚠️ Los últimos 15 s pagan el gancho («Cervantes tenía excusa. Tú, no.»), pero el dato de ese tramo («Hoy es obligatoria») lo sabe todo el mundo. El dato más fuerte (1754) está en el s 11. Pasa por el remate, no por el dato.

Puntuación: Tema 19/25 · Gancho+portada 15/20 · Retención 16/20 · Conversación 12/15 · Chispa 12/15 · Factura 3/5 = **77**
- Comparación: por encima de Semana (76), porque se comprueba en el momento (dilo en voz alta) y el remate es mejor; muy por debajo de OK (87), porque no contradice nada tuyo. Mi nota queda 4 puntos por debajo de la autoevaluación (81), sobre todo por Factura (bug del giro) y Tema (K2 flojo).

## Lo que se ve (comprobado)
- **Portada (fotograma 0)**: «¿» gigante, Cervantes asomando y «¿CERVANTES NO LO PONÍA?» en 2 líneas, por debajo de y≈300. En la miniatura de 150 px se lee bien. Se mueve desde el fotograma 0 (balanceo leve, visible entre el s 0 y el 0,5). No hay precarga visible. ✅
- **El giro «?» → «¿» (s 14,4–15,9): NO se entiende bien. Es el error n.º 1.** El «?» gira 180° y en el s 15,0–15,2 queda delante de «vienes?» (bien), pero luego **vuela hacia abajo a la izquierda, junto al óvalo del Vecino, y desaparece**. En el s 15,5–15,9 la imagen final del plano es «vienes?» SIN «¿», con un destello sobre un hueco vacío. Es justo lo contrario de lo que dice la voz. Causa: `iq_scenes_a.js:211`, que lleva el signo a `x: lerp(0,-260,kf), y: lerp(0,452,kf)`, a unos 450 px por debajo de la tira. El destello (`:227`, en 398,700) marca dónde debía aterrizar.
- **«Tienes hambre»: funciona.** La 1.ª baja (F0 en «hambre» de 120 a 70 Hz) y la 2.ª sube (de 82 a 222 Hz). Se OYE la diferencia, aunque Whisper transcriba las dos con «¿?» (eso es un fallo de Whisper, no de la voz). En pantalla: curva que baja con «afirmas ↘», curva que sube con «preguntas ↗», «= IGUALES» y el inserto «Inglés: you are → are you?». Es el mejor tramo del vídeo.
- **Teletipo de la frase larga (s 25,6–28,3)**: limpio. El «?» rojo llega tarde y el lector dice «¡AH, ERA PREGUNTA!». ✅
- **El «Ojo» (s 36,8–42,4, 5,6 s)**: mapa con Asturias en amarillo y Galicia en rosa, «GALLEGO: opcional» y el emú con un «¿» de sombrero (cameo único). ✅
- **Cierre**: balcón, libro HISTORIA centrado con «Ep. 29 · Interrogación», transición de papel y vuelta a la portada en el último fotograma: el bucle está bien. ✅
- **Errores menores**:
  - s 53,0–54,5: el sello «SIN EXCUSA» **ya asentado** llega a x≈965–970, entre y≈720 y 1000. Está dentro de la columna de iconos de TikTok durante ~1,5 s, no 1 fotograma.
  - s 52,0–52,6: la mano de Cervantes tapa la «v» de «vienes mañana?» (se lee «ienes mañana?»).
  - s 4,0–4,3: el titular «Ni una» pisa el borde superior de la página del Quijote mientras esta entra.
  - s 60,8–61,2: detrás de la cabeza del Vecino, junto al libro, aparecen 4 anillos grises (parecen el abanico o un efecto de humo) que no se entienden.
  - s 6,5 y 31,0: dos planos de ~0,3–0,5 s sin titular. No pasa nada.
  - El Vecino-óvalo no tapa nada importante. No hay counter() ni titulares solapados al cortar.

## Abogado del diablo
**«Ya lo sé: el ¿ es cosa del español».** El gancho empieza con «¡Interrogación!» gritado (0,16–1,02) y «Tú la abres», que confirma lo que el espectador ya sabe en vez de contradecirlo. La novedad («Cervantes, jamás») llega en el s 2,2. El 40 % que se va en 5 s decide con «¡Interrogación! Tú la abres», y eso suena a clase de Lengua.

## Fugas de retención
- 0,1–2,2 s: «¡Interrogación! Tú la abres» no contradice nada. → Lo sostiene la portada (está bien). Que el móvil del s 1–2 tenga movimiento fuerte (el dedo que pulsa «¿» con golpe y sonido) ya lo cumple; no tocar.
- 9,8–15,6 s (L3, RAE + 1754): contexto, ~1,2 pts/s. Tiene 4 golpes visuales (escudo, sello 1754, libro y giro) y está bien resuelto, pero **el remate visual falla en 15,3–15,9** (bug del giro) → arreglo 1.
- 28,4–36,6 s (L6 siglo XIX + L7 Quijote del cole): 8 s de «historia de la ortografía» seguidos. El impresor que tira el tipo salva la L6; la L7 (2,5 s) es comprobable. Riesgo medio. Sin arreglo barato; se acepta.
- **42,6–48,8 s (L9, «Hoy es obligatoria…»)**: es la fuga principal antes del remate. Todo el mundo sabe que es obligatoria, así que espera ~1,2 pts/s. El «NO VALE» con tijeras ayuda. Solo se arreglaría rehaciendo la voz, y no compensa.
- 54,6–57,6 s (pregunta): ~2 pts/s, como siempre. El sello «SIN EXCUSA» cae antes de la pregunta (bien).

## Edición propuesta (ordenada por impacto/coste; nada exige voz nueva)
1. [visual] **Arreglar el aterrizaje del «¿»** en `ep29_interrogacion/iq_scenes_a.js:211`. Hay que cambiar `x: lerp(0, -260, kf), y: lerp(0, 452, kf)` y `lerp(1, 0.22, kf)` para que el signo, pequeño (≈0,26), quede pegado a la izquierda de «vienes» (tira en left 380 / top 760; texto desde x≈530; destello en 398,700). Como punto de partida, `x: lerp(0,-40,kf), y: lerp(0,100,kf)`, ajustado con `bash ../engine/sheet.sh $PWD 1` en el s 15,4–15,9. Tiene que verse «¿vienes?» completo hasta el corte a «¿PARA QUÉ?». Sin esto no se entrega: es el plano que explica el vídeo.
2. [visual] **Sello «SIN EXCUSA»** en `iq_scenes_b.js:234`: hay que bajar `size: 110` a `96` o mover `left` de 150 a 100, para que el borde derecho quede ≤ 920 px.
3. [visual] **Mano de Cervantes en K1** (`iq_scenes_b.js`, escena «Cervantes tenía excusa», ~l. 196–225): bájala unos 60 px o llévala al borde izquierdo de la burbuja para que no tape la «v» de «vienes mañana?».
4. [visual, opcional] Quitar los 4 anillos del s 60,8–61,2 (o esconderlos detrás del libro) y bajar 30 px la página del Quijote en el s 4,0 para que «Ni una» no la pise.
5. [voz, gratis, opcional] Gancho de 3,70 a ≈3,5 s: pon `"tempo": 1.05` solo en la línea 0 de `lines_in.json` y vuelve a ejecutar gen_lines, que reutiliza el clip y no gasta créditos. Todo va clavado con find(), así que la animación lo sigue. Hazlo solo si el re-render es de todos modos completo.
6. [texto, opcional] Portada: «¿CERVANTES NO LO PONÍA?» y la voz «Tú LA abres» no concuerdan. Algún comentario lo dirá; puede dar conversación, así que no lo cambies si cuesta.

Con 1–3 hechos: Factura 3→5 y Retención 16→17 → **~80, PUBLICAR**. Re-render + `audio.py` (la mezcla no cambia) + volver a mirar el s 15–16 y el 52–54.

## Chispa (alternativas con la voz del Vecino, para respuestas y post)
- «Abrir la pregunta es poner el intermitente: avisas antes de girar.»
- «Si escribes "vienes?" no eres moderno: escribes como en el siglo XVII.»
- «Cervantes escribió mil páginas sin abrir una pregunta. Tú no la abres ni en un wasap de tres palabras.»

## Publicación
- Texto del post: «Cervantes escribió el Quijote sin abrir ni una pregunta. Él tenía excusa. ¿Y tú? 🎩» · #historia #curiosidades #ortografia #aprendeentiktok
- Comentario fijado: «¿Qué falta de ortografía no le perdonas a nadie? La mía: "haiga". Os leo 👇»
- Respuestas preparadas: las de guion.md §12 son válidas (asturiano obligatoria, gallego opcional, catalán: el IEC dice que no, inglés cambia el orden). Ante «yo lo he visto en un Quijote antiguo»: no afirmes nada hasta mirar la princeps (a verificar).

## ¿Se entrega ya?
**No.** El plano del giro (s 15,3–15,9) enseña «vienes?» sin abrir justo cuando la voz dice «puesta del revés»: contradice el mensaje del vídeo. Son tres arreglos visuales baratos y un re-render. Después, PUBLICAR (~80, banda B).
