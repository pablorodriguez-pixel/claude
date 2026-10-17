/* LA LATA DE LA ABUELA — Ep. 3 «La fecha que te hace tirar comida» (identidad visual reutilizada de lt02) */
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
const frac = v => v - Math.floor(v);
const DUR = W[W.length - 1].e + 0.75;   // sin tarjeta final: tapa cerrada + bucle
const LT = DUR - 0.4;                   // últimos 0,4 s enlazan con el fotograma 0

/* ================= ANCLAS (todo clavado por texto) ================= */
const X = (ph, from = 0) => find(ph, from);
const J = {
  cad: X('caducidad'), no0: X('no es la de'), tres: X('tres cosas'), etiq: X('etiquetas'), nadie: X('nadie'), ult: X('la ultima') + 1, ahorrar: X('ahorrar'), dinero: X('dinero'),
  uno: X('Uno consumir'), cons: X('Consumir'), pref: X('preferentemente'), antes: X('antes de no'), noes: X('no es caducidad'), habla: X('Habla'), calidad: X('calidad'),
  puede: X('puede perder'), sabor: X('sabor'), textura: X('textura'), pero: X('pero si'), guardado: X('guardado'), nopel: X('no es peligroso'), pelig: X('peligroso'),
  verdad: X('La de verdad'), fecha2: X('fecha de caducidad', 40), esa: X('Esa si'), ni: X('ni un dia'), dmas: X('dia mas') + 1, suele: X('Suele'), carne: X('carne'), pescado: X('pescado'), frescos: X('frescos'),
  dos: X('Dos la miel'), miel: X('miel'), cerrada: X('cerrada'), aguanta: X('aguanta'), anos: X('anos'), pone: X('se pone') , dura: X('dura'), crist: X('cristalizado'), bano: X('bano'), maria: X('maria'), como: X('como nueva'), nueva: X('nueva'),
  espera: X('Y espera'), tresE: X('el tres es') + 1, masT: X('que mas se tira') + 1, tira: X('tira'),
  tres3: X('Y el tres'), pan: X('pan duro'), duro: X('duro'), notires: X('no lo tires'), cong: X('Congelalo'), reban: X('rebanadas'), tuest: X('tuestalo'), direct: X('directamente'), sin: X('sin descongelar'), queda: X('Queda'), recien: X('recien'), hecho: X('hecho'),
  reg: X('Y uno de regalo'), regalo: X('regalo'), arroz: X('arroz'), leg: X('legumbres'), sal: X('la sal') + 1, casi: X('casi'), estrop: X('estropean'), guardas: X('guardas'), secos: X('secos'), bien2: X('bien cerrados'), cerrados: X('cerrados'),
  cual: X('Cual no sabias'), sabias: X('sabias'), uno2: X('el uno') + 1, dos2: X('el dos') + 1,
  aqui: X('Aqui la abuela'), carmen: X('Carmen'), sig: X('Sigueme'), esta: X('esta lata'), muchos: X('muchos'), yyo: X('y yo'), los: X('me los') + 1, todos: X('todos'),
};
J.tres4 = X('el tres', J.cual) + 1;
const ws = k => W[J[k]].s, we_ = k => W[J[k]].e;
const T1 = ws('uno'), T2 = ws('dos'), TE = ws('espera'), T3 = ws('tres3'), TG = ws('reg'), TP = ws('cual'), TC = ws('los') - 0.3;

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

/* ================= UTILIDADES ================= */
const SC = [];
function scene(a, b, opt = {}) { const s = { a, b, enter: opt.enter || 'cut', exit: opt.exit || 'cut', el: el('div', CAM, { left: 0, top: 0, width: '1080px', height: '1920px' }), upd: () => { } }; SC.push(s); return s; }
function burst(parent, cx, cy, t0, n = 10, Rr = 220, sz = 1) {
  const st = [];
  for (let i = 0; i < n; i++) { const e = el(A.star(i % 3 ? '#FFF1C4' : '#ffffff'), parent, { left: px(cx - 30), top: px(cy - 30), width: '60px', height: '60px' }); st.push({ e, a: i / n * Math.PI * 2 + R() * 0.5, d: Rr * (0.55 + 0.45 * R()), s: sz * (0.6 + 0.7 * R()) }); set(e, { o: 0 }); }
  return { upd(t) { const on = t >= t0 && t < t0 + 0.9; const k = p(t, t0, 0.75, E.outCubic), f = Math.sin(Math.PI * clamp((t - t0) / 0.9)); st.forEach(o => set(o.e, { x: Math.cos(o.a) * o.d * k, y: Math.sin(o.a) * o.d * k, s: o.s * f, r: k * 160, o: on ? 1 : 0 })); } };
}
function chip(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), background: CREAM, border: '4px solid #D4A74A', borderRadius: '100px', padding: '8px 26px 10px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: (opt.size || 34) + 'px', color: BLUE, whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(8,16,48,.4)', letterSpacing: '0.01em' }, opt.css || {}), txt);
}
const chipAnim = (e, t, t0, t1, r = -3) => set(e, { s: pop(t, t0, 0.4) * out(t, t1), o: t >= t0 && t < t1 ? 1 : 0, r: r + wobble(t, 0.5, 1.2) });
function stampEl(parent, txt, x, y, opt = {}) {
  return el('div', parent, Object.assign({ left: px(x), top: px(y), border: `7px solid ${opt.c || RED}`, outline: `3px solid ${opt.c || RED}`, outlineOffset: '-16px', borderRadius: '18px', padding: '14px 34px 18px', fontFamily: 'DMSerif', fontSize: (opt.size || 76) + 'px', color: opt.c || RED, background: 'rgba(251,243,226,.95)', whiteSpace: 'nowrap', letterSpacing: '0.04em', boxShadow: '0 8px 0 rgba(8,16,48,.35)' }, opt.css || {}), txt);
}
const stampAnim = (e, t, t0, t1, r = -8) => { const k = p(t, t0, 0.16, E.inCubic); set(e, { s: (t < t0 ? 0 : 1 + 1.3 * (1 - k)) * out(t, t1), o: t >= t0 && t < t1 ? clamp((t - t0) / 0.06) : 0, r }); };
const popIn = (e, t, t0, t1, o = {}) => set(e, Object.assign({ s: (o.s || 1) * pop(t, t0, o.d || 0.4) * (t1 ? out(t, t1, 0.18) : 1), o: t >= t0 && (!t1 || t < t1) ? 1 : 0 }, o.extra || {}));

