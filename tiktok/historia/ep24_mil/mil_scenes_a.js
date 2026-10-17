/* Ep. 24 · escenas L0–L4 (milpiés, fiesta, Aladino, millón) */
const bigTxt = (pa, x, y, w, html, o = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 200), lineHeight: 1, color: o.color || '#fff', textShadow: o.sh || `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: o.z || 10, whiteSpace: 'nowrap' }, o.css || {}), html);
const jaT = (pa, x, y, txt = '¡JA!', sz = 84) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(sz), color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 40 }, txt);

/* ======================================================================
   A · PORTADA / GANCHO — milpiés gigante en S + «¿MIL PATAS?» (pregunta, sin veredicto)
   ====================================================================== */
const coverCurve = t => u => { const w = 0.18 * Math.sin(t * 1.3); return [540 + 330 * Math.sin(Math.PI * 2 * u * 1.0 + 0.35 + w) * (0.9 + 0.1 * u), 600 + u * 700]; };
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, 0, 2.7, E.linear) });
    set(ry, { r: t * 8 });
    mil.update(coverCurve(t), t, { speed: 10, look: t > K.colado ? [6, 0] : [3, 0], seed: 0.7 });
    set(ttl, { y: wobble(t, 0.5, 4), r: -1.5 + wobble(t, 0.4, 0.6) });
    paint(tHL, t, -1, 0.1);
    set(qm, { s: 1 + 0.08 * Math.sin(t * 6), r: 8 + Math.sin(t * 4) * 6 });
    set(sp, { y: wobble(t, 0.7, 4), r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 52%, rgba(255,230,0,.42), rgba(255,230,0,0) 60%)' });
  const ry = rays(cam, -160, 240, 1400, 26, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  halftone(cam, 'rgba(43,33,24,.05)', 0);
  const mil = mkMilli(cam, { n: 54, rx: 24, ry: 44, legL: 64, col: '#B0703F', z: 6 });
  const ttl = el('div', cam, { left: '0', top: '316px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '180px', color: INK, zIndex: 20, whiteSpace: 'nowrap', textShadow: `6px 6px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff` }, `¿${hlSpan('MIL', 'thl')} PATAS?`);
  const tHL = ttl.querySelector('.thl');
  const qm = el('div', cam, { left: '110px', top: '500px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: PINK, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 21 }, '?');
  const sp = chip(cam, 360, 1436, 'ESPECIAL 1.000', { size: 44, bg: PINK, z: 30 });
}

/* ======================================================================
   B · «LA MAYORÍA NO LLEGA NI A LA MITAD» — milpiés recto, la mitad trasera tachada
   ====================================================================== */
headline(S.B[0], S.B[1], 'La mayoría: ni *la mitad*', { size: 84, hlT: K.mitad, y: 262 });
{
  const c = scene(S.B[0], S.B[1], t => {
    const cr = t > K.mitad + 0.05;
    const kin = p(t, S.B[0], 0.5, E.outCubic);
    mil.update(u => [930 - u * 840 + (1 - kin) * 700, 820 + Math.sin(u * 9 - t * 3) * 14], t, { speed: 12, cross: cr ? [0.5, 1] : null, look: cr ? [-4, 0] : [4, 0], seed: 1.4 });
    sh.style.transform = `scaleX(${f1(p(t, K.mitad + 0.05, 0.3) * 1000) / 1000})`;
    stampA(st, t, K.mitad + 0.05, -8, 1);
    set(half, { o: t > K.mitad + 0.1 ? 1 : 0 });
    sweat.style.opacity = cr ? 1 : 0; set(sweat, { y: cr ? ((t * 60) % 40) : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 52px)' });
  const mil = mkMilli(c, { n: 30, rx: 24, ry: 46, legL: 66, col: '#B0703F', z: 6 });
  const sh = box(c, 90, 700, 470, 240, { zIndex: 7, transformOrigin: 'left center', background: 'rgba(234,223,200,.55)', backgroundImage: `repeating-linear-gradient(45deg, ${RED} 0 6px, transparent 6px 26px)`, opacity: 0.85, border: `5px dashed ${RED}`, borderRadius: '20px' });
  const half = chip(c, 150, 960, 'esta mitad, ni de broma', { size: 44, bg: INK, color: YEL, z: 22 });
  const st = stamp(c, 150, 520, 'NI LA MITAD', { size: 96, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const sweat = el('div', c, { left: '1010px', top: '740px', fontSize: '50px', zIndex: 9, color: '#6fb1d6', textShadow: `2px 2px 0 ${INK}` }, '💧');
}

/* ======================================================================
   C · «EL PRIMERO CON MÁS DE MIL… 2021» — el milpiés récord, enrollado, con lupa
   ====================================================================== */
const HW = {};
headline(S.C[0], K.conocio - 0.06, 'El primero con *más de mil*…', Object.assign({ size: 74, hlT: K.mil1, y: 262 }, HW));
headline(K.conocio - 0.06, S.C[1], 'no se conoció hasta…', Object.assign({ size: 84, y: 262 }, HW));
{
  const spiral = t => u => { const a = 0.6 + u * Math.PI * 4.1 + t * 0.25, r = 340 * (1 - 0.78 * u); return [540 + Math.cos(a) * r, 860 + Math.sin(a) * r * 0.92]; };
  const c = scene(S.C[0], S.C[1], t => {
    set(cam, { s: lerp(1.03, 1.12, p(t, S.C[0], 3.6, E.inOutCubic)) });
    mil.update(spiral(t), t, { speed: 13, amp: 0.5, look: [2, 0], seed: 2 });
    const lk = p(t, S.C[0] + 0.2, K.veintiuno - S.C[0] - 0.3, E.inOutCubic);
    set(lupa, { x: lerp(-260, 120, lk) + Math.sin(t * 3) * 20, y: lerp(260, -120, lk) + Math.cos(t * 2.5) * 16, r: -20 });
    stampA(yr, t, K.veintiuno, -7, 1);
    popA(ct, t, K.veintiuno + 0.22, { r: 3 });
    set(ct, { s: pop(t, K.veintiuno + 0.22, 0.4) * (1 + 0.04 * Math.sin(t * 6)), r: 3, o: t > K.veintiuno + 0.22 ? 1 : 0 });
    popA(rec, t, S.C[0] + 0.15, { r: -4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#5b4532', backgroundImage: 'radial-gradient(circle at 50% 46%, #8a6a4a 0%, #5b4532 55%, #3a2a1e 100%)' });
  halftone(cam, 'rgba(0,0,0,.18)', 0);
  // terrones y raíces (bajo tierra)
  const soil = box(cam, 0, 0, 1080, 1920, { zIndex: 1 }); {
    const r = rng(17); let s = '';
    for (let k = 0; k < 30; k++) { const x = r() * 1080, y = 380 + r() * 1100, rr = 10 + r() * 30; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rr)}" ry="${f1(rr * 0.7)}" fill="#7a5a3a" stroke="${INK}" stroke-width="3"/>`; }
    for (let k = 0; k < 6; k++) { const x = r() * 1080; s += `<path d="M${f1(x)},360 C${f1(x + 60)},520 ${f1(x - 50)},700 ${f1(x + 30)},900" stroke="#c9a77a" stroke-width="7" fill="none" opacity=".6"/>`; }
    soil.innerHTML = `<svg width="1080" height="1920">${s}</svg>`;
  }
  paperPiece(c, -20, 244, 1120, 140, { seed: 88, bg: '#F6ECD4' }).wrap.style.zIndex = 30;
  const mil = mkMilli(cam, { n: 92, rx: 11, ry: 19, legL: 30, lw: 3.4, sw: 2.6, col: '#F1E4C2', z: 6, head: 1.6 });
  const lupa = box(cam, 520, 700, 300, 300, { zIndex: 12 });
  lupa.innerHTML = `<svg viewBox="0 0 300 300" width="300" height="300" style="overflow:visible">${cut('<circle cx="120" cy="120" r="100"/><path d="M190,190 L280,280"/>')}<path d="M190,190 L280,280" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M190,190 L280,280" stroke="${WOOD}" stroke-width="30" stroke-linecap="round"/><circle cx="120" cy="120" r="100" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="16"/><circle cx="120" cy="120" r="100" fill="none" stroke="${BRASS}" stroke-width="9"/><path d="M60,80 Q80,50 116,44" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
  const rec = chip(cam, 70, 440, 'el récord', { size: 46, bg: YEL, color: INK, z: 20 });
  const yr = stamp(c, 300, 760, '2021', { size: 210, bw: 18, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const ct = chip(c, 300, 1050, '1.306 PATAS', { size: 84, bg: PINK, z: 41 });
}

/* ======================================================================
   D · GOLPE AMARILLO: «HOY SOMOS 1.000 VECINOS» — confeti de papel + cameo del emú
   ====================================================================== */
const T_EMU = K.vecinos2 + 0.2;
colorHit(S.D[0], S.D[1], YEL, c => {
  const l0 = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '100px', color: INK, zIndex: 10 }, 'Hoy somos');
  const big = bigTxt(c, 0, 450, 1080, '1.000', { size: 330 });
  const vec = bigTxt(c, 0, 790, 1080, 'VECINOS', { size: 150, color: INK, sh: `6px 6px 0 #fff` });
  const C = paperConfetti(c, 46, 91, [PINK, '#fff', '#8a6a4a', RED, '#F4ECDB'], { z: 30, vy: 1100, spread: 300 });
  const emuW = box(c, 60, 840, 520, 680, { overflow: 'hidden', zIndex: 20 });
  const emu = mk(emuW, [40, 120, 400, 600], emuFrontInner() + partyOver(), '0 -80 400 680', 'emuF');
  const blow = emu.d.querySelector('.blow');
  return t => {
    popA(l0, t, K.hoy, { rise: 30 });
    const kb = p(t, K.mil2 - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.mil2 - 0.02 ? 0 : lerp(1.8, 1, kb), r: -3, o: t < K.mil2 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.mil2, 0.25) ? glitch(t, K.mil2, 0.25) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    popA(vec, t, K.vecinos2, { rise: 40, r: 2 });
    updConf(C, t, K.mil2);
    const ke = p(t, T_EMU, 0.2, E.outBack), kd = p(t, T_EMU + 0.7, 0.18, E.inCubic);
    set(emu.d, { y: (1 - ke) * 520 + kd * 520, r: -5 });
    emuW.style.visibility = ke > 0.001 && kd < 0.999 ? 'visible' : 'hidden';
    face(emu, t, { look: [0, 0], blink: false, bL: 18, bR: 24, jaw: 0 });
    const kbw = clamp(Math.sin(clamp((t - T_EMU - 0.15) / 0.5) * Math.PI));
    blow.setAttribute('transform', `translate(240 300) scale(${f1((0.25 + 0.75 * kbw) * 100) / 100} 1) translate(-240 -300)`);
  };
});

