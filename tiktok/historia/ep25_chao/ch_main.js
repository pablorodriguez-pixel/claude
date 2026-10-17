/* Ep. 25 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 23) */
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
const OV_VIS = [[S.B[0], S.F[0]], [S.G[0], S.R1[0]], [S.T1[0], S.U1[0]], [S.U3[0], S.BAL[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.harias + 0.05, K.harias + 0.5], [K.barrio + 0.1, K.barrio + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.jefe - 0.1, K.jefe + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.gasto - 0.1, K.gasto + 0.8)) { o.bL = 12; o.bR = 12; o.look = [0, -4]; }
  if (IN(t, K.chau4 - 0.1, K.chau4 + 0.8)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.nadie - 0.1, K.vendia + 0.6)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.cuantas - 0.1, K.hoy6 + 0.4)) { o.look = [0, 0]; o.bL = 10; o.bR = 4; }
  if (IN(t, K.servus - 0.1, K.servus + 0.9)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.latin - 0.1, K.L8e + 0.2)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑÀČ¿¡ «s-ciào vostro» CHAO CHAU TSCHAU SERVUS SERVVS ✦ 🎩 👇 …</span>`).join('');
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
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.promesa0, .3, 10], [K.jefe, .25, 8], [K.aumento + 0.35, .3, 10], [K.esclavo1, .4, 20], [K.gasto, .3, 12], [K.vostro2 + 0.1, .25, 8], [K.ciao, .3, 12], [K.chao4, .35, 14],
 [K.vendia, .3, 12], [K.servidor, .3, 10], [K.ordenes, .25, 8], [K.barrio, .35, 16], [K.chau7a, .25, 8], [K.chau7b, .25, 8], [K.chau7c, .3, 12], [K.servus, .3, 12],
 [K.esclavo8, .4, 22], [K.esclavo9, .35, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.adios - 0.05, 'pop', .6], [K.promesa0, 'swoosh_up', .7], [K.promesa0 + 0.15, 'pop2', .6],
  [S.B[0] + 0.05, 'paper', .7], [K.promesa1 + 0.1, 'scratch', .4], [K.harias, 'boing', .5],
  [S.C[0] + 0.02, 'whoosh', .5], [K.jefe, 'pop', .6], [K.aumento - 0.1, 'cash', .7], [K.aumento + 0.35, 'thud', .6], [K.aumento + 0.45, 'stamp', .7],
  [S.D[0] + 0.03, 'whoosh', .6], [K.venecia, 'ding', .5], [K.eschao1 - 0.03, 'pop', .7],
  [S.F[0], 'whoosh', .5], [K.soy2, 'pop2', .5], [K.esclavo1, 'stamp', 1.1],
  [S.G[0], 'burst', .5], [S.G[0] + 0.25, 'pop', .4], [S.G[0] + 0.55, 'pop2', .4],
  [S.H[0], 'whoosh', .5], [K.gasto, 'glitch', .4], [K.vostro2 + 0.05, 'squish', .6], [K.a3 + 0.05, 'squish', .5], [K.ciao, 'ding', .8],
  [S.I[0], 'whoosh', .5], [K.salto, 'swoosh_up', .5], [K.espanol, 'swoosh_up', .5], [K.chao4, 'tada', .6], [K.chao4 + 0.05, 'thud', .5],
  [S.J[0], 'paper', .6], [K.o4 + 0.1, 'pop', .4], [K.o4 + 0.35, 'pop', .4], [K.argentina, 'pop2', .6], [K.uruguay, 'pop2', .6],
  [K.ojo, 'stamp', 1.0], [K.vendia, 'error', .6], [S.O2[0], 'whoosh', .5], [K.servidor, 'stamp', .8], [S.O3[0], 'whoosh', .5], [K.ordenes - 0.05, 'stamp', .7],
  [S.Q1[0], 'swoosh_up', .5], [K.dicho, 'pop', .4], [K.hoy6, 'pop', .4], [S.Q2[0], 'whoosh', .5], [S.Q2[0] + 0.2, 'click', .5], [K.esclavo6, 'pop2', .5], [K.barrio, 'stamp', 1.0],
  [S.Q3[0], 'swoosh_up', .6], [K.unico, 'sparkle', .5],
  [S.R1[0], 'whoosh', .6], [K.chau7a, 'pop', .8], [S.R2[0], 'whoosh', .6], [K.chau7b, 'pop', .8], [S.R3[0], 'whoosh', .6], [K.chau7c, 'pop', .8], [T_EMU, 'emu', .9],
  [S.T1[0], 'whoosh', .6], [K.austria, 'pop', .5], [K.baviera, 'pop', .5], [K.servus - 0.1, 'swoosh_up', .6], [K.servus + 0.05, 'bell', .6],
  [K.latin - 0.1, 'whoosh', .6], [K.significa8, 'drumroll', .5], [K.esclavo8, 'stamp', 1.2],
  [S.U1[0], 'paper', .6], [K.osea + 0.05, 'pop', .4], [K.media, 'pop', .4], [K.europa, 'pop', .4], [S.U2[0], 'burst', .8], [K.esclavo9, 'glitch', .5],
  [S.U3[0], 'whoosh', .6], [K.despides, 'pop', .4], [K.pais, 'pop', .4], [K.os, 'ding', .7],
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
