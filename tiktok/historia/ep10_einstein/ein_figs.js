/* Ep. 10 · Einstein — figuras nuevas en el estilo de grabado recortado de la serie */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = fw('einstein nunca suspendio');
  K.no1 = ws(1); K.no2 = ws(3); K.ein = ws(i0); K.nunca = ws(i0 + 1); K.susp0 = ws(i0 + 2); K.mat0 = ws(i0 + 3);
  const ic = fw('colado'); K.colado = ws(ic); K.vida = ws(fw('toda la vida') + 2); K.L0e = wE(fw('toda la vida') + 2);
  const iy = fw('y el mismo lo desmintio'); K.L1 = ws(iy); K.mismo = ws(iy + 2); K.desm = ws(iy + 4); K.L1e = wE(iy + 4);
  const is = fw('soy tu vecino'); K.L2 = ws(is); K.signW = is + 4; K.libro0 = ws(is + 9); K.L2e = wE(is + 9);
  const ie = fw('entonces de donde sale el bulo'); K.L3 = ws(ie); K.bulo = ws(ie + 5); K.dosC = ws(ie + 7); K.cosas = ws(ie + 8); K.L3e = wE(ie + 8);
  const iu = fw('una un periodico'); K.L4 = ws(iu); K.periodico = ws(iu + 2);
  const im = fw('en mil novecientos'); K.en35 = ws(im); K.mil = ws(im + 1); K.cinco = wE(im + 5);
  const isc = fw('una seccion de curiosidades'); K.seccion = ws(isc + 1); K.curios = ws(isc + 3);
  const ia = fw('aunque usted no lo crea'); K.aunque = ws(ia); K.usted = ws(ia + 1); K.nolo = ws(ia + 2); K.crea = ws(ia + 4);
  const ip = fw('publico que el mayor genio'); K.publico = ws(ip); K.mayor = ws(ip + 3); K.genio = ws(ip + 4); K.mundo = ws(ip + 6);
  const ih = fw('habia suspendido matematicas'); K.habia = ws(ih); K.susp1 = ws(ih + 1); K.mat1 = ws(ih + 2); K.L4e = wE(ih + 2);
  const il = fw('einstein lo leyo y contesto'); K.L5 = ws(il); K.leyo = ws(il + 2); K.contesto = ws(il + 4);
  const in2 = fw('nunca suspendi en matematicas'); K.nunca2 = ws(in2); K.suspendi = ws(in2 + 1); K.en2 = ws(in2 + 2); K.mat2 = ws(in2 + 3); K.mat2e = wE(in2 + 3);
  const ian = fw('antes de los quince anos'); K.antes = ws(ian); K.quince = ws(ian + 3); K.anos15 = ws(ian + 4);
  const ica = fw('ya dominaba el calculo'); K.ya = ws(ica); K.dominaba = ws(ica + 1); K.calc = ws(ica + 3); K.L5e = wE(ica + 3);
  const id2 = fw('dos un examen de verdad'); K.L6 = ws(id2); K.examen = ws(id2 + 2); K.verdad = ws(id2 + 4);
  const i16 = fw('con dieciseis anos'); K.con16 = ws(i16); K.dieci = ws(i16 + 1); K.anos16 = ws(i16 + 2);
  const idm = fw('dos menos de lo normal'); K.dosm = ws(idm); K.menos = ws(idm + 1); K.normal = ws(idm + 4);
  const ipr = fw('se presento al acceso'); K.presento = ws(ipr + 1); K.acceso = ws(ipr + 3);
  const ipo = fw('politecnico de zurich'); K.poli = ws(ipo); K.zurich = ws(ipo + 2);
  const iys = fw('y suspendio'); K.ysusp = ws(iys); K.susp2 = ws(iys + 1); K.L6e = wE(iys + 1);
  const ipe = fw('pero en matematicas y fisica'); K.L7 = ws(ipe); K.mat3 = ws(ipe + 2); K.fisica = ws(ipe + 4); K.notazas = ws(ipe + 5);
  const ilq = fw('lo que le fallo fue lo demas'); K.loque = ws(ilq); K.fallo = ws(ilq + 3); K.demas = ws(ilq + 6);
  const ipj = fw('por ejemplo'); K.por = ws(ipj); K.ejemplo = ws(ipj + 1); K.frances1 = ws(ipj + 3); K.L7e = wE(ipj + 3);
  const io = fw('ojo hay quien dice'); K.ojo = ws(io); K.hay = ws(io + 1); K.dice = ws(io + 3);
  const ico = fw('en su colegio'); K.colegio = ws(ico + 2);
  const i6 = fw('el seis era la nota mas alta'); K.elseis = ws(i6); K.seis = ws(i6 + 1); K.nota = ws(i6 + 4); K.masalta = ws(i6 + 5); K.alta = ws(i6 + 6);
  const ia2 = fw('y que alguien lo confundio con un suspenso'); K.yque = ws(ia2); K.alguien = ws(ia2 + 2); K.confundio = ws(ia2 + 4); K.suspenso = ws(ia2 + 7);
  const ipd = fw('pero eso no esta demostrado'); K.pero2 = ws(ipd); K.noesta = ws(ipd + 2); K.demostrado = ws(ipd + 4); K.L8e = wE(ipd + 4);
  const ios = fw('o sea el genio no suspendia'); K.L9 = ws(ios); K.osea = ws(ios + 1); K.elgenio = ws(ios + 2); K.genio2 = ws(ios + 3); K.no9 = ws(ios + 4); K.suspendia = ws(ios + 5); K.mat4 = ws(ios + 6);
  const isf = fw('suspendia frances'); K.suspendia2 = ws(isf); K.frances2 = ws(isf + 1); K.L9e = wE(isf + 1);
  const it = fw('tu tambien te lo habias creido'); K.L10 = ws(it); K.creido = ws(it + 5);
  const idi = fw('dime si o no'); K.dime = ws(idi); K.si = ws(idi + 1); K.o = ws(idi + 2); K.noB = ws(idi + 3); K.L10e = wE(idi + 3);
  const iye = fw('y esto no venia en el libro', it); K.L11 = ws(iye); K.esto = ws(iye + 1); K.noV = ws(iye + 2); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, (K.L0e + K.L1) / 2], B: [(K.L0e + K.L1) / 2, K.L2 - 0.18], C: [K.L2 - 0.18, K.L3 - 0.12],
  D: [K.L3 - 0.12, K.L4 - 0.06], E1: [K.L4 - 0.06, K.en35 - 0.08], E2: [K.en35 - 0.08, K.aunque - 0.04], E3: [K.aunque - 0.04, K.publico - 0.06],
  E4: [K.publico - 0.06, K.L5 - 0.1], F1: [K.L5 - 0.1, K.nunca2 - 0.12], F2: [K.nunca2 - 0.12, K.antes - 0.12], F3: [K.antes - 0.12, K.L6 - 0.1],
  G1: [K.L6 - 0.1, K.con16 - 0.1], G2: [K.con16 - 0.1, K.presento - 0.1], G3: [K.presento - 0.1, K.L7 - 0.1],
  H1: [K.L7 - 0.1, K.loque - 0.04], H2: [K.loque - 0.04, K.frances1 - 0.1], HIT1: [K.frances1 - 0.1, K.ojo - 0.06],
  I1: [K.ojo - 0.06, K.elseis - 0.08], I2: [K.elseis - 0.08, K.yque - 0.08], I3: [K.yque - 0.08, K.pero2 - 0.08], I4: [K.pero2 - 0.08, K.L9 - 0.08],
  J1: [K.L9 - 0.08, K.suspendia2 - 0.15], HIT2: [K.suspendia2 - 0.15, K.L10 - 0.08], CTA: [K.L10 - 0.08, K.L11 - 0.06],
  L1: [K.L11 - 0.06, K.noV - 0.06], L2: [K.noV - 0.06, K.END + 0.02], CARD: [K.END + 0.02, 999],
};

