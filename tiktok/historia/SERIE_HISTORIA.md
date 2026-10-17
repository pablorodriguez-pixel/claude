# BIBLIA DE LA SERIE — «Esto no venía en el libro» (canal de TikTok de historia)

Lee también BRIEF.md (motor, reglas técnicas, REGLA DE AUDIO y REGLA DEL GANCHO). Esto es lo específico de la serie.

## Referencia visual
El episodio piloto ya publicado está en `prod/historia3/` (kit copiado en tu carpeta `kit/`):
`figs_v1.js` (emú, Meredith, soldados, granjero, ametralladora, camión, mapa, trigo, tramas de grabado `#hA #hB #hD`, helpers P/D/cut/clipG/limb/rng/uid…),
`figs_v2.js` (EL VECINO — busto de grabado con bombín, bigote, pajarita y abanico —, emú frontal, mano gigante, silla, humillómetro, libro…),
`base_v2.js` (helpers: chip, stamp, colorHit, mk*, AV…), `globals_v2.js` (marco ovalado del Vecino, chat de época…), y como ejemplo
de uso `ref_index_historia3.html`, `scenes_a.js`, `scenes_b.js`, `frame_v2.js`, `sfx_v2.js`.
LÉELOS antes de empezar y REUTILIZA todo lo posible (copiando a tu carpeta y adaptando; no edites prod/historia3).
Ojo: el código del piloto tiene tiempos absolutos de SU locución; en tu episodio clava todo a TU words_table.txt.

## Estética (obligatoria, idéntica en toda la serie)
Collage de grabados antiguos recortados (estilo Monty Python/Terry Gilliam): tinta sepia #2B2118 con tramas de líneas, papel envejecido
#EADFC8 con manchas y bordes quemados, recortes con borde blanco irregular y sombra dura, mandíbulas de bisagra.
Acentos: amarillo fosforito #FFE600 (subrayado de rotulador que se pinta), rosa fosforito #FF3EA5 (chips, flechas), rojo sellos #C8102E.
Titulares Playfair 800/italic con palabra clave subrayada en amarillo; rótulos Rye/SpecialElite; subtítulos del motor: pill negra #111,
texto blanco, activa #FFE600, y≈1380, Bricolage 800 size 50.
Crea las figuras nuevas de tu tema (personajes, objetos, mapas) EN ESE MISMO ESTILO de grabado con tramas.

## Elementos fijos de cada episodio
1. GANCHO (línea 0): fotograma 1 con imagen potente + la afirmación en grande. Nada de pantalla vacía. Al acabar la línea 0 o la 1,
   cae un SELLO grande: «MITO» (episodios que desmontan un mito) o «DATO REAL» (episodios de dato sorprendente) — rojo, con stamp + shake.
2. MARCA (línea 2: "Soy tu vecino, y esto no venía en el libro."): El Vecino a pantalla completa en su balcón (como la escena C del piloto),
   ~2–3 s, con su abanico. Rápido y con gracia; nunca más largo que la propia frase.
3. EL VECINO en su marco ovalado dorado (abajo-izquierda, sin pisar los subtítulos) durante el desarrollo: mueve la mandíbula con la voz
   (who=="VECINO"), reacciona (abanico en los escándalos, se tapa la boca al reír, cejas). Puede ocultarse en planos a pantalla completa.
4. «¡OJO!»: sello en la línea que empieza por "Ojo".
5. 2–3 GOLPES DE COLOR (página completa amarilla o rosa con siluetas negras y texto enorme) en los remates más fuertes.
6. CAMEO DEL EMÚ: en algún momento (una vez), el emú del piloto asoma por un borde o aparece de fondo y mira a cámara 0,6 s. Gag de canal.
7. CTA (penúltima línea): pantalla de comentarios con 2–3 comentarios de ejemplo de usuarios ficticios (no afirmes datos en ellos).
8. CIERRE (última línea): libro «HISTORIA» que se cierra de golpe (thud + shake). TARJETA FINAL ~3 s: logo «esto no venía en el libro»
   con El Vecino en su óvalo, «Ep. N · <título>», línea de fuentes. Sin fecha.

