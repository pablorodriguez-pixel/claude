/* Ep. 30 · El Vecino en su óvalo, frame, temblores, efectos y bucle (plantilla Ep. 25) */
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
const OV_VIS = [[S.D1[0], S.D5[0]], [S.F1[0], S.F3[0]], [S.G1[0], S.G2[0]], [S.H0[0], S.K0[0]], [S.K2[0], S.BK[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX, y: CY, s: CS * kin, r: 0, o: 1 - kout };
  }
  return null;
}
const LAUGH = [[K.bonitas + 0.05, K.pero8 + 0.1]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.trescientos - 0.1, K.trescientos + 0.8)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.peso4 - 0.1, K.espanol4 + 0.6)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.mano - 0.1, K.mano + 0.6)) { o.bL = 12; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.copio - 0.1, K.peso6 + 0.6)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.mismo6b - 0.1, K.simbolo6 + 0.6)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.mil - 0.1, K.siete + 0.4)) { o.he = true; o.bL = 10; o.bR = 10; }
  if (IN(t, K.ojo - 0.05, K.teorias + 0.4)) { o.bL = 12; o.bR = 4; o.look = [-5, -2]; }
  if (IN(t, K.tiene - 0.1, K.pruebas + 0.5)) { o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600', 'SpaceMono;font-weight:700'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ $ «pesos» PESO DÓLAR ESPAÑOL Mº TEORÍA COLUMNAS 1857 ★ ♥ ✦ ↗ 👇 …</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage', '700 40px SpaceMono'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- frame ---------- */
// toda escena sigue 0,25 s debajo de la siguiente (sin fotogramas de papel vacío). Excepciones: el montaje E0 (va encima del lienzo D5),
// el balcón (va después en el DOM: taparía al plano siguiente) y el libro final.
SC.forEach(s => { if (s.t0 === S.E0[0] || s.t0 === S.BAL[0] || s.t0 === S.BK[0]) s.noExt = true; });
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.noExt ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 + 0.03 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updSteps(t);
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.S0, .3, 16], [K.pesos1, .35, 16], [K.tres3, .25, 8], [S.D1[0] + 0.55, .25, 10], [K.peso4, .35, 16], [K.pesos4 - 0.04, .3, 12], [K.rayaE + 0.02, .45, 22],
 [K.copio + 0.05, .3, 12], [K.simbolo6, .3, 14], [K.mil, .35, 16], [K.ojo, .3, 10], [K.tiene, .3, 12], [K.pesos9, .45, 22], [K.venia + 0.5, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.una0 - 0.2, 'swoosh_up', .6], [K.S0, 'error', .6], [K.S0 + 0.05, 'stamp', .8],
  [S.A2[0], 'whoosh', .5], [K.palabra0 - 0.1, 'pop', .5], [K.espanol0, 'pop2', .5],
  [S.B1[0], 'whoosh', .5], [K.garabato, 'paper', .5], [S.B2[0], 'whoosh', .5], [K.pesos1, 'tada', .7], [K.pesos1 + 0.05, 'stamp', .7],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.vecino + 0.1, 'ping', .6],
  [S.C1[0], 'paper', .6], [S.C1[0] + 0.3, 'scratch', .35], [S.C2[0], 'whoosh', .5], [K.unidos3, 'boing', .5], [K.tres3, 'pop', .6], [K.tres3 + 0.12, 'pop', .5], [K.tres3 + 0.24, 'pop2', .6],
  [STEPS[0][1], 'swoosh_up', .6], [STEPS[0][1] + 0.05, 'stamp', .6], [S.D1[0] + 0.5, 'cash', .6], [S.D1[0] + 0.68, 'cash', .5], [S.D2[0], 'whoosh', .5], [K.medio, 'sparkle', .4],
  [S.D3[0], 'whoosh', .5], [K.peso4, 'stamp', 1.0], [S.D4[0], 'paper', .7], [S.D4[0] + 0.3, 'scratch', .3], [K.mano, 'pop', .4],
  [S.D5[0], 'paper', .5], [K.P4 - 0.05, 'scratch', .45], [K.S4 - 0.04, 'scratch', .4], [K.pequenita, 'ding', .5], [K.pesos4 - 0.04, 'stamp', .8],
  [STEPS[1][1], 'swoosh_up', .6], [STEPS[1][1] + 0.05, 'stamp', .6], [S.E0[0], 'whoosh', .6], [S.E0[0] + 0.1, 'type', .4], [S.E0[1], 'whoosh', .5],
  [K.S5 - 0.06, 'swoosh_up', .45], [K.montando, 'squish', .4], [K.P5b - 0.08, 'scratch', .45], [K.raya, 'tada', .7], [K.rayaE + 0.02, 'stamp', 1.1],
  [STEPS[2][1], 'swoosh_up', .6], [STEPS[2][1] + 0.05, 'stamp', .6], [S.F1[0], 'whoosh', .5], [K.creo, 'pop2', .5], [K.dolar6, 'boing', .4],
  [S.F2[0], 'whoosh', .5], [S.F2[0] + 0.3, 'thud', .5], [K.copio, 'swoosh_up', .5], [K.copio + 0.05, 'stamp', .9],
  [S.F3[0], 'whoosh', .5], [K.mismo6, 'ding', .5], [K.mismo6b, 'pop', .5], [K.simbolo6, 'stamp', .9],
  [S.G1[0], 'whoosh', .5], [K.pesos7 + 0.05, 'squish', .5], [S.G2[0], 'whoosh', .5], [K.mil, 'stamp', 1.0], [S.G2[0] + 0.35, 'cash', .7],
  [K.ojo, 'stamp', 1.0], [K.otras, 'pop', .5], [S.H1[0], 'whoosh', .5], [T_EMU, 'emu', .9],
  [S.H2[0], 'whoosh', .5], [K.bonitas, 'heart', .5], [K.tiene, 'stamp', .9],
  [S.K0[0], 'paper', .6], [K.tu9, 'pop', .5], [K.escribes, 'scratch', .45], [K.simbolo9 + 0.4, 'scratch', .45], [K.dolar9 + 0.75, 'sparkle', .7], [K.dolar9 + 1.05, 'ding', .5],
  [S.K1[0], 'whoosh', .6], [K.pesos9, 'stamp', 1.2], [K.pesos9 + 0.05, 'glitch', .4], [K.espanol9, 'pop2', .5],
  [S.K2[0], 'whoosh', .6], [K.pais, 'pop', .4], [K.llamais, 'pop', .4], [K.os, 'ding', .7],
  [S.BK[0], 'whoosh', .5], [K.venia + 0.5, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
