# Ep25 Chao, revisión independiente (VÍDEO). VEREDICTO: ARREGLAR barato, solo visual, y luego PUBLICAR  (81/100 tal cual → ~85 con los arreglos)

Revisor independiente. No he leído `informe.md`, la autoevaluación del animador, antes de poner esta nota. He visto `final.mp4` (61,4 s): fotogramas 0; 0,5; 1; 2 y 3, una hoja cada 0,5 s, la miniatura 3:4, 48 planos clave a tamaño grande, los 3 últimos segundos y el bucle. También he pasado Whisper por la voz. Fotogramas en `/tmp/claude-0/-home-user-claude/1e3de014-1b8f-512d-8962-d580f43ead86/scratchpad/ep25_ind/`.

**¿Se entrega ya? NO, este render no.** El guion y la voz están para PUBLICAR. El render tiene 4 errores visibles, y dos caen en palabras clave («Venecia» y «el único»). Se arreglan con 4 líneas de código y otro render, sin voz ni créditos. Después, se entrega.

Exposición estimada: **banda B alta, con techo A** (se parece a **OK**: es una palabra que dices a diario y tiene un origen absurdo, con cadena de recompensas y pregunta «en mi país…». Es menos universal que OK: en España y México «chao» no es tan «tuyo»).

## Puertas
P1 ✅ · P2 ✅ (4/5) · P3 ✅ · P4 ✅ · P5 ✅ · P6 ⚠️ · P7 ✅ · P8 ✅ · P9 ✅
- P3: «¡Chao! Crees que es adiós... y era una promesa.» (0,12–3,41 s). La primera palabra es el tema, dice «tú», contradice y no suelta la respuesta.
- P4: «¿CHAO = ADIÓS?» y la mano gigante se leen bien a 150 px. El título está por debajo de y≈300, así que el recorte 3:4 no lo corta. La mano se mueve desde el fotograma 0.
- P5: se paga a los 13,35 s, con el sello ESCLAVO justo en «esclavo».
- **P6 ⚠️ (visual, no de datos):** en el mapa de L4 (19,3–22,4 s), la etiqueta «CHAO» de Venezuela (`ch_scenes_a.js:259`, `ve … l:[650,680]`) queda encima de **Brasil**. A golpe de vista se lee «en Brasil: CHAO», y 13 s después el vídeo dice que en Brasil es «tchau». No hay pin de CHAO en ningún país donde no se use (España, Colombia, Venezuela, Perú y Chile; CHAU en Argentina y Uruguay; México vacío), pero la etiqueta está mal colocada. El mapa de Europa (TSCHAU, ČAU, SERVUS ×2 y CIAO) está bien.
- P7 ✅: final −14,1 LUFS, voz −16, voz/música 27,8 dB y gancho con [excited].
- P8 ✅: «servus… que en latín significa... esclavo» cae en 44,6–49,0 s, con el sello en 48,24 s (13 s antes del final). Le sigue «media Europa se saluda como un esclavo». Es el dato más fuerte y está comprobado, no es una teoría.
- P9 ✅: hay una sola complicidad, «¿Cuántas veces lo has dicho hoy?» (29,7 s), y sale del tema. «Y no eres el único» no es cuarta pared.

## Puntuación
Tema 21/25 · Gancho+portada 17/20 · Retención 16/20 · Conversación 13/15 · Chispa 12/15 · Factura 2/5 = **81/100**
(Con los 4 arreglos, la factura sube a 5/5 y el total queda en ~84–85.)

Lo he puesto en 81 y no en PUBLICAR directo porque los errores se ven, y el usuario es más exigente que la rúbrica. No se entrega un vídeo con «Vene■ia» en el plano del pago.

