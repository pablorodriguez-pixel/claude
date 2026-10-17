/* Ep. 16 · Las uvas de Nochevieja — figuras nuevas en el estilo de grabado recortado de la serie */
const GRAPE = '#BACD74', GRAPE2 = '#8FA94E', LEAF = '#7a9a52', STONE = '#E6D5B4', STONE2 = '#D6C09A', NAVY = '#2a3f7a', IRON = '#2f2a26';

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = fw('las uvas de nochevieja empezaron'); K.las = ws(i0); K.uvas0 = ws(i0 + 1); K.noche0 = ws(i0 + 3); K.empezaron = ws(i0 + 4); K.burla = ws(i0 + 7); K.L0e = wE(i0 + 7);
  const i1 = fw('y a lo mejor'); K.L1 = ws(i1); K.mejor = ws(i1 + 3);
  const ib = fw('la burla era de ti', i1); K.burla2 = ws(ib + 1); K.era = ws(ib + 2); K.ti = ws(ib + 4); K.L1e = wE(ib + 4);
  const im = fw('madrid anos ochenta'); K.madrid = ws(im); K.anos = ws(im + 1); K.ochenta = ws(im + 2); K.del = ws(im + 3); K.siglo = ws(im + 4); K.diecinueve = ws(im + 5);
  const ifa = fw('las familias ricas copiaban'); K.lasF = ws(ifa); K.familias = ws(ifa + 1); K.ricas = ws(ifa + 2); K.copiaban = ws(ifa + 3); K.moda = ws(ifa + 5); K.francesa = ws(ifa + 6);
  const ic = fw('cenar con champan'); K.cenar = ws(ic); K.champan = ws(ic + 2); K.uvas1 = ws(ic + 4); K.noche1 = ws(ic + 6); K.L2e = wE(ic + 6);
  const ig = fw('y a la gente de la calle'); K.L3 = ws(ig); K.gente = ws(ig + 3); K.calle = ws(ig + 6); K.parecio = ws(ig + 8); K.cursi = ws(ig + 10);
  const iq = fw('que se fue a la puerta del sol'); K.quese = ws(iq); K.fue = ws(iq + 2); K.puerta = ws(iq + 5); K.sol = ws(iq + 7);
  const icm = fw('a comerse las uvas con las campanadas'); K.comerse = ws(icm + 1); K.uvas2 = ws(icm + 3); K.campanadas = ws(icm + 6); K.campE = wE(icm + 6);
  const idc = fw('de cachondeo'); K.de = ws(idc); K.cachondeo = ws(idc + 1); K.L3e = wE(idc + 1);
  const ibr = fw('la broma gusto tanto'); K.L4 = ws(ibr); K.broma = ws(ibr + 1); K.gusto = ws(ibr + 2); K.tanto = ws(ibr + 3); K.tantoE = wE(ibr + 3);
  const iqd = fw('que se quedo'); K.queq = ws(iqd); K.quedo = ws(iqd + 2); K.L4e = wE(iqd + 2);
  const io = fw('ojo la historia'); K.ojo = ws(io); K.historia = ws(io + 2); K.mas = ws(io + 4); K.cuenta = ws(io + 6); K.es = ws(io + 7); K.otra = ws(io + 8);
  const i19 = fw('en mil novecientos nueve'); K.en19 = ws(i19); K.mil = ws(i19 + 1); K.nueve = ws(i19 + 3);
  const ico = fw('hubo una cosecha enorme en alicante'); K.hubo = ws(ico); K.cosecha = ws(ico + 2); K.enorme = ws(ico + 3); K.alicante = ws(ico + 5);
  const iag = fw('y los agricultores la promocionaron'); K.yagr = ws(iag); K.agric = ws(iag + 2); K.promo = ws(iag + 4);
  const ive = fw('para vender mas uva'); K.para = ws(ive); K.vender = ws(ive + 1); K.mas2 = ws(ive + 2); K.uva = ws(ive + 3);
  const ies = fw('eso ayudo a que se extendiera'); K.eso = ws(ies); K.ayudo = ws(ies + 1); K.extendiera = ws(ies + 5);
  const ipe = fw('pero la costumbre ya existia'); K.pero = ws(ipe); K.costumbre = ws(ipe + 2); K.ya = ws(ipe + 3); K.existia = ws(ipe + 4); K.L5e = wE(ipe + 4);
  const ios = fw('o sea cada nochevieja'); K.L6 = ws(ios); K.osea = ws(ios + 1); K.cada = ws(ios + 2); K.noche2 = ws(ios + 3); K.repites = ws(ios + 4); K.broma2 = ws(ios + 6); K.hace = ws(ios + 8); K.casi = ws(ios + 9); K.ciento = ws(ios + 10); K.cincuenta = ws(ios + 11); K.anos2 = ws(ios + 12);
  const ils = fw('lo sabias', ios); K.lo = ws(ils); K.sabias = ws(ils + 1);
  const isn = fw('si o no', ils); K.si = ws(isn); K.noB = ws(isn + 2); K.L6e = wE(isn + 2);
  const is = fw('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, (K.L0e + K.L1) / 2], B: [(K.L0e + K.L1) / 2, K.madrid - 0.12],
  C1: [K.madrid - 0.12, K.lasF - 0.1], C2: [K.lasF - 0.1, K.cenar - 0.1], C3: [K.cenar - 0.1, K.L3 - 0.1],
  D1: [K.L3 - 0.1, K.quese - 0.08], D2: [K.quese - 0.08, K.de - 0.08], D3: [K.de - 0.08, K.L4 - 0.08],
  HIT1: [K.L4 - 0.08, K.ojo - 0.08],
  F1: [K.ojo - 0.08, K.en19 - 0.1], F2: [K.en19 - 0.1, K.yagr - 0.06], F3: [K.yagr - 0.06, K.eso - 0.12], F4: [K.eso - 0.12, K.L6 - 0.08],
  HIT2: [K.L6 - 0.08, K.soy - 0.1],
  C: [K.soy - 0.1, K.enL - 0.04], L2: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ---------- mano que señala (apunta hacia +x) ---------- */
function pointHand(cx, cy, rot = 0, sc = 1) {
  const fist = 'M-20,-18 Q-28,-18 -28,-8 V10 Q-28,20 -18,20 H8 Q18,20 18,10 V-8 Q18,-18 8,-18 Z';
  const fing = limb(10, -9, 50, -9, 8, 7);
  const sil = P(fist) + P(fing) + '<circle cx="50" cy="-9" r="7"/>';
  const det = D(fing, '#fff', 3) + `<circle cx="50" cy="-9" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/>` + D(fist, '#fff', 3) +
    `<path d="M-6,-18 Q2,-30 14,-20" stroke="${INK}" stroke-width="3" fill="#fff"/><path d="M-14,0 h28 M-14,10 h26" stroke="${INK}" stroke-width="2" fill="none"/><path d="M-28,-6 v12" stroke="${INK}" stroke-width="2" stroke-dasharray="3 3"/>`;
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${sc})">${cut(sil, 4, 5)}${det}</g>`;
}
/* ---------- UVA con cara (viewBox 0 0 240 300) ---------- */
function grapeInner(o = {}) {
  const id = uid('gr'), col = o.col || GRAPE;
  const body = 'M120,72 C178,72 216,120 216,176 C216,236 174,280 120,280 C66,280 24,236 24,176 C24,120 62,72 120,72 Z';
  const leaf = 'M126,48 C142,18 190,12 208,26 C194,54 160,64 126,48 Z';
  const stem = limb(116, 82, 132, 26, 6, 4.5);
  const arm = (sx, dir) => { const ex = sx + dir * 62, ey = 196; return cut(P(limb(sx, 190, ex, ey, 6, 5)), 3, 4) + D(limb(sx, 190, ex, ey, 6, 5), INK, 2) + pointHand(ex, ey, dir > 0 ? 0 : 180, 0.9); };
  let s = '';
  s += `<g class="armL" style="opacity:0">${arm(40, -1)}</g><g class="armR" style="opacity:0">${arm(200, 1)}</g>`;
  s += cut(P(body) + P(leaf) + P(stem), 6, 8);
  s += D(stem, '#6b4a2a', 3) + D(leaf, LEAF, 3) + `<path d="M130,46 Q170,34 200,28" stroke="${INK}" stroke-width="2" fill="none"/><path d="${leaf}" fill="url(#hB)" opacity=".5"/>`;
  s += D(body, col, 4.5) + clipG(id + 'b', body, `<ellipse cx="186" cy="206" rx="70" ry="110" fill="url(#hA)" opacity=".75"/><ellipse cx="120" cy="284" rx="130" ry="44" fill="url(#hB)" opacity=".55"/><path d="M60,250 Q120,290 190,240" stroke="${INK}" stroke-width="2" fill="none" opacity=".4"/>`);
  s += `<ellipse cx="74" cy="122" rx="16" ry="30" fill="#fff" opacity=".6" transform="rotate(28 74 122)"/><circle cx="96" cy="96" r="6" fill="#fff" opacity=".6"/>`;
  s += `<ellipse cx="66" cy="204" rx="17" ry="10" fill="${PINK}" opacity=".32"/><ellipse cx="174" cy="204" rx="17" ry="10" fill="${PINK}" opacity=".32"/>`;
  // ojos
  s += `<ellipse cx="90" cy="160" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="3.5"/><ellipse cx="150" cy="160" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
  s += `<g class="pup"><circle cx="92" cy="165" r="10" fill="${INK}"/><circle cx="148" cy="165" r="10" fill="${INK}"/><circle cx="88" cy="160" r="3.5" fill="#fff"/><circle cx="144" cy="160" r="3.5" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="90" cy="160" rx="21" ry="25" fill="${col}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="150" cy="160" rx="21" ry="25" fill="${col}" stroke="${INK}" stroke-width="3.5"/><path d="M70,164 q20,10 40,0 M130,164 q20,10 40,0" stroke="${INK}" stroke-width="4" fill="none"/></g>`;
  s += `<g class="hap" style="opacity:0"><ellipse cx="90" cy="160" rx="21" ry="25" fill="${col}"/><ellipse cx="150" cy="160" rx="21" ry="25" fill="${col}"/><path d="M70,168 q20,-26 40,0 M130,168 q20,-26 40,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
  s += `<path class="browL" d="M70,124 q20,-12 40,-2" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/><path class="browR" d="M130,122 q20,-10 40,2" stroke="${INK}" stroke-width="6" stroke-linecap="round" fill="none"/>`;
  // boca
  s += `<path class="smile" d="M98,206 q22,20 44,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<g class="mo" style="opacity:0"><path d="M90,200 Q120,206 150,200 Q148,246 120,248 Q92,246 90,200 Z" fill="#3a1410" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M104,234 Q120,222 136,234 Q130,246 120,246 Q110,246 104,234 Z" fill="#E8708A"/><path d="M96,203 H144" stroke="#fff" stroke-width="5"/></g>`;
  return s;
}
function mkGrape(pa, b, o = {}) {
  const f = mk(pa, b, grapeInner(o), '0 0 240 300', 'grape'); const q = s => f.d.querySelector(s);
  f.mo = q('.mo'); f.smile = q('.smile'); f.hap = q('.hap'); f.armL = q('.armL'); f.armR = q('.armR'); return f;
}
function gFace(f, t, o = {}) {
  face(f, t, Object.assign({}, o, { jaw: 0, closed: o.closed && !o.laugh }));
  f.hap.style.opacity = o.laugh ? 1 : 0;
  if (o.laugh) { f.lidC.style.opacity = 0; }
  const j = o.jaw || 0;
  f.mo.style.opacity = j > 0.04 ? 1 : 0; f.smile.style.opacity = j > 0.04 ? 0 : 1;
  f.mo.setAttribute('transform', `translate(0 200) scale(1 ${f1((0.35 + 0.65 * Math.min(1, j)) * 100) / 100}) translate(0 -200)`);
  f.armL.style.opacity = o.armL != null ? 1 : 0; f.armR.style.opacity = o.armR != null ? 1 : 0;
  if (o.armL != null) f.armL.setAttribute('transform', `rotate(${f1(o.armL)} 40 190)`);
  if (o.armR != null) f.armR.setAttribute('transform', `rotate(${f1(o.armR)} 200 190)`);
}
/* mano en escorzo que te señala a ti (viewBox 0 0 300 300) */
function youHandInner() {
  const cuff = 'M196,-10 L306,46 L268,124 L160,66 Z';
  const back = 'M84,96 C112,52 214,52 246,104 C270,146 250,200 206,216 C164,232 108,214 88,182 C76,160 74,118 84,96 Z';
  const fing = 'M96,128 L136,138 L128,214 L70,206 Z';
  const tip = '<ellipse cx="98" cy="222" rx="40" ry="34"/>';
  const curls = [[206, 214, 24, 17, -20], [174, 228, 24, 17, -6], [142, 230, 22, 16, 6]];
  let sil = P(cuff) + P(back) + P(fing) + tip + curls.map(c => `<ellipse cx="${c[0]}" cy="${c[1]}" rx="${c[2]}" ry="${c[3]}" transform="rotate(${c[4]} ${c[0]} ${c[1]})"/>`).join('');
  let s = cut(sil, 6, 8);
  s += D(cuff, GRAPE, 4) + `<path d="${cuff}" fill="url(#hA)" opacity=".5"/>`;
  s += D(back, '#fff', 4) + clipG(uid('yb'), back, `<ellipse cx="236" cy="170" rx="50" ry="80" fill="url(#hA)" opacity=".6"/>`) + `<path d="M120,96 q50,-16 100,8 M128,118 q40,-12 80,4 M136,140 q36,-10 70,2" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  curls.forEach(c => s += `<ellipse cx="${c[0]}" cy="${c[1]}" rx="${c[2]}" ry="${c[3]}" transform="rotate(${c[4]} ${c[0]} ${c[1]})" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`);
  s += `<path d="M118,186 Q150,176 182,196" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += D(fing, '#fff', 4) + `<path d="M104,150 q12,4 24,2 M100,172 q12,4 24,2" stroke="${INK}" stroke-width="2.2" fill="none"/>`;
  s += `<ellipse cx="98" cy="222" rx="40" ry="34" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="98" cy="222" rx="40" ry="34" fill="url(#hP)" opacity=".5"/>`;
  s += `<ellipse cx="96" cy="212" rx="20" ry="14" fill="#F4ECDB" stroke="${INK}" stroke-width="3"/><path d="M80,208 q16,-10 32,0" stroke="${INK}" stroke-width="1.8" fill="none"/>`;
  s += `<path d="M38,262 l-24,18 M60,276 l-12,24 M24,224 l-28,2" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  return s;
}

/* ---------- REAL CASA DE CORREOS · PUERTA DEL SOL (viewBox 0 0 900 1000) ---------- */
function solSvg() {
  const id = uid('ps');
  const body = 'M0,600 H900 V1000 H0 Z', bay = 'M290,520 H610 V1000 H290 Z', ped = 'M276,526 L450,452 L624,526 Z', tower = 'M362,300 H538 V500 H362 Z', corn = 'M340,284 H560 V308 H340 Z', base = 'M330,494 H570 V522 H330 Z';
  const lan = 'M398,286 L408,160 L492,160 L502,286 Z';
  let s = cut(P(body) + P(bay) + P(ped) + P(tower) + P(corn) + P(base) + P(lan) + '<circle cx="450" cy="112" r="30"/><rect x="444" y="30" width="12" height="140"/>');
  s += D(body, STONE, 5) + clipG(id + 'b', body, `<rect x="0" y="600" width="900" height="400" fill="url(#hP)"/><rect x="0" y="940" width="900" height="60" fill="url(#hA)" opacity=".5"/>`);
  s += `<path d="M0,620 H900 M0,780 H900 M0,930 H900" stroke="${INK}" stroke-width="4"/>`;
  for (const yy of [650, 810]) for (const xx of [30, 110, 190, 650, 730, 810]) {
    s += `<rect x="${xx}" y="${yy}" width="56" height="96" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M${xx + 28},${yy} V${yy + 96} M${xx},${yy + 40} H${xx + 56}" stroke="${FIG}" stroke-width="2.5"/><rect x="${xx - 8}" y="${yy - 14}" width="72" height="12" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
    s += `<rect x="${xx - 10}" y="${yy + 90}" width="76" height="10" fill="${IRON}"/><path d="M${xx - 6},${yy + 70} V${yy + 92} M${xx + 6},${yy + 70} V${yy + 92} M${xx + 18},${yy + 70} V${yy + 92} M${xx + 30},${yy + 70} V${yy + 92} M${xx + 42},${yy + 70} V${yy + 92} M${xx + 54},${yy + 70} V${yy + 92} M${xx - 10},${yy + 70} H${xx + 66}" stroke="${IRON}" stroke-width="3"/>`;
  }
  s += D(bay, '#EFE2C6', 5) + clipG(id + 'y', bay, `<rect x="560" y="520" width="50" height="480" fill="url(#hA)" opacity=".7"/><rect x="290" y="520" width="320" height="480" fill="url(#hP)" opacity=".6"/>`);
  for (const xx of [320, 520]) s += `<rect x="${xx}" y="600" width="60" height="110" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M${xx + 30},600 V710 M${xx},648 H${xx + 60}" stroke="${FIG}" stroke-width="2.5"/><rect x="${xx - 10}" y="700" width="80" height="12" fill="${IRON}"/>`;
  s += `<path d="M390,1000 V860 Q390,800 450,800 Q510,800 510,860 V1000 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><path d="M450,800 V1000" stroke="${FIG}" stroke-width="3"/><rect x="378" y="740" width="144" height="40" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += D(ped, '#EFE2C6', 5) + HF(ped, 'hB') + D(base, STONE2, 4);
  s += D(tower, '#EFE2C6', 5) + clipG(id + 't', tower, `<rect x="500" y="300" width="40" height="200" fill="url(#hA)"/>`) + D(corn, STONE2, 4) + `<path d="M340,296 H560" stroke="${INK}" stroke-width="2"/>`;
  // reloj
  let tk = ''; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; tk += `M${f1(450 + Math.sin(a) * 56)},${f1(400 - Math.cos(a) * 56)}L${f1(450 + Math.sin(a) * 66)},${f1(400 - Math.cos(a) * 66)}`; }
  s += `<circle cx="450" cy="400" r="82" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="450" cy="400" r="72" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="${tk}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  s += `<text x="450" y="352" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="22" fill="${INK}">XII</text>`;
  s += `<g class="hh"><path d="M450,404 L450,356" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g><g class="mh"><path d="M450,404 L450,340" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g><circle cx="450" cy="400" r="8" fill="${INK}"/>`;
  // templete de hierro, campana, bola y veleta
  s += `<path d="${lan}" fill="#F4ECDB" stroke="${IRON}" stroke-width="7"/><path d="M403,222 H497 M406,190 H494 M420,160 L412,286 M480,160 L488,286 M450,160 V286" stroke="${IRON}" stroke-width="4"/><path d="M398,286 L408,160 L492,160 L502,286" fill="none" stroke="${IRON}" stroke-width="7"/>`;
  s += `<g class="bell"><path d="M424,262 Q426,214 450,210 Q474,214 476,262 Q450,270 424,262 Z" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><path d="M424,262 Q426,214 450,210 Q474,214 476,262" fill="url(#hA)" opacity=".5"/><circle cx="450" cy="268" r="7" fill="${INK}"/></g>`;
  s += `<rect x="445" y="30" width="10" height="132" fill="${IRON}"/><g class="bola"><circle cx="450" cy="112" r="28" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="450" cy="112" r="28" fill="url(#hA)" opacity=".6"/><path d="M424,104 Q450,92 476,104 M422,120 Q450,132 478,120" stroke="${INK}" stroke-width="2.5" fill="none"/><circle cx="440" cy="102" r="7" fill="#fff" opacity=".6"/></g>`;
  s += `<path d="M450,40 L496,40 L486,30 M496,40 L486,50 M450,40 L414,40 L404,30 L424,40 L404,50 Z" stroke="${IRON}" stroke-width="5" fill="${IRON}"/>`;
  return s;
}
function mkSolT(pa, b, vb = '0 0 900 1000') {
  const d = box(pa, b[0], b[1], b[2], b[3]); d.innerHTML = svgW(solSvg(), vb); const q = s => d.querySelector(s);
  return { d, hh: q('.hh'), mh: q('.mh'), bell: q('.bell'), bola: q('.bola') };
}
function solHands(f, t, mins = 0, bell = 0) {
  f.mh.setAttribute('transform', `rotate(${f1(mins * 6)} 450 400)`); f.hh.setAttribute('transform', `rotate(${f1(mins * 0.5)} 450 400)`);
  f.bell.setAttribute('transform', `rotate(${f1(bell)} 450 214)`);
}

