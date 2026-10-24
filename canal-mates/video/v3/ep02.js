// Episodio 2 · Los choques que cuentan los dígitos de π (historia → reglas → ejemplos → reloj)
const SIMS = {};
function simulate(ratio) {            // sucesos discretos exactos: pequeño m=1, grande M=ratio, pared en x=0
  if (SIMS[ratio]) return SIMS[ratio];
  const M = ratio, m = 1; let x1 = 200, x2 = 520, v1 = 0, v2 = -1; const w1 = 70, ev = [{ x1, x2, v1, v2 }];
  for (let g = 0; g < 2e6; g++) {
    const tw = v1 < 0 ? -x1 / v1 : Infinity, rel = v1 - v2, tb = rel > 0 ? (x2 - (x1 + w1)) / rel : Infinity;
    if (tw === Infinity && tb === Infinity) break;
    const dt = Math.min(tw, tb); x1 += v1 * dt; x2 += v2 * dt;
    if (tw <= tb) v1 = -v1; else { const a = ((m - M) * v1 + 2 * M * v2) / (m + M), b = ((M - m) * v2 + 2 * m * v1) / (m + M); v1 = a; v2 = b; }
    ev.push({ x1, x2, v1, v2 });
  }
  return SIMS[ratio] = { n: ev.length - 1, ev, ratio };
}
const bigSize = r => 70 + 38 * Math.log10(r), WALL = 110, FLOOR = 1080, TAIL = 260;
function stateAt(sim, u) {
  const N = sim.n; u = Math.max(0, u);
  if (u >= N) { const e = sim.ev[N], d = u - N; return { x1: e.x1 + e.v1 * d * TAIL, x2: e.x2 + e.v2 * d * TAIL }; }
  const i = Math.floor(u), f = u - i, a = sim.ev[i], b = sim.ev[i + 1];
  return { x1: a.x1 + (b.x1 - a.x1) * f, x2: a.x2 + (b.x2 - a.x2) * f };
}
// mapas vídeo→índice de choque. "times": instante de vídeo de cada choque k=1..N (a medida)
function uFromTimes(t, t0, times) {
  const N = times.length; if (t <= t0) return 0;
  if (t <= times[0]) return (t - t0) / (times[0] - t0);
  for (let k = 1; k < N; k++) if (t <= times[k]) return k + (t - times[k - 1]) / (times[k] - times[k - 1]);
  return N + (t - times[N - 1]) * 1.0;
}
function evenTimes(t0, t1, N) { const d0 = Math.min(1.0, (t1 - t0) * .3), a = t0 + d0, ts = []; for (let k = 1; k <= N; k++) ts.push(N === 1 ? a : a + (k - 1) / (N - 1) * (t1 - a)); return ts; }
const count = (u, N) => Math.min(N, Math.max(0, Math.floor(u + 1e-9)));

function drawWorld(sim, u, o = {}) {
  const w2 = bigSize(sim.ratio), w1 = 70, st = stateAt(sim, u);
  ctx.save();
  line(70, FLOOR, 1010, FLOOR, C.line, 4);
  ctx.beginPath(); ctx.rect(WALL - 34, FLOOR - 600, 34, 600); ctx.fillStyle = 'rgba(230,255,247,.07)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); for (let y = FLOOR - 600; y < FLOOR; y += 18) { ctx.moveTo(WALL - 34, y + 18); ctx.lineTo(WALL, y); } ctx.strokeStyle = C.faint; ctx.lineWidth = 2; ctx.stroke();
  const sx1 = WALL + st.x1, sx2 = WALL + st.x2;
  const kf = Math.floor(Math.max(0, u)), ff = Math.max(0, u) - kf, fl = (sim.n <= 40 && kf >= 1 && kf <= sim.n && ff < .4) ? 1 - ff / .4 : 0;
  const vv = u < sim.n ? sim.ev[Math.min(sim.n, kf)] : sim.ev[sim.n];            // velocidades del tramo actual
  if (Math.abs(vv.v2) > .05 && u < sim.n + 1) for (let i = 0; i < 5; i++) { const L = Math.min(90, 55 * Math.abs(vv.v2)) * (1 - i * .12); line(sx2 + w2 + 14, FLOOR - w2 * (.2 + i * .15), sx2 + w2 + 14 + L, FLOOR - w2 * (.2 + i * .15), C.soft, 2); }
  ctx.beginPath(); ctx.rect(sx1, FLOOR - w1, w1, w1); ctx.fillStyle = `rgba(230,255,247,${.10 + .5 * fl})`; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.rect(sx2, FLOOR - w2, w2, w2); ctx.fillStyle = `rgba(255,143,107,${.14 + .45 * fl})`; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 4; ctx.stroke();
  txt('1 KG', sx1 + w1 / 2, FLOOR - w1 / 2, 20, C.line, { weight: 700 });
  txt(fmt(sim.ratio) + ' KG', sx2 + w2 / 2, FLOOR - w2 / 2, Math.max(18, Math.min(34, w2 / 7)), C.accent, { weight: 800 });
  if (sim.n <= 40 && o.flash !== false && u < sim.n + 1) { const k = Math.floor(u), f = u - k;
    if (k >= 1 && f < .55 && u <= sim.n + .01) { const e = sim.ev[k], wall = Math.abs(e.x1) < 1e-6, px = wall ? WALL : WALL + e.x1 + w1, a = 1 - f / .55;
      ctx.globalAlpha *= a; circle(px, FLOOR - 36, 14 + f * 90, { stroke: C.accent, w: 4 }); } }
  ctx.restore();
}
const hudSim = (lt, n, r) => { hud('L', 'CHOQUES', String(n), { color: C.accent, alpha: seg(lt, .05, .35) }); hud('R', 'MASA DEL GRANDE', fmt(r), { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) }); };

