# Ep13 Septiembre — VEREDICTO: ARREGLAR  (71/100)

Exposición estimada: banda B (se parece a **Semana**, 12,2 mil: calendario cotidiano que puedes comprobar contando con los dedos, pero sin pelea. Lo aceptas, dices «anda, es verdad» y te vas. Es difícil que haya debate).

Puertas: P1 ✅ (por poco) · P2 ✅ · P3 ✅ (por poco) · P4 ❌ · P5 ✅ · P6 ✅ · P7 ✅
- **P4 · Portada ❌.** En `miniatura_perfil.jpg` (recorte 3:4 del perfil, desde y=240) el título «SEPTIEMBRE» sale **cortado por arriba**: el título está en top 196 px y el recorte empieza en 240. Además, la hoja que vuela en el fotograma 0 enseña un «8» enorme pegado al «9», y en miniatura se lee «8 9 = 7?». Con eso la pregunta se ensucia. Se arregla con un cambio visual barato (ver edición 1).
- P1, por poco: «septiembre viene de siete» es una curiosidad de cole bastante conocida en España. Lo que poca gente sabe es el *porqué* (marzo = 1, se corrieron dos puestos). Aprueba porque el vídeo vive de ese porqué y no del dato.
- P3, por poco: la primera palabra es el tema y la afirmación acaba a los 3,33 s («…es el mes nueve.»), con cambio de escena a «Cuéntalos». Pero el «tú» solo está implícito en «Cuéntalos», y esa palabra se arrastra 1,43 s (3,48–4,91 s). `medir.py` marca `gancho_apela_a_ti: false`.
- P5: la promesa se paga a los 29,4–30,5 s («…pero nadie les cambió el nombre»), justo por debajo del límite. «Cuadraba perfecto» (20,8 s) ya adelanta media respuesta.
- P6: sin cifras dudosas en pantalla. El bulo de Augusto y febrero va en el «Ojo» y está bien tratado. A verificar: la animación pone enero y febrero **al final** (puestos 11 y 12) antes de pasarlos delante. Las fuentes antiguas no coinciden en dónde se pusieron (algunas meten enero al principio). La voz no lo afirma y no hay número en pantalla, así que pasa, pero no lo repitas en las respuestas.
- P7: `mix_report.json` dice voz −16 LUFS, música −20 LU, SNR 28,2 dB y final −14,1 LUFS. El gancho (0–3,4 s) mide −11,8 LUFS frente a −14,3 del resto, así que va con energía. OK.

Puntuación: Tema 19/25 · Gancho+portada 14/20 · Retención 15/20 · Conversación 9/15 · Chispa 10/15 · Factura 4/5 = **71**

- **Tema 19:** toca la vida del espectador (su mes), se comprueba en el momento (contar) y funciona en España y en Latinoamérica. Le falta el «me lo dices a MÍ y me pica» de Napoleón y OK.
- **Gancho+portada 14:** la idea de portada es buena (objeto gigante + pregunta «= 7?», ya en movimiento), pero en el perfil se ve cortada y con el «8» fantasma. El gancho es claro, pero «Cuéntalos» se arrastra.
- **Retención 15:** la densidad visual es buena: algo nuevo cada 1–2 s, cuadrícula de hojas, dedo que cuenta, emú a los 21,2 s. Pero hay 16 s de contexto seguidos (L2+L3), un «Ojo» de 7,55 s (máximo 6) y una duración de 55,4 s, en el borde bajo.
- **Conversación 9:** la última línea es «¿Te habías dado cuenta? Sí o no»: fácil de contestar, pero no da conversación. Lo salva un poco el comentario fijado.
- **Chispa 10:** «Todos mal», «Cuadraba perfecto» y «…pero nadie les cambió el nombre» funcionan. Pero el Vecino no se mete contigo ni una vez (ningún «te lo han colado»), y no hay una frase de bar clara.
- **Factura 4:** el sello de check tapa «SEPTIEMBRE 7» justo cuando es el protagonista (20–21,7 s). El barajeo de hojas de 24,4–26,4 s queda caótico. El libro final va pegado al borde izquierdo, con cuatro óvalos vacíos encima.

Abogado del diablo: **«Ya lo sabía».** El que conoce «sept = siete» adivina el vídeo en 3 s («lo cambiaron los romanos») y desliza. El gancho no abre un hueco que no pueda cerrar solo. El hueco de verdad («alguien movió el calendario») no llega hasta los 11,5 s, cuando ya se ha ido el 40 %.

