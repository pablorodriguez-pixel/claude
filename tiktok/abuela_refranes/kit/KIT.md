# KIT VISUAL — «Ya lo decía la abuela»

Todo es **punto de cruz bordado sobre tela Aida**, como los dechados de casa de la abuela.
El kit es JS puro (sin dependencias ni red) y **determinista**: todo se calcula a partir de `t`, y el azar
siempre está sembrado. Se dibuja en un `<canvas>` de 1080x1920 dentro de `#stage`, con el motor común
(`prod/engine/engine.js`: `window.frame(t)` + `Engine.start(...)`).

```
prod/abuela_kit/
  stitch.js         motor de punto de cruz (tela, Sprite, bordar, TIRAR DEL HILO, fuente bordada, hilo, aguja)
  abuela.js         la Abuela Remedios (busto 48x56 celdas) + estados + lip-sync
  marco.js          bastidor, parches con festón, tijeras/dedal/acerico/ovillo/aguja, telas de fondo, logo, tarjeta final
  demo/index.html   demo de 12 s (renderizable: node ../engine/render.js $PWD/demo video)
  demo.html         la misma demo, abrible desde la raíz del kit
  logo_avatar.png   avatar 1080x1080 (exportado de logo/index.html)
  logo/             página del logo + previsualización circular (preview.jpg)
  lab/              hoja de estados de la abuela
  galeria/          galería de mercería, parches y telas (t<2) y tarjeta final (t>2)
```

Orden de carga: `words.js` → `engine.js` → `stitch.js` → `abuela.js` → `marco.js`.

---

## 1. Página mínima de episodio (`prod/<episodio>/index.html`)

```html
<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="stylesheet" href="base.css"></head>
<body><div id="stage"><canvas id="cv" width="1080" height="1920"></canvas></div>
<script src="words.js"></script>
<script src="../engine/engine.js"></script>
<script src="../abuela_kit/stitch.js"></script>
<script src="../abuela_kit/abuela.js"></script>
<script src="../abuela_kit/marco.js"></script>
<script>
const g = document.getElementById('cv').getContext('2d');
const T = Stitch.THREADS, CELL = 20;

// 1) CREA LOS SPRITES UNA VEZ (fuera de frame): cada Sprite cachea sus puntadas.
const TITULO = Stitch.textSprite('MÁS VALE\nTARDE', { cell: CELL, color: T.rojo, shadowColor: T.granate });
const TX = Math.round((1080 - TITULO.pw) / 2 / CELL) * CELL, TY = CELL * 10;   // alineado a la rejilla
const ORDEN_TIRON = { type: 'cols', reverse: true };                            // orden FIJO para deshacer

sfx('pop', w('vale'), 0.8);                                  // sonidos: se registran una vez

window.frame = t => {
  Stitch.drawFabric(g, 0, 0, 1080, 1920, { cell: CELL, ox: TX, oy: TY });   // tela de fondo (cacheada)

  // título que se borda sincronizado con la voz
  TITULO.stitchIn(g, TX, TY, clamp((t - w('más')) / 1.2), { order: 'cols', needle: true, t });

  // la abuela en su bastidor, hablando con lip-sync real
  const st = { mouth: Abuela.lipsync(t), blink: Abuela.blink(t) };
  if (t > w('ojo')) { st.hand = 'finger'; st.brows = 'up'; }
  const ab = Marco.abuelaHoop(g, 520, 1100, 300, st, { t, skirt: true });

  // parche «¡OJO!» que se cose
  Marco.patch(g, 770, 820, '¡OJO!', { k: clamp((t - w('ojo')) / 1.2), t, cell: 10, bold: true,
    color: T.rojo, border: '#FFFFFF', textColor: '#FFFFFF', shadowColor: T.granate, rot: -0.12 });
};
Engine.start({ captions: { y: 1380, font: 'Fredoka', bg: '#7A1F2B', hi: '#E0A526' } });
</script></body></html>
```

`base.css` y `fonts/` del episodio son los de siempre (copia/symlink de `engine/`).
Si no hay locución todavía, crea `words.js` con `window.WORDS=[]` y usa `Engine.start({captions:false, duration:12})`.

### Lip-sync con `window.WORDS`

`Abuela.lipsync(t, words = window.WORDS, opt)` devuelve la boca:
- dentro de una palabra → alterna `'open'` / `'half'` (~8 golpes por segundo; arranca abierta);
- palabra muy corta (< 0,12 s) → `'half'`; últimos 50 ms de la palabra → `'half'`;
- fuera de palabra → `'closed'` (o `opt.rest`, p. ej. `'smile'` en los silencios).
Opciones: `{ rate: 8, rest: 'closed' }`. Hace búsqueda binaria, así que es barato por fotograma.

