/* Ep. 34 · Garbo v3 — escenas: portada/gancho → paso 2 (todo clavado por texto vía K) */
const lineSvg = (pa, z = 5) => { const d = box(pa, 0, 0, 1080, 1920, { zIndex: z }); d.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"></svg>`; return d.firstChild; };
function addLine(svg, x1, y1, x2, y2, col = RED, w = 5, dash = '14 10') {
  const l = document.createElementNS(NS, 'path'); l.setAttribute('d', `M${f1(x1)},${f1(y1)} L${f1(x2)},${f1(y2)}`); l.setAttribute('stroke', col); l.setAttribute('stroke-width', w); l.setAttribute('stroke-dasharray', dash); l.setAttribute('stroke-linecap', 'round'); l.setAttribute('fill', 'none'); svg.appendChild(l); return l;
}
const PILL = (pa, x, y, w, html, o = {}) => el('div', pa, { left: px(x), top: px(y), width: px(w), textAlign: 'center', zIndex: o.z || 40 }, `<span style="display:inline-block;font-family:${o.font || 'Bricolage'};font-weight:800;font-size:${o.size || 64}px;line-height:1.1;color:${o.color || '#fff'};background:${o.bg || INK};padding:${o.pad || '8px 34px 14px'};border-radius:${o.rad || '100px'};border:5px solid ${INK};box-shadow:7px 7px 0 ${o.sh || RED};white-space:nowrap">${html}</span>`);
// encuadres dentro de un plano: [t0, escala, x, y] — corte seco + empuje lento (cuenta como plano nuevo)
function framing(cam, t, list, drift = 0.03) {
  let f = list[0]; for (const q of list) if (t >= q[0]) f = q;
  const k = p(t, f[0], 2.4, E.linear);
  set(cam, { s: f[1] * (1 + drift * k), x: f[2] || 0, y: f[3] || 0 });
}
// cruz de hierro LISA con cinta negra-blanca-negra (sin símbolos)
function medalCross(pa, x, y, w, o = {}) {
  const d = box(pa, x, y, w, w * 1.32, { zIndex: o.z || 10, transformOrigin: `${w / 2}px 0px` });
  const rb = box(d, w * 0.36, 0, w * 0.28, w * 0.4, { zIndex: 1 }); rb.innerHTML = ribbonBar(['#2a2a2a', '#ECE6D6', '#2a2a2a']);
  const cr = box(d, 0, w * 0.3, w, w, { zIndex: 2 }); cr.innerHTML = ironCrossSvg();
  return d;
}

/* ======================================================================
   A · PORTADA / GANCHO — «¿HITLER LE DIO UNA MEDALLA?» + Cruz de Hierro gigante que se balancea.
   El sello «¡ENGAÑADO!» cae con «engañó» (nunca antes).
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, 0, 3.3, E.linear) });
    set(ry, { r: t * 9 });
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.02 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1) });
    set(crW, { r: Math.sin(t * 2.4 + 0.6) * 7, y: wobble(t, 0.5, 5) });
    SPK.forEach((s, i) => set(s, { s: 0.7 + 0.4 * Math.abs(Math.sin(t * 3 + i * 1.7)), r: t * 90 + i * 40, o: 0.9 }));
    const eng = t > K.engano0 - 0.05;
    set(hit.d, { y: wobble(t, 0.5, 3), r: eng ? Math.sin((t - K.engano0) * 30) * 3 * (1 - p(t, K.engano0, 0.6)) : 0 });
    face(hit, t, { look: eng ? [0, -2] : [4, -7], bL: eng ? 16 : 4, bR: eng ? 16 : 8, seed: 0.4 });
    // el español: silueta con «?» hasta que la voz dice «español»
    const rev = t > K.espanol0 - 0.04;
    pj.d.style.filter = rev ? 'none' : 'brightness(0) invert(.8) sepia(.75) contrast(.9)';
    set(pj.d, { y: wobble(t, 0.55, 3, 1), s: rev ? 1 + 0.08 * (1 - p(t, K.espanol0 - 0.04, 0.3, E.outCubic)) : 1 });
    face(pj, t, { look: [-6, -4], bL: 6, bR: eng ? 18 : 10, closed: eng && t < K.engano0 + 0.35 && t > K.engano0 + 0.05, seed: 2 });
    set(qm, { o: rev ? 0 : 1, r: Math.sin(t * 4) * 10, s: 1 + 0.08 * Math.sin(t * 6) });
    popA(chE, t, K.espanol0 + 0.05, { r: -4 });
    stampA(stE, t, K.engano0 - 0.05, -9, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.45), rgba(255,230,0,0) 52%)' });
  const ry = rays(cam, -160, 120, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 300, 1080, '¿HITLER LE DIO', { fontSize: '104px', textShadow: `7px 7px 0 rgba(43,33,24,.22)`, zIndex: 60 });
  const l2 = BIGT(cam, 0, 428, 1080, `UNA ${hlSpan('MEDALLA?', 'hc0')}`, { fontSize: '118px', textShadow: `7px 7px 0 rgba(43,33,24,.22)`, zIndex: 60, color: RED });
  l2.querySelector('.hc0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const crW = medalCross(cam, 300, 545, 480, { z: 20 });
  const SPK = [[250, 640], [790, 700], [230, 960], [810, 1000]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 22 }, '✦'));
  const hit = mk(cam, [40, 930, 400, 511], hitlerInner(), '0 0 360 460', 'bust'); hit.d.style.zIndex = 30;
  const pj = mk(cam, [580, 960, 360, 460], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 30;
  const qm = qMark(cam, 712, 1010, 150, YEL); qm.style.zIndex = 34;
  const chE = chip(cam, 600, 1240, 'un español', { size: 46, bg: YEL, color: INK, z: 40 });
  const stE = stamp(cam, 70, 1110, '¡ENGAÑADO!', { size: 76, bw: 11, z: 66, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   B · «SE LLAMABA JUAN PUJOL, ERA DE BARCELONA» — Pujol + mapa de España con Barcelona
   ====================================================================== */
headline(S.B[0], S.B[1], 'Se llamaba *Juan Pujol*', { size: 96, hlT: K.pujol1 });
{
  const BCN = esPj(2.17, 41.39).map(Number);
  const c = scene(S.B[0], S.B[1], t => {
    set(pj.d, { s: 1 + 0.03 * p(t, S.B[0], 2.4, E.linear), y: wobble(t, 0.5, 4) });
    face(pj, t, { look: t > K.barcelona ? [8, -2] : [3, 0], bL: 8, bR: 12, seed: 2 });
    popA(nm, t, S.B[0] + 0.02, { r: -3, d: 0.3 });
    set(mp, { s: 1.5 * pop(t, S.B[0] + 0.05, 0.35), r: 2 + wobble(t, 0.4, 0.6) });
    set(pin, { y: (1 - p(t, K.barcelona - 0.05, 0.3, E.outBounce)) * -160, o: t < K.barcelona - 0.05 ? 0 : 1 });
    popA(cB, t, K.barcelona, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  rays(c, -300, 200, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const pj = mk(c, [30, 470, 520, 664], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 10;
  const nm = chip(c, 60, 1150, 'JUAN PUJOL', { size: 66, bg: INK, color: YEL, z: 30 });
  const mp = box(c, 560, 560, 230, 200, { zIndex: 8, transformOrigin: '0px 0px' });
  mp.innerHTML = `<svg width="230" height="200" style="overflow:visible">${cut(P(esPath(ESP)), 5, 6)}${D(esPath(ESP), FIG, 4)}<path d="${esPath(ESP)}" fill="url(#hP)"/><text x="100" y="120" text-anchor="middle" font-family="Rye" font-size="24" fill="${INK}" opacity=".7">ESPAÑA</text></svg>`;
  const pin = box(mp, BCN[0] - 15, BCN[1] - 40, 30, 40, { zIndex: 5 }); pin.innerHTML = pinSvg(RED);
  const cB = chip(c, 560, 900, 'BARCELONA', { size: 54, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   C · «…Y NUNCA HABÍA SIDO ESPÍA» — ficha con experiencia CERO
   ====================================================================== */
headline(S.C[0], S.C[1], 'y nunca había sido *espía*', { size: 92, hlT: K.espia1 });
{
  const c = scene(S.C[0], S.C[1], t => {
    set(card, { s: pop(t, S.C[0], 0.3), r: -2 + wobble(t, 0.5, 0.6) });
    set(av.d, { r: wobble(t, 0.4, 2) }); face(av.f, t, { look: [4, 0], bL: 10, bR: 4, seed: 3 });
    stampA(stN, t, K.nunca1, -10, 1);
    set(xx, { s: pop(t, S.C[0] + 0.1, 0.3) * (1 + 0.1 * p(t, K.espia1, 0.2) * (1 - p(t, K.espia1 + 0.2, 0.3))), o: t < S.C[0] + 0.1 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D9CDB3' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const card = box(c, 110, 470, 820, 640, { background: '#FBF6EA', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `14px 16px 0 ${SH}`, zIndex: 5 });
  box(card, 0, 0, 804, 110, { background: INK, borderRadius: '22px 22px 0 0' });
  el('div', card, { left: '40px', top: '22px', fontFamily: 'SpecialElite', fontSize: '54px', color: '#fff', whiteSpace: 'nowrap' }, 'CURRÍCULUM');
  const av = pujolAv(card, 40, 150, 200, { z: 6 });
  el('div', card, { left: '280px', top: '160px', fontFamily: 'SpecialElite', fontSize: '42px', color: INK, lineHeight: 1.5, whiteSpace: 'nowrap' }, 'Nombre: Juan Pujol<br>De: Barcelona');
  el('div', card, { left: '40px', top: '400px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: INK, whiteSpace: 'nowrap' }, 'Experiencia de espía:');
  const xx = el('div', card, { left: '40px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', color: RED, whiteSpace: 'nowrap', lineHeight: 1 }, 'NINGUNA');
  const stN = stamp(c, 540, 1090, 'NUNCA', { size: 80, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   Q · «¿CÓMO ENGAÑA A HITLER UN SEÑOR QUE NO ERA ESPÍA?» — Hitler grande vs. Pujol pequeño
   ====================================================================== */
headline(S.Q[0], S.Q[1], '¿Cómo engaña a *Hitler* un señor que no era espía?', { size: 78, hlT: K.hitler3, y: 200 });
{
  const c = scene(S.Q[0], S.Q[1], t => {
    framing(cam, t, [[S.Q[0], 1.0, 0, 0], [K.senor - 0.04, 1.12, -60, -40]]);
    set(hb.d, { y: wobble(t, 0.5, 3) }); face(hb, t, { look: t > K.senor ? [8, 2] : [0, 0], bL: 4, bR: 10, seed: 0.9 });
    set(pjb.d, { s: pop(t, K.senor - 0.04, 0.35), y: wobble(t, 0.55, 3, 1), o: t < K.senor - 0.04 ? 0 : 1 });
    face(pjb, t, { look: [-6, -2], bL: 12, bR: 12, seed: 1.4 });
    set(vs, { s: pop(t, K.senor + 0.1, 0.3) * (1 + 0.06 * Math.sin(t * 10)), o: t < K.senor + 0.1 ? 0 : 1, r: -8 });
    QM.forEach((q, i) => set(q, { s: pop(t, K.espia3 - 0.1 + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 12, o: t < K.espia3 - 0.1 + i * 0.12 ? 0 : 1 }));
    popA(cn, t, K.noera, { r: 3 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE' });
  rays(cam, -160, 260, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const hb = mk(cam, [40, 560, 470, 600], hitlerInner(), '0 0 360 460', 'bust'); hb.d.style.zIndex = 4;
  const pjb = mk(cam, [560, 700, 330, 422], pujolInner(), '0 0 360 460', 'bust'); pjb.d.style.zIndex = 5;
  const vs = BIGT(cam, 430, 640, 220, 'VS', { fontSize: '110px', color: RED, textShadow: OUTL(INK, 6), zIndex: 20 });
  const QM = [[600, 560], [760, 600], [880, 690]].map((q, i) => { const e = qMark(cam, q[0] - (i === 2 ? 50 : 0), q[1], 110, PINK); return e; });
  const cn = chip(cam, 520, 1130, 'ni siquiera espía', { size: 38, bg: INK, color: '#fff', z: 30 });
}

/* ======================================================================
   T3 · «EN TRES PASOS» — tres fichas numeradas (la «1» será el titular del paso 1)
   ====================================================================== */
headline(S.T3[0], S.T3[1], 'En *tres pasos*', { size: 120, hlT: K.tres3, y: 220 });
{
  const TT = [K.en3 + 0.05, K.tres3, K.pasos];
  const c = scene(S.T3[0], S.T3[1], t => {
    CD.forEach((d, i) => { const k = pop(t, TT[i] - 0.04, 0.32); set(d, { s: t < TT[i] - 0.04 ? 0 : k, r: [-6, 2, 7][i] + wobble(t, 0.5, 1.2, i), y: wobble(t, 0.6, 5, i) }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: YEL });
  halftone(c, 'rgba(0,0,0,.09)', 0);
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const CD = ['1', '2', '3'].map((n, i) => {
    const d = box(c, 80 + i * 280, 620, 240, 320, { zIndex: 10, background: '#FBF6EA', border: `8px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 12px 0 ${INK}` });
    el('div', d, { left: '0', top: '20px', width: '224px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '220px', lineHeight: 1, color: [RED, INK, PINK][i] }, n);
    return d;
  });
}

/* ======================================================================
   PASO 1 · a — «UNO: QUISO ESPIAR PARA LOS INGLESES» — Pujol llama a la puerta británica
   ====================================================================== */
{
  const c = scene(S.P1a[0], S.P1a[1], t => {
    set(pj.d, { s: 1 + 0.03 * p(t, S.P1a[0], 2.4, E.linear), y: wobble(t, 0.5, 4) });
    face(pj, t, { look: t > K.ingleses4 ? [8, -2] : [4, 0], bL: 10, bR: 14, seed: 2 });
    const kd = p(t, K.ingleses4 - 0.1, 0.4, E.outBack);
    set(door, { s: 1 + 0.06 * kd * (1 - p(t, K.ingleses4 + 0.3, 0.3)), r: 2 + wobble(t, 0.4, 0.6) });
    popA(emb, t, K.ingleses4 - 0.05, { r: 3 });
    set(bub, { s: pop(t, K.quiso - 0.05, 0.35), r: -3 + wobble(t, 0.6, 1), o: t < K.quiso - 0.05 ? 0 : 1 });
    set(hearts, { o: t > K.ingleses4 ? 1 : 0, y: -((t * 40) % 60), s: 1 + 0.1 * Math.sin(t * 9) });
    const kk = t > K.ingleses4 + 0.4 ? Math.abs(Math.sin((t - K.ingleses4 - 0.4) * 16)) : 0;
    set(knock, { o: kk > 0.1 ? 1 : 0, s: 0.85 + kk * 0.3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  rays(c, -300, 200, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const pj = mk(c, [20, 520, 520, 664], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 10;
  const door = box(c, 600, 560, 330, 572, { zIndex: 6 }); door.innerHTML = doorSvg('BRITISH');
  const emb = chip(c, 470, 1150, 'los ingleses', { size: 50, bg: '#fff', color: INK, z: 30 });
  const bub = bubble(c, 120, 400, '¿Espío para vosotros?', { size: 56, tail: 'bl', z: 40, it: true });
  const hearts = el('div', c, { left: '520px', top: '680px', fontSize: '70px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 41 }, '♥');
  const knock = el('div', c, { left: '560px', top: '960px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '58px', color: INK, zIndex: 42 }, 'toc, toc');
}

/* PASO 1 · b — «…PERO NO LE QUISIERON» — portazo y sello */
{
  const c = scene(S.P1b[0], S.P1b[1], t => {
    const ks = p(t, K.no4 - 0.12, 0.14, E.inCubic);
    set(dr, { sx: 1, r: wobble(t, 0.4, 0.4) });
    set(gap, { sx: 1 - ks, o: 1 });
    set(sad.d, { y: wobble(t, 0.5, 3), r: t > K.no4 ? -4 : 0 });
    face(sad.f, t, { look: [0, 6], bL: -4, bR: -4, seed: 5 });
    stampA(stN, t, K.no4 + 0.02, -10, 1);
    set(drop, { o: t > K.no4 + 0.2 ? 1 : 0, y: ((t - K.no4) * 120) % 60 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#B9A07A', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 4px, transparent 4px 80px)' });
  const dr = box(c, 230, 400, 560, 900, { zIndex: 5 }); dr.innerHTML = doorSvg('BRITISH');
  const gap = box(c, 230, 400, 90, 900, { zIndex: 6, background: '#1a140f', transformOrigin: '0 0' });
  const sad = pujolAv(c, 80, 1040, 200, { z: 12 });
  const drop = el('div', c, { left: '250px', top: '1030px', fontSize: '50px', color: '#7fb6d8', textShadow: `2px 2px 0 ${INK}`, zIndex: 14 }, '💧');
  const stN = stamp(c, 180, 760, 'NO, GRACIAS', { size: 86, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* PASO 1 · c — «ASÍ QUE SE OFRECIÓ A LOS ALEMANES…» — oficina alemana, solicitud ACEPTADA */
{
  const c = scene(S.P1c[0], S.P1c[1], t => {
    set(of.d, { s: pop(t, S.P1c[0], 0.3), y: wobble(t, 0.5, 3) });
    face(of, t, { look: t > K.espia4 ? [0, 6] : [-6, 4], bL: t > K.espia4 ? 12 : 0, bR: t > K.espia4 ? 12 : 6, seed: 0.6 });
    const kf = p(t, S.P1c[0] + 0.02, 0.32, E.outBack);
    set(file, { y: (1 - kf) * 700, r: -4 + wobble(t, 0.4, 0.5) });
    stampA(stA, t, K.espia4, -10, 1);
    popA(chA, t, K.alemanes4 - 0.05, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#C9C6B8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 96px)' });
  const of = mk(c, [420, 400, 480, 613], officerInner(), '0 0 360 460', 'bust'); of.d.style.zIndex = 4;
  box(c, 0, 1000, 1080, 300, { zIndex: 6, background: WOOD, borderTop: `7px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.15) 0 3px, transparent 3px 30px)' });
  const file = box(c, 80, 760, 580, 400, { zIndex: 8, background: '#F2E2B8', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `10px 10px 0 ${SH}` });
  el('div', file, { left: '30px', top: '24px', fontFamily: 'SpecialElite', fontSize: '42px', color: INK, lineHeight: 1.35, whiteSpace: 'nowrap' }, 'SOLICITUD DE ESPÍA<br>Nombre: J. Pujol<br>Para: Alemania');
  const stA = stamp(c, 130, 1010, 'ACEPTADO', { size: 96, bw: 12, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const chA = chip(c, 560, 1180, 'los alemanes', { size: 48, bg: INK, color: '#fff', z: 30 });
}

/* PASO 1 · d — «…PARA ENGAÑARLOS DESDE DENTRO» — se pone el disfraz y cruza los dedos */
{
  const c = scene(S.P1d[0], S.P1d[1], t => {
    set(ry, { r: t * 12 });
    const f2 = t > K.ingleses4b - 0.06;
    set(wrap, { s: (f2 ? 0.86 : 1) + 0.12 * (1 - p(t, S.P1d[0], 0.35, E.outCubic)), x: f2 ? -150 : 0, y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1.2) });
    face(pb, t, { look: f2 ? [8, -2] : [6, 0], bL: 4, bR: 16, closed: t > K.dentro && t < K.dentro + 0.3, seed: 1 });
    set(dB, { s: pop(t, K.ingleses4b - 0.06, 0.35), r: 3 + wobble(t, 0.4, 0.6), o: f2 ? 1 : 0 });
    set(hB, { o: t > K.fin4 ? 1 : 0, y: -((t * 40) % 60), s: 1 + 0.1 * Math.sin(t * 9) });
    puffs.forEach((f, i) => { const kf = p(t, S.P1d[0], 0.5, E.outCubic); set(f, { x: Math.cos(i * 1.3) * 260 * kf, y: Math.sin(i * 1.3) * 200 * kf, s: 0.4 + kf * 1.2, o: kf < 1 ? 1 - kf : 0 }); });
    popA(on, t, S.P1d[0] + 0.08, { r: -4 });
    set(fing, { s: pop(t, K.fin4 - 0.1, 0.3), r: 10 + Math.sin(t * 8) * 6, o: t < K.fin4 - 0.1 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2B2118' });
  const ry = rays(c, -160, 240, 1400, 24, 'rgba(255,230,0,.10)', 'rgba(0,0,0,0)', 0);
  const wrap = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px', zIndex: 5 });
  const pb = mk(wrap, [250, 440, 580, 741], pujolInner({ spy: true, tie: INK }), '0 0 360 460', 'bust');
  const puffs = [0, 1, 2, 3, 4, 5].map(() => box(c, 470, 760, 150, 110, { borderRadius: '50%', background: '#F4ECDB', border: `5px solid ${INK}`, zIndex: 8 }));
  const on = chip(c, 190, 1150, 'PLAN: ENGAÑARLOS', { size: 60, bg: YEL, color: INK, z: 30 });
  const fing = el('div', c, { left: '460px', top: '880px', fontSize: '120px', zIndex: 32 }, '🤞');
  const dB = box(c, 640, 600, 270, 470, { zIndex: 20 }); dB.innerHTML = doorSvg('BRITISH');
  const hB = el('div', c, { left: '730px', top: '520px', fontSize: '80px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 41 }, '♥');
}

/* ======================================================================
   PASO 2 · a — «DOS: LE MANDARON A LONDRES. PERO SE QUEDÓ EN LISBOA» — mapa (2 encuadres)
   ====================================================================== */
{
  const MAD = mpE(-3.7, 40.4).map(Number), LON = mpE(-0.13, 51.5).map(Number), LIS = mpE(-9.14, 38.72).map(Number), BER = mpE(13.4, 52.5).map(Number);
  const c = scene(S.P2a[0], S.P2a[1], t => {
    framing(mp, t, [[S.P2a[0], 1.18, 40, 120], [K.pero5 - 0.08, 1.0, 0, 0]], 0.04);
    // ficha: Madrid → hacia Londres (con «mandaron») → giro en U → Lisboa (con «quedó en Lisboa»)
    const T0 = K.mandaron - 0.1, TU = K.quedo - 0.05, T1 = K.lisboa + 0.3;
    const mx = lerp(MAD[0], LON[0], 0.55), my = lerp(MAD[1], LON[1], 0.55);
    let x, y;
    if (t < TU) { const k = p(t, T0, 0.9, E.inOutCubic); x = lerp(MAD[0], mx, k); y = lerp(MAD[1], my, k); }
    else { const k = p(t, TU, T1 - TU, E.inOutCubic); x = lerp(mx, LIS[0] + 30, k) - Math.sin(k * Math.PI) * 140; y = lerp(my, LIS[1] - 50, k) - Math.sin(k * Math.PI) * 40; }
    set(tok.d, { x: x - 70, y: y - 70, r: Math.sin(t * 6) * 6 });
    face(tok.f, t, { look: t > TU ? [-6, 4] : [4, -4], seed: 3 });
    trail.setAttribute('stroke-dashoffset', f1(-t * 80)); trail.style.opacity = t > K.mandaron - 0.1 ? 1 : 0;
    popA(order, t, K.mandaron - 0.05, { r: -3, o: 1 - p(t, K.quedo, 0.2) });
    stampA(stL, t, K.londres, -8, 1); stL.style.display = t > K.lisboa + 0.6 ? 'none' : '';
    set(xLon, { s: pop(t, TU + 0.1, 0.3), o: t < TU + 0.1 ? 0 : 1, r: -8 });
    popA(cLis, t, K.lisboa, { r: -4 });
    set(pin, { y: (1 - p(t, K.lisboa, 0.25, E.outBounce)) * -140, o: t < K.lisboa ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '420px 900px' });
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = euroMapSvg();
  const ls = lineSvg(mp, 3);
  const trail = addLine(ls, MAD[0], MAD[1], LON[0], LON[1], INK, 6, '16 12');
  chip(mp, LON[0] - 110, LON[1] - 120, 'LONDRES', { size: 44, bg: '#fff', color: INK, z: 20 });
  chip(mp, BER[0] - 300, BER[1] + 20, 'BERLÍN', { size: 40, bg: '#fff', color: INK, z: 20 });
  chip(mp, MAD[0] - 40, MAD[1] + 50, 'MADRID', { size: 34, bg: '#fff', color: INK, z: 20 });
  const xLon = el('div', mp, { left: px(LON[0] - 50), top: px(LON[1] - 70), fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: RED, textShadow: `4px 4px 0 ${INK}`, zIndex: 21, lineHeight: 1 }, '✗');
  const stL = stamp(mp, LON[0] - 290, LON[1] + 90, 'DESTINO: LONDRES', { size: 46, bw: 9, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const order = el('div', c, { left: '440px', top: '1240px', zIndex: 25 }, `<span style="display:inline-block;font-family:SpecialElite;font-size:40px;color:${INK};background:#F2E2B8;padding:10px 22px;border:5px solid ${INK};box-shadow:6px 6px 0 ${SH};white-space:nowrap">ORDEN: ¡A LONDRES!</span>`);
  const pin = box(mp, LIS[0] - 30, LIS[1] - 80, 60, 80, { zIndex: 22 }); pin.innerHTML = pinSvg(RED);
  const cLis = chip(mp, LIS[0] + 40, LIS[1] - 200, 'LISBOA', { size: 72, bg: YEL, color: INK, z: 24 });
  const tok = pujolAv(mp, 0, 0, 140, { z: 23, bw: 6 });
}

/* PASO 2 · c — «…INVENTÁNDOSE LOS INFORMES CON UNA GUÍA DE TURISMO Y UN MAPA» */
{
  const c = scene(S.P2c[0], S.P2c[1], t => {
    set(pj.d, { y: wobble(t, 0.5, 3) });
    const wr = t < K.guia - 0.1 || (t > K.turismo + 0.3 && t < K.mapa - 0.1);
    face(pj, t, { look: wr ? [-6, 6] : [-8, 0], bL: 6, bR: 14, seed: 4 });
    set(ql, { x: wr ? Math.sin(t * 18) * 14 : 0, y: wr ? Math.cos(t * 18) * 8 : 0, r: 18 });
    const kg = p(t, K.guia - 0.1, 0.35, E.outBack), kg2 = p(t, K.turismo + 0.5, 0.3);
    set(book, { s: 1 + 0.18 * kg * (1 - kg2 * 0.6), r: lerp(-8, -3, kg) + wobble(t, 0.5, 0.6) });
    const km = p(t, K.mapa - 0.1, 0.35, E.outBack);
    set(mapP, { s: 1 + 0.25 * km, r: lerp(6, 2, km) + wobble(t, 0.5, 0.6, 1) });
    LT.forEach(L => { const k = p(t, L.t, 0.7, E.inCubic); set(L.e, { x: k * 520, y: -k * 640, r: k * 40 - 10, s: 1 - k * 0.5, o: t < L.t - 0.2 ? 0 : 1 - p(t, L.t + 0.55, 0.15) }); });
    popA(cB, t, K.informes + 0.25, { r: 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DCC0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 72px)' });
  const pj = mk(c, [520, 440, 420, 537], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 4;
  const dk = box(c, 380, 960, 700, 200, { zIndex: 6 }); dk.innerHTML = deskSvg(700, 200);
  const ql = box(c, 640, 800, 100, 200, { zIndex: 8 }); ql.innerHTML = quillSvg();
  const book = box(c, 70, 420, 380, 470, { zIndex: 10, background: '#6a2e2a', border: `7px solid ${INK}`, borderRadius: '14px 26px 26px 14px', boxShadow: `12px 12px 0 ${SH}`, transformOrigin: '190px 235px' });
  box(book, 18, 18, 330, 420, { border: `4px solid ${GOLD}`, borderRadius: '10px' });
  el('div', book, { left: '0', top: '50px', width: '366px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', color: GOLD, lineHeight: 1.05 }, 'GUÍA DE<br>TURISMO');
  el('div', book, { left: '0', top: '196px', width: '366px', textAlign: 'center' }, `<svg width="120" height="150" viewBox="0 0 120 150"><rect x="40" y="30" width="40" height="120" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M36,30 L60,0 L84,30 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="60" cy="58" r="13" fill="#6a2e2a" stroke="${INK}" stroke-width="3"/><path d="M60,58 L60,50 M60,58 L66,60" stroke="${GOLD}" stroke-width="3"/></svg>`);
  el('div', book, { left: '0', top: '360px', width: '366px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: GOLD }, 'Gran Bretaña');
  // el mapa de Gran Bretaña sobre la mesa
  const UKs = UK.map(q => [f1((q[0] + 6.2) * 26), f1((59 - q[1]) * 26)]);
  const ukp = 'M' + UKs.map(q => q.join(',')).join('L') + 'Z';
  const mapP = box(c, 420, 1010, 300, 300, { zIndex: 12, background: '#F4E7C8', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${SH}`, transformOrigin: '150px 150px' });
  mapP.innerHTML = `<svg width="288" height="288" style="overflow:visible;position:absolute;left:0;top:0"><path d="M96,0 V288 M192,0 V288 M0,144 H288" stroke="${INK}" stroke-width="2" opacity=".25"/><g transform="translate(70,10)"><path d="${ukp}" fill="${SEA2}" stroke="${INK}" stroke-width="4"/></g><text x="144" y="276" text-anchor="middle" font-family="Rye" font-size="30" fill="${INK}">MAPA</text></svg>`;
  const LT = [K.informes, K.turismo + 0.1, K.mapa + 0.3].map((tt, i) => { const e = box(c, 600 + i * 24, 860, 200, 140, { zIndex: 14 }); e.innerHTML = envSvg('INFORME', '#fff'); return { e, t: tt }; });
  const cB = chip(c, 80, 905, 'informes… inventados', { size: 40, bg: INK, color: YEL, z: 30 });
  void dk;
}
