// Episodio 2 · Los choques que cuentan los dígitos de π
// Simulación exacta (sucesos discretos): bloque pequeño m=1, grande M=ratio, pared en x=0.
const SIMS = {};
function simulate(ratio) {
  if (SIMS[ratio]) return SIMS[ratio];
  const M = ratio, m = 1;
  let x1 = 200, x2 = 520, v1 = 0, v2 = -1; const w1 = 70, ev = [{ x1, x2, v1, v2 }];
  for (let guard = 0; guard < 2e6; guard++) {
    const tw = v1 < 0 ? -x1 / v1 : Infinity, rel = v1 - v2, tb = rel > 0 ? (x2 - (x1 + w1)) / rel : Infinity;
    if (tw === Infinity && tb === Infinity) break;
    const dt = Math.min(tw, tb); x1 += v1 * dt; x2 += v2 * dt;
    if (tw <= tb) v1 = -v1;
    else { const a = ((m - M) * v1 + 2 * M * v2) / (m + M), b = ((M - m) * v2 + 2 * m * v1) / (m + M); v1 = a; v2 = b; }
    ev.push({ x1, x2, v1, v2 });
  }
  return SIMS[ratio] = { n: ev.length - 1, ev, ratio };
}
const bigSize = r => 70 + 38 * Math.log10(r);
const WALL = 110, FLOOR = 1080, TAIL = 260;
function stateAt(sim, u) {
  const N = sim.n; u = Math.max(0, u);
  if (u >= N) { const e = sim.ev[N], d = u - N; return { x1: e.x1 + e.v1 * d * TAIL, x2: e.x2 + e.v2 * d * TAIL }; }
  const i = Math.floor(u), f = u - i, a = sim.ev[i], b = sim.ev[i + 1];
  return { x1: a.x1 + (b.x1 - a.x1) * f, x2: a.x2 + (b.x2 - a.x2) * f };
}
// vídeo → índice de choque (primero el acercamiento, luego un ritmo uniforme)
function uOf(t, t0, t1, N) {
  const d0 = Math.min(1.0, (t1 - t0) * .3);
  if (t <= t0) return 0;
  if (t <= t0 + d0) return (t - t0) / d0;
  if (t > t1) return N + (t - t1) * 1.0;   // tras el último choque se alejan despacio
  return 1 + (t - t0 - d0) / (t1 - t0 - d0) * (N - 1);
}
const tauOf = (k, t0, t1, N) => { const d0 = Math.min(1.0, (t1 - t0) * .3); return k <= 1 ? t0 + d0 : t0 + d0 + (k - 1) / (N - 1) * (t1 - t0 - d0); };
const massLabel = r => fmt(r);

function drawWorld(sim, u, o = {}) {
  const w2 = bigSize(sim.ratio), w1 = 70, st = stateAt(sim, u);
  ctx.save();
  line(70, FLOOR, 1010, FLOOR, C.line, 4);
  ctx.beginPath(); ctx.rect(WALL - 34, FLOOR - 600, 34, 600); ctx.fillStyle = 'rgba(230,255,247,.07)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); for (let y = FLOOR - 600; y < FLOOR; y += 18) { ctx.moveTo(WALL - 34, y + 18); ctx.lineTo(WALL, y); } ctx.strokeStyle = C.faint; ctx.lineWidth = 2; ctx.stroke();
  const sx1 = WALL + st.x1, sx2 = WALL + st.x2;
  ctx.beginPath(); ctx.rect(sx1, FLOOR - w1, w1, w1); ctx.fillStyle = 'rgba(230,255,247,.10)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.rect(sx2, FLOOR - w2, w2, w2); ctx.fillStyle = 'rgba(255,143,107,.14)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 4; ctx.stroke();
  txt('1 KG', sx1 + w1 / 2, FLOOR - w1 / 2, 20, C.line, { weight: 700 });
  txt(massLabel(sim.ratio) + ' KG', sx2 + w2 / 2, FLOOR - w2 / 2, Math.max(18, Math.min(34, w2 / 7)), C.accent, { weight: 800 });
  // destello en cada choque (solo cuando son pocos)
  if (sim.n <= 40 && u < sim.n + 1) { const k = Math.floor(u), f = u - k;
    if (k >= 1 && f < .55 && u <= sim.n + .01) { const e = sim.ev[k], wall = Math.abs(e.x1) < 1e-6, px = wall ? WALL : WALL + e.x1 + w1, a = 1 - f / .55;
      ctx.globalAlpha *= a; circle(px, FLOOR - 36, 14 + f * 90, { stroke: C.accent, w: 4 }); } }
  ctx.restore();
  if (sim.n <= 40 && o.meters !== false) {   // medidores de velocidad
    const k = Math.min(sim.n, Math.floor(Math.max(0, u))), e = sim.ev[k], bar = (v, y, col, lab) => {
      txt(lab, 100, y, 24, C.label, { align: 'left', weight: 600, ls: 2 });
      const L = Math.max(-340, Math.min(340, v * 150)); line(560, y, 560 + L, y, col, 14); line(560, y - 18, 560, y + 18, C.soft, 2);
      txt(v.toFixed(2).replace('.', ','), 960, y, 28, col, { align: 'right', weight: 700 }); };
    txt('VELOCIDADES', 100, 1170, 22, C.label, { align: 'left', weight: 500, ls: 4 });
    bar(e.v1, 1230, C.line, 'PEQUEÑO'); bar(e.v2, 1295, C.accent, 'GRANDE');
  }
}
const count = (u, N) => Math.min(N, Math.max(0, Math.floor(u + 1e-9)));

