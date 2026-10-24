// Episodio 3 · Tres puertas (el problema de Monty Hall) · intuición → por qué → mil partidas → cien puertas
const DXS = [190, 540, 890], DY0 = 560, DW = 250, DH = 430;
const CONTENT = ['goat', 'car', 'goat'];                // el coche está tras la puerta 2; el jugador elige la 1; el presentador abre la 3

function goat(x, y, s, col = C.line, lw = 4) {        // cabra de línea (original)
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.ellipse(0, 0, s * .34, s * .44, 0, 0, Math.PI * 2); ctx.stroke();                          // cabeza
  ctx.beginPath(); ctx.arc(-s * .26, -s * .38, s * .28, Math.PI * .95, Math.PI * 1.75); ctx.stroke();            // cuernos
  ctx.beginPath(); ctx.arc(s * .26, -s * .38, s * .28, Math.PI * 1.25, Math.PI * 2.05); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-s * .46, -s * .06, s * .16, s * .07, -.5, 0, Math.PI * 2); ctx.stroke();          // orejas
  ctx.beginPath(); ctx.ellipse(s * .46, -s * .06, s * .16, s * .07, .5, 0, Math.PI * 2); ctx.stroke();
  circle(-s * .13, -s * .06, s * .035, { fill: col, stroke: null }); circle(s * .13, -s * .06, s * .035, { fill: col, stroke: null });
  ctx.beginPath(); ctx.moveTo(-s * .1, s * .22); ctx.lineTo(0, s * .3); ctx.lineTo(s * .1, s * .22); ctx.stroke();    // hocico
  ctx.beginPath(); ctx.moveTo(-s * .08, s * .4); ctx.lineTo(0, s * .66); ctx.lineTo(s * .08, s * .4); ctx.stroke();   // barba
  ctx.restore();
}
function car(x, y, s, col = C.accent, lw = 4) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-s * .9, s * .25); ctx.lineTo(-s * .9, -s * .05); ctx.lineTo(-s * .55, -s * .12); ctx.lineTo(-s * .3, -s * .5); ctx.lineTo(s * .35, -s * .5); ctx.lineTo(s * .62, -s * .12); ctx.lineTo(s * .9, -s * .05); ctx.lineTo(s * .9, s * .25); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-s * .22, -s * .42); ctx.lineTo(-s * .42, -s * .12); ctx.lineTo(s * .5, -s * .12); ctx.lineTo(s * .3, -s * .42); ctx.closePath(); ctx.stroke(); line(s * .04, -s * .42, s * .04, -s * .12, col, lw * .7);
  circle(-s * .52, s * .28, s * .19, { fill: 'rgba(5,32,42,.95)', stroke: col, w: lw }); circle(s * .52, s * .28, s * .19, { fill: 'rgba(5,32,42,.95)', stroke: col, w: lw }); ctx.restore();
}
function drawDoor(i, open, o = {}) {
  const x = o.x ?? DXS[i], y0 = o.y ?? DY0, w = o.w ?? DW, h = o.h ?? DH, x0 = x - w / 2, col = o.col || C.line, a = o.alpha ?? 1;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = open > .02 ? 'rgba(3,20,26,.95)' : 'rgba(230,255,247,.04)'; ctx.fillRect(x0, y0, w, h);
  if (open > .25) { ctx.save(); ctx.globalAlpha *= clamp((open - .25) / .4); const s = w * .30 * (.7 + .3 * open), cy = y0 + h * .56;
    if ((o.content || CONTENT[i]) === 'car') car(x, cy, s, C.accent, 4); else goat(x, cy - s * .1, s * 1.15, C.line, 4); ctx.restore(); }
  ctx.lineWidth = 5; ctx.strokeStyle = col; ctx.strokeRect(x0, y0, w, h);
  const pw = w * (1 - .86 * open), sk = h * .07 * open;                // la hoja de la puerta se abre con perspectiva
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + pw, y0 + sk); ctx.lineTo(x0 + pw, y0 + h - sk); ctx.lineTo(x0, y0 + h); ctx.closePath();
  ctx.fillStyle = 'rgba(40,120,130,.55)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
  if (open < .5) { circle(x0 + pw - 30, y0 + h * .55, 10, { fill: col, stroke: null }); line(x0 + 28, y0 + 40, x0 + pw - 28, y0 + 40, C.faint, 2); line(x0 + 28, y0 + h - 40, x0 + pw - 28, y0 + h - 40, C.faint, 2); }
  ctx.restore();
  if (o.label !== false) txt(String(i + 1), x, y0 - 36, 52, o.chosen ? C.accent : C.label, { weight: 800, alpha: a });
}
const openAt = (t, t0, d = .45) => easeIO(seg(t, t0, t0 + d));
const pulse = (t, f = 5) => 1 + .04 * Math.sin(t * f);

