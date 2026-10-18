/* Ep. 39 · escenas L0–L4 (todo clavado por texto vía K) — reutiliza figuras del Ep. 32 */
const SHADOW_SPIN = t => 1.2 + t * 0.55;
function zzz(pa, x, y, n = 5, sz = 150) { // «Z» que suben y se convierten en «?» rosas
  const Z = [];
  for (let i = 0; i < n; i++) Z.push(el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: INK, textShadow: `4px 4px 0 rgba(255,255,255,.8)`, zIndex: 30 }, 'Z'));
  return (t, noQ) => Z.forEach((e, i) => {
    const ph = ((t * 0.55 + i / n) % 1), q = !noQ && ph > 0.55;
    e.textContent = q ? '?' : 'Z';
    e.style.color = q ? PINK : INK;
    e.style.textShadow = q ? `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` : `4px 4px 0 rgba(255,255,255,.8)`;
    set(e, { x: ph * 240 + Math.sin(ph * 9 + i) * 30, y: -ph * (pa.zR || 420), s: 0.75 + ph * 0.6, r: -14 + Math.sin(ph * 6) * 12, o: clamp(ph * 6) * clamp((1 - ph) * 5) });
  });
}
// número romano de piedra (HTML): relleno piedra, trazo tinta y recorte blanco
function stoneNum(pa, x, y, w, txt, sz, o = {}) {
  const d = box(pa, x, y, w, sz * 1.05, { zIndex: o.z || 8 });
  const base = { left: 0, top: 0, width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, letterSpacing: '0.02em' };
  el('div', d, Object.assign({}, base, { color: '#fff', WebkitTextStroke: `${Math.round(sz * 0.07)}px #fff`, textShadow: `${Math.round(sz * 0.035)}px ${Math.round(sz * 0.04)}px 0 ${SH}` }), txt);
  el('div', d, Object.assign({}, base, { color: o.col || STONE, WebkitTextStroke: `${Math.round(sz * 0.022)}px ${INK}` }), txt);
  el('div', d, Object.assign({}, base, { color: 'transparent', backgroundImage: 'repeating-linear-gradient(135deg, rgba(43,33,24,.22) 0 3px, transparent 3px 11px)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }), txt);
  return d;
}

/* ======================================================================
   TITULARES DE PASO (plantilla Napoleón): «1 · …» grande, numerado, aguanta TODO el paso
   ====================================================================== */
const STEPHDR = [];
function stepHeader(t0, t1, n, html, hlT) {
  const b = box(world, 50, 184, 980, 222, { zIndex: 520, transformOrigin: '120px 110px' });
  box(b, 0, 0, 980, 222, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 ${SH}` });
  box(b, 14, 14, 952, 194, { border: `3px dashed rgba(43,33,24,.35)`, borderRadius: '22px' });
  const badge = box(b, 24, 22, 178, 178, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `7px 7px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '138px', lineHeight: '156px', color: INK, zIndex: 3 }, String(n));
  const txt = el('div', b, { left: '232px', top: '26px', width: '730px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: 1.1, color: INK, zIndex: 2 }, html);
  STEPHDR.push({ b, badge, txt, t0, t1, hl: b.querySelector('.shl'), hlT });
}
function updSteps(t) {
  STEPHDR.forEach(h => {
    const vis = t >= h.t0 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    const k = p(t, h.t0, 0.32, E.outBack);
    set(h.b, { y: (1 - k) * -330, r: wobble(t, 0.35, 0.4), o: 1 - p(t, h.t1 - 0.1, 0.1, E.inCubic) });
    const kb = p(t, h.t0 + 0.12, 0.22, E.outCubic);
    set(h.badge, { s: lerp(2.0, 1, kb) * (1 + 0.04 * Math.sin(t * 3)), r: lerp(-30, -6, kb) });
    paint(h.hl, t, h.hlT, 0.35);
  });
}
stepHeader(STEPS[0][0], STEPS[0][1], 1, `Contaban desde<br>${hlSpan('el amanecer', 'shl')}`, K.sino);
stepHeader(STEPS[1][0], STEPS[1][1], 2, `La sexta =<br>${hlSpan('las 12', 'shl')} del mediodía`, K.doce5);
stepHeader(STEPS[2][0], STEPS[2][1], 3, `Descansar<br>${hlSpan('en la sexta', 'shl')}`, K.sexta6);

/* ======================================================================
   TÍTULO DE PORTADA (global, aguanta todo el gancho): «¿SIESTA ES UN NÚMERO?»
   ====================================================================== */
const T_L1 = BIGT(world, 0, 318, 1080, '¿SIESTA ES', { fontSize: '134px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 540 });
const T_L2 = BIGT(world, 0, 462, 1080, `UN ${hlSpan('NÚMERO', 'hn0')}?`, { fontSize: '134px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 540 });
T_L2.querySelector('.hn0').style.transform = 'scaleX(1) rotate(-1.2deg)';
function updTitle(t) {
  const vis = t < S.A2[1]; T_L1.style.display = T_L2.style.display = vis ? '' : 'none'; if (!vis) return;
  const ko = p(t, S.A2[1] - 0.12, 0.12, E.inCubic);
  set(T_L1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3.2), o: 1 - ko });
  set(T_L2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1), o: 1 - ko });
}

/* ======================================================================
   A · PORTADA / GANCHO — un VI de piedra GIGANTE con el señor dormido apoyado (Z → ?)
   ====================================================================== */
{
  let zf;
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, 0, 3, E.linear) });
    set(ry, { r: t * 8 });
    set(vi, { r: -3 + wobble(t, 0.5, 1.2), s: 1 + 0.02 * Math.sin(t * 2.6) });
    set(man.d, { y: wobble(t, 0.45, 5), r: -6 + wobble(t, 0.4, 1) });
    face(man, t, { closed: true, jaw: 0.15 + 0.15 * Math.sin(t * 2.6), seed: 0 });
    zf(t);
    const kq = p(t, K.numero0 - 0.06, 0.45, E.outBounce);
    set(bigQ, { y: (1 - kq) * -900, r: 10 + Math.sin(t * 4) * 4 * kq, o: t < K.numero0 - 0.06 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 55% 62%, rgba(255,230,0,.42), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 340, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  const vi = stoneNum(cam, 300, 640, 640, 'VI', 560, { z: 6 });
  const man = mk(cam, [40, 860, 400, 511], sleeperInner(true), '0 0 360 460', 'bust'); man.d.style.zIndex = 12;
  zf = zzz(cam, 250, 1060, 4, 140);
  const bigQ = qMark(cam, 760, 600, 230, PINK); bigQ.style.zIndex = 35;
}
/* A2 · «Y TE LO ECHAS CASI TODOS LOS DÍAS» — hamaca + semana con 6 de 7 días marcados */
{
  const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const DC = [];
  const c = scene(S.A2[0], S.A2[1], t => {
    set(hm, { r: Math.sin(t * 2.2) * 2.5 }); set(front, { r: Math.sin(t * 2.2) * 2.5 });
    set(man.d, { r: -12 + Math.sin(t * 2.2) * 3, y: wobble(t, 0.5, 4) });
    face(man, t, { closed: true, jaw: 0.2, seed: 0 });
    zf(t, true);
    const tk = [K.casi0, K.casi0 + 0.12, K.todos0, K.todos0 + 0.12, K.dias0 - 0.1, K.dias0 + 0.05];
    DC.forEach((d, i) => {
      set(d.b, { s: pop(t, S.A2[0] + 0.05 + i * 0.05, 0.3), o: t < S.A2[0] + 0.05 + i * 0.05 ? 0 : 1 });
      if (i < 6) set(d.ck, { s: pop(t, tk[i], 0.3), o: t < tk[i] ? 0 : 1 });
    });
    popA(casi, t, K.dias0 + 0.25, { r: -5 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const hm = box(c, 90, 700, 900, 520, { zIndex: 5, transformOrigin: '450px 100px' }); hm.innerHTML = hammockSvg();
  const man = mk(c, [340, 600, 380, 486], sleeperInner(true), '0 0 360 460', 'bust'); man.d.style.zIndex = 4;
  const front = box(c, 90, 700, 900, 520, { zIndex: 6, transformOrigin: '450px 100px' }); front.innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="6"/></svg>`;
  const zW = box(c, 0, 0, 1080, 1920, { zIndex: 8 }); zW.zR = 200; const zf = zzz(zW, 600, 860, 3, 100);
  DAYS.forEach((dd, i) => {
    const b = box(c, 150 + i * 112, 1170, 100, 130, { zIndex: 10, background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '14px', boxShadow: `6px 6px 0 ${SH}` });
    box(b, 0, 0, 90, 34, { background: RED, borderBottom: `4px solid ${INK}`, borderRadius: '9px 9px 0 0' });
    el('div', b, { left: 0, top: '38px', width: '90px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', lineHeight: 1, color: INK }, dd);
    const ck = box(b, 6, 20, 84, 84, { zIndex: 3 }); ck.innerHTML = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="#fff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="${PINK}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
    DC.push({ b, ck });
  });
  const casi = chip(c, 700, 1090, '…casi', { size: 50, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   B1 · «VIENE DEL LATÍN "SEXTA"» — ficha de diccionario (sin sello: la RAE va en el «Ojo»)
   ====================================================================== */
headline(S.B1[0], S.B2[1], 'Viene del latín *«sexta»*', { size: 92, hlT: K.sexta1 });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    const k = p(t, S.B1[0], 0.4, E.outBack);
    set(card, { y: (1 - k) * 900, r: lerp(8, -2, k) + wobble(t, 0.4, 0.5), s: 1 + 0.06 * p(t, K.sexta1, 1.2, E.inOutCubic) });
    popA(w1, t, S.B1[0] + 0.2, {}); popA(arr, t, K.latin1, {}); popA(w2, t, K.sexta1 - 0.04, { r: -2 });
    paint(hl2, t, K.sexta1 + 0.1, 0.35);
    popA(lat, t, K.latin1, { r: 6 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const card = box(c, 130, 420, 820, 470, { zIndex: 5, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '18px', boxShadow: `14px 16px 0 ${SH}` });
  box(card, 18, 18, 770, 420, { border: `3px dashed rgba(43,33,24,.45)`, borderRadius: '10px' });
  el('div', card, { left: '40px', top: '34px', fontFamily: 'SpecialElite', fontSize: '34px', color: '#7a6a58' }, 'diccionario · s. v.');
  const w1 = el('div', card, { left: '0', top: '90px', width: '806px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', color: INK, lineHeight: 1 }, 'SIESTA');
  const arr = box(card, 368, 226, 70, 70, {}); arr.innerHTML = `<svg width="70" height="70" style="overflow:visible"><path d="M35,64 V10 M12,32 L35,8 L58,32" stroke="${INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M35,64 V10 M12,32 L35,8 L58,32" stroke="${PINK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const w2 = el('div', card, { left: '0', top: '300px', width: '806px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', color: RED, lineHeight: 1 }, `lat. ${hlSpan('sexta', 'hl2')}`);
  const hl2 = card.querySelector('.hl2');
  const lat = chip(c, 640, 380, 'latín', { size: 46, bg: INK, color: YEL, z: 30 });
}
/* B2 · «LA HORA SEXTA DE LOS ROMANOS» — romano junto al reloj de sol con el VI encendido */
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(dial.d, { y: (1 - p(t, S.B2[0], 0.35, E.outBack)) * 600 });
    dial.setH(lerp(4.5, 6, p(t, K.sexta1b - 0.3, 0.5, E.inOutCubic)));
    for (let k = 1; k <= 12; k++) { dial.lit(k, k === 6 && t > K.sexta1b - 0.05, YEL); dial.dim(k, k !== 6); }
    popA(lab, t, K.sexta1b - 0.04, { r: -4 });
    set(rom.d, { s: pop(t, K.romanos1 - 0.1, 0.4), y: wobble(t, 0.5, 3), o: t < K.romanos1 - 0.1 ? 0 : 1 });
    face(rom, t, { look: [-6, -2], bL: 8, bR: 8, seed: 1.1, jaw: t > K.romanos1 && t < K.romanos1 + 0.5 ? 0.4 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const dial = mkDial(c, 130, 430, 820, { z: 4, label: 'HORAS ROMANAS' });
  const lab = chip(c, 350, 392, 'hora sexta = VI', { size: 52, bg: INK, color: YEL, z: 20 });
  const rom = mk(c, [560, 900, 360, 460], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 6;
}

/* ======================================================================
   Q · «¿Y POR QUÉ UNA HORA SE LLAMABA "SEXTA"?» — reloj con la etiqueta SEXTA y «?»
   ====================================================================== */
headline(S.Q[0], S.Q[1], '¿Por qué una hora se llamaba *«sexta»*?', { size: 84, hlT: K.sexta3 });
{
  const c = scene(S.Q[0], S.Q[1], t => {
    set(ck.d, { s: pop(t, S.Q[0] + 0.05, 0.4), r: wobble(t, 0.6, 3), o: t < S.Q[0] + 0.05 ? 0 : 1 });
    ck.setH(6 + (t - S.Q[0]) * 2.4);
    const kt = p(t, K.sexta3 - 0.1, 0.5, E.outElastic);
    set(tag, { y: (1 - clamp(kt)) * -300, r: Math.sin((t - K.sexta3) * 5) * 8 * Math.exp(-Math.max(0, t - K.sexta3) * 1.4), o: t < K.sexta3 - 0.1 ? 0 : 1 });
    QM.forEach((q, i) => set(q, { s: pop(t, K.hora3 + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 10, o: t < K.hora3 + i * 0.12 ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.2)', 'rgba(0,0,0,0)', 0);
  const ck = mkClock(c, 300, 520, 480, { z: 6, roman: true });
  const tag = box(c, 580, 860, 330, 200, { zIndex: 10, transformOrigin: '40px 0px' });
  tag.innerHTML = `<svg width="330" height="200" style="overflow:visible"><path d="M40,0 L70,60" stroke="${INK}" stroke-width="5"/>${cut('<rect x="30" y="56" width="290" height="130" rx="18"/>', 6, 8)}<rect x="30" y="56" width="290" height="130" rx="18" fill="${YEL}" stroke="${INK}" stroke-width="6"/><circle cx="64" cy="90" r="9" fill="#fff" stroke="${INK}" stroke-width="4"/><text x="186" y="150" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="78" fill="${INK}">SEXTA</text></svg>`;
  const QM = [[150, 560], [820, 470], [150, 800]].map((q, i) => qMark(c, q[0], q[1], 140, i % 2 ? YEL : PINK));
}
/* N3 · «EN TRES PASOS» — tres cartas 1 · 2 · 3 */
headline(S.N3[0], S.N3[1], 'En *tres* pasos', { size: 112, hlT: K.tres3 });
{
  const CD = [];
  const c = scene(S.N3[0], S.N3[1], t => {
    CD.forEach((d, i) => { const t0 = S.N3[0] + 0.04 + i * 0.12; set(d, { s: pop(t, t0, 0.4), r: [-8, 2, 9][i] + wobble(t, 0.5, 1.5, i), y: wobble(t, 0.6, 6, i), o: t < t0 ? 0 : 1 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  [[110, 620], [395, 560], [680, 620]].forEach((q, i) => {
    const d = box(c, q[0], q[1], 260, 370, { zIndex: 5, background: '#2B2118', border: `8px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 12px 0 ${SH}` });
    box(d, 14, 14, 216, 326, { border: `4px solid ${BRASS}`, borderRadius: '16px' });
    el('div', d, { left: 0, top: '70px', width: '244px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: YEL, textShadow: `6px 6px 0 #000` }, String(i + 1));
    CD.push(d);
  });
}

/* ======================================================================
   PASO 1 · P1a «UNO: LOS ROMANOS» — el romano entra con su tablilla
   ====================================================================== */
{
  const c = scene(S.P1a[0], S.P1a[1], t => {
    set(rom.d, { s: pop(t, S.P1a[0] + 0.08, 0.45), y: wobble(t, 0.5, 3), o: t < S.P1a[0] + 0.08 ? 0 : 1 });
    face(rom, t, { look: [4, 0], bL: 4, bR: 4, seed: 1.1, jaw: talkW(t, 'VECINO') * 0.3 });
    popA(rc, t, K.romanos4, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #E3D2B2 0%, #EADFC8 70%)' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[0, 1, 2, 3].map(k => `<rect x="${120 + k * 230}" y="520" width="70" height="680" fill="${STONE}" stroke="${INK}" stroke-width="5"/><rect x="${160 + k * 230}" y="520" width="30" height="680" fill="url(#hA)" opacity=".5"/><path d="M${100 + k * 230},520 h110 v-30 h-110 Z" fill="${STONE2}" stroke="${INK}" stroke-width="4"/>`).join('')}<path d="M60,490 H1020 L960,440 H120 Z" fill="${STONE2}" stroke="${INK}" stroke-width="5"/><rect x="0" y="1200" width="1080" height="720" fill="#B9A27E" stroke="${INK}" stroke-width="6"/></svg>`;
  const rom = mk(c, [270, 560, 540, 690], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 5;
  const rc = chip(c, 600, 1150, 'los romanos', { size: 54, bg: INK, color: YEL, z: 20 });
}
/* P1b · «NO CONTABAN LAS HORAS DESDE MEDIANOCHE» — noche, reloj a las 00:00 tachado */
{
  const c = scene(S.P1b[0], S.P1b[1], t => {
    set(ck.d, { s: pop(t, S.P1b[0] + 0.02, 0.4), r: wobble(t, 0.5, 1.5), o: t < S.P1b[0] + 0.02 ? 0 : 1 });
    ck.setH(12);
    set(moon, { r: wobble(t, 0.3, 4), y: wobble(t, 0.4, 6) });
    const kx = p(t, K.no4 + 0.15, 0.22, E.outBack);
    xE.style.transform = `scale(${f1(kx * 100) / 100})`; xE.style.opacity = t > K.no4 + 0.15 ? 1 : 0;
    popA(mn, t, K.medianoche - 0.05, { r: -4 });
    ST.forEach((s, i) => set(s, { o: 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7), s: 0.8 + 0.2 * Math.sin(t * 4 + i) }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #2f3550 0%, #4a4a62 70%, #6b6272 100%)' });
  const ST = [[130, 560], [300, 470], [880, 520], [820, 980], [180, 1040], [520, 1180], [900, 1200]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '48px', color: YEL, zIndex: 2, textShadow: `2px 2px 0 ${INK}` }, '✦'));
  const moon = box(c, 720, 600, 200, 200, { zIndex: 3 }); moon.innerHTML = `<svg viewBox="0 0 200 200" width="100%" height="100%" style="overflow:visible"><path d="M130,20 A86,86 0 1,0 180,150 A70,70 0 1,1 130,20 Z" fill="#F6E7B8" stroke="${INK}" stroke-width="6"/><circle cx="96" cy="128" r="6" fill="${INK}"/><path d="M84,150 q14,8 26,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;
  const ck = mkClock(c, 230, 560, 520, { z: 6 });
  const xE = box(c, 210, 540, 560, 560, { zIndex: 8, transformOrigin: '280px 280px' }); xE.innerHTML = XSVG;
  const mn = chip(c, 330, 1140, 'medianoche · 00:00', { size: 50, bg: '#fff', color: INK, z: 20 });
}
/* P1c · «SINO DESDE QUE SALÍA EL SOL» — amanecer en la colina; el romano mira el sol */
{
  const c = scene(S.P1c[0], S.P1c[1], t => {
    const ks = p(t, K.salia - 0.3, 1.0, E.outCubic);
    set(sun, { y: lerp(330, 0, ks), s: 0.9 + 0.1 * ks, r: t * 20 });
    sky.style.opacity = f1(0.2 + 0.8 * ks);
    set(rom.d, { s: pop(t, S.P1c[0] + 0.05, 0.4), y: wobble(t, 0.5, 3), o: t < S.P1c[0] + 0.05 ? 0 : 1 });
    face(rom, t, { look: t > K.salia ? [-8, -4] : [4, 0], bL: t > K.salia ? 10 : 2, bR: t > K.salia ? 10 : 2, seed: 1.1 });
    popA(am, t, K.sol4 - 0.05, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #CFD9DA 0%, #EADFC8 60%)' });
  const sky = box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(180deg, #F6C98E 0%, #F9E3B8 45%, rgba(234,223,200,0) 70%)' });
  const sunW = box(c, 160, 760, 220, 220, { zIndex: 1 }); const sun = box(sunW, 0, 0, 220, 220); sun.innerHTML = sunSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 2 }).innerHTML = hillSvg();
  const rom = mk(c, [470, 560, 440, 562], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 5;
  const am = chip(c, 190, 1150, '1.ª hora = al salir el sol', { size: 46, bg: YEL, color: INK, z: 20 });
}
/* P1d · «LA PRIMERA, LA SEGUNDA, LA TERCERA...» — el reloj de sol cuenta I, II, III (y asoman IV, V, VI) */
const P1_LIT = [K.primera, K.segunda, K.tercera];
{
  const c = scene(S.P1d[0], S.P1d[1], t => {
    set(cam, { s: lerp(1.12, 1.0, p(t, S.P1d[0], 0.45, E.outCubic)) + 0.03 * p(t, S.P1d[0], 3, E.linear) });
    // la sombra avanza de hora en hora con la voz
    let h = 0.1; P1_LIT.forEach((tt, i) => { h = Math.max(h, lerp(i, i + 1, p(t, tt - 0.2, 0.35, E.inOutCubic))); });
    dial.setH(h);
    for (let k = 1; k <= 12; k++) { const on = k <= 3 && t > P1_LIT[k - 1] - 0.05; dial.lit(k, on, YEL); dial.dim(k, k > 6 || (k > 3 && t < K.tercera + 0.5)); }
    CH.forEach((ch, i) => popA(ch, t, P1_LIT[i] - 0.03, { r: [-5, 3, -2][i] }));
    set(dots, { o: t > K.tercera + 0.5 ? 0.6 + 0.4 * Math.sin(t * 6) : 0 });
    set(sunS, { x: lerp(-30, 230, p(t, S.P1d[0], 2.8, E.inOutCubic)), y: lerp(240, -40, p(t, S.P1d[0], 2.8, E.outCubic)), r: t * 20 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  const sunW = box(cam, 70, 470, 180, 180, { zIndex: 2 }); const sunS = box(sunW, 0, 0, 180, 180); sunS.innerHTML = sunSvg();
  const dial = mkDial(cam, 130, 520, 820, { z: 4, label: 'HORAS ROMANAS' });
  const CH = [['1.ª hora', 90, 1110], ['2.ª hora', 380, 1110], ['3.ª hora', 670, 1110]].map(q => chip(cam, q[1], q[2], q[0], { size: 52, bg: YEL, color: INK, z: 20 }));
  const dots = el('div', cam, { left: '560px', top: '430px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 20 }, '…');
}
