# BRIEF COMÚN — 4 pilotos de TikTok (1080x1920, 30 fps)

Estás animando UN vídeo explicativo vertical estilo "Pues ya estaría" (canal de TikTok español muy viral):
ilustración plana con personajes simples con cara, texto cinético editorial, un objeto visual por cada idea,
cambios constantes. La voz, el guion y los tiempos por palabra YA ESTÁN HECHOS. Tu trabajo: la animación completa en HTML/JS,
revisarla visualmente, renderizarla y mezclar el audio.

## Archivos (en tu carpeta de canal `prod/<canal>/`)
- `script.txt` — guion (solo lectura).
- `words.json` / `words.js` — palabras con tiempos `{i,w,s,e}` (segundos, YA sincronizados con `voice_final.wav`).
- `words_table.txt` — tabla legible `índice  inicio-fin  palabra`. ÚSALA para clavar cada escena a su palabra.
- `voice_final.wav` — locución final (no la toques).
- `base.css`, `fonts/` (symlink) — fuentes disponibles: `Instrument` (serif editorial, tiene italic), `Bricolage` (grotesca 200–800),
  `SpaceMono` (400/700), `Fredoka` (redondeada 300–700), `SpecialElite` (máquina de escribir), `Playfair` (400–900 + italic),
  `Rye` (western), `PlexMono` (400/700), `DMSerif` (+italic), `JetBrains` (mono 100–800), `InterV` (100–900).
- Escribe tu animación en `index.html` (ya existe un esqueleto de prueba en letra; sobrescríbelo).

