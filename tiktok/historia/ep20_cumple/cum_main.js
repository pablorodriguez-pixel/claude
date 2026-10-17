/* Ep. 20 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.C1[0], S.F2[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.inventaban + 0.2, K.inventaban + 1.0]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.hermanas - 0.1, K.americanas + 0.6)) { o.look = [6, -4]; o.bL = 8; o.bR = 8; }
  if (IN(t, K.derechos - 0.1, K.derechos + 0.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.pagar1, K.pagar1 + 0.9)) { o.bL = 12; o.bR = 16; o.look = [0, 0]; }
  if (IN(t, K.validos, K.validos + 0.9)) { o.bL = 10; o.bR = 14; o.he = true; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «Cumpleaños» 2015 2016 € © ✔ ★ ♪ …</span>`).join('') + '<span>😳</span>';
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
[[K.costar, .35, 16], [K.peliculas, .25, 8], [K.nunca, .3, 10], [K.cantaban + 0.2, .3, 12], [K.finales, .3, 8], [K.derechos, .35, 14], [K.pagar1, .3, 10],
 [K.decidio, .3, 16], [K.validos, .35, 16], [K.dieci16b, .3, 10], [K.todos2, .4, 16], [K.ojo, .35, 14], [K.nunca2, .25, 8], [K.pago, .45, 20], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .7], [K.cumple, 'sparkle', .5], [K.costar, 'stamp', 1.0], [K.dinero + 0.02, 'cash', .9], [K.hasta, 'pop2', .5], [K.dieci16, 'ding', .7],
  [S.B[0] + 0.05, 'whoosh', .6], [K.peliculas - 0.08, 'click', 1.0], [K.peliculas + 0.3, 'pop', .5], [K.casi, 'bell', .4], [K.nunca, 'squish', .8], [K.nunca + 0.2, 'gulp', .5], [K.cantaban + 0.2, 'stamp', .9],
  [S.C1[0] + 0.05, 'paper', .7], [K.melodia + 0.2, 'type', .5], [K.finales, 'stamp', .8], [K.xix, 'pop', .5],
  [S.C2[0] + 0.05, 'whoosh', .5], [S.C2[0] + 0.1, 'pop2', .5], [K.dosH, 'pop', .6], [K.americanas, 'sparkle', .6],
  [S.C3[0], 'whoosh', .5], [K.clase - 0.1, 'pop2', .5], [K.buenos - 0.04, 'type', .6], [K.dias, 'type', .5], [K.todos1, 'bell', .6],
  [S.D1[0], 'paper', .7], [K.gente, 'pop', .5], [K.cambio, 'scratch', .7], [K.letra, 'boing', .5], [K.cumple2, 'tada', .7],
  [S.D2[0], 'whoosh', .5], [K.empresa - 0.15, 'swoosh_up', .6], [K.empresa + 0.1, 'pop', .5], [K.reclamando - 0.1, 'pop2', .5], [K.derechos, 'stamp', 1.0], [K.derechos + 0.12, 'error', .5],
  [S.E1[0] + 0.05, 'drumroll', .6], [K.pelicula, 'pop', .7], [K.anuncio, 'pop', .7], [K.pagar1 - 0.2, 'swoosh_up', .5], [K.pagar1, 'cash', 1.0], [K.pagar1 + 0.3, 'tick', .5], [K.pagar1 + 0.5, 'tick', .5],
  [S.E2[0], 'whoosh', .6], [K.restaurantes, 'bell', .6], [K.inventaban, 'pop2', .6], [K.inventaban + 0.25, 'boing', .5], [K.propia + 0.1, 'pop', .5], [K.nop, 'pop', .6], [K.pagar2, 'error', .7],
  [S.F1[0], 'whoosh', .6], [K.d15, 'stamp', .8], [K.decidio, 'thud', 1.2], [K.derechos2 - 0.3, 'paper', .6], [K.validos, 'thud', 1.0], [K.validos + 0.05, 'stamp', 1.0],
  [S.F2[0], 'burst', .8], [K.d16b, 'stamp', .8], [K.dieci16b + 0.1, 'glitch', .4], [K.dieci16b + 0.15, 'swoosh_up', .7], [K.es, 'pop', .5], [K.todos2 - 0.08, 'tada', .9],
  [K.ojo, 'stamp', 1.0], [K.cantarla, 'pop2', .5], [K.casa, 'pop', .6], [K.nunca2, 'ding', .8], [T_EMU, 'emu', .9], [T_EMU + 0.6, 'whoosh', .5],
  [S.G2[0], 'whoosh', .5], [K.pagar3, 'cash', .7], [K.publico - 0.15, 'pop', .6], [K.publico + 0.25, 'cash', .6], [K.negocios - 0.15, 'pop', .6], [K.negocios + 0.25, 'cash', .6],
  [S.H[0], 'burst', .8], [K.osea, 'pop', .5], [K.cancion3, 'swoosh_up', .5], [K.cantada, 'sparkle', .6], [K.era - 0.02, 'stamp', 1.0], [K.pago, 'glitch', .7], [K.pago + 0.05, 'cash', .8],
  [K.lo - 0.1, 'whoosh', .6], [K.sabias + 0.1, 'pop', .7], [K.sabias + 0.22, 'pop', .6], [K.sabias + 0.15, 'msg_in', .5], [K.si + 0.2, 'msg_in', .5], [K.si + 0.3, 'click', .9],
  [S.C[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L2[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
