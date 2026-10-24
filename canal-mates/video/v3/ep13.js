// Episodio 13 · Lotería de Navidad: ¿cuánto te devuelven de media? (70 % en premios; 100.000 números)
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
function decimo(x, y, w, t, o = {}) { const h = w * .5; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.globalAlpha *= o.alpha ?? 1;
  rrect(-w / 2, -h / 2, w, h, w * .03); ctx.fillStyle = o.dim ? 'rgba(230,255,247,.15)' : '#fff6e6'; ctx.fill(); ctx.lineWidth = Math.max(2, w * .008); ctx.strokeStyle = o.col || '#c9a24a'; ctx.stroke();
  if (w > 200) { ctx.setLineDash([w * .015, w * .012]); ctx.beginPath(); ctx.moveTo(w * .22, -h / 2 + 8); ctx.lineTo(w * .22, h / 2 - 8); ctx.stroke(); ctx.setLineDash([]);
    txt('SORTEO DE NAVIDAD', -w * .14, -h * .3, w * .05, '#8a5a12', { weight: 800 }); const n = o.num ?? String(Math.floor(RND(Math.floor(t * 12)) * 100000)).padStart(5, '0');
    txt(n, -w * .14, h * .02, w * .13, '#7a1c12', { weight: 800, ls: 4 }); txt('20 €', w * .36, 0, w * .09, '#7a1c12', { weight: 800 }); txt('22 DIC', -w * .14, h * .32, w * .04, '#8a5a12', { weight: 700 }); }
  ctx.restore(); }
