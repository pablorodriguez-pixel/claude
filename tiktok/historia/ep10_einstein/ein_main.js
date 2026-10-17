/* Ep. 7 · El Vecino en su óvalo, frame, temblores y efectos */
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
const OV_VIS = [[S.D[0], S.HIT1[0]], [S.I1[0], S.HIT2[0]]];
const T_END = 9999;
function ovalState(t) {
  if (t >= T_END) { const k = pop(t, T_END + 0.05, 0.5); return { x: 335, y: -600, s: 1.12 * k, r: -3 + wobble(t, 0.4, 1.5), o: t < T_END + 0.05 ? 0 : 1 }; }
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[K.suspenso, K.suspenso + 0.8]];
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.bulo - 0.1, K.bulo + 0.7)) { o.look = [0, 0]; o.bL = 10; o.bR = 14; }
  if (IN(t, K.publico, K.mundo)) { o.bL = 8; o.bR = 12; }
  if (IN(t, K.susp1, K.L4e + 0.3)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.suspendi, K.mat2e)) { o.bL = 12; o.bR = 12; }
  if (IN(t, K.susp2, S.G3[1])) { o.he = true; o.jaw = 0.2; }
  if (IN(t, K.notazas, K.notazas + 0.9)) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.6); o.look = [0, -3]; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (IN(t, K.noesta, K.L8e + 0.2)) { o.fan = Math.sin(t * 22) * 18 - 8; o.look = [-3, 2]; }
  if (t >= T_END) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.jaw = 0; }
  vecFace(vecO, t, o);
}
/* ---------- contadores del bucle abierto «1» y «2» ---------- */
const BADGES = [[loopBadge(world, 1), K.L4 + 0.05, S.G1[0]], [loopBadge(world, 2), K.L6 + 0.05, S.HIT1[0]]];
function updBadges(t) { BADGES.forEach(([b, a, e]) => { const on = t >= a && t < e; b.style.visibility = on ? 'visible' : 'hidden'; if (on) set(b, { s: pop(t, a, 0.4) * (1 - p(t, e - 0.12, 0.12, E.inCubic)), r: -8 + wobble(t, 0.5, 3) }); }); }

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ Einstein 1935 ∫ ✔ ✘ ★ − ★</span>`).join('') + '<span>👌👍</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
  updOval(t); updBadges(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores (clavados a K) ---------- */
[[0.0, .25, 10], [K.no2, .3, 12], [K.vida, .35, 16], [K.desm, .3, 8], [K.L4e - 0.6, .3, 8], [K.leyo + 0.35, .35, 10],
 [K.susp2, .4, 18], [K.frances1, .35, 14], [K.ojo, .35, 14], [K.noesta, .35, 12], [K.no9, .3, 10], [K.frances2, .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'stamp', 1.0], [K.no1, 'boing', .5], [K.no2, 'stamp', .8], [K.nunca, 'pop', .7], [K.susp0, 'scratch', .7], [K.colado + 0.1, 'whoosh', .5], [K.vida, 'stamp', 1.0],
  [S.B[0] + 0.05, 'whoosh', .6], [K.mismo, 'pop2', .6], [K.desm, 'ding', .7],
  [S.D[0] + 0.05, 'whoosh', .6], [S.D[0] + 0.3, 'pop2', .5], [K.bulo, 'pop', .6], [K.dosC, 'whoosh', .5], [K.dosC + 0.05, 'pop', .7], [K.cosas, 'pop', .7],
  [K.L4 + 0.05, 'ding', .6], [K.periodico - 0.15, 'swoosh_up', .6], [K.periodico + 0.3, 'paper', .8],
  [S.E2[0] + 0.05, 'paper', .6], [K.mil, 'stamp', .8], [K.cinco - 0.1, 'ding', .8], [K.seccion, 'scratch', .5], [K.curios, 'pop', .6],
  [S.E3[0], 'whoosh', .6], [K.aunque, 'pop2', .5], [K.crea - 0.1, 'emu', .9],
  [S.E4[0], 'paper', .8], [K.mayor, 'pop', .6], [K.genio, 'type', .7], [K.susp1, 'type', .7], [K.mat1, 'type', .7], [K.susp1 + 0.1, 'stamp', .9],
  [S.F1[0], 'whoosh', .5], [K.leyo + 0.35, 'boing', .8], [K.contesto, 'pop', .6],
  [S.F2[0], 'whoosh', .6], [K.nunca2, 'pop', .7], [K.suspendi, 'pop2', .6], [K.mat2, 'pop2', .6], [K.mat2e - 0.1, 'stamp', .7],
  [S.F3[0], 'whoosh', .5], [K.antes, 'scratch', .5], [K.quince, 'stamp', .8], [K.quince + 0.2, 'ding', .6], [K.dominaba, 'scratch', .5], [K.calc + 0.1, 'tada', .7],
  [K.L6 + 0.05, 'ding', .6], [K.examen - 0.2, 'swoosh_up', .6], [K.verdad - 0.05, 'pop', .7],
  [S.G2[0], 'whoosh', .5], [K.dieci, 'stamp', .8], [K.anos16, 'ding', .7], [K.dosm, 'boing', .8], [K.normal - 0.15, 'pop2', .5],
  [S.G3[0], 'whoosh', .6], [K.poli - 0.05, 'swoosh_up', .6], [K.acceso, 'pop', .5], [K.zurich + 0.3, 'drumroll', .5], [K.susp2, 'stamp', 1.0], [K.susp2 + 0.25, 'sad', .7],
  [S.H1[0], 'paper', .7], [K.mat3 + 0.15, 'tick', .6], [K.mat3 + 0.3, 'tick', .6], [K.fisica + 0.15, 'tick', .6], [K.fisica + 0.3, 'tick', .6], [K.notazas, 'sparkle', .8], [K.notazas + 0.05, 'stamp', .6],
  [K.demas + 0.15, 'error', .6], [K.ejemplo, 'drumroll', .7],
  [K.frances1 - 0.02, 'burst', 1.0], [K.frances1 + 0.25, 'stamp', .9],
  [K.ojo, 'stamp', 1.0], [K.hay, 'pop2', .5], [K.dice, 'pop', .5], [K.colegio, 'pop', .5],
  [S.I2[0], 'whoosh', .5], [K.seis, 'ding', .8], [K.masalta, 'sparkle', .6], [K.alguien, 'pop2', .5], [K.confundio, 'swoosh_up', .6], [K.suspenso, 'boing', .8], [K.noesta, 'stamp', 1.0],
  [S.J1[0], 'whoosh', .6], [K.no9, 'error', .7], [K.mat4 + 0.05, 'ding', .8],
  [K.suspendia2, 'whoosh', .6], [K.frances2 - 0.02, 'burst', 1.0], [K.frances2 + 0.1, 'glitch', .6],
  [S.CTA[0], 'whoosh', .6], [S.CTA[0] + 0.25, 'pop', .7], [S.CTA[0] + 0.37, 'pop', .6], [K.L10 + 0.45, 'msg_in', .6], [K.L10 + 0.75, 'msg_in', .6], [K.creido, 'msg_in', .6], [K.si + 0.35, 'click', .9], [K.noB + 0.2, 'pop2', .5],
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
