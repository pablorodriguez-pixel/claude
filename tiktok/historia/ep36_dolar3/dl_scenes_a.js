/* Ep. 36 · escenas L0–L5 (gancho, respuesta, bucle, UNO y DOS) — todo clavado por texto vía K */
const dash = (e, k) => { e.style.strokeDashoffset = f1(1000 * (1 - clamp(k))); };
const SPIN = t => Math.cos(t * 2 * Math.PI * 2 / K.S0); // 2 vueltas exactas hasta «S!», cara a cámara en t=0

/* ======================================================================
   A · PORTADA / GANCHO — «$» gigante que gira como una moneda + «¿EL $ NO ES UNA S?»
   en «S!» la S de imprenta se lleva una X roja
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, 0, 2.5, E.linear) });
    set(ry, { r: t * 10 });
    const cs = SPIN(t), sx = Math.max(0.07, Math.abs(cs));
    set(dol, { y: wobble(t, 0.7, 6), sx });
    dolFace.style.opacity = cs >= 0 ? 1 : 0; dolBack.style.opacity = cs >= 0 ? 0 : 1;
    edge.style.opacity = Math.abs(cs) < 0.2 ? 1 : 0;
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3.4) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3.4 + 1) });
    // la S de imprenta entra en «una» y en «S!» se lleva la X
    const kS = p(t, K.una0 - 0.2, 0.35, E.outBack);
    set(sW, { x: lerp(-420, 0, kS), r: lerp(-30, -6, kS) + (t > K.S0 ? Math.sin((t - K.S0) * 30) * 6 * (1 - p(t, K.S0, 0.5)) : 0), o: t < K.una0 - 0.2 ? 0 : 1 });
    set(xS, { s: t < K.S0 ? 0 : lerp(2.2, 1, p(t, K.S0, 0.16, E.outCubic)), o: t < K.S0 ? 0 : 1 });
    set(no, { s: pop(t, K.S0 + 0.08, 0.3), r: -12, o: t < K.S0 + 0.08 ? 0 : 1 });
    QM.forEach((q, i) => set(q, { y: Math.sin(t * 3 + i * 2) * 14, r: Math.sin(t * 2 + i) * 10, o: 0.95 }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 58%, rgba(255,230,0,.45), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 260, 1400, 26, 'rgba(201,162,74,.16)', 'rgba(0,0,0,0)', 0);
  const DL = `<span style="display:inline-block;color:${YEL};text-shadow:${OUTL(INK, 9)}">$</span>`;
  const l1 = BIGT(cam, 0, 318, 1080, `¿EL ${DL} NO`, { fontSize: '150px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const l2 = BIGT(cam, 0, 488, 1080, `ES UNA <span style="display:inline-block;color:${YEL};text-shadow:${OUTL(INK, 9)}">S</span>?`, { fontSize: '150px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const edge = box(cam, 633, 680, 34, 640, { zIndex: 9 }); edge.innerHTML = coinEdgeSvg();
  const dol = box(cam, 425, 660, 450, 675, { zIndex: 10 }); dol.innerHTML = dollarSvg();
  const dolFace = dol.querySelector('.face'), dolBack = dol.querySelector('.back');
  const sW = box(cam, 110, 820, 250, 283, { zIndex: 12 }); sW.innerHTML = woodLetterSvg('S');
  const xS = box(sW, -20, -10, 290, 300, { zIndex: 13 }); xS.innerHTML = XSVG;
  const no = el('div', cam, { left: '110px', top: '1120px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: RED, textShadow: OUTL(INK, 6).replace(/#2B2118/g, '#fff'), zIndex: 30 }, '¡NO!');
  const QM = [qMark(cam, 830, 700, 120, PINK), qMark(cam, 860, 1100, 90, PINK)];
}

/* ======================================================================
   A2 · «ES UNA PALABRA EN ESPAÑOL» — «$» = cinco fichas en blanco (la pregunta sigue abierta)
   ====================================================================== */
