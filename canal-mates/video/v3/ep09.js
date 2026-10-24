// Episodio 9 · ¿Te cambias de carril? (decisión cotidiana + Redelmeier y Tibshirani, Nature 1999)
const RL = 250, RR = 830, LM = (RL + RR) / 2, CS = 270;                  // carretera grande, vista desde arriba
const ME = (RL + LM) / 2, OT = (LM + RR) / 2, MY = 1120;
function carTop(x, y, s, col, fill) { ctx.save(); ctx.translate(x, y); rrect(-s * .3, -s * .5, s * .6, s, s * .14); ctx.fillStyle = fill || 'rgba(5,32,42,.92)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = col; ctx.stroke();
  rrect(-s * .22, -s * .3, s * .44, s * .2, s * .05); ctx.fillStyle = 'rgba(230,255,247,.18)'; ctx.fill(); rrect(-s * .22, s * .14, s * .44, s * .16, s * .05); ctx.fill(); ctx.restore(); }
function road(off) { ctx.fillStyle = 'rgba(5,32,42,.6)'; ctx.fillRect(RL, 0, RR - RL, H); line(RL, 0, RL, H, C.line, 6); line(RR, 0, RR, H, C.line, 6);
  ctx.save(); ctx.setLineDash([80, 60]); ctx.lineDashOffset = -off; line(LM, 0, LM, H, C.soft, 6); ctx.restore(); }
function lane(x, t, speed, phase = 0, gap = 360) { ctx.save(); ctx.beginPath(); ctx.rect(RL, 0, RR - RL, H); ctx.clip(); const span = gap * 7;
  for (let k = 0; k < 7; k++) { const y = ((k * gap + phase + t * speed) % span + span) % span - 200; carTop(x, y, CS, C.line); } ctx.restore(); }
