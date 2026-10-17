/* Ep. 11 · La @ es española — figuras nuevas en el estilo de grabado recortado de la serie */
const WINE = '#7a1e2a', GREEN = '#8fa37a', SACK = '#D9C49A', SACK2 = '#C7AD7C';

/* ---------- @ de imprenta gigante (glifo grabado) ---------- */
function atGlyph(x, y, fs, o = {}) {
  const g = a => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${fs}" ${a || ''}>@</text>`;
  return `<g transform="translate(${fs * 0.05},${fs * 0.06})" fill="${SH}">${g()}</g><g fill="#fff" stroke="#fff" stroke-width="${fs * 0.07}" stroke-linejoin="round">${g()}</g>` +
    g(`fill="${o.fill || FIG}" stroke="${INK}" stroke-width="${fs * 0.018}" stroke-linejoin="round"`) + g(`fill="url(#hA)" opacity="${o.hatch == null ? 0.5 : o.hatch}"`);
}
function bigAt(pa, x, y, w, o = {}) { // caja w x w*1.1
  const d = box(pa, x, y, w, w * 1.1, { zIndex: o.z || 10 });
  d.innerHTML = `<svg viewBox="0 0 400 440" width="100%" height="100%" style="overflow:visible">${atGlyph(200, 330, 400, o)}</svg>`;
  return d;
}

/* ---------- saco de trigo (viewBox 0 0 240 280) ---------- */
function sackInner(label = '', o = {}) {
  const id = uid('sk');
  const body = 'M44,92 C8,140 6,240 46,272 L194,272 C234,240 232,140 196,92 C176,74 64,74 44,92 Z';
  const neck = 'M78,94 C70,62 92,50 120,54 C148,50 170,62 162,94 Z';
  let s = '';
  s += `<use href="#wheat" x="64" y="-70" width="40" height="170" transform="rotate(-14 84 60)"/><use href="#wheat" x="104" y="-92" width="40" height="180"/><use href="#wheat" x="138" y="-70" width="40" height="170" transform="rotate(14 158 60)"/>`;
  s += cut(P(body) + P(neck), 6, 8) + D(neck, SACK2, 4) + HF(neck, 'hB');
  s += D(body, o.col || SACK, 4) + clipG(id, body, `<rect x="160" y="60" width="90" height="230" fill="url(#hA)"/><rect x="0" y="236" width="240" height="50" fill="url(#hB)"/>`);
  s += `<path d="M70,98 Q120,112 170,98" stroke="${INK}" stroke-width="8" fill="none"/><path d="M70,98 Q120,112 170,98" stroke="#b08850" stroke-width="4" fill="none"/>`;
  s += `<path d="M60,130 q10,60 2,120 M180,130 q-10,60 -2,120" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`;
  if (label) s += `<rect x="62" y="150" width="116" height="74" rx="6" fill="#F7F0E0" stroke="${INK}" stroke-width="3" transform="rotate(-4 120 187)"/><text x="120" y="206" text-anchor="middle" font-family="${o.font || 'Playfair'}" font-weight="900" font-size="${o.fs || 52}" fill="${INK}" transform="rotate(-4 120 187)">${label}</text>`;
  return s;
}
const mkSack = (pa, b, label, o) => mk(pa, b, sackInner(label, o), '0 0 240 280', 'sack');