## Audio y Whisper (`tr.py voice_final.wav`)
- «¡Chao!» del gancho ✅ («Chao, crees que es adiós y era una promesa»).
- **«eschao vostro»** → Whisper oye «Chao Bostro». No suena a «siao» ni a «zíao», pero el «es-» se diluye. Vale, porque en pantalla pone «S-CIÀO VOSTRO». No hace falta regenerar.
- **«chau»**: sin pista, Whisper oye «chao» en los cuatro. Con la pista «chao, chau» los transcribe como «chau». Lo he comprobado con formantes: «chao» acaba en F1≈510 / F2≈910 Hz (o), y «chau» en F1≈360 / F2≈740 Hz (u). **Se distinguen, pero poco.** El subtítulo y la etiqueta rosa CHAU lo sostienen. Aceptable.
- **«servus»** ✅ («Servus, que latín significa esclavo»).
- **«Ojo» (L5, tempo 1,1): no suena acelerado.** Al contrario: va a 2,2 palabras/s, frente a 3,3 de L6, y es la línea más lenta del vídeo, porque la toma original era pausada. Dura **6,85 s** (22,62–29,47), por encima del tope de 6 s. Lo compensa con 5 planos (OJO, SE VENDE tachado, cortesía, SERVIDOR, A SUS ÓRDENES). No lo toques: subir a 1,2 arriesga que suene a prisa por 0,5 s.
- Errores menores de Whisper («las dicho», «despires») que no se oyen al escuchar.

## Errores visibles (lo que se VE)
1. **8,4–9,1 s: el campanario tapa «Venecia».** La ventana oscura del campanile (`ch_figs.js:145`, x 820–884, y 180–560) cae justo sobre la «c» del titular: se lee «Vene■ia», en la palabra del pago.
2. **34,5–35,1 s: «el único» se ve cortado por la mitad.** Con `keyColor: INK` (`ch_scenes_b.js:140`), el texto sale oscuro sobre el fondo oscuro del espacio, y el marcador amarillo solo cubre el 42 % inferior de las letras. Parece un fallo de render.
3. **30,4–30,9 s: el sol amarillo se monta sobre «dicho hoy?».** `ch_scenes_b.js:79`: `y: -Math.sin(kd*Math.PI)*200` lo sube hasta el titular.
4. **19,3–22,4 s: la etiqueta CHAO de Venezuela queda sobre Brasil** (ver P6).
5. Menores, opcionales:
   - 11,6–12,4 s, «Significa:»: plano medio vacío (bocadillo y rayos), sin óvalo. El gondolero entra tarde y acaba medio tapado por el subtítulo (`gd` en [640,1060]).
   - 60,3–60,6 s: el libro abierto PALABRAS sale descentrado, con la tapa izquierda pegada al borde. Al cerrarse, «HISTORIA · Ep. 25 · ¿Chao = adiós?» sí queda centrado ✅.
   - 60,7 s: unos óvalos grises fantasma junto a la cabeza del Vecino.
   - 61,0 s: el subtítulo «el libro.» sigue encima de la portada durante el barrido del bucle.
   - 51–52,6 s: la mano negra en silueta (`SIL`) pierde el grillete y se lee como una mancha o un guante.
- Sin problemas: no hay precarga de textos ni sellos fuera de tiempo (ESCLAVO a los 13,35 y 48,24 s, MEDIO BARRIO en «barrio»). No hay usuarios ni comentarios inventados. El óvalo no tapa ningún texto. El emú hace su cameo en Chequia («čau») ✅. **El bucle funciona**: el libro se cierra, entra la portada limpia y la mano vuelve a decir adiós.

## Comparación con ep07_ok (el viral)
| | OK (44,7 mil, 74 s) | Chao (61 s) |
|---|---|---|
| Ritmo | líneas de 8–11 s (L3, L4, L8) | ninguna pasa de 8 s; un plano cada 1–2 s. **Chao es más rápido** |
| Gancho | «la palabra más usada del mundo nació como un chiste»: universal | «Crees que es adiós... y era una promesa»: bueno, pero solo le duele a quien dice chao |
| Renovación | Boston → Van Buren → OK Clubs | Venecia → chao/chau → Brasil·Alemania·Chequia → **servus**. **Más recompensas en Chao** |
| Remate | «la palabra que usas 20 veces al día es una falta de ortografía» | «media Europa se saluda como un esclavo» + «esclavo de medio barrio». Al mismo nivel |
| Chispa | menos gag visual | jefe con puro, rellano de vecinos con grilletes, emú «čau». **Más chispa visual en Chao** |