/* ======================================================================
   E · «VAN TRES "MILES" MÁS QUE TE HAN COLADO» — 4 tarjetas, 2·3·4 boca abajo
   ====================================================================== */
headline(S.E[0], S.E[1], 'Van *tres más*', { size: 110, hlT: K.tres, y: 262 });
{
  const CD = [];
  const c = scene(S.E[0], S.E[1], t => {
    CD.forEach((q, i) => {
      const t0 = i === 0 ? S.E[0] : [K.tres, K.miles, K.mas][i - 1];
      const k = pop(t, t0, 0.42);
      set(q.e, { s: k, r: q.r + wobble(t, 0.5, 1, i), o: t < t0 ? 0 : 1 });
      if (q.qm) set(q.qm, { r: Math.sin(t * 5 + i) * 10, s: 1 + 0.08 * Math.sin(t * 6 + i) });
    });
    mini.update(u => [235 - 160 * u + 140, 640 + Math.sin(u * 7 - t * 3) * 10], t, { speed: 12, seed: 3 });
    stampA(col, t, K.colado2, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 3px, transparent 3px 64px)' });
  [[110, 430, 1, -3], [570, 430, 2, 3], [110, 820, 3, 2], [570, 820, 4, -2]].forEach(([x, y, n, r], i) => {
    const e = box(c, x, y, 400, 330, { zIndex: 10, background: i ? '#3a2a1e' : '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 ${SH}` });
    el('div', e, { left: '18px', top: '10px', width: '78px', height: '78px', borderRadius: '50%', background: i ? YEL : PINK, border: `5px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', lineHeight: '68px', textAlign: 'center', color: INK }, String(n));
    let qm = null;
    if (i) { e.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 10px, transparent 10px 24px)'; qm = el('div', e, { left: '0', top: '50px', width: '388px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '220px', color: YEL, textShadow: `5px 5px 0 ${INK}` }, '?'); }
    else { el('div', e, { left: '0', top: '246px', width: '388px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '52px', color: INK }, 'Milpiés ✔'); }
    CD.push({ e, r, qm });
  });
  const mini = mkMilli(c, { n: 14, rx: 12, ry: 22, legL: 30, lw: 3.5, sw: 2.5, col: '#B0703F', z: 11 });
  const col = stamp(c, 170, 1180, 'TE LOS HAN COLADO', { size: 66, bw: 11, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   BOOK · «DOS: LAS MIL Y UNA NOCHES. ALADINO NO VENÍA EN EL LIBRO: LO COLÓ UN FRANCÉS…»
   un solo decorado con 4 planos de cámara (libro cerrado → abierto → Aladino → el francés)
   ====================================================================== */
headline(S.BOOK[0], K.aladino - 0.06, 'Dos: *«Las mil y una noches»*', Object.assign({ size: 70, hlT: K.las, y: 262, keyColor: INK }, HW));
headline(K.aladino - 0.06, S.H[0], '*Aladino* no venía…', Object.assign({ size: 92, hlT: K.aladino, y: 262, keyColor: INK }, HW));
headline(S.H[1], K.siglos - 0.06, 'Lo coló *un francés*', Object.assign({ size: 92, hlT: K.frances, y: 262, keyColor: INK }, HW));
headline(K.siglos - 0.06, S.BOOK[1], '*siglos* después', Object.assign({ size: 96, hlT: K.siglos, y: 262, keyColor: INK }, HW));
{
  const TO = K.las - 0.05;
  const c = scene(S.BOOK[0], S.BOOK[1], t => {
    // cámara por planos
    let cs = 1, cx = 0, cy = 0;
    if (t < K.aladino - 0.06) { cs = lerp(1.0, 1.06, p(t, S.BOOK[0], 2.4, E.linear)); }
    else if (t < S.H[1]) { cs = 1.12; cx = -40; cy = -30; }
    else { const k = p(t, S.H[1], 0.3, E.outCubic); cs = lerp(1.0, 1.04, p(t, S.H[1], 2.3, E.linear)); cx = 0; cy = 0; void k; }
    set(cam, { s: cs, x: cx, y: cy });
    // libro: se abre en «Las»
    const k = 1 - p(t, TO, 0.45, E.inOutCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    set(bookW, { x: 210 * k, s: pop(t, S.BOOK[0] + 0.01, 0.35), o: 1 });
    STR.forEach((s2, i) => { const a = t * 3 + i * 2.1; set(s2, { x: Math.cos(a) * 60, y: Math.sin(a) * 20, r: t * 120, o: t > TO + 0.3 && t < K.aladino ? 1 : 0 }); });
    // Aladino intenta entrar en la página (y la página lo rechaza)
    const ka = p(t, K.aladino - 0.05, 0.4, E.outBack);
    const inF = t > S.H[1];
    const kc = p(t, K.colo, 0.45, E.inOutCubic); // lo cuela el francés
    const ax = inF ? lerp(860, 660, kc) : lerp(1200, 820, ka) + (t > K.no3 && t < S.H[0] ? -Math.abs(Math.sin((t - K.no3) * 9)) * 40 : 0);
    const ay = inF ? lerp(760, 740, kc) : 760 + (t > K.no3 ? Math.abs(Math.sin((t - K.no3) * 9)) * -30 : 0);
    set(alad.d, { x: ax - 820, y: ay - 760, s: inF ? lerp(1, 0.62, kc) : 1, r: inF ? lerp(-8, -2, kc) : -4 + Math.sin(t * 6) * 3, o: t < K.aladino - 0.05 ? 0 : 1 });
    face(alad, t, { look: inF ? [-3, 0] : [-4, 0], seed: 0.4, brow: t > K.no3 && !inF ? -4 : 0 });
    set(lamp, { y: Math.sin(t * 4) * 6, r: -10 + Math.sin(t * 3) * 4 });
    set(noX, { s: pop(t, K.no3, 0.3), r: -8, o: t > K.no3 && !inF ? 1 : 0 });
    // el francés (Galland) con pluma
    const kg = p(t, S.H[1], 0.4, E.outBack);
    set(gal.d, { x: (1 - kg) * -600, y: wobble(t, 0.6, 3), o: inF ? 1 : 0 });
    face(gal, t, { look: [-6, 2], seed: 1.7, closed: t > K.colo + 0.1 && t < K.colo + 0.6, jaw: 0 });
    set(quill, { x: (1 - kg) * -600 + (t > K.colo - 0.2 && t < K.frances ? Math.sin(t * 22) * 10 : 0), r: -30 + (t > K.colo - 0.2 && t < K.frances ? Math.sin(t * 22) * 8 : 0), o: inF ? 1 : 0 });
    popA(gn, t, K.frances + 0.05, { r: -3 });
    stampA(add, t, K.colo + 0.25, -10, 1);
    popA(sg, t, K.siglos, { r: 3 });
    set(sg, { s: pop(t, K.siglos, 0.4), r: 3, o: t > K.siglos ? 1 : 0 });
    set(hg, { s: pop(t, K.siglos + 0.1, 0.4), r: Math.sin(t * 3) * 12 + (t > K.siglos ? (t - K.siglos) * 120 : 0), o: t > K.siglos + 0.1 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#2f2a4a', backgroundImage: 'radial-gradient(circle at 50% 50%, #4a3f6a 0%, #2f2a4a 60%, #1e1a30 100%)' });
  const sky = box(cam, 0, 0, 1080, 1920, { zIndex: 1 }); {
    const r = rng(23); let s = '';
    for (let k = 0; k < 40; k++) s += `<path d="M${f1(r() * 1080)},${f1(360 + r() * 1100)} l5,12 l12,4 l-12,4 l-5,12 l-5,-12 l-12,-4 l12,-4 Z" fill="${YEL}" opacity="${f1(0.3 + r() * 0.6)}"/>`;
    s += `<path d="M880,420 a90,90 0 1,0 60,150 a74,74 0 1,1 -60,-150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/>`;
    s += `<path d="M0,1330 L80,1330 L80,1180 Q110,1120 140,1180 L140,1330 L260,1330 L260,1220 L300,1160 L340,1220 L340,1330 L520,1330 L520,1150 Q560,1060 600,1150 L600,1330 L760,1330 L760,1240 L820,1190 L880,1240 L880,1330 L1080,1330 L1080,1400 L0,1400 Z" fill="#1e1a30" stroke="${INK}" stroke-width="4"/>`;
    sky.innerHTML = `<svg width="1080" height="1920">${s}</svg>`;
  }
  paperPiece(c, -20, 244, 1120, 140, { seed: 88, bg: '#F6ECD4' }).wrap.style.zIndex = 30;
  const bookW = box(cam, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 4 });
  const bs = svgLayer(bookW, 1);
  const scrib = (x0, x1, y0, n, seed) => { const r = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const y = y0 + i * 34; let d = `M${x1},${y}`; for (let x = x1; x > x0; x -= 18) d += ` q-9,${f1(-6 - r() * 8)} -18,0`; s += `<path d="${d}" stroke="${INK}" stroke-width="3.4" fill="none" opacity=".55"/><circle cx="${f1(x0 + r() * (x1 - x0))}" cy="${y - 14}" r="3" fill="${INK}" opacity=".5"/>`; } return s; };
  bs.innerHTML = `<g>${cut('<rect x="110" y="600" width="440" height="600" rx="14"/>')}<rect x="110" y="600" width="440" height="600" rx="14" fill="#5a1f2a" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="616" width="410" height="566" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="616" width="410" height="566" fill="url(#hP)" opacity=".5"/>
   <path d="M150,640 h370 v120 h-370 Z" fill="none" stroke="${BRASS}" stroke-width="4"/><path d="M335,650 q40,50 0,100 q-40,-50 0,-100 Z" fill="${RED}" opacity=".5" stroke="${INK}" stroke-width="2"/>${scrib(160, 510, 800, 11, 3)}
   <g class="flap">${cut('<rect x="530" y="600" width="440" height="600" rx="14"/>')}<rect x="530" y="600" width="440" height="600" rx="14" fill="#5a1f2a" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="616" width="410" height="566" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${scrib(570, 920, 660, 15, 7)}</g>
    <g class="coverF"><rect x="540" y="600" width="430" height="600" rx="14" fill="#5a1f2a" stroke="${INK}" stroke-width="5"/><rect x="566" y="626" width="378" height="548" rx="8" fill="none" stroke="#e9c75c" stroke-width="5"/>
    <path d="M755,700 q70,80 0,160 q-70,-80 0,-160 Z" fill="none" stroke="#e9c75c" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="930" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="#e9c75c">LAS MIL</text><text x="755" y="990" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="#e9c75c">Y UNA</text><text x="755" y="1050" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="#e9c75c">NOCHES</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const STR = []; for (let i = 0; i < 3; i++) STR.push(el('div', bookW, { left: '520px', top: '560px', fontSize: '60px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const alad = mk(cam, [700, 520, 260, 460], aladInner(), '0 0 260 460', 'bust'); alad.d.style.zIndex = 8; alad.d.style.transformOrigin = '50% 90%';
  const lamp = box(alad.d, -120, 170, 190, 108, { zIndex: 2 }); lamp.innerHTML = svgW(lampInner(), '0 0 300 170');
  const noX = box(cam, 600, 760, 220, 220, { zIndex: 9 }); noX.innerHTML = XSVG;
  const gal = mk(cam, [30, 790, 420, 537], gallandInner(), '0 0 360 460', 'bust'); gal.d.style.zIndex = 7;
  const quill = box(cam, 380, 930, 140, 280, { zIndex: 9 });
  quill.innerHTML = `<svg viewBox="0 0 120 240" width="140" height="280" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/><path d="M40,120 l16,6 M36,96 l20,6 M40,70 l18,6" stroke="${INK}" stroke-width="2"/></svg>`;
  const gn = chip(cam, 60, 1250, 'Antoine Galland, traductor', { size: 40, bg: INK, color: YEL, z: 20 });
  const add = stamp(cam, 600, 650, 'AÑADIDO', { size: 72, bw: 14, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const sg = chip(cam, 560, 1150, 'siglos después', { size: 60, bg: PINK, z: 20 });
  const hg = el('div', cam, { left: '440px', top: '1110px', fontSize: '100px', zIndex: 21 }, '⏳');
}
/* H · GOLPE ROSA «NO VENÍA EN EL LIBRO» (sobre el decorado del libro) */
colorHit(S.H[0], S.H[1], PINK, c => {
  const l1 = bigTxt(c, 0, 330, 1080, 'NO VENÍA', { size: 170 });
  const l2 = bigTxt(c, 0, 520, 1080, 'EN EL LIBRO', { size: 140, color: YEL });
  const sil = mk(c, [370, 720, 300, 531], aladInner(), '0 0 260 460', 'bust'); sil.d.style.filter = SIL; sil.d.style.zIndex = 8;
  const lp = box(c, 230, 920, 220, 125, { zIndex: 9, filter: SIL }); lp.innerHTML = svgW(lampInner(), '0 0 300 170');
  return t => {
    const k = p(t, S.H[0], 0.16, E.outBack);
    set(l1, { s: lerp(1.6, 1, k), r: -3 }); l1.style.textShadow = (glitch(t, S.H[0] + 0.02, 0.22) ? glitch(t, S.H[0] + 0.02, 0.22) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    popA(l2, t, S.H[0] + 0.08, { r: 2 });
    set(sil.d, { y: Math.sin(t * 9) * 8, r: Math.sin(t * 7) * 3 });
    set(lp, { r: -12 + Math.sin(t * 6) * 5 });
  };
});

/* ======================================================================
   J · «TRES: MILLÓN. VIENE DEL ITALIANO: "MIL GRANDE"» — el MIL se infla como un globo
   ====================================================================== */
headline(S.J[0], K.viene - 0.06, 'Tres: *millón*', { size: 120, hlT: K.millon, y: 262 });
headline(K.viene - 0.06, S.J[1], 'Del italiano: *«mil grande»*', { size: 76, hlT: K.milG, y: 262 });
{
  const c = scene(S.J[0], S.J[1], t => {
    set(cam, { s: lerp(1, 1.06, p(t, S.J[0], 4.3, E.linear)) });
    const kI = p(t, K.millon, 0.6, E.outElastic);
    const sc = lerp(0.5, 1, clamp(kI, 0, 1.3));
    set(bal, { s: sc * (1 + 0.02 * Math.sin(t * 5)), y: wobble(t, 0.4, 10) - (t > K.millon ? 30 : 0), r: wobble(t, 0.3, 3) });
    mT.style.opacity = t < K.millon + 0.05 ? 1 : 0; mL.style.opacity = t < K.millon + 0.05 ? 0 : 1;
    set(pump, { y: t > K.tres4 + 0.2 && t < K.millon + 0.4 ? Math.abs(Math.sin(t * 14)) * 60 : 0 });
    popA(it, t, K.italiano, { r: -3 });
    stampA(mg, t, K.milG, -6, 1);
    set(str, { r: Math.sin(t * 2) * 4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#E9DFC6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  rays(cam, -160, 160, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const str = box(cam, 520, 1080, 60, 260, { zIndex: 4, transformOrigin: '50% 0' }); str.innerHTML = `<svg width="60" height="260" style="overflow:visible"><path d="M30,0 C0,60 60,120 30,180 C10,220 40,240 30,260" stroke="${INK}" stroke-width="5" fill="none"/></svg>`;
  const bal = box(cam, 90, 470, 900, 640, { zIndex: 6, transformOrigin: '50% 95%' });
  bal.innerHTML = `<svg viewBox="0 0 900 640" width="900" height="640" style="overflow:visible">${cut('<ellipse cx="450" cy="300" rx="430" ry="290"/><path d="M420,580 L480,580 L470,620 L430,620 Z"/>')}
    <ellipse cx="450" cy="300" rx="430" ry="290" fill="${PINK}" stroke="${INK}" stroke-width="7"/><ellipse cx="520" cy="360" rx="360" ry="220" fill="url(#hA)" opacity=".35"/>
    <ellipse cx="250" cy="150" rx="90" ry="40" fill="#fff" opacity=".55" transform="rotate(-24 250 150)"/><path d="M420,584 L480,584 L470,624 L430,624 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/></svg>`;
  const mT = el('div', bal, { left: '0', top: '170px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: 1, color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}` }, 'MIL');
  const mL = el('div', bal, { left: '0', top: '190px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}` }, 'MILLÓN');
  const pump = box(cam, 770, 1060, 200, 230, { zIndex: 3 }); pump.innerHTML = `<svg viewBox="0 0 200 230" width="200" height="230" style="overflow:visible">${cut('<rect x="70" y="60" width="60" height="160" rx="8"/><rect x="40" y="0" width="120" height="26" rx="10"/>')}<path d="M100,26 V70" stroke="${INK}" stroke-width="10"/><rect x="40" y="0" width="120" height="26" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="70" y="60" width="60" height="160" rx="8" fill="${METAL}" stroke="${INK}" stroke-width="4"/><rect x="70" y="60" width="60" height="160" fill="url(#hD)" opacity=".4"/></svg>`;
  const it = el('div', cam, { left: '390px', top: '1150px', display: 'flex', border: `5px solid ${INK}`, borderRadius: '14px', overflow: 'hidden', boxShadow: `6px 6px 0 ${INK}`, zIndex: 20, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '48px', color: INK }, `<span style="background:#3d8a4a;width:26px"></span><span style="background:#fff;padding:6px 22px 10px">del italiano</span><span style="background:${RED};width:26px"></span>`);
  const mg = stamp(cam, 210, 880, '= MIL GRANDE', { size: 92, bw: 13, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}
/* JH · GOLPE AMARILLO: «UN MILOTE» (el Vecino se tapa la boca de risa en su óvalo) */
colorHit(S.JH[0], S.JH[1], YEL, c => {
  const l0 = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '120px', color: INK, zIndex: 10 }, 'Un…');
  const big = bigTxt(c, 0, 500, 1080, 'MILOTE', { size: 250 });
  const bal = chip(c, 380, 870, '= millón', { size: 70, bg: INK, color: YEL, z: 12 });
  const jas = [jaT(c, 700, 860, '¡JA!', 90), jaT(c, 760, 1000, '¡JA, JA!', 70)];
  return t => {
    popA(l0, t, K.un, { rise: 30 });
    const kb = p(t, K.milote - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.milote - 0.02 ? 0 : lerp(1.8, 1, kb), r: -3, o: t < K.milote - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.milote, 0.25) ? glitch(t, K.milote, 0.25) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    set(bal, { s: pop(t, K.milote + 0.2, 0.4), r: -3, o: t > K.milote + 0.2 ? 1 : 0 });
    jas.forEach((j, i) => { const t0 = K.milote + 0.15 + i * 0.15; set(j, { s: pop(t, t0, 0.3), r: [-10, 8][i], y: -p(t, t0, 0.8) * 30, o: t < t0 ? 0 : 1 }); });
  };
});
