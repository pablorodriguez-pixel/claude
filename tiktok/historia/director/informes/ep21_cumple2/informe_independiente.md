# ep21 Cumpleaños feliz v2 («Hazlo ahora») — VEREDICTO: ARREGLAR  (79/100 tal cual → ~83 con los arreglos de abajo)

Revisión INDEPENDIENTE. Puse la nota antes de leer `informe.md`. Fotogramas propios con ffmpeg en
`/tmp/claude-0/-home-user-claude/1e3de014-1b8f-512d-8962-d580f43ead86/scratchpad/ep21_ind/`: 0, 0,5, 1, 2 y 3 s; hojas cada 0,5 s; miniatura de perfil; karaoke cada 0,25 s de 9 a 14 s.
Audio: `final.mp4` → wav mono 44,1 kHz, analizado con numpy (FFT, energía, onsets) contra `melody.json`, `lines.json`, `voice_solo.wav` y `caja_musica.wav`.

El experimento funciona: la caja suena sola, a tempo y la bolita va clavada. Lo que impide publicarlo es la factura. Se ve el texto de precarga, hay bordes al temblar, sellos cortados o tapados y usuarios inventados que parecen reales. Además, la nota «dí» queda tapada por los Sol anteriores. Todo se arregla sin gastar créditos de voz.

Exposición estimada: banda B. Se parece a Semana y Hora: es una canción que canta todo el mundo, y aquí la comprueba en el momento. Puede llegar a A si el «Te he oído… y desafinas un poquito» se comparte como broma.

## Puertas
P1 ✅ · P2 ✅ (4,5/5) · P3 ✅ · P4 ✅ · P5 ✅ · P6 ✅ · P7 ✅
- P3: el gancho dura 3,41 s (0,12–3,53). La primera palabra es «Cumpleaños», apela con «tus tartas» y no da la respuesta. Se dice con energía: el gancho suena 2,8 dB más fuerte que el resto de la voz.
- P4: la miniatura de 150 px se lee («¿Cumpleaños feliz tenía dueño?», 4 palabras, tarta gigante, etiqueta «¿?»). Ya se mueve entre 0 y 0,5 s, y el título está en y≈320, por debajo de 260.
- P5: «una empresa dijo que era suya» llega a los 26,3–27,6 s.
- P6: en pantalla solo hay datos del guion (2015, «juez de EE. UU.», «DE TODOS» sin 2016, «tus 6 años»). No hay cifras dudosas.
- P7: según `mix_report.json`, la voz va a −16 LUFS, la música 20 LU por debajo, el SNR es de 28 dB y el final, −14,1 LUFS.

## Comprobación del experimento (medida, no supuesta)
| Comprobación | Resultado |
|---|---|
| Voz en el hueco | `voice_solo` da −240 dB (silencio digital) entre 9,75 y 13,10 s. La voz calla a los 9,68 s y vuelve a los 13,12 s («¿Encaja…»). ✅ |
| Caja SIN voz encima | Va de 9,817 a 13,05 s. Desfase entre caja y final: 0,0 ms. No hay ningún SFX entre ding 9,27 y stamp 13,17. ✅ |
| Notas (FFT) | Sol 783,9 · Sol 783,9 · Sol 784,6 · Do 1047,1 · Si 987,2 Hz, a ±1,4 cents. ✅ Melodía correcta: Sol Sol La Sol Do Si. |
| Tempo | Onsets detectados a 9,816 · 10,25 · 10,395 · 10,969 · 11,547 · 12,126 s, frente a 9,817 · 10,25 · 10,394 · 10,972 · 11,549 · 12,126 de `melody.json`: error ≤ 3 ms. Una negra dura 0,577 s, es decir, **104 bpm** ✅. Corchea con puntillo 0,433 y semicorchea 0,144, en 3/4 ✅. |
| Bolita y notas | Cada 0,25 s, la bolita y la sílaba en rojo caen en la nota que suena: «Bue» a 10,0, «nos» a 10,25, «dí» a 10,5–10,75, «as» a 11,0–11,5, «a» a 11,75–12,0 y «ti» de 12,25 a 13,0 s. ✅ |
| Música de fondo frente a la caja | Fuera de los armónicos de la caja, la música queda entre 17,7 y 21,9 dB por debajo en todo el hueco. Con la caja callada (9,64–9,80 s), el RMS es de −37,8 dB, frente a −17,2 de la caja. **La música no tapa la caja** ✅ |
| **«dí» (La)** | ❌ Entre 30 y 250 ms después de su ataque, el La queda **7,2 dB POR DEBAJO** del Sol que sigue sonando. Pasa igual en `caja_musica.wav` aislado (Sol 52,7 frente a La 45,0 dB), así que el fallo es de síntesis y no de mezcla. «ti» (Si) solo saca 5 dB al Do. Se oye el ataque del La, pero sobre un zumbido de Sol, y la segunda nota de la frase, la que la hace reconocible, sale turbia. |

