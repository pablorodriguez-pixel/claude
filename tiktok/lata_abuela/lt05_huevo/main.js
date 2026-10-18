/* LA LATA DE LA ABUELA — Ep. 5 «El número del huevo» (formato 1 secreto, ~32 s) */
const STG = document.getElementById('stage');
STG.insertAdjacentHTML('beforeend', A.defs);
STG.insertAdjacentHTML('beforeend', A.defs3);
STG.insertAdjacentHTML('beforeend', A.defs5);
const GOLD = document.getElementById('goldG');
const at = (e, k, v) => e.setAttribute(k, v);
const q = (r, s) => r.querySelector(s);
const qa = (r, s) => Array.from(r.querySelectorAll(s));
const px = v => v + 'px';
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(11);
const bump = (t, ti) => { if (t < ti) return 0; const d = t - ti; return d < 0.12 ? E.outCubic(d / 0.12) : Math.exp(-(d - 0.12) * 3.2); };
const out = (t, t1, d = 0.15) => 1 - p(t, t1 - d, d, E.inCubic);
const box = (html, parent, x, y, w, h, extra = {}) => el(html || 'div', parent, Object.assign({ left: px(x), top: px(y), width: px(w), height: px(h) }, extra));
const fr = x => x - Math.floor(x);
const DUR = W[W.length - 1].e + 0.75;
const LT = DUR - 0.4;

