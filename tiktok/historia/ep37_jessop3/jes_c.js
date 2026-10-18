/* Ep. 37 · L8–L11 (Ojo, «O sea», pregunta, balcón y libro) + balcón de la marca (L2) */

/* ======================================================================
   J1 · «¡OJO! ANTES DE ABANDONAR EL BARCO,» — cubierta inclinada y el sello OJO
   ====================================================================== */
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(dk, { r: -8 - 2 * p(t, S.J1[0], 1.8, E.linear) + Math.sin(t * 1.5) * 0.6 });
    stampA(oj, t, K.ojo - 0.04, -8, 1);
    PP.forEach((q, i) => { const ph = ((t - S.J1[0]) * 0.9 + i * 0.3) % 1; set(q, { x: -ph * 300, y: ph * 220, r: -ph * 60, o: 1 - ph }); });
    popA(lab, t, K.abandonar - 0.05, { r: 3 });
    set(vio.d, { x: -40 * p(t, K.abandonar, 0.6, E.inOutCubic), y: wobble(t, 0.5, 3) });
    face(vio, t, { look: [-6, 2], bL: 10, bR: 10, seed: 12.1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `linear-gradient(180deg, #cfe0e4 0%, #e9e2cf 100%)` });
  const dk = box(c, -200, 0, 1480, 1920, { zIndex: 2, transformOrigin: '740px 1000px' });
  dk.innerHTML = `<svg width="1480" height="1920" style="overflow:visible"><rect x="0" y="1060" width="1480" height="900" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="1060" width="1480" height="900" fill="url(#hW)" opacity=".35"/>${Array.from({ length: 14 }, (_, k) => `<path d="M${k * 110},1060 L${k * 110 - 60},1960" stroke="${INK}" stroke-width="3" opacity=".5"/>`).join('')}<rect x="0" y="1000" width="1480" height="16" fill="#fff" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 25 }, (_, k) => `<path d="M${k * 60},1016 V1060" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`;
  const vio = mkViolet(c, [300, 600, 480, 614], { nurse: true }); vio.d.style.zIndex = 4;
  const PP = [0, 1, 2].map(i => { const q = box(c, 700 + i * 60, 760 + i * 80, 110, 80, { zIndex: 3, background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '8px' }); return q; });
  const oj = stamp(c, 230, 330, '¡OJO!', { size: 190, bw: 18, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const lab = chip(c, 140, 1200, 'antes de abandonar el barco', { size: 52, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   J2 · «…VOLVIÓ A SU CAMAROTE» — pasillo inclinado, la puerta del fondo se abre
   ====================================================================== */
headline(S.J2[0], S.J2[1], 'volvió *a su camarote*', { size: 88, hlT: K.camarote, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.J2[0], S.J2[1], t => {
    set(cor, { r: 9 + Math.sin(t * 1.5) * 1, s: 1 + 0.25 * p(t, S.J2[0], S.J2[1] - S.J2[0], E.inCubic) });
    const kd = p(t, K.camarote - 0.05, 0.4, E.outCubic);
    set(door, { sx: lerp(1, 0.12, kd) });
    lite.style.opacity = kd;
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2a1e' });
  const cor = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 820px' }); cor.innerHTML = corridorSvg();
  const lite = box(cor, 390, 610, 300, 420, { background: 'radial-gradient(circle at 50% 50%, #FFF3A8, #FFE600 60%, #d9a44a)', zIndex: 3 });
  const door = box(cor, 390, 610, 300, 420, { zIndex: 4, transformOrigin: '0px 210px', background: WOOD, border: `6px solid ${INK}`, boxSizing: 'border-box' });
  door.innerHTML = `<div style="position:absolute;left:30px;top:30px;width:228px;height:150px;border:4px solid ${INK}"></div><div style="position:absolute;left:30px;top:210px;width:228px;height:160px;border:4px solid ${INK}"></div><div style="position:absolute;left:236px;top:196px;width:22px;height:22px;border-radius:50%;background:${BRASS};border:3px solid ${INK}"></div>`;
}

/* ======================================================================
   J3 · «A POR UNA COSA:» — una mano rebusca en el cajón; «?»
   ====================================================================== */
headline(S.J3[0], S.J3[1], 'a por *una cosa*…', { size: 120, hlT: K.cosa });
{
  const c = scene(S.J3[0], S.J3[1], t => {
    set(dr, { y: (1 - p(t, S.J3[0], 0.3, E.outBack)) * 500, r: -2 });
    set(hd, { x: Math.sin(t * 14) * 60, y: Math.cos(t * 11) * 20 });
    IT.forEach((it, i) => set(it, { y: -Math.abs(Math.sin(t * 9 + i * 2)) * 40, r: Math.sin(t * 7 + i) * 20 }));
    set(q, { s: pop(t, K.cosa, 0.3), r: 10 + Math.sin(t * 6) * 10, o: t < K.cosa ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const dr = box(c, 160, 660, 760, 420, { zIndex: 3 }); dr.innerHTML = svgW(drawerInner(), '0 0 760 420');
  const IT = [[300, 660, '🧦'], [640, 670, '✉️'], [480, 640, '🧷']].map(([x, y, e]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', zIndex: 4 }, e));
  const hd = box(c, 440, 580, 220, 220, { zIndex: 5 }); hd.innerHTML = `<svg viewBox="-80 -80 160 160" width="220" height="220" style="overflow:visible">${gloveHand(0, 0, 180, 1.6)}</svg>`;
  const q = qMark(c, 760, 450, 190, PINK);
}

/* ======================================================================
   J4 · «SU CEPILLO DE DIENTES.» — el cepillo gigante, como un tesoro
   ====================================================================== */
headline(S.J4[0], S.J4[1], 'su *cepillo de dientes*', { size: 100, hlT: K.cepillo, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.J4[0], S.J4[1], t => {
    set(ry, { r: t * 20 });
    const kb = p(t, K.cepillo - 0.08, 0.5, E.outBackBig || E.outBack);
    set(br, { s: t < K.cepillo - 0.08 ? 0 : kb, r: -12 + wobble(t, 0.5, 2), y: wobble(t, 0.6, 6), o: t < K.cepillo - 0.08 ? 0 : 1 });
    set(gl, { s: 0.6 + 0.4 * p(t, K.cepillo, 0.4) + 0.05 * Math.sin(t * 8), o: t > K.cepillo - 0.08 ? 1 : 0 });
    SP.forEach((s2, i) => set(s2, { o: t > K.cepillo ? 0.5 + 0.5 * Math.sin(t * 8 + i * 1.3) : 0, s: 1 + 0.3 * Math.sin(t * 6 + i), r: t * 120 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2b2118' });
  const ry = rays(c, -160, 160, 1400, 28, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 1);
  const gl = box(c, 140, 540, 800, 640, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,230,0,.75), rgba(255,230,0,0))' });
  const br = box(c, 150, 780, 780, 171, { zIndex: 5 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const SP = [[200, 660], [820, 660], [300, 1080], [760, 1100], [540, 580]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
}

/* ======================================================================
   J5 · GOLPE ROSA: «ERA LO QUE MÁS HABÍA ECHADO DE MENOS DESPUÉS DEL TITANIC.»
   ====================================================================== */
colorHit(S.J5[0], S.J5[1], PINK, c => {
  const l1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '92px', color: INK, zIndex: 10 }, 'Lo que más');
  const big = el('div', c, { left: 0, top: '360px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '98px', lineHeight: '120px', color: '#fff', textShadow: OUTL(INK, 8), zIndex: 12, whiteSpace: 'nowrap' }, 'ECHÓ DE MENOS');
  const l3 = el('div', c, { left: 0, top: '1160px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, zIndex: 10 }, 'después del Titanic');
  const cd = mkCard(c, 160, 600, 2, 'TITANIC', '1912', { w: 300, z: 5 });
  const br = box(c, 440, 760, 480, 105, { zIndex: 7 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const ht = el('div', c, { left: '700px', top: '590px', fontSize: '120px', zIndex: 8, color: RED, textShadow: `4px 4px 0 ${INK}` }, '♥');
  return t => {
    popA(l1, t, K.era8 - 0.03, { rise: 30 });
    const kb = p(t, K.echado - 0.06, 0.2, E.outBack);
    set(big, { s: t < K.echado - 0.06 ? 0 : lerp(1.6, 1, kb), r: -2, o: t < K.echado - 0.06 ? 0 : 1 });
    set(br, { s: pop(t, S.J5[0] + 0.1, 0.35), r: -14 + wobble(t, 0.5, 2), o: 1 });
    set(ht, { s: pop(t, K.menos, 0.3) * (1 + 0.12 * Math.sin(t * 9)), o: t < K.menos ? 0 : 1 });
    set(cd.d, { s: pop(t, K.despues - 0.05, 0.35), r: -6 + wobble(t, 0.5, 1.5), o: t < K.despues - 0.05 ? 0 : 1 });
    popA(l3, t, K.despues - 0.03, { rise: 30 });
  };
});

/* ======================================================================
   R1 · «O SEA: TRES NAUFRAGIOS…» — las tres cartas, cada una con su sello; «3» gigante
   ====================================================================== */
{
  const c = scene(S.R1[0], S.R1[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.R1[0], 3, E.linear) });
    CC.forEach((cc, i) => {
      const ki = p(t, S.R1[0] + i * 0.08, 0.35, E.outBack);
      set(cc.d, { y: (1 - ki) * 900, r: wobble(t, 0.4, 0.8, i) + (i - 1) * 3 });
      stampA(STP[i], t, TS[i], [-12, 8, -6][i], 1);
    });
    const kb = p(t, K.tres9 - 0.05, 0.22, E.outBack);
    set(big, { s: t < K.tres9 - 0.05 ? 0 : lerp(1.8, 1, kb), r: -4, o: t < K.tres9 - 0.05 ? 0 : 1 });
    popA(lab, t, K.naufragios - 0.05, { r: 2 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  rays(cam, -160, 120, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const CC = [mkCard(cam, CX3[0], 700, 1, 'OLYMPIC', '1911', { w: CW }), mkCard(cam, CX3[1], 700, 2, 'TITANIC', '1912', { w: CW, z: 12 }), mkCard(cam, CX3[2], 700, 3, 'BRITANNIC', '1916', { w: CW, hospital: true })];
  const TS = [K.naufragios + 0.1, K.naufragios + 0.4, K.naufragios + 0.7];
  const STP = CX3.map((x, i) => { const s = stamp(cam, x + 10, 860, 'SALIÓ<br>VIVA', { size: 52, bw: 9, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' }); s.style.textAlign = 'center'; return s; });
  const big = BIGT(cam, 0, 240, 1080, `<span style="color:${YEL}">3</span>`, { fontSize: '330px', textShadow: OUTL(INK, 12), zIndex: 30 });
  const lab = chip(cam, 260, 1110, '3 ACCIDENTES', { size: 72, bg: RED, color: '#fff', z: 30 });
}

/* ======================================================================
   R2 · «…Y SIGUIÓ TRABAJANDO EN BARCOS» — Violet con la bandeja otra vez, en cubierta
   ====================================================================== */
headline(S.R2[0], S.R2[1], 'y siguió trabajando *en el mar*', { size: 88, hlT: K.barcos9 });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    set(cam, { s: 1.04 + 0.05 * p(t, S.R2[0], 1.6, E.linear) });
    set(shp, { x: -((t - S.R2[0]) * 70), y: Math.sin(t * 2) * 4 });
    set(wt, { x: -(((t - S.R2[0]) * 40) % 60) });
    set(vio.d, { s: pop(t, S.R2[0] + 0.05, 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [-5, -2], bL: 4, bR: 12, seed: 13.7 });
    set(tray, { r: -4 + Math.sin(t * 3) * 3 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #f2c6a8 0%, #f7e0c0 50%, #EFE1C6 100%)' });
  const shp = box(cam, 140, 600, 900, 300, { zIndex: 1 }); shp.innerHTML = shipSvg({ funnels: [300, 460] });
  const wt = box(cam, 0, 0, 1140, 1920, { zIndex: 2 }); wt.innerHTML = waterSvg(840, 600, 47, LAGOON, INK, 1140);
  const vio = mkViolet(cam, [480, 640, 470, 601]); vio.d.style.zIndex = 4;
  const tray = box(cam, 420, 940, 300, 160, { zIndex: 6 });
  tray.innerHTML = `<svg viewBox="0 0 300 160" width="300" height="160" style="overflow:visible">${cut('<ellipse cx="150" cy="120" rx="140" ry="30"/>', 5, 6)}<ellipse cx="150" cy="120" rx="140" ry="30" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M80,110 L86,64 L134,64 L140,110 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M140,74 q22,4 4,26" stroke="${INK}" stroke-width="4" fill="none"/><path d="M176,112 L186,40 L214,40 L224,112 Z" fill="#cfe6f0" stroke="${INK}" stroke-width="4"/></svg>`;
  box(cam, 0, 0, 1080, 1920, { zIndex: 5 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1080" width="1080" height="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 18 }, (_, k) => `<path d="M${30 + k * 60},1100 V1220" stroke="#fff" stroke-width="10"/><path d="M${30 + k * 60},1100 V1220" stroke="${INK}" stroke-width="2.5" fill="none"/>`).join('')}<rect x="0" y="1220" width="1080" height="160" fill="${WOOD}" stroke="${INK}" stroke-width="5"/></svg>`;
}

/* ======================================================================
   R3 · «CASI CUARENTA AÑOS MÁS.» — hojas de calendario que vuelan + la cifra, directa
   ====================================================================== */
{
  const c = scene(S.R3[0], S.R3[1], t => {
    set(ry, { r: t * 12 });
    PG.forEach((q, i) => { const ph = ((t - S.R3[0]) * 1.3 + i * 0.17) % 1; set(q, { x: Math.sin(i * 2.3) * 420 * ph, y: -ph * 900 + 300, r: ph * 300 * (i % 2 ? 1 : -1), o: 1 - ph }); });
    popA(cs, t, K.casi - 0.05, { r: -4 });
    const kb = p(t, K.cuarenta - 0.05, 0.22, E.outBack);
    set(n40, { s: t < K.cuarenta - 0.05 ? 0 : lerp(1.8, 1, kb), r: -3, o: t < K.cuarenta - 0.05 ? 0 : 1 });
    popA(am, t, K.anos - 0.05, { r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2b2118' });
  const ry = rays(c, -160, 260, 1400, 26, 'rgba(255,230,0,.2)', 'rgba(0,0,0,0)', 0);
  const PG = Array.from({ length: 9 }, (_, i) => box(c, 470, 800, 140, 160, { zIndex: 2, background: '#FBF6EA', border: `5px solid ${INK}`, borderTop: `26px solid ${RED}`, borderRadius: '8px' }));
  const cs = BIGT(c, 0, 470, 1080, 'más de', { fontSize: '110px', fontStyle: 'italic', color: '#FBF6EA', textShadow: OUTL(INK, 7), zIndex: 10 });
  const n40 = BIGT(c, 0, 590, 1080, '30', { fontSize: '380px', color: YEL, textShadow: OUTL(INK, 12), zIndex: 10 });
  const am = BIGT(c, 0, 980, 1080, 'AÑOS', { fontSize: '120px', color: '#FBF6EA', textShadow: OUTL(INK, 8), zIndex: 10 });
}

/* ======================================================================
   R4 · «LA LLAMABAN “MISS INSUMERGIBLE”.» — retrato con banda de miss + sello; cameo del emú
   ====================================================================== */
const T_EMU = K.insumergible + 0.55;
{
  const c = scene(S.R4[0], S.R4[1], t => {
    set(ry, { r: t * 8 });
    set(cam, { s: 1 + 0.06 * p(t, S.R4[0], 3.2, E.linear) });
    set(frm, { s: pop(t, S.R4[0], 0.4), r: -2 + wobble(t, 0.4, 0.8), o: 1 });
    face(vio, t, { look: [3, -3], bL: t > K.insumergible ? 14 : 6, bR: t > K.insumergible ? 14 : 6, seed: 14.2 });
    popA(ll, t, K.llamaban - 0.05, { r: -3 });
    const ks = p(t, K.miss - 0.05, 0.4, E.outCubic);
    sash.style.clipPath = `inset(0 ${f1((1 - ks) * 100)}% 0 0)`;
    stampA(stM, t, K.insumergible - 0.04, -6, 1);
    SP.forEach((s2, i) => set(s2, { o: t > K.insumergible ? 0.5 + 0.5 * Math.sin(t * 8 + i * 1.3) : 0, r: t * 120 }));
    // cameo del emú: asoma por abajo a la izquierda y mira a cámara 0,6 s
    const ke = p(t, T_EMU - 0.15, 0.25, E.outBack) * (1 - p(t, T_EMU + 0.6, 0.2, E.inCubic));
    set(emu.d, { y: (1 - ke) * 380, r: -3 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: 0 });
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#F1D9D2' });
  const ry = rays(cam, -160, 160, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const ll = chip(cam, 300, 250, 'La llamaban…', { size: 60, bg: INK, color: YEL, z: 30 });
  const frm = box(cam, 220, 380, 640, 700, { zIndex: 5, background: '#FBF6EA', border: `10px solid ${BRASS}`, borderRadius: '50% / 46%', boxShadow: `0 0 0 8px ${INK}, 14px 16px 0 8px ${SH}`, overflow: 'hidden' });
  const vio = mkViolet(frm, [70, 90, 500, 639]);
  const sash = box(frm, -40, 420, 720, 120, { zIndex: 4 }); sash.innerHTML = `<svg width="720" height="120" style="overflow:visible"><path d="M0,40 L720,0 L720,80 L0,120 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><text x="360" y="84" text-anchor="middle" font-family="Rye" font-size="46" fill="#fff" stroke="${INK}" stroke-width="2" paint-order="stroke" transform="rotate(-3 360 60)">MISS</text></svg>`;
  const stM = stamp(cam, 170, 1110, 'INSUMERGIBLE', { size: 78, bw: 12, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const SP = [[180, 420], [860, 480], [820, 960]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
  const emuW = box(cam, 0, 700, 230, 330, { overflow: 'hidden', zIndex: 4 });
  const emu = mkEmuF(emuW, [0, 10, 220, 330]);
}

/* ======================================================================
   CTA · «¿TÚ TE HABRÍAS VUELTO A SUBIR A UN BARCO? OS LEO.» — barquito de papel que se mece
   ====================================================================== */
{
  const c = scene(S.CTA[0], S.CTA[1], t => {
    WD.forEach(w2 => set(w2.e, { s: pop(t, w2.t - 0.04, 0.3), o: t < w2.t - 0.04 ? 0 : 1 }));
    paint(vHL, t, K.vuelto, 0.3);
    set(pb, { r: Math.sin(t * 2.2) * 7, y: Math.sin(t * 2.2 + 0.8) * 14 });
    set(wt, { x: -(((t - S.CTA[0]) * 40) % 60) });
    popA(ol, t, K.os - 0.03, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 240, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const wt = box(c, 0, 0, 1140, 1920, { zIndex: 2 }); wt.innerHTML = waterSvg(1060, 400, 51, LAGOON, INK, 1140);
  const pb = box(c, 300, 780, 520, 312, { zIndex: 3, transformOrigin: '260px 290px' }); pb.innerHTML = svgW(paperBoatInner(), '0 0 600 360');
  const mkL = (y, sz) => el('div', c, { left: 0, top: px(y), width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l1 = mkL(250, 104), l2 = mkL(372, 112), l3 = mkL(500, 104);
  const WD = [];
  [['¿TÚ', l1, K.tu10], ['TE', l1, K.te10], ['HABRÍAS', l1, K.habrias], ['VUELTO', l2, K.vuelto], ['A SUBIR', l2, K.a10], ['A UN', l3, K.a10 + 0.25], ['BARCO?', l3, K.barco10]].forEach(([s2, ln, tt]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.15em'; if (s2 === 'VUELTO') { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('VUELTO', 'vhl', YEL); } else s.textContent = s2; ln.appendChild(s); WD.push({ e: s, t: tt }); });
  const vHL = c.querySelector('.vhl');
  const ol = chip(c, 520, 1150, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 400, 1140, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BALCÓN del Vecino (marca): L2 completa y L11 «Y esto…»
   ====================================================================== */
function balcony(T0, T1, rows, o = {}) {
  const c = scene(T0, T1, t => {
    const punch = o.punch != null && t > o.punch ? 1 : 0;
    set(cam, { s: (punch ? 1.16 : 1.04) + 0.04 * p(t, T0, T1 - T0, E.linear), y: punch ? 60 : 0 });
    const lean = o.lean != null ? p(t, o.lean - 0.3, 0.4, E.inOutCubic) : 0;
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: lean ? [-4, 3] : [0, 0], bL: fanFast ? 8 : lean ? 6 : 0, bR: fanFast ? 8 : lean ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    if (tag) popA(tag, t, o.tagT, { r: -5 });
    const ks = p(t, T0 + 0.02, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, T0, 2)) + (1 - ks) * 8, o: 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    if (sHL) paint(sHL, t, o.hlT, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 700px' });
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
  const vec = mkVec(cam, [190, 470, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040], [760, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = o.tagT != null ? chip(cam, 640, 640, 'tu vecino', { size: 44, bg: PINK }) : null;
  const SH_ = 60 + rows.length * 96;
  const sign = box(cam, 100, 150, 880, SH_ + 30, { zIndex: 40 });
  sign.innerHTML = `<svg width="880" height="${SH_ + 30}" style="position:absolute;left:0;top:0;overflow:visible"><path d="M170,0 L210,40 M710,0 L670,40" stroke="${INK}" stroke-width="5"/>${cut(`<rect x="20" y="40" width="840" height="${SH_ - 10}" rx="22"/>`)}<rect x="20" y="40" width="840" height="${SH_ - 10}" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="808" height="${SH_ - 42}" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sw = []; let sHL = null;
  rows.forEach((row, r) => {
    const ln = el('div', sign, { left: '0', top: px(64 + r * 96), width: '880px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: r === 0 ? 'italic' : 'normal', fontWeight: r === 0 ? 800 : 900, fontSize: r === 0 ? '78px' : '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
    row.forEach(([wd, ti, hl]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = hl ? hlSpan(wd, 'shl') : wd; ln.appendChild(s); sw.push({ e: s, t: ti }); });
  });
  sHL = sign.querySelector('.shl');
  return c;
}
{ // L2 · «Soy tu vecino, y esto no venía en el libro.»
  const a = K.isoy, b = K.iye;
  balcony(S.BAL[0], S.BAL[1], [
    [['Soy', ws(a)], ['tu', ws(a + 1)], ['vecino,', ws(a + 2), true]],
    [['y', ws(b)], ['esto', ws(b + 1)], ['no', ws(b + 2)], ['venía', ws(b + 3)]],
    [['en', ws(b + 4)], ['el', ws(b + 5)], ['libro.', ws(b + 6)]],
  ], { punch: K.yesto2 - 0.04, lean: K.esto2, tagT: K.vecino, hlT: K.vecino });
}
{ // L11 · «Y esto…»
  const b = K.i11;
  balcony(S.BAL2[0], S.BAL2[1], [[['Y', ws(b)], ['esto…', ws(b + 1), true]]], { lean: K.esto11, hlT: K.esto11 + 0.1 });
}

/* ======================================================================
   BK · «…NO VENÍA EN EL LIBRO.» — el libro HISTORIA se cierra (centrado) con «Ep. N · título»
   ====================================================================== */
headline(S.BK[0], LOOP, '…no venía en el *libro.*', { size: 96, hlT: K.libro, y: 200 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // abierto, el libro está centrado; cerrado solo ocupa la mitad derecha: se desplaza para quedar centrado
    set(bookW, { x: 210 * 1.15 * p(t, TC + 0.15, 0.25, E.outCubic), s: 1.15 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EADFC8' }); box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.25), rgba(255,230,0,0) 60%)' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 915px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${820 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">VIOLET</text><text x="335" y="775" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">Miss Insumergible</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '310px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1270px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:44px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">${EP_TAG}</span>`);
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 270, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
