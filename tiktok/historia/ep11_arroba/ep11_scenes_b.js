/* Ep. 11 · escenas L5c–L12 + tarjeta final */

/* ======================================================================
   J · EL DOCUMENTO: ARROBAS DE TRIGO (B.I1 → B.J1)  L5c
   ====================================================================== */
headline(B.I1, B.J1, '*Arrobas de trigo*', { size: 116, hlT: K.arrobasT, y: 210 });
{
  const RW = [];
  const c = scene(B.I1, B.J1, t => {
    set(doc.wrap, { y: (1 - p(t, B.I1, 0.3, E.outBack)) * 500, r: -1.5 });
    RW.forEach((q, i) => { const t0 = K.arrobasT - 0.05 + i * 0.1; popA(q.at, t, t0, { r: -8, s: 1 }); set(q.wh, { o: t > t0 - 0.05 ? 1 : 0.15 }); });
    set(lens, { s: pop(t, K.trigo5, 0.35), x: Math.sin(t * 3) * 20, r: -8, o: t < K.trigo5 ? 0 : 1 });
    popA(seal, t, B.I1 + 0.15, { r: 10 });
  });
  sceneBg(c, { background: '#D9C7A6', backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.05) 0 3px, transparent 3px 30px)' });
  const doc = paperPiece(c, 230, 400, 740, 720, { seed: 23, bg: '#F2E3C0' });
  el('div', doc.inner, { left: 0, top: '22px', width: '722px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '42px', color: INK }, 'Aragón · 1448');
  box(doc.inner, 40, 80, 642, 4, { background: INK });
  for (let i = 0; i < 5; i++) {
    const y = 110 + i * 112;
    const wh = box(doc.inner, 34, y - 10, 70, 110); wh.innerHTML = `<svg viewBox="0 0 60 260" width="44" height="110" style="overflow:visible"><use href="#wheat" width="60" height="260"/></svg>`;
    const ln = box(doc.inner, 110, y + 20, 360, 60); ln.innerHTML = `<svg width="360" height="60"><path d="M0,30 q40,-18 80,0 t80,0 t80,0 t80,0" stroke="${INK}" stroke-width="5" fill="none" opacity=".55"/></svg>`;
    const at = el('div', doc.inner, { left: '520px', top: px(y - 6), fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: '#7a2a14', zIndex: 3 }, '@');
    RW.push({ at, wh });
  }
  const seal = box(c, 800, 1000, 150, 150, { borderRadius: '50%', background: RED, border: `6px solid ${INK}`, boxShadow: `6px 6px 0 ${SH}`, zIndex: 10, fontFamily: 'Rye', fontSize: '60px', lineHeight: '138px', textAlign: 'center', color: '#fff' }, '✠');
  const lens = box(c, 640, 380, 300, 300, { zIndex: 15 });
  lens.innerHTML = `<svg width="300" height="400" style="overflow:visible;position:absolute;left:0;top:0"><path d="M246,246 L330,350" stroke="${INK}" stroke-width="36" stroke-linecap="round"/><path d="M246,246 L330,350" stroke="${WOOD}" stroke-width="24" stroke-linecap="round"/><circle cx="150" cy="150" r="146" fill="${INK}"/><circle cx="150" cy="150" r="138" fill="${BRASS}"/><circle cx="150" cy="150" r="124" fill="#F7EDD2" stroke="${INK}" stroke-width="4"/><text x="150" y="196" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="170" fill="#7a2a14">@</text><ellipse cx="100" cy="90" rx="44" ry="20" fill="#fff" opacity=".55" transform="rotate(-30 100 90)"/></svg>`;
}

/* ======================================================================
   M · SOBREVIVIÓ EN EL COMERCIO (B.L1 → B.M1)  L7a — la @ con cara
   ====================================================================== */
headline(B.L1, K.comercio - 0.2, 'El símbolo *sobrevivió*', { size: 96, hlT: K.sobrevivio });
headline(K.comercio - 0.2, B.M1, '…en el *comercio*', { size: 112, hlT: K.comercio });
{
  const PG = ['SIGLO XVI', 'SIGLO XVII', 'SIGLO XVIII', 'SIGLO XIX'];
  const c = scene(B.L1, B.M1, t => {
    const windy = t < K.sobrevivio;
    PGS.forEach((g, i) => { const t0 = B.L1 + 0.05 + i * 0.16; const k = clamp((t - t0) / 0.8); set(g, { x: lerp(900, -1100, k), y: Math.sin(k * 6 + i) * 60 - k * 120, r: k * 400 * (i % 2 ? 1 : -1), o: t > t0 && k < 1 ? 1 : 0 }); });
    const flex = t > K.sobrevivio;
    sortFace(at, t, { look: windy ? [-6, 0] : [0, -2], closed: flex && t < K.sobrevivio + 0.5, open: windy ? 0.4 : flex && t < K.sobrevivio + 0.5 ? 0.3 : 0, aL: windy ? 150 + Math.sin(t * 30) * 10 : flex ? 120 + Math.sin(t * 8) * 10 : 20, aR: windy ? 40 : flex ? 120 + Math.cos(t * 8) * 10 : 20, bL: 8, bR: 8, seed: 0.6 });
    set(at.d, { x: windy ? Math.sin(t * 40) * 6 : 0, r: windy ? -8 + Math.sin(t * 30) * 3 : wobble(t, 0.6, 2), y: flex ? -Math.abs(Math.sin((t - K.sobrevivio) * 9)) * 30 * (1 - p(t, K.sobrevivio + 0.6, 0.3)) : 0 });
    stars.forEach((s, i) => { const a = t * 3 + i * 2.1; set(s, { x: Math.cos(a) * 240, y: Math.sin(a) * 60, r: t * 200, o: flex ? 1 : 0 }); });
    popA(chV, t, K.sobrevivio + 0.1, { r: -6 });
    WR.forEach((w, i) => set(w, { o: windy ? 0.8 : 0, x: -((t * 1400 + i * 250) % 900) }));
    GD.forEach((g, i) => set(g.d, { y: (1 - p(t, K.comercio + i * 0.1, 0.4, E.outBack)) * 600, o: t < K.comercio + i * 0.1 ? 0 : 1 }));
    set(awn, { y: (1 - p(t, K.comercio - 0.1, 0.4, E.outBounce)) * -500 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const awn = box(c, 0, 380, 1080, 160, { zIndex: 2 });
  { let s = ''; for (let i = 0; i < 9; i++) s += `<path d="M${i * 120},0 H${i * 120 + 120} V110 Q${i * 120 + 60},160 ${i * 120},110 Z" fill="${i % 2 ? '#fff' : RED}" stroke="${INK}" stroke-width="5"/>`; awn.innerHTML = `<svg width="1080" height="170" style="overflow:visible">${s}</svg>`; }
  const PGS = PG.map(s => el('div', c, { left: '120px', top: '560px', width: '260px', height: '300px', background: '#FBF6EA', border: `5px solid ${INK}`, boxShadow: `7px 8px 0 ${SH}`, fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', paddingTop: '120px', color: INK, zIndex: 12, backgroundImage: `linear-gradient(${RED} 0 60px, transparent 60px)` }, s));
  const WR = [0, 1, 2, 3, 4].map(i => box(c, 300 + i * 120, 600 + i * 90, 260, 7, { background: INK, borderRadius: '4px', opacity: 0.6, zIndex: 11 }));
  const at = mkSort(c, [370, 560, 340, 533], '@', { fs: 190 }); at.d.style.zIndex = 8;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', c, { left: '510px', top: '520px', fontSize: '60px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 9 }, '✦'));
  const chV = stamp(c, 600, 640, '¡VIVA!', { size: 72, bw: 10, z: 20, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const GD = [mkSack(c, [330, 960, 200, 233], '@'), mkSack(c, [740, 950, 200, 233], '@', { col: '#E2C08A' }), mk(c, [560, 1010, 180, 207], barrelInner(), '0 0 260 300', 'br')];
  GD.forEach(g => g.d.style.zIndex = 10);
}

/* ======================================================================
   N · AL TECLADO DE LA MÁQUINA DE ESCRIBIR (B.M1 → B.N1)  L7b
   ====================================================================== */
headline(B.M1, K.maquinas - 0.3, 'Llegó al *teclado*', { size: 104, hlT: K.teclado });
headline(K.maquinas - 0.3, B.N1, 'de las *máquinas de escribir*', { size: 88, hlT: K.maquinas });
{
  const [kx0, ky0] = twKeyPos(0, 4); const KX = 110 + kx0, KY = 520 + ky0;
  const c = scene(B.M1, B.N1, t => {
    const zk = p(t, K.teclado, 0.5, E.inOutCubic) * (1 - p(t, K.escribir - 0.35, 0.3, E.inOutCubic));
    set(cam, { s: 1 + 0.35 * zk });
    // la @ salta a su tecla
    const kj = clamp((t - K.llego) / 0.55);
    const jx = lerp(200, KX, kj), jy = lerp(700, KY - 100, kj) - Math.sin(kj * Math.PI) * 260;
    set(jump.d, { x: jx - 120, y: jy - 188, s: lerp(1, 0.32, E.inCubic(kj)), r: kj * 360, o: t < B.M1 + 0.05 || kj >= 1 ? 0 : 1 });
    sortFace(jump, t, { open: 0.6, closed: false, aL: 120, aR: 120, look: [4, 4], seed: 2 });
    const press = t > K.escribir && t < K.escribir + 0.18;
    set(key, { s: t < K.llego + 0.5 ? 0 : (press ? 0.86 : pop(t, K.llego + 0.5, 0.35)), y: press ? 10 : 0, o: t < K.llego + 0.5 ? 0 : 1 });
    key.style.background = t > K.teclado ? YEL : '#F4ECDA';
    key.style.boxShadow = t > K.teclado ? `0 0 0 10px rgba(255,62,165,.5), 0 6px 0 ${INK}` : `0 6px 0 ${INK}`;
    const kb = t > K.escribir ? (t < K.escribir + 0.12 ? p(t, K.escribir, 0.12) : 1 - p(t, K.escribir + 0.12, 0.2)) : 0;
    set(bar, { o: kb > 0.02 ? 1 : 0 }); bar.style.transform = `rotate(${f1(lerp(70, 0, kb))}deg)`;
    set(printed, { s: t < K.escribir + 0.1 ? 0 : lerp(1.8, 1, p(t, K.escribir + 0.1, 0.15)), o: t < K.escribir + 0.1 ? 0 : 1 });
    set(tw.d, { x: t > K.escribir && t < K.escribir + 0.3 ? Math.sin(t * 80) * 4 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#E0CFAE' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: `${KX}px ${KY - 150}px` });
  halftone(cam, 'rgba(43,33,24,.07)', 0);
  const tw = mk(cam, [110, 520, 860, 600], typewriterInner(), '0 0 860 600', 'tw'); tw.d.style.zIndex = 3;
  const key = el('div', cam, { left: px(KX - 30), top: px(KY - 33), width: '60px', height: '60px', borderRadius: '50%', border: `5px solid ${INK}`, background: '#F4ECDA', fontFamily: 'Playfair', fontWeight: 900, fontSize: '42px', lineHeight: '48px', textAlign: 'center', color: INK, zIndex: 6 }, '@');
  const bar = box(cam, KX - 3, 560, 8, KY - 560, { background: INK, zIndex: 2, transformOrigin: 'bottom center' });
  const printed = el('div', cam, { left: '440px', top: '520px', width: '200px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '150px', lineHeight: 1, color: INK, zIndex: 5 }, '@');
  const jump = mkSort(cam, [0, 0, 240, 376], '@', { fs: 190 }); jump.d.style.zIndex = 9;
}

/* ======================================================================
   O · 1971 · RAY TOMLINSON Y EL PRIMER CORREO (B.N1 → B.O1)  L8a
   ====================================================================== */
headline(K.ray - 0.05, K.mando - 0.1, '*Ray Tomlinson*', { size: 116, hlT: K.ray, y: 200 });
headline(K.mando - 0.1, B.O1, 'Mandó el *primer correo electrónico*', { size: 80, hlT: K.primer });
{
  const c = scene(B.N1, B.O1, t => {
    setYear(yr, t, K.mil3, K.unoE - K.mil3, 1536, 1971);
    const up = p(t, K.ray - 0.3, 0.3, E.inOutCubic);
    set(yr, { s: yearPop(t, K.mil3) * lerp(1, 0.42, up) * (1 + (t > K.unoE && t < K.unoE + 0.4 ? 0.14 * (1 - p(t, K.unoE, 0.3)) : 0)), x: up * -330, y: up * 230, o: t < K.mil3 ? 0 : 1 });
    yr.style.color = t > K.unoE ? YEL : '#fff';
    REELS.forEach((r, i) => r.setAttribute('transform', `rotate(${f1(t * (i % 2 ? 160 : -220))} ${r.dataset.cx} ${r.dataset.cy})`));
    LAMPS.forEach((l, i) => l.setAttribute('fill', ((Math.floor(t * 6) * 7 + i * 13) % 5) < 2 ? (i % 3 ? YEL : RED) : '#8a8070'));
    set(eng.d, { s: pop(t, K.ray - 0.1, 0.45), y: wobble(t, 0.6, 3), o: t < K.ray - 0.1 ? 0 : 1 });
    face(eng, t, { look: t > K.mando ? [-6, -4] : [-2, 2], brow: t > K.primer ? -8 : 0, seed: 0.9 });
    const ke = clamp((t - K.mando) / 0.9);
    set(env, { x: lerp(0, 420, E.inOutCubic(ke)), y: lerp(0, -260, ke) - Math.sin(ke * Math.PI) * 120, r: lerp(-10, 14, ke) + Math.sin(t * 12) * 4, s: t < K.mando ? 0 : lerp(0.6, 1.1, ke), o: t < K.mando ? 0 : 1 });
    TR.forEach((d, i) => { const kk = clamp(ke - 0.06 * (i + 1)); set(d, { x: lerp(0, 420, E.inOutCubic(kk)) + 80, y: lerp(0, -260, kk) - Math.sin(kk * Math.PI) * 120 + 60, o: t > K.mando + 0.1 && ke < 1 ? 0.6 - i * 0.15 : 0 }); });
    popA(ch1, t, K.primer + 0.05, { r: -4 });
    // cameo del emú: asoma tras el último armario y mira a cámara ~0,6 s
    const EMU = K.ray + 0.75; const kE = t < EMU ? 0 : t < EMU + 0.6 ? p(t, EMU, 0.12, E.outBack) : 1 - p(t, EMU + 0.6, 0.12, E.inCubic);
    set(emu.d, { y: -kE * 250, r: -kE * 6, o: kE > 0.01 ? 1 : 0 });
    face(emu, t, { look: [0, 0], bL: 18, bR: 26, blink: false, half: false });
  });
  sceneBg(c, { background: '#C9C2B0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 60px)' });
  const emu = mkEmuF(c, [420, 600, 260, 390]); emu.d.style.zIndex = 1;
  const room = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); room.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${computerSvg(90, 560)}<rect x="0" y="1200" width="1080" height="300" fill="#9a907c" stroke="${INK}" stroke-width="5"/></svg>`;
  const REELS = [...room.querySelectorAll('.reel')], LAMPS = [...room.querySelectorAll('.lamp')];
  const eng = mk(c, [520, 720, 430, 549], engineerInner(), '0 0 360 460', 'bust'); eng.d.style.zIndex = 4;
  const env = box(c, 240, 760, 210, 140, { zIndex: 8 }); env.innerHTML = svgW(envInner(), '0 0 300 200');
  const TR = [0, 1, 2].map(i => box(c, 240, 760, 60, 12, { background: '#fff', border: `3px solid ${INK}`, borderRadius: '6px', zIndex: 7 }));
  const yr = bigYear(c, 380, 1536);
  const ch1 = chip(c, 560, 1170, '1.er correo electrónico', { size: 44, bg: INK, color: YEL, z: 20 });
}

/* ======================================================================
   P · UN SÍMBOLO QUE NADIE USARA EN LOS NOMBRES (B.O1 → B.P1)  L8b
   ====================================================================== */
headline(B.O1, K.nadie - 0.15, 'Necesitaba *un símbolo*', { size: 100, hlT: K.unSimb });
headline(K.nadie - 0.15, B.P1, 'que nadie usara en los *nombres*', { size: 84, hlT: K.nombres });
{
  const NM = ['ana', 'luis', 'marta', 'pedro'];
  const c = scene(B.O1, B.P1, t => {
    set(scr.d, { s: lerp(0.8, 1, p(t, B.O1, 0.4, E.outBack)) });
    const bl = Math.floor(t * 4) % 2 === 0;
    slot.style.opacity = bl ? 1 : 0.35; set(slot, { s: 1 + 0.1 * Math.sin(t * 8) });
    QM.forEach((q, i) => { const t0 = K.unSimb + i * 0.15; set(q, { s: pop(t, t0, 0.35), y: Math.sin(t * 5 + i) * 12, r: [-14, 10, -4][i], o: t < t0 ? 0 : 1 - p(t, K.nadie, 0.2) }); });
    set(card.wrap, { y: (1 - p(t, K.nadie - 0.1, 0.35, E.outBack)) * 700, r: 2, o: t < K.nadie - 0.1 ? 0 : 1 });
    ROWS.forEach((r, i) => { const t0 = K.nadie + 0.05 + i * 0.12; set(r, { o: t > t0 ? 1 : 0, x: (1 - p(t, t0, 0.25, E.outBack)) * 40 }); });
    CKS.forEach((k, i) => popA(k, t, K.nombres + i * 0.12, { r: -6 }));
    stampA(nad, t, K.nombres + 0.6, -6);
  });
  sceneBg(c, { background: '#C9C2B0' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const scr = mk(c, [180, 400, 720, 560], crtInner(), '0 0 720 560', 'crt'); scr.d.style.zIndex = 3;
  const tx = el('div', scr.d, { left: '70px', top: '170px', width: '580px', textAlign: 'center', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '50px', color: '#9CFF9C', whiteSpace: 'nowrap', textShadow: '0 0 12px rgba(120,255,120,.6)', zIndex: 4 }, 'nombre <span class="sl" style="display:inline-block;border:5px solid #FFE600;border-radius:10px;padding:0 10px;color:#FFE600">?</span> ordenador');
  const slot = tx.querySelector('.sl');
  const QM = [[110, 470], [860, 520], [820, 330]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 10 }, '?'));
  const card = paperPiece(c, 330, 930, 600, 360, { seed: 19, bg: '#FBF6EA' }); card.wrap.style.zIndex = 6;
  el('div', card.inner, { left: '24px', top: '12px', fontFamily: 'Rye', fontSize: '38px', color: INK }, 'NOMBRES');
  const ROWS = [], CKS = [];
  NM.forEach((n, i) => {
    ROWS.push(el('div', card.inner, { left: '40px', top: px(68 + i * 66), fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '48px', color: INK }, n));
    const k = box(card.inner, 300, 62 + i * 66, 56, 56, { zIndex: 3 }); k.innerHTML = CHECK; CKS.push(k);
  });
  const nad = stamp(c, 560, 1040, 'NADIE', { size: 76, bw: 10, z: 20, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   Q · ELIGIÓ LA ARROBA (B.P1 → B.Q1)  L8c
   ====================================================================== */
headline(B.P1, B.Q1, 'Y eligió *la arroba*', { size: 108, hlT: K.arroba8 });
{
  const SY = ['#', '$', '@', '&', '%'], PICK = 2;
  const c = scene(B.P1, B.Q1, t => {
    KS.forEach((k, i) => { set(k, { s: pop(t, B.P1 + i * 0.05, 0.3) * (i === PICK && t > K.arroba8 ? 1.25 + 0.05 * Math.sin(t * 10) : 1), y: i === PICK && t > K.arroba8 ? -30 : 0, o: t < B.P1 + i * 0.05 ? 0 : (t > K.arroba8 && i !== PICK ? 0.45 : 1) }); k.style.background = i === PICK && t > K.arroba8 ? YEL : '#F4ECDA'; });
    // foco que busca
    const sx = t < K.eligio ? 125 + 75 + ((Math.sin((t - B.P1) * 5) + 1) / 2) * 4 * 165 : lerp(125 + 75 + ((Math.sin((K.eligio - B.P1) * 5) + 1) / 2) * 660, 125 + 75 + PICK * 165, p(t, K.eligio, 0.3, E.outBack));
    set(spot, { x: sx - 120, y: 5, o: 1 });
    set(scr.d, { y: (1 - p(t, K.arroba8 + 0.05, 0.35, E.outBack)) * 800, o: t < K.arroba8 + 0.05 ? 0 : 1 });
    set(atS, { s: t < K.arroba8 + 0.35 ? 0 : lerp(2.2, 1, p(t, K.arroba8 + 0.35, 0.2)), o: t < K.arroba8 + 0.35 ? 0 : 1 });
  });
  sceneBg(c, { background: '#D8CDB4' });
  halftone(c, 'rgba(43,33,24,.08)', 0);
  const spot = box(c, 0, 470, 240, 240, { borderRadius: '50%', border: `10px solid ${PINK}`, boxShadow: `0 0 0 6px ${INK}`, zIndex: 6 });
  const KS = SY.map((s, i) => el('div', c, { left: px(125 + i * 165), top: px(515), width: '150px', height: '150px', borderRadius: '50%', border: `7px solid ${INK}`, background: '#F4ECDA', boxShadow: `0 10px 0 ${INK}, 0 10px 0 7px #000`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '132px', textAlign: 'center', color: INK, zIndex: 5 }, s));
  const scr = mk(c, [210, 760, 660, 513], crtInner(), '0 0 720 560', 'crt'); scr.d.style.zIndex = 3;
  const tx = el('div', scr.d, { left: '50px', top: '160px', width: '560px', textAlign: 'center', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '50px', color: '#9CFF9C', whiteSpace: 'nowrap', textShadow: '0 0 12px rgba(120,255,120,.6)', zIndex: 4 }, 'nombre<span class="a" style="display:inline-block;color:#FFE600;font-size:76px">@</span>ordenador');
  const atS = tx.querySelector('.a');
}

/* ======================================================================
   R · ¡OJO! EL ORIGEN EXACTO SE DISCUTE (B.Q1 → B.R1)  L9a
   ====================================================================== */
headline(B.Q1, B.R1, 'El origen exacto *se discute*', { size: 86, hlT: K.discute });
{
  const c = scene(B.Q1, B.R1, t => {
    const kt = p(t, K.ojo + 0.55, 0.35, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.42, kt), x: kt * -370, y: kt * -170, r: -10, o: t < K.ojo ? 0 : 1 });
    set(tl, { o: t > K.origen - 0.1 ? 1 : 0, sx: p(t, K.origen - 0.1, 0.4, E.outCubic) });
    DOTS.forEach((d, i) => popA(d, t, K.origen + 0.1 + i * 0.12, { r: -3 + i * 3 }));
    set(qm, { s: pop(t, K.origen + 0.5, 0.4) * (1 + 0.08 * Math.sin(t * 7)), r: -8 + Math.sin(t * 3) * 6, o: t < K.origen + 0.5 ? 0 : 1 });
    const arg = t > K.discute - 0.1;
    [sA, sB].forEach((f, i) => { set(f.d, { s: pop(t, K.discute - 0.3 + i * 0.1, 0.4), y: arg ? -Math.abs(Math.sin(t * 12 + i * 1.5)) * 18 : 0, r: arg ? Math.sin(t * 14 + i) * 3 : 0, o: t < K.discute - 0.3 + i * 0.1 ? 0 : 1 }); face(f, t, { jaw: arg ? Math.abs(Math.sin(t * (13 + i * 3))) * 0.6 : 0, brow: arg ? -9 : 0, look: [i ? -7 : 7, 0], seed: i }); });
    BUB.forEach((b, i) => { const on = arg && Math.floor((t - K.discute) * 3.2 + i) % 2 === 0; set(b, { s: on ? 1 : 0, r: i ? 8 : -8, o: on ? 1 : 0 }); });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const tl = box(c, 120, 820, 840, 14, { background: INK, borderRadius: '7px', transformOrigin: 'right center', zIndex: 3 });
  const DOTS = [['1448', 470], ['1536', 640], ['1971', 820]].map(([s, x]) => el('div', c, { left: px(x - 85), top: '730px', width: '170px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '48px', color: YEL, background: INK, borderRadius: '40px', padding: '4px 0 6px', zIndex: 5 }, s));
  const qm = el('div', c, { left: '110px', top: '650px', width: '200px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: 1, color: PINK, textShadow: `7px 7px 0 ${INK}`, zIndex: 6 }, '?');
  const sA = mk(c, [330, 880, 300, 383], scholarInner(71, 0), '0 0 360 460', 'bust'), sB = mk(c, [640, 880, 300, 383], scholarInner(72, 1), '0 0 360 460', 'bust');
  [sA, sB].forEach(f => f.d.style.zIndex = 4);
  const BUB = [bubble(c, 340, 870, '¡Así!', { size: 60, z: 10 }), bubble(c, 700, 870, '¡No!', { size: 60, z: 10, rad: '44px 44px 10px 44px' })];
  const ojo = stamp(c, 150, 600, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   S · GOLPE DE COLOR AMARILLO: SIGLO XV, YA PESABA TRIGO (B.R1 → B.S1)  L9b
   ====================================================================== */
colorHit(B.R1, B.S1, YEL, c => {
  const l1 = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '100px', color: INK, zIndex: 5 }, 'Pero en España,');
  const l2 = el('div', c, { left: 0, top: '350px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '170px', lineHeight: 1, color: '#fff', textShadow: `8px 8px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 5 }, 'SIGLO XV');
  const at = el('div', c, { left: '200px', top: '540px', width: '460px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '440px', lineHeight: '470px', color: '#fff', textShadow: `14px 14px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 6 }, '@');
  const sk = mkSack(c, [640, 690, 300, 350]); sk.d.style.filter = SIL; sk.d.style.zIndex = 4;
  const ws = [[90, 560, -16], [150, 600, 6], [870, 560, 12]].map(([x, y, r]) => { const d = box(c, x, y, 70, 300, { zIndex: 3, filter: SIL }); d.innerHTML = `<svg viewBox="0 0 60 260" width="70" height="300" style="overflow:visible"><use href="#wheat" width="60" height="260"/></svg>`; d.style.transform = `rotate(${r}deg)`; return d; });
  const l3 = el('div', c, { left: 0, top: '1010px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '88px', color: INK, zIndex: 5 }, '…ya pesaba');
  const st = stamp(c, 230, 1115, 'TRIGO', { size: 150, bw: 16, z: 8, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  return t => {
    popA(l1, t, K.pero, { rise: 30 });
    const k2 = p(t, K.siglo, 0.2, E.outCubic); set(l2, { s: t < K.siglo ? 0 : lerp(1.7, 1, k2), r: -3, o: t < K.siglo ? 0 : 1 });
    const ka = p(t, K.arroba9, 0.22, E.outBack); set(at, { s: t < K.arroba9 ? 0 : lerp(1.8, 1, ka) + wobble(t, 0.6, 0.02), r: -5, o: t < K.arroba9 ? 0 : 1 });
    set(sk.d, { s: pop(t, K.arroba9 + 0.15, 0.4), r: 6 + wobble(t, 0.5, 2), o: t < K.arroba9 + 0.15 ? 0 : 1 });
    ws.forEach((w, i) => { const k = pop(t, K.siglo + i * 0.1, 0.4); w.style.opacity = t < K.siglo + i * 0.1 ? 0 : 1; w.style.transform = `rotate(${[-16, 6, 12][i] + wobble(t, 0.5, 4, i)}deg) scale(${f1(k * 100) / 100})`; });
    popA(l3, t, K.ya, { rise: 30 });
    const k0 = p(t, K.trigo9, 0.17, E.outCubic); set(st, { s: t < K.trigo9 ? 0 : lerp(2.2, 1, k0), r: -6, o: t < K.trigo9 ? 0 : 1 }); st.style.textShadow = glitch(t, K.trigo9, 0.25);
  };
});

/* ======================================================================
   T · TU CORREO (B.S1 → B.T1)  L10a — vuelta a la pantalla
   ====================================================================== */
headline(B.S1, B.T1, 'O sea: *tu correo*…', { size: 108, hlT: K.tu });
{
  const STR = 'tu.nombre@correo';
  const c = scene(B.S1, B.T1, t => {
    const n = clamp(Math.floor((t - K.osea) * 14), 0, STR.length);
    const s = STR.slice(0, n);
    txt.innerHTML = s.replace('@', `<span style="color:${YEL};font-size:80px">@</span>`) + (Math.floor(t * 4) % 2 ? '▌' : '&nbsp;');
    const kz = p(t, K.correo10 - 0.2, 0.5, E.inCubic);
    set(bat, { s: t < K.tu ? 0 : lerp(0.2, 1, p(t, K.tu, 0.4, E.outBack)) * (1 + kz * 2.5), o: t < K.tu ? 0 : 1, r: -6 + wobble(t, 0.6, 3) });
    set(scr.d, { s: 1 + 0.04 * p(t, B.S1, 1.8, E.linear) });
  }, { clip: true });
  sceneBg(c, { background: '#C9C2B0' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const scr = mk(c, [160, 420, 760, 591], crtInner(), '0 0 720 560', 'crt'); scr.d.style.zIndex = 3;
  const txt = el('div', scr.d, { left: '70px', top: '170px', width: '620px', textAlign: 'center', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '56px', color: '#9CFF9C', whiteSpace: 'nowrap', textShadow: '0 0 12px rgba(120,255,120,.6)', zIndex: 4 }, '');
  const bat = bigAt(c, 380, 620, 320, { z: 20, fill: YEL, hatch: 0.25 });
}

/* ======================================================================
   U · GOLPE DE COLOR ROSA + CTA: SACO DE 11 KG · ¿LO SABÍAS? SÍ O NO (B.T1 → B.U1)  L8b
   ====================================================================== */
colorHit(B.T1, B.U1, PINK, c => {
  const l1 = el('div', c, { left: 0, top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '88px', lineHeight: 1.05, color: INK, zIndex: 5 }, 'Tu correo<br>lleva dentro…');
  const q1 = el('div', c, { left: 0, top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', lineHeight: 1, color: '#fff', textShadow: `7px 7px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 9 }, '¿Lo sabías?');
  const grp = box(c, 0, 0, 1080, 1920, { zIndex: 6, transformOrigin: '540px 380px' });
  const at = el('div', grp, { left: '310px', top: '370px', width: '460px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '400px', lineHeight: '420px', color: '#fff', textShadow: `13px 13px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 6 }, '@');
  const sw = box(grp, 540, 700, 0, 0, { zIndex: 5 });
  box(sw, -5, 0, 10, 170, { background: INK, borderRadius: '5px' });
  const sk = mkSack(sw, [-150, 150, 300, 350], '11 kg', { fs: 50 });
  const big = el('div', grp, { left: 0, top: '1200px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '96px', lineHeight: 1, color: '#fff', textShadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 8, whiteSpace: 'nowrap' }, 'UN SACO DE 11 KG');
  const mkB = (x, txt, col) => el('div', c, { left: px(x), top: '980px', width: '400px', height: '250px', borderRadius: '60px', background: col, border: `9px solid ${INK}`, boxShadow: `0 16px 0 ${INK}, 12px 22px 0 ${SH}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: '230px', textAlign: 'center', color: INK, zIndex: 30 }, txt);
  const bS = mkB(90, 'SÍ', YEL), bN = mkB(570, 'NO', '#fff');
  const hand = box(c, 0, 1130, 200, 230, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-110 -60 220 260" width="200" height="230" style="overflow:visible">${gloveHand(0, 0, 0, 1.2)}</svg>`;
  return t => {
    const kq = p(t, K.lo - 0.1, 0.35, E.inOutCubic);
    popA(l1, t, K.lleva - 0.05, { rise: 30 }); if (t > K.lo - 0.1) l1.style.opacity = 1 - kq;
    const kq2 = p(t, K.lo, 0.25, E.outBack); set(q1, { s: t < K.lo ? 0 : lerp(1.6, 1, kq2), r: -3, o: t < K.lo ? 0 : 1 });
    set(grp, { s: lerp(1, 0.55, kq), y: kq * 40 });
    set(at, { s: 1 + 0.05 * Math.sin((t - K.lleva) * 6), r: -4, o: 1 });
    const kd = p(t, K.saco - 0.1, 0.5, E.outBounce);
    const swing = t < K.saco ? 0 : 16 * Math.exp(-(t - K.saco) * 1.2) * Math.sin((t - K.saco) * 5);
    set(sw, { y: lerp(-700, 0, kd), r: swing, o: t < K.saco - 0.12 ? 0 : 1 });
    const kb = p(t, K.once2, 0.2, E.outBack); set(big, { s: t < K.once2 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.once2 ? 0 : 1 - kq });
    big.style.textShadow = (glitch(t, K.kilos2, 0.3) ? glitch(t, K.kilos2, 0.3) + ', ' : '') + `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
    set(sk.d, { r: wobble(t, 0.8, 2) });
    const pS = t > K.si && t < K.si + 0.2, pN = t > K.no && t < K.no + 0.2;
    set(bS, { s: pop(t, K.sabias, 0.4) * (pS ? 0.88 : 1 + 0.03 * Math.sin(t * 6)), r: -3, o: t < K.sabias ? 0 : 1 });
    set(bN, { s: pop(t, K.sabias + 0.1, 0.4) * (pN ? 0.88 : 1 + 0.03 * Math.sin(t * 6 + 1)), r: 3, o: t < K.sabias + 0.1 ? 0 : 1 });
    const hx = t < K.no - 0.2 ? 300 : lerp(300, 740, p(t, K.no - 0.2, 0.2, E.inOutCubic));
    set(hand, { x: hx, y: (pS || pN ? 20 : 0) + wobble(t, 1, 6), o: t > K.si - 0.25 ? 1 : 0 });
  };
});

/* ======================================================================
   MARCA AL FINAL: EL VECINO EN SU BALCÓN (B.U1 → B.W1)  L9a
   ====================================================================== */
{
  const T0 = B.U1, T1 = B.W1;
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, T1 - 0.45, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > K.soy && t < K.soy + 0.6;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.vecino + 0.5 ? 6 : 0, bR: fanFast ? 8 : t > K.vecino + 0.5 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, T0 + 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, T0, 2)) + (1 - ks) * 8, o: 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
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
  const sl1 = el('div', sign, { left: '0', top: '90px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = []; const iS = F('soy tu vecino');
  [['Soy', 0], ['tu', 1], ['vecino', 2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = q[0] === 'vecino' ? `<i>${q[0]}…</i>` : q[0]; sl1.appendChild(s); sw.push({ e: s, t: W[iS + q[1]].s }); });
}

/* ======================================================================
   W · …Y ESTO NO VENÍA EN EL LIBRO (B.W1 → fin) — libro que se cierra y bucle al fotograma 1
   ====================================================================== */
headline(B.W1, LOOP0, 'Y esto no venía en el *libro.*', { size: 86, hlT: K.libro });
{
  const TC = K.libro - 0.28;
  const c = scene(B.W1, 999, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    sortFace(stand, t, { look: t > TC - 0.1 ? [6, -6] : [-3, 2], open: t > TC - 0.1 ? 0.6 : 0, bL: 12, bR: 12, aL: t > TC - 0.1 ? 90 : 10, aR: t > TC - 0.1 ? 90 : 10, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, B.W1 + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    epl.style.opacity = closed ? 1 : 0;
    lets.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1) * 150 * kf, y: -kf * 220 + kf * kf * 170, r: Math.sin(t * 4 + i) * 40, o: closed ? 1 : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">SÍMBOLOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de siempre</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const epl = el('div', bookW, { left: '130px', top: '1090px', width: '400px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: '#fff', background: INK, borderRadius: '30px', padding: '6px 0 8px', zIndex: 4 }, 'Ep. 11 · La @ es española');
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkSort(bookW, [640, 520, 220, 345], '@', { fs: 190 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const lets = ['@', '@', '@'].map(ch => el('div', bookW, { left: '510px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', color: INK, textShadow: `3px 3px 0 #fff`, zIndex: 3 }, ch));
}