/* ================= FONDO ================= */
const BG = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', overflow: 'hidden', background: 'radial-gradient(ellipse 95% 62% at 50% 40%, #3260bd 0%, #1F3C88 52%, #11275c 100%)' });
const patSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><g fill='%23F2D28B'><circle cx='60' cy='49' r='6'/><circle cx='71' cy='60' r='6'/><circle cx='60' cy='71' r='6'/><circle cx='49' cy='60' r='6'/></g><circle cx='60' cy='60' r='4' fill='%23FFF1C4'/><g fill='%23F2D28B'><circle cx='0' cy='0' r='3'/><circle cx='120' cy='0' r='3'/><circle cx='0' cy='120' r='3'/><circle cx='120' cy='120' r='3'/></g><path d='M0 60 h18 M102 60 h18 M60 0 v18 M60 102 v18' stroke='%23F2D28B' stroke-width='2'/></svg>`;
const PAT = el('div', BG, { left: '-240px', top: '-240px', width: '1560px', height: '2400px', opacity: 0.13, backgroundImage: `url("data:image/svg+xml;utf8,${patSvg}")`, backgroundSize: '120px 120px' });
const SHEEN = el('div', BG, { left: '0', top: '-400px', width: '380px', height: '2800px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,.09), rgba(255,255,255,0))' });
el('div', BG, { left: 0, top: 0, width: '1080px', height: '1920px', background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(4,10,35,.55) 100%)' });
el('div', BG, { left: '22px', top: '22px', width: '1036px', height: '1876px', border: '3px solid rgba(242,210,139,.35)', borderRadius: '44px' });
el('div', BG, { left: '34px', top: '34px', width: '1012px', height: '1852px', border: '3px dotted rgba(242,210,139,.28)', borderRadius: '36px' });

const CAM = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', transformOrigin: '540px 760px' });
const OV = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', pointerEvents: 'none' });

/* ================= UTILIDADES DE ESCENA ================= */
const SC = [];
function scene(a, b, opt = {}) { const s = { a, b, enter: opt.enter || 'cut', exit: opt.exit || 'cut', el: el('div', CAM, { left: 0, top: 0, width: '1080px', height: '1920px' }), upd: () => { } }; SC.push(s); return s; }
function burst(parent, cx, cy, t0, n = 10, Rr = 220, sz = 1) {
  const st = [];
  for (let i = 0; i < n; i++) { const e = el(A.star(i % 3 ? '#FFF1C4' : '#ffffff'), parent, { left: px(cx - 30), top: px(cy - 30), width: '60px', height: '60px' }); st.push({ e, a: i / n * Math.PI * 2 + R() * 0.5, d: Rr * (0.55 + 0.45 * R()), s: sz * (0.6 + 0.7 * R()) }); set(e, { o: 0 }); }
  return { upd(t) { const o = t >= t0 && t < t0 + 0.9; const k = p(t, t0, 0.75, E.outCubic), f = Math.sin(Math.PI * clamp((t - t0) / 0.9)); st.forEach(s => set(s.e, { x: Math.cos(s.a) * s.d * k, y: Math.sin(s.a) * s.d * k, s: s.s * f, r: k * 160, o: o ? 1 : 0 })); } };
}
function chip(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), background: CREAM, border: '4px solid #D4A74A', borderRadius: '100px', padding: '8px 26px 10px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: (opt.size || 34) + 'px', color: BLUE, whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(8,16,48,.4)', letterSpacing: '0.01em' }, opt.css || {}), txt);
}
const chipAnim = (e, t, t0, t1, r = -3) => set(e, { s: pop(t, t0, 0.4) * out(t, t1), o: t >= t0 && t < t1 ? 1 : 0, r: r + wobble(t, 0.5, 1.2) });
function stampEl(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), border: `7px solid ${opt.c || RED}`, outline: `3px solid ${opt.c || RED}`, outlineOffset: '-16px', borderRadius: '18px', padding: '14px 34px 18px', fontFamily: 'DMSerif', fontSize: (opt.size || 76) + 'px', color: opt.c || RED, background: 'rgba(251,243,226,.95)', whiteSpace: 'nowrap', letterSpacing: '0.04em', boxShadow: '0 8px 0 rgba(8,16,48,.35)' }, opt.css || {}), txt);
}
const stampAnim = (e, t, t0, t1, r = -8) => { const k = p(t, t0, 0.16, E.inCubic); set(e, { s: (t < t0 ? 0 : 1 + 1.3 * (1 - k)) * out(t, t1), o: t >= t0 && t < t1 ? clamp((t - t0) / 0.06) : 0, r }); };
/* elemento centrado en (cx,cy) con su tamaño natural */
const cbox = (html, parent, cx, cy, w, h, extra = {}) => box(html, parent, cx - w / 2, cy - h / 2, w, h, extra);
/* gotas de agua periódicas: salpicadura desde (cx,cy) */
function splash(parent, cx, cy, n = 8, sc = 1) {
  const d = Array.from({ length: n }, (_, i) => ({ e: cbox(A.drop(WATER), parent, cx, cy, 60, 84), dir: i % 2 ? 1 : -1, sp: 0.8 + 0.5 * R(), dx: 60 + 110 * R(), dy: 50 + 80 * R(), ph: i / n }));
  return (t, o = 1) => d.forEach(g => { const k = fr((t * 1.7 * g.sp) + g.ph); set(g.e, { x: g.dir * g.dx * k * sc, y: (-Math.sin(Math.PI * k) * g.dy + 40 * k * k) * sc, s: 0.42 * sc * (1 - 0.6 * k), r: g.dir * (40 + 60 * k), o: o * (k < 0.92 ? 1 : 0) }); });
}
/* chorro de agua (div con franjas que corren) */
function stream(parent, x, y, wd, h) {
  const e = box('', parent, x, y, wd, h, { borderRadius: px(wd / 2), background: `repeating-linear-gradient(180deg, ${WATER} 0 26px, #CFE7FF 26px 40px)`, border: '3px solid ' + WATER2, transformOrigin: '50% 0' });
  return (t, o = 1, len = 1) => { e.style.backgroundPosition = `0 ${(fr(t * 17.5) * 40).toFixed(1)}px`; set(e, { sy: Math.max(0.001, len), sx: 1 + 0.06 * Math.sin(t * 30), o }); };
}

/* ================= TITULARES ================= */
const HL = el('div', OV, { left: '50px', top: '272px', width: '980px', height: '200px' });
const HEADS = [];
function head(spec, times, t1, opt = {}) {
  const b = el('div', HL, { left: 0, top: 0, width: '980px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', columnGap: '0.24em', rowGap: '0px', fontFamily: 'DMSerif', fontSize: (opt.size || 86) + 'px', lineHeight: 1.04, color: CREAM, textAlign: 'center' });
  const toks = spec.split(' ').map((s, i) => {
    const key = /^\*.*\*$/.test(s); const txt = s.replace(/\*/g, '').replace(/_/g, ' ');
    const sp = document.createElement('span'); sp.textContent = txt; sp.style.display = 'inline-block'; sp.style.whiteSpace = 'nowrap';
    if (key) { sp.className = 'gold'; sp.style.fontStyle = 'italic'; sp.style.padding = '0 0.08em'; } else sp.style.textShadow = '0 5px 0 #0b1946, 0 10px 24px rgba(0,0,0,.35)';
    b.appendChild(sp); return { sp, t: times[Math.min(i, times.length - 1)] };
  });
  const h = { b, toks, t0: toks[0].t, t1, fitted: false, size: opt.size || 86, maxH: opt.maxH || 190 }; HEADS.push(h); return h;
}
function updHeads(t) {
  HEADS.forEach(h => {
    const vis = t >= h.t0 - 0.06 && t < h.t1;
    if (!vis) { h.b.style.display = 'none'; return; }
    h.b.style.display = 'flex';
    if (!h.fitted) { let fs = h.size; while (h.b.offsetHeight > h.maxH && fs > 50) { fs -= 4; h.b.style.fontSize = fs + 'px'; } h.fitted = true; }
    h.b.style.opacity = out(t, h.t1, 0.12);
    h.toks.forEach(o => { const k = p(t, o.t - 0.05, 0.32, E.outBack); set(o.sp, { y: (1 - k) * 46, s: 0.55 + 0.45 * k, o: clamp((t - o.t + 0.05) / 0.1) }); });
  });
}
const H_ = (s, idx, t1, o) => head(s, idx.map(i => Number.isInteger(i) && i < 1000 ? w(i) : i), t1, o);

/* ================= ABUELA (medallón) ================= */
const MED = box(A.granny(), CAM, 0, 0, 400, 480, { zIndex: 300 });
const G = {}; ['gHead', 'gBrowL', 'gBrowR', 'gEyeL', 'gEyeR', 'gWinkR', 'gWinkL', 'gMouthC', 'gMouthO', 'gMouthD', 'gTint', 'gBody'].forEach(id => G[id] = document.getElementById(id));
const HSTOP = box(A.handStop(), MED, 300, 30, 170, 230, { transformOrigin: '85px 200px' });
const HPT = box(A.handPoint(), MED, 330, 250, 240, 150, { transformOrigin: '30px 75px' });
function kf(K, t) {
  if (t <= K[0][0]) return K[0].slice(1, 4);
  for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t < b[0]) { const k = (b[4] === 'back' ? E.outBack : E.inOutCubic)(clamp((t - a[0]) / (b[0] - a[0]))); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } }
  return K[K.length - 1].slice(1, 4);
}
function speakAt(t) {
  for (let i = 0; i < W.length; i++) { const x = W[i]; if (t >= x.s - 0.03 && t <= x.e + 0.02) { const k = t - x.s; return clamp(0.25 + 0.75 * Math.abs(Math.sin(k * Math.PI * 6.4 + 0.7))) * clamp((x.e + 0.02 - t) / 0.05) * clamp((t - x.s + 0.03) / 0.05); } if (x.s > t) break; }
  return 0;
}


