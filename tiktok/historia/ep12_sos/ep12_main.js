/* Ep. 12 · El Vecino en su óvalo, frame, temblores y efectos (anclas por texto) */
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
const OV_VIS = [[T_D, T_H2], [T_H3, T_K]];
function ovalState(t) {
  if (t >= T_END) { const k = pop(t, T_END + 0.05, 0.5); return { x: 335, y: -600, s: 1.12 * k, r: -3 + wobble(t, 0.4, 1.5), o: t < T_END + 0.05 ? 0 : 1 }; }
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin, r: 0, o: 1 };
  }
  return null;
}
const LAUGH = [[S('para6'), SE('sentido')]];
const SCAND = [[S('cqd3'), S('cqd3') + 0.8], [S('ojo'), S('ojo') + 1.0], [S('famoso8'), S('famoso8') + 0.8], [S('miedo') - 0.4, S('miedo') + 0.4]];
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const inL = LAUGH.find(L => t >= L[0] && t < L[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: st.r + (inL ? Math.sin(t * 20) * 2 : 0), o: st.o });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (SCAND.some(L => t >= L[0] && t < L[1])) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; }
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > S('sos7') && t < S('sos7') + 0.8) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.6); }
  if (t > S('tresA') && t < S('imposible')) { o.look = [4, -6]; }
  if (t >= T_END) { o.look = [0, 0]; o.bR = Math.sin(t * 3) > 0.6 ? 10 : 0; o.jaw = 0; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '0', zIndex: 0, whiteSpace: 'nowrap' });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:800', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600', 'InterV;font-weight:900'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑ¿¡ SOS 1906 ··· −−− ★</span>`).join('') + '<span>😳♪♫</span>';
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage', '900 40px InterV'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
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
[[S('souls0') + 0.45, .3, 12], [S('nada0') + 0.18, .35, 14], [S('acordo') + 0.08, .3, 10], [S('sos4'), .3, 8], [S('confundir') + 0.55, .3, 8], [S('miedo'), .4, 10],
 [S('despues'), .35, 14], [S('sos7') + 0.35, .3, 10], [S('ojo'), .35, 14], [S('sonaba') - 0.05, .4, 14], [TC + 0.3, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));

/* ---------- efectos de sonido ---------- */
const FX = [
  [0.03, 'burst', .6], [S('sos0'), 'boing', .5], [S('save0'), 'tick', .4], [S('our0'), 'tick', .4], [S('souls0'), 'tick', .4], [S('souls0') + 0.05, 'scratch', .8], [S('souls0') + 0.45, 'stamp', 1.0],
  [T_A1, 'whoosh', .5], [S('no1') + 0.4, 'pop', .6], [S('nada0'), 'pop2', .5], [S('nada0') + 0.18, 'stamp', 1.1],
  [T_B, 'whoosh', .6], [S('hundia'), 'sad', .45], [S('hundia') + 0.3, 'emu', .8], [S('empezo1') + 0.3, 'type', .5], [S('otra'), 'boing', .6],
  [T_C, 'whoosh', .6], [S('soy') + 0.2, 'pop', .5], [S('esto2') - 0.15, 'swoosh_up', .5], [S('libro2'), 'ding', .6],
  [T_D, 'whoosh', .6], [S('siglo'), 'pop', .6], [S('hablaban'), 'msg_in', .5], [S('hablaban') + 0.6, 'msg_out', .45],
  [T_D2, 'whoosh', .5], [S('telegrafo') + 0.15, 'typing', .45], [S('puntos3'), 'pop', .5], [S('rayas3'), 'pop2', .5],
  [T_E1, 'whoosh', .5], [S('cada'), 'paper', .6], [S('manera'), 'boing', .5],
  [T_E2, 'whoosh', .5], [S('marconi') - 0.05, 'stamp', .9], [S('ejemplo'), 'pop', .5], [S('usaba'), 'type', .5], [S('cqd3'), 'ding', .8],
  [T_F, 'whoosh', .5], [S('seis') - 0.05, 'stamp', .9], [S('berlin') - 0.1, 'swoosh_up', .5], [S('acordo') + 0.08, 'thud', 1.0], [S('senal4'), 'paper', .5], [S('sos4'), 'stamp', 1.0], [S('sos4') + 0.2, 'tada', .45],
  [T_G1, 'whoosh', .5], [S('letras'), 'boing', .45], [S('como') - 0.1, 'swoosh_up', .5], [S('suenan'), 'ping', .45], [S('suenan') + 0.22, 'ping', .35],
  [T_G2, 'whoosh', .4],
  [T_G3, 'whoosh', .5], [S('imposible') + 0.15, 'error', .35], [S('confundir') + 0.1, 'ding', .7], [S('confundir') + 0.55, 'stamp', .9],
  [T_G4, 'whoosh', .5], [T_G4 + 0.25, 'typing', .45], [S('miedo'), 'gulp', .8],
  [T_H1, 'whoosh', .5], [S('save6'), 'pop', .5], [S('salvad') - 0.05, 'paper', 1.0],
  [T_H2, 'whoosh', .6], [S('gente') - 0.05, 'pop', .6], [S('despues'), 'stamp', 1.1],
  [T_H3 + 0.25, 'stamp', .7], [S('sentido'), 'sparkle', .7],
  [T_I, 'whoosh', .6], [S('doce') - 0.05, 'stamp', .9], [S('titanic7'), 'stamp', .6], [S('cqd7'), 'typing', .45], [S('luego'), 'squish', .7], [S('consejo'), 'msg_in', .55], [S('sos7') - 0.05, 'typing', .45], [S('sos7') + 0.35, 'stamp', 1.0],
  [S('ojo'), 'stamp', 1.1], [S('ojo') + 0.45, 'pop', .5], [S('primer') + 0.1, 'error', .5], [S('historia'), 'pop2', .5],
  [T_J2, 'whoosh', .6], [S('titanic8') + 0.15, 'paper', .6], [S('titanic8') + 0.65, 'paper', .5], [S('famoso8'), 'tada', .55], [S('todo'), 'swoosh_up', .5],
  [T_K, 'whoosh', .6], [S('famosa9') - 0.1, 'pop', .6], [S('planeta'), 'drumroll', .45], [S('eligieron') - 0.1, 'whoosh', .5], [S('sonaba') - 0.05, 'burst', 1.0], [S('bien') + 0.1, 'bell', .7],
  [T_L, 'whoosh', .6], [S('dime') + 0.05, 'pop', .7], [S('dime') + 0.17, 'pop2', .7], [S('si'), 'click', .8], [S('si') + 0.05, 'msg_in', .5], [S('no10'), 'click', .8], [S('si') + 0.5, 'msg_in', .5], [S('osea'), 'pop', .5],
  [T_M, 'whoosh', .5], [TC + 0.3, 'thud', 1.4], [T_END + 0.25, 'tada', .7], [T_END + 0.7, 'pop', .6],
];
// ··· −−− ··· : un golpe corto por símbolo (puntos: tick, rayas: ping), sin saturar
MORSE_T.forEach((t0, i) => FX.push([t0, i >= 3 && i < 6 ? 'ping' : 'tick', i >= 3 && i < 6 ? .3 : .45]));
FX.forEach(s => sfx(s[1], s[0], s[2]));
