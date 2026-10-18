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
const OV_VIS = [[S.B2[0], S.B2[1]], [S.Q[0], S.N3[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  set(ovalW, { x: st.x, y: st.y + wobble(t, 0.5, 2), s: st.s, r: st.r, o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.sexta1 - 0.1, K.sexta1 + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.siesta3 - 0.1, K.siesta3 + 0.8)) { o.bL = 12; o.bR = 12; o.look = [0, -4]; }
  vecFace(vecO, t, o);
}

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
  updSteps(t); updTitle(t);
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.numero0 + 0.3, .3, 12], [K.sexta1, .25, 8], [K.siesta3, .25, 8], [S.P1a[0] + 0.12, .3, 12], [K.no4 + 0.15, .3, 12], [K.primera, .2, 6], [K.segunda, .2, 6], [K.tercera, .2, 6],
 [S.P2a[0] + 0.12, .3, 12], [K.seis, .25, 8], [K.doce5 + 0.02, .4, 18], [S.P3a[0] + 0.12, .3, 12], [K.calor, .25, 8], [K.acabo + 0.3, .3, 10],
 [K.latin1 + 0.05, .3, 12], [K.ojo, .3, 12], [K.sexta7, .25, 10], [K.terminaba, .3, 12], [K.tres8, .3, 12], [K.decima + 0.02, .4, 18], [K.tarde + 0.02, .4, 18], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.numero0 - 0.05, 'swoosh_up', .5], [K.numero0 + 0.3, 'boing', .7],
  [S.A2[0] + 0.03, 'whoosh', .5], [K.casi0, 'pop', .4], [K.todos0, 'pop', .4], [K.dias0 + 0.05, 'pop2', .5],
  [S.B1[0] + 0.05, 'paper', .7], [K.latin1, 'pop', .4], [K.sexta1, 'pop2', .6], [K.latin1 + 0.05, 'stamp', 1.0],
  [S.B2[0] + 0.03, 'whoosh', .5], [S.B2[0] + 0.1, 'ding', .6],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6],
  [S.Q[0] + 0.03, 'whoosh', .6], [K.siendo3, 'swoosh_up', .4], [K.siesta3 - 0.05, 'pop2', .6],
  [S.N3[0] + 0.03, 'whoosh', .5], [K.tres3 - 0.15, 'pop', .5], [K.tres3, 'pop', .5], [K.tres3 + 0.16, 'pop2', .6],
  [S.P1a[0] + 0.1, 'thud', .8], [K.romanos4 - 0.15, 'pop', .5], [S.P1b[0] + 0.02, 'whoosh', .5], [K.no4 + 0.15, 'error', .6],
  [S.P1c[0] + 0.03, 'whoosh', .5], [K.salia - 0.2, 'sparkle', .5], [S.P1d[0] + 0.03, 'whoosh', .5], [K.primera, 'ding', .6], [K.segunda, 'ding', .6], [K.tercera, 'ding', .6],
  [S.P2a[0] + 0.1, 'thud', .8], [K.sol5 - 0.2, 'sparkle', .5], [S.P2b[0] + 0.02, 'whoosh', .5], [K.seis, 'pop', .5],
  ...[1, 2, 3, 4, 5].map(i => [P2_T0 + i * P2_STEP - 0.05, 'tick', .7]), [S.P2c[0] + 0.03, 'bell', .8], [K.doce5 + 0.02, 'stamp', 1.1],
  [S.P3a[0] + 0.1, 'thud', .8], [K.calor, 'boing', .5], [S.P3b[0] + 0.02, 'whoosh', .5], [K.comer, 'gulp', .6], [T_EMU - 0.1, 'emu', .9], [K.descansar6, 'pop', .4],
  [S.P3c[0] + 0.03, 'whoosh', .5], [K.sexta6, 'ding', .6], [S.P3d[0] + 0.03, 'whoosh', .5], [K.acabo + 0.05, 'swoosh_up', .5], [K.acabo + 0.5, 'tada', .6],
  [S.O1[0] + 0.03, 'whoosh', .5], [K.ojo, 'stamp', 1.0], [K.primera7, 'ding', .6], [K.siete7, 'tick', .6],
  [S.O2[0] + 0.03, 'whoosh', .5], ...[0, 1, 2, 3, 4].map(i => [lerp(S.O2[0] + 0.15, K.sexta7 - 0.25, i / 4), 'tick', .6]), [K.sexta7 - 0.05, 'ding', .7], [K.terminaba + 0.02, 'stamp', 1.0],
  [S.R1[0] + 0.03, 'whoosh', .6], [K.echas8 - 0.1, 'clockfast', .45], [K.tres8 - 0.02, 'stamp', .9],
  [S.R1b[0] + 0.03, 'whoosh', .5], [K.sexta8, 'pop', .5], [K.no8, 'error', .5], [K.decima - 0.4, 'clockfast', .4], [K.decima + 0.02, 'stamp', 1.2],
  [S.R2[0] + 0.03, 'whoosh', .5], [K.tarde + 0.02, 'stamp', 1.2],
  [S.T[0] + 0.03, 'whoosh', .5], [K.echas13, 'pop', .4], [K.tu13, 'pop', .5], [K.os, 'ding', .7],
  [S.BK[0] + 0.03, 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
].filter(s => s[2] > 0).forEach(s => sfx(s[1], s[0], s[2]));

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