/* ---------- balanza de mercado (HTML: poste + brazo + platillos) ---------- */
function mkBalance(pa, cx, cy, L = 760, o = {}) {
  const drop = o.drop || 250, wP = o.wP || 300, z = o.z || 5, col = o.col || BRASS, ink = o.ink || INK;
  const root = box(pa, 0, 0, 1080, 1920, { zIndex: z });
  const postH = o.postH || 520;
  const post = box(root, 0, 0, 1080, 1920, { zIndex: 1 });
  post.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">
   ${o.sil ? '' : cut(`<rect x="${cx - 18}" y="${cy}" width="36" height="${postH}"/><path d="M${cx - 150},${cy + postH + 40} Q${cx},${cy + postH - 40} ${cx + 150},${cy + postH + 40} Z"/>`, 6, 8)}
   <rect x="${cx - 18}" y="${cy}" width="36" height="${postH}" fill="${col}" stroke="${ink}" stroke-width="5"/><rect x="${cx + 2}" y="${cy}" width="16" height="${postH}" fill="url(#hD)" opacity="${o.sil ? 0 : .6}"/>
   <path d="M${cx - 150},${cy + postH + 40} Q${cx},${cy + postH - 40} ${cx + 150},${cy + postH + 40} Z" fill="${o.sil ? ink : WOOD}" stroke="${ink}" stroke-width="5"/><path d="M${cx - 150},${cy + postH + 40} Q${cx},${cy + postH - 40} ${cx + 150},${cy + postH + 40} Z" fill="url(#hW)" opacity="${o.sil ? 0 : .35}"/>
   <path d="M${cx},${cy - 70} L${cx - 14},${cy - 10} L${cx + 14},${cy - 10} Z" fill="${col}" stroke="${ink}" stroke-width="4"/>
  </svg>`;
  const half = L / 2 - 14;
  const beam = box(root, cx - L / 2, cy - 22, L, 44, { zIndex: 3 });
  beam.innerHTML = `<svg width="${L}" height="44" style="overflow:visible"><path d="M8,22 Q${L / 2},2 ${L - 8},22 Q${L / 2},40 8,22 Z" fill="${col}" stroke="${ink}" stroke-width="5"/><path d="M8,22 Q${L / 2},2 ${L - 8},22" stroke="${ink}" stroke-width="2" fill="none" opacity=".5"/><circle cx="${L / 2}" cy="22" r="20" fill="${col}" stroke="${ink}" stroke-width="5"/><circle cx="${L / 2}" cy="22" r="7" fill="${ink}"/><circle cx="14" cy="22" r="12" fill="${col}" stroke="${ink}" stroke-width="4"/><circle cx="${L - 14}" cy="22" r="12" fill="${col}" stroke="${ink}" stroke-width="4"/></svg>`;
  const mkPlate = (ex) => {
    const pl = box(root, ex - wP / 2, cy, wP, drop + 40, { zIndex: 4 });
    const svg = `<svg width="${wP}" height="${drop + 40}" style="overflow:visible;position:absolute;left:0;top:0"><path d="M${wP / 2},0 L18,${drop} M${wP / 2},0 L${wP - 18},${drop} M${wP / 2},0 L${wP / 2},${drop - 6}" stroke="${ink}" stroke-width="4" stroke-dasharray="10 5"/>
      <path d="M4,${drop} Q${wP / 2},${drop + 56} ${wP - 4},${drop} Z" fill="${col}" stroke="${ink}" stroke-width="5"/><path d="M4,${drop} Q${wP / 2},${drop + 56} ${wP - 4},${drop} Z" fill="url(#hD)" opacity="${o.sil ? 0 : .45}"/><path d="M2,${drop} H${wP - 2}" stroke="${ink}" stroke-width="7" stroke-linecap="round"/></svg>`;
    const lay = box(pl, 0, 0, wP, drop + 40, { zIndex: 1 }); lay.innerHTML = svg;
    const cont = box(pl, 0, drop, wP, 1, { zIndex: 2 }); // contenido: hijos con top negativo
    return { pl, cont };
  };
  const L0 = mkPlate(cx - half), R0 = mkPlate(cx + half);
  const setA = (a, ex = {}) => {
    const rad = a * Math.PI / 180, dx = half * (Math.cos(rad) - 1), dy = half * Math.sin(rad);
    set(beam, { r: a });
    set(L0.pl, { x: -dx + (ex.x || 0), y: -dy });
    set(R0.pl, { x: dx, y: dy });
  };
  setA(0);
  return { root, beam, L: L0, R: R0, setA };
}
// oscilación amortiguada: de a0 a a1 empezando en t0
const damp = (t, t0, a0, a1, f = 2.2, k = 2.6) => t < t0 ? a0 : a1 + (a0 - a1) * Math.exp(-(t - t0) * k) * Math.cos((t - t0) * f * Math.PI * 2);

/* ---------- báscula de reloj (viewBox 0 0 600 900) ---------- */
function scaleInner() {
  const cx = 300, cy = 300, R = 230;
  let tk = '';
  for (let v = 0; v <= 20; v++) {
    const a = (-135 + v / 20 * 270) * Math.PI / 180, big = v % 5 === 0;
    const x1 = cx + Math.sin(a) * (R - 18), y1 = cy - Math.cos(a) * (R - 18), x2 = cx + Math.sin(a) * (R - (big ? 58 : 38)), y2 = cy - Math.cos(a) * (R - (big ? 58 : 38));
    tk += `<path d="M${f1(x1)},${f1(y1)} L${f1(x2)},${f1(y2)}" stroke="${INK}" stroke-width="${big ? 7 : 3.5}"/>`;
    if (big) tk += `<text x="${f1(cx + Math.sin(a) * (R - 92))}" y="${f1(cy - Math.cos(a) * (R - 92) + 16)}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">${v}</text>`;
  }
  const body = `M${cx - 30},${cy + R - 10} L${cx - 60},800 L${cx + 60},800 L${cx + 30},${cy + R - 10} Z`;
  const plat = 'M40,800 H560 L540,860 H60 Z';
  let s = cut(`<circle cx="${cx}" cy="${cy}" r="${R + 28}"/>` + P(body) + P(plat));
  s += D(body, BRASS, 5) + HF(body, 'hD') + D(plat, BRASS, 5) + HF(plat, 'hA') + `<path d="M40,800 H560" stroke="${INK}" stroke-width="8"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 28}" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="${cx}" cy="${cy}" r="${R + 28}" fill="url(#hA)" opacity=".5"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#hP)" opacity=".4"/>${tk}`;
  s += `<text x="${cx}" y="${cy + 112}" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">kg</text>`;
  s += `<g class="needle"><path d="M${cx - 10},${cy + 30} L${cx},${cy - R + 40} L${cx + 10},${cy + 30} Z" fill="${RED}" stroke="${INK}" stroke-width="4"/></g><circle cx="${cx}" cy="${cy}" r="22" fill="${INK}"/><circle cx="${cx - 6}" cy="${cy - 6}" r="6" fill="#fff" opacity=".6"/>`;
  return s;
}

