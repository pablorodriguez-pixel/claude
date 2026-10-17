/* Ep. 24 · ESPECIAL 1.000 — tiempos clave (todo por texto) + figuras nuevas en estilo grabado recortado */

/* ---------- tiempos clave ---------- */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  K.milpies = ws(0); K.colado = ws(3); K.mil0 = ws(7); K.patas = ws(8);
  const i1 = find('la mayoria no llega'); K.L1 = ws(i1); K.mayoria = ws(i1 + 1); K.mitad = ws(i1 + 7); K.y1 = ws(i1 + 8); K.primero = ws(i1 + 10); K.mil1 = ws(i1 + 14);
  K.conocio = ws(i1 + 17); K.dos = ws(i1 + 19); K.veintiuno = ws(i1 + 21); K.L1e = wE(i1 + 21);
  const i2 = find('hoy somos mil vecinos'); K.hoy = ws(i2); K.mil2 = ws(i2 + 2); K.vecinos2 = ws(i2 + 3); K.van = ws(i2 + 4); K.tres = ws(i2 + 5); K.miles = ws(i2 + 6); K.mas = ws(i2 + 7); K.colado2 = ws(i2 + 11);
  const i3 = find('dos las mil y una noches'); K.dos3 = ws(i3); K.las = ws(i3 + 1); K.noches = ws(i3 + 5); K.aladino = ws(i3 + 6); K.no3 = ws(i3 + 7); K.libro3 = ws(i3 + 11);
  K.lo3 = ws(i3 + 12); K.colo = ws(i3 + 13); K.frances = ws(i3 + 15); K.siglos = ws(i3 + 16); K.despues = ws(i3 + 17);
  const i4 = find('tres millon'); K.tres4 = ws(i4); K.millon = ws(i4 + 1); K.viene = ws(i4 + 2); K.italiano = ws(i4 + 4); K.milG = ws(i4 + 5); K.grande = ws(i4 + 6); K.un = ws(i4 + 7); K.milote = ws(i4 + 8);
  const i5 = find('y cuatro el mil romano'); K.y5 = ws(i5); K.cuatro = ws(i5 + 1); K.mil5 = ws(i5 + 3); K.romano = ws(i5 + 4); K.no5 = ws(i5 + 5); K.M5 = ws(i5 + 8); K.era = ws(i5 + 9); K.garabato = ws(i5 + 11); K.garabatoE = wE(i5 + 11);
  const i6 = find('partelo por la mitad'); K.partelo = ws(i6); K.mitad6 = ws(i6 + 3); K.mitad6e = wE(i6 + 3); K.sale = ws(i6 + 5); K.D = ws(i6 + 7); K.quinientos = ws(i6 + 9);
  K.La6 = ws(i6 + 10); K.M6 = ws(i6 + 11); K.gano = ws(i6 + 12); K.luego = ws(i6 + 13); K.mille = ws(i6 + 15);
  const i7 = find('ojo hay quien cree'); K.ojo = ws(i7); K.hay = ws(i7 + 1); K.cree = ws(i7 + 3); K.garabato7 = ws(i7 + 7); K.salio = ws(i7 + 8); K.infinito = ws(i7 + 10); K.nadie = ws(i7 + 11); K.probado = ws(i7 + 14);
  const i8 = find('mil vecinos para mi'); K.mil8 = ws(i8); K.casi = ws(i8 + 4); K.infinito8 = ws(i8 + 5); K.y8 = ws(i8 + 6); K.conozco = ws(i8 + 8);
  const i9 = find('daniela nos pillo'); K.daniela = ws(i9); K.pillo = ws(i9 + 2); K.A9 = ws(i9 + 4); K.C9 = ws(i9 + 5); K.otro = ws(i9 + 6); K.agarro = ws(i9 + 8); K.bronca = ws(i9 + 9); K.lunes = ws(i9 + 11);
  K.siempre = ws(i9 + 13); K.yo = ws(i9 + 16); K.primero9 = ws(i9 + 17);
  const i10 = find('y no no soy tu vecino jose'); K.yno = ws(i10); K.no10 = ws(i10 + 1); K.soy10 = ws(i10 + 3); K.vecino10 = ws(i10 + 5); K.jose = ws(i10 + 6);
  const i11 = find('el proximo lo elegis'); K.el11 = ws(i11); K.elegis = ws(i11 + 3); K.alejandro = ws(i11 + 4); K.cero = ws(i11 + 7); K.ok11 = ws(i11 + 10); K.revancha = ws(i11 + 13); K.napoleon = ws(i11 + 15);
  K.vota = ws(i11 + 16); K.A11 = ws(i11 + 17); K.B11 = ws(i11 + 18); K.C11 = ws(i11 + 20);
  const i12 = find('mil gracias'); K.mil12 = ws(i12); K.gracias = ws(i12 + 1);
  const is = find('soy tu vecino', i12); K.isoy = is; K.soy = ws(is); K.vecino = ws(is + 2);
  const iye = find('y esto no venia en el libro', is); K.iye = iye; K.esto = ws(iye + 1); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
