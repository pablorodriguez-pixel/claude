/* LA LATA DE LA ABUELA — Ep. 1 «Trucos nº 1·2·3» */
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
const DUR = W[W.length - 1].e + 3.2;

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
const HL = el('div', OV, { left: '50px', top: '236px', width: '980px', height: '200px' });
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
const MKF = [ // t, x, y, s, ease
  [-0.12, 205, 2150, 0.72], [0.42, 205, 1150, 0.72, 'back'], [11.0, 205, 1150, 0.72], [11.3, 540, 760, 0.95], [13.45, 540, 760, 0.95], [13.9, 540, 640, 0.69],
  [18.85, 540, 640, 0.69], [19.15, 205, 1150, 0.72], [58.55, 205, 1150, 0.72], [58.85, 540, 790, 1.42, 'back'], [60.95, 540, 790, 1.42], [61.25, 205, 1150, 0.72],
  [77.05, 205, 1150, 0.72], [77.45, 540, 760, 0.86, 'back'], [79.85, 540, 760, 0.86], [80.25, 205, 1330, 0.72]];
function kf(K, t) {
  if (t <= K[0][0]) return K[0].slice(1, 4);
  for (let i = 0; i < K.length - 1; i++) { const a = K[i], b = K[i + 1]; if (t < b[0]) { const k = (b[4] === 'back' ? E.outBack : E.inOutCubic)(clamp((t - a[0]) / (b[0] - a[0]))); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)]; } }
  return K[K.length - 1].slice(1, 4);
}
const EXPR = [[0.1, 1.35, 'shout'], [1.4, 3.6, 'sly'], [3.7, 5.15, 'stern'], [5.3, 7.4, 'happy'], [7.45, 8.9, 'sly'], [8.97, 9.75, 'disgust'], [9.8, 10.4, 'shout'], [10.4, 11.0, 'wink'],
  [11.19, 12.1, 'happy'], [12.7, 13.4, 'proud'], [15.19, 16.0, 'wow'], [17.44, 18.85, 'sly'], [19.0, 19.9, 'happy'], [22.03, 23.2, 'sly'], [25.26, 26.8, 'wow'], [27.72, 28.9, 'wow'],
  [29.05, 29.7, 'sly'], [32.37, 33.45, 'happy'], [33.5, 34.4, 'wink'], [35.0, 35.5, 'happy'], [36.4, 38.3, 'stern'], [38.4, 39.25, 'proud'], [41.6, 42.55, 'wow'], [42.59, 43.6, 'happy'],
  [44.5, 45.55, 'wow'], [45.61, 46.12, 'wink'], [47.8, 48.2, 'stern'], [48.83, 49.8, 'disgust'], [49.86, 51.3, 'proud'], [52.0, 53.6, 'wow'], [54.7, 56.9, 'stern'], [57.6, 58.5, 'sly'],
  [58.6, 59.75, 'wow'], [59.76, 60.28, 'nod'], [60.3, 60.95, 'shout'], [61.3, 62.6, 'happy'], [63.8, 65.1, 'proud'], [66.48, 67.3, 'sly'], [67.47, 68.7, 'sly'], [70.5, 72.0, 'happy'],
  [72.13, 73.3, 'happy'], [74.0, 75.3, 'wow'], [76.1, 77.0, 'wink'], [77.4, 78.6, 'happy'], [78.6, 79.4, 'wink'], [79.4, 80.3, 'happy']];
const HANDS = [[0.12, 3.6, 'stop'], [3.7, 5.1, 'wag'], [11.19, 12.25, 'wave'], [19.92, 21.3, 'point'], [29.72, 31.4, 'up'], [38.61, 39.9, 'point'], [43.81, 45.0, 'up'], [51.56, 52.6, 'point'],
  [56.92, 58.45, 'up'], [61.3, 62.5, 'point'], [67.47, 68.7, 'up'], [72.87, 77.0, 'point'], [77.6, 78.7, 'wave']];
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
  set(MED, { x: x - 200, y: y - 240, s: s * (1 + 0.012 * Math.sin(t * 2.4)), r: wobble(t, 0.27, 1.4) });
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

/* ================= CABECERA FIJA: TRUCOS Nº 1·2·3 ================= */
const HDR = el('div', OV, { left: '60px', top: '148px', height: '64px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 18px 0 24px', borderRadius: '100px', background: 'linear-gradient(100deg,#8A6420 0%,#D4A74A 22%,#FFF1C4 40%,#F2D28B 50%,#C08F35 72%,#8A6420 100%)', backgroundSize: '300% 100%', border: '3px solid #5a3d0c', boxShadow: '0 6px 0 rgba(8,16,48,.45)', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '32px', color: BLUE, letterSpacing: '0.04em', zIndex: 700 });
HDR.innerHTML = '<span style="margin-right:8px">TRUCOS Nº</span>';
const HNUM = [1, 2, 3].map((n, i) => { if (i) { const d = document.createElement('span'); d.textContent = '·'; HDR.appendChild(d); } const s = document.createElement('span'); s.textContent = n; Object.assign(s.style, { display: 'inline-flex', width: '46px', height: '46px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', transition: 'none' }); HDR.appendChild(s); return s; });
function updHdr(t) {
  const cur = t >= 79.85 ? 0 : t >= 77.3 ? 4 : t >= 48.83 ? 3 : t >= 34.61 ? 2 : t >= 18.97 ? 1 : 0;
  HNUM.forEach((s, i) => { const on = cur === 4 || cur === i + 1, past = cur > i + 1 && cur !== 4; s.style.background = on ? RED : past ? 'rgba(31,60,136,.18)' : 'transparent'; s.style.color = on ? CREAM : BLUE; const ts = [18.97, 34.61, 48.83][i]; set(s, { s: 1 + 0.35 * bump(t, ts) + (cur === 4 ? 0.2 * bump(t, 77.3 + i * 0.1) : 0) }); });
  HDR.style.backgroundPosition = (50 + 50 * Math.sin(t * 0.8)) + '% 0';
  set(HDR, { s: pop(t, -0.4, 0.4), r: 0 });
}

