/* Ep. 30 · escenas L5–L11 (todo clavado por texto vía K) */

/* ======================================================================
   F1 · «CUANDO NACIÓ EL DÓLAR…» — la cuna del «bebé dólar» + sello 1792
   ====================================================================== */
headline(S.F1[0], K.cuando - 0.05, 'Y lo *mejor*…', { size: 120, hlT: K.mejor + 0.05, y: 210 });
headline(K.cuando - 0.05, S.F1[1], 'Cuando *nació* el dólar…', { size: 84, hlT: K.nacio, y: 220 });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const k = p(t, S.F1[0], 0.3, E.outBack);
    set(cr, { y: (1 - k) * 700, r: Math.sin(t * 3) * 2 });
    set(bb, { y: Math.sin(t * 3) * 6 - 8 * p(t, K.nacio, 0.2, E.outBack), r: Math.sin(t * 3) * 3 });
    const awake = t > K.nacio;
    fc.querySelector('.eyesO').style.opacity = awake ? 1 : 0; fc.querySelector('.eyesC').style.opacity = awake ? 0 : 1;
    stampA(st, t, K.nacio + 0.02, -8, 1);
    ZZ.forEach((z, i) => set(z, { y: -((t * 60 + i * 40) % 120), o: awake ? 0 : 0.9 }));
    set(bub, { s: pop(t, K.dolar5, 0.25), r: 4, o: t < K.dolar5 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#DCE6EA', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 30px, transparent 30px 60px)' });
  const cr = box(c, 0, 0, 1080, 1920, { zIndex: 4 });
  const crib = box(cr, 240, 760, 600, 420, { zIndex: 4 }); crib.innerHTML = `<svg viewBox="0 0 600 420" width="100%" height="100%" style="overflow:visible">${cribSvg()}</svg>`;
  const bb = box(cr, 380, 600, 320, 320, { zIndex: 3 }); bb.innerHTML = dollarCoinSvg({ noSign: true });
  const fc = box(bb, 0, 0, 320, 320, { zIndex: 2 }); fc.innerHTML = coinFaceSvg();
  // la cara tapa el «$» de la moneda: lo dejamos pequeño arriba
  const ZZ = ['z', 'Z', 'z'].map((s, i) => el('div', cr, { left: px(700 + i * 40), top: px(560 - i * 40), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(50 + i * 12), color: INK, zIndex: 6 }, s));
  const st = stamp(c, 330, 450, '1792', { size: 150, bw: 16, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const bub = bubble(c, 640, 600, '¡buá!', { size: 54, it: true, tail: 'bl', z: 41, pad: '4px 26px 10px', bg: '#FFF3A8' });
}

/* ======================================================================
   F2 · «…AMERICANO, LO COPIARON DEL PESO» — balanza: el peso y su copia
   ====================================================================== */
headline(S.F2[0], S.F2[1], 'lo *copiaron* del peso', { size: 100, hlT: K.copiaron, y: 210 });
{
  const c = scene(S.F2[0], S.F2[1], t => {
    const kin = p(t, S.F2[0], 0.35, E.outBack);
    set(bal, { s: 0.9 + 0.1 * kin, o: 1 });
    // primero cae el peso (la balanza se inclina); en «copiaron» aparece la copia y se equilibra
    const tilt = 9 * p(t, S.F2[0] + 0.1, 0.3, E.outBack) * (1 - p(t, K.copiaron + 0.15, 0.6, E.outElastic));
    beam.setAttribute('transform', `rotate(${f1(-tilt)} 450 141)`);
    // los platillos cuelgan siempre vertical: contrarrotación
    panL.setAttribute('transform', `rotate(${f1(tilt)} 150 141)`); panR.setAttribute('transform', `rotate(${f1(tilt)} 750 141)`);
    const a = -tilt * Math.PI / 180;
    const yL = 141 + Math.sin(a) * -300, yR = 141 + Math.sin(a) * 300;
    set(cL, { x: 0, y: (yL - 141) * BS + (1 - p(t, S.F2[0] + 0.05, 0.3, E.outBounce)) * -700, o: t < S.F2[0] + 0.05 ? 0 : 1 });
    const kc = p(t, K.copiaron - 0.1, 0.45, E.outCubic);
    set(cR, { x: lerp(-560, 0, kc) * 1, y: (yR - 141) * BS - Math.sin(kc * Math.PI) * 160, s: lerp(0.9, 1, kc), o: t < K.copiaron - 0.1 ? 0 : 1 });
    cR.style.filter = kc < 1 ? 'grayscale(1) opacity(.85)' : 'none';
    popA(lO, t, S.F2[0] + 0.3, { r: -4 }); popA(lC, t, K.copiaron + 0.3, { r: 4 });
    stampA(st, t, K.peso5 - 0.05, -7, 1);
    set(eq, { s: pop(t, K.copiaron + 0.55, 0.3), o: t < K.copiaron + 0.55 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const BS = 900 / 900; // escala de la balanza (px por unidad del viewBox)
  const bal = box(c, 90, 430, 900, 700, { zIndex: 4 }); bal.innerHTML = balanceSvg();
  const beam = bal.querySelector('.beam'), panL = bal.querySelector('.panL'), panR = bal.querySelector('.panR');
  const cL = box(c, 140, 650, 280, 280, { zIndex: 6 }); cL.innerHTML = pesoCoinSvg('Mº');
  const cR = box(c, 700, 650, 280, 280, { zIndex: 6 }); cR.innerHTML = dollarCoinSvg();
  const lO = chip(c, 130, 570, 'PESO · original', { size: 40, bg: INK, color: YEL, z: 30 });
  const lC = chip(c, 640, 570, 'DÓLAR · copia', { size: 40, bg: '#fff', color: INK, z: 30 });
  const eq = el('div', c, { left: '470px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: OUTL(INK, 6), zIndex: 31 }, '=');
  const st = stamp(c, 430, 1050, 'COPIA<br>DEL PESO', { size: 80, bw: 12, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   G1 · «Y ALLÍ SE PAGÓ CON PESOS, LEGALES» — el tendero de Nueva York muerde la moneda
   ====================================================================== */
headline(S.G1[0], S.G1[1], 'Se pagó *con pesos*', { size: 104, hlT: K.pesos6, y: 210 });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, S.G1[0], 2.4, E.linear) });
    set(sk.d, { s: pop(t, S.G1[0] + 0.05, 0.4), y: wobble(t, 0.5, 3), o: t < S.G1[0] + 0.05 ? 0 : 1 });
    const bite = t > K.pesos6 && t < K.legales + 0.1;
    face(sk, t, { look: [-4, 2], jaw: bite ? 0.3 + 0.3 * Math.abs(Math.sin(t * 16)) : 0, bL: 10, bR: 18, closed: bite, seed: 2 });
    // la moneda llega desde la mano del cliente y va a la boca
    const kc = p(t, K.pago - 0.15, 0.4, E.inOutCubic), kb = p(t, K.pesos6 - 0.12, 0.25, E.outCubic), kd = p(t, K.legales + 0.15, 0.3, E.inOutCubic);
    set(cn, { x: lerp(lerp(380, 0, kc), -30, kb) + lerp(0, 160, kd), y: lerp(lerp(200, 0, kc), -170, kb) + lerp(0, 170, kd) + (bite ? Math.sin(t * 40) * 3 : 0), r: kc * 20, s: 1, o: t < K.pago - 0.15 ? 0 : 1 });
    set(hand, { x: lerp(300, 0, kc) + 40 * kb, o: t < S.G1[0] ? 0 : 1 - kd });
    set(cr, { o: bite && t > K.pesos6 + 0.2 ? 1 : 0, s: 1 + 0.2 * Math.sin(t * 20) });
    stampA(st, t, K.legales, -8, 1);
    popA(chNY, t, S.G1[0] + 0.15, { r: -4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EADFC8' });
  const shop = box(cam, 0, -40, 1080, 1300, { zIndex: 1 }); shop.innerHTML = shopSvg();
  box(cam, 260, 1090, 760, 110, { zIndex: 6, background: WOOD, border: `5px solid ${INK}`, borderRadius: '8px' });
  const sk = mk(cam, [400, 600, 420, 537], shopkeeperInner(), '0 0 360 460', 'bust'); sk.d.style.zIndex = 4;
  const cn = box(cam, 560, 760, 120, 120, { zIndex: 8 }); cn.innerHTML = pesoCoinSvg('');
  const hand = box(cam, 640, 860, 200, 200, { zIndex: 7 }); hand.innerHTML = `<svg viewBox="-100 -100 200 200" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, -100, 1.3)}</svg>`;
  const cr = el('div', cam, { left: '660px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '60px', color: INK, zIndex: 9 }, '¡crac!');
  const chNY = chip(cam, 640, 1000, 'Nueva York', { size: 46, bg: PINK, z: 30 });
  const st = stamp(cam, 160, 420, 'LEGAL', { size: 140, bw: 16, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   G2 · «HASTA OCHENTA AÑOS DESPUÉS DE SU INDEPENDENCIA» — línea de tiempo 1776 → HASTA 1857 + campana agrietada
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'hasta *80 años* después', { size: 100, hlT: K.ochenta, y: 210 });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    const kl = p(t, S.G2[0] + 0.05, 0.9, E.inOutCubic);
    lnE.style.width = px(f1(720 * kl));
    popA(y0, t, S.G2[0] + 0.05, { r: -3 });
    stampA(st, t, K.ochenta - 0.02, -8, 1);
    set(brk, { o: t > K.ochenta + 0.15 ? 1 : 0, sx: p(t, K.ochenta + 0.15, 0.3, E.outCubic) });
    popA(b80, t, K.ochenta + 0.3, { r: 2 });
    CN.forEach((q, i) => { const k = ((t - S.G2[0]) * 0.7 + i / CN.length) % 1; set(q, { x: 720 * k, y: -Math.sin(k * Math.PI * 6) * 14, r: k * 720, o: t > S.G2[0] + 0.3 && kl > k ? 1 : 0 }); });
    // campana: entra en «independencia» y se agrieta
    const kb = p(t, K.indep - 0.2, 0.35, E.outBack);
    set(bell, { y: (1 - kb) * -800, r: Math.sin((t - K.indep) * 10) * 10 * (1 - p(t, K.indep + 0.3, 0.8)), o: t < K.indep - 0.2 ? 0 : 1 });
    crack.style.strokeDashoffset = f1(100 * (1 - p(t, K.indep + 0.25, 0.3)));
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const ln = box(c, 180, 1000, 720, 26, { zIndex: 4, background: 'rgba(43,33,24,.15)', borderRadius: '13px' });
  const lnE = box(ln, 0, 0, 0, 26, { background: INK, borderRadius: '13px' });
  const CN = [0, 1, 2].map(() => { const e = box(c, 160, 960, 60, 60, { zIndex: 5 }); e.innerHTML = pesoCoinSvg(''); return e; });
  box(c, 160, 984, 56, 56, { zIndex: 6, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}` }).style.top = '984px';
  const y0 = chip(c, 80, 1060, '1776 · independencia', { size: 38, bg: '#fff', color: INK, z: 20 });
  const brk = box(c, 200, 920, 680, 60, { zIndex: 5, transformOrigin: '0 30px' }); brk.innerHTML = `<svg width="680" height="60" style="overflow:visible"><path d="M4,56 V20 H676 V56" stroke="${PINK}" stroke-width="10" fill="none" stroke-linejoin="round"/></svg>`;
  const b80 = el('div', c, { left: '360px', top: '820px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', color: INK, background: YEL, border: `6px solid ${INK}`, borderRadius: '20px', padding: '0 24px 6px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 20 }, '+80 años');
  const st = stamp(c, 250, 1110, 'HASTA 1857', { size: 92, bw: 13, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const bell = box(c, 560, 430, 300, 340, { zIndex: 8 }); bell.innerHTML = `<svg viewBox="0 0 300 340" width="100%" height="100%" style="overflow:visible">${bellSvg()}</svg>`;
  const crack = bell.querySelector('.crack');
}

/* ======================================================================
   H1 · «OJO: LO DE LAS COLUMNAS DE HÉRCULES…» — las columnas con la banda en S
   ====================================================================== */
headline(S.H1[0], S.H1[1], 'columnas de *Hércules*', { size: 88, hlT: K.hercules, y: 220 });
{
  const c = scene(S.H1[0], S.H1[1], t => {
    stampA(ojo, t, K.ojo, -8, 1);
    const k = p(t, S.H1[0], 0.4, E.outBack);
    set(cl, { y: (1 - k) * 900, s: (0.9 + 0.1 * k) * (1 + 0.04 * p(t, K.columnas, 1.5, E.linear)), o: 1 });
    bandS.style.opacity = t > K.columnas - 0.1 ? 1 : 0.25;
    set(arr, { o: t > K.hercules ? 1 : 0, x: Math.sin(t * 8) * 8 });
    popA(sQ, t, K.hercules + 0.2, { r: -6 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ojo = stamp(c, 70, 360, '¡OJO!', { size: 110, bw: 13, z: 60, bg: YEL, blend: 'normal', col: INK });
  const cl = box(c, 240, 470, 600, 675, { zIndex: 4 }); cl.innerHTML = columnsSvg(); const bandS = cl.querySelector('.bandS');
  const arr = el('div', c, { left: '800px', top: '640px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 30 }, '←');
  const sQ = chip(c, 640, 840, '¿la S?', { size: 54, bg: PINK, z: 31 });
}

/* ======================================================================
   H2 · «…O LA U SOBRE LA S…» — la U cae sobre la S, no encaja… y el EMÚ se la lleva (cameo)
   ====================================================================== */
headline(S.H2[0], S.H2[1], 'o la *U* sobre la S…', { size: 104, hlT: K.U7, y: 230 });
const T_EMU = K.S7 + 0.1;
{
  const c = scene(S.H2[0], S.H2[1], t => {
    set(sB, { s: 0.5 + 0.5 * pop(t, S.H2[0], 0.3), r: -2, o: 1 });
    // la U cae en «U», rebota sobre la S y se ladea
    const ku = p(t, K.U7 - 0.1, 0.45, E.outBounce);
    const grab = p(t, T_EMU + 0.25, 0.5, E.inCubic);
    set(uB, { x: lerp(0, 700, grab), y: lerp(-1000, 0, ku) - grab * 200, r: (t > K.sobre7 ? 18 * p(t, K.sobre7, 0.3, E.outBack) : 0) + grab * 30, o: t < K.U7 - 0.1 ? 0 : 1 });
    // emú: asoma por la derecha, mira a cámara, pica la U y se la lleva
    const ke = p(t, K.sobre7 - 0.1, 0.3, E.outBack), kx = p(t, T_EMU + 0.25, 0.5, E.inCubic);
    set(emu.d, { x: (1 - ke) * 500 + kx * 600, r: -6 + Math.sin(t * 10) * 2 });
    face(emu, t, { look: t < T_EMU + 0.2 ? [0, 0] : [-6, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU && t < T_EMU + 0.3 ? 0.7 : 0 });
    set(eb, { s: pop(t, T_EMU, 0.25), r: 6, o: t < T_EMU || t > T_EMU + 0.8 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const sB = box(c, 330, 720, 420, 476, { zIndex: 5 }); sB.innerHTML = woodLetterSvg('S');
  const uB = box(c, 380, 430, 320, 362, { zIndex: 6 }); uB.innerHTML = woodLetterSvg('U', RED);
  const emu = mkEmuF(c, [480, 420, 520, 780]); emu.d.style.zIndex = 8;
  const eb = bubble(c, 520, 380, '¡mía!', { size: 60, it: true, tail: 'br', z: 55, pad: '4px 28px 10px', bg: '#FFF3A8' });
}

/* ======================================================================
   H3 · «…BONITO, PERO SIN PAPELES» — las dos teorías con el sello gris SIN PAPELES
   ====================================================================== */
headline(S.H3[0], S.H3[1], 'bonito, pero *sin papeles*', { size: 96, hlT: K.papeles, y: 220 });
{
  const c = scene(S.H3[0], S.H3[1], t => {
    set(cA, { s: pop(t, S.H3[0], 0.3), r: -4, o: 1 });
    set(cB, { s: pop(t, S.H3[0] + 0.1, 0.3), r: 4, o: 1 });
    set(hrt, { s: pop(t, K.bonito, 0.3) * (1 + 0.1 * Math.sin(t * 9)), o: t < K.bonito ? 0 : (t > K.sin ? 0.35 : 1) });
    stampA(st1, t, K.sin, -10, 1); stampA(st2, t, K.papeles, 8, 1);
    DOC.forEach((d, i) => set(d, { y: ((t - S.H3[0]) * 600 + i * 260) % 700 + 420, r: (t * 120 + i * 60) % 360, o: t > K.sin ? 0.9 : 0 }));
  }, { clip: true });
  sceneBg(c, { background: '#DAD6CB' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const cA = box(c, 90, 470, 420, 472, { zIndex: 4, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 9px 0 ${SH}` }); box(cA, 40, 30, 340, 383).innerHTML = columnsSvg();
  const cB = box(c, 570, 470, 420 - 50, 472, { zIndex: 4, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 9px 0 ${SH}` });
  { const u = box(cB, 95, 40, 180, 204); u.innerHTML = woodLetterSvg('U', RED); const s = box(cB, 85, 210, 200, 226); s.innerHTML = woodLetterSvg('S'); }
  const hrt = el('div', c, { left: '470px', top: '400px', fontSize: '120px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 30 }, '♥');
  const st1 = stamp(c, 120, 640, 'SIN<br>PAPELES', { size: 64, bw: 10, z: 40, col: '#555', bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const st2 = stamp(c, 560, 700, 'SIN<br>PAPELES', { size: 64, bw: 10, z: 40, col: '#555', bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const DOC = [0, 1, 2].map(i => { const d = box(c, 160 + i * 300, 0, 90, 110, { zIndex: 2, background: '#fff', border: `4px solid ${INK}`, borderRadius: '6px' }); d.innerHTML = `<svg width="90" height="110"><path d="M14,24 h60 M14,44 h60 M14,64 h40" stroke="${INK}" stroke-width="5"/><path d="M8,8 L82,102 M82,8 L8,102" stroke="${RED}" stroke-width="8"/></svg>`; return d; });
}

/* ======================================================================
   I1 · «Y WALL STREET CONTÓ EN…» — letrero WALL ST + pizarra con precios en fracciones + corredor gritando
   ====================================================================== */
const ROWS8 = [['ACME', FR(45, 8, 1) + '', 1], ['BRAVO', '12 ' + FR(3, 8), 0], ['CÓNDOR', '7 ' + FR(5, 8), 1], ['DELTA', '88 ' + FR(1, 2), 1], ['ÉPSILON', '23 ' + FR(7, 8), 0]];
ROWS8[0][1] = '45 ' + FR(1, 8);
{
  const c = scene(S.I1[0], S.I1[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, S.I1[0], 1.4, E.linear) });
    const ks = p(t, K.wall - 0.1, 0.35, E.outBack);
    set(sg, { y: (1 - ks) * -500, r: -3 + Math.sin(t * 3) * 1.5, o: t < K.wall - 0.1 ? 0 : 1 });
    QB.R.forEach((r, i) => set(r, { o: t > S.I1[0] + 0.1 + i * 0.12 ? 1 : 0, x: (1 - p(t, S.I1[0] + 0.1 + i * 0.12, 0.2, E.outCubic)) * 60 }));
    set(br.d, { s: pop(t, S.I1[0] + 0.1, 0.35), y: wobble(t, 0.7, 6), r: Math.sin(t * 7) * 2, o: t < S.I1[0] + 0.1 ? 0 : 1 });
    face(br, t, { look: [4, -4], jaw: 0.5 + 0.4 * Math.abs(Math.sin(t * 13)), bL: 18, bR: 18, seed: 4 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#C7CCC2', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 4px, transparent 4px 120px)' });
  const QB = quoteBoard(cam, 70, 420, 870, ROWS8);
  const sg = box(cam, 300, 250, 520, 150, { zIndex: 40 }); sg.innerHTML = streetSignSvg('WALL ST');
  const br = mk(cam, [560, 1060, 330, 420], brokerInner(), '0 0 360 460', 'bust'); br.d.style.zIndex = 20;
}

/* ======================================================================
   I2 · «…EN OCTAVOS DE DÓLAR HASTA 1997» — zoom a «⅛» gigante + sello «HASTA 1997»
   ====================================================================== */
headline(S.I2[0], S.I2[1], 'en *octavos* de dólar', { size: 100, hlT: K.octavos8, y: 210, color: '#FBF6EA', keyColor: YEL, hlc: 'rgba(255,62,165,.55)' });
{
  const c = scene(S.I2[0], S.I2[1], t => {
    const kz = p(t, S.I2[0], 0.4, E.outBack);
    set(big, { s: lerp(0.3, 1, kz) * (1 + 0.03 * Math.sin(t * 4)), r: -3 + wobble(t, 0.5, 1), o: 1 });
    TK.forEach((q, i) => set(q, { x: -((t * 300 + i * 560) % 2240) + 1120 }));
    stampA(st, t, K.mil - 0.02, -8, 1);
    popA(lb, t, K.octavos8 + 0.1, { r: 3 });
    popA(lb2, t, K.dolar8, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: BOARD, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 3px, transparent 3px 60px)' });
  const big = el('div', c, { left: '0', top: '390px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '440px', lineHeight: 1, color: YEL, textShadow: `10px 10px 0 rgba(0,0,0,.4)`, zIndex: 10 }, FR(1, 8));
  const lb = chip(c, 140, 880, 'un octavo', { size: 54, bg: PINK, z: 20 });
  const lb2 = chip(c, 540, 880, '= 12,5 centavos', { size: 46, bg: '#fff', color: INK, z: 20 });
  const tk = box(c, 0, 1200, 1080, 90, { zIndex: 8, background: '#111', borderTop: `5px solid ${YEL}`, borderBottom: `5px solid ${YEL}`, overflow: 'hidden' });
  const TK = ['ACME 45 1/8 ▲', 'BRAVO 12 3/8 ▼', 'CÓNDOR 7 5/8 ▲', 'DELTA 88 1/2 ▲'].map(s => el('div', tk, { left: '0', top: '14px', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '50px', color: '#E8F2E0', whiteSpace: 'nowrap' }, s));
  const st = stamp(c, 190, 1010, 'HASTA 1997', { size: 96, bw: 14, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   J · GOLPE AMARILLO: «OCTAVOS. COMO EL REAL DE A OCHO» — la moneda se parte en 8 porciones
   ====================================================================== */
colorHit(S.J[0], S.J[1], YEL, c => {
  const W8 = coinWedges(c, 290, 520, 500, 'Mº');
  const L8 = W8.map((w, i) => el('div', c, { left: px(540 - 60 + w.dx * 345), top: px(770 - 44 + w.dy * 345), width: '120px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', color: INK, background: '#fff', border: `5px solid ${INK}`, borderRadius: '20px', boxShadow: `5px 5px 0 ${INK}`, zIndex: 20 }, FR(1, 8)));
  const t1 = BIGT(c, 0, 230, 1080, '¡OCTAVOS!', { fontSize: '140px', zIndex: 30 });
  const t2 = BIGT(c, 0, 1110, 1080, `= real de a <span style="color:${RED}">8</span>`, { fontSize: '110px', fontStyle: 'italic', zIndex: 30 });
  return t => {
    const ks = p(t, K.octavos9 + 0.05, 0.35, E.outBack);
    W8.forEach((w, i) => set(w.e, { x: w.dx * 40 * ks, y: w.dy * 40 * ks, r: Math.sin(t * 3 + i) * 3 * ks, s: pop(t, S.J[0], 0.3) }));
    L8.forEach((l, i) => set(l, { s: pop(t, K.octavos9 + 0.15 + i * 0.05, 0.25), o: t < K.octavos9 + 0.15 + i * 0.05 ? 0 : 1 }));
    set(t1, { s: pop(t, S.J[0] + 0.02, 0.3), r: -3 });
    set(t2, { s: pop(t, K.real - 0.05, 0.3), r: 2, o: t < K.real - 0.05 ? 0 : 1 });
  };
});

/* ======================================================================
   K1 · «O SEA: ESE SÍMBOLO… PONE "PESOS"» — el «$» de la portada se desmonta AL REVÉS (rima con los 4 pasos): $ → pˢ → «PESOS»
   ====================================================================== */
{
  const TSTOP = K.simbolo + 0.15, TR = K.simbolo + 0.35, TRe = K.pone - 0.02;
  const c = scene(S.K1[0], S.K1[1], t => {
    set(ry, { r: t * 12 });
    const spin = t < TSTOP ? Math.cos(2 * Math.PI * (t - TSTOP) / 0.8) : 1;
    set(wrap, { sx: Math.max(0.07, Math.abs(spin)) * pop(t, S.K1[0], 0.35), sy: pop(t, S.K1[0], 0.35), o: 1 - p(t, K.pesos10 - 0.05, 0.15) });
    // al revés: la raya vuelve a ser P (vuelve la panza) y la S se baja de la P, chiquita
    const kr = p(t, TR, TRe - TR, E.inOutCubic);
    const sx = lerp(S_BIG.x, S_SMALL.x, kr), sy = lerp(S_BIG.y, S_SMALL.y, kr) - Math.sin(kr * Math.PI) * 120, ss = lerp(S_BIG.s, S_SMALL.s, kr);
    sG.setAttribute('transform', `translate(${f1(sx)} ${f1(sy)}) scale(${f1(ss * 1000) / 1000})`);
    sP.setAttribute('stroke-width', f1(PG.sw / ss * lerp(1, 0.55, kr)));
    bowl.style.strokeDashoffset = f1(1000 * (1 - p(t, TR + 0.15, 0.4, E.inOutCubic)));
    stemX.style.opacity = 1 - p(t, TR, 0.2);
    set(hd, { s: pop(t, S.K1[0] + 0.05, 0.3), r: -1.5, o: 1 - p(t, K.pesos10 - 0.05, 0.15) });
    set(arr, { o: t > TRe && t < K.pesos10 ? 1 : 0, x: Math.sin(t * 9) * 8 });
    // y en «pesos» cae la palabra entera (golpe rosa)
    set(pw, { s: pop(t, K.pesos10 - 0.04, 0.35) * (1 + 0.04 * Math.sin(t * 8)), r: -4, o: t < K.pesos10 - 0.04 ? 0 : 1 });
    pw.style.textShadow = (glitch(t, K.pesos10, 0.3) ? glitch(t, K.pesos10, 0.3) + ', ' : '') + OUTL(INK, 10);
    pinkBg.style.opacity = t > K.pesos10 - 0.04 ? 1 : 0;
    set(eqq, { s: pop(t, K.pesos10 + 0.15, 0.3), r: 4, o: t < K.pesos10 + 0.15 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F3EAD3', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 96px)' });
  const ry = rays(c, -160, 160, 1400, 26, 'rgba(201,162,74,.18)', 'rgba(0,0,0,0)', 0);
  const pinkBg = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: PINK }); halftone(pinkBg, 'rgba(0,0,0,.1)', 1);
  const hd = BIGT(c, 0, 210, 1080, `Ese símbolo… <i>pone</i>`, { fontSize: '100px', zIndex: 40 });
  const wrap = box(c, 0, 0, 1080, 1920, { zIndex: 10, transformOrigin: '540px 760px' });
  const gl = svgLayer(wrap, 5);
  gl.innerHTML = `<g transform="translate(70 0)">
    <path class="stemX" d="M${PG.x},${PG.top} V${PG.top - 40} M${PG.x},${PG.bot} V${PG.bot + 40}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <path d="${P_STEM}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <path class="bowl" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${P_BOWL}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/>
    <g class="sG"><path class="sP" d="${S_PATH}" stroke="${INK}" stroke-width="${PG.sw}" fill="none" stroke-linecap="round"/></g></g>`;
  const stemX = gl.querySelector('.stemX'), bowl = gl.querySelector('.bowl'), sG = gl.querySelector('.sG'), sP = gl.querySelector('.sP');
  const arr = el('div', c, { left: '760px', top: '760px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 13 }, '?');
  const pw = BIGT(c, 0, 640, 1080, '«PESOS»', { fontSize: '220px', color: YEL, zIndex: 30 });
  const eqq = chip(c, 300, 940, '', { size: 64, bg: INK, color: YEL, z: 31 });
  eqq.innerHTML = `$ = p<span style="font-size:.6em;position:relative;top:-0.6em">s</span> = pesos`;
}

/* ======================================================================
   K2 · CTA: «¿Y EN TU PAÍS, CÓMO LE DICES AL DINERO? OS LEO.» — mapa con bocadillos vacíos (sin respuestas inventadas)
   ====================================================================== */
{
  const QB2 = [];
  const c = scene(S.K2[0], S.K2[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(dHL, t, K.dinero10, 0.3);
    QB2.forEach(q => { set(q.e, { s: pop(t, q.t, 0.3), r: q.r + Math.sin(t * 5 + q.t * 7) * 3, o: t < q.t ? 0 : 1 }); q.tx.textContent = t > q.t + 0.2 ? (Math.floor((t - q.t) * 3) % 2 ? '¿…?' : '???') : '…'; });
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
    CC.forEach((q, i) => set(q, { y: ((t - S.K2[0]) * 220 + i * 200) % 900, r: (t * 160 + i * 50) % 360, o: 0.85 }));
  }, { clip: true });
  sceneBg(c, { background: SEA2 });
  const mp = box(c, 0, 80, 1080, 1920, { zIndex: 2 }); mp.innerHTML = latamSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 3, background: 'rgba(239,225,198,.45)' });
  const CC = [0, 1, 2].map(i => { const e = box(c, 120 + i * 330, 300, 80, 80, { zIndex: 4 }); e.innerHTML = pesoCoinSvg(''); return e; });
  const l1 = el('div', c, { left: 0, top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '310px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = []; const iq = find('y en tu pais como le dices al dinero', K.i10);
  [['¿Y', l1], ['en', l1], ['tu', l1], ['país,', l1], ['cómo', l2], ['le', l2], ['dices', l2], ['al', l2], ['dinero?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 8) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('dinero?', 'dhl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[iq + k].s }); });
  const dHL = c.querySelector('.dhl');
  const BP = [[300, 560, K.tu10], [740, 520, K.pais], [560, 700, K.como10], [330, 840, K.dices], [660, 960, K.dinero10 - 0.1], [470, 1100, K.dinero10 + 0.1]];
  BP.forEach((q, i) => { const e = bubble(c, q[0], q[1], '', { size: 64, tail: i % 2 ? 'br' : 'bl', z: 25, pad: '4px 30px 10px', bg: i % 2 ? '#fff' : '#FFF3A8' }); const tx = document.createElement('span'); tx.textContent = '…'; e.insertBefore(tx, e.lastChild); QB2.push({ e, tx, t: q[2], r: (i % 2 ? 1 : -1) * 5 }); });
  const ol = chip(c, 600, 1180, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 460, 1180, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}