/* ================= UTILIDADES PROPIAS ================= */
const sz = (svg, wd, ht) => svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${wd}" height="${ht}"`);
function card(parent, bg) {
  const c = box('', parent, 90, 500, 900, 700, { borderRadius: '44px', overflow: 'hidden', border: '8px solid #D4A74A', boxSizing: 'border-box', boxShadow: '0 14px 0 rgba(8,16,48,.45), 0 30px 60px rgba(0,0,0,.35)', background: '#000' });
  if (bg) box(bg, c, -8, -8, 900, 700);
  return c;
}
function badge(parent, n, x, y) {
  return box(`<div style="width:190px;height:190px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#FFF1C4,#E2BC63 45%,#B0812F);border:7px solid ${INK};box-shadow:0 10px 0 rgba(8,16,48,.5);display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:150px;line-height:1;color:${BLUE};box-sizing:border-box;padding-bottom:12px">${n}</div>`, parent, x, y, 190, 190);
}
const badgeAnim = (e, t, t0) => set(e, { s: pop(t, t0, 0.45) * (1 + 0.1 * bump(t, t0 + 0.4)), r: -8 + wobble(t, 0.6, 4), o: t >= t0 ? 1 : 0 });
function hen(parent, cx, cy, mood = 'happy', sc = 1, cols) {
  return box(cols ? A.hen(mood, cols[0], cols[1]) : A.hen(mood), parent, cx - 130, cy - 230, 260, 250, { transformOrigin: '130px 230px' });
}
const WHITE = ['#F7F1E6', '#d6cab4'];
/* paso de gallina: vaivén + saltito + picoteo opcional */
const henIdle = (e, t, sc, ph = 0, extra = {}) => set(e, Object.assign({ s: sc, y: -Math.abs(Math.sin(t * 6 + ph)) * 8, r: Math.sin(t * 3 + ph) * 4 }, extra));
/* código del huevo: grupos 3 · ES · 45 · 089 · 12 */
const GROUPS = ['3', 'ES', '45', '089', '12'];
function eggCode(parent, top) {
  const wrap = box('', parent, 0, top, 520, 90, { transform: 'rotate(-5deg)' });
  const row = el('div', wrap, { left: 0, top: 0, width: '520px', display: 'flex', justifyContent: 'center', gap: '8px', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '58px', lineHeight: 1, color: '#A8323C' });
  const sp = GROUPS.map(g => { const s = document.createElement('span'); s.textContent = g; s.style.cssText = 'display:inline-block;position:relative;padding:4px 4px 8px;border-radius:14px;opacity:.9'; row.appendChild(s); return s; });
  return { wrap, row, sp };
}
function comment(parent, x, y, name, txt, col) {
  return box(`<div style="display:flex;align-items:center;gap:18px;background:#fff;border-radius:34px;padding:16px 30px 18px 18px;box-shadow:0 8px 0 rgba(8,16,48,.35);border:4px solid #e7e2d6;white-space:nowrap">
    <div style="width:74px;height:74px;border-radius:50%;background:${col};border:4px solid ${INK};display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:38px;color:#fff">${name[0].toUpperCase()}</div>
    <div><div style="font-family:Fredoka;font-weight:500;font-size:26px;color:#8a8f9e">${name}</div><div style="font-family:Fredoka;font-weight:700;font-size:40px;color:${INK}">${txt}</div></div></div>`, parent, x, y, 560, 120, { transformOrigin: '0 50%' });
}