/* ================= 0 · GANCHO ================= */
const s0 = scene(0, 5.25, { exit: 'whip' });
const H = {};
H.bin = box(A.bin(), s0.el, 660, 1000, 260, 330);
H.binX = box(A.cross(), s0.el, 740, 1110, 100, 100);
H.bd = box(A.board('hb'), s0.el, 150, 440, 760, 540);
H.grab = box(A.grab(), H.bd, 690, 160, 420, 230);
H.circ = box(`<svg viewBox="0 0 760 540" width="760" height="540" style="overflow:visible"><ellipse cx="380" cy="270" rx="350" ry="200" fill="none" stroke="${RED}" stroke-width="12" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" stroke-linecap="round" transform="rotate(-4 380 270)"/></svg>`, H.bd, 0, 0, 760, 540);
H.circE = q(H.circ, 'ellipse');
H.pm = box(A.marker('#1d1d22', RED, 'PERMANENTE', '#121216'), s0.el, 60, 420, 120, 420);
H.pmChip = chip(s0.el, '🖊️ permanente', 70, 870, { size: 32 });
const ALTO = el('div', OV, { left: '0', top: '226px', width: '1080px', display: 'flex', justifyContent: 'center', zIndex: 650 });
const ALTOp = el('div', ALTO, { position: 'relative', background: RED, color: CREAM, fontFamily: 'DMSerif', fontSize: '142px', lineHeight: 1, padding: '14px 50px 26px', borderRadius: '36px', border: '7px solid #F2D28B', boxShadow: '0 12px 0 #5a0a14, 0 24px 40px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, '¡ALTO AHÍ!');
function hookUpd(t) {
  const stopK = p(t, 0.16, 0.3, E.outBack), relK = p(t, 3.7, 0.55, E.outBack);
  let x = 70 + 34 * clamp(t / 0.16) - 24 * stopK, y = 60 + 20 * clamp(t / 0.16) - 10 * stopK, r = 15 + 3 * clamp(t / 0.16) - 3 * stopK;
  r += Math.sin(t * 31) * 0.7 * (1 - relK) * (t > 0.3 ? 1 : 0);
  x = lerp(x, 0, relK); y = lerp(y, 0, relK); r = lerp(r, 0, relK);
  set(H.bd, { x: x + shake(t, 0.16, 0.35, 16) + shake(t, 3.7, 0.3, 12), y, r, s: 1 });
  set(H.grab, { x: 560 * p(t, 3.72, 0.35, E.inCubic), y: 60 * p(t, 3.72, 0.35, E.inCubic) });
  at(H.circE, 'stroke-dashoffset', 1 - p(t, 1.94, 0.5)); H.circ.style.opacity = t < 1.94 ? 0 : out(t, 3.72, 0.2);
  const pk = pop(t, 1.39, 0.4);
  set(H.pm, { s: pk, y: (1 - pk) * 120, r: -16 + wobble(t, 0.7, 4), o: t >= 1.39 ? out(t, 3.75, 0.2) : 0 });
  chipAnim(H.pmChip, t, 1.94, 3.75, -5);
  set(H.binX, { s: t < 3.7 ? 0 : 1 + 1.4 * (1 - p(t, 3.7, 0.16, E.inCubic)), o: t >= 3.7 ? 1 : 0, r: -10 });
  const bo = p(t, 4.25, 0.45, E.inCubic);
  set(H.bin, { y: 700 * bo, r: 25 * bo + (t < 3.7 ? wobble(t, 1.4, 1.5) : 0) });
  set(H.binX, { y: 700 * bo, s: t < 3.7 ? 0 : 1 + 1.4 * (1 - p(t, 3.7, 0.16, E.inCubic)), o: t >= 3.7 ? 1 : 0, r: -10 });
}
s0.upd = hookUpd;
function altoUpd(t) {
  const on = t < 1.36;
  set(ALTO, { o: on ? out(t, 1.36, 0.14) : 0, y: 0 });
  set(ALTOp, { s: on ? pop(t, -0.14, 0.4) * (1 + 0.06 * bump(t, 0.33)) : 0, r: -4 + shake(t, 0.16, 0.4, 5) });
}

/* ================= 1 · PROMESA ================= */
const s1 = scene(5.2, 11.12, { enter: 'whip' });
const P = {};
P.rays = box(A.rays(16, 600), s1.el, -60, 160, 1200, 1200);
P.seals = [0, 1, 2].map(i => box(A.seal(i + 1), s1.el, [220, 540, 860][i] - 150, 640 - 150, 300, 370, { transformOrigin: '150px 150px' }));
P.yuck = box(A.yuck(), s1.el, 640, 790, 160, 160);
P.stink = box(`<svg viewBox="0 0 160 160" width="160" height="160" style="overflow:visible"><g stroke="#8fd19e" stroke-width="8" fill="none" stroke-linecap="round"><path d="M40 150 q-20 -25 0 -50 t0 -50"/><path d="M80 140 q-20 -25 0 -50 t0 -50"/><path d="M120 150 q-20 -25 0 -50 t0 -50"/></g></svg>`, s1.el, 640, 640, 160, 160);
P.stamp = stampEl(s1.el, '¡FUNCIONA! ✔', 250, 930, { size: 80 });
P.b1 = burst(s1.el, 540, 700, 9.8, 12, 320, 1.2);
s1.upd = t => {
  const k2 = p(t, 7.45, 0.5, E.inOutCubic);
  set(P.rays, { r: t * 12, o: 0.25 + 0.6 * k2, s: 0.8 + 0.25 * k2 });
  P.seals.forEach((e, i) => {
    const t0 = w(16) + i * 0.15, k = pop(t, t0, 0.45);
    let x = 0, y = 0, s = 0.72 * k;
    if (i < 2) { x = lerp(0, i ? -240 : -40, k2); y = lerp(0, -110, k2); s *= lerp(1, 0.62, k2); }
    else { x = lerp(0, -320, k2); y = lerp(0, 90, k2); s *= lerp(1, 1.55, k2); }
    const fl = i === 2 ? p(t, 7.6, 0.32, E.linear) : 0, sx = fl ? Math.abs(Math.cos(Math.PI * fl)) : 1;
    if (i === 2) { q(e, '.num').style.opacity = fl < 0.5 ? 1 : 0; q(e, '.qm').style.opacity = fl < 0.5 ? 0 : 1; }
    set(e, { x, y: y + wobble(t, 0.6, 6, i * 0.3), s, sx: Math.max(0.03, sx), r: wobble(t, 0.4, 3, i) + shake(t, 9.8, 0.35, 6), o: i < 2 ? lerp(1, 0.55, k2) : 1 });
  });
  const ky = pop(t, w(32), 0.4);
  set(P.yuck, { s: ky * (1 + 0.08 * Math.sin(t * 9)), r: -10 + wobble(t, 1.3, 8), o: t >= w(32) ? 1 : 0 });
  set(P.stink, { y: -((t * 60) % 30), o: t >= w(32) + 0.1 ? 0.9 : 0 });
  stampAnim(P.stamp, t, w(33), 11.2, -7);
  P.b1.upd(t);
};

/* ================= 2 · MARCA: la lata ================= */
const s2 = scene(11.08, 18.95, { exit: 'whip' });
const B = {};
B.rays = box(A.rays(20, 700), s2.el, 540 - 700, 760 - 700, 1400, 1400);
B.lid = box(A.lidFace({ id: 'lfB' }), s2.el, 90, 310, 900, 900);
B.lidSpec = q(B.lid, '.lidspec');
B.tin = box(A.tin(), s2.el, 240, 780, 600, 520, { transformOrigin: '300px 170px' });
B.items = [
  [A.spool(RED), 120, 150, 235, 830, -14], [A.spool('#2E64D8'), 120, 150, 845, 800, 12], [A.liner(), 170, 130, 330, 960, -6], [A.cushion(), 150, 130, 760, 960, 8],
  [A.thimble(), 120, 140, 450, 870, -10], [A.btn('#F2D28B', 34), 68, 68, 640, 885, 0], [A.btn('#2E64D8', 30), 60, 60, 210, 1000, 0], [A.btn(RED, 30), 60, 60, 880, 1020, 0]
].map(([h, ww, hh, x, y, r], i) => ({ e: box(h, s2.el, 540 - ww / 2, 950 - hh / 2, ww, hh), x, y, r, t0: w(49) + i * 0.1 }));
B.tag = stampEl(s2.el, 'GALLETAS: 0', 262, 1090, { size: 72 });
B.cookie = box(A.cookie(), s2.el, 780, 1050, 120, 120);
B.bC = burst(s2.el, 540, 760, w(40), 12, 330, 1.1);
B.bOpen = burst(s2.el, 540, 930, w(49), 12, 380, 1);
s2.upd = t => {
  const k = p(t, 13.45, 0.45, E.inOutCubic);
  set(B.rays, { r: t * 8, o: 0.5 + 0.2 * Math.sin(t * 2), s: lerp(1, 0.8, k), y: lerp(0, -120, k) });
  const lidIn = p(t, 11.1, 0.35, E.outBack);
  set(B.lid, { y: lerp(0, -120, k) + shake(t, w(47), 0.3, 6), s: lerp(0.955, 0.69, k) * (0.85 + 0.15 * lidIn) * (1 + 0.04 * bump(t, w(40))), sy: 1 - 0.75 * Math.sin(Math.PI * k), r: wobble(t, 0.3, 1.2) });
  at(B.lidSpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  const tk = p(t, 13.5, 0.5, E.outBack);
  set(B.tin, { y: 900 * (1 - tk) + shake(t, w(47), 0.3, 8), s: 1.2, o: t >= 13.45 ? 1 : 0 });
  B.items.forEach((o, i) => {
    const kk = p(t, o.t0, 0.55, E.outCubic), on = t >= o.t0;
    set(o.e, { x: (o.x - 540) * kk, y: (o.y - 950) * kk - 200 * Math.sin(Math.PI * kk) + wobble(t, 0.7, 5, i), s: on ? 0.3 + 0.7 * E.outBack(clamp((t - o.t0) / 0.5)) : 0, r: o.r * kk + 180 * (1 - kk) * (i % 2 ? 1 : -1), o: on ? 1 : 0 });
  });
  stampAnim(B.tag, t, w(56), 19.2, -7);
  set(B.cookie, { s: pop(t, w(58), 0.4), r: wobble(t, 0.8, 6), o: t >= w(58) ? 1 : 0 });
  B.bC.upd(t); B.bOpen.upd(t);
};

/* ================= INTROS DE TRUCO (la lata se abre) ================= */
function intro(s, n, tl, ts, to, obj) {
  const I = {};
  I.rays = box(A.rays(18, 600), s.el, 560 - 600, 640 - 600, 1200, 1200);
  I.doily = box(A.doily(190), s.el, 560 - 204, 640 - 204, 408, 408);
  I.tin = box(A.tin(), s.el, 560 - 300, 1030 - 170, 600, 520, { transformOrigin: '300px 170px' });
  I.lid = box(A.lid34(), I.tin, 0, 40, 600, 260);
  I.seal = box(A.seal(n), s.el, 560 - 150, 640 - 150, 300, 370, { transformOrigin: '150px 150px' });
  if (n === 3) { q(I.seal, '.num').style.opacity = 1; I.yuck = box(A.yuck(), s.el, 640, 640, 160, 160); }
  I.obj = box(obj.html, s.el, 560 - obj.w / 2, 1030 - obj.h / 2, obj.w, obj.h);
  I.b = burst(s.el, 560, 640, ts + 0.1, 12, 300, 1.1);
  s.upd = t => {
    const kl = p(t, tl, 0.5, E.outCubic);
    set(I.tin, { s: 0.95 * (1 + 0.05 * bump(t, tl)), y: shake(t, ts, 0.3, 10) });
    set(I.lid, { x: -260 * kl, y: -460 * kl + 300 * kl * kl, r: -40 * kl, o: 1 - p(t, tl + 0.35, 0.15) });
    const ks = p(t, ts, 0.55, E.outBack), on = t >= ts;
    set(I.seal, { y: 390 * (1 - ks) + wobble(t, 0.6, 6), s: on ? (0.25 + 0.95 * ks) * (1 + 0.06 * bump(t, ts + 0.5)) : 0, r: (1 - ks) * -30 + wobble(t, 0.4, 3), o: on ? 1 : 0 });
    set(I.doily, { s: pop(t, ts + 0.15, 0.5) * 1.05, r: t * 10, o: on ? 1 : 0 });
    set(I.rays, { r: t * 14, o: on ? 0.85 * p(t, ts, 0.3) : 0 });
    if (I.yuck) set(I.yuck, { s: pop(t, ts + 0.35, 0.4) * 0.9, r: -12 + wobble(t, 1.2, 8), o: t >= ts + 0.35 ? 1 : 0 });
    const ko = p(t, to, 0.6, E.outCubic), oo = t >= to;
    set(I.obj, { x: (obj.x - 560) * ko, y: (obj.y - 1030) * ko - 220 * Math.sin(Math.PI * ko) + wobble(t, 0.8, 6), s: (obj.s || 1) * (oo ? 0.3 + 0.7 * E.outBack(clamp((t - to) / 0.5)) : 0), r: obj.r * ko + 300 * (1 - ko), o: oo ? 1 : 0 });
    I.b.upd(t);
  };
}
const s3 = scene(18.9, 19.95, { enter: 'whip' });
intro(s3, 1, w(59) + 0.02, w(59) + 0.2, w(60) + 0.05, { html: A.marker('#F7F7FA', '#2E64D8', 'PIZARRA', '#2E64D8'), w: 120, h: 420, x: 830, y: 760, r: 28 });

/* ================= 3 · TRUCO 1: pizarra ================= */
const s4 = scene(19.92, 29.05);
const D = {};
D.bd = box(A.board('db'), s4.el, 160, 430, 760, 540);
D.hatch = q(D.bd, '.hatch'); D.er = document.getElementById('dber'); D.L = 0;
D.mk = box(A.marker('#F7F7FA', '#2E64D8', 'PIZARRA', '#2E64D8'), D.bd, 0, 0, 120, 420, { transformOrigin: '60px 404px' });
D.clock = box(A.clock(), s4.el, 750, 350, 200, 236);
D.hand = q(D.clock, '.hand'); D.sweep = q(D.clock, '.sweep');
D.eraser = box(A.eraser(), D.bd, -60, 90, 140, 340);
D.shineWrap = box('', D.bd, 22, 22, 716, 476, { overflow: 'hidden', borderRadius: '10px' });
D.shine = box('', D.shineWrap, -300, -100, 180, 700, { background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.95),rgba(255,255,255,0))', transform: 'rotate(18deg)' });
D.chk = box(A.check('#D4A74A'), s4.el, 490, 650, 100, 100);
D.chip = chip(s4.el, '🖍️ rotulador de pizarra', 470, 1000, { size: 32 });
D.dust = Array.from({ length: 10 }, (_, i) => box(`<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="${5 + (i % 3) * 2}" fill="${i % 2 ? '#2E64D8' : '#3a3a42'}" opacity=".7"/></svg>`, D.bd, 0, 0, 20, 20));
D.b = burst(s4.el, 540, 700, w(80), 16, 420, 1.3);
s4.upd = t => {
  if (!D.L) D.L = D.hatch.getTotalLength();
  const kh = p(t, 22.45, 2.25, E.linear);
  at(D.hatch, 'stroke-dashoffset', 1 - kh);
  const mOn = t >= 22.03 && t < 25.25, mIn = p(t, 22.03, 0.4, E.outCubic), mOut = p(t, 24.75, 0.4, E.inCubic);
  const pt = D.hatch.getPointAtLength(D.L * kh);
  set(D.mk, { x: pt.x - 60 + 500 * (1 - mIn) + 400 * mOut, y: pt.y - 404 - 200 * (1 - mIn) - 300 * mOut, r: 28 + Math.sin(t * 20) * 3 * (kh > 0 && kh < 1 ? 1 : 0), o: mOn ? 1 : 0 });
  // reloj
  const kc = pop(t, w(74), 0.4), ang = 360 * p(t, w(74) + 0.15, 1.35, E.linear);
  set(D.clock, { s: kc * 0.8 * out(t, 26.95, 0.2) * (1 + 0.05 * Math.sin(t * 12)), r: wobble(t, 1.5, 4), o: t >= w(74) ? 1 : 0 });
  at(D.hand, 'transform', `rotate(${ang} 100 134)`);
  const a = ang * Math.PI / 180, ex = 100 + 72 * Math.sin(a), ey = 134 - 72 * Math.cos(a);
  at(D.sweep, 'd', ang < 1 ? 'M100 134 Z' : ang >= 359.5 ? 'M100 134 m-72 0 a72 72 0 1 0 144 0 a72 72 0 1 0 -144 0' : `M100 134 L100 62 A72 72 0 ${ang > 180 ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`);
  // borrador
  const ke = p(t, w(77), 0.8, E.inOutCubic), eOn = t >= w(77) - 0.15;
  const exx = lerp(-80, 720, ke) + 500 * p(t, w(80) + 0.05, 0.35, E.inCubic);
  set(D.eraser, { x: exx + 300 * (1 - p(t, w(77) - 0.15, 0.15)), y: Math.sin(ke * Math.PI * 7) * 18, r: Math.sin(ke * 25) * 4, o: eOn ? 1 : 0 });
  at(D.er, 'x', t < w(77) ? -100 : lerp(-80, 720, ke) + 60);
  D.dust.forEach((d, i) => { const tt = t - w(77) - i * 0.06; const on = tt > 0 && tt < 0.7 && ke < 1; set(d, { x: lerp(-80, 720, clamp(ke - 0.04)) + 60 + tt * 60, y: 150 + (i * 37) % 260 + tt * 260, s: 1 - tt, o: on ? 1 : 0 }); });
  set(D.shine, { x: 1100 * p(t, w(80), 0.6, E.inOutCubic), o: t >= w(80) ? 1 : 0 });
  set(D.bd, { s: 1, r: wobble(t, 0.3, 0.8) });
  set(D.chk, { s: pop(t, w(82), 0.45) * 2.2, r: -8, o: t >= w(82) ? out(t, 29.05, 0.1) : 0 });
  chipAnim(D.chip, t, w(70), 25.3, -3);
  D.b.upd(t);
};

/* ================= 3b · ¿por qué? disolvente ================= */
const s5 = scene(29.0, 34.6, { enter: 'whip', exit: 'whip' });
const blobs = [80, 150, 220, 300, 380, 450, 530].map((x, i) => `<g class="bk" data-x="${x}"><path d="M-40 0 Q-44 -30 -16 -34 Q4 -50 24 -32 Q44 -26 40 0 Z" fill="#15151a" stroke="${INK}" stroke-width="3"/><circle cx="-8" cy="-18" r="4" fill="#fff" opacity=".35"/></g>`).join('');
const drops = Array.from({ length: 9 }, (_, i) => `<path class="dr" d="M0 -26 Q14 -4 14 6 A14 14 0 0 1 -14 6 Q-14 -4 0 -26 Z" fill="#5b8ff0" stroke="${INK}" stroke-width="3"/>`).join('');
const waves = Array.from({ length: 4 }, (_, i) => `<path class="wv" d="M${110 + i * 130} 330 q12 -14 0 -28 t0 -28" stroke="#8a93a6" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>`).join('');
const lensWhy = `<rect x="0" y="0" width="640" height="640" fill="#F3EEE2"/><rect x="0" y="420" width="640" height="240" fill="#FFFFFF"/><path d="M0 420 H640" stroke="${INK}" stroke-width="6"/>
 <text x="320" y="510" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="34" fill="#9aa3b2">superficie de la pizarra</text>
 <rect class="bl" x="0" y="372" width="640" height="50" fill="#2E64D8" opacity="0"/>${blobs}${drops}${waves}`;
const Y = {};
Y.lupa = box(A.lupa('lzW', lensWhy), s5.el, 540 - 320, 720 - 320, 780, 780, { transformOrigin: '320px 320px' });
Y.bk = qa(Y.lupa, '.bk'); Y.dr = qa(Y.lupa, '.dr'); Y.wv = qa(Y.lupa, '.wv'); Y.bl = q(Y.lupa, '.bl');
Y.q = box(`<div style="font-family:DMSerif;font-size:220px;color:${CREAM};text-shadow:0 10px 0 #0b1946">?</div>`, s5.el, 820, 380, 140, 260);
Y.chip = chip(s5.el, '🧪 disolvente', 690, 440, { size: 36 });
Y.chk = box(A.check('#D4A74A'), s5.el, 490, 910, 100, 100);
Y.b = burst(s5.el, 540, 720, w(98), 12, 330, 1.1);
s5.upd = t => {
  set(Y.lupa, { s: 1.0 * pop(t, 29.05, 0.5) * (1 + 0.04 * Math.sin(t * 1.7)), r: wobble(t, 0.3, 2) });
  set(Y.q, { s: pop(t, w(83), 0.4) * out(t, w(85), 0.2), r: 12 + wobble(t, 1.2, 8), o: t < w(85) ? 1 : 0 });
  Y.dr.forEach((d, i) => { const t0 = w(87) + i * 0.17, k = p(t, t0, 0.45, E.inCubic), x = 70 + i * 62; at(d, 'transform', `translate(${x} ${lerp(40, 360, k)}) scale(${t > t0 + 0.45 ? 0 : 1.6})`); d.style.opacity = t >= t0 ? 1 : 0; });
  Y.bl.setAttribute('opacity', 0.75 * p(t, w(88), 1.4) * (1 - p(t, w(97), 0.45)));
  at(Y.bl, 'y', 372 - 60 * p(t, w(97), 0.45));
  const kSoft = p(t, w(95), 0.4), kLift = p(t, w(97) - 0.05, 0.5, E.inCubic);
  Y.bk.forEach((b, i) => { const x = +b.dataset.x; const sq = kSoft * (kLift < 1 ? Math.sin(t * 22 + i) * 0.18 : 0); at(b, 'transform', `translate(${x} ${420 - 380 * kLift}) scale(${1 + sq} ${1 - sq + 0.0001}) rotate(${kSoft * Math.sin(t * 9 + i) * 10})`); q(b, 'path').setAttribute('fill', kSoft > 0.5 ? '#5d5d68' : '#15151a'); b.style.opacity = 1 - kLift; });
  Y.wv.forEach((v, i) => { v.style.opacity = kSoft * (1 - kLift); at(v, 'transform', `translate(0 ${-((t * 50 + i * 12) % 24)})`); });
  chipAnim(Y.chip, t, w(93), 34.6, -4);
  set(Y.chk, { s: pop(t, w(98), 0.45) * 1.6, o: t >= w(98) ? 1 : 0, r: -6 });
  Y.b.upd(t);
};

/* ================= 4 · TRUCO 2: cremallera ================= */
const s6 = scene(34.55, 35.6, { enter: 'whip' });
intro(s6, 2, w(100) + 0.02, w(100) + 0.2, w(101) + 0.05, { html: A.pencil(), w: 470, h: 80, x: 780, y: 820, r: -35 });
const s7 = scene(35.55, 43.8, { exit: 'whip' });
const Z = {};
Z.panel = box('', s7.el, 250, 420, 580, 640, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
Z.svgWrap = box(`<svg viewBox="0 0 360 700" width="310" height="603" style="overflow:visible"></svg>`, s7.el, 385, 440, 310, 603);
(function buildZip() {
  const sv = q(Z.svgWrap, 'svg'), NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, a, par = sv) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); par.appendChild(e); return e; };
  mk('rect', { x: 60, y: 0, width: 116, height: 700, fill: BLUE, stroke: INK, 'stroke-width': 5 });
  mk('rect', { x: 184, y: 0, width: 116, height: 700, fill: BLUE2, stroke: INK, 'stroke-width': 5 });
  mk('path', { d: 'M78 0 V700 M282 0 V700', stroke: '#F2D28B', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
  Z.gap = mk('path', { d: 'M180 500 Z', fill: '#e9e0cc', stroke: INK, 'stroke-width': 3 });
  Z.trail = mk('rect', { x: 150, y: 0, width: 60, height: 0, rx: 30, fill: '#FFF1C4', opacity: 0 });
  Z.teeth = [];
  for (let y = 22; y < 690; y += 24) {
    const L = mk('g', {}), Rr = mk('g', {});
    mk('rect', { x: 154, y: y - 7, width: 32, height: 14, rx: 4, fill: 'url(#goldG)', stroke: INK, 'stroke-width': 3 }, L);
    const gl = mk('rect', { x: 158, y: y - 4, width: 22, height: 6, rx: 3, fill: '#d9dee8', opacity: 0 }, L);
    mk('rect', { x: 174, y: y + 5, width: 32, height: 14, rx: 4, fill: 'url(#goldG)', stroke: INK, 'stroke-width': 3 }, Rr);
    const gr = mk('rect', { x: 180, y: y + 8, width: 22, height: 6, rx: 3, fill: '#d9dee8', opacity: 0 }, Rr);
    Z.teeth.push({ y, L, R: Rr, gl, gr });
  }
  Z.slider = mk('g', {});
  mk('path', { d: 'M146 -34 L214 -34 L206 38 L154 38 Z', fill: 'url(#silverG)', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, Z.slider);
  mk('rect', { x: 168, y: 28, width: 24, height: 86, rx: 11, fill: 'url(#silverG)', stroke: INK, 'stroke-width': 5 }, Z.slider);
  mk('rect', { x: 175, y: 74, width: 10, height: 26, rx: 5, fill: INK }, Z.slider);
  mk('path', { d: 'M156 -26 L168 -26 L164 30', stroke: '#fff', 'stroke-width': 4, fill: 'none', opacity: 0.7 }, Z.slider);
})();
Z.sweat = [0, 1, 2].map(i => box(A.drop('#86B8F2'), s7.el, 0, 0, 60, 84, { transformOrigin: '30px 50px' }));
Z.grr = box(`<div style="font-family:DMSerif;font-size:76px;color:${RED};-webkit-text-stroke:3px ${CREAM};text-shadow:0 6px 0 #0b1946">¡GRRR!</div>`, s7.el, 610, 560, 300, 100);
Z.arrow = box(`<svg viewBox="0 0 80 140" width="80" height="140"><path d="M40 6 L76 56 L54 56 L54 134 L26 134 L26 56 L4 56 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`, s7.el, 300, 760, 80, 140);
Z.pencil = box(A.pencil(), s7.el, 0, 0, 470, 80, { transformOrigin: '2px 40px' });
Z.chip = chip(s7.el, '✨ sube sola', 600, 990, { size: 34 });
Z.bs = burst(s7.el, 540, 520, w(122), 12, 260, 1);
Z.bs2 = burst(s7.el, 540, 520, w(126), 10, 300, 1);
Z.spark = Array.from({ length: 8 }, (_, i) => box(A.star('#e8edf5'), s7.el, 0, 0, 60, 60));
s7.upd = t => {
  const st = t < w(121) ? 1 : 0;
  const kUp = p(t, w(122), 0.95, E.outCubic);
  let sY = lerp(520, 40, kUp) + (t < 38.4 ? Math.sin(t * 46) * 5 : 0);
  at(Z.slider, 'transform', `translate(0 ${sY.toFixed(1)}) rotate(${t < 38.4 ? Math.sin(t * 30) * 3 : 0} 180 0)`);
  const rub = p(t, w(115), w(120) - w(115) + 0.6, E.linear);
  Z.teeth.forEach(o => { const d = clamp((sY - o.y) * 0.22, 0, 44); at(o.L, 'transform', `translate(${-d} 0)`); at(o.R, 'transform', `translate(${d} 0)`); const g = o.y > 230 && o.y < 540 ? rub : rub * 0.4; o.gl.setAttribute('opacity', g * 0.9); o.gr.setAttribute('opacity', g * 0.9); });
  at(Z.gap, 'd', `M180 ${sY.toFixed(1)} L${(180 - Math.min(44, sY * 0.22) - 8).toFixed(1)} 0 L${(180 + Math.min(44, sY * 0.22) + 8).toFixed(1)} 0 Z`);
  Z.trail.setAttribute('y', sY); Z.trail.setAttribute('height', Math.max(0, 520 - sY)); Z.trail.setAttribute('opacity', 0.7 * (t >= w(122) ? 1 - p(t, w(124), 0.6) : 0));
  set(Z.svgWrap, { r: wobble(t, 0.4, 1.2), s: 1 });
  // atasco
  const stuck = t >= 35.6 && t < 38.4;
  Z.sweat.forEach((e, i) => { const ph = ((t - 35.7 + i * 0.33) % 1); set(e, { x: [330, 690, 720][i] + ph * [-50, 60, 40][i], y: [560, 600, 780][i] - ph * 50 + ph * ph * 120, s: 0.7 * (1 - ph * 0.5), r: [-30, 30, 40][i], o: stuck && t > 35.7 + i * 0.33 ? 1 : 0 }); });
  set(Z.grr, { s: pop(t, w(106), 0.35) * (1 + 0.06 * Math.sin(t * 25)), r: -8 + shake(t, w(110), 0.4, 6), o: t >= w(106) && t < 38.4 ? 1 : 0 });
  const ab = (t * 2.2) % 1;
  set(Z.arrow, { y: -40 * Math.sin(Math.PI * ab) * (ab < 0.5 ? 1 : 0.4), o: t >= 35.7 && t < 38.4 ? 1 : 0, s: 0.9 });
  // lápiz
  const pk = p(t, w(113), 0.45, E.outBack), pOut = p(t, w(121), 0.35, E.inCubic);
  const rubY = 440 + 0.86 * (370 + 130 * Math.sin((t - w(115)) * 9)) * (t >= w(115) ? 1 : 0) + (t < w(115) ? 0.86 * 370 : 0);
  set(Z.pencil, { x: 560 + 600 * (1 - pk) + 500 * pOut, y: rubY - 40, r: -28 + (t >= w(115) && t < w(121) ? Math.sin(t * 18) * 4 : 0), o: t >= w(113) - 0.05 && pOut < 1 ? 1 : 0 });
  Z.spark.forEach((e, i) => { const ph = (t * 1.7 + i / 8) % 1; set(e, { x: 500 + (i % 2 ? 50 : -40) + i * 3, y: 440 + 0.86 * (250 + (i * 41) % 260), s: 0.55 * Math.sin(Math.PI * ph), r: ph * 90, o: t >= w(115) && t < w(121) + 0.3 ? 1 : 0 }); });
  chipAnim(Z.chip, t, w(123), 43.8, -4);
  Z.bs.upd(t); Z.bs2.upd(t);
};

/* ================= 4b · grafito ================= */
const s8 = scene(43.75, 46.18, { enter: 'whip' });
const GR = {};
GR.pencil = box(A.pencil(), s8.el, 540 - 235, 470, 470, 80, { transformOrigin: '235px 40px' });
GR.panel = box('', s8.el, 150, 600, 780, 400, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
GR.zoom = box(`<svg viewBox="0 0 780 200" width="780" height="200" style="overflow:visible"><path d="M155 0 L0 130 M155 0 L780 130" stroke="${CREAM}" stroke-width="4" stroke-dasharray="10 10" opacity=".8"/></svg>`, s8.el, 150, 470, 780, 200);
GR.layers = [0, 1, 2, 3].map(i => box(A.layers(), s8.el, 260, 650 + i * 76, 560, 70));
GR.arL = box(`<div style="font-family:Fredoka;font-weight:700;font-size:80px;color:${RED}">⟵</div>`, s8.el, 168, 720, 100, 100);
GR.arR = box(`<div style="font-family:Fredoka;font-weight:700;font-size:80px;color:${RED}">⟶</div>`, s8.el, 820, 760, 100, 100);
GR.chip = chip(s8.el, '✏️ grafito', 560, 1020, { size: 38 });
s8.upd = t => {
  set(GR.pencil, { s: 1.35 * pop(t, 43.8, 0.4), r: wobble(t, 0.6, 2) });
  set(GR.zoom, { o: p(t, 44.0, 0.3) });
  const amp = 30 + 70 * p(t, w(130), 0.4), sp = 3 + 4 * p(t, w(130), 0.4);
  GR.layers.forEach((e, i) => set(e, { x: Math.sin(t * sp + i * 1.3) * amp * (t > w(129) ? 1 : 0.3), s: pop(t, 43.9 + i * 0.08, 0.35), o: t >= 43.9 + i * 0.08 ? 1 : 0 }));
  set(GR.arL, { x: -Math.abs(Math.sin(t * 5)) * 16, o: t >= w(129) ? 1 : 0 });
  set(GR.arR, { x: Math.abs(Math.sin(t * 5)) * 16, o: t >= w(129) ? 1 : 0 });
  set(GR.panel, { s: pop(t, 43.85, 0.4) });
  chipAnim(GR.chip, t, w(128), 46.2, -4);
};
const s9 = scene(46.12, 48.85, { exit: 'whip' });
const LK = {};
LK.door = box('', s9.el, 200, 420, 680, 640, { background: 'repeating-linear-gradient(90deg,#9b6a3f 0 60px,#a7744a 60px 62px,#93623a 62px 130px)', border: '6px solid #5e3a1c', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
LK.lock = box(A.lock(), s9.el, 390, 510, 300, 420);
LK.key = box(A.key(), s9.el, 540 - 80, 700 - 250, 160, 330, { transformOrigin: '80px 250px' });
LK.puff = Array.from({ length: 9 }, (_, i) => box(`<svg viewBox="0 0 60 60" width="60" height="60"><circle cx="30" cy="30" r="${16 + (i % 3) * 6}" fill="#7d8698" opacity=".75"/></svg>`, s9.el, 510, 670, 60, 60));
LK.sweat = [0, 1].map(i => box(A.drop('#86B8F2'), s9.el, 0, 0, 60, 84));
LK.clic = box(`<div style="font-family:DMSerif;font-size:84px;color:${CREAM};text-shadow:0 6px 0 #0b1946;font-style:italic">¡clic!</div>`, s9.el, 640, 560, 260, 120);
LK.b = burst(s9.el, 540, 700, w(141) + 0.3, 12, 260, 1);
s9.upd = t => {
  set(LK.door, { s: pop(t, 46.14, 0.4) });
  set(LK.lock, { s: pop(t, 46.25, 0.45), r: shake(t, w(141), 0.3, 3) });
  const ki = p(t, w(138), 0.35, E.outCubic);
  const turn = p(t, w(141) + 0.22, 0.32, E.outBack);
  const strug = t > w(140) - 0.1 && t < w(141) + 0.22 ? Math.sin(t * 46) * 9 : 0;
  set(LK.key, { x: 260 * (1 - ki), y: 300 * (1 - ki), s: 1 + 0.6 * (1 - ki), r: strug + 90 * turn, o: t >= w(138) ? 1 : 0 });
  LK.puff.forEach((e, i) => { const k = p(t, w(141), 0.6, E.outCubic), a = i / 9 * Math.PI * 2; set(e, { x: Math.cos(a) * 140 * k, y: Math.sin(a) * 100 * k - 30 * k, s: 0.4 + k, o: t >= w(141) ? 0.9 * (1 - k) : 0 }); });
  LK.sweat.forEach((e, i) => { const ph = (t * 2 + i * 0.5) % 1; set(e, { x: (i ? 660 : 400) + ph * (i ? 40 : -40), y: 560 - ph * 40 + ph * ph * 100, s: 0.6, o: t > w(140) - 0.1 && t < w(141) + 0.2 ? 1 : 0 }); });
  set(LK.clic, { s: pop(t, w(141) + 0.4, 0.3), r: -8, o: t >= w(141) + 0.4 ? 1 : 0 });
  LK.b.upd(t);
};

/* ================= 5 · TRUCO 3: camisa / saliva ================= */
const s10 = scene(48.78, 51.4, { enter: 'whip' });
intro(s10, 3, w(143), w(144) - 0.1, w(147), { html: A.shirt('ish'), w: 560, h: 600, x: 840, y: 900, r: 12, s: 0.5 });
q(s10.el, '.stain').style.opacity = 0;
const s11 = scene(51.35, 61.05, { exit: 'whip' });
const SH = {};
SH.taps = [box(A.tap('#2E64D8', 'cold'), s11.el, 330 - 150, 640 - 235, 300, 470), box(A.tap(RED, 'hot'), s11.el, 770 - 150, 640 - 235, 300, 470)];
SH.water = q(SH.taps[0], '.water'); SH.waterH = q(SH.taps[1], '.water');
SH.snow = box(A.snow(), s11.el, 230, 360, 100, 100);
SH.flame = box(A.flame(), s11.el, 670, 360, 100, 100);
SH.steam = box(`<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><g stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"><path d="M20 110 q-14 -20 0 -40 t0 -40"/><path d="M60 110 q-14 -20 0 -40 t0 -40"/><path d="M100 110 q-14 -20 0 -40 t0 -40"/></g></svg>`, s11.el, 810, 740, 120, 120);
SH.ok = box(A.check('#2f9e5b'), s11.el, 180, 790, 100, 100);
SH.no = box(A.cross(), s11.el, 720, 590, 100, 100);
SH.shirt = box(A.shirt('ssh'), s11.el, 560 - 280, 760 - 300, 560, 600);
SH.stain = q(SH.shirt, '.stain'); SH.stainIn = q(SH.shirt, '.stainIn'); SH.stainP = qa(SH.shirt, '.stainIn path, .stainIn circle');
SH.drop = box(A.drop(RED), s11.el, 490 - 30, 750 - 70, 60, 84);
SH.lock = box(A.padlock(), s11.el, 0, 0, 120, 140);
SH.fija = stampEl(s11.el, '¡LA FIJA!', 560, 1130, { size: 64 });
SH.ring = box(`<svg viewBox="0 0 200 200" width="200" height="200" style="overflow:visible"><circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldG)" stroke-width="14"/><circle cx="100" cy="100" r="80" fill="none" stroke="${INK}" stroke-width="3"/><path d="M158 158 L200 200" stroke="#7A1F2B" stroke-width="22" stroke-linecap="round"/></svg>`, s11.el, 0, 0, 200, 200);
SH.big = box(`<div class="sal" style="font-family:DMSerif;font-size:190px;line-height:1;color:${CREAM};-webkit-text-stroke:5px ${RED};white-space:nowrap">¡SALIVA!</div>`, s11.el, 0, 1150, 1080, 200, { display: 'flex', justifyContent: 'center' });
SH.sal = q(SH.big, '.sal');
SH.splash = burst(s11.el, 490, 750, w(153), 10, 140, 0.7);
SH.bS = burst(s11.el, 540, 1240, w(177), 14, 420, 1.3);
s11.upd = t => {
  const kT = p(t, w(157) - 0.1, 0.4, E.inOutCubic), kB = p(t, w(166), 0.45, E.inOutCubic), kBig = p(t, 58.6, 0.3, E.inOutCubic);
  // camisa: centro -> abajo (grifos) -> centro grande
  let sx = 560, sy = 760, ss = 1;
  sx = lerp(sx, 540, kT); sy = lerp(sy, 1050, kT); ss = lerp(ss, 0.44, kT);
  sx = lerp(sx, 560, kB); sy = lerp(sy, 770, kB); ss = lerp(ss, 1.08, kB);
  ss *= lerp(1, 0.8, kBig);
  set(SH.shirt, { x: sx - 560, y: sy - 760 + wobble(t, 0.4, 5), s: ss * pop(t, 51.36, 0.4), r: wobble(t, 0.3, 1.5), o: lerp(1, 0.3, kBig) });
  // gota
  const kd = p(t, w(151), w(153) - w(151), E.inCubic);
  set(SH.drop, { y: -330 * (1 - kd), s: 1 + 0.2 * Math.sin(t * 20) * (1 - kd), sy: 1 + 0.25 * kd, o: t >= w(151) && t < w(153) ? 1 : 0 });
  // mancha
  const kst = t < w(153) ? 0 : E.outBack(clamp((t - w(153)) / 0.3));
  const small = p(t, w(171), 0.45, E.inOutCubic);
  at(SH.stain, 'transform', `translate(210 290) scale(${kst * lerp(1, 0.45, small) * (1 + 0.15 * kB * 0)})`);
  const fixK = p(t, w(163), 0.6) * (1 - p(t, w(166), 0.3));
  const col = fixK > 0.5 ? '#6e0f1c' : RED;
  SH.stainP.forEach(e => e.getAttribute('fill') !== '#fff' && e.setAttribute('fill', col));
  // grifos
  SH.taps.forEach((e, i) => { const t0 = i ? w(159) : w(157); set(e, { s: 0.85 * pop(t, t0, 0.4) * out(t, w(166) + 0.3, 0.3), r: wobble(t, 0.5, 1.5, i), o: t >= t0 ? 1 : 0 }); });
  const kw = p(t, w(157) + 0.2, 0.35);
  at(SH.water, 'transform', `translate(237 168) scale(1 ${kw}) translate(-237 -168)`); SH.water.setAttribute('opacity', kw ? 0.9 : 0);
  at(SH.waterH, 'transform', `translate(237 168) scale(1 0.01) translate(-237 -168)`);
  set(SH.snow, { s: pop(t, w(158), 0.4) * out(t, w(166) + 0.3), r: t * 30, o: t >= w(158) ? 1 : 0 });
  set(SH.flame, { s: pop(t, w(160), 0.4) * out(t, w(166) + 0.3) * (1 + 0.08 * Math.sin(t * 20)), o: t >= w(160) ? 1 : 0 });
  set(SH.steam, { y: -((t * 40) % 20), o: t >= w(160) && t < w(166) + 0.2 ? 0.9 : 0 });
  set(SH.ok, { s: pop(t, w(158), 0.4) * out(t, w(166) + 0.3), o: t >= w(158) ? 1 : 0 });
  stampAnim(SH.no, t, w(160), w(166) + 0.3, -10);
  // candado sobre la mancha fijada
  const stX = sx + (210 - 280) * ss, stY = sy + (290 - 300) * ss;
  set(SH.lock, { x: stX - 60 + 40, y: stY - 70 - 40, s: pop(t, w(164), 0.35) * out(t, w(166) + 0.2) * 0.8, o: t >= w(164) ? 1 : 0, r: 10 });
  stampAnim(SH.fija, t, w(165) - 0.05, w(166) + 0.25, -7);
  // lupa sobre mancha pequeña
  set(SH.ring, { x: stX - 100, y: stY - 100, s: pop(t, w(169), 0.4) * lerp(1, 0.75, small) * (1 - kBig), r: wobble(t, 0.8, 6), o: t >= w(169) && t < 58.9 ? 1 : 0 });
  // ¡SALIVA!
  const kS = t >= w(177) ? 1 : 0;
  set(SH.big, { s: kS ? (1 + 0.5 * (1 - p(t, w(177), 0.2, E.outCubic))) : 0, o: kS, r: -4 + shake(t, w(177), 0.45, 4), x: shake(t, w(177) + 0.05, 0.4, 14) });
  SH.sal.style.textShadow = (glitch(t, w(177), 0.35) || glitch(t, w(177) + 0.4, 0.2) || '0 10px 0 #0b1946');
  SH.splash.upd(t); SH.bS.upd(t);
};

/* ================= 5b · enzimas ================= */
const s12 = scene(61.0, 63.4, { enter: 'whip' });
const sbl = [[320, 330, 52], [270, 300, 36], [372, 296, 38], [262, 368, 34], [380, 372, 40], [320, 260, 30], [320, 400, 32], [230, 330, 24], [412, 334, 26], [300, 330, 30]];
const lensEz = `<rect width="640" height="640" fill="url(#weave)"/>${sbl.map(([x, y, r]) => `<circle class="sb" cx="${x}" cy="${y}" r="${r}" fill="${RED}"/>`).join('')}<g class="ezs"></g>`;
const EZ = {};
EZ.lupa = box(A.lupa('lzE', lensEz), s12.el, 540 - 320, 730 - 320, 780, 780, { transformOrigin: '320px 320px' });
EZ.sb = qa(EZ.lupa, '.sb');
EZ.g = q(EZ.lupa, '.ezs');
EZ.list = Array.from({ length: 5 }, (_, i) => {
  const NS = 'http://www.w3.org/2000/svg', g = document.createElementNS(NS, 'g'); EZ.g.appendChild(g);
  g.innerHTML = `<path class="bd" fill="${['#F2D28B', '#B9E3C2', '#F2D28B', '#B9E3C2', '#F2D28B'][i]}" stroke="${INK}" stroke-width="4"/><circle cx="4" cy="-16" r="5" fill="${INK}"/><circle cx="6" cy="-18" r="1.8" fill="#fff"/><circle cx="-8" cy="-4" r="5" fill="#F08A8A" opacity=".6"/>`;
  const a0 = i / 5 * Math.PI * 2 + 0.4;
  return { g, bd: g.querySelector('.bd'), sx: 320 + 330 * Math.cos(a0), sy: 320 + 330 * Math.sin(a0), tg: [i, i + 5] };
});
const eatT = j => w(181) + j * 0.17;
EZ.chip = chip(s12.el, '🔬 enzimas', 700, 445, { size: 38 });
EZ.b = burst(s12.el, 540, 740, w(184) + 0.1, 12, 300, 1);
s12.upd = t => {
  set(EZ.lupa, { s: 1.0 * pop(t, 61.05, 0.45), r: wobble(t, 0.3, 2) });
  EZ.sb.forEach((c, j) => { const k = p(t, eatT(j), 0.22); c.setAttribute('r', sbl[j][2] * (1 - k) + 0.01); });
  EZ.list.forEach((z, i) => {
    const ts = [w(179) - 0.1, eatT(z.tg[0]) - 0.05, eatT(z.tg[1]) - 0.05], P0 = [z.sx, z.sy], P1 = sbl[z.tg[0]], P2 = sbl[z.tg[1]];
    let x, y;
    if (t < ts[1]) { const k = E.inOutCubic(clamp((t - ts[0]) / (ts[1] - ts[0]))); x = lerp(P0[0], P1[0] + 30, k); y = lerp(P0[1], P1[1], k); }
    else { const k = E.inOutCubic(clamp((t - ts[1]) / (ts[2] - ts[1]))); x = lerp(P1[0] + 30, P2[0] + 30, k); y = lerp(P1[1], P2[1], k); }
    if (t > ts[2] + 0.2) { const k = p(t, ts[2] + 0.2, 0.5); x = lerp(P2[0] + 30, P0[0], k); y = lerp(P2[1], P0[1], k) - 40 * Math.sin(Math.PI * k); }
    const ma = 0.08 + 0.55 * Math.abs(Math.sin(t * 15 + i)), r = 34;
    at(z.bd, 'd', `M0 0 L${(r * Math.cos(Math.PI + ma)).toFixed(1)} ${(r * Math.sin(Math.PI + ma)).toFixed(1)} A${r} ${r} 0 1 1 ${(r * Math.cos(Math.PI - ma)).toFixed(1)} ${(r * Math.sin(Math.PI - ma)).toFixed(1)} Z`);
    at(z.g, 'transform', `translate(${x.toFixed(1)} ${(y + Math.sin(t * 12 + i) * 4).toFixed(1)}) scale(${t >= ts[0] ? 1.1 : 0})`);
  });
  chipAnim(EZ.chip, t, w(179), 63.4, -4);
  EZ.b.upd(t);
};

/* ================= 5c · restauración ================= */
const s13 = scene(63.33, 67.4, { enter: 'whip' });
const MU = {};
MU.pt = box(A.painting('pM'), s13.el, 540 - 320, 730 - 260, 640, 520, { transformOrigin: '320px 260px' });
MU.dabs = qa(MU.pt, '.dab'); MU.D = A._dabs;
MU.swab = box(A.swab(), s13.el, 0, 0, 300, 300, { transformOrigin: '24px 34px' });
MU.chip = chip(s13.el, '🖼️ Así se limpia en restauración', 370, 1085, { size: 30 });
MU.b = burst(s13.el, 540, 730, w(193), 16, 420, 1.3);
s13.upd = t => {
  const S = 1.2;
  set(MU.pt, { s: S * pop(t, 63.35, 0.45), r: wobble(t, 0.3, 0.8) });
  const n = MU.D.length, k = p(t, w(186), w(192) + 0.4 - w(186), E.linear), fi = k * n;
  const fin = p(t, w(193), 0.4);
  MU.dabs.forEach((d, i) => d.setAttribute('opacity', Math.max(clamp(fi - i), fin)));
  const i0 = Math.min(n - 1, Math.floor(fi)), i1 = Math.min(n - 1, i0 + 1), f = fi - Math.floor(fi);
  const dx = lerp(MU.D[i0][0], MU.D[i1][0], f) + Math.cos(t * 26) * 14, dy = lerp(MU.D[i0][1], MU.D[i1][1], f) + Math.sin(t * 26) * 14;
  const sx = 540 + (dx - 320) * S, sy = 730 + (dy - 260) * S;
  const sOn = t >= w(185) && t < w(193) + 0.2, sIn = p(t, w(185), 0.35);
  set(MU.swab, { x: sx - 24 + 400 * (1 - sIn) + 600 * p(t, w(193), 0.3, E.inCubic), y: sy - 34 + 300 * (1 - sIn), r: Math.sin(t * 8) * 6, o: sOn ? 1 : 0 });
  chipAnim(MU.chip, t, w(190), 67.4, -2);
  MU.b.upd(t);
};

/* ================= 6 · ENCUESTA ================= */
const s14 = scene(67.3, 72.08, { exit: 'whip' });
const PO = {};
PO.card = box('', s14.el, 80, 430, 860, 470, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
const icons = [A.marker('#F7F7FA', '#2E64D8', '', '#2E64D8'), A.pencil(), A.drop(RED)];
PO.rows = ['Rotulador en la pizarra', 'Lápiz en la cremallera', 'Saliva en la mancha'].map((txt, i) => {
  const r = box('', PO.card, 26, 26 + i * 142, 796, 126, { borderRadius: '28px', border: '4px solid transparent' });
  const n = box(`<div style="width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#8A6420,#F2D28B 45%,#FFF1C4 55%,#C08F35);border:4px solid #5a3d0c;display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:58px;color:${BLUE}">${i + 1}</div>`, r, 14, 15, 96, 96);
  el('div', r, { left: '126px', top: '12px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: '40px', color: BLUE, whiteSpace: 'nowrap' }, txt);
  const tr = box('', r, 126, 74, 560, 26, { background: '#e6dcc6', borderRadius: '13px', overflow: 'hidden' });
  const fill = box('', tr, 0, 0, 560, 26, { background: 'linear-gradient(90deg,#C08F35,#F2D28B,#D4A74A)', borderRadius: '13px', transformOrigin: '0 50%' });
  const ic = box(icons[i], r, 700, 10, [120, 470, 60][i], [420, 80, 84][i], { transformOrigin: '0 0' });
  set(ic, { s: [0.24, 0.2, 1.1][i], r: [40, -30, 0][i], x: [10, -8, 18][i] });
  return { r, fill, n, ic };
});
const tSay = [w(199), w(201), w(204)];
const fills = [0.62, 0.47, 0.84];
PO.coms = [['L', '#C8102E', '@lola_mz', 'El 3 me ha dado asco pero lo voy a probar 😂'], ['P', '#2A4FA8', '@paco.1958', 'Mi abuela lo del lápiz SIEMPRE'], ['N', '#8a6420', '@nerea_bcn', '¿¡El 1!? Yo tiré una pizarra el año pasado 😭']].map(([ini, c, u, txt], i) => {
  const b = el('div', s14.el, { left: '370px', top: px(920 + i * 136), width: '570px', background: '#FFFFFF', borderRadius: '26px', padding: '12px 20px 14px 96px', boxShadow: '0 8px 0 rgba(8,16,48,.35)', border: '3px solid #e6dcc6' });
  b.innerHTML = `<div style="position:absolute;left:16px;top:14px;width:64px;height:64px;border-radius:50%;background:${c};color:#fff;font-family:Fredoka;font-weight:700;font-size:34px;display:flex;align-items:center;justify-content:center">${ini}</div><div style="font-family:Fredoka;font-weight:600;font-size:24px;color:#8a8f9c">${u}</div><div style="font-family:Fredoka;font-weight:500;font-size:31px;line-height:1.15;color:${INK}">${txt}</div><div style="position:absolute;right:16px;top:12px;font-size:26px;color:#c9ccd4">♡</div>`;
  return b;
});
s14.upd = t => {
  set(PO.card, { s: pop(t, w(195), 0.45), r: wobble(t, 0.3, 0.6) });
  PO.rows.forEach((o, i) => {
    const t0 = tSay[i], act = t >= t0 && (i === 2 || t < tSay[i + 1]);
    o.r.style.borderColor = act ? RED : 'transparent'; o.r.style.background = act ? 'rgba(200,16,46,.07)' : 'transparent';
    set(o.r, { s: 1 + 0.05 * bump(t, t0), o: t >= w(195) + 0.2 + i * 0.12 ? 1 : 0 });
    set(o.fill, { sx: Math.max(0.001, fills[i] * p(t, t0, 0.8, E.outCubic)) });
    set(o.n, { r: shake(t, t0, 0.35, 8), s: 1 + 0.15 * bump(t, t0) });
  });
  PO.coms.forEach((b, i) => { const t0 = w(205) + i * 0.45; set(b, { x: 600 * (1 - p(t, t0, 0.4, E.outBack)), o: t >= t0 ? 1 : 0, r: (i % 2 ? 1 : -1) * 1.2 }); });
};

/* ================= 7 · CIERRE: colección + SEGUIR + tarjeta ================= */
const s15 = scene(72.0, 80.3, { enter: 'whip' });
const CT = {};
(function buildTray() {
  let beads = ''; for (let i = 0; i < 56; i++) { const a = i / 56 * Math.PI * 2; beads += `<circle cx="${f1(400 + 381 * Math.cos(a))}" cy="${f1(400 + 381 * Math.sin(a))}" r="5" fill="#F7DFA0" stroke="#7a5418" stroke-width="1.6"/>`; }
  const rows = [3, 4, 5, 4, 3]; let cells = '', k = 0; const scal = (r, n) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r - 6; d += (i ? 'L' : 'M') + f1(rr * Math.cos(a)) + ' ' + f1(rr * Math.sin(a)); } return d + 'Z'; };
  const ic = [`<g transform="rotate(35) translate(-8 -34)"><rect x="0" y="0" width="16" height="50" rx="5" fill="#F7F7FA" stroke="${INK}" stroke-width="3"/><rect x="0" y="8" width="16" height="10" fill="#2E64D8"/><path d="M3 50 L13 50 L8 64 Z" fill="#2E64D8" stroke="${INK}" stroke-width="2"/></g>`,
    `<g transform="rotate(-35) translate(-38 -8)"><rect x="12" y="0" width="56" height="16" fill="#F5C542" stroke="${INK}" stroke-width="3"/><path d="M0 8 L12 0 L12 16 Z" fill="#3c3c46" stroke="${INK}" stroke-width="2"/><rect x="66" y="0" width="12" height="16" rx="4" fill="#E98394" stroke="${INK}" stroke-width="3"/></g>`,
    `<path d="M0 -26 Q16 -2 16 8 A16 16 0 0 1 -16 8 Q-16 -2 0 -26 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`];
  rows.forEach((n, ri) => { for (let c = 0; c < n; c++) { const x = 400 + (c - (n - 1) / 2) * 140, y = 400 + (ri - 2) * 128; k++;
    const lit = k <= 3;
    cells += `<g class="cell" data-k="${k}" transform="translate(${x} ${y})"><g class="ci"><path d="${scal(64, 18)}" fill="#FFFDF7" stroke="#bfb39a" stroke-width="3"/><circle r="48" fill="${lit ? '#FFF6DE' : '#EFE6D2'}" stroke="#e2d8c4" stroke-width="3"/>
      ${lit ? `<circle class="glow" r="60" fill="none" stroke="url(#goldG)" stroke-width="8"/>${ic[k - 1]}<text y="44" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">Nº ${k}</text>` : `<text class="qm" y="18" text-anchor="middle" font-family="DMSerif" font-size="56" fill="#c9bfa6">?</text><text y="44" text-anchor="middle" font-family="Fredoka" font-weight="600" font-size="17" fill="#b5ab92">Nº ${k}</text>`}</g></g>`; } });
  CT.tray = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><circle cx="412" cy="414" r="398" fill="rgba(5,12,40,.4)"/><circle cx="400" cy="400" r="398" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="6"/>${beads}<circle cx="400" cy="400" r="368" fill="#0f1d48" stroke="#5a3d0c" stroke-width="4"/><circle cx="400" cy="400" r="352" fill="none" stroke="#F2D28B" stroke-width="3" stroke-dasharray="2 10" opacity=".7"/>${cells}</svg>`, s15.el, 140, 360, 800, 800);
})();
CT.cells = qa(CT.tray, '.cell').map(c => ({ c, ci: q(c, '.ci'), k: +c.dataset.k, tr: c.getAttribute('transform') }));
CT.btn = el('div', s15.el, { left: '430px', top: '1170px', width: '440px', height: '108px', borderRadius: '60px', background: '#FE2C55', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em', boxShadow: '0 10px 0 #9e1033, 0 20px 40px rgba(0,0,0,.35)', border: '5px solid #fff' }, '+ SEGUIR');
CT.ripple = box('', s15.el, 650 - 60, 1224 - 60, 120, 120, { borderRadius: '50%', border: '8px solid #fff' });
CT.more = chip(s15.el, '+ muchos más…', 640, 1070, { size: 36 });
CT.lid = box(A.lidFace({ id: 'lfE' }), s15.el, 90, 310, 900, 900);
CT.lidSpec = q(CT.lid, '.lidspec');
CT.tag = el('div', s15.el, { left: '0', top: '1160px', width: '1080px', display: 'flex', justifyContent: 'center' });
CT.tagIn = el('div', CT.tag, { position: 'relative', background: 'linear-gradient(100deg,#8A6420 0%,#D4A74A 22%,#FFF1C4 40%,#F2D28B 50%,#C08F35 72%,#8A6420 100%)', border: '4px solid #5a3d0c', borderRadius: '100px', padding: '10px 40px 14px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '50px', color: BLUE, boxShadow: '0 8px 0 rgba(8,16,48,.45)', whiteSpace: 'nowrap' }, 'Trucos nº 1–3 ✔');
CT.b1 = burst(s15.el, 540, 760, 77.25, 18, 480, 1.4);
CT.b2 = burst(s15.el, 650, 1224, w(210) + 0.4, 10, 200, 0.9);
s15.upd = t => {
  const lidK = p(t, 77.02, 0.25, E.inCubic), endOn = t >= 77.02;
  set(CT.tray, { s: 0.9 * pop(t, 72.05, 0.5) * (1 + 0.03 * bump(t, w(216))), r: wobble(t, 0.25, 1.2) + (t >= w(215) && t < 75.3 ? Math.sin(t * 6) * 2 : 0) + shake(t, 77.25, 0.35, 5), o: t < 77.3 ? 1 : 0 });
  CT.cells.forEach((o, i) => {
    let s = 1, tw = 0;
    if (o.k <= 3) { s = 1 + 0.12 * Math.sin(t * 5 + o.k) * 0.5 + 0.2 * bump(t, 72.3 + o.k * 0.15); }
    else { const tq = w(215) + (o.k - 4) * 0.07; s = 1 + 0.25 * bump(t, tq); const tq2 = w(222) + (o.k - 4) * 0.04; tw = bump(t, tq2); }
    at(o.ci, 'transform', `scale(${s.toFixed(3)})`);
    const qm = q(o.ci, '.qm'); if (qm) qm.setAttribute('fill', tw > 0.3 ? '#D4A74A' : '#c9bfa6');
  });
  const bk = pop(t, w(210), 0.45);
  const press = t >= w(210) + 0.4 && t < w(210) + 0.55 ? 0.92 : 1;
  set(CT.btn, { s: bk * press * (1 + 0.035 * Math.sin(t * 7)) * out(t, 77.05, 0.15), r: wobble(t, 0.6, 1.5), o: t >= w(210) && t < 77.05 ? 1 : 0 });
  const rk = p(t, w(210) + 0.4, 0.5);
  set(CT.ripple, { s: 0.3 + 1.6 * rk, o: t >= w(210) + 0.4 && rk < 1 ? 1 - rk : 0 });
  chipAnim(CT.more, t, w(216), 77.0, 4);
  // tapa se cierra (clonk) -> tarjeta final
  set(CT.lid, { s: lerp(1.3, 0.83, lidK) * (1 + 0.03 * bump(t, 77.27)), r: lerp(-25, 0, lidK) + wobble(t, 0.3, 0.8), o: endOn ? clamp(lidK * 1.5) : 0, y: shake(t, 77.25, 0.35, 10) });
  at(CT.lidSpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  set(CT.tag, { s: pop(t, 77.7, 0.45), o: t >= 77.7 ? 1 : 0 });
  CT.b1.upd(t); CT.b2.upd(t);
};
const ENDH = head('Nuevos trucos *cada_día*', [77.55, 77.75, 77.95], 79.85, { size: 92 });

/* ================= TRANSICIONES GLOBALES ================= */
const WIPE = box(A.lidFace({ id: 'lfW' }), OV, 540 - 450, 900 - 450, 900, 900);
const WIPES = [11.1, 67.32];
const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
const WHIPS = [5.22, 18.92, 29.02, 34.57, 43.77, 48.8, 61.02, 63.35, 72.04];

/* ================= TITULARES (clavados a la voz) ================= */
H_('¿Rotulador *permanente* en la pizarra?', [5, 6, 7, 8, 9], 3.68);
H_('¡No la *tires*, criatura!', [11, 12, 13, 14], 5.2);
H_('Tres trucos que *no_te_esperas*', [16, 16, 18, 19], 7.25);
H_('El último… un *poquito_de_asco*', [23, 24, 29, 30], 9.76);
H_('¡Pero *funciona*!', [33, 34], 11.05);
H_('¡Hola, *cielo*!', [35, 36], 12.1);
H_('Aquí la abuela *Carmen*', [37, 38, 39, 40], 13.43);
H_('Mis trucos, en esta *lata*', [41, 42, 45, 46, 47], 16.04, { maxH: 100 });
H_('Como en *todas_las_casas*…', [51, 52, 53], 17.42, { maxH: 100 });
H_('De galletas, *nada*.', [56, 57, 58], 18.9, { maxH: 100 });
H_('Truco *nº_1*', [59, 60], 19.9);
H_('Rotulador *permanente*', [61, 62], 22.0);
H_('Pinta *ENCIMA*', [66, 67], 25.22);
H_('Espera *un_segundito*…', [74, 75], 26.9);
H_('…y lo *borras*', [77, 78, 79], 27.7);
H_('¡Se va *TODO*!', [80, 81, 82], 29.0);
H_('¿Por *qué*?', [83, 84], 29.7);
H_('La tinta lleva *disolvente*', [86, 87, 91, 93], 32.35);
H_('que *ablanda* la otra', [94, 95, 96, 97], 33.48);
H_('¡Y *listo*!', [98, 99], 34.55);
H_('Truco *nº_2*', [100, 101], 35.5);
H_('La cremallera *atascada*', [102, 103, 106], 38.38);
H_('Un *lápiz*', [113, 114], 39.26);
H_('Frota la punta por los *dientes*', [115, 116, 117, 118, 119, 120], 41.48);
H_('…y sube *sola*', [121, 122, 123], 42.57);
H_('como la *seda*', [124, 125, 126], 43.75);
H_('El grafito *resbala*', [127, 128, 129], 46.12);
H_('Cerraduras que van *duras*', [138, 139, 140, 141], 48.78);
H_('Y truco *nº_3*', [142, 143, 144], 49.84);
H_('El de abuela *de_verdad*', [145, 146, 147, 148], 51.33);
H_('Una gotita de *sangre*', [150, 151, 152, 153], 53.82);
H_('Agua *fría* ✔', [157, 158], 54.69);
H_('nunca *caliente*', [159, 160], 55.54);
H_('La caliente la *fija*', [162, 163, 164, 165], 56.9);
H_('Si la mancha es *pequeñita*…', [167, 168, 169, 170, 171], 58.6);
H_('Tu propia *saliva*', [172, 173, 174], 60.28);
H_('Sí, *sí*.', [175, 176], 61.0);
H_('Tiene *enzimas*', [178, 179], 62.65);
H_('…deshacen la *mancha*', [182, 183, 184], 63.35);
H_('Hasta los *restauradores*', [185, 186, 187], 65.15);
H_('limpian con *saliva*', [190, 191, 192], 66.46);
H_('¡Fíjate *tú*!', [193, 194], 67.32);
H_('¿Cuál *no_conocías*?', [195, 196, 197], 72.0);
H_('Anda, cielo, *sígueme*', [208, 209, 210], 73.29);
H_('Caben *muchos_más*…', [215, 216], 75.56);
H_('…y me los sé *todos*', [218, 220, 221, 222, 223], 77.02, { maxH: 100 });

{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }
/* ================= SFX ================= */
[['whoosh', 0.05, 0.8], ['stamp', 0.17, 1], ['boing', 0.36, 0.6], ['pop', 1.39], ['pop2', 1.95, 0.8], ['error', 3.7, 0.9], ['boing', 4.39, 0.7],
 ['whoosh', 5.2], ['pop', w(16)], ['pop2', w(16) + 0.15], ['pop', w(16) + 0.3], ['whoosh', 7.45, 0.7], ['paper', 7.6, 0.8], ['squish', w(32)], ['stamp', w(33)], ['sparkle', 10.0, 0.6],
 ['whoosh', 10.9], ['bell', 11.3, 0.8], ['sparkle', w(40), 0.7], ['swoosh_up', 13.45], ['thud', 13.95, 0.8], ['pop', w(49)], ['pop2', w(49) + 0.2], ['pop', w(49) + 0.4], ['pop2', w(49) + 0.6], ['teacup', 16.5, 0.7], ['stamp', w(56)], ['boing', w(58), 0.6],
 ['whoosh', 18.9], ['pop', w(59) + 0.02], ['stamp', w(59) + 0.25], ['pop2', w(60) + 0.05],
 ['whoosh', 19.9, 0.6], ['click', 22.03], ['pop', w(70), 0.6], ['tick', w(74)], ['tick', w(74) + 0.5], ['tick', w(74) + 1.0], ['ding', 26.75, 0.7], ['cloth_whoosh', w(77)], ['sparkle', w(80)], ['tada', w(82), 0.8],
 ['whoosh', 29.0], ['pop2', w(83)], ['pop', w(87) + 0.3, 0.6], ['pop', w(93), 0.7], ['squish', w(95)], ['ding', w(98)],
 ['whoosh', 34.55], ['pop', w(100) + 0.02], ['stamp', w(100) + 0.25], ['pop2', w(101) + 0.05],
 ['squish', w(106), 0.8], ['boing', w(110), 0.7], ['pop', w(113)], ['paper', w(115) + 0.1, 0.7], ['paper', w(117) + 0.3, 0.7], ['paper', w(120) + 0.2, 0.7], ['swoosh_up', w(122)], ['sparkle', w(123)], ['ding', w(126), 0.8],
 ['whoosh', 43.75], ['whoosh', w(129), 0.5], ['pop2', w(128)], ['whoosh', 46.12, 0.6], ['click', w(138) + 0.3], ['squish', w(140), 0.6], ['burst', w(141), 0.5], ['click', w(141) + 0.35], ['sparkle', w(141) + 0.45],
 ['whoosh', 48.78], ['pop', w(143)], ['stamp', w(144) - 0.1], ['squish', w(144) + 0.3, 0.7], ['pop2', w(147)],
 ['whoosh', 51.35, 0.6], ['pop', w(151), 0.6], ['squish', w(153)], ['pop', w(157)], ['ding', w(158)], ['pop2', w(159)], ['error', w(160)], ['stamp', w(165) - 0.05],
 ['whoosh', w(166), 0.6], ['pop', w(169), 0.6], ['boing', 58.6], ['pop', w(175), 0.6], ['pop2', w(176), 0.6], ['burst', w(177)], ['gulp', w(177) + 0.25, 0.7],
 ['whoosh', 61.02], ['pop2', w(179), 0.7], ['gulp', eatT(1)], ['gulp', eatT(5), 0.8], ['gulp', eatT(9), 0.8], ['sparkle', w(184) + 0.1],
 ['whoosh', 63.33], ['cloth_whoosh', w(186), 0.6], ['pop', w(190), 0.7], ['ding', w(193)],
 ['whoosh', 67.1], ['bell', 67.5, 0.6], ['pop', w(199)], ['pop2', w(201)], ['pop', w(204)], ['click', w(205)], ['click', w(205) + 0.45], ['click', w(205) + 0.9],
 ['whoosh', 72.04], ['pop', w(210)], ['click', w(210) + 0.4], ['sparkle', w(216), 0.7], ['tick', w(216) + 0.3, 0.5], ['bell', w(222)], ['whoosh', 76.85, 0.6], ['thud', 77.25], ['tada', 77.6, 0.8], ['swoosh_up', 79.85, 0.6]
].forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));

/* ================= FRAME ================= */
window.frame = t => {
  // brillo dorado global
  at(GOLD, 'gradientTransform', `translate(${(0.22 * Math.sin(t * 0.9)).toFixed(3)} ${(0.1 * Math.cos(t * 0.7)).toFixed(3)})`);
  STG.style.setProperty('--shx', (50 + 50 * Math.sin(t * 1.1)).toFixed(1) + '%');
  set(PAT, { x: (t * 6) % 120, y: (t * 10) % 120 });
  set(SHEEN, { x: -500 + ((t * 260) % 2200), r: 20 });
  // escenas
  SC.forEach(s => {
    let on = t >= s.a && t < s.b;
    const loop = s === s0 && t >= 79.85;
    if (loop) on = true;
    s.el.style.display = on ? 'block' : 'none';
    if (!on) return;
    let x = 0, y = 0;
    if (s.enter === 'whip') x += 1080 * (1 - p(t, s.a, 0.22, E.outCubic));
    if (s.exit === 'whip') x -= 1080 * p(t, s.b - 0.18, 0.18, E.inCubic);
    if (s === s15) y -= 1920 * p(t, 79.85, 0.37, E.inOutCubic);
    if (loop) { y = 1920 * (1 - p(t, 79.85, 0.37, E.inOutCubic)); x = 0; s.upd(0); }
    else s.upd(t);
    set(s.el, { x, y });
  });
  granny(t);
  // cámara
  const PUN = [1.94, w(13), w(16), w(32), w(34), w(47), w(58), w(67), w(82), w(93), w(95), w(106), w(114), w(123), w(129), w(130), w(141), w(153), w(165), w(174), w(179), w(187), w(192), w(204), w(210), w(223)];
  const SHK = [0.16, 3.7, 4.39, w(33), w(56), w(82), w(144) - 0.1, w(153), w(160), w(177), 77.25];
  let b = 0; PUN.forEach(ti => b = Math.max(b, bump(t, ti)));
  let sx = 0, sy = 0; SHK.forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
  set(CAM, { s: 1 + 0.075 * b, x: sx, y: sy });
  // transiciones
  let wv = 0; WIPES.forEach(T => { if (t > T - 0.32 && t < T + 0.4) wv = T; });
  if (wv) { const T = wv, ki = p(t, T - 0.3, 0.3, E.outCubic), ko = p(t, T + 0.06, 0.3, E.inCubic); set(WIPE, { s: 2.7 * ki, r: -120 * (1 - ki), y: -1500 * ko, sy: 1 - 0.85 * ko, o: 1 }); } else set(WIPE, { o: 0 });
  let sk = 0; WHIPS.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
  STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i), sx: 1 }));
  updHeads(t); altoUpd(t); updHdr(t);
  set(HL, { o: t >= 79.85 ? 0 : 1 });
};
Engine.start({ captions: { y: 1380, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
