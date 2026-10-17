/* Ep. 25 · escenas L5–L10 (todo clavado por texto vía K) */

/* ======================================================================
   O1 · «OJO: NADIE SE VENDÍA» — el gondolero con su cartel «SE VENDE» tachado
   ====================================================================== */
headline(S.O1[0], S.O1[1], 'Nadie *se vendía*', { size: 110, hlT: K.vendia, y: 250 });
{
  const c = scene(S.O1[0], S.O1[1], t => {
    stampA(ojo, t, K.ojo, -8, 1);
    set(gd.d, { s: pop(t, S.O1[0] + 0.05, 0.4), y: wobble(t, 0.6, 3), o: t < S.O1[0] + 0.05 ? 0 : 1 });
    face(gd, t, { look: t > K.vendia ? [0, 0] : [-8, -2], bL: t > K.nadie ? 14 : 4, bR: t > K.nadie ? 14 : 4, seed: 1.2 });
    set(sign, { s: pop(t, K.nadie - 0.1, 0.4), r: -6 + wobble(t, 0.5, 2), o: t < K.nadie - 0.1 ? 0 : 1 });
    xE.style.transform = `scale(${f1(p(t, K.vendia, 0.22, E.outBack) * 100) / 100})`; xE.style.opacity = t > K.vendia ? 1 : 0;
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ojo = stamp(c, 360, 400, '¡OJO!', { size: 120, bw: 13, z: 60, bg: YEL, blend: 'normal', col: INK });
  const gd = mk(c, [440, 640, 480, 613], gondolierInner(), '0 0 360 460', 'bust'); gd.d.style.zIndex = 4;
  const sign = box(c, 340, 980, 560, 250, { zIndex: 8 });
  sign.innerHTML = `<svg width="560" height="250" style="overflow:visible">${cut('<rect x="0" y="0" width="560" height="230" rx="12"/>')}<rect x="0" y="0" width="560" height="230" rx="12" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="560" height="230" rx="12" fill="url(#hP)" opacity=".5"/><text x="280" y="148" text-anchor="middle" font-family="Rye" font-size="104" fill="${INK}">SE VENDE</text></svg>`;
  const xE = box(sign, 60, -30, 440, 300, { zIndex: 3, transformOrigin: '220px 150px' }); xE.innerHTML = XSVG;
}

/* ======================================================================
   O2 · «ERA PURA EDUCACIÓN, COMO NUESTRO "SERVIDOR"» — el caballero hace una reverencia
   ====================================================================== */
headline(S.O2[0], K.nuestro - 0.06, 'Era pura *educación*', { size: 104, hlT: K.educacion });
headline(K.nuestro - 0.06, S.O2[1], 'como nuestro…', { size: 104 });
{
  const c = scene(S.O2[0], S.O2[1], t => {
    set(ry, { r: t * 7 });
    const bow = p(t, K.educacion - 0.1, 0.45, E.inOutCubic) * (1 - p(t, K.servidor - 0.35, 0.3, E.inOutCubic)) + p(t, K.servidor - 0.05, 0.35, E.outBack);
    set(gt.d, { s: pop(t, S.O2[0] + 0.02, 0.45), r: bow * 22, y: bow * 60 + wobble(t, 0.6, 3), o: t < S.O2[0] + 0.02 ? 0 : 1 });
    face(gt, t, { look: [-4, 6], closed: bow > 0.6, bL: 8, bR: 8, seed: 0.4 });
    // la chistera se levanta en «servidor»
    const kh = p(t, K.servidor - 0.15, 0.35, E.outBack);
    set(hat, { x: -kh * 170, y: -kh * 120 + bow * 40, r: -kh * 30, o: 1 });
    stampA(srv, t, K.servidor, -5, 1);
    popA(ch1, t, K.educacion + 0.1, { r: 4 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DFC6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const ry = rays(c, -160, 220, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const gt = mk(c, [380, 520, 500, 639], gentInner(), '0 0 360 460', 'bust'); gt.d.style.zIndex = 4; gt.d.style.transformOrigin = '250px 600px';
  const hat = box(c, 380 + 70 * 1.39, 520, 360 * 0.6 * 1.39, 200, { zIndex: 6 }); hat.innerHTML = `<svg viewBox="80 20 200 170" width="100%" height="100%" style="overflow:visible">${TOPHAT()}</svg>`;
  const srv = stamp(c, 420, 1100, '«SERVIDOR»', { size: 96, bw: 12, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  const ch1 = chip(c, 640, 470, 'cortesía 🎩', { size: 46, bg: PINK, z: 30 });
}

/* ======================================================================
   O3 · «O EL "A SUS ÓRDENES"» — el camarero saluda
   ====================================================================== */
headline(S.O3[0], S.O3[1], 'o el *«a sus órdenes»*', { size: 96, hlT: K.ordenes });
{
  const c = scene(S.O3[0], S.O3[1], t => {
    set(wt.d, { s: pop(t, S.O3[0] + 0.02, 0.4), y: wobble(t, 0.6, 3), o: t < S.O3[0] + 0.02 ? 0 : 1 });
    face(wt, t, { look: [0, 0], bL: 6, bR: 6, seed: 2.1 });
    const ks = p(t, K.a5 - 0.15, 0.3, E.outBack);
    set(hand, { r: lerp(90, 0, ks), x: (1 - ks) * 60, y: (1 - ks) * 260, o: t < K.a5 - 0.15 ? 0 : 1 });
    popA(ord, t, K.ordenes - 0.05, { r: -4 });
    set(tray, { r: wobble(t, 0.8, 2), y: wobble(t, 0.7, 4) });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  const wt = mk(c, [400, 480, 500, 639], waiterInner(71), '0 0 360 460', 'bust'); wt.d.style.zIndex = 4;
  const hand = box(c, 560, 470, 240, 240, { zIndex: 6, transformOrigin: '170px 200px' });
  hand.innerHTML = `<svg viewBox="-80 -80 160 160" width="240" height="240" style="overflow:visible">${gloveHand(0, 0, -100, 1.3)}</svg>`;
  const tray = box(c, 820, 860, 200, 200, { zIndex: 5 });
  tray.innerHTML = `<svg width="200" height="200" style="overflow:visible"><path d="M40,120 h40 l-8,-70 h-24 Z" fill="#fff" stroke="${INK}" stroke-width="4" opacity=".9"/><path d="M110,120 h40 l-6,-56 h-28 Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/><ellipse cx="96" cy="128" rx="96" ry="16" fill="#d8d0be" stroke="${INK}" stroke-width="5"/></svg>`;
  const ord = stamp(c, 340, 1120, '«A SUS ÓRDENES»', { size: 80, bw: 11, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}

/* ======================================================================
   Q1 · «¿CUÁNTAS VECES LO HAS DICHO HOY?» — la única complicidad: tu día en «¡chao!»
   ====================================================================== */
headline(S.Q1[0], S.Q1[1], '¿Cuántas veces lo has *dicho hoy*?', { size: 86, hlT: K.dicho });
{
  const BB = [], TL = [];
  const c = scene(S.Q1[0], S.Q1[1], t => {
    const kd = p(t, S.Q1[0], S.Q1[1] - S.Q1[0], E.linear);
    set(sun, { x: lerp(-60, 760, kd), y: -Math.sin(kd * Math.PI) * 200 });
    BB.forEach((b, i) => { set(b.e, { s: pop(t, b.t, 0.28), r: b.r, o: t < b.t ? 0 : 1 }); });
    TL.forEach((l, i) => l.style.opacity = t > BB[i].t + 0.06 ? 1 : 0);
    set(card, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.06 * Math.abs(Math.sin(t * 6)) * (t > BB[0].t ? 1 : 0) });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #F6D9A8 0%, #EFE1C6 55%)' });
  const sky = box(c, 120, 700, 840, 1, { zIndex: 1 });
  const sun = box(sky, 0, -120, 140, 140, { zIndex: 1, borderRadius: '50%', background: YEL, border: `6px solid ${INK}`, boxShadow: `0 0 0 16px rgba(255,230,0,.35)` });
  // tarjeta «HOY»: cada «¡chao!» deja una rayita (sin cifras)
  const card = box(c, 380, 760, 560, 330, { zIndex: 10, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 12px 0 ${SH}` });
  el('div', card, { left: '0', top: '18px', width: '548px', textAlign: 'center', fontFamily: 'Rye', fontSize: '60px', color: INK }, 'HOY');
  const tg = box(card, 50, 110, 460, 180, { zIndex: 2 });
  const TP = [[0, 0], [36, 0], [72, 0], [108, 0], [-6, 0, 1], [190, 0], [226, 0], [262, 0], [298, 0], [184, 0, 1]];
  TP.forEach((q, i) => { const e = box(tg, 40 + q[0], 10, 150, 150, { zIndex: 2 }); e.innerHTML = q[2] ? `<svg width="150" height="150" style="overflow:visible"><path d="M0,120 L160,20" stroke="${RED}" stroke-width="14" stroke-linecap="round"/></svg>` : `<svg width="40" height="150" style="overflow:visible"><path d="M14,4 L10,140" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></svg>`; TL.push(e); });
  const SP = [[90, 460, 'la panadería'], [600, 430, 'el bus'], [120, 640, 'la oficina'], [640, 610, 'el ascensor'], [80, 820, 'tu madre'], [700, 1130, 'el grupo'], [120, 980, ''], [470, 1130, ''], [740, 1240, ''], [380, 1240, '']];
  const n = TP.length, t0 = S.Q1[0] + 0.1, span = (K.pues - 0.25) - t0;
  for (let i = 0; i < n; i++) {
    const q = SP[i];
    const e = bubble(c, q[0], q[1], q[2] ? `¡chao!<div style="font-family:SpecialElite;font-style:normal;font-weight:400;font-size:24px;color:#7a6a58;margin-top:2px">${q[2]}</div>` : '¡chao!', { size: 50, it: true, tail: i % 2 ? 'br' : 'bl', z: 20 + i, pad: '6px 26px 10px' });
    BB.push({ e, t: t0 + span * Math.pow(i / (n - 1), 0.75), r: (i % 2 ? 1 : -1) * (3 + i % 3 * 2) });
  }
  // las que caen en la esquina del óvalo quedan ocultas (el Vecino tapa abajo-izquierda)
  [6].forEach(i => { BB[i].e.style.display = 'none'; });
}

/* ======================================================================
   Q2 · «PUES ESO: ESCLAVO DE MEDIO BARRIO» — el rellano de las seis puertas
   ====================================================================== */
headline(S.Q2[0], S.Q2[1], 'Pues eso…', { size: 110, y: 200 });
{
  const NB = [];
  const c = scene(S.Q2[0], S.Q2[1], t => {
    NB.forEach((q, i) => {
      const t0 = S.Q2[0] + 0.05 + i * 0.12, kd = p(t, t0, 0.3, E.outCubic);
      q.leaf.style.transform = `scaleX(${f1((1 - kd * 0.75) * 100) / 100})`;
      set(q.b.d, { x: (1 - p(t, t0 + 0.12, 0.3, E.outBack)) * -120, y: wobble(t, 0.6, 3, i), o: t < t0 + 0.12 ? 0 : 1 });
      face(q.b, t, { look: [3, 2], jaw: t > K.eso && t < K.esclavo6 ? Math.abs(Math.sin(t * 14 + i)) * 0.4 : 0, closed: t > K.barrio + 0.05, bL: t > K.esclavo6 ? 12 : 2, bR: t > K.esclavo6 ? 12 : 2, seed: i * 0.7 });
      set(q.cuff, { s: pop(t, K.esclavo6 + i * 0.06, 0.3), r: -10, o: t < K.esclavo6 + i * 0.06 ? 0 : 1 });
    });
    const kb = p(t, K.barrio - 0.02, 0.22, E.outBack);
    set(ban, { s: t < K.barrio - 0.02 ? 0 : lerp(1.8, 1, kb), r: -4, o: t < K.barrio - 0.02 ? 0 : 1 });
    ban.style.textShadow = glitch(t, K.barrio, 0.25);
  }, { clip: true });
  sceneBg(c, { background: '#D9C9A8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 3px, transparent 3px 120px)' });
  box(c, 0, 1010, 1080, 600, { zIndex: 1, background: '#B9A27E', borderTop: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 3px, transparent 3px 70px)' });
  const DP = [[90, 380], [420, 380], [750, 380], [255, 700], [585, 700], [915, 700]];
  DP.forEach((q, i) => {
    const sc = 0.5, fw = 320 * sc, fh = 600 * sc;
    const fr = box(c, q[0] - fw / 2 + 80, q[1], fw, fh, { zIndex: 2 }); fr.innerHTML = `<svg viewBox="0 0 320 600" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="320" height="600" rx="8"/>')}<rect x="0" y="0" width="320" height="600" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="24" y="24" width="272" height="576" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/></svg>`;
    el('div', fr, { left: '0', top: '-46px', width: px(fw), textAlign: 'center', fontFamily: 'Rye', fontSize: '30px', color: INK }, ['1º A', '1º B', '1º C', '2º A', '2º B', '2º C'][i]);
    const b = mk(fr, [-30, 40, 200, 256], neighInner(80 + i * 7, i), '0 0 360 460', 'bust'); b.d.style.zIndex = 3;
    const leaf = box(fr, 12, 12, 136, 288, { zIndex: 4, transformOrigin: '136px 50%', background: '#A5713F', border: `4px solid ${INK}`, boxShadow: `inset 0 0 0 10px rgba(43,33,24,.12)` });
    const cuff = box(fr, 100, 200, 80, 80, { zIndex: 6 }); cuff.innerHTML = `<svg width="80" height="80" style="overflow:visible"><ellipse cx="40" cy="40" rx="30" ry="22" fill="none" stroke="${INK}" stroke-width="16"/><ellipse cx="40" cy="40" rx="30" ry="22" fill="none" stroke="${PINK}" stroke-width="8"/><path d="M68,40 h22" stroke="${INK}" stroke-width="8"/></svg>`;
    NB.push({ b, leaf, cuff });
  });
  const ban = el('div', c, { left: '330px', top: '1080px', width: '640px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '74px', lineHeight: 1.0, color: '#fff', background: RED, border: `6px solid ${INK}`, borderRadius: '18px', padding: '10px 14px 16px', boxShadow: `9px 10px 0 ${INK}`, zIndex: 40 }, 'ESCLAVO DE<br>MEDIO BARRIO');
}

/* ======================================================================
   Q3 · «Y NO ERES EL ÚNICO» — zoom out al globo lleno de «chao»
   ====================================================================== */
headline(S.Q3[0], S.Q3[1], 'Y no eres *el único*', { size: 108, hlT: K.unico });
{
  const BB = [];
  const c = scene(S.Q3[0], S.Q3[1], t => {
    const kz = p(t, S.Q3[0], 0.5, E.outCubic);
    set(gl.d, { s: lerp(2.6, 1, kz), r: t * 20 });
    BB.forEach(b => set(b.e, { s: pop(t, b.t, 0.25), r: b.r, o: t < b.t ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#2B2118' });
  const st = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); { const r = rng(5); let s = ''; for (let i = 0; i < 80; i++) s += `<circle cx="${f1(r() * 1080)}" cy="${f1(r() * 1500)}" r="${f1(1.5 + r() * 3)}" fill="#FBF6EA" opacity="${f1(0.4 + r() * 0.6)}"/>`; st.innerHTML = `<svg width="1080" height="1920">${s}</svg>`; }
  const gl = mk(c, [290, 560, 560, 560], globeInner(0.6), '0 0 400 400', 'globe'); gl.d.style.zIndex = 4;
  [[160, 470], [700, 500], [740, 900], [130, 860], [420, 400], [600, 1150]].forEach((q, i) => BB.push({ e: bubble(c, q[0], q[1], '¡chao!', { size: 46, it: true, z: 20, tail: i % 2 ? 'br' : 'bl', pad: '6px 24px 10px' }), t: S.Q3[0] + 0.15 + i * 0.09, r: (i % 2 ? 1 : -1) * 6 }));
}

/* ======================================================================
   R1–R3 · «EN BRASIL DICEN "CHAU". EN ALEMANIA, "CHAU". EN CHEQUIA… "CHAU".» — tres cortes secos
   ====================================================================== */
function countryScene(T0, T1, o) {
  const c = scene(T0, T1, t => {
    set(cam, { s: 1.04 + 0.05 * p(t, T0, T1 - T0, E.linear), x: -20 * p(t, T0, T1 - T0, E.linear) });
    popA(nm, t, o.tName, { r: -3 });
    const kb = p(t, o.tChau - 0.03, 0.3, E.outBack);
    set(bb, { s: t < o.tChau - 0.03 ? 0 : kb, r: -5 + wobble(t, 0.6, 1.5), o: t < o.tChau - 0.03 ? 0 : 1 });
    if (o.fn) o.fn(t);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: o.bg });
  box(cam, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = o.svg;
  const nm = el('div', c, { left: '0', top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', color: INK, zIndex: 60, textShadow: `0 0 0 #fff, 5px 5px 0 rgba(255,255,255,.8)` }, `<span style="background:${o.lbg || YEL};padding:0 26px 6px;border:6px solid ${INK};border-radius:20px;box-shadow:8px 8px 0 ${INK}">${o.name}</span>`);
  const bb = bubble(c, o.bx, o.by, o.word, { size: 150, tail: o.tail || 'bl', z: 50, pad: '10px 50px 22px' });
  return { c, cam };
}
countryScene(S.R1[0], S.R1[1], { name: 'BRASIL', tName: K.brasil, tChau: K.chau7a, word: '«TCHAU!»', bx: 200, by: 470, bg: 'linear-gradient(180deg, #F2E3A8 0%, #EFE1C6 60%)', svg: rioSvg(), lbg: '#9fd3a0' });
countryScene(S.R2[0], S.R2[1], { name: 'ALEMANIA', tName: K.alemania, tChau: K.chau7b, word: '«TSCHAU!»', bx: 150, by: 820, bg: 'linear-gradient(180deg, #DCD6C8 0%, #EFE1C6 60%)', svg: brandenburgSvg(), lbg: '#F2C230' });
const T_EMU = K.chau7c + 0.05;
{
  let emu, emuW, eb;
  const r3 = countryScene(S.R3[0], S.R3[1], {
    name: 'CHEQUIA', tName: K.chequia, tChau: K.chau7c, word: '«ČAU!»', bx: 140, by: 440, bg: 'linear-gradient(180deg, #CFD6DA 0%, #E6E0D0 60%)', svg: pragueSvg(), lbg: '#f2b880', tail: 'br',
    fn: t => {
      // cameo del emú: asoma por el pretil del puente, mira a cámara y suelta su «čau»
      const ke = p(t, T_EMU - 0.15, 0.25, E.outBack);
      set(emu.d, { y: (1 - ke) * 420, r: -4 });
      face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU && t < T_EMU + 0.4 ? 0.6 : 0 });
      emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
      set(eb, { s: pop(t, T_EMU + 0.12, 0.3), r: 6, o: t < T_EMU + 0.12 ? 0 : 1 });
    },
  });
  emuW = box(r3.cam, 720, 640, 300, 380, { overflow: 'hidden', zIndex: 30 });
  emu = mkEmuF(emuW, [20, 30, 260, 390]);
  eb = bubble(r3.c, 620, 560, 'čau', { size: 64, it: true, tail: 'br', z: 55, pad: '4px 28px 10px', bg: '#FFF3A8' });
}

/* ======================================================================
   T1 · «Y LO MEJOR: EN AUSTRIA Y EN BAVIERA» — Alpes y banderas
   ====================================================================== */
headline(S.T1[0], S.T1[1], 'Y lo *mejor*:', { size: 116, hlT: K.mejor });
{
  const c = scene(S.T1[0], S.T1[1], t => {
    set(mt, { y: (1 - p(t, S.T1[0], 0.45, E.outCubic)) * 300, s: 1 + 0.04 * p(t, S.T1[0], 2, E.linear) });
    [[fA, K.austria, -6], [fB, K.baviera, 5]].forEach(([f, t0, r]) => { set(f.w, { s: pop(t, t0 - 0.05, 0.4), r: r + Math.sin(t * 4 + r) * 3, o: t < t0 - 0.05 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #CFE0E6 0%, #EFE1C6 70%)' });
  const mt = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); mt.innerHTML = alpsSvg();
  const mkF = (x, y, svg, name) => { const w = box(c, x, y, 330, 300, { zIndex: 10 }); box(w, 0, 0, 300, 200).innerHTML = svg; el('div', w, { left: '0', top: '216px', width: '300px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK, background: 'rgba(251,246,234,.92)', border: `4px solid ${INK}`, borderRadius: '14px' }, name); return { w }; };
  const fA = mkF(130, 470, flagAT(), 'AUSTRIA'), fB = mkF(620, 520, flagBY(), 'BAVIERA');
}

/* ======================================================================
   T2 · «SE SALUDAN CON "SERVUS"» — el letrero de la taberna
   ====================================================================== */
headline(S.T2[0], S.T2[1], 'se saludan con…', { size: 104 });
{
  const c = scene(S.T2[0], S.T2[1], t => {
    const ks = p(t, K.servus - 0.12, 0.6, E.outElastic);
    set(sg, { y: (1 - clamp(ks)) * -700, r: Math.sin((t - K.servus) * 5) * 7 * Math.exp(-Math.max(0, t - K.servus) * 1.2) + (t < K.servus ? 0 : 0), o: t < K.servus - 0.12 ? 0 : 1 });
    BS.forEach((b, i) => { const t0 = S.T2[0] + 0.05 + i * 0.12; set(b.d, { s: pop(t, t0, 0.35), y: wobble(t, 0.6, 3, i), o: t < t0 ? 0 : 1 }); face(b, t, { look: [0, -4], jaw: t > K.servus && t < K.servus + 0.8 ? Math.abs(Math.sin(t * 14 + i)) * 0.5 : 0, seed: i }); });
  }, { clip: true });
  sceneBg(c, { background: '#E7D3B0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 70px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 140px)' });
  const beam = box(c, 0, 380, 1080, 40, { zIndex: 3, background: '#6b4426', borderTop: `5px solid ${INK}`, borderBottom: `5px solid ${INK}` });
  void beam;
  const sg = box(c, 190, 420, 700, 420, { zIndex: 10, transformOrigin: '350px 0px' }); sg.innerHTML = tavernSignSvg();
  el('div', sg, { left: '40px', top: '140px', width: '520px', textAlign: 'center', fontFamily: 'Rye', fontSize: '128px', color: GOLD, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 3 }, 'SERVUS');
  const BS = [mk(c, [380, 900, 260, 332], neighInner(91, 3), '0 0 360 460', 'bust'), mk(c, [640, 920, 250, 319], neighInner(93, 1), '0 0 360 460', 'bust')];
  BS.forEach(b => (b.d.style.zIndex = 6));
}

/* ======================================================================
   T3 · «QUE EN LATÍN SIGNIFICA… ESCLAVO» — el letrero gira: lápida SERVVS + el mismo sello
   ====================================================================== */
headline(S.T3[0], S.T3[1], 'Que en *latín* significa…', { size: 96, hlT: K.latin });
{
  const c = scene(S.T3[0], S.T3[1], t => {
    const kf = p(t, K.latin - 0.1, 0.45, E.inOutCubic), sx = Math.cos(kf * Math.PI);
    set(flip, { s: 1 + 0.08 * p(t, K.significa8, K.esclavo8 - K.significa8, E.linear) });
    flipIn.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
    fA.style.display = sx > 0 ? '' : 'none'; fB.style.display = sx > 0 ? 'none' : '';
    stampA(stE, t, K.esclavo8, -7, 1);
    set(dr, { o: t > K.significa8 && t < K.esclavo8 ? 1 : 0, y: Math.sin(t * 30) * 4 });
  }, { clip: true });
  sceneBg(c, { background: '#D8D6C4', backgroundImage: 'linear-gradient(180deg, #C9CCC6 0%, #E1DCCB 70%)' });
  const flip = box(c, 120, 420, 840, 520, { zIndex: 10 });
  const flipIn = box(flip, 0, 0, 840, 520, { transformOrigin: '420px 260px' });
  const fA = box(flipIn, 70, 40, 700, 420); fA.innerHTML = tavernSignSvg();
  el('div', fA, { left: '40px', top: '140px', width: '520px', textAlign: 'center', fontFamily: 'Rye', fontSize: '128px', color: GOLD, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` }, 'SERVUS');
  const fB = box(flipIn, 0, 0, 840, 520);
  romanSlab(fB, 0, 0, 840, 520, { seed: 41, z: 1 });
  el('div', fB, { left: '0', top: '150px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', letterSpacing: '0.12em', color: '#5a5248', textShadow: `3px 3px 0 #fff, -2px -2px 0 rgba(43,33,24,.6)`, zIndex: 3 }, 'SERVVS');
  el('div', fB, { left: '0', top: '60px', width: '840px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', color: INK, zIndex: 3 }, '— latín —');
  const stE = stamp(c, 170, 860, 'ESCLAVO', { size: 190, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const dr = el('div', c, { left: '0', top: '1000px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: INK, zIndex: 20 }, '…');
}

/* ======================================================================
   U1 · «O SEA: MEDIA EUROPA…» — el mapa se enciende de saludos
   ====================================================================== */
headline(S.U1[0], S.U1[1], 'O sea: *media Europa*…', { size: 98, hlT: K.media });
{
  const EP = [
    { k: 'IT', lo: 12.5, la: 42.6, l: [560, 1020], txt: 'CIAO', col: YEL, t: K.osea + 0.05 },
    { k: 'AT', lo: 14.5, la: 47.5, l: [690, 820], txt: 'SERVUS', col: PINK, t: K.osea + 0.2 },
    { k: 'BY', lo: 11.5, la: 48.6, l: [70, 780], txt: 'SERVUS', col: PINK, t: K.osea + 0.35 },
    { k: 'DE', lo: 10, la: 52, l: [90, 560], txt: 'TSCHAU', col: '#9fd3c0', t: K.media },
    { k: 'CZ', lo: 15.5, la: 49.9, l: [690, 600], txt: 'ČAU', col: '#f2b880', t: K.europa },
  ];
  const c = scene(S.U1[0], S.U1[1], t => {
    set(mp, { s: 1 + 0.05 * p(t, S.U1[0], 2.6, E.linear) });
    EP.forEach(q => {
      q.reg.style.opacity = t > q.t ? 0.55 : 0;
      set(q.pn, { y: (1 - p(t, q.t, 0.25, E.outBounce)) * -100, o: t < q.t ? 0 : 1 });
      q.ln.style.opacity = t > q.t + 0.08 ? 1 : 0;
      popA(q.lb, t, q.t + 0.06, { r: q.k === 'BY' || q.k === 'DE' ? -4 : 4 });
    });
  }, { clip: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '500px 760px' });
  const ms = box(mp, 0, 0, 1080, 1920, { zIndex: 1 }); ms.innerHTML = europeSvg();
  EP.forEach(q => {
    const pp = euPj(q.lo, q.la).map(Number);
    q.reg = ms.querySelector('.c' + q.k);
    q.pn = box(mp, pp[0] - 20, pp[1] - 56, 40, 56, { zIndex: 12 }); q.pn.innerHTML = pinSvg(RED);
    q.ln = box(mp, 0, 0, 1080, 1920, { zIndex: 11 }); q.ln.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M${pp[0]},${pp[1] - 28} L${q.l[0] + 90},${q.l[1] + 36}" stroke="${INK}" stroke-width="4" stroke-dasharray="8 6"/></svg>`;
    q.lb = el('div', mp, { left: px(q.l[0]), top: px(q.l[1]), fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', color: INK, background: q.col, border: `5px solid ${INK}`, borderRadius: '18px', padding: '2px 20px 6px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 14, whiteSpace: 'nowrap' }, q.txt);
  });
}

/* ======================================================================
   U2 · GOLPE ROSA: «…SE SALUDA COMO UN ESCLAVO» — la mano de la portada, ahora con grillete
   ====================================================================== */
colorHit(S.U2[0], S.U2[1], PINK, c => {
  const l0 = el('div', c, { left: 0, top: '240px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', color: INK, zIndex: 10 }, 'se saluda');
  const big = el('div', c, { left: 0, top: '360px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '128px', lineHeight: '140px', color: '#fff', textShadow: OUTL(INK, 9), zIndex: 10, whiteSpace: 'nowrap' }, 'como un<br>ESCLAVO');
  const hd = mkHand(c, 340, 700, 0.85, 8);
  hd.d.style.filter = 'brightness(0)';
  return t => {
    popA(l0, t, K.saluda9 - 0.05, { rise: 30 });
    const kb = p(t, K.como9 - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.como9 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.como9 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.esclavo9, 0.3) ? glitch(t, K.esclavo9, 0.3) + ', ' : '') + OUTL(INK, 9);
    set(hd.d, { r: WAVE(t), s: pop(t, S.U2[0], 0.3) });
    hd.shk.style.opacity = 1; hd.ringT.style.opacity = 1;
  };
});

/* ======================================================================
   U3 · CTA: «¿Y TÚ, CÓMO TE DESPIDES EN TU PAÍS? OS LEO.» — bocadillos vacíos que piden respuesta
   ====================================================================== */
{
  const QB = [];
  const c = scene(S.U3[0], S.U3[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(dHL, t, K.despides, 0.3);
    QB.forEach(q => { set(q.e, { s: pop(t, q.t, 0.3), r: q.r + Math.sin(t * 5 + q.t * 7) * 3, o: t < q.t ? 0 : 1 }); q.tx.textContent = t > q.t + 0.2 ? (Math.floor((t - q.t) * 3) % 2 ? '¿…?' : '???') : '…'; });
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: SEA2 });
  const mp = box(c, 0, 80, 1080, 1920, { zIndex: 2 }); mp.innerHTML = latamSvg();
  box(c, 0, 0, 1080, 1920, { zIndex: 3, background: 'rgba(239,225,198,.45)' });
  const l1 = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l2 = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const WD = []; const iq = find('y tu como te despides en tu pais');
  [['¿Y', l1], ['tú,', l1], ['cómo', l1], ['te', l2], ['despides', l2], ['en', l2], ['tu', l2], ['país?', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 4) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('despides', 'dhl', YEL); } else s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[iq + k].s }); });
  const dHL = c.querySelector('.dhl');
  // bocadillos sobre México, Caribe, Andes, Cono Sur y España (sin respuestas inventadas)
  const BP = [[300, 560, K.tu9], [740, 520, K.comoT], [560, 700, K.despides - 0.1], [330, 840, K.despides + 0.15], [660, 960, K.pais - 0.1], [470, 1100, K.pais + 0.1]];
  BP.forEach((q, i) => { const e = bubble(c, q[0], q[1], '', { size: 64, tail: i % 2 ? 'br' : 'bl', z: 25, pad: '4px 30px 10px', bg: i % 2 ? '#fff' : '#FFF3A8' }); const tx = document.createElement('span'); tx.textContent = '…'; e.insertBefore(tx, e.lastChild); QB.push({ e, tx, t: q[2], r: (i % 2 ? 1 : -1) * 5 }); });
  const ol = chip(c, 600, 1180, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 860, 1230, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BAL · MARCA: EL VECINO EN SU BALCÓN (última frase) — del Ep. 23
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
    // el Vecino asoma tras el libro y dice adiós con el abanico (rima con la mano de la portada)
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const vb = mk(bookW, [560, 330, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
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
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '700px', top: '560px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 25 · ¿Chao = adiós?</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
