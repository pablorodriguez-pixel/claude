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
const OV_VIS = [[S.B[0], S.E1[0]], [S.F[0], S.G2[0]], [S.G3[0], S.HIT[0]]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  let st = null;
  for (const [a, b] of OV_VIS) if (t >= a && t < b) { const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic); st = { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 }; }
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  set(ovalW, { x: st.x, y: st.y + wobble(t, 0.5, 2), s: st.s, r: st.r, o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.mil - 0.1, K.cuenta + 0.5)) { o.look = [0, 0]; o.bL = 8; o.bR = 14; }
  if (IN(t, K.dalt - 0.1, K.dalt + 0.9)) { o.bL = 12; o.bR = 12; o.look = [0, 0]; }
  if (IN(t, K.embisten - 0.1, K.embisten + 0.8)) { o.bL = 14; o.bR = 6; }
  if (IN(t, K.sea, K.L5e)) { o.fan = Math.sin(t * 20) * 16 - 8; }
  if (IN(t, K.dicen, K.L6e + 0.2)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [-3, 2]; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (IN(t, K.rojo7 - 0.1, K.L7e + 0.3)) { o.bL = 12; o.bR = 4; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ toro ✔ ✘ ★ ≈ ≡ → ✦</span>`).join('') + '<span>😳</span>';
  ['900 40px Playfair', 'italic 900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[0.0, .25, 8], [K.no0, .3, 12], [K.disting, .35, 18], [K.prueba1, .3, 6], [K.rojo2, .3, 8], [K.gris, .3, 8], [K.embisten, .35, 12],
 [K.prueba2, .3, 10], [K.igual4, .35, 14], [K.ojo, .35, 14], [K.ciego, .3, 10], [K.rojo7, .3, 10], [K.publico, .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'cloth_whoosh', .8], [K.le, 'boing', .5], [K.igual + 0.1, 'squish', .4], [K.no0, 'glitch', .7], [K.disting, 'stamp', 1.0],
  [S.B[0] + 0.05, 'whoosh', .6], [K.prueba1, 'click', .7], [K.prueba1 + 0.15, 'pop', .6], [K.visto, 'pop2', .5], [K.mil, 'pop', .5], [K.sin, 'pop2', .5],
  [S.C1[0] + 0.05, 'whoosh', .5], [K.pocos + 0.05, 'error', .5], [K.colores, 'pop', .6],
  [S.C2[0] + 0.05, 'paper', .7], [K.recep + 0.05, 'tick', .5], [K.recep + 0.2, 'tick', .5], [K.rojo2, 'stamp', .8], [K.como, 'whoosh', .5], [K.personas, 'pop', .5], [K.dalt + 0.1, 'ding', .6],
  [S.C3[0] + 0.05, 'swoosh_up', .6], [K.gris - 0.05, 'glitch', .5], [K.gris + 0.3, 'pop2', .5],
  [S.D1[0] + 0.05, 'whoosh', .5], [K.L3 + 0.1, 'boing', .5], [K.embisten, 'thud', .9],
  [S.D2[0] + 0.05, 'cloth_whoosh', .7], [S.D2[0] + 1.2, 'cloth_whoosh', .6], [K.van, 'cloth_whoosh', .6], [K.mueve + 0.05, 'ding', .6],
  [S.E1[0] + 0.05, 'paper', .6], [K.prueba2, 'click', 1.0], [K.prueba2 + 0.2, 'tada', .7],
  [S.E2[0] + 0.05, 'cloth_whoosh', .8], [K.primera, 'pop2', .5], [K.rosa, 'pop', .7], [K.amarillo - 0.12, 'swoosh_up', .5], [K.amarillo, 'pop', .7],
  [S.E3[0] + 0.05, 'whoosh', .5], [K.embiste - 0.3, 'drumroll', .4], [K.embiste + 0.1, 'cloth_whoosh', .9], [K.igual4, 'stamp', 1.0],
  [S.F[0] + 0.05, 'whoosh', .5], [K.probado, 'pop2', .5], [K.trapos, 'pop', .5], [K.trapos + 0.36, 'pop', .5], [K.colores5, 'pop', .5], [K.que5, 'cloth_whoosh', .7], [K.mueve5, 'ding', .7],
  [K.sea, 'pop2', .4], [K.sea + 0.52, 'pop2', .4], [K.sea + 1.04, 'pop2', .4],
  [S.G1[0] + 0.05, 'whoosh', .5], [K.roja - 0.1, 'boing', .6],
  [S.G2[0] + 0.05, 'swoosh_up', .5], [K.trad, 'bell', .6],
  [S.G3[0] + 0.05, 'whoosh', .5], [K.dicen, 'pop', .5], [K.dicen + 0.36, 'pop', .4], [K.nota - 0.25, 'paper', .6],
  [K.ojo, 'stamp', 1.0], [K.el7 - 0.1, 'swoosh_up', .5], [K.el7 + 0.2, 'sparkle', .6], [K.ciego, 'stamp', .8],
  [S.H2[0] + 0.05, 'paper', .6], [K.ve, 'pop', .5], [K.movim7 + 0.5, 'ding', .7], [K.muy, 'sparkle', .6], [K.loque, 'pop2', .5], [K.nove, 'glitch', .6], [K.rojo7, 'error', .7],
  [S.HIT[0] + 0.02, 'burst', .9], [K.publico - 0.02, 'stamp', .9], [K.publico + 0.35, 'emu', .9], [K.no8, 'pop', .6],
  [K.te - 0.15, 'whoosh', .6], [K.te + 0.15, 'pop', .7], [K.te + 0.3, 'msg_in', .6], [K.te + 0.65, 'msg_in', .6], [K.creias + 0.1, 'msg_in', .6], [K.si + 0.3, 'click', .9], [K.noB + 0.2, 'pop2', .5],
  [S.C[0] + 0.03, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L2[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
