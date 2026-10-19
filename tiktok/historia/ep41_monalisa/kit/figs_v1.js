/* Esto no venía en el libro — figuras de collage grabado (SVG) */
const INK = '#2B2118', PAPER = '#EADFC8', FIG = '#F4ECDB', YEL = '#FFE600', PINK = '#FF3EA5', RED = '#C8102E', SH = 'rgba(43,33,24,.42)', LEATHER = '#4A2A17';
const NS = 'http://www.w3.org/2000/svg';
function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
let UID = 0; const uid = s => s + (++UID);
const f1 = v => Math.round(v * 10) / 10;
function smooth(pts) {
  const n = pts.length, m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let s = 'M' + m(pts[n - 1], pts[0]).map(f1).join(',');
  for (let i = 0; i < n; i++) { const a = pts[i], b = m(pts[i], pts[(i + 1) % n]); s += `Q${f1(a[0])},${f1(a[1])} ${f1(b[0])},${f1(b[1])}`; }
  return s + 'Z';
}
// recorte de papel: sombra dura desplazada + borde blanco irregular
function cut(sil, dx = 8, dy = 10) {
  return `<g transform="translate(${dx},${dy})" fill="${SH}" stroke="${SH}" stroke-width="14" stroke-linejoin="round">${sil}</g>` +
    `<g fill="#fff" stroke="#fff" stroke-width="14" stroke-linejoin="round">${sil}</g>` +
    `<g fill="none" stroke="#fff" stroke-width="22" stroke-dasharray="22 30 12 38" stroke-linejoin="round">${sil}</g>`;
}
const P = d => `<path d="${d}"/>`;
const D = (d, fill = FIG, sw = 3) => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const HF = (d, pat) => `<path d="${d}" fill="url(#${pat})"/>`;
function limb(x1, y1, x2, y2, w1, w2) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l;
  return `M${f1(x1 + nx * w1)},${f1(y1 + ny * w1)}L${f1(x2 + nx * w2)},${f1(y2 + ny * w2)}L${f1(x2 - nx * w2)},${f1(y2 - ny * w2)}L${f1(x1 - nx * w1)},${f1(y1 - ny * w1)}Z`;
}
function clipG(id, d, inner) { return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`; }

/* ---------------- defs globales: tramas de grabado + símbolos ---------------- */
function globalDefs() {
  const pat = (id, w, rot, lw, col = INK) => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${w}" height="${w}" patternTransform="rotate(${rot})"><rect width="${lw}" height="${w}" fill="${col}"/></pattern>`;
  return pat('hA', 6, 38, 1.5) + pat('hB', 6, -46, 1.4) + pat('hF', 4.6, 4, 1.1) + pat('hD', 4, 38, 1.9) + pat('hW', 7, 90, 1.2) + pat('hP', 9, 30, 2, 'rgba(43,33,24,.25)');
}

