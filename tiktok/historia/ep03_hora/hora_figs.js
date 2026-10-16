/* Ep. 3 · La hora de España — figuras nuevas en estilo grabado (reloj, sol, mapa, silueta, faro…) */
const WALL = '#8A5A30', CREAM = '#FBF6EA', SUNC = '#F7C744';
const rad = Math.PI / 180;

/* ---------------- proyecciones ---------------- */
// mapa de Europa a pantalla completa (1080x1920)
const MX = lon => 540 + 33.1 * (lon + 1), MY = lat => 900 + 46 * (40 - lat);
const mpath = (a, fx = MX, fy = MY) => 'M' + a.map(q => f1(fx(q[0])) + ',' + f1(fy(q[1]))).join('L') + 'Z';
const mline = (a, fx = MX, fy = MY) => 'M' + a.map(q => f1(fx(q[0])) + ',' + f1(fy(q[1]))).join('L');

/* ---------------- contornos (lon, lat) aproximados ---------------- */
const G_SPAIN = [[-8.9, 41.9], [-8.9, 42.6], [-9.3, 43.0], [-8.0, 43.7], [-5.8, 43.6], [-3.8, 43.45], [-1.8, 43.4], [0.0, 42.7], [1.4, 42.6], [3.2, 42.4], [3.2, 41.9], [2.1, 41.3], [0.9, 41.0], [0.2, 40.1], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.2], [-2.2, 36.7], [-4.4, 36.7], [-5.6, 36.0], [-6.3, 36.5], [-7.4, 37.2], [-7.3, 38.2], [-7.0, 38.9], [-7.3, 39.4], [-7.0, 39.7], [-6.9, 41.0], [-6.2, 41.6], [-8.2, 42.1]];
const G_PORT = [[-8.9, 41.9], [-8.2, 42.1], [-6.2, 41.6], [-6.9, 41.0], [-7.0, 39.7], [-7.3, 39.4], [-7.0, 38.9], [-7.3, 38.2], [-7.4, 37.2], [-8.0, 37.0], [-8.9, 37.0], [-8.8, 38.1], [-9.5, 38.7], [-8.9, 39.5], [-8.7, 40.6], [-8.8, 41.8]];
const G_CONT = [[-1.8, 43.4], [-1.2, 44.6], [-1.2, 46.2], [-2.2, 47.1], [-4.5, 47.9], [-4.7, 48.5], [-3.0, 48.8], [-1.6, 48.7], [-1.9, 49.7], [0.1, 49.5], [1.6, 50.9], [2.6, 51.1], [3.4, 51.4], [4.2, 52.0], [4.7, 52.9], [5.0, 53.4], [6.9, 53.5], [8.0, 53.6], [8.6, 54.0], [8.6, 55.5], [8.1, 56.6], [9.6, 57.3], [10.6, 57.7], [10.3, 56.6], [10.9, 56.3], [10.0, 55.0], [10.9, 54.0], [12.5, 54.4], [14.0, 54.0], [16.5, 54.5], [18.5, 54.8], [24, 55], [24, 41], [19.4, 41.8], [18.5, 42.4], [17.0, 43.2], [16.0, 43.5], [15.2, 44.3], [14.5, 45.2], [13.7, 45.6], [12.3, 45.2], [12.4, 44.2], [13.6, 43.5], [14.2, 42.4], [16.1, 41.9], [16.9, 41.1], [18.5, 40.1], [17.1, 40.5], [16.6, 39.6], [17.1, 39.0], [16.6, 38.4], [15.6, 38.0], [15.7, 38.9], [15.0, 40.2], [14.0, 40.8], [12.4, 41.7], [10.5, 42.9], [10.2, 43.9], [8.8, 44.4], [7.5, 43.8], [6.0, 43.1], [4.8, 43.4], [3.1, 43.1], [3.2, 42.4], [1.4, 42.6], [0.0, 42.7]];
const G_SCAN = [[5.5, 59.0], [7.0, 58.0], [8.5, 58.3], [10.5, 59.2], [11.8, 58.0], [12.8, 56.5], [14.2, 55.4], [16.0, 56.2], [16.6, 57.8], [18.0, 59.0], [19, 60.5], [19, 64], [4, 64], [5, 61]];
const G_GB = [[-5.7, 50.05], [-3.5, 50.3], [-1.0, 50.7], [1.4, 51.2], [1.4, 51.4], [1.7, 52.6], [0.3, 53.0], [-0.2, 54.1], [-1.5, 55.0], [-2.0, 55.8], [-2.6, 56.3], [-1.8, 57.6], [-3.3, 58.6], [-5.0, 58.6], [-5.6, 57.5], [-6.2, 56.5], [-5.0, 55.8], [-4.9, 54.8], [-3.2, 54.9], [-3.0, 53.4], [-4.6, 53.3], [-4.2, 52.2], [-5.3, 51.8], [-3.0, 51.5], [-4.5, 51.0]];
const G_IE = [[-6.0, 52.2], [-6.2, 53.4], [-6.0, 54.6], [-7.3, 55.3], [-8.5, 54.4], [-10.0, 54.0], [-9.9, 52.1], [-8.5, 51.6]];
const G_AFR = [[-17, 21], [-16, 24], [-13.5, 27.5], [-9.8, 29.5], [-9.6, 30.9], [-8.5, 33.3], [-6.8, 34.1], [-5.9, 35.8], [-5.3, 35.9], [-4.4, 35.2], [-2.2, 35.1], [0, 35.9], [1.5, 36.6], [3.2, 36.8], [6.5, 37.1], [9.8, 37.3], [10.3, 36.7], [11.1, 36.9], [10.5, 36.0], [11.0, 35.2], [10.1, 34.2], [10.9, 33.0], [12.5, 32.8], [15.3, 32.3], [16, 31], [24, 30], [24, 10], [-20, 10], [-20, 21]];
const G_ISL = [
  [[8.4, 41.2], [9.8, 41.1], [9.7, 39.2], [8.6, 38.9], [8.4, 40.6]],
  [[9.4, 43.0], [9.6, 42.1], [9.2, 41.4], [8.6, 41.9], [8.7, 42.6]],
  [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.7, 37.6]],
  [[2.4, 39.6], [3.5, 39.8], [3.2, 39.3], [2.7, 39.4]],
  [[1.2, 39.0], [1.6, 39.1], [1.5, 38.8], [1.3, 38.8]],
  [[3.8, 40.0], [4.3, 40.0], [4.2, 39.8], [3.9, 39.8]],
];
const G_GER = [[7.0, 53.6], [8.6, 53.9], [9.0, 54.8], [10.0, 54.6], [11.0, 54.0], [13.0, 54.4], [14.2, 53.9], [14.6, 52.6], [15.0, 51.1], [12.1, 50.3], [13.8, 48.7], [13.0, 47.5], [10.2, 47.3], [7.6, 47.6], [8.2, 49.0], [6.4, 49.5], [6.1, 50.8], [6.0, 51.9], [7.0, 52.4], [7.2, 53.2]];
const B_FR = [[2.6, 51.1], [4.2, 49.95], [5.8, 49.5], [8.2, 49.0], [7.6, 47.6], [6.1, 46.2], [7.0, 45.9], [6.8, 44.4], [7.5, 43.8]];
const B_IT = [[7.0, 45.9], [10.5, 46.6], [12.2, 47.0], [13.7, 46.5], [13.7, 45.6]];
const G_CAN = [ // Canarias (lon, lat)
  [[-18.1, 27.8], [-17.9, 27.7], [-17.9, 27.85]], [[-17.95, 28.85], [-17.75, 28.85], [-17.75, 28.5], [-17.9, 28.6]], [[-17.35, 28.2], [-17.1, 28.2], [-17.2, 28.0]],
  [[-16.9, 28.4], [-16.1, 28.6], [-16.4, 28.15], [-16.8, 28.0], [-16.9, 28.2]], [[-15.8, 28.15], [-15.4, 28.15], [-15.35, 27.8], [-15.6, 27.75], [-15.8, 27.95]],
  [[-14.5, 28.7], [-13.85, 28.75], [-13.9, 28.25], [-14.5, 28.05], [-14.3, 28.4]], [[-13.9, 29.2], [-13.4, 29.2], [-13.5, 28.85], [-13.85, 28.9]],
];

