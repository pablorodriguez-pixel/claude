/* Ep. 18 · El himno de España no tiene letra — tiempos clave + figuras nuevas (grabado recortado) */

/* ---------- tiempos clave (todo por texto, nunca absolutos) ---------- */
const fw = (ph, from = 0) => find(ph, from);
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = fw('el himno de espana no tiene letra');
  K.himno = ws(i0 + 1); K.espana = ws(i0 + 3); K.no0 = ws(i0 + 4); K.tiene0 = ws(i0 + 5); K.letra0 = ws(i0 + 6);
  const io = fw('y no es un olvido'); K.y0 = ws(io); K.noes0 = ws(io + 1); K.olvido = ws(io + 4); K.L0e = wE(io + 4);
  const i1 = fw('es de los poquisimos'); K.L1 = ws(i1); K.poq = ws(i1 + 3); K.himnos = ws(i1 + 4); K.mundo = ws(i1 + 6); K.noL1 = ws(i1 + 8); K.tiene1 = ws(i1 + 10); K.L1e = wE(i1 + 10);
  const i2 = fw('nacio en el siglo dieciocho'); K.L2 = ws(i2); K.siglo = ws(i2 + 3); K.d18 = ws(i2 + 4);
  const im = fw('como marcha militar'); K.marcha = ws(im + 1); K.militar = ws(im + 2);
  const ig = fw('la marcha de granaderos'); K.mGran = ws(ig + 1); K.gran = ws(ig + 3);
  const ip = fw('musica para desfilar'); K.musica = ws(ip); K.desfilar = ws(ip + 2);
  const isp = fw('sin palabras'); K.sin = ws(isp); K.palabras = ws(isp + 1); K.L2e = wE(isp + 1);
  const i3 = fw('con el tiempo se convirtio'); K.L3 = ws(i3); K.tiempo = ws(i3 + 2); K.convirtio = ws(i3 + 4);
  const ir = fw('la marcha real'); K.mReal = ws(ir + 1); K.real = ws(ir + 2);
  const iv = fw('y le pusieron varias letras'); K.y3 = ws(iv); K.pusieron = ws(iv + 2); K.varias = ws(iv + 3); K.letras = ws(iv + 4);
  const ino = fw('pero ninguna oficial que durara'); K.pero = ws(ino); K.ninguna = ws(ino + 1); K.oficial = ws(ino + 2); K.durara = ws(ino + 4); K.L3e = wE(ino + 4);
  const i4 = fw('en la dictadura'); K.L4 = ws(i4); K.dict = ws(i4 + 2);
  const ic = fw('se canto una muy conocida'); K.canto = ws(ic + 1); K.muy = ws(ic + 3); K.conocida = ws(ic + 4);
  const id = fw('con la democracia'); K.con4 = ws(id); K.democ = ws(id + 2);
  const iu = fw('dejo de usarse'); K.dejo = ws(iu); K.usarse = ws(iu + 2); K.L4e = wE(iu + 2);
  const i5 = fw('y en dos mil siete'); K.L5 = ws(i5); K.dos = ws(i5 + 2); K.siete = ws(i5 + 4);
  const it = fw('se intento otra vez'); K.intento = ws(it + 1); K.otra = ws(it + 2); K.vez = ws(it + 3);
  const ipr = fw('se presento una letra nueva'); K.presento = ws(ipr + 1); K.letraN = ws(ipr + 3); K.nueva = ws(ipr + 4);
  const irt = fw('y se retiro en pocos dias'); K.y5 = ws(irt); K.retiro = ws(irt + 2); K.pocos = ws(irt + 4); K.dias = ws(irt + 5);
  const icr = fw('por las criticas'); K.criticas = ws(icr + 2); K.L5e = wE(icr + 2);
  const i6 = fw('ojo que no tenga'); K.ojo = ws(i6); K.tenga = ws(i6 + 3); K.oficial6 = ws(i6 + 5);
  const isg = fw('no significa que nadie la cante'); K.no6 = ws(isg); K.significa = ws(isg + 1); K.nadie = ws(isg + 3); K.cante = ws(isg + 5);
  const imt = fw('mucha gente tararea'); K.mucha = ws(imt); K.tararea = ws(imt + 2);
  const iin = fw('o se inventa la suya'); K.o6 = ws(iin); K.inventa = ws(iin + 2); K.suya = ws(iin + 4); K.L6e = wE(iin + 4);
  const i7 = fw('o sea cuando suena'); K.L7 = ws(i7); K.osea = ws(i7 + 1); K.cuando = ws(i7 + 2); K.suena = ws(i7 + 3); K.himno7 = ws(i7 + 5);
  const ins = fw('y no sabes que cantar'); K.nosabes = ws(ins + 1); K.cantar = ws(ins + 4);
  const icu = fw('no es culpa tuya'); K.noes = ws(icu); K.culpa = ws(icu + 2); K.tuya = ws(icu + 3);
  const ils = fw('lo sabias'); K.lo = ws(ils); K.sabias = ws(ils + 1);
  const isn = fw('si o no', ils); K.si = ws(isn); K.noB = ws(isn + 2); K.L7e = wE(isn + 2);
  const is = fw('soy tu vecino'); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2);
  const iye = fw('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.noV = ws(iye + 2); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, (K.L0e + K.L1) / 2], B: [(K.L0e + K.L1) / 2, K.L2 - 0.1],
  G1: [K.L2 - 0.1, K.musica - 0.1], G2: [K.musica - 0.1, K.L3 - 0.1],
  M1: [K.L3 - 0.1, K.y3 - 0.12], M2: [K.y3 - 0.12, K.L4 - 0.1],
  D1: [K.L4 - 0.1, K.con4 - 0.08], D2: [K.con4 - 0.08, K.L5 - 0.1],
  Y1: [K.L5 - 0.1, K.presento - 0.15], Y2: [K.presento - 0.15, K.ojo - 0.08],
  O1: [K.ojo - 0.08, K.mucha - 0.08], O2: [K.mucha - 0.08, K.L7 - 0.1],
  HIT: [K.L7 - 0.1, K.soy - 0.1],
  C: [K.soy - 0.1, K.noV - 0.06], L2: [K.noV - 0.06, 999],
};
const DUR = K.END + 0.8, LOOP = DUR - 0.4;

