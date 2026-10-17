/* LA LATA DE LA ABUELA — Ep. 2 «Trucos del súper» */
const STG = document.getElementById('stage');
STG.insertAdjacentHTML('beforeend', A.defs);
const GOLD = document.getElementById('goldG');
const at = (e, k, v) => e.setAttribute(k, v);
const q = (r, s) => r.querySelector(s);
const qa = (r, s) => Array.from(r.querySelectorAll(s));
const px = v => v + 'px';
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(7);
const bump = (t, ti) => { if (t < ti) return 0; const d = t - ti; return d < 0.12 ? E.outCubic(d / 0.12) : Math.exp(-(d - 0.12) * 3.2); };
const out = (t, t1, d = 0.15) => 1 - p(t, t1 - d, d, E.inCubic);
const box = (html, parent, x, y, w, h, extra = {}) => el(html || 'div', parent, Object.assign({ left: px(x), top: px(y), width: px(w), height: px(h) }, extra));
const DUR = W[W.length - 1].e + 0.6;

/* ================= FONDO ================= */
const BG = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', overflow: 'hidden', background: 'radial-gradient(ellipse 95% 62% at 50% 40%, #3260bd 0%, #1F3C88 52%, #11275c 100%)' });
const patSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><g fill='%23F2D28B'><circle cx='60' cy='49' r='6'/><circle cx='71' cy='60' r='6'/><circle cx='60' cy='71' r='6'/><circle cx='49' cy='60' r='6'/></g><circle cx='60' cy='60' r='4' fill='%23FFF1C4'/><g fill='%23F2D28B'><circle cx='0' cy='0' r='3'/><circle cx='120' cy='0' r='3'/><circle cx='0' cy='120' r='3'/><circle cx='120' cy='120' r='3'/></g><path d='M0 60 h18 M102 60 h18 M60 0 v18 M60 102 v18' stroke='%23F2D28B' stroke-width='2'/></svg>`;
const PAT = el('div', BG, { left: '-240px', top: '-240px', width: '1560px', height: '2400px', opacity: 0.13, backgroundImage: `url("data:image/svg+xml;utf8,${patSvg}")`, backgroundSize: '120px 120px' });
const SHEEN = el('div', BG, { left: '0', top: '-400px', width: '380px', height: '2800px', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,240,200,.09), rgba(255,255,255,0))' });
el('div', BG, { left: 0, top: 0, width: '1080px', height: '1920px', background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(4,10,35,.55) 100%)' });
el('div', BG, { left: '22px', top: '22px', width: '1036px', height: '1876px', border: '3px solid rgba(242,210,139,.35)', borderRadius: '44px' });
el('div', BG, { left: '34px', top: '34px', width: '1012px', height: '1852px', border: '3px dotted rgba(242,210,139,.28)', borderRadius: '36px' });

/* cámara (punch-ins / sacudidas) */
const CAM = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', transformOrigin: '540px 760px' });
/* capa superior fija */
const OV = el('div', null, { left: 0, top: 0, width: '1080px', height: '1920px', pointerEvents: 'none' });

/* ================= ESCENAS ================= */
const SC = [];
function scene(a, b, opt = {}) { const s = { a, b, enter: opt.enter || 'cut', exit: opt.exit || 'cut', el: el('div', CAM, { left: 0, top: 0, width: '1080px', height: '1920px' }), upd: () => { } }; SC.push(s); return s; }
const BURSTS = [];
function burst(parent, cx, cy, t0, n = 10, Rr = 220, sz = 1) {
  const st = [];
  for (let i = 0; i < n; i++) { const e = el(A.star(i % 3 ? '#FFF1C4' : '#ffffff'), parent, { left: px(cx - 30), top: px(cy - 30), width: '60px', height: '60px' }); st.push({ e, a: i / n * Math.PI * 2 + R() * 0.5, d: Rr * (0.55 + 0.45 * R()), s: sz * (0.6 + 0.7 * R()) }); set(e, { o: 0 }); }
  const b = { upd(t) { const on = t >= t0 && t < t0 + 0.9; const k = p(t, t0, 0.75, E.outCubic), f = Math.sin(Math.PI * clamp((t - t0) / 0.9)); st.forEach(o => set(o.e, { x: Math.cos(o.a) * o.d * k, y: Math.sin(o.a) * o.d * k, s: o.s * f, r: k * 160, o: on ? 1 : 0 })); } };
  BURSTS.push(b); return b;
}
function chip(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), background: CREAM, border: '4px solid #D4A74A', borderRadius: '100px', padding: '8px 26px 10px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: (opt.size || 34) + 'px', color: BLUE, whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(8,16,48,.4)', letterSpacing: '0.01em' }, opt.css || {}), txt);
}
const chipAnim = (e, t, t0, t1, r = -3) => set(e, { s: pop(t, t0, 0.4) * out(t, t1), o: t >= t0 && t < t1 ? 1 : 0, r: r + wobble(t, 0.5, 1.2) });
function stampEl(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), border: `7px solid ${opt.c || RED}`, outline: `3px solid ${opt.c || RED}`, outlineOffset: '-16px', borderRadius: '18px', padding: '14px 34px 18px', fontFamily: 'DMSerif', fontSize: (opt.size || 76) + 'px', color: opt.c || RED, background: 'rgba(251,243,226,.94)', whiteSpace: 'nowrap', letterSpacing: '0.04em', boxShadow: '0 8px 0 rgba(8,16,48,.35)' }, opt.css || {}), txt);
}
const stampAnim = (e, t, t0, t1, r = -8) => { const k = p(t, t0, 0.16, E.inCubic); set(e, { s: (t < t0 ? 0 : 1 + 1.3 * (1 - k)) * out(t, t1), o: t >= t0 && t < t1 ? clamp((t - t0) / 0.06) : 0, r }); };

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
    const on = t >= h.t0 - 0.06 && t < h.t1;
    if (!on) { h.b.style.display = 'none'; return; }
    h.b.style.display = 'flex';
    if (!h.fitted) { let fs = h.size; while (h.b.offsetHeight > h.maxH && fs > 50) { fs -= 4; h.b.style.fontSize = fs + 'px'; } h.fitted = true; }
    h.b.style.opacity = out(t, h.t1, 0.12);
    h.toks.forEach(o => { const k = p(t, o.t - 0.05, 0.32, E.outBack); set(o.sp, { y: (1 - k) * 46, s: 0.55 + 0.45 * k, o: clamp((t - o.t + 0.05) / 0.1) }); });
  });
}
const H_ = (s, idx, t1, o) => head(s, idx.map(i => typeof i === 'number' && i < 1000 && Number.isInteger(i) ? w(i) : i), t1, o);

/* ================= ABUELA (medallón) ================= */
const MED = box(A.granny(), CAM, 0, 0, 400, 480, { zIndex: 300 });
const G = {}; ['gHead', 'gBrowL', 'gBrowR', 'gEyeL', 'gEyeR', 'gWinkR', 'gWinkL', 'gMouthC', 'gMouthO', 'gMouthD', 'gTint', 'gBody'].forEach(id => G[id] = document.getElementById(id));
const HSTOP = box(A.handStop(), MED, 300, 30, 170, 230, { transformOrigin: '85px 200px' });
const HPT = box(A.handPoint(), MED, 330, 250, 240, 150, { transformOrigin: '30px 75px' });
/*MKF*/
function kf(K, t) {
  if (t <= K[0][0]) return K[0].slice(1, 4);
  for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t < b[0]) { const k = (b[4] === 'back' ? E.outBack : E.inOutCubic)(clamp((t - a[0]) / (b[0] - a[0]))); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } }
  return K[K.length - 1].slice(1, 4);
}
/*EXPR*/
let curWord = 0;
function speakAt(t) {
  for (let i = 0; i < W.length; i++) { const x = W[i]; if (t >= x.s - 0.03 && t <= x.e + 0.02) { const k = t - x.s; return clamp(0.25 + 0.75 * Math.abs(Math.sin(k * Math.PI * 6.4 + 0.7))) * clamp((x.e + 0.02 - t) / 0.05) * clamp((t - x.s + 0.03) / 0.05); } if (x.s > t) break; }
  return 0;
}
function granny(t) {
  let ex = 'neutral'; for (const [a, b, n] of EXPR) if (t >= a && t < b) ex = n;
  const sp = speakAt(t);
  let bL = 0, bR = 0, rL = 0, rR = 0, eS = 1, wR = 0, tint = 0, md = 'talk', tilt = wobble(t, 0.33, 2.2), dy = 0, big = 1;
  switch (ex) {
    case 'shout': bL = bR = -12; eS = 1.25; big = 1.3; break;
    case 'stern': bL = bR = 3; rL = 14; rR = -14; break;
    case 'sly': bR = -13; rR = -6; bL = 4; rL = 6; tilt += 5; break;
    case 'disgust': bL = bR = 5; rL = 12; rR = -12; eS = 0.32; tint = 0.5; md = 'disgust'; tilt -= 4; break;
    case 'wow': bL = bR = -15; eS = 1.3; big = 1.25; break;
    case 'happy': bL = bR = -6; break;
    case 'proud': bL = bR = -9; tilt -= 4; break;
    case 'wink': wR = 1; bL = -7; bR = 4; tilt += 5; break;
    case 'nod': dy = Math.abs(Math.sin((t - 59.76) * Math.PI * 4.1)) * 12; bL = bR = -6; break;
  }
  if (eS <= 1.05 && !wR && ((t + 0.5) % 3.5) < 0.12) eS = 0.08;
  at(G.gBrowL, 'transform', `translate(0 ${bL}) rotate(${rL} 167 174)`);
  at(G.gBrowR, 'transform', `translate(0 ${bR}) rotate(${rR} 233 174)`);
  at(G.gEyeL, 'transform', `translate(167 211) scale(${eS > 1 ? 1.15 : 1} ${eS}) translate(-167 -211)`);
  at(G.gEyeR, 'transform', `translate(233 211) scale(${eS > 1 ? 1.15 : 1} ${wR ? 0.05 : eS}) translate(-233 -211)`);
  G.gWinkR.style.opacity = wR; G.gTint.style.opacity = tint;
  if (md === 'disgust') { G.gMouthD.style.opacity = 1; G.gMouthO.style.opacity = 0; G.gMouthC.style.opacity = 0; }
  else if (sp > 0.02) { G.gMouthD.style.opacity = 0; G.gMouthC.style.opacity = 0; G.gMouthO.style.opacity = 1; at(G.gMouthO, 'transform', `translate(202 274) scale(${0.85 + 0.25 * sp * big} ${(0.2 + 0.9 * sp) * big})`); }
  else if (ex === 'wow' || ex === 'shout') { G.gMouthD.style.opacity = 0; G.gMouthC.style.opacity = 0; G.gMouthO.style.opacity = 1; at(G.gMouthO, 'transform', `translate(202 276) scale(0.62 1.0)`); }
  else { G.gMouthD.style.opacity = 0; G.gMouthO.style.opacity = 0; G.gMouthC.style.opacity = 1; }
  at(G.gHead, 'transform', `translate(0 ${dy + sp * 1.5}) rotate(${tilt} 200 300)`);
  // pose
  const [x, y, s] = kf(MKF, t);
  set(MED, { x: x - 200, y: y - 240, s: s * (1 + 0.012 * Math.sin(t * 2.4)), sy: 1 - 0.12 * crouch(t), r: wobble(t, 0.27, 1.4) });
  // manos
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


/* ================= TIEMPOS CLAVE (todo clavado a palabras de words_table.txt) ================= */
const T1 = w(27), T2 = w(55), T3 = w(87), TG = w(118), TP = w(140), TB = w(151), LT = DUR - 0.4;
const TC = w(163) - 0.02;            // «y yo me los sé todos» -> la tapa se cierra
const MKF = [[-0.12, 205, 2150, 0.72], [0.42, 205, 1150, 0.72, 'back'],
  [w(67) - 0.02, 205, 1150, 0.72], [w(67) + 0.3, 205, 1205, 0.72, 'back'], [w(76) + 0.1, 205, 1205, 0.72], [w(76) + 0.5, 205, 1150, 0.72],
  [TB - 0.15, 205, 1150, 0.72], [TB + 0.25, 540, 770, 0.86, 'back'], [w(155), 540, 770, 0.86], [w(155) + 0.35, 205, 1150, 0.72],
  [TC, 205, 1150, 0.72], [TC + 0.4, 540, 770, 0.86, 'back'], [LT, 540, 770, 0.86], [DUR, 205, 1330, 0.72]];
function crouch(t) { return p(t, w(67), 0.3, E.outBack) * (1 - p(t, w(76) + 0.1, 0.4)); }
const EXPR = [[0.05, 0.95, 'shout'], [1.22, 2.26, 'stern'], [2.31, 4.0, 'sly'], [4.2, 6.8, 'happy'], [w(21), w(26), 'sly'], [w(26), 8.7, 'stern'],
  [w(28), 10.9, 'sly'], [w(38), 14.3, 'stern'], [w(48), 18.6, 'wow'], [w(56), 20.9, 'sly'], [w(63), 22.3, 'wow'], [w(67), 23.6, 'happy'], [w(69), 26.0, 'wink'], [w(77), w(83), 'sly'],
  [w(83), T3 - 0.05, 'shout'], [w(92), w(96), 'stern'], [w(104), w(107), 'wow'], [w(108), w(112), 'proud'], [w(112), TG - 0.2, 'stern'], [TG, w(123), 'wow'], [w(124), w(132), 'happy'], [w(132), w(135), 'wow'],
  [w(135), TP - 0.1, 'proud'], [TP, w(144), 'sly'], [w(144), TB - 0.05, 'happy'], [TB, w(155), 'proud'], [w(155), w(156), 'shout'], [w(161), w(163), 'wow'], [w(163), w(168), 'happy'], [w(168), DUR + 1, 'wink']];
const HANDS = [[0.05, 1.1, 'stop'], [1.22, 2.3, 'wag'], [w(28), w(31), 'up'], [w(42), w(45), 'point'], [w(56), w(60), 'up'], [w(69), w(73), 'point'], [w(78), T3 - 0.4, 'wag'],
  [w(97), w(100), 'point'], [w(108), w(111), 'up'], [w(124), w(128), 'up'], [TP, w(144), 'up'], [TB, w(154) + 0.3, 'wave'], [w(155) + 0.35, TC, 'point']];

/* ================= BARRA DE PROGRESO (FOMO) ================= */
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
const PBlock = box(A.lockAngry(), PBB[2].b, 44, 34, 240, 280, { transformOrigin: '0 0' });
const PBang = box(A.angry(), PBB[2].b, -26, -26, 120, 120, { transformOrigin: '0 0' });
const PBshk = q(PBlock, '.shackle');
const PBgift = box(A.gift(), PBB[3].b, 4, 2, 200, 210, { transformOrigin: '0 0' });
const PBbG = burst(OV, PBX(3), PBY, TG + 0.45, 12, 160, 0.8);
const PBb3 = burst(OV, PBX(2), PBY, T3, 12, 160, 0.8);
function updPB(t) {
  const act = t < T1 ? -1 : t < T2 ? 0 : t < T3 ? 1 : t < TG ? 2 : t < TP ? 3 : -1;
  const pts = [[T1, 0], [T2, 1 / 3], [T3, 2 / 3], [TG, 1]];
  let f = 0; if (t >= T1) { f = 1; for (let i = 0; i < 3; i++) if (t < pts[i + 1][0]) { f = lerp(pts[i][1], pts[i + 1][1], (t - pts[i][0]) / (pts[i + 1][0] - pts[i][0])); break; } }
  if (t >= LT) f = 0;
  set(PBfill, { sx: Math.max(0.001, f) });
  const st = [T1, T2, T3, TG];
  PBB.forEach((o, i) => {
    const done = (t >= st[i] && i !== act && t < LT) || (t >= TP && t < LT && (i < 3 || t >= TG));
    const on = i === act;
    if (i < 3) { o.b.style.background = on ? RED : done ? 'linear-gradient(135deg,#C08F35,#FFF1C4 50%,#D4A74A)' : CREAM; o.b.style.color = on ? CREAM : BLUE; o.b.style.borderColor = on ? '#FFF1C4' : '#D4A74A'; }
    else { const g = t >= TG + 0.45 && t < LT; o.b.style.background = g ? (on ? RED : 'linear-gradient(135deg,#C08F35,#FFF1C4 50%,#D4A74A)') : 'rgba(251,243,226,.08)'; o.b.style.border = g ? '5px solid #FFF1C4' : '5px dashed rgba(242,210,139,.8)'; o.b.firstChild && o.b.firstChild.tagName === 'SPAN' && (o.b.firstChild.style.opacity = g ? 0 : 1); }
    set(o.b, { s: (on ? 1.1 + 0.03 * Math.sin(t * 8) : 1) * (1 + 0.4 * bump(t, st[i] + 0.5)), r: i === 2 && t < T3 ? lockShake(t) * 0.6 : 0 });
    set(o.ck, { s: done && !on ? 0.42 * pop(t, (i === 3 ? TP : st[i + 1] || TP) - 0.05, 0.3) : 0, o: done && !on ? 1 : 0 });
  });
  // candado del 3
  const kO = p(t, T3, 0.45, E.outCubic);
  set(PBlock, { s: 0.27 * (t < T3 ? 1 : 1 - kO), y: -60 * kO, r: 40 * kO, o: t < T3 + 0.45 && t < LT ? 1 : t >= LT ? 1 : 0 });
  if (t >= LT) set(PBlock, { s: 0.27, o: 1 });
  at(PBshk, 'transform', t >= T3 && t < LT ? `translate(0 ${-30 * kO}) rotate(${-35 * kO} 180 128)` : '');
  set(PBang, { s: 0.42 * (t < T3 || t >= LT ? 1 + 0.15 * bump(t, w(26)) : 1 - kO), r: wobble(t, 1.6, 6), o: t < T3 + 0.45 || t >= LT ? 1 : 0 });
  set(PBgift, { s: 0.46 * pop(t, TG + 0.4, 0.4), o: t >= TG + 0.4 && t < LT ? 1 : 0, r: wobble(t, 1, 5) });
  set(PB, { s: pop(t, -0.4, 0.4) });
  PBbG.upd(t); PBb3.upd(t);
}
function lockShake(t) { const k = clamp((t - 26.31) / (T3 - 26.31)); const idle = ((t % 3) < 0.35 && t > 0.5) ? Math.sin(t * 50) * 6 : 0; return t < T3 ? (t > 26.31 ? Math.sin(t * 55) * (4 + 14 * k) : idle) : 0; }

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

/* ================= 0 · GANCHO / PORTADA ================= */
const s0 = scene(0, 4.12, { exit: 'whip' });
const H = {};
const emo = ['🍫', '🍪', '🧀', '🍷', '🥤', '🍿'];
H.cart = box(A.cart(emo.map((e, i) => `<text class="ci" x="${180 + i * 66}" y="${132 - (i % 2) * 34}" font-size="92" opacity="0">${e}</text>`).join('')), s0.el, 210, 760, 640, 520, { transformOrigin: '370px 300px' });
H.ci = qa(H.cart, '.ci');
H.t1 = el('div', s0.el, { left: '0', top: '262px', width: '1080px', textAlign: 'center', fontFamily: 'DMSerif', fontSize: '134px', lineHeight: 1, color: CREAM, textShadow: '0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, 'EL SÚPER TE…');
H.t2w = el('div', s0.el, { left: '0', top: '440px', width: '1080px', display: 'flex', justifyContent: 'center' });
H.t2 = el('div', H.t2w, { position: 'relative', background: RED, color: CREAM, fontFamily: 'DMSerif', fontSize: '150px', lineHeight: 1, padding: '10px 44px 24px', borderRadius: '30px', border: '7px solid #F2D28B', boxShadow: '0 12px 0 #5a0a14, 0 24px 40px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, '?');
H.trampa = stampEl(s0.el, '¡TRAMPA!', 360, 880, { size: 92 });
H.prop = stampEl(s0.el, '¡A PROPÓSITO!', 175, 650, { size: 96, c: RED });
H.b = burst(s0.el, 540, 960, w(11) + 0.1, 14, 420, 1.2);
H.b2 = burst(s0.el, 540, 520, w(4), 12, 380, 1.1);
function hookUpd(t) {
  set(H.t1, { s: pop(t, -0.3, 0.4) * (1 + 0.05 * bump(t, w(1))), y: wobble(t, 0.5, 4) });
  // «?» que bota en el fotograma 0 -> se revela «TOMA EL PELO»
  const fl = p(t, w(4) - 0.1, 0.3, E.linear), rev = fl >= 0.5;
  H.t2.textContent = rev ? 'TOMA EL PELO' : '?'; H.t2.style.fontSize = rev ? '118px' : '170px';
  const qb = rev ? 0 : Math.abs(Math.sin(t * 7)) * 22;
  set(H.t2, { s: (1 + 0.06 * bump(t, w(6))) * (rev ? 1 : 1 + 0.06 * Math.sin(t * 9)), sx: Math.max(0.03, Math.abs(Math.cos(Math.PI * fl))), y: -qb, r: (rev ? -3 : 6 * Math.sin(t * 5)) + shake(t, w(6), 0.3, 4) });
  H.ci.forEach((e, i) => { const t0 = [-0.18, 0.31, 0.75, 1.22, 2.31, 2.64][i]; const k = p(t, t0, 0.35, E.outBack); e.setAttribute('opacity', t >= t0 ? 1 : 0); e.setAttribute('transform', `translate(0 ${(-300 * (1 - k)).toFixed(1)}) rotate(${(40 * (1 - k)).toFixed(1)} ${180 + i * 66} 100)`); });
  set(H.cart, { s: 1.3 * (1 + 0.04 * Math.sin(t * 3)), r: -4 + wobble(t, 0.7, 2) + shake(t, w(6), 0.3, 3), x: -20 + 40 * Math.sin(t * 1.3) + shake(t, 0.1, 0.35, 12) });
  stampAnim(H.trampa, t, w(6), 4.4, -12);
  stampAnim(H.prop, t, w(11), 4.4, -8);
  H.b.upd(t); H.b2.upd(t);
}
s0.upd = hookUpd;

/* ================= 1 · PROMESA (el 3 te va a cabrear) ================= */
const s1 = scene(4.1, T1 + 0.45, { enter: 'whip' });
const P = {};
P.rays = box(A.rays(16, 600), s1.el, -60, 160, 1200, 1200);
P.seals = [0, 1, 2].map(i => box(A.seal(i + 1), s1.el, [220, 540, 860][i] - 150, 680 - 150, 300, 370, { transformOrigin: '150px 150px' }));
P.lock = box(A.lockAngry(), s1.el, 540 - 120, 760 - 140, 240, 280);
P.steam = box(`<svg viewBox="0 0 200 120" width="200" height="120" style="overflow:visible"><g fill="#fff" opacity=".85"><circle cx="30" cy="60" r="22"/><circle cx="56" cy="40" r="26"/><circle cx="150" cy="40" r="26"/><circle cx="176" cy="62" r="22"/></g></svg>`, s1.el, 440, 520, 200, 120);
s1.upd = t => {
  const k2 = p(t, w(21), 0.5, E.inOutCubic);
  set(P.rays, { r: t * 12, o: 0.25 + 0.6 * k2, s: 0.8 + 0.25 * k2 });
  P.seals.forEach((e, i) => {
    const t0 = w(14) + i * 0.15, k = pop(t, t0, 0.45);
    let x = 0, y = 0, s = 0.72 * k;
    if (i < 2) { x = lerp(0, i ? -240 : -40, k2); y = lerp(0, -130, k2); s *= lerp(1, 0.62, k2); }
    else { x = lerp(0, -320, k2); y = lerp(0, 40, k2); s *= lerp(1, 1.5, k2); }
    set(e, { x, y: y + wobble(t, 0.6, 6, i * 0.3), s, r: wobble(t, 0.4, 3, i) + (i === 2 ? lockShake(t + 20) : 0), o: i < 2 ? lerp(1, 0.6, k2) : 1 });
  });
  const kl = pop(t, w(22), 0.4);
  set(P.lock, { s: kl * (1 + 0.08 * bump(t, w(26))), y: 120, r: shake(t, w(26), 0.5, 10) + Math.sin(t * 30) * 2, o: t >= w(22) ? 1 : 0 });
  set(P.steam, { y: -((t * 80) % 40) + 60, s: pop(t, w(26), 0.3), o: t >= w(26) ? 1 : 0 });
};

/* ================= 3 · TRUCO 1: lo básico, al fondo ================= */
const s3 = scene(T1 + 0.45, T2 + 0.45);
const S = {};
S.list = box('', s3.el, 240, 470, 600, 560, { background: '#FFFDF6', borderRadius: '18px', border: '5px solid ' + INK, boxShadow: '0 14px 0 rgba(8,16,48,.4)', backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 78px, #d6e2f5 78px 81px)' });
el('div', S.list, { left: '0', top: '18px', width: '590px', textAlign: 'center', fontFamily: 'DMSerif', fontSize: '58px', color: RED }, 'Lista de la compra');
S.rows = [[A.milk(), 120, 170, 'leche', w(33)], [A.eggs(), 180, 110, 'huevos', w(35)], [A.bread(), 220, 100, 'pan', w(37)]].map(([sv, ww, hh, txt, t0], i) => {
  const r = el('div', S.list, { left: '40px', top: px(120 + i * 140), width: '520px', height: '120px' });
  const ic = box(sv, r, 0, 0, ww, hh, { transformOrigin: '0 0' }); set(ic, { s: 100 / Math.max(ww, hh) * (i === 0 ? 1.1 : 1.2) });
  el('div', r, { left: '200px', top: '18px', fontFamily: 'SpecialElite', fontSize: '64px', color: INK }, txt);
  return { r, t0 };
});
S.map = box(A.store('st').replace('M60 600 L60 560 L240 560 L240 160 L420 160 L420 540 L600 540 L600 160 L780 160 L780 120', 'M780 600 L780 560 L600 560 L600 160 L420 160 L420 540 L240 540 L240 160 L60 160 L60 120').replace('M60 600 L60 560 L240 560 L240 160 L420 160 L420 540 L600 540 L600 160 L780 160 L780 120', 'M780 600 L780 560 L600 560 L600 160 L420 160 L420 540 L240 540 L240 160 L60 160 L60 120').replace('x="10" y="575"', 'x="720" y="575"').replace('x="65" y="611"', 'x="775" y="611"'), s3.el, 120, 440, 840, 640, { transformOrigin: '420px 320px' });
S.route = q(S.map, '.route'); S.rmask = q(S.map, '.rmask'); S.L = 0; S.tp = qa(S.map, '.tp');
S.back = [A.milk(), A.eggs(), A.bread()].map((sv, i) => box(sv, S.map, [150, 380, 610][i], 4, [120, 180, 220][i], [170, 110, 100][i], { transformOrigin: 'center' }));
S.fondo = el('div', s3.el, { left: '330px', top: '395px', background: RED, color: CREAM, fontFamily: 'Fredoka', fontWeight: 700, fontSize: '40px', padding: '6px 26px 8px', borderRadius: '100px', border: '4px solid #F2D28B', whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(8,16,48,.4)' }, '⬆ ¡AL FONDO!');
S.cart = box(A.cart(''), S.map, 0, 0, 640, 520, { transformOrigin: '370px 430px' });
S.fly = ['🍫', '🍪', '🍷', '🧀', '🍿', '🍬'].map(e => box(`<div style="font-size:84px;line-height:1">${e}</div>`, S.map, 0, 0, 70, 70));
S.carroTag = el('div', s3.el, { left: '120px', top: '1010px', width: '840px', display: 'flex', justifyContent: 'center' });
S.carroIn = el('div', S.carroTag, { position: 'relative', background: CREAM, color: RED, fontFamily: 'DMSerif', fontSize: '60px', padding: '4px 30px 10px', borderRadius: '20px', border: '5px solid ' + RED, whiteSpace: 'nowrap' }, '¡Y al carro!');
S.b = burst(s3.el, 540, 760, w(41), 12, 380, 1);
s3.upd = t => {
  // lista
  const kOut = p(t, w(38) - 0.05, 0.35, E.inCubic);
  set(S.list, { s: pop(t, T1 + 0.45, 0.4) * (1 - kOut), r: -2 + wobble(t, 0.5, 1.5), o: kOut < 1 ? 1 : 0 });
  S.rows.forEach(o => set(o.r, { x: -40 * (1 - p(t, o.t0, 0.3, E.outBack)), o: t >= o.t0 - 0.1 ? 1 : 0, s: 1 + 0.12 * bump(t, o.t0) }));
  // mapa
  const km = pop(t, w(38), 0.45);
  set(S.map, { s: 0.94 * km, o: t >= w(38) ? 1 : 0, r: wobble(t, 0.3, 0.6) });
  S.back.forEach((e, i) => { const t0 = w(39) + i * 0.12; set(e, { s: 0.62 * pop(t, t0, 0.4) * (1 + 0.15 * Math.sin(t * 6 + i)), y: (1 - p(t, t0, 0.4)) * 400, o: t >= t0 ? 1 : 0 }); });
  set(S.fondo, { s: pop(t, w(41), 0.35) * out(t, w(44), 0.2), y: -Math.abs(Math.sin(t * 6)) * 12, o: t >= w(41) && t < w(44) ? 1 : 0 });
  if (!S.L && t >= w(38)) S.L = S.route.getTotalLength();
  const kr = p(t, w(42), 2.0, E.linear);
  at(S.rmask, 'stroke-dashoffset', 1 - kr);
  const kc = p(t, w(42) + 0.1, w(54) - w(42) - 0.2, E.inOutCubic);
  if (S.L) {
    const pt = S.route.getPointAtLength(S.L * kc), pt2 = S.route.getPointAtLength(Math.min(S.L, S.L * kc + 4));
    const flip = pt2.x < pt.x - 0.5 ? -1 : 1;
    set(S.cart, { x: pt.x - 370, y: pt.y - 430, s: 0.32 * (1 + 0.6 * bump(t, w(54))), sx: flip, o: t >= w(42) ? 1 : 0 });
    S.fly.forEach((e, i) => { const t0 = w(48) + i * 0.24, k = p(t, t0, 0.4, E.inCubic); const src = S.tp[[13, 9, 6, 2, 10, 5][i]]; const sx = +src.getAttribute('x'), sy = +src.getAttribute('y') - 30;
      set(e, { x: lerp(sx, pt.x, k) - 35, y: lerp(sy, pt.y - 40, k) - 120 * Math.sin(Math.PI * k) - 35, s: 1 - 0.5 * k, o: t >= t0 && k < 1 ? 1 : 0, r: k * 200 }); });
  }
  S.tp.forEach((e, i) => e.setAttribute('transform', `translate(0 ${(Math.sin(t * 5 + i) * 3).toFixed(1)})`));
  set(S.carroIn, { s: pop(t, w(54), 0.35), r: -4, o: t >= w(54) ? 1 : 0 });
  S.b.upd(t);
};

/* ================= 4 · TRUCO 2: lo caro, a tus ojos ================= */
const s4 = scene(T2 + 0.45, 26.21);
const SH = {};
SH.wrap = box('', s4.el, 0, 0, 1080, 1920);
SH.shelf = box(A.shelf(), SH.wrap, 370, 450, 600, 860, { transformOrigin: '0 0' });
SH.glow = q(SH.shelf, '.eyeglow');
const PR = [['2,49 €', '2,79 €'], ['3,49 €', '3,99 €'], ['1,79 €', '1,99 €'], ['0,99 €', '1,15 €']];
SH.tags = PR.map((row, r) => row.map((pr, c) => { const e = el('div', SH.wrap, { left: px(370 + (46 + c * 264) * 0.9), top: px(450 + (196 + r * 210) * 0.9), width: '112px', background: '#fff', border: '4px solid ' + INK, borderRadius: '10px', fontFamily: 'DMSerif', fontSize: '38px', color: BLUE, textAlign: 'center', lineHeight: 1.1, padding: '2px 0 4px', transformOrigin: '50% 0' }, pr); return e; }));
SH.eye = box(A.eye(), SH.wrap, 150, 450 + 300 * 0.9 - 45, 140, 90);
SH.iris = qa(SH.eye, '.iris');
SH.line = box('', SH.wrap, 290, 450 + 300 * 0.9 - 3, 640, 6, { background: 'repeating-linear-gradient(90deg,#F2D28B 0 18px,transparent 18px 30px)', transformOrigin: '0 50%' });
SH.eur = el('div', SH.wrap, { left: '120px', top: px(450 + 300 * 0.9 + 60), fontFamily: 'DMSerif', fontSize: '76px', color: '#F2D28B', textShadow: '0 5px 0 #0b1946' }, '€€€');
SH.down = el('div', s4.el, { left: '300px', top: '1000px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '110px', color: RED, WebkitTextStroke: '4px ' + CREAM }, '⬇');
SH.ej = chip(s4.el, 'ejemplo', 790, 455, { size: 28 });
SH.b = burst(SH.wrap, 640, 450 + 0.9 * 760, w(70), 14, 320, 1.1);
s4.upd = t => {
  const tilt = p(t, w(67), 0.6, E.inOutCubic);
  set(SH.wrap, { y: -70 * tilt });
  set(SH.shelf, { s: 0.9 * pop(t, T2 + 0.45, 0.4) });
  const ge = p(t, w(63), 0.4);
  SH.glow.setAttribute('opacity', ge * (0.75 + 0.25 * Math.sin(t * 6)));
  SH.tags.forEach((row, r) => row.forEach((e, c) => {
    const t0 = T2 + 0.6 + r * 0.08 + c * 0.04;
    const hot = r === 1, cheap = r === 3;
    let s = pop(t, t0, 0.35);
    if (hot) s *= 1 + 0.25 * bump(t, w(58) + c * 0.1) + 0.12 * ge * Math.abs(Math.sin(t * 4 + c));
    if (cheap) s *= 1 + 0.4 * bump(t, w(70) + c * 0.12);
    e.style.background = hot && ge > 0.5 ? '#FFE9A6' : cheap && t >= w(70) ? '#c9f0d6' : '#fff';
    e.style.color = hot && t >= w(58) ? RED : cheap && t >= w(70) ? GREEN : BLUE;
    e.style.borderColor = cheap && t >= w(70) ? GREEN : INK;
    set(e, { s, r: (c ? 3 : -3), o: t >= t0 ? 1 : 0 });
  }));
  set(SH.eye, { s: pop(t, w(63), 0.4), o: t >= w(63) ? 1 : 0 });
  SH.iris.forEach(c => at(c, 'transform', `translate(${(Math.sin(t * 2.5) * 14).toFixed(1)} 0)`));
  set(SH.line, { sx: Math.max(0.001, p(t, w(63) + 0.1, 0.5)), o: t >= w(63) ? 1 : 0 });
  set(SH.eur, { s: pop(t, w(66), 0.35), r: -8 + wobble(t, 1, 5), o: t >= w(66) ? 1 : 0 });
  set(SH.down, { y: Math.abs(Math.sin(t * 7)) * 30, s: pop(t, w(67), 0.3) * out(t, w(70) + 0.3), o: t >= w(67) && t < w(70) + 0.3 ? 1 : 0 });
  chipAnim(SH.ej, t, T2 + 0.9, 26.21, 3);
  SH.b.upd(t);
};

/* ================= 5 · ESPERA… el 3 es el bueno (candado) ================= */
const s5 = scene(w(77) - 0.02, T3 + 0.45);
const F = {};
F.rays = box(A.rays(16, 600), s5.el, -60, 180, 1200, 1200);
F.seal = box(A.seal(3), s5.el, 540 - 150, 780 - 150, 300, 370, { transformOrigin: '150px 150px' });
F.chains = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><g stroke="#9aa3b2" stroke-width="22" stroke-dasharray="40 14" stroke-linecap="round"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g><g stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="40 14" opacity=".5"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g></svg>`, s5.el, 140, 380, 800, 800);
F.lock = box(A.lockAngry(), s5.el, 540 - 120, 840 - 140, 240, 280, { transformOrigin: '120px 190px' });
F.shk = q(F.lock, '.shackle');
F.parts = Array.from({ length: 10 }, (_, i) => box(`<svg viewBox="0 0 60 60" width="60" height="60"><path d="M10 10 L50 18 L40 52 Z" fill="${i % 2 ? 'url(#goldG)' : '#9aa3b2'}" stroke="${INK}" stroke-width="4"/></svg>`, s5.el, 510, 800, 60, 60));
F.b = burst(s5.el, 540, 800, T3, 18, 520, 1.6);
s5.upd = t => {
  const kx = p(t, T3, 0.35, E.outCubic);
  set(F.rays, { r: t * 20, o: 0.35 + 0.6 * kx });
  set(F.seal, { s: pop(t, 26.26, 0.4) * (1 + 0.25 * kx), r: lockShake(t) * 0.3 });
  set(F.chains, { s: pop(t, 26.36, 0.35) * (1 + 0.5 * kx), r: lockShake(t) * 0.2, o: 1 - kx });
  set(F.lock, { s: 1.15 * pop(t, 26.41, 0.4) * (1 + 0.1 * bump(t, w(81))) * (1 + 1.2 * kx), r: lockShake(t), o: 1 - kx, y: -200 * kx });
  at(F.shk, 'transform', t >= w(85) ? `translate(0 ${-20 * p(t, w(85), 0.3)})` : '');
  F.parts.forEach((e, i) => { const a = i / 10 * Math.PI * 2; set(e, { x: Math.cos(a) * 520 * kx, y: Math.sin(a) * 520 * kx, r: 400 * kx, s: 1.4, o: t >= T3 && kx < 1 ? 1 : 0 }); });
  F.b.upd(t);
};

