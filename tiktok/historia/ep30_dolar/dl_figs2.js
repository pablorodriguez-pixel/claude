/* Ep. 30 · figuras nuevas (grabado recortado): el «$», la D de imprenta, el real de a ocho, galeón, libro de cuentas,
   la P y la s de la transformación, cuna, balanza, tienda, campana, columnas, pizarra de Wall Street… */
const SILV = '#D6D8D2', SILV2 = '#A9ADA6', GREEN = '#2F5D46', BOARD = '#1F2A24';
defsSvg.querySelector('defs').insertAdjacentHTML('beforeend', `
<linearGradient id="silv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F5F1"/><stop offset=".45" stop-color="${SILV}"/><stop offset=".7" stop-color="#EEF0EA"/><stop offset="1" stop-color="${SILV2}"/></linearGradient>
<linearGradient id="silvD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C9CCC4"/><stop offset="1" stop-color="#8E928B"/></linearGradient>
<radialGradient id="glowY" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="rgba(255,230,0,.75)"/><stop offset="1" stop-color="rgba(255,230,0,0)"/></radialGradient>`);

/* ---------- el «$» de grabado (viewBox 0 0 600 900). back=true → cara de atrás (más oscura) ---------- */
function dollarSvg(o = {}) {
  // mismo trazo que la transformación: la S + UNA raya (el «$» de tu teclado)
  const g = (st, w, extra = '') => `<g transform="translate(300 450) scale(1.12)" ${extra}><path d="M0,-345 V350" stroke="${st}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${S_PATH}" stroke="${st}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return `<svg viewBox="0 0 600 900" width="100%" height="100%" style="overflow:visible">
  <g transform="translate(16 20)">${g(SH, 132)}</g>
  ${g('#fff', 140)}${g(INK, 112)}
  <g class="face">${g('url(#silv)', 82)}${g('url(#hA)', 82, 'opacity=".3"')}</g>
  <g class="back" style="opacity:0">${g('url(#silvD)', 82)}</g>
  <path d="M206,236 q40,-44 104,-40" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".85"/></svg>`;
}
// letra de imprenta (taco de madera) viewBox 0 0 300 340
function woodLetterSvg(ch, col = INK) {
  let gr = ''; for (let i = 0; i < 9; i++) gr += `<path d="M${10 + i * 34},12 q8,150 -4,318" stroke="#7a5230" stroke-width="2" fill="none" opacity=".45"/>`;
  return `<svg viewBox="0 0 300 340" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="300" height="340" rx="16"/>', 9, 11)}
  <rect x="0" y="0" width="300" height="340" rx="16" fill="${WOOD}" stroke="${INK}" stroke-width="7"/>${gr}<rect x="0" y="0" width="300" height="340" rx="16" fill="url(#hW)" opacity=".18"/>
  <rect x="18" y="18" width="264" height="304" rx="10" fill="none" stroke="${INK}" stroke-width="3" opacity=".5"/>
  <text x="150" y="282" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="300" fill="${col}" stroke="#fff" stroke-width="8" paint-order="stroke">${ch}</text></svg>`;
}

/* ---------- REAL DE A OCHO «columnario» (viewBox 0 0 400 400): columnas con banda en S, dos mundos, corona, marca de ceca ---------- */
function pesoCoinSvg(mark = 'Mº', o = {}) {
  let beads = ''; for (let k = 0; k < 64; k++) { const a = k / 64 * Math.PI * 2; beads += `<circle cx="${f1(200 + Math.cos(a) * 172)}" cy="${f1(200 + Math.sin(a) * 172)}" r="4" fill="${SILV2}" stroke="${INK}" stroke-width="1.4"/>`; }
  const pillar = x => `<rect x="${x - 15}" y="120" width="30" height="176" fill="#EEF0EA" stroke="${INK}" stroke-width="4"/><path d="M${x - 9},126 V290 M${x},126 V290 M${x + 9},126 V290" stroke="${INK}" stroke-width="1.6" opacity=".55"/>
    <rect x="${x - 24}" y="106" width="48" height="16" rx="3" fill="${SILV}" stroke="${INK}" stroke-width="3.5"/><rect x="${x - 24}" y="294" width="48" height="14" rx="3" fill="${SILV}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M${x - 16},104 L${x - 12},84 L${x - 4},96 L${x},80 L${x + 4},96 L${x + 12},84 L${x + 16},104 Z" fill="${SILV}" stroke="${INK}" stroke-width="3"/>
    <path d="M${x - 28},160 C${x - 6},150 ${x + 30},172 ${x + 26},190 C${x + 22},206 ${x - 30},200 ${x - 26},220 C${x - 22},238 ${x + 20},236 ${x + 28},252" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M${x - 28},160 C${x - 6},150 ${x + 30},172 ${x + 26},190 C${x + 22},206 ${x - 30},200 ${x - 26},220 C${x - 22},238 ${x + 20},236 ${x + 28},252" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  const glob = (cx) => `<circle cx="${cx}" cy="208" r="44" fill="#EEF0EA" stroke="${INK}" stroke-width="4"/><path d="M${cx - 44},208 H${cx + 44} M${cx},164 V252" stroke="${INK}" stroke-width="2"/><ellipse cx="${cx}" cy="208" rx="18" ry="44" fill="none" stroke="${INK}" stroke-width="2"/><path d="M${cx - 30},186 q14,10 24,-4 q10,16 26,8 M${cx - 26},228 q16,-8 30,6 q8,-6 18,-2" stroke="${INK}" stroke-width="3" fill="none"/>`;
  return `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible">
  <circle cx="212" cy="214" r="192" fill="${SH}"/><circle cx="200" cy="200" r="198" fill="#fff"/>
  <circle cx="200" cy="200" r="186" fill="url(#silv)" stroke="${INK}" stroke-width="7"/>${beads}
  <circle cx="200" cy="200" r="156" fill="none" stroke="${INK}" stroke-width="3"/>
  ${pillar(96)}${pillar(304)}${glob(176)}${glob(224)}
  <path d="M150,150 L156,118 L172,134 L184,108 L200,128 L216,108 L228,134 L244,118 L250,150 Z" fill="#EEF0EA" stroke="${INK}" stroke-width="4"/><circle cx="200" cy="100" r="7" fill="#EEF0EA" stroke="${INK}" stroke-width="3"/>
  <path d="M130,304 q18,-12 35,0 q18,12 35,0 q18,-12 35,0 q18,12 35,0" stroke="${INK}" stroke-width="4" fill="none"/>
  <text x="200" y="${o.markY || 352}" text-anchor="middle" font-family="Rye" font-size="${o.markSize || 40}" fill="${INK}">${mark}</text>
  <circle cx="200" cy="200" r="186" fill="url(#hA)" opacity=".18"/><path d="M70,120 A150,150 0 0 1 150,52" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
}
// moneda de «dólar» genérica (grabado, sin reproducir ninguna moneda real) viewBox 0 0 400 400
function dollarCoinSvg(o = {}) {
  let beads = ''; for (let k = 0; k < 56; k++) { const a = k / 56 * Math.PI * 2; beads += `<circle cx="${f1(200 + Math.cos(a) * 172)}" cy="${f1(200 + Math.sin(a) * 172)}" r="4" fill="${SILV2}" stroke="${INK}" stroke-width="1.4"/>`; }
  let stars = ''; for (let k = 0; k < 13; k++) { const a = Math.PI * (1.12 + k / 12 * 0.76); stars += `<text x="${f1(200 + Math.cos(a) * 138)}" y="${f1(214 + Math.sin(a) * 138)}" text-anchor="middle" font-size="22" fill="${INK}">★</text>`; }
  return `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible">
  <circle cx="212" cy="214" r="192" fill="${SH}"/><circle cx="200" cy="200" r="198" fill="#fff"/>
  <circle cx="200" cy="200" r="186" fill="url(#silv)" stroke="${INK}" stroke-width="7" ${o.dash ? 'stroke-dasharray="18 12"' : ''}/>${beads}
  <circle cx="200" cy="200" r="156" fill="none" stroke="${INK}" stroke-width="3"/>${stars}
  ${o.noSign ? '' : `<text x="200" y="250" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="150" fill="${INK}">$</text>`}
  <text x="200" y="320" text-anchor="middle" font-family="Rye" font-size="38" fill="${INK}">DÓLAR</text>
  <circle cx="200" cy="200" r="186" fill="url(#hA)" opacity=".18"/><path d="M70,120 A150,150 0 0 1 150,52" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
}
// canto de moneda (para el giro): banda vertical
const coinEdgeSvg = () => `<svg viewBox="0 0 40 400" width="100%" height="100%" style="overflow:visible"><rect x="0" y="14" width="40" height="372" rx="20" fill="${SILV2}" stroke="${INK}" stroke-width="6"/><path d="M8,40 V360 M20,30 V370 M32,40 V360" stroke="${INK}" stroke-width="2" opacity=".5"/></svg>`;