/* ---------- DAMA CON MIRIÑAQUE (viewBox 0 0 400 820) ---------- */
function ladyInner(o = {}) {
  const id = uid('la'), dress = o.dress || '#CF8A99', dress2 = '#7A2E3E', HAIR = '#3a2a1e';
  const skirt = 'M200,346 C152,346 128,380 112,460 C88,580 48,690 20,782 Q200,836 380,782 C352,690 312,580 288,460 C272,380 248,346 200,346 Z';
  const bod = 'M156,234 Q200,222 244,234 L256,300 Q230,350 200,374 Q170,350 144,300 Z';
  const neck = 'M184,196 H216 V244 H184 Z';
  const head = 'M200,92 C234,92 250,120 250,154 C250,194 228,216 200,216 C172,216 150,194 150,154 C150,120 166,92 200,92 Z';
  const hair = 'M148,158 C140,104 170,80 200,80 C230,80 260,104 252,158 C244,128 224,114 200,116 C176,114 156,128 148,158 Z';
  const aR1 = limb(252, 252, 300, 196, 13, 10), aR2 = limb(300, 196, 292, 128, 10, 9);
  const aL1 = limb(148, 252, 116, 330, 13, 10), aL2 = limb(116, 330, 142, 392, 10, 9);
  let s = cut(P(skirt) + P(bod) + P(neck) + P(head) + P(hair) + '<circle cx="200" cy="62" r="32"/>' + P(aR1) + P(aR2) + P(aL1) + P(aL2) + '<ellipse cx="148" cy="248" rx="30" ry="26"/><ellipse cx="252" cy="248" rx="30" ry="26"/>' + '<path d="M290,60 Q320,96 290,120 Q260,96 290,60 Z"/>');
  s += D(skirt, dress, 4) + clipG(id + 's', skirt, `<rect x="250" y="340" width="160" height="500" fill="url(#hA)" opacity=".8"/><rect x="0" y="740" width="400" height="100" fill="url(#hB)" opacity=".6"/><rect x="0" y="340" width="400" height="500" fill="url(#hP)" opacity=".4"/>`);
  const sc = (y, x0, x1, n) => { let d = `M${x0},${y}`; const w = (x1 - x0) / n; for (let k = 0; k < n; k++) d += ` q${f1(w / 2)},22 ${f1(w)},0`; return d; };
  s += `<path d="${sc(560, 92, 308, 6)}" stroke="${INK}" stroke-width="4" fill="none"/><path d="${sc(670, 58, 342, 7)}" stroke="${INK}" stroke-width="4" fill="none"/><path d="${sc(574, 92, 308, 6)}" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><path d="${sc(684, 58, 342, 7)}" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`;
  s += `<path d="M200,380 Q190,560 196,800 M160,400 Q130,600 110,800 M240,400 Q270,600 290,800" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>`;
  // brazos
  s += D(aL1, dress2, 3) + D(aL2, FIG, 3) + `<circle cx="142" cy="394" r="12" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += `<g transform="translate(142,394) rotate(30)"><path d="M0,0 L-50,-40 A64,64 0 0,1 30,-62 Z" fill="${dress2}" stroke="${INK}" stroke-width="3"/><path d="M0,0 L-34,-50 M0,0 L-14,-60 M0,0 L8,-63 M0,0 L22,-60" stroke="${FIG}" stroke-width="2"/></g>`;
  s += D(aR1, dress2, 3) + D(aR2, FIG, 3);
  s += D(bod, dress2, 4) + HF(bod, 'hD') + `<path d="M170,236 L200,330 L230,236" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<ellipse cx="148" cy="248" rx="30" ry="26" fill="${dress}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="252" cy="248" rx="30" ry="26" fill="${dress}" stroke="${INK}" stroke-width="3.5"/><path d="M128,244 q20,-14 40,0 M232,244 q20,-14 40,0" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += D(neck, FIG, 3) + HF('M204,196 H216 V244 H204 Z', 'hF');
  let pr = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (0.15 + 0.7 * k / 8); pr += `<circle cx="${f1(200 - Math.cos(a) * 26)}" cy="${f1(222 + Math.sin(a) * 14)}" r="5" fill="#fff" stroke="${INK}" stroke-width="1.8"/>`; }
  s += pr;
  // cabeza
  s += `<circle cx="200" cy="62" r="32" fill="${HAIR}" stroke="${INK}" stroke-width="3"/><path d="M178,50 q22,-14 44,0 M176,66 q24,-12 48,0" stroke="#6b5a4a" stroke-width="2" fill="none"/>`;
  s += D(head, FIG, 3.5) + clipG(id + 'h', head, `<ellipse cx="244" cy="160" rx="24" ry="60" fill="url(#hA)"/>`);
  s += D(hair, HAIR, 3) + `<circle cx="150" cy="168" r="11" fill="${HAIR}" stroke="${INK}" stroke-width="2.5"/><circle cx="250" cy="168" r="11" fill="${HAIR}" stroke="${INK}" stroke-width="2.5"/><circle cx="148" cy="186" r="9" fill="${HAIR}" stroke="${INK}" stroke-width="2.5"/><circle cx="252" cy="186" r="9" fill="${HAIR}" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<path d="M150,190 v12 M250,190 v12" stroke="${INK}" stroke-width="2"/><circle cx="150" cy="206" r="5" fill="${PINK}" stroke="${INK}" stroke-width="2"/><circle cx="250" cy="206" r="5" fill="${PINK}" stroke="${INK}" stroke-width="2"/>`;
  s += `<ellipse cx="182" cy="156" rx="11" ry="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/><ellipse cx="218" cy="156" rx="11" ry="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/><g class="pup"><circle cx="183" cy="155" r="5" fill="${INK}"/><circle cx="219" cy="155" r="5" fill="${INK}"/></g>`;
  s += `<g class="lidH"><path d="M170,155 A12,10 0 0,1 194,155 Z M206,155 A12,10 0 0,1 230,155 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="182" cy="156" rx="12" ry="10" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><ellipse cx="218" cy="156" rx="12" ry="10" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += `<path d="M170,140 q12,-8 24,-2 M206,138 q12,-6 24,2" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M200,160 q-4,16 4,20" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  s += `<ellipse cx="172" cy="184" rx="11" ry="6" fill="${PINK}" opacity=".35"/><ellipse cx="228" cy="184" rx="11" ry="6" fill="${PINK}" opacity=".35"/>`;
  s += `<g class="jaw"><path d="M190,194 q10,6 20,0 q-10,8 -20,0 Z" fill="${LIP}" stroke="${INK}" stroke-width="2"/></g>`;
  // tocado
  s += `<path d="M290,60 Q320,96 290,120 Q260,96 290,60 Z" fill="${dress}" stroke="${INK}" stroke-width="3"/><path d="M290,64 L290,118" stroke="${INK}" stroke-width="2"/><path d="M228,92 Q262,80 286,94" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<g class="glass">${copaSvg(292, 112, 1)}</g>`;
  return s;
}
/* ---------- CABALLERO CON CHISTERA Y MONÓCULO (viewBox 0 0 300 820) ---------- */
function gentInner(o = {}) {
  const id = uid('ge'), COAT = '#2a221c';
  const crown = 'M98,18 L202,18 L198,128 L102,128 Z', brim = 'M62,132 Q150,114 238,132 Q150,152 62,132 Z', band = 'M101,104 H199 V126 H101 Z';
  const head = 'M150,128 C186,128 198,156 198,190 C198,232 178,254 150,254 C122,254 102,232 102,190 C102,156 114,128 150,128 Z';
  const coat = 'M86,276 Q150,252 214,276 L236,560 L200,560 L190,640 L156,580 L144,580 L110,640 L100,560 L64,560 Z';
  const lg1 = limb(126, 560, 122, 784, 20, 17), lg2 = limb(174, 560, 178, 784, 20, 17);
  const aR1 = limb(210, 290, 252, 238, 15, 11), aR2 = limb(252, 238, 238, 166, 11, 10);
  const aL1 = limb(90, 290, 70, 420, 15, 12);
  let s = cut(P(crown) + P(brim) + P(head) + P(coat) + P(lg1) + P(lg2) + P(aR1) + P(aR2) + P(aL1) + '<ellipse cx="116" cy="790" rx="34" ry="14"/><ellipse cx="186" cy="790" rx="34" ry="14"/><rect x="134" y="250" width="32" height="30"/>');
  s += D(lg1, '#5a5048', 3.5) + D(lg2, '#5a5048', 3.5) + `<path d="M118,570 V780 M132,570 V780 M168,570 V780 M182,570 V780" stroke="${INK}" stroke-width="1.6" opacity=".5"/>`;
  s += `<ellipse cx="116" cy="790" rx="34" ry="14" fill="${INK}"/><ellipse cx="186" cy="790" rx="34" ry="14" fill="${INK}"/><path d="M96,786 h20 M168,786 h20" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  s += D(aL1, COAT, 3) + `<circle cx="70" cy="424" r="14" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M70,424 L60,790" stroke="${INK}" stroke-width="9"/><path d="M70,424 L60,790" stroke="${WOOD}" stroke-width="4"/><circle cx="70" cy="420" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  s += D(coat, COAT, 4) + clipG(id + 'c', coat, `<rect x="60" y="250" width="200" height="400" fill="url(#hW)" opacity=".22"/><rect x="190" y="250" width="60" height="400" fill="url(#hA)" opacity=".5"/>`);
  s += `<path d="M128,270 L150,420 L172,270 Z" fill="#8a7458" stroke="${INK}" stroke-width="3"/><path d="M138,270 L150,360 L162,270 Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="150" cy="380" r="4" fill="${BRASS}" stroke="${INK}" stroke-width="1.5"/><circle cx="150" cy="400" r="4" fill="${BRASS}" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<path d="M128,270 L108,360 L130,370 L146,300 M172,270 L192,360 L170,370 L154,300" fill="${COAT}" stroke="${INK}" stroke-width="3"/><path d="M162,330 q20,10 22,30" stroke="${BRASS}" stroke-width="3" fill="none"/>`;
  s += D(aR1, COAT, 3) + D(aR2, COAT, 3) + `<circle cx="238" cy="160" r="14" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += `<rect x="134" y="250" width="32" height="30" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M126,262 L150,276 L174,262 L174,284 L150,276 L126,284 Z" fill="${INK}"/><path d="M128,256 L150,272 L172,256" stroke="#fff" stroke-width="5" fill="none"/>`;
  s += D(head, FIG, 3.5) + clipG(id + 'h', head, `<ellipse cx="196" cy="196" rx="26" ry="70" fill="url(#hA)"/>`);
  // patillas, bigote engominado, monóculo
  s += `<path d="M104,170 C98,210 108,236 126,246 C126,226 118,200 118,176 Z M196,170 C202,210 192,236 174,246 C174,226 182,200 182,176 Z" fill="#6b5a4a" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<ellipse cx="132" cy="186" rx="10" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.5"/><ellipse cx="168" cy="186" rx="10" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.5"/><g class="pup"><circle cx="133" cy="186" r="4.5" fill="${INK}"/><circle cx="169" cy="186" r="4.5" fill="${INK}"/></g>`;
  s += `<g class="lidH"><path d="M121,186 A11,8 0 0,1 143,186 Z M157,186 A11,8 0 0,1 179,186 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="132" cy="186" rx="11" ry="9" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><ellipse cx="168" cy="186" rx="11" ry="9" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += `<path d="M118,168 q14,-10 28,-2 M156,166 q14,-8 28,2" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M150,190 q-6,18 4,22" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  s += `<g class="jaw"><path d="M138,232 q12,6 24,0" stroke="${INK}" stroke-width="3" fill="none"/></g>`;
  const ms = 'M150,218 C140,212 126,212 116,220 C108,226 98,224 94,214 C94,232 112,236 126,230 C136,226 144,226 150,228 Z';
  s += `<path d="${ms}" fill="${INK}"/><path d="${ms}" fill="${INK}" transform="translate(300,0) scale(-1,1)"/>`;
  s += `<g class="mono"><circle cx="168" cy="186" r="16" fill="rgba(255,255,255,.35)" stroke="${BRASS}" stroke-width="4"/><circle cx="168" cy="186" r="16" fill="none" stroke="${INK}" stroke-width="1.5"/><path d="M182,196 Q196,250 176,300" stroke="${BRASS}" stroke-width="2" fill="none"/><path d="M160,178 l6,-4" stroke="#fff" stroke-width="3"/></g>`;
  // chistera
  s += D(brim, '#1e1712', 3.5) + D(crown, '#1e1712', 3.5) + clipG(id + 'k', crown, `<rect x="170" y="10" width="40" height="130" fill="url(#hW)" opacity=".35"/><path d="M118,26 Q122,70 116,124" stroke="#fff" stroke-width="5" opacity=".35" fill="none"/>`) + D(band, '#5a4632', 2.5);
  s += `<g class="glass">${copaSvg(238, 146, 1)}</g>`;
  return s;
}
/* copa de champán (tipo pompadour) con base en (cx, cy) = mano */
function copaSvg(cx, cy, sc = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${sc})"><path d="M-34,-62 Q0,-30 34,-62 Z" fill="#F7E08A" stroke="${INK}" stroke-width="3"/><path d="M-36,-64 Q0,-26 36,-64" fill="none" stroke="${INK}" stroke-width="3.5"/><path d="M0,-40 V-6" stroke="${INK}" stroke-width="4"/><ellipse cx="0" cy="-4" rx="14" ry="4" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="-10" cy="-54" r="2.5" fill="#fff"/><circle cx="8" cy="-50" r="2" fill="#fff"/><circle cx="14" cy="-58" r="2" fill="#fff"/></g>`;
}
const mkLady = (pa, b, o = {}) => mk(pa, b, ladyInner(o), '0 0 400 820', 'lady');
const mkGent = (pa, b, o = {}) => mk(pa, b, gentInner(o), '0 0 300 820', 'gent');
function posh(f, t, o = {}) { face(f, t, Object.assign({ half: true }, o)); if (f.jaw) f.jaw.setAttribute('transform', `translate(0 ${f1((o.jaw || 0) * 6)})`); }

