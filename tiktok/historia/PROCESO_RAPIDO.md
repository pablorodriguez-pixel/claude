# Proceso rápido (19/10) — producir sin quemar tokens

**Lee SOLO esto** para producir. CONTEXTO.md, RUBRICA.md, SERIE_HISTORIA.md y BRIEF.md son de consulta: abre la sección que necesites
con `grep -n`, nunca enteros. (Antes cada episodio leía ~60 KB de documentos, y cada director independiente los volvía a leer.)

## Lo que gasta y cómo se evita
| Antes | Ahora |
|---|---|
| 1 agente animador por vídeo + 2–3 directores independientes, cada uno releyendo todo | **0 subagentes.** Una sesión, un director en texto sobre la ficha/guion |
| Escribir ~1.500 líneas de JS a mano por episodio, con índices de palabra fijos (`K.x = ws(i+13)`) | Copiar el episodio más parecido y cambiar solo textos y figuras; tiempos con `find('frase')` |
| Mirar 4–6 hojas de 18 fotogramas por ronda, 2+ rondas, más f_*.jpg sueltos | **1 imagen**: `hoja.jpg` (20 fotogramas cada 3 s). Solo se mira otra si la QA marca algo |
| Leer logs de render, ffmpeg y Whisper enteros | `engine/hacer.sh` lo manda todo a `<ep>/logs/` y devuelve ≤ 10 líneas |
| Versiones v1→v4 por fallos de reglas | `engine/qa.py` comprueba las reglas en texto ANTES de renderizar |
| Leer transcripciones de otras sesiones | El traspaso es este archivo + la sección «Estado» de CONTEXTO.md |

## Edición (20/10): OBLIGATORIO leer `director/EDICION_NAPOLEON.md` antes de escribir ep.js. La plantilla rápida de chips + emojis queda prohibida.

## Pasos (por episodio)
1. **Ficha de 4 líneas + CURVA de 4 escalones** (gancho, portada, pregunta de bar, remate; ver `director/referencias/resuelta_grefg/NOTAS.md`) → «sí» del usuario. Fichas actuales: `director/FICHAS_19-10.md`.
2. **Guion** (`lines_in.json`) con la plantilla de `director/GUIONES_V3.md`. Director en texto, una pasada, con las puertas de abajo.
   Cifras en letra. Línea 0 ≤ 3,5 s, «Ojo» ≤ 6 s, penúltima «¿…? Os leo.», última «Y esto... no venía en el libro.»
3. `bash ../engine/hacer.sh epNN_tema voz` → si la QA falla, arreglar solo esa línea (borrar `clips/NN.*`) y repetir.
4. Animación: copia `index.html` de ep40_hora y escribe SOLO `ep.js` (≈150 líneas). Las piezas fijas (portada, marca en el balcón, cabeceras 1/2/3,
   sellos, golpes de color, óvalo del Vecino, emú, pregunta final, libro que se cierra, bucle y efectos de sonido) están en `engine/story.js`;
   figuras nuevas en `engine/figs_extra.js` (mariposa, red, cañón, cama, sol, marco, Gioconda, nabo, calabaza, diablo, corona, barco…).
   Tiempos por texto: `L(n)` línea n, `Q('frase')` inicio de la frase (en orden de guion). Plantillas: ep40_hora, ep41_monalisa, ep42_nabo.
   Carpeta: `kit/` (copia de ep07_ok/kit), `base.css` y `fonts -> ../../engine/fonts` (OJO: dos niveles).
5. `bash ../engine/hacer.sh epNN_tema hoja` → mirar `hoja.jpg` UNA vez. Arreglar y, solo si hubo cambios grandes, repetir.
6. `bash ../engine/hacer.sh epNN_tema video` en segundo plano → entregar `final.mp4` con SendUserFile (portada = fotograma 0).
7. Commit y push a esta rama (sin vídeos de más de 95 MB).

