// Episodio 15 · La letra del DNI: número mod 23 → tabla (Ministerio del Interior)
const LET = 'TRWAGMYFPDXBNJZSQVHLCKE';
function idCard(x, y, w, num, letter, o = {}) { const h = w * .63; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.sc || 1, o.sc || 1);
  rrect(-w / 2, -h / 2, w, h, w * .05); const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, '#e9f6f2'); g.addColorStop(1, '#bfe3da'); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke();
  rrect(-w * .44, -h * .3, w * .26, h * .58, w * .02); ctx.fillStyle = 'rgba(6,35,42,.18)'; ctx.fill(); circle(-w * .31, -h * .1, w * .06, { fill: 'rgba(6,35,42,.35)', stroke: null }); rrect(-w * .39, h * .02, w * .16, h * .2, w * .05); ctx.fill();
  txt('DOCUMENTO DE IDENTIDAD', w * .12, -h * .36, w * .045, '#0b3a42', { weight: 800, ls: 2 });
  for (let i = 0; i < 3; i++) { ctx.fillStyle = 'rgba(6,35,42,.25)'; ctx.fillRect(-w * .1, -h * .2 + i * h * .1, w * .45 - i * w * .08, h * .045); }
  ctx.restore();
  const nx = x + w * .07, ny = y + h * .26 * (o.sc || 1); txt(num, nx - w * .06, ny, w * .085 * (o.sc || 1), '#0b3a42', { weight: 800, ls: 2 });
  if (letter) { const k = o.letterK ?? 1; ctx.save(); ctx.translate(nx + w * .3 * (o.sc || 1), ny); ctx.scale(k, k); rrect(-w * .055, -w * .055, w * .11, w * .11, w * .02); ctx.fillStyle = o.letterCol || C.accent; ctx.fill(); ctx.restore(); txt(letter, nx + w * .3 * (o.sc || 1), ny + 3, w * .08 * k, C.ink, { weight: 800 }); } }
