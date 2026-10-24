// Episodio 4 · Un folio doblado 42 veces llega a la Luna (crecimiento exponencial)
const GROUND = 1250, STW = 170, SX = 540;
const REFS = [['LIBRETA', 13], ['MANO', 190], ['PERSONA', 1700], ['CASA', 1e4], ['TORRE EIFFEL', 3.3e5], ['EVEREST', 8.849e6], ['ATMÓSFERA', 1e8], ['ESTACIÓN ESPACIAL', 4.08e8], ['LUNA', 3.844e11],
              ['SOL', 1.496e14], ['VÍA LÁCTEA', 9.46e23], ['UNIVERSO OBSERVABLE', 8.8e29]];
const hMM = n => 0.1 * Math.pow(2, n);
function fmtLen(mm) {
  if (mm < 10) return mm.toFixed(1).replace('.', ',') + ' mm';
  if (mm < 1000) return (mm / 10).toFixed(mm < 100 ? 1 : 0).replace('.', ',') + ' cm';
  if (mm < 1e6) return (mm / 1000).toFixed(mm < 1e4 ? 1 : 0).replace('.', ',') + ' m';
  const km = mm / 1e6; if (km < 1e9) return fmt(km) + ' km';
  const e = Math.floor(Math.log10(km)); return (km / Math.pow(10, e)).toFixed(1).replace('.', ',') + '·10^' + e + ' km';
}
const scaleFor = n => Math.min(260, 880 / hMM(n));                 // px por mm: la columna ocupa como mucho 880 px
function drawFold(n, o = {}) {
  const s = scaleFor(n), H = hMM(n) * s, top = GROUND - H, a = o.alpha ?? 1;
  ctx.save(); ctx.globalAlpha *= a;
  line(100, GROUND, 980, GROUND, C.soft, 3);
  // referencias de escala
  if (!o.ghost) for (const [lab, mm] of REFS) { const y = GROUND - mm * s; if (y < 360 || y > GROUND - 18) continue; const fa = clamp((GROUND - y - 18) / 60) * clamp((y - 360) / 80);
    ctx.save(); ctx.globalAlpha *= fa; ctx.setLineDash([10, 9]); line(110, y, SX - STW / 2 - 14, y, lab === 'LUNA' ? C.accent : C.soft, 3); ctx.setLineDash([]);
    txt(lab, 110, y - 26, 32, lab === 'LUNA' ? C.accent : C.line, { align: 'left', weight: 800, ls: 2 }); ctx.restore(); }
  const ym = GROUND - REFS[8][1] * s; if (!o.ghost && ym > 300 && ym < GROUND - 40) { const r = 64;
    circle(SX + 260, ym, r, { fill: 'rgba(230,255,247,.12)', stroke: C.line, w: 3 }); circle(SX + 260 - r * .3, ym - r * .2, r * .18, { stroke: C.faint, w: 2 }); circle(SX + 260 + r * .35, ym + r * .3, r * .12, { stroke: C.faint, w: 2 }); }
  // la columna de papel
  const g = ctx.createLinearGradient(SX - STW / 2, 0, SX + STW / 2, 0); g.addColorStop(0, '#cfe9e2'); g.addColorStop(.5, '#ffffff'); g.addColorStop(1, '#bcd9d2');
  ctx.fillStyle = g; ctx.fillRect(SX - STW / 2, top, STW, H); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(SX - STW / 2, top, STW, H);
  const layerPx = 0.1 * s; if (layerPx >= 3.5) { ctx.strokeStyle = 'rgba(6,35,42,.35)'; ctx.lineWidth = 1; for (let k = 1; k < Math.min(512, Math.pow(2, n)); k++) { const y = GROUND - k * layerPx; if (y < top) break; ctx.beginPath(); ctx.moveTo(SX - STW / 2, y); ctx.lineTo(SX + STW / 2, y); ctx.stroke(); } }
  ctx.restore();
  return { top, s };
}
function foldHud(n, a = 1, top = null) { hud('R', 'DOBLECES', String(Math.floor(n + 1e-6)), { color: C.accent, size: 96, alpha: a });
  if (top !== null) { const y = Math.max(400, top); ctx.save(); ctx.globalAlpha *= a; rrect(SX + STW / 2 + 16, y - 30, 300, 60, 30); ctx.fillStyle = 'rgba(5,32,42,.9)'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); txt(fmtLen(hMM(Math.floor(n + 1e-6))), SX + STW / 2 + 166, y + 2, 34, C.line, { weight: 800 }); ctx.restore(); } }
