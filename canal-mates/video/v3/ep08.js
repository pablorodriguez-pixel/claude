// Episodio 8 · El móvil se come 10 años de tu vida (4 h/día)
const YX = i => 175 + (i % 10) * 82, YY = i => 520 + Math.floor(i / 10) * 82;   // 80 años = 10x8 casillas
const CAT = i => i < 27 ? 'sleep' : i < 36 ? 'work' : i < 46 ? 'phone' : 'rest';
const COL = { sleep: 'rgba(170,180,255,.8)', work: C.mint, phone: C.accent, rest: 'rgba(230,255,247,.10)' };
function phone(x, y, s, glow = 1, o = {}) { ctx.save(); ctx.translate(x, y); rrect(-s * .3, -s * .55, s * .6, s * 1.1, s * .08); ctx.fillStyle = '#071a1f'; ctx.fill(); ctx.lineWidth = s * .03; ctx.strokeStyle = C.line; ctx.stroke();
  const g = ctx.createLinearGradient(0, -s * .5, 0, s * .5); g.addColorStop(0, `rgba(255,143,107,${.75 * glow})`); g.addColorStop(1, `rgba(126,240,200,${.55 * glow})`); rrect(-s * .26, -s * .48, s * .52, s * .92, s * .05); ctx.fillStyle = g; ctx.fill();
  if (o.lock) { ctx.lineWidth = s * .035; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, -s * .06, s * .09, Math.PI, 0); ctx.stroke(); rrect(-s * .13, -s * .06, s * .26, s * .2, s * .03); ctx.fillStyle = C.ink; ctx.fill(); }
  ctx.restore(); }
