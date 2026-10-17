/* Ep. 16 · escenas L4–L7 */

/* ======================================================================
   HIT 1 · GOLPE AMARILLO: LA BROMA GUSTÓ TANTO… QUE SE QUEDÓ (1 grupito → multitud)
   ====================================================================== */
colorHit(S.HIT1[0], S.HIT1[1], YEL, c => {
  const l1 = bigTxt(c, 0, 200, 1080, 'La broma <i>gustó</i>', { fontSize: '104px', zIndex: 8 });
  const big = bigTxt(c, 0, 330, 1080, 'TANTO…', { fontSize: '210px', lineHeight: '240px', color: '#fff', textShadow: OUTL(INK, 12), zIndex: 9 });
  const rows = [
    { y: 640, w: 150, xs: [-30, 90, 210, 330, 450, 570, 690, 810, 930], sym: ['wkA', 'wkC', 'wkB'] },
    { y: 730, w: 190, xs: [-60, 90, 240, 390, 540, 690, 840], sym: ['wkB', 'wkA', 'wkC'] },
    { y: 840, w: 240, xs: [-80, 100, 280, 460, 640, 820], sym: ['wkC', 'wkB', 'wkA'] },
    { y: 980, w: 300, xs: [-120, 160, 390, 620, 860], sym: ['wkA', 'wkC', 'wkB', 'wkA', 'wkC'] },
  ];
  const crowd = crowdLayer(c, rows, 4); crowd.d.style.filter = SIL;
  // orden de aparición: primero el grupito del centro (fila delantera), luego hacia fuera y hacia atrás
  const first = crowd.U.filter(q => q.row === rows[3] && q.x > 100 && q.x < 700);
  const rest = crowd.U.filter(q => !first.includes(q)).sort((a, b) => (Math.abs(a.x + a.w / 2 - 540) + (980 - a.y) * 1.2) - (Math.abs(b.x + b.w / 2 - 540) + (980 - b.y) * 1.2));
  first.forEach((q, i) => q.t0 = K.broma - 0.1 + i * 0.07);
  rest.forEach((q, i) => q.t0 = K.gusto + 0.15 + (i / rest.length) * (K.tantoE - K.gusto - 0.1));
  const UV = crowd.U.map(q => { const e = box(c, q.x + q.w * 0.5 - 18, q.y - 20, 36, 44, { zIndex: 5 }); e.innerHTML = `<svg viewBox="0 0 44 52" width="36" height="44" style="overflow:visible"><circle cx="22" cy="28" r="19" fill="${INK}"/><path d="M22,8 V0" stroke="${INK}" stroke-width="4"/></svg>`; return e; });
  const st = stamp(c, 90, 600, '¡SE QUEDÓ!', { size: 170, bw: 18, z: 20, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  return t => {
    popA(l1, t, S.HIT1[0] + 0.02, { rise: 30 });
    const kb = p(t, K.tanto - 0.02, 0.2, E.outBack); set(big, { s: t < K.tanto - 0.02 ? 0 : lerp(1.6, 1, kb) * (1 + 0.04 * Math.sin(t * 8)), r: -3, o: t < K.tanto - 0.02 ? 0 : 1 });
    crowd.U.forEach((q, i) => {
      const k = pop(t, q.t0, 0.35), jump = t > K.quedo ? -Math.abs(Math.sin(t * 12 + i)) * 18 : -Math.abs(Math.sin(t * 7 + i)) * 6;
      q.u.setAttribute('transform', `translate(${f1(q.x + q.w / 2)},${f1(q.y + q.w * 1.28 + jump)}) scale(${f1(Math.max(0.001, k) * 100) / 100}) translate(${f1(-q.x - q.w / 2)},${f1(-q.y - q.w * 1.28)})`);
      q.u.style.opacity = t < q.t0 ? 0 : 1;
      set(UV[i], { s: pop(t, q.t0 + 0.12, 0.3), y: jump + Math.sin(t * 6 + i) * 4, o: t < q.t0 + 0.12 ? 0 : 1 });
    });
    stampA(st, t, K.quedo, -8, 1);
  };
});

/* ======================================================================
   F1 · ¡OJO! LA HISTORIA QUE MÁS SE CUENTA ES OTRA
   ====================================================================== */
headline(K.historia - 0.25, K.es - 0.05, 'La historia que *más se cuenta*…', { size: 80, hlT: K.mas });
headline(K.es - 0.05, S.F1[1], '…es *otra*', { size: 130, hlT: K.otra });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const kt = p(t, K.ojo + 0.5, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.42, kt), x: kt * 330, y: kt * 470, r: -10, o: t < K.ojo ? 0 : 1 });
    set(pol.wrap, { s: pop(t, K.ojo + 0.6, 0.4), r: -5 + wobble(t, 0.5, 1), o: t < K.ojo + 0.6 ? 0 : (t > K.otra ? 0.75 : 1) });
    set(cd, { s: pop(t, K.historia - 0.1, 0.45), r: 5 + wobble(t, 0.5, 1.5) + (t > K.otra && t < K.otra + 0.35 ? Math.sin(t * 50) * 4 : 0), o: t < K.historia - 0.1 ? 0 : 1 });
    const kg = p(t, K.mas - 0.05, 0.6, E.outElastic); set(tag, { r: (1 - kg) * 50 + Math.sin(t * 3) * 3, s: t < K.mas - 0.05 ? 0 : 1, o: t < K.mas - 0.05 ? 0 : 1 });
    const kn = p(t, K.otra, 0.16, E.outCubic); set(neq, { s: t < K.otra ? 0 : lerp(2, 1, kn), r: -8, o: t < K.otra ? 0 : 1 });
    QM.forEach((q, i) => set(q, { y: Math.sin(t * 4 + i) * 10, r: [-10, 12][i], s: pop(t, K.historia + 0.2 + i * 0.15, 0.3), o: t < K.historia + 0.2 + i * 0.15 ? 0 : 1 }));
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const pol = polaroid(c, 70, 470, 420, 400, 'de cachondeo', { cs: 44 });
  { const tw = mkSolT(pol.inner, [-10, -30, 400, 444], '200 60 500 555'); void tw; const cr = crowdLayer(pol.inner, [{ y: 230, w: 130, xs: [-30, 70, 170, 270], sym: ['wkA', 'wkC', 'wkB'] }], 3); void cr; }
  const cd = box(c, 580, 440, 400, 520, { zIndex: 12, background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `10px 12px 0 ${SH}`, backgroundImage: `repeating-linear-gradient(45deg, rgba(201,162,74,.25) 0 6px, transparent 6px 20px)` });
  box(cd, 18, 18, 352, 472, { border: `4px solid ${BRASS}`, borderRadius: '14px' });
  el('div', cd, { left: '0', top: '90px', width: '388px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '300px', lineHeight: '320px', color: '#e9c75c', textShadow: `7px 7px 0 ${INK}` }, '?');
  const tag = box(c, 560, 950, 440, 130, { zIndex: 20, transformOrigin: '220px -30px' });
  tag.innerHTML = `<svg width="440" height="130" style="overflow:visible"><path d="M220,-40 L220,10" stroke="${INK}" stroke-width="4"/>${cut('<path d="M40,10 H420 Q430,10 430,20 V110 Q430,120 420,120 H40 L4,65 Z"/>', 5, 6)}<path d="M40,10 H420 Q430,10 430,20 V110 Q430,120 420,120 H40 L4,65 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><circle cx="44" cy="65" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
  el('div', tag, { left: '60px', top: '22px', width: '360px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', lineHeight: 1.05, color: '#fff', textShadow: `2px 2px 0 ${INK}` }, 'la versión<br>más contada');
  const neq = el('div', c, { left: '440px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: RED, textShadow: OUTL(INK, 6), zIndex: 30 }, '≠');
  const QM = [qMark(c, 880, 400, 110), qMark(c, 520, 900, 100)];
  const ojo = stamp(c, 170, 640, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · 1909: COSECHA ENORME EN ALICANTE
   ====================================================================== */
{
  const c = scene(S.F2[0], S.F2[1], t => {
    set(vy.wrap, { y: (1 - p(t, S.F2[0], 0.45, E.outBack)) * 1000, r: -1.5 + wobble(t, 0.4, 0.4) });
    { const k = p(t, K.mil, 0.18, E.outCubic); set(yr, { s: t < K.mil ? 0 : lerp(1.9, 1, k), r: -3, o: t < K.mil ? 0 : 1 }); }
    const kp = pop(t, K.cosecha, 0.45), kg = p(t, K.enorme - 0.05, 0.55, E.outBackBig);
    set(pile.d, { s: kp * (0.55 + 0.75 * kg), o: t < K.cosecha ? 0 : 1 });
    GR.forEach((g, i) => { const t0 = K.enorme + 0.1 + i * 0.12; set(g.d, { s: pop(t, t0, 0.35), y: -Math.abs(Math.sin(t * 9 + i)) * 20, r: [-10, 10][i], o: t < t0 ? 0 : 1 }); gFace(g, t, { laugh: true, jaw: 0.6, seed: i }); });
    popA(enm, t, K.enorme, { r: 4 });
    set(tagS, { r: -4 + Math.sin(t * 3) * 2, o: 1, s: pop(t, S.F2[0] + 0.3, 0.4) });
    popA(al, t, K.alicante, { r: -3 });
    set(pin, { s: pop(t, K.alicante - 0.05, 0.4), y: t > K.alicante ? -Math.abs(Math.sin((t - K.alicante) * 6)) * 14 * (1 - p(t, K.alicante, 1.5)) : 0, o: t < K.alicante - 0.05 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const yr = el('div', c, { left: 0, top: '170px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '220px', lineHeight: '240px', color: YEL, textShadow: OUTL(INK, 9), zIndex: 30 }, '1909');
  const vy = paperPiece(c, 60, 440, 960, 660, { seed: 19, bg: '#F3E6C8', plain: true });
  box(vy.inner, 0, 0, 942, 642).innerHTML = svgW(vineyardSvg(), '0 0 900 600');
  const pile = mk(c, [190, 760, 700, 350], pileInner(), '0 0 600 300', 'pile'); pile.d.style.zIndex = 8; pile.d.style.transformOrigin = '350px 340px';
  const GR = [mkGrape(c, [300, 640, 160, 200]), mkGrape(c, [610, 620, 170, 212])]; GR.forEach(g => g.d.style.zIndex = 9);
  const enm = chip(c, 600, 500, 'cosecha enorme', { size: 46, bg: PINK, z: 20 });
  const tagS = chip(c, 90, 470, 'la versión más contada', { size: 32, bg: INK, color: '#fff', z: 20 });
  const al = chip(c, 380, 1130, '1909 · Alicante', { size: 56, bg: INK, color: YEL, z: 22 });
  const pin = box(c, 300, 1100, 80, 110, { zIndex: 23 }); pin.innerHTML = `<svg viewBox="0 0 80 110" width="80" height="110" style="overflow:visible"><path d="M40,106 C20,70 6,56 6,38 A34,34 0 0,1 74,38 C74,56 60,70 40,106 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle cx="40" cy="38" r="13" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
}

/* ======================================================================
   F3 · LOS AGRICULTORES LA PROMOCIONARON PARA VENDER MÁS UVA
   ====================================================================== */
headline(S.F3[0], K.para - 0.05, 'Los agricultores la *promocionaron*', { size: 76, hlT: K.promo });
headline(K.para - 0.05, S.F3[1], 'para vender *más uva*', { size: 100, hlT: K.mas2 });
{
  const c = scene(S.F3[0], S.F3[1], t => {
    FA.forEach((f, i) => { const t0 = S.F3[0] + 0.05 + i * 0.1; set(f.d, { y: (1 - p(t, t0, 0.4, E.outBack)) * 700 + wobble(t, 0.6, 3, i), o: t < t0 ? 0 : 1 }); face(f, t, { look: [0, 0], jaw: t > PL[i].t0 ? Math.abs(Math.sin(t * 11 + i)) * 0.5 : 0, brow: t > PL[i].t0 ? -6 : 0, seed: i }); });
    PL.forEach((q, i) => { const k = p(t, q.t0, 0.45, E.outBack); set(q.e, { y: (1 - k) * 500, r: [-8, 4, 9][i] + (t > q.t0 ? Math.sin(t * 7 + i) * 6 : 0), o: t < q.t0 ? 0 : 1 }); });
    BU.forEach((b, i) => set(b.d, { s: pop(t, S.F3[0] + 0.3 + i * 0.1, 0.4), r: [-6, 3, 7][i] + wobble(t, 0.5, 2, i), o: t < S.F3[0] + 0.3 + i * 0.1 ? 0 : 1 }));
    set(aw, { y: (1 - p(t, S.F3[0], 0.35, E.outCubic)) * -300 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const aw = box(c, 0, 360, 1080, 140, { zIndex: 2 });
  let sc = ''; for (let x = 0; x < 1080; x += 90) sc += `<path d="M${x},80 q45,50 90,0" fill="${(x / 90) % 2 ? '#FBF6EA' : RED}" stroke="${INK}" stroke-width="4"/>`;
  aw.innerHTML = `<svg width="1080" height="140" style="overflow:visible"><rect x="0" y="0" width="1080" height="80" fill="${RED}"/>${[...Array(12)].map((_, k) => `<rect x="${k * 90 + 45}" y="0" width="45" height="80" fill="#FBF6EA"/>`).join('')}<rect x="0" y="0" width="1080" height="80" fill="none" stroke="${INK}" stroke-width="5"/>${sc}</svg>`;
  const FA = [mk(c, [250, 700, 290, 371], farmerInner(91, 1), '0 0 360 460', 'bust'), mk(c, [490, 660, 310, 396], farmerInner(92, 2), '0 0 360 460', 'bust'), mk(c, [730, 710, 280, 358], farmerInner(93, 0), '0 0 360 460', 'bust')];
  FA.forEach((f, i) => f.d.style.zIndex = 6 + i);
  const PL = [[280, '¡UVA!', K.promo], [530, '¡UVA!', K.vender], [760, '¡MÁS!', K.uva - 0.05]].map(([x, s, t0], i) => ({ e: placard(c, x, 430, 230, s, { size: 66, z: 4 + i }), t0 }));
  const BU = [[300, 1000], [540, 990], [770, 1010]].map(([x, y]) => { const b = mk(c, [x, y, 190, 242], bunchInner(x), '0 0 220 280', 'bunch'); b.d.style.zIndex = 12; return b; });
  box(c, 260, 1150, 760, 60, { background: WOOD, border: `5px solid ${INK}`, zIndex: 11, boxShadow: `6px 6px 0 ${SH}` });
}

/* ======================================================================
   F4 · ESO AYUDÓ A QUE SE EXTENDIERA… PERO LA COSTUMBRE YA EXISTÍA
   ====================================================================== */
headline(S.F4[0], K.pero - 0.05, 'Eso ayudó a que se *extendiera*', { size: 80, hlT: K.extendiera });
headline(K.pero - 0.05, S.F4[1], '…pero la costumbre *ya existía*', { size: 80, hlT: K.ya });
{
  const c = scene(S.F4[0], S.F4[1], t => {
    const kp = p(t, K.pero - 0.1, 0.45, E.inOutCubic);
    set(pA.wrap, { x: lerp(-40, 250, kp), y: lerp(0, 40, kp), s: lerp(1.08, 0.82, kp) * pop(t, S.F4[0] + 0.02, 0.4), r: lerp(-2, 5, kp) + wobble(t, 0.5, 1), o: 1 });
    set(pB.wrap, { x: lerp(-700, 0, kp), y: 40, s: 0.82, r: -5 + wobble(t, 0.5, 1, 0.3), o: t < K.pero - 0.1 ? 0 : 1 });
    SPR.forEach((q, i) => { const k = p(t, K.extendiera - 0.1 + i * 0.04, 0.7, E.outCubic); set(q.e, { x: Math.cos(q.a) * 420 * k, y: Math.sin(q.a) * 330 * k, s: 0.5 + 0.6 * k, r: q.a * 30, o: t < K.extendiera - 0.1 ? 0 : 1 - p(t, K.pero - 0.15, 0.2) }); });
    set(tl, { o: t > K.pero ? 1 : 0, sx: p(t, K.pero, 0.4, E.outCubic) });
    popA(lb1, t, K.pero + 0.15, { r: -3 }); popA(lb2, t, K.pero + 0.3, { r: 3 });
    arr.style.strokeDashoffset = f1(1000 * (1 - p(t, K.costumbre - 0.1, 0.45, E.inOutCubic)));
    arrH.style.opacity = t > K.costumbre + 0.3 ? 1 : 0;
    stampA(ye, t, K.existia, -9, 1);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const pA = polaroid(c, 320, 430, 460, 430, '1909', { cs: 50, z: 12 });
  { const v = box(pA.inner, 0, 0, 430, 420); v.innerHTML = svgW(vineyardSvg(), '200 120 500 480'); const cr = crowdLayer(pA.inner, [{ y: 190, w: 170, xs: [10, 130, 250], sym: ['fmA'] }], 3); void cr; }
  const pB = polaroid(c, 80, 430, 460, 430, 'años 80 · siglo XIX', { cs: 36, z: 11 });
  { const tw = mkSolT(pB.inner, [-20, -40, 460, 511], '200 60 500 555'); void tw; const cr = crowdLayer(pB.inner, [{ y: 250, w: 150, xs: [-40, 80, 200, 320], sym: ['wkA', 'wkC', 'wkB'] }], 3); void cr; }
  const SPR = [...Array(10)].map((_, i) => { const a = -Math.PI / 2 + (i - 4.5) * 0.62; const e = box(c, 515, 640, 60, 76, { zIndex: 14 }); e.innerHTML = svgW(bunchInner(40 + i), '0 0 220 280'); return { e, a }; });
  const tl = box(c, 110, 1060, 860, 12, { background: INK, borderRadius: '6px', zIndex: 5, transformOrigin: '0 50%' });
  const lb1 = chip(c, 200, 1000, 'antes', { size: 40, bg: '#fff', color: INK, z: 15 });
  const lb2 = chip(c, 690, 1010, '1909', { size: 40, bg: '#fff', color: INK, z: 15 });
  const arw = box(c, 0, 0, 1080, 1920, { zIndex: 20 });
  arw.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="ar0" d="M760,470 C700,330 450,330 370,450" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000"/><path class="ar1" d="M760,470 C700,330 450,330 370,450" stroke="${PINK}" stroke-width="12" fill="none" stroke-linecap="round" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000"/><g class="arH" style="opacity:0"><path d="M340,420 L366,474 L410,436" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M340,420 L366,474 L410,436" stroke="${PINK}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
  const a0 = arw.querySelector('.ar0'), a1 = arw.querySelector('.ar1'), arrH = arw.querySelector('.arH');
  const arr = { style: { set strokeDashoffset(v) { a0.style.strokeDashoffset = v; a1.style.strokeDashoffset = v; } } };
  const ye = stamp(c, 110, 640, 'YA EXISTÍA', { size: 96, bw: 14, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   HIT 2 · GOLPE ROSA: REPITES UNA BROMA DE HACE CASI 150 AÑOS → ¿SÍ o NO?
   ====================================================================== */
{
  const CM = [];
  colorHit(S.HIT2[0], S.HIT2[1], PINK, c => {
    const blk = box(c, 0, 0, 1080, 1200, { zIndex: 10, transformOrigin: '540px 170px' });
    const os = bigTxt(blk, 0, 170, 1080, 'O sea:', { fontSize: '90px', fontStyle: 'italic', color: '#fff', textShadow: OUTL(INK, 5) });
    const l1 = bigTxt(blk, 0, 290, 1080, 'Cada Nochevieja', { fontSize: '96px' });
    const l2 = bigTxt(blk, 0, 400, 1080, 'repites una', { fontSize: '96px' });
    const br = bigTxt(blk, 0, 500, 1080, 'BROMA', { fontSize: '230px', lineHeight: '250px', color: '#fff', textShadow: OUTL(INK, 12) });
    const l3 = bigTxt(blk, 0, 770, 1080, 'de hace casi', { fontSize: '88px', fontStyle: 'italic' });
    const n150 = bigTxt(blk, 0, 870, 1080, '150 años', { fontFamily: 'Rye', fontWeight: 400, fontSize: '190px', lineHeight: '210px', color: YEL, textShadow: OUTL(INK, 9) });
    const sil = box(c, 0, 0, 1080, 1920, { zIndex: 5 });
    const GS = [...Array(12)].map((_, k) => { const a = (k - 5.5) / 5.5; const g = mkGrape(sil, [52 + k * 82, 1110 + a * a * 40, 96, 120]); return g; });
    const qq = bigTxt(c, 0, 640, 1080, '¿Lo sabías?', { fontSize: '120px', fontStyle: 'italic', zIndex: 12 });
    const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '960px', width: '400px', height: '220px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '160px', lineHeight: '206px', color: col, background: bg, border: `9px solid ${INK}`, borderRadius: '44px', boxShadow: `12px 14px 0 ${INK}`, zIndex: 30 }, txt);
    const bS = btn(90, 'SÍ', YEL, INK), bN = btn(590, 'NO', '#fff', RED);
    const hand = box(c, 300, 1110, 170, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="170" height="170" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
    const cms = [['FAR', '@marta_uvas', 'SÍ 😳', K.sabias + 0.1], ['SOL', '@javi.madrid', 'No, ya lo sabía', K.sabias + 0.45], ['MEREDITH', '@lucia_bcn', 'Sí, y las sigo comiendo', K.si + 0.1]];
    cms.forEach((m, i) => {
      const e = box(c, [60, 480, 220][i], [790, 790, 1240][i], [400, 470, 560][i], 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 41 });
      avatar(e, 10, 10, 84, m[0], { bw: 3 });
      el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
      el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
      CM.push({ e, t: m[3] });
    });
    return t => {
      const ks = p(t, K.lo - 0.15, 0.35, E.inOutCubic);
      set(blk, { s: lerp(1, 0.52, ks), y: lerp(0, 10, ks), o: 1 });
      popA(os, t, S.HIT2[0] + 0.05, { rise: 30 });
      popA(l1, t, K.cada - 0.05, { rise: 30 }); popA(l2, t, K.repites - 0.05, { rise: 30 });
      { const kb = p(t, K.broma2 - 0.02, 0.2, E.outBack); set(br, { s: t < K.broma2 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.broma2 - 0.02 ? 0 : 1 }); br.style.textShadow = (glitch(t, K.broma2, 0.3) ? glitch(t, K.broma2, 0.3) + ', ' : '') + OUTL(INK, 12); }
      popA(l3, t, K.hace - 0.05, { rise: 30 });
      { const kn = p(t, K.ciento, 0.18, E.outCubic); set(n150, { s: t < K.ciento ? 0 : lerp(2, 1, kn), r: -4, o: t < K.ciento ? 0 : 1 }); }
      GS.forEach((g, k) => { set(g.d, { y: hop(t, k, 12, 1.4, 30) + (1 - p(t, S.HIT2[0] + 0.1 + k * 0.03, 0.4, E.outBack)) * 400, o: 1 - p(t, K.lo - 0.2, 0.2) }); gFace(g, t, { laugh: true }); });
      set(qq, { s: pop(t, K.lo, 0.35), r: -2, o: t < K.lo ? 0 : 1 });
      [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const tA = K.lo + 0.1 + i * 0.12, press = t > t0 + 0.12 && t < t0 + 0.3; set(b, { s: pop(t, tA, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < tA ? 0 : 1 }); });
      set(hand, { o: t > K.si - 0.15 ? 1 : 0, y: (t > K.si + 0.1 && t < K.si + 0.3 ? 16 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si - 0.15, 0.3) });
      CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    };
  });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN  (L7, rápido)
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
    set(gp.d, { y: -Math.abs(Math.sin(t * 6)) * 10, r: Math.sin(t * 3) * 6 }); gFace(gp, t, { look: [-6, -4], seed: 2 });
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
  const gp = mkGrape(cam, [790, 930, 110, 138]); gp.d.style.zIndex = 3;
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
    gFace(stand, t, { look: t > TC - 0.2 ? [6, -6] : [-3, 2], bL: 12, bR: 12, jaw: t > TC - 0.2 ? 0.5 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { x: 262 * p(t, TC + 0.05, 0.3, E.inOutCubic), s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">COSTUMBRES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de siempre</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkGrape(bookW, [630, 460, 220, 275]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:36px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 16 · Las uvas empezaron como una burla</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDA', border: `4px solid ${INK}`, zIndex: 3 }));
}
