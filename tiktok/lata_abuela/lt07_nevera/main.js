/* LA LATA DE LA ABUELA — Ep. 7 «Tu nevera, bien puesta» (formato 2 consejos útiles, ~37 s) */
const STG = document.getElementById('stage');
STG.insertAdjacentHTML('beforeend', A.defs);
STG.insertAdjacentHTML('beforeend', A.defs3);

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


/* ================= NEVERA (persistente, cambia de estado con el tiempo) ================= */
STG.insertAdjacentHTML('beforeend', A.defs7);
const T_DOS = w(13), T1 = w(20), T2 = w(58), TD = w(84), TC = w(96);
const T_ABAJO = w(62), T_FISH = w(67), T_GOT = w(73), T_MIRA = w(49), T_FRIA = w(55);
const FR = box(A.fridgeBody(), CAM, 200, 480, 540, 780);
const TW_ = el('div', FR, { left: 0, top: 0, width: '540px', height: '780px' }, A.cavTint('rgba(242,152,62,.25)'));
const TC_ = el('div', FR, { left: 0, top: 0, width: '540px', height: '780px' }, A.cavTint('rgba(80,170,255,.18)'));
const DOOR = box(A.door(), FR, 540, 0, 150, 780, { transformOrigin: '0 50%' });
const DGLOW = box('', DOOR, 0, 0, 150, 780, { background: 'linear-gradient(180deg,rgba(242,152,62,.0),rgba(242,152,62,.45),rgba(242,152,62,0))', clipPath: 'polygon(0 1%, 93% 8%, 93% 92%, 0 99%)' });
const DB = [[22, 118, 'ZUMO'], [78, 108, 'AGUA']].map(([x, y, l]) => box(sz(A.bottle(l), 50, 136), DOOR, x, y, 50, 136, { transformOrigin: '25px 136px' }));
const DS = [[24, 404, '#E5533D'], [80, 398, '#F2B035']].map(([x, y, c]) => box(sz(A.sauce(c), 50, 72), DOOR, x, y, 50, 72, { transformOrigin: '25px 72px' }));
const MILK = box(A.milk(), FR, 370, 30, 120, 170, { transformOrigin: '60px 170px' });
const MEAT = box(A.meat(), FR, 60, 112, 180, 90, { transformOrigin: '90px 90px' });
const FISH = box(A.fish(), FR, 290, 472, 180, 90, { transformOrigin: '90px 90px' });
const CAKE = box(A.cake(), FR, 70, 262, 170, 120, { transformOrigin: '85px 120px' });
const GLASS = box(A.glass(), FR, 340, 222, 110, 160, { transformOrigin: '55px 160px' });
const GREAD = box(`<div style="width:110px;height:70px;border-radius:20px;background:${CREAM};border:5px solid ${INK};display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:44px;color:${INK};box-sizing:border-box">?</div>`, FR, 340, 140, 110, 70);
const GREADi = GREAD.firstChild;
const DROPS = [0, 1, 2].map(i => box(A.drop(RED), FR, 140, 200, 60, 84, { transformOrigin: '30px 42px' }));
const PUDDLE = box(`<div style="width:120px;height:18px;border-radius:50%;background:rgba(200,16,46,.55)"></div>`, FR, 90, 556, 120, 18);
const BAD = box(`<div style="padding:8px 26px 12px;border-radius:100px;background:${RED};border:5px solid ${CREAM};font-family:Fredoka;font-weight:700;font-size:56px;color:#fff;box-shadow:0 8px 0 #5a0a14">9°</div>`, FR, 380, -40, 160, 90);
const RINGS = [[150, 230], [150, 330]].map(([x, y]) => box(`<div style="width:170px;height:170px;border-radius:50%;border:9px solid ${RED};box-shadow:0 0 22px rgba(255,90,78,.8)"></div>`, FR, x - 85, y - 85, 170, 170));
const CK_CAKE = box(A.check(), FR, 200, 250, 100, 100);
const CK_MEAT = box(A.check(), FR, 200, 470, 100, 100);
const kfr = (K, t) => kf(K, t);
/* transformaciones globales de la nevera: [t, x, y, s] */
const FK = [[-1, 0, 0, 1], [T1 - 0.1, 0, 0, 1], [T1 + 0.4, -110, 0, 0.86, 'back'], [T2 - 0.1, -110, 0, 0.86], [T2 + 0.35, 0, 0, 1, 'back'], [TC - 0.05, 0, 0, 1], [TC + 0.45, -175, 10, 0.62, 'back'], [LT, -175, 10, 0.62], [DUR, 0, 0, 1]];
function fridgeUpd(t) {
  const [fx, fy, fs] = kfr(FK, t);
  if (t >= LT) t = t - DUR;  /* bucle: los objetos vuelven al estado del fotograma 0 */
  set(FR, { x: fx, y: fy, s: fs * (1 + 0.01 * Math.sin(t * 2.2)) });
  const doorO = t < T1 || t >= T2 - 0.1 ? 1 : 1 - p(t, T1, 0.2);
  set(DOOR, { o: t >= T2 - 0.1 ? p(t, T2 - 0.1, 0.3) : doorO });
  const cool = p(t, T_FRIA + 0.1, 0.7);
  TW_.style.opacity = 1 - cool; TC_.style.opacity = cool;
  /* carne: arriba hasta «abajo», luego vuela a la última balda */
  const km = p(t, T_ABAJO - 0.1, 0.55, E.inOutCubic);
  set(MEAT, { x: 0, y: 360 * km - Math.sin(Math.PI * km) * 80, r: Math.sin(Math.PI * km) * -12 + wobble(t, 0.7, 1.5), s: 1 + 0.08 * bump(t, w(64)) });
  set(FISH, { s: pop(t, T_FISH, 0.4), o: t >= T_FISH ? 1 : 0 });
  set(CAKE, { s: 1 + 0.12 * bump(t, w(81)) + 0.04 * Math.sin(t * 5) * (t < T_ABAJO ? 1 : 0), r: t < T_ABAJO ? shake(t, w(9), 0.4, 4) : 0 });
  set(MILK, { s: 0.9, r: wobble(t, 0.4, 1) });
  /* gotas: caen sobre la tarta mientras la carne está arriba */
  DROPS.forEach((d, i) => { const k = fr(t * 0.9 + i / 3), on = t < T_ABAJO - 0.1; set(d, { x: (i - 1) * 26, y: 70 * k * k - 8, s: 0.5 * (1 - 0.3 * k), o: on && k < 0.9 ? 1 : 0 }); });
  set(PUDDLE, { sx: p(t, T_GOT, 0.4), o: t >= T_GOT ? 1 : 0 });
  set(CK_MEAT, { s: 0.7 * pop(t, T_GOT + 0.4, 0.35), o: t >= T_GOT + 0.4 ? 1 : 0 });
  set(CK_CAKE, { s: 0.7 * pop(t, w(81), 0.35), o: t >= w(81) ? 1 : 0 });
  /* problemas del gancho */
  const hookO = t < T1 ? 1 : 0;
  set(BAD, { s: (1 + 0.08 * Math.sin(t * 7)) * (1 + 0.2 * bump(t, w(2))), r: 6 + wobble(t, 0.8, 4), o: hookO });
  RINGS.forEach((r, i) => set(r, { s: 0.9 + 0.12 * Math.sin(t * 6 + i * 2), o: hookO * (0.75 + 0.25 * Math.sin(t * 6 + i)) }));
  /* vaso con termómetro y su lectura */
  const gk = pop(t, w(34), 0.4);
  set(GLASS, { s: gk * (1 + 0.1 * bump(t, w(42))), o: t >= w(34) && t < T2 ? 1 : 0 });
  const rd = t < T_MIRA ? '?' : t < T_FRIA + 0.5 ? '7°' : '4°';
  GREADi.textContent = rd; GREADi.style.color = rd === '7°' ? RED : rd === '4°' ? '#2f9e5b' : INK;
  set(GREAD, { s: pop(t, w(39), 0.35) * (1 + 0.25 * bump(t, T_MIRA) + 0.25 * bump(t, T_FRIA + 0.5)), o: t >= w(39) && t < T2 ? 1 : 0 });
  /* puerta: brillo «zona menos fría», bebidas y salsas */
  DGLOW.style.opacity = (t >= w(86) && t < TC ? 0.6 + 0.4 * Math.sin(t * 6) : 0);
  DB.forEach((b, i) => set(b, { s: t < TD ? 1 : pop(t, w(93) + i * 0.12, 0.35) * (1 + 0.1 * bump(t, w(93))), r: wobble(t, 0.6, 2, i) }));
  DS.forEach((b, i) => set(b, { s: t < TD ? 1 : pop(t, w(95) + i * 0.12, 0.35), r: wobble(t, 0.7, 2, i + 3) }));
}

