/* COMÚN — utilidades compartidas por los episodios 8-10 (extraídas de lt07_nevera/main.js) */
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
/* ================= ABUELA ================= */
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

/* ================= CIERRES GENÉRICOS ================= */
/* cierre «guárdalo + lista + seguir» (formato 2 consejos útiles) */
function endSave(TC, items, tSave, tFollow, tPress) {
  const s = scene(TC, LT + 0.4, { enter: 'cut' }); const E4 = {};
  E4.bm = box(A.bookmark(), s.el, 690, 470, 160, 200, { transformOrigin: '80px 100px' });
  E4.bmPath = q(E4.bm, '.bm');
  E4.list = items.map(([tx, t0], i) => ({ e: chip(s.el, tx, 520, 720 + i * 108, { size: 40, css: { textAlign: 'left' } }), t0 }));
  E4.follow = box(`<div style="display:flex;align-items:center;gap:16px;background:#FE2C55;border-radius:22px;padding:16px 38px 20px;box-shadow:0 10px 0 #9c0f2b;font-family:Fredoka;font-weight:700;font-size:58px;color:#fff;white-space:nowrap">＋ Seguir</div>`, s.el, 540, 1180, 330, 110, { transformOrigin: '165px 55px' });
  E4.b = burst(s.el, 770, 570, tSave, 12, 220, 0.9);
  E4.b2 = burst(s.el, 700, 1230, tPress, 12, 240, 0.9);
  s.upd = t => {
    E4.bmPath.setAttribute('fill', t >= tSave ? '#F6C141' : CREAM);
    set(E4.bm, { s: pop(t, TC, 0.4) * (1 + 0.25 * bump(t, tSave)), r: wobble(t, 0.6, 4) });
    E4.list.forEach(o => set(o.e, { s: 0.92 * pop(t, o.t0, 0.35), x: (1 - p(t, o.t0, 0.3, E.outCubic)) * 60, o: t >= o.t0 ? 1 : 0 }));
    const pressed = t >= tPress;
    E4.follow.firstChild.innerHTML = pressed ? '✓ Siguiendo' : '＋ Seguir';
    E4.follow.firstChild.style.background = pressed ? '#2f9e5b' : '#FE2C55';
    E4.follow.firstChild.style.boxShadow = pressed ? '0 10px 0 #1f6b3d' : '0 10px 0 #9c0f2b';
    set(E4.follow, { s: pop(t, tFollow, 0.4) * (1 - 0.1 * (p(t, tPress - 0.15, 0.08) - p(t, tPress, 0.12))) * (1 + 0.05 * Math.sin(t * 6)), o: t >= tFollow ? 1 : 0 });
    E4.b.upd(t); E4.b2.upd(t);
  };
  return s;
}
/* cierre «pregunta + comentarios de ejemplo + seguir» (formato 1 secreto) */
function endAsk(TC, comments, tFollow, tPress) {
  const s = scene(TC, LT + 0.4, { enter: 'cut' }); const E4 = {};
  const cols = ['#5B8DEF', '#E5533D', '#2f9e5b'];
  E4.q = box(`<div style="width:380px;height:380px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#FFF1C4,#E2BC63 45%,#B0812F);border:9px solid ${INK};box-shadow:0 14px 0 rgba(8,16,48,.5);display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:280px;line-height:1;color:${BLUE};padding-bottom:22px">?</div>`, s.el, 350, 500, 380, 380);
  E4.cm = comments.map(([n, tx, t0], i) => ({ e: comment(s.el, 330 + (i % 2) * 40, 910 + i * 110, n, tx, cols[i % 3]), t0 }));
  E4.follow = box(`<div style="display:flex;align-items:center;gap:16px;background:#FE2C55;border-radius:22px;padding:16px 38px 20px;box-shadow:0 10px 0 #9c0f2b;font-family:Fredoka;font-weight:700;font-size:58px;color:#fff;white-space:nowrap">＋ Seguir</div>`, s.el, 600, 1300, 330, 110, { transformOrigin: '165px 55px' });
  E4.tag = chip(s.el, '💬 comentarios de ejemplo', 290, 1262, { size: 30 });
  E4.b2 = burst(s.el, 760, 1350, tPress, 12, 240, 0.9);
  s.upd = t => {
    set(E4.q, { s: pop(t, TC, 0.45) * (1 + 0.04 * Math.sin(t * 5)), r: -6 + wobble(t, 0.6, 4) });
    E4.cm.forEach(o => set(o.e, { s: pop(t, o.t0, 0.35), x: (1 - p(t, o.t0, 0.3, E.outCubic)) * 80, o: t >= o.t0 ? 1 : 0 }));
    set(E4.tag, { s: pop(t, comments[0][2], 0.4), o: t >= comments[0][2] ? 0.9 : 0 });
    const pressed = t >= tPress;
    E4.follow.firstChild.innerHTML = pressed ? '✓ Siguiendo' : '＋ Seguir';
    E4.follow.firstChild.style.background = pressed ? '#2f9e5b' : '#FE2C55';
    E4.follow.firstChild.style.boxShadow = pressed ? '0 10px 0 #1f6b3d' : '0 10px 0 #9c0f2b';
    set(E4.follow, { s: pop(t, tFollow, 0.4) * (1 - 0.1 * (p(t, tPress - 0.15, 0.08) - p(t, tPress, 0.12))) * (1 + 0.05 * Math.sin(t * 6)), o: t >= tFollow ? 1 : 0 });
    E4.b2.upd(t);
  };
  return s;
}

/* ================= CIERRE DEL EPISODIO: transiciones, sfx, frame, arranque ================= */
function finish(cfg) {
  const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
  const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
  { const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }
  cfg.sfx.forEach(([n, tt, g]) => sfx(n, tt, g == null ? 1 : g));
  window.frame = t => {
    at(GOLD, 'gradientTransform', `translate(${(0.22 * Math.sin(t * 0.9)).toFixed(3)} ${(0.1 * Math.cos(t * 0.7)).toFixed(3)})`);
    STG.style.setProperty('--shx', (50 + 50 * Math.sin(t * 1.1)).toFixed(1) + '%');
    set(PAT, { x: (t * 6) % 120, y: (t * 10) % 120 });
    set(SHEEN, { x: -500 + ((t * 260) % 2200), r: 20 });
    SC.forEach(s => {
      let vis = t >= s.a && t < s.b;
      const loop = s === cfg.first && t >= LT;
      if (loop) vis = true;
      s.el.style.display = vis ? 'block' : 'none';
      if (!vis) return;
      let x = 0, y = 0;
      if (s.enter === 'whip') x += 1080 * (1 - p(t, s.a, 0.22, E.outCubic));
      if (s.exit === 'whip') x -= 1080 * p(t, s.b - 0.18, 0.18, E.inCubic);
      if (s === cfg.last) y -= 1920 * p(t, LT, 0.4, E.inOutCubic);
      if (loop) { y = 1920 * (1 - p(t, LT, 0.4, E.inOutCubic)); x = 0; s.upd(t - DUR); }
      else s.upd(t);
      set(s.el, { x, y });
    });
    granny(t);
    let b = 0; cfg.pun.forEach(ti => b = Math.max(b, bump(t, ti)));
    let sx = 0, sy = 0; (cfg.shk || []).forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
    set(CAM, { s: 1 + 0.06 * b, x: sx, y: sy });
    let sk = 0; cfg.whips.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
    STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i) }));
    if (cfg.extra) cfg.extra(t);
    updHeads(t);
    set(HL, { o: t >= LT ? 0 : 1 });
  };
  Engine.start({ duration: DUR, captions: { y: 1420, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
}
