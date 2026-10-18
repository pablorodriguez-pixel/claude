/* Ep. 34 · Garbo v3 — escenas: paso 3 → cierre (todo clavado por texto vía K) */

/* ======================================================================
   PASO 3 · a — «Y TRES: COMO UN ESPÍA SOLO NO DABA PARA TANTO…» — Pujol solo ante una montaña de informes
   ====================================================================== */
{
  const PL = [];
  const c = scene(S.P3a[0], S.P3a[1], t => {
    set(pj.d, { y: wobble(t, 0.5, 3), r: Math.sin(t * 7) * (t > K.tanto - 0.3 ? 2 : 0.5) });
    face(pj, t, { look: [8, -6], bL: 14, bR: 18, seed: 0.8 });
    PL.forEach(q => { const k = p(t, q.t, 0.22, E.outBounce); set(q.e, { y: (1 - k) * -1000, r: q.r, o: t < q.t ? 0 : 1 }); });
    popA(one, t, K.espia6 - 0.05, { r: -4 });
    SW.forEach((s, i) => { const k = ((t * 1.4 + i * 0.37) % 1); set(s, { y: k * 90, o: t > K.solo ? 1 - k : 0 }); });
    stampA(stT, t, K.tanto - 0.05, -8, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D8D0BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 58px)' });
  const pj = mk(c, [60, 520, 440, 563], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 4;
  const SW = [0, 1, 2].map(i => el('div', c, { left: px(150 + i * 150), top: '560px', fontSize: '46px', color: '#7fb6d8', textShadow: `2px 2px 0 ${INK}`, zIndex: 9 }, '💧'));
  box(c, 0, 1080, 1080, 300, { zIndex: 6, background: WOOD, borderTop: `7px solid ${INK}` });
  for (let i = 0; i < 9; i++) { const e = box(c, 560 + (i % 2) * 16, 1030 - i * 56, 360, 66, { zIndex: 8 + i, background: '#F2E2B8', border: `5px solid ${INK}`, borderRadius: '6px', fontFamily: 'SpecialElite', fontSize: '34px', color: INK, textAlign: 'center', lineHeight: '56px' }, 'INFORME'); PL.push({ e, t: S.P3a[0] + 0.05 + i * 0.26, r: (i % 2 ? 3 : -3) }); }

  const one = chip(c, 110, 1110, '1 espía solo', { size: 58, bg: INK, color: YEL, z: 30 });
  const stT = stamp(c, 450, 1180, 'NO DA ABASTO', { size: 52, bw: 9, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   PASO 3 · b — «SE INVENTÓ OTROS VEINTISIETE. NINGUNO EXISTÍA… Y LOS ALEMANES LES PAGABAN EL SUELDO A TODOS»
   Organigrama: los 27 salen en oleadas SIN cifras intermedias; el «27» cae con la voz. 3 encuadres.
   ====================================================================== */
const T_EMU = K.v27 + 0.75;
{
  const ROWS = [3, 4, 7, 7, 6], RY = [640, 790, 932, 1074, 1216], RS = [100, 92, 84, 84, 84];
  const TJ = [K.invento, K.otros, K.v27, K.v27 + 0.3];
  const NODES = []; let gi = 0;
  ROWS.forEach((n, ri) => { for (let j = 0; j < n; j++) { const x = 110 + j * (760 / (n - 1)); NODES.push({ x: n === 3 ? 250 + j * 290 : x, y: RY[ri], sz: RS[ri], ri, k: gi++ }); } });
  const grp = k => k < 3 ? 0 : k < 7 ? 1 : k < 14 ? 2 : 3;
  const c = scene(S.P3b[0], S.P3b[1], t => {
    framing(cam, t, [[S.P3b[0], 1.0, 0, 0], [K.ninguno - 0.06, 1.1, 0, -30], [K.y6b - 0.04, 1.02, 0, 10]], 0.03);
    set(gb.d, { s: pop(t, S.P3b[0], 0.3), y: wobble(t, 0.5, 3) });
    face(gb.f, t, { look: [0, 4], bL: 8, bR: 14, closed: t > K.existia && t < K.existia + 0.3, seed: 2 });
    const ghost = t > K.ninguno - 0.06;
    NODES.forEach((nd, i) => {
      const t0 = TJ[grp(i)] + (i % 7) * 0.03, k = pop(t, t0, 0.3);
      const emuOn = nd.emu && t > T_EMU - 0.1 && t < T_EMU + 0.6;
      set(nd.b.d, { s: t < t0 ? 0 : k, y: Math.sin(t * 3 + i) * 4, o: t < t0 || emuOn ? 0 : ghost && t < K.y6b ? 0.45 : 1 });
      nd.b.glow.style.opacity = t > K.sueldo - 0.1 ? 0.5 + 0.5 * Math.sin(t * 10 + i) : 0;
      nd.ln.style.opacity = t < t0 ? 0 : 1; nd.ln.setAttribute('stroke-dashoffset', f1(-t * 50));
      if (nd.pd) set(nd.pd, { s: t < nd.tp ? 0 : lerp(2, 1, p(t, nd.tp, 0.16)), o: t < nd.tp ? 0 : 0.95, r: -12 });
    });
    set(n27, { s: t < K.v27 ? 0 : lerp(1.9, 1, p(t, K.v27, 0.2, E.outCubic)), r: -6, o: t < K.v27 ? 0 : 1 });
    stampA(stG, t, K.existia, -8, 1); if (t > K.pagaban - 0.2) stG.style.opacity = 1 - p(t, K.pagaban - 0.2, 0.2);
    const ke = pop(t, T_EMU - 0.1, 0.25), ko = p(t, T_EMU + 0.5, 0.12);
    set(emuW, { s: t < T_EMU - 0.1 || t > T_EMU + 0.62 ? 0 : ke * (1 - ko) * 1.15, r: Math.sin(t * 12) * 6 });
    popA(nom, t, K.alemanes6, { r: 3 });
    ENV.forEach(e => { const k = p(t, e.t, 0.5, E.inOutCubic); set(e.e, { x: lerp(980, e.x, k) - e.x0, y: lerp(260, e.y, k) - e.y0, s: 1 - 0.4 * k, r: (1 - k) * 30, o: t < e.t ? 0 : k < 1 ? 1 : 0 }); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 48px), repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 2px, transparent 2px 48px)' });
  const ls = lineSvg(cam, 3);
  const GX = 420, GY = 470;
  const rowsAt = ri => NODES.filter(n => n.ri === ri);
  NODES.forEach(nd => {
    let par = { x: GX, y: GY };
    if (nd.ri > 0) { const prev = rowsAt(nd.ri - 1); par = prev.reduce((a, b) => Math.abs(b.x - nd.x) < Math.abs(a.x - nd.x) ? b : a); }
    nd.ln = addLine(ls, par.x, par.y, nd.x, nd.y, RED, 5, '12 9');
    nd.b = botAv(cam, nd.x - nd.sz / 2, nd.y - nd.sz / 2, nd.sz, nd.k, { z: 8 });
  });
  const pr = rng(5); NODES.forEach((nd, i) => { if (i % 3 === 1 && nd.x > 180 && nd.x < 820) { nd.pd = stamp(cam, nd.x - 52, nd.y - 16, 'PAGADO', { size: 24, bw: 4, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' }); nd.pd.style.padding = '0 6px 2px'; nd.tp = K.sueldo + pr() * 0.6; } });
  const gb = pujolAv(cam, GX - 85, GY - 95, 170, { z: 12 });
  chip(cam, GX + 90, GY - 50, 'PUJOL', { size: 40, bg: INK, color: YEL, z: 14 });
  const n27 = el('div', cam, { left: '660px', top: '400px', width: '250px', height: '180px', lineHeight: '180px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '160px', color: RED, background: 'rgba(255,255,255,.93)', border: `10px solid ${RED}`, borderRadius: '24px', zIndex: 40 }, '27');
  const stG = stamp(cam, 180, 960, 'NINGUNO EXISTÍA', { size: 62, bw: 11, z: 45, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const emN = NODES[9]; emN.emu = true;
  const emuW = box(cam, emN.x - 85, emN.y - 85, 170, 170, { zIndex: 20 });
  avatar(emuW, 0, 0, 170, 'EMU', { bg: '#F2D9A0', bw: 6 });
  el('div', emuW, { left: '43px', top: '55px', width: '84px', height: '22px', zIndex: 9 }, `<svg width="84" height="24" viewBox="0 0 84 24"><path d="M2,4 h34 v8 q0,10 -17,10 q-17,0 -17,-10 Z M48,4 h34 v8 q0,10 -17,10 q-17,0 -17,-10 Z" fill="${INK}"/><path d="M36,8 h12" stroke="${INK}" stroke-width="4"/></svg>`);
  const nom = chip(cam, 250, 1268, 'sueldo pagado por Alemania', { size: 44, bg: RED, color: '#fff', z: 46 });
  const ENV = [];
  NODES.forEach((nd, i) => { if (i % 4 === 0) { const e = box(cam, nd.x - 45, nd.y - 30, 90, 60, { zIndex: 35 }); e.innerHTML = envSvg('', '#F4E4C0'); ENV.push({ e, x: nd.x - 45, y: nd.y - 30, x0: nd.x - 45, y0: nd.y - 30, t: K.pagaban - 0.1 + (i % 8) * 0.06 }); } });
}

/* ======================================================================
   F1 · «AL FINAL, LOS INGLESES VIERON LO BUENO QUE ERA Y LE FICHARON» — 2 encuadres
   ====================================================================== */
{
  const c = scene(S.F1[0], S.F1[1], t => {
    framing(cam, t, [[S.F1[0], 1.0, 0, 0], [K.ficharon - 0.08, 1.14, 0, -60]]);
    const sh = t > K.bueno;
    set(g1.d, { s: pop(t, S.F1[0], 0.3), y: wobble(t, 0.5, 3) }); set(g2.d, { s: pop(t, S.F1[0] + 0.08, 0.3), y: wobble(t, 0.5, 3, 1), o: t < S.F1[0] + 0.08 ? 0 : 1 });
    face(g1, t, { look: sh ? [0, 0] : [6, 6], bL: sh ? 20 : 4, bR: sh ? 20 : 4, seed: 1 }); face(g2, t, { look: sh ? [0, 0] : [-6, 6], bL: sh ? 20 : 4, bR: sh ? 20 : 4, seed: 2 });
    [cup1, cup2].forEach((cp, i) => { const kf = t > K.bueno + 0.1 + i * 0.1 ? t - (K.bueno + 0.1 + i * 0.1) : 0; set(cp, { y: kf * kf * 2600, r: kf * 300 * (i ? 1 : -1), o: kf > 0.6 ? 0 : 1 }); });
    set(rep, { s: pop(t, K.vieron - 0.1, 0.3), r: -3 + wobble(t, 0.5, 0.6), o: t < K.vieron - 0.1 ? 0 : 1 });
    popA(wow, t, K.bueno, { r: 4 });
    popA(cn, t, K.ficharon + 0.15, { r: -2 });
    stampA(stF, t, K.ficharon, -10, 1);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  sceneBg(cam, { background: '#D8D0BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 58px)' });
  const g1 = mk(cam, [110, 470, 410, 524], britInner(41, 0), '0 0 360 460', 'bust'); g1.d.style.zIndex = 4;
  const g2 = mk(cam, [530, 470, 410, 524], britInner(52, 1), '0 0 360 460', 'bust'); g2.d.style.zIndex = 4;
  const cup1 = box(cam, 300, 900, 120, 110, { zIndex: 8 }); cup1.innerHTML = teaSvg();
  const cup2 = box(cam, 700, 900, 120, 110, { zIndex: 8 }); cup2.innerHTML = teaSvg();
  const rep = box(cam, 330, 760, 420, 150, { zIndex: 9, background: '#F2E2B8', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${SH}`, fontFamily: 'SpecialElite', fontSize: '34px', color: INK, textAlign: 'center', lineHeight: 1.25, paddingTop: '18px' }, 'INFORMES DE PUJOL<br>(inventados)');
  const wow = el('div', cam, { left: '760px', top: '420px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '74px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 30 }, '¡oh!');
  const cn = chip(cam, 290, 1050, 'NOMBRE EN CLAVE: GARBO', { size: 40, bg: INK, color: YEL, z: 30 });
  const stF = stamp(cam, 320, 1140, 'FICHADO', { size: 84, bw: 13, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   F2 · «Y LLEGÓ EL GRAN DÍA: EL DESEMBARCO DE NORMANDÍA» — mapa del Canal con barcos
   ====================================================================== */
const P_LON = mpC(-0.13, 51.5).map(Number), P_CAL = mpC(1.86, 50.95).map(Number), P_NOR = mpC(-0.6, 49.36).map(Number);
function chanBase(c) {
  sceneBg(c, { background: '#AFC0B6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '600px 800px' });
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = channelSvg();
  return mp;
}
{
  const BT = [];
  const c = scene(S.F2[0], S.F2[1], t => {
    set(mp, { s: 1 + 0.05 * p(t, S.F2[0], 2.8, E.linear) });
    BT.forEach(b => { const k = p(t, b.t, 0.6, E.outCubic); set(b.e, { y: (1 - k) * -300 + Math.sin(t * 4 + b.t * 7) * 4, r: Math.sin(t * 4 + b.t * 7) * 4, o: t < b.t ? 0 : 1 }); });
    popA(cal, t, K.dia - 0.05, { r: -4 });
    popA(dd, t, K.desembarco - 0.05, { r: 2 });
    set(nl, { s: 1 + 0.12 * p(t, K.normandia, 0.25, E.outBack) * (1 - p(t, K.normandia + 0.35, 0.3)) });
  }, { clip: true, cut: true });
  const mp = chanBase(c);
  [[-1.2, 49.5], [-0.9, 49.45], [-0.55, 49.4], [-0.25, 49.38], [0.05, 49.38], [-1.0, 49.9], [-0.4, 49.95]].forEach((q, i) => { const pp = mpC(q[0], q[1] + 0.35).map(Number); const e = box(mp, pp[0] - 100, pp[1] - 66, 200, 132, { zIndex: 10 }); e.innerHTML = boatSvg(); BT.push({ e, t: K.desembarco - 0.1 + i * 0.1 }); });
  const nl = chip(mp, P_NOR[0] - 200, P_NOR[1] + 70, 'NORMANDÍA', { size: 60, bg: YEL, color: INK, z: 20 });
  const cal = el('div', c, { left: '90px', top: '420px', width: '300px', zIndex: 30 }, `<div style="background:#fff;border:6px solid ${INK};border-radius:16px;box-shadow:8px 8px 0 ${SH};overflow:hidden;text-align:center"><div style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:40px;padding:6px 0;border-bottom:5px solid ${INK}">JUNIO 1944</div><div style="font-family:Playfair;font-weight:900;font-size:130px;line-height:1.05;color:${INK}">6</div></div>`);
  const dd = el('div', c, { left: '0', top: '1180px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Bricolage;font-weight:800;font-size:44px;color:${INK};background:${YEL};padding:8px 30px 12px;border-radius:30px;border:5px solid ${INK};box-shadow:6px 6px 0 ${INK}">DÍA D: LOS ALIADOS DESEMBARCAN</span>`);
}

/* ======================================================================
   T1 · «PUJOL AVISÓ A HITLER DE QUE ERA UNA TRAMPA» — el télex
   ====================================================================== */
{
  const msg = 'NORMANDÍA = TRAMPA';
  const c = scene(S.T1[0], S.T1[1], t => {
    const ku = p(t, S.T1[0], 0.4, E.outCubic);
    set(strip, { y: (1 - ku) * 300, r: -2 + wobble(t, 0.5, 0.5) });
    const n = Math.round(clamp((t - K.aviso) / (K.trampaE - 0.05 - K.aviso)) * msg.length);
    tx.textContent = msg.slice(0, n);
    set(mach, { y: Math.sin(t * 40) * (n < msg.length && t > K.aviso ? 2 : 0) });
    set(gb.d, { s: pop(t, S.T1[0] + 0.05, 0.3), o: t < S.T1[0] + 0.05 ? 0 : 1 });
    face(gb.f, t, { look: [6, -2], bL: 6, bR: 16, closed: t > K.trampa && t < K.trampa + 0.3, seed: 5 });
    popA(to, t, K.hitler8 - 0.05, { r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f2a26' });
  halftone(c, 'rgba(255,255,255,.05)', 0);
  const strip = box(c, 110, 430, 820, 520, { zIndex: 5, background: '#FBF3DD', border: `6px solid ${INK}`, boxShadow: `12px 12px 0 rgba(0,0,0,.5)`, transformOrigin: '410px 520px' });
  el('div', strip, { left: '36px', top: '30px', fontFamily: 'SpecialElite', fontSize: '40px', color: '#6a5a48', whiteSpace: 'nowrap' }, 'MENSAJE DE GARBO · 9 JUN 1944');
  box(strip, 30, 96, 748, 4, { background: INK, opacity: 0.4 });
  const tx = el('div', strip, { left: '36px', top: '150px', width: '740px', fontFamily: 'SpecialElite', fontSize: '92px', lineHeight: 1.15, color: INK }, '');
  const to = el('div', strip, { left: '36px', top: '400px', fontFamily: 'SpecialElite', fontSize: '42px', color: RED, whiteSpace: 'nowrap' }, 'PARA: HITLER Y SU ALTO MANDO');
  const mach = box(c, 280, 960, 520, 300, { zIndex: 8 }); mach.innerHTML = telexSvg();
  const gb = pujolAv(c, 90, 1000, 170, { z: 12 });
}

/* ======================================================================
   T2 · «…Y DE QUE EL ATAQUE DE VERDAD SERÍA EN CALAIS. Y HITLER SE LO CREYÓ» — mapa + Hitler asiente (2 encuadres)
   ====================================================================== */
{
  const c = scene(S.T2[0], S.T2[1], t => {
    framing(mp, t, [[S.T2[0], 1.04, 0, 0], [K.y8b - 0.05, 0.94, 0, -80]], 0.03);
    arr.style.strokeDashoffset = f1(1000 * (1 - p(t, K.ataque - 0.05, 0.6, E.inOutCubic)));
    arrI.style.strokeDashoffset = arr.style.strokeDashoffset;
    set(head, { s: pop(t, K.ataque + 0.5, 0.3), o: t < K.ataque + 0.5 ? 0 : 1 });
    set(tgt, { s: 1 + 0.12 * Math.sin(t * 10), o: t > K.calais - 0.1 ? 1 : 0 });
    stampA(stC, t, K.calais, -8, 1);
    const hin = pop(t, K.hitler8b - 0.08, 0.35);
    set(hb.d, { s: hin, y: wobble(t, 0.5, 3) + (t > K.creyo ? Math.abs(Math.sin((t - K.creyo) * 9)) * 14 * (1 - p(t, K.creyo, 0.9)) : 0), o: t < K.hitler8b - 0.08 ? 0 : 1 });
    face(hb, t, { look: [-6, -4], bL: t > K.creyo ? 16 : 6, bR: t > K.creyo ? 16 : 6, closed: t > K.creyo + 0.2 && t < K.creyo + 0.5, seed: 0.9 });
    set(bub, { s: pop(t, K.creyo, 0.3), r: -4, o: t < K.creyo ? 0 : 1 });
  }, { clip: true, cut: true });
  const mp = chanBase(c);
  const ar = box(mp, 0, 0, 1080, 1920, { zIndex: 12 });
  const A0 = mpC(0.4, 51.65).map(Number);
  ar.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="a" pathLength="1000" stroke-dasharray="1000" d="M${A0[0] - 160},${A0[1] - 120} Q${A0[0] + 40},${A0[1] - 60} ${P_CAL[0] - 30},${P_CAL[1] - 40}" stroke="${INK}" stroke-width="46" fill="none" stroke-linecap="round"/><path class="ai" pathLength="1000" stroke-dasharray="1000" d="M${A0[0] - 160},${A0[1] - 120} Q${A0[0] + 40},${A0[1] - 60} ${P_CAL[0] - 30},${P_CAL[1] - 40}" stroke="${RED}" stroke-width="30" fill="none" stroke-linecap="round"/></svg>`;
  const arr = ar.querySelector('.a'), arrI = ar.querySelector('.ai');
  const head = box(mp, P_CAL[0] - 70, P_CAL[1] - 90, 120, 120, { zIndex: 13 }); head.innerHTML = `<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><path d="M10,10 L110,60 L40,110 Z" fill="${RED}" stroke="${INK}" stroke-width="8" stroke-linejoin="round" transform="rotate(30 60 60)"/></svg>`;
  const tgt = box(mp, P_CAL[0] - 80, P_CAL[1] - 80, 160, 160, { borderRadius: '50%', border: `10px solid ${RED}`, zIndex: 11 });
  const stC = stamp(mp, P_CAL[0] - 330, P_CAL[1] + 100, 'CALAIS', { size: 100, bw: 12, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  el('div', mp, { left: px(P_NOR[0] - 230), top: px(P_NOR[1] + 40), fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: INK, background: 'rgba(255,255,255,.92)', border: `4px solid ${INK}`, borderRadius: '14px', padding: '2px 16px 6px', zIndex: 20, whiteSpace: 'nowrap' }, `<s style="text-decoration-color:${RED};text-decoration-thickness:6px">Normandía</s> = <span style="color:${RED}">trampa</span>`);
  const hb = mk(c, [540, 900, 360, 460], hitlerInner(), '0 0 360 460', 'bust'); hb.d.style.zIndex = 40;
  const bub = bubble(c, 330, 860, 'ajá…', { size: 64, tail: 'br', z: 42, it: true });
}

/* ======================================================================
   T3b · «DEJÓ A MILES DE SOLDADOS ESPERANDO UN ATAQUE QUE NUNCA LLEGÓ» — fichas en Calais → la playa vacía
   ====================================================================== */
{
  const PW = [];
  const c = scene(S.T3b[0], S.T3b[1], t => {
    const beach = t > K.esperando - 0.04;
    mapL.style.display = beach ? 'none' : ''; beachL.style.display = beach ? '' : 'none';
    set(mapIn, { s: 1.15 + 0.05 * p(t, S.T3b[0], 1.4, E.linear) });
    PW.forEach(q => { const k = p(t, q.t, 0.3, E.outBounce); set(q.e, { y: (1 - k) * -200 + Math.sin(t * 2 + q.t * 9) * 2, o: t < q.t ? 0 : 1 }); });
    const tl = t - K.esperando;
    set(gull, { x: tl * 240, y: Math.sin(t * 5) * 20, sy: 1 - 0.3 * Math.abs(Math.sin(t * 8)) });
    set(wv, { x: Math.sin(t * 1.5) * 30 });
    set(sg, { r: -3 + wobble(t, 0.4, 1.2) });
    BP.forEach((b, i) => set(b, { y: wobble(t, 0.5, 2, i), r: Math.sin(t * 2 + i) * 2 }));
    popA(ml, t, K.miles - 0.03, { r: -3 });
    stampA(stN, t, K.nunca8 - 0.05, -9, 1);
    set(beachCam, { s: 1 + 0.04 * p(t, K.esperando, 2.5, E.linear) });
  }, { clip: true, cut: true });
  const mapL = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  const mapIn = chanBase(mapL); mapIn.style.transformOrigin = `${P_CAL[0]}px ${P_CAL[1] + 150}px`;
  const rp = rng(8);
  for (let i = 0; i < 16; i++) { const x = P_CAL[0] - 90 + (i % 4) * 66 + rp() * 14, y = P_CAL[1] + 130 + Math.floor(i / 4) * 66 + rp() * 12; const e = box(mapIn, x, y, 70, 90, { zIndex: 10 + Math.floor(i / 4) }); e.innerHTML = pawnSvg(); PW.push({ e, t: K.dejo - 0.05 + i * 0.03 }); }
  const beachL = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  const beachCam = box(beachL, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(beachCam, { background: 'linear-gradient(180deg, #CFD6DA 0%, #E6E0D0 50%)' });
  box(beachCam, -60, 760, 1200, 260, { background: '#8fa7a2', borderTop: `6px solid ${INK}`, zIndex: 2 });
  const wv = box(beachCam, -60, 980, 1200, 60, { zIndex: 3 }); wv.innerHTML = `<svg width="1200" height="60" style="overflow:visible"><path d="M0,30 ${Array.from({ length: 20 }, () => `q30,-26 60,0`).join(' ')} V60 H0 Z" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  box(beachCam, -60, 1020, 1200, 420, { background: '#E8D3A2', zIndex: 2, backgroundImage: 'radial-gradient(rgba(43,33,24,.18) 2px, transparent 2.5px)', backgroundSize: '26px 26px' });
  const sg = box(beachCam, 640, 680, 260, 420, { zIndex: 6, transformOrigin: '130px 420px' });
  sg.innerHTML = `<svg viewBox="0 0 260 420" width="260" height="420" style="overflow:visible"><rect x="118" y="100" width="24" height="320" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="10" y="10" width="240" height="110" rx="10" fill="${FIG}" stroke="${INK}" stroke-width="6"/><text x="130" y="84" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">CALAIS</text></svg>`;
  const gull = box(beachCam, 80, 470, 120, 60, { zIndex: 8 }); gull.innerHTML = gullSvg();
  const BP = [];
  for (let i = 0; i < 6; i++) { const e = box(beachCam, 90 + (i % 3) * 120 + (i > 2 ? 50 : 0), 1060 + (i > 2 ? 100 : 0), 92, 118, { zIndex: 9 + (i > 2 ? 1 : 0) }); e.innerHTML = pawnSvg(); BP.push(e); }
  const ml = chip(c, 140, 520, 'MILES DE SOLDADOS', { size: 56, bg: INK, color: YEL, z: 40 });
  const stN = stamp(c, 190, 840, 'NUNCA LLEGÓ', { size: 80, bw: 12, z: 45, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   OJO · a — «DESPUÉS FINGIÓ SU PROPIA MUERTE» — esquela de periódico + sello FINGIDO
   ====================================================================== */
{
  const c = scene(S.O1[0], S.O1[1], t => {
    const dead = t > K.fingio - 0.1;
    set(av.d, { s: pop(t, S.O1[0], 0.3), r: dead ? -4 : 0, y: wobble(t, 0.5, 3) });
    av.d.style.filter = dead ? 'grayscale(1) brightness(.8)' : 'none';
    face(av.f, t, { look: [0, 0], closed: dead && t < K.muerte + 0.5, seed: 1 });
    set(wink, { o: t > K.muerte + 0.5 ? 1 : 0, s: pop(t, K.muerte + 0.5, 0.3), r: t * 90 });
    set(rib, { s: pop(t, K.fingio - 0.05, 0.3), r: 12, o: t < K.fingio - 0.05 ? 0 : 1 });
    set(np, { s: pop(t, S.O1[0] + 0.05, 0.3), r: 3 + wobble(t, 0.4, 0.6) });
    stampA(stF, t, K.fingio, -10, 1);
    popA(oj, t, S.O1[0], { r: -8, d: 0.3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const np = box(c, 110, 430, 820, 700, { zIndex: 5, background: '#F4ECDB', border: `6px solid ${INK}`, boxShadow: `12px 12px 0 ${SH}`, transformOrigin: '410px 350px' });
  el('div', np, { left: '0', top: '18px', width: '808px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '56px', color: INK, borderBottom: `5px double ${INK}`, paddingBottom: '10px' }, 'DIARIO · 1949');
  el('div', np, { left: '330px', top: '130px', width: '440px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '66px', lineHeight: 1.0, color: INK }, 'Muere Juan Pujol');
  el('div', np, { left: '330px', top: '290px', width: '440px', fontFamily: 'SpecialElite', fontSize: '34px', lineHeight: 1.25, color: '#5a4a3a' }, 'en Angola, de malaria');
  for (let i = 0; i < 5; i++) box(np, 40, 470 + i * 34, i % 2 ? 560 : 730, 10, { background: 'rgba(43,33,24,.4)' });
  const av = pujolAv(np, 40, 120, 260, { z: 6 });
  const rib = box(np, 230, 110, 100, 120, { zIndex: 12 }); rib.innerHTML = ribbonSvg();
  const wink = el('div', np, { left: '230px', top: '330px', fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 14 }, '✦');
  const stF = stamp(c, 330, 880, 'FINGIDA', { size: 110, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const oj = stamp(c, 600, 1170, '¡OJO!', { size: 70, bw: 10, z: 42, col: INK, bg: YEL, blend: 'normal' });
}

/* OJO · b — «…Y SE FUE A VIVIR A VENEZUELA» — mapa de Latinoamérica */
{
  const VEN = laPj(-66.5, 7.5).map(Number);
  const c = scene(S.O2[0], S.O2[1], t => {
    set(mp, { s: 1.05 + 0.05 * p(t, S.O2[0], 2, E.linear) });
    const k = p(t, S.O2[0] + 0.05, K.venezuela + 0.1 - S.O2[0] - 0.05, E.inOutCubic);
    set(tok.d, { x: lerp(1000, VEN[0], k) - 75 - VEN[0], y: lerp(380, VEN[1], k) - 75 - VEN[1] - Math.sin(k * Math.PI) * 160, r: (1 - k) * 30 });
    face(tok.f, t, { look: [-4, 4], bL: 10, bR: 16, seed: 6 });
    set(pin, { y: (1 - p(t, K.venezuela, 0.25, E.outBounce)) * -140, o: t < K.venezuela ? 0 : 1 });
    set(cV, { s: 1 + 0.15 * p(t, K.venezuela, 0.25, E.outBack) * (1 - p(t, K.venezuela + 0.4, 0.3)), r: -3 });
    stampA(viv, t, K.venezuela + 0.05, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: `${VEN[0]}px ${VEN[1]}px` });
  const la = laPath(LATAM), cu = laPath(CUBA);
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">${cut(P(la) + P(cu), 9, 11)}${D(la, FIG, 6)}${D(cu, FIG, 4)}<path d="${la}" fill="url(#hP)"/></svg>`;
  const pin = box(mp, VEN[0] - 30, VEN[1] - 80, 60, 80, { zIndex: 22 }); pin.innerHTML = pinSvg(RED);
  const cV = chip(mp, VEN[0] - 200, VEN[1] - 190, 'VENEZUELA', { size: 66, bg: YEL, color: INK, z: 24 });
  const tok = pujolAv(mp, VEN[0], VEN[1], 150, { z: 23, bw: 6 });
  const viv = stamp(c, 380, 1000, '¡VIVITO!', { size: 96, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   O SEA · M1 — «LOS NAZIS LE DIERON LA CRUZ DE HIERRO… Y LOS INGLESES, OTRA MEDALLA» — solapa (2 encuadres)
   ====================================================================== */
{
  const c = scene(S.M1[0], S.M1[1], t => {
    framing(cam, t, [[S.M1[0], 1.05, 90, 0], [K.y10 - 0.04, 1.05, -90, 0]], 0.03);
    const ki = p(t, K.cruz - 0.15, 0.3, E.inCubic);
    set(ic, { y: (1 - ki) * -330, r: (1 - ki) * Math.sin(t * 2.6) * 10 + Math.sin(t * 3) * 2 });
    popA(c1, t, K.hierro, { r: -3 }); popA(cA, t, K.nazis - 0.05, { r: 3 });
    set(cr, { s: pop(t, K.ingleses10 - 0.05, 0.4), r: -6 + wobble(t, 0.6, 3), o: t < K.ingleses10 - 0.05 ? 0 : 1 });
    const km = p(t, K.medalla - 0.12, 0.3, E.inCubic);
    set(mb, { y: (1 - km) * -1000, r: (1 - km) * -40 + Math.sin(t * 3 + 1) * 2 });
    SP.forEach((s, i) => set(s, { o: (t > K.cruz + 0.15 && t < K.cruz + 0.9 && i < 3) || (t > K.medalla + 0.15 && i >= 3) ? 1 : 0, s: 0.8 + 0.3 * Math.sin(t * 12 + i), r: t * 120 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#2f2620' });
  const jk = box(cam, -100, 0, 1280, 1920, { zIndex: 1 });
  jk.innerHTML = `<svg width="1280" height="1920" style="overflow:visible"><path d="M-40,380 L620,380 L800,1500 L-40,1500 Z" fill="#3d3328" stroke="${INK}" stroke-width="6"/><path d="M620,380 L1320,380 L1320,1500 L800,1500 Z" fill="#33291f" stroke="${INK}" stroke-width="6"/><path d="M480,380 L660,380 L800,760 L620,900 Z" fill="#4a3d30" stroke="${INK}" stroke-width="6"/><path d="M660,380 L860,380 L790,780 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M740,400 L780,400 L800,700 L760,760 L720,700 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`;
  const ic = medalCross(cam, 150, 520, 330, { z: 10 });
  const cA = chip(cam, 230, 440, 'LOS NAZIS', { size: 46, bg: '#fff', color: INK, z: 20 });
  const c1 = chip(cam, 200, 1010, 'CRUZ DE HIERRO · 1944', { size: 40, bg: YEL, color: INK, z: 20 });
  const cr = box(cam, 690, 420, 240, 166, { zIndex: 12 }); cr.innerHTML = crownSvg();
  const mb = box(cam, 640, 640, 300, 396, { zIndex: 10 });
  { const rb = box(mb, 108, 0, 84, 120, { zIndex: 1 }); rb.innerHTML = ribbonBar(['#c9c6c0', '#E88FA8', '#E88FA8', '#c9c6c0']); const m = box(mb, 0, 96, 300, 300, { zIndex: 2 }); m.innerHTML = mbeSvg(); }
  const SP = [[160, 600], [440, 620], [300, 900], [640, 700], [880, 860], [760, 1000]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontSize: '60px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 25 }, '✦'));
}

/* O SEA · M2 — «POR EL MISMO ENGAÑO» — las dos medallas, una a cada lado */
{
  const c = scene(S.M2[0], S.M2[1], t => {
    set(m1, { s: pop(t, S.M2[0], 0.3), r: Math.sin(t * 3) * 8 });
    set(m2, { s: pop(t, S.M2[0] + 0.08, 0.3), r: -Math.sin(t * 3) * 8 });
    popA(b1, t, S.M2[0] + 0.05, { r: -4 }); popA(b2, t, S.M2[0] + 0.1, { r: 4 });
    stampA(stM, t, K.mismo - 0.03, -6, 1);
    set(pj.d, { s: pop(t, K.engano, 0.35), o: t < K.engano ? 0 : 1 });
    face(pj.f, t, { look: [0, 0], bL: 10, bR: 18, closed: t > K.engano + 0.3 && t < K.engano + 0.6, seed: 6 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(90deg, #D9D2C2 0 50%, #EBCBD4 50% 100%)' });
  box(c, 536, 380, 8, 1000, { background: INK, zIndex: 1 });
  const m1 = box(c, 120, 470, 300, 300, { zIndex: 5 }); m1.innerHTML = ironCrossSvg();
  const m2 = box(c, 630, 470, 300, 300, { zIndex: 5 }); m2.innerHTML = mbeSvg();
  const b1 = chip(c, 110, 820, 'ALEMANIA · Cruz', { size: 42, bg: INK, color: '#fff', z: 20 });
  const b2 = chip(c, 580, 820, 'INGLESES · MBE', { size: 42, bg: INK, color: '#fff', z: 20 });
  const stM = stamp(c, 170, 960, 'MISMO ENGAÑO', { size: 78, bw: 13, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const pj = pujolAv(c, 450, 1110, 180, { z: 22 });
}

/* ======================================================================
   Q2 · «¿QUÉ ES LO MÁS GORDO QUE TE HAS INVENTADO TÚ PARA LIBRARTE DE ALGO? OS LEO.»
   ====================================================================== */
headline(S.Q2[0], S.Q2[1], '¿Y lo más *gordo* que te has inventado *tú?*', { size: 80, hlT: K.gordo, y: 200 });
{
  const RW = [];
  const c = scene(S.Q2[0], S.Q2[1], t => {
    set(cd, { s: pop(t, S.Q2[0], 0.3), r: 1 + wobble(t, 0.5, 0.5) });
    RW.forEach(r0 => { const k = p(t, r0.t, 0.28, E.outBack); set(r0.e, { x: (1 - k) * 700, o: t < r0.t ? 0 : 1 }); });
    set(pen, { x: t > K.librarte ? Math.sin(t * 16) * 18 : 0, y: t > K.librarte ? Math.cos(t * 16) * 8 : 0, o: t > K.tu - 0.1 ? 1 : 0, r: 20 });
    dots.textContent = t > K.librarte ? '…'.repeat(1 + Math.floor((t - K.librarte) * 4) % 3) : '';
    set(qm, { s: pop(t, K.algo, 0.35), r: Math.sin(t * 5) * 10, o: t < K.algo ? 0 : 1 });
    popA(ol, t, K.os - 0.05, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const cd = box(c, 330, 430, 600, 760, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `12px 14px 0 ${SH}`, zIndex: 5 });
  el('div', cd, { left: '34px', top: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '46px', color: INK, whiteSpace: 'nowrap' }, 'Excusas épicas');
  box(cd, 24, 94, 538, 4, { background: INK, opacity: 0.3 });
  const EX = ['«Hay un atasco»', '«Me quedé sin batería»', '«Estoy malito»'];
  const TT = [K.gordo - 0.05, K.inventado - 0.05, K.tu - 0.1];
  EX.forEach((s, i) => {
    const e = box(cd, 24, 122 + i * 130, 540, 110, { zIndex: 6 });
    el('div', e, { left: '0', top: '0', width: '520px', height: '96px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '20px', boxShadow: `5px 5px 0 ${SH}` });
    el('div', e, { left: '24px', top: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, s);
    RW.push({ e, t: TT[i] });
  });
  const mine = box(cd, 24, 530, 540, 120, { zIndex: 6, border: `5px dashed ${PINK}`, borderRadius: '20px', background: 'rgba(255,62,165,.08)' });
  el('div', mine, { left: '24px', top: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '42px', color: PINK, whiteSpace: 'nowrap' }, 'La tuya:');
  const dots = el('div', mine, { left: '210px', top: '18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: INK }, '');
  const pen = box(cd, 380, 520, 100, 200, { zIndex: 9 }); pen.innerHTML = quillSvg();
  const qm = qMark(c, 800, 1080, 170, PINK); qm.style.zIndex = 30;
  const ol = chip(c, 380, 1215, 'Os leo 👇', { size: 58, bg: INK, color: YEL, z: 40 });
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN (línea 3: «Soy tu vecino, y esto no venía en el libro.»)
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    framing(cam, t, [[T0, 1.04, 0, 0], [K.esto2 - 0.1, 1.14, 0, 40]], 0.04);
    const lean = p(t, K.esto2 - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.05, y: wobble(t, 0.5, 3) - lean * 14 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto2 ? [0, -5] : t > K.esto2 ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto2 ? 6 : 0, bR: fanFast ? 8 : t > K.esto2 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
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
  const tag = chip(cam, 620, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 222, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · «Y ESTO… NO VENÍA EN EL LIBRO» — el libro HISTORIA se cierra (centrado) y el Vecino dice adiós
   ====================================================================== */
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    set(bookW, { x: 210 * 1.2 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.2 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  }, { cut: true });
  sceneBg(c, { background: '#EADFC8' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const vb = mk(c, [330, 200, 420, 520], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0; bookW.style.zIndex = 2;
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">ESPÍAS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de mentira</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1250px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 34 · El español que engañó a Hitler</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