/* ---------- EINSTEIN (busto de grabado, viewBox 0 0 360 460) ---------- */
function einsteinInner(o = {}) {
  const young = !!o.young, r = rng(o.seed || 1905), id = uid('ei');
  const HAIR = young ? '#3a2a1e' : '#F4F0E6', HAIRL = young ? '#6b5a4a' : INK;
  // melena alocada (detrás de la cabeza)
  const N = young ? 40 : 54, pts = [];
  const cx = 180, cy = young ? 182 : 186, rx = young ? 86 : 124, ry = young ? 72 : 108;
  for (let i = 0; i < N; i++) {
    const a = Math.PI * 2 * i / N, up = Math.max(0, -Math.sin(a));
    const sp = i % 2 ? 1 + (young ? 0.05 : 0.12 + 0.12 * up) + r() * (young ? 0.04 : 0.12) : 0.9 + r() * 0.05;
    pts.push([cx + Math.cos(a + (r() - .5) * 0.05) * rx * sp, cy + Math.sin(a) * ry * sp]);
  }
  const mane = 'M' + pts.map(q => f1(q[0]) + ',' + f1(q[1])).join('L') + 'Z';
  let st = '';
  for (let k = 0; k < (young ? 26 : 70); k++) {
    const a = r() * Math.PI * 2, r0 = 0.62 + r() * 0.2, r1 = 0.92 + r() * 0.16, bend = (r() - .5) * 0.5;
    const x0 = cx + Math.cos(a) * rx * r0, y0 = cy + Math.sin(a) * ry * r0, x1 = cx + Math.cos(a + bend * 0.3) * rx * r1, y1 = cy + Math.sin(a + bend * 0.3) * ry * r1;
    const xm = cx + Math.cos(a + bend) * rx * (r0 + r1) / 2, ym = cy + Math.sin(a + bend) * ry * (r0 + r1) / 2;
    st += `M${f1(x0)},${f1(y0)}Q${f1(xm)},${f1(ym)} ${f1(x1)},${f1(y1)}`;
  }
  let s = cut(P(mane), 6, 8) + D(mane, HAIR, 3.5) + clipG(id + 'm', mane, `<ellipse cx="${cx + 60}" cy="${cy + 40}" rx="${rx * 0.8}" ry="${ry * 0.9}" fill="url(#hA)" opacity="${young ? 0.5 : 0.75}"/>`);
  s += `<path d="${st}" stroke="${HAIRL}" stroke-width="${young ? 1.8 : 2.2}" fill="none" stroke-linecap="round" opacity="${young ? .6 : .85}"/>`;
  // busto base (sin las cejas finas del kit)
  s += bustInner({ uniform: 'soldier', seed: young ? 61 : 62 }).replace(/<path class="brow"[^>]*\/>/, '');
  s += coatOver(young ? '#3a2f26' : '#6b5a4a');
  s += `<path d="M172,336 L188,336 L194,420 L180,438 L166,420 Z" fill="${young ? RED : INK}" stroke="${INK}" stroke-width="2.5"/>`;
  // flequillo / línea del pelo
  const cap = young ? 'M124,184 C116,140 146,120 180,120 C214,120 244,140 236,184 C228,164 212,152 196,156 C186,146 172,146 162,158 C148,154 132,164 124,184 Z'
    : 'M122,178 C116,138 142,118 180,118 C218,118 244,138 238,178 C232,160 220,150 206,152 C196,140 166,140 154,152 C142,150 128,162 122,178 Z';
  s += D(cap, HAIR, 3) + `<path d="M140,150 q-6,-26 -24,-38 M160,140 q-2,-28 -14,-44 M184,136 q4,-30 -2,-52 M206,140 q12,-26 10,-48 M226,152 q18,-20 26,-40" stroke="${INK}" stroke-width="${young ? 0 : 2.4}" fill="none" stroke-linecap="round"/>`;
  // arrugas y ojeras
  if (!young) s += `<path d="M142,218 q14,8 28,0 M190,218 q14,8 28,0 M146,226 q-10,14 -6,30 M214,226 q10,14 6,30" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  // cejas pobladas (móviles)
  const brow = `<path d="M132,192 Q138,170 158,170 Q176,172 180,188 Q162,180 132,192 Z" fill="${HAIR}" stroke="${INK}" stroke-width="2.6"/><path d="M140,184 l6,-8 M150,180 l4,-9 M160,179 l3,-8 M170,181 l2,-7" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<g class="browL">${brow}</g><g class="browR"><g transform="translate(360,0) scale(-1,1)">${brow}</g></g>`;
  // bigote
  if (!young) {
    const m = 'M180,232 C166,224 144,224 132,236 C122,246 122,260 132,266 C142,258 156,254 168,256 C174,257 178,258 180,258 Z';
    const ms = `<path d="${m}" fill="${HAIR}" stroke="${INK}" stroke-width="2.8"/><path d="M134,250 l-2,12 M142,246 l-1,13 M150,244 l0,12 M158,243 l1,12 M166,244 l1,11 M174,246 l0,10" stroke="${INK}" stroke-width="1.7"/>`;
    s += ms + `<g transform="translate(360,0) scale(-1,1)">${ms}</g>`;
  }
  // rubor de enfado + gota de sudor
  s += `<g class="mad" style="opacity:0"><ellipse cx="136" cy="232" rx="16" ry="9" fill="${RED}" opacity=".35"/><ellipse cx="224" cy="232" rx="16" ry="9" fill="${RED}" opacity=".35"/><path d="M248,128 l14,-14 M262,140 l18,-6 M252,112 l4,-18" stroke="${RED}" stroke-width="6" stroke-linecap="round"/></g>`;
  s += `<g class="sweat" style="opacity:0"><path d="M246,150 Q232,174 246,184 Q260,174 246,150 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M242,172 q2,6 6,6" stroke="${INK}" stroke-width="1.5" fill="none"/></g>`;
  // dedo levantado
  const sl = limb(318, 470, 306, 300, 30, 24), fg = limb(306, 262, 304, 186, 10, 9);
  s += `<g class="fing" style="opacity:0">${cut(P(sl) + `<circle cx="306" cy="276" r="26"/>` + P(fg) + `<circle cx="304" cy="186" r="9"/>`, 5, 7)}${D(sl, young ? '#3a2f26' : '#6b5a4a')}${HF(sl, 'hD')}<path d="M282,312 L332,312" stroke="#fff" stroke-width="10"/><path d="M282,312 L332,312" stroke="${INK}" stroke-width="2"/>${D(fg, FIG, 3)}<circle cx="304" cy="186" r="9" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="306" cy="276" r="26" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M286,270 q20,-6 40,0 M288,284 q18,-6 36,0" stroke="${INK}" stroke-width="2" fill="none"/></g>`;
  return s;
}
function mkEin(pa, b, o = {}) {
  const f = mk(pa, b, einsteinInner(o), '0 0 360 460', 'bust'); const q = s => f.d.querySelector(s);
  f.fing = q('.fing'); f.mad = q('.mad'); f.sweat = q('.sweat'); return f;
}
function einFace(f, t, o = {}) {
  face(f, t, o);
  const a = o.ang || 0;
  f.browL.setAttribute('transform', `translate(0 ${f1(-(o.bL || 0))}) rotate(${f1(a)} 156 182)`);
  f.browR.setAttribute('transform', `translate(0 ${f1(-(o.bR || 0))}) rotate(${f1(-a)} 204 182)`);
  f.fing.style.opacity = o.finger ? 1 : 0; f.mad.style.opacity = o.mad ? 1 : 0; f.sweat.style.opacity = o.sweat ? 1 : 0;
}

