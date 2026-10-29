/* Ep. 35 · «¿» v3 — escenas L0–L4 (todo clavado por texto vía K) */
const SWING = t => Math.sin(t * Math.PI * 2 * 1.0) * 8; // péndulo ±8°, 1 ciclo/s

/* ======================================================================
   A0 · PORTADA — «¿» gigante que se balancea + Cervantes asomando + «¿CERVANTES NO LO USABA?»
   El sello «¡NUNCA!» cae cuando la voz dice «nunca».
   ====================================================================== */
{
  const c = scene(S.A0[0], S.A0[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, 0, 2.4, E.linear) });
    set(ry, { r: t * 10 });
    set(gq, { r: SWING(t) });
    const no = t > K.nunca ? Math.sin((t - K.nunca) * 18) * 7 * (1 - p(t, K.nunca + 0.3, 0.6)) : 0;
    set(cv.d, { x: Math.sin(t * 2.2) * 6, y: wobble(t, 0.6, 4), r: -6 + Math.sin(t * 2.2) * 2 + no });
    face(cv, t, { look: [-7, -4], brow: t > K.nunca ? -10 : -6, seed: 0.4 });
    set(l1, { r: -1.5 + wobble(t, 0.5, 0.6), s: 1 + 0.025 * Math.sin(t * 3.4) });
    set(l2, { r: 1.2 + wobble(t, 0.45, 0.6, 1), s: 1 + 0.025 * Math.sin(t * 3.4 + 1) });
    stampA(nu, t, K.nunca, -9, 1);
    set(ql, { r: -24 + Math.sin(t * 7) * 8, s: pop(t, K.escribio, 0.3), o: t < K.escribio ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 66%, rgba(255,230,0,.45), rgba(255,230,0,0) 52%)' });
  const ry = rays(cam, -160, 300, 1400, 26, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 310, 1080, `¿${hlSpan('CERVANTES', 'hc0')}`, { fontSize: '136px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 40, whiteSpace: 'nowrap' });
  l1.querySelector('.hc0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const l2 = BIGT(cam, 0, 494, 1080, 'NO LO USABA?', { fontSize: '124px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 40, whiteSpace: 'nowrap' });
  const cv = mkCerv(cam, [500, 900, 470, 600]); cv.d.style.zIndex = 8;
  const gq = box(cam, 110, 640, 640, 960, { zIndex: 10, transformOrigin: '320px 40px' }); gq.innerHTML = glyphSvg('¿', { fs: 960, base: 720 });
  const ql = box(cam, 770, 1010, 120, 240, { zIndex: 13, transformOrigin: '60px 230px' }); ql.innerHTML = quillSvg();
  const nu = stamp(cam, 40, 1000, '¡NUNCA!', { size: 100, bw: 16, z: 45, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   A1 · «Y TÚ LO USAS TODOS LOS DÍAS» — tu chat lleno de «¿»
   ====================================================================== */
headline(S.A1[0], S.A1[1], 'Y tú, *cada día*', { size: 116, hlT: K.cada, y: 236 });
{
  const MS = [];
  const c = scene(S.A1[0], S.A1[1], t => {
    const k = p(t, S.A1[0], 0.3, E.outBack);
    set(ph, { y: (1 - k) * 700, r: -3 + wobble(t, 0.5, 0.6) });
    MS.forEach(m => { set(m.e, { s: pop(t, m.t, 0.32), o: t < m.t ? 0 : 1 }); set(m.q, { s: t > m.t ? 1 + 0.5 * (1 - p(t, m.t + 0.05, 0.3)) : 1 }); });
    const tap = MS.some(m => t > m.t - 0.12 && t < m.t + 0.04);
    set(th, { y: tap ? 18 : 0 });
    set(key, { s: tap ? 1.25 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0', backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const ph = box(c, 300, 400, 480, 938, { zIndex: 5 });
  let keys = ''; const KR = ['qwertyuiop', 'asdfghjklñ', 'zxcvbnm'];
  KR.forEach((r, j) => [...r].forEach((ch, i) => { const x = 40 + i * 37 + j * 14, y = 640 + j * 50; keys += `<rect x="${x}" y="${y}" width="32" height="42" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/><text x="${x + 16}" y="${y + 30}" text-anchor="middle" font-family="Bricolage" font-weight="600" font-size="22" fill="${INK}">${ch}</text>`; }));
  ph.innerHTML = phoneSvg(keys);
  [['Vienes', K.tu0], ['Cenamos', K.usas], ['Qué tal', K.cada]].forEach(([tx, tt], i) => {
    const e = el('div', ph, { left: px(i % 2 ? 150 : 50), top: px(110 + i * 150), background: i % 2 ? '#FFF3A8' : '#fff', border: `5px solid ${INK}`, borderRadius: i % 2 ? '30px 30px 6px 30px' : '30px 30px 30px 6px', padding: '10px 26px 14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '56px', color: INK, whiteSpace: 'nowrap', boxShadow: `5px 5px 0 ${SH}`, zIndex: 4 }, `<span class="q" style="display:inline-block;color:${RED}">¿</span>${tx}?`);
    MS.push({ e, q: e.querySelector('.q'), t: tt - 0.04 });
  });
  const key = el('div', ph, { left: '180px', top: '800px', width: '120px', height: '66px', background: YEL, border: `4px solid ${INK}`, borderRadius: '12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', lineHeight: '62px', textAlign: 'center', color: INK, zIndex: 3, boxShadow: `4px 4px 0 ${INK}` }, '¿');
  const th = box(c, 470, 1190, 200, 200, { zIndex: 8 }); th.innerHTML = `<svg viewBox="-100 -100 200 200" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, -8, 1.5)}</svg>`;
}

/* ======================================================================
   B1 · «EN TODO EL QUIJOTE NO HAY NI UN SOLO SIGNO DE ABRIR PREGUNTA. NI UNO.»
   plano 1: la página de 1605 entera y la lupa · plano 2 (en «ni»): zoom a una pregunta con el hueco vacío · «NI UNO» sella
   ====================================================================== */
headline(S.B1[0], K.no1 - 0.2, 'El Quijote *de 1605*…', { size: 108, hlT: K.mil1, y: 236 });
headline(K.no1 - 0.06, S.B1[1], '…ni un solo *«¿»*', { size: 112, hlT: K.ni, y: 236 });
{
  const QL = [];
  const c = scene(S.B1[0], S.B1[1], t => {
    const k = p(t, S.B1[0], 0.35, E.outBack);
    const z = t > K.no1 - 0.06 ? 1 : 0;              // corte de plano: zoom a la 2.ª pregunta
    const z3 = false;
    set(cam, { s: z3 ? 1.2 : z ? 1.3 + 0.04 * p(t, K.no1, 1.6, E.linear) : 1, x: z3 ? 30 : z ? 50 : 0, y: z3 ? 50 : z ? 70 : 0 });
    set(pg.wrap, { y: (1 - k) * 900, r: z ? 0 : -1.5 + wobble(t, 0.4, 0.4) });
    let li = 0; QL.forEach((q, i) => { if (t > q.t - 0.15) li = i; });
    const q = QL[li], kq = p(t, q.t - 0.25, 0.25, E.inOutCubic), qp = QL[Math.max(0, li - 1)];
    set(lu, { x: lerp(qp.lx, q.lx, li ? kq : 1), y: lerp(qp.ly, q.ly, li ? kq : 1) + Math.sin(t * 5) * 6, r: -8, o: t < S.B1[0] + 0.1 || z ? 0 : 1 });
    QL.forEach(q => {
      const on = t > q.t;
      q.qm.style.color = on ? RED : INK;
      set(q.qm, { s: on ? 1 + 0.25 * (1 - p(t, q.t, 0.3)) : 1 });
      set(q.gh, { o: on ? (Math.floor((t - q.t) * 4) % 2 ? 1 : 0.3) : 0 });
    });
    set(ar, { o: z && t > K.ni ? 1 : 0, x: Math.sin(t * 8) * 8 });
    stampA(st, t, K.no1 + 0.1, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#D9CDB4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px', zIndex: 2 });
  const pg = paperPiece(cam, 120, 420, 840, 860, { seed: 16, bg: '#F3E6C6' });
  el('div', pg.inner, { left: 0, top: '28px', width: '822px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '44px', color: INK, letterSpacing: '0.06em' }, 'DON QVIXOTE');
  el('div', pg.inner, { left: 0, top: '84px', width: '822px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'Madrid · año 1605');
  box(pg.inner, 60, 136, 702, 4, { background: INK });
  const r = rng(29); const qlines = [2, 6, 10];
  for (let i = 0; i < 13; i++) {
    const y = 170 + i * 50;
    if (qlines.includes(i)) {
      const k = qlines.indexOf(i), w = 380 + k * 70;
      const gh = el('div', pg.inner, { left: '50px', top: px(y - 26), fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 4 }, '¿');
      box(pg.inner, 50, y - 18, 44, 52, { border: `4px dashed ${PINK}`, borderRadius: '8px', zIndex: 3 });
      box(pg.inner, 110, y, w, 12, { background: INK, opacity: 0.55, borderRadius: '6px' });
      const qm = el('div', pg.inner, { left: px(118 + w), top: px(y - 30), fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: INK, zIndex: 4 }, '?');
      QL.push({ gh, qm, t: [K.en1 + 0.3, K.original, K.mil1 + 0.3][k], lx: 120 + 118 + w - 120, ly: 420 + y - 110 });
    } else box(pg.inner, 60, y, 560 + r() * 140, 12, { background: INK, opacity: 0.4, borderRadius: '6px' });
  }
  const lu = box(cam, 0, 0, 300, 300, { zIndex: 20 }); lu.innerHTML = lupaSvg();
  const ar = box(c, 40, 700, 120, 110, { zIndex: 25 }); ar.innerHTML = arrowSvg('M20,10 Q10,60 60,100', PINK, 10);
  const lbl = el('div', c, { left: '60px', top: '620px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: '#fff', background: INK, borderRadius: '40px', padding: '6px 24px 10px', zIndex: 26, whiteSpace: 'nowrap' }, 'aquí, nada');
  const st = stamp(c, 250, 1030, 'NI UNO', { size: 136, bw: 18, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  SC[SC.length - 1].fn = (f => t => { f(t); set(lbl, { o: t > K.ni ? 1 : 0, s: pop(t, K.ni, 0.3) }); })(SC[SC.length - 1].fn);
}

/* D1 · «…PORQUE EL SIGNO TODAVÍA NO EXISTÍA» — la pizarra: el «¿» se borra como tiza en «no existía» */
headline(S.D1[0], S.D1[1], 'Todavía *no existía*', { size: 112, hlT: K.existia, y: 236 });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const ke = p(t, K.no1b, K.existiaE - K.no1b + 0.15, E.inOutCubic);
    set(er, { x: lerp(-60, 600, ke), y: Math.sin(ke * Math.PI * 5) * 110, r: -14, o: t < K.no1b - 0.25 ? 0 : 1 });
    wipe.style.width = px(f1(lerp(0, 700, ke)));
    set(cv.d, { s: pop(t, S.D1[0] + 0.05, 0.35), y: wobble(t, 0.6, 3), r: t > K.no1b ? -4 : 3 });
    face(cv, t, { look: t > K.no1b ? [-6, -6] : [-6, -2], brow: t > K.no1b ? -12 : 0, seed: 1.4 });
    popA(ch, t, S.D1[0] + 0.15, { r: -3 });
    set(gq, { r: t < K.no1b ? SWING(t) * 0.4 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  box(c, 60, 400, 960, 820, { background: '#2f3a33', border: `24px solid ${WOOD}`, boxShadow: `inset 0 0 0 6px ${INK}, 0 0 0 6px ${INK}, 10px 12px 0 6px ${SH}`, zIndex: 1, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 9px)' });
  const gq = el('div', c, { left: '150px', top: '400px', width: '560px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '700px', lineHeight: '800px', color: '#f1ede2', opacity: 0.92, zIndex: 2, transformOrigin: '280px 120px' }, '¿');
  const wipe = box(c, 130, 430, 0, 760, { background: '#2f3a33', zIndex: 3 });
  const er = box(c, 120, 720, 240, 140, { zIndex: 6 });
  er.innerHTML = `<svg viewBox="0 0 260 150" width="240" height="140" style="overflow:visible">${cut('<rect x="10" y="20" width="240" height="110" rx="14"/>', 5, 7)}<rect x="10" y="20" width="240" height="70" rx="14" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="10" y="80" width="240" height="50" rx="8" fill="#e8e2d4" stroke="${INK}" stroke-width="5"/><rect x="10" y="20" width="240" height="70" fill="url(#hW)" opacity=".4"/></svg>`;
  const cv = mkCerv(c, [600, 830, 380, 486]); cv.d.style.zIndex = 8;
  const ch = chip(c, 420, 1240, 'en 1605, aún no', { size: 44, bg: INK, color: YEL, z: 20 });
}

/* C0 · GOLPE AMARILLO: «¿Y ENTONCES QUIÉN SE LO INVENTÓ…?» */
colorHit(S.C0[0], S.C0[1], YEL, c => {
  const a = el('div', c, { left: 0, top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: '180px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, '¿QUIÉN');
  const b = el('div', c, { left: 0, top: '720px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '130px', lineHeight: '150px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, 'se lo inventó?');
  const g1 = el('div', c, { left: '60px', top: '280px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '260px', color: INK, opacity: 0.18, zIndex: 2 }, '¿');
  const g2 = el('div', c, { left: '780px', top: '960px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '260px', color: INK, opacity: 0.18, zIndex: 2 }, '?');
  return t => {
    set(a, { s: lerp(1.5, 1, p(t, S.C0[0], 0.2, E.outBack)), r: -3 });
    set(b, { s: pop(t, K.invento3 - 0.25, 0.3), r: 2, o: t < K.invento3 - 0.25 ? 0 : 1 });
    a.style.textShadow = glitch(t, K.quien, 0.25) || 'none';
    set(g1, { r: SWING(t) * 2 }); set(g2, { r: -SWING(t) * 2 });
  };
});

/* C1 · «…Y POR QUÉ SOLO LO USAMOS NOSOTROS?» — la misma pregunta en cuatro idiomas */
headline(S.C1[0], S.C1[1], '¿Por qué *solo nosotros*?', { size: 104, hlT: K.solo3, y: 236 });
{
  const BB = [];
  const c = scene(S.C1[0], S.C1[1], t => {
    BB.forEach(b => { set(b.w, { s: pop(t, b.t, 0.32), r: b.r + wobble(t, 0.5, 0.8, b.r), o: t < b.t ? 0 : 1 }); });
    set(es.w, { s: pop(t, K.solo3 - 0.05, 0.36) * (t > K.usamos ? 1.06 + 0.02 * Math.sin(t * 6) : 1), o: t < K.solo3 - 0.05 ? 0 : 1 });
    set(esq, { s: t > K.solo3 ? 1 + 0.5 * (1 - p(t, K.solo3 + 0.05, 0.3)) : 1 });
    set(only, { s: pop(t, K.usamos, 0.3), o: t < K.usamos ? 0 : 1, r: -5 });
    XS.forEach((x, i) => { const tt = K.usamos + 0.15 + i * 0.15; set(x, { s: pop(t, tt, 0.3), o: t < tt ? 0 : 1, r: -8 }); });
  }, { clip: true });
  sceneBg(c, { background: '#CFE0EA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 60px)' });
  const mkB = (x, y, lang, txt, tt, r, bg) => {
    const w = box(c, x, y, 10, 10, { zIndex: 10 });
    el('div', w, { left: '0px', top: '0px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '32px', color: '#fff', background: INK, borderRadius: '30px', padding: '4px 18px 6px', whiteSpace: 'nowrap', zIndex: 3 }, lang);
    const b = bubble(w, 0, 44, txt, { size: 66, tail: 'bl', z: 2, bg: bg || '#fff', font: 'Playfair' });
    const o = { w, b, t: tt, r }; BB.push(o); return o;
  };
  mkB(90, 480, 'INGLÉS', 'Are you hungry?', S.C1[0] + 0.08, -3);
  mkB(400, 660, 'FRANCÉS', 'As-tu faim ?', S.C1[0] + 0.22, 3);
  mkB(110, 840, 'ALEMÁN', 'Hast du Hunger?', S.C1[0] + 0.36, -2);
  const es = mkB(220, 1050, 'ESPAÑOL', `<span class="esq" style="display:inline-block;color:${RED}">¿</span>Tienes hambre?`, K.solo3 - 0.05, 0, '#FFF3A8');
  BB.pop();
  const esq = es.b.querySelector('.esq');
  const only = chip(c, 640, 990, '¡se abre!', { size: 46, bg: RED, color: '#fff', z: 30 });
  const XS = [[600, 500], [800, 690], [660, 860]].map(([x, y]) => chip(c, x, y, 'sin «¿»', { size: 38, bg: '#8E8A80', color: '#fff', z: 30 }));
}

/* C2 · «TE LO CUENTO EN TRES PASOS.» — tres cartas boca abajo (1 · 2 · 3) */
headline(S.C2[0], S.C2[1], 'En *tres* pasos', { size: 120, hlT: K.tres3, y: 236 });
{
  const BX = [90, 405, 720], CW = 270, CH = 380;
  const c = scene(S.C2[0], S.C2[1], t => {
    cards.forEach((cd, i) => { const tt = [K.tres3, K.tres3 + 0.14, K.pasos][i] - 0.05; const kin = p(t, tt, 0.45, E.outBounce); set(cd, { y: lerp(-900, 0, kin), r: (i - 1) * 5 + (kin < 1 ? (1 - kin) * 20 : 0) + wobble(t, 0.6, 0.8, i), o: t < tt ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const cards = [0, 1, 2].map(i => {
    const w = box(c, BX[i], 560, CW, CH, { zIndex: 10, background: INK, border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `9px 11px 0 ${SH}`, overflow: 'hidden' });
    box(w, 10, 10, CW - 32, CH - 32, { border: `4px solid ${BRASS}`, borderRadius: '14px', backgroundImage: `repeating-linear-gradient(45deg, rgba(201,162,74,.22) 0 3px, transparent 3px 14px), repeating-linear-gradient(-45deg, rgba(201,162,74,.22) 0 3px, transparent 3px 14px)` });
    el('div', w, { left: '0', top: '86px', width: px(CW - 12), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: 1, color: YEL, textShadow: `6px 6px 0 ${PINK}` }, String(i + 1));
    return w;
  });
}

/* ======================================================================
   PASO 1 · «1 · Se lo inventó la Academia» (titular que aguanta todo L4)
   ====================================================================== */
stepHead(K.uno4 - 0.06, K.dos - 0.08, 1, ['Se lo inventó', 'la *Academia*'], { size: 88, ty: 0 });

/* D2 · «UNO: EN 1754…» — emblema + libro de Ortografía + sello «1754» */
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(em, { s: pop(t, S.D2[0] + 0.02, 0.45) * (1 + 0.04 * p(t, S.D2[0], 2.4, E.linear)), r: wobble(t, 0.5, 1), o: t < S.D2[0] + 0.02 ? 0 : 1 });
    set(ry, { r: t * 12 });
    set(bk, { y: (1 - p(t, S.D2[0] + 0.15, 0.4, E.outBack)) * 900, r: 4 + wobble(t, 0.5, 0.8) });
    popA(lb, t, S.D2[0] + 0.35, { r: -3 });
    stampA(st, t, K.mil, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  const ry = rays(c, -160, 160, 1400, 28, 'rgba(201,162,74,.20)', 'rgba(0,0,0,0)', 0);
  const em = box(c, 90, 420, 440, 469, { zIndex: 5 }); em.innerHTML = emblemSvg();
  const bk = box(c, 560, 430, 340, 453, { zIndex: 4 }); bk.innerHTML = oldBookSvg('ORTOGRAFÍA', 'R. Academia');
  const lb = chip(c, 300, 905, 'Real Academia Española', { size: 42, bg: INK, color: YEL, z: 20 });
  const st = stamp(c, 390, 990, '1754', { size: 180, bw: 20, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal', font: 'Playfair' });
  st.style.fontWeight = 900;
}

/* D3 · «CUANDO CERVANTES LLEVABA MÁS DE CIEN AÑOS MUERTO» — lápida + fantasma; el 1754 sigue en pantalla */
{
  const c = scene(S.D3[0], S.D3[1], t => {
    set(tb, { y: (1 - p(t, S.D3[0], 0.35, E.outBack)) * 700 });
    const kg = p(t, S.D3[0] + 0.3, 0.6, E.outCubic);
    set(gh.d, { y: lerp(200, 0, kg) + Math.sin(t * 2.4) * 14, x: Math.sin(t * 1.7) * 10, o: 0.55 * kg, r: Math.sin(t * 1.7) * 3 });
    face(gh, t, { look: [8, -4], brow: t > K.cien ? -14 : -4, seed: 2.1 });
    set(qq, { s: pop(t, K.cien, 0.35), r: SWING(t), o: t < K.cien ? 0 : 1 });
    set(c54, { s: pop(t, S.D3[0] + 0.05, 0.3), r: 4 });
    stampA(st, t, K.llevaba, -6, 1);
  }, { clip: true });
  sceneBg(c, { background: '#C9D3C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const tb = box(c, 300, 640, 460, 600, { zIndex: 4 }); tb.innerHTML = tombSvg();
  const gh = mkCerv(c, [120, 400, 360, 460]); gh.d.style.zIndex = 6;
  const qq = el('div', c, { left: '600px', top: '400px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '220px', lineHeight: 1, color: RED, textShadow: OUTL(INK, 8), zIndex: 8, transformOrigin: '50% 10%' }, '¿');
  const c54 = chip(c, 660, 640, '1754', { size: 58, bg: INK, color: YEL, z: 20 });
  const st = stamp(c, 120, 830, '+ DE 100 AÑOS', { size: 86, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* D4 · «LA REAL ACADEMIA DECIDIÓ INVENTÁRSELO» — el «?» de cerrar da la vuelta y nace el «¿» */
{
  const c = scene(S.D4[0], S.D4[1], t => {
    set(em, { s: pop(t, S.D4[0], 0.35) * 0.9, r: wobble(t, 0.5, 1) });
    set(ry, { r: -t * 12 });
    popA(lb, t, K.real, { r: -3 });
    const kr = p(t, K.decidio, 0.55, E.inOutCubic);
    set(gq, { r: kr * 180 + (kr === 0 ? SWING(t) * 0.5 : 0), s: pop(t, S.D4[0] + 0.1, 0.35) * (1 + 0.15 * (kr > 0.98 ? 1 - p(t, K.decidio + 0.55, 0.3) : 0)) });
    set(arc, { o: kr > 0.02 && kr < 0.98 ? 1 : 0, r: kr * 180 });
    set(l1, { o: kr < 0.5 ? 1 : 0 }); set(l2, { o: kr >= 0.5 ? 1 : 0, s: pop(t, K.decidio + 0.28, 0.3) });
    stampA(st, t, K.decidio + 0.3, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E4DCF0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 3px, transparent 3px 50px)' });
  const ry = rays(c, -160, 200, 1400, 28, 'rgba(201,162,74,.18)', 'rgba(0,0,0,0)', 0);
  const em = box(c, 90, 420, 300, 320, { zIndex: 5 }); em.innerHTML = emblemSvg();
  const lb = chip(c, 80, 760, 'la Academia', { size: 42, bg: INK, color: YEL, z: 20 });
  const arc = box(c, 400, 400, 520, 520, { zIndex: 3, transformOrigin: '260px 260px' });
  arc.innerHTML = arrowSvg('M40,260 A220,220 0 0,1 480,260 M440,200 L480,260 L520,200', PINK, 14);
  const gq = box(c, 460, 400, 400, 600, { zIndex: 10, transformOrigin: '200px 330px' }); gq.innerHTML = glyphSvg('?', { fs: 640, base: 560 });
  const l1 = chip(c, 560, 1010, 'el de cerrar…', { size: 46, bg: INK, color: '#fff', z: 30 });
  const l2 = chip(c, 520, 1010, '…del revés: ¿', { size: 50, bg: RED, color: '#fff', z: 30 });
  const st = stamp(c, 110, 1110, '¡INVENTADO!', { size: 100, bw: 15, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}
