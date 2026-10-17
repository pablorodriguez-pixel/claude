/* Ep. 23 · escenas L3–L5 (todo clavado por texto a words.js vía K) */

/* ======================================================================
   I · «¿Y POR QUÉ SOBREVIVIÓ OK?» — cementerio de abreviaturas (+ cameo del emú)
   ====================================================================== */
headline(S.I[0], S.I[1], '¿Por qué *sobrevivió* OK?', { size: 92, hlT: K.sobrevivio });
const T_EMU = K.sobrevivio + 0.05;
{
  const c = scene(S.I[0], S.I[1], t => {
    TB.forEach((tb, i) => set(tb.d, { y: (1 - p(t, S.I[0] + i * 0.06, 0.35, E.outBack)) * 500, r: [-4, 2, 5][i] }));
    [so, sk].forEach((f, i) => {
      const t0 = K.ok2 - 0.15 + i * 0.08, alive = t > t0;
      set(f.d, { s: pop(t, t0, 0.4), y: alive ? -Math.abs(Math.sin(t * 9 + i * 1.5)) * 30 : 0, r: alive ? Math.sin(t * 9 + i) * 8 : 0, o: alive ? 1 : 0 });
      sortFace(f, t, { open: 0.5, look: [0, 0], aL: 100 + Math.sin(t * 14 + i) * 30, aR: 100 + Math.cos(t * 14 + i) * 30, bL: 10, bR: 10, seed: i });
    });
    SP.forEach((s, i) => { const a = t * 3 + i * 2.1; set(s, { x: Math.cos(a) * 60, y: Math.sin(a) * 30, r: t * 160, o: t > K.ok2 ? 1 : 0 }); });
    // emú: asoma por detrás de la lápida de O.W. y mira a cámara
    const ke = p(t, T_EMU, 0.22, E.outBack), kd = p(t, T_EMU + 0.75, 0.2, E.inCubic);
    set(emu.d, { y: (1 - ke) * 340 + kd * 340, r: -6 });
    face(emu, t, { look: [0, 0], half: false, blink: false, bL: 16, bR: 22, jaw: 0 });
    emuW.style.visibility = ke > 0.001 && kd < 0.999 ? 'visible' : 'hidden';
  }, { clip: true });
  sceneBg(c, { background: '#D8D6C4', backgroundImage: 'linear-gradient(180deg, #B9BFC4 0%, #D8D6C4 55%)' });
  const moon = box(c, 760, 360, 170, 170, { zIndex: 1, borderRadius: '50%', background: '#FBF6EA', border: `5px solid ${INK}`, boxShadow: `0 0 0 18px rgba(255,255,255,.25)` });
  void moon;
  box(c, 0, 1000, 1080, 400, { zIndex: 2, background: '#8FA868', borderTop: `6px solid ${INK}` });
  const emuW = box(c, 250, 330, 300, 340, { overflow: 'hidden', zIndex: 3 });
  const emu = mkEmuF(emuW, [40, 40, 240, 360]);
  const TB = [mk(c, [100, 520, 340, 392], tombInner('O.W.', { fs: 92 }), '0 0 260 300', 'tomb'), mk(c, [470, 640, 220, 254], tombInner('···', { fs: 60 }), '0 0 260 300', 'tomb'), mk(c, [720, 660, 200, 231], tombInner('···', { fs: 60 }), '0 0 260 300', 'tomb')];
  TB.forEach(f => (f.d.style.zIndex = 5));
  const so = mkSort(c, [440, 860, 220, 345], 'O'), sk = mkSort(c, [690, 860, 220, 345], 'K');
  so.d.style.zIndex = 8; sk.d.style.zIndex = 8;
  const SP = [0, 1, 2].map(i => el('div', c, { left: px(560 + i * 120), top: px(820), fontSize: '58px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 9 }, '✦'));
}

/* ======================================================================
   J · «POR LA CAMPAÑA DE VAN BUREN» — mitin con banderines
   ====================================================================== */
headline(S.J[0], S.J[1], 'La campaña de *Van Buren*', { size: 88, hlT: K.van });
{
  const c = scene(S.J[0], S.J[1], t => {
    popA(rib, t, K.campana - 0.1, { r: -2 });
    set(vb.d, { s: pop(t, S.J[0] + 0.05, 0.5), y: wobble(t, 0.5, 3), o: t < S.J[0] + 0.05 ? 0 : 1 });
    face(vb, t, { look: t > K.buren ? [0, 0] : [4, -2], brow: t > K.buren && t < K.buren + 0.6 ? -10 : 0, seed: 0.8 });
    popA(nm, t, K.buren, { r: -3 });
    set(bunt, { y: Math.sin(t * 3) * 4 });
    CF.forEach(q => { const k = clamp((t - S.J[0] - q.d) / 2.0); set(q.e, { x: q.x + Math.sin(t * 3 + q.d * 9) * 30, y: lerp(-80, 1300, k), r: t * q.rs, o: t > S.J[0] + q.d ? 1 : 0 }); });
    set(r0, { r: t * 6 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.10) 0 46px, transparent 46px 92px)' });
  const r0 = rays(c, -170, 290, 1420, 24, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 0);
  const bunt = box(c, 0, 0, 1080, 300, { zIndex: 3 }); bunt.innerHTML = `<svg width="1080" height="600" style="overflow:visible;position:absolute;top:0;left:0">${buntingSvg(1080, 440, 6)}</svg>`;
  const vb = mk(c, [370, 640, 470, 601], vbInner(), '0 0 360 460', 'bust'); vb.d.style.zIndex = 4;
  const rib = el('div', c, { left: '160px', top: '540px', width: '760px', textAlign: 'center', background: RED, color: '#fff', fontFamily: 'Rye', fontSize: '50px', padding: '8px 0 12px', border: `5px solid ${INK}`, boxShadow: `7px 8px 0 ${SH}`, zIndex: 6, whiteSpace: 'nowrap' }, 'CAMPAÑA PRESIDENCIAL');
  const nm = chip(c, 520, 1150, 'Martin Van Buren', { size: 50, bg: INK, color: YEL, z: 8 });
  const CF = []; const r = rng(55);
  for (let i = 0; i < 16; i++) CF.push({ e: box(c, 0, 0, 24, 14, { background: [RED, YEL, '#fff', PINK][i % 4], border: `2px solid ${INK}`, zIndex: 7 }), x: 60 + r() * 900, d: r() * 0.8, rs: 200 + r() * 300 });
}

/* ======================================================================
   KB · «LE APODABAN OLD KINDERHOOK» — la chapa electoral gira
   ====================================================================== */
headline(S.KB[0], S.KB[1], 'Le apodaban *Old Kinderhook*', { size: 80, hlT: K.old });
{
  const TF = K.old - 0.12;
  const c = scene(S.KB[0], S.KB[1], t => {
    const kf = p(t, TF, 0.4, E.inOutCubic), sx = Math.cos(kf * Math.PI);
    set(bdg, { s: pop(t, S.KB[0] + 0.02, 0.45), r: -4 + wobble(t, 0.5, 2), y: wobble(t, 0.6, 5) });
    flip.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
    fA.style.display = sx > 0 ? '' : 'none'; fB.style.display = sx > 0 ? 'none' : '';
    paint(hO, t, K.old + 0.15, 0.25); paint(hK, t, K.kinder + 0.1, 0.25);
    popA(ap, t, K.apodaban, { r: 5 });
    set(sh2, { o: t > TF && t < TF + 0.4 ? 1 : 0, r: t * 200 });
  });
  sceneBg(c, { background: '#E9DFC6' });
  box(c, 0, 0, 1080, 1920, { zIndex: 0 }).innerHTML = villageSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'rgba(233,223,198,.55)' });
  const bdg = box(c, 290, 390, 500, 640, { zIndex: 10 });
  const flip = box(bdg, 0, 0, 500, 640, { transformOrigin: '250px 250px' });
  flip.innerHTML = svgW(badgeInner(), '0 0 500 640');
  const fA = el('div', flip, { left: '0', top: '140px', width: '500px', textAlign: 'center', fontFamily: 'Rye', fontSize: '170px', lineHeight: '200px', color: INK, zIndex: 3 }, 'O.K.');
  const fB = el('div', flip, { left: '0', top: '120px', width: '500px', textAlign: 'center', fontFamily: 'Rye', color: INK, zIndex: 3, lineHeight: 1 });
  fB.innerHTML = `<div style="font-size:120px">${hlSpan('O', 'hO')}LD</div><div style="font-size:52px;margin-top:18px">${hlSpan('K', 'hK')}INDERHOOK</div><div style="font-size:40px;margin-top:22px;color:${RED}">★ ★ ★</div>`;
  const hO = fB.querySelector('.hO'), hK = fB.querySelector('.hK');
  const ap = chip(c, 560, 1080, 'su apodo', { size: 52, bg: PINK, z: 20 });
  const sh2 = el('div', c, { left: '450px', top: '330px', fontSize: '90px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦');
}

/* ======================================================================
   L · GOLPE AMARILLO: «O.K., OTRA VEZ»
   ====================================================================== */
colorHit(S.L[0], S.L[1], YEL, c => {
  const big = el('div', c, { left: 0, top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '360px', lineHeight: '380px', color: '#fff', textShadow: `14px 14px 0 ${INK}, -6px -6px 0 ${INK}, 6px -6px 0 ${INK}, -6px 6px 0 ${INK}`, zIndex: 10 }, 'O.K.');
  const ov = el('div', c, { left: 0, top: '820px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '130px', color: INK, zIndex: 10 }, 'otra vez');
  const so = mkSort(c, [60, 1040, 200, 313], 'O'), sk = mkSort(c, [760, 1030, 200, 313], 'K');
  [so, sk].forEach(f => (f.d.style.zIndex = 8));
  return t => {
    const kb = p(t, K.ok3 - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.ok3 - 0.02 ? 0 : lerp(1.7, 1, kb), r: -3, o: t < K.ok3 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.ok3, 0.3) ? glitch(t, K.ok3, 0.3) + ', ' : '') + `14px 14px 0 ${INK}, -6px -6px 0 ${INK}, 6px -6px 0 ${INK}, -6px 6px 0 ${INK}`;
    popA(ov, t, K.otra, { rise: 40, r: -2 });
    [so, sk].forEach((f, i) => { set(f.d, { y: -Math.abs(Math.sin(t * 7 + i)) * 40, r: Math.sin(t * 6 + i) * 8 }); sortFace(f, t, { aL: 120 + Math.sin(t * 12) * 25, aR: 120 + Math.cos(t * 12) * 25, open: 0.6, closed: true, bL: 8, bR: 8 }); });
  };
});

/* ======================================================================
   M · «HOY CONTESTARÍAS "A, C"» — el chat con mamá
   ====================================================================== */
headline(S.M[0], K.hoy - 0.05, 'Si lo hubieran escrito *bien*…', { size: 84, hlT: K.bien4 });
headline(K.hoy - 0.05, S.M[1], 'hoy contestarías *«A.C.»*', { size: 80, hlT: K.A4 });
{
  const c = scene(S.M[0], S.M[1], t => {
    set(Mp.ph, { y: (1 - p(t, S.M[0], 0.4, E.outBack)) * 1000 + wobble(t, 0.6, 3), r: -2 });
    popA(m1, t, S.M[0] + 0.25, { rise: 30 });
    // primero escribe «ok»… lo borra… y manda «A.C.»
    const typing = t > K.bien4 - 0.2 && t < K.A4;
    set(m2, { s: pop(t, K.bien4 - 0.2, 0.25), o: typing ? 1 : 0 });
    m2st.style.transform = `scaleX(${f1(p(t, K.hoy + 0.05, 0.15) * 100) / 100}) rotate(-6deg)`;
    const ka = p(t, K.A4 - 0.02, 0.25, E.outBack);
    set(m3, { s: t < K.A4 - 0.02 ? 0 : lerp(1.6, 1, ka), o: t < K.A4 - 0.02 ? 0 : 1, r: -2 });
    m3.style.textShadow = glitch(t, K.C4, 0.25);
    popA(tk, t, K.C4 + 0.05, { r: 0 });
    popA(m4, t, K.C4 + 0.15, { rise: 30 });
    set(mom, { y: t > K.C4 + 0.15 ? Math.sin(t * 30) * 3 : 0 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const Mp = modernPhone(c, 400, 400, 480, 880, { z: 5 });
  const mom = box(Mp.hd, 22, 16, 72, 72, { borderRadius: '50%', overflow: 'hidden', border: `3px solid #fff` }, genAvatar('#E9C0CF', '#a87d8f'));
  el('div', Mp.hd, { left: '110px', top: '28px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: '#fff', whiteSpace: 'nowrap' }, 'Mamá ❤');
  const m1 = msgB(Mp.scr, false, 40, '¿Has llegado bien?', { size: 40 });
  const m2 = msgB(Mp.scr, true, 160, `<span style="position:relative;display:inline-block">ok<span class="st" style="position:absolute;left:-8px;top:46%;width:140%;height:9px;background:${RED};border-radius:5px;transform-origin:left center;transform:scaleX(0)"></span></span><span style="opacity:.5">|</span>`, { size: 50 });
  const m2st = m2.querySelector('.st');
  const m3 = msgB(Mp.scr, true, 160, 'A.C.', { size: 110, pad: '4px 34px 10px', bg: YEL });
  const tk = el('div', Mp.scr, { right: '28px', left: 'auto', top: '318px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: '#3f7ad0', zIndex: 4 }, '✔✔');
  const m4 = msgB(Mp.scr, false, 380, '¿¿Antes de Cristo??', { size: 38 });
}

/* ======================================================================
   N · CTA: «¿QUÉ PALABRA TE HUELE RARA A TI? OS LEO.»
   ====================================================================== */
{
  const CM = [];
  const c = scene(S.N[0], S.N[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(rHL, t, K.rara, 0.3);
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(nose, { s: pop(t, K.huele - 0.05, 0.35), r: -8 + Math.sin(t * 10) * 4, o: t < K.huele - 0.05 ? 0 : 1 });
    SN.forEach((s, i) => { const ph = ((t - K.huele) * 1.4 + i / 3) % 1; set(s, { x: -ph * 60, y: -ph * 40, o: t > K.huele ? Math.sin(ph * Math.PI) : 0 }); });
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const l1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '370px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = []; const iq = find('que palabra te huele rara a ti');
  [['¿Qué', l1], ['palabra', l1], ['te', l2], ['huele', l2], ['rara', l2], ['a', l2], ['ti?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 4) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('rara', 'rhl', PINK); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[iq + k].s }); });
  const rHL = c.querySelector('.rhl');
  [['FAR', '@lucia.mz', '¿Y «guay»? 🤔', K.huele], ['SOL', '@nico_rr', '«Chévere» me huele raro', K.rara + 0.1], ['MEREDITH', '@marta.vla', '¿«Vale»? 👀', K.ti + 0.05]].forEach((m, i) => {
    const e = box(c, [400, 360, 420][i], [600, 740, 880][i], 540, 116, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 30 });
    avatar(e, 12, 12, 86, m[0], { bw: 3 });
    el('div', e, { left: '112px', top: '10px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '112px', top: '42px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
  const nose = box(c, 90, 560, 230, 230, { zIndex: 25 });
  nose.innerHTML = `<svg viewBox="0 0 200 200" width="230" height="230" style="overflow:visible">${cut('<path d="M110,10 C100,60 70,100 40,130 C20,150 40,180 70,176 C90,190 120,190 140,172 C170,176 182,150 160,134 C140,110 130,60 130,10 Z"/>', 6, 8)}<path d="M110,10 C100,60 70,100 40,130 C20,150 40,180 70,176 C90,190 120,190 140,172 C170,176 182,150 160,134 C140,110 130,60 130,10 Z" fill="#F2C9A8" stroke="${INK}" stroke-width="5"/><path d="M120,40 C112,80 96,110 70,140" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/><ellipse cx="80" cy="160" rx="14" ry="9" fill="${INK}"/><ellipse cx="130" cy="160" rx="14" ry="9" fill="${INK}"/><path d="M60,120 q-10,20 4,36" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/></svg>`;
  const SN = [0, 1, 2].map(i => el('div', c, { left: px(90 - i * 10), top: px(560 + i * 50), fontFamily: 'Playfair', fontWeight: 900, fontSize: '60px', color: INK, zIndex: 24 }, '~'));
  const ol = chip(c, 560, 1040, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 760, 1110, 150, 150, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="150" height="150" style="overflow:visible">${gloveHand(0, 0, 90, 1.15)}</svg>`;
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN (última frase) — copiado del Ep. 20
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto ? 6 : 0, bR: fanFast ? 8 : t > K.esto ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
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
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (O y K encima)
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    [so, sk].forEach((f, i) => { f.d.style.display = sx > 0.25 ? '' : 'none'; set(f.d, { y: wobble(t, 1, 3, i), r: [-4, 4][i] }); sortFace(f, t, { look: [0, 2], open: t > TC - 0.3 ? 0.6 : 0, bL: 12, bR: 12, aL: 30, aR: 30, seed: i }); });
    set(bookW, { s: 1.25 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">PALABRAS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de todos los días</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const so = mkSort(bookW, [590, 400, 160, 251], 'O'), sk = mkSort(bookW, [760, 400, 160, 251], 'K');
  so.d.style.zIndex = 2; sk.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 23 · ¿Bien escrito sería A.C.?</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
