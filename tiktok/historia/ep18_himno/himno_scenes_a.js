/* Ep. 18 · escenas L0–L4 (todo clavado por texto a words.js vía K) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
// notas que salen de un punto y suben en bucle (ya en movimiento en t=0)
function noteStream(pa, n, x0, y0, o = {}) {
  const N = []; for (let i = 0; i < n; i++) N.push(noteEl(pa, x0, y0, o.sz || 80, i % 2, o.col || INK, o.z || 30));
  return (t, on = 1) => N.forEach((e, i) => {
    const per = o.per || 1.8, ph = ((t + i * per / n) % per + per) % per / per;
    const dx = (o.dx || 380) * ph + Math.sin((t + i) * 3) * 24, dy = -(o.dy || 420) * ph;
    set(e, { x: dx, y: dy, r: Math.sin(t * 4 + i) * 16, s: (0.6 + 0.6 * Math.sin(ph * Math.PI)) * on, o: on * Math.min(1, Math.sin(ph * Math.PI) * 2.2) });
  });
}

/* ======================================================================
   A · PORTADA — estadio, aficionado a punto de cantar, partitura «LETRA: ???»
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.03 + 0.05 * p(t, 0, 4.2, E.linear) });
    set(rayD, { r: t * 6 });
    // el aficionado coge aire y abre la boca para cantar… y se queda colgado
    const stuck = t > K.letra0;
    const jaw = stuck ? 0.55 : 0.55 + 0.35 * Math.abs(Math.sin(t * 7));
    set(fan.d, { y: wobble(t, 0.7, 4) + (stuck ? Math.sin(t * 40) * 2 * (1 - p(t, K.letra0, 0.4)) : 0), r: -2 + (stuck ? 0 : wobble(t, 0.5, 1.5)) });
    fanFace(fan, t, { jaw, look: stuck ? [8, -2] : [6, -6], bL: stuck ? 14 : 6, bR: stuck ? 16 : 6, sweat: t > K.letra0 + 0.2, seed: 0.5 });
    notes(t, 1 - p(t, K.letra0, 0.3));
    set(sc.wrap, { r: 4 + wobble(t, 0.5, 0.6), y: wobble(t, 0.7, 4, 1) });
    QQ.forEach((q, i) => set(q, { y: Math.sin(t * 6 + i * 1.3) * 10, r: [-8, 6, -4][i] + Math.sin(t * 5 + i) * 6, s: 1 + 0.12 * Math.max(0, Math.sin(t * 6 + i)) }));
    stampA(sinL, t, K.letra0, -9, 1);
    popA(olv, t, K.olvido, { r: -4 });
    set(xo, { s: t < K.olvido + 0.25 ? 0 : lerp(1.6, 1, p(t, K.olvido + 0.25, 0.15)), r: 0, o: t < K.olvido + 0.25 ? 0 : 1 });
    set(qm, { s: pop(t, K.no0, 0.3), r: 10 + Math.sin(t * 6) * 6, o: t < K.no0 ? 0 : 1 });
    paint(tHL, t, -1, 0.1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EADFC8' });
  const rayD = rays(cam, -170, 260, 1420, 26, 'rgba(255,230,0,.38)', 'rgba(0,0,0,0)', 0);
  box(cam, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = stadiumSvg({ top: 470, bot: 980, rows: 8 });
  const sc = scorePaper(cam, 430, 420, 600, 640, { title: 'HIMNO', tsz: 54, top: 110, gap: 120, staves: 3, seed: 7 });
  sc.wrap.style.zIndex = 6;
  el('div', sc.inner, { left: '26px', top: '470px', fontFamily: 'Rye', fontSize: '74px', color: INK, whiteSpace: 'nowrap' }, 'LETRA:');
  const QQ = ['?', '?', '?'].map((q, i) => el('div', sc.inner, { left: px(330 + i * 70), top: '430px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', lineHeight: 1, color: RED, zIndex: 3 }, q));
  const fan = mkFan(cam, [10, 640, 560, 716], 41, { moustache: true, cap: true, coat: '#4a3a2c' }); fan.d.style.zIndex = 8;
  const notes = noteStream(cam, 5, 290, 960, { sz: 84, dx: 120, dy: 520, per: 2.0, z: 9 });
  const sinL = stamp(cam, 215, 700, 'SIN LETRA', { size: 116, bw: 16, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const olv = chip(cam, 440, 1170, 'no es un olvido', { size: 52, bg: PINK, z: 70 });
  const xo = box(cam, 920, 1150, 0, 0, { zIndex: 71 }); void xo;
  const qm = qMark(cam, 70, 700, 150);
  // título-portada (visible desde el fotograma 0)
  const ttl = el('div', cam, { left: '30px', top: '170px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '94px', lineHeight: 1.0, color: INK, zIndex: 50 });
  ttl.innerHTML = `El ${hlSpan('<i>himno</i>', 'th')} de España`;
  const tHL = ttl.querySelector('.th');
}

/* ======================================================================
   B · DE LOS POQUÍSIMOS HIMNOS DEL MUNDO — globo con bocadillos
   ====================================================================== */