/* ---------------- EMÚ ---------------- */
function emuLeg(hx, hy, a1, a2) {
  const r = Math.PI / 180, L1 = 72, L2 = 100;
  const kx = hx + Math.sin(a1 * r) * L1, ky = hy + Math.cos(a1 * r) * L1, ax = kx + Math.sin(a2 * r) * L2, ay = ky + Math.cos(a2 * r) * L2;
  const thigh = limb(hx, hy, kx, ky, 16, 7), shin = limb(kx, ky, ax, ay, 6, 4.5);
  const toes = [limb(ax, ay, ax - 34, ay + 10, 4.5, 2), limb(ax, ay, ax - 16, ay + 16, 4.5, 2), limb(ax, ay, ax + 14, ay + 9, 4, 1.8)];
  let det = D(thigh) + HF(thigh, 'hA') + D(shin) + toes.map(t => D(t, FIG, 2.6)).join('');
  let sc = ''; for (let k = 1; k < 10; k++) { const x = kx + (ax - kx) * k / 10, y = ky + (ay - ky) * k / 10; sc += `M${f1(x - 5)},${f1(y)}l10,1.5`; }
  det += `<path d="${sc}" stroke="${INK}" stroke-width="1.6"/><circle cx="${f1(kx)}" cy="${f1(ky)}" r="7.5" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  return cut([thigh, shin, ...toes].map(P).join('') + `<circle cx="${f1(kx)}" cy="${f1(ky)}" r="7.5"/>`, 6, 8) + det;
}
function emuInner(o = {}) {
  const r = rng(o.seed || 11), id = uid('e'), fe = o.fe || 230;
  const cx = 232, cy = 318, rx = 138, ry = 98, rot = -0.14, cr = Math.cos(rot), sr = Math.sin(rot);
  const tr = (x, y) => [cx + x * cr - y * sr, cy + x * sr + y * cr];
  const pts = []; const N = 56;
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, rr = 1 + (r() - .5) * .07; let x = Math.cos(a) * rx * rr, y = Math.sin(a) * ry * rr; if (Math.sin(a) > 0.05) y += (i % 2 ? 3 : 14 + r() * 12) * Math.sin(a); pts.push(tr(x, y)); }
  const body = smooth(pts);
  let s = '';
  const LP = { stand: [[14, -6], [8, -2]], A: [[-30, -58], [40, 24]], B: [[40, 24], [-30, -58]] }[o.pose || 'stand'];
  if (!o.tank) {
    s += `<g class="legR">${emuLeg(262, 384, LP[1][0], LP[1][1])}</g>`;
    s += `<g class="legL">${emuLeg(200, 392, LP[0][0], LP[0][1])}</g>`;
  } else {
    const tread = 'M130,392 L350,392 Q392,392 392,434 Q392,476 350,476 L130,476 Q88,476 88,434 Q88,392 130,392 Z';
    const barrel = limb(122, 332, 4, 318, 13, 10);
    s += cut(P(tread) + P(barrel)) + D(barrel) + HF(barrel, 'hD') + `<rect x="-6" y="306" width="18" height="24" rx="4" fill="${INK}"/>` + D(tread, '#cfc3a8', 4) + HF(tread, 'hA');
    s += `<path class="track" d="${tread}" fill="none" stroke="${INK}" stroke-width="9" stroke-dasharray="7 9"/>`;
    for (let k = 0; k < 5; k++) { const x = 140 + k * 50; s += `<g class="twheel" data-c="${x},434"><circle cx="${x}" cy="434" r="24" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><path d="M${x - 20},434 h40 M${x},414 v40" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="434" r="6" fill="${INK}"/></g>`; }
  }
  // cuerpo
  s += cut(P(body)) + D(body);
  s += clipG(id + 'b', body, `<ellipse cx="${cx + 40}" cy="${cy + 78}" rx="175" ry="82" fill="url(#hA)"/><ellipse cx="${cx + 80}" cy="${cy + 112}" rx="150" ry="55" fill="url(#hB)"/>`);
  let fp = '';
  for (let k = 0; k < fe; k++) { let u, v; do { u = r() * 2 - 1; v = r() * 2 - 1; } while (u * u + v * v > 0.92); const [x, y] = tr(u * rx, v * ry); const len = 10 + r() * 14 + (v + 1) * 6, dx = 2 + r() * 7; fp += `M${f1(x)},${f1(y)}q${f1(dx * .2)},${f1(len * .55)} ${f1(dx)},${f1(len)}`; }
  s += `<path d="${fp}" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linecap="round"/><path d="${body}" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
  // ala (inútil)
  const wing = 'M266,296 Q322,282 340,326 Q314,342 286,336 Q262,328 266,296 Z';
  s += `<g class="wing">${cut(P(wing), 4, 6)}${D(wing)}<path d="M276,306 q20,4 50,22 M280,318 q16,4 40,14 M286,300 q20,0 40,14" stroke="${INK}" stroke-width="1.8" fill="none"/></g>`;
  // cuello + cabeza
  const neck = 'M146,294 C134,238 104,192 106,118 L146,112 C146,170 168,224 198,282 Z';
  const head = 'M92,90 C92,64 112,54 132,54 C156,54 172,68 172,88 C172,108 154,120 132,120 C110,120 92,110 92,90 Z';
  const beak = 'M100,84 Q78,86 54,97 Q78,101 102,100 Z', jaw = 'M102,100 Q80,102 56,100 Q78,113 104,111 Z';
  let hs = P(neck) + P(head) + P(beak), helm = '';
  if (o.helmet) { const dome = 'M84,66 Q132,0 180,66 Z', brim = 'M66,66 Q132,52 198,66 Q132,84 66,66 Z'; hs += P(dome) + P(brim); helm = D(dome, '#d9cfb8') + HF(dome, 'hA') + D(brim) + HF(brim, 'hD'); }
  let g = cut(hs) + D(neck) + clipG(id + 'n', neck, `<path d="M128,110 L210,110 L210,300 L160,300 Z" fill="url(#hF)"/>`);
  let tf = ''; for (let k = 0; k < 26; k++) { const yy = 150 + r() * 130, xx = 112 + (yy - 110) * 0.22 + r() * 26; tf += `M${f1(xx)},${f1(yy)}q2,6 ${f1(4 + r() * 4)},${f1(8 + r() * 6)}`; }
  g += `<path d="${tf}" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  g += D(head) + clipG(id + 'h', head, `<ellipse cx="162" cy="106" rx="34" ry="24" fill="url(#hA)"/>`);
  g += `<path d="M112,62 l-4,-12 M120,57 l-2,-13 M128,55 l0,-13 M136,55 l3,-12 M144,57 l5,-11 M152,60 l7,-9" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
  g += `<path d="M104,95 L58,98 L106,114 Z" fill="#160f0a"/>`;
  g += `<g class="jaw">${cut(P(jaw), 3, 5)}${D(jaw)}<path d="M66,104 L100,107" stroke="${INK}" stroke-width="1.5"/></g>`;
  g += D(beak) + `<path d="M62,95 L98,92 M86,90 l6,-1" stroke="${INK}" stroke-width="1.6"/>`;
  g += `<circle cx="122" cy="80" r="16" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="152" cy="78" r="13" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  g += `<g class="pup"><circle cx="122" cy="81" r="7" fill="${INK}"/><circle cx="152" cy="79" r="6" fill="${INK}"/><circle cx="119.5" cy="78.5" r="2.2" fill="#fff"/><circle cx="150" cy="77" r="1.8" fill="#fff"/></g>`;
  g += `<g class="lidH" style="opacity:0"><path d="M106,81 A16,16 0 0,1 138,81 Z" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M139,79 A13,13 0 0,1 165,79 Z" fill="${FIG}" stroke="${INK}" stroke-width="3"/></g>`;
  g += `<g class="lidC" style="opacity:0"><circle cx="122" cy="80" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="152" cy="78" r="13" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M108,82 q14,7 28,0 M141,80 q11,6 22,0" stroke="${INK}" stroke-width="3" fill="none"/></g>`;
  g += helm;
  s += `<g class="neckg"${o.neck ? ` transform="rotate(${o.neck} 172 286)"` : ''}>${g}</g>`;
  return s;
}

