/* Ep. 17 · escenas L0–L3 (todo clavado por texto vía K) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
const sparkle = (pa, x, y, sz = 60, col = YEL) => el('div', pa, { left: px(x), top: px(y), fontSize: px(sz), lineHeight: 1, color: col, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦');
function loopBadge(pa, n) {
  const d = box(pa, 34, 196, 150, 150, { zIndex: 600 });
  d.innerHTML = `<svg width="150" height="150" style="overflow:visible"><circle cx="81" cy="83" r="66" fill="${SH}"/><circle cx="75" cy="75" r="70" fill="#fff"/><circle cx="75" cy="75" r="62" fill="${YEL}" stroke="${INK}" stroke-width="6"/><text x="75" y="112" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="108" fill="${INK}">${n}</text></svg>`;
  return d;
}
function headlineN(t0, t1, str, o = {}) { headline(t0, t1, str, o); const b = HLS[HLS.length - 1].b; b.style.left = '200px'; b.style.width = '840px'; }
const strikeBar = (pa, col = RED, h = 16) => el('div', pa, { left: '-14px', right: '-14px', top: '52%', height: px(h), background: col, borderRadius: '8px', transformOrigin: 'left center', transform: 'scaleX(0)', zIndex: 5 });

/* ======================================================================
   A · PORTADA / GANCHO — cerebro gigante dormido + batería al 10 % parpadeando
   ====================================================================== */
{
  let ttl, st1, st2, bat, brain, mito, zz, qm, glow, sp;
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.04 * p(t, 0, 4.4, E.linear) });
    set(rayW, { r: t * 9 });
    const awake = t > K.no, lit = t > K.lo0;
    const surpr = t > K.no && t < K.no + 0.7;
    const zt = zonesUntil(t, [K.lo0 + 0.05, K.lo0 + 0.18, K.usas0 + 0.1, K.casi0, K.casi0 + 0.15]);
    const bnc = t > K.cerebro0 && t < K.cerebro0 + 0.5 ? Math.sin((t - K.cerebro0) / 0.5 * Math.PI) * 0.04 : 0;
    set(brain.d, { y: wobble(t, 0.5, 6) - (surpr ? 16 * Math.sin((t - K.no) / 0.7 * Math.PI) : 0), s: 1 + bnc + (lit ? 0.04 * p(t, K.lo0, 0.4, E.outBack) : 0), x: (t < 0.05 || (t > K.no && t < K.no + 0.25)) && t > 0.01 ? Math.sin(t * 50) * 10 : 0 });
    brainFace(brain, t, { half: !awake, look: awake ? (lit ? [0, -4] : [6, 2]) : [0, 4], mouth: surpr ? 'o' : (lit ? 's' : (awake ? 'f' : 'z')), bL: surpr ? 16 : lit ? 8 : 0, bR: surpr ? 16 : lit ? 8 : 0, zones: zt, blush: lit, seed: 0.2, blink: awake });
    // batería: 10 % parpadeando → se llena de golpe
    const kf = p(t, K.lo0 + 0.02, 0.45, E.outCubic);
    const blinkOn = t < K.lo0 ? (((t + 0.6) % 0.6) < 0.38) : true;
    set(bat.fill, { sx: lerp(0.1, 0.96, kf), o: 1 });
    bat.fill.style.background = kf > 0.5 ? YEL : RED;
    bat.lbl.style.opacity = blinkOn ? 1 : 0.15;
    bat.lbl.textContent = t < K.casi0 ? '10 %' : 'CASI TODO';
    bat.lbl.style.fontSize = t < K.casi0 ? '96px' : '74px';
    set(bat.d, { s: (t > K.diez && t < K.ciento0 + 0.3 ? 1 + 0.08 * Math.abs(Math.sin((t - K.diez) * 8)) : 1) * (t > K.casi0 ? 1 + 0.12 * (1 - p(t, K.casi0, 0.3)) : 1), r: -3 + wobble(t, 0.6, 1.2) });
    // zZz
    zz.forEach((z, i) => { const ph = ((t * 0.9 + i / 3) % 1); set(z, { x: ph * 60, y: -ph * 160, o: awake ? 0 : Math.sin(ph * Math.PI), s: 0.6 + ph * 0.6 }); });
    set(qm, { r: Math.sin(t * 3) * 12, y: Math.sin(t * 2.3) * 14, o: lit ? 1 - p(t, K.lo0, 0.2) : 1 });
    // destellos + aura al encenderse
    set(glow, { o: p(t, K.lo0, 0.4), r: -t * 14, s: 0.9 + 0.1 * Math.sin(t * 6) });
    sp.forEach((q, i) => { const t0 = K.lo0 + 0.1 + i * 0.12; set(q, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 140, o: t < t0 ? 0 : 1 }); });
    // titular-portada: tachones cuando la voz lo desmiente
    st1.style.transform = `scaleX(${f1(p(t, K.lo0, 0.25, E.outCubic) * 100) / 100}) rotate(-3deg)`;
    st2.style.transform = `scaleX(${f1(p(t, K.usas0, 0.25, E.outCubic) * 100) / 100}) rotate(-2deg)`;
    set(ttl, { y: wobble(t, 0.4, 2) });
    stampA(mito, t, K.todo0, -9, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 46%, rgba(255,62,165,.22), rgba(255,62,165,0) 60%)' });
  const rayW = rays(cam, -170, 150, 1420, 26, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  glow = rays(cam, 140, 440, 800, 18, 'rgba(255,230,0,.75)', 'rgba(0,0,0,0)', 1); glow.style.borderRadius = '50%'; glow.style.overflow = 'hidden';
  brain = mkBrain(cam, [60, 450, 960, 800]); brain.d.style.zIndex = 4; brain.d.style.transformOrigin = '540px 820px';
  bat = battery(cam, 300, 1110, 440, 170, { label: '10 %', fs: 96 });
  zz = [0, 1, 2].map(i => el('div', cam, { left: '760px', top: '560px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(70 + i * 10), color: INK, zIndex: 8 }, 'z'));
  qm = qMark(cam, 880, 430, 170);
  sp = [[150, 520], [860, 560], [110, 900], [880, 930], [520, 420]].map(([x, y]) => sparkle(cam, x, y, 70));
  ttl = el('div', cam, { left: '30px', top: '160px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.02, color: INK, zIndex: 50, textShadow: '4px 4px 0 rgba(255,255,255,.7)' });
  ttl.innerHTML = `¿Usas <span class="w1" style="position:relative;display:inline-block">solo</span> el<br><span class="w2" style="position:relative;display:inline-block">${hlSpan('<i>10 %</i>', 'th')}</span> de tu cerebro?`;
  ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  st1 = strikeBar(ttl.querySelector('.w1')); st2 = strikeBar(ttl.querySelector('.w2'));
  mito = stamp(cam, 250, 640, 'MITO', { size: 230, bw: 20, z: 70, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   B · PELÍCULAS Y PROFESORES → NADIE LO HA DEMOSTRADO (carpeta vacía)
   ====================================================================== */
headline(S.B[0], K.nadie1 - 0.1, 'Te lo dijeron *películas* y *profesores*', { size: 78 });
headline(K.nadie1 - 0.1, S.B[1], '*Nadie* ha demostrado nunca lo contrario', { size: 76 });
{
  const c = scene(S.B[0], S.B[1], t => {
    const up = p(t, K.nadie1 - 0.2, 0.4, E.inOutCubic);
    set(top, { s: lerp(1, 0.6, up), y: lerp(0, 30, up) });
    set(cl.d, { s: pop(t, S.B[0] + 0.05, 0.4), r: -5 + wobble(t, 0.6, 1.5), o: 1 });
    const kc = p(t, K.peliculas - 0.25, 0.2, E.inCubic);
    set(cl.arm, { r: t < K.peliculas - 0.25 ? -28 + Math.sin(t * 5) * 3 : lerp(-28, 0, kc) });
    set(bd, { s: pop(t, K.profes - 0.15, 0.4), r: 3, o: t < K.profes - 0.15 ? 0 : 1 });
    set(prof.d, { y: wobble(t, 0.6, 3), s: pop(t, K.profes - 0.05, 0.4), o: t < K.profes - 0.05 ? 0 : 1 });
    face(prof, t, { look: t > K.profes + 0.3 ? [-6, 0] : [0, 0], jaw: t > K.profes && t < K.profesE ? Math.abs(Math.sin(t * 14)) * 0.4 : 0, seed: 1.4 });
    set(ptr, { r: -38 + (t > K.profes && t < K.profes + 0.9 ? Math.sin(t * 14) * 6 : 0), o: t < K.profes - 0.05 ? 0 : 1 });
    popA(ch1, t, K.peliculas + 0.05, { r: -5 }); popA(ch2, t, K.profes + 0.05, { r: 4 });
    ch1.style.opacity = t < K.peliculas + 0.05 ? 0 : 1 - up; ch2.style.opacity = t < K.profes + 0.05 ? 0 : 1 - up;
    // carpeta de pruebas → vacía
    set(fd.d, { y: (1 - p(t, K.nadie1 - 0.05, 0.45, E.outBack)) * 1100, r: -2 + wobble(t, 0.5, 1), o: t < K.nadie1 - 0.05 ? 0 : 1 });
    const ko = p(t, K.demostrado - 0.05, 0.35, E.inOutCubic);
    set(fd.flap, { sy: lerp(1, -0.28, ko) });
    fd.flap.style.filter = ko > 0.5 ? 'brightness(.8)' : 'none';
    const km = clamp((t - K.demostrado - 0.15) / 1.6);
    set(moth, { x: Math.sin(km * 9) * 90 + km * 120, y: -km * 420, r: Math.sin(t * 7) * 18, s: 0.4 + 0.6 * clamp(km * 4), o: t < K.demostrado + 0.15 ? 0 : 1 });
    const fl = Math.abs(Math.sin(t * 30)); moth.querySelector('.wl').setAttribute('transform', `scale(${f1(0.35 + 0.65 * fl * 100) / 100} 1)`); moth.querySelector('.wr').setAttribute('transform', `scale(${f1(0.35 + 0.65 * fl * 100) / 100} 1)`);
    popA(emp, t, K.demostrado + 0.25, { r: 6 });
    stampA(sp, t, K.nunca1, -8, 1);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const top = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 420px' });
  const cl = clapper(top, 70, 470, 440);
  chalk(cl.d, 60, 200, '10 %', 120, { zIndex: 4 });
  const bd = box(top, 540, 440, 480, 400, { zIndex: 5 });
  chalkboard(bd, 0, 0, 480, 400, 2);
  chalk(bd, 70, 90, '10 %', 150, { zIndex: 6 });
  chalk(bd, 70, 260, 'del cerebro', 60, { zIndex: 6, opacity: .8 });
  const ptr = box(top, 560, 700, 360, 20, { zIndex: 7, background: WOOD, border: `4px solid ${INK}`, borderRadius: '8px', transformOrigin: '100% 50%' });
  const prof = mk(top, [700, 690, 260, 332], bustInner({ uniform: 'soldier', beard: true, seed: 33 }) + coatOver('#3a2f26') + specsOver(), '0 0 360 460', 'bust'); prof.d.style.zIndex = 8;
  const ch1 = chip(top, 140, 860, 'películas', { size: 50, bg: PINK });
  const ch2 = chip(top, 560, 860, 'profesores', { size: 50, bg: INK, color: YEL });
  const fd = folder(c, 300, 720, 520, 420);
  const moth = box(c, 500, 820, 130, 90, { zIndex: 12 }); moth.innerHTML = mothSvg();
  const emp = chip(c, 600, 1110, 'vacía', { size: 46, bg: '#fff', color: INK, z: 14 });
  const sp = stamp(c, 130, 840, 'SIN PRUEBAS', { size: 104, bw: 15, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   C1 · TE ESCANEAN UN DÍA ENTERO — anillo de escáner + reloj de un día
   ====================================================================== */
headlineN(S.C1[0], S.C1[1], 'Te *escanean* un día entero', { size: 84, hlT: K.escanean });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(ring, { s: pop(t, S.C1[0] + 0.02, 0.45), r: t * 6, o: 1 });
    const kin = p(t, S.C1[0] + 0.1, 0.6, E.outBack);
    set(brain.d, { x: (1 - kin) * -800, y: wobble(t, 0.5, 4) });
    const sy = Math.sin((t - K.escanean) * 3.6);
    set(beam, { y: sy * 230, o: t > K.escanean - 0.1 ? 0.9 : 0 });
    brainFace(brain, t, { look: [0, f1(sy * 6)], bL: 6, bR: 6, mouth: t > K.escanean ? 'o' : 's', seed: 0.8 });
    const kc = pop(t, K.dia - 0.1, 0.4);
    set(clk, { s: kc, r: -6, o: t < K.dia - 0.1 ? 0 : 1 });
    set(hand, { r: t < K.dia ? 0 : (t - K.dia) * 900 });
    popA(dch, t, K.entero2, { r: 5 });
    set(tag, { s: pop(t, K.escanean, 0.35), r: -4, o: t < K.escanean ? 0 : 1 });
  });
  sceneBg(c, { background: '#DCE3DA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  const ring = box(c, 220, 500, 640, 640, { zIndex: 6 }); ring.innerHTML = scannerRing(640);
  const brain = mkBrain(c, [270, 650, 540, 450]); brain.d.style.zIndex = 4;
  const beam = box(c, 250, 800, 580, 40, { zIndex: 5, background: 'linear-gradient(180deg, rgba(255,62,165,0), rgba(255,62,165,.75), rgba(255,62,165,0))', borderTop: `3px solid ${PINK}` });
  const clk = box(c, 740, 400, 260, 260, { zIndex: 10 }); clk.innerHTML = clockSvg(260);
  const hand = box(clk, 0, 0, 260, 260, { zIndex: 2 }); hand.innerHTML = handSvg(260);
  const dch = chip(c, 690, 680, 'día y noche', { size: 40, bg: INK, color: YEL, z: 20 });
  const tag = el('div', c, { left: '420px', top: '1150px', fontFamily: 'Rye', fontSize: '50px', color: YEL, background: INK, padding: '4px 26px 8px', borderRadius: '10px', border: `4px solid ${BRASS}`, zIndex: 12 }, 'ESCÁNER');
}

/* ======================================================================
   C2 · SE VAN ENCENDIENDO LAS ZONAS — ver / moverte / recordar
   ====================================================================== */
headlineN(S.C2[0], K.unas - 0.08, 'Se van *encendiendo* todas las zonas', { size: 76, hlT: K.encend });
headlineN(K.unas - 0.08, S.C2[1], 'Para *ver,* *moverte,* *recordar*', { size: 84 });
{
  const LB = [];
  const c = scene(S.C2[0], S.C2[1], t => {
    const zz = K.unas - 0.1;
    set(cam, { s: 1 + 0.05 * p(t, zz, 0.5, E.inOutCubic), y: 20 * p(t, zz, 0.5, E.inOutCubic) });
    const zt = zonesUntil(t, [K.practic + 0.35, K.encend, K.todas, K.practic, K.zonas]);
    set(brain.d, { y: wobble(t, 0.5, 4), s: 1 + 0.03 * p(t, K.encend, 2.4, E.linear) });
    brainFace(brain, t, { zones: zt, look: t > K.otras2 ? [6, 6] : t > K.otras1 ? [0, -8] : t > K.unas ? [-8, 0] : [0, -3], bL: 8, bR: 8, blush: t > K.zonas, mouth: 's', seed: 0.5 });
    SPK.forEach((q, i) => { const t0 = [K.encend, K.practic, K.practic + 0.35, K.todas, K.zonas][i]; set(q, { s: pop(t, t0, 0.3) * (1 - p(t, t0 + 0.6, 0.3)), r: t * 160, o: t < t0 ? 0 : 1 }); });
    set(clk, { r: -6, s: 1, o: 1 }); set(hand, { r: (t - S.C2[0]) * 900 + 300 });
    LB.forEach(q => { popA(q.e, t, q.t, { r: q.r }); q.a.style.opacity = t > q.t + 0.1 ? 1 : 0; q.a.style.clipPath = `inset(0 ${f1((1 - p(t, q.t + 0.1, 0.25)) * 100)}% 0 0)`; });
  }, { clip: true });
  sceneBg(c, { background: '#DCE3DA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  const brain = mkBrain(cam, [150, 500, 780, 650]); brain.d.style.zIndex = 4;
  const SPK = [[520, 470], [820, 600], [200, 600], [600, 980], [330, 470]].map(([x, y]) => sparkle(cam, x, y, 70));
  const clk = box(cam, 850, 420, 170, 170, { zIndex: 10 }); clk.innerHTML = clockSvg(170);
  const hand = box(clk, 0, 0, 170, 170, { zIndex: 2 }); hand.innerHTML = handSvg(170);
  // etiquetas con flecha (zona en coordenadas de escena: x=150+vx*1.3, y=500+vy*1.3)
  [['👁 ver', 60, 450, K.ver, -4, 'M120,90 C150,170 200,220 250,270'],
   ['🏃 moverte', 610, 440, K.moverte, 4, 'M40,90 C10,140 -40,160 -80,190'],
   ['💭 recordar', 520, 1170, K.recordar, -3, 'M120,0 C110,-60 90,-110 70,-150']].forEach(([txt, x, y, t0, r, d]) => {
    const a = box(cam, x, y, 300, 300, { zIndex: 18 }); a.innerHTML = arrowSvg(d, PINK, 9);
    const e = chip(cam, x, y, txt, { size: 54, bg: '#fff', color: INK, z: 20 });
    LB.push({ e, a, t: t0, r });
  });
}

/* ======================================================================
   D1 · UNA PRUEBA MÁS FÁCIL — ¿y si tuvieras un 90 % sin usar?
   ====================================================================== */
headlineN(S.D1[0], K.si3 - 0.05, 'Una prueba más *fácil*', { size: 92, hlT: K.facil });
headlineN(K.si3 - 0.05, S.D2[0], 'Si tuvieras un *90 %* sin usar…', { size: 80, hlT: K.noventa });
headlineN(S.D2[0], S.D2[1], 'Una lesión pequeña no te haría *nada*', { size: 76, hlT: K.nada });
function deadW(f, frac) { f.dead.querySelectorAll('rect').forEach(r => r.setAttribute('width', f1(600 * frac))); }
{
  const c = scene(S.D1[0], S.D3[1], t => {
    const dk = t < K.noventa ? 0 : p(t, K.noventa, 0.5, E.outCubic);
    const undo = p(t, K.noes, 0.35, E.inOutCubic);
    deadW(brain, 0.86 * dk * (1 - undo));
    const hit = t > K.lesion && t < K.lesion + 0.3;
    set(brain.d, { y: wobble(t, 0.5, 4), x: hit ? Math.sin(t * 60) * 6 : 0 });
    const hyp = t > K.noventa && t < K.noes;
    brainFace(brain, t, { dead: t < K.noventa ? 0 : 1, half: hyp && t < K.lesion, look: t > K.lesion && t < K.nada ? [-10, -6] : [0, 2], mouth: t > K.nada - 0.1 && t < K.noes ? 'f' : (t > K.noes ? 's' : (hyp ? 'f' : 's')), bL: t > K.nada - 0.1 && t < K.noes ? 14 : 4, bR: t > K.nada - 0.1 && t < K.noes ? 2 : 4, zones: t > K.noes ? zonesUntil(t, [K.noes, K.noes + 0.08, K.noes + 0.16, K.noes + 0.24, K.noes + 0.32]) : [0, 0, 0, 0, 0], seed: 1.3 });
    popA(lab, t, K.prueba, { r: -4 }); lab.style.opacity = t < K.prueba ? 0 : 1 - p(t, K.si3, 0.2);
    popA(ys, t, K.si3, { r: -6 });
    // etiqueta «90 % sin usar» (se tacha en «no es así»)
    const kl = p(t, K.noventa, 0.18, E.outCubic);
    set(nl, { s: t < K.noventa ? 0 : lerp(1.8, 1, kl) * (1 + 0.15 * undo), r: -6, o: t < K.noventa ? 0 : 1, y: -undo * 60 });
    nStk.style.transform = `scaleX(${f1(p(t, K.noes, 0.3, E.outCubic) * 100) / 100}) rotate(-4deg)`;
    set(web, { s: pop(t, K.usar, 0.4), o: t < K.usar ? 0 : 1 - undo, r: -8 });
    // rayo pequeño
    const kb = p(t, K.lesion - 0.1, 0.15, E.inCubic);
    set(bolt, { y: lerp(-500, 0, kb), o: t < K.lesion - 0.1 || t > K.lesion + 0.6 ? 0 : 1, s: 1 });
    set(fl, { s: pop(t, K.lesion, 0.3), o: t < K.lesion || t > K.lesion + 0.5 ? 0 : 1 - p(t, K.lesion + 0.2, 0.3) });
    set(dot, { o: t > K.lesion && t < K.noes ? 1 : 0, s: pop(t, K.lesion, 0.3) });
    popA(pq, t, K.pequena, { r: 4 }); pq.style.opacity = t < K.pequena ? 0 : 1 - p(t, K.noes, 0.2);
    set(nb, { s: pop(t, K.nada, 0.35), r: -3, o: t < K.nada ? 0 : 1 - p(t, K.yno, 0.2) });
    stampA(fx, t, K.asi - 0.05, -8, 1);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const brain = mkBrain(c, [150, 520, 780, 650]); brain.d.style.zIndex = 4;
  const lab = chip(c, 340, 450, '🧪 prueba fácil', { size: 50, bg: INK, color: YEL, z: 20 });
  const ys = chip(c, 640, 450, '¿Y si…?', { size: 54, bg: PINK, z: 20 });
  const nl = el('div', c, { left: '170px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: '#fff', background: 'rgba(43,33,24,.85)', padding: '10px 30px 18px', border: `6px dashed #fff`, borderRadius: '20px', zIndex: 30, whiteSpace: 'nowrap' }, '90 % sin usar');
  const nStk = strikeBar(nl, RED, 22);
  const web = box(c, 170, 520, 190, 190, { zIndex: 6 });
  web.innerHTML = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible">${[0, 1, 2, 3, 4, 5].map(k => `<path d="M0,0 L${f1(Math.cos(k * 0.3) * 100)},${f1(Math.sin(k * 0.3) * 100)}" stroke="#fff" stroke-width="2.5"/>`).join('')}${[25, 50, 75].map(r => `<path d="M${r},0 ${[1, 2, 3, 4, 5].map(k => `Q${f1(Math.cos((k - 0.5) * 0.3) * r * 0.8)},${f1(Math.sin((k - 0.5) * 0.3) * r * 0.8)} ${f1(Math.cos(k * 0.3) * r)},${f1(Math.sin(k * 0.3) * r)}`).join(' ')}" stroke="#fff" stroke-width="2.5" fill="none"/>`).join('')}</svg>`;
  const bolt = box(c, 420, 560, 90, 150, { zIndex: 20 }); bolt.innerHTML = boltSvg();
  const fl = box(c, 380, 640, 170, 170, { zIndex: 19, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0 30%, rgba(255,230,0,.8) 40%, rgba(255,230,0,0) 70%)' });
  const dot = box(c, 445, 705, 40, 40, { zIndex: 7, borderRadius: '50%', background: RED, border: `4px solid ${INK}` });
  const pq = chip(c, 520, 600, 'lesión pequeña', { size: 42, bg: '#fff', color: INK, z: 22 });
  const nb = el('div', c, { left: '560px', top: '1000px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '64px', color: INK, background: '#fff', border: `5px solid ${INK}`, borderRadius: '40px 40px 10px 40px', padding: '4px 30px 12px', boxShadow: `6px 7px 0 ${SH}`, zIndex: 30, whiteSpace: 'nowrap' }, '¿Nada? 🤷');
  const fx = stamp(c, 300, 1000, 'NO ES ASÍ', { size: 100, bw: 13, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}
headline(S.D3[0], S.D3[1], 'Y *no* es así', { size: 120, hlT: K.noes, hlc: '#ff9aa8' });

/* ======================================================================
   HIT 1 · GOLPE ROSA: CASI CUALQUIER DAÑO… SE NOTA
   ====================================================================== */
colorHit(S.HIT1[0], S.HIT1[1], PINK, c => {
  const top = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, zIndex: 8 }, 'Casi cualquier daño…');
  const br = mkBrain(c, [190, 400, 700, 583]); br.d.style.zIndex = 4;
  const bolt = box(c, 380, 330, 110, 180, { zIndex: 9 }); bolt.innerHTML = boltSvg();
  const big = el('div', c, { left: 0, top: '980px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '250px', color: '#fff', zIndex: 9 }, 'SE NOTA');
  const ST = [[200, 430], [760, 470], [180, 760], [800, 760]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 10 }, '✶'));
  const ay = el('div', c, { left: '720px', top: '440px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: '#fff', textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 12 }, '¡ay!');
  return t => {
    popA(top, t, S.HIT1[0] + 0.02, { rise: 30 });
    const kb = p(t, K.dano - 0.12, 0.12, E.inCubic);
    set(bolt, { y: lerp(-400, 0, kb), o: t < K.dano - 0.12 || t > K.dano + 0.35 ? 0 : 1 });
    const hurt = t > K.dano;
    set(br.d, { x: hurt && t < K.dano + 0.4 ? Math.sin(t * 60) * 10 : 0, y: wobble(t, 0.6, 4), r: hurt ? -4 : 0 });
    brainFace(br, t, { closed: hurt, blink: !hurt, mouth: hurt ? 'z' : 'o', band: t > K.dano + 0.15, sweat: hurt, bL: hurt ? -6 : 10, bR: hurt ? -6 : 10, seed: 0.9 });
    ST.forEach((s, i) => { const a = t * 5 + i * 1.6; set(s, { x: Math.cos(a) * 20, y: Math.sin(a) * 14, o: hurt ? 1 : 0, r: t * 200, s: pop(t, K.dano + i * 0.05, 0.3) }); });
    popA(ay, t, K.dano + 0.1, { r: 8 });
    const kn = p(t, K.nota - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.nota - 0.02 ? 0 : lerp(1.6, 1, kn), r: -4, o: t < K.nota - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.nota, 0.3) ? glitch(t, K.nota, 0.3) + ', ' : '') + `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
  };
});
