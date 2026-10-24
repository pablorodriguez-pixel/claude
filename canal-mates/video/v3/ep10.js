// Episodio 10 · Cuerda alrededor de la Tierra + 1 metro → se separa 16 cm (1/2π)
const GX = 540, GY = 900, GR = 330;
function globe(t, R = GR, x = GX, y = GY, a = 1) { ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x - R * .3, y - R * .3, R * .1, x, y, R); g.addColorStop(0, '#1d7a83'); g.addColorStop(1, '#083039'); circle(x, y, R, { fill: g, stroke: C.line, w: 4 });
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.clip(); ctx.strokeStyle = 'rgba(230,255,247,.18)'; ctx.lineWidth = 2;
  for (let k = 0; k < 8; k++) { const ph = ((k / 8 + t * .05) % 1) * Math.PI; ctx.beginPath(); ctx.ellipse(x, y, Math.abs(Math.cos(ph)) * R, R, 0, 0, Math.PI * 2); ctx.stroke(); }
  for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(x, y + k * R / 4, Math.sqrt(1 - (k / 4) ** 2) * R, R * .06, 0, 0, Math.PI * 2); ctx.stroke(); } ctx.restore(); ctx.restore(); }
function cat(x, y, s, col = C.line) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = s * .06; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.fillStyle = 'rgba(230,255,247,.15)';
  ctx.beginPath(); ctx.ellipse(0, -s * .32, s * .5, s * .22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(s * .55, -s * .55, s * .2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(s * .42, -s * .68); ctx.lineTo(s * .44, -s * .9); ctx.lineTo(s * .56, -s * .74); ctx.moveTo(s * .62, -s * .74); ctx.lineTo(s * .74, -s * .9); ctx.lineTo(s * .74, -s * .66); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-s * .5, -s * .35); ctx.quadraticCurveTo(-s * .85, -s * .4, -s * .8, -s * .8); ctx.stroke();
  for (const lx of [-.32, -.12, .18, .36]) { ctx.beginPath(); ctx.moveTo(s * lx, -s * .16); ctx.lineTo(s * lx, 0); ctx.stroke(); } ctx.restore(); }
function ground(t, gap, o = {}) {                   // vista de cerca: suelo curvo, cuerda por encima y el gato
  const gy = 1150; ctx.save(); ctx.beginPath(); ctx.moveTo(0, gy + 40); ctx.quadraticCurveTo(540, gy - 40, 1080, gy + 40); ctx.lineTo(1080, 1500); ctx.lineTo(0, 1500); ctx.closePath(); ctx.fillStyle = 'rgba(29,122,131,.45)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, gy + 40 - gap); ctx.quadraticCurveTo(540, gy - 40 - gap, 1080, gy + 40 - gap); ctx.strokeStyle = C.accent; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
  if (gap > 30) { line(820, gy - 6, 820, gy - gap + 4, C.line, 3); txt('16 cm', 840, gy - gap / 2, 40, C.line, { align: 'left', weight: 800 }); }
  if (o.cat !== undefined) { const cx = lerp(-100, 700, o.cat); cat(cx, gy - 2 + Math.sin(o.cat * 40) * 2, 150); } }
