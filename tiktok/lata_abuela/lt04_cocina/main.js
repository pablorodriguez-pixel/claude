/* LA LATA DE LA ABUELA — Ep. 3 «Lo que haces mal en la cocina» */
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
const DUR = W[W.length - 1].e + 1.45;
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

/* ================= TIEMPOS CLAVE ================= */
const T1 = w(33), T2 = w(58), T3 = w(95) - 0.1, TG = w(123), TP = w(146), TC = w(168) - 0.05;
const MKF = [[-0.12, 205, 2150, 0.72], [0.42, 205, 1150, 0.72, 'back'],
  [52.0, 205, 1150, 0.72], [52.4, 540, 800, 0.95, 'back'], [54.05, 540, 800, 0.95], [54.45, 205, 1150, 0.72],
  [56.0, 205, 1150, 0.72], [56.4, 540, 790, 0.86, 'back'], [LT, 540, 790, 0.86]];
MKF.push([DUR].concat(kf(MKF, 0)));
const EXPR = [[0.1, 1.5, 'shout'], [1.6, 2.6, 'stern'], [2.6, 4.6, 'sly'], [4.8, 7.3, 'happy'], [7.3, 8.8, 'stern'], [8.85, 10.9, 'wow'], [11.1, 12.0, 'proud'], [12.0, 13.9, 'stern'],
  [14.3, 15.8, 'disgust'], [15.9, 18.6, 'stern'], [18.65, 20.2, 'happy'], [20.3, 21.2, 'proud'], [21.9, 23.9, 'stern'], [25.2, 27.0, 'wow'], [27.0, 27.7, 'happy'], [27.8, 29.5, 'stern'],
  [29.6, 31.2, 'sly'], [31.2, 32.8, 'shout'], [33.9, 35.9, 'happy'], [35.9, 37.6, 'stern'], [37.6, 39.0, 'proud'], [39.0, 41.5, 'sly'], [41.6, 43.0, 'wow'], [43.0, 45.7, 'happy'],
  [45.7, 48.6, 'stern'], [48.7, 50.0, 'sly'], [50.0, 51.9, 'happy'], [52.0, 53.5, 'happy'], [53.5, 54.3, 'wink'], [54.3, 56.0, 'happy'], [56.0, 56.9, 'wow'], [57.0, 58.0, 'wink'], [58.0, 62, 'happy']];
const HANDS = [[0.12, 1.5, 'stop'], [1.6, 2.6, 'wag'], [5.4, 6.2, 'up'], [11.9, 13.2, 'wag'], [16.0, 17.6, 'point'], [22.8, 23.8, 'wag'], [25.3, 26.6, 'up'], [29.7, 31.0, 'wag'],
  [34.7, 35.9, 'point'], [37.7, 38.9, 'up'], [42.7, 44.0, 'up'], [46.0, 47.2, 'wag'], [49.9, 51.8, 'up'], [53.56, 54.4, 'point'], [57.2, 58.2, 'wave']];
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

/* ================= BARRA DE PROGRESO 1·2·3 + regalo ================= */
const PB = el('div', OV, { left: '230px', top: '140px', width: '620px', height: '110px', zIndex: 700 });
box('', PB, 52, 46, 516, 14, { background: 'rgba(251,243,226,.22)', borderRadius: '7px' });
const PBfill = box('', PB, 52, 46, 516, 14, { background: 'linear-gradient(90deg,#C08F35,#FFF1C4,#D4A74A)', borderRadius: '7px', transformOrigin: '0 50%' });
const PBX = i => 230 + i * 172 + 52, PBY = 193;
const PBB = [0, 1, 2, 3].map(i => {
  const b = box('', PB, i * 172, 1, 104, 104, { borderRadius: '24px', background: CREAM, border: i === 3 ? '5px dashed rgba(242,210,139,.8)' : '5px solid #D4A74A', boxShadow: i === 3 ? 'none' : '0 6px 0 rgba(8,16,48,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DMSerif', fontSize: '74px', lineHeight: 1, color: BLUE });
  if (i < 3) b.textContent = i + 1; else { b.style.background = 'rgba(251,243,226,.08)'; b.innerHTML = `<span style="color:rgba(242,210,139,.7);font-size:60px">?</span>`; }
  const ck = box(A.check('#D4A74A'), b, 62, -22, 100, 100, { transformOrigin: '0 0' });
  return { b, ck };
});
const PBlock = box(A.lockWow(), PBB[2].b, 44, 34, 240, 280, { transformOrigin: '0 0' });
const PBang = box(A.wow(), PBB[2].b, -26, -26, 120, 120, { transformOrigin: '0 0' });
const PBshk = q(PBlock, '.shackle');
const PBgift = box(A.gift(), PBB[3].b, 4, 2, 200, 210, { transformOrigin: '0 0' });
const PBbG = burst(OV, PBX(3), PBY, TG + 0.45, 12, 160, 0.8);
const PBb3 = burst(OV, PBX(2), PBY, T3, 12, 160, 0.8);
function lockShake(t) { const k = clamp((t - 29.6) / (T3 - 29.6)); const idle = ((t % 3) < 0.35 && t > 0.5) ? Math.sin(t * 50) * 6 : 0; return t < T3 ? (t > 29.6 ? Math.sin(t * 55) * (4 + 14 * k) : idle) : 0; }
function updPB(t) {
  const act = t < T1 ? -1 : t < T2 ? 0 : t < T3 ? 1 : t < TG ? 2 : t < TP ? 3 : -1;
  const pts = [[T1, 0], [T2, 1 / 3], [T3, 2 / 3], [TG, 1]];
  let f = 0; if (t >= T1) { f = 1; for (let i = 0; i < 3; i++) if (t < pts[i + 1][0]) { f = lerp(pts[i][1], pts[i + 1][1], (t - pts[i][0]) / (pts[i + 1][0] - pts[i][0])); break; } }
  if (t >= LT) f = 0;
  set(PBfill, { sx: Math.max(0.001, f) });
  const st = [T1, T2, T3, TG];
  PBB.forEach((o, i) => {
    const done = (t >= st[i] && i !== act && t < LT) || (t >= TP && t < LT && (i < 3 || t >= TG));
    const act1 = i === act;
    if (i < 3) { o.b.style.background = act1 ? RED : done ? 'linear-gradient(135deg,#C08F35,#FFF1C4 50%,#D4A74A)' : CREAM; o.b.style.color = act1 ? CREAM : BLUE; o.b.style.borderColor = act1 ? '#FFF1C4' : '#D4A74A'; }
    else { const g = t >= TG + 0.45 && t < LT; o.b.style.background = g ? (act1 ? RED : 'linear-gradient(135deg,#C08F35,#FFF1C4 50%,#D4A74A)') : 'rgba(251,243,226,.08)'; o.b.style.border = g ? '5px solid #FFF1C4' : '5px dashed rgba(242,210,139,.8)'; o.b.firstChild && o.b.firstChild.tagName === 'SPAN' && (o.b.firstChild.style.opacity = g ? 0 : 1); }
    set(o.b, { s: (act1 ? 1.1 + 0.03 * Math.sin(t * 8) : 1) * (1 + 0.4 * bump(t, st[i] + 0.5)), r: i === 2 && t < T3 ? lockShake(t) * 0.6 : 0 });
    set(o.ck, { s: done && !act1 ? 0.42 * pop(t, (i === 3 ? TP : st[i + 1] || TP) - 0.05, 0.3) : 0, o: done && !act1 ? 1 : 0 });
  });
  const kO = p(t, T3, 0.45, E.outCubic);
  set(PBlock, { s: 0.27 * (t < T3 ? 1 : 1 - kO), y: -60 * kO, r: 40 * kO, o: t < T3 + 0.45 && t < LT ? 1 : t >= LT ? 1 : 0 });
  if (t >= LT) set(PBlock, { s: 0.27, o: 1, y: 0, r: 0 });
  at(PBshk, 'transform', t >= T3 && t < LT ? `translate(0 ${-30 * kO}) rotate(${-35 * kO} 180 128)` : '');
  set(PBang, { s: 0.42 * (t < T3 || t >= LT ? 1 + 0.15 * bump(t, w(28)) : 1 - kO), r: wobble(t, 1.6, 6), o: t < T3 + 0.45 || t >= LT ? 1 : 0 });
  set(PBgift, { s: 0.46 * pop(t, TG + 0.4, 0.4), o: t >= TG + 0.4 && t < LT ? 1 : 0, r: wobble(t, 1, 5) });
  set(PB, { s: pop(t, -0.4, 0.4) });
  PBbG.upd(t); PBb3.upd(t);
}