/* ---------- notas musicales (viewBox 0 0 100 140) ---------- */
function noteSvg(kind = 0, col = INK) {
  let sil, det;
  if (kind === 0) {
    const flag = 'M60,14 C74,26 98,40 90,78 C86,58 74,48 60,44 Z';
    sil = `<ellipse cx="36" cy="112" rx="26" ry="18" transform="rotate(-22 36 112)"/><rect x="54" y="12" width="9" height="100"/>` + P(flag);
    det = `<ellipse cx="36" cy="112" rx="26" ry="18" transform="rotate(-22 36 112)" fill="${col}"/><rect x="54" y="12" width="9" height="100" fill="${col}"/><path d="${flag}" fill="${col}"/><ellipse cx="28" cy="106" rx="8" ry="4" fill="#fff" opacity=".5" transform="rotate(-22 28 106)"/>`;
  } else {
    const beam = 'M30,10 L94,0 L94,16 L30,26 Z';
    sil = `<ellipse cx="18" cy="118" rx="20" ry="14" transform="rotate(-22 18 118)"/><ellipse cx="82" cy="108" rx="20" ry="14" transform="rotate(-22 82 108)"/><rect x="30" y="12" width="8" height="104"/><rect x="92" y="2" width="8" height="104"/>` + P(beam);
    det = sil.replace(/\/>/g, ` fill="${col}"/>`);
  }
  return `<svg viewBox="0 0 100 140" width="100%" height="100%" style="overflow:visible">${cut(sil, 4, 5)}${det}</svg>`;
}
function noteEl(pa, x, y, sz = 90, kind = 0, col = INK, z = 30) { const d = box(pa, x, y, sz, sz * 1.4, { zIndex: z }); d.innerHTML = noteSvg(kind, col); return d; }

