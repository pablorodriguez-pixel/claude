/* =================== óvalo del Vecino: visibilidad + expresiones =================== */
/* (tiempos v1 → voz nueva con NT; lo de tramos borrados se descarta) */
const OVW = [[13.85, 33.2], [35.75, 40.15], [41.6, 71.59]].map(q => q.map(NT));
const SCAND = [38.36, 46.84, 63.99].map(NT);
const LAUGH = [[45.05, 45.75], [61.55, 62.25]].map(q => q.map(NT));
const T_S3 = NT(16), T_S3b = NT(20.8), T_bl = NT(20.25), T_bl2 = NT(20.9);
function updOval(t) {
  const win = OVW.find(w => t >= w[0] && t < w[1]);
  if (!win) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  {
    const k = pop(t, win[0], 0.35);
    set(ovalW, { x: inL ? Math.sin(t * 40) * 4 : 0, y: wobble(t, 0.5, 2), s: lerp(0.3, 0.8, k), r: inL ? Math.sin(t * 20) * 2 : 0, o: 1 });
  }
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t > T_S3 && t < T_S3b) o.look = [6, -1];
  if (t > T_bl && t < T_bl2) { o.bL = 12; o.bR = 12; }
  if (SCAND.some(f => t > f - 0.1 && t < f + 0.9)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; o.jaw = Math.max(o.jaw, 0.5); }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* =================== frame =================== */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic), kout = p(t, s.t1 - 0.12, 0.12, E.inCubic); set(s.c, { x: (1 - kin) * 160 * s.dir - kout * 150, o: Math.min(clamp(kin * 1.8), 1 - kout) }); }
    if (s.fn) s.fn(s.seg ? OTs(s.seg, t) : t);
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
[[9.93, .4, 16], [20.25, .3, 8], [33.2, .3, 10], [35.18, .4, 14], [39.6, .35, 10], [40.96, .35, 12], [44.55, .3, 8], [57.54, .35, 12], [64.2, .3, 8], [70.19, .3, 10], [72.43, .5, 20]].forEach(s => { const n = NT(s[0]); if (n != null && n < CUT_C) shakeAt(n, s[1], s[2]); });
[[K.si + 0.3, .3, 10], [K.libro + 0.15, .35, 10]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
[
  [0.12, 'swoosh_up', .5], [0.2, 'pop', .6], [0.6, 'pop2', .6], [2.72, 'whoosh', .5], [3.43, 'ding', .7], [4.37, 'swoosh_up', .6], [4.42, 'stamp', .9],
  [6.0, 'whoosh', .6], [6.3, 'thud', .8], [6.62, 'boing', .4], [7.0, 'pop', .6], [8.44, 'error', .6], [8.6, 'paper', .6], [9.93, 'stamp', 1.1],
  [13.9, 'whoosh', .5], [14.19, 'pop', .7], [15.98, 'swoosh_up', .6], [16.64, 'pop2', .6], [17.38, 'pop', .6], [18.64, 'sparkle', .6], [19.8, 'pop2', .6], [20.08, 'whoosh', .5], [20.25, 'thud', .7], [20.32, 'ding', .7],
  [20.85, 'whoosh', .5], [20.97, 'pop', .7], [22.15, 'swoosh_up', .5], [22.63, 'paper', .6], [23.33, 'tick', .6], [23.47, 'tick', .6], [24.41, 'sparkle', .7],
  [25.59, 'whoosh', .6], [25.6, 'pop', .6], [25.75, 'pop2', .6], [27.06, 'boing', .7],
  [28.0, 'paper', .7], [28.13, 'swoosh_up', .5], [29.02, 'pop', .7], [30.22, 'swoosh_up', .5], [31.19, 'ding', .7], [31.83, 'whoosh', .5], [32.59, 'pop2', .6],
  [33.2, 'burst', .9], [34.03, 'pop', .5], [34.806, 'stamp', 1.0], [35.18, 'glitch', .7], [35.22, 'thud', 1.0],
  [35.75, 'whoosh', .6], [35.9, 'paper', .6], [36.54, 'click', .5], [38.36, 'pop', .7], [38.67, 'pop', .7], [39.53, 'pop2', .8], [39.6, 'stamp', 1.0],
  [40.15, 'burst', .9], [40.96, 'tada', .8],
  [41.6, 'whoosh', .6], [42.43, 'swoosh_up', .7], [44.14, 'pop', .7], [44.55, 'stamp', .9], [44.98, 'emu', .9], [45.65, 'scratch', .7], [45.9, 'swoosh_up', .5],
  [46.71, 'tick', .7], [47.07, 'tick', .7], [47.43, 'tick', .7], [47.79, 'tick', .7], [48.15, 'tick', .7], [48.25, 'sad', .7], [48.6, 'whoosh', .5],
  [57.45, 'whoosh', .5], [57.54, 'stamp', 1.1], [57.62, 'swoosh_up', .6], [58.96, 'bell', .7], [59.92, 'whoosh', .6], [61.5, 'burst', .6], [61.55, 'pop', .6], [62.35, 'paper', .6], [63.99, 'scratch', .7], [64.2, 'stamp', .9],
  [65.05, 'whoosh', .5], [65.85, 'whoosh', .6], [66.0, 'pop', .5], [67.69, 'ding', .8], [69.14, 'whoosh', .6], [70.19, 'error', .7],
  [71.59, 'burst', .9], [72.27, 'swoosh_up', .6], [72.43, 'glitch', .7], [72.47, 'sparkle', .8],
].forEach(s => { const n = NT(s[0]); if (n != null && n < CUT_C) sfx(s[1], n, s[2]); });
/* ---------- efectos de las escenas nuevas ---------- */
[
  [CUT_C, 'whoosh', .6], [CUT_C + 0.2, 'pop', .7], [CUT_C + 0.32, 'pop', .6], [K.te + 0.35, 'msg_in', .7], [K.asi + 0.1, 'msg_in', .7], [K.si + 0.3, 'click', .9], [K.noB + 0.25, 'pop2', .5],
  [S_BAL[0], 'whoosh', .7], [K.soy + 0.05, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S_BOOK[0], 'whoosh', .5], [K.libro + 0.2, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