/* cortes de escena */
const S = {
  A: [-1, K.L1 - 0.1], B: [K.L1 - 0.1, K.y1 - 0.08], C: [K.y1 - 0.08, K.hoy - 0.08],
  D: [K.hoy - 0.08, K.van - 0.06], E: [K.van - 0.06, K.dos3 - 0.08],
  BOOK: [K.dos3 - 0.08, K.tres4 - 0.08], H: [K.libro3 - 0.04, K.lo3 - 0.04],
  J: [K.tres4 - 0.08, K.un - 0.08], JH: [K.un - 0.08, K.y5 - 0.08],
  ROM: [K.y5 - 0.08, K.La6 - 0.06], N: [K.La6 - 0.06, K.ojo - 0.08], O: [K.ojo - 0.08, K.mil8 - 0.08],
  P: [K.mil8 - 0.08, K.daniela - 0.08],
  R1: [K.daniela - 0.08, K.otro - 0.08], R2: [K.otro - 0.08, K.siempre - 0.08], R3: [K.siempre - 0.08, K.yno - 0.08],
  SJ: [K.yno - 0.08, K.el11 - 0.08], T: [K.el11 - 0.08, K.mil12 - 0.08],
  BAL: [K.mil12 - 0.08, K.enL - 0.04], BK: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

/* ======================================================================
   MILPIÉS de grabado — segmentos que siguen una curva + patas en ola
   ====================================================================== */
// curva por longitud de arco: devuelve n puntos equiespaciados con su tangente
function arcPts(fn, n, samples = 260) {
  const P0 = []; let L = 0; const acc = [0];
  for (let i = 0; i <= samples; i++) { const q = fn(i / samples); P0.push(q); if (i) { L += Math.hypot(q[0] - P0[i - 1][0], q[1] - P0[i - 1][1]); acc.push(L); } }
  const out = []; let j = 0;
  for (let k = 0; k < n; k++) {
    const d = L * k / (n - 1); while (j < samples - 1 && acc[j + 1] < d) j++;
    const a = P0[j], b = P0[j + 1], f = (d - acc[j]) / Math.max(1e-6, acc[j + 1] - acc[j]);
    const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f, tl = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    out.push({ x, y, tx: (b[0] - a[0]) / tl, ty: (b[1] - a[1]) / tl });
  }
  return out;
}
function mkMilli(pa, o = {}) {
  const n = o.n || 50, rx = o.rx || 26, ry = o.ry || 46, col = o.col || '#A86F45', z = o.z || 5;
  const wrap = box(pa, 0, 0, 1080, 1920, { zIndex: z });
  let sh = '', wh = '', bd = '';
  for (let i = 0; i < n; i++) {
    sh += `<ellipse class="ms" rx="${rx + 4}" ry="${ry + 4}" fill="${SH}"/>`;
    wh += `<ellipse class="mw" rx="${rx + 8}" ry="${ry + 8}" fill="#fff"/>`;
    bd += `<g class="mb"><ellipse rx="${rx}" ry="${ry}" fill="${col}" stroke="${INK}" stroke-width="${o.sw || 3.5}"/>
      <ellipse cx="${f1(rx * 0.1)}" cy="${f1(ry * 0.32)}" rx="${f1(rx * 0.85)}" ry="${f1(ry * 0.6)}" fill="url(#hA)" opacity=".75"/>
      <path d="M${f1(-rx * 0.55)},${f1(-ry * 0.86)} Q${f1(-rx * 1.0)},0 ${f1(-rx * 0.55)},${f1(ry * 0.86)}" stroke="${INK}" stroke-width="2" fill="none" opacity=".8"/>
      <ellipse cx="${f1(rx * 0.15)}" cy="${f1(-ry * 0.45)}" rx="${f1(rx * 0.35)}" ry="${f1(ry * 0.16)}" fill="#fff" opacity=".35"/></g>`;
  }
  const hs = o.head || 1.25;
  const head = `<g class="mh"><g transform="scale(${hs})">
     <path d="M${rx * 0.4},${-ry * 0.5} C${rx * 2.4},${-ry * 1.2} ${rx * 3.6},${-ry * 1.9} ${rx * 4.2},${-ry * 2.5}" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>
     <path d="M${rx * 0.4},${ry * 0.5} C${rx * 2.4},${ry * 1.2} ${rx * 3.6},${ry * 1.9} ${rx * 4.2},${ry * 2.5}" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>
     <path class="antL" d="M${rx * 0.4},${-ry * 0.5} C${rx * 2.4},${-ry * 1.2} ${rx * 3.6},${-ry * 1.9} ${rx * 4.2},${-ry * 2.5}" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
     <path class="antR" d="M${rx * 0.4},${ry * 0.5} C${rx * 2.4},${ry * 1.2} ${rx * 3.6},${ry * 1.9} ${rx * 4.2},${ry * 2.5}" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
     <ellipse cx="4" cy="4" rx="${rx * 1.5 + 6}" ry="${ry * 0.95 + 6}" fill="${SH}"/>
     <ellipse rx="${rx * 1.5 + 8}" ry="${ry * 0.95 + 8}" fill="#fff"/>
     <ellipse rx="${rx * 1.5}" ry="${ry * 0.95}" fill="${col}" stroke="${INK}" stroke-width="4"/>
     <ellipse cx="${-rx * 0.2}" cy="${ry * 0.3}" rx="${rx * 1.2}" ry="${ry * 0.55}" fill="url(#hA)" opacity=".7"/>
     <circle cx="${rx * 0.55}" cy="${-ry * 0.42}" r="${ry * 0.3}" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="${rx * 0.55}" cy="${ry * 0.42}" r="${ry * 0.3}" fill="#fff" stroke="${INK}" stroke-width="3"/>
     <g class="pup"><circle cx="${rx * 0.7}" cy="${-ry * 0.42}" r="${ry * 0.15}" fill="${INK}"/><circle cx="${rx * 0.7}" cy="${ry * 0.42}" r="${ry * 0.15}" fill="${INK}"/></g>
     <g class="lidC" style="opacity:0"><circle cx="${rx * 0.55}" cy="${-ry * 0.42}" r="${ry * 0.31}" fill="${col}" stroke="${INK}" stroke-width="3"/><circle cx="${rx * 0.55}" cy="${ry * 0.42}" r="${ry * 0.31}" fill="${col}" stroke="${INK}" stroke-width="3"/></g>
     <path d="M${rx * 1.25},${-ry * 0.25} Q${rx * 1.6},0 ${rx * 1.25},${ry * 0.25}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
   </g></g>`;
  wrap.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"><g class="mS">${sh}</g>
    <path class="lW" stroke="#fff" stroke-width="${(o.lw || 5) + 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="lI" stroke="${INK}" stroke-width="${o.lw || 5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="lX" stroke="${RED}" stroke-width="${(o.lw || 5) + 1}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
    <g class="mW">${wh}</g><g class="mB">${bd}</g>${head}</svg>`;
  const q = s => [...wrap.querySelectorAll(s)];
  const M = { wrap, n, rx, ry, S: q('.ms'), Wt: q('.mw'), B: q('.mb'), head: wrap.querySelector('.mh'), lW: wrap.querySelector('.lW'), lI: wrap.querySelector('.lI'), lX: wrap.querySelector('.lX'),
    pup: q('.pup'), lidC: wrap.querySelector('.lidC'), legL: o.legL || 62, kind: 'milli' };
  // fn(u) → [x,y] con u=0 la cabeza. op: {t, speed, amp, cross:[u0,u1] patas tachadas, look, blink}
  M.update = (fn, t, op = {}) => {
    const pts = arcPts(fn, n + 2), legs = [], legsX = [], LL = M.legL, sp = op.speed || 9, amp = op.amp == null ? 0.42 : op.amp;
    for (let i = 0; i < n; i++) {
      const pt = pts[i + 2], u = i / (n - 1), taper = Math.min(1, 0.55 + (1 - u) * 3.2) * (op.taper == null ? 1 : 1);
      const a = Math.atan2(pt.ty, pt.tx) * 180 / Math.PI;
      const tr = `translate(${f1(pt.x)},${f1(pt.y)}) rotate(${f1(a)}) scale(${f1(taper * 100) / 100})`;
      M.B[i].setAttribute('transform', tr); M.Wt[i].setAttribute('transform', tr); M.S[i].setAttribute('transform', `translate(${f1(pt.x + 7)},${f1(pt.y + 9)}) rotate(${f1(a)}) scale(${f1(taper * 100) / 100})`);
      const nx = -pt.ty, ny = pt.tx, crossed = op.cross && u >= op.cross[0] && u <= op.cross[1];
      for (const sd of [-1, 1]) for (const off of [-0.45, 0.45]) {
        const ph = t * sp - i * 0.62 - off * 1.4 + (sd > 0 ? Math.PI : 0), sw = Math.sin(ph) * LL * amp;
        const bx = pt.x + nx * ry * 0.8 * sd * taper + pt.tx * rx * off, by = pt.y + ny * ry * 0.8 * sd * taper + pt.ty * rx * off;
        const kx = bx + nx * sd * LL * 0.55 + pt.tx * sw * 0.6, ky = by + ny * sd * LL * 0.55 + pt.ty * sw * 0.6;
        const fx = kx + nx * sd * LL * 0.25 - pt.tx * LL * 0.3 + pt.tx * sw, fy = ky + ny * sd * LL * 0.25 - pt.ty * LL * 0.3 + pt.ty * sw;
        const seg = `M${f1(bx)},${f1(by)}L${f1(kx)},${f1(ky)}L${f1(fx)},${f1(fy)}`;
        legs.push(seg); if (crossed) legsX.push(seg);
      }
    }
    const L = legs.join(''); M.lW.setAttribute('d', L); M.lI.setAttribute('d', L); M.lX.setAttribute('d', legsX.join('')); M.lX.style.opacity = legsX.length ? 1 : 0;
    const h = pts[0], ha = Math.atan2(-pts[1].ty, -pts[1].tx) * 180 / Math.PI + 180;
    const h1 = pts[1];
    M.head.setAttribute('transform', `translate(${f1(h1.x - h1.tx * rx * 0.6)},${f1(h1.y - h1.ty * rx * 0.6)}) rotate(${f1(ha + 180 + (op.headR || 0))})`);
    void h;
    const lk = op.look || [0, 0]; M.pup.forEach(q => q.setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`));
    const bl = ((t + (op.seed || 0)) % 2.9) < 0.12; M.lidC.style.opacity = (bl || op.closed) ? 1 : 0;
  };
  return M;
}