/* ---------- pastel en cuartos (viewBox 0 0 500 500) ---------- */
function pieInner() {
  const c = 250, r = 220;
  const q = (a0, a1) => { const p0 = [c + Math.cos(a0) * r, c + Math.sin(a0) * r], p1 = [c + Math.cos(a1) * r, c + Math.sin(a1) * r]; return `M${c},${c} L${f1(p0[0])},${f1(p0[1])} A${r},${r} 0 0,1 ${f1(p1[0])},${f1(p1[1])} Z`; };
  let s = cut(`<circle cx="${c}" cy="${c}" r="${r}"/>`);
  for (let i = 0; i < 4; i++) {
    const a0 = -Math.PI / 2 + i * Math.PI / 2, a1 = a0 + Math.PI / 2, d = q(a0, a1);
    s += `<g class="qt${i}"><path class="qf" d="${d}" fill="${SACK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="${d}" fill="url(#${i % 2 ? 'hA' : 'hB'})" opacity=".55"/></g>`;
  }
  return s;
}

/* ---------- pluma (viewBox 0 0 120 420; punta en 18,410) ---------- */
function quillInner() {
  const vane = 'M24,380 C20,260 50,120 112,8 C118,120 96,260 40,384 Z';
  let s = cut(P(vane), 4, 6) + D(vane, '#FBF6EA', 3.5) + `<path d="M28,400 C40,300 72,140 112,10" stroke="${INK}" stroke-width="4" fill="none"/>`;
  let br = ''; for (let k = 0; k < 16; k++) { const y = 360 - k * 21; br += `M${f1(40 + k * 4)},${y} l${f1(26 - k * 0.6)},${-22}M${f1(36 + k * 4)},${y} l-12,${-10}`; }
  s += `<path d="${br}" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/><path d="M18,412 L30,372 L40,378 Z" fill="${INK}"/>`;
  return s;
}

