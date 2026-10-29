/* =================== estado del óvalo de la Vecina =================== */
// [t, x, y, s, r, o]  (x,y desplazamiento respecto a su sitio)
const CX = -41, CY = 45; // compacto anclado abajo-izquierda
const OVK = [
  [0, -150, 200, 1.0, 12, 1], [0.45, -46, 70, 1.05, 5, 1], [4.7, -46, 70, 1.05, 5, 1], [5.05, 0, 0, 1, 0, 1],
  [7.4, 0, 0, 1, 0, 1], [7.55, 40, -40, 1.12, -3, 1], [8.3, 40, -40, 1.12, -3, 1], [8.4, 40, -40, 1.12, -3, 0],
  [12.05, 0, 0, 1, 0, 0], [12.06, 0, 0, 0.6, 0, 1], [12.4, 0, 0, 1, 0, 1],
  [25.7, 0, 0, 1, 0, 1], [25.95, 90, -170, 1.38, -4, 1], [27.05, 90, -170, 1.38, -4, 1], [27.3, 0, 0, 1, 0, 1],
  [28.78, 0, 0, 1, 0, 1], [28.79, 0, 0, 1, 0, 0], [31.3, 0, 0, 1, 0, 0], [31.31, 0, 0, 0.6, 0, 1], [31.6, 0, 0, 1, 0, 1],
  [35.6, 0, 0, 1, 0, 1], [35.9, 0, -60, 1.1, -3, 1], [37.0, 0, -60, 1.1, -3, 1], [37.4, CX, CY, 0.75, 0, 1],
  [51.6, CX, CY, 0.75, 0, 1], [51.75, 20, -30, 1.08, -3, 1], [52.9, 20, -30, 1.08, -3, 1], [53.2, CX, CY, 0.75, 0, 1],
  [62.55, CX, CY, 0.75, 0, 1], [62.9, 0, 0, 1, 0, 1],
  [72.24, 0, 0, 1, 0, 1], [72.25, 0, 0, 1, 0, 0], [72.94, 0, 0, 1, 0, 0], [72.95, 0, 0, 0.6, 0, 1], [73.2, 70, -150, 1.32, 3, 1], [75.0, 70, -150, 1.32, 3, 1], [75.24, 70, -150, 1.32, 3, 0],
  [80.76, 0, 0, 1, 0, 0], [80.77, 0, 0, 0.6, 0, 1], [81.05, 0, 0, 1, 0, 1],
  [93.7, 0, 0, 1, 0, 1], [93.71, 0, 0, 1, 0, 0], [98.7, 0, 0, 1, 0, 0], [98.71, 335, -600, 0.4, 0, 1], [99.2, 335, -600, 1.12, -3, 1],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[7.45, 8.4], [51.66, 53.0], [91.0, 91.8]];
function updOval(t, lookOn) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: lookOn ? 0 : st[5] });
  if (st[5] === 0 || lookOn) return;
  // expresiones
  const o = { jaw: talkW(t, 'VECINA'), look: [0, 0], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t < 4.75) { o.look = t < 1.9 ? [-5, 0] : [0, 0]; o.bL = 6; o.bR = 12; o.half = t < 1.9; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 14.45 && t < 18.85) { o.look = [-2, 2]; }
  if (t > 18.9 && t < 22.2) { o.bL = 12; o.bR = 12; o.fan = 0; o.look = [4, -2]; }
  if (t > 22.2 && t < 25.7) { o.look = [5, 0]; o.bL = 4; o.bR = 8; o.fan = Math.sin(t * 10) * 8; }
  if (t > 25.72 && t < 27.2) { o.jaw = Math.max(o.jaw, 0.9); o.bL = 16; o.bR = 16; o.fan = Math.sin(t * 26) * 22 - 10; }
  if (t > 35.62 && t < 37.3) { o.cup = t < 36.98 ? 0.55 * p(t, 35.7, 0.35) : 1; o.bR = 10 * (Math.sin(t * 12) > 0 ? 1 : 0); o.look = [3, -2]; if (t > 36.98) o.jaw = 0; }
  if (t > 37.3 && t < 62.6) { o.look = [5, -2]; }
  if (FAILS.some(f => t > f - 0.15 && t < f + 0.45)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; o.jaw = Math.max(o.jaw, 0.6); }
  if (t > 73.15 && t < 75.3) { o.he = true; o.noFan = false; o.fan = -6; }
  if (t > 80.8 && t < 81.3) { o.bL = 14; o.bR = 14; }
  if (t > 99) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; }
  vecFace(vecO, t, o);
  set(vecO.d, { r: (t > 14.45 && t < 18.85) ? Math.sin(t * 5) * 3 : 0, y: (t > 14.45 && t < 18.85) ? Math.abs(Math.sin(t * 5)) * 6 : 0 });
}