/* ================= 6 · TRUCO 3: packs de «ahorro» ================= */
const s6 = scene(T3 + 0.45, TG + 0.45);
const K = {};
K.z = box('', s6.el, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
K.pack = box(A.pack(), K.z, 170, 500, 330, 320, { transformOrigin: '165px 320px' });
K.one = box(A.bottle(), K.z, 735, 520, 110, 300, { transformOrigin: '55px 300px' });
K.star = box(A.burstStar('¡AHORRO!'), K.z, 380, 440, 220, 220);
K.slash = box(`<svg viewBox="0 0 220 220" width="220" height="220"><path d="M30 190 L190 30" stroke="${RED}" stroke-width="22" stroke-linecap="round"/><path d="M30 190 L190 30" stroke="${INK}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".4"/></svg>`, K.z, 380, 440, 220, 220);
const tag = (x, y, wd, big, small) => { const e = el('div', K.z, { left: px(x), top: px(y), width: px(wd), background: '#fff', border: '5px solid ' + INK, borderRadius: '14px', textAlign: 'center', padding: '4px 0 8px', boxShadow: '0 8px 0 rgba(8,16,48,.35)' }); e.innerHTML = `<div style="font-family:DMSerif;font-size:76px;line-height:1.05;color:${BLUE}">${big}</div><div class="sm" style="font-family:Fredoka;font-weight:600;font-size:22px;color:#6b7280">${small}</div>`; return e; };
K.t1 = tag(185, 850, 300, '4,50 €', 'pack 3 L · 1,50 €/L');
K.t2 = tag(640, 850, 300, '1,35 €', 'botella 1 L · 1,35 €/L');
K.big1 = el('div', K.z, { left: '170px', top: '680px', width: '330px', textAlign: 'center', background: RED, color: '#fff', fontFamily: 'DMSerif', fontSize: '68px', borderRadius: '20px', border: '5px solid ' + CREAM, padding: '2px 0 8px', boxShadow: '0 8px 0 rgba(8,16,48,.4)' }, '1,50 €/L');
K.big2 = el('div', K.z, { left: '625px', top: '680px', width: '330px', textAlign: 'center', background: GREEN, color: '#fff', fontFamily: 'DMSerif', fontSize: '68px', borderRadius: '20px', border: '5px solid ' + CREAM, padding: '2px 0 8px', boxShadow: '0 8px 0 rgba(8,16,48,.4)' }, '1,35 €/L');
K.lupa = box(`<svg viewBox="0 0 200 200" width="200" height="200" style="overflow:visible"><circle cx="90" cy="90" r="70" fill="rgba(255,255,255,.25)" stroke="url(#goldG)" stroke-width="16"/><circle cx="90" cy="90" r="70" fill="none" stroke="${INK}" stroke-width="3"/><path d="M142 142 L190 190" stroke="#7A1F2B" stroke-width="24" stroke-linecap="round"/></svg>`, K.z, 0, 0, 200, 200);
K.obl = stampEl(K.z, 'OBLIGATORIO ✔', 360, 1010, { size: 62, c: BLUE });
K.trap = stampEl(K.z, '¡MÁS CARO!', 140, 560, { size: 80 });
K.ok = box(A.check(GREEN), K.z, 840, 500, 100, 100);
K.ej = chip(s6.el, 'ejemplo', 80, 470, { size: 28 });
K.b = burst(K.z, 790, 650, w(117), 12, 260, 1);
s6.upd = t => {
  const zin = p(t, w(97), 0.5, E.inOutCubic) * (1 - p(t, w(112), 0.4, E.inOutCubic));
  set(K.z, { s: 1 + 0.12 * zin });
  set(K.pack, { s: pop(t, w(88), 0.45) * (1 + 0.05 * Math.sin(t * 3)), r: shake(t, w(117), 0.5, 6) });
  set(K.one, { s: 1.05 * pop(t, w(90), 0.45), r: wobble(t, 0.6, 2) });
  const kd = p(t, w(92), 0.6);
  set(K.star, { s: pop(t, w(91), 0.4) * (1 + 0.08 * Math.sin(t * 8) * (1 - kd)) * lerp(1, 0.7, kd), r: t * 20 * (1 - kd) + 10, o: t >= w(91) ? lerp(1, 0.55, kd) : 0 });
  set(K.slash, { s: pop(t, w(96), 0.3), o: t >= w(96) ? 1 : 0 });
  set(K.t1, { s: pop(t, w(90) + 0.2, 0.35), r: -2, o: t >= w(90) + 0.2 ? 1 : 0 });
  set(K.t2, { s: pop(t, w(90) + 0.35, 0.35), r: 2, o: t >= w(90) + 0.35 ? 1 : 0 });
  // lupa recorre la letra pequeña
  const l1 = p(t, w(99), 0.6, E.inOutCubic), l2 = p(t, w(106) - 0.2, 0.5, E.inOutCubic);
  const lx = lerp(lerp(150, 290, l1), 750, l2), ly = 860 + Math.sin(t * 4) * 6;
  set(K.lupa, { x: lx, y: ly, s: pop(t, w(99), 0.35) * out(t, w(109), 0.25), o: t >= w(99) && t < w(109) ? 1 : 0 });
  set(K.big1, { s: pop(t, w(104) - 0.1, 0.4) * (1 + 0.1 * bump(t, w(117))), r: -3 + shake(t, w(117), 0.4, 5), o: t >= w(104) - 0.1 ? 1 : 0 });
  set(K.big2, { s: pop(t, w(107), 0.4), r: 3, o: t >= w(107) ? 1 : 0 });
  stampAnim(K.obl, t, w(109), w(112), -6);
  stampAnim(K.trap, t, w(117) - 0.1, TG + 0.6, -10);
  set(K.ok, { s: pop(t, w(117) + 0.2, 0.4) * 1.1, o: t >= w(117) + 0.2 ? 1 : 0 });
  chipAnim(K.ej, t, T3 + 0.8, TG + 0.45, -3);
  K.b.upd(t);
};

/* ================= 7 · REGALO: la música lenta ================= */
const s7 = scene(TG + 0.45, TP);
const M = {};
M.spk = box(A.speaker(), s7.el, 760, 450, 220, 260, { transformOrigin: '110px 130px' });
M.cone = q(M.spk, '.cone');
M.notes = Array.from({ length: 6 }, (_, i) => el('div', s7.el, { left: '0', top: '0', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '84px', color: i % 2 ? '#F2D28B' : CREAM, textShadow: '0 5px 0 #0b1946' }, i % 2 ? '♫' : '♪'));
M.lenta = chip(s7.el, '🎵 música lenta', 70, 480, { size: 34 });
M.people = [[ '#2E64D8', '#6b4a2a'], [RED, '#C5CAD6'], ['#2f9e5b', '#1d1d22']].map(([c, h], i) => { const e = box(A.person(c, h), s7.el, 0, 0, 300, 330, { transformOrigin: '0 0' }); return { e, legB: q(e, '.legB'), legF: q(e, '.legF'), it: qa(e, '.it text') }; });
M.chart = box(A.chart(), s7.el, 80, 480, 200, 160, { transformOrigin: '100px 160px' });
M.est = chip(s7.el, '📊 estudio', 70, 650, { size: 34 });
M.slow = el('div', s7.el, { left: '420px', top: '470px', fontFamily: 'DMSerif', fontSize: '64px', color: CREAM, fontStyle: 'italic', textShadow: '0 5px 0 #0b1946' }, 'más despacio…');
M.b = burst(s7.el, 600, 900, w(134), 12, 380, 1.1);
M.gift = box(A.gift(), s7.el, 440, 640, 200, 210, { transformOrigin: '100px 150px' });
M.glid = q(M.gift, '.glid');
M.bn = Array.from({ length: 7 }, (_, i) => el('div', s7.el, { left: '0', top: '0', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '120px', color: i % 2 ? '#F2D28B' : CREAM, textShadow: '0 6px 0 #0b1946' }, ['♪', '♫', '♩', '♬'][i % 4]));
s7.upd = t => {
  set(M.spk, { s: 0.8 * pop(t, TG + 0.5, 0.4) * (1 + 0.04 * Math.sin(t * 3.2)), r: wobble(t, 0.5, 2) });
  at(M.cone, 'transform', `translate(110 176) scale(${(1 + 0.06 * Math.sin(t * 3.2)).toFixed(3)}) translate(-110 -176)`);
  const slow = t >= w(125) ? 0.35 : 1;
  M.notes.forEach((e, i) => { const ph = ((t - TG) * 0.22 * (t >= w(125) ? 0.6 : 1) + i / 6) % 1; set(e, { x: 760 - ph * 520, y: 480 + Math.sin(ph * 8 + i) * 50 + (i % 3) * 30, r: Math.sin(t * 1.5 + i) * 20, s: 0.7 + 0.3 * Math.sin(Math.PI * ph), o: t >= w(122) ? Math.sin(Math.PI * ph) : 0 }); });
  chipAnim(M.lenta, t, w(126), w(133), 4);
  M.people.forEach((o, i) => {
    const t0 = w(127) + i * 0.15, k = clamp((t - t0) / 6);
    const x = 330 + i * 50 + k * 280, y = 570 + i * 200;
    set(o.e, { x, y, s: 0.85 * pop(t, t0, 0.4), o: t >= t0 ? 1 : 0 });
    const lg = Math.sin((t - t0) * 3.2) * 16;
    at(o.legB, 'transform', `rotate(${lg.toFixed(1)} 78 214)`); at(o.legF, 'transform', `rotate(${(-lg).toFixed(1)} 104 214)`);
    o.it.forEach((it, j) => { const tj = w(133) + i * 0.1 + j * 0.13; it.setAttribute('opacity', t >= tj ? 1 : 0); it.setAttribute('transform', `translate(0 ${(-80 * (1 - p(t, tj, 0.3, E.outBack))).toFixed(1)})`); });
  });
  set(M.slow, { s: pop(t, w(131), 0.4), x: Math.sin(t * 1.2) * 10, o: t >= w(131) && t < w(135) ? 1 : 0 });
  const gOut = p(t, w(127) - 0.1, 0.35, E.inCubic);
  set(M.gift, { s: 1.7 * pop(t, TG + 0.45, 0.45) * (1 - gOut), r: wobble(t, 1.2, 4), o: gOut < 1 ? 1 : 0 });
  at(M.glid, 'transform', `translate(${-40 * p(t, w(122) - 0.2, 0.3)} ${-110 * p(t, w(122) - 0.2, 0.3)}) rotate(${-25 * p(t, w(122) - 0.2, 0.3)} 100 60)`);
  M.bn.forEach((e, i) => { const sp = t >= w(125) ? 0.35 : 0.8, ph = ((t - w(122)) * sp * 0.6 + i / 7) % 1, a = -Math.PI / 2 + (i - 3) * 0.35;
    set(e, { x: 500 + Math.cos(a) * 420 * ph, y: 640 + Math.sin(a) * 300 * ph + Math.sin(ph * 6 + i) * 30, r: Math.sin(t * 1.3 + i) * 25, s: 0.5 + 0.6 * ph, o: t >= w(122) - 0.1 && gOut < 1 ? Math.sin(Math.PI * ph) : 0 }); });
  set(M.chart, { s: pop(t, w(136), 0.4), r: -4, o: t >= w(136) ? 1 : 0 });
  chipAnim(M.est, t, w(139), TP, -4);
  M.b.upd(t);
};

/* ================= 8 · ENCUESTA ================= */
const s8 = scene(TP - 0.05, TB - 0.05, { enter: 'whip' });
const PO = {};
PO.card = box('', s8.el, 80, 470, 860, 470, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
const icons = [[A.milk(), 120, 170, 0.5], [A.eye(), 140, 90, 0.6], [A.pack(), 330, 320, 0.26]];
PO.rows = ['Lo de siempre, al fondo', 'Lo caro, a tus ojos', 'Packs que no ahorran'].map((txt, i) => {
  const r = box('', PO.card, 26, 26 + i * 142, 796, 126, { borderRadius: '28px', border: '4px solid transparent' });
  const n = box(`<div style="width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#8A6420,#F2D28B 45%,#FFF1C4 55%,#C08F35);border:4px solid #5a3d0c;display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:58px;color:${BLUE}">${i + 1}</div>`, r, 14, 15, 96, 96);
  el('div', r, { left: '126px', top: '12px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: '40px', color: BLUE, whiteSpace: 'nowrap' }, txt);
  const tr = box('', r, 126, 74, 540, 26, { background: '#e6dcc6', borderRadius: '13px', overflow: 'hidden' });
  const fill = box('', tr, 0, 0, 540, 26, { background: 'linear-gradient(90deg,#C08F35,#F2D28B,#D4A74A)', borderRadius: '13px', transformOrigin: '0 50%' });
  const [sv, ww, hh, sc] = icons[i]; const ic = box(sv, r, 700, 6, ww, hh, { transformOrigin: '0 0' }); set(ic, { s: sc });
  return { r, fill, n };
});
const tSay = [w(145), w(147), w(150)], fills = [0.55, 0.68, 0.88];
PO.coms = [['M', RED, '@marisa_64', 'El 3. Me han pillado con los packs 😤'], ['J', BLUE2, '@jorge.ruiz', 'Lo del fondo lo sabía… ¡lo de la música no! 🤯']].map(([ini, c, u, txt], i) => {
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
  PO.coms.forEach((b, i) => { const t0 = w(143) + 0.3 + i * 0.6; set(b, { x: 600 * (1 - p(t, t0, 0.4, E.outBack)), o: t >= t0 ? 1 : 0, r: (i % 2 ? 1 : -1) * 1.2 }); });
};

/* ================= 9 · CIERRE: SEGUIR + lata (breve) + tarjeta ================= */
const s9 = scene(TB - 0.1, DUR + 0.1);
const CT = {};
(function buildTray() {
  let beads = ''; for (let i = 0; i < 56; i++) { const a = i / 56 * Math.PI * 2; beads += `<circle cx="${f1(400 + 381 * Math.cos(a))}" cy="${f1(400 + 381 * Math.sin(a))}" r="5" fill="#F7DFA0" stroke="#7a5418" stroke-width="1.6"/>`; }
  const rows = [3, 4, 5, 4, 3]; let cells = '', k = 0; const scal = (r, n) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r - 6; d += (i ? 'L' : 'M') + f1(rr * Math.cos(a)) + ' ' + f1(rr * Math.sin(a)); } return d + 'Z'; };
  const ic = ['🛒', '👁️', '📦', '🎁'];
  rows.forEach((n, ri) => { for (let c = 0; c < n; c++) { const x = 400 + (c - (n - 1) / 2) * 140, y = 400 + (ri - 2) * 128; k++;
    const lit = k <= 4;
    cells += `<g class="cell" data-k="${k}" transform="translate(${x} ${y})"><g class="ci"><path d="${scal(64, 18)}" fill="#FFFDF7" stroke="#bfb39a" stroke-width="3"/><circle r="48" fill="${lit ? '#FFF6DE' : '#EFE6D2'}" stroke="#e2d8c4" stroke-width="3"/>
      ${lit ? `<circle r="60" fill="none" stroke="url(#goldG)" stroke-width="8"/><text y="14" text-anchor="middle" font-size="44">${ic[k - 1]}</text><text y="44" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">${k < 4 ? 'Nº ' + k : 'regalo'}</text>` : `<text class="qm" y="18" text-anchor="middle" font-family="DMSerif" font-size="56" fill="#c9bfa6">?</text>`}</g></g>`; } });
  CT.tray = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><circle cx="412" cy="414" r="398" fill="rgba(5,12,40,.4)"/><circle cx="400" cy="400" r="398" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="6"/>${beads}<circle cx="400" cy="400" r="368" fill="#0f1d48" stroke="#5a3d0c" stroke-width="4"/>${cells}</svg>`, s9.el, 140, 370, 800, 800);
})();
CT.cells = qa(CT.tray, '.cell').map(c => ({ ci: q(c, '.ci'), k: +c.dataset.k }));
CT.btn = el('div', s9.el, { left: '430px', top: '1170px', width: '440px', height: '108px', borderRadius: '60px', background: '#FE2C55', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em', boxShadow: '0 10px 0 #9e1033, 0 20px 40px rgba(0,0,0,.35)', border: '5px solid #fff' }, '+ SEGUIR');
CT.ripple = box('', s9.el, 650 - 60, 1224 - 60, 120, 120, { borderRadius: '50%', border: '8px solid #fff' });
CT.lid = box(A.lidFace({ id: 'lfE' }), s9.el, 90, 320, 900, 900);
CT.lidSpec = q(CT.lid, '.lidspec');
CT.tag = el('div', s9.el, { left: '0', top: '1160px', width: '1080px', display: 'flex', justifyContent: 'center' });
CT.tagIn = el('div', CT.tag, { position: 'relative', background: 'linear-gradient(100deg,#8A6420 0%,#D4A74A 22%,#FFF1C4 40%,#F2D28B 50%,#C08F35 72%,#8A6420 100%)', border: '4px solid #5a3d0c', borderRadius: '100px', padding: '10px 40px 14px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '46px', color: BLUE, boxShadow: '0 8px 0 rgba(8,16,48,.45)', whiteSpace: 'nowrap' }, 'Trucos del súper 1·2·3 + 🎁');
CT.b1 = burst(s9.el, 540, 770, TC + 0.25, 18, 480, 1.4);
CT.b0 = burst(s9.el, 540, 770, w(155) + 0.1, 16, 460, 1.3);
s9.upd = t => {
  // 1) marca: la tapa con el medallón (Aquí la abuela Carmen)
  const kIn = p(t, TB - 0.12, 0.35, E.outBack), kOpen = p(t, w(155), 0.4, E.inCubic), kClose = p(t, TC, 0.28, E.inCubic);
  const lidOn = t < w(155) + 0.4 || t >= TC;
  let ls = 0.8 * kIn, ly = -10, lsy = 1, lr = wobble(t, 0.3, 0.8);
  if (t >= w(155) && t < TC) { ly = -10 - 1500 * kOpen; lsy = 1 - 0.85 * kOpen; lr += 30 * kOpen; }
  if (t >= TC) { ls = lerp(1.3, 0.8, kClose); lr = lerp(-25, 0, kClose) + wobble(t, 0.3, 0.8); ly = -10 + shake(t, TC + 0.25, 0.35, 10); }
  set(CT.lid, { s: ls * (1 + 0.04 * bump(t, w(154))) * (1 + 0.03 * bump(t, TC + 0.27)), y: ly, sy: lsy, r: lr, o: lidOn ? (t >= TC ? clamp(kClose * 1.5) : 1) : 0 });
  at(CT.lidSpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  // 2) se abre: bandeja con compartimentos y + SEGUIR
  const trayOn = t >= w(155) && t < TC + 0.3;
  set(CT.tray, { s: 0.8 * pop(t, w(155) + 0.05, 0.45) * (1 + 0.04 * bump(t, w(161))), r: wobble(t, 0.25, 1.2) + shake(t, TC + 0.25, 0.35, 5), o: trayOn ? 1 : 0 });
  CT.cells.forEach(o => {
    let sc = 1, tw = 0;
    if (o.k <= 4) sc = 1 + 0.06 * Math.sin(t * 5 + o.k) + 0.25 * bump(t, w(155) + 0.2 + o.k * 0.1);
    else { sc = 1 + 0.3 * bump(t, w(161) + (o.k - 5) * 0.05); tw = bump(t, w(161) + (o.k - 5) * 0.05); }
    at(o.ci, 'transform', `scale(${sc.toFixed(3)})`);
    const qm = q(o.ci, '.qm'); if (qm) qm.setAttribute('fill', tw > 0.3 ? '#D4A74A' : '#c9bfa6');
  });
  const tb = w(155) + 0.25, press = t >= w(157) && t < w(157) + 0.15 ? 0.9 : 1;
  set(CT.btn, { s: pop(t, tb, 0.4) * press * (1 + 0.035 * Math.sin(t * 7)) * out(t, TC, 0.15), r: wobble(t, 0.6, 1.5), o: t >= tb && t < TC ? 1 : 0 });
  const rk = p(t, w(157), 0.5);
  set(CT.ripple, { s: 0.3 + 1.6 * rk, o: t >= w(157) && rk < 1 ? 1 - rk : 0 });
  set(CT.tag, { s: pop(t, TC + 0.5, 0.45) * (1 + 0.03 * Math.sin(t * 4)), o: t >= TC + 0.5 ? 1 : 0 });
  CT.b0.upd(t); CT.b1.upd(t);
};

/* ================= TRANSICIONES ================= */
const WIPE = box(A.lidFace({ id: 'lfW' }), OV, 540 - 450, 900 - 450, 900, 900);
const WIPES = [];
const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
const WHIPS = [4.10, TP, w(77)];

/* ================= TITULARES ================= */
H_('Tres trucos *contra_ti*', [14, 15, 18], 6.88);
H_('El último te va a *cabrear*', [21, 22, 23, 24, 26], 8.65);
H_('Lo que compras *siempre*', [28, 29, 30, 31], w(38));
H_('…suele estar *al_fondo*', [38, 39, 40], w(42));
H_('Para que cruces *toda_la_tienda*', [42, 43, 44, 45], w(48));
H_('…y te caigan cosas en el *carro*', [48, 49, 50, 51, 52, 53, 54], T2 - 0.05);
H_('Lo más *caro*…', [56, 57, 58], w(61));
H_('…a la altura de tus *ojos*', [61, 62, 63, 64, 65, 66], w(67));
H_('*Agáchate*, cielo', [67, 68], w(69));
H_('Lo barato, *abajo*', [69, 70, 76], 26.16);
H_('Espera… el 3 es *el_bueno*', [78, 80, 81, 82, 83], T3 - 0.05);
H_('Packs de *ahorro*…', [89, 90, 91], w(92));
H_('…que no ahorran *nada*', [92, 94, 95, 96], w(97));
H_('Mira la etiqueta *pequeñita*', [97, 98, 99, 100], w(101), { maxH: 100 });
H_('Precio por *kilo* o *litro*', [102, 103, 104, 105, 107], w(108), { maxH: 100 });
H_('Es *obligatorio*', [108, 109], w(112));
H_('Y ahí se ve la *trampa*', [112, 113, 114, 115, 116, 117], TG - 0.05);
H_('Y uno de *regalo*', [118, 119, 120, 121], w(122));
H_('La *música*', [122, 123], w(124));
H_('Con música *lenta*…', [124, 125, 126], w(127));
H_('…la gente va más *despacio*', [127, 128, 129, 130, 131], w(132));
H_('…y compra *más*', [132, 133, 134], w(135));
H_('Lo midió un *estudio*', [135, 136, 138, 139], TP - 0.05);
H_('¿Cuál te ha *pillado*?', [140, 141, 142, 143], TB - 0.05);
H_('Aquí la abuela *Carmen*', [151, 152, 153, 154], w(155));
H_('*Sígueme*', [155], w(156));
H_('Hay *muchos_más*…', [160, 161], w(163));
H_('…y me los sé *todos*', [163, 165, 166, 167, 168], LT, { maxH: 100 });
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['pop', 0.31, 0.6], ['pop2', 0.75, 0.6], ['paper', w(4) - 0.05, 0.7], ['stamp', w(6)], ['boing', w(6) + 0.2, 0.5], ['pop', 2.31, 0.6], ['pop2', 2.64, 0.6], ['stamp', w(11) + 0.05],
 ['whoosh', 4.10], ['pop', w(14)], ['pop2', w(14) + 0.15], ['pop', w(14) + 0.3], ['click', w(22)], ['error', w(26), 0.8],
 ['pop', T1], ['stamp', T1 + 0.22], ['paper', T1 + 0.5, 0.6], ['tick', w(33), 0.8], ['tick', w(35), 0.8], ['tick', w(37), 0.8], ['whoosh', w(38), 0.6], ['ding', w(41), 0.8], ['swoosh_up', w(42), 0.6],
 ['pop', w(48)], ['pop2', w(48) + 0.24], ['pop', w(48) + 0.48], ['pop2', w(48) + 0.72], ['pop', w(48) + 0.96], ['thud', w(54), 0.8],
 ['pop', T2], ['stamp', T2 + 0.22], ['whoosh', T2 + 0.45, 0.5], ['ding', w(58), 0.7], ['sparkle', w(63)], ['boing', w(67), 0.7], ['cash', w(70), 0.8],
 ['tick', 26.41, 0.7], ['tick', 26.91, 0.7], ['tick', 27.41, 0.7], ['tick', 27.91, 0.8], ['tick', 28.41, 0.9], ['burst', T3], ['stamp', T3 + 0.22],
 ['pop', w(88)], ['sparkle', w(91), 0.7], ['error', w(96), 0.8], ['whoosh', w(97), 0.6], ['pop2', w(104)], ['pop', w(107)], ['stamp', w(109)], ['stamp', w(117) - 0.1], ['ding', w(117) + 0.25, 0.7],
 ['pop', TG], ['tada', TG + 0.25, 0.8], ['bell', w(123), 0.5], ['swoosh_up', w(126), 0.5], ['pop', w(127), 0.5], ['pop2', w(133)], ['pop', w(133) + 0.25], ['cash', w(134), 0.8], ['ding', w(139), 0.7],
 ['whoosh', TP], ['pop', w(145)], ['pop2', w(147)], ['pop', w(150)], ['click', w(143) + 0.3], ['click', w(143) + 0.9],
 ['whoosh', TB - 0.12, 0.7], ['bell', TB + 0.1, 0.7], ['swoosh_up', w(155)], ['pop', w(155) + 0.25], ['click', w(157)], ['sparkle', w(161), 0.7], ['whoosh', TC - 0.05, 0.5], ['thud', TC + 0.27], ['tada', TC + 0.6, 0.6], ['bell', w(168), 0.6], ['swoosh_up', LT, 0.6]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
window.frame = t => {
  at(GOLD, 'gradientTransform', `translate(${(0.22 * Math.sin(t * 0.9)).toFixed(3)} ${(0.1 * Math.cos(t * 0.7)).toFixed(3)})`);
  STG.style.setProperty('--shx', (50 + 50 * Math.sin(t * 1.1)).toFixed(1) + '%');
  set(PAT, { x: (t * 6) % 120, y: (t * 10) % 120 });
  set(SHEEN, { x: -500 + ((t * 260) % 2200), r: 20 });
  SC.forEach(s => {
    let on = t >= s.a && t < s.b;
    const loop = s === s0 && t >= LT;
    if (loop) on = true;
    s.el.style.display = on ? 'block' : 'none';
    if (!on) return;
    let x = 0, y = 0;
    if (s.enter === 'whip') x += 1080 * (1 - p(t, s.a, 0.22, E.outCubic));
    if (s.exit === 'whip') x -= 1080 * p(t, s.b - 0.18, 0.18, E.inCubic);
    if (s === s9) y -= 1920 * p(t, LT, 0.37, E.inOutCubic);
    if (loop) { y = 1920 * (1 - p(t, LT, 0.37, E.inOutCubic)); x = 0; s.upd(0); }
    else s.upd(t);
    set(s.el, { x, y });
  });
  granny(t);
  const PUN = [w(1), w(6), w(14), w(26), w(33), w(35), w(37), w(41), w(54), w(58), w(66), w(70), w(81), w(91), w(100), w(109), w(121), w(126), w(134), w(139), w(150), w(155), w(168)];
  const SHK = [0.17, w(11) + 0.05, w(26), T3, w(96), w(117), TC + 0.27];
  let b = 0; PUN.forEach(ti => b = Math.max(b, bump(t, ti)));
  let sx = 0, sy = 0; SHK.forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
  set(CAM, { s: 1 + 0.075 * b, x: sx, y: sy });
  let wv = 0; WIPES.forEach(T => { if (t > T - 0.32 && t < T + 0.4) wv = T; });
  if (wv) { const T = wv, ki = p(t, T - 0.3, 0.3, E.outCubic), ko = p(t, T + 0.06, 0.3, E.inCubic); set(WIPE, { s: 2.7 * ki, r: -120 * (1 - ki), y: -1500 * ko, sy: 1 - 0.85 * ko, o: 1 }); } else set(WIPE, { o: 0 });
  let sk = 0; WHIPS.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
  STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i) }));
  updHeads(t); updPB(t); updNP(t);
  set(HL, { o: t >= LT ? 0 : 1 });
};
Engine.start({ tail: 0.6, captions: { y: 1380, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