function sceneHook(t, lt, s) {
  const T = (w, n = 0) => wt('hook', w, n), tAb = T('abririas'), tCo = T('coche', 0), tCa = T('cabras'), tEl = T('eliges'), tPr = T('presentador'), tOt = T('otra'), tCb = T('cabra'), tQu = T('quedas'), tCm = T('cambias');
  // pregunta directa al espectador, enorme, desde el fotograma 0
  const q1 = 1 - seg(t, tCo - .9, tCo - .6);
  band('¿QUÉ PUERTA', 118, C.line, q1, 300, lerp(1.12, 1, easeOut(seg(t, 0, .35)))); band('ABRIRÍAS?', 118, C.accent, q1, 450, lerp(1.12, 1, easeOut(seg(t, 0, .35))));
  for (let i = 0; i < 3; i++) if (q1 > 0) txt(String(i + 1) + '?', DXS[i], 1110, 70, C.accent, { weight: 800, alpha: q1 * (.6 + .4 * Math.sin(t * 6 + i * 2)) });
  if (q1 < 1) headline('¿Te quedas', 'o cambias?', tCo - .6, t, { cps: 40, size: 60 });
  // las puertas irrumpen desde el fotograma 0 con la cámara cerca y desenfoque; luego se aleja
  const e = easeOut(seg(t, 0, 1.5)), Z = lerp(1.7, 1, e), sh = clamp(1 - seg(t, 0, 1.3));
  const scene = (z, alpha) => { ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(540, 775); ctx.scale(z, z); ctx.translate(-540, -775);
    for (let i = 0; i < 3; i++) {
      const pop = lerp(1.35, 1, easeOut(seg(t, i * .06, .5 + i * .06))), flash = (t > tCo - .1 && t < tCo + 1.1 && i === 1) ? 1 : (t > tCa - .1 && t < tCa + 1.3 && i !== 1) ? 1 : 0;
      const open = i === 2 && t >= tOt ? openAt(t, tOt, .5) : flash * Math.min(1, Math.sin(clamp((t - (i === 1 ? tCo : tCa) + .1) / 1.2) * Math.PI) * 3);
      ctx.save(); ctx.translate(DXS[i], DY0 + DH / 2); ctx.scale(pop, pop); ctx.translate(-DXS[i], -(DY0 + DH / 2));
      drawDoor(i, open, { chosen: i === 0 && t >= tEl, col: (i === 0 && t >= tEl) ? C.accent : C.line }); ctx.restore();
    } ctx.restore(); };
  if (sh > .02) for (let k = 0; k < 5; k++) { ctx.save(); scene(lerp(1.7, 1, easeOut(seg(t - sh * .16 * k / 4, 0, 1.5))), .2); ctx.restore(); }
  scene(Z, sh > .02 ? .62 : 1);
  const pc = easeBack(seg(t, tCo, tCo + .35)) * (1 - seg(t, tCa - .1, tCa)); if (pc > 0) txt('PREMIO: UN COCHE', 540, 1110, 48, C.accent, { weight: 800, scale: pc, ls: 3 });
  const pg = easeBack(seg(t, tCa, tCa + .35)) * (1 - seg(t, tEl + .9, tEl + 1.2)); if (pg > 0) txt('LAS OTRAS DOS: CABRAS', 540, 1110, 44, C.line, { weight: 800, scale: pg, ls: 3 });
  const r = easeBack(seg(t, tEl, tEl + .4));
  if (r > 0) { ctx.save(); ctx.translate(DXS[0], DY0 + DH + 56); ctx.scale(r, r); txt('TU ELECCIÓN', 0, 0, 30, C.accent, { weight: 800, ls: 3 }); ctx.restore(); circle(DXS[0], DY0 + DH / 2, (DW / 2 + 22) * (1 + .02 * Math.sin(t * 6)) * r, { stroke: C.accent, w: 3 }); }
  const pa = easeOut(seg(t, tPr - .1, tPr + .3));
  if (pa > 0) { ctx.save(); ctx.globalAlpha *= pa; person(105, 1345, 120, C.line, null, 3); txt('PRESENTADOR', 105, 1385, 20, C.label, { weight: 700, ls: 3 }); ctx.restore(); }
  const ob = easeBack(seg(t, tCb - .2, tCb + .3)); if (ob > 0 && t < tQu - .1) txt('¡UNA CABRA!', 540, 1180, 56, C.line, { weight: 800, scale: ob, ls: 2 });
  const bq = easeBack(seg(t, tQu - .1, tQu + .4)); if (bq > 0) { const sel = t >= tCm - .1 ? 1 : 0;
    ctx.save(); ctx.translate(390, 1195); ctx.scale(bq * (sel ? 1 : pulse(t)), bq * (sel ? 1 : pulse(t))); rrect(-170, -50, 340, 100, 50); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke(); txt('QUEDARME', 0, 3, 40, C.line, { weight: 800, ls: 2 }); ctx.restore();
    ctx.save(); ctx.translate(790, 1195); const bs = bq * pulse(t, sel ? 8 : 5); ctx.scale(bs, bs); rrect(-170, -50, 340, 100, 50); ctx.fillStyle = sel ? C.accent : 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 4; ctx.stroke(); txt('CAMBIAR', 0, 3, 40, sel ? C.ink : C.accent, { weight: 800, ls: 2 }); ctx.restore(); }
}

