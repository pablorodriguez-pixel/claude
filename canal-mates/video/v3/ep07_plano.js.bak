// Episodio 7 · 100 presos y gorros blancos o negros: 99 salen libres (paridad)
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const HATS = (() => { const h = []; for (let i = 0; i < 100; i++) h.push(RND(i + 3) < .47 ? 1 : 0); h[0] = 0; h[1] = 1;
  let w = h.slice(1).reduce((a, b) => a + b, 0); for (let i = 99; i > 1 && w !== 47; i--) { if (w > 47 && h[i]) { h[i] = 0; w--; } else if (w < 47 && !h[i]) { h[i] = 1; w++; } } return h; })();
const GRID = i => [180 + (i % 10) * 80, 560 + Math.floor(i / 10) * 82];
function gridPeople(t, colorFn, o = {}) { for (let i = 0; i < 100; i++) { const [x, y] = GRID(i), a = o.appear !== undefined ? easeBack(seg(t, o.appear + i * .006, o.appear + .3 + i * .006)) : 1; if (a <= 0) continue;
  ctx.save(); ctx.translate(x, y); ctx.scale(a, a); ctx.translate(-x, -y); const c = colorFn(i); person(x, y + 30, 54, c, c === C.mint ? 'rgba(126,240,200,.35)' : c === C.red ? 'rgba(255,93,115,.3)' : null, 2.4); hat(x, y + 30, 54, HATS[i]); ctx.restore(); } }
const ROWX = k => 110 + k * 143, ROWY = 1080, RS = 140;          // fila: k=0 es el del fondo (a la izquierda), miran hacia la derecha
function row(t, o = {}) { line(60, ROWY + 6, 1020, ROWY + 6, C.soft, 3);
  for (let k = 0; k < 7; k++) { const x = ROWX(k), col = o.col ? o.col(k) : C.line, a = o.alpha ? o.alpha(k) : 1; if (a <= 0) continue; ctx.save(); ctx.globalAlpha *= a;
    person(x, ROWY, RS, col, col === C.mint ? 'rgba(126,240,200,.35)' : null, 3); if (!(o.hide && o.hide(k))) hat(x, ROWY, RS, HATS[k]); else txt('?', x, ROWY - 1.15 * RS, 52, C.accent, { weight: 800 }); ctx.restore(); }
  txt('… hasta 100', 1040, ROWY + 56, 26, C.label, { align: 'right', weight: 700 }); txt('FONDO', ROWX(0), ROWY + 52, 24, C.label, { weight: 700, ls: 2 }); }
