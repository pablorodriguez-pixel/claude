/* Ep.1 Cleopatra — figuras nuevas en estilo grabado recortado (usa helpers de kit/figs_v1.js) */
const NILE = '#E3D2AE', LINEN = '#EFE4CC', WIG = '#231a13';

/* ---------------- CLEOPATRA (busto de perfil, mira a la derecha) viewBox 0 0 400 500 ---------------- */
function cleoInner(o = {}) {
  const id = uid('cl'), r = rng(o.seed || 30);
  const torso = 'M30,500 C40,430 100,392 180,384 L260,384 C330,392 380,430 390,500 Z';
  const neck = 'M200,292 L254,292 L262,392 L186,392 Z';
  const face = 'M206,140 C238,120 280,124 292,152 C298,168 300,184 304,198 C312,212 322,226 328,238 C322,246 314,248 306,247 C312,252 314,258 310,262 L303,265 C311,270 312,277 306,282 C303,290 298,296 290,300 C272,310 240,312 216,300 C204,260 200,180 206,140 Z';
  const wig = 'M142,152 C136,96 192,62 250,68 C292,72 310,104 302,140 C300,150 296,156 290,158 L248,160 C236,192 232,232 238,262 C242,292 252,318 262,350 L146,356 C128,300 132,204 142,152 Z';
  const collar = 'M66,394 A154,98 0 0,0 374,394 L292,394 A72,42 0 0,1 148,394 Z';
  const band = 'M146,140 Q222,110 298,130 L300,146 Q224,126 150,158 Z';
  const hood = 'M290,134 C280,112 286,88 300,80 C314,88 318,112 308,134 Z';
  let s = cut(P(torso) + P(neck) + P(face) + P(wig) + P(collar) + P(band) + P(hood) + '<circle cx="300" cy="74" r="10"/>');
  // vestido de lino
  s += D(torso, LINEN) + clipG(id + 't', torso, `<rect x="250" y="380" width="160" height="130" fill="url(#hA)"/><path d="M120,500 Q150,440 170,400 M170,500 Q190,450 200,404 M300,500 Q280,440 262,404" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/>`);
  // cuello
  s += D(neck) + clipG(id + 'n', neck, `<rect x="180" y="290" width="40" height="110" fill="url(#hF)"/>`);
  // collar usej
  s += D(collar, BRASS) + clipG(id + 'c', collar, `<rect x="250" y="380" width="160" height="120" fill="url(#hD)" opacity=".55"/>`);
  s += `<path d="M90,394 A130,82 0 0,0 350,394" stroke="${INK}" stroke-width="3" fill="none"/><path d="M114,394 A106,66 0 0,0 326,394" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<path d="M102,394 A118,74 0 0,0 338,394" stroke="${PINK}" stroke-width="9" fill="none" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  let beads = ''; for (let k = 0; k <= 16; k++) { const a = Math.PI * k / 16; beads += `<circle cx="${f1(220 - Math.cos(a) * 154)}" cy="${f1(394 + Math.sin(a) * 98)}" r="6" fill="${RED}" stroke="${INK}" stroke-width="2"/>`; }
  s += beads;
  // cara
  s += D(face) + clipG(id + 'f', face, `<ellipse cx="238" cy="230" rx="16" ry="64" fill="url(#hA)"/>`);
  s += `<ellipse cx="280" cy="228" rx="16" ry="10" fill="${ROUGE}"/>`;
  s += `<path d="M314,236 q-7,3 -10,-4" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M305,247 Q315,253 309,262 L301,264 Q312,270 306,279 Q297,273 299,265 Q294,256 305,247 Z" fill="${LIP}" stroke="${INK}" stroke-width="2"/>`;
  // ojo egipcio
  s += `<path d="M268,186 Q283,174 298,183 Q285,194 268,186 Z" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  s += `<g class="pup"><circle cx="287" cy="184" r="5.5" fill="${INK}"/><circle cx="285.5" cy="182.5" r="1.6" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><path d="M266,186 Q283,172 300,183 Q285,192 266,186 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M268,187 Q284,193 298,184" stroke="${INK}" stroke-width="3" fill="none"/></g>`;
  s += `<g class="lidH" style="opacity:0"><path d="M266,185 Q283,172 300,182 L298,184 Q283,180 268,186 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/></g>`;
  s += `<path d="M268,186 L246,190 M298,183 L304,178" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path class="brow" d="M262,168 Q282,156 302,165" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  // peluca a rayas
  s += D(wig, WIG) + clipG(id + 'w', wig, (() => { let l = ''; for (let x = 132; x < 310; x += 11) l += `M${x},150 Q${x + 4},250 ${x - 2},360`; let h = ''; for (let y = 175; y < 360; y += 34) h += `M120,${y} Q200,${y + 8} 260,${y}`; return `<path d="${l}" stroke="${FIG}" stroke-width="2.2" opacity=".42" fill="none"/><path d="${h}" stroke="${BRASS}" stroke-width="3" opacity=".55" fill="none"/>`; })());
  let tips = ''; for (let x = 152; x < 262; x += 12) tips += `<rect x="${x - 4}" y="${350 - (x - 152) * 0.06}" width="9" height="13" rx="2" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`;
  s += tips;
  // pendiente
  s += `<path d="M240,300 v14" stroke="${INK}" stroke-width="3"/><circle cx="240" cy="328" r="13" fill="none" stroke="${BRASS}" stroke-width="6"/><circle cx="240" cy="328" r="13" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  // diadema + cobra (ureo)
  s += D(band, BRASS) + `<path d="M150,150 Q224,120 299,138" stroke="${INK}" stroke-width="1.6" fill="none" stroke-dasharray="4 5"/>`;
  s += `<g class="cobra">${D(hood, BRASS)}${clipG(id + 'h', hood, `<rect x="300" y="76" width="22" height="60" fill="url(#hD)"/>`)}<path d="M299,94 v34 M294,104 q5,4 10,0 M294,116 q5,4 10,0" stroke="${INK}" stroke-width="1.8" fill="none"/><circle cx="300" cy="74" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="304" cy="72" r="2.4" fill="${INK}"/><path d="M309,78 l7,2 -7,1" stroke="${RED}" stroke-width="2" fill="none"/></g>`;
  // corona griega (laurel) — oculta por defecto
  let lv = ''; for (let k = 0; k < 13; k++) { const u = k / 12, x = 142 + u * 156, y = 160 - Math.sin(u * Math.PI) * 40 - u * 14; const rot = -60 + u * 120; lv += `<ellipse cx="${f1(x)}" cy="${f1(y - 8)}" rx="9" ry="18" transform="rotate(${f1(rot - 30)} ${f1(x)} ${f1(y - 8)})" fill="${YEL}" stroke="${INK}" stroke-width="2.4"/><ellipse cx="${f1(x)}" cy="${f1(y + 8)}" rx="9" ry="18" transform="rotate(${f1(rot + 30)} ${f1(x)} ${f1(y + 8)})" fill="${BRASS}" stroke="${INK}" stroke-width="2.4"/>`; }
  s += `<g class="crownG" style="opacity:0"><path d="M142,160 Q220,108 298,132" stroke="${INK}" stroke-width="5" fill="none"/>${lv}<path d="M146,166 q-26,24 -18,60 M152,168 q-14,30 0,58" stroke="${PINK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  // lupa (oculta por defecto)
  s += `<g class="lupa" style="opacity:0"><path d="M392,230 L430,330" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M392,230 L430,330" stroke="${WOOD}" stroke-width="15" stroke-linecap="round"/>${gloveHand(426, 320, 200, 0.75)}<circle cx="364" cy="184" r="52" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="18"/><circle cx="364" cy="184" r="52" fill="none" stroke="${BRASS}" stroke-width="10"/><path d="M336,160 q14,-18 36,-16" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  return s;
}

