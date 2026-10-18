/* Ep. 37 · Violet Jessop (rehecho) — figuras de grabado recortado reutilizadas de Ep. 28 */
/* ---------- constantes y utilidades (de Ep. 25) ---------- */
const GOLD = '#E9C75C', SEA2 = '#C9D3C6', LAGOON = '#9DB7AE', NIGHT = '#1d2a3c', NIGHT2 = '#33475f', DEEP = '#123a44', DEEP2 = '#0b2229';
const HULL = '#1e1a17', BUFF = '#D9A44A', BRONZE = '#B8862F', CAP = '#FBF8F0', NAVY = '#26324a', ARG = '#7DB7E0';
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const qMark = (pa, x, y, sz = 110, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 30 }, '?');
function bubble(pa, x, y, html, o = {}) {
  const b = el('div', pa, { left: px(x), top: px(y), background: o.bg || '#fff', border: `${o.bw || 6}px solid ${INK}`, borderRadius: o.rad || '46px', padding: o.pad || '10px 34px 16px', fontFamily: o.font || 'Playfair', fontWeight: o.fw || 900, fontStyle: o.it ? 'italic' : 'normal', fontSize: px(o.size || 70), color: o.color || INK, whiteSpace: 'nowrap', lineHeight: 1.05, boxShadow: `8px 9px 0 ${SH}`, zIndex: o.z || 30, letterSpacing: o.ls || '0' }, html);
  const tl = o.tail || 'bl';
  const pos = { bl: 'left:44px;bottom:-46px', br: 'right:44px;bottom:-46px', b: 'left:calc(50% - 28px);bottom:-46px', l: 'left:-50px;top:calc(50% - 26px)', r: 'right:-50px;top:calc(50% - 26px)' }[tl];
  const pth = { bl: 'M4,0 L56,0 L10,48 Z', br: 'M4,0 L56,0 L50,48 Z', b: 'M4,0 L56,0 L30,48 Z', l: 'M60,4 L60,52 L0,40 Z', r: 'M0,4 L0,52 L60,40 Z' }[tl];
  const tw = document.createElement('div'); tw.style.cssText = `position:absolute;${pos};width:60px;height:56px;`;
  tw.innerHTML = `<svg width="60" height="56" style="overflow:visible"><path d="${pth}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="${o.bw || 6}" stroke-linejoin="round"/><path d="${tl === 'l' ? 'M62,8 L62,48' : tl === 'r' ? 'M-2,8 L-2,48' : 'M8,-4 L52,-4'}" stroke="${o.bg || '#fff'}" stroke-width="${(o.bw || 6) + 3}"/></svg>`;
  b.appendChild(tw);
  return b;
}
function waterSvg(y0 = 1080, h = 420, seed = 3, col = LAGOON, line = INK, w = 1080) {
  const r = rng(seed); let wv = '';
  for (let y = y0 + 20; y < y0 + h; y += 22) { let d = ''; for (let x = -40; x < w + 40; x += 60 + r() * 40) d += `M${f1(x)},${f1(y + r() * 6)} q16,-8 32,0`; wv += `<path d="${d}" stroke="${line}" stroke-width="2.6" fill="none" opacity="${f1(0.25 + (y - y0) / h * 0.4)}"/>`; }
  return `<svg width="${w}" height="1920" style="overflow:visible;position:absolute;left:0;top:0"><rect x="-20" y="${y0}" width="${w + 40}" height="${h}" fill="${col}" stroke="${INK}" stroke-width="5"/><rect x="-20" y="${y0}" width="${w + 40}" height="${h}" fill="url(#hF)" opacity=".25"/>${wv}</svg>`;
}
function globeInner(phase = 0) {
  const id = uid('gl');
  let s = cut('<circle cx="200" cy="200" r="180"/>') + `<circle cx="200" cy="200" r="180" fill="${SEA2}" stroke="${INK}" stroke-width="6"/>`;
  let cont = '';
  [[-0.4, 120, 60, 50], [0.5, 150, 80, 70], [1.4, 240, 70, 46], [2.3, 160, 50, 80], [3.2, 260, 60, 40], [4.2, 130, 70, 60], [5.2, 230, 50, 50]].forEach(([a, cy, rx, ry]) => { const x = 200 + Math.sin(a + phase) * 150; if (Math.cos(a + phase) > -0.1) cont += `<ellipse cx="${f1(x)}" cy="${cy}" rx="${f1(rx * Math.max(0.2, Math.cos(a + phase)))}" ry="${ry}" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`; });
  s += clipG(id, 'M20,200 A180,180 0 1,0 380,200 A180,180 0 1,0 20,200 Z', cont + `<rect x="0" y="0" width="400" height="400" fill="url(#hP)"/><ellipse cx="250" cy="230" rx="170" ry="190" fill="url(#hA)" opacity=".5"/>`);
  s += `<ellipse cx="200" cy="200" rx="180" ry="56" fill="none" stroke="${INK}" stroke-width="2.5"/><ellipse cx="200" cy="200" rx="70" ry="180" fill="none" stroke="${INK}" stroke-width="2.5"/><path d="M20,200 H380 M200,20 V380" stroke="${INK}" stroke-width="2.5"/>`;
  return s;
}
const svgBox = (pa, x, y, w, h, inner, vb, z = 5) => { const d = box(pa, x, y, w, h, { zIndex: z }); d.innerHTML = svgW(inner, vb || `0 0 ${w} ${h}`); return d; };
const stars = (n, seed, w = 1080, h = 900, op = .8) => { const r = rng(seed); let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${f1(r() * w)}" cy="${f1(r() * h)}" r="${f1(1 + r() * 2.4)}" fill="#fff" opacity="${f1(op * (0.4 + r() * 0.6))}"/>`; return s; };

/* ---------- LA COFIA de camarera (viewBox 0 0 260 130; centro 130,70) ---------- */
function cofiaInner(o = {}) {
  let fr = ''; for (let k = 0; k <= 12; k++) { const a = Math.PI + k / 12 * Math.PI, x = 130 + Math.cos(a) * 118, y = 92 + Math.sin(a) * 70; if (!k) fr += `M${f1(x)},${f1(y)} `; else { const am = a - Math.PI / 24; fr += `Q${f1(130 + Math.cos(am) * 140)},${f1(92 + Math.sin(am) * 90)} ${f1(x)},${f1(y)} `; } }
  const band = 'M20,96 C40,40 90,22 130,22 C170,22 220,40 240,96 C210,82 170,74 130,74 C90,74 50,82 20,96 Z';
  const frill = fr + `L248,96 C210,80 170,72 130,72 C90,72 50,80 12,96 Z`;
  let s = cut(`<path d="${frill}"/><path d="${band}"/>`, 5, 6);
  s += `<path d="${frill}" fill="${CAP}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
  for (let k = 0; k < 12; k++) { const a = Math.PI + (k + 0.5) / 12 * Math.PI; s += `<path d="M${f1(130 + Math.cos(a) * 80)},${f1(92 + Math.sin(a) * 46)} L${f1(130 + Math.cos(a) * 124)},${f1(92 + Math.sin(a) * 78)}" stroke="${INK}" stroke-width="1.6" opacity=".55"/>`; }
  s += `<path d="${band}" fill="#fff" stroke="${INK}" stroke-width="3.5"/><path d="${band}" fill="url(#hF)" opacity=".18"/><path d="M40,84 C80,64 180,64 220,84" stroke="${INK}" stroke-width="1.8" fill="none" stroke-dasharray="4 6"/>`;
  if (!o.noBow) s += `<path d="M130,30 C112,10 96,16 100,30 C104,42 120,38 130,34 C140,38 156,42 160,30 C164,16 148,10 130,30 Z" fill="${o.bow || PINK}" stroke="${INK}" stroke-width="3"/><circle cx="130" cy="32" r="6" fill="${o.bow || PINK}" stroke="${INK}" stroke-width="2.5"/>`;
  return s;
}
const cofiaSvg = (o) => `<svg viewBox="0 0 260 130" width="100%" height="100%" style="overflow:visible">${cofiaInner(o)}</svg>`;
/* toca de enfermera con la cruz roja (sobre busto 360x460) */
function tocaOver() {
  const veil = 'M106,232 C92,150 126,100 180,98 C234,100 268,150 254,232 C270,280 282,330 300,372 L240,350 C236,300 232,250 226,214 C210,190 150,190 134,214 C128,250 124,300 120,350 L60,372 C78,330 90,280 106,232 Z';
  return cut(P(veil), 4, 5) + D(veil, '#fff', 3.5) + `<path d="${veil}" fill="url(#hF)" opacity=".2"/><path d="M118,170 C150,150 210,150 242,170" stroke="${INK}" stroke-width="3" fill="none"/>` +
    `<rect x="166" y="118" width="28" height="40" fill="${RED}" stroke="${INK}" stroke-width="2.5"/><rect x="160" y="124" width="40" height="28" fill="${RED}" stroke="${INK}" stroke-width="2.5"/><rect x="167" y="125" width="26" height="26" fill="${RED}"/>`;
}
/* ---------- VIOLET (busto 0 0 360 460) ---------- */
const DRESS = (col) => {
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${torso}" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="${torso}" fill="url(#hA)" opacity=".35"/>` +
    `<path d="M40,460 C38,392 72,356 120,342 C106,380 100,420 102,460 Z" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M320,460 C322,392 288,356 240,342 C254,380 260,420 258,460 Z" fill="${col}" stroke="${INK}" stroke-width="3"/>` +
    `<path d="M60,420 q20,-30 50,-50 M300,420 q-20,-30 -50,-50" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`;
};
const COLLAR = `<path d="M136,330 L180,368 L224,330 L238,346 L180,392 L122,346 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M150,346 L180,372 L210,346" stroke="${INK}" stroke-width="1.4" fill="none" opacity=".6"/>` +
  `<path d="M150,392 L210,392 L224,460 L136,460 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M150,392 L210,392 L224,460 L136,460 Z" fill="url(#hF)" opacity=".2"/>`;
const LASH = `<path d="M143,201 l-10,-6 M145,197 l-6,-9 M217,201 l10,-6 M215,197 l6,-9" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><ellipse cx="138" cy="236" rx="14" ry="8" fill="${PINK}" opacity=".3"/><ellipse cx="222" cy="236" rx="14" ry="8" fill="${PINK}" opacity=".3"/>`;
function ladyInner(seed, hair = '#3a2a1e', dress = '#6b4a5a', o = {}) {
  let s = bustInner({ uniform: 'soldier', seed });
  s += DRESS(dress);
  if (o.collar) s += COLLAR;
  const cap = 'M108,224 C94,150 134,110 180,110 C226,110 266,150 252,224 C246,192 232,168 210,160 C198,156 188,160 180,172 C172,160 162,156 150,160 C128,168 114,192 108,224 Z';
  if (!o.noBun) s += `<circle cx="180" cy="96" r="38" fill="${hair}" stroke="${INK}" stroke-width="3.5"/><circle cx="180" cy="96" r="38" fill="url(#hA)" opacity=".5"/><path d="M150,92 q30,-24 60,0 M156,108 q24,-18 48,0" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += `<path d="${cap}" fill="${hair}" stroke="${INK}" stroke-width="3.5"/><path d="${cap}" fill="url(#hA)" opacity=".45"/><path d="M180,172 C176,150 166,128 150,120 M180,172 C186,150 196,128 214,120 M130,190 q4,-30 30,-52 M232,190 q-4,-30 -30,-52" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += LASH;
  if (o.hat) s += `<path d="M86,128 Q180,96 274,128 Q180,150 86,128 Z" fill="#5a3a3a" stroke="${INK}" stroke-width="3.5"/><path d="M120,124 C122,70 238,70 240,124 Z" fill="#5a3a3a" stroke="${INK}" stroke-width="3.5"/><path d="M120,112 H240" stroke="${PINK}" stroke-width="10"/><path d="M226,108 q30,-40 44,-6" stroke="${INK}" stroke-width="3" fill="${PINK}"/>`;
  return s;
}
// Violet: uniforme de camarera azul marino + cofia (o toca de enfermera)
function violetInner(o = {}) {
  let s = ladyInner(o.seed || 28, '#4a2e1c', o.nurse ? '#e8e3d6' : NAVY, { collar: !o.nurse });
  if (o.nurse) s += tocaOver();
  else if (!o.noCap) s += `<g transform="translate(70,70) scale(0.85)">${cofiaInner({ noBow: false })}</g>`;
  return s;
}
const mkViolet = (pa, b, o = {}) => mk(pa, b, violetInner(o), '0 0 360 460', 'bust');

/* ---------- BARCO de perfil (viewBox 0 0 900 300; proa a la derecha) ---------- */
function shipInner(o = {}) {
  const white = !!o.hospital;
  const hull = 'M30,170 L860,170 L890,120 L896,124 L872,236 L120,236 C70,236 40,214 30,170 Z';
  const sup = 'M150,170 L150,132 L780,132 L780,170 Z', sup2 = 'M210,132 L210,110 L700,110 L700,132 Z';
  let s = cut(P(hull) + P(sup) + P(sup2), 6, 8);
  // mástiles
  s += `<path d="M110,170 L130,18 M820,170 L800,10" stroke="${INK}" stroke-width="6"/><path d="M130,22 L800,14" stroke="${INK}" stroke-width="1.6" opacity=".7"/>`;
  // chimeneas (4)
  const fx = o.funnels || [260, 380, 500, 620];
  fx.forEach((x, i) => { const f = `M${x},112 L${x + 12},36 L${x + 62},36 L${x + 54},112 Z`; s += cut(P(f), 4, 5) + D(f, BUFF, 4) + `<path d="M${x + 12},36 L${x + 62},36 L${x + 59},56 L${x + 9},56 Z" fill="${HULL}" stroke="${INK}" stroke-width="3"/><path d="M${x + 40},40 L${x + 34},110" stroke="#fff" stroke-width="3" opacity=".35"/><path d="${f}" fill="url(#hA)" opacity=".35"/>`; });
  s += D(sup2, '#fff', 4) + D(sup, '#fff', 4);
  for (let x = 166; x < 770; x += 22) s += `<rect x="${x}" y="142" width="10" height="14" fill="${INK}" opacity=".75"/>`;
  for (let x = 226; x < 690; x += 30) s += `<rect x="${x}" y="116" width="12" height="9" fill="${INK}" opacity=".7"/>`;
  // botes salvavidas sobre cubierta
  if (!white) for (let x = 230; x < 700; x += 70) s += `<path d="M${x},110 q22,10 44,0 l-4,-8 h-36 Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  s += D(hull, white ? '#F6F3EA' : HULL, 5);
  s += `<path d="M120,236 L872,236 L876,214 L40,214 C60,230 90,236 120,236 Z" fill="${white ? '#3f7a52' : '#8a2a1e'}" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="${hull}" fill="url(#hB)" opacity="${white ? .25 : .5}"/>`;
  for (let x = 120; x < 850; x += 26) s += `<circle cx="${x}" cy="184" r="4.5" fill="${white ? INK : '#E9DFC8'}" opacity=".8"/>`;
  if (white) {
    s += `<path d="M40,200 L874,200" stroke="#3f7a52" stroke-width="10"/>`;
    [300, 620].forEach(x => s += `<rect x="${x - 34}" y="160" width="68" height="68" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="${x - 10}" y="168" width="20" height="52" fill="${RED}"/><rect x="${x - 26}" y="184" width="52" height="20" fill="${RED}"/>`);
  }
  s += `<path d="M30,170 L860,170" stroke="#fff" stroke-width="3" opacity=".5"/>`;
  return s;
}
const shipSvg = (o) => `<svg viewBox="0 0 900 300" width="100%" height="100%" style="overflow:visible">${shipInner(o)}</svg>`;
/* buque de guerra gris con espolón (viewBox 0 0 760 260; proa-espolón a la DERECHA) */
function warshipInner() {
  const hull = 'M20,150 L640,150 L660,140 L700,210 L748,236 L690,236 L660,226 L90,226 C50,226 26,196 20,150 Z';
  const sup = 'M200,150 L200,112 L520,112 L520,150 Z';
  let s = cut(P(hull) + P(sup), 6, 8);
  s += `<path d="M150,150 L170,30 M560,150 L548,40" stroke="${INK}" stroke-width="6"/>`;
  [290, 400].forEach(x => { const f = `M${x},114 L${x + 6},50 L${x + 50},50 L${x + 46},114 Z`; s += D(f, '#8f9294', 4) + `<rect x="${x + 6}" y="50" width="44" height="14" fill="${HULL}"/>`; });
  s += D(sup, '#a9adb0', 4) + `<path d="${sup}" fill="url(#hA)" opacity=".4"/>`;
  [[150, 150], [580, 150]].forEach(([x, y]) => s += `<path d="M${x - 30},${y} q30,-34 60,0 Z" fill="#8f9294" stroke="${INK}" stroke-width="4"/><path d="M${x + 10},${y - 18} L${x + 70},${y - 26}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`);
  s += D(hull, '#7d8184', 5) + `<path d="${hull}" fill="url(#hB)" opacity=".45"/>`;
  s += `<path d="M650,200 L748,236 L690,236 Z" fill="#5c5f62" stroke="${INK}" stroke-width="4"/>`;
  for (let x = 110; x < 620; x += 30) s += `<circle cx="${x}" cy="168" r="4" fill="${INK}" opacity=".7"/>`;
  return s;
}
/* ---------- CARTA DE BARCO (viewBox 0 0 270 400) ---------- */
function cardInner(n, name, year, o = {}) {
  const id = uid('cd');
  let s = cut('<rect x="0" y="0" width="270" height="400" rx="18"/>', 7, 9);
  s += `<rect x="0" y="0" width="270" height="400" rx="18" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="270" height="400" rx="18" fill="url(#hP)" opacity=".35"/>`;
  s += `<rect x="12" y="12" width="246" height="376" rx="10" fill="none" stroke="${o.hospital ? RED : INK}" stroke-width="3"/><rect x="20" y="20" width="230" height="360" rx="6" fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 5"/>`;
  [[22, 22], [248, 22], [22, 378], [248, 378]].forEach(([x, y]) => s += `<path d="M${x},${y - 9} L${x + 9},${y} L${x},${y + 9} L${x - 9},${y} Z" fill="${o.hospital ? RED : INK}"/>`);
  s += `<text x="135" y="62" text-anchor="middle" font-family="Rye" font-size="27" fill="${INK}">GEMELO ${n}</text>`;
  s += `<rect x="30" y="86" width="210" height="190" rx="8" fill="${o.sky || '#D9E1DA'}" stroke="${INK}" stroke-width="3"/>`;
  s += clipG(id, 'M30,86 H240 V276 H30 Z', `<rect x="30" y="226" width="210" height="60" fill="${LAGOON}"/><path d="M30,240 q14,-6 28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0 M30,258 q14,-6 28,0 t28,0 t28,0 t28,0 t28,0 t28,0 t28,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/><g transform="translate(26,150) scale(0.244)">${o.war ? '' : shipInner({ hospital: o.hospital })}</g>`);
  s += `<text x="135" y="324" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${name.length > 8 ? 36 : 42}" fill="${INK}">${name}</text>`;
  s += `<text x="135" y="362" text-anchor="middle" font-family="Rye" font-size="28" fill="${o.hospital ? RED : '#7a5a2a'}">${year}</text>`;
  return s;
}
function cardBackInner() {
  let s = cut('<rect x="0" y="0" width="270" height="400" rx="18"/>', 7, 9);
  s += `<rect x="0" y="0" width="270" height="400" rx="18" fill="#7a1f2b" stroke="${INK}" stroke-width="5"/>`;
  let lat = ''; for (let i = -10; i < 30; i++) lat += `<path d="M${i * 22},0 L${i * 22 + 400},400 M${i * 22 + 400},0 L${i * 22},400" stroke="#fff" stroke-width="1.2" opacity=".18"/>`;
  s += clipG(uid('cb'), 'M14,14 H256 V386 H14 Z', lat) + `<rect x="14" y="14" width="242" height="372" rx="10" fill="none" stroke="${GOLD}" stroke-width="4"/>`;
  s += `<circle cx="135" cy="200" r="96" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><circle cx="135" cy="200" r="84" fill="none" stroke="${GOLD}" stroke-width="3"/><g transform="translate(60,152) scale(0.58)">${cofiaInner()}</g>`;
  s += `<text x="135" y="262" text-anchor="middle" font-family="Rye" font-size="22" fill="${INK}">VIOLET</text>`;
  return s;
}
/* carta con anverso y reverso (para darle la vuelta) */
function mkCard(pa, x, y, n, name, year, o = {}) {
  const w = o.w || 270, h = w * 400 / 270;
  const d = box(pa, x, y, w, h, { zIndex: o.z || 10 });
  const fr = box(d, 0, 0, w, h); fr.innerHTML = svgW(cardInner(n, name, year, o), '0 0 270 400');
  const bk = box(d, 0, 0, w, h); bk.innerHTML = svgW(cardBackInner(), '0 0 270 400'); bk.style.display = 'none';
  const glow = box(d, -40, -40, w + 80, h + 80, { zIndex: -1, borderRadius: '40px', background: `radial-gradient(closest-side, rgba(255,230,0,.95), rgba(255,230,0,0))`, opacity: 0 });
  return { d, fr, bk, glow, w, h };
}
function flipCard(c, k) { // k 0..1
  const sx = Math.cos(k * Math.PI);
  c.fr.style.display = sx >= 0 ? '' : 'none'; c.bk.style.display = sx < 0 ? '' : 'none';
  return Math.max(0.02, Math.abs(sx));
}
/* ---------- CASILLAS DE NAUFRAGIOS ☐☐☐ (sellos que caen hechos, sin counter) ---------- */
function mkTally(pa, x, y, sz = 120, z = 40) {
  const gap = sz * 0.3, W3 = sz * 3 + gap * 2;
  const d = box(pa, x, y, W3, sz + 64, { zIndex: z });
  el('div', d, { left: 0, top: 0, width: px(W3), textAlign: 'center', fontFamily: 'Rye', fontSize: px(sz * 0.3), color: INK, letterSpacing: '0.06em' }, 'ACCIDENTES');
  const st = [];
  for (let i = 0; i < 3; i++) {
    const bx = box(d, i * (sz + gap), 52, sz, sz, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `6px 6px 0 ${SH}` });
    const s = el('div', bx, { left: px(-sz * 0.1), top: px(-sz * 0.12), width: px(sz * 1.08), height: px(sz * 1.08), lineHeight: px(sz * 1.02), textAlign: 'center', borderRadius: '50%', border: `${f1(sz * 0.07)}px solid ${RED}`, color: RED, fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz * 0.78), background: 'rgba(255,255,255,.55)', boxSizing: 'border-box' }, String(i + 1));
    st.push(s);
  }
  return { d, st };
}
function tallyA(T, t, times, rot = [-12, 8, -6]) { T.st.forEach((s, i) => stampA(s, t, times[i], rot[i], 1)); }

