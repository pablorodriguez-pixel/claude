/* Ep. 32 · escenas L8–L14 (todo clavado por texto vía K) */

/* ======================================================================
   O1 · «OJO: PARECE COSA DE MONJES» — fila de monjes ante platos vacíos + chip OJO · TEORÍA
   ====================================================================== */
headline(S.O1[0], S.O1[1], 'parece cosa *de monjes*', { size: 96, hlT: K.monjes, y: 330 });
{
  const MK = [];
  const c = scene(S.O1[0], S.O1[1], t => {
    stampA(ojo, t, K.ojo, -5, 1);
    MK.forEach((m, i) => {
      const t0 = K.parece - 0.1 + i * 0.12;
      set(m.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.6, 3, i), o: t < t0 ? 0 : 1 });
      face(m, t, { look: [0, 6], bL: t > K.monjes ? 12 : 2, bR: t > K.monjes ? 12 : 2, seed: i * 0.9, jaw: t > K.monjes + 0.2 ? 0.25 : 0 });
    });
    PL.forEach((q, i) => set(q, { s: pop(t, K.monjes - 0.1 + i * 0.08, 0.3), o: t < K.monjes - 0.1 + i * 0.08 ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#D9C9A8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 3px, transparent 3px 120px)' });
  // arcos del refectorio
  box(c, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[0, 1, 2].map(k => `<path d="M${60 + k * 330},940 V640 Q${225 + k * 330},470 ${390 + k * 330},640 V940" fill="#C9B48E" stroke="${INK}" stroke-width="6"/>`).join('')}</svg>`;
  [[400, 700], [640, 690], [870, 710]].forEach((q, i) => { const m = mk(c, [q[0] - 150, q[1], 300, 383], monkInner(61 + i * 7, i === 1), '0 0 360 460', 'bust'); m.d.style.zIndex = 4; MK.push(m); });
  const tb = box(c, 0, 1000, 1080, 300, { zIndex: 6 }); tb.innerHTML = tableSvg(1080, 300);
  const PL = [[300, 1010], [530, 1010], [760, 1010]].map(q => { const e = box(c, q[0], q[1], 200, 64, { zIndex: 7 }); e.innerHTML = plateSvg(); return e; });
  const ojo = stamp(c, 260, 180, 'OJO · TEORÍA', { size: 88, bw: 11, z: 60, bg: YEL, blend: 'normal', col: INK });
}
/* O2 · «AYUNABAN HASTA LA NONA...» — tripa que ruge + reloj en las 3 con la etiqueta NONA */
headline(S.O2[0], S.O2[1], 'Ayunaban *hasta la nona*…', { size: 92, hlT: K.nona8, y: 330 });
{
  const c = scene(S.O2[0], S.O2[1], t => {
    set(m.d, { s: pop(t, S.O2[0] + 0.02, 0.4), x: (t > K.hasta8 ? Math.sin(t * 40) * 4 : 0), y: wobble(t, 0.6, 3), o: t < S.O2[0] + 0.02 ? 0 : 1 });
    face(m, t, { look: [8, -4], bL: 4, bR: 16, jaw: 0.15, seed: 0.3 });
    WV.forEach((w, i) => { const ph = ((t - S.O2[0]) * 1.6 + i / 3) % 1; set(w, { s: 0.6 + ph * 0.9, o: t > K.ayunaban + 0.2 ? (1 - ph) : 0 }); });
    popA(grr, t, K.ayunaban + 0.35, { r: -8 });
    ck.setH(3); set(ck.d, { s: pop(t, S.O2[0] + 0.15, 0.4), r: 3, o: t < S.O2[0] + 0.15 ? 0 : 1 });
    popA(tag, t, K.nona8 - 0.03, { r: -10 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const m = mk(c, [380, 640, 520, 664], monkInner(75, false), '0 0 360 460', 'bust'); m.d.style.zIndex = 4;
  const WV = [0, 1, 2].map(i => { const e = box(c, 520, 1120, 240, 160, { zIndex: 6 }); e.innerHTML = `<svg width="240" height="160" style="overflow:visible"><path d="M20,80 q25,-40 50,0 t50,0 t50,0 t50,0" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`; return e; });
  const grr = chip(c, 720, 1000, 'grrr…', { size: 60, bg: RED, z: 20 });
  const ck = mkClock(c, 640, 470, 330, { z: 8 });
  const tag = chip(c, 640, 830, 'NONA', { size: 62, bg: PINK, z: 30 });
}
/* O3 · «...Y LA FUERON ADELANTANDO» — el dedo empuja la aguja de las 3 hacia las 12 */
headline(S.O3[0], S.O3[1], 'y la fueron *adelantando*', { size: 92, hlT: K.adelantando, y: 330 });
{
  const c = scene(S.O3[0], S.O3[1], t => {
    const kp = p(t, K.fueron - 0.1, K.adelantando - K.fueron + 0.6, E.inOutCubic);
    const hb = 3 - 3 * kp; // la aguja retrocede de las 3 a las 12 ck.setH(hb < 0 ? hb + 12 : hb);
    const a = (hb * 30 - 90) * Math.PI / 180, R = 210;
    set(fin, { x: Math.cos(a) * R, y: Math.sin(a) * R, r: hb * 30 - 30 });
    set(tg, { x: Math.cos(a) * 300, y: Math.sin(a) * 300, r: -6 });
    set(dir, { o: kp > 0.05 && kp < 0.98 ? 1 : 0, r: -t * 120 });
    popA(n12, t, K.adelantando + 0.4, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 340, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const ck = mkClock(c, 240, 470, 600, { z: 4 });
  const ctr = box(c, 540, 770, 1, 1, { zIndex: 9 });
  const fin = box(ctr, -60, -60, 120, 120, { zIndex: 9 }); fin.innerHTML = `<svg viewBox="-60 -70 120 120" width="120" height="120" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
  const tg = box(ctr, -70, -32, 140, 64, {}); tg.appendChild(chip(tg, 0, 0, 'NONA', { size: 44, bg: PINK, z: 10 }));
  const dir = box(c, 760, 460, 120, 120, { zIndex: 10, fontSize: '100px', lineHeight: '120px', textAlign: 'center', color: PINK, fontFamily: 'Playfair', fontWeight: 900, textShadow: `3px 3px 0 ${INK}` }, '↺');
  const n12 = stamp(c, 440, 1110, '→ 12:00', { size: 90, bw: 11, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   P · «LO QUE HACE EL HAMBRE» — el monje se zampa el pan… y el emú se lo roba (cameo)
   ====================================================================== */
headline(S.P[0], S.P[1], 'Lo que hace *el hambre*', { size: 96, hlT: K.hambre });
const T_EMU = K.hambre + 0.12;
{
  const c = scene(S.P[0], S.P[1], t => {
    const chomp = t > K.hace - 0.1 && t < T_EMU;
    set(m.d, { s: pop(t, S.P[0], 0.35), y: wobble(t, 0.6, 3) + (chomp ? Math.abs(Math.sin(t * 22)) * -10 : 0) });
    face(m, t, { look: [-4, 6], jaw: chomp ? Math.abs(Math.sin(t * 22)) * 0.8 : 0, closed: chomp, bL: 8, bR: 8, seed: 0.5 });
    // el pan: entra, se acerca a la boca; en el cameo, el emú se lo lleva
    const kb = p(t, S.P[0] + 0.05, 0.35, E.outBack), ke = p(t, T_EMU, 0.3, E.inCubic);
    set(br, { x: lerp(300, 0, kb) + ke * 900, y: -ke * 120, r: -10 + ke * 40, s: 1 - 0.15 * (chomp ? Math.abs(Math.sin(t * 22)) : 0), o: 1 });
    const kE = p(t, T_EMU - 0.2, 0.22, E.outBack) * (1 - p(t, T_EMU + 0.5, 0.25, E.inCubic));
    set(emu.d, { x: (1 - kE) * 520, r: -18 });
    emuW.style.visibility = kE > 0.001 ? 'visible' : 'hidden';
    face(emu, t, { look: [-6, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU - 0.05 && t < T_EMU + 0.3 ? 0.6 : 0 });
    CR.forEach((q, i) => { const kc = p(t, K.hace + i * 0.08, 0.6, E.outCubic); set(q, { x: (i - 2) * 60 * kc, y: kc * 200 + kc * kc * 100, o: t > K.hace + i * 0.08 && kc < 1 ? 1 : 0 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.2)', 'rgba(0,0,0,0)', 0);
  const m = mk(c, [210, 520, 560, 715], monkInner(75, false), '0 0 360 460', 'bust'); m.d.style.zIndex = 4;
  const br = box(c, 380, 880, 320, 172, { zIndex: 8 }); br.innerHTML = breadSvg();
  const CR = [0, 1, 2, 3, 4].map(i => box(c, 520, 980, 24, 18, { zIndex: 9, background: '#D9A25A', border: `3px solid ${INK}`, borderRadius: '40%' }));
  const emuW = box(c, 560, 560, 520, 760, { overflow: 'hidden', zIndex: 20 });
  const emu = mkEmuF(emuW, [80, 40, 420, 630]);
}

/* ======================================================================
   Q · PANTALLA PARTIDA — «TU SIESTA ERA A LAS DOCE... Y TE LA ECHAS A LAS TRES» / «Y EL NOON... ERA A LAS TRES... Y LO DICEN A LAS DOCE»
   ====================================================================== */
{
  const c = scene(S.Q[0], S.Q[1], t => {
    const kIn = p(t, S.Q[0], 0.35, E.outCubic);
    const fTop = 1 - p(t, K.y11 - 0.2, 0.35, E.inOutCubic); // 1 = foco arriba (L10), 0 = foco abajo (L11)
    set(top, { x: (1 - kIn) * -1080, s: lerp(0.96, 1.03, fTop), o: lerp(0.55, 1, fTop) });
    set(bot, { x: (1 - p(t, S.Q[0] + 0.12, 0.35, E.outCubic)) * 1080, s: lerp(1.03, 0.96, fTop), o: lerp(1, 0.55, fTop) });
    // ARRIBA · SIESTA: 12 → ≈ 15
    const kT = p(t, K.y10 - 0.05, K.tres10 - K.y10 + 0.1, E.inOutCubic);
    cT.setH(lerp(12, 15, kT));
    popA(tT12, t, K.doce10 - 0.03, { r: -3 }); popA(tT15, t, K.tres10 - 0.03, { r: 3 });
    arrT.style.opacity = t > K.tres10 - 0.03 ? 1 : 0; aTP.style.strokeDashoffset = f1(1000 * (1 - p(t, K.tres10 - 0.03, 0.3)));
    set(hm, { r: Math.sin(t * 2.4) * 4 });
    face(sl, t, { closed: true, jaw: 0.15, seed: 0 });
    // ABAJO · NOON: ≈ 15 → 12
    const kB = p(t, K.y11b - 0.05, K.doce11 - K.y11b + 0.1, E.inOutCubic);
    cB.setH(lerp(15, 12, kB));
    popA(tB15, t, K.tres11 - 0.03, { r: -3 }); popA(tB12, t, K.doce11 - 0.03, { r: 3 });
    arrB.style.opacity = t > K.doce11 - 0.03 ? 1 : 0; aBP.style.strokeDashoffset = f1(1000 * (1 - p(t, K.doce11 - 0.03, 0.3)));
    face(en, t, { look: [6, -4], seed: 2, jaw: 0 });
    set(tea, { r: wobble(t, 0.7, 4), y: wobble(t, 0.5, 4) });
    popA(lbT, t, K.siesta10 - 0.04, { r: -2 }); popA(lbB, t, K.nun11 - 0.04, { r: 2 });
    // flechas que se cruzan en el centro al final
    const kx = p(t, K.doce11 + 0.15, 0.35, E.outBack);
    set(cross, { s: kx, r: kx * 8, o: t > K.doce11 + 0.15 ? 1 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#2B2118' });
  const mkPanel = (y, bg) => { const pnl = box(c, 30, y, 1020, 560, { zIndex: 4, background: bg, border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 rgba(0,0,0,.35)`, overflow: 'hidden', transformOrigin: '510px 280px' }); return pnl; };
  const top = mkPanel(170, '#F6E7B8'), bot = mkPanel(760, '#D7DCE2');
  // panel de arriba
  const lbT = el('div', top, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1, color: INK }, hlSpan('SIESTA', 'q1', YEL));
  top.querySelector('.q1').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const hm = box(top, 20, 250, 520, 300, { zIndex: 2, transformOrigin: '260px 40px' }); hm.innerHTML = hammockSvg();
  const sl = mk(top, [150, 150, 230, 294], sleeperInner(), '0 0 360 460', 'bust'); sl.d.style.zIndex = 1;
  box(top, 20, 250, 520, 300, { zIndex: 3 }).innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="7"/></svg>`;
  const cT = mkClock(top, 610, 110, 330, { z: 4 });
  const tT12 = chip(top, 530, 460, '12:00', { size: 48, bg: '#fff', color: INK, z: 6 });
  const tT15 = chip(top, 760, 460, '≈ 15:00', { size: 48, bg: YEL, color: INK, z: 6 });
  const arrT = box(top, 650, 410, 160, 60, { zIndex: 7 }); arrT.innerHTML = `<svg width="160" height="60" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" d="M10,40 Q80,0 140,36 M120,20 L144,38 L118,50" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`; const aTP = arrT.querySelector('path');
  // panel de abajo
  const lbB = el('div', bot, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1, color: INK }, hlSpan('NOON', 'q2', PINK));
  bot.querySelector('.q2').style.transform = 'scaleX(1) rotate(-1.2deg)';
  el('div', bot, { left: '44px', top: '140px', fontFamily: 'SpecialElite', fontSize: '36px', color: INK }, '(mediodía en inglés)');
  const en = mk(bot, [120, 200, 280, 358], englishInner(), '0 0 360 460', 'bust'); en.d.style.zIndex = 2;
  const tea = box(bot, 360, 380, 130, 106, { zIndex: 3 }); tea.innerHTML = teaSvg();
  const cB = mkClock(bot, 610, 110, 330, { z: 4 });
  const tB15 = chip(bot, 530, 460, '≈ 15:00', { size: 48, bg: PINK, z: 6 });
  const tB12 = chip(bot, 790, 460, '12:00', { size: 48, bg: '#fff', color: INK, z: 6 });
  const arrB = box(bot, 700, 410, 160, 60, { zIndex: 7 }); arrB.innerHTML = `<svg width="160" height="60" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" d="M10,40 Q80,0 140,36 M120,20 L144,38 L118,50" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`; const aBP = arrB.querySelector('path');
  const cross = box(c, 380, 650, 320, 220, { zIndex: 20 });
  cross.innerHTML = `<svg width="320" height="220" style="overflow:visible"><path d="M30,30 L290,190" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M30,30 L290,190" stroke="${YEL}" stroke-width="20" stroke-linecap="round"/><path d="M290,30 L30,190" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M290,30 L30,190" stroke="${PINK}" stroke-width="20" stroke-linecap="round"/></svg>`;
}

/* ======================================================================
   R1 · GOLPE ROSA: «SE CAMBIARON LA HORA» — los dos relojes saltan e intercambian el sitio
   ====================================================================== */
colorHit(S.R1[0], S.R1[1], PINK, c => {
  const ttl = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: 1.05, color: '#fff', textShadow: OUTL(INK, 8), zIndex: 10, whiteSpace: 'nowrap' }, 'SE CAMBIARON<br>LA HORA');
  const mkC = (x, lab, h, col) => { const w = box(c, x, 620, 400, 560, { zIndex: 8 }); const ck = mkClock(w, 30, 0, 340, {}); ck.setH(h); el('div', w, { left: '0', top: '370px', width: '400px', textAlign: 'center' }, `<span style="display:inline-block;font-family:Playfair;font-weight:900;font-size:72px;color:${INK};background:${col};border:6px solid ${INK};border-radius:20px;padding:0 22px 8px;box-shadow:6px 6px 0 ${INK}">${lab}</span>`); return w; };
  const A = mkC(90, 'SIESTA', 3, YEL), B = mkC(590, 'NOON', 12, '#fff');
  return t => {
    const kt = p(t, K.se12 - 0.05, 0.3, E.outBack);
    set(ttl, { s: t < K.se12 - 0.05 ? 0 : lerp(1.5, 1, kt), r: -2, o: t < K.se12 - 0.05 ? 0 : 1 });
    ttl.style.textShadow = (glitch(t, K.cambiaron, 0.25) ? glitch(t, K.cambiaron, 0.25) + ', ' : '') + OUTL(INK, 8);
    const ks = p(t, K.cambiaron + 0.05, 0.55, E.inOutCubic), hop = Math.sin(ks * Math.PI);
    set(A, { x: ks * 500, y: -hop * 220, r: ks * 360 * 0 + hop * -12, s: pop(t, S.R1[0], 0.3) });
    set(B, { x: -ks * 500, y: hop * 120, r: hop * 12, s: pop(t, S.R1[0] + 0.05, 0.3) });
  };
});

/* ======================================================================
   R2 · «Y ADIVINA QUIÉN LLEGA TARDE...» — el señor de la portada corre con la lengua fuera
   ====================================================================== */
headline(S.R2[0], S.R2[1], 'Adivina quién *llega tarde*…', { size: 88, hlT: K.tarde12 });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    const tl = t - S.R2[0];
    set(bgS, { x: -((tl * 900) % 270) });
    const run = Math.sin(t * 26);
    set(man.d, { x: lerp(-420, 0, p(t, S.R2[0], 0.6, E.outCubic)), y: Math.abs(run) * -26, r: 8 + run * 3 });
    face(man, t, { look: [10, 0], bL: 14, bR: 14, jaw: 0.6, seed: 0 });
    LG.forEach((l, i) => set(l, { r: (i ? 1 : -1) * run * 38 }));
    SL.forEach((s, i) => set(s, { x: -((tl * 1400 + i * 300) % 1200) + 900, o: 0.7 }));
    ck.setH(lerp(2.5, 3.2, p(t, S.R2[0], 2.6, E.linear)));
    popA(lt, t, K.tarde12 - 0.03, { r: -6 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const bgS = box(c, 0, 0, 2400, 1920, { zIndex: 1 }); bgS.innerHTML = `<svg width="2400" height="1920" style="overflow:visible">${[...Array(10)].map((_, k) => `<rect x="${k * 270}" y="1040" width="18" height="160" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`).join('')}<rect x="0" y="1180" width="2400" height="740" fill="#B9A27E" stroke="${INK}" stroke-width="6"/></svg>`;
  const ck = mkClock(c, 690, 470, 260, { z: 3 });
  const runner = box(c, 220, 600, 500, 760, { zIndex: 6 });
  const LG = [0, 1].map(i => { const l = box(runner, 210 + i * 40, 480, 60, 260, { zIndex: 1, transformOrigin: '30px 10px' }); l.innerHTML = `<svg width="60" height="260" style="overflow:visible"><path d="M18,0 L42,0 L40,210 L20,210 Z" fill="#5a4632" stroke="${INK}" stroke-width="4"/><path d="M10,206 L62,206 Q70,240 46,244 L10,244 Z" fill="${INK}"/></svg>`; return l; });
  const man = mk(runner, [0, 0, 480, 614], sleeperInner() + TONGUE() + SWEAT(), '0 0 360 460', 'bust'); man.d.style.zIndex = 2;
  const SL = [0, 1, 2, 3].map(i => { const e = box(c, 0, 700 + i * 120, 220, 20, { zIndex: 5, background: INK, borderRadius: '10px', opacity: 0.6 }); return e; });
  const lt = chip(c, 640, 780, '¡llego!', { size: 54, bg: PINK, z: 20 });
}
/* R3 · «...HASTA A LA SIESTA» — se tira en la hamaca: sello TARDE */
headline(S.R3[0], S.R3[1], 'hasta *a la siesta*', { size: 104, hlT: K.siesta12 });
{
  const c = scene(S.R3[0], S.R3[1], t => {
    const kf = p(t, S.R3[0], 0.4, E.outBounce);
    set(man.d, { y: lerp(-500, 0, kf), r: -12 + Math.sin(t * 2.2) * 3 });
    face(man, t, { closed: t > S.R3[0] + 0.45, jaw: 0.4, bL: 10, bR: 10, seed: 0 });
    set(hm, { r: Math.sin((t - S.R3[0]) * 6) * 6 * Math.exp(-(t - S.R3[0]) * 1.5) });
    set(front, { r: Math.sin((t - S.R3[0]) * 6) * 6 * Math.exp(-(t - S.R3[0]) * 1.5) });
    stampA(st, t, K.siesta12 + 0.02, -8, 1);
    ck.setH(3.1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 420, 1400, 24, 'rgba(200,16,46,.08)', 'rgba(0,0,0,0)', 0);
  box(c, 0, 1180, 1080, 740, { zIndex: 1, background: '#B9A27E', borderTop: `6px solid ${INK}` });
  const ck = mkClock(c, 700, 380, 240, { z: 2 });
  const hm = box(c, 90, 760, 900, 520, { zIndex: 5, transformOrigin: '450px 100px' }); hm.innerHTML = hammockSvg();
  const man = mk(c, [340, 650, 380, 486], sleeperInner() + TONGUE(), '0 0 360 460', 'bust'); man.d.style.zIndex = 4;
  const front = box(c, 90, 760, 900, 520, { zIndex: 6, transformOrigin: '450px 100px' }); front.innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="6"/></svg>`;
  const st = stamp(c, 230, 520, 'TARDE', { size: 170, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   T · CTA: «¿A QUÉ HORA TE LA ECHAS TÚ? OS LEO.» — reloj vacío que gira
   ====================================================================== */
{
  const c = scene(S.T[0], S.T[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(tHL, t, K.tu13, 0.3);
    ck.setH((t - S.T[0]) * 2.2 + 1);
    set(ck.d, { s: pop(t, S.T[0] + 0.05, 0.4), r: wobble(t, 0.6, 2), o: t < S.T[0] + 0.05 ? 0 : 1 });
    QM.forEach((q, i) => set(q, { s: pop(t, K.echas13 + i * 0.1, 0.3), r: Math.sin(t * 5 + i) * 10, o: t < K.echas13 + i * 0.1 ? 0 : 1 }));
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const l1 = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '340px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = [];
  [['¿A', l1], ['qué', l1], ['hora', l1], ['te', l2], ['la', l2], ['echas', l2], ['tú?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 6) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('tú?', 'thl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[K.i13 + k].s }); });
  const tHL = c.querySelector('.thl');
  const ck = mkClock(c, 290, 520, 500, { z: 6, blank: true });
  const QM = [[170, 640], [840, 620], [200, 940], [820, 900]].map((q, i) => qMark(c, q[0], q[1], 120, i % 2 ? PINK : YEL));
  const ol = chip(c, 600, 1110, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 460, 1110, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN, medio dormido con el abanico (última frase)
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    set(cam, { s: 1.04 + 0.04 * p(t, T0, T1 - T0, E.linear) });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const awake = t > K.vecino + 0.2;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), half: !awake, look: t > K.esto ? [-4, 3] : [0, 0], bL: t > K.esto ? 6 : 0, bR: t > K.esto ? 12 : 0, fan: Math.sin(t * 2 * Math.PI * 0.6) * 14, seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    zf(t); set(zW, { o: awake ? 0 : 1 });
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
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const zW = box(cam, 0, 0, 1080, 1920, { zIndex: 30 }); const zf = zzz(zW, 620, 760, 3);
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (centrado) sobre fondo propio
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.05, SCB = 1.1;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // al cerrarse, el libro (que solo ocupa la mitad derecha) se desplaza para quedar centrado
    set(bookW, { x: 210 * SCB * p(t, TC + 0.2, 0.25, E.outCubic), s: SCB * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  }, { cut: true, clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 360, 1400, 24, 'rgba(255,255,255,.18)', 'rgba(0,0,0,0)', 1);
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 2 });
  const vb = mk(bookW, [140, 400, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">PALABRAS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de todos los días</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1270px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 32 · ¿Siesta es un número?</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
}