/* ---------- botella de champán (viewBox 0 0 140 420) ---------- */
function bottleInner() {
  const b = 'M30,190 Q30,146 56,124 L58,44 H82 L84,124 Q110,146 110,190 V398 Q110,412 96,412 H44 Q30,412 30,398 Z';
  let s = cut(P(b), 5, 7) + D(b, '#2f4a2a', 4) + clipG(uid('bt'), b, `<rect x="80" y="40" width="40" height="380" fill="url(#hA)" opacity=".7"/>`);
  s += `<path d="M44,170 Q42,260 46,380" stroke="#fff" stroke-width="7" opacity=".35" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M54,40 H86 L88,118 Q70,128 52,118 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M54,40 H86 L88,118 Q70,128 52,118 Z" fill="url(#hB)" opacity=".5"/>`;
  s += `<rect x="38" y="236" width="64" height="86" rx="6" fill="${FIG}" stroke="${INK}" stroke-width="3"/><text x="70" y="270" text-anchor="middle" font-family="Rye" font-size="13" fill="${INK}">CHAMPÁN</text><path d="M48,282 H92 M52,296 H88 M58,308 H82" stroke="${INK}" stroke-width="2"/>`;
  return s;
}
function corkSvg() { return `<svg viewBox="0 0 60 70" width="100%" height="100%" style="overflow:visible"><path d="M14,40 Q8,10 30,6 Q52,10 46,40 Z" fill="#C9A46A" stroke="${INK}" stroke-width="3"/><path d="M14,40 Q8,10 30,6 Q52,10 46,40 Z" fill="url(#hA)" opacity=".5"/><rect x="10" y="38" width="40" height="14" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M16,52 L22,66 M44,52 L38,66" stroke="${IRON}" stroke-width="3"/></svg>`; }
/* ---------- racimo (viewBox 0 0 220 280) ---------- */
function bunchInner(seed = 3, col = GRAPE) {
  const r = rng(seed); const rows = [5, 5, 4, 4, 3, 2, 1]; let g = '', sil = '';
  rows.forEach((n, i) => { for (let k = 0; k < n; k++) { const x = 110 + (k - (n - 1) / 2) * 36 + (r() - .5) * 6, y = 70 + i * 30 + (r() - .5) * 4; sil += `<circle cx="${f1(x)}" cy="${f1(y)}" r="21"/>`; g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="20" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M${f1(x)},${f1(y)} m4,-16 a20,20 0 0,1 12,24" stroke="${INK}" stroke-width="7" opacity=".25" fill="none"/><circle cx="${f1(x - 7)}" cy="${f1(y - 7)}" r="4.5" fill="#fff" opacity=".7"/>`; } });
  const leaf = 'M112,44 C120,14 168,6 190,22 C176,48 140,58 112,44 Z';
  return cut(sil + P(leaf), 5, 7) + `<path d="M110,50 Q106,30 114,10" stroke="#6b4a2a" stroke-width="8" stroke-linecap="round" fill="none"/>` + D(leaf, LEAF, 3) + HF(leaf, 'hB') + g;
}
/* ---------- bandera francesa ondeando (viewBox 0 0 300 220) ---------- */
function flagInner() {
  const fl = 'M20,20 Q90,0 160,20 T290,20 V160 Q220,180 160,160 T20,160 Z';
  let s = cut(P(fl) + '<rect x="10" y="10" width="14" height="210"/>', 5, 6);
  s += clipG(uid('fl'), fl, `<rect x="0" y="0" width="110" height="200" fill="${NAVY}"/><rect x="110" y="0" width="90" height="200" fill="#fff"/><rect x="200" y="0" width="120" height="200" fill="${RED}"/><rect x="0" y="0" width="300" height="200" fill="url(#hA)" opacity=".25"/>`);
  s += `<path d="${fl}" fill="none" stroke="${INK}" stroke-width="4"/><rect x="10" y="10" width="14" height="210" fill="${WOOD}" stroke="${INK}" stroke-width="3"/><circle cx="17" cy="8" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  return s;
}
/* ---------- extras para bustos (viewBox 360x460) ---------- */
const scarfOver = (col = '#7A2E3E') => {
  const sc = 'M104,206 C94,120 138,92 182,92 C228,92 270,120 258,206 C250,170 226,148 182,150 C140,148 114,170 104,206 Z';
  const sd = 'M104,206 Q98,272 132,318 L148,308 Q120,264 120,214 Z M258,206 Q264,272 230,318 L214,308 Q242,264 240,214 Z';
  return cut(P(sc) + P(sd), 3, 4) + D(sc, col, 3) + HF(sc, 'hB') + D(sd, col, 3) + `<path d="M130,120 q50,-20 104,0 M118,150 q60,-30 128,0" stroke="${FIG}" stroke-width="3" fill="none" stroke-dasharray="2 8" opacity=".8"/><circle cx="148" cy="246" r="5" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`;
};
const strawOver = () => {
  const brim = 'M30,178 Q180,138 330,178 Q180,214 30,178 Z', crown = 'M116,172 C112,122 140,100 180,100 C220,100 248,122 244,172 Z', band = 'M116,152 H244 V172 H116 Z';
  return cut(P(brim) + P(crown), 3, 5) + D(brim, '#E0C068', 3) + HF(brim, 'hF') + D(crown, '#E0C068', 3) + HF(crown, 'hB') + D(band, RED, 2.5);
};
function womanInner(seed, col = '#7A2E3E', shawl = '#5a3a3a') { return bustInner({ uniform: 'farmer', seed }) + coatOver(shawl) + scarfOver(col); }
function farmerInner(seed, v = 0) { return bustInner({ uniform: 'farmer', beard: v === 1, moustache: v === 2, seed }) + (v === 2 ? coatOver('#6b5a42') : '') + strawOver(); }

/* ---------- skyline de Madrid (viewBox 0 0 1080 700) ---------- */
function madridSvg() {
  const r = rng(1880); let s = '', sil = '';
  // fila trasera
  let back = 'M0,700 V360'; for (let x = 0; x < 1080; x += 90) { const h = 300 + r() * 120; back += ` H${x} V${f1(h)} H${x + 90}`; } back += ' V700 Z';
  s += `<path d="${back}" fill="#d9c7a6" stroke="${INK}" stroke-width="3"/><path d="${back}" fill="url(#hP)"/>`;
  // cúpula de iglesia
  s += `<path d="M720,300 Q790,180 860,300 Z" fill="#B8C4B0" stroke="${INK}" stroke-width="4"/><path d="M720,300 Q790,180 860,300 Z" fill="url(#hA)" opacity=".6"/><rect x="712" y="296" width="156" height="30" fill="${STONE}" stroke="${INK}" stroke-width="4"/><path d="M790,214 V160 M776,176 H804" stroke="${INK}" stroke-width="5"/>`;
  // fila delantera de casas con buhardillas
  const xs = [0, 170, 330, 520, 700, 880]; xs.forEach((x0, i) => {
    const w = (xs[i + 1] || 1080) - x0, top = 400 + r() * 60, col = ['#EAD8B8', '#E2C7A2', '#EFE0C4', '#E6CFAE'][i % 4];
    const d = `M${x0},700 V${f1(top)} L${x0 + 18},${f1(top - 50)} H${x0 + w - 18} L${x0 + w},${f1(top)} V700 Z`; sil += P(d);
    s += D(d, col, 4) + `<path d="${d}" fill="url(#hP)" opacity=".7"/>`;
    s += `<rect x="${x0 + w * 0.35}" y="${f1(top - 90)}" width="22" height="50" fill="${INK}"/>`;
    for (let row = 0; row < 3; row++) for (let k = 0; k < Math.floor(w / 60); k++) { const wx = x0 + 22 + k * 58, wy = top + 30 + row * 86; const lit = r() > 0.45; s += `<rect x="${f1(wx)}" y="${f1(wy)}" width="30" height="52" fill="${lit ? '#F7D774' : '#3a2a1e'}" stroke="${INK}" stroke-width="3"/><rect x="${f1(wx - 6)}" y="${f1(wy + 50)}" width="42" height="6" fill="${IRON}"/>`; }
  });
  s += `<rect x="0" y="660" width="1080" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
/* farola de gas (viewBox 0 0 80 360) */
const lampSvg = () => `<svg viewBox="0 0 80 360" width="100%" height="100%" style="overflow:visible">${cut('<path d="M20,40 L60,40 L52,92 L28,92 Z"/><rect x="34" y="92" width="12" height="260"/>', 4, 5)}<rect x="34" y="92" width="12" height="260" fill="${IRON}"/><rect x="24" y="330" width="32" height="26" fill="${IRON}"/><path class="lgl" d="M22,42 L58,42 L51,90 L29,90 Z" fill="#FFE27A" stroke="${INK}" stroke-width="4"/><path d="M16,40 L40,16 L64,40 Z" fill="${IRON}"/><path d="M40,42 V90" stroke="${INK}" stroke-width="2"/></svg>`;

/* ---------- viñedo (viewBox 0 0 900 600) ---------- */
function vineyardSvg() {
  const r = rng(1909); let s = `<rect x="0" y="0" width="900" height="600" fill="#F3E6C8"/>`;
  s += `<circle cx="720" cy="120" r="70" fill="${YEL}" stroke="${INK}" stroke-width="4"/><circle cx="720" cy="120" r="70" fill="url(#hP)"/>`;
  s += `<path d="M0,250 Q200,170 420,230 T900,200 V600 H0 Z" fill="#C9C48A" stroke="${INK}" stroke-width="4"/><path d="M0,250 Q200,170 420,230 T900,200 V600 H0 Z" fill="url(#hB)" opacity=".35"/>`;
  s += `<path d="M0,330 Q300,270 900,320 V600 H0 Z" fill="#B7B26E" stroke="${INK}" stroke-width="4"/>`;
  for (let i = 0; i < 6; i++) { const y = 360 + i * 46, sp = 60 + i * 26; for (let x = -40 + (i % 2) * sp / 2; x < 940; x += sp) { const rr = 10 + i * 4; s += `<path d="M${f1(x)},${f1(y + rr)} V${f1(y + rr * 2.2)}" stroke="#6b4a2a" stroke-width="${2 + i}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${rr}" fill="${LEAF}" stroke="${INK}" stroke-width="2.5"/><circle cx="${f1(x - rr * .5)}" cy="${f1(y - rr * .3)}" r="${f1(rr * .7)}" fill="#8fae5e" stroke="${INK}" stroke-width="2"/>`; if (i > 2 && r() > 0.4) s += `<circle cx="${f1(x + rr * .4)}" cy="${f1(y + rr * .6)}" r="${f1(rr * .35)}" fill="${GRAPE}" stroke="${INK}" stroke-width="1.6"/>`; } }
  return s;
}
/* montón de uvas (viewBox 0 0 600 300) */
function pileInner() {
  const r = rng(77); let g = '', sil = '';
  for (let k = 0; k < 120; k++) { const a = r(), x = 300 + (r() - .5) * 560 * Math.sqrt(1 - a * 0.7), y = 290 - a * 230 * (1 - Math.abs(x - 300) / 330); if (y < 40) continue; const rr = 18 + r() * 6; sil += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr + 1)}"/>`; g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr)}" fill="${r() > 0.25 ? GRAPE : GRAPE2}" stroke="${INK}" stroke-width="2.6"/><circle cx="${f1(x - rr * .35)}" cy="${f1(y - rr * .35)}" r="${f1(rr * .22)}" fill="#fff" opacity=".7"/>`; }
  return cut(sil, 5, 7) + g;
}
/* polaroid de recorte */
function polaroid(pa, x, y, w, h, cap, o = {}) {
  const wrap = box(pa, x, y, w, h + 70, { background: '#FBF6EA', border: `5px solid ${INK}`, boxShadow: `9px 10px 0 ${SH}`, zIndex: o.z || 10 });
  const inner = box(wrap, 14, 14, w - 38, h - 20, { overflow: 'hidden', background: o.bg || '#E9DCC0', border: `4px solid ${INK}` });
  el('div', wrap, { left: '0', top: px(h + 4), width: px(w - 10), textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(o.cs || 40), color: INK, whiteSpace: 'nowrap' }, cap);
  return { wrap, inner };
}
/* cartel con palo (¡UVA!) */
function placard(pa, x, y, w, txt, o = {}) {
  const d = box(pa, x, y, w, 330, { zIndex: o.z || 20, transformOrigin: `${w / 2}px 320px` });
  d.innerHTML = `<svg width="${w}" height="330" style="overflow:visible"><rect x="${w / 2 - 9}" y="120" width="18" height="210" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>${cut(`<rect x="0" y="0" width="${w}" height="150" rx="10"/>`, 6, 7)}<rect x="0" y="0" width="${w}" height="150" rx="10" fill="${o.bg || '#FBF6EA'}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="${w}" height="150" rx="10" fill="url(#hP)" opacity=".5"/></svg>`;
  el('div', d, { left: '0', top: '18px', width: px(w), textAlign: 'center', fontFamily: 'Rye', fontSize: px(o.size || 70), lineHeight: '110px', color: o.col || RED, whiteSpace: 'nowrap', textShadow: `3px 3px 0 ${INK}` }, txt);
  return d;
}
/* símbolos para multitudes (<use>) */
defsSvg.querySelector('defs').insertAdjacentHTML('beforeend',
  `<symbol id="wkA" viewBox="0 0 360 460" overflow="visible">${fanInner(71, 'slouch', '#5a4632')}</symbol>` +
  `<symbol id="wkB" viewBox="0 0 360 460" overflow="visible">${fanInner(74, 'cap', '#3a2f26')}</symbol>` +
  `<symbol id="wkC" viewBox="0 0 360 460" overflow="visible">${womanInner(81)}</symbol>` +
  `<symbol id="fmA" viewBox="0 0 360 460" overflow="visible">${farmerInner(91, 1)}</symbol>`);