/* ---------------- iPHONE (2007) viewBox 0 0 160 320 ---------------- */
function iphoneInner() {
  const id = uid('ip');
  const body = 'M36,4 L124,4 Q154,4 154,34 L154,286 Q154,316 124,316 L36,316 Q6,316 6,286 L6,34 Q6,4 36,4 Z';
  let s = cut(P(body), 7, 9) + `<path d="${body}" fill="#bfb6a6" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M36,10 L124,10 Q148,10 148,34 L148,286 Q148,310 124,310 L36,310 Q12,310 12,286 L12,34 Q12,10 36,10 Z" fill="#241c16" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="60" y="28" width="40" height="7" rx="3.5" fill="#6b5a4a"/>`;
  s += `<rect x="22" y="52" width="116" height="210" rx="3" fill="#F7F0E0" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<rect x="22" y="52" width="116" height="12" fill="${INK}"/><rect x="118" y="55" width="14" height="6" rx="1" fill="${FIG}"/>`;
  const cols = [YEL, PINK, RED, BRASS, '#9fc7b4', FIG, '#E7A3C4', '#cfc3a8'];
  let ap = ''; let n = 0;
  for (let rI = 0; rI < 4; rI++) for (let c = 0; c < 4; c++) { const x = 30 + c * 27, y = 74 + rI * 34, col = cols[(n++ * 3) % cols.length]; ap += `<rect x="${x}" y="${y}" width="20" height="20" rx="5" fill="${col}" stroke="${INK}" stroke-width="2"/>`; if ((rI + c) % 3 === 0) ap += `<rect x="${x}" y="${y}" width="20" height="20" rx="5" fill="url(#hA)" opacity=".7"/>`; }
  ap += `<rect x="24" y="218" width="112" height="40" fill="#d9cfb8" stroke="${INK}" stroke-width="1.5"/>`;
  for (let c = 0; c < 4; c++) ap += `<rect x="${30 + c * 27}" y="228" width="20" height="20" rx="5" fill="${[RED, YEL, PINK, BRASS][c]}" stroke="${INK}" stroke-width="2"/>`;
  s += ap;
  s += clipG(id + 'g', 'M22,52 H138 V262 H22 Z', `<path d="M22,52 L138,52 L22,190 Z" fill="#fff" opacity=".28"/><rect x="22" y="52" width="116" height="210" fill="url(#hP)" opacity=".5"/>`);
  s += `<circle cx="80" cy="287" r="14" fill="#1a1410" stroke="#6b5a4a" stroke-width="3"/><rect x="74" y="281" width="12" height="12" rx="3" fill="none" stroke="#8a7a68" stroke-width="2"/>`;
  s += `<path d="M14,40 Q14,14 40,12" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/>`;
  s += `<g class="flashG" style="opacity:0"><circle cx="80" cy="160" r="90" fill="#fff" opacity=".85"/></g>`;
  return s;
}

