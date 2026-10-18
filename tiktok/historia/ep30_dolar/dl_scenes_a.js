/* Ep. 30 · escenas L0–L4 (todo clavado por texto vía K) */
const dash = (e, k) => { e.style.strokeDashoffset = f1(1000 * (1 - clamp(k))); };
const SPIN = t => Math.cos(t * 2 * Math.PI * 2 / K.S0); // 2 vueltas exactas hasta «S!», cara a cámara en t=0

/* ======================================================================
   A · PORTADA / GANCHO — «$» gigante que gira como una moneda + «¿POR QUÉ CON S?» (pregunta, sin respuesta)
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, 0, 3.5, E.linear) });
    set(ry, { r: t * 10 });
    const cs = SPIN(t), sx = Math.max(0.07, Math.abs(cs));
    // la D entra y el «$» se aparta; en «S!» el «$» la echa de un empujón
    const kd = p(t, K.D0 - 0.16, 0.38, E.outBack), kpush = p(t, K.S0 - 0.08, 0.16, E.outCubic), kback = p(t, K.S0 + 0.08, 0.3, E.outCubic);
    const dx = 110 * p(t, K.D0 - 0.16, 0.4, E.outCubic) - 120 * kpush * (1 - kback);
    set(dol, { x: dx, y: wobble(t, 0.7, 6), sx, s: 1 });
    dolFace.style.opacity = cs >= 0 ? 1 : 0; dolBack.style.opacity = cs >= 0 ? 0 : 1;
    edge.style.opacity = Math.abs(cs) < 0.2 ? 1 : 0; set(edge, { x: dx });
    const tf = t - K.S0 - 0.02, fly = tf > 0;
    set(dW, { x: lerp(-460, 0, kd) + (fly ? -1500 * tf : 0), y: (fly ? -500 * tf + 2600 * tf * tf : 0) + wobble(t, 0.8, 4), r: (1 - kd) * -30 + (fly ? -540 * tf : Math.sin(t * 9) * 2.5 * (t > K.tu0 ? 1 : 0.3)), o: t < K.D0 - 0.16 ? 0 : 1 });
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3.4) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3.4 + 1) });
    set(sS, { s: 1 + 0.18 * (1 - p(t, K.S0, 0.4, E.outCubic)) * (t > K.S0 ? 1 : 0), r: t > K.S0 ? Math.sin(t * 14) * 4 * (1 - p(t, K.S0, 0.8)) : 0 });
    QM.forEach((q, i) => set(q, { y: Math.sin(t * 3 + i * 2) * 14, r: Math.sin(t * 2 + i) * 10, o: 0.95 }));
    set(bang, { s: pop(t, K.S0 + 0.04, 0.3), r: -10, o: t < K.S0 + 0.04 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 58%, rgba(255,230,0,.45), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 260, 1400, 26, 'rgba(201,162,74,.16)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 322, 1080, '¿POR QUÉ', { fontSize: '150px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const l2 = BIGT(cam, 0, 470, 1080, `CON <span class="sS" style="display:inline-block;color:${YEL};text-shadow:${OUTL(INK, 9)}">S</span>?`, { fontSize: '176px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const sS = l2.querySelector('.sS');
  const edge = box(cam, 520, 700, 40, 600, { zIndex: 9 }); edge.innerHTML = coinEdgeSvg();
  const dol = box(cam, 265, 668, 550, 825, { zIndex: 10 }); dol.innerHTML = dollarSvg();
  const dolFace = dol.querySelector('.face'), dolBack = dol.querySelector('.back');
  const dW = box(cam, 30, 820, 300, 340, { zIndex: 12 }); dW.innerHTML = woodLetterSvg('D');
  const QM = [qMark(cam, 860, 760, 130, PINK), qMark(cam, 110, 1180, 100, PINK)];
  const bang = el('div', cam, { left: '120px', top: '760px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: YEL, textShadow: OUTL(INK, 6), zIndex: 30 }, '¡pum!');
}

/* ======================================================================
   B1 · «PISTA: EN MÉXICO…» — puesto de mercado con «$20»
   ====================================================================== */