/* ---------------- BUSTOS (Meredith, soldados, granjero) ---------------- */
function bustInner(o = {}) {
  const id = uid('b'), r = rng(o.seed || 5);
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const neck = 'M150,262 L210,262 L216,340 L144,340 Z';
  const upper = 'M118,252 C112,190 130,140 180,138 C230,140 248,190 242,252 Z';
  const jaw = 'M120,246 L240,246 C238,292 212,318 180,318 C148,318 122,292 120,246 Z';
  let s = cut(P(torso) + P(neck)) + D(torso) + clipG(id + 't', torso, `<rect x="238" y="320" width="120" height="150" fill="url(#hA)"/><rect x="20" y="426" width="330" height="40" fill="url(#hB)"/>`);
  const u = o.uniform || 'soldier';
  if (u === 'officer') {
    const sb = limb(92, 350, 300, 460, 11, 11);
    s += `<path d="M150,334 L122,460 M210,334 L238,460" stroke="${INK}" stroke-width="3" fill="none"/>`;
    s += D(sb) + HF(sb, 'hD');
    s += D('M66,360 L132,338 L136,356 L74,378 Z') + D('M294,360 L228,338 L224,356 L286,378 Z');
    s += `<circle cx="180" cy="412" r="6" fill="${INK}"/><circle cx="180" cy="442" r="6" fill="${INK}"/>`;
    s += `<rect x="236" y="372" width="15" height="22" fill="${INK}"/><rect x="253" y="372" width="15" height="22" fill="${FIG}" stroke="${INK}" stroke-width="2"/><rect x="270" y="372" width="15" height="22" fill="url(#hD)" stroke="${INK}" stroke-width="2"/>`;
  } else if (u === 'farmer') {
    const s1 = limb(124, 334, 110, 460, 9, 8), s2 = limb(236, 334, 250, 460, 9, 8);
    s += `<path d="M146,330 L180,372 L214,330" stroke="${INK}" stroke-width="3.5" fill="none"/>` + D(s1) + HF(s1, 'hD') + D(s2) + HF(s2, 'hD');
    s += `<path d="M178,380 v80" stroke="${INK}" stroke-width="2" stroke-dasharray="3 14"/>`;
    s += D('M196,372 h24 v26 l-12,9 l-12,-9 Z') + HF('M196,372 h24 v26 l-12,9 l-12,-9 Z', 'hF') + `<circle cx="208" cy="418" r="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M208,408 l3,7 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1 Z" fill="${INK}"/>`;
  } else {
    const bd = limb(84, 356, 290, 460, 10, 10);
    s += `<path d="M146,330 L180,370 L214,330" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
    s += D('M96,392 h60 v34 h-60 Z') + D('M204,392 h60 v34 h-60 Z') + D(bd) + `<path d="M${84},${356} L290,460" stroke="${INK}" stroke-width="7" stroke-dasharray="5 7" transform="translate(0,0)"/>`;
  }
  if (o.binos) {
    s += `<path d="M152,340 Q138,360 156,382 M208,340 Q222,360 204,382" stroke="${INK}" stroke-width="3" fill="none"/>`;
    s += `<rect x="142" y="380" width="32" height="56" rx="10" fill="${FIG}" stroke="${INK}" stroke-width="3"/><rect x="186" y="380" width="32" height="56" rx="10" fill="${FIG}" stroke="${INK}" stroke-width="3"/><rect x="142" y="380" width="32" height="56" rx="10" fill="url(#hD)"/><rect x="186" y="380" width="32" height="56" rx="10" fill="url(#hA)"/><rect x="172" y="394" width="16" height="14" fill="${INK}"/><ellipse cx="158" cy="436" rx="14" ry="4" fill="${INK}"/><ellipse cx="202" cy="436" rx="14" ry="4" fill="${INK}"/>`;
  }
  s += D(neck) + HF('M190,262 L210,262 L216,340 L192,340 Z', 'hF');
  s += `<rect x="128" y="236" width="104" height="56" fill="#160f0a"/><rect x="146" y="248" width="68" height="9" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
  let jg = cut(P(jaw), 3, 5) + D(jaw) + clipG(id + 'j', jaw, `<ellipse cx="236" cy="290" rx="44" ry="52" fill="url(#hA)"/>`) + `<path d="M162,302 q18,8 36,0" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  if (!o.moustache) jg += `<path d="M154,258 q26,12 52,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (o.beard) { let dd = ''; for (let k = 0; k < 90; k++) { const x = 126 + r() * 108, y = 254 + r() * 60; if (((x - 180) / 58) ** 2 + ((y - 250) / 66) ** 2 < 1) dd += `M${f1(x)},${f1(y)}l1.5,2.5`; } jg += `<path d="${dd}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`; }
  s += `<g class="jaw">${jg}</g>`;
  // cabeza superior + sombrero
  let hs = P(upper) + '<circle cx="116" cy="214" r="16"/><circle cx="244" cy="214" r="16"/>', hat = '';
  if (o.hat === 'cap') {
    const crown = 'M100,164 C92,112 136,90 184,92 C236,94 270,114 262,164 Z', band = 'M106,150 L258,150 L258,176 L106,176 Z', visor = 'M98,172 Q182,200 266,170 L262,186 Q182,218 102,188 Z';
    hs += P(crown) + P(visor);
    hat = D(crown) + `<path d="${crown}" fill="url(#hA)" opacity=".7"/>` + D(band) + HF(band, 'hD') + D(visor, INK) + `<circle cx="182" cy="140" r="12" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M182,128 v24 M170,140 h24" stroke="${INK}" stroke-width="2.4"/>`;
  } else if (o.hat === 'slouch') {
    const crown = 'M122,156 C118,104 148,88 180,88 C214,88 244,104 240,156 Z', brim = 'M44,158 Q180,132 316,158 Q180,190 44,158 Z', up = 'M60,158 Q50,92 128,104 L130,154 Z', band = 'M122,136 L240,136 L240,156 L122,156 Z';
    hs += P(crown) + P(brim) + P(up);
    hat = D(brim) + HF(brim, 'hB') + D(crown) + HF(crown, 'hA') + D(band, INK) + D(up) + HF(up, 'hF') + `<circle cx="94" cy="128" r="9" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/>`;
  } else if (o.hat === 'brodie') {
    const dome = 'M104,158 Q180,64 256,158 Z', brim = 'M54,160 Q180,138 306,160 Q180,188 54,160 Z';
    hs += P(dome) + P(brim);
    hat = D(dome, '#d9cfb8') + HF(dome, 'hA') + `<path d="M126,140 Q180,92 232,140" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="2 6"/>` + D(brim) + HF(brim, 'hD');
  }
  let ug = cut(hs) + `<circle cx="116" cy="214" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="244" cy="214" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(upper) + clipG(id + 'u', upper, `<ellipse cx="248" cy="214" rx="42" ry="82" fill="url(#hA)"/>`);
  ug += `<ellipse cx="156" cy="204" rx="13" ry="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/><ellipse cx="204" cy="204" rx="13" ry="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  ug += `<g class="pup"><circle cx="156" cy="205" r="5.5" fill="${INK}"/><circle cx="204" cy="205" r="5.5" fill="${INK}"/></g>`;
  ug += `<g class="lidC" style="opacity:0"><ellipse cx="156" cy="204" rx="14" ry="11" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><ellipse cx="204" cy="204" rx="14" ry="11" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  ug += `<path class="brow" d="M138,186 q18,-10 36,-2 M186,184 q18,-8 36,2" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  ug += `<path d="M182,200 C178,220 168,230 172,236 C178,240 188,240 194,234" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (o.moustache) { const mL = 'M180,238 C166,228 146,228 132,240 C122,248 108,250 98,238 C104,260 128,264 148,256 C162,250 172,252 180,254 Z'; ug += `<path d="${mL}" fill="${INK}"/><path d="${mL}" fill="${INK}" transform="translate(360,0) scale(-1,1)"/>`; }
  ug += hat;
  s += `<g class="headg">${ug}</g>`;
  return s;
}

/* ---------------- AMETRALLADORA LEWIS ---------------- */
function gunInner() {
  const stock = 'M16,122 L98,100 L102,134 L24,152 Z', grip = 'M116,130 L138,130 L128,172 L110,168 Z', bod = 'M94,96 L180,96 L180,136 L94,136 Z', shroud = 'M178,88 L394,98 L394,126 L178,136 Z', muz = 'M392,104 L448,106 L448,118 L392,120 Z';
  const drumTop = 'M140,84 A56,16 0 1,0 252,84 A56,16 0 1,0 140,84 Z', drumSide = 'M140,84 L140,98 A56,16 0 0,0 252,98 L252,84 Z';
  const bp1 = limb(360, 124, 328, 202, 4, 3), bp2 = limb(368, 124, 398, 202, 4, 3);
  let s = cut([stock, grip, bod, shroud, muz, drumSide, drumTop, bp1, bp2].map(P).join(''));
  s += D(bp1) + D(bp2) + D(stock) + HF(stock, 'hA') + D(grip) + HF(grip, 'hD') + D(bod) + HF(bod, 'hA') + D(shroud);
  let fins = ''; for (let x = 186; x < 390; x += 7) { const k = (x - 178) / 216; fins += `M${x},${f1(88 + k * 10 + 2)}L${x},${f1(136 - k * 10 - 2)}`; }
  s += `<path d="${fins}" stroke="${INK}" stroke-width="2"/>` + D(muz, INK) + D(drumSide) + HF(drumSide, 'hD') + D(drumTop);
  let rad = ''; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; rad += `M196,84L${f1(196 + 54 * Math.cos(a))},${f1(84 + 15 * Math.sin(a))}`; }
  s += `<path d="${rad}" stroke="${INK}" stroke-width="1.6"/><ellipse cx="196" cy="84" rx="12" ry="4" fill="${INK}"/>`;
  s += `<g class="flash" style="opacity:0"><path d="M448,112 L482,88 L476,104 L516,96 L482,114 L518,130 L476,122 L484,140 Z" fill="${YEL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;
  return s;
}
/* ---------------- CAMIÓN 1930 ---------------- */
function truckInner() {
  const bed = 'M18,176 L238,176 L238,238 L18,238 Z', cab = 'M232,94 L330,94 L340,238 L232,238 Z', hood = 'M330,150 L472,156 L478,238 L336,238 Z', chassis = 'M10,232 L488,232 L488,250 L10,250 Z';
  const g1 = 'M54,240 Q110,170 166,240 Z', g2 = 'M344,240 Q400,170 456,240 Z', roof = 'M224,84 L340,84 L340,98 L224,98 Z';
  let s = cut([bed, cab, hood, chassis, g1, g2, roof].map(P).join('') + '<circle cx="110" cy="262" r="46"/><circle cx="400" cy="262" r="46"/>');
  s += D(chassis, INK) + D(bed) + `<path d="M18,196 H238 M18,216 H238" stroke="${INK}" stroke-width="2"/>` + HF(bed, 'hB');
  s += D(cab) + clipG(uid('cb'), cab, `<rect x="232" y="170" width="120" height="80" fill="url(#hA)"/>`) + `<rect x="248" y="110" width="66" height="54" fill="${PAPER}" stroke="${INK}" stroke-width="3"/><path d="M252,160 L310,114" stroke="${INK}" stroke-width="1.5" opacity=".5"/>`;
  s += D(hood) + HF(hood, 'hF') + `<path d="M350,170 v52 M362,170 v52 M374,170 v52" stroke="${INK}" stroke-width="2.5"/>` + D(roof, INK);
  s += `<rect x="470" y="160" width="16" height="74" fill="${INK}"/><circle cx="488" cy="168" r="12" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += D(g1, INK) + D(g2, INK);
  for (const cx of [110, 400]) {
    let sp = ''; for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; sp += `M${cx},262L${f1(cx + 28 * Math.cos(a))},${f1(262 + 28 * Math.sin(a))}`; }
    s += `<g class="wheel" data-c="${cx},262"><circle cx="${cx}" cy="262" r="44" fill="${INK}"/><circle cx="${cx}" cy="262" r="44" fill="url(#hW)"/><circle cx="${cx}" cy="262" r="30" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="${sp}" stroke="${INK}" stroke-width="3"/><circle cx="${cx}" cy="262" r="8" fill="${INK}"/></g>`;
  }
  return s;
}
/* ---------------- TRIGO, ARBUSTO ---------------- */
function wheatSym() {
  let s = `<path d="M30,258 Q27,170 31,72" stroke="${INK}" stroke-width="3" fill="none"/><path d="M29,210 Q8,180 6,146 Q22,168 30,190 Z" fill="${FIG}" stroke="${INK}" stroke-width="2"/><path d="M30,170 Q50,140 56,112 Q42,140 30,158 Z" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  for (let k = 0; k < 7; k++) { const y = 74 - k * 8; s += `<ellipse cx="24" cy="${y}" rx="6" ry="11" transform="rotate(-25 24 ${y})" fill="${FIG}" stroke="${INK}" stroke-width="2"/><ellipse cx="37" cy="${y}" rx="6" ry="11" transform="rotate(25 37 ${y})" fill="${FIG}" stroke="${INK}" stroke-width="2"/><path d="M20,${y - 8} l-10,-18 M41,${y - 8} l10,-18" stroke="${INK}" stroke-width="1.3"/>`; }
  s += `<ellipse cx="31" cy="14" rx="5" ry="10" fill="${FIG}" stroke="${INK}" stroke-width="2"/><path d="M31,4 v-6" stroke="${INK}" stroke-width="1.3"/>`;
  return s;
}
function bushSym() {
  const cs = [[60, 112, 48], [118, 82, 60], [190, 100, 54], [232, 126, 30], [30, 132, 28]];
  const sil = cs.map(c => `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}"/>`).join('');
  let s = cut(sil, 6, 8);
  cs.forEach((c, i) => { s += `<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="${c[0] + 10}" cy="${c[1] + 10}" r="${c[2] * .85}" fill="url(#${i % 2 ? 'hA' : 'hB'})"/>`; });
  const r = rng(77); let lv = ''; for (let k = 0; k < 60; k++) { const c = cs[k % 5], a = r() * 6.28, d = r() * c[2] * .8; lv += `M${f1(c[0] + Math.cos(a) * d)},${f1(c[1] + Math.sin(a) * d)}q4,-6 9,-2`; }
  s += `<path d="${lv}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  return s;
}
/* ---------------- MAPA DE AUSTRALIA ---------------- */
const AUS = [[113.5, -22], [114.5, -21.8], [116.7, -20.6], [118.5, -20.3], [121, -19.5], [122.2, -17.5], [123.5, -16.5], [125, -15], [126.8, -13.9], [128.2, -14.9], [129.5, -14.9], [130.2, -13.2], [131, -12.2], [132.6, -11.5], [134, -12], [135.9, -12.2], [136.8, -12.3], [136, -13.5], [135.5, -15], [137.5, -16.2], [139.3, -17.4], [140.8, -17.4], [141.6, -15], [141.5, -12.6], [142.5, -10.7], [143.4, -12.3], [143.8, -14.4], [145.3, -15], [145.5, -16.9], [146.2, -19], [148.8, -20.4], [150.5, -22.5], [153, -25.2], [153.6, -28.6], [153, -31], [152.5, -32.5], [151.2, -33.9], [150.1, -36.2], [149.9, -37.5], [147.7, -37.9], [146.3, -39.1], [144.7, -38.3], [143.5, -38.8], [141.6, -38.3], [140, -37.5], [139.6, -36.5], [138.5, -35.6], [138.1, -34.3], [137.5, -35.1], [136.8, -35.2], [137.8, -33.2], [137.2, -33.6], [136, -34.8], [135.2, -34.6], [134.2, -32.8], [132.2, -32], [131.1, -31.5], [129, -31.7], [126.2, -32.3], [124, -33.6], [123.5, -33.9], [121.8, -33.9], [119.9, -34], [118, -35], [116.6, -35], [115, -34.3], [115.6, -33.4], [115.7, -31.6], [115, -29.5], [114.6, -28.5], [114, -26.5], [113.4, -25.5], [113.9, -24.5]];
const TAS = [[144.6, -40.7], [148.3, -40.9], [148.3, -42.2], [147, -43.6], [145.2, -42.2]];
function mapInner() {
  const pj = ([lo, la]) => [f1((lo - 112) * 18), f1((-10 - la) * 18)];
  const pth = a => 'M' + a.map(q => pj(q).join(',')).join('L') + 'Z';
  const aus = pth(AUS), tas = pth(TAS), id = uid('m'), bx = f1((129 - 112) * 18);
  let s = cut(P(aus) + P(tas)) + D(aus) + D(tas);
  s += clipG(id, aus, `<rect x="0" y="0" width="800" height="640" fill="url(#hP)"/><rect class="waPaint" x="-10" y="0" width="0" height="640" fill="${YEL}" style="mix-blend-mode:multiply"/><path d="M${bx},0 V640" stroke="${INK}" stroke-width="4" stroke-dasharray="12 8"/>`);
  s += `<path d="${aus}" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  return s;
}

