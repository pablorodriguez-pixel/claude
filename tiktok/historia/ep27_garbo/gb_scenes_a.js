/* Ep. 27 · escenas L0–L5 (todo clavado por texto vía K) */
const lineSvg = (pa, z = 5) => { const d = box(pa, 0, 0, 1080, 1920, { zIndex: z }); d.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"></svg>`; return d.firstChild; };
function addLine(svg, x1, y1, x2, y2, col = RED, w = 5, dash = '14 10') {
  const l = document.createElementNS(NS, 'path'); l.setAttribute('d', `M${f1(x1)},${f1(y1)} L${f1(x2)},${f1(y2)}`); l.setAttribute('stroke', col); l.setAttribute('stroke-width', w); l.setAttribute('stroke-dasharray', dash); l.setAttribute('stroke-linecap', 'round'); l.setAttribute('fill', 'none'); svg.appendChild(l); return l;
}
const PILL = (pa, x, y, w, html, o = {}) => el('div', pa, { left: px(x), top: px(y), width: px(w), textAlign: 'center', zIndex: o.z || 40 }, `<span style="display:inline-block;font-family:${o.font || 'Bricolage'};font-weight:800;font-size:${o.size || 64}px;line-height:1.1;color:${o.color || '#fff'};background:${o.bg || INK};padding:${o.pad || '8px 34px 14px'};border-radius:${o.rad || '100px'};border:5px solid ${INK};box-shadow:7px 7px 0 ${o.sh || RED};white-space:nowrap">${html}</span>`);

/* ======================================================================
   A · PORTADA / GANCHO — perfil «@juan_pujol_27», 27 bots con hilos rojos, Hitler con lupa.
   Fotograma 0 = PREGUNTA «¿27 CUENTAS FALSAS CONTRA HITLER?» (sin sello: el sello cae con «troleó»)
   ====================================================================== */
const BOTS_A = [];
{
  const CX0 = 300, CY0 = 950;
  const c = scene(S.A[0], S.A[1], t => {
    const kz = p(t, K.hitler0 - 0.05, 0.6, E.inOutCubic);
    set(cam, { s: 1 + 0.035 * p(t, 0, 4, E.linear) + 0.03 * kz, x: -kz * 18 });
    set(ry, { r: t * 9 });
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.025 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1) });
    set(l3, { r: -1 + wobble(t, 0.5, 0.6, 2) });
    set(card.d, { r: -2 + wobble(t, 0.4, 0.8), y: wobble(t, 0.55, 5) });
    const lit = t > K.v27a - 0.04;
    BOTS_A.forEach((b, i) => {
      const kp = lit ? pop(t, K.v27a - 0.04 + i * 0.012, 0.3) : 1;
      set(b.d, { y: Math.sin(t * 3 + i * 1.7) * 6, s: lit ? 0.92 + 0.18 * kp : 0.92, r: Math.sin(t * 2 + i) * 6 });
      b.glow.style.opacity = lit ? 1 : 0;
    });
    TH.forEach((l, i) => { l.setAttribute('stroke-dashoffset', f1(-t * 60 - i * 7)); l.setAttribute('stroke', lit ? PINK : RED); l.setAttribute('opacity', lit ? 1 : 0.75); });
    // Hitler mira la tarjeta con la lupa; con «troleó» le cae el sello
    set(hit.d, { y: wobble(t, 0.5, 3), r: t > K.troleo0 ? Math.sin((t - K.troleo0) * 30) * 2 * (1 - p(t, K.troleo0, 0.5)) : 0 });
    const tro = t > K.troleo0;
    face(hit, t, { look: tro ? [0, -4] : [-7, 3], bL: tro ? 14 : -2, bR: tro ? 14 : 4, seed: 0.4 });
    set(lupa, { x: Math.sin(t * 2.4) * 16, y: Math.cos(t * 2.4) * 10 + (tro ? 40 * p(t, K.troleo0, 0.3) : 0), r: -10 + Math.sin(t * 2.4) * 4 + (tro ? -24 * p(t, K.troleo0, 0.3) : 0) });
    stampA(stT, t, K.troleo0, -12, 1);
    face(card.av.f, t, { look: [6, 0], bL: 4, bR: 10, seed: 1.1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '760px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 58%, rgba(255,230,0,.38), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 220, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 300, 1080, `¿${hlSpan('27', 'hc0')} CUENTAS`, { fontSize: '132px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 60 });
  l1.querySelector('.hc0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const l2 = BIGT(cam, 0, 430, 1080, 'FALSAS', { fontSize: '132px', textShadow: `7px 7px 0 rgba(43,33,24,.25)`, zIndex: 60, color: RED });
  const l3 = PILL(cam, 0, 578, 1080, 'CONTRA HITLER?', { size: 70, sh: PINK, z: 62 });
  const thS = lineSvg(cam, 8); const TH = [];
  const r = rng(27);
  // 27 bots: dos filas bajo el perfil + algunos alrededor (todos dentro de x 60–930)
  const PB = [];
  for (let i = 0; i < 14; i++) PB.push([92 + i * 62, 1218 + (i % 2) * 10]);
  for (let i = 0; i < 13; i++) PB.push([122 + i * 62, 1290 + (i % 2) * 8]);
  PB.forEach((q, i) => {
    const sz = 58 + r() * 8;
    const b = botAv(cam, q[0] - sz / 2, q[1] - sz / 2, sz, i, { z: 9 }); BOTS_A.push(b);
    TH.push(addLine(thS, CX0 - 150, CY0 - 40, q[0], q[1], RED, 4, '12 9'));
  });
  const card = profCard(cam, 40, 690, { w: 560, z: 20 });
  card.d.style.transformOrigin = '280px 250px';
  const hit = mk(cam, [548, 630, 400, 511], hitlerInner(), '0 0 360 460', 'bust'); hit.d.style.zIndex = 30;
  const lupa = box(cam, 420, 950, 220, 220, { zIndex: 34, transformOrigin: '190px 190px' }); lupa.innerHTML = lupaSvg();
  const stT = stamp(cam, 470, 720, 'TROLEADO', { size: 58, bw: 9, z: 66, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   B1 · «JUAN PUJOL QUISO ESPIAR PARA LOS INGLESES» — Pujol + puerta de la embajada
   ====================================================================== */
headline(S.B1[0], S.B1[1], 'Quiso espiar para *los ingleses*', { size: 84, hlT: K.ingleses });
{
  const c = scene(S.B1[0], S.B1[1], t => {
    set(pj.d, { s: 1 + 0.03 * p(t, S.B1[0], 3.6, E.linear), y: wobble(t, 0.5, 4), o: 1 });
    face(pj, t, { look: t > K.ingleses ? [8, -2] : [4, 0], jaw: 0, bL: 10, bR: 14, seed: 2 });
    popA(nm, t, K.juan - 0.02, { r: -3 });
    const kd = p(t, K.ingleses - 0.1, 0.4, E.outBack);
    set(door, { y: 0, s: 1 + 0.08 * kd * (1 - p(t, K.ingleses + 0.3, 0.3)), r: 2 + wobble(t, 0.4, 0.6) });
    popA(emb, t, K.ingleses + 0.1, { r: 3 });
    set(bub, { s: pop(t, K.espiar1 - 0.05, 0.35), r: -3 + wobble(t, 0.6, 1), o: t < K.espiar1 - 0.05 ? 0 : 1 });
    set(hearts, { o: t > K.ingleses ? 1 : 0, y: -((t * 40) % 60), s: 1 + 0.1 * Math.sin(t * 9) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  rays(c, -300, 200, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const pj = mk(c, [20, 480, 540, 690], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 10;
  const nm = chip(c, 50, 1170, 'JUAN PUJOL · BARCELONA', { size: 54, bg: INK, color: YEL, z: 30 });
  const door = box(c, 600, 560, 330, 572, { zIndex: 6 }); door.innerHTML = doorSvg('BRITISH');
  const emb = chip(c, 470, 1080, 'embajada británica', { size: 38, bg: '#fff', color: INK, z: 30 });
  const bub = bubble(c, 330, 440, '¿Espío para vosotros?', { size: 50, tail: 'bl', z: 40, it: true });
  const hearts = el('div', c, { left: '470px', top: '640px', fontSize: '70px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 41 }, '♥');
}

/* ======================================================================
   B2 · «LO DEJARON EN VISTO» — chat de época: tres mensajes y tres «Visto ✓✓»
   ====================================================================== */
headline(S.B2[0], S.B2[1], 'Lo dejaron *en visto*', { size: 104, hlT: K.visto1 });
{
  const MS = [];
  const c = scene(S.B2[0], S.B2[1], t => {
    set(ph, { s: pop(t, S.B2[0], 0.3), r: -1.5 + wobble(t, 0.5, 0.5) });
    MS.forEach(m => { popA(m.b, t, m.t, { r: 0, d: 0.3 }); m.v.style.opacity = t > m.t + 0.16 ? 1 : 0; });
    stampA(stV, t, K.visto1 + 0.02, -9, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#D9CDB3' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ph = box(c, 130, 410, 800, 860, { background: '#FBF6EA', border: `8px solid ${INK}`, borderRadius: '48px', boxShadow: `14px 16px 0 ${SH}`, zIndex: 5 });
  const hd = box(ph, 0, 0, 804, 120, { background: INK, borderRadius: '40px 40px 0 0' });
  el('div', hd, { left: '40px', top: '28px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: '#fff', whiteSpace: 'nowrap' }, 'Embajada británica');
  el('div', hd, { left: '600px', top: '34px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '34px', color: '#bdb3a0', whiteSpace: 'nowrap' }, 'en línea');
  const msgs = ['Hola. ¿Espío para vosotros?', '¿Hola?', '¿¿Holaaa??'];
  const T = [S.B2[0] + 0.02, K.dejaron - 0.05, K.en1 = (W[find('en visto', 10)].s - 0.05)];
  msgs.forEach((s, i) => {
    const y = 170 + i * 210;
    const b = el('div', ph, { right: '36px', top: px(y), background: PINK, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', padding: '16px 34px 20px', borderRadius: '40px 40px 8px 40px', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 6, transformOrigin: 'right bottom' }, s);
    const v = el('div', ph, { right: '44px', top: px(y + 108), fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: '#3b7dd8', zIndex: 6 }, 'Visto ✓✓');
    MS.push({ b, v, t: T[i] });
  });
  const stV = stamp(c, 200, 1080, 'VISTO ✓✓', { size: 96, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   C1 · «ASÍ QUE SE HIZO ESPÍA…» — Pujol se pone el disfraz (puf)
   ====================================================================== */
headline(S.C1[0], S.C1[1], 'Así que se hizo *espía…*', { size: 88, hlT: K.espia2 });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(ry, { r: t * 12 });
    const sw = t > K.espia2;
    pa.d.style.opacity = sw ? 0 : 1; pb.d.style.opacity = sw ? 1 : 0;
    const ks = sw ? 1 + 0.12 * (1 - p(t, K.espia2, 0.35, E.outCubic)) : pop(t, S.C1[0], 0.35);
    set(wrap, { s: ks, y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1.2) });
    face(pa, t, { look: [0, 0], seed: 1 }); face(pb, t, { look: [6, 0], bL: 4, bR: 16, seed: 1 });
    puffs.forEach((f, i) => { const kf = p(t, K.espia2 - 0.05, 0.5, E.outCubic); set(f, { x: Math.cos(i * 1.3) * 260 * kf, y: Math.sin(i * 1.3) * 200 * kf, s: 0.4 + kf * 1.2, o: t > K.espia2 - 0.05 && kf < 1 ? 1 - kf : 0 }); });
    popA(on, t, K.espia2 + 0.12, { r: -5 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2B2118' });
  const ry = rays(c, -160, 240, 1400, 24, 'rgba(255,230,0,.10)', 'rgba(0,0,0,0)', 0);
  const wrap = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px', zIndex: 5 });
  const pa = mk(wrap, [250, 460, 580, 741], pujolInner(), '0 0 360 460', 'bust');
  const pb = mk(wrap, [250, 460, 580, 741], pujolInner({ spy: true, tie: INK }), '0 0 360 460', 'bust');
  const puffs = [0, 1, 2, 3, 4, 5].map(() => box(c, 470, 760, 150, 110, { borderRadius: '50%', background: '#F4ECDB', border: `5px solid ${INK}`, zIndex: 8 }));
  const on = chip(c, 330, 1140, 'MODO ESPÍA: ON', { size: 50, bg: YEL, color: INK, z: 30 });
  // el titular va en claro sobre el fondo oscuro
  HLS[HLS.length - 1].b.style.color = '#FBF6EA';
}

/* ======================================================================
   C2 · «…DE LOS NAZIS» — oficina alemana: sello ACEPTADO + tinta invisible
   ====================================================================== */
headline(S.C2[0], S.C2[1], '…de *los nazis*', { size: 116, hlT: K.nazis2 });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    set(of.d, { s: pop(t, S.C2[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(of, t, { look: t > K.nazis2 ? [0, 6] : [-6, 4], bL: t > K.nazis2 ? 12 : 0, bR: t > K.nazis2 ? 12 : 6, seed: 0.6 });
    const kf = p(t, S.C2[0] + 0.05, 0.35, E.outBack);
    set(file, { y: (1 - kf) * 700, r: -4 + wobble(t, 0.4, 0.5) });
    stampA(stA, t, K.nazis2, -10, 1);
    const kg = 0.5 + 0.5 * Math.sin(t * 9);
    set(ink, { r: wobble(t, 0.6, 3), s: pop(t, S.C2[0] + 0.25, 0.35), o: t < S.C2[0] + 0.25 ? 0 : 1 }); glowI.style.opacity = t > K.de2 + 0.3 ? 0.4 + 0.5 * kg : 0;
    popA(chA, t, S.C2[0] + 0.3, { r: 3 });
  }, { clip: true });
  sceneBg(c, { background: '#C9C6B8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 96px)' });
  const of = mk(c, [420, 400, 480, 613], officerInner(), '0 0 360 460', 'bust'); of.d.style.zIndex = 4;
  const dk = box(c, 0, 1000, 1080, 300, { zIndex: 6, background: WOOD, borderTop: `7px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.15) 0 3px, transparent 3px 30px)' });
  const file = box(c, 90, 820, 540, 380, { zIndex: 8, background: '#F2E2B8', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `10px 10px 0 ${SH}` });
  el('div', file, { left: '30px', top: '24px', fontFamily: 'SpecialElite', fontSize: '40px', color: INK, lineHeight: 1.3 }, 'SOLICITUD DE AGENTE<br>Nombre: J. Pujol<br>Destino: ¿?');
  const stA = stamp(c, 140, 1050, 'ACEPTADO', { size: 96, bw: 12, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const ink = box(c, 700, 860, 170, 220, { zIndex: 9 });
  ink.innerHTML = `<svg viewBox="0 0 170 220" width="170" height="220" style="overflow:visible"><rect x="40" y="10" width="90" height="40" rx="8" fill="#5a4a3a" stroke="${INK}" stroke-width="5"/><path d="M30,60 Q30,46 50,46 L120,46 Q140,46 140,60 L150,200 Q150,214 136,214 L34,214 Q20,214 20,200 Z" fill="rgba(220,240,255,.7)" stroke="${INK}" stroke-width="6"/><rect x="40" y="110" width="90" height="56" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/><text x="85" y="134" text-anchor="middle" font-family="SpecialElite" font-size="18" fill="${INK}">TINTA</text><text x="85" y="156" text-anchor="middle" font-family="SpecialElite" font-size="15" fill="${INK}">invisible</text></svg>`;
  const glowI = box(c, 650, 820, 270, 300, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,230,0,.9), rgba(255,230,0,0) 65%)', zIndex: 7, opacity: 0 });
  const chA = chip(c, 480, 1180, 'espionaje alemán', { size: 40, bg: INK, color: '#fff', z: 30 });
}

/* ======================================================================
   D1 · «SE QUEDA EN LISBOA…» — mapa: le mandan a Londres, hace el giro en U y aterriza en Lisboa
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'Se queda en *Lisboa…*', { size: 104, hlT: K.lisboa });
{
  const MAD = mpE(-3.7, 40.4).map(Number), LON = mpE(-0.13, 51.5).map(Number), LIS = mpE(-9.14, 38.72).map(Number), BER = mpE(13.4, 52.5).map(Number);
  const c = scene(S.D1[0], S.D1[1], t => {
    set(mp, { s: 1.02 + 0.04 * p(t, S.D1[0], 2.2, E.linear) });
    // trayecto: Madrid → (hacia Londres) → giro en U → Lisboa
    const T0 = S.D1[0] + 0.05, TU = K.lisboa - 0.05, T1 = K.lisboa + 0.45;
    let x, y;
    if (t < TU) { const k = p(t, T0, TU - T0, E.inOutCubic); x = lerp(MAD[0], lerp(MAD[0], LON[0], 0.55), k); y = lerp(MAD[1], lerp(MAD[1], LON[1], 0.55), k); }
    else { const k = p(t, TU, T1 - TU, E.inOutCubic); const mx = lerp(MAD[0], LON[0], 0.55), my = lerp(MAD[1], LON[1], 0.55); x = lerp(mx, LIS[0] + 40, k) - Math.sin(k * Math.PI) * 120; y = lerp(my, LIS[1] - 40, k) - Math.sin(k * Math.PI) * 40; }
    set(tok.d, { x: x - 70, y: y - 70, r: Math.sin(t * 6) * 6 });
    face(tok.f, t, { look: [-4, 2], seed: 3 });
    trail.setAttribute('stroke-dashoffset', f1(-t * 80));
    popA(cLon, t, S.D1[0] + 0.05, { r: -3 }); popA(cBer, t, S.D1[0] + 0.12, { r: 3 });
    set(xLon, { s: pop(t, TU + 0.05, 0.3), o: t < TU + 0.05 ? 0 : 1, r: -8 });
    popA(cLis, t, K.lisboa, { r: -4 });
    set(pin, { y: (1 - p(t, K.lisboa, 0.25, E.outBounce)) * -140, o: t < K.lisboa ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '400px 900px' });
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = euroMapSvg();
  const ls = lineSvg(mp, 3);
  const trail = addLine(ls, MAD[0], MAD[1], LON[0], LON[1], INK, 6, '16 12');
  const cLon = chip(mp, LON[0] - 120, LON[1] - 130, 'LONDRES', { size: 44, bg: '#fff', color: INK, z: 20 });
  const xLon = el('div', mp, { left: px(LON[0] - 50), top: px(LON[1] - 70), fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: RED, textShadow: `4px 4px 0 ${INK}`, zIndex: 21, lineHeight: 1 }, '✗');
  const cBer = chip(mp, BER[0] - 210, BER[1] + 20, 'BERLÍN', { size: 40, bg: '#fff', color: INK, z: 20 });
  const pin = box(mp, LIS[0] - 30, LIS[1] - 80, 60, 80, { zIndex: 22 }); pin.innerHTML = pinSvg(RED);
  const cLis = chip(mp, LIS[0] + 30, LIS[1] - 190, 'LISBOA', { size: 66, bg: YEL, color: INK, z: 24 });
  const tok = pujolAv(mp, 0, 0, 140, { z: 23, bw: 6 });
  const ord = el('div', c, { left: '0', top: '1250px', width: '1080px', textAlign: 'center', zIndex: 40 }, `<span style="display:inline-block;font-family:Bricolage;font-weight:800;font-size:50px;color:${YEL};background:${INK};padding:8px 30px 12px;border-radius:100px;border:5px solid ${INK};box-shadow:6px 6px 0 ${RED}">LE MANDAN A LONDRES… NO VA</span>`);
  const _fd = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fd(t); popA(ord, t, S.D1[0] + 0.02, { r: -2, d: 0.3 }); };
}

/* ======================================================================
   D2 · «…Y SE LO INVENTA TODO CON UNA GUÍA DE TURISMO» — la mesa del hotel
   ====================================================================== */
headline(S.D2[0], K.guia - 0.12, 'Se lo inventa *todo…*', { size: 100, hlT: K.todo3 });
headline(K.guia - 0.12, S.D2[1], 'con una *guía de turismo*', { size: 90, hlT: K.guia });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(pj.d, { s: pop(t, S.D2[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    const wr = t > K.inventa - 0.1 && t < K.guia;
    face(pj, t, { look: wr ? [-6, 6] : [-8, 0], bL: 6, bR: 14, seed: 4 });
    set(ql, { x: wr ? Math.sin(t * 18) * 14 : 0, y: wr ? Math.cos(t * 18) * 8 : 0, r: 18 });
    const kg = p(t, K.guia - 0.1, 0.4, E.outBack);
    set(book, { s: 0.8 + 0.35 * kg, r: lerp(-14, -4, kg) + wobble(t, 0.5, 0.6), y: (1 - p(t, S.D2[0] + 0.05, 0.3, E.outBack)) * 800 });
    // informes que salen volando hacia Berlín
    LT.forEach((L, i) => { const k = p(t, L.t, 0.7, E.inCubic); set(L.e, { x: k * 700, y: -k * 700, r: k * 40 - 10, s: 1 - k * 0.5, o: t < L.t - 0.25 ? 0 : 1 - p(t, L.t + 0.55, 0.15) }); });
    stampA(stS, t, K.turismo + 0.05, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E9DCC0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 72px)' });
  const pj = mk(c, [540, 470, 420, 537], pujolInner(), '0 0 360 460', 'bust'); pj.d.style.zIndex = 4;
  const dk = box(c, 380, 990, 700, 180, { zIndex: 6 }); dk.innerHTML = deskSvg(700, 180);
  const ql = box(c, 600, 820, 100, 200, { zIndex: 8 }); ql.innerHTML = quillSvg();
  const book = box(c, 90, 460, 380, 470, { zIndex: 10, background: '#6a2e2a', border: `7px solid ${INK}`, borderRadius: '14px 26px 26px 14px', boxShadow: `12px 12px 0 ${SH}`, transformOrigin: '190px 235px' });
  box(book, 18, 18, 330, 420, { border: `4px solid ${GOLD}`, borderRadius: '10px' });
  el('div', book, { left: '0', top: '50px', width: '366px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', color: GOLD, lineHeight: 1.05 }, 'GUÍA DE<br>TURISMO');
  el('div', book, { left: '0', top: '196px', width: '366px', textAlign: 'center' }, `<svg width="120" height="150" viewBox="0 0 120 150"><rect x="40" y="30" width="40" height="120" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M36,30 L60,0 L84,30 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><circle cx="60" cy="58" r="13" fill="#6a2e2a" stroke="${INK}" stroke-width="3"/><path d="M60,58 L60,50 M60,58 L66,60" stroke="${GOLD}" stroke-width="3"/></svg>`);
  el('div', book, { left: '0', top: '360px', width: '366px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: GOLD }, 'Gran Bretaña');
  const LT = [K.inventa, K.todo3 + 0.2, K.guia + 0.1].map((tt, i) => { const e = box(c, 560 + i * 30, 900, 200, 140, { zIndex: 12 }); e.innerHTML = envSvg('INFORME', '#fff'); return { e, t: tt }; });
  const stS = stamp(c, 120, 830, 'TOP SECRET', { size: 70, bw: 10, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   E1 · MEME «Nadie: / Garbo: *se abre otra cuenta*» — tres espías inventados
   ====================================================================== */
{
  const c = scene(S.E1[0], S.E1[1], t => {
    set(cd, { s: pop(t, S.E1[0], 0.3), r: -1 + wobble(t, 0.5, 0.5) });
    popA(n1, t, S.E1[0] + 0.05, { d: 0.25 }); popA(n2, t, K.abre - 0.1, { d: 0.25 });
    AC.forEach(a => { const k = p(t, a.t, 0.3, E.outBack); set(a.e, { x: (1 - k) * 900, r: a.r, o: t < a.t ? 0 : 1 }); });
    popA(toast, t, K.inventados + 0.25, { r: 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2B2118' });
  const cd = box(c, 70, 340, 860, 940, { background: '#fff', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `14px 16px 0 rgba(0,0,0,.5)`, zIndex: 5 });
  const n1 = el('div', cd, { left: '56px', top: '46px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '78px', color: INK }, 'Nadie:');
  const n2 = el('div', cd, { left: '56px', top: '160px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '56px', color: INK, whiteSpace: 'nowrap' }, `Garbo: <i style="font-family:Playfair;font-weight:800;color:${PINK}">se abre otra cuenta</i>`);
  const AC = [];
  [[K.cuentas4, 'espía inventado n.º 1'], [K.espias4, 'espía inventado n.º 2'], [K.inventados, 'espía inventado n.º 3']].forEach(([tt, s], i) => {
    const e = box(cd, 40, 290 + i * 170, 760, 140, { background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '24px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 6 });
    botAv(e, 18, 14, 104, i + 1, { z: 7 });
    el('div', e, { left: '146px', top: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '46px', color: INK, whiteSpace: 'nowrap' }, s);
    el('div', e, { left: '146px', top: '78px', fontFamily: 'SpecialElite', fontSize: '28px', color: '#6a5a48', whiteSpace: 'nowrap' }, 'cuenta nueva · 0 personas detrás');
    AC.push({ e, t: tt - 0.04, r: [-1.5, 1, -0.5][i] });
  });
  const toast = el('div', c, { left: '0', top: '1180px', width: '1080px', textAlign: 'center', zIndex: 20 }, `<span style="display:inline-block;font-family:Bricolage;font-weight:800;font-size:46px;color:${INK};background:${YEL};padding:8px 30px 12px;border-radius:100px;border:5px solid ${INK};box-shadow:6px 6px 0 ${INK}">✓ Cuenta creada</span>`);
}

/* ======================================================================
   E2 · «Y CUELA TANTO…» — el oficial alemán encantado con los informes
   ====================================================================== */
headline(S.E2[0], S.E2[1], 'Y *cuela* tanto…', { size: 112, hlT: K.cuela });
{
  const PL = [];
  const c = scene(S.E2[0], S.E2[1], t => {
    set(of.d, { s: pop(t, S.E2[0], 0.35), y: wobble(t, 0.5, 3), r: Math.sin(t * 5) * 2, o: 1 });
    face(of, t, { look: [-4, 6], bL: 14, bR: 14, closed: t > K.tanto, seed: 0.2 });
    PL.forEach(q => { const k = p(t, q.t, 0.25, E.outBounce); set(q.e, { y: (1 - k) * -900, r: q.r, o: t < q.t ? 0 : 1 }); });
    set(bub, { s: pop(t, K.cuela - 0.05, 0.3), r: 3 + wobble(t, 0.6, 1), o: t < K.cuela - 0.05 ? 0 : 1 });
    HT.forEach((h, i) => { const tt = (t * 0.9 + i * 0.33) % 1; set(h, { y: -tt * 200, x: Math.sin(t * 4 + i) * 20, o: t > K.cuela ? 1 - tt : 0, s: 0.6 + tt }); });
  }, { clip: true });
  sceneBg(c, { background: '#C9C6B8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 96px)' });
  const of = mk(c, [410, 430, 500, 639], officerInner(14), '0 0 360 460', 'bust'); of.d.style.zIndex = 4;
  box(c, 380, 1040, 700, 260, { zIndex: 6, background: WOOD, borderTop: `7px solid ${INK}` });
  for (let i = 0; i < 6; i++) { const e = box(c, 560 + (i % 2) * 14, 990 - i * 34, 330, 60, { zIndex: 8 + i, background: '#F2E2B8', border: `5px solid ${INK}`, borderRadius: '6px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, textAlign: 'center', lineHeight: '50px' }, 'INFORME'); PL.push({ e, t: S.E2[0] + 0.05 + i * 0.13, r: (i % 2 ? 3 : -3) }); }
  const bub = bubble(c, 420, 400, '¡Excelente, agente!', { size: 56, tail: 'br', z: 40, it: true });
  const HT = [0, 1, 2].map(i => el('div', c, { left: px(470 + i * 110), top: '560px', fontSize: '60px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 30 }, '♥'));
}

/* ======================================================================
   E3 · «…QUE LOS DEL "VISTO"… LO FICHAN» — los ingleses del bombín se quedan de piedra
   ====================================================================== */
headline(S.E3[0], K.lo4 - 0.06, 'que los del *«visto»…*', { size: 100, hlT: K.visto4 });
headline(K.lo4 - 0.06, S.E3[1], '…lo *fichan*', { size: 120, hlT: K.fichan });
{
  const c = scene(S.E3[0], S.E3[1], t => {
    const sh = t > K.fichan;
    set(g1.d, { s: pop(t, S.E3[0], 0.35), y: wobble(t, 0.5, 3), o: 1 }); set(g2.d, { s: pop(t, S.E3[0] + 0.08, 0.35), y: wobble(t, 0.5, 3, 1), o: t < S.E3[0] + 0.08 ? 0 : 1 });
    face(g1, t, { look: sh ? [0, 0] : [6, 4], bL: sh ? 20 : 4, bR: sh ? 20 : 4, seed: 1 }); face(g2, t, { look: sh ? [0, 0] : [-6, 4], bL: sh ? 20 : 4, bR: sh ? 20 : 4, seed: 2 });
    popA(vis, t, K.visto4 - 0.05, { r: -4 });
    [cup1, cup2].forEach((cp, i) => { const kf = t > K.visto4 + 0.3 + i * 0.1 ? t - (K.visto4 + 0.3 + i * 0.1) : 0; set(cp, { y: kf * kf * 2600, r: kf * 300 * (i ? 1 : -1), o: kf > 0.6 ? 0 : 1 }); });
    popA(cn, t, K.fichan + 0.1, { r: -2 });
    stampA(stF, t, K.fichan, -10, 1);
  }, { clip: true });
  sceneBg(c, { background: '#D8D0BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 58px)' });
  const g1 = mk(c, [110, 480, 410, 524], britInner(41, 0), '0 0 360 460', 'bust'); g1.d.style.zIndex = 4;
  const g2 = mk(c, [530, 480, 410, 524], britInner(52, 1), '0 0 360 460', 'bust'); g2.d.style.zIndex = 4;
  const cup1 = box(c, 300, 900, 120, 110, { zIndex: 8 }); cup1.innerHTML = teaSvg();
  const cup2 = box(c, 700, 900, 120, 110, { zIndex: 8 }); cup2.innerHTML = teaSvg();
  const vis = el('div', c, { left: '640px', top: '420px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '52px', color: '#3b7dd8', background: '#fff', border: `5px solid ${INK}`, borderRadius: '20px', padding: '4px 22px 8px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 30 }, 'Visto ✓✓');
  const cn = chip(c, 385, 1040, 'NOMBRE EN CLAVE: GARBO', { size: 36, bg: INK, color: YEL, z: 30 });
  const stF = stamp(c, 420, 1140, 'FICHADO', { size: 88, bw: 12, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   F · «JUNTOS LLEGAN A VEINTISIETE: UNA RED DE BOTS… CON SUELDO NAZI» — organigrama que crece
   3 → 7 → 14 → 27 por SALTOS con sello (nunca contador). Cameo del emú como avatar-bot.
   ====================================================================== */
headline(S.F[0], K.una5 - 0.06, 'Juntos llegan a…', { size: 96, y: 210 });
headline(K.una5 - 0.06, K.con5 - 0.06, 'una *red de bots…*', { size: 104, hlT: K.red, y: 210 });
headline(K.con5 - 0.06, S.F[1], '…con *sueldo nazi*', { size: 104, hlT: K.sueldo, y: 210 });
const T_EMU = K.bots + 0.05;
{
  const ROWS = [3, 4, 7, 7, 6], RY = [600, 750, 892, 1034, 1176], RS = [100, 92, 84, 84, 84];
  const TJ = [K.juntos, K.llegan, K.llegan + 0.42, K.v27b + 0.4];
  const NODES = []; let gi = 0;
  ROWS.forEach((n, ri) => { for (let j = 0; j < n; j++) { const x = 110 + (n === 1 ? 390 : j * (760 / (n - 1))) + (ri % 2 ? 0 : 0); NODES.push({ x: n === 3 ? 250 + j * 290 : x, y: RY[ri], sz: RS[ri], ri, k: gi++ }); } });
  const grp = k => k < 3 ? 0 : k < 7 ? 1 : k < 14 ? 2 : 3;
  const c = scene(S.F[0], S.F[1], t => {
    const kz = p(t, K.red - 0.1, 0.5, E.inOutCubic);
    set(cam, { s: 1 + 0.06 * kz + 0.02 * p(t, K.red, 2.5, E.linear) });
    set(gb.d, { s: pop(t, S.F[0], 0.3), y: wobble(t, 0.5, 3), o: 1 });
    face(gb.f, t, { look: [0, 4], bL: 8, bR: 14, seed: 2 });
    NODES.forEach((nd, i) => {
      const t0 = TJ[grp(i)] + (i % 7) * 0.025, k = pop(t, t0, 0.3);
      const emuOn = nd.emu && t > T_EMU - 0.1 && t < T_EMU + 0.6;
      set(nd.b.d, { s: t < t0 ? 0 : k, y: Math.sin(t * 3 + i) * 4, o: t < t0 || emuOn ? 0 : 1 });
      nd.b.glow.style.opacity = t > K.red && t < K.con5 ? 0.5 + 0.5 * Math.sin(t * 10 + i) : 0;
      nd.ln.style.opacity = t < t0 ? 0 : 1; nd.ln.setAttribute('stroke-dashoffset', f1(-t * 50)); nd.ln.setAttribute('stroke', t > K.red ? PINK : RED);
      if (nd.pd) { set(nd.pd, { s: t < nd.tp ? 0 : lerp(2, 1, p(t, nd.tp, 0.16)), o: t < nd.tp ? 0 : 0.95, r: -12 }); }
    });
    NUM.forEach((nb, i) => { const t0 = TJ[i], t1 = i < 3 ? TJ[i + 1] : 999; nb.style.display = t >= t0 && t < t1 ? '' : 'none'; if (t >= t0 && t < t1) set(nb, { s: lerp(1.9, 1, p(t, t0, 0.18, E.outCubic)), r: -6 }); });
    stampA(stAll, t, K.v27b + 0.75, -8, 1); if (t > K.con5 - 0.1) stAll.style.opacity = 1 - p(t, K.con5 - 0.1, 0.15);
    // emú: un avatar del organigrama es el emú con gafas de espía (0,6 s)
    const ke = pop(t, T_EMU - 0.1, 0.25), ko = p(t, T_EMU + 0.5, 0.12);
    set(emuW, { s: t < T_EMU - 0.1 || t > T_EMU + 0.62 ? 0 : ke * (1 - ko) * 1.15, r: Math.sin(t * 12) * 6 });
    popA(nom, t, K.nazi5 - 0.05, { r: 3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 48px), repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 2px, transparent 2px 48px)' });
  const ls = lineSvg(cam, 3);
  const GX = 300, GY = 450;
  const rowsAt = ri => NODES.filter(n => n.ri === ri);
  NODES.forEach(nd => {
    let par = { x: GX, y: GY };
    if (nd.ri > 0) { const prev = rowsAt(nd.ri - 1); par = prev.reduce((a, b) => Math.abs(b.x - nd.x) < Math.abs(a.x - nd.x) ? b : a); }
    nd.ln = addLine(ls, par.x, par.y, nd.x, nd.y, RED, 5, '12 9');
    nd.b = botAv(cam, nd.x - nd.sz / 2, nd.y - nd.sz / 2, nd.sz, nd.k, { z: 8 });
  });
  // sellos «PAGADO» en algunos avatares con «sueldo»
  const pr = rng(5); NODES.forEach((nd, i) => { if (i % 3 === 1) { nd.pd = stamp(cam, nd.x - 52, nd.y - 16, 'PAGADO', { size: 24, bw: 4, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' }); nd.pd.style.padding = '0 6px 2px'; nd.tp = K.sueldo + pr() * 0.6; } });
  const gb = pujolAv(cam, GX - 85, GY - 95, 170, { z: 12 });
  chip(cam, GX + 70, GY - 40, 'GARBO', { size: 40, bg: INK, color: YEL, z: 14 });
  const NUM = [3, 7, 14, 27].map(n => el('div', cam, { left: '700px', top: '380px', width: '230px', height: '170px', lineHeight: '170px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: RED, background: 'rgba(255,255,255,.93)', border: `10px solid ${RED}`, borderRadius: '24px', zIndex: 40, display: 'none' }, String(n)));
  const stAll = stamp(cam, 130, 950, '27 · TODOS FALSOS', { size: 64, bw: 10, z: 45, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const emN = NODES[9];
  emN.emu = true;
  const emuW = box(cam, emN.x - 85, emN.y - 85, 170, 170, { zIndex: 20 });
  const ea = avatar(emuW, 0, 0, 170, 'EMU', { bg: '#F2D9A0', bw: 6 });
  el('div', emuW, { left: '43px', top: '55px', width: '84px', height: '22px', zIndex: 9 }, `<svg width="84" height="24" viewBox="0 0 84 24"><path d="M2,4 h34 v8 q0,10 -17,10 q-17,0 -17,-10 Z M48,4 h34 v8 q0,10 -17,10 q-17,0 -17,-10 Z" fill="${INK}"/><path d="M36,8 h12" stroke="${INK}" stroke-width="4"/></svg>`);
  void ea;
  const nom = chip(cam, 300, 1250, 'lo paga Alemania', { size: 50, bg: RED, color: '#fff', z: 46 });
}