/* ---------------- PIRÁMIDE viewBox 0 0 400 260 ---------------- */
function pyramidInner(o = {}) {
  const id = uid('py'), b = o.built == null ? 1 : o.built;
  const whole = 'M200,8 L400,250 L0,250 Z', left = 'M200,8 L250,250 L0,250 Z', right = 'M200,8 L400,250 L250,250 Z';
  const cy = 250 - 242 * b; // altura construida
  let lines = ''; for (let y = 20; y < 250; y += 13) lines += `M0,${y} H400`;
  const r = rng(o.seed || 9); let joints = ''; for (let y = 20; y < 250; y += 13) for (let k = 0; k < 6; k++) { const x = r() * 400; joints += `M${f1(x)},${y} v13`; }
  let inner = D(left, FIG, 0) + D(right, '#d8c7a4', 0) + clipG(id + 'r', right, `<rect x="180" y="0" width="230" height="260" fill="url(#hD)"/>`) + clipG(id + 'l', left, `<rect x="0" y="120" width="260" height="140" fill="url(#hA)" opacity=".55"/>`);
  inner += clipG(id + 'w', whole, `<path d="${lines}" stroke="${INK}" stroke-width="1.6" opacity=".65"/><path d="${joints}" stroke="${INK}" stroke-width="1.4" opacity=".5"/>`);
  inner += `<path d="${whole}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M200,8 L250,250" stroke="${INK}" stroke-width="3"/>`;
  let s = '';
  const sand = 'M-60,250 Q200,232 460,252 L460,268 L-60,268 Z';
  if (b < 1) {
    const hw = (cy - 8) / 242 * 200, xl = 200 - hw, xr = 200 + hw;
    const trap = `M${f1(xl)},${f1(cy)} L${f1(xr)},${f1(cy)} L400,250 L0,250 Z`;
    s += cut(P(trap)) + clipG(id + 'cc', trap, inner) + `<path d="M${f1(xl)},${f1(cy)} H${f1(xr)}" stroke="${INK}" stroke-width="4.5"/>`;
    const ramp = `M-50,250 L${f1(xl + 10)},${f1(cy)} L${f1(xl + 56)},${f1(cy)} L36,250 Z`;
    s += D(ramp, NILE, 3.5) + HF(ramp, 'hB');
    const sc = `M${f1(xr - 24)},${f1(cy)} v-56 M${f1(xr - 70)},${f1(cy)} v-56 M${f1(xr - 84)},${f1(cy - 44)} h76 M${f1(xr - 84)},${f1(cy - 20)} h76`;
    s += `<path d="${sc}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="${sc}" stroke="${WOOD}" stroke-width="5" stroke-linecap="round"/>`;
    for (let k = 0; k < 3; k++) { const u = 0.22 + k * 0.27, x = -50 + (xl + 33 + 50) * u - 6, y = 250 - (250 - cy) * u - 18; s += `<g class="blk"><rect x="${f1(x)}" y="${f1(y)}" width="30" height="18" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><rect x="${f1(x)}" y="${f1(y)}" width="30" height="18" fill="url(#hA)"/></g>`; }
  } else {
    s += cut(P(whole)) + inner;
  }
  s = D(sand, NILE, 3) + `<path d="${sand}" fill="url(#hP)"/>` + s;
  return s;
}

