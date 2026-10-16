/* ======================================================================
   S6 · GOLPE AMARILLO: EN REALIDAD, CASI 20.000 (33.2 – 35.75)  L6
   ====================================================================== */
colorHit(33.2, 35.75, YEL, c => {
  const t1 = bigText(c, 0, 210, 1080, 'En <i>realidad</i>…', { size: 112, z: 4, css: { textShadow: '5px 5px 0 #fff' } });
  const t2 = bigText(c, 0, 380, 1080, 'está a casi', { size: 76, italic: true, z: 4, weight: 800 });
  const num = bigText(c, 0, 500, 1080, '', { size: 190, z: 5, css: { textShadow: '8px 8px 0 #fff' } });
  const km = bigText(c, 0, 730, 1080, 'km', { size: 110, italic: true, z: 5, weight: 800 });
  const ruler = box(c, 0, 900, 10, 90, { zIndex: 6, background: INK, borderRadius: '8px', backgroundImage: `repeating-linear-gradient(90deg, ${YEL} 0 4px, transparent 4px 40px), repeating-linear-gradient(90deg, ${YEL} 0 3px, transparent 3px 10px)`, backgroundSize: '100% 44px, 100% 22px', backgroundRepeat: 'no-repeat' });
  const isl = box(c, 0, 840, 180, 120, { zIndex: 6 }); isl.innerHTML = svgW(`<path d="${smooth([[20, 80], [60, 40], [120, 36], [170, 70], [150, 110], [80, 116], [30, 106]])}" fill="${INK}"/>`, '0 0 180 120');
  const ship = box(c, 780, 1000, 200, 207, { zIndex: 6 }); ship.innerHTML = `<svg viewBox="0 0 540 560" width="200" height="207" style="overflow:visible;filter:brightness(0)"><g transform="translate(540,0) scale(-1,1)"><use href="#shipS" width="540" height="560"/></g></svg>`;
  const sea = svgBox(c, -60, 0, 1200, 1920, wavesSvg(1200, 1150, 4, INK, false, 9).replace(new RegExp(`stroke="${INK}"`, 'g'), `stroke="${YEL}"`), '0 0 1200 1920', { zIndex: 5 });
  const drop = sweatDrop(c, 930, 990, 40);
  return t => {
    set(t1, { s: lerp(1.3, 1, p(t, 33.25, 0.2)), o: 1 });
    popA(t2, t, 34.03, { rise: 30 });
    const kn = p(t, 34.81, 0.6, E.outCubic); num.textContent = '≈ ' + fmt(Math.round(lerp(4500, 20000, kn) / 100) * 100);
    set(num, { s: t < 34.81 ? 0.8 : 1 + 0.12 * (1 - p(t, 35.18, 0.3)), o: t < 34.6 ? 0 : 1 }); num.style.textShadow = glitch(t, 35.18, 0.3) || '8px 8px 0 #fff';
    set(km, { o: t < 34.6 ? 0 : 1, s: pop(t, 34.6, 0.3) });
    const w0 = 300 * p(t, 33.3, 0.4, E.outBack), w1 = 1300 * p(t, 34.81, 0.7, E.outBack); const wR = Math.max(w0, w0 + w1);
    ruler.style.width = px(wR); set(ruler, { x: 1000 - wR, o: 1 }); set(isl, { x: 1000 - wR - 170, y: Math.sin(t * 3) * 4 });
    set(ship, { x: Math.sin(t * 2) * 6, y: Math.sin(t * 3) * 8, r: Math.sin(t * 2.5) * 4 });
    set(sea, { x: Math.sin(t * 1.8) * 30 });
    set(drop, { o: t > 35.0 ? 1 : 0, y: p(t, 35.0, 0.7, E.inCubic) * 50 });
  };
});

/* ======================================================================
   S7 · LOS EXPERTOS: «TUS NÚMEROS ESTÁN MAL» (35.75 – 40.15)  L7a
   ====================================================================== */