## Motor (`prod/engine/engine.js`, cárgalo con `<script src="../engine/engine.js">` DESPUÉS de `words.js`)
Globales:
- `w(i)` inicio de la palabra i; `we(i)` fin. `w("frase")`/`find("frase", desde)` busca por texto (sin tildes/puntuación).
- `p(t,t0,d=0.4,ease)` progreso 0..1; `inOut(t,t0,t1,din,dout)`; `pop(t,t0,d)` escala con rebote (0→1).
- `E.outCubic, E.outBack, E.outBackBig, E.inOutCubic, E.outElastic, E.outBounce, E.inCubic, E.linear`.
- `el(tag|html, parent, css, html)` crea elemento ABSOLUTO (parent null = #stage). `set(e,{x,y,s,sx,sy,r,o})` aplica transform/opacidad.
- `wobble(t,f,a,ph)` respiración idle; `shake(t,t0,d,amp)`; `counter(t,t0,d,from,to)`; `fmt(n,dec)` formato es-ES (3.000);
  `typeText(str,t,t0,cps)`; `glitch(t,t0,d)` → text-shadow RGB; `clamp, lerp`.
- `sfx(nombre, tiempo, ganancia)` — REGÍSTRALOS UNA VEZ al cargar (no dentro de frame). Disponibles:
  pop, pop2, click, tick, whoosh, swoosh_up, stamp, thud, ding, bell, ping, cash, error, type, paper, boing, burst, sparkle,
  glitch, squish, gulp, heart, tada, sad, drumroll, emu. Úsalos con gusto: un pop en cada aparición importante, whoosh en transiciones,
  stamp en sellos, ting/ding en cifras clave. No satures (máx ~1 cada 0,7 s de media).
- Define `window.frame = t => {...}` (pinta TODO el estado en función de t) y al final `Engine.start({captions:{...}})`.
  Opciones de captions: `{y, font, size, weight, bg, color, hi, radius, pad, upper, shadow, border, maxWords}`.

## Reglas técnicas (obligatorias)
1. DETERMINISTA: todo se calcula a partir de `t`. Nada de CSS transitions/animations, setTimeout, Date, Math.random sin semilla
   (si necesitas aleatoriedad, usa un PRNG con semilla fija). El render salta fotogramas en cualquier orden.
2. Sin red: todo dibujado con SVG inline/CSS. Sin imágenes externas. Puedes crear SVG como strings.
3. Rendimiento: crea los elementos UNA vez fuera de frame(); en frame() solo cambia transform/opacity/texto/visibility.
   Evita filtros pesados (blur grandes) en muchos elementos.
4. Zonas seguras TikTok: contenido importante en x 60–940, y 170–1300. Nada importante en la columna derecha (x>940, y 700–1500)
   ni abajo (y>1520). Subtítulos karaoke en y≈1380 (dentro de esa franja libre, centrados).
5. Escribe con tildes y ñ correctas. Números en formato español (3.000 €, 22 %, 9,87 €).

## Lenguaje visual (lo que hace que retenga — CÚMPLELO)
- **Una frase = un plano/estado nuevo.** Algo cambia visiblemente cada 1–2 s. Nunca un plano estático >2,5 s
  (si una frase es larga, añade micro-movimiento: contadores, elementos que entran, cámara que se acerca, idle wobble).
- **Titular superior** (y≈200–330) en serif editorial con la PALABRA CLAVE en itálica de color de acento; aparece palabra a palabra
  sincronizada con la voz. Cambia con cada idea.
- **Cifras gigantes** con contador animado cuando la voz las dice.
- **Contenedores visibles** para cada bloque: lista que se rellena y se tacha, marcador, puertas numeradas, balanza, línea de tiempo,
  tarjetas, encuesta. El espectador debe entender el vídeo SIN SONIDO.
- **Personajes con cara** (ojos punto + sonrisa/boca), simples, con personalidad: parpadean, respiran (wobble), reaccionan
  (sudan, gota, signos de interrogación, estrellitas). Reutilízalos a lo largo del vídeo.
- **Chips de credibilidad** pequeños (fechas, "ejemplo", "fuente: …").
- **Transiciones**: entradas con outBack/pop, salidas rápidas (0,2 s), whip/slide entre bloques, un glitch RGB en el remate fuerte.
- **Estructura** (ya está en el guion): gancho (0–3 s, con algo potente en pantalla en el fotograma 1, NUNCA fondo vacío) →
  agenda numerada → desarrollo → "Ojo" (giro honesto, con sello/etiqueta) → frase-resumen (gran tipografía, momento citable) →
  encuesta A/B/C con UI de quiz + 2–3 comentarios de ejemplo ("Yo, la A") → frase de cierre + TARJETA FINAL (logo del canal hecho
  con sus personajes, título del episodio, fuentes, fecha 16/10/2026) que dura ~3 s tras la última palabra.
- Calidad de ilustración: cuida proporciones, grosor de línea consistente (4–6 px), esquinas redondeadas, sombras sutiles,
  una paleta cerrada. Que parezca de un estudio, no un PowerPoint.

## Proceso
1. Lee `words_table.txt` y tu storyboard. Construye `index.html`.
2. Contactos de revisión: `bash ../engine/sheet.sh $PWD 1` (desde tu carpeta; usa rutas absolutas) → genera `sheet_01.jpg…`
   (6x3 miniaturas, 1 por segundo). MÍRALOS TODOS con la herramienta Read. Para detalle, mira capturas sueltas en `shots/`.
   Revisa: textos cortados o solapados, zonas seguras, planos vacíos/estáticos, legibilidad, sincronía con la voz.
3. Itera hasta que esté a nivel profesional (mínimo 2 rondas de revisión completas).
4. Render final: `node ../engine/render.js $PWD video` (tarda ~5–10 min; lánzalo con timeout largo o en background y espera).
5. Audio y mux: `python3 -I ../engine/audio.py $PWD <estilo>` → `final.mp4`.
6. Verifica: `ffprobe` (duración ≈ voz + 3 s, 1080x1920, audio aac) y extrae 4–5 fotogramas del final.mp4 con ffmpeg para comprobar.
7. Informe final breve: ruta de final.mp4, duración, qué escenas hiciste, cualquier problema pendiente.

No toques otros canales NI el motor (otros 3 animadores lo usan a la vez). Si necesitas cambiar algo del motor,
redefine la función en tu propio index.html después de cargarlo (p. ej. tu propia versión de captions con `captions:false`
en Engine.start y tu lógica en frame) y avisa en el informe.