/* ================= 0 · GANCHO: el huevo y su número ================= */
const T_GAL = w(11), T_L1 = w(12), T_SAD = w(20), T_L2 = w(22), T_PRI = w(25), T_S1 = w(26);
const s0 = scene(-1, T_S1, { exit: 'whip' });
const H = {};
H.title = el('div', s0.el, { left: 0, top: '262px', width: '1080px', display: 'flex', justifyContent: 'center', gap: '0.24em', fontFamily: 'DMSerif', fontSize: '116px', lineHeight: 1.04, color: CREAM, whiteSpace: 'nowrap' }, '<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">¿Sabes leer</span><span class="gold" style="font-style:italic;padding:0 .08em">esto</span><span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">?</span>');
H.egg = box(A.bigEgg(), s0.el, 280, 550, 520, 640);
H.code = eggCode(H.egg, 352);
H.under = box('', H.code.wrap, 30, 92, 460, 12, { background: 'linear-gradient(90deg,#C08F35,#FFF1C4,#D4A74A)', borderRadius: '6px', transformOrigin: '0 50%' });
H.ring = box(`<div style="width:120px;height:120px;border-radius:50%;border:10px solid #F2D28B;box-shadow:0 0 0 5px ${INK}, 0 0 30px rgba(255,241,196,.9)"></div>`, H.code.wrap, -7, -27, 120, 120);
H.q = [[150, 610, -12], [880, 640, 10], [120, 900, 8]].map(([x, y, r], i) => ({ e: cbox(`<div style="width:110px;height:110px;border-radius:26px;background:${RED};border:6px solid #F2D28B;display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:92px;color:${CREAM};box-shadow:0 8px 0 #5a0a14">?</div>`, s0.el, x, y, 110, 110), r, i }));
H.henH = hen(s0.el, 850, 1150, 'happy', 1);
H.henS = hen(s0.el, 850, 1150, 'sad', 1);
H.b = burst(s0.el, 850, 1050, T_GAL + 0.05, 12, 220, 0.9);
/* posición del primer dígito respecto al centro del huevo (para el zoom) */
const DX = 53 - 260, DY = 66;
s0.upd = t => {
  set(H.title, { o: 1 - p(t, w(5) - 0.15, 0.15), s: 1 + 0.04 * Math.sin(t * 4), y: wobble(t, 0.5, 3) });
  const kz = p(t, T_L2 - 0.1, 0.9, E.inOutCubic);
  const s = lerp(1.3, 2.35, kz) * (1 + 0.025 * Math.sin(t * 2.2)) * (1 + 0.06 * bump(t, w(2)));
  set(H.egg, { s, x: lerp(0, -2.35 * DX, kz), y: lerp(0, -10 - 2.35 * DY, kz), r: wobble(t, 0.45, 1.6) * (1 - kz) + shake(t, T_SAD, 0.4, 3) });
  H.code.sp.forEach((e, i) => set(e, { o: i === 0 ? 0.95 : 0.9 * (1 - 0.75 * p(t, T_L2 + 0.2, 0.3)), s: i === 0 ? 1 + 0.25 * bump(t, T_PRI) + 0.15 * kz : 1 }));
  set(H.under, { sx: Math.max(0.001, p(t, -0.2, 0.5, E.outCubic) * (1 - p(t, T_L2, 0.2))), o: 1 });
  set(H.ring, { s: pop(t, T_PRI - 0.1, 0.4) * (1 + 0.06 * Math.sin(t * 9)), o: t >= T_PRI - 0.1 ? 1 : 0 });
  H.q.forEach(o => set(o.e, { s: (1 + 0.08 * Math.sin(t * 5 + o.i)) * (1 - p(t, w(9), 0.2)), r: o.r + wobble(t, 0.9, 6, o.i), y: Math.sin(t * 3 + o.i * 2) * 10, o: t < w(9) + 0.2 ? 1 : 0 }));
  const hv = t >= T_GAL && t < T_L2 + 0.3, sad = t >= T_SAD;
  const hk = pop(t, T_GAL, 0.45) * (1 - p(t, T_L2, 0.3));
  henIdle(H.henH, t, 1.15 * hk, 0, { o: hv && !sad ? 1 : 0 });
  henIdle(H.henS, t, 1.15 * hk, 0, { o: hv && sad ? 1 : 0, x: shake(t, T_SAD, 0.5, 8) });
  H.b.upd(t);
};

/* ================= 1 · CERO: ecológica ================= */
const T_S2 = w(36), T_S3 = w(45), T_S4 = w(55), T_S5 = w(63), T_S6 = w(78);
const s1 = scene(T_S1, T_S2, { enter: 'whip', exit: 'whip' });
const C1 = card(s1.el, A.field());
const E1 = {};
E1.sun = q(C1, '.sun');
E1.hen = hen(C1, 470, 640, 'happy');
E1.hen2 = hen(C1, 760, 650, 'happy', 1, WHITE);
E1.leaf = cbox(A.leaf(), s1.el, 860, 600, 120, 120);
E1.sack = box(A.sack(), C1, 40, 400, 200, 230, { transformOrigin: '100px 230px' });
E1.chip = chip(s1.el, '🌿 ecológica', 360, 1225, { size: 46 });
E1.badge = badge(s1.el, 0, 40, 420);
E1.b = burst(s1.el, 860, 600, w(27) + 0.05, 12, 200, 0.9);
s1.upd = t => {
  at(E1.sun, 'transform', `rotate(${(t * 20) % 360} 740 130)`);
  const kx = p(t, w(28), 1.2, E.inOutCubic);
  henIdle(E1.hen, t, 1.25, 0, { x: -120 + 160 * kx });
  henIdle(E1.hen2, t, 1.0, 1.7, { sx: -1, x: Math.sin(t * 1.3) * 30 });
  set(E1.leaf, { s: pop(t, w(27), 0.45) * (1 + 0.06 * Math.sin(t * 5)), r: wobble(t, 0.7, 8), o: t >= w(27) ? 1 : 0 });
  set(E1.sack, { s: 1.1 * pop(t, w(34), 0.45), r: -6 + wobble(t, 0.8, 3), o: t >= w(34) ? 1 : 0 });
  chipAnim(E1.chip, t, w(27) + 0.1, T_S2 + 1, -2);
  badgeAnim(E1.badge, t, T_S1 + 0.05);
  E1.b.upd(t);
};