/* ---------- sombreros de época para bustos (viewBox 360x460) ---------- */
const hoodOver = (col = '#5a3a2a') => {
  const h = 'M92,206 C80,120 140,84 192,88 C252,92 286,132 270,210 C252,176 214,156 180,156 C146,156 112,176 92,206 Z';
  const tail = 'M262,150 C300,170 318,230 304,300 C290,250 276,210 252,190 Z';
  return cut(P(h) + P(tail), 4, 5) + D(tail, col) + HF(tail, 'hD') + D(h, col) + HF(h, 'hA') + `<path d="M104,182 Q180,136 262,184" stroke="${INK}" stroke-width="3" fill="none"/>`;
};
const beretOver = (col = '#9b2c2c') => {
  const c = 'M84,176 C56,118 128,70 204,78 C282,86 312,132 276,176 C232,150 130,150 84,176 Z', band = 'M100,166 Q180,140 262,166 L264,184 Q180,160 98,186 Z';
  return cut(P(c), 4, 5) + D(c, col) + HF(c, 'hA') + D(band, INK) + `<path d="M190,80 q6,-14 16,-8" stroke="${INK}" stroke-width="5" fill="none"/>`;
};
const hairOver = () => {
  const h = 'M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z';
  return D(h, '#3a2a1e') + HF(h, 'hF') + `<path d="M132,170 q30,-30 72,-26" stroke="${FIG}" stroke-width="3" fill="none" opacity=".5"/>`;
};
const tieOver = () => `<path d="M146,330 L180,372 L214,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M172,340 L188,340 L196,430 L180,452 L164,430 Z" fill="#2f4a6a" stroke="${INK}" stroke-width="3"/><path d="M172,340 L188,340 L196,430 L180,452 L164,430 Z" fill="url(#hA)" opacity=".5"/>`;
function merchantInner(seed, hat = 'hood', col) {
  let s = bustInner({ uniform: 'farmer', moustache: seed % 2 === 1, beard: seed % 3 === 0, seed });
  s += coatOver(col || (hat === 'beret' ? '#3a2a4a' : '#5a3a2a'));
  s += `<path d="M120,330 Q180,360 240,330" stroke="#c9a24a" stroke-width="8" fill="none"/>`;
  s += hat === 'beret' ? beretOver() : hoodOver(col ? '#3a2a1e' : '#6a4a2a');
  return s;
}
function engineerInner() {
  return bustInner({ uniform: 'soldier', seed: 61 }) + coatOver('#6a5a48') + tieOver() + hairOver() + specsOver();
}
function scholarInner(seed, k) {
  return bustInner({ uniform: 'soldier', beard: k === 0, moustache: k === 1, seed }) + coatOver(k ? '#2f3a4a' : '#4a2f2f') + (k ? specsOver() : '') + (k ? capOver() : hoodOver('#2f2f3a'));
}