/* ---------- garabato de «letra» ilegible ---------- */
function scribble(x0, x1, y, seed, amp = 9) {
  const r = rng(seed); let d = '', x = x0;
  while (x < x1 - 20) {
    const len = Math.min(x1 - x, 34 + r() * 70); d += `M${f1(x)},${f1(y)}`;
    for (let xx = 0; xx < len; xx += 9) { const a = amp * (0.5 + r() * 0.8); d += ` q3,${f1(-a)} 6,${f1(-a * 0.2)} q2,${f1(a * 0.6)} 3,${f1(a * 0.2)}`; }
    x += len + 14 + r() * 10;
  }
  return d;
}
/* partitura (pentagramas + notas; opción de «letra» ilegible debajo) */
function scorePaper(pa, x, y, w, h, o = {}) {
  const pp = paperPiece(pa, x, y, w, h, { seed: o.seed || 5, bg: o.bg || '#FBF6EA' });
  const iw = w - 18, ih = h - 18, r = rng(o.seed || 5);
  let s = '';
  const top = o.top || 100, gap = o.gap || 110, n = o.staves || 3;
  for (let k = 0; k < n; k++) {
    const y0 = top + k * gap;
    for (let l = 0; l < 5; l++) s += `<path d="M28,${y0 + l * 11} H${iw - 28}" stroke="${INK}" stroke-width="2.2" opacity=".75"/>`;
    s += `<path d="M28,${y0} V${y0 + 44} M${iw - 28},${y0} V${y0 + 44}" stroke="${INK}" stroke-width="3"/>`;
    if (k === 0) s += `<text x="34" y="${y0 + 42}" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">𝄞</text>`;
    for (let xx = 90; xx < iw - 50; xx += 34 + r() * 18) {
      const ny = y0 + Math.round(r() * 8) * 5.5; const up = ny > y0 + 22;
      s += `<ellipse cx="${f1(xx)}" cy="${f1(ny)}" rx="8" ry="6" fill="${INK}" transform="rotate(-20 ${f1(xx)} ${f1(ny)})"/><path d="M${f1(xx + (up ? 7 : -7))},${f1(ny)} V${f1(ny + (up ? -34 : 34))}" stroke="${INK}" stroke-width="2.4"/>`;
    }
    if (o.lyr) s += `<path d="${scribble(36, iw - 36, y0 + 82, (o.seed || 5) * 7 + k, 8)}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`;
  }
  box(pp.inner, 0, 0, iw, ih).innerHTML = `<svg width="${iw}" height="${ih}" style="overflow:visible">${s}</svg>`;
  if (o.title) el('div', pp.inner, { left: '0', top: '18px', width: px(iw), textAlign: 'center', fontFamily: 'Rye', fontSize: px(o.tsz || 44), color: INK, whiteSpace: 'nowrap' }, o.title);
  return pp;
}
/* hoja de «LETRA» (texto ilegible) */
function lyricSheet(pa, x, y, w, h, o = {}) {
  const pp = paperPiece(pa, x, y, w, h, { seed: o.seed || 9, bg: o.bg || '#FBF6EA' });
  const iw = w - 18;
  el('div', pp.inner, { left: '0', top: '14px', width: px(iw), textAlign: 'center', fontFamily: 'Rye', fontSize: px(o.tsz || 40), color: o.tcol || RED, whiteSpace: 'nowrap' }, o.title || 'LETRA');
  box(pp.inner, 24, (o.tsz || 40) + 30, iw - 48, 4, { background: INK });
  let s = ''; for (let yy = (o.tsz || 40) + 80, k = 0; yy < h - 40; yy += o.lh || 42, k++) s += `<path d="${scribble(28, iw - 28 - (k % 3) * 40, yy, (o.seed || 9) * 11 + k, 8)}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>`;
  box(pp.inner, 0, 0, iw, h - 18).innerHTML = `<svg width="${iw}" height="${h - 18}" style="overflow:visible">${s}</svg>`;
  return pp;
}

