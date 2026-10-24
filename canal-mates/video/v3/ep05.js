// Episodio 5 · Cada vez que barajas creas un orden único en la historia (52!)
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'], SUITS = ['♠', '♥', '♦', '♣'];
const RND = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const ORDER = (() => { const a = [...Array(52).keys()]; for (let i = 51; i > 0; i--) { const j = Math.floor(RND(i + 7) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
const F52 = '80658175170943878571660636856403766975289505440883277824000000000000';
function card(x, y, w, h, idx, rot = 0, o = {}) {
  ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); ctx.rotate(rot);
  rrect(-w / 2, -h / 2, w, h, w * .1); ctx.fillStyle = o.back ? '#0b4650' : '#f4fffb'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = o.hl ? C.accent : 'rgba(6,35,42,.6)'; ctx.stroke();
  if (o.back) { ctx.strokeStyle = 'rgba(230,255,247,.35)'; rrect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12, w * .08); ctx.stroke(); txt('01', 0, 2, w * .3, C.accent, { weight: 800 }); }
  else { const r = RANKS[idx % 13], s = SUITS[Math.floor(idx / 13)], col = (s === '♥' || s === '♦') ? '#e2553f' : C.ink;
    ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.font = `800 ${w * .26}px ${MONO}`; ctx.fillText(r, -w / 2 + w * .1, -h / 2 + w * .08);
    ctx.font = `${w * .5}px 'DejaVu Sans'`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, h * .08); }
  ctx.restore();
}
function fan(t, cx, cy, R, a0, a1, w, h, o = {}) { for (let i = 0; i < 52; i++) { const a = lerp(a0, a1, i / 51), k = o.appear ? easeOut(seg(t, o.appear + i * .012, o.appear + .25 + i * .012)) : 1; if (k <= 0) continue;
  const rr = R * k; card(cx + Math.sin(a) * rr, cy - Math.cos(a) * rr, w, h, ORDER[i], a, { alpha: k }); } }
function stars(t, t0, a = 1) { const z = 1 + seg(t, t0, t0 + 4) * 1.5; for (let i = 0; i < 160; i++) { const ang = RND(i) * 6.283, d = (RND(i + 99) * 700) * z, x = 540 + Math.cos(ang) * d, y = 800 + Math.sin(ang) * d * 1.3;
  if (x < 0 || x > W || y < 380 || y > 1350) continue; circle(x, y, 1 + RND(i + 5) * 2.5 * z, { fill: `rgba(230,255,247,${(.3 + RND(i + 3) * .6) * a})`, stroke: null }); } }

function sceneHook(t, lt, s) {
  const T = w => wt('hook', w), tNa = T('nadie'), tHi = T('historia'), tUn = T('universo');
  if (t > tHi - .3) stars(t, tHi - .3, seg(t, tHi - .3, tHi + .3));
  headline('Este orden', 'nunca ha existido', .05, t, { cps: 34, size: 60 });
  // fotograma 0: barajando (dos mitades que se intercalan con desenfoque) y luego el abanico
  const sh = clamp(1 - seg(t, 1.1, 1.6));
  if (sh > 0) { for (let i = 0; i < 26; i++) { const ph = (t * 3.2 + i * .04) % 1, side = i % 2 ? 1 : -1, x = 540 + side * lerp(170, 20, easeIO(ph)), y = 880 - i * 4 + Math.sin(ph * Math.PI) * -60;
      card(x, y, 150, 220, ORDER[i], side * lerp(.35, 0, ph), { back: i % 3 === 0, alpha: sh }); } }
  const f = easeOut(seg(t, 1.1, 1.7)); if (f > 0) { ctx.save(); ctx.globalAlpha *= f; fan(t, 540, 1330, 620, -1.0, 1.0, 104, 152, { appear: 1.1 }); ctx.restore(); }
  const st = easeBack(seg(t, tNa - .1, tNa + .3)); if (st > 0) { ctx.save(); ctx.translate(540, 960); ctx.rotate(-.14); ctx.scale(st, st); rrect(-230, -78, 460, 156, 26); ctx.fillStyle = 'rgba(5,32,42,.9)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 7; ctx.stroke(); txt('ÚNICO', 0, 6, 104, C.accent, { weight: 800, ls: 8 }); ctx.restore(); }
  const u = easeOut(seg(t, tUn - .1, tUn + .4)); if (u > 0) txt('EN 13.800 MILLONES DE AÑOS', 540, 1120, 36, C.line, { weight: 800, ls: 3, alpha: u });
}
function sceneCuenta(t, lt, s) {
  const T = (w, n = 0) => wt('cuenta', w, n), t1 = T('cincuenta', 0), t2 = T('cincuenta', 1), t3 = T('cincuenta', 2), tUl = T('ultima');
  headline('Haz la cuenta', '', s.start + .1, t);
  const cw = 70, ch = 100, gx = 540 - 13 * 76 / 2 + 38, gy = 520;
  const fillT = i => i === 0 ? t1 : i === 1 ? t2 : i === 2 ? t3 : lerp(t3 + .6, tUl + .2, (i - 3) / 48);
  let filled = 0;
  for (let i = 0; i < 52; i++) { const x = gx + (i % 13) * 76, y = gy + Math.floor(i / 13) * 120, tf = fillT(i), a = easeBack(seg(t, tf - .05, tf + .25));
    rrect(x - cw / 2, y - ch / 2, cw, ch, 8); ctx.strokeStyle = C.faint; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.stroke(); ctx.setLineDash([]);
    if (a > 0) { card(x, y, cw * a, ch * a, ORDER[i], 0, { hl: i < 3 }); filled = i + 1; }
    if (i < 3 && a > 0) txt(String(52 - i), x, y + 72, 30, C.accent, { weight: 800, alpha: a }); }
  const chain = filled === 0 ? '' : filled === 1 ? '52' : filled === 2 ? '52 × 51' : filled < 52 ? '52 × 51 × 50 × …' : '52 × 51 × 50 × … × 2 × 1';
  txt(chain, 540, 1120, 50, C.accent, { weight: 800 });
  hud('R', 'OPCIONES', String(Math.max(0, 52 - filled + 1) > 52 ? 52 : (filled ? 52 - filled + 1 : 52)), { size: 64, alpha: seg(t, t1 - .2, t1 + .2) * (filled < 52 ? 1 : 0) });
}
function sceneNumero(t, lt, s) {
  const T = (w, n = 0) => wt('numero', w, n), tMu = T('multiplicalo'), tCi = T('cifras'), tO2 = T('ocho', 1), tCe = T('ceros');
  hud('L', 'CIFRAS', String(Math.min(68, Math.floor(68 * seg(t, tMu, tCi + .2)))), { color: C.accent, size: 84 });
  const n = Math.floor(68 * easeIO(seg(t, tMu, tCi + .2)));
  for (let r = 0; r < 4; r++) { const ln = F52.slice(r * 17, r * 17 + 17).slice(0, Math.max(0, n - r * 17)); if (!ln) continue;
    for (let c = 0; c < ln.length; c++) { const first = r === 0 && c === 0 && t >= tO2 - .05, zero = t >= tCe - .1 && (r * 17 + c) >= 1; txt(ln[c], 540 - 8 * 37 + c * 37, 560 + r * 90, 62, first ? C.accent : zero ? C.line : C.line, { weight: 800, mono: true, alpha: first ? 1 : (t >= tO2 - .05 ? .55 : 1) }); } }
  const e = easeBack(seg(t, tCe - .1, tCe + .4)); if (e > 0) { txt('≈ 8 · 10', 510, 1060, 96, C.accent, { weight: 800, scale: e }); txt('67', 760, 1015, 56, C.accent, { weight: 800, scale: e }); }
}
function sceneBigbang(t, lt, s) {
  const T = (w, n = 0) => wt('bigbang', w, n), tPe = T('persona'), tSe = T('segundo'), tBb = T('big'), tPr = T('probable'), tRe = T('repetido');
  headline('Para que te', 'hagas una idea', s.start + .1, t);
  const a = easeOut(seg(t, tPe - .1, tPe + .4)); if (a > 0) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 60; i++) person(120 + (i % 15) * 60, 540 + Math.floor(i / 15) * 70, 48, C.line, null, 2); ctx.restore(); txt('117.000 MILLONES DE PERSONAS', 540, 840, 34, C.line, { weight: 800, ls: 2, alpha: a }); }
  const b = easeOut(seg(t, tBb - .1, tBb + .4)); if (b > 0) { ctx.save(); ctx.globalAlpha *= b; line(120, 920, 960, 920, C.soft, 4); circle(120, 920, 14, { fill: C.accent, stroke: null }); circle(960, 920, 10, { fill: C.line, stroke: null });
    txt('BIG BANG', 120, 965, 26, C.accent, { align: 'left', weight: 800, ls: 2 }); txt('HOY', 960, 965, 26, C.line, { align: 'right', weight: 800, ls: 2 }); txt('1 BARAJA POR SEGUNDO', 540, 885, 26, C.label, { weight: 700, ls: 2 }); ctx.restore(); }
  const z = (y, lab, digits, col, t0) => { const k = easeOut(seg(t, t0, t0 + .8)); if (k <= 0) return; txt(lab, 120, y, 26, col, { align: 'left', weight: 800, ls: 2 });
    const n = Math.floor(digits * k), str = (digits === 29 ? '5' : '8') + '0'.repeat(Math.max(0, n - 1)); for (let r = 0; r * 34 < str.length; r++) txt(str.slice(r * 34, r * 34 + 34), 120, y + 46 + r * 40, 34, col, { align: 'left', weight: 800 }); };
  z(1030, 'BARAJAS DE TODA LA HISTORIA', 29, C.line, tPr - .3); z(1150, 'ÓRDENES POSIBLES', 68, C.accent, tPr + .2);
  const r = easeBack(seg(t, tRe - .1, tRe + .3)); if (r > 0) txt('NI UNO REPETIDO', 540, 1300, 50, C.mint, { weight: 800, scale: r, ls: 3 });
}
function sceneTu(t, lt, s) {
  const T = w => wt('tu', w), tBa = T('baraja'), tHi = T('historia');
  const sh = clamp(1 - seg(t, tBa + .9, tBa + 1.3)); if (sh > 0) { for (let i = 0; i < 26; i++) { const ph = (t * 3.2 + i * .04) % 1, side = i % 2 ? 1 : -1; card(540 + side * lerp(170, 20, easeIO(ph)), 880 - i * 4 + Math.sin(ph * Math.PI) * -60, 150, 220, ORDER[(i + 5) % 52], side * lerp(.35, 0, ph), { back: i % 3 === 0, alpha: sh }); } }
  const f = easeOut(seg(t, tBa + .9, tBa + 1.4)); if (f > 0) { ctx.save(); ctx.globalAlpha *= f; fan(t, 540, 1330, 620, -1.0, 1.0, 104, 152, { appear: tBa + .9 }); ctx.restore(); }
  const st = easeBack(seg(t, tHi - .15, tHi + .3)); if (st > 0) { ctx.save(); ctx.translate(540, 560); ctx.rotate(-.06); ctx.scale(st, st); rrect(-420, -120, 840, 240, 30); ctx.fillStyle = 'rgba(5,32,42,.92)'; ctx.fill(); ctx.strokeStyle = C.accent; ctx.lineWidth = 6; ctx.stroke();
    txt('ACABAS DE HACER', 0, -38, 54, C.line, { weight: 800, ls: 2 }); txt('HISTORIA', 0, 40, 88, C.accent, { weight: 800, ls: 6 }); ctx.restore(); }
}
function sceneCta(t, lt, s) { drawCta(t, lt, wt('cta', 'sigue')); }
const DRAW = { hook: sceneHook, cuenta: sceneCuenta, numero: sceneNumero, bigbang: sceneBigbang, tu: sceneTu, cta: sceneCta };
window.getEvents = () => {
  const E = [], P = (s, w, n = 0, ty = 'pop') => E.push({ t: wt(s, w, n), type: ty });
  TL.scenes.forEach(s => E.push({ t: s.start, type: 'whoosh' }));
  for (let i = 0; i < 14; i++) E.push({ t: .05 + i * .08, type: 'tick' }); E.push({ t: 1.1, type: 'swipe' }); P('hook', 'nadie', 0, 'boom'); P('hook', 'universo', 0, 'ding');
  P('cuenta', 'cincuenta', 0); P('cuenta', 'cincuenta', 1); P('cuenta', 'cincuenta', 2); { const a = wt('cuenta', 'cincuenta', 2) + .6, b = wt('cuenta', 'ultima') + .2; for (let i = 0; i < 49; i += 3) E.push({ t: lerp(a, b, i / 48), type: 'tick' }); }
  { const a = wt('numero', 'multiplicalo'), b = wt('numero', 'cifras') + .2; for (let i = 0; i < 34; i++) E.push({ t: lerp(a, b, i / 33), type: 'tick' }); } P('numero', 'ceros', 0, 'boom');
  P('bigbang', 'persona'); P('bigbang', 'big', 0, 'swipe'); P('bigbang', 'repetido', 0, 'ding');
  P('tu', 'baraja', 0, 'swipe'); P('tu', 'historia', 0, 'boom');
  P('cta', 'sigue', 0, 'click'); E.push({ t: wt('cta', 'sigue') + .1, type: 'ding' });
  return E;
};