/* ================= GOLPE ENTRE TRUCOS: la lata escupe el número ================= */
const NP = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px', zIndex: 640 });
const NPf = box('', NP, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 46%, rgba(255,241,196,.6), rgba(15,29,72,.93) 58%)' });
const NPr = box(A.rays(18, 700), NP, 540 - 700, 780 - 700, 1400, 1400);
const NPt = box(A.tin(), NP, 540 - 300, 1120 - 170, 600, 520, { transformOrigin: '300px 170px' });
const NPl = box(A.lid34(), NPt, 0, 40, 600, 260);
const NPn = box(`<div class="gold" style="font-family:DMSerif;font-size:640px;line-height:1;text-align:center;width:600px">1</div>`, NP, 240, 420, 600, 700);
const NPnI = NPn.firstChild;
const NPg = box(A.gift(), NP, 440, 660, 200, 210, { transformOrigin: '100px 105px' });
const NPgl = q(NPg, '.glid');
const NPb = [T1, T2, T3, TG].map(T => burst(NP, 540, 760, T + 0.2, 14, 420, 1.3));
const GOLPES = [{ t: T1, n: 1 }, { t: T2, n: 2 }, { t: T3, n: 3, noTin: 1 }, { t: TG, gift: 1 }];
function updNP(t) {
  const g = GOLPES.find(g => t >= g.t - 0.04 && t < g.t + 0.56);
  NP.style.display = g ? 'block' : 'none'; if (!g) return;
  const T = g.t;
  set(NPf, { o: (g.noTin ? 0.55 : 1) * p(t, T - 0.04, 0.06) * (1 - p(t, T + 0.4, 0.15)) });
  set(NPr, { r: t * 40, o: 0.9 * (1 - p(t, T + 0.38, 0.16)), s: 0.6 + 0.5 * p(t, T, 0.4) });
  set(NPt, { s: g.noTin ? 0 : 0.72 * pop(t, T - 0.04, 0.18) * (1 - p(t, T + 0.4, 0.15)), o: g.noTin ? 0 : 1 });
  const kl = p(t, T + 0.02, 0.3);
  set(NPl, { x: -260 * kl, y: -520 * kl, r: -50 * kl, o: 1 - kl });
  const kn = p(t, T + 0.04, 0.24, E.outBack), ke = p(t, T + 0.36, 0.19, E.inCubic);
  const i = g.gift ? 3 : g.n - 1, tx = PBX(i) - 540, ty = PBY - 770;
  const base = { x: tx * ke, y: (g.noTin ? 0 : 360 * (1 - kn)) * (1 - ke) + ty * ke, s: (0.15 + 0.95 * kn) * lerp(1, 0.14, ke), r: (1 - kn) * -20 };
  if (g.gift) { set(NPn, { o: 0 }); set(NPg, Object.assign({}, base, { s: base.s * 2.2, o: 1 })); at(NPgl, 'transform', `translate(${-60 * p(t, T + 0.22, 0.2)} ${-140 * p(t, T + 0.22, 0.2)}) rotate(${-30 * p(t, T + 0.22, 0.2)} 100 60)`); }
  else { NPnI.textContent = g.n; set(NPg, { o: 0 }); set(NPn, Object.assign({}, base, { o: 1 })); }
  NPb.forEach(b => b.upd(t));
}

/* bacterias reutilizables */
const BCOL = [['#7BC96F', '#4d9a45'], ['#B48CE8', '#8a62c4'], ['#F2983E', '#c97420'], ['#7BC96F', '#4d9a45'], ['#B48CE8', '#8a62c4'], ['#F2983E', '#c97420']];
function bact(parent, i, mood = 'grin') { const [c, c2] = BCOL[i % 6]; return cbox(A.bact(c, c2, mood), parent, 0, 0, 128, 128); }

