/* =====================================================================
   Ep. 1 · «Cleopatra, más cerca del iPhone que de las pirámides»
   Todo clavado a words_table.txt de este episodio.
   ===================================================================== */
// símbolos nuevos (avatares / recortes)
defsSvg.querySelector('defs').insertAdjacentHTML('beforeend',
  `<symbol id="cleoS" viewBox="0 0 400 500" overflow="visible">${cleoInner({ seed: 31 })}</symbol>` +
  `<symbol id="mamS" viewBox="0 0 520 440" overflow="visible">${mammothInner({ seed: 45 })}</symbol>`);
AV.CLEO = ['cleoS', '170 90 200 200', 400, 500]; AV.MAM = ['mamS', '300 30 200 200', 520, 440];

const mkCleo = (pa, b, seed = 30) => { const f = mk(pa, b, cleoInner({ seed }), '0 0 400 500', 'cleo'); f.crown = f.d.querySelector('.crownG'); f.lupa = f.d.querySelector('.lupa'); f.cobra = f.d.querySelector('.cobra'); return f; };
const mkPhone = (pa, b) => { const f = mk(pa, b, iphoneInner(), '0 0 160 320', 'ip'); f.flash = f.d.querySelector('.flashG'); return f; };
const mkPyr = (pa, b, o = {}) => { const f = mk(pa, b, pyramidInner(o), '0 0 400 260', 'py'); f.blk = [...f.d.querySelectorAll('.blk')]; return f; };
const mkMam = (pa, b, seed = 44) => { const f = mk(pa, b, mammothInner({ seed }), '0 0 520 440', 'mam'); f.trunk = f.d.querySelector('.trunk'); f.legs = ['lgA', 'lgB', 'lgC', 'lgD'].map(c => f.d.querySelector('.' + c)); return f; };
function mamPose(f, t, o = {}) {
  face(f, t, o);
  f.trunk.setAttribute('transform', `rotate(${f1(o.trunk || 0)} 402 188)`);
  const wk = o.walk || 0; const L = [[140, 250], [204, 256], [304, 256], [356, 248]];
  f.legs.forEach((g, i) => g.setAttribute('transform', `rotate(${f1(Math.sin(t * 11 + (i % 2) * Math.PI) * 14 * wk)} ${L[i][0]} ${L[i][1]})`));
}
// anclas centradas (escala alrededor de un punto)
function anchor(parent, x, y, z = 20) { return box(parent, x, y, 0, 0, { zIndex: z }); }
function achip(parent, x, y, html, o = {}) { const a = anchor(parent, x, y, o.z || 20); const c = chip(a, 0, 0, html, o); c.style.transform = 'translate(-50%,-50%)'; a.inner = c; return a; }
function atext(parent, x, y, html, css = {}) { const a = anchor(parent, x, y, css.zIndex || 20); const e = el('div', a, Object.assign({ left: 0, top: 0, whiteSpace: 'nowrap', transform: 'translate(-50%,-50%)', textAlign: 'center' }, css), html); a.inner = e; return a; }
function stampC(parent, x, y, html, o = {}) { const a = anchor(parent, x, y, o.z || 30); const s = stamp(a, 0, 0, html, o); s.style.transform = 'translate(-50%,-50%)'; a.inner = s; return a; }
function flipX(f) { f.d.firstChild.style.transform = 'scaleX(-1)'; }
const sparkles = (parent, n, x, y, spread, seed = 3) => { const r = rng(seed), out = []; for (let i = 0; i < n; i++) out.push({ e: el('div', parent, { left: px(x + (r() - .5) * spread), top: px(y + (r() - .5) * spread * .6), fontSize: px(40 + r() * 30), color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '✦'), ph: r() * 6 }); return out; };

/* ======================================================================
   A · GANCHO (0 – 4.32)  L0 — imagen + afirmación desde el fotograma 1
   ====================================================================== */
{
  const c = scene(-1, 4.32, t => {
    set(cam, { s: 1 + 0.06 * p(t, 0, 4.3, E.linear) });
    set(sun, { r: t * 8 });
    // el iPhone se acerca con zoom en «iPhone»
    const kz = p(t, 1.86, 0.5, E.outBack);
    set(ph.d, { x: -70 * kz, y: -30 * kz + wobble(t, 0.7, 6), s: 1 + 0.32 * kz, r: lerp(10, -4, kz) });
    face(ph, t, {});
    // Cleopatra: mira al iPhone, cejas arriba al acercarse
    face(cl, t, { look: t < 1.86 ? [2, 0] : [4, -1], brow: t > 1.95 && t < 3.3 ? -8 : 0, seed: 0.6 });
    set(cl.d, { y: wobble(t, 0.5, 3) });
    // la pirámide «se aleja» en «pirámides»
    const kp = p(t, 3.42, 0.5, E.outCubic);
    set(py.d, { s: 1 - 0.35 * kp, x: -20 * kp, y: 12 * kp });
    set(near, { s: pop(t, 2.0, 0.4), r: -6, o: t < 2.0 ? 0 : 1 });
    set(farA, { o: t < 3.42 ? 0 : 1 }); farPath.style.strokeDashoffset = f1(1 - p(t, 3.42, 0.45)) ;
    set(far, { s: pop(t, 3.6, 0.4), r: 5, o: t < 3.6 ? 0 : 1 });
    // titular
    paint(hlA, t, 1.86, 0.4); paint(hlB, t, 3.42, 0.45);
    set(kwA, { s: 1 + 0.12 * Math.sin(clamp((t - 1.86) / 0.4) * Math.PI) });
    set(kwB, { s: 1 + 0.12 * Math.sin(clamp((t - 3.42) / 0.4) * Math.PI) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const sun = box(cam, 230, 560, 560, 560, { borderRadius: '50%', background: YEL, border: `6px solid ${INK}`, boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  const dunes = box(cam, 0, 0, 1080, 1920); dunes.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-20,1010 Q260,960 560,1000 T1100,990 L1100,1500 L-20,1500 Z" fill="${NILE}" stroke="${INK}" stroke-width="5"/><path d="M-20,1010 Q260,960 560,1000 T1100,990 L1100,1500 L-20,1500 Z" fill="url(#hP)"/><path d="M60,1080 q60,-14 120,0 M700,1100 q70,-16 140,0 M380,1160 q50,-12 100,0" stroke="${INK}" stroke-width="2.5" fill="none" opacity=".5"/></svg>`;
  const py = mkPyr(cam, [50, 900, 190, 124], { seed: 3 }); py.d.style.transformOrigin = '95px 124px';
  const cl = mkCleo(cam, [200, 620, 500, 625]); cl.d.style.zIndex = 3;
  const ph = mkPhone(cam, [700, 690, 200, 400]); ph.d.style.zIndex = 4;
  const near = chip(cam, 640, 1130, 'cerca', { size: 40, bg: YEL, color: INK, z: 6 });
  const farA = box(cam, 0, 0, 1080, 1920, { zIndex: 2 }); farA.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="fp" pathLength="1" d="M300,860 Q230,800 175,880" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/><path class="fp" pathLength="1" d="M300,860 Q230,800 175,880" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></svg>`;
  const fps = [...farA.querySelectorAll('.fp')]; const farPath = { style: {} }; Object.defineProperty(farPath.style, 'strokeDashoffset', { set: v => fps.forEach(q => q.style.strokeDashoffset = v) });
  const far = chip(cam, 40, 800, 'lejísimos', { size: 36, bg: PINK, z: 6 });
  // titular del gancho (visible desde t=0)
  const hb = el('div', c, { left: '40px', top: '178px', width: '1000px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, color: INK, zIndex: 500, lineHeight: 1.04 });
  hb.innerHTML = `<div style="font-size:84px">Cleopatra vivió</div><div style="font-size:92px">más cerca del <span class="kwA" style="display:inline-block;font-style:italic">${hlSpan('iPhone…', 'hA2')}</span></div><div style="font-size:92px">que de las <span class="kwB" style="display:inline-block;font-style:italic">${hlSpan('pirámides', 'hB2')}</span></div>`;
  const hlA = hb.querySelector('.hA2'), hlB = hb.querySelector('.hB2'), kwA = hb.querySelector('.kwA'), kwB = hb.querySelector('.kwB');
}

/* ======================================================================
   B · «Y no es una forma de hablar. Son números.» (4.32 – 7.28)  L1
   ====================================================================== */
headline(4.32, 5.98, 'No es una forma de *hablar*', { size: 80, hlT: 5.27 });
headline(5.98, 7.28, 'Son *números*.', { size: 118, hlT: 6.4, y: 214 });
{
  const TB = [];
  const c = scene(4.32, 7.28, t => {
    TB.forEach((q, i) => { const k = p(t, q.t, 0.55, E.outBounce); set(q.e, { y: lerp(-1100, 0, k) + (t > 6.04 ? Math.sin((t - 6.04) * 30 + i) * 3 * (1 - p(t, 6.04, 0.6)) : 0), r: lerp(q.r * 3, q.r, k), o: t < q.t ? 0 : 1 }); });
    stampA(dr, t, 6.45, -9, 1);
  });
  const mkTab = (x, y, w, txt, icon, r, t0) => {
    const e = box(c, x, y, w, 190, { zIndex: 10 });
    e.innerHTML = `<svg width="${w}" height="190" style="position:absolute;overflow:visible">${cut(`<rect x="8" y="8" width="${w - 16}" height="174" rx="18"/>`)}<rect x="8" y="8" width="${w - 16}" height="174" rx="18" fill="#cfc3a8" stroke="${INK}" stroke-width="5"/><rect x="8" y="8" width="${w - 16}" height="174" rx="18" fill="url(#hP)"/><rect x="24" y="24" width="${w - 48}" height="142" rx="10" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="5 6"/><path d="M${w - 70},14 l-14,30 l10,14" stroke="${INK}" stroke-width="2" fill="none"/></svg>`;
    const ic = box(e, 28, 30, 120, 130); ic.innerHTML = icon;
    el('div', e, { left: '150px', top: '34px', width: px(w - 170), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, textShadow: `3px 3px 0 #fff`, whiteSpace: 'nowrap' }, txt);
    TB.push({ e, t: t0, r });
  };
  mkTab(80, 440, 600, '2560 <span style="font-size:52px">a. C.</span>', svgW(`<g transform="translate(0,30)">${pyramidInner({ seed: 2 })}</g>`, '0 0 400 330'), -5, 4.62);
  mkTab(380, 650, 560, '30 <span style="font-size:52px">a. C.</span>', cropUse('cleoS', '150 50 220 240', 400, 500), 4, 4.95);
  mkTab(120, 860, 540, '2007', svgW(iphoneInner(), '-40 0 240 320'), -3, 5.3);
  const dr = stampC(c, 650, 1140, 'DATO REAL', { size: 100, bw: 12, bg: 'rgba(255,255,255,.88)', blend: 'normal', z: 40 });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (7.28 – 10.42)  L2
   ====================================================================== */
{
  const c = scene(7.28, 10.42, t => {
    const ex = p(t, 10.2, 0.22, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 7.3, 3, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, 9.6, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.06, y: wobble(t, 0.5, 3) - lean * 18 });
    const fanFast = t > 7.4 && t < 8.1;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > 8.7 && t < 9.4 ? [0, -5] : [0, 0], bL: t > 7.5 && t < 8.2 ? 8 : t > 9.8 ? 6 : 0, bR: t > 7.5 && t < 8.2 ? 8 : t > 9.8 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), noCup: false, seed: 0.3 });
    popA(tag, t, 7.78, { r: -5 });
    const ks = p(t, 8.62, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 8.6, 2)) + (1 - ks) * 8, o: t < 8.6 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 9.87, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14).keys()].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hW)" opacity=".25"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/>${lace}</svg>`;
  }
  const vec = mkVec(cam, [190, 430, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040], [760, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    [[30, 96], [170, 96], [60, 110], [140, 110]].forEach(l => fl += `<ellipse cx="${l[0]}" cy="${l[1]}" rx="30" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3" transform="rotate(${l[0] < 100 ? -20 : 20} ${l[0]} ${l[1]})"/>`);
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['esto', 23, sl1], ['no', 24, sl1], ['venía', 25, sl1], ['en', 26, sl2], ['el', 27, sl2], ['libro', 28, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   D · LA LÍNEA DE TIEMPO (pergamino) — constructor reutilizable
   ====================================================================== */
const XK = 0.1686, XY = yr => 110 + (yr + 2560) * XK; // px por año (proporcional)
const XP = XY(-2560), XC = XY(-30), XI = XY(2007);
function buildTL(c) {
  const T = {};
  T.tw = box(c, 0, 0, 1080, 1920, { transformOrigin: '0 0' });
  const L = svgLayer(T.tw, 1); const cid = uid('tlc');
  let ticks = '', labels = '';
  for (let yr = -2500; yr <= 2000; yr += 100) { const x = XY(yr), maj = yr % 500 === 0; ticks += `M${f1(x)},${maj ? 738 : 748}V${maj ? 782 : 772}`; }
  [[-2000, '2000 a. C.'], [-1000, '1000 a. C.'], [0, 'a. C. | d. C.'], [1000, '1000'], [2000, '2000']].forEach(q => labels += `<text x="${f1(XY(q[0]))}" y="808" text-anchor="middle" font-family="SpecialElite" font-size="20" fill="${INK}">${q[1]}</text>`);
  L.innerHTML = `<defs><clipPath id="${cid}"><rect class="bc" x="0" y="600" width="0" height="300"/></clipPath></defs>
  <g clip-path="url(#${cid})">
   <rect x="16" y="708" width="1040" height="120" fill="${SH}"/>
   <rect x="30" y="700" width="1030" height="120" fill="#F4E9D0" stroke="${INK}" stroke-width="5"/><rect x="30" y="700" width="1030" height="120" fill="url(#hP)"/>
   <path d="M30,712 H1060 M30,808 H1060" stroke="${INK}" stroke-width="1.5" opacity=".4"/>
   <rect class="tr1" x="${f1(XP)}" y="751" width="0" height="18" rx="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/>
   <rect class="tr2" x="${f1(XC)}" y="751" width="0" height="18" rx="9" fill="${YEL}" stroke="${INK}" stroke-width="3"/>
   <path d="M44,760 H1030" stroke="${INK}" stroke-width="6"/><path d="M1012,746 L1036,760 L1012,774" stroke="${INK}" stroke-width="6" fill="none" stroke-linejoin="round"/>
   <path d="${ticks}" stroke="${INK}" stroke-width="3"/>${labels}
  </g>
  <g class="rollR"><rect x="-22" y="688" width="44" height="144" rx="16" fill="#E9DCC0" stroke="${INK}" stroke-width="5"/><rect x="-22" y="688" width="44" height="144" rx="16" fill="url(#hA)" opacity=".5"/><ellipse cx="0" cy="688" rx="22" ry="7" fill="${WOOD}" stroke="${INK}" stroke-width="3"/><ellipse cx="0" cy="832" rx="22" ry="7" fill="${WOOD}" stroke="${INK}" stroke-width="3"/></g>
  <g><rect x="8" y="688" width="44" height="144" rx="16" fill="#E9DCC0" stroke="${INK}" stroke-width="5"/><rect x="8" y="688" width="44" height="144" rx="16" fill="url(#hA)" opacity=".5"/></g>
  <path class="b1" pathLength="1" d="${bracePath(XP, XC, 884)}" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  <path class="b2" pathLength="1" d="${bracePath(XC, XI, 884)}" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  <rect class="pm" x="${f1(XY(-2760))}" y="560" width="${f1(400 * XK)}" height="142" fill="${PINK}" opacity="0"/>`;
  T.bc = L.querySelector('.bc'); T.roll = L.querySelector('.rollR'); T.tr1 = L.querySelector('.tr1'); T.tr2 = L.querySelector('.tr2'); T.b1 = L.querySelector('.b1'); T.b2 = L.querySelector('.b2'); T.pm = L.querySelector('.pm');
  T.emuW = box(T.tw, 150, 400, 130, 300, { overflow: 'hidden', zIndex: 2 });
  T.emu = mkEmuF(T.emuW, [0, 300, 130, 195]);
  T.py = mkPyr(T.tw, [-20, 540, 260, 169], { seed: 5 }); T.py.d.style.zIndex = 3; T.py.d.style.transformOrigin = '130px 162px';
  T.cl = mkCleo(T.tw, [427, 425, 220, 275]); T.cl.d.style.zIndex = 3; T.cl.d.style.transformOrigin = '110px 275px';
  T.ip = mkPhone(T.tw, [828, 494, 104, 208]); T.ip.d.style.zIndex = 3; T.ip.d.style.transformOrigin = '52px 208px';
  T.chP = achip(T.tw, 140, 852, '≈ <span class="cnt">2560</span> a. C.', { size: 30, bg: INK, color: YEL }); T.cnt = T.chP.querySelector('.cnt');
  T.chC = achip(T.tw, XC, 852, '30 a. C.', { size: 30, bg: INK, color: YEL });
  T.chI = achip(T.tw, XI, 852, '2007', { size: 30, bg: INK, color: YEL });
  T.lb1 = atext(T.tw, (XP + XC) / 2, 936, '≈ 2.500 años', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '40px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px 6px', boxShadow: `5px 5px 0 ${PINK}` });
  T.lb2 = atext(T.tw, (XC + XI) / 2, 936, '≈ 2.000 años', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '40px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px 6px', boxShadow: `5px 5px 0 ${YEL}` });
  T.pill = atext(T.tw, 0, 760, '0 años', { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: '#fff', background: INK, borderRadius: '40px', padding: '4px 16px 6px', border: `3px solid ${PINK}`, zIndex: 25 });
  T.dot = box(T.tw, 0, 0, 0, 0, { zIndex: 24 }); T.dot.innerHTML = `<div style="position:absolute;left:-17px;top:-17px;width:34px;height:34px;border-radius:50%;background:${PINK};border:5px solid ${INK}"></div>`;
  T.pmLbl = achip(T.tw, 130, 528, '± 200 años', { size: 28, bg: PINK });
  T.cam = (S, fx, fy, sy = 820) => { T.tw.style.transform = `translate(${f1(540 - fx * S)}px,${f1(sy - fy * S)}px) scale(${f1(S * 1000) / 1000})`; };
  T.brace = (b, x1, x2, k) => { b.setAttribute('d', bracePath(x1, x2, 884)); b.style.strokeDashoffset = f1((1 - k) * 1000) / 1000; };
  T.unroll = k => { const x = lerp(54, 1050, k); T.bc.setAttribute('width', f1(x)); T.roll.setAttribute('transform', `translate(${f1(x)},0) rotate(0)`); };
  T.marker = (on, x, txt, col) => { T.dot.style.visibility = on ? 'visible' : 'hidden'; T.pill.style.visibility = on ? 'visible' : 'hidden'; if (!on) return; set(T.dot, { x: x }); set(T.pill, { x: x, y: 46 }); T.pill.inner.textContent = txt; T.pill.inner.style.borderColor = col; T.dot.firstChild.style.background = col; };
  return T;
}
function camKeys(K, t) { if (t <= K[0][0]) return K[0].slice(1); for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t < b[0]) { const k = E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } } return K[K.length - 1].slice(1); }

/* ---------- TL1 · L3–L5 (10.42 – 26.5) ---------- */
headline(10.42, 12.5, 'La Gran *Pirámide* de Guiza', { size: 80, hlT: 10.89 });
headline(12.5, 15.75, 'se terminó hacia el año *2560 a. C.*', { size: 76, hlT: 13.3 });
headline(15.75, 18.35, 'Cleopatra murió en el año *30 a. C.*', { size: 76, hlT: 17.03 });
headline(18.35, 21.5, 'Entre una y otra: *≈ 2.500 años*', { size: 78, hlT: 20.07 });
headline(21.5, 24.05, 'Y de Cleopatra al primer *iPhone*…', { size: 78, hlT: 22.91 });
headline(24.05, 26.5, '…poco más de *2.000*', { size: 92, hlT: 25.95 });
{
  const K = [[10.42, 1, 540, 820], [10.98, 1, 540, 820], [11.55, 2.1, 150, 640], [15.6, 2.2, 150, 640], [16.25, 1.4, 360, 670], [21.5, 1.45, 360, 670], [22.25, 1.4, 700, 670], [25.55, 1.45, 700, 670], [26.05, 1, 540, 820]];
  let T;
  const c = scene(10.42, 26.5, t => {
    const cm = camKeys(K, t); T.cam(cm[0], cm[1], cm[2]);
    T.unroll(p(t, 10.45, 0.55, E.inOutCubic));
    // pirámide
    const kp = pop(t, 10.89, 0.5); set(T.py.d, { s: kp, o: t < 10.89 ? 0 : 1 });
    popA(T.chP, t, 13.02, { r: -2 });
    // cameo del emú detrás de la pirámide
    const ke = p(t, 12.0, 0.18, E.outBack) * (1 - p(t, 12.78, 0.16, E.inCubic));
    set(T.emu.d, { y: -150 * ke, r: 6 * Math.sin(t * 3) });
    face(T.emu, t, { half: true, blink: false, bR: t > 12.25 ? 18 * p(t, 12.25, 0.12, E.outBack) : 0, look: [0, 0] });
    // Cleopatra
    set(T.cl.d, { s: pop(t, 15.86, 0.5), o: t < 15.86 ? 0 : 1 });
    face(T.cl, t, { look: t > 22.9 ? [5, -1] : t > 18.4 && t < 20.5 ? [-6, 1] : [2, 0], brow: t > 20.4 && t < 21.2 ? -7 : t > 22.95 && t < 23.6 ? -9 : 0, seed: 0.2 });
    popA(T.chC, t, 17.03);
    // iPhone
    set(T.ip.d, { s: pop(t, 22.91, 0.5), o: t < 22.91 ? 0 : 1, r: t > 22.91 ? wobble(t, 0.8, 2) : 0 });
    popA(T.chI, t, 23.74);
    // marcador 1: pirámide → Cleopatra
    const k1 = p(t, 18.42, 1.95, E.inOutCubic), k2 = p(t, 23.95, 1.45, E.inOutCubic);
    T.tr1.setAttribute('width', f1((XC - XP) * k1)); T.tr2.setAttribute('width', f1((XI - XC) * k2));
    T.brace(T.b1, XP, XC, k1); T.brace(T.b2, XC, XI, k2);
    if (t > 18.42 && t < 20.55) T.marker(true, lerp(XP, XC, k1), fmt(Math.round(2530 * k1 / 10) * 10) + ' años', PINK);
    else if (t > 23.95 && t < 25.55) T.marker(true, lerp(XC, XI, k2), fmt(Math.round(2000 * k2 / 10) * 10) + ' años', YEL);
    else T.marker(false);
    stampA(T.lb1, t, 20.42, -2, 1); stampA(T.lb2, t, 25.45, 2, 1);
    T.pmLbl.style.visibility = 'hidden';
  }, { cut: true, clip: true });
  T = buildTL(c);
}
/* ---------- golpe amarillo: 2.500 > 2.000 (26.5 – 27.75) ---------- */
colorHit(26.5, 27.75, YEL, c => {
  const n1 = atext(c, 540, 470, '2.500', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', color: INK, zIndex: 5 });
  const gt = atext(c, 540, 690, '&gt;', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', color: PINK, zIndex: 5, textShadow: `6px 6px 0 ${INK}` });
  const n2 = atext(c, 540, 900, '2.000', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', color: INK, zIndex: 5 });
  const s1 = atext(c, 540, 600, 'años de la pirámide a Cleopatra', { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, zIndex: 5 });
  const s2 = atext(c, 540, 1030, 'años de Cleopatra al iPhone', { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, zIndex: 5 });
  const sp = mkPyr(c, [110, 1090, 270, 176]); sp.d.style.filter = SIL; sp.d.style.zIndex = 3;
  const sc = mkCleo(c, [400, 1060, 200, 250]); sc.d.style.filter = SIL; sc.d.style.zIndex = 3;
  const si = mkPhone(c, [700, 1090, 100, 200]); si.d.style.filter = SIL; si.d.style.zIndex = 3;
  return t => {
    set(n1, { s: lerp(1.5, 1, p(t, 26.5, 0.2)), o: 1 }); set(n2, { s: lerp(1.5, 1, p(t, 26.62, 0.2)), o: t < 26.62 ? 0 : 1 });
    set(gt, { s: pop(t, 26.78, 0.35) * (1 + 0.08 * Math.sin(t * 12)), o: t < 26.78 ? 0 : 1 }); gt.inner.style.textShadow = `6px 6px 0 ${INK}` + (glitch(t, 26.8, 0.3) ? ', ' + glitch(t, 26.8, 0.3) : '');
    popA(s1, t, 26.6); popA(s2, t, 26.7);
    [sp, sc, si].forEach((f, i) => set(f.d, { y: -Math.abs(Math.sin((t - 26.5) * 8 + i)) * 24 }));
  };
});

/* ======================================================================
   E · MUSEO: la pirámide era una antigüedad para Cleopatra (27.75 – 32.56)  L6
   ====================================================================== */
headline(27.75, 30.9, 'Para Cleopatra, las pirámides eran *más antiguas*…', { size: 72, hlT: 29.92 });
headline(30.9, 32.56, '…que ella para *nosotros*', { size: 84, hlT: 31.86 });
{
  const c = scene(27.75, 32.56, t => {
    set(cam, { s: 1 + 0.05 * p(t, 27.75, 4.8, E.linear) });
    popA(plq, t, 28.2, { r: -2 });
    const kc = p(t, 28.18, 0.45, E.outBack); set(cl.d, { x: (1 - kc) * 500, o: t < 28.1 ? 0 : 1 });
    cl.lupa.style.opacity = 1;
    const peer = t > 28.9 && t < 31.6;
    face(cl, t, { look: peer ? [-3, 2] : [-1, 0], brow: t > 29.9 && t < 30.9 ? -9 : 0, closed: t > 31.86 && t < 32.05, seed: 0.5 });
    set(cl.d, { y: wobble(t, 0.6, 3) + (peer ? Math.sin(t * 2) * 6 : 0), r: peer ? -3 : 0 });
    set(py.d, { y: wobble(t, 0.4, 2) });
    sp.forEach((s, i) => set(s.e, { o: t > 29.92 && t < 31.0 ? 0.6 + 0.4 * Math.sin(t * 9 + s.ph) : 0, s: 0.7 + 0.3 * Math.sin(t * 7 + s.ph), r: t * 90 }));
    // un iPhone le hace una foto a ella: ahora la antigüedad es Cleopatra
    const kh = p(t, 31.2, 0.4, E.outBack); set(hand, { y: (1 - kh) * 600, r: -8, o: t < 31.15 ? 0 : 1 });
    const fl = t > 31.86 && t < 32.1 ? 1 - (t - 31.86) / 0.24 : 0; flash.style.opacity = fl * 0.85;
    popA(plq2, t, 31.92, { r: 3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E5D3B3', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const wall = box(cam, 0, 0, 1080, 1920); wall.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1140" width="1080" height="400" fill="#8C3B2E"/><rect x="0" y="1140" width="1080" height="400" fill="url(#hD)" opacity=".35"/><path d="M0,1140 H1080" stroke="${INK}" stroke-width="8"/><rect x="0" y="1124" width="1080" height="18" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></svg>`;
  // pedestal + vitrina
  const ped = box(cam, 0, 0, 1080, 1920); ped.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut('<rect x="110" y="900" width="420" height="380"/><rect x="90" y="880" width="460" height="34"/>')}<rect x="110" y="900" width="420" height="380" fill="#F2EBDD" stroke="${INK}" stroke-width="5"/><rect x="420" y="900" width="110" height="380" fill="url(#hA)"/><rect x="90" y="880" width="460" height="34" fill="#E6DCC8" stroke="${INK}" stroke-width="5"/><path d="M150,930 V1260 M190,930 V1260" stroke="${INK}" stroke-width="2" opacity=".35"/>
   <rect x="110" y="520" width="420" height="362" fill="rgba(220,240,240,.35)" stroke="${INK}" stroke-width="6"/><path d="M130,540 L230,540 L130,660 Z" fill="#fff" opacity=".5"/><rect x="100" y="506" width="440" height="22" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></svg>`;
  const py = mkPyr(cam, [140, 640, 360, 234], { seed: 6 }); py.d.style.zIndex = 2;
  const glass = box(cam, 110, 520, 420, 362, { zIndex: 3, background: 'linear-gradient(120deg, rgba(255,255,255,.28), rgba(255,255,255,0) 40%)' });
  const plq = box(cam, 140, 950, 360, 150, { zIndex: 6 });
  plq.innerHTML = `<div style="position:absolute;inset:0;background:#2a1f17;border:5px solid ${BRASS};border-radius:10px;box-shadow:6px 6px 0 ${SH}"></div><div style="position:absolute;left:0;top:14px;width:360px;text-align:center;font-family:Rye;font-size:44px;color:${YEL}">ANTIGÜEDAD</div><div style="position:absolute;left:0;top:78px;width:360px;text-align:center;font-family:SpecialElite;font-size:24px;line-height:1.2;color:${PAPER}">Gran Pirámide de Guiza<br>c. 2560 a. C.</div>`;
  const cl = mkCleo(cam, [500, 560, 440, 550]); flipX(cl); cl.d.style.zIndex = 5;
  const rope = box(cam, 0, 0, 1080, 1920, { zIndex: 7 }); rope.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M70,1200 Q300,1290 540,1200 Q780,1290 1010,1200" stroke="${INK}" stroke-width="20" fill="none"/><path d="M70,1200 Q300,1290 540,1200 Q780,1290 1010,1200" stroke="${RED}" stroke-width="12" fill="none"/>${[70, 540, 1010].map(x => `<rect x="${x - 12}" y="1180" width="24" height="200" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="1176" r="20" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`;
  const sp = sparkles(cam, 5, 320, 650, 300, 9);
  const hand = box(cam, 600, 980, 240, 400, { zIndex: 8 });
  hand.innerHTML = `<svg viewBox="0 0 240 400" width="240" height="400" style="overflow:visible"><path d="M70,400 L90,250 L170,250 L160,400 Z" fill="#7cc3a8" stroke="${INK}" stroke-width="5"/><path d="M70,400 L90,250 L170,250 L160,400 Z" fill="url(#hA)" opacity=".5"/>${gloveHand(130, 230, 180, 1.1)}<g transform="translate(70,40) scale(0.75)">${iphoneInner()}</g></svg>`;
  const flash = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 60, opacity: 0 });
  const plq2 = box(cam, 610, 430, 300, 104, { zIndex: 6 });
  plq2.innerHTML = `<div style="position:absolute;inset:0;background:#2a1f17;border:5px solid ${BRASS};border-radius:10px;box-shadow:6px 6px 0 ${SH}"></div><div style="position:absolute;left:0;top:10px;width:300px;text-align:center;font-family:Rye;font-size:38px;color:${YEL}">ANTIGÜEDAD</div><div style="position:absolute;left:0;top:60px;width:300px;text-align:center;font-family:SpecialElite;font-size:24px;color:${PAPER}">Cleopatra · 30 a. C.</div>`;
}

/* ======================================================================
   F · MAMUTS VIVOS (32.56 – 40.02)  L7
   ====================================================================== */
headline(32.56, 33.75, 'Y aún hay *más*…', { size: 112, hlT: 33.34, y: 214 });
headline(33.75, 36.8, 'Cuando se construyeron las *pirámides*…', { size: 74, hlT: 35.2 });
headline(36.8, 40.02, '…aún quedaban *mamuts* vivos', { size: 80, hlT: 36.81 });
{
  const SN = [];
  const c = scene(32.56, 40.02, t => {
    set(rz, { r: t * 30, s: pop(t, 32.6, 0.4) * (1 - p(t, 33.6, 0.2)), o: t < 33.8 ? 0.55 : 0 });
    const ka = p(t, 33.77, 0.4, E.outBack); set(pA.wrap, { x: (1 - ka) * -1100, r: -1.5, o: t < 33.75 ? 0 : 1 });
    const kb = p(t, 35.86, 0.4, E.outBack); set(pB.wrap, { x: (1 - kb) * 1100, r: 1.5, o: t < 35.84 ? 0 : 1 });
    pyA.blk.forEach((b, i) => { const ph = ((t * 0.35) + i / 3) % 1; b.setAttribute('transform', `translate(${f1(ph * 40 - 20)},${f1(-ph * 40 + 20)})`); });
    popA(chA, t, 34.2, { r: -3 });
    stampA(mt, t, 35.9, -6, 1);
    // mamut entra caminando, se para, saluda con la trompa
    const kw = p(t, 36.81, 0.85, E.outCubic);
    const walking = t > 36.81 && t < 37.7;
    set(mam.d, { x: lerp(560, 0, kw), y: walking ? -Math.abs(Math.sin(t * 11)) * 8 : wobble(t, 0.6, 3), o: t < 36.7 ? 0 : 1 });
    const wave = t > 37.75 ? Math.sin((t - 37.75) * 9) : 0;
    mamPose(mam, t, { walk: walking ? 1 : 0, trunk: t > 37.6 ? -70 - wave * 22 : 0, look: [0, 0], brow: t > 37.34 && t < 38.0 ? -8 : 0, seed: 0.7 });
    set(hola, { s: pop(t, 37.85, 0.35), r: 6 + wobble(t, 1, 3), o: t < 37.85 ? 0 : 1 });
    popA(chB, t, 38.82, { r: 2 });
    SN.forEach(s => { const yy = ((t * s.v + s.o) % 1); set(s.e, { x: s.x + Math.sin(t * 2 + s.o * 9) * 14, y: yy * 400, o: t > 35.86 ? 0.9 : 0 }); });
  }, { cut: true });
  const rz = rays(c, -180, 80, 1440, 26, 'rgba(255,230,0,.55)', 'rgba(0,0,0,0)', 0);
  // panel Egipto
  const pA = paperPiece(c, 50, 420, 900, 420, { seed: 21, bg: '#F3E3BE' });
  box(pA.inner, 0, 0, 882, 402, { background: 'radial-gradient(circle at 80% 22%, rgba(255,230,0,.45) 0 70px, rgba(255,230,0,0) 72px)' });
  const pyA = mkPyr(pA.inner, [220, 110, 480, 312], { built: 0.55, seed: 8 });
  const chA = chip(pA.inner, 24, 22, 'EGIPTO · c. 2560 a. C.', { size: 32, bg: INK, color: YEL });
  // panel Ártico
  const pB = paperPiece(c, 300, 880, 640, 410, { seed: 33, bg: '#E3ECEC' });
  const ice = box(pB.inner, 0, 0, 622, 392); ice.innerHTML = `<svg width="622" height="392" style="overflow:visible"><path d="M-10,300 Q160,270 330,296 T640,288 L640,400 L-10,400 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M-10,300 Q160,270 330,296 T640,288 L640,400 L-10,400 Z" fill="url(#hW)" opacity=".18"/><path d="M40,90 L120,40 L200,96 Z M380,80 L470,30 L560,84 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M120,40 L140,96 M470,30 L490,84" stroke="${INK}" stroke-width="2"/></svg>`;
  const mam = mkMam(pB.inner, [150, 70, 400, 338]);
  const hola = chip(pB.inner, 380, 40, '¡hola!', { size: 34, bg: '#fff', color: INK });
  const chB = chip(c, 330, 1205, 'isla de Wrangel, Ártico', { size: 30, bg: PINK, z: 40 });
  const r = rng(5); for (let i = 0; i < 26; i++) SN.push({ e: el('div', pB.inner, { left: px(r() * 600), top: '-20px', width: '10px', height: '10px', borderRadius: '50%', background: '#fff', border: `2px solid ${INK}` }), x: 0, v: 0.25 + r() * 0.25, o: r() });
  const mt = stampC(c, 540, 862, 'MIENTRAS TANTO…', { size: 48, bw: 7, bg: 'rgba(255,255,255,.9)', blend: 'normal', z: 35 });
}
/* ---------- golpe rosa: ¡PERO VIVOS! (40.02 – 41.25) ---------- */
colorHit(40.02, 41.25, PINK, c => {
  const big = mkMam(c, [170, 640, 740, 626], 46); big.d.style.filter = SIL; big.d.style.zIndex = 3;
  const t1 = atext(c, 540, 380, '¡PERO VIVOS!', { fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '140px', color: INK, zIndex: 4 });
  const sp = sparkles(c, 6, 540, 660, 700, 4);
  return t => {
    set(big.d, { y: -Math.abs(Math.sin((t - 40.02) * 7)) * 40 });
    mamPose(big, t, { trunk: -80 - Math.sin(t * 12) * 25, walk: 0.5 });
    set(t1, { s: lerp(1.4, 1, p(t, 40.02, 0.2)), o: 1 }); t1.inner.style.textShadow = glitch(t, 40.05, 0.3);
    sp.forEach(s => set(s.e, { s: 0.6 + 0.4 * Math.sin(t * 8 + s.ph), r: t * 120, o: 1 }));
  };
});

/* ======================================================================
   G · NI SIQUIERA ERA EGIPCIA: Macedonia → Egipto (41.25 – 47.2)  L8a
   ====================================================================== */
headline(41.25, 42.2, 'Y otro *detalle*…', { size: 100, hlT: 41.67 });
headline(42.2, 44.92, 'Cleopatra ni siquiera era *egipcia*', { size: 78, hlT: 43.94 });
headline(44.92, 47.2, 'Su familia era *griega*, de Macedonia', { size: 74, hlT: 45.59 });
{
  const c = scene(41.25, 47.2, t => {
    const km = p(t, 44.93, 0.5, E.inOutCubic);
    // Cleopatra: grande en el centro → abajo a la derecha sobre Egipto
    set(cl.d, { x: lerp(0, 250, km), y: lerp(0, 120, km) + wobble(t, 0.5, 3), s: lerp(1, 0.55, km) * pop(t, 41.3, 0.5), o: t < 41.3 ? 0 : 1 });
    face(cl, t, { look: t > 43.9 && t < 44.9 ? [-5, 0] : [2, 0], brow: t > 43.94 && t < 44.8 ? -9 : 0, seed: 0.9 });
    cl.crown.style.opacity = t > 45.59 ? 1 : 0;
    cl.crown.setAttribute('transform', t > 45.59 ? `translate(0 ${f1(-(1 - p(t, 45.59, 0.35, E.outBounce)) * 160)})` : '');
    popA(egT, t, 43.94, { r: -4 });
    set(egX, { s: pop(t, 44.4, 0.3), o: t < 44.4 ? 0 : 1 });
    set(egG, { o: 1 - p(t, 44.93, 0.2) });
    const kp = p(t, 44.93, 0.45, E.outBack); set(mp.wrap, { y: (1 - kp) * -1200, r: -1, o: t < 44.9 ? 0 : 1 });
    arr.forEach(a => a.style.strokeDashoffset = f1(1 - p(t, 46.36, 0.6, E.inOutCubic)));
    popA(chM, t, 45.2); popA(chE, t, 45.4);
    popA(chG, t, 45.65, { r: -4 });
    sp.forEach(s => set(s.e, { o: t > 45.6 && t < 46.4 ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 9 + s.ph), r: t * 100 }));
  });
  const mp = paperPiece(c, 60, 430, 880, 600, { seed: 61, bg: '#d9e3dc', plain: true });
  const mapB = box(mp.inner, 0, 0, 862, 582); mapB.innerHTML = `<svg viewBox="0 0 900 640" width="862" height="582" preserveAspectRatio="xMidYMid slice" style="overflow:hidden">${medMapInner()}<text x="190" y="470" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="40" fill="#3b5a66" opacity=".8">Mar Mediterráneo</text><path class="arw" pathLength="1" d="M250,190 C330,330 470,420 620,560" stroke="${INK}" stroke-width="20" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/><path class="arw" pathLength="1" d="M250,190 C330,330 470,420 620,560" stroke="${PINK}" stroke-width="11" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></svg>`;
  const arr = [...mapB.querySelectorAll('.arw')];
  const chM = achip(mp.inner, 230, 150, 'MACEDONIA', { size: 32, bg: '#fff', color: INK });
  const chE = achip(mp.inner, 400, 520, 'EGIPTO', { size: 32, bg: YEL, color: INK });
  const cl = mkCleo(c, [250, 500, 560, 700]); cl.d.style.zIndex = 20; cl.d.style.transformOrigin = '280px 700px';
  const egG = box(c, 0, 0, 1080, 1920, { zIndex: 25 });
  const egT = atext(egG, 250, 640, '¿egipcia<br>de origen?', { fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '58px', lineHeight: 1, color: INK, background: '#fff', border: `5px solid ${INK}`, borderRadius: '18px', padding: '10px 22px 14px', boxShadow: `7px 7px 0 ${SH}` });
  const egX = box(egG, 330, 560, 120, 100, { zIndex: 30 }); egX.innerHTML = XSVG;
  const chG = chip(c, 690, 860, 'familia griega', { size: 38, bg: PINK, z: 40 });
  const sp = sparkles(c, 4, 780, 990, 240, 12);
}

/* ======================================================================
   H · DINASTÍA PTOLEMAICA: aprender egipcio (47.2 – 54.15)  L8b
   ====================================================================== */
headline(47.2, 51.35, 'La primera de su dinastía en aprender *egipcio*', { size: 70, hlT: 50.18 });
headline(51.35, 54.15, 'tras casi *300 años* en el trono', { size: 80, hlT: 52.41 });
{
  const CO = [], BU = [], GL = [];
  const c = scene(47.2, 54.15, t => {
    popA(sedice, t, 47.62, { r: -3 });
    CO.forEach((q, i) => set(q.e, { s: pop(t, q.t, 0.4), y: wobble(t, 0.7, 3, i), o: t < q.t ? 0 : 1 }));
    BU.forEach(q => popA(q.e, t, q.t, { r: q.r }));
    set(big.wrap, { s: pop(t, 48.98, 0.5), o: t < 48.98 ? 0 : 1 });
    popA(chD, t, 49.23, { r: -2 });
    popA(cb, t, 49.82, { r: 2 });
    GL.forEach(q => set(q.e, { s: pop(t, q.t, 0.3), o: t < q.t ? 0 : 1 }));
    set(tick, { s: pop(t, 51.0, 0.4), r: -8, o: t < 51.0 ? 0 : 1 });
    // la barra de 300 años se llena
    const kb = p(t, 51.38, 1.9, E.inOutCubic); barF.style.width = px(f1(760 * kb));
    const kc = p(t, 52.41, 0.9, E.outCubic); cnt.inner.innerHTML = `≈ ${Math.round(300 * kc)} <span style="font-size:60px">años</span>`;
    set(cnt, { s: t < 52.3 ? 0 : pop(t, 52.3, 0.35), o: t < 52.3 ? 0 : 1 });
    set(throne, { s: pop(t, 53.53, 0.4), r: -6, o: t < 53.5 ? 0 : 1 });
  });
  const sedice = chip(c, 70, 432, 'se dice', { size: 30, bg: '#fff', color: INK });
  // barra temporal de la dinastía
  const bar = box(c, 80, 780, 780, 34, { background: '#F4E9D0', border: `5px solid ${INK}`, borderRadius: '20px', boxShadow: `5px 5px 0 ${SH}`, overflow: 'hidden', zIndex: 5 });
  const barF = box(bar, 0, 0, 0, 24, { background: PINK, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 3px, transparent 3px 10px)' });
  const r = rng(4);
  for (let i = 0; i < 6; i++) {
    const x = 90 + i * 112, e = box(c, x, 630, 112, 112, { zIndex: 8 }); e.innerHTML = svgW(coinInner(10 + i), '-70 -70 140 140');
    CO.push({ e, t: 47.25 + i * 0.27 });
    if (i < 4) { const b = el('div', c, { left: px(x + 10), top: '520px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '40px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '24px 24px 24px 4px', padding: '0px 14px 6px', boxShadow: `4px 4px 0 ${SH}`, zIndex: 9, whiteSpace: 'nowrap' }, ['αβγ', 'λόγος', 'ναί', 'ὦ φίλε', 'χαῖρε'][i]); BU.push({ e: b, t: 47.5 + i * 0.3, r: (r() - .5) * 8 }); }
  }
  const big = paperPiece(c, 760, 600, 180, 180, { seed: 71, bg: YEL, plain: true }); big.wrap.style.zIndex = 10;
  box(big.inner, 0, 0, 162, 162, { borderRadius: '0' }).innerHTML = cropUse('cleoS', '150 60 220 220', 400, 500);
  const cb = box(c, 600, 420, 340, 160, { zIndex: 12 });
  cb.innerHTML = `<div style="position:absolute;inset:0;background:#fff;border:5px solid ${INK};border-radius:30px 30px 6px 30px;box-shadow:6px 6px 0 ${SH}"></div><svg width="60" height="60" style="position:absolute;left:300px;top:150px;overflow:visible"><path d="M0,0 L40,40 L40,0 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M4,-4 h34" stroke="#fff" stroke-width="8"/></svg>`;
  for (let i = 0; i < 5; i++) { const g = box(cb, 18 + i * 62, 38, 56, 64); g.innerHTML = glyphSvg(i, 56); GL.push({ e: g, t: 49.95 + i * 0.2 }); }
  const tick = box(c, 850, 480, 120, 120, { zIndex: 14, background: YEL, border: `5px solid ${INK}`, borderRadius: '50%', boxShadow: `5px 5px 0 ${SH}` }); tick.innerHTML = `<div style="position:absolute;left:18px;top:18px;width:74px;height:74px">${CHECK}</div>`;
  const chD = chip(c, 90, 850, 'dinastía ptolemaica · ~300 años', { size: 34, bg: INK, color: YEL });
  const cnt = atext(c, 610, 1010, '', { fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: INK, textShadow: `6px 6px 0 ${PINK}` });
  const throne = box(c, 380, 1110, 0, 0, { zIndex: 6 });
  throne.innerHTML = `<div style="position:absolute;left:330px;top:10px;font-family:Rye;font-size:38px;color:${INK};white-space:nowrap;transform:translate(-50%,0)">… en el trono 👑</div>`;
}

/* ======================================================================
   I · ¡OJO! fechas aproximadas — la cuenta sigue saliendo (54.15 – 62.1)  L9
   ====================================================================== */
headline(54.15, 58.15, 'Las fechas son *aproximadas*', { size: 80, hlT: 56.68 });
headline(58.15, 62.1, 'pero la cuenta *sigue saliendo*', { size: 80, hlT: 60.99 });
{
  let T;
  const c = scene(54.15, 62.1, t => {
    T.cam(1, 540, 820); T.unroll(1);
    [T.py, T.cl, T.ip].forEach(f => set(f.d, { s: 1, o: 1 }));
    face(T.cl, t, { look: t > 55.4 && t < 60.3 ? [-6, 1] : [2, 0], brow: t > 58.9 && t < 60.3 ? -8 : 0, seed: 0.4 });
    face(T.emu, t, {}); set(T.emu.d, { y: 0 });
    [T.chC, T.chI].forEach(a => set(a, { s: 1, o: 1 })); T.cnt.textContent = '2560';
    // baile de ±200 años
    const amp = 200 * XK * Math.max(p(t, 55.35, 0.5) * 0.45, p(t, 58.85, 0.4)) * (1 - p(t, 60.31, 0.4));
    const dx = amp * Math.sin((t - 55.35) * 7.5);
    set(T.py.d, { x: dx, r: dx * 0.08, s: 1, o: 1 }); set(T.chP, { x: dx, s: 1, o: 1 });
    T.pm.setAttribute('opacity', f1(0.4 * p(t, 56.68, 0.3)));
    popA(T.pmLbl, t, 56.68); T.pmLbl.style.visibility = t >= 56.68 ? 'visible' : 'hidden';
    T.tr1.setAttribute('width', f1(XC - XP - dx)); T.tr1.setAttribute('x', f1(XP + dx)); T.tr2.setAttribute('width', f1(XI - XC));
    T.brace(T.b1, XP + dx, XC, 1); T.brace(T.b2, XC, XI, 1);
    set(T.lb1, { x: dx / 2, s: 1, o: 1 }); set(T.lb2, { s: 1, o: 1 });
    T.marker(false);
    // sello ¡OJO!
    if (t < 56.5) stampA(ojo, t, 54.3, -8, 1); else set(ojo, { s: 1 - p(t, 56.5, 0.2), r: -8, o: 1 - p(t, 56.5, 0.2) });
    // conclusión
    set(chk, { s: pop(t, 60.99, 0.45), r: -6, o: t < 60.99 ? 0 : 1 });
    popA(chk2, t, 61.25, { rise: 30 });
    const gl = t > 60.31 ? 1 : 0; T.b1.style.strokeWidth = gl ? 9 + 3 * Math.abs(Math.sin(t * 8)) : 9;
  }, { cut: true });
  T = buildTL(c);
  const ojo = stampC(c, 580, 1080, '¡OJO!', { size: 150, bw: 14, bg: 'rgba(255,255,255,.88)', blend: 'normal', z: 60 });
  const chk = box(c, 470, 1010, 170, 170, { zIndex: 40, background: YEL, border: `6px solid ${INK}`, borderRadius: '50%', boxShadow: `7px 7px 0 ${SH}` }); chk.innerHTML = `<div style="position:absolute;left:30px;top:30px;width:100px;height:100px">${CHECK}</div>`;
  const chk2 = atext(c, 640, 1240, 'aun con ±200 años: <b>&gt; 2.000</b>', { fontFamily: 'Bricolage', fontWeight: 600, fontSize: '34px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '40px', padding: '8px 22px 10px', boxShadow: `5px 5px 0 ${SH}`, zIndex: 40 });
}

/* ======================================================================
   J · TURISTA + CLEOPATRA con cartel ANTIGÜEDAD (62.1 – 68.45)  L10
   ====================================================================== */
headline(62.1, 65.4, 'La próxima vez que veas una *pirámide*…', { size: 74, hlT: 64.05 });
headline(65.4, 68.45, '…para Cleopatra ya era una *antigüedad*', { size: 74, hlT: 67.64 });
{
  const c = scene(62.1, 68.45, t => {
    set(cam, { s: 1 + 0.05 * p(t, 62.1, 6.3, E.linear) });
    set(sun, { r: t * 6 });
    const ktu = p(t, 62.3, 0.45, E.outBack); set(tu.d, { x: (1 - ktu) * -600, y: wobble(t, 0.7, 3) });
    face(tu, t, { jaw: t > 63.6 && t < 64.3 ? 0.3 : 0, look: [0, 0], brow: t > 64.78 && t < 65.6 ? -6 : 0, seed: 1.1 });
    set(arm, { x: (1 - ktu) * -600, r: wobble(t, 0.7, 2) });
    const fl = t > 63.64 && t < 63.9 ? 1 - (t - 63.64) / 0.26 : 0; flash.style.opacity = fl * 0.8;
    set(think, { s: pop(t, 64.78, 0.4), o: t < 64.78 || t > 65.5 ? 0 : 1 });
    const kc = p(t, 66.0, 0.45, E.outBack); set(cl.d, { x: (1 - kc) * 600, y: wobble(t, 0.6, 3), o: t < 65.95 ? 0 : 1 });
    face(cl, t, { half: t > 66.5, look: [-5, -1], brow: t > 67.64 ? -6 : 0, seed: 0.2 });
    const ks = p(t, 67.6, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -500, r: -4 + Math.sin(t * 3) * 2, o: t < 67.55 ? 0 : 1 });
    set(yawn, { s: pop(t, 66.6, 0.35), o: t < 66.6 || t > 67.6 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#F1E1BC' });
  const sun = box(cam, 640, 420, 300, 300, { borderRadius: '50%', background: YEL, border: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  const py = mkPyr(cam, [120, 460, 820, 533], { seed: 12 });
  const dunes = box(cam, 0, 0, 1080, 1920); dunes.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-20,990 Q300,950 600,985 T1100,975 L1100,1600 L-20,1600 Z" fill="${NILE}" stroke="${INK}" stroke-width="5"/><path d="M-20,990 Q300,950 600,985 T1100,975 L1100,1600 L-20,1600 Z" fill="url(#hP)"/></svg>`;
  const tu = mk(cam, [40, 800, 380, 486], touristInner(), '0 0 360 460', 'bust'); tu.d.style.zIndex = 5;
  const arm = box(cam, 0, 0, 1080, 1920, { zIndex: 6, transformOrigin: '330px 1160px' });
  arm.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="${limb(330, 1180, 470, 760, 30, 20)}" fill="#F4ECDB" stroke="${INK}" stroke-width="5"/><path d="${limb(330, 1180, 400, 980, 34, 30)}" fill="#7cc3a8" stroke="${INK}" stroke-width="5"/><g transform="translate(440,640) rotate(14) scale(0.55)">${iphoneInner()}</g></svg>`;
  const flash = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 60, opacity: 0 });
  const think = box(cam, 300, 600, 300, 160, { zIndex: 8 });
  think.innerHTML = `<svg width="300" height="160" style="overflow:visible"><circle cx="20" cy="150" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="50" cy="120" r="16" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="170" cy="60" rx="130" ry="58" fill="#fff" stroke="${INK}" stroke-width="5"/><text x="170" y="78" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="48" fill="${INK}">piensa…</text></svg>`;
  const cl = mkCleo(cam, [560, 720, 380, 475]); flipX(cl); cl.d.style.zIndex = 7;
  const yawn = chip(cam, 620, 700, 'qué antigua… 🥱', { size: 34, bg: '#fff', color: INK, z: 9 });
  const sign = box(cam, 520, 470, 420, 260, { zIndex: 9 });
  sign.innerHTML = `<svg width="420" height="260" style="overflow:visible"><path d="M210,150 V300" stroke="${INK}" stroke-width="18"/><path d="M210,150 V300" stroke="${WOOD}" stroke-width="10"/>${cut('<rect x="10" y="10" width="400" height="150" rx="14"/>')}<rect x="10" y="10" width="400" height="150" rx="14" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="24" y="24" width="372" height="122" rx="8" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="8 6"/><text x="210" y="102" text-anchor="middle" font-family="Rye" font-size="52" fill="${RED}">ANTIGÜEDAD</text><path d="M60,130 l-30,0 l12,-10 M30,130 l12,10" stroke="${INK}" stroke-width="4" fill="none"/></svg>`;
}

/* ======================================================================
   K · CTA: comentarios (68.45 – 72.3)  L11 — Vecino a pantalla completa
   ====================================================================== */
headline(68.45, 71.1, '¿Qué dato te ha *roto la cabeza*?', { size: 76, hlT: 69.95 });
headline(71.1, 72.3, 'Te leo en *comentarios*', { size: 84, hlT: 71.79 });
{
  const CM = [];
  const c = scene(68.45, 72.3, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 68.45, 3.8, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < 70.2 ? [0, 0] : [-4, 6], bL: t > 69.9 && t < 70.4 ? 10 : 2, bR: t > 69.9 && t < 70.4 ? 14 : 6, fan: wobble(t, 0.9, 6), noCup: true, seed: 2 });
    set(boom, { s: pop(t, 70.0, 0.35), r: wobble(t, 2, 6), o: t < 70.0 ? 0 : 1 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [190, 390, 620, 768]);
  const boom = el('div', c, { left: '690px', top: '440px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 20, whiteSpace: 'nowrap' }, '¡BUM! 🤯');
  const cms = [['MAM', '@mamut_wrangel', '¿Y los dinosaurios?', 70.3], ['EMU', '@emu_viajero', 'me ha explotado la cabeza 🤯', 70.85], ['CLEO', '@cleo_fan', 'más de estos, porfa', 71.4]];
  cms.forEach((m, i) => {
    const e = box(c, 120 + (i % 2) * 40, 930 + i * 116, 780, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 80, m[0], { bw: 3 });
    el('div', e, { left: '104px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '25px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '104px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    el('div', e, { left: '700px', top: '28px', fontSize: '34px', color: RED }, '♥');
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   L · Y ESTO… NO VENÍA EN EL LIBRO (72.3 – 75.0)  L12
   ====================================================================== */
headline(72.3, 73.7, 'Y esto…', { size: 130, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(73.7, 75.0, '…no venía en el *libro*.', { size: 88, hlT: 74.43 });
{
  const c = scene(72.3, 73.7, t => {
    const k = p(t, 72.3, 1.3, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(73.7, 75.0, t => {
    const k = p(t, 74.0, 0.42, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 74.42;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    face(stand, t, { look: t > 73.9 ? [4, -3] : [-2, 1], brow: t > 74.0 ? -9 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { x: 215 * p(t, 74.42, 0.3, E.outCubic), s: 1.2 * pop(t, 73.71, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 74.43, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${820 + i * 28} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#cleoS" x="250" y="540" width="260" height="325"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="46" fill="${INK}">EGIPTO</text><text x="335" y="772" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">pirámides y faraones</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const stand = mkCleo(bookW, [600, 470, 300, 375]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '540px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
}

/* ======================================================================
   TARJETA FINAL (75.0 – fin) — logo con El Vecino en su óvalo
   ====================================================================== */
{
  const c = scene(75.0, 999, t => {
    set(lt, { s: pop(t, 75.12, 0.45), o: t < 75.12 ? 0 : 1 }); paint(lhl, t, 75.45, 0.4);
    popA(ttl, t, 75.6, { r: -1 }); popA(src, t, 75.85, { rise: 30 });
    set(pk1.d, { y: (1 - p(t, 76.4, 0.45, E.outBack)) * 300, r: -6 + wobble(t, 0.6, 2) }); face(pk1, t, { look: [-3, -2], seed: 2 });
    set(pk2.d, { y: (1 - p(t, 76.6, 0.45, E.outBack)) * 300, r: 4 + wobble(t, 0.5, 2) }); mamPose(pk2, t, { trunk: -60 + Math.sin(t * 6) * 15 });
  }, { cut: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const lt = box(c, 40, 760, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1010px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 1 · Cleopatra y el iPhone');
  const src = el('div', c, { left: '90px', top: '1140px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: cronologías del Antiguo Egipto · Plutarco, <i>Vida de Antonio</i> · estudios sobre los últimos mamuts (isla de Wrangel)');
  const pk1 = mkCleo(c, [70, 1500, 260, 325]); pk1.d.style.zIndex = 2;
  const pk2 = mkMam(c, [620, 1530, 360, 305], 47); pk2.d.style.zIndex = 2;
}
