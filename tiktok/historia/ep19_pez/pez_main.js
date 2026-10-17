/* Ep. 19 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.B[0], S.E[0]], [K.ojo + 0.6, S.HIT2[0]]];
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
  ovalW.style.visibility = 'visible';
  const laugh = IN(t, K.comida + 0.1, K.comida + 0.8);
  const shk = laugh ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (laugh ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.demostrado - 0.1, K.demostrado + 0.8)) { o.look = [0, 0]; o.bL = 10; o.bR = 14; }
  if (IN(t, K.palanca, K.palanca + 0.8)) { o.bL = 8; o.bR = 12; }
  if (laugh) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (IN(t, K.acordando, K.L2e + 0.3)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.oirlo, K.oirlo + 0.7)) { o.bL = 16; o.bR = 16; o.look = [0, -3]; }
  if (IN(t, K.salio, K.salio + 0.8)) { o.he = true; o.jaw = 0.2; }
  if (IN(t, K.parecia, K.L5e + 0.3)) { o.fan = Math.sin(t * 22) * 18 - 8; o.look = [-3, 2]; o.bL = 6; o.bR = 14; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «» ♪♫♬ ✔ ✦ ♥ 3 s</span>`).join('') + '<span>😳</span>';
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

/* ---------- temblores (clavados a K) ---------- */
[[0.0, .25, 10], [K.no0, .3, 12], [K.se, .35, 16], [K.demostrado + 0.1, .3, 10], [K.palanca, .25, 8], [K.siguen, .25, 8], [K.acordando, .3, 10],
 [K.sonido, .25, 8], [K.oirlo, .3, 12], [K.mucho, .3, 8], [K.cristal, .3, 10], [K.comer, .3, 10], [K.memoria2, .4, 16], [K.ojo, .35, 14], [K.salio + 0.05, .35, 12],
 [K.parecia, .35, 12], [K.sabe6, .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [0.1, 'bell', .35], [K.no0, 'boing', .5], [K.tres, 'tick', .6], [K.seg, 'tick', .6], [K.se, 'stamp', 1.0], [K.acuerda, 'swoosh_up', .5], [K.ti - 0.05, 'heart', .8],
  [S.B[0] + 0.05, 'whoosh', .6], [K.demostrado - 0.2, 'pop2', .5], [K.demostrado + 0.1, 'stamp', .9], [K.experimentos + 0.05, 'pop', .6], [K.experimentos + 0.3, 'tick', .5], [K.experimentos + 0.5, 'tick', .5],
  [S.C1[0] + 0.05, 'whoosh', .6], [K.estudios, 'pop', .6], [K.empujar - 0.2, 'swoosh_up', .5], [K.palanca, 'click', 1.0], [K.caiga, 'pop2', .5], [K.comida - 0.05, 'gulp', .8], [K.comida + 0.15, 'pop', .5],
  [K.semanas - 0.15, 'whoosh', .5], [K.semanas + 0.2, 'paper', .7], [K.semanas + 0.55, 'paper', .6], [K.semanas + 0.85, 'paper', .6], [K.siguen, 'click', 1.0], [K.acordando + 0.1, 'stamp', .8], [K.acordando + 0.35, 'gulp', .6],
  [S.D1[0] + 0.05, 'whoosh', .6], [K.sonido, 'bell', 1.0], [K.significa, 'pop', .7], [K.comida2, 'ding', .8], [K.comida2 + 0.15, 'boing', .5],
  [S.D2[0] + 0.05, 'whoosh', .5], [S.D2[0] + 0.15, 'clockfast', .6], [K.oirlo, 'bell', 1.0], [K.oirlo + 0.12, 'swoosh_up', .6], [K.mucho, 'stamp', .8],
  [S.E[0] + 0.05, 'whoosh', .6], [K.casa, 'pop', .6], [K.visto - 0.1, 'emu', .9], [K.acerca, 'swoosh_up', .5], [K.cristal, 'squish', .9], [K.llegas - 0.15, 'click', .7], [K.llegas + 0.1, 'pop2', .5], [K.comer - 0.05, 'ding', .9], [K.comer + 0.1, 'heart', .8],
  [K.eso - 0.08, 'burst', .9], [K.memoria2, 'stamp', .8], [K.memoria2 + 0.15, 'sparkle', .7],
  [K.ojo, 'stamp', 1.0], [K.nadie, 'pop2', .5], [K.nadie + 0.25, 'pop2', .4], [K.donde - 0.1, 'paper', .8], [K.salio + 0.05, 'stamp', 1.0], [K.tres2 - 0.05, 'tick', .6],
  [S.F2[0] + 0.05, 'whoosh', .5], [K.repitio - 0.25, 'pop', .6], [K.repitio + 0.15, 'pop', .5], [K.repitio + 0.55, 'pop', .5], [K.tanto, 'pop', .5], [K.tanto + 0.35, 'pop', .5], [K.parecia, 'thud', .9], [K.verdad + 0.15, 'scratch', .6],
  [S.HIT2[0] + 0.05, 'burst', .9], [S.HIT2[0] + 0.05, 'pop', .5], [K.tu6, 'pop', .6], [K.sabe6, 'stamp', 1.0], [K.sabe6 + 0.05, 'glitch', .5], [K.quien, 'pop2', .5], [K.comer6 - 0.05, 'heart', .8],
  [K.te - 0.1, 'whoosh', .6], [K.te + 0.1, 'pop', .7], [K.te + 0.22, 'pop', .6], [K.te + 0.55, 'msg_in', .6], [K.te + 1.15, 'msg_in', .6], [K.te + 1.75, 'msg_in', .6], [K.si + 0.12, 'click', .9], [K.noB + 0.2, 'pop2', .5],
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
