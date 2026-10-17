/* Ep. 23 · El Vecino en su óvalo, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.C[0], S.H[0]], [S.I[0], S.L[0]], [S.M[0], S.BAL[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.tambien + 0.1, K.tambien + 0.9], [K.C4 + 0.15, K.C4 + 0.85]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.proposito - 0.1, K.proposito + 0.8)) { o.bL = 4; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.OW - 0.1, K.OW + 0.9)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.sobrevivio, K.sobrevivio + 0.9)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.old, K.old + 0.9)) { o.bL = 10; o.bR = 14; o.he = true; }
  if (IN(t, K.os - 0.05, K.L4e + 0.2)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «oll korrect» O.K. A.C. O.W. ✔ ★ ✦ ❤ 👇 🤔 👀 …</span>`).join('') + '<span>😳</span>';
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
[[K.si, .35, 16], [K.absurdo, .3, 10], [K.korrect, .25, 6], [K.proposito, .3, 12], [K.A2 + 0.05, .25, 8], [K.C2 + 0.04, .35, 14], [K.unica, .25, 8],
 [K.OW, .35, 14], [K.ola, .25, 8], [K.ase, .3, 12], [K.ok2, .3, 10], [K.buren, .25, 8], [K.old, .3, 10], [K.ok3, .4, 18], [K.A4, .3, 12], [K.C4 + 0.15, .25, 8], [K.os, .25, 8], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .7], [0.25, 'msg_in', .5], [K.A1, 'pop2', .5], [K.C1, 'pop2', .5], [K.si, 'stamp', 1.0], [K.daniela, 'ding', .6],
  [S.B[0] + 0.05, 'whoosh', .6], [K.aun, 'swoosh_up', .5], [K.absurdo, 'boing', .8], [K.absurdo + 0.1, 'pop', .5],
  [S.C[0] + 0.02, 'paper', .7], [K.ok1, 'pop', .6], [K.oll - 0.05, 'whoosh', .5], [K.korrect, 'type', .5],
  [S.D[0] + 0.03, 'whoosh', .5], [K.all, 'scratch', .7], [K.correct, 'scratch', .7], [K.proposito, 'stamp', 1.0],
  [K.bien2, 'type', .6], [K.seria2, 'squish', .6], [K.A2, 'ding', .7], [K.C2 + 0.04, 'stamp', 1.0],
  [S.F[0], 'whoosh', .5], [K.unica, 'pop2', .6], [K.tambien + 0.1, 'pop', .5],
  [S.G[0], 'paper', .7], [K.OW, 'stamp', .9], [K.oll2, 'typing', .6], [K.wright + 0.2, 'pop', .6],
  [S.H[0], 'burst', .8], [K.ola, 'msg_in', .7], [K.ase, 'glitch', .5], [K.ase + 0.25, 'msg_out', .5], [K.epoca, 'pop', .6],
  [S.I[0], 'whoosh', .6], [T_EMU, 'emu', .9], [K.ok2 - 0.15, 'boing', .6], [K.ok2, 'sparkle', .6],
  [S.J[0], 'tada', .5], [K.campana, 'pop', .5], [K.buren, 'ding', .6],
  [S.KB[0], 'whoosh', .5], [K.old - 0.12, 'swoosh_up', .7], [K.kinder + 0.1, 'pop', .5],
  [S.L[0], 'burst', .8], [K.ok3, 'stamp', 1.0], [K.ok3 + 0.05, 'glitch', .5], [K.otra, 'pop', .6],
  [S.M[0], 'whoosh', .6], [S.M[0] + 0.25, 'msg_in', .6], [K.bien4 - 0.2, 'typing', .5], [K.hoy + 0.05, 'scratch', .5], [K.A4, 'msg_out', .8], [K.C4 + 0.15, 'msg_in', .7],
  [S.N[0], 'whoosh', .6], [K.huele, 'pop', .5], [K.rara + 0.1, 'pop', .5], [K.ti + 0.05, 'pop', .5], [K.os, 'ding', .7],
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
