/* Ep. 25 · escenas L0–L4 (todo clavado por texto vía K) */
const WAVE = t => Math.sin(t * Math.PI * 2 * 1.2) * 12; // mano diciendo adiós: ±12°, 1,2 ciclos/s
function mkHand(pa, x, y, sc = 1, z = 10) {
  const w = 400 * sc, h = 760 * sc;
  const d = box(pa, x, y, w, h, { zIndex: z, transformOrigin: `${200 * sc}px ${520 * sc}px` });
  d.innerHTML = svgW(waveHandInner(), '0 0 400 760');
  return { d, shk: d.querySelector('.shk'), ringT: d.querySelector('.ringT') };
}

/* ======================================================================
   A · PORTADA / GANCHO — mano gigante diciendo adiós + «¿CHAO = ADIÓS?» (pregunta, sin respuesta)
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, 0, 3.4, E.linear) });
    set(ry, { r: t * 9 });
    set(hd.d, { r: WAVE(t) + 4, y: wobble(t, 0.6, 4) });
    hd.shk.style.opacity = 0.32; hd.ringT.style.opacity = 0;
    set(l1, { r: -2 + wobble(t, 0.5, 0.8), s: 1 + 0.03 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3.2 + 1) });
    WL.forEach((q, i) => set(q, { x: Math.sin(t * 7.5 + i) * 6 + (i ? 1 : -1) * 18 * Math.abs(Math.sin(t * Math.PI * 1.2)), o: 0.85, r: (i ? 1 : -1) * 8 }));
    // en «promesa» cae el lazo rosa con «?» (aún no hay veredicto)
    const kr = p(t, K.promesa0 - 0.04, 0.4, E.outBack);
    set(rib, { y: (1 - kr) * -700, r: -8 + Math.sin(t * 5) * 3 * kr, o: t < K.promesa0 - 0.04 ? 0 : 1 });
    set(bubA, { s: pop(t, K.adios - 0.05, 0.35), r: -4 + wobble(t, 0.6, 1.5), o: t < K.adios - 0.05 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 62%, rgba(255,230,0,.42), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 120, 1400, 26, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  const l1 = BIGT(cam, 0, 300, 1080, `¿${hlSpan('CHAO', 'hc0')}`, { fontSize: '200px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  l1.querySelector('.hc0').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const l2 = BIGT(cam, 0, 520, 1080, '= ADIÓS?', { fontSize: '168px', textShadow: `8px 8px 0 rgba(43,33,24,.25)`, zIndex: 40 });
  const hd = mkHand(cam, 310, 690, 1.15, 10);
  const WL = [0, 1].map(i => { const e = box(cam, i ? 800 : 120, 860, 150, 160, { zIndex: 9 }); e.innerHTML = `<svg width="150" height="160" style="overflow:visible"><path d="${i ? 'M20,20 Q70,80 20,140 M70,0 Q130,80 70,160' : 'M130,20 Q80,80 130,140 M80,0 Q20,80 80,160'}" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`; return e; });
  const rib = box(cam, 670, 1010, 260, 230, { zIndex: 30 });
  rib.innerHTML = `<svg viewBox="0 0 260 230" width="260" height="230" style="overflow:visible">${cut('<path d="M130,90 C80,10 10,30 30,90 C46,130 100,110 130,90 Z M130,90 C180,10 250,30 230,90 C214,130 160,110 130,90 Z M110,100 L70,220 L110,196 L130,226 L140,110 Z M150,100 L190,220 L150,196 L130,226 Z"/>', 5, 7)}<path d="M110,100 L70,220 L110,196 L130,226 L140,110 Z M150,100 L190,220 L150,196 L130,226 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><path d="M130,90 C80,10 10,30 30,90 C46,130 100,110 130,90 Z M130,90 C180,10 250,30 230,90 C214,130 160,110 130,90 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><circle cx="130" cy="92" r="26" fill="${PINK}" stroke="${INK}" stroke-width="5"/><text x="130" y="108" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="#fff" stroke="${INK}" stroke-width="2">?</text></svg>`;
  const bubA = bubble(cam, 70, 800, '¿adiós…?', { size: 62, it: true, tail: 'br', z: 35 });
}

/* ======================================================================
   B · «UNA PROMESA QUE HOY NO LE HARÍAS…» — el pergamino PROMETO y la pluma
   ====================================================================== */