/* ---------- mapa de España con Aragón ---------- */
const ESP = [[-9.3, 43.0], [-8.2, 43.7], [-7.0, 43.55], [-5.7, 43.6], [-4.5, 43.4], [-3.0, 43.45], [-1.8, 43.4], [-1.4, 43.05], [-0.7, 42.85], [0.7, 42.85], [1.7, 42.5], [3.2, 42.4], [3.2, 41.9], [2.2, 41.3], [0.9, 41.0], [0.5, 40.6], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3], [-2.1, 36.7], [-3.5, 36.75], [-4.4, 36.7], [-5.3, 36.1], [-6.0, 36.3], [-6.4, 36.8], [-7.4, 37.2], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 38.5], [-7.0, 39.0], [-7.5, 39.6], [-6.9, 40.2], [-6.8, 41.0], [-6.2, 41.6], [-6.6, 41.95], [-8.1, 41.8], [-8.9, 41.9], [-8.8, 42.5]];
const ARA = [[-0.8, 42.85], [0.7, 42.85], [0.75, 42.3], [0.6, 41.5], [0.3, 41.0], [0.2, 40.6], [-0.3, 40.2], [-0.8, 40.0], [-1.5, 40.1], [-1.8, 40.5], [-1.6, 41.0], [-2.1, 41.4], [-1.8, 41.9], [-1.2, 42.2], [-1.0, 42.6]];
const esPj = (lo, la) => [f1((lo + 9.6) * 70), f1((44 - la) * 85)];
const esPath = a => 'M' + a.map(q => esPj(q[0], q[1]).join(',')).join('L') + 'Z';
function spainInner() {
  const es = esPath(ESP), ar = esPath(ARA), id = uid('es');
  let s = cut(P(es), 8, 10) + D(es, FIG, 6) + clipG(id, es, `<rect x="0" y="0" width="920" height="700" fill="url(#hP)"/>`);
  s += `<path class="ara" d="${ar}" fill="${YEL}" stroke="${INK}" stroke-width="5" stroke-dasharray="12 6"/>`;
  s += `<path d="${es}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  return s;
}

/* ---------- la Giralda (viewBox 0 0 300 1000) ---------- */
function giraldaInner() {
  const id = uid('gi');
  const shaft = 'M60,1000 V340 H240 V1000 Z', bel = 'M78,340 V210 H222 V340 Z', t1 = 'M98,210 V140 H202 V210 Z', t2 = 'M118,140 V90 H182 V140 Z', dome = 'M126,90 Q150,30 174,90 Z';
  let s = cut(P(shaft) + P(bel) + P(t1) + P(t2) + P(dome), 8, 10);
  s += D(shaft, '#E2C3A8', 5) + clipG(id, shaft, `<rect x="0" y="330" width="300" height="680" fill="url(#hP)"/><rect x="200" y="330" width="50" height="680" fill="url(#hA)"/>`);
  let lat = ''; for (let y = 420; y < 900; y += 34) for (let x = 84; x < 220; x += 34) lat += `M${x},${y} l17,-17 l17,17 l-17,17 Z`;
  s += `<path d="${lat}" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".45"/>`;
  [[400], [600], [800]].forEach(([y]) => s += `<path d="M130,${y} V${y - 50} Q150,${y - 74} 170,${y - 50} V${y} Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>`);
  s += D(bel, '#EAD3B8', 5) + `<rect x="78" y="330" width="144" height="12" fill="${INK}"/>`;
  [100, 136, 172].forEach(x => s += `<path d="M${x},328 V262 Q${x + 14},240 ${x + 28},262 V328 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>`);
  s += D(t1, '#E2C3A8', 4) + HF(t1, 'hA') + D(t2, '#EAD3B8', 4) + D(dome, BRASS, 4) + HF(dome, 'hD');
  s += `<path d="M150,40 V-10" stroke="${INK}" stroke-width="5"/><path d="M150,-10 L176,-2 L150,8 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="150" cy="-16" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  return s;
}

/* ---------- barrica y ánfora ---------- */
function barrelInner() { // 0 0 260 300
  const b = 'M44,20 Q8,150 44,280 L216,280 Q252,150 216,20 Z', id = uid('br');
  let s = cut(P(b)) + D(b, '#A0683A', 5) + clipG(id, b, `<rect x="170" y="0" width="100" height="300" fill="url(#hA)"/>`);
  s += `<path d="M86,22 Q70,150 86,278 M130,22 V278 M174,22 Q190,150 174,278" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".6"/>`;
  [46, 104, 196, 254].forEach(y => s += `<path d="M${y < 150 ? 30 - (y - 46) * 0.1 : 30},${y} Q130,${y + 14} ${y < 150 ? 230 : 230},${y}" stroke="${INK}" stroke-width="12" fill="none"/><path d="M30,${y} Q130,${y + 14} 230,${y}" stroke="#8a8a80" stroke-width="5" fill="none"/>`);
  s += `<ellipse cx="130" cy="22" rx="88" ry="16" fill="#8a5a30" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function amphoraInner() { // 0 0 200 340
  const a = 'M72,24 H128 V54 Q192,112 172,222 Q152,302 100,332 Q48,302 28,222 Q8,112 72,54 Z';
  let s = cut(P(a) + '<path d="M72,60 Q20,60 34,120"/><path d="M128,60 Q180,60 166,120"/>') + `<path d="M72,60 Q20,60 34,120 M128,60 Q180,60 166,120" stroke="${INK}" stroke-width="14" fill="none"/><path d="M72,60 Q20,60 34,120 M128,60 Q180,60 166,120" stroke="#C1663A" stroke-width="7" fill="none"/>`;
  s += D(a, '#C1663A', 5) + `<path d="${a}" fill="url(#hB)" opacity=".45"/><rect x="66" y="16" width="68" height="14" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/>`;
  return s;
}

/* ---------- máquina de escribir (viewBox 0 0 860 600) ---------- */
const TW_ROWS = [['1', '2', '3', '4', '@', '5', '6', '7', '8', '9'], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-']];
function twKeyPos(r, k) { return [130 + k * 66 + r * 14, 330 + r * 62]; }
function typewriterInner() {
  const body = 'M50,580 L110,250 L750,250 L810,580 Z', roll = 'M80,176 H780 V236 H80 Z', id = uid('tw');
  let s = `<g class="paper"><path d="M250,-40 H610 V200 H250 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M280,10 H560 M280,40 H520 M280,70 H580" stroke="${INK}" stroke-width="5" opacity=".3"/></g>`;
  s += cut(P(body) + P(roll), 8, 10) + D(roll, '#2f2a26', 5) + `<rect x="80" y="190" width="700" height="12" fill="#fff" opacity=".18"/><circle cx="66" cy="206" r="30" fill="${INK}"/><circle cx="794" cy="206" r="30" fill="${INK}"/><circle cx="66" cy="206" r="14" fill="${BRASS}"/><circle cx="794" cy="206" r="14" fill="${BRASS}"/>`;
  s += D(body, '#3a3330', 5) + clipG(id, body, `<rect x="600" y="240" width="260" height="360" fill="url(#hA)" opacity=".8"/><rect x="0" y="540" width="860" height="60" fill="url(#hB)"/>`);
  let bars = ''; for (let k = 0; k < 19; k++) { const a = Math.PI + k / 18 * Math.PI; bars += `M${f1(430 + Math.cos(a) * 150)},${f1(262 + Math.sin(a) * -40 + 20)} L430,240`; }
  s += `<path d="M280,262 Q430,232 580,262" stroke="${INK}" stroke-width="22" fill="none"/><path d="M280,262 Q430,232 580,262" stroke="${BRASS}" stroke-width="12" fill="none"/>`;
  s += `<rect x="330" y="540" width="200" height="26" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  TW_ROWS.forEach((row, r) => row.forEach((ch, k) => {
    if (ch === '@') return;
    const [x, y] = twKeyPos(r, k);
    s += `<path d="M${x},${y + 30} V${y + 50}" stroke="${INK}" stroke-width="6"/><circle cx="${x}" cy="${y}" r="27" fill="${INK}"/><circle cx="${x}" cy="${y - 3}" r="24" fill="#F4ECDA" stroke="#9a9080" stroke-width="3"/><text x="${x}" y="${y + 8}" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="26" fill="${INK}">${ch}</text>`;
  }));
  return s;
}

/* ---------- ordenador de los años 70 (capa 1080) ---------- */
function computerSvg(x0, y0) {
  let s = '';
  for (let i = 0; i < 3; i++) {
    const x = x0 + i * 300, cab = `M${x},${y0} H${x + 270} V${y0 + 680} H${x} Z`;
    s += cut(P(cab), 8, 10) + D(cab, '#CFC8B8', 5) + clipG(uid('cb'), cab, `<rect x="${x + 220}" y="${y0}" width="60" height="700" fill="url(#hA)" opacity=".8"/>`);
    s += `<rect x="${x + 22}" y="${y0 + 30}" width="226" height="250" rx="8" fill="#3a3330" stroke="${INK}" stroke-width="4"/>`;
    [[x + 80, y0 + 100], [x + 190, y0 + 100]].forEach(([cx, cy], j) => s += `<g class="reel" data-cx="${cx}" data-cy="${cy}"><circle cx="${cx}" cy="${cy}" r="52" fill="#E8E2D4" stroke="${INK}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="${j ? 30 : 44}" fill="#3a2f26"/><path d="M${cx - 40},${cy} H${cx + 40} M${cx},${cy - 40} V${cy + 40}" stroke="#E8E2D4" stroke-width="7"/><circle cx="${cx}" cy="${cy}" r="10" fill="#E8E2D4" stroke="${INK}" stroke-width="3"/></g>`);
    s += `<path d="M${x + 80},${y0 + 152} L${x + 135},${y0 + 230} L${x + 190},${y0 + 152}" stroke="#3a2f26" stroke-width="5" fill="none"/>`;
    for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) s += `<circle class="lamp" cx="${x + 50 + k * 34}" cy="${y0 + 330 + r * 34}" r="11" fill="#8a8070" stroke="${INK}" stroke-width="3"/>`;
    s += `<path d="M${x + 30},${y0 + 490} H${x + 240} M${x + 30},${y0 + 530} H${x + 240} M${x + 30},${y0 + 570} H${x + 240}" stroke="${INK}" stroke-width="4" opacity=".55"/>`;
  }
  return s;
}