headline(S.B1[0], S.B1[1], 'Pista: en *México*…', { size: 104, hlT: K.mexico, y: 200 });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    set(cam, { s: 1.02 + 0.06 * p(t, S.B1[0], 1.5, E.linear), x: -14 * p(t, S.B1[0], 1.5, E.linear) });
    popA(pt, t, K.mexico + 0.05, { r: -6, s: 1 });
    set(pt, { y: Math.sin(t * 5) * 6 });
    popA(chM, t, S.B1[0] + 0.1, { r: -4 });
    popA(lupa, t, S.B1[0] + 0.02, { r: 8 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 70%)' });
  rays(cam, -160, 300, 1400, 22, 'rgba(255,255,255,.25)', 'rgba(0,0,0,0)', 0);
  const mk1 = box(cam, 0, 90, 1080, 1300, { zIndex: 2 }); mk1.innerHTML = marketSvg();
  const pt = priceTag(cam, 520, 700, '$20', { size: 150, bg: YEL, z: 30 });
  const chM = chip(cam, 120, 720, 'México', { size: 54, bg: PINK, z: 30 });
  const lupa = chip(cam, 690, 1200, 'PISTA', { size: 50, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   B2 · «…O EN ARGENTINA, ESO ES UN PESO» — kiosco con «$1.500» → «= UN PESO»
   ====================================================================== */
headline(S.B2[0], K.eso1 - 0.06, '…o en *Argentina*', { size: 104, hlT: K.argentina, y: 200 });
headline(K.eso1 - 0.06, S.B2[1], 'eso es *un peso*', { size: 112, hlT: K.peso1, y: 200 });
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(cam, { s: 1.03 + 0.05 * p(t, S.B2[0], 2, E.linear), x: 14 * p(t, S.B2[0], 2, E.linear) });
    popA(pt, t, K.argentina + 0.1, { r: 5 });
    popA(chA, t, S.B2[0] + 0.08, { r: 3 });
    stampA(st, t, K.peso1, -7, 1);
    set(arr, { o: t > K.peso1 - 0.1 ? 1 : 0, y: Math.sin(t * 8) * 6 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #CFE0E6 0%, #EFE1C6 70%)' });
  const kk = box(cam, 0, -40, 1080, 1300, { zIndex: 2 }); kk.innerHTML = kioskSvg();
  const pt = priceTag(cam, 360, 600, '$1.500', { size: 130, bg: '#fff', z: 30 });
  const chA = chip(cam, 640, 420, 'Argentina', { size: 54, bg: '#9fd3e0', color: INK, z: 30 });
  const arr = box(cam, 500, 790, 120, 150, { zIndex: 31 }); arr.innerHTML = `<svg width="120" height="150" style="overflow:visible"><path d="M60,6 V110 M24,80 L60,124 L96,80" stroke="${INK}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M60,6 V110 M24,80 L60,124 L96,80" stroke="${PINK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const st = stamp(cam, 330, 950, '= UN PESO', { size: 110, bw: 13, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   B3 · «Y PESO… TAMPOCO EMPIEZA POR S» — la palabra PESO: la P en rosa, la S con «?»
   ====================================================================== */
headline(S.B3[0], S.B3[1], 'Y *peso*… tampoco empieza por S', { size: 80, hlT: K.peso1b, y: 200 });
{
  const TL = [];
  const c = scene(S.B3[0], S.B3[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, S.B3[0], 2.8, E.linear) });
    TL.forEach((q, i) => {
      const k = pop(t, S.B3[0] + 0.02 + i * 0.07, 0.35);
      set(q.e, { s: k * (i === 0 && t > K.tampoco ? 1 + 0.08 * Math.sin(t * 9) : 1) * (i === 2 && t > K.S1 ? 1.12 : 1), y: (i === 2 && t > K.S1 ? -20 : 0) + wobble(t, 0.6, 3, i), r: q.r, o: t < S.B3[0] + 0.02 + i * 0.07 ? 0 : 1 });
    });
    TL[0].e.style.background = t > K.peso1b ? PINK : '#fff'; TL[0].e.style.color = t > K.peso1b ? '#fff' : INK;
    TL[2].e.style.background = t > K.S1 - 0.04 ? YEL : '#fff';
    popA(chP, t, K.peso1b + 0.1, { r: -4 });
    set(qS, { s: pop(t, K.S1, 0.35), r: Math.sin(t * 6) * 10, o: t < K.S1 ? 0 : 1 });
    const kd = p(t, K.empieza - 0.1, 0.45, E.outBack);
    set(dm, { s: kd, sx: Math.max(0.07, Math.abs(Math.cos((t - K.empieza) * 4))), o: t < K.empieza - 0.1 ? 0 : 1 });
    set(qD, { s: pop(t, K.empieza + 0.2, 0.3), r: Math.sin(t * 5) * 8, o: t < K.empieza + 0.2 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 700px' });
  sceneBg(cam, { background: '#F1D7DC' });
  halftone(cam, 'rgba(43,33,24,.06)', 0);
  'PESO'.split('').forEach((ch, i) => {
    const e = el('div', cam, { left: px(80 + i * 236), top: '470px', width: '210px', height: '250px', lineHeight: '250px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '210px', color: INK, background: '#fff', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 11px 0 ${SH}`, zIndex: 14 }, ch);
    TL.push({ e, r: [-5, 3, -2, 5][i] });
  });
  const chP = chip(cam, 70, 760, 'empieza por P', { size: 50, bg: PINK, z: 20 });
  const qS = qMark(cam, 610, 330, 150, YEL);
  const dm = box(cam, 420, 830, 300, 450, { zIndex: 10 }); dm.innerHTML = dollarSvg();
  const qD = qMark(cam, 720, 880, 170, PINK);
}

