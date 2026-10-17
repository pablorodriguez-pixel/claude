# BIBLIA DE LA SERIE — «Ya lo decía la abuela» (refranes con la Abuela Remedios)

Lee también BRIEF.md (motor, reglas técnicas, REGLA DE AUDIO y REGLA DEL GANCHO). Esto es lo específico de la serie.

## Kit visual (OBLIGATORIO usarlo)
`prod/abuela_kit/` — LEE `KIT.md` entero y mira `demo.html` antes de empezar. Cárgalo desde tu episodio con rutas relativas
(`../abuela_kit/stitch.js`, `../abuela_kit/abuela.js`, `../abuela_kit/marco.js`). NO edites el kit (lo usan otros 2 animadores a la vez):
si necesitas algo nuevo (sprites, objetos), créalo en tu propia carpeta con la API del kit.

## Estética (idéntica en toda la serie)
TODO es PUNTO DE CRUZ bordado sobre tela Aida crema, como los dechados de casa de la abuela. Personajes, objetos, mapas y titulares
se BORDAN (stitchIn) al aparecer; las transiciones fuertes usan telas (vichy rojo, floral, pana) o el gesto «tirar del hilo».
Titulares cortos en la fuente bordada del kit; textos secundarios en `Fredoka`/`DMSerif` sobre parches o etiquetas de tela.
Subtítulos (motor): pill de tela crema #FFF8EC con borde pespunte granate (`border:'4px dashed #7A1F2B'`), texto #1E1A18, palabra activa
#C8102E, y≈1380, Fredoka 700 size 52, maxWords 3. Paleta de hilos del kit; nada de colores fuera de ella.
Lip-sync: la boca de la abuela se abre/cierra mientras habla (según WORDS), parpadea cada ~3–4 s, y usa sus gestos
(cejas arriba en sorpresas, gafas bajadas en «Ojo», dedo levantado al explicar, mano con hilo rojo en «tirar del hilo»).

## Elementos fijos de cada episodio
1. GANCHO (línea 0, fotograma 1 ya lleno): el refrán BORDÁNDOSE en grande y la abuela visible (bastidor grande o mediano) con cejas
   arriba. Nada de pantalla vacía. Energía: zoom/punch-in, puntadas rápidas con sfx `stitch`.
2. GIRO (línea 1): la revelación en pantalla (p. ej. tachar «A» y bordar «DE»; un parche «¿LA POLICÍA?»; un mapa con chincheta «BABIA EXISTE»).
3. MARCA (línea 2: "¡Hola, cariño! Soy la abuela Remedios. Ven, siéntate aquí conmigo, corazón... que vamos a tirar del hilo."):
   la abuela a pantalla completa en su bastidor grande saludando; en «tirar del hilo» ella TIRA DEL HILO ROJO y el plano se deshace
   (unravel) revelando el siguiente. Es la firma del canal: que luzca. Luego la abuela pasa a su bastidor pequeño en una esquina
   (abajo-izquierda, sin pisar subtítulos ni la columna derecha) durante el desarrollo, hablando.
4. DESARROLLO: una idea = un plano bordado nuevo cada 1–2 s (personajes en punto de cruz con cara, objetos, mapas, fechas, cifras).
   Chips de credibilidad como etiquetas de tela («siglo XV», «1476», «León»).
5. «OJO» (línea que empieza por "Ojo"): parche «¡OJO!» cosiéndose + parche «LEYENDA» o «LO QUE MÁS SE CUENTA»/«DE VERDAD» según el guion;
   abuela con gafas bajadas.
6. RESUMEN/MORALEJA: el refrán correcto bordado en un dechado grande con cenefa (momento citable, captura de pantalla).
7. PREGUNTA A LOS COMENTARIOS: UI de comentarios hecha de tela/papel con 2–3 comentarios de ejemplo de abuelas de la gente.
8. CIERRE ("Anda, corazón, sígueme, que cada día te desenredo un refrán nuevo... y apúntatelo, que luego se te olvida."): botón SEGUIR cosido (ver mecánicas) + aguja apuntando el refrán en una libretita o las tijeras
   cortando el hilo (sfx `snip`) → TARJETA FINAL del kit (logo «ya lo decía la abuela» + título del episodio + «Fuente: …») ~3 s.