function blurFold(nAt, t, speed) {                            // desenfoque de movimiento proporcional a la velocidad de zoom
  const sh = Math.min(.12, speed * .01); if (sh > .004) for (let k = 0; k < 6; k++) drawFold(nAt(t - sh * k / 5), { alpha: .2, ghost: true });
  return drawFold(nAt(t), { alpha: sh > .004 ? .65 : 1 });
}

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tLu = T('luna'), tEx = T('exageracion');
  headline('Este folio', 'llega a la Luna', .05, t, { cps: 34, size: 60 });
  const z0 = .55, nAt = tt => 42 * easeIO(seg(tt, z0, tLu + .05));
  if (t < z0) {                                                       // fotograma 0: un folio de verdad, que se pliega
    const sq = easeIO(seg(t, .2, z0)); ctx.save(); ctx.translate(SX, GROUND); ctx.scale(1 - sq * .55, 1 - sq * .97); ctx.translate(-SX, -GROUND);
    rrect(SX - 210, GROUND - 594, 420, 594, 8); ctx.fillStyle = '#f4fffb'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
    for (let i = 1; i < 12; i++) line(SX - 170, GROUND - 594 + i * 46, SX + 170, GROUND - 594 + i * 46, 'rgba(6,35,42,.18)', 2);
    txt('A4 · 0,1 mm', SX, GROUND - 297, 40, C.ink, { weight: 800 }); ctx.restore(); foldHud(0);
  } else { const speed = 42 / Math.max(.5, tLu - z0) * (seg(t, z0, tLu) < 1 ? 1 : 0); const f = blurFold(nAt, t, speed * Math.sin(Math.PI * seg(t, z0, tLu))); foldHud(nAt(t), 1, f.top); }
  const st = easeBack(seg(t, tEx - .2, tEx + .25)); if (st > 0) { ctx.save(); ctx.translate(540, 760); ctx.rotate(-.08); ctx.scale(st, st); rrect(-330, -70, 660, 140, 24); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 5; ctx.stroke(); txt('42 DOBLECES = LUNA', 0, 4, 52, C.accent, { weight: 800, ls: 2 }); ctx.restore(); }
}
function sceneDuplica(t, lt, s) {
  const T = w => wt('duplica', w), tDu = T('duplica'), tDe = T('decima'), tSi = T('siete'), tLi = T('libreta'), tIm = T('imposible');
  headline('Cada doblez', 'duplica', s.start + .1, t);
  const kf = clamp((t - tDu + .3) / (tLi - tDu + .3)) * 7, k = Math.floor(kf), fr = kf - k;   // 0..7 dobleces
  const layer = 4.4, base = 1080, w = 360;
  const n = Math.pow(2, k), grow = k < 7 ? easeOut(clamp(fr * 2.2)) : 1;
  for (let i = 0; i < n * (1 + (k < 7 ? grow : 0)); i++) { const y = base - (i + 1) * layer; const isNew = i >= n && k < 7;
    ctx.fillStyle = isNew ? 'rgba(255,143,107,.85)' : (i % 2 ? '#e6fff7' : '#cfe9e2'); ctx.fillRect(540 - w / 2 + (isNew ? (1 - grow) * 300 : 0), y, w, layer - .8); }
  const H = Math.pow(2, Math.min(7, kf)) * layer;
  hud('R', 'CAPAS', fmt(Math.pow(2, Math.min(7, k))), { color: C.accent, size: 84 }); txt(fmtLen(hMM(Math.min(7, k))), 540 - w / 2 - 30, base - H, 40, C.line, { align: 'right', weight: 800 });
  if (t >= tDu && k < 7) txt('×2', 540 + w / 2 + 90, base - H - 10, 64, C.accent, { weight: 800, alpha: 1 - fr });
  const d = easeOut(seg(t, tDe - .1, tDe + .3)) * (1 - seg(t, tSi - .2, tSi)); if (d > 0) { line(540 + w / 2 + 20, base - layer, 540 + w / 2 + 70, base - 60, C.line, 3); txt('0,1 mm', 540 + w / 2 + 80, base - 80, 40, C.line, { align: 'left', weight: 800, alpha: d }); }
  const lb = easeBack(seg(t, tLi - .1, tLi + .3)); if (lb > 0) txt('1,3 cm ≈ UNA LIBRETA', 540, 1200, 50, C.accent, { weight: 800, scale: lb, ls: 2 });
  const im = easeBack(seg(t, tIm - .1, tIm + .3)); if (im > 0) txt('CASI IMPOSIBLE A MANO', 540, 1290, 44, C.red, { weight: 800, scale: im, ls: 2 });
}
function sceneCrece(t, lt, s) {
  const T = (w, n = 0) => wt('crece', w, n), t23 = T('veintitres'), t30 = T('treinta'), t42 = T('cuarenta'), t400 = T('cuatrocientos'), tLu = T('luna');
  const nAt = tt => tt < t23 ? lerp(7, 23, easeIO(seg(tt, s.start + .5, t23 + .3))) : tt < t30 ? lerp(23, 30, easeIO(seg(tt, t23 + .3, t30 + .3))) : lerp(30, 42, easeIO(seg(tt, t30 + .3, t42 + .6)));
  const sp = Math.abs(nAt(t + .05) - nAt(t)) * 20, f = blurFold(nAt, t, sp); foldHud(nAt(t), 1, f.top);
  const lab = (tt, s1, col) => { const a = easeBack(seg(t, tt - .05, tt + .3)); if (a > 0) txt(s1, 540, 1318, 50, col, { weight: 800, scale: a, ls: 2 }); };
  if (t < t30 - .1) lab(t23, '≈ 1 KILÓMETRO', C.line); else if (t < t42 - .1) lab(t30, 'FUERA DE LA ATMÓSFERA', C.mint); else lab(t400, '439.805 km  >  LUNA', C.accent);
}
function sceneUniverso(t, lt, s) {
  const T = w => wt('universo', w), tCi = T('ciento'), tUn = T('universo'), tEx = T('exponencial'), tIm = T('imparable');
  const nAt = tt => lerp(42, 103, easeIO(seg(tt, tCi - .1, tUn + .6)));
  const g = 1 - seg(t, tEx - .2, tEx + .2);
  if (g > 0) { ctx.save(); ctx.globalAlpha *= g; const sp = Math.abs(nAt(t + .05) - nAt(t)) * 20, f = blurFold(nAt, t, sp); foldHud(nAt(t), 1, f.top); ctx.restore();
    const a = easeBack(seg(t, tUn - .1, tUn + .3)); if (a > 0) txt('MÁS QUE EL UNIVERSO', 540, 1318, 50, C.accent, { weight: 800, scale: a, ls: 2 }); }
  const e = easeOut(seg(t, tEx - .1, tEx + .4)); if (e <= 0) return;
  ctx.save(); ctx.globalAlpha *= e; headline('Crecimiento', 'exponencial', tEx - .1, t, { cps: 40 });
  const x0 = 140, x1 = 940, y0 = 1180, y1 = 480; line(x0, y0, x1, y0, C.soft, 3); line(x0, y0, x0, y1, C.soft, 3);
  txt('DOBLECES', x1, y0 + 40, 24, C.label, { align: 'right', weight: 700, ls: 2 }); txt('GROSOR', x0, y1 - 26, 24, C.label, { align: 'left', weight: 700, ls: 2 });
  const prog = easeIO(seg(t, tEx, tIm + .3)); ctx.beginPath(); for (let i = 0; i <= 200 * prog; i++) { const f = i / 200, x = lerp(x0, x1, f), y = y0 - (Math.pow(2, f * 12) - 1) / (4095) * (y0 - y1); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.lineWidth = 7; ctx.strokeStyle = C.accent; ctx.stroke();
  txt('casi nada', x0 + 150, y0 - 40, 30, C.label, { weight: 700, alpha: seg(t, tEx + .6, tEx + 1) }); const im = easeBack(seg(t, tIm - .1, tIm + .3)); if (im > 0) txt('¡IMPARABLE!', x1 - 170, y1 + 40, 48, C.accent, { weight: 800, scale: im });
  ctx.restore();
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, duplica: sceneDuplica, crece: sceneCrece, universo: sceneUniverso, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  E.push({ t: .05, type: 'pop' }, { t: .55, type: 'zoom' }); P('hook', 'luna', 0, 'boom'); P('hook', 'exageracion', 0, 'ding');
  { const a = wt('duplica', 'duplica') - .3, b = wt('duplica', 'libreta'); for (let k = 1; k <= 7; k++) E.push({ t: a + (b - a) * k / 7, type: 'pop' }); } P('duplica', 'libreta', 0, 'ding'); P('duplica', 'imposible', 0, 'buzz');
  P('crece', 'veintitres', 0, 'swipe'); P('crece', 'treinta', 0, 'swipe'); P('crece', 'cuarenta', 0, 'swipe'); P('crece', 'luna', 0, 'boom');
  P('universo', 'ciento', 0, 'swipe'); P('universo', 'universo', 0, 'boom'); P('universo', 'exponencial', 0, 'ding'); P('universo', 'imparable', 0, 'ding');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
