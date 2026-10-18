/* Ep. 30 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.B1[0], S.D1[0]], [S.F2[0], S.G2[0]], [S.H1[0], S.H2[0]], [S.H3[0], S.I1[0]], [S.K2[0], S.BAL[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.bonito + 0.05, K.pero + 0.1], [K.ochenta + 0.6, K.indep - 0.1]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.mexico - 0.1, K.mexico + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.peso1 - 0.1, K.peso1 + 0.8)) { o.bL = 12; o.bR = 12; o.look = [0, -4]; }
  if (IN(t, K.tampoco - 0.1, K.S1 + 0.5)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.espanol - 0.1, K.peso2 + 0.6)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.copiaron - 0.1, K.peso5 + 0.4)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.legales - 0.1, K.legales + 0.8)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.wall - 0.1, K.conto + 0.6)) { o.bL = 12; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.mil - 0.1, K.siete + 0.4)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600', 'SpaceMono;font-weight:700'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ $ 1/8 «pesos» PESO DÓLAR MÉXICO POTOSÍ Mº PTS WALL ST ★ ▲ ▼ ♥ ✦ 👇 …</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage', '700 40px SpaceMono'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- frame ---------- */
// toda escena (también las de corte seco) sigue 0,25 s debajo de la siguiente: sin fotogramas de papel vacío en las transiciones.
// Excepciones: el montaje E0 (va encima de D2), el golpe de color J (z alto) y el balcón (no debe asomar bajo el libro).
SC.forEach(s => { if (s.t0 === S.E0[0] || s.t0 === S.J[0] || s.t0 === S.BAL[0]) s.noExt = true; });
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.noExt ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 + 0.03 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.S0, .3, 14], [K.peso1, .3, 12], [S.C1[0] + 0.5, .25, 10], [K.peso2, .35, 16], [K.rayaE + 0.06, .4, 20], [K.nacio, .3, 12], [K.copiaron + 0.3, .25, 8], [K.peso5, .3, 12],
 [K.legales, .3, 14], [K.ochenta, .3, 14], [K.indep + 0.25, .3, 10], [K.ojo, .3, 10], [K.U7 + 0.3, .25, 10], [K.sin, .25, 10], [K.papeles, .3, 12], [K.mil, .35, 16],
 [K.octavos9 + 0.05, .35, 16], [K.pesos10, .45, 22], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.D0 - 0.15, 'swoosh_up', .6], [K.D0 + 0.1, 'thud', .5], [K.S0, 'boing', .7], [K.S0 + 0.05, 'pop2', .5],
  [S.B1[0], 'whoosh', .5], [K.mexico + 0.05, 'cash', .6], [S.B2[0], 'whoosh', .5], [K.argentina + 0.1, 'cash', .5], [K.peso1, 'stamp', .9],
  [S.B3[0], 'whoosh', .5], [K.peso1b - 0.1, 'pop', .5], [K.tampoco, 'pop2', .5], [K.S1, 'ding', .6],
  [S.C1[0] + 0.05, 'whoosh', .5], [S.C1[0] + 0.5, 'cash', .6], [S.C1[0] + 0.66, 'cash', .5], [S.C2[0], 'swoosh_up', .5], [K.medio, 'sparkle', .4],
  [S.C3[0], 'whoosh', .5], [K.peso2, 'stamp', 1.0],
  [S.D1[0], 'paper', .7], [S.D1[0] + 0.3, 'scratch', .3], [S.D2[0], 'paper', .5], [K.P3 - 0.1, 'scratch', .4], [K.S3, 'scratch', .35], [K.plural, 'ding', .5], [K.pesos3, 'pop2', .5],
  [S.E0[0], 'whoosh', .6], [S.E0[0] + 0.1, 'type', .4], [S.E0[1], 'whoosh', .5],
  [K.S4, 'swoosh_up', .6], [K.P4 + 0.15, 'pop', .6], [K.P4b - 0.05, 'scratch', .45], [K.raya, 'tada', .7], [K.rayaE + 0.06, 'stamp', 1.1],
  [S.F1[0], 'whoosh', .5], [K.nacio, 'stamp', .9], [S.F2[0], 'whoosh', .5], [S.F2[0] + 0.3, 'thud', .5], [K.copiaron, 'swoosh_up', .5], [K.copiaron + 0.3, 'ding', .5], [K.peso5 - 0.05, 'stamp', .9],
  [S.G1[0], 'whoosh', .5], [K.pesos6 + 0.05, 'squish', .5], [K.legales, 'stamp', .9], [S.G2[0], 'whoosh', .5], [K.ochenta, 'stamp', 1.0], [K.indep + 0.2, 'bell', .6],
  [K.ojo, 'stamp', 1.0], [S.H2[0], 'whoosh', .5], [K.U7 + 0.2, 'thud', .6], [K.sobre7 + 0.1, 'boing', .5], [T_EMU, 'emu', .9],
  [S.H3[0], 'whoosh', .5], [K.bonito, 'heart', .5], [K.sin, 'stamp', .8], [K.papeles, 'stamp', .8],
  [S.I1[0], 'whoosh', .6], [K.wall, 'pop', .6], [S.I1[0] + 0.2, 'tick', .4], [S.I2[0], 'whoosh', .5], [K.mil, 'stamp', 1.1],
  [S.J[0], 'burst', .7], [K.octavos9 + 0.05, 'squish', .6], [K.real, 'cash', .7],
  [S.K1[0], 'whoosh', .6], [K.pone, 'swoosh_up', .6], [K.pesos10, 'stamp', 1.2], [K.pesos10 + 0.05, 'glitch', .4],
  [S.K2[0], 'whoosh', .6], [K.pais, 'pop', .4], [K.dices, 'pop', .4], [K.os, 'ding', .7],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino + 0.1, 'ping', .6], [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