## Errores visibles (factura)
1. ❌ **Texto de precarga a la vista.** Entre 61,57 y 62,6 s (casi 1 s), en el borde superior (y 0–20), se lee «★ ♪ … 🤫🤏🎂😂🇲🇽👇 ÁÉÍÓÚÑ¿¡ «Cumpleaños» 2015 $ © ✔ ★ ♪ …» sobre el libro final. Además asoma una tira marrón con esos emojis en los ~17 temblores (2,93–3,2 · 4,1–4,27 · 13,2–13,47 · 27,23–27,5 · 30,87–31,13 · 40,57–40,83 · 54,63–55,0 · 58,6 s…).
   Causa: `cu2_main.js:50`. El div de precarga tiene `top:0`, y como mide unos 8.000 px de ancho, cruza todo el escenario aunque empiece en `left:-3000px`. A eso se suma `cu2_main.js:76`: el temblor mueve `world` sin margen y deja ver el fondo.
2. ❌ **Usuarios inventados que parecen reales.** De 55,7 a 58,4 s salen «@marta_cumple», «@dani.mx» y «@lu_92» con formato de comentario de TikTok (`cu2_scenes_b.js:263`). Cualquiera de ellos puede existir, y además se presentan como comentarios reales.
3. ❌ El sello **«DE PAGO»** (30,9–31,5 s) queda con la «D» debajo del óvalo del Vecino y se lee «E PAGO» (`cu2_scenes_b.js:39`, x=200).
4. ❌ La estrella amarilla tapa la «h» del chip y se lee **«dos★ermanas»** (19,3–20,6 s; `cu2_scenes_a.js:234`, estrella en [500, 1180]).
5. ⚠️ El sello **«¡ENCAJA!»** (13,1–14,0 s) se sale por la derecha: el borde y la «!» quedan cortados (`cu2_scenes_a.js:168`, x=440).
6. ⚠️ Hay un espacio antes del signo de puntuación en los titulares: «Te he oído …» (14–16 s), «En tu casa :» (44–45,5 s) y «¿Y en tu casa , cómo…» (55–58 s). Pasa porque la puntuación queda fuera del `*resaltado*`.
7. ⚠️ En la partitura, el guion de «Bue-» se monta sobre la «n» de «nos» y se lee «Bue‑nos» pegado (10–13,5 s; `cu2_scenes_a.js:117`).
8. ⚠️ El golpe amarillo de 49,5 a 50,3 s está casi vacío: solo «O sea:» pequeño hasta que entra «la» a 50,27 y la tarta a 50,88.
- Final y bucle ✅: después del libro HISTORIA («Ep. 21 · …»), el último fotograma (62,85 s) es la portada, casi idéntica al fotograma 0, y el bucle queda limpio. El emú sopla las velas en el «Ojo» (44,5 s) ✅.

## Puntuación
Tema 21/25 · Gancho+portada 16/20 · Retención 15/20 · Conversación 12/15 · Chispa 13/15 · Factura 2/5 = **79**
- Queda por encima de Semana (76): el espectador hace la prueba de verdad y hay broma con él. Queda por debajo de Napoleón (88): no le dice que algo SUYO esté mal.
- Factura 2/5: la precarga visible y los usuarios con pinta de reales son errores de «no se entrega»; el resto se nota al verlo dos veces.
- Con los arreglos: Factura 5 y Retención 16 (el La se oye nítido) → **~83 → PUBLICAR**.

Abogado del diablo: el hueco son 3,4 s sin voz justo en la zona donde se va el 40 % (los primeros 5–10 s). Si la frase no se reconoce en las dos primeras notas distintas («Sol‑Sol‑**La**»), la gente desliza antes del «Te he oído». Ahora mismo esa nota sale tapada.

## Fugas de retención
- 9,7–13,1 s — 3,4 s sin voz. Es la apuesta del episodio y hay movimiento continuo, así que el riesgo es el reconocimiento de la melodía. — Arreglo: nº 2 (La nítido).
- 17,35–27,6 s — L3 + L4: 10 s seguidos de contexto (hermanas → clase → alguien → empresa) a ~1,2 pts/s. Está bien cubierto con un plano cada 1–2 s. Ahora no lo tocaría.
- 49,5–50,3 s — plano amarillo casi vacío. — Arreglo: nº 7.
- 49,49–58,45 s — L9 dura 8,96 s, más que los 7,5 s del guion, pero va en 3 planos (amarillo, «QUE NO LO ERA», comentarios). Acepto dejar la pregunta en voz: es lo que da conversación.

