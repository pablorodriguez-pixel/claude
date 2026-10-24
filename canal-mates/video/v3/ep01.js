// Episodio 1 · Las 1.000 botellas
const GX = 214, GY = 400, GCW = 16.35, GCH = 26;
const bitCount = k => { let c = 0; for (let n = 1; n <= 1000; n++) if (((n - 1) >> (k - 1)) & 1) c++; return c; };
const dimGrid = (lt, a = .3) => bottleGrid(1000, 40, GX, GY, GCW, GCH, () => a);

function sceneHook(t, lt, s) {
  const tEx = wt('hook', 'envenenada'), tD = wt('hook', 'diez'), tQ = wt('hook', 'como');
  hud('L', 'BOTELLAS', '1.000', { alpha: seg(lt, .05, .35) });
  const P = 12 * 40 + 8, ring = easeBack(seg(t, tEx - .1, tEx + .4)), ten = seg(t, tD - .05, tD + .25);
  bottleGrid(1000, 40, GX, GY, GCW, GCH, i => easeOut(seg(lt, .05 + Math.floor(i / 40) * .035 + (i % 40) * .002, .3 + Math.floor(i / 40) * .035 + (i % 40) * .002)),
    i => (i === P && ring > 0) ? C.accent : C.line);
  if (ring > 0) { const cx = GX + 8 * GCW + GCW / 2, cy = GY + 12 * GCH + 11;
    circle(cx, cy, 24 * ring, { stroke: C.accent, w: 3 });
    const ph = ((t - tEx) * .9) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * .6; circle(cx, cy, 24 + ph * 60, { stroke: C.accent, w: 2 }); ctx.restore(); }
  hud('R', 'CATADORES', '10', { alpha: ten, color: C.accent });
  peopleRow(10, 135, 90, 1190, 84, tD, { t, step: .07, color: () => C.accent });
  const q = easeBack(seg(t, tQ - .05, tQ + .35));
  if (q > 0) txt('¿CÓMO?', W / 2, 1290, 96, C.accent, { weight: 800, scale: q, ls: 4 });
}

function scenePlazo(t, lt, s) {
  const tH = wt('plazo', 'hora'), tF = wt('plazo', 'fiesta'), tR = wt('plazo', 'ronda');
  hud('L', 'EL VENENO TARDA', '1', { alpha: seg(t, tH - .1, tH + .3), unit: 'HORA' });
  const f = seg(t, tF - .1, tF + .3);
  hud('R', 'LA FIESTA ES', 'MAÑANA', { alpha: f, color: C.accent, size: 64 });
  const cx = W / 2, cy = 830, a = easeOut(seg(lt, .1, .6));
  ctx.save(); ctx.globalAlpha *= a;
  line(250, 1090, 830, 1090, C.line, 4); line(280, 1090, 260, 1230, C.soft, 3); line(800, 1090, 820, 1230, C.soft, 3);
  [0, 1, 2].forEach(i => bottle(340 + i * 44, 1000, 30, 90, C.line, 3));
  const ang = t >= tH ? easeIO(seg(t, tH, tH + 1.4)) * Math.PI * 2 + seg(t, tH + 1.4, s.end) * Math.PI * 2 : 0;
  clock(cx, cy, 200, ang);
  ctx.restore();
  const r = easeBack(seg(t, tR - .05, tR + .35));
  if (r > 0) txt('1 RONDA DE PRUEBAS', W / 2, 1290, 48, C.accent, { weight: 800, ls: 3, scale: r });
}

