// Episodio 7 · 100 presos y gorros blancos o negros: 99 salen libres (paridad)
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const HATS = (() => { const h = []; for (let i = 0; i < 100; i++) h.push(RND(i + 3) < .47 ? 1 : 0); h[0] = 0; h[1] = 1;
  let w = h.slice(1).reduce((a, b) => a + b, 0); for (let i = 99; i > 1 && w !== 47; i--) { if (w > 47 && h[i]) { h[i] = 0; w--; } else if (w < 47 && !h[i]) { h[i] = 1; w++; } } return h; })();
// ── la fila en perspectiva: k = 0 es el del fondo de la fila (el más cercano a cámara, abajo a la izquierda) ──
const VP = [880, 470], P0 = [250, 1290], S0 = 300;
const persp = k => { const z = 1 + k * .42; return [VP[0] + (P0[0] - VP[0]) / z, VP[1] + (P0[1] - VP[1]) / z, S0 / z]; };
const BODY = [[-.20, -.26], [-.31, -.14], [-.33, .08], [-.25, .08], [-.22, -.10], [-.14, -.10], [-.14, .5], [-.02, .5], [-.02, .12], [.02, .12], [.02, .5], [.14, .5], [.14, -.10], [.22, -.10], [.25, .08], [.33, .08], [.31, -.14], [.20, -.26]];
function prisoner(x, y, s, o = {}) {           // preso con uniforme de rayas, número y bola con cadena (dibujo propio)
  const a = o.alpha ?? 1; if (a <= .01 || s < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y - s * .5);
  const st = o.state, c1 = st === 'free' ? C.mint : st === 'out' ? C.red : '#ff8f6b', c2 = '#16262c';
  if (s > 40) { ctx.strokeStyle = 'rgba(230,255,247,.6)'; ctx.lineWidth = Math.max(1, s * .012); ctx.beginPath(); ctx.moveTo(s * .1, s * .48); ctx.quadraticCurveTo(s * .25, s * .56, s * .36, s * .47); ctx.stroke(); circle(s * .4, s * .45, s * .065, { fill: '#0b1c21', stroke: 'rgba(230,255,247,.7)', w: Math.max(1, s * .01) }); }
  ctx.beginPath(); BODY.forEach(([px, py], i) => i ? ctx.lineTo(px * s, py * s) : ctx.moveTo(px * s, py * s)); ctx.closePath();
  ctx.save(); ctx.clip(); const sh = Math.max(2, s * .075); for (let yy = -s * .3, i = 0; yy < s * .55; yy += sh, i++) { ctx.fillStyle = i % 2 ? c2 : c1; ctx.fillRect(-s * .4, yy, s * .8, sh + .5); } ctx.restore();
  ctx.lineWidth = Math.max(1.2, s * .018); ctx.strokeStyle = o.hl ? C.accent : 'rgba(230,255,247,.85)'; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -.42 * s, .13 * s, 0, Math.PI * 2); ctx.fillStyle = '#f4e3d6'; ctx.fill(); ctx.stroke();
  if (s > 70 && o.num !== undefined) { ctx.fillStyle = '#f4fffb'; ctx.fillRect(-s * .1, -s * .2, s * .2, s * .09); txt(String(o.num).padStart(3, '0'), 0, -s * .155, s * .07, C.ink, { weight: 800 }); }
  ctx.restore();
  if (o.q) txt('?', x, y - 1.2 * s, Math.max(14, s * .3), C.accent, { weight: 800, alpha: a });
  else if (o.hat !== undefined && o.hat !== null) { const d = o.drop ?? 1; if (d > 0) { ctx.save(); ctx.globalAlpha *= a * Math.min(1, d * 2); hat(x, y - (1 - d) * s * 1.4, s, o.hat); ctx.restore(); } }
  if (o.chk) check(x, y - 1.55 * s, Math.max(14, s * .3));
}
function line100(t, fn) { for (let k = 99; k >= 0; k--) { const [x, y, s] = persp(k); prisoner(x, y, s, fn(k, x, y, s) || {}); } }
function cam(z, cx, cy, draw) { ctx.save(); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); draw(); ctx.restore(); }
const HEAD = k => { const [x, y, s] = persp(k); return [x, y - .95 * s, s]; };
function sayAt(k, text, k0, col = C.accent) { if (k0 <= 0) return; const [x, y, s] = persp(k); bubble(x + 180, y - 1.55 * s - 40, 300, 88, text, col, { scale: k0, size: 40 }); }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tSi = T('siempre'), tPa = T('palabra');
  // titular enorme y centrado desde el fotograma 0 (se lee sin sonido y en medio segundo)
  const big = 1 - easeIO(seg(t, tSi - .2, tSi + .2));
  if (big > 0) { ctx.save(); ctx.globalAlpha *= big; ctx.fillStyle = 'rgba(5,32,42,.78)'; ctx.fillRect(0, 300, W, 330); ctx.restore();
    txt('99 DE 100', 540, 400, 150, C.mint, { weight: 800, alpha: big, scale: lerp(1.15, 1, easeOut(seg(t, 0, .4))) }); txt('SALEN LIBRES', 540, 545, 110, C.line, { weight: 800, alpha: big }); }
  else headline('99 de 100', 'salen libres', tSi, t, { cps: 80, size: 66 });
  const z = lerp(1.6, 1, easeOut(seg(t, 0, 2.6)));                  // la cámara retrocede a lo largo de la fila desde el fotograma 0
  const wave = 99 * easeIO(seg(t, 1.5, 2.8));
  cam(z, 330, 1100, () => line100(t, k => ({ num: k + 1, hat: HATS[k], drop: easeOut(seg(t, k * .016, .35 + k * .016)), state: k > 0 && k <= wave ? 'free' : null, hl: k === 0 && t > 2.8, q: false })));
  hud('R', 'LIBRES', String(Math.floor(wave)), { color: C.mint, size: 96, alpha: seg(t, 1.4, 1.7) });
  if (t > 2.8) { const [x, y, sz] = HEAD(0); txt('?', x + sz * .5, y - sz * .55, 70, C.accent, { weight: 800, scale: .9 + .1 * Math.sin(t * 7) }); }
  stamp('SIEMPRE', 600, 780, 76, C.mint, easeBack(seg(t, tSi - .1, tSi + .3)) * (1 - seg(t, tPa - .4, tPa - .2)));
  const p = easeBack(seg(t, tPa - .25, tPa + .2)); if (p > 0) { sayAt(0, 'BLANCO', p, C.line); bubble(760, 760, 300, 88, 'NEGRO', C.line, { scale: p, size: 40 }); stamp('SOLO 1 PALABRA', 600, 620, 50, C.accent, p, 0); }
}
function sceneReglas(t, lt, s) {
  const T = w => wt('reglas', w), tGo = T('gorro'), tNe = T('negro'), tNa = T('nadie'), tLi = T('libre'), tFa = T('falla');
  headline('Las reglas', '', s.start + .1, t);
  const white = t < tNe ? 1 : (Math.floor((t - tNe) * 1.5) % 2 === 0 ? 0 : 1), st = t >= tFa - .05 ? 'out' : t >= tLi - .05 ? 'free' : null;
  cam(1.55, 300, 1150, () => line100(t, k => k === 0 ? { num: 1, hat: white, drop: easeOut(seg(t, tGo - .25, tGo + .25)), q: t >= tNa - .05 && t < tLi - .1, state: st, hl: true } : { num: k + 1, alpha: .35 }));
  if (t >= tFa - .1) { ctx.save(); ctx.globalAlpha *= seg(t, tFa - .1, tFa + .3); for (let i = 0; i < 7; i++) line(80 + i * 90, 560, 80 + i * 90, 1330, C.red, 7); ctx.restore(); }
  const n = easeBack(seg(t, tNa - .1, tNa + .3)) * (1 - seg(t, tLi - .2, tLi)); if (n > 0) txt('NADIE VE EL SUYO', 600, 470, 50, C.accent, { weight: 800, scale: n, ls: 2 });
  const l = easeBack(seg(t, tLi - .1, tLi + .3)) * (1 - seg(t, tFa - .2, tFa)); if (l > 0) txt('ACIERTA → LIBRE', 600, 470, 56, C.mint, { weight: 800, scale: l, ls: 2 });
  const f = easeBack(seg(t, tFa - .1, tFa + .3)); if (f > 0) txt('FALLA → DENTRO', 600, 470, 56, C.red, { weight: 800, scale: f, ls: 2 });
}
function sceneAzar(t, lt, s) {
  const T = w => wt('azar', w), tMo = T('moneda'), tTr = T('truco'), tNo = T('noventa');
  headline('Al azar…', '', s.start + .1, t, { alpha: 1 - seg(t, tTr - .1, tTr + .1) }); headline('Con el truco', '', tTr, t, { cps: 40 });
  const run = t < tNo - .1 ? Math.floor(clamp((t - s.start - .3) / 1.1, 0, 9)) : -1, ok = k => run < 0 ? k !== 0 : RND(k * 7 + run * 131) < .5;
  const cnt = [...Array(100).keys()].filter(ok).length;
  line100(t, k => ({ num: k + 1, hat: HATS[k], state: ok(k) ? 'free' : (run < 0 ? null : 'out'), hl: run < 0 && k === 0 }));
  hud('R', 'LIBRES', String(cnt), { color: run < 0 ? C.mint : C.line, size: 96 });
  const c = easeBack(seg(t, tMo - .1, tMo + .3)) * (1 - seg(t, tTr - .2, tTr)); if (c > 0) { ctx.save(); ctx.translate(780, 900); ctx.scale(c * Math.abs(Math.cos(t * 6)), c); circle(0, 0, 70, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 6 }); ctx.restore(); }
}
function sceneFila(t, lt, s) {
  const T = (w, n = 0) => wt('fila', w, n), tFi = T('fila'), tVe = T('ve'), tSu = T('suyo'), tHa = T('hablan'), tUl = T('ultimo'), tOy = T('oyen'), tPl = T('plan');
  headline('En fila', '', s.start + .1, t);
  const me = 2, look = t >= tVe - .1 && t < tHa - .2, z = lerp(1.15, 1, easeOut(seg(t, s.start, s.start + 2)));
  cam(z, 600, 900, () => {
    line100(t, k => ({ num: k + 1, hat: look && k === me && t >= tSu - .1 ? null : HATS[k], q: look && k === me && t >= tSu - .1, hl: (look && k === me) || (t >= tHa - .2 && k === Math.floor(clamp((t - tUl) / .5, 0, 99))) }));
    if (look) { const a = easeOut(seg(t, tVe - .1, tVe + .4)), [hx, hy] = HEAD(me); ctx.save(); ctx.globalAlpha *= a * .85; ctx.setLineDash([8, 8]); for (let k = me + 1; k < 40; k += (k < 10 ? 1 : 3)) { const [x2, y2] = HEAD(k); line(hx, hy, x2, y2, C.accent, 2); } ctx.restore(); }
    if (t >= tOy - .1) { const ph = (Math.max(0, t - tOy) * 1.1) % 1, [hx, hy] = HEAD(0); ctx.save(); ctx.globalAlpha *= (1 - ph) * seg(t, tOy - .1, tOy + .2) * (1 - seg(t, tPl - .2, tPl)); circle(hx, hy, 40 + ph * 650, { stroke: C.mint, w: 5 }); ctx.restore(); }
  });
  const ar = easeOut(seg(t, tFi + .5, tFi + 1)); if (ar > 0 && t < tVe - .1) txt('TODOS MIRAN HACIA DELANTE ↗', 560, 470, 40, C.label, { weight: 800, ls: 2, alpha: ar });
  if (look) { txt('VE A TODOS LOS DE DELANTE', 560, 470, 42, C.accent, { weight: 800, ls: 2, alpha: seg(t, tVe - .1, tVe + .3) }); if (t >= tSu - .1) txt('PERO NO EL SUYO', 560, 530, 42, C.red, { weight: 800, ls: 2, alpha: seg(t, tSu - .1, tSu + .2) }); }
  if (t >= tHa - .2 && t < tOy - .1) txt('HABLAN DESDE EL FONDO', 560, 470, 42, C.line, { weight: 800, ls: 2, alpha: seg(t, tHa - .2, tHa + .2) });
  if (t >= tOy - .1 && t < tPl - .2) txt('TODOS LO OYEN', 560, 470, 46, C.mint, { weight: 800, ls: 2 });
  stamp('PLAN PACTADO', 600, 520, 56, C.accent, easeBack(seg(t, tPl - .15, tPl + .3)));
}
function sceneTruco(t, lt, s) {
  const T = (w, n = 0) => wt('truco', w, n), tFo = T('fondo'), tCu = T('cuenta'), tIm = T('impares'), tPa = T('pares'), tCi = T('cincuenta'), tPi = T('pista');
  headline('El del fondo', '', s.start + .1, t);
  const kc = Math.floor(99 * easeIO(seg(t, tCu, tIm - .2))); let cnt = 0; for (let k = 1; k <= kc; k++) cnt += HATS[k];
  const focus = easeIO(seg(t, s.start, tFo + .5)) * (1 - easeIO(seg(t, tCu - .3, tCu + .4)));
  cam(1 + .45 * focus, 300, 1150, () => line100(t, k => ({ num: k + 1, hat: HATS[k], hl: k === 0, state: t >= tCu && t < tIm + .5 && k >= 1 && k <= kc && HATS[k] ? 'free' : null })));
  if (t >= tCu - .1) hud('R', 'BLANCOS QUE VE', String(cnt), { color: C.mint, size: 84 });
  const r1 = easeBack(seg(t, tIm - .1, tIm + .3)), r2 = easeBack(seg(t, tPa - .1, tPa + .3));
  if (r1 > 0) stamp('IMPAR → «BLANCO»', 600, 560, 44, C.line, r1, 0); if (r2 > 0) stamp('PAR → «NEGRO»', 600, 680, 44, C.line, r2, 0);
  const c = easeBack(seg(t, tCi - .1, tCi + .3)); if (c > 0) { const [x, y, sz] = HEAD(0); ctx.save(); ctx.translate(x + sz * .6, y - sz * .6); ctx.scale(c * (.3 + .7 * Math.abs(Math.cos(t * 5))), c); circle(0, 0, 54, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 6 }); ctx.restore(); txt('50%', x + sz * .6, y - sz * .6 - 90, 48, '#ffd166', { weight: 800, alpha: c }); }
  const p = easeBack(seg(t, tPi - .1, tPi + .3)); if (p > 0) { const ph = (Math.max(0, t - tPi) * 1.1) % 1, [hx, hy] = HEAD(0); ctx.save(); ctx.globalAlpha *= 1 - ph; circle(hx, hy, 40 + ph * 700, { stroke: C.accent, w: 5 }); ctx.restore(); stamp('UNA PISTA PARA TODOS', 600, 800, 48, C.accent, p); }
}
function sceneEjemplo(t, lt, s) {
  const T = (w, n = 0) => wt('ejemplo', w, n), t47 = T('cuarenta', 0), tIm0 = T('impar', 0), tDi = T('blanco', 0), tSi = T('siguiente'), t46 = T('cuarenta', 1), tPa = T('par'), tIm1 = T('impar', 1), tFa = T('falta'), tSu = T('suyo');
  headline('Un ejemplo', '', s.start + .1, t);
  const focus = t >= tSi - .1 ? 1 : 0, reveal = t >= tSu - .1;
  cam(1.35, 330, 1150, () => line100(t, k => ({ num: k + 1, hat: k === 1 && focus && !reveal ? null : HATS[k], q: k === 1 && focus && !reveal, hl: k === focus, state: reveal && k === 1 ? 'free' : null, chk: reveal && k === 1 })));
  if (!focus) { hud('R', 'EL DEL FONDO VE', '47', { color: C.mint, size: 84, alpha: seg(t, t47 - .1, t47 + .2) }); const a = easeBack(seg(t, tIm0 - .1, tIm0 + .3)); if (a > 0) stamp('47 ES IMPAR', 600, 450, 54, C.line, a, 0); }
  const sb = easeBack(seg(t, tDi - .1, tDi + .3)); if (sb > 0) bubble(330, 640, 330, 96, '«BLANCO»', C.accent, { scale: sb, size: 44 });
  if (focus) { hud('R', 'EL SIGUIENTE VE', t >= t46 - .1 ? '46' : '…', { color: C.mint, size: 84 }); const b = easeBack(seg(t, tPa - .1, tPa + .3)) * (1 - seg(t, tFa - .2, tFa)); if (b > 0) stamp('46 ES PAR', 640, 440, 54, C.line, b, 0);
    const c = easeBack(seg(t, tIm1 - .1, tIm1 + .3)) * (1 - seg(t, tFa - .2, tFa)); if (c > 0) txt('PERO EL DE ATRÁS DIJO IMPAR', 600, 580, 40, C.accent, { weight: 800, scale: c });
    const d = easeBack(seg(t, tFa - .1, tFa + .3)); if (d > 0) { stamp('47 − 46 = 1 BLANCO', 600, 440, 50, C.mint, d, 0); txt('¡EL SUYO!', 680, 560, 70, C.mint, { weight: 800, scale: easeBack(seg(t, tSu - .1, tSu + .3)) }); } }
}
function sceneCadena(t, lt, s) {
  const T = (w, n = 0) => wt('cadena', w, n), tEx = T('exacto'), tNo = T('noventa'), tFo = T('fondo'), tCa = T('cara');
  headline('Uno tras otro', '', s.start + .1, t);
  const k1 = 99 * easeIO(seg(t, s.start + .3, tNo + .3)), z = lerp(1, 1.12, seg(t, s.start, s.end));
  cam(z, 700, 700, () => line100(t, k => ({ num: k + 1, hat: HATS[k], state: k >= 1 && k <= k1 ? 'free' : null, chk: k >= 1 && k <= k1 && k < 25, hl: k === 0 })));
  hud('R', 'LIBRES SEGUROS', String(Math.floor(k1)), { color: C.mint, size: 96 });
  const c = easeBack(seg(t, tFo - .1, tFo + .3)); if (c > 0) { const [x, y, sz] = HEAD(0); ctx.save(); ctx.translate(x + sz * .6, y - sz * .6); ctx.scale(c * (.2 + .8 * Math.abs(Math.cos(t * 6))), c); circle(0, 0, 56, { fill: 'rgba(255,209,102,.35)', stroke: '#ffd166', w: 6 }); ctx.restore(); }
  stamp('CARA O CRUZ', 600, 560, 60, '#ffd166', easeBack(seg(t, tCa - .1, tCa + .3)));
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