/* ---------------- mini reloj (icono) ---------------- */
function miniClock(h = 12, m = 0, o = {}) {
  const ha = (h % 12) * 30 + m * 0.5, ma = m * 6, c = o.col || CREAM;
  let tk = ''; for (let k = 0; k < 12; k++) { const a = k * 30 * rad; tk += `M${f1(50 + Math.sin(a) * 36)},${f1(50 - Math.cos(a) * 36)}L${f1(50 + Math.sin(a) * 42)},${f1(50 - Math.cos(a) * 42)}`; }
  const q = o.q ? `<text x="50" y="66" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="50" fill="${RED}">?</text>` : `<path d="M50,50 L${f1(50 + Math.sin(ha * rad) * 24)},${f1(50 - Math.cos(ha * rad) * 24)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M50,50 L${f1(50 + Math.sin(ma * rad) * 34)},${f1(50 - Math.cos(ma * rad) * 34)}" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/><circle cx="50" cy="50" r="5" fill="${INK}"/>`;
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><circle cx="55" cy="56" r="48" fill="${SH}"/><circle cx="50" cy="50" r="48" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="50" cy="50" r="40" fill="${c}" stroke="${INK}" stroke-width="2.5"/>${o.q ? '' : `<path d="${tk}" stroke="${INK}" stroke-width="2.5"/>`}${q}</svg>`;
}

/* ---------------- RELOJ DE PARED (viewBox 0 0 600 1020; centro esfera 300,300) ---------------- */
function iberiaDial() { // península dentro de la esfera
  const fx = lon => 300 + (lon + 3.4) * 19.5, fy = lat => 300 - (lat - 40) * 26;
  return `<path d="${mpath(G_PORT, fx, fy)}" fill="${FIG}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="${mpath(G_SPAIN, fx, fy)}" fill="#F3E3B5" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/><path d="${mpath(G_SPAIN, fx, fy)}" fill="url(#hP)"/>`;
}
function clockInner(o = {}) {
  const id = uid('ck'), C = 300;
  const box = 'M196,548 L404,548 L418,858 Q300,904 182,858 Z';
  const fin = 'M250,40 Q300,-14 350,40 Z';
  let sil = `<circle cx="300" cy="300" r="272"/>` + P(box) + P(fin);
  let legs = '';
  if (o.legs) {
    const lg = (cls, x) => { const th = limb(x, 860, x, 960, 13, 10); return `<g class="${cls}">${D(th, INK, 2)}<path d="M${x - 8},958 Q${x + 34},944 ${x + 46},968 L${x - 10},972 Z" fill="${INK}" stroke="${INK}" stroke-width="3"/></g>`; };
    legs = lg('legL', 250) + lg('legR', 350);
  }
  let s = legs + cut(sil);
  // caja del péndulo
  s += D(box, WOOD, 5) + clipG(id + 'b', box, `<rect x="320" y="540" width="120" height="380" fill="url(#hD)"/><rect x="170" y="540" width="260" height="380" fill="url(#hW)" opacity=".25"/>`);
  s += `<rect x="236" y="590" width="128" height="226" rx="14" fill="#2f2117" stroke="${INK}" stroke-width="4"/>`;
  s += `<g class="pend"><path d="M300,560 L300,760" stroke="${BRASS}" stroke-width="7"/><path d="M300,560 L300,760" stroke="${INK}" stroke-width="2" stroke-dasharray="2 8"/><circle cx="300" cy="772" r="34" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="300" cy="772" r="34" fill="url(#hA)" opacity=".55"/><circle cx="290" cy="762" r="9" fill="#fff" opacity=".5"/></g>`;
  s += `<rect x="236" y="590" width="128" height="226" rx="14" fill="none" stroke="${BRASS}" stroke-width="5"/><path d="M250,604 L276,604 L250,640 Z" fill="#fff" opacity=".18"/>`;
  // remate superior
  s += D(fin, WOOD, 4) + `<circle cx="300" cy="18" r="13" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/>`;
  // caja redonda
  s += `<circle cx="300" cy="300" r="272" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>` + clipG(id + 'c', 'M28,300a272,272 0 1,0 544,0a272,272 0 1,0 -544,0', `<rect x="330" y="20" width="260" height="560" fill="url(#hD)" opacity=".85"/><rect x="0" y="0" width="600" height="600" fill="url(#hW)" opacity=".2"/>`);
  let beads = ''; for (let k = 0; k < 36; k++) { const a = k * 10 * rad; beads += `<circle cx="${f1(C + Math.sin(a) * 254)}" cy="${f1(C - Math.cos(a) * 254)}" r="5" fill="${BRASS}" stroke="${INK}" stroke-width="1.6"/>`; }
  s += beads;
  s += `<circle cx="300" cy="300" r="232" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="300" cy="300" r="232" fill="url(#hA)" opacity=".35"/>`;
  s += `<circle cx="300" cy="300" r="214" fill="${o.dialCol || CREAM}" stroke="${INK}" stroke-width="3"/>`;
  const dialClip = 'M86,300a214,214 0 1,0 428,0a214,214 0 1,0 -428,0';
  let dial = '';
  if (o.spain) dial += `<rect x="80" y="86" width="440" height="107" fill="${RED}" opacity=".3"/><rect x="80" y="193" width="440" height="214" fill="${YEL}" opacity=".42"/><rect x="80" y="407" width="440" height="110" fill="${RED}" opacity=".3"/>` + iberiaDial();
  dial += `<circle cx="300" cy="300" r="214" fill="url(#hP)" opacity=".5"/>`;
  s += clipG(id + 'd', dialClip, dial);
  // marcas + números romanos
  let tk = ''; for (let k = 0; k < 60; k++) { const a = k * 6 * rad, r0 = k % 5 ? 202 : 192; tk += `M${f1(C + Math.sin(a) * r0)},${f1(C - Math.cos(a) * r0)}L${f1(C + Math.sin(a) * 210)},${f1(C - Math.cos(a) * 210)}`; }
  s += `<path d="${tk}" stroke="${INK}" stroke-width="3"/><circle cx="300" cy="300" r="186" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  const RN = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  RN.forEach((n, k) => { const a = k * 30 * rad; s += `<text x="${f1(C + Math.sin(a) * 158)}" y="${f1(C - Math.cos(a) * 158 + 14)}" text-anchor="middle" font-family="Playfair" font-weight="800" font-size="${o.spain ? 36 : 40}" fill="${INK}" stroke="${o.dialCol || CREAM}" stroke-width="5" paint-order="stroke">${n}</text>`; });
  if (o.face) s += `<g class="ckEyes"><ellipse cx="236" cy="236" rx="22" ry="26" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="364" cy="236" rx="22" ry="26" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="pup"><circle cx="242" cy="240" r="11" fill="${INK}"/><circle cx="370" cy="240" r="11" fill="${INK}"/></g></g><path d="M240,382 Q300,428 360,382" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  // agujas
  const hh = 'M300,300 L286,280 L294,200 L300,170 L306,200 L314,280 Z', mh = 'M300,316 L292,290 L297,150 L300,112 L303,150 L308,290 Z';
  s += `<g class="hh"><path d="${hh}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="${hh}" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><circle cx="300" cy="214" r="9" fill="none" stroke="${CREAM}" stroke-width="3"/></g>`;
  s += `<g class="mh"><path d="${mh}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="${mh}" fill="${RED}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;
  s += `<circle cx="300" cy="300" r="17" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="296" cy="296" r="5" fill="#fff" opacity=".6"/>`;
  // brillo del cristal
  s += `<path d="M150,190 Q190,120 262,102" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".35"/>`;
  return s;
}
function mkClock(pa, b, o = {}) {
  const c = mk(pa, b, clockInner(o), '0 0 600 1020', 'clock');
  c.hh = c.d.querySelector('.hh'); c.mh = c.d.querySelector('.mh'); c.pend = c.d.querySelector('.pend');
  return c;
}
// fija la hora (h puede ser decimal); la aguja de minutos gira 360 por hora
function setClock(c, h, pend = 0) {
  c.hh.setAttribute('transform', `rotate(${f1((h % 12) * 30)} 300 300)`);
  c.mh.setAttribute('transform', `rotate(${f1(h * 360)} 300 300)`);
  c.pend.setAttribute('transform', `rotate(${f1(pend)} 300 560)`);
}
function clockLegs(c, t, run, amp = 30) {
  if (!c.legL) return; const k = Math.sin(t * run) * amp;
  c.legL.setAttribute('transform', `rotate(${f1(k)} 250 860)`); c.legR.setAttribute('transform', `rotate(${f1(-k)} 350 860)`);
}

/* ---------------- SOL CON CARA (viewBox 0 0 500 620; centro 250,250) ---------------- */
function sunInner(o = {}) {
  const id = uid('sun'), C = 250;
  let rays = '', raySil = '';
  for (let k = 0; k < 16; k++) {
    const a = k / 16 * Math.PI * 2, L = k % 2 ? 214 : 244, w = k % 2 ? 0.16 : 0.2;
    const x1 = C + Math.cos(a - w) * 150, y1 = C + Math.sin(a - w) * 150, x2 = C + Math.cos(a + w) * 150, y2 = C + Math.sin(a + w) * 150;
    const xm = C + Math.cos(a + 0.09) * (L * 0.72), ym = C + Math.sin(a + 0.09) * (L * 0.72), xt = C + Math.cos(a) * L, yt = C + Math.sin(a) * L;
    const d = `M${f1(x1)},${f1(y1)} Q${f1(xm)},${f1(ym)} ${f1(xt)},${f1(yt)} Q${f1(xm - Math.cos(a + 1.6) * 16)},${f1(ym - Math.sin(a + 1.6) * 16)} ${f1(x2)},${f1(y2)} Z`;
    raySil += P(d); rays += D(d, k % 2 ? '#F2A93B' : SUNC, 3.5) + `<path d="${d}" fill="url(#hA)" opacity=".35"/>`;
  }
  let legs = '';
  if (o.legs) {
    const lg = (cls, x) => { const th = limb(x, 380, x, 520, 12, 9); return `<g class="${cls}">${D(th, INK, 2)}<path d="M${x - 8},518 Q${x + 34},504 ${x + 44},528 L${x - 10},532 Z" fill="${INK}"/></g>`; };
    legs = lg('legL', 214) + lg('legR', 286);
  }
  let s = legs + cut(raySil + `<circle cx="250" cy="250" r="160"/>`);
  s += `<g class="rays">${rays}</g>`;
  s += `<circle cx="250" cy="250" r="160" fill="${SUNC}" stroke="${INK}" stroke-width="5"/>` + clipG(id + 'f', 'M90,250a160,160 0 1,0 320,0a160,160 0 1,0 -320,0', `<ellipse cx="330" cy="310" rx="120" ry="140" fill="url(#hA)" opacity=".6"/><ellipse cx="170" cy="190" rx="60" ry="40" fill="#fff" opacity=".35"/>`);
  // mejillas
  s += `<ellipse cx="170" cy="292" rx="30" ry="18" fill="${PINK}" opacity=".35"/><ellipse cx="330" cy="292" rx="30" ry="18" fill="${PINK}" opacity=".35"/>`;
  // ojos
  s += `<ellipse cx="200" cy="228" rx="24" ry="28" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="300" cy="228" rx="24" ry="28" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
  s += `<g class="pup"><circle cx="204" cy="232" r="11" fill="${INK}"/><circle cx="304" cy="232" r="11" fill="${INK}"/><circle cx="200" cy="227" r="3.5" fill="#fff"/><circle cx="300" cy="227" r="3.5" fill="#fff"/></g>`;
  s += `<g class="lidH" style="opacity:0"><path d="M175,226 A25,26 0 0,1 225,226 Z" fill="${SUNC}" stroke="${INK}" stroke-width="4"/><path d="M275,226 A25,26 0 0,1 325,226 Z" fill="${SUNC}" stroke="${INK}" stroke-width="4"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="200" cy="228" rx="25" ry="29" fill="${SUNC}" stroke="${INK}" stroke-width="4"/><ellipse cx="300" cy="228" rx="25" ry="29" fill="${SUNC}" stroke="${INK}" stroke-width="4"/><path d="M178,232 q22,12 44,0 M278,232 q22,12 44,0" stroke="${INK}" stroke-width="4" fill="none"/></g>`;
  s += `<path class="browL" d="M170,186 q30,-16 56,0" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><path class="browR" d="M274,186 q30,-16 56,0" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  // nariz
  s += `<path d="M250,240 C244,262 238,272 246,278 C252,281 258,280 262,276" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  // bocas
  s += `<g class="mSmile"><path d="M196,312 Q250,356 304,312" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  s += `<g class="mPant" style="opacity:0"><path d="M206,306 Q250,296 294,306 Q292,366 250,370 Q208,366 206,306 Z" fill="#160f0a" stroke="${INK}" stroke-width="4"/><path d="M226,346 Q250,330 274,346 Q276,394 250,400 Q224,394 226,346 Z" fill="#E5576B" stroke="${INK}" stroke-width="4"/><path d="M250,350 V384" stroke="${INK}" stroke-width="2.5"/></g>`;
  // gotas de sudor
  s += `<g class="sweat" style="opacity:0"><path d="M120,170 q-14,24 0,30 q14,-6 0,-30 Z" fill="#9fd3ff" stroke="${INK}" stroke-width="3"/><path d="M380,150 q-12,20 0,26 q12,-6 0,-26 Z" fill="#9fd3ff" stroke="${INK}" stroke-width="3"/><path d="M396,226 q-10,16 0,21 q10,-5 0,-21 Z" fill="#9fd3ff" stroke="${INK}" stroke-width="3"/></g>`;
  // gafas de sol (opcional)
  if (o.shades) s += `<g class="shades"><rect x="166" y="206" width="70" height="46" rx="14" fill="${INK}"/><rect x="266" y="206" width="70" height="46" rx="14" fill="${INK}"/><path d="M236,222 h30" stroke="${INK}" stroke-width="7"/><path d="M178,214 l22,0" stroke="#fff" stroke-width="4" opacity=".5"/></g>`;
  return s;
}
function mkSun(pa, b, o = {}) {
  const c = mk(pa, b, sunInner(o), '0 0 500 620', 'sun');
  c.rays = c.d.querySelector('.rays'); c.mS = c.d.querySelector('.mSmile'); c.mP = c.d.querySelector('.mPant'); c.sweat = c.d.querySelector('.sweat');
  c.legL = c.d.querySelector('.legL'); c.legR = c.d.querySelector('.legR');
  return c;
}
function sunFace(c, t, o = {}) {
  face(c, t, o);
  c.rays.setAttribute('transform', `rotate(${f1(o.spin || 0)} 250 250)`);
  c.mS.style.opacity = o.pant ? 0 : 1; c.mP.style.opacity = o.pant ? 1 : 0; c.sweat.style.opacity = o.sweat ? 1 : 0;
  if (o.sweat) c.sweat.setAttribute('transform', `translate(0 ${f1((t * 60) % 18)})`);
  if (c.legL) { const k = o.run ? Math.sin(t * o.run) * 32 : 0; c.legL.setAttribute('transform', `rotate(${f1(k)} 214 380)`); c.legR.setAttribute('transform', `rotate(${f1(-k)} 286 380)`); }
}

/* ---------------- SILUETA DE PERFIL (militar, grabado documental) viewBox 0 0 600 900 ---------------- */
function profileInner() {
  const id = uid('pf'), DK = '#2E241B', LN = '#8C7a62';
  const torso = 'M40,900 C40,660 90,470 186,420 L300,404 C370,420 432,470 452,540 L486,900 Z';
  const head = 'M138,216 L330,214 C334,232 338,248 340,262 C348,272 358,284 358,293 C352,299 344,299 340,301 C344,307 346,315 340,323 C342,333 342,343 332,351 C314,361 288,365 270,363 L266,410 L184,410 L178,352 C152,334 136,300 134,262 Z';
  const crown = 'M118,206 C114,150 176,124 252,126 C320,128 352,150 350,196 L336,222 L128,226 Z';
  const band = 'M128,190 L346,186 L338,224 L130,228 Z';
  const visor = 'M300,214 Q352,214 380,232 Q344,240 300,232 Z';
  let s = cut(P(torso) + P(head) + P(crown) + P(visor), 10, 12);
  s += D(torso, DK, 4) + clipG(id + 't', torso, `<rect x="0" y="380" width="600" height="540" fill="url(#hW)" opacity=".18"/><path d="M200,430 Q300,520 300,900 M120,600 Q260,560 470,640" stroke="${LN}" stroke-width="3" fill="none"/><path d="M90,700 Q260,650 480,740 L486,790 Q260,700 84,760 Z" fill="${LN}" opacity=".35"/>`);
  // charreteras, cuello, botones
  s += `<path d="M150,450 Q206,416 262,430 L258,452 Q206,442 156,470 Z" fill="${LN}" stroke="${INK}" stroke-width="3"/><path d="M300,404 L318,470 L270,470 L262,410 Z" fill="${LN}" opacity=".7" stroke="${INK}" stroke-width="3"/>`;
  [520, 600, 680].forEach(y => s += `<circle cx="318" cy="${y}" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/>`);
  s += D(head, DK, 4) + clipG(id + 'h', head, `<path d="M300,250 C320,270 330,300 320,340" stroke="${LN}" stroke-width="3" fill="none"/><path d="M250,300 Q262,330 300,340" stroke="${LN}" stroke-width="2.4" fill="none"/>`);
  // oreja, ojo, bigote (trazos claros, sin caricatura)
  s += `<path d="M200,268 C188,262 184,290 196,302 C204,306 210,292 206,280" stroke="${LN}" stroke-width="4" fill="none"/>`;
  s += `<path d="M300,262 q12,-6 22,0" stroke="${LN}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="314" cy="266" r="4" fill="${LN}"/>`;
  s += `<path d="M326,306 q10,4 16,2" stroke="${LN}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += D(crown, DK, 4) + clipG(id + 'c', crown, `<rect x="100" y="120" width="260" height="110" fill="url(#hW)" opacity=".25"/>`) + D(band, LN, 3) + HF(band, 'hD') + D(visor, '#15100b', 3);
  s += `<path d="M236,172 l10,-14 10,14 -10,10 Z" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/>`;
  // brazo (gira desde el hombro 360,470)
  const arm = limb(360, 470, 640, 470, 38, 28);
  let ag = cut(P(arm) + '<circle cx="690" cy="470" r="34"/>', 6, 8) + D(arm, DK, 4) + clipG(id + 'a', arm, `<rect x="340" y="430" width="320" height="80" fill="url(#hW)" opacity=".2"/>`);
  ag += `<rect x="610" y="436" width="34" height="68" rx="6" fill="${LN}" stroke="${INK}" stroke-width="3"/>`;
  ag += `<path d="M644,446 C676,436 700,446 708,456 L770,452 C782,452 784,468 770,470 L716,474 C722,490 704,506 680,502 C660,500 648,492 644,494 Z" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><path d="M680,470 q14,4 26,0 M676,484 q14,4 26,0" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += `<g class="arm">${ag}</g>`;
  return s;
}