/* ---------- galeón (viewBox 0 0 320 300), sin banderas ---------- */
function galleonSvg() {
  const hull = 'M20,200 L300,200 L270,260 L52,260 Z', stern = 'M230,170 L300,170 L300,200 L230,200 Z';
  const sail = (x, y, w, h) => `M${x},${y} Q${x + w / 2},${y + 14} ${x + w},${y} L${x + w + 8},${y + h} Q${x + w / 2},${y + h + 22} ${x - 8},${y + h} Z`;
  const sails = [sail(70, 70, 70, 100), sail(150, 40, 80, 120), sail(240, 80, 50, 80)];
  let s = cut(P(hull) + P(stern) + sails.map(P).join(''), 6, 8);
  s += `<path d="M105,40 V200 M190,10 V200 M265,60 V200" stroke="${INK}" stroke-width="7"/>`;
  sails.forEach(d => s += D(d, '#FBF6EA', 4) + `<path d="${d}" fill="url(#hP)" opacity=".7"/>`);
  s += `<path d="M105,40 L118,48 L105,56 Z M190,10 L204,18 L190,26 Z" fill="${PINK}" stroke="${INK}" stroke-width="2.5"/>`;
  s += D(stern, WOOD, 4) + D(hull, '#7a4a26', 5) + `<path d="${hull}" fill="url(#hW)" opacity=".35"/><path d="M34,222 H286" stroke="${YEL}" stroke-width="5"/>`;
  [80, 120, 160, 200, 240].forEach(x => s += `<circle cx="${x}" cy="238" r="7" fill="${INK}"/>`);
  return s;
}
// cofre de monedas (viewBox 0 0 200 160)
function chestSvg() {
  const b = 'M10,60 L190,60 L180,150 L20,150 Z';
  let c = ''; [[50, 50], [80, 40], [110, 46], [140, 38], [160, 52], [66, 30], [124, 26]].forEach(q => c += `<ellipse cx="${q[0]}" cy="${q[1]}" rx="20" ry="12" fill="url(#silv)" stroke="${INK}" stroke-width="3"/>`);
  return cut(P(b) + '<ellipse cx="100" cy="46" rx="90" ry="34"/>', 5, 6) + c + D(b, '#7a4a26', 4) + `<path d="${b}" fill="url(#hW)" opacity=".4"/><rect x="88" y="80" width="24" height="30" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M14,96 H186" stroke="${BRASS}" stroke-width="6"/>`;
}