function sceneObvio(t, lt, s) {
  const tC = wt('obvio', 'cientos'), tD = wt('obvio', 'diez'), tB = wt('obvio', 'binario');
  hud('L', 'BOTELLAS', '1.000', {});
  const kill = easeOut(seg(t, tC + .55, tC + .85)), ten = seg(t, tD - .05, tD + .25);
  hud('R', 'CATADORES', ten > 0 ? '10' : '500', { color: ten > 0 ? C.accent : C.line, alpha: seg(t, tC - .1, tC + .25) });
  if (kill > 0 && ten <= 0) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W - 330, 345); ctx.lineTo(W - 330 + 230 * kill, 300 + 45 * (1 - kill)); ctx.stroke(); ctx.restore(); }
  dimGrid(lt);
  const crowd = seg(t, tC - .2, tC + .6) * (1 - seg(t, tB - .1, tB + .3));
  if (crowd > 0) for (let i = 0; i < 36; i++) { const col = i % 12, row = Math.floor(i / 12); ctx.save(); ctx.globalAlpha *= crowd * .8; person(150 + col * 70, 1110 + row * 70, 56, C.line, null, 2.4); ctx.restore(); }
  const b = easeBack(seg(t, tB - .05, tB + .35));
  if (b > 0) txt('SISTEMA BINARIO', W / 2, 1010, 54, C.accent, { weight: 800, ls: 4, scale: b });
  peopleRow(10, 135, 90, 1230, 84, tD, { t, step: .1, color: () => C.accent, lw: 3 });
}

