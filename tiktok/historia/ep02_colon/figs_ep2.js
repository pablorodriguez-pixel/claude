/* Ep. 2 · Colón — figuras nuevas en estilo grabado recortado (viewBox indicado en cada una) */
const CAPE = '#4a3426', TOGA = '#2f2a35', GREEN = '#2f7a3a', SEA = '#cfc2a2';

/* ---------------- BUSTO GENÉRICO DE ÉPOCA  viewBox 0 0 360 460 ----------------
   o: robe cape|toga|greek|robe, hair bob|curly|short, hat colon|biretta|laurel|none, beard, moustache, crossed */
function figBust(o = {}) {
  const id = uid('fb'), r = rng(o.seed || 5), hc = o.hairCol || '#E8DFC9';
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const neck = 'M150,262 L210,262 L216,340 L144,340 Z';
  const upper = 'M118,252 C112,190 130,140 180,138 C230,140 248,190 242,252 Z';
  const jaw = 'M120,246 L240,246 C238,292 212,318 180,318 C148,318 122,292 120,246 Z';
  const hairBack = 'M100,206 C92,128 138,100 180,100 C224,100 270,128 260,206 L266,330 Q246,346 226,330 L222,262 L138,262 L134,330 Q114,346 94,330 Z';
  let s = '';
  let silB = P(torso) + P(neck); if (o.hair === 'bob') silB += P(hairBack);
  s += cut(silB);
  if (o.hair === 'bob') {
    s += D(hairBack, hc) + clipG(id + 'hb', hairBack, `<rect x="80" y="90" width="200" height="260" fill="url(#hB)" opacity=".5"/>`);
    let st = ''; for (let k = 0; k < 6; k++) { st += `M${100 + k * 6},${230 + k * 8} Q${96 + k * 5},290 ${102 + k * 6},326 M${260 - k * 6},${230 + k * 8} Q${264 - k * 5},290 ${258 - k * 6},326 `; }
    s += `<path d="${st}" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".75"/>`;
  }
  const rb = o.robe || 'cape';
  const tc = { cape: CAPE, toga: TOGA, greek: '#F4ECDB', robe: '#6b4a2e' }[rb];
  s += D(torso, tc) + clipG(id + 't', torso, (rb === 'greek' ? '' : `<rect x="0" y="320" width="360" height="150" fill="url(#hW)" opacity=".22"/>`) + `<rect x="238" y="320" width="130" height="150" fill="url(#hA)"/><rect x="20" y="426" width="330" height="40" fill="url(#hB)"/>`);
  if (rb === 'cape') {
    const dub = 'M142,330 L180,460 L218,330 Z';
    s += D(dub, '#C9A86A') + HF(dub, 'hF') + `<circle cx="180" cy="376" r="5" fill="${INK}"/><circle cx="180" cy="404" r="5" fill="${INK}"/><circle cx="180" cy="432" r="5" fill="${INK}"/>`;
    s += `<path d="M138,326 Q180,350 222,326 L226,342 Q180,370 134,342 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
    s += `<path d="M104,350 Q92,410 72,460 M256,350 Q268,410 288,460 M120,340 Q110,400 104,460" stroke="${FIG}" stroke-width="2.4" fill="none" opacity=".55"/>`;
  } else if (rb === 'toga') {
    s += D('M148,330 L126,460 L152,460 L164,334 Z', RED) + D('M212,330 L234,460 L208,460 L196,334 Z', RED);
    s += `<path d="M162,332 L180,368 L198,332 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M174,346 v26 M186,346 v26" stroke="${INK}" stroke-width="2"/>`;
  } else if (rb === 'greek') {
    s += `<path d="M60,392 Q180,446 312,352 M78,372 Q160,420 250,344 M90,430 Q190,470 320,420" stroke="${INK}" stroke-width="2.6" fill="none"/>`;
    const sash = 'M214,332 L300,350 L130,460 L60,460 Z';
    s += D(sash, '#E7A3C4') + HF(sash, 'hA') + `<path d="M232,350 L120,456 M260,356 L150,458" stroke="${INK}" stroke-width="1.8" fill="none"/>`;
  } else {
    s += `<path d="M146,330 L180,372 L214,330" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
  }
  if (o.crossed) {
    const a1 = limb(70, 392, 268, 424, 30, 25), a2 = limb(292, 392, 92, 428, 30, 25);
    s += `<circle cx="270" cy="424" r="21" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(a1, tc) + HF(a1, 'hA') + `<circle cx="90" cy="428" r="21" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(a2, tc) + HF(a2, 'hD');
    s += `<path d="M228,410 q14,8 30,4 M120,414 q-14,8 -30,4" stroke="${INK}" stroke-width="2" fill="none"/>`;
  }
  s += D(neck) + HF('M190,262 L210,262 L216,340 L192,340 Z', 'hF');
  s += `<rect x="128" y="236" width="104" height="56" fill="#160f0a"/><rect x="146" y="248" width="68" height="9" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
  let jg = cut(P(jaw), 3, 5) + D(jaw) + clipG(id + 'j', jaw, `<ellipse cx="236" cy="290" rx="44" ry="52" fill="url(#hA)"/>`) + `<path d="M162,302 q18,8 36,0" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  if (!o.moustache && !o.beard) jg += `<path d="M154,258 q26,12 52,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (o.beard) {
    const bd = 'M116,240 C108,330 144,392 180,396 C216,392 252,330 244,240 L234,250 Q232,300 180,306 Q128,300 126,250 Z';
    jg += cut(P(bd), 3, 5) + D(bd, hc) + clipG(id + 'bd', bd, `<rect x="100" y="230" width="160" height="180" fill="url(#hB)" opacity=".6"/>`);
    let cu = ''; for (let k = 0; k < 26; k++) { const x = 130 + r() * 100, y = 300 + r() * 80; if (((x - 180) / 56) ** 2 + ((y - 320) / 74) ** 2 < 1) cu += `M${f1(x)},${f1(y)}q5,-6 10,0`; }
    jg += `<path d="${cu}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  }
  s += `<g class="jaw">${jg}</g>`;
  // cabeza superior
  let hs = P(upper) + '<circle cx="116" cy="214" r="16"/><circle cx="244" cy="214" r="16"/>', hat = '', hairTop = '';
  if (o.hair === 'bob') { const fr = 'M118,198 C112,148 144,120 180,120 C216,120 248,148 242,198 C226,172 204,160 180,168 C156,160 134,172 118,198 Z'; hs += P(fr); hairTop = D(fr, hc) + clipG(id + 'fr', fr, `<rect x="100" y="110" width="160" height="100" fill="url(#hB)" opacity=".5"/>`) + `<path d="M150,132 Q140,150 134,180 M180,124 V160 M210,132 Q220,150 226,180" stroke="${INK}" stroke-width="1.8" fill="none"/>`; }
  if (o.hair === 'curly') { let cc = '', cs = ''; for (let k = 0; k < 11; k++) { const a = Math.PI * (1.02 + k * 0.096), x = 180 + Math.cos(a) * 66, y = 196 + Math.sin(a) * 70; cs += `<circle cx="${f1(x)}" cy="${f1(y)}" r="17"/>`; cc += `<circle cx="${f1(x)}" cy="${f1(y)}" r="17" fill="${hc}" stroke="${INK}" stroke-width="3"/><path d="M${f1(x - 7)},${f1(y)} q7,-8 14,0" stroke="${INK}" stroke-width="1.8" fill="none"/>`; } hs += cs; hairTop = cc; }
  if (o.hat === 'colon') {
    const crown = 'M106,172 C94,116 136,88 182,88 C228,88 268,116 256,172 Q182,154 106,172 Z', band = 'M104,160 Q182,142 258,160 L260,180 Q182,162 102,180 Z';
    hs += P(crown) + P(band);
    hat = D(crown, '#3a2a1e') + clipG(id + 'hc', crown, `<rect x="90" y="80" width="180" height="100" fill="url(#hD)" opacity=".8"/>`) + D(band, INK) + `<path d="M130,108 Q170,94 214,100" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/>`;
  } else if (o.hat === 'biretta') {
    const cr = 'M112,166 L118,100 Q182,84 246,100 L252,166 Q182,150 112,166 Z';
    hs += P(cr) + '<circle cx="182" cy="82" r="13"/>';
    hat = D(cr, '#2a1f17') + `<path d="M150,94 L144,160 M182,88 V152 M214,94 L220,160" stroke="#6a5a4a" stroke-width="3" fill="none"/><circle cx="182" cy="82" r="13" fill="${o.pom || RED}" stroke="${INK}" stroke-width="3"/>`;
  } else if (o.hat === 'laurel') {
    let lv = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (1.1 + k * 0.1), x = 180 + Math.cos(a) * 70, y = 190 + Math.sin(a) * 60; lv += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="14" ry="7" transform="rotate(${f1(a * 180 / Math.PI + 60)} ${f1(x)} ${f1(y)})" fill="#9aa86a" stroke="${INK}" stroke-width="2.4"/>`; }
    hat = lv;
  }
  let ug = cut(hs) + `<circle cx="116" cy="214" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="244" cy="214" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(upper) + clipG(id + 'u', upper, `<ellipse cx="248" cy="214" rx="42" ry="82" fill="url(#hA)"/>`);
  ug += hairTop;
  ug += `<ellipse cx="156" cy="204" rx="13" ry="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/><ellipse cx="204" cy="204" rx="13" ry="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  ug += `<g class="pup"><circle cx="156" cy="205" r="5.5" fill="${INK}"/><circle cx="204" cy="205" r="5.5" fill="${INK}"/></g>`;
  ug += `<g class="lidC" style="opacity:0"><ellipse cx="156" cy="204" rx="14" ry="11" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><ellipse cx="204" cy="204" rx="14" ry="11" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  ug += `<path class="brow" d="M138,186 q18,-10 36,-2 M186,184 q18,-8 36,2" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  ug += `<path d="M182,200 C178,220 168,230 172,236 C178,240 188,240 194,234" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (o.moustache || o.beard) { const mL = 'M180,238 C166,228 146,228 132,240 C122,248 108,250 98,238 C104,260 128,264 148,256 C162,250 172,252 180,254 Z'; ug += `<path d="${mL}" fill="${o.beard ? hc : INK}" stroke="${INK}" stroke-width="2"/><path d="${mL}" fill="${o.beard ? hc : INK}" stroke="${INK}" stroke-width="2" transform="translate(360,0) scale(-1,1)"/>`; }
  ug += hat;
  s += `<g class="headg">${ug}</g>`;
  return s;
}
const COLON = { robe: 'cape', hair: 'bob', hat: 'colon', hairCol: '#EDE5D2', seed: 41 };
const SAB = [
  { robe: 'toga', hat: 'biretta', moustache: true, crossed: true, seed: 51 },
  { robe: 'toga', hat: 'biretta', beard: true, hairCol: '#d6ccb6', crossed: true, seed: 52, pom: PINK },
  { robe: 'toga', hat: 'biretta', crossed: true, seed: 53 },
];
const ERA = { robe: 'greek', hair: 'curly', hat: 'laurel', beard: true, hairCol: '#E2D8C2', seed: 61 };

/* brazo que señala  viewBox 0 0 330 130  (hombro en 10,70) */
function pointArmInner(col = CAPE) {
  const sl = limb(10, 70, 206, 54, 36, 27), cuff = limb(196, 55, 222, 53, 30, 28);
  const palm = 'M214,30 C240,24 262,34 262,54 C262,76 238,84 216,78 Z', idx = limb(250, 40, 316, 26, 10, 8), th = limb(236, 34, 260, 14, 9, 7);
  let s = cut([sl, cuff, palm, idx, th].map(P).join('') + '<circle cx="316" cy="26" r="8"/>', 5, 7);
  s += D(sl, col) + HF(sl, 'hD') + D(cuff, '#fff') + D(th, FIG) + D(palm, FIG) + HF('M240,50 C250,60 252,72 238,80 L222,78 Z', 'hA') + D(idx, FIG) + `<circle cx="316" cy="26" r="8" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="M246,58 q10,4 14,12 M244,68 q8,4 12,10" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  return s;
}

/* ---------------- CARABELA  viewBox 0 0 540 560 (proa a la derecha) ---------------- */
function shipInner(o = {}) {
  const id = uid('sh');
  const hull = 'M26,372 L496,350 Q474,424 432,462 Q262,494 92,466 Q50,432 26,372 Z';
  const stern = 'M20,298 L156,302 L156,376 L26,378 Z', fore = 'M404,318 L500,310 L496,354 L404,362 Z';
  const mainS = 'M188,96 Q270,76 352,96 Q366,190 352,274 Q270,292 188,274 Q174,190 188,96 Z';
  const foreS = 'M370,156 Q422,144 474,156 Q482,212 474,262 Q422,274 370,262 Q362,212 370,156 Z';
  const miz = 'M112,126 L58,292 L172,282 Z';
  const top = 'M380,88 Q422,80 464,88 Q468,118 464,140 Q422,148 380,140 Q376,118 380,88 Z';
  let s = '';
  // jarcia
  s += `<path d="M270,40 L30,300 M270,40 L500,312 M422,70 L520,300 M112,110 L26,300 M270,40 L156,300" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += `<path d="M498,340 L560,286" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
  // mástiles
  s += `<path d="M270,30 V372 M422,60 V352 M112,104 V312" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M270,30 V372 M422,60 V352 M112,104 V312" stroke="${WOOD}" stroke-width="4" stroke-linecap="round"/>`;
  s += `<path d="M180,94 H360 M180,276 H360 M364,154 H480 M374,86 H470" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  const cross = (cx, cy, k) => `<path d="M${cx - 8 * k},${cy - 34 * k} h${16 * k} v${26 * k} h${26 * k} v${16 * k} h${-26 * k} v${38 * k} h${-16 * k} v${-38 * k} h${-26 * k} v${-16 * k} h${26 * k} Z" fill="${RED}" stroke="${INK}" stroke-width="2.5"/>`;
  let sails = cut(P(mainS) + P(foreS) + P(miz) + P(top), 5, 7);
  sails += D(mainS, '#FBF4E2') + clipG(id + 'ms', mainS, `<rect x="300" y="80" width="80" height="220" fill="url(#hA)" opacity=".6"/>`) + `<path d="M200,140 Q270,128 344,140 M198,200 Q270,190 346,200" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".5"/>` + cross(270, 190, 1.2);
  sails += D(foreS, '#FBF4E2') + clipG(id + 'fs', foreS, `<rect x="440" y="140" width="50" height="140" fill="url(#hA)" opacity=".6"/>`) + cross(422, 212, 0.75);
  sails += D(top, '#FBF4E2') + D(miz, '#FBF4E2') + clipG(id + 'mz', miz, `<rect x="40" y="200" width="140" height="100" fill="url(#hA)" opacity=".6"/>`);
  s += `<g class="sails">${sails}</g>`;
  s += `<g class="flag"><path d="M270,30 L338,40 L322,50 L338,60 L270,62 Z" fill="${PINK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;
  s += `<rect x="408" y="44" width="28" height="18" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  // casco
  s += cut(P(hull) + P(stern) + P(fore), 7, 9);
  s += D(stern, WOOD) + HF(stern, 'hB') + `<rect x="40" y="318" width="22" height="20" fill="${INK}"/><rect x="76" y="318" width="22" height="20" fill="${INK}"/><rect x="112" y="318" width="22" height="20" fill="${INK}"/><path d="M20,300 H158" stroke="${INK}" stroke-width="6"/>`;
  s += D(fore, WOOD) + HF(fore, 'hB') + `<path d="M404,316 H500" stroke="${INK}" stroke-width="6"/>`;
  s += `<g class="deck"></g>`;
  s += D(hull, '#9a6a3c') + clipG(id + 'h', hull, `<rect x="0" y="410" width="540" height="100" fill="url(#hD)"/><rect x="380" y="340" width="160" height="140" fill="url(#hA)"/>`);
  s += `<path d="M34,392 Q260,388 488,368 M44,414 Q262,414 470,396 M62,436 Q262,442 448,422" stroke="${INK}" stroke-width="2.6" fill="none"/>`;
  s += `<path d="M150,384 v12 M220,382 v12 M290,380 v12 M360,376 v12" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
  return s;
}

/* ---------------- GLOBO TERRÁQUEO  viewBox 0 0 320 400 (esfera c=160,160 r=130) ---------------- */
function globeInner() {
  const id = uid('gl');
  const blobs = (ox) => {
    const r = rng(9); let s = '';
    const C = [[40, 110, 48, 40], [70, 200, 30, 50], [150, 90, 40, 30], [170, 160, 26, 44], [220, 130, 50, 36], [240, 220, 26, 22]];
    C.forEach(c => { const pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, rr = 0.75 + r() * 0.45; pts.push([ox + c[0] + Math.cos(a) * c[2] * rr, c[1] + Math.sin(a) * c[3] * rr]); } const d = smooth(pts); s += `<path d="${d}" fill="#c9b27c" stroke="${INK}" stroke-width="2.6"/><path d="${d}" fill="url(#hA)" opacity=".6"/>`; });
    return s;
  };
  let grid = ''; [-90, -50, 0, 50, 90].forEach(dy => grid += `<ellipse cx="160" cy="${160 + dy}" rx="${f1(Math.sqrt(130 * 130 - dy * dy))}" ry="${f1(Math.sqrt(130 * 130 - dy * dy) * 0.12)}" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".55"/>`);
  [30, 75, 115].forEach(rx => grid += `<ellipse cx="160" cy="160" rx="${rx}" ry="130" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".55"/>`);
  grid += `<path d="M160,30 V290" stroke="${INK}" stroke-width="1.6" opacity=".55"/>`;
  let s = cut('<circle cx="160" cy="160" r="130"/><path d="M110,336 L210,336 L230,392 L90,392 Z"/>');
  s += `<path d="M150,290 L170,290 L176,340 L144,340 Z" fill="${WOOD}" stroke="${INK}" stroke-width="3"/><path d="M110,336 L210,336 L230,392 L90,392 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M110,336 L210,336 L230,392 L90,392 Z" fill="url(#hB)" opacity=".6"/>`;
  s += `<circle cx="160" cy="160" r="130" fill="#EFE3C4" stroke="${INK}" stroke-width="4"/>`;
  s += clipG(id + 'c', 'M30,160 a130,130 0 1,0 260,0 a130,130 0 1,0 -260,0', `<g class="cont">${blobs(0)}${blobs(280)}${blobs(-280)}</g>${grid}<circle cx="215" cy="200" r="150" fill="url(#hA)" opacity=".0"/><path d="M290,160 A130,130 0 0,1 160,290 A160,160 0 0,0 290,160 Z" fill="url(#hD)"/><ellipse cx="200" cy="200" rx="130" ry="130" fill="none" stroke="url(#hA)" stroke-width="60" opacity=".45"/>`);
  s += `<circle cx="160" cy="160" r="130" fill="none" stroke="${INK}" stroke-width="4"/><ellipse cx="112" cy="100" rx="34" ry="22" fill="#fff" opacity=".35" transform="rotate(-30 112 100)"/>`;
  s += `<path d="M160,18 A142,142 0 0,1 160,302" stroke="${INK}" stroke-width="15" fill="none"/><path d="M160,18 A142,142 0 0,1 160,302" stroke="${BRASS}" stroke-width="9" fill="none"/><circle cx="160" cy="18" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  return s;
}

/* ---------------- BARRIL  viewBox 0 0 100 120 ---------------- */
function barrelInner() {
  const b = 'M20,10 Q4,60 20,112 L80,112 Q96,60 80,10 Z';
  return cut(P(b), 4, 6) + D(b, WOOD, 4) + HF('M60,10 L80,10 Q96,60 80,112 L60,112 Z', 'hA') + `<path d="M36,12 Q30,60 36,110 M50,12 V110 M64,12 Q70,60 64,110" stroke="${INK}" stroke-width="2" fill="none"/><path d="M14,34 Q50,40 86,34 M14,86 Q50,92 86,86" stroke="${INK}" stroke-width="7" fill="none"/><ellipse cx="50" cy="11" rx="30" ry="6" fill="#c9a06a" stroke="${INK}" stroke-width="3"/>`;
}

/* ---------------- AMÉRICA + SALVAVIDAS  viewBox 0 0 340 520 ---------------- */
const AM_N = 'M70,50 Q130,14 200,34 Q252,52 262,94 Q244,126 212,134 Q200,176 168,198 Q148,222 158,248 Q138,258 126,236 Q104,204 86,176 Q54,134 44,96 Q42,66 70,50 Z';
const AM_S = 'M180,276 Q230,268 262,296 Q284,330 262,370 Q240,412 214,470 Q202,436 196,392 Q176,340 174,308 Q172,288 180,276 Z';
const AM_I = 'M152,240 Q168,256 186,280 L178,288 Q160,266 146,248 Z';
function americaInner(ring = true) {
  let s = '';
  if (ring) {
    s += `<circle cx="170" cy="260" r="218" fill="none" stroke="${SH}" stroke-width="56" transform="translate(8,10)"/><circle cx="170" cy="260" r="218" fill="none" stroke="${INK}" stroke-width="58"/><circle cx="170" cy="260" r="218" fill="none" stroke="#fff" stroke-width="48"/>`;
    s += `<circle cx="170" cy="260" r="218" fill="none" stroke="${RED}" stroke-width="48" stroke-dasharray="171 171"/><circle cx="170" cy="260" r="218" fill="none" stroke="url(#hA)" stroke-width="48" opacity=".35"/>`;
    s += `<circle cx="170" cy="260" r="218" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="6 10" transform="translate(0,0)"/>`;
  }
  s += cut(P(AM_N) + P(AM_S) + P(AM_I));
  [AM_N, AM_S, AM_I].forEach((d, i) => { s += D(d, '#c9b27c', 4) + clipG(uid('am'), d, `<rect x="140" y="0" width="200" height="520" fill="url(#hA)" opacity=".7"/><rect x="0" y="0" width="340" height="520" fill="url(#hP)"/>`); });
  s += `<path d="M90,100 q20,-10 40,6 M120,150 q16,-6 30,4 M210,330 q12,-4 20,8" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  return s;
}

