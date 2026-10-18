/* Ep. 39 · escenas L2 (marca) y L5–L10 (todo clavado por texto vía K) */

// sello centrado horizontalmente (no se corta nunca por los bordes)
function cstamp(pa, y, html, o = {}) {
  const w = el('div', pa, { left: '0', top: px(y), width: '1080px', textAlign: 'center', zIndex: o.z || 60 });
  w.innerHTML = `<span style="display:inline-block;border:${o.bw || 12}px solid ${o.col || RED};color:${o.col || RED};font-family:Rye;font-size:${o.size || 110}px;padding:4px 30px 10px;border-radius:16px;white-space:nowrap;line-height:1.05;letter-spacing:0.04em;background:${o.bg || 'rgba(255,255,255,.93)'}">${html}</span>`;
  return w;
}

/* ======================================================================
   BAL · MARCA (L2): EL VECINO EN SU BALCÓN — «Soy tu vecino, y esto no venía en el libro.»
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    set(cam, { s: 1.04 + 0.04 * p(t, T0, T1 - T0, E.linear) });
    const lean = p(t, K.esto2 - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.esto2 ? [-4, 3] : [0, 0], bL: t > K.esto2 ? 6 : 0, bR: t > K.esto2 ? 12 : 0, fan: Math.sin(t * 2 * Math.PI * 0.6) * 14, seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.libro2, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14)].map((_, k) => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
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
  const sl1 = el('div', sign, { left: '0', top: '64px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '80px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '160px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '62px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  ['Soy', 'tu', 'vecino,', 'y', 'esto', 'no', 'venía', 'en', 'el', 'libro.'].forEach((wd, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'libro.' ? hlSpan('libro.', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[K.isoy + k].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   PASO 2 · P2a «DOS: SI EL SOL SALE...» — el sol asoma por el lado del amanecer del reloj de sol
   ====================================================================== */
{
  const c = scene(S.P2a[0], S.P2a[1], t => {
    const ks = p(t, S.P2a[0] + 0.1, 1.3, E.outCubic);
    set(sun, { x: lerp(-40, 60, ks), y: lerp(380, 0, ks), r: t * 25 });
    sky.style.opacity = f1(0.15 + 0.85 * ks);
    dial.setH(0.05); for (let k = 1; k <= 12; k++) { dial.lit(k, false); dial.dim(k, k > 6); }
    set(rom.d, { s: pop(t, S.P2a[0] + 0.1, 0.4), y: wobble(t, 0.5, 3), o: t < S.P2a[0] + 0.1 ? 0 : 1 });
    face(rom, t, { look: [-8, -4], bL: 10, bR: 10, seed: 1.1 });
    popA(ch, t, K.sale5 - 0.03, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #CFD9DA 0%, #EADFC8 60%)' });
  const sky = box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(180deg, #F6C98E 0%, #F9E3B8 45%, rgba(234,223,200,0) 75%)' });
  const sunW = box(c, 40, 760, 230, 230, { zIndex: 2 }); const sun = box(sunW, 0, 0, 230, 230); sun.innerHTML = sunSvg();
  const dial = mkDial(c, 130, 560, 820, { z: 4 });
  box(c, 0, 1090, 1080, 830, { zIndex: 5, background: '#B9A27E', borderTop: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 3px, transparent 3px 70px)' });
  const rom = mk(c, [600, 860, 320, 410], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 6;
  const ch = chip(c, 140, 1140, 'sale el sol', { size: 56, bg: YEL, color: INK, z: 20 });
}
/* P2b · «...A LAS SEIS DE LA MAÑANA, LA HORA SEXTA CAE JUSTO...» — cuenta lenta I → VI con el reloj de 6 a 12 */
const P2_T0 = K.manana, P2_T1 = K.doce5, P2_STEP = (P2_T1 - P2_T0) / 6;
const p2h = t => clamp((t - P2_T0) / (P2_T1 - P2_T0), 0, 1) * 6; // horas transcurridas desde el amanecer (0..6)
{
  const NUMS = [];
  const c = scene(S.P2b[0], S.P2b[1], t => {
    const h = p2h(t);
    // avance escalonado (se para un instante en cada hora para que se lea)
    const hs = Math.floor(h) + E.inOutCubic(clamp((h % 1) * 1.6));
    dial.setH(Math.max(0.05, Math.min(6, hs)));
    for (let k = 1; k <= 12; k++) { dial.lit(k, k <= 6 && hs >= k - 0.02, k === 6 ? RED : YEL); dial.dim(k, k > 6); }
    ck.setH(6 + Math.min(6, hs));
    set(ck.d, { s: pop(t, S.P2b[0] + 0.02, 0.35), r: wobble(t, 0.5, 1.5), o: t < S.P2b[0] + 0.02 ? 0 : 1 });
    popA(six, t, K.seis - 0.02, { r: -4 });
    const cur = Math.floor(hs + 0.02);
    NUMS.forEach((n, i) => { const on = cur === i + 1; n.style.display = on ? '' : 'none'; if (on) set(n, { s: pop(t, P2_T0 + i * P2_STEP + P2_STEP / 1.6 - 0.04, 0.3), r: -3 }); });
    set(lbl, { o: cur >= 1 ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const dial = mkDial(c, 130, 440, 820, { z: 4, label: 'HORAS ROMANAS' });
  const ck = mkClock(c, 610, 1000, 290, { z: 6 });
  const six = chip(c, 540, 940, 'amanece · 6:00', { size: 42, bg: '#fff', color: INK, z: 20 });
  const lbl = el('div', c, { left: '110px', top: '1010px', width: '440px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '42px', color: INK, zIndex: 9 }, 'hora romana');
  ['I', 'II', 'III', 'IV', 'V', 'VI'].forEach((r, i) => NUMS.push(stoneNum(c, 110, 1055, 440, r, 210, { z: 10, col: i === 5 ? YEL : STONE })));
}
/* P2c · «...A LAS DOCE DEL MEDIODÍA» — VI en rojo + reloj a las 12 + sello «VI = 12:00» */
{
  const c = scene(S.P2c[0], S.P2c[1], t => {
    set(cam, { s: lerp(1.1, 1, p(t, S.P2c[0], 0.35, E.outCubic)) });
    dial.setH(6); for (let k = 1; k <= 12; k++) { dial.lit(k, k === 6, RED); dial.dim(k, k !== 6); }
    ck.setH(12); set(ck.d, { r: wobble(t, 0.5, 2) });
    stampA(st, t, K.doce5 + 0.02, -5, 1);
    set(sunN, { r: t * 30, s: 1 + 0.05 * Math.sin(t * 5) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F6E7B8' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  rays(cam, -160, 220, 1400, 24, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  const sunW = box(cam, 290, 430, 170, 170, { zIndex: 3 }); const sunN = box(sunW, 0, 0, 170, 170); sunN.innerHTML = sunSvg();
  const dial = mkDial(cam, 60, 560, 560, { z: 4 });
  const ck = mkClock(cam, 630, 560, 300, { z: 6 });
  const st = cstamp(cam, 990, 'VI = 12:00', { size: 120, bw: 15, z: 60 });
}

/* ======================================================================
   PASO 3 · P3a «Y TRES: A ESA HORA, CON EL CALOR,» — sol de mediodía que aprieta; el romano suda
   ====================================================================== */
{
  const c = scene(S.P3a[0], S.P3a[1], t => {
    set(sun, { r: t * 24, s: 1 + 0.06 * Math.sin(t * 6) });
    const kh = p(t, K.calor - 0.2, 0.7, E.outCubic);
    th.style.height = px(lerp(120, 430, kh)); th.style.top = px(1210 - lerp(120, 430, kh));
    HW.forEach((h, i) => { const ph = ((t - S.P3a[0]) * 1.2 + i / 3) % 1; set(h, { y: -ph * 120, o: (t > K.calor - 0.2 ? 1 : 0.3) * (1 - ph) }); });
    set(rom.d, { s: pop(t, S.P3a[0] + 0.05, 0.4), y: wobble(t, 0.5, 3), x: t > K.calor ? Math.sin(t * 30) * 2 : 0, o: t < S.P3a[0] + 0.05 ? 0 : 1 });
    face(rom, t, { look: [0, -6], bL: 12, bR: 12, seed: 1.1, jaw: t > K.calor ? 0.3 : 0 });
    set(sw, { o: t > K.calor - 0.1 ? 1 : 0, y: ((t * 60) % 40) });
    popA(cal, t, K.calor - 0.03, { r: -5 });
    popA(noon, t, K.esa - 0.03, { r: 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F7C25A 0%, #F6D9A8 55%, #EFE1C6 100%)' });
  rays(c, -160, 0, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const sunW = box(c, 340, 430, 400, 400, { zIndex: 2 }); const sun = box(sunW, 0, 0, 400, 400); sun.innerHTML = sunSvg();
  box(c, 0, 1200, 1080, 720, { zIndex: 3, background: '#C9A86E', borderTop: `6px solid ${INK}` });
  const HW = [0, 1, 2].map(i => { const e = box(c, 180 + i * 260, 1110, 160, 100, { zIndex: 4 }); e.innerHTML = `<svg width="160" height="100" style="overflow:visible"><path d="M20,90 q20,-30 0,-60 q-20,-30 0,-60 M80,90 q20,-30 0,-60 q-20,-30 0,-60" stroke="${RED}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/></svg>`; return e; });
  const rom = mk(c, [180, 760, 380, 486], romanInner() + SWEAT(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 6;
  const sw = box(c, 240, 860, 260, 120, { zIndex: 7 }); sw.innerHTML = `<svg width="260" height="120" style="overflow:visible"><path d="M20,10 C10,30 14,44 24,44 C34,44 38,30 20,10 Z M230,30 C220,50 224,64 234,64 C244,64 248,50 230,30 Z" fill="#9FD3E6" stroke="${INK}" stroke-width="3"/></svg>`;
  // termómetro
  box(c, 720, 720, 120, 560, { zIndex: 5, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '60px', boxShadow: `8px 8px 0 ${SH}` });
  const th = box(c, 762, 1090, 36, 120, { zIndex: 6, background: RED, borderRadius: '18px', border: `4px solid ${INK}` });
  box(c, 735, 1180, 90, 90, { zIndex: 7, background: RED, borderRadius: '50%', border: `6px solid ${INK}` });
  const cal = chip(c, 560, 1150, '¡qué calor!', { size: 52, bg: RED, z: 20 });
  const noon = chip(c, 90, 640, 'hora sexta', { size: 48, bg: INK, color: YEL, z: 20 });
}
/* P3b · «SE PARABA A COMER Y A DESCANSAR.» — el romano come… y el emú le roba el pan (cameo) */
const T_EMU = K.descansar6 + 0.12;
{
  const c = scene(S.P3b[0], S.P3b[1], t => {
    const chomp = t > K.comer - 0.1 && t < T_EMU;
    const yawn = t > K.descansar6 - 0.05;
    set(m.d, { s: pop(t, S.P3b[0], 0.35), y: wobble(t, 0.6, 3) + (chomp ? Math.abs(Math.sin(t * 22)) * -10 : 0) });
    face(m, t, { look: yawn ? [0, 0] : [-4, 6], jaw: chomp ? Math.abs(Math.sin(t * 22)) * 0.8 : yawn ? 0.9 : 0, closed: chomp || yawn, bL: 8, bR: 8, seed: 0.5 });
    const kb = p(t, S.P3b[0] + 0.05, 0.35, E.outBack), ke = p(t, T_EMU, 0.25, E.inOutCubic);
    const kx2 = p(t, T_EMU + 0.45, 0.25, E.inCubic);
    set(br, { x: lerp(300, 0, kb) + ke * 300 + kx2 * 500, y: -ke * 120, r: -10 + ke * 30, o: 1 });
    const kE = p(t, T_EMU - 0.2, 0.22, E.outBack) * (1 - p(t, T_EMU + 0.45, 0.25, E.inCubic));
    set(emu.d, { x: (1 - kE) * 520, r: -18 });
    emuW.style.visibility = kE > 0.001 ? 'visible' : 'hidden';
    face(emu, t, { look: [-6, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU - 0.05 && t < T_EMU + 0.3 ? 0.6 : 0 });
    CR.forEach((q, i) => { const kc = p(t, K.comer + i * 0.08, 0.6, E.outCubic); set(q, { x: (i - 2) * 60 * kc, y: kc * 200 + kc * kc * 100, o: t > K.comer + i * 0.08 && kc < 1 ? 1 : 0 }); });
    popA(cA, t, K.comer - 0.03, { r: -5 }); popA(cB, t, K.descansar6 - 0.03, { r: 4 });
    zf(t, true); set(zW, { o: yawn ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.2)', 'rgba(0,0,0,0)', 0);
  const m = mk(c, [210, 470, 560, 715], romanInner(), '0 0 360 460', 'bust'); m.d.style.zIndex = 4;
  const tb = box(c, 0, 1060, 1080, 300, { zIndex: 6 }); tb.innerHTML = tableSvg(1080, 300);
  const pl = box(c, 330, 1050, 300, 90, { zIndex: 7 }); pl.innerHTML = plateSvg();
  const br = box(c, 380, 880, 320, 172, { zIndex: 8 }); br.innerHTML = breadSvg();
  const CR = [0, 1, 2, 3, 4].map(i => box(c, 520, 980, 24, 18, { zIndex: 9, background: '#D9A25A', border: `3px solid ${INK}`, borderRadius: '40%' }));
  const emuW = box(c, 560, 520, 520, 760, { overflow: 'hidden', zIndex: 20 });
  const emu = mkEmuF(emuW, [80, 40, 420, 630]);
  const cA = chip(c, 70, 1150, 'a comer…', { size: 50, bg: YEL, color: INK, z: 22 });
  const cB = chip(c, 390, 1150, '…y a descansar', { size: 50, bg: PINK, z: 22 });
  const zW = box(c, 0, 0, 1080, 1920, { zIndex: 10 }); zW.zR = 260; const zf = zzz(zW, 520, 560, 3, 100);
}
/* P3c · «Y DESCANSAR EN LA SEXTA...» — el romano se queda dormido apoyado en el reloj de sol, en el VI */
{
  const c = scene(S.P3c[0], S.P3c[1], t => {
    const kl = p(t, K.descansar6b, 0.6, E.inOutCubic);
    set(rom.d, { r: -14 * kl, x: -kl * 20, y: kl * 30 + wobble(t, 0.5, 3) });
    face(rom, t, { jaw: 0.2 * kl, closed: kl > 0.4, bL: 10 * kl, bR: 10 * kl, seed: 1.1 });
    zf(t, true); set(zW, { o: kl });
    dial.setH(6);
    for (let k = 1; k <= 12; k++) { dial.lit(k, k === 6 && t > K.sexta6 - 0.1, YEL); dial.dim(k, k !== 6); }
    popA(lab, t, K.sexta6 - 0.04, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const dial = mkDial(c, 130, 450, 820, { z: 3 });
  box(c, 0, 1060, 1080, 860, { zIndex: 4, background: '#B9A27E', borderTop: `6px solid ${INK}` });
  box(c, 260, 1040, 560, 70, { zIndex: 4, background: 'rgba(43,33,24,.35)', borderRadius: '50%' });
  const rom = mk(c, [330, 640, 420, 537], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 6; rom.d.style.transformOrigin = '210px 520px';
  const zW = box(c, 0, 0, 1080, 1920, { zIndex: 8 }); zW.zR = 300; const zf = zzz(zW, 520, 820, 4, 110);
  const lab = chip(c, 380, 1150, 'en la sexta (VI)', { size: 54, bg: INK, color: YEL, z: 20 });
}
/* P3d · «...ACABÓ SIENDO "ECHAR LA SIESTA"» — SEXTA → SIESTA (las letras se transforman) + hamaca */
{
  const LT = [];
  const c = scene(S.P3d[0], S.P3d[1], t => {
    set(hm, { r: Math.sin(t * 2.2) * 2.5 }); set(front, { r: Math.sin(t * 2.2) * 2.5 });
    set(man.d, { r: -12 + Math.sin(t * 2.2) * 3, y: wobble(t, 0.5, 4) });
    face(man, t, { closed: true, jaw: 0.2, seed: 0 });
    const km = p(t, K.acabo + 0.05, 0.45, E.inOutCubic);
    LT.forEach(L => {
      const x = lerp(L.x0, L.x1, km);
      if (L.morph) { const sp = Math.abs(Math.cos(km * Math.PI)); set(L.e, { x, s: 1, r: L.r, o: 1 }); L.e.style.transform += ` scaleX(${f1(Math.max(0.05, sp) * 100) / 100})`; L.e.textContent = km < 0.5 ? L.a : L.b; L.e.style.background = km >= 0.5 ? YEL : '#fff'; return; }
      set(L.e, { x, s: L.ins ? km : 1, r: L.r, o: L.ins ? (km > 0.02 ? 1 : 0) : 1 });
      L.e.style.background = L.ins && km > 0.5 ? YEL : '#fff';
    });
    popA(bub, t, S.P3d[0] + 0.05, { r: -2 });
    popA(ech, t, K.echar - 0.03, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9DFC6' });
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  box(c, 0, 1240, 1080, 680, { zIndex: 1, background: '#B9A27E', borderTop: `6px solid ${INK}` });
  const hm = box(c, 90, 800, 900, 520, { zIndex: 5, transformOrigin: '450px 100px' }); hm.innerHTML = hammockSvg();
  const man = mk(c, [340, 690, 380, 486], sleeperInner(true), '0 0 360 460', 'bust'); man.d.style.zIndex = 4;
  const front = box(c, 90, 800, 900, 520, { zIndex: 6, transformOrigin: '450px 100px' }); front.innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="6"/></svg>`;
  const bub = box(c, 70, 440, 940, 210, { zIndex: 20, background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', boxShadow: `8px 9px 0 ${SH}` });
  const TW = 130, G = 12; const pos6 = i => 50 + i * (TW + G), pos5 = i => 121 + i * (TW + G);
  const mkL = ch => el('div', bub, { left: '0', top: '22px', width: TW + 'px', height: '154px', lineHeight: '154px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', color: INK, background: '#fff', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `6px 7px 0 ${SH}` }, ch);
  [['S', 0, 0], ['E', 1, 2], ['X', 2, 3, 'S'], ['T', 3, 4], ['A', 4, 5]].forEach(([a, i5, i6, b], k) => { const e = mkL(a); LT.push({ e, a, b, x0: pos5(i5), x1: pos6(i6), r: [-4, 3, -2, 4, -3][k], morph: !!b }); });
  { const e = mkL('I'); LT.push({ e, a: 'I', x0: pos6(1), x1: pos6(1), r: 5, ins: true }); }
  const ech = chip(c, 290, 1200, '«echar la siesta»', { size: 60, bg: PINK, z: 22 });
}

/* ======================================================================
   OJO (L7) · la regla: 1.ª hora = de 6 a 7 … la sexta acaba a las 12 — regla con las horas I…VI
   ====================================================================== */
function mkRuler(pa) {
  const R = { B: [] };
  const X0 = 110, BW = 125, Y0 = 640;
  for (let i = 0; i < 6; i++) {
    const b = box(pa, X0 + i * BW + 4, Y0, BW - 8, 240, { zIndex: 5, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `6px 7px 0 ${SH}` });
    const tx = el('div', b, { left: 0, top: '40px', width: px(BW - 20), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: INK }, ROM[i + 1]);
    el('div', b, { left: 0, top: '150px', width: px(BW - 20), textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', lineHeight: 1, color: INK }, `${i + 1}.ª`);
    R.B.push({ b, tx });
  }
  R.T = [];
  for (let i = 0; i <= 6; i++) {
    box(pa, X0 + i * BW - 3, Y0 + 250, 6, 40, { zIndex: 5, background: INK });
    R.T.push(el('div', pa, { left: px(X0 + i * BW - 70), top: px(Y0 + 296), width: '140px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: i === 6 ? '58px' : '50px', lineHeight: 1, color: i === 6 ? RED : INK, zIndex: 6 }, `${6 + i}:00`.replace(/^(\d+):00$/, (m, h) => (i === 0 || i === 6) ? m : h)));
  }
  R.lit = (i, on, col) => { const q = R.B[i]; q.b.style.background = on ? (col || YEL) : '#FBF6EA'; q.tx.style.color = on && col === RED ? '#fff' : INK; };
  return R;
}
headline(S.O1[0], S.O1[1], 'La 1.ª hora: *de 6 a 7*', { size: 92, hlT: K.seis7 });
{
  const c = scene(S.O1[0], S.O1[1], t => {
    stampA(ojo, t, K.ojo, -6, 1);
    const kz = p(t, S.O1[0], 0.4, E.outCubic);
    set(cam, { x: 368 * kz, y: 0, s: lerp(1, 1.75, kz) });
    for (let i = 0; i < 6; i++) { R.lit(i, i === 0 && t > K.primera7 - 0.05); R.B[i].b.style.opacity = i === 0 ? 1 : 0.35; }
    R.T.forEach((e, i) => { e.style.opacity = i === 0 ? (t > K.seis7 - 0.05 ? 1 : 0) : i === 1 ? (t > K.siete7 - 0.05 ? 1 : 0) : 0; });
    ck.setH(lerp(6, 7, p(t, K.seis7, K.siete7 - K.seis7 + 0.2, E.inOutCubic)));
    set(ck.d, { s: pop(t, K.seis7 - 0.1, 0.35), o: t < K.seis7 - 0.1 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '172px 800px' });
  const R = mkRuler(cam);
  const ojo = cstamp(c, 1170, '¡OJO!', { size: 120, bw: 14, z: 60, bg: YEL, col: INK });
  const ck = mkClock(c, 720, 950, 220, { z: 30 });
}
headline(S.O2[0], S.O2[1], 'la sexta acababa *a las 12*', { size: 92, hlT: K.terminaba });
{
  const c = scene(S.O2[0], S.O2[1], t => {
    const T6 = K.sexta7;
    for (let i = 0; i < 6; i++) { const ti = i < 5 ? lerp(S.O2[0] + 0.15, T6 - 0.25, i / 4) : T6 - 0.05; R.lit(i, t > ti, i === 5 ? RED : YEL); set(R.B[i].b, { s: t > ti ? 1 + 0.12 * (1 - p(t, ti, 0.25)) : 1 }); }
    R.T.forEach((e, i) => { const ti = i < 6 ? lerp(S.O2[0] + 0.15, T6 - 0.25, Math.min(i, 4) / 4) : K.terminaba; e.style.opacity = t > ti - 0.05 ? 1 : 0.25; });
    stampA(st, t, K.terminaba + 0.02, -5, 1);
    popA(lab, t, T6 - 0.05, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const R = mkRuler(c);
  const lab = chip(c, 640, 540, 'la sexta', { size: 50, bg: RED, z: 20 });
  const st = cstamp(c, 1060, 'VI → 12:00', { size: 100, bw: 13, z: 60 });
}

/* ======================================================================
   R1 · «O SEA: SI TE LA ECHAS A LAS TRES Y MEDIA,» — pantalla partida: LA DE VERDAD 12:00 · LA TUYA 12 → 15:30
   ====================================================================== */
{
  const c = scene(S.R1[0], S.R1[1], t => {
    set(top, { s: lerp(0.92, 1, p(t, S.R1[0], 0.25, E.outBack)) });
    set(bot, { s: lerp(0.92, 1, p(t, S.R1[0] + 0.05, 0.25, E.outBack)) });
    cT.setH(12); set(hm1, { r: Math.sin(t * 2.4) * 4 }); face(sl1, t, { closed: true, jaw: 0.15, seed: 0 });
    const kc = p(t, K.echas8 - 0.1, K.media - K.echas8 + 0.15, E.inOutCubic);
    cB.setH(lerp(12, 15.5, kc));
    set(sl2.d, { y: wobble(t, 0.5, 3) }); face(sl2, t, { look: [6, -2], bL: 4, bR: 12, seed: 0.4 });
    stampA(sB, t, K.tres8 - 0.02, 5, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2B2118' });
  const mkPanel = (y, bg) => box(c, 30, y, 1020, 560, { zIndex: 4, background: bg, border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 rgba(0,0,0,.35)`, overflow: 'hidden', transformOrigin: '510px 280px' });
  const top = mkPanel(180, '#F6E7B8'), bot = mkPanel(770, '#D7DCE2');
  el('div', top, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `La de ${hlSpan('verdad', 'q1', YEL)}`);
  top.querySelector('.q1').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const hm1 = box(top, 20, 250, 520, 300, { zIndex: 2, transformOrigin: '260px 40px' }); hm1.innerHTML = hammockSvg();
  const sl1 = mk(top, [150, 150, 230, 294], sleeperInner(true), '0 0 360 460', 'bust'); sl1.d.style.zIndex = 1;
  box(top, 20, 250, 520, 300, { zIndex: 3 }).innerHTML = `<svg viewBox="0 0 900 520" width="100%" height="100%" style="overflow:visible"><path d="M200,330 C300,450 600,450 700,330 C640,470 260,470 200,330 Z" fill="#F2C230" stroke="${INK}" stroke-width="7"/></svg>`;
  const cT = mkClock(top, 600, 120, 290, { z: 4 });
  const sT = box(top, 520, 420, 420, 120, { zIndex: 8 }); sT.appendChild(cstamp(sT, 0, 'VI · 12:00', { size: 70, bw: 10 })).style.width = '420px'; set(sT, { r: -6 });
  el('div', bot, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `La ${hlSpan('tuya', 'q2', PINK)}`);
  bot.querySelector('.q2').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const sl2 = mk(bot, [80, 150, 300, 383], sleeperInner(false), '0 0 360 460', 'bust'); sl2.d.style.zIndex = 2;
  const cB = mkClock(bot, 520, 110, 290, { z: 4 });
  const sB = box(bot, 440, 420, 420, 120, { zIndex: 8 }); sB.appendChild(cstamp(sB, 0, '15:30', { size: 84, bw: 11 })).style.width = '420px';
}
/* R1b · «PARA UN ROMANO ESO YA NO ES LA SEXTA... ES LA DÉCIMA.» — reloj de sol de VI a X + sello rojo X sobre «La tuya 15:30» */
headline(S.R1b[0], S.R1b[1], 'Para un romano… *la décima*', { size: 88, hlT: K.decima });
{
  const c = scene(S.R1b[0], S.R1b[1], t => {
    const kd = p(t, K.decima - 0.45, 0.5, E.inOutCubic);
    dial.setH(lerp(6, 10, kd));
    for (let k = 1; k <= 12; k++) { dial.lit(k, (k === 6 && t > K.sexta8 - 0.05) || (k === 10 && t > K.decima - 0.05), k === 10 ? RED : YEL); dial.dim(k, k !== 6 && k !== 10); }
    popA(c6, t, K.sexta8 - 0.04, { r: -4 });
    set(card, { s: pop(t, S.R1b[0] + 0.05, 0.35), r: -3, o: t < S.R1b[0] + 0.05 ? 0 : 1 });
    stampA(sX, t, K.decima + 0.02, -8, 1);
    popA(cX, t, K.decima + 0.15, { r: 5 });
    const shake = t > K.no8 - 0.05 && t < K.no8 + 0.9;
    set(rom.d, { s: pop(t, K.romano - 0.15, 0.4), x: shake ? Math.sin(t * 22) * 14 : 0, y: wobble(t, 0.5, 3), o: t < K.romano - 0.15 ? 0 : 1 });
    face(rom, t, { look: shake ? [Math.sin(t * 22) * 6, 0] : [-6, 0], bL: 4, bR: 14, seed: 1.1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const dial = mkDial(c, 130, 420, 820, { z: 4 });
  const c6 = chip(c, 330, 975, 'sexta = 12:00', { size: 44, bg: YEL, color: INK, z: 20 });
  const card = box(c, 100, 1075, 560, 240, { zIndex: 10, background: '#D7DCE2', border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 12px 0 ${SH}` });
  el('div', card, { left: '-50px', top: '28px', width: '546px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', lineHeight: 1, color: INK }, `La ${hlSpan('tuya', 'q3', PINK)}`);
  card.querySelector('.q3').style.transform = 'scaleX(1) rotate(-1.2deg)';
  el('div', card, { left: '-40px', top: '110px', width: '486px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK }, '15:30');
  const sX = box(c, 450, 1090, 220, 220, { zIndex: 30 }); sX.innerHTML = `<div style="position:absolute;left:0;top:0;width:220px;text-align:center"><span style="display:inline-block;border:14px solid ${RED};color:${RED};font-family:Rye;font-size:150px;line-height:1;padding:0 26px 10px;border-radius:20px;background:rgba(255,255,255,.85)">X</span></div>`;
  const cX = chip(c, 690, 780, 'décima', { size: 52, bg: RED, z: 32 });
  const rom = mk(c, [680, 990, 260, 332], romanInner(), '0 0 360 460', 'bust'); rom.d.style.zIndex = 8;
}
/* R2 · «LLEGAS TARDE... HASTA A TU PROPIA SIESTA.» — el señor corre con la lengua fuera + sello */
headline(S.R2[0], S.R2[1], 'Llegas tarde… *hasta a tu siesta*', { size: 84, hlT: K.siesta8b });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    const tl = t - S.R2[0];
    set(bgS, { x: -((tl * 900) % 270) });
    const run = Math.sin(t * 26);
    set(man.d, { x: lerp(-420, 0, p(t, S.R2[0], 0.5, E.outCubic)), y: Math.abs(run) * -26, r: 8 + run * 3 });
    face(man, t, { look: [10, 0], bL: 14, bR: 14, jaw: 0.6, seed: 0 });
    LG.forEach((l, i) => set(l, { r: (i ? 1 : -1) * run * 38 }));
    SL.forEach((s, i) => set(s, { x: -((tl * 1400 + i * 300) % 1200) + 900, o: 0.7 }));
    ck.setH(15.5 + 0.2 * p(t, S.R2[0], 1.8, E.linear));
    popA(hx, t, S.R2[0] + 0.1, { r: 4 });
    stampA(st, t, K.tarde + 0.02, -7, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 60%)' });
  const bgS = box(c, 0, 0, 2400, 1920, { zIndex: 1 }); bgS.innerHTML = `<svg width="2400" height="1920" style="overflow:visible">${[...Array(10)].map((_, k) => `<rect x="${k * 270}" y="1040" width="18" height="160" fill="${WOOD}" stroke="${INK}" stroke-width="3"/>`).join('')}<rect x="0" y="1180" width="2400" height="740" fill="#B9A27E" stroke="${INK}" stroke-width="6"/></svg>`;
  const ck = mkClock(c, 660, 440, 240, { z: 3 });
  const hx = chip(c, 620, 700, '15:30 = hora X', { size: 44, bg: RED, z: 20 });
  const runner = box(c, 200, 560, 500, 760, { zIndex: 6 });
  const LG = [0, 1].map(i => { const l = box(runner, 210 + i * 40, 480, 60, 260, { zIndex: 1, transformOrigin: '30px 10px' }); l.innerHTML = `<svg width="60" height="260" style="overflow:visible"><path d="M18,0 L42,0 L40,210 L20,210 Z" fill="#5a4632" stroke="${INK}" stroke-width="4"/><path d="M10,206 L62,206 Q70,240 46,244 L10,244 Z" fill="${INK}"/></svg>`; return l; });
  const man = mk(runner, [0, 0, 480, 614], sleeperInner() + TONGUE() + SWEAT(), '0 0 360 460', 'bust'); man.d.style.zIndex = 2;
  const SL = [0, 1, 2, 3].map(i => box(c, 0, 700 + i * 120, 220, 20, { zIndex: 5, background: INK, borderRadius: '10px', opacity: 0.6 }));
  const st = cstamp(c, 1060, '¡TARDE!', { size: 150, bw: 17, z: 60 });
}

/* ======================================================================
   T · CTA: «¿A QUÉ HORA TE LA ECHAS TÚ? OS LEO.» — reloj vacío que gira
   ====================================================================== */
{
  const c = scene(S.T[0], S.T[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(tHL, t, K.tu13, 0.3);
    ck.setH((t - S.T[0]) * 2.2 + 1);
    set(ck.d, { s: pop(t, S.T[0] + 0.05, 0.4), r: wobble(t, 0.6, 2), o: t < S.T[0] + 0.05 ? 0 : 1 });
    QM.forEach((q, i) => set(q, { s: pop(t, K.echas13 + i * 0.1, 0.3), r: Math.sin(t * 5 + i) * 10, o: t < K.echas13 + i * 0.1 ? 0 : 1 }));
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const l1 = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '340px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = [];
  [['¿A', l1], ['qué', l1], ['hora', l1], ['te', l2], ['la', l2], ['echas', l2], ['tú?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 6) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('tú?', 'thl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[K.i13 + k].s }); });
  const tHL = c.querySelector('.thl');
  const ck = mkClock(c, 290, 520, 500, { z: 6, blank: true });
  const QM = [[150, 620], [800, 600], [180, 940], [780, 900]].map((q, i) => qMark(c, q[0], q[1], 120, i % 2 ? PINK : YEL));
  const ol = chip(c, 560, 1110, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 430, 1110, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BK · «Y ESTO... NO VENÍA EN EL LIBRO.» — el libro HISTORIA se cierra (centrado)
   ====================================================================== */
headline(S.BK[0], K.noF - 0.06, 'Y esto…', { size: 120, color: YEL, y: 170, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
headline(K.noF - 0.06, LOOP, '…no venía en el *libro.*', { size: 92, hlT: K.libro, y: 180 });
{
  const TC = K.libro - 0.05, SCB = 1.1;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    set(bookW, { x: 210 * SCB * p(t, TC + 0.2, 0.25, E.outCubic), s: SCB * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
    popA(epl, t, TC + 0.3, { r: -1 });
  }, { cut: true, clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 360, 1400, 24, 'rgba(255,255,255,.18)', 'rgba(0,0,0,0)', 1);
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 2 });
  const vb = mk(bookW, [150, 360, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
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
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1270px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 39 · ¿Siesta es un número?</span>`);
}