/* ---------------- MAMUT (mira a la derecha) viewBox 0 0 520 440 ---------------- */
function mammothInner(o = {}) {
  const id = uid('mm'), r = rng(o.seed || 44), FUR = '#C9AE86';
  const body = 'M84,170 C80,96 160,52 262,58 C340,62 382,96 392,150 C400,206 388,252 366,276 L118,282 C92,256 86,214 84,170 Z';
  const head = 'M332,96 C342,40 420,30 448,82 C462,112 456,162 440,186 L366,198 C342,170 326,134 332,96 Z';
  const ear = 'M352,112 C330,112 322,146 342,166 C356,156 362,130 352,112 Z';
  const tail = 'M90,160 C70,170 60,196 64,220 L72,220 C72,198 80,180 96,172 Z';
  const leg = (x, y) => `M${x - 26},${y} L${x + 26},${y} L${x + 24},${y + 132} Q${x},${y + 142} ${x - 24},${y + 132} Z`;
  const legs = [[140, 250, 'lgA'], [204, 256, 'lgB'], [304, 256, 'lgC'], [356, 248, 'lgD']];
  const trunk = 'M418,176 C438,226 446,290 426,350 C420,368 398,368 400,350 C414,296 408,238 388,196 Z';
  const tusk = 'M392,196 C416,262 474,276 498,232 C490,262 438,270 404,206 Z';
  let s = '';
  // patas traseras (más oscuras) detrás
  legs.forEach((L, i) => { const d = leg(L[0], L[1]); s += `<g class="${L[2]}">${cut(P(d), 5, 7)}${D(d, i % 2 ? '#b89c74' : FUR)}${clipG(id + 'lg' + i, d, `<rect x="${L[0]}" y="${L[1]}" width="30" height="150" fill="url(#hD)"/>`)}<path d="M${L[0] - 18},${L[1] + 128} q6,-6 12,0 M${L[0] - 2},${L[1] + 130} q6,-6 12,0" stroke="${INK}" stroke-width="2" fill="none"/></g>`; });
  s += cut(P(body) + P(head) + P(tail)) + D(tail, FUR) + D(body, FUR);
  s += clipG(id + 'b', body, `<ellipse cx="250" cy="270" rx="190" ry="70" fill="url(#hA)"/><ellipse cx="300" cy="290" rx="120" ry="40" fill="url(#hD)"/>`);
  let fur = ''; for (let k = 0; k < 230; k++) { const x = 92 + r() * 296, y = 70 + r() * 200; const inB = ((x - 238) / 154) ** 2 + ((y - 168) / 110) ** 2 < 1; if (!inB) continue; const len = 14 + r() * 18 + (y - 70) * 0.08; fur += `M${f1(x)},${f1(y)}q${f1(r() * 4 - 2)},${f1(len * .6)} ${f1(r() * 6 - 3)},${f1(len)}`; }
  s += `<path d="${fur}" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  let fringe = 'M118,276'; for (let x = 118; x < 366; x += 12) fringe += ` l6,${f1(16 + r() * 12)} l6,${f1(-16 - r() * 12)}`;
  s += `<path d="${fringe}" stroke="${INK}" stroke-width="2.5" fill="${FUR}"/>`;
  s += D(head, FUR) + clipG(id + 'h', head, `<ellipse cx="350" cy="160" rx="40" ry="60" fill="url(#hA)"/>`);
  let hf = ''; for (let k = 0; k < 40; k++) { const x = 346 + r() * 90, y = 40 + r() * 40; hf += `M${f1(x)},${f1(y)}q2,-8 ${f1(r() * 8 - 4)},-16`; }
  s += `<path d="${hf}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  s += D(ear, '#b89c74') + `<path d="M346,124 q-10,16 -2,32" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  // ojo
  s += `<circle cx="404" cy="112" r="11" fill="#fff" stroke="${INK}" stroke-width="2.6"/><g class="pup"><circle cx="407" cy="113" r="5.5" fill="${INK}"/><circle cx="405" cy="111" r="1.6" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><circle cx="404" cy="112" r="12" fill="${FUR}" stroke="${INK}" stroke-width="2.6"/><path d="M393,114 q11,6 22,0" stroke="${INK}" stroke-width="2.6" fill="none"/></g>`;
  s += `<path class="brow" d="M392,94 q12,-8 26,-2" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  // trompa (pivote 400,190)
  let tr = ''; for (let y = 210; y < 350; y += 12) tr += `M${f1(394 + (y - 196) * 0.18)},${y} q12,4 24,0`;
  s += `<g class="trunk">${cut(P(trunk), 4, 6)}${D(trunk, FUR)}<path d="${tr}" stroke="${INK}" stroke-width="1.8" fill="none"/>${clipG(id + 'tk', trunk, `<rect x="414" y="180" width="40" height="190" fill="url(#hA)"/>`)}</g>`;
  s += `<g class="tusk">${cut(P(tusk), 4, 6)}${D(tusk, '#FBF6EA')}<path d="M404,212 C430,256 466,262 488,240" stroke="${INK}" stroke-width="1.5" fill="none"/></g>`;
  return s;
}

/* ---------------- TURISTA moderno (busto) viewBox 0 0 360 460 ---------------- */
function touristInner() {
  let s = bustInner({ uniform: 'soldier', seed: 41 });
  const coat = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const id = uid('tu'); let fl = ''; const r = rng(4);
  for (let k = 0; k < 16; k++) { const x = 40 + r() * 290, y = 350 + r() * 100; fl += `<g transform="translate(${f1(x)},${f1(y)})">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-8" rx="5" ry="9" transform="rotate(${a})" fill="${PINK}" stroke="${INK}" stroke-width="1.5"/>`).join('')}<circle r="4" fill="#fff" stroke="${INK}" stroke-width="1.5"/></g>`; }
  s += `<path d="${coat}" fill="#7cc3a8" stroke="${INK}" stroke-width="3"/>` + clipG(id + 'c', coat, fl + `<rect x="240" y="320" width="120" height="150" fill="url(#hA)"/>`);
  s += `<path d="M146,330 L180,392 L214,330 L196,330 L180,360 L164,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  // gafas de sol
  s += `<g><rect x="134" y="190" width="44" height="30" rx="10" fill="${INK}"/><rect x="182" y="190" width="44" height="30" rx="10" fill="${INK}"/><path d="M176,198 h8 M134,198 l-16,-6 M226,198 l16,-6" stroke="${INK}" stroke-width="4"/><path d="M142,196 l12,0 M190,196 l12,0" stroke="#fff" stroke-width="3" opacity=".6"/></g>`;
  // gorro de pescador
  const crown = 'M120,154 C118,100 242,100 240,154 Z', brim = 'M86,156 Q180,128 274,156 Q180,192 86,156 Z';
  s += cut(P(crown) + P(brim)) + D(crown, '#F2E6CC') + HF(crown, 'hA') + `<path d="M120,140 Q180,128 240,140 L240,152 Q180,140 120,152 Z" fill="${PINK}" stroke="${INK}" stroke-width="2.5"/>` + D(brim, '#F2E6CC') + HF(brim, 'hB');
  // sonrisa grande
  s += `<path d="M156,262 Q180,284 204,262 Q180,274 156,262 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  return s;
}

