/* Ep. 32 · escenas L0–L7 (todo clavado por texto vía K) */
const SHADOW_SPIN = t => 1.2 + t * 0.55; // la sombra del reloj de sol de la portada avanza siempre (bucle: misma fórmula en t=0)
function zzz(pa, x, y, n = 5) { // «Z» que suben y se convierten en «?» rosas
  const Z = [];
  for (let i = 0; i < n; i++) {
    const e = el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, textShadow: `4px 4px 0 rgba(255,255,255,.8)`, zIndex: 30 }, 'Z');
    Z.push(e);
  }
  return t => Z.forEach((e, i) => {
    const ph = ((t * 0.55 + i / n) % 1);
    const q = ph > 0.55;
    e.textContent = q ? '?' : 'Z';
    e.style.color = q ? PINK : INK;
    e.style.textShadow = q ? `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` : `4px 4px 0 rgba(255,255,255,.8)`;
    set(e, { x: ph * 300 + Math.sin(ph * 9 + i) * 30, y: -ph * 520, s: 0.5 + ph * 0.9, r: -14 + Math.sin(ph * 6) * 12, o: clamp(ph * 6) * clamp((1 - ph) * 5) });
  });
}

/* ======================================================================
   A · PORTADA / GANCHO — reloj de sol gigante (sombra ya en marcha) + señor dormido + «¿SIESTA ES UN NÚMERO?»
   ====================================================================== */
{
  let zf;
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, 0, 3.6, E.linear) });
    set(ry, { r: t * 8 });
    dial.setH(SHADOW_SPIN(t));
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1) });
    // ronquido en «duermes»: la cabeza vibra
    const snore = t > K.duermes0 - 0.05 && t < K.duermes0 + 0.7;
    set(man.d, { x: snore ? Math.sin(t * 60) * 5 : 0, y: wobble(t, 0.45, 5) + (snore ? Math.sin(t * 45) * 3 : 0), r: -6 + wobble(t, 0.4, 1) });
    face(man, t, { closed: true, jaw: 0.15 + 0.15 * Math.sin(t * 2.6) + (snore ? 0.35 : 0), seed: 0 });
    zf(t);
    // en «número» cae un «?» gigante sobre el reloj (aún sin respuesta)
    const kq = p(t, K.numero0 - 0.06, 0.45, E.outBounce);
    set(bigQ, { y: (1 - kq) * -900, r: 8 + Math.sin(t * 4) * 4 * kq, s: 1 + 0.06 * Math.sin(t * 6) * kq, o: t < K.numero0 - 0.06 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 70%, rgba(255,230,0,.38), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 230, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 300, 1080, '¿SIESTA ES', { fontSize: '150px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const l2 = BIGT(cam, 0, 460, 1080, `UN ${hlSpan('NÚMERO', 'hn0')}?`, { fontSize: '150px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  l2.querySelector('.hn0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const dial = mkDial(cam, 90, 680, 900, { z: 6 });
  const man = mk(cam, [10, 900, 420, 537], sleeperInner(), '0 0 360 460', 'bust'); man.d.style.zIndex = 12;
  zf = zzz(cam, 300, 960, 5);
  const bigQ = qMark(cam, 610, 690, 300, PINK); bigQ.style.zIndex = 35;
}

/* ======================================================================
   B1 · «Y NO: NO SON LOS MINUTOS QUE DUERMES» — cronómetro «20 MIN» tachado
   ====================================================================== */
headline(S.B1[0], S.B1[1], 'No son *los minutos*', { size: 104, hlT: K.minutos });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    set(sw, { s: pop(t, S.B1[0] + 0.02, 0.45), r: -4 + wobble(t, 0.5, 1.5), o: t < S.B1[0] + 0.02 ? 0 : 1 });
    swh.setAttribute('transform', `rotate(${f1((t - S.B1[0]) * 260)} 200 260)`);
    const kx = p(t, K.minutos + 0.25, 0.22, E.outBack);
    xE.style.transform = `scale(${f1(kx * 100) / 100})`; xE.style.opacity = t > K.minutos + 0.25 ? 1 : 0;
    popA(nope, t, K.duermes1 + 0.1, { r: -6 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.2)', 'rgba(0,0,0,0)', 0);
  const sw = box(c, 240, 470, 600, 690, { zIndex: 6 }); sw.innerHTML = stopwatchSvg();
  const swh = sw.querySelector('.swh');
  const xE = box(c, 260, 560, 560, 560, { zIndex: 8, transformOrigin: '280px 280px' }); xE.innerHTML = XSVG;
  const nope = chip(c, 380, 1170, 'eso no', { size: 56, bg: INK, color: YEL, z: 20 });
}
/* B2 · «OJALÁ» — primer plano: el señor abre un ojo y lo vuelve a cerrar */
headline(S.B2[0], S.B2[1], '*Ojalá.*', { size: 140, hlT: K.ojala });
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(man.d, { s: lerp(1.08, 1, p(t, S.B2[0], 0.4)), y: wobble(t, 0.5, 4), r: -3 });
    const open = t > K.ojala + 0.05 && t < K.ojala + 0.42;
    face(man, t, { closed: !open, blink: false, look: [6, -3], bL: open ? 2 : 0, bR: open ? 16 : 0 });
    lidL.style.opacity = open ? 1 : 0;
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 330, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const man = mk(c, [140, 460, 800, 1022], sleeperInner(), '0 0 360 460', 'bust'); man.d.style.zIndex = 5;
  // solo un ojo abierto: tapamos el izquierdo con su párpado
  const lidL = box(man.d, 0, 0, 800, 1022, { zIndex: 6 });
  lidL.innerHTML = `<svg viewBox="0 0 360 460" width="100%" height="100%" style="overflow:visible"><ellipse cx="156" cy="204" rx="14" ry="11" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><path d="M143,206 q13,6 26,0" stroke="${INK}" stroke-width="2.5" fill="none"/></svg>`;
}

/* ======================================================================
   C · «VIENE DEL LATÍN "SEXTA": LA HORA SEXTA. LO DICE LA RAE.» — ficha de diccionario + sello RAE
   ====================================================================== */
headline(S.C[0], K.lo2 - 0.06, 'Viene del latín *«sexta»*', { size: 92, hlT: K.sexta2 });
headline(K.lo2 - 0.06, S.C[1], 'Lo dice *la RAE*', { size: 104, hlT: K.rae });
{
  const c = scene(S.C[0], S.C[1], t => {
    const k = p(t, S.C[0], 0.4, E.outBack);
    set(card, { y: (1 - k) * 900, r: lerp(8, -2, k) + wobble(t, 0.4, 0.5), s: 1 + 0.08 * p(t, K.sexta2b, 1.4, E.inOutCubic) });
    popA(w1, t, S.C[0] + 0.25, {}); popA(arr, t, K.latin2, {}); popA(w2, t, K.sexta2 - 0.04, { r: -2 });
    popA(w3, t, K.hora2 - 0.04, {});
    paint(hl2, t, K.sexta2b, 0.35);
    stampA(stR, t, K.rae, -9, 1);
    set(lat, { s: pop(t, K.latin2, 0.35), r: 6, o: t < K.latin2 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const card = box(c, 110, 430, 860, 560, { zIndex: 5, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '18px', boxShadow: `14px 16px 0 ${SH}` });
  box(card, 18, 18, 810, 510, { border: `3px dashed rgba(43,33,24,.45)`, borderRadius: '10px' });
  el('div', card, { left: '40px', top: '34px', fontFamily: 'SpecialElite', fontSize: '34px', color: '#7a6a58' }, 'diccionario · s. v.');
  const w1 = el('div', card, { left: '0', top: '90px', width: '846px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', color: INK, lineHeight: 1 }, 'SIESTA');
  const arr = el('div', card, { left: '0', top: '226px', width: '846px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: PINK, lineHeight: 1, textShadow: `3px 3px 0 ${INK}` }, '↑');
  const w2 = el('div', card, { left: '0', top: '300px', width: '846px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '104px', color: RED, lineHeight: 1 }, `lat. ${hlSpan('sexta', 'hl2')}`);
  const hl2 = card.querySelector('.hl2');
  const w3 = el('div', card, { left: '0', top: '420px', width: '846px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '62px', color: INK, lineHeight: 1 }, '[la hora sexta]');
  const lat = chip(c, 650, 400, 'latín', { size: 44, bg: INK, color: YEL, z: 30 });
  const stR = stamp(c, 590, 880, 'RAE', { size: 130, bw: 14, z: 60, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   D1 · «LOS ROMANOS CONTABAN LAS HORAS DESDE EL AMANECER» — romano en la colina; sale el sol
   ====================================================================== */
headline(S.D1[0], K.desde - 0.06, 'Los *romanos* contaban…', { size: 94, hlT: K.romanos });
headline(K.desde - 0.06, S.D1[1], 'desde *el amanecer*', { size: 104, hlT: K.amanecer });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const ks = p(t, K.amanecer - 0.15, 0.9, E.outCubic);
    set(sun, { y: lerp(330, 0, ks), s: 0.9 + 0.1 * ks, r: t * 20 });
    sky.style.opacity = f1(0.25 + 0.75 * ks);
    set(rom.d, { s: pop(t, S.D1[0] + 0.05, 0.45), y: wobble(t, 0.5, 3), o: t < S.D1[0] + 0.05 ? 0 : 1 });
    face(rom, t, { look: t > K.amanecer ? [-8, -4] : [4, 0], bL: t > K.amanecer ? 10 : 2, bR: t > K.amanecer ? 10 : 2, seed: 1.1 });
    // cuenta con los dedos (mano) en «horas»
    set(hand, { s: pop(t, K.horas3 - 0.05, 0.35), r: -10 + Math.sin(t * 6) * 6, o: t < K.horas3 - 0.05 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #CFD9DA 0%, #EADFC8 60%)' });
  const sky = box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(180deg, #F6C98E 0%, #F9E3B8 45%, rgba(234,223,200,0) 70%)' });
  const sunW = box(c, 160, 760, 220, 220, { zIndex: 1 }); const sun = box(sunW, 0, 0, 220, 220); sun.innerHTML = sunSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 2 }).innerHTML = hillSvg();
  const rom = mk(c, [470, 560, 440, 562], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 5;
  const hand = box(c, 800, 600, 160, 160, { zIndex: 6 }); hand.innerHTML = `<svg viewBox="-70 -80 140 140" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, -20, 1.0)}</svg>`;
}
/* D2 · «PRIMERA, SEGUNDA...» — en el reloj de sol se encienden I, II… */
headline(S.D2[0], S.D2[1], '*primera*, segunda…', { size: 104, hlT: K.primera });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    const kz = p(t, S.D2[0], 0.45, E.outCubic);
    set(cam, { s: lerp(1.25, 1.05, kz) + 0.03 * p(t, S.D2[0], 2, E.linear) });
    const h = clamp((t - (K.primera - 0.15)) / ((K.segunda - K.primera) || 1), 0, 2.6);
    dial.setH(Math.max(0.15, h));
    for (let k = 1; k <= 12; k++) { const on = (k === 1 && t > K.primera - 0.05) || (k === 2 && t > K.segunda - 0.05); dial.lit(k, on); dial.dim(k, k > 3); }
    dial.nm[3].style.opacity = t > K.segunda + 0.45 ? 1 : 0.25;
    popA(c1, t, K.primera - 0.03, { r: -5 }); popA(c2, t, K.segunda - 0.03, { r: 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  rays(cam, -160, 160, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const dial = mkDial(cam, 60, 470, 960, { z: 4, label: 'HORAS ROMANAS' });
  const c1 = chip(cam, 90, 410, '1.ª hora', { size: 50, bg: YEL, color: INK, z: 20 });
  const c2 = chip(cam, 300, 330, '2.ª hora', { size: 50, bg: YEL, color: INK, z: 20 });
}

/* ======================================================================
   E1 · «SI AMANECE A LAS SEIS...» — sale el sol por la izquierda con «6:00»
   ====================================================================== */
headline(S.E1[0], S.E1[1], 'Si amanece *a las seis*…', { size: 98, hlT: K.seis });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    const ks = p(t, S.E1[0], 1.1, E.outCubic);
    set(sun, { x: lerp(-60, 120, ks), y: lerp(240, -40, ks), r: t * 25 });
    dial.setH(0.05 + 0.4 * p(t, K.seis, 0.8));
    dial.lit(1, false); dial.lit(6, false);
    for (let k = 1; k <= 12; k++) dial.dim(k, false);
    stampA(six, t, K.seis, -6, 1);
    set(ck.d, { s: pop(t, K.seis + 0.1, 0.4), r: 4, o: t < K.seis + 0.1 ? 0 : 1 }); ck.setH(6);
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6C98E 0%, #F3E2C0 50%, #EADFC8 100%)' });
  const sunW = box(c, 40, 760, 240, 240, { zIndex: 2 }); const sun = box(sunW, 0, 0, 240, 240); sun.innerHTML = sunSvg();
  const dial = mkDial(c, 140, 560, 800, { z: 4 });
  box(c, 0, 1100, 1080, 820, { zIndex: 5, background: '#B9A27E', borderTop: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 3px, transparent 3px 70px)' });
  const six = stamp(c, 140, 470, '6:00', { size: 120, bw: 13, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal', col: INK });
  const ck = mkClock(c, 640, 1110, 230, { z: 8 });
}
/* E2 · «...LA SEXTA CAE A MEDIODÍA» — reloj de sol en VI y reloj de pared en 12:00 + sello «VI = 12:00» */
headline(S.E2[0], S.E2[1], 'la sexta cae *a mediodía*', { size: 92, hlT: K.mediodia4 });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    const kd = p(t, K.sexta4 - 0.2, K.mediodia4 - K.sexta4 + 0.3, E.inOutCubic);
    dial.setH(lerp(2.2, 6, kd));
    for (let k = 1; k <= 12; k++) { dial.lit(k, k === 6 && t > K.mediodia4 - 0.05, RED); dial.dim(k, false); }
    ck.setH(lerp(8.2, 12, kd));
    set(ck.d, { s: pop(t, S.E2[0] + 0.05, 0.4), r: wobble(t, 0.5, 2), o: t < S.E2[0] + 0.05 ? 0 : 1 });
    stampA(st, t, K.mediodia4 + 0.05, -6, 1);
    set(sun, { r: t * 30, s: 1 + 0.08 * Math.sin(t * 5) });
    popA(lab, t, K.sexta4 - 0.05, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 200, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const sun = box(c, 450, 340, 180, 180, { zIndex: 3 }); sun.innerHTML = sunSvg();
  const dial = mkDial(c, 40, 470, 620, { z: 4 });
  const ck = mkClock(c, 640, 560, 380, { z: 6 });
  const lab = chip(c, 140, 870, 'hora sexta', { size: 48, bg: INK, color: YEL, z: 20 });
  const st = stamp(c, 210, 990, 'VI = 12:00', { size: 128, bw: 15, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F1 · «Y DESCANSAR A LA SEXTA...» — el romano bosteza y se tumba a la sombra
   ====================================================================== */
headline(S.F1[0], S.F1[1], 'Y descansar *a la sexta*…', { size: 94, hlT: K.sexta5 });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const ky = p(t, K.descansar, 0.5, E.inOutCubic), kl = p(t, K.sexta5 + 0.2, 0.6, E.inOutCubic);
    set(rom.d, { r: -kl * 80, x: -kl * 60, y: kl * 300 + wobble(t, 0.5, 3) });
    face(rom, t, { jaw: ky * (1 - kl * 0.6) * 0.9, closed: ky > 0.5, bL: 12 * ky, bR: 12 * ky, seed: 1.1 });
    zf(t);
    set(zW, { o: kl });
    dial.setH(6);
    for (let k = 1; k <= 12; k++) { dial.lit(k, k === 6, YEL); dial.dim(k, k !== 6); }
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const dial = mkDial(c, 60, 400, 960, { z: 3 });
  box(c, 0, 1060, 1080, 860, { zIndex: 4, background: '#B9A27E', borderTop: `6px solid ${INK}` });
  box(c, 300, 1040, 640, 70, { zIndex: 4, background: 'rgba(43,33,24,.35)', borderRadius: '50%' });
  const rom = mk(c, [400, 620, 420, 537], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 6; rom.d.style.transformOrigin = '210px 500px';
  const zW = box(c, 0, 0, 1080, 1920, { zIndex: 8 }); const zf = zzz(zW, 640, 820, 4);
}
/* F2 · «...ACABÓ SIENDO "ECHAR LA SIESTA"» — el señor de la portada en la hamaca + SEXTA → SIESTA */
headline(S.F2[0], S.F2[1], 'acabó siendo *«echar la siesta»*', { size: 82, hlT: K.siesta5 });
{
  const LT = [];
  const c = scene(S.F2[0], S.F2[1], t => {
    set(hm, { r: Math.sin(t * 2.2) * 2.5 });
    set(man.d, { r: -12 + Math.sin(t * 2.2) * 3, y: wobble(t, 0.5, 4) });
    face(man, t, { closed: true, jaw: 0.2, seed: 0 });
    // SEXTA → SIESTA: la X gira y se vuelve S; entra una I
    const km = p(t, K.siesta5 - 0.35, 0.45, E.inOutCubic);
    LT.forEach(L => {
      const x = lerp(L.x0, L.x1, km);
      let s = 1, r = L.r, o = 1, txt = L.a;
      if (L.morph) { const sp = Math.abs(Math.cos(km * Math.PI)); s = 1; L.e.style.transform; txt = km < 0.5 ? L.a : L.b; set(L.e, { x, s: 1, r: r, o: 1 }); L.e.style.transform += ` scaleX(${f1(Math.max(0.05, sp) * 100) / 100})`; L.e.textContent = txt; L.e.style.background = km >= 0.5 ? YEL : '#fff'; return; }
      if (L.ins) { s = km; o = km > 0.02 ? 1 : 0; }
      set(L.e, { x, s, r, o });
      L.e.style.background = L.ins && km > 0.5 ? YEL : '#fff';
    });
    popA(bub, t, S.F2[0] + 0.05, { r: -2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  box(c, 0, 1180, 1080, 740, { zIndex: 1, background: '#B9A27E', borderTop: `6px solid ${INK}` });
  const hm = box(c, 90, 760, 900, 520, { zIndex: 5, transformOrigin: '450px 100px' }); hm.innerHTML = hammockSvg();
  const man = mk(c, [340, 650, 380, 486], sleeperInner(), '0 0 360 460', 'bust'); man.d.style.zIndex = 4;
  // la tela de la hamaca por delante del busto
  const front = box(c, 90, 760, 900, 520, { zIndex: 6, transformOrigin: '450px 100px' }); front.innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="6"/><path d="M260,400 q10,30 0,50 M450,420 q10,30 0,40 M640,400 q10,30 0,50" stroke="${RED}" stroke-width="14" opacity=".75" fill="none"/></svg>`;
  const bub = box(c, 70, 410, 940, 210, { zIndex: 20, background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', boxShadow: `8px 9px 0 ${SH}` });
  // fichas: S E X T A  →  S I E S T A
  const TW = 130, G = 12;
  const pos6 = i => 470 - 3 * (TW + G) + i * (TW + G) + G / 2 - 70; // x final (6 letras)
  const pos5 = i => 470 - 2.5 * (TW + G) + i * (TW + G) + G / 2 - 70;
  const mkL = (ch, x) => el('div', bub, { left: '0', top: '22px', width: TW + 'px', height: '154px', lineHeight: '154px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', color: INK, background: '#fff', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `6px 7px 0 ${SH}` }, ch);
  // S(0→0) I(ins→1) E(1→2) X→S(2→3) T(3→4) A(4→5)
  [['S', 0, 0], ['E', 1, 2], ['X', 2, 3, 'S'], ['T', 3, 4], ['A', 4, 5]].forEach(([a, i5, i6, b], k) => { const e = mkL(a); LT.push({ e, a, b, x0: pos5(i5), x1: pos6(i6), r: [-4, 3, -2, 4, -3][k], morph: !!b }); });
  { const e = mkL('I'); LT.push({ e, a: 'I', x0: pos6(1), x1: pos6(1), r: 5, ins: true }); }
}

/* ======================================================================
   G0 · GOLPE AMARILLO: «AHORA, LO BUENO:»
   ====================================================================== */
colorHit(S.G0[0], S.G0[1], YEL, c => {
  const a = el('div', c, { left: 0, top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '110px', color: INK, zIndex: 10 }, 'Ahora,');
  const b = el('div', c, { left: 0, top: '660px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: 1, color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10, whiteSpace: 'nowrap' }, 'LO BUENO');
  const r = rays(c, -160, 300, 1400, 24, 'rgba(255,62,165,.18)', 'rgba(0,0,0,0)', 2);
  return t => {
    set(r, { r: t * 20 });
    popA(a, t, K.ahora - 0.04, { rise: 30 });
    const kb = p(t, K.bueno - 0.05, 0.22, E.outBack);
    set(b, { s: t < K.bueno - 0.05 ? 0 : lerp(1.7, 1, kb), r: -3, o: t < K.bueno - 0.05 ? 0 : 1 });
    b.style.textShadow = (glitch(t, K.bueno, 0.25) ? glitch(t, K.bueno, 0.25) + ', ' : '') + OUTL(INK, 10);
  };
});

/* ======================================================================
   G1 · «MEDIODÍA, EN INGLÉS, ES "NOON"» — Londres en niebla y el letrero de pub NOON
   ====================================================================== */
headline(S.G1[0], K.es6 - 0.06, 'Mediodía, *en inglés*…', { size: 100, hlT: K.ingles });
headline(K.es6 - 0.06, S.G1[1], 'es…', { size: 110 });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const tl = t - S.G1[0];
    set(fogA, { x: -tl * 30 }); set(fogB, { x: tl * 22 });
    set(cam, { s: 1 + 0.04 * p(t, S.G1[0], 3.8, E.linear) });
    const ks = p(t, K.nun6 - 0.1, 0.6, E.outElastic);
    set(sg, { y: (1 - clamp(ks)) * -800, r: Math.sin((t - K.nun6) * 5) * 6 * Math.exp(-Math.max(0, t - K.nun6) * 1.3), o: t < K.nun6 - 0.1 ? 0 : 1 });
    set(en.d, { s: pop(t, S.G1[0] + 0.1, 0.4), y: wobble(t, 0.6, 3), o: t < S.G1[0] + 0.1 ? 0 : 1 });
    face(en, t, { look: t > K.nun6 ? [6, -6] : [4, 0], bL: t > K.nun6 ? 10 : 2, bR: t > K.nun6 ? 10 : 2, seed: 2, jaw: t > K.nun6 && t < K.nun6 + 0.5 ? 0.5 : 0 });
    popA(chE, t, K.ingles - 0.03, { r: -4 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #B9BDB6 0%, #D9D6CB 60%)' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = londonSvg();
  const fogA = box(cam, -200, 900, 1500, 300, { zIndex: 8, background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,.55), rgba(255,255,255,0) 60%), radial-gradient(ellipse at 80% 40%, rgba(255,255,255,.45), rgba(255,255,255,0) 55%)' });
  const fogB = box(cam, -300, 520, 1600, 260, { zIndex: 2, background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.5), rgba(255,255,255,0) 60%)' });
  const en = mk(cam, [470, 900, 330, 422], englishInner(), '0 0 360 460', 'bust'); en.d.style.zIndex = 6;
  const sg = box(cam, 90, 380, 560, 520, { zIndex: 10, transformOrigin: '280px 40px' }); sg.innerHTML = pubSignSvg();
  el('div', sg, { left: '60px', top: '200px', width: '440px', textAlign: 'center', fontFamily: 'Rye', fontSize: '150px', lineHeight: 1, color: GOLD, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 3 }, 'NOON');
  const chE = chip(cam, 610, 470, 'en inglés', { size: 46, bg: INK, color: YEL, z: 30 });
}
/* G2 · «Y VIENE DE "NONA"» — el letrero gira: por detrás, NONA cincelado en piedra */
headline(S.G2[0], S.G2[1], 'y viene de *«nona»*', { size: 104, hlT: K.nona6 });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    const kf = p(t, K.nona6 - 0.12, 0.4, E.inOutCubic), sx = Math.cos(kf * Math.PI);
    flipIn.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
    fA.style.display = sx > 0 ? '' : 'none'; fB.style.display = sx > 0 ? 'none' : '';
    set(flip, { r: Math.sin(t * 3) * 1.5, s: 1 + 0.04 * p(t, S.G2[0], 1, E.linear) });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #B9BDB6 0%, #D9D6CB 60%)' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, opacity: 0.55 }).innerHTML = londonSvg();
  const flip = box(c, 140, 420, 800, 560, { zIndex: 10 });
  const flipIn = box(flip, 0, 0, 800, 560, { transformOrigin: '400px 280px' });
  const fA = box(flipIn, 120, 0, 560, 520); fA.innerHTML = pubSignSvg();
  el('div', fA, { left: '60px', top: '200px', width: '440px', textAlign: 'center', fontFamily: 'Rye', fontSize: '150px', lineHeight: 1, color: GOLD, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` }, 'NOON');
  const fB = box(flipIn, 0, 60, 800, 460);
  romanSlab(fB, 0, 0, 800, 460, { seed: 41, z: 1 });
  el('div', fB, { left: '0', top: '50px', width: '800px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '42px', color: INK, zIndex: 3 }, '— latín —');
  el('div', fB, { left: '0', top: '130px', width: '800px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: 1, letterSpacing: '0.08em', color: '#5a5248', textShadow: `3px 3px 0 #fff, -2px -2px 0 rgba(43,33,24,.6)`, zIndex: 3 }, 'NONA');
}
/* G3 · «LA HORA NOVENA» — IX en el reloj de sol romano */
headline(S.G3[0], S.G3[1], 'la hora *novena*', { size: 110, hlT: K.novena });
{
  const c = scene(S.G3[0], S.G3[1], t => {
    set(slab, { s: lerp(1, 0.62, p(t, S.G3[0], 0.4, E.inOutCubic)), y: lerp(0, -170, p(t, S.G3[0], 0.4, E.inOutCubic)) });
    set(dial.d, { y: (1 - p(t, S.G3[0] + 0.05, 0.4, E.outBack)) * 900 });
    dial.setH(lerp(6, 9, p(t, K.novena - 0.45, 0.6, E.inOutCubic)));
    for (let k = 1; k <= 12; k++) { dial.lit(k, k === 9 && t > K.novena - 0.05, PINK); dial.dim(k, k !== 9 && k !== 6); }
    stampA(st9, t, K.novena + 0.05, 6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D8D6C4', backgroundImage: 'linear-gradient(180deg, #C9CCC6 0%, #E1DCCB 70%)' });
  const slab = box(c, 140, 400, 800, 460, { zIndex: 4, transformOrigin: '400px 0px' });
  romanSlab(slab, 0, 0, 800, 460, { seed: 41, z: 1 });
  el('div', slab, { left: '0', top: '130px', width: '800px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: 1, letterSpacing: '0.08em', color: '#5a5248', textShadow: `3px 3px 0 #fff, -2px -2px 0 rgba(43,33,24,.6)`, zIndex: 3 }, 'NONA');
  const dial = mkDial(c, 90, 720, 900, { z: 6 });
  const st9 = stamp(c, 520, 1060, '9.ª hora', { size: 84, bw: 11, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   H1 · «MÁS O MENOS...» — la sombra del reloj de sol avanza de VI a IX
   ====================================================================== */
headline(S.H1[0], S.H1[1], 'Más o *menos*…', { size: 116, hlT: K.menos });
{
  const c = scene(S.H1[0], S.H1[1], t => {
    set(cam, { s: 1.04 + 0.08 * p(t, S.H1[0], 1.6, E.inOutCubic) });
    dial.setH(lerp(6, 9, p(t, S.H1[0] + 0.1, 1.2, E.inOutCubic)));
    for (let k = 1; k <= 12; k++) { dial.lit(k, (k === 6) || (k === 9 && t > S.H1[0] + 1.1), k === 9 ? PINK : YEL); dial.dim(k, k !== 6 && k !== 9); }
    set(arc, { o: 1 }); arcP.style.strokeDashoffset = f1(1000 * (1 - p(t, S.H1[0] + 0.1, 1.2, E.inOutCubic)));
    popA(tN, t, S.H1[0] + 0.15, { r: -4 }); popA(tS, t, S.H1[0] + 0.05, { r: 3 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#EFE1C6' });
  rays(cam, -160, 300, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const dial = mkDial(cam, 60, 500, 960, { z: 4 });
  const arc = box(cam, 60, 500, 960, 624, { zIndex: 5 });
  arc.innerHTML = `<svg viewBox="0 0 800 520" width="100%" height="100%" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M400,170 A270,270 0 0 1 591,249" stroke="${PINK}" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`;
  const arcP = arc.querySelector('path');
  const tS = chip(cam, 300, 410, 'sexta', { size: 46, bg: YEL, color: INK, z: 20 });
  const tN = chip(cam, 760, 640, 'nona', { size: 46, bg: PINK, z: 20 });
}
/* H2 · «...LAS TRES DE LA TARDE» — esfera del Big Ben a las 3 + sello «≈ 15:00» */
headline(S.H2[0], S.H2[1], 'las tres *de la tarde*', { size: 104, hlT: K.tarde7 });
{
  const c = scene(S.H2[0], S.H2[1], t => {
    set(ck.d, { s: lerp(1.4, 1, p(t, S.H2[0], 0.35, E.outCubic)), r: wobble(t, 0.5, 1) });
    ck.setH(lerp(2.6, 3, p(t, S.H2[0], 0.3, E.outCubic)));
    stampA(st, t, K.tres7 + 0.02, -7, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#B9BDB6' });
  box(c, 120, 360, 840, 1100, { zIndex: 1, background: '#D6C9AC', border: `7px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 3px, transparent 3px 60px)' });
  const ck = mkClock(c, 180, 420, 720, { z: 4, roman: true, face: '#FBF6EA' });
  const st = stamp(c, 230, 1000, '≈ 15:00', { size: 150, bw: 16, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}
