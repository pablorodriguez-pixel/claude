/* Ep. 13 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.B1[0], S.C1[1]], [S.F1[0], S.F1[1]], [S.F3[0], S.F3[1]]];
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
  set(ovalW, { x: st.x, y: st.y + wobble(t, 0.5, 2), s: st.s, r: st.r, o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.todos - 0.1, K.yno)) { o.look = [0, 0]; o.bL = 12; o.bR = 16; o.fan = Math.sin(t * 22) * 16 - 8; }
  if (IN(t, K.movio, K.L1e + 0.2)) { o.bL = 14; o.bR = 14; o.look = [6, 0]; }
  if (IN(t, K.romano, K.marzo2)) { o.look = [8, -3]; o.bR = 8; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (IN(t, K.quito, K.dia + 0.5)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 12; o.bR = 12; }
  if (IN(t, K.bulo, K.bulo + 0.8)) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (IN(t, K.nohay, K.L6e + 0.2)) { o.fan = Math.sin(t * 22) * 18 - 8; o.look = [-3, 2]; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '0', top: '-600px', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ Septiembre 0123456789 = → ✔ ✘ ★ − «»</span>`).join('') + '<span>😳💧</span>';
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
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.nueve + 0.05, .35, 16], [K.cuenta + 0.08 + 8 * 0.148, .25, 8], [K.todos, .3, 10], [K.mal, .35, 14], [K.movio, .4, 16], [K.siete, .3, 10], [K.perfecto, .3, 10],
 [K.empezar + 0.4, .35, 12], [K.dosP, .35, 14], [K.nombre, .35, 14], [K.ojo, .35, 14], [K.bulo, .4, 18], [K.prueba + 0.05, .3, 12],
 [K.septimo2, .35, 14], [K.nueve2, .4, 18], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
{
  const TCn = i => K.cuenta + 0.08 + i * 0.148;
  const L = [
    [0.02, 'paper', 1.0], [0.05, 'whoosh', .6], [K.septimo, 'ding', .7], [K.mes - 0.05, 'scratch', .5], [K.nueve + 0.05, 'stamp', 1.0],
    [S.A2[0], 'whoosh', .6], ...[0, 2, 4, 6, 8].map(i => [TCn(i), 'tick', .6]), [TCn(8) + 0.1, 'ding', .8],
    [K.oct - 0.06, 'pop', .7], [K.octavo, 'pop2', .5], [K.nov - 0.06, 'pop', .7], [K.noveno, 'pop2', .5], [K.dic - 0.06, 'pop', .7], [K.decimo, 'pop2', .5],
    [K.todos, 'error', .6], [K.mal, 'stamp', 1.0],
    [S.B2[0], 'whoosh', .5], [K.error, 'boing', .5], [K.alguien - 0.1, 'swoosh_up', .6], [K.movio, 'thud', 1.0], [K.movio + 0.05, 'whoosh', .7],
    [S.C1[0], 'whoosh', .6], [K.romano, 'tada', .5], [K.marzo, 'pop', .7],
    [S.GR[0] + 0.05, 'paper', .6], [K.uno, 'pop', .6], [K.dos, 'pop', .6], [K.dos + 0.4, 'pop2', .5], [K.dos + 0.6, 'pop2', .5], [K.sep2, 'pop', .7], [K.siete, 'ding', .9],
    [K.cuadraba, 'pop2', .5], [K.perfecto - 0.05, 'sparkle', .8], [K.perfecto + 0.4, 'emu', .9],
    [K.enero - 0.05, 'boing', .6], [K.febrero - 0.05, 'boing', .6], [K.empezar, 'swoosh_up', .7], [K.empezar + 0.4, 'thud', .8],
    ...[0, 3, 6, 9].map(i => [K.todos2 + 0.05 + i * 0.105, 'tick', .6]), [K.dosP, 'stamp', 1.0], [K.puestos, 'whoosh', .5],
    [S.HITN[0], 'burst', 1.0], [K.nombre - 0.1, 'glitch', .6],
    [S.E1[0], 'whoosh', .6], [K.julio, 'pop', .6], [K.agosto, 'pop', .6], [K.quinto - 0.22, 'paper', .7], [K.sexto - 0.22, 'paper', .7],
    [S.E2[0], 'whoosh', .6], [K.rebau, 'stamp', .7], [K.julioC, 'tada', .6], [K.augusto, 'tada', .6],
    [K.ojo, 'stamp', 1.0], [K.augusto2 - 0.15, 'whoosh', .5], [K.quito, 'swoosh_up', .7], [K.dia + 0.05, 'pop', .7],
    [S.F2[0], 'whoosh', .5], [K.sumes, 'boing', .6], [K.corto, 'squish', .7],
    [K.bulo, 'stamp', 1.0], [K.bulo + 0.05, 'error', .5], [K.ninguna - 0.1, 'pop2', .5], [K.prueba + 0.05, 'stamp', .9],
    [S.HIT2[0], 'burst', 1.0], [K.septimo2, 'glitch', .6], [K.mes2 - 0.05, 'pop', .6], [K.nueve2, 'stamp', 1.0],
    [S.CTA[0], 'whoosh', .6], [S.CTA[0] + 0.2, 'pop', .7], [S.CTA[0] + 0.32, 'pop', .6], [K.te + 0.35, 'msg_in', .6], [K.te + 0.75, 'msg_in', .6], [K.cuenta2, 'msg_in', .6], [K.si + 0.35, 'click', .9], [K.noB + 0.2, 'pop2', .5],
    [S.C[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L2[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
  ];
  L.forEach(s => sfx(s[1], s[0], s[2]));
}

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
