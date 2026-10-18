/* LA LATA DE LA ABUELA — Ep. 6 «La rayita de la pasta de dientes» (formato 1 secreto, ~32 s) */
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


/* ================= 0 · GANCHO: la rayita ================= */
STG.insertAdjacentHTML('beforeend', A.defs6);
const T_DIC = w(8), T_L1 = w(16), T_MEN = w(23), T_S2 = w(24), T_S3 = w(34), T_S4 = w(51), T_ZAS = w(54), T_S5 = w(62), T_S6 = w(76), T_S7 = w(86);
const s0 = scene(-1, T_L1, { exit: 'whip' });
const H = {};
const shadowSpan = s => `<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">${s}</span>`;
H.title = el('div', s0.el, { left: '40px', top: '250px', width: '1000px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.24em', fontFamily: 'DMSerif', fontSize: '108px', lineHeight: 1.02, color: CREAM, whiteSpace: 'nowrap' }, `${shadowSpan('¿Para qué sirve')}<span class="gold" style="font-style:italic;padding:0 .08em">esta rayita</span>${shadowSpan('?')}`);
H.tube = box(A.tube(), s0.el, 190, 760, 700, 240);
H.ring = box(`<div style="width:150px;height:150px;border-radius:50%;border:10px solid #F2D28B;box-shadow:0 0 0 5px ${INK}, 0 0 34px rgba(255,241,196,.95)"></div>`, H.tube, 525, -24, 150, 150);
H.arrow = box(`<svg viewBox="0 0 120 150" width="120" height="150"><path d="M40 0 H80 V80 H116 L60 146 L4 80 H40 Z" fill="url(#goldG)" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></svg>`, s0.el, 0, 0, 120, 150);
H.psst = chip(s0.el, '🤫 dicen que…', 330, 1120, { size: 48 });
/* el centro de la rayita, relativo al centro del tubo */
const MX = 600 - 350, MY = 51 - 120;
s0.upd = t => {
  set(H.title, { o: 1 - p(t, T_DIC - 0.15, 0.15), s: 1 + 0.03 * Math.sin(t * 4) });
  const kz = p(t, w(2) - 0.1, 0.7, E.inOutCubic) * (1 - p(t, T_DIC - 0.1, 0.5, E.inOutCubic)) ;
  const s = lerp(1.25, 1.9, kz) * (1 + 0.02 * Math.sin(t * 2.4));
  set(H.tube, { s, x: lerp(0, -0.65 * MX, kz), y: lerp(0, -0.65 * MY + 40, kz) + wobble(t, 0.6, 6), r: -4 + wobble(t, 0.4, 1.5) });
  set(H.ring, { s: (1 + 0.07 * Math.sin(t * 8)) * (1 + 0.15 * bump(t, w(2))), o: 1 });
  const ax = 190 + 350 + MX * s - 60 + lerp(0, -0.65 * MX, kz), ay = 760 + 120 + MY * s - 200 + lerp(0, -0.65 * MY + 40, kz);
  set(H.arrow, { x: ax, y: ay - 50 - Math.abs(Math.sin(t * 6)) * 30, s: 0.9, o: 1 - p(t, T_DIC, 0.2) });
  chipAnim(H.psst, t, T_DIC + 0.1, T_L1 + 1, -3);
};

/* ================= 1 · EL BULO DE LOS COLORES ================= */
const s1 = scene(T_L1, T_S2, { enter: 'whip', exit: 'whip' });
const E1 = {};
E1.card = box(`<div style="width:860px;background:#fff;border-radius:36px;padding:30px 44px 36px;box-sizing:border-box;box-shadow:0 14px 0 rgba(8,16,48,.45), 0 30px 60px rgba(0,0,0,.35)">
  <div style="font-family:Fredoka;font-weight:500;font-size:32px;color:#8a8f9e;font-style:italic">↪ Reenviado muchas veces</div>
  <div style="font-family:Fredoka;font-weight:700;font-size:54px;color:${RED};margin:8px 0 10px">⚠️ ¡MIRA LA RAYITA!</div>
  <div class="rows"></div></div>`, s1.el, 110, 520, 860, 680, { transformOrigin: '430px 340px' });