// ── escenas ──
const WIN = {}; // ventanas de simulación [t0, t1] por escena (también para el sonido)
function winFor(name) {
  const s = SC[name];
  switch (name) {
    case 'hook':  return [{ r: 100, t0: s.start + .5, t1: wt('hook', 'pi') - .35 }];
    case 'igual': return [{ r: 1, t0: s.start + .3, t1: wt('igual', 'tres') + .05 }];
    case 'cien':  return [{ r: 100, t0: s.start + .3, t1: wt('cien', 'treinta') + .05 }];
    case 'masas': return [{ r: 1e4, t0: s.start + .3, t1: wt('masas', 'catorce') + .1 }, { r: 1e6, t0: wt('masas', 'millon') + .25, t1: wt('masas', 'uno') + .1 }];
  }
  return [];
}
function runWin(name, t, o = {}) { // dibuja la ventana activa y devuelve [choques, ratio]
  const W_ = winFor(name); let cur = W_[0];
  W_.forEach(w => { if (t >= w.t0 - .3) cur = w; });
  const sim = simulate(cur.r), u = uOf(t, cur.t0, cur.t1, sim.n);
  drawWorld(sim, u); return [count(u, sim.n), cur.r, sim];
}
function hudSim(lt, n, r, extra) {
  hud('L', 'CHOQUES', String(n), { color: C.accent, alpha: seg(lt, .05, .35) });
  hud('R', 'MASA DEL BLOQUE GRANDE', massLabel(r), { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) });
}

function sceneHook(t, lt, s) {
  const [n, r] = runWin('hook', t); hudSim(lt, n, r);
  const p = easeBack(seg(t, wt('hook', 'pi') - .05, wt('hook', 'pi') + .4));
  if (p > 0) txt('π = 3,14159…', W / 2, 640, 84, C.accent, { weight: 800, scale: p, ls: 2 });
  const q = seg(t, wt('hook', 'chocan'), wt('hook', 'chocan') + .3);
  txt('CHOQUES = DÍGITOS', W / 2, 520, 34, C.label, { alpha: q * (1 - p), weight: 600, ls: 5 });
}
function sceneReglas(t, lt, s) {
  const sim = simulate(100), tA = wt('reglas', 'avanza'), tP = wt('reglas', 'pequeno'), tG = wt('reglas', 'grande'), tF = wt('reglas', 'rozamiento'), tC = wt('reglas', 'choques');
  drawWorld(sim, seg(t, tA, tA + 1.6) * .6);
  hud('L', 'CHOQUES', '0', { color: C.accent, alpha: seg(lt, .05, .35) }); hud('R', 'MASA DEL BLOQUE GRANDE', '100', { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) });
  const tag = (s, x, y, a, col = C.label) => txt(s, x, y, 26, col, { weight: 600, ls: 3, alpha: seg(t, a, a + .3) });
  tag('PARED', WALL - 17, FLOOR - 640, SC.reglas.start + .2);
  tag('SIN ROZAMIENTO', 540, 560, tF - .1, C.line); tag('CHOQUES ELÁSTICOS', 540, 610, tC - .1, C.line);
  const pa = seg(t, tP, tP + .3); if (pa > 0) { txt('PEQUEÑO', 200 + WALL + 35, FLOOR + 50, 24, C.label, { alpha: pa, weight: 600, ls: 3 }); }
  const ga = seg(t, tG, tG + .3); if (ga > 0) txt('GRANDE', WALL + 520 + 73, FLOOR + 50, 24, C.accent, { alpha: ga, weight: 600, ls: 3 });
}
function sceneIgual(t, lt, s) { const [n, r] = runWin('igual', t); hudSim(lt, n, r); }
function sceneCien(t, lt, s) { const [n, r] = runWin('cien', t); hudSim(lt, n, r); }
function sceneMasas(t, lt, s) { const [n, r] = runWin('masas', t); hudSim(lt, n, r); }

