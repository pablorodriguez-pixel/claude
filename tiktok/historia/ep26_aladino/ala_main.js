/* Ep. 26 · El Vecino en su óvalo, chip ESPECIAL 1.000, frame, temblores, efectos y bucle */
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
// el óvalo solo donde la esquina inferior izquierda está libre
const OV_VIS = [[S.B[0], S.D[0]], [S.H[0], S.J[0]], [S.L[0], S.M[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin };
  }
  return null;
}
const LAUGH = [[K.chino + 0.1, K.chino + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: inL ? Math.sin(t * 20) * 2 : 0, o: 1 });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.no1 - 0.1, K.no1 + 0.7)) { o.bL = 12; o.bR = 12; o.look = [0, 0]; }
  if (IN(t, K.quien - 0.05, K.colo1 + 0.5)) { o.bL = 4; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.dos4, K.dos4 + 0.8)) { o.bL = 14; o.bR = 14; o.look = [6, -6]; }
  if (IN(t, K.setecientas - 0.05, K.setecientas + 0.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.hanna5, K.hanna5 + 0.8)) { o.bL = 6; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.china, K.china + 0.7)) { o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}
/* chip «ESPECIAL 1.000» discreto, desde el fotograma 0 */
const spChip = el('div', world, { left: '56px', top: '178px', zIndex: 860, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '28px', color: YEL, background: INK, padding: '5px 16px 7px', borderRadius: '100px', border: `3px solid ${YEL}`, whiteSpace: 'nowrap', letterSpacing: '0.03em' }, '★ ESPECIAL 1.000');

