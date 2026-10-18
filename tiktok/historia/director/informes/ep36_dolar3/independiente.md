# Ep36 Dólar v3 — VEREDICTO: ARREGLAR  (72/100) · director independiente (sin leer informe.md)
Exposición estimada: banda B (se parece a OK porque es un símbolo que usas cada día y te dice que lo lees mal; pero tiene menos pelea, porque en Latinoamérica el $ ya es el peso de todos los días y mucho latino pensará «ya lo sabía»).

Puertas:
P1 ✅ (justo: lo de la P y la S casi nadie lo sabe, aunque en Latam el $ = peso es cotidiano) · P2 ✅ 5/5 · P3 ❌ · P4 ✅ · P5 ✅ («pesos» llega a los 6,3 s) · P6 ✅ · P7 ✅ (SNR 28,2 dB; final −14,1 LUFS) · P8 ⚠️ (aprobado por los pelos) · P9 ✅ · P10 ✅ · P11 ❌
- P3 ❌: el gancho dura 3,9 s (máximo 3,5) y no apela a «tú» (medir.py: gancho_apela_a_ti = false).
- P11 ❌ CONTRADICCIÓN LÓGICA: L0 dice «¡El símbolo del dólar NO es una S!», y L5 (27,7–34,1 s) enseña que la S sigue ahí, montada encima de la P. El espectador piensa «entonces sí es una S». Además, nadie cierra la idea de que la raya ES la P: hay que deducirlo. Es justo el tipo de nudo que el usuario llama «a trompicones».
- P8 ⚠️: el remate (L9, 54,2–60,7 s) repite el gancho y no aporta nada más fuerte (K7 = 0). El dato más potente (1857) llega antes, a los 46 s. La v1 (ep30) cerraba con los octavos de Wall Street, y esta versión los ha perdido.

Línea 1, «en talidad»: Whisper small oye «en talidad»; Whisper medium oye «en realidad» con una confianza de 0,99, tanto en el clip como en la mezcla final. «realidad» dura solo 0,51 s (5,30–5,81) y la «re» sale débil. El riesgo es bajo, pero existe. Si se regenera L0, regenerar también L1 (cuesta unos 40 caracteres).

Puntuación: Tema 19/25 · Gancho+portada 15/20 · Retención 15/20 · Conversación 11/15 · Chispa 8/15 · Factura 4/5 = 72

Abogado del diablo: la mitad del público (Latam) paga cada día en «$» = pesos, así que «es una palabra en español: pesos» le suena a obviedad. Y la otra mitad ve que la S sigue dentro del símbolo y concluye que el gancho le ha mentido. Es un «ya lo sabía» más un «pues sí es una S».

Fugas de retención:
- 0,0–3,9 s — gancho largo y sin «tú» — regenerar L0 (ver la edición 1).
- 7,7–10,5 s — marca de 2,8 s (−2,4/−3,2 pts/s, unos 7–9 pts) — es la plantilla Napoleón; se queda, pero es el peaje más caro del vídeo.
- 15,4–15,7 s — fondo de rayos vacío con solo la cabecera «1 P+S=pesos» — meter las monedas ya en ese fotograma.
- 15,7–20,8 s — L4, contexto («hace 300 años… medio mundo»), ~1,2 pts/s — los planos cambian bien; tras «español.» la pausa es de 0,28 s (20,76→21,04), sin respiro antes del dato clave.
- 27,5–28,2 s — papel en blanco entre «de pesos» y «Dos:» — mantener el Pˢ hasta que caigan las fichas.
- 44,5–47,0 s — campana agrietada + barra con bolitas: nadie la va a leer como la Campana de la Libertad, y no se entiende qué pinta — sustituirla por la moneda de peso cayendo en el mostrador de la General Store (escena que ya existe) con el sello «HASTA 1857».
- 47,4–53,8 s — «Ojo» de 6,4 s (máximo 6) que menciona las «columnas de Hércules» sin saber qué son. El dibujo de las cintas en S lo salva a medias.
- 54,2–54,9 s — pantalla rosa vacía en «O sea:» — que el $ entre ya en «O sea».
- 54,2–60,7 s — el remate repite el gancho: ver la edición 3.

Edición propuesta (ordenada por impacto/coste):
  1. [voz] L0 (≈75 caracteres): «¡El símbolo del dólar no es la S que tú crees! Es una palabra en español.» Mete el «tú», quita la contradicción (sí hay una S, pero es la de «pesos») y la portada «¿EL $ NO ES UNA S?» sigue valiendo.
  2. [voz] L5 (≈120 caracteres): «Dos: de tanto escribirlo deprisa, la S se fue montando encima de la P... y de la P solo quedó la raya que ves en el dólar.» Así se cierra el nudo raya = P sin que el espectador tenga que deducirlo.
  3. [voz] L9 (≈80 caracteres): «O sea: el dinero más poderoso del mundo lleva escrito «pesos»... y en español.» Es citable y más fuerte que el gancho; sobre el morph $ → Pˢ que ya existe.
  4. [voz, gratis] gap_after 0,7 en L1, L4, L5 y L7 (el usuario pide respiro de 0,6–0,9 s tras cada dato; ahora es 0,5). No gasta créditos.
  5. [visual] 44,5–47,0 s: fuera la campana; moneda que cae en el mostrador + sello «HASTA 1857».
  6. [visual] Rellenar los tres huecos vacíos (15,4 · 27,6 · 54,3 s) arrastrando el plano anterior o adelantando el siguiente unos 0,4 s.
  7. [voz, opcional] Ojo ≤ 6 s: «Ojo: hay quien dice que son las columnas de Hércules. Bonito, pero las pruebas dicen «pesos».»
  8. [voz, opcional] Si se rehace L0, rehacer también L1 tal cual (para descartar «en talidad»).
  Con 1+2+3+4+5+6 (unos 275 caracteres de voz, menos de 30 min de animación): ~80–82.

Chispa:
- «El dinero más poderoso del mundo lleva escrito «pesos»… y en español.»
- «Los gringos copiaron el peso hasta en la letra pequeña.» (para el comentario fijado o una respuesta)
- «No es una S, es una P con prisa.»

Publicación:
- Post: «Ese $ que escribes cada día no es la S que crees: pone «pesos», en español. Te lo cuento en 3 pasos. #historia #dolar #curiosidades #espanol»
- Comentario fijado: «En México o en Argentina el $ es el peso… ¿y en tu país cómo le llamáis al dinero: pasta, plata, lana, guita? 👇»