headline(35.75, 37.55, 'Los *expertos* revisaron su plan', { size: 76, hlT: 36.03 });
headline(37.55, 38.33, 'le dijeron:', { size: 100 });
headline(38.33, 40.15, '«tus números están *mal*»', { size: 84, hlT: 39.53 });
{
  const c = scene(35.75, 40.15, t => {
    S.forEach((m, i) => {
      face(m, t, { look: t < 37.5 ? [0, 5] : [0, 0], brow: t > 38.3 ? 7 : 2, jaw: t > 38.36 + i * 0.4 && t < 38.7 + i * 0.4 ? 0.5 : 0, seed: i * 1.3 });
      set(m.d, { y: wobble(t, 0.4, 2, i), r: t > 39.5 && t < 40.1 ? Math.sin((t - 39.5) * 16 + i) * 4 : 0 });
    });
    const kp = p(t, 35.9, 0.4, E.outBack); set(plan, { y: (1 - kp) * 600, r: -3, o: t < 35.85 ? 0 : 1 });
    const km = p(t, 36.54, 0.9, E.inOutCubic); set(mag, { x: lerp(-60, 320, km) + Math.sin(t * 8) * 10, y: Math.sin(t * 5) * 14, o: t > 36.45 && t < 37.7 ? 1 : 0 });
    SG.forEach((g, i) => { const t0 = [38.36, 38.67, 39.53][i], k = p(t, t0, 0.35, E.outBack); set(g, { y: (1 - k) * 330, r: [-5, 3, -4][i] + (t > t0 ? Math.sin((t - t0) * 7) * 2 : 0), o: t < t0 - 0.05 ? 0 : 1 }); });
    stampA(xs, t, 39.6, -12, 1);
  }, { clip: true });
  const S = tribunal(c);
  const SG = [['TUS', 85], ['NÚMEROS<br>ESTÁN', 385], ['¡MAL!', 685]].map((q, i) => {
    const d = box(c, q[1], 690, 250, 300, { zIndex: 20 });
    d.innerHTML = `<div style="position:absolute;left:115px;top:150px;width:20px;height:200px;background:${WOOD};border:4px solid ${INK}"></div><div style="position:absolute;left:0;top:0;width:250px;height:164px;background:#fff;border:5px solid ${INK};box-shadow:7px 7px 0 ${SH};display:flex;align-items:center;justify-content:center;text-align:center;font-family:Playfair;font-weight:900;font-size:${i === 1 ? 46 : 70}px;line-height:1.05;color:${i === 2 ? RED : INK}">${q[0]}</div>`;
    return d;
  });
  tableFront(c);
  const plan = box(c, 350, 950, 400, 150, { zIndex: 30, background: '#F7F0E0', border: `4px solid ${INK}`, boxShadow: `6px 6px 0 ${SH}`, fontFamily: 'SpecialElite', color: INK, textAlign: 'center' });
  plan.innerHTML = `<div style="font-size:30px;margin-top:12px">PLAN DE COLÓN</div><div style="font-family:Playfair;font-weight:900;font-size:46px;margin-top:6px;white-space:nowrap">Japón ≈ 4.500 km</div>`;
  const xs = stamp(c, 440, 960, '✗ MAL', { size: 76, bw: 9, z: 35, bg: 'rgba(255,255,255,.6)' });
  const mag = box(c, 360, 900, 170, 230, { zIndex: 36 }); mag.innerHTML = svgW(`<path d="M90,150 L140,220" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M90,150 L140,220" stroke="${WOOD}" stroke-width="12" stroke-linecap="round"/><circle cx="66" cy="78" r="60" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="12"/><circle cx="66" cy="78" r="60" fill="none" stroke="${BRASS}" stroke-width="6"/><path d="M36,54 q14,-16 34,-16" stroke="#fff" stroke-width="6" fill="none"/>`, '0 0 170 230');
}
/* golpe rosa: Y TENÍAN RAZÓN */
colorHit(40.15, 41.6, PINK, c => {
  const sil = box(c, 0, 0, 1080, 1920, { zIndex: 3, filter: SIL });
  sil.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><use href="#sabS0" x="20" y="760" width="330" height="422"/><use href="#sabS1" x="370" y="720" width="340" height="435"/><use href="#sabS2" x="720" y="760" width="330" height="422"/><rect x="0" y="1150" width="1080" height="500"/></svg>`;
  const t1 = bigText(c, 0, 220, 1080, 'Y tenían', { size: 110, italic: true, z: 4, weight: 800, css: { textShadow: '5px 5px 0 #fff' } });
  const t2 = bigText(c, 0, 350, 1080, 'RAZÓN', { size: 230, z: 4, css: { textShadow: '8px 8px 0 #fff' } });
  const ck = box(c, 400, 600, 280, 280, { zIndex: 6 }); ck.innerHTML = GCHECK;
  return t => {
    set(t1, { s: lerp(1.3, 1, p(t, 40.19, 0.2)), o: 1 });
    const k = p(t, 40.62, 0.2); set(t2, { s: t < 40.6 ? 0 : lerp(1.6, 1, k), o: t < 40.6 ? 0 : 1 }); t2.style.textShadow = glitch(t, 40.96, 0.3) || '8px 8px 0 #fff';
    set(ck, { s: pop(t, 40.96, 0.35), o: t < 40.96 ? 0 : 1, r: -6 });
    set(sil, { y: Math.abs(Math.sin(t * 9)) * -14 });
  };
});

/* ======================================================================
   S8 · UN CONTINENTE EN MEDIO · SIN COMIDA (41.6 – 49.7)  L8  (+ cameo del emú)
   ====================================================================== */
headline(41.6, 44.1, 'Un continente *en medio*…', { size: 84, hlT: 43.28 });
headline(44.1, 45.63, '…que *nadie* esperaba', { size: 90, hlT: 44.14 });
headline(45.63, 48.45, 'Sin él: *sin comida*', { size: 92, hlT: 47.54 });
headline(48.45, 49.7, '…en mitad del *océano*', { size: 86, hlT: 48.98 });
{
  const c = scene(41.6, 49.7, t => {
    const zo = p(t, 48.6, 0.9, E.inOutCubic);
    set(cam, { s: lerp(1, 0.42, zo) });
    set(sky, { o: 1 });
    set(seaB, { x: Math.sin(t * 1.4) * 16 }); set(seaF, { x: -Math.sin(t * 1.7) * 22, y: Math.sin(t * 2.2) * 5 });
    set(shipW, { y: Math.sin(t * 2.0) * 8, r: Math.sin(t * 1.6) * 1.8, x: -p(t, 41.6, 8, E.linear) * 60 });
    if (ship.sails) ship.sails.setAttribute('transform', `translate(270,0) scale(${f1((1 + Math.sin(t * 3) * 0.03) * 100) / 100},1) translate(-270,0)`);
    // América salvavidas
    const ka = p(t, 42.43, 0.6, E.outBack), gh = p(t, 45.65, 0.3);
    set(am, { y: (1 - ka) * 700 + Math.sin(t * 1.8) * 8, r: Math.sin(t * 1.3) * 3, o: t < 42.4 ? 0 : lerp(1, 0.18, gh) });
    am.style.filter = gh > 0 ? `grayscale(${f1(gh)})` : 'none';
    set(amD, { o: gh, s: 1 });
    popA(nad, t, 44.14, { r: -4 });
    stampA(lk, t, 44.55, 10, 1); if (t > 45.6) lk.style.opacity = 0;
    // cameo del emú: asoma de un barril y mira a cámara
    const ke = t > 44.95 && t < 45.6 ? Math.sin(clamp((t - 44.95) / 0.65) * Math.PI) : 0;
    set(emuC.d, { y: (1 - Math.min(1, ke * 1.6)) * 300, o: 1 }); ec.style.display = ke > 0 ? '' : 'none';
    face(emuC, t, { half: true, blink: false, bR: t > 45.15 ? 18 : 0 });
    // barriles de comida
    const kb = p(t, 45.9, 0.4, E.outBack); set(bp, { y: (1 - kb) * 500, o: t < 45.85 ? 0 : 1 - p(t, 48.6, 0.25) });
    BX.forEach((x, i) => { const t0 = 46.71 + i * 0.36; set(x, { s: t < t0 ? 0 : lerp(2, 1, p(t, t0, 0.15)), o: t < t0 ? 0 : 1, r: -6 + i * 3 }); });
    set(emp, { o: t > 48.2 ? 1 : 0, s: pop(t, 48.2, 0.3) });
    set(sad, { o: t > 48.98 ? 1 : 0, y: p(t, 48.98, 0.6) * 40 });
    popA(oc, t, 49.0, { r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '740px 720px' });
  const sky = box(cam, -1500, -2000, 4200, 2780, { background: '#EADFC8' });
  const seaB = svgBox(cam, -1600, 0, 4300, 4000, wavesSvg(4300, 760, 4, '#D8CBAA', true, 13), '0 0 4300 4000');
  const amD = svgBox(cam, 90, 470, 300, 459, `<path d="${AM_N}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 12"/><path d="${AM_S}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 12"/><text x="170" y="250" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="64" fill="${RED}">¿sin él?</text>`, '0 0 340 520', { zIndex: 3 });
  const am = svgBox(cam, 90, 470, 300, 459, americaInner(true), '0 0 340 520', { zIndex: 2 });
  const shipW = box(cam, 0, 0, 1080, 1920, { transformOrigin: '730px 760px', zIndex: 4 });
  const ship = mkShip(shipW, [500, 380, 460, 477], true);
  const ec = box(shipW, 540, 330, 220, 270, { overflow: 'hidden' });
  const emuC = mkEmuF(ec, [10, 40, 200, 300]);
  const brl = svgBox(shipW, 600, 588, 100, 120, barrelInner(), '0 0 100 120');
  const seaF = svgBox(cam, -1600, 0, 4300, 4000, wavesSvg(4300, 812, 6, '#CDBF9C', true, 15), '0 0 4300 4000', { zIndex: 5 });
  const nad = chip(c, 330, 950, '¡nadie lo esperaba!', { size: 40, bg: PINK, z: 30 });
  const lk = stamp(c, 120, 700, 'SUERTE', { size: 74, bw: 9, z: 32, bg: 'rgba(255,255,255,.8)', blend: 'normal' });
  const bp = box(c, 390, 960, 560, 300, { zIndex: 30, background: '#F7F0E0', border: `5px solid ${INK}`, borderRadius: '18px', boxShadow: `8px 8px 0 ${SH}` });
  el('div', bp, { left: '0', top: '10px', width: '550px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: INK }, 'COMIDA A BORDO');
  const BX = [];
  for (let i = 0; i < 5; i++) { const b = svgBox(bp, 20 + i * 104, 74, 92, 110, barrelInner(), '0 0 100 120'); const x = box(bp, 20 + i * 104, 82, 92, 92, { zIndex: 3 }); x.innerHTML = XSVG; BX.push(x); }
  const emp = el('div', bp, { left: '0', top: '200px', width: '550px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '62px', color: RED }, 'vacío');
  const sad = sweatDrop(c, 760, 560, 54);
  const oc = chip(c, 380, 1120, 'mitad del océano', { size: 44, bg: INK, color: YEL, z: 31 });
}

/* ======================================================================
   S9 · EL ORIGEN DEL MITO: WASHINGTON IRVING, 1828 (49.7 – 57.45)  L9
   ====================================================================== */
headline(49.7, 51.3, '¿De dónde sale el *mito?*', { size: 84, hlT: 50.7 });
headline(51.3, 54.05, 'Una biografía muy *novelada*', { size: 80, hlT: 53.33 });
headline(54.05, 55.64, 'de *1828*', { size: 110, hlT: 54.86 });
headline(55.64, 57.45, 'escrita por Washington *Irving*', { size: 76, hlT: 56.83 });
{
  const c = scene(49.7, 57.45, t => {
    const km = p(t, 51.3, 0.45, E.inOutCubic);
    set(mito, { s: (t < 49.8 ? 0 : lerp(2.2, 1, p(t, 49.8, 0.18))) * lerp(1, 0.42, km), x: km * -290, y: km * -110, r: -10, o: t < 49.8 ? 0 : 1 });
    const kg = p(t, 50.0, 1.2, E.inOutCubic); set(mag, { x: lerp(-200, 150, kg) + Math.sin(t * 7) * 18, y: Math.cos(t * 6) * 16, o: t > 49.95 && t < 51.4 ? 1 : 0 });
    set(qm, { o: t > 50.35 && t < 51.4 ? 1 : 0, s: pop(t, 50.35, 0.3), r: Math.sin(t * 6) * 10 });
    const kb = p(t, 51.32, 0.55, E.outBounce); set(book, { y: (1 - kb) * -1300, r: lerp(-14, 2, kb), o: t < 51.3 ? 0 : 1, s: 1 + (t > 53.33 ? 0.03 * Math.sin((t - 53.33) * 12) * (1 - p(t, 53.33, 1.5)) : 0) });
    if (bRays) bRays.setAttribute('transform', `rotate(${f1(t * (t > 53.33 ? 50 : 10))} 282 330)`);
    torches.forEach((g, i) => g.setAttribute('transform', `translate(0 ${f1(Math.sin(t * 10 + i) * 4)})`));
    stars.forEach((s, i) => { const on = t > 53.33; const a = t * 2 + i * 1.6; set(s, { x: Math.cos(a) * 40, y: Math.sin(a) * 20, s: on ? 0.8 + Math.sin(t * 9 + i) * 0.25 : 0, r: t * 90, o: on ? 1 : 0 }); });
    popA(her, t, 53.4, { r: -8 });
    const ky = p(t, 54.08, 0.8, E.outCubic); yr.textContent = String(Math.round(lerp(1800, 1828, ky))); set(yrW, { s: pop(t, 54.08, 0.4), r: -6, o: t < 54.08 ? 0 : 1 });
    popA(nov, t, 55.0, { r: 3 });
    au.textContent = typeText('WASHINGTON IRVING', t, 56.3, 24);
    set(auW, { o: t > 56.25 ? 1 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E4D4B0' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const mito = stamp(c, 260, 560, 'MITO', { size: 210, bw: 16, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const qm = bigText(c, 760, 470, 200, '?', { size: 260, color: PINK, z: 41, css: { textShadow: `6px 6px 0 ${INK}` } });
  const mag = box(c, 300, 560, 220, 300, { zIndex: 42 }); mag.innerHTML = svgW(`<path d="M90,150 L140,220" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M90,150 L140,220" stroke="${WOOD}" stroke-width="12" stroke-linecap="round"/><circle cx="66" cy="78" r="60" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="12"/><circle cx="66" cy="78" r="60" fill="none" stroke="${BRASS}" stroke-width="6"/>`, '0 0 170 230');
  const book = box(c, 400, 450, 520, 700, { zIndex: 10 }); book.innerHTML = svgW(irvingBookInner(), '0 0 520 700');
  const bRays = book.querySelector('.rays'), torches = [...book.querySelectorAll('.torch')];
  const auW = box(book, 100, 540, 364, 60, { zIndex: 3 });
  const au = el('div', auW, { left: '0', top: '6px', width: '364px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '38px', color: '#e9c75c', whiteSpace: 'nowrap' }, '');
  const stars = []; [[150, 230], [420, 250], [180, 470], [400, 470]].forEach(q => stars.push(el('div', box(book, q[0], q[1], 1, 1, { zIndex: 4 }), { left: '-30px', top: '-40px', fontSize: '60px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}` }, '✦')));
  const her = chip(c, 560, 700, '¡exagerada!', { size: 40, bg: YEL, color: INK, z: 30 });
  const yrW = box(c, 60, 720, 330, 170, { zIndex: 30, background: INK, border: `6px solid ${YEL}`, borderRadius: '24px', boxShadow: `8px 8px 0 ${SH}` });
  const yr = el('div', yrW, { left: '0', top: '10px', width: '318px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', lineHeight: 1.1, color: YEL }, '1800');
  const nov = chip(c, 400, 1185, 'biografía novelada, 1828', { size: 36, bg: PINK, z: 31 });
}

/* ======================================================================
   S10 · ¡OJO! COLÓN TIENE SU MÉRITO (57.45 – 65.05)  L10
   ====================================================================== */
headline(58.0, 59.9, 'Colón tiene su *mérito*', { size: 84, hlT: 58.96 });
headline(59.9, 62.25, 'Cruzar el Atlántico: una *locura*', { size: 76, hlT: 61.52 });
headline(62.25, 65.05, 'Pero no por lo que te *contaron*', { size: 76, hlT: 63.99 });
{
  const c = scene(57.45, 65.05, t => {
    const ko = p(t, 57.95, 0.35, E.inOutCubic);
    set(ojo, { s: (t < 57.54 ? 0 : lerp(2.3, 1, p(t, 57.54, 0.18))) * lerp(1, 0.5, ko), x: ko * 230, y: ko * -215, r: -8, o: t < 57.54 ? 0 : 1 });
    const kc = p(t, 58.09, 0.45, E.outBack); set(col.d, { y: (1 - kc) * 900 + wobble(t, 0.5, 3), o: t < 58.05 ? 0 : 1 });
    face(col, t, { look: t > 63.9 ? [-3, 4] : t > 62.3 ? [4, 2] : [0, -1], brow: t < 62.3 ? -6 : 6, seed: 0.9 });
    const km = p(t, 58.96, 0.5, E.outBounce); set(med, { y: (1 - km) * -700, r: Math.sin(t * 3) * 6 * (t > 59.4 ? 1 : 0), o: t < 58.9 ? 0 : 1 });
    sp.forEach((s, i) => { const a = t * 3 + i * 2.1; set(s, { x: Math.cos(a) * 90, y: Math.sin(a) * 50, s: t > 59.2 ? 0.7 + Math.sin(t * 8 + i) * 0.3 : 0, r: t * 120 }); });
    const kv = p(t, 59.92, 0.4, E.outBack); set(card, { x: (1 - kv) * 700, r: 3, o: t < 59.9 ? 0 : 1 });
    set(shp, { x: lerp(260, -10, p(t, 60.0, 4, E.linear)), y: Math.sin(t * 4) * 16, r: Math.sin(t * 3.4) * 10 });
    wv.forEach((w2, i) => set(w2, { x: Math.sin(t * 2 + i) * 20 }));
    set(bolt, { o: (t > 61.5 && t < 61.62) || (t > 61.75 && t < 61.85) ? 1 : 0 });
    popA(loc, t, 61.52, { r: -8, s: 1 + 0.1 * Math.sin(t * 10) });
    const kx = p(t, 62.35, 0.4, E.outBack); set(myth, { y: (1 - kx) * 500, r: -2, o: t < 62.3 ? 0 : 1 });
    const ks = p(t, 63.99, 0.3, E.outCubic); strike.style.width = px(430 * ks);
    stampA(no, t, 64.2, -10);
    set(drop, { o: t > 64.1 ? 1 : 0, y: p(t, 64.1, 0.8) * 40 });
  }, { clip: true });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ojo = stamp(c, 300, 560, '¡OJO!', { size: 180, bw: 16, z: 60, bg: 'rgba(255,255,255,.8)', blend: 'normal' });
  const col = mkCol(c, [60, 450, 400, 512]);
  const med = svgBox(c, 210, 800, 110, 179, medalInner(), '0 0 160 260', { zIndex: 20 });
  const sp = []; for (let i = 0; i < 3; i++) sp.push(el('div', box(c, 265, 920, 1, 1, { zIndex: 21 }), { left: '-25px', top: '-35px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}` }, '✦'));
  const card = box(c, 480, 570, 460, 370, { zIndex: 10, background: '#BFB59A', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${SH}`, overflow: 'hidden' });
  box(card, 0, 0, 470, 380, { background: 'linear-gradient(#6f6a5c, #A9A188 60%)' });
  const bolt = svgBox(card, 60, 0, 120, 200, `<path d="M60,0 L20,90 L60,90 L30,200 L110,70 L66,70 L90,0 Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/>`, '0 0 120 200', { zIndex: 3 });
  const shp = box(card, 0, 120, 200, 207, { zIndex: 2 }); shp.innerHTML = `<svg viewBox="0 0 540 560" width="200" height="207" style="overflow:visible"><g transform="translate(540,0) scale(-1,1)"><use href="#shipS" width="540" height="560"/></g></svg>`;
  const wv = [0, 1].map(i => svgBox(card, -60, 0, 600, 380, wavesSvg(600, 280 + i * 30, 2, i ? '#8f8670' : '#9d947c', true, 30 + i), '0 0 600 380', { zIndex: 3 + i }));
  el('div', card, { left: '0', top: '0', width: '470px', background: INK, color: PAPER, fontFamily: 'SpecialElite', fontSize: '34px', textAlign: 'center', padding: '8px 0', zIndex: 6 }, 'EL ATLÁNTICO');
  const loc = chip(c, 600, 900, '¡una locura!', { size: 46, bg: PINK, z: 30 });
  const myth = box(c, 410, 1000, 520, 230, { zIndex: 30, background: '#fff', border: `5px solid ${INK}`, borderRadius: '18px', boxShadow: `8px 8px 0 ${SH}` });
  el('div', myth, { left: '0', top: '14px', width: '510px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: '#7a6a58' }, 'lo que te contaron:');
  el('div', myth, { left: '30px', top: '58px', width: '450px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '50px', lineHeight: 1.05, color: INK }, '«demostró que era redonda»');
  const strike = box(myth, 40, 110, 0, 14, { background: RED, borderRadius: '8px', zIndex: 3, transform: 'rotate(-4deg)' });
  const no = stamp(c, 640, 1170, 'FALSO', { size: 64, bw: 8, z: 35, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const drop = sweatDrop(c, 360, 560, 40);
}

/* ======================================================================
   S11 · FRASE-RESUMEN: FORMA ✓ / TAMAÑO ✗ (65.05 – 71.59) + golpe amarillo SUERTE (71.59 – 73.0)
   ====================================================================== */
headline(65.05, 65.82, 'O *sea*:', { size: 120, hlT: 65.34 });
headline(65.82, 69.1, 'La *forma:* ya se sabía', { size: 84, hlT: 67.69 });
headline(69.1, 71.59, 'El *tamaño:* se equivocó', { size: 84, hlT: 70.19 });
{
  const c = scene(65.05, 71.59, t => {
    const ka = p(t, 65.85, 0.45, E.outBack), kb = p(t, 69.14, 0.45, E.outBack), dim = p(t, 69.14, 0.3);
    set(cA, { x: (1 - ka) * -1100, r: -1.5, o: t < 65.8 ? 0 : lerp(1, 0.6, dim), s: lerp(1, 0.94, dim) });
    set(cB, { x: (1 - kb) * 1100, r: 1.5, o: t < 69.1 ? 0 : 1, s: 1 + 0.04 * p(t, 70.19, 0.3, E.outBack) });
    set(okA, { s: pop(t, 67.69, 0.4), o: t < 67.69 ? 0 : 1, r: -8 });
    set(xB, { s: t < 70.19 ? 0 : lerp(2, 1, p(t, 70.19, 0.18)), o: t < 70.19 ? 0 : 1, r: 6 });
    spinGlobe(gA, t, 40);
    set(rlB, { sx: 1 + 0.25 * Math.sin(t * 6) * (t > 70.1 ? 1 : 0) });
    popA(colS, t, 66.0, { r: -4 + wobble(t, 0.6, 2) });
    face(colF, t, { look: t > 69.1 ? [0, 3] : [3, -2], brow: t > 69.1 ? 6 : -4, seed: 1.7 });
    set(colF.d, { y: wobble(t, 0.6, 3) });
  }, { clip: true });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const mkCard = (y, bg, lbl, sub) => { const d = box(c, 70, y, 940, 220, { zIndex: 10, background: bg, border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 10px 0 ${SH}` }); el('div', d, { left: '230px', top: '26px', fontFamily: 'Rye', fontSize: '62px', color: INK, whiteSpace: 'nowrap' }, lbl); el('div', d, { left: '232px', top: '112px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '64px', color: INK, whiteSpace: 'nowrap' }, sub); return d; };
  const cA = mkCard(450, '#F7F0E0', 'FORMA', 'ya se sabía');
  const gA = mkGlobe(cA, [24, 14, 170, 212]);
  const okA = badge(cA, 760, 40, 140, GCHECK);
  const cB = mkCard(700, YEL, 'TAMAÑO', 'se equivocó');
  const rlB = box(cB, 30, 80, 170, 60, { background: '#E9C77C', border: `4px solid ${INK}`, borderRadius: '6px', backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 20px)`, backgroundSize: '100% 26px', backgroundRepeat: 'no-repeat', transformOrigin: 'left center' });
  const xB = box(cB, 770, 40, 140, 140, { zIndex: 4 }); xB.innerHTML = XSVG;
  const colS = box(c, 600, 940, 330, 300, { zIndex: 12 });
  const colF = mkCol(colS, [40, 0, 230, 294]);
}
colorHit(71.59, 73.0, YEL, c => {
  const t1 = bigText(c, 0, 220, 1080, '…y le salió bien', { size: 96, italic: true, weight: 800, z: 4, css: { textShadow: '4px 4px 0 #fff' } });
  const t2 = bigText(c, 0, 360, 1080, 'POR SUERTE', { size: 132, z: 5, css: { textShadow: '7px 7px 0 #fff' } });
  const cl = box(c, 120, 640, 330, 450, { zIndex: 3 }); cl.innerHTML = cloverSvg(INK);
  const d1 = box(c, 560, 700, 200, 200, { zIndex: 3 }); d1.innerHTML = diceSvg(6);
  const d2 = box(c, 740, 860, 170, 170, { zIndex: 3 }); d2.innerHTML = diceSvg(5);
  const sh = box(c, 300, 1050, 480, 500, { zIndex: 2 }); sh.innerHTML = `<svg viewBox="0 0 540 560" width="480" height="500" style="overflow:visible;filter:brightness(0)"><use href="#shipS" width="540" height="560"/></svg>`;
  return t => {
    set(t1, { s: lerp(1.25, 1, p(t, 71.6, 0.2)), o: 1 });
    const k = p(t, 72.27, 0.18); set(t2, { s: t < 72.2 ? 0 : lerp(1.25, 1, k), o: t < 72.2 ? 0 : 1 }); t2.style.textShadow = glitch(t, 72.43, 0.3) || '7px 7px 0 #fff';
    set(cl, { r: Math.sin(t * 3) * 10, s: pop(t, 71.7, 0.4), y: Math.sin(t * 4) * 10 });
    set(d1, { r: t * 260, s: pop(t, 71.85, 0.35), x: -Math.sin(t * 5) * 20, y: -Math.abs(Math.sin(t * 7)) * 80 });
    set(d2, { r: -t * 300, s: pop(t, 72.0, 0.35), y: -Math.abs(Math.sin(t * 6 + 1)) * 70 });
    set(sh, { y: Math.sin(t * 3) * 10, r: Math.sin(t * 2.5) * 4 });
  };
});

/* ======================================================================
   S12 · CTA: ¿QUÉ OTRO MITO? (73.0 – 75.95)  L12
   ====================================================================== */
headline(73.0, 75.25, '¿Qué otro *mito* del colegio?', { size: 76, hlT: 73.47 });
headline(75.25, 75.95, 'Os *leo*', { size: 110, hlT: 75.45 });
{
  const CM = [];
  const c = scene(73.0, 75.95, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 73, 3, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < 74.6 ? [0, 0] : [-4, 6], bL: t > 73.4 && t < 74.1 ? 10 : 2, bR: t > 73.4 && t < 74.1 ? 14 : 6, noFan: true, noCup: true, seed: 2 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(stack, { y: (1 - p(t, 73.1, 0.4, E.outBack)) * 600, r: -6 });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const stack = box(c, 680, 520, 260, 300, { zIndex: 1 }); stack.innerHTML = svgW(`<use href="#globeS" x="30" y="0" width="200" height="250"/>`, '0 0 260 300');
  const vec = mkVec(c, [120, 400, 640, 793]);
  const cms = [['ERA', '@lucia_4B', '¿y la Tierra plana?', 74.13], ['COL', '@pablito_hist', 'mi profe me mintió 😤', 74.6], ['SAB', '@marinera_88', '¡haz uno de Magallanes!', 75.1]];
  cms.forEach((m, i) => {
    const e = box(c, 230 + (i % 2) * 40, 900 + i * 118, 680, 102, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '52px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 9, 78, m[0], { bw: 3 });
    el('div', e, { left: '104px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '25px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '104px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
  const hd = chip(c, 230, 830, '💬 comentarios', { size: 34, bg: INK, color: '#fff', z: 41 }); CM.push({ e: hd, t: 73.9 });
}

/* ======================================================================
   S13 · Y ESTO… NO VENÍA EN EL LIBRO (75.95 – 78.85)  L13
   ====================================================================== */
headline(75.95, 77.36, 'Y esto…', { size: 130, color: YEL, y: 210, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(77.36, 78.85, '…no venía en el *libro.*', { size: 86, hlT: 78.23 });
{
  const c = scene(75.95, 77.36, t => {
    const k = p(t, 75.95, 1.3, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(77.36, 78.85, t => {
    const k = p(t, 77.92, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 78.22;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    face(stand, t, { look: t > 77.7 ? [6, -5] : [-3, 2], brow: t > 77.7 ? 8 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { x: 270 * p(t, 77.95, 0.35, E.inOutCubic), s: 1.25 * pop(t, 77.37, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 78.23, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    const kh = p(t, 78.23, 0.6, E.outCubic); set(hat, { x: kh * 160, y: -kh * 260 + kh * kh * 200, r: kh * 300, o: closed ? 1 : 0 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">COLÓN</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">capítulo 1</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkCol(bookW, [640, 470, 240, 307]); stand.d.style.zIndex = 2;
  const hat = svgBox(bookW, 690, 560, 120, 70, `<path d="M6,60 C-4,20 30,4 60,4 C90,4 124,20 114,60 Q60,48 6,60 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/><path d="M4,52 Q60,38 116,52 L116,66 Q60,52 4,66 Z" fill="${INK}"/>`, '0 0 120 70', { zIndex: 3 });
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
}

/* ======================================================================
   TARJETA FINAL (78.85 – fin)
   ====================================================================== */
{
  const c = scene(78.85, 999, t => {
    set(lt, { s: pop(t, 79.1, 0.45), o: t < 79.1 ? 0 : 1 }); paint(lhl, t, 79.4, 0.4);
    popA(ttl, t, 79.55, { r: -1 }); popA(src, t, 79.8, { rise: 30 });
    set(shp, { x: lerp(1100, -300, p(t, 79.0, 3.2, E.linear)), y: Math.sin(t * 3) * 6, r: Math.sin(t * 2.4) * 3 });
  }, { cut: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const lt = box(c, 40, 870, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '70px', top: '1115px', width: '940px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '52px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 2 · Colón y la Tierra redonda');
  const src = el('div', c, { left: '90px', top: '1235px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '27px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: Eratóstenes (s. III a. C.) · Washington Irving, biografía de Colón (1828) · historiografía sobre la junta que evaluó el proyecto de Colón');
  const shp = box(c, 0, 1400, 150, 155, { zIndex: 2 }); shp.innerHTML = `<svg viewBox="0 0 540 560" width="150" height="155" style="overflow:visible"><g transform="translate(540,0) scale(-1,1)"><use href="#shipS" width="540" height="560"/></g></svg>`;
}