/* =================== humillómetro =================== */
function updMeter(t, lookOn) {
  const on = t > 37.45 && t < 72.95 && !(t > 64.7 && t < 72.25) && !lookOn && !(t > 51.64 && t < 52.48) && !(t > 71.45 && t < 72.25);
  meterW.style.visibility = on ? 'visible' : 'hidden';
  let lvl = 0, kLast = 0, fi = -1; FAILS.forEach((f, i) => { if (t >= f) { lvl = i + 1; fi = i; } });
  const yOf = i => HUM_LV[i].y;
  const prevY = lvl > 0 ? yOf(lvl - 1) : yOf(0), curY = yOf(lvl);
  const kk = lvl > 0 ? E.outElastic(clamp((t - FAILS[lvl - 1]) / 0.8)) : 1;
  const ly = lvl > 0 ? lerp(prevY, curY, kk) : yOf(0) + 30 * (1 - p(t, 37.6, 0.6));
  mLiq.setAttribute('y', f1(ly)); mLiq.setAttribute('height', f1(820 - ly)); mLiq2.setAttribute('y', f1(ly + 6)); mLiq2.setAttribute('height', f1(800 - ly));
  mPtr.setAttribute('transform', `translate(0 ${f1(ly)})`);
  mHL.forEach((h, i) => h.style.opacity = i === lvl ? 1 : 0);
  const fb = fi >= 0 ? FAILS[fi] : -9;
  mBell.setAttribute('transform', t > fb && t < fb + 0.6 ? `rotate(${f1(Math.sin((t - fb) * 50) * 18 * (1 - (t - fb) / 0.6))} 70 108)` : '');
  const kin = p(t, 37.5, 0.45, E.outBack);
  const big = p(t, 72.25, 0.25, E.outBack) * (1 - p(t, 72.85, 0.1));
  const bump = 1 + 0.16 * (t > fb && fb < 72 ? 1 - p(t, fb, 0.45, E.outCubic) : 0);
  set(meterW, { x: (1 - kin) * 420 + big * -282 + shake(t, fb, 0.5, 10), y: big * 70, s: bump * lerp(1, 1.5, big), r: (1 - kin) * 10 + (t > fb && t < fb + 0.5 ? Math.sin(t * 50) * 2 : 0) });
  lvLbl.forEach((e, i) => { const t0 = FAILS[i]; const vis = t >= t0 && t < t0 + 0.42 && !lookOn; const k = p(t, t0, 0.18); set(e, { s: vis ? lerp(2.2, 1, k) : 0, r: -8, o: vis ? 1 : 0 }); });
  const bOn = t >= 72.3 && t < 72.95;
  meterBoom.style.visibility = bOn ? 'visible' : 'hidden';
  if (bOn) set(mbRays, { r: t * 40, s: p(t, 72.3, 0.3, E.outBack) });
  stampA(mbStamp, t, 72.48, -8); if (!bOn) mbStamp.style.visibility = 'hidden';
  meterW.style.zIndex = 720;
}

/* =================== frame =================== */
window.frame = t => {
  const lookOn = updLook(t);
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
  updOval(t, lookOn);
  updMeter(t, lookOn);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
