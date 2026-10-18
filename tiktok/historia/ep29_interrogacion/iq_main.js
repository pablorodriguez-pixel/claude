/* Ep. 29 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 23) */
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
const OV_VIS = [[S.D1[0], S.E1[0]], [S.G1[0], S.H[0]], [S.J1[0], S.K1[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.ella + 0.1, K.ella + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.mil - 0.1, K.cuatro + 0.6)) { o.bL = 12; o.bR = 12; o.look = [0, -4]; }
  if (IN(t, K.puesta - 0.1, K.reves + 0.6)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.costo - 0.1, K.costo + 0.8)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.oblig - 0.1, K.oblig + 0.8)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.novale - 0.1, K.quitarla + 0.6)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600', 'Bricolage;font-weight:700'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑÀČ¿¡ «s-ciào vostro» QVIXOTE ¿? ¡! ✓ ↘ ↗ • ✦ 🔊 ✦ 🎩 👇 …</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage', '700 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
[[K.jamas, .25, 8], [K.quijote + 0.05, .3, 12], [K.existia, .35, 16], [K.mil + 0.02, .4, 18], [K.puesta + 0.5, .25, 8], [S.E1[0], .3, 12],
 [K.final, .25, 10], [K.xix, .3, 12], [K.sin, .35, 14], [K.ojo, .35, 16], [K.oblig, .35, 14], [K.novale, .35, 16], [K.lenguas, .3, 14],
 [K.excusa, .25, 8], [K.no10, .45, 22], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [0.12, 'pop2', .5], [S.A1[0] + 0.02, 'swoosh_up', .5], [K.abres - 0.05, 'click', .8], [K.abres, 'pop', .6],
  [S.A2[0], 'whoosh', .5], [K.jamas, 'boing', .6], [K.jamas + 0.05, 'stamp', .7],
  [S.B1[0], 'paper', .7], [K.vez - 0.1, 'ping', .4], [K.quijote - 0.45, 'ping', .4], [K.quijote + 0.05, 'stamp', 1.0],
  [S.B2[0], 'whoosh', .5], [K.no1, 'squish', .5], [K.descuidado, 'pop2', .5],
  [S.C[0], 'scratch', .5], [K.existia, 'stamp', 1.1],
  [S.D1[0], 'whoosh', .6], [K.academia, 'bell', .5], [S.D2[0], 'paper', .5], [K.mil + 0.02, 'stamp', 1.2], [K.cuatro + 0.1, 'pop', .4],
  [S.D3[0], 'whoosh', .5], [K.cerrar, 'pop', .5], [K.puesta, 'swoosh_up', .7], [K.puesta + 0.5, 'ding', .7], [K.reves + 0.1, 'whoosh', .5], [K.reves + 0.45, 'sparkle', .5],
  [S.E1[0], 'burst', .7], [S.E2[0], 'whoosh', .5], [K.voz, 'pop', .4],
  [K.tienes1 - 0.04, 'pop', .6], [K.y4, 'pop2', .5], [K.tienes2 - 0.06, 'pop', .6], [K.hambre2e - 0.1, 'ding', .6],
  [S.F1[0] + 0.5, 'sparkle', .5], [K.palabras, 'stamp', .7], [K.cambia - 0.1, 'swoosh_up', .5], [K.tono + 0.15, 'pop2', .4],
  [S.F2[0], 'typing', .5], [K.final, 'tada', .5],
  [S.G1[0], 'whoosh', .6], [K.costo + 0.1, 'boing', .4], [K.xix, 'stamp', .9],
  [S.G2[0] + 0.1, 'swoosh_up', .6], [S.G2[0] + 1.0, 'thud', .6], [S.G2[0] + 0.25, 'paper', .5], [S.G2[0] + 1.25, 'paper', .4], [K.sin, 'stamp', 1.0],
  [S.H[0], 'whoosh', .6], [K.lleva - 0.25, 'pop', .4], [K.lleva, 'pop', .4], [K.pusieron, 'pop2', .6],
  [K.ojo, 'stamp', 1.1], [S.I2[0], 'whoosh', .6], [K.asturiano, 'pop2', .6], [K.gallego, 'pop2', .6], [T_EMU - 0.1, 'emu', .9],
  [S.J1[0], 'whoosh', .6], [K.oblig, 'stamp', 1.1], [S.J2[0], 'whoosh', .5], [S.J2[0] + 0.3, 'scratch', .3], [K.novale, 'stamp', 1.1], [K.novale + 0.1, 'boing', .5],
  [S.J3[0], 'pop', .5], [K.lenguas, 'thud', .7], [K.lenguas + 0.05, 'swoosh_up', .6],
  [S.K1[0], 'whoosh', .5], [K.chat - 0.05, 'msg_in', .8], [K.cerv10 - 0.05, 'swoosh_up', .5], [K.excusa, 'pop2', .5],
  [S.K3[0], 'burst', .6], [K.no10, 'stamp', 1.3], [K.no10 + 0.05, 'glitch', .4],
  [S.K4[0], 'whoosh', .5], [K.falta, 'pop', .4], [K.perdonas, 'pop', .4], [K.nadie, 'pop', .4], [K.os, 'ding', .7],
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