/* ---------- avatar genérico, corazón ---------- */
const heartSvg = (fill = '#fff', st = INK) => `<svg viewBox="0 0 100 90" width="100%" height="100%" style="overflow:visible"><path d="M50,86 C20,64 4,46 4,28 C4,12 16,2 30,2 C40,2 46,8 50,16 C54,8 60,2 70,2 C84,2 96,12 96,28 C96,46 80,64 50,86 Z" fill="${fill}" stroke="${st}" stroke-width="7" stroke-linejoin="round"/></svg>`;
const genAvatar = (bg = '#D9D2C4', fg = '#9A9182') => `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="40" r="19" fill="${fg}"/><path d="M14,100 C16,72 32,62 50,62 C68,62 84,72 86,100 Z" fill="${fg}"/></svg>`;
// tarjeta de comentario como recorte de papel. o: {user, likes, size, w, h, seed, rot}
function commentCard(pa, x, y, text, o = {}) {
  const w = o.w || 940, h = o.h || 300;
  const pc = paperPiece(pa, x, y, w, h, { seed: o.seed || 71, bg: '#FFFDF6', plain: true }); pc.wrap.style.zIndex = o.z || 20;
  const inn = pc.inner, iw = w - 18;
  box(inn, 26, 30, 130, 130, { borderRadius: '50%', overflow: 'hidden', border: `4px solid ${INK}` }, genAvatar(o.av || '#D9D2C4', o.avf || '#9A9182'));
  let ty = 40;
  if (o.user) { el('div', inn, { left: '184px', top: '26px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '36px', color: '#7a6a58', whiteSpace: 'nowrap' }, o.user); ty = 76; }
  const tx = el('div', inn, { left: '184px', top: px(ty), width: px(iw - 184 - (o.likes ? 150 : 30)), fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(o.size || 70), lineHeight: 1.06, color: INK }, text);
  let hrt = null;
  if (o.likes) {
    hrt = box(inn, iw - 124, 52, 84, 76, { zIndex: 3 }); hrt.innerHTML = heartSvg('#fff', '#8d8475');
    el('div', inn, { left: px(iw - 150), top: '136px', width: '136px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '42px', color: '#7a6a58' }, String(o.likes));
  }
  const tag = el('div', inn, { left: px(iw - 290), top: px(h - 18 - 62), fontFamily: 'SpecialElite', fontSize: '30px', color: '#fff', background: INK, padding: '4px 16px', borderRadius: '8px', whiteSpace: 'nowrap', transform: 'rotate(-2deg)' }, 'comentario real');
  return { wrap: pc.wrap, inner: inn, tx, hrt, tag };
}

/* ---------- símbolo ↀ (CIƆ) como trazo cincelado. viewBox 0 0 500 500, centro 250,250 ---------- */
const GLY_R = 190;
// mitades: izquierda = «C» (arco), derecha = «IƆ» (barra + arco) → la D
const gC = `M250,${250 - GLY_R} A${GLY_R},${GLY_R} 0 0 0 250,${250 + GLY_R}`;
const gD = `M250,${250 - GLY_R} A${GLY_R},${GLY_R} 0 0 1 250,${250 + GLY_R}`;
const gBar = `M250,${250 - GLY_R} L250,${250 + GLY_R}`;
const chisel = (d, cls, extra = '') => `<g class="${cls}" ${extra}><path d="${d}" stroke="#fff" stroke-width="64" fill="none" stroke-linecap="round" opacity=".9"/><path class="pk" d="${d}" stroke="${INK}" stroke-width="46" fill="none" stroke-linecap="round"/><path class="pk2" d="${d}" stroke="#6d6252" stroke-width="22" fill="none" stroke-linecap="round" transform="translate(-4,-4)"/><path class="pk3" d="${d}" stroke="url(#hD)" stroke-width="22" fill="none" stroke-linecap="round" transform="translate(-4,-4)"/></g>`;
// ∞ (lemniscata) centrada en 250,250
const gInf = (() => { let d = ''; for (let i = 0; i <= 120; i++) { const a = i / 120 * Math.PI * 2, s = Math.sin(a), c = Math.cos(a), den = 1 + s * s; d += (i ? 'L' : 'M') + f1(250 + 215 * c / den) + ',' + f1(250 + 215 * s * c / den); } return d + 'Z'; })();

/* ---------- lápida / losa romana (HTML box) ---------- */
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

/* ---------- lámpara de aceite (viewBox 0 0 300 170) ---------- */
function lampInner() {
  const body = 'M60,110 C40,70 120,52 170,60 C200,64 230,70 290,40 C270,70 250,100 200,118 C170,130 90,132 60,110 Z';
  const foot = 'M110,124 L180,124 L190,152 L100,152 Z', lid = 'M118,62 C120,36 160,34 164,60 Z', handle = 'M64,96 C10,90 10,40 52,46 C36,58 40,80 70,86 Z';
  return cut(P(body) + P(foot) + P(lid) + P(handle), 5, 6) + D(handle, BRASS, 4) + D(foot, BRASS, 4) + HF(foot, 'hD') + D(body, BRASS, 4) + HF('M80,112 C120,128 170,126 200,116 C160,110 110,108 80,112 Z', 'hD')
    + `<path d="M70,104 C110,118 170,116 210,100" stroke="${INK}" stroke-width="2" fill="none"/><path d="M90,78 C130,70 160,72 186,78" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>`
    + D(lid, BRASS, 4) + `<circle cx="141" cy="34" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
}
/* ---------- ALADINO (cuerpo entero, viewBox 0 0 260 460) ---------- */
function aladInner() {
  const id = uid('al');
  const legs = 'M84,270 C60,330 66,380 70,408 L118,408 C118,370 124,330 130,300 C136,330 142,370 142,408 L190,408 C194,380 200,330 176,270 Z';
  const shoeL = 'M64,404 L120,404 L120,424 C100,430 70,432 40,418 C30,410 36,400 46,408 Z', shoeR = 'M140,404 L196,404 L214,408 C224,400 230,410 220,418 C190,432 160,430 140,424 Z';
  const torso = 'M88,170 C92,150 112,140 130,140 C148,140 168,150 172,170 L180,276 L80,276 Z';
  const vestL = 'M88,170 C92,150 110,142 120,142 L112,276 L80,276 Z', vestR = 'M172,170 C168,150 150,142 140,142 L148,276 L180,276 Z';
  const sash = 'M80,250 L180,250 L182,280 L78,280 Z';
  const head = 'M96,96 C96,66 112,52 130,52 C148,52 164,66 164,96 C164,124 150,140 130,140 C110,140 96,124 96,96 Z';
  const hair = 'M94,92 C88,58 112,40 132,42 C156,42 172,60 166,92 C160,76 150,68 140,72 C128,62 112,66 100,80 Z';
  const fez = 'M104,58 L110,20 L152,20 L158,58 Z';
  const armL = limb(92, 176, 56, 236, 13, 11), armR = limb(168, 176, 206, 216, 13, 11);
  let s = cut(P(legs) + P(shoeL) + P(shoeR) + P(torso) + P(head) + P(fez) + P(armL) + P(armR) + '<circle cx="54" cy="244" r="15"/><circle cx="210" cy="214" r="15"/>');
  s += D(legs, '#F4ECDB') + clipG(id + 'l', legs, `<rect x="130" y="260" width="80" height="160" fill="url(#hA)"/><path d="M80,300 Q100,320 90,380 M170,300 Q160,330 172,380" stroke="${INK}" stroke-width="2" fill="none"/>`);
  s += D(shoeL, RED) + D(shoeR, RED);
  s += D(armL, '#E2B98F') + D(armR, '#E2B98F') + `<circle cx="54" cy="244" r="15" fill="#E2B98F" stroke="${INK}" stroke-width="3"/><circle cx="210" cy="214" r="15" fill="#E2B98F" stroke="${INK}" stroke-width="3"/>`;
  s += D(torso, '#E2B98F') + HF('M150,150 L172,170 L180,276 L150,276 Z', 'hA') + D(vestL, '#6a3f8a') + D(vestR, '#6a3f8a') + HF(vestR, 'hD') + D(sash, RED) + HF(sash, 'hB');
  s += D('M118,128 L142,128 L140,146 L120,146 Z', '#E2B98F');
  s += D(head, '#E2B98F') + clipG(id + 'h', head, `<ellipse cx="166" cy="104" rx="26" ry="40" fill="url(#hA)"/>`) + D(hair, INK);
  s += `<ellipse cx="116" cy="96" rx="9" ry="7" fill="#fff" stroke="${INK}" stroke-width="2.2"/><ellipse cx="144" cy="96" rx="9" ry="7" fill="#fff" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<g class="pup"><circle cx="118" cy="97" r="4" fill="${INK}"/><circle cx="146" cy="97" r="4" fill="${INK}"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="116" cy="96" rx="10" ry="8" fill="#E2B98F" stroke="${INK}" stroke-width="2.2"/><ellipse cx="144" cy="96" rx="10" ry="8" fill="#E2B98F" stroke="${INK}" stroke-width="2.2"/></g>`;
  s += `<path class="brow" d="M106,84 q10,-6 20,-1 M136,83 q10,-5 20,1" stroke="${INK}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  s += `<path d="M130,100 q-4,12 2,14" stroke="${INK}" stroke-width="2.4" fill="none"/><path d="M118,122 q12,8 26,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += D(fez, RED) + HF(fez, 'hD') + `<path d="M152,22 C176,26 182,46 176,64" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="176" cy="66" r="6" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`;
  return s;
}
/* ---------- bustos nuevos (viewBox 0 0 360 460, base bustInner) ---------- */
const wigOver = () => {
  let c = ''; const cur = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F4F1EA" stroke="${INK}" stroke-width="2.6"/><path d="M${x - r * 0.5},${y} a${r * 0.5},${r * 0.5} 0 1,1 ${r},0" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  [[110, 170], [100, 205], [98, 240], [100, 275], [106, 308], [250, 170], [260, 205], [262, 240], [260, 275], [254, 308]].forEach(q => c += cur(q[0], q[1], 22));
  const top = 'M112,176 C108,120 140,104 180,104 C220,104 252,120 248,176 C236,150 212,138 180,140 C148,138 124,150 112,176 Z';
  return cut(P(top), 3, 4) + D(top, '#F4F1EA') + HF(top, 'hF') + c + `<path d="M180,104 L174,90 L186,90 Z" fill="${INK}"/>`;
};
const jabotOver = () => `<path d="M160,332 C150,360 160,380 180,392 C200,380 210,360 200,332 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M168,344 q12,8 24,0 M166,360 q14,8 28,0" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
function gallandInner() { return bustInner({ uniform: 'soldier', seed: 14 }) + coatOver('#4a3050') + jabotOver() + wigOver(); }
const curlsOver = () => {
  let c = ''; const r = rng(77);
  for (let k = 0; k < 15; k++) { const a = Math.PI * (1.02 + k / 14 * 0.96), x = 180 + Math.cos(a) * 78, y = 206 + Math.sin(a) * 86; c += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(18 + r() * 5)}" fill="#8a5a2a" stroke="${INK}" stroke-width="2.6"/><path d="M${f1(x - 8)},${f1(y)} a8,8 0 1,1 16,0" stroke="${INK}" stroke-width="1.6" fill="none"/>`; }
  let lv = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (1.12 + k / 8 * 0.76), x = 180 + Math.cos(a) * 82, y = 196 + Math.sin(a) * 74, rot = a * 180 / Math.PI + 90; lv += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="16" ry="7" fill="#7a9a52" stroke="${INK}" stroke-width="2.4" transform="rotate(${f1(rot + (k % 2 ? 30 : -30))} ${f1(x)} ${f1(y)})"/>`; }
  return c + lv;
};
const cloakOver = () => {
  const cl = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  return `<path d="${cl}" fill="#8a2f3a" stroke="${INK}" stroke-width="3"/><path d="${cl}" fill="url(#hA)" opacity=".35"/><path d="M140,330 L120,460 M220,330 L250,460" stroke="${INK}" stroke-width="2.5"/><path d="M120,340 L240,340 L230,372 L130,372 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="180" cy="356" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
};
function alexInner() { return bustInner({ uniform: 'soldier', seed: 12 }) + cloakOver() + curlsOver(); }

/* ---------- medalla de oro grabada (viewBox 0 0 220 300) ---------- */
function medalInner() {
  let rim = ''; for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2; rim += `<circle cx="${f1(110 + Math.cos(a) * 82)}" cy="${f1(196 + Math.sin(a) * 82)}" r="4" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`; }
  return cut('<path d="M60,0 L100,120 L120,120 L160,0 Z"/><circle cx="110" cy="196" r="96"/>', 5, 7)
    + `<path d="M60,0 L96,120 L110,120 L84,0 Z" fill="${RED}" stroke="${INK}" stroke-width="3.5"/><path d="M160,0 L124,120 L110,120 L136,0 Z" fill="#3f5a8a" stroke="${INK}" stroke-width="3.5"/>`
    + `<circle cx="110" cy="196" r="96" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="110" cy="196" r="96" fill="url(#hD)" opacity=".3"/>${rim}<circle cx="110" cy="196" r="66" fill="#E9C75C" stroke="${INK}" stroke-width="4"/>`
    + `<text x="110" y="232" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="104" fill="${INK}">1</text><path d="M70,150 Q90,130 116,132" stroke="#fff" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/>`;
}
/* ---------- gorro de fiesta + matasuegras para el emú frontal (coordenadas de su viewBox 400x600) ---------- */
function partyOver() {
  const cone = 'M160,128 L232,-60 L284,148 Z';
  let st = ''; for (let k = 0; k < 4; k++) st += `<path d="M${f1(172 + k * 28)},${f1(124 - k * 3)} L${f1(214 + k * 12)},${f1(-10 - k * 8)}" stroke="${PINK}" stroke-width="12"/>`;
  return `<g>${cut(P(cone), 4, 5)}${D(cone, YEL, 4)}<clipPath id="pcone"><path d="${cone}"/></clipPath><g clip-path="url(#pcone)">${st}</g><path d="M160,128 L284,148" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="232" cy="-62" r="18" fill="${PINK}" stroke="${INK}" stroke-width="4"/></g>
   <g class="blow"><path d="M240,300 L330,300" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M240,300 L330,300" stroke="${PINK}" stroke-width="20" stroke-linecap="round"/><path d="M240,300 L330,300" stroke="${YEL}" stroke-width="6" stroke-dasharray="10 12"/><path d="M330,300 q40,0 40,-30 q0,-26 -26,-24" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" class="blowTip"/><path d="M330,300 q40,0 40,-30 q0,-26 -26,-24" stroke="${PINK}" stroke-width="13" fill="none" stroke-linecap="round"/></g>`;
}
/* confeti de papel recortado (HTML) */
function paperConfetti(pa, n, seed, cols, o = {}) {
  const r = rng(seed), out = [];
  for (let i = 0; i < n; i++) {
    const w = 18 + r() * 22, h = 10 + r() * 14;
    const e = box(pa, 0, 0, w, h, { background: cols[i % cols.length], border: `2px solid ${INK}`, zIndex: o.z || 30, clipPath: jag(seed + i, 6, 3) });
    out.push({ e, x: (o.x0 || 40) + r() * (o.xw || 1000), y0: (o.y0 == null ? -80 : o.y0) - r() * (o.spread || 200), d: r() * (o.dd || 0.6), rs: (r() - 0.5) * 900, sw: 20 + r() * 40, vy: (o.vy || 900) * (0.7 + r() * 0.6) });
  }
  return out;
}
function updConf(C, t, t0, on = true) {
  C.forEach(q => { const tt = t - t0 - q.d; if (!on || tt < 0) { q.e.style.visibility = 'hidden'; return; } q.e.style.visibility = 'visible'; set(q.e, { x: q.x + Math.sin(tt * 4 + q.d * 9) * q.sw, y: q.y0 + q.vy * tt, r: q.rs * tt }); });
}
/* barra de la lista 1·2·3·4 (arriba, global) */
const LB = (() => {
  const wrap = el('div', world, { left: '0', top: '166px', width: '1080px', height: '96px', zIndex: 520, display: 'flex', justifyContent: 'center', gap: '18px' });
  const items = [1, 2, 3, 4].map(n => {
    const e = el('div', wrap, { position: 'relative', width: '92px', height: '92px', borderRadius: '50%', border: `6px solid ${INK}`, background: '#FBF6EA', fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', lineHeight: '80px', textAlign: 'center', color: INK, boxShadow: `4px 4px 0 ${SH}` }, String(n));
    e.style.position = 'relative'; return e;
  });
  return { wrap, items };
})();