/* ---------- mercado mexicano (puesto) y kiosco porteño: escenografía (1080 x 1100) ---------- */
function picadoSvg(w, y0, n, cols) {
  let s = `<path d="M0,${y0} Q${w / 2},${y0 + 40} ${w},${y0}" stroke="${INK}" stroke-width="4" fill="none"/>`; const sw = w / n;
  for (let i = 0; i < n; i++) {
    const x = i * sw + 6, yy = y0 + 4 + Math.sin((i + 0.5) / n * Math.PI) * 36, c = cols[i % cols.length];
    s += `<path d="M${f1(x)},${f1(yy)} H${f1(x + sw - 12)} V${f1(yy + 92)} L${f1(x + (sw - 12) * 0.75)},${f1(yy + 78)} L${f1(x + (sw - 12) / 2)},${f1(yy + 96)} L${f1(x + (sw - 12) * 0.25)},${f1(yy + 78)} L${f1(x)},${f1(yy + 92)} Z" fill="${c}" stroke="${INK}" stroke-width="3"/>`;
    s += `<circle cx="${f1(x + (sw - 12) / 2)}" cy="${f1(yy + 34)}" r="11" fill="#EFE1C6" stroke="${INK}" stroke-width="2"/><path d="M${f1(x + 10)},${f1(yy + 62)} h${f1(sw - 32)}" stroke="#EFE1C6" stroke-width="6" stroke-dasharray="6 6"/>`;
  }
  return s;
}
function marketSvg() {
  const aw = 'M60,420 L1020,420 L980,560 L100,560 Z';
  let st = ''; for (let i = 0; i < 12; i++) st += `<path d="M${60 + i * 80},420 L${140 + i * 80},420 L${133 + i * 73.3},560 L${100 + i * 73.3},560 Z" fill="${i % 2 ? '#fff' : PINK}" stroke="${INK}" stroke-width="3"/>`;
  let fr = ''; const r = rng(31);
  for (let row = 0; row < 3; row++) for (let i = 0; i < 9 - row; i++) {
    const cx = 260 + row * 26 + i * 54, cy = 900 - row * 44, col = [RED, '#F28C28', '#9DBF4A'][(i + row) % 3];
    fr += `<circle cx="${cx}" cy="${cy}" r="27" fill="${col}" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx - 9}" cy="${cy - 9}" r="7" fill="#fff" opacity=".5"/>`;
  }
  void r;
  return `<svg width="1080" height="1300" style="overflow:visible;position:absolute;left:0;top:0">
  <rect x="130" y="560" width="22" height="520" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="928" y="560" width="22" height="520" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>
  ${cut(`<path d="${aw}"/>`)}${st}<path d="${aw}" fill="url(#hA)" opacity=".15"/><path d="M100,560 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0 q40,30 80,0" fill="#fff" stroke="${INK}" stroke-width="3"/>
  ${picadoSvg(1080, 300, 9, [PINK, YEL, '#7BC6A4', '#F28C28', '#8E7CC3'])}
  ${cut('<rect x="200" y="930" width="760" height="170" rx="10"/>')}<rect x="200" y="930" width="760" height="170" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="200" y="930" width="760" height="170" rx="10" fill="url(#hW)" opacity=".3"/>
  <path d="M250,930 q20,-40 60,-40 h560 q40,0 60,40" fill="#C9A46A" stroke="${INK}" stroke-width="4"/>${fr}</svg>`;
}
function kioskSvg() {
  let mags = ''; const cols = [PINK, YEL, '#7BC6A4', '#F28C28', '#8E7CC3', '#fff', RED, '#9fd3e0'];
  for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) { const x = 250 + i * 104, y = 640 + row * 130; mags += `<rect x="${x}" y="${y}" width="88" height="114" rx="4" fill="${cols[(i + row * 3) % 8]}" stroke="${INK}" stroke-width="3.5"/><path d="M${x + 10},${y + 20} h60 M${x + 10},${y + 36} h40" stroke="${INK}" stroke-width="5"/><rect x="${x + 14}" y="${y + 52}" width="60" height="44" fill="url(#hA)" opacity=".5"/>`; }
  return `<svg width="1080" height="1300" style="overflow:visible;position:absolute;left:0;top:0">
  ${cut('<path d="M180,520 L900,520 L940,600 L940,1120 L140,1120 L140,600 Z"/>')}
  <path d="M180,520 L900,520 L940,600 L140,600 Z" fill="${GREEN}" stroke="${INK}" stroke-width="5"/><text x="540" y="580" text-anchor="middle" font-family="Rye" font-size="52" fill="${YEL}">KIOSCO</text>
  <rect x="140" y="600" width="800" height="520" fill="#3b6f55" stroke="${INK}" stroke-width="5"/><rect x="220" y="620" width="660" height="420" fill="#F4ECDB" stroke="${INK}" stroke-width="4"/>${mags}
  <rect x="140" y="1040" width="800" height="80" fill="${GREEN}" stroke="${INK}" stroke-width="5"/><path d="M160,1060 H920" stroke="${BRASS}" stroke-width="4"/>
  <rect x="140" y="600" width="800" height="520" fill="url(#hA)" opacity=".12"/></svg>`;
}
// cartel de precio (HTML)
function priceTag(pa, x, y, txt, o = {}) {
  const e = el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 120), color: INK, background: o.bg || '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '18px', padding: '0 34px 8px', boxShadow: `9px 10px 0 ${SH}`, whiteSpace: 'nowrap', lineHeight: 1.1, zIndex: o.z || 30 }, txt);
  return e;
}