/* ---------------- avión (silueta) ---------------- */
const PLANE = `<svg viewBox="0 0 300 120" width="100%" height="100%" style="overflow:visible"><path d="M10,62 Q40,46 150,48 L240,50 Q290,54 296,62 Q290,70 240,72 L150,76 Q40,78 10,62 Z" fill="${INK}"/><path d="M120,58 L70,6 L100,6 L170,56 Z M120,66 L70,118 L100,118 L170,68 Z" fill="${INK}"/><path d="M20,60 L4,30 L20,30 L40,58 Z" fill="${INK}"/><circle cx="296" cy="62" r="5" fill="${INK}"/><path d="M298,40 V84" stroke="${INK}" stroke-width="3"/></svg>`;

/* ---------------- paloma ---------------- */
function doveSvg() {
  return `<svg viewBox="0 0 200 140" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,80 Q60,60 110,70 Q150,40 180,50 Q160,70 150,86 Q120,110 60,100 Z"/><path d="M80,72 Q100,10 150,4 Q130,40 120,74 Z"/>', 4, 5)}
  <path d="M20,80 Q60,60 110,70 Q150,40 180,50 Q160,70 150,86 Q120,110 60,100 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="wingD"><path d="M80,72 Q100,10 150,4 Q130,40 120,74 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M96,60 Q112,30 136,16 M104,68 Q118,42 140,30" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <circle cx="164" cy="56" r="4" fill="${INK}"/><path d="M178,52 L196,58 L178,62 Z" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>
  <path d="M190,60 Q196,80 186,96" stroke="#3c5a2a" stroke-width="3" fill="none"/><ellipse cx="194" cy="76" rx="8" ry="4" fill="#7a9a52" stroke="${INK}" stroke-width="1.5" transform="rotate(60 194 76)"/><ellipse cx="184" cy="88" rx="8" ry="4" fill="#7a9a52" stroke="${INK}" stroke-width="1.5" transform="rotate(-40 184 88)"/></svg>`;
}