// Reglas del juego, una a una (contexto: qué es esto, qué sabe el presentador, qué significa cambiar)
function sceneReglas(t, lt, s) {
  const T = (w, n = 0) => wt('reglas', w, n), tSa = T('sabe'), tSi = T('siempre'), tTu = T('tuya'), tN2 = T('nunca', 1), tCa = T('cambiar'), tCe = T('cerrada'), tCo = 1e9;
  headline('Las reglas', '', s.start + .1, t);
  const open3 = openAt(t, tSi + .3, .5) * (1 - seg(t, tCa - .2, tCa));
  for (let i = 0; i < 3; i++) drawDoor(i, i === 2 ? open3 : 0, { chosen: i === 0, col: i === 0 ? C.accent : C.line, y: 520 });
  const kn = easeBack(seg(t, tSa - .1, tSa + .35)); if (kn > 0) { ctx.save(); ctx.translate(150, 1300); ctx.scale(kn, kn); person(0, 0, 150, C.line, null, 3); ctx.restore();
    ctx.save(); ctx.globalAlpha *= kn; bubble(560, 1180, 600, 120, '', C.line, { size: 30 }); car(400, 1182, 50, C.accent, 4); txt('SABE DÓNDE ESTÁ', 700, 1184, 28, C.accent, { weight: 800, ls: 2 }); ctx.restore(); }
  const nv = (cx, tt, lab) => { const a = easeBack(seg(t, tt, tt + .3)); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a * (1 - seg(t, tCa - .2, tCa)); ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - 70, 640); ctx.lineTo(cx + 70, 780); ctx.moveTo(cx + 70, 640); ctx.lineTo(cx - 70, 780); ctx.stroke(); ctx.restore(); txt(lab, cx, 1030, 26, C.red, { weight: 800, ls: 2, alpha: a * (1 - seg(t, tCa - .2, tCa)) }); };
  nv(DXS[0], tTu - .05, 'NUNCA LA TUYA'); nv(DXS[1], tN2 - .05, 'NI LA DEL COCHE');
  const sw = easeOut(seg(t, tCa - .1, tCa + .5)); if (sw > 0) { ctx.save(); ctx.globalAlpha *= sw; ctx.strokeStyle = C.accent; ctx.lineWidth = 6; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(DXS[0] + 50, 480); ctx.quadraticCurveTo((DXS[0] + DXS[1]) / 2, 400, DXS[1] - 50, 480); ctx.stroke(); ctx.restore();
    txt('CAMBIAR = IR A LA OTRA', 540, 1030, 34, C.accent, { weight: 800, ls: 3, alpha: sw }); txt('PUERTA CERRADA', 540, 1075, 34, C.accent, { weight: 800, ls: 3, alpha: sw }); }
  const g = easeBack(seg(t, tCo - .15, tCo + .3)); if (g > 0) { ctx.save(); ctx.fillStyle = 'rgba(5,32,42,.94)'; rrect(150, 1160, 780, 170, 30); ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); car(330, 1245, 60, C.accent, 5); txt('TU OBJETIVO:', 640, 1215, 34, C.label, { weight: 700, ls: 3, alpha: g }); txt('EL COCHE', 640, 1272, 64, C.accent, { weight: 800, scale: g }); }
}

