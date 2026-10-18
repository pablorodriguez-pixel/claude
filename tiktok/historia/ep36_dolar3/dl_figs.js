/* Ep. 36 · El «$» es una palabra en español (v3, plantilla Napoleón) — tiempos clave (todo por TEXTO) + figuras heredadas del Ep. 30 */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  // L0 gancho
  K.simbolo0 = ws(1); K.dolar0 = ws(3); K.no0 = ws(4); K.una0 = ws(6); K.S0 = ws(7); K.es0 = ws(8); K.palabra0 = ws(10); K.espanol0 = ws(12);
  // L1 respuesta
  const i1 = find('ese garabato en realidad'); K.ese1 = ws(i1); K.garabato = ws(i1 + 1); K.realidad = ws(i1 + 3); K.pone1 = ws(i1 + 4); K.pesos1 = ws(i1 + 5);
  // L2 marca
  const is = find('soy tu vecino y esto', i1); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2); K.iye = is + 3; K.esto2 = ws(is + 4); K.libro2 = ws(is + 9);
  // L3 bucle numerado
  const i3 = find('como acaba una palabra', is); K.como3 = ws(i3); K.palabra3 = ws(i3 + 3); K.espanola3 = ws(i3 + 4); K.dinero3 = ws(i3 + 7); K.estados3 = ws(i3 + 9); K.unidos3 = ws(i3 + 10);
  K.en3 = ws(i3 + 11); K.tres3 = ws(i3 + 12); K.pasos3 = ws(i3 + 13);
  // L4 UNO
  const i4 = find('uno hace trescientos', i3); K.uno = ws(i4); K.trescientos = ws(i4 + 2); K.moneda = ws(i4 + 5); K.mandaba = ws(i4 + 7); K.medio = ws(i4 + 9);
  K.era4 = ws(i4 + 11); K.peso4 = ws(i4 + 13); K.espanol4 = ws(i4 + 14); K.y4 = ws(i4 + 15); K.comerciantes = ws(i4 + 17); K.abreviaban = ws(i4 + 19); K.mano = ws(i4 + 21);
  K.una4 = ws(i4 + 22); K.P4 = ws(i4 + 23); K.y4b = ws(i4 + 24); K.lado = ws(i4 + 26); K.S4 = ws(i4 + 28); K.pequenita = ws(i4 + 29); K.de4 = ws(i4 + 30); K.pesos4 = ws(i4 + 31);
  // L5 DOS
  const i5 = find('dos de tanto escribirlo', i4); K.dos = ws(i5); K.tanto5 = ws(i5 + 2); K.deprisa = ws(i5 + 4); K.la5 = ws(i5 + 5); K.S5 = ws(i5 + 6); K.montando = ws(i5 + 9); K.encima = ws(i5 + 10);
  K.P5 = ws(i5 + 13); K.P5e = wE(i5 + 13); K.y5 = ws(i5 + 14); K.P5b = ws(i5 + 17); K.solo = ws(i5 + 18); K.quedo = ws(i5 + 19); K.raya = ws(i5 + 21); K.rayaE = wE(i5 + 21);
  // L6 TRES
  const i6 = find('y tres cuando estados', i5); K.y6 = ws(i6); K.tres6 = ws(i6 + 1); K.cuando = ws(i6 + 2); K.estados6 = ws(i6 + 3); K.creo = ws(i6 + 5); K.dolar6 = ws(i6 + 7);
  K.lo6 = ws(i6 + 8); K.copio = ws(i6 + 9); K.peso6 = ws(i6 + 11); K.el6 = ws(i6 + 13); K.mismo6 = ws(i6 + 14); K.valor = ws(i6 + 15); K.y6b = ws(i6 + 16); K.mismo6b = ws(i6 + 18); K.simbolo6 = ws(i6 + 19);
  // L7 hasta 1857
  const i7 = find('tanto que alli se pudo', i6); K.tanto7 = ws(i7); K.alli = ws(i7 + 2); K.pagar = ws(i7 + 5); K.pesos7 = ws(i7 + 7); K.espanoles7 = ws(i7 + 8); K.hasta7 = ws(i7 + 9); K.mil = ws(i7 + 10); K.siete = ws(i7 + 14); K.sieteE = wE(i7 + 14);
  // L8 Ojo
  const i8 = find('ojo hay otras teorias', i7); K.ojo = ws(i8); K.otras = ws(i8 + 2); K.teorias = ws(i8 + 3); K.columnas = ws(i8 + 8); K.hercules = ws(i8 + 10); K.son = ws(i8 + 11);
  K.bonitas = ws(i8 + 12); K.pero8 = ws(i8 + 13); K.peso8 = ws(i8 + 16); K.tiene = ws(i8 + 20); K.pruebas = ws(i8 + 21);
  // L9 O sea
  const i9 = find('o sea cada vez que ves', i8); K.osea = ws(i9); K.cada = ws(i9 + 2); K.ves = ws(i9 + 5); K.simbolo9 = ws(i9 + 7); K.dolar9 = ws(i9 + 9); K.estas = ws(i9 + 10); K.leyendo = ws(i9 + 11);
  K.pesos9 = ws(i9 + 12); K.en9 = ws(i9 + 13); K.espanol9 = ws(i9 + 14);
  // L10 pregunta
  const i10 = find('y en tu pais como le llamais', i9); K.i10 = i10; K.y10 = ws(i10); K.tu10 = ws(i10 + 2); K.pais = ws(i10 + 3); K.como10 = ws(i10 + 4); K.llamais = ws(i10 + 6); K.dinero10 = ws(i10 + 8); K.os = ws(i10 + 9); K.leo = ws(i10 + 10);
  // L11 cierre
  const i11 = find('y esto no venia en el libro', i10); K.i11 = i11; K.y11 = ws(i11); K.esto = ws(i11 + 1); K.venia = ws(i11 + 3); K.libro = ws(i11 + 6); K.END = wE(i11 + 6);
}
/* cortes de escena: un plano nuevo cada 1,5–2,5 s; ningún dato en pantalla menos de 1,5 s */
const S = {
  A: [-1, K.es0 - 0.1], A2: [K.es0 - 0.1, K.ese1 - 0.1],
  B1: [K.ese1 - 0.1, K.pone1 - 0.1], B2: [K.pone1 - 0.1, K.soy + 0.12],
  BAL: [K.soy + 0.12, K.como3 - 0.12],
  C1: [K.como3 - 0.12, K.dinero3 - 0.1], C2: [K.dinero3 - 0.1, K.uno - 0.12],
  // UNO
  D1: [K.uno - 0.12, K.moneda - 0.1], D2: [K.moneda - 0.1, K.era4 - 0.1], D3: [K.era4 - 0.1, K.comerciantes - 0.1], D4: [K.comerciantes - 0.1, K.P4 - 0.15],
  // el lienzo de la P y la S: UNO (P + s) y DOS (la S se monta, la P queda en raya), con el montaje E0 por encima
  D5: [K.P4 - 0.15, K.cuando - 0.1], E0: [K.dos + 0.5, K.la5 - 0.08],
  // TRES
  F1: [K.cuando - 0.1, K.lo6 - 0.1], F2: [K.lo6 - 0.1, K.el6 - 0.1], F3: [K.el6 - 0.1, K.alli - 0.1],
  G1: [K.alli - 0.1, K.hasta7 - 0.1], G2: [K.hasta7 - 0.1, K.ojo - 0.12],
  // OJO
  H0: [K.ojo - 0.12, K.columnas - 0.15], H1: [K.columnas - 0.15, K.bonitas - 0.1], H2: [K.bonitas - 0.1, K.cada - 0.1],
  // O SEA
  K0: [K.cada - 0.1, K.estas - 0.1], K1: [K.estas - 0.1, K.y10 - 0.1],
  K2: [K.y10 - 0.1, K.y11 - 0.12],
  BK: [K.y11 - 0.12, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;
/* titulares numerados de los pasos (aguantan el paso entero) */
const STEPS = [[1, K.uno - 0.12, K.dos - 0.1, 'P + S = *pesos*', K.pesos4], [2, K.dos - 0.1, K.y6 - 0.1, 'La S se *monta* en la P', K.montando], [3, K.y6 - 0.1, K.ojo - 0.12, 'EE. UU. lo *copia*', K.copio]];

/* ---------- constantes ---------- */
const GOLD = '#E9C75C', IRON = '#8E8A80', IRON2 = '#5E5A52', SEA = '#AFC0B6', SEA2 = '#C9D3C6', LAGOON = '#9DB7AE', STRIPE = '#2f4a6a';
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const qMark = (pa, x, y, sz = 110, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 30 }, '?');
// bocadillo de cómic (HTML). tail: 'bl' | 'br' | 'b' | 'l' | 'r'
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

/* ---------- LA MANO QUE DICE ADIÓS (viewBox 0 0 400 760; muñeca en 200,520) ---------- */
function waveHandInner(o = {}) {
  const sleeve = 'M118,560 L282,560 L300,780 L100,780 Z', cuff = 'M112,500 L288,500 L292,566 L108,566 Z';
  const palm = 'M118,300 C108,380 124,452 158,500 L248,500 C282,452 294,380 284,300 C250,284 152,284 118,300 Z';
  const F = [[132, 312, 104, 150, 25, 22], [172, 300, 166, 108, 26, 23], [214, 300, 230, 118, 26, 23], [254, 314, 294, 172, 24, 20]];
  const th = limb(126, 420, 44, 330, 28, 22);
  let sil = P(sleeve) + P(cuff) + P(palm) + P(th) + `<circle cx="44" cy="330" r="22"/>`;
  let fd = '';
  F.forEach(f => { const d = limb(f[0], f[1], f[2], f[3], f[4], f[5]); sil += P(d) + `<circle cx="${f[2]}" cy="${f[3]}" r="${f[5]}"/>`; fd += D(d, FIG, 4) + `<circle cx="${f[2]}" cy="${f[3]}" r="${f[5]}" fill="${FIG}" stroke="${INK}" stroke-width="4"/>` + `<path d="M${f1(f[2] + (f[0] - f[2]) * 0.45 - 12)},${f1(f[3] + (f[1] - f[3]) * 0.45)} q12,6 24,0" stroke="${INK}" stroke-width="2.4" fill="none"/>` + `<ellipse cx="${f[2]}" cy="${f[3] - 4}" rx="${f[5] * 0.55}" ry="${f[5] * 0.4}" fill="#fff" stroke="${INK}" stroke-width="2" opacity=".85"/>`; });
  let s = cut(sil, 9, 11);
  s += D(sleeve, '#3a2a1e', 4) + clipG(uid('ws'), sleeve, `<rect x="90" y="560" width="220" height="230" fill="url(#hW)" opacity=".45"/><rect x="240" y="560" width="70" height="230" fill="url(#hD)"/>`);
  s += D(cuff, '#fff', 4) + `<circle cx="258" cy="534" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M112,518 H288" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 5"/>`;
  s += fd + D(th, FIG, 4) + `<circle cx="44" cy="330" r="22" fill="${FIG}" stroke="${INK}" stroke-width="4"/>`;
  s += D(palm, FIG, 4) + clipG(uid('wp'), palm, `<ellipse cx="282" cy="400" rx="50" ry="130" fill="url(#hA)"/><ellipse cx="130" cy="470" rx="40" ry="60" fill="url(#hB)" opacity=".6"/>`);
  s += `<path d="M150,380 q50,28 104,6 M160,430 q36,18 76,4 M190,330 q-10,40 -4,90" stroke="${INK}" stroke-width="2.6" fill="none"/>`;
  // grillete (se controla su opacidad desde fuera)
  const ring = 'M100,470 L300,470 L304,532 L96,532 Z';
  s += `<g class="shk">${cut(P(ring), 5, 7)}${D(ring, IRON, 5)}<path d="${ring}" fill="url(#hD)" opacity=".5"/><path d="M104,486 H296" stroke="#fff" stroke-width="4" opacity=".5"/>`;
  [120, 160, 240, 280].forEach(x => s += `<circle cx="${x}" cy="501" r="7" fill="${IRON2}" stroke="${INK}" stroke-width="3"/>`);
  s += `<g class="ringT"><ellipse cx="200" cy="556" rx="26" ry="32" fill="none" stroke="${INK}" stroke-width="16"/><ellipse cx="200" cy="556" rx="26" ry="32" fill="none" stroke="${IRON}" stroke-width="8"/></g></g>`;
  return s;
}
// eslabón de cadena (HTML) 0 0 120 170
const linkSvg = (col = IRON) => `<svg viewBox="0 0 120 170" width="100%" height="100%" style="overflow:visible"><ellipse cx="66" cy="92" rx="44" ry="70" fill="none" stroke="${SH}" stroke-width="26"/><ellipse cx="60" cy="85" rx="44" ry="70" fill="none" stroke="${INK}" stroke-width="30"/><ellipse cx="60" cy="85" rx="44" ry="70" fill="none" stroke="${col}" stroke-width="18"/><path d="M28,50 Q34,30 54,22" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/></svg>`;

/* ---------- pergamino (viewBox 0 0 600 700) ---------- */
function scrollInner() {
  const pg = 'M40,60 L560,60 L560,640 L40,640 Z';
  let ln = ''; const r = rng(7); for (let y = 280; y < 560; y += 34) ln += `M90,${y}H${f1(510 - r() * 90)}`;
  return cut(P(pg) + '<rect x="10" y="20" width="580" height="60" rx="30"/><rect x="10" y="620" width="580" height="60" rx="30"/>', 8, 10)
    + D(pg, '#F4E7C8', 4) + `<path d="${pg}" fill="url(#hP)" opacity=".5"/><path d="M500,60 L560,60 L560,640 L520,640 Z" fill="url(#hA)" opacity=".5"/>`
    + `<rect x="10" y="20" width="580" height="60" rx="30" fill="#E3CFA2" stroke="${INK}" stroke-width="5"/><rect x="10" y="20" width="580" height="60" rx="30" fill="url(#hA)" opacity=".5"/><rect x="10" y="620" width="580" height="60" rx="30" fill="#E3CFA2" stroke="${INK}" stroke-width="5"/><rect x="10" y="620" width="580" height="60" rx="30" fill="url(#hA)" opacity=".5"/>`
    + `<text x="300" y="170" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">PROMETO</text><text x="300" y="224" text-anchor="middle" font-family="SpecialElite" font-size="30" fill="${INK}">solemnemente…</text>`
    + `<path d="${ln}" stroke="${INK}" stroke-width="6" opacity=".35"/>`
    + `<g transform="translate(430,560)"><circle r="46" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle r="32" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M-20,40 L-34,96 L-10,84 L0,104 L8,46 Z M20,40 L34,96 L10,84 L0,104" fill="${RED}" stroke="${INK}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Rye" font-size="40" fill="#fff">✦</text></g>`;
}
// pluma (0 0 120 240)
const quillSvg = () => `<svg viewBox="0 0 120 240" width="100%" height="100%" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/><path d="M40,120 l20,-8 M36,90 l26,-10 M44,60 l24,-12" stroke="${INK}" stroke-width="2" opacity=".6"/></svg>`;

/* ---------- personajes (busto 360x460) ---------- */
const TOPHAT = (col = '#1e1a17') => {
  const crown = 'M128,152 L138,30 L222,30 L232,152 Z', brim = 'M80,154 Q180,128 280,154 Q180,182 80,154 Z';
  return cut(P(crown) + P(brim), 4, 6) + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".35"/><ellipse cx="180" cy="30" rx="42" ry="9" fill="#3a3330" stroke="${INK}" stroke-width="3"/><path d="M129,124 L231,124 L232,150 L128,150 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>` + D(brim, col, 4) + `<path d="M150,46 L146,120" stroke="#fff" stroke-width="4" opacity=".35"/>`;
};
const BOWTIE = (col = INK) => `<path d="M180,346 L148,330 L150,364 Z M180,346 L212,330 L210,364 Z" fill="${col}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><rect x="172" y="338" width="16" height="16" rx="4" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
const BOATER = () => {
  const crown = 'M124,150 L130,96 Q180,84 230,96 L236,150 Z', brim = 'M60,152 Q180,126 300,152 Q180,184 60,152 Z';
  let st = ''; for (let k = 0; k < 6; k++) st += `<path d="M${130 + k * 18},100 L${128 + k * 18},150" stroke="${INK}" stroke-width="1.6" opacity=".5"/>`;
  return cut(P(crown) + P(brim), 4, 6) + D(brim, '#E8CF8A', 4) + `<path d="M80,152 Q180,136 280,152" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".5"/>` + D(crown, '#E8CF8A', 4) + st + `<path d="M126,126 L234,126 L236,146 L124,146 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`;
};
// camiseta de rayas de gondolero (sobre el torso del busto)
const stripesOver = () => {
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  let st = ''; for (let y = 350; y < 470; y += 26) st += `<rect x="0" y="${y}" width="360" height="13" fill="${STRIPE}"/>`;
  return `<path d="${torso}" fill="#fff" stroke="${INK}" stroke-width="3"/>` + clipG(uid('gs'), torso, st + `<rect x="238" y="320" width="120" height="150" fill="url(#hA)" opacity=".6"/>`) + `<path d="M150,330 Q180,352 210,330" stroke="${INK}" stroke-width="3.5" fill="none"/>`;
};
function gondolierInner() { return bustInner({ uniform: 'farmer', moustache: true, seed: 17 }) + stripesOver() + BOATER(); }
const CIGAR = () => `<g transform="rotate(-14 236 270)"><rect x="214" y="262" width="92" height="20" rx="8" fill="#7a4a26" stroke="${INK}" stroke-width="3"/><rect x="226" y="262" width="14" height="20" fill="${RED}" stroke="${INK}" stroke-width="2"/><rect x="298" y="262" width="10" height="20" rx="4" fill="#9a9a90" stroke="${INK}" stroke-width="2"/></g>`;
function bossInner() { return bustInner({ uniform: 'soldier', moustache: true, seed: 63 }) + coatOver('#26201b') + BOWTIE(RED) + `<path d="M120,392 L148,380 M240,380 L268,392" stroke="${BRASS}" stroke-width="5"/>` + TOPHAT() + CIGAR(); }
function gentInner() { return bustInner({ uniform: 'soldier', moustache: true, seed: 41 }) + coatOver('#2f241c') + BOWTIE(INK) + `<circle cx="204" cy="204" r="20" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="4"/><path d="M224,206 q10,30 2,60" stroke="${BRASS}" stroke-width="3" fill="none"/>`; }
function waiterInner(seed = 71) {
  let s = bustInner({ uniform: 'soldier', moustache: true, seed }) + coatOver('#1e1a17') + BOWTIE(INK);
  const cap = 'M114,204 C106,146 142,122 180,122 C220,122 256,146 248,204 C240,172 214,152 150,160 C136,170 120,184 114,204 Z';
  return s + `<path d="${cap}" fill="#2a211a" stroke="${INK}" stroke-width="3.5"/><path d="M150,160 q40,-16 92,20 M140,150 q40,-20 90,4" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`;
}
function neighInner(seed, k) {
  const cols = ['#5a3a2a', '#2f3a4a', '#4a2f2f', '#3a4a2f', '#4a3a5a', '#5a4a2a'];
  let s = bustInner({ uniform: k % 2 ? 'farmer' : 'soldier', moustache: k % 3 === 0, beard: k === 4, seed });
  s += coatOver(cols[k % 6]);
  if (k === 1) s += capOver(); else if (k === 2) s += TOPHAT('#3a2a1e'); else if (k === 3) s += BOATER(); else if (k === 5) s += hairOverN();
  return s;
}
const hairOverN = () => { const h = 'M116,206 C104,140 140,112 184,112 C232,112 260,142 246,206 C238,170 214,150 182,150 C150,150 126,168 116,206 Z'; return D(h, '#3a2a1e') + HF(h, 'hF'); };

