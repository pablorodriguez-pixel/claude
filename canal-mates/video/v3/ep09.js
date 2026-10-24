// Episodio 9 · ¿Por qué el carril de al lado siempre parece ir más rápido? (Redelmeier y Tibshirani, Nature 1999)
const RL = 330, RR = 750, LM = (RL + RR) / 2;      // carretera vista desde arriba
function carTop(x, y, s, col, fill) { ctx.save(); ctx.translate(x, y); rrect(-s * .3, -s * .5, s * .6, s, s * .14); ctx.fillStyle = fill || 'rgba(5,32,42,.92)'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = col; ctx.stroke();
  rrect(-s * .22, -s * .3, s * .44, s * .2, s * .05); ctx.fillStyle = 'rgba(230,255,247,.18)'; ctx.fill(); rrect(-s * .22, s * .14, s * .44, s * .16, s * .05); ctx.fill(); ctx.restore(); }
function road(t, off) { ctx.fillStyle = 'rgba(5,32,42,.55)'; ctx.fillRect(RL, 360, RR - RL, 1060); line(RL, 360, RL, 1420, C.line, 5); line(RR, 360, RR, 1420, C.line, 5);
  ctx.save(); ctx.setLineDash([60, 50]); ctx.lineDashOffset = -off; line(LM, 360, LM, 1420, C.soft, 5); ctx.restore(); }