## Mecánicas para que la gente SIGA la cuenta (obligatorias)
- **Colección numerada:** etiqueta de tela fija arriba-izquierda (y≈180) «REFRÁN Nº 1/2/3» desde el fotograma 1. Da sensación de serie.
- **El dechado de la abuela:** en la tarjeta final aparece un DECHADO grande (cuadro de bordado) con una cuadrícula de casillas
  (p. ej. 5x4); las de episodios anteriores ya bordadas (iconitos), la de ESTE episodio se borda en ese momento, y el resto vacías con
  «?» o puntitos. Texto bordado/etiqueta: «Colección de la abuela — sígueme para completarla». Es el motivo para seguir.
- **CTA final (última línea "Anda, corazón, sígueme…")**: un botón «+ SEGUIR» bordado (estilo botón de TikTok, en hilo rojo) que se
  cose en pantalla junto al avatar de la abuela en su bastidor, con un dedo de la abuela señalándolo y sfx `stitch`+`ding`.
- **Micro-recordatorio a mitad** (justo tras la MARCA, ~1,5 s, discreto): etiqueta pequeña cosida «un refrán nuevo cada día 🧵»
  junto al bastidor pequeño. Solo una vez.
- **Bucle**: el último plano (dechado/tarjeta) debe conectar visualmente con el primero (tela crema + refrán) para que el re-play sea suave.

## Edición (nivel alto)
Ritmo TikTok: cambio visible cada 1–2 s, punch-ins (escala 1→1,08) en palabras clave, sacudida suave en remates, transiciones con tela
(cloth_whoosh) o deshilado; nada de planos estáticos >2 s; la abuela SIEMPRE reacciona (cejas, guiño, gafas). Cada dato con su imagen
bordada. Revisa las hojas de contacto con ojo crítico de editor: si un plano se ve vacío, pobre o confuso, rehazlo.

## SFX y música
Sfx recomendados: `stitch` (bordar), `thread_pull` (tirar del hilo), `snip` (tijeras), `knit`, `sewing_machine` (rachas rápidas),
`cloth_whoosh` (transiciones de tela), `teacup`, `pop`, `ding`, `stamp` (parches), `bell`. NO uses `granny_laugh` (es otra voz).
Música: `python3 -I ../engine/audio.py $PWD abuela`.

## Rigor
Los datos están en el guion; no añadas en pantalla cifras/nombres que no diga la voz. Lo que es leyenda se marca como tal.

## Notas tras ver el kit
- Contraste: texto bordado sobre parche crema → usa granate/marino oscuros, no rosa claro. Titulares grandes con cell suficiente para leerse en móvil.
- El dechado-colección de la tarjeta final: 12 casillas (4x3). Iconos de la colección (mismos en todos los episodios): Nº1 = una SILLA (Sevilla),
  Nº2 = una MANGA VERDE (Mangas verdes), Nº3 = una MONTAÑA con corona (Babia). El episodio N muestra bordadas las casillas 1..N-1 ya hechas,
  borda la N en ese momento (con aguja, sfx stitch) y deja el resto con «?».
- Siempre `order` fijo en unravel (ver KIT.md).

## CAMBIOS v2 (feedback del cliente) — PRIORITARIOS sobre lo anterior
- NOMBRE NUEVO DEL CANAL: «POR ALGO SE DICE» (la abuela Remedios sigue siendo la protagonista). Todos los rótulos, logo y tarjeta final
  con este nombre (el kit lo actualiza en marco.js: Marco.logo/endCard). Ya no se usa «ya lo decía la abuela».
- MARCA (línea 2) ahora: "Soy la abuela Remedios, y esto... por algo se dice." — corta (~3 s): bastidor grande, guiño, y el nombre
  «POR ALGO SE DICE» se borda de golpe (rápido) y se deshace con el hilo rojo. Nada de «siéntate conmigo».
- CIERRE (última línea): "Y sígueme, cariño, que cada día te cuento otro... porque por algo se dice." → botón + SEGUIR + dechado-colección
  + tarjeta final con el logo nuevo.
- CTA penúltima línea: "Dime sí o no" → dos botones bordados GIGANTES SÍ / NO (en Mangas: etiquetar a alguien).
- MÁS DINÁMICO: voz nueva más rápida y con chispa (≈165 ppm). Cortes cada ~1 s, punch-ins más agresivos (1→1,12), transiciones más
  rápidas (0,25 s), puntadas más rápidas (stitchIn ≤0,5 s salvo el gancho), menos tiempo de bastidor grande, más planos con personajes.
- FOTOGRAMA 1 = PORTADA: el refrán/afirmación ya legible en grande (3–6 palabras) + veredicto rojo (sello «¡MAL!», «¡EXISTE!», «?»).
  No empieces con la tela vacía.
