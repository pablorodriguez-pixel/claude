// Episodio 16 · Ley de Benford: el 30,1 % de los números reales empiezan por 1 (log10(1+1/d))
const BEN = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => Math.log10(1 + 1 / d));
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
function bars(t, mix, o = {}) {   // mix 0 = uniforme (11,1 %), 1 = Benford
  const x0 = 120, y0 = 1180, bw = 84, gap = 10, Hmax = 1500;
  for (let d = 0; d < 9; d++) { const v = lerp(1 / 9, BEN[d], mix) * (o.fake ? 0 : 1) + (o.fake ? 1 / 9 : 0), h = v * Hmax, x = x0 + d * (bw + gap);
    rrect(x, y0 - h, bw, h, 12); ctx.fillStyle = o.fake ? 'rgba(255,93,115,.6)' : (d === 0 ? C.accent : d === 8 ? 'rgba(230,255,247,.35)' : 'rgba(126,240,200,.55)'); ctx.fill();
    txt(String(d + 1), x + bw / 2, y0 + 44, 48, C.line, { weight: 800 }); if (o.pct) txt((v * 100).toFixed(0) + '%', x + bw / 2, y0 - h - 30, 30, d === 0 ? C.accent : C.line, { weight: 800 }); }
  line(100, y0, 980, y0, C.soft, 3); }