headline(S.B[0], S.B[1], 'De los *poquísimos* himnos del mundo', { size: 80, hlT: K.poq });
{
  const c = scene(S.B[0], S.B[1], t => {
    set(gl, { s: pop(t, S.B[0] + 0.02, 0.45), r: Math.sin(t * 0.8) * 3, o: 1 });
    BB.forEach((b, i) => { const t0 = K.poq - 0.15 + i * 0.16; set(b, { s: pop(t, t0, 0.35) * (t > K.noL1 ? 0.92 : 1), y: Math.sin(t * 3 + i) * 6, r: [-5, 4, -3, 6, -6, 3][i], o: t < t0 ? 0 : (t > K.noL1 ? 0.75 : 1) }); });
    const ke = pop(t, K.mundo, 0.4);
    set(emp, { s: ke * (1 + (t > K.noL1 ? 0.08 * Math.max(0, Math.sin((t - K.noL1) * 10)) : 0)), r: 3, o: t < K.mundo ? 0 : 1, x: t > K.noL1 && t < K.noL1 + 0.35 ? Math.sin(t * 60) * 8 : 0 });
    popA(es, t, K.noL1, { r: -6 });
    set(pin, { s: pop(t, K.mundo + 0.15, 0.3), o: t < K.mundo + 0.15 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const gl = box(c, 240, 420, 600, 700, { zIndex: 4 }); gl.innerHTML = `<svg viewBox="0 0 600 700" width="600" height="700" style="overflow:visible">${globeSvg()}</svg>`;
  const BB = [[40, 470, 300], [760, 450, 270], [30, 720, 280], [790, 690, 250], [70, 980, 300], [760, 1110, 250]].map(([x, y, w], i) => {
    const b = singBubble(c, x, y, w, 120, { tail: x > 500 ? 'bl' : 'br', z: 20 });
    el('div', b, { left: '20px', top: '12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '44px', color: INK }, '♪');
    box(b, 66, 26, w - 90, 40).innerHTML = squig(w - 90, 30 + i);
    return b;
  });
  const emp = singBubble(c, 440, 880, 330, 170, { tail: 'bl', z: 25, sw: 8, stroke: RED, dash: '22 12', html: '', bg: '#fff' });
  el('div', emp, { left: '0', top: '20px', width: '330px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: 'rgba(43,33,24,.3)' }, '…');
  const es = chip(c, 500, 1090, 'España', { size: 54, bg: PINK, z: 40 });
  const pin = box(c, 400, 600, 60, 90, { zIndex: 26 }); pin.innerHTML = `<svg viewBox="0 0 60 90" width="60" height="90" style="overflow:visible"><path d="M30,88 L12,40 A20,20 0 1,1 48,40 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="30" cy="30" r="8" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`;
}

/* ======================================================================
   G1 · SIGLO XVIII: MARCHA MILITAR — granaderos desfilando con tambores
   ====================================================================== */
headline(S.G1[0], S.G1[1], 'Nació… *marcha militar*', { size: 80, hlT: K.marcha });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const dt = t - S.G1[0];
    GR.forEach((g, i) => {
      const x = lerp(-700, 0, E.outCubic(clamp(dt / 1.1))) + dt * 16;
      set(g.d, { x, y: -Math.abs(Math.sin((t + i * 0.2) * 9)) * 8 });
      granPose(g, t, { ph: i * 0.2, look: [3, 0], seed: i * 0.7 });
    });
    stampA(sig, t, K.d18, -6, 1);
    const ks = p(t, K.mGran - 0.05, 0.6, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -520, r: (1 - ks) * 10 + Math.sin(t * 2.2) * 1.2, o: t < K.mGran - 0.07 ? 0 : 1 });
    popA(mil, t, K.militar, { r: 4 });
    notes(t, p(t, K.marcha, 0.4));
    set(flagP, { r: Math.sin(t * 3) * 3 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE3C8', backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,.5), rgba(255,255,255,0) 60%)' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  // fondo: muralla/cuartel en grabado
  const bgW = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  { let s = ''; for (let x = -20; x < 1100; x += 90) s += `<rect x="${x}" y="760" width="60" height="44" fill="#d9c7a6" stroke="${INK}" stroke-width="3"/>`; s += `<rect x="-20" y="800" width="1120" height="420" fill="#d9c7a6" stroke="${INK}" stroke-width="4"/><rect x="-20" y="800" width="1120" height="420" fill="url(#hP)"/>`; for (let y = 830; y < 1220; y += 46) for (let x = (y / 46) % 2 ? -20 : 25; x < 1100; x += 90) s += `<rect x="${x}" y="${y}" width="90" height="46" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".35"/>`; bgW.innerHTML = `<svg width="1080" height="1920">${s}</svg>`; }
  const flagP = box(c, 860, 520, 120, 280, { zIndex: 2, transformOrigin: '10px 280px' }); flagP.innerHTML = `<svg width="120" height="280" style="overflow:visible"><path d="M10,0 V280" stroke="${INK}" stroke-width="8"/><path d="M14,10 Q60,0 110,20 L110,90 Q60,70 14,82 Z" fill="${FIG}" stroke="${INK}" stroke-width="4"/><path d="M14,10 Q60,0 110,20 L110,90 Q60,70 14,82 Z" fill="url(#hA)" opacity=".5"/></svg>`;
  ground(c, 1262);
  const GR = [0, 1, 2].map(i => { const g = mkGran(c, [60 + i * 300, 760, 220, 520], { lin: i === 1 ? '#3d5a8a' : RED }); g.d.style.zIndex = 6 + i; return g; });
  const notes = noteStream(c, 6, 340, 900, { sz: 70, dx: 300, dy: 300, per: 1.6, z: 12 });
  const sig = stamp(c, 90, 385, 'siglo XVIII', { size: 104, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const mil = chip(c, 640, 1290, 'marcha militar', { size: 44, bg: INK, color: YEL, z: 30 });
  const sign = box(c, 100, 520, 880, 200, { zIndex: 35 });
  sign.innerHTML = `<svg width="880" height="200" style="position:absolute;left:0;top:0;overflow:visible"><path d="M200,-600 V20 M680,-600 V20" stroke="${INK}" stroke-width="6"/>${cut('<rect x="10" y="20" width="860" height="170" rx="18"/>')}<rect x="10" y="20" width="860" height="170" rx="18" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="10" y="20" width="860" height="170" rx="18" fill="url(#hW)" opacity=".35"/><rect x="28" y="36" width="824" height="138" rx="10" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/></svg>`;
  el('div', sign, { left: '0', top: '50px', width: '880px', textAlign: 'center', fontFamily: 'Rye', fontSize: '68px', lineHeight: 1.4, color: YEL, textShadow: `4px 4px 0 ${INK}`, whiteSpace: 'nowrap' }, 'Marcha de Granaderos');
}

/* ======================================================================
   G2 · MÚSICA PARA DESFILAR… SIN PALABRAS — tambor en primer plano
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Música para *desfilar*', { size: 92, hlT: K.desfilar });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, S.G2[0], 2.9, E.linear) });
    set(g.d, { y: -Math.abs(Math.sin(t * 9)) * 10 + wobble(t, 0.6, 2) });
    granPose(g, t, { leg: 10, look: t > K.sin ? [0, 0] : [4, -2], seed: 0.3, closed: t > K.desfilar && t < K.sin - 0.1 });
    if (g.gm) g.gm.setAttribute('d', t > K.sin ? 'M104,134 h12' : 'M104,134 q6,4 12,0');
    staff.style.backgroundPosition = `${f1(-t * 240)}px 0`;
    SN.forEach((n, i) => { const x = ((i * 230 - t * 240) % 1380 + 1380) % 1380 - 150; set(n, { x, y: Math.sin(t * 5 + i) * 10, r: Math.sin(t * 4 + i) * 10 }); });
    const kb = pop(t, K.sin, 0.35); set(emp, { s: kb, o: t < K.sin ? 0 : 1, r: -3 });
    stampA(sp, t, K.palabras, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 58px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const staff = box(cam, 0, 420, 1080, 210, { zIndex: 2, backgroundImage: `repeating-linear-gradient(0deg, transparent 0 34px, ${INK} 34px 38px)`, borderTop: `4px solid ${INK}`, opacity: 0.55 });
  const SN = [0, 1, 2, 3, 4, 5].map(i => noteEl(cam, 0, 400 + (i % 3) * 36, 90, i % 2, INK, 3));
  const g = mkGran(cam, [330, 520, 420, 993]); g.d.style.zIndex = 6;
  const emp = singBubble(cam, 600, 470, 380, 200, { tail: 'bl', z: 20, sw: 7, dash: '20 12', html: '<span style="color:rgba(43,33,24,.3);font-size:90px">…</span>' });
  const sp = stamp(cam, 190, 860, 'SIN PALABRAS', { size: 112, bw: 15, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   M1 · CON EL TIEMPO… LA MARCHA REAL — el cartel cambia de nombre
   ====================================================================== */
headline(S.M1[0], S.M1[1], 'Con el tiempo… la *Marcha Real*', { size: 84, hlT: K.real });
{
  const c = scene(S.M1[0], S.M1[1], t => {
    set(sign, { s: pop(t, S.M1[0] + 0.02, 0.4), r: -2 + wobble(t, 0.4, 0.8), o: 1 });
    strike.style.transform = `scaleX(${f1(p(t, K.convirtio, 0.3, E.outCubic) * 1000) / 1000}) rotate(-3deg)`;
    old.style.opacity = t > K.convirtio + 0.3 ? 0.55 : 1;
    const kr = p(t, K.real, 0.16, E.outCubic); set(real, { s: t < K.real ? 0 : lerp(1.9, 1, kr), r: -5, o: t < K.real ? 0 : 1 });
    // reloj de arena que gira: «con el tiempo»
    const kh = p(t, K.tiempo, 0.5, E.inOutCubic); set(hg, { s: pop(t, K.tiempo - 0.1, 0.35), r: 180 * kh + wobble(t, 0.6, 3), o: t < K.tiempo - 0.1 ? 0 : 1 });
    popA(tch, t, K.tiempo, { r: -4 });
    SP.forEach((s, i) => { const t0 = K.real + 0.05 + i * 0.08; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 }); });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  rays(c, -170, 380, 1420, 22, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const sign = box(c, 90, 430, 900, 420, { zIndex: 10 });
  sign.innerHTML = `<svg width="900" height="520" style="position:absolute;left:0;top:0;overflow:visible"><path d="M200,380 V560 M700,380 V560" stroke="${INK}" stroke-width="22"/><path d="M200,380 V560 M700,380 V560" stroke="${WOOD}" stroke-width="12"/>${cut('<rect x="10" y="10" width="880" height="380" rx="22"/>')}<rect x="10" y="10" width="880" height="380" rx="22" fill="${WOOD}" stroke="${INK}" stroke-width="7"/><rect x="10" y="10" width="880" height="380" rx="22" fill="url(#hW)" opacity=".35"/><rect x="30" y="30" width="840" height="340" rx="12" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/></svg>`;
  el('div', sign, { left: '0', top: '50px', width: '900px', textAlign: 'center', fontFamily: 'Rye', fontSize: '120px', lineHeight: 1, color: YEL, textShadow: `5px 5px 0 ${INK}`, whiteSpace: 'nowrap' }, 'MARCHA');
  const old = el('div', sign, { left: '0', top: '200px', width: '900px', textAlign: 'center', fontFamily: 'Rye', fontSize: '86px', lineHeight: 1, color: '#F7F0E0', textShadow: `4px 4px 0 ${INK}`, whiteSpace: 'nowrap' }, 'de Granaderos');
  const strike = box(sign, 70, 236, 760, 20, { background: RED, border: `3px solid ${INK}`, borderRadius: '10px', transformOrigin: 'left center', zIndex: 3 });
  const real = el('div', sign, { left: '250px', top: '170px', width: '400px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '170px', color: INK, background: YEL, border: `7px solid ${INK}`, boxShadow: `9px 10px 0 ${SH}`, zIndex: 5 }, 'REAL');
  const hg = box(c, 700, 1000, 150, 220, { zIndex: 12 });
  hg.innerHTML = `<svg viewBox="0 0 150 220" width="150" height="220" style="overflow:visible">${cut('<rect x="10" y="0" width="130" height="22" rx="6"/><rect x="10" y="198" width="130" height="22" rx="6"/><path d="M28,22 Q28,90 75,110 Q122,90 122,22 Z M28,198 Q28,130 75,110 Q122,130 122,198 Z"/>', 4, 5)}<path d="M28,22 Q28,90 75,110 Q122,90 122,22 Z M28,198 Q28,130 75,110 Q122,130 122,198 Z" fill="rgba(255,255,255,.7)" stroke="${INK}" stroke-width="4"/><path d="M50,60 Q75,80 100,60 Q90,95 75,104 Q60,95 50,60 Z M40,196 Q75,150 110,196 Z" fill="#D9A55A" stroke="${INK}" stroke-width="2"/><rect x="10" y="0" width="130" height="22" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="10" y="198" width="130" height="22" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const tch = chip(c, 420, 1240, 'con el tiempo', { size: 44, bg: PINK, z: 30 });
  const SP = [[160, 600], [880, 560], [820, 820], [200, 840]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
}

/* ======================================================================
   M2 · VARIAS LETRAS… NINGUNA OFICIAL QUE DURARA — hojas que llegan y caen
   ====================================================================== */
headline(S.M2[0], K.pero - 0.06, 'Le pusieron *varias letras*…', { size: 84, hlT: K.varias });
headline(K.pero - 0.06, S.M2[1], '…pero *ninguna oficial*', { size: 90, hlT: K.ninguna, hlc: '#ff9aa8' });
{
  const c = scene(S.M2[0], S.M2[1], t => {
    set(base.wrap, { y: (1 - p(t, S.M2[0], 0.4, E.outBack)) * 900, r: -1.5 + wobble(t, 0.4, 0.5) });
    SH4.forEach((q, i) => {
      const ki = p(t, q.t, 0.4, E.outBack), tf = K.ninguna + 0.05 + i * 0.13, kf = clamp((t - tf) / 0.9);
      set(q.pp.wrap, { x: (1 - ki) * q.fx + kf * q.dx, y: (1 - ki) * -300 + kf * kf * 1500, r: q.r + kf * q.dr, o: t < q.t ? 0 : 1 });
    });
    stampA(nof, t, K.oficial, -8, 1);
    popA(dur, t, K.durara, { r: 4 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const base = scorePaper(c, 380, 430, 560, 700, { title: 'MARCHA REAL', tsz: 46, top: 110, gap: 140, staves: 4, seed: 12 });
  base.wrap.style.zIndex = 2;
  const SH4 = [[K.pusieron, 330, 470, -9, -900], [K.varias, 600, 520, 7, 900], [K.letras, 360, 690, -4, -900], [K.letras + 0.22, 620, 720, 10, 900]].map(([t0, x, y, r, fx], i) => {
    const pp = lyricSheet(c, x, y, 330, 420, { seed: 20 + i, title: 'LETRA' }); pp.wrap.style.zIndex = 5 + i;
    return { pp, t: t0, r, fx, dx: (i % 2 ? 160 : -160), dr: (i % 2 ? 50 : -50) };
  });
  const nof = stamp(c, 170, 820, 'NINGUNA OFICIAL', { size: 84, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const dur = chip(c, 560, 1180, '…que durara', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   D1 · EN LA DICTADURA SE CANTÓ UNA MUY CONOCIDA — partitura con texto ilegible
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'Se cantó una *muy conocida*', { size: 88, hlT: K.muy });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(sc.wrap, { s: pop(t, S.D1[0] + 0.03, 0.4) * (1 + 0.04 * p(t, S.D1[0], 2.5, E.linear)), r: 2 + wobble(t, 0.4, 0.5), o: 1 });
    popA(dc, t, K.dict, { r: -5 });
  });
  sceneBg(c, { background: '#DCD5C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const sc = scorePaper(c, 290, 420, 600, 680, { top: 60, gap: 150, staves: 4, lyr: true, seed: 31, bg: '#ECE6D8' });
  sc.wrap.style.zIndex = 4; sc.wrap.style.filter += ' grayscale(.7)';
  const dc = darkChip(c, 470, 1150, 'dictadura', { size: 58, z: 30 });
}

/* ======================================================================
   D2 · CON LA DEMOCRACIA, DEJÓ DE USARSE — al cajón del archivo
   ====================================================================== */
headline(S.D2[0], S.D2[1], 'Con la democracia, *dejó de usarse*', { size: 80, hlT: K.dejo });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    const kO = p(t, S.D2[0] + 0.05, 0.35, E.outBack), kC = p(t, K.usarse - 0.05, 0.18, E.inCubic);
    const open = kO * (1 - kC);
    set(drw, { y: open * 210, s: 1 + open * 0.08 });
    const kd = p(t, K.dejo - 0.1, 0.55, E.inOutCubic);
    set(sc.wrap, { y: lerp(0, 330, kd), sy: lerp(1, 0.15, kd), s: 0.62, r: lerp(-3, 0, kd), o: t > K.usarse - 0.05 ? 0 : 1 });
    set(cab, { x: t > K.usarse && t < K.usarse + 0.3 ? Math.sin(t * 60) * 6 : 0 });
    popA(dm, t, K.democ, { r: 4 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const cab = box(c, 310, 560, 460, 640, { zIndex: 2 }); cab.innerHTML = `<svg viewBox="0 0 460 640" width="460" height="640" style="overflow:visible">${cabinetSvg()}</svg>`;
  const sc = scorePaper(c, 240, 160, 600, 680, { top: 60, gap: 150, staves: 4, lyr: true, seed: 31, bg: '#ECE6D8' });
  sc.wrap.style.zIndex = 3; sc.wrap.style.filter += ' grayscale(.7)'; sc.wrap.style.transformOrigin = '300px 640px';
  const drw = box(c, 330, 600, 420, 200, { zIndex: 6, transformOrigin: '210px 100px' }); drw.innerHTML = drawerFront();
  const dm = chip(c, 500, 1240, 'democracia', { size: 58, bg: PINK, z: 30 });
}
