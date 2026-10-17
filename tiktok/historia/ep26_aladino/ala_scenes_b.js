/* Ep. 26 · escenas L5–L10 (Hanna, el parche, China, lo más bestia, Alí Babá, el libro que no lo nombra) */

/* ======================================================================
   I1 · «EN 1709…» — mapa: línea de puntos de Alepo a París; sello 1709
   ====================================================================== */
headline(S.I1[0], S.I1[1], 'De *Alepo* a París', { size: 108, y: 262 });
{
  const MX = 99, MY = 429; // origen del interior del mapa
  const c = scene(S.I1[0], S.I1[1], t => {
    set(cam, { s: lerp(1.0, 1.06, p(t, S.I1[0], 1.6, E.linear)) });
    const k = p(t, S.I1[0] + 0.08, K.chaval - 0.2 - S.I1[0], E.inOutCubic);
    mkp.setAttribute('stroke-dashoffset', f1((1 - k) * 1000) / 1000);
    const q = pth.getPointAtLength(L * k); set(mrk, { x: q.x - 36, y: q.y - 36 - Math.abs(Math.sin(t * 12)) * 10, o: t > S.I1[0] + 0.05 ? 1 : 0 });
    stampA(yr, t, K.nueve, -6, 1);
    set(pa, { s: pop(t, S.I1[0] + 0.1, 0.4) }); set(pb, { s: pop(t, S.I1[0] + 0.25, 0.4) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#CDB48A', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 50px)' });
  const mp = paperPiece(cam, 90, 420, 840, 620, { seed: 52, bg: '#F1E4C2' }); mp.wrap.style.zIndex = 4;
  const sv = box(mp.inner, 0, 0, 822, 602, { zIndex: 2 });
  const path = 'M720,430 C640,330 470,350 340,270 C270,228 240,180 220,140';
  sv.innerHTML = `<svg width="822" height="602" style="overflow:visible">
    <path d="M0,330 C80,300 150,320 210,360 C250,330 300,300 350,330 C380,360 360,420 420,440 C470,420 520,400 580,410 C640,420 700,410 780,430 L822,440 L822,602 L0,602 Z" fill="#9FC1C6" stroke="${INK}" stroke-width="5"/>
    <path d="M0,330 C80,300 150,320 210,360 C250,330 300,300 350,330 C380,360 360,420 420,440 C470,420 520,400 580,410 C640,420 700,410 780,430 L822,440 L822,602 L0,602 Z" fill="url(#hW)" opacity=".25"/>
    <path d="M300,380 q-20,60 10,110" stroke="${INK}" stroke-width="4" fill="none" opacity=".5"/>
    <path d="M40,80 q120,-30 240,10 t260,-20 t240,30" stroke="${INK}" stroke-width="3" fill="none" opacity=".25"/>
    <defs><mask id="mapM" maskUnits="userSpaceOnUse" x="0" y="0" width="822" height="602"><path class="mk" d="${path}" pathLength="1" stroke="#fff" stroke-width="40" fill="none" stroke-dasharray="1 1" stroke-dashoffset="1"/></mask></defs>
    <g mask="url(#mapM)"><path d="${path}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/><path d="${path}" stroke="${RED}" stroke-width="9" fill="none" stroke-dasharray="4 18" stroke-linecap="round"/></g>
    <path class="pth" d="${path}" fill="none" stroke="none"/></svg>`;
  const mkp = sv.querySelector('.mk'), pth = sv.querySelector('.pth'), L = pth.getTotalLength();
  const pin = (x, y, lab, sub, dx) => { const d = box(mp.inner, x - 26, y - 64, 52, 66, { zIndex: 4, transformOrigin: '50% 100%' }); d.innerHTML = `<svg width="52" height="66" style="overflow:visible"><path d="M26,66 L2,24 A26,26 0 1,1 50,24 Z" fill="${PINK}" stroke="${INK}" stroke-width="4"/><circle cx="26" cy="24" r="9" fill="#fff"/></svg>`; el('div', d, { left: px(dx), top: '70px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', color: INK, whiteSpace: 'nowrap', textShadow: '3px 3px 0 #fff' }, lab + (sub ? `<div style="font-family:SpecialElite;font-size:30px;font-weight:400">${sub}</div>` : '')); return d; };
  const pa = pin(220, 140, 'PARÍS', '', 50), pb = pin(720, 430, 'ALEPO', '(Siria)', -150);
  const mrk = box(mp.inner, 0, 0, 72, 72, { zIndex: 5, borderRadius: '50%', background: '#FBF6EA', border: `5px solid ${INK}`, overflow: 'hidden' });
  mrk.innerHTML = `<svg viewBox="100 60 160 160" width="62" height="62">${hannaInner()}</svg>`;
  const yr = stamp(cam, 380, 1068, '1709', { size: 150, bw: 16, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   I2 · «UN CHAVAL SIRIO, HANNA DIYAB, LE CUENTA UNO:» — ficha de Hanna
   ====================================================================== */
headline(S.I2[0], K.cuenta - 0.06, 'Un *chaval* sirio', { size: 112, hlT: K.chaval, y: 262 });
headline(K.cuenta - 0.06, S.I2[1], 'le cuenta *uno…*', { size: 112, hlT: K.uno5, y: 262 });
{
  const c = scene(S.I2[0], S.I2[1], t => {
    set(cam, { s: lerp(1.0, 1.05, p(t, S.I2[0], 2.7, E.linear)) });
    set(hn.d, { y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1.2) });
    face(hn, t, { jaw: t > K.cuenta - 0.05 ? talkW(t, 'VECINO', 0.5) : 0, look: t > K.cuenta ? [6, -3] : [0, 0], seed: 0.2 });
    set(fc.wrap, { s: pop(t, K.hanna5 - 0.05, 0.4), r: -2, o: t > K.hanna5 - 0.05 ? 1 : 0 });
    set(bb, { s: pop(t, K.cuenta, 0.4), r: 3 + wobble(t, 0.6, 2), o: t > K.cuenta ? 1 : 0 });
    set(bl, { y: Math.sin(t * 5) * 5, r: -8 + Math.sin(t * 4) * 4 });
    popA(sy, t, K.sirio, { r: 4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#E7D9BC' });
  rays(cam, -160, 220, 1400, 24, 'rgba(255,230,0,.12)', 'rgba(0,0,0,0)', 1);
  const hn = mk(cam, [300, 430, 480, 613], hannaInner(), '0 0 360 460', 'bust'); hn.d.style.zIndex = 5;
  const sy = chip(cam, 300, 470, 'sirio', { size: 44, bg: PINK, z: 20 });
  const fc = paperPiece(cam, 310, 1060, 620, 240, { seed: 77, bg: '#FFFDF6' }); fc.wrap.style.zIndex = 20;
  el('div', fc.inner, { left: '30px', top: '22px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '74px', color: INK, whiteSpace: 'nowrap' }, 'Hanna Diyab');
  el('div', fc.inner, { left: '32px', top: '124px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: '#6a5a48', whiteSpace: 'nowrap' }, 'Alepo (Siria) · unos 20 años');
  const bb = box(cam, 690, 440, 240, 200, { zIndex: 21 });
  bb.innerHTML = `<svg width="240" height="200" style="overflow:visible"><path d="M40,150 L0,200 L90,166 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="125" cy="95" rx="115" ry="90" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M40,150 L0,200 L90,166" fill="#fff"/></svg>`;
  const bl = box(bb, 40, 40, 170, 96, { zIndex: 2 }); bl.innerHTML = svgW(lampInner(), '0 0 300 170');
}

/* ======================================================================
   I3 · «…ALADINO» — página del diario de Galland (recreación): «5 mai 1709 — Aladin»
   ====================================================================== */
headline(S.I3[0], S.I3[1], '*Aladino*', { size: 140, hlT: K.aladino5, y: 262 });
{
  const c = scene(S.I3[0], S.I3[1], t => {
    set(dp.wrap, { r: -3 + wobble(t, 0.5, 0.8), s: lerp(1.04, 1.0, p(t, S.I3[0], 0.5, E.outCubic)) });
    paint(hl, t, K.aladino5 + 0.05, 0.35);
    popA(lab, t, S.I3[0] + 0.25, { r: -2 });
  }, { clip: true });
  sceneBg(c, { background: '#5b4532', backgroundImage: 'radial-gradient(circle at 50% 46%, #8a6a4a 0%, #5b4532 60%, #3a2a1e 100%)' });
  const dp = paperPiece(c, 140, 470, 800, 600, { seed: 19, bg: '#F7EED8' }); dp.wrap.style.zIndex = 4; dp.wrap.style.transformOrigin = '50% 50%';
  el('div', dp.inner, { left: '50px', top: '40px', fontFamily: 'SpecialElite', fontSize: '66px', color: INK }, '5 mai 1709');
  { const d = box(dp.inner, 0, 0, 782, 582); let s = ''; const r = rng(5); for (let i = 0; i < 7; i++) { if (i === 2) continue; let dd = `M50,${170 + i * 56}`; for (let x = 50; x < 720; x += 24) dd += ` q6,${f1(-8 - r() * 8)} 12,0 q6,${f1(6 + r() * 6)} 12,0`; s += `<path d="${dd}" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>`; } d.innerHTML = `<svg width="782" height="582">${s}</svg>`; }
  const line = el('div', dp.inner, { left: '50px', top: '258px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, whiteSpace: 'nowrap' }, `… ${hlSpan('Aladin', 'dhl')}`);
  const hl = line.querySelector('.dhl');
  const lab = chip(c, 300, 1110, 'diario de Galland (recreación)', { size: 32, bg: INK, color: '#fff', z: 20 });
}

/* ======================================================================
   J · «GALLAND LO METE EN EL LIBRO. TAL CUAL.» — el cuento entra como PARCHE cosido en el hueco
   ====================================================================== */
headline(S.J[0], K.tal - 0.06, 'Lo mete *en el libro*', { size: 100, hlT: K.libro6, y: 262 });
headline(K.tal - 0.06, S.J[1], '*Tal cual.*', { size: 140, hlT: K.tal, y: 262 });
function patchAlad(pa, x, y, z) {
  const pt = mkPatch(pa, x, y, 320, 450, { seed: 61, z });
  const f = mk(pt.inner, [50, 20, 200, 354], aladInner(), '0 0 260 460', 'bust');
  const lp = box(pt.inner, 10, 230, 120, 68); lp.innerHTML = svgW(lampInner(), '0 0 300 170');
  el('div', pt.inner, { left: '0', top: '370px', width: '302px', textAlign: 'center', fontFamily: 'Rye', fontSize: '42px', color: RED }, 'ALADINO');
  pt.fig = f; return pt;
}
function patchAli(pa, x, y, z) {
  const pt = mkPatch(pa, x, y, 320, 450, { seed: 64, z, bg: '#E9D3B0', thread: '#3f7a8a' });
  const cv = box(pt.inner, 20, 30, 262, 300); let th = '';
  for (let r = 0; r < 3; r++) for (let q = 0; q < 5; q++) th += `<g transform="translate(${36 + q * 40},${110 + r * 60}) scale(0.42)">${thiefSil(q + r).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`;
  cv.innerHTML = `<svg width="262" height="300" style="overflow:visible"><path d="M10,290 C10,120 70,30 131,30 C192,30 252,120 252,290 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="6"/><path d="M40,290 C40,150 90,70 131,70 C172,70 222,150 222,290 Z" fill="#E9C75C" opacity=".55"/>${th}</svg>`;
  el('div', pt.inner, { left: '0', top: '350px', width: '302px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', lineHeight: 1, color: '#3f2a5a' }, 'ALÍ BABÁ');
  return pt;
}
{
  const TL = K.L6 + 0.55, TS0 = TL + 0.12, TS1 = K.tal - 0.08;
  const c = scene(S.J[0], S.J[1], t => {
    set(cam, { s: lerp(1.0, 1.05, p(t, S.J[0], 3, E.linear)) });
    const k = p(t, S.J[0] + 0.15, TL - S.J[0] - 0.15, E.outBack);
    set(pt.wrap, { x: (1 - k) * 420, y: (1 - k) * -700, r: (1 - k) * 30 - 2, s: lerp(1.3, 1, k) });
    pt.stitch(t, TS0, TS1);
    face(pt.fig, t, { look: [-3, 0], seed: 0.9 });
    stampA(st, t, K.tal, -8, 1);
    set(glow, { o: t > TS1 ? 0.6 + 0.3 * Math.sin(t * 8) : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  nightBg(cam); nightSky(cam, 31, false); strip(c);
  openBook(cam, { y: 600, h: 600, z: 4, holeR: true });
  el('div', cam, { left: '210px', top: '548px', width: '660px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: '#e9c75c', background: '#3f2a5a', border: `5px solid ${INK}`, borderRadius: '12px', padding: '4px 0 8px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 9, whiteSpace: 'nowrap' }, 'LES MILLE ET UNE NUITS');
  aladHole(cam, 650, 660, 230, 6);
  const glow = box(cam, 590, 640, 350, 480, { zIndex: 7, borderRadius: '30px', boxShadow: `0 0 60px 20px ${YEL}`, opacity: 0 });
  const pt = patchAlad(cam, 605, 655, 20);
  const st = stamp(cam, 120, 830, 'AÑADIDO', { size: 92, bw: 15, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   L · «Y MIRA DÓNDE PASA: EN UNA CIUDAD… DE CHINA. SÍ: ALADINO ERA CHINO.» — el decorado gira como una página
   ====================================================================== */
headline(S.L[0], K.en7 - 0.06, 'Y mira *dónde* pasa:', { size: 100, hlT: K.donde, y: 262 });
headline(K.en7 - 0.06, K.si7 - 0.06, 'en una ciudad… *de China*', { size: 76, hlT: K.china, y: 262 });
headline(K.si7 - 0.06, S.L[1], 'Aladino *era chino*', { size: 108, hlT: K.chino, y: 262 });
{
  const TF = K.china - 0.14;
  const c = scene(S.L[0], S.L[1], t => {
    const kz = p(t, K.ciudad, TF - K.ciudad, E.inOutCubic) * (1 - p(t, TF, 0.3, E.outCubic));
    set(cam, { s: 1 + 0.12 * kz, y: kz * 40 });
    const kf = p(t, TF, 0.36, E.inOutCubic), sx = Math.cos(kf * Math.PI);
    dec.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
    pal.style.display = kf < 0.5 ? '' : 'none'; chn.style.display = kf < 0.5 ? 'none' : '';
    const turn = t > K.si7 - 0.05;
    set(al.d, { y: wobble(t, 0.6, 4) - (turn ? Math.abs(Math.sin((t - K.si7) * 8)) * 18 * (1 - p(t, K.si7 + 0.6, 0.3)) : 0), r: t < TF ? Math.sin(t * 3) * 4 : 0 });
    face(al, t, { look: t < TF ? [Math.sin(t * 2.2) * 6, 0] : turn ? [0, 0] : [4, -2], seed: 0.4, brow: t < TF ? -5 : 0 });
    set(lmp, { y: turn ? -lerp(0, 120, p(t, K.si7, 0.35, E.outBack)) : 0, r: -10 + Math.sin(t * 4) * 5 });
    set(qm, { o: t > S.L[0] + 0.3 && t < TF ? 1 : 0, r: Math.sin(t * 6) * 10, s: 1 + 0.08 * Math.sin(t * 7) });
    LT.forEach((l, i) => set(l, { r: Math.sin(t * 2.5 + i) * 10 }));
    popA(ch, t, K.china + 0.22, { r: -2 });
    stampA(st, t, K.chino, -6, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const dec = box(cam, 0, 0, 1080, 1920, { zIndex: 1, transformOrigin: '540px 900px' });
  const pal = box(dec, 0, 0, 1080, 1920); pal.innerHTML = palaceSvg();
  const chn = box(dec, 0, 0, 1080, 1920); chn.innerHTML = chinaSvg();
  const LT = [[300, 650], [720, 650], [120, 700], [900, 700]].map(([x, y]) => { const l = box(chn, x, y, 70, 110, { transformOrigin: '50% 0' }); l.innerHTML = lanternSvg(); return l; });
  strip(c);
  const al = mk(cam, [410, 780, 260, 460], aladInner(), '0 0 260 460', 'bust'); al.d.style.zIndex = 8; al.d.style.transformOrigin = '50% 95%';
  const lmp = box(al.d, 170, 150, 150, 85, { zIndex: 2 }); lmp.innerHTML = svgW(lampInner(), '0 0 300 170');
  const qm = el('div', cam, { left: '650px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', color: PINK, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 9 }, '?');
  const ch = el('div', cam, { left: '320px', top: '1150px', fontFamily: 'SpecialElite', fontSize: '50px', color: INK, background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '12px', padding: '6px 22px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 20, whiteSpace: 'nowrap' }, '«…de la Chine»');
  const st = stamp(cam, 190, 600, 'ERA CHINO', { size: 112, bw: 16, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   M · «PERO LO MÁS BESTIA…» — una carta boca abajo que tiembla
   ====================================================================== */
headline(S.M[0], S.M[1], 'Pero lo más *bestia…*', { size: 100, hlT: K.bestia, y: 262 });
{
  const c = scene(S.M[0], S.M[1], t => {
    const k = pop(t, S.M[0] + 0.05, 0.4);
    set(cb.e, { s: k * (1 + 0.03 * Math.sin(t * 30)), r: Math.sin(t * 40) * 2.5, x: Math.sin(t * 52) * 5 });
    set(cb.qm, { s: 1 + 0.1 * Math.sin(t * 9), r: Math.sin(t * 6) * 8 });
    stampA(st, t, K.bestia, -6, 1);
  }, { clip: true });
  nightBg(c); rays(c, -160, 300, 1400, 26, 'rgba(255,230,0,.10)', 'rgba(0,0,0,0)', 1); strip(c);
  const cb = cardBack(c, 290, 460, 500, 640, { z: 10 });
  const st = stamp(c, 202, 1130, 'LO MÁS BESTIA', { size: 70, bw: 12, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}
/* N · GOLPE AMARILLO «ESPECIAL 1.000» — el Vecino con su banda */
colorHit(S.N[0], S.N[1], YEL, c => {
  const l1 = bigTxt(c, 0, 330, 1080, 'ESPECIAL', { size: 160 });
  const l2 = bigTxt(c, 0, 500, 1080, 'DE LOS 1.000', { size: 104, color: PINK });
  const v = mkVec(c, [200, 600, 680, 842]); v.d.style.zIndex = 8;
  const sash = el('div', c, { left: '260px', top: '1236px', width: '560px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', color: '#fff', background: RED, border: `5px solid ${INK}`, padding: '6px 0 10px', zIndex: 9, whiteSpace: 'nowrap', transform: 'rotate(-18deg)' }, 'ESPECIAL 1.000');
  const CF = paperConfetti(c, 40, 17, [PINK, '#fff', RED, '#8a6a4a', '#F4ECDB'], { z: 30, vy: 1000, spread: 300 });
  return t => {
    const k = p(t, K.especial - 0.04, 0.2, E.outBack);
    set(l1, { s: t < K.especial - 0.04 ? 0 : lerp(1.7, 1, k), r: -3, o: t < K.especial - 0.04 ? 0 : 1 });
    l1.style.textShadow = (glitch(t, K.especial, 0.22) ? glitch(t, K.especial, 0.22) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    popA(l2, t, K.mil8, { rise: 30, r: 2 });
    set(v.d, { y: wobble(t, 0.5, 4) + (1 - p(t, S.N[0], 0.3, E.outBack)) * 400 });
    set(sash, { y: wobble(t, 0.5, 4) + (1 - p(t, S.N[0], 0.3, E.outBack)) * 400, r: -18 });
    vecFace(v, t, { jaw: talkW(t, 'VECINO'), look: [0, -3], bL: 12, bR: 14, fan: Math.sin(t * 20) * 16, seed: 0.5 });
    updConf(CF, t, K.mil8);
  };
});

/* ======================================================================
   O · «ESE MISMO MES, HANNA LE CONTÓ OTRO» — la carta se da la vuelta: calendario de mayo de 1709
   ====================================================================== */
headline(S.O[0], K.hanna9 - 0.06, 'Ese *mismo mes…*', { size: 108, hlT: K.mismo, y: 262 });
headline(K.hanna9 - 0.06, S.O[1], 'Hanna le *contó otro*', { size: 100, hlT: K.otro, y: 262 });
{
  const CX0 = 140, CY0 = 400, CW = 106, CH = 110, GX = 28, GY = 196, OFF = 2; // 1 de mayo de 1709 = miércoles
  const cell = d => { const i = d - 1 + OFF; return [CX0 + GX + (i % 7) * CW, CY0 + GY + Math.floor(i / 7) * CH]; };
  const T5 = S.O[0] + 0.5, T27 = K.otro;
  const c = scene(S.O[0], S.O[1], t => {
    const kf = p(t, S.O[0], 0.4, E.inOutCubic), sx = Math.cos(kf * Math.PI);
    fl.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
    back.e.style.display = kf < 0.5 ? '' : 'none'; front.style.display = kf < 0.5 ? 'none' : '';
    set(cam, { s: lerp(1.0, 1.05, p(t, S.O[0], 2.6, E.linear)) });
    r5.setAttribute('stroke-dashoffset', f1((1 - p(t, T5, 0.35, E.outCubic)) * 1000) / 1000);
    r27.setAttribute('stroke-dashoffset', f1((1 - p(t, T27, 0.35, E.outCubic)) * 1000) / 1000);
    popA(c5, t, T5 + 0.25, { r: -4 }); popA(c27, t, T27 + 0.25, { r: 3 });
    set(hn.d, { y: wobble(t, 0.5, 3) }); face(hn, t, { jaw: t > K.hanna9 ? talkW(t, 'VECINO', 0.5) : 0, look: [4, -4], seed: 0.4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#2f2a4a', backgroundImage: 'radial-gradient(circle at 50% 50%, #4a3f6a 0%, #2f2a4a 70%)' }); strip(c);
  const fl = box(cam, 0, 0, 1080, 1920, { zIndex: 5, transformOrigin: '540px 800px' });
  const back = cardBack(fl, CX0, CY0, 800, 820, { z: 2, q: 320 });
  const front = box(fl, CX0, CY0, 800, 820, { zIndex: 3, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '34px', boxShadow: `12px 14px 0 ${SH}`, overflow: 'hidden' });
  box(front, 0, 0, 786, 116, { background: RED, borderBottom: `6px solid ${INK}` });
  el('div', front, { left: '0', top: '14px', width: '786px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', color: '#fff', textShadow: `4px 4px 0 ${INK}` }, 'MAYO 1709');
  'LMXJVSD'.split('').forEach((d, i) => el('div', front, { left: px(GX + i * CW), top: '128px', width: px(CW), textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: '#7a6a58' }, d));
  for (let d = 1; d <= 31; d++) { const [x, y] = cell(d); el('div', front, { left: px(x - CX0), top: px(y - CY0), width: px(CW - 8), height: px(CH - 10), lineHeight: px(CH - 10), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '50px', color: INK, background: d % 7 === 5 ? 'rgba(200,16,46,.06)' : 'rgba(43,33,24,.04)', borderRadius: '10px' }, String(d)); }
  const ring = (d, col) => { const [x, y] = cell(d); const b = box(fl, x - 14, y - 12, CW + 20, CH + 16, { zIndex: 6 }); b.innerHTML = `<svg width="${CW + 20}" height="${CH + 16}" style="overflow:visible"><ellipse cx="${(CW + 20) / 2 - 4}" cy="${(CH + 16) / 2 - 4}" rx="${CW / 2 + 2}" ry="${CH / 2 - 2}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" transform="rotate(-8 ${(CW + 20) / 2} ${(CH + 16) / 2})"/></svg>`; return b.querySelector('ellipse'); };
  const r5 = ring(5, RED), r27 = ring(27, '#3f7a8a');
  const [x5, y5] = cell(5), [x27, y27] = cell(27);
  const c5 = chip(fl, x5 - 160, y5 + 116, 'Aladino', { size: 40, bg: PINK, z: 8 });
  const c27 = chip(fl, x27 + 2, y27 + 118, '¿otro?', { size: 46, bg: YEL, color: INK, z: 8 });
  const hn = mk(cam, [640, 1110, 230, 294], hannaInner(), '0 0 360 460', 'bust'); hn.d.style.zIndex = 9;
}

/* ======================================================================
   P · «ALÍ BABÁ Y LOS CUARENTA LADRONES» — la cueva se abre; 40 siluetas DE GOLPE (sin contador)
   ====================================================================== */
headline(S.P[0], K.cuarenta - 0.06, '*Alí Babá…*', { size: 124, hlT: K.ali, y: 262 });
headline(K.cuarenta - 0.06, S.P[1], 'y los *cuarenta ladrones*', { size: 88, hlT: K.cuarenta, y: 262 });
{
  const TO = K.ali + 0.02;
  const c = scene(S.P[0], S.P[1], t => {
    const ko = p(t, TO, 0.55, E.inOutCubic);
    set(dL, { x: -ko * 430 + (t < TO ? Math.sin(t * 50) * 3 : 0) }); set(dR, { x: ko * 430 - (t < TO ? Math.sin(t * 50) * 3 : 0) });
    glow.style.opacity = ko;
    set(ab, { s: pop(t, S.P[0] + 0.02, 0.35), r: -3 + wobble(t, 0.6, 1.5) });
    const kt = p(t, K.cuarenta, 0.22, E.outBack), on = t >= K.cuarenta;
    set(grid, { s: on ? lerp(0.85, 1, kt) : 1, o: on ? 1 : 0 });
    TH.forEach((e, i) => set(e, { y: on ? Math.sin(t * 7 + i * 0.7) * 4 : 0 }));
    set(cam, { s: lerp(1.0, 1.05, p(t, S.P[0], 2.4, E.linear)) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#4a3626', backgroundImage: 'repeating-linear-gradient(35deg, rgba(0,0,0,.14) 0 5px, transparent 5px 30px)' }); strip(c);
  const glow = box(cam, 110, 470, 860, 800, { zIndex: 2, borderRadius: '430px 430px 30px 30px', background: 'radial-gradient(circle at 50% 75%, #FFE9A8 0%, #E9C75C 40%, #6a4a2a 100%)', border: `8px solid ${INK}`, opacity: 0 });
  const coins = box(cam, 110, 1130, 860, 160, { zIndex: 3 }); { let s = ''; const r = rng(9); for (let k = 0; k < 40; k++) { const x = 40 + r() * 780, y = 40 + r() * 90; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="26" ry="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`; } coins.innerHTML = `<svg width="860" height="160">${s}</svg>`; }
  const grid = box(cam, 0, 0, 1080, 1920, { zIndex: 6, transformOrigin: '540px 860px' });
  const TH = []; for (let r = 0; r < 4; r++) for (let q = 0; q < 10; q++) { const e = box(grid, 132 + q * 80, 560 + r * 158, 70, 135); e.innerHTML = thiefSil(q + r); TH.push(e); }
  const rock = (x, seed) => { const d = box(cam, x, 450, 440, 860, { zIndex: 8 }); const r = rng(seed); let cr = ''; for (let k = 0; k < 9; k++) { let cx = r() * 440, cy = r() * 860; cr += `M${f1(cx)},${f1(cy)}`; for (let j = 0; j < 3; j++) { cx += (r() - 0.5) * 80; cy += r() * 70; cr += `L${f1(cx)},${f1(cy)}`; } } d.innerHTML = `<svg width="440" height="860" style="overflow:visible">${cut('<path d="M0,40 Q40,0 120,10 L440,0 L440,860 L0,860 Z"/>')}<path d="M0,40 Q40,0 120,10 L440,0 L440,860 L0,860 Z" fill="#7a5a3a" stroke="${INK}" stroke-width="7"/><path d="M0,40 Q40,0 120,10 L440,0 L440,860 L0,860 Z" fill="url(#hB)" opacity=".35"/><path d="${cr}" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/></svg>`; return d; };
  const dL = rock(100, 3), dR = rock(540, 8); dR.firstChild.style.transform = 'scaleX(-1)';
  const ab = chip(cam, 248, 404, '¡ÁBRETE, SÉSAMO!', { size: 56, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   Q · «TAMPOCO ESTABA.» — segundo parche cosido en el libro
   ====================================================================== */
headline(S.Q[0], S.Q[1], '*Tampoco* estaba.', { size: 124, hlT: K.tampoco, y: 262 });
{
  const TL = S.Q[0] + 0.22;
  const c = scene(S.Q[0], S.Q[1], t => {
    const k = p(t, S.Q[0] + 0.02, TL - S.Q[0] - 0.02, E.outBack);
    set(p2.wrap, { x: (1 - k) * -420, y: (1 - k) * -700, r: (1 - k) * -30 + 2, s: lerp(1.3, 1, k) });
    p2.stitch(t, TL + 0.05, K.estaba + 0.1);
    p1.stitch(t, -10, -9);
    stampA(st, t, K.tampoco + 0.25, -7, 1);
    set(cam, { s: lerp(1.03, 1.0, p(t, S.Q[0], 1.2, E.outCubic)) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  nightBg(cam); nightSky(cam, 31, false); strip(c);
  openBook(cam, { y: 600, h: 600, z: 4, holeR: true });
  el('div', cam, { left: '210px', top: '548px', width: '660px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: '#e9c75c', background: '#3f2a5a', border: `5px solid ${INK}`, borderRadius: '12px', padding: '4px 0 8px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 9, whiteSpace: 'nowrap' }, 'LES MILLE ET UNE NUITS');
  const p1 = patchAlad(cam, 605, 655, 20);
  const p2 = patchAli(cam, 150, 655, 21);
  const st = stamp(cam, 230, 1030, 'TAMPOCO', { size: 110, bw: 15, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   R · «LOS DOS CUENTOS MÁS FAMOSOS DEL LIBRO LOS CONTÓ ÉL… Y EL LIBRO NI LO NOMBRA.»
   portada «GALLAND» en oro; la silueta de Hanna sin nombre; la pluma escribe «Hanna Diyab» en el lomo
   ====================================================================== */
headline(S.R[0], K.conto10 - 0.06, 'Los *dos* más famosos…', { size: 80, hlT: K.dos10, y: 262 });
headline(K.conto10 - 0.06, K.y10 - 0.06, '…los contó *él*', { size: 116, hlT: K.el10, y: 262 });
headline(K.y10 - 0.06, S.R[1], 'y el libro *ni lo nombra*', { size: 94, hlT: K.ni, y: 262 });
{
  const TW0 = K.ni - 0.05, TW1 = K.nombra + 0.25, NX0 = 290, NX1 = 800;
  const c = scene(S.R[0], S.R[1], t => {
    const kz = p(t, K.y10 - 0.05, 0.5, E.inOutCubic);
    set(cam, { s: lerp(1.0, 1.1, kz) + 0.02 * p(t, S.R[0], 3, E.linear), y: -kz * 60 });
    [pA, pB].forEach((q, i) => { const t0 = [K.dos10, K.famosos][i]; const on = t > t0; q.style.boxShadow = on ? `0 0 ${f1(30 + 14 * Math.sin(t * 8 + i))}px ${f1(10 + 6 * Math.sin(t * 8 + i))}px ${YEL}` : `6px 8px 0 ${SH}`; set(q, { s: on ? 1 + 0.06 * (1 - p(t, t0, 0.4)) : 1, r: [-3, 3][i] }); });
    const kh = p(t, K.conto10 - 0.1, 0.4, E.outBack);
    set(hs.d, { x: (1 - kh) * -360, y: wobble(t, 0.5, 3) }); set(hc.d, { x: (1 - kh) * -360, y: wobble(t, 0.5, 3) });
    const kc = p(t, K.nombra + 0.15, 0.4, E.inOutCubic); hc.d.style.opacity = kc; hs.d.style.opacity = 1 - kc;
    face(hc, t, { look: [5, -3], seed: 0.3 });
    set(qq, { o: t > K.conto10 && t < K.nombra + 0.15 ? 1 : 0, s: pop(t, K.conto10 + 0.1, 0.3), r: Math.sin(t * 6) * 8 });
    const kw = p(t, TW0, TW1 - TW0, E.inOutCubic);
    nm.style.clipPath = `inset(-30px ${f1(90 + (1 - kw) * (620 - 90))}px -30px 60px)`;
    const wx = lerp(NX0, NX1, kw);
    const kq = p(t, TW1 + 0.02, 0.3, E.inCubic);
    set(ql, { x: wx - 20 + kq * 260 + Math.sin(t * 30) * 6 * (kw > 0 && kw < 1 ? 1 : 0), y: -Math.abs(Math.sin(t * 22)) * 14 * (kw > 0 && kw < 1 ? 1 : 0) - kq * 420, r: -28 + kq * 20, o: t > TW0 - 0.25 && kq < 1 ? 1 : 0 });
    set(gl, { s: 1 + 0.02 * Math.sin(t * 3) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  nightBg(cam); rays(cam, -160, 320, 1400, 26, 'rgba(255,230,0,.08)', 'rgba(0,0,0,0)', 1); nightSky(cam, 51, false); strip(c);
  // libro cerrado tumbado: tapa + lomo de frente
  const bk = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  bk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0">
    ${cut('<path d="M170,450 L910,450 L950,1060 L130,1060 Z"/><rect x="130" y="1056" width="820" height="130" rx="10"/>')}
    <path d="M170,450 L910,450 L950,1060 L130,1060 Z" fill="#5a1f2a" stroke="${INK}" stroke-width="7"/><path d="M170,450 L910,450 L950,1060 L130,1060 Z" fill="url(#hA)" opacity=".18"/>
    <path d="M200,478 L880,478 L914,1032 L166,1032 Z" fill="none" stroke="#e9c75c" stroke-width="5"/>
    <rect x="130" y="1056" width="820" height="130" rx="10" fill="#3f1520" stroke="${INK}" stroke-width="7"/><rect x="130" y="1056" width="820" height="130" rx="10" fill="url(#hD)" opacity=".25"/>
    <path d="M200,1062 V1180 M220,1062 V1180 M860,1062 V1180 M880,1062 V1180" stroke="#e9c75c" stroke-width="5"/></svg>`;
  el('div', cam, { left: '0', top: '500px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '38px', color: '#e9c75c', zIndex: 6 }, 'LES MILLE ET UNE NUITS');
  const gl = el('div', cam, { left: '0', top: '572px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '148px', lineHeight: 1, color: '#e9c75c', zIndex: 6, textShadow: `6px 6px 0 ${INK}, -3px -3px 0 #7a5a1a` }, 'GALLAND');
  const pA = box(cam, 230, 790, 280, 200, { zIndex: 7, background: '#F6E7B8', border: `5px dashed ${RED}`, borderRadius: '16px', boxShadow: `6px 8px 0 ${SH}` });
  el('div', pA, { left: '0', top: '58px', width: '270px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: RED }, 'ALADINO');
  const pB = box(cam, 570, 790, 280, 200, { zIndex: 7, background: '#E9D3B0', border: `5px dashed #3f7a8a`, borderRadius: '16px', boxShadow: `6px 8px 0 ${SH}` });
  el('div', pB, { left: '0', top: '58px', width: '270px', textAlign: 'center', fontFamily: 'Rye', fontSize: '44px', color: '#3f2a5a' }, 'ALÍ BABÁ');
  const nm = el('div', cam, { left: '200px', top: '1066px', width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', lineHeight: '104px', color: '#FFE9A8', zIndex: 8, whiteSpace: 'nowrap', textShadow: `3px 3px 0 ${INK}` }, 'Hanna Diyab');
  const ql = box(cam, 0, 940, 140, 280, { zIndex: 10, transformOrigin: '30% 100%' }); ql.innerHTML = quillSvg();
  const hs = mk(cam, [-10, 960, 290, 371], hannaInner(), '0 0 360 460', 'bust'); hs.d.style.filter = SIL; hs.d.style.zIndex = 11;
  const hc = mk(cam, [-10, 960, 290, 371], hannaInner(), '0 0 360 460', 'bust'); hc.d.style.zIndex = 12;
  const qq = el('div', cam, { left: '190px', top: '890px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: YEL, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 13 }, '?');
}