/* ---------------- LIBRO DE IRVING  viewBox 0 0 520 700 ---------------- */
function irvingBookInner() {
  const id = uid('ib');
  let s = cut('<rect x="10" y="10" width="500" height="680" rx="16"/>', 10, 12);
  s += `<rect x="10" y="10" width="500" height="680" rx="16" fill="${LEATHER}" stroke="${INK}" stroke-width="6"/><rect x="10" y="10" width="500" height="680" rx="16" fill="url(#hW)" opacity=".18"/>`;
  s += `<rect x="10" y="10" width="44" height="680" fill="#2e1a0e" stroke="${INK}" stroke-width="4"/><path d="M14,90 H52 M14,610 H52" stroke="#e9c75c" stroke-width="5"/>`;
  s += `<rect x="78" y="34" width="408" height="632" rx="8" fill="none" stroke="#e9c75c" stroke-width="5"/><rect x="92" y="48" width="380" height="604" rx="4" fill="none" stroke="#e9c75c" stroke-width="2"/>`;
  s += `<text x="282" y="118" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="50" fill="#e9c75c" letter-spacing="2">BIOGRAFÍA</text><text x="282" y="166" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="42" fill="#e9c75c">de Colón</text>`;
  // ilustración heroica exagerada
  const ov = 'M282,196 m-170,0 a170,150 0 1,0 340,0 a170,150 0 1,0 -340,0';
  const ovC = 'M112,346 a170,150 0 1,0 340,0 a170,150 0 1,0 -340,0';
  let ill = `<rect x="100" y="190" width="370" height="320" fill="#F7EBC8"/>`;
  let ry = ''; for (let i = 0; i < 18; i++) { const a0 = i / 18 * 6.283, a1 = (i + 0.5) / 18 * 6.283; ry += `<path d="M282,330 L${f1(282 + 400 * Math.cos(a0))},${f1(330 + 400 * Math.sin(a0))} L${f1(282 + 400 * Math.cos(a1))},${f1(330 + 400 * Math.sin(a1))} Z" fill="${YEL}" opacity=".85"/>`; }
  ill += `<g class="rays">${ry}</g><rect x="100" y="190" width="370" height="320" fill="url(#hP)"/>`;
  ill += `<use href="#colS" x="190" y="214" width="184" height="235"/>`;
  // multitud con antorchas
  let mob = '';
  [[128, 470, 1], [176, 486, -1], [392, 486, 1], [440, 470, -1], [150, 500, 1], [418, 500, -1]].forEach(([x, y, d], i) => {
    mob += `<g class="torch" data-i="${i}"><path d="M${x + d * 22},${y - 10} L${x + d * 34},${y - 78}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${x + d * 34},${y - 76} q-14,-20 0,-44 q14,24 0,44 Z" fill="${RED}" stroke="${INK}" stroke-width="2.4"/><path d="M${x + d * 34},${y - 80} q-6,-10 0,-22 q6,12 0,22 Z" fill="${YEL}"/></g>`;
    mob += `<circle cx="${x}" cy="${y - 16}" r="22" fill="${INK}"/><path d="M${x - 32},${y + 40} Q${x - 30},${y + 4} ${x},${y + 2} Q${x + 30},${y + 4} ${x + 32},${y + 40} Z" fill="${INK}"/>`;
  });
  ill += mob;
  s += clipG(id + 'o', ovC, ill);
  s += `<path d="${ovC}" fill="none" stroke="#e9c75c" stroke-width="8"/><path d="${ovC}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<path d="M150,530 H414" stroke="#e9c75c" stroke-width="3"/><text x="282" y="650" text-anchor="middle" font-family="Rye" font-size="46" fill="#e9c75c">1828</text>`;
  return s;
}