/* ================= 2 · UNO: campera ================= */
const s2 = scene(T_S2, T_S3, { enter: 'whip', exit: 'whip' });
const C2 = card(s2.el, A.field({ house: true, fence: true }));
const E2 = {};
E2.sun = q(C2, '.sun');
E2.hen = hen(C2, 240, 560, 'happy');
E2.badge = badge(s2.el, 1, 40, 420);
E2.days = 'LMXJVSD'.split('').map((d, i) => {
  const b = box(`<div style="width:84px;height:84px;border-radius:18px;background:${CREAM};border:5px solid #D4A74A;display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:40px;color:${BLUE};box-sizing:border-box;box-shadow:0 6px 0 rgba(8,16,48,.4)">${d}</div>`, s2.el, 310 + i * 96, 1222, 84, 84);
  const ck = box(A.check(), b, 40, -26, 100, 100, { transformOrigin: '0 0' });
  return { b, ck };
});
s2.upd = t => {
  at(E2.sun, 'transform', `rotate(${(t * 20) % 360} 740 130)`);
  const kx = p(t, w(39) - 0.2, 1.1, E.inOutCubic);
  henIdle(E2.hen, t, lerp(0.8, 1.3, kx), 0, { x: 320 * kx, y: 30 * kx - Math.abs(Math.sin(t * 7)) * 10 });
  badgeAnim(E2.badge, t, T_S2 + 0.05);
  const t0 = w(42) - 0.05, t1 = w(44) + 0.3;
  E2.days.forEach((o, i) => {
    const ti = lerp(t0, t1, i / 6);
    set(o.b, { s: pop(t, w(38) + i * 0.05, 0.35) * (1 + 0.15 * bump(t, ti)), o: t >= w(38) ? 1 : 0 });
    set(o.ck, { s: 0.5 * pop(t, ti, 0.3), o: t >= ti ? 1 : 0 });
  });
};

/* ================= 3 · DOS: suelo (dentro de una nave) ================= */
const s3 = scene(T_S3, T_S4, { enter: 'whip', exit: 'cut' });
const C3 = card(s3.el, A.barn());
const E3 = {};
E3.hens = [[180, 600, 0.9, 0], [430, 640, 1.1, 1], [690, 610, 0.95, 2], [300, 520, 0.7, 3], [600, 520, 0.7, 4]].map(([x, y, sc, i]) => ({ e: hen(C3, x, y, 'happy', 1, i % 2 ? WHITE : null), sc, i, x }));
E3.badge = badge(s3.el, 2, 40, 420);
E3.stamp = stampEl(s3.el, 'SIN SALIR', 330, 760, { size: 96 });
E3.chip = chip(s3.el, '🏠 dentro de una nave', 300, 1225, { size: 44 });
s3.upd = t => {
  E3.hens.forEach(o => henIdle(o.e, t, o.sc * pop(t, T_S3 + 0.1 + o.i * 0.08, 0.4), o.i * 1.3, { x: Math.sin(t * 1.1 + o.i * 2) * 50, sx: Math.cos(t * 1.1 + o.i * 2) > 0 ? 1 : -1 }));
  badgeAnim(E3.badge, t, T_S3 + 0.05);
  stampAnim(E3.stamp, t, w(51), T_S4, -8);
  chipAnim(E3.chip, t, w(53), T_S4 + 1, -2);
};

/* ================= 4 · Y EL TRES… JAULA ================= */
const T_JAU = w(58);
const s4 = scene(T_S4, T_S5, { enter: 'cut', exit: 'whip' });
const C4 = card(s4.el, A.cageBg());
const E4 = {};
E4.hen = hen(C4, 450, 620, 'sad', 1, WHITE);
E4.bars = box(A.cageBars(), C4, -8, -8, 900, 700);
E4.cur = box('', C4, -8, -8, 900, 700, { background: 'repeating-linear-gradient(90deg,#8e0f22 0 40px,#b5142c 40px 80px,#7a0c1c 80px 90px)', boxShadow: 'inset 0 -30px 60px rgba(0,0,0,.5)' });
E4.three = box(`<div class="gold" style="font-family:DMSerif;font-size:520px;line-height:1;width:900px;text-align:center">3</div>`, C4, -8, 40, 900, 600);
E4.badge = badge(s4.el, 3, 40, 420);
E4.stamp = stampEl(s4.el, 'JAULA', 330, 740, { size: 130 });
E4.no = [[470, 'field'], [700, 'straw']].map(([x, k], i) => {
  const b = cbox(`<div style="width:120px;height:120px;border-radius:50%;overflow:hidden;border:6px solid ${CREAM};box-shadow:0 6px 0 rgba(8,16,48,.4);background:${k === 'field' ? 'linear-gradient(#7FB6EE 0 50%,#7BC96F 50%)' : '#E2B85C'}">${k === 'straw' ? '<svg width="120" height="120"><rect width="120" height="120" fill="url(#straw)"/></svg>' : ''}</div>`, s4.el, x, 1265, 120, 120);
  const x2 = box(A.cross(), b, 50, -20, 100, 100, { transformOrigin: '0 0' });
  return { b, x2, t0: w(i ? 61 : 59) };
});
E4.b = burst(s4.el, 540, 850, T_JAU, 16, 460, 1.3);
s4.upd = t => {
  const kc = p(t, T_JAU - 0.05, 0.22, E.inCubic);
  set(E4.cur, { y: -720 * kc });
  set(E4.three, { y: -720 * kc, s: (0.6 + 0.4 * pop(t, w(57) - 0.1, 0.5)) * (1 + 0.04 * Math.sin(t * 30) * p(t, w(57), 1.2)), r: Math.sin(t * 40) * 3 * p(t, w(57), 1.3) * (1 - kc) });
  const kb = t < T_JAU ? 0 : E.outBounce(clamp((t - T_JAU - 0.05) / 0.45));
  set(E4.bars, { y: -720 * (1 - kb) });
  henIdle(E4.hen, t, 1.5, 0, { x: shake(t, T_JAU + 0.3, 0.5, 10) });
  badgeAnim(E4.badge, t, T_JAU + 0.25);
  stampAnim(E4.stamp, t, T_JAU + 0.32, w(59) + 0.1, -8);
  E4.no.forEach(o => { set(o.b, { s: pop(t, o.t0, 0.35), o: t >= o.t0 ? 1 : 0 }); set(o.x2, { s: 0.6 * pop(t, o.t0 + 0.35, 0.3), o: t >= o.t0 + 0.35 ? 1 : 0 }); });
  E4.b.upd(t);
};