/* ---------- pantalla retro (viewBox 0 0 720 560) ---------- */
function crtInner() {
  const body = 'M20,20 H700 V470 H20 Z', foot = 'M240,470 H480 L520,540 H200 Z';
  let s = cut(P(body) + P(foot), 8, 10) + D(foot, '#CFC8B8', 5) + HF(foot, 'hA');
  s += `<rect x="20" y="20" width="680" height="450" rx="38" fill="#E3DCCB" stroke="${INK}" stroke-width="6"/><rect x="20" y="20" width="680" height="450" rx="38" fill="url(#hA)" opacity=".25"/>`;
  s += `<rect x="62" y="58" width="596" height="370" rx="30" fill="#1f2a22" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M90,90 q120,-20 260,-8" stroke="#fff" stroke-width="6" opacity=".12" fill="none" stroke-linecap="round"/><circle cx="640" cy="448" r="8" fill="${RED}"/>`;
  return s;
}
/* sobre de carta (viewBox 0 0 300 200) */
const envInner = () => `${cut('<rect x="0" y="0" width="300" height="200" rx="10"/>', 5, 7)}<rect x="0" y="0" width="300" height="200" rx="10" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="M6,8 L150,112 L294,8" stroke="${INK}" stroke-width="5" fill="none"/><path d="M6,194 L120,92 M294,194 L180,92" stroke="${INK}" stroke-width="3" fill="none"/>`;