// ── ventanas de simulación (también sirven para el sonido) ──
function winFor(name) {
  const s = SC[name], T = (w, n = 0) => wt(name, w, n);
  if (name === 'hook') return [{ r: 100, t0: 0, times: evenTimes(0, wt('hook', 'universo') + .2, 31) }];
  if (name === 'igual') return [{ r: 1, t0: s.start + .5, times: [T('empuja') + .2, T('rebota') + .45, T('chocar') + .1] }];
  if (name === 'cien') return [{ r: 100, t0: s.start + .3, times: evenTimes(s.start + .3, T('treinta') + .05, 31) }];
  if (name === 'digitos') return [{ r: 1e4, t0: s.start + .2, times: evenTimes(s.start + .2, T('catorce') + .1, 314) }, { r: 1e6, t0: T('millon') + .2, times: evenTimes(T('millon') + .2, T('uno', 0) + .1, 3141) }];
  return [];
}
function runWin(name, t) {
  const W_ = winFor(name); let cur = W_[0]; W_.forEach(w => { if (t >= w.t0 - .3) cur = w; });
  const sim = simulate(cur.r), u = uFromTimes(t, cur.t0, cur.times); drawWorld(sim, u); return [count(u, sim.n), cur.r, sim];
}

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tFam = T('famosos'), tUni = T('universo');
  // la acción empieza en el fotograma 0: el bloque grande ya avanza y los choques arrancan enseguida mientras el narrador pregunta
  const w = winFor('hook')[0], sim = simulate(100), u = uFromTimes(t, w.t0, w.times), st = stateAt(sim, u), w2 = bigSize(100);
  const e = easeOut(seg(t, 0, 2.2)), bigX = WALL + st.x2 + w2 / 2, fx = lerp(bigX, 540, e), Z = lerp(1.9, 1, e);
  headline('¿Cuántos', 'choques?', .05, t, { cps: 34 });
  ctx.save(); ctx.translate(540, FLOOR - 60); ctx.scale(Z, Z); ctx.translate(-fx, -(FLOOR - 60)); drawWorld(sim, u); ctx.restore();
  const q = easeBack(seg(t, tFam - .1, tFam + .4)); if (q > 0) { txt('?', 700, 640, 260, C.accent, { weight: 800, scale: q * (1 + .04 * Math.sin(t * 5)) }); txt('UN NÚMERO FAMOSO', 700, 790, 34, C.label, { weight: 700, ls: 4, alpha: seg(t, tUni - .1, tUni + .3) }); }
}
function sceneReglas(t, lt, s) {
  const T = w => wt('reglas', w), tRo = T('rozamiento'), tPe = T('perfectos'), tBi = T('billar'), tPq = T('pequeno'), tQu = T('quieto'), tGr = T('grande'), tAv = T('avanza');
  hud('L', 'CHOQUES', '0', { color: C.accent, alpha: seg(lt, .05, .35) }); hud('R', 'MASA DEL GRANDE', '100', { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) });
  const sim = simulate(100); drawWorld(sim, seg(t, s.start, tAv) * .22 + seg(t, tAv, tAv + 1.6) * .38, { flash: false });
  // sin rozamiento: líneas de deslizamiento bajo los bloques
  const fr = easeOut(seg(t, tRo - .1, tRo + .4)); if (fr > 0) { ctx.save(); ctx.globalAlpha *= fr * .8; for (let i = 0; i < 5; i++) line(190 + i * 150, FLOOR + 22 + (i % 2) * 10, 260 + i * 150, FLOOR + 22 + (i % 2) * 10, C.mint, 3); ctx.restore(); txt('SIN ROZAMIENTO', 540, FLOOR + 80, 30, C.mint, { weight: 800, ls: 4, alpha: fr }); }
  // bolas de billar que chocan en bucle (nunca hay un segundo quieto)
  const bi = easeBack(seg(t, tBi - .3, tBi + .3)), ph = (t % 2.0) / 2.0; if (bi > 0) { ctx.save(); ctx.translate(540, 560); ctx.scale(bi, bi);
    const ax = ph < .35 ? lerp(-250, -52, ph / .35) : -52, bx = ph < .35 ? 52 : lerp(52, 330, easeOut((ph - .35) / .5)); ctx.globalAlpha *= 1 - seg(ph, .88, 1) ;
    circle(ax, 0, 46, { stroke: C.accent, w: 4, fill: 'rgba(255,143,107,.15)' }); circle(bx, 0, 46, { stroke: C.line, w: 4, fill: 'rgba(230,255,247,.10)' });
    txt('8', ax, 2, 40, C.accent, { weight: 800 }); txt('3', bx, 2, 40, C.line, { weight: 800 });
    if (ph > .33 && ph < .5) circle(0, 0, 20 + (ph - .33) * 260, { stroke: C.accent, w: 3 }); ctx.restore();
    txt('COMO BOLAS DE BILLAR', 540, 655, 32, C.accent, { weight: 800, ls: 3, alpha: seg(t, tBi, tBi + .3) }); }
  const pa = seg(t, tPq, tPq + .3); if (pa > 0) txt('PEQUEÑO', WALL + 235, FLOOR + 140, 26, C.label, { alpha: pa, weight: 700, ls: 3 });
  const ga = seg(t, tGr, tGr + .3); if (ga > 0) txt('GRANDE', WALL + 593, FLOOR + 140, 26, C.accent, { alpha: ga, weight: 700, ls: 3 });
  const qu = seg(t, tQu, tQu + .3) * (1 - seg(t, tAv, tAv + .3)); if (qu > 0) txt('quieto…', WALL + 235, FLOOR - 120, 28, C.line, { alpha: qu, weight: 700 });
}
function sceneIgual(t, lt, s) {
  const [n, r] = runWin('igual', t); hudSim(lt, n, r);
  const w = winFor('igual')[0], T = x => wt('igual', x);
  const step = (k, label, tt) => { const a = easeBack(seg(t, tt - .05, tt + .3)); if (a > 0) txt(label, W / 2, 470 + (k - 1) * 70, 44, k === 3 ? C.accent : C.line, { weight: 800, scale: a, align: 'center' }); };
  step(1, '1 · EL GRANDE EMPUJA AL PEQUEÑO', T('empuja')); step(2, '2 · REBOTA EN LA PARED', T('rebota')); step(3, '3 · VUELVE A CHOCAR', T('chocar'));
}
function sceneCien(t, lt, s) {
  const [n, r] = runWin('cien', t); hudSim(lt, n, r);
  const T = w => wt('cien', w), tCa = T('camion'), tPe = T('pelota');
  const a = easeBack(seg(t, tCa - .1, tCa + .35)); if (a > 0) { ctx.save(); ctx.translate(700, 620); ctx.scale(a, a); truck(0, 90, 120, C.accent, 4); ctx.restore(); txt('CAMIÓN', 700, 740, 30, C.accent, { weight: 800, ls: 4, alpha: seg(t, tCa, tCa + .3) }); }
  const b = easeBack(seg(t, tPe - .1, tPe + .35)); if (b > 0) { ctx.save(); ctx.translate(330, 650); ctx.scale(b, b); ball(0, 0, 36, C.line, 4); ctx.restore(); txt('PELOTA', 330, 740, 30, C.line, { weight: 800, ls: 4, alpha: seg(t, tPe, tPe + .3) }); }
}
function sceneDigitos(t, lt, s) {
  const T = (w, n = 0) => wt('digitos', w, n), tNo = T('suena'), fade = 1 - seg(t, tNo - .1, tNo + .3);
  if (fade > 0) { ctx.save(); ctx.globalAlpha *= fade; const [n, r] = runWin('digitos', t); hudSim(lt, n, r); ctx.restore(); }
  const post = easeOut(seg(t, tNo, tNo + .4)); if (post <= 0) return;
  ctx.save(); ctx.globalAlpha *= post;
  hud('L', 'MIRA LOS CHOQUES', '3 · 31 · 314 · 3141', { size: 44 });
  const D = [[T('tres', 1), '3'], [T('uno', 1), '1'], [T('cuatro', 0), '4'], [T('uno', 2), '1']]; ctx.font = `800 220px ${MONO}`; const cw = ctx.measureText('0').width;
  let x = W / 2 - (cw * 4.4) / 2 + cw / 2;
  D.forEach(([tt, d], i) => { const a = easeBack(seg(t, tt - .05, tt + .35)); const xx = W / 2 - (D.length - 1) * cw * .62 + i * cw * 1.24; if (a > 0) txt(d, xx, 780, 220, C.accent, { weight: 800, scale: a }); });
  const tp = T('pi'), p = easeBack(seg(t, tp - .05, tp + .4)); if (p > 0) { txt('π = 3,141…', W / 2, 1030, 90, C.line, { weight: 800, scale: p, ls: 2 }); txt('LOS DÍGITOS DE PI', W / 2, 1130, 34, C.label, { weight: 700, ls: 5, alpha: p }); }
  const rows = [['1 kg', '3'], ['100 kg', '31'], ['10.000 kg', '314'], ['1.000.000 kg', '3141']];
  rows.forEach(([m, c], i) => { const tt = D[i][0], a = easeOut(seg(t, tt, tt + .3)); if (a <= 0) return; txt(m, 130, 420 + i * 58, 32, C.label, { align: 'left', weight: 600, alpha: a }); txt(c, 950, 420 + i * 58, 40, C.line, { align: 'right', weight: 800, alpha: a }); });
  ctx.restore();
}

