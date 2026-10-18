/* Ep. 29 · escenas L0–L5 (todo clavado por texto vía K) */
const SWING = t => Math.sin(t * Math.PI * 2 * 1.0) * 8; // péndulo ±8°, 1 ciclo/s

/* ======================================================================
   A0 · PORTADA — «¿» gigante que se balancea + Cervantes asomando por la curva + «¿CERVANTES NO LO PONÍA?»
   ====================================================================== */
{
  const c = scene(S.A0[0], S.A0[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, 0, 1.2, E.linear) });
    set(ry, { r: t * 10 });
    set(gq, { r: SWING(t) });
    set(cv.d, { x: Math.sin(t * 2.2) * 6, y: wobble(t, 0.6, 4), r: -6 + Math.sin(t * 2.2) * 2 });
    face(cv, t, { look: [-7, -4], brow: -6, seed: 0.4 });
    set(l1, { r: -1.5 + wobble(t, 0.5, 0.6), s: 1 + 0.025 * Math.sin(t * 3.4) });
    set(l2, { r: 1.2 + wobble(t, 0.45, 0.6, 1), s: 1 + 0.025 * Math.sin(t * 3.4 + 1) });
    set(qs, { y: Math.sin(t * 5) * 10, r: 10 + Math.sin(t * 4) * 6 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 66%, rgba(255,230,0,.45), rgba(255,230,0,0) 52%)' });
  const ry = rays(cam, -160, 300, 1400, 26, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 300, 1080, `¿${hlSpan('CERVANTES', 'hc0')}`, { fontSize: '138px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 40, whiteSpace: 'nowrap' });
  l1.querySelector('.hc0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const l2 = BIGT(cam, 0, 492, 1080, 'NO LO PONÍA?', { fontSize: '120px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 40, whiteSpace: 'nowrap' });
  // Cervantes detrás del signo, asomando por la curva de abajo
  const cv = mkCerv(cam, [500, 900, 470, 600]); cv.d.style.zIndex = 8;
  const gq = box(cam, 110, 640, 640, 960, { zIndex: 10, transformOrigin: '320px 40px' }); gq.innerHTML = glyphSvg('¿', { fs: 960, base: 720 });
  const qs = qMark(cam, 790, 600, 130, PINK); qs.style.zIndex = 12;
}

/* ======================================================================
   A1 · «TÚ LA ABRES» — un pulgar teclea «¿» en el móvil
   ====================================================================== */
headline(S.A1[0], S.A1[1], 'Tú la *abres*', { size: 120, hlT: K.abres, y: 250 });
{
  const c = scene(S.A1[0], S.A1[1], t => {
    const k = p(t, S.A1[0], 0.3, E.outBack);
    set(ph, { y: (1 - k) * 700, r: -4 + wobble(t, 0.5, 0.6) });
    const tap = t > K.abres - 0.12 && t < K.abres + 0.05;
    set(th, { y: tap ? 18 : 0 });
    set(ink, { s: pop(t, K.abres, 0.3), o: t < K.abres ? 0 : 1 });
    set(cur, { o: Math.floor(t * 4) % 2 ? 1 : 0, x: t > K.abres ? 50 : 0 });
    set(bigQ, { s: pop(t, K.abres + 0.03, 0.35), r: SWING(t), o: t < K.abres + 0.03 ? 0 : 1 });
    set(ring, { s: 0.6 + p(t, K.abres - 0.1, 0.4) * 1.2, o: t > K.abres - 0.1 && t < K.abres + 0.3 ? 1 - p(t, K.abres - 0.1, 0.4) : 0 });
    set(key, { s: tap ? 1.25 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0', backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const ph = box(c, 320, 430, 440, 860, { zIndex: 5 });
  let keys = ''; const KR = ['qwertyuiop', 'asdfghjklñ', 'zxcvbnm'];
  KR.forEach((r, j) => [...r].forEach((ch, i) => { const x = 40 + i * 37 + j * 14, y = 560 + j * 58; keys += `<rect x="${x}" y="${y}" width="32" height="48" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/><text x="${x + 16}" y="${y + 33}" text-anchor="middle" font-family="Bricolage" font-weight="600" font-size="22" fill="${INK}">${ch}</text>`; }));
  ph.innerHTML = phoneSvg(`<rect x="40" y="420" width="360" height="80" rx="40" fill="#fff" stroke="${INK}" stroke-width="4"/>${keys}`);
  const ink = el('div', ph, { left: '70px', top: '418px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: '76px', color: INK, zIndex: 3 }, '¿');
  const cur = box(ph, 76, 436, 6, 50, { background: PINK, zIndex: 4 });
  const key = el('div', ph, { left: '160px', top: '740px', width: '120px', height: '70px', background: YEL, border: `4px solid ${INK}`, borderRadius: '12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', lineHeight: '64px', textAlign: 'center', color: INK, zIndex: 3, boxShadow: `4px 4px 0 ${INK}` }, '¿');
  const th = box(c, 440, 1210, 200, 200, { zIndex: 8 }); th.innerHTML = `<svg viewBox="-100 -100 200 200" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, -8, 1.5)}</svg>`;
  const ring = box(c, 470, 1160, 120, 120, { zIndex: 9, borderRadius: '50%', border: `8px solid ${PINK}` });
  const bigQ = el('div', c, { left: '700px', top: '330px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '260px', lineHeight: 1, color: RED, textShadow: OUTL(INK, 8), zIndex: 12 }, '¿');
}

/* ======================================================================
   A2 · «CERVANTES, JAMÁS.» — Cervantes niega con la pluma
   ====================================================================== */
headline(S.A2[0], S.A2[1], 'Cervantes, *jamás*', { size: 112, hlT: K.jamas, y: 250 });
{
  const c = scene(S.A2[0], S.A2[1], t => {
    const k = pop(t, S.A2[0], 0.4);
    const no = t > K.jamas - 0.05 ? Math.sin((t - K.jamas) * 18) * 9 * (1 - p(t, K.jamas + 0.4, 0.6)) : 0;
    set(cv.d, { s: k, r: no, y: wobble(t, 0.6, 3) });
    face(cv, t, { look: t > K.jamas ? [0, 0] : [6, -2], brow: t > K.jamas ? -8 : 0, closed: t > K.jamas && t < K.jamas + 0.5, seed: 1.1 });
    set(ql, { r: -20 + Math.sin(t * 16) * (t > K.jamas - 0.1 ? 18 : 3), s: pop(t, S.A2[0] + 0.15, 0.35), o: t < S.A2[0] + 0.15 ? 0 : 1 });
    set(chN, { s: pop(t, K.jamas, 0.3), r: -6, o: t < K.jamas ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const cv = mkCerv(c, [200, 470, 680, 868]); cv.d.style.zIndex = 5; cv.d.style.transformOrigin = '340px 700px';
  const ql = box(c, 760, 600, 150, 300, { zIndex: 7, transformOrigin: '75px 290px' }); ql.innerHTML = quillSvg();
  const chN = stamp(c, 560, 470, '¡NUNCA!', { size: 70, bw: 10, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  chip(c, 330, 1180, 'Miguel de Cervantes', { size: 40, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   B1 · «NI UNA VEZ EN TODO EL QUIJOTE» — página de 1605 y una lupa que solo encuentra «?» al final
   ====================================================================== */
headline(S.B1[0], S.B1[1], 'Ni una vez en el *Quijote*', { size: 76, hlT: K.quijote, y: 220 });
{
  const QL = [];
  const c = scene(S.B1[0], S.B1[1], t => {
    const k = p(t, S.B1[0], 0.35, E.outBack);
    set(pg.wrap, { y: (1 - k) * 900, r: -1.5 + wobble(t, 0.4, 0.4) });
    // la lupa salta de pregunta en pregunta
    const tt = [S.B1[0] + 0.15, K.vez, K.todo || K.quijote - 0.5, K.quijote];
    let li = 0; QL.forEach((q, i) => { if (t > q.t - 0.15) li = i; });
    const q = QL[li], kq = p(t, q.t - 0.25, 0.25, E.inOutCubic), qp = QL[Math.max(0, li - 1)];
    const lx = lerp(qp.lx, q.lx, li ? kq : 1), lyy = lerp(qp.ly, q.ly, li ? kq : 1);
    set(lu, { x: lx, y: lyy + Math.sin(t * 5) * 6, r: -8, o: t < S.B1[0] + 0.1 ? 0 : 1 });
    QL.forEach(q => {
      const on = t > q.t;
      q.qm.style.color = on ? RED : INK;
      set(q.qm, { s: on ? 1 + 0.25 * (1 - p(t, q.t, 0.3)) : 1 });
      set(q.gh, { o: on ? (Math.floor((t - q.t) * 5) % 2 ? 1 : 0.35) : 0, s: pop(t, q.t + 0.05, 0.3) });
    });
    stampA(st, t, K.quijote + 0.05, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#D9CDB4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const pg = paperPiece(c, 120, 380, 840, 880, { seed: 16, bg: '#F3E6C6' });
  el('div', pg.inner, { left: 0, top: '28px', width: '822px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '44px', color: INK, letterSpacing: '0.06em' }, 'DON QVIXOTE');
  el('div', pg.inner, { left: 0, top: '84px', width: '822px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'Madrid · año 1605');
  box(pg.inner, 60, 136, 702, 4, { background: INK });
  const r = rng(29); const qlines = [2, 6, 10];
  for (let i = 0; i < 13; i++) {
    const y = 170 + i * 50;
    if (qlines.includes(i)) {
      const k = qlines.indexOf(i), w = 380 + k * 70;
      // hueco del principio: aquí iría «¿»
      const gh = el('div', pg.inner, { left: '50px', top: px(y - 26), fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 4 }, '¿');
      box(pg.inner, 50, y - 18, 44, 52, { border: `4px dashed ${PINK}`, borderRadius: '8px', zIndex: 3 });
      box(pg.inner, 110, y, w, 12, { background: INK, opacity: 0.55, borderRadius: '6px' });
      const qm = el('div', pg.inner, { left: px(118 + w), top: px(y - 30), fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: INK, zIndex: 4 }, '?');
      QL.push({ gh, qm, t: [K.vez - 0.1, K.todo || (K.quijote - 0.45), K.quijote - 0.05][k], lx: 120 + 118 + w - 120, ly: 380 + y - 110 });
    } else box(pg.inner, 60, y, 560 + r() * 140, 12, { background: INK, opacity: 0.4, borderRadius: '6px' });
  }
  const lu = box(c, 0, 0, 300, 300, { zIndex: 20 }); lu.innerHTML = lupaSvg();
  const st = stamp(c, 300, 1000, '0 × «¿»', { size: 110, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   B2 · «Y NO, NO ERA UN DESCUIDADO.» — Cervantes se ofende (y habla sin abrir la pregunta)
   ====================================================================== */
headline(S.B2[0], S.B2[1], 'No era un *descuidado*', { size: 96, hlT: K.descuidado, y: 230 });
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(cam, { s: lerp(1, 1.08, p(t, S.B2[0], 2.4, E.linear)) });
    const off = t > K.no1 - 0.05;
    set(cv.d, { s: pop(t, S.B2[0], 0.35), r: off ? -6 * p(t, K.no1, 0.3, E.outBack) : 0, y: wobble(t, 0.6, 3) - (off ? 16 : 0) });
    face(cv, t, { look: off ? [-8, -3] : [4, 0], brow: off ? -12 : 0, half: t > K.descuidado, seed: 2.2 });
    set(bb, { s: pop(t, K.descuidado - 0.05, 0.35), r: 3 + wobble(t, 0.6, 1.2), o: t < K.descuidado - 0.05 ? 0 : 1 });
    set(ar, { o: t > K.descuidado + 0.25 ? 1 : 0, x: Math.sin(t * 8) * 6 });
    set(pf, { s: pop(t, K.no1, 0.3), o: t < K.no1 ? 0 : 1, y: -p(t, K.no1, 1.2) * 40 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EFE1C6' });
  halftone(cam, 'rgba(200,16,46,.07)', 0);
  const cv = mkCerv(cam, [80, 560, 600, 767]); cv.d.style.zIndex = 5;
  const bb = bubble(cam, 330, 440, 'descuidado… <i>yo?</i>', { size: 66, tail: 'bl', z: 30, bg: '#fff' });
  const ar = box(cam, 230, 500, 140, 120, { zIndex: 31 }); ar.innerHTML = arrowSvg('M10,110 Q40,30 110,10', PINK, 10);
  const nt = chip(cam, 90, 610, 'sin «¿»', { size: 40, bg: PINK, z: 32 }); SC[SC.length - 1].fn = (f => t => { f(t); set(nt, { s: pop(t, K.descuidado + 0.25, 0.3), r: 4, o: t < K.descuidado + 0.25 ? 0 : 1 }); })(SC[SC.length - 1].fn);
  const pf = el('div', cam, { left: '640px', top: '760px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: RED, textShadow: `3px 3px 0 ${INK}`, zIndex: 20 }, '¡hum!');
}

/* ======================================================================
   C · «ES QUE NO EXISTÍA.» — el «¿» se borra como tiza + sello
   ====================================================================== */
{
  const c = scene(S.C[0], S.C[1], t => {
    const ke = p(t, S.C[0] + 0.05, 0.55, E.inOutCubic);
    set(er, { x: lerp(-60, 660, ke), y: Math.sin(ke * Math.PI * 5) * 120, r: -14 });
    wipe.style.width = px(f1(lerp(0, 760, ke)));
    stampA(st, t, K.existia, -9, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f3a33', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 9px)' });
  box(c, 40, 300, 1000, 1000, { border: `26px solid ${WOOD}`, boxShadow: `inset 0 0 0 6px ${INK}, 0 0 0 6px ${INK}`, zIndex: 1 });
  const gq = el('div', c, { left: '200px', top: '340px', width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '820px', lineHeight: '900px', color: '#f1ede2', opacity: 0.92, zIndex: 2 }, '¿');
  const wipe = box(c, 200, 360, 0, 900, { background: '#2f3a33', zIndex: 3 });
  const er = box(c, 160, 700, 260, 150, { zIndex: 6 });
  er.innerHTML = `<svg viewBox="0 0 260 150" width="260" height="150" style="overflow:visible">${cut('<rect x="10" y="20" width="240" height="110" rx="14"/>', 5, 7)}<rect x="10" y="20" width="240" height="70" rx="14" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="10" y="80" width="240" height="50" rx="8" fill="#e8e2d4" stroke="${INK}" stroke-width="5"/><rect x="10" y="20" width="240" height="70" fill="url(#hW)" opacity=".4"/></svg>`;
  const st = stamp(c, 150, 760, 'NO EXISTÍA', { size: 108, bw: 14, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}

/* ======================================================================
   D1 · «LA SACÓ LA REAL ACADEMIA» — emblema del crisol
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'La *Real Academia*', { size: 112, hlT: K.academia, y: 230 });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(em, { s: pop(t, S.D1[0] + 0.02, 0.45) * (1 + 0.04 * p(t, S.D1[0], 1.4, E.linear)), r: wobble(t, 0.5, 1), o: t < S.D1[0] + 0.02 ? 0 : 1 });
    set(ry, { r: t * 12 });
    popA(lb, t, K.academia, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  const ry = rays(c, -160, 160, 1400, 28, 'rgba(201,162,74,.20)', 'rgba(0,0,0,0)', 0);
  const em = box(c, 300, 420, 640, 683, { zIndex: 5 }); em.innerHTML = emblemSvg();
  const lb = chip(c, 330, 1150, 'Real Academia Española', { size: 42, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   D2 · «EN MIL SETECIENTOS CINCUENTA Y CUATRO» — sello «1754» directo (sin contador)
   ====================================================================== */
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(bk, { y: (1 - p(t, S.D2[0], 0.35, E.outBack)) * 900, r: 4 + wobble(t, 0.5, 0.8) });
    stampA(st, t, K.mil + 0.02, -7, 1);
    set(rd, { o: t > K.cuatro + 0.1 ? 1 : 0, s: pop(t, K.cuatro + 0.1, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.08)', 0);
  const bk = box(c, 480, 640, 400, 533, { zIndex: 4 }); bk.innerHTML = oldBookSvg('ORTOGRAFÍA', 'R. Academia');
  const st = stamp(c, 150, 330, '1754', { size: 260, bw: 22, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal', font: 'Playfair' });
  st.style.fontWeight = 900;
  const rd = chip(c, 440, 1210, 'la propone la RAE', { size: 40, bg: PINK, z: 30 });
}

/* ======================================================================
   D3 · «LA DE CERRAR… PUESTA DEL REVÉS» — el «?» gira 180° y se convierte en «¿»
   ====================================================================== */
headline(S.D3[0], K.puesta - 0.28, 'La de *cerrar*…', { size: 110, hlT: K.cerrar, y: 220 });
headline(K.puesta - 0.28, S.D3[1], '…puesta *del revés*', { size: 110, hlT: K.reves, y: 220 });
{
  const c = scene(S.D3[0], S.D3[1], t => {
    const kr = p(t, K.puesta - 0.02, 0.55, E.inOutCubic);           // giro de 180°
    const kf = p(t, K.reves + 0.05, 0.4, E.inOutCubic);              // vuela al principio de la frase
    set(gq, { r: kr * 180 + (kr === 0 ? SWING(t) * 0.5 : 0), s: lerp(1, 0.22, kf) * pop(t, S.D3[0], 0.35), x: lerp(0, -260, kf), y: lerp(0, 452, kf) });
    gq.style.filter = kr > 0 && kr < 1 ? 'none' : 'none';
    set(lb1, { s: pop(t, K.cerrar, 0.3), o: t < K.cerrar || t > K.puesta ? 0 : 1, r: -4 });
    set(lb2, { s: pop(t, K.puesta + 0.5, 0.3), o: t < K.puesta + 0.5 || t > K.reves + 0.05 ? 0 : 1, r: 4 });
    set(arc, { o: kr > 0.02 && kr < 0.98 ? 1 : 0, r: kr * 180 });
    set(strip, { o: t > K.reves - 0.1 ? 1 : 0, y: (1 - p(t, K.reves - 0.1, 0.3, E.outBack)) * 60 });
    set(sp, { s: kf > 0.95 ? 1 + 0.3 * (1 - p(t, K.reves + 0.45, 0.3)) : 0, o: kf > 0.95 ? 1 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 3px, transparent 3px 50px)' });
  const arc = box(c, 230, 380, 620, 620, { zIndex: 3, transformOrigin: '310px 310px' });
  arc.innerHTML = arrowSvg('M60,310 A250,250 0 0,1 560,310 M520,250 L560,310 L610,250', PINK, 14);
  const gq = box(c, 300, 380, 400, 600, { zIndex: 10, transformOrigin: '200px 330px' }); gq.innerHTML = glyphSvg('?', { fs: 640, base: 560 });
  const lb1 = chip(c, 580, 960, 'DE CERRAR', { size: 50, bg: INK, color: '#fff', z: 30 });
  const lb2 = chip(c, 520, 960, 'DEL REVÉS = ¿', { size: 50, bg: RED, color: '#fff', z: 30 });
  const strip = el('div', c, { left: '380px', top: '760px', width: '560px', height: '170px', background: CREAM, border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `8px 9px 0 ${SH}`, zIndex: 8 });
  el('div', strip, { left: '150px', top: '18px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', lineHeight: '120px', color: INK, whiteSpace: 'nowrap' }, 'vienes?');
  const sp = el('div', c, { left: '398px', top: '700px', fontSize: '60px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 12 }, '✦');
}

/* ======================================================================
   E1 · GOLPE AMARILLO: «¿PARA QUÉ?»
   ====================================================================== */
colorHit(S.E1[0], S.E1[1], YEL, c => {
  const big = el('div', c, { left: 0, top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: '200px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, '¿PARA<br>QUÉ?');
  const a = el('div', c, { left: '40px', top: '260px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '300px', color: INK, opacity: 0.18, zIndex: 2 }, '¿');
  const b = el('div', c, { left: '760px', top: '960px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '300px', color: INK, opacity: 0.18, zIndex: 2 }, '?');
  return t => {
    const kb = p(t, S.E1[0], 0.2, E.outBack);
    set(big, { s: lerp(1.5, 1, kb), r: -3, o: 1 });
    big.style.textShadow = glitch(t, K.para + 0.1, 0.25) || 'none';
    set(a, { r: SWING(t) * 2 }); set(b, { r: -SWING(t) * 2 });
  };
});

/* ======================================================================
   E2 · «DI EN VOZ ALTA» — el Vecino habla con ondas de sonido
   ====================================================================== */
headline(S.E2[0], S.E2[1], 'Di en voz *alta*:', { size: 116, hlT: K.alta, y: 230 });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(vb.d, { s: pop(t, S.E2[0], 0.35), y: wobble(t, 0.6, 3) });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 10, bR: 10, fan: wobble(t, 0.9, 6), seed: 0.9 });
    WV.forEach((w, i) => { const ph = ((t * 1.6 + i / 3) % 1); set(w, { s: 0.6 + ph * 0.8, o: (1 - ph) * (t > K.di ? 1 : 0) }); });
    popA(ch, t, K.voz, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE' });
  const vb = mk(c, [150, 470, 600, 743], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 5;
  const WV = [0, 1, 2].map(i => { const d = box(c, 640, 560, 300, 400, { zIndex: 6, transformOrigin: '0px 200px' }); d.innerHTML = `<svg width="300" height="400" style="overflow:visible"><path d="M40,60 Q160,200 40,340" stroke="${INK}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M40,60 Q160,200 40,340" stroke="${PINK}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`; return d; });
  const ch = chip(c, 380, 1170, '🔊 DILO EN VOZ ALTA', { size: 44, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   E3 · «TIENES HAMBRE.» / «¿TIENES HAMBRE?» — el tono dibujado como una curva
   ====================================================================== */
{
  const c = scene(S.E3[0], S.E3[1], t => {
    set(b1, { s: pop(t, K.tienes1 - 0.04, 0.35), r: -2 + wobble(t, 0.5, 0.6), o: t < K.tienes1 - 0.04 ? 0 : (t > K.y4 ? 0.55 : 1) });
    c1.style.strokeDashoffset = f1(1000 * (1 - p(t, K.tienes1, K.hambre1e - K.tienes1 + 0.1, E.linear)));
    set(t1, { o: t > K.hambre1e - 0.1 ? 1 : 0, s: pop(t, K.hambre1e - 0.1, 0.3) });
    set(b2, { s: pop(t, K.tienes2 - 0.06, 0.35), r: 2 + wobble(t, 0.5, 0.6, 1), o: t < K.tienes2 - 0.06 ? 0 : 1 });
    c2.style.strokeDashoffset = f1(1000 * (1 - p(t, K.tienes2, K.hambre2e - K.tienes2 + 0.1, E.linear)));
    set(t2, { o: t > K.hambre2e - 0.1 ? 1 : 0, s: pop(t, K.hambre2e - 0.1, 0.3) });
    set(ya, { s: pop(t, K.y4, 0.3), o: t < K.y4 || t > K.tienes2 ? 0 : 1, r: -4 });
    set(note1, { o: t > K.tienes1 && t < K.y4 ? 1 : 0, y: Math.sin(t * 6) * 8 });
    set(note2, { o: t > K.tienes2 ? 1 : 0, y: Math.sin(t * 6 + 1) * 8 });
    q1.forEach(q => set(q, { s: pop(t, K.tienes2 - 0.02, 0.3), o: t < K.tienes2 - 0.02 ? 0 : 1 }));
    q2.forEach(q => set(q, { s: pop(t, K.hambre2e - 0.05, 0.3), o: t < K.hambre2e - 0.05 ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 60px)' });
  // tono 1: plano y cae al final
  const cv1 = box(c, 120, 400, 840, 200, { zIndex: 6 });
  cv1.innerHTML = `<svg width="840" height="200" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="cvA" d="M20,70 C200,66 420,66 560,80 C660,92 720,130 800,170" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`;
  const c1 = cv1.querySelector('path');
  const t1 = box(c, 860, 530, 90, 90, { zIndex: 7 }); t1.innerHTML = arrowSvg('M10,10 L70,70 M30,70 L70,70 L70,30', INK, 10);
  const b1 = bubble(c, 150, 600, 'tienes hambre.', { size: 104, tail: 'bl', z: 20, bg: '#fff' });
  const note1 = chip(c, 140, 340, '↘ afirmas', { size: 44, bg: INK, color: '#fff', z: 25 });
  // tono 2: plano y SUBE al final
  const cv2 = box(c, 120, 800, 840, 200, { zIndex: 6 });
  cv2.innerHTML = `<svg width="840" height="200" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M20,170 C200,166 420,166 560,150 C660,138 720,90 800,20" stroke="${PINK}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`;
  const c2 = cv2.querySelector('path');
  const t2 = box(c, 860, 790, 90, 90, { zIndex: 7 }); t2.innerHTML = arrowSvg('M10,70 L70,10 M30,10 L70,10 L70,50', PINK, 12);
  const b2 = bubble(c, 100, 1010, '<span class="qa">¿</span>tienes hambre<span class="qb">?</span>', { size: 104, tail: 'bl', z: 20, bg: '#FFF3A8' });
  const q1 = [b2.querySelector('.qa')], q2 = [b2.querySelector('.qb')];
  [...q1, ...q2].forEach(q => { q.style.display = 'inline-block'; q.style.color = RED; });
  const note2 = chip(c, 560, 1200, '↗ preguntas', { size: 48, bg: PINK, color: '#fff', z: 25 });
  const gb = bubble(c, 120, 1010, '…?', { size: 104, tail: 'bl', z: 19, bg: 'rgba(255,255,255,.35)' }); gb.style.borderStyle = 'dashed'; gb.style.color = 'rgba(43,33,24,.45)';
  SC[SC.length - 1].fn = (f => t => { f(t); set(gb, { o: t > K.hambre1e && t < K.tienes2 - 0.06 ? 1 : 0, s: pop(t, K.hambre1e, 0.3) }); })(SC[SC.length - 1].fn);
  const ya = stamp(c, 500, 820, 'Y AHORA:', { size: 70, bw: 9, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F1 · «MISMAS PALABRAS: SOLO CAMBIA EL TONO.» — los bocadillos coinciden; lo único distinto es la curva
   ====================================================================== */
headline(S.F1[0], ws(find('solo cambia', 52)) - 0.28, '*Mismas* palabras', { size: 116, hlT: K.mismas, y: 230 });
headline(ws(find('solo cambia', 52)) - 0.28, S.F1[1], 'Solo cambia el *tono*', { size: 104, hlT: K.tono, y: 230 });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const km = p(t, S.F1[0] + 0.05, 0.45, E.inOutCubic);
    set(b1, { y: lerp(-60, 0, km), s: pop(t, S.F1[0], 0.3) });
    set(b2, { y: lerp(60, 0, km), s: pop(t, S.F1[0] + 0.08, 0.3) });
    set(lnk, { o: t > S.F1[0] + 0.45 ? 1 : 0 });
    paint(c.querySelector('.fh1'), t, K.palabras, 0.3); paint(c.querySelector('.fh2'), t, K.palabras + 0.1, 0.3);
    set(fl, { o: t > S.F1[0] + 0.5 && t < S.F1[0] + 0.8 ? 1 : 0, s: 1 + p(t, S.F1[0] + 0.5, 0.3) });
    set(eq, { s: pop(t, K.palabras, 0.3), o: t < K.palabras ? 0 : 1, r: -6 });
    const kt = p(t, K.cambia - 0.1, 0.4, E.outBack);
    set(cA, { o: t > K.cambia - 0.1 ? 1 : 0, y: (1 - kt) * 40 });
    set(cB, { o: t > K.cambia - 0.1 ? 1 : 0, y: (1 - kt) * 40, s: t > K.tono ? 1 + 0.08 * Math.sin(t * 10) : 1 });
    set(en, { s: pop(t, K.tono + 0.15, 0.3), o: t < K.tono + 0.15 ? 0 : 1, r: 2 });
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0' });
  const HQ = '<span style="visibility:hidden">¿</span>' + hlSpan('tienes hambre', 'fh1') + '<span style="visibility:hidden">?</span>';
  const b1 = bubble(c, 140, 400, HQ, { size: 100, tail: 'bl', z: 20, bg: '#fff' });
  const b2 = bubble(c, 140, 640, '<span style="color:' + RED + '">¿</span>' + hlSpan('tienes hambre', 'fh2') + '<span style="color:' + RED + '">?</span>', { size: 100, tail: 'bl', z: 21, bg: '#FFF3A8' });
  const lnk = box(c, 0, 0, 1080, 1920, { zIndex: 22 }); lnk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[290, 420, 560, 700].map(x => `<path d="M${x},540 V650" stroke="${PINK}" stroke-width="6" stroke-dasharray="10 8"/>`).join('')}</svg>`;
  const fl = el('div', c, { left: '860px', top: '560px', fontSize: '90px', color: YEL, textShadow: `3px 3px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 30 }, '✦');
  const eq = stamp(c, 180, 830, '= IGUALES', { size: 70, bw: 10, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const cA = box(c, 100, 930, 420, 200, { zIndex: 6 }); cA.innerHTML = `<svg width="420" height="200" style="overflow:visible"><path d="M20,60 C140,58 260,60 330,90 C370,110 390,140 400,170" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/><text x="20" y="190" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">afirmas ↘</text></svg>`;
  const cB = box(c, 560, 930, 420, 200, { zIndex: 6 }); cB.innerHTML = `<svg width="420" height="200" style="overflow:visible"><path d="M20,150 C140,150 260,146 320,120 C360,100 380,60 390,20" stroke="${PINK}" stroke-width="16" fill="none" stroke-linecap="round"/><text x="20" y="196" font-family="Bricolage" font-weight="800" font-size="40" fill="${RED}">preguntas ↗</text></svg>`;
  const en = chip(c, 180, 1150, 'Inglés: you are → are you?', { size: 38, bg: INK, color: '#fff', z: 30 });
}

/* ======================================================================
   F2 · «Y EN UNA FRASE LARGA, TE ENTERABAS AL FINAL.» — teletipo de una frase larguísima sin «¿»
   ====================================================================== */
headline(S.F2[0], K.te5 - 0.28, 'En una frase *larga*…', { size: 104, hlT: K.larga, y: 230 });
headline(K.te5 - 0.28, S.F2[1], 'te enterabas *al final*', { size: 100, hlT: K.final, y: 230 });
{
  const c = scene(S.F2[0], S.F2[1], t => {
    // la frase entra por la derecha y el «?» llega justo en «final»
    const k = p(t, S.F2[0] + 0.05, K.final - S.F2[0] - 0.05, E.linear);
    const W0 = tk.offsetWidth || 3000;
    set(tk, { x: lerp(1080, 760 - W0, k) });
    const got = t > K.final - 0.02;
    set(rd.d, { y: wobble(t, 0.6, 3) - (got ? 30 * p(t, K.final, 0.25, E.outBack) : 0), s: pop(t, S.F2[0], 0.35) });
    face(rd, t, { look: got ? [0, -3] : [Math.sin(t * 3) * 8, -4], brow: got ? -14 : 0, half: !got && t > K.enterabas - 0.3, seed: 0.2 });
    set(dots, { o: !got && t > S.F2[0] + 0.3 ? 1 : 0 });
    dots.textContent = '.'.repeat(1 + Math.floor(t * 4) % 3);
    set(ah, { s: pop(t, K.final, 0.3), o: got ? 1 : 0, r: -6 });
    set(qbig, { s: got ? 1 + 0.4 * (1 - p(t, K.final, 0.3)) : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  box(c, 0, 560, 1080, 200, { background: CREAM, borderTop: `6px solid ${INK}`, borderBottom: `6px solid ${INK}`, zIndex: 3 });
  const tk = el('div', c, { left: '0px', top: '590px', fontFamily: 'SpecialElite', fontSize: '96px', lineHeight: '140px', color: INK, whiteSpace: 'nowrap', zIndex: 5 },
    'y si el sábado por la tarde vamos todos juntos a la feria del pueblo a comer churros con chocolate<span class="qq" style="display:inline-block;font-family:Playfair;font-weight:900;color:' + RED + ';font-size:130px">?</span>');
  const qbig = tk.querySelector('.qq');
  const rd = mk(c, [310, 790, 440, 563], readerInner(), '0 0 360 460', 'bust'); rd.d.style.zIndex = 6;
  const dots = el('div', c, { left: '700px', top: '820px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 8 }, '...');
  const ah = stamp(c, 170, 420, '¡AH, ERA PREGUNTA!', { size: 56, bw: 8, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}