const BX = i => 390 + i * 150;
function miniBase(t, lt, o = {}) {
  hud('L', 'BOTELLAS', '4', { alpha: seg(lt, .05, .4) }); hud('R', 'CATADORES', '2', { alpha: seg(lt, .05, .4) });
  const hi = o.hi ?? -1;
  for (let i = 0; i < 4; i++) {
    const a = easeOut(seg(lt, .15 + i * .1, .5 + i * .1)); if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha *= a;
    const on = i === hi;
    if (on) { ctx.fillStyle = 'rgba(255,143,107,.15)'; ctx.fillRect(BX(i) - 60, 470, 120, 640); }
    bottle(BX(i), 520, 62, 128, on ? C.accent : C.line, 3);
    txt(String(i + 1), BX(i), 700, 34, on ? C.accent : C.label, { weight: 800 });
    ctx.restore();
  }
}
function toggles(t, lt, fills, o = {}) {
  [['ANA', 880], ['BETO', 1030]].forEach(([name, y], r) => {
    const a = easeOut(seg(lt, .5 + r * .15, .9 + r * .15)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    const sick = o.sick && o.sick[r];
    person(185, y + 52, 110, sick ? C.mint : C.line, sick ? 'rgba(126,240,200,.45)' : null, 3);
    if (sick) zzz(185, y + 52, 110, t);
    txt(name, 250, y + 20, 24, sick ? C.mint : C.label, { align: 'left', weight: 700, ls: 2 });
    for (let i = 0; i < 4; i++) { circle(BX(i), y, 30, { stroke: C.line, w: 3 }); const f = fills[r][i]; if (f > 0) circle(BX(i), y, 16 * f, { fill: C.line, stroke: null }); }
    ctx.restore();
  });
}
function sceneMini(t, lt, s) { miniBase(t, lt); toggles(t, lt, [[0, 0, 0, 0], [0, 0, 0, 0]]); }
function sceneReglas(t, lt, s) {
  const f = e => easeBack(seg(t, e, e + .3));
  miniBase(t, lt);
  toggles(t, lt, [[0, f(wt('reglas', 'dos')), 0, f(wt('reglas', 'cuatro', 0))], [0, 0, f(wt('reglas', 'tres')), f(wt('reglas', 'cuatro', 1))]]);
}
function sceneLecturas(t, lt, s) {
  const A = [[wt('lecturas', 'nadie'), wt('lecturas', 'uno', 0)], [wt('lecturas', 'ana', 0), wt('lecturas', 'dos', 0)], [wt('lecturas', 'beto', 0), wt('lecturas', 'tres')], [wt('lecturas', 'enferman'), wt('lecturas', 'cuatro')]];
  let k = -1, res = false; A.forEach(([a, r], i) => { if (t >= a - .05) { k = i; res = t >= r - .05; } });
  const sick = k < 0 ? [0, 0] : [k & 1, (k >> 1) & 1];
  miniBase(t, lt, { hi: res ? k : -1 });
  toggles(t, lt, [0, 1].map(r => [0, 1, 2, 3].map(i => ((i >> r) & 1) ? 1 : 0)), { sick });
  if (k >= 0) txt(['NADIE ENFERMA', 'ENFERMA ANA', 'ENFERMA BETO', 'ENFERMAN LOS DOS'][k], W / 2, 1190, 40, C.mint, { weight: 800, ls: 3 });
  if (res) txt(`→ BOTELLA ${k + 1}`, W / 2, 1270, 54, C.accent, { weight: 800, scale: .9 + .1 * easeBack(seg(t, A[k][1] - .05, A[k][1] + .3)) });
}

function sceneDobla(t, lt, s) {
  const t3 = wt('dobla', 'tres'), t4 = wt('dobla', 'cuatro'), tD = wt('dobla', 'duplica');
  const stage = t >= t4 ? 4 : t >= t3 ? 3 : 2, n = 1 << stage, stT = stage === 4 ? t4 : stage === 3 ? t3 : s.start;
  hud('L', 'COMBINACIONES', String(n), { color: C.accent }); hud('R', 'CATADORES', String(stage));
  const dx = 110, y0 = 540, dy = 190, x0 = W / 2 - (Math.min(n, 8) - 1) * dx / 2;
  for (let i = 0; i < n; i++) {
    const nw = i >= (n >> 1) && stage > 2, born = nw ? stT : s.start - 1, d = (i - (n >> 1)) * .05;
    const a = i < 4 ? easeOut(seg(lt, .1 + i * .08, .5 + i * .08)) : easeOut(seg(t, born + .05 + d, born + .4 + d));
    ctx.save(); ctx.globalAlpha *= a; bottle(x0 + (i % 8) * dx, y0 + Math.floor(i / 8) * dy, 56, 118, nw && t < born + 1.2 ? C.accent : C.line, 3); ctx.restore();
  }
  if (t >= tD) txt('×2', W / 2, 1060, 96, C.accent, { alpha: .9, weight: 800, scale: 1 + .08 * Math.sin(Math.max(0, t - stT) * 3) * Math.exp(-(t - stT)) });
  peopleRow(stage, W / 2 - (stage - 1) * 50, 100, 1220, 80, s.start, { t, step: 0, color: i => i === stage - 1 && stage > 2 ? C.accent : C.line });
}

function sceneDiez(t, lt, s) {
  const tD = wt('diez', 'diez'), tQ = wt('diez', 'quinientas'), tR = wt('diez', 'ronda'), tM = wt('diez', 'mil');
  const cyc = Math.floor(clamp((t - tQ) / .62, 0, 9.99)), k = t >= tQ ? cyc + 1 : 0;
  hud('L', 'COMBINACIONES', fmt(1024 * easeOut(seg(t, tM - .2, tM + .6)) || 1000), { alpha: seg(lt, .05, .4) });
  hud('R', k ? `EL CATADOR ${k} PRUEBA` : 'CATADORES', k ? String(bitCount(k)) : '10', { color: k ? C.accent : C.line });
  bottleGrid(1000, 40, GX, GY, GCW, GCH, () => easeOut(seg(lt, .1, .5)) * (k ? .4 : 1));
  if (k) bottleGrid(1000, 40, GX, GY, GCW, GCH, i => ((i >> (k - 1)) & 1) ? 1 : 0, () => C.accent);
  peopleRow(10, 135, 90, 1190, 84, tD, { t, step: .08, color: i => (i + 1 === k) ? C.accent : C.line });
  const rr = easeBack(seg(t, tR - .05, tR + .4));
  if (rr > 0) txt('1 RONDA → 1 BOTELLA', W / 2, 1290, 46, C.accent, { weight: 800, ls: 3, scale: rr });
}

function sceneVeinte(t, lt, s) {
  const tV = wt('veinte', 'veinte'), e = easeIO(seg(t, tV, tV + 1.6)), n = Math.round(lerp(10, 20, easeOut(seg(t, tV, tV + .8))));
  hud('L', 'COMBINACIONES', fmt(lerp(1024, 1048576, e)), { color: e > .02 ? C.accent : C.line }); hud('R', 'CATADORES', String(n));
  ctx.save(); ctx.globalAlpha *= easeOut(seg(lt, .1, .6));
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(280, 430, 520, 600); ctx.strokeStyle = C.soft; ctx.lineWidth = 3; ctx.strokeRect(280, 430, 520, 600);
  ctx.beginPath(); for (let x = 280; x <= 800; x += 13) { ctx.moveTo(x, 430); ctx.lineTo(x, 1030); } for (let y = 430; y <= 1030; y += 15) { ctx.moveTo(280, y); ctx.lineTo(800, y); }
  ctx.strokeStyle = 'rgba(230,255,247,.16)'; ctx.lineWidth = 1; ctx.stroke();
  const r = easeBack(seg(t, tV + 1.2, tV + 1.7)); circle(731, 800, 14 * r, { stroke: C.accent, w: 3 }); circle(731, 800, 4, { fill: C.accent, stroke: null });
  ctx.restore();
  for (let i = 0; i < n; i++) { const aa = i > 9 ? easeOut(seg(t, tV + (i - 10) * .05, tV + .3 + (i - 10) * .05)) : 1;
    ctx.save(); ctx.globalAlpha *= clamp(aa); person(84 + i * 48, 1180, 56, i > 9 ? C.accent : C.line, null, 2.4); ctx.restore(); }
}

function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, plazo: scenePlazo, obvio: sceneObvio, mini: sceneMini, reglas: sceneReglas, lecturas: sceneLecturas, dobla: sceneDobla, diez: sceneDiez, veinte: sceneVeinte, cta: sceneCta };