/* ---------- libro de cuentas (HTML + SVG) ---------- */
function ledgerPage(pa, x, y, w, h, o = {}) {
  const pg = box(pa, x, y, w, h, { zIndex: o.z || 5 });
  let ln = ''; for (let yy = 90; yy < h - 20; yy += 64) ln += `<path d="M30,${yy} H${w - 30}" stroke="#7a9ab0" stroke-width="2" opacity=".6"/>`;
  pg.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="10"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="#F7EFD9" stroke="${INK}" stroke-width="5"/>
  <rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="url(#hP)" opacity=".35"/>${ln}<path d="M${w * 0.62},20 V${h - 20} M${w * 0.64},20 V${h - 20}" stroke="${RED}" stroke-width="2" opacity=".6"/>
  <ellipse cx="${w * 0.8}" cy="${h * 0.86}" rx="60" ry="34" fill="#c9a46a" opacity=".25"/></svg>`;
  return pg;
}

/* ---------- LA TRANSFORMACIÓN: geometría de la P y la s (coordenadas de escena 1080 x 1920) ---------- */
const PG = { x: 470, top: 410, bot: 1110, sw: 54 };
const P_STEM = `M${PG.x},${PG.top} V${PG.bot}`;
const P_BOWL = `M${PG.x},${PG.top + 14} C${PG.x + 190},${PG.top - 10} ${PG.x + 300},${PG.top + 50} ${PG.x + 300},${PG.top + 180} C${PG.x + 300},${PG.top + 320} ${PG.x + 170},${PG.top + 360} ${PG.x},${PG.top + 350}`;
// la S (local, centrada en 0,0; alto ≈ 600)
const S_PATH = 'M150,-226 C104,-292 -168,-298 -168,-140 C-168,6 176,-36 176,128 C176,300 -116,312 -178,212';
const S_SMALL = { x: PG.x + 360, y: PG.top + 110, s: 0.3 }, S_BIG = { x: PG.x, y: (PG.top + PG.bot) / 2 + 8, s: 1 };
// glifo mini para la tira de pasos (viewBox 0 0 1080 1920 recortado) — stage 1..4
function miniGlyph(stage) {
  const sp = stage === 1 ? S_SMALL : S_BIG;
  const stem = stage >= 3 ? `M${PG.x},${PG.top - 10} V${PG.bot + 10}` : P_STEM;
  const bowl = stage <= 2 ? `<path d="${P_BOWL}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>` : '';
  const sCol = stage === 4 ? INK : INK;
  return `<svg viewBox="${PG.x - 300} ${PG.top - 60} 760 880" width="100%" height="100%" style="overflow:visible">
   <path d="${stem}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>${bowl}
   <g transform="translate(${sp.x} ${sp.y}) scale(${sp.s})"><path d="${S_PATH}" stroke="${sCol}" stroke-width="${PG.sw / sp.s * (stage === 1 ? 0.55 : 1)}" fill="none" stroke-linecap="round"/></g></svg>`;
}
// variantes manuscritas para el montaje «de tanto escribirlo rápido» (k = 0..4: la s baja y se monta)
function handVariant(k) {
  const sx = lerp(S_SMALL.x, S_BIG.x, [0, 0.35, 0.7, 0.92, 1][k]), sy = lerp(S_SMALL.y, S_BIG.y, [0, 0.3, 0.65, 0.9, 1][k]), ss = lerp(S_SMALL.s, S_BIG.s, [0, 0.3, 0.6, 0.85, 1][k]);
  const bowlO = [1, 1, 0.85, 0.4, 0][k];
  return `<svg viewBox="${PG.x - 300} ${PG.top - 60} 760 880" width="100%" height="100%" style="overflow:visible">
   <path class="hv" pathLength="100" d="${P_STEM}" stroke="#3a2a6a" stroke-width="40" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"/>
   <path class="hv" pathLength="100" d="${P_BOWL}" stroke="#3a2a6a" stroke-width="40" fill="none" stroke-linecap="round" opacity="${bowlO}" stroke-dasharray="100" stroke-dashoffset="100"/>
   <g transform="translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss * 100) / 100})"><path class="hv" pathLength="100" d="${S_PATH}" stroke="#3a2a6a" stroke-width="${f1(40 / ss * (k === 0 ? 0.6 : 1))}" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"/></g></svg>`;
}

