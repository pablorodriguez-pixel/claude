/* Ep. 31 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.D2[0], S.E1[0]], [S.G2[0], S.H1[0]], [S.I2[0], S.I3[0]], [S.K2[0], S.L1[0]], [S.M[0], S.BAL[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.nuevo + 0.1, K.nuevo + 0.8]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.derribado - 0.1, K.pasajeros + 0.8)) { o.bL = 14; o.bR = 14; o.look = [6, -3]; o.fan = Math.sin(t * 24) * 20 - 10; }
  if (IN(t, K.cuenta - 0.1, K.el8 + 0.8)) { o.bL = 4; o.bR = 16; o.look = [6, -3]; }
  if (IN(t, K.cuatro - 0.1, K.despues + 0.6)) { o.bL = 12; o.bR = 12; o.look = [0, -4]; }
  if (IN(t, K.tu12 - 0.1, K.leo + 0.4)) { o.look = [0, 0]; o.bL = 10; o.bR = 10; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «Falsa alarma» MISIL ×1 ×5 1983 2017 ✦ ♥ ♪ ♫ ↕ 👇 …</span>`).join('');
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
    h.spans.forEach(s => { const k = p(t, Math.max(h.t0, s.t - 0.14), 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.misil1, .2, 16], [K.ochenta, .25, 10], [K.otro - 0.05, .2, 8], [K.cinco2, .3, 14], [K.derribado, .3, 12], [K.pasajeros + 0.1, .3, 10], [K.boton, .3, 12],
 [K.falsa, .4, 22], [K.cinco6, .25, 10], [S.H1[0], .3, 14], [K.cohete + 0.08, .25, 10], [K.ojo, .3, 12], [K.bronca, .4, 18], [K.papeleo, .3, 14],
 [K.anos9, .35, 16], [K.cuatro, .3, 12], [K.dos11, .3, 14], [K.veces, .3, 14], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.02, 'error', .55], [0.9, 'tick', .35], [1.8, 'tick', .35], [K.maquina, 'whoosh', .5], [K.maquina + 0.05, 'pop', .5],
  [S.B1[0] + 0.02, 'whoosh', .6], [K.rusia, 'pop', .5], [K.ochenta, 'stamp', .9], [K.tres, 'thud', .5],
  [S.B2[0] + 0.02, 'swoosh_up', .4], [K.stanislav, 'pop', .5], [K.petrov, 'pop2', .5], [K.grita, 'error', .45],
  [K.misil1, 'glitch', .7], [K.misil1 + 0.02, 'stamp', .8], [K.misil1 + 0.35, 'ding', .4],
  [S.C[0] + 0.02, 'paper', .5], [K.misil2, 'swoosh_up', .6], [K.estados, 'pop', .35], [K.otro - 0.05, 'stamp', .6], [K.otro, 'swoosh_up', .5], [K.hasta, 'swoosh_up', .5], [K.cinco2, 'stamp', 1.0],
  [S.D1[0] + 0.02, 'paper', .6], [K.mes, 'pop', .35],
  [S.D2[0] + 0.02, 'whoosh', .6], [K.derribado, 'burst', .6], [K.avion, 'pop', .35], [K.pasajeros + 0.1, 'stamp', 1.0],
  [S.E1[0] + 0.02, 'pop', .5], [K.boton - 0.02, 'thud', .8], [K.boton + 0.12, 'click', .6],
  [S.E2[0] + 0.02, 'whoosh', .5], [K.aviso, 'swoosh_up', .6], [K.alguien, 'whoosh', .4], [K.pulsara, 'drumroll', .4],
  [S.F1[0] + 0.02, 'gulp', .6],
  [K.coge, 'click', .7], [K.falsa, 'stamp', 1.2], [K.falsa + 0.1, 'thud', .6],
  [S.G1[0] + 0.02, 'whoosh', .5], [K.cientos, 'burst', .5], [K.no6, 'pop2', .4], [K.cinco6, 'stamp', .8],
  [S.G2[0] + 0.02, 'whoosh', .5], [K.sistema, 'pop', .4], [K.nuevo, 'ding', .6], [K.nuevo + 0.3, 'boing', .4],
  [S.H1[0], 'tada', .6],
  [S.H2[0] + 0.02, 'whoosh', .5], [K.sol, 'sparkle', .5], [K.reflejado, 'swoosh_up', .4], [K.nubes, 'sparkle', .4], [K.altas + 0.15, 'swoosh_up', .4],
  [S.H3[0] + 0.02, 'whoosh', .5], [K.tomo, 'boing', .35], [K.cohete, 'pop2', .7], [K.cohete + 0.08, 'stamp', .7],
  [S.I1[0] + 0.02, 'whoosh', .5], [K.premio, 'bell', .6],
  [K.ojo, 'stamp', 1.0], [K.cuenta, 'pop', .4],
  [K.bronca, 'stamp', .9], [K.bronca + 0.05, 'error', .4],
  [S.I4[0] + 0.02, 'paper', .6], [T_EMU, 'emu', .9], [K.papeleo, 'stamp', 1.0],
  [S.J1[0] + 0.02, 'whoosh', .5],
  [K.quince - 0.1, 'paper', .6], [K.anos9, 'stamp', 1.0],
  [S.K1[0] + 0.02, 'whoosh', .4], [K.diecisiete, 'thud', .45],
  [K.tampoco - 0.1, 'swoosh_up', .5], [K.cuatro, 'stamp', .9],
  [S.L1[0], 'burst', .6], [K.vida, 'heart', .6],
  [S.L2[0] + 0.02, 'whoosh', .4], [K.enteraste, 'msg_in', .5],
  [K.dos11, 'stamp', 1.0], [K.veces, 'stamp', 1.0],
  [S.M[0] + 0.02, 'whoosh', .5], [K.silla, 'pop', .4], [K.os, 'ding', .7],
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
