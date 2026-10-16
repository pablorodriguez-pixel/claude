/* =================== óvalo del Vecino: visibilidad + expresiones =================== */
const OVW = [[13.85, 33.2], [35.75, 40.15], [41.6, 71.59]];
const SCAND = [38.36, 46.84, 53.33, 63.99];
const LAUGH = [[45.05, 45.75], [61.55, 62.25]];
function updOval(t) {
  const win = OVW.find(w => t >= w[0] && t < w[1]), end = t >= 78.85;
  if (!win && !end) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  if (end) {
    const k = p(t, 78.9, 0.5, E.outBack);
    set(ovalW, { x: 317, y: -509 + wobble(t, 0.5, 3), s: lerp(0.2, 1.25, k), r: lerp(-10, -2, clamp(k)), o: t < 78.9 ? 0 : 1 });
  } else {
    const k = pop(t, win[0], 0.35);
    set(ovalW, { x: inL ? Math.sin(t * 40) * 4 : 0, y: wobble(t, 0.5, 2), s: lerp(0.3, 0.8, k), r: inL ? Math.sin(t * 20) * 2 : 0, o: 1 });
  }
  const o = { jaw: end ? 0 : talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t > 16 && t < 20.8) o.look = [6, -1];
  if (t > 20.25 && t < 20.9) { o.bL = 12; o.bR = 12; }
  if (SCAND.some(f => t > f - 0.1 && t < f + 0.9)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; o.jaw = Math.max(o.jaw, 0.5); }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (end) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; }
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
[[9.93, .4, 16], [20.25, .3, 8], [33.2, .3, 10], [35.18, .4, 14], [39.6, .35, 10], [40.96, .35, 12], [44.55, .3, 8], [51.4, .35, 12], [57.54, .35, 12], [64.2, .3, 8], [70.19, .3, 10], [72.43, .5, 20], [78.23, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
[
  [0.12, 'swoosh_up', .5], [0.2, 'pop', .6], [0.6, 'pop2', .6], [2.72, 'whoosh', .5], [3.43, 'ding', .7], [4.2, 'swoosh_up', .6], [4.47, 'clockfast', .6],
  [6.0, 'whoosh', .6], [6.3, 'thud', .8], [6.62, 'boing', .4], [7.0, 'pop', .6], [8.44, 'error', .6], [8.6, 'paper', .6], [9.93, 'stamp', 1.1],
  [10.6, 'whoosh', .6], [11.13, 'pop', .7], [11.94, 'swoosh_up', .6], [13.27, 'ding', .6], [13.62, 'whoosh', .6],
  [13.9, 'whoosh', .5], [14.19, 'pop', .7], [15.98, 'swoosh_up', .6], [16.64, 'pop2', .6], [17.38, 'pop', .6], [18.64, 'sparkle', .6], [19.8, 'pop2', .6], [20.08, 'whoosh', .5], [20.25, 'thud', .7], [20.32, 'ding', .7],
  [20.85, 'whoosh', .5], [20.97, 'pop', .7], [22.15, 'swoosh_up', .5], [22.63, 'paper', .6], [23.33, 'tick', .6], [23.47, 'tick', .6], [24.41, 'sparkle', .7],
  [25.59, 'whoosh', .6], [25.7, 'pop', .6], [26.0, 'pop2', .6], [27.06, 'boing', .7],
  [28.0, 'paper', .7], [28.13, 'swoosh_up', .5], [29.02, 'pop', .7], [30.22, 'swoosh_up', .5], [31.19, 'ding', .7], [31.83, 'whoosh', .5], [32.59, 'pop2', .6],
  [33.2, 'burst', .9], [34.03, 'pop', .5], [34.81, 'swoosh_up', .8], [35.18, 'glitch', .7], [35.22, 'thud', 1.0],
  [35.75, 'whoosh', .6], [35.9, 'paper', .6], [36.54, 'click', .5], [38.36, 'pop', .7], [38.67, 'pop', .7], [39.53, 'pop2', .8], [39.6, 'stamp', 1.0],
  [40.15, 'burst', .9], [40.96, 'tada', .8],
  [41.6, 'whoosh', .6], [42.43, 'swoosh_up', .7], [44.14, 'pop', .7], [44.55, 'stamp', .9], [44.98, 'emu', .9], [45.65, 'scratch', .7], [45.9, 'swoosh_up', .5],
  [46.71, 'tick', .7], [47.07, 'tick', .7], [47.43, 'tick', .7], [47.79, 'tick', .7], [48.15, 'tick', .7], [48.25, 'sad', .7], [48.6, 'whoosh', .5],
  [49.7, 'whoosh', .6], [49.8, 'stamp', .9], [50.35, 'boing', .6], [51.4, 'thud', 1.0], [53.33, 'sparkle', .8], [53.42, 'pop', .6], [54.08, 'clockfast', .5], [54.86, 'ding', .7], [55.0, 'pop', .6], [56.3, 'typing', .7],
  [57.45, 'whoosh', .5], [57.54, 'stamp', 1.1], [58.09, 'swoosh_up', .6], [58.96, 'bell', .7], [59.92, 'whoosh', .6], [61.5, 'burst', .6], [61.55, 'pop', .6], [62.35, 'paper', .6], [63.99, 'scratch', .7], [64.2, 'stamp', .9],
  [65.05, 'whoosh', .5], [65.85, 'whoosh', .6], [66.0, 'pop', .5], [67.69, 'ding', .8], [69.14, 'whoosh', .6], [70.19, 'error', .7],
  [71.59, 'burst', .9], [72.27, 'swoosh_up', .6], [72.43, 'glitch', .7], [72.47, 'sparkle', .8],
  [73.0, 'whoosh', .6], [73.9, 'pop', .5], [74.13, 'msg_in', .8], [74.6, 'msg_in', .8], [75.1, 'msg_in', .8],
  [75.95, 'whoosh', .5], [77.37, 'whoosh', .6], [78.23, 'thud', 1.4], [78.26, 'stamp', .6], [78.9, 'whoosh', .4], [79.1, 'tada', .8], [79.55, 'pop', .6],
].forEach(s => sfx(s[1], s[0], s[2]));