headline(S.A2[0], S.A2[1], 'Es una *palabra* en español', { size: 90, hlT: K.palabra0, y: 196 });
{
  const c = scene(S.A2[0], S.A2[1], t => {
    set(dl, { s: pop(t, S.A2[0], 0.35), r: -4 + wobble(t, 0.5, 2), o: 1 });
    set(eq, { s: pop(t, S.A2[0] + 0.15, 0.3), o: t < S.A2[0] + 0.15 ? 0 : 1 });
    TL.forEach((q, i) => {
      const t0 = K.palabra0 - 0.1 + i * 0.08;
      set(q.e, { s: pop(t, t0, 0.32), y: wobble(t, 0.6, 4, i), r: [-4, 3, -2, 4, -3][i], o: t < t0 ? 0 : 1 });
      q.e.textContent = '?'; q.e.style.color = Math.floor(t * 3 + i) % 2 ? PINK : INK;
    });
    popA(chE, t, K.espanol0, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1D7DC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const dl = box(c, 400, 400, 280, 420, { zIndex: 10 }); dl.innerHTML = dollarSvg();
  const eq = el('div', c, { left: '0', top: '820px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, zIndex: 12 }, '=');
  const TL = letterTiles(c, 164, 960, 5, 136, 16);
  const chE = chip(c, 330, 1170, 'en español', { size: 54, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   B1 · «ESE GARABATO, EN REALIDAD…» — la lupa repasa el «$» de tinta
   ====================================================================== */
headline(S.B1[0], S.B1[1], 'Ese *garabato*…', { size: 104, hlT: K.garabato, y: 196 });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    set(cam, { s: 1.02 + 0.06 * p(t, S.B1[0], 1.6, E.linear) });
    const a = (t - S.B1[0]) * 3.2;
    set(lp, { x: Math.cos(a) * 150, y: Math.sin(a * 1.3) * 200, r: -18 + Math.sin(a) * 6 });
    popA(chG, t, K.garabato + 0.05, { r: -5 });
    QQ.forEach((q, i) => set(q, { s: pop(t, K.realidad + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 10, o: t < K.realidad + i * 0.12 ? 0 : 1 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.3) 0 2px, transparent 2px 70px)' });
  ledgerPage(cam, 130, 380, 820, 880);
  const ink = box(cam, 330, 440, 420, 630, { zIndex: 8 }); ink.innerHTML = inkDollarSvg('#3a2a6a');
  const lp = box(cam, 420, 560, 300, 420, { zIndex: 12 }); lp.innerHTML = lupaSvg();
  const chG = chip(cam, 150, 1120, 'garabato', { size: 54, bg: PINK, z: 30 });
  const QQ = [qMark(cam, 800, 470, 110, PINK), qMark(cam, 200, 560, 90, YEL)];
}

/* ======================================================================
   B2 · «…PONE "PESOS"» — las cinco fichas se dan la vuelta: P E S O S
   ====================================================================== */
headline(S.B2[0], S.B2[1], '…pone *«pesos»*', { size: 110, hlT: K.pesos1, y: 196 });
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(ry, { r: t * 12, o: t > K.pesos1 ? 1 : 0 });
    set(dl, { s: 1 + 0.03 * Math.sin(t * 4), r: 4, o: 1 });
    set(ar, { o: 1, y: Math.sin(t * 8) * 10 });
    'PESOS'.split('').forEach((ch, i) => {
      const tf = K.pesos1 - 0.06 + i * 0.09, k = p(t, tf, 0.22, E.inOutCubic);
      const q = TL[i]; const sxx = Math.abs(Math.cos(k * Math.PI));
      q.e.textContent = k < 0.5 ? '?' : ch;
      q.e.style.background = k < 0.5 ? '#fff' : YEL; q.e.style.color = k < 0.5 ? PINK : INK;
      set(q.e, { sx: Math.max(0.05, sxx), y: (k >= 1 ? -12 * (1 - p(t, tf + 0.22, 0.3)) : 0) + wobble(t, 0.6, 3, i), r: [-4, 3, -2, 4, -3][i] * (k < 1 ? 1 : 0.4) });
    });
    SP.forEach((s, i) => set(s, { o: t > K.pesos1 + 0.4 ? 0.5 + 0.5 * Math.sin(t * 8 + i * 2) : 0, r: t * 90 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1D7DC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const ry = rays(c, -160, 400, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const dl = box(c, 440, 380, 200, 300, { zIndex: 10 }); dl.innerHTML = inkDollarSvg('#3a2a6a');
  const ar = box(c, 480, 720, 120, 150, { zIndex: 11 }); ar.innerHTML = `<svg width="120" height="150" style="overflow:visible"><path d="M60,6 V110 M24,80 L60,124 L96,80" stroke="${INK}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M60,6 V110 M24,80 L60,124 L96,80" stroke="${PINK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const TL = letterTiles(c, 164, 930, 5, 136, 16);
  const SP = [[150, 860], [890, 860], [170, 1160], [880, 1160]].map(q => el('div', c, { left: px(q[0] - 40), top: px(q[1]), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦'));
}

/* ======================================================================
   C1 · «¿CÓMO ACABA UNA PALABRA ESPAÑOLA…» — la pluma escribe «pesos» en un recibo
   ====================================================================== */
headline(S.C1[0], S.C1[1], '¿Cómo acaba una palabra *española*…', { size: 84, hlT: K.espanola3, y: 196 });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    const k = p(t, S.C1[0], 0.35, E.outBack);
    set(pg, { y: (1 - k) * 900, r: lerp(8, -2, k) + wobble(t, 0.4, 0.6) });
    const kw = p(t, S.C1[0] + 0.3, 1.0, E.linear);
    wd.style.clipPath = `inset(0 ${f1(100 * (1 - kw))}% 0 0)`;
    set(ql, { x: 220 + 600 * kw, y: 560 + Math.sin(t * 30) * 6, r: 10, o: t > S.C1[0] + 0.25 && kw < 1 ? 1 : 0 });
    set(cn, { s: pop(t, K.palabra3, 0.35), r: Math.sin(t * 3) * 6, o: t < K.palabra3 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D9B98A', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 6px, transparent 6px 46px)' });
  const pg = box(c, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 800px' });
  ledgerPage(pg, 120, 470, 840, 520);
  const wd = el('div', pg, { left: '120px', top: '560px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '200px', lineHeight: 1, color: '#3a2a6a', zIndex: 6 }, '«pesos»');
  const ql = box(c, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const cn = box(c, 420, 1010, 240, 240, { zIndex: 10 }); cn.innerHTML = pesoCoinSvg('Mº');
}

/* ======================================================================
   C2 · «…EN EL DINERO DE ESTADOS UNIDOS? EN TRES PASOS.» — el billete con «?» y las tres fichas 1·2·3
   ====================================================================== */
headline(S.C2[0], K.en3 - 0.06, '…en el dinero de *EE. UU.*?', { size: 92, hlT: K.estados3, y: 196 });
headline(K.en3 - 0.06, S.C2[1], 'En *tres pasos*', { size: 120, hlT: K.tres3, y: 196 });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    const kb = p(t, S.C2[0], 0.4, E.outBack);
    set(bl, { s: lerp(0.5, 1, kb) * (1 + 0.02 * Math.sin(t * 3)), r: -3 + wobble(t, 0.4, 1.5), o: 1 });
    const kw = p(t, S.C2[0] + 0.2, 0.7, E.inOutCubic);
    set(wd, { x: lerp(-380, 0, kw), y: -Math.sin(kw * Math.PI) * 140, r: lerp(-30, -8, kw), s: lerp(0.8, 1, kw), o: t < S.C2[0] + 0.2 ? 0 : 1 });
    set(qq, { s: pop(t, K.unidos3, 0.3), r: Math.sin(t * 6) * 10, o: t < K.unidos3 ? 0 : 1 });
    N3.forEach((q, i) => { const t0 = K.tres3 - 0.05 + i * 0.12; set(q, { s: pop(t, t0, 0.35) * (1 + 0.04 * Math.sin(t * 5 + i)), r: [-6, 3, 6][i], o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#DCE6EA', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 30px, transparent 30px 60px)' });
  const bl = box(c, 160, 500, 760, 360, { zIndex: 6 }); bl.innerHTML = billSvg();
  const wd = el('div', c, { left: '330px', top: '600px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', color: '#3a2a6a', background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '20px', padding: '0 26px 10px', boxShadow: `7px 8px 0 ${SH}`, zIndex: 12, whiteSpace: 'nowrap' }, '«pesos»');
  const qq = qMark(c, 770, 380, 170, PINK);
  const N3 = ['1', '2', '3'].map((n, i) => el('div', c, { left: px(190 + i * 270), top: '960px', width: '160px', height: '160px', lineHeight: '148px', textAlign: 'center', borderRadius: '50%', background: [PINK, YEL, '#9fd3e0'][i], border: `7px solid ${INK}`, boxShadow: `7px 8px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 20 }, n));
}

/* ======================================================================
   UNO · D1 «HACE TRESCIENTOS AÑOS…» — caen los pesos
   ====================================================================== */
{
  const c = scene(S.D1[0], S.D1[1], t => {
    [[cA, S.D1[0]], [cB, S.D1[0] + 0.08]].forEach(([cn, t0], i) => {
      const k = p(t, t0, 0.55, E.outBounce);
      const spin = t < t0 + 0.6 ? Math.cos((t - t0) * 14) : 1;
      set(cn, { y: lerp(-380, 0, k), sx: Math.max(0.08, Math.abs(spin)), r: (i ? 6 : -6) * (1 - k), o: t < t0 ? 0 : 1 });
    });
    popA(ch3, t, K.trescientos, { r: -4 });
    set(shine, { o: t > S.D1[0] + 0.8 ? 1 : 0, r: t * 120, s: 1 + 0.2 * Math.sin(t * 10) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const cA = box(c, 120, 470, 380, 380, { zIndex: 10 }); cA.innerHTML = pesoCoinSvg('Mº');
  const cB = box(c, 560, 470, 380, 380, { zIndex: 10 }); cB.innerHTML = pesoCoinSvg('Mº');
  const ch3 = chip(c, 300, 900, 'hace 300 años', { size: 66, bg: INK, color: YEL, z: 30 });
  const shine = el('div', c, { left: '840px', top: '440px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦');
}

/* ======================================================================
   UNO · D2 «…LA MONEDA QUE MANDABA EN MEDIO MUNDO» — el globo con galeones
   ====================================================================== */
{
  const SH3 = [];
  const c = scene(S.D2[0], S.D2[1], t => {
    const tl = t - S.D2[0];
    gl.innerHTML = `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible">${globeInner(tl * 1.6)}</svg>`;
    set(glW, { s: 0.85 + 0.15 * p(t, S.D2[0], 0.4, E.outBack), r: Math.sin(t * 1.5) * 3 });
    SH3.forEach((q, i) => { const a = q.a0 + tl * 0.9; set(q.e, { x: Math.cos(a) * q.R, y: Math.sin(a) * q.R * 0.7, r: Math.sin(t * 3 + i) * 5, s: pop(t, S.D2[0] + i * 0.12, 0.35), o: t < S.D2[0] + i * 0.12 ? 0 : 1 }); });
    CO.forEach((q, i) => { const k = ((tl * 1.2 + i * 0.25) % 1); set(q, { x: lerp(-280, 280, k) * (i % 2 ? 1 : -1), y: -Math.sin(k * Math.PI) * 240, r: k * 500, o: Math.sin(k * Math.PI) }); });
    popA(chM, t, S.D2[0] + 0.12, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#C9D3C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const glW = box(c, 260, 440, 560, 560, { zIndex: 4 });
  const gl = box(glW, 0, 0, 560, 560);
  [[0, 330], [2.1, 350], [4.2, 330]].forEach(([a0, R]) => { const e = box(c, 420, 600, 260, 240, { zIndex: 8 }); e.innerHTML = `<svg viewBox="0 0 320 300" width="100%" height="100%" style="overflow:visible">${galleonSvg()}</svg>`; SH3.push({ e, a0, R }); });
  const CO = [0, 1, 2, 3].map(() => { const e = box(c, 495, 680, 90, 90, { zIndex: 9 }); e.innerHTML = pesoCoinSvg(''); return e; });
  const chM = chip(c, 400, 1090, 'en medio mundo', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   UNO · D3 «…ERA EL PESO ESPAÑOL» — la moneda gigante + sello
   ====================================================================== */
{
  const c = scene(S.D3[0], S.D3[1], t => {
    set(ry, { r: t * 8 });
    const k = p(t, S.D3[0], 0.45, E.outBack);
    set(cn, { s: lerp(0.4, 1, k) * (1 + 0.03 * Math.sin(t * 3)), sx: Math.max(0.1, Math.abs(Math.cos((t - S.D3[0]) * 1.4))) * lerp(0.4, 1, k), r: wobble(t, 0.4, 2) });
    stampA(st, t, K.peso4, -8, 1);
    SP.forEach((s, i) => set(s, { o: t > S.D3[0] + 0.3 ? 0.5 + 0.5 * Math.sin(t * 8 + i * 2) : 0, r: t * 90, s: 0.8 + 0.3 * Math.sin(t * 6 + i) }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -160, 160, 1400, 26, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const cn = box(c, 240, 400, 600, 600, { zIndex: 10 }); cn.innerHTML = pesoCoinSvg('Mº');
  const st = stamp(c, 350, 900, 'PESO<br>ESPAÑOL', { size: 100, bw: 14, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const SP = [[180, 450], [840, 520], [860, 900], [170, 880]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦'));
}

/* ======================================================================
   UNO · D4 «Y LOS COMERCIANTES LO ABREVIABAN A MANO» — libro de cuentas con «250 pˢ» y la pluma
   ====================================================================== */
{
  const RW = [];
  const c = scene(S.D4[0], S.D4[1], t => {
    const k = p(t, S.D4[0], 0.35, E.outBack);
    set(lg, { y: (1 - k) * 900, r: lerp(8, -1.5, k) + wobble(t, 0.4, 0.5) });
    RW.forEach((r, i) => { const tw = S.D4[0] + 0.25 + i * 0.32; r.e.style.clipPath = `inset(0 ${f1(100 * (1 - p(t, tw, 0.3, E.linear)))}% 0 0)`; });
    const i = clamp(Math.floor((t - S.D4[0] - 0.25) / 0.32), 0, RW.length - 1), fr = clamp(((t - S.D4[0] - 0.25) % 0.32) / 0.3);
    set(ql, { x: lerp(170, 700, fr) - 60, y: 520 + i * 128 - 236 + Math.sin(t * 30) * 6, r: 10, o: t > S.D4[0] + 0.25 ? 1 : 0 });
    CI.forEach((q, j) => set(q, { s: pop(t, K.abreviaban + j * 0.1, 0.3), o: t < K.abreviaban + j * 0.1 ? 0 : 1 }));
    popA(chC, t, K.comerciantes, { r: -4 });
    popA(chM, t, K.abreviaban + 0.05, { r: 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D9B98A', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 6px, transparent 6px 46px)' });
  const lg = box(c, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 800px' });
  ledgerPage(lg, 110, 380, 860, 720);
  const ROWS = [['Harina', '250'], ['Vino', '75'], ['Paño', '12'], ['Velas', '8']];
  const CI = [];
  ROWS.forEach((r, i) => {
    const e = el('div', lg, { left: '160px', top: px(462 + i * 128), width: '760px', height: '110px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '66px', color: '#3a2a6a', whiteSpace: 'nowrap', zIndex: 6 });
    e.innerHTML = `<span style="position:absolute;left:0;top:10px">${r[0]} ……</span><span style="position:absolute;left:480px;top:10px">${r[1]} <span style="position:relative">p<span style="font-size:.55em;position:relative;top:-0.75em;margin-left:2px">s</span></span></span>`;
    RW.push({ e });
    if (i < 3) { const ci = box(lg, 610, 452 + i * 128, 210, 116, { zIndex: 7, border: `6px solid ${PINK}`, borderRadius: '50%' }); CI.push(ci); }
  });
  const ql = box(c, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const chC = chip(c, 400, 1110, 'los comerciantes', { size: 50, bg: INK, color: YEL, z: 30 });
  const chM = chip(c, 560, 1200, 'a mano', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   D5 · EL LIENZO DE LA P Y LA S (UNO → DOS). LA imagen del vídeo:
   UNO: la pluma escribe la P y, al lado, la s pequeñita → «pˢ = pesos»
   DOS: la S se desliza despacio y se monta encima de la P… y de la P solo queda una raya → «$»
   ====================================================================== */
{
  const T1 = K.P4 - 0.05, T1b = T1 + 0.32, TS = K.S4 - 0.04;
  const T2 = K.S5 - 0.06, T2e = K.P5e;                 // la S se desliza (≈ 2,5 s)
  const T3 = K.P5b - 0.08, T3e = T3 + 0.75;            // la panza de la P se borra
  const T4 = K.raya - 0.04;                            // queda el «$»
  const c = scene(S.D5[0], S.D5[1], t => {
    // cámara: plano general → se acerca en «pequeñita» → general en DOS → primer plano en «y de la P…»
    const zA = 0.1 * p(t, K.S4 - 0.1, 0.5, E.inOutCubic) * (1 - p(t, K.dos - 0.1, 0.4, E.inOutCubic));
    const zB = 0.12 * p(t, K.y5 - 0.08, 0.35, E.outCubic);
    const zC = 0.03 * p(t, T2, T2e - T2, E.linear);
    set(cam, { s: 1 + zA + zB + zC, x: -40 * zA / 0.1 });
    // la P
    dash(stem, p(t, T1, 0.32, E.inOutCubic));
    const kb = p(t, T1b, 0.34, E.inOutCubic), ke = p(t, T3, T3e - T3, E.inOutCubic);
    bowl.style.strokeDashoffset = f1(t < T3 ? 1000 * (1 - kb) : -1000 * ke);
    ghost.style.opacity = t > T3 ? 0.9 * (1 - p(t, T4 + 0.6, 0.4)) : 0;
    stemX.style.opacity = t > T3 + 0.3 ? 1 : 0; dash(stemX, p(t, T3 + 0.3, 0.35));
    // la s: se escribe pequeñita al lado; en DOS se desliza despacio y se monta encima de la P
    dash(sP, p(t, TS, 0.45, E.inOutCubic));
    const k2 = p(t, T2, T2e - T2, E.inOutCubic);
    const sx = lerp(S_SMALL.x, S_BIG.x, k2), sy = lerp(S_SMALL.y, S_BIG.y, k2) - Math.sin(k2 * Math.PI) * 90, ss = lerp(S_SMALL.s, S_BIG.s, k2);
    const chq = t > K.pequenita - 0.05 && t < K.pequenita + 0.6 ? 1 + 0.12 * Math.sin((t - K.pequenita) * 22) : 1;
    sG.setAttribute('transform', `translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss * chq * 1000) / 1000})`);
    sP.setAttribute('stroke-width', f1(PG.sw / ss * lerp(0.55, 1, k2)));
    const blink = t > K.pesos4 - 0.05 && t < K.dos ? (Math.floor((t - K.pesos4) * 6) % 2 ? 1 : 0.35) : 0;
    glow.setAttribute('transform', `translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss)})`); glow.style.opacity = blink;
    sP.style.stroke = k2 > 0 && k2 < 1 ? PINK : (blink > 0.5 ? '#B8860B' : INK);
    // estela de la S mientras se desliza (rosa)
    trail.style.opacity = k2 > 0 && k2 < 1 ? 1 : (t >= T2e && t < T2e + 0.3 ? 1 - p(t, T2e, 0.3) : 0);
    trail.style.strokeDashoffset = f1(1000 * (1 - k2));
    // flecha que anuncia el recorrido
    guide.style.opacity = t > K.la5 - 0.1 && t < T2 + 0.2 ? 1 : 0; guide.style.strokeDashoffset = f1(1000 * (1 - p(t, K.la5 - 0.1, 0.35)));
    // «$» final: se centra y brilla
    const k4 = p(t, T4, 0.4, E.outBack);
    gAll.setAttribute('transform', `translate(${f1(70 * p(t, T4, 0.4, E.outCubic))} 0)`);
    shineR.style.opacity = t > T4 ? 0.9 : 0; set(shineR, { r: t * 30, s: 0.6 + 0.4 * k4 });
    // pluma
    let tip = [PG.x + 420, PG.top + 560], wr = false;
    if (t >= T1 && t < T1 + 0.32) { tip = [PG.x, lerp(PG.top, PG.bot, p(t, T1, 0.32, E.inOutCubic))]; wr = true; }
    else if (t >= T1b && t < T1b + 0.34) { const q = bowl.getPointAtLength(kb * BL); tip = [q.x, q.y]; wr = true; }
    else if (t >= TS && t < TS + 0.45) { const q = sP.getPointAtLength(p(t, TS, 0.45, E.inOutCubic) * SL); tip = [S_SMALL.x + q.x * S_SMALL.s, S_SMALL.y + q.y * S_SMALL.s]; wr = true; }
    else if (t >= T3 && t < T3e) { const q = bowl.getPointAtLength(Math.min(BL, ke * BL)); tip = [q.x, q.y]; wr = true; }
    const dxg = 70 * p(t, T4, 0.4, E.outCubic);
    const qlOn = (t > T1 - 0.1 && t < TS + 0.7) || (t > T3 - 0.2 && t < T4);
    set(ql, { x: tip[0] + dxg - 60 + (wr ? Math.sin(t * 40) * 3 : 0), y: tip[1] - 236 + wobble(t, 0.9, wr ? 0 : 8), r: wr ? 6 : 14, o: qlOn ? 1 : 0 });
    // rótulos
    popA(chP, t, K.P4 + 0.05, { r: -5 }); chP.style.display = t < K.S4 ? '' : 'none';
    popA(chQ, t, K.pequenita, { r: -5 }); chQ.style.display = t < K.dos ? '' : 'none';
    set(eqP, { s: t < K.pesos4 - 0.04 ? 0 : lerp(2.2, 1, p(t, K.pesos4 - 0.04, 0.18, E.outCubic)), r: -4, o: t < K.pesos4 - 0.04 ? 0 : 1 - p(t, K.dos + 0.35, 0.15) });
    popA(chM, t, K.montando, { r: 4 }); chM.style.display = t > K.montando - 0.05 && t < K.y5 ? '' : 'none';
    popA(chR, t, K.quedo - 0.05, { r: -4 }); chR.style.display = t > K.quedo - 0.1 ? '' : 'none';
    set(arR, { o: t > K.quedo - 0.05 ? 1 : 0, x: Math.sin(t * 9) * 8 });
    stampA(stD, t, K.rayaE + 0.02, -8, 1);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#F3EAD3', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 96px)' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0) 50%, rgba(43,33,24,.22) 100%)' });
  box(cam, 150, 0, 4, 1920, { background: 'rgba(200,16,46,.35)', zIndex: 0 });
  const shineR = rays(cam, -160, 60, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const gl = svgLayer(cam, 5);
  // recorrido de la S (de pequeñita, arriba a la derecha, a encima de la P)
  const TRAIL = (() => { let d = ''; for (let i = 0; i <= 24; i++) { const k = E.inOutCubic(i / 24); const x = lerp(S_SMALL.x, S_BIG.x, k), y = lerp(S_SMALL.y, S_BIG.y, k) - Math.sin(k * Math.PI) * 90; d += (i ? 'L' : 'M') + f1(x) + ',' + f1(y); } return d; })();
  gl.innerHTML = `<g class="gAll">
    <path class="guide" pathLength="1000" stroke-dasharray="26 22" d="${TRAIL}" stroke="${PINK}" stroke-width="12" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="trail" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${TRAIL}" stroke="rgba(255,62,165,.35)" stroke-width="40" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="ghost" d="${P_BOWL}" stroke="${PINK}" stroke-width="10" stroke-dasharray="18 16" fill="none" stroke-linecap="round" style="opacity:0"/>
    <circle class="glow" cx="0" cy="0" r="330" fill="url(#glowY)" style="opacity:0"/>
    <path class="stem" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${P_STEM}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <path class="stemX" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M${PG.x},${PG.top} V${PG.top - 40} M${PG.x},${PG.bot} V${PG.bot + 40}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="bowl" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${P_BOWL}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <g class="sG"><path class="sP" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${S_PATH}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/></g></g>`;
  const gAll = gl.querySelector('.gAll'), stem = gl.querySelector('.stem'), stemX = gl.querySelector('.stemX'), bowl = gl.querySelector('.bowl'), ghost = gl.querySelector('.ghost'), sG = gl.querySelector('.sG'), sP = gl.querySelector('.sP'), glow = gl.querySelector('.glow'), trail = gl.querySelector('.trail'), guide = gl.querySelector('.guide');
  const BL = bowl.getTotalLength(), SL = sP.getTotalLength();
  const ql = box(cam, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const SUP = `<span style="font-size:.55em;position:relative;top:-0.7em;margin-left:2px">s</span>`;
  const chP = chip(cam, 200, 1160, 'una P…', { size: 58, bg: INK, color: YEL, z: 20 });
  const chQ = chip(cam, 600, 700, 'pequeñita', { size: 50, bg: PINK, z: 20 });
  const eqP = stamp(cam, 200, 1150, `p${SUP} = PESOS`, { size: 90, bw: 14, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const chM = chip(cam, 420, 1170, 'se monta encima', { size: 50, bg: PINK, z: 20 });
  const chR = chip(c, 80, 1190, 'la raya del $', { size: 50, bg: INK, color: YEL, z: 20 });
  const arR = el('div', c, { left: '300px', top: '1050px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 21, transform: 'rotate(-30deg)' }, '↗');
  const stD = stamp(c, 640, 1150, '= $', { size: 100, bw: 14, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   E0 · DOS «DE TANTO ESCRIBIRLO DEPRISA…» — montaje: la misma anotación, cada vez más deprisa (la s se va acercando)
   ====================================================================== */
{
  const VV = [];
  const c = scene(S.E0[0], S.E0[1], t => {
    VV.forEach((v, k) => {
      const t0 = S.E0[0] + 0.06 + k * 0.26;
      set(v.e, { s: pop(t, t0, 0.22), r: v.r, o: t < t0 ? 0 : 1 });
      v.paths.forEach(pp => pp.style.strokeDashoffset = f1(100 * (1 - p(t, t0 + 0.04, 0.2))));
    });
    const v = VV[clamp(Math.floor((t - S.E0[0] - 0.06) / 0.26), 0, 4)];
    set(ql, { x: v.x + 150 + Math.sin(t * 50) * 16, y: v.y - 60 + Math.cos(t * 50) * 10, r: 16, o: t > S.E0[0] + 0.05 && t < S.E0[0] + 1.4 ? 1 : 0 });
    SPD.forEach((s, i) => set(s, { x: -((t * 2400 + i * 300) % 1400) + 700, o: 0.5 }));
    set(chF, { s: pop(t, S.E0[0] + 0.05, 0.3), r: -6, o: 1 });
  }, { clip: true, cut: true, z: 12 });
  sceneBg(c, { background: '#F7EFD9', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 64px)' });
  const SPD = [0, 1, 2, 3, 4].map(i => box(c, 0, 420 + i * 190, 420, 8, { background: 'rgba(43,33,24,.18)', borderRadius: '4px', zIndex: 1 }));
  const POS = [[80, 400], [390, 400], [680, 400], [235, 780], [545, 780]];
  POS.forEach((q, k) => {
    const e = box(c, q[0], q[1], 260, 320, { zIndex: 5, background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '18px', boxShadow: `6px 7px 0 ${SH}` });
    const g = box(e, 18, 10, 224, 290); g.innerHTML = handVariant([0, 0, 1, 1, 2][k]);
    VV.push({ e, paths: [...g.querySelectorAll('.hv')], x: q[0], y: q[1], r: [-4, 3, -2, 4, -3][k] });
  });
  const ql = box(c, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const chF = chip(c, 300, 1160, '¡más deprisa!', { size: 64, bg: PINK, z: 20 });
}
