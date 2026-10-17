/* Ep. 18 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.M1[0], S.O1[0]]];
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
  if (IN(t, K.real - 0.1, K.real + 0.7)) { o.bL = 10; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.ninguna, K.durara + 0.4)) { o.bL = 12; o.bR = 12; o.look = [8, 3]; }
  if (IN(t, K.dos - 0.1, K.dos + 0.8)) { o.bL = 14; o.bR = 16; o.look = [0, 0]; }
  if (IN(t, K.retiro, K.dias + 0.3)) { o.fan = Math.sin(t * 24) * 18 - 8; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.criticas, K.L5e + 0.2)) { o.bL = 10; o.bR = 4; o.look = [8, 4]; }
  vecFace(vecO, t, o);
}

/* ---------- avatares de comentarios: aficionados genéricos ---------- */
defsSvg.querySelector('defs').insertAdjacentHTML('beforeend', `<symbol id="fan1S" viewBox="0 0 360 460" overflow="visible">${fanBust(301, { hair: '#3a2a1e', c1: PINK })}</symbol><symbol id="fan2S" viewBox="0 0 360 460" overflow="visible">${fanBust(302, { moustache: true, cap: true, c1: '#5a7aa8' })}</symbol>`);
AV.FAR = ['fan1S', '70 70 220 220', 360, 460]; AV.SOL = ['fan2S', '70 70 220 220', 360, 460];

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ Himno XVIII 2007 ≠ ✔ ✘ ★ ♪ ✦ …</span>`).join('') + '<span>😳👍</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
[[K.letra0, .35, 16], [K.d18, .3, 10], [K.mGran + 0.3, .3, 10], [K.palabras, .35, 14], [K.real, .3, 10], [K.oficial, .35, 12],
 [K.usarse, .35, 14], [K.dos, .35, 14], [K.retiro, .35, 14], [K.ojo, .35, 14], [K.cante, .3, 10], [K.noes, .4, 18], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .6], [K.no0, 'boing', .5], [K.letra0, 'stamp', 1.0], [K.olvido, 'pop', .7],
  [S.B[0] + 0.05, 'whoosh', .6], [K.poq, 'pop2', .5], [K.mundo, 'pop', .6], [K.noL1, 'error', .5],
  [S.G1[0] + 0.05, 'whoosh', .5], [K.d18, 'stamp', .9], [K.militar, 'drumroll', .5], [K.mGran + 0.25, 'thud', .7],
  [S.G2[0] + 0.05, 'whoosh', .5], [K.desfilar, 'drumroll', .45], [K.sin, 'pop', .6], [K.palabras, 'stamp', 1.0],
  [S.M1[0] + 0.05, 'whoosh', .6], [K.tiempo, 'clockfast', .45], [K.convirtio + 0.2, 'scratch', .6], [K.real, 'stamp', .8], [K.real + 0.15, 'sparkle', .5],
  [K.pusieron, 'paper', .7], [K.varias, 'paper', .6], [K.letras + 0.2, 'paper', .6], [K.ninguna + 0.1, 'whoosh', .5], [K.oficial, 'stamp', .9], [K.durara, 'sad', .45],
  [S.D1[0] + 0.05, 'whoosh', .5], [K.dict, 'pop2', .6], [K.conocida, 'paper', .5],
  [S.D2[0] + 0.1, 'swoosh_up', .5], [K.democ, 'pop', .7], [K.dejo, 'paper', .5], [K.usarse, 'thud', 1.0],
  [S.Y1[0] + 0.05, 'whoosh', .6], [K.dos, 'stamp', 1.0], [K.dos + 0.15, 'ding', .6], [K.intento, 'scratch', .4], [K.otra, 'boing', .6],
  [S.Y2[0] + 0.05, 'whoosh', .5], [K.presento + 0.1, 'tada', .55], [K.retiro, 'stamp', 1.0], [K.pocos, 'paper', .6], [K.pocos + 0.35, 'paper', .5], [K.dias + 0.12, 'whoosh', .6], [K.criticas, 'error', .6],
  [K.ojo, 'stamp', 1.0], [K.tenga - 0.1, 'pop', .6], [K.no6, 'ding', .7], [K.nadie - 0.05, 'pop2', .6], [K.cante, 'error', .6],
  [S.O2[0] + 0.05, 'whoosh', .5], [K.tararea, 'pop', .6], [K.tararea + 0.75, 'emu', .9], [K.inventa, 'boing', .7], [K.suya, 'sparkle', .5],
  [S.HIT[0] + 0.05, 'whoosh', .6], [K.suena, 'pop2', .5], [K.nosabes, 'boing', .6], [K.noes - 0.02, 'burst', 1.0], [K.noes + 0.1, 'glitch', .6],
  [K.lo - 0.05, 'whoosh', .6], [K.lo + 0.2, 'pop', .7], [K.sabias - 0.1, 'msg_in', .6], [K.sabias + 0.35, 'msg_in', .6], [K.si + 0.3, 'click', .9], [K.noB + 0.2, 'pop2', .5],
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
