// Episodio 11 · ¿Te compensa ir a la gasolinera más barata? (gasolina 95 ≈ 1,82 €/l, consumo 6,5 l/100 km)
function pylon(x, y, s, name, price, col, o = {}) { ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= o.alpha ?? 1;
  ctx.fillStyle = 'rgba(5,32,42,.95)'; rrect(-s * .5, -s * 1.6, s, s * 1.15, s * .08); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke();
  line(0, -s * .45, 0, 0, C.line, s * .08); txt(name, 0, -s * 1.42, s * .15, C.label, { weight: 800, ls: 2 }); txt('GASOLINA 95', 0, -s * 1.22, s * .1, C.label, { weight: 700 });
  txt(price, 0, -s * .9, s * .32, col, { weight: 800 }); txt('€/l', 0, -s * .63, s * .1, C.label, { weight: 700 }); ctx.restore(); }
function carSide(x, y, s, col = C.accent) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = s * .05; ctx.lineJoin = 'round'; ctx.fillStyle = 'rgba(255,143,107,.25)';
  ctx.beginPath(); ctx.moveTo(-s * .9, 0); ctx.lineTo(-s * .9, -s * .3); ctx.lineTo(-s * .55, -s * .36); ctx.lineTo(-s * .3, -s * .7); ctx.lineTo(s * .35, -s * .7); ctx.lineTo(s * .62, -s * .36); ctx.lineTo(s * .9, -s * .3); ctx.lineTo(s * .9, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  circle(-s * .5, 0, s * .2, { fill: '#071a1f', stroke: col, w: s * .05 }); circle(s * .5, 0, s * .2, { fill: '#071a1f', stroke: col, w: s * .05 }); ctx.restore(); }
function tank(x, y, w, h, frac, col) { rrect(x - w / 2, y - h, w, h, 24); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.stroke();
  ctx.save(); rrect(x - w / 2, y - h, w, h, 24); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h * frac, w, h * frac); ctx.restore(); }