/* ---------- cuna con el «bebé dólar» (viewBox 0 0 600 420) ---------- */
function cribSvg() {
  const base = 'M40,240 L560,240 L540,380 L60,380 Z';
  let bars = ''; for (let x = 80; x <= 520; x += 40) bars += `<rect x="${x - 6}" y="140" width="12" height="130" rx="5" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`;
  return `${cut(P(base) + '<rect x="30" y="100" width="40" height="300" rx="10"/><rect x="530" y="100" width="40" height="300" rx="10"/>', 7, 9)}
  <rect x="30" y="100" width="40" height="300" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="530" y="100" width="40" height="300" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
  <circle cx="50" cy="96" r="22" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><circle cx="550" cy="96" r="22" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
  <rect x="60" y="130" width="480" height="18" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>${bars}
  <path d="M70,250 Q300,190 530,250 L530,300 L70,300 Z" fill="#9fd3e0" stroke="${INK}" stroke-width="4"/><path d="M70,250 Q300,190 530,250 L530,300 L70,300 Z" fill="url(#hB)" opacity=".3"/>
  ${D(base, '#C9A46A', 5)}<path d="${base}" fill="url(#hW)" opacity=".3"/><path d="M80,280 Q300,300 520,280" stroke="${INK}" stroke-width="3" fill="none"/>`;
}
// cara para una moneda personificada (HTML encima de la moneda), viewBox 0 0 400 400
const coinFaceSvg = () => `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible">
  <g class="eyesO"><circle cx="150" cy="170" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="250" cy="170" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="154" cy="174" r="9" fill="${INK}"/><circle cx="254" cy="174" r="9" fill="${INK}"/></g>
  <g class="eyesC"><path d="M128,172 q22,16 44,0 M228,172 q22,16 44,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <circle cx="200" cy="262" r="30" fill="${PINK}" stroke="${INK}" stroke-width="5"/><rect x="186" y="234" width="28" height="18" rx="6" fill="${YEL}" stroke="${INK}" stroke-width="4"/>
  <circle cx="120" cy="230" r="18" fill="${ROUGE}"/><circle cx="280" cy="230" r="18" fill="${ROUGE}"/></svg>`;

