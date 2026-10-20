/* ======================================================================
   A · COLD OPEN (0 – 4.75)  L0
   ====================================================================== */
headline(-1, 2.95, 'Un *mayor* del ejército australiano…', { size: 74, hlT: 0.5 });
headline(2.95, 4.75, 'contra un pájaro que *no sabe volar*', { size: 82, hlT: 3.8 });
{
  const c = scene(-1, 4.75, t => {
    set(cam, { s: 1 + 0.07 * p(t, 0, 4.7, E.linear) });
    set(sun, { r: t * 6 });
    face(mer, t, { look: [5, -3], brow: -6 + (t > 2.7 ? -2 : 0), jaw: t > 2.7 && t < 3.1 ? 0.4 : 0, seed: 0.4 });
    set(mer.d, { y: wobble(t, 0.6, 2) });
    const firing = t > 2.68 && t < 3.05;
    gun.flash.style.opacity = firing && Math.sin(t * 80) > 0 ? 1 : 0;
    set(gun.d, { r: -4 + (firing ? Math.sin(t * 90) * 1.5 : 0), x: firing ? Math.sin(t * 70) * 4 : 0 });
    trs.forEach((tr, i) => { const ph = ((t - 2.68) * 3.2 + i / trs.length) % 1; set(tr, { x: ph * 420, y: -ph * 40, o: firing ? 1 : 0 }); });
    const wingFlap = t > 4.2 ? Math.sin((t - 4.2) * 40) * 30 * (1 - p(t, 4.2, 0.55)) : 0;
    face(emu, t, { look: t < 2.6 ? [-4, 2] : t < 3.6 ? [-6, 4] : [-2, 0], half: true, jaw: (t > 1.0 && t < 2.4 ? Math.max(0, Math.sin(t * 9)) * 0.3 : 0), neck: wobble(t, 0.5, 2), wing: -wingFlap - 6, seed: 2 });
    set(emu.d, { y: wobble(t, 0.45, 4) });
    const kf = p(t, 2.95, 1.6, E.linear); set(feather, { x: Math.sin(kf * 9) * 40, y: kf * 300, r: Math.sin(kf * 9) * 40, o: t > 2.95 ? 1 - p(t, 4.3, 0.4) : 0 });
    set(chipA, { r: -3, s: 1, o: 1 });
    popA(arw, t, 3.3, { r: 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 800px' });
  const sun = box(cam, 480, 430, 540, 540, { borderRadius: '50%', background: YEL, border: `6px solid ${INK}`, boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  const hill = box(cam, 0, 0, 1080, 1920); hill.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-20,1080 Q300,1010 640,1060 T1100,1050 L1100,1500 L-20,1500 Z" fill="#E3D2AE" stroke="${INK}" stroke-width="5"/><path d="M-20,1080 Q300,1010 640,1060 T1100,1050 L1100,1500 L-20,1500 Z" fill="url(#hP)"/></svg>`;
  const mer = mkMer(cam, [70, 700, 270, 345]);
  const gun = mkGun(cam, [180, 900, 370, 169]);
  const sb = box(cam, 0, 0, 1080, 1920); { let s = ''; [[60, 1050], [170, 1040], [280, 1046], [390, 1056], [115, 1000], [225, 994], [335, 1004]].forEach(q => { s += `<g>${cut(`<ellipse cx="${q[0]}" cy="${q[1]}" rx="62" ry="30"/>`, 5, 6)}<ellipse cx="${q[0]}" cy="${q[1]}" rx="62" ry="30" fill="#d8c39a" stroke="${INK}" stroke-width="4"/><ellipse cx="${q[0] + 10}" cy="${q[1] + 8}" rx="50" ry="20" fill="url(#hA)"/><path d="M${q[0] - 40},${q[1] - 8} q40,-10 80,0" stroke="${INK}" stroke-width="2" fill="none"/></g>`; }); sb.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; }
  const trs = []; for (let i = 0; i < 5; i++) trs.push(el('div', cam, { left: '545px', top: px(965 + (i % 3) * 7), width: '70px', height: '7px', background: INK, borderRadius: '3px' }));
  const emu = mkEmu(cam, [450, 400, 700, 1050], { seed: 3 });
  const feather = box(cam, 660, 820, 70, 30); feather.innerHTML = `<svg viewBox="0 0 60 26" width="70" height="30"><path d="M2,13 Q30,-6 58,13 Q30,30 2,13 Z" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M4,13 H56" stroke="${INK}" stroke-width="2"/></svg>`;
  const chipA = chip(c, 70, 470, 'Australia · 1932', { size: 38, bg: INK, color: YEL });
  const arw = el('div', c, { left: '250px', top: '600px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: PINK, textShadow: `3px 3px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 30 }, 'el enemigo →');
}

/* ======================================================================
   B · DIEZ BALAS POR PÁJARO (4.75 – 7.45)  L1
   ====================================================================== */
headline(4.75, 6.5, 'Diez balas por *pájaro*…', { size: 84, hlT: 5.62 });
headline(6.5, 7.45, '…y aun *así*', { size: 96 });
{
  const CS = [];
  const c = scene(4.75, 7.45, t => {
    const k10 = pop(t, 4.83, 0.5); set(ten, { s: k10, r: -4, o: t < 4.83 ? 0 : 1 });
    popA(lb1, t, 5.19, { r: 2 }); popA(lb2, t, 5.4, { r: -2 }); paint(lbHL, t, 5.62, 0.35);
    CS.forEach(q => { const k = p(t, q.t, 0.42, E.outBounce); set(q.e, { x: q.x, y: lerp(-500, q.y, k), r: lerp(0, q.r, k) + (t > q.t ? (1 - clamp((t - q.t) / 0.6)) * 30 : 0), o: t < q.t ? 0 : 1 }); });
    const hop = t > 6.52 ? Math.abs(Math.sin((t - 6.52) * 9)) * 50 : 0;
    set(emu.d, { y: -hop + wobble(t, 0.5, 3), r: t > 6.52 ? Math.sin(t * 9) * 5 : 0 });
    face(emu, t, { look: t < 6.4 ? [-5, 4] : [2, -2], half: t < 6.5, jaw: t > 6.6 ? 0.5 : 0, wing: t > 6.52 ? Math.sin(t * 30) * 30 : -10, legL: t > 6.52 ? Math.sin(t * 18) * 20 : 0, legR: t > 6.52 ? -Math.sin(t * 18) * 20 : 0, seed: 1 });
    popA(zero, t, 6.6, { r: 4 });
  });
  const ten = el('div', c, { left: '60px', top: '380px', width: '520px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '400px', lineHeight: '440px', color: INK, textShadow: `12px 12px 0 ${YEL}, 16px 16px 0 ${INK}` }, '10');
  const lb1 = el('div', c, { left: '560px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: INK }, 'balas');
  const lb2 = el('div', c, { left: '560px', top: '600px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `por ${hlSpan('pájaro', 'lbh')}`);
  const lbHL = lb2.querySelector('.lbh');
  const r = rng(12);
  for (let i = 0; i < 10; i++) CS.push({ e: el('div', c, { left: 0, top: 0 }, casingSvg(46, 92)), x: 420 + (i % 5) * 52 + (r() - .5) * 20, y: 960 + Math.floor(i / 5) * -40 + (r() - .5) * 10, r: 70 + r() * 40 * (i % 2 ? 1 : -1) + (i % 2 ? 0 : 180), t: 4.85 + i * 0.13 });
  ground(c, 1060);
  const emu = mkEmu(c, [620, 640, 330, 495], { seed: 5 });
  const zero = chip(c, 600, 1150, 'ni se inmuta', { size: 34, bg: '#fff', color: INK });
}
colorHit(7.45, 8.4, YEL, c => {
  const big = mkEmu(c, [240, 560, 620, 930], { seed: 7 }); big.d.style.filter = SIL; big.d.style.zIndex = 3;
  const t1 = el('div', c, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '138px', lineHeight: 1, color: INK, zIndex: 4 }, '¡PERDIERON!');
  const st = stamp(c, 420, 1150, 'DERROTA', { size: 100, bw: 12, z: 5 });
  return t => {
    set(big.d, { y: -Math.abs(Math.sin((t - 7.45) * 10)) * 60, r: Math.sin(t * 10) * 4 });
    face(big, t, { wing: Math.sin(t * 34) * 35, legL: Math.sin(t * 20) * 25, legR: -Math.sin(t * 20) * 25, jaw: 0.7 });
    set(t1, { s: lerp(1.4, 1, p(t, 7.45, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, 7.45, 0.3);
    stampA(st, t, 7.62, -10);
  };
});

/* ======================================================================
   C · PRESENTACIÓN: LA VECINA EN SU BALCÓN (8.4 – 12.12)  L2
   ====================================================================== */
{
  const c = scene(8.4, 12.12, t => {
    const ex = p(t, 11.9, 0.22, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 8.4, 3.4, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, 11.2, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > 8.7 && t < 9.3;
    vecFace(vec, t, { jaw: talkW(t, 'VECINA'), look: t > 9.4 && t < 10.3 ? [0, -5] : t > 10.4 && t < 11.0 ? [-5, 4] : [0, 0], bL: t > 8.6 && t < 9.3 ? 8 : t > 11.3 ? 6 : 0, bR: t > 8.6 && t < 9.3 ? 8 : t > 11.3 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : (t > 10.45 && t < 11.0 ? 26 : wobble(t, 0.9, 6)), seed: 0.3 });
    popA(tag, t, 8.73, { r: -5 });
    const ks = p(t, 9.32, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 9.3, 2)) + (1 - ks) * 8, o: t < 9.3 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 10.2, 0.35);
    const kc = p(t, 10.45, 0.55, E.outBack); set(chair.d, { s: lerp(0.15, 1, kc), x: lerp(200, 0, kc), y: lerp(-420, 0, kc), r: lerp(-20, -4, kc), o: t < 10.43 ? 0 : 1 });
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hW)" opacity=".25"/>
    <path d="M168,640 Q168,470 540,458 L540,1300 L168,1300 Z" fill="none"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/>${lace}</svg>`;
  }
  const vec = mkVec(cam, [190, 430, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040, -1], [760, 1040, 1]].forEach((q, i) => {
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
  [['esto', 28, sl1], ['no', 29, sl1], ['venía', 30, sl1], ['en', 31, sl2], ['el', 32, sl2], ['libro', 33, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
  const chair = mk(cam, [300, 1000, 480, 640], chairInner(), '0 0 300 400', 'chair'); chair.d.style.zIndex = 30;
  el('div', chair.d, { left: '120px', top: '-60px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: `3px 3px 0 ${INK}`, whiteSpace: 'nowrap' }, '¡siéntate!');
}

/* ======================================================================
   D · 1932 · AUSTRALIA (12.12 – 14.45)  L3a
   ====================================================================== */
{
  const c = scene(12.12, 14.45, t => {
    const ys = [[12.21, '1000'], [12.38, '1900'], [12.83, '1930'], [13.16, '1932']]; let txt = '1000', tk = 12.21;
    ys.forEach(y => { if (t >= y[0]) { txt = y[1]; tk = y[0]; } });
    if (yr.dataset.v !== txt) { yr.textContent = txt; yr.dataset.v = txt; }
    const km = p(t, 13.5, 0.4, E.inOutCubic);
    const bump = 1 + 0.2 * (1 - p(t, tk, 0.25, E.outBack));
    set(yr, { y: km * -250, s: (t < 12.2 ? 0 : bump) * lerp(1, 0.5, km), o: 1 });
    paint(yHL, t, 13.16, 0.3);
    const kmp = pop(t, 13.56, 0.5); set(map.d, { s: kmp, o: t < 13.56 ? 0 : 1, r: -2 + wobble(t, 0.5, 0.6) });
    waP.setAttribute('width', f1(p(t, 13.9, 0.45, E.inOutCubic) * 325));
    popA(waL, t, 14.0, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: INK, backgroundImage: 'repeating-linear-gradient(45deg, rgba(234,223,200,.05) 0 2px, transparent 2px 9px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,230,0,.12), rgba(0,0,0,.5) 75%)' });
  const yr = el('div', c, { left: 0, top: '560px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '330px', lineHeight: '340px', color: YEL, textShadow: `10px 10px 0 ${PINK}`, zIndex: 3 }, '1000'); yr.dataset.v = '1000';
  const yHLw = box(yr, 250, 280, 580, 46, { zIndex: -1 }); const yHL = box(yHLw, 0, 0, 580, 46, { background: PINK, transformOrigin: 'left center', borderRadius: '6px 16px 8px 18px' });
  const map = mk(c, [330, 620, 700, 564], mapInner(), '0 0 770 620', 'map'); map.d.style.zIndex = 2;
  const waP = map.d.querySelector('.waPaint');
  const waL = el('div', c, { left: '150px', top: '1300px', fontFamily: 'Rye', fontSize: '50px', color: INK, background: YEL, padding: '6px 20px', border: `4px solid ${INK}`, whiteSpace: 'nowrap', zIndex: 4, boxShadow: `6px 6px 0 ${PINK}` }, 'AUSTRALIA OCCIDENTAL');
  waL.style.top = '1200px'; waL.style.left = '380px'; waL.style.fontSize = '44px';
}

/* ======================================================================
   E · GRANJEROS VETERANOS · TRIGO · CRISIS (14.45 – 18.85)  L3b
   ====================================================================== */
headline(14.45, 17.0, 'Granjeros *veteranos*', { size: 88, hlT: 15.47 });
headline(17.0, 18.85, 'Trigo en plena *crisis*', { size: 88, hlT: 18.24 });
{
  const c = scene(14.45, 18.85, t => {
    set(pill, { s: pop(t, 14.48, 0.5), r: -3, o: 1 });
    const k = pop(t, 14.55, 0.5); set(far.d, { s: k, o: 1, y: wobble(t, 0.5, 4), r: wobble(t, 0.35, 1) });
    face(far, t, { seed: 0.4, jaw: t > 18.24 ? 0.35 : 0, look: t > 18.2 ? [-2, 4] : t > 15.4 ? [-5, 0] : [0, 0], brow: t > 18.24 ? -6 : 0 });
    popA(c1, t, 15.47, { r: -3 });
    const ks = p(t, 16.05, 0.7); set(spk, { s: t < 16.05 ? 0 : Math.sin(ks * Math.PI) * 1.6, r: t * 200, o: t < 16.05 ? 0 : 1 });
    wh.forEach((u, i) => { const kk = p(t, 17.03 + i * 0.03, 0.45, E.outBack); u.setAttribute('transform', `translate(${u.dataset.x},1310) scale(1,${f1(Math.max(0.001, kk) * 1000) / 1000}) rotate(${f1(Math.sin(t * 2 + i) * 3)}) translate(-30,-300)`); });
    popA(c3, t, 18.24, { r: 3 }); popA(arrD, t, 18.3);
    set(drop, { o: t > 18.3 ? 1 : 0, y: t > 18.3 ? p(t, 18.3, 0.5) * 30 : 0 });
  });
  const pill = box(c, 400, 400, 600, 760, { background: '#F6D3E0', border: `5px solid ${INK}`, borderRadius: '300px 300px 40px 40px', boxShadow: `10px 12px 0 ${SH}` });
  const far = mkFar(c, [390, 420, 580, 741]);
  const c1 = paperPiece(c, 50, 430, 400, 200, { seed: 5 }).wrap;
  c1.lastChild.innerHTML += `<div style="position:absolute;left:20px;top:22px;font-family:SpecialElite;font-size:36px;line-height:1.25;color:${INK}">veterano de la<br><b style="font-family:Playfair;font-size:44px">1.ª Guerra Mundial</b></div>`;
  const spk = el('div', c, { left: '740px', top: '980px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, zIndex: 5 }, '✦');
  const c3 = chip(c, 60, 720, 'Gran Depresión', { size: 50, bg: INK, color: YEL });
  const arrD = box(c, 90, 820, 300, 150); arrD.innerHTML = arrowSvg('M20,20 L90,70 L140,40 L260,130 M260,130 L222,128 M260,130 L254,94', PINK, 11);
  const drop = el('div', c, { left: '560px', top: '560px', zIndex: 6 }, '<svg width="40" height="56" viewBox="0 0 34 48"><path d="M17,2 C24,18 32,26 32,34 A15,15 0 0,1 2,34 C2,26 10,18 17,2 Z" fill="#cfe9ff" stroke="#2B2118" stroke-width="3"/></svg>');
  const ws = svgLayer(c, 3); var wh = [];
  for (let i = 0; i < 17; i++) { const u = use(ws, '#wheat', 60, 300); u.dataset.x = 50 + i * 60 + (i % 2) * 10; wh.push(u); }
}

/* ======================================================================
   F · Y DE REPENTE… (18.85 – 20.15)  L4a
   ====================================================================== */
headline(18.85, 20.15, 'Y de *repente*…', { size: 100, hlT: 19.3 });
{
  const c = scene(18.85, 20.15, t => {
    set(cam, { s: 1 + 0.1 * p(t, 18.85, 1.3, E.inCubic) });
    const rust = t > 19.2 ? 1 : 0.2;
    WH.forEach((q, i) => q.u.setAttribute('transform', `translate(${q.x},${q.y}) rotate(${f1(Math.sin(t * (rust > 0.5 ? 14 : 2) + i) * 4 * rust)} 35 340) `));
    peeks.forEach((e, i) => { const k = p(t, e.t, 0.3, E.outBack); set(e.f.d, { y: (1 - k) * 260, o: t < e.t ? 0 : 1 }); face(e.f, t, { look: i % 2 ? [-6, 0] : [5, -2], jaw: 0, seed: i }); });
    popA(q1, t, 19.7, { r: 8 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  box(cam, 0, 0, 1080, 1920, { background: 'linear-gradient(180deg, rgba(255,230,0,0) 30%, rgba(255,230,0,.28) 100%)' });
  const peeks = [{ f: mkEmu(cam, [420, 690, 300, 450], { seed: 81 }), t: 19.55 }, { f: mkEmu(cam, [700, 720, 260, 390], { seed: 82 }), t: 19.78 }, { f: mkEmu(cam, [160, 740, 240, 360], { seed: 83 }), t: 19.92 }];
  peeks[1].f.d.style.transform = 'scaleX(-1)';
  const ws = svgLayer(cam, 4); const WH = [];
  for (let row = 0; row < 3; row++) for (let i = 0; i < 16; i++) { const u = use(ws, '#wheat', 70, 340); WH.push({ u, x: -20 + i * 72 + row * 20, y: 760 + row * 120 }); }
  const q1 = el('div', cam, { left: '760px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 6 }, '?');
}

/* ======================================================================
   G · ¡VEINTE MIL EMÚS! (20.15 – 22.22)  L4b
   ====================================================================== */
{
  const H = [];
  const c = scene(20.15, 22.22, t => {
    const n = counter(t, 20.18, 1.2, 0, 20000);
    cnt.textContent = fmt(Math.round(n / 10) * 10);
    set(cntW, { s: (t < 20.18 ? 0.8 : 1) * (1 + 0.15 * (1 - p(t, 21.4, 0.3, E.outBack)) * (t > 21.4 ? 1 : 0)), o: 1 });
    cnt.style.textShadow = glitch(t, 21.4, 0.25) || `10px 10px 0 ${YEL}`;
    popA(lbl, t, 21.47, { r: -3 });
    H.forEach(h => {
      const k = p(t, h.t, h.dur, E.linear), moving = k < 1;
      const x = lerp(h.x0, h.x1, k), bob = -Math.abs(Math.sin(t * 16 + h.ph)) * 12 * h.sc;
      h.u.setAttribute('href', (Math.sin(t * 16 + h.ph) > 0 ? '#emuA' : '#emuB'));
      placeU(h.u, x, h.y + bob, h.w, { o: t < h.t ? 0 : 1 });
    });
  }, { clip: true });
  const cntW = box(c, 0, 330, 1080, 300, { zIndex: 6 });
  const cnt = el('div', cntW, { left: 0, top: 0, width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '250px', lineHeight: '280px', color: INK }, '0');
  const lbl = chip(c, 380, 610, 'emús', { size: 70, bg: PINK, z: 7 });
  const hs = svgLayer(c, 2); const r = rng(44);
  for (let row = 0; row < 6; row++) {
    const h = 150 + row * 40, w = h / 1.5, base = 860 + row * 90, n = 9 - Math.floor(row / 2);
    for (let j = 0; j < n; j++) {
      const t0 = 20.2 + row * 0.1 + j * 0.06 + r() * 0.08, dur = 1.6 + r() * 0.4 - row * 0.1;
      H.push({ u: use(hs, '#emuS', w, h), x0: 1100 + j * 60, x1: 1100 + j * 60 - (1300 + r() * 200), y: base - h, w, t: t0, dur, ph: r() * 6, sc: h / 150 });
    }
  }
  [[21.0, 1100, 1600], [21.35, 1180, 1700]].forEach((q, i) => H.push({ u: use(hs, '#emuS', q[2] / 1.5, q[2]), x0: q[1], x1: -1200, y: 1500 - q[2], w: q[2] / 1.5, t: q[0], dur: 0.8, ph: i * 2, sc: 4 }));
}

/* ======================================================================
   H · COMIÉNDOSE EL TRIGO (22.22 – 23.88)  L4c
   ====================================================================== */
headline(22.22, 23.88, 'Comiéndose el *trigo*', { size: 86, hlT: 23.38 });
{
  const c = scene(22.22, 23.88, t => {
    eaters.forEach((e, i) => { const pk = t > 22.4 ? (0.5 + 0.5 * Math.sin(t * 10 + i * 2)) : 0; face(e, t, { neck: -24 - pk * 70, jaw: pk > 0.7 ? 0.6 : 0, half: true, seed: i }); set(e.d, { y: wobble(t, 0.8, 3, i) }); });
    st.forEach((s, i) => { const te = 22.5 + i * 0.08; const k = p(t, te, 0.18, E.inCubic); s.u.setAttribute('transform', `translate(${s.x},1290) scale(1,${f1((1 - 0.8 * k) * 1000) / 1000}) translate(-35,-380)`); });
    bites.forEach((b, i) => { const te = 22.55 + i * 0.12; const k = p(t, te, 0.5); set(b, { x: k * (i % 2 ? 80 : -80), y: -Math.sin(k * Math.PI) * 120 + k * 80, o: t < te ? 0 : 1 - k, r: k * 300 }); });
    popA(nam, t, 22.6, { r: -8, s: 1 + Math.sin(t * 20) * 0.04 }); popA(nam2, t, 23.2, { r: 6 });
  }, { clip: true });
  const eaters = [mkEmu(c, [440, 400, 560, 840], { seed: 31 }), mkEmu(c, [40, 520, 440, 660], { seed: 32 })];
  const fs = svgLayer(c, 3); const st = [];
  for (let i = 0; i < 13; i++) { const u = use(fs, '#wheat', 70, 380); st.push({ u, x: 60 + i * 76 }); }
  const bites = []; for (let i = 0; i < 10; i++) bites.push(el('div', c, { left: px(160 + i * 76), top: '980px', width: '16px', height: '26px', background: FIG, border: `2px solid ${INK}`, borderRadius: '50%', zIndex: 4 }));
  const nam = el('div', c, { left: '560px', top: '420px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '120px', color: YEL, textShadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 6 }, '¡ÑAM!');
  const nam2 = el('div', c, { left: '90px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '90px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 6 }, '¡ÑAM!');
}

/* ======================================================================
   I · ROMPIENDO LAS VALLAS (23.88 – 25.72)  L4d
   ====================================================================== */
headline(23.88, 25.72, 'Rompiendo las *vallas*', { size: 84, hlT: 24.95 });
{
  const c = scene(23.88, 25.72, t => {
    const k = p(t, 24.1, 0.85, E.inCubic), hit = t > 24.95;
    set(runner.d, { x: lerp(860, -40, k) + (hit ? -p(t, 24.95, 0.5) * 600 : 0), y: -Math.abs(Math.sin(t * 15)) * 22, o: 1 });
    face(runner, t, { ...run(runner, t, 20, 34), jaw: 0.5, look: [-6, 0], neck: 12 });
    rails.forEach((rl, i) => { const kk = hit ? p(t, 24.95 + i * 0.02, 0.6, E.outCubic) : 0; const g = kk * kk; rl.setAttribute('transform', `translate(${f1(-kk * rl.vx)},${f1(-kk * rl.vy + g * 400)}) rotate(${f1(kk * rl.vr)} ${rl.cx} ${rl.cy})`); });
    popA(crack, t, 24.95, { r: -8, s: 1.1 });
    set(cam, { s: 1 + 0.05 * p(t, 23.9, 1.8, E.linear) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  const fsv = svgLayer(cam, 1); const rails = [];
  {
    let posts = ''; const PX = [80, 290, 500, 710, 920];
    PX.forEach(x => posts += `<path d="M${x - 20},780 L${x + 20},780 L${x + 22},1210 L${x - 22},1210 Z" fill="#d8c7a2" stroke="${INK}" stroke-width="5"/><path d="M${x - 20},780 L${x + 20},780 L${x + 22},1210 L${x - 22},1210 Z" fill="url(#hA)"/><path d="M${x - 20},780 L${x},764 L${x + 20},780" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`);
    fsv.innerHTML = `<rect x="0" y="1206" width="1080" height="12" fill="${INK}"/>` + posts;
    const r2 = rng(9);
    for (let g = 0; g < 4; g++) for (let rr = 0; rr < 3; rr++) {
      const x0 = PX[g] + 14, x1 = PX[g + 1] - 14, y = 840 + rr * 115;
      const gg = document.createElementNS(NS, 'g'); gg.innerHTML = `<path d="M${x0},${y} L${x1},${y + 4} L${x1},${y + 38} L${x0},${y + 34} Z" fill="#e3d3ae" stroke="${INK}" stroke-width="5"/><path d="M${x0},${y} L${x1},${y + 4} L${x1},${y + 38} L${x0},${y + 34} Z" fill="url(#hW)"/>`;
      fsv.appendChild(gg); const far2 = g >= 2;
      Object.assign(gg, { vx: (far2 ? 300 : 80) + r2() * 220, vy: 220 + r2() * 320, vr: (r2() - .5) * 400, cx: (x0 + x1) / 2, cy: y + 18 }); rails.push(gg);
    }
  }
  const runner = mkEmu(cam, [0, 600, 420, 630], { seed: 33 });
  const crack = el('div', cam, { left: '330px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '170px', color: PINK, textShadow: `6px 6px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 5 }, '¡CRAC!');
}

/* ======================================================================
   J · UN DESASTRE (25.72 – 27.18)  L4e
   ====================================================================== */
headline(25.72, 27.18, 'Un *desastre*.', { size: 130, hlT: 26.0, hlc: PINK });
{
  const c = scene(25.72, 27.18, t => {
    set(cam, { r: -3 + shake(t, 26.0, 0.5, 2), s: 1.02 });
    mess.forEach((e, i) => { face(e.f, t, { jaw: 0.5 + Math.sin(t * 18 + i) * 0.3, neck: Math.sin(t * 6 + i) * 30, wing: Math.sin(t * 28 + i) * 30, ...run(e.f, t, 18 + i, 24), seed: i }); set(e.f.d, { y: -Math.abs(Math.sin(t * 9 + i)) * 30, r: Math.sin(t * 5 + i) * 6 }); });
    const kh = p(t, 25.9, 1.2, E.outCubic); set(hat, { x: kh * 260, y: -Math.sin(kh * Math.PI) * 360 + kh * 120, r: kh * 540, o: t < 25.9 ? 0 : 1 });
    face(far, t, { jaw: 0.9, brow: -8, look: [3, -4] }); set(far.d, { y: wobble(t, 4, 4), r: Math.sin(t * 20) * 3 });
  }, { clip: true });
  sceneBg(c, { background: 'rgba(200,16,46,.16)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const ws = svgLayer(cam, 1); for (let i = 0; i < 16; i++) { const u = use(ws, '#wheat', 60, 300); u.setAttribute('transform', `translate(${30 + i * 66},1000) scale(1,0.22) rotate(${(i % 3 - 1) * 20})`); }
  const fsv = svgLayer(cam, 1); fsv.innerHTML = `<g transform="rotate(-18 300 1050)"><rect x="80" y="1020" width="420" height="34" fill="#e3d3ae" stroke="${INK}" stroke-width="5"/></g><g transform="rotate(24 760 980)"><rect x="560" y="960" width="420" height="34" fill="#e3d3ae" stroke="${INK}" stroke-width="5"/></g><rect x="0" y="1200" width="1080" height="10" fill="${INK}"/>`;
  const far = mkFar(cam, [640, 470, 300, 383]);
  const hat = box(cam, 720, 420, 160, 100, { zIndex: 6 }); hat.innerHTML = cropUse('farS', '50 60 260 140', 360, 460);
  const mess = [[60, 560, 340], [420, 640, 300], [700, 760, 280], [250, 820, 260]].map((q, i) => ({ f: mkEmu(cam, [q[0], q[1], q[2], q[2] * 1.5], { seed: 60 + i }) }));
  mess[1].f.d.style.transform = 'scaleX(-1)';
}

/* ======================================================================
   K · ¿Y QUÉ HACE EL GOBIERNO? (27.18 – 28.8)  L5a
   ====================================================================== */
headline(27.18, 28.8, '¿Y qué hace el *gobierno*?', { size: 80, hlT: 27.75 });
{
  const c = scene(27.18, 28.8, t => {
    const z = 1 + 0.18 * p(t, 27.2, 1.6, E.inOutCubic);
    set(env, { s: z * pop(t, 27.22, 0.4), r: -3 + (t > 28.4 ? Math.sin(t * 60) * 2 : 0), o: 1 });
    stampA(seal, t, 27.73, 0, 1);
    set(q, { s: z * 1.05, r: 8 + wobble(t, 0.5, 4), o: 0.9 * p(t, 27.3, 0.4) });
  });
  const q = el('div', c, { left: '200px', top: '300px', width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '760px', lineHeight: '900px', color: PINK, opacity: .9 }, '?');
  const env = box(c, 120, 560, 840, 545);
  env.innerHTML = `<svg viewBox="0 0 740 480" width="840" height="545" style="overflow:visible">${cut('<rect x="10" y="10" width="720" height="460"/>')}<rect x="10" y="10" width="720" height="460" fill="#F1E2BE" stroke="${INK}" stroke-width="5"/><rect x="10" y="10" width="720" height="460" fill="url(#hP)"/><path d="M10,10 L370,270 L730,10" fill="#E8D4A6" stroke="${INK}" stroke-width="5"/><path d="M10,470 L300,230 M730,470 L440,230" stroke="${INK}" stroke-width="3"/><text x="370" y="420" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">GOBIERNO</text></svg>`;
  const seal = box(c, 466, 790, 150, 150, { zIndex: 4 }); seal.innerHTML = `<svg viewBox="0 0 150 150" width="150" height="150" style="overflow:visible"><path d="M75,6 C100,4 112,20 128,30 C146,44 144,66 146,80 C146,104 132,118 114,132 C96,146 70,148 52,140 C30,132 12,116 8,92 C4,66 10,44 26,28 C40,14 56,8 75,6 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="75" cy="76" r="46" fill="none" stroke="#7a0a1c" stroke-width="5"/><text x="75" y="100" text-anchor="middle" font-family="Rye" font-size="70" fill="#fff">G</text></svg>`;
}

/* ======================================================================
   L · AGÁRRATE… (28.8 – 29.79)  L5b — la Vecina a pantalla completa
   ====================================================================== */
headline(28.8, 29.79, 'Agárrate…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
{
  const c = scene(28.8, 29.79, t => {
    const k = p(t, 28.8, 1.0, E.inOutCubic);
    set(vec.d, { s: 1 + 0.26 * k, y: k * 40, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINA') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
  el('div', c, { left: '0', top: '1240px', width: '1080px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', color: PAPER, zIndex: 3, opacity: .8 }, '(susurrando)');
}

/* ======================================================================
   M · ¡MANDA AL EJÉRCITO! (29.79 – 31.28)  golpe rosa
   ====================================================================== */
colorHit(29.79, 31.28, PINK, c => {
  const ry = rays(c, -180, 120, 1440, 26, YEL, 'rgba(0,0,0,0)', 1);
  const mer = mkMer(c, [210, 520, 660, 843]); mer.d.style.zIndex = 3; mer.d.style.filter = SIL;
  const sash = box(c, 210, 520, 660, 843, { zIndex: 4 }); sash.innerHTML = svgW(`<path d="${limb(92, 350, 300, 460, 13, 13)}" fill="${YEL}" stroke="${INK}" stroke-width="3"/><circle cx="196" cy="405" r="18" fill="${YEL}" stroke="${INK}" stroke-width="3"/><circle cx="156" cy="204" r="9" fill="#fff"/><circle cx="204" cy="204" r="9" fill="#fff"/>`, '0 0 360 460');
  const t1 = el('div', c, { left: '0', top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '124px', lineHeight: 1, color: INK, zIndex: 5, textShadow: '5px 5px 0 #fff' }, 'Manda al<br>¡EJÉRCITO!');
  const scraps = []; { const r = rng(5); for (let i = 0; i < 26; i++) { const a = r() * 6.28, d = 300 + r() * 450; const e = el('div', c, { left: '520px', top: '900px', width: px(26 + r() * 40), height: px(16 + r() * 30), background: [YEL, '#fff', INK][i % 3], border: `3px solid ${INK}`, clipPath: jag(i, 18, 3), zIndex: 6 }); scraps.push({ e, vx: Math.cos(a) * d, vy: Math.sin(a) * d - 200, vr: (r() - .5) * 900 }); } }
  return t => {
    const k = p(t, 29.82, 0.5, E.outBackBig);
    set(mer.d, { s: k, o: 1, y: wobble(t, 2, 4) }); set(sash, { s: k, o: 1, y: wobble(t, 2, 4) });
    set(ry, { r: t * 30, s: 1 + 0.1 * Math.sin(t * 8) });
    set(t1, { s: lerp(1.3, 1, p(t, 29.82, 0.25)), o: 1 });
    scraps.forEach(s => { const kk = p(t, 29.84, 1.0, E.outCubic); set(s.e, { x: s.vx * kk, y: s.vy * kk + kk * kk * 160, r: s.vr * kk, o: 1 - p(t, 30.9, 0.3) }); });
  };
});

/* ======================================================================
   N · FICHA MILITAR (31.28 – 37.22)  L6
   ====================================================================== */
headline(31.28, 35.62, 'El mayor *Meredith* y compañía', { size: 72, hlT: 31.97 });
headline(35.62, 37.22, 'Ojo, que esto se pone *bueno*', { size: 76, hlT: 36.45 });
{
  const c = scene(31.28, 37.22, t => {
    const kf = p(t, 31.3, 0.45, E.outBack); set(fc.wrap, { y: (1 - kf) * 1200, r: -1, o: 1 });
    set(photo, { s: p(t, 31.5, 0.35, E.outBack), r: 4, o: t < 31.5 ? 0 : 1 });
    set(mer.d, { s: p(t, 31.55, 0.35, E.outBack), r: 4, o: t < 31.5 ? 0 : 1 });
    face(mer, t, { look: [-3, 1], brow: -4, seed: 0.3 });
    rows.forEach(rw => popA(rw.e, t, rw.t, { rise: 20 }));
    paint(hlM, t, 32.0, 0.4);
    const nb = counter(t, 34.42, 1.1, 0, 10000, E.outCubic);
    bulN.textContent = fmt(Math.round(nb / 50) * 50);
    popA(bw, t, 34.4, { rise: 30 });
    bullets.forEach((b, i) => { const on = nb >= (i + 1) * 625 - 1; set(b, { o: on ? 1 : 0.12, s: on ? 1 : 0.8, y: on ? 0 : -10 }); });
    paint(hlB, t, 34.81, 0.3);
    popA(bueno, t, 36.5, { r: -6 });
  });
  const fc = paperPiece(c, 60, 390, 900, 640, { seed: 21 });
  fc.inner.innerHTML = `<div style="position:absolute;left:34px;top:20px;font-family:Rye;font-size:54px;color:${INK}">FICHA MILITAR</div><div style="position:absolute;left:36px;top:88px;font-family:SpecialElite;font-size:30px;color:${RED}">OPERACIÓN EMÚ · AUSTRALIA OCC. · 1932</div><div style="position:absolute;left:30px;top:132px;width:822px;height:4px;border-top:4px double ${INK}"></div>`;
  const photo = box(c, 630, 560, 290, 360, { background: '#fff', boxShadow: `8px 10px 0 ${SH}`, zIndex: 4 });
  box(photo, 14, 14, 262, 332, { background: '#E6D8BC' });
  el('div', photo, { left: '80px', top: '-18px', width: '130px', height: '36px', background: 'rgba(255,230,0,.75)', transform: 'rotate(-4deg)' });
  const mer = mkMer(c, [640, 590, 270, 345]); mer.d.style.zIndex = 5;
  const rows = [];
  const rowEl = (y, t, num, html) => { const e = box(c, 100, y, 520, 130, { zIndex: 6 }); e.innerHTML = `<div style="position:absolute;left:0;top:-6px;font-family:Playfair;font-weight:900;font-size:116px;line-height:130px;color:${INK}">${num}</div><div style="position:absolute;left:100px;top:4px;width:430px">${html}</div>`; rows.push({ e, t }); return e; };
  rowEl(560, 31.33, '1', `<div style="font-family:Playfair;font-weight:800;font-size:58px;line-height:64px;color:${INK}">mayor</div><div style="font-family:SpecialElite;font-size:46px;line-height:52px;color:${INK}">${hlSpan('Meredith', 'hlM')}</div>`);
  const hlM = c.querySelector('.hlM');
  const r2 = rowEl(705, 32.56, '2', `<div style="font-family:Playfair;font-weight:800;font-size:58px;line-height:120px;color:${INK}">soldados</div>`);
  r2.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:340px;top:-14px;width:200px;height:140px"><svg viewBox="0 0 200 140" width="200" height="140" style="overflow:visible"><use href="#solS" x="0" y="0" width="108" height="138"/><use href="#solS" x="92" y="4" width="108" height="138"/></svg></div>`);
  const r3 = rowEl(850, 33.4, '2', `<div style="font-family:Playfair;font-weight:800;font-size:54px;line-height:64px;color:${INK}">ametralladoras</div><div style="font-family:SpecialElite;font-size:34px;color:${INK}">tipo Lewis</div>`);
  const g3 = box(c, 640, 920, 300, 110, { zIndex: 6 }); g3.innerHTML = `<svg viewBox="0 0 330 150" width="300" height="136" style="overflow:visible"><use href="#gunS" x="0" y="0" width="220" height="100"/><use href="#gunS" x="100" y="50" width="220" height="100"/></svg>`; rows.push({ e: g3, t: 33.6 });
  const bw = box(c, 430, 1040, 520, 260, { zIndex: 6 });
  bw.innerHTML = `<div style="position:absolute;left:0;top:0;font-family:Playfair;font-weight:900;font-size:140px;line-height:150px;color:${INK};white-space:nowrap;text-shadow:7px 7px 0 ${YEL}"><span class="bulN">0</span></div><div style="position:absolute;left:10px;top:142px;font-family:Playfair;font-style:italic;font-weight:800;font-size:60px;color:${INK}">${hlSpan('balas', 'hlB')}</div>`;
  const bulN = bw.querySelector('.bulN'); const hlB = bw.querySelector('.hlB');
  const bullets = []; for (let i = 0; i < 16; i++) bullets.push(el('div', bw, { left: px(190 + (i % 8) * 42), top: px(150 + Math.floor(i / 8) * 54) }, bulletSvg(28, 52)));
  const bueno = chip(c, 330, 920, 'esto se pone bueno ☕', { size: 34, bg: PINK, z: 30 });
}