/* ---------- objetos ---------- */
function chalkboard(pa, x, y, w, h, z = 3) {
  const d = box(pa, x, y, w, h, { zIndex: z });
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="18"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="url(#hW)" opacity=".3"/><rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="8" fill="#2f3530" stroke="${INK}" stroke-width="5"/><path d="M60,${h - 70} q120,-20 240,4 M${w - 340},80 q100,10 260,-6" stroke="#fff" stroke-width="3" opacity=".12" fill="none"/><rect x="${w * 0.6}" y="${h - 12}" width="70" height="16" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
  return d;
}
const chalk = (pa, x, y, html, sz = 90, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: px(sz), lineHeight: 1, color: '#F4F1E8', whiteSpace: 'nowrap', zIndex: 6, textShadow: '2px 2px 0 rgba(255,255,255,.18)' }, css), html);
// examen de papel
function examPaper(pa, x, y, w, h, o = {}) {
  const pp = paperPiece(pa, x, y, w, h, { seed: o.seed || 5, bg: '#FBF6EA' });
  const iw = w - 18;
  el('div', pp.inner, { left: '0', top: '16px', width: px(iw), textAlign: 'center', fontFamily: 'Rye', fontSize: px(o.tsz || 44), color: INK, whiteSpace: 'nowrap' }, o.title || 'EXAMEN');
  box(pp.inner, 24, (o.tsz || 44) + 34, iw - 48, 4, { background: INK });
  if (o.name) el('div', pp.inner, { left: '26px', top: px((o.tsz || 44) + 48), fontFamily: 'SpecialElite', fontSize: px(o.nsz || 28), color: INK, whiteSpace: 'nowrap' }, o.name);
  let ln = ''; for (let yy = (o.tsz || 44) + 100; yy < h - 40; yy += 30) ln += `<path d="M26,${yy} H${f1(iw - 30 - ((yy * 7) % 5) * 40)}" stroke="${INK}" stroke-width="4" opacity=".28"/>`;
  box(pp.inner, 0, 0, iw, h - 18).innerHTML = `<svg width="${iw}" height="${h - 18}">${ln}</svg>`;
  return pp;
}
// cero rojo a rotulador
const ZERO = (sw = 26) => `<svg viewBox="0 0 200 240" width="100%" height="100%" style="overflow:visible"><path d="M100,18 C30,22 16,120 30,170 C44,224 150,232 172,160 C192,96 170,20 96,22 C80,24 66,32 58,44" stroke="#fff" stroke-width="${sw + 14}" fill="none" stroke-linecap="round"/><path d="M100,18 C30,22 16,120 30,170 C44,224 150,232 172,160 C192,96 170,20 96,22 C80,24 66,32 58,44" stroke="${RED}" stroke-width="${sw}" fill="none" stroke-linecap="round"/></svg>`;
// garabato de tinta que tacha
const SCRIB = `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible"><path class="sc" pathLength="1000" d="M30,80 L270,60 L40,140 L280,120 L30,200 L260,190 L50,250 L250,250" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>`;

