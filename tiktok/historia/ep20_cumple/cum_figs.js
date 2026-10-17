/* Ep. 20 · Cumpleaños feliz — tiempos clave + figuras nuevas (estilo grabado recortado de la serie) */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.cantar = ws(0); K.cumple = ws(1); K.feliz = ws(2); K.costar = ws(4); K.dinero = ws(5);
  const iy = fw('y asi fue hasta'); K.yasi = ws(iy); K.hasta = ws(iy + 3); K.d16 = ws(iy + 4); K.dieci16 = ws(iy + 6); K.L0e = wE(iy + 6);
  const ip = fw('y por eso en las peliculas'); K.L1 = ws(ip); K.peliculas = ws(ip + 5); K.casi = ws(ip + 6); K.nunca = ws(ip + 7); K.cantaban = ws(ip + 9); K.L1e = wE(ip + 9);
  const im = fw('la melodia es de finales'); K.L2 = ws(im); K.melodia = ws(im + 1); K.finales = ws(im + 4); K.siglo = ws(im + 6); K.xix = ws(im + 7);
  const ic = fw('la compusieron dos hermanas'); K.compus = ws(ic + 1); K.dosH = ws(ic + 2); K.hermanas = ws(ic + 3); K.americanas = ws(ic + 4);
  const ipc = fw('para una cancion de clase'); K.para = ws(ipc); K.cancion = ws(ipc + 2); K.clase = ws(ipc + 4);
  const ib = fw('buenos dias a todos'); K.buenos = ws(ib); K.dias = ws(ib + 1); K.aT = ws(ib + 2); K.todos1 = ws(ib + 3); K.L2e = wE(ib + 3);
  const ia = fw('con los anos la gente'); K.L3 = ws(ia); K.gente = ws(ia + 4); K.cambio = ws(ia + 6); K.letra = ws(ia + 8); K.cumple2 = ws(ia + 12); K.cumple2e = wE(ia + 12);
  const ie = fw('y una empresa acabo'); K.yuna = ws(ie); K.empresa = ws(ie + 2); K.acabo = ws(ie + 3); K.reclamando = ws(ie + 4); K.derechos = ws(ie + 6); K.L3e = wE(ie + 6);
  const ir = fw('resultado si salia'); K.L4 = ws(ir); K.resultado = ws(ir); K.pelicula = ws(ir + 5); K.anuncio = ws(ir + 9); K.pagar1 = ws(ir + 12);
  const ic2 = fw('algunas cadenas de restaurantes'); K.algunas = ws(ic2); K.cadenas = ws(ic2 + 1); K.restaurantes = ws(ic2 + 3); K.inventaban = ws(ic2 + 5); K.propia = ws(ic2 + 7); K.cancion2 = ws(ic2 + 8); K.nop = ws(ic2 + 10); K.pagar2 = ws(ic2 + 11); K.L4e = wE(ic2 + 11);
  const ih = fw('hasta que en dos mil quince'); K.L5 = ws(ih); K.d15 = ws(ih + 3); K.quince = ws(ih + 5); K.juez = ws(ih + 7); K.decidio = ws(ih + 8); K.derechos2 = ws(ih + 11); K.noV = ws(ih + 12); K.validos = ws(ih + 14);
  const id = fw('y desde dos mil dieciseis'); K.ydesde = ws(id); K.d16b = ws(id + 2); K.dieci16b = ws(id + 4); K.es = ws(id + 5); K.todos2 = ws(id + 7); K.L5e = wE(id + 7);
  const io = fw('ojo cantarla en tu casa'); K.ojo = ws(io); K.cantarla = ws(io + 1); K.casa = ws(io + 4); K.nunca2 = ws(io + 5); K.problema = ws(io + 8);
  const il = fw('lo que habia que pagar'); K.loque = ws(il); K.pagar3 = ws(il + 4); K.usarla = ws(il + 6); K.publico = ws(il + 8); K.negocios = ws(il + 11); K.L6e = wE(il + 11);
  const ios = fw('o sea la cancion mas cantada'); K.L7 = ws(ios); K.osea = ws(ios + 1); K.la7 = ws(ios + 2); K.cancion3 = ws(ios + 3); K.mas = ws(ios + 4); K.cantada = ws(ios + 5); K.mundo = ws(ios + 7);
  const iep = fw('era de pago'); K.era = ws(iep); K.pago = ws(iep + 2);
  const isb = fw('lo sabias'); K.lo = ws(isb); K.sabias = ws(isb + 1);
  const isi = fw('si o no', isb); K.si = ws(isi); K.noB = ws(isi + 2); K.L7e = wE(isi + 2);
  const is = fw('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, K.L1 - 0.1], B: [K.L1 - 0.1, K.L2 - 0.1],
  C1: [K.L2 - 0.1, K.compus - 0.08], C2: [K.compus - 0.08, K.para - 0.06], C3: [K.para - 0.06, K.L3 - 0.1],
  D1: [K.L3 - 0.1, K.yuna - 0.1], D2: [K.yuna - 0.1, K.L4 - 0.1],
  E1: [K.L4 - 0.1, K.algunas - 0.1], E2: [K.algunas - 0.1, K.L5 - 0.1],
  F1: [K.L5 - 0.1, K.ydesde - 0.1], F2: [K.ydesde - 0.1, K.ojo - 0.06],
  G1: [K.ojo - 0.06, K.loque - 0.08], G2: [K.loque - 0.08, K.L7 - 0.08],
  H: [K.L7 - 0.08, K.soy - 0.1],
  C: [K.soy - 0.1, K.enL - 0.04], L2: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

const CREAM = '#F6B9CF', CREAM2 = '#FBD9E5', GOLD = '#E9C75C';

/* ---------- TARTA DE CUMPLEAÑOS (viewBox 0 0 600 640) ---------- */
function cakeInner(o = {}) {
  const id = uid('ck'), r = rng(o.seed || 2016);
  const n = o.candles || 5;
  const plate = 'M6,598 Q300,664 594,598 Q300,548 6,598 Z';
  const tiers = [[50, 550, 440, 580], [120, 480, 320, 440], [190, 410, 212, 320]];
  const body = ([x0, x1, y0, y1]) => `M${x0},${y0} L${x0},${y1} Q${(x0 + x1) / 2},${y1 + 50} ${x1},${y1} L${x1},${y0} Z`;
  const top = ([x0, x1, y0]) => `M${x0},${y0} Q${(x0 + x1) / 2},${y0 + 46} ${x1},${y0} Q${(x0 + x1) / 2},${y0 - 46} ${x0},${y0} Z`;
  let sil = P(plate); tiers.forEach(tr => sil += P(body(tr)) + P(top(tr)));
  const cxs = []; for (let k = 0; k < n; k++) cxs.push(222 + k * (156 / (n - 1)));
  cxs.forEach(x => sil += `<rect x="${x - 10}" y="132" width="20" height="92" rx="5"/>`);
  let s = cut(sil, 10, 12);
  s += D(plate, '#EDE6D6', 4) + `<path d="${plate}" fill="url(#hB)" opacity=".5"/><path d="M40,600 Q300,644 560,600" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="4 8"/>`;
  tiers.forEach((tr, ti) => {
    const [x0, x1, y0, y1] = tr, bd = body(tr), tp = top(tr), w = x1 - x0;
    s += D(bd, FIG, 4) + clipG(id + 'b' + ti, bd, `<rect x="${x1 - w * 0.28}" y="${y0}" width="${w * 0.3}" height="${y1 - y0 + 60}" fill="url(#hA)"/><rect x="${x0}" y="${y1 - 26}" width="${w}" height="80" fill="url(#hB)" opacity=".6"/>`);
    // capas de bizcocho grabadas
    s += `<path d="M${x0},${(y0 + y1) / 2 + 12} Q${(x0 + x1) / 2},${(y0 + y1) / 2 + 58} ${x1},${(y0 + y1) / 2 + 12}" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".55"/>`;
    // glaseado que gotea
    const pts = []; const N = Math.round(w / 34);
    for (let k = 0; k <= N; k++) { const u = k / N, x = x0 - 4 + (w + 8) * u; pts.push([x, y0 + 100 * u * (1 - u) * 0.46 - 8]); }
    for (let k = N; k >= 0; k--) { const u = k / N, x = x0 - 4 + (w + 8) * u, e = y0 + 100 * u * (1 - u) * 0.46; pts.push([x, e + (k % 2 ? 30 + r() * 24 : 8 + r() * 6)]); }
    const drip = smooth(pts);
    s += D(drip, CREAM, 3.5) + `<path d="${drip}" fill="url(#hA)" opacity=".18"/>`;
    s += D(tp, CREAM2, 4) + `<path d="${tp}" fill="url(#hB)" opacity=".25"/>`;
    // perlas / frutos rojos
    const nb = Math.round(w / 56);
    for (let k = 0; k < nb; k++) { const u = (k + 0.5) / nb, x = x0 + w * u, y = (y0 + y1) / 2 + 100 * u * (1 - u) * 0.46 + 30; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${ti === 2 ? 9 : 12}" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="${f1(x - 3)}" cy="${f1(y - 4)}" r="3.5" fill="#fff" opacity=".7"/>`; }
  });
  // velas + llamas
  cxs.forEach((x, k) => {
    s += `<rect x="${x - 10}" y="140" width="20" height="84" rx="5" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
    s += `<path d="M${x - 10},${156} l20,-10 M${x - 10},${178} l20,-10 M${x - 10},${200} l20,-10 M${x - 10},${222} l20,-10" stroke="${[PINK, '#5b8bd6', YEL, PINK, '#7ac08a'][k % 5]}" stroke-width="6"/>`;
    s += `<rect x="${x - 10}" y="140" width="20" height="84" rx="5" fill="none" stroke="${INK}" stroke-width="3.5"/><path d="M${x},140 v-10" stroke="${INK}" stroke-width="3"/>`;
    s += `<g class="fl" data-x="${x}" data-y="132"><path d="M${x},${68} C${x + 22},${98} ${x + 18},${132} ${x},${134} C${x - 18},${132} ${x - 22},${98} ${x},${68} Z" fill="${YEL}" stroke="${INK}" stroke-width="3.5"/><path d="M${x},${96} C${x + 9},${110} ${x + 8},${128} ${x},${128} C${x - 8},${128} ${x - 9},${110} ${x},${96} Z" fill="#F2983E"/></g>`;
    s += `<g class="sm" style="opacity:0"><path d="M${x},128 q-12,-20 0,-36 q12,-16 0,-34" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/></g>`;
  });
  return s;
}
function mkCake(pa, b, o) { const f = mk(pa, b, cakeInner(o), '0 0 600 640', 'cake'); f.fl = [...f.d.querySelectorAll('.fl')]; f.sm = [...f.d.querySelectorAll('.sm')]; return f; }
// llamas vivas (out = 0..1 apagadas)
function flick(f, t, out = 0) {
  f.fl.forEach((g, i) => {
    const x = +g.dataset.x, y = +g.dataset.y, k = 1 - out;
    const sy = (1 + 0.16 * Math.sin(t * 13 + i * 1.7) + 0.06 * Math.sin(t * 29 + i)) * k, sx = (1 - 0.1 * Math.sin(t * 11 + i * 2.3)) * k, rr = 7 * Math.sin(t * 7 + i * 1.3);
    g.setAttribute('transform', `translate(${x} ${y}) rotate(${f1(rr)}) scale(${f1(Math.max(0.001, sx) * 100) / 100} ${f1(Math.max(0.001, sy) * 100) / 100}) translate(${-x} ${-y})`);
  });
  f.sm.forEach((g, i) => { g.style.opacity = out > 0.5 ? 1 : 0; g.setAttribute('transform', `translate(0 ${f1(-((t * 40 + i * 9) % 30))})`); });
}

/* ---------- NOTAS MUSICALES (viewBox 0 0 120 150) ---------- */
function noteSvg(kind = 0, col = INK) {
  const a = kind === 0
    ? `<ellipse cx="38" cy="118" rx="26" ry="18" transform="rotate(-22 38 118)"/><path d="M58,112 V18 C76,30 104,40 98,84 C94,60 78,52 58,48 Z"/><rect x="54" y="16" width="8" height="100"/>`
    : `<ellipse cx="26" cy="124" rx="22" ry="16" transform="rotate(-22 26 124)"/><ellipse cx="92" cy="108" rx="22" ry="16" transform="rotate(-22 92 108)"/><rect x="42" y="30" width="8" height="92"/><rect x="108" y="14" width="8" height="92"/><path d="M42,30 L116,14 L116,34 L42,50 Z"/>`;
  return `<svg viewBox="0 0 120 150" width="100%" height="100%" style="overflow:visible"><g fill="${SH}" stroke="${SH}" stroke-width="12" stroke-linejoin="round" transform="translate(5,6)">${a}</g><g fill="#fff" stroke="#fff" stroke-width="16" stroke-linejoin="round">${a}</g><g fill="${col}" stroke="${INK}" stroke-width="3" stroke-linejoin="round">${a}</g></svg>`;
}
const noteBox = (pa, x, y, sz = 110, kind = 0, col = INK, z = 20) => { const d = box(pa, x, y, sz, sz * 1.25, { zIndex: z }); d.innerHTML = noteSvg(kind, col); return d; };

/* ---------- CAJA REGISTRADORA (viewBox 0 0 420 440) ---------- */
function registerInner() {
  const disp = 'M110,6 H310 V112 H110 Z', neck = 'M180,112 H240 V140 H180 Z', body = 'M40,138 H380 L412,336 H8 Z', drawer = 'M-4,336 H424 V410 H-4 Z';
  let s = cut(P(disp) + P(neck) + P(body) + P(drawer) + '<rect x="-14" y="404" width="448" height="30" rx="8"/>');
  s += D(neck, BRASS, 4) + D(disp, '#2f3530', 5) + `<rect x="124" y="20" width="172" height="78" rx="8" fill="#1a1f1a" stroke="${BRASS}" stroke-width="4"/>`;
  s += `<text class="disp" x="210" y="82" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="66" fill="${YEL}">€ ?</text>`;
  s += D(body, BRASS, 5) + clipG(uid('rg'), body, `<rect x="300" y="130" width="120" height="220" fill="url(#hA)"/><rect x="0" y="300" width="420" height="40" fill="url(#hB)"/>`);
  for (let rr = 0; rr < 3; rr++) for (let c = 0; c < 5; c++) { const x = 84 + c * 56 + rr * -6, y = 170 + rr * 52; s += `<rect x="${x}" y="${y}" width="40" height="34" rx="9" fill="#FBF6EA" stroke="${INK}" stroke-width="3.5"/><circle cx="${x + 20}" cy="${y + 17}" r="5" fill="${INK}"/>`; }
  s += `<path d="M380,190 l34,-30" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><circle cx="418" cy="156" r="14" fill="${RED}" stroke="${INK}" stroke-width="4"/>`;
  s += `<g class="drawer">${D(drawer, WOOD, 5)}<path d="${drawer}" fill="url(#hW)" opacity=".3"/><rect x="170" y="358" width="80" height="20" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></g>`;
  s += `<rect x="-14" y="404" width="448" height="30" rx="8" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function mkReg(pa, b) { const f = mk(pa, b, registerInner(), '0 0 420 440', 'reg'); f.disp = f.d.querySelector('.disp'); f.drawer = f.d.querySelector('.drawer'); return f; }

/* ---------- PERSONAJES (bustos 0 0 360 460) ---------- */
const DRESS = (col) => {
  const torso = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${torso}" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="${torso}" fill="url(#hA)" opacity=".3"/>` +
    `<path d="M40,460 C38,392 72,356 120,342 C106,380 100,420 102,460 Z" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M320,460 C322,392 288,356 240,342 C254,380 260,420 258,460 Z" fill="${col}" stroke="${INK}" stroke-width="3"/>` +
    `<path d="M60,420 q20,-30 50,-50 M300,420 q-20,-30 -50,-50" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/>` +
    `<path d="M146,322 L214,322 L222,358 Q180,372 138,358 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/><path d="M146,332 L214,332 M144,344 L216,344" stroke="${INK}" stroke-width="1.3" opacity=".6"/>` +
    `<circle cx="180" cy="372" r="12" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="372" r="5" fill="${PINK}"/>`;
};
const LASH = `<path d="M143,201 l-10,-6 M145,197 l-6,-9 M217,201 l10,-6 M215,197 l6,-9" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><ellipse cx="138" cy="236" rx="14" ry="8" fill="${PINK}" opacity=".3"/><ellipse cx="222" cy="236" rx="14" ry="8" fill="${PINK}" opacity=".3"/>`;
function ladyInner(seed, hair = '#3a2a1e', dress = '#6b4a5a', o = {}) {
  let s = bustInner({ uniform: 'soldier', seed });
  s += DRESS(dress);
  const cap = 'M108,224 C94,150 134,110 180,110 C226,110 266,150 252,224 C246,192 232,168 210,160 C198,156 188,160 180,172 C172,160 162,156 150,160 C128,168 114,192 108,224 Z';
  if (o.braids) {
    [[96, 262], [264, 262]].forEach(([x, y]) => s += `<path d="M${x},${y - 60} q-14,30 0,60 q14,30 0,60" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M${x},${y - 60} q-14,30 0,60 q14,30 0,60" stroke="${hair}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M${x - 10},${y - 30} l20,8 M${x - 10},${y} l20,8 M${x - 10},${y + 30} l20,8" stroke="${INK}" stroke-width="2"/><circle cx="${x}" cy="${y + 64}" r="11" fill="${PINK}" stroke="${INK}" stroke-width="3"/>`);
  } else {
    s += `<circle cx="180" cy="96" r="38" fill="${hair}" stroke="${INK}" stroke-width="3.5"/><circle cx="180" cy="96" r="38" fill="url(#hA)" opacity=".5"/><path d="M150,92 q30,-24 60,0 M156,108 q24,-18 48,0" stroke="${INK}" stroke-width="2" fill="none"/>`;
  }
  s += `<path d="${cap}" fill="${hair}" stroke="${INK}" stroke-width="3.5"/><path d="${cap}" fill="url(#hA)" opacity=".45"/><path d="M180,172 C176,150 166,128 150,120 M180,172 C186,150 196,128 214,120 M130,190 q4,-30 30,-52 M232,190 q-4,-30 -30,-52" stroke="${INK}" stroke-width="2" fill="none"/>`;
  s += LASH;
  if (o.specs) s += specsOver();
  return s;
}
function kidInner(seed, girl, smock = '#7d8fa8', hair = '#5a3d26') {
  if (girl) return ladyInner(seed, hair, smock, { braids: true });
  let s = bustInner({ uniform: 'soldier', seed }) + coatOver(smock);
  const cap = 'M112,210 C104,146 140,122 180,122 C222,122 258,146 248,210 C240,178 222,164 198,168 C186,160 172,170 160,166 C138,166 120,180 112,210 Z';
  s += `<path d="${cap}" fill="${hair}" stroke="${INK}" stroke-width="3.5"/><path d="${cap}" fill="url(#hA)" opacity=".4"/><path d="M150,140 q-6,20 6,30 M180,128 q-4,20 4,38 M210,136 q4,18 -4,32" stroke="${INK}" stroke-width="2" fill="none"/>`;
  return s;
}
const TOPHAT = (col = '#1e1a17') => {
  const crown = 'M128,152 L138,30 L222,30 L232,152 Z', brim = 'M80,154 Q180,128 280,154 Q180,182 80,154 Z';
  return cut(P(crown) + P(brim), 4, 6) + D(crown, col, 4) + `<path d="${crown}" fill="url(#hA)" opacity=".35"/><ellipse cx="180" cy="30" rx="42" ry="9" fill="#3a3330" stroke="${INK}" stroke-width="3"/><path d="M129,124 L231,124 L232,150 L128,150 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>` + D(brim, col, 4) + `<path d="M150,46 L146,120" stroke="#fff" stroke-width="4" opacity=".35"/>`;
};
const BOWTIE = (col = INK) => `<path d="M180,346 L148,330 L150,364 Z M180,346 L212,330 L210,364 Z" fill="${col}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><rect x="172" y="338" width="16" height="16" rx="4" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
function suitInner(seed = 41, hat = true) {
  return bustInner({ uniform: 'soldier', moustache: true, seed }) + coatOver('#26201b') + BOWTIE(RED) + `<path d="M232,392 l18,-6 l4,14 l-18,6 Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + `<circle cx="204" cy="204" r="20" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="4"/><path d="M224,206 q10,30 2,60" stroke="${BRASS}" stroke-width="3" fill="none"/>` + (hat ? TOPHAT() : '');
}
function judgeInner(seed = 55) {
  let s = bustInner({ uniform: 'soldier', seed }) + coatOver('#151210');
  s += `<path d="M150,336 L210,336 L200,400 L180,388 L160,400 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M162,350 h36 M164,364 h32" stroke="${INK}" stroke-width="1.5"/>`;
  let wig = ''; const C = [];
  for (let y = 150; y <= 330; y += 30) { C.push([104 - (y - 150) * 0.08, y]); C.push([256 + (y - 150) * 0.08, y]); }
  [[124, 132], [150, 116], [180, 110], [210, 116], [236, 132]].forEach(q => C.push(q));
  C.forEach(([x, y]) => wig += `<circle cx="${f1(x)}" cy="${y}" r="21" fill="#F4F1E8" stroke="${INK}" stroke-width="3"/><path d="M${f1(x - 11)},${y + 2} q11,-12 22,0" stroke="${INK}" stroke-width="2" fill="none"/>`);
  return s + wig;
}
function waiterInner(seed, v = 0) {
  let s = bustInner({ uniform: 'soldier', moustache: v === 0, seed }) + coatOver('#1e1a17') + BOWTIE(INK);
  const cap = 'M114,204 C106,146 142,122 180,122 C220,122 256,146 248,204 C240,172 214,152 150,160 C136,170 120,184 114,204 Z';
  s += `<path d="${cap}" fill="#2a211a" stroke="${INK}" stroke-width="3.5"/><path d="M150,160 q40,-16 92,20 M140,150 q40,-20 90,4" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`;
  return s;
}
const PARTYHAT = (col = PINK, dx = 0) => `<g transform="translate(${dx},0) rotate(-10 180 120)"><path d="M140,148 L184,30 L226,148 Z" fill="${col}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M158,100 L208,104 M148,128 L218,132 M170,64 L196,66" stroke="${YEL}" stroke-width="9"/><path d="M140,148 L184,30 L226,148 Z" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><circle cx="184" cy="28" r="15" fill="${YEL}" stroke="${INK}" stroke-width="4"/></g>`;
const mkB = (pa, b, inner) => mk(pa, b, inner, '0 0 360 460', 'bust');

/* ---------- OBJETOS ---------- */
// maletín (0 0 260 200)
const caseSvg = () => `<svg viewBox="0 0 260 200" width="100%" height="100%" style="overflow:visible">${cut('<rect x="10" y="46" width="240" height="148" rx="16"/><path d="M90,50 V18 Q90,6 102,6 H158 Q170,6 170,18 V50 H154 V22 H106 V50 Z"/>', 5, 7)}<path d="M90,50 V18 Q90,6 102,6 H158 Q170,6 170,18 V50 H154 V22 H106 V50 Z" fill="${LEATHER}" stroke="${INK}" stroke-width="4"/><rect x="10" y="46" width="240" height="148" rx="16" fill="#6b3f22" stroke="${INK}" stroke-width="5"/><rect x="10" y="46" width="240" height="148" rx="16" fill="url(#hA)" opacity=".35"/><path d="M10,96 H250" stroke="${INK}" stroke-width="4"/><rect x="56" y="84" width="30" height="26" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><rect x="174" y="84" width="30" height="26" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M24,60 h212" stroke="#fff" stroke-width="2" opacity=".3" stroke-dasharray="6 6"/></svg>`;
// mazo de juez (0 0 320 260)
const gavelSvg = () => `<svg viewBox="0 0 320 260" width="100%" height="100%" style="overflow:visible">${cut('<path d="M150,120 L300,236 L284,252 L134,138 Z"/><rect x="60" y="20" width="110" height="150" rx="18" transform="rotate(38 115 95)"/>', 5, 7)}<path d="M150,120 L300,236 L284,252 L134,138 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M150,120 L300,236 L284,252 L134,138 Z" fill="url(#hA)" opacity=".4"/><g transform="rotate(38 115 95)"><rect x="60" y="20" width="110" height="150" rx="18" fill="#7a4a26" stroke="${INK}" stroke-width="5"/><rect x="60" y="20" width="110" height="150" rx="18" fill="url(#hW)" opacity=".4"/><rect x="52" y="34" width="126" height="22" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="52" y="134" width="126" height="22" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></g></svg>`;
// claqueta (0 0 420 360); brazo .arm gira en (14,96)
const clapSvg = () => {
  let st = ''; for (let k = 0; k < 6; k++) st += `<path d="M${14 + k * 70},40 L${54 + k * 70},40 L${24 + k * 70},96 L${-16 + k * 70},96 Z" fill="#fff"/>`;
  let st2 = ''; for (let k = 0; k < 6; k++) st2 += `<path d="M${14 + k * 70},104 L${54 + k * 70},104 L${24 + k * 70},150 L${-16 + k * 70},150 Z" fill="#fff"/>`;
  return `<svg viewBox="0 0 420 360" width="100%" height="100%" style="overflow:visible">${cut('<rect x="10" y="100" width="400" height="250" rx="10"/><rect x="10" y="40" width="400" height="58"/>', 6, 8)}
  <rect x="10" y="100" width="400" height="250" rx="10" fill="#1d1916" stroke="${INK}" stroke-width="5"/><clipPath id="clb"><rect x="10" y="104" width="400" height="46"/></clipPath><g clip-path="url(#clb)">${st2}</g>
  <path d="M30,210 H390 M30,280 H390 M210,160 V340" stroke="#F4F1E8" stroke-width="3" opacity=".8"/>
  <text x="40" y="200" font-family="SpecialElite" font-size="30" fill="#F4F1E8">ESCENA</text><text x="230" y="200" font-family="SpecialElite" font-size="30" fill="#F4F1E8">TOMA</text>
  <text x="120" y="262" font-family="Rye" font-size="52" fill="${YEL}">1</text><text x="290" y="262" font-family="Rye" font-size="52" fill="${YEL}">3</text>
  <text x="210" y="326" text-anchor="middle" font-family="SpecialElite" font-size="28" fill="#F4F1E8">LA FIESTA</text>
  <g class="arm"><rect x="10" y="40" width="400" height="58" rx="6" fill="#1d1916" stroke="${INK}" stroke-width="5"/><clipPath id="cla"><rect x="10" y="44" width="400" height="50"/></clipPath><g clip-path="url(#cla)">${st}</g><circle cx="24" cy="96" r="12" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></g></svg>`;
};
// televisor antiguo (0 0 420 400) — la pantalla se rellena desde fuera
const tvSvg = () => `<svg viewBox="0 0 420 400" width="100%" height="100%" style="overflow:visible">${cut('<rect x="10" y="10" width="400" height="320" rx="34"/><path d="M80,330 L60,396 H86 L106,330 Z M340,330 L360,396 H334 L314,330 Z"/>', 6, 8)}<path d="M80,330 L60,396 H86 L106,330 Z M340,330 L360,396 H334 L314,330 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="10" y="10" width="400" height="320" rx="34" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="10" y="10" width="400" height="320" rx="34" fill="url(#hW)" opacity=".35"/><rect x="34" y="34" width="268" height="272" rx="40" fill="#2f3530" stroke="${INK}" stroke-width="6"/><circle cx="356" cy="90" r="24" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="356" cy="160" r="24" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><path d="M356,70 v20 M356,140 l12,14" stroke="${INK}" stroke-width="4"/><path d="M330,220 h52 M330,236 h52 M330,252 h52 M330,268 h52" stroke="${INK}" stroke-width="3"/><path d="M160,10 L110,-60 M260,10 L300,-70" stroke="${INK}" stroke-width="5"/></svg>`;
// moneda (0 0 100 100) — sin cifras
const coinSvg = () => `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><circle cx="54" cy="56" r="44" fill="${SH}"/><circle cx="50" cy="50" r="46" fill="#fff"/><circle cx="50" cy="50" r="40" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="50" cy="50" r="31" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="3 4"/><text x="50" y="68" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">€</text></svg>`;
// saco de dinero (0 0 220 240)
const bagSvg2 = () => `<svg viewBox="0 0 220 240" width="100%" height="100%" style="overflow:visible">${cut('<path d="M80,64 C20,96 6,170 26,206 C46,240 174,240 194,206 C214,170 200,96 140,64 Z"/><path d="M78,64 L60,20 Q110,40 160,20 L142,64 Z"/>', 5, 7)}<path d="M80,64 C20,96 6,170 26,206 C46,240 174,240 194,206 C214,170 200,96 140,64 Z" fill="#D9B98A" stroke="${INK}" stroke-width="5"/><path d="M80,64 C20,96 6,170 26,206 C46,240 174,240 194,206 C214,170 200,96 140,64 Z" fill="url(#hA)" opacity=".5"/><path d="M78,64 L60,20 Q110,40 160,20 L142,64 Z" fill="#D9B98A" stroke="${INK}" stroke-width="4"/><path d="M70,66 Q110,80 150,66" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round"/><text x="110" y="196" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="100" fill="${INK}">€</text></svg>`;
// pizarra (de Ep. 10)
function chalkboard(pa, x, y, w, h, z = 3) {
  const d = box(pa, x, y, w, h, { zIndex: z });
  d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="18"/>`)}<rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="${w}" height="${h}" rx="18" fill="url(#hW)" opacity=".3"/><rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="8" fill="#2f3530" stroke="${INK}" stroke-width="5"/><path d="M60,${h - 70} q120,-20 240,4 M${w - 340},80 q100,10 260,-6" stroke="#fff" stroke-width="3" opacity=".12" fill="none"/></svg>`;
  return d;
}
const chalk = (pa, x, y, html, sz = 90, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: px(sz), lineHeight: 1, color: '#F4F1E8', whiteSpace: 'nowrap', zIndex: 6, textShadow: '2px 2px 0 rgba(255,255,255,.18)' }, css), html);

/* PARTITURA: papel con pentagramas + título intercambiable */
function scoreSheet(pa, x, y, w, h, o = {}) {
  const pp = paperPiece(pa, x, y, w, h, { seed: o.seed || 7, bg: '#FBF6EA' });
  const iw = w - 18, ih = h - 18, top = o.top || 120;
  let st = '', nt = '';
  const rr = rng(o.seed || 7);
  for (let yy = top; yy < ih - 50; yy += 90) {
    for (let k = 0; k < 5; k++) st += `<path d="M24,${yy + k * 12} H${iw - 24}" stroke="${INK}" stroke-width="2.4" opacity=".75"/>`;
    st += `<path d="M44,${yy + 40} C34,${yy + 30} 46,${yy + 18} 56,${yy + 26} C66,${yy + 36} 54,${yy + 54} 38,${yy + 46} C24,${yy + 36} 34,${yy + 12} 50,${yy - 2} C60,${yy - 12} 56,${yy - 26} 48,${yy - 20} C40,${yy - 12} 44,${yy + 20} 50,${yy + 64} C52,${yy + 76} 38,${yy + 76} 40,${yy + 66}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    for (let xx = 90; xx < iw - 40; xx += 46 + rr() * 20) { const ny = yy + Math.round(rr() * 8) * 6; nt += `<g class="nt"><ellipse cx="${f1(xx)}" cy="${ny}" rx="9" ry="7" transform="rotate(-20 ${f1(xx)} ${ny})" fill="${INK}"/><path d="M${f1(xx + 8)},${ny} V${ny - 40}" stroke="${INK}" stroke-width="2.6"/></g>`; }
  }
  const sv = box(pp.inner, 0, 0, iw, ih); sv.innerHTML = `<svg width="${iw}" height="${ih}">${st}${nt}</svg>`;
  const notes = [...sv.querySelectorAll('.nt')];
  const T = (txt, css = {}) => el('div', pp.inner, Object.assign({ left: '0', top: px(o.ty || 18), width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(o.tsz || 54), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 5 }, css), txt);
  return { wrap: pp.wrap, inner: pp.inner, notes, T, iw, ih };
}

/* tira de película (div) */
function filmStrip(pa, x, y, w, h, z = 6) {
  const d = box(pa, x, y, w, h, { zIndex: z, background: '#1d1916', border: `5px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}`, backgroundImage: `repeating-linear-gradient(90deg, transparent 0 14px, #F4F1E8 14px 34px, transparent 34px 48px)`, backgroundSize: '48px 22px', backgroundRepeat: 'repeat-x', backgroundPosition: '0 8px' });
  box(d, 0, h - 40, w - 10, 22, { backgroundImage: `repeating-linear-gradient(90deg, transparent 0 14px, #F4F1E8 14px 34px, transparent 34px 48px)` });
  return d;
}
