/* =================== EL VECINO en su marco ovalado (adaptado de globals_v2) =================== */
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
  [0, CX, CY, 0.4, 0, 0], [4.4, CX, CY, 0.4, 0, 0], [4.41, CX, CY, 0.4, 0, 1], [4.75, CX, CY, CS, 0, 1], [7.27, CX, CY, CS, 0, 1], [7.28, CX, CY, CS, 0, 0],
  [32.56, CX, CY, 0.4, 0, 0], [32.57, 335, -330, 0.4, 0, 1], [32.9, 335, -330, 1.22, -3, 1], [33.7, 335, -330, 1.22, -3, 1], [34.05, CX, CY, CS, 0, 1],
  [62.09, CX, CY, CS, 0, 1], [62.1, CX, CY, CS, 0, 0],
  [75.0, CX, CY, CS, 0, 0], [75.01, 335, -640, 0.4, 0, 1], [75.4, 335, -640, 1.0, 0, 1],
];
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[40.05, 41.1]];
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  ovalW.style.zIndex = t > 75 ? 880 : 850;
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [0, 0], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 4.4 && t < 7.3) { o.look = [5, -2]; }
  if (t > 6.4 && t < 7.2) { o.bL = 10; o.bR = 12; }
  if (t > 32.56 && t < 33.8) { o.bL = 14; o.bR = 14; o.fan = Math.sin(t * 24) * 18 - 8; }
  if (t > 33.8 && t < 40) { o.look = [5, -3]; }
  if (t > 36.8 && t < 37.6) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 12; o.bR = 12; }
  if (t > 43.9 && t < 44.9) { o.bL = 12; o.bR = 16; o.look = [5, -2]; }
  if (t > 47.2 && t < 54) { o.look = [5, -3]; }
  if (t > 54.25 && t < 55.4) { o.bL = 16; o.bR = 16; o.look = [0, 0]; o.fan = Math.sin(t * 24) * 16 - 8; }
  if (t > 55.4 && t < 62) { o.look = [5, -4]; }
  if (t > 60.9 && t < 61.9) { o.bL = 6; o.bR = 14; }
  if (t > 75.0) { o.jaw = 0; o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.closed = false; }
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
[[6.45, .35, 12], [26.5, .35, 14], [40.02, .35, 12], [44.4, .3, 8], [54.3, .35, 12], [67.62, .3, 10], [74.43, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.0, 'whoosh', .5], [1.86, 'swoosh_up', .6], [2.0, 'pop', .8], [3.42, 'whoosh', .5], [3.62, 'pop2', .6],
  [4.32, 'whoosh', .5], [4.65, 'thud', .7], [4.98, 'thud', .7], [5.33, 'thud', .7], [6.45, 'stamp', 1],
  [7.28, 'whoosh', .6], [7.8, 'pop2', .7], [8.65, 'swoosh_up', .6], [9.87, 'ding', .6],
  [10.42, 'paper', .8], [10.89, 'pop', .8], [11.05, 'whoosh', .5], [12.02, 'emu', .7], [13.05, 'tick', .5], [13.5, 'tick', .5], [13.95, 'tick', .5], [14.35, 'ding', .5],
  [15.65, 'whoosh', .5], [15.9, 'pop', .8], [17.05, 'pop2', .6], [18.45, 'drumroll', .6], [20.42, 'ding', .9],
  [21.55, 'whoosh', .5], [22.93, 'pop', .8], [23.76, 'pop2', .6], [23.97, 'swoosh_up', .5], [25.47, 'ding', .8], [25.65, 'whoosh', .4],
  [26.5, 'burst', 1], [26.8, 'glitch', .6],
  [27.75, 'whoosh', .6], [28.22, 'pop', .6], [29.92, 'sparkle', .7], [31.22, 'swoosh_up', .5], [31.86, 'click', 1], [31.95, 'pop2', .6],
  [32.57, 'whoosh', .6], [33.34, 'sparkle', .6], [33.8, 'swoosh_up', .6], [34.22, 'pop2', .5], [35.88, 'whoosh', .5], [35.92, 'stamp', .7], [36.82, 'boing', .9], [37.85, 'pop', .6], [38.84, 'pop2', .6],
  [40.02, 'burst', 1], [40.06, 'glitch', .6],
  [41.25, 'whoosh', .6], [41.33, 'pop', .7], [43.96, 'pop2', .6], [44.4, 'stamp', .9], [44.95, 'whoosh', .6], [45.62, 'sparkle', .8], [46.38, 'swoosh_up', .6], [46.92, 'pop', .6],
  [47.25, 'whoosh', .5], [47.35, 'pop', .4], [47.89, 'pop', .4], [48.43, 'pop', .4], [48.98, 'pop2', .6], [49.25, 'pop', .5], [49.84, 'pop2', .5], [49.97, 'tick', .5], [50.37, 'tick', .5], [50.77, 'tick', .5], [51.02, 'ding', .8], [52.35, 'pop', .6], [53.3, 'ding', .5], [53.55, 'pop2', .5],
  [54.15, 'whoosh', .6], [54.3, 'stamp', 1], [55.4, 'boing', .5], [56.7, 'pop2', .6], [58.9, 'boing', .7], [61.0, 'ding', .9], [61.27, 'pop', .5],
  [62.1, 'whoosh', .6], [62.35, 'swoosh_up', .5], [63.64, 'click', 1], [64.8, 'pop', .6], [66.02, 'whoosh', .5], [66.62, 'pop2', .5], [67.62, 'stamp', .9],
  [68.45, 'whoosh', .6], [70.0, 'burst', .6], [70.3, 'msg_in', .8], [70.85, 'msg_in', .8], [71.4, 'msg_in', .8],
  [72.3, 'whoosh', .5], [73.7, 'whoosh', .5], [74.43, 'thud', 1.3],
  [75.0, 'swoosh_up', .5], [75.25, 'pop', .6], [75.9, 'pop2', .5], [76.45, 'sparkle', .6],
].forEach(s => sfx(s[1], s[0], s[2]));