window.getEvents = () => {
  const E = [];
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: wt('hook', 'envenenada'), type: 'ding' }, { t: wt('hook', 'diez'), type: 'pop' }, { t: wt('hook', 'como'), type: 'pop' });
  E.push({ t: wt('plazo', 'hora'), type: 'pop' }, { t: wt('plazo', 'fiesta'), type: 'pop' }, { t: wt('plazo', 'ronda'), type: 'pop' });
  E.push({ t: wt('obvio', 'cientos'), type: 'pop' }, { t: wt('obvio', 'cientos') + .55, type: 'swipe' }, { t: wt('obvio', 'binario'), type: 'pop' }, { t: wt('obvio', 'diez'), type: 'ding' });
  [['reglas', 'dos', 0], ['reglas', 'cuatro', 0], ['reglas', 'tres', 0], ['reglas', 'cuatro', 1]].forEach(([a, b, c]) => E.push({ t: wt(a, b, c), type: 'pop' }));
  [['lecturas', 'uno', 0], ['lecturas', 'dos', 0], ['lecturas', 'tres', 0], ['lecturas', 'cuatro', 0]].forEach(([a, b, c]) => E.push({ t: wt(a, b, c), type: 'ding' }));
  E.push({ t: wt('dobla', 'tres'), type: 'pop' }, { t: wt('dobla', 'cuatro'), type: 'pop' });
  const tQ = wt('diez', 'quinientas'); for (let i = 0; i < 10; i++) E.push({ t: tQ + i * .62, type: 'tick' });
  E.push({ t: wt('diez', 'ronda'), type: 'ding' }, { t: wt('veinte', 'veinte'), type: 'pop' }, { t: wt('veinte', 'veinte') + 1.2, type: 'ding' });
  E.push({ t: wt('cta', 'sigue') + .2, type: 'click' }, { t: wt('cta', 'sigue') + .3, type: 'ding' });
  return E;
};
