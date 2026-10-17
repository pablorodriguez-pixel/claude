/* Ep. 14 · escenas L0–L3 (todo clavado por texto vía K) */

/* ======================================================================
   A · PORTADA / GANCHO — Ñ gigante con cara + monje asomando + ¿? + moneda
   Fotograma 0 = PREGUNTA (sin respuesta); el veredicto cae en «ahorrar»
   ====================================================================== */
headline(K.ahorrar0 - 0.14, S.A[1], 'Nació para *ahorrar*', { size: 120, hlT: K.ahorrar0, y: 196 });
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.06 * p(t, 0, 3.3, E.linear) });
    set(ry, { r: t * 9 });
    // título-portada: visible desde el fotograma 0, se va cuando cae la respuesta
    const tOut = p(t, K.ahorrar0 - 0.16, 0.14, E.inCubic);
    set(ttl, { o: 1 - tOut, y: -tOut * 40 + wobble(t, 0.4, 3), s: 1 });
    // la Ñ: idle + reacciones
    const happy = t > K.ahorrar0;
    const bob = happy ? -Math.abs(Math.sin(t * 13)) * 22 : wobble(t, 0.7, 6);
    set(en.d, { y: bob, r: happy ? Math.sin(t * 15) * 3 : wobble(t, 0.45, 2) - 2, s: 1 + 0.06 * pop(t, K.ene0, 0.3) - 0.06 * clamp(p(t, K.ene0, 0.3)) });
    const lookCoin = t < K.monjes - 0.1;
    eneFace(en, t, { look: happy ? [0, 0] : lookCoin ? [8, -7] : [10, 0], closed: happy, bL: lookCoin ? 10 : 6, bR: lookCoin ? 14 : 6, open: happy ? 0.6 + 0.3 * Math.abs(Math.sin(t * 16)) : (t > K.ene0 && t < K.nacio + 0.2 ? 0.45 : 0),
      aL: happy ? 75 + Math.sin(t * 20) * 12 : (lookCoin ? 70 + wobble(t, 1.1, 10) : 20), aR: happy ? 40 + Math.cos(t * 20) * 10 : 10 + wobble(t, 0.8, 6), seed: 0.6,
      tl: { y: -16 + wobble(t, 0.9, 12), r: wobble(t, 0.6, 7), x: wobble(t, 0.45, 6, 0.3) } });
    // monje asomando
    const up = p(t, K.monjes - 0.08, 0.4, E.outBack);
    set(mon.d, { x: -30 * up, y: 70 * (1 - up) + wobble(t, 0.6, 4), r: lerp(14, 4, up) });
    monkFace(mon, t, { look: t < K.monjes ? [-6, -4] : [-8, 2], bL: up > 0.5 ? 10 : 4, bR: up > 0.5 ? 10 : 4, jaw: t > K.querian - 0.1 && t < K.L0e ? 0.25 : 0, seed: 1.1 });
    set(qd, { r: 20 + Math.sin(t * 7) * 10, y: wobble(t, 0.8, 8) });
    QS.forEach((q, i) => set(q, { y: Math.sin(t * 3 + i * 2) * 14, r: [-12, 10][i] + Math.sin(t * 2 + i) * 5, s: 1, o: 1 - p(t, K.ahorrar0 - 0.1, 0.2) }));
    // moneda girando → cae en la hucha en «ahorrar»
    const kc = p(t, K.ahorrar0 + 0.12, 0.34, E.inCubic);
    set(coin, { sx: Math.cos(t * 5.5), x: lerp(0, SLOT[0] - 870, kc), y: lerp(wobble(t, 0.7, 10), SLOT[1] - 500, kc) - Math.sin(kc * Math.PI) * 120, o: t > K.ahorrar0 + 0.46 ? 0 : 1 });
    const kp = p(t, K.ahorrar0 - 0.06, 0.32, E.outBack);
    set(pig.d, { y: (1 - kp) * 700, r: -4 + (t > K.ahorrar0 + 0.46 ? Math.sin((t - K.ahorrar0) * 40) * 4 * (1 - p(t, K.ahorrar0 + 0.46, 0.4)) : 0), o: t < K.ahorrar0 - 0.06 ? 0 : 1 });
    face(pig, t, { look: [-4, -6], seed: 2 });
    stampA(dr, t, K.ahorrar0 + 0.3, -8, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 52%, rgba(255,230,0,.34), rgba(255,230,0,0) 58%)' });
  const ry = rays(cam, -170, 220, 1420, 26, 'rgba(255,230,0,.40)', 'rgba(0,0,0,0)', 0);
  const mon = mkMonk(cam, [560, 640, 470, 601]); mon.d.style.zIndex = 3;
  const qd = box(cam, 850, 780, 96, 288, { zIndex: 4, transformOrigin: '48px 280px' }); qd.innerHTML = quillSvg();
  const en = mkEne(cam, [70, 660, 470, 736], 'N'); en.d.style.zIndex = 6;
  const QS = [qMark2(cam, 50, 520, 170, PINK, '¿'), qMark2(cam, 880, 560, 150, PINK, '?')];
  QS[1].style.zIndex = 2;
  const coin = box(cam, 820, 450, 112, 112, { zIndex: 8 }); coin.innerHTML = coinSvg();
  const pig = mk(cam, [520, 1000, 400, 314], piggyInner(), '0 0 420 330', 'pig'); pig.d.style.zIndex = 7;
  const SLOT = [520 + 225 * 400 / 420 - 56 + 50, 1000 + 66 * 314 / 330 - 56];
  const dr = stamp(cam, 80, 1110, 'DATO REAL', { size: 92, bw: 12, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  // portada: la pregunta, en grande
  const ttl = el('div', cam, { left: '30px', top: '150px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.0, color: INK, zIndex: 50 });
  ttl.innerHTML = `¿Por qué la <span style="color:${RED}">Ñ</span><br>lleva ${hlSpan('<i>sombrero</i>', 'th')}?`;
  ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
}

/* ======================================================================
   B · «EN LOS NOVENTA, EUROPA CASI LA SACA DE TU TECLADO» — mano gigante
   ====================================================================== */
headline(S.B[0], K.europa1 - 0.08, 'En los *noventa*…', { size: 110, hlT: K.noventa });
headline(K.europa1 - 0.08, S.B[1], 'Europa casi la saca de *tu teclado*', { size: 84, hlT: K.teclado1 });
{
  const c = scene(S.B[0], S.B[1], t => {
    set(kb.wrap, { r: -6, y: (1 - p(t, S.B[0], 0.4, E.outBack)) * 600 + (t > K.saca && t < K.saca + 0.4 ? Math.sin(t * 60) * 8 : 0) });
    popA(c90, t, K.noventa, { r: -6 });
    const kf = pop(t, K.europa1, 0.45); set(flag.d, { s: kf, r: -6 + wobble(t, 0.6, 3), o: t < K.europa1 ? 0 : 1 });
    // mano: baja en «casi», pellizca y tira en «saca»
    const down = p(t, K.casi - 0.1, 0.42, E.outCubic), pull = p(t, K.saca, 0.38, E.inCubic);
    const hy = (1 - down) * -950 - pull * 900;
    set(hand.d, { y: hy, r: 8 - 8 * down + pull * -10, o: t < K.casi - 0.12 ? 0 : 1 });
    // la tecla Ñ sale despedida
    const gone = t > K.saca;
    const ft = Math.max(0, t - K.saca - 0.16);
    const fx = ft * 1500, fy = -pull * 900 - ft * ft * 0 - ft * 900;
    set(kb.enie, { x: gone ? fx : 0, y: gone ? fy : (t > K.casi + 0.3 ? Math.sin(t * 50) * 3 : 0), r: gone ? ft * 900 : 0, s: gone ? 1 + ft * 0.6 : 1, o: 1 });
    kb.kf.style.opacity = t > K.casi + 0.2 ? 1 : 0;
    SW.forEach((s, i) => set(s, { o: t > K.saca + 0.1 && t < K.saca + 0.7 ? 1 : 0, x: (t - K.saca) * 300, s: 1 }));
    // hueco vacío señalado
    set(ring, { s: pop(t, K.teclado1 - 0.05, 0.4), r: wobble(t, 0.8, 4), o: t < K.teclado1 - 0.05 ? 0 : 1 });
    popA(tt, t, K.tu, { r: 4 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DFC9', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const kb = mkKeyboard(c, 0, 0, { k: 150, g: 16, hiN: true, z: 5 });
  const NX = 26 + 0.32 * 150 + 9 * 166 + 75, NY = 26 + 166 + 75; // centro de la Ñ dentro del teclado
  kb.wrap.style.left = px(760 - NX); kb.wrap.style.top = px(920 - NY); kb.wrap.style.transformOrigin = `${NX}px ${NY}px`;
  const c90 = chip(c, 70, 430, 'años 90', { size: 64, bg: INK, color: YEL, z: 30 });
  const flag = mk(c, [60, 540, 360, 283], euFlagInner(), '0 0 420 330', 'flag'); flag.d.style.zIndex = 8;
  const hand = mk(c, [760 - 155, 830 - 666, 300, 675], handInner(), '0 0 400 900', 'hand'); hand.d.style.zIndex = 20;
  const SW = [[520, 600], [560, 680], [600, 760]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), width: '150px', height: '12px', background: INK, borderRadius: '6px', zIndex: 18, transform: 'rotate(-30deg)' }));
  const ring = box(c, 760 - 120, 920 - 120, 240, 240, { zIndex: 25, border: `10px dashed ${RED}`, borderRadius: '50%', boxShadow: `0 0 0 4px #fff` });
  const tt = chip(c, 420, 1150, '¡de tu teclado!', { size: 54, bg: PINK, z: 30 });
}

/* ======================================================================
   C · EDAD MEDIA — scriptorium: copiar a mano, pergamino CARÍSIMO
   ====================================================================== */
headline(K.los - 0.1, K.pergamino - 0.12, 'Libros copiados a *mano*', { size: 92, hlT: K.mano });
headline(K.pergamino - 0.12, S.C[1], 'Pergamino *carísimo*', { size: 104, hlT: K.carisimo });
{
  const LN = [];
  const c = scene(S.C[0], S.C[1], t => {
    const push = p(t, K.pergamino - 0.1, 1.0, E.inOutCubic);
    set(cam, { s: 1 + 0.08 * push + 0.02 * p(t, S.C[0], 5, E.linear) });
    const kr = p(t, K.L2 - 0.02, 0.5, E.outElastic);
    set(rib, { y: (1 - clamp(kr)) * -420 - p(t, K.los - 0.15, 0.2, E.inCubic) * 500, r: (1 - kr) * 6 + Math.sin(t * 2) * 1, o: t < K.L2 - 0.04 ? 0 : 1 });
    set(beam.beam, { o: 0.7 + 0.3 * Math.sin(t * 1.3) });
    // monje copiando
    const writing = t > K.copiaban - 0.1 && t < K.pergamino;
    const shock = t > K.carisimo;
    set(mon.d, { y: wobble(t, 0.5, 3) + (writing ? Math.abs(Math.sin(t * 9)) * -4 : 0) - (shock ? 14 * p(t, K.carisimo, 0.25, E.outBack) : 0) });
    monkFace(mon, t, { look: writing ? [4, 8] : shock ? [0, -3] : [6, 4], sweat: shock, bL: shock ? 14 : 2, bR: shock ? 14 : 2, jaw: shock ? 0.4 : 0, blink: !shock, seed: 0.4 });
    LN.forEach((l, i) => { const t0 = K.copiaban + i * 0.16; l.style.clipPath = `inset(0 ${f1((1 - p(t, t0, 0.22, E.linear)) * 100)}% 0 0)`; l.style.opacity = t < t0 ? 0 : 1; });
    const wi = clamp((t - K.copiaban) / 0.8), qx = writing ? 40 * Math.sin(t * 14) + wi * 120 : 120, qy = writing ? Math.abs(Math.sin(t * 14)) * -14 : -30;
    set(qd, { x: qx, y: qy, r: 18 + (writing ? Math.sin(t * 14) * 5 : 0) });
    set(hd, { x: qx, y: qy });
    BK.forEach((b, i) => { const t0 = K.libros + i * 0.1; set(b, { y: (1 - p(t, t0, 0.3, E.outBounce)) * -600, o: t < t0 ? 0 : 1, r: [2, -3, 4, -1][i] }); });
    popA(mn, t, K.mano, { r: -5 });
    // pergamino que se desenrolla + etiqueta
    const ks = p(t, K.pergamino, 0.45, E.outBack);
    set(scr.d, { sx: Math.max(0.02, ks), o: t < K.pergamino ? 0 : 1, r: -3 });
    const kt = p(t, K.carisimo - 0.05, 0.5, E.outElastic);
    set(tag, { r: (t < K.carisimo - 0.05 ? -90 : lerp(-70, 0, clamp(kt))) + Math.sin(t * 3.2) * 6 * p(t, K.carisimo + 0.4, 0.6), o: t < K.carisimo - 0.05 ? 0 : 1 });
    CO.forEach((q, i) => { const t0 = K.carisimo + 0.15 + i * 0.12; const k = clamp((t - t0) / 0.9); set(q, { y: k * k * 520, x: (i - 1) * 60 * k, sx: Math.cos(t * 7 + i), o: t < t0 || k >= 1 ? 0 : 1 }); });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '640px 820px' });
  const beam = scriptoriumBg(cam);
  const mon = mkMonk(cam, [290, 520, 540, 690]); mon.d.style.zIndex = 3;
  const desk = box(cam, 150, 1010, 860, 420, { zIndex: 4 }); desk.innerHTML = deskSvg(860);
  // libro abierto sobre la mesa
  const book = box(cam, 400, 950, 420, 130, { zIndex: 5, transform: 'rotate(-3deg)' });
  book.innerHTML = `<svg width="420" height="130" style="overflow:visible">${cut('<path d="M10,30 Q110,0 210,24 Q310,0 410,30 L404,124 Q310,100 210,124 Q110,100 16,124 Z"/>', 5, 6)}<path d="M10,30 Q110,0 210,24 Q310,0 410,30 L404,124 Q310,100 210,124 Q110,100 16,124 Z" fill="#FBF3DF" stroke="${INK}" stroke-width="4"/><path d="M210,24 V124" stroke="${INK}" stroke-width="3"/><rect x="34" y="34" width="34" height="34" fill="${RED}" stroke="${INK}" stroke-width="2.5"/></svg>`;
  [[78, 42, 110], [40, 62, 150], [40, 82, 150], [228, 36, 160], [228, 56, 160], [228, 76, 160], [228, 96, 120]].forEach(([x, y, w]) => LN.push(box(book, x, y, w, 8, { background: INK, borderRadius: '4px', opacity: 0.75 })));
  const hd = box(cam, 720, 906, 70, 54, { zIndex: 7, background: FIG, border: `4px solid ${INK}`, borderRadius: '30px 30px 24px 24px' });
  const qd = box(cam, 650, 700, 76, 228, { zIndex: 6 }); qd.innerHTML = quillSvg();
  const BK = [[140, 960, 170, 38, LEATHER], [128, 918, 186, 42, '#7a2a22'], [146, 880, 160, 38, '#3c5a3a'], [134, 838, 176, 42, LEATHER]].map(([x, y, w, h, col]) => box(cam, x, y, w, h, { zIndex: 5, background: col, border: `4px solid ${INK}`, borderRadius: '6px', boxShadow: `5px 5px 0 ${SH}`, backgroundImage: `linear-gradient(90deg, transparent 12%, ${BRASS} 12%, ${BRASS} 16%, transparent 16%, transparent 84%, ${BRASS} 84%, ${BRASS} 88%, transparent 88%)` }));
  const mn = chip(cam, 600, 1150, 'a mano ✍', { size: 56, bg: INK, color: YEL, z: 30 });
  const rib = box(c, 40, 170, 1000, 260, { zIndex: 600 });
  rib.innerHTML = `<svg width="1000" height="260" style="overflow:visible">${cut('<path d="M0,20 H1000 L960,125 L1000,230 H0 L40,125 Z"/>')}<path d="M0,20 H1000 L960,125 L1000,230 H0 L40,125 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M50,40 H950 M50,210 H950" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/></svg>`;
  el('div', rib, { left: '0', top: '58px', width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: '128px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `5px 5px 0 ${INK}` }, 'EDAD MEDIA');
  const scr = mk(cam, [60, 420, 600, 281], scrollInner(), '0 0 640 300', 'scroll'); scr.d.style.zIndex = 8; scr.d.style.transformOrigin = '300px 140px';
  const tag = priceTag(cam, 560, 560, 'CARÍSIMO', { w: 380, h: 150, size: 54, z: 9 });
  const CO = [0, 1, 2].map(i => { const d = box(cam, 700 + i * 50, 700, 80, 80, { zIndex: 9 }); d.innerHTML = coinSvg(); return d; });
}

/* ======================================================================
   C2 · ASÍ QUE ABREVIABAN TODO LO QUE PODÍAN — pergamino que encoge
   ====================================================================== */
headline(S.C2[0], K.todo - 0.08, 'Así que *abreviaban*…', { size: 88, hlT: K.abreviaban });
headline(K.todo - 0.08, S.C2[1], '…todo lo que *podían*', { size: 100, hlT: K.podian });
{
  const LETS = []; let measured = false;
  const c = scene(S.C2[0], S.C2[1], t => {
    if (!measured) { LETS.forEach(l => (l.w = l.e.offsetWidth)); measured = true; }
    set(pp.wrap, { y: (1 - p(t, S.C2[0], 0.4, E.outBack)) * 900, r: -1.5 + wobble(t, 0.4, 0.5) });
    LETS.forEach((l, i) => { if (!l.cut) return; const k = p(t, K.abreviaban + 0.12 + (i - 2) * 0.05, 0.25, E.inOutCubic); l.e.style.marginRight = px(f1(-l.w * k)); set(l.e, { sx: 1 - k, o: 1 - k, y: -k * 30 }); });
    tdraw(tw, t, K.abreviaban + 0.6, 0.3);
    LINES.forEach((l, i) => { const t0 = K.todo + i * 0.14; const k = p(t, t0, 0.3, E.inOutCubic); set(l.e, { sx: 1 - 0.48 * k }); set(l.m, { s: pop(t, t0 + 0.2, 0.3), o: t < t0 + 0.2 ? 0 : 1 }); l.free.style.opacity = k; });
    popA(sv, t, K.podian, { r: -6 });
    set(qd, { x: Math.sin(t * 6) * 20, y: Math.abs(Math.sin(t * 6)) * -16, r: 14 + Math.sin(t * 6) * 4 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const pp = paperPiece(c, 90, 420, 900, 660, { seed: 31, bg: '#F6EAD0' });
  const word = el('div', pp.inner, { left: '0', top: '40px', width: '882px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '150px', lineHeight: 1.1, color: INK, whiteSpace: 'nowrap' });
  [...'abreviaban'].forEach((ch, i) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.position = 'relative'; s.textContent = ch; word.appendChild(s); LETS.push({ e: s, cut: i >= 2 && i <= 8 }); });
  // rayita encima de la palabra abreviada
  const tw = box(pp.inner, 300, 20, 280, 80, { zIndex: 4 });
  tw.innerHTML = `<svg viewBox="0 0 280 80" width="280" height="80" style="overflow:visible"><path class="td" d="M20,56 C70,6 120,10 140,34 C160,58 210,66 260,16" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="400" stroke-dashoffset="400"/></svg>`;
  const LINES = [];
  [0, 1, 2, 3].forEach(i => {
    const y = 270 + i * 86;
    const free = box(pp.inner, 40 + 760 * 0.52, y - 6, 760 * 0.48, 44, { background: 'rgba(255,230,0,.55)', borderRadius: '8px', opacity: 0 });
    const e = box(pp.inner, 40, y, 760, 32, { transformOrigin: '0 50%' });
    let sc = ''; const r = rng(40 + i); for (let x = 0; x < 740;) { const ww = 30 + r() * 80; sc += `M${f1(x)},16 h${f1(ww)}`; x += ww + 16; }
    e.innerHTML = `<svg width="760" height="32"><path d="${sc}" stroke="${INK}" stroke-width="12" stroke-linecap="round" opacity=".7"/></svg>`;
    const m = el('div', pp.inner, { left: px(40 + 760 * 0.52 - 30), top: px(y - 48), fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: RED, zIndex: 3 }, '~');
    LINES.push({ e, m, free });
  });
  chip(pp.wrap, 640, -10, 'ejemplo', { size: 30, bg: '#fff', color: INK, z: 30 });
  const sv = stamp(c, 560, 960, '¡AHORRO!', { size: 84, bw: 11, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const qd = box(c, 860, 760, 80, 240, { zIndex: 30 }); qd.innerHTML = quillSvg();
}
function tdraw(boxEl, t, t0, d) { const pth = boxEl.querySelector('.td'); if (pth) pth.style.strokeDashoffset = f1(400 * (1 - p(t, t0, d, E.inOutCubic))); }

/* ======================================================================
   D1 · MOMENTO CLAVE: «nn» → una n se borra y sube como rayita → «ñ»
   ====================================================================== */
headline(S.D1[0], K.escribian - 0.06, 'Si una letra iba *doble*…', { size: 84, hlT: K.doble1 });
headline(K.escribian - 0.06, K.con - 0.06, '…escribían *solo una*', { size: 100, hlT: K.una });
headline(K.con - 0.06, S.D1[1], '…con una *rayita* encima', { size: 84, hlT: K.rayita });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(pp.wrap, { s: 1 + 0.03 * p(t, S.D1[0], 5, E.linear), r: -1 + wobble(t, 0.3, 0.4) });
    // trazo de las dos enes
    const d1 = p(t, K.letra, 0.5, E.inOutCubic), d2 = p(t, K.doble1, 0.5, E.inOutCubic);
    n1.style.strokeDashoffset = f1(2600 * (1 - d1)); n1.style.fillOpacity = p(t, K.letra + 0.3, 0.3); n1.style.opacity = t < K.letra ? 0 : 1;
    n2.style.strokeDashoffset = f1(2600 * (1 - d2)); n2.style.fillOpacity = p(t, K.doble1 + 0.3, 0.3); n2.style.opacity = t < K.doble1 ? 0 : 1;
    // «solo una»: la primera se centra; la segunda tiembla, sube y se aplasta en rayita
    const kc = p(t, K.una - 0.05, 0.5, E.inOutCubic);
    n1.setAttribute('transform', `translate(${f1(150 * kc)},0)`);
    const shk = t > K.solo && t < K.una ? Math.sin(t * 60) * 6 : 0;
    const ku = p(t, K.una - 0.05, 0.5, E.inOutCubic);
    const n2x = lerp(610, 460, ku), n2y = lerp(0, -330, ku), sx = lerp(1, 0.62, ku), sy = lerp(1, 0.14, ku);
    n2.setAttribute('transform', `translate(${f1(n2x + shk)},${f1(560 + n2y)}) scale(${f1(sx * 100) / 100},${f1(sy * 100) / 100}) translate(-460,-560)`);
    n2.style.opacity = t < K.doble1 ? 0 : 1 - p(t, K.rayita - 0.05, 0.25);
    // la rayita (tilde) se dibuja en «rayita»
    tl.style.strokeDashoffset = f1(900 * (1 - p(t, K.rayita - 0.05, 0.45, E.inOutCubic)));
    tl0.style.strokeDashoffset = tl.style.strokeDashoffset;
    popA(x2, t, K.doble1 + 0.1, { r: -8 }); x2.style.opacity = t < K.doble1 + 0.1 ? 0 : 1 - p(t, K.una - 0.1, 0.2);
    // pluma que escribe
    let qx = 310, qy = 300;
    if (t < K.doble1) { qx = 230 + 160 * d1; qy = 330 + Math.sin(d1 * 9) * 60; }
    else if (t < K.una) { qx = 530 + 160 * d2; qy = 330 + Math.sin(d2 * 9) * 60; }
    else { const kq = p(t, K.rayita - 0.05, 0.45, E.inOutCubic); qx = 323 + 255 * kq; qy = 190 + Math.sin(kq * 7) * 30; }
    set(qd, { x: qx, y: qy, r: 16, o: t < K.letra - 0.1 ? 0 : 1 });
    set(arr, { s: pop(t, K.encima, 0.35), y: Math.sin(t * 8) * 8, o: t < K.encima ? 0 : 1 });
    set(glow, { o: t > K.encima ? 1 : 0, s: pop(t, K.encima, 0.4), r: t * 12 });
  });
  sceneBg(c, { background: '#E3D3B1' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const glow = rays(c, 170, 420, 740, 22, 'rgba(255,230,0,.5)', 'rgba(0,0,0,0)', 1);
  const pp = paperPiece(c, 80, 420, 920, 780, { seed: 57, bg: '#F6EAD0' }); pp.wrap.style.zIndex = 3;
  const sv = box(pp.inner, 0, 0, 902, 762, { zIndex: 3 });
  sv.innerHTML = `<svg viewBox="0 0 920 780" width="902" height="762" style="overflow:visible">
    <path class="tl0" d="M330,182 C380,106 430,110 460,142 C490,174 540,182 590,106" stroke="#fff" stroke-width="64" fill="none" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>
    <path class="tl" d="M330,182 C380,106 430,110 460,142 C490,174 540,182 590,106" stroke="${INK}" stroke-width="44" fill="none" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>
    <text class="n1" x="310" y="560" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="470" fill="${INK}" stroke="${INK}" stroke-width="7" stroke-dasharray="2600" stroke-dashoffset="2600" style="fill-opacity:0">n</text>
    <text class="n2" x="460" y="560" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="470" fill="${INK}" stroke="${INK}" stroke-width="7" stroke-dasharray="2600" stroke-dashoffset="2600" style="fill-opacity:0">n</text></svg>`;
  const n1 = sv.querySelector('.n1'), n2 = sv.querySelector('.n2'), tl = sv.querySelector('.tl'), tl0 = sv.querySelector('.tl0');
  const x2 = chip(c, 690, 470, '× 2', { size: 70, bg: PINK, z: 30 });
  const arr = el('div', c, { left: '780px', top: '560px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: INK, background: YEL, border: `4px solid ${INK}`, borderRadius: '40px', padding: '4px 24px 8px', boxShadow: `5px 5px 0 ${INK}`, zIndex: 30, whiteSpace: 'nowrap' }, '↑ encima');
  arr.style.left = '700px'; arr.style.top = '520px';
  const qd = box(c, 0, 0, 80, 240, { zIndex: 40 }); qd.innerHTML = quillSvg(); qd.style.left = '40px'; qd.style.top = '140px';
}

/* ======================================================================
   D2 · LA DOBLE ENE → UNA ENE CON SOMBRERO → ¡LA EÑE!
   ====================================================================== */
headline(S.D2[0], K.acabo - 0.06, 'La *doble ene*…', { size: 110, hlT: K.doble2 });
headline(K.acabo - 0.06, K.la3 - 0.08, '…una ene con *sombrero*', { size: 86, hlT: K.sombrero });
headline(K.la3 - 0.08, S.D2[1], '¡La *eñe*!', { size: 150, hlT: K.ene4 });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(ry, { r: t * 10, o: 0.5 + 0.5 * p(t, K.ene4, 0.3) });
    const k1 = pop(t, S.D2[0] + 0.08, 0.4) * (1 + 0.12 * Math.sin(clamp((t - K.doble2) / 0.3) * Math.PI)), k2 = pop(t, S.D2[0] + 0.2, 0.4) * (1 + 0.12 * Math.sin(clamp((t - K.ene2) / 0.3) * Math.PI));
    const km = p(t, K.acabo, 0.9, E.inOutCubic);            // se juntan
    const merged = t > K.acabo + 0.85;
    const kc = p(t, K.acabo + 0.85, 0.4, E.outBack);          // la que queda va al centro
    const glow = t > K.ene4 ? 0.12 * (1 - p(t, K.ene4, 0.5)) : 0;
    set(b1.d, { x: 220 * kc, s: k1 * (1 + 0.1 * kc + glow), y: wobble(t, 0.6, 4) + (merged && t < K.acabo + 1.1 ? Math.sin(t * 40) * 6 : 0), r: -3 + wobble(t, 0.5, 2), o: t < S.D2[0] + 0.08 ? 0 : 1 });
    set(b2.d, { x: -440 * km, s: k2 * (1 - 0.15 * km), y: wobble(t, 0.6, 4, 0.5), r: 3 + km * -8, o: t < S.D2[0] + 0.2 || merged ? 0 : 1 });
    PF.forEach((f, i) => { const kf = p(t, K.acabo + 0.8, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 160 * kf, y: -kf * 80 + (i % 2) * 40 * kf, s: 0.5 + kf, o: t > K.acabo + 0.8 && kf < 1 ? 1 - kf : 0 }); });
    const lookUp = t > K.con2 - 0.3 && t < K.sombrero + 0.5;
    const proud = t > K.sombrero + 0.5;
    const kh = p(t, K.sombrero - 0.3, 0.6, E.outBounce);
    eneFace(b1, t, { look: lookUp ? [0, -10] : [6, -2], closed: proud && t < K.ene4 - 0.1, open: t > K.ene4 ? 0.7 : 0, bL: lookUp ? 14 : 6, bR: lookUp ? 14 : 6, aL: proud ? 60 + Math.sin(t * 12) * 10 : 15, aR: proud ? 60 + Math.cos(t * 12) * 10 : 15, seed: 0.2,
      tl: { y: lerp(-900, 0, kh) + (proud ? wobble(t, 0.8, 4) : 0), r: proud ? wobble(t, 0.6, 3) : -8 * (1 - kh), o: t < K.sombrero - 0.3 ? 0 : 1 } });
    eneFace(b2, t, { look: t > K.acabo ? [-10, 0] : [-4, -2], bL: 6, bR: 6, aL: 15, aR: 15, seed: 1.4 });
    popA(sb, t, K.sombrero + 0.2, { r: 6 });
    SP.forEach((s, i) => { const t0 = K.ene4 + i * 0.08; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#F1E5CB' });
  const ry = rays(c, -170, 260, 1420, 26, 'rgba(255,62,165,.16)', 'rgba(0,0,0,0)', 0);
  const b1 = mkEne(c, [100, 680, 400, 627], 'N', { noTilde: false }); b1.d.style.zIndex = 5;
  const b2 = mkEne(c, [560, 680, 400, 627], 'N', { noTilde: true }); b2.d.style.zIndex = 4;
  const PF = [0, 1, 2, 3].map(() => box(c, 470, 1020, 140, 90, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 6 }));
  const sb = chip(c, 690, 560, '↓ sombrero', { size: 52, bg: INK, color: YEL, z: 30 });
  const SP = [[220, 520], [820, 600], [900, 1000], [170, 1000], [520, 430]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '76px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
}