const ROWS = [[GREENM, 'Natural', '🌿', w(16)], ['#2E64D8', 'Natural + medicina', '💊', w(17) + 0.2], [RED, 'Natural + química', '🧪', w(18) - 0.35], ['#111115', 'Química pura', '☠️', w(18)]];
E1.rows = ROWS.map(([c, l, ic, t0]) => { const r = el('div', q(E1.card, '.rows'), { position: 'relative', left: 0, top: 0 }, A.chainRow(c, l, ic)); return { r, t0 }; });
E1.stamp = stampEl(s1.el, '¡BULO!', 300, 780, { size: 150 });
E1.b = burst(s1.el, 540, 860, T_MEN, 16, 460, 1.3);
s1.upd = t => {
  const km = p(t, T_MEN, 0.25);
  set(E1.card, { s: pop(t, T_L1, 0.4) * (1 - 0.06 * km), r: lerp(-1.5, 4, km) + wobble(t, 0.4, 1), y: 0 });
  E1.card.style.filter = t >= T_MEN ? `grayscale(${km}) brightness(${1 - 0.25 * km})` : 'none';
  E1.rows.forEach(o => set(o.r, { o: t >= o.t0 ? 1 : 0, x: (1 - p(t, o.t0, 0.25, E.outCubic)) * 60, s: 1 + 0.06 * bump(t, o.t0) }));
  stampAnim(E1.stamp, t, T_MEN, T_S2 + 1, -10);
  E1.b.upd(t);
};

/* ================= 2 · NO ES PARA TI: ES PARA LA MÁQUINA ================= */
const s2 = scene(T_S2, T_S3, { enter: 'whip', exit: 'whip' });
const E2 = {};
E2.tube = box(A.tube(), s2.el, 190, 900, 700, 240);
E2.person = box(A.person('#F2983E', '#6b4a2e'), s2.el, 110, 470, 300, 330, { transformOrigin: '150px 300px' });
E2.cross = box(A.cross(), s2.el, 300, 450, 100, 100);
E2.sensor = box(A.sensor(), s2.el, 600, 430, 220, 300);
E2.beam = box(A.beam(), s2.el, 600, 590, 220, 360, { transformOrigin: '110px 0' });
s2.upd = t => {
  set(E2.tube, { s: 1.2 * pop(t, T_S2, 0.4), r: -3 + wobble(t, 0.5, 1.5) });
  const kp = pop(t, w(25), 0.4) * (1 - p(t, w(30), 0.25));
  set(E2.person, { s: 0.75 * kp, r: wobble(t, 0.8, 4), o: kp > 0.01 ? 1 : 0 });
  set(E2.cross, { s: pop(t, w(29), 0.35) * (1 - p(t, w(30), 0.25)), o: t >= w(29) && t < w(30) + 0.25 ? 1 : 0 });
  const ks = p(t, w(33) - 0.3, 0.45, E.outBack);
  set(E2.sensor, { y: -600 * (1 - ks) });
  set(E2.beam, { sy: Math.max(0.001, p(t, w(33) + 0.15, 0.25)), o: (0.75 + 0.25 * Math.sin(t * 20)) * (t >= w(33) + 0.15 ? 1 : 0) });
};