// Los tres casos posibles: por qué cambiar gana 2 de cada 3 veces
function sceneCasos(t, lt, s) {
  const T = (w, n = 0) => wt('casos', w, n), tCs = T('casos'), tTu = T('tu'), tPi = T('pierde'), tOt = T('otras'), tGa = T('gana'), tDo = T('dos', 1);
  headline('Los 3 casos', '', s.start + .1, t);
  const rows = [{ y: 440, car: 0, host: 2, n: 1, sub: 'coche en TU puerta' }, { y: 705, car: 1, host: 2, n: 2, sub: 'coche en la 2' }, { y: 970, car: 2, host: 1, n: 3, sub: 'coche en la 3' }];
  const MX = [225, 360, 495];
  rows.forEach((r, ri) => {
    const a = easeOut(seg(t, tCs + ri * .35, tCs + .35 + ri * .35)); if (a <= 0) return;
    const act = (ri === 0 && t >= tTu - .05 && t < tOt - .1) || (ri > 0 && t >= tOt - .05 && t < tDo - .2), done = ri === 0 ? t >= tPi : t >= tGa;
    ctx.save(); ctx.globalAlpha *= a;
    if (act) { ctx.fillStyle = 'rgba(255,143,107,.10)'; rrect(60, r.y - 40, 960, 255, 26); ctx.fill(); }
    txt(`CASO ${r.n}`, 90, r.y - 12, 26, C.accent, { align: 'left', weight: 800, ls: 3 }); txt(r.sub, 90, r.y + 18, 22, C.label, { align: 'left', weight: 600, ls: 1 });
    for (let d = 0; d < 3; d++) { const ho = d === r.host ? openAt(t, tCs + ri * .35 + .5, .4) : 0;
      drawDoor(d, ho, { x: MX[d] + 60, y: r.y + 40, w: 112, h: 160, label: false, content: 'goat', col: d === 0 ? C.accent : C.line });
      if (d === r.car) car(MX[d] + 60, r.y + 224, 24, C.accent, 3); }
    // resultados
    const chip = (cy, lab, win, col) => { const k = done ? easeBack(seg(t, ri === 0 ? tPi : tGa, (ri === 0 ? tPi : tGa) + .35)) : 0;
      rrect(660, cy - 30, 330, 60, 30); ctx.fillStyle = k > 0 ? (win ? 'rgba(126,240,200,.22)' : 'rgba(255,93,115,.20)') : 'rgba(255,255,255,.05)'; ctx.fill(); ctx.strokeStyle = k > 0 ? (win ? C.mint : C.red) : C.faint; ctx.lineWidth = 3; ctx.stroke();
      txt(lab, 695, cy + 2, 30, C.line, { align: 'left', weight: 800, ls: 2 }); if (k > 0) txt(win ? '✓' : '✗', 955, cy + 2, 40, win ? C.mint : C.red, { weight: 800, scale: k }); };
    chip(r.y + 75, 'QUEDARTE', r.car === 0); chip(r.y + 155, 'CAMBIAR', r.car !== 0);
    if (done) { const target = r.car === 0 ? (r.host === 2 ? 1 : 2) : r.car; const sw = easeOut(seg(t, ri === 0 ? tPi : tGa, (ri === 0 ? tPi : tGa) + .5)); ctx.save(); ctx.globalAlpha *= sw * .9; ctx.strokeStyle = C.accent; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(MX[0] + 60, r.y + 28); ctx.quadraticCurveTo((MX[0] + MX[target]) / 2 + 60, r.y - 14, MX[target] + 60, r.y + 28); ctx.stroke(); ctx.restore(); }
    ctx.restore(); });
  const fin = easeBack(seg(t, tDo - .1, tDo + .4)); if (fin > 0) { ctx.save(); ctx.fillStyle = 'rgba(5,32,42,.95)'; rrect(110, 1250, 860, 100, 28); ctx.fill(); ctx.strokeStyle = C.mint; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); txt('CAMBIAR GANA 2 DE 3', 540, 1302, 52, C.mint, { weight: 800, scale: fin, ls: 2 }); }
}