Conclusión: en ritmo y chispa, Chao está igual o mejor que OK. Donde pierde es en el alcance del tema (no todo el mundo siente «chao» como suyo).

## Abogado del diablo
Al español de España o al mexicano que no dice «chao», el «te lo han colado» no le duele. Ve una curiosidad de italiano y se va en el s 8–12, justo en el plano medio vacío de «Significa:». La pregunta final («¿cómo te despides en tu país?») recupera a ese espectador en los comentarios, no en la retención.

## Fugas de retención
- 0–5 s: el gancho aguanta (la mano se mueve y el lazo «?» cae en «promesa»).
- **11,6–12,7 s: «Significa:» con el plano medio vacío**, justo antes del pago. → Que el gondolero entre en `S.F[0]-0.15` y esté más arriba (ver arreglo 5).
- 14,2–17,9 s: la cadena puede sonar a clase. Lo salva la erosión de la piedra «S-CIÀO VOSTRO → CIAO». OK.
- **22,6–29,5 s: el Ojo, 6,85 s.** Lo sostienen 5 planos, así que se acepta.
- 53–57 s: la pregunta final pierde ~2 pts/s. Los bocadillos «???» que se encienden y el «Os leo» ayudan.

## Edición propuesta (por impacto/coste; todo visual, sin voz)
1. [visual] `ch_figs.js:145`: mete el campanile en `<g transform="translate(190,0)">…</g>` (o suma 190 a todas sus x). La ventana sale de debajo de «Venecia» y la torre sigue a la vista, porque `far` mide 1180 px de ancho.
2. [visual] `ch_scenes_b.js:140`: `keyColor: INK` → `keyColor: YEL, hlc: 'rgba(0,0,0,0)'`. Así «el único» sale entero, en amarillo sobre el fondo oscuro.
3. [visual] `ch_scenes_b.js:79`: `* 200` → `* 40`. El sol se queda por debajo del titular.
4. [visual] `ch_scenes_a.js:259`: borra la entrada `ve` (Colombia ya cubre esa zona) o saca su etiqueta del interior de Brasil. Antes, comprueba que no haya ninguna referencia a `ve` en los tiempos.
5. [visual, opcional] «Significa»: el pop de `gd` en `S.F[0] - 0.15` en vez de `S.F[0] + 0.1`, y `gd` en [640, 980] para que no quede bajo el subtítulo.
6. [visual, opcional] Que el subtítulo desaparezca en 60,9 s, antes del barrido a la portada.
- Re-render (`node ../engine/render.js $PWD video`), `python3 -I ../engine/audio.py $PWD ragtime` (la mezcla no cambia) y revisar en la hoja los s 8,5 · 30,6 · 34,8 · 20,8.

## Chispa (alternativas con la voz del Vecino)
- «Esclavo de medio barrio.» (es LA frase del bar; se mantiene)
- Para responder comentarios: «Servidor, servus y chao: tres maneras de decir lo mismo… que eres muy educado 🎩».
- «¿Y "adiós"? Viene de "a Dios": ese sí que se libra 😅» (etimología estándar).

## Publicación
- Texto del post: «Cada vez que dices "chao" prometes algo que no le prometerías ni a tu jefe 😅» · #historia #curiosidades #palabras #aprendeentiktok
- Comentario fijado: «¿Cómo te despides tú? Dime tu país y tu "chao" 👇 (los de Austria ya sé lo que vais a poner 🎩)»
- Portada: fotograma 0 (s 0,0).
