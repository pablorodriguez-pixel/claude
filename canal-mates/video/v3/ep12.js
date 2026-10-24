// Episodio 12 · ¿3x2 o la segunda al 50 %? (3x2 = −33 %, 2ª al 50 % = −25 %, y la trampa del tercero)
function product(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= o.alpha ?? 1;
  rrect(-s * .35, -s, s * .7, s, s * .08); ctx.fillStyle = o.fill || 'rgba(230,255,247,.12)'; ctx.fill(); ctx.strokeStyle = o.col || C.line; ctx.lineWidth = 5; ctx.stroke();
  rrect(-s * .25, -s * .7, s * .5, s * .3, s * .05); ctx.fillStyle = 'rgba(255,143,107,.4)'; ctx.fill(); txt('CEREAL', 0, -s * .55, s * .1, C.line, { weight: 800 });
  if (o.price) { rrect(-s * .3, -s * .25, s * .6, s * .2, s * .04); ctx.fillStyle = '#f4fffb'; ctx.fill(); txt(o.price, 0, -s * .15, s * .13, o.priceCol || C.ink, { weight: 800 }); }
  if (o.cross) { ctx.strokeStyle = C.red; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * .4, -s * .95); ctx.lineTo(s * .4, -s * .05); ctx.stroke(); }
  ctx.restore(); }