/* ======================================================================
   C1 · «HACE TRESCIENTOS AÑOS, EL DINERO…» — dos reales de a ocho caen: cecas de MÉXICO y POTOSÍ
   ====================================================================== */
headline(S.C1[0], S.C1[1], 'Hace *300 años*…', { size: 112, hlT: K.trescientos + 0.05, y: 210 });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    [[cA, lA, S.C1[0] + 0.02], [cB, lB, S.C1[0] + 0.18]].forEach(([cn, lb, t0], i) => {
      const k = p(t, t0, 0.7, E.outBounce);
      const spin = t < t0 + 0.6 ? Math.cos((t - t0) * 14) : 1;
      set(cn, { y: lerp(-1100, 0, k), sx: Math.max(0.08, Math.abs(spin)), r: (i ? 6 : -6) * (1 - k), o: t < t0 ? 0 : 1 });
      popA(lb, t, t0 + 0.55, { r: i ? 3 : -3 });
    });
    set(shine, { o: t > S.C1[0] + 0.8 ? 1 : 0, r: t * 120, s: 1 + 0.2 * Math.sin(t * 10) });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const lA = chip(c, 170, 520, 'MÉXICO', { size: 52, bg: INK, color: YEL, z: 30 });
  const lB = chip(c, 640, 520, 'POTOSÍ', { size: 52, bg: INK, color: YEL, z: 30 });
  const cA = box(c, 120, 610, 360, 360, { zIndex: 10 }); cA.innerHTML = pesoCoinSvg('Mº');
  const cB = box(c, 580, 610, 360, 360, { zIndex: 10 }); cB.innerHTML = pesoCoinSvg('PTS', { markSize: 34 });
  const shine = el('div', c, { left: '860px', top: '600px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦');
}

/* ======================================================================
   C2 · «…QUE MANDABA EN MEDIO MUNDO» — el globo con galeones cargados de monedas
   ====================================================================== */
