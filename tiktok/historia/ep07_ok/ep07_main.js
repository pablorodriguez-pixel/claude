/* Ep. 7 · El Vecino en su óvalo, frame, temblores y efectos */
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
const CX = -41, CY = 45, CS = 0.75;
const OV_VIS = [[5.2, 6.95], [10.38, 43.8], [46.62, 61.4]];
const T_END = 70.85;
function ovalState(t) {
  if (t >= T_END) { const k = pop(t, T_END + 0.05, 0.5); return { x: 335, y: -600, s: 1.12 * k, r: -3 + wobble(t, 0.4, 1.5), o: t < T_END + 0.05 ? 0 : 1 }; }
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[2.44, 3.3], [17.78, 18.45], [29.45, 30.5]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (t > 5.2 && t < 7) { o.look = [0, 0]; o.bL = 6; o.bR = 10; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > 11.7 && t < 12.4) { o.look = [6, -4]; o.bL = 14; o.bR = 14; }
  if (t > 31.5 && t < 32.9) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (t > 33.1 && t < 33.9) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.7); }
  if (t > 46.6 && t < 47.6) { o.bL = 14; o.bR = 18; o.look = [0, 0]; o.fan = Math.sin(t * 20) * 14; }
  if (t > 54.3 && t < 55.0) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.6); }
  if (t > 59.7 && t < 61.2) { o.fan = Math.sin(t * 22) * 18 - 8; }
  if (t >= T_END) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.jaw = 0; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ okOK 1839 ★</span>`).join('') + '<span>👌👍</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
    // la escena saliente se queda debajo 0,25 s mientras entra la siguiente (sin destellos de papel vacío)
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
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
[[0.0, .25, 10], [4.21, .3, 12], [6.42, .35, 14], [28.41, .3, 8], [32.1, .3, 8], [33.15, .3, 8], [37.96, .3, 10], [43.04, .35, 12], [45.05, .45, 18], [46.74, .35, 14], [54.31, .25, 6], [56.83, .3, 10], [62.4, .35, 12], [64.72, .3, 10], [70.35, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
[
  [0.03, 'stamp', 1.0], [2.44, 'pop', .6], [3.88, 'scratch', .6], [4.21, 'stamp', 1.0],
  [5.29, 'pop', .6], [5.45, 'pop2', .6], [5.78, 'pop2', .6], [6.05, 'burst', .8], [6.42, 'stamp', 1.0],
  [7.0, 'whoosh', .6], [7.38, 'pop2', .6], [8.2, 'swoosh_up', .6], [9.68, 'ding', .6],
  [10.3, 'whoosh', .7], [10.42, 'pop', .6], [11.07, 'tick', .4], [11.72, 'emu', .8], [12.22, 'ding', .6], 
  [12.75, 'whoosh', .6], [15.25, 'tick', .6], [16.86, 'tick', .6], [17.8, 'pop', .6], 
  [18.45, 'whoosh', .6], [19.84, 'sparkle', .7], [20.15, 'swoosh_up', .6], [20.95, 'pop', .6],
  [21.7, 'whoosh', .5], [21.76, 'type', .7], [22.33, 'type', .6], 
  [23.83, 'scratch', .8], [24.13, 'scratch', .8], [24.97, 'squish', .7], [25.15, 'ding', .7],
  [26.2, 'whoosh', .6], [26.4, 'typing', .6], [28.41, 'stamp', .9], 
  [29.1, 'whoosh', .6], [29.4, 'pop', .6], [30.71, 'paper', 1.0], [31.4, 'swoosh_up', .5], [32.1, 'thud', .9], [32.34, 'tick', .4], 
  [33.15, 'boing', 1.0], [33.95, 'burst', .7], [34.19, 'tada', .6], [35.34, 'ding', .6],
  [36.45, 'whoosh', .6], [37.96, 'thud', .9], [38.95, 'paper', .7], [39.65, 'sparkle', .6], [40.09, 'sparkle', .6], [40.5, 'ding', .6],
  [41.1, 'whoosh', .6], [42.7, 'drumroll', .5], [43.04, 'stamp', 1.0], 
  [43.8, 'swoosh_up', .7], [44.5, 'ping', .4], [45.05, 'burst', 1.0], [45.63, 'stamp', .8],
  [46.6, 'whoosh', .5], [46.74, 'stamp', 1.0], [48.34, 'pop', .6], [48.66, 'pop', .5], 
  [49.85, 'whoosh', .6], [51.19, 'ding', .6], [53.3, 'paper', .5], [54.31, 'ding', .9], [54.81, 'pop2', .7],
  [55.25, 'whoosh', .6], [55.33, 'scratch', .6], [56.4, 'ding', .7], [56.83, 'stamp', 1.0],
  [57.75, 'whoosh', .6], [58.4, 'msg_in', .6], [59.3, 'msg_in', .5], [60.1, 'ding', .7], 
  [61.4, 'whoosh', .7], [62.4, 'stamp', 1.0], [63.36, 'swoosh_up', .5], [64.06, 'drumroll', .5], [64.72, 'bell', .8],
  [65.3, 'whoosh', .6], [66.4, 'msg_in', .7], [66.95, 'msg_in', .7], [67.5, 'msg_in', .7],
  [68.15, 'whoosh', .5], [69.82, 'whoosh', .5], [70.35, 'thud', 1.4], [71.1, 'tada', .7], [71.55, 'pop', .6], 
].forEach(s => sfx(s[1], s[0], s[2]));