/* ---------- balanza (viewBox 0 0 900 700): brazo .beam y platillos .panL/.panR ---------- */
function balanceSvg() {
  const pan = (cls, x) => `<g class="${cls}"><path d="M${x},140 L${x - 120},420 M${x},140 L${x + 120},420" stroke="${INK}" stroke-width="4"/><path d="M${x - 150},420 Q${x},470 ${x + 150},420 Z" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M${x - 150},420 Q${x},470 ${x + 150},420 Z" fill="url(#hA)" opacity=".4"/></g>`;
  return `<svg viewBox="0 0 900 700" width="100%" height="100%" style="overflow:visible">
  ${cut('<path d="M330,690 L570,690 L520,640 L380,640 Z"/><rect x="434" y="150" width="32" height="500"/>', 6, 8)}
  <path d="M330,690 L570,690 L520,640 L380,640 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="434" y="150" width="32" height="500" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="434" y="150" width="32" height="500" fill="url(#hD)" opacity=".4"/>
  <g class="beam"><rect x="120" y="128" width="660" height="26" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="450" cy="141" r="22" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>${pan('panL', 150)}${pan('panR', 750)}</g>
  <path d="M450,110 L438,60 L462,60 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`;
}

/* ---------- tienda antigua de Nueva York (escenografía 1080) ---------- */
function shopSvg() {
  let win = ''; for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) win += `<rect x="${170 + i * 90}" y="${700 + j * 110}" width="80" height="100" fill="#cfe0e6" stroke="${INK}" stroke-width="4"/><rect x="${170 + i * 90}" y="${700 + j * 110}" width="80" height="100" fill="url(#hB)" opacity=".25"/>`;
  let jars = ''; [[640, 760], [700, 740], [760, 770], [820, 750]].forEach((q, i) => jars += `<rect x="${q[0]}" y="${q[1]}" width="50" height="${70 + i * 6}" rx="10" fill="${['#F28C28', RED, '#9DBF4A', YEL][i]}" stroke="${INK}" stroke-width="3.5"/><rect x="${q[0] - 4}" y="${q[1] - 10}" width="58" height="16" rx="4" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`);
  return `<svg width="1080" height="1300" style="overflow:visible;position:absolute;left:0;top:0">
  <rect x="0" y="380" width="1080" height="900" fill="#B86B4B"/><rect x="0" y="380" width="1080" height="900" fill="url(#hW)" opacity=".18"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => `<path d="M0,${400 + k * 64} H1080" stroke="${INK}" stroke-width="2" opacity=".35"/>`).join('')}
  ${cut('<rect x="110" y="460" width="860" height="140" rx="10"/>')}<rect x="110" y="460" width="860" height="140" rx="10" fill="${GREEN}" stroke="${INK}" stroke-width="6"/><rect x="128" y="476" width="824" height="108" rx="6" fill="none" stroke="${BRASS}" stroke-width="4"/>
  <text x="540" y="560" text-anchor="middle" font-family="Rye" font-size="70" fill="${YEL}">GENERAL STORE</text>
  <rect x="140" y="660" width="320" height="520" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>${win}
  <rect x="600" y="660" width="340" height="300" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/>${jars}<path d="M600,830 H940" stroke="${WOOD}" stroke-width="10"/></svg>`;
}
const apronOver = () => `<path d="M120,360 L240,360 L262,460 L98,460 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3.5"/><path d="M120,360 L150,330 M240,360 L210,330" stroke="${INK}" stroke-width="4"/><rect x="150" y="400" width="60" height="36" fill="none" stroke="${INK}" stroke-width="3"/>`;
function shopkeeperInner() { return bustInner({ uniform: 'farmer', moustache: true, seed: 52 }) + coatOver('#5a3a2a') + apronOver() + capOver(); }
// campana agrietada (viewBox 0 0 300 340), sin banderas
function bellSvg() {
  const b = 'M150,40 C90,40 70,100 70,170 C70,230 50,260 30,290 L270,290 C250,260 230,230 230,170 C230,100 210,40 150,40 Z';
  return cut(P(b) + '<rect x="120" y="0" width="60" height="50" rx="10"/>', 6, 8) + `<rect x="120" y="0" width="60" height="50" rx="10" fill="#5e4a2e" stroke="${INK}" stroke-width="5"/>` + D(b, '#A98A4A', 6) + `<path d="${b}" fill="url(#hA)" opacity=".45"/>
  <path d="M40,280 H260" stroke="${INK}" stroke-width="5"/><path d="M60,250 H240" stroke="${INK}" stroke-width="3"/><path d="M110,120 q30,-40 70,-30" stroke="#fff" stroke-width="8" fill="none" opacity=".5" stroke-linecap="round"/>
  <path class="crack" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" d="M140,290 L150,250 L136,220 L152,186 L140,150 L150,120" stroke="${INK}" stroke-width="7" fill="none" stroke-linejoin="round"/>
  <ellipse cx="150" cy="306" rx="26" ry="20" fill="#5e4a2e" stroke="${INK}" stroke-width="5"/>`;
}

