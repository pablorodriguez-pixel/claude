/* Ep. 27 · Garbo — tiempos clave (todo por TEXTO) + figuras nuevas en estilo grabado recortado.
   REGLA: cero esvásticas ni símbolos nazis. Hitler solo como busto de grabado reconocible por flequillo + bigote, chaqueta lisa.
   La Cruz de Hierro va LISA (sin nada en el centro). */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.hitler0 = ws(0); K.troleo0 = ws(2); K.espanol0 = ws(4); K.v27a = ws(6); K.falsas0 = ws(8);
  const i1 = find('juan pujol quiso'); K.juan = ws(i1); K.pujol1 = ws(i1 + 1); K.espiar1 = ws(i1 + 3); K.ingleses = ws(i1 + 6); K.lo1 = ws(i1 + 7); K.dejaron = ws(i1 + 8); K.visto1 = ws(i1 + 10);
  const i2 = find('asi que se hizo espia', i1); K.asi = ws(i2); K.espia2 = ws(i2 + 4); K.de2 = ws(i2 + 5); K.nazis2 = ws(i2 + 7);
  const i3 = find('se queda en lisboa', i2); K.se3 = ws(i3); K.queda = ws(i3 + 1); K.lisboa = ws(i3 + 3); K.y3 = ws(i3 + 4); K.inventa = ws(i3 + 7); K.todo3 = ws(i3 + 8); K.guia = ws(i3 + 11); K.turismo = ws(i3 + 13);
  const i4 = find('se abre cuentas', i3); K.se4 = ws(i4); K.abre = ws(i4 + 1); K.cuentas4 = ws(i4 + 2); K.espias4 = ws(i4 + 3); K.inventados = ws(i4 + 4); K.y4 = ws(i4 + 5); K.cuela = ws(i4 + 6); K.tanto = ws(i4 + 7);
  K.los4 = ws(i4 + 9); K.visto4 = ws(i4 + 11); K.lo4 = ws(i4 + 12); K.fichan = ws(i4 + 13);
  const i5 = find('juntos llegan', i4); K.juntos = ws(i5); K.llegan = ws(i5 + 1); K.v27b = ws(i5 + 3); K.v27bE = wE(i5 + 3); K.una5 = ws(i5 + 4); K.red = ws(i5 + 5); K.bots = ws(i5 + 7); K.con5 = ws(i5 + 8); K.sueldo = ws(i5 + 9); K.nazi5 = ws(i5 + 10);
  const i6 = find('uno se muere', i5); K.uno = ws(i6); K.muere = ws(i6 + 2); K.y6 = ws(i6 + 3); K.nazis6 = ws(i6 + 5); K.pension = ws(i6 + 6); K.viuda = ws(i6 + 9); K.de6 = ws(i6 + 10); K.senor = ws(i6 + 12); K.existia = ws(i6 + 15);
  const i7 = find('dia d pujol', i6); K.dia = ws(i7); K.D = ws(i7 + 1); K.pujol7 = ws(i7 + 2); K.avisa = ws(i7 + 3); K.normandia = ws(i7 + 4); K.distraccion = ws(i7 + 7); K.lo7 = ws(i7 + 8); K.gordo = ws(i7 + 9); K.calais7 = ws(i7 + 11);
  const i8 = find('hitler se lo traga', i7); K.hitler8 = ws(i8); K.traga = ws(i8 + 3); K.deja = ws(i8 + 4); K.tropas = ws(i8 + 5); K.calais8 = ws(i8 + 7); K.esperando = ws(i8 + 8); K.nadie = ws(i8 + 10);
  const i9 = find('premio la cruz', i8); K.premio = ws(i9); K.la9 = ws(i9 + 1); K.cruz = ws(i9 + 2); K.hierro = ws(i9 + 4); K.nazi9 = ws(i9 + 5); K.y9 = ws(i9 + 6); K.rey = ws(i9 + 8); K.ingles9 = ws(i9 + 9); K.otra = ws(i9 + 10); K.medalla = ws(i9 + 11);
  const i10 = find('dos medallas de los dos bandos', i9); K.dos = ws(i10); K.medallas = ws(i10 + 1); K.dos2 = ws(i10 + 4); K.bandos = ws(i10 + 5); K.por10 = ws(i10 + 6); K.mismo10 = ws(i10 + 8); K.troleo10 = ws(i10 + 9);
  const i11 = find('y luego fingio', i10); K.y11 = ws(i11); K.fingio = ws(i11 + 2); K.muerte = ws(i11 + 4); K.su11 = ws(i11 + 5); K.ultima = ws(i11 + 6); K.cuenta11 = ws(i11 + 7); K.falsa11 = ws(i11 + 8); K.el11 = ws(i11 + 9); K.mismo11 = ws(i11 + 10);
  const i12 = find('y tu cuantas', i11); K.y12 = ws(i12); K.tu12 = ws(i12 + 1); K.cuantas = ws(i12 + 2); K.cuentas12 = ws(i12 + 3); K.tienes = ws(i12 + 4); K.os = ws(i12 + 5); K.leo = ws(i12 + 6);
  const is = find('soy tu vecino', i12); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = find('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena (una frase = un plano; un plano nuevo cada 1–2,5 s) */
const S = {
  A: [-1, K.juan - 0.08],
  B1: [K.juan - 0.08, K.lo1 - 0.06], B2: [K.lo1 - 0.06, K.asi - 0.08],
  C1: [K.asi - 0.08, K.de2 - 0.06], C2: [K.de2 - 0.06, K.se3 - 0.08],
  D1: [K.se3 - 0.08, K.y3 - 0.06], D2: [K.y3 - 0.06, K.se4 - 0.08],
  E1: [K.se4 - 0.08, K.y4 - 0.08], E2: [K.y4 - 0.08, K.los4 - 0.06], E3: [K.los4 - 0.06, K.juntos - 0.08],
  F: [K.juntos - 0.08, K.uno - 0.08],
  G1: [K.uno - 0.08, K.y6 - 0.08], G2: [K.y6 - 0.08, K.de6 - 0.06], G3: [K.de6 - 0.06, K.dia - 0.08],
  H1: [K.dia - 0.08, K.normandia - 0.08], H2: [K.normandia - 0.08, K.lo7 - 0.06], H3: [K.lo7 - 0.06, K.hitler8 - 0.08],
  I1: [K.hitler8 - 0.08, K.deja - 0.06], I2: [K.deja - 0.06, K.esperando - 0.06], I3: [K.esperando - 0.06, K.premio - 0.08],
  J1: [K.premio - 0.08, K.la9 - 0.06], J2: [K.la9 - 0.06, K.y9 - 0.06], J3: [K.y9 - 0.06, K.dos - 0.08],
  K1: [K.dos - 0.08, K.por10 - 0.06], K2: [K.por10 - 0.06, K.y11 - 0.08],
  L1: [K.y11 - 0.08, K.su11 - 0.08], L2: [K.su11 - 0.08, K.y12 - 0.08],
  M: [K.y12 - 0.08, K.soy - 0.1],
  BAL: [K.soy - 0.1, K.enL - 0.04], BK: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- personajes nuevos (busto 360x460) ---------- */
const BOWLER = (col = '#1e1a17') => {
  const crown = 'M118,158 C114,98 146,78 180,78 C214,78 246,98 242,158 Z', brim = 'M78,160 Q86,138 118,150 Q180,138 242,150 Q274,138 282,160 Q180,180 78,160 Z';
  return cut(P(crown) + P(brim), 4, 6) + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".35"/><path d="M119,138 Q180,126 241,138 L242,154 Q180,142 118,154 Z" fill="#3a3330" stroke="${INK}" stroke-width="2.5"/>` + D(brim, col, 4) + `<path d="M150,94 Q138,112 140,136" stroke="#fff" stroke-width="4" opacity=".3" fill="none"/>`;
};
const FEDORA = (col = '#4a3a2c') => {
  const crown = 'M120,160 L126,104 Q152,84 180,102 Q208,84 234,104 L240,160 Z', brim = 'M54,166 Q180,128 306,166 Q296,190 180,174 Q64,190 54,166 Z';
  return cut(P(crown) + P(brim), 4, 6) + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".4"/><path d="M121,138 L239,138 L240,158 L120,158 Z" fill="${INK}"/>` + D(brim, col, 4) + HF(brim, 'hB');
};
const SHADES = () => `<path d="M136,192 h42 v14 q0,14 -21,14 q-21,0 -21,-14 Z M182,192 h42 v14 q0,14 -21,14 q-21,0 -21,-14 Z" fill="${INK}"/><path d="M176,198 h8 M136,196 L116,190 M224,196 L244,190" stroke="${INK}" stroke-width="4"/><path d="M144,198 l12,0 M190,198 l12,0" stroke="#fff" stroke-width="3" opacity=".55"/>`;
const TIE = (col = RED) => `<path d="M172,334 L188,334 L194,420 L180,438 L166,420 Z" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M172,334 L188,334 L184,350 L176,350 Z" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
// Juan Pujol «Garbo»: pelo engominado con entradas, bigotito fino, traje y corbata
const pujolHair = () => { const h = 'M116,206 C108,148 140,122 182,122 C226,122 254,148 246,206 C240,172 226,154 204,148 C182,142 156,146 138,164 C126,176 120,190 116,206 Z'; return D(h, '#8a5a34') + HF(h, 'hF') + `<path d="M150,140 Q180,130 214,140" stroke="#fff" stroke-width="2.5" opacity=".35" fill="none"/>`; };
const thinMou = () => `<path d="M154,242 Q180,230 206,242 Q180,248 154,242 Z" fill="${INK}"/>`;
function pujolInner(o = {}) {
  let s = bustInner({ uniform: 'soldier', seed: 27 }) + coatOver(o.spy ? '#3d3328' : '#9b7b55') + TIE(o.tie || RED);
  s += pujolHair() + thinMou();
  if (o.spy) s += SHADES() + FEDORA();
  return s;
}
// silueta reconocible: flequillo caído + bigote de cepillo, chaqueta lisa SIN insignias
function hitlerInner() {
  let s = bustInner({ uniform: 'soldier', seed: 33 }) + coatOver('#5b5446') + TIE('#3a332a');
  const h = 'M112,208 C102,146 140,116 184,116 C232,116 258,146 248,206 C246,184 240,168 228,160 C204,170 168,186 124,214 Z';
  s += D(h, '#1a140f') + HF(h, 'hF') + `<path d="M226,162 C200,172 166,188 128,212" stroke="#fff" stroke-width="2" opacity=".3" fill="none"/>`;
  s += `<rect x="166" y="236" width="28" height="15" rx="2" fill="${INK}"/>`;
  return s;
}
// oficial alemán: gorra de plato LISA (se quita el emblema de la plantilla)
function officerInner(seed = 12) { return bustInner({ hat: 'cap', uniform: 'officer', moustache: true, seed }).replace('M182,128 v24 M170,140 h24', 'M182,140 h0'); }
// caballeros ingleses con bombín
function britInner(seed = 41, v = 0) {
  let s = bustInner({ uniform: 'soldier', moustache: v !== 1, seed }) + coatOver(['#2f241c', '#3a3a44'][v % 2]) + BOWTIE(INK);
  if (v === 0) s += `<circle cx="204" cy="204" r="20" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="4"/><path d="M224,206 q10,30 2,60" stroke="${BRASS}" stroke-width="3" fill="none"/>`;
  return s + BOWLER();
}

/* ---------- avatares de bot (sin cara, sin nombre real) ---------- */
const BOTC = ['#C9B48E', '#B9A07A', '#D4C3A0', '#A99272', '#CDBB95'];
function botAv(pa, x, y, sz, k = 0, o = {}) {
  const d = box(pa, x, y, sz, sz, { zIndex: o.z || 10 });
  const id = uid('bt');
  d.innerHTML = `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}" style="overflow:visible;display:block">
   <circle cx="54" cy="55" r="46" fill="${SH}"/><clipPath id="${id}"><circle cx="50" cy="50" r="46"/></clipPath>
   <circle cx="50" cy="50" r="46" fill="${BOTC[k % 5]}"/>
   <g clip-path="url(#${id})"><circle cx="50" cy="40" r="17" fill="#7a6650"/><path d="M14,100 C16,72 32,62 50,62 C68,62 84,72 86,100 Z" fill="#7a6650"/><rect x="0" y="0" width="100" height="100" fill="url(#hA)" opacity=".35"/>
   <text x="50" y="47" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="22" fill="${FIG}">?</text></g>
   <circle cx="50" cy="50" r="46" fill="none" stroke="${INK}" stroke-width="5"/></svg>`;
  const glow = box(d, -sz * 0.12, -sz * 0.12, sz * 1.24, sz * 1.24, { borderRadius: '50%', border: `${Math.max(4, sz * 0.06)}px solid ${YEL}`, zIndex: -1, opacity: 0 });
  return { d, glow };
}
// avatar con el busto de Pujol recortado en círculo
function pujolAv(pa, x, y, sz, o = {}) {
  const d = box(pa, x, y, sz, sz, { borderRadius: '50%', overflow: 'hidden', background: o.bg || '#F2D9A0', border: `${o.bw || 6}px solid ${INK}`, boxShadow: `6px 6px 0 ${SH}`, zIndex: o.z || 12 });
  const k = sz / 200;
  const f = mk(d, [-108 * k, -70 * k, 396 * k, 506 * k], pujolInner(o), '0 0 360 460', 'bust');
  return { d, f };
}
// lazo negro de luto (HTML 60x70)
const ribbonSvg = () => `<svg viewBox="0 0 60 70" width="100%" height="100%" style="overflow:visible"><path d="M30,26 L10,68 L22,62 L28,70 L32,30 Z M30,26 L50,68 L38,62 L32,70 L28,30 Z" fill="#111" stroke="#fff" stroke-width="2.5"/><path d="M30,26 C14,4 2,14 8,24 C14,34 26,30 30,26 Z M30,26 C46,4 58,14 52,24 C46,34 34,30 30,26 Z" fill="#111" stroke="#fff" stroke-width="2.5"/><circle cx="30" cy="26" r="7" fill="#111" stroke="#fff" stroke-width="2.5"/></svg>`;

/* ---------- tarjeta de perfil de red social (grabado, sin logos reales) 600x520 ---------- */
function profCard(pa, x, y, o = {}) {
  const W0 = o.w || 600, H0 = 500;
  const d = box(pa, x, y, W0, H0, { zIndex: o.z || 20 });
  const bg = box(d, 0, 0, W0, H0, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '34px', boxShadow: `12px 14px 0 ${SH}` });
  box(bg, 0, 0, W0 - 14, 120, { background: 'repeating-linear-gradient(135deg, #E9C75C 0 14px, #F2D9A0 14px 28px)', borderRadius: '27px 27px 0 0', borderBottom: `5px solid ${INK}` });
  const av = pujolAv(d, 30, 44, 190, { z: 22 });
  const stats = el('div', d, { left: '230px', top: '140px', width: `${W0 - 250}px`, display: 'flex', justifyContent: 'space-between', gap: '12px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '22px', color: '#5a4a3a', zIndex: 23, textAlign: 'center', lineHeight: 1.05 },
    `<div><span style="font-size:54px;color:${INK}">27</span><br>cuentas</div><div><span style="font-size:54px;color:${INK}">0</span><br>personas</div><div><span style="font-size:54px;color:${INK}">1</span><br>señor</div>`);
  const handle = el('div', d, { left: '34px', top: '252px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '54px', color: INK, whiteSpace: 'nowrap', zIndex: 23 }, '@juan_pujol_27');
  el('div', d, { left: '36px', top: '326px', fontFamily: 'SpecialElite', fontSize: '32px', color: '#5a4a3a', whiteSpace: 'nowrap', zIndex: 23 }, 'espía · o eso dicen');
  const btn = el('div', d, { left: '34px', top: '392px', width: `${W0 - 82}px`, height: '66px', lineHeight: '66px', textAlign: 'center', background: INK, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', borderRadius: '100px', zIndex: 23 }, '+ Seguir');
  return { d, av, handle, stats, btn };
}

/* ---------- mapa de Europa (Lisboa · Londres · Berlín) ---------- */
const mpE = (lo, la) => [f1(150 + (lo + 10) * 32), f1(500 + (56 - la) * 40)];
const mpPath = a => 'M' + a.map(q => mpE(q[0], q[1]).join(',')).join('L') + 'Z';
const IRL = [[-10, 51.6], [-6, 52], [-6, 53.9], [-5.6, 54.6], [-7.3, 55.3], [-8.5, 54.3], [-10, 54.2], [-9.5, 53]];
function euroMapSvg() {
  const eu = mpPath(EUR), id = uid('em');
  let s = cut(P(eu) + P(mpPath(UK)) + P(mpPath(IRL)), 9, 11);
  s += D(eu, FIG, 6) + D(mpPath(UK), '#F4E4C0', 5) + D(mpPath(IRL), FIG, 4);
  s += clipG(id, eu, `<rect x="-200" y="0" width="1400" height="1920" fill="url(#hP)"/>`);
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
/* ---------- mapa del Canal de la Mancha (Normandía · Calais) ---------- */
const mpC = (lo, la) => [f1(60 + (lo + 5) * 105), f1(300 + (53 - la) * 170)];
const mcPath = a => 'M' + a.map(q => mpC(q[0], q[1]).join(',')).join('L') + 'Z';
const FRN = [[-6, 48.4], [-4.7, 48.4], [-3, 48.8], [-1.6, 48.65], [-1.6, 49.2], [-1.9, 49.7], [-1.3, 49.7], [-1.1, 49.4], [-0.5, 49.35], [0.1, 49.3], [0.2, 49.45], [1.0, 49.9], [1.6, 50.2], [1.6, 50.7], [1.86, 50.95], [2.5, 51.1], [4, 51.4], [6, 51.6], [6, 46], [-6, 46]];
const ENG = [[-6, 50.05], [-5.7, 50.05], [-4.2, 50.35], [-3.4, 50.6], [-2.4, 50.6], [-1.3, 50.8], [0.2, 50.75], [1.0, 50.95], [1.4, 51.15], [1.4, 51.4], [0.6, 51.5], [1.7, 52.2], [1.7, 53.5], [-6, 53.5]];
function channelSvg() {
  const fr = mcPath(FRN), en = mcPath(ENG), id = uid('ch');
  let s = cut(P(fr) + P(en), 9, 11) + D(fr, FIG, 6) + D(en, '#F4E4C0', 6);
  s += clipG(id, fr, `<rect x="-200" y="0" width="1400" height="1920" fill="url(#hP)"/>`);
  let wv = ''; for (let k = 0; k < 9; k++) { const x = 120 + (k % 3) * 300 + (k % 2) * 60, y = 760 + Math.floor(k / 3) * 70; wv += `<path d="M${x},${y} q20,-12 40,0 q20,12 40,0" stroke="${INK}" stroke-width="3" fill="none" opacity=".35"/>`; }
  s += wv + `<text x="${mpC(-2.6, 51.25)[0]}" y="${mpC(-2.6, 51.25)[1]}" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}" opacity=".7">INGLATERRA</text><text x="${mpC(0, 47.5)[0]}" y="${mpC(0, 47.5)[1]}" text-anchor="middle" font-family="Rye" font-size="46" fill="${INK}" opacity=".7">FRANCIA</text>`;
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}
// barquito de desembarco (HTML 120x80)
const boatSvg = () => `<svg viewBox="0 0 120 80" width="100%" height="100%" style="overflow:visible"><path d="M8,40 L112,40 L98,70 L20,70 Z" fill="${SH}" transform="translate(5,6)"/><path d="M8,40 L112,40 L98,70 L20,70 Z" fill="#7a8a7a" stroke="${INK}" stroke-width="4"/><path d="M8,40 L112,40 L98,70 L20,70 Z" fill="url(#hA)" opacity=".4"/><rect x="40" y="20" width="36" height="22" fill="#9aa89a" stroke="${INK}" stroke-width="4"/><path d="M58,20 V4" stroke="${INK}" stroke-width="4"/></svg>`;
// ficha de soldado (HTML 70x90): casco + cuerpo, gris liso
const pawnSvg = () => `<svg viewBox="0 0 70 90" width="100%" height="100%" style="overflow:visible"><ellipse cx="38" cy="86" rx="28" ry="6" fill="${SH}"/><path d="M14,86 C16,60 24,52 35,52 C46,52 54,60 56,86 Z" fill="#6f7466" stroke="${INK}" stroke-width="4"/><circle cx="35" cy="38" r="15" fill="${FIG}" stroke="${INK}" stroke-width="4"/><path d="M14,36 Q35,4 56,36 Z" fill="#5a5f52" stroke="${INK}" stroke-width="4"/><circle cx="30" cy="41" r="2.5" fill="${INK}"/><circle cx="40" cy="41" r="2.5" fill="${INK}"/></svg>`;

