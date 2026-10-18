/* Ep. 27 · escenas L6–L13 (todo clavado por texto vía K) */

/* ======================================================================
   G1 · «UNO SE "MUERE"» — un avatar se pone gris con lazo negro + esquela de Liverpool
   ====================================================================== */
headline(S.G1[0], S.G1[1], 'Uno se *«muere»*', { size: 116, hlT: K.muere });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const dead = t > K.muere;
    set(av.d, { s: pop(t, S.G1[0], 0.3) * (dead ? 1 - 0.06 * p(t, K.muere, 0.3) : 1), r: dead ? -6 * p(t, K.muere, 0.3) : wobble(t, 0.5, 2), y: wobble(t, 0.5, 4) });
    av.d.style.filter = dead ? `grayscale(1) brightness(${f1(1 - 0.35 * p(t, K.muere, 0.3))})` : 'none';
    set(rib, { s: pop(t, K.muere + 0.05, 0.3), r: 12, o: t < K.muere + 0.05 ? 0 : 1 });
    const kn = p(t, K.muere + 0.2, 0.35, E.outBack);
    set(np, { x: (1 - kn) * 900, r: 5 + wobble(t, 0.4, 0.6), o: t < K.muere + 0.2 ? 0 : 1 });
    popA(lv, t, S.G1[0] + 0.1, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const av = botAv(c, 120, 460, 400, 3, { z: 6 });
  const rib = box(c, 430, 440, 130, 150, { zIndex: 12 }); rib.innerHTML = ribbonSvg();
  const lv = chip(c, 150, 900, 'espía inventado · Liverpool', { size: 40, bg: INK, color: '#fff', z: 20 });
  const np = box(c, 560, 640, 420, 520, { zIndex: 14, background: '#F4ECDB', border: `5px solid ${INK}`, boxShadow: `10px 10px 0 ${SH}`, transformOrigin: '210px 260px' });
  el('div', np, { left: '0', top: '14px', width: '410px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '42px', color: INK, borderBottom: `4px double ${INK}`, paddingBottom: '8px' }, 'DIARIO LOCAL');
  const ob = el('div', np, { left: '40px', top: '96px', width: '320px', height: '250px', border: `8px solid #111`, background: '#fff', textAlign: 'center' });
  el('div', ob, { left: '0', top: '18px', width: '320px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '48px', color: '#111' }, 'ESQUELA');
  el('div', ob, { left: '0', top: '86px', width: '320px', textAlign: 'center', fontSize: '50px', color: '#111' }, '✝');
  el('div', ob, { left: '0', top: '160px', width: '320px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', color: '#111', lineHeight: 1.2 }, 'Sus amigos<br>le recuerdan');
  for (let i = 0; i < 5; i++) box(np, 40, 370 + i * 26, i % 2 ? 260 : 330, 8, { background: 'rgba(43,33,24,.45)' });
}

/* ======================================================================
   G2 · «Y LOS NAZIS, PENSIÓN A LA VIUDA…» — el sobre PENSIÓN vuela hasta la puerta
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Y los nazis: *pensión* a la viuda…', { size: 84, hlT: K.pension });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    const T0 = K.nazis6 - 0.1, T1 = K.viuda - 0.05;
    const k = p(t, T0, T1 - T0, E.inOutCubic);
    set(env, { x: lerp(-260, 590, k), y: lerp(560, 720, k) - Math.sin(k * Math.PI) * 220, r: lerp(-30, 6, k) + Math.sin(t * 9) * 4 * (1 - k), s: lerp(0.8, 1, k) });
    set(door, { r: wobble(t, 0.4, 0.5) });
    const kk = t > T1 ? Math.abs(Math.sin((t - T1) * 18)) * (1 - p(t, T1, 0.6)) : 0;
    set(knock, { o: kk > 0.05 ? 1 : 0, s: 0.8 + kk * 0.6 });
    popA(chP, t, K.pension, { r: -4 });
    set(pl, { s: pop(t, S.G2[0] + 0.1, 0.35), o: t < S.G2[0] + 0.1 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#D8CCB2', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 3px, transparent 3px 120px)' });
  const wall = box(c, 0, 1160, 1080, 200, { background: '#B9A07A', borderTop: `6px solid ${INK}`, zIndex: 2 });
  const door = box(c, 600, 560, 340, 600, { zIndex: 5, transformOrigin: '170px 600px' }); door.innerHTML = doorSvg();
  const pl = el('div', c, { left: '640px', top: '640px', width: '260px', textAlign: 'center', fontFamily: 'Rye', fontSize: '30px', color: INK, background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', padding: '6px 0 8px', zIndex: 8 }, 'Sra. viuda de…');
  const env = box(c, 0, 0, 300, 200, { zIndex: 20 }); env.innerHTML = envSvg('PENSIÓN', '#F4E4C0');
  const knock = el('div', c, { left: '470px', top: '880px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '64px', color: INK, zIndex: 22 }, '¡toc, toc!');
  const chP = chip(c, 420, 1210, 'cada mes, de Alemania', { size: 40, bg: RED, color: '#fff', z: 30 });
  void wall;
}

/* ======================================================================
   G3 · «…DE UN SEÑOR QUE NO EXISTÍA» — el retrato vacío y el sello NO EXISTE
   ====================================================================== */
headline(S.G3[0], S.G3[1], 'de un señor *que no existía*', { size: 92, hlT: K.existia, color: '#FBF6EA', keyColor: YEL, hlc: 'rgba(0,0,0,0)' });
{
  const c = scene(S.G3[0], S.G3[1], t => {
    set(fr, { s: pop(t, S.G3[0], 0.35), r: -2 + wobble(t, 0.4, 0.8), y: wobble(t, 0.5, 4) });
    sil.style.strokeDashoffset = f1(-t * 40);
    set(qm, { s: pop(t, K.senor, 0.35), r: Math.sin(t * 5) * 10, o: t < K.senor ? 0 : 1 });
    stampA(stN, t, K.existia, -12, 1);
    popA(wd, t, S.G3[0] + 0.15, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2B2118' });
  rays(c, -160, 160, 1400, 24, 'rgba(255,230,0,.07)', 'rgba(0,0,0,0)', 0);
  const fr = box(c, 330, 440, 520, 640, { zIndex: 5 });
  fr.innerHTML = `<svg viewBox="0 0 520 640" width="520" height="640" style="overflow:visible"><rect x="14" y="16" width="520" height="640" rx="40" fill="rgba(0,0,0,.4)"/><rect x="0" y="0" width="520" height="640" rx="40" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><rect x="0" y="0" width="520" height="640" rx="40" fill="url(#hA)" opacity=".3"/><rect x="50" y="50" width="420" height="540" rx="210" fill="#F4ECDB" stroke="${INK}" stroke-width="7"/><path class="sil" d="M260,170 C214,170 196,206 196,240 C196,290 226,320 260,320 C294,320 324,290 324,240 C324,206 306,170 260,170 Z M130,560 C136,440 190,392 260,392 C330,392 384,440 390,560" fill="none" stroke="${INK}" stroke-width="7" stroke-dasharray="20 14"/></svg>`;
  const sil = fr.querySelector('.sil');
  const qm = qMark(c, 545, 560, 170, PINK);
  const stN = stamp(c, 300, 840, 'NO EXISTE', { size: 110, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const wd = chip(c, 420, 1150, 'y la viuda… cobrando', { size: 40, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   H1 · «DÍA D. PUJOL AVISA:» — mapa del Canal: barcos en Normandía; Garbo transmite desde Londres
   ====================================================================== */
const P_LON = mpC(-0.13, 51.5).map(Number), P_CAL = mpC(1.86, 50.95).map(Number), P_NOR = mpC(-0.6, 49.36).map(Number);
headline(S.H1[0], S.H1[1], 'Día D. Pujol *avisa:*', { size: 100, hlT: K.avisa });
function chanBase(c) {
  sceneBg(c, { background: '#AFC0B6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '600px 800px' });
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = channelSvg();
  return mp;
}
{
  const BT = [];
  const c = scene(S.H1[0], S.H1[1], t => {
    set(mp, { s: 1 + 0.04 * p(t, S.H1[0], 2.2, E.linear) });
    BT.forEach(b => { const k = p(t, b.t, 0.5, E.outCubic); set(b.e, { x: 0, y: (1 - k) * -260, r: Math.sin(t * 4 + b.t * 7) * 4, o: t < b.t ? 0 : 1 }); });
    popA(dd, t, K.D, { r: -4 });
    set(gb.d, { s: pop(t, K.pujol7 - 0.05, 0.35), o: t < K.pujol7 - 0.05 ? 0 : 1 });
    face(gb.f, t, { look: [4, 4], bL: 8, bR: 14, jaw: t > K.avisa ? talkW(t, 'VECINO') * 0.6 : 0, seed: 5 });
    WV.forEach((w, i) => { const k = ((t - K.avisa) * 1.6 + i / 3) % 1; set(w, { s: 0.4 + k * 1.4, o: t > K.avisa ? 1 - k : 0 }); });
  }, { clip: true });
  const mp = chanBase(c);
  [[-1.2, 49.5], [-0.9, 49.45], [-0.55, 49.4], [-0.25, 49.38], [0.05, 49.38]].forEach((q, i) => { const pp = mpC(q[0], q[1] + 0.35).map(Number); const e = box(mp, pp[0] - 60, pp[1] - 40, 120, 80, { zIndex: 10 }); e.innerHTML = boatSvg(); BT.push({ e, t: S.H1[0] + 0.05 + i * 0.12 }); });
  const dd = chip(mp, P_NOR[0] - 300, P_NOR[1] + 70, 'DÍA D · 6 JUN 1944', { size: 46, bg: YEL, color: INK, z: 20 });
  const WV = [0, 1, 2].map(() => box(mp, P_LON[0] - 110, P_LON[1] - 110, 220, 220, { borderRadius: '50%', border: `8px solid ${PINK}`, zIndex: 11 }));
  const gb = pujolAv(mp, P_LON[0] - 70, P_LON[1] - 70, 140, { z: 14 });
  chip(mp, P_LON[0] + 80, P_LON[1] - 40, 'LONDRES', { size: 34, bg: '#fff', color: INK, z: 15 });
}

/* ======================================================================
   H2 · «"NORMANDÍA ES UNA DISTRACCIÓN."» — el télex que sale de Garbo
   ====================================================================== */
{
  const msg = 'NORMANDÍA = DISTRACCIÓN';
  const c = scene(S.H2[0], S.H2[1], t => {
    const ku = p(t, S.H2[0], 0.5, E.outCubic);
    set(strip, { y: (1 - ku) * 300, r: -2 + wobble(t, 0.5, 0.5) });
    const n = Math.round(clamp((t - K.normandia + 0.05) / (W[find('distraccion', 80)].e - K.normandia)) * msg.length);
    tx.textContent = msg.slice(0, n);
    set(mach, { y: Math.sin(t * 40) * (n < msg.length && t > K.normandia ? 2 : 0) });
    stampA(stD, t, K.distraccion + 0.3, -10, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f2a26' });
  halftone(c, 'rgba(255,255,255,.05)', 0);
  const strip = box(c, 150, 420, 780, 560, { zIndex: 5, background: '#FBF3DD', border: `6px solid ${INK}`, boxShadow: `12px 12px 0 rgba(0,0,0,.5)`, transformOrigin: '390px 560px' });
  el('div', strip, { left: '36px', top: '30px', fontFamily: 'SpecialElite', fontSize: '42px', color: '#6a5a48', whiteSpace: 'nowrap' }, 'MENSAJE DE GARBO · 9 JUN 1944');
  box(strip, 30, 96, 708, 4, { background: INK, opacity: 0.4 });
  const tx = el('div', strip, { left: '36px', top: '140px', width: '700px', fontFamily: 'SpecialElite', fontSize: '84px', lineHeight: 1.15, color: INK }, '');
  const stD = stamp(c, 210, 800, 'URGENTE', { size: 90, bw: 12, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const mach = box(c, 280, 960, 520, 300, { zIndex: 8 }); mach.innerHTML = telexSvg();
}

/* ======================================================================
   H3 · «LO GORDO, EN CALAIS» — flecha roja gorda a Calais
   ====================================================================== */
headline(S.H3[0], S.H3[1], 'Lo gordo, en *Calais*', { size: 108, hlT: K.calais7 });
{
  const c = scene(S.H3[0], S.H3[1], t => {
    set(mp, { s: 1.04 + 0.05 * p(t, S.H3[0], 1.8, E.linear) });
    arr.style.strokeDashoffset = f1(1000 * (1 - p(t, K.gordo - 0.1, 0.6, E.inOutCubic)));
    arrI.style.strokeDashoffset = arr.style.strokeDashoffset;
    set(head, { s: pop(t, K.gordo + 0.45, 0.3), o: t < K.gordo + 0.45 ? 0 : 1 });
    set(tgt, { s: 1 + 0.12 * Math.sin(t * 10), o: t > K.calais7 - 0.1 ? 1 : 0 });
    stampA(stC, t, K.calais7, -8, 1);
    set(xN, { s: pop(t, S.H3[0] + 0.1, 0.3), o: t < S.H3[0] + 0.1 ? 0 : 1 });
  }, { clip: true });
  const mp = chanBase(c);
  const ar = box(mp, 0, 0, 1080, 1920, { zIndex: 12 });
  const A0 = mpC(0.6, 51.6).map(Number);
  ar.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="a" pathLength="1000" stroke-dasharray="1000" d="M${A0[0] - 160},${A0[1] - 120} Q${A0[0] + 40},${A0[1] - 60} ${P_CAL[0] - 30},${P_CAL[1] - 40}" stroke="${INK}" stroke-width="46" fill="none" stroke-linecap="round"/><path class="ai" pathLength="1000" stroke-dasharray="1000" d="M${A0[0] - 160},${A0[1] - 120} Q${A0[0] + 40},${A0[1] - 60} ${P_CAL[0] - 30},${P_CAL[1] - 40}" stroke="${RED}" stroke-width="30" fill="none" stroke-linecap="round"/></svg>`;
  const arr = ar.querySelector('.a'), arrI = ar.querySelector('.ai');
  const head = box(mp, P_CAL[0] - 70, P_CAL[1] - 90, 120, 120, { zIndex: 13 }); head.innerHTML = `<svg viewBox="0 0 120 120" width="120" height="120" style="overflow:visible"><path d="M10,10 L110,60 L40,110 Z" fill="${RED}" stroke="${INK}" stroke-width="8" stroke-linejoin="round" transform="rotate(30 60 60)"/></svg>`;
  const tgt = box(mp, P_CAL[0] - 80, P_CAL[1] - 80, 160, 160, { borderRadius: '50%', border: `10px solid ${RED}`, zIndex: 11 });
  const stC = stamp(mp, P_CAL[0] - 300, P_CAL[1] + 110, 'CALAIS', { size: 96, bw: 12, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const xN = el('div', mp, { left: px(P_NOR[0] - 170), top: px(P_NOR[1] + 30), fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, background: 'rgba(255,255,255,.9)', border: `4px solid ${INK}`, borderRadius: '14px', padding: '2px 16px 6px', zIndex: 20, textDecoration: 'line-through', textDecorationColor: RED, textDecorationThickness: '6px' }, 'Normandía');
}

/* ======================================================================
   I1 · «HITLER SE LO TRAGA» — se come el télex como un espagueti
   ====================================================================== */
headline(S.I1[0], S.I1[1], 'Hitler *se lo traga*', { size: 108, hlT: K.traga });
{
  const c = scene(S.I1[0], S.I1[1], t => {
    set(ry, { r: t * 10 });
    set(hb.d, { s: pop(t, S.I1[0], 0.3), y: wobble(t, 0.5, 3), o: 1 });
    const kt = p(t, K.traga - 0.05, 0.5, E.inCubic);
    face(hb, t, { look: t > K.traga ? [0, -6] : [0, 6], bL: t > K.traga + 0.5 ? 16 : 6, bR: t > K.traga + 0.5 ? 16 : 6, jaw: t > K.traga - 0.1 && t < K.traga + 0.6 ? 0.6 + 0.3 * Math.sin(t * 30) : 0, closed: t > K.traga + 0.55, seed: 0.9 });
    set(tape, { y: -kt * 520, sy: 1 - kt * 0.85, o: kt < 1 ? 1 : 0 });
    set(bub, { s: pop(t, K.traga + 0.55, 0.3), r: 4, o: t < K.traga + 0.55 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  const ry = rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const hb = mk(c, [270, 440, 540, 690], hitlerInner(), '0 0 360 460', 'bust'); hb.d.style.zIndex = 4;
  const tape = box(c, 480, 860, 120, 560, { zIndex: 6, background: '#FBF3DD', border: `5px solid ${INK}`, transformOrigin: '60px 0px', fontFamily: 'SpecialElite', fontSize: '34px', color: INK, writingMode: 'vertical-rl', textAlign: 'center', lineHeight: '110px' }, 'NORMANDÍA = DISTRACCIÓN');
  const bub = bubble(c, 640, 470, 'ajá', { size: 70, tail: 'bl', z: 30, it: true });
}

/* ======================================================================
   I2 · «DEJA TROPAS EN CALAIS…» — fichas que se quedan quietas y el calendario que pasa
   ====================================================================== */
headline(S.I2[0], S.I2[1], 'deja tropas en *Calais…*', { size: 88, hlT: K.calais8 });
{
  const PW = [];
  const c = scene(S.I2[0], S.I2[1], t => {
    set(mp, { s: 1.15 + 0.05 * p(t, S.I2[0], 2, E.linear) });
    PW.forEach(q => { const k = p(t, q.t, 0.3, E.outBounce); set(q.e, { y: (1 - k) * -200 + Math.sin(t * 2 + q.t * 9) * 2, o: t < q.t ? 0 : 1 }); });
    const ag = t > K.calais8 + 0.2;
    pJul.style.display = ag ? 'none' : ''; pAgo.style.display = ag ? '' : 'none';
    set(cal, { s: pop(t, S.I2[0] + 0.1, 0.35), r: -4 + (ag ? Math.sin((t - K.calais8) * 30) * 6 * (1 - p(t, K.calais8 + 0.2, 0.5)) : 0), o: t < S.I2[0] + 0.1 ? 0 : 1 });
    set(hand, { r: t * 900 });
  }, { clip: true });
  const mp = chanBase(c);
  mp.style.transformOrigin = `${P_CAL[0]}px ${P_CAL[1] + 150}px`;
  const rp = rng(8);
  for (let i = 0; i < 12; i++) { const x = P_CAL[0] - 210 + (i % 4) * 85 + rp() * 20, y = P_CAL[1] + 70 + Math.floor(i / 4) * 80 + rp() * 14; const e = box(mp, x, y, 70, 90, { zIndex: 10 + Math.floor(i / 4) }); e.innerHTML = pawnSvg(); PW.push({ e, t: K.tropas - 0.1 + i * 0.04 }); }
  const cal = box(c, 90, 900, 300, 330, { zIndex: 30, background: '#fff', border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `8px 8px 0 ${SH}` });
  box(cal, 0, 0, 288, 80, { background: RED, borderBottom: `5px solid ${INK}`, borderRadius: '10px 10px 0 0' });
  const pJul = el('div', cal, { left: '0', top: '100px', width: '288px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '68px', color: INK }, 'JULIO');
  const pAgo = el('div', cal, { left: '0', top: '100px', width: '288px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', color: INK }, 'AGOSTO');
  el('div', cal, { left: '0', top: '196px', width: '288px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: '#6a5a48' }, '1944');
  const clk = box(cal, 114, 240, 60, 60, { borderRadius: '50%', border: `4px solid ${INK}`, background: '#fff' });
  const hand = box(clk, 26, 4, 4, 26, { background: INK, transformOrigin: '2px 26px' });
}

/* ======================================================================
   I3 · «…ESPERANDO A NADIE» — playa vacía, gaviota y pelota
   ====================================================================== */
headline(S.I3[0], S.I3[1], '…esperando *a nadie*', { size: 108, hlT: K.nadie });
{
  const c = scene(S.I3[0], S.I3[1], t => {
    const tl = t - S.I3[0];
    set(gull, { x: tl * 260, y: Math.sin(t * 5) * 20, sy: 1 - 0.3 * Math.abs(Math.sin(t * 8)) });
    set(ball, { x: -tl * 240, r: -tl * 400 });
    set(wv, { x: Math.sin(t * 1.5) * 30 });
    set(sg, { r: -3 + wobble(t, 0.4, 1.2) });
    set(pw, { y: wobble(t, 0.5, 2) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #CFD6DA 0%, #E6E0D0 50%)' });
  const sea = box(c, -60, 780, 1200, 260, { background: '#8fa7a2', borderTop: `6px solid ${INK}`, zIndex: 2 });
  const wv = box(c, -60, 1000, 1200, 60, { zIndex: 3 }); wv.innerHTML = `<svg width="1200" height="60" style="overflow:visible"><path d="M0,30 ${Array.from({ length: 20 }, (_, i) => `q30,-26 60,0`).join(' ')} V60 H0 Z" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  box(c, -60, 1040, 1200, 400, { background: '#E8D3A2', zIndex: 2, backgroundImage: 'radial-gradient(rgba(43,33,24,.18) 2px, transparent 2.5px)', backgroundSize: '26px 26px' });
  const sg = box(c, 640, 700, 260, 420, { zIndex: 6, transformOrigin: '130px 420px' });
  sg.innerHTML = `<svg viewBox="0 0 260 420" width="260" height="420" style="overflow:visible"><rect x="118" y="100" width="24" height="320" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="10" y="10" width="240" height="110" rx="10" fill="${FIG}" stroke="${INK}" stroke-width="6"/><text x="130" y="84" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">CALAIS</text></svg>`;
  const gull = box(c, 80, 470, 120, 60, { zIndex: 8 }); gull.innerHTML = gullSvg();
  const ball = box(c, 760, 1150, 110, 110, { zIndex: 9 }); ball.innerHTML = ballSvg();
  const pw = box(c, 150, 1000, 70, 90, { zIndex: 7 }); pw.innerHTML = pawnSvg();
  void sea;
}

/* ======================================================================
   J1 · «¿PREMIO?» — regalo que tiembla
   ====================================================================== */
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(q, { s: pop(t, S.J1[0], 0.3), r: -4 + wobble(t, 0.6, 2) });
    set(gf, { s: pop(t, S.J1[0] + 0.08, 0.35), r: Math.sin(t * 30) * 5, o: t < S.J1[0] + 0.08 ? 0 : 1 });
    set(ry, { r: t * 20 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: YEL });
  halftone(c, 'rgba(0,0,0,.10)', 0);
  const ry = rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const q = BIGT(c, 0, 330, 1080, '¿PREMIO?', { fontSize: '190px', zIndex: 20, textShadow: `8px 8px 0 ${PINK}` });
  const gf = box(c, 340, 640, 400, 400, { zIndex: 10 }); gf.innerHTML = giftSvg();
}

/* ======================================================================
   J · «LA CRUZ DE HIERRO NAZI. Y DEL REY INGLÉS… OTRA MEDALLA» — las dos medallas en la solapa
   ====================================================================== */
headline(S.J2[0], S.J2[1], 'La *Cruz de Hierro* nazi', { size: 86, hlT: K.cruz, color: '#FBF6EA', keyColor: YEL, hlc: 'rgba(0,0,0,0)' });
headline(S.J3[0], K.otra - 0.06, 'Y del *rey inglés…*', { size: 108, hlT: K.rey, color: '#FBF6EA', keyColor: YEL, hlc: 'rgba(0,0,0,0)' });
headline(K.otra - 0.06, S.J3[1], '*…otra medalla*', { size: 116, hlT: K.medalla, color: '#FBF6EA', keyColor: YEL, hlc: 'rgba(0,0,0,0)' });
{
  const c = scene(S.J2[0], S.J3[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.J2[0], 5, E.linear) });
    const ki = p(t, K.cruz - 0.15, 0.3, E.inCubic);
    set(ic, { y: (1 - ki) * -900, r: (1 - ki) * 40 + Math.sin(t * 3) * 2, s: 1 + 0.15 * (1 - p(t, K.cruz + 0.15, 0.3)) * (ki >= 1 ? 1 : 0) });
    popA(c1, t, K.hierro + 0.1, { r: -3 }); popA(c1b, t, K.nazi9 + 0.1, { r: 2 });
    set(cr, { s: pop(t, K.rey - 0.05, 0.4), r: -6 + wobble(t, 0.6, 3), o: t < K.rey - 0.05 ? 0 : 1 });
    const km = p(t, K.medalla - 0.12, 0.3, E.inCubic);
    set(mb, { y: (1 - km) * -1000, r: (1 - km) * -40 + Math.sin(t * 3 + 1) * 2, s: 1 + 0.15 * (1 - p(t, K.medalla + 0.15, 0.3)) * (km >= 1 ? 1 : 0) });
    popA(c2, t, K.medalla + 0.2, { r: 3 });
    SP.forEach((s, i) => set(s, { o: (t > K.cruz + 0.15 && t < K.cruz + 0.8 && i < 3) || (t > K.medalla + 0.15 && i >= 3) ? 1 : 0, s: 0.8 + 0.3 * Math.sin(t * 12 + i), r: t * 120 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#2f2620' });
  const jk = box(cam, 0, 0, 1080, 1920, { zIndex: 1 });
  jk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-40,380 L520,380 L700,1500 L-40,1500 Z" fill="#3d3328" stroke="${INK}" stroke-width="6"/><path d="M-40,380 L520,380 L700,1500 L-40,1500 Z" fill="url(#hW)" opacity=".15"/><path d="M520,380 L1120,380 L1120,1500 L700,1500 Z" fill="#33291f" stroke="${INK}" stroke-width="6"/><path d="M380,380 L560,380 L700,760 L520,900 Z" fill="#4a3d30" stroke="${INK}" stroke-width="6"/><path d="M560,380 L760,380 L690,780 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M640,400 L680,400 L700,700 L660,760 L620,700 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M60,1300 C200,1260 360,1260 520,1300" stroke="${FIG}" stroke-width="3" opacity=".25" fill="none"/></svg>`;
  const ic = box(cam, 110, 620, 340, 340, { zIndex: 10 }); ic.innerHTML = ironCrossSvg();
  const icr = box(cam, 238, 530, 84, 100, { zIndex: 9 }); icr.innerHTML = ribbonBar(['#2a2a2a', '#bdbdbd', '#2a2a2a']);
  const c1 = chip(cam, 90, 990, 'CRUZ DE HIERRO · 29 JUL 1944', { size: 36, bg: '#fff', color: INK, z: 20 });
  const c1b = chip(cam, 150, 1070, 'se la dan por radio', { size: 34, bg: PINK, z: 20 });
  const cr = box(cam, 690, 410, 260, 180, { zIndex: 12 }); cr.innerHTML = crownSvg();
  const mb = box(cam, 560, 740, 320, 320, { zIndex: 10 }); mb.innerHTML = mbeSvg();
  const mbr = box(cam, 678, 650, 84, 100, { zIndex: 9 }); mbr.innerHTML = ribbonBar(['#c9c6c0', '#E88FA8', '#E88FA8', '#c9c6c0']);
  const c2 = chip(cam, 300, 1170, 'MBE · REY JORGE VI · 25 NOV 1944', { size: 34, bg: YEL, color: INK, z: 20 });
  const SP = [[120, 620], [420, 620], [280, 940], [600, 760], [880, 900], [740, 1040]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontSize: '60px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 25 }, '✦'));
  // la cinta del MBE cae junto con la medalla; la de la cruz, con la cruz
  const _f = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _f(t); icr.style.transform = ic.style.transform.replace(/scale\([^)]*\)/, ''); mbr.style.transform = mb.style.transform.replace(/scale\([^)]*\)/, ''); };
}

/* ======================================================================
   K1 · «DOS MEDALLAS, DE LOS DOS BANDOS…» — una a cada lado
   ====================================================================== */
headline(S.K1[0], S.K1[1], 'Dos medallas, *de los dos bandos*', { size: 88, hlT: K.bandos });
{
  const c = scene(S.K1[0], S.K1[1], t => {
    set(m1, { s: pop(t, S.K1[0], 0.35), r: Math.sin(t * 3) * 8, o: 1 });
    set(m2, { s: pop(t, K.medallas, 0.35), r: -Math.sin(t * 3) * 8, o: t < K.medallas ? 0 : 1 });
    popA(b1, t, K.dos2, { r: -4 }); popA(b2, t, K.bandos, { r: 4 });
    set(vs, { s: pop(t, K.bandos + 0.2, 0.3) * (1 + 0.08 * Math.sin(t * 10)), o: t < K.bandos + 0.2 ? 0 : 1 });
    set(pj.d, { s: pop(t, K.bandos + 0.3, 0.35), o: t < K.bandos + 0.3 ? 0 : 1 });
    face(pj.f, t, { look: [0, 0], bL: 10, bR: 18, seed: 6 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(90deg, #D9D2C2 0 50%, #EBCBD4 50% 100%)' });
  box(c, 536, 380, 8, 1000, { background: INK, zIndex: 1 });
  const m1 = box(c, 130, 540, 300, 300, { zIndex: 5 }); m1.innerHTML = ironCrossSvg();
  const m2 = box(c, 650, 540, 300, 300, { zIndex: 5 }); m2.innerHTML = mbeSvg();
  const b1 = chip(c, 140, 900, 'ALEMANIA', { size: 52, bg: INK, color: '#fff', z: 20 });
  const b2 = chip(c, 620, 900, 'REINO UNIDO', { size: 52, bg: INK, color: '#fff', z: 20 });
  const vs = BIGT(c, 0, 1010, 1080, '= MISMO SEÑOR', { fontSize: '74px', color: RED, zIndex: 20, textShadow: `4px 4px 0 #fff` });
  const pj = pujolAv(c, 450, 1110, 180, { z: 22 });
}

/* ======================================================================
   K2 · «…POR EL MISMO TROLEO» — golpe de color
   ====================================================================== */
{
  const c = colorHit(S.K2[0], S.K2[1], PINK, cc => {
    const a = BIGT(cc, 0, 430, 1080, 'por el mismo', { fontSize: '110px', color: INK, zIndex: 20, fontStyle: 'italic' });
    const b = BIGT(cc, 0, 590, 1080, 'TROLEO', { fontSize: '186px', color: '#fff', zIndex: 21, textShadow: OUTL(INK, 12) });
    const st = stamp(cc, 200, 880, 'NIVEL: MÁXIMO', { size: 76, bw: 12, z: 30, col: INK, bg: YEL, blend: 'normal' });
    const s1 = box(cc, 90, 1000, 200, 200, { zIndex: 10, filter: SIL }); s1.innerHTML = ironCrossSvg();
    const s2 = box(cc, 790, 1000, 200, 200, { zIndex: 10, filter: SIL }); s2.innerHTML = mbeSvg();
    return t => {
      set(a, { s: pop(t, S.K2[0], 0.3), r: -2 });
      set(b, { s: pop(t, K.troleo10 - 0.04, 0.35), r: 2 + Math.sin(t * 6) * 1.5, o: t < K.troleo10 - 0.04 ? 0 : 1 });
      b.style.textShadow = t > K.troleo10 && t < K.troleo10 + 0.3 ? glitch(t, K.troleo10, 0.3) + ', ' + OUTL(INK, 12) : OUTL(INK, 12);
      stampA(st, t, K.troleo10 + 0.35, -8, 1);
      set(s1, { r: Math.sin(t * 4) * 12, s: pop(t, S.K2[0] + 0.1, 0.3) }); set(s2, { r: -Math.sin(t * 4) * 12, s: pop(t, S.K2[0] + 0.15, 0.3) });
    };
  });
  void c;
}

/* ======================================================================
   L · «Y LUEGO FINGIÓ SU MUERTE. SU ÚLTIMA CUENTA FALSA… ÉL MISMO.» — vuelve el perfil de la portada
   ====================================================================== */
headline(S.L1[0], S.L1[1], 'Y luego *fingió su muerte*', { size: 92, hlT: K.muerte });
headline(S.L2[0], K.el11 - 0.06, 'Su última *cuenta falsa…*', { size: 96, hlT: K.falsa11 });
headline(K.el11 - 0.06, S.L2[1], '*…él mismo*', { size: 130, hlT: K.el11 });
{
  const c = scene(S.L1[0], S.L2[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, S.L1[0], 4.8, E.linear) });
    set(cd.d, { s: pop(t, S.L1[0], 0.35), r: -2 + wobble(t, 0.4, 0.8), y: wobble(t, 0.55, 4) });
    const dead = t > K.muerte && t < K.el11;
    const kd = p(t, K.muerte, 0.3);
    cd.av.d.style.filter = dead ? `grayscale(1) brightness(${f1(1 - 0.3 * kd)})` : 'none';
    set(rib, { s: dead ? pop(t, K.muerte + 0.05, 0.3) : 0, r: 14, o: dead ? 1 : 0 });
    face(cd.av.f, t, { look: t > K.el11 ? [6, -2] : [0, 0], closed: dead || (t > K.el11 + 0.1 && t < K.el11 + 0.45), bL: t > K.el11 ? 10 : 0, bR: t > K.el11 ? 18 : 0, seed: 1.7 });
    popA(an, t, K.muerte + 0.25, { r: -3 });
    an.style.display = t > K.su11 + 0.3 ? 'none' : '';
    stampA(stF, t, K.falsa11, -9, 1);
    popA(vv, t, K.mismo11, { r: 3 });
    set(wink, { s: pop(t, K.el11 + 0.1, 0.3), o: t > K.el11 + 0.1 && t < K.el11 + 0.7 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 760px' });
  sceneBg(cam, { background: '#EFE1C6' });
  rays(cam, -160, 160, 1400, 26, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const cd = profCard(cam, 330, 470, { w: 600, z: 10 });
  cd.d.style.transformOrigin = '300px 260px';
  const rib = box(cam, 520, 470, 100, 120, { zIndex: 30 }); rib.innerHTML = ribbonSvg();
  const an = chip(cam, 420, 1030, 'ANGOLA, 1949 · «malaria»', { size: 40, bg: INK, color: '#fff', z: 30 });
  const stF = stamp(cam, 330, 800, 'CUENTA FALSA', { size: 66, bw: 12, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const vv = chip(cam, 420, 1100, 'VIVO · VENEZUELA · 1984', { size: 40, bg: YEL, color: INK, z: 30 });
  const wink = el('div', cam, { left: '590px', top: '480px', fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 32 }, '✦');
}

/* ======================================================================
   M · «¿Y TÚ, CUÁNTAS CUENTAS TIENES? OS LEO.» — pantalla de «cambiar de cuenta»
   ====================================================================== */
headline(S.M[0], S.M[1], '¿Y tú, *cuántas* tienes?', { size: 96, hlT: K.cuantas });
{
  const RW = [];
  const c = scene(S.M[0], S.M[1], t => {
    set(cd, { s: pop(t, S.M[0], 0.3), r: 1 + wobble(t, 0.5, 0.5) });
    RW.forEach(r0 => { const k = p(t, r0.t, 0.28, E.outBack); set(r0.e, { x: (1 - k) * 700, o: t < r0.t ? 0 : 1 }); });
    set(qm, { s: pop(t, K.tienes, 0.35), r: Math.sin(t * 5) * 10, o: t < K.tienes ? 0 : 1 });
    popA(ol, t, K.os - 0.05, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const cd = box(c, 330, 400, 600, 800, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '34px', boxShadow: `12px 14px 0 ${SH}`, zIndex: 5 });
  el('div', cd, { left: '34px', top: '26px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '46px', color: INK, whiteSpace: 'nowrap' }, 'Cambiar de cuenta');
  box(cd, 24, 96, 538, 4, { background: INK, opacity: 0.3 });
  const ACC = [['la seria', '#C9B48E', '👔'], ['la de los memes', '#FFE600', '😂'], ['la del gato', '#E88FA8', '🐱'], ['la secreta', '#8fa7a2', '🕵️']];
  const TT = [K.y12, K.tu12, K.cuantas, K.cuentas12];
  ACC.forEach(([nm, col, em], i) => {
    const e = box(cd, 24, 120 + i * 140, 540, 120, { zIndex: 6 });
    el('div', e, { left: '0', top: '6px', width: '100px', height: '100px', borderRadius: '50%', background: col, border: `5px solid ${INK}`, textAlign: 'center', lineHeight: '100px', fontSize: '54px' }, em);
    el('div', e, { left: '122px', top: '26px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '42px', color: INK, whiteSpace: 'nowrap' }, nm);
    RW.push({ e, t: TT[i] - 0.03 });
  });
  const add = el('div', cd, { left: '24px', top: '696px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: '#6a5a48', whiteSpace: 'nowrap', zIndex: 6 }, '+ Añadir otra cuenta');
  const qm = qMark(c, 800, 1010, 190, PINK); qm.style.zIndex = 30;
  const ol = chip(c, 560, 1215, 'Os leo 👇', { size: 54, bg: INK, color: YEL, z: 40 });
  void add;
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN (última frase) — del Ep. 25
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    set(cam, { s: 1.04 + 0.04 * p(t, T0, T1 - T0, E.linear) });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto ? 6 : 0, bR: fanFast ? 8 : t > K.esto ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hW)" opacity=".25"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/>${lace}</svg>`;
  }
  const vec = mkVec(cam, [190, 430, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040], [760, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    [[30, 96], [170, 96], [60, 110], [140, 110]].forEach(l => fl += `<ellipse cx="${l[0]}" cy="${l[1]}" rx="30" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3" transform="rotate(${l[0] < 100 ? -20 : 20} ${l[0]} ${l[1]})"/>`);
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (centrado) y el Vecino dice adiós con el abanico
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // al cerrarse, el libro (que solo ocupa la mitad derecha) se desplaza para quedar centrado
    set(bookW, { x: 210 * 1.25 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.25 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  }, { cut: true });
  sceneBg(c, { background: '#EADFC8' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const vb = mk(bookW, [140, 400, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">ESPÍAS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de mentira</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1292px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 27 · Garbo, el espía de las 27 cuentas</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