/* ================= 0 · GANCHO ================= */
const s0 = scene(-1, T1, { exit: 'cut' });
const H = {};
const shadowSpan = s => `<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">${s}</span>`;
H.title = el('div', s0.el, { left: '40px', top: '262px', width: '1000px', display: 'flex', justifyContent: 'center', columnGap: '0.24em', fontFamily: 'DMSerif', fontSize: '96px', lineHeight: 1.02, color: CREAM, whiteSpace: 'nowrap' }, `${shadowSpan('¿Tu nevera está')}<span class="gold" style="font-style:italic;padding:0 .08em">así</span>${shadowSpan('?')}`);
H.c1 = chip(s0.el, '1 · 🌡️ temperatura', 250, 1290, { size: 40 });
H.c2 = chip(s0.el, '2 · 🥩 orden', 640, 1290, { size: 40 });
s0.upd = t => {
  set(H.title, { o: 1 - p(t, w(5) - 0.15, 0.15), s: 1 + 0.03 * Math.sin(t * 4) });
  chipAnim(H.c1, t, T_DOS, T1 + 1, -3);
  chipAnim(H.c2, t, w(14), T1 + 1, 3);
};

/* ================= 1 · TEMPERATURA: termómetro grande y mando ================= */
const s1 = scene(T1, T2, { exit: 'whip' });
const E1 = {};
E1.th = box(A.bigThermo(), s1.el, 740, 530, 170, 700);
E1.merc = box('', E1.th, 52, 0, 38, 10, { background: 'linear-gradient(90deg,#b80d26,#ff5a4e,#b80d26)', borderRadius: '19px 19px 0 0', transformOrigin: '50% 100%' });
E1.lim = box(`<div style="width:150px;height:0;border-top:7px dashed ${RED}"></div><div style="position:absolute;left:-150px;top:-26px;font-family:Fredoka;font-weight:700;font-size:34px;color:#FF8A80;white-space:nowrap">máx. 5°</div>`, E1.th, 20, 600 - 5 * 52, 150, 10);
E1.goal = chip(s1.el, '✓ 4 °C', 700, 1250, { size: 54, css: { color: '#1f7a45', borderColor: '#2f9e5b' } });
E1.night = chip(s1.el, '🌙 → ☀️ al día siguiente', 300, 1250, { size: 40 });
E1.knob = box(A.knob(), s1.el, 330, 640, 220, 220);
E1.ptr = q(E1.knob, '.ptr');
E1.b = burst(s1.el, 440, 750, T_FRIA + 0.6, 14, 300, 1);
const level = t => { /* temperatura que marca el termómetro grande */
  if (t < w(28)) return 9;
  if (t < T_MIRA) return lerp(9, 4, p(t, w(28), 0.6, E.inOutCubic));
  if (t < T_FRIA) return lerp(4, 7, p(t, T_MIRA, 0.5, E.inOutCubic));
  return lerp(7, 4, p(t, T_FRIA + 0.2, 0.9, E.inOutCubic));
};
s1.upd = t => {
  set(E1.th, { s: pop(t, w(22), 0.45), o: t >= w(22) ? 1 : 0, r: wobble(t, 0.5, 1) });
  const L = level(t), h = Math.max(4, L * 52 + 6);
  E1.merc.style.top = (600 - L * 52) + 'px'; E1.merc.style.height = (40 + L * 52) + 'px';
  set(E1.lim, { o: t >= w(54) ? 1 : 0, sx: p(t, w(54), 0.3) });
  set(E1.goal, { s: pop(t, w(28), 0.4) * (1 + 0.15 * bump(t, T_FRIA + 1.0)) * (t < w(31) || t >= T_FRIA + 0.9 ? 1 : 0), r: -3, o: (t >= w(28) && t < w(31)) || t >= T_FRIA + 0.9 ? 1 : 0 });
  chipAnim(E1.night, t, w(47), T_MIRA + 0.4, -2);
  const kk = pop(t, T_FRIA - 0.05, 0.4) * (1 - p(t, w(57) + 0.5, 0.25));
  set(E1.knob, { s: 0.9 * kk, o: t >= T_FRIA - 0.05 && t < w(57) + 0.75 ? 1 : 0 });
  at(E1.ptr, 'transform', `rotate(${-60 + 120 * p(t, T_FRIA + 0.15, 0.6, E.outBack)})`);
  E1.b.upd(t);
};

