/* Ep. 11 · El Vecino en su óvalo, frame, temblores y efectos */
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
const OV_VIS = [[B.B1, B.F1], [B.G1, B.R1], [B.S1, B.T1]];
const T_END = 1e9;
function ovalState(t) {
  if (t >= T_END) { const k = pop(t, T_END + 0.05, 0.5); return { x: 335, y: -600, s: 1.12 * k, r: -3 + wobble(t, 0.4, 1.5), o: t < T_END + 0.05 ? 0 : 1 }; }
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.nombres + 0.2, K.nombres + 0.9]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > K.once && t < K.medioE) { o.bL = 14; o.bR = 16; o.look = [0, 0]; }
  if (t > K.ochoE && t < K.aragon + 0.6) { o.look = [6, -4]; o.bL = 12; o.bR = 12; }
  if (t > K.ray && t < K.ray + 1.0) { o.bL = 14; o.bR = 18; o.look = [6, -5]; }
  if (t > K.discute && t < K.discute + 0.9) { o.fan = Math.sin(t * 24) * 18 - 8; o.bL = 12; o.bR = 4; }
  if (t > K.tu && t < B.T1) { o.look = [8, -4]; o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.5); }
  if (t >= T_END) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.jaw = 0; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600', 'Instrument;font-style:italic', 'SpaceMono;font-weight:700', 'InterV;font-weight:800'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ @arroba 1448 ≈ ¼ ✦ ✠ → ▌</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage', 'italic 40px Instrument', '700 40px SpaceMono', '800 40px InterV'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
  // bucle: los últimos ~0,4 s funden con la portada (fotograma 1)
  if (t >= LOOP0) { const A0 = SC[0]; A0.c.style.display = ''; A0.c.style.zIndex = 800; set(A0.c, { o: p(t, LOOP0, 0.3, E.inOutCubic) }); A0.fn(0); }
  else SC[0].c.style.zIndex = 10;
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[0.0, .25, 10], [K.once, .25, 8], [K.mil1, .25, 8], [K.mil3, .25, 8], [K.trigo, .3, 12], [K.arroba1, .35, 14], [K.espanola + 0.15, .35, 14], [K.arroba3 + 0.38, .3, 10], [K.cuarta, .25, 6], [K.alrE - 0.08, .35, 12],
 [K.aragon, .3, 8], [K.sobrevivio, .3, 8], [K.escribir, .3, 10], [K.nombres + 0.6, .3, 10], [K.arroba8, .3, 10],
 [K.ojo, .35, 14], [K.siglo, .3, 10], [K.arroba9, .3, 12], [K.trigo9, .45, 18], [K.saco + 0.25, .3, 10], [K.kilos2, .45, 18], [K.si, .2, 6], [K.no, .2, 6], [K.libro - 0.02, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
[
  [0.03, 'stamp', 1.0], [K.email, 'pop', .6], [K.pesar, 'squish', .6], [K.trigo, 'stamp', .9],
  [K.hablo - 0.1, 'swoosh_up', .6], [K.arroba1, 'burst', .9], [K.arroba1 + 0.05, 'tada', .5], [K.yEs, 'pop', .7], [K.espanola + 0.15, 'stamp', 1.0],
  [B.B1, 'whoosh', .6], [K.arroba3, 'whoosh', .4], [K.arroba3 + 0.38, 'thud', .9], [K.peso, 'pop', .5], [K.once, 'stamp', .7], [K.medio + 0.2, 'ding', .8],
  [B.D1, 'paper', .7], [K.arabe, 'pop', .6], [K.significa, 'swoosh_up', .5], [K.cuarta, 'pop2', .8], [K.cuarta + 0.15, 'ding', .5],
  [B.E1, 'whoosh', .6], [K.mercaderes, 'scratch', .5], [K.mercaderes + 0.5, 'scratch', .5], [K.rapido, 'clockfast', .5],
  [B.F1, 'paper', .6], [K.asi, 'whoosh', .7], [K.a - 0.05, 'scratch', .8], [K.rabito - 0.15, 'swoosh_up', .6], [K.rabito + 0.3, 'scratch', .6], [K.alrE - 0.08, 'sparkle', .9], [K.alrE + 0.05, 'tada', .5],
  [B.G1, 'whoosh', .6], [K.registro + 0.1, 'paper', .7], [K.antiguo + 0.1, 'stamp', .7], [K.espana5, 'pop', .6],
  [B.H1, 'whoosh', .6], [K.mil1, 'stamp', .8], [K.ochoE, 'ding', .7], [K.aragon + 0.05, 'pop', .8],
  [B.I1, 'paper', .7], [K.arrobasT, 'pop2', .5], [K.trigo5, 'pop', .6],
  [B.J1, 'whoosh', .8], [K.sobrevivio, 'tada', .6], [K.comercio, 'cash', .7],
  [B.M1, 'whoosh', .6], [K.llego, 'boing', .7], [K.teclado, 'click', .6], [K.escribir, 'type', 1.0], [K.escribir + 0.1, 'bell', .5],
  [B.N1, 'whoosh', .6], [K.mil3, 'stamp', .8], [K.unoE, 'ding', .7], [K.ray, 'pop', .6], [K.ray + 0.75, 'emu', .8], [K.mando, 'swoosh_up', .7], [K.primer + 0.05, 'msg_out', .7],
  [B.O1, 'whoosh', .6], [K.unSimb, 'pop2', .5], [K.nadie, 'paper', .6], [K.nombres, 'tick', .5], [K.nombres + 0.6, 'stamp', .9],
  [B.P1, 'click', .5], [K.eligio, 'drumroll', .4], [K.arroba8, 'ding', .9], [K.arroba8 + 0.35, 'type', .6],
  [B.Q1, 'whoosh', .5], [K.ojo, 'stamp', 1.0], [K.origen + 0.1, 'pop2', .5], [K.discute - 0.3, 'pop', .5], [K.discute + 0.2, 'boing', .5],
  [K.pero, 'whoosh', .7], [K.siglo, 'stamp', .8], [K.arroba9, 'burst', .8], [K.ya, 'swoosh_up', .5], [K.trigo9, 'stamp', 1.0],
  [B.S1, 'whoosh', .6], [K.osea, 'typing', .6], [K.tu, 'ding', .5],
  [K.lleva, 'whoosh', .7], [K.saco, 'thud', 1.0], [K.once2, 'stamp', .8], [K.kilos2, 'glitch', .6],
  [K.lo, 'swoosh_up', .6], [K.sabias, 'pop', .7], [K.si, 'click', .9], [K.si + 0.1, 'msg_in', .5], [K.no, 'click', .9],
  [B.U1, 'whoosh', .6], [K.vecino, 'pop2', .6], [B.W1, 'whoosh', .5], [K.libro - 0.02, 'thud', 1.4], [K.libro + 0.15, 'sparkle', .5], [LOOP0, 'swoosh_up', .5],
].forEach(s => sfx(s[1], s[0], s[2]));
