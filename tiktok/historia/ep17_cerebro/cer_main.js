/* Ep. 17 · El Vecino en su óvalo, contadores 1-2-3, frame, temblores, efectos y bucle */
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
const OV_VIS = [[S.B[0], S.HIT1[0]], [S.E1[0], S.F2[0]]];
const IN = (t, a, b) => t > a && t < b;
const LAUGH = [[K.nada, K.nada + 0.7]];
function updOval(t) {
  let st = null;
  for (const [a, b] of OV_VIS) if (t >= a && t < b) { const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic); st = { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 }; }
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.nunca1, K.L1e + 0.4)) { o.bL = 12; o.bR = 16; o.look = [0, 0]; }
  if (IN(t, K.zonas - 0.2, K.zonas + 0.8)) { o.bL = 10; o.bR = 10; o.fan = Math.sin(t * 22) * 16 - 8; }
  if (IN(t, K.noventa, K.sinusar + 0.6)) { o.he = true; o.jaw = 0.2; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (IN(t, K.dos, K.dos + 0.8)) { o.bL = 14; o.bR = 6; o.look = [0, 0]; }
  if (IN(t, K.veinte, K.energia + 0.5)) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 14; o.bR = 14; o.look = [0, 0]; }
  if (IN(t, K.tanto, K.L4e + 0.2)) { o.bL = 8; o.bR = 12; }
  if (IN(t, K.ojo, K.ojo + 0.8)) { o.look = [0, 0]; o.bL = 6; o.bR = 14; }
  if (IN(t, K.mito, S.F1[1])) { o.fan = Math.sin(t * 22) * 18 - 8; o.look = [-3, 2]; }
  vecFace(vecO, t, o);
}
/* contadores «1» «2» «3»: tres pruebas */
const BADGES = [[loopBadge(world, 1), S.C1[0] + 0.05, S.C2[1]], [loopBadge(world, 2), S.D1[0] + 0.05, S.HIT1[0]], [loopBadge(world, 3), S.E1[0] + 0.05, S.E1[1]]];
function updBadges(t) { BADGES.forEach(([b, a, e]) => { const on = t >= a && t < e; b.style.visibility = on ? 'visible' : 'hidden'; if (on) set(b, { s: pop(t, a, 0.4) * (1 - p(t, e - 0.12, 0.12, E.inCubic)), r: -8 + wobble(t, 0.5, 3) }); }); }

/* precarga de fuentes */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ 10 % ≈ 2 % ✔ ✘ ★ ✦ ✶</span>`).join('') + '<span>😳🤷👁🏃💭🧪</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* frame */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: s.t0 < 0 ? 0 : (1 - kin) * 160 * s.dir, o: s.t0 < 0 ? 1 : clamp(kin * 1.8) }); }
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

/* temblores */
[[K.no, .3, 10], [K.lo0 + 0.05, .3, 8], [K.todo0, .4, 18], [K.peliculas - 0.05, .25, 8], [K.nunca1, .35, 14], [K.lesion, .3, 10], [K.asi - 0.05, .35, 12],
 [K.dano, .4, 16], [K.nota, .4, 18], [K.dos, .3, 8], [K.veinte, .35, 10], [K.ojo, .35, 14], [K.dijera, .35, 14], [K.entero6, .4, 16], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* efectos de sonido */
[
  [0.02, 'pop', .6], [K.no, 'boing', .7], [K.diez, 'error', .5], [K.cerebro0, 'pop2', .5], [K.lo0, 'swoosh_up', .7], [K.lo0 + 0.1, 'sparkle', .7], [K.casi0, 'ding', .8], [K.todo0, 'stamp', 1.0],
  [S.B[0] + 0.05, 'whoosh', .6], [K.peliculas - 0.1, 'click', 1.0], [K.profes - 0.1, 'pop', .6], [K.nadie1 - 0.05, 'swoosh_up', .6], [K.demostrado, 'paper', .8], [K.demostrado + 0.25, 'boing', .5], [K.nunca1, 'stamp', 1.0],
  [S.C1[0] + 0.05, 'whoosh', .6], [K.escanean, 'glitch', .4], [K.dia - 0.1, 'pop', .6], [K.dia, 'clockfast', .6],
  [S.C2[0] + 0.05, 'whoosh', .5], [K.encend, 'ping', .6], [K.practic, 'ping', .55], [K.todas, 'ping', .6], [K.zonas, 'sparkle', .7], [K.ver, 'pop', .6], [K.moverte, 'pop', .6], [K.recordar, 'pop', .6],
  [S.D1[0] + 0.05, 'whoosh', .6], [K.prueba, 'pop2', .5], [K.si3, 'pop', .6], [K.noventa, 'stamp', .7], [K.usar, 'sad', .5], [K.lesion - 0.1, 'burst', .6], [K.nada, 'boing', .6],
  [K.noes, 'scratch', .6], [K.asi - 0.05, 'stamp', 1.0],
  [S.HIT1[0], 'whoosh', .6], [K.dano - 0.1, 'burst', .9], [K.dano + 0.1, 'squish', .6], [K.nota - 0.02, 'stamp', 1.0], [K.nota + 0.1, 'glitch', .5],
  [S.E1[0] + 0.05, 'whoosh', .6], [K.cerebro4, 'pop', .6], [K.pesa, 'swoosh_up', .5], [K.dos, 'stamp', .8], [K.lleva, 'swoosh_up', .5], [K.veinte, 'stamp', .9], [K.energia, 'ding', .7],
  [S.E2[0] + 0.05, 'whoosh', .6], [K.gastaria, 'gulp', .7], [K.gastaria + 0.84, 'gulp', .6], [K.tanto + 0.5, 'gulp', .6], [K.nousa, 'pop2', .5],
  [K.ojo, 'stamp', 1.0], [K.nadie5, 'paper', .6], [K.donde, 'pop', .5], [K.salio, 'emu', .9],
  [S.F2[0] + 0.05, 'whoosh', .6], [K.einstein - 0.1, 'pop', .7], [K.ninguna - 0.1, 'scratch', .6], [K.dijera, 'stamp', 1.0],
  [S.G[0], 'whoosh', .7], [K.tu6, 'pop', .5], [K.entero6 - 0.02, 'burst', 1.0], [K.entero6 + 0.1, 'glitch', .5], [K.hasta, 'pop2', .5], [K.sofa - 0.1, 'squish', .5],
  [K.te, 'whoosh', .5], [K.te + 0.15, 'pop', .7], [K.te + 0.27, 'pop', .6], [K.creias, 'msg_in', .6], [K.si + 0.3, 'click', .9], [K.si, 'msg_in', .5],
  [S.C[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.L2[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
].forEach(s => sfx(s[1], s[0], s[2]));

/* bucle: los últimos 0,4 s enlazan con la portada (fotograma 0) */
{
  const f0 = window.frame;
  window.frame = t => {
    if (t < LOOP) return f0(t);
    f0(0);
    const k = p(t, LOOP, 0.22, E.outCubic);
    set(world, { x: (1 - k) * 1080 });
  };
}