/* ---------- medallas ---------- */
// Cruz de Hierro LISA: cruz patada negra con borde plateado, centro VACÍO
function ironCrossSvg() {
  const arm = 'M100,100 L76,14 Q100,24 124,14 Z';
  const arms = [0, 90, 180, 270].map(a => `<path d="${arm}" transform="rotate(${a} 100 100)"/>`).join('');
  return `<svg viewBox="0 0 200 200" width="100%" height="100%" style="overflow:visible"><g fill="${SH}" transform="translate(8,9)">${arms}</g><g fill="#d8d6cc" stroke="${INK}" stroke-width="4" stroke-linejoin="round">${arms}</g><g fill="#1b1714" transform="translate(100 100) scale(.82) translate(-100 -100)">${arms}</g><path d="M70,40 L80,64" stroke="#fff" stroke-width="3" opacity=".35"/></svg>`;
}
// MBE: cruz plateada con medallón dorado, cinta rosa con bordes gris perla
function mbeSvg() {
  const arm = 'M100,100 L80,22 Q100,30 120,22 Z';
  const arms = [0, 90, 180, 270].map(a => `<path d="${arm}" transform="rotate(${a} 100 100)"/>`).join('');
  return `<svg viewBox="0 0 200 200" width="100%" height="100%" style="overflow:visible"><g fill="${SH}" transform="translate(8,9)">${arms}</g><g fill="#E8E6DE" stroke="${INK}" stroke-width="4" stroke-linejoin="round">${arms}</g><g fill="url(#hA)" opacity=".35">${arms}</g><circle cx="100" cy="100" r="30" fill="#E9C75C" stroke="${INK}" stroke-width="4"/><circle cx="100" cy="100" r="20" fill="none" stroke="${INK}" stroke-width="2"/></svg>`;
}
const ribbonBar = (cols) => `<svg viewBox="0 0 100 120" width="100%" height="100%" style="overflow:visible"><path d="M6,0 H94 V100 L50,120 L6,100 Z" fill="${SH}" transform="translate(6,6)"/>${cols.map((c, i) => `<rect x="${6 + i * 88 / cols.length}" y="0" width="${88 / cols.length + 0.5}" height="110" fill="${c}"/>`).join('')}<path d="M6,0 H94 V100 L50,120 L6,100 Z" fill="none" stroke="${INK}" stroke-width="4"/><path d="M6,100 L50,120 L94,100 V120 H6 Z" fill="${PAPER}"/></svg>`;
// corona genérica (HTML 260x180)
const crownSvg = () => `<svg viewBox="0 0 260 180" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,150 L10,40 L70,90 L130,20 L190,90 L250,40 L240,150 Z"/>', 6, 8)}<path d="M20,150 L10,40 L70,90 L130,20 L190,90 L250,40 L240,150 Z" fill="#E9C75C" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M20,150 L10,40 L70,90 L130,20 L190,90 L250,40 L240,150 Z" fill="url(#hA)" opacity=".35"/><rect x="16" y="130" width="228" height="34" rx="6" fill="#E9C75C" stroke="${INK}" stroke-width="6"/>${[10, 130, 250].map(x => `<circle cx="${x}" cy="${x === 130 ? 20 : 40}" r="13" fill="${PINK}" stroke="${INK}" stroke-width="4"/>`).join('')}<circle cx="80" cy="147" r="9" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="130" cy="147" r="9" fill="#5a8ac5" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="147" r="9" fill="${RED}" stroke="${INK}" stroke-width="3"/></svg>`;
// lupa (HTML 260x260)
const lupaSvg = () => `<svg viewBox="0 0 260 260" width="100%" height="100%" style="overflow:visible"><path d="M160,160 L240,240" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M160,160 L240,240" stroke="${WOOD}" stroke-width="20" stroke-linecap="round"/><circle cx="100" cy="100" r="86" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="16"/><circle cx="100" cy="100" r="86" fill="none" stroke="${BRASS}" stroke-width="8"/><path d="M50,70 Q70,40 104,36" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
// sobre (HTML 300x200)
const envSvg = (txt, col = '#F4E4C0') => `<svg viewBox="0 0 300 200" width="100%" height="100%" style="overflow:visible"><rect x="10" y="12" width="290" height="190" rx="10" fill="${SH}"/><rect x="0" y="0" width="290" height="190" rx="10" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M0,0 L145,110 L290,0" fill="none" stroke="${INK}" stroke-width="5"/><text x="145" y="168" text-anchor="middle" font-family="Rye" font-size="38" fill="${RED}">${txt}</text></svg>`;
// taza de té (HTML 120x110)
const teaSvg = () => `<svg viewBox="0 0 120 110" width="100%" height="100%" style="overflow:visible"><ellipse cx="60" cy="100" rx="56" ry="10" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M18,40 L102,40 Q98,96 60,96 Q22,96 18,40 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M102,52 Q122,52 118,68 Q114,82 98,78" fill="none" stroke="${INK}" stroke-width="5"/><ellipse cx="60" cy="40" rx="42" ry="8" fill="#9a5a2a" stroke="${INK}" stroke-width="4"/><path d="M40,30 q6,-12 0,-24 M64,30 q6,-12 0,-24" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/></svg>`;
// gaviota (HTML 120x60)
const gullSvg = () => `<svg viewBox="0 0 120 60" width="100%" height="100%" style="overflow:visible"><path d="M4,30 Q30,0 60,30 Q90,0 116,30" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
// pelota de playa (HTML 110x110)
const ballSvg = () => `<svg viewBox="0 0 110 110" width="100%" height="100%" style="overflow:visible"><circle cx="58" cy="60" r="48" fill="${SH}"/><circle cx="54" cy="54" r="48" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M54,6 Q20,54 54,102 Z" fill="${RED}"/><path d="M54,6 Q88,54 54,102 Z" fill="${YEL}"/><circle cx="54" cy="54" r="48" fill="none" stroke="${INK}" stroke-width="5"/><path d="M54,6 Q20,54 54,102 M54,6 Q88,54 54,102" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
// regalo (HTML 300x300)
const giftSvg = () => `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible">${cut('<rect x="30" y="110" width="240" height="180"/>', 8, 10)}<rect x="30" y="110" width="240" height="180" fill="${PINK}" stroke="${INK}" stroke-width="6"/><rect x="30" y="110" width="240" height="180" fill="url(#hA)" opacity=".25"/><rect x="18" y="80" width="264" height="50" fill="${PINK}" stroke="${INK}" stroke-width="6"/><rect x="132" y="80" width="36" height="210" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="M150,80 C110,20 60,40 90,74 Z M150,80 C190,20 240,40 210,74 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/></svg>`;
// puerta (HTML 300x520)
const doorSvg = (plate = '') => `<svg viewBox="0 0 300 520" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="300" height="520"/>', 8, 10)}<rect x="0" y="0" width="300" height="520" fill="#7a4a26" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="300" height="520" fill="url(#hW)" opacity=".25"/><rect x="34" y="40" width="232" height="190" rx="6" fill="none" stroke="${INK}" stroke-width="5"/><rect x="34" y="270" width="232" height="210" rx="6" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="252" cy="262" r="13" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>${plate ? `<rect x="60" y="110" width="180" height="56" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><text x="150" y="148" text-anchor="middle" font-family="Rye" font-size="26" fill="${INK}">${plate}</text>` : ''}</svg>`;
// máquina de teletipo (HTML 520x300)
const telexSvg = () => `<svg viewBox="0 0 520 300" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,90 L500,90 L520,290 L0,290 Z"/>', 8, 10)}<path d="M20,90 L500,90 L520,290 L0,290 Z" fill="#5f6a5c" stroke="${INK}" stroke-width="6"/><path d="M20,90 L500,90 L520,290 L0,290 Z" fill="url(#hA)" opacity=".3"/><rect x="130" y="40" width="260" height="60" rx="10" fill="#444b40" stroke="${INK}" stroke-width="6"/>${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(c => `<circle cx="${70 + c * 48 + r * 12}" cy="${160 + r * 40}" r="15" fill="${FIG}" stroke="${INK}" stroke-width="4"/>`).join('')).join('')}</svg>`;
