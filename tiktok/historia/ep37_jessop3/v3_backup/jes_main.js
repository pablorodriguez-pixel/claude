/* Ep. 37 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 28) */
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
const OV_VIS = [[S.M[0], S.M[1]], [S.J2[0], S.J5[0]], [S.R2[0], S.R4[0]], [S.CTA[0], S.CTA[1]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const IN = (t, a, b) => t > a && t < b;
const LAUGH = [[K.dientes + 0.1, K.dientes + 0.9]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.uno3 - 0.1, K.uno3b + 0.5)) { o.bL = 8; o.bR = 8; o.look = [6, -4]; }
  if (IN(t, K.camarote - 0.1, K.camarote + 0.7)) { o.bL = 14; o.bR = 14; o.look = [4, -6]; }
  if (IN(t, K.cosa - 0.1, K.su8)) { o.bL = 2; o.bR = 20; o.look = [6, -4]; }
  if (IN(t, K.cepillo - 0.1, K.dientes + 0.1)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.cuarenta - 0.1, K.mas9 + 0.5)) { o.bL = 16; o.bR = 16; o.look = [0, -4]; }
  if (IN(t, K.tu10 - 0.05, K.barco10 + 0.6)) { o.look = [0, 0]; o.bL = 10; o.bR = 10; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ VIOLET JESSOP TITANIC OLYMPIC BRITANNIC 1911 1912 1916 ✦ 👇 🧦 ✉️ 🧷 ♥ …</span>`).join('');
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
    const vis = t >= h.t0 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.16, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  SCX.forEach(f => f(t));
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.titanic0, .25, 6], [K.tres1b, .2, 8], [K.tuvieron + 0.05, .2, 8], [K.accidente, .3, 12], [K.yesto2 - 0.04, .25, 8],
 [T_CRAC, .2, 16], [K.rasguno - 0.05, .3, 12], [K.ano - 0.08, .25, 8], [K.bebe, .2, 6], [STEPS[1].tDone, .25, 8],
 [T_BUM, .45, 24], [K.hundio, .3, 10], [K.helices, .25, 8], [K.salto - 0.04, .3, 14], [K.cabeza, .5, 26], [K.otra - 0.05, .3, 12],
 [K.ojo - 0.04, .35, 16], [K.cepillo - 0.05, .25, 8], [K.echado - 0.06, .25, 10], [K.tres9 - 0.05, .3, 14], [K.cuarenta - 0.05, .35, 16],
 [K.insumergible - 0.04, .35, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.mujer - 0.05, 'swoosh_up', .6], [K.titanic0, 'gulp', .5], [S.A2[0], 'whoosh', .5], [K.raro - 0.05, 'boing', .5],
  [S.B1[0] + 0.05, 'paper', .6], [K.violet, 'type', .6], [S.B2[0], 'whoosh', .4], [K.camarera - 0.05, 'pop', .6],
  [S.H1[0], 'whoosh', .5], [K.tres1 - 0.1, 'pop', .5], [K.hermanos - 0.05, 'pop', .5], [K.gemelos - 0.05, 'pop2', .6], [K.titanic1, 'ding', .5],
  [K.tres1b, 'thud', .6], [K.tuvieron + 0.05, 'thud', .6], [K.accidente, 'burst', .8],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [K.yesto2, 'pop2', .5],
  [S.M[0], 'whoosh', .5], [S.M[0] + 0.05, 'pop', .4], [S.M[0] + 0.17, 'pop', .4], [S.M[0] + 0.29, 'pop', .4], [K.uno3, 'ding', .5],
  [STEPS[0].t0, 'swoosh_up', .7], [K.uno - 0.05, 'stamp', .9], [K.mil - 0.04, 'stamp', .6],
  [S.O2[0], 'whoosh', .4], [T_CRAC, 'thud', 1.0], [T_CRAC + 0.02, 'burst', .7],
  [S.O3[0], 'whoosh', .4], [K.bordo - 0.05, 'pop', .5], [K.rasguno - 0.05, 'stamp', 1.0], [STEPS[0].tDone, 'scratch', .5], [STEPS[0].tDone + 0.18, 'ding', .6],
  [STEPS[1].t0, 'swoosh_up', .7], [K.dos - 0.05, 'stamp', .9], [S.T2[0], 'whoosh', .4], [K.ano - 0.08, 'stamp', .7],
  [S.T3[0], 'whoosh', .4], [K.bote5 - 0.05, 'pop', .5], [S.T4[0] + 0.02, 'swoosh_up', .5], [K.bebe, 'pop2', .7], [STEPS[1].tDone, 'scratch', .5], [STEPS[1].tDone + 0.18, 'ding', .6],
  [STEPS[2].t0, 'swoosh_up', .7], [K.tres6 - 0.05, 'stamp', .9], [K.plena - 0.05, 'pop', .5], [S.B2x[0], 'swoosh_up', .5], [K.hospital, 'sparkle', .5],
  [S.B3x[0], 'whoosh', .4], [K.mina - 0.3, 'drumroll', .4], [T_BUM, 'burst', 1.1], [T_BUM + 0.05, 'thud', 1.0], [K.hundio, 'gulp', .6],
  [S.B4x[0], 'whoosh', .4], [K.enfermera - 0.05, 'sparkle', .5],
  [S.P1[0], 'whoosh', .4], [K.arrastrado - 0.05, 'swoosh_up', .4], [S.P2[0], 'gulp', .5], [K.seguian, 'drumroll', .4],
  [K.salto - 0.04, 'swoosh_up', .8], [S.P4[0], 'gulp', .7], [K.cabeza, 'thud', 1.3], [K.cabeza + 0.05, 'burst', .6],
  [S.P5[0], 'swoosh_up', .5], [K.otra - 0.05, 'stamp', 1.0], [STEPS[2].tDone, 'scratch', .5], [STEPS[2].tDone + 0.18, 'tada', .6],
  [K.ojo - 0.04, 'stamp', 1.1], [S.J2[0], 'whoosh', .5], [K.camarote - 0.05, 'click', .6], [S.J3[0], 'paper', .5], [K.cosa, 'boing', .4],
  [K.cepillo - 0.05, 'tada', .6], [K.cepillo + 0.1, 'sparkle', .5], [S.J5[0], 'whoosh', .5], [K.echado - 0.06, 'stamp', .8], [K.menos, 'heart', .5],
  [S.R1[0], 'whoosh', .5], [K.tres9 - 0.05, 'stamp', 1.0], [K.naufragios + 0.1, 'stamp', .6], [K.naufragios + 0.45, 'stamp', .6], [K.naufragios + 0.8, 'stamp', .7],
  [S.R2[0], 'whoosh', .4], [S.R3[0], 'whoosh', .5], [K.cuarenta - 0.05, 'stamp', 1.0],
  [S.R4[0], 'whoosh', .5], [K.miss - 0.05, 'swoosh_up', .5], [K.insumergible - 0.04, 'stamp', 1.2], [T_EMU - 0.1, 'emu', .9],
  [S.CTA[0], 'whoosh', .5], [K.vuelto, 'pop', .4], [K.os, 'ding', .7],
  [S.BAL2[0] + 0.05, 'whoosh', .6], [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
/* palabras clave de los titulares: sin sombra (si no, se emborronan sobre el amarillo) */
HLS.forEach(h => h.hls.forEach(x => { if (!x.e.parentNode.style.color) x.e.parentNode.style.textShadow = 'none'; }));
