/* Ep. 14 · El Vecino en su óvalo, frame, temblores, sonido y bucle */
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
const OV_VIS = [[S.C[0], S.D1[0]], [S.E[0], S.F2[0]], [S.G1[0], S.I[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const IN = (t, a, b) => t > a && t < b;
const LAUGH = [[K.lleven + 0.3, K.lleven + 1.0]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.carisimo, K.carisimoE + 0.3)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.abreviaban, K.podian)) { o.look = [8, -4]; o.bL = 6; o.bR = 10; }
  if (IN(t, K.enes, K.L4e + 0.4)) { o.he = true; o.jaw = 0.2; }
  if (IN(t, K.sin, K.ene5e + 0.4)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (IN(t, K.propia, K.L7e + 0.3)) { o.he = true; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:700;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:500;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑñ¿¡ abreviaban annus 1991 ✍ ✦ ↑ ↓ ~</span>`).join('') + '<span>😳🤯</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 700 40px Playfair', 'italic 500 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
[[K.ahorrar0 + 0.02, .3, 12], [K.ahorrar0 + 0.3, .3, 10], [K.saca, .35, 14], [K.carisimo, .3, 10], [K.una, .3, 8], [K.sombrero + 0.05, .3, 12], [K.ene4, .3, 10],
 [K.mil, .3, 12], [K.ene5, .3, 10], [K.escandalo, .4, 18], [K.nacional, .3, 12], [K.obligo, .35, 14], [K.lleven + 0.3, .3, 10], [K.ojo, .35, 14], [K.letra7, .3, 10],
 [K.ahorrar8, .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
[
  [0.02, 'pop', .5], [K.ene0, 'boing', .6], [K.monjes - 0.08, 'swoosh_up', .6], [K.ahorrar0 - 0.06, 'whoosh', .6], [K.ahorrar0 + 0.02, 'thud', .8], [K.ahorrar0 + 0.46, 'cash', 1.0], [K.ahorrar0 + 0.3, 'stamp', .8],
  [S.B[0] + 0.05, 'whoosh', .6], [K.noventa, 'pop', .6], [K.europa1, 'pop2', .7], [K.casi - 0.1, 'swoosh_up', .5], [K.saca, 'boing', .8], [K.saca + 0.15, 'whoosh', .7], [K.teclado1, 'ding', .6],
  [S.C[0] + 0.05, 'whoosh', .6], [K.L2, 'bell', .6], [K.libros, 'thud', .5], [K.copiaban, 'scratch', .5], [K.mano, 'pop', .5], [K.pergamino, 'paper', .8], [K.carisimo, 'cash', .9], [K.carisimo + 0.1, 'boing', .5],
  [S.C2[0], 'paper', .7], [K.abreviaban + 0.12, 'squish', .7], [K.abreviaban + 0.6, 'scratch', .5], [K.todo, 'swoosh_up', .5], [K.podian, 'stamp', .8],
  [S.D1[0], 'paper', .6], [K.letra, 'scratch', .6], [K.doble1, 'scratch', .6], [K.doble1 + 0.1, 'pop', .6], [K.solo, 'tick', .5], [K.una, 'squish', .8], [K.rayita - 0.05, 'scratch', .8], [K.encima, 'ding', .8],
  [S.D2[0] + 0.05, 'whoosh', .5], [K.doble2, 'pop', .7], [K.ene2, 'pop2', .7], [K.acabo + 0.8, 'burst', .6], [K.sombrero - 0.3, 'swoosh_up', .5], [K.sombrero + 0.05, 'boing', .9], [K.ene4, 'tada', .8],
  [S.E[0] + 0.05, 'paper', .7], [K.ano, 'pop', .6], [K.viene, 'swoosh_up', .4], [K.annus, 'scratch', .6], [K.dos, 'tick', .7], [K.enes, 'tick', .7], [K.enes + 0.25, 'ding', .7],
  [S.F1[0] + 0.05, 'whoosh', .5], [K.mil, 'stamp', 1.0], [K.europa2, 'pop2', .6], [K.pidio, 'whoosh', .6], [K.espana1, 'pop', .6], [K.sin, 'error', .8], [K.ene5, 'stamp', .7],
  [K.se5 - 0.12, 'burst', .8], [S.F2[0] + 0.1, 'paper', .7], [K.escandalo, 'stamp', 1.1], [K.nacional, 'glitch', .6],
  [S.G1[0] + 0.05, 'whoosh', .6], [K.norma, 'paper', .7], [K.obligo, 'stamp', 1.0], [K.espana2, 'pop', .5], [K.lleven - 0.1, 'swoosh_up', .6], [K.lleven + 0.3, 'click', 1.0], [K.lleven + 0.35, 'sparkle', .7],
  [S.G2[0], 'whoosh', .6], [K.hasta + 0.05, 'type', .6], [K.hasta + 0.3, 'type', .6], [K.hasta + 0.52, 'type', .6], [K.hasta + 0.25, 'emu', .9],
  [K.ojo, 'stamp', 1.0], [K.rayita2 - 0.05, 'scratch', .7], [K.copistas2 - 0.1, 'swoosh_up', .5], [K.muchas, 'pop', .5], [K.muchas + 0.27, 'pop2', .5], [K.letras, 'pop', .5],
  [K.pero, 'whoosh', .7], [K.castellano - 0.2, 'swoosh_up', .6], [K.letra7 - 0.1, 'boing', .6], [K.propia, 'tada', .8],
  [S.I[0], 'burst', .9], [K.espanola, 'pop', .6], [K.abecedario, 'pop2', .5], [K.ahorrar8 - 0.02, 'burst', 1.0], [K.tinta, 'glitch', .6], [K.tinta + 0.1, 'stamp', .7],
  [K.lo - 0.12, 'whoosh', .6], [K.lo + 0.1, 'pop', .7], [K.lo + 0.22, 'pop', .6], [K.lo + 0.2, 'msg_in', .6], [K.sabias + 0.35, 'msg_in', .6], [K.sabias + 0.75, 'msg_in', .6], [K.si + 0.35, 'click', .9], [K.noB + 0.2, 'pop2', .5],
  [S.C9[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L9[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