```js
const mouth = Abuela.lipsync(t, window.WORDS, { rest: 'smile' });
// remates: risa en la gracia, «o» de sorpresa…
const st = { mouth: t > w('silla') ? 'laugh' : mouth, blink: Abuela.blink(t) };
```
Sin locución: `Abuela.talk(t, seed, level)` (ritmo silábico sembrado).

---

## 2. `stitch.js` → `window.Stitch`

### Tela
| Función | Qué hace |
|---|---|
| `drawFabric(g, x, y, w, h, {cell, color, kind, ox, oy, seed})` | Pinta tela Aida en un rectángulo. `ox,oy` alinea la rejilla con el origen de un Sprite (¡hazlo siempre que bordes encima!). |
| `fabric({w, h, cell, color, kind, seed})` | Canvas cacheado. `kind: 'aida'` (huecos) \| `'lino'` (tela lisa con nudos). `color`: `'crema'` (#F3EBDD, por defecto), `'lino'`, `'gris'`, `'azul'`, `'blanco'`, `'rosa'`, `'negro'` o cualquier `#hex`. |

### Sprite (punto de cruz)
```js
const s = new Stitch.Sprite(rows, palette, opt);
// rows: ['..rr..', '.rRRr.', ...]  cada carácter = un hilo; '.' o ' ' = vacío
// palette: { r:'#C8102E', R:'#7A1F2B' }
// opt: { cell: 18 (14–24 recomendado), seed: 1, outline: false|'outer'|'all', outlineColor: '#2B1D16',
//        groups: {char: grupo|null} (qué zonas separa el pespunte), legW: 0.44 (grosor del hilo), tails: 2 (hebras sueltas) }
```
Cada puntada son **dos piernas** (`/` y luego `\`), cada una con **dos hebras** retorcidas, brillo del algodón,
sombra sobre la tela, extremos hundidos en los agujeros, pelusa y variación sembrada (6 variantes por color/tamaño,
pre-renderizadas: se pueden pintar decenas de miles de puntadas por fotograma).

Propiedades útiles: `s.w, s.h` (celdas), `s.pw, s.ph` (px), `s.cells`, `s.cell`.

Transformaciones (en todos los métodos de dibujo): `o = { scale, sx, sy, rot (rad), alpha, anchor:[ax,ay] }`
(`anchor` 0..1; por defecto esquina superior izquierda). `s.toWorld(lx,ly,x,y,o)` / `s.toLocal(...)` convierten coordenadas.

| Método | |
|---|---|
| `s.draw(g, x, y, o)` | Dibujo completo (canvas cacheado: coste ≈ 1 drawImage). |
| `s.stitchIn(g, x, y, k, o)` | **Bordar** (k 0..1). Cada puntada entra en 2 tiempos. `o.order`: `'rows'` (vaivén por filas), `'cols'` (de izquierda a derecha: ideal para texto), `'random'`, `'color'`, `{type:'radial', from:[cx,cy]}`, `{type:'path', from:[cx,cy]}` (camino del hilo), `{type:'custom', order:[...]}`; cualquier objeto admite `reverse:true`. `o.lag` = puntadas «en vuelo». `o.needle:true` + `o.t` → aguja enhebrada en el frente. Devuelve `{x,y}` del frente. |
| `s.unravel(g, x, y, k, o)` | **TIRAR DEL HILO** (k 0..1), ver abajo. |

#### «Tirar del hilo» — el gesto firma
```js
const r = TITULO.unravel(g, TX, TY, k, {
  t,                       // da vida al hilo (ondula, pelusas)
  to: ab.grip,             // a dónde va el hilo: la mano de la abuela o un punto fuera de cuadro
  order: { type: 'cols', reverse: true },   // FIJO (cremallera de derecha a izquierda)
  thread: T.rojo,          // color del hilo suelto (rojo por defecto)
  width: 9, slack: 1,      // grosor y holgura (0 = tenso)
  keepThread: true,        // mantiene el hilo cuando k=1 (para cortarlo o recogerlo después)
  showAt0: true,           // muestra el hilo ya en k=0 (la abuela «coge el cabo»)
  tail: 0,                 // px de hilo que cuelga más allá de 'to'
  ghost: true, fluff: true // marca que deja la tela / pelusas que se escapan
});
// r = { front:[x,y], pts:[...], end:[x,y] } o null
```
Las puntadas se sueltan en orden (sale primero la pierna de arriba), se tensan, se alinean con el tirón y resbalan
hacia el agujero; el hilo suelto conserva los **rizos de las cruces** que tenía y serpentea hasta `to`.
Consejos: pasa SIEMPRE un `order` fijo (si no, se calcula un camino desde `to` y, si la mano se mueve, se recalcula);
usa una curva lenta-rápida (`E.inOutCubic`) y un primer tramo muy lento (el tirón inicial) — ver `demo/index.html`.

### Fuente bordada (bitmap 5x7)
`Stitch.textSprite(str, opt)` → Sprite. Mayúsculas, minúsculas (con descendentes), números, `ÁÉÍÓÚÜÑ áéíóúüñ`,
`¿? ¡! « » . , : ; - ' " ( ) / % € + = … ♥ *`. `'\n'` para varias líneas.
`opt`: `{ cell, color, shadowColor (sombra desplazada 1 celda), colors:[por línea], bold, spacing:1, lineGap:1,
align:'center'|'left'|'right', pad, seed, tails:1, outline }`.
`Stitch.textWidth(str, opt)` da el ancho en celdas (para elegir `cell`: ancho px = celdas × cell).
Referencia de legibilidad en móvil: cell ≥ 10 para rótulos, 18–24 para titulares (12 letras ≈ 66 celdas).

### Otras utilidades
`drawThread(g, pts, {color, width, shadow, smooth, dashOffset})` (hilo de algodón por puntos, suavizado),
`needle(g, x, y, ang, len, color, tailPts)` (aguja con el hilo enhebrado), `THREADS` (paleta),
`wiggle(t, amt)` → `{rot, scale}`, `bounce(k)`, `squash(t, t0)` → `{sx, sy}`, `rng(seed)`, `hash(x,y,s)`,
`mix`, `shade(hex, ±k)`, `rgba`, `lum`, `clamp`, `lerp`, `smooth`.

Paleta `Stitch.THREADS`: `rojo #C8102E`, `rojo2 #E03A3E`, `granate #7A1F2B`, `marino #22356B`, `azul #3E6FB0`,
`verde #3F8F5A`, `mostaza #E0A526`, `rosa #F2A1B5`, `gris #9AA0A6`, `marron #6B4A2F`, `negro #1E1A18`, `blanco #FFFFFF`.

---

## 3. `abuela.js` → `window.Abuela`

La Abuela Remedios: moño gris con florecita, gafas redondas, mofletes sonrosados, pendientes de perla,
rebeca granate de punto con botones dorados y broche, cuello de puntilla. Busto de **48x56 celdas**, contorno en pespunte.

`Abuela.draw(g, x, y, estado, o)` — `o: { cell: 18, scale, rot, anchor, alpha, stitchIn (0..1), unravel (0..1), t }`.

| Estado | Valores |
|---|---|
| `mouth` | `'closed'` · `'half'` · `'open'` · `'smile'` · `'laugh'` · `'o'` (sorpresa) |
| `blink` | `true` → ojos cerrados felices |
| `wink` | `true` → guiño pícaro (ojo derecho) |
| `brows` | `'normal'` · `'up'` (sorpresa, ojos grandes) · `'skeptic'` (una ceja arriba) |
| `glassesDown` | `true` → gafas bajadas, mira por encima |
| `hand` | `null` · `'finger'` (índice levantado: «¡ojo!») · `'thread'` (puño que sujeta el hilo) |
| `look` | `-1` · `0` · `1` (mirada) |
| `chain` | `true` → cadenita de perlas de las gafas |

Cada combinación se construye y cachea una sola vez. Ayudas: `Abuela.grip(x, y, {cell})` (punto del puño en mundo),
`Abuela.lipsync(t, words)`, `Abuela.talk(t, seed, level)`, `Abuela.blink(t, seed)`, `Abuela.sprite(estado, cell)`,
`Abuela.rows(estado)` (las filas de caracteres), `Abuela.PAL`.

---

## 4. `marco.js` → `window.Marco`

### Bastidor
- `Marco.hoop(g, cx, cy, R, o)` — bastidor redondo de madera (aro doble, tornillo de latón moleteado, sombra) con la tela
  tensa. `o: { content(g) (se dibuja en coordenadas de mundo, recortado al círculo), fabric:'crema', cell, ox, oy,
  skirt (tela sobrante ondulada alrededor), scale, rot, alpha, wood }`. Aros y sombreado cacheados por R
  (para animar el tamaño usa `scale`, no cambies `R` cada fotograma).
- `Marco.abuelaHoop(g, cx, cy, R, estado, o)` — **la abuela viviendo en su bastidor** (ventana en esquina con R≈200,
  grande con R≈320–420). `o`: lo de `hoop` + `{ t (respira), bob, zoom, dx, dy, stitchIn, content }`.
  Devuelve `{ cell, x, y, grip:[x,y] }` (el `grip` ya respeta `scale`/`rot`: úsalo como `to` de `unravel`).

### Parche bordado (rótulos)
`Marco.patch(g, cx, cy, texto, o)` — parche con **borde satén festoneado**, pespunte interior y texto en punto de cruz.
`o: { k (0..1: 0–0,18 aparece con rebote · 0,12–0,6 se cose el festón con aguja · 0,5–1 se borda el texto),
color, border, textColor (auto: granate sobre claro, blanco sobre oscuro), shadowColor (null = sin sombra), cell (12), bold,
pad (2), shape:'rect'|'circle', radius, w, h, rot, scale, t, needle }`. Terminado (k=1) se cachea.
`Marco.patchSize(texto, o)` → `{w,h}`.

Combinaciones de la serie:
```js
Marco.patch(g, x, y, '¡OJO!', { k, t, cell: 10, bold: true, color: T.rojo, border: '#FFFFFF', shadowColor: T.granate, rot: -0.12 });
Marco.patch(g, x, y, 'LO QUE MÁS\nSE CUENTA', { k, t, cell: 9, color: T.marino, border: T.mostaza });
Marco.patch(g, x, y, 'LEYENDA', { k, t, cell: 10, color: T.verde, border: '#FFFFFF' });
Marco.patch(g, x, y, 'DE\nVERDAD', { k, t, cell: 10, color: T.rojo, border: '#FFFFFF', shape: 'circle' });
```

### Mercería
| Función | |
|---|---|
| `Marco.scissors(g, x, y, {ang, open 0..1, size})` | Tijeras de bordar (hojas de acero, ojos dorados con rizo). (x,y) = tornillo; las hojas apuntan hacia `ang`. |
| `Marco.snip(g, k, {a, b, at:0.5, color, width, t, size, from, sag})` | Las tijeras entran abiertas (0–0,45), **¡zas!** en k=0,5, los cabos caen rizándose y las tijeras se van. Dibuja también el hilo. |
| `Marco.thimble(g, x, y, s, {metal:'plata'\|'oro', rot})` | Dedal con hoyuelos. |
| `Marco.pincushion(g, x, y, s, {color, pins, rot})` | Acerico-tomate con alfileres. |
| `Marco.yarn(g, x, y, r, {color, end:[[x,y]...], rot, seed})` | Ovillo con cabo suelto. |
| `Marco.needle(g, x, y, ang, len, color, tailPts)` | Aguja enhebrada. |

### Telas de fondo (golpes de color)
`Marco.drawBg(g, kind, x, y, w, h, o)` / `Marco.bg(kind, w, h, o)` (canvas cacheado).
`kind`: `'vichy'` (cuadros rojos; `o.color`, `o.size` 64), `'floral'` (florecitas; `o.base` azul, `o.colors`), `'pana'`
(canalé; `o.color` mostaza), `'aida'`, `'lino'`. Para un golpe: cortina (`clip` de un rect que crece) o corte seco.

### Logo y tarjeta final
- `Marco.logo(g, cx, cy, size, {k, t, state, fabric, ribbon})` — la abuela en su bastidor + cinta bordada
  «ya lo decía / la abuela». `k` anima la entrada (bastidor con rebote, la cinta se cose).
- `Marco.logoCanvas(px, o)` — logo cuadrado sobre vichy (lo que exporta `logo_avatar.png`).
- `Marco.endCard(g, k, {t, title, date:'16/10/2026', bg:'vichy', state})` — tarjeta final 1080x1920:
  logo + parche con el título del episodio + fecha, con ovillo, acerico y dedal. Dale ~1,5 s de `k` y déjala ~3 s.

Regenerar el avatar: abre `logo/index.html` y ejecuta `LOGO_PNG()` (data URL), o en Node con Playwright evalúa
`render(0); LOGO_PNG()` y guarda el base64.

---

## 5. Reglas de oro
1. **Una sola rejilla por tela**: usa el mismo `cell` para la tela y lo bordado encima, y alinea con `ox, oy` (o
   coloca los sprites en múltiplos de `cell`). Telas distintas (bastidor, parche) llevan su propia rejilla.
2. **Crea sprites fuera de `frame`** y reutilízalos (los textos, también). Cambiar el texto = crear otro sprite una vez.
3. `R` del bastidor y `cell` de cada sprite, fijos; anima con `scale`/`rot`.
4. El hilo rojo suelto es el hilo conductor de la serie: el `unravel` siempre termina en la mano de la abuela
   (o fuera de cuadro), y lo cortan las tijeras (`snip`) en el remate.
5. Zonas seguras TikTok (x 60–940, y 170–1300); la mercería decorativa puede vivir abajo y en los bordes.
6. Rendimiento medido: la demo completa (12 s, 360 fotogramas) se renderiza en ~1 min.

## 6. Paleta y tono
Tela crema `#F3EBDD`; hilos de la paleta de arriba; granate de la rebeca `#7A1F2B`; rojo del hilo `#C8102E`.
Los titulares van en hilo rojo con sombra granate; los rótulos, en parches. La abuela: dulce, vivaracha y pícara
(guiño, gafas bajadas, ceja escéptica, risa) — nunca frágil.