/* ================= 3 · LA FÁBRICA: cinta + sensor ================= */
const s3 = scene(T_S3, T_S5, { enter: 'whip', exit: 'whip' });
const C3 = card(s3.el, `<svg width="900" height="700"><rect width="900" height="700" fill="#cfd8e6"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 96}" y="0" width="90" height="420" fill="#c2cddd"/>`).join('')}<rect y="420" width="900" height="280" fill="#9aa6ba"/></svg>`);
const E3 = {};
E3.belt = box(A.belt(), C3, -50, 470, 1000, 120);
const TW = 700 * 0.5;
E3.tubes = Array.from({ length: 4 }, (_, i) => box(A.tube({ open: true }), C3, 0, 360, 700, 240, { transformOrigin: '0 0' }));
E3.press = box(A.jaw(true), C3, 0, 0, 160, 360);
E3.sensor = box(A.sensor(), C3, 340, -20, 220, 300);
E3.beam = box(A.beam(), C3, 340, 140, 220, 360, { transformOrigin: '110px 0' });
E3.cut = box(A.tube(), C3, 0, 360, 700, 240, { transformOrigin: '0 0' });
E3.zas = el('div', s3.el, { left: '0', top: '640px', width: '1080px', textAlign: 'center', fontFamily: 'DMSerif', fontSize: '200px', color: CREAM, textShadow: '0 10px 0 #5a0a14, 0 20px 40px rgba(0,0,0,.4)' }, '¡ZAS!');
E3.b = burst(C3, 450, 420, T_ZAS, 16, 380, 1.2);
/* posición x (en la tarjeta) del borde izquierdo de cada tubo; la rayita está a 600*0.5 = 300 px del borde */
const BEAMX = 450, STOPX = BEAMX - 300;
s3.upd = t => {
  /* cinta: velocidad creciente y luego frena para el ¡zas! */
  const v0 = 260, v1 = 620;
  const tStop = T_S4 + 0.2;
  const dist = tt => { const a = clamp(tt - T_S3), kk = p(tt, w(42) - 0.3, 0.6); return v0 * a + (v1 - v0) * Math.max(0, tt - w(42) + 0.3) * kk; };
  const D = dist(Math.min(t, tStop));
  const span = 460;
  let flash = 0;
  E3.tubes.forEach((e, i) => {
    let x = -TW + ((D + i * span) % (span * 4)) - span * 0.5;
    if (t >= tStop) x = -9999;
    set(e, { x, y: 0, s: 0.5 });
    flash = Math.max(flash, 1 - Math.abs(x + 300 - BEAMX) / 40);
  });
  /* el tubo protagonista entra y se para bajo el sensor */
  const ke = p(t, T_S4 - 0.3, 0.9, E.outCubic);
  const cx = lerp(-TW - 100, STOPX, ke);
  const crimped = t >= T_ZAS + 0.12;
  if (E3.cut.dataset.c !== String(crimped)) { E3.cut.innerHTML = crimped ? A.tube() : A.tube({ open: true }); E3.cut.dataset.c = String(crimped); }
  set(E3.cut, { x: cx, y: 0, s: 0.5, o: t >= T_S4 - 0.3 ? 1 : 0 });
  if (t >= T_S4 + 0.5) flash = Math.max(flash, p(t, w(53), 0.1) * (1 - p(t, T_ZAS + 0.4, 0.2)));
  set(E3.beam, { o: (0.45 + 0.55 * clamp(flash)) * (1 - p(t, w(53) + 0.2, 0.15)), sx: 1 + 0.25 * flash });
  const lens = q(E3.sensor, '.lens'), led = q(E3.sensor, '.led');
  lens.setAttribute('fill', flash > 0.3 ? '#FFF1A8' : '#FF5A4E'); led.setAttribute('fill', flash > 0.3 ? '#7BC96F' : '#3d6e38');
  /* prensa: aparece en la fase 2 y baja en el ¡zas! */
  const kd = t < T_ZAS ? 0 : t < T_ZAS + 0.12 ? (t - T_ZAS) / 0.12 : 1 - p(t, T_ZAS + 0.5, 0.35);
  set(E3.sensor, { y: -420 * p(t, w(53) + 0.2, 0.25, E.inCubic) });
  set(E3.press, { x: 382, y: -330 - 120 * (1 - p(t, w(53) + 0.3, 0.3)) + 365 * kd, o: t >= w(53) + 0.3 ? 1 : 0 });
  set(E3.zas, { s: pop(t, T_ZAS, 0.3) * (1 - p(t, w(55) + 0.3, 0.2)), r: -6, o: t >= T_ZAS && t < w(55) + 0.5 ? 1 : 0 });
  E3.b.upd(t);
};

/* ================= 4 · EL COLOR: el que mejor se ve ================= */
const s4 = scene(T_S5, T_S6, { enter: 'whip', exit: 'whip' });
const E4 = {};
E4.rows = [[{ mark: GREENM }, 560, w(64)], [{ body: 'blue', mark: '#FFFFFF' }, 790, w(68)], [{ body: 'red', mark: '#111115' }, 1020, w(70)]].map(([o, y, t0], i) => ({ e: box(A.tube(o), s4.el, 60, y - 120, 700, 240), ck: box(A.check(), s4.el, 760, y - 70, 100, 100), t0, i }));
E4.nada = stampEl(s4.el, 'NADA MÁS', 250, 760, { size: 120 });
s4.upd = t => {
  E4.rows.forEach(o => { set(o.e, { s: 0.8 * pop(t, T_S5 + o.i * 0.12, 0.4), r: -2 + wobble(t, 0.5, 1.2, o.i), o: t >= T_S5 + o.i * 0.12 ? 1 : 0 }); set(o.ck, { s: pop(t, o.t0, 0.35), o: t >= o.t0 ? 1 : 0 }); });
  stampAnim(E4.nada, t, w(74), T_S6 + 1, -8);
};

/* ================= 5 · DE VERDAD: los ingredientes ================= */
const s5 = scene(T_S6, T_S7, { enter: 'whip', exit: 'whip' });
const E5 = {};
E5.front = box(A.tube(), s5.el, 190, 760, 700, 240);
E5.back = box(A.tube({ back: true }), s5.el, 190, 760, 700, 240);
E5.lupa = box(A.lupa('lp6', `<g transform="translate(320 320) scale(2.2) translate(-360 -120)">${A.tube({ back: true }).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`), s5.el, 300, 440, 780, 780, { transformOrigin: '320px 320px' });
s5.upd = t => {
  const kf = p(t, w(78), 0.45, E.inOutCubic);
  const sy = Math.abs(Math.cos(kf * Math.PI)) || 0.001;
  set(E5.front, { s: 1.25 * pop(t, T_S6, 0.4), sy: 1.25 * (kf < 0.5 ? sy : 0.001), r: -2, o: kf < 0.5 ? 1 : 0 });
  set(E5.back, { s: 1.25, sy: 1.25 * (kf >= 0.5 ? sy : 0.001), r: -2, o: kf >= 0.5 ? 1 : 0 });
  set(E5.lupa, { s: 0.62 * pop(t, w(83) - 0.1, 0.45), x: -120 + Math.sin(t * 1.4) * 40, y: 140, r: wobble(t, 0.6, 3), o: t >= w(83) - 0.1 ? 1 : 0 });
};

/* ================= 6 · LLAMADA: ¿te lo creías? ================= */
const s6 = scene(T_S7, LT + 0.4, { enter: 'whip' });
const E6 = {};
E6.tube = box(A.tube(), s6.el, 190, 520, 700, 240);
E6.cm = [[200, 760, 'rosa_m', 'Yo me lo creía 🙈', '#F25244', w(90)], [150, 920, 'juanjo', '¡Mi madre lo jura! 😂', BLUE2, w(91) + 0.1], [220, 1080, 'ana.bcn', 'Me llegó por WhatsApp…', GREENM, w(96)]].map(([x, y, n, tx, c, t0]) => ({ e: comment(s6.el, x, y, n, tx, c), t0 }));
s6.upd = t => {
  set(E6.tube, { s: 0.9 * pop(t, T_S7, 0.4), r: -4 + wobble(t, 0.6, 2) });
  E6.cm.forEach((o, i) => set(o.e, { s: pop(t, o.t0, 0.4), x: (1 - p(t, o.t0, 0.3, E.outCubic)) * 80, r: (i % 2 ? 2 : -2), o: t >= o.t0 ? 1 : 0 }));
};

/* ================= ABUELA ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 2.5, 'wow'], [2.5, 4.4, 'sly'], [4.4, 7.9, 'happy'], [7.9, 9.1, 'wink'], [9.1, 11.9, 'stern'], [11.9, 17.5, 'proud'], [17.5, 18.5, 'sly'], [18.5, 19.4, 'shout'],
  [19.4, 21.3, 'happy'], [21.4, 24.0, 'stern'], [24.0, 25.0, 'proud'], [25.0, 28.4, 'happy'], [28.5, 30.1, 'sly'], [30.1, 31.9, 'wink'], [31.9, 40, 'happy']];
const HANDS = [[0.1, 1.9, 'point'], [4.5, 7.6, 'up'], [7.95, 9.0, 'wag'], [9.2, 10.4, 'wag'], [10.6, 11.8, 'point'], [18.4, 19.4, 'up'], [24.0, 24.9, 'wag'], [26.5, 27.6, 'point'], [30.1, 31.6, 'point']];
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
const WHIPS = [T_L1, T_S2, T_S3, T_S5, T_S6, T_S7];

/* ================= TITULARES ================= */
H_('Dicen que te chiva *lo_que_lleva*', [8, 9, 10, 11, 12, 14], T_L1);
H_('Verde: *natural*', [16, 17], w(18));
H_('Negra: *química_pura*', [18, 19], T_MEN);
H_('Pues es *mentira*', [21, 22, 23], T_S2);
H_('No es *para_ti*', [24, 26, 28], w(30));
H_('Es para *la_máquina*', [30, 31, 32], T_S3);
H_('En la *fábrica*…', [34, 35, 36], w(38));
H_('…a toda *velocidad*', [39, 41, 42], w(43));
H_('Un sensor busca *la_marca*', [44, 45, 48, 50], T_S4);
H_('Cuando la *ve*…', [51, 52, 53], T_ZAS);
H_('Corta y *cierra*', [55, 56, 57], T_S5);
H_('El color que *mejor_se_ve*', [62, 63, 64, 68], w(74));
H_('*Nada_más*', [74], T_S6);
H_('Lo que lleva *de_verdad*…', [76, 77, 78, 79], w(81));
H_('…en los *ingredientes*', [81, 82, 83], T_S7);
H_('¿Tú también *te_lo_creías*?', [86, 87, 88, 90], LT, { maxH: 200 });
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['pop', 0.02, 0.5], ['ding', w(2), 0.5], ['swoosh_up', T_DIC, 0.4], ['pop2', T_DIC + 0.1, 0.6],
 ['whoosh', T_L1], ['msg_in', T_L1 + 0.1, 0.6], ['pop', w(16)], ['pop2', w(17) + 0.2], ['pop', w(18) - 0.35], ['pop2', w(18)], ['stamp', T_MEN], ['glitch', T_MEN + 0.05, 0.6], ['error', T_MEN + 0.1, 0.5],
 ['whoosh', T_S2], ['error', w(29), 0.5], ['swoosh_up', w(33) - 0.3, 0.5], ['ping', w(33) + 0.15, 0.6],
 ['whoosh', T_S3], ...Array.from({ length: 6 }, (_, i) => ['tick', T_S3 + 0.8 + i * 0.75, 0.5]), ['ping', w(50), 0.6],
 ['ping', w(53), 0.7], ['thud', T_ZAS + 0.05], ['stamp', T_ZAS + 0.1], ['boing', w(61), 0.4],
 ['whoosh', T_S5], ['pop', w(64)], ['pop2', w(68)], ['pop', w(70)], ['stamp', w(74)],
 ['whoosh', T_S6], ['swoosh_up', w(78), 0.5], ['sparkle', w(83), 0.6],
 ['whoosh', T_S7], ['msg_in', w(90), 0.6], ['msg_in', w(91) + 0.1, 0.6], ['msg_in', w(96), 0.6], ['swoosh_up', LT, 0.5]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
const PUN = [w(2), w(11), w(17), w(20), w(29), w(33), w(36), w(42), w(50), w(57), w(64), w(73), w(80), w(83), w(90)];
const SHK = [T_MEN, T_ZAS + 0.05];
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