function sceneIntuicion(t, lt, s) {
  const T = (w, n = 0) => wt('intuicion', w, n), tC = T('cincuenta'), tNo = T('no', 0), tDo = T('doble'), tIg = T('igual', 0), tEx = T('explico');
  headline('¿50 y 50?', '', s.start + .1, t);
  stamp('TE LO EXPLICO ↓', 540, 1330, 56, C.accent, easeBack(seg(t, tEx - .5, tEx - .1)), 0);
  for (let i = 0; i < 3; i++) drawDoor(i, i === 2 ? 1 : 0, { alpha: i === 2 ? .55 : 1, chosen: i === 0, col: i === 0 ? C.accent : C.line });
  const a = easeBack(seg(t, tC - .1, tC + .3)) * (1 - seg(t, tNo, tNo + .3));
  if (a > 0) { txt('50%', DXS[0], 470, 64, C.accent, { weight: 800, scale: a }); txt('50%', DXS[1], 470, 64, C.line, { weight: 800, scale: a }); }
  const x = easeOut(seg(t, tNo, tNo + .35)) * (1 - seg(t, tDo - .15, tDo + .05)); if (x > 0) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.lineCap = 'round'; [DXS[0], DXS[1]].forEach(cx => { ctx.beginPath(); ctx.moveTo(cx - 75, 440); ctx.lineTo(cx - 75 + 150 * x, 440 + 60 * x - 30 + 30 * (1 - x)); ctx.stroke(); }); ctx.restore(); txt('¡NO!', 540, 330, 80, C.red, { weight: 800, scale: easeBack(seg(t, tNo, tNo + .35)), alpha: 1 - seg(t, tDo - .15, tDo + .05) }); }
  const d = easeBack(seg(t, tDo - .1, tDo + .4));
  if (d > 0) { txt('1/3', DXS[0], 470, 64, C.accent, { weight: 800, scale: d }); txt('2/3', DXS[1], 470, 64, C.mint, { weight: 800, scale: d });
    const bar = (cx, v, col, lab) => { rrect(cx - 105, 1130, 210, 28, 14); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fill(); ctx.save(); rrect(cx - 105, 1130, 210 * v * easeOut(seg(t, tDo, tDo + .8)), 28, 14); ctx.fillStyle = col; ctx.fill(); ctx.restore(); txt(lab, cx, 1100, 28, col, { weight: 800, ls: 3 }); };
    bar(DXS[0], 1 / 3, C.accent, 'QUEDARTE'); bar(DXS[1], 2 / 3, C.mint, 'CAMBIAR');
    txt('×2', 540, 1230, 120, C.mint, { weight: 800, scale: d * pulse(t, 6) }); }
}