// ── el reloj: cada choque = un paso de ángulo θ; media vuelta = π ──
const DX = 540, DY = 820, DR = 300;
function dial(stepDeg, steps, hand, tickAlpha = 1) {
  circle(DX, DY, DR, { w: 4 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(DX + Math.sin(a) * (DR - 26), DY - Math.cos(a) * (DR - 26), DX + Math.sin(a) * (DR - 10), DY - Math.cos(a) * (DR - 10), C.faint, 3); }
  const th = stepDeg * Math.PI / 180;
  if (tickAlpha > 0 && steps <= 400) { ctx.save(); ctx.globalAlpha *= tickAlpha; for (let k = 0; k <= steps; k++) { const a = k * th, len = steps > 100 ? 14 : 24; line(DX + Math.sin(a) * (DR - len - 4), DY - Math.cos(a) * (DR - len - 4), DX + Math.sin(a) * (DR + 6), DY - Math.cos(a) * (DR + 6), C.accent, steps > 100 ? 1.5 : 3); } ctx.restore(); }
  const a = hand * th; line(DX, DY, DX + Math.sin(a) * (DR - 40), DY - Math.cos(a) * (DR - 40), C.accent, 7); circle(DX, DY, 10, { fill: C.line, stroke: null });
  ctx.beginPath(); ctx.arc(DX, DY, DR + 30, -Math.PI / 2, -Math.PI / 2 + a); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(255,143,107,.55)'; ctx.stroke();
}
function sceneReloj(t, lt, s) {
  const T = (w, n = 0) => wt('reloj', w, n), tPi = T('pi'), tRe = T('reloj'), tAg = T('aguja', 0), tPa = T('paso', 0), tIg = T('mismo'), tMe = T('media');
  headline('¿Por qué', 'sale pi?', s.start + .1, t, { alpha: 1 - seg(t, tRe - .1, tRe + .1) });
  const th = Math.atan(.1) * 180 / Math.PI, N = 31, start = tPa + .2, end = tMe + .3;
  const k = clamp((t - start) / (end - start)) * N, kk = Math.floor(k), f = k - kk, hand = t < start ? 0 : kk + easeIO(f);
  const a = easeOut(seg(t, tRe - .1, tRe + .4));
  ctx.save(); ctx.globalAlpha *= a; hud('L', 'CHOQUES', String(Math.min(N, Math.floor(hand + 1e-6))), { color: C.accent, size: 76 }); hud('R', 'PASO', '5,7°', { size: 76 });
  dial(th, Math.floor(hand), hand * (t < start ? 0 : 1), seg(t, tIg - .1, tIg + .3) > 0 ? 1 : 0); ctx.restore();
  if (t >= tPa && t < tIg) { const w = easeOut(seg(t, tPa, tPa + .4)); ctx.save(); ctx.globalAlpha *= w; ctx.beginPath(); ctx.moveTo(DX, DY); ctx.arc(DX, DY, 200, -Math.PI / 2, -Math.PI / 2 + th * Math.PI / 180 * 1); ctx.closePath(); ctx.fillStyle = 'rgba(255,143,107,.45)'; ctx.fill(); ctx.restore(); txt('1 paso', DX + 90, DY - 230, 30, C.accent, { weight: 800, alpha: w }); }
  const m = easeBack(seg(t, tMe - .05, tMe + .4)); if (m > 0) txt('MEDIA VUELTA', DX, 1240, 56, C.accent, { weight: 800, scale: m, ls: 3 });
  txt('= 180°', DX, 1310, 40, C.line, { weight: 800, alpha: m });
}
function scenePorque(t, lt, s) {
  const T = (w, n = 0) => wt('porque', w, n), tPes = T('pesado'), tPeq = T('pequeno'), tPas = T('pasos'), tPi = T('pi');
  const stage = t >= tPas ? 2 : t >= tPeq ? 1 : 0, data = [[1, 45, 3, '1'], [100, 5.7106, 31, '100'], [1e4, 0.5729, 314, '10.000']][stage];
  hud('L', 'MASA DEL GRANDE', data[3], { unit: 'KG', size: 64, alpha: seg(lt, .05, .35) });
  hud('R', 'CHOQUES', String(data[2]), { color: C.accent, size: 76, alpha: seg(lt, .05, .35) });
  const st = [tPes, tPeq, tPas][stage], g = easeOut(seg(t, st, st + .6)), steps = data[2], shown = Math.floor(steps * g);
  dial(data[1], Math.max(1, shown), shown, 1);
  txt(stage === 0 ? 'PASO GRANDE' : stage === 1 ? 'PASO MEDIANO' : 'PASO MINÚSCULO', DX, 1240, 44, C.line, { weight: 800, ls: 3 });
  txt(`${data[1] >= 10 ? '45' : data[1] > 1 ? '5,7' : '0,57'}° × ${steps} ≈ 180°`, DX, 1305, 38, C.accent, { weight: 800 });
  const p = easeBack(seg(t, tPi - .05, tPi + .4)); if (p > 0) { ctx.save(); ctx.fillStyle = 'rgba(5,32,42,.94)'; rrect(120, 470, 840, 150, 30); ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); txt('media vuelta = π', W / 2, 545, 62, C.accent, { weight: 800, scale: p }); }
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, reglas: sceneReglas, igual: sceneIgual, cien: sceneCien, digitos: sceneDigitos, reloj: sceneReloj, porque: scenePorque, cta: sceneCta };