headline(S.B[0], S.B[1], 'Una *promesa* que hoy no le harías…', { size: 84, hlT: K.promesa1 });
{
  const c = scene(S.B[0], S.B[1], t => {
    const k = p(t, S.B[0], 0.4, E.outBack);
    set(sc.d, { y: (1 - k) * 900, r: lerp(10, -3, k) + wobble(t, 0.4, 0.6), s: 1 + 0.04 * p(t, S.B[0], 2, E.linear) });
    const wr = t > K.promesa1 && t < K.harias + 0.3;
    set(ql, { x: wr ? Math.sin(t * 18) * 14 : 0, y: wr ? Math.cos(t * 18) * 8 : 0, r: 18, s: pop(t, S.B[0] + 0.1, 0.4), o: t < S.B[0] + 0.1 ? 0 : 1 });
    set(qm, { s: pop(t, K.harias, 0.35), r: 10 + Math.sin(t * 6) * 8, o: t < K.harias ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const sc = mk(c, [270, 420, 600, 700], scrollInner(), '0 0 600 700', 'scroll'); sc.d.style.zIndex = 5;
  const ql = box(c, 700, 860, 140, 280, { zIndex: 8 }); ql.innerHTML = quillSvg();
  const qm = qMark(c, 760, 430, 170, PINK);
}

/* ======================================================================
   C · «…NI A TU JEFE. NI POR UN AUMENTO.» — el jefe del puro + la moneda
   ====================================================================== */
headline(S.C[0], K.ni2 - 0.06, 'Ni a *tu jefe*', { size: 110, hlT: K.jefe });
headline(K.ni2 - 0.06, S.C[1], 'Ni por *un aumento*', { size: 100, hlT: K.aumento });
{
  const c = scene(S.C[0], S.C[1], t => {
    set(boss.d, { s: pop(t, S.C[0] + 0.02, 0.45), y: wobble(t, 0.5, 3), o: t < S.C[0] + 0.02 ? 0 : 1 });
    const brow = t > K.jefe + 0.05 && t < K.jefe + 1.1;
    face(boss, t, { look: t > K.aumento ? [-6, 6] : [6, -2], bL: brow ? 4 : 0, bR: brow ? 22 : 0, seed: 0.9 });
    // moneda que cae y rebota en la mesa
    const tc = K.aumento - 0.12, kc = p(t, tc, 0.55, E.outBounce);
    set(coin, { y: lerp(-900, 0, kc), r: t > tc ? (t - tc) * 500 * (1 - p(t, tc + 0.5, 0.3)) : 0, o: t < tc ? 0 : 1 });
    set(shine, { o: t > tc + 0.5 ? 1 : 0, r: t * 120, s: 1 + 0.2 * Math.sin(t * 10) });
    popA(nope, t, K.aumento + 0.45, { r: -8 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(c, -160, 160, 1400, 24, 'rgba(255,255,255,.2)', 'rgba(0,0,0,0)', 0);
  const boss = mk(c, [330, 420, 520, 664], bossInner(), '0 0 360 460', 'bust'); boss.d.style.zIndex = 4;
  const dk = box(c, 320, 1060, 620, 160, { zIndex: 6 }); dk.innerHTML = deskSvg(620, 160);
  el('div', dk, { left: '0', top: '60px', width: '620px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: GOLD, textShadow: `3px 3px 0 ${INK}` }, 'EL JEFE');
  const coin = box(c, 640, 930, 140, 140, { zIndex: 8 }); coin.innerHTML = coinSvg();
  const shine = el('div', c, { left: '760px', top: '900px', fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 9 }, '✦');
  const nope = stamp(c, 420, 880, '¡NI ASÍ!', { size: 64, bw: 9, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   D · «VIENE DE VENECIA. ALLÍ SE SALUDABAN CON "S-CIÀO VOSTRO"» — Gran Canal y gondolero
   ====================================================================== */
headline(S.D[0], K.alli - 0.06, 'Viene de *Venecia*', { size: 112, hlT: K.venecia, y: 200 });
headline(K.alli - 0.06, S.D[1], 'Allí se *saludaban* con…', { size: 72, hlT: K.saludaban, y: 210 });
{
  const c = scene(S.D[0], S.D[1], t => {
    const tl = t - S.D[0];
    set(far, { x: -tl * 22 });
    set(wat, { x: -((tl * 40) % 60) });
    const kz = p(t, K.eschao1 - 0.15, 0.5, E.inOutCubic);
    set(cam, { s: lerp(1, 1.15, kz) });
    const gx = lerp(-520, 60, p(t, S.D[0], 1.4, E.outCubic)) + tl * 18;
    set(gW, { x: gx, y: Math.sin(t * 2.6) * 8, r: Math.sin(t * 2.6 + 0.6) * 1.4 });
    const tip = p(t, K.saludaban - 0.1, 0.3, E.outBack) * (1 - p(t, K.saludaban + 0.6, 0.3));
    set(gd.d, { r: -tip * 8, y: wobble(t, 0.7, 3) });
    face(gd, t, { look: t > K.eschao1 - 0.2 ? [8, -2] : [4, 0], jaw: t > K.eschao1 && t < K.vostro1 + 0.45 ? talkW(t, 'VECINO') : 0, bL: 6, bR: 6, seed: 2 });
    set(oar, { r: Math.sin(t * 2.6) * 8 - 6 });
    set(bub, { s: pop(t, K.eschao1 - 0.03, 0.35), r: -3 + wobble(t, 0.6, 1), o: t < K.eschao1 - 0.03 ? 0 : 1 });
    BW.forEach(b => set(b.e, { o: t > b.t - 0.05 ? 1 : 0.18, y: t > b.t - 0.05 ? 0 : 6 }));
    popA(chV, t, K.venecia, { r: -4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #F2D9B8 0%, #EADFC8 60%)' });
  const far = box(cam, 0, 0, 1180, 1920, { zIndex: 1 }); far.innerHTML = veniceSvg();
  const wat = box(cam, 0, 0, 1180, 1920, { zIndex: 2 }); wat.innerHTML = waterSvg(1080, 440, 5);
  const gW = box(cam, 0, 0, 1080, 1920, { zIndex: 5 });
  const oar = box(gW, 560, 640, 40, 640, { zIndex: 3, transformOrigin: '20px 120px' });
  oar.innerHTML = `<svg width="40" height="640" style="overflow:visible"><path d="M20,0 V600" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M20,0 V600" stroke="${WOOD}" stroke-width="8" stroke-linecap="round"/><path d="M6,560 Q20,660 34,560 Z" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const gd = mk(gW, [330, 640, 360, 460], gondolierInner(), '0 0 360 460', 'bust'); gd.d.style.zIndex = 4;
  const gon = mk(gW, [20, 980, 900, 220], gondolaInner(), '0 0 900 220', 'gon'); gon.d.style.zIndex = 6;
  const bub = bubble(cam, 160, 470, '', { size: 60, tail: 'bl', z: 40, font: 'Rye', fw: 400, pad: '14px 40px 18px' });
  const BW = []; [['«S-CIÀO', K.eschao1], ['VOSTRO»', K.vostro1]].forEach(([s, tt], i) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.12em'; e.style.position = 'relative'; e.textContent = s; bub.insertBefore(e, bub.lastChild); BW.push({ e, t: tt }); });
  const chV = chip(cam, 640, 380, 'Venecia, Italia', { size: 44, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   F · «SIGNIFICA: "SOY SU ESCLAVO"» — traducción + SELLO «ESCLAVO» cuando lo dice la voz
   ====================================================================== */
headline(S.F[0], S.F[1], '*Significa:*', { size: 110, hlT: K.significa });
{
  const c = scene(S.F[0], S.F[1], t => {
    set(ry, { r: t * 10 });
    set(b1, { s: 0.82 + 0.18 * pop(t, S.F[0], 0.35), r: -3 + wobble(t, 0.6, 0.8), o: 1 });
    set(arr, { o: t > K.soy2 - 0.2 ? 1 : 0, y: Math.sin(t * 8) * 6 });
    TW.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    stampA(stE, t, K.esclavo1, -7, 1);
    set(gd.d, { s: pop(t, S.F[0] + 0.1, 0.4), r: t > K.esclavo1 ? -16 * p(t, K.esclavo1, 0.3, E.outBack) : 0, y: t > K.esclavo1 ? 30 * p(t, K.esclavo1, 0.3) : 0, o: t < S.F[0] + 0.1 ? 0 : 1 });
    face(gd, t, { look: [-6, 4], closed: t > K.esclavo1, bL: 10, bR: 10, seed: 3 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -160, 260, 1400, 24, 'rgba(200,16,46,.07)', 'rgba(0,0,0,0)', 0);
  const b1 = bubble(c, 140, 420, '«S-CIÀO VOSTRO»', { size: 66, tail: 'bl', z: 20, font: 'Rye', fw: 400, pad: '14px 40px 18px' });
  const arr = box(c, 480, 560, 120, 160, { zIndex: 21 }); arr.innerHTML = `<svg width="120" height="160" style="overflow:visible"><path d="M60,6 V120 M24,90 L60,134 L96,90" stroke="${INK}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M60,6 V120 M24,90 L60,134 L96,90" stroke="${PINK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const tr = BIGT(c, 0, 740, 1080, '', { fontSize: '130px', fontStyle: 'italic', zIndex: 22 });
  const TW = []; [['«soy', K.soy2], ['su…»', K.su2]].forEach(([s, tt]) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.14em'; e.textContent = s; tr.appendChild(e); TW.push({ e, t: tt }); });
  const stE = stamp(c, 120, 900, 'ESCLAVO', { size: 150, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const gd = mk(c, [640, 1060, 300, 383], gondolierInner(), '0 0 360 460', 'bust'); gd.d.style.zIndex = 10;
}

/* ======================================================================
   G · «SE DIJO TANTO…» — una tormenta de bocadillos «s-ciào vostro»
   ====================================================================== */
headline(S.G[0], S.G[1], 'Se dijo *tanto*…', { size: 116, hlT: K.tanto });
{
  const BB = [];
  const c = scene(S.G[0], S.G[1], t => {
    BB.forEach(b => set(b.e, { s: pop(t, b.t, 0.25) * b.s, r: b.r + Math.sin(t * 6 + b.t * 9) * 2, o: t < b.t ? 0 : 1 }));
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const r = rng(91);
  const SP = [[300, 400], [80, 520], [440, 560], [200, 660], [70, 800], [430, 760], [360, 900], [420, 1060], [380, 1200], [100, 940], [460, 440], [450, 1150]];
  const span = (K.se3 - 0.1) - (S.G[0] + 0.02);
  SP.forEach((q, i) => {
    const e = bubble(c, q[0], q[1], '«s-ciào vostro»', { size: 40, tail: i % 2 ? 'br' : 'bl', z: 20 + i, font: 'Rye', fw: 400, pad: '8px 24px 12px', bg: i % 4 === 3 ? '#FFF3A8' : '#fff' });
    BB.push({ e, t: S.G[0] + 0.02 + span * Math.pow(i / SP.length, 0.8), s: 0.8 + r() * 0.35, r: (r() - 0.5) * 14 });
  });
}

/* ======================================================================
   H · «…SE GASTÓ: DE "S-CIÀO VOSTRO" A "CIAO"» — la palabra se erosiona como piedra
   ====================================================================== */
headline(S.H[0], K.a3 - 0.05, '…que se *gastó*', { size: 112, hlT: K.gasto });
headline(K.a3 - 0.05, S.H[1], 'y quedó *«ciao»*', { size: 112, hlT: K.ciao });
{
  const LT = [];
  const c = scene(S.H[0], S.H[1], t => {
    const k = p(t, S.H[0], 0.35, E.outBack);
    set(slab, { y: (1 - k) * 700, r: -1.5 + wobble(t, 0.4, 0.4) + (t > K.gasto && t < K.gasto + 0.3 ? Math.sin(t * 70) * 1.2 : 0) });
    crkP.style.strokeDashoffset = f1(1000 * (1 - p(t, K.gasto, 0.4)));
    const kp = LT.filter(L => L.keep), mid = (kp[0].e.offsetLeft + kp[3].e.offsetLeft + kp[3].e.offsetWidth) / 2;
    LT.forEach(L => {
      let x = 0, y = 0, r = 0, o = 1, s = 1;
      if (L.fall != null && t > L.fall) { const tf = t - L.fall; y = 2600 * tf * tf; r = L.rs * tf; x = L.dx * tf; o = clamp(1 - tf * 1.2); }
      if (L.keep) { const km = p(t, K.ciao - 0.08, 0.3, E.inOutCubic); x = km * (470 - mid) * 1.0 + km * (L.e.offsetLeft + L.e.offsetWidth / 2 - mid) * 0.35; y = km * 70; s = 1 + 0.35 * km; }
      set(L.e, { x, y, r, o, s });
      L.e.style.color = L.keep && t > K.ciao ? RED : INK;
    });
    if (acc) set(acc, { y: t > K.a3 ? 2400 * Math.pow(t - K.a3, 2) : 0, r: t > K.a3 ? (t - K.a3) * 400 : 0, o: t > K.a3 + 0.6 ? 0 : 1 });
    DU.forEach((d, i) => { const t0 = [K.gasto, K.vostro2 + 0.1, K.a3][i % 3] + i * 0.03; const kd = p(t, t0, 0.7, E.outCubic); set(d, { x: (i % 2 ? 1 : -1) * kd * (60 + i * 14), y: -kd * 50 + kd * kd * 120, s: 0.4 + kd, o: t > t0 && kd < 1 ? 1 - kd : 0 }); });
    set(arrH, { o: t > K.de3 ? 1 : 0, x: Math.sin(t * 7) * 8 });
  }, { clip: true });
  sceneBg(c, { background: '#D8D6C4', backgroundImage: 'linear-gradient(180deg, #C9CCC6 0%, #E1DCCB 70%)' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const slab = romanSlab(c, 70, 520, 940, 420, { seed: 23, z: 4 });
  const crk = el('div', slab, { left: 0, top: 0, width: '940px', height: '420px', zIndex: 6 });
  crk.innerHTML = `<svg width="940" height="420" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M120,20 L180,120 L150,200 L230,300 L210,400 M640,10 L600,130 L690,210 L650,330 L720,410 M420,20 L440,90 L400,150" stroke="${INK}" stroke-width="5" fill="none"/></svg>`;
  const crkP = crk.querySelector('path');
  const row = el('div', slab, { left: '0', top: '120px', width: '940px', textAlign: 'center', fontFamily: 'Rye', fontSize: '90px', lineHeight: '170px', color: INK, whiteSpace: 'nowrap', zIndex: 8 });
  const word = 'S-CIÀO VOSTRO';
  const fallAt = i => i <= 1 ? K.a3 + 0.02 + i * 0.05 : i >= 7 ? K.vostro2 + (i - 7) * 0.06 : (i === 6 ? K.vostro2 : null);
  let acc = null;
  [...word].forEach((ch, i) => {
    const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.position = 'relative';
    if (ch === ' ') { e.innerHTML = '&nbsp;'; }
    else if (ch === 'À') { e.innerHTML = 'A<span class="acc" style="position:absolute;left:30%;top:-26px;display:inline-block">`</span>'; acc = e.querySelector('.acc'); }
    else e.textContent = ch;
    row.appendChild(e);
    LT.push({ e, keep: i >= 2 && i <= 5, fall: fallAt(i), rs: (i % 2 ? 1 : -1) * (160 + i * 20), dx: (i % 2 ? 1 : -1) * 80 });
  });
  const arrH = el('div', c, { left: '0', top: '965px', width: '1080px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '54px', color: INK, zIndex: 9 }, 's-ciào vostro  →  ciao');
  const DU = []; for (let i = 0; i < 9; i++) DU.push(box(c, 380 + (i % 3) * 140, 640 + (i % 2) * 120, 70, 50, { borderRadius: '50%', background: '#cfc6b2', border: `3px solid ${INK}`, zIndex: 9 }));
}

/* ======================================================================
   I · «Y SALTÓ AL ESPAÑOL: "CHAO"» — la cadena del grillete se suelta y forma C·H·A·O
   ====================================================================== */
headline(S.I[0], S.I[1], 'Y saltó *al español*', { size: 104, hlT: K.espanol });
{
  const LK = [];
  const c = scene(S.I[0], S.I[1], t => {
    set(ry, { r: t * 8 });
    const free = t > K.chao4 - 0.1;
    set(hd.d, { s: pop(t, S.I[0], 0.35), r: free ? WAVE(t) : wobble(t, 0.6, 2), y: wobble(t, 0.7, 4), o: 1 });
    hd.shk.style.opacity = 1; hd.ringT.style.opacity = 1;
    set(shk2, { o: 0 });
    LK.forEach((L, i) => {
      const t0 = L.t, kf = p(t, t0, 0.42, E.inOutCubic);
      const sx = 530, sy = 1180 + i * 0;
      const x = lerp(L.hx, L.tx, kf), y = lerp(L.hy, L.ty, kf) - Math.sin(kf * Math.PI) * 260;
      set(L.ln, { x: x - L.bx, y: y - L.by, r: kf * 360 + (t < t0 ? Math.sin(t * 5 + i) * 8 : 0), s: lerp(1, 0.6, kf), o: kf < 1 ? 1 : 0 });
      const kl = p(t, t0 + 0.38, 0.3, E.outBack);
      set(L.lt, { s: t < t0 + 0.38 ? 0 : kl * (t > K.chao4 ? 1 + 0.12 * (1 - p(t, K.chao4, 0.35)) : 1), r: L.r, o: t < t0 + 0.38 ? 0 : 1 });
      L.lt.style.background = t > K.chao4 ? YEL : '#fff';
      void sx; void sy;
    });
    // el grillete se abre y cae cuando suena «chao»
    const kd = t > K.chao4 ? t - K.chao4 : 0;
    hd.shk.setAttribute('transform', `translate(0 ${f1(kd * kd * 3000)}) rotate(${f1(kd * 90)} 200 500)`);
    hd.shk.style.opacity = kd > 0.5 ? 0 : 1;
    set(spk, { o: t > K.chao4 ? 1 : 0, s: 1 + 0.2 * Math.sin(t * 12), r: t * 90 });
    popA(free1, t, K.chao4 + 0.15, { r: -6 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DFC6' });
  const ry = rays(c, -160, 360, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const hd = mkHand(c, 380, 640, 0.82, 10);
  const shk2 = box(c, 0, 0, 1, 1);
  // eslabones colgando del grillete (muñeca de la mano en ~ 544,1067)
  const TX = [150, 340, 530, 720];
  const ord = [K.salto, K.salto + 0.18, K.espanol - 0.05, K.espanol + 0.15];
  'CHAO'.split('').forEach((ch, i) => {
    const hx = 520 + (i % 2 ? 26 : -26), hy = 1140 + i * 70;
    const ln = box(c, hx - 50, hy - 70, 100, 140, { zIndex: 12 }); ln.innerHTML = linkSvg();
    const lt = el('div', c, { left: px(TX[i]), top: '420px', width: '170px', height: '190px', lineHeight: '190px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: INK, background: '#fff', border: `7px solid ${INK}`, borderRadius: '50px', boxShadow: `8px 9px 0 ${SH}`, zIndex: 14 }, ch);
    LK.push({ ln, lt, hx, hy, bx: hx, by: hy, tx: TX[i] + 85, ty: 515, t: ord[i], r: [-6, 4, -3, 7][i] });
  });
  const spk = el('div', c, { left: '880px', top: '380px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '✦');
  const free1 = chip(c, 600, 680, '¡libre!', { size: 54, bg: PINK, z: 20 });
}

/* ======================================================================
   J · «O "CHAU", SI ERES DE ARGENTINA O URUGUAY» — mapa con chinchetas CHAO / CHAU
   ====================================================================== */
const MAPPINS = {
  es: { p: [800, 496], l: [480, 430], txt: 'CHAO' }, co: { lo: -74, la: 4.6, l: [330, 600], txt: 'CHAO' }, ve: { lo: -66.9, la: 8, l: [720, 520], txt: 'CHAO' },
  pe: { lo: -76, la: -10, l: [190, 780], txt: 'CHAO' }, cl: { lo: -71, la: -33, l: [230, 930], txt: 'CHAO' },
  ar: { lo: -64, la: -34, l: [610, 1080], txt: 'CHAU' }, uy: { lo: -56, la: -33, l: [720, 930], txt: 'CHAU' },
  mx: { lo: -101, la: 22, l: [130, 470], txt: '' },
};
function mapPins(pa, keys, o = {}) {
  const out = {};
  keys.forEach(k => {
    const m = MAPPINS[k]; const pp = m.p || laPj(m.lo, m.la).map(Number);
    const pn = box(pa, pp[0] - 22, pp[1] - 60, 44, 60, { zIndex: 12 }); pn.innerHTML = pinSvg(o.col ? o.col(k) : (m.txt === 'CHAU' ? PINK : RED));
    const ln = box(pa, 0, 0, 1080, 1920, { zIndex: 11 }); ln.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M${pp[0]},${pp[1] - 30} L${m.l[0] + 70},${m.l[1] + 34}" stroke="${INK}" stroke-width="4" stroke-dasharray="8 6"/></svg>`;
    const lb = o.label ? o.label(pa, k, m) : el('div', pa, { left: px(m.l[0]), top: px(m.l[1]), fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', color: INK, background: m.txt === 'CHAU' ? PINK : YEL, border: `5px solid ${INK}`, borderRadius: '18px', padding: '2px 18px 6px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 14, whiteSpace: 'nowrap' }, m.txt);
    out[k] = { pn, ln, lb };
  });
  return out;
}
headline(S.J[0], S.J[1], 'O *«chau»*…', { size: 120, hlT: K.chau4 });
{
  const T = { es: K.o4 + 0.0, co: K.o4 + 0.1, ve: K.o4 + 0.2, pe: K.o4 + 0.3, cl: K.o4 + 0.4, ar: K.argentina, uy: K.uruguay };
  const c = scene(S.J[0], S.J[1], t => {
    set(mp, { s: 1 + 0.03 * p(t, S.J[0], 2.4, E.linear) });
    Object.keys(T).forEach(k => {
      const q = PN[k], t0 = T[k];
      set(q.pn, { y: (1 - p(t, t0, 0.25, E.outBounce)) * -120, o: t < t0 ? 0 : 1 });
      q.ln.style.opacity = t > t0 + 0.1 ? 1 : 0;
      popA(q.lb, t, t0 + 0.08, { r: k === 'ar' || k === 'uy' ? -5 : 3 });
    });
    popA(nmA, t, K.argentina + 0.05, { r: -3 }); popA(nmU, t, K.uruguay + 0.05, { r: 3 });
  }, { clip: true });
  sceneBg(c, { background: SEA2, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 800px' });
  box(mp, 0, 0, 1080, 1920, { zIndex: 1 }).innerHTML = latamSvg();
  const PN = mapPins(mp, ['es', 'co', 've', 'pe', 'cl', 'ar', 'uy']);
  const nmA = el('div', mp, { left: '612px', top: '1150px', fontFamily: 'Rye', fontSize: '30px', color: INK, zIndex: 15, background: 'rgba(251,246,234,.92)', padding: '2px 10px', borderRadius: '8px' }, 'Argentina');
  const nmU = el('div', mp, { left: '722px', top: '1000px', fontFamily: 'Rye', fontSize: '30px', color: INK, zIndex: 15, background: 'rgba(251,246,234,.92)', padding: '2px 10px', borderRadius: '8px' }, 'Uruguay');
}