// 1.000 partidas (resultado fijo y reproducible para que coincida con la narración)
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const STAY = (() => { const a = []; for (let i = 0; i < 1000; i++) a.push(RND(i) < .3375); return a; })();
const STAY_WINS = STAY.filter(Boolean).length;
function scenePrueba(t, lt, s) {
  const T = w => wt('prueba', w), tMi = T('mil'), tQu = T('quedandote'), tTr = T('trescientas'), tCa = T('cambiando'), tSe = T('seiscientas');
  const n = Math.floor(1000 * easeIO(seg(t, tMi, tCa + 1.2)));
  const cnt = k => { let c = 0; for (let i = 0; i < k; i++) if (STAY[i]) c++; return c; };
  const sw = cnt(n), cw = n - sw;
  hud('L', 'QUEDÁNDOTE', String(sw), { color: C.line, size: 76 }); hud('R', 'CAMBIANDO', String(cw), { color: C.mint, size: 76 });
  txt(`${n} PARTIDAS`, W / 2, 470, 38, C.accent, { weight: 800, ls: 4, alpha: seg(t, tMi - .1, tMi + .3) });
  const cols = 25, cell = 14, drawG = (x0, col, win) => { for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols), w = win(i);
      ctx.fillStyle = w ? col : 'rgba(230,255,247,.16)'; ctx.fillRect(x0 + c * cell, 560 + r * cell, cell - 3, cell - 3); } };
  drawG(110, C.line, i => STAY[i]); drawG(620, C.mint, i => !STAY[i]);
  txt('SIN CAMBIAR', 285, 540, 24, C.label, { weight: 700, ls: 3 }); txt('CAMBIANDO', 795, 540, 24, C.mint, { weight: 700, ls: 3 });
  const a = easeBack(seg(t, tTr - .1, tTr + .4)), b = easeBack(seg(t, tSe - .1, tSe + .4));
  if (a > 0 && n >= 999) txt('≈ 1 DE CADA 3', 285, 1180, 40, C.line, { weight: 800, scale: a, ls: 2 });
  if (b > 0 && n >= 999) txt('≈ 2 DE CADA 3', 795, 1180, 40, C.mint, { weight: 800, scale: b, ls: 2 });
}

