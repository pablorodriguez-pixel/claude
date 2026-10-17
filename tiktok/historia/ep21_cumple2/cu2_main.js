/* Ep. 21 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.C2[0], S.F2[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.dolar + 0.1, K.dolar + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.hermanas - 0.1, K.eeuu + 0.6)) { o.look = [6, -4]; o.bL = 8; o.bR = 8; }
  if (IN(t, K.suya - 0.1, K.suya + 0.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.pagar, K.pagar + 0.9)) { o.bL = 12; o.bR = 16; o.look = [0, 0]; }
  if (IN(t, K.valen, K.valen + 0.9)) { o.bL = 10; o.bR = 14; o.he = true; }
  if (IN(t, K.factura, K.factura + 0.8)) { o.bL = 6; o.bR = 16; o.look = [8, -2]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «Cumpleaños» 2015 $ © ✔ ★ ♪ … 🤫🤏🎂😂🇲🇽👇</span>`).join('');
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
[[K.dueno, .35, 12], [K.prueba, .3, 10], [K.L2 + 0.05, .35, 14], [K.desaf, .3, 10], [K.eeuu, .25, 8], [K.cumple4, .3, 10], [K.suya, .4, 16], [K.pagar + 0.05, .4, 16],
 [K.dolar, .3, 10], [K.d15, .3, 10], [K.dijo7, .3, 16], [K.valen, .35, 16], [K.todos, .4, 16], [K.ojo, .35, 14], [K.anos, .3, 12], [K.era, .45, 20], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido (NINGUNO dentro del hueco de karaoke: ahí solo suena la caja de música) ---------- */
[
  [0.03, 'pop', .7], [K.feliz, 'sparkle', .5], [K.tartas - 0.1, 'pop2', .5], [K.dueno - 0.15, 'whoosh', .5], [K.dueno, 'thud', 1.0], [K.dueno + 0.04, 'click', 1.0],
  [S.B1[0] + 0.03, 'whoosh', .6], [K.prueba, 'stamp', .8], [K.cantala - 0.1, 'swoosh_up', .5], [K.dentro, 'pop', .5],
  [S.B2[0], 'paper', .7], [K.buenos, 'type', .6], [K.dias, 'type', .5], [K.aTi, 'type', .5], [K.ti, 'ding', .6],
  [K.L2 + 0.05, 'stamp', 1.0], [K.eh, 'ding', .7],
  [S.R2[0], 'whoosh', .6], [K.oido, 'boing', .5], [K.desaf, 'scratch', .8], [K.desaf + 0.15, 'error', .4], [K.poquito, 'pop', .6],
  [S.C2[0] + 0.05, 'whoosh', .5], [K.nacio, 'pop2', .5], [K.dosH, 'pop', .6], [K.eeuu, 'sparkle', .6], [K.compus, 'type', .5],
  [S.C3[0], 'whoosh', .5], [K.buenos3, 'bell', .6], [K.clase, 'pop', .5],
  [S.D1[0], 'paper', .7], [K.alguien, 'pop2', .6], [K.letra4, 'scratch', .6], [K.cumple4, 'tada', .7],
  [S.D2[0], 'swoosh_up', .6], [K.dijo, 'pop', .6], [K.suya, 'stamp', 1.0], [K.suya + 0.12, 'error', .5],
  [S.E1[0] + 0.02, 'drumroll', .5], [K.peli, 'pop', .7], [K.anuncio, 'pop', .7], [K.pagar - 0.3, 'swoosh_up', .5], [K.pagar, 'cash', 1.0], [K.pagar + 0.08, 'stamp', .9],
  [S.E2[0], 'whoosh', .6], [K.restaurantes, 'bell', .6], [K.inventaron, 'pop2', .6], [K.otra, 'boing', .5], [K.para6, 'pop', .5], [K.soltar, 'squish', .6], [K.dolar, 'error', .7],
  [S.F1[0], 'whoosh', .6], [K.d15, 'stamp', .8], [K.eeuu7, 'pop', .5], [K.dijo7, 'thud', 1.2], [K.derechos7 - 0.3, 'paper', .6], [K.valen, 'thud', 1.0], [K.valen + 0.05, 'stamp', 1.0],
  [S.F2[0], 'burst', .8], [K.hoy, 'swoosh_up', .7], [K.es, 'pop', .5], [K.todos - 0.08, 'tada', .9],
  [K.ojo, 'stamp', 1.0], [K.casa, 'pop', .6], [T_EMU, 'emu', .9], [T_EMU + 0.6, 'whoosh', .5], [K.gratis, 'ding', .8],
  [S.G2[0], 'whoosh', .5], [K.manda, 'paper', .7], [K.factura, 'pop', .6], [K.anos - 0.1, 'boing', .7], [K.anos + 0.1, 'whoosh', .6],
  [S.H[0], 'burst', .8], [K.osea, 'pop', .5], [K.cancion9, 'swoosh_up', .5], [K.cantado, 'sparkle', .6], [K.dueno9, 'stamp', 1.0], [K.queno, 'scratch', .6], [K.era, 'stamp', 1.0], [K.era + 0.05, 'glitch', .6],
  [S.Q[0] + 0.02, 'whoosh', .6], [K.casa9 + 0.1, 'msg_in', .5], [K.como + 0.1, 'msg_in', .5], [K.canta + 0.05, 'msg_in', .5], [K.os, 'pop', .7],
  [S.C[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L2[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
].forEach(s => { if (s[0] > MEL.caja_desde - 0.3 && s[0] < MEL.caja_hasta + 0.05) console.warn('sfx en el hueco', s); sfx(s[1], s[0], s[2]); });

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
