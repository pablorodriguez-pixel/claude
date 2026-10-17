/* Ep. 17 · escenas L4–L7 */

/* ======================================================================
   E1 · PESA ≈ 2 % … Y SE LLEVA ≈ 20 % DE LA ENERGÍA — dos columnas
   ====================================================================== */
headlineN(S.E1[0], K.lleva - 0.25, 'Pesa más o menos un *2 %* de tu cuerpo', { size: 74, hlT: K.dos });
headlineN(K.lleva - 0.25, S.E1[1], '…y se lleva cerca del *20 %* de tu energía', { size: 74, hlT: K.veinte });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    [colL, colR].forEach((q, i) => set(q.w, { s: pop(t, S.E1[0] + 0.05 + i * 0.12, 0.45), r: [-2, 2][i], o: 1 }));
    // columna PESO: se llena de cuerpo; la rodaja del cerebro arriba
    set(colL.fill, { sy: p(t, K.pesa - 0.1, 0.5, E.outCubic) });
    set(colL.slice, { o: t > K.dos ? 1 : 0, sx: p(t, K.dos, 0.25, E.outBack) });
    stampA(c2, t, K.dos, -6, 1);
    set(colR.fill, { sy: p(t, K.lleva - 0.1, 0.5, E.outCubic) * 0.2 });
    colR.fill.style.background = t > K.veinte ? YEL : '#fff';
    set(colR.rest, { o: t > K.lleva ? 1 : 0, sy: p(t, K.lleva - 0.1, 0.5, E.outCubic) });
    stampA(c20, t, K.veinte, 6, 1);
    BOLTS.forEach((b, i) => { const t0 = K.energia - 0.1 + i * 0.12; set(b, { s: pop(t, t0, 0.35), r: [-12, 8, -4][i] + Math.sin(t * 8 + i) * 6, o: t < t0 ? 0 : 1 }); });
    // el cerebro mira una columna y luego la otra
    const look = t > K.lleva ? [10, 0] : t > K.pesa ? [-10, 0] : [0, 0];
    set(brain.d, { s: pop(t, K.cerebro4 - 0.05, 0.4), y: wobble(t, 0.6, 4) - (t > K.veinte && t < K.veinte + 0.6 ? Math.abs(Math.sin((t - K.veinte) * 10)) * 18 : 0), o: t < K.cerebro4 - 0.05 ? 0 : 1 });
    brainFace(brain, t, { look, mouth: t > K.veinte ? 'o' : 's', bL: t > K.veinte ? 14 : 4, bR: t > K.veinte ? 14 : 4, zones: t > K.energia ? ALLZ : [0, 0, 0, 0, 0], sweat: t > K.veinte + 0.3, seed: 2.1 });
    set(lens, { s: pop(t, K.dos + 0.1, 0.4), o: t < K.dos + 0.1 ? 0 : 1, r: -6 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const mkCol = (x, title, fillCol) => {
    const w = box(c, x, 470, 300, 560, { zIndex: 4, transformOrigin: '50% 100%' });
    box(w, 0, 0, 300, 90, { background: INK, border: `5px solid ${BRASS}`, borderRadius: '12px', fontFamily: 'Rye', fontSize: '48px', lineHeight: '78px', color: YEL, textAlign: 'center' }, title);
    const tube = box(w, 30, 110, 240, 440, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `9px 10px 0 ${SH}`, overflow: 'hidden' });
    const rest = box(tube, 0, 0, 226, 426, { background: 'repeating-linear-gradient(45deg, rgba(43,33,24,.18) 0 3px, transparent 3px 12px)', transformOrigin: '50% 100%' });
    const fill = box(tube, 0, 0, 226, 426, { background: fillCol, transformOrigin: '50% 100%', borderTop: `5px solid ${INK}` });
    return { w, tube, fill, rest };
  };
  const colL = mkCol(120, 'PESO', '#8a6a52');
  box(colL.fill, 0, 0, 226, 426, { backgroundImage: 'repeating-linear-gradient(38deg, rgba(43,33,24,.35) 0 2px, transparent 2px 7px)' });
  el('div', colL.fill, { left: '0', top: '200px', width: '226px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '34px', color: '#fff' }, 'tu cuerpo');
  colL.slice = box(colL.tube, 0, 0, 226, 14, { background: PINK, borderBottom: `4px solid ${INK}`, zIndex: 3, transformOrigin: '50% 50%' });
  const colR = mkCol(660, 'ENERGÍA', '#fff');
  el('div', colR.rest, { left: '0', top: '120px', width: '226px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, lineHeight: 1.1 }, 'resto del<br>cuerpo');
  const c2 = stamp(c, 420, 580, '≈ 2 %', { size: 96, bw: 11, z: 40, col: INK, bg: '#fff', blend: 'normal' });
  const c20 = stamp(c, 560, 1060, '≈ 20 %', { size: 100, bw: 11, z: 40, col: INK, bg: YEL, blend: 'normal' });
  const lens = box(c, 290, 520, 130, 130, { zIndex: 30 });
  lens.innerHTML = `<svg width="130" height="170" style="overflow:visible"><path d="M100,100 L150,160" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M100,100 L150,160" stroke="${WOOD}" stroke-width="12" stroke-linecap="round"/><circle cx="62" cy="62" r="60" fill="${INK}"/><circle cx="62" cy="62" r="54" fill="${BRASS}"/><circle cx="62" cy="62" r="46" fill="rgba(255,255,255,.5)" stroke="${INK}" stroke-width="4"/><rect x="22" y="52" width="80" height="20" fill="${PINK}" stroke="${INK}" stroke-width="3"/></svg>`;
  const BOLTS = [[700, 980], [800, 960], [890, 990]].map(([x, y]) => { const b = box(c, x - 40, y - 10, 60, 96, { zIndex: 20 }); b.innerHTML = boltSvg(); return b; });
  const brain = mkBrain(c, [420, 740, 260, 217]); brain.d.style.zIndex = 10;
}

/* ======================================================================
   E2 · NADIE GASTARÍA TANTO EN ALGO QUE NO USA — el cerebro se come la barrita
   ====================================================================== */
headline(S.E2[0], S.E2[1], 'Nadie gastaría *tanto* en algo que no usa', { size: 76, hlT: K.tanto });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    const t0 = K.gastaria - 0.1, n = clamp((t - t0) / 0.42, 0, 6);
    const bites = Math.floor(n), ph = n - bites;
    const ch = t < t0 ? 0.6 : Math.abs(Math.cos(ph * Math.PI));
    set(brain.d, { y: wobble(t, 0.6, 3) + (t > t0 ? -ch * 8 : 0), r: t > t0 ? -3 + ch * 3 : 0 });
    brainFace(brain, t, { mouth: 'c', chomp: ch, closed: t > t0 && ch < 0.3, look: [8, 2], zones: ALLZ, blush: true, seed: 1.7 });
    const eaten = t < t0 ? 0 : Math.min(5, bites) * 70 + (bites < 5 ? 0 : 0);
    bar.d.style.clipPath = `inset(-20px -20px -20px ${eaten}px)`;
    set(bar.d, { x: -eaten * 0.9, y: Math.sin(t * 9) * 3 + (1 - p(t, S.E2[0] + 0.05, 0.4, E.outBack)) * 0, o: 1 });
    set(barW, { x: (1 - p(t, S.E2[0] + 0.02, 0.4, E.outBack)) * 700 });
    NAM.forEach((q, i) => { const tt = t0 + 0.2 + i * 0.84; set(q, { s: pop(t, tt, 0.3), y: -p(t, tt, 0.6) * 40, o: t < tt ? 0 : 1 - p(t, tt + 0.5, 0.2), r: [-10, 8, -6][i] }); });
    CR.forEach((q, i) => { const tt = t0 + 0.1 + (i % 5) * 0.42; const k = clamp((t - tt) / 0.7); set(q, { x: (i % 2 ? 1 : -1) * k * (40 + i * 6), y: k * k * 260, o: t < tt || k >= 1 ? 0 : 1, r: k * 300 }); });
    popA(ch20, t, K.tanto, { r: -4 });
    popA(nu, t, K.nousa, { r: 4 });
  });
  sceneBg(c, { background: '#F1E5CB', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const brain = mkBrain(c, [100, 500, 760, 633]); brain.d.style.zIndex = 4;
  const barW = box(c, 0, 0, 1080, 1920, { zIndex: 8 });
  const bar = energyBar(barW, 600, 735, 420, 110);
  const NAM = [0, 1, 2].map(i => el('div', c, { left: px([700, 560, 760][i]), top: px([560, 520, 600][i]), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', color: '#fff', textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 20 }, '¡ÑAM!'));
  const CR = []; for (let i = 0; i < 10; i++) CR.push(box(c, 600 + (i % 3) * 10, 820, 22, 18, { background: PINK, border: `3px solid ${INK}`, borderRadius: '5px', zIndex: 9 }));
  const ch20 = chip(c, 300, 1150, '≈ 20 % de tu energía', { size: 50, bg: INK, color: YEL, z: 30 });
  const nu = stamp(c, 560, 430, '¿sin usar?', { size: 64, bw: 8, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal', font: 'Playfair' });
}

/* ======================================================================
   F1 · ¡OJO! NADIE SABE DE DÓNDE SALIÓ EL MITO (+ cameo del emú)
   ====================================================================== */
headline(K.nadie5 - 0.15, S.F1[1], 'Nadie sabe de dónde salió el *mito*', { size: 80, hlT: K.mito });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const kt = p(t, K.ojo + 0.55, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.45, kt), x: kt * 200, y: kt * 540, r: -10, o: t < K.ojo ? 0 : 1 });
    set(scroll.wrap, { s: pop(t, K.nadie5, 0.4), r: -3 + wobble(t, 0.5, 1.5), o: t < K.nadie5 ? 0 : 1 });
    AR.forEach((a, i) => { const t0 = K.sabe + i * 0.25; a.style.opacity = t > t0 ? 1 : 0; a.style.clipPath = `inset(0 ${f1((1 - p(t, t0, 0.35)) * 100)}% 0 0)`; });
    QM.forEach((q, i) => { const t0 = K.donde + i * 0.15; set(q, { s: pop(t, t0, 0.35), y: Math.sin(t * 4 + i) * 12, r: [-14, 10, -6][i], o: t < t0 ? 0 : 1 }); });
    set(lens, { x: Math.cos(t * 2.4) * 120, y: Math.sin(t * 3.1) * 50, r: -8, o: t > K.nadie5 ? 1 : 0, s: pop(t, K.nadie5 + 0.2, 0.4) });
    // cameo del emú: asoma y mira a cámara
    const ein = K.donde - 0.2, look = t > K.salio && t < K.salio + 0.6;
    set(emu.d, { x: (1 - p(t, ein, 0.3, E.outBack)) * 300 + p(t, S.F1[1] - 0.2, 0.2) * 300, r: -14 + (look ? 8 : 0), y: wobble(t, 0.6, 4) });
    face(emu, t, { look: look ? [0, 0] : [-14, 4], half: !look, blink: false, bL: look ? 18 : 0, bR: look ? 24 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const scroll = paperPiece(c, 200, 600, 680, 380, { seed: 61, bg: '#FBF6EA' });
  el('div', scroll.inner, { left: '0', top: '40px', width: '662px', textAlign: 'center', fontFamily: 'Rye', fontSize: '60px', color: RED, whiteSpace: 'nowrap' }, 'EL MITO');
  el('div', scroll.inner, { left: '0', top: '130px', width: '662px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK, whiteSpace: 'nowrap' }, '«solo el 10 %»');
  el('div', scroll.inner, { left: '0', top: '268px', width: '662px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, 'origen: ¿?');
  const AR = [['M0,40 C80,10 160,60 240,40', 60, 470], ['M240,40 C160,80 80,10 0,40', 690, 1000], ['M0,40 C80,70 160,10 240,40', 60, 1020]].map(([d, x, y]) => { const a = box(c, x, y, 260, 80, { zIndex: 6 }); a.innerHTML = arrowSvg(d, PINK, 8); return a; });
  const QM = [qMark(c, 300, 450, 130), qMark(c, 920, 1020, 120), qMark(c, 330, 1060, 120)];
  const lens = box(c, 560, 700, 200, 200, { zIndex: 20 });
  lens.innerHTML = `<svg width="200" height="260" style="overflow:visible"><path d="M160,160 L230,250" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M160,160 L230,250" stroke="${WOOD}" stroke-width="18" stroke-linecap="round"/><circle cx="100" cy="100" r="96" fill="${INK}"/><circle cx="100" cy="100" r="88" fill="${BRASS}"/><circle cx="100" cy="100" r="76" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="4"/></svg>`;
  const emu = mkEmuF(c, [780, 440, 280, 420]); emu.d.style.zIndex = 3;
  const ojo = stamp(c, 230, 620, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · SE LE ATRIBUYE A EINSTEIN… CITA FALSA, «NO LO DIJO»
   ====================================================================== */
headline(S.F2[0], K.ynohay - 0.05, 'Se le *atribuye* a Einstein…', { size: 88, hlT: K.atribuye });
headline(K.ynohay - 0.05, S.F2[1], 'Ninguna *prueba* de que lo dijera', { size: 84, hlT: K.prueba5, hlc: '#ff9aa8' });
{
  const c = scene(S.F2[0], S.F2[1], t => {
    set(ein.d, { x: (1 - p(t, S.F2[0] + 0.02, 0.45, E.outBack)) * -700, y: wobble(t, 0.6, 3), r: t > K.dijera ? Math.sin((t - K.dijera) * 14) * 3 : 0 });
    const doubt = t > K.nohay;
    einFace(ein, t, { look: doubt ? [0, 0] : [8, -6], sweat: doubt, ang: doubt ? -10 : 4, bL: doubt ? 12 : 4, bR: doubt ? 12 : 8, jaw: 0, seed: 0.6 });
    set(bub, { s: pop(t, K.einstein - 0.1, 0.4), r: 2 + wobble(t, 0.5, 0.6), o: t < K.einstein - 0.1 ? 0 : 1 });
    sc.style.strokeDashoffset = f1(1000 * (1 - p(t, K.ninguna - 0.1, 0.6, E.inOutCubic)));
    popA(at, t, K.atribuye + 0.05, { r: -5 });
    popA(cf, t, K.prueba5, { r: 4 });
    stampA(nd, t, K.dijera, -10, 1);
    QQ.forEach((q, i) => { const t0 = K.nohay + i * 0.2; set(q, { s: pop(t, t0, 0.3), y: Math.sin(t * 4 + i) * 10, r: [-12, 10][i], o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -170, 380, 1420, 22, 'rgba(255,62,165,.12)', 'rgba(0,0,0,0)', 0);
  const ein = mkEin(c, [40, 660, 520, 664]); ein.d.style.zIndex = 4;
  const bub = box(c, 420, 420, 620, 420, { zIndex: 20 });
  bub.innerHTML = `<svg width="620" height="460" style="position:absolute;left:0;top:0;overflow:visible">${cut('<path d="M40,10 H580 Q610,10 610,40 V310 Q610,340 580,340 H200 L90,420 L130,340 H40 Q10,340 10,310 V40 Q10,10 40,10 Z"/>')}<path d="M40,10 H580 Q610,10 610,40 V310 Q610,340 580,340 H200 L90,420 L130,340 H40 Q10,340 10,310 V40 Q10,10 40,10 Z" fill="#fff" stroke="${INK}" stroke-width="7"/></svg>`;
  el('div', bub, { left: '0', top: '40px', width: '620px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', lineHeight: 1.08, color: INK }, '«Solo usamos<br>el 10 % del<br>cerebro»');
  const sw = box(bub, 40, 30, 540, 290, { zIndex: 5 }); sw.innerHTML = `<svg viewBox="0 0 300 160" width="100%" height="100%" preserveAspectRatio="none" style="overflow:visible"><path class="sc" pathLength="1000" d="M10,40 L290,30 M10,90 L290,80 M10,140 L290,130" stroke="${RED}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>`;
  const sc = sw.querySelector('.sc');
  const at = chip(c, 640, 860, 'cita atribuida', { size: 44, bg: INK, color: YEL, z: 30 });
  const cf = chip(c, 680, 945, 'sin prueba', { size: 44, bg: PINK, z: 30 });
  const QQ = [qMark(c, 520, 900, 100), qMark(c, 80, 600, 120)];
  const nd = stamp(c, 170, 1080, 'NO LO DIJO', { size: 118, bw: 16, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   G · GOLPE AMARILLO: TU CEREBRO TRABAJA ENTERO (sofá) → ¿TE LO CREÍAS? SÍ / NO
   ====================================================================== */
colorHit(S.G[0], S.G[1], YEL, c => {
  const g1 = box(c, 0, 0, 1080, 1920, { zIndex: 8 });
  const os = el('div', g1, { left: 0, top: '170px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: INK }, 'O sea:');
  const l1 = el('div', g1, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', color: INK }, 'Tu cerebro trabaja');
  const big = el('div', g1, { left: 0, top: '350px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '250px', color: '#fff' }, 'ENTERO');
  const q = el('div', c, { left: 0, top: '190px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', color: INK, zIndex: 9 }, '¿Te lo creías?');
  const sg = box(c, 0, 0, 1080, 1920, { zIndex: 5, transformOrigin: '540px 860px' });
  const glow = rays(sg, 90, 420, 900, 20, 'rgba(255,255,255,.55)', 'rgba(0,0,0,0)', 0); glow.style.borderRadius = '50%'; glow.style.overflow = 'hidden';
  const sofa = box(sg, 160, 760, 760, 380, { zIndex: 2 }); sofa.innerHTML = `<svg viewBox="0 0 760 380" width="760" height="380" style="overflow:visible">${sofaSvg()}</svg>`;
  const br = mkBrain(sg, [250, 640, 560, 467]); br.d.style.zIndex = 3;
  const cush = box(sg, 170, 830, 200, 120, { zIndex: 4 }); cush.innerHTML = `<svg viewBox="0 0 200 120" width="200" height="120" style="overflow:visible">${cut('<path d="M20,20 Q100,0 180,20 Q200,60 180,100 Q100,120 20,100 Q0,60 20,20 Z"/>', 4, 6)}<path d="M20,20 Q100,0 180,20 Q200,60 180,100 Q100,120 20,100 Q0,60 20,20 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><path d="M20,20 Q100,0 180,20 Q200,60 180,100 Q100,120 20,100 Q0,60 20,20 Z" fill="url(#hA)" opacity=".3"/></svg>`;
  const SP = [[230, 620], [820, 640], [150, 1000], [880, 980], [540, 560]].map(([x, y]) => sparkle(sg, x, y, 66, '#fff'));
  const hs = chip(sg, 330, 1170, 'hasta en el sofá', { size: 54, bg: INK, color: YEL, z: 10 });
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: px(1000), width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(120, 'SÍ', '#fff', INK), bN = btn(580, 'NO', INK, '#fff');
  const hand = box(c, 330, 1130, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const CM = [['FAR', '@marta_neuro', 'SÍ 😳', K.creias], ['SOL', '@dani.bcn', 'No, ya lo sabía', K.si]].map((m, i) => {
    const e = box(c, [50, 560][i], 840, 470, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    return { e, t: m[3] };
  });
  return t => {
    const Q = K.te - 0.1, kq = p(t, Q, 0.35, E.inOutCubic);
    set(g1, { o: 1 - p(t, Q, 0.15), y: -kq * 60 });
    popA(os, t, K.osea - 0.05, { rise: 30 });
    popA(l1, t, K.tu6, { rise: 30 });
    const kb = p(t, K.entero6 - 0.02, 0.2, E.outBack); set(big, { s: t < K.entero6 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < K.entero6 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.entero6, 0.3) ? glitch(t, K.entero6, 0.3) + ', ' : '') + `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    set(q, { s: pop(t, K.te, 0.35), o: t < K.te ? 0 : 1 });
    // sofá + cerebro tumbado y encendido
    const zin = p(t, K.hasta - 0.1, 0.5, E.inOutCubic);
    set(sg, { s: lerp(1 + 0.12 * zin, 0.6, kq), y: lerp(-40 * zin, -330, kq), x: (1 - p(t, S.G[0] + 0.08, 0.45, E.outBack)) * 1100 });
    set(glow, { r: t * 16, o: t > K.trabaja ? 1 : 0.2, s: 0.9 + 0.08 * Math.sin(t * 5) });
    set(br.d, { r: -12 + wobble(t, 0.4, 1.5), y: wobble(t, 0.5, 4) });
    brainFace(br, t, { closed: t > K.hasta && t < K.te, mouth: 's', zones: zonesUntil(t, [K.tu6, K.cerebro6, K.trabaja, K.trabaja + 0.15, K.entero6]), blush: true, look: t > K.te ? [0, 6] : [6, -2], bL: t > K.te ? 12 : 4, bR: t > K.te ? 12 : 4, seed: 0.3 });
    SP.forEach((s, i) => { const t0 = K.entero6 + i * 0.1; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 }); });
    set(hs, { s: pop(t, K.hasta, 0.35), r: -4, o: t < K.hasta ? 0 : 1 - p(t, Q, 0.15) });
    // botones SÍ / NO
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const tin = K.te + 0.15 + i * 0.12; const press = t > t0 + 0.3 && t < t0 + 0.45; set(b, { s: pop(t, tin, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < tin ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.25 && t < K.si + 0.45 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   C · MARCA AL FINAL: EL VECINO EN SU BALCÓN (rápido)
   ====================================================================== */
{
  const T0 = S.C[0], T1 = S.C[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
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
  }, { clip: true });
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
  var sHL = sign.querySelector('.shl');
}

/* ======================================================================
   L · …EN EL LIBRO — el libro HISTORIA se cierra de golpe
   ====================================================================== */
headline(S.L2[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    brainFace(stand, t, { look: t > TC - 0.2 ? [6, -6] : [-3, 2], bL: 12, bR: 12, sweat: t > TC - 0.2, mouth: t > TC - 0.2 ? 'o' : 's', seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">EL CEREBRO</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">lo que te contaron</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkBrain(bookW, [650, 540, 250, 208]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 17 · No usas solo el 10 % de tu cerebro</span>`);
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
