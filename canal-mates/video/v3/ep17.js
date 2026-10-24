// Episodio 17 · El problema de los tanques alemanes (estimador M(1+1/k)−1; Ruggles y Brodie 1947)
function tank(x, y, s, num, o = {}) { ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= o.alpha ?? 1; const col = o.col || C.line;
  ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, s * .03); ctx.lineJoin = 'round';
  rrect(-s * .55, -s * .1, s * 1.1, s * .3, s * .14); ctx.fill(); ctx.stroke(); for (let i = 0; i < 5; i++) circle(-s * .42 + i * s * .21, s * .05, s * .07, { stroke: col, w: Math.max(1.5, s * .02) });
  ctx.beginPath(); ctx.moveTo(-s * .45, -s * .1); ctx.lineTo(-s * .35, -s * .3); ctx.lineTo(s * .35, -s * .3); ctx.lineTo(s * .45, -s * .1); ctx.closePath(); ctx.fill(); ctx.stroke();
  rrect(-s * .2, -s * .48, s * .38, s * .2, s * .05); ctx.fill(); ctx.stroke(); line(s * .18, -s * .4, s * .7, -s * .45, col, Math.max(2, s * .05)); ctx.restore();
  if (num !== undefined) { rrect(x - s * .2, y - s * .26, s * .4, s * .14, s * .03); ctx.fillStyle = '#f4fffb'; ctx.fill(); txt(String(num), x, y - s * .19, s * .1, C.ink, { weight: 800 }); } }
function sceneHook(t, lt, s) {
  const T = (w, n = 0) => wt('hook', w, n), tTa = T('tanques'), tEs = T('espias'), tMa = T('matematicos'), tAc = T('acerto');
  // fotograma 0: columna de tanques avanzando
  for (let i = 0; i < 6; i++) { const x = ((i * 260 + t * 160) % 1560) - 240; tank(x, 1180, 230, 100 + i * 7, { alpha: .9 }); }
  band('¿CUÁNTOS TANQUES', 96, C.line, 1, 330, lerp(1.12, 1, easeOut(seg(t, 0, .35)))); band('TENÍA HITLER?', 96, C.accent, 1, 480, lerp(1.12, 1, easeOut(seg(t, 0, .35))));
  const a = easeBack(seg(t, tEs - .1, tEs + .3)), b = easeBack(seg(t, tMa - .1, tMa + .3));
  if (a > 0) { ctx.save(); ctx.translate(290, 760); ctx.scale(a, a); rrect(-230, -130, 460, 260, 30); ctx.fillStyle = 'rgba(5,32,42,.94)'; ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); txt('ESPÍAS', 290, 690, 44, C.red, { weight: 800, scale: a }); txt('+1.500', 290, 790, 96, C.line, { weight: 800, scale: a }); }
  if (b > 0) { ctx.save(); ctx.translate(790, 760); ctx.scale(b, b); rrect(-230, -130, 460, 260, 30); ctx.fillStyle = 'rgba(5,32,42,.94)'; ctx.fill(); ctx.strokeStyle = C.mint; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); txt('MATEMÁTICOS', 790, 690, 40, C.mint, { weight: 800, scale: b }); txt('−300', 790, 790, 96, C.line, { weight: 800, scale: b }); }
  stamp('¿QUIÉN ACERTÓ?', 540, 1400, 64, C.accent, easeBack(seg(t, tAc - .3, tAc + .1)));
}
function sceneTruco(t, lt, s) {
  const T = (w, n = 0) => wt('truco', w, n), tSe = T('serie'), tOr = T('orden'), tAp = T('apuntaban');
  headline('El truco:', 'números de serie', s.start + .1, t);
  const z = lerp(1, 1.6, easeIO(seg(t, tSe - .2, tSe + .8))); ctx.save(); ctx.translate(540, 900); ctx.scale(z, z); ctx.translate(-540, -900); tank(540, 960, 520, 'Nº 37'); ctx.restore();
  const o = easeOut(seg(t, tOr - .2, tOr + .4)); if (o > 0) for (let i = 0; i < 6; i++) txt(String(i + 1), 170 + i * 148, 1260, 60, C.line, { weight: 800, alpha: o * easeOut(seg(t, tOr - .2 + i * .1, tOr + .2 + i * .1)) });
  const a = easeBack(seg(t, tAp - .3, tAp + .1)); if (a > 0) bubble(540, 520, 620, 100, 'CAPTURADO → APUNTADO', C.accent, { scale: a, size: 40 });
}
const CAP = [14, 27, 33, 48, 60];
const NX = n => 120 + (n / 80) * 840;
function numberLine(t, upto, o = {}) { line(100, 1100, 980, 1100, C.soft, 5); for (let n = 0; n <= 80; n += 10) { line(NX(n), 1082, NX(n), 1118, C.soft, 3); txt(String(n), NX(n), 1165, 36, C.label, { weight: 700 }); }
  CAP.forEach((n, i) => { if (i >= upto) return; const y = i % 2 ? 800 : 960; line(NX(n), y + 40, NX(n), 1100, C.accent, 3); circle(NX(n), 1100, 10, { fill: C.accent, stroke: null }); tank(NX(n), y, 150, undefined, { col: C.accent }); txt(String(n), NX(n), y - 105, 50, C.accent, { weight: 800 }); }); }
