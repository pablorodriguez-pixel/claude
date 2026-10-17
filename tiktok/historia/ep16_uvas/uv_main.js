/* Ep. 16 · El Vecino en su óvalo, frame, temblores y efectos */
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
const OV_VIS = [[S.C1[0], S.C1[1]], [S.D1[0], S.D2[1]], [S.F1[0], S.F4[1]]];
const T_END = 9999;
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.cursi + 0.1, K.cursi + 0.9], [K.campanadas, K.campanadas + 0.7]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.diecinueve - 0.1, K.diecinueve + 0.8)) { o.look = [0, 0]; o.bL = 10; o.bR = 14; }
  if (IN(t, K.parecio, K.cursi + 0.1)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 12; o.bR = 12; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (IN(t, K.enorme, K.enorme + 0.8)) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.6); o.look = [0, -3]; }
  if (IN(t, K.pero, K.L5e + 0.2)) { o.fan = Math.sin(t * 22) * 18 - 8; o.look = [3, -2]; o.bL = 4; o.bR = 12; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ 12 UVAS 1909 150 ≠ ✦ ★</span>`).join('') + '<span>😳</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
    // la escena saliente se queda debajo 0,25 s mientras entra la siguiente (sin destellos de papel vacío)
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
[[0.0, .25, 10], [K.burla, .35, 16], [K.ti, .3, 12], [K.ochenta, .3, 8], [K.diecinueve, .35, 12], [K.champan, .3, 10], [K.cursi, .35, 16],
 [K.campanadas, .25, 8], [K.campanadas + 0.24, .25, 8], [K.campanadas + 0.48, .25, 8], [K.quedo, .4, 18], [K.ojo, .35, 14], [K.otra, .3, 10], [K.mil, .3, 10], [K.enorme + 0.1, .35, 14],
 [K.existia, .35, 14], [K.broma2, .35, 14], [K.ciento, .35, 14], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .8], [0.4, 'tick', .4], [0.9, 'tick', .4], [1.4, 'tick', .4], [1.9, 'tick', .4], [K.burla - 0.04, 'bell', .7], [K.burla, 'stamp', 1.0], [K.burla + 0.25, 'boing', .5],
  [S.B[0] + 0.05, 'whoosh', .6], [S.B[0] + 0.15, 'pop2', .5], [K.mejor, 'pop', .6], [K.burla2 + 0.05, 'squish', .5], [K.ti - 0.05, 'swoosh_up', .7], [K.ti + 0.05, 'pop', .8],
  [S.C1[0] + 0.05, 'whoosh', .6], [K.madrid, 'paper', .6], [K.ochenta, 'stamp', .9], [K.diecinueve, 'ding', .8], [K.diecinueve + 0.05, 'glitch', .4],
  [S.C2[0] + 0.05, 'whoosh', .6], [K.ricas, 'sparkle', .7], [K.copiaban, 'pop2', .4], [K.francesa - 0.05, 'pop', .7],
  [S.C3[0] + 0.05, 'whoosh', .5], [K.champan, 'pop', 1.0], [K.champan + 0.05, 'burst', .5], [K.uvas1 - 0.04, 'pop2', .6], [K.noche1, 'ding', .6],
  [S.D1[0] + 0.05, 'whoosh', .6], [K.gente - 0.2, 'pop2', .5], [K.cursi, 'stamp', 1.0], [K.cursi + 0.2, 'boing', .5],
  [S.D2[0] + 0.05, 'swoosh_up', .6], [K.puerta, 'pop', .6], [K.comerse - 0.15, 'emu', .9], [K.uvas2, 'pop2', .5],
  [K.campanadas, 'bell', .8], [K.campanadas + 0.24, 'bell', .7], [K.campanadas + 0.48, 'bell', .7], [K.campanadas + 0.14, 'gulp', .5],
  [S.D3[0], 'whoosh', .6], [K.cachondeo, 'pop', .6],
  [S.HIT1[0], 'burst', .6], [K.broma, 'pop', .6], [K.gusto + 0.2, 'pop2', .4], [K.tanto - 0.02, 'swoosh_up', .7], [K.tanto + 0.5, 'pop2', .4], [K.quedo, 'stamp', 1.0], [K.quedo + 0.1, 'tada', .6],
  [K.ojo, 'stamp', 1.0], [K.historia - 0.1, 'whoosh', .5], [K.mas - 0.05, 'swoosh_up', .5], [K.otra, 'error', .6],
  [S.F2[0] + 0.05, 'paper', .7], [K.mil, 'stamp', .8], [K.cosecha, 'pop', .6], [K.enorme - 0.05, 'boing', .8], [K.alicante, 'ding', .7],
  [S.F3[0], 'whoosh', .5], [K.promo, 'pop', .6], [K.vender, 'pop', .6], [K.uva - 0.05, 'pop', .6], [K.mas2, 'cash', .6],
  [S.F4[0], 'paper', .6], [K.extendiera - 0.1, 'sparkle', .6], [K.pero - 0.1, 'whoosh', .6], [K.costumbre - 0.1, 'swoosh_up', .5], [K.existia, 'stamp', 1.0],
  [S.HIT2[0], 'burst', .6], [K.cada - 0.05, 'pop2', .4], [K.repites - 0.05, 'pop2', .4], [K.broma2 - 0.02, 'burst', .9], [K.broma2 + 0.05, 'glitch', .5], [K.hace - 0.05, 'pop2', .4], [K.ciento, 'stamp', .9], [K.ciento + 0.15, 'ding', .6],
  [K.lo, 'whoosh', .6], [K.lo + 0.15, 'pop', .7], [K.lo + 0.27, 'pop', .6], [K.sabias + 0.1, 'msg_in', .6], [K.sabias + 0.45, 'msg_in', .6], [K.si + 0.1, 'click', .9], [K.si + 0.15, 'msg_in', .5],
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
