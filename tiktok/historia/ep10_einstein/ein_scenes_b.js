/* Ep. 10 · escenas L6–L11 + tarjeta final */

/* ======================================================================
   G1 · «DOS: UN EXAMEN DE VERDAD» — carta 2 + lupa
   ====================================================================== */
headlineN(S.G1[0], S.G1[1], 'Dos: un *examen* de verdad', { size: 84, hlT: K.examen });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const sx = flipCard(cd, t, K.examen - 0.2, 0.3);
    set(cd.wrap, { sx, s: 1.3 * pop(t, S.G1[0] + 0.02, 0.4), r: 3 + wobble(t, 0.5, 1), o: 1 });
    const kl = pop(t, K.verdad - 0.05, 0.4);
    set(lens, { s: kl, x: (1 - clamp(kl)) * 200 + Math.sin(t * 3) * 14, y: (1 - clamp(kl)) * 200, r: -6, o: t < K.verdad - 0.05 ? 0 : 1 });
    popA(vd, t, K.verdad + 0.1, { r: -5 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const cd = numCard(c, 380, 500, 2, { w: 320, h: 430 }); cd.wrap.style.zIndex = 8;
  const ex = examPaper(cd.front, 22, 126, 264, 280, { title: 'EXAMEN', tsz: 34, seed: 3 }); void ex;
  const lens = box(c, 560, 640, 300, 300, { zIndex: 20 });
  lens.innerHTML = `<svg width="300" height="380" style="overflow:visible"><path d="M240,240 L330,350" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M240,240 L330,350" stroke="${WOOD}" stroke-width="26" stroke-linecap="round"/><circle cx="150" cy="150" r="146" fill="${INK}"/><circle cx="150" cy="150" r="136" fill="${BRASS}"/><circle cx="150" cy="150" r="120" fill="rgba(255,255,255,.4)" stroke="${INK}" stroke-width="5"/><path d="M80,100 q30,-40 80,-44" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/></svg>`;
  const vd = chip(c, 300, 1110, 'de verdad ✔', { size: 50, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   G2 · CON DIECISÉIS AÑOS — DOS MENOS DE LO NORMAL
   ====================================================================== */
headlineN(S.G2[0], S.G2[1], 'Con *dieciséis* años', { size: 96, hlT: K.dieci });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    { const k = p(t, K.dieci, 0.18, E.outCubic); set(n16, { s: t < K.dieci ? 0 : lerp(1.9, 1, k), r: -4, o: t < K.dieci ? 0 : 1 }); }
    popA(an, t, K.anos16, { r: 3 });
    set(yng.d, { y: wobble(t, 0.6, 4), s: pop(t, S.G2[0] + 0.05, 0.45), o: 1 });
    einFace(yng, t, { look: t > K.dosm ? [8, -4] : [4, 0], bL: t > K.dosm ? 12 : 4, bR: t > K.dosm ? 12 : 4, seed: 0.5 });
    const km = pop(t, K.dosm, 0.4); set(m2, { s: km, r: -8, o: t < K.dosm ? 0 : 1 });
    popA(nm, t, K.menos + 0.1, { r: 3 });
    // barra comparativa: 16 frente a «lo normal» (más alta, sin cifra)
    set(barA, { sy: p(t, K.dieci, 0.5, E.outBack), o: 1 });
    set(barB, { sy: p(t, K.normal - 0.15, 0.5, E.outBack), o: t < K.normal - 0.15 ? 0 : 1 });
    set(lbB, { o: t > K.normal ? 1 : 0 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const yng = mkEin(c, [90, 470, 470, 600], { young: true, seed: 77 }); yng.d.style.zIndex = 4;
  const n16 = el('div', c, { left: '540px', top: '400px', width: '420px', textAlign: 'center', fontFamily: 'Rye', fontSize: '260px', lineHeight: '280px', color: YEL, textShadow: `10px 10px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 10 }, '16');
  const an = chip(c, 660, 670, 'años', { size: 52, bg: INK, color: '#fff', z: 12 });
  const m2 = el('div', c, { left: '560px', top: '770px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', background: PINK, padding: '0 30px 10px', border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `8px 8px 0 ${INK}`, zIndex: 14 }, '−2');
  const nm = chip(c, 470, 960, '2 menos de lo normal', { size: 46, bg: '#fff', color: INK, z: 15 });
  // barras
  const barA = box(c, 600, 1090, 110, 180, { background: YEL, border: `5px solid ${INK}`, zIndex: 6, transformOrigin: '50% 100%' }, '');
  const barB = box(c, 760, 1050, 110, 220, { background: '#fff', border: `5px dashed ${INK}`, zIndex: 6, transformOrigin: '50% 100%' }, '');
  el('div', barA, { left: '0', top: '50px', width: '100px', textAlign: 'center', fontFamily: 'Rye', fontSize: '54px', color: INK }, '16');
  const lbB = el('div', barB, { left: '0', top: '60px', width: '100px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', lineHeight: 1.05, color: INK }, 'lo<br>normal');
}

/* ======================================================================
   G3 · POLITÉCNICO DE ZÚRICH … Y SUSPENDIÓ
   ====================================================================== */
headlineN(S.G3[0], K.ysusp - 0.05, 'Acceso al *Politécnico*', { size: 92, hlT: K.poli });
headlineN(K.ysusp - 0.05, S.G3[1], '…y *suspendió*', { size: 120, hlT: K.susp2, hlc: '#ff9aa8' });
{
  const c = scene(S.G3[0], S.G3[1], t => {
    set(cam, { s: 1.0 + 0.05 * p(t, S.G3[0], 3.8, E.linear) });
    set(bld, { y: (1 - p(t, S.G3[0] + 0.02, 0.5, E.outBack)) * 900 });
    const ks = p(t, K.poli - 0.05, 0.55, E.outElastic); set(plate, { y: (1 - clamp(ks)) * -300, r: (1 - ks) * 8 + Math.sin(t * 2) * 1, o: t < K.poli - 0.07 ? 0 : 1 });
    popA(acc, t, K.acceso, { r: -4 });
    const walk = clamp((t - S.G3[0] - 0.2) / 1.4);
    const sad = t > K.susp2;
    set(yng.d, { x: lerp(-380, 0, E.outCubic(walk)), y: (walk < 1 ? -Math.abs(Math.sin(t * 12)) * 14 : 0) + (sad ? 14 * p(t, K.susp2, 0.3) : 0) + wobble(t, 0.6, 2), r: sad ? -5 : 0 });
    einFace(yng, t, { look: sad ? [0, 6] : [6, -6], sweat: sad, bL: sad ? -6 : 8, bR: sad ? -6 : 8, ang: sad ? -14 : 0, seed: 1.2, jaw: sad ? 0.25 : 0 });
    const k0 = p(t, K.susp2, 0.17, E.outCubic); set(st, { s: t < K.susp2 ? 0 : lerp(2.3, 1, k0), r: -9, o: t < K.susp2 ? 0 : 1 }); st.style.textShadow = glitch(t, K.susp2, 0.25);
  }, { clip: true });
  sceneBg(c, { background: '#d9c7a6' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9E0CC', backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,.6), rgba(255,255,255,0) 60%)' });
  const bld = box(cam, 40, 400, 1000, 622, { zIndex: 2 }); bld.innerHTML = `<svg viewBox="-20 -60 940 620" width="1000" height="660" style="overflow:visible">${poliSvg()}</svg>`;
  const plate = el('div', cam, { left: '210px', top: '640px', width: '660px', textAlign: 'center', background: INK, color: YEL, fontFamily: 'Rye', fontSize: '46px', padding: '10px 0 14px', border: `5px solid ${BRASS}`, borderRadius: '10px', boxShadow: `7px 8px 0 ${SH}`, zIndex: 6, whiteSpace: 'nowrap' }, 'POLITÉCNICO · ZÚRICH');
  const acc = chip(cam, 560, 1090, 'examen de acceso', { size: 38, bg: PINK, z: 8 });
  const yng = mkEin(cam, [330, 900, 300, 383], { young: true, seed: 77 }); yng.d.style.zIndex = 5;
  const st = stamp(cam, 120, 820, 'SUSPENDIDO', { size: 112, bw: 15, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   H · BOLETÍN: MATEMÁTICAS Y FÍSICA ✔✔ — LO DEMÁS ✘ — POR EJEMPLO…
   ====================================================================== */
headlineN(S.H1[0], S.H1[1], 'Matemáticas y física: *notazas*', { size: 76, hlT: K.notazas });
headlineN(S.H2[0], K.por - 0.04, 'Lo que falló: *lo demás*', { size: 84, hlT: K.demas });
headlineN(K.por - 0.04, S.H2[1], 'Por *ejemplo*…', { size: 110, hlT: K.ejemplo + 0.3 });
{
  const c = scene(S.H1[0], S.H2[1], t => {
    const zin = p(t, K.ejemplo, 0.6, E.inOutCubic);
    spot.style.opacity = zin; set(flap, { s: 1 + 0.08 * zin });
    set(bol.wrap, { y: (1 - p(t, S.H1[0], 0.4, E.outBack)) * 900, r: -1.5 + wobble(t, 0.4, 0.4) });
    ROWS.forEach(q => { q.e.style.opacity = t >= q.t - 0.05 ? 1 : 0.15; set(q.e, { x: (1 - p(t, q.t - 0.05, 0.25, E.outBack)) * 30 }); q.marks.forEach((m, j) => popA(m, t, q.t + 0.15 + j * 0.15, { r: -6 })); });
    SP.forEach((s, i) => { const t0 = K.notazas + i * 0.1; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 }); });
    set(nz, { s: pop(t, K.notazas + 0.05, 0.4), r: -7, o: t < K.notazas ? 0 : 1 - p(t, K.loque, 0.2) });
    const drum = t > K.ejemplo;
    set(flap, { r: drum ? Math.sin(t * 40) * 2 : 0 });
    set(yng.d, { y: wobble(t, 0.7, 3) - (t > K.notazas && t < K.loque ? Math.abs(Math.sin(t * 10)) * 14 : 0), x: drum ? Math.sin(t * 30) * 3 : 0 });
    einFace(yng, t, { closed: t > K.notazas && t < K.loque, look: t > K.demas ? [-6, 4] : [-4, -2], sweat: drum, bL: t > K.loque ? -4 : 8, bR: t > K.loque ? -4 : 8, ang: t > K.loque ? -10 : 0, seed: 2.2 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
  const bol = paperPiece(cam, 110, 430, 860, 640, { seed: 23, bg: '#FBF6EA' });
  el('div', bol.inner, { left: '0', top: '18px', width: '842px', textAlign: 'center', fontFamily: 'Rye', fontSize: '54px', color: INK, whiteSpace: 'nowrap' }, 'BOLETÍN DE NOTAS');
  box(bol.inner, 30, 90, 782, 5, { background: INK });
  const ROWS = [];
  [['Matemáticas', K.mat3, 2, true], ['Física', K.fisica, 2, true], ['Lo demás', K.demas, 1, false]].forEach((q, i) => {
    const y = 120 + i * 120;
    const e = el('div', bol.inner, { left: '40px', top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontStyle: i === 2 ? 'italic' : 'normal', fontSize: '74px', lineHeight: 1.2, color: i === 2 ? RED : INK, whiteSpace: 'nowrap' }, q[0]);
    box(bol.inner, 40, y + 104, 762, 3, { background: 'rgba(43,33,24,.3)' });
    const marks = []; for (let k = 0; k < q[2]; k++) { const m = box(bol.inner, 560 + k * 120, y + 4, 96, 96, { zIndex: 3 }); m.innerHTML = q[3] ? CHECK : XSVG; marks.push(m); }
    ROWS.push({ e, t: q[1], marks });
  });
  // fila tapada (el francés)
  const flap = box(bol.inner, 30, 486, 782, 110, { background: '#E9DCC0', border: `4px dashed ${INK}`, borderRadius: '10px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: '100px', textAlign: 'center', color: INK, zIndex: 4 }, '? ? ?');
  const SP = [[200, 470], [620, 520], [880, 420], [470, 400]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
  const nz = stamp(cam, 400, 850, '¡NOTAZAS!', { size: 76, bw: 10, z: 30, col: INK, bg: YEL, blend: 'normal' });
  const yng = mkEin(cam, [640, 1000, 290, 371], { young: true, seed: 77 }); yng.d.style.zIndex = 6;
  const spot = box(cam, 0, 0, 1080, 1920, { zIndex: 5, background: 'radial-gradient(ellipse 470px 130px at 540px 985px, rgba(20,14,10,0) 70%, rgba(20,14,10,.62) 100%)' }); spot.style.opacity = 0;
  flap.style.zIndex = 4;
}

/* ======================================================================
   HIT 1 · GOLPE AMARILLO: ¡FRANCÉS! ✘
   ====================================================================== */
colorHit(S.HIT1[0], S.HIT1[1], YEL, c => {
  const top = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: INK, zIndex: 8 }, '…el');
  const big = el('div', c, { left: 0, top: '380px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '186px', lineHeight: '250px', color: '#fff', textShadow: `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 9 }, 'FRANCÉS');
  const x = box(c, 700, 670, 220, 220, { zIndex: 10 }); x.innerHTML = XSVG;
  const sil = mkEin(c, [300, 860, 480, 613]); sil.d.style.filter = SIL; sil.d.style.zIndex = 4;
  const DR = [[300, 930, -20], [740, 910, 20], [270, 1060, -30]].map(([x, y, r]) => { const d = box(c, x, y, 60, 84, { zIndex: 7 }); d.innerHTML = `<svg viewBox="0 0 40 56" width="60" height="84"><path d="M20,2 Q2,30 8,44 Q20,58 32,44 Q38,30 20,2 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`; return [d, r]; });
  const ber = box(c, 420, 830, 240, 144, { zIndex: 5 }); ber.innerHTML = beretSvg();
  const bag = box(c, 120, 1210, 400, 100, { zIndex: 6 }); bag.innerHTML = bagSvg();
  return t => {
    set(top, { s: pop(t, S.HIT1[0], 0.25), o: 1 });
    const kb = p(t, K.frances1 - 0.02, 0.2, E.outBack); set(big, { s: t < K.frances1 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < K.frances1 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.frances1, 0.3) ? glitch(t, K.frances1, 0.3) + ', ' : '') + `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    const kx = p(t, K.frances1 + 0.25, 0.14); set(x, { s: t < K.frances1 + 0.25 ? 0 : lerp(1.7, 1, kx), o: t < K.frances1 + 0.25 ? 0 : 1 });
    set(sil.d, { x: Math.sin(t * 30) * 5, y: Math.abs(Math.sin(t * 9)) * -10 });
    DR.forEach(([d, r], i) => set(d, { r, y: ((t * 160 + i * 40) % 70), o: t > S.HIT1[0] + 0.15 ? 1 : 0 }));
    face(sil, t, {});
    set(ber, { r: -12 + Math.sin(t * 9) * 4, y: (1 - p(t, S.HIT1[0] + 0.1, 0.3, E.outBounce)) * -500 });
    set(bag, { r: -8 + Math.sin(t * 6) * 4, x: (1 - p(t, S.HIT1[0] + 0.2, 0.3, E.outBack)) * -500 });
  };
});

/* ======================================================================
   I · ¡OJO! — HAY QUIEN DICE… EL SEIS / SUSPENSO / NO DEMOSTRADO
   ====================================================================== */
headline(K.dice - 0.25, S.I1[1], 'Hay quien *dice*…', { size: 104, hlT: K.dice });
{
  const c = scene(S.I1[0], S.I1[1], t => {
    const kt = p(t, K.ojo + 0.55, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.42, kt), x: kt * 360, y: kt * 360, r: -10, o: t < K.ojo ? 0 : 1 });
    G.forEach((f, i) => { const t0 = K.hay + i * 0.14; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.8, 3, i), r: [8, 0, -8][i] + Math.sin(t * 3 + i) * 2, o: t < t0 ? 0 : 1 }); face(f, t, { look: [[8, 0], [0, 4], [-8, 0]][i], jaw: t > K.dice && t < K.colegio + 0.6 ? Math.abs(Math.sin(t * 13 + i)) * 0.35 : 0, seed: i }); });
    PS.forEach((s, i) => { const t0 = K.dice + i * 0.2; set(s, { s: pop(t, t0, 0.3), y: -p(t, t0, 1) * 30, r: [-8, 6, -4][i], o: t < t0 ? 0 : 1 }); });
    popA(col, t, K.colegio, { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const G = [mk(c, [90, 640, 300, 383], fanInner(71, 'slouch', '#5a4632'), '0 0 360 460', 'bust'), mk(c, [390, 610, 310, 396], journalistInner(72, 1), '0 0 360 460', 'bust'), mk(c, [690, 640, 300, 383], fanInner(74, 'cap', '#3a2f26'), '0 0 360 460', 'bust')];
  const PS = [[110, 540, 'psst…'], [380, 480, '¿sabes qué?'], [760, 560, 'psst…']].map(([x, y, s]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '50px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '0 20px 6px', boxShadow: `4px 5px 0 ${SH}`, zIndex: 30, whiteSpace: 'nowrap' }, s));
  const col = chip(c, 330, 1030, 'en su colegio', { size: 52, bg: INK, color: YEL, z: 30 });
  const ojo = stamp(c, 170, 640, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}
headline(S.I2[0], S.I2[1], 'El *seis* era la nota más alta', { size: 78, hlT: K.seis });
headline(S.I3[0], S.I3[1], 'Alguien lo confundió con un *suspenso*', { size: 74, hlT: K.suspenso, hlc: '#ff9aa8' });
headline(S.I4[0], S.I4[1], 'Pero eso…', { size: 110 });
{
  const NUMS = [];
  const ROWY = n => 440 + (6 - n) * 98; // 6 arriba, 1 abajo
  const c = scene(S.I2[0], S.I4[1], t => {
    const kf = p(t, K.confundio - 0.05, 0.6, E.inOutCubic);
    NUMS.forEach(q => { const y = lerp(ROWY(q.n), ROWY(7 - q.n), kf); set(q.e, { y: y - ROWY(q.n), x: Math.sin(kf * Math.PI) * (q.n % 2 ? 60 : -60), s: q.n === 6 ? 1 + 0.25 * pop(t, K.seis, 0.35) - 0.25 * (t > K.seis ? 0 : 0) : 1, o: 1 }); });
    set(hl6, { o: t > K.seis ? 1 : 0, y: lerp(0, ROWY(1) - ROWY(6), kf), sx: p(t, K.seis, 0.3, E.outBack) });
    set(crown, { s: pop(t, K.masalta, 0.35), y: lerp(0, ROWY(1) - ROWY(6), kf), r: -10, o: t < K.masalta || t > K.confundio ? 0 : 1 });
    popA(mx, t, K.masalta + 0.1, { r: 4 }); mx.style.opacity = t < K.masalta + 0.1 ? 0 : 1 - p(t, K.yque, 0.2);
    set(redZ, { o: t > K.yque ? 1 : 0, sx: p(t, K.yque, 0.3, E.outBack) });
    popA(qs, t, K.suspenso, { r: -6 });
    set(conf.d, { s: pop(t, K.alguien, 0.4), y: wobble(t, 0.8, 3), r: t > K.confundio ? Math.sin(t * 8) * 5 : 0, o: t < K.alguien ? 0 : 1 });
    face(conf, t, { look: [8, Math.sin(t * 5) * 4], half: true, blink: false, brow: -6, seed: 3 });
    QQ.forEach((q, i) => { const t0 = K.confundio + i * 0.18; set(q, { s: pop(t, t0, 0.3), y: Math.sin(t * 4 + i) * 10, r: [-12, 10][i], o: t < t0 ? 0 : 1 }); });
    const ks = p(t, K.noesta, 0.17, E.outCubic); set(nd, { s: t < K.noesta ? 0 : lerp(2.2, 1, ks), r: -10, o: t < K.noesta ? 0 : 1 });
    lad.style.opacity = t > K.noesta ? 0.55 : 1;
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const lad = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  box(lad, 470, 420, 300, 610, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 12px 0 ${SH}` });
  const redZ = box(lad, 482, ROWY(1) - 6, 276, 96, { background: 'rgba(200,16,46,.22)', borderRadius: '12px', zIndex: 1, transformOrigin: '0 50%' });
  const hl6 = box(lad, 482, ROWY(6) - 6, 276, 96, { background: YEL, border: `4px solid ${INK}`, borderRadius: '12px', zIndex: 2, transformOrigin: '50% 50%' });
  for (let n = 6; n >= 1; n--) { const e = el('div', lad, { left: '470px', top: px(ROWY(n) - 8), width: '300px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: n === 6 ? '96px' : '80px', lineHeight: '100px', color: n === 6 ? INK : 'rgba(43,33,24,.75)', zIndex: 5 }, String(n)); NUMS.push({ e, n }); }
  const crown = el('div', lad, { left: '700px', top: px(ROWY(6) - 40), fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 6 }, '★');
  const mx = chip(c, 640, 380, 'la nota más alta', { size: 42, bg: PINK, z: 20 });
  const qs = el('div', c, { left: '560px', top: px(ROWY(1) + 104), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '76px', color: RED, textShadow: `3px 3px 0 #fff`, zIndex: 20, whiteSpace: 'nowrap' }, '¿suspenso?');
  const conf = mk(c, [110, 560, 300, 383], journalistInner(73, 2), '0 0 360 460', 'bust'); conf.d.style.zIndex = 6;
  const QQ = [qMark(c, 110, 470, 110), qMark(c, 330, 440, 130)];
  const nd = stamp(c, 80, 700, 'NO DEMOSTRADO', { size: 90, bw: 14, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   J1 · O SEA: EL GENIO NO SUSPENDÍA MATEMÁTICAS — dos retratos
   ====================================================================== */
headline(S.J1[0], K.elgenio - 0.05, 'O sea:', { size: 140, hlT: K.osea });
headline(K.elgenio - 0.05, S.J1[1], 'El genio *no* suspendía matemáticas', { size: 78, hlT: K.no9, hlc: '#ff9aa8' });
{
  const c = scene(S.J1[0], S.J1[1], t => {
    [fL, fR].forEach((f, i) => set(f, { s: pop(t, S.J1[0] + 0.05 + i * 0.15, 0.45), r: [-4, 4][i] + wobble(t, 0.5, 1, i), o: 1 }));
    const kx = p(t, K.no9, 0.14); set(xL, { s: t < K.no9 ? 0 : lerp(1.7, 1, kx), o: t < K.no9 ? 0 : 1 });
    fL.style.filter = t > K.no9 ? 'grayscale(1) brightness(.85)' : 'none';
    popA(ckR, t, K.mat4 + 0.05, { r: -8 });
    set(glow, { r: t * 12, o: t > K.mat4 ? 1 : 0, s: pop(t, K.mat4, 0.4) });
    einFace(eL, t, { look: [4, 4], sweat: true, ang: -12, bL: -4, bR: -4, seed: 1 });
    einFace(eR, t, { look: [-4, -2], finger: t > K.mat4, ang: 6, bL: 8, bR: 8, seed: 2 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const glow = rays(c, 380, 350, 760, 20, 'rgba(255,230,0,.5)', 'rgba(0,0,0,0)', 1);
  const mkF = (x, lbl, col) => { const f = box(c, x, 520, 420, 540, { zIndex: 4 }); box(f, 0, 0, 420, 540, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '210px 210px 24px 24px', boxShadow: `10px 12px 0 ${SH}` }); box(f, 22, 22, 376, 420, { background: '#F4ECDB', borderRadius: '190px 190px 10px 10px', overflow: 'hidden', border: `4px solid ${BRASS}` }); el('div', f, { left: '20px', top: '452px', width: '380px', textAlign: 'center', background: col, color: INK, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '36px', lineHeight: 1.05, padding: '8px 0 10px', border: `4px solid ${INK}`, borderRadius: '10px' }, lbl); return f; };
  const fL = mkF(90, '¿el que suspendía?', '#fff'), fR = mkF(570, 'el genio', YEL);
  const eL = mkEin(fL.children[1], [-10, 30, 400, 511]);
  const zL = box(fL, 250, 250, 120, 144, { zIndex: 5 }); zL.innerHTML = ZERO(26); void zL;
  const eR = mkEin(fR.children[1], [-10, 30, 400, 511]);
  chalk(fR.children[1], 24, 40, '∫', 110, { color: '#2B2118', textShadow: 'none' });
  const xL = box(c, 100, 560, 400, 420, { zIndex: 20 }); xL.innerHTML = XSVG;
  const ckR = box(c, 820, 900, 170, 170, { zIndex: 20 }); ckR.innerHTML = CHECK;
}

/* ======================================================================
   HIT 2 · GOLPE ROSA (citable): SUSPENDÍA… FRANCÉS
   ====================================================================== */
colorHit(S.HIT2[0], S.HIT2[1], PINK, c => {
  const mt = el('div', c, { left: 0, top: '240px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: INK, zIndex: 6 }, 'Matemáticas ✔');
  const l1 = el('div', c, { left: 0, top: '380px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '130px', color: INK, zIndex: 6 }, 'Suspendía…');
  const big = el('div', c, { left: 0, top: '560px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '186px', lineHeight: '250px', color: '#fff', textShadow: `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 8 }, 'FRANCÉS');
  const sil = mkEin(c, [330, 860, 400, 511]); sil.d.style.filter = SIL; sil.d.style.zIndex = 4;
  const ber = box(c, 430, 840, 200, 120, { zIndex: 5 }); ber.innerHTML = beretSvg();
  const bag = box(c, 640, 1150, 360, 90, { zIndex: 6 }); bag.innerHTML = bagSvg();
  return t => {
    popA(mt, t, S.HIT2[0] + 0.02, { rise: 30 });
    popA(l1, t, K.suspendia2, { rise: 40 });
    const kb = p(t, K.frances2 - 0.02, 0.2, E.outBack); set(big, { s: t < K.frances2 - 0.02 ? 0 : lerp(1.7, 1, kb), r: -4, o: t < K.frances2 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.frances2, 0.3) ? glitch(t, K.frances2, 0.3) + ', ' : '') + `12px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    set(sil.d, { y: Math.abs(Math.sin(t * 6)) * -14, r: Math.sin(t * 5) * 3 }); face(sil, t, {});
    set(ber, { r: -14 + Math.sin(t * 6) * 4, y: Math.abs(Math.sin(t * 6)) * -14 });
    set(bag, { r: 12 + Math.sin(t * 5) * 5 });
  };
});

/* ======================================================================
   CTA · ¿TÚ TAMBIÉN TE LO HABÍAS CREÍDO? DIME SÍ O NO — botones gigantes
   ====================================================================== */
headline(S.CTA[0], K.dime - 0.06, '¿Tú también te lo habías *creído*?', { size: 80, hlT: K.creido });
headline(K.dime - 0.06, S.CTA[1], '*¿Sí o no?*', { size: 120, hlT: K.si });
{
  const CM = [];
  const c = scene(S.CTA[0], S.CTA[1], t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, S.CTA[0], 2.8, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < K.dime ? [0, 0] : [-4, 6], bL: t > K.creido - 0.2 && t < K.dime ? 12 : 2, bR: t > K.creido - 0.2 && t < K.dime ? 16 : 6, noCup: true, fan: wobble(t, 0.8, 5), seed: 2 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const press = t > t0 + 0.35 && t < t0 + 0.5; set(b, { s: pop(t, S.CTA[0] + 0.25 + i * 0.12, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < S.CTA[0] + 0.25 + i * 0.12 ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, x: lerp(0, 0, 0), y: (t > K.si + 0.3 && t < K.si + 0.5 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [440, 420, 440, 545]);
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1020px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(120, 'SÍ', YEL, INK), bN = btn(560, 'NO', '#fff', RED);
  const hand = box(c, 320, 1150, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const cms = [['FAR', '@lucia_mates', 'SÍ 😳', K.L10 + 0.45], ['SOL', '@pablo.fis', 'No, ya lo sabía', K.L10 + 0.75], ['MEREDITH', '@ana_bcn', 'Sí, toda la vida…', K.creido]];
  cms.forEach((m, i) => {
    const e = box(c, 40, [500, 650, 800][i], 400, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   L · Y ESTO… NO VENÍA EN EL LIBRO
   ====================================================================== */
headline(S.L2[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    einFace(stand, t, { look: t > TC - 0.2 ? [6, -6] : [-3, 2], bL: 12, bR: 12, sweat: t > TC - 0.2, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">GENIOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de siempre</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkEin(bookW, [610, 420, 260, 332]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 10 · Einstein no suspendía matemáticas</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}