/* ---------- objetos ---------- */
const coinSvg = () => `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><circle cx="54" cy="56" r="44" fill="${SH}"/><circle cx="50" cy="50" r="46" fill="#fff"/><circle cx="50" cy="50" r="40" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="50" cy="50" r="31" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="3 4"/><text x="50" y="68" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">€</text></svg>`;
const deskSvg = (w = 760, h = 160) => `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}"/>`)}<rect x="0" y="0" width="${w}" height="${h}" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="${w}" height="${h}" fill="url(#hW)" opacity=".3"/><rect x="0" y="0" width="${w}" height="26" fill="#8b5a3a" stroke="${INK}" stroke-width="4"/></svg>`;
// góndola (viewBox 0 0 900 220) — proa a la derecha
function gondolaInner() {
  const hull = 'M30,120 Q60,190 300,196 L640,196 Q820,186 870,60 L884,58 Q872,150 820,190 Q760,216 620,214 L300,214 Q70,212 20,128 Z';
  const ferro = 'M856,70 L876,8 L896,14 L882,40 L898,46 L884,66 Z';
  let s = cut(P(hull) + P(ferro), 7, 9) + D(hull, '#1d1916', 5) + `<path d="${hull}" fill="url(#hW)" opacity=".35"/>`;
  s += D(ferro, '#d8d0be', 4) + `<path d="M120,176 Q400,190 760,176" stroke="${BRASS}" stroke-width="5" fill="none"/>`;
  s += `<path d="M420,150 L560,150 L552,190 L428,190 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M420,150 L560,150 L552,190 L428,190 Z" fill="url(#hA)" opacity=".5"/>`;
  return s;
}
// palacios venecianos (capa 1080x1920)
function veniceSvg() {
  let s = '';
  // campanile lejano
  s += `<g transform="translate(190,0)"><path d="M820,560 V250 H880 V560 Z" fill="#E2C3A8" stroke="${INK}" stroke-width="4"/><path d="M816,250 L850,180 L884,250 Z" fill="#7a9a82" stroke="${INK}" stroke-width="4"/><path d="M826,270 h48 v40 h-48 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><rect x="820" y="250" width="60" height="310" fill="url(#hA)" opacity=".35"/></g>`;
  [[-20, 600, 300, '#E9B9A0'], [280, 520, 280, '#E8D2A8'], [560, 640, 260, '#D9B391'], [820, 580, 300, '#E2C3A8']].forEach(([x, y, w, col], i) => {
    const h = 1100 - y, fac = `M${x},${y} H${x + w} V1100 H${x} Z`;
    s += cut(P(fac), 6, 8) + D(fac, col, 4) + clipG(uid('vn'), fac, `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#hP)"/><rect x="${x + w - 40}" y="${y}" width="40" height="${h}" fill="url(#hA)" opacity=".7"/>`);
    s += `<rect x="${x - 8}" y="${y - 16}" width="${w + 16}" height="22" fill="${INK}"/>`;
    for (let yy = y + 50, row = 0; yy < 1000; yy += 150, row++) for (let k = 0; k < 3; k++) {
      const ww = (w - 60) / 3 - 14, wx = x + 30 + k * (w - 60) / 3 + 7, top = yy, bot = yy + 104;
      const arch = `M${f1(wx)},${bot} V${top + 30} Q${f1(wx + ww / 2)},${top - 18} ${f1(wx + ww)},${top + 30} V${bot} Z`;
      s += `<path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="${arch}" fill="url(#hB)" opacity=".5"/>`;
      if (row === 1) s += `<rect x="${f1(wx - 6)}" y="${bot}" width="${f1(ww + 12)}" height="12" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M${f1(wx)},${bot + 12} v20 M${f1(wx + ww / 2)},${bot + 12} v20 M${f1(wx + ww)},${bot + 12} v20" stroke="${INK}" stroke-width="3"/>`;
    }
    s += `<path d="M${x},1100 V1040 H${x + w} V1100" fill="#7a5a3a" stroke="${INK}" stroke-width="3"/>`;
  });
  // postes de amarre
  [[150, 1010], [700, 1000], [960, 1020]].forEach(([x, y]) => s += `<rect x="${x}" y="${y}" width="22" height="180" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M${x},${y + 20} l22,20 M${x},${y + 60} l22,20 M${x},${y + 100} l22,20" stroke="${RED}" stroke-width="8"/><path d="M${x - 4},${y} h30" stroke="${INK}" stroke-width="5"/>`);
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
function waterSvg(y0 = 1080, h = 420, seed = 3) {
  const r = rng(seed); let wv = '';
  for (let y = y0 + 20; y < y0 + h; y += 22) { let d = ''; for (let x = -40; x < 1120; x += 60 + r() * 40) d += `M${f1(x)},${f1(y + r() * 6)} q16,-8 32,0`; wv += `<path d="${d}" stroke="${INK}" stroke-width="2.6" fill="none" opacity="${f1(0.25 + (y - y0) / h * 0.4)}"/>`; }
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"><rect x="-20" y="${y0}" width="1120" height="${h}" fill="${LAGOON}" stroke="${INK}" stroke-width="5"/><rect x="-20" y="${y0}" width="1120" height="${h}" fill="url(#hF)" opacity=".25"/>${wv}</svg>`;
}

/* ---------- MAPAS ---------- */
const LATAM = [[-117, 32.5], [-114.8, 32.5], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-101.4, 29.8], [-99.1, 26.5], [-97.4, 26], [-97.7, 22], [-97.2, 20], [-96, 19], [-94.5, 18.2], [-92, 18.6], [-90.5, 19.8], [-90.4, 21], [-87, 21.5], [-87.5, 19], [-88.2, 16], [-86, 15.9], [-83.2, 15], [-83.6, 11], [-81.8, 9], [-79.5, 9.6], [-77.8, 8.6], [-76, 9.5], [-75.5, 10.5], [-72, 12], [-70, 12.2], [-68, 10.5], [-64, 10.6], [-61.5, 10.5], [-60, 8.5], [-57, 6], [-54, 5.8], [-51.5, 4.5], [-50, 1.5], [-48.5, -1], [-44.5, -2.5], [-40, -2.8], [-37, -4.8], [-35, -6], [-35, -9], [-37.2, -11.5], [-39, -14], [-39, -17.8], [-40.5, -20.8], [-42, -23], [-45, -23.8], [-48.5, -26], [-48.8, -28.5], [-51, -31], [-53.4, -33.8], [-55, -35], [-57, -35.4], [-56.8, -36.5], [-58, -38.6], [-62, -39], [-62.5, -40.8], [-65, -41], [-65, -42.5], [-63.8, -43], [-65.5, -45], [-67.6, -46.4], [-66, -47.8], [-68.8, -50.5], [-69, -52], [-68.5, -53.5], [-67, -54.8], [-69, -55.5], [-71.5, -54], [-74.5, -52], [-75.5, -48], [-74, -44], [-73.5, -41], [-73.6, -37], [-71.6, -33], [-71.5, -28], [-70.5, -23], [-70.2, -18.5], [-72, -17], [-76.2, -14], [-78.6, -9], [-80.5, -6], [-81.2, -4.5], [-80, -2.5], [-80.5, -0.5], [-80, 1], [-78.8, 1.8], [-77.5, 4], [-77.4, 6.5], [-77.9, 7.3], [-79, 8.5], [-80.5, 7.5], [-81.5, 8.2], [-83.5, 8.4], [-85.6, 9.8], [-85.7, 11.1], [-87.4, 12.9], [-89.4, 13.5], [-91.5, 14], [-92.3, 14.6], [-94, 16], [-96.5, 15.7], [-98.5, 16.3], [-101.5, 17.5], [-104, 19], [-105.6, 20.4], [-105.3, 22], [-106.5, 23.5], [-108.5, 25.5], [-110, 27], [-112.2, 29], [-113.2, 31.2], [-114.7, 31.6], [-114.1, 30], [-112.5, 27.5], [-110.5, 24.2], [-109.5, 23], [-110.3, 23.5], [-112.1, 25], [-112.2, 26.7], [-114.2, 28.2], [-115, 29.8], [-116.7, 31.8]];
const CUBA = [[-84.9, 21.9], [-82, 23.1], [-79, 22.6], [-75.6, 21], [-74.2, 20.2], [-77.5, 19.9], [-78.5, 21.5], [-81.5, 22.2]];
const laPj = (lo, la) => [f1(120 + (lo + 118) * 8.6), f1(420 + (33 - la) * 8.6)];
const laPath = a => 'M' + a.map(q => laPj(q[0], q[1]).join(',')).join('L') + 'Z';
const ESP = [[-9.3, 43.0], [-8.2, 43.7], [-7.0, 43.55], [-5.7, 43.6], [-4.5, 43.4], [-3.0, 43.45], [-1.8, 43.4], [-1.4, 43.05], [-0.7, 42.85], [0.7, 42.85], [1.7, 42.5], [3.2, 42.4], [3.2, 41.9], [2.2, 41.3], [0.9, 41.0], [0.5, 40.6], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3], [-2.1, 36.7], [-3.5, 36.75], [-4.4, 36.7], [-5.3, 36.1], [-6.0, 36.3], [-6.4, 36.8], [-7.4, 37.2], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 38.5], [-7.0, 39.0], [-7.5, 39.6], [-6.9, 40.2], [-6.8, 41.0], [-6.2, 41.6], [-6.6, 41.95], [-8.1, 41.8], [-8.9, 41.9], [-8.8, 42.5]];
const esPj = (lo, la) => [f1((lo + 9.6) * 17), f1((44 - la) * 21)];
const esPath = a => 'M' + a.map(q => esPj(q[0], q[1]).join(',')).join('L') + 'Z';
// mapa Latinoamérica + recuadro de España (capa 1080x1920). Devuelve svg.
function latamSvg() {
  const la = laPath(LATAM), cu = laPath(CUBA), id = uid('la');
  let s = cut(P(la) + P(cu), 9, 11) + D(la, FIG, 6) + D(cu, FIG, 4) + clipG(id, la, `<rect x="0" y="0" width="1080" height="1920" fill="url(#hP)"/><rect x="560" y="700" width="400" height="600" fill="url(#hA)" opacity=".35"/>`);
  s += `<path d="${la}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  // recuadro de España
  const es = esPath(ESP);
  s += `<g transform="translate(700,420)">${cut('<rect x="-20" y="-20" width="250" height="210" rx="14"/>', 6, 8)}<rect x="-20" y="-20" width="250" height="210" rx="14" fill="${SEA2}" stroke="${INK}" stroke-width="5"/><rect x="-20" y="-20" width="250" height="210" rx="14" fill="url(#hF)" opacity=".3"/>${D(es, FIG, 5)}<path d="${es}" fill="url(#hP)"/><text x="105" y="180" text-anchor="middle" font-family="Rye" font-size="26" fill="${INK}">ESPAÑA</text></g>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
const EUR = [[-9.5, 37], [-8.9, 42], [-9.3, 43], [-8, 43.7], [-1.8, 43.4], [-1.2, 46], [-2.5, 47.3], [-4.7, 48.5], [-1.6, 48.7], [1.5, 50.2], [3, 51.2], [4.5, 52.5], [5, 53.4], [7, 53.6], [8.6, 54], [8.3, 55.5], [8.6, 57.1], [10.5, 57.6], [10.5, 56.2], [12, 54.4], [14.2, 53.9], [18.5, 54.8], [21, 55], [21.2, 56.5], [24, 57.2], [24.3, 59.4], [28, 59.5], [31, 59.9], [33, 59], [33, 46], [30.5, 46], [29.6, 45.3], [28.6, 44], [28, 42], [26, 40.8], [24, 40.8], [23, 39.5], [24, 38], [22.5, 36.5], [21.5, 37], [21, 38.5], [19.5, 40], [19.5, 41.8], [18.5, 42.5], [16, 43.5], [15, 44.6], [13.7, 45.6], [12.4, 45.4], [12.3, 44.3], [13.6, 43.5], [14.5, 42], [16, 41.4], [18.5, 40.2], [17, 39], [16.6, 38], [15.6, 38], [16.2, 39.2], [15.6, 40], [14, 41], [12.5, 41.7], [10.5, 43], [9.8, 44], [8.5, 44.3], [6.6, 43.1], [4.5, 43.5], [3.1, 43], [3.2, 42], [2, 41.2], [0.5, 40.5], [0, 39], [-0.6, 37.6], [-2, 36.7], [-4.5, 36.7], [-5.6, 36], [-6.3, 36.8], [-7.4, 37.2], [-8.9, 37]];
const UK = [[-5.7, 50], [1.4, 51.2], [1.7, 52.7], [0, 53.5], [-0.5, 54.5], [-2, 55.8], [-1.8, 57.6], [-3.3, 58.6], [-5, 58.6], [-5.6, 56.4], [-4.8, 55], [-3, 54.3], [-3.3, 53.4], [-4.6, 53.2], [-4.2, 52.2], [-5.2, 51.7], [-3.2, 51.3]];
const SIC = [[12.4, 38.1], [15.6, 38.3], [15.1, 36.7], [12.6, 37.6]], SAR = [[8.4, 41], [9.8, 41.2], [9.6, 39.1], [8.5, 39]];
const euPj = (lo, la) => [f1(40 + (lo + 5) * 25), f1(380 + (58 - la) * 36)];
const euPath = a => 'M' + a.map(q => euPj(q[0], q[1]).join(',')).join('L') + 'Z';
// fronteras aproximadas del núcleo (Italia, Austria, Alemania, Chequia; Baviera con trazo discontinuo)
const BRD = {
  de: [[6, 51.8], [7, 53.6], [8.6, 54], [9.9, 54.8], [12, 54.4], [14.2, 53.9], [14.6, 52.6], [15, 51], [12.5, 50.3], [12.2, 50.3], [13.8, 48.8], [13, 47.5], [10.5, 47.5], [7.6, 47.6], [8.2, 49], [6.4, 49.5], [6, 50.8]],
  by: [[9, 50.3], [11, 50.6], [12.2, 50.3], [13.8, 48.8], [13, 47.5], [10.5, 47.5], [9.6, 47.6], [10.1, 49.5]],
  at: [[9.6, 47.5], [10.5, 47.5], [13, 47.5], [13.8, 48.8], [15, 49], [16.9, 48.6], [17.1, 48], [16, 46.8], [13.7, 46.5], [12.2, 47], [10.5, 46.9]],
  cz: [[12.2, 50.3], [12.5, 50.3], [15, 51], [16.3, 50.6], [18.8, 49.9], [18.8, 49.5], [16.9, 48.6], [15, 49], [13.8, 48.8]],
  it: [[6.8, 45.9], [10.5, 46.9], [12.2, 47], [13.7, 46.5], [13.7, 45.6], [12.4, 45.4]],
};
function europeSvg() {
  const eu = euPath(EUR), id = uid('eu');
  let s = cut(P(eu) + P(euPath(UK)) + P(euPath(SIC)) + P(euPath(SAR)), 9, 11);
  s += D(eu, FIG, 6) + D(euPath(UK), FIG, 5) + D(euPath(SIC), FIG, 4) + D(euPath(SAR), FIG, 4);
  s += clipG(id, eu, `<rect x="0" y="0" width="1200" height="1920" fill="url(#hP)"/>`);
  const ln = a => 'M' + a.map(q => euPj(q[0], q[1]).join(',')).join('L');
  s += `<path class="cIT" d="${euPath([[6.8, 45.9], [10.5, 46.9], [12.2, 47], [13.7, 46.5], [13.7, 45.6], [12.4, 45.4], [12.3, 44.3], [13.6, 43.5], [14.5, 42], [16, 41.4], [18.5, 40.2], [17, 39], [16.6, 38], [15.6, 38], [16.2, 39.2], [15.6, 40], [14, 41], [12.5, 41.7], [10.5, 43], [9.8, 44], [8.5, 44.3], [6.6, 43.1], [7.5, 44.5]])}" fill="${YEL}" opacity="0"/>`;
  s += `<path class="cAT" d="${euPath(BRD.at)}" fill="${PINK}" opacity="0"/><path class="cBY" d="${euPath(BRD.by)}" fill="${PINK}" opacity="0"/><path class="cDE" d="${euPath(BRD.de)}" fill="#9fd3c0" opacity="0"/><path class="cCZ" d="${euPath(BRD.cz)}" fill="#f2b880" opacity="0"/>`;
  s += `<path d="${ln(BRD.de)}Z" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 6"/><path d="${ln(BRD.at)}Z" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 6"/><path d="${ln(BRD.cz)}Z" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 6"/><path d="${ln(BRD.it)}" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 6"/><path d="${ln(BRD.by)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 6"/>`;
  s += `<path d="${eu}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
// chincheta (HTML 0 0 60 80)
const pinSvg = (col = RED) => `<svg viewBox="0 0 60 80" width="100%" height="100%" style="overflow:visible"><path d="M30,78 L22,40 L38,40 Z" fill="${INK}"/><circle cx="33" cy="27" r="22" fill="${SH}"/><circle cx="30" cy="24" r="22" fill="${col}" stroke="${INK}" stroke-width="4"/><circle cx="23" cy="17" r="7" fill="#fff" opacity=".6"/></svg>`;

/* ---------- monumentos (capas 1080x1920) ---------- */
function rioSvg() {
  let s = `<path d="M-20,1150 C120,900 260,760 380,760 C470,760 520,880 560,1150 Z" fill="#7a9a6a" stroke="${INK}" stroke-width="5"/><path d="M-20,1150 C120,900 260,760 380,760 C470,760 520,880 560,1150 Z" fill="url(#hA)" opacity=".5"/>`;
  s += `<path d="M560,1150 C640,820 700,560 820,540 C930,560 980,860 1100,1150 Z" fill="#8aa878" stroke="${INK}" stroke-width="5"/><path d="M560,1150 C640,820 700,560 820,540 C930,560 980,860 1100,1150 Z" fill="url(#hB)" opacity=".55"/>`;
  // Cristo sobre el monte de la izquierda
  const cx = 380, cy = 760;
  s += `<g transform="translate(${cx},${cy})">${cut('<path d="M-10,0 L-14,-120 L-90,-128 L-90,-142 L-14,-150 L-12,-166 L12,-166 L14,-150 L90,-142 L90,-128 L14,-120 L10,0 Z"/><circle cx="0" cy="-182" r="16"/>', 5, 6)}<path d="M-10,0 L-14,-120 L-90,-128 L-90,-142 L-14,-150 L-12,-166 L12,-166 L14,-150 L90,-142 L90,-128 L14,-120 L10,0 Z" fill="#EDE6D6" stroke="${INK}" stroke-width="4"/><path d="M2,-160 L6,0" stroke="${INK}" stroke-width="2" opacity=".5"/><circle cx="0" cy="-182" r="16" fill="#EDE6D6" stroke="${INK}" stroke-width="4"/><rect x="-22" y="0" width="44" height="26" fill="#cfc6b2" stroke="${INK}" stroke-width="3"/></g>`;
  s += `<path d="M560,1150 C700,1120 860,1160 1100,1130 L1100,1500 L-20,1500 L-20,1150 Z" fill="${SEA}" stroke="${INK}" stroke-width="5"/><path d="M40,1190 q20,-8 40,0 M300,1220 q20,-8 40,0 M700,1200 q20,-8 40,0 M900,1250 q20,-8 40,0" stroke="${INK}" stroke-width="3" fill="none"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
function brandenburgSvg() {
  let s = '';
  const top = 'M130,520 H950 V600 H130 Z', att = 'M300,440 H780 V520 H300 Z';
  s += cut(P(top) + P(att) + `<rect x="110" y="600" width="860" height="40"/>` + [0, 1, 2, 3, 4, 5].map(k => `<rect x="${160 + k * 140}" y="640" width="60" height="480"/>`).join(''), 8, 10);
  s += D(att, '#E2D4B4', 5) + `<path d="${att}" fill="url(#hP)"/>` + D(top, '#E9DCC0', 5) + `<path d="M150,540 H930 M150,580 H930" stroke="${INK}" stroke-width="2.4"/>`;
  s += `<rect x="110" y="600" width="860" height="40" fill="#D8C8A6" stroke="${INK}" stroke-width="5"/>`;
  [0, 1, 2, 3, 4, 5].forEach(k => { const x = 160 + k * 140; s += `<rect x="${x}" y="640" width="60" height="480" fill="#EDE2C8" stroke="${INK}" stroke-width="5"/><path d="M${x + 15},650 V1110 M${x + 30},650 V1110 M${x + 45},650 V1110" stroke="${INK}" stroke-width="2" opacity=".5"/><rect x="${x + 40}" y="640" width="20" height="480" fill="url(#hA)" opacity=".6"/>`; });
  // cuadriga (silueta)
  s += `<g transform="translate(540,440)"><path d="M-130,0 C-130,-40 -110,-70 -80,-80 L-70,-120 L-56,-82 C-30,-90 -10,-80 0,-60 L10,-130 L22,-60 C40,-90 70,-90 90,-70 L104,-112 L112,-68 C130,-50 132,-20 130,0 Z" fill="#6d8a6a" stroke="${INK}" stroke-width="4"/><path d="M0,-130 V-170 M-16,-160 H16" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-176" r="10" fill="#6d8a6a" stroke="${INK}" stroke-width="3"/></g>`;
  s += `<rect x="-20" y="1120" width="1120" height="400" fill="#cdb48a" stroke="${INK}" stroke-width="5"/><rect x="-20" y="1120" width="1120" height="400" fill="url(#hP)"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
function pragueSvg() {
  let s = '';
  // torre del puente
  const tw = 'M560,1060 V560 L600,520 L600,420 L650,300 L700,420 L700,520 L740,560 V1060 Z';
  s += cut(P(tw), 8, 10) + D(tw, '#8a7a6a', 5) + clipG(uid('pt'), tw, `<rect x="540" y="280" width="220" height="800" fill="url(#hA)" opacity=".7"/><rect x="700" y="280" width="60" height="800" fill="url(#hD)"/>`);
  s += `<path d="M600,860 V760 Q650,700 700,760 V860" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><rect x="600" y="600" width="100" height="70" fill="#E9DCC0" stroke="${INK}" stroke-width="3"/><path d="M620,620 h60 M620,640 h60" stroke="${INK}" stroke-width="2"/><path d="M560,560 H740" stroke="${INK}" stroke-width="6"/>`;
  [580, 640, 700].forEach(x => s += `<path d="M${x},540 l10,-24 l10,24" stroke="${INK}" stroke-width="3" fill="none"/>`);
  // tablero del puente con arcos
  const deck = 'M-20,1000 H1100 V1060 H-20 Z';
  s += cut(P(deck), 6, 8) + D(deck, '#b9a88e', 5) + `<path d="${deck}" fill="url(#hP)"/>`;
  [[-10, 520], [270, 800]].forEach(([a, b]) => s += `<path d="M${a},1060 Q${(a + b) / 2},960 ${b},1060 Z" fill="${SEA}" stroke="${INK}" stroke-width="4"/>`);
  [880].forEach(a => s += `<path d="M${a},1060 Q${a + 140},960 ${a + 280},1060 Z" fill="${SEA}" stroke="${INK}" stroke-width="4"/>`);
  // estatuas del pretil
  [100, 260, 420, 860, 1000].forEach(x => s += `<path d="M${x - 14},1000 V950 Q${x},910 ${x + 14},950 V1000 Z" fill="#4a4038" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="928" r="12" fill="#4a4038" stroke="${INK}" stroke-width="3"/>`);
  s += `<rect x="-20" y="1060" width="1120" height="460" fill="${SEA}" stroke="${INK}" stroke-width="5"/><rect x="-20" y="1060" width="1120" height="460" fill="url(#hF)" opacity=".25"/>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
function alpsSvg() {
  let s = '';
  const m1 = 'M-40,1050 L200,560 L330,760 L480,470 L700,820 L840,600 L1120,1050 Z';
  s += D(m1, '#9aa6a8', 5) + clipG(uid('al'), m1, `<rect x="0" y="400" width="1100" height="700" fill="url(#hB)" opacity=".5"/>`);
  s += `<path d="M200,560 L250,660 L224,650 L206,690 L180,640 L156,650 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M480,470 L548,580 L510,566 L488,610 L460,560 L426,574 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M840,600 L900,690 L870,680 L850,716 L826,676 L800,690 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  const m2 = 'M-40,1150 Q200,900 420,980 Q640,1060 820,920 Q960,830 1120,940 L1120,1400 L-40,1400 Z';
  s += cut(P(m2), 6, 8) + D(m2, '#9db07a', 5) + `<path d="${m2}" fill="url(#hA)" opacity=".4"/>`;
  [[120, 1000], [210, 980], [860, 900], [960, 920]].forEach(([x, y]) => s += `<path d="M${x},${y} l-26,60 h52 Z M${x},${y + 30} l-32,64 h64 Z" fill="#3c5a2a" stroke="${INK}" stroke-width="3"/>`);
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
// banderas (HTML 0 0 300 200)
const flagAT = () => `<svg viewBox="0 0 300 200" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="300" height="200"/>', 6, 8)}<rect x="0" y="0" width="300" height="200" fill="${RED}" stroke="${INK}" stroke-width="5"/><rect x="0" y="66" width="300" height="68" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="0" y="0" width="300" height="200" fill="url(#hA)" opacity=".25"/></svg>`;
const flagBY = () => { let l = ''; for (let i = -2; i < 10; i++) for (let j = -2; j < 7; j++) if ((i + j) % 2 === 0) l += `<path d="M${i * 40 + j * 20},${j * 34} l20,-17 l20,17 l-20,17 Z" fill="#4a86c5" stroke="${INK}" stroke-width="1.2"/>`; return `<svg viewBox="0 0 300 200" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="300" height="200"/>', 6, 8)}<rect x="0" y="0" width="300" height="200" fill="#fff"/><clipPath id="byc"><rect x="0" y="0" width="300" height="200"/></clipPath><g clip-path="url(#byc)">${l}</g><rect x="0" y="0" width="300" height="200" fill="none" stroke="${INK}" stroke-width="5"/></svg>`; };
// letrero de taberna (HTML 0 0 700 420): madera tallada + jarra
function tavernSignSvg() {
  const b = 'M40,90 Q350,40 660,90 L660,380 Q350,410 40,380 Z';
  return `<svg viewBox="0 0 700 420" width="100%" height="100%" style="overflow:visible"><path d="M150,0 V80 M550,0 V80" stroke="${INK}" stroke-width="8"/>${cut(P(b), 8, 10)}${D(b, '#8b5a3a', 7)}<path d="${b}" fill="url(#hW)" opacity=".4"/><path d="M70,110 Q350,70 630,110 L630,356 Q350,382 70,356 Z" fill="none" stroke="${GOLD}" stroke-width="5"/>
  <g transform="translate(560,250)"><rect x="-38" y="-50" width="76" height="100" rx="10" fill="#E9C75C" stroke="${INK}" stroke-width="4"/><path d="M38,-30 q36,0 36,30 q0,30 -36,30" stroke="${INK}" stroke-width="10" fill="none"/><path d="M-40,-50 q20,-26 40,-6 q20,-22 40,6 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M-20,-30 V40 M0,-30 V40 M20,-30 V40" stroke="${INK}" stroke-width="2" opacity=".4"/></g>
  <path d="M90,330 l30,-50 l30,50 Z M150,330 l26,-40 l26,40 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
}

/* ---------- reutilizados: globo (Ep. 12) y losa romana (Ep. 24) ---------- */
function globeInner(phase = 0) {
  const id = uid('gl');
  let s = cut('<circle cx="200" cy="200" r="180"/>') + `<circle cx="200" cy="200" r="180" fill="${SEA2}" stroke="${INK}" stroke-width="6"/>`;
  let cont = '';
  [[-0.4, 120, 60, 50], [0.5, 150, 80, 70], [1.4, 240, 70, 46], [2.3, 160, 50, 80], [3.2, 260, 60, 40], [4.2, 130, 70, 60], [5.2, 230, 50, 50]].forEach(([a, cy, rx, ry]) => { const x = 200 + Math.sin(a + phase) * 150; if (Math.cos(a + phase) > -0.1) cont += `<ellipse cx="${f1(x)}" cy="${cy}" rx="${f1(rx * Math.max(0.2, Math.cos(a + phase)))}" ry="${ry}" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`; });
  s += clipG(id, 'M20,200 A180,180 0 1,0 380,200 A180,180 0 1,0 20,200 Z', cont + `<rect x="0" y="0" width="400" height="400" fill="url(#hP)"/><ellipse cx="250" cy="230" rx="170" ry="190" fill="url(#hA)" opacity=".5"/>`);
  s += `<ellipse cx="200" cy="200" rx="180" ry="56" fill="none" stroke="${INK}" stroke-width="2.5"/><ellipse cx="200" cy="200" rx="70" ry="180" fill="none" stroke="${INK}" stroke-width="2.5"/><path d="M20,200 H380 M200,20 V380" stroke="${INK}" stroke-width="2.5"/>`;
  return s;
}
function romanSlab(pa, x, y, w, h, o = {}) {
  const d = box(pa, x, y, w, h, { zIndex: o.z || 4 });
  const r = rng(o.seed || 31); let cracks = '';
  for (let k = 0; k < 7; k++) { let cx = r() * w, cy = r() * h; cracks += `M${f1(cx)},${f1(cy)}`; for (let j = 0; j < 4; j++) { cx += (r() - 0.5) * 90; cy += r() * 60; cracks += `L${f1(cx)},${f1(cy)}`; } }
  let lines = ''; for (let yy = 70; yy < h - 40; yy += 70) lines += `<path d="M60,${yy} H${w - 60}" stroke="${INK}" stroke-width="2" opacity=".18"/>`;
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="18"/>`)}
   <rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="#D8D1C2" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="url(#hP)" opacity=".7"/>
   <rect x="22" y="22" width="${w - 44}" height="${h - 44}" rx="8" fill="none" stroke="${INK}" stroke-width="4" opacity=".6"/><rect x="34" y="34" width="${w - 68}" height="${h - 68}" rx="6" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
   ${lines}<path d="${cracks}" stroke="${INK}" stroke-width="2.4" fill="none" opacity=".35"/>
   <path d="M${w - 40},20 L${w - 20},20 L${w - 20},${h - 20} L${w - 40},${h - 20} Z" fill="url(#hA)" opacity=".5"/></svg>`;
  return d;
}