function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tCu = T('cuanto'), tNo = T('no');
  const roll = t < tCu ? undefined : '48271';
  decimo(540, 960, 760 * lerp(1.18, 1, easeOut(seg(t, 0, .6))), t, { num: roll, rot: -.04 + .01 * Math.sin(t * 2) });
  for (let i = 0; i < 18; i++) { const a = RND(i) * 6.28 + t * .6, r = 470 + RND(i + 9) * 120; txt('✦', 540 + Math.cos(a) * r, 960 + Math.sin(a) * r * .9, 30 + RND(i + 3) * 30, '#ffd166', { alpha: .4 + .4 * Math.sin(t * 4 + i) }); }
  band('1 DÉCIMO = 20 €', 104, '#ffd166', 1 - seg(t, tCu - .3, tCu - .1), 430, lerp(1.12, 1, easeOut(seg(t, 0, .35))));
  band('¿CUÁNTO TE DEVUELVEN?', 80, C.line, seg(t, tCu - .3, tCu - .1), 430, .9 + .1 * easeBack(seg(t, tCu - .3, tCu + .2)));
  stamp('NO ES LO QUE CREES', 540, 1330, 60, C.accent, easeBack(seg(t, tNo - .1, tNo + .3)));
}
function sceneMedia(t, lt, s) {
  const T = (w, n = 0) => wt('media', w, n), tSe = T('setenta'), tCa = T('catorce'), tPi = T('pierdes');
  headline('De cada 20 €', '', s.start + .1, t);
  const bx = 140, bw = 800, y = 760, sp = easeIO(seg(t, tSe - .2, tSe + .7));
  rrect(bx, y, bw, 160, 30); ctx.fillStyle = 'rgba(255,209,102,.25)'; ctx.fill(); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; ctx.stroke(); txt('20 €', 540, y + 84, 80, '#ffd166', { weight: 800, alpha: 1 - sp });
  if (sp > 0) { ctx.save(); rrect(bx, y, bw * .7 * sp, 160, 30); ctx.fillStyle = 'rgba(126,240,200,.6)'; ctx.fill(); rrect(bx + bw * .7 + 20 * sp, y, bw * .3 * sp - 20 * sp, 160, 30); ctx.fillStyle = 'rgba(255,93,115,.6)'; ctx.fill(); ctx.restore();
    txt('70 % PREMIOS', bx + bw * .35, y - 50, 40, C.mint, { weight: 800, alpha: sp }); txt('30 %', bx + bw * .85, y - 50, 40, C.red, { weight: 800, alpha: sp }); }
  const c = easeBack(seg(t, tCa - .1, tCa + .35)); if (c > 0) { txt('14 €', bx + bw * .35, y + 84, 90, C.ink, { weight: 800, scale: c }); txt('RECUPERAS DE MEDIA', 540, 1060, 50, C.mint, { weight: 800, scale: c, ls: 2 }); }
  const p = easeBack(seg(t, tPi - .1, tPi + .35)); if (p > 0) { txt('6 €', bx + bw * .85, y + 84, 70, C.ink, { weight: 800, scale: p }); stamp('PIERDES 6 € ANTES DEL SORTEO', 540, 1230, 44, C.red, p, 0); }
}
function sceneGordo(t, lt, s) {
  const T = (w, n = 0) => wt('gordo', w, n), tCi = T('cien', 0), tEs = T('estadio'), tCo = T('comprando'), tAn = T('anos');
  headline('¿Y el Gordo?', '', s.start + .1, t);
  hud('R', 'NÚMEROS', '100.000', { size: 72, alpha: seg(t, tCi - .1, tCi + .3) });
  const a = easeOut(seg(t, tEs - .6, tEs + .4)); if (a > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(540, 900, 430, 300, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(126,240,200,.08)'; ctx.fill(); ctx.strokeStyle = C.soft; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = 'rgba(126,240,200,.12)'; ctx.fillRect(400, 820, 280, 160); for (let i = 0; i < 2600; i++) { const ang = RND(i) * 6.283, r = .55 + RND(i + 50) * .43; const x = 540 + Math.cos(ang) * 430 * r, y = 900 + Math.sin(ang) * 300 * r; ctx.fillStyle = 'rgba(230,255,247,.55)'; ctx.fillRect(x, y, 3, 3); }
    const ph = (t * 1.5) % 1; circle(812, 760, 8, { fill: '#ffd166', stroke: null }); circle(812, 760, 14 + ph * 30, { stroke: `rgba(255,209,102,${1 - ph})`, w: 3 }); ctx.restore(); txt('TÚ', 812, 715, 34, '#ffd166', { weight: 800, alpha: a }); txt('1 ENTRE 100.000', 540, 1260, 60, C.line, { weight: 800, alpha: a }); }
  const y = Math.floor(100000 * easeIO(seg(t, tCo, tAn + .3))); if (t >= tCo) stamp(fmt(y) + ' AÑOS', 540, 470, 64, C.accent, 1, 0);
}
function sceneNada(t, lt, s) {
  const T = w => wt('nada', w), tOc = T('ochenta'), tNa = T('nada'), tRe = T('reintegro');
  headline('De cada 100 décimos', '', s.start + .1, t);
  const lit = easeIO(seg(t, tOc - .2, tNa + .2));
  for (let i = 0; i < 100; i++) { const x = 150 + (i % 10) * 87, y = 640 + Math.floor(i / 10) * 64, kind = i < 85 ? 0 : i < 95 ? 1 : 2, on = (i / 100) < lit;
    decimo(x, y, 76, t, { dim: on && kind === 0, col: on ? (kind === 0 ? 'rgba(230,255,247,.25)' : kind === 1 ? C.mint : '#ffd166') : '#c9a24a' }); }
  const k = easeBack(seg(t, tNa - .1, tNa + .3)); if (k > 0) stamp('85 NO GANAN NADA', 540, 500, 58, C.red, k, 0);
  if (t >= tRe - .1) { txt('10 reintegro', 330, 1270, 32, C.mint, { weight: 800, alpha: seg(t, tRe - .1, tRe + .2) }); txt('5 premio', 760, 1270, 32, '#ffd166', { weight: 800, alpha: seg(t, tRe - .1, tRe + .2) }); }
}
function sceneHacienda(t, lt, s) {
  const T = (w, n = 0) => wt('hacienda', w, n), tCu = T('cuatrocientos'), tHa = T('hacienda'), tCo = T('cobras');
  headline('Si te toca el Gordo…', '', s.start + .1, t);
  const bx = 140, bw = 800, y = 760, cut = easeIO(seg(t, tHa, tHa + .9));
  const a = easeBack(seg(t, tCu - .2, tCu + .2)); if (a > 0) txt('400.000 €', 540, 640, 110, '#ffd166', { weight: 800, scale: a });
  rrect(bx, y, bw, 160, 30); ctx.fillStyle = 'rgba(255,209,102,.3)'; ctx.fill(); ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 5; ctx.stroke();
  if (cut > 0) { const w = bw * .18; ctx.save(); ctx.translate(bx + bw - w, y + cut * 170); rrect(0, 0, w, 160, 30); ctx.fillStyle = 'rgba(255,93,115,.65)'; ctx.fill(); ctx.restore(); txt('−72.000 €', bx + bw - w / 2 - 30, y + 160 + cut * 170 + 50, 46, C.red, { weight: 800, alpha: cut }); txt('HACIENDA', bx + bw - w / 2 - 30, y + 160 + cut * 170 + 105, 32, C.red, { weight: 800, alpha: cut }); }
  const c = easeBack(seg(t, tCo - .1, tCo + .35)); if (c > 0) stamp('COBRAS 328.000 €', 540, 1240, 60, C.mint, c, 0);
}
function sceneCierre(t, lt, s) {
  const T = w => wt('cierre', w), tIl = T('ilusion'), tVa = T('vale');
  decimo(540, 900, 660, t, { num: '48271', rot: -.03 });
  for (let i = 0; i < 26; i++) { const a = RND(i) * 6.28 + t * .5, r = 400 + RND(i + 9) * 160; txt('✦', 540 + Math.cos(a) * r, 900 + Math.sin(a) * r * .9, 26 + RND(i + 3) * 36, '#ffd166', { alpha: .3 + .5 * Math.sin(t * 4 + i) * seg(t, tIl - .2, tIl + .3) }); }
  band('¿POR QUÉ LA COMPRAMOS?', 72, C.line, 1 - seg(t, tIl - .3, tIl - .1), 430);
  band('COMPRAMOS ILUSIÓN', 86, '#ffd166', seg(t, tIl - .3, tIl - .1), 430, .9 + .1 * easeBack(seg(t, tIl - .3, tIl + .2)));
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, media: sceneMedia, gordo: sceneGordo, nada: sceneNada, hacienda: sceneHacienda, cierre: sceneCierre, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 22; i++) E.push({ t: .05 + i * (wt('hook', 'cuanto') / 22), type: 'tick' }); P('hook', 'cuanto', 0, 'boom'); P('hook', 'no', 0, 'ding');
  P('media', 'setenta', 0, 'swipe'); P('media', 'catorce', 0, 'ding'); P('media', 'pierdes', 0, 'boom');
  P('gordo', 'cien'); P('gordo', 'estadio', 0, 'swipe'); P('gordo', 'anos', 0, 'boom');
  P('nada', 'nada', 0, 'boom'); P('hacienda', 'cuatrocientos', 0, 'ding'); P('hacienda', 'hacienda', 0, 'buzz'); P('hacienda', 'cobras', 0, 'ding');
  P('cierre', 'ilusion', 0, 'ding'); P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