function tag(x, y, text, col, k = 1, rot = 0) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.beginPath(); ctx.moveTo(-190, -90); ctx.lineTo(150, -90); ctx.lineTo(210, 0); ctx.lineTo(150, 90); ctx.lineTo(-190, 90); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); circle(150, 0, 14, { fill: '#071a1f', stroke: null }); ctx.restore(); txt(text, x - 20, y + 6, 72, C.ink, { weight: 800, scale: k }); }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tSe = T('segunda'), tCu = T('cual'), tMa = T('mal');
  for (let i = 0; i < 3; i++) product(170 + i * 115, 1180, 200, {}); for (let i = 0; i < 2; i++) product(700 + i * 150, 1180, 200, {});
  tag(300, 880, '3x2', C.mint, easeBack(seg(t, 0, .35)), -.06); tag(780, 880, '2ª −50%', C.accent, easeBack(seg(t, tSe - .3, tSe + .1)), .06);
  band('3x2', 140, C.mint, 1 - seg(t, tSe - .3, tSe - .1), 430, lerp(1.15, 1, easeOut(seg(t, 0, .35))));
  band('O LA 2ª A MITAD DE PRECIO', 64, C.accent, seg(t, tSe - .3, tSe - .1) * (1 - seg(t, tCu - .3, tCu - .1)), 430);
  band('¿CUÁL ES MEJOR?', 108, C.line, seg(t, tCu - .3, tCu - .1), 430, .9 + .1 * easeBack(seg(t, tCu - .3, tCu + .2)));
  stamp('LA MAYORÍA ELIGE MAL', 540, 640, 54, C.red, easeBack(seg(t, tMa - .4, tMa)));
}
function sceneTres(t, lt, s) {
  const T = (w, n = 0) => wt('tres', w, n), tCu = T('cuesta'), tSe = T('seis'), tDo = T('dos', 1), tTr = T('treinta');
  headline('Oferta 3x2', '', s.start + .1, t);
  for (let i = 0; i < 3; i++) { const free = i === 2 && t >= tSe - .1; product(250 + i * 290, 960, 300, { price: free ? 'GRATIS' : '3 €', priceCol: free ? '#1a8c66' : C.ink, alpha: easeOut(seg(t, s.start + i * .15, s.start + .3 + i * .15)) }); }
  const p = easeBack(seg(t, tSe - .1, tSe + .3)); if (p > 0) txt('PAGAS 6 €', 540, 1120, 72, C.line, { weight: 800, scale: p });
  const u = easeBack(seg(t, tDo - .1, tDo + .3)); if (u > 0) txt('= 2 € cada uno', 540, 1210, 60, C.mint, { weight: 800, scale: u });
  stamp('−33 %', 540, 470, 100, C.mint, easeBack(seg(t, tTr - .1, tTr + .3)), 0);
}
function sceneSegunda(t, lt, s) {
  const T = (w, n = 0) => wt('segunda', w, n), tCu = T('cuatro'), tVe = T('veinticinco', 0), tSo = T('solo');
  headline('2ª a mitad de precio', '', s.start + .1, t);
  product(370, 960, 300, { price: '3 €' }); product(710, 960, 300, { price: '1,50 €', priceCol: '#c2410c', alpha: easeOut(seg(t, s.start + .2, s.start + .5)) });
  const p = easeBack(seg(t, tCu - .1, tCu + .3)); if (p > 0) txt('PAGAS 4,50 €', 540, 1120, 72, C.line, { weight: 800, scale: p });
  const u = easeBack(seg(t, tVe - .1, tVe + .3)); if (u > 0) txt('= 2,25 € cada uno', 540, 1210, 60, C.accent, { weight: 800, scale: u });
  stamp('−25 %', 540, 470, 100, C.accent, easeBack(seg(t, tSo - .1, tSo + .3)), 0);
}
function sceneTrampa(t, lt, s) {
  const T = (w, n = 0) => wt('trampa', w, n), tGa = T('gana'), tTr = T('trampa'), tNe = T('necesitabas'), tSe = T('seis'), tCu = T('cuatro'), tGs = T('gastas');
  const g = easeBack(seg(t, tGa - .1, tGa + .3)) * (1 - seg(t, tTr - .3, tTr - .1)); if (g > 0) { tag(540, 800, '3x2', C.mint, g); txt('GANA', 540, 1000, 90, C.mint, { weight: 800, scale: g }); }
  band('¡CUIDADO CON LA TRAMPA!', 72, C.red, seg(t, tTr - .2, tTr), 430, .9 + .1 * easeBack(seg(t, tTr - .2, tTr + .2)));
  if (t >= tNe - .2) { txt('SOLO NECESITABAS 2', 540, 600, 46, C.line, { weight: 800, alpha: seg(t, tNe - .2, tNe + .2) });
    for (let i = 0; i < 3; i++) product(220 + i * 170, 960, 220, { alpha: i === 2 ? .45 : 1, cross: i === 2 && t >= tNe + .3 });
    txt('3x2', 390, 1040, 40, C.mint, { weight: 800 }); txt('6 €', 390, 1110, 72, C.red, { weight: 800, alpha: seg(t, tSe - .1, tSe + .2) });
    for (let i = 0; i < 2; i++) product(760 + i * 170, 960, 220, {}); txt('2ª −50%', 845, 1040, 40, C.accent, { weight: 800 }); txt('4,50 €', 845, 1110, 72, C.mint, { weight: 800, alpha: seg(t, tCu - .1, tCu + .2) }); }
  stamp('PAGAS +1,50 €', 540, 1270, 62, C.red, easeBack(seg(t, tGs - .1, tGs + .3)), 0);
}
function sceneRegla(t, lt, s) {
  const T = w => wt('regla', w), tTe = T('tercero'), tSi = T('si'), tEu = T('euro');
  headline('La regla', '', s.start + .1, t);
  const a = easeBack(seg(t, s.start + .5, s.start + .9)); if (a > 0) { ctx.save(); ctx.translate(540, 780); ctx.scale(a, a); rrect(-430, -190, 860, 380, 40); ctx.fillStyle = 'rgba(5,32,42,.94)'; ctx.fill(); ctx.strokeStyle = C.mint; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    txt('3x2 SOLO SI', 540, 700, 80, C.line, { weight: 800, alpha: a }); txt('USAS EL 3º', 540, 830, 100, C.mint, { weight: 800, alpha: seg(t, tTe - .3, tTe) }); }
  const b = easeBack(seg(t, tSi - .1, tSi + .3)); if (b > 0) txt('Si no: el súper gana', 540, 1100, 56, C.line, { weight: 800, scale: b });
  stamp('1,50 € DE TU BOLSILLO', 540, 1220, 52, C.red, easeBack(seg(t, tEu - .2, tEu + .2)), 0);
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, tres: sceneTres, segunda: sceneSegunda, trampa: sceneTrampa, regla: sceneRegla, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'boom' }); P('hook', 'segunda', 0, 'swipe'); P('hook', 'cual', 0, 'boom'); P('hook', 'mal', 0, 'buzz');
  P('tres', 'seis', 0, 'ding'); P('tres', 'dos', 1); P('tres', 'treinta', 0, 'boom');
  P('segunda', 'cuatro', 0, 'ding'); P('segunda', 'veinticinco'); P('segunda', 'solo', 0, 'boom');
  P('trampa', 'gana', 0, 'ding'); P('trampa', 'trampa', 0, 'boom'); P('trampa', 'necesitabas', 0, 'swipe'); P('trampa', 'gastas', 0, 'buzz');
  P('regla', 'tercero', 0, 'ding'); P('regla', 'euro', 0, 'buzz');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
