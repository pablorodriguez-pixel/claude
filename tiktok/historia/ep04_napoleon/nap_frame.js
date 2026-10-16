/* =================== EL VECINO en su marco ovalado (del kit, retemporizado) =================== */
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
const CX = -41, CY = 45;
// [t, x, y, s, r, o]
const OVK = [
  [0, CX, CY, 0.75, 0, 0], [11.95, CX, CY, 0.75, 0, 0], [11.96, CX, CY, 0.45, 0, 1], [12.3, CX, CY, 0.75, 0, 1],
  [46.49, CX, CY, 0.75, 0, 1], [46.5, CX, CY, 0.75, 0, 0], [48.19, CX, CY, 0.75, 0, 0], [48.2, CX, CY, 0.45, 0, 1], [48.5, CX, CY, 0.75, 0, 1],
  [59.45, CX, CY, 0.75, 0, 1], [59.46, CX, CY, 0.75, 0, 0], [66.2, CX, CY, 0.75, 0, 0], [66.21, 335, -600, 0.4, 0, 1], [66.55, 335, -600, 1.12, -3, 1],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[31.85, 32.4], [53.3, 54.1]];
const SCAND = [[26.3, 27.4], [32.46, 33.4], [49.68, 50.2]]; // abanico rápido
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (SCAND.some(S => t >= S[0] && t < S[1])) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 12 && t < 15) { o.look = [3, -4]; o.bR = 10; }
  if (t > 37.7 && t < 38.6) { o.bL = 8; o.bR = 8; o.look = [3, -2]; }
  if (t > 43.3 && t < 44.0) { o.look = [8, -6]; o.bL = 16; o.bR = 16; o.fan = -20; }
  if (t > 66.2) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.jaw = 0; }
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
[[0.59, .25, 8], [0.95, .3, 8], [3.56, .35, 14], [26.26, .3, 6], [32.46, .35, 12], [38.58, .25, 6], [48.2, .3, 12], [53.66, .3, 10], [58.05, .35, 12], [65.5, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.02, 'pop', .6], [0.59, 'stamp', 1], [0.88, 'swoosh_up', .7], [0.95, 'burst', .9], [1.5, 'boing', .5], [2.6, 'pop', .7], [3.56, 'stamp', 1.1],
  [4.4, 'whoosh', .5], [4.8, 'tick', .5], [5.0, 'tick', .5], [5.2, 'tick', .5], [5.4, 'tick', .5], [5.62, 'ding', .8],
  [5.8, 'whoosh', .6], [5.95, 'pop2', .5], [6.1, 'pop2', .5], [6.67, 'swoosh_up', .5], [7.47, 'glitch', .8], [7.95, 'tada', .7],
  [8.62, 'whoosh', .6], [9.17, 'pop2', .7], [9.75, 'swoosh_up', .6], [10.5, 'whoosh', .7], [10.95, 'thud', .5], [11.32, 'ding', .5], [11.7, 'swoosh_up', .6],
  [12.0, 'pop', .6], [13.39, 'pop', .6], [13.68, 'pop', .6], [13.91, 'pop', .6], [14.21, 'pop2', .7], [14.4, 'boing', .5],
  [15.05, 'paper', .7], [15.75, 'paper', .7], [15.94, 'paper', .7], [16.82, 'swoosh_up', .6], [17.2, 'sparkle', .6],
  [18.62, 'whoosh', .6], [19.01, 'pop', .6], [19.45, 'stamp', .7], [19.9, 'paper', .6], [20.49, 'paper', .6], [20.75, 'ding', .6], [20.9, 'pop2', .5],
  [21.67, 'whoosh', .6], [21.95, 'swoosh_up', .5], [22.73, 'pop', .7], [23.45, 'swoosh_up', .5], [23.95, 'ding', .7], [24.3, 'pop', .5],
  [24.85, 'whoosh', .6], [25.68, 'click', .7], [26.26, 'squish', .9], [26.93, 'sad', .7],
  [27.6, 'whoosh', .5], [27.75, 'swoosh_up', .6], [29.35, 'whoosh', .6], [29.82, 'pop', .6], [30.56, 'swoosh_up', .5], [31.02, 'squish', .8], [31.76, 'boing', .8],
  [32.46, 'stamp', 1.1], [32.5, 'glitch', .6],
  [33.95, 'whoosh', .5], [34.05, 'swoosh_up', .6], [35.31, 'whoosh', .6], [36.05, 'pop', .6], [36.5, 'pop2', .5], [37.2, 'heart', .7], [37.55, 'click', .6], [37.74, 'sparkle', .7], [38.58, 'stamp', .8],
  [39.15, 'whoosh', .5], [39.75, 'drumroll', .5], [41.07, 'pop', .6], [41.7, 'paper', .6], [42.85, 'pop2', .5], [43.3, 'emu', .5], [44.35, 'ding', .7], [45.08, 'whoosh', .5], [45.8, 'gulp', .7],
  [46.5, 'glitch', .7], [47.52, 'burst', .7],
  [48.2, 'stamp', 1], [49.68, 'error', .6], [50.37, 'pop', .5], [51.29, 'swoosh_up', .5], [51.69, 'ding', .7],
  [52.4, 'paper', .8], [52.8, 'paper', .7], [53.24, 'paper', .7], [53.44, 'paper', .7], [53.66, 'thud', .8],
  [54.35, 'whoosh', .6], [55.61, 'pop', .7], [56.75, 'pop2', .6], [57.61, 'pop', .6], [58.05, 'burst', .9], [58.1, 'click', .6],
  [59.5, 'whoosh', .5], [61.0, 'msg_in', .7], [61.75, 'msg_in', .7], [62.5, 'msg_in', .7],
  [63.55, 'whoosh', .4], [64.87, 'whoosh', .5], [65.18, 'paper', .5], [65.5, 'thud', 1.3], [65.55, 'stamp', .6], [66.45, 'tada', .8], [67.3, 'pop', .5],
].forEach(s => sfx(s[1], s[0], s[2]));