/* ---------------- candado + cadenas ---------------- */
function padlockSvg() {
  return `<svg viewBox="0 0 240 280" width="100%" height="100%" style="overflow:visible">${cut('<rect x="20" y="110" width="200" height="160" rx="26"/><path d="M60,120 V80 a60,60 0 0,1 120,0 V120 h-30 V80 a30,30 0 0,0 -60,0 V120 Z"/>', 8, 10)}
  <path d="M60,120 V80 a60,60 0 0,1 120,0 V120 h-30 V80 a30,30 0 0,0 -60,0 V120 Z" fill="#9a9a9a" stroke="${INK}" stroke-width="5"/><path d="M60,120 V80 a60,60 0 0,1 120,0 V120 h-30 V80 a30,30 0 0,0 -60,0 V120 Z" fill="url(#hA)" opacity=".5"/>
  <rect x="20" y="110" width="200" height="160" rx="26" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><rect x="20" y="110" width="200" height="160" rx="26" fill="url(#hD)" opacity=".5"/><rect x="34" y="124" width="172" height="132" rx="18" fill="none" stroke="${INK}" stroke-width="2"/>
  <circle cx="120" cy="176" r="20" fill="${INK}"/><path d="M110,186 L104,232 L136,232 L130,186 Z" fill="${INK}"/><path d="M40,140 q30,-10 60,-4" stroke="#fff" stroke-width="6" opacity=".45" fill="none" stroke-linecap="round"/></svg>`;
}
function chainSvg(x1, y1, x2, y2) {
  const n = Math.round(Math.hypot(x2 - x1, y2 - y1) / 40); let s = '';
  for (let i = 0; i < n; i++) { const k = (i + 0.5) / n, x = x1 + (x2 - x1) * k, y = y1 + (y2 - y1) * k, a = Math.atan2(y2 - y1, x2 - x1) / rad; s += `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(a)})"><rect x="-26" y="${i % 2 ? -7 : -14}" width="52" height="${i % 2 ? 14 : 28}" rx="${i % 2 ? 7 : 14}" fill="none" stroke="${INK}" stroke-width="13"/><rect x="-26" y="${i % 2 ? -7 : -14}" width="52" height="${i % 2 ? 14 : 28}" rx="${i % 2 ? 7 : 14}" fill="none" stroke="#a9a9a9" stroke-width="7"/></g>`; }
  return s;
}