const TABLA = [[1, 3, 'tres', 0], [100, 31, 'uno', 0], [1e4, 314, 'cuatro', 0], [1e6, 3141, 'uno', 1], [1e8, 31415, 'cinco', 0], [1e10, 314159, 'nueve', 0]];
function sceneTabla(t, lt, s) {
  hud('L', 'MASA DEL BLOQUE GRANDE', 'CHOQUES', { size: 40, alpha: seg(lt, .05, .35) });
  txt('MASA', 160, 520, 26, C.label, { align: 'left', weight: 600, ls: 4, alpha: seg(lt, .1, .4) });
  txt('CHOQUES', 940, 520, 26, C.label, { align: 'right', weight: 600, ls: 4, alpha: seg(lt, .1, .4) });
  line(140, 548, 940, 548, C.soft, 2);
  TABLA.forEach(([r, n, w, nth], i) => {
    const tw = Math.min(wt('tabla', w, nth), SC.tabla.start + .7 + i * .8), a = easeOut(seg(t, tw - .1, tw + .3)), y = 620 + i * 100;
    if (a <= 0) return;
    const ds = String(n); ctx.save(); ctx.globalAlpha *= a;
    txt(fmt(r) + ' kg', 160, y, 44, C.line, { align: 'left', weight: 600 });
    ctx.font = `800 64px ${MONO}`; ctx.letterSpacing = '0px'; const cw = ctx.measureText('0').width;
    for (let k = 0; k < ds.length; k++) txt(ds[k], 940 - (ds.length - k - 1) * cw, y, 64, k === ds.length - 1 ? C.accent : C.line, { align: 'right', weight: 800 });
    ctx.restore();
  });
  const pi = easeBack(seg(t, wt('tabla', 'pi', 0) - .05, wt('tabla', 'pi', 0) + .4));
  if (pi > 0) txt('π = 3,14159265…', W / 2, 1290, 52, C.accent, { weight: 800, scale: pi, ls: 2 });
}

// diagrama del espacio de velocidades
const CX = 540, CY = 860, CR = 300;
function velPoints() { const s = simulate(100), R = 10; return s.ev.map(e => [e.v1 / R, e.v2]); }
function axes(a) { ctx.save(); ctx.globalAlpha *= a; line(CX - CR - 40, CY, CX + CR + 40, CY, C.faint, 2); line(CX, CY - CR - 40, CX, CY + CR + 40, C.faint, 2);
  txt('√m·v', CX + CR + 30, CY - 28, 24, C.label, { align: 'right', weight: 600 }); txt('√M·V', CX + 10, CY - CR - 56, 24, C.label, { align: 'left', weight: 600 }); ctx.restore(); }