/* POLITÉCNICO (fachada neoclásica, viewBox 0 0 900 560) */
function poliSvg() {
  const body = 'M40,190 H860 V500 H40 Z', por = 'M300,170 H600 V500 H300 Z', ped = 'M280,172 L450,70 L620,172 Z', dome = 'M370,74 Q450,-40 530,74 Z', drum = 'M380,70 H520 V120 H380 Z';
  let s = cut(P(body) + P(por) + P(ped) + P(dome) + P(drum) + '<rect x="0" y="500" width="900" height="60"/>');
  s += D(body, '#E9DFC9', 4) + clipG(uid('pb'), body, `<rect x="40" y="190" width="820" height="310" fill="url(#hP)"/><rect x="760" y="190" width="100" height="310" fill="url(#hA)" opacity=".6"/>`);
  s += D(drum, '#E2D6BC', 4) + HF(drum, 'hB') + D(dome, '#B8C4B0', 4) + HF(dome, 'hA') + `<path d="M450,-14 V20" stroke="${INK}" stroke-width="5"/><circle cx="450" cy="-18" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  for (const xx of [60, 140, 220, 640, 720, 800]) for (const yy of [220, 330, 430]) s += `<rect x="${xx}" y="${yy}" width="44" height="66" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M${xx + 22},${yy} V${yy + 66} M${xx},${yy + 30} H${xx + 44}" stroke="${FIG}" stroke-width="2"/><rect x="${xx - 6}" y="${yy - 10}" width="56" height="10" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  s += D(por, '#F1E8D4', 4) + D(ped, '#F1E8D4', 4) + `<path d="M330,160 L450,94 L570,160" stroke="${INK}" stroke-width="2" fill="none"/><circle cx="450" cy="136" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  for (let k = 0; k < 6; k++) { const xx = 318 + k * 52; s += `<rect x="${xx}" y="196" width="30" height="290" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/><path d="M${xx + 8},200 V482 M${xx + 16},200 V482 M${xx + 24},200 V482" stroke="${INK}" stroke-width="1.2" opacity=".5"/><rect x="${xx - 6}" y="180" width="42" height="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/><rect x="${xx - 6}" y="482" width="42" height="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`; }
  s += `<path d="M442,330 V500 H458 V330 Z" fill="#3a2a1e"/><rect x="0" y="500" width="900" height="20" fill="#d9c7a6" stroke="${INK}" stroke-width="4"/><rect x="-20" y="520" width="940" height="22" fill="#cdb48a" stroke="${INK}" stroke-width="4"/><rect x="-40" y="542" width="980" height="22" fill="#d9c7a6" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
/* BOINA + BAGUETTE (gag francés) viewBox 0 0 200 120 / 0 0 360 90 */
const beretSvg = () => `<svg viewBox="0 0 200 120" width="100%" height="100%" style="overflow:visible">${cut('<ellipse cx="100" cy="70" rx="92" ry="40"/>', 4, 6)}<ellipse cx="100" cy="70" rx="92" ry="40" fill="#24304a" stroke="${INK}" stroke-width="4"/><ellipse cx="100" cy="70" rx="92" ry="40" fill="url(#hA)" opacity=".5"/><path d="M100,32 q4,-18 14,-22" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M20,86 Q100,112 180,86" stroke="#fff" stroke-width="2" opacity=".35" fill="none"/></svg>`;
const bagSvg = () => `<svg viewBox="0 0 360 90" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,46 Q20,10 180,12 Q340,10 340,46 Q340,82 180,80 Q20,82 20,46 Z"/>', 4, 6)}<path d="M20,46 Q20,10 180,12 Q340,10 340,46 Q340,82 180,80 Q20,82 20,46 Z" fill="#D9A55A" stroke="${INK}" stroke-width="4"/><path d="M20,46 Q20,10 180,12 Q340,10 340,46 Q340,82 180,80 Q20,82 20,46 Z" fill="url(#hA)" opacity=".4"/><path d="M70,28 q20,14 34,26 M130,24 q20,14 34,28 M190,24 q20,14 34,28 M250,26 q20,14 32,26" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`;

/* carta numerada grande (bucle abierto 1 / 2) */
function numCard(pa, x, y, n, o = {}) {
  const w = o.w || 300, h = o.h || 400;
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 10 });
  const back = box(wrap, 0, 0, w, h, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `10px 12px 0 ${SH}`, backgroundImage: `repeating-linear-gradient(45deg, rgba(201,162,74,.25) 0 6px, transparent 6px 20px)` });
  box(back, 18, 18, w - 48, h - 48, { border: `4px solid ${BRASS}`, borderRadius: '14px' });
  el('div', back, { left: '0', top: px(h / 2 - 140), width: px(w - 12), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: '260px', color: '#e9c75c', textShadow: `6px 6px 0 ${INK}` }, String(n));
  const front = box(wrap, 0, 0, w, h, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `10px 12px 0 ${SH}`, overflow: 'hidden' });
  const top = box(front, 0, 0, w - 12, 110, { background: YEL, borderBottom: `5px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '110px', textAlign: 'center', color: INK }, String(n));
  void top; front.style.display = 'none';
  return { wrap, back, front };
}
function flipCard(c, t, t0, d = 0.3) { const k = p(t, t0, d, E.inOutCubic); const sx = Math.abs(1 - 2 * k); c.back.style.display = k < 0.5 ? '' : 'none'; c.front.style.display = k >= 0.5 ? '' : 'none'; return Math.max(0.02, sx); }

/* contador de bucle abierto: «1» / «2» fijo en la esquina */
function loopBadge(pa, n) {
  const d = box(pa, 34, 196, 150, 150, { zIndex: 600 });
  d.innerHTML = `<svg width="150" height="150" style="overflow:visible"><circle cx="81" cy="83" r="66" fill="${SH}"/><circle cx="75" cy="75" r="70" fill="#fff"/><circle cx="75" cy="75" r="62" fill="${YEL}" stroke="${INK}" stroke-width="6"/><text x="75" y="112" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="108" fill="${INK}">${n}</text></svg>`;
  return d;
}

/* titular con hueco a la izquierda para el contador 1/2 */
function headlineN(t0, t1, str, o = {}) { headline(t0, t1, str, o); const b = HLS[HLS.length - 1].b; b.style.left = '200px'; b.style.width = '840px'; }
