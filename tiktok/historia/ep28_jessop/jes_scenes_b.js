/* Ep. 28 · escenas L4–L11 (todo clavado por texto vía K) */

/* ======================================================================
   I1 · «AL OLYMPIC LO EMBISTIÓ UN BUQUE DE GUERRA» — zoom a la carta 1; ¡CRAC! y sello «1»
   ====================================================================== */
headline(S.I1[0], K.embistio - 0.06, 'Al *Olympic*…', { size: 120, hlT: K.olympic, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(K.embistio - 0.06, S.I1[1], 'lo embistió *un buque de guerra*', { size: 84, hlT: K.buque, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
const T_CRAC = K.embistio + 0.14;
{
  const c = scene(S.I1[0], S.I1[1], t => {
    set(fr, { s: lerp(0.55, 1, p(t, S.I1[0], 0.35, E.outCubic)), o: 1 });
    set(sea, { x: -(((t - S.I1[0]) * 40) % 60) });
    const kw = p(t, S.I1[0], T_CRAC - S.I1[0], E.inCubic);
    const recoil = t > T_CRAC ? -40 * Math.sin(p(t, T_CRAC, 0.5) * Math.PI) : 0;
    set(war, { x: lerp(-760, -232, kw) + recoil, y: Math.sin(t * 2.6) * 4 });
    const tilt = t > T_CRAC ? 4 * p(t, T_CRAC, 0.3, E.outBack) : 0;
    set(oly, { r: tilt + Math.sin(t * 2.2) * 0.6, y: Math.sin(t * 2.2 + 1) * 4 });
    set(boom, { s: pop(t, T_CRAC, 0.25) * (1 - p(t, T_CRAC + 0.7, 0.3)), r: t * 40, o: t < T_CRAC ? 0 : 1 });
    set(crac, { s: pop(t, T_CRAC + 0.02, 0.3), r: -8, o: t < T_CRAC ? 0 : 1 - p(t, T_CRAC + 1.3, 0.2) });
    set(TL.d, { s: pop(t, S.I1[0] + 0.2, 0.3), o: t < S.I1[0] + 0.2 ? 0 : 1 });
    stampA(TL.st[0], t, T_CRAC + 0.4, -12, 1); TL.st[1].style.opacity = 1; set(TL.st[1], { r: 8, o: 0.95 }); TL.st[2].style.opacity = 0;
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.15), rgba(0,0,0,.35) 80%)' });
  const fr = box(c, 60, 440, 880, 840, { zIndex: 5, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `12px 14px 0 ${SH}` });
  const inner = box(fr, 18, 18, 830, 700, { overflow: 'hidden', borderRadius: '12px', border: `4px solid ${INK}`, background: 'linear-gradient(180deg, #cfe0e4 0%, #e9e2cf 70%)' });
  const sea = box(inner, 0, 0, 900, 700, { zIndex: 1 }); sea.innerHTML = waterSvg(470, 300, 21, LAGOON, INK, 900);
  const oly = box(inner, 210, 250, 600, 200, { zIndex: 3, transformOrigin: '300px 160px' }); oly.innerHTML = shipSvg({});
  const war = box(inner, 0, 330, 480, 164, { zIndex: 4 }); war.innerHTML = svgW(warshipInner(), '0 0 760 260');
  const boom = box(inner, 130, 270, 240, 240, { zIndex: 6 }); boom.innerHTML = svgW(boomInner(), '0 0 600 600');
  const crac = BIGT(inner, 0, 110, 520, '¡CRAC!', { fontSize: '120px', color: YEL, textShadow: OUTL(INK, 8), zIndex: 8 });
  el('div', fr, { left: 0, top: '736px', width: '866px', textAlign: 'center', fontFamily: 'Rye', fontSize: '46px', color: INK }, 'GEMELO 1 · OLYMPIC · 1911');
  const TL = mkTally(inner, 528, 18, 80, 9);
}

/* ======================================================================
   I2 · «¿TÚ LO DEJAS?» — la única complicidad: el Vecino levanta su cartel «DIMITO»
   ====================================================================== */
headline(S.I2[0], S.I2[1], '¿Tú *lo dejas?*', { size: 136, hlT: K.dejas });
{
  const c = scene(S.I2[0], S.I2[1], t => {
    set(ry, { r: t * 9 });
    set(vio.d, { s: pop(t, S.I2[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [-6, -4], bL: 4, bR: 16, seed: 7.7 });
    set(cd.d, { s: pop(t, S.I2[0] + 0.05, 0.35), r: -8 + wobble(t, 0.5, 1), o: 1 });
    set(q, { s: pop(t, K.dejas - 0.05, 0.3), r: -10 + Math.sin(t * 6) * 8, o: t < K.dejas - 0.05 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1D9D2' });
  const ry = rays(c, -160, 200, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const cd = mkCard(c, 110, 470, 1, 'OLYMPIC', '1911', { w: 230 });
  box(cd.d, 0, 0, 230, 341, { zIndex: 5 }).innerHTML = `<svg width="230" height="341" style="overflow:visible"><path d="M40,90 L90,150 L70,190 L130,240 L120,300" stroke="${RED}" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
  const vio = mkViolet(c, [440, 480, 440, 562]); vio.d.style.zIndex = 4;
  const q = qMark(c, 830, 470, 150, PINK);
}

/* ======================================================================
   I3 · «ELLA SE PASÓ… AL TITANIC.» — la cofia salta de la carta 1 a la 2, que brilla
   ====================================================================== */
headline(S.I3[0], K.al68 - 0.06, 'Ella *se pasó*…', { size: 124, hlT: K.paso, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(K.al68 - 0.06, S.I3[1], '… *al Titanic*', { size: 136, hlT: K.titanic4, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const A = [100, 460], B = [560, 460], WC = 320;
  const c = scene(S.I3[0], S.I3[1], t => {
    set(ry, { r: t * 10, o: t > K.titanic4 ? 1 : 0 });
    set(c1.d, { x: (1 - p(t, S.I3[0], 0.35, E.outBack)) * -600, r: -3 + wobble(t, 0.4, 0.8) });
    set(c2.d, { x: (1 - p(t, S.I3[0] + 0.08, 0.35, E.outBack)) * 600, r: 3 + wobble(t, 0.4, 0.8, 1), s: 1 + (t > K.titanic4 ? 0.08 * p(t, K.titanic4, 0.3, E.outBack) : 0) });
    c2.glow.style.opacity = p(t, K.titanic4 - 0.05, 0.25);
    const kj = p(t, K.paso, 0.75, E.inOutCubic);
    const x0 = A[0] + WC / 2 - 80, x1 = B[0] + WC / 2 - 80;
    set(cof, { x: lerp(x0, x1, kj), y: A[1] - 66 - Math.sin(kj * Math.PI) * 220 + wobble(t, 0.8, 3), r: Math.sin(kj * Math.PI * 2) * 25, o: 1 });
    SP.forEach((s2, i) => set(s2, { o: t > K.titanic4 ? 0.5 + 0.5 * Math.sin(t * 9 + i) : 0, s: 1 + 0.3 * Math.sin(t * 7 + i), r: t * 90 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  const ry = rays(c, 20, 0, 1400, 26, 'rgba(255,230,0,.16)', 'rgba(0,0,0,0)', 0);
  const c1 = mkCard(c, A[0], A[1], 1, 'OLYMPIC', '1911', { w: WC });
  const c2 = mkCard(c, B[0], B[1], 2, 'TITANIC', '1912', { w: WC, z: 12 });
  const cof = box(c, 0, 0, 160, 80, { zIndex: 30 }); cof.innerHTML = cofiaSvg();
  const SP = [[580, 430], [860, 520], [600, 900], [880, 860]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '60px', color: YEL, textShadow: `2px 2px 0 ${INK}`, zIndex: 31 }, '✦'));
}

/* ======================================================================
   J1 · «Y EL BRITANNIC, DE ENFERMERA.» — carta 3 (barco hospital) y la cofia se vuelve toca
   ====================================================================== */
headline(S.J1[0], K.enfermera - 0.35, 'Y el *Britannic*…', { size: 116, hlT: K.britannic });
headline(K.enfermera - 0.35, S.J1[1], 'de *enfermera*', { size: 124, hlT: K.enfermera });
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(cd.d, { s: pop(t, S.J1[0], 0.35), r: -5 + wobble(t, 0.4, 0.8), o: 1 });
    const km = p(t, K.enfermera - 0.08, 0.2, E.outCubic);
    set(v1.d, { s: pop(t, S.J1[0] + 0.1, 0.35) * (1 + 0.06 * Math.sin(km * Math.PI)), o: t < S.J1[0] + 0.1 ? 0 : 1 - km, y: wobble(t, 0.5, 3) });
    set(v2.d, { s: 1 + 0.06 * Math.sin(km * Math.PI), o: km, y: wobble(t, 0.5, 3) });
    face(v1, t, { look: [-4, 0], bL: 4, bR: 4, seed: 8.1 }); face(v2, t, { look: [-4, 0], bL: 8, bR: 8, seed: 8.1 });
    PF.forEach((f, i) => { const kf = p(t, K.enfermera - 0.05, 0.5, E.outCubic); set(f, { x: Math.cos(i * 1.6) * 160 * kf, y: Math.sin(i * 1.6) * 110 * kf, s: 0.4 + kf, o: t > K.enfermera - 0.05 && kf < 1 ? 1 - kf : 0 }); });
    popA(cross, t, K.enfermera + 0.1, { r: 8 });
  }, { clip: true });
  sceneBg(c, { background: '#E9E3D6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.06) 0 3px, transparent 3px 80px)' });
  rays(c, -160, 160, 1400, 24, 'rgba(200,16,46,.06)', 'rgba(0,0,0,0)', 0);
  const cd = mkCard(c, 80, 450, 3, 'BRITANNIC', '1916', { w: 300, hospital: true });
  const v1 = mkViolet(c, [470, 500, 430, 549]); v1.d.style.zIndex = 4;
  const v2 = mkViolet(c, [470, 500, 430, 549], { nurse: true }); v2.d.style.zIndex = 5;
  const PF = [0, 1, 2, 3].map(() => box(c, 640, 560, 120, 80, { borderRadius: '50%', background: '#fff', border: `4px solid ${INK}`, zIndex: 6 }));
  const cross = box(c, 820, 470, 110, 110, { zIndex: 8 }); cross.innerHTML = `<svg viewBox="0 0 100 100" width="110" height="110" style="overflow:visible">${cut('<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z"/>', 4, 5)}<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/></svg>`;
}

/* ======================================================================
   J2 · «UNA MINA…» — sube una mina con púas y ¡BUM!
   ====================================================================== */
headline(S.J2[0], S.J2[1], 'Una *mina*…', { size: 136, hlT: K.mina });
const T_BUM = Math.min(K.minaE - 0.15, K.mina + 0.75);
{
  const c = scene(S.J2[0], S.J2[1], t => {
    const km = p(t, S.J2[0], T_BUM - S.J2[0], E.inCubic);
    set(mine, { y: lerp(900, 0, km), r: Math.sin(t * 3) * 4, o: t > T_BUM + 0.08 ? 0 : 1 });
    set(boom, { s: pop(t, T_BUM, 0.28) * (1 + 0.1 * Math.sin(t * 20)), r: t * 30, o: t < T_BUM ? 0 : 1 - p(t, T_BUM + 0.7, 0.3) });
    const kt = t > T_BUM ? p(t, T_BUM, 0.8, E.outCubic) : 0;
    set(shp, { r: kt * 7 + Math.sin(t * 2) * 0.5, y: kt * 30 + Math.sin(t * 2.2) * 3 });
    SM.forEach((s2, i) => { const ks = p(t, T_BUM + 0.05 + i * 0.05, 0.9, E.outCubic); set(s2, { x: (i - 2) * 90 * ks, y: -ks * (180 + i * 30), s: 0.4 + ks * 1.2, o: t > T_BUM && ks < 1 ? 1 - ks * 0.8 : 0 }); });
    BUB.forEach((b, i) => { const ph = ((t - S.J2[0]) * 0.8 + i * 0.21) % 1; set(b, { y: -ph * 700, o: 0.7 * (1 - ph) }); });
  }, { clip: true });
  sceneBg(c, { background: `linear-gradient(180deg, #cfe0e4 0%, #e9e2cf 30%, ${DEEP} 31%, ${DEEP2} 100%)` });
  box(c, 0, 595, 1080, 1400, { zIndex: 1, background: 'repeating-linear-gradient(100deg, rgba(255,255,255,.05) 0 40px, transparent 40px 130px)' });
  const shp = box(c, 140, 380, 800, 267, { zIndex: 3, transformOrigin: '400px 220px' }); shp.innerHTML = shipSvg({ hospital: true });
  box(c, 0, 586, 1080, 20, { zIndex: 4 }).innerHTML = `<svg width="1080" height="20" style="overflow:visible"><path d="M0,10 ${Array.from({ length: 27 }, () => 'q20,-10 40,0').join(' ')}" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/></svg>`;
  const mine = box(c, 400, 560, 260, 364, { zIndex: 5 }); mine.innerHTML = svgW(mineInner(), '0 0 300 420');
  const boom = box(c, 290, 380, 480, 480, { zIndex: 7 }); boom.innerHTML = svgW(boomInner(), '0 0 600 600');
  const SM = [0, 1, 2, 3, 4].map(() => box(c, 480, 520, 140, 100, { borderRadius: '50%', background: '#6a645a', border: `4px solid ${INK}`, zIndex: 6 }));
  const BUB = []; for (let i = 0; i < 8; i++) BUB.push(box(c, 200 + i * 90, 1250, 16 + (i % 3) * 8, 16 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 2 }));
}

/* ======================================================================
   J3 · «…Y VUELVE AL CAMAROTE.» — pasillo inclinado, la puerta del fondo se abre
   ====================================================================== */
headline(S.J3[0], S.J3[1], 'y vuelve *al camarote*', { size: 100, hlT: K.camarote });
{
  const c = scene(S.J3[0], S.J3[1], t => {
    set(cor, { r: 9 + Math.sin(t * 1.5) * 1, s: 1 + 0.25 * p(t, S.J3[0], S.J3[1] - S.J3[0], E.inCubic) });
    const kd = p(t, K.camarote - 0.05, 0.4, E.outCubic);
    set(door, { sx: lerp(1, 0.12, kd) });
    lite.style.opacity = kd;
  }, { clip: true });
  sceneBg(c, { background: '#3a2a1e' });
  const cor = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 820px' }); cor.innerHTML = corridorSvg();
  const lite = box(cor, 390, 610, 300, 420, { background: 'radial-gradient(circle at 50% 50%, #FFF3A8, #FFE600 60%, #d9a44a)', zIndex: 3 });
  const door = box(cor, 390, 610, 300, 420, { zIndex: 4, transformOrigin: '0px 210px', background: WOOD, border: `6px solid ${INK}`, boxSizing: 'border-box' });
  door.innerHTML = `<div style="position:absolute;left:30px;top:30px;width:228px;height:150px;border:4px solid ${INK}"></div><div style="position:absolute;left:30px;top:210px;width:228px;height:160px;border:4px solid ${INK}"></div><div style="position:absolute;left:236px;top:196px;width:22px;height:22px;border-radius:50%;background:${BRASS};border:3px solid ${INK}"></div><div style="position:absolute;left:96px;top:80px;font-family:Rye;font-size:44px;color:${INK}">Nº 4</div>`;
}

/* ======================================================================
   K1 · «¿A POR QUÉ?» — una mano rebusca en el cajón
   ====================================================================== */
headline(S.K1[0], S.K1[1], '¿A *por qué?*', { size: 150, hlT: K.porque });
{
  const c = scene(S.K1[0], S.K1[1], t => {
    set(dr, { y: (1 - p(t, S.K1[0], 0.3, E.outBack)) * 500, r: -2 });
    set(hd, { x: Math.sin(t * 14) * 60, y: Math.cos(t * 11) * 20 });
    IT.forEach((it, i) => set(it, { y: -Math.abs(Math.sin(t * 9 + i * 2)) * 40, r: Math.sin(t * 7 + i) * 20 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const dr = box(c, 160, 640, 760, 420, { zIndex: 3 }); dr.innerHTML = svgW(drawerInner(), '0 0 760 420');
  const IT = [[300, 640, '🧦'], [640, 650, '✉️'], [480, 620, '🧷']].map(([x, y, e]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', zIndex: 4 }, e));
  const hd = box(c, 440, 560, 220, 220, { zIndex: 5 }); hd.innerHTML = `<svg viewBox="-80 -80 160 160" width="220" height="220" style="overflow:visible">${gloveHand(0, 0, 180, 1.6)}</svg>`;
}

/* ======================================================================
   K2 · «A POR EL CEPILLO DE DIENTES.» — el cepillo gigante, como un tesoro
   ====================================================================== */
headline(S.K2[0], S.K2[1], 'A por el *cepillo de dientes*', { size: 92, hlT: K.cepillo, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.K2[0], S.K2[1], t => {
    set(ry, { r: t * 20 });
    const kb = p(t, K.cepillo - 0.08, 0.5, E.outBackBig || E.outBack);
    set(br, { s: t < K.cepillo - 0.08 ? 0 : kb, r: -12 + wobble(t, 0.5, 2), y: wobble(t, 0.6, 6), o: t < K.cepillo - 0.08 ? 0 : 1 });
    set(gl, { s: 0.6 + 0.4 * p(t, K.cepillo, 0.4) + 0.05 * Math.sin(t * 8), o: t > K.cepillo - 0.08 ? 1 : 0 });
    SP.forEach((s2, i) => set(s2, { o: t > K.cepillo ? 0.5 + 0.5 * Math.sin(t * 8 + i * 1.3) : 0, s: 1 + 0.3 * Math.sin(t * 6 + i), r: t * 120 }));
  }, { clip: true });
  sceneBg(c, { background: '#2b2118' });
  const ry = rays(c, -160, 140, 1400, 28, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 1);
  const gl = box(c, 140, 520, 800, 640, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,230,0,.75), rgba(255,230,0,0))' });
  const br = box(c, 150, 760, 780, 171, { zIndex: 5 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const SP = [[200, 640], [820, 640], [300, 1060], [760, 1080], [540, 560]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
}

/* ======================================================================
   K3 · GOLPE ROSA: «DEL TITANIC SALIÓ SIN ÉL.» — la carta 2 con el cepillo tachado
   ====================================================================== */
colorHit(S.K3[0], S.K3[1], PINK, c => {
  const l1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '100px', color: INK, zIndex: 10 }, 'Del Titanic');
  const l2 = el('div', c, { left: 0, top: '370px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 10 }, 'salió');
  const big = el('div', c, { left: 0, top: '500px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '180px', lineHeight: '190px', color: '#fff', textShadow: OUTL(INK, 10), zIndex: 12, whiteSpace: 'nowrap' }, 'SIN ÉL');
  const cd = mkCard(c, 470, 730, 2, 'TITANIC', '1912', { w: 280, z: 5 });
  const br = box(c, 420, 900, 400, 88, { zIndex: 7 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const xx = box(c, 500, 820, 240, 240, { zIndex: 8 }); xx.innerHTML = XSVG;
  return t => {
    popA(l1, t, K.del90 - 0.03, { rise: 30 });
    popA(l2, t, K.salio - 0.05, { rise: 30 });
    const kb = p(t, K.sin - 0.04, 0.2, E.outBack);
    set(big, { s: t < K.sin - 0.04 ? 0 : lerp(1.7, 1, kb), r: -3, o: t < K.sin - 0.04 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.el94, 0.3) ? glitch(t, K.el94, 0.3) + ', ' : '') + OUTL(INK, 10);
    set(cd.d, { s: pop(t, S.K3[0] + 0.05, 0.35), r: 6 + wobble(t, 0.5, 1.5), o: 1 });
    set(br, { s: pop(t, K.titanic6, 0.35), r: -14, o: t < K.titanic6 ? 0 : 1 });
    set(xx, { s: pop(t, K.sin + 0.05, 0.3), r: 0, o: t < K.sin + 0.05 ? 0 : 1 });
  };
});

/* ======================================================================
   L1 · «SUBE A UN BOTE…» — el bote visto desde arriba
   ====================================================================== */
headline(S.L1[0], S.L1[1], 'Sube *a un bote*…', { size: 120, hlT: K.bote7, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.L1[0], S.L1[1], t => {
    const tl = t - S.L1[0];
    set(cam, { s: lerp(1, 1.35, p(t, S.L1[0], S.L1[1] - S.L1[0], E.inOutCubic)) });
    AR1.forEach((a, i) => { const ph = ((t - K.bote7) * 1.3 + i / 3) % 1; set(a, { x: lerp(-40, 60, ph), y: lerp(-30, 90, ph), o: t > K.bote7 ? (1 - Math.abs(ph - 0.5) * 2) : 0 }); });
    set(bt, { x: tl * 30, y: Math.sin(t * 2) * 6, r: -8 + tl * 4 });
    RG.forEach((r2, i) => { const ph = (tl * 0.6 + i / 3) % 1; set(r2, { s: 0.6 + ph * 1.2, o: (1 - ph) * 0.7 }); });
    set(wv, { x: -((tl * 30) % 80), y: -((tl * 20) % 60) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '730px 830px' });
  sceneBg(cam, { background: '#2d6f7a' });
  const AR1 = [0, 1, 2].map(i => { const a = box(cam, 300 + i * 150, 960 + (i % 2) * 40, 160, 140, { zIndex: 6 }); a.innerHTML = arrowSvg('M10,10 Q60,40 120,120 M90,118 L124,126 L120,92', PINK, 10); return a; });
  const wv = box(cam, -100, -100, 1300, 2200, { zIndex: 1, backgroundImage: `repeating-linear-gradient(170deg, rgba(255,255,255,.12) 0 4px, transparent 4px 60px), repeating-linear-gradient(80deg, rgba(0,0,0,.08) 0 3px, transparent 3px 80px)` });
  box(cam, 0, 0, 1080, 420, { zIndex: 2, background: HULL, borderBottom: `8px solid ${INK}` }).innerHTML = `<svg width="1080" height="420"><path d="M0,380 H1080" stroke="#E9DFC8" stroke-width="4" opacity=".6"/>${Array.from({ length: 14 }, (_, k) => `<circle cx="${40 + k * 78}" cy="350" r="9" fill="#E9DFC8" opacity=".6"/>`).join('')}</svg>`;
  const RG = [0, 1, 2].map(() => box(cam, 340, 690, 420, 280, { borderRadius: '50%', border: '5px solid rgba(255,255,255,.6)', zIndex: 3 }));
  const bt = box(cam, 290, 720, 520, 220, { zIndex: 5 }); bt.innerHTML = svgW(boatTopInner({ violet: [440, 110], heads: [[160, 86], [160, 136], [240, 80], [240, 140], [320, 92], [320, 130]] }), '0 0 520 220');
}

/* ======================================================================
   L2 · «…Y EL AGUA LO ARRASTRA A LAS HÉLICES,» — contraplano bajo el agua
   ====================================================================== */
headline(S.L2[0], S.L2[1], 'lo arrastra *a las hélices*', { size: 94, hlT: K.helices, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.L2[0], S.L2[1], t => {
    set(cam, { s: 1 + 0.14 * p(t, K.helices - 0.1, 0.6, E.inOutCubic) });
    set(pr1, { r: t * 300 }); set(pr2, { r: -t * 300 + 20 });
    const kb = p(t, S.L2[0], S.L2[1] - S.L2[0], E.inCubic);
    set(bt, { x: lerp(0, 230, kb), y: lerp(0, 60, kb), r: Math.sin(t * 3) * 3 });
    AR.forEach((a, i) => { const ph = ((t - S.L2[0]) * 1.2 + i / 3) % 1; set(a, { x: lerp(-60, 60, ph), y: lerp(-40, 80, ph), o: t > K.arrastra - 0.1 ? (1 - Math.abs(ph - 0.5) * 2) : 0 }); });
    BUB.forEach((b, i) => { const ph = ((t - S.L2[0]) * 1.1 + i * 0.17) % 1; set(b, { y: -ph * 600, x: Math.sin(t * 3 + i) * 20, o: 0.7 * (1 - ph) }); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '560px 1000px' });
  sceneBg(cam, { background: `linear-gradient(180deg, #3f8a90 0%, ${DEEP} 35%, ${DEEP2} 100%)` });
  box(cam, 0, 0, 1080, 1920, { zIndex: 1, background: 'repeating-linear-gradient(100deg, rgba(255,255,255,.06) 0 50px, transparent 50px 150px)' });
  // casco del barco por debajo + ejes
  box(cam, 0, 0, 1080, 1920, { zIndex: 2 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="-40" y="0" width="1160" height="640" fill="#3f8a90" opacity=".55"/><path d="M-40,640 ${Array.from({ length: 30 }, () => 'q20,-12 40,0').join(' ')}" stroke="#dfe8ef" stroke-width="6" fill="none"/><path d="M560,620 L560,1000 M50,600 L50,1000" stroke="#5e5a52" stroke-width="30"/><path d="M560,620 L560,1000 M50,600 L50,1000" stroke="${INK}" stroke-width="4" stroke-dasharray="10 14"/></svg>`;
  const pr2 = box(cam, -150, 800, 400, 400, { zIndex: 4 }); pr2.innerHTML = svgW(propInner(3), '0 0 400 400');
  const pr1 = box(cam, 260, 720, 600, 600, { zIndex: 5 }); pr1.innerHTML = svgW(propInner(3), '0 0 400 400');
  const bt = box(cam, 70, 440, 520, 315, { zIndex: 3 }); bt.innerHTML = `<svg viewBox="0 -120 380 230" width="520" height="315" style="overflow:visible"><g transform="translate(130,-62) scale(0.46)"><circle cx="130" cy="150" r="70" fill="#4a2e1c" stroke="${INK}" stroke-width="8"/>${cofiaInner()}</g><path d="M10,20 C80,100 300,100 370,20 Z" fill="#2a1f17" stroke="${INK}" stroke-width="5"/><path d="M0,20 H380" stroke="#cfe0e4" stroke-width="6"/></svg>`;
  const AR = [0, 1, 2].map(i => { const a = box(cam, 360 + i * 70, 640 + i * 60, 160, 120, { zIndex: 6 }); a.innerHTML = arrowSvg('M10,10 Q80,30 130,100 M100,96 L134,104 L128,70', PINK, 10); return a; });
  const BUB = []; for (let i = 0; i < 10; i++) BUB.push(box(cam, 120 + i * 85, 1300, 14 + (i % 3) * 8, 14 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 6 }));
}

/* ======================================================================
   L3 · «…QUE SIGUEN GIRANDO.» — la hélice, enorme, cada vez más cerca
   ====================================================================== */
headline(S.L3[0], S.L3[1], 'que *siguen girando*', { size: 110, hlT: K.girando, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.L3[0], S.L3[1], t => {
    const kz = p(t, S.L3[0], S.L3[1] - S.L3[0], E.inCubic);
    set(cam, { s: 1 + 0.18 * kz, x: Math.sin(t * 50) * 3 * kz, y: Math.cos(t * 43) * 3 * kz });
    set(pr, { r: t * 520 });
    set(bt, { y: lerp(0, 170, kz), x: lerp(0, 60, kz), r: Math.sin(t * 4) * 4 });
    RT.forEach((a, i) => set(a, { r: -t * 200 + i * 180, o: 0.85 }));
    BUB.forEach((b, i) => { const ph = ((t - S.L3[0]) * 1.4 + i * 0.13) % 1; set(b, { y: -ph * 700, x: Math.sin(t * 4 + i) * 30, o: 0.8 * (1 - ph) }); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 950px' });
  sceneBg(cam, { background: `radial-gradient(circle at 50% 55%, #1f5560 0%, ${DEEP2} 75%)` });
  const pr = box(cam, 160, 580, 760, 760, { zIndex: 4 }); pr.innerHTML = svgW(propInner(3), '0 0 400 400');
  const RT = [0, 1].map(() => { const a = box(cam, 120, 540, 840, 840, { zIndex: 5 }); a.innerHTML = `<svg viewBox="0 0 840 840" width="840" height="840" style="overflow:visible"><path d="M420,40 A380,380 0 0,1 790,360" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M420,40 A380,380 0 0,1 790,360" stroke="${PINK}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M760,330 L796,380 L820,318" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M760,330 L796,380 L820,318" stroke="${PINK}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`; return a; });
  const bt = box(cam, 270, 430, 520, 315, { zIndex: 3 }); bt.innerHTML = `<svg viewBox="0 -120 380 230" width="520" height="315" style="overflow:visible"><g transform="translate(130,-62) scale(0.46)"><circle cx="130" cy="150" r="70" fill="#4a2e1c" stroke="${INK}" stroke-width="8"/>${cofiaInner()}</g><path d="M10,20 C80,100 300,100 370,20 Z" fill="#2a1f17" stroke="${INK}" stroke-width="5"/><path d="M0,20 H380" stroke="#cfe0e4" stroke-width="6"/></svg>`;
  const BUB = []; for (let i = 0; i < 12; i++) BUB.push(box(cam, 140 + i * 70, 1300, 14 + (i % 3) * 8, 14 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 6 }));
}

/* ======================================================================
   M1 · GOLPE AMARILLO: «SALTA.» — silueta congelada en el aire
   ====================================================================== */
colorHit(S.M1[0], S.M1[1], YEL, c => {
  const big = el('div', c, { left: 0, top: '280px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, '¡SALTA!');
  const jm = box(c, 340, 640, 400, 560, { zIndex: 8 }); jm.innerHTML = svgW(jumperInner(INK), '0 0 400 560');
  const sp = box(c, 200, 1180, 680, 120, { zIndex: 7 }); sp.innerHTML = `<svg width="680" height="120" style="overflow:visible"><path d="M0,80 ${Array.from({ length: 17 }, () => 'q20,-24 40,0').join(' ')}" stroke="${INK}" stroke-width="10" fill="none"/></svg>`;
  return t => {
    const kb = p(t, K.salta - 0.04, 0.16, E.outBack);
    set(big, { s: t < K.salta - 0.04 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < K.salta - 0.04 ? 0 : 1 });
    // salto: sube rápido, se congela 0,3 s en el aire y empieza a caer
    const tj = t - S.M1[0], up = p(t, S.M1[0], 0.15, E.outCubic), fall = p(t, S.M1[0] + 0.48, 0.3, E.inCubic);
    set(jm, { y: lerp(240, -40, up) + fall * 260, r: lerp(-10, 6, up) + fall * 10, s: 1 });
    void tj;
  };
});

/* ======================================================================
   M2 · «GOLPE EN LA CABEZA…» — chapuzón, oscuridad y estrellas de grabado
   ====================================================================== */
headline(S.M2[0], S.M2[1], 'Golpe *en la cabeza*', { size: 104, hlT: K.cabeza, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.M2[0], S.M2[1], t => {
    const ks = p(t, S.M2[0], 0.35, E.outCubic);
    set(spl, { s: 0.5 + ks * 1.4, o: 1 - ks });
    dark.style.opacity = 0.15 + 0.55 * p(t, K.cabeza - 0.3, 0.5);
    const kh = t > K.cabeza ? p(t, K.cabeza, 0.25, E.outBack) : 0;
    set(vio.d, { y: lerp(-120, 0, p(t, S.M2[0], 0.5, E.outCubic)) + wobble(t, 0.6, 4), r: kh * 18 + wobble(t, 0.4, 2) });
    face(vio, t, { closed: t > K.cabeza, look: [0, 0], bL: 10, bR: 10, seed: 9.9 });
    ST.forEach((s2, i) => { const a = t * 5 + i * 2.1; set(s2, { x: Math.cos(a) * 170, y: Math.sin(a) * 50, o: t > K.cabeza + 0.05 ? 1 : 0, r: t * 200 }); });
    set(pum, { s: pop(t, K.cabeza, 0.3) * (1 - p(t, K.cabeza + 0.8, 0.25)), r: -10, o: t < K.cabeza ? 0 : 1 });
    BUB.forEach((b, i) => { const ph = ((t - S.M2[0]) * 1.2 + i * 0.19) % 1; set(b, { y: -ph * 800, o: 0.8 * (1 - ph) }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `linear-gradient(180deg, #2d6f7a 0%, ${DEEP} 40%, ${DEEP2} 100%)` });
  const vio = mkViolet(c, [330, 560, 420, 537], { noCap: true }); vio.d.style.zIndex = 4;
  const spl = box(c, 240, 480, 600, 300, { zIndex: 5, borderRadius: '50%', border: '14px solid #fff' });
  const ST = [0, 1, 2, 3].map(() => el('div', c, { left: '510px', top: '600px', fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 7 }, '✦'));
  const pum = box(c, 600, 460, 300, 300, { zIndex: 8 }); pum.innerHTML = svgW(boomInner(YEL) + `<text x="300" y="350" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="150" fill="#fff" stroke="${INK}" stroke-width="8" paint-order="stroke">¡PUM!</text>`, '0 0 600 600');
  const dark = box(c, 0, 0, 1080, 1920, { zIndex: 6, background: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 20%, rgba(0,0,0,.95) 70%)' });
  const BUB = []; for (let i = 0; i < 10; i++) BUB.push(box(c, 260 + i * 55, 1200, 14 + (i % 3) * 8, 14 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 5 }));
}

/* ======================================================================
   M3 · «…Y SALE VIVA.» — una mano la saca del agua; sello «3»
   ====================================================================== */
headline(S.M3[0], S.M3[1], 'y *sale viva*', { size: 130, hlT: K.viva });
{
  const c = scene(S.M3[0], S.M3[1], t => {
    const ku = p(t, S.M3[0], 0.5, E.outBack);
    set(vio.d, { y: lerp(380, 0, ku) + wobble(t, 0.6, 3) });
    face(vio, t, { look: [4, -6], bL: 12, bR: 12, seed: 10.4 });
    set(hd, { y: lerp(-300, 0, p(t, S.M3[0], 0.35, E.outCubic)) + lerp(380, 0, ku) * 0.6 });
    set(wt, { x: -(((t - S.M3[0]) * 40) % 60) });
    set(TL.d, { s: pop(t, S.M3[0] + 0.05, 0.3), o: 1 });
    TL.st.forEach((s2, i) => { if (i < 2) set(s2, { r: [-12, 8][i], o: 0.95 }); });
    stampA(TL.st[2], t, K.viva + 0.08, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #f2b8c6 0%, #f7d7a8 60%)' });
  const vClip = box(c, 300, 560, 480, 560, { overflow: 'hidden', zIndex: 4 });
  const vio = mkViolet(vClip, [40, 30, 400, 511], { noCap: true });
  const wt = box(c, 0, 0, 1140, 1920, { zIndex: 5 }); wt.innerHTML = waterSvg(1100, 300, 31, '#6f8fa6', INK, 1140);
  const hd = box(c, 600, 520, 200, 200, { zIndex: 6 }); hd.innerHTML = `<svg viewBox="-80 -80 160 160" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, 200, 1.5)}</svg>`;
  const TL = mkTally(c, 360, 400, 100, 30);
}

/* ======================================================================
   M4 · «CON EL CRÁNEO ROTO, SEGÚN CONTÓ.» — radiografía de grabado
   ====================================================================== */
headline(S.M4[0], S.M4[1], 'Con el *cráneo roto*', { size: 110, hlT: K.roto, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.M4[0], S.M4[1], t => {
    set(lb, { s: pop(t, S.M4[0], 0.35), o: 1 });
    lb.style.filter = `brightness(${f1(0.9 + 0.1 * Math.abs(Math.sin(t * 23)))})`;
    crack.style.strokeDashoffset = f1(1000 * (1 - p(t, K.roto - 0.05, 0.35)));
    set(sk, { r: wobble(t, 0.3, 1), s: 1 + 0.04 * p(t, S.M4[0], 2.3, E.linear) });
    popA(seg, t, K.segun - 0.05, { r: -4 });
    popA(band, t, K.roto + 0.35, { r: -18 });
    set(glow, { o: t > K.roto ? 0.6 + 0.4 * Math.sin(t * 10) : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#0c1b2a', backgroundImage: 'repeating-linear-gradient(0deg, rgba(191,230,255,.06) 0 2px, transparent 2px 60px), repeating-linear-gradient(90deg, rgba(191,230,255,.06) 0 2px, transparent 2px 60px)' });
  const lb = box(c, 170, 460, 740, 820, { zIndex: 3, background: 'radial-gradient(circle at 50% 45%, #1d4a6a, #0a1622 80%)', border: `10px solid #dfe8ef`, borderRadius: '16px', boxShadow: `0 0 60px rgba(191,230,255,.35)` });
  const sk = box(lb, 120, 100, 500, 560, { zIndex: 2 }); sk.innerHTML = svgW(skullInner() + `<path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" class="crk" d="M250,34 L232,80 L262,118 L236,160 L270,196 L250,226" stroke="#ff6b7a" stroke-width="9" fill="none" stroke-linejoin="round"/>`, '0 0 500 560');
  const crack = sk.querySelector('.crk');
  const band = box(lb, 300, 150, 170, 70, { zIndex: 4 }); band.innerHTML = `<svg width="170" height="70" style="overflow:visible"><rect x="0" y="0" width="170" height="70" rx="30" fill="#F2E3C6" stroke="${INK}" stroke-width="5"/><rect x="55" y="10" width="60" height="50" rx="8" fill="#e6cfa6" stroke="${INK}" stroke-width="3"/>${[0,1,2,3].map(k => `<circle cx="${68 + (k % 2) * 34}" cy="${24 + Math.floor(k / 2) * 22}" r="4" fill="${INK}" opacity=".5"/>`).join('')}</svg>`;
  const glow = box(lb, 300, 70, 140, 220, { zIndex: 3, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,107,122,.55), rgba(255,107,122,0))' });
  const seg = chip(c, 380, 1180, 'SEGÚN CONTÓ', { size: 50, bg: PINK, z: 10 });
}

/* ======================================================================
   N1 · «¿Y DESPUÉS?» — negro de 0,2 s y la pregunta
   ====================================================================== */
{
  const c = scene(S.N1[0], S.N1[1], t => {
    const on = t > S.N1[0] + 0.2;
    bgN.style.opacity = on ? 1 : 0;
    set(q1, { s: on ? pop(t, S.N1[0] + 0.2, 0.3) : 0, r: -3, o: on ? 1 : 0 });
    set(q2, { s: on ? pop(t, Math.max(S.N1[0] + 0.25, K.despues - 0.05), 0.3) : 0, r: 2, o: on ? 1 : 0 });
    set(qm, { s: on ? pop(t, S.N1[0] + 0.3, 0.3) : 0, r: 10 + Math.sin(t * 6) * 10, o: on ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#000' });
  const bgN = box(c, 0, 0, 1080, 1920, { background: `radial-gradient(circle at 50% 45%, ${NIGHT2}, #0c121b 80%)`, zIndex: 1 });
  const q1 = BIGT(c, 0, 560, 1080, '¿Y', { fontSize: '200px', color: '#FBF6EA', textShadow: OUTL(INK, 10), zIndex: 10 });
  const q2 = BIGT(c, 0, 770, 1080, 'DESPUÉS?', { fontSize: '170px', color: YEL, textShadow: OUTL(INK, 10), zIndex: 10 });
  const qm = qMark(c, 760, 380, 200, PINK);
}

/* ======================================================================
   N2 · «VOLVIÓ AL MAR.» — Violet otra vez en cubierta + SELLO ROJO
   ====================================================================== */
{
  const c = scene(S.N2[0], S.N2[1], t => {
    set(cam, { s: 1.04 + 0.05 * p(t, S.N2[0], 1.7, E.linear) });
    set(vio.d, { s: pop(t, S.N2[0], 0.4), y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1.5), o: 1 });
    face(vio, t, { look: [6, -3], bL: 6, bR: 10, seed: 11.2 });
    set(wt, { x: -(((t - S.N2[0]) * 40) % 60) });
    stampA(stV, t, K.mar - 0.12, -8, 1);
    set(gull, { x: (t - S.N2[0]) * 140, y: Math.sin(t * 6) * 14 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #9cc3d6 0%, #d7e6e6 50%, #EFE1C6 100%)' });
  const wt = box(cam, 0, 0, 1140, 1920, { zIndex: 1 }); wt.innerHTML = waterSvg(860, 600, 41, LAGOON, INK, 1140);
  const gull = el('div', cam, { left: '120px', top: '440px', zIndex: 2 }, `<svg width="90" height="40" style="overflow:visible"><path d="M0,20 q22,-24 45,0 q22,-24 45,0" stroke="${INK}" stroke-width="6" fill="none"/></svg>`);
  const vio = mkViolet(cam, [300, 540, 480, 614]); vio.d.style.zIndex = 4;
  box(cam, 0, 0, 1080, 1920, { zIndex: 5 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1000" width="1080" height="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 18 }, (_, k) => `<path d="M${30 + k * 60},1020 V1150" stroke="#fff" stroke-width="10"/><path d="M${30 + k * 60},1020 V1150" stroke="${INK}" stroke-width="2.5" fill="none"/>`).join('')}<rect x="0" y="1150" width="1080" height="200" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="1150" width="1080" height="200" fill="url(#hW)" opacity=".35"/><g transform="translate(160,1060)"><circle r="70" fill="none" stroke="#fff" stroke-width="34"/><circle r="70" fill="none" stroke="${RED}" stroke-width="34" stroke-dasharray="36 36"/><circle r="88" fill="none" stroke="${INK}" stroke-width="4"/><circle r="52" fill="none" stroke="${INK}" stroke-width="4"/></g></svg>`;
  const stV = stamp(cam, 250, 250, 'VOLVIÓ<br>AL MAR', { size: 124, bw: 14, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' }); stV.style.textAlign = 'center';
}

/* ======================================================================
   N3 · «DIO LA VUELTA AL MUNDO… EN BARCO.» — globo con un barquito; en «barco» se para
   ====================================================================== */
headline(S.N3[0], K.en134 - 0.06, 'Dio *la vuelta al mundo*', { size: 96, hlT: K.vuelta });
headline(K.en134 - 0.06, S.N3[1], '… *en barco*', { size: 150, hlT: K.barco });
{
  const GC = [540, 860];
  const c = scene(S.N3[0], S.N3[1], t => {
    set(ry, { r: t * 8 });
    const ph = (Math.min(t, K.barco) - S.N3[0]) * 1.4;
    gl.innerHTML = svgW(globeInner(ph), '0 0 400 400');
    set(gl, { s: pop(t, S.N3[0], 0.4), o: 1 });
    // el barquito da vueltas (elipse) y en «barco» se para delante
    const tS = Math.min(t, K.barco - 0.05);
    const a = Math.PI / 2 + (tS - K.barco + 0.05) * 3.2;
    const sx = GC[0] + Math.cos(a) * 340, sy = GC[1] + Math.sin(a) * 140;
    const front = Math.sin(a) > -0.15;
    sh.style.zIndex = front ? 8 : 2;
    const kst = p(t, K.barco - 0.05, 0.35, E.outBack);
    set(sh, { x: sx - 100, y: sy - 50 + Math.sin(t * 5) * 4 * (1 - kst), s: (front ? 1 : 0.7) * (1 + 0.5 * kst), r: Math.cos(a) * -8 * (1 - kst) });
    set(trail, { o: t < K.barco ? 1 : 1 - p(t, K.barco, 0.3), r: 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DFC6' });
  const ry = rays(c, -160, 160, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const trail = box(c, GC[0] - 340, GC[1] - 140, 680, 280, { zIndex: 1, borderRadius: '50%', border: `5px dashed ${INK}`, opacity: 0.6 });
  const gl = box(c, GC[0] - 260, GC[1] - 260, 520, 520, { zIndex: 5 });
  const sh = box(c, 0, 0, 200, 67, { zIndex: 8 }); sh.innerHTML = shipSvg({});
}

/* ======================================================================
   O · «TRES BARCOS LO INTENTARON. NINGUNO PUDO.» — las cartas otra vez; se dan la vuelta
   ====================================================================== */
headline(S.O1[0], S.O1[1], 'Tres barcos *lo intentaron*', { size: 92, hlT: K.intentaron, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(S.O2[0], S.O2[1], '*Ninguno* pudo.', { size: 136, hlT: K.ninguno, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.O1[0], S.O2[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.O1[0], 3, E.linear) });
    CC.forEach((cc, i) => {
      const ki = p(t, S.O1[0] + i * 0.08, 0.35, E.outBack);
      const kf = p(t, K.ninguno + i * 0.2, 0.4, E.inOutCubic);
      const sx = flipCard(cc, kf);
      set(cc.d, { y: (1 - ki) * 900, sx, r: wobble(t, 0.4, 0.8, i) + (i - 1) * 3, s: 1 + (t > K.pudo ? 0.05 * p(t, K.pudo, 0.3, E.outBack) : 0) });
      cc.glow.style.opacity = t > K.pudo ? 0.7 : 0;
    });
    set(TL.d, { s: pop(t, S.O1[0] + 0.1, 0.3), o: 1 });
    tallyA(TL, t, [K.tres136, K.barcos, K.intentaron]);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  rays(cam, -160, 120, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const CC = [mkCard(cam, CX3[0], CY3, 1, 'OLYMPIC', '1911', { w: CW }), mkCard(cam, CX3[1], CY3, 2, 'TITANIC', '1912', { w: CW, z: 12 }), mkCard(cam, CX3[2], CY3, 3, 'BRITANNIC', '1916', { w: CW, hospital: true })];
  const TL = mkTally(cam, 342, 1000, 110, 40);
}

/* ======================================================================
   O3 · «MURIÓ A LOS OCHENTA Y TRES, EN TIERRA FIRME.» — casita, huerto, gallinas… y el emú
   ====================================================================== */
headline(S.O3[0], K.en148 - 0.06, 'Murió *a los 83*…', { size: 116, hlT: K.ochenta });
headline(K.en148 - 0.06, S.O3[1], '… *en tierra firme*', { size: 120, hlT: K.tierra });
const T_EMU = K.firme + 0.02;
{
  const c = scene(S.O3[0], S.O3[1], t => {
    set(cam, { s: lerp(1.12, 1, p(t, S.O3[0], 1.2, E.outCubic)) });
    HEN.forEach((h, i) => { const pk = Math.max(0, Math.sin(t * 5 + i * 1.7)); set(h, { r: pk * 18 * (i % 2 ? 1 : -1), y: pk * 10, x: Math.sin(t * 0.8 + i) * 20 }); });
    stampA(stT, t, K.tierra - 0.05, -6, 1);
    // cameo del emú: asoma entre las gallinas y mira a cámara 0,6 s
    const ke = p(t, T_EMU - 0.15, 0.25, E.outBack) * (1 - p(t, T_EMU + 0.6, 0.2, E.inCubic));
    set(emu.d, { y: (1 - ke) * 380, r: -3 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: 0 });
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
    set(smk, { y: -((t * 30) % 60), o: 0.8 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#cfe0e4' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = cottageSvg();
  const smk = box(cam, 640, 280, 80, 80, { zIndex: 2, borderRadius: '50%', background: 'rgba(255,255,255,.7)', border: `3px solid ${INK}` });
  const emuW = box(cam, 620, 500, 300, 390, { overflow: 'hidden', zIndex: 3 });
  const emu = mkEmuF(emuW, [10, 20, 280, 420]);
  const HEN = [[120, 1000, 0], [300, 1080, 1], [520, 1010, 0], [700, 1100, 1], [430, 1180, 1]].map(([x, y, f]) => { const h = box(cam, x, y, 150, 140, { zIndex: 6 }); h.innerHTML = henSvg(f); return h; });
  const stT = stamp(cam, 190, 1190, 'EN TIERRA FIRME', { size: 70, bw: 11, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   P · CTA: «¿TÚ VOLVERÍAS A SUBIRTE A UNO? OS LEO.» — barco de papel que se mece
   ====================================================================== */
{
  const c = scene(S.P[0], S.P[1], t => {
    WD.forEach(w2 => set(w2.e, { s: pop(t, w2.t - 0.04, 0.3), o: t < w2.t - 0.04 ? 0 : 1 }));
    paint(vHL, t, K.volverias, 0.3);
    set(pb, { r: Math.sin(t * 2.2) * 7, y: Math.sin(t * 2.2 + 0.8) * 14 });
    set(wt, { x: -(((t - S.P[0]) * 40) % 60) });
    popA(ol, t, K.os - 0.03, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 240, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const wt = box(c, 0, 0, 1140, 1920, { zIndex: 2 }); wt.innerHTML = waterSvg(1040, 400, 51, LAGOON, INK, 1140);
  const pb = box(c, 270, 740, 540, 324, { zIndex: 3, transformOrigin: '270px 300px' }); pb.innerHTML = svgW(paperBoatInner(), '0 0 600 360');
  const l1 = el('div', c, { left: 0, top: '280px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '118px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = [];
  [['¿TÚ', l1, K.tu151], ['VOLVERÍAS', l1, K.volverias], ['A', l2, K.subirte - 0.08], ['SUBIR?', l2, K.subirte]].forEach(([s2, ln, tt], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 1) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('VOLVERÍAS', 'vhl', YEL); } else s.textContent = s2; ln.appendChild(s); WD.push({ e: s, t: tt }); });
  const vHL = c.querySelector('.vhl');
  const ol = chip(c, 560, 1130, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 430, 1120, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}