/* ---------- columnas de Hércules con la banda en S (viewBox 0 0 800 900) ---------- */
function columnsSvg() {
  const col = x => `${cut(`<rect x="${x - 70}" y="160" width="140" height="640"/>`, 7, 9)}<rect x="${x - 70}" y="160" width="140" height="640" fill="#F1EBDD" stroke="${INK}" stroke-width="6"/>
   ${[-46, -23, 0, 23, 46].map(d => `<path d="M${x + d},170 V790" stroke="${INK}" stroke-width="3" opacity=".5"/>`).join('')}<rect x="${x + 20}" y="160" width="50" height="640" fill="url(#hA)" opacity=".5"/>
   <rect x="${x - 96}" y="110" width="192" height="56" rx="8" fill="#F1EBDD" stroke="${INK}" stroke-width="6"/><rect x="${x - 110}" y="790" width="220" height="60" rx="8" fill="#F1EBDD" stroke="${INK}" stroke-width="6"/>
   <path d="M${x - 60},110 L${x - 50},50 L${x - 22},86 L${x},36 L${x + 22},86 L${x + 50},50 L${x + 60},110 Z" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>`;
  const band = x => `<path d="M${x - 130},300 C${x - 40},250 ${x + 140},320 ${x + 110},400 C${x + 80},480 ${x - 140},440 ${x - 110},540 C${x - 80},620 ${x + 100},600 ${x + 130},640" stroke="${INK}" stroke-width="64" fill="none" stroke-linecap="round"/>
   <path d="M${x - 130},300 C${x - 40},250 ${x + 140},320 ${x + 110},400 C${x + 80},480 ${x - 140},440 ${x - 110},540 C${x - 80},620 ${x + 100},600 ${x + 130},640" stroke="${RED}" stroke-width="48" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 800 900" width="100%" height="100%" style="overflow:visible">${col(200)}${col(600)}<g class="bandS">${band(200)}${band(600)}</g>
   <text x="200" y="420" text-anchor="middle" font-family="Rye" font-size="34" fill="#fff" transform="rotate(-24 200 420)">PLVS</text><text x="600" y="420" text-anchor="middle" font-family="Rye" font-size="34" fill="#fff" transform="rotate(-24 600 420)">VLTRA</text></svg>`;
}

