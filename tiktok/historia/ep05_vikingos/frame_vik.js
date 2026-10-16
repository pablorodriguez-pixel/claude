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
// [t, x, y, s, r, o]
const CX = -41, CY = 45, CS = 0.75;
const OVK = [
  [0, CX, CY, CS, 0, 0], [11.05, CX, CY, CS, 0, 0], [11.06, CX, CY, 0.45, 0, 1], [11.45, CX, CY, CS, 0, 1],
  [25.72, CX, CY, CS, 0, 1], [25.98, 70, -200, 1.3, -4, 1], [26.95, 70, -200, 1.3, -4, 1], [27.25, CX, CY, CS, 0, 1],
  [49.4, CX, CY, CS, 0, 1], [49.62, 20, -30, 1.08, -3, 1], [50.6, 20, -30, 1.08, -3, 1], [50.9, CX, CY, CS, 0, 1],
  [64.9, CX, CY, CS, 0, 1], [64.91, CX, CY, CS, 0, 0],
  [70.6, 0, 0, 1, 0, 0], [70.61, 335, -690, 0.4, 0, 1], [71.0, 335, -690, 1.05, -3, 1],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[24.35, 25.4], [63.55, 64.75]];
const SCAND = [[39.1, 39.95], [41.72, 43.2], [48.17, 49.1]];
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t > 25.72 && t < 27.1) { o.bL = 16; o.bR = 16; o.look = [0, -4]; o.fan = Math.sin(t * 10) * 10; }
  if (t > 49.4 && t < 50.7) { o.bL = 16; o.bR = 16; o.look = [0, 0]; }
  if (SCAND.some(L => t >= L[0] && t < L[1])) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 70.6) { o.look = [0, 0]; o.jaw = 0; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; }
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
[[0.76, .35, 14], [2.49, .3, 8], [7.12, .45, 22], [20.27, .3, 10], [24.3, .45, 18], [29.3, .3, 8], [41.72, .35, 12], [48.54, .4, 14], [49.42, .4, 16], [58.15, .3, 10], [62.8, .3, 10], [64.32, .3, 12], [69.83, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  // gancho
  [0.05, 'swoosh_up', .5], [0.76, 'pop', 1.0], [0.8, 'boing', .9], [1.35, 'gulp', .5], [2.49, 'stamp', .8], [2.6, 'pop2', .5],
  // telón + MITO
  [4.45, 'whoosh', .6], [4.7, 'swoosh_up', .6], [5.31, 'click', .7], [6.97, 'tada', .7], [7.12, 'stamp', 1.1],
  // balcón
  [7.75, 'whoosh', .6], [8.01, 'pop2', .7], [9.05, 'swoosh_up', .6], [10.4, 'ding', .6], [10.85, 'whoosh', .7],
  // museo
  [11.1, 'thud', .5], [11.42, 'pop', .6], [11.6, 'sparkle', .6], [13.61, 'pop', .7], [13.9, 'pop2', .6], [14.34, 'ding', .9],
  // Noruega
  [14.75, 'whoosh', .6], [15.23, 'boing', .6], [15.7, 'tick', .4], [16.1, 'tick', .4], [16.5, 'tick', .4], [16.75, 'pop', .7], [16.9, 'cash', .5],
  // cerca
  [17.3, 'whoosh', .5], [17.34, 'swoosh_up', .6], [17.6, 'pop2', .6], [18.06, 'pop', .7], [18.6, 'squish', .4], [19.64, 'whoosh', .6], [20.27, 'error', .9], [20.39, 'error', .6],
  // pelea
  [21.0, 'whoosh', .6], [22.31, 'whoosh', .9], [23.15, 'squish', .9], [23.3, 'boing', .7], [23.55, 'pop2', .5], [24.3, 'stamp', 1.1], [24.4, 'thud', .7],
  // ¿de dónde salen?
  [25.72, 'whoosh', .6], [26.0, 'boing', .8],
  // 1876
  [27.15, 'swoosh_up', .5], [27.25, 'drumroll', .7], [29.3, 'burst', .8], [29.98, 'swoosh_up', .7], [30.0, 'pop', .6], [30.85, 'whoosh', .7],
  // Wagner
  [31.32, 'paper', .8], [32.75, 'pop2', .5], [33.05, 'emu', .9], [33.96, 'pop', .7], [34.48, 'pop', .7],
  // Doepler
  [35.62, 'whoosh', .6], [36.45, 'pop2', .6], [37.23, 'ding', .7], [38.95, 'whoosh', .5], [39.1, 'scratch', .5], [39.3, 'paper', .7], [39.66, 'paper', .7],
  [40.09, 'pop', .7], [40.71, 'pop', .7], [41.19, 'pop', .7], [41.72, 'tada', .9], [41.75, 'glitch', .6], [42.3, 'sparkle', .7],
  // cultura pop
  [43.4, 'pop', .6], [43.9, 'stamp', .8], [44.3, 'whoosh', .5], [45.06, 'whoosh', .6], [45.25, 'pop', .6], [45.59, 'whoosh', .6], [45.8, 'pop', .6], [46.35, 'whoosh', .6], [46.8, 'pop', .6], [48.17, 'boing', .7], [48.54, 'stamp', 1.0],
  // ojo
  [49.42, 'stamp', 1.1], [50.41, 'pop', .7], [50.69, 'pop', .7], [51.25, 'ding', .8], [52.28, 'pop2', .6],
  // bronce
  [53.02, 'whoosh', .6], [53.79, 'pop', .6], [54.57, 'swoosh_up', .6], [54.8, 'tick', .4], [55.1, 'tick', .4], [55.4, 'cash', .7], [55.94, 'pop', .6],
  // ceremonial
  [56.68, 'whoosh', .6], [57.17, 'bell', .7], [58.15, 'error', .9],
  // resumen
  [59.18, 'whoosh', .6], [59.39, 'paper', .7], [60.28, 'pop2', .6], [61.5, 'boing', .7], [62.75, 'burst', .9], [62.8, 'glitch', .7], [63.49, 'pop', .6], [64.32, 'stamp', .9],
  // CTA
  [64.95, 'whoosh', .6], [66.19, 'msg_in', .8], [66.75, 'msg_in', .8], [67.4, 'msg_in', .8],
  // cierre
  [67.98, 'whoosh', .4], [69.17, 'whoosh', .5], [69.83, 'thud', 1.4], [69.86, 'stamp', .6], [70.45, 'whoosh', .5], [70.7, 'tada', .8], [71.15, 'pop', .6],
].forEach(s => sfx(s[1], s[0], s[2]));