function say(k, text, k0, col = C.accent) { if (k0 <= 0) return; bubble(ROWX(k) + 140, ROWY - 2.05 * RS, 290, 84, text, col, { scale: k0, size: 38 }); }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tSi = T('siempre'), tPa = T('palabra');
  headline('99 de 100', 'salen libres', .05, t, { cps: 34, size: 66 });
  const free = Math.floor(99 * easeIO(seg(t, .35, 2.3)));
  gridPeople(t, i => i === 0 ? (t > 2.3 ? C.accent : C.line) : (i <= free ? C.mint : C.line));
  hud('R', 'LIBRES', String(free), { color: C.mint, size: 96 });
  if (t > 2.3) txt('?', GRID(0)[0], GRID(0)[1] - 40, 46, C.accent, { weight: 800, scale: .9 + .1 * Math.sin(t * 7) });
  stamp('SIEMPRE', 540, 960, 76, C.mint, easeBack(seg(t, tSi - .1, tSi + .3)) * (1 - seg(t, tPa - .4, tPa - .2)));
  const p = easeBack(seg(t, tPa - .25, tPa + .2)); if (p > 0) { bubble(400, 1000, 320, 96, 'BLANCO', C.line, { scale: p, size: 44 }); bubble(720, 1000, 320, 96, 'NEGRO', C.line, { scale: p, size: 44 }); stamp('SOLO 1 PALABRA', 540, 1170, 50, C.accent, p, 0); }
}
function sceneReglas(t, lt, s) {
  const T = w => wt('reglas', w), tGo = T('gorro'), tBl = T('blanco'), tNe = T('negro'), tNa = T('nadie'), tLi = T('libre'), tFa = T('falla');
  headline('Las reglas', '', s.start + .1, t);
  const cx = 540, by = 1150, S = 400, drop = easeOut(seg(t, tGo - .2, tGo + .3)), white = t < tNe ? 1 : (Math.floor((t - tNe) * 1.5) % 2 === 0 ? 0 : 1);
  if (t >= tFa - .1) { ctx.save(); ctx.globalAlpha *= seg(t, tFa - .1, tFa + .3); for (let i = 0; i < 9; i++) line(250 + i * 72, 560, 250 + i * 72, 1180, C.red, 6); ctx.restore(); }
  person(cx, by, S, t >= tLi - .05 && t < tFa - .1 ? C.mint : C.line, null, 6);
  if (drop > 0) { ctx.save(); ctx.translate(0, (1 - drop) * -300); ctx.globalAlpha *= drop; hat(cx, by, S, white); ctx.restore(); }
  const n = easeBack(seg(t, tNa - .1, tNa + .3)) * (1 - seg(t, tLi - .2, tLi)); if (n > 0) { txt('?', cx + 150, by - 1.2 * S, 120, C.accent, { weight: 800, scale: n }); txt('NADIE VE EL SUYO', cx, 470, 50, C.accent, { weight: 800, scale: n, ls: 2 }); }
  const l = easeBack(seg(t, tLi - .1, tLi + .3)) * (1 - seg(t, tFa - .2, tFa)); if (l > 0) txt('ACIERTA → LIBRE', cx, 470, 56, C.mint, { weight: 800, scale: l, ls: 2 });
  const f = easeBack(seg(t, tFa - .1, tFa + .3)); if (f > 0) txt('FALLA → DENTRO', cx, 470, 56, C.red, { weight: 800, scale: f, ls: 2 });
}
function sceneAzar(t, lt, s) {
  const T = w => wt('azar', w), tMo = T('moneda'), tTr = T('truco'), tNo = T('noventa');
  headline('Al azar…', '', s.start + .1, t, { alpha: 1 - seg(t, tTr - .1, tTr + .1) }); headline('Con el truco', '', tTr, t, { cps: 40 });
  const run = t < tNo - .1 ? Math.floor(clamp((t - s.start - .3) / 1.1, 0, 9)) : -1;
  const ok = i => run < 0 ? i !== 0 : RND(i * 7 + run * 131) < .5;
  const cnt = run < 0 ? 99 : [...Array(100).keys()].filter(ok).length;
  gridPeople(t, i => run < 0 ? (i === 0 ? C.accent : C.mint) : (ok(i) ? C.mint : C.red));
  hud('R', 'LIBRES', String(cnt), { color: run < 0 ? C.mint : C.line, size: 96 });
  const c = easeBack(seg(t, tMo - .1, tMo + .3)) * (1 - seg(t, tTr - .2, tTr)); if (c > 0) { ctx.save(); ctx.translate(540, 1380 - 60); ctx.scale(c * Math.abs(Math.cos(t * 6)), c); circle(0, 0, 50, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 5 }); ctx.restore(); }
}
function sceneFila(t, lt, s) {
  const T = (w, n = 0) => wt('fila', w, n), tFi = T('fila'), tVe = T('ve'), tSu = T('suyo'), tHa = T('hablan'), tUl = T('ultimo'), tOy = T('oyen'), tPl = T('plan');
  headline('En fila', '', s.start + .1, t);
  const me = 3, look = t >= tVe - .1 && t < tHa - .2;
  row(t, { alpha: k => easeOut(seg(t, s.start + k * .06, s.start + .3 + k * .06)), col: k => look && k === me ? C.accent : C.line, hide: k => look && k === me && t >= tSu - .1 });
  const ar = easeOut(seg(t, tFi + .6, tFi + 1.2)); if (ar > 0 && t < tVe - .1) txt('MIRAN →', 540, 600, 46, C.label, { weight: 800, ls: 4, alpha: ar });
  if (look) { const a = easeOut(seg(t, tVe - .1, tVe + .4)); ctx.save(); ctx.globalAlpha *= a * .8; for (let k = me + 1; k < 7; k++) { ctx.setLineDash([8, 8]); line(ROWX(me) + 14, ROWY - .95 * RS, ROWX(k), ROWY - 1.15 * RS, C.accent, 2); } ctx.restore();
    txt('VE A TODOS LOS DE DELANTE', 540, 600, 40, C.accent, { weight: 800, ls: 2, alpha: a }); if (t >= tSu - .1) txt('PERO NO EL SUYO', 540, 660, 40, C.red, { weight: 800, ls: 2, alpha: seg(t, tSu - .1, tSu + .2) }); }
  if (t >= tHa - .2) { const k = Math.floor(clamp((t - tUl) / .6, 0, 6)); for (let j = 0; j <= Math.min(6, k); j++) txt(String(j + 1), ROWX(j), ROWY - 1.5 * RS, 34, j === k ? C.accent : C.label, { weight: 800 });
    txt('HABLAN DESDE EL FONDO →', 540, 600, 40, C.line, { weight: 800, ls: 2, alpha: seg(t, tHa - .2, tHa + .2) }); }
  if (t >= tOy - .1) { const ph = (Math.max(0, t - tOy) * 1.2) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * seg(t, tOy - .1, tOy + .2) * (1 - seg(t, tPl - .2, tPl)); circle(ROWX(0), ROWY - .9 * RS, 40 + ph * 520, { stroke: C.mint, w: 4 }); ctx.restore(); txt('TODOS LO OYEN', 540, 660, 40, C.mint, { weight: 800, ls: 2, alpha: seg(t, tOy - .1, tOy + .2) * (1 - seg(t, tPl - .2, tPl)) }); }
  stamp('PLAN PACTADO', 540, 640, 56, C.accent, easeBack(seg(t, tPl - .15, tPl + .3)));
}
function sceneTruco(t, lt, s) {
  const T = (w, n = 0) => wt('truco', w, n), tFo = T('fondo'), tCu = T('cuenta'), tIm = T('impares'), tPa = T('pares'), tCi = T('cincuenta'), tPi = T('pista');
  headline('El del fondo', '', s.start + .1, t);
  const cnt = Math.floor(47 * easeIO(seg(t, tCu, tIm - .2)));
  row(t, { col: k => k === 0 ? C.accent : (t >= tCu && t < tIm && HATS[k] && k <= 1 + Math.floor(5 * seg(t, tCu, tIm - .3)) ? C.mint : C.line) });
  if (t >= tCu - .1) hud('R', 'BLANCOS QUE VE', String(cnt), { color: C.mint, size: 84 });
  const r1 = easeBack(seg(t, tIm - .1, tIm + .3)), r2 = easeBack(seg(t, tPa - .1, tPa + .3));
  if (r1 > 0) txt('IMPAR → dice «BLANCO»', 540, 560, 46, C.line, { weight: 800, scale: r1 }); if (r2 > 0) txt('PAR → dice «NEGRO»', 540, 640, 46, C.line, { weight: 800, scale: r2 });
  const c = easeBack(seg(t, tCi - .1, tCi + .3)); if (c > 0) { ctx.save(); ctx.translate(ROWX(0), ROWY - 1.55 * RS); ctx.scale(c * (.3 + .7 * Math.abs(Math.cos(t * 5))), c); circle(0, 0, 42, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 5 }); ctx.restore(); txt('50%', ROWX(0) + 60, ROWY - 1.95 * RS, 40, '#ffd166', { align: 'left', weight: 800, alpha: c }); }
  const p = easeBack(seg(t, tPi - .1, tPi + .3)); if (p > 0) { const ph = (Math.max(0, t - tPi) * 1.2) % 1; ctx.save(); ctx.globalAlpha *= 1 - ph; circle(ROWX(0), ROWY - .9 * RS, 40 + ph * 560, { stroke: C.accent, w: 4 }); ctx.restore(); stamp('UNA PISTA PARA TODOS', 540, 800, 48, C.accent, p); }
}
function sceneEjemplo(t, lt, s) {
  const T = (w, n = 0) => wt('ejemplo', w, n), t47 = T('cuarenta', 0), tIm0 = T('impar', 0), tDi = T('blanco', 0), tSi = T('siguiente'), t46 = T('cuarenta', 1), tPa = T('par'), tIm1 = T('impar', 1), tFa = T('falta'), tSu = T('suyo');
  headline('Un ejemplo', '', s.start + .1, t);
  const focus = t >= tSi - .1 ? 1 : 0, reveal = t >= tSu - .1;
  row(t, { col: k => k === focus ? C.accent : (reveal && k === 1 ? C.mint : C.line), hide: k => k === 1 && t >= tSi - .1 && !reveal });
  if (focus === 0) { hud('R', 'EL DEL FONDO VE', '47', { color: C.mint, size: 84, alpha: seg(t, t47 - .1, t47 + .2) }); const a = easeBack(seg(t, tIm0 - .1, tIm0 + .3)); if (a > 0) txt('47 ES IMPAR', 540, 580, 54, C.line, { weight: 800, scale: a, ls: 2 }); }
  say(0, '«BLANCO»', easeBack(seg(t, tDi - .1, tDi + .3)));
  if (focus === 1) { hud('R', 'EL SIGUIENTE VE', t >= t46 - .1 ? '46' : '…', { color: C.mint, size: 84 }); const b = easeBack(seg(t, tPa - .1, tPa + .3)) * (1 - seg(t, tFa - .2, tFa)); if (b > 0) txt('46 ES PAR', 540, 580, 54, C.line, { weight: 800, scale: b, ls: 2 });
    const c = easeBack(seg(t, tIm1 - .1, tIm1 + .3)) * (1 - seg(t, tFa - .2, tFa)); if (c > 0) txt('PERO EL DE ATRÁS DIJO IMPAR', 540, 660, 40, C.accent, { weight: 800, scale: c, ls: 1 });
    const d = easeBack(seg(t, tFa - .1, tFa + .3)); if (d > 0) { txt('47 − 46 = 1 BLANCO', 540, 580, 56, C.mint, { weight: 800, scale: d, ls: 2 }); txt('¡EL SUYO!', 540, 670, 64, C.mint, { weight: 800, scale: easeBack(seg(t, tSu - .1, tSu + .3)) }); }
    if (reveal) check(ROWX(1), ROWY - 1.5 * RS, 64); }
}
function sceneCadena(t, lt, s) {
  const T = (w, n = 0) => wt('cadena', w, n), tEx = T('exacto'), tNo = T('noventa'), tFo = T('fondo'), tCa = T('cara');
  headline('Uno tras otro', '', s.start + .1, t);
  const k = 1 + Math.floor(5 * easeIO(seg(t, s.start + .3, tEx + .4))), free = Math.floor(99 * easeIO(seg(t, s.start + .3, tNo + .3)));
  row(t, { col: j => j === 0 ? C.accent : (j <= k ? C.mint : C.line) }); for (let j = 1; j <= Math.min(6, k); j++) check(ROWX(j), ROWY - 1.5 * RS, 48);
  hud('R', 'LIBRES SEGUROS', String(free), { color: C.mint, size: 96 });
  const c = easeBack(seg(t, tFo - .1, tFo + .3)); if (c > 0) { ctx.save(); ctx.translate(ROWX(0), ROWY - 1.55 * RS); ctx.scale(c * (.2 + .8 * Math.abs(Math.cos(t * 6))), c); circle(0, 0, 46, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 5 }); ctx.restore(); }
  stamp('CARA O CRUZ', 540, 640, 60, '#ffd166', easeBack(seg(t, tCa - .1, tCa + .3)));
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, reglas: sceneReglas, azar: sceneAzar, fila: sceneFila, truco: sceneTruco, ejemplo: sceneEjemplo, cadena: sceneCadena, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 22; i++) E.push({ t: .35 + 1.95 * Math.pow(i / 21, .8), type: 'tick' }); E.push({ t: 2.3, type: 'ding' }); P('hook', 'siempre', 0, 'boom'); P('hook', 'palabra');
  P('reglas', 'gorro', 0, 'swipe'); P('reglas', 'nadie', 0, 'buzz'); P('reglas', 'libre', 0, 'ding'); P('reglas', 'falla', 0, 'buzz');
  { const S = SC.azar; for (let r = 0; r < 4; r++) E.push({ t: S.start + .3 + r * 1.1, type: 'pop' }); } P('azar', 'noventa', 0, 'ding');
  P('fila', 've'); P('fila', 'hablan'); P('fila', 'oyen', 0, 'swipe'); P('fila', 'plan', 0, 'ding');
  P('truco', 'cuenta', 0, 'swipe'); P('truco', 'impares'); P('truco', 'pares'); P('truco', 'cincuenta', 0, 'buzz'); P('truco', 'pista', 0, 'boom');
  P('ejemplo', 'impar', 0); P('ejemplo', 'blanco', 0, 'pop'); P('ejemplo', 'par'); P('ejemplo', 'falta', 0, 'ding'); P('ejemplo', 'suyo', 0, 'boom');
  { const a = SC.cadena.start + .3, b = wt('cadena', 'exacto') + .4; for (let i = 0; i < 9; i++) E.push({ t: lerp(a, b, i / 8), type: 'pop' }); } P('cadena', 'cara', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