function years(t, upto, o = {}) { for (let i = 0; i < 80; i++) { const c = CAT(i), shown = upto[c] ?? 0, a = o.appear !== undefined ? easeOut(seg(t, o.appear + i * .01, o.appear + .25 + i * .01)) : 1; if (a <= 0) continue;
  const on = c !== 'rest' && (i - ({ sleep: 0, work: 27, phone: 36 }[c])) < shown; ctx.save(); ctx.globalAlpha *= a; rrect(YX(i) - 36, YY(i) - 36, 72, 72, 12); ctx.fillStyle = on ? COL[c] : COL.rest; ctx.fill(); ctx.strokeStyle = 'rgba(230,255,247,.25)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
const legend = (y, col, lab, val, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; rrect(150, y - 22, 44, 44, 10); ctx.fillStyle = col; ctx.fill(); ctx.restore(); txt(lab, 215, y, 38, C.line, { align: 'left', weight: 800, alpha: a }); txt(val, 930, y, 44, col === COL.sleep ? C.label : col, { align: 'right', weight: 800, alpha: a }); };

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tVi = T('vida'), tDi = T('diez'), tPa = T('pantalla');
  headline('4 horas al día', '= 10 años de vida', .05, t, { cps: 34, size: 60 });
  const ph = 1 - easeIO(seg(t, tVi - .3, tVi + .2));                          // fotograma 0: el móvil brillando y el contador de horas corriendo
  if (ph > 0) { ctx.save(); ctx.globalAlpha *= ph; phone(540, 880, 520 * (1 + .03 * Math.sin(t * 6)), .8 + .2 * Math.sin(t * 9)); const h = Math.floor(lerp(0, 87600, easeIO(seg(t, .1, tVi)))); txt(fmt(h) + ' h', 540, 880, 92, C.ink, { weight: 800 }); txt('MIRANDO LA PANTALLA', 540, 1230, 36, C.line, { weight: 800, ls: 3 }); ctx.restore(); }
  if (t >= tVi - .3) { years(t, { phone: Math.floor(10 * easeOut(seg(t, tDi - .3, tDi + .5))) }, { appear: tVi - .3 }); hud('R', 'AÑOS DE TU VIDA', String(Math.floor(10 * easeOut(seg(t, tDi - .3, tDi + .5)))), { color: C.accent, size: 96 }); }
  if (t >= tDi + .6) legend(1270, C.accent, 'MÓVIL', '10 AÑOS', seg(t, tDi + .6, tDi + 1));
}
function sceneVida(t, lt, s) {
  const T = w => wt('vida', w), tOc = T('ochenta'), tDu = T('durmiendo'), tTr = T('trabajando');
  headline('Tu vida', 'en años', s.start + .1, t);
  years(t, { sleep: Math.floor(27 * easeIO(seg(t, tDu - .2, tDu + .9))), work: Math.floor(9 * easeIO(seg(t, tTr - .2, tTr + .6))) }, { appear: s.start });
  hud('R', 'AÑOS', '80', { size: 96, alpha: seg(t, tOc - .1, tOc + .3) });
  legend(1240, COL.sleep, 'DORMIR', '27 AÑOS', seg(t, tDu - .1, tDu + .3)); legend(1310, C.mint, 'TRABAJAR', '9 AÑOS', seg(t, tTr - .1, tTr + .3));
}
function sceneMovil(t, lt, s) {
  const T = w => wt('movil', w), tDi = T('diez'), tMa = T('mas');
  headline('Y el móvil…', '', s.start + .1, t);
  years(t, { sleep: 27, work: 9, phone: Math.floor(10 * easeIO(seg(t, tDi - .4, tDi + .5))) });
  legend(1240, C.mint, 'TRABAJAR', '9 AÑOS', 1); legend(1310, C.accent, 'MÓVIL', '10 AÑOS', seg(t, tDi - .1, tDi + .3));
  stamp('MÁS QUE TODO TU TRABAJO', 540, 980, 44, C.accent, easeBack(seg(t, tMa - .1, tMa + .3)));
}
function sceneDespierto(t, lt, s) {
  const T = w => wt('despierto', w), tEn = T('enteros'), tDe = T('despierto'), tCu = T('cuatro');
  headline('De tu día', 'despierto', s.start + .1, t);
  const cx = 540, cy = 880, R = 300, a0 = -Math.PI / 2, frac = h => h / 24 * Math.PI * 2;
  const sl = easeOut(seg(t, s.start + .3, tEn + .2)), aw = easeOut(seg(t, tDe - .2, tDe + .4)), ph = easeOut(seg(t, tCu - .3, tCu + .5));
  ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a0 + frac(24)); ctx.fillStyle = 'rgba(230,255,247,.08)'; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a0 + frac(8) * sl); ctx.fillStyle = COL.sleep; ctx.fill();
  if (ph > 0) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0 + frac(8), a0 + frac(8) + frac(4) * ph); ctx.fillStyle = C.accent; ctx.fill(); }
  circle(cx, cy, R, { stroke: C.line, w: 4 }); for (let h = 0; h < 24; h++) { const a = a0 + frac(h); line(cx + Math.cos(a) * (R - 16), cy + Math.sin(a) * (R - 16), cx + Math.cos(a) * R, cy + Math.sin(a) * R, C.faint, 2); }
  txt('DORMIR 8 h', cx + 150, cy - 170, 30, C.line, { weight: 800, alpha: sl }); if (ph > 0) txt('MÓVIL 4 h', cx + 200, cy + 120, 34, C.accent, { weight: 800, alpha: ph });
  if (aw > 0) txt('16 h DESPIERTO', cx, cy + R + 60, 38, C.line, { weight: 800, alpha: aw, ls: 2 });
  stamp('1 DE CADA 4 MINUTOS', 540, 470, 48, C.accent, easeBack(seg(t, tCu - .1, tCu + .35)), 0);
}
function sceneCierre(t, lt, s) {
  const T = w => wt('cierre', w), tDe = T('desbloquees'), tDi = T('diez');
  const u = easeIO(seg(t, tDe, tDe + .6)); phone(540, 860, 520, .25 + .75 * u, { lock: u < .5 });
  if (u > .5) txt('10 AÑOS', 540, 860, 96, C.ink, { weight: 800, scale: easeBack(seg(t, tDi - .1, tDi + .4)) || .001 });
  headline('La próxima vez…', '', s.start + .1, t);
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, vida: sceneVida, movil: sceneMovil, despierto: sceneDespierto, cierre: sceneCierre, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 20; i++) E.push({ t: .1 + (wt('hook', 'vida') - .1) * i / 19, type: 'tick' }); P('hook', 'diez', 0, 'boom'); P('hook', 'pantalla', 0, 'ding');
  P('vida', 'ochenta'); P('vida', 'durmiendo', 0, 'swipe'); P('vida', 'trabajando', 0, 'swipe');
  P('movil', 'diez', 0, 'boom'); P('movil', 'mas', 0, 'ding');
  P('despierto', 'despierto'); P('despierto', 'cuatro', 0, 'boom'); P('cierre', 'desbloquees', 0, 'click'); P('cierre', 'diez', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