/* ================= 5 · EL RESTO DEL CÓDIGO: país, provincia, granja ================= */
const s5 = scene(T_S5, T_S6, { enter: 'whip', exit: 'whip' });
const E5 = {};
E5.egg = box(A.bigEgg(), s5.el, 120, 560, 520, 640);
E5.code = eggCode(E5.egg, 352);
E5.ej = chip(s5.el, 'ejemplo', 470, 540, { size: 30 });
const HLC = [null, RED, BLUE2, GRASS2, GRASS2];
const LAB = [[1, A.flagES(), 'país', w(69), 590, 116, 78], [2, A.pin(BLUE2), 'provincia', w(71), 800, 70, 92], [3, A.farm(), 'granja', w(74), 1010, 110, 90]];
E5.lab = LAB.map(([g, svg, txt, t0, y, iw, ih]) => {
  const b = box(`<div style="display:flex;align-items:center;gap:14px;background:${CREAM};border:6px solid ${HLC[g]};border-radius:28px;padding:12px 26px 14px 16px;box-shadow:0 8px 0 rgba(8,16,48,.4);white-space:nowrap">${sz(svg, iw, ih)}<span style="font-family:Fredoka;font-weight:700;font-size:50px;color:${HLC[g]}">${txt}</span></div>`, s5.el, 600, y, 340, 130, { transformOrigin: '0 50%' });
  return { b, g, t0 };
});
s5.upd = t => {
  set(E5.egg, { s: 0.98 * pop(t, T_S5, 0.4) * (1 + 0.02 * Math.sin(t * 2.2)), r: wobble(t, 0.45, 1.5) });
  set(E5.ej, { s: pop(t, T_S5 + 0.3, 0.35), r: 4, o: t >= T_S5 + 0.3 ? 1 : 0 });
  E5.code.sp.forEach((e, i) => {
    const L = E5.lab.find(l => l.g === i || (i === 4 && l.g === 3));
    const on = L && t >= L.t0;
    e.style.background = on ? HLC[i] : 'transparent'; e.style.color = on ? CREAM : '#A8323C';
    set(e, { s: 1 + (L ? 0.3 * bump(t, L.t0) : 0), o: i === 0 ? 0.35 : 0.95 });
  });
  E5.lab.forEach(l => set(l.b, { s: pop(t, l.t0, 0.4) * 0.92, r: -2 + wobble(t, 0.6, 1.5), o: t >= l.t0 ? 1 : 0 }));
};

/* ================= 6 · LLAMADA: ve a la nevera ================= */
const s6 = scene(T_S6, LT + 0.4, { enter: 'whip' });
const E6 = {};
E6.fr = box(A.fridge(), s6.el, 260, 560, 380, 560, { transformOrigin: '190px 560px' });
E6.eggs = box(A.eggs(), E6.fr, 100, 250, 180, 110);
E6.cm = [[300, 590, 'lola_cocina', 'Los míos, un 3 😬', '#F25244', w(85)], [250, 760, 'paco.58', '¡Yo el 1! 🐔', BLUE2, w(86) + 0.1], [320, 930, 'mari_bcn', 'Cero, como debe ser 🌿', GRASS2, w(88)]].map(([x, y, n, tx, c, t0]) => ({ e: comment(s6.el, x, y, n, tx, c), t0 }));
s6.upd = t => {
  set(E6.fr, { s: 1.2 * pop(t, T_S6, 0.45) * (1 + 0.02 * Math.sin(t * 3)), r: wobble(t, 0.5, 2), x: -60 * p(t, w(84), 0.5, E.inOutCubic) });
  E6.cm.forEach((o, i) => set(o.e, { s: pop(t, o.t0, 0.4), x: (1 - p(t, o.t0, 0.3, E.outCubic)) * 80, r: (i % 2 ? 2 : -2), o: t >= o.t0 ? 1 : 0 }));
};