function table(t, hi, a = 1, y0 = 560) { for (let i = 0; i < 23; i++) { const c = i % 6, r = Math.floor(i / 6), x = 175 + c * 146, y = y0 + r * 150, on = i === hi, k = easeOut(seg(a, i / 23 * .7, i / 23 * .7 + .3)); if (k <= 0) continue;
  ctx.save(); ctx.globalAlpha *= k; rrect(x - 62, y - 62, 124, 124, 18); ctx.fillStyle = on ? C.accent : 'rgba(5,32,42,.9)'; ctx.fill(); ctx.strokeStyle = on ? C.accent : C.soft; ctx.lineWidth = 3; ctx.stroke();
  txt(String(i), x, y - 32, 26, on ? C.ink : C.label, { weight: 700 }); txt(LET[i], x, y + 14, 60, on ? C.ink : C.line, { weight: 800 }); ctx.restore(); } }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tMa = T('mayoria'), tAz = T('azar'), tNo = T('no'), tCi = T('cinco'), tCo = T('como');
  band('¿POR QUÉ TU DNI', 98, C.line, 1, 330, lerp(1.12, 1, easeOut(seg(t, 0, .35)))); band('TIENE UNA LETRA?', 98, C.accent, 1, 480, lerp(1.12, 1, easeOut(seg(t, 0, .35))));
  const roll = t < tNo ? LET[Math.floor(t * 14) % 23] : 'Z';
  idCard(540, 960, 860, '12345678', roll, { rot: -.04 + .01 * Math.sin(t * 2), sc: lerp(1.15, 1, easeOut(seg(t, 0, .6))), letterK: 1 + .08 * Math.sin(t * 9), letterCol: t < tNo ? C.accent : C.mint });
  const az = easeBack(seg(t, tAz - .2, tAz + .2)) * (1 - seg(t, tNo - .1, tNo + .1)); if (az > 0) stamp('¿AL AZAR?', 540, 1250, 66, C.line, az);
  const n = easeBack(seg(t, tNo - .1, tNo + .3)); if (n > 0) stamp('NO: SE CALCULA', 540, 1250, 66, C.mint, n);
}
function scenePaso1(t, lt, s) {
  const T = w => wt('paso1', w), tDi = T('dividelo'), tVe = T('veintitres'), tSo = T('sobra'), tRe = T('resto'), tCe = T('cero'), tVd = T('veintidos');
  headline('Paso 1', 'divide entre 23', s.start + .1, t);
  txt('12345678', 540, 650, 130, C.line, { weight: 800 });
  const d = easeBack(seg(t, tVe - .2, tVe + .2)); if (d > 0) txt('÷ 23', 540, 800, 110, C.accent, { weight: 800, scale: d });
  const q = easeOut(seg(t, tVe + .6, tVe + 1.2)); if (q > 0) { txt('= 536.768', 540, 950, 80, C.line, { weight: 800, alpha: q * (1 - .65 * seg(t, tSo - .3, tSo)) }); if (t > tSo - .2) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(300, 950); ctx.lineTo(300 + 480 * easeOut(seg(t, tSo - .2, tSo + .1)), 950); ctx.stroke(); ctx.restore(); } }
  const r = easeBack(seg(t, tRe - .2, tRe + .3)); if (r > 0) { stamp('SOBRAN 14', 540, 1120, 80, C.mint, r, 0); txt('← EL RESTO', 860, 1220, 40, C.mint, { weight: 800, alpha: r }); }
  const rg = easeOut(seg(t, tCe - .2, tCe + .3)); if (rg > 0) txt('(siempre entre 0 y 22)', 540, 1300, 40, C.label, { weight: 700, alpha: rg });
}
function scenePaso2(t, lt, s) {
  const T = (w, n = 0) => wt('paso2', w, n), tTa = T('tabla'), tCe = T('cero'), tUn = T('uno'), tDo = T('dos'), tVe = T('veintidos');
  headline('Paso 2', 'busca el resto', s.start + .1, t);
  const hi = t >= tVe - .1 ? 22 : t >= tDo - .1 ? 2 : t >= tUn - .1 ? 1 : t >= tCe - .1 ? 0 : -1;
  table(t, hi, seg(t, s.start + .1, tTa + .5));
}
function sceneEjemplo(t, lt, s) {
  const T = (w, n = 0) => wt('ejemplo', w, n), tSo = T('sobran'), tCa = T('catorce', 1), tZ = T('z');
  headline('Ejemplo', '', s.start + .1, t);
  txt('12345678 ÷ 23', 540, 470, 66, C.line, { weight: 800, alpha: seg(t, s.start + .8, s.start + 1.2) });
  const so = easeBack(seg(t, tSo - .1, tSo + .3)); if (so > 0) txt('resto = 14', 540, 560, 66, C.mint, { weight: 800, scale: so });
  table(t, t >= tCa - .1 ? 14 : -1, 1, 680);
  const z = easeBack(seg(t, tZ - .15, tZ + .35)); if (z > 0) { ctx.save(); ctx.globalAlpha *= z; ctx.fillStyle = 'rgba(6,35,42,.85)'; ctx.fillRect(0, 0, W, H); ctx.restore(); idCard(540, 880, 860, '12345678', 'Z', { letterK: z, letterCol: C.mint }); stamp('¡Z! ✓', 540, 1250, 90, C.mint, z); }
}
function scenePorque(t, lt, s) {
  const T = (w, n = 0) => wt('porque', w, n), tEr = T('errores'), tMa = T('mal'), tCu = T('cuadra'), tI = T('i'), tCe = T('cero');
  headline('¿Para qué sirve?', '', s.start + .1, t, { alpha: 1 - seg(t, tI - .6, tI - .4) });
  const wrong = t >= tMa - .1 && t < tI - .5;
  if (t < tI - .5) { idCard(540, 820, 820, wrong ? '12345679' : '12345678', wrong && t >= tCu - .2 ? 'S' : 'Z', { letterCol: wrong && t >= tCu - .2 ? C.red : C.mint });
    if (wrong) { const k = easeBack(seg(t, tMa - .1, tMa + .3)); txt('↑ UNA CIFRA MAL', 600, 1110, 50, C.red, { weight: 800, scale: k }); }
    const c = easeBack(seg(t, tCu - .2, tCu + .2)); if (c > 0) stamp('LA LETRA NO CUADRA ✗', 540, 1280, 58, C.red, c); }
  else { const k = easeOut(seg(t, tI - .5, tI)); headline('Sin I ni O', '', tI - .5, t, { cps: 40 });
    for (const [x, L, n] of [[300, 'I', '1'], [780, 'O', '0']]) { ctx.save(); ctx.globalAlpha *= k; rrect(x - 160, 640, 320, 320, 40); ctx.fillStyle = 'rgba(5,32,42,.9)'; ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
      txt(L, x - 60, 800, 180, C.line, { weight: 800, alpha: k }); txt('≈', x + 10, 800, 80, C.label, { weight: 800, alpha: k }); txt(n, x + 80, 800, 180, C.line, { weight: 800, alpha: k });
      if (t >= tCe - .5) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 140, 660); ctx.lineTo(x + 140, 940); ctx.stroke(); ctx.restore(); } }
    txt('NO EXISTEN EN EL DNI', 540, 1100, 56, C.red, { weight: 800, alpha: k }); }
}
function sceneReto(t, lt, s) {
  const T = w => wt('reto', w), tCo = T('comentarios');
  idCard(540, 800, 820, '········', '?', { letterCol: '#ffd166', letterK: 1 + .1 * Math.sin(t * 8) });
  band('PRUEBA CON EL TUYO', 84, '#ffd166', easeBack(seg(t, s.start, s.start + .4)), 430);
  const b = easeBack(seg(t, tCo - .3, tCo + .2)); if (b > 0) bubble(540, 1200, 700, 120, '¿TE CUADRA? 👇', C.accent, { scale: b, size: 52 });
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, paso1: scenePaso1, paso2: scenePaso2, ejemplo: sceneEjemplo, porque: scenePorque, reto: sceneReto, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 30; i++) E.push({ t: .05 + i * (wt('hook', 'no') / 30), type: 'tick' }); P('hook', 'azar', 0, 'buzz'); P('hook', 'no', 0, 'boom'); P('hook', 'como', 0, 'ding');
  P('paso1', 'veintitres', 0, 'pop'); P('paso1', 'sobra', 0, 'swipe'); P('paso1', 'resto', 0, 'ding');
  P('paso2', 'tabla', 0, 'swipe'); P('paso2', 'cero'); P('paso2', 'uno'); P('paso2', 'dos'); P('paso2', 'veintidos');
  P('ejemplo', 'sobran', 0, 'ding'); P('ejemplo', 'catorce', 1, 'pop'); P('ejemplo', 'z', 0, 'boom');
  P('porque', 'mal', 0, 'swipe'); P('porque', 'cuadra', 0, 'buzz'); P('porque', 'i', 0, 'pop'); P('porque', 'cero', 0, 'buzz');
  P('reto', 'comentarios', 0, 'ding'); P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
