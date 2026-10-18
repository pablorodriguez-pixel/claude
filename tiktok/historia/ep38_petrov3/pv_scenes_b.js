/* Ep. 38 · escenas L5–L10 (todo clavado por texto vía K) */

/* ======================================================================
   CH2 · CAPÍTULO 2 · LA DECISIÓN
   ====================================================================== */
stepBanner(K.dos - 0.05, S.CH2[1] - 0.36, S.F2b[1], '2', 'La decisión', { nbg: '#2f3550' });
chapter(S.CH2[0], S.CH2[1], PINK, '2', c => {
  const ph = mk(c, [330, 1060, 420, 300], phoneInner(), '0 0 420 300', 'phone'); ph.d.style.zIndex = 5;
  return t => set(ph.d, { s: pop(t, S.CH2[0] + 0.15, 0.35), r: Math.sin(t * 40) * 3 });
});

/* ======================================================================
   D1 · «SI AVISABA A SUS JEFES,» — Petrov al teléfono → tres jefes
   ====================================================================== */
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(pv.d, { y: wobble(t, 0.6, 3) });
    const ka = p(t, K.avisaba - 0.05, 0.6, E.inOutCubic);
    set(av, { x: lerp(0, 380, ka), y: -Math.sin(ka * Math.PI) * 140, s: t < K.avisaba - 0.05 ? 0 : 1, r: -6 + Math.sin(t * 8) * 4 });
    BS.forEach((b, i) => { set(b.d, { s: pop(t, S.D1[0] + 0.1 + i * 0.12, 0.3), y: wobble(t, 0.5, 3, i) }); face(b, t, { look: [-8, 0], bL: -4, bR: -4, seed: i + 0.3 }); });
    popA(chJ, t, S.D1[0] + 0.15, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  box(c, 540, 0, 540, 1920, { zIndex: 0, background: '#C9D3D8' });
  const pv = mk(c, [40, 640, 460, 588], silPhoneInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 4;
  const av = bubble(c, 140, 520, '¡AVISO!', { size: 62, tail: 'bl', z: 40, bg: YEL });
  const BS = [[600, 700, 300], [720, 560, 220], [560, 520, 200]].reverse().map(([x, y, w], i) => { const b = mk(c, [x, y, w, f1(w * 1.28)], bossInner(), '0 0 360 460', 'bust'); b.d.style.zIndex = 3 + i; return b; });
  const chJ = chip(c, 600, 1110, 'sus jefes', { size: 60, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   D2 · «PODÍAN RESPONDER CON UN ATAQUE NUCLEAR.» — el botón rojo y una mano que no es la suya
   ====================================================================== */
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(bt.d, { s: pop(t, S.D2[0] + 0.02, 0.35), y: wobble(t, 0.5, 2), o: 1 });
    const kh = p(t, K.responder - 0.1, 0.5, E.outCubic), kp = p(t, K.nuclear5 - 0.1, 0.3, E.inCubic);
    set(hand, { y: lerp(-420, -150, kh) + kp * 40 + (t > K.nuclear5 + 0.2 ? Math.sin(t * 40) * 1.5 : 0) });
    set(pulse, { o: t > K.ataque5 ? (blink2(t) ? 0.8 : 0.25) : 0 });
    stampA(stR, t, K.responder, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  rays(c, -160, 300, 1400, 24, 'rgba(224,32,47,.18)', 'rgba(0,0,0,0)', 1);
  const pulse = box(c, 0, 0, 1080, 1920, { zIndex: 2, background: 'radial-gradient(circle at 50% 60%, rgba(224,32,47,.7), rgba(224,32,47,0) 55%)' });
  const bt = mk(c, [250, 700, 580, 580], buttonInner(), '0 0 360 360', 'btn'); bt.d.style.zIndex = 4;
  const hand = box(c, 440, 400, 200, 560, { zIndex: 6 }); hand.innerHTML = svgW(sleeveHand(), '0 0 200 560');
  const stR = stamp(c, 150, 380, 'RESPUESTA<br>NUCLEAR', { size: 104, bw: 14, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' }); stR.style.textAlign = 'center';
}

/* ======================================================================
   D3 · «Y PENSÓ: SI ESTADOS UNIDOS ATACA DE VERDAD,» — Petrov piensa; en la nube, el cielo se llena
   ====================================================================== */
{
  const RK = [];
  const c = scene(S.D3[0], S.D3[1], t => {
    set(pv.d, { s: 1 + 0.05 * p(t, S.D3[0], 1, E.outCubic), y: wobble(t, 0.6, 2) });
    face(pv, t, { look: [-6, -8], bL: 10, bR: 16, blink: false, seed: 0.9 });
    set(th, { s: pop(t, K.penso - 0.05, 0.4), o: t < K.penso - 0.05 ? 0 : 1 });
    RK.forEach(q => set(q.e, { s: pop(t, q.t, 0.2) * q.s, r: q.r, o: t < q.t ? 0 : 1, y: t > q.t ? -(t - q.t) * 30 : 0 }));
    popA(lbV, t, K.verdad5 - 0.05, { r: -4 });
    set(dr, { y: (t - S.D3[0]) * 90, o: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 70% 80%, rgba(255,40,40,.5), rgba(200,16,46,0) 60%)' });
  const pv = mk(c, [420, 820, 520, 664], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const dr = el('div', c, { left: '870px', top: '960px', zIndex: 6 }, `<svg width="40" height="60" style="overflow:visible"><path d="M20,0 C30,20 40,34 40,44 A20,20 0 0,1 0,44 C0,34 10,20 20,0 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/></svg>`);
  const th = box(c, 60, 330, 900, 560, { zIndex: 6, overflow: 'visible' });
  th.innerHTML = `<svg width="900" height="560" style="overflow:visible"><circle cx="560" cy="560" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="520" cy="500" r="30" fill="#fff" stroke="${INK}" stroke-width="5"/>${cut('<ellipse cx="420" cy="240" rx="410" ry="220"/>')}<ellipse cx="420" cy="240" rx="410" ry="220" fill="#C9D3D8" stroke="${INK}" stroke-width="7"/></svg>`;
  const r = rng(38);
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); const e = box(th, f1(400 + Math.cos(a) * d * 330), f1(200 + Math.sin(a) * d * 150), 30, 80, { zIndex: 4 }); e.innerHTML = rocketSvg(); RK.push({ e, t: K.estados5 + r() * (K.verdad5 + 0.3 - K.estados5), s: 0.6 + r() * 0.5, r: (r() - 0.5) * 30 }); }
  const lbV = stamp(th, 230, 330, 'DE VERDAD', { size: 74, bw: 10, z: 20, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   D4a · «NO MANDA CINCO MISILES.» — LA PANTALLA: solo 5
   D4b · «MANDA CIENTOS.» — al lado, DE VERDAD: cientos
   ====================================================================== */
const panelF = (c, x, lab, bg, w = 460) => { const d = box(c, x, 400, w, 860, { zIndex: 2 }); d.innerHTML = `<svg width="${w}" height="860" style="overflow:visible">${cut(`<rect x="0" y="0" width="${w}" height="860" rx="26"/>`)}<rect x="0" y="0" width="${w}" height="860" rx="26" fill="${bg}" stroke="${INK}" stroke-width="7"/><rect x="0" y="0" width="${w}" height="860" rx="26" fill="url(#hP)" opacity=".4"/><path d="M30,760 Q120,720 230,750 T${w - 30},740 L${w - 30},830 L30,830 Z" fill="#B9C79A" stroke="${INK}" stroke-width="5"/></svg>`; el('div', d, { left: 0, top: '22px', width: px(w), textAlign: 'center', fontFamily: 'Rye', fontSize: '46px', color: INK, zIndex: 3 }, lab); return d; };
{
  const R5 = [];
  const c = scene(S.D4a[0], S.D4a[1], t => {
    popA(pR, t, S.D4a[0] + 0.02, { r: 1.5 });
    R5.forEach(q => set(q.e, { s: pop(t, q.t, 0.25) * 1.5, r: q.r, o: t < q.t ? 0 : 1, y: t > q.t ? -(t - q.t) * 20 : 0 }));
    stampA(st5, t, K.cinco5, -8, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  const pR = panelF(c, 190, 'LA PANTALLA', '#E9C6BE', 700);
  [[200, 380], [330, 300], [460, 380], [260, 560], [420, 560]].forEach((q, i) => { const e = box(pR, q[0], q[1], 40, 106, { zIndex: 4 }); e.innerHTML = rocketSvg(); R5.push({ e, t: K.manda5 + i * 0.07, r: (i - 2) * 6 }); });
  const st5 = stamp(pR, 250, 640, 'SOLO 5', { size: 110, bw: 13, z: 20, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); st5.style.fontWeight = 900;
}
{
  const RK = [], R5 = [];
  const c = scene(S.D4b[0], S.D4b[1], t => {
    popA(pL, t, S.D4b[0] + 0.02, { r: -1.5 }); set(pR, { r: 1.5 });
    RK.forEach(q => set(q.e, { s: pop(t, q.t, 0.2) * q.s, r: q.r, o: t < q.t ? 0 : 1, y: t > q.t ? -(t - q.t) * 30 : 0 }));
    stampA(lC, t, K.cientos, -5, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  const pL = panelF(c, 60, 'DE VERDAD', '#C9D3D8'), pR = panelF(c, 560, 'LA PANTALLA', '#E9C6BE', 360);
  const r = rng(31);
  for (let i = 0; i < 64; i++) { const e = box(pL, 20 + r() * 400, 100 + r() * 600, 30, 80, { zIndex: 4 }); e.innerHTML = rocketSvg(); RK.push({ e, t: K.manda5b + r() * (K.cientos + 0.3 - K.manda5b), s: 0.6 + r() * 0.5, r: (r() - 0.5) * 30 }); }
  [[90, 340], [200, 280], [150, 470], [60, 560], [240, 540]].forEach((q, i) => { const e = box(pR, q[0], q[1], 36, 96, { zIndex: 4 }); e.innerHTML = rocketSvg(); R5.push(e); set(e, { r: (i - 2) * 6, s: 1.2 }); });
  const lC = stamp(pL, 40, 380, 'CIENTOS', { size: 80, bw: 10, z: 20, bg: 'rgba(255,255,255,.94)', blend: 'normal', col: INK });
  const s5 = stamp(pR, 70, 640, '5', { size: 150, bw: 13, z: 20, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); s5.style.fontWeight = 900; set(s5, { r: -8 });
}

/* ======================================================================
   F2a · «ASÍ QUE COGIÓ EL TELÉFONO Y DIJO:» — el auricular sube
   F2b · «"ES UNA FALSA ALARMA".» — el bocadillo palabra a palabra; la pantalla se apaga
   ====================================================================== */
function phoneRig(c, crtY = 300) {
  const crt = mkCRT(c, 150, crtY, 780, 600, { z: 4, size: 170 });
  const desk = box(c, 0, 1180, 1080, 300, { zIndex: 5, background: '#6b5640', borderTop: `7px solid ${INK}` }); void desk;
  const ph = mk(c, [330, 960, 420, 300], phoneInner(), '0 0 420 300', 'phone'); ph.d.style.zIndex = 6;
  const cord = box(c, 0, 0, 1080, 1920, { zIndex: 7 }); cord.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="" stroke="${INK}" stroke-width="7" fill="none" stroke-dasharray="3 6"/></svg>`;
  const cordP = cord.querySelector('path');
  const rc = box(c, 400, 930, 300, 120, { zIndex: 8 }); rc.innerHTML = receiverSvg();
  const gh = box(c, 480, 900, 130, 130, { zIndex: 9 }); gh.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 90, 1.25)}</svg>`;
  return { crt, rc, gh, cordP, lift(kr) { set(rc, { y: -kr * 130, x: -kr * 250, r: -kr * 28 }); set(gh, { o: kr > 0.05 ? 1 : 0, y: -kr * 130, x: -kr * 250, r: -kr * 28 }); cordP.setAttribute('d', `M690,1150 C${f1(760 - kr * 100)},${f1(1200 - kr * 40)} ${f1(700 - kr * 200)},${f1(1080 - kr * 60)} ${f1(560 - kr * 250)},${f1(1000 - kr * 130)}`); } };
}
{
  const c = scene(S.F2a[0], S.F2a[1], t => {
    crtState(R.crt, t, 'red');
    R.lift(p(t, K.cogio - 0.02, 0.4, E.outBack));
    set(R.crt.d, { y: wobble(t, 0.5, 2) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 3px, transparent 3px 120px)' });
  const R = phoneRig(c);
}
{
  const c = scene(S.F2b[0], S.F2b[1], t => {
    const off = t > K.alarma6 + 0.05;
    crtState(crt, t, off ? 'off' : 'red');
    set(offT, { o: off ? 1 : 0 });
    set(bb, { s: pop(t, K.es6 - 0.05, 0.3), r: -2, o: t < K.es6 - 0.05 ? 0 : 1 });
    BW.forEach(w => set(w.e, { o: t >= w.t - 0.04 ? 1 : 0, y: (1 - p(t, w.t - 0.04, 0.2, E.outBack)) * 20 }));
    stampA(stF, t, K.falsa, -6, 1);
    set(sl.d, { y: wobble(t, 0.5, 3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  const crt = mkCRT(c, 220, 380, 640, 500, { z: 4, size: 150 });
  const offT = el('div', crt.scr, { left: 0, top: '140px', width: px(crt.sw), textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '54px', color: '#9fb8a8', zIndex: 6 }, '— apagado —');
  const sl = mk(c, [60, 900, 380, 486], silPhoneInner(), '0 0 360 460', 'bust'); sl.d.style.zIndex = 5;
  const bb = bubble(c, 300, 940, '', { size: 70, tail: 'l', z: 40, bg: '#fff', it: true });
  const BW = [];
  [['«Es', K.es6], ['una', K.una6], ['falsa', K.falsa], ['alarma»', K.alarma6]].forEach(([s, tt], i) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.1em'; e.textContent = s; bb.insertBefore(e, bb.lastChild); if (i === 1) bb.insertBefore(document.createElement('br'), bb.lastChild); BW.push({ e, t: tt }); });
  const stF = stamp(c, 260, 560, 'FALSA ALARMA', { size: 96, bw: 14, z: 41, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); stF.style.fontWeight = 900;
}

/* ======================================================================
   CH3 · CAPÍTULO 3 · ERA EL SOL — y el sello «¡TENÍA RAZÓN!»
   ====================================================================== */
stepBanner(K.tres7 - 0.05, K.razon - 0.2, S.T2[1], '3', 'Era el sol', { nbg: '#C9A24A' });
chapter(S.CH3[0], S.CH3[1], YEL, '3', c => {
  const st = stamp(c, 150, 1060, '¡TENÍA RAZÓN!', { size: 86, bw: 12, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal', col: INK, font: 'Playfair' }); st.style.fontWeight = 900;
  const ck = box(c, 400, 440, 280, 280, { zIndex: 12 }); ck.innerHTML = `<svg viewBox="0 0 100 100" width="280" height="280" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="${INK}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  return t => { stampA(st, t, K.tenia, -4, 1); set(ck, { s: pop(t, K.razon, 0.3), r: -8, o: t < K.razon ? 0 : 1 }); };
});

/* ======================================================================
   T1 · «ERA EL SOL, REFLEJADO EN LAS NUBES,» — el sol guiña; el rayo rebota en la nube y sube al satélite
   ====================================================================== */
{
  const c = scene(S.T1[0], S.T1[1], t => {
    set(sun.d, { s: pop(t, S.T1[0] + 0.02, 0.4), r: t * 8, o: 1 });
    const wk = t > K.sol && t < K.sol + 0.45;
    sun.d.querySelector('.eyeR').style.opacity = wk ? 0 : 1; sun.d.querySelector('.wink').style.opacity = wk ? 1 : 0;
    set(cl, { x: Math.sin(t * 0.8) * 10 });
    const k1 = p(t, K.reflejado - 0.05, 0.45, E.inOutCubic), k2 = p(t, K.nubes + 0.05, 0.5, E.inOutCubic);
    ray1.style.strokeDashoffset = f1(1000 * (1 - k1)); ray2.style.strokeDashoffset = f1(1000 * (1 - k2));
    set(gl, { s: t > K.reflejado + 0.35 ? (1 + 0.25 * Math.sin(t * 14)) * pop(t, K.reflejado + 0.35, 0.3) : 0, r: t * 140, o: t > K.reflejado + 0.35 ? 1 : 0 });
    stampA(chN, t, K.reflejado, -4, 1);
    set(sat.d, { x: Math.sin(t * 1.4) * 8, y: Math.cos(t * 1.2) * 6, r: -6, s: pop(t, S.T1[0] + 0.15, 0.4) });
    face(sat, t, { look: t > K.nubes + 0.4 ? [-6, 8] : [-4, 2], seed: 0.6 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #2f3550 0%, #6b7aa0 38%, #C9C3B8 62%, #8a9a8a 100%)' });
  STARS(c);
  const sun = mk(c, [60, 380, 320, 320], sunInner(), '0 0 360 360', 'sun'); sun.d.style.zIndex = 4;
  const cl = box(c, 0, 0, 1080, 1920, { zIndex: 5 }); cl.innerHTML = cloudSvg(1080, 1920, 420, 1020, 1.3) + cloudSvg(1080, 1920, 720, 980, 1.4);
  const rl = box(c, 0, 0, 1080, 1920, { zIndex: 7 });
  rl.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="r1" d="M230,560 L560,930" stroke="${YEL}" stroke-width="18" stroke-linecap="round"/><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="r2" d="M560,930 L740,560" stroke="${YEL}" stroke-width="18" stroke-linecap="round"/></svg>`;
  const ray1 = rl.querySelector('.r1'), ray2 = rl.querySelector('.r2');
  const gl = el('div', c, { left: '505px', top: '870px', fontSize: '120px', lineHeight: 1, color: '#fff', textShadow: `0 0 20px ${YEL}, 3px 3px 0 ${INK}`, zIndex: 8 }, '✦');
  const chN = stamp(c, 440, 1120, 'REFLEJO EN<br>LAS NUBES', { size: 62, bw: 9, z: 20, bg: 'rgba(255,255,255,.95)', blend: 'normal', col: INK });
  const sat = mk(c, [540, 420, 380, 219], satInner(), '0 0 520 300', 'sat'); sat.d.style.zIndex = 9;
}

/* ======================================================================
   T2 · «Y EL SATÉLITE LO HABÍA CONFUNDIDO CON MISILES.» — en la cabeza del satélite, el destello se vuelve misil
   ====================================================================== */
{
  const c = scene(S.T2[0], S.T2[1], t => {
    const kz = p(t, K.confundido - 0.1, 0.4, E.inOutCubic);
    set(cam, { s: lerp(1.06, 1, kz), y: lerp(60, 0, kz) });
    set(sat.d, { s: pop(t, S.T2[0] + 0.02, 0.35), y: wobble(t, 0.6, 5), r: -3 });
    const sure = t > K.confundido;
    face(sat, t, { look: [6, -10], brow: sure ? -10 : 0, seed: 0.2, blink: false });
    set(th, { s: pop(t, S.T2[0] + 0.2, 0.35), o: t < S.T2[0] + 0.2 ? 0 : 1, r: -2 });
    const km = p(t, K.confundido - 0.1, 0.25, E.outBack);
    set(gs, { s: (1 - clamp(km)) * (1 + 0.2 * Math.sin(t * 12)), r: t * 120 });
    set(rk, { s: km, r: 12 + Math.sin(t * 9) * 3, y: Math.sin(t * 16) * 3 });
    set(qq, { s: pop(t, K.satelite7, 0.3), o: t > K.satelite7 && t < K.confundido - 0.1 ? 1 : 0 });
    stampA(stC, t, K.misiles7, -6, 1);
    popA(cA, t, K.confundido + 0.15, { r: -2 }); popA(cB, t, K.confundido + 0.3, { r: 2 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #2f3550 0%, #4a5578 100%)' });
  STARS(cam);
  const sat = mk(cam, [150, 690, 780, 450], satInner(), '0 0 520 300', 'sat'); sat.d.style.zIndex = 4;
  const th = box(cam, 340, 360, 520, 320, { zIndex: 6 });
  th.innerHTML = `<svg width="520" height="320" style="overflow:visible"><circle cx="40" cy="300" r="14" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="260" r="22" fill="#fff" stroke="${INK}" stroke-width="5"/>${cut('<ellipse cx="300" cy="140" rx="210" ry="130"/>')}<ellipse cx="300" cy="140" rx="210" ry="130" fill="#fff" stroke="${INK}" stroke-width="6"/></svg>`;
  const gs = el('div', th, { left: '240px', top: '70px', fontSize: '130px', lineHeight: 1, color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦');
  const rk = box(th, 260, 30, 80, 220, { zIndex: 4 }); rk.innerHTML = rocketSvg();
  const qq = el('div', th, { left: '400px', top: '40px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: PINK, textShadow: OUTL(INK, 4), zIndex: 5 }, '?');
  const stC = stamp(cam, 90, 560, '¡MISILES!', { size: 78, bw: 10, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const card = (x, lab, inner, col) => { const d = box(c, x, 1110, 380, 170, { zIndex: 20 }); d.innerHTML = `<svg width="380" height="170" style="overflow:visible">${cut('<rect x="0" y="0" width="380" height="170" rx="20"/>', 4, 6)}<rect x="0" y="0" width="380" height="170" rx="20" fill="${col}" stroke="${INK}" stroke-width="5"/></svg>`; el('div', d, { left: '16px', top: '16px', width: '220px', fontFamily: 'Rye', fontSize: '34px', lineHeight: 1.05, color: INK }, lab); const ic = box(d, 250, 10, 120, 150, { zIndex: 2 }); ic.innerHTML = inner; return d; };
  const cA = card(90, 'LO QUE<br>VIO:', rocketSvg(), '#fff');
  const cB = card(510, 'LO QUE<br>ERA:', `<svg viewBox="0 0 120 150" width="120" height="150" style="overflow:visible"><circle cx="60" cy="50" r="34" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="${cloudPath(70, 140, 0.55)}" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/></svg>`, YEL);
}

/* ======================================================================
   OJO (titular que aguanta toda la frase)
   ====================================================================== */
stepBanner(K.ojo - 0.05, K.ojo + 0.55, S.O3[1], '!', '¡Ojo!', { nbg: RED, bg: YEL });

/* O1 · «NO LE DIERON NINGUNA MEDALLA.» — la medalla baja… y se tacha */
{
  const c = scene(S.O1[0], S.O1[1], t => {
    const k = p(t, S.O1[0] + 0.05, 0.5, E.outBack);
    set(md.d, { y: (1 - k) * -900 + Math.sin(t * 3) * 8, r: Math.sin(t * 2.4) * 6 });
    const kx = p(t, K.no8 - 0.05, 0.25, E.outCubic);
    x1.style.strokeDashoffset = f1(1000 * (1 - clamp(kx * 2))); x2.style.strokeDashoffset = f1(1000 * (1 - clamp(kx * 2 - 1)));
    popA(chM, t, K.no8, { r: -3 });
    set(ry, { r: t * 12 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  const ry = rays(c, -160, 220, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const md = mk(c, [340, 420, 400, 600], medalInner(), '0 0 200 300', 'medal'); md.d.style.zIndex = 4;
  const xx = box(c, 260, 520, 560, 560, { zIndex: 6 }); xx.innerHTML = `<svg width="560" height="560" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="x1" d="M40,40 L520,520" stroke="${RED}" stroke-width="44" stroke-linecap="round"/><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="x2" d="M520,40 L40,520" stroke="${RED}" stroke-width="44" stroke-linecap="round"/></svg>`;
  const x1 = xx.querySelector('.x1'), x2 = xx.querySelector('.x2');
  const chM = chip(c, 240, 1130, 'ninguna medalla', { size: 66, bg: INK, color: YEL, z: 30 });
}

/* O2 · «SEGÚN CONTÓ ÉL,» — Petrov, ya mayor, lo cuenta */
{
  const c = scene(S.O2[0], S.O2[1], t => {
    set(po.d, { s: pop(t, S.O2[0] + 0.03, 0.4), y: wobble(t, 0.6, 3) });
    face(po, t, { look: [-8, -2], bL: 6, bR: 12, jaw: talkW(t, 'VECINO') * 0.6, seed: 1.7 });
    stampA(se, t, K.segun, -5, 1);
    set(bb, { s: pop(t, K.conto, 0.3), r: 3, o: t < K.conto ? 0 : 1 });
    bt.textContent = Math.floor(t * 4) % 2 ? '…' : '…!';
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const po = mk(c, [440, 560, 500, 639], petrovOldInner(), '0 0 360 460', 'bust'); po.d.style.zIndex = 4;
  const se = stamp(c, 90, 420, 'SEGÚN ÉL', { size: 96, bw: 12, z: 50, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const bb = bubble(c, 120, 640, '', { size: 80, tail: 'r', z: 40 }); const bt = document.createElement('span'); bt.textContent = '…'; bb.insertBefore(bt, bb.lastChild);
}

/* O3 · «LE ECHARON LA BRONCA POR NO RELLENAR BIEN EL PAPELEO DE ESA NOCHE.» — el jefe grita; el emú funcionario sella  ← CAMEO DEL EMÚ */
const T_EMU = K.papeleo - 0.2;
{
  const c = scene(S.O3[0], S.O3[1], t => {
    const sh = t > K.bronca ? Math.sin(t * 50) * 5 : 0;
    set(bs.d, { s: pop(t, S.O3[0], 0.3), x: sh, r: -3 });
    face(bs, t, { jaw: t > K.bronca - 0.05 && t < K.rellenar + 0.4 ? 0.9 + 0.2 * Math.sin(t * 30) : 0.2, look: [10, 4], bL: -6, bR: -6, blink: false });
    SL.forEach((s, i) => set(s, { o: t > K.bronca - 0.05 ? (Math.floor(t * 10 + i) % 2 ? 1 : 0.4) : 0 }));
    stampA(stB, t, K.bronca, -8, 1);
    PP.forEach((e, i) => { const t0 = K.rellenar - 0.3 + i * 0.04; set(e, { y: (1 - p(t, t0, 0.2, E.outBack)) * -300, o: t < t0 ? 0 : 1 }); });
    const ke = p(t, K.rellenar - 0.2, 0.3, E.outBack);
    set(emu.d, { y: (1 - ke) * 500 }); set(gls, { y: (1 - ke) * 500 });
    const cam0 = t > T_EMU && t < T_EMU + 0.7;
    face(emu, t, { look: cam0 ? [0, 0] : [-10, 10], blink: false, bL: cam0 ? 16 : 10, bR: cam0 ? 22 : 2, half: !cam0 });
    const kd = p(t, K.papeleo - 0.15, 0.15, E.inCubic), ku = p(t, K.papeleo + 0.12, 0.25, E.outCubic);
    set(tool, { y: kd * 200 - ku * 200, r: -10 + kd * 10 - ku * 10, o: ke > 0.5 ? 1 : 0 });
    stampA(stP, t, K.rellenar, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  rays(c, -300, 200, 1400, 24, 'rgba(200,16,46,.14)', 'rgba(0,0,0,0)', 1);
  const bs = mk(c, [30, 380, 440, 563], bossInner(), '0 0 360 460', 'bust'); bs.d.style.zIndex = 4;
  const SL = [0, 1, 2].map(i => { const e = box(c, 420, 560 + i * 60, 140, 50, { zIndex: 6 }); e.innerHTML = `<svg width="140" height="50" style="overflow:visible"><path d="M0,25 L${100 + i * 20},${8 + i * 16}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></svg>`; return e; });
  const stB = stamp(c, 380, 380, '¡BRONCA!', { size: 96, bw: 13, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const emuW = box(c, 520, 560, 400, 620, { overflow: 'hidden', zIndex: 3 });
  const emu = mkEmuF(emuW, [10, 10, 380, 570]);
  const gls = box(emuW, 10, 10, 380, 570, { zIndex: 2 }); gls.innerHTML = svgW(glassesOver(), '0 0 400 600');
  const pile = box(c, 60, 860, 520, 460, { zIndex: 5, overflow: 'hidden' }); pile.innerHTML = papersSvg(14, 9);
  const PP = [...pile.querySelectorAll('.pp')];
  const tool = box(c, 400, 760, 140, 210, { zIndex: 7 }); tool.innerHTML = stampToolSvg();
  const stP = stamp(c, 110, 1010, 'PAPELEO', { size: 100, bw: 12, z: 8, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   R1 · GOLPE ROSA: «O SEA: ESE SEÑOR TE SALVÓ LA VIDA…»
   ====================================================================== */
colorHit(S.R1[0], S.R1[1], PINK, c => {
  const l0 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, zIndex: 10 }, 'O sea: ese señor…');
  const big = el('div', c, { left: 0, top: '370px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1.0, color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10, whiteSpace: 'nowrap' });
  const WS = []; [['TE', K.te9], ['SALVÓ', K.salvo], ['<br>', null], ['LA', K.vida - 0.1], ['VIDA', K.vida]].forEach(([s, tt]) => { if (!tt) { big.appendChild(document.createElement('br')); return; } const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.12em'; e.textContent = s; big.appendChild(e); WS.push({ e, t: tt }); });
  const yu = mk(c, [330, 760, 420, 537], youInner(), '0 0 360 460', 'bust'); yu.d.style.zIndex = 5; yu.d.style.filter = SIL;
  const phn = box(c, 500, 1070, 80, 120, { zIndex: 6, background: '#BFE3FF', border: `6px solid ${INK}`, borderRadius: '14px' });
  const hr = el('div', c, { left: '690px', top: '720px', fontSize: '110px', zIndex: 8, color: RED, textShadow: OUTL(INK, 4) }, '♥');
  return t => {
    popA(l0, t, K.osea, { rise: 30 });
    WS.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.3), o: t < w.t - 0.03 ? 0 : 1 }));
    set(yu.d, { y: wobble(t, 0.5, 3) }); set(phn, { r: -8 + wobble(t, 0.4, 2) });
    set(hr, { s: t > K.vida ? 1 + 0.15 * Math.abs(Math.sin(t * 7)) : 0, o: t > K.vida ? 1 : 0 });
  };
});

/* R2 · «Y EL MUNDO NO SE ENTERÓ…» — el planeta dormido */
headline(S.R2[0], S.R2[1], 'El mundo *no se enteró*', { size: 100, hlT: K.entero, y: 236, color: '#fff', hlc: RED });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    set(gb, { s: pop(t, S.R2[0], 0.4), r: t * 6, y: Math.sin(t * 2.2) * 10 });
    ZZ.forEach((z, i) => { const ph = ((t - S.R2[0]) * 0.9 + i / 3) % 1; set(z, { x: ph * 60, y: -ph * 200, o: 1 - ph, s: 0.6 + ph * 0.8 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f3550' }); STARS(c);
  const gb = box(c, 270, 560, 540, 540, { zIndex: 4 }); gb.innerHTML = globeSvg();
  const ZZ = [0, 1, 2].map(() => el('div', c, { left: '720px', top: '560px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '90px', color: '#fff', textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, 'z'));
}

/* R3 · «…HASTA QUINCE AÑOS DESPUÉS.» — 1983 → 1998 de golpe + «15 AÑOS DESPUÉS» */
{
  const c = scene(S.R3[0], S.R3[1], t => {
    const kf = p(t, K.quince - 0.1, 0.22, E.inOutCubic);
    const sy = Math.abs(Math.cos(kf * Math.PI));
    set(c1, { sy: Math.max(0.02, sy), o: kf < 0.5 ? 1 : 0 });
    set(c2, { sy: Math.max(0.02, sy), o: kf >= 0.5 ? 1 : 0 });
    set(arr, { o: kf >= 0.5 ? 1 : 0, x: Math.sin(t * 8) * 6 });
    set(old, { s: pop(t, K.quince + 0.05, 0.3) * 0.62, r: -8, o: t < K.quince + 0.05 ? 0 : 1 });
    stampA(st15, t, K.quince + 0.1, -5, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const c1 = calPage(520, 520, 'AÑO', '1983', { bigSize: 180 }); c.appendChild(c1); c1.style.left = '400px'; c1.style.top = '300px'; c1.style.zIndex = 4;
  const c2 = calPage(520, 520, 'AÑO', '1998', { bigSize: 180, band: INK }); c.appendChild(c2); c2.style.left = '400px'; c2.style.top = '300px'; c2.style.zIndex = 4;
  const old = calPage(520, 520, 'AÑO', '1983', { bigSize: 180 }); c.appendChild(old); old.style.left = '100px'; old.style.top = '230px'; old.style.zIndex = 3;
  const arr = box(c, 250, 720, 180, 120, { zIndex: 5 }); arr.innerHTML = arrowSvg('M10,60 H160 M120,24 L164,60 L120,96', PINK, 12);
  const st15 = stamp(c, 420, 880, '15 AÑOS<br>DESPUÉS', { size: 96, bw: 15, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' }); st15.style.textAlign = 'center';
}

/* ======================================================================
   M1 · «¿TÚ QUÉ HABRÍAS HECHO EN SU SILLA:» — la silla vacía ante la pantalla roja
   M2 · «AVISAR, O NO? OS LEO.» — el teléfono que suena
   ====================================================================== */
headline(S.M1[0], S.M1[1], '¿Tú qué *habrías hecho* en su silla?', { size: 88, hlT: K.habrias, y: 236, color: '#fff', hlc: RED });
{
  const c = scene(S.M1[0], S.M1[1], t => {
    crtState(crt, t, 'red');
    set(ch.d, { s: pop(t, S.M1[0] + 0.05, 0.35), r: wobble(t, 0.5, 1) });
    set(spot, { o: t > K.silla - 0.05 ? 1 : 0.35 });
    popA(yt, t, K.tu10, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  const crt = mkCRT(c, 300, 480, 560, 440, { z: 3, size: 120 });
  const spot = box(c, 0, 0, 1080, 1920, { zIndex: 4, background: 'radial-gradient(ellipse at 62% 64%, rgba(255,240,200,.45), rgba(0,0,0,0) 30%)' });
  const ch = mk(c, [430, 880, 360, 480], chairInner(), '0 0 300 400', 'chair'); ch.d.style.zIndex = 5;
  vignette(c, 7, 0.6);
  const yt = chip(c, 120, 1100, '¿Y TÚ?', { size: 96, bg: YEL, color: INK, z: 40 });
}
headline(S.M2[0], S.M2[1], '*¿Avisar…* o no?', { size: 120, hlT: K.avisar, y: 236, color: '#fff', hlc: RED });
{
  const c = scene(S.M2[0], S.M2[1], t => {
    set(cam, { s: 1 + 0.06 * p(t, S.M2[0], 2.3, E.linear) });
    const ring = Math.floor(t * 2) % 2 === 0;
    set(R.rc, { r: ring ? Math.sin(t * 50) * 4 : 0 });
    crtState(R.crt, t, 'red');
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
    RG.forEach((g, i) => set(g, { o: ring ? 1 : 0, s: 1 + i * 0.25 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  sceneBg(cam, { background: BUNK });
  const R = phoneRig(cam, 380);
  const RG = [0, 1].map(i => { const e = box(cam, 300 - i * 30, 860 - i * 30, 480 + i * 60, 360 + i * 60, { zIndex: 5, border: `7px solid ${YEL}`, borderRadius: '50%' }); return e; });
  const ol = chip(c, 380, 1240, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 250, 1230, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}
