/* =================== frame =================== */
const SHAKES8 = [[T(7.95), .4, 16], [Y2003, .3, 12], [T(30.55), .35, 12], [T(46.66), .35, 14], [T(60.5), .35, 10], [T(53.98), .3, 8], [T(38.69), .3, 8], [K.libro + 0.25, .5, 22]];
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
/* ---------- efectos de sonido (clavados por texto vía T()/K) ---------- */
[
  [T(0.05), 'swoosh_up', .6], [T(0.5), 'pop', .7], [T(1.43), 'ding', .6], [T(2.9), 'whoosh', .5], [T(3.45), 'swoosh_up', .5], [T(3.9), 'boing', .7], [T(5.38), 'paper', .7], [T(5.5), 'pop2', .6], [T(6.15), 'squish', .5], [T(7.88), 'scratch', .9], [T(7.95), 'stamp', 1.1], [T(11.9), 'whoosh', .6], [T(12.0), 'pop', .6], [T(12.7), 'swoosh_up', .5], [T(13.0), 'clockfast', .4], [T(13.95), 'cash', .7], [T(15.0), 'pop2', .5], [T(15.38), 'whoosh', .6], [T(15.9), 'pop', .6], [T(17.6), 'emu', .9], [T(17.68), 'swoosh_up', .5], [T(18.36), 'pop', .8], [T(19.4), 'whoosh', .5], [T(19.63), 'pop2', .6], [T(20.46), 'ding', .7], [T(21.3), 'pop', .6], [T(22.6), 'sparkle', .7], [T(23.05), 'pop2', .6], [T(23.8), 'whoosh', .6], [Y2003, 'stamp', 1.0], [T(24.75), 'ding', .8], [T(24.82), 'swoosh_up', .6], [T(25.11), 'pop', .6], [T(25.85), 'pop2', .6], [T(27.1), 'whoosh', .7], [T(27.95), 'thud', 1], [T(28.2), 'whoosh', .5], [T(28.3), 'click', .6], [T(28.54), 'pop', .7], [T(28.95), 'pop2', .7], [T(29.3), 'click', .5], [T(29.6), 'typing', .6], [T(30.55), 'burst', 1], [T(30.6), 'glitch', .7], [T(31.85), 'whoosh', .6], [T(32.88), 'pop', .7], [T(33.47), 'swoosh_up', .6], [T(34.12), 'pop2', .7], [T(34.55), 'whoosh', .6], [T(35.8), 'paper', .8], [T(36.06), 'type', .6], [T(37.27), 'ding', .6], [T(38.12), 'pop', .7], [T(38.69), 'error', .7], [T(39.0), 'pop2', .6], [T(39.95), 'whoosh', .6], [T(41.0), 'swoosh_up', .5], [T(42.06), 'boing', .6], [T(42.48), 'pop', .6], [T(43.62), 'paper', .7], [T(43.91), 'tick', .8], [T(44.91), 'tick', .8], [T(45.68), 'tick', .8], [T(46.05), 'error', .6], [T(46.62), 'stamp', 1.1], [T(47.25), 'whoosh', .6], [T(48.41), 'squish', .7], [T(49.4), 'swoosh_up', .5], [T(50.69), 'click', 1], [T(50.72), 'sparkle', .5], [T(51.25), 'ding', .8], [T(52.0), 'whoosh', .5], [T(52.3), 'pop', .6], [T(52.84), 'pop2', .6], [T(53.98), 'error', .8], [T(54.4), 'pop', .6], [T(55.4), 'whoosh', .5], [T(56.3), 'pop', .5], [T(59.62), 'whoosh', .9], [T(60.5), 'burst', .9], [T(60.55), 'glitch', .6], [T(61.12), 'sparkle', .6],
  // pregunta SÍ/NO + firma + libro + bucle
  [K.te - 0.08, 'whoosh', .6], [K.te + 0.05, 'pop', .7], [K.te + 0.17, 'pop', .6], [K.creias + 0.2, 'msg_in', .6], [K.si + 0.3, 'click', .9], [K.si + 0.4, 'msg_in', .6], [K.noB + 0.1, 'pop2', .5],
  [K.soy - 0.1, 'whoosh', .6], [K.soy + 0.05, 'swoosh_up', .6], [K.vecino, 'pop', .6], [K.y - 0.12, 'whoosh', .6], [K.noV, 'stamp', .7], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
