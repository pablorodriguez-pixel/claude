// Episodio 6 · Paradoja del cumpleaños con un partido de fútbol (23 personas → 50,7 %)
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const PITCH = { x0: 100, x1: 980, y0: 470, y1: 1230 };
const POS = (() => { const P = [];                                   // 11 + 11 jugadores y el árbitro
  const fA = [[.5, .07], [.2, .2], [.4, .18], [.6, .18], [.8, .2], [.25, .33], [.5, .3], [.75, .33], [.3, .44], [.5, .45], [.7, .44]];
  fA.forEach(([x, y]) => P.push({ x, y, team: 0 })); fA.forEach(([x, y]) => P.push({ x: 1 - x, y: 1 - y, team: 1 })); P.push({ x: .56, y: .52, team: 2 }); return P; })();
const MATCH = [6, 15];                                                 // los dos que coinciden de cumpleaños
function pitch(a = 1) { const { x0, x1, y0, y1 } = PITCH, mx = (x0 + x1) / 2, my = (y0 + y1) / 2; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = 'rgba(230,255,247,.55)'; ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(126,240,200,.06)'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); line(x0, my, x1, my, 'rgba(230,255,247,.55)', 3); circle(mx, my, 90, { stroke: 'rgba(230,255,247,.55)', w: 3 });
  ctx.strokeRect(mx - 200, y0, 400, 120); ctx.strokeRect(mx - 200, y1 - 120, 400, 120); ctx.strokeRect(mx - 80, y0 - 18, 160, 18); ctx.strokeRect(mx - 80, y1, 160, 18); ctx.restore(); }
function playerXY(i, t) { const p = POS[i], { x0, x1, y0, y1 } = PITCH; return [lerp(x0 + 40, x1 - 40, p.x) + Math.sin(t * 1.7 + i) * 10, lerp(y0 + 30, y1 - 10, p.y) + Math.cos(t * 1.3 + i * 2) * 8]; }
function cake(x, y, s) { ctx.save(); ctx.translate(x, y); rrect(-s * .5, -s * .3, s, s * .45, 6); ctx.fillStyle = 'rgba(255,143,107,.25)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.stroke();
  line(-s * .5, -s * .1, s * .5, -s * .1, C.accent, 2); line(0, -s * .3, 0, -s * .55, C.line, 3); ctx.beginPath(); ctx.ellipse(0, -s * .64, s * .07, s * .11, 0, 0, Math.PI * 2); ctx.fillStyle = '#ffd166'; ctx.fill(); ctx.restore(); }
function players(t, o = {}) { for (let i = 0; i < 23; i++) { const [x, y] = playerXY(i, t), p = POS[i], hl = o.hl && MATCH.includes(i); const col = hl ? C.accent : p.team === 0 ? C.line : p.team === 1 ? '#ffb08a' : C.mint;
  ctx.save(); ctx.globalAlpha *= o.dim && !hl ? .35 : 1; person(x, y + 28, 64, col, hl ? 'rgba(255,143,107,.35)' : null, 3); if (o.num) txt(String(i + 1), x, y + 48, 18, C.label, { weight: 700, alpha: o.num }); ctx.restore(); } }