/* ---------------- fondo de papel envejecido ---------------- */
function paperBG() {
  const r = rng(1932); let s = `<defs><radialGradient id="stn"><stop offset="0" stop-color="rgb(150,100,40)" stop-opacity=".2"/><stop offset=".7" stop-color="rgb(150,100,40)" stop-opacity=".08"/><stop offset="1" stop-color="rgb(150,100,40)" stop-opacity="0"/></radialGradient>
  <radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#5a3510" stop-opacity="0"/><stop offset="1" stop-color="#5a3510" stop-opacity=".55"/></radialGradient></defs>`;
  s += `<rect width="1080" height="1920" fill="${PAPER}"/>`;
  for (let k = 0; k < 18; k++) s += `<ellipse cx="${f1(r() * 1080)}" cy="${f1(r() * 1920)}" rx="${f1(60 + r() * 200)}" ry="${f1(40 + r() * 140)}" transform="rotate(${f1(r() * 180)} 540 960)" fill="url(#stn)"/>`;
  let fb = ''; for (let k = 0; k < 500; k++) { const x = r() * 1080, y = r() * 1920; fb += `M${f1(x)},${f1(y)}l${f1(r() * 14 - 7)},${f1(r() * 6 - 3)}`; }
  s += `<path d="${fb}" stroke="rgba(43,33,24,.09)" stroke-width="1.2"/>`;
  let dots = ''; for (let k = 0; k < 300; k++) dots += `M${f1(r() * 1080)},${f1(r() * 1920)}h1.6`; s += `<path d="${dots}" stroke="rgba(43,33,24,.18)" stroke-width="1.6"/>`;
  s += `<rect width="1080" height="1920" fill="url(#vig)"/>`;
  const edge = (depth, seed) => { const q = rng(seed); const pts = []; const st = 24;
    for (let x = 0; x <= 1080; x += st) pts.push([x, depth * (0.3 + q())]);
    for (let y = st; y <= 1920; y += st) pts.push([1080 - depth * (0.3 + q()), y]);
    for (let x = 1080 - st; x >= 0; x -= st) pts.push([x, 1920 - depth * (0.3 + q())]);
    for (let y = 1920 - st; y > 0; y -= st) pts.push([depth * (0.3 + q()), y]);
    return 'M-20,-20H1100V1940H-20Z M' + pts.map(p => f1(p[0]) + ',' + f1(p[1])).join('L') + 'Z'; };
  s += `<path d="${edge(46, 3)}" fill="#7a4a1c" fill-rule="evenodd" opacity=".35"/><path d="${edge(26, 4)}" fill="#3a2210" fill-rule="evenodd" opacity=".85"/>`;
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920">${s}</svg>`;
}
