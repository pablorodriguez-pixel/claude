/* Ep. 13 · escenas L0–L4 (todo clavado por texto a words.js vía K) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const GOLDCHECK = `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><path d="M12,54 L40,82 L92,14" stroke="${INK}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M12,54 L40,82 L92,14" stroke="#F2C230" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M16,52 L40,76" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/></svg>`;
const RING = (sw = 14) => `<svg viewBox="0 0 300 300" width="100%" height="100%" style="overflow:visible"><path class="rg" pathLength="1000" d="M150,20 C60,22 18,90 24,160 C32,240 120,286 200,268 C270,250 292,170 270,100 C250,40 190,14 120,30" stroke="#fff" stroke-width="${sw + 12}" fill="none" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/><path class="rg" pathLength="1000" d="M150,20 C60,22 18,90 24,160 C32,240 120,286 200,268 C270,250 292,170 270,100 C250,40 190,14 120,30" stroke="${RED}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>`;
function drawRing(e, t, t0, d = 0.4) { e.querySelectorAll('.rg').forEach(q => q.style.strokeDashoffset = f1(1000 * (1 - p(t, t0, d, E.inOutCubic)))); e.style.visibility = t < t0 ? 'hidden' : 'visible'; }
// mano gigante horizontal: la punta del dedo queda en (tx,ty); rot -90 = brazo desde la izquierda
function bigHand(pa, tx, ty, sc = 0.75, rot = -90, z = 30) {
  const w = 400 * sc, h = 900 * sc, fx = 206 * sc, fy = 888 * sc;
  const hw = box(pa, tx - fx, ty - fy, w, h, { zIndex: z, transformOrigin: `${fx}px ${fy}px` });
  const inner = box(hw, 0, 0, w, h, { transform: `rotate(${rot}deg)`, transformOrigin: `${fx}px ${fy}px` });
  inner.innerHTML = svgW(handInner(), '0 0 400 900'); return hw;
}

/* ======================================================================
   A · PORTADA / PREGUNTA — calendario de pared arrancando hojas + «SEPTIEMBRE = 7?» + «MES Nº 9»
   ====================================================================== */
{
  let cal, pg8, pg7, ttl, sHL, chS, ring, st9, ml;
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.06 * p(t, 0, 3.4, E.linear) });
    set(ry, { r: t * 8 });
    // el calendario se balancea en su clavo (arrancón de la hoja)
    const sw = Math.sin(t * 5.2) * 3.2 * Math.exp(-t * 0.6) + wobble(t, 0.4, 0.6);
    set(cal.wrap, { r: sw + (t > K.nueve && t < K.nueve + 0.3 ? Math.sin(t * 60) * 1.5 : 0) });
    // hojas que vuelan (ya en el aire en el fotograma 0)
    const k8 = clamp(0.56 + t / 0.75), k7 = clamp(0.86 + t / 0.75);
    set(pg8.pg, { x: -k8 * 1200, y: k8 * 220 - Math.sin(k8 * Math.PI) * 120, r: -k8 * 46, o: k8 >= 1 ? 0 : 1 });
    set(pg7.pg, { x: -k7 * 1200, y: k7 * 220 - Math.sin(k7 * Math.PI) * 120, r: -k7 * 46, o: k7 >= 1 ? 0 : 1 });
    set(ml, { o: 1 - p(t, 0.15, 0.3), x: -t * 300 });
    // «SEPT-» se ilumina en «séptimo»
    paint(sHL, t, K.septimo, 0.35);
    popA(chS, t, K.septimo + 0.12, { r: -5 });
    set(ttl, { y: wobble(t, 0.5, 3) });
    set(q7, { r: -6 + Math.sin(t * 6) * 5, s: 1 + 0.06 * Math.sin(t * 7) });
    // «mes nueve»: círculo rojo + sello «9»
    drawRing(ring, t, K.mes - 0.05, 0.35);
    stampA(st9, t, K.nueve + 0.05, -12, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.32), rgba(255,230,0,0) 60%)' });
  const ry = rays(cam, -170, 260, 1420, 26, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  cal = wallCal(cam, 130, 520, 820, 780, 9, { nsz: 330 });
  const PX = 130 + 24, PY = 520 + 64;
  pg7 = calPage(cam, PX, PY, 772, 656, 7, { nsz: 330, torn: true, z: 8 });
  pg8 = calPage(cam, PX, PY, 772, 656, 8, { nsz: 330, torn: true, z: 9 });
  [pg7, pg8].forEach(q => { q.pg.style.transformOrigin = '386px 0px'; q.pg.style.filter = `drop-shadow(10px 14px 0 ${SH})`; });
  ml = box(cam, 0, 440, 700, 400, { zIndex: 7 }); ml.innerHTML = `<svg width="700" height="400" style="overflow:visible">${[0, 1, 2, 3].map(k => `<path d="M${560 + k * 30},${60 + k * 70} q-140,-40 -300,-30" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/>`).join('')}</svg>`;
  ring = box(cam, 340, 640, 400, 380, { zIndex: 12 }); ring.innerHTML = RING(16);
  st9 = stamp(cam, 420, 1060, 'MES 9', { size: 110, bw: 14, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  // portada: la pregunta
  ttl = el('div', cam, { left: '0', top: '196px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: 1.0, color: INK, zIndex: 50, whiteSpace: 'nowrap', letterSpacing: '-0.01em' });
  ttl.innerHTML = `${hlSpan('SEPT', 'sh')}IEMBRE`;
  sHL = ttl.querySelector('.sh');
  const q7 = el('div', cam, { left: '610px', top: '330px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', background: PINK, padding: '0 34px 14px', border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `9px 10px 0 ${INK}`, zIndex: 55, whiteSpace: 'nowrap' }, '= 7?');
  chS = chip(cam, 90, 340, 'SEPT- = «séptimo»', { size: 46, bg: INK, color: YEL, z: 56 });
}

/* ======================================================================
   A2 · «CUÉNTALOS» — 9 hojas, un dedo cuenta 1…9
   ====================================================================== */
headline(S.A2[0], S.A2[1], '*Cuéntalos*', { size: 120, hlT: K.cuenta + 0.05 });
{
  const NM = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE'];
  const TW = 260, TH = 262, G = 34, X0 = (1080 - 3 * TW - 2 * G) / 2, Y0 = 430;
  const pos = i => [X0 + (i % 3) * (TW + G), Y0 + Math.floor(i / 3) * (TH + 30)];
  const TC = i => K.cuenta + 0.08 + i * 0.148;
  const tiles = [];
  const c = scene(S.A2[0], S.A2[1], t => {
    tiles.forEach((m, i) => {
      set(m.wrap, { s: pop(t, S.A2[0] + i * 0.025, 0.3), r: [-2, 1, -1, 2, -1, 1, -2, 1, 2][i] + wobble(t, 0.6, 0.6, i), o: 1 });
      const on = t >= TC(i); m.numA.style.visibility = on ? 'visible' : 'hidden';
      if (on) set(m.numA, { s: lerp(1.8, 1, p(t, TC(i), 0.16, E.outBack)), o: 1 });
    });
    // el dedo salta de hoja en hoja
    let i = 0; for (let k = 0; k < 9; k++) if (t >= TC(k) - 0.09) i = k;
    const a = pos(Math.max(0, i - 1)), b = pos(i), kk = p(t, TC(i) - 0.09, 0.08, E.inOutCubic);
    const tap = t > TC(i) - 0.01 && t < TC(i) + 0.06 ? 14 : 0;
    set(hand, { x: lerp(a[0], b[0], i ? kk : 1) - pos(0)[0], y: lerp(a[1], b[1], i ? kk : 1) - pos(0)[1] + tap - Math.sin(kk * Math.PI) * 30, o: t < S.A2[0] + 0.05 ? 0 : 1 });
    drawRing(r9, t, TC(8) + 0.1, 0.3);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  NM.forEach((n, i) => { const [x, y] = pos(i); tiles.push(monthTile(c, x, y, TW, TH, n, { num: i + 1, numCol: i === 8 ? RED : INK, hd: i === 8 ? RED : INK, nameCol: i === 8 ? '#fff' : YEL, maxName: 36 })); });
  const [hx, hy] = pos(0);
  const hand = box(c, 0, 0, 1080, 1920, { zIndex: 40 });
  bigHand(hand, hx + TW - 34, hy + 70, 0.42, -28, 40);
  const r9 = box(c, pos(8)[0] - 20, pos(8)[1] + 40, TW + 40, TH - 10, { zIndex: 30 }); r9.innerHTML = RING(14);
}

/* ======================================================================
   B1 · OCTUBRE «octavo», NOVIEMBRE «noveno», DICIEMBRE «décimo» → TODOS MAL
   ====================================================================== */
headline(S.B1[0], K.nov - 0.05, 'Octubre = *octavo*', { size: 92, hlT: K.octavo });
headline(K.nov - 0.05, K.dic - 0.05, 'Noviembre = *noveno*', { size: 92, hlT: K.noveno });
headline(K.dic - 0.05, K.todos - 0.05, 'Diciembre = *décimo*', { size: 92, hlT: K.decimo });
headline(K.todos - 0.05, S.B1[1], 'Todos *mal*', { size: 120, hlT: K.mal, hlc: '#ff9aa8' });
{
  const D3 = [['OCTUBRE', '«octavo»', 8, 10, K.oct, K.octavo], ['NOVIEMBRE', '«noveno»', 9, 11, K.nov, K.noveno], ['DICIEMBRE', '«décimo»', 10, 12, K.dic, K.decimo]];
  const SH3 = [];
  const c = scene(S.B1[0], S.B1[1], t => {
    SH3.forEach((q, i) => {
      const d = D3[i];
      set(q.m.wrap, { s: pop(t, d[4] - 0.06, 0.4), r: [-4, 1, 4][i] + wobble(t, 0.5, 0.8, i), y: (1 - clamp(p(t, d[4] - 0.06, 0.4))) * 120, o: t < d[4] - 0.06 ? 0 : 1 });
      popA(q.lb, t, d[5] - 0.02, {});
      { const k = p(t, d[5], 0.18); set(q.n, { s: t < d[5] ? 0 : lerp(1.8, 1, k), o: t < d[5] ? 0 : 1 }); }
      const tx = K.todos + i * 0.13; { const k = p(t, tx, 0.14); set(q.x, { s: t < tx ? 0 : lerp(1.7, 1, k), o: t < tx ? 0 : 1 }); }
      q.n.style.opacity = t > tx ? 0.45 : 1;
      popA(q.r, t, tx + 0.2, { r: -6 });
    });
    stampA(tm, t, K.mal, -8, 1);
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  D3.forEach((d, i) => {
    const m = monthTile(c, 60 + i * 330, 420, 300, 540, d[0], { hd: INK, nameCol: YEL, hdH: 86, maxName: 42 });
    const lb = el('div', m.paper, { left: '0', top: '104px', width: '290px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '48px', color: PINK, textShadow: `2px 2px 0 ${INK}`, zIndex: 4 }, d[1]);
    const n = el('div', m.paper, { left: '0', top: '160px', width: '290px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: 1.0, color: INK, zIndex: 3 }, String(d[2]));
    const x = box(m.paper, 45, 170, 200, 190, { zIndex: 5 }); x.innerHTML = XSVG;
    const r = el('div', m.paper, { left: '0', top: '380px', width: '290px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', lineHeight: 1.0, color: RED, zIndex: 6, whiteSpace: 'nowrap' }, `→ ${d[3]}`);
    SH3.push({ m, lb, n, x, r });
  });
  const tm = stamp(c, 330, 990, '¡TODOS MAL!', { size: 92, bw: 13, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   B2 · «NO ES UN ERROR: ALGUIEN MOVIÓ EL CALENDARIO» — mano gigante empuja
   ====================================================================== */
headline(S.B2[0], K.alguien - 0.06, 'Y no es un *error*', { size: 100, hlT: K.error });
headline(K.alguien - 0.06, S.B2[1], 'Alguien *movió* el calendario', { size: 82, hlT: K.movio });
{
  const CX = 300, CY = 420;
  const c = scene(S.B2[0], S.B2[1], t => {
    const kp = p(t, K.movio - 0.05, 0.5, E.outBack);
    const handIn = p(t, K.alguien - 0.1, 0.4, E.outCubic);
    set(cal.wrap, { x: kp * 300, r: kp * 9 + wobble(t, 0.5, 0.8) + (t > K.movio && t < K.movio + 0.5 ? Math.sin(t * 40) * 2 * (1 - p(t, K.movio, 0.5)) : 0) });
    set(hand, { x: (1 - handIn) * -700 + kp * 300, y: Math.sin(t * 3) * 6, o: t < K.alguien - 0.1 ? 0 : 1 });
    ghost.style.opacity = t > K.movio ? 0.9 * p(t, K.movio, 0.3) : 0;
    set(ml, { o: t > K.movio && t < K.movio + 0.7 ? 1 - p(t, K.movio + 0.3, 0.4) : 0, x: kp * 120 });
    popA(err, t, K.error, { r: -6 });
    err.style.opacity = t < K.error ? 0 : 1 - p(t, K.alguien - 0.1, 0.15);
    QM.forEach((q, i) => set(q, { s: pop(t, S.B2[0] + 0.1 + i * 0.12, 0.3) * (1 - p(t, K.alguien - 0.1, 0.15)), y: Math.sin(t * 4 + i) * 10, r: [-12, 10][i], o: 1 }));
    popA(ant, t, K.movio + 0.25, { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const ghost = box(c, CX, CY + 20, 480, 500, { border: `6px dashed ${INK}`, borderRadius: '18px', zIndex: 2 });
  const ant = chip(c, CX + 60, CY + 560, 'antes estaba aquí', { size: 36, bg: '#fff', color: INK, z: 20 });
  const cal = wallCal(c, CX, CY + 20, 480, 500, 9, { nsz: 230, grid: false });
  const ml = box(c, 0, 0, 1080, 1920, { zIndex: 3 }); ml.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[0, 1, 2, 3, 4].map(k => `<path d="M${CX - 60 - (k % 2) * 40},${CY + 120 + k * 80} h-${160 + (k % 3) * 60}" stroke="${INK}" stroke-width="8" stroke-linecap="round" opacity=".5"/>`).join('')}</svg>`;
  const hand = box(c, 0, 0, 1080, 1920, { zIndex: 30 });
  bigHand(hand, CX + 6, CY + 330, 0.62, -90, 30);
  const err = stamp(c, 420, 1000, '¿ERROR? NO', { size: 70, bw: 10, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const QM = [qMark(c, 150, 420, 130), qMark(c, 860, 470, 120)];
}

/* ======================================================================
   C1 · EL PRIMER CALENDARIO ROMANO EMPEZABA EN MARZO
   ====================================================================== */
headline(S.C1[0], K.empezaba - 0.06, 'El primer calendario *romano*', { size: 82, hlT: K.romano });
headline(K.empezaba - 0.06, S.C1[1], 'Empezaba en *marzo*', { size: 100, hlT: K.marzo });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(rom.d, { y: (1 - p(t, S.C1[0], 0.45, E.outBack)) * 700 + wobble(t, 0.5, 3), s: 1 + 0.04 * p(t, S.C1[0], 2.2, E.linear) });
    face(rom, t, { look: t > K.marzo - 0.1 ? [-8, 2] : [0, 0], brow: t > K.marzo ? -6 : 0, seed: 0.5 });
    set(mz.wrap, { s: pop(t, K.marzo - 0.04, 0.4), r: -6 + wobble(t, 0.6, 1.5), o: t < K.marzo - 0.04 ? 0 : 1 });
    popA(rc, t, K.romano + 0.05, { r: -4 });
    [colL, colR].forEach((q, i) => set(q, { y: (1 - p(t, S.C1[0] + i * 0.08, 0.4, E.outBack)) * 900 }));
  });
  sceneBg(c, { background: '#E9E0CC', backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,.55), rgba(255,255,255,0) 60%)' });
  const col = x => { const d = box(c, x, 380, 170, 940, { zIndex: 1 }); let fl = ''; for (let k = 0; k < 6; k++) fl += `<path d="M${30 + k * 22},90 V880" stroke="${INK}" stroke-width="3" opacity=".5"/>`; d.innerHTML = `<svg width="170" height="940" style="overflow:visible">${cut('<rect x="10" y="60" width="150" height="840"/>')}<rect x="0" y="0" width="170" height="70" rx="8" fill="#EFEAE0" stroke="${INK}" stroke-width="5"/><path d="M10,20 q20,-24 40,0 M120,20 q20,-24 40,0" stroke="${INK}" stroke-width="4" fill="none"/><rect x="18" y="70" width="134" height="820" fill="#F3EEE2" stroke="${INK}" stroke-width="5"/><rect x="100" y="70" width="52" height="820" fill="url(#hA)" opacity=".7"/>${fl}<rect x="0" y="890" width="170" height="50" fill="#EFEAE0" stroke="${INK}" stroke-width="5"/></svg>`; return d; };
  const colL = col(40), colR = col(870);
  const rom = mkRoman(c, [300, 470, 600, 767], { seed: 61, hair: 'thin' }); rom.d.style.zIndex = 4;
  const mz = monthTile(c, 110, 560, 300, 330, 'MARZO', { num: 1, hd: RED, maxName: 46 }); mz.wrap.style.zIndex = 8;
  const rc = chip(c, 560, 1170, 'calendario romano', { size: 44, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   GR · LA REJILLA DE MESES: MARZO=1 … SEPTIEMBRE=7 ✔  →  + ENERO, FEBRERO  →  TODOS +2
   ====================================================================== */
headline(S.GR[0], K.ysep - 0.04, 'Marzo, *uno.* Abril, *dos…*', { size: 84 });
headline(K.ysep - 0.04, K.cuadraba - 0.06, '…y septiembre, el *siete*', { size: 84, hlT: K.siete });
headline(K.cuadraba - 0.06, K.L3 - 0.06, 'Cuadraba *perfecto*', { size: 104, hlT: K.perfecto });
headline(K.L3 - 0.06, K.alfinal - 0.06, 'Luego añadieron *enero* y *febrero*', { size: 74 });
headline(K.alfinal - 0.06, K.todos2 - 0.06, 'El año pasó a empezar en *enero*', { size: 74, hlT: K.enero2 });
headline(K.todos2 - 0.06, K.puestos + 0.25, 'Todos se corrieron *dos puestos*', { size: 76, hlT: K.dosP });
{
  const TW = 222, TH = 240, GX = 20, GY = 22, X0 = (1080 - 4 * TW - 3 * GX) / 2, Y0 = 420;
  const SL = i => [X0 + (i % 4) * (TW + GX), Y0 + Math.floor(i / 4) * (TH + GY)];
  const RN = ['MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'QUINTO', 'SEXTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  const tApp = [K.marzo2 - 0.04, K.abril - 0.04, K.dos + 0.3, K.dos + 0.4, K.dos + 0.5, K.dos + 0.6, K.sep2 - 0.04, K.cuadraba, K.cuadraba + 0.12, K.cuadraba + 0.24];
  const tNum = [K.uno, K.dos, K.dos + 0.35, K.dos + 0.45, K.dos + 0.55, K.dos + 0.65, K.siete, K.cuadraba + 0.08, K.cuadraba + 0.2, K.cuadraba + 0.32];
  const tPlus = i => K.todos2 + 0.05 + i * 0.105;
  const TS0 = K.empezar - 0.05, TSD = 0.8; // el corrimiento
  const tiles = [], plus = [];
  let ene, feb, chk, p2, sc7, emuW, emu, nw;
  const c = scene(S.GR[0], S.GR[1], t => {
    // cámara: zoom a SEPTIEMBRE en «siete», y a SEPTIEMBRE (ya 9) al final
    const z1 = p(t, K.sep2, 0.5, E.inOutCubic) * (1 - p(t, K.cuadraba - 0.1, 0.4, E.inOutCubic));
    const z2 = p(t, K.puestos, 0.6, E.inOutCubic);
    const c1 = [SL(6)[0] + TW / 2, SL(6)[1] + TH / 2], c2 = [SL(8)[0] + TW / 2, SL(8)[1] + TH / 2];
    const s = 1 + 0.32 * z1 + 0.55 * z2, O = [540, 860];
    const fx = z2 > 0 ? c2 : c1, kz = z2 > 0 ? z2 : z1;
    set(cam, { s, x: (O[0] - fx[0]) * kz * s, y: (O[1] - fx[1]) * kz * s });
    const ks = p(t, TS0, TSD, E.inOutCubic);
    tiles.forEach((m, i) => {
      const a = SL(i), b = SL(i + 2), kk = p(t, TS0 + 0.06 + (9 - i) * 0.025, TSD - 0.2, E.inOutCubic);
      set(m.wrap, { x: (b[0] - a[0]) * kk, y: (b[1] - a[1]) * kk, s: pop(t, tApp[i], 0.35) * (i === 6 ? 1 + 0.08 * pop(t, K.siete, 0.3) - 0.08 * (t > K.siete ? 1 : 0) * 0 : 1), r: wobble(t, 0.5, 0.7, i) + (kk > 0 && kk < 1 ? Math.sin(kk * Math.PI) * 6 : 0), o: t < tApp[i] ? 0 : 1 });
      const on = t >= tNum[i]; m.numA.style.visibility = on && t < tPlus(i) ? 'visible' : 'hidden';
      if (on) set(m.numA, { s: lerp(1.7, 1, p(t, tNum[i], 0.18, E.outBack)), o: 1 });
      if (t >= tPlus(i)) numSwap(m, t, tPlus(i));
      else m.numB.style.visibility = 'hidden';
      const pk = p(t, tPlus(i), 0.7, E.outCubic);
      set(plus[i], { y: -pk * 70, s: pop(t, tPlus(i), 0.25), o: t < tPlus(i) ? 0 : 1 - p(t, tPlus(i) + 0.5, 0.3) });
    });
    [[ene, K.enero, 10, 0], [feb, K.febrero, 11, 1]].forEach(([m, t0, from, to]) => {
      const a = SL(from), b = SL(to), kk = p(t, TS0, TSD, E.inOutCubic);
      const drop = p(t, t0 - 0.05, 0.45, E.outBounce);
      set(m.wrap, { x: (b[0] - a[0]) * kk, y: (b[1] - a[1]) * kk - Math.sin(kk * Math.PI) * 260 - (1 - drop) * 900, r: (1 - drop) * 12 + Math.sin(kk * Math.PI) * -10 + wobble(t, 0.6, 1, to), s: 1 + Math.sin(kk * Math.PI) * 0.15, o: t < t0 - 0.05 ? 0 : 1 });
      if (t >= K.enero2e) numSwap(m, t, K.enero2e + 0.02 + to * 0.08); else { m.numA.style.visibility = 'visible'; m.numB.style.visibility = 'hidden'; }
    });
    set(nw, { s: pop(t, K.febrero + 0.2, 0.3), r: -8, o: t < K.febrero + 0.2 ? 0 : 1 - p(t, TS0, 0.2) });
    // ✔ dorado
    { const kc = p(t, K.perfecto - 0.05, 0.3, E.outBack); set(chk, { s: t < K.perfecto - 0.05 ? 0 : kc, r: -6, o: t < K.perfecto - 0.05 ? 0 : 1 - p(t, K.L3 - 0.25, 0.2) }); }
    popA(sc7, t, K.siete + 0.15, { r: -5 }); sc7.style.opacity = t < K.siete + 0.15 ? 0 : 1 - p(t, K.cuadraba - 0.15, 0.15);
    stampA(p2, t, K.dosP, -10, 1); p2.style.opacity = t < K.dosP ? 0 : 0.95 * (1 - p(t, K.puestos + 0.25, 0.2));
    // CAMEO DEL EMÚ: asoma en el hueco vacío y mira a cámara
    const ke = p(t, K.perfecto + 0.35, 0.25, E.outBack) * (1 - p(t, K.perfecto + 1.05, 0.2, E.inCubic));
    set(emu.d, { y: (1 - ke) * 420, r: -4 });
    const look = t > K.perfecto + 0.5 && t < K.perfecto + 1.05;
    face(emu, t, { look: look ? [0, 0] : [-12, 4], half: !look, bL: look ? 16 : 0, bR: look ? 22 : 0, blink: false });
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  // huecos punteados (12 casillas)
  for (let i = 0; i < 12; i++) { const [x, y] = SL(i); box(cam, x, y + 16, TW, TH - 16, { border: `4px dashed rgba(43,33,24,.35)`, borderRadius: '14px', zIndex: 1 }); }
  emuW = box(cam, SL(10)[0] - 10, SL(10)[1] - 220, 2 * TW + GX + 20, TH + 220, { overflow: 'hidden', zIndex: 4 });
  emu = mkEmuF(emuW, [40, 50, 400, 600]);
  RN.forEach((n, i) => {
    const [x, y] = SL(i);
    const m = monthTile(cam, x, y, TW, TH, n, { num: i + 1, num2: i + 3, hd: i === 6 ? RED : INK, nameCol: i === 6 ? '#fff' : YEL, maxName: 34, num2Col: i === 6 ? RED : INK, numCol: i === 6 ? RED : INK });
    m.wrap.style.zIndex = 10; tiles.push(m);
    plus.push(el('div', cam, { left: px(x + TW - 92), top: px(y - 6), fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: '#fff', background: PINK, border: `4px solid ${INK}`, borderRadius: '40px', padding: '0 14px 4px', zIndex: 30, boxShadow: `4px 4px 0 ${INK}` }, '+2'));
  });
  ene = monthTile(cam, SL(10)[0], SL(10)[1], TW, TH, 'ENERO', { num: '', num2: 1, hd: PINK, nameCol: '#fff', maxName: 34, bg: '#FFF6FB' }); ene.wrap.style.zIndex = 20;
  feb = monthTile(cam, SL(11)[0], SL(11)[1], TW, TH, 'FEBRERO', { num: '', num2: 2, hd: PINK, nameCol: '#fff', maxName: 34, bg: '#FFF6FB' }); feb.wrap.style.zIndex = 20;
  nw = chip(cam, SL(10)[0] + 40, SL(10)[1] + TH - 30, '¡nuevos!', { size: 40, bg: PINK, z: 40 });
  chk = box(cam, 320, 560, 440, 440, { zIndex: 50 }); chk.innerHTML = GOLDCHECK;
  sc7 = chip(cam, SL(6)[0] - 200, SL(6)[1] + TH + 6, 'SEPT- = 7 ✔', { size: 46, bg: INK, color: YEL, z: 45 });
  p2 = stamp(cam, 300, 600, '+2', { size: 260, bw: 20, z: 60, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   HIT N · GOLPE AMARILLO: «…PERO NADIE LES CAMBIÓ EL NOMBRE»
   ====================================================================== */
colorHit(S.HITN[0], S.HITN[1], YEL, c => {
  const top = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '92px', lineHeight: 1, color: INK, zIndex: 8 }, '…nadie les cambió');
  const big = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', lineHeight: '200px', color: '#fff', textShadow: OUTL(INK, 12), zIndex: 9, whiteSpace: 'nowrap' }, 'EL NOMBRE');
  const TG = [['SEPTIEMBRE', 9], ['OCTUBRE', 10], ['NOVIEMBRE', 11], ['DICIEMBRE', 12]].map(([n, k], i) => {
    const r = box(c, 110, 600 + i * 146, 860, 124, { zIndex: 6 });
    el('div', r, { left: '0', top: '0', width: '640px', height: '120px', background: INK, color: YEL, fontFamily: 'Rye', fontSize: '74px', lineHeight: '118px', textAlign: 'center', borderRadius: '14px', boxShadow: `8px 8px 0 rgba(0,0,0,.25)`, whiteSpace: 'nowrap' }, n);
    el('div', r, { left: '680px', top: '0', width: '160px', height: '120px', background: '#fff', border: `6px solid ${INK}`, color: INK, fontFamily: 'Playfair', fontWeight: 900, fontSize: '86px', lineHeight: '104px', textAlign: 'center', borderRadius: '60px' }, String(k));
    return r;
  });
  const lens = box(c, 70, 520, 300, 300, { zIndex: 12 }); lens.innerHTML = LUPA();
  const same = chip(c, 330, 1210, 'el nombre, igual', { size: 40, bg: PINK, z: 14 });
  return t => {
    popA(top, t, S.HITN[0] + 0.02, { rise: 30 });
    const kb = p(t, K.nombre - 0.12, 0.2, E.outBack); set(big, { s: t < K.nombre - 0.12 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.nombre - 0.12 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.nombre, 0.3) ? glitch(t, K.nombre, 0.3) + ', ' : '') + OUTL(INK, 12);
    TG.forEach((r, i) => set(r, { x: (1 - p(t, S.HITN[0] + 0.05 + i * 0.08, 0.3, E.outBack)) * -1100, r: [-1.5, 1, -1, 1.5][i] }));
    set(lens, { x: Math.sin(t * 5) * 20, y: Math.cos(t * 4) * 10, s: pop(t, K.nadie, 0.35), r: -10, o: t < K.nadie ? 0 : 1 });
    popA(same, t, K.cambio, { r: -5 });
  };
});
