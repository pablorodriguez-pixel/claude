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
