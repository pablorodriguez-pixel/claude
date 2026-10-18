/* Ep. 32 · El Vecino en su óvalo, precarga, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.C[0], S.D2[0]], [S.G1[0], S.G3[0]], [S.O1[0], S.P[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.adelantando + 0.3, K.loque - 0.1]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.rae - 0.1, K.rae + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.amanecer - 0.1, K.amanecer + 0.8)) { o.bL = 10; o.bR = 10; o.look = [0, -4]; }
  if (IN(t, K.nun6 - 0.1, K.nun6 + 0.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.nona6 - 0.1, K.nona6 + 0.6)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.monjes - 0.1, K.monjes + 0.8)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.nona8 - 0.1, K.nona8 + 0.8)) { o.bL = 4; o.bR = 14; o.look = [-4, 2]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- rótulo «y no es lo más raro…» (sale al acabar L2 y cruza el corte a los romanos) ---------- */
const RARO = chip(world, 300, 410, 'y no es lo más raro…', { size: 50, bg: PINK, z: 600 });
const RARO_T = [K.rae + 0.4, K.romanos + 1.3];

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ SIESTA SEXTA NONA NOON ≈ 15:00 12:00 VI IX ↑ ↺ → ✦ 👇 …</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
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
  { const vis = t >= RARO_T[0] && t < RARO_T[1]; RARO.style.display = vis ? '' : 'none'; if (vis) { const k = pop(t, RARO_T[0], 0.4); set(RARO, { s: k, r: -3 + wobble(t, 0.6, 1.5), o: 1 - p(t, RARO_T[1] - 0.15, 0.15) }); } }
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.numero0 + 0.3, .3, 12], [K.minutos + 0.25, .25, 8], [K.rae, .35, 14], [K.seis, .25, 8], [K.mediodia4 + 0.05, .35, 16], [K.siesta5, .3, 10], [K.bueno, .3, 12],
 [K.nun6 + 0.2, .3, 10], [K.novena + 0.05, .3, 10], [K.tres7, .35, 16], [K.ojo, .3, 12], [K.hambre, .25, 8], [K.tres10, .25, 8], [K.doce11, .25, 8], [K.doce11 + 0.15, .3, 12],
 [K.cambiaron + 0.3, .35, 16], [K.siesta12, .4, 20], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.numero0 - 0.05, 'swoosh_up', .5], [K.numero0 + 0.3, 'boing', .7], [K.duermes0, 'squish', .4],
  [S.B1[0] + 0.03, 'tick', .6], [K.minutos + 0.25, 'error', .6], [S.B2[0], 'pop', .5], [K.ojala + 0.05, 'click', .5],
  [S.C[0] + 0.05, 'paper', .7], [K.sexta2, 'pop2', .6], [K.hora2, 'pop', .4], [K.rae, 'stamp', 1.1], [RARO_T[0], 'pop', .5],
  [S.D1[0] + 0.03, 'whoosh', .5], [K.amanecer, 'sparkle', .5], [S.D2[0], 'whoosh', .5], [K.primera, 'ding', .6], [K.segunda, 'ding', .6],
  [S.E1[0], 'swoosh_up', .5], [K.seis, 'stamp', .7], [S.E2[0], 'whoosh', .5], [K.sexta4, 'clockfast', .4], [K.mediodia4 + 0.05, 'stamp', 1.1],
  [S.F1[0], 'whoosh', .5], [K.descansar + 0.1, 'gulp', .3], [S.F2[0], 'whoosh', .5], [K.siesta5 - 0.3, 'swoosh_up', .5], [K.siesta5 + 0.1, 'tada', .6],
  [S.G0[0], 'burst', .7], [K.bueno, 'glitch', .4], [S.G1[0], 'whoosh', .6], [K.ingles, 'pop', .4], [K.nun6 - 0.05, 'swoosh_up', .5], [K.nun6 + 0.2, 'thud', .7], [K.nun6 + 0.25, 'bell', .6],
  [K.nona6 - 0.1, 'cloth_whoosh', .6], [S.G3[0], 'whoosh', .5], [K.novena + 0.05, 'stamp', .9],
  [S.H1[0], 'clockfast', .45], [S.H2[0], 'whoosh', .5], [K.tres7, 'bell', .8], [K.tres7 + 0.03, 'stamp', 1.0],
  [K.ojo, 'stamp', 1.0], [K.parece, 'pop', .4], [K.monjes, 'pop2', .5], [S.O2[0], 'whoosh', .5], [K.ayunaban + 0.3, 'squish', .7], [K.nona8, 'pop', .6],
  [S.O3[0], 'whoosh', .5], [K.fueron, 'clockfast', .5], [K.adelantando + 0.4, 'stamp', .8],
  [S.P[0], 'whoosh', .5], [K.hace, 'gulp', .7], [T_EMU - 0.1, 'emu', .9],
  [S.Q[0], 'whoosh', .6], [K.doce10, 'pop', .5], [K.y10, 'clockfast', .4], [K.tres10, 'ding', .6], [K.y11 - 0.15, 'swoosh_up', .4], [K.tres11, 'pop', .5], [K.y11b, 'clockfast', .4], [K.doce11, 'ding', .6], [K.doce11 + 0.15, 'burst', .6],
  [S.R1[0], 'whoosh', .6], [K.cambiaron + 0.05, 'boing', .6], [K.cambiaron + 0.5, 'thud', .7],
  [S.R2[0], 'whoosh', .5], [K.llega, 'swoosh_up', .4], [K.tarde12, 'pop2', .5], [S.R3[0] + 0.2, 'boing', .6], [K.siesta12 + 0.02, 'stamp', 1.2],
  [S.T[0], 'whoosh', .5], [K.echas13, 'pop', .4], [K.tu13, 'pop', .5], [K.os, 'ding', .7],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
