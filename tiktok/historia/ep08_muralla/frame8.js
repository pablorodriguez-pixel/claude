/* =================== frame =================== */
const SHAKES8 = [[7.95, .4, 16], [30.55, .35, 12], [46.66, .35, 14], [60.5, .35, 10], [67.28, .5, 22], [53.98, .3, 8], [38.69, .3, 8]];
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
  let sh = 0; SHAKES8.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
/* ---------- efectos de sonido ---------- */
[
  [0.05, 'swoosh_up', .6], [0.5, 'pop', .7], [1.43, 'ding', .6], [2.9, 'whoosh', .5], [3.45, 'swoosh_up', .5], [3.9, 'boing', .7],
  [5.38, 'paper', .7], [5.5, 'pop2', .6], [6.15, 'squish', .5], [7.88, 'scratch', .9], [7.95, 'stamp', 1.1],
  [8.45, 'whoosh', .6], [9.01, 'pop2', .7], [9.9, 'swoosh_up', .6], [11.3, 'pop', .6], [11.36, 'ding', .6], [11.72, 'whoosh', .7],
  [12.0, 'pop', .6], [12.7, 'swoosh_up', .5], [13.0, 'clockfast', .4], [13.95, 'cash', .7], [15.0, 'pop2', .5],
  [15.38, 'whoosh', .6], [15.9, 'pop', .6], [17.6, 'emu', .9], [17.68, 'swoosh_up', .5], [18.36, 'pop', .8],
  [19.4, 'whoosh', .5], [19.63, 'pop2', .6], [20.46, 'ding', .7], [21.3, 'pop', .6], [22.6, 'sparkle', .7], [23.05, 'pop2', .6],
  [23.8, 'whoosh', .6], [23.95, 'clockfast', .5], [24.75, 'ding', .8], [24.82, 'swoosh_up', .6], [25.11, 'pop', .6], [25.85, 'pop2', .6],
  [27.1, 'whoosh', .7], [27.95, 'thud', 1],
  [28.2, 'whoosh', .5], [28.3, 'click', .6], [28.54, 'pop', .7], [28.95, 'pop2', .7], [29.3, 'click', .5], [29.6, 'typing', .6], [30.55, 'burst', 1], [30.6, 'glitch', .7],
  [31.85, 'whoosh', .6], [32.88, 'pop', .7], [33.47, 'swoosh_up', .6], [34.12, 'pop2', .7], [34.55, 'whoosh', .6],
  [35.8, 'paper', .8], [36.06, 'type', .6], [37.27, 'ding', .6], [38.12, 'pop', .7], [38.69, 'error', .7], [39.0, 'pop2', .6],
  [39.95, 'whoosh', .6], [41.0, 'swoosh_up', .5], [42.06, 'boing', .6], [42.48, 'pop', .6], [43.62, 'paper', .7], [43.91, 'tick', .8], [44.91, 'tick', .8], [45.68, 'tick', .8], [46.05, 'error', .6],
  [46.62, 'stamp', 1.1], [47.25, 'whoosh', .6], [48.41, 'squish', .7], [49.4, 'swoosh_up', .5], [50.69, 'click', 1], [50.72, 'sparkle', .5], [51.25, 'ding', .8],
  [52.0, 'whoosh', .5], [52.3, 'pop', .6], [52.84, 'pop2', .6], [53.98, 'error', .8], [54.4, 'pop', .6],
  [55.4, 'whoosh', .5], [56.3, 'pop', .5], [59.62, 'whoosh', .9], [60.5, 'burst', .9], [60.55, 'glitch', .6], [61.12, 'sparkle', .6],
  [62.0, 'whoosh', .6], [62.4, 'typing', .5], [63.25, 'msg_in', .8], [63.85, 'msg_in', .8], [64.5, 'msg_in', .8],
  [65.25, 'whoosh', .5], [66.55, 'whoosh', .5], [67.28, 'thud', 1.4], [67.3, 'stamp', .6], [67.95, 'tada', .8], [68.45, 'pop', .6],
].forEach(s => sfx(s[1], s[0], s[2]));