/* ================= 2 y 3 · LO CRUDO ABAJO · LA PUERTA (la nevera hace el trabajo) ================= */
const s2 = scene(T2, TC, { enter: 'cut', exit: 'cut' });
const E2 = {};
E2.tag1 = chip(s2.el, '🍰 lo listo, más arriba', 340, 1290, { size: 40 });
E2.tag2 = chip(s2.el, '🥩 crudo: abajo', 450, 1290, { size: 40 });
E2.door = chip(s2.el, '🚪 zona menos fría', 420, 1290, { size: 44, css: { borderColor: '#F2983E' } });
s2.upd = t => {
  chipAnim(E2.tag2, t, w(70), w(81) - 0.05, 3);
  chipAnim(E2.tag1, t, w(81), TD, -3);
  chipAnim(E2.door, t, w(89), TC, -2);
};

/* ================= 4 · GUÁRDALO Y SÍGUEME ================= */
const s4 = scene(TC, LT + 0.4, { enter: 'cut' });
const E4 = {};
E4.bm = box(A.bookmark(), s4.el, 690, 470, 160, 200, { transformOrigin: '80px 100px' });
E4.bmPath = q(E4.bm, '.bm');
E4.list = [['🌡️ Nevera a 4 °C', w(97)], ['💧 Vaso + termómetro', w(98)], ['🥩 Crudo, abajo', w(100)], ['🚪 Puerta: bebidas', w(101)]].map(([tx, t0], i) => ({ e: chip(s4.el, tx, 520, 720 + i * 108, { size: 40, css: { textAlign: 'left' } }), t0 }));
E4.follow = box(`<div style="display:flex;align-items:center;gap:16px;background:#FE2C55;border-radius:22px;padding:16px 38px 20px;box-shadow:0 10px 0 #9c0f2b;font-family:Fredoka;font-weight:700;font-size:58px;color:#fff;white-space:nowrap">＋ Seguir</div>`, s4.el, 540, 1180, 330, 110, { transformOrigin: '165px 55px' });
E4.b = burst(s4.el, 770, 570, w(96) + 0.1, 12, 220, 0.9);
E4.b2 = burst(s4.el, 700, 1230, w(105) + 0.3, 12, 240, 0.9);
s4.upd = t => {
  const fill = t >= w(96) + 0.1;
  E4.bmPath.setAttribute('fill', fill ? '#F6C141' : CREAM);
  set(E4.bm, { s: pop(t, TC, 0.4) * (1 + 0.25 * bump(t, w(96) + 0.1)), r: wobble(t, 0.6, 4) });
  E4.list.forEach(o => set(o.e, { s: 0.92 * pop(t, o.t0, 0.35), x: (1 - p(t, o.t0, 0.3, E.outCubic)) * 60, r: 0, o: t >= o.t0 ? 1 : 0 }));
  const pressed = t >= w(105) + 0.3;
  E4.follow.firstChild.innerHTML = pressed ? '✓ Siguiendo' : '＋ Seguir';
  E4.follow.firstChild.style.background = pressed ? '#2f9e5b' : '#FE2C55';
  E4.follow.firstChild.style.boxShadow = pressed ? '0 10px 0 #1f6b3d' : '0 10px 0 #9c0f2b';
  set(E4.follow, { s: pop(t, w(104), 0.4) * (1 - 0.1 * (p(t, w(105) + 0.15, 0.08) - p(t, w(105) + 0.3, 0.12))) * (1 + 0.05 * Math.sin(t * 6)), o: t >= w(104) ? 1 : 0 });
  E4.b.upd(t); E4.b2.upd(t);
};

