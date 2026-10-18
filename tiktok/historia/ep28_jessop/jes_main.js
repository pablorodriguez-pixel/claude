/* Ep. 28 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.C[0], S.G[0]], [S.I2[0], S.L2[0]], [S.N2[0], S.O1[0]], [S.P[0], S.BAL[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
/* cartel «DIMITO» (la única complicidad, en «¿Tú lo dejas?») */
const dim = el('div', ovalW, { left: '210px', top: '-150px', zIndex: 5, transformOrigin: '60px 220px' });
dim.innerHTML = `<svg width="240" height="230" style="overflow:visible"><path d="M60,90 L60,230" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M60,90 L60,230" stroke="${WOOD}" stroke-width="8" stroke-linecap="round"/>${cut('<rect x="0" y="0" width="230" height="100" rx="12"/>', 5, 6)}<rect x="0" y="0" width="230" height="100" rx="12" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><text x="115" y="70" text-anchor="middle" font-family="Rye" font-size="50" fill="${RED}">DIMITO</text></svg>`;
const LAUGH = [[K.el94 + 0.05, K.el94 + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; dim.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.bulto - 0.1, K.bulto + 0.7)) { o.bL = 12; o.bR = 12; o.look = [4, -6]; }
  if (IN(t, K.noera - 0.1, K.suyo + 0.6)) { o.bL = 4; o.bR = 16; o.look = [6, -3]; }
  if (IN(t, K.arranco - 0.1, K.arranco + 0.8)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.ni34 - 0.1, S.F[1])) { o.bL = 2; o.bR = 20; o.look = [6, -4]; }
  if (IN(t, K.tu62 - 0.1, K.ella65)) { o.look = [0, 0]; o.bL = 10; o.bR = 10; }
  if (IN(t, K.titanic4 - 0.05, K.titanic4 + 0.9)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.mina, K.minaE + 0.5)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.cepillo - 0.1, K.dientes + 0.6)) { o.bL = 12; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.mar - 0.2, K.mar + 0.6)) { o.bL = 14; o.bR = 14; o.look = [0, -2]; }
  if (IN(t, K.barco - 0.1, S.N3[1])) { o.bL = 20; o.bR = 20; o.look = [0, -4]; o.fan = 0; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
  // cartel DIMITO: sube en «¿Tú lo dejas?» y baja en «Ella»
  const kd = p(t, K.tu62 - 0.05, 0.35, E.outBack), kx = p(t, K.ella65 - 0.2, 0.2, E.inCubic);
  dim.style.visibility = t > K.tu62 - 0.05 && t < K.ella65 ? 'visible' : 'hidden';
  set(dim, { y: (1 - kd) * 260 + kx * 300, r: -8 + Math.sin(t * 7) * 6, o: 1 });
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ VIOLET JESSOP TITANIC OLYMPIC BRITANNIC DIMITO ✦ 🎩 👇 💧 🧦 ✉️ 🧷 …</span>`).join('');
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
  SCX.forEach(f => f(t));
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.si, .25, 8], [K.bulto + 0.3, .25, 8], [K.arranco + 0.05, .3, 12], [K.queva - 0.04, .35, 16], [K.tres3 + 0.22, .25, 8], [T_CRAC, .15, 16], [T_CRAC + 0.4, .2, 8],
 [K.titanic4, .3, 10], [T_BUM, .45, 24], [K.cepillo, .25, 8], [K.sin - 0.04, .3, 12], [K.salta - 0.04, .3, 14], [K.cabeza, .5, 28], [K.viva + 0.08, .3, 12],
 [K.roto, .25, 10], [K.mar - 0.12, .35, 16], [K.barco - 0.05, .25, 8], [K.pudo, .3, 10], [K.tierra - 0.05, .3, 12], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.tu0, 'glitch', .3], [K.esta, 'swoosh_up', .6], [K.si - 0.08, 'pop2', .7],
  [S.B[0] + 0.05, 'paper', .6], [K.violet, 'type', .6], [K.argentina - 0.05, 'stamp', .6],
  [S.C[0], 'whoosh', .5], [K.bulto - 0.1, 'swoosh_up', .4], [K.bulto + 0.3, 'thud', .6],
  [K.bebe - 0.05, 'pop', .6], [K.noera, 'boing', .4], [S.E1[0], 'whoosh', .5], [K.rescatarlos, 'bell', .4], [S.E2[0], 'whoosh', .4], [K.arranco + 0.05, 'swoosh_up', .6],
  [K.ni34, 'pop', .5], [K.gracias + 0.2, 'sad', .4],
  [K.fin, 'scratch', .5], [K.queva - 0.04, 'glitch', .6], [K.queva + 0.05, 'burst', .6],
  [S.H[0], 'whoosh', .5], [K.dos - 0.1, 'swoosh_up', .5], [K.gemelos, 'ding', .5], [K.ella3, 'pop', .5], [K.en3, 'pop', .5], [K.tres3, 'pop2', .5], [K.tres3 + 0.22, 'stamp', 1.0],
  [S.I1[0], 'whoosh', .5], [T_CRAC, 'thud', 1.0], [T_CRAC + 0.02, 'burst', .7], [T_CRAC + 0.4, 'stamp', .9],
  [S.I2[0], 'whoosh', .4], [K.tu62, 'pop', .5], [K.paso, 'swoosh_up', .5], [K.titanic4, 'ding', .7],
  [S.J1[0], 'paper', .5], [K.enfermera - 0.05, 'sparkle', .5], [K.mina, 'drumroll', .4], [T_BUM, 'burst', 1.1], [T_BUM + 0.05, 'thud', 1.0],
  [S.J3[0], 'whoosh', .5], [K.camarote - 0.05, 'click', .6], [S.K1[0], 'paper', .5], [K.porque, 'boing', .4], [K.cepillo - 0.05, 'tada', .6], [K.cepillo + 0.1, 'sparkle', .5],
  [S.K3[0], 'whoosh', .5], [K.sin - 0.04, 'stamp', 1.0], [K.el94 + 0.1, 'boing', .5],
  [S.L1[0], 'whoosh', .4], [S.L2[0], 'gulp', .5], [K.helices, 'drumroll', .4], [S.L3[0], 'whoosh', .4],
  [K.salta - 0.04, 'swoosh_up', .8], [S.M2[0], 'gulp', .7], [K.cabeza, 'thud', 1.3], [K.cabeza + 0.05, 'burst', .6], [K.viva + 0.08, 'stamp', 1.0], [K.sale, 'swoosh_up', .4],
  [S.M4[0], 'whoosh', .4], [K.roto - 0.05, 'glitch', .5], [K.segun - 0.05, 'pop', .5],
  [S.N1[0] + 0.2, 'pop2', .6], [S.N2[0], 'whoosh', .5], [K.mar - 0.12, 'stamp', 1.2],
  [S.N3[0], 'whoosh', .5], [K.mundo, 'swoosh_up', .4], [K.barco - 0.05, 'boing', .5],
  [S.O1[0], 'whoosh', .5], [K.tres136, 'stamp', .7], [K.barcos, 'stamp', .7], [K.intentaron, 'stamp', .8], [K.ninguno, 'swoosh_up', .5], [K.pudo, 'ding', .6],
  [S.O3[0], 'whoosh', .5], [K.tierra - 0.05, 'stamp', 1.0], [T_EMU - 0.1, 'emu', .9],
  [S.P[0], 'whoosh', .5], [K.volverias, 'pop', .4], [K.os, 'ding', .7],
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