## CTA de seguir (21/10: SIN prometer el siguiente vídeo)
Antepenúltima línea, ≤ 6 s, ANTES de la pregunta final. Nunca anunciar el tema del próximo vídeo (el usuario no publica siempre en orden).
Frase que motiva (beneficio para quien sigue): «Sígueme... y en la próxima cena, el que lo cuenta eres tú.» En ep.js: `sigueme(n, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme')`
— el Vecino señala con flecha y mano el «+» real de TikTok (barra derecha, y≈1040).

## Puertas que el director comprueba (resumen de RUBRICA.md)
P1 no es un mito quemado · P2 toca su vida, le dice que se equivoca, lo comprueba ya, vale para España y Latinoamérica, da debate (≥ 4/5)
· P3 gancho = tema + «tú» + contradice, ≤ 3,5 s · P4 portada legible a 150 px, ≤ 6 palabras, pregunta · P5 promesa pagada antes del s 30
· P6 lo dudoso solo en el «Ojo» · P8 lo más fuerte al final · P9 un solo guiño a cámara · P10 prueba del bar · P11 de corrido, frases completas.
Nada de «historia de otros» (Garbo/Jessop/Petrov no funcionaron), ni votaciones, ni «Sí o no».

## Audio del motor
Resuelto el 19/10: 25 efectos en `engine/el_sfx/` (19 de `canal-lata-de-la-abuela` + 6 regenerados) y `engine/el_music/ragtime.wav` (30 s, en bucle). Ojo: .gitignore los ignora; para subirlos hace falta `git add -f`.

## Portada (20/10: el amarillo es la seña del canal)
Por defecto: fondo `PAPEL` + `rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0)` y texto INK.
Otro color solo de vez en cuando (máx. 1 de cada 5) para que el feed no se vea distinto.

## Ahorrar SIN bajar calidad (20/10) — se ahorra en voz y en piezas, NUNCA en edición
**Voz (lo único que cuesta créditos):**
- Clips reutilizables ya grabados: CTA «Sígueme, que esto en clase no te lo cuentan» = `ep55_azteca/clips/05.*`; cierre «Y esto… no venía en el libro» = `ep55_azteca/clips/11.*`. Copiar `.json/.mp3/.wav` al índice de línea que toque.
- Regenerar solo las líneas que fallen el QA, nunca el episodio entero.
- Para reeditar un vídeo ya publicado: misma voz, solo `ep.js` + `hacer.sh <ep> video` (0 créditos).

**Piezas (ahorran tokens de código):**
- `engine/story.js`: Vecino fijo que reacciona (`vecino:{risa,sorpresa,golpes}`) + `textura:true`.
- `engine/escenario.js`: botica (`ESTANTE`, `TARRO`), mar (`OLAS`, `GAVIOTA`), China (`LINTERNA`), noticia que entra girando (`PERIODICO` + `giraPeriodico`), `BOCADILLO`, `lagrima`, `sudor`, `ESTRELLA`, caras para cualquier objeto (`caraF`, plantillas `CARAS`/`CARAC`), `sp(t)` para sfx. Añadir `<script src="../../engine/escenario.js"></script>` tras story.js y no redefinir esos nombres en ep.js.
- Personajes ya hechos: botella con cara (ep64 `botellaInner`/`botFace`), tomate (ep64 `tomateInner`/`tomFace`), sacos y conejo con cara (ep65), Einstein (ep63 `ein_lib.js`), bustos `mkBust` + `face`.
- Cada escenario o personaje nuevo que se cree, pasarlo a `engine/escenario.js` para el siguiente vídeo.

## Temas repetidos (20/10: repetí vikingos=ep05, Colón=ep02 y cumpleaños=ep20/21)
ANTES de proponer o escribir un tema: `ls historia/` y, ante la duda, `head -3 epXX_*/lines_in.json`. Si el tema ya existe, se descarta aunque el enfoque sea otro.
