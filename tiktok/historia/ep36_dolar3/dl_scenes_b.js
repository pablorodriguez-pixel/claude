/* Ep. 36 · escenas L6–L10 (TRES, hasta 1857, Ojo, O sea, pregunta) — todo clavado por texto vía K */

/* ======================================================================
   TRES · F1 «CUANDO ESTADOS UNIDOS CREÓ SU DÓLAR» — la cuna del «bebé dólar»
   ====================================================================== */
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const k = p(t, S.F1[0], 0.3, E.outBack);
    set(cr, { y: (1 - k) * 700, r: Math.sin(t * 3) * 2 });
    set(bb, { y: Math.sin(t * 3) * 6 - 8 * p(t, K.creo, 0.2, E.outBack), r: Math.sin(t * 3) * 3 });
    const awake = t > K.creo;
    fc.querySelector('.eyesO').style.opacity = awake ? 1 : 0; fc.querySelector('.eyesC').style.opacity = awake ? 0 : 1;
    ZZ.forEach((z, i) => set(z, { y: -((t * 60 + i * 40) % 120), o: awake ? 0 : 0.9 }));
    popA(chU, t, K.estados6, { r: -4 });
    popA(chN, t, K.creo + 0.05, { r: 4 });
    set(bub, { s: pop(t, K.dolar6, 0.25), r: 4, o: t < K.dolar6 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#DCE6EA', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 30px, transparent 30px 60px)' });
  const cr = box(c, 0, 0, 1080, 1920, { zIndex: 4 });
  const crib = box(cr, 240, 760, 600, 420, { zIndex: 4 }); crib.innerHTML = `<svg viewBox="0 0 600 420" width="100%" height="100%" style="overflow:visible">${cribSvg()}</svg>`;
  const bb = box(cr, 380, 600, 320, 320, { zIndex: 3 }); bb.innerHTML = dollarCoinSvg({ noSign: true });
  const fc = box(bb, 0, 0, 320, 320, { zIndex: 2 }); fc.innerHTML = coinFaceSvg();
  const ZZ = ['z', 'Z', 'z'].map((s, i) => el('div', cr, { left: px(700 + i * 40), top: px(560 - i * 40), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(50 + i * 12), color: INK, zIndex: 6 }, s));
  const chU = chip(c, 130, 420, 'Estados Unidos', { size: 56, bg: '#fff', color: INK, z: 30 });
  const chN = chip(c, 430, 1200, 'nace el dólar', { size: 56, bg: PINK, z: 30 });
  const bub = bubble(c, 640, 520, '¡buá!', { size: 54, it: true, tail: 'bl', z: 41, pad: '4px 26px 10px', bg: '#FFF3A8' });
}

/* ======================================================================
   TRES · F2 «…LO COPIÓ DEL PESO ESPAÑOL» — balanza: el peso y su copia
   ====================================================================== */
{
  const c = scene(S.F2[0], S.F2[1], t => {
    const kin = p(t, S.F2[0], 0.35, E.outBack);
    set(bal, { s: 0.9 + 0.1 * kin, o: 1 });
    const tilt = 9 * p(t, S.F2[0] + 0.1, 0.3, E.outBack) * (1 - p(t, K.copio + 0.15, 0.6, E.outElastic));
    beam.setAttribute('transform', `rotate(${f1(-tilt)} 450 141)`);
    panL.setAttribute('transform', `rotate(${f1(tilt)} 150 141)`); panR.setAttribute('transform', `rotate(${f1(tilt)} 750 141)`);
    const a = -tilt * Math.PI / 180;
    const yL = 141 + Math.sin(a) * -300, yR = 141 + Math.sin(a) * 300;
    set(cL, { y: (yL - 141) + (1 - p(t, S.F2[0] + 0.05, 0.3, E.outBounce)) * -700, o: t < S.F2[0] + 0.05 ? 0 : 1 });
    const kc = p(t, K.copio - 0.1, 0.45, E.outCubic);
    set(cR, { x: lerp(-560, 0, kc), y: (yR - 141) - Math.sin(kc * Math.PI) * 160, s: lerp(0.9, 1, kc), o: t < K.copio - 0.1 ? 0 : 1 });
    cR.style.filter = kc < 1 ? 'grayscale(1) opacity(.85)' : 'none';
    popA(lO, t, S.F2[0] + 0.3, { r: -4 }); popA(lC, t, K.copio + 0.3, { r: 4 });
    stampA(st, t, K.copio + 0.05, -7, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const bal = box(c, 90, 430, 900, 700, { zIndex: 4 }); bal.innerHTML = balanceSvg();
  const beam = bal.querySelector('.beam'), panL = bal.querySelector('.panL'), panR = bal.querySelector('.panR');
  const cL = box(c, 140, 650, 280, 280, { zIndex: 6 }); cL.innerHTML = pesoCoinSvg('Mº');
  const cR = box(c, 640, 650, 280, 280, { zIndex: 6 }); cR.innerHTML = dollarCoinSvg();
  const lO = chip(c, 110, 560, 'PESO · el original', { size: 40, bg: INK, color: YEL, z: 30 });
  const lC = chip(c, 600, 560, 'DÓLAR · la copia', { size: 40, bg: '#fff', color: INK, z: 30 });
  const st = stamp(c, 330, 1030, 'COPIA<br>DEL PESO', { size: 80, bw: 12, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' }); st.style.textAlign = 'center';
}

/* ======================================================================
   TRES · F3 «EL MISMO VALOR… Y EL MISMO SÍMBOLO» — PESO = DÓLAR, y debajo de los dos, el mismo «$»
   ====================================================================== */
{
  const c = scene(S.F3[0], S.F3[1], t => {
    set(cA, { s: pop(t, S.F3[0] - 0.2, 0.3), r: -4 + wobble(t, 0.4, 1), o: 1 });
    set(cB, { s: pop(t, S.F3[0] - 0.12, 0.3), r: 4 + wobble(t, 0.4, 1, 1), o: 1 });
    set(eq, { s: pop(t, K.mismo6, 0.35) * (1 + 0.05 * Math.sin(t * 6)), o: t < K.mismo6 ? 0 : 1 });
    popA(chV, t, K.mismo6 + 0.05, { r: -3 });
    [dA, dB].forEach((d, i) => { const t0 = K.mismo6b - 0.1 + i * 0.12; set(d, { s: pop(t, t0, 0.35), r: [-6, 6][i], o: t < t0 ? 0 : 1 }); });
    stampA(st, t, K.simbolo6, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const card = (x, coin, lab) => { const e = box(c, x, 420, 380, 470, { zIndex: 4, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `8px 9px 0 ${SH}` }); box(e, 50, 40, 280, 280).innerHTML = coin; el('div', e, { left: '0', top: '350px', width: '368px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK }, lab); return e; };
  const cA = card(90, pesoCoinSvg('Mº'), 'PESO'), cB = card(590, dollarCoinSvg({ noSign: true }), 'DÓLAR');
  const eq = el('div', c, { left: '470px', top: '540px', width: '140px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: PINK, textShadow: OUTL(INK, 6), zIndex: 31 }, '=');
  const chV = chip(c, 330, 920, 'mismo valor', { size: 56, bg: INK, color: YEL, z: 30 });
  const dA = box(c, 190, 1010, 180, 270, { zIndex: 10 }); dA.innerHTML = inkDollarSvg(INK);
  const dB = box(c, 690, 1010, 180, 270, { zIndex: 10 }); dB.innerHTML = inkDollarSvg(INK);
  const st = stamp(c, 330, 1100, 'MISMO<br>SÍMBOLO', { size: 68, bw: 11, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' }); st.style.textAlign = 'center';
}

/* ======================================================================
   G1 · «…ALLÍ SE PUDO PAGAR CON PESOS ESPAÑOLES» — el tendero muerde la moneda
   ====================================================================== */
{
  const c = scene(S.G1[0], S.G1[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, S.G1[0], 2.4, E.linear) });
    set(sk.d, { s: pop(t, S.G1[0] + 0.05, 0.4), y: wobble(t, 0.5, 3), o: t < S.G1[0] + 0.05 ? 0 : 1 });
    const bite = t > K.pesos7 && t < K.hasta7;
    face(sk, t, { look: [-4, 2], jaw: bite ? 0.3 + 0.3 * Math.abs(Math.sin(t * 16)) : 0, bL: 10, bR: 18, closed: bite, seed: 2 });
    const kc = p(t, K.pagar - 0.2, 0.4, E.inOutCubic), kb = p(t, K.pesos7 - 0.12, 0.25, E.outCubic);
    set(cn, { x: lerp(lerp(300, 0, kc), -30, kb), y: lerp(lerp(200, 0, kc), -170, kb) + (bite ? Math.sin(t * 40) * 3 : 0), r: kc * 20, o: t < K.pagar - 0.2 ? 0 : 1 });
    set(hand, { x: lerp(260, 0, kc) + 40 * kb, o: t < S.G1[0] ? 0 : 1 });
    set(cr, { o: bite && t > K.pesos7 + 0.2 ? 1 : 0, s: 1 + 0.2 * Math.sin(t * 20) });
    popA(chE, t, K.pesos7, { r: -4 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EADFC8' });
  const shop = box(cam, 0, -40, 1080, 1300, { zIndex: 1 }); shop.innerHTML = shopSvg();
  box(cam, 260, 1090, 680, 110, { zIndex: 6, background: WOOD, border: `5px solid ${INK}`, borderRadius: '8px' });
  const sk = mk(cam, [400, 600, 420, 537], shopkeeperInner(), '0 0 360 460', 'bust'); sk.d.style.zIndex = 4;
  const cn = box(cam, 560, 760, 120, 120, { zIndex: 8 }); cn.innerHTML = pesoCoinSvg('');
  const hand = box(cam, 620, 860, 200, 200, { zIndex: 7 }); hand.innerHTML = `<svg viewBox="-100 -100 200 200" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, -100, 1.3)}</svg>`;
  const cr = el('div', cam, { left: '660px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '60px', color: INK, zIndex: 9 }, '¡crac!');
  const chE = chip(cam, 340, 1215, 'con pesos españoles', { size: 50, bg: PINK, z: 30 });
}

/* ======================================================================
   G2 · «…HASTA MIL OCHOCIENTOS CINCUENTA Y SIETE» — la moneda cae en el mostrador de la tienda + sello HASTA 1857
   ====================================================================== */
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(cam, { s: 1.08 + 0.04 * p(t, S.G2[0], 2.6, E.linear) });
    const t0 = S.G2[0] + 0.05, k = p(t, t0, 0.6, E.outBounce);
    const sp = t < t0 + 0.55 ? Math.cos((t - t0) * 16) : 1;
    set(cn, { y: lerp(-900, 0, k), sx: Math.max(0.1, Math.abs(sp)), r: (1 - k) * 30, o: t < t0 ? 0 : 1 });
    set(cl, { s: pop(t, t0 + 0.32, 0.25), r: -8, o: t > t0 + 0.32 && t < t0 + 1.2 ? 1 : 0 });
    stampA(st, t, K.mil - 0.02, -7, 1);
    SP.forEach((q, i) => set(q, { o: t > t0 + 0.4 ? 0.5 + 0.5 * Math.sin(t * 8 + i * 2) : 0, r: t * 90 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EADFC8' });
  const shop = box(cam, 0, -40, 1080, 1300, { zIndex: 1 }); shop.innerHTML = shopSvg();
  box(cam, 120, 1060, 840, 130, { zIndex: 6, background: WOOD, border: `6px solid ${INK}`, borderRadius: '10px', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 4px, transparent 4px 70px)' });
  const cn = box(cam, 400, 780, 280, 280, { zIndex: 8 }); cn.innerHTML = pesoCoinSvg('Mº');
  const cl = el('div', cam, { left: '660px', top: '820px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '64px', color: INK, background: '#FFF3A8', border: `5px solid ${INK}`, borderRadius: '30px', padding: '0 22px 6px', zIndex: 9 }, '¡clinc!');
  const st = stamp(c, 330, 440, 'HASTA<br>1857', { size: 120, bw: 15, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' }); st.style.textAlign = 'center';
  const SP = [[330, 760], [720, 760], [300, 1000], [760, 1000]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontSize: '60px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦'));
}

/* ======================================================================
   H0 · «OJO: HAY OTRAS TEORÍAS…» — sello ¡OJO! y tres fichas de teoría con «?»
   ====================================================================== */
headline(S.H0[0], S.H0[1], 'Ojo: hay *quien dice*…', { size: 100, hlT: K.otras, y: 196 });
{
  const c = scene(S.H0[0], S.H0[1], t => {
    stampA(ojo, t, K.ojo, -8, 1);
    CD.forEach((q, i) => { const t0 = K.otras - 0.1 + i * 0.12; set(q, { s: pop(t, t0, 0.35), r: [-8, 2, 9][i] + Math.sin(t * 3 + i) * 2, y: wobble(t, 0.6, 5, i), o: t < t0 ? 0 : 1 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ojo = stamp(c, 330, 380, '¡OJO!', { size: 120, bw: 14, z: 60, bg: YEL, blend: 'normal', col: INK });
  const CD = [0, 1, 2].map(i => { const e = box(c, 110 + i * 290, 640, 250, 330, { zIndex: 5, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `7px 8px 0 ${SH}` }); el('div', e, { left: '0', top: '40px', width: '238px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: [PINK, INK, PINK][i] }, '?'); el('div', e, { left: '0', top: '262px', width: '238px', textAlign: 'center', fontFamily: 'Rye', fontSize: '30px', color: INK }, 'TEORÍA'); return e; });
}

/* ======================================================================
   H1 · «…COMO LA DE LAS COLUMNAS DE HÉRCULES» — las columnas con la banda en S (y el EMÚ asoma: cameo)
   ====================================================================== */
headline(S.H1[0], S.H1[1], 'las columnas de *Hércules*', { size: 88, hlT: K.hercules, y: 196 });
const T_EMU = K.hercules + 0.1;
{
  const c = scene(S.H1[0], S.H1[1], t => {
    const k = p(t, S.H1[0], 0.4, E.outBack);
    set(cl, { y: (1 - k) * 900, s: (0.9 + 0.1 * k) * (1 + 0.04 * p(t, K.columnas, 1.5, E.linear)), o: 1 });
    bandS.style.opacity = t > K.columnas + 0.2 ? 1 : 0.3;
    popA(sQ, t, K.columnas + 0.3, { r: -6 });
    // emú: asoma por detrás de la columna derecha, mira a cámara 0,6 s y se esconde
    const ke = p(t, T_EMU - 0.1, 0.25, E.outBack) * (1 - p(t, T_EMU + 1.2, 0.2, E.inCubic));
    set(emu.d, { x: (1 - ke) * 420, r: -6 + Math.sin(t * 10) * 2 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU + 0.1 && t < T_EMU + 0.4 ? 0.6 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const emu = mkEmuF(c, [690, 700, 250, 375]); emu.d.style.zIndex = 8;
  const cl = box(c, 200, 400, 640, 720, { zIndex: 4 }); cl.innerHTML = columnsSvg(); const bandS = cl.querySelector('.bandS');
  const sQ = chip(c, 380, 1150, '¿la S?', { size: 60, bg: PINK, z: 31 });
}

/* ======================================================================
   H2 · «SON BONITAS, PERO LA DEL PESO ES LA QUE TIENE PRUEBAS» — dos fichas: columnas ♥ / libro de cuentas pˢ con sello
   ====================================================================== */
headline(S.H2[0], S.H2[1], 'Bonito, pero las *pruebas* dicen «pesos»', { size: 84, hlT: K.pruebas, y: 196 });
{
  const c = scene(S.H2[0], S.H2[1], t => {
    set(cA, { s: pop(t, S.H2[0], 0.3) * (t > K.peso8 ? 0.9 : 1), r: -4, o: t > K.peso8 ? 0.55 : 1 });
    set(cB, { s: pop(t, S.H2[0] + 0.1, 0.3) * (t > K.peso8 ? 1.08 + 0.02 * Math.sin(t * 5) : 1), r: 4, o: 1 });
    cB.style.background = t > K.peso8 ? '#FFF7B8' : '#FBF6EA';
    set(hrt, { s: pop(t, K.bonitas, 0.3) * (1 + 0.1 * Math.sin(t * 9)), o: t < K.bonitas ? 0 : 1 });
    stampA(st, t, K.tiene, -8, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#DAD6CB' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const cA = box(c, 80, 470, 420, 520, { zIndex: 4, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 9px 0 ${SH}` }); box(cA, 40, 30, 340, 383).innerHTML = columnsSvg();
  el('div', cA, { left: '0', top: '430px', width: '408px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: INK }, 'COLUMNAS');
  const cB = box(c, 560, 470, 380, 520, { zIndex: 5, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 9px 0 ${SH}` });
  {
    const lgp = box(cB, 30, 40, 308, 360, { background: '#F7EFD9', border: `4px solid ${INK}`, borderRadius: '8px', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.5) 0 2px, transparent 2px 60px)' });
    ['250', '75', '12'].forEach((n, i) => el('div', lgp, { left: '20px', top: px(30 + i * 100), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '70px', color: '#3a2a6a', whiteSpace: 'nowrap' }, `${n} p<span style="font-size:.55em;position:relative;top:-0.75em;margin-left:2px">s</span>`));
    el('div', cB, { left: '0', top: '430px', width: '368px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: INK }, 'EL PESO');
  }
  const hrt = el('div', c, { left: '230px', top: '1000px', fontSize: '130px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 30 }, '♥');
  const st = stamp(c, 440, 1040, 'CON<br>PRUEBAS', { size: 64, bw: 12, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' }); st.style.textAlign = 'center';
}

/* ======================================================================
   K0 · «O SEA: CADA VEZ QUE TÚ ESCRIBES EL SÍMBOLO DEL DÓLAR…» — una mano escribe el $ en un papel… y se enciende la P escondida
   ====================================================================== */
headline(S.K0[0], S.K0[1], 'Cada vez que *tú escribes*…', { size: 88, hlT: K.escribes, y: 196 });
{
  const G = { x: 540, y: 820, s: 0.95 };          // el «$» del papel (coordenadas de escena)
  const TSa = K.escribes - 0.05, TSb = K.simbolo9 + 0.35, TRa = TSb + 0.05, TRb = K.dolar9 + 0.35, TP = K.dolar9 + 0.75;
  const c = scene(S.K0[0], S.K0[1], t => {
    const kp = p(t, S.K0[0], 0.35, E.outBack);
    set(pg, { y: (1 - kp) * 300, r: lerp(5, -1.5, kp) });
    set(cam, { s: 1 + 0.12 * p(t, TP - 0.1, 0.5, E.inOutCubic) });
    const ks = p(t, TSa, TSb - TSa, E.inOutCubic), kr = p(t, TRa, TRb - TRa, E.inOutCubic);
    sI.style.strokeDashoffset = f1(1000 * (1 - ks)); rI.style.strokeDashoffset = f1(1000 * (1 - kr));
    // la pluma (con la mano) sigue la punta del trazo
    let tip;
    if (t < TSa) tip = [G.x + 150, G.y - 330];
    else if (t < TSb + 0.02) { const q = sI.getPointAtLength(ks * SL); tip = [G.x + q.x * G.s, G.y + q.y * G.s]; }
    else if (t < TRb + 0.02) { tip = [G.x, G.y + lerp(-345, 345, kr) * G.s]; }
    else tip = [G.x + 260, G.y + 250 - 60 * p(t, TRb, 0.5, E.outCubic)];
    const wr = t >= TSa && t < TRb;
    set(pen, { x: tip[0] - 60 + (wr ? Math.sin(t * 40) * 3 : 0), y: tip[1] - 236, r: wr ? 6 : 16, o: t > S.K0[0] + 0.1 ? 1 - p(t, TP + 0.6, 0.3) : 0 });
    // la P escondida: el palo y la panza se iluminan en rosa
    const kP = p(t, TP, 0.45, E.inOutCubic);
    pB.style.strokeDashoffset = f1(1000 * (1 - kP)); pB.style.opacity = t > TP ? 1 : 0;
    pS.style.opacity = t > TP ? 0.85 : 0;
    popA(chP, t, TP + 0.3, { r: -5 });
    set(arP, { o: t > TP + 0.3 ? 1 : 0, x: Math.sin(t * 9) * 8 });
    popA(chT, t, K.tu9, { r: 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1D7DC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: `${G.x}px ${G.y}px` });
  const pg = box(cam, 0, 0, 1080, 1920);
  ledgerPage(pg, 170, 390, 740, 860);
  const gl = svgLayer(pg, 6);
  gl.innerHTML = `<g transform="translate(${G.x} ${G.y}) scale(${G.s})">
    <path class="pS" d="M0,-345 V345" stroke="${PINK}" stroke-width="92" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="pB" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M0,-330 C200,-356 300,-290 300,-160 C300,-20 170,20 0,8" stroke="${PINK}" stroke-width="40" fill="none" stroke-linecap="round" style="opacity:0"/>
    <path class="sI" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="${S_PATH}" stroke="#3a2a6a" stroke-width="58" fill="none" stroke-linecap="round"/>
    <path class="rI" pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M0,-345 V345" stroke="#3a2a6a" stroke-width="58" fill="none" stroke-linecap="round"/></g>`;
  const sI = gl.querySelector('.sI'), rI = gl.querySelector('.rI'), pB = gl.querySelector('.pB'), pS = gl.querySelector('.pS');
  const SL = sI.getTotalLength();
  const pen = box(cam, 0, 0, 120, 240, { zIndex: 9 });
  pen.innerHTML = quillSvg().replace('</svg>', `<g transform="translate(64 196) rotate(200) scale(1.5)">${gloveHand(0, 0, 0, 1)}</g></svg>`);
  const chT = chip(c, 120, 1270, 'tú', { size: 60, bg: INK, color: YEL, z: 30 });
  const chP = chip(c, 480, 1150, '¡la P escondida!', { size: 52, bg: PINK, z: 30 });
  const arP = el('div', c, { left: '380px', top: '1060px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', color: PINK, textShadow: OUTL(INK, 5), zIndex: 31, transform: 'rotate(-20deg)' }, '↖');
}

/* ======================================================================
   K1 · «…ESTÁS ESCRIBIENDO "PESOS", EN ESPAÑOL» — la Pˢ nítida + sello «PESOS» (sin glifos intermedios)
   ====================================================================== */
headline(S.K1[0], S.K1[1], '…estás *escribiendo*', { size: 100, hlT: K.leyendo, y: 196 });
{
  const c = scene(S.K1[0], S.K1[1], t => {
    set(ry, { r: t * 12 });
    set(gw, { s: pop(t, S.K1[0] - 0.15, 0.4) * (1 + 0.02 * Math.sin(t * 4)), r: wobble(t, 0.5, 1.5), o: 1 });
    stampA(pw, t, K.pesos9 - 0.02, -6, 1);
    pw.style.textShadow = glitch(t, K.pesos9, 0.3) || 'none';
    set(eqq, { s: pop(t, K.pesos9 + 0.3, 0.3), r: 3, o: t < K.pesos9 + 0.3 ? 0 : 1 });
    set(chEs, { s: pop(t, K.en9 - 0.05, 0.3), r: -4, o: t < K.en9 - 0.05 ? 0 : 1 });
    pinkBg.style.opacity = t > K.pesos9 - 0.02 ? 1 : 0;
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F3EAD3', backgroundImage: 'repeating-linear-gradient(0deg, rgba(122,154,176,.35) 0 2px, transparent 2px 96px)' });
  const pinkBg = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: PINK }); halftone(pinkBg, 'rgba(0,0,0,.1)', 1);
  const ry = rays(c, -160, 160, 1400, 26, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 1);
  // Pˢ nítida sobre una tarjeta de papel
  const gw = box(c, 290, 360, 500, 560, { zIndex: 10, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `9px 10px 0 ${SH}` });
  gw.innerHTML = `<svg viewBox="0 0 500 560" width="100%" height="100%"><g transform="translate(150 70)">
    <path d="M0,0 V420" stroke="${INK}" stroke-width="44" stroke-linecap="round" fill="none"/>
    <path d="M0,10 C130,-6 200,30 200,120 C200,214 116,240 0,232" stroke="${INK}" stroke-width="44" stroke-linecap="round" fill="none"/>
    <g transform="translate(262 60) scale(0.24)"><path d="${S_PATH}" stroke="${INK}" stroke-width="150" fill="none" stroke-linecap="round"/></g></g></svg>`;
  const pw = stamp(c, 220, 960, '«PESOS»', { size: 110, bw: 16, z: 40, bg: 'rgba(255,255,255,.96)', blend: 'normal' });
  const eqq = chip(c, 300, 1160, '', { size: 60, bg: INK, color: YEL, z: 31 });
  eqq.innerHTML = `$ = p<span style="font-size:.6em;position:relative;top:-0.6em">s</span> = pesos`;
  const chEs = chip(c, 560, 1250, 'en español', { size: 52, bg: '#fff', color: INK, z: 31 });
}

/* ======================================================================
   K2 · CTA «¿Y EN TU PAÍS, CÓMO LE LLAMÁIS AL DINERO? OS LEO.» — mapa con bocadillos vacíos (sin respuestas ni usuarios inventados)
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
  }, { clip: true, cut: true });
  sceneBg(c, { background: SEA2 });
  const mp = box(c, 0, 80, 1080, 1920, { zIndex: 2 }); mp.innerHTML = latamSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 3, background: 'rgba(239,225,198,.45)' });
  const CC = [0, 1, 2].map(i => { const e = box(c, 120 + i * 330, 300, 80, 80, { zIndex: 4 }); e.innerHTML = pesoCoinSvg(''); return e; });
  const l1 = el('div', c, { left: 0, top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = [];
  [['¿Y', l1], ['en', l1], ['tu', l1], ['país,', l1], ['cómo', l2], ['le', l2], ['llamáis', l2], ['al', l2], ['dinero?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 8) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('dinero?', 'dhl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[K.i10 + k].s }); });
  const dHL = c.querySelector('.dhl');
  const BP = [[300, 560, K.tu10], [700, 520, K.pais], [560, 700, K.como10], [330, 840, K.llamais], [640, 960, K.dinero10 - 0.1], [470, 1100, K.dinero10 + 0.1]];
  BP.forEach((q, i) => { const e = bubble(c, q[0], q[1], '', { size: 64, tail: i % 2 ? 'br' : 'bl', z: 25, pad: '4px 30px 10px', bg: i % 2 ? '#fff' : '#FFF3A8' }); const tx = document.createElement('span'); tx.textContent = '…'; e.insertBefore(tx, e.lastChild); QB2.push({ e, tx, t: q[2], r: (i % 2 ? 1 : -1) * 5 }); });
  const ol = chip(c, 560, 1180, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 430, 1180, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}