/* ================= ABUELA: posición, gestos ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 1.7, 'wow'], [1.7, 3.9, 'happy'], [3.9, 5.2, 'sly'], [5.2, 6.2, 'stern'], [6.2, 7.8, 'sly'], [7.9, 12, 'happy'], [12.1, 15.4, 'proud'], [15.5, 17.5, 'happy'], [17.6, 19.4, 'stern'],
  [19.5, 21.5, 'sly'], [21.5, 24.2, 'disgust'], [24.3, 28.3, 'happy'], [28.4, 29.9, 'wow'], [29.9, 31.5, 'wink'], [31.5, 40, 'happy']];
const HANDS = [[0.1, 1.6, 'point'], [3.9, 5.6, 'wag'], [6.3, 7.7, 'point'], [12.6, 13.6, 'up'], [17.6, 19.0, 'wag'], [22.4, 24.0, 'wag'], [25.4, 27.6, 'point'], [28.5, 29.8, 'up'], [30.0, 31.4, 'point']];
function granny(t) {
  let ex = 'neutral'; for (const [a, b, n] of EXPR) if (t >= a && t < b) ex = n;
  const sp = speakAt(t);
  let bL = 0, bR = 0, rL = 0, rR = 0, eS = 1, wR = 0, tint = 0, md = 'talk', tilt = wobble(t, 0.33, 2.2), big = 1;
  switch (ex) {
    case 'shout': bL = bR = -12; eS = 1.25; big = 1.3; break;
    case 'stern': bL = bR = 3; rL = 14; rR = -14; break;
    case 'sly': bR = -13; rR = -6; bL = 4; rL = 6; tilt += 5; break;
    case 'disgust': bL = bR = 5; rL = 12; rR = -12; eS = 0.32; tint = 0.5; md = 'disgust'; tilt -= 4; break;
    case 'wow': bL = bR = -15; eS = 1.3; big = 1.25; break;
    case 'happy': bL = bR = -6; break;
    case 'proud': bL = bR = -9; tilt -= 4; break;
    case 'wink': wR = 1; bL = -7; bR = 4; tilt += 5; break;
  }
  if (eS <= 1.05 && !wR && ((t + 0.5) % 3.5) < 0.12) eS = 0.08;
  at(G.gBrowL, 'transform', `translate(0 ${bL}) rotate(${rL} 167 174)`);
  at(G.gBrowR, 'transform', `translate(0 ${bR}) rotate(${rR} 233 174)`);
  at(G.gEyeL, 'transform', `translate(167 211) scale(${eS > 1 ? 1.15 : 1} ${eS}) translate(-167 -211)`);
  at(G.gEyeR, 'transform', `translate(233 211) scale(${eS > 1 ? 1.15 : 1} ${wR ? 0.05 : eS}) translate(-233 -211)`);
  G.gWinkR.style.opacity = wR; G.gTint.style.opacity = tint;
  if (md === 'disgust' && sp < 0.02) { G.gMouthD.style.opacity = 1; G.gMouthO.style.opacity = 0; G.gMouthC.style.opacity = 0; }
  else if (sp > 0.02) { G.gMouthD.style.opacity = 0; G.gMouthC.style.opacity = 0; G.gMouthO.style.opacity = 1; at(G.gMouthO, 'transform', `translate(202 274) scale(${0.85 + 0.25 * sp * big} ${(0.2 + 0.9 * sp) * big})`); }
  else if (ex === 'wow' || ex === 'shout') { G.gMouthD.style.opacity = 0; G.gMouthC.style.opacity = 0; G.gMouthO.style.opacity = 1; at(G.gMouthO, 'transform', `translate(202 276) scale(0.62 1.0)`); }
  else { G.gMouthD.style.opacity = 0; G.gMouthO.style.opacity = 0; G.gMouthC.style.opacity = 1; }
  at(G.gHead, 'transform', `translate(0 ${sp * 1.5}) rotate(${tilt} 200 300)`);
  const [x, y, s] = kf(MKF, t);
  set(MED, { x: x - 200, y: y - 240, s: s * (1 + 0.012 * Math.sin(t * 2.4)), r: wobble(t, 0.27, 1.4) });
  let hs = null; for (const hh of HANDS) if (t >= hh[0] && t < hh[1]) hs = hh;
  set(HSTOP, { o: 0 }); set(HPT, { o: 0 });
  if (hs) {
    const k = pop(t, hs[0], 0.35) * out(t, hs[1], 0.15), ty = hs[2];
    if (ty === 'stop') set(HSTOP, { s: k, r: -8 + shake(t, 0.16, 0.4, 10) + wobble(t, 1.1, 3), o: 1 });
    if (ty === 'wave') set(HSTOP, { s: k, r: Math.sin((t - hs[0]) * 11) * 20, o: 1 });
    if (ty === 'point') set(HPT, { s: k, x: Math.sin(t * 7) * 6, r: 0, o: 1 });
    if (ty === 'up') set(HPT, { s: k, x: -20, y: -170, r: -90 + wobble(t, 0.8, 4), o: 1 });
    if (ty === 'wag') set(HPT, { s: k, x: -20, y: -170, r: -90 + Math.sin((t - hs[0]) * 13) * 18, o: 1 });
  }
}


/* ================= TRANSICIONES ================= */
const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
const WHIPS = [T_S1, T_S2, T_S3, T_S5, T_S6];