/* ---------------- faro ---------------- */
function lighthouseSvg() {
  const tower = 'M70,120 L130,120 L150,420 L50,420 Z';
  let s = cut(P(tower) + '<rect x="56" y="60" width="88" height="66"/><path d="M50,62 L100,10 L150,62 Z"/>', 6, 8);
  s += D(tower, '#fff', 4) + clipG(uid('lh'), tower, `<rect x="0" y="170" width="200" height="50" fill="${RED}"/><rect x="0" y="280" width="200" height="50" fill="${RED}"/><rect x="0" y="390" width="200" height="40" fill="${RED}"/><rect x="100" y="100" width="60" height="340" fill="url(#hA)"/>`);
  s += `<rect x="46" y="112" width="108" height="14" rx="4" fill="${INK}"/><rect x="58" y="60" width="84" height="54" fill="#FFF3B0" stroke="${INK}" stroke-width="4"/><path d="M78,60 V114 M100,60 V114 M122,60 V114" stroke="${INK}" stroke-width="3"/>`;
  s += D('M50,62 L100,10 L150,62 Z', RED, 4) + HF('M50,62 L100,10 L150,62 Z', 'hA') + `<circle cx="100" cy="8" r="7" fill="${INK}"/>`;
  s += `<rect x="86" y="340" width="28" height="80" rx="12" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 200 430" width="100%" height="100%" style="overflow:visible">${s}</svg>`;
}

