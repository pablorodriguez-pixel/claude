/* =================== EL VECINO en su marco ovalado (de globals_v2, adaptado) =================== */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
// [t, x, y, s, r, o] — por texto (K) o re-clavado desde v1 con R()
const CX = -41, CY = 45, CS = 0.75;
const OVK = [
  [0, CX, CY, CS, 0, 0], [K.casco - 0.1, CX, CY, CS, 0, 0], [K.casco - 0.09, CX, CY, 0.45, 0, 1], [K.casco + 0.3, CX, CY, CS, 0, 1],
  [R(25.72), CX, CY, CS, 0, 1], [R(25.98), 70, -200, 1.3, -4, 1], [R(26.95), 70, -200, 1.3, -4, 1], [R(27.25), CX, CY, CS, 0, 1],
  [R(49.4), CX, CY, CS, 0, 1], [R(49.62), 20, -30, 1.08, -3, 1], [R(50.6), 20, -30, 1.08, -3, 1], [R(50.9), CX, CY, CS, 0, 1],
  [CTA0 - 0.05, CX, CY, CS, 0, 1], [CTA0 + 0.2, CX - 420, CY, CS, 0, 1], [CTA0 + 0.21, CX - 420, CY, CS, 0, 0],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[R(24.35), R(25.4)], [K.senor + 0.06, CTA0 - 0.05]];
const SCAND = [[39.1, 39.95], [41.72, 43.2], [48.17, 49.1]].map(q => q.map(R));
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t > R(25.72) && t < R(27.1)) { o.bL = 16; o.bR = 16; o.look = [0, -4]; o.fan = Math.sin(t * 10) * 10; }
  if (t > R(49.4) && t < R(50.7)) { o.bL = 16; o.bR = 16; o.look = [0, 0]; }
  if (SCAND.some(L => t >= L[0] && t < L[1])) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* =================== frame =================== */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic), kout = p(t, s.t1 - 0.12, 0.12, E.inCubic); set(s.c, { x: (1 - kin) * 160 * s.dir - kout * 150, o: Math.min(clamp(kin * 1.8), 1 - kout) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
/* ---------- temblores ---------- */
[[0.76, .35, 14], [2.49, .3, 8], [7.12, .45, 22], [20.27, .3, 10], [24.3, .45, 18], [29.3, .3, 8], [41.72, .35, 12], [48.54, .4, 14], [49.42, .4, 16]].forEach(s => shakeAt(R(s[0]), s[1], s[2]));
[[K.senor, .3, 10], [K.teatro, .3, 12], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido (v1 re-clavados con R(); final nuevo por K) ---------- */
[
  // gancho
  [0.05, 'swoosh_up', .5], [0.76, 'pop', 1.0], [0.8, 'boing', .9], [1.35, 'gulp', .5], [2.49, 'stamp', .8], [2.6, 'pop2', .5],
  // telón + MITO
  [4.45, 'whoosh', .6], [4.7, 'swoosh_up', .6], [5.31, 'click', .7], [6.97, 'tada', .7], [7.12, 'stamp', 1.1],
  // museo
  [11.06, 'whoosh', .6], [11.1, 'thud', .5], [11.42, 'pop', .6], [11.6, 'sparkle', .6], [13.61, 'pop', .7], [13.9, 'pop2', .6], [14.34, 'ding', .9],
  // Noruega
  [14.75, 'whoosh', .6], [15.23, 'boing', .6], [15.69, 'stamp', .9], [16.75, 'pop', .7], [16.9, 'cash', .5],
  // cerca
  [17.3, 'whoosh', .5], [17.34, 'swoosh_up', .6], [17.6, 'pop2', .6], [18.06, 'pop', .7], [18.6, 'squish', .4], [19.64, 'whoosh', .6], [20.27, 'error', .9], [20.39, 'error', .6],
  // pelea
  [21.0, 'whoosh', .6], [22.31, 'whoosh', .9], [23.15, 'squish', .9], [23.3, 'boing', .7], [23.55, 'pop2', .5], [24.3, 'stamp', 1.1], [24.4, 'thud', .7],
  // ¿de dónde salen?
  [25.72, 'whoosh', .6], [26.0, 'boing', .8],
  // 1876
  [27.15, 'swoosh_up', .5], [27.24, 'stamp', 1.0], [29.3, 'burst', .8], [29.98, 'swoosh_up', .7], [30.0, 'pop', .6], [30.85, 'whoosh', .7],
  // Wagner
  [31.32, 'paper', .8], [32.75, 'pop2', .5], [33.05, 'emu', .9], [33.96, 'pop', .7], [34.48, 'pop', .7],
  // Doepler
  [35.62, 'whoosh', .6], [36.45, 'pop2', .6], [37.23, 'ding', .7], [38.95, 'whoosh', .5], [39.1, 'scratch', .5], [39.3, 'paper', .7], [39.66, 'paper', .7],
  [40.09, 'pop', .7], [40.71, 'pop', .7], [41.19, 'pop', .7], [41.72, 'tada', .9], [41.75, 'glitch', .6], [42.3, 'sparkle', .7],
  // cultura pop
  [43.4, 'pop', .6], [43.9, 'stamp', .8], [44.3, 'whoosh', .5], [45.06, 'whoosh', .6], [45.25, 'pop', .6], [45.59, 'whoosh', .6], [45.8, 'pop', .6], [46.35, 'whoosh', .6], [46.8, 'pop', .6], [48.17, 'boing', .7], [48.54, 'stamp', 1.0],
  // ojo
  [49.42, 'stamp', 1.1], [50.41, 'pop', .7], [50.69, 'pop', .7], [51.25, 'ding', .8], [52.28, 'pop2', .6],
].forEach(s => sfx(s[1], R(s[0]), s[2]));
[
  // dos mil años antes
  [S.I2[0] + 0.02, 'whoosh', .6], [S.I2[0] + 0.2, 'pop', .5], [K.dos, 'stamp', .9], [K.anos, 'cash', .7], [K.vikL7, 'pop', .6],
  // ceremoniales
  [S.I3[0] + 0.02, 'whoosh', .6], [K.cerem, 'bell', .7], [K.cerem + 0.42, 'error', .8],
  // o sea
  [S.J1[0] + 0.02, 'whoosh', .6], [K.sea, 'paper', .7], [K.imagen, 'pop2', .6], [K.vik9 + 0.18, 'boing', .7],
  // golpe rosa
  [S.HIT[0], 'burst', .9], [K.senor, 'glitch', .6], [K.teatro, 'stamp', .9],
  // CTA sí / no
  [CTA0, 'whoosh', .6], [K.te + 0.05, 'pop', .7], [K.te + 0.17, 'pop', .6], [K.creias, 'msg_in', .7], [K.si + 0.12, 'click', .9], [K.si, 'msg_in', .6], [K.no + 0.12, 'click', .6],
  // balcón + libro
  [S.BAL[0] + 0.02, 'whoosh', .7], [K.vecino, 'pop2', .6], [S.BOOK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [K.libro + 0.28, 'stamp', .6], [LOOP, 'whoosh', .6],
].forEach(s => sfx(s[1], s[0], s[2]));

/* ---------- bucle: los últimos 0,4 s enlazan con la portada (fotograma 0) ---------- */
{
  const f0 = window.frame;
  window.frame = t => {
    if (t < LOOP) return f0(t);
    f0(0);
    const k = p(t, LOOP, 0.22, E.outCubic);
    set(world, { x: (1 - k) * 1080 });
  };
}