/* ================= TITULARES ================= */
H_('Te dice cómo vivió *la_gallina*', [5, 6, 7, 9, 11], T_L1);
H_('Y uno *no_te_va_a_gustar*', [12, 13, 16], T_L2);
H_('Mira solo *el_primero*', [22, 23, 24], T_S1);
H_('Cero: *ecológica*', [26, 27], w(28));
H_('Aire libre y pienso *ecológico*', [30, 31, 32, 34, 35], T_S2);
H_('Uno: *campera*', [36, 37], w(38));
H_('Sale al campo *cada_día*', [38, 39, 41, 42], T_S3);
H_('Dos: *suelo*', [45, 46], w(47));
H_('Suelta… pero *dentro*', [47, 48, 49, 51], T_S4);
H_('Y el *tres*…', [55, 56, 57], T_JAU);
H_('Ni campo, *ni_suelo*', [59, 60, 61], T_S5);
H_('Y lo de *detrás*…', [63, 64, 65, 66], w(69));
H_('País, provincia *y_granja*', [69, 71, 74], T_S6);
H_('Ve a la *nevera*', [78, 79, 80, 81], w(84));
H_('¿Qué número tienen *los_tuyos*?', [84, 85, 86, 87, 88], LT, { maxH: 200 });
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['pop', 0.02, 0.5], ['ding', w(2), 0.5], ['boing', w(4), 0.5], ['pop', T_GAL], ['cluck', T_GAL + 0.05, 0.7], ['sparkle', T_GAL + 0.1, 0.5], ['sad', T_SAD, 0.6], ['error', w(21), 0.5],
 ['swoosh_up', T_L2, 0.5], ['ping', T_PRI, 0.7],
 ['whoosh', T_S1], ['morning', T_S1 + 0.1, 0.35], ['pop', w(27), 0.7], ['ding', w(27) + 0.3, 0.5], ['pop2', w(34), 0.7],
 ['whoosh', T_S2], ['pop', w(37), 0.6], ...Array.from({ length: 7 }, (_, i) => ['tick', lerp(w(42) - 0.05, w(44) + 0.3, i / 6), 0.6]), ['ding', w(44) + 0.4, 0.6],
 ['whoosh', T_S3], ['pop', T_S3 + 0.1, 0.5], ['pop2', T_S3 + 0.25, 0.5], ['stamp', w(51)], ['thud', w(54), 0.5],
 ['drumroll', T_S4, 0.6], ['thud', T_JAU + 0.1], ['stamp', T_JAU + 0.32], ['glitch', T_JAU + 0.05, 0.6], ['sad', T_JAU + 0.5, 0.5], ['error', w(59) + 0.35, 0.6], ['error', w(61) + 0.35, 0.6],
 ['whoosh', T_S5], ['pop', w(69)], ['pop2', w(71)], ['pop', w(74)], ['ding', w(77), 0.5],
 ['whoosh', T_S6], ['click', w(81), 0.6], ['msg_in', w(85), 0.6], ['msg_in', w(86) + 0.1, 0.6], ['msg_in', w(88), 0.6], ['swoosh_up', LT, 0.5]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
const PUN = [w(2), w(4), T_GAL, w(20), T_PRI, w(27), w(35), w(37), w(41), w(46), w(51), w(66), w(69), w(71), w(74), w(81), w(88)];
const SHK = [T_JAU + 0.1, T_SAD];
window.frame = t => {
  at(GOLD, 'gradientTransform', `translate(${(0.22 * Math.sin(t * 0.9)).toFixed(3)} ${(0.1 * Math.cos(t * 0.7)).toFixed(3)})`);
  STG.style.setProperty('--shx', (50 + 50 * Math.sin(t * 1.1)).toFixed(1) + '%');
  set(PAT, { x: (t * 6) % 120, y: (t * 10) % 120 });
  set(SHEEN, { x: -500 + ((t * 260) % 2200), r: 20 });
  SC.forEach(s => {
    let vis = t >= s.a && t < s.b;
    const loop = s === s0 && t >= LT;
    if (loop) vis = true;
    s.el.style.display = vis ? 'block' : 'none';
    if (!vis) return;
    let x = 0, y = 0;
    if (s.enter === 'whip') x += 1080 * (1 - p(t, s.a, 0.22, E.outCubic));
    if (s.exit === 'whip') x -= 1080 * p(t, s.b - 0.18, 0.18, E.inCubic);
    if (s === s6) y -= 1920 * p(t, LT, 0.4, E.inOutCubic);
    if (loop) { y = 1920 * (1 - p(t, LT, 0.4, E.inOutCubic)); x = 0; s.upd(t - DUR); }
    else s.upd(t);
    set(s.el, { x, y });
  });
  granny(t);
  let b = 0; PUN.forEach(ti => b = Math.max(b, bump(t, ti)));
  let sx = 0, sy = 0; SHK.forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
  set(CAM, { s: 1 + 0.06 * b, x: sx, y: sy });
  let sk = 0; WHIPS.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
  STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i) }));
  updHeads(t);
  set(HL, { o: t >= LT ? 0 : 1 });
};
Engine.start({ duration: DUR, captions: { y: 1420, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