function me(dx = 0) { carTop(ME + dx, MY, CS, C.accent, 'rgba(255,143,107,.3)'); txt('TÚ', ME + dx, MY, 52, C.accent, { weight: 800 }); }
function band(text, size, col, a, y = 470, sc = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(5,32,42,.82)'; ctx.fillRect(0, y - size * .9, W, size * 1.8); ctx.restore(); txt(text, 540, y + 4, size, col, { weight: 800, alpha: a, scale: sc }); }
function choice(t, a, picked = -1) { if (a <= 0) return; const p = (i, x, lab, col) => { const on = picked === i, sc = a * (picked < 0 ? 1 + .04 * Math.sin(t * 6 + i) : 1);
    ctx.save(); ctx.translate(x, 690); ctx.scale(sc, sc); rrect(-215, -58, 430, 116, 58); ctx.fillStyle = on ? col : 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); txt(lab, 0, 4, 42, on ? C.ink : col, { weight: 800, ls: 2 }); ctx.restore(); };
  p(0, 300, 'ME QUEDO', C.mint); p(1, 780, 'ME CAMBIO', C.accent); }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tLa = T('lado'), tCa = T('cambias'), tCs = T('casi'), tNu = T('nunca');
  road(0); lane(OT, t, 760, 0); me();                                            // fotograma 0: tú parado, el otro carril te pasa sin parar
  const passed = Math.floor(t * 2.1); hud('R', 'TE HAN ADELANTADO', String(passed), { color: C.red, size: 96 });
  band('LLEGAS TARDE', 110, C.line, (1 - seg(t, tLa - .9, tLa - .7)) * 1, 470, lerp(1.12, 1, easeOut(seg(t, 0, .35))));
  band('EL OTRO AVANZA', 104, C.red, seg(t, tLa - .8, tLa - .6) * (1 - seg(t, tCa - .25, tCa - .1)));
  band('¿TE CAMBIAS?', 130, C.accent, seg(t, tCa - .2, tCa), 470, .9 + .1 * easeBack(seg(t, tCa - .2, tCa + .25)));
  choice(t, easeBack(seg(t, tCa, tCa + .35)));
  stamp('CASI NUNCA SIRVE', 540, 900, 60, C.accent, easeBack(seg(t, tNu - .1, tNu + .3)));
}
function scenePrueba(t, lt, s) {
  const T = (w, n = 0) => wt('prueba', w, n), tMe = T('media'), tLe = T('lentos'), tVe = T('veinte'), tTr = T('tres', 0), tSe = T('sesenta'), tUn = T('uno'), tCu = T('cuatro'), tAd = T('adelantan');
  headline('Los dos carriles', 'van igual', s.start + .1, t, { alpha: 1 - seg(t, tLe - .3, tLe - .1) }); headline('Los tramos lentos', 'duran más', tLe - .1, t, { cps: 50 });
  const m = easeBack(seg(t, s.start + .1, s.start + .5)) * (1 - seg(t, tLe - .3, tLe)); if (m > 0) { for (const [x, lab] of [[300, 'TU CARRIL'], [780, 'EL OTRO']]) { ctx.save(); ctx.translate(x, 800); ctx.scale(m, m); circle(0, 0, 150, { stroke: C.line, w: 6 }); txt('40', 0, -10, 110, C.line, { weight: 800 }); txt('km/h de media', 0, 70, 26, C.label, { weight: 700 }); ctx.restore(); txt(lab, x, 1010, 34, C.label, { weight: 800, ls: 2, alpha: m }); } stamp('EMPATE', 540, 1150, 64, C.mint, m, 0); }
  const bx = 120, bw = 840, a = easeOut(seg(t, tVe - .1, tTr + .3)), b = easeOut(seg(t, tSe - .1, tUn + .3));
  if (t >= tVe - .2) { txt('1 km a 20 km/h', bx, 560, 44, C.red, { align: 'left', weight: 800, alpha: seg(t, tVe - .1, tVe + .2) }); rrect(bx, 600, bw * .75 * a, 110, 20); ctx.fillStyle = 'rgba(255,93,115,.6)'; ctx.fill(); if (a > .9) txt('3 MINUTOS', bx + bw * .375, 657, 54, C.line, { weight: 800 }); }
  if (t >= tSe - .2) { txt('1 km a 60 km/h', bx, 800, 44, C.mint, { align: 'left', weight: 800, alpha: seg(t, tSe - .1, tSe + .2) }); rrect(bx, 840, bw * .25 * b, 110, 20); ctx.fillStyle = 'rgba(126,240,200,.65)'; ctx.fill(); if (b > .9) txt('1 MIN', bx + bw * .125, 897, 46, C.ink, { weight: 800 }); }
  const c = easeOut(seg(t, tCu - .3, tCu + .4)); if (c > 0) { for (let i = 0; i < 4; i++) { const on = i < 3, x = 200 + i * 227, k = easeBack(seg(t, tCu - .3 + i * .12, tCu + i * .12));
      ctx.save(); ctx.translate(x, 1150); ctx.scale(k, k); rrect(-95, -95, 190, 190, 28); ctx.fillStyle = on ? 'rgba(255,93,115,.55)' : 'rgba(126,240,200,.6)'; ctx.fill(); txt(on ? 'TE ADELANTAN' : 'AVANZAS', 0, -20, 22, on ? C.line : C.ink, { weight: 800 }); txt('1 min', 0, 30, 40, on ? C.line : C.ink, { weight: 800 }); ctx.restore(); }
    stamp('3 DE CADA 4 MINUTOS', 540, 1340, 46, C.red, easeBack(seg(t, tAd - .3, tAd + .1)), 0); }
}
function sceneCabeza(t, lt, s) {
  const T = w => wt('cabeza', w), tAd = T('adelantas'), tNo = T('notas'), tPa = T('parece'), tGa = T('gana');
  road(t * 900); lane(OT, t, -900, 0, 520); me();
  headline('Cuando vas rápido…', '', s.start + .1, t, { alpha: 1 - seg(t, tPa - .3, tPa - .1) });
  const n = easeBack(seg(t, tNo - .1, tNo + .3)) * (1 - seg(t, tPa - .3, tPa - .1)); if (n > 0) band('¡Y NI LO NOTAS!', 90, C.mint, n);
  const b = easeBack(seg(t, tPa - .1, tPa + .35)); if (b > 0) band('«EL OTRO SIEMPRE GANA»', 72, C.red, b, 470, b);
}
function sceneEstudio(t, lt, s) {
  const T = w => wt('estudio', w), tNa = T('nature'), tSe = T('setenta'), tRe = T('realidad');
  const card = easeBack(seg(t, tNa - .2, tNa + .3)); if (card > 0) { ctx.save(); ctx.translate(540, 480); ctx.scale(card, card); rrect(-330, -80, 660, 160, 26); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke(); txt('NATURE · 1999', 0, -18, 56, C.line, { weight: 800, ls: 3 }); txt('Redelmeier y Tibshirani', 0, 40, 30, C.label, { weight: 600 }); ctx.restore(); }
  const k = Math.floor(10 * seg(t, tSe - .3, tSe + .7)); for (let i = 0; i < 10; i++) { const x = 150 + (i % 5) * 195, y = 720 + Math.floor(i / 5) * 250, on = i < 7 && i < k; person(x, y + 90, 170, on ? C.red : C.line, on ? 'rgba(255,93,115,.3)' : null, 4); }
  const p = easeBack(seg(t, tSe - .1, tSe + .3)); if (p > 0) band('70% CREÍA QUE EL OTRO IBA MÁS RÁPIDO', 40, C.red, p, 1240);
  const r = easeBack(seg(t, tRe - .1, tRe + .3)); if (r > 0) stamp('Y ERA MÁS LENTO', 540, 1350, 54, C.mint, r, 0);
}
function sceneVeredicto(t, lt, s) {
  const T = (w, n = 0) => wt('veredicto', w, n), tCa = T('cambias'), tCo = T('compensa'), tMi = T('minuto'), tRi = T('riesgo');
  road(t * 260); lane(OT, t, 140, 80); me();
  band('¿TE CAMBIAS?', 120, C.accent, easeOut(seg(t, s.start, s.start + .3)));
  choice(t, easeBack(seg(t, tCa - .1, tCa + .3)), t >= tCo - .1 ? 0 : -1);
  if (t >= tCo - .1) { const x = easeOut(seg(t, tCo - .1, tCo + .2)); ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(600, 650); ctx.lineTo(600 + 360 * x, 730); ctx.stroke(); ctx.restore(); }
  const a = easeBack(seg(t, tMi - .2, tMi + .2)); if (a > 0) stamp('+0 MINUTOS', 540, 880, 64, C.line, a, 0);
  const r = easeBack(seg(t, tRi - .2, tRi + .2)); if (r > 0) stamp('MÁS RIESGO', 540, 1020, 64, C.red, r, 0);
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, prueba: scenePrueba, cabeza: sceneCabeza, estudio: sceneEstudio, veredicto: sceneVeredicto, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 18; i++) E.push({ t: .05 + i * .48, type: 'swipe' }); P('hook', 'cambias', 0, 'boom'); P('hook', 'nunca', 0, 'ding');
  P('prueba', 'media', 0, 'ding'); P('prueba', 'veinte', 0, 'swipe'); P('prueba', 'sesenta', 0, 'swipe'); P('prueba', 'cuatro', 0, 'pop'); P('prueba', 'adelantan', 0, 'boom');
  P('cabeza', 'notas', 0, 'ding'); P('cabeza', 'parece', 0, 'buzz'); P('estudio', 'nature'); P('estudio', 'setenta', 0, 'ding'); P('estudio', 'realidad', 0, 'boom');
  P('veredicto', 'cambias'); P('veredicto', 'compensa', 0, 'buzz'); P('veredicto', 'minuto', 0, 'pop'); P('veredicto', 'riesgo', 0, 'boom');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