window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  ['hook', 'igual', 'cien', 'digitos'].forEach(name => winFor(name).forEach(w => { const sim = simulate(w.r);
    for (let k = 1; k <= sim.n; k++) { const e = sim.ev[k], wall = Math.abs(e.x1) < 1e-6; E.push({ t: w.times[k - 1], type: sim.n > 400 ? 'roll' : (wall ? 'wall' : 'hit') }); } }));
  P('hook', 'chocan'); P('hook', 'famosos', 0, 'boom'); P('reglas', 'rozamiento'); P('reglas', 'billar'); P('reglas', 'avanza', 0, 'swipe');
  P('igual', 'tres', 0, 'ding'); P('cien', 'camion'); P('cien', 'pelota'); P('cien', 'treinta', 0, 'ding'); P('digitos', 'suena');
  P('digitos', 'tres', 1, 'ding'); P('digitos', 'uno', 1, 'ding'); P('digitos', 'cuatro', 0, 'ding'); P('digitos', 'uno', 2, 'ding'); P('digitos', 'pi', 0, 'ding');
  P('reloj', 'reloj'); P('reloj', 'paso'); P('reloj', 'mismo'); P('reloj', 'media', 0, 'ding'); P('porque', 'pesado'); P('porque', 'pequeno'); P('porque', 'pasos'); P('porque', 'pi', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