## Edición propuesta (ordenada por impacto/coste; ninguna necesita voz nueva)
  1. [visual] `cu2_main.js:50` → `top: '-600px'` y añadir `opacity: 0.01` (las fuentes se siguen cargando). En `base.css:18`, cambiar `background:#000` por el papel `#EADFC8`. En `cu2_main.js:76` → `set(world, { x: sh, y: sh * 0.6, s: sh ? 1.045 : 1 })` (sobreescala mientras tiembla para que no se vea el borde). Comprobar con la tira y=0–20 en 61,6–62,6 y 13,2 s.
  2. [audio] `caja_musica.py:64` → `0.35 + 0.65 * np.exp(-np.maximum(0, t - damp) / 0.10)` pasa a ser `0.06 + 0.94 * np.exp(-np.maximum(0, t - damp) / 0.06)`: al entrar la nota siguiente, la anterior se apaga de verdad. `caja_musica.py:59`: la fase de los parciales 1.0 y 1.0035 tiene que ser la misma (p. ej. `0` en vez de `rng.uniform(0, 6.28)` para `r < 1.01`), para que el batido no cancele el ataque del La. Después: `python3 -I caja_musica.py .` y `audio.py`. Criterio: en cada ventana de nota, la nota objetivo ≥ +6 dB sobre las demás.
  3. [texto] `cu2_scenes_b.js:263` → quitar las @ y usar nombres que no parezcan cuentas: «la vecina del 3.º B», «tu primo de México», «tu tío, cada año». Así se ven como ejemplos y no como comentarios reales.
  4. [visual] `cu2_scenes_b.js:39` → `stamp(c, 330, 1080, 'DE PAGO', …)`, fuera del óvalo (o z por encima de 850).
  5. [visual] `cu2_scenes_a.js:234` → la segunda estrella, de `[500, 1180]` a `[300, 1110]`. `cu2_scenes_a.js:168` → `stamp(c, 380, 1050, '¡ENCAJA!', { size: 100, … })`.
  6. [texto] Meter la puntuación dentro del resaltado: `cu2_scenes_a.js:175` → `'Te he *oído…*'`; `cu2_scenes_b.js:148` → `'En *tu casa:* siempre gratis'`; `cu2_scenes_b.js:249` → `'¿Y en *tu casa,* cómo se canta?'`. En `cu2_scenes_a.js:117` → `SYL = ['Bue', 'nos', 'dí-', 'as', 'a', 'ti']`.
  7. [visual] `cu2_scenes_b.js:234` → que la tarta salga con «O sea» (`K.osea` en lugar de `K.cancion9`, en las dos apariciones de la línea).
  Luego: re-render (`node ../engine/render.js $PWD video`) + `caja_musica.py` + `audio.py`, y otra pasada rápida a 3,0 · 13,2 · 19,5 · 31,0 · 57,5 · 62,0 s.

## Chispa
- «Te he oído... y desafinas un poquito.» (con la trompetilla y el «¡ay!»: es la frase para capturar)
- «Nadie te manda la factura de tus seis años.»
- «La canción que más has cantado tenía un dueño... que no lo era.» (la frase para el bar)
- Alternativa para el fijado/respuestas: «Tranquilo, la de tu casa no la cobraba nadie… salvo tu tía en abrazos 🎩»

## Publicación
- Post (≤150): «Cumpleaños feliz tenía dueño 🎂 Cántala con «Buenos días a ti»… ¿encaja? #curiosidades #sabiasque #musica #historia»
- Comentario fijado: «¿En tu casa es Cumpleaños feliz, Las mañanitas… o una versión que solo canta tu familia? 👇 (Y confiesa: ¿la cantaste por dentro? 🎩)»

## Después de puntuar: comparación con la autoevaluación del animador (80)
- La puntuación por bloques coincide salvo en Factura (4 frente a 2) y Retención (14 frente a 15). El animador no vio la precarga visible, los usuarios con pinta de reales, «E PAGO» ni «dos★ermanas».
- **`informe.md` está desfasado respecto al `final.mp4` actual:** habla de 143 bpm, una caja de 9,82 a 12,25 s, la voz volviendo a 12,37 s y 62,1 s de duración. El vídeo que he medido va a 104 bpm, la caja dura de 9,817 a 13,05 s, la L2 entra a 13,12 s y dura 62,9 s. Su abogado del diablo (tempo demasiado rápido) ya está resuelto en esta versión.