headline(S.C2[0], S.C2[1], 'mandaba en *medio mundo*', { size: 96, hlT: K.medio, y: 210 });
{
  const SH3 = [];
  const c = scene(S.C2[0], S.C2[1], t => {
    const tl = t - S.C2[0];
    gl.innerHTML = `<svg viewBox="0 0 400 400" width="100%" height="100%" style="overflow:visible">${globeInner(tl * 1.6)}</svg>`;
    set(glW, { s: 0.85 + 0.15 * p(t, S.C2[0], 0.4, E.outBack), r: Math.sin(t * 1.5) * 3 });
    SH3.forEach((q, i) => { const a = q.a0 + tl * 0.9; set(q.e, { x: Math.cos(a) * q.R, y: Math.sin(a) * q.R * 0.75, r: Math.sin(t * 3 + i) * 5, s: pop(t, S.C2[0] + i * 0.12, 0.35), o: t < S.C2[0] + i * 0.12 ? 0 : 1 }); });
    CO.forEach((q, i) => { const k = ((tl * 1.2 + i * 0.25) % 1); set(q, { x: lerp(-300, 300, k) * (i % 2 ? 1 : -1), y: -Math.sin(k * Math.PI) * 260, r: k * 500, o: Math.sin(k * Math.PI) }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#C9D3C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const glW = box(c, 240, 470, 600, 600, { zIndex: 4 });
  const gl = box(glW, 0, 0, 600, 600);
  [[0, 380], [2.1, 400], [4.2, 380]].forEach(([a0, R]) => { const e = box(c, 390, 640, 300, 280, { zIndex: 8 }); e.innerHTML = `<svg viewBox="0 0 320 300" width="100%" height="100%" style="overflow:visible">${galleonSvg()}</svg>`; SH3.push({ e, a0, R: R * 0.95 }); });
  const CO = [0, 1, 2, 3].map(() => { const e = box(c, 490, 700, 90, 90, { zIndex: 9 }); e.innerHTML = pesoCoinSvg(''); return e; });
}

/* ======================================================================
   C3 · «ERA ESPAÑOL: EL PESO» — la moneda gigante + sello «EL PESO»
   ====================================================================== */
headline(S.C3[0], S.C3[1], 'Era *español*: el peso', { size: 104, hlT: K.espanol, y: 210 });
{
  const c = scene(S.C3[0], S.C3[1], t => {
    set(ry, { r: t * 8 });
    const k = p(t, S.C3[0], 0.45, E.outBack);
    set(cn, { s: lerp(0.4, 1, k) * (1 + 0.03 * Math.sin(t * 3)), sx: Math.max(0.1, Math.abs(Math.cos((t - S.C3[0]) * 1.4))) * lerp(0.4, 1, k), r: wobble(t, 0.4, 2) });
    stampA(st, t, K.peso2, -8, 1);
    popA(ch8, t, K.peso2 + 0.35, { r: 4 });
    SP.forEach((s, i) => set(s, { o: t > S.C3[0] + 0.3 ? 0.5 + 0.5 * Math.sin(t * 8 + i * 2) : 0, r: t * 90, s: 0.8 + 0.3 * Math.sin(t * 6 + i) }));
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -160, 160, 1400, 26, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const cn = box(c, 210, 420, 660, 660, { zIndex: 10 }); cn.innerHTML = pesoCoinSvg('Mº');
  const st = stamp(c, 250, 960, 'EL PESO', { size: 140, bw: 16, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const ch8 = chip(c, 640, 400, 'el real de a ocho', { size: 42, bg: INK, color: YEL, z: 41 });
  const SP = [[180, 470], [840, 560], [860, 1000], [170, 1000]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦'));
}

/* ======================================================================
   D1 · «SE ABREVIABA A MANO» — libro de cuentas con «250 pˢ» escrito con pluma
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'Se abreviaba *a mano*', { size: 104, hlT: K.mano, y: 210 });
{
  const RW = [];
  const c = scene(S.D1[0], S.D1[1], t => {
    const k = p(t, S.D1[0], 0.35, E.outBack);
    set(lg, { y: (1 - k) * 900, r: lerp(8, -1.5, k) + wobble(t, 0.4, 0.5) });
    RW.forEach((r, i) => { const tw = S.D1[0] + 0.2 + i * 0.26; r.e.style.clipPath = `inset(0 ${f1(100 * (1 - p(t, tw, 0.24, E.linear)))}% 0 0)`; });
    const i = clamp(Math.floor((t - S.D1[0] - 0.2) / 0.26), 0, RW.length - 1), fr = clamp(((t - S.D1[0] - 0.2) % 0.26) / 0.24);
    set(ql, { x: lerp(170, 700, fr) - 60, y: 520 + i * 128 - 236 + Math.sin(t * 30) * 6, r: 10, o: t > S.D1[0] + 0.2 ? 1 : 0 });
    CI.forEach((q, j) => set(q, { s: pop(t, K.mano + j * 0.08, 0.3), o: t < K.mano + j * 0.08 ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#D9B98A', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 6px, transparent 6px 46px)' });
  const lg = box(c, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 800px' });
  ledgerPage(lg, 110, 380, 860, 840);
  const ROWS = [['Harina', '250'], ['Vino', '75'], ['Paño', '12'], ['Velas', '8'], ['Cacao', '40']];
  const CI = [];
  ROWS.forEach((r, i) => {
    const e = el('div', lg, { left: '160px', top: px(462 + i * 128), width: '760px', height: '110px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '66px', color: '#3a2a6a', whiteSpace: 'nowrap', zIndex: 6 });
    e.innerHTML = `<span style="position:absolute;left:0;top:10px">${r[0]} ……</span><span style="position:absolute;left:480px;top:10px">${r[1]} <span style="position:relative">p<span style="font-size:.55em;position:relative;top:-0.75em;margin-left:2px">s</span></span></span>`;
    RW.push({ e });
    if (i < 3) { const ci = box(lg, 610, 452 + i * 128, 210, 116, { zIndex: 7, border: `6px solid ${PINK}`, borderRadius: '50%' }); CI.push(ci); }
  });
  const ql = box(c, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
}

/* ======================================================================
   D2 · LA TRANSFORMACIÓN pˢ → $ en 4 PASOS (L3 «una P y una S chiquita» + L4 «la S se montó… la P quedó en una raya»)
   ====================================================================== */
{
  const T1 = K.P3 - 0.12, T1b = T1 + 0.3, TS = K.S3 - 0.02, T2 = K.S4 - 0.02, T2e = K.P4 + 0.22, T3 = K.P4b - 0.06, T3e = K.quedo + 0.5, T4 = K.raya - 0.04;
  const STEP = [T1, T2, T3, T4];
  const c = scene(S.D2[0], S.D2[1], t => {
    // cámara: pulso suave en cada paso
    const pulse = STEP.reduce((a, s) => a + 0.035 * Math.sin(Math.PI * p(t, s, 0.5)) , 0);
    set(cam, { s: 1.0 + pulse + 0.02 * p(t, S.D2[0], 10, E.linear) });
    // trazo de la P
    dash(stem, p(t, T1, 0.3, E.inOutCubic));
    const kb = p(t, T1b, 0.32, E.inOutCubic), ke = p(t, T3, 0.7, E.inOutCubic);
    bowl.style.strokeDashoffset = f1(t < T3 ? 1000 * (1 - kb) : -1000 * ke);
    ghost.style.opacity = t > T3 ? 0.9 * (1 - p(t, T3e, 0.5)) : 0;
    stemX.style.opacity = t > T3 + 0.3 ? 1 : 0; dash(stemX, p(t, T3 + 0.3, 0.3));
    // la s: se escribe chiquita, arriba a la derecha; luego baja y se monta sobre la P
    dash(sP, p(t, TS, 0.42, E.inOutCubic));
    const k2 = p(t, T2, T2e - T2, E.inOutCubic);
    const sx = lerp(S_SMALL.x, S_BIG.x, k2), sy = lerp(S_SMALL.y, S_BIG.y, k2) - Math.sin(k2 * Math.PI) * 120, ss = lerp(S_SMALL.s, S_BIG.s, k2);
    const chq = t > K.chiquita - 0.05 && t < K.chiquita + 0.6 ? 1 + 0.12 * Math.sin((t - K.chiquita) * 22) : 1;
    sG.setAttribute('transform', `translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss * chq * 1000) / 1000})`);
    sP.setAttribute('stroke-width', f1(PG.sw / ss * lerp(0.55, 1, k2)));
    const blink = t > K.plural - 0.05 && t < K.pesos3 + 0.2 ? (Math.floor((t - K.plural) * 6) % 2 ? 1 : 0.35) : 0;
    glow.setAttribute('transform', `translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss)})`); glow.style.opacity = blink;
    sP.style.stroke = blink > 0.5 ? '#B8860B' : INK;
    // paso 4: el «$» se centra, brilla y queda limpio
    const k4 = p(t, T4, 0.4, E.outBack);
    gAll.setAttribute('transform', `translate(${f1(70 * p(t, T4, 0.4, E.outCubic))} 0)`);
    shineR.style.opacity = t > T4 ? 0.9 : 0; set(shineR, { r: t * 30, s: 0.6 + 0.4 * k4 });
    // pluma: sigue la punta del trazo activo
    let tip = [PG.x + 420, PG.top + 560], wr = false;
    if (t >= T1 && t < T1 + 0.3) { tip = [PG.x, lerp(PG.top, PG.bot, p(t, T1, 0.3, E.inOutCubic))]; wr = true; }
    else if (t >= T1b && t < T1b + 0.32) { const q = bowl.getPointAtLength(kb * BL); tip = [q.x, q.y]; wr = true; }
    else if (t >= TS && t < TS + 0.42) { const q = sP.getPointAtLength(p(t, TS, 0.42, E.inOutCubic) * SL); tip = [S_SMALL.x + q.x * S_SMALL.s, S_SMALL.y + q.y * S_SMALL.s]; wr = true; }
    else if (t >= T3 && t < T3 + 0.7) { const q = bowl.getPointAtLength(Math.min(BL, ke * BL)); tip = [q.x, q.y]; wr = true; }
    else if (t >= T2 && t < T2e) { tip = [sx + 150 * ss, sy - 230 * ss]; }
    const dxg = 70 * p(t, T4, 0.4, E.outCubic);
    set(ql, { x: tip[0] + dxg - 60 + (wr ? Math.sin(t * 40) * 3 : 0), y: tip[1] - 236 + wobble(t, 0.9, wr ? 0 : 8), r: wr ? 6 : 14, o: t > T1 - 0.1 && t < T4 ? 1 : 0 });
    // chips y sello
    popA(chChiq, t, K.chiquita, { r: -5 }); chChiq.style.display = t < K.plural - 0.05 ? '' : 'none';
    popA(chPl, t, K.plural - 0.05, { r: 4 });
    chPl.style.display = t < T2 ? '' : 'none';
    stampA(stP, t, K.raya + 0.1, -9, 1);
    // tira de pasos 1–4
    CARDS.forEach((q, i) => {
      const on = t >= STEP[i], cur = on && (i === 3 || t < STEP[i + 1]);
      set(q.e, { s: (on ? 1 : 0.92) * (cur ? 1.08 + 0.06 * (1 - p(t, STEP[i], 0.3)) : 1), y: cur ? -10 : 0, o: on ? 1 : 0.38 });
      q.e.style.background = cur ? YEL : on ? '#FBF6EA' : '#E6DCC4';
      q.g.style.opacity = on ? 1 : 0.15;
    });
    // titulares propios de la escena (palabra a palabra)
    HL.forEach(h => { const vis = t >= h.t0 && t < h.t1; h.e.style.display = vis ? '' : 'none'; if (vis) set(h.e, { y: (1 - p(t, h.t0, 0.25, E.outBack)) * 40, o: clamp(p(t, h.t0, 0.2) * 1.5) }); });
    paint(hl1, t, K.P3, 0.3); paint(hl2, t, K.pesos3, 0.3); paint(hl3, t, K.monto, 0.3); paint(hl4, t, K.raya - 0.4, 0.4);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#F3EAD3', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 96px)' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0) 50%, rgba(43,33,24,.22) 100%)' });
  box(cam, 150, 0, 4, 1920, { background: 'rgba(200,16,46,.35)', zIndex: 0 });
  const shineR = rays(cam, -160, 60, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const gl = svgLayer(cam, 5);
  gl.innerHTML = `<g class="gAll">
    <path class="ghost" d="${P_BOWL}" stroke="${PINK}" stroke-width="10" stroke-dasharray="18 16" fill="none" stroke-linecap="round" style="opacity:0"/>
    <circle class="glow" cx="0" cy="0" r="330" fill="url(#glowY)" style="opacity:0"/>
    <path class="stem" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${P_STEM}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <path class="stemX" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M${PG.x},${PG.top} V${PG.top - 40} M${PG.x},${PG.bot} V${PG.bot + 40}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="bowl" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${P_BOWL}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <g class="sG"><path class="sP" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${S_PATH}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/></g></g>`;
  const gAll = gl.querySelector('.gAll'), stem = gl.querySelector('.stem'), stemX = gl.querySelector('.stemX'), bowl = gl.querySelector('.bowl'), ghost = gl.querySelector('.ghost'), sG = gl.querySelector('.sG'), sP = gl.querySelector('.sP'), glow = gl.querySelector('.glow');
  const BL = bowl.getTotalLength(), SL = sP.getTotalLength();
  const ql = box(cam, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const chChiq = chip(cam, 700, 700, 'chiquita', { size: 46, bg: PINK, z: 20 });
  const chPl = chip(cam, 700, 700, 's = plural', { size: 46, bg: INK, color: YEL, z: 20 });
  const stP = stamp(cam, 330, 900, 'PESOS', { size: 130, bw: 15, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  // tira de pasos
  const CARDS = [];
  ['1', '2', '3', '4'].forEach((n, i) => {
    const e = box(cam, 130 + i * 210, 1170, 180, 170, { zIndex: 30, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `6px 7px 0 ${SH}` });
    const g = box(e, 30, 14, 120, 140); g.innerHTML = miniGlyph(i + 1);
    el('div', e, { left: '-18px', top: '-22px', width: '52px', height: '52px', lineHeight: '50px', textAlign: 'center', borderRadius: '50%', background: PINK, color: '#fff', border: `4px solid ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px' }, n);
    CARDS.push({ e, g });
  });
  // titulares
  const HL = [];
  const mkH = (t0, t1, html, size = 96) => { const e = el('div', cam, { left: '40px', top: '200px', width: '1000px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: px(size), lineHeight: 1.08, color: INK, zIndex: 50, whiteSpace: 'nowrap' }, html); HL.push({ e, t0, t1 }); return e; };
  const SUP = `<span style="font-size:.55em;position:relative;top:-0.7em;margin-left:2px">s</span>`;
  const h1 = mkH(S.D2[0], K.pesos3 - 0.05, `Una ${hlSpan('<i>P</i>', 'h1')} y una <i>s</i> chiquita`);
  const h2 = mkH(K.pesos3 - 0.05, S.E0[0] + 0.02, `p${SUP} = ${hlSpan('<i>pesos</i>', 'h2')}`, 130);
  const h3 = mkH(S.E0[1], K.y4 - 0.05, `La S ${hlSpan('<i>se montó</i>', 'h3')} sobre la P`, 84);
  const h4 = mkH(K.y4 - 0.05, S.D2[1] + 0.3, `…y la P quedó ${hlSpan('<i>en una raya</i>', 'h4')}`, 78);
  const hl1 = h1.querySelector('.h1'), hl2 = h2.querySelector('.h2'), hl3 = h3.querySelector('.h3'), hl4 = h4.querySelector('.h4');
}

/* ======================================================================
   E0 · «DE TANTO ESCRIBIRLO RÁPIDO…» — montaje: la misma anotación, cada vez más deprisa (la s va bajando)
   ====================================================================== */
{
  const VV = [];
  const c = scene(S.E0[0], S.E0[1], t => {
    VV.forEach((v, k) => {
      const t0 = S.E0[0] + 0.06 + k * 0.24;
      set(v.e, { s: pop(t, t0, 0.22), r: v.r, o: t < t0 ? 0 : 1 });
      v.paths.forEach(pp => pp.style.strokeDashoffset = f1(100 * (1 - p(t, t0 + 0.04, 0.2))));
      set(v.ar, { o: t > t0 + 0.12 ? 1 : 0 });
    });
    const kk = clamp((t - S.E0[0] - 0.06) / 0.24), k = Math.min(4, Math.floor(kk + 0.0001 * 0)), v = VV[Math.min(4, Math.floor((t - S.E0[0] - 0.06) / 0.24))] || VV[0];
    void k;
    set(ql, { x: v.x + 150 + Math.sin(t * 50) * 16, y: v.y - 60 + Math.cos(t * 50) * 10, r: 16, o: t > S.E0[0] + 0.05 && t < S.E0[0] + 1.3 ? 1 : 0 });
    SPD.forEach((s, i) => set(s, { x: -((t * 2400 + i * 300) % 1400) + 700, o: 0.5 }));
    set(chF, { s: pop(t, K.rapido, 0.3), r: -6, o: t < K.rapido ? 0 : 1 });
  }, { clip: true, cut: true, z: 12 });
  sceneBg(c, { background: '#F7EFD9', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 64px)' });
  const SPD = [0, 1, 2, 3, 4].map(i => box(c, 0, 420 + i * 190, 420, 8, { background: 'rgba(43,33,24,.18)', borderRadius: '4px', zIndex: 1 }));
  const POS = [[80, 450], [390, 450], [700, 450], [235, 830], [545, 830]];
  POS.forEach((q, k) => {
    const e = box(c, q[0], q[1], 270, 330, { zIndex: 5, background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '18px', boxShadow: `6px 7px 0 ${SH}` });
    const g = box(e, 20, 10, 230, 300); g.innerHTML = handVariant(k);
    const ar = el('div', c, { left: px(q[0] + 250), top: px(q[1] + 120), fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: OUTL(INK, 4), zIndex: 6 }, k === 2 ? '' : k < 4 ? '→' : '');
    VV.push({ e, paths: [...g.querySelectorAll('.hv')], ar, x: q[0], y: q[1], r: [-4, 3, -2, 4, -3][k] });
  });
  const ql = box(c, 0, 0, 120, 240, { zIndex: 9 }); ql.innerHTML = quillSvg();
  const chF = chip(c, 640, 1180, '¡más rápido!', { size: 52, bg: PINK, z: 20 });
  headline(S.E0[0], S.E0[1], 'De tanto escribirlo *rápido*…', { size: 88, hlT: K.rapido, y: 210 });
}