/* ================= 0 · GANCHO / PORTADA ================= */
const s0 = scene(0, 4.75, { exit: 'whip' });
const H = {};
H.sink = box(`<svg viewBox="0 0 640 140" width="640" height="140" style="overflow:visible"><ellipse cx="326" cy="80" rx="316" ry="58" fill="rgba(5,12,40,.35)"/><ellipse cx="320" cy="70" rx="316" ry="58" fill="url(#silverG)" stroke="${INK}" stroke-width="6"/><ellipse cx="320" cy="74" rx="270" ry="40" fill="#4b5263" stroke="${INK}" stroke-width="4"/><ellipse cx="320" cy="84" rx="26" ry="9" fill="#2b2f3a"/><path d="M90 54 Q200 22 330 20" stroke="#fff" stroke-width="7" opacity=".6" fill="none" stroke-linecap="round"/></svg>`, s0.el, 300, 1060, 640, 140);
H.tap = box(A.tap('#C8102E', 'x'), s0.el, 304, 530, 300, 470, { transformOrigin: '0 0' });
H.str = stream(s0.el, 588, 742, 26, 130);
H.ck = box(A.chicken(), s0.el, 370, 790, 440, 300, { transformOrigin: '230px 280px' });
H.drip = cbox(A.drop(WATER), s0.el, 601, 760, 60, 84);
H.spl = splash(s0.el, 601, 868, 10, 1.15);
H.t1 = el('div', s0.el, { left: '0', top: '262px', width: '1080px', textAlign: 'center', fontFamily: 'DMSerif', fontSize: '118px', lineHeight: 1, color: CREAM, textShadow: '0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, 'EL POLLO CRUDO');
H.t2w = el('div', s0.el, { left: '0', top: '398px', width: '1080px', display: 'flex', justifyContent: 'center' });
H.t2 = el('div', H.t2w, { position: 'relative', background: RED, color: CREAM, fontFamily: 'DMSerif', fontSize: '128px', lineHeight: 1, padding: '6px 44px 20px', borderRadius: '30px', border: '7px solid #F2D28B', boxShadow: '0 12px 0 #5a0a14, 0 24px 40px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, '¿LO LAVAS?');
H.mala = stampEl(s0.el, '¡MALA IDEA!', 330, 900, { size: 92 });
H.hands = [[150, 640, 6], [810, 620, 8], [140, 830, 9], [850, 830, 11], [470, 640, 12]].map(([x, y, wi]) => ({ e: cbox(`<div style="font-size:96px;line-height:1">🙋</div>`, s0.el, x, y, 110, 110), t0: w(wi) }));
H.todos = el('div', s0.el, { left: '0', top: '1200px', width: '1080px', display: 'flex', justifyContent: 'center' });
H.todosIn = el('div', H.todos, { position: 'relative', left: '120px', background: CREAM, color: BLUE, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '44px', padding: '8px 30px 12px', borderRadius: '100px', border: '5px solid #D4A74A', whiteSpace: 'nowrap', boxShadow: '0 8px 0 rgba(8,16,48,.4)' }, '¡Casi todo el mundo!');
H.b = burst(s0.el, 600, 960, w(5) + 0.05, 14, 420, 1.2);
function hookUpd(t) {
  set(H.t1, { s: 1 + 0.05 * bump(t, w(2)), y: wobble(t, 0.5, 4) });
  set(H.t2, { s: (1 + 0.08 * bump(t, 0.12)) * (1 + 0.04 * Math.sin(t * 5)), r: -3 + wobble(t, 0.7, 2) });
  set(H.tap, { s: 1.25, r: 0 });
  H.str(t, 1, 1);
  const dk = fr((t * 1.6) + 0.5);
  set(H.drip, { y: 10 + dk * 70, s: 0.85 + 0.1 * Math.sin(t * 9), sy: 1 + 0.2 * dk, o: dk < 0.95 ? 1 : 0 });
  set(H.ck, { s: 1.28 * (1 + 0.03 * Math.sin(t * 7)) * (1 + 0.08 * bump(t, w(3))), r: -3 + wobble(t, 0.9, 2.5) + shake(t, w(5), 0.4, 5) });
  H.spl(t, 1);
  set(H.sink, { s: 1 });
  stampAnim(H.mala, t, w(5), 4.9, -9);
  H.hands.forEach((o, i) => set(o.e, { s: pop(t, o.t0, 0.35) * (1 + 0.08 * Math.sin(t * 8 + i)), r: Math.sin(t * 6 + i) * 10, o: t >= o.t0 ? 1 : 0 }));
  set(H.todosIn, { s: pop(t, w(8), 0.4) * (1 + 0.08 * bump(t, w(13))), r: -3, o: t >= w(8) ? 1 : 0 });
  H.b.upd(t);
}
s0.upd = hookUpd;

/* ================= 1 · PROMESA ================= */
const s1 = scene(4.75, T1 + 0.45, { enter: 'whip' });
const P = {};
P.rays = box(A.rays(16, 600), s1.el, -60, 160, 1200, 1200);
P.seals = [0, 1, 2].map(i => box(A.seal(i + 1), s1.el, [220, 540, 860][i] - 150, 680 - 150, 300, 370, { transformOrigin: '150px 150px' }));
P.icons = [`<div style="font-size:84px;line-height:1">🍗</div>`, `<div style="font-size:84px;line-height:1">🥚</div>`, `<div style="font-size:84px;line-height:1">🍅</div>`];
P.qs = [0, 1, 2].map(i => cbox(`<div style="font-family:DMSerif;font-size:110px;color:#FFF1C4;text-shadow:0 6px 0 #0b1946">?</div>`, s1.el, [220, 540, 860][i], 960, 120, 130));
P.kit = box(`<div style="font-size:92px;line-height:1">🍳</div>`, s1.el, 480, 990, 120, 120);
P.lock = box(A.lockWow(), s1.el, 540 - 120, 760 - 140, 240, 280);
P.marks = el('div', s1.el, { left: '640px', top: '560px', fontFamily: 'DMSerif', fontSize: '120px', color: '#FFF1C4', textShadow: '0 6px 0 #0b1946' }, '!?');
s1.upd = t => {
  const k2 = p(t, w(27), 0.5, E.inOutCubic);
  set(P.rays, { r: t * 12, o: 0.25 + 0.6 * k2, s: 0.8 + 0.25 * k2 });
  P.seals.forEach((e, i) => {
    const t0 = w(16) + i * 0.15, k = pop(t, t0, 0.45);
    let x = 0, y = 0, s = 0.72 * k;
    if (i < 2) { x = lerp(0, i ? -240 : -40, k2); y = lerp(0, -130, k2); s *= lerp(1, 0.62, k2); }
    else { x = lerp(0, -320, k2); y = lerp(0, 40, k2); s *= lerp(1, 1.5, k2); }
    set(e, { x, y: y + wobble(t, 0.6, 6, i * 0.3), s, r: wobble(t, 0.4, 3, i) + (i === 2 ? lockShake(t + 20) : 0), o: i < 2 ? lerp(1, 0.6, k2) : 1 });
  });
  P.qs.forEach((e, i) => { const t0 = w(19) + i * 0.15; set(e, { s: pop(t, t0, 0.35) * (1 - k2), y: wobble(t, 0.8, 8, i), r: Math.sin(t * 4 + i) * 8, o: t >= t0 && k2 < 1 ? 1 : 0 }); });
  set(P.kit, { s: pop(t, w(22), 0.4) * out(t, w(24) + 0.2) * (1 + 0.1 * Math.sin(t * 6)), y: -120, r: wobble(t, 1, 8), o: t >= w(22) && t < w(24) + 0.2 ? 1 : 0 });
  const kl = pop(t, w(28), 0.4);
  set(P.lock, { s: kl * (1 + 0.08 * bump(t, w(32))), y: 120, r: shake(t, w(32), 0.5, 10) + Math.sin(t * 30) * 2, o: t >= w(28) ? 1 : 0 });
  set(P.marks, { s: pop(t, w(32), 0.3) * (1 + 0.1 * Math.sin(t * 9)), r: 10 + wobble(t, 1.2, 6), o: t >= w(32) ? 1 : 0 });
};

/* ================= 3 · TRUCO 1: el pollo ================= */
const s3 = scene(T1 + 0.45, T2 + 0.45);
const K = {};
K.panel = box(A.kitchen(), s3.el, 80, 470, 860, 620, { transformOrigin: '430px 310px' });
K.ck = box(A.chicken(), K.panel, 250, 258, 440, 300, { transformOrigin: '0 0' });
K.str = stream(K.panel, 373, 220, 24, 80);
K.spl = splash(K.panel, 385, 296, 8, 0.8);
K.cross = cbox(A.cross(), K.panel, 520, 230, 100, 100);
const KT = [[150, 382, 46], [440, 376, 46], [560, 372, 48], [700, 374, 48], [690, 556, 51], [770, 560, 51]];
K.bs = KT.map(([x, y, wi], i) => ({ e: bact(K.panel, i), x, y, t0: w(wi) + (i % 2) * 0.12, sx: 385 + [-150, -60, 40, 130, -110, 160][i], sy: [170, 110, 100, 160, 60, 70][i] }));
K.lab = [['fregadero', 60, 448, 46], ['encimera', 520, 236, 48], ['trapos', 440, 528, 51]].map(([tx, x, y, wi]) => ({ e: chip(K.panel, tx, x, y, { size: 34, css: { background: RED, color: CREAM, border: '4px solid #F2D28B' } }), t0: w(wi) }));
K.towel = q(K.panel, '.towel');
/* sartén */
K.pz = box('', s3.el, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
K.flames = Array.from({ length: 7 }, (_, i) => box(A.flameOne(), K.pz, 230 + i * 74, 950, 80, 110, { transformOrigin: '40px 100px' }));
K.burner = box(A.burner(), K.pz, 230, 1040, 560, 70);
K.pan = box(A.pan(), K.pz, 230, 740, 700, 300);
K.ckR = box(A.chicken(), K.pz, 335, 670, 440, 300, { transformOrigin: '220px 150px' });
K.ckC = box(A.chicken(COOK, COOK2, 'happy'), K.pz, 335, 670, 440, 300, { transformOrigin: '220px 150px' });
K.pb = [[440, 770], [550, 735], [650, 790]].map(([x, y], i) => ({ e: cbox(A.bact(BCOL[i][0], BCOL[i][1], 'scared'), K.pz, x, y, 128, 128), x, y }));
K.gh = [[440, 770], [550, 735], [650, 790]].map(([x, y]) => cbox(A.ghost(), K.pz, x, y, 120, 150));
K.steam = Array.from({ length: 5 }, (_, i) => cbox(`<svg viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="30" fill="#fff" opacity=".75"/></svg>`, K.pz, 380 + i * 70, 720, 80, 80));
K.fuego = chip(K.pz, '🔥 bien hecho', 600, 560, { size: 34 });
K.b = burst(K.pz, 540, 700, w(57), 14, 380, 1.1);
s3.upd = t => {
  const TP1 = w(52) - 0.05;
  const kOut = p(t, TP1, 0.3, E.inCubic);
  set(K.panel, { s: pop(t, T1 + 0.45, 0.4) * (1 - 0.3 * kOut) * (1 + 0.04 * bump(t, w(41))), x: -1100 * kOut, r: wobble(t, 0.3, 0.6) - 8 * kOut, o: kOut < 1 ? 1 : 0 });
  if (kOut < 1) {
    const wet = t < w(52);
    K.str(t, wet ? 1 : 0, 1);
    K.spl(t, t >= w(39) ? 1 : 0.5);
    set(K.ck, { s: 0.55 * (1 + 0.06 * bump(t, w(37))), x: shake(t, w(41), 0.4, 4) });
    set(K.cross, { s: pop(t, w(34), 0.35) * out(t, w(39) + 0.2), r: -8, o: t >= w(34) && t < w(39) + 0.2 ? 1 : 0 });
    K.bs.forEach((o, i) => {
      const tOut = w(43) - 0.15 + i * 0.05, kp = p(t, tOut, 0.35, E.outBack), kf2 = p(t, o.t0, 0.38, E.inOutCubic);
      const hx = lerp(385, o.sx, kp), hy = lerp(330, o.sy, kp);
      const x = lerp(hx, o.x, kf2), y = lerp(hy, o.y, kf2) - Math.sin(Math.PI * kf2) * 120;
      const land = bump(t, o.t0 + 0.38);
      const bob = t > o.t0 + 0.38 ? Math.abs(Math.sin(t * 7 + i)) * -10 : wobble(t, 1.4, 8, i);
      set(o.e, { x, y: y + bob, s: 0.62 * kp * (1 + 0.25 * land), sx: 1 + 0.25 * land, sy: 1 - 0.25 * land, r: Math.sin(t * 5 + i) * 10 + (1 - kf2) * kf2 * 300, o: t >= tOut ? 1 : 0 });
    });
    K.lab.forEach(o => set(o.e, { s: pop(t, o.t0 + 0.2, 0.35), r: -3 + wobble(t, 0.6, 2), o: t >= o.t0 + 0.2 ? 1 : 0 }));
    at(K.towel, 'transform', `rotate(${(Math.sin(t * 2) * 1.5 + shake(t, w(51) + 0.4, 0.4, 3)).toFixed(2)} 715 494)`);
  }
  // sartén
  const kp2 = pop(t, TP1 + 0.1, 0.45);
  set(K.pz, { s: kp2, o: t >= TP1 + 0.1 ? 1 : 0 });
  if (t >= TP1) {
    K.flames.forEach((e, i) => set(e, { sy: 0.8 + 0.25 * Math.sin(t * 13 + i * 1.7), sx: 0.9 + 0.1 * Math.sin(t * 9 + i), s: p(t, w(53), 0.3) * (1 + 0.3 * p(t, w(54), 0.3)), o: 1 }));
    const kc = p(t, w(54), 0.6);
    set(K.ckR, { s: 0.72, y: Math.sin(t * 20) * 2 * kc, o: 1 - kc });
    set(K.ckC, { s: 0.72 * (1 + 0.08 * bump(t, w(54) + 0.6)), y: Math.sin(t * 20) * 2 * kc, o: kc });
    const kd = p(t, w(57), 0.25, E.inCubic);
    K.pb.forEach((o, i) => set(o.e, { s: 0.85 * pop(t, TP1 + 0.3 + i * 0.1, 0.35) * (1 - kd), x: shake(t, w(54), 2.0, 6), y: -Math.abs(Math.sin(t * 12 + i)) * 16, r: Math.sin(t * 18 + i) * 12, o: t >= TP1 + 0.3 && kd < 1 ? 1 : 0 }));
    K.gh.forEach((e, i) => { const k = p(t, w(57) + 0.05 + i * 0.08, 1.2, E.outCubic); set(e, { s: 1.0 * pop(t, w(57) + i * 0.08, 0.3), y: -260 * k, x: Math.sin(t * 4 + i) * 20, o: t >= w(57) + i * 0.08 ? 1 - 0.6 * k : 0 }); });
    K.steam.forEach((e, i) => { const ph = ((t * 0.7) + i / 5) % 1; set(e, { y: -200 * ph, x: Math.sin(ph * 6 + i) * 20, s: 0.5 + ph, o: t >= w(53) ? 0.8 * Math.sin(Math.PI * ph) : 0 }); });
    chipAnim(K.fuego, t, w(54), T2 + 0.45, 4);
  }
  K.b.upd(t);
};

/* ================= 4 · TRUCO 2: los huevos ================= */
const s4 = scene(T2 + 0.45, 29.55);
const EG = {};
EG.z = box('', s4.el, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
EG.shield = cbox(A.shield(), EG.z, 540, 810, 300, 360);
EG.egg = cbox(A.egg(), EG.z, 540, 800, 240, 300);
EG.mH = q(EG.egg, '.mH'); EG.mS = q(EG.egg, '.mS');
EG.tap = box(A.tap('#2A4FA8', 'x'), EG.z, 470, 470, 300, 470, { transformOrigin: '0 0' });
EG.str = stream(EG.z, 600, 554, 22, 140);
EG.spl = splash(EG.z, 611, 640, 8, 0.9);
EG.cross = cbox(A.cross(), EG.z, 760, 700, 100, 100);
EG.carton = box(`<svg viewBox="0 0 460 170" width="460" height="170" style="overflow:visible"><path d="M10 20 L450 20 L420 160 L40 160 Z" fill="#D9C2A0" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${[120, 230, 340].map(x => `<path d="M${x} 30 v120" stroke="#b79e78" stroke-width="6"/>`).join('')}<rect x="150" y="60" width="160" height="56" rx="10" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><text x="230" y="98" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="30" fill="${BLUE}">HUEVOS</text></svg>`, EG.z, 310, 930, 460, 170);
EG.capa = chip(EG.z, '✨ capa protectora', 640, 1010, { size: 36 });
EG.cas = chip(EG.z, 'cáscara', 150, 640, { size: 34 });
EG.bs = [[-1, 0], [1, 1], [-1, 2], [1, 3]].map(([sd, i]) => ({ e: bact(EG.z, i + 1), sd, i }));
EG.sponge = cbox(A.sponge(), EG.z, 540, 780, 240, 150);
EG.bub = Array.from({ length: 7 }, (_, i) => cbox(A.bubble(14 + (i % 3) * 6), EG.z, 540, 780, 60, 60));
EG.shards = Array.from({ length: 8 }, (_, i) => cbox(`<svg viewBox="0 0 50 50" width="50" height="50"><path d="M6 6 L44 14 L20 44 Z" fill="rgba(127,227,255,.6)" stroke="#fff" stroke-width="3"/></svg>`, EG.z, 540, 800, 50, 50));
EG.no = cbox(A.cross(), EG.z, 760, 640, 100, 100);
EG.sp = Array.from({ length: 5 }, (_, i) => cbox(A.sparkle(), EG.z, 540 + Math.cos(i * 1.3) * 180, 800 + Math.sin(i * 1.3) * 210, 60, 60));
s4.upd = t => {
  const zin = p(t, w(67), 0.5, E.inOutCubic);
  set(EG.z, { s: 1 + 0.12 * zin });
  const kq = p(t, w(77) - 0.1, 0.2), kQ = p(t, w(80), 0.3);
  // huevo
  const dip = p(t, w(64), 0.4, E.outBack) * (1 - p(t, w(67) - 0.1, 0.4, E.inOutCubic));
  set(EG.egg, { s: 1.3 * pop(t, T2 + 0.45, 0.45) * (1 + 0.06 * bump(t, w(60))) * (1 - 0.15 * dip), y: 70 * dip + Math.sin(t * 3) * 6, x: kq > 0 && kQ < 1 ? shake(t, w(77), 1.0, 6) : 0, r: wobble(t, 0.5, 2) });
  const sad = t >= w(80) + 0.1 || (t >= w(61) && t < w(64));
  EG.mH.style.opacity = sad ? 0 : 1; EG.mS.style.opacity = sad ? 1 : 0;
  // grifo
  const tapOn = t >= w(61) - 0.1 && t < w(64);
  set(EG.tap, { s: 0.75 * pop(t, w(61) - 0.15, 0.3) * out(t, w(64), 0.15), o: tapOn ? 1 : 0 });
  EG.str(t, tapOn ? p(t, w(61), 0.1) : 0, 1);
  EG.spl(t, tapOn && t >= w(61) + 0.1 ? 1 : 0);
  set(EG.cross, { s: pop(t, w(63), 0.3) * out(t, w(64) + 0.1), r: -8, o: t >= w(63) && t < w(64) + 0.1 ? 1 : 0 });
  set(EG.carton, { s: pop(t, w(64), 0.4) * (1 - p(t, w(67) - 0.1, 0.3, E.inCubic)), y: 0, o: t >= w(64) && t < w(67) + 0.2 ? 1 : 0 });
  // escudo
  const ks = p(t, w(71) - 0.05, 0.4, E.outBack);
  const shOn = t >= w(71) - 0.05 && kQ < 1;
  set(EG.shield, { s: 1.3 * ks * (1 + 0.05 * Math.sin(t * 6)) * (1 + 0.12 * bump(t, w(74))) * (1 + 0.3 * kQ), o: shOn ? (1 - kQ) * (0.85 + 0.15 * Math.sin(t * 10)) * (kq > 0 ? 1 - 0.45 * clamp((t - w(77)) / 0.9) : 1) : 0, x: kq > 0 ? shake(t, w(77), 1.0, 6) : 0 });
  set(EG.cas, { s: pop(t, w(68), 0.35) * out(t, w(71)), r: -4, o: t >= w(68) && t < w(71) ? 1 : 0 });
  chipAnim(EG.capa, t, w(71) + 0.1, w(77), 3);
  EG.sp.forEach((e, i) => { const ph = ((t * 0.9) + i / 5) % 1; set(e, { s: shOn ? 0.6 * Math.sin(Math.PI * ph) : 0, r: t * 90, o: shOn ? 1 : 0 }); });
  // bacterias que rebotan (protege) y luego vuelven (quitas)
  EG.bs.forEach(o => {
    const t0 = w(72) + o.i * 0.12, k = clamp((t - t0) / 0.5), hit = k < 0.6 ? E.outCubic(k / 0.6) : 1 - 0.55 * E.outBack(clamp((k - 0.6) / 0.4));
    const by = 640 + o.i * 115;
    let x = 540 + o.sd * lerp(470, 215, hit), y = by;
    const kb = p(t, w(80) + 0.15 + o.i * 0.08, 0.5, E.outCubic);
    if (t >= w(80)) x = lerp(x, 540 + o.sd * 175, kb);
    set(EG.bs[o.i].e, { x, y: y + wobble(t, 1.3, 10, o.i), s: 0.82 * (t >= t0 ? 1 : 0) * (1 + 0.3 * bump(t, t0 + 0.3)), r: Math.sin(t * 6 + o.i) * 12, o: t >= t0 ? 1 : 0 });
  });
  // esponja
  const spOn = t >= w(77) - 0.1 && t < w(80) + 0.5;
  const sx = Math.sin((t - w(77)) * 14) * 110;
  set(EG.sponge, { x: sx, y: Math.cos((t - w(77)) * 14) * 30, s: 0.9 * pop(t, w(77) - 0.1, 0.25) * out(t, w(80) + 0.5), r: sx * 0.1, o: spOn ? 1 : 0 });
  EG.bub.forEach((e, i) => { const ph = ((t * 1.3) + i / 7) % 1; set(e, { x: Math.cos(i * 2.1) * 140 * ph, y: -60 - 200 * ph + Math.sin(i) * 60, s: 0.6 + 0.6 * ph, o: spOn ? Math.sin(Math.PI * ph) : 0 }); });
  EG.shards.forEach((e, i) => { const a = i / 8 * Math.PI * 2; set(e, { x: Math.cos(a) * 320 * kQ, y: Math.sin(a) * 360 * kQ, r: 300 * kQ, s: 1.2, o: kQ > 0 && kQ < 1 ? 1 : 0 }); });
  set(EG.no, { s: pop(t, w(80) + 0.1, 0.3), r: -8 + wobble(t, 1, 4), o: t >= w(80) + 0.1 ? 1 : 0 });
};

/* ================= 5 · ESPERA… el 3 (candado) ================= */
const s5 = scene(29.55, T3 + 0.45);
const F = {};
F.rays = box(A.rays(16, 600), s5.el, -60, 180, 1200, 1200);
F.seal = box(A.seal(3), s5.el, 540 - 150, 780 - 150, 300, 370, { transformOrigin: '150px 150px' });
F.chains = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><g stroke="#9aa3b2" stroke-width="22" stroke-dasharray="40 14" stroke-linecap="round"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g><g stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="40 14" opacity=".5"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g></svg>`, s5.el, 140, 380, 800, 800);
F.lock = box(A.lockWow(), s5.el, 540 - 120, 840 - 140, 240, 280, { transformOrigin: '120px 190px' });
F.shk = q(F.lock, '.shackle');
F.people = [[420, 1150], [560, 1180], [700, 1150], [840, 1080]].map(([x, y], i) => ({ e: cbox(`<div style="font-size:92px;line-height:1">${['🙋‍♀️', '🙋', '🙋‍♂️', '🙋‍♀️'][i]}</div>`, s5.el, x, y, 110, 110), i }));
F.parts = Array.from({ length: 10 }, (_, i) => box(`<svg viewBox="0 0 60 60" width="60" height="60"><path d="M10 10 L50 18 L40 52 Z" fill="${i % 2 ? 'url(#goldG)' : '#9aa3b2'}" stroke="${INK}" stroke-width="4"/></svg>`, s5.el, 510, 800, 60, 60));
F.b = burst(s5.el, 540, 800, T3, 18, 520, 1.6);
s5.upd = t => {
  const kx = p(t, T3, 0.35, E.outCubic);
  set(F.rays, { r: t * 20, o: 0.35 + 0.6 * kx });
  set(F.seal, { s: pop(t, 29.6, 0.4) * (1 + 0.25 * kx), r: lockShake(t) * 0.3 });
  set(F.chains, { s: pop(t, 29.7, 0.35) * (1 + 0.5 * kx), r: lockShake(t) * 0.2, o: 1 - kx });
  set(F.lock, { s: 1.15 * pop(t, 29.75, 0.4) * (1 + 0.1 * bump(t, w(85))) * (1 + 1.2 * kx), r: lockShake(t), o: 1 - kx, y: -200 * kx });
  at(F.shk, 'transform', t >= w(92) ? `translate(0 ${-20 * p(t, w(92), 0.3)})` : '');
  F.people.forEach(o => { const t0 = w(90) + o.i * 0.1; set(o.e, { s: pop(t, t0, 0.35) * (1 - kx), y: -Math.abs(Math.sin(t * 7 + o.i)) * 14, r: Math.sin(t * 5 + o.i) * 8, o: t >= t0 && kx < 1 ? 1 : 0 }); });
  F.parts.forEach((e, i) => { const a = i / 10 * Math.PI * 2; set(e, { x: Math.cos(a) * 520 * kx, y: Math.sin(a) * 520 * kx, r: 400 * kx, s: 1.4, o: t >= T3 && kx < 1 ? 1 : 0 }); });
  F.b.upd(t);
};

/* ================= 6 · TRUCO 3: el tomate ================= */
const s6 = scene(T3 + 0.45, TG + 0.45);
const TO = {};
TO.fr = cbox(A.fridge(), s6.el, 330, 800, 380, 560, { transformOrigin: '190px 280px' });
TO.snow = Array.from({ length: 10 }, (_, i) => cbox(A.flake(), s6.el, 0, 0, 60, 60));
TO.cold = cbox(A.tomato({ scarf: true }), s6.el, 0, 0, 240, 240);
TO.coldS = q(TO.cold, '.mS'); TO.coldH = q(TO.cold, '.mH');
at(TO.coldS, 'opacity', 1); at(TO.coldH, 'opacity', 0);
TO.main = cbox(A.tomato(), s6.el, 540, 820, 240, 240);
TO.ripe = cbox(A.tomato({ ripe: true }), s6.el, 0, 0, 240, 240);
TO.bowl = cbox(A.bowl(), s6.el, 770, 980, 400, 240);
TO.happy = cbox(A.tomato(), s6.el, 770, 900, 240, 240);
TO.bowlFront = box(`<svg viewBox="0 0 400 240" width="400" height="240" style="overflow:visible"><path d="M14 96 L386 96 Q376 214 200 218 Q24 214 14 96 Z" fill="#FBF3E2" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M26 128 Q200 150 374 128" stroke="${BLUE2}" stroke-width="14" fill="none"/>${[80, 130, 180, 230, 280, 330].map(x => `<circle cx="${x}" cy="${f1(178 - Math.abs(x - 200) * 0.08)}" r="7" fill="#F2D28B" stroke="${INK}" stroke-width="2.5"/>`).join('')}<rect x="6" y="88" width="388" height="16" rx="8" fill="#FBF3E2" stroke="${INK}" stroke-width="5"/></svg>`, s6.el, 570, 860, 400, 240, { transformOrigin: '200px 120px' });
TO.fuera = stampEl(s6.el, '¡FUERA!', 600, 560, { size: 80 });
TO.sab = el('div', s6.el, { left: '590px', top: '520px', background: CREAM, border: '5px solid #D4A74A', borderRadius: '24px', padding: '6px 22px 10px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '40px', color: BLUE, whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(8,16,48,.4)' });
TO.sabT = el('span', TO.sab, { position: 'relative' }, 'sabor ');
TO.stars = [0, 1, 2].map(() => el('span', TO.sab, { position: 'relative', display: 'inline-block', fontSize: '46px' }, '★'));
TO.leak = Array.from({ length: 6 }, (_, i) => cbox(A.sparkle(), s6.el, 0, 0, 60, 60));
TO.x = cbox(A.cross(), s6.el, 470, 560, 100, 100);
TO.ok = cbox(A.check(GREEN), s6.el, 900, 820, 100, 100);
TO.okSp = Array.from({ length: 5 }, (_, i) => cbox(A.sparkle(), s6.el, 770 + Math.cos(i * 1.25) * 170, 880 + Math.sin(i * 1.25) * 120, 60, 60));
TO.mad = chip(s6.el, '✔ solo si está muy maduro', 390, 1150, { size: 38, css: { background: '#E7F6EC', color: GREEN, border: '4px solid ' + GREEN } });
TO.b = burst(s6.el, 770, 900, w(111), 12, 300, 1);
s6.upd = t => {
  const tA = w(97), tF = w(98), tC = w(102) - 0.05, tB = w(108) - 0.05, tM = w(115);
  // fase A: tomate feliz en el centro; «fuera» → nevera aparece y el tomate salta a la derecha
  const kj = p(t, w(100) - 0.1, 0.5, E.inOutCubic), kAo = p(t, tC, 0.2, E.inCubic);
  set(TO.main, { s: 1.5 * pop(t, tA, 0.45) * lerp(1, 0.8, kj) * (1 - kAo), x: lerp(0, 230, kj), y: -Math.sin(Math.PI * kj) * 220 + lerp(0, 40, kj), r: 360 * kj + wobble(t, 0.6, 4), o: t >= tA - 0.05 && kAo < 1 ? 1 : 0 });
  stampAnim(TO.fuera, t, tF + 0.6, tC, -8);
  // nevera: A (pequeña izq.) → C (primer plano centrado) → B (izq.)
  let fx = 330, fy = 800, fs = 0.8 * pop(t, tF, 0.4);
  const kC = p(t, tC, 0.35, E.inOutCubic), kB = p(t, tB, 0.4, E.inOutCubic);
  fx = lerp(fx, 580, kC); fy = lerp(fy, 820, kC); fs = lerp(fs, 1.15, kC);
  fx = lerp(fx, 300, kB); fy = lerp(fy, 820, kB); fs = lerp(fs, 0.82, kB);
  set(TO.fr, { x: fx - 330, y: fy - 800, s: fs * (1 + 0.04 * bump(t, tM)), r: wobble(t, 0.4, 1), o: t >= tF ? 1 : 0 });
  // tomate con bufanda dentro (estante) — sigue a la nevera
  const cx = fx + (190 - 190) * fs, cy = fy + (290 - 280) * fs;
  const shiver = Math.sin(t * 60) * 4;
  set(TO.cold, { x: cx + shiver, y: cy - 0, s: 0.62 * fs * pop(t, tC + 0.15, 0.35), o: t >= tC + 0.15 ? 1 : 0, r: Math.sin(t * 40) * 2 });
  TO.snow.forEach((e, i) => { const ph = ((t * 0.45) + i / 10) % 1; set(e, { x: fx + (-120 + (i * 53) % 260) * fs + Math.sin(t * 2 + i) * 12, y: fy - 230 * fs + ph * 470 * fs, s: 0.6 * fs, r: t * 60 + i * 30, o: t >= tC + 0.1 ? Math.sin(Math.PI * ph) : 0 }); });
  // medidor de sabor
  const sabOn = t >= tC + 0.3 && t < tB;
  set(TO.sab, { s: pop(t, tC + 0.3, 0.35) * out(t, tB), r: 3, o: sabOn ? 1 : 0 });
  TO.stars.forEach((e, i) => { const off = t >= w(107) + 0.1 + (2 - i) * 0.12; e.style.color = off ? '#c9bfa6' : '#D4A74A'; set(e, { s: 1 + 0.5 * bump(t, w(107) + 0.1 + (2 - i) * 0.12), r: off ? 20 : 0 }); });
  TO.leak.forEach((e, i) => { const t0 = w(105) + i * 0.15, k = p(t, t0, 0.9, E.outCubic); set(e, { x: cx + Math.cos(i * 1.7) * 60 + Math.sin(i * 2.3) * 160 * k, y: cy - 40 - 300 * k, s: 0.8 * (1 - k), r: 200 * k, o: t >= t0 && k < 1 && t < tB ? 1 : 0 }); });
  // fase B: frutero
  set(TO.x, { s: pop(t, tB + 0.3, 0.35), r: -8, x: 0, o: t >= tB + 0.3 ? 1 : 0 });
  const kbw = pop(t, w(111) - 0.1, 0.45);
  set(TO.bowl, { s: kbw, o: t >= w(111) - 0.1 ? 1 : 0 });
  set(TO.bowlFront, { s: kbw, o: t >= w(111) - 0.1 ? 1 : 0 });
  set(TO.happy, { s: 0.85 * pop(t, w(111), 0.45) * (1 + 0.05 * Math.sin(t * 5)), y: -Math.abs(Math.sin(t * 4)) * 10, r: wobble(t, 0.7, 4), o: t >= w(111) ? 1 : 0 });
  set(TO.ok, { s: pop(t, w(111) + 0.3, 0.35), o: t >= w(111) + 0.3 ? 1 : 0 });
  TO.okSp.forEach((e, i) => { const ph = ((t * 0.8) + i / 5) % 1; set(e, { s: t >= w(111) ? 0.7 * Math.sin(Math.PI * ph) : 0, r: t * 80, o: t >= w(111) ? 1 : 0 }); });
  // fase M: tomate muy maduro entra en la nevera
  const kr = p(t, w(121), 0.55, E.inOutCubic);
  const rx0 = 540, ry0 = 1060;
  set(TO.ripe, { x: lerp(rx0, fx, kr), y: lerp(ry0, fy + 110 * 0.82, kr) - Math.sin(Math.PI * kr) * 200, s: 0.7 * pop(t, w(119), 0.4) * lerp(1, 0.75, kr), r: wobble(t, 0.6, 5) + 20 * kr, o: t >= w(119) ? 1 : 0 });
  chipAnim(TO.mad, t, w(120), TG + 0.45, -2);
  TO.b.upd(t);
};

/* ================= 7 · REGALO: dos tablas ================= */
const s7 = scene(TG + 0.45, TP);
const RG = {};
RG.gift = cbox(A.gift(), s7.el, 540, 820, 200, 210);
RG.glid = q(RG.gift, '.glid');
RG.bR = box(A.cutBoard('#E0413A', '#b02a24'), s7.el, 60, 610, 420, 290, { transformOrigin: '190px 145px' });
RG.bG = box(A.cutBoard('#3E9B4F', '#2e7a3c'), s7.el, 520, 610, 420, 290, { transformOrigin: '190px 145px' });
RG.ck = cbox(A.chicken(), s7.el, 254, 745, 440, 300);
RG.sal = cbox(A.salad(), s7.el, 712, 750, 280, 190);
RG.lR = el('div', s7.el, { left: '120px', top: '850px', background: '#E0413A', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '44px', padding: '6px 28px 10px', borderRadius: '100px', border: '5px solid ' + CREAM, boxShadow: '0 6px 0 rgba(8,16,48,.4)', whiteSpace: 'nowrap' }, 'LO CRUDO');
RG.lG = el('div', s7.el, { left: '580px', top: '850px', background: '#3E9B4F', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '44px', padding: '6px 28px 10px', borderRadius: '100px', border: '5px solid ' + CREAM, boxShadow: '0 6px 0 rgba(8,16,48,.4)', whiteSpace: 'nowrap' }, 'LO DEMÁS');
RG.arr = box(A.arrow(), s7.el, 250, 450, 520, 200);
RG.arrP = q(RG.arr, '.arr');
const AQ = k => { const P0 = [270, 600], P1 = [510, 410], P2 = [720, 580]; const u = 1 - k; return [u * u * P0[0] + 2 * u * k * P1[0] + k * k * P2[0], u * u * P0[1] + 2 * u * k * P1[1] + k * k * P2[1]]; };
RG.bs = [0, 1, 2].map(i => ({ e: bact(s7.el, i + 2), s: cbox(A.bact(BCOL[(i + 2) % 6][0], BCOL[(i + 2) % 6][1], 'scared'), s7.el, 0, 0, 128, 128) }));
RG.x = cbox(`<svg viewBox="0 0 220 220" width="220" height="220"><circle cx="110" cy="110" r="96" fill="rgba(200,16,46,.15)" stroke="${RED}" stroke-width="18"/><path d="M50 50 L170 170 M170 50 L50 170" stroke="${RED}" stroke-width="24" stroke-linecap="round"/></svg>`, s7.el, 510, 520, 200, 200);
RG.ok = cbox(A.check(GREEN), s7.el, 860, 660, 100, 100);
RG.b = burst(s7.el, 540, 820, TG + 0.6, 14, 360, 1.1);
s7.upd = t => {
  const gOut = p(t, w(126) - 0.1, 0.3, E.inCubic);
  set(RG.gift, { s: 2.0 * pop(t, TG + 0.45, 0.4) * (1 - gOut), r: wobble(t, 1.2, 4), o: gOut < 1 ? 1 : 0 });
  at(RG.glid, 'transform', `translate(${-30 * p(t, TG + 0.65, 0.25)} ${-70 * p(t, TG + 0.65, 0.25)}) rotate(${-25 * p(t, TG + 0.65, 0.25)} 100 60)`); RG.glid.style.opacity = 1 - p(t, TG + 0.8, 0.2);
  set(RG.bR, { s: 0.95 * pop(t, w(127), 0.45) * (1 + 0.05 * bump(t, w(130))), r: -3 + wobble(t, 0.4, 1), o: t >= w(127) ? 1 : 0 });
  set(RG.ck, { s: 0.62 * pop(t, w(129), 0.4) * (1 + 0.1 * bump(t, w(142))), r: -6 + wobble(t, 0.9, 3), o: t >= w(129) ? 1 : 0 });
  set(RG.lR, { s: pop(t, w(130), 0.35), r: -4, o: t >= w(130) ? 1 : 0 });
  set(RG.bG, { s: 0.95 * pop(t, w(132), 0.45) * (1 + 0.05 * bump(t, w(135))), r: 3 + wobble(t, 0.4, 1), o: t >= w(132) ? 1 : 0 });
  set(RG.sal, { s: 1.0 * pop(t, w(134), 0.4) * (1 + 0.1 * bump(t, w(145))), r: wobble(t, 0.8, 3), o: t >= w(134) ? 1 : 0 });
  set(RG.lG, { s: pop(t, w(135), 0.35), r: 4, o: t >= w(135) ? 1 : 0 });
  const ka = p(t, w(136), 0.45);
  at(RG.arrP, 'stroke-dashoffset', (-t * 60).toFixed(1));
  set(RG.arr, { o: ka, s: 0.9 + 0.1 * ka });
  set(RG.x, { s: (t < w(137) + 0.05 ? 0 : 1 + 1.2 * (1 - p(t, w(137) + 0.05, 0.16, E.inCubic))) * (1 + 0.06 * Math.sin(t * 6)), r: -8, o: t >= w(137) + 0.05 ? 1 : 0 });
  RG.bs.forEach((o, i) => {
    const t0 = w(138) + i * 0.22, k = clamp((t - t0) / 0.8);
    const blocked = k >= 0.42; const kk = blocked ? 0.42 - (0.12 + i * 0.1) * E.outCubic(clamp((t - t0 - 0.336) / 0.6)) : k;
    const [x, y] = AQ(kk * 0.95 + 0.02);
    const vis = t >= t0;
    set(o.e, { x, y: y - 40 - Math.abs(Math.sin(t * 10 + i)) * 14, s: 0.72 * pop(t, t0, 0.3), r: Math.sin(t * 9 + i) * 12, o: vis && !blocked ? 1 : 0 });
    set(o.s, { x, y: y - 40 + Math.abs(Math.sin(t * 6 + i)) * -6, s: 0.72, r: shake(t, t0 + 0.34, 0.5, 14), o: vis && blocked ? 1 : 0 });
  });
  set(RG.ok, { s: pop(t, w(145), 0.35), o: t >= w(145) ? 1 : 0 });
  RG.b.upd(t);
};

/* ================= 8 · ENCUESTA ================= */
const s8 = scene(TP - 0.05, 51.98, { enter: 'whip', exit: 'whip' });
const PO = {};
PO.card = box('', s8.el, 80, 470, 860, 470, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
const icons = [[A.chicken(), 440, 300, 0.24, 690], [A.egg(), 240, 300, 0.33, 715], [A.tomato(), 240, 240, 0.42, 712]];
PO.rows = ['Lavar el pollo crudo', 'Lavar los huevos', 'Tomate a la nevera'].map((txt, i) => {
  const r = box('', PO.card, 26, 26 + i * 142, 796, 126, { borderRadius: '28px', border: '4px solid transparent' });
  const n = box(`<div style="width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#8A6420,#F2D28B 45%,#FFF1C4 55%,#C08F35);border:4px solid #5a3d0c;display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:58px;color:${BLUE}">${i + 1}</div>`, r, 14, 15, 96, 96);
  el('div', r, { left: '126px', top: '12px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: '40px', color: BLUE, whiteSpace: 'nowrap' }, txt);
  const tr = box('', r, 126, 74, 540, 26, { background: '#e6dcc6', borderRadius: '13px', overflow: 'hidden' });
  const fill = box('', tr, 0, 0, 540, 26, { background: 'linear-gradient(90deg,#C08F35,#F2D28B,#D4A74A)', borderRadius: '13px', transformOrigin: '0 50%' });
  const [sv, ww, hh, sc, ix] = icons[i]; const ic = box(sv, r, ix, 63 - hh * sc / 2, ww, hh, { transformOrigin: '0 0' }); set(ic, { s: sc });
  return { r, fill, n };
});
const tSay = [w(150), w(152), w(155)], fills = [0.62, 0.48, 0.85];
PO.coms = [['L', RED, '@lola_cocina', '¡El 1! Yo lavaba el pollo siempre 😳'], ['P', BLUE2, '@pepe.gm', 'El tomate, a la nevera de cabeza… 🙈']].map(([ini, c, u, txt], i) => {
  const b = el('div', s8.el, { left: '370px', top: px(975 + i * 150), width: '570px', background: '#FFFFFF', borderRadius: '26px', padding: '12px 20px 14px 96px', boxShadow: '0 8px 0 rgba(8,16,48,.35)', border: '3px solid #e6dcc6' });
  b.innerHTML = `<div style="position:absolute;left:16px;top:14px;width:64px;height:64px;border-radius:50%;background:${c};color:#fff;font-family:Fredoka;font-weight:700;font-size:34px;display:flex;align-items:center;justify-content:center">${ini}</div><div style="font-family:Fredoka;font-weight:600;font-size:24px;color:#8a8f9c">${u}</div><div style="font-family:Fredoka;font-weight:500;font-size:32px;line-height:1.15;color:${INK}">${txt}</div><div style="position:absolute;right:16px;top:12px;font-size:26px;color:#c9ccd4">♡</div>`;
  return b;
});
s8.upd = t => {
  set(PO.card, { s: pop(t, TP, 0.45), r: wobble(t, 0.3, 0.6) });
  PO.rows.forEach((o, i) => {
    const t0 = tSay[i], act = t >= t0 && (i === 2 || t < tSay[i + 1]);
    o.r.style.borderColor = act ? RED : 'transparent'; o.r.style.background = act ? 'rgba(200,16,46,.07)' : 'transparent';
    set(o.r, { s: 1 + 0.05 * bump(t, t0), o: t >= TP + 0.15 + i * 0.1 ? 1 : 0 });
    set(o.fill, { sx: Math.max(0.001, fills[i] * p(t, TP + 0.6 + i * 0.15, 1.4, E.outCubic)) });
    set(o.n, { r: shake(t, t0, 0.35, 8), s: 1 + 0.2 * bump(t, t0) });
  });
  PO.coms.forEach((b, i) => { const t0 = w(149) + 0.2 + i * 0.7; set(b, { x: 600 * (1 - p(t, t0, 0.4, E.outBack)), o: t >= t0 ? 1 : 0, r: (i % 2 ? 1 : -1) * 1.2 }); });
};

/* ================= 9 · CIERRE: marca (lata + medallón), SEGUIR, compartimentos, tapa ================= */
const s9 = scene(51.98, DUR + 0.1, { enter: 'whip' });
const CT = {};
CT.rays = box(A.rays(20, 700), s9.el, 540 - 700, 800 - 700, 1400, 1400);
CT.lidA = box(A.lidFace({ id: 'lfA' }), s9.el, 90, 350, 900, 900);
(function buildTray() {
  let beads = ''; for (let i = 0; i < 56; i++) { const a = i / 56 * Math.PI * 2; beads += `<circle cx="${f1(400 + 381 * Math.cos(a))}" cy="${f1(400 + 381 * Math.sin(a))}" r="5" fill="#F7DFA0" stroke="#7a5418" stroke-width="1.6"/>`; }
  const rows = [3, 4, 5, 4, 3]; let cells = '', k = 0; const scal = (r, n) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r - 6; d += (i ? 'L' : 'M') + f1(rr * Math.cos(a)) + ' ' + f1(rr * Math.sin(a)); } return d + 'Z'; };
  const ic = ['🍗', '🥚', '🍅', '🎁'];
  rows.forEach((n, ri) => { for (let c = 0; c < n; c++) { const x = 400 + (c - (n - 1) / 2) * 140, y = 400 + (ri - 2) * 128; k++;
    const lit = k <= 4;
    cells += `<g class="cell" data-k="${k}" transform="translate(${x} ${y})"><g class="ci"><path d="${scal(64, 18)}" fill="#FFFDF7" stroke="#bfb39a" stroke-width="3"/><circle r="48" fill="${lit ? '#FFF6DE' : '#EFE6D2'}" stroke="#e2d8c4" stroke-width="3"/>
      ${lit ? `<circle r="60" fill="none" stroke="url(#goldG)" stroke-width="8"/><text y="14" text-anchor="middle" font-size="44">${ic[k - 1]}</text><text y="44" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">${k < 4 ? 'Nº ' + k : 'regalo'}</text>` : `<text class="qm" y="18" text-anchor="middle" font-family="DMSerif" font-size="56" fill="#c9bfa6">?</text>`}</g></g>`; } });
  CT.tray = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><circle cx="412" cy="414" r="398" fill="rgba(5,12,40,.4)"/><circle cx="400" cy="400" r="398" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="6"/>${beads}<circle cx="400" cy="400" r="368" fill="#0f1d48" stroke="#5a3d0c" stroke-width="4"/>${cells}</svg>`, s9.el, 140, 370, 800, 800);
})();
CT.cells = qa(CT.tray, '.cell').map(c => ({ ci: q(c, '.ci'), k: +c.dataset.k }));
CT.btn = el('div', s9.el, { left: '430px', top: '1170px', width: '440px', height: '108px', borderRadius: '60px', background: '#FE2C55', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em', boxShadow: '0 10px 0 #9e1033, 0 20px 40px rgba(0,0,0,.35)', border: '5px solid #fff' }, '+ SEGUIR');
CT.big = el('div', s9.el, { left: '0', top: '1060px', width: '1080px', display: 'flex', justifyContent: 'center' });
CT.bigIn = el('div', CT.big, { position: 'relative', borderRadius: '80px', background: '#FE2C55', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '104px', padding: '14px 64px 22px', boxShadow: '0 14px 0 #9e1033, 0 30px 50px rgba(0,0,0,.4)', border: '8px solid #fff', whiteSpace: 'nowrap' }, '+ SEGUIR');
CT.ripple = box('', s9.el, 540 - 60, 1140 - 60, 120, 120, { borderRadius: '50%', border: '8px solid #fff' });
CT.lid = box(A.lidFace({ id: 'lfE' }), s9.el, 90, 340, 900, 900);
CT.lidSpec = q(CT.lid, '.lidspec'); CT.lidASpec = q(CT.lidA, '.lidspec');
CT.tag = el('div', s9.el, { left: '0', top: '1170px', width: '1080px', display: 'flex', justifyContent: 'center' });
CT.tagIn = el('div', CT.tag, { position: 'relative', background: 'linear-gradient(100deg,#8A6420 0%,#D4A74A 22%,#FFF1C4 40%,#F2D28B 50%,#C08F35 72%,#8A6420 100%)', border: '4px solid #5a3d0c', borderRadius: '100px', padding: '10px 36px 14px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '40px', color: BLUE, boxShadow: '0 8px 0 rgba(8,16,48,.45)', whiteSpace: 'nowrap' }, 'Ep. 3 · Lo que haces mal en la cocina');
CT.b0 = burst(s9.el, 540, 800, 52.15, 16, 460, 1.3);
CT.b1 = burst(s9.el, 540, 790, TC + 0.25, 18, 480, 1.4);
s9.upd = t => {
  set(CT.rays, { r: t * 10, o: 0.55 });
  // tapa con medallón (marca) → se levanta al decir «en esta lata»
  const kOpen = p(t, w(162) - 0.1, 0.4, E.inCubic);
  set(CT.lidA, { s: 0.92 * pop(t, 52.0, 0.4) * (1 + 0.04 * bump(t, w(159))), y: -1600 * kOpen, r: 20 * kOpen + wobble(t, 0.3, 1), o: t < w(162) + 0.35 ? 1 : 0 });
  at(CT.lidASpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  const kb = pop(t, w(160), 0.4), kbo = p(t, w(162) - 0.1, 0.25, E.inCubic);
  set(CT.bigIn, { s: kb * (1 - kbo) * (t >= w(160) + 0.45 && t < w(160) + 0.6 ? 0.92 : 1), r: -3 + wobble(t, 1, 2), o: t >= w(160) && kbo < 1 ? 1 : 0 });
  const rk = p(t, w(160) + 0.45, 0.5);
  set(CT.ripple, { s: 0.5 + 3 * rk, o: t >= w(160) + 0.45 && rk < 1 ? 1 - rk : 0 });
  set(CT.tray, { s: 0.8 * pop(t, w(162), 0.45) * (1 + 0.04 * bump(t, w(166))), r: wobble(t, 0.25, 1.2) + shake(t, TC + 0.25, 0.35, 5), o: t >= w(162) && t < TC + 0.3 ? 1 : 0 });
  CT.cells.forEach(o => {
    let s = 1, tw = 0;
    if (o.k <= 4) s = 1 + 0.06 * Math.sin(t * 5 + o.k);
    else { s = 1 + 0.3 * bump(t, w(166) + (o.k - 5) * 0.05); tw = bump(t, w(166) + (o.k - 5) * 0.05); }
    at(o.ci, 'transform', `scale(${s.toFixed(3)})`);
    const qm = q(o.ci, '.qm'); if (qm) qm.setAttribute('fill', tw > 0.3 ? '#D4A74A' : '#c9bfa6');
  });
  set(CT.btn, { s: pop(t, w(162), 0.4) * (1 + 0.035 * Math.sin(t * 7)) * out(t, TC, 0.15), r: wobble(t, 0.6, 1.5), o: t >= w(162) && t < TC ? 1 : 0 });
  const lidK = p(t, TC, 0.25, E.inCubic), endOn = t >= TC;
  set(CT.lid, { s: lerp(1.3, 0.8, lidK) * (1 + 0.03 * bump(t, TC + 0.27)), r: lerp(-25, 0, lidK) + wobble(t, 0.3, 0.8), o: endOn ? clamp(lidK * 1.5) : 0, y: 10 + shake(t, TC + 0.25, 0.35, 10) });
  at(CT.lidSpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  set(CT.tag, { s: pop(t, TC + 0.6, 0.45) * (1 + 0.03 * Math.sin(t * 4)), o: t >= TC + 0.6 ? 1 : 0 });
  CT.b0.upd(t); CT.b1.upd(t);
};

/* ================= TRANSICIONES ================= */
const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
const WHIPS = [4.75, TP, 51.98, 29.55];

/* ================= TITULARES ================= */
H_('Tres cosas que haces *en_la_cocina*', [16, 17, 18, 19, 22], w(23));
H_('…y *no_deberías*', [23, 24], w(26));
H_('La última te va a *sorprender*', [27, 28, 29, 30, 32], T1 - 0.05);
H_('No laves el pollo *crudo*', [34, 35, 36, 37, 38], w(39));
H_('El agua *salpica*…', [39, 40, 41], w(42));
H_('…las *bacterias*', [42, 43], w(44));
H_('Fregadero, encimera *y_trapos*', [46, 48, 49], w(52) - 0.05);
H_('Con cocinarlo *bien*…', [52, 53, 54], w(55));
H_('…ya se *mueren*', [55, 56, 57], T2 - 0.05);
H_('Los *huevos*…', [59, 60], w(61));
H_('…tampoco los *laves*', [61, 62, 63], w(64));
H_('antes de *guardarlos*', [64, 65, 66], w(67));
H_('La cáscara tiene una *capa*', [67, 68, 69, 70, 71], w(72));
H_('…que los *protege*', [72, 73, 74], w(75));
H_('Y al lavarlos *se_la_quitas*', [75, 76, 77, 78], 29.55);
H_('Espera… el 3 lo hace *todo_el_mundo*', [82, 85, 86, 89, 90], T3 - 0.05);
H_('El *tomate*…', [96, 97], w(98));
H_('…*fuera* de la nevera', [98, 99, 100, 101], w(102) - 0.05);
H_('El frío le quita el *sabor*', [102, 103, 104, 105, 106, 107], w(108) - 0.05);
H_('Guárdalo en el *frutero*', [108, 109, 110, 111], w(112));
H_('A la nevera, solo si está *muy_maduro*', [113, 115, 116, 117, 119, 120], TG - 0.05, { maxH: 190 });
H_('Y uno de *regalo*', [122, 123, 124, 125], w(126));
H_('Una tabla para lo *crudo*', [126, 127, 128, 129, 130], w(131));
H_('…y otra para *lo_demás*', [131, 132, 133, 134], w(136));
H_('Así no pasas *bacterias*', [136, 137, 138, 139], w(140));
H_('…de la carne a la *ensalada*', [140, 141, 142, 143, 144, 145], TP - 0.05, { maxH: 100 });
H_('¿Cuál hacías *mal*?', [146, 147, 148], 51.98);
H_('Aquí la abuela *Carmen*', [156, 157, 158, 159], w(160));
H_('*Sígueme*', [160], w(161));
H_('En esta lata hay *muchos_más*…', [162, 163, 164, 165, 166], w(168));
H_('…y me los sé *todos*', [168, 170, 171, 172, 173], LT);
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['whoosh', 0.02, 0.6], ['squish', 0.15, 0.5], ['pop', w(2), 0.6], ['stamp', w(5) + 0.05, 1], ['boing', w(3), 0.5], ['pop', w(6), 0.6], ['pop2', w(8), 0.6], ['pop', w(9), 0.6], ['pop2', w(11), 0.6], ['pop', w(12), 0.6],
 ['whoosh', 4.75], ['pop', w(16)], ['pop2', w(16) + 0.15], ['pop', w(16) + 0.3], ['tick', w(19), 0.6], ['tick', w(20), 0.6], ['tick', w(21), 0.6], ['ding', w(22), 0.6], ['error', w(24), 0.6], ['click', w(28)], ['boing', w(32), 0.8],
 ['pop', T1], ['stamp', T1 + 0.22], ['paper', T1 + 0.5, 0.6], ['error', w(34), 0.7], ['squish', w(41), 0.8], ['burst', w(43), 0.6], ['pop', w(46) + 0.4], ['pop2', w(48) + 0.4], ['pop', w(51) + 0.4], ['whoosh', w(52) - 0.05, 0.7],
 ['gulp', w(53), 0.5], ['sparkle', w(54) + 0.5, 0.6], ['tada', w(57), 0.7],
 ['pop', T2], ['stamp', T2 + 0.22], ['whoosh', T2 + 0.45, 0.5], ['squish', w(61), 0.6], ['error', w(63), 0.7], ['thud', w(64) + 0.1, 0.6], ['pop', w(68), 0.6], ['sparkle', w(71)], ['ping', w(72) + 0.3, 0.7], ['ping', w(72) + 0.42, 0.7], ['ping', w(72) + 0.54, 0.7], ['ping', w(72) + 0.66, 0.6],
 ['squish', w(77), 0.7], ['glitch', w(80), 0.6], ['sad', w(80) + 0.15, 0.5],
 ['tick', 29.8, 0.7], ['tick', 30.3, 0.7], ['tick', 30.8, 0.7], ['tick', 31.3, 0.8], ['tick', 31.8, 0.9], ['pop', w(90), 0.6], ['pop2', w(91), 0.6], ['burst', T3], ['stamp', T3 + 0.22],
 ['pop', w(97)], ['boing', w(98) + 0.15, 0.7], ['pop2', w(100)], ['stamp', w(98) + 0.6, 0.8], ['whoosh', w(102) - 0.05, 0.6], ['sad', w(107), 0.6], ['pop', w(108) + 0.25], ['pop2', w(111)], ['ding', w(111) + 0.3, 0.7], ['boing', w(121), 0.6], ['ding', w(121) + 0.5, 0.6],
 ['pop', TG], ['tada', TG + 0.25, 0.8], ['pop', w(127)], ['pop2', w(129)], ['pop', w(132)], ['pop2', w(134)], ['swoosh_up', w(136), 0.6], ['stamp', w(137) + 0.05], ['boing', w(138) + 0.34, 0.6], ['boing', w(138) + 0.56, 0.5], ['ding', w(145), 0.7],
 ['whoosh', TP], ['pop', w(150)], ['pop2', w(152)], ['pop', w(155)], ['msg_in', w(149) + 0.2, 0.6], ['msg_in', w(149) + 0.9, 0.6],
 ['whoosh', 51.98], ['bell', 52.1, 0.6], ['pop', w(160)], ['click', w(160) + 0.45], ['swoosh_up', w(162) - 0.1, 0.6], ['pop2', w(162)], ['sparkle', w(166), 0.7], ['thud', TC + 0.27], ['tada', TC + 0.6, 0.7], ['swoosh_up', LT, 0.5]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
const PUN = [w(3), w(6), w(13), w(16), w(32), w(37), w(41), w(46), w(48), w(51), w(57), w(60), w(63), w(71), w(80), w(92), w(97), w(101), w(107), w(111), w(121), w(130), w(135), w(145), w(148), w(155), w(160), w(173)];
const SHK = [w(5) + 0.05, w(41), T3, w(80), w(137) + 0.05, TC + 0.27];
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
    if (s === s9) y -= 1920 * p(t, LT, 0.4, E.inOutCubic);
    if (loop) { y = 1920 * (1 - p(t, LT, 0.4, E.inOutCubic)); x = 0; s.upd(t - DUR); }
    else s.upd(t);
    set(s.el, { x, y });
  });
  granny(t);
  let b = 0; PUN.forEach(ti => b = Math.max(b, bump(t, ti)));
  let sx = 0, sy = 0; SHK.forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
  set(CAM, { s: 1 + 0.075 * b, x: sx, y: sy });
  let sk = 0; WHIPS.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
  STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i) }));
  updHeads(t); updPB(t); updNP(t);
  set(HL, { o: t >= LT ? 0 : 1 });
};
Engine.start({ duration: DUR, captions: { y: 1380, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