/* ================= TITULARES ================= */
const HL = el('div', OV, { left: '50px', top: '272px', width: '980px', height: '200px' });
const HEADS = [];
function head(spec, times, t1, opt = {}) {
  const b = el('div', HL, { left: 0, top: 0, width: '980px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', columnGap: '0.24em', rowGap: '0px', fontFamily: 'DMSerif', fontSize: (opt.size || 86) + 'px', lineHeight: 1.04, color: CREAM, textAlign: 'center' });
  const toks = spec.split(' ').map((s, i) => {
    const key = /^[¡¿…«]*\*.*\*[,.…:?!»]*$/.test(s); const txt = s.replace(/\*/g, '').replace(/_/g, ' ');
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
const H_ = (s, idx, t1, o) => head(s, idx.map(i => typeof i === 'string' ? ws(i) : w(i)), t1, o);

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
const MKF = [[0, 205, 2150, 0.72], [0.5, 205, 1150, 0.72, 'back'],
  [ws('aqui') - 0.15, 205, 1150, 0.72], [ws('aqui') + 0.3, 540, 770, 0.86, 'back'],
  [ws('esta') - 0.05, 540, 770, 0.86], [ws('esta') + 0.35, 205, 1150, 0.72],
  [TC - 0.05, 205, 1150, 0.72], [TC + 0.3, 540, 770, 0.86, 'back'], [LT, 540, 770, 0.86], [DUR, 540, 770 - 1920, 0.86]];
const EXPR = [[0.1, 1.5, 'shout'], [1.97, 3.45, 'stern'], [3.65, 4.5, 'happy'], [4.5, 7.1, 'sly'], [7.2, 9.15, 'wow'], [9.3, 10.2, 'happy'],
  [12.66, 14.5, 'stern'], [14.5, 16.0, 'proud'], [16.1, 17.9, 'sly'], [19.5, 20.95, 'happy'], [21.07, 22.2, 'sly'], [22.25, 23.75, 'stern'], [23.8, 26.05, 'shout'], [26.1, 29.3, 'stern'],
  [29.45, 30.2, 'happy'], [31.3, 32.5, 'proud'], [32.5, 34.0, 'wow'], [35.2, 36.2, 'sly'], [36.2, 37.45, 'happy'], [37.54, 39.95, 'wow'],
  [40.09, 40.95, 'proud'], [40.99, 41.95, 'disgust'], [41.95, 42.85, 'stern'], [42.9, 44.2, 'happy'], [45.7, 46.8, 'sly'], [46.8, 48.65, 'wow'],
  [48.8, 50.0, 'happy'], [50.0, 52.8, 'proud'], [53.1, 54.2, 'happy'], [54.2, 56.7, 'sly'], [56.8, 58.0, 'wow'], [58.0, 59.9, 'happy'],
  [60.0, 61.3, 'happy'], [61.37, 62.0, 'wink'], [62.0, 63.8, 'happy'], [63.88, 64.6, 'sly'], [64.6, DUR + 1, 'wink']];
const HANDS = [[0.12, 1.6, 'stop'], [1.97, 3.0, 'wag'], [4.18, 5.0, 'up'], [9.3, 10.2, 'up'], [12.66, 13.8, 'wag'], [17.9, 19.0, 'point'], [21.1, 22.2, 'up'], [24.6, 25.9, 'wag'],
  [26.9, 28.6, 'point'], [29.5, 30.4, 'up'], [35.2, 36.2, 'point'], [37.6, 38.6, 'up'], [41.94, 42.85, 'stop'], [44.3, 45.2, 'point'], [49.3, 50.1, 'up'], [54.3, 55.3, 'point'],
  [56.9, 57.9, 'up'], [60.0, 61.2, 'wave']];
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
  at(G.gHead, 'transform', `translate(0 ${dy + sp * 1.5}) rotate(${tilt} 200 300)`);
  const [x, y, s] = kf(MKF, t);
  set(MED, { x: x - 200, y: y - 240, s: s * (1 + 0.012 * Math.sin(t * 2.4)), r: wobble(t, 0.27, 1.4) });
  let hs = null; for (const hh of HANDS) if (t >= hh[0] && t < hh[1]) hs = hh;
  set(HSTOP, { o: 0 }); set(HPT, { o: 0 });
  if (hs) {
    const k = pop(t, hs[0], 0.35) * out(t, hs[1], 0.15), ty = hs[2];
    if (ty === 'stop') set(HSTOP, { s: k, r: -8 + shake(t, hs[0] + 0.05, 0.4, 10) + wobble(t, 1.1, 3), o: 1 });
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
const PBlock = box(A.lockAngry(), PBB[2].b, 44, 34, 240, 280, { transformOrigin: '0 0' });
const PBcoin = box(A.coin(), PBB[2].b, -30, -30, 120, 120, { transformOrigin: '0 0' });
const PBshk = q(PBlock, '.shackle');
const PBgift = box(A.gift(), PBB[3].b, 4, 2, 200, 210, { transformOrigin: '0 0' });
const PBbG = burst(OV, PBX(3), PBY, TG + 0.45, 12, 160, 0.8);
const PBb3 = burst(OV, PBX(2), PBY, T3, 12, 160, 0.8);
function lockShake(t) { const k = clamp((t - TE) / (T3 - TE)); const idle = ((t % 3) < 0.35 && t > 0.5) ? Math.sin(t * 50) * 6 : 0; return t < T3 ? (t > TE ? Math.sin(t * 55) * (4 + 14 * k) : idle) : 0; }
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
  const kO = p(t, T3, 0.45, E.outCubic);
  set(PBlock, { s: 0.27 * (t < T3 ? 1 : 1 - kO), y: -60 * kO, r: 40 * kO, o: t < T3 + 0.45 || t >= LT ? 1 : 0 });
  if (t >= LT) set(PBlock, { s: 0.27, o: 1 });
  at(PBshk, 'transform', t >= T3 && t < LT ? `translate(0 ${-30 * kO}) rotate(${-35 * kO} 180 128)` : '');
  set(PBcoin, { s: 0.4 * (t < T3 || t >= LT ? 1 + 0.35 * bump(t, ws('ahorrar')) : 1 - kO), r: wobble(t, 1.6, 8), o: t < T3 + 0.45 || t >= LT ? 1 : 0 });
  set(PBgift, { s: 0.46 * pop(t, TG + 0.4, 0.4), o: t >= TG + 0.4 && t < LT ? 1 : 0, r: wobble(t, 1, 5) });
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

/* ================= 0 · GANCHO / PORTADA (pregunta, ya en movimiento) ================= */
const s0 = scene(0, ws('tres') - 0.25, { exit: 'whip' });
const H = {};
H.rays = box(A.rays(16, 600), s0.el, -60, 300, 1200, 1200);
H.t1 = el('div', s0.el, { left: '0', top: '268px', width: '1080px', textAlign: 'center', fontFamily: 'DMSerif', fontSize: '140px', lineHeight: 1, color: CREAM, textShadow: '0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, 'ESTA FECHA');
H.t2w = el('div', s0.el, { left: '0', top: '452px', width: '1080px', display: 'flex', justifyContent: 'center' });
H.t2 = el('div', H.t2w, { position: 'relative', background: RED, color: CREAM, fontFamily: 'DMSerif', fontSize: '104px', lineHeight: 1, padding: '10px 40px 22px', borderRadius: '30px', border: '7px solid #F2D28B', boxShadow: '0 12px 0 #5a0a14, 0 24px 40px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }, '¿A LA BASURA?');
H.bin = box(A.binFull(), s0.el, 684, 850, 260, 330, { transformOrigin: '130px 320px' });
H.binlid = q(H.bin, '.binlid');
H.yog = box(A.yog(), s0.el, 222, 610, 420, 520, { transformOrigin: '210px 500px' });
H.yEyes = q(H.yog, '.eyes'); H.sweat = q(H.yog, '.sweat');
H.lupa = box(A.lupaDate(), s0.el, 0, 0, 780, 780, { transformOrigin: '0 0' });
H.qs = [[150, 640, 110], [640, 640, 90], [600, 1000, 70], [120, 900, 80]].map(([x, y, s], i) => el('div', s0.el, { left: px(x), top: px(y), fontFamily: 'DMSerif', fontSize: s + 'px', lineHeight: 1, color: i % 2 ? CREAM : '#F2D28B', textShadow: '0 6px 0 #0b1946' }, '?'));
H.food = [0, 1, 2].map(() => el('div', s0.el, { left: '0', top: '0', width: '110px', height: '110px', fontSize: '96px', lineHeight: '110px', textAlign: 'center' }, '🍞'));
const FOODS = ['🍞', '🥛', '🧀', '🍎', '🥬', '🍌', '🥕', '🍅'];
H.stamp = stampEl(s0.el, '¡NO ES CADUCIDAD!', 150, 700, { size: 80 });
H.b = burst(s0.el, 540, 860, ws('cad') - 0.05, 14, 420, 1.2);
function hookUpd(t) {
  set(H.rays, { r: t * 10, o: 0.45 });
  set(H.t1, { s: 1 + 0.05 * bump(t, w(1)) + 0.03 * Math.sin(t * 3.1), y: wobble(t, 0.5, 4) });
  set(H.t2, { s: 1 + 0.08 * bump(t, w(5)), r: -3 + shake(t, w(5), 0.3, 4) + wobble(t, 0.6, 1.5) });
  // yogur nervioso mirando al cubo
  set(H.yog, { r: -3 + Math.sin(t * 9) * 1.6 + shake(t, ws('cad'), 0.4, 6), s: 1 + 0.015 * Math.sin(t * 4) });
  at(H.yEyes, 'transform', `translate(${(6 + 4 * Math.sin(t * 1.7)).toFixed(1)} 0)`);
  at(H.sweat, 'transform', `translate(0 ${(frac(t * 0.9) * 40).toFixed(1)})`); H.sweat.setAttribute('opacity', (1 - frac(t * 0.9)).toFixed(2));
  // lupa barriendo la fecha (fotograma 0 ya en movimiento)
  const lx = 440 - 134 + 26 * Math.sin(t * 2.3 + 0.8), ly = 966 - 134 + 10 * Math.cos(t * 1.9);
  set(H.lupa, { x: lx, y: ly, s: 0.42 * (1 + 0.04 * Math.sin(t * 3)), r: 4 * Math.sin(t * 1.3) });
  H.qs.forEach((e, i) => set(e, { y: wobble(t, 0.7, 10, i * 0.3), r: wobble(t, 0.5, 14, i * 0.2), s: 1 + 0.12 * Math.sin(t * 5 + i) }));
  // comida volando al cubo, en bucle
  let lid = 0;
  H.food.forEach((e, i) => {
    const v = (t + 0.55) / 1.05 + i / 3, ph = frac(v), cyc = Math.floor(v);
    const em = FOODS[((cyc * 3 + i) % FOODS.length + FOODS.length) % FOODS.length]; if (e.textContent !== em) e.textContent = em;
    const x0 = [560, 470, 640][i], y0 = [660, 700, 650][i];
    set(e, { x: lerp(x0, 814, ph) - 55, y: lerp(y0, 925, ph) - 170 * Math.sin(Math.PI * ph) - 55, r: 300 * ph * (i % 2 ? -1 : 1), s: 0.95 - 0.3 * ph, o: ph < 0.9 ? 1 : 0 });
    lid = Math.max(lid, Math.sin(Math.PI * clamp((ph - 0.62) / 0.38)));
  });
  at(H.binlid, 'transform', `rotate(${(-38 * lid).toFixed(1)} 22 78)`);
  set(H.bin, { sy: 1 - 0.04 * lid, r: shake(t, ws('cad'), 0.4, 5) });
  stampAnim(H.stamp, t, ws('cad') - 0.05, 9, -8);
  H.b.upd(t);
}
s0.upd = hookUpd;

/* ================= 1 · PROMESA: tres cosas… la última ahorra dinero ================= */
const s1 = scene(ws('tres') - 0.25, T1 + 0.45, { enter: 'whip' });
const P = {};
P.rays = box(A.rays(16, 600), s1.el, -60, 160, 1200, 1200);
P.seals = [0, 1, 2].map(i => box(A.seal(i + 1), s1.el, [230, 540, 850][i] - 150, 660 - 150, 300, 370, { transformOrigin: '150px 150px' }));
P.cards = [0, 1, 2].map(i => { const c = el('div', s1.el, { left: px([230, 540, 850][i] - 120), top: '880px', width: '240px', height: '120px', background: '#fff', border: '5px solid ' + INK, borderRadius: '16px', boxShadow: '0 8px 0 rgba(8,16,48,.4)', textAlign: 'center' }); c.innerHTML = `<div style="font-family:Fredoka;font-weight:700;font-size:22px;color:#6b7280;margin-top:10px;letter-spacing:.06em">ANTES DE:</div><div style="font-family:SpaceMono;font-weight:700;font-size:30px;color:${INK}">dd/mm/aaaa</div>`; return c; });
P.qm = [0, 1, 2].map(i => el('div', s1.el, { left: px([230, 540, 850][i] + 60), top: '840px', width: '76px', height: '76px', borderRadius: '50%', background: RED, border: '5px solid ' + CREAM, color: CREAM, fontFamily: 'DMSerif', fontSize: '58px', lineHeight: '64px', textAlign: 'center', boxShadow: '0 6px 0 rgba(8,16,48,.4)' }, '?'));
P.lock = box(A.padlock(), s1.el, 540 - 60, 950, 120, 140, { transformOrigin: '60px 70px' });
P.pig = box(A.piggy(), s1.el, 640, 940, 300, 240, { transformOrigin: '150px 220px' });
P.coins = Array.from({ length: 6 }, () => box(A.coin(), s1.el, 0, 0, 120, 120));
P.b = burst(s1.el, 750, 980, ws('dinero'), 12, 300, 1);
s1.upd = t => {
  const k2 = p(t, ws('ult'), 0.5, E.inOutCubic);
  set(P.rays, { r: t * 12, o: 0.25 + 0.6 * k2, s: 0.8 + 0.25 * k2 });
  P.seals.forEach((e, i) => {
    const t0 = ws('tres') - 0.12 + i * 0.13, k = pop(t, t0, 0.45);
    let x = 0, y = 0, s = 0.72 * k;
    if (i < 2) { x = lerp(0, i ? -240 : -60, k2); y = lerp(0, -110, k2); s *= lerp(1, 0.6, k2); }
    else { x = lerp(0, -310, k2); y = lerp(0, 20, k2); s *= lerp(1, 1.45, k2); }
    set(e, { x, y: y + wobble(t, 0.6, 6, i * 0.3), s, r: wobble(t, 0.4, 3, i), o: i < 2 ? lerp(1, 0.55, k2) : 1 });
  });
  P.cards.forEach((c, i) => { const t0 = ws('etiq') + i * 0.12; set(c, { s: pop(t, t0, 0.4) * (1 - k2), r: (i - 1) * 4 + wobble(t, 0.5, 2, i), o: t >= t0 && k2 < 1 ? 1 : 0 }); });
  P.qm.forEach((c, i) => { const t0 = ws('nadie') + i * 0.12; set(c, { s: pop(t, t0, 0.35) * (1 - k2), r: shake(t, t0 + 0.1, 0.4, 14), o: t >= t0 && k2 < 1 ? 1 : 0 }); });
  set(P.lock, { s: 1.3 * pop(t, ws('ult') + 0.2, 0.4) * (1 + 0.1 * bump(t, ws('ahorrar'))), x: 0, r: shake(t, ws('ahorrar'), 0.5, 10) + Math.sin(t * 30) * 2, o: t >= ws('ult') + 0.2 ? 1 : 0 });
  set(P.pig, { s: 0.85 * pop(t, ws('ahorrar') - 0.05, 0.4) * (1 + 0.08 * bump(t, ws('dinero') + 0.3)), r: wobble(t, 0.8, 3), o: t >= ws('ahorrar') - 0.05 ? 1 : 0 });
  P.coins.forEach((c, i) => {
    const t0 = ws('ahorrar') + 0.1 + i * 0.13, k = p(t, t0, 0.55, E.linear);
    const x0 = 520 + (i % 3) * 20, y0 = 990, x1 = 785, y1 = 990;
    set(c, { x: lerp(x0, x1, k) - 60, y: lerp(y0, y1, k) - 260 * Math.sin(Math.PI * k) - 60, r: 720 * k, s: 0.7 - 0.25 * k, o: t >= t0 && k < 1 ? 1 : 0 });
  });
  P.b.upd(t);
};

/* ================= 3 · TRUCO 1: «consumir preferentemente» = calidad ================= */
const s3 = scene(T1 + 0.45, ws('verdad') - 0.05);
const L = {};
L.card = box('', s3.el, 120, 470, 820, 400, { background: '#fff', border: '6px solid ' + INK, borderRadius: '28px', boxShadow: '0 14px 0 rgba(8,16,48,.4)', transformOrigin: '410px 200px' });
L.words = [['CONSUMIR', 'cons', 22], ['PREFERENTEMENTE', 'pref', 92], ['ANTES DE:', 'antes', 162]].map(([tx, k, y]) => ({ e: el('div', L.card, { left: '0', top: px(y), width: '808px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '62px', lineHeight: 1.1, color: INK, letterSpacing: '0.04em' }, tx), t0: ws(k) }));
L.date = el('div', L.card, { left: '144px', top: '252px', width: '520px', height: '112px', borderRadius: '14px', border: '5px dashed ' + INK, background: '#FFF6DE', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '80px', lineHeight: '100px', textAlign: 'center', color: INK }, 'dd/mm/aaaa');
L.noCad = stampEl(s3.el, '≠ CADUCIDAD', 300, 760, { size: 76 });
L.ros = box(A.rosette('CALIDAD'), s3.el, 40, 420, 240, 300, { transformOrigin: '120px 120px' });
L.tSab = box(A.tile('👅', 'sabor ↓', RED), s3.el, 400, 920, 200, 200);
L.tTex = box(A.tile('🍪', 'textura ↓', RED), s3.el, 680, 920, 200, 200);
L.cup = box(A.cupboard(), s3.el, 440, 900, 420, 330, { transformOrigin: '210px 330px' });
L.dL = q(L.cup, '.dL'); L.dR = q(L.cup, '.dR');
L.ok = box(A.check(GREEN), s3.el, 820, 860, 100, 100);
L.okChip = chip(s3.el, '✓ sigue siendo comestible', 380, 1236, { size: 36, css: { color: GREEN, borderColor: GREEN } });
L.b = burst(s3.el, 650, 1050, ws('pelig'), 12, 320, 1);
s3.upd = t => {
  set(L.card, { s: pop(t, ws('cons') - 0.25, 0.4) * (1 + 0.04 * bump(t, ws('habla')) + 0.03 * bump(t, ws('pelig'))), r: -1.5 + wobble(t, 0.4, 0.8) + shake(t, ws('noes') + 0.1, 0.35, 3) });
  L.words.forEach(o => set(o.e, { s: pop(t, o.t0 - 0.05, 0.3), o: t >= o.t0 - 0.05 ? 1 : 0 }));
  const kd = t >= ws('antes') + 0.2;
  set(L.date, { s: pop(t, ws('antes') + 0.2, 0.35) * (1 + 0.05 * Math.sin(t * 5)), o: kd ? 1 : 0 });
  L.card.style.borderColor = t >= ws('calidad') ? '#D4A74A' : INK;
  stampAnim(L.noCad, t, ws('noes'), ws('habla') + 0.1, -7);
  set(L.ros, { s: 0.8 * pop(t, ws('calidad') - 0.05, 0.45) * (1 + 0.1 * bump(t, ws('calidad') + 0.4)), r: -10 + wobble(t, 0.5, 4), o: t >= ws('calidad') - 0.05 ? 1 : 0 });
  popIn(L.tSab, t, ws('sabor') - 0.05, ws('pero'), { extra: { r: -4 + wobble(t, 0.7, 2), y: -14 * Math.abs(Math.sin(t * 5)) } });
  popIn(L.tTex, t, ws('textura') - 0.05, ws('pero'), { extra: { r: 4 + wobble(t, 0.7, 2, 0.4), y: -14 * Math.abs(Math.sin(t * 5 + 1)) } });
  const kc = 1 - p(t, ws('guardado') - 0.1, 0.35, E.outBack);
  set(L.cup, { s: 0.88 * pop(t, ws('pero'), 0.4), o: t >= ws('pero') ? 1 : 0, r: wobble(t, 0.3, 1) });
  at(L.dL, 'transform', `translate(22 0) scale(${(0.06 + 0.94 * (1 - kc)).toFixed(3)} 1) translate(-22 0)`);
  at(L.dR, 'transform', `translate(398 0) scale(${(0.06 + 0.94 * (1 - kc)).toFixed(3)} 1) translate(-398 0)`);
  set(L.ok, { s: 1.4 * pop(t, ws('pelig') - 0.05, 0.4), o: t >= ws('pelig') - 0.05 ? 1 : 0, r: -6 });
  chipAnim(L.okChip, t, ws('pelig') + 0.1, 30, -2);
  L.b.upd(t);
};

/* ================= 4 · LAS DOS ETIQUETAS: calidad vs caducidad ================= */
const s4 = scene(ws('verdad') - 0.05, T2 + 0.45);
const D = {};
function smallLabel(parent, x, kind) {
  const c = box('', parent, x, 470, 415, 480, { background: '#fff', border: '6px solid ' + INK, borderRadius: '26px', boxShadow: '0 14px 0 rgba(8,16,48,.4)', overflow: 'hidden', transformOrigin: '207px 240px' });
  const band = box('', c, 0, 0, 403, 76, { background: kind === 'q' ? GREEN : RED, color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '40px', lineHeight: '76px', textAlign: 'center', letterSpacing: '0.04em' });
  band.textContent = kind === 'q' ? '✓ CALIDAD' : '⚠';
  el('div', c, { left: '0', top: '92px', width: '403px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: kind === 'q' ? '31px' : '40px', lineHeight: 1.12, color: INK, letterSpacing: '0.03em' }, kind === 'q' ? 'CONSUMIR<br>PREFERENTEMENTE<br>ANTES DE:' : 'FECHA DE<br>CADUCIDAD:');
  el('div', c, { left: '42px', top: '214px', width: '319px', height: '74px', borderRadius: '12px', border: '4px dashed ' + INK, background: '#FFF6DE', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '42px', lineHeight: '66px', textAlign: 'center', color: INK }, 'dd/mm/aaaa');
  return { c, band };
}
D.l1 = smallLabel(s4.el, 80, 'q');
D.l1txt = el('div', D.l1.c, { left: '20px', top: '306px', width: '363px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 600, fontSize: '29px', lineHeight: 1.18, color: GREEN }, 'Sigue siendo comestible si está bien guardado');
D.l1ok = box(A.check(GREEN), s4.el, 30, 420, 100, 100);
D.slot = box('', s4.el, 525, 470, 415, 480, { border: '6px dashed rgba(242,210,139,.85)', borderRadius: '26px', background: 'rgba(251,243,226,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DMSerif', fontSize: '200px', color: 'rgba(242,210,139,.85)' }, '?');
D.l2 = smallLabel(s4.el, 525, 'c');
D.icons = [['🥩', 'carne', 'carne'], ['🐟', 'pescado', 'pescado'], ['🥬', 'frescos', 'frescos']].map(([em, tx, k], i) => { const e = el('div', D.l2.c, { left: px(16 + i * 128), top: '308px', width: '116px', textAlign: 'center' }); e.innerHTML = `<div style="font-size:84px;line-height:1">${em}</div><div style="font-family:Fredoka;font-weight:700;font-size:25px;color:${RED}">${tx}</div>`; return { e, t0: ws(k) }; });
D.vs = el('div', s4.el, { left: '462px', top: '660px', width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg,#8A6420,#F2D28B 45%,#FFF1C4 55%,#C08F35)', border: '5px solid #5a3d0c', fontFamily: 'DMSerif', fontSize: '50px', lineHeight: '82px', textAlign: 'center', color: BLUE, boxShadow: '0 8px 0 rgba(8,16,48,.45)' }, 'vs');
D.real = chip(s4.el, 'la de verdad ➜', 470, 975, { size: 36, css: { background: RED, color: CREAM, borderColor: '#F2D28B' } });
D.ni = stampEl(s4.el, '¡NI UN DÍA MÁS!', 395, 965, { size: 64 });
D.b = burst(s4.el, 730, 700, ws('fecha2'), 14, 360, 1.1);
s4.upd = t => {
  const t0 = ws('verdad') - 0.05;
  const k1 = p(t, t0, 0.4, E.outBack);
  set(D.l1.c, { x: 180 * (1 - k1), s: lerp(1.5, 1, k1) * (1 + 0.04 * Math.sin(t * 2)), r: -2 + wobble(t, 0.3, 0.8) });
  set(D.l1ok, { s: pop(t, t0 + 0.3, 0.35) * 0.9, o: t >= t0 + 0.3 ? 1 : 0, r: -8 });
  set(D.slot, { s: pop(t, t0 + 0.15, 0.35) * (1 + 0.06 * Math.sin(t * 6)), o: t >= t0 + 0.15 && t < ws('fecha2') ? 1 : 0 });
  chipAnim(D.real, t, ws('verdad') + 0.2, ws('fecha2') + 0.2, -3);
  const on2 = t >= ws('fecha2') - 0.05;
  set(D.l2.c, { s: pop(t, ws('fecha2') - 0.05, 0.4) * (1 + 0.06 * bump(t, ws('esa')) + 0.05 * bump(t, ws('dmas'))), r: 2 + wobble(t, 0.3, 0.8, 0.5) + shake(t, ws('ni'), 0.4, 4), o: on2 ? 1 : 0 });
  D.l2.band.textContent = t >= ws('ni') ? '⚠ NI UN DÍA MÁS' : '⚠';
  set(D.vs, { s: pop(t, ws('fecha2') + 0.25, 0.35) * (1 + 0.08 * Math.sin(t * 6)), o: t >= ws('fecha2') + 0.25 ? 1 : 0 });
  stampAnim(D.ni, t, ws('ni'), ws('suele') + 0.05, -6);
  D.icons.forEach(o => set(o.e, { s: pop(t, o.t0 - 0.05, 0.35) * (1 + 0.15 * bump(t, o.t0)), y: (t >= o.t0 ? -6 * Math.abs(Math.sin(t * 4)) : 0), o: t >= o.t0 - 0.05 ? 1 : 0 }));
  D.b.upd(t);
};

/* ================= 5 · TRUCO 2: la miel y el baño maría ================= */
const s5 = scene(T2 + 0.45, TE);
const M = {};
M.rays = box(A.rays(16, 600), s5.el, -60, 220, 1200, 1200);
M.cals = Array.from({ length: 6 }, () => box(A.cal(), s5.el, 470, 640, 140, 150, { transformOrigin: '70px 75px' }));
M.potB = box(A.potBack(), s5.el, 290, 800, 640, 420, { transformOrigin: '300px 210px' });
M.bubs = qa(M.potB, '.bub circle');
M.jar = box(A.honey(), s5.el, 330, 470, 420, 560, { transformOrigin: '210px 540px' });
M.lid = q(M.jar, '.lid'); M.cry = q(M.jar, '.cry'); M.jEyes = q(M.jar, '.eyes'); M.jMouth = q(M.jar, '.mouth');
M.potF = box(A.potFront(), s5.el, 290, 800, 640, 420, { transformOrigin: '300px 210px' });
M.fl = box(A.flames(), s5.el, 340, 1170, 520, 140, { transformOrigin: '260px 140px' });
M.fls = qa(M.fl, '.fl');
M.steam = box(A.steam(), s5.el, 440, 600, 300, 220);
M.toc = el('div', s5.el, { left: '700px', top: '560px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '64px', color: CREAM, textShadow: '0 5px 0 #0b1946', whiteSpace: 'nowrap' }, 'toc, toc');
M.cerr = chip(s5.el, '🔒 bien cerrada', 610, 480, { size: 34 });
M.crChip = chip(s5.el, '✦ cristalizada', 620, 560, { size: 38 });
M.ok = box(A.check(GREEN), s5.el, 700, 560, 100, 100);
M.b = burst(s5.el, 560, 800, ws('nueva'), 16, 420, 1.3);
s5.upd = t => {
  const t0 = T2 + 0.45, kb = p(t, ws('bano') - 0.05, 0.5, E.inOutCubic), ko = p(t, ws('como') - 0.05, 0.45, E.outBack);
  const inPot = kb * (1 - ko);
  set(M.rays, { r: t * 10, o: 0.3 + 0.4 * bump(t, ws('nueva')) });
  // tarro
  const cr = clamp(p(t, ws('pone') - 0.1, 0.9) - p(t, ws('bano') + 0.5, ws('como') - ws('bano') - 0.5, E.linear));
  M.cry.setAttribute('opacity', cr.toFixed(2));
  set(M.jar, { s: 0.95 * pop(t, t0, 0.45) * lerp(1, 0.74, inPot) * (1 + 0.08 * bump(t, ws('nueva'))) * (1 + 0.04 * bump(t, ws('dura'))), x: 45 * inPot, y: 170 * inPot, r: wobble(t, 0.5, 2) + shake(t, ws('dura'), 0.45, 7) + shake(t, ws('cerrada'), 0.3, 4) });
  at(M.lid, 'transform', `translate(210 90) rotate(${(t < ws('cerrada') + 0.4 ? -14 * Math.sin(clamp((t - ws('cerrada')) / 0.4) * Math.PI * 2) : 0).toFixed(1)}) translate(-210 -90) translate(0 ${(-40 * (1 - p(t, ws('cerrada') - 0.1, 0.3, E.outBack))).toFixed(1)})`);
  // ojos: sorpresa al ponerse dura
  const sur = t >= ws('pone') && t < ws('maria');
  at(M.jEyes, 'transform', `translate(210 250) scale(${sur ? 1.25 : 1} ${sur ? 1.25 : ((t + 1.1) % 3.2 < 0.12 ? 0.1 : 1)}) translate(-210 -250)`);
  // calendarios: aguanta años
  M.cals.forEach((c, i) => { const tt = ws('aguanta') + i * 0.14, k = p(t, tt, 1.1, E.outCubic); const a = -Math.PI / 2 + (i - 2.5) * 0.48; set(c, { x: Math.cos(a) * 470 * k, y: Math.sin(a) * 330 * k + 260 * k * k, r: (i % 2 ? 1 : -1) * 260 * k, s: 0.9 * (1 - 0.35 * k), o: t >= tt && k < 0.98 ? 1 : 0 }); });
  set(M.toc, { s: pop(t, ws('dura') - 0.05, 0.3) * out(t, ws('crist')), r: -8 + shake(t, ws('dura'), 0.4, 8), o: t >= ws('dura') - 0.05 && t < ws('crist') ? 1 : 0 });
  chipAnim(M.cerr, t, ws('cerrada') + 0.05, ws('anos') + 0.3, 3);
  chipAnim(M.crChip, t, ws('crist') + 0.2, ws('bano') - 0.05, -3);
  // cazo
  const kp = pop(t, ws('bano') - 0.1, 0.45);
  const potOn = t >= ws('bano') - 0.1 && t < ws('nueva') + 0.6;
  const potOut = p(t, ws('nueva') - 0.1, 0.4, E.inCubic);
  [M.potB, M.potF].forEach(e => set(e, { s: 0.95 * kp, y: 500 * potOut, o: potOn ? 1 : 0 }));
  set(M.fl, { s: 0.95 * kp, y: 500 * potOut, o: potOn ? 1 : 0 });
  M.fls.forEach((f, i) => at(f, 'transform', `translate(${[70, 150, 230, 310, 390, 450][i]} 98) scale(${(1 + 0.15 * Math.sin(t * 22 + i * 1.7)).toFixed(2)} ${(1 + 0.25 * Math.sin(t * 17 + i)).toFixed(2)})`));
  M.bubs.forEach((b, i) => { const ph = frac(t * 1.6 + i * 0.37); b.setAttribute('transform', `translate(0 ${(-30 * ph).toFixed(1)})`); b.setAttribute('opacity', (1 - ph).toFixed(2)); });
  set(M.steam, { y: -30 * frac(t * 0.8), s: 1 + 0.1 * Math.sin(t * 3), o: potOn && t >= ws('bano') + 0.3 ? 0.8 * (1 - frac(t * 0.8) * 0.5) * (1 - potOut) : 0 });
  set(M.ok, { s: 1.3 * pop(t, ws('nueva'), 0.4), o: t >= ws('nueva') ? 1 : 0, r: -6 });
  M.b.upd(t);
};

/* ================= 6 · ESPERA… el 3 es el que más se tira ================= */
const s6 = scene(TE, T3 + 0.45);
const F = {};
F.rays = box(A.rays(16, 600), s6.el, -60, 180, 1200, 1200);
F.seal = box(A.seal(3), s6.el, 540 - 150, 760 - 150, 300, 370, { transformOrigin: '150px 150px' });
F.chains = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><g stroke="#9aa3b2" stroke-width="22" stroke-dasharray="40 14" stroke-linecap="round"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g><g stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="40 14" opacity=".5"><path d="M40 160 L760 640"/><path d="M760 160 L40 640"/></g></svg>`, s6.el, 140, 360, 800, 800);
F.lock = box(A.lockAngry(), s6.el, 540 - 120, 820 - 140, 240, 280, { transformOrigin: '120px 190px' });
F.shk = q(F.lock, '.shackle');
F.bin = box(A.binFull(), s6.el, 690, 930, 260, 330, { transformOrigin: '130px 320px' });
F.binlid = q(F.bin, '.binlid');
F.parts = Array.from({ length: 10 }, (_, i) => box(`<svg viewBox="0 0 60 60" width="60" height="60"><path d="M10 10 L50 18 L40 52 Z" fill="${i % 2 ? 'url(#goldG)' : '#9aa3b2'}" stroke="${INK}" stroke-width="4"/></svg>`, s6.el, 510, 800, 60, 60));
F.b = burst(s6.el, 540, 800, T3, 18, 520, 1.6);
s6.upd = t => {
  const kx = p(t, T3, 0.35, E.outCubic);
  set(F.rays, { r: t * 20, o: 0.35 + 0.6 * kx });
  set(F.seal, { s: pop(t, TE + 0.05, 0.4) * (1 + 0.25 * kx), r: lockShake(t) * 0.3 });
  set(F.chains, { s: pop(t, TE + 0.15, 0.35) * (1 + 0.5 * kx), r: lockShake(t) * 0.2, o: 1 - kx });
  set(F.lock, { s: 1.15 * pop(t, TE + 0.2, 0.4) * (1 + 0.1 * bump(t, ws('tresE'))) * (1 + 1.2 * kx), r: lockShake(t), o: 1 - kx, y: -200 * kx });
  at(F.shk, 'transform', t >= ws('masT') ? `translate(0 ${-20 * p(t, ws('masT'), 0.3)})` : '');
  set(F.bin, { s: 0.8 * pop(t, ws('masT') - 0.1, 0.4) * (1 - kx), r: shake(t, ws('tira'), 0.5, 8), o: t >= ws('masT') - 0.1 && kx < 1 ? 1 : 0 });
  at(F.binlid, 'transform', `rotate(${(-40 * Math.abs(Math.sin((t - ws('tira')) * 9)) * (t >= ws('tira') ? 1 : 0)).toFixed(1)} 22 78)`);
  F.parts.forEach((e, i) => { const a = i / 10 * Math.PI * 2; set(e, { x: Math.cos(a) * 520 * kx, y: Math.sin(a) * 520 * kx, r: 400 * kx, s: 1.4, o: t >= T3 && kx < 1 ? 1 : 0 }); });
  F.b.upd(t);
};

/* ================= 7 · TRUCO 3: pan duro → congelador → tostadora ================= */
const s7 = scene(T3 + 0.45, TG + 0.45);
const B = {};
B.toc = el('div', s7.el, { left: '600px', top: '540px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '70px', color: CREAM, textShadow: '0 5px 0 #0b1946', whiteSpace: 'nowrap' }, '¡TOC, TOC!');
B.loafW = box('', s7.el, 220, 600, 640, 260, { transformOrigin: '320px 130px' });
B.segs = [0, 1, 2, 3, 4].map(i => { const x0 = 40 + i * 116, x1 = x0 + 116 + (i === 4 ? 40 : 0); const s = box(A.loaf().replace('style="overflow:visible">', `style="overflow:visible"><defs><clipPath id="lc${i}"><rect x="${i ? x0 : -60}" y="-60" width="${x1 - (i ? x0 : -60)}" height="400"/></clipPath></defs><g clip-path="url(#lc${i})">`).replace(/<\/svg>$/, '</g></svg>'), B.loafW, 0, 0, 640, 260, { transformOrigin: `${(x0 + x1) / 2}px 130px` }); return s; });
B.cracks = B.segs.map(s => q(s, '.crack'));
B.knife = box(A.knife(), s7.el, 0, 0, 420, 90, { transformOrigin: '260px 45px' });
B.bin = box(A.binFull(), s7.el, 690, 880, 260, 330, { transformOrigin: '130px 320px' });
B.no = box(A.cross(), s7.el, 760, 950, 100, 100);
B.frz = box(A.freezer(), s7.el, 620, 760, 340, 400, { transformOrigin: '170px 400px' });
B.door = q(B.frz, '.door');
B.sl = [0, 1, 2, 3, 4].map(() => box(A.slice('plain'), s7.el, 0, 0, 150, 170));
B.toaster = box(A.toaster(), s7.el, 200, 800, 400, 320, { transformOrigin: '200px 310px' });
B.glow = q(B.toaster, '.glow'); B.lever = q(B.toaster, '.lever');
B.toasts = [0, 1].map(i => box(A.slice('toast'), s7.el, 200 + [125, 275][i] - 75, 690, 150, 170, { transformOrigin: '75px 170px' }));
B.fz = [0, 1].map(() => box(A.slice('frozen'), s7.el, 0, 0, 150, 170));
[...B.toasts, ...B.fz].forEach(e => s7.el.insertBefore(e, B.toaster));
B.sinChip = chip(s7.el, '❄ sin descongelar', 590, 1190, { size: 38, css: { color: '#2E64D8' } });
B.recChip = chip(s7.el, '¡como recién hecho!', 420, 560, { size: 40, css: { background: RED, color: CREAM, borderColor: '#F2D28B' } });
B.steam = box(A.steam(), s7.el, 260, 460, 300, 220);
B.b = burst(s7.el, 400, 700, ws('queda') + 0.1, 16, 400, 1.3);
s7.upd = t => {
  const tP = ws('pan'), tD = ws('duro'), tC = ws('cong'), tR = ws('reban'), tT = ws('tuest'), tS = ws('sin'), tQ = ws('queda');
  // pan cae y suena a piedra
  const kf_ = p(t, tP - 0.25, 0.4, E.inCubic), land = tP + 0.15;
  const kMove = p(t, tC - 0.05, 0.4, E.inOutCubic);
  set(B.loafW, { y: -900 * (1 - kf_) + shake(t, tD, 0.4, 10), x: -170 * kMove, s: lerp(1, 0.72, kMove) * (1 + 0.06 * bump(t, tD)), sy: 1 - 0.12 * bump(t, land) , r: -3 + wobble(t, 0.5, 1.5), o: t < tR + 0.6 ? 1 : 0 });
  B.cracks.forEach(c => c.setAttribute('opacity', t >= tD ? 1 : 0));
  set(B.toc, { s: pop(t, tD, 0.3) * out(t, ws('notires')), r: -6 + shake(t, tD, 0.4, 8), o: t >= tD && t < ws('notires') ? 1 : 0 });
  // no lo tires
  popIn(B.bin, t, ws('notires') - 0.05, tC, { s: 0.85, extra: { r: shake(t, ws('notires') + 0.4, 0.4, 6) } });
  popIn(B.no, t, ws('notires') + 0.35, tC, { s: 1.6, extra: { r: -8 } });
  // rodajas: cuchillo + separación
  const chop = clamp((t - tR + 0.15) / 0.6), spread = p(t, tR + 0.05, 0.4, E.outBack);
  B.segs.forEach((s, i) => set(s, { x: (i - 2) * 26 * spread, r: (i - 2) * 4 * spread, o: 1 }));
  const kn = t >= tR - 0.15 && t < tR + 0.55;
  const ci = Math.min(3, Math.floor(chop * 4)), cph = frac(chop * 4);
  const cutX = 370 + (156 + ci * 116 - 320) * 0.72 + (ci - 1.5) * 26 * 0.72 * spread;
  set(B.knife, { x: cutX - 260, y: 690 - 45 - 110 * (1 - Math.sin(Math.PI * cph)), r: 90, s: 0.75, o: kn ? 1 : 0 });
  // congelador
  const kz = pop(t, tC, 0.4);
  const doorOpen = clamp(p(t, tC + 0.25, 0.25) - p(t, tR + 1.05, 0.2) + p(t, tT + 0.2, 0.2) - p(t, tT + 0.75, 0.2));
  set(B.frz, { s: 0.85 * kz * (1 + 0.05 * bump(t, tR + 1.25)), o: t >= tC ? 1 : 0, x: 30 * p(t, tT, 0.3), r: shake(t, tR + 1.25, 0.3, 4) });
  at(B.door, 'transform', `translate(24 0) scale(${(1 - 0.88 * doorOpen).toFixed(3)} 1) translate(-24 0)`);
  // rodajas vuelan al congelador
  B.sl.forEach((e, i) => { const t0 = tR + 0.45 + i * 0.1, k = p(t, t0, 0.45, E.inOutCubic);
    const sx = 370 + (98 + i * 116 - 320) * 0.72 + (i - 2) * 26 * 0.72, sy = 730;
    set(e, { x: lerp(sx, 790, k) - 75, y: lerp(sy, 990, k) - 160 * Math.sin(Math.PI * k) - 85, s: lerp(0.8, 0.45, k), r: lerp(0, 20, k), o: t >= t0 && k < 1 ? 1 : 0 }); });
  // tostadora
  const kt = pop(t, tT - 0.05, 0.4);
  set(B.toaster, { s: kt * (1 + 0.05 * bump(t, tQ)), x: shake(t, tS + 0.1, 1.0, 3), y: 4 * Math.sin(t * 40) * (t >= tS && t < tQ ? 1 : 0), o: t >= tT - 0.05 ? 1 : 0 });
  B.glow.setAttribute('opacity', t >= ws('direct') + 0.6 && t < tQ ? (0.6 + 0.4 * Math.sin(t * 12)).toFixed(2) : 0);
  B.lever.setAttribute('transform', `translate(0 ${(t >= ws('direct') + 0.55 && t < tQ ? 70 : 0)})`);
  B.fz.forEach((e, i) => { const t0 = tT + 0.3 + i * 0.12, k = p(t, t0, 0.5, E.inOutCubic), kd = p(t, t0 + 0.5, 0.18, E.inCubic);
    const tx = 200 + [125, 275][i];
    set(e, { x: lerp(820, tx, k) - 75, y: lerp(990, 760, k) - 180 * Math.sin(Math.PI * k) + 150 * kd - 85, s: 0.7, r: lerp(-20, 0, k), o: t >= t0 && kd < 1 ? 1 : 0 }); });
  chipAnim(B.sinChip, t, tS, tQ, -3);
  B.toasts.forEach((e, i) => { const k = p(t, tQ + i * 0.06, 0.45, E.outBack); set(e, { y: lerp(150, 20, k), s: 0.85 * (1 + 0.06 * Math.sin(t * 5 + i)), r: (i ? 6 : -6) * k, o: t >= tQ ? 1 : 0 }); });
  set(B.steam, { y: -30 * frac(t * 0.8), o: t >= tQ + 0.3 ? 0.8 * (1 - frac(t * 0.8) * 0.6) : 0 });
  chipAnim(B.recChip, t, ws('recien') - 0.05, TG + 0.5, 3);
  B.b.upd(t);
};

/* ================= 8 · REGALO: despensa (arroz, legumbres, sal) ================= */
const s8 = scene(TG + 0.45, TP);
const K = {};
K.gift = box(A.gift(), s8.el, 440, 640, 200, 210, { transformOrigin: '100px 150px' });
K.glid = q(K.gift, '.glid');
K.plank = box(A.plank(), s8.el, 160, 990, 760, 70);
K.jars = [['ARROZ', 'arroz', 320], ['LEGUMBRES', 'leg', 555], ['SAL', 'sal', 790]].map(([kd, k, cx]) => { const e = box(A.pjar(kd), s8.el, cx - 100, 990 - 276, 200, 290, { transformOrigin: '100px 276px' }); el('div', e, { left: '30px', top: '160px', width: '140px', height: '54px', lineHeight: '54px', textAlign: 'center', fontFamily: 'Fredoka', fontWeight: 700, fontSize: kd === 'LEGUMBRES' ? '21px' : '32px', color: BLUE }, kd); return { e, lid: q(e, '.plid'), t0: ws(k), cx }; });
K.checks = K.jars.map(j => box(A.check(GREEN), s8.el, j.cx + 40, 770, 100, 100));
K.drop = box(A.noDrop(), s8.el, 110, 540, 120, 120);
K.chip = chip(s8.el, 'secos y bien cerrados', 380, 1110, { size: 36 });
K.spk = burst(s8.el, 555, 840, ws('estrop'), 14, 380, 1.1);
s8.upd = t => {
  const gOut = p(t, ws('arroz') - 0.25, 0.3, E.inCubic);
  set(K.gift, { s: 1.7 * pop(t, TG + 0.45, 0.45) * (1 - gOut), r: wobble(t, 1.2, 4), o: gOut < 1 ? 1 : 0 });
  at(K.glid, 'transform', `translate(${-40 * p(t, ws('regalo') - 0.1, 0.3)} ${-110 * p(t, ws('regalo') - 0.1, 0.3)}) rotate(${-25 * p(t, ws('regalo') - 0.1, 0.3)} 100 60)`);
  set(K.plank, { s: pop(t, ws('arroz') - 0.2, 0.4), o: t >= ws('arroz') - 0.2 ? 1 : 0 });
  K.jars.forEach((j, i) => {
    set(j.e, { s: pop(t, j.t0 - 0.05, 0.4) * (1 + 0.08 * bump(t, ws('casi') + i * 0.15)), r: wobble(t, 0.5, 1.5, i * 0.3), o: t >= j.t0 - 0.05 ? 1 : 0 });
    const tl = ws('bien2') + i * 0.16, kl = p(t, tl, 0.25, E.outBack);
    at(j.lid, 'transform', `translate(0 ${(-70 * (1 - kl)).toFixed(1)}) rotate(${(-14 * (1 - kl) + (t >= tl + 0.25 && t < tl + 0.55 ? 8 * Math.sin((t - tl) * 30) : 0)).toFixed(1)} 100 46)`);
    set(K.checks[i], { s: 0.85 * pop(t, ws('casi') + 0.2 + i * 0.15, 0.35), o: t >= ws('casi') + 0.2 + i * 0.15 ? 1 : 0, r: -8 });
  });
  set(K.drop, { s: pop(t, ws('secos') - 0.05, 0.35) * (1 + 0.1 * Math.sin(t * 6)), r: wobble(t, 0.6, 5), o: t >= ws('secos') - 0.05 ? 1 : 0 });
  chipAnim(K.chip, t, ws('secos'), TP + 0.1, -2);
  K.spk.upd(t);
};

/* ================= 9 · ENCUESTA 1/2/3 ================= */
const s9 = scene(TP - 0.05, ws('aqui') - 0.08, { enter: 'whip', exit: 'whip' });
const PO = {};
PO.card = box('', s9.el, 80, 470, 860, 470, { background: CREAM, border: '6px solid #D4A74A', borderRadius: '40px', boxShadow: '0 14px 0 rgba(8,16,48,.4)' });
const icons = ['🏷️', '🍯', '🍞'];
PO.rows = ['«Consumir pref.» no caduca', 'Miel dura: baño maría', 'Pan duro: congela y tuesta'].map((txt, i) => {
  const r = box('', PO.card, 26, 26 + i * 142, 796, 126, { borderRadius: '28px', border: '4px solid transparent' });
  const n = box(`<div style="width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#8A6420,#F2D28B 45%,#FFF1C4 55%,#C08F35);border:4px solid #5a3d0c;display:flex;align-items:center;justify-content:center;font-family:DMSerif;font-size:58px;color:${BLUE}">${i + 1}</div>`, r, 14, 15, 96, 96);
  el('div', r, { left: '126px', top: '12px', fontFamily: 'Fredoka', fontWeight: 600, fontSize: '40px', color: BLUE, whiteSpace: 'nowrap' }, txt);
  const tr = box('', r, 126, 74, 540, 26, { background: '#e6dcc6', borderRadius: '13px', overflow: 'hidden' });
  const fill = box('', tr, 0, 0, 540, 26, { background: 'linear-gradient(90deg,#C08F35,#F2D28B,#D4A74A)', borderRadius: '13px', transformOrigin: '0 50%' });
  el('div', r, { left: '694px', top: '14px', fontSize: '76px', lineHeight: 1 }, icons[i]);
  return { r, fill, n };
});
const tSay = [ws('uno2'), ws('dos2'), ws('tres4')], fills = [0.82, 0.64, 0.74];
PO.coms = [['P', RED, '@pili_mari', 'El 1. ¡Yo tiraba los yogures el mismo día! 😱'], ['A', BLUE2, '@antonio.r', 'Lo de la miel no lo sabía… ¡al baño maría! 🍯']].map(([ini, c, u, txt], i) => {
  const b = el('div', s9.el, { left: '370px', top: px(975 + i * 150), width: '570px', background: '#FFFFFF', borderRadius: '26px', padding: '12px 20px 14px 96px', boxShadow: '0 8px 0 rgba(8,16,48,.35)', border: '3px solid #e6dcc6' });
  b.innerHTML = `<div style="position:absolute;left:16px;top:14px;width:64px;height:64px;border-radius:50%;background:${c};color:#fff;font-family:Fredoka;font-weight:700;font-size:34px;display:flex;align-items:center;justify-content:center">${ini}</div><div style="font-family:Fredoka;font-weight:600;font-size:24px;color:#8a8f9c">${u}</div><div style="font-family:Fredoka;font-weight:500;font-size:32px;line-height:1.15;color:${INK}">${txt}</div><div style="position:absolute;right:16px;top:12px;font-size:26px;color:#c9ccd4">♡</div>`;
  return b;
});
s9.upd = t => {
  set(PO.card, { s: pop(t, TP, 0.45), r: wobble(t, 0.3, 0.6) });
  PO.rows.forEach((o, i) => {
    const t0 = tSay[i], act = t >= t0 && (i === 2 || t < tSay[i + 1]);
    o.r.style.borderColor = act ? RED : 'transparent'; o.r.style.background = act ? 'rgba(200,16,46,.07)' : 'transparent';
    set(o.r, { s: 1 + 0.05 * bump(t, t0), o: t >= TP + 0.15 + i * 0.1 ? 1 : 0 });
    set(o.fill, { sx: Math.max(0.001, fills[i] * p(t, TP + 0.6 + i * 0.15, 1.4, E.outCubic)) });
    set(o.n, { r: shake(t, t0, 0.35, 8), s: 1 + 0.2 * bump(t, t0) });
  });
  PO.coms.forEach((b, i) => { const t0 = ws('sabias') + 0.2 + i * 0.6; set(b, { x: 600 * (1 - p(t, t0, 0.4, E.outBack)), o: t >= t0 ? 1 : 0, r: (i % 2 ? 1 : -1) * 1.2 }); });
};

/* ================= 10 · CIERRE (marca solo aquí): lata con medallón + SEGUIR + compartimentos + tapa ================= */
const s10 = scene(ws('aqui') - 0.08, DUR + 0.1, { enter: 'whip' });
const CT = {};
(function buildTray() {
  let beads = ''; for (let i = 0; i < 56; i++) { const a = i / 56 * Math.PI * 2; beads += `<circle cx="${f1(400 + 381 * Math.cos(a))}" cy="${f1(400 + 381 * Math.sin(a))}" r="5" fill="#F7DFA0" stroke="#7a5418" stroke-width="1.6"/>`; }
  const rows = [3, 4, 5, 4, 3]; let cells = '', k = 0; const scal = (r, n) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r - 6; d += (i ? 'L' : 'M') + f1(rr * Math.cos(a)) + ' ' + f1(rr * Math.sin(a)); } return d + 'Z'; };
  const ic = ['🏷️', '🍯', '🍞', '🍚'];
  rows.forEach((n, ri) => { for (let c = 0; c < n; c++) { const x = 400 + (c - (n - 1) / 2) * 140, y = 400 + (ri - 2) * 128; k++;
    const lit = k <= 4;
    cells += `<g class="cell" data-k="${k}" transform="translate(${x} ${y})"><g class="ci"><path d="${scal(64, 18)}" fill="#FFFDF7" stroke="#bfb39a" stroke-width="3"/><circle r="48" fill="${lit ? '#FFF6DE' : '#EFE6D2'}" stroke="#e2d8c4" stroke-width="3"/>
      ${lit ? `<circle r="60" fill="none" stroke="url(#goldG)" stroke-width="8"/><text y="14" text-anchor="middle" font-size="44">${ic[k - 1]}</text><text y="44" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="${RED}">${k < 4 ? 'Nº ' + k : 'regalo'}</text>` : `<text class="qm" y="18" text-anchor="middle" font-family="DMSerif" font-size="56" fill="#c9bfa6">?</text>`}</g></g>`; } });
  CT.tray = box(`<svg viewBox="0 0 800 800" width="800" height="800" style="overflow:visible"><circle cx="412" cy="414" r="398" fill="rgba(5,12,40,.4)"/><circle cx="400" cy="400" r="398" fill="url(#goldG)" stroke="#5a3d0c" stroke-width="6"/>${beads}<circle cx="400" cy="400" r="368" fill="#0f1d48" stroke="#5a3d0c" stroke-width="4"/>${cells}</svg>`, s10.el, 140, 370, 800, 800);
})();
CT.cells = qa(CT.tray, '.cell').map(c => ({ ci: q(c, '.ci'), k: +c.dataset.k }));
CT.rays = box(A.rays(20, 700), s10.el, 540 - 700, 770 - 700, 1400, 1400);
s10.el.insertBefore(CT.rays, CT.tray);
CT.lid = box(A.lidFace({ id: 'lfE' }), s10.el, 90, 320, 900, 900);
CT.lidSpec = q(CT.lid, '.lidspec');
CT.btn = el('div', s10.el, { left: '430px', top: '1170px', width: '440px', height: '108px', borderRadius: '60px', background: '#FE2C55', color: '#fff', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.04em', boxShadow: '0 10px 0 #9e1033, 0 20px 40px rgba(0,0,0,.35)', border: '5px solid #fff' }, '+ SEGUIR');
CT.ripple = box('', s10.el, 650 - 60, 1224 - 60, 120, 120, { borderRadius: '50%', border: '8px solid #fff' });
CT.tag = el('div', s10.el, { left: '0', top: '1172px', width: '1080px', display: 'flex', justifyContent: 'center' });
CT.tagIn = el('div', CT.tag, { position: 'relative', background: 'linear-gradient(100deg,#8A6420 0%,#D4A74A 22%,#FFF1C4 40%,#F2D28B 50%,#C08F35 72%,#8A6420 100%)', border: '4px solid #5a3d0c', borderRadius: '100px', padding: '10px 36px 14px', fontFamily: 'Fredoka', fontWeight: 700, fontSize: '40px', color: BLUE, boxShadow: '0 8px 0 rgba(8,16,48,.45)', whiteSpace: 'nowrap' }, 'Ep. 2 · La fecha que te hace tirar comida');
CT.b1 = burst(s10.el, 540, 770, TC + 0.25, 18, 480, 1.4);
CT.b0 = burst(s10.el, 540, 770, ws('aqui') + 0.2, 14, 460, 1.2);
s10.upd = t => {
  const tA = ws('aqui'), tE = ws('esta');
  // tapa con medallón (logo) → se levanta en «esta lata» → vuelve y se cierra en TC
  const kIn = p(t, tA - 0.05, 0.4, E.outBack), kUp = p(t, tE - 0.05, 0.35, E.inCubic), kDn = p(t, TC, 0.27, E.inCubic);
  const up = kUp * (1 - kDn);
  set(CT.lid, { s: lerp(1.25, 0.8, kIn) * (1 + 0.03 * bump(t, TC + 0.27)) * lerp(1, 1.3, up), r: lerp(-20, 0, kIn) + wobble(t, 0.3, 0.8) - 40 * up, x: -300 * up, y: -10 - 1500 * up + shake(t, TC + 0.27, 0.35, 10), o: t >= tA - 0.05 ? 1 : 0 });
  at(CT.lidSpec, 'transform', `rotate(${(t * 25) % 360} 450 450)`);
  set(CT.rays, { r: t * 10, o: 0.55 });
  set(CT.tray, { s: 0.8 * (1 + 0.04 * bump(t, ws('muchos'))), r: wobble(t, 0.25, 1.2) + shake(t, TC + 0.27, 0.35, 5), o: t >= tE - 0.1 && t < TC + 0.3 ? 1 : 0 });
  CT.cells.forEach(o => {
    let s = 1, tw = 0;
    if (o.k <= 4) s = 1 + 0.06 * Math.sin(t * 5 + o.k);
    else { s = 1 + 0.3 * bump(t, ws('muchos') + (o.k - 5) * 0.05); tw = bump(t, ws('muchos') + (o.k - 5) * 0.05); }
    at(o.ci, 'transform', `scale(${s.toFixed(3)})`);
    const qm = q(o.ci, '.qm'); if (qm) qm.setAttribute('fill', tw > 0.3 ? '#D4A74A' : '#c9bfa6');
  });
  // + SEGUIR: grande bajo el medallón en «Sígueme», luego junto a la abuela
  const tS = ws('sig'), kb = pop(t, tS - 0.05, 0.4), kmv = p(t, tE, 0.35, E.inOutCubic);
  set(CT.btn, { s: kb * lerp(1.25, 1, kmv) * (t >= tS + 0.45 && t < tS + 0.6 ? 0.9 : 1) * (1 + 0.035 * Math.sin(t * 7)) * out(t, TC, 0.15), x: lerp(-120, 0, kmv), y: lerp(-10, 0, kmv), r: wobble(t, 0.6, 1.5), o: t >= tS - 0.05 && t < TC ? 1 : 0 });
  const rk = p(t, tS + 0.45, 0.5);
  set(CT.ripple, { x: -120, y: -10, s: 0.5 + 3 * rk, o: t >= tS + 0.45 && rk < 1 ? 1 - rk : 0 });
  set(CT.tag, { s: pop(t, TC + 0.55, 0.45) * (1 + 0.03 * Math.sin(t * 4)), o: t >= TC + 0.55 ? 1 : 0 });
  CT.b1.upd(t); CT.b0.upd(t);
};

/* ================= TRANSICIONES ================= */
const STREAK = el('div', OV, { left: 0, top: 0, width: '1080px', height: '1920px' });
const streaks = Array.from({ length: 7 }, (_, i) => box('', STREAK, 0, 300 + i * 210 + (i % 2) * 60, 1080, 10 + (i % 3) * 8, { background: 'linear-gradient(90deg,rgba(255,241,196,0),rgba(255,241,196,.85),rgba(255,241,196,0))', borderRadius: '10px' }));
const WHIPS = [s1.a, TP, s10.a, TE];

/* ================= TITULARES ================= */
H_('Tres cosas de las *etiquetas*', ['tres', J.tres + 1, J.tres + 2, J.tres + 3, 'etiq'], ws('nadie') - 0.05);
H_('…que *nadie* te explica', ['nadie', 'nadie', J.nadie + 1, J.nadie + 2], ws('ult') - 0.1);
H_('La última te va a *ahorrar_dinero*', [J.ult - 1, 'ult', J.ult + 1, J.ult + 2, J.ult + 3, 'ahorrar'], T1 - 0.05);
H_('Consumir *preferentemente*…', ['cons', 'pref'], ws('noes'));
H_('…*no* es caducidad', ['noes', J.noes + 1, J.noes + 2], ws('habla'));
H_('Habla de *calidad*', ['habla', J.habla + 1, 'calidad'], ws('puede'));
H_('Puede perder *sabor* o *textura*', ['puede', J.puede + 1, 'sabor', J.sabor + 1, 'textura'], ws('pero'));
H_('Si está bien *guardado*…', [J.pero + 1, J.pero + 2, J.pero + 3, 'guardado'], ws('nopel'));
H_('…*no* es peligroso', ['nopel', J.nopel + 1, 'pelig'], ws('verdad') - 0.05);
H_('La de *verdad*:', ['verdad', 'verdad', J.verdad + 2], ws('fecha2'), { maxH: 100 });
H_('«Fecha de *caducidad*»', ['fecha2', J.fecha2 + 1, J.fecha2 + 2], ws('esa'), { maxH: 100 });
H_('Esa sí: ni un *día_más*', ['esa', J.esa + 1, 'ni', J.ni + 1, J.ni + 2], ws('suele'), { maxH: 100 });
H_('*Carne*, *pescado*, *frescos*', ['carne', 'pescado', 'frescos'], T2 - 0.05, { maxH: 100 });
H_('La *miel* bien cerrada…', [J.miel - 1, 'miel', J.miel + 1, 'cerrada'], ws('aguanta'));
H_('…aguanta *años*', ['aguanta', 'anos'], ws('pone') - 0.15);
H_('¿Se pone *dura*?', ['pone', 'pone', 'dura'], ws('crist') - 0.35);
H_('Se ha *cristalizado*', [J.crist - 2, J.crist - 1, 'crist'], ws('bano') - 0.05);
H_('Un baño *maría*…', [J.bano - 1, 'bano', 'maria'], ws('como'));
H_('…y como *nueva*', [J.como - 1, 'como', 'nueva'], TE - 0.05);
H_('Espera… el 3 es el que *más_se_tira*', [J.espera + 1, J.tresE - 1, 'tresE', J.tresE + 1, J.tresE + 2, J.tresE + 3, 'masT'], T3 - 0.05);
H_('El *pan_duro*…', [J.pan - 1, 'pan'], ws('notires'));
H_('…¡*no* lo tires!', ['notires', J.notires + 1, J.notires + 2], ws('cong'));
H_('Congélalo en *rebanadas*', ['cong', J.cong + 1, 'reban'], ws('tuest'), { maxH: 100 });
H_('Tuéstalo *directamente*', ['tuest', 'direct'], ws('sin'));
H_('*Sin* descongelar', ['sin', J.sin + 1], ws('queda'));
H_('Queda como *recién_hecho*', ['queda', J.queda + 1, 'recien'], TG - 0.05);
H_('Y uno de *regalo*', ['reg', J.reg + 1, J.reg + 2, 'regalo'], ws('arroz') - 0.05);
H_('*Arroz*, *legumbres* y *sal*', ['arroz', 'leg', J.sal - 1, 'sal'], ws('casi'), { maxH: 100 });
H_('Casi no se *estropean*', ['casi', J.casi + 1, J.casi + 2, 'estrop'], ws('guardas') - 0.05);
H_('Guárdalos *secos* y *bien_cerrados*', ['guardas', 'secos', J.secos + 1, 'bien2'], TP - 0.05, { maxH: 100 });
H_('¿Cuál no *sabías*?', ['cual', J.cual + 1, 'sabias'], ws('aqui') - 0.08);
H_('Aquí la abuela *Carmen*', ['aqui', J.aqui + 1, J.aqui + 2, 'carmen'], ws('sig'));
H_('*Sígueme*', ['sig'], ws('esta') - 0.1);
H_('En esta lata hay *muchos_más*…', [J.esta - 1, 'esta', J.esta + 1, J.esta + 2, 'muchos'], ws('yyo'), { maxH: 100 });
H_('…y me los sé *todos*', ['yyo', J.los - 1, 'los', J.los + 1, 'todos'], LT, { maxH: 100 });
{ const hs = HEADS.slice().sort((x, y) => x.t0 - y.t0); for (let i = 0; i < hs.length - 1; i++) hs[i].t1 = Math.min(hs[i].t1, hs[i + 1].t0 - 0.06); }

/* ================= SFX ================= */
[['whoosh', 0.02, 0.6], ['pop', 0.45, 0.5], ['pop2', 1.2, 0.5], ['boing', w(5), 0.5], ['pop', 2.0, 0.5], ['stamp', ws('cad') - 0.03, 1], ['thud', ws('cad') + 0.05, 0.6],
 ['whoosh', s1.a], ['pop', ws('tres')], ['pop2', ws('tres') + 0.15], ['pop', ws('tres') + 0.3], ['paper', ws('etiq'), 0.7], ['boing', ws('nadie'), 0.6], ['click', ws('ult') + 0.2], ['pop', ws('ahorrar')], ['cash', ws('dinero'), 0.9],
 ['pop', T1], ['stamp', T1 + 0.22], ['paper', T1 + 0.5, 0.6], ['type', ws('cons'), 0.6], ['type', ws('pref'), 0.6], ['type', ws('antes'), 0.6], ['pop2', ws('antes') + 0.2, 0.7], ['stamp', ws('noes')], ['sparkle', ws('calidad'), 0.7], ['ding', ws('calidad') + 0.4, 0.6],
 ['pop', ws('sabor')], ['pop2', ws('textura')], ['whoosh', ws('pero'), 0.5], ['click', ws('guardado') - 0.05], ['thud', ws('guardado') + 0.2, 0.5], ['ding', ws('pelig'), 0.8],
 ['whoosh', ws('verdad') - 0.05, 0.6], ['pop', ws('verdad') + 0.1], ['stamp', ws('fecha2')], ['pop2', ws('fecha2') + 0.25], ['stamp', ws('ni')], ['error', ws('dmas'), 0.6], ['pop', ws('carne')], ['pop2', ws('pescado')], ['pop', ws('frescos')],
 ['pop', T2], ['stamp', T2 + 0.22], ['whoosh', T2 + 0.45, 0.5], ['click', ws('cerrada')], ['swoosh_up', ws('aguanta'), 0.6], ['paper', ws('aguanta') + 0.2, 0.6], ['paper', ws('anos'), 0.5], ['thud', ws('dura'), 0.8], ['tick', ws('dura') + 0.2, 0.7], ['sparkle', ws('crist'), 0.8], ['whoosh', ws('bano') - 0.1, 0.6], ['gulp', ws('bano') + 0.35, 0.7], ['tada', ws('nueva'), 0.7],
 ['whoosh', TE, 0.7], ['tick', TE + 0.3, 0.7], ['tick', TE + 0.8, 0.7], ['tick', TE + 1.3, 0.8], ['tick', TE + 1.8, 0.9], ['boing', ws('tira'), 0.5], ['burst', T3], ['stamp', T3 + 0.22],
 ['whoosh', ws('pan') - 0.25, 0.6], ['thud', ws('pan') + 0.15], ['stamp', ws('duro'), 0.7], ['error', ws('notires') + 0.35, 0.6], ['pop', ws('cong')], ['click', ws('cong') + 0.3],
 ['tick', ws('reban') - 0.1, 0.9], ['tick', ws('reban') + 0.05, 0.9], ['tick', ws('reban') + 0.2, 0.9], ['tick', ws('reban') + 0.35, 0.9], ['swoosh_up', ws('reban') + 0.5, 0.6], ['click', ws('reban') + 1.05],
 ['pop2', ws('tuest')], ['whoosh', ws('tuest') + 0.35, 0.5], ['click', ws('direct') + 0.55], ['clockfast', ws('sin'), 0.5], ['ping', ws('queda'), 0.8], ['sparkle', ws('queda') + 0.15, 0.7], ['ding', ws('recien'), 0.6],
 ['pop', TG], ['tada', TG + 0.25, 0.8], ['pop', ws('arroz')], ['pop2', ws('leg')], ['pop', ws('sal')], ['sparkle', ws('estrop'), 0.6], ['ding', ws('casi') + 0.2, 0.5], ['pop2', ws('secos')], ['click', ws('bien2') + 0.25], ['click', ws('bien2') + 0.41], ['click', ws('bien2') + 0.57],
 ['whoosh', TP], ['pop', ws('uno2')], ['pop2', ws('dos2')], ['pop', ws('tres4')], ['msg_in', ws('sabias') + 0.2, 0.6], ['msg_in', ws('sabias') + 0.8, 0.6],
 ['whoosh', s10.a], ['bell', ws('aqui') + 0.1, 0.6], ['sparkle', ws('aqui') + 0.2, 0.6], ['pop', ws('sig')], ['click', ws('sig') + 0.45], ['swoosh_up', ws('esta'), 0.6], ['sparkle', ws('muchos'), 0.7], ['thud', TC + 0.27, 0.9], ['ding', TC + 0.55, 0.6], ['swoosh_up', LT, 0.5]
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
    if (s === s10) y -= 1920 * p(t, LT, 0.4, E.inOutCubic);
    if (loop) { y = 1920 * (1 - p(t, LT, 0.4, E.inOutCubic)); x = 0; s.upd(t - LT - 0.4); }
    else s.upd(t);
    set(s.el, { x, y });
  });
  granny(t);
  const PUN = [w(1), w(5), ws('cad'), ws('tres'), ws('ult'), ws('dinero'), ws('noes'), ws('calidad'), ws('pelig'), ws('fecha2'), ws('ni'), ws('carne'), ws('miel'), ws('dura'), ws('crist'), ws('nueva'), ws('tresE'),
    ws('duro'), ws('reban'), ws('queda'), ws('arroz'), ws('estrop'), ws('uno2'), ws('dos2'), ws('tres4'), ws('sig'), ws('todos')];
  const SHK = [ws('cad'), ws('noes'), ws('ni'), ws('dura'), T3, ws('pan') + 0.15, TC + 0.27];
  let b = 0; PUN.forEach(ti => b = Math.max(b, bump(t, ti)));
  let sx = 0, sy = 0; SHK.forEach(ti => { sx += shake(t, ti, 0.35, 13); sy += shake(t + 0.03, ti, 0.35, 8); });
  set(CAM, { s: 1 + 0.075 * b, x: sx, y: sy });
  let sk = 0; WHIPS.forEach(T => { sk = Math.max(sk, 1 - Math.abs(t - T) / 0.2); });
  STREAK.style.opacity = clamp(sk); streaks.forEach((e, i) => set(e, { x: (i % 2 ? -1 : 1) * 200 * Math.sin(t * 30 + i) }));
  updHeads(t); updPB(t); updNP(t);
  set(HL, { o: t >= LT ? 0 : 1 });
};
Engine.start({ duration: DUR, captions: { y: 1380, font: 'Fredoka', size: 52, weight: 700, bg: CREAM, color: BLUE, hi: RED, border: '4px solid #D4A74A', radius: 40, pad: '8px 30px 12px', maxWords: 3, shadow: '0 8px 0 rgba(8,16,48,.4)' } });