function traffic(t, relSpeed, phase = 0, o = {}) { const span = 1400, gap = o.gap || 300; ctx.save(); ctx.beginPath(); ctx.rect(RL, 362, RR - RL, 1056); ctx.clip(); for (let k = 0; k < 8; k++) { const y = ((k * gap + phase + t * relSpeed) % span + span) % span - 100; if (y < 300 || y > 1480) continue; carTop((LM + RR) / 2, y, 210, C.line); } ctx.restore(); }
const SC_Y = 1050;
function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tSi = T('siempre'), tIl = T('ilusion');
  headline('¿Por qué el otro', 'carril va más rápido?', .05, t, { cps: 36, size: 54 });
  road(t, t * 520); traffic(t, 620, 0); carTop((RL + LM) / 2, SC_Y, 210, C.accent, 'rgba(255,143,107,.25)'); txt('TÚ', (RL + LM) / 2, SC_Y, 40, C.accent, { weight: 800 });
  const n = Math.floor(t * 2.1); hud('R', 'TE HAN ADELANTADO', String(n), { color: C.red, size: 84, alpha: seg(t, .2, .5) * (1 - seg(t, tIl - .2, tIl)) });
  stamp('ES UNA ILUSIÓN', 540, 820, 62, C.accent, easeBack(seg(t, tIl - .1, tIl + .3)));
}
function sceneEscena(t, lt, s) {
  const T = w => wt('escena', w), tMe = T('media'), tRa = T('ratos');
  headline('Dos carriles', 'igual de rápidos', s.start + .1, t);
  const ph = Math.floor((t - tRa) / 1.1) % 2, inPh = t >= tRa;
  road(t, t * 300); traffic(t, inPh ? (ph ? -400 : 400) : 0, 200); carTop((RL + LM) / 2, SC_Y, 210, C.accent, 'rgba(255,143,107,.25)'); txt('TÚ', (RL + LM) / 2, SC_Y, 40, C.accent, { weight: 800 });
  const m = easeBack(seg(t, tMe - .1, tMe + .3)); if (m > 0) { txt('MEDIA', 200, 520, 28, C.label, { weight: 700, ls: 2, alpha: m }); txt('40 km/h', 200, 570, 44, C.line, { weight: 800, alpha: m }); txt('MEDIA', 880, 520, 28, C.label, { weight: 700, ls: 2, alpha: m }); txt('40 km/h', 880, 570, 44, C.line, { weight: 800, alpha: m }); }
  if (inPh) txt(ph ? 'AVANZAS TÚ' : 'AVANZA EL OTRO', 540, 1330, 44, ph ? C.mint : C.red, { weight: 800, ls: 2 });
}
function sceneClave(t, lt, s) {
  const T = (w, n = 0) => wt('clave', w, n), tDu = T('duran'), tVe = T('veinte'), tTr = T('tres'), tSe = T('sesenta'), tUn = T('uno'), tTi = T('tiempo'), tAd = T('adelantan');
  headline('Los tramos lentos', 'duran más', s.start + .1, t);
  const bx = 120, bw = 840, y1 = 620, y2 = 860;
  const a = easeOut(seg(t, tVe - .1, tTr + .3)), b = easeOut(seg(t, tSe - .1, tUn + .3));
  txt('1 km a 20 km/h', bx, y1 - 50, 38, C.red, { align: 'left', weight: 800, alpha: seg(t, tVe - .1, tVe + .2) });
  rrect(bx, y1, bw * .75 * a, 80, 16); ctx.fillStyle = 'rgba(255,93,115,.55)'; ctx.fill(); if (a > .9) txt('3 MIN', bx + bw * .375, y1 + 42, 46, C.line, { weight: 800 });
  txt('1 km a 60 km/h', bx, y2 - 50, 38, C.mint, { align: 'left', weight: 800, alpha: seg(t, tSe - .1, tSe + .2) });
  rrect(bx, y2, bw * .25 * b, 80, 16); ctx.fillStyle = 'rgba(126,240,200,.6)'; ctx.fill(); if (b > .9) txt('1 MIN', bx + bw * .125, y2 + 42, 40, C.ink, { weight: 800 });
  const c = easeOut(seg(t, tTi - .1, tTi + .5)); if (c > 0) { txt('DE TU TIEMPO:', bx, 1060, 34, C.label, { align: 'left', weight: 700, ls: 2, alpha: c });
    rrect(bx, 1090, bw, 100, 20); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fill(); ctx.save(); rrect(bx, 1090, bw * .75 * c, 100, 20); ctx.fillStyle = 'rgba(255,93,115,.6)'; ctx.fill(); rrect(bx + bw * .75, 1090, bw * .25 * c, 100, 20); ctx.fillStyle = 'rgba(126,240,200,.6)'; ctx.fill(); ctx.restore();
    txt('75% TE ADELANTAN', bx + bw * .375, 1140, 36, C.line, { weight: 800, alpha: c }); txt('25%', bx + bw * .875, 1140, 34, C.ink, { weight: 800, alpha: c }); }
}
function sceneCabeza(t, lt, s) {
  const T = w => wt('cabeza', w), tAd = T('adelantas'), tCa = T('cabeza'), tLe = T('lento');
  road(t, t * 700); traffic(t, -700, 0, { gap: 420 }); carTop((RL + LM) / 2, SC_Y, 210, C.accent, 'rgba(255,143,107,.25)'); txt('TÚ', (RL + LM) / 2, SC_Y, 40, C.accent, { weight: 800 });
  headline('Cuando vas rápido…', '', s.start + .1, t, { alpha: 1 - seg(t, tCa - .2, tCa) });
  const b = easeBack(seg(t, tCa - .1, tCa + .35)); if (b > 0) bubble(560, 560, 760, 130, '«MI CARRIL ES EL LENTO»', C.red, { scale: b, size: 40 });
}
function sceneEstudio(t, lt, s) {
  const T = (w, n = 0) => wt('estudio', w, n), tNa = T('nature'), tSe = T('setenta'), tRe = T('realidad'), tLe = T('lento');
  const card = easeBack(seg(t, tNa - .2, tNa + .3)); if (card > 0) { ctx.save(); ctx.translate(540, 470); ctx.scale(card, card); rrect(-300, -70, 600, 140, 24); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke(); txt('NATURE · 1999', 0, -14, 46, C.line, { weight: 800, ls: 3 }); txt('Redelmeier y Tibshirani', 0, 34, 28, C.label, { weight: 600 }); ctx.restore(); }
  const k = Math.floor(10 * seg(t, tSe - .3, tSe + .7)); for (let i = 0; i < 10; i++) { const x = 160 + (i % 5) * 190, y = 760 + Math.floor(i / 5) * 230, on = i < 7 && i < k;
    person(x, y + 80, 150, on ? C.red : C.line, on ? 'rgba(255,93,115,.3)' : null, 3); }
  const p = easeBack(seg(t, tSe - .1, tSe + .3)); if (p > 0) txt('70% CREÍA QUE EL OTRO IBA MÁS RÁPIDO', 540, 1230, 34, C.red, { weight: 800, scale: p, ls: 1 });
  const r = easeBack(seg(t, tRe - .1, tRe + .3)); if (r > 0) stamp('Y ERA MÁS LENTO', 540, 1320, 46, C.mint, r, 0);
}
function sceneCierre(t, lt, s) {
  const T = w => wt('cierre', w), tCa = T('carril'), tPi = T('piensalo'), tIl = T('ilusion');
  road(t, t * 300); traffic(t, 120, 50);
  const sway = Math.sin(clamp((t - tCa) / 1.2) * Math.PI) * 60; carTop((RL + LM) / 2 + sway, SC_Y, 210, C.accent, 'rgba(255,143,107,.25)'); txt('TÚ', (RL + LM) / 2 + sway, SC_Y, 40, C.accent, { weight: 800 });
  headline('¿Cambiar?', '', s.start + .1, t);
  stamp('PIÉNSALO DOS VECES', 540, 640, 54, C.accent, easeBack(seg(t, tPi - .1, tPi + .3)), 0);
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, escena: sceneEscena, clave: sceneClave, cabeza: sceneCabeza, estudio: sceneEstudio, cierre: sceneCierre, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 7; i++) E.push({ t: .3 + i * .48, type: 'swipe' }); P('hook', 'siempre', 0, 'ding'); P('hook', 'ilusion', 0, 'boom');
  P('escena', 'media'); P('clave', 'veinte', 0, 'swipe'); P('clave', 'tres', 0, 'pop'); P('clave', 'sesenta', 0, 'swipe'); P('clave', 'tiempo', 0, 'boom');
  P('cabeza', 'cabeza', 0, 'buzz'); P('estudio', 'nature', 0, 'pop'); P('estudio', 'setenta', 0, 'ding'); P('estudio', 'realidad', 0, 'boom'); P('cierre', 'piensalo', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
