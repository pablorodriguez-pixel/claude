/* Ep. 24 · El Vecino en su óvalo, barra 1·2·3·4, frame, temblores, efectos y bucle */
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
const OV_VIS = [[K.mil0 - 0.3, S.D[0]], [S.BOOK[0], S.H[1]], [S.J[0], S.P[0]], [S.R1[0], S.SJ[0]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.milote + 0.05, K.milote + 1.0], [K.bronca + 0.05, K.bronca + 0.9]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.colado - 0.1, K.patas + 0.5)) { o.bL = 4; o.bR = 16; o.look = [0, 0]; }
  if (IN(t, K.mitad - 0.05, K.mitad + 0.8)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.veintiuno, K.veintiuno + 0.8)) { o.bL = 12; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.no3 - 0.1, S.H[0])) { o.bL = 10; o.bR = 14; o.he = true; }
  if (IN(t, K.millon, K.millon + 0.8)) { o.bL = 14; o.bR = 14; o.look = [6, -6]; }
  if (IN(t, K.M5, K.M5 + 0.8)) { o.bL = 4; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.D, K.quinientos + 0.8)) { o.bL = 12; o.bR = 12; o.look = [6, -4]; }
  if (IN(t, K.ojo - 0.05, K.ojo + 0.8)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.nadie, K.probado + 0.6)) { o.bL = 2; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.C9, K.C9 + 0.8)) { o.bL = 12; o.bR = 12; o.look = [8, -6]; }
  if (IN(t, K.primero9, K.primero9 + 0.9)) { o.fan = Math.sin(t * 24) * 18; o.bL = 10; o.bR = 10; o.look = [6, -4]; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}
/* barra 1·2·3·4 */
const LB_ON = [S.B[0], S.P[0]], LB_IN = [S.B[0] + 0.05, K.tres, K.miles, K.mas], LB_CUR = [S.B[0], K.dos3, K.tres4, K.cuatro, 1e9];
function updBar(t) {
  const on = t >= LB_ON[0] && t < LB_ON[1];
  LB.wrap.style.visibility = on ? 'visible' : 'hidden'; if (!on) return;
  let cur = 0; for (let i = 0; i < 4; i++) if (t >= LB_CUR[i]) cur = i;
  LB.items.forEach((e, i) => {
    const k = pop(t, LB_IN[i], 0.4);
    const done = i < cur, now = i === cur;
    e.style.background = now ? YEL : done ? INK : '#FBF6EA'; e.style.color = done ? YEL : INK;
    e.textContent = done ? '✔' : String(i + 1);
    const bump = now ? 1 + 0.12 * (1 - p(t, LB_CUR[i], 0.4)) : 1;
    set(e, { s: k * bump * (now ? 1.12 : 0.92), o: t < LB_IN[i] ? 0 : 1 });
  });
}