function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tFa = T('factura'), tDe = T('delatarte'), tSa = T('sabes'), tNa = T('nadie');
  // fotograma 0: una factura con cifras inventadas cambiando
  ctx.save(); ctx.translate(540, 960); ctx.rotate(-.04); rrect(-330, -420, 660, 840, 20); ctx.fillStyle = '#f4fffb'; ctx.fill(); ctx.restore();
  txt('FACTURA', 540, 600, 64, C.ink, { weight: 800, ls: 6 });
  for (let i = 0; i < 7; i++) { const v = Math.floor(100 + RND(i * 13 + Math.floor(t * 6)) * 9800); txt('Concepto ' + (i + 1), 300, 700 + i * 80, 32, '#3b5a60', { align: 'left', weight: 600 }); txt(fmt(v) + ' €', 780, 700 + i * 80, 40, C.ink, { align: 'right', weight: 800 }); }
  band('¿TE INVENTAS', 104, C.line, 1 - seg(t, tDe - .5, tDe - .3), 330, lerp(1.12, 1, easeOut(seg(t, 0, .35)))); band('UNA FACTURA?', 104, C.accent, 1 - seg(t, tDe - .5, tDe - .3), 480);
  band('LAS MATES TE DELATAN', 76, C.red, seg(t, tDe - .5, tDe - .3), 400);
  const st = easeBack(seg(t, tNa - .2, tNa + .2)); if (st > 0) stamp('CASI NADIE LO SABE', 540, 1290, 58, C.accent, st);
  if (t > tDe - .3) { const k = easeBack(seg(t, tDe - .3, tDe + .1)); ctx.save(); ctx.translate(540, 960); ctx.rotate(-.18); ctx.scale(k, k); rrect(-260, -80, 520, 160, 20); ctx.strokeStyle = C.red; ctx.lineWidth = 10; ctx.stroke(); ctx.restore(); txt('FALSA', 540, 965, 100, C.red, { weight: 800, scale: k }); }
}
function scenePregunta(t, lt, s) {
  const T = w => wt('pregunta', w), tPr = T('precios'), tFa = T('facturas'), tPo = T('poblacion'), tCu = T('cuantos'), tNu = T('nueve');
  headline('¿Cuántos empiezan', 'por 1?', s.start + .1, t);
  const items = [['PRECIOS', ['1,29 €', '18,50 €', '2,99 €', '145 €'], tPr], ['FACTURAS', ['1.240 €', '312 €', '17.900 €', '86 €'], tFa], ['POBLACIÓN', ['1.384', '12.007', '3.251', '156.000'], tPo]];
  items.forEach(([lab, vals, tt], i) => { const a = easeOut(seg(t, tt - .2, tt + .3)); if (a <= 0) return; txt(lab, 200 + i * 340, 520, 30, C.label, { weight: 800, ls: 2, alpha: a });
    vals.forEach((v, j) => { const one = v[0] === '1'; txt(v, 200 + i * 340, 600 + j * 80, 44, one && t >= tCu ? C.accent : C.line, { weight: 800, alpha: a }); }); });
  const q = easeBack(seg(t, tNu - .5, tNu)); if (q > 0) { bars(t, 0, { pct: true }); stamp('¿1 DE CADA 9?', 540, 1360, 58, C.line, q, 0); }
}
function scenePero(t, lt, s) {
  const T = w => wt('pero', w), tNo = T('no'), tTr = T('treinta'), tNu = T('nueve'), tBe = T('benford');
  headline('Pues no…', '', s.start + .1, t, { alpha: 1 - seg(t, tBe - .3, tBe - .1) }); headline('Ley de Benford', '', tBe - .1, t, { cps: 40 });
  bars(t, easeIO(seg(t, tNo, tTr + .6)), { pct: true });
  const a = easeBack(seg(t, tTr - .1, tTr + .3)); if (a > 0) stamp('30 % EMPIEZAN POR 1', 540, 470, 56, C.accent, a, 0);
  const b = easeBack(seg(t, tNu - .1, tNu + .3)); if (b > 0) txt('por 9: menos del 5 %', 540, 570, 44, C.line, { weight: 800, scale: b });
}
function scenePorque(t, lt, s) {
  const T = (w, n = 0) => wt('porque', w, n), tDo = T('doblarse'), tNu = T('nueve'), tPo = T('poco'), tTi = T('tiempo');
  headline('¿Por qué?', '', s.start + .1, t);
  const row = (y, a, b, pct, col, tt, lab) => { const k = easeOut(seg(t, tt - .3, tt + .5)); if (k <= 0) return; txt(a, 200, y, 80, C.line, { weight: 800, alpha: k }); txt('→', 400, y, 70, C.label, { weight: 800, alpha: k }); txt(b, 590, y, 80, C.line, { weight: 800, alpha: k });
    rrect(140, y + 70, 800 * pct * k, 50, 25); ctx.fillStyle = col; ctx.fill(); txt(lab, 860, y, 52, col, { weight: 800, alpha: k }); };
  row(620, '100', '200', 1, C.accent, tDo, '+100 %'); row(900, '900', '1.000', .11, C.mint, tNu, '+11 %');
  const tm = easeBack(seg(t, tTi - .5, tTi)); if (tm > 0) stamp('MÁS TIEMPO EMPEZANDO POR 1', 540, 1220, 46, C.accent, tm, 0);
}
function sceneFraude(t, lt, s) {
  const T = (w, n = 0) => wt('fraude', w, n), tIg = T('igual'), tRe = T('real'), tAu = T('auditores'), tCa = T('canada'), tFr = T('fraudes');
  headline('Inventadas', 'vs reales', s.start + .1, t);
  const fake = t < tRe - .1; bars(t, fake ? 0 : 1, { fake, pct: true });
  txt(fake ? 'CIFRAS INVENTADAS' : 'CIFRAS REALES', 540, 520, 46, fake ? C.red : C.mint, { weight: 800 });
  const a = easeBack(seg(t, tAu - .1, tAu + .3)); if (a > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(6,35,42,.82)'; ctx.fillRect(0, 380, W, 860); ctx.restore(); txt('AUDITORES', 540, 650, 80, C.line, { weight: 800, scale: a }); }
  const c = easeBack(seg(t, tCa - .1, tCa + .3)); if (c > 0) txt('AGENCIA TRIBUTARIA DE CANADÁ', 540, 800, 44, C.line, { weight: 800, scale: c });
  const f = easeBack(seg(t, tFr - .1, tFr + .3)); if (f > 0) stamp('CAZAN FRAUDES', 540, 1000, 80, C.red, f);
}
function sceneReto(t, lt, s) {
  const T = w => wt('reto', w), tUn = T('uno');
  band('MIRA TUS FACTURAS', 84, '#ffd166', easeBack(seg(t, s.start, s.start + .4)), 430);
  txt('1', 540, 920, 420, C.accent, { weight: 800, scale: 1 + .05 * Math.sin(t * 6) });
  const b = easeBack(seg(t, tUn - .3, tUn + .1)); if (b > 0) bubble(540, 1300, 760, 120, '¿CUÁNTAS EMPIEZAN POR 1? 👇', C.accent, { scale: b, size: 42 });
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, pregunta: scenePregunta, pero: scenePero, porque: scenePorque, fraude: sceneFraude, reto: sceneReto, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 24; i++) E.push({ t: .05 + i / 6, type: 'tick' }); P('hook', 'delatarte', 0, 'boom'); P('hook', 'nadie', 0, 'ding');
  P('pregunta', 'precios'); P('pregunta', 'facturas'); P('pregunta', 'poblacion'); P('pregunta', 'nueve', 0, 'pop');
  P('pero', 'no', 0, 'swipe'); P('pero', 'treinta', 0, 'boom'); P('pero', 'benford', 0, 'ding');
  P('porque', 'doblarse', 0, 'swipe'); P('porque', 'nueve', 0, 'swipe'); P('porque', 'tiempo', 0, 'ding');
  P('fraude', 'real', 0, 'swipe'); P('fraude', 'auditores', 0, 'pop'); P('fraude', 'fraudes', 0, 'boom');
  P('reto', 'uno', 0, 'ding'); P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