## Ritmo
Una frase = un plano. Algo nuevo cada 1–2 s. Planos variados (general / medio / primer plano / golpe de color). Elementos GRANDES
(nada de figuras diminutas perdidas en el papel). Cifras con contador animado. Todo debe entenderse SIN SONIDO.

## Precisión
Usa SOLO los datos del guion (script.txt) y del storyboard. No añadas cifras, fechas ni afirmaciones históricas nuevas en chips o rótulos.
Si un rótulo resume, que no cambie el sentido.

## REGLAS VIRALES (aprendidas de los datos reales del canal: Napoleón 29,3 mil y OK 21 mil vs Cleopatra 1,2 mil y emú 180)
1. FOTOGRAMA 1 = PORTADA: UN objeto/personaje icónico GIGANTE + la creencia escrita en grande y un veredicto rojo (sello «NO», tachón,
   «¡FALSO!», «¡FALTA DE ORTOGRAFÍA!»). Legible en miniatura (3–6 palabras enormes). Nada de textos pequeños ni escenas complejas.
2. Tema universal y gancho que CONTRADICE algo que el espectador cree, apelando a «tú» («te lo han colado»).
3. Bucle abierto numerado («De dos cosas: una… dos…») → contadores/etiquetas «1» y «2» grandes y visibles en pantalla.
4. CTA de cero esfuerzo: «Dime sí o no» → pantalla con dos botones gigantes SÍ / NO (y comentarios de ejemplo «SÍ 😳», «No, ya lo sabía»).
5. Remate citable en golpe de color, corto, para capturas.

## REGLAS DE RETENCIÓN v2 (medidas en las curvas reales de OK y Semana) — PRIORITARIAS
Datos: el 40 % se va en los 5 primeros s; la marca en el s 7–10 pierde 2,4–3,2 pts/s (el doble que la historia); el contexto
(fechas, lugares, nombres) pierde ~1,2 pts/s y el dato raro/comprobable solo 0,3–0,5; la pregunta final pierde ~2 pts/s; solo
el 2–4 % ve la tarjeta final.
1. SIN MARCA AL PRINCIPIO: del gancho se pasa directo a la historia. La marca es la ÚLTIMA frase:
   "Soy tu vecino... y esto no venía en el libro." (El Vecino en su balcón, rápido) y el libro HISTORIA se cierra.
2. SIN TARJETA FINAL de 3 s: el vídeo termina con el libro cerrándose y los últimos ~0,4 s enlazan con el fotograma 1 (bucle).
   El rótulo «Ep. N · título» puede ir pequeño sobre el libro.
3. Gancho = afirmación que contradice + "tú", nunca pregunta, y SIN dar la respuesta.
4. Lo que se promete en el gancho se paga antes del segundo 30.
5. Contexto en UNA línea; el dato raro y comprobable cuanto antes. «Ojo» ≤ 6 s.
6. Remate + pregunta (sí/no) en UNA sola frase.
7. Duración objetivo 55–65 s.
8. NADA DE CONTADORES que pasen por cifras intermedias (años, km, kg): el valor final aparece DIRECTO con golpe de sello en
   la palabra. Un fotograma con «1926» o «4.500 km» es un dato falso en pantalla (y puede ser la miniatura de alguien).

## REGLAS v3 (datos del perfil: Napoleón 53 mil, OK 39 mil, Hora 12 mil, Semana 11 mil, Einstein 7,6 mil vs SOS/Vikingos/Muralla/Colón < 750)
- TEMAS: cosas del día a día del espectador con historia oculta (palabras, letras, calendario, costumbres, su cuerpo, España). Nada de
  «historia de otros» ni mitos ya muy desmontados en internet.
- FOTOGRAMA 0 = PREGUNTA, NO RESPUESTA: el objeto grande + el planteamiento (p. ej. «SEPTIEMBRE = 7?» con un calendario en el 9) y algo
  ya en MOVIMIENTO. El veredicto (sello) cae cuando la voz lo dice, nunca antes. No destripes el gancho en la portada.
- La primera palabra de la voz es el tema (sin «Oye», «Que no», «Lo siento»).
