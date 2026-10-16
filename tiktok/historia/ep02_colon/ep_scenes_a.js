/* ======================================================================
   S0 · GANCHO (0 – 6.0)  L0 — Colón en la proa señalando un globo enorme
   ====================================================================== */
headline(-1, 2.72, '¡Colón *NO* demostró que la Tierra era redonda!', { size: 76, hlT: 0.6, y: 200 });
HLS[HLS.length - 1].spans.forEach(s => s.t = -1);
headline(2.72, 6.0, 'Eso ya se *sabía*', { size: 100, hlT: 3.43, y: 210 });
{
  const c = scene(-1, 6.0, t => {
    set(cam, { s: 1.0 + 0.06 * p(t, 0, 6, E.linear) });
    set(sunR, { r: t * 8 });
    set(seaB, { x: Math.sin(t * 1.6) * 14 }); set(seaF, { x: -Math.sin(t * 1.9) * 20, y: Math.sin(t * 2.3) * 5 });
    const bob = Math.sin(t * 2.1) * 8, roll = Math.sin(t * 1.7) * 1.4;
    set(shipG, { y: bob, r: roll });
    if (ship.sails) ship.sails.setAttribute('transform', `translate(270,0) scale(${f1(1 + Math.sin(t * 3) * 0.025 * 100) / 100},1) translate(-270,0)`);
    face(col, t, { look: t < 2.72 ? [5, -5] : [0, 1], brow: t < 2.72 ? -6 : 2, seed: 0.7 });
    const pk = t > 0.55 && t < 0.9 ? Math.sin((t - 0.55) * 30) * 4 : 0;
    set(arm.d, { r: -38 + wobble(t, 0.7, 1.5) + pk });
    spinGlobe(globe, t, 30);
    set(globe.d, { y: wobble(t, 0.5, 6), r: wobble(t, 0.35, 2) });
    const ks = pop(t, 3.43, 0.4); set(chk.d || chk, { s: ks, o: t < 3.43 ? 0 : 1, r: -8 });
    set(drop, { y: p(t, 3.6, 1.2, E.inCubic) * 60, o: t > 3.6 && t < 5.2 ? 1 : 0 });
    // contador hacia atrás
    const kc = p(t, 4.2, 0.35, E.outBack); set(cnt, { y: (1 - kc) * 260, o: t < 4.2 ? 0 : 1 });
    cntN.textContent = fmt(Math.round(counter(t, 4.47, 0.5, 0, 2000)));
    set(rew, { r: -t * 360 * (t > 4.2 ? 1.5 : 0) });
    set(tagC, { s: pop(t, 0.2, 0.4), r: -4, o: 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 900px' });
  const sunR = rays(cam, 300, 300, 900, 22, 'rgba(255,230,0,.30)', 'transparent', 0);
  const seaB = svgBox(cam, -100, 0, 1300, 1920, wavesSvg(1300, 1010, 3, '#D8CBAA', true, 3), '0 0 1300 1920');
  const shipG = box(cam, 0, 0, 1080, 1920, { transformOrigin: '330px 1000px' });
  const ship = mkShip(shipG, [-10, 470, 640, 664]);
  const col = mkCol(shipG, [320, 540, 380, 486]);
  const rail = svgBox(shipG, 0, 0, 1080, 1920, cut('<path d="M330,955 L705,938 L700,1010 L326,1020 Z"/>') + D('M330,955 L705,938 L700,1010 L326,1020 Z', '#9a6a3c', 4) + HF('M330,955 L705,938 L700,1010 L326,1020 Z', 'hD') + `<path d="M336,970 L700,954" stroke="${INK}" stroke-width="3"/>` + [380, 450, 520, 590, 660].map(x => `<path d="M${x},962 v44" stroke="${INK}" stroke-width="3"/>`).join(''), '0 0 1080 1920');
  const arm = mk(shipG, [585, 800, 330, 130], pointArmInner(), '0 0 330 130', 'arm'); arm.d.style.transformOrigin = '3% 54%';
  const globe = mkGlobe(cam, [600, 400, 360, 450]);
  const chk = badge(cam, 830, 430, 120, GCHECK);
  const drop = sweatDrop(cam, 640, 640, 36);
  const seaF = svgBox(cam, -100, 0, 1300, 1920, wavesSvg(1300, 1075, 5, '#CDBF9C', true, 5), '0 0 1300 1920');
  const tagC = chip(c, 70, 470, 'Cristóbal Colón', { size: 36, bg: INK, color: YEL });
  const cnt = box(c, 120, 1120, 840, 210, { background: INK, border: `6px solid ${YEL}`, borderRadius: '28px', boxShadow: `10px 10px 0 ${SH}`, zIndex: 40 });
  const rew = el('div', cnt, { left: '26px', top: '40px', width: '120px', height: '120px', fontSize: '110px', lineHeight: '120px', textAlign: 'center', color: YEL, fontFamily: 'InterV', fontWeight: 900 }, '⟲');
  el('div', cnt, { left: '160px', top: '18px', fontFamily: 'SpecialElite', fontSize: '40px', color: PAPER, whiteSpace: 'nowrap' }, 'hace casi');
  const cntN = el('div', cnt, { left: '160px', top: '58px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap' }, '0');
  el('div', cnt, { left: '560px', top: '96px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '80px', lineHeight: 1, color: '#fff', whiteSpace: 'nowrap' }, 'años');
}

/* ======================================================================
   S1 · LA JUNTA DIJO QUE NO (6.0 – 10.6)  L1  + sello MITO
   ====================================================================== */
headline(6.0, 6.95, 'Y lo *mejor:*', { size: 100, hlT: 6.3 });
headline(6.95, 9.5, 'los que le dijeron *que no*…', { size: 82, hlT: 8.44 });
headline(9.5, 10.6, '…tenían *razón*', { size: 100, hlT: 9.93 });
function tribunal(c) {
  sceneBg(c, { background: '#D9C49C', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 3px, transparent 3px 92px)' });
  let ar = ''; [200, 510, 820].forEach(x => { const a = `M${x - 145},930 L${x - 145},600 Q${x - 145},440 ${x},436 Q${x + 145},440 ${x + 145},600 L${x + 145},930 Z`; ar += `<path d="${a}" fill="#B99A6A" stroke="${INK}" stroke-width="5"/><path d="${a}" fill="url(#hP)"/><path d="${a}" fill="url(#hW)" opacity=".18"/>`; });
  svgBox(c, 0, 0, 1080, 1920, ar, '0 0 1080 1920');
  const clipS = box(c, 0, 0, 1080, 900, { overflow: 'hidden' });
  const S = SAB.map((o, i) => mkSab(clipS, [[40, 480, 320, 409], [350, 450, 330, 422], [660, 480, 320, 409]][i], i));
  return S;
}
function tableFront(c) {
  let fr = ''; for (let x = 40; x < 1050; x += 26) fr += `<path d="M${x},1118 v26" stroke="${BRASS}" stroke-width="7" stroke-linecap="round"/>`;
  const cl = 'M24,906 L1056,906 L1056,1122 L24,1122 Z';
  return svgBox(c, 0, 0, 1080, 1920, cut(cl + '<rect x="10" y="872" width="1060" height="40" rx="8"/>') + `<rect x="10" y="872" width="1060" height="40" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>` + D(cl, '#9E1B2E', 5) + HF(cl, 'hA') + `<path d="M24,940 H1056" stroke="${BRASS}" stroke-width="6"/>` + fr + `<g transform="translate(540,1030)"><circle r="54" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M-26,-26 L26,26 M26,-26 L-26,26" stroke="${INK}" stroke-width="8"/><circle r="40" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 5"/></g>`, '0 0 1080 1920');
}
{
  const c = scene(6.0, 10.6, t => {
    S.forEach((m, i) => {
      const t0 = 6.25 + i * 0.18, k = p(t, t0, 0.45, E.outBack);
      const no = t > 8.44 && t < 9.5 ? Math.sin((t - 8.44) * 16 + i) * 7 : 0;
      set(m.d, { y: (1 - k) * 460, r: no + wobble(t, 0.4, 1, i), o: t < t0 ? 0 : 1 });
      face(m, t, { look: t > 8.4 ? [0, 1] : [-3, 0], brow: t > 6.9 ? 6 : 0, jaw: t > 8.44 && t < 9.4 ? Math.abs(Math.sin(t * 9 + i)) * 0.35 : 0, seed: i * 1.1 });
    });
    popA(sign, t, 8.6, { r: -6 + wobble(t, 1.2, 2) });
    popA(arw, t, 7.0, { r: 0, rise: 30 });
    stampA(mito, t, 9.93, -10, 1);
  }, { clip: true });
  const S = tribunal(c);
  const sign = box(c, 405, 780, 270, 120, { background: '#fff', border: `4px solid ${INK}`, boxShadow: `5px 5px 0 ${SH}`, zIndex: 30, fontFamily: 'SpecialElite', fontSize: '34px', lineHeight: '38px', textAlign: 'center', paddingTop: '20px', color: RED }, 'TUS NÚMEROS<br>ESTÁN MAL');
  tableFront(c);
  const arw = el('div', c, { left: '640px', top: '1150px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '46px', color: PINK, textShadow: `3px 3px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 30 }, '↑ los expertos');
  const mito = stamp(c, 170, 560, 'MITO', { size: 230, bw: 18, z: 60, bg: 'rgba(255,255,255,.82)', blend: 'normal' });
}

/* ======================================================================
   S2 · MARCA: EL VECINO EN SU BALCÓN (10.6 – 13.85)  L2
   ====================================================================== */
{
  const c = scene(10.6, 13.85, t => {
    const ex = p(t, 13.62, 0.22, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.05 * p(t, 10.6, 3.2, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > 11.1 && t < 11.9 ? [0, -4] : t > 12.1 ? [-4, 3] : [0, 0], bL: t > 10.7 && t < 11.3 ? 8 : 2, bR: t > 10.7 && t < 11.3 ? 8 : 10, fan: t > 10.7 && t < 11.2 ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    popA(tag, t, 11.13, { r: -5 });
    const ks = p(t, 11.94, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: (1 - ks) * 8 + Math.sin(t * 2.4) * 1.2, o: t < 11.92 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 13.27, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14).keys()].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
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
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 46, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['esto', 33, sl1], ['no', 34, sl1], ['venía', 35, sl1], ['en', 36, sl2], ['el', 37, sl2], ['libro', 38, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   S3 · ERATÓSTENES (13.85 – 20.85)  L3
   ====================================================================== */
headline(13.85, 15.8, 'Siglo III *antes de Cristo*', { size: 80, hlT: 14.8 });
headline(15.8, 17.36, 'Un griego: *Eratóstenes*', { size: 82, hlT: 16.64 });
headline(17.36, 18.6, '*Midió* la Tierra…', { size: 92, hlT: 17.38 });
headline(18.6, 19.74, '…usando *sombras*', { size: 96, hlT: 18.64 });
headline(19.74, 20.85, 'Y casi la *clavó*', { size: 100, hlT: 20.25 });
{
  const c = scene(13.85, 20.85, t => {
    set(sunD, { r: t * 20, s: pop(t, 14.0, 0.5) });
    popA(dt, t, 14.19, { r: -4, s: 1 + 0.1 * (1 - p(t, 14.3, 0.4)) });
    colsL.forEach((q, i) => set(q, { y: (1 - p(t, 13.9 + i * 0.12, 0.5, E.outBack)) * 900 }));
    const ke = p(t, 15.98, 0.45, E.outBack); set(era.d, { x: (1 - ke) * -500, r: (1 - ke) * -10, o: t < 15.95 ? 0 : 1 });
    face(era, t, { look: t > 17.4 && t < 19.7 ? [5, -1] : t > 19.7 ? [5, 2] : [2, 0], brow: t > 20.2 ? -6 : 0, jaw: t > 20.3 && t < 20.8 ? 0.4 : 0, seed: 0.2 });
    set(era.d, { y: wobble(t, 0.5, 3) });
    popA(nm, t, 16.64, { r: 3 });
    // gnomon + sombra
    const kg = p(t, 16.3, 0.4, E.outBack); set(gno, { sy: Math.max(0.001, kg), o: t < 16.3 ? 0 : 1 });
    const ksh = p(t, 18.64, 0.7, E.outCubic); shadow.setAttribute('transform', `scale(${f1(Math.max(0.001, ksh) * 1000) / 1000},1)`);
    raysG.style.opacity = t > 18.5 ? 1 : 0; raysG.setAttribute('stroke-dashoffset', f1((1 - p(t, 18.5, 0.5)) * 400));
    // Tierra con ángulo → diana
    const kE = pop(t, 17.38, 0.45), out = p(t, 19.74, 0.2, E.inCubic);
    set(earth, { s: kE * (1 - out), r: 0, o: t < 17.38 ? 0 : 1 - out });
    earthDraw.forEach((q, i) => q.setAttribute('stroke-dashoffset', f1((1 - p(t, 17.6 + i * 0.25, 0.5)) * 600)));
    const kT = pop(t, 19.8, 0.4); set(tgt, { s: kT, o: t < 19.8 ? 0 : 1, r: wobble(t, 0.6, 2) });
    const ka = p(t, 20.05, 0.2, E.inCubic); set(arrowD, { x: lerp(500, 0, ka), y: lerp(-300, 0, ka), o: t < 20.05 ? 0 : 1, r: t > 20.25 ? Math.sin((t - 20.25) * 60) * 3 * (1 - p(t, 20.25, 0.4)) : 0 });
    const kb = pop(t, 20.3, 0.35); set(okb, { s: kb, o: t < 20.3 ? 0 : 1, r: -10 });
    popA(casi, t, 20.4, { r: -6 });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(#EADFC8 0 1000px, #E0CFA8 1000px)' });
  const sunD = box(c, 790, 420, 170, 170); sunD.innerHTML = svgW(`<circle cx="85" cy="85" r="52" fill="${YEL}" stroke="${INK}" stroke-width="5"/>${[...Array(12).keys()].map(k => { const a = k / 12 * 6.283; return `<path d="M${f1(85 + Math.cos(a) * 62)},${f1(85 + Math.sin(a) * 62)} L${f1(85 + Math.cos(a) * 82)},${f1(85 + Math.sin(a) * 82)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`; }).join('')}<circle cx="70" cy="76" r="5" fill="${INK}"/><circle cx="100" cy="76" r="5" fill="${INK}"/><path d="M68,96 q17,12 34,0" stroke="${INK}" stroke-width="4" fill="none"/>`, '0 0 170 170');
  const colsL = [];
  const column = (x, h) => { const d = box(c, x, 1000 - h, 110, h, { zIndex: 1 }); d.innerHTML = svgW(cut(`<rect x="10" y="30" width="90" height="${h - 60}"/><rect x="0" y="0" width="110" height="34"/><rect x="0" y="${h - 34}" width="110" height="34"/>`) + `<rect x="10" y="30" width="90" height="${h - 60}" fill="#F1E6CC" stroke="${INK}" stroke-width="4"/>${[28, 46, 64, 82].map(x2 => `<path d="M${x2},34 V${h - 34}" stroke="${INK}" stroke-width="2.5"/>`).join('')}<rect x="66" y="30" width="34" height="${h - 60}" fill="url(#hA)"/><rect x="0" y="0" width="110" height="34" rx="4" fill="#F1E6CC" stroke="${INK}" stroke-width="4"/><rect x="0" y="${h - 34}" width="110" height="34" rx="4" fill="#F1E6CC" stroke="${INK}" stroke-width="4"/>`, `0 0 110 ${h}`); colsL.push(d); return d; };
  const era = mk(c, [50, 470, 420, 537], figBust(ERA), '0 0 360 460', 'bust'); era.d.style.zIndex = 5;
  const nm = chip(c, 300, 940, 'Eratóstenes', { size: 40, bg: PINK, z: 30 });
  const dt = chip(c, 70, 450, 's. III a. C.', { size: 44, bg: INK, color: YEL, z: 30 });
  const gl = svgBox(c, 0, 0, 1080, 1920, `<path d="M560,1000 H1000" stroke="${INK}" stroke-width="6"/><path d="M560,1008 H1000" stroke="${INK}" stroke-width="2" stroke-dasharray="3 9"/>`, '0 0 1080 1920', { zIndex: 2 });
  const shG = svgBox(c, 0, 0, 1080, 1920, `<g transform="translate(700,0)"><g class="shd"><path d="M0,994 L-150,994 L-150,1004 L0,1004 Z" fill="${INK}"/><path d="M0,992 L-150,992 L-150,1006 L0,1006 Z" fill="url(#hD)"/></g></g><path class="ray" d="M880,520 L706,730 M940,560 L760,780 M820,500 L640,710" stroke="${YEL}" stroke-width="8" stroke-dasharray="400" stroke-linecap="round"/><path class="ray2" d="M880,520 L706,730 M940,560 L760,780 M820,500 L640,710" stroke="${INK}" stroke-width="2" stroke-dasharray="10 10"/>`, '0 0 1080 1920', { zIndex: 3 });
  const shadow = shG.querySelector('.shd'), raysG = shG.querySelector('.ray');
  shG.querySelector('.ray2').style.opacity = 0;
  const gno = svgBox(c, 690, 720, 24, 284, `<rect x="4" y="0" width="16" height="284" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="12" y="0" width="8" height="284" fill="url(#hD)"/>`, '0 0 24 284', { zIndex: 4, transformOrigin: '50% 100%' });
  el('div', c, { left: '520px', top: '1020px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, whiteSpace: 'nowrap', zIndex: 4 }, 'palo + sombra');
  const earth = box(c, 590, 1010, 330, 260, { zIndex: 6 });
  earth.innerHTML = svgW(cut('<circle cx="165" cy="140" r="112"/>') + `<circle cx="165" cy="140" r="112" fill="#EFE3C4" stroke="${INK}" stroke-width="5"/><circle cx="165" cy="140" r="112" fill="url(#hP)"/>
   <path class="ed" d="M165,140 L165,28" stroke="${INK}" stroke-width="5" stroke-dasharray="600"/><path class="ed" d="M165,140 L226,46" stroke="${INK}" stroke-width="5" stroke-dasharray="600"/>
   <path class="ed" d="M165,98 A42,42 0 0,1 188,104" stroke="${RED}" stroke-width="7" fill="none" stroke-dasharray="600"/>
   <path d="M165,28 v-24 M226,46 l12,-20" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="165" cy="140" r="7" fill="${INK}"/>`, '0 0 330 260');
  const earthDraw = [...earth.querySelectorAll('.ed')];
  const tgt = svgBox(c, 620, 1000, 280, 280, targetInner(), '0 0 300 300', { zIndex: 7 });
  const arrowD = svgBox(c, 607, 1015, 300, 200, `<path d="M140,128 L290,10" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M140,128 L290,10" stroke="${WOOD}" stroke-width="5"/><path d="M270,12 l28,-12 -8,30 Z M262,20 l30,-4 -6,20 Z" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M140,128 l20,-4 -8,14 Z" fill="${INK}"/>`, '0 0 300 200', { zIndex: 8 });
  const okb = badge(c, 830, 960, 120, GCHECK);
  const casi = chip(c, 480, 1180, '¡casi!', { size: 44, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   S4a · EN LA ÉPOCA DE COLÓN, LOS CULTOS LO SABÍAN (20.85 – 25.59)  L4a
   ====================================================================== */
headline(20.85, 22.2, 'En la época de *Colón*…', { size: 84, hlT: 21.52 });
headline(22.2, 23.33, 'cualquier persona *culta*', { size: 84, hlT: 22.98 });
headline(23.33, 25.59, 'sabía que era *redonda*', { size: 88, hlT: 24.41 });
{
  const c = scene(20.85, 25.59, t => {
    const kp = pop(t, 20.97, 0.45), kx = p(t, 22.15, 0.35, E.inOutCubic);
    set(port, { s: kp * lerp(1, 0.36, kx), x: kx * 300, y: kx * -150, r: lerp(-3, 4, kx), o: t < 20.97 ? 0 : 1 });
    const kg = pop(t, 22.2, 0.45); set(globe.d, { s: kg, o: t < 22.2 ? 0 : 1 }); spinGlobe(globe, t, t > 24.4 ? 160 : 40);
    sch.forEach((m, i) => { const t0 = 22.25 + i * 0.15, k = p(t, t0, 0.4, E.outBack); set(m.d, { y: (1 - k) * 700 + wobble(t, 0.5, 2, i), o: t < t0 ? 0 : 1 }); face(m, t, { look: [i ? -4 : 4, -1], brow: t > 23.3 ? -4 : 0, seed: i }); });
    books.forEach((b, i) => popA(b, t, 22.63 + i * 0.12, { r: [-8, 6, -3][i], rise: 40 }));
    chks.forEach((b, i) => { const k = pop(t, 23.33 + i * 0.14, 0.35); set(b, { s: k, o: t < 23.33 + i * 0.14 ? 0 : 1, y: Math.sin(t * 5 + i) * 6 }); });
    popA(rd, t, 24.41, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#E4D4B0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 2px, transparent 2px 40px)' });
  const shelf = svgBox(c, 0, 0, 1080, 1920, [500, 640].map(y => `<rect x="60" y="${y}" width="960" height="18" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>` + [...Array(22).keys()].map(k => `<rect x="${80 + k * 42}" y="${y - 70 - (k % 3) * 10}" width="34" height="${70 + (k % 3) * 10}" fill="${['#8a5a30', '#6b3f22', '#a8763e', '#4A2A17'][k % 4]}" stroke="${INK}" stroke-width="3"/>`).join('')).join(''), '0 0 1080 1920', { opacity: 0.55 });
  const sch = [mkSab(c, [40, 560, 300, 383], 1), mkSab(c, [690, 560, 260, 332], 0)];
  const globe = mkGlobe(c, [360, 520, 360, 450]);
  svgBox(c, 0, 0, 1080, 1920, `<rect x="20" y="930" width="1040" height="36" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="20" y="930" width="1040" height="36" fill="url(#hB)" opacity=".6"/>`, '0 0 1080 1920', { zIndex: 4 });
  const bk = (x, y, w, h, col, r) => svgBox(c, x, y, w, h, cut(`<rect x="0" y="0" width="${w}" height="${h}" rx="6"/>`, 4, 5) + `<rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="${col}" stroke="${INK}" stroke-width="4"/><rect x="0" y="${h - 14}" width="${w}" height="10" fill="#F7F0E0" stroke="${INK}" stroke-width="2"/><path d="M14,14 H${w - 14}" stroke="${BRASS}" stroke-width="4"/>`, `0 0 ${w} ${h}`, { zIndex: 6 });
  const books = [bk(80, 870, 200, 60, '#6b3f22'), bk(100, 820, 170, 52, '#4A2A17'), bk(770, 860, 170, 66, '#8a5a30')];
  const chks = [badge(c, 140, 440, 110, GCHECK), badge(c, 760, 470, 100, GCHECK)];
  const rd = chip(c, 400, 990, 'redonda ✓', { size: 52, bg: YEL, color: INK, z: 30 });
  const port = box(c, 330, 470, 420, 520, { zIndex: 50 });
  port.innerHTML = `<div style="position:absolute;inset:0;background:${BRASS};border:6px solid ${INK};border-radius:50% / 46%;box-shadow:10px 12px 0 ${SH}"></div><div style="position:absolute;left:26px;top:26px;right:26px;bottom:26px;border-radius:50% / 46%;overflow:hidden;background:#F4CFDA;border:4px solid ${INK}">${cropUse('colS', '20 60 320 400', 360, 460)}</div><div style="position:absolute;left:60px;right:60px;bottom:-26px;background:${INK};color:${YEL};font-family:Rye;font-size:34px;text-align:center;border-radius:10px;padding:6px 0">COLÓN</div>`;
}

/* ======================================================================
   S4b · ¿CÓMO DE GRANDE? (25.59 – 28.0)  L4b
   ====================================================================== */
headline(25.59, 27.04, 'La discusión era *otra*:', { size: 84, hlT: 26.31 });
headline(27.04, 28.0, '¿cómo de *grande*?', { size: 108, hlT: 27.41 });
{
  const c = scene(25.59, 28.0, t => {
    const k1 = pop(t, 25.7, 0.45), k2 = pop(t, 26.0, 0.5);
    set(gS.d, { s: k1, o: t < 25.7 ? 0 : 1, y: wobble(t, 0.7, 6) }); set(gB.d, { s: k2, o: t < 26.0 ? 0 : 1, y: wobble(t, 0.5, 8, 1) });
    spinGlobe(gS, t, 50); spinGlobe(gB, t, 25);
    popA(l1, t, 26.31, { r: -5 }); popA(l2, t, 26.6, { r: 4 });
    const kq = pop(t, 27.06, 0.4); set(q, { s: kq * (1 + 0.08 * Math.sin(t * 9)), r: Math.sin(t * 5) * 8, o: t < 27.06 ? 0 : 1 });
    set(vs, { s: pop(t, 26.1, 0.3), o: t < 26.1 ? 0 : 1 });
  }, { clip: true });
  halftone(c, 'rgba(43,33,24,.08)', 0);
  const gS = mkGlobe(c, [110, 640, 220, 275]);
  const gB = mkGlobe(c, [450, 470, 470, 588]);
  const l1 = chip(c, 150, 560, '¿así?', { size: 46, bg: '#fff', color: INK });
  const l2 = chip(c, 600, 1080, '¿o así?', { size: 46, bg: '#fff', color: INK });
  const vs = bigText(c, 330, 700, 120, 'vs', { size: 70, italic: true, color: PINK, css: { textShadow: `3px 3px 0 ${INK}` } });
  const q = bigText(c, 330, 380, 420, '?', { size: 420, color: PINK, z: 40, css: { textShadow: `10px 10px 0 ${INK}`, opacity: 0.95 } });
}

/* ======================================================================
   S5 · EL CÁLCULO DE COLÓN: JAPÓN A ~4.500 KM (28.0 – 33.2)  L5
   ====================================================================== */
headline(28.0, 29.0, 'Colón *calculó*…', { size: 96, hlT: 28.43 });
headline(29.0, 31.81, 'Japón, a unos *4.500 km*', { size: 82, hlT: 30.55 });
headline(31.81, 33.2, '…hacia el *oeste*', { size: 100, hlT: 32.59 });
const MAPX = 40, MAPY = 440;
{
  const c = scene(28.0, 33.2, t => {
    const km = p(t, 28.0, 0.45, E.outBack); set(map, { s: lerp(0.85, 1, km), r: lerp(-4, -0.8, km), o: clamp(km * 2) });
    const kc = p(t, 28.13, 0.4, E.outBack); set(col.d, { x: (1 - kc) * 400, o: t < 28.1 ? 0 : 1 });
    face(col, t, { look: t > 29 ? [-6, 0] : [-3, -3], brow: t > 30.2 && t < 31.3 ? -6 : 0, jaw: 0, seed: 0.5 });
    set(col.d, { y: wobble(t, 0.6, 3) });
    set(thk, { o: t > 28.4 && t < 29.9 ? 1 : 0, y: Math.sin(t * 6) * 6, s: pop(t, 28.4, 0.3) });
    const kj = pop(t, 29.02, 0.45); set(cip, { s: kj, o: t < 29.02 ? 0 : 1 });
    const kr = p(t, 30.22, 0.95, E.outCubic); const wR = 560 * kr; set(ruler, { o: t < 30.2 ? 0 : 1 }); ruler.style.width = px(Math.max(1, wR)); ruler.style.left = px(810 - wR);
    rl.textContent = '≈ ' + fmt(Math.round(counter(t, 30.22, 0.95, 0, 4500) / 10) * 10) + ' km';
    set(rlab, { s: pop(t, 30.3, 0.35), o: t < 30.3 ? 0 : 1, r: -2 });
    const ks = p(t, 31.83, 1.2, E.inOutCubic); set(shp, { x: -ks * 420, y: Math.sin(t * 5) * 5, r: Math.sin(t * 4) * 4, o: t < 31.7 ? 0 : 1 });
    dash.setAttribute('stroke-dashoffset', f1(-t * 40));
    set(dashW, { o: t > 31.83 ? 1 : 0 });
    popA(wst, t, 32.5, { r: -3 });
  }, { clip: true });
  const map = box(c, MAPX, MAPY, 1000, 650, { zIndex: 2 });
  {
    let rh = ''; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; rh += `<path d="M330,320 L${f1(330 + Math.cos(a) * 900)},${f1(320 + Math.sin(a) * 900)}" stroke="${k % 2 ? RED : INK}" stroke-width="${k % 4 ? 1.4 : 2.4}" opacity=".55"/>`; }
    const eu = 'M1000,0 L850,0 Q820,50 852,86 Q806,120 772,128 Q748,170 796,206 Q760,240 790,282 Q770,318 806,348 L790,372 Q760,404 790,430 Q834,476 822,560 Q840,610 860,650 L1000,650 Z';
    const ci = smooth([[120, 270], [160, 240], [210, 250], [240, 290], [222, 330], [180, 340], [150, 322], [118, 304]]);
    let rose = ''; for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 - 1.5708, L = k % 2 ? 46 : 84; rose += `<path d="M330,320 L${f1(330 + Math.cos(a + 0.18) * 18)},${f1(320 + Math.sin(a + 0.18) * 18)} L${f1(330 + Math.cos(a) * L)},${f1(320 + Math.sin(a) * L)} L${f1(330 + Math.cos(a - 0.18) * 18)},${f1(320 + Math.sin(a - 0.18) * 18)} Z" fill="${k % 2 ? FIG : INK}" stroke="${INK}" stroke-width="2.5"/>`; }
    const serp = `<g transform="translate(470,500)"><path d="M0,0 q30,-40 60,0 q30,40 60,0 q30,-40 60,0" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M0,0 q30,-40 60,0 q30,40 60,0 q30,-40 60,0" stroke="#9aa86a" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="-8" cy="-6" r="16" fill="#9aa86a" stroke="${INK}" stroke-width="4"/><circle cx="-12" cy="-10" r="3.5" fill="${INK}"/></g>`;
    let wv = ''; [[420, 160], [560, 230], [500, 400], [640, 120], [250, 470], [640, 560]].forEach(q => wv += `<path d="M${q[0]},${q[1]} q12,-10 24,0 q12,10 24,0" stroke="${INK}" stroke-width="2.4" fill="none"/>`);
    map.innerHTML = svgW(cut('<rect x="0" y="0" width="1000" height="650" rx="12"/>', 10, 12) + `<rect x="0" y="0" width="1000" height="650" rx="12" fill="#F2E3BE" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="1000" height="650" fill="url(#hP)" opacity=".7"/>` + clipG('mapc', 'M0,0 H1000 V650 H0 Z', rh + wv + serp) + `<circle cx="330" cy="320" r="62" fill="none" stroke="${INK}" stroke-width="3"/>` + rose +
      D(eu, '#D9C59A', 4) + clipG('euc', eu, `<rect x="760" y="0" width="240" height="650" fill="url(#hA)" opacity=".7"/>`) + `<text x="900" y="200" text-anchor="middle" font-family="Rye" font-size="38" fill="${INK}" transform="rotate(-8 900 200)">EUROPA</text><text x="912" y="540" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">ÁFRICA</text>` +
      `<g class="cip">${cut(P(ci), 4, 5)}${D(ci, '#D9C59A', 4)}${HF(ci, 'hA')}</g>` +
      `<rect x="20" y="20" width="960" height="610" rx="8" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="8 6"/>`, '0 0 1000 650');
  }
  const cip = box(c, MAPX + 60, MAPY + 160, 260, 300, { zIndex: 4 });
  cip.innerHTML = `<div style="position:absolute;left:30px;top:-6px;width:200px;text-align:center;font-family:Rye;font-size:36px;color:${INK}">CIPANGO</div><div style="position:absolute;left:30px;top:200px;width:200px;text-align:center;font-family:SpecialElite;font-size:34px;color:${INK}">(Japón)</div><div style="position:absolute;left:44px;top:50px;width:170px;height:150px;border:7px solid ${PINK};border-radius:50%;box-shadow:0 0 0 4px ${INK}, inset 0 0 0 4px ${INK}"></div>`;
  const dashW = svgBox(c, 0, 0, 1080, 1920, `<path class="dsh" d="M810,760 Q560,700 330,740" stroke="${INK}" stroke-width="6" stroke-dasharray="18 14" fill="none"/>`, '0 0 1080 1920', { zIndex: 4 });
  const dash = dashW.querySelector('.dsh');
  const shp = box(c, 740, 640, 140, 145, { zIndex: 6 }); shp.innerHTML = `<svg viewBox="0 0 540 560" width="140" height="145" style="overflow:visible"><g transform="translate(540,0) scale(-1,1)"><use href="#shipS" width="540" height="560"/></g></svg>`;
  const ruler = box(c, 810, 850, 10, 70, { zIndex: 7, background: '#E9C77C', border: `4px solid ${INK}`, borderRadius: '6px', boxShadow: `5px 5px 0 ${SH}`, backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 28px), repeating-linear-gradient(90deg, ${INK} 0 2px, transparent 2px 7px)`, backgroundSize: '100% 30px, 100% 14px', backgroundRepeat: 'no-repeat', overflow: 'hidden' });
  const rlab = box(c, 370, 930, 360, 100, { zIndex: 8, background: INK, border: `5px solid ${YEL}`, borderRadius: '20px', boxShadow: `6px 6px 0 ${SH}` });
  const rl = el('div', rlab, { left: '0', top: '14px', width: '350px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', color: YEL, whiteSpace: 'nowrap' }, '');
  const col = mkCol(c, [700, 930, 240, 307]); col.d.style.zIndex = 9;
  const thk = el('div', c, { left: '640px', top: '900px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', color: INK, zIndex: 10 }, '≈?');
  const wst = chip(c, 380, 1060, '← oeste', { size: 44, bg: PINK, z: 12 });
}
