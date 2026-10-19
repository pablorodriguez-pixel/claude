/* figs_extra.js — figuras de grabado reutilizables (estilo collage: relleno + tinta + trama + recorte blanco con cut()).
   Todas devuelven el contenido de un <svg> en su propio viewBox (indicado en cada una). */
const HATCH = (d, op = .45, pat = 'hA') => `<path d="${d}" fill="url(#${pat})" opacity="${op}"/>`;
const FIGP = (d, fill, sw = 5, op = .45) => cut(P(d), 6, 8) + D(d, fill, sw) + HATCH(d, op);

// mariposa / bicho (vb 0 0 200 160); a = apertura de alas 0..1
function butterflyInner(a = 1, col = PINK) {
  const sx = 0.35 + 0.65 * a;
  const wing = 'M100,80 C70,10 10,0 14,50 C18,90 60,92 100,84 Z M100,86 C60,96 30,130 50,150 C70,166 92,120 100,92 Z';
  return `<g transform="translate(100,0) scale(${f1(sx * 100) / 100},1) translate(-100,0)">${cut(P(wing), 4, 5)}${D(wing, col, 4)}${HATCH(wing, .35)}<circle cx="44" cy="44" r="14" fill="${YEL}" stroke="${INK}" stroke-width="3"/></g>
  <g transform="translate(100,0) scale(${f1(-sx * 100) / 100},1) translate(-100,0)">${D(wing, col, 4)}${HATCH(wing, .35)}<circle cx="44" cy="44" r="14" fill="${YEL}" stroke="${INK}" stroke-width="3"/></g>
  <path d="M100,40 L100,140" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M100,44 Q88,14 76,10 M100,44 Q112,14 124,10" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
}
// red de cazar mariposas (vb 0 0 200 420)
function netInner() {
  const bag = 'M30,90 C20,170 90,230 110,220 C150,200 180,150 170,90 Z';
  return `<path d="M100,410 L100,120" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M100,410 L100,120" stroke="${WOOD}" stroke-width="9" stroke-linecap="round"/>
  ${cut(P(bag), 4, 5)}<path d="${bag}" fill="rgba(255,255,255,.75)" stroke="${INK}" stroke-width="4"/>
  ${[...Array(7)].map((_, k) => `<path d="M${40 + k * 20},92 Q${70 + k * 8},180 108,218" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`).join('')}
  <ellipse cx="100" cy="90" rx="72" ry="20" fill="none" stroke="${INK}" stroke-width="8"/><ellipse cx="100" cy="90" rx="72" ry="20" fill="none" stroke="${BRASS}" stroke-width="4"/>`;
}
// cañón antiguo (vb 0 0 420 260); f = fogonazo 0..1
function cannonInner(f = 0) {
  const tube = 'M60,120 L330,70 C350,66 362,80 360,100 L362,130 C364,150 350,160 330,156 L60,176 C40,178 30,160 30,148 C30,134 40,122 60,120 Z';
  const wheel = 'M150,250 m-70,0 a70,70 0 1,0 140,0 a70,70 0 1,0 -140,0';
  let sp = ''; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; sp += `<path d="M150,250 L${f1(150 + Math.cos(a) * 62)},${f1(250 + Math.sin(a) * 62)}" stroke="${INK}" stroke-width="7"/>`; }
  const boom = f > 0 ? `<g transform="translate(372,112) scale(${f1(0.3 + f)})"><path d="M0,0 L60,-50 L50,-10 L110,-30 L60,10 L120,40 L50,30 L60,80 L10,30 L-10,60 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="M10,0 L45,-25 L40,0 L70,5 L35,20 L30,40 L10,20 Z" fill="${RED}"/></g>` : '';
  return `${cut(P(tube), 7, 9)}${D(tube, '#3d3a36', 6)}${HATCH(tube, .5, 'hB')}<rect x="300" y="64" width="22" height="98" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>
  <path d="M60,170 L230,170 L250,230 L50,230 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>${HATCH('M60,170 L230,170 L250,230 L50,230 Z', .4)}
  <path d="${wheel}" fill="${WOOD}" stroke="${INK}" stroke-width="7"/>${sp}<circle cx="150" cy="250" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>${boom}`;
}
// cama con edredón y almohada (vb 0 0 600 360); z = bulto que respira
function bedInner(z = 0) {
  const quilt = `M40,170 C140,${f1(120 - z * 10)} 330,${f1(110 - z * 14)} 560,170 L570,300 L30,300 Z`;
  return `<rect x="10" y="40" width="40" height="300" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="550" y="120" width="40" height="220" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/>
  <rect x="30" y="250" width="540" height="60" fill="#fff" stroke="${INK}" stroke-width="5"/>
  <path d="M60,170 C60,120 200,110 210,150 C215,180 70,200 60,170 Z" fill="#fff" stroke="${INK}" stroke-width="5"/>
  ${cut(P(quilt), 5, 6)}${D(quilt, '#9fd3c0', 5)}${HATCH(quilt, .35)}${[...Array(6)].map((_, k) => `<path d="M${90 + k * 80},150 L${100 + k * 80},300" stroke="${INK}" stroke-width="2.5" opacity=".5"/>`).join('')}`;
}
// sol con cara (vb 0 0 300 300)
function sunInner(r = 0) {
  let ry = ''; for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + r; ry += `<path d="M${f1(150 + Math.cos(a) * 100)},${f1(150 + Math.sin(a) * 100)} L${f1(150 + Math.cos(a + 0.11) * 145)},${f1(150 + Math.sin(a + 0.11) * 145)} L${f1(150 + Math.cos(a + 0.22) * 100)},${f1(150 + Math.sin(a + 0.22) * 100)} Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/>`; }
  return `${ry}<circle cx="150" cy="150" r="96" fill="${YEL}" stroke="${INK}" stroke-width="6"/>${HATCH('M54,150 a96,96 0 1,0 192,0 a96,96 0 1,0 -192,0', .3)}
  <circle cx="120" cy="135" r="9" fill="${INK}"/><circle cx="180" cy="135" r="9" fill="${INK}"/><path d="M112,180 Q150,210 188,180" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
}
// copo de nieve (vb 0 0 300 300)
function snowInner() {
  let s = ''; for (let k = 0; k < 6; k++) { const a = k * 60; s += `<g transform="rotate(${a} 150 150)"><path d="M150,150 L150,26 M150,70 L122,44 M150,70 L178,44 M150,104 L128,84 M150,104 L172,84" stroke="#fff" stroke-width="26" stroke-linecap="round" fill="none"/><path d="M150,150 L150,26 M150,70 L122,44 M150,70 L178,44 M150,104 L128,84 M150,104 L172,84" stroke="#7fb4d6" stroke-width="12" stroke-linecap="round" fill="none"/></g>`; }
  return s + `<circle cx="150" cy="150" r="20" fill="#7fb4d6" stroke="#fff" stroke-width="6"/>`;
}
// sobre de carta (vb 0 0 300 200)
function envelopeInner() { const b = 'M10,20 L290,20 L290,190 L10,190 Z'; return `${FIGP(b, '#FBF6EA')}<path d="M10,20 L150,120 L290,20" stroke="${INK}" stroke-width="5" fill="none"/><rect x="226" y="36" width="44" height="54" fill="${RED}" stroke="${INK}" stroke-width="3"/>`; }
// montón de carbón (vb 0 0 400 200)
function coalInner() { let s = ''; [[60, 150, 60], [140, 130, 70], [230, 140, 66], [320, 150, 56], [110, 90, 54], [200, 80, 60], [280, 100, 50], [170, 40, 44]].forEach(([x, y, r], i) => { const d = `M${x - r},${y} L${x - r * 0.4},${y - r * 0.8} L${x + r * 0.5},${y - r * 0.7} L${x + r},${y - r * 0.1} L${x + r * 0.6},${y + r * 0.6} L${x - r * 0.6},${y + r * 0.5} Z`; s += cut(P(d), 4, 5) + D(d, i % 2 ? '#2a2724' : '#3b3733', 4) + `<path d="M${x - r * 0.3},${y - r * 0.5} L${x + r * 0.3},${y - r * 0.4}" stroke="#fff" stroke-width="4" opacity=".5"/>`; }); return s; }
// marco dorado de cuadro (vb 0 0 400 520); inner = contenido (o pared vacía si vacío)
function frameInner(inner = '') {
  const o = 'M0,0 L400,0 L400,520 L0,520 Z', i = 'M46,46 L354,46 L354,474 L46,474 Z';
  return `${cut(P(o), 8, 10)}<path d="${o}" fill="${GOLD}" stroke="${INK}" stroke-width="6"/>${HATCH(o, .35)}
  <path d="M14,14 L386,14 L386,506 L14,506 Z" fill="none" stroke="${INK}" stroke-width="3"/><path d="M30,30 L370,30 L370,490 L30,490 Z" fill="none" stroke="${BRONZE}" stroke-width="6"/>
  <path d="${i}" fill="${inner ? '#5a4a2e' : '#EADFC8'}" stroke="${INK}" stroke-width="5"/>${inner}`;
}
// la Gioconda en grabado (dentro del marco, coords del marco)
function giocondaInner() {
  return `<path d="M46,46 L354,46 L354,474 L46,474 Z" fill="#7d8a5e"/>${HATCH('M46,46 L354,46 L354,474 L46,474 Z', .5, 'hB')}
  <path d="M46,300 C120,250 280,250 354,300 L354,474 L46,474 Z" fill="#3e3320"/>
  <path d="M120,474 C110,360 150,320 200,318 C250,320 290,360 280,474 Z" fill="#2f2716" stroke="${INK}" stroke-width="4"/>
  <path d="M136,200 C120,120 160,96 200,96 C240,96 280,120 264,200 C270,260 290,300 300,330 L270,330 C262,290 258,240 256,200 Z M144,200 C142,240 138,290 130,330 L100,330 C110,300 130,260 144,200 Z" fill="#3a2a18" stroke="${INK}" stroke-width="3"/>
  <path d="M140,190 C140,120 260,120 260,190 C262,260 230,300 200,300 C170,300 138,260 140,190 Z" fill="#e2b98a" stroke="${INK}" stroke-width="4"/>
  <path d="M168,196 q12,-6 24,0 M208,196 q12,-6 24,0" stroke="${INK}" stroke-width="4" fill="none"/><path d="M180,256 Q200,266 220,254" stroke="${INK}" stroke-width="4" fill="none"/>
  <path d="M150,410 C180,380 230,380 260,410 C240,430 170,430 150,410 Z" fill="#e2b98a" stroke="${INK}" stroke-width="3"/>`;
}
// nabo tallado con brasa (vb 0 0 300 340); g = brillo 0..1
function turnipInner(g = 1) {
  const body = 'M150,40 C230,40 270,120 266,200 C262,280 210,320 150,320 C90,320 38,280 34,200 C30,120 70,40 150,40 Z';
  const glow = `rgba(255,${f1(150 + 80 * g)},40,${f1(0.6 + 0.4 * g)})`;
  return `<path d="M150,44 C140,10 120,0 104,4 M150,44 C162,8 190,0 206,8 M150,44 C150,10 150,0 152,-10" stroke="#5d7a3a" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${cut(P(body), 6, 8)}${D(body, '#E9DCC0', 6)}<path d="M150,40 C230,40 270,120 266,160 C200,120 100,120 34,160 C30,120 70,40 150,40 Z" fill="#B66A9A" stroke="${INK}" stroke-width="4"/>${HATCH(body, .5)}
  <path d="M84,170 L132,150 L124,196 Z M216,170 L168,150 L176,196 Z" fill="${glow}" stroke="${INK}" stroke-width="5"/>
  <path d="M138,206 L150,186 L162,206 Z" fill="${glow}" stroke="${INK}" stroke-width="4"/>
  <path d="M74,236 L100,260 L120,238 L140,264 L160,238 L180,264 L200,238 L226,260 L230,236 C200,290 100,290 74,236 Z" fill="${glow}" stroke="${INK}" stroke-width="5"/>`;
}
// calabaza tallada (vb 0 0 340 320)
function pumpkinInner(g = 1) {
  const glow = `rgba(255,${f1(200 + 30 * g)},60,${f1(0.7 + 0.3 * g)})`;
  const lobes = ['M170,60 C90,50 30,110 34,190 C38,270 110,300 170,296', 'M170,60 C250,50 310,110 306,190 C302,270 230,300 170,296', 'M170,60 C120,60 96,120 100,190 C104,260 140,296 170,296', 'M170,60 C220,60 244,120 240,190 C236,260 200,296 170,296'];
  return `<path d="M170,66 C166,40 172,20 190,10" stroke="#5d7a3a" stroke-width="14" fill="none" stroke-linecap="round"/>
  ${cut(P('M170,60 C70,40 20,120 34,200 C46,280 120,300 170,296 C220,300 294,280 306,200 C320,120 270,40 170,60 Z'), 6, 8)}
  ${lobes.map((d, i) => `<path d="${d} Z" fill="${i < 2 ? '#E57A2A' : '#F0913C'}" stroke="${INK}" stroke-width="5"/>`).join('')}${HATCH('M170,60 C70,40 20,120 34,200 C46,280 120,300 170,296 C220,300 294,280 306,200 C320,120 270,40 170,60 Z', .3)}
  <path d="M104,150 L150,140 L130,184 Z M236,150 L190,140 L210,184 Z" fill="${glow}" stroke="${INK}" stroke-width="5"/>
  <path d="M90,214 L120,236 L140,216 L170,240 L200,216 L220,236 L250,214 C230,270 110,270 90,214 Z" fill="${glow}" stroke="${INK}" stroke-width="5"/>`;
}
// diablo de grabado (vb 0 0 360 460)
function devilInner(jaw = 0) {
  const head = 'M180,90 C260,90 300,160 290,240 C280,320 230,360 180,360 C130,360 80,320 70,240 C60,160 100,90 180,90 Z';
  const horns = 'M110,120 C80,80 70,40 86,10 C100,50 130,80 150,98 Z M250,120 C280,80 290,40 274,10 C260,50 230,80 210,98 Z';
  return `${cut(P(head) + P(horns) + P('M40,460 C50,400 110,370 180,370 C250,370 310,400 320,460 Z'), 7, 9)}
  <path d="M40,460 C50,400 110,370 180,370 C250,370 310,400 320,460 Z" fill="#3a2020" stroke="${INK}" stroke-width="5"/>
  ${D(horns, '#E9DCC0', 5)}${D(head, '#C8473A', 6)}${HATCH(head, .45)}
  <path d="M120,200 L160,214 M240,200 L200,214" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="148" cy="234" r="12" fill="${YEL}" stroke="${INK}" stroke-width="4"/><circle cx="212" cy="234" r="12" fill="${YEL}" stroke="${INK}" stroke-width="4"/>
  <path d="M130,${290 + jaw * 10} Q180,${320 + jaw * 30} 230,${290 + jaw * 10}" stroke="${INK}" stroke-width="7" fill="#2a1010"/>
  <path d="M160,330 C170,380 180,400 180,420 C180,400 190,380 200,330" fill="#3a2020" stroke="${INK}" stroke-width="4"/>`;
}
// moneda (vb 0 0 200 200)
function coinBigInner(txt = '') { return `${cut('<circle cx="100" cy="100" r="92"/>', 5, 7)}<circle cx="100" cy="100" r="92" fill="${GOLD}" stroke="${INK}" stroke-width="6"/>${HATCH('M8,100 a92,92 0 1,0 184,0 a92,92 0 1,0 -184,0', .35)}<circle cx="100" cy="100" r="72" fill="none" stroke="${INK}" stroke-width="3"/><text x="100" y="124" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="70" fill="${INK}">${txt}</text>`; }
// árbol con cruz tallada (vb 0 0 400 600)
function treeInner(cross = 0) {
  const trunk = 'M170,600 C176,480 172,380 160,300 L240,300 C228,380 224,480 230,600 Z';
  const crown = 'M200,40 C300,40 380,110 360,200 C390,260 330,330 250,316 C220,350 160,350 140,316 C60,330 10,260 40,200 C20,110 100,40 200,40 Z';
  return `${cut(P(trunk) + P(crown), 7, 9)}${D(trunk, WOOD, 6)}${HATCH(trunk, .5, 'hB')}${D(crown, '#5d7a3a', 6)}${HATCH(crown, .5)}
  <g opacity="${f1(cross)}"><path d="M200,410 L200,520 M168,446 L232,446" stroke="${YEL}" stroke-width="18" stroke-linecap="round"/><path d="M200,410 L200,520 M168,446 L232,446" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>`;
}
// barco de emigrantes (vb 0 0 600 360)
function shipInner() {
  const hull = 'M40,220 L560,220 L500,320 L100,320 Z';
  return `${cut(P(hull), 6, 8)}${D(hull, '#3d3a36', 6)}${HATCH(hull, .45, 'hB')}<rect x="150" y="150" width="300" height="70" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/>
  ${[...Array(6)].map((_, k) => `<circle cx="${180 + k * 48}" cy="186" r="12" fill="${INK}"/>`).join('')}
  <rect x="200" y="60" width="50" height="90" fill="${RED}" stroke="${INK}" stroke-width="5"/><rect x="330" y="60" width="50" height="90" fill="${RED}" stroke="${INK}" stroke-width="5"/>
  <path d="M190,50 C170,20 150,10 120,10 M320,50 C300,20 280,10 250,10" stroke="${INK}" stroke-width="10" fill="none" opacity=".6"/>
  <path d="M0,330 Q50,310 100,330 T200,330 T300,330 T400,330 T500,330 T600,330" stroke="${INK}" stroke-width="6" fill="none"/>`;
}
// corona real con joyas (vb 0 0 400 300)
function crownInner() {
  const b = 'M40,260 L20,80 L110,160 L200,40 L290,160 L380,80 L360,260 Z';
  return `${FIGP(b, GOLD)}<rect x="36" y="232" width="328" height="40" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="5"/>
  ${[[20, 80], [200, 40], [380, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="#fff" stroke="${INK}" stroke-width="4"/>`).join('')}
  ${[[110, 252, RED], [200, 252, '#2f6fd0'], [290, 252, '#2f9a5a'], [200, 170, RED]].map(([x, y, c]) => `<path d="M${x},${y - 22} L${x + 18},${y} L${x},${y + 22} L${x - 18},${y} Z" fill="${c}" stroke="${INK}" stroke-width="4"/>`).join('')}`;
}
// puerta de museo (vb 0 0 300 460)
function doorInner(open = 0) {
  return `<rect x="10" y="10" width="280" height="450" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><rect x="30" y="30" width="240" height="430" fill="#F4E2B0"/>
  <g transform="translate(30,30) scale(${f1(1 - open * 0.8)},1)"><rect x="0" y="0" width="240" height="430" fill="${WOOD}" stroke="${INK}" stroke-width="6"/>${HATCH('M0,0 L240,0 L240,430 L0,430 Z', .4, 'hB')}<rect x="30" y="30" width="180" height="160" fill="none" stroke="${INK}" stroke-width="4"/><rect x="30" y="230" width="180" height="170" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="210" cy="215" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></g>`;
}
// barrotes de celda (vb 0 0 400 500)
function barsInner() { return [...Array(6)].map((_, k) => `<rect x="${20 + k * 70}" y="0" width="22" height="500" rx="8" fill="#5E5A52" stroke="${INK}" stroke-width="4"/>`).join('') + `<rect x="0" y="40" width="400" height="26" fill="#5E5A52" stroke="${INK}" stroke-width="4"/><rect x="0" y="430" width="400" height="26" fill="#5E5A52" stroke="${INK}" stroke-width="4"/>`; }
// bebé con chupete (vb 0 0 360 400); m = boca 0..1
function babyInner(m = 0) {
  const head = 'M180,40 C280,40 330,110 326,190 C322,280 260,330 180,330 C100,330 38,280 34,190 C30,110 80,40 180,40 Z';
  return `${cut(P(head) + P('M60,400 C70,340 120,320 180,320 C240,320 290,340 300,400 Z'), 6, 8)}<path d="M60,400 C70,340 120,320 180,320 C240,320 290,340 300,400 Z" fill="#9fd3c0" stroke="${INK}" stroke-width="5"/>
  ${D(head, '#F2D2B0', 6)}${HATCH(head, .2)}<path d="M170,40 C160,20 180,6 196,16 C186,20 182,30 186,42" fill="none" stroke="${INK}" stroke-width="5"/>
  <circle cx="34" cy="200" r="26" fill="#F2D2B0" stroke="${INK}" stroke-width="5"/><circle cx="326" cy="200" r="26" fill="#F2D2B0" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="130" cy="180" rx="16" ry="20" fill="${INK}"/><ellipse cx="230" cy="180" rx="16" ry="20" fill="${INK}"/><circle cx="136" cy="172" r="6" fill="#fff"/><circle cx="236" cy="172" r="6" fill="#fff"/>
  <circle cx="96" cy="230" r="20" fill="${PINK}" opacity=".35"/><circle cx="264" cy="230" r="20" fill="${PINK}" opacity=".35"/>
  <ellipse cx="180" cy="${f1(250 + m * 6)}" rx="${f1(22 + m * 6)}" ry="${f1(8 + m * 16)}" fill="#7a2b2b" stroke="${INK}" stroke-width="4"/>`;
}
// etiqueta «HOLA, me llamo…» (vb 0 0 700 420)
function nameTagInner(nombre) {
  return `${FIGP('M20,20 L680,20 L680,400 L20,400 Z', '#fff', 6, .12)}<path d="M20,20 L680,20 L680,150 L20,150 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/>
  <text x="350" y="92" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="70" fill="#fff">HOLA</text><text x="350" y="136" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="#fff">me llamo</text>
  <text x="350" y="310" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="${nombre.length > 8 ? 96 : 130}" fill="${INK}">${nombre}</text>`;
}