/* ---------- BOTE SALVAVIDAS de lado (viewBox 0 0 600 240) ---------- */
function lifeboatInner() {
  const hull = 'M10,60 L590,60 C570,170 470,214 300,214 C130,214 30,170 10,60 Z';
  let s = cut(P(hull), 6, 8) + D(hull, '#fff', 5) + `<path d="${hull}" fill="url(#hW)" opacity=".18"/>`;
  for (let y = 92; y < 210; y += 26) s += `<path d="M${f1(30 + (y - 60) * 0.6)},${y} Q300,${y + 18} ${f1(570 - (y - 60) * 0.6)},${y}" stroke="${INK}" stroke-width="2" fill="none" opacity=".55"/>`;
  s += `<rect x="0" y="50" width="600" height="22" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
/* bote visto desde arriba (viewBox 0 0 520 220) */
function boatTopInner(o = {}) {
  const hull = 'M10,110 C60,20 220,14 380,20 C460,24 500,70 510,110 C500,150 460,196 380,200 C220,206 60,200 10,110 Z';
  let s = cut(P(hull), 6, 8) + D(hull, WOOD, 5) + `<path d="${hull}" fill="url(#hW)" opacity=".35"/>`;
  s += `<path d="M40,110 C80,44 220,40 376,44 C440,48 474,80 484,110 C474,140 440,172 376,176 C220,180 80,176 40,110 Z" fill="#d9b37c" stroke="${INK}" stroke-width="3"/>`;
  [120, 200, 280, 360].forEach(x => s += `<rect x="${x}" y="46" width="18" height="128" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`);
  const heads = o.heads || [[160, 86], [160, 136], [240, 80], [240, 140], [320, 92], [320, 130], [400, 110]];
  heads.forEach(([x, y], i) => s += `<circle cx="${x}" cy="${y}" r="20" fill="${['#4a2e1c', '#2b2118', '#6b4a3a', '#3a2a1e'][i % 4]}" stroke="${INK}" stroke-width="3"/><path d="M${x - 14},${y - 4} q14,-10 28,0" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`);
  if (o.violet) s += `<circle cx="${o.violet[0]}" cy="${o.violet[1]}" r="21" fill="#4a2e1c" stroke="${INK}" stroke-width="3"/><g transform="translate(${o.violet[0] - 26},${o.violet[1] - 18}) scale(0.2)">${cofiaInner({ noBow: false })}</g>`;
  return s;
}
/* ---------- FARDO / BEBÉ (viewBox 0 0 300 220) ---------- */
function bundleInner(open) {
  const bl = 'M20,120 C10,60 70,16 150,18 C236,20 292,60 284,120 C278,186 214,210 150,208 C80,206 26,180 20,120 Z';
  let s = cut(P(bl), 5, 7) + D(bl, '#EFE6CF', 4) + `<path d="${bl}" fill="url(#hA)" opacity=".3"/>`;
  s += `<path d="M40,150 C90,120 210,120 268,150 M60,70 C110,96 200,96 250,66" stroke="${INK}" stroke-width="2.4" fill="none" opacity=".6"/>`;
  if (!open) return s + `<path d="M150,30 C160,80 160,160 150,204" stroke="${PINK}" stroke-width="12" fill="none"/><path d="M150,30 C160,80 160,160 150,204" stroke="${INK}" stroke-width="2" fill="none" opacity=".4"/>`;
  const fc = 'M100,106 C100,66 200,66 200,106 C200,150 168,170 150,170 C132,170 100,150 100,106 Z';
  s += `<path d="M84,110 C84,46 216,46 216,110 C216,74 184,62 150,62 C116,62 84,74 84,110 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += D(fc, '#F6DCC6', 3.5) + `<ellipse cx="128" cy="134" rx="12" ry="7" fill="${PINK}" opacity=".35"/><ellipse cx="172" cy="134" rx="12" ry="7" fill="${PINK}" opacity=".35"/>`;
  s += `<path d="M124,116 q8,6 16,0 M160,116 q8,6 16,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M142,146 q8,6 16,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M150,72 q-4,10 4,14" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  s += `<g class="mano"><circle cx="232" cy="122" r="18" fill="#F6DCC6" stroke="${INK}" stroke-width="3"/><path d="M220,110 l-4,-12 M230,106 l-1,-13 M240,108 l3,-12" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M220,110 l-4,-12 M230,106 l-1,-13 M240,108 l3,-12" stroke="#F6DCC6" stroke-width="3.5" stroke-linecap="round"/></g>`;
  return s;
}
/* ---------- MANOS de grabado (enguantadas) que entran ---------- */
const handsSvg = () => `<svg viewBox="-120 -80 240 160" width="100%" height="100%" style="overflow:visible">${gloveHand(-50, 0, 200, 1.5)}${gloveHand(50, 0, 160, 1.5)}</svg>`;
/* ---------- MINA con púas (viewBox 0 0 300 420) ---------- */
function mineInner() {
  let s = `<path d="M150,250 V420" stroke="${INK}" stroke-width="10" stroke-dasharray="14 8"/>`;
  let horns = ''; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; horns += `<path d="${limb(150 + Math.cos(a) * 80, 140 + Math.sin(a) * 80, 150 + Math.cos(a) * 128, 140 + Math.sin(a) * 128, 12, 8)}" fill="#5e5a52" stroke="${INK}" stroke-width="3"/><circle cx="${f1(150 + Math.cos(a) * 132)}" cy="${f1(140 + Math.sin(a) * 132)}" r="12" fill="#8e8a80" stroke="${INK}" stroke-width="3"/>`; }
  s += horns + cut('<circle cx="150" cy="140" r="98"/>', 5, 7) + `<circle cx="150" cy="140" r="98" fill="#3c3a36" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="140" r="98" fill="url(#hA)" opacity=".5"/><path d="M60,140 H240" stroke="${INK}" stroke-width="5"/><circle cx="112" cy="104" r="20" fill="#fff" opacity=".18"/>`;
  for (let k = 0; k < 9; k++) s += `<circle cx="${70 + k * 20}" cy="140" r="4" fill="#8e8a80"/>`;
  return s;
}
/* explosión de grabado (viewBox 0 0 600 600) */
function boomInner(col = YEL) {
  let pts = []; for (let k = 0; k < 22; k++) { const a = k / 22 * Math.PI * 2, r = k % 2 ? 150 : 290; pts.push(`${f1(300 + Math.cos(a) * r)},${f1(300 + Math.sin(a) * r)}`); }
  let pts2 = []; for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2 + 0.2, r = k % 2 ? 90 : 190; pts2.push(`${f1(300 + Math.cos(a) * r)},${f1(300 + Math.sin(a) * r)}`); }
  return cut(`<path d="M${pts.join('L')}Z"/>`, 8, 10) + `<path d="M${pts.join('L')}Z" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M${pts2.join('L')}Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${pts2.join('L')}Z" fill="url(#hA)" opacity=".3"/>`;
}
/* ---------- PASILLO inclinado con puerta (capa 1080x1920) ---------- */
function corridorSvg() {
  const vx = 540, vy = 820;
  let s = `<rect x="-200" y="-200" width="1480" height="2400" fill="#cbb48a"/>`;
  s += `<path d="M-200,-200 L${vx - 150},${vy - 210} L${vx + 150},${vy - 210} L1280,-200 Z" fill="#e9dcbd" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M-200,2200 L${vx - 150},${vy + 210} L${vx + 150},${vy + 210} L1280,2200 Z" fill="#8a5a36" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M-200,-200 L${vx - 150},${vy - 210} L${vx - 150},${vy + 210} L-200,2200 Z" fill="#d8c49a" stroke="${INK}" stroke-width="5"/><path d="M1280,-200 L${vx + 150},${vy - 210} L${vx + 150},${vy + 210} L1280,2200 Z" fill="#c9b285" stroke="${INK}" stroke-width="5"/>`;
  for (let k = 1; k < 9; k++) { const f = 1 - k / 9; s += `<path d="M${f1(vx - 150 - 700 * f)},${f1(vy + 210 + 1400 * f)} L${f1(vx + 150 + 700 * f)},${f1(vy + 210 + 1400 * f)}" stroke="${INK}" stroke-width="2.5" opacity=".5"/>`; }
  // puertas laterales
  [[0.55, -1], [0.3, -1], [0.55, 1], [0.3, 1]].forEach(([f, sd]) => { const x0 = vx + sd * (150 + 700 * f), x1 = vx + sd * (150 + 700 * (f - 0.14)); const h0 = 420 + 2000 * f, h1 = 420 + 2000 * (f - 0.14); s += `<path d="M${f1(x0)},${f1(vy + h0 * 0.42)} L${f1(x1)},${f1(vy + h1 * 0.42)} L${f1(x1)},${f1(vy - h1 * 0.3)} L${f1(x0)},${f1(vy - h0 * 0.3)} Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>`; });
  // lámparas
  for (let k = 1; k < 5; k++) { const f = 1 - k / 5; s += `<circle cx="${vx}" cy="${f1(vy - 210 - 1000 * f * 0.6)}" r="${f1(10 + 26 * f)}" fill="${YEL}" stroke="${INK}" stroke-width="3"/>`; }
  s += `<rect x="${vx - 150}" y="${vy - 210}" width="300" height="420" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${vx - 150}" y="-200" width="300" height="2400" fill="url(#hP)" opacity="0"/>`;
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible">${s}</svg>`;
}
/* ---------- CAJÓN (viewBox 0 0 760 420) ---------- */
function drawerInner() {
  let s = cut('<rect x="0" y="0" width="760" height="420" rx="10"/>');
  s += `<rect x="0" y="0" width="760" height="420" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="760" height="420" rx="10" fill="url(#hW)" opacity=".3"/>`;
  s += `<path d="M40,60 L720,60 L680,180 L80,180 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="20" y="180" width="720" height="210" rx="8" fill="#a77a48" stroke="${INK}" stroke-width="5"/><rect x="330" y="250" width="100" height="34" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="120" y="96" width="120" height="60" rx="6" fill="#EFE6CF" stroke="${INK}" stroke-width="3" transform="rotate(-8 180 126)"/><rect x="470" y="100" width="140" height="44" rx="6" fill="#c98f8f" stroke="${INK}" stroke-width="3" transform="rotate(6 540 122)"/>`;
  return s;
}
/* ---------- CEPILLO DE DIENTES antiguo, mango de hueso (viewBox 0 0 820 180) ---------- */
function brushInner() {
  const h = 'M20,96 C20,70 50,62 120,66 L560,78 C600,80 620,70 640,62 L800,58 C812,58 816,92 804,94 L640,100 C620,100 600,108 560,108 L120,124 C50,126 20,120 20,96 Z';
  let s = cut(P(h), 6, 8) + D(h, '#EFE6CF', 5) + `<path d="${h}" fill="url(#hA)" opacity=".25"/><path d="M60,88 L540,86" stroke="#fff" stroke-width="7" opacity=".7" stroke-linecap="round"/>`;
  s += `<circle cx="70" cy="95" r="12" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="70" cy="95" r="5" fill="${INK}"/>`;
  for (let x = 650; x < 800; x += 13) s += `<path d="M${x},62 L${x - 6},6" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${x},62 L${x - 6},6" stroke="#f4efe0" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path d="M200,104 q60,-6 120,0 M380,102 q50,-5 100,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>`;
  return s;
}
/* ---------- HÉLICE de bronce (viewBox 0 0 400 400, centro 200,200) ---------- */
function propInner(n = 3) {
  let s = '';
  for (let k = 0; k < n; k++) {
    const a = k * 360 / n;
    const bl = 'M200,200 C170,150 150,60 196,16 C236,-4 262,40 252,96 C244,140 226,176 200,200 Z';
    s += `<g transform="rotate(${a} 200 200)">${cut(P(bl), 6, 8)}${D(bl, BRONZE, 5)}<path d="${bl}" fill="url(#hA)" opacity=".45"/><path d="M206,170 C200,120 206,70 222,40" stroke="#f3d27a" stroke-width="5" fill="none" opacity=".7"/></g>`;
  }
  return s + `<circle cx="200" cy="200" r="44" fill="${BRONZE}" stroke="${INK}" stroke-width="5"/><circle cx="200" cy="200" r="44" fill="url(#hB)" opacity=".5"/><circle cx="200" cy="200" r="14" fill="${INK}"/>`;
}
/* ---------- silueta de VIOLET saltando (viewBox 0 0 400 560) ---------- */
function jumperInner(col = INK) {
  const body = `<circle cx="200" cy="96" r="44"/><path d="M150,68 C160,40 240,40 252,68 C230,58 170,58 150,68 Z"/>` +
    `<path d="M168,136 L232,136 C250,180 256,230 262,270 L300,360 C260,380 140,380 100,360 L138,270 C144,230 150,180 168,136 Z"/>` +
    `<path d="${limb(176, 150, 96, 30, 16, 12)}"/><path d="${limb(224, 150, 312, 36, 16, 12)}"/><circle cx="92" cy="24" r="16"/><circle cx="316" cy="30" r="16"/>` +
    `<path d="${limb(170, 360, 120, 470, 18, 14)}"/><path d="${limb(230, 360, 300, 440, 18, 14)}"/><path d="${limb(120, 470, 168, 520, 14, 12)}"/><path d="${limb(300, 440, 330, 520, 14, 12)}"/>`;
  return `<g fill="${col}">${body}</g><g transform="translate(118,22) scale(0.63)">${cofiaInner({ noBow: true })}</g>`;
}
/* ---------- CRÁNEO en radiografía (viewBox 0 0 500 560) ---------- */
function skullInner() {
  const sk = 'M250,30 C380,30 460,120 460,240 C460,320 420,360 400,380 L392,450 C392,480 360,500 330,500 L170,500 C140,500 108,480 108,450 L100,380 C80,360 40,320 40,240 C40,120 120,30 250,30 Z';
  const XR = '#BFE6FF';
  let s = `<path d="${sk}" fill="rgba(191,230,255,.12)" stroke="${XR}" stroke-width="7"/>`;
  s += `<path d="M150,250 C150,200 220,200 222,250 C224,300 150,300 150,250 Z M278,250 C280,200 350,200 350,250 C350,300 276,300 278,250 Z" fill="#0c1b2a" stroke="${XR}" stroke-width="6"/>`;
  s += `<path d="M250,300 L226,360 L274,360 Z" fill="#0c1b2a" stroke="${XR}" stroke-width="5"/>`;
  for (let k = 0; k < 7; k++) s += `<rect x="${166 + k * 25}" y="420" width="20" height="44" rx="6" fill="rgba(191,230,255,.25)" stroke="${XR}" stroke-width="3"/>`;
  s += `<path d="M120,140 C180,90 320,90 380,140" stroke="${XR}" stroke-width="3" fill="none" opacity=".5"/><path d="M90,220 C120,160 160,130 200,120" stroke="${XR}" stroke-width="3" fill="none" opacity=".4"/>`;
  return s;
}
/* ---------- CASITA DE CAMPO con huerto y gallinas (capa 1080x1920) ---------- */
function henSvg(flip) {
  const b = 'M20,60 C10,30 40,10 70,24 C92,8 120,20 116,46 C130,60 120,90 90,96 C60,102 26,92 20,60 Z';
  return `<svg viewBox="0 0 140 130" width="100%" height="100%" style="overflow:visible"><g transform="${flip ? 'translate(140,0) scale(-1,1)' : ''}">${cut(P(b), 4, 5)}${D(b, '#fff', 3.5)}<path d="${b}" fill="url(#hA)" opacity=".2"/><path d="M96,22 q6,-16 14,-4 q8,-10 10,6" fill="${RED}" stroke="${INK}" stroke-width="2.5"/><path d="M116,42 L132,48 L116,52 Z" fill="${YEL}" stroke="${INK}" stroke-width="2.5"/><circle cx="106" cy="36" r="3.5" fill="${INK}"/><path d="M50,54 q20,14 40,0" stroke="${INK}" stroke-width="2" fill="none"/><path d="M60,96 L56,124 M80,96 L84,124" stroke="${INK}" stroke-width="4"/></g></svg>`;
}
function cottageSvg() {
  let s = `<rect x="0" y="0" width="1080" height="760" fill="#cfe0e4"/><rect x="0" y="0" width="1080" height="760" fill="url(#hF)" opacity=".2"/>`;
  s += `<path d="M0,700 C200,640 380,660 560,630 C760,600 900,640 1080,620 L1080,800 L0,800 Z" fill="#9fb98a" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="0" y="760" width="1080" height="1160" fill="#b9c98c"/><rect x="0" y="760" width="1080" height="1160" fill="url(#hB)" opacity=".18"/>`;
  // casita
  const wall = 'M300,520 L780,520 L780,860 L300,860 Z', roof = 'M250,540 L540,330 L830,540 Z';
  s += cut(P(wall) + P(roof), 8, 10) + D(wall, '#F3E9D2', 5) + `<path d="${wall}" fill="url(#hP)" opacity=".5"/>` + D(roof, '#a0522d', 5) + `<path d="${roof}" fill="url(#hB)" opacity=".5"/>`;
  s += `<rect x="640" y="360" width="50" height="110" fill="#8a4a2a" stroke="${INK}" stroke-width="4"/><path d="M650,350 q20,-40 50,-60 q-10,30 10,50" stroke="#fff" stroke-width="10" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s += `<rect x="490" y="700" width="100" height="160" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><circle cx="572" cy="782" r="7" fill="${BRASS}"/>`;
  [[340, 600], [650, 600]].forEach(([x, y]) => s += `<rect x="${x}" y="${y}" width="90" height="80" fill="#cfe6f0" stroke="${INK}" stroke-width="5"/><path d="M${x + 45},${y} V${y + 80} M${x},${y + 40} H${x + 90}" stroke="${INK}" stroke-width="4"/><rect x="${x - 8}" y="${y + 80}" width="106" height="16" fill="#a0522d" stroke="${INK}" stroke-width="3"/>`);
  // valla
  for (let x = 20; x < 1080; x += 46) s += `<path d="M${x},880 L${x},800 L${x + 12},786 L${x + 24},800 L${x + 24},880 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="M0,820 H1080 M0,860 H1080" stroke="${INK}" stroke-width="5"/>`;
  // huerto
  for (let r = 0; r < 4; r++) { const y = 960 + r * 70; s += `<path d="M60,${y} C300,${y - 12} 700,${y - 12} 1020,${y}" stroke="#6b4a2a" stroke-width="18" fill="none" opacity=".55"/>`; for (let x = 90; x < 1000; x += 70) s += `<path d="M${x},${y - 8} q-14,-30 -4,-40 M${x},${y - 8} q14,-30 4,-42 M${x},${y - 8} q0,-30 0,-46" stroke="#3c5a2a" stroke-width="5" fill="none"/>`; }
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible">${s}</svg>`;
}
/* ---------- BARQUITO DE PAPEL (viewBox 0 0 600 360) ---------- */
function paperBoatInner() {
  const hull = 'M20,200 L580,200 L470,330 L130,330 Z', sail = 'M180,200 L300,20 L420,200 Z';
  return cut(P(hull) + P(sail), 6, 8) + D(sail, '#fff', 5) + `<path d="M300,20 L300,200" stroke="${INK}" stroke-width="3"/><path d="M300,20 L420,200 L300,200 Z" fill="url(#hA)" opacity=".35"/>` +
    D(hull, '#FBF6EA', 5) + `<path d="M20,200 L300,270 L580,200" stroke="${INK}" stroke-width="3" fill="none"/><path d="M130,330 L300,270 L470,330" fill="url(#hA)" opacity=".3"/>` +
    `<path d="M200,236 q100,26 200,0" stroke="${INK}" stroke-width="1.6" fill="none" stroke-dasharray="4 6"/>`;
}
/* ---------- BANDERA ARGENTINA (sello pequeño, viewBox 0 0 240 160) ---------- */
const flagAR = () => `<svg viewBox="0 0 240 160" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="240" height="160"/>', 5, 6)}<rect x="0" y="0" width="240" height="160" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="240" height="53" fill="${ARG}" stroke="${INK}" stroke-width="3"/><rect x="0" y="107" width="240" height="53" fill="${ARG}" stroke="${INK}" stroke-width="3"/><circle cx="120" cy="80" r="16" fill="#F2C230" stroke="${INK}" stroke-width="3"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<path d="M${f1(120 + Math.cos(k * Math.PI / 4) * 19)},${f1(80 + Math.sin(k * Math.PI / 4) * 19)} L${f1(120 + Math.cos(k * Math.PI / 4) * 26)},${f1(80 + Math.sin(k * Math.PI / 4) * 26)}" stroke="#d99a20" stroke-width="4"/>`).join('')}<rect x="0" y="0" width="240" height="160" fill="url(#hA)" opacity=".18"/></svg>`;
/* ---------- PROA DEL TITANIC (portada; viewBox 0 0 1300 760, proa a la derecha) ---------- */
function bowInner() {
  const hull = 'M0,250 L1080,250 C1150,250 1220,240 1290,200 L1250,560 C1200,640 1100,700 980,720 L0,720 Z';
  const fore = 'M640,250 L640,200 L1180,200 C1230,200 1260,196 1290,180 L1290,200 C1220,240 1150,250 1080,250 Z';
  const deck = 'M0,250 L0,140 L560,140 L560,250 Z';
  let s = cut(P(hull) + P(deck) + P(fore), 10, 12);
  // chimeneas (2 visibles) y mástil
  [[110, 160], [330, 160]].forEach(([x]) => { const f = `M${x},144 L${x + 20},-60 L${x + 140},-60 L${x + 124},144 Z`; s += cut(P(f), 6, 8) + D(f, BUFF, 6) + `<path d="M${x + 20},-60 L${x + 140},-60 L${x + 134},-10 L${x + 14},-10 Z" fill="${HULL}" stroke="${INK}" stroke-width="5"/><path d="${f}" fill="url(#hA)" opacity=".35"/><path d="M${x + 90},-50 L${x + 80},140" stroke="#fff" stroke-width="6" opacity=".35"/>`; });
  s += `<path d="M900,200 L940,-120" stroke="${INK}" stroke-width="12"/><path d="M940,-120 L1290,170 M940,-120 L0,-40" stroke="${INK}" stroke-width="2.4" opacity=".7"/>`;
  s += D(deck, '#fff', 6) + `<path d="${deck}" fill="url(#hF)" opacity=".2"/>`;
  for (let x = 20; x < 550; x += 34) s += `<rect x="${x}" y="170" width="16" height="22" fill="${INK}" opacity=".8"/><rect x="${x}" y="212" width="16" height="18" fill="${INK}" opacity=".6"/>`;
  for (let x = 40; x < 540; x += 90) s += `<path d="M${x},140 q36,-16 72,0 l-6,-12 h-60 Z" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
  s += D(fore, '#fff', 5);
  // barandilla
  let rl = ''; for (let x = 650; x < 1270; x += 26) rl += `M${x},200 V178 `; s += `<path d="${rl}" stroke="${INK}" stroke-width="3"/><path d="M640,178 L1270,170" stroke="${INK}" stroke-width="4"/>`;
  s += D(hull, HULL, 7) + `<path d="${hull}" fill="url(#hB)" opacity=".55"/><path d="M0,250 L1080,250 C1150,250 1220,240 1290,200" stroke="#E9DFC8" stroke-width="6" fill="none" opacity=".8"/>`;
  for (let r = 0; r < 3; r++) for (let x = 40; x < 1150 - r * 60; x += 38) s += `<circle cx="${x}" cy="${300 + r * 46}" r="7" fill="#E9DFC8" opacity="${0.85 - r * 0.2}"/>`;
  for (let x = 60; x < 1200; x += 120) s += `<path d="M${x},270 V700" stroke="#E9DFC8" stroke-width="1.6" opacity=".25"/>`;
  // ancla
  s += `<g transform="translate(1110,330)"><circle cx="0" cy="0" r="16" fill="none" stroke="#E9DFC8" stroke-width="6"/><path d="M0,16 V96 M-40,70 Q0,120 40,70 M-20,40 H20" stroke="#E9DFC8" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  s += `<text x="860" y="236" font-family="Playfair" font-weight="900" font-size="34" fill="${INK}" letter-spacing="6">TITANIC</text>`;
  return s;
}
/* ---------- FIN de película antigua (HTML) ---------- */
function finCardSvg(w = 900, h = 560) {
  return `<svg width="${w}" height="${h}" style="overflow:visible"><rect x="0" y="0" width="${w}" height="${h}" rx="20" fill="#14110e" stroke="#EADFC8" stroke-width="8"/><rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="12" fill="none" stroke="#EADFC8" stroke-width="3"/>
  <path d="M${w / 2 - 220},${h - 120} C${w / 2 - 120},${h - 80} ${w / 2 - 40},${h - 140} ${w / 2},${h - 110} C${w / 2 + 40},${h - 140} ${w / 2 + 120},${h - 80} ${w / 2 + 220},${h - 120}" stroke="#EADFC8" stroke-width="4" fill="none"/>
  <text x="${w / 2}" y="${h / 2 + 70}" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="250" fill="#FBF6EA">Fin</text>
  ${[0, 1, 2, 3].map(k => `<circle cx="${60 + k * ((w - 120) / 3)}" cy="60" r="7" fill="#EADFC8"/>`).join('')}</svg>`;
}