/* ---------- precarga de fuentes (invisible y fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «Chine» 1.001 1709 ✔ ★ ✦ 👇 …</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
  updOval(t);
  spChip.style.visibility = t < S.BAL[0] ? 'visible' : 'hidden';
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
// cortes secos: portada, golpes de color, balcón y libro
SC.filter(s => [S.A[0], S.B[0], S.BK[0], S.L[0], S.M[0], S.O[0]].includes(s.t0)).forEach(s => s.cut = true);

/* ---------- temblores ---------- */
[[K.colaron, .35, 16], [K.no1 + 0.18, .3, 12], [K.noche2, .35, 14], [K.mate, .35, 16], [K.cuatro, .3, 12], [K.exitazo + 0.02, .4, 18],
 [K.dos4, .35, 16], [K.dos4e + 0.05, .4, 20], [K.setecientas, .3, 12], [K.nueve, .3, 12], [K.L6 + 0.55, .3, 12], [K.tal, .35, 16],
 [K.china - 0.14, .3, 10], [K.chino, .35, 16], [K.bestia, .3, 12], [K.especial, .35, 16], [K.ali + 0.02, .5, 14], [K.cuarenta, .4, 18],
 [S.Q[0] + 0.22, .3, 12], [K.tampoco + 0.25, .35, 16], [K.nombra + 0.25, .3, 10],
 [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .6], [0.1, 'swoosh_up', .4], [0.3, 'tick', .35], [0.6, 'tick', .35], [0.9, 'tick', .35], [K.colaron, 'stamp', 1.0], [K.las0, 'sparkle', .4],
  [S.B[0] + 0.03, 'whoosh', .6], [K.no1, 'error', .7], [K.no1 + 0.18, 'stamp', .9],
  [S.C[0] + 0.03, 'click', .6], [K.quien, 'pop2', .7], [K.colo1, 'squish', .4],
  [S.D[0] + 0.03, 'whoosh', .6], [K.sherezade, 'sparkle', .5],
  [S.E[0] + 0.03, 'whoosh', .5], [S.E[0] + 0.1, 'tick', .4], [S.E[0] + 0.25, 'tick', .4], [S.E[0] + 0.4, 'tick', .4], [K.noche2, 'stamp', .9],
  [S.F[0] + 0.03, 'whoosh', .6], [K.rey, 'pop', .5], [K.mate - 0.1, 'swoosh_up', .7], [K.mate + 0.1, 'thud', .7],
  [S.G1[0] + 0.03, 'whoosh', .6], [K.cuatro, 'stamp', 1.0], [K.traduce, 'paper', .6], [K.traduce + 0.15, 'pop', .5],
  [S.G2[0] + 0.03, 'whoosh', .6], [K.galland3, 'pop', .6],
  [S.G3[0] + 0.02, 'burst', .8], [K.exitazo + 0.02, 'stamp', 1.0], [T_EMU, 'emu', .9], [T_EMU + 0.2, 'squish', .5],
  [S.H[0] + 0.05, 'paper', .6], [S.H[0] + 0.37, 'paper', .5], [S.H[0] + 0.69, 'paper', .5], [K.acaba - 0.05, 'whoosh', .6], [K.acaba + 0.3, 'clockfast', .35],
  [K.dos4, 'stamp', 1.0], [K.dos4 + 0.05, 'ding', .6], [K.dos4e + 0.05, 'paper', 1.0], [K.dos4e + 0.08, 'scratch', .6], [K.setecientas, 'error', .7],
  [K.setecientas + 0.35, 'tick', .7], [K.setecientas + 0.5, 'tick', .7], [K.setecientas + 0.65, 'tick', .7], [K.setecientas + 0.45, 'pop', .5],
  [S.I1[0] + 0.03, 'whoosh', .6], [S.I1[0] + 0.15, 'swoosh_up', .4], [K.nueve, 'stamp', 1.0],
  [S.I2[0] + 0.03, 'whoosh', .5], [K.hanna5 - 0.05, 'pop2', .7], [K.cuenta, 'pop', .5],
  [S.I3[0] + 0.03, 'paper', .7], [K.aladino5 + 0.05, 'ding', .7],
  [S.J[0] + 0.03, 'whoosh', .6], [K.L6 + 0.55, 'thud', .8], [K.L6 + 0.75, 'tick', .4], [K.L6 + 1.0, 'tick', .4], [K.L6 + 1.25, 'tick', .4], [K.L6 + 1.5, 'tick', .4], [K.tal, 'stamp', 1.0],
  [S.L[0] + 0.03, 'whoosh', .6], [K.china - 0.14, 'paper', .8], [K.china - 0.1, 'swoosh_up', .6], [K.china + 0.22, 'pop', .5], [K.chino, 'stamp', 1.0], [K.chino + 0.15, 'boing', .4],
  [S.M[0] + 0.03, 'whoosh', .6], [S.M[0] + 0.1, 'drumroll', .8], [K.bestia, 'stamp', .9],
  [S.N[0], 'burst', .8], [K.especial, 'glitch', .5], [K.mil8, 'tada', .8],
  [S.O[0] + 0.02, 'whoosh', .7], [S.O[0] + 0.5, 'scratch', .4], [K.otro, 'scratch', .5], [K.otro + 0.25, 'pop', .5],
  [S.P[0] + 0.02, 'pop2', .6], [K.ali + 0.02, 'thud', .9], [K.ali + 0.05, 'whoosh', .6], [K.cuarenta, 'burst', .9], [K.cuarenta + 0.02, 'stamp', .6],
  [S.Q[0] + 0.22, 'thud', .9], [K.tampoco + 0.25, 'stamp', 1.0],
  [S.R[0] + 0.03, 'whoosh', .6], [K.dos10, 'sparkle', .5], [K.famosos, 'sparkle', .5], [K.conto10, 'pop', .6], [K.ni - 0.05, 'type', .7], [K.ni + 0.3, 'type', .6], [K.nombra + 0.25, 'tada', .6],
  [S.T[0], 'whoosh', .6], [K.alejandro - 0.1, 'swoosh_up', .5], [S.T[0] + 0.35, 'pop2', .5], [K.cero - 0.1, 'swoosh_up', .5], [K.napoleon - 0.1, 'swoosh_up', .5], [K.A11 - 0.12, 'ding', .7], [K.A11, 'click', .6], [K.B11, 'click', .6], [K.C11, 'click', .6],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.mil12 + 0.1, 'tada', .5], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [K.libro + 0.18, 'sparkle', .6], [LOOP, 'whoosh', .6],
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