/* ================= ABUELA ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 1.5, 'shout'], [1.5, 4.0, 'disgust'], [4.0, 6.5, 'sly'], [6.6, 10.1, 'proud'], [10.2, 15.7, 'happy'], [15.7, 17.7, 'stern'], [17.7, 18.8, 'happy'],
  [18.85, 21.2, 'proud'], [21.2, 23.9, 'happy'], [23.9, 25.2, 'disgust'], [25.2, 27.1, 'happy'], [27.2, 30.9, 'sly'], [31.0, 33.9, 'happy'], [33.9, 35.0, 'wink'], [35.0, 40, 'happy']];
const HANDS = [[0.1, 1.5, 'stop'], [4.1, 6.4, 'up'], [8.0, 9.6, 'up'], [13.3, 14.4, 'point'], [16.5, 17.7, 'wag'], [19.4, 21.1, 'point'], [22.8, 23.8, 'point'], [24.0, 25.0, 'wag'], [27.4, 28.6, 'point'], [31.0, 32.4, 'up'], [34.0, 35.2, 'wave']];
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
const WHIPS = [T1, T2, TC];

/* ================= TITULARES ================= */
H_('Se te estropea *la_comida*', [5, 6, 9], T_DOS);
H_('Dos cosas *hoy_mismo*', [13, 14, 18, 19], T1);
H_('1 · La *temperatura*', [20, 21, 22], w(23));
H_('A unos *4_grados*', [23, 27, 28], w(31));
H_('El truco: un vaso *con_termómetro*', [31, 34, 37, 39], w(40));
H_('En la balda *del_medio*', [40, 42, 43], w(45));
H_('Al día siguiente, *míralo*', [45, 47, 48, 49], w(50));
H_('¿Más de 5? *Más_fría*', [50, 54, 55], T2);
H_('2 · Lo crudo, *siempre_abajo*', [58, 59, 60, 61], w(63));
H_('Carne y pescado: *última_balda*', [64, 67, 70], w(72));
H_('Si gotean, *nada_se_mancha*', [72, 73, 74], TD);
H_('La puerta: *la_menos_fría*', [84, 86, 90], w(92));
H_('Para bebidas *y_salsas*', [92, 93, 94], TC);
H_('*Guárdalo* para cuando la ordenes', [96, 99, 100, 101, 103], w(104));
H_('Y sígueme: *dos_más_cada_día*', [104, 105, 107, 111], LT, { maxH: 200 });
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['error', 0.05, 0.5], ['pop', w(2), 0.6], ['sad', w(9), 0.5], ['pop', T_DOS, 0.6], ['pop2', w(14), 0.6],
 ['whoosh', T1], ['pop', w(22)], ['ding', w(28) + 0.5, 0.7], ['pop', w(34)], ['pop2', w(39)], ['ping', w(42), 0.5], ['swoosh_up', w(47), 0.5], ['ping', T_MIRA, 0.7], ['error', w(54), 0.6],
 ['click', T_FRIA + 0.15], ['click', T_FRIA + 0.3], ['click', T_FRIA + 0.45], ['sparkle', T_FRIA + 0.6, 0.6], ['ding', T_FRIA + 1.0, 0.6],
 ['whoosh', T2], ['swoosh_up', T_ABAJO - 0.1, 0.6], ['thud', T_ABAJO + 0.45, 0.6], ['pop', T_FISH], ['pop2', w(70), 0.6], ['ping', T_GOT + 0.4, 0.6], ['ding', w(81), 0.6],
 ['swoosh_up', w(86), 0.5], ['pop', w(93)], ['pop2', w(93) + 0.12], ['pop', w(95)], ['pop2', w(95) + 0.12],
 ['whoosh', TC], ['ding', w(96) + 0.1, 0.8], ['pop', w(97), 0.5], ['pop2', w(98), 0.5], ['pop', w(100), 0.5], ['pop2', w(101), 0.5], ['pop', w(104), 0.6], ['click', w(105) + 0.15], ['sparkle', w(105) + 0.3, 0.7], ['swoosh_up', LT, 0.5]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
const PUN = [w(2), w(9), w(22), w(28), w(39), T_MIRA, w(54), w(60), T_ABAJO + 0.45, T_FISH, w(81), w(86), w(93), w(96) + 0.1, w(105) + 0.3];
const SHK = [w(9)];
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
    if (s === s4) y -= 1920 * p(t, LT, 0.4, E.inOutCubic);
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
  fridgeUpd(t);
  updHeads(t);
  set(HL, { o: t >= LT ? 0 : 1 });
};
Engine.start({ duration: DUR, captions: { y: 1420, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