/* ---------- ESTADIO (grada de grabado, 1080 x 1100) ---------- */
function stadiumSvg(o = {}) {
  const r = rng(o.seed || 77); let s = '';
  const topY = o.top || 330, botY = o.bot || 860;
  // torres de focos
  if (!o.noLights) [[70, -1], [1010, 1]].forEach(([x, sd]) => {
    s += `<path d="M${x - 10},${topY + 380} L${x - 4},${topY - 100} M${x + 10},${topY + 380} L${x + 4},${topY - 100}" stroke="${INK}" stroke-width="6"/>`;
    for (let k = 0; k < 9; k++) s += `<path d="M${x - 9},${topY + 360 - k * 58} L${x + 9},${topY + 330 - k * 58}" stroke="${INK}" stroke-width="2.5"/>`;
    s += cut(`<rect x="${x - 62}" y="${topY - 170}" width="124" height="84" rx="8"/>`, 5, 6) + `<rect x="${x - 62}" y="${topY - 170}" width="124" height="84" rx="8" fill="${INK}"/>`;
    for (let a = 0; a < 3; a++) for (let b = 0; b < 4; b++) s += `<circle cx="${x - 44 + b * 29}" cy="${topY - 152 + a * 24}" r="9" fill="#FFF6C2" stroke="${BRASS}" stroke-width="2"/>`;
  });
  // cubierta
  const roof = `M-40,${topY - 60} Q540,${topY - 150} 1120,${topY - 60} L1120,${topY - 20} Q540,${topY - 110} -40,${topY - 20} Z`;
  s += D(roof, '#3a2a1e', 4) + HF(roof, 'hW');
  for (let x = 40; x < 1080; x += 120) s += `<path d="M${x},${topY - 40 - 90 * (1 - Math.pow((x - 540) / 600, 2))} L${x},${topY + 20}" stroke="${INK}" stroke-width="5"/>`;
  // grada
  const stand = `M-40,${topY} Q540,${topY - 90} 1120,${topY} L1120,${botY} Q540,${botY - 70} -40,${botY} Z`;
  s += D(stand, '#D9C7A6', 4) + clipG(uid('st'), stand, `<rect x="-40" y="${topY - 100}" width="1160" height="${botY - topY + 120}" fill="url(#hA)" opacity=".35"/>`);
  const rows = o.rows || 9, scarf = [RED, YEL, '#5a7aa8', PINK, FIG];
  for (let k = 0; k < rows; k++) {
    const f = (k + 0.6) / rows, yb = topY + (botY - topY) * f, sag = lerp(90, 70, f);
    s += `<path d="M-40,${f1(yb + 16)} Q540,${f1(yb + 16 - sag)} 1120,${f1(yb + 16)}" stroke="${INK}" stroke-width="3" fill="none"/>`;
    const rr = 9 + f * 9;
    for (let x = -10 + r() * 20; x < 1100; x += rr * 2.3 + r() * 6) {
      const yy = yb - sag * (1 - Math.pow((x - 540) / 580, 2)) + (r() - 0.5) * 4;
      const c = r(); const arm = r() < 0.25;
      if (arm) s += `<path d="M${f1(x + rr * 0.6)},${f1(yy + rr)} l${f1(rr * 0.5)},${f1(-rr * 2)}" stroke="${INK}" stroke-width="${f1(rr * 0.45)}" stroke-linecap="round"/>`;
      s += `<path d="M${f1(x - rr)},${f1(yy + rr * 1.9)} Q${f1(x)},${f1(yy + rr * 0.4)} ${f1(x + rr)},${f1(yy + rr * 1.9)} Z" fill="${c < 0.3 ? scarf[Math.floor(r() * 5)] : '#8b7a62'}" stroke="${INK}" stroke-width="1.6"/>`;
      s += `<circle cx="${f1(x)}" cy="${f1(yy)}" r="${f1(rr * 0.62)}" fill="${FIG}" stroke="${INK}" stroke-width="1.6"/>`;
    }
  }
  // césped
  if (!o.noPitch) {
    const pitch = `M-40,${botY} Q540,${botY - 70} 1120,${botY} L1120,1920 L-40,1920 Z`;
    s += D(pitch, '#BFC08E', 4);
    for (let k = 0; k < 8; k++) s += `<path d="M-40,${botY + 60 + k * 140} Q540,${botY + 10 + k * 140} 1120,${botY + 60 + k * 140}" stroke="rgba(43,33,24,.18)" stroke-width="60" fill="none"/>`;
    s += `<path d="M-40,${botY + 40} Q540,${botY - 20} 1120,${botY + 40}" stroke="#fff" stroke-width="6" fill="none"/>`;
  }
  return `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${s}</svg>`;
}

