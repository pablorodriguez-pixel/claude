/* Ep. 29 · escenas L6–L11 (todo clavado por texto vía K) */

/* ======================================================================
   G1 · «Y COSTÓ: EN PLENO SIGLO DIECINUEVE…» — el impresor con el tipo «¿» en la mano
   ====================================================================== */
headline(S.G1[0], K.en6 - 0.28, 'Y *costó*', { size: 130, hlT: K.costo, y: 230 });
headline(K.en6 - 0.28, S.G1[1], 'En pleno *siglo XIX*', { size: 104, hlT: K.xix, y: 230 });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    set(cam, { s: lerp(1, 1.06, p(t, S.G1[0], 2.8, E.linear)) });
    set(pr.d, { s: pop(t, S.G1[0], 0.4), y: wobble(t, 0.6, 3) });
    const doubt = t > K.costo;
    face(pr, t, { look: doubt ? [-8, -2] : [0, 2], brow: doubt ? -8 : 0, seed: 0.6 });
    set(tb, { r: -10 + Math.sin(t * 3) * 6, y: Math.sin(t * 2.4) * 10, s: pop(t, S.G1[0] + 0.15, 0.35), o: t < S.G1[0] + 0.15 ? 0 : 1 });
    set(qm, { s: pop(t, K.costo + 0.1, 0.3), r: 12 + Math.sin(t * 6) * 8, o: t < K.costo + 0.1 ? 0 : 1 });
    stampA(st, t, K.xix, -6, 1);
    set(tc, { y: (1 - p(t, S.G1[0] + 0.1, 0.4, E.outBack)) * 400 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '640px 800px' });
  sceneBg(cam, { background: '#D9CDB4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 80px)' });
  const pr = mk(cam, [420, 420, 520, 664], printerInner(), '0 0 360 460', 'bust'); pr.d.style.zIndex = 5;
  const tb = box(cam, 830, 760, 100, 125, { zIndex: 8 }); tb.innerHTML = typeBlockSvg('¿');
  const tc = box(cam, 400, 1060, 540, 231, { zIndex: 7 }); tc.innerHTML = typeCaseSvg();
  const qm = qMark(cam, 760, 420, 120, PINK);
  const st = stamp(cam, 370, 990, 'SIGLO XIX', { size: 80, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   G2 · «…AÚN SE IMPRIMÍAN LIBROS SIN ELLA.» — la prensa escupe hojas y el «¿» acaba en la papelera
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'se imprimían libros *sin ella*', { size: 84, hlT: K.sin, y: 220 });
{
  const SH_ = [];
  const c = scene(S.G2[0], S.G2[1], t => {
    const cyc = (t * 2.2) % 1, dn = Math.sin(cyc * Math.PI);
    plat.setAttribute('transform', `translate(0 ${f1(dn * 40)})`);
    bar.setAttribute('transform', `rotate(${f1(-dn * 12)} 260 180)`);
    set(prs, { s: pop(t, S.G2[0], 0.35) });
    SH_.forEach(q => { const k = p(t, q.t, 0.45, E.outCubic); set(q.e, { x: lerp(0, q.dx, k), y: lerp(0, q.dy, k) - Math.sin(k * Math.PI) * 140, r: lerp(0, q.r, k), s: lerp(0.5, 1, k), o: t < q.t ? 0 : 1 }); });
    // el tipo «¿» vuela por encima del hombro y cae en la papelera
    const kt = p(t, S.G2[0] + 0.1, 0.9, E.inOutCubic);
    set(tb, { x: lerp(0, -560, kt), y: lerp(0, 560, kt) - Math.sin(kt * Math.PI) * 420, r: kt * 540, o: kt >= 1 ? 0 : 1 });
    set(bin, { s: pop(t, S.G2[0] + 0.2, 0.35), r: kt >= 1 ? Math.sin((t - S.G2[0] - 1) * 30) * 6 * (1 - p(t, S.G2[0] + 1, 0.5)) : 0 });
    stampA(st, t, K.sin, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const prs = box(c, 470, 470, 460, 672, { zIndex: 5 }); prs.innerHTML = pressSvg();
  const plat = prs.querySelector('.plat'), bar = prs.querySelector('.bar');
  [0, 1, 2, 3, 4].forEach(i => { const e = box(c, 560, 900, 200, 264, { zIndex: 9 - i }); e.innerHTML = sheetSvg(i + 3); SH_.push({ e, t: S.G2[0] + 0.25 + i * 0.5, dx: -120 - i * 70 + (i % 2) * 40, dy: -380 + i * 60, r: -14 + i * 8 }); });
  const tb = box(c, 880, 560, 90, 112, { zIndex: 12 }); tb.innerHTML = typeBlockSvg('¿');
  const bin = box(c, 290, 1060, 200, 200, { zIndex: 11 }); bin.innerHTML = binSvg();
  const st = stamp(c, 300, 780, 'SIN «¿»', { size: 110, bw: 16, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   H · «TU QUIJOTE DEL COLE SÍ LA LLEVA: SE LA PUSIERON DESPUÉS.»
   ====================================================================== */
headline(S.H[0], K.si7 - 0.28, 'Tu Quijote *del cole*', { size: 104, hlT: K.cole, y: 230 });
headline(K.si7 - 0.28, S.H[1], 'sí la lleva: *puesta después*', { size: 72, hlT: K.pusieron, y: 230 });
{
  const QY = [];
  const c = scene(S.H[0], S.H[1], t => {
    const k = p(t, S.H[0], 0.4, E.outBack);
    set(bk, { y: (1 - k) * 900, r: -2 + wobble(t, 0.4, 0.6), s: 1 + 0.04 * p(t, S.H[0], 2.6, E.linear) });
    QY.forEach((q, i) => { const tq = K.lleva - 0.25 + i * 0.12; set(q, { s: pop(t, tq, 0.3), o: t < tq ? 0 : 1 }); q.style.background = t > tq ? YEL : 'transparent'; });
    set(ar, { o: t > K.pusieron - 0.1 ? 1 : 0, x: Math.sin(t * 8) * 6 });
    popA(lb, t, K.pusieron, { r: -4 });
    set(bag, { s: pop(t, S.H[0] + 0.2, 0.35), r: 6 + wobble(t, 0.5, 1) });
  }, { clip: true });
  sceneBg(c, { background: '#CFE0EA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 56px)' });
  const bk = box(c, 90, 420, 900, 600, { zIndex: 5 }); bk.innerHTML = schoolBookSvg();
  [[120, 155], [520, 231], [130, 345], [540, 421], [130, 497]].forEach(([x, y]) => {
    const q = el('div', bk, { left: px(x - 34), top: px(y - 52), fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: '84px', color: RED, padding: '0 8px', borderRadius: '10px', zIndex: 3 }, '¿'); QY.push(q);
  });
  const ar = box(c, 560, 1000, 160, 160, { zIndex: 8 }); ar.innerHTML = arrowSvg('M140,150 Q120,60 40,20 M80,14 L40,20 L52,60', PINK, 12);
  const lb = chip(c, 370, 1150, 'AÑADIDOS DESPUÉS', { size: 52, bg: INK, color: YEL, z: 30 });
  const bag = chip(c, 140, 1050, 'edición escolar', { size: 38, bg: '#2f6fb0', color: '#fff', z: 30 });
}

/* ======================================================================
   I1 · «OJO: NO ES SOLO NUESTRA.» — sello OJO
   ====================================================================== */
headline(S.I1[0], S.I1[1], 'No es *solo nuestra*', { size: 108, hlT: K.nuestra, y: 230 });
{
  const c = scene(S.I1[0], S.I1[1], t => {
    stampA(oj, t, K.ojo, -8, 1);
    set(gq, { r: SWING(t), s: pop(t, S.I1[0], 0.35) });
    set(ry, { r: t * 12 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: YEL });
  halftone(c, 'rgba(0,0,0,.10)', 1);
  const ry = rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 1);
  const gq = box(c, 240, 340, 600, 900, { zIndex: 10, transformOrigin: '300px 30px' }); gq.innerHTML = glyphSvg('¿', { fs: 900, base: 640 });
  const oj = stamp(c, 260, 1000, '¡OJO!', { size: 170, bw: 22, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   I2 · «TAMBIÉN LA USA EL ASTURIANO. Y EL GALLEGO LA PERMITE.» — mapa + cameo del emú
   ====================================================================== */
headline(S.I2[0], K.y8 - 0.28, 'También el *asturiano*', { size: 86, hlT: K.asturiano, y: 230 });
headline(K.y8 - 0.28, S.I2[1], 'Y el *gallego* la permite', { size: 84, hlT: K.gallego, y: 230 });
const T_EMU = K.permite + 0.15;
{
  const c = scene(S.I2[0], S.I2[1], t => {
    const kz = p(t, S.I2[0] + 0.1, 0.8, E.inOutCubic);
    set(mp, { s: lerp(1, 1.55, kz), x: lerp(0, 140, kz), y: lerp(0, 160, kz) });
    rA.style.opacity = t > K.asturiano ? 0.85 : 0; rG.style.opacity = t > K.gallego ? 0.85 : 0;
    set(pA, { y: (1 - p(t, K.asturiano, 0.25, E.outBounce)) * -120, o: t < K.asturiano ? 0 : 1 });
    set(pG, { y: (1 - p(t, K.gallego, 0.25, E.outBounce)) * -120, o: t < K.gallego ? 0 : 1 });
    popA(lA, t, K.asturiano + 0.08, { r: -3 });
    popA(lG, t, K.permite - 0.05, { r: 3 });
    // cameo del emú: asoma por abajo con un «¿» por sombrero y mira a cámara ~0,6 s
    const ke = p(t, T_EMU - 0.15, 0.22, E.outBack) * (1 - p(t, T_EMU + 0.6, 0.2, E.inCubic));
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
    set(emu.d, { y: (1 - ke) * 420 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU && t < T_EMU + 0.3 ? 0.5 : 0 });
  }, { clip: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '200px 470px' });
  const ms = box(mp, 0, 0, 1080, 1920, { zIndex: 1 }); ms.innerHTML = spainMapSvg();
  const rA = ms.querySelector('.rAST'), rG = ms.querySelector('.rGAL');
  const ppA = mPj(-5.9, 43.3).map(Number), ppG = mPj(-8.0, 42.8).map(Number);
  const pA = box(mp, ppA[0] - 15, ppA[1] - 42, 30, 42, { zIndex: 12 }); pA.innerHTML = pinSvg(RED);
  const pG = box(mp, ppG[0] - 15, ppG[1] - 42, 30, 42, { zIndex: 12 }); pG.innerHTML = pinSvg(RED);
  const lA = el('div', c, { left: '420px', top: '430px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', color: INK, background: YEL, border: `5px solid ${INK}`, borderRadius: '18px', padding: '2px 22px 6px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 14, whiteSpace: 'nowrap' }, 'ASTURIANO: ✓');
  const lG = el('div', c, { left: '120px', top: '900px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', color: INK, background: PINK, border: `5px solid ${INK}`, borderRadius: '18px', padding: '2px 22px 6px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 14, whiteSpace: 'nowrap' }, 'GALLEGO: opcional');
  const emuW = box(c, 600, 880, 320, 430, { overflow: 'hidden', zIndex: 30 });
  const emu = mkEmuF(emuW, [30, 40, 260, 390]);
  el('div', emu.d, { left: '86px', top: '-60px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3, transform: 'rotate(-10deg)' }, '¿');
}

/* ======================================================================
   J1 · «HOY ES OBLIGATORIA.» — vuelve el emblema + sello
   ====================================================================== */
headline(S.J1[0], S.J1[1], 'Hoy es *obligatoria*', { size: 108, hlT: K.oblig, y: 230 });
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(em, { s: pop(t, S.J1[0], 0.4) * 0.9, r: wobble(t, 0.5, 1) });
    set(ry, { r: -t * 12 });
    stampA(st, t, K.oblig, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  const ry = rays(c, -160, 160, 1400, 28, 'rgba(200,16,46,.10)', 'rgba(0,0,0,0)', 0);
  const em = box(c, 340, 400, 480, 512, { zIndex: 5 }); em.innerHTML = emblemSvg();
  const st = stamp(c, 300, 800, 'LA RAE: OBLIGATORIA', { size: 46, bw: 10, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   J2 · «Y LA ACADEMIA AVISA: NO VALE QUITARLA…» — unas tijeras van a por el «¿» y el sello las frena
   ====================================================================== */
headline(S.J2[0], K.novale - 0.28, 'La Academia *avisa*:', { size: 104, hlT: K.avisa, y: 230 });
headline(K.novale - 0.28, S.J2[1], 'No vale *quitarla*', { size: 116, hlT: K.quitarla, y: 230 });
{
  const c = scene(S.J2[0], S.J2[1], t => {
    set(strip, { s: pop(t, S.J2[0], 0.35), r: -2 + wobble(t, 0.5, 0.5) });
    // tijeras: se acercan al «¿», el sello las bloquea y salen despedidas
    const ka = p(t, S.J2[0] + 0.2, K.novale - S.J2[0] - 0.2, E.inOutCubic);
    const kb = p(t, K.novale + 0.05, 0.5, E.inCubic);
    const snip = Math.abs(Math.sin(t * 14)) * 10;
    set(sc, { x: lerp(560, 140, ka) + kb * 900, y: lerp(-240, 0, ka) - kb * 600, r: -20 + snip - kb * 300, o: 1 });
    stampA(nv, t, K.novale, -8, 1);
    set(qg, { r: t > K.novale ? Math.sin(t * 10) * 6 : 0, s: t > K.quitarla ? 1 + 0.12 * Math.sin(t * 8) : 1 });
    set(sh, { o: t > K.quitarla ? 1 : 0, r: t * 60 });
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0', backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.05) 0 3px, transparent 3px 40px)' });
  const strip = el('div', c, { left: '360px', top: '560px', width: '560px', height: '200px', background: CREAM, border: `6px solid ${INK}`, borderRadius: '26px', boxShadow: `8px 9px 0 ${SH}`, zIndex: 8 });
  const qg = el('div', strip, { left: '20px', top: '10px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', lineHeight: '170px', color: RED, zIndex: 3 }, '¿');
  el('div', strip, { left: '110px', top: '10px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: '170px', color: INK, whiteSpace: 'nowrap' }, 'vienes?');
  const sh = el('div', c, { left: '380px', top: '470px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 12 }, '✦');
  const sc = box(c, 280, 520, 320, 160, { zIndex: 20 }); sc.innerHTML = scissorsSvg();
  const nv = stamp(c, 330, 790, 'NO VALE', { size: 100, bw: 16, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   J3 · «…POR IMITAR A OTRAS LENGUAS.» — el «?» suelto de fuera recibe la patada
   ====================================================================== */
headline(S.J3[0], S.J3[1], 'por *imitar* a otras lenguas', { size: 86, hlT: K.imitar, y: 230 });
{
  const c = scene(S.J3[0], S.J3[1], t => {
    set(big, { s: pop(t, S.J3[0], 0.35), r: t > K.lenguas - 0.1 ? -18 * p(t, K.lenguas - 0.1, 0.15) * (1 - p(t, K.lenguas + 0.2, 0.3)) : SWING(t) * 0.5 });
    const kk = p(t, K.lenguas, 0.55, E.inCubic);
    set(lone, { x: lerp(0, 700, kk), y: -Math.sin(kk * Math.PI) * 500 + kk * 200, r: kk * 720, s: pop(t, S.J3[0] + 0.2, 0.35), o: t < S.J3[0] + 0.2 ? 0 : 1 });
    set(cp, { s: pop(t, K.imitar + 0.05, 0.3), o: t < K.imitar + 0.05 || t > K.lenguas + 0.1 ? 0 : 1, r: -4 });
    set(boom, { s: pop(t, K.lenguas, 0.25), o: t > K.lenguas && t < K.lenguas + 0.5 ? 1 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const big = box(c, 200, 330, 420, 630, { zIndex: 8, transformOrigin: '210px 600px' }); big.innerHTML = glyphSvg('¿', { fs: 640, base: 520, col: RED });
  const lone = el('div', c, { left: '700px', top: '640px', width: '170px', height: '200px', background: '#d8d4cc', border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '190px', color: '#6a6660', zIndex: 9 }, '?');
  const cp = chip(c, 600, 880, '«?» a secas', { size: 44, bg: INK, color: '#fff', z: 20 });
  const boom = el('div', c, { left: '520px', top: '480px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: YEL, textShadow: OUTL(INK, 6), zIndex: 30 }, '¡FUERA!');
}

/* ======================================================================
   K1 · «ASÍ QUE, EN EL CHAT… CERVANTES TENÍA EXCUSA.» — chat sin «¿» y Cervantes señalándolo
   ====================================================================== */
headline(S.K1[0], K.cerv10 - 0.28, 'Así que, en el *chat*…', { size: 100, hlT: K.chat, y: 200 });
headline(K.cerv10 - 0.28, S.K1[1], 'Cervantes tenía *excusa*', { size: 80, hlT: K.excusa, y: 200 });
{
  const c = scene(S.K1[0], S.K1[1], t => {
    const kz = p(t, K.cerv10 - 0.1, 0.4, E.inOutCubic);
    set(cam, { s: lerp(1, 1.12, kz), x: lerp(0, 40, kz) });
    set(ph, { y: (1 - p(t, S.K1[0], 0.35, E.outBack)) * 900, r: -2 + wobble(t, 0.4, 0.4) });
    set(m1, { s: pop(t, K.chat - 0.05, 0.3), o: t < K.chat - 0.05 ? 0 : 1 });
    set(ty, { o: t > S.K1[0] + 0.2 && t < K.chat - 0.05 ? 1 : 0 });
    ty.textContent = '•'.repeat(1 + Math.floor(t * 5) % 3);
    set(gh, { o: t > K.chat + 0.3 ? (Math.floor(t * 5) % 2 ? 1 : 0.3) : 0 });
    // Cervantes asoma por el borde del móvil y señala la burbuja
    const kc = p(t, K.cerv10 - 0.05, 0.35, E.outBack);
    set(cv.d, { x: (1 - kc) * -520, r: 8 - kc * 4 + wobble(t, 0.6, 1) });
    face(cv, t, { look: [8, -4], brow: t > K.excusa ? -10 : 0, seed: 1.7 });
    set(hand, { o: kc > 0.5 ? 1 : 0, x: Math.sin(t * 9) * 8 });
    popA(ex, t, K.excusa, { r: -5 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 700px' });
  sceneBg(cam, { background: '#CFE0EA' });
  const ph = box(cam, 300, 380, 480, 938, { zIndex: 5 });
  ph.innerHTML = phoneSvg(`<rect x="22" y="44" width="396" height="90" fill="#e8dcc2" stroke="${INK}" stroke-width="3"/><circle cx="76" cy="89" r="28" fill="#cfc8b8" stroke="${INK}" stroke-width="3"/><circle cx="76" cy="80" r="10" fill="${INK}"/><path d="M58,108 Q76,92 94,108" fill="${INK}"/><rect x="118" y="78" width="140" height="18" rx="9" fill="${INK}" opacity=".35"/>`);
  const m1 = el('div', ph, { left: '50px', top: '300px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '14px 28px 18px', fontFamily: 'Bricolage', fontWeight: 700, fontSize: '58px', color: INK, whiteSpace: 'nowrap', boxShadow: `5px 5px 0 ${SH}`, zIndex: 4 }, 'vienes mañana?');
  const gh = el('div', ph, { left: '14px', top: '240px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '¿?');
  const ty = el('div', ph, { left: '50px', top: '420px', background: '#fff', border: `4px solid ${INK}`, borderRadius: '24px', padding: '0 22px 6px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: INK, zIndex: 4 }, '•••');
  const cv = mkCerv(cam, [20, 760, 420, 537]); cv.d.style.zIndex = 8;
  const hand = box(cam, 290, 760, 150, 150, { zIndex: 9 }); hand.innerHTML = `<svg viewBox="-70 -70 140 140" width="150" height="150" style="overflow:visible">${gloveHand(0, 0, 50, 1.3)}</svg>`;
  const ex = stamp(c, 300, 1130, 'ÉL TENÍA EXCUSA', { size: 56, bw: 9, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   K3 · GOLPE ROSA: «TÚ, NO.» — sello «SIN EXCUSA» sobre la burbuja
   ====================================================================== */
colorHit(S.K3[0], S.K3[1], PINK, c => {
  const big = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '210px', color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10, whiteSpace: 'nowrap' }, 'Tú, no.');
  const bb = el('div', c, { left: '220px', top: '620px', background: '#fff', border: `6px solid ${INK}`, borderRadius: '34px 34px 34px 8px', padding: '18px 36px 22px', fontFamily: 'Bricolage', fontWeight: 700, fontSize: '70px', color: INK, whiteSpace: 'nowrap', boxShadow: `8px 8px 0 ${INK}`, zIndex: 8 }, 'vienes mañana?');
  const st = stamp(c, 150, 780, 'SIN EXCUSA', { size: 110, bw: 18, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  return t => {
    set(big, { s: pop(t, K.tu10 - 0.04, 0.3), r: -3, o: t < K.tu10 - 0.04 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.no10, 0.3) ? glitch(t, K.no10, 0.3) + ', ' : '') + OUTL(INK, 10);
    set(bb, { s: pop(t, S.K3[0], 0.3), r: -2 });
    stampA(st, t, K.no10, -9, 1);
  };
});

/* ======================================================================
   K4 · «¿QUÉ FALTA NO LE PERDONAS A NADIE? OS LEO.» — burbujas vacías que se llenan de «…»
   ====================================================================== */
{
  const QB = [];
  const c = scene(S.K4[0], S.K4[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(dHL, t, K.perdonas, 0.3);
    QB.forEach(q => { set(q.e, { s: pop(t, q.t, 0.3), r: q.r + Math.sin(t * 5 + q.t * 7) * 3, o: t < q.t ? 0 : 1 }); q.tx.textContent = '.'.repeat(1 + ((Math.floor((t - q.t) * 4 + 3) % 3) + 3) % 3); });
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(255,62,165,.10)', 0);
  const l1 = el('div', c, { left: 0, top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '88px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '316px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '88px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = []; const iq = find('que falta no le perdonas a nadie');
  [['¿Qué', l1], ['falta', l1], ['no', l1], ['le', l2], ['perdonas', l2], ['a', l2], ['nadie?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 4) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('perdonas', 'dhl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[iq + k].s }); });
  const dHL = c.querySelector('.dhl');
  const BP = [[110, 500, K.que10 + 0.1], [560, 540, K.falta], [300, 700, K.perdonas - 0.1], [640, 760, K.perdonas + 0.2], [110, 900, K.nadie - 0.05], [500, 960, K.nadie + 0.3]];
  BP.forEach((q, i) => { const e = bubble(c, q[0], q[1], '', { size: 120, tail: i % 2 ? 'br' : 'bl', z: 25, pad: '0px 60px 22px', bg: i % 2 ? '#fff' : '#FFF3A8' }); const tx = document.createElement('span'); tx.textContent = '…'; e.insertBefore(tx, e.lastChild); QB.push({ e, tx, t: q[2], r: (i % 2 ? 1 : -1) * 5 }); });
  const ol = chip(c, 560, 1170, 'Os leo 👇', { size: 70, bg: PINK, z: 40 });
  const hand = box(c, 420, 1160, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN (última frase) — del Ep. 23
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    const ex = 0;
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto ? 6 : 0, bR: fanFast ? 8 : t > K.esto ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
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
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (centrado) y el Vecino dice adiós con el abanico
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // al cerrarse, el libro (que solo ocupa la mitad derecha) se desplaza para quedar centrado
    set(bookW, { x: 210 * 1.25 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.25 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    // el Vecino asoma tras el libro y dice adiós con el abanico (rima con la mano de la portada)
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const vb = mk(bookW, [140, 400, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">SIGNOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">¿ ? ¡ !</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1292px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 29 · Interrogación</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