function sceneCien(t, lt, s) {
  const T = (w, n = 0) => wt('cien', w, n), tCi = T('cien'), tEl = T('eliges'), tNo = T('noventa'), tOc = T('ocho'), tSi = T('sigues'), tCm = T('cambias');
  headline('100 puertas', '', s.start + .1, t);
  const cols = 10, cw = 86, ch = 72, x0 = 540 - cols * cw / 2, y0 = 440, KEEP = 63, PICK = 17;
  const opened = i => { if (i === KEEP || i === PICK) return 0; const rank = i < KEEP ? (i < PICK ? i : i - 1) : i - 2; const t0 = tNo - .1 + (rank / 98) * (tOc + .6 - tNo); return openAt(t, t0, .25); };
  for (let i = 0; i < 100; i++) { const c = i % cols, r = Math.floor(i / cols), a = easeOut(seg(lt, .05 + i * .004, .3 + i * .004)), x = x0 + c * cw + cw / 2, y = y0 + r * ch;
    const op = opened(i), picked = i === PICK && t >= tEl - .05, keep = i === KEEP && t >= tNo + 1;
    ctx.save(); ctx.globalAlpha *= a;
    ctx.fillStyle = op > .5 ? 'rgba(3,20,26,.9)' : 'rgba(40,120,130,.45)'; ctx.fillRect(x - 34, y + 4, 68, 62);
    ctx.lineWidth = picked || keep ? 5 : 2.5; ctx.strokeStyle = picked ? C.accent : keep ? C.mint : C.soft; ctx.strokeRect(x - 34, y + 4, 68, 62);
    if (op > .5) goat(x, y + 36, 30, C.faint, 2.2); else circle(x + 20, y + 36, 4, { fill: picked ? C.accent : C.soft, stroke: null });
    ctx.restore(); }
  const pe = easeBack(seg(t, tEl - .05, tEl + .4)); if (pe > 0) { const c = PICK % cols, r = Math.floor(PICK / cols); txt('TÚ', x0 + c * cw + cw / 2, y0 + r * ch - 6, 26, C.accent, { weight: 800, scale: pe, ls: 2 }); }
  const kp = easeBack(seg(t, tSi - .1, tSi + .4)); if (kp > 0) { const c = KEEP % cols, r = Math.floor(KEEP / cols); circle(x0 + c * cw + cw / 2, y0 + r * ch + 35, 50 * pulse(t, 6), { stroke: C.mint, w: 5 }); }
  const n = Math.min(98, Math.floor(98 * seg(t, tNo - .1, tOc + .6)));
  if (t >= tNo - .1) hud('R', 'CABRAS ABIERTAS', String(n), { color: C.accent, size: 76 });
  const cm = easeBack(seg(t, tCm - .1, tCm + .4)); if (cm > 0) { txt('TU PUERTA: 1/100', 540, 1260, 44, C.accent, { weight: 800, scale: cm, ls: 2 }); txt('LA OTRA: 99/100', 540, 1330, 56, C.mint, { weight: 800, scale: cm, ls: 2 }); }
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
window.CHAPTERS = { labels: ['1 EL JUEGO', '2 LA TRAMPA', '3 POR QUÉ'], map: { hook: -1, reglas: 0, intuicion: 1, casos: 2, prueba: 2, cien: 2, cta: -1 } };
const DRAW = { hook: sceneHook, reglas: sceneReglas, intuicion: sceneIntuicion, casos: sceneCasos, prueba: scenePrueba, cien: sceneCien, cta: sceneCta };

window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: 0.05, type: 'boom' }); P('hook', 'abririas', 0, 'ding'); P('hook', 'coche', 0, 'ding'); P('hook', 'cabras', 0, 'buzz'); P('hook', 'eliges'); P('hook', 'otra', 0, 'swipe'); P('hook', 'cabra', 0, 'buzz'); P('hook', 'quedas'); P('hook', 'cambias', 0, 'ding');
  P('intuicion', 'cincuenta'); P('intuicion', 'no', 0, 'buzz'); P('intuicion', 'doble', 0, 'ding'); P('intuicion', 'explico', 0, 'boom');
  P('reglas', 'sabe'); P('reglas', 'siempre', 0, 'swipe'); P('reglas', 'tuya', 0, 'buzz'); P('reglas', 'nunca', 1, 'buzz'); P('reglas', 'cambiar'); P('reglas', 'cerrada', 0, 'ding');
  P('casos', 'casos'); P('casos', 'pierde', 0, 'buzz'); P('casos', 'gana', 0, 'ding'); P('casos', 'dos', 1, 'ding');
  P('prueba', 'mil', 0, 'swipe'); P('prueba', 'trescientas', 0, 'ding'); P('prueba', 'seiscientas', 0, 'ding');
  P('cien', 'eliges'); { const a = wt('cien', 'noventa'), b = wt('cien', 'ocho') + .6; for (let i = 0; i < 24; i++) E.push({ t: a + (b - a) * i / 23, type: 'hit' }); } P('cien', 'cambias', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