/* ---------------- MONEDA ptolemaica genérica (perfil) viewBox -70 -70 140 140 ---------------- */
function coinInner(seed = 1) {
  const r = rng(seed);
  const head = `M-22,-42 C8,-56 34,-38 34,-14 L46,${f1(2 + r() * 4)} L34,6 C36,16 30,26 18,28 L14,46 L-30,46 C-34,20 -44,-22 -22,-42 Z`;
  let s = `<circle cx="6" cy="8" r="62" fill="${SH}"/><circle r="62" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle r="62" fill="url(#hA)" opacity=".35"/><circle r="52" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="2 5"/>`;
  s += `<path d="${head}" fill="#e9c75c" stroke="${INK}" stroke-width="3"/><path d="${head}" fill="url(#hD)" opacity=".55"/>`;
  s += `<path d="M-30,-22 Q4,-34 30,-26" stroke="${INK}" stroke-width="4" fill="none"/><path d="M-30,-22 q-10,14 -6,30 M-28,-20 q-2,16 4,28" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<circle cx="20" cy="-12" r="3" fill="${INK}"/>`;
  return s;
}

/* ---------------- MAPA Mediterráneo oriental viewBox 0 0 900 640 ---------------- */
function medMapInner() {
  const id = uid('map');
  const balk = 'M0,0 L560,0 L560,90 C520,120 470,110 450,150 C430,190 400,200 380,236 C360,272 340,300 316,340 C300,320 288,290 266,276 C250,300 230,330 208,300 C190,262 150,236 110,214 C70,196 30,190 0,190 Z';
  const pelo = 'M206,312 C240,330 280,350 300,380 C270,400 230,396 210,370 C196,350 196,330 206,312 Z';
  const anat = 'M590,110 C660,96 780,92 900,100 L900,330 C820,344 760,330 700,346 C650,358 600,326 572,300 C556,260 548,214 560,172 Z';
  const crete = 'M330,452 C380,440 440,442 470,452 C440,466 380,468 330,458 Z';
  const cyp = 'M700,410 C730,398 770,400 784,410 C760,420 724,422 700,414 Z';
  const afr = 'M0,540 C140,520 300,548 420,566 C500,578 560,586 600,572 C630,560 660,560 690,574 C740,594 820,560 900,556 L900,640 L0,640 Z';
  let s = `<rect x="0" y="0" width="900" height="640" fill="#d9e3dc"/><rect x="0" y="0" width="900" height="640" fill="url(#hW)" opacity=".18"/>`;
  [balk, pelo, anat, crete, cyp, afr].forEach(d => { s += D(d, FIG, 3.5) + `<path d="${d}" fill="url(#hP)"/>`; });
  s += `<path d="M650,568 C656,600 672,620 690,640" stroke="#6c9ab0" stroke-width="7" fill="none"/><path d="M650,568 C656,600 672,620 690,640" stroke="${INK}" stroke-width="1.5" fill="none"/>`;
  s += `<path d="M630,570 l20,-8 l20,8" stroke="#6c9ab0" stroke-width="5" fill="none"/>`;
  // olas de grabado
  let wv = ''; const r = rng(7); for (let k = 0; k < 26; k++) { const x = 60 + r() * 780, y = 250 + r() * 270; wv += `M${f1(x)},${f1(y)} q8,-6 16,0 q8,6 16,0`; }
  s += `<path d="${wv}" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".45"/>`;
  return s;
}