/* ---------- fracciones y pizarra de cotizaciones ---------- */
const FR = (n, d, sz = 1) => `<span style="display:inline-block;position:relative;font-size:${sz}em;line-height:1;vertical-align:0.08em"><span style="display:inline-block;transform:translateY(-0.32em);font-size:.62em">${n}</span><span style="display:inline-block;font-size:.8em;margin:0 .02em">/</span><span style="display:inline-block;transform:translateY(0.14em);font-size:.62em">${d}</span></span>`;
function quoteBoard(pa, x, y, w, rows, o = {}) {
  const b = box(pa, x, y, w, rows.length * 118 + 120, { zIndex: o.z || 6, background: BOARD, border: `10px solid ${INK}`, borderRadius: '14px', boxShadow: `12px 14px 0 ${SH}` });
  el('div', b, { left: '0', top: '18px', width: px(w - 20), textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: YEL, letterSpacing: '0.06em' }, o.title || 'COTIZACIONES');
  const R = [];
  rows.forEach((rw, i) => {
    const r = el('div', b, { left: '26px', top: px(96 + i * 118), width: px(w - 72), height: '104px', borderTop: '3px dashed rgba(255,255,255,.25)', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '64px', color: '#E8F2E0', lineHeight: '104px', whiteSpace: 'nowrap' });
    r.innerHTML = `<span style="position:absolute;left:0">${rw[0]}</span><span class="pr" style="position:absolute;right:${o.arrow === false ? 0 : 70}px;color:${YEL};font-family:Playfair;font-weight:900;font-size:76px">${rw[1]}</span>${o.arrow === false ? '' : `<span style="position:absolute;right:0;color:${rw[2] ? '#7BE07B' : '#FF6B6B'}">${rw[2] ? '▲' : '▼'}</span>`}`;
    R.push(r);
  });
  return { b, R };
}
// corredor de bolsa con teléfono (busto)
const phoneOver = () => `<g transform="rotate(-20 250 250)"><rect x="236" y="180" width="34" height="140" rx="14" fill="${INK}" stroke="${INK}" stroke-width="3"/><ellipse cx="253" cy="186" rx="26" ry="16" fill="${INK}"/><ellipse cx="253" cy="314" rx="26" ry="16" fill="${INK}"/></g><path d="M262,330 q40,40 20,100" stroke="${INK}" stroke-width="5" fill="none"/>`;
const TIE = () => `<path d="M172,330 L188,330 L196,420 L180,446 L164,420 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`;
function brokerInner() { return bustInner({ uniform: 'soldier', moustache: false, seed: 88 }) + coatOver('#2a3340') + `<path d="M150,330 L180,400 L210,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>` + TIE() + hairOverN() + phoneOver(); }
// letrero de calle
const streetSignSvg = (txt) => `<svg viewBox="0 0 520 150" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="520" height="130" rx="14"/>', 6, 8)}<rect x="0" y="0" width="520" height="130" rx="14" fill="${GREEN}" stroke="${INK}" stroke-width="6"/><rect x="12" y="12" width="496" height="106" rx="9" fill="none" stroke="#fff" stroke-width="4"/><text x="260" y="92" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="70" fill="#fff" letter-spacing="4">${txt}</text></svg>`;

/* ---------- moneda en 8 porciones (cada porción es un div con la moneda recortada) ---------- */
function coinWedges(pa, x, y, sz, mark) {
  const W8 = [];
  for (let k = 0; k < 8; k++) {
    const a0 = (k / 8) * Math.PI * 2 - Math.PI / 2, a1 = ((k + 1) / 8) * Math.PI * 2 - Math.PI / 2, R = 210;
    const d = `M200,200 L${f1(200 + Math.cos(a0) * R)},${f1(200 + Math.sin(a0) * R)} A${R},${R} 0 0 1 ${f1(200 + Math.cos(a1) * R)},${f1(200 + Math.sin(a1) * R)} Z`;
    const e = box(pa, x, y, sz, sz, { zIndex: 10, transformOrigin: `${sz / 2}px ${sz / 2}px` });
    const id = uid('wd');
    e.innerHTML = `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible"><clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})"><foreignObject x="0" y="0" width="400" height="400"></foreignObject></g><path d="${d}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`;
    // la moneda se pinta dentro de un <g> recortado (sin foreignObject: insertamos el svg interno)
    const g = e.querySelector('g'); g.innerHTML = pesoCoinSvg(mark).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    const am = (a0 + a1) / 2;
    W8.push({ e, dx: Math.cos(am), dy: Math.sin(am), am });
  }
  return W8;
}