const GX0 = 230, GX1 = 850, GY = 1060;

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tPe = T('pero'), tCo = T('compensa'), tSi = T('si'), tHa = T('hagamos');
  // fotograma 0: las dos gasolineras, el coche y los 12 km
  line(GX0 - 80, GY, GX1 + 80, GY, C.soft, 6); ctx.save(); ctx.setLineDash([40, 30]); ctx.lineDashOffset = -t * 120; line(GX0, GY + 60, GX1, GY + 60, C.soft, 4); ctx.restore();
  pylon(GX0, GY, 300, 'AL LADO', '1,82', C.line); pylon(GX1, GY, 300, 'LEJOS', '1,77', C.mint, { alpha: 1 });
  const pr = (Math.sin(t * 5) + 1) / 2; circle(GX1, GY - 270, 170 + pr * 14, { stroke: `rgba(126,240,200,${.25 + .3 * pr})`, w: 4 });
  const km = easeOut(seg(t, tPe - .1, tPe + .5)); if (km > 0) { txt('← 12 km →', 540, GY + 120, 64, C.accent, { weight: 800, scale: km }); }
  carSide(GX0 + 40 + 50 * Math.sin(t * 2), GY + 210, 110);
  band('5 CÉNTIMOS MÁS BARATA', 74, C.mint, 1 - seg(t, tPe - .2, tPe), 400, lerp(1.1, 1, easeOut(seg(t, 0, .35))));
  band('PERO A 12 KM', 100, C.accent, seg(t, tPe - .2, tPe) * (1 - seg(t, tCo - .35, tCo - .15)), 400);
  band('¿TE COMPENSA IR?', 108, C.line, seg(t, tCo - .3, tCo - .1), 400, .9 + .1 * easeBack(seg(t, tCo - .3, tCo + .2)));
  choice2(t, easeBack(seg(t, tCo, tCo + .35)), 'SÍ', 'NO', t >= tSi - .05 && t < tHa - .1 ? 0 : -1, 600);
  stamp('HAGAMOS LA CUENTA', 540, 1340, 54, C.accent, easeBack(seg(t, tHa - .1, tHa + .3)), 0);
}
function sceneAhorro(t, lt, s) {
  const T = w => wt('ahorro', w), tLi = T('litros'), tCi = T('cinco'), tAh = T('ahorras');
  headline('Lo que ahorras', '', s.start + .1, t);
  const f = easeIO(seg(t, s.start + .2, tLi + .3)); tank(300, 1200, 300, 640, f, 'rgba(126,240,200,.55)'); txt(Math.round(50 * f) + ' L', 300, 1250, 56, C.line, { weight: 800 });
  const c = easeBack(seg(t, tCi - .1, tCi + .3)); if (c > 0) txt('50 L × 0,05 €', 760, 700, 56, C.line, { weight: 800, scale: c });
  const a = easeIO(seg(t, tAh - .1, tAh + .9)); if (t >= tAh - .1) { txt('AHORRAS', 760, 860, 40, C.label, { weight: 800, ls: 3 }); txt('+' + eur(2.5 * a), 760, 960, 110, C.mint, { weight: 800 }); }
}
function sceneCoste(t, lt, s) {
  const T = w => wt('coste', w), tVo = T('volver'), tVe = T('veinticuatro'), tLi = T('litro'), tTr = T('tres');
  headline('Lo que gastas', 'en ir y volver', s.start + .1, t);
  line(GX0 - 80, 900, GX1 + 80, 900, C.soft, 6); pylon(GX0, 900, 220, 'AL LADO', '1,82', C.line); pylon(GX1, 900, 220, 'LEJOS', '1,77', C.mint);
  const go = easeIO(seg(t, s.start + .3, tVe + .4)), x = go < .5 ? lerp(GX0, GX1, go * 2) : lerp(GX1, GX0, (go - .5) * 2);
  ctx.save(); ctx.translate(x, 1010); ctx.scale(go < .5 ? 1 : -1, 1); carSide(0, 0, 90); ctx.restore();
  txt(Math.round(24 * go) + ' km', 540, 1110, 72, C.accent, { weight: 800 });
  const l = easeOut(seg(t, tLi - .2, tLi + .5)); if (l > 0) { tank(860, 1360, 120, 180, 1 - .3 * l, 'rgba(255,143,107,.55)'); txt('−1,5 L', 680, 1290, 52, C.red, { weight: 800, alpha: l }); }
  const c = easeIO(seg(t, tTr - .3, tTr + .6)); if (t >= tTr - .3) { txt('GASTAS', 300, 1230, 36, C.label, { weight: 800, ls: 3 }); txt(eur(-2.84 * c), 300, 1310, 84, C.red, { weight: 800 }); }
}
function sceneVeredicto(t, lt, s) {
  const T = w => wt('veredicto', w), tPi = T('pierdes'), tMe = T('media');
  headline('Resultado', '', s.start + .1, t);
  txt('+2,50 €', 300, 640, 84, C.mint, { weight: 800 }); txt('AHORRO', 300, 720, 30, C.label, { weight: 800, ls: 3 });
  txt('−2,84 €', 780, 640, 84, C.red, { weight: 800 }); txt('GASOLINA', 780, 720, 30, C.label, { weight: 800, ls: 3 });
  line(140, 800, 940, 800, C.soft, 4);
  const p = easeBack(seg(t, tPi - .1, tPi + .35)); bigNum('−0,34 €', 940, 170, C.red, p);
  if (p > 0) stamp('NO COMPENSA ✗', 540, 1140, 68, C.red, p);
  const m = easeBack(seg(t, tMe - .1, tMe + .35)); if (m > 0) { ctx.save(); ctx.translate(540, 1250); ctx.scale(m, m); clock(-170, 0, 60, Math.PI); ctx.restore(); txt('+30 MIN', 600, 1250, 70, C.red, { weight: 800, scale: m }); }
}
function sceneRegla(t, lt, s) {
  const T = (w, n = 0) => wt('regla', w, n), tCe = T('centimo'), tDo = T('dos'), tCi = T('cinco'), tDi = T('diez');
  headline('La regla fácil', '', s.start + .1, t);
  const a = easeBack(seg(t, tCe - .1, tCe + .3)); if (a > 0) { ctx.save(); ctx.translate(540, 760); ctx.scale(a, a); rrect(-420, -170, 840, 340, 40); ctx.fillStyle = 'rgba(5,32,42,.94)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    txt('1 CÉNTIMO', 540, 690, 90, C.line, { weight: 800, alpha: a }); txt('= 2 km', 540, 820, 110, C.accent, { weight: 800, alpha: seg(t, tDo - .1, tDo + .2) }); }
  const b = easeBack(seg(t, tCi - .1, tCi + .3)); if (b > 0) txt('5 cént. → máx. 10 km', 540, 1080, 66, C.mint, { weight: 800, scale: b });
  txt('(sin contar tu tiempo)', 540, 1170, 34, C.label, { weight: 600, alpha: seg(t, tDi, tDi + .4) });
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, ahorro: sceneAhorro, coste: sceneCoste, veredicto: sceneVeredicto, regla: sceneRegla, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'boom' }); P('hook', 'pero', 0, 'swipe'); P('hook', 'compensa', 0, 'boom'); P('hook', 'si', 0, 'pop'); P('hook', 'hagamos', 0, 'ding');
  for (let i = 0; i < 12; i++) E.push({ t: SC.ahorro.start + .2 + i * .14, type: 'tick' }); P('ahorro', 'ahorras', 0, 'ding');
  P('coste', 'veinticuatro', 0, 'swipe'); P('coste', 'litro', 0, 'buzz'); P('coste', 'tres', 0, 'buzz');
  P('veredicto', 'pierdes', 0, 'boom'); P('veredicto', 'media', 0, 'buzz');
  P('regla', 'centimo', 0, 'ding'); P('regla', 'cinco', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