/* ---------------- jeroglíficos ---------------- */
const GLYPHS = [
  `<path d="M4,22 Q20,6 36,22 Q20,32 4,22 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="20" cy="21" r="5" fill="${INK}"/><path d="M14,28 l-4,12 M24,29 q6,8 12,4" stroke="${INK}" stroke-width="3" fill="none"/>`,
  `<path d="M20,6 C10,6 10,22 20,24 C30,22 30,6 20,6 Z" fill="none" stroke="${INK}" stroke-width="4"/><path d="M20,24 V44 M8,28 H32" stroke="${INK}" stroke-width="4"/>`,
  `<path d="M2,16 l6,-6 6,6 6,-6 6,6 6,-6 6,6 M2,30 l6,-6 6,6 6,-6 6,6 6,-6 6,6" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linejoin="round"/>`,
  `<path d="M6,32 Q10,14 22,14 L34,10 L28,18 Q32,32 16,34 Z" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="24" cy="18" r="2" fill="${INK}"/><path d="M16,34 l-4,8 M20,34 l2,8" stroke="${INK}" stroke-width="3"/>`,
  `<path d="M20,42 L20,8 M20,8 Q10,14 12,26 M20,8 Q30,14 28,24" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
];
function glyphSvg(i, sz = 60) { return `<svg viewBox="0 0 40 46" width="${sz}" height="${f1(sz * 46 / 40)}" style="overflow:visible">${GLYPHS[i % GLYPHS.length]}</svg>`; }

/* llave/medida horizontal (abre hacia arriba, pico abajo) */
function bracePath(x1, x2, y, h = 26) { const m = (x1 + x2) / 2; return `M${f1(x1)},${f1(y - h)} Q${f1(x1)},${f1(y)} ${f1(x1 + 22)},${f1(y)} L${f1(m - 18)},${f1(y)} Q${f1(m)},${f1(y)} ${f1(m)},${f1(y + h)} Q${f1(m)},${f1(y)} ${f1(m + 18)},${f1(y)} L${f1(x2 - 22)},${f1(y)} Q${f1(x2)},${f1(y)} ${f1(x2)},${f1(y - h)}`; }