function sceneEjemplo(t, lt, s) {
  const T = (w, n = 0) => wt('ejemplo', w, n), tCi = T('cinco'), tSe = T('sesenta', 0), tLo = T('logico'), tMa = T('mas', 1), tHu = T('hueco');
  headline('Ejemplo', '', s.start + .1, t);
  const n = t < tCi ? 0 : Math.min(5, 1 + Math.floor((t - tCi) / .35)); numberLine(t, n);
  if (t >= tSe - .1) { const k = easeBack(seg(t, tSe - .1, tSe + .3)); txt('MÁXIMO: 60', 540, 440, 64, C.accent, { weight: 800, scale: k }); }
  const l = easeBack(seg(t, tLo - .1, tLo + .3)) * (1 - seg(t, tMa - .2, tMa)); if (l > 0) stamp('¿HAY 60?', 540, 560, 66, C.line, l);
  if (t >= tMa - .1) { const k = easeBack(seg(t, tMa - .1, tMa + .3)); stamp('¡HAY MÁS!', 540, 560, 66, C.mint, k);
    const h = easeOut(seg(t, tHu - .4, tHu + .4)); if (h > 0) { ctx.save(); ctx.globalAlpha *= h; ctx.fillStyle = 'rgba(126,240,200,.25)'; ctx.fillRect(NX(60), 980, NX(71) - NX(60), 120); ctx.restore(); txt('?', (NX(60) + NX(71)) / 2, 1040, 70, C.mint, { weight: 800, alpha: h }); } }
}
function sceneFormula(t, lt, s) {
  const T = (w, n = 0) => wt('formula', w, n), tAl = T('alto', 0), tDi = T('dividido'), tMe = T('menos', 0), tSe = T('sesenta'), tDo = T('doce'), tSy = T('setenta');
  headline('La fórmula', '', s.start + .1, t);
  const p = (x, y, str, col, tt, sz = 80) => { const k = easeBack(seg(t, tt - .15, tt + .25)); if (k > 0) txt(str, x, y, sz, col, { weight: 800, scale: k }); };
  p(200, 640, 'MÁX', C.accent, tAl); p(350, 640, '+', C.line, tDi - .6); p(560, 640, 'MÁX ÷ n', C.accent, tDi); p(780, 640, '−', C.line, tMe); p(880, 640, '1', C.line, tMe + .2);
  p(200, 820, '60', C.line, tSe, 96); p(350, 820, '+', C.line, tSe + .3, 96); p(560, 820, '12', C.mint, tDo, 96); p(780, 820, '−', C.line, tDo + .4, 96); p(880, 820, '1', C.line, tDo + .5, 96);
  if (t >= tDo) txt('(60 ÷ 5 tanques)', 560, 900, 32, C.label, { weight: 700, alpha: seg(t, tDo, tDo + .3) });
  const k = easeBack(seg(t, tSy - .1, tSy + .35)); if (k > 0) { stamp('≈ 71 TANQUES', 540, 1080, 80, C.mint, k, 0); }
}
function sceneFinal(t, lt, s) {
  const T = (w, n = 0) => wt('final', w, n), tAg = T('agosto'), tEs = T('espias'), tMa = T('matematicos'), tRe = T('real');
  headline('Agosto de 1942', '', tAg - .2, t);
  const bars = [['ESPÍAS', 1550, C.red, tEs + .8], ['MATEMÁTICOS', 327, C.mint, tMa + .9], ['REALIDAD', 342, '#ffd166', tRe + .6]];
  bars.forEach(([lab, v, col, tt], i) => { const k = easeOut(seg(t, tt - .5, tt + .4)); if (k <= 0) return; const y = 600 + i * 220, w = 800 * v / 1550 * k;
    txt(lab, 140, y - 50, 40, col, { align: 'left', weight: 800 }); txt(fmt(Math.round(v * k)), 940, y - 50, 56, col, { align: 'right', weight: 800 }); rrect(140, y, Math.max(10, w), 90, 20); ctx.fillStyle = col; ctx.fill(); });
  if (t >= tRe + .8) stamp('¡CASI EXACTO!', 540, 1220, 70, C.mint, easeBack(seg(t, tRe + .8, tRe + 1.2)));
}
function sceneCierre(t, lt, s) {
  for (let i = 0; i < 5; i++) tank(150 + i * 195, 1050, 170, undefined, { col: C.accent });
  band('NÚMEROS DE SERIE 1', 76, C.mint, 1, 470); band('ESPÍAS 0', 76, C.red, 1, 620);
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, truco: sceneTruco, ejemplo: sceneEjemplo, formula: sceneFormula, final: sceneFinal, cierre: sceneCierre, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'boom' }); P('hook', 'espias', 0, 'pop'); P('hook', 'matematicos', 0, 'pop'); P('hook', 'acerto', 0, 'boom');
  P('truco', 'serie', 0, 'swipe'); P('truco', 'orden'); P('truco', 'apuntaban', 0, 'ding');
  { const a = wt('ejemplo', 'cinco'); for (let i = 0; i < 5; i++) E.push({ t: a + i * .35, type: 'pop' }); } P('ejemplo', 'sesenta', 0, 'ding'); P('ejemplo', 'mas', 1, 'boom');
  P('formula', 'doce', 0, 'pop'); P('formula', 'setenta', 0, 'boom');
  P('final', 'espias', 0, 'buzz'); P('final', 'matematicos', 0, 'ding'); P('final', 'real', 0, 'boom');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