/* ---------- precarga de fuentes (invisible) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ «MILLE» 1.000 1.306 ✔ ★ ✦ ❤ 👇 🤔 👀 🥇 ⏳ 💧 ∞ …</span>`).join('');
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
  updOval(t); updBar(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
// la portada (A) y la escena del libro no se deslizan al entrar: son cortes
SC.filter(s => s.t0 === S.A[0] || s.t0 === S.H[1]).forEach(s => s.cut = true);

/* ---------- temblores ---------- */
[[K.mitad + 0.05, .35, 16], [K.veintiuno, .4, 18], [K.mil2, .4, 18], [K.colado2, .3, 12], [K.libro3 - 0.04, .4, 18], [K.colo + 0.25, .3, 12],
 [K.millon, .3, 10], [K.milG, .3, 12], [K.milote, .4, 18], [K.M5 + 0.12, .3, 12], [K.quinientos, .35, 16], [K.gano + 0.2, .3, 10], [K.mille, .3, 12],
 [K.ojo, .35, 14], [K.nadie, .35, 14], [K.mil8, .3, 10], [K.C9 + 0.05, .3, 12], [K.lunes, .3, 10], [K.primero9 + 0.4, .35, 14], [K.jose, .35, 16],
 [K.vota, .3, 10], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'pop', .7], [0.1, 'swoosh_up', .4], [K.colado, 'boing', .5], [K.mil0 - 0.3, 'pop2', .5],
  [S.B[0] + 0.03, 'whoosh', .6], [K.mitad + 0.05, 'stamp', 1.0], [S.C[0] + 0.05, 'whoosh', .6], [K.conocio, 'tick', .5], [K.veintiuno, 'stamp', 1.0], [K.veintiuno + 0.22, 'ding', .7],
  [S.D[0], 'burst', .8], [K.mil2, 'tada', .8], [K.mil2 + 0.05, 'paper', .5], [T_EMU, 'emu', .9], [T_EMU + 0.2, 'squish', .5],
  [S.E[0], 'whoosh', .5], [K.tres, 'pop', .5], [K.miles, 'pop', .5], [K.mas, 'pop', .5], [K.colado2, 'stamp', .9],
  [S.BOOK[0], 'whoosh', .6], [K.las - 0.05, 'paper', .8], [K.aladino - 0.05, 'swoosh_up', .6], [K.no3, 'error', .6],
  [S.H[0], 'burst', .8], [S.H[0] + 0.02, 'glitch', .5], [S.H[1], 'whoosh', .6], [K.colo + 0.25, 'stamp', 1.0], [K.frances + 0.05, 'pop', .5], [K.siglos, 'clockfast', .5],
  [S.J[0], 'whoosh', .6], [K.tres4 + 0.2, 'squish', .5], [K.millon, 'boing', .8], [K.italiano, 'pop', .5], [K.milG, 'stamp', .9],
  [S.JH[0], 'burst', .8], [K.milote, 'glitch', .5], [K.milote + 0.15, 'pop2', .6],
  [S.ROM[0], 'whoosh', .6], [K.M5 + 0.12, 'error', .6], [K.era + 0.1, 'scratch', .6], [K.era + 0.6, 'tick', .4], [K.garabatoE - 0.1, 'ding', .6],
  [K.partelo, 'scratch', .8], [K.sale - 0.15, 'swoosh_up', .6], [K.D, 'pop', .7], [K.quinientos, 'stamp', 1.0],
  [S.N[0], 'whoosh', .6], [K.gano - 0.05, 'tada', .5], [K.mille - 0.05, 'paper', .6],
  [K.ojo, 'stamp', 1.0], [K.hay, 'pop', .5], [K.cree, 'pop2', .5], [K.salio - 0.05, 'sparkle', .7], [K.nadie, 'stamp', .9], [K.probado, 'pop', .5],
  [S.P[0], 'whoosh', .6], [K.mil8, 'ding', .8], [K.casi, 'sparkle', .5], [K.y8, 'swoosh_up', .5], [K.conozco, 'pop', .5],
  [S.R1[0], 'msg_in', .7], [K.A9, 'type', .5], [K.C9 + 0.05, 'stamp', .9], [S.R2[0], 'msg_in', .7], [K.lunes - 0.05, 'boing', .6],
  [S.R3[0], 'msg_in', .7], [K.primero9 - 0.05, 'swoosh_up', .5], [K.primero9 + 0.4, 'cash', .8],
  [S.SJ[0], 'burst', .8], [K.no10, 'paper', .7], [K.jose, 'error', .7],
  [S.T[0], 'whoosh', .6], [K.alejandro - 0.1, 'swoosh_up', .5], [K.cero - 0.1, 'swoosh_up', .5], [K.revancha - 0.1, 'swoosh_up', .5], [K.vota, 'ding', .7], [K.A11, 'click', .6], [K.B11, 'click', .6], [K.C11, 'click', .6],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.mil12 + 0.1, 'tada', .5], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
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