/* ---------------- MEDALLA «VALOR»  viewBox 0 0 160 260 ---------------- */
function medalInner() {
  let s = cut('<path d="M40,0 L120,0 L104,130 L56,130 Z"/><circle cx="80" cy="180" r="64"/>', 5, 7);
  s += `<path d="M40,0 L120,0 L104,130 L56,130 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M66,0 L72,130 M94,0 L88,130" stroke="${YEL}" stroke-width="9"/><path d="M40,0 L120,0 L104,130 L56,130 Z" fill="none" stroke="${INK}" stroke-width="4"/>`;
  s += `<circle cx="80" cy="180" r="64" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="80" cy="180" r="50" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 5"/><circle cx="80" cy="180" r="64" fill="url(#hA)" opacity=".25"/>`;
  s += `<path d="M80,136 l7,15 16,2 -12,11 3,16 -14,-8 -14,8 3,-16 -12,-11 16,-2 Z" fill="${INK}"/><text x="80" y="212" text-anchor="middle" font-family="Rye" font-size="26" fill="${INK}">VALOR</text>`;
  return s;
}

/* ---------------- TRÉBOL y DADOS (siluetas) ---------------- */
function cloverSvg(col = INK) { const lf = (r) => `<path d="M0,0 C-10,-30 -46,-36 -46,-62 C-46,-84 -20,-92 0,-70 C20,-92 46,-84 46,-62 C46,-36 10,-30 0,0 Z" fill="${col}" transform="rotate(${r})"/>`; return `<svg viewBox="-110 -110 220 300" width="100%" height="100%" style="overflow:visible"><path d="M0,0 Q20,90 -10,180" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round"/>${lf(0)}${lf(90)}${lf(180)}${lf(270)}</svg>`; }
function diceSvg(n, col = INK, pip = YEL) { const P6 = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[26, 26], [50, 50], [74, 74]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]], 6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]] }[n]; return `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><rect x="4" y="4" width="92" height="92" rx="18" fill="${col}"/>${P6.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="9" fill="${pip}"/>`).join('')}</svg>`; }

/* ---------------- DIANA  viewBox 0 0 300 300 ---------------- */
function targetInner() {
  let s = cut('<circle cx="150" cy="150" r="140"/>', 6, 8);
  [[140, RED], [112, '#fff'], [84, RED], [56, '#fff'], [28, RED]].forEach(([r, c]) => s += `<circle cx="150" cy="150" r="${r}" fill="${c}" stroke="${INK}" stroke-width="4"/>`);
  s += `<circle cx="150" cy="150" r="140" fill="url(#hA)" opacity=".2"/>`;
  return s;
}