/* ---------- AFICIONADO genérico (busto 360x460 con bufanda de rayas) ---------- */
const scarfOver = (c1 = RED, c2 = FIG) => {
  const band = 'M112,318 Q180,350 248,318 L256,350 Q180,388 104,350 Z', end = 'M196,352 L232,346 L242,452 L206,458 Z';
  const stripes = (d, id) => clipG(id, d, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect x="${90 + k * 22}" y="300" width="11" height="200" fill="${c2}" transform="rotate(${d === end ? 80 : 10} 180 400)"/>`).join(''));
  return cut(P(band) + P(end), 3, 5) + D(end, c1, 3) + stripes(end, uid('sc')) + `<path d="${end}" fill="none" stroke="${INK}" stroke-width="3"/><path d="M208,458 l-2,14 M218,456 l0,14 M228,455 l2,14 M238,453 l3,13" stroke="${INK}" stroke-width="3"/>` +
    D(band, c1, 3) + stripes(band, uid('sb')) + `<path d="${band}" fill="none" stroke="${INK}" stroke-width="3"/>`;
};
function fanBust(seed, o = {}) {
  let s = bustInner({ uniform: 'soldier', moustache: !!o.moustache, beard: !!o.beard, seed });
  s += coatOver(o.coat || '#5a4632') + scarfOver(o.c1 || RED, o.c2 || FIG);
  if (o.cap) s += capOver();
  if (o.hair) s += `<path d="M120,176 C114,130 150,112 182,114 C218,114 248,134 240,178 C228,156 210,150 192,154 C176,144 150,148 140,162 C132,160 124,166 120,176 Z" fill="${o.hair}" stroke="${INK}" stroke-width="3"/>`;
  s += `<g class="sweat" style="opacity:0"><path d="M252,150 Q238,174 252,186 Q266,174 252,150 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
function mkFan(pa, b, seed, o = {}) { const f = mk(pa, b, fanBust(seed, o), '0 0 360 460', 'bust'); f.sweat = f.d.querySelector('.sweat'); return f; }
function fanFace(f, t, o = {}) { face(f, t, o); if (f.sweat) f.sweat.style.opacity = o.sweat ? 1 : 0; }

/* ---------- GRANADERO tambor (cuerpo entero, viewBox 0 0 220 520) ---------- */
function granInner(o = {}) {
  const coat = o.coat || '#F1E8D4', lin = o.lin || RED;
  const leg = (hx, sx) => { const th = limb(hx, 300, hx + sx, 382, 19, 15), gt = limb(hx + sx, 380, hx + sx, 470, 15, 14), shoe = `M${hx + sx - 20},466 Q${hx + sx + 2},458 ${hx + sx + 28},470 L${hx + sx + 28},482 L${hx + sx - 20},482 Z`; return cut(P(th) + P(gt) + P(shoe), 3, 4) + D(th, coat) + HF(th, 'hB') + D(gt, '#2f2620') + `<path d="M${hx + sx - 12},396 v70 M${hx + sx},394 v72 M${hx + sx + 12},396 v70" stroke="#6b5a4a" stroke-width="2" stroke-dasharray="3 9"/>` + D(shoe, INK); };
  let s = `<g class="gL">${leg(96, -4)}</g><g class="gR">${leg(124, 4)}</g>`;
  const skirt = 'M60,196 L160,196 L176,322 L44,322 Z', torso = 'M70,148 C76,136 144,136 150,148 L160,256 L60,256 Z';
  s += cut(P(skirt) + P(torso) + '<rect x="98" y="120" width="24" height="34"/>', 6, 8);
  s += D(skirt, coat) + `<path d="M60,196 L44,322 L74,322 L80,220 Z M160,196 L176,322 L146,322 L140,220 Z" fill="${lin}" stroke="${INK}" stroke-width="3"/><path d="M110,200 V322" stroke="${INK}" stroke-width="3"/>`;
  s += D(torso, coat) + clipG(uid('gt'), torso, `<rect x="120" y="140" width="50" height="120" fill="url(#hA)" opacity=".7"/>`);
  s += `<path d="M90,148 L110,204 L100,256 L80,256 Z" fill="${lin}" stroke="${INK}" stroke-width="3"/><path d="M130,148 L110,204 L120,256 L140,256 Z" fill="${lin}" stroke="${INK}" stroke-width="3"/>`;
  [0, 1, 2, 3].forEach(k => s += `<circle cx="${92 + k * 2}" cy="${170 + k * 22}" r="4" fill="${BRASS}" stroke="${INK}" stroke-width="1.5"/><circle cx="${128 - k * 2}" cy="${170 + k * 22}" r="4" fill="${BRASS}" stroke="${INK}" stroke-width="1.5"/>`);
  s += `<path d="M74,152 L148,248" stroke="#fff" stroke-width="13"/><path d="M74,152 L148,248" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="1 0"/><path d="M146,152 L72,248" stroke="#fff" stroke-width="13"/>`;
  s += `<path d="M146,152 L72,248 M74,152 L148,248" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".7"/>`;
  // cabeza
  const face = 'M86,92 C86,66 134,66 134,92 L134,126 C134,150 86,150 86,126 Z';
  s += `<rect x="98" y="120" width="24" height="34" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(face, FIG) + clipG(uid('gf'), face, `<rect x="118" y="60" width="30" height="100" fill="url(#hA)" opacity=".6"/>`);
  s += `<circle cx="84" cy="112" r="7" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><circle cx="136" cy="112" r="7" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<g class="pup"><circle cx="101" cy="104" r="4.2" fill="${INK}"/><circle cx="121" cy="104" r="4.2" fill="${INK}"/></g><g class="lidC" style="opacity:0"><path d="M95,104 h12 M115,104 h12" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/></g>`;
  s += `<path d="M98,96 q5,-4 10,0 M114,96 q5,-4 10,0" stroke="${INK}" stroke-width="2.5" fill="none"/><path d="M111,106 q-4,10 1,14" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += `<path d="M110,124 C102,118 92,120 88,128 C96,128 104,128 110,128 C116,128 124,128 132,128 C128,120 118,118 110,124 Z" fill="${INK}"/><path class="gm" d="M104,134 q6,4 12,0" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  // gorra de granadero (mitra)
  const cap = 'M80,96 C76,56 94,20 124,2 C132,30 142,64 140,96 Z', plate = 'M88,92 C88,62 102,34 120,18 C126,42 132,68 132,92 Z';
  s += cut(P(cap), 3, 4) + D(cap, lin) + HF(cap, 'hD') + D(plate, '#E8DDBF') + HF(plate, 'hP') + `<circle cx="110" cy="70" r="11" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/><path d="M110,58 q-6,-8 0,-16 q6,8 0,16" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><path d="M80,94 H140" stroke="${INK}" stroke-width="7"/><path d="M80,94 H140" stroke="${BRASS}" stroke-width="3"/><circle cx="125" cy="2" r="8" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
  // tambor
  const drum = 'M64,236 L156,236 L156,306 L64,306 Z';
  s += `<path d="M78,150 L150,236" stroke="#fff" stroke-width="10"/><path d="M78,150 L150,236" stroke="${INK}" stroke-width="2"/>`;
  s += cut(P(drum) + '<ellipse cx="110" cy="236" rx="46" ry="11"/>', 4, 5) + D(drum, '#C9A46A') + HF(drum, 'hB');
  let zz = 'M64,250'; for (let k = 0; k < 8; k++) zz += ` L${70 + k * 12},${k % 2 ? 250 : 294}`; s += `<path d="${zz} L156,${294}" stroke="#fff" stroke-width="3" fill="none"/>`;
  s += `<rect x="60" y="240" width="100" height="12" rx="3" fill="${lin}" stroke="${INK}" stroke-width="3"/><rect x="60" y="294" width="100" height="12" rx="3" fill="${lin}" stroke="${INK}" stroke-width="3"/><ellipse cx="110" cy="236" rx="46" ry="11" fill="#F7F0E0" stroke="${INK}" stroke-width="3"/>`;
  // brazos con baquetas
  const arm = (sx, sy, cls, dir) => { const ua = limb(sx, sy, sx + dir * 2, sy + 56, 12, 11), fa = limb(sx + dir * 2, sy + 56, sx + dir * 22, sy + 74, 10, 9); return `<g class="${cls}">${cut(P(ua) + P(fa), 3, 4)}${D(ua, coat)}${HF(ua, 'hB')}${D(fa, lin)}<path d="M${sx + dir * 20},${sy + 76} L${sx + dir * 46},${sy + 80}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="${sx + dir * 47}" cy="${sy + 80}" r="5" fill="${FIG}" stroke="${INK}" stroke-width="2"/><circle cx="${sx + dir * 22}" cy="${sy + 76}" r="9" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/></g>`; };
  s += arm(72, 156, 'aL', 1) + arm(148, 156, 'aR', -1);
  return s;
}
function mkGran(pa, b, o = {}) {
  const f = mk(pa, b, granInner(o), '0 0 220 520', 'gran'); const q = s => f.d.querySelector(s);
  f.gL = q('.gL'); f.gR = q('.gR'); f.aL = q('.aL'); f.aR = q('.aR'); f.gm = q('.gm'); return f;
}
function granPose(f, t, o = {}) {
  face(f, t, o);
  const k = Math.sin((t + (o.ph || 0)) * (o.sp || 9));
  f.gL.setAttribute('transform', `rotate(${f1(k * (o.leg == null ? 18 : o.leg))} 96 300)`);
  f.gR.setAttribute('transform', `rotate(${f1(-k * (o.leg == null ? 18 : o.leg))} 124 300)`);
  const dk = Math.sin((t + (o.ph || 0)) * 22);
  f.aL.setAttribute('transform', `rotate(${f1(-8 + dk * 14)} 72 156)`);
  f.aR.setAttribute('transform', `rotate(${f1(8 + dk * 14)} 148 156)`);
}

/* ---------- GLOBO TERRÁQUEO de despacho (viewBox 0 0 600 700) ---------- */
function globeSvg() {
  const r = rng(404); const cx = 300, cy = 300, R = 250;
  let s = cut(`<circle cx="${cx}" cy="${cy}" r="${R}"/><path d="M220,620 L380,620 L400,690 L200,690 Z"/>`);
  s += `<path d="M300,550 L300,620" stroke="${INK}" stroke-width="16"/><path d="M220,620 L380,620 L400,690 L200,690 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M220,620 L380,620 L400,690 L200,690 Z" fill="url(#hW)" opacity=".3"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#D7E1D2" stroke="${INK}" stroke-width="5"/>`;
  // continentes inventados (manchas genéricas)
  let land = '';
  [[200, 200, 90, 70], [380, 180, 70, 90], [330, 380, 110, 60], [160, 380, 60, 80], [440, 330, 40, 50]].forEach(([x, y, a, b], i) => {
    const pts = []; for (let k = 0; k < 14; k++) { const ang = k / 14 * Math.PI * 2, rr = 1 + (r() - 0.5) * 0.5; pts.push([x + Math.cos(ang) * a * rr, y + Math.sin(ang) * b * rr]); }
    land += `<path d="${smooth(pts)}" fill="#E8D9AE" stroke="${INK}" stroke-width="3"/>`;
  });
  s += clipG(uid('gl'), `M${cx - R},${cy} a${R},${R} 0 1,0 ${2 * R},0 a${R},${R} 0 1,0 ${-2 * R},0`, land + `<rect x="${cx + 60}" y="0" width="300" height="600" fill="url(#hA)" opacity=".55"/><rect x="0" y="${cy + 120}" width="600" height="200" fill="url(#hB)" opacity=".35"/>`);
  for (const k of [0.35, 0.7]) s += `<ellipse cx="${cx}" cy="${cy}" rx="${R * k}" ry="${R}" fill="none" stroke="${INK}" stroke-width="2" opacity=".6"/>`;
  for (const yy of [-150, -75, 0, 75, 150]) { const hw = Math.sqrt(R * R - yy * yy); s += `<path d="M${f1(cx - hw)},${cy + yy} Q${cx},${cy + yy + 20} ${f1(cx + hw)},${cy + yy}" stroke="${INK}" stroke-width="2" fill="none" opacity=".6"/>`; }
  s += `<path d="M${cx},${cy - R - 30} A${R + 30},${R + 30} 0 0,1 ${cx},${cy + R + 30}" stroke="${INK}" stroke-width="16" fill="none"/><path d="M${cx},${cy - R - 30} A${R + 30},${R + 30} 0 0,1 ${cx},${cy + R + 30}" stroke="${BRASS}" stroke-width="9" fill="none"/>`;
  s += `<ellipse cx="220" cy="190" rx="60" ry="34" fill="#fff" opacity=".35" transform="rotate(-30 220 190)"/>`;
  return s;
}

/* ---------- bocadillo de canto ---------- */
function singBubble(pa, x, y, w, h, o = {}) {
  const d = box(pa, x, y, w, h, { zIndex: o.z || 30 });
  const tail = o.tail || 'bl';
  const tx = tail === 'br' ? w - 60 : 40;
  const path = `M24,0 H${w - 24} Q${w},0 ${w},24 V${h - 44} Q${w},${h - 20} ${w - 24},${h - 20} H${tx + 30} L${tx + (tail === 'br' ? 40 : -10)},${h + 14} L${tx},${h - 20} H24 Q0,${h - 20} 0,${h - 44} V24 Q0,0 24,0 Z`;
  d.innerHTML = `<svg width="${w}" height="${h + 20}" style="overflow:visible;position:absolute;left:0;top:0">${cut(P(path), 6, 7)}<path d="${path}" fill="${o.bg || '#fff'}" stroke="${o.stroke || INK}" stroke-width="${o.sw || 5}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}/></svg>`;
  if (o.html != null) el('div', d, { left: '0', top: '0', width: px(w), height: px(h - 20), display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: o.font || 'Playfair', fontStyle: o.italic ? 'italic' : 'normal', fontWeight: o.fw || 800, fontSize: px(o.size || 44), lineHeight: 1.05, color: o.color || INK, whiteSpace: o.wrap ? 'normal' : 'nowrap' }, o.html);
  return d;
}
const squig = (w, seed) => `<svg width="${w}" height="40" style="overflow:visible"><path d="${scribble(4, w - 4, 26, seed, 10)}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;

/* ---------- archivador (viewBox 0 0 460 640) ---------- */
function cabinetSvg() {
  const body = 'M0,0 H460 V640 H0 Z';
  let s = cut(P(body)) + D(body, WOOD, 5) + `<path d="${body}" fill="url(#hW)" opacity=".28"/><rect x="0" y="0" width="460" height="22" fill="#8a6236" stroke="${INK}" stroke-width="4"/>`;
  for (const y of [236, 440]) s += `<rect x="26" y="${y}" width="408" height="180" rx="8" fill="#C79A62" stroke="${INK}" stroke-width="4"/><rect x="180" y="${y + 40}" width="100" height="40" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M170,${y + 120} h120" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M170,${y + 120} h120" stroke="${BRASS}" stroke-width="6" stroke-linecap="round"/>`;
  s += `<rect x="26" y="40" width="408" height="180" rx="8" fill="#1d140d" stroke="${INK}" stroke-width="4"/>`; // hueco del cajón superior
  return s;
}
const drawerFront = () => `<svg viewBox="0 0 420 200" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="420" height="190" rx="8"/>', 5, 6)}<rect x="0" y="0" width="420" height="190" rx="8" fill="#C79A62" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="420" height="190" rx="8" fill="url(#hW)" opacity=".25"/><rect x="140" y="34" width="140" height="50" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/><text x="210" y="70" text-anchor="middle" font-family="SpecialElite" font-size="26" fill="${INK}">ARCHIVO</text><path d="M150,128 h120" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M150,128 h120" stroke="${BRASS}" stroke-width="7" stroke-linecap="round"/></svg>`;

/* ---------- calendario de taco (sin números) ---------- */
function calPage(pa, x, y, w, h, z) {
  const d = box(pa, x, y, w, h, { background: '#FBF6EA', border: `4px solid ${INK}`, zIndex: z, transformOrigin: '50% 0%' });
  el('div', d, { left: '0', top: px(h * 0.18), width: px(w - 8), textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(w * 0.36), color: INK }, 'día');
  box(d, 18, h - 46, w - 44, 4, { background: 'rgba(43,33,24,.25)' }); box(d, 18, h - 30, w - 80, 4, { background: 'rgba(43,33,24,.25)' });
  return d;
}

/* ---------- gramola / altavoz de bocina (silueta) ---------- */
const hornSvg = (col = INK) => `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible"><path d="M60,250 L60,200 L120,200 L120,250 Z M20,250 H160 V290 H20 Z" fill="${col}"/><path d="M90,200 L90,160 Q100,130 130,120 L240,20 Q290,60 280,150 L160,150 Q120,150 100,170 L100,200 Z" fill="${col}"/></svg>`;

/* contador del episodio, chip negro */
const darkChip = (pa, x, y, html, o = {}) => chip(pa, x, y, html, Object.assign({ bg: INK, color: '#fff' }, o));