Fugas de retención:
- **3,48–4,91 s** — «Cuéntalos» dura 1,43 s, con aire muerto en la zona donde se va el 40 % — subir la cifra/acción a pantalla antes y apretar la palabra (regenerar L0 a tempo 1,0 o recortar el silencio interno).
- **5,2–11,5 s** — la lista octubre/noviembre/diciembre es comprobable y pierde poco. Pero el hueco «alguien movió el calendario» llega tarde — adelantarlo con un chip en pantalla desde 3,3 s: «¿Quién lo movió?».
- **13,2–29,1 s (L2+L3, 16 s)** — un bloque seguido de historia romana (marzo, añadieron enero y febrero, el año pasó a enero), a ~1,2 pts/s, unos −19 pts. Es la fuga principal. Lo peor está en **24,4–26,4 s**: hojas montadas unas sobre otras, MARZO medio tapado y números viejos a la vista — una sola transición limpia (edición 3).
- **37,4–44,9 s (Ojo, 7,55 s)** — supera el límite de 6 s y repite la idea («Es un bulo. No hay ninguna prueba.») — reescribir (edición 5).
- **45,2–51,4 s (CTA sí/no)** — ~2 pts/s y no da comentarios — pregunta abierta y personal (edición 4).

Edición propuesta (ordenada por impacto/coste):
  1. [visual] **Portada (fotograma 0).** Bajar el bloque del título: `ttl` de top 196 a ≥ 300 px, y `q7` («= 7?») y el chip «SEPT-» en la misma proporción, para que «SEPTIEMBRE = 7?» quepa entero en el recorte 240–1680. En el fotograma 0 la hoja voladora `pg8` no debe enseñar el «8»: o va en blanco (hoja arrancada sin número) o empieza más fuera (`k8` de 0,56 a ~0,8). El movimiento se mantiene con el balanceo y los rayos.
  2. [visual] **3,3–5,0 s:** un chip rosa «¿Quién lo movió?» bajo el calendario, que cae cuando acaba «nueve». Así se abre el hueco antes del segundo 5.
  3. [visual] **20,0–21,7 s:** el check amarillo tapa «SEPTIEMBRE 7». Hay que hacerlo más pequeño (×0,6) y moverlo al hueco vacío de abajo a la derecha, o encima de MARZO. El 7 rojo de septiembre tiene que verse entero, porque es el pago. **24,4–29,1 s:** cambiar el barajeo por un único deslizamiento. Enero y febrero entran delante y el resto se corre en bloque. Los números cambian todos a la vez en «dos» (28,15 s), con el sello «+2».
  4. [voz] **L7 (45,2 s):** «O sea: llevas toda la vida llamando «séptimo» al mes nueve. ¿Tú en qué mes cumples? Os leo.» La escena «¿Sí o no?» pasa a mostrar burbujas de comentario con meses («noviembre», «diciembre», «marzo»).
  5. [voz] **L6 (Ojo, de 7,55 a ~4,5 s):** «Ojo: lo de que Augusto le robó un día a febrero… es un bulo. Cero pruebas.» Los sellos BULO / SIN PRUEBAS se quedan igual.
  6. [voz, opcional] **L0:** regenerar con «Cuéntalos» más seco, o con el «tú» explícito: «¡Septiembre significa «séptimo»! Y tú lo cuentas como el nueve. Cuéntalos.» Solo compensa si se regeneran ya L6 y L7.
  7. [visual] **Final (53–55 s):** centrar el libro HISTORIA (ahora va pegado al borde izquierdo) y quitar los cuatro óvalos vacíos con destellos. Comprobar que el rótulo «Ep. 13 · …» queda dentro de la zona segura.

  **Por qué compensa rehacer la voz:** solo con los arreglos visuales (1, 2, 3 y 7) la nota sube a ~75, que no llega a 80. Regenerar L6 y L7 (~170 caracteres de ~25.000 disponibles) sube Conversación a 12 y Retención a 16. Con todo se queda en **~81**. Hay que retocar en la animación los `find()` de L6 y L7 y volver a renderizar. Es trabajo, pero no hay que rehacer el episodio.
  **Nota de estado:** según `CONTEXTO.md`, el ep13 ya se entregó el 17/10 para subirlo. Si ya está publicado, no se vuelve a subir: hay que usar el texto y el fijado de abajo, responder a los meses y aplicar estas lecciones a los pendientes (sobre todo la portada en el recorte 3:4 y el CTA abierto).

Chispa (con la voz del Vecino):
- «Se corrieron dos puestos… y nadie les cambió el nombre. Como el buzón de tu portal: el del segundo se mudó hace años y ahí sigue.»
- «Te lo han colado desde el cole, y no es culpa tuya: es culpa de un romano.»
- «Diciembre significa "décimo" y hace de doce. Si eso te lo hace el GPS, lo devuelves.»

Publicación:
- **Texto del post:** «Septiembre significa «séptimo»… y es tu mes 9 📅 Cuéntalos. ¿En qué mes cumples tú? 🎩 #historia #curiosidades #calendario #sabiasque»
- **Comentario fijado:** «Yo cumplo en noviembre: el «noveno» que hace de once 😅 ¿Y tú en qué mes cumples? Te digo qué número le tocaba 👇»
  Ojo al responder: enero y febrero no tenían número en el primer calendario. Si alguien cumple en esos meses, no se le da un número sin verificarlo.