const P23 = k => { let q = 1; for (let i = 0; i < k; i++) q *= (365 - i) / 365; return 1 - q; };

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tMi = T('mitad'), tCu = T('cumplen'), tMd = T('mismo'), tVe = T('veintitres');
  headline('2 cumpleaños', 'el mismo día', .05, t, { cps: 34, size: 60 });
  const e = easeOut(seg(t, 0, 1.3)), Z = lerp(1.6, 1, e); ctx.save(); ctx.translate(540, 850); ctx.scale(Z, Z); ctx.translate(-540, -850);
  pitch(); players(t, { hl: t >= tMd - .1, dim: t >= tMd - .1 && t < tVe - .2, num: t >= tVe - .1 ? seg(t, tVe - .1, tVe + .3) : 0 }); ctx.restore();
  hud('R', '1 DE CADA 2 PARTIDOS', '50%', { color: C.accent, size: 84, alpha: seg(t, tMi - .1, tMi + .2) });
  if (t >= tMd - .1) { const a = easeBack(seg(t, tMd - .1, tMd + .3)), [ax, ay] = playerXY(MATCH[0], t), [bx, by] = playerXY(MATCH[1], t);
    ctx.save(); ctx.setLineDash([12, 10]); ctx.globalAlpha *= a; line(ax, ay - 20, bx, by - 20, C.accent, 4); ctx.restore(); cake(ax, ay - 70, 60 * a); cake(bx, by - 70, 60 * a);
    ctx.save(); ctx.translate((ax + bx) / 2, (ay + by) / 2 - 40); ctx.scale(a, a); rrect(-110, -36, 220, 72, 20); ctx.fillStyle = C.accent; ctx.fill(); txt('14 MAR', 0, 3, 40, C.ink, { weight: 800, ls: 2 }); ctx.restore(); }
  const v = easeBack(seg(t, tVe - .1, tVe + .3)); if (v > 0) { ctx.save(); ctx.translate(540, 1305); ctx.scale(v, v); rrect(-260, -46, 520, 92, 46); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 4; ctx.stroke(); txt('SOLO 23 PERSONAS', 0, 3, 42, C.accent, { weight: 800, ls: 2 }); ctx.restore(); }
}
function sceneIntuicion(t, lt, s) {
  const T = w => wt('intuicion', w), tIm = T('imposible'), tDi = T('dias'), tEq = T('equivocada');
  hud('L', 'DÍAS DEL AÑO', '365', { size: 76, alpha: seg(lt, .05, .3) }); hud('R', 'PERSONAS', '23', { color: C.accent, size: 76, alpha: seg(lt, .05, .3) });
  const cols = 25, cs = 34, gx = 540 - cols * cs / 2, gy = 470;
  for (let d = 0; d < 365; d++) { const x = gx + (d % cols) * cs, y = gy + Math.floor(d / cols) * cs, a = easeOut(seg(lt, d / 365 * .9, d / 365 * .9 + .2)); ctx.fillStyle = `rgba(230,255,247,${.12 * a})`; ctx.fillRect(x + 2, y + 2, cs - 6, cs - 6); }
  for (let i = 0; i < 23; i++) { const d = Math.floor(RND(i + 40) * 365), x = gx + (d % cols) * cs + cs / 2 - 2, y = gy + Math.floor(d / cols) * cs + cs / 2 - 2, a = easeBack(seg(t, tDi + i * .05, tDi + .3 + i * .05)); if (a > 0) circle(x, y, 11 * a, { fill: C.accent, stroke: null }); }
  const q = easeBack(seg(t, tIm - .1, tIm + .3)) * (1 - seg(t, tEq - .3, tEq - .1)); if (q > 0) txt('¿IMPOSIBLE?', 540, 1100, 80, C.line, { weight: 800, scale: q });
  const w = easeBack(seg(t, tEq - .1, tEq + .3)); if (w > 0) { txt('PREGUNTA', 540, 1080, 72, C.red, { weight: 800, scale: w }); txt('EQUIVOCADA', 540, 1160, 72, C.red, { weight: 800, scale: w }); }
}
function sceneParejas(t, lt, s) {
  const T = (w, n = 0) => wt('parejas', w, n), tTu = T('tu'), tCq = T('cualquier'), tDo = T('doscientas'), tPo = T('posibles');
  const cx = 540, cy = 860, R = 360, P = i => [cx + Math.sin(i / 23 * 6.283) * R, cy - Math.cos(i / 23 * 6.283) * R];
  const youA = easeOut(seg(t, tTu - .3, tTu + .3)) * (1 - seg(t, tCq - .2, tCq + .1));
  if (youA > 0) { ctx.save(); ctx.globalAlpha *= youA; for (let j = 1; j < 23; j++) { const [ax, ay] = P(0), [bx, by] = P(j); line(ax, ay, bx, by, C.accent, 2); } ctx.restore(); }
  const pairs = []; for (let i = 0; i < 23; i++) for (let j = i + 1; j < 23; j++) pairs.push([i, j]);
  const k = Math.floor(253 * easeIO(seg(t, tCq, tPo + .2)));
  ctx.save(); ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(126,240,200,.45)'; ctx.beginPath(); for (let q = 0; q < k; q++) { const [ax, ay] = P(pairs[q][0]), [bx, by] = P(pairs[q][1]); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); } ctx.stroke(); ctx.restore();
  for (let i = 0; i < 23; i++) { const [x, y] = P(i); circle(x, y, i === 0 && youA > 0 ? 22 : 15, { fill: i === 0 && youA > 0 ? C.accent : C.line, stroke: null }); }
  if (youA > 0) { const [x, y] = P(0); txt('TÚ', x, y - 44, 34, C.accent, { weight: 800, alpha: youA }); }
  hud('L', youA > 0 ? 'CONTIGO' : 'PAREJAS', String(youA > .5 ? 22 : k), { color: youA > .5 ? C.accent : C.mint, size: 84 });
  const d = easeBack(seg(t, tDo - .1, tDo + .3)); if (d > 0) txt('253 PAREJAS', 540, 1300, 64, C.mint, { weight: 800, scale: d, ls: 3 });
}
function sceneProbabilidad(t, lt, s) {
  const T = w => wt('probabilidad', w), tPo = T('pocas'), tCi = T('cincuenta'), tSe = T('setenta'), tSg = T('seguro');
  const x0 = 150, x1 = 950, y0 = 1180, y1 = 520, X = n => lerp(x0, x1, n / 70), Y = p => lerp(y0, y1, p);
  line(x0, y0, x1, y0, C.soft, 3); line(x0, y0, x0, y1, C.soft, 3);
  txt('PERSONAS', x1, y0 + 44, 24, C.label, { align: 'right', weight: 700, ls: 2 }); txt('100%', x0 - 14, y1, 24, C.label, { align: 'right', weight: 700 }); txt('50%', x0 - 14, Y(.5), 24, C.label, { align: 'right', weight: 700 });
  ctx.save(); ctx.setLineDash([8, 8]); line(x0, Y(.5), x1, Y(.5), C.faint, 2); ctx.restore();
  const nMax = 70 * easeIO(seg(t, s.start + .4, tSe + .4)); ctx.beginPath(); for (let n = 0; n <= nMax; n += .5) { const x = X(n), y = Y(P23(Math.floor(n))); n ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.lineWidth = 6; ctx.strokeStyle = C.accent; ctx.stroke();
  const pp = easeOut(seg(t, tPo - .1, tPo + .3)) * (1 - seg(t, tCi - .3, tCi)); if (pp > 0) txt('CADA PAREJA: 1 ENTRE 365', 540, 440, 38, C.line, { weight: 800, ls: 2, alpha: pp });
  const m1 = easeBack(seg(t, tCi - .1, tCi + .3)); if (m1 > 0) { circle(X(23), Y(P23(23)), 14 * m1, { fill: C.accent, stroke: null }); txt('23 → 50,7%', X(23) + 30, Y(P23(23)) + 50, 44, C.accent, { align: 'left', weight: 800, scale: m1 }); }
  const m2 = easeBack(seg(t, tSe - .1, tSe + .3)); if (m2 > 0) { circle(X(70), Y(P23(70)), 14 * m2, { fill: C.mint, stroke: null }); txt('70 → 99,9%', X(70) - 20, Y(P23(70)) - 46, 44, C.mint, { align: 'right', weight: 800, scale: m2 }); }
  hud('R', 'PROBABILIDAD', (P23(Math.floor(nMax)) * 100).toFixed(1).replace('.', ',') + '%', { color: C.accent, size: 64 });
}
function scenePrueba(t, lt, s) {
  const T = w => wt('prueba', w), tCl = T('clase'), tCo = T('comentarios');
  for (let i = 0; i < 30; i++) { const a = easeOut(seg(t, s.start + i * .02, s.start + .3 + i * .02)), x = 200 + (i % 6) * 136, y = 560 + Math.floor(i / 6) * 130; ctx.save(); ctx.globalAlpha *= a; person(x, y + 40, 80, (i === 8 || i === 21) && t >= tCl ? C.accent : C.line, null, 3); ctx.restore(); if ((i === 8 || i === 21) && t >= tCl) cake(x, y - 40, 46); }
  const b = easeBack(seg(t, tCo - .2, tCo + .3)); if (b > 0) bubble(540, 1260, 640, 120, '¿Y EN TU CLASE? 👇', C.accent, { scale: b, size: 46 });
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, intuicion: sceneIntuicion, parejas: sceneParejas, probabilidad: sceneProbabilidad, prueba: scenePrueba, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'boom' }); P('hook', 'mitad', 0, 'ding'); P('hook', 'mismo', 0, 'boom'); P('hook', 'veintitres');
  P('intuicion', 'imposible'); P('intuicion', 'equivocada', 0, 'buzz');
  P('parejas', 'tu'); P('parejas', 'cualquier', 0, 'swipe'); P('parejas', 'doscientas', 0, 'ding');
  P('probabilidad', 'cincuenta', 0, 'ding'); P('probabilidad', 'setenta', 0, 'ding'); P('prueba', 'comentarios', 0, 'pop');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
