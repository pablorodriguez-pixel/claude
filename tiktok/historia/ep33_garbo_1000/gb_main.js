/* Ep. 27 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.D2[0], S.D2[1]], [S.E2[0], S.E3[1]], [S.G2[0], S.G3[1]], [S.L1[0], S.M[1]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.fichan + 0.1, K.fichan + 0.8], [K.existia + 0.15, K.existia + 0.75], [K.mismo11 + 0.05, K.mismo11 + 0.7]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.guia - 0.1, K.turismo + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.cuela - 0.1, K.tanto + 0.6)) { o.bL = 12; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.pension - 0.1, K.viuda + 0.6)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.muerte - 0.1, K.muerte + 0.8)) { o.bL = 12; o.bR = 12; o.look = [6, -2]; }
  if (IN(t, K.falsa11 - 0.1, K.el11)) { o.bL = 4; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.cuantas - 0.1, K.tienes + 0.5)) { o.look = [0, 0]; o.bL = 10; o.bR = 4; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑÜ¿¡ «visto» ✓✓ ✗ ✝ ♥ ✦ º 👇 👔 😂 🐱 🕵️ … @juan_pujol_27 CALAIS</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- titulares: nunca dos a la vez (el anterior se va antes de que entre el siguiente) ---------- */
HLS.forEach(h => { const nx = HLS.filter(q => q !== h && q.t0 > h.t0 - 0.001 && q.t0 < h.t1 + 0.3).map(q => q.t0 - 0.04); h.end = Math.min(h.t1, ...nx.filter(x => x > h.t0)); });
/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.end; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.end - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.end; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.end - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.troleo0, .3, 14], [K.v27a + 0.1, .25, 8], [K.visto1, .3, 12], [K.nazis2, .3, 12], [K.lisboa, .25, 8], [K.turismo + 0.05, .25, 8], [K.fichan, .3, 12],
 [K.v27b + 0.75, .35, 16], [K.muere, .25, 8], [K.existia, .35, 16], [K.calais7, .3, 12], [K.traga + 0.5, .25, 8], [K.cruz, .25, 10], [K.medalla, .25, 10],
 [K.troleo10, .4, 22], [K.falsa11, .3, 12], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.hitler0 + 0.05, 'swoosh_up', .5], [K.troleo0, 'stamp', 1.1], [K.v27a, 'sparkle', .6], [K.v27a + 0.1, 'msg_in', .5],
  [S.B1[0], 'whoosh', .5], [K.espiar1, 'pop', .5], [K.ingleses - 0.05, 'swoosh_up', .5],
  [S.B2[0] + 0.02, 'msg_out', .6], [K.dejaron - 0.05, 'msg_out', .6], [K.dejaron + 0.25, 'thud', .6], [K.visto1, 'stamp', 1.0],
  [S.C1[0], 'whoosh', .5], [K.espia2 - 0.05, 'burst', .6], [S.C2[0], 'whoosh', .5], [K.de2 + 0.3, 'sparkle', .4], [K.nazis2, 'stamp', 1.0],
  [S.D1[0], 'paper', .6], [K.lisboa - 0.1, 'boing', .5], [K.lisboa + 0.1, 'pop2', .6],
  [S.D2[0], 'whoosh', .5], [K.inventa, 'typing', .5], [K.guia - 0.1, 'pop', .6], [K.turismo + 0.05, 'stamp', .8],
  [S.E1[0], 'whoosh', .6], [K.cuentas4 - 0.04, 'pop', .6], [K.espias4 - 0.04, 'pop', .6], [K.inventados - 0.04, 'pop', .6], [K.inventados + 0.25, 'ding', .5],
  [S.E2[0], 'whoosh', .5], [S.E2[0] + 0.1, 'paper', .5], [K.cuela, 'heart', .5],
  [S.E3[0], 'whoosh', .5], [K.visto4, 'msg_in', .6], [K.visto4 + 0.35, 'error', .4], [K.fichan, 'stamp', 1.0],
  [S.F[0], 'whoosh', .5], [K.juntos, 'msg_in', .5], [K.llegan, 'msg_in', .5], [K.llegan + 0.42, 'msg_in', .6], [K.v27b + 0.4, 'burst', .6], [K.v27b + 0.75, 'stamp', 1.1],
  [K.red, 'glitch', .4], [T_EMU - 0.1, 'emu', .9], [K.sueldo, 'cash', .7],
  [S.G1[0], 'whoosh', .5], [K.muere, 'sad', .5], [K.muere + 0.2, 'paper', .6], [S.G2[0], 'whoosh', .5], [K.viuda - 0.05, 'thud', .5], [K.viuda + 0.1, 'thud', .4],
  [S.G3[0], 'whoosh', .5], [K.senor, 'pop', .5], [K.existia, 'stamp', 1.1],
  [S.H1[0], 'paper', .6], [K.D, 'pop', .5], [K.pujol7, 'pop2', .5], [K.avisa, 'ping', .5],
  [S.H2[0], 'whoosh', .5], [K.normandia, 'typing', .7], [K.distraccion + 0.3, 'stamp', .8],
  [S.H3[0], 'whoosh', .5], [K.gordo - 0.1, 'swoosh_up', .6], [K.calais7, 'stamp', 1.0],
  [S.I1[0], 'whoosh', .5], [K.traga, 'gulp', 1.0], [K.traga + 0.55, 'ding', .5],
  [S.I2[0], 'paper', .5], [K.tropas, 'pop', .4], [K.calais8 - 0.1, 'clockfast', .5],
  [S.I3[0], 'whoosh', .5], [K.nadie, 'sad', .4],
  [S.J1[0], 'drumroll', .5], [S.J1[0] + 0.05, 'boing', .4], [S.J2[0], 'whoosh', .5], [K.cruz + 0.12, 'thud', .8], [K.cruz + 0.15, 'sparkle', .5], [K.rey - 0.05, 'bell', .6], [K.medalla + 0.12, 'thud', .8], [K.medalla + 0.15, 'tada', .5],
  [S.K1[0], 'whoosh', .5], [K.medallas, 'pop', .5], [K.dos2, 'pop', .4], [K.bandos, 'pop', .4], [K.bandos + 0.2, 'ding', .5],
  [S.K2[0], 'burst', .7], [K.troleo10, 'glitch', .5], [K.troleo10 + 0.35, 'stamp', 1.2],
  [S.L1[0], 'whoosh', .6], [K.muerte, 'sad', .5], [K.falsa11, 'stamp', 1.0], [K.el11 + 0.05, 'sparkle', .6], [K.mismo11, 'pop2', .5],
  [S.M[0], 'whoosh', .6], [K.y12, 'click', .5], [K.tu12, 'click', .5], [K.cuantas, 'click', .5], [K.cuentas12, 'click', .5], [K.tienes, 'pop2', .5], [K.os, 'ding', .7],
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