/* ---------------- gafas de sol para un busto (viewBox 360x460) ---------------- */
const SHADES_B = `<g><rect x="128" y="190" width="56" height="34" rx="12" fill="${INK}"/><rect x="176" y="190" width="56" height="34" rx="12" fill="${INK}"/><path d="M118,200 L130,198 M230,198 L242,200" stroke="${INK}" stroke-width="6"/><path d="M138,198 l18,0 M186,198 l18,0" stroke="#fff" stroke-width="4" opacity=".55"/></g>`;
const BOINA = `<g><path d="M110,160 C108,120 150,100 190,102 C236,104 262,124 254,160 Q182,150 110,160 Z" fill="#3a2f26" stroke="${INK}" stroke-width="4"/><path d="M110,160 C108,120 150,100 190,102 C236,104 262,124 254,160 Q182,150 110,160 Z" fill="url(#hD)"/><path d="M180,102 l4,-14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;

/* ---------------- bandera blanca: tela (se deforma en frame) ---------------- */
function flagPath(t, x0, y0, w, h) {
  const N = 10; let top = [], bot = [];
  for (let i = 0; i <= N; i++) { const k = i / N, x = x0 + w * k, a = Math.sin(t * 7 - k * 5) * 26 * k; top.push([x, y0 + a]); bot.push([x - k * 12, y0 + h + a * 1.2 + k * 10]); }
  return 'M' + top.map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'L' + bot.reverse().map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'Z';
}