function sceneEnergia(t, lt, s) {
  const tE = wt('energia', 'energia'), tD = wt('energia', 'dibujas'), tS = wt('energia', 'salto'), tC = wt('energia', 'circunferencia');
  hud('L', 'CONSERVACIÓN', 'ENERGÍA', { size: 56, alpha: seg(lt, .05, .35) });
  txt('½·m·v² + ½·M·V² = cte', W / 2, 450, 46, C.line, { alpha: seg(t, tE - .1, tE + .3), weight: 700 });
  const a = easeOut(seg(t, tD, tD + .5)); axes(a);
  const k = easeIO(seg(t, tD + .3, tD + 1.8));
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(CX, CY, CR, lerp(CR * .55, CR, k), 0, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke(); ctx.restore();
  if (t >= tS - .1) {
    const P = velPoints(), prog = seg(t, tS, tC + .4) * 6; ctx.save(); ctx.strokeStyle = C.accent; ctx.lineWidth = 4;
    for (let i = 0; i < 6; i++) { const f = clamp(prog - i); if (f <= 0) break; const a_ = P[i], b_ = P[i + 1];
      ctx.beginPath(); ctx.moveTo(CX + a_[0] * CR, CY + a_[1] * CR); ctx.lineTo(CX + lerp(a_[0], b_[0], f) * CR, CY + lerp(a_[1], b_[1], f) * CR); ctx.stroke(); }
    ctx.restore(); circle(CX + P[0][0] * CR, CY + P[0][1] * CR, 10, { fill: C.accent, stroke: null });
  }
  txt('CADA CHOQUE = UN SALTO', W / 2, 1250, 36, C.accent, { alpha: seg(t, tS, tS + .3) * easeOut(seg(t, tS, tS + .4)), weight: 800, ls: 3 });
}
function sceneCirculo(t, lt, s) {
  const tM = wt('circulo', 'saltos'), tH = wt('circulo', 'media'), tA = wt('circulo', 'angulo'), tP = wt('circulo', 'pi');
  hud('L', 'CHOQUES', '31', { color: C.accent, alpha: seg(lt, .05, .35) });
  hud('R', 'MASA DEL BLOQUE GRANDE', '100', { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) });
  axes(1); ctx.beginPath(); ctx.arc(CX, CY, CR, 0, Math.PI * 2); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke();
  const P = velPoints(), N = P.length - 1, prog = easeIO(seg(t, s.start + .5, tH + .3)) * N;
  ctx.save(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3;
  for (let i = 0; i < N; i++) { const f = clamp(prog - i); if (f <= 0) break; const a_ = P[i], b_ = P[i + 1];
    ctx.beginPath(); ctx.moveTo(CX + a_[0] * CR, CY + a_[1] * CR); ctx.lineTo(CX + lerp(a_[0], b_[0], f) * CR, CY + lerp(a_[1], b_[1], f) * CR); ctx.stroke(); }
  ctx.restore();
  for (let i = 0; i <= Math.min(N, Math.floor(prog)); i++) circle(CX + P[i][0] * CR, CY + P[i][1] * CR, 5, { fill: C.line, stroke: null });
  const th = Math.atan(.1), aa = easeOut(seg(t, tA - .1, tA + .4));
  if (aa > 0) { ctx.save(); ctx.globalAlpha *= aa; ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, 150, Math.PI / 2 - th - .0, Math.PI / 2, false); ctx.closePath(); ctx.fillStyle = 'rgba(255,143,107,.35)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.stroke();
    txt('θ', CX - 60, CY + 190, 44, C.accent, { weight: 800 }); ctx.restore(); }
  const pp = easeBack(seg(t, tP - .05, tP + .4));
  if (pp > 0) { txt('180° ÷ 5,7° ≈ 31,5', W / 2, 1245, 50, C.accent, { weight: 800, scale: pp }); txt('→ 31 CHOQUES', W / 2, 1315, 44, C.line, { weight: 800, alpha: pp, ls: 3 }); }
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, reglas: sceneReglas, igual: sceneIgual, cien: sceneCien, masas: sceneMasas, tabla: sceneTabla, energia: sceneEnergia, circulo: sceneCirculo, cta: sceneCta };

window.getEvents = () => {
  const E = [];
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  ['hook', 'igual', 'cien', 'masas'].forEach(name => winFor(name).forEach(w => { const sim = simulate(w.r);
    for (let k = 1; k <= sim.n; k++) { const e = sim.ev[k], wall = Math.abs(e.x1) < 1e-6; E.push({ t: tauOf(k, w.t0, w.t1, sim.n), type: sim.n > 400 ? 'roll' : (wall ? 'wall' : 'hit') }); } }));
  TABLA.forEach(([r, n, w, nth]) => E.push({ t: wt('tabla', w, nth), type: 'ding' }));
  E.push({ t: wt('hook', 'pi'), type: 'ding' }, { t: wt('circulo', 'pi'), type: 'ding' }, { t: wt('energia', 'salto'), type: 'pop' }, { t: wt('circulo', 'angulo'), type: 'pop' });
  E.push({ t: wt('cta', 'sigue') + .2, type: 'click' }, { t: wt('cta', 'sigue') + .3, type: 'ding' });
  return E;
};
window.__sims = () => [1, 100, 1e4, 1e6, 1e8, 1e10].map(r => [r, simulate(r).n]);