function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tCu = T('cuerda'), tMe = T('metro'), tSe = T('separa'), tGa = T('gato');
  headline('+1 metro de cuerda', '¿cuánto se separa?', .05, t, { cps: 36, size: 56 });
  const zoom = easeIO(seg(t, tSe - .2, tSe + .9));
  if (zoom < 1) { ctx.save(); ctx.globalAlpha *= 1 - zoom; const z = 1 + zoom * 3; ctx.translate(GX, GY - GR); ctx.scale(z, z); ctx.translate(-GX, -(GY - GR));
    globe(t * 6); const gap = 14 * easeBack(seg(t, tMe - .1, tMe + .5)); circle(GX, GY, GR + 4 + gap, { stroke: C.accent, w: 7 }); ctx.restore();
    const m = easeBack(seg(t, tMe - .1, tMe + .3)); if (m > 0) stamp('+1 METRO', 540, 470, 56, C.accent, m * (1 - zoom), 0); }
  if (zoom > 0) { ctx.save(); ctx.globalAlpha *= zoom; ground(t, 120 * zoom, { cat: seg(t, tGa - 1.2, tGa + 1.5) }); ctx.restore(); }
  const q = easeBack(seg(t, tSe - .1, tSe + .3)) * (1 - seg(t, tGa - .6, tGa - .4)); if (q > 0) txt('¿UN PELO?', 540, 640, 80, C.line, { weight: 800, scale: q });
  const g = easeBack(seg(t, tGa - .1, tGa + .3)); if (g > 0) stamp('¡PASA UN GATO!', 540, 640, 66, C.accent, g);
}
function sceneSorpresa(t, lt, s) {
  const T = w => wt('sorpresa', w), tCu = T('cuarenta'), tMe = T('metro'), tDi = T('dieciseis'), tPl = T('planeta');
  globe(t * 6); hud('L', 'VUELTA A LA TIERRA', '40.000 km', { size: 60, alpha: seg(t, tCu - .1, tCu + .3) }); hud('R', 'CUERDA', '+1 m', { color: C.accent, size: 72, alpha: seg(t, tMe - .1, tMe + .3) });
  const d = easeBack(seg(t, tDi - .1, tDi + .4)); circle(GX, GY, GR + 6 + 14 * d, { stroke: C.accent, w: 7 }); if (d > 0) stamp('16 cm', 540, 470, 72, C.accent, d, 0);
  if (t >= tPl - .2) { const ph = (Math.max(0, t - tPl) * 1.3) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph); circle(GX, GY, GR + 20 + ph * 140, { stroke: C.accent, w: 4 }); ctx.restore(); }
}
function scenePorque(t, lt, s) {
  const T = (w, n = 0) => wt('porque', w, n), tVu = T('vuelta', 0), tRa = T('radio', 0), tCr = T('crece', 0), tEn = T('entre'), tDi = T('dieciseis'), tIg = T('igual');
  headline('El truco', '', s.start + .1, t);
  const R = 220, cx = 540, cy = 760; circle(cx, cy, R, { stroke: C.line, w: 5 }); const ra = easeOut(seg(t, tRa - .2, tRa + .3)); if (ra > 0) { line(cx, cy, cx + R * ra, cy, C.mint, 6); txt('r', cx + R / 2, cy - 30, 44, C.mint, { weight: 800, alpha: ra }); }
  const f1 = easeBack(seg(t, tVu - .1, tVu + .3)); if (f1 > 0) txt('VUELTA = 2π · r', 540, 1070, 60, C.line, { weight: 800, scale: f1 });
  const f2 = easeBack(seg(t, tCr - .1, tCr + .3)); if (f2 > 0) txt('+1 m  →  r + 1 / 2π', 540, 1160, 52, C.accent, { weight: 800, scale: f2 });
  const f3 = easeBack(seg(t, tDi - .1, tDi + .3)); if (f3 > 0) txt('1 / 6,28 ≈ 0,16 m', 540, 1250, 56, C.mint, { weight: 800, scale: f3 });
  const g = easeBack(seg(t, tIg - .1, tIg + .3)); if (g > 0) stamp('NO DEPENDE DEL TAMAÑO', 540, 470, 46, C.accent, g, 0);
}
function sceneBalon(t, lt, s) {
  const T = w => wt('balon', w), tBa = T('balon'), tDi = T('dieciseis'), tTi = T('tierra');
  headline('Con un balón', 'pasa lo mismo', s.start + .1, t);
  const b = easeBack(seg(t, tBa - .1, tBa + .4)); if (b > 0) { ctx.save(); ctx.translate(320, 860); ctx.scale(b, b); circle(0, 0, 90, { fill: '#f4fffb', stroke: C.ink, w: 4 }); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; circle(Math.cos(a) * 52, Math.sin(a) * 52, 18, { fill: C.ink, stroke: null }); } circle(0, 0, 22, { fill: C.ink, stroke: null }); ctx.restore(); }
  const d = easeOut(seg(t, tDi - .2, tDi + .4)); if (b > 0) { circle(320, 860, 90 + 8 + 52 * d, { stroke: C.accent, w: 6 }); if (d > 0) txt('+16 cm', 320, 1060, 46, C.accent, { weight: 800, alpha: d }); }
  const e = easeOut(seg(t, tTi - .3, tTi + .3)); if (e > 0) { ctx.save(); ctx.globalAlpha *= e; globe(t * 6, 150, 770, 860); circle(770, 860, 150 + 10, { stroke: C.accent, w: 6 }); ctx.restore(); txt('+16 cm', 770, 1060, 46, C.accent, { weight: 800, alpha: e }); stamp('LO MISMO', 540, 1240, 60, C.accent, easeBack(seg(t, tTi - .1, tTi + .3)), 0); }
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, sorpresa: sceneSorpresa, porque: scenePorque, balon: sceneBalon, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'boom' }); P('hook', 'metro', 0, 'ding'); E.push({ t: wt('hook', 'separa') - .2, type: 'zoom' }); P('hook', 'gato', 0, 'boom');
  P('sorpresa', 'cuarenta'); P('sorpresa', 'dieciseis', 0, 'boom'); P('porque', 'vuelta'); P('porque', 'crece'); P('porque', 'dieciseis', 0, 'ding'); P('porque', 'igual', 0, 'boom');
  P('balon', 'balon'); P('balon', 'dieciseis', 0, 'ding'); P('balon', 'tierra', 0, 'boom');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
