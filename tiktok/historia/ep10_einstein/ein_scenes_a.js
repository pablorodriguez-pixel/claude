/* Ep. 10 · escenas L0–L5 (todo clavado por texto a words.js vía K) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 34px 12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 72), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');

/* ======================================================================
   A · GANCHO / PORTADA — Einstein gigante + examen con «0» + «¡FALSO!»
   ====================================================================== */
headline(K.colado - 0.12, S.A[1], 'Te lo han *colado* toda la vida', { size: 84, hlT: K.colado, y: 200 });
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, 0, 4.8, E.linear) });
    const shk = (t > K.no1 && t < K.no1 + 0.25) || (t > K.no2 && t < K.no2 + 0.25);
    set(ein.d, { x: shk ? Math.sin(t * 50) * 10 : 0, y: wobble(t, 0.6, 4), r: shk ? Math.sin(t * 50) * 2 : 0 });
    const angry = t > K.nunca - 0.05;
    einFace(ein, t, { look: angry ? [0, 0] : [6, 4], ang: angry ? 14 : 0, bL: angry ? -4 : 6, bR: angry ? -4 : 6, mad: t > K.colado, jaw: shk ? 0.3 : 0, finger: false, seed: 0.4 });
    // título-portada (visible desde el fotograma 1)
    const tOut = p(t, K.colado - 0.12, 0.12, E.inCubic);
    set(ttl, { o: 1 - tOut, y: -tOut * 30 });
    strike.style.transform = `scaleX(${t < 0 ? 1 : 1}) rotate(-2deg)`;
    set(ins, { s: pop(t, K.nunca, 0.35), r: -6, o: t < K.nunca ? 0 : 1 });
    // ¡FALSO! — ya puesto en el fotograma 1 y re-golpea en «no!»
    const kf = t < K.no2 ? 0 : p(t, K.no2, 0.16);
    set(fal, { s: (t < K.no2 ? 1 : lerp(1.35, 1, kf)) * (1 - 0.42 * p(t, K.vida - 0.2, 0.25, E.inOutCubic)), r: -10, x: p(t, K.vida - 0.2, 0.25, E.inOutCubic) * -60, y: p(t, K.vida - 0.2, 0.25, E.inOutCubic) * -40, o: 0.97 });
    // el «0» se tacha con tinta
    scr.style.strokeDashoffset = f1(1000 * (1 - p(t, K.susp0, 0.7, E.inOutCubic)));
    set(exam.wrap, { r: 6 + wobble(t, 0.5, 0.6), y: wobble(t, 0.7, 3, 1) });
    stampA(mito, t, K.vida, -8, 1);
    chalkL.forEach((q, i) => set(q, { o: 1, r: [-4, 3][i] }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.30), rgba(255,230,0,0) 58%)' });
  rays(cam, -170, 260, 1420, 26, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  chalkboard(cam, 70, 470, 940, 470, 2);
  const chalkL = [chalk(cam, 560, 520, 'E = mc²', 104), chalk(cam, 140, 540, '∫ dx', 80, { opacity: .7 })];
  const ein = mkEin(cam, [70, 560, 600, 767]); ein.d.style.zIndex = 4;
  const exam = examPaper(cam, 575, 800, 360, 470, { title: 'MATEMÁTICAS', tsz: 42, name: 'A. Einstein', seed: 7 });
  exam.wrap.style.zIndex = 6;
  const z0 = box(exam.inner, 60, 150, 220, 264, { zIndex: 4 }); z0.innerHTML = ZERO(30);
  const sw = box(exam.inner, 30, 150, 280, 270, { zIndex: 5 }); sw.innerHTML = SCRIB; const scr = sw.querySelector('.sc');
  const fal = stamp(cam, 120, 470, '¡FALSO!', { size: 130, bw: 16, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const mito = stamp(cam, 190, 820, 'MITO', { size: 210, bw: 18, z: 70, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  // portada: la creencia tachada
  const ttl = el('div', cam, { left: '40px', top: '180px', width: '1000px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1.0, color: INK, zIndex: 50 });
  ttl.innerHTML = `Einstein <span style="position:relative;display:inline-block">suspendió<span class="stk" style="position:absolute;left:-12px;right:-12px;top:50%;height:16px;background:${RED};border-radius:8px;transform-origin:left center"></span></span><br>${hlSpan('<i>matemáticas</i>', 'th')}`;
  const strike = ttl.querySelector('.stk'); ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const ins = el('div', ttl, { left: '470px', top: '-60px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '74px', color: '#fff', background: PINK, padding: '0 22px 6px', border: `4px solid ${INK}`, borderRadius: '14px', boxShadow: `5px 5px 0 ${INK}`, zIndex: 3 }, '^ nunca');
}

/* ======================================================================
   B · «Y ÉL MISMO LO DESMINTIÓ» — primer plano, dedo levantado
   ====================================================================== */
headline(S.B[0], S.B[1], 'Y él mismo lo *desmintió*', { size: 92, hlT: K.desm, y: 200 });
{
  const c = scene(S.B[0], S.B[1], t => {
    set(ry, { r: t * 10 });
    const up = t > K.desm - 0.1;
    set(ein.d, { s: 1 + 0.04 * p(t, S.B[0], 1.7, E.linear), y: wobble(t, 0.5, 3) - (up ? 12 * p(t, K.desm - 0.1, 0.2, E.outBack) : 0) });
    einFace(ein, t, { finger: up, look: up ? [0, 0] : [-5, 0], ang: up ? -6 : 8, bL: up ? 10 : 0, bR: up ? 14 : 0, jaw: up ? 0.15 : 0, seed: 1.1, blink: !up });
    popA(ch, t, K.mismo, { r: -5 });
    set(mm, { o: 1, r: -8, s: 1 });
    set(tw, { o: up ? 1 : 0, s: pop(t, K.desm, 0.3), r: Math.sin(t * 9) * 4 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -170, 380, 1420, 22, 'rgba(255,62,165,.16)', 'rgba(0,0,0,0)', 0);
  const ein = mkEin(c, [80, 420, 860, 1099]); ein.d.style.zIndex = 3; ein.d.style.transformOrigin = '540px 900px';
  const ch = chip(c, 600, 440, 'él mismo', { size: 50, bg: PINK });
  const mm = stamp(c, 70, 440, 'MITO', { size: 64, bw: 8, z: 20, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const tw = el('div', c, { left: '860px', top: '780px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: YEL, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 30 }, '!');
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN  (L2)
   ====================================================================== */
{
  const T0 = S.C[0], T1 = S.C[1];
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
   D · ¿DE DÓNDE SALE EL BULO? DE DOS COSAS  (L3) — cartas «1» y «2»
   ====================================================================== */
headline(S.D[0], K.dosC - 0.05, '¿De dónde sale el *bulo*?', { size: 92, hlT: K.bulo });
headline(K.dosC - 0.05, S.D[1], 'De *dos* cosas', { size: 120, hlT: K.dosC + 0.1 });
{
  const c = scene(S.D[0], S.D[1], t => {
    const out = p(t, K.dosC - 0.15, 0.3, E.inCubic);
    set(ex.wrap, { r: -4 + wobble(t, 0.6, 1.5), y: -out * 1100 + wobble(t, 0.7, 6), s: 1 + 0.05 * p(t, S.D[0], 1.6, E.linear) });
    QM.forEach((q, i) => { const t0 = S.D[0] + 0.25 + i * 0.22; set(q, { s: pop(t, t0, 0.35) * (1 - out), y: Math.sin(t * 4 + i) * 12, r: [-14, 10, -6, 16][i], o: t < t0 ? 0 : 1 }); });
    popA(bul, t, K.bulo, { r: -6, y: -out * 1100 });
    [[c1, K.dosC + 0.05, -6], [c2, K.cosas, 6]].forEach(([cd, t0, r]) => set(cd.wrap, { s: pop(t, t0, 0.45), r: r + wobble(t, 0.6, 1.5, r), y: (1 - clamp(p(t, t0, 0.45))) * 200, o: t < t0 ? 0 : 1 }));
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const ex = examPaper(c, 300, 470, 480, 560, { title: 'MATEMÁTICAS', name: 'A. Einstein', seed: 13 });
  const z0 = box(ex.inner, 110, 170, 230, 276, { zIndex: 4 }); z0.innerHTML = ZERO(30);
  const QM = [qMark(c, 140, 520, 150), qMark(c, 820, 470, 130), qMark(c, 170, 860, 120), qMark(c, 800, 830, 160)];
  const bul = chip(c, 640, 1000, '¿el bulo?', { size: 48, bg: INK, color: YEL, z: 40 });
  const c1 = numCard(c, 170, 520, 1, { w: 320, h: 430 }), c2 = numCard(c, 590, 520, 2, { w: 320, h: 430 });
}

/* ======================================================================
   E1 · «UNA: UN PERIÓDICO»  (L4a) — la carta 1 se da la vuelta
   ====================================================================== */
headlineN(S.E1[0], S.E1[1], 'Una: un *periódico*', { size: 96, hlT: K.periodico });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    const sx = flipCard(cd, t, K.periodico - 0.15, 0.3);
    set(cd.wrap, { sx, s: 1.25 + 0.04 * p(t, S.E1[0], 2.6, E.linear), r: -3 + wobble(t, 0.5, 1) });
    set(np.d, { r: wobble(t, 0.6, 2) });
    PG.forEach((q, i) => { const t0 = K.periodico + 0.3 + i * 0.1; set(q, { x: (1 - p(t, t0, 0.4, E.outBack)) * (i % 2 ? 700 : -700), r: [-18, 14, -8, 20][i] + wobble(t, 0.5, 3, i), o: t < t0 ? 0 : 1 }); });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const PG = [[60, 520], [800, 560], [90, 900], [790, 920]].map(([x, y], i) => { const d = box(c, x, y, 190, 240, { zIndex: 2 }); d.innerHTML = svgW(newsInner({ title: 'NOTICIAS', date: '1935', mfs: 70, seed: 20 + i }), '0 0 600 760'); return d; });
  const cd = numCard(c, 380, 500, 1, { w: 320, h: 430 }); cd.wrap.style.zIndex = 8;
  const np = mk(cd.front, [38, 130, 232, 230], newsInner({ title: 'NOTICIAS', date: '1935', mfs: 72, seed: 4 }), '0 0 600 760', 'np');
  el('div', cd.front, { left: '0', top: '368px', width: '308px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: INK, whiteSpace: 'nowrap' }, 'UN PERIÓDICO');
}

/* ======================================================================
   E2 · 1935 — una sección de curiosidades
   ====================================================================== */
{
  const c = scene(S.E2[0], S.E2[1], t => {
    { const k = p(t, K.mil, 0.18, E.outCubic); set(yr, { s: (t < K.mil ? 0 : lerp(1.8, 1, k)) * (1 + (t > K.cinco - 0.1 ? 0.12 * (1 - p(t, K.cinco - 0.1, 0.3)) : 0)), r: -3, o: t < K.mil ? 0 : 1 }); }
    set(np.d, { y: (1 - p(t, S.E2[0] + 0.05, 0.45, E.outBack)) * 1000, r: -2 + wobble(t, 0.4, 0.6), s: 1 + 0.06 * p(t, K.seccion, 1.4, E.inOutCubic) });
    const kf = p(t, K.seccion, 0.35, E.outCubic);
    frm.style.clipPath = `inset(0 ${f1((1 - kf) * 100)}% 0 0)`; frm.style.opacity = t < K.seccion ? 0 : 1;
    popA(cur, t, K.curios, { r: -3 });
    set(lens, { s: pop(t, K.curios + 0.15, 0.4), r: -6 + wobble(t, 0.8, 2), o: t < K.curios + 0.15 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const yr = el('div', c, { left: 0, top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '210px', lineHeight: '220px', color: YEL, textShadow: `9px 9px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 30 }, '1935');
  const np = mk(c, [230, 450, 620, 785], newsInner({ title: 'NOTICIAS', date: '1935', mfs: 64, seed: 9 }), '0 0 600 760', 'np'); np.d.style.zIndex = 4;
  const frm = box(c, 480, 820, 400, 400, { zIndex: 8, border: `9px solid ${PINK}`, borderRadius: '16px', boxShadow: `0 0 0 4px ${INK}, inset 0 0 0 4px ${INK}`, background: 'rgba(255,62,165,.10)' });
  const cur = chip(c, 340, 1250, 'sección de curiosidades', { size: 46, bg: PINK, z: 30 });
  const lens = box(c, 700, 700, 200, 200, { zIndex: 20 });
  lens.innerHTML = `<svg width="200" height="260" style="overflow:visible"><path d="M160,160 L230,250" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M160,160 L230,250" stroke="${WOOD}" stroke-width="18" stroke-linecap="round"/><circle cx="100" cy="100" r="96" fill="${INK}"/><circle cx="100" cy="100" r="88" fill="${BRASS}"/><circle cx="100" cy="100" r="76" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="4"/><text x="100" y="135" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="100" fill="${PINK}" stroke="${INK}" stroke-width="3">?</text></svg>`;
}

/* ======================================================================
   E3 · «AUNQUE USTED NO LO CREA» — cabecera de la sección + cameo del emú
   ====================================================================== */
{
  const c = scene(S.E3[0], S.E3[1], t => {
    WD.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0 : 1, r: q.r }));
    set(rib, { sx: p(t, S.E3[0], 0.25, E.outBack) });
    VG.forEach((v, i) => popA(v, t, S.E3[0] + 0.1 + i * 0.12, { r: [-3, 2, -2][i] }));
    const look = t > K.crea - 0.1 && t < K.crea + 0.55;
    face(emu, t, { look: look ? [0, 0] : [-14, 6], half: !look, bL: look ? 18 : 0, bR: look ? 26 : 0, blink: false });
    set(emu.d, { y: look ? -22 * p(t, K.crea - 0.1, 0.12, E.outBack) : 30 + wobble(t, 0.6, 3), r: look ? 0 : -6 });
    set(hand.d, { y: Math.sin(t * 7) * 10 });
    set(q2, { r: Math.sin(t * 5) * 8 });
  }, { cut: true });
  sceneBg(c, { background: '#F1E5CB', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 30px)' });
  const rib = box(c, 40, 300, 1000, 330, { zIndex: 10 });
  rib.innerHTML = `<svg width="1000" height="330" style="overflow:visible">${cut('<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z"/>')}<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,60 H960 M40,270 H960" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/></svg>`;
  const l1 = el('div', rib, { left: '0', top: '70px', width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: '92px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `4px 4px 0 ${INK}` });
  const l2 = el('div', rib, { left: '0', top: '172px', width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: '92px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `4px 4px 0 ${INK}` });
  const WD = []; const ia = find('aunque usted no lo crea');
  [['¡Aunque', l1], ['usted', l1], ['no', l2], ['lo', l2], ['crea!', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.14em'; s.textContent = q[0]; q[1].appendChild(s); WD.push({ e: s, t: W[ia + k].s, r: [-3, 2, -2, 3, -4][k] }); });
  const VG = [[70, 700], [390, 700], [710, 700]].map(([x, y]) => { const v = box(c, x, y, 300, 400, { background: '#FBF6EA', border: `5px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}`, overflow: 'hidden', zIndex: 5 }); box(v, 0, 0, 290, 390, { backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.10) 0 2px, transparent 2px 9px)' }); return v; });
  const q2 = el('div', VG[0], { left: '70px', top: '20px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '300px', lineHeight: 1, color: PINK, textShadow: `6px 6px 0 ${INK}` }, '?');
  const emu = mkEmuF(VG[1], [20, 70, 250, 375]);
  const hand = mk(VG[2], [40, -238, 220, 495], handInner(), '0 0 400 900', 'hand');
}

/* ======================================================================
   E4 · EL RECORTE: «¡EL GENIO SUSPENDIÓ MATEMÁTICAS!»
   ====================================================================== */
headlineN(S.E4[0], K.habia - 0.08, 'Publicó que el *mayor genio*…', { size: 82, hlT: K.mayor });
headlineN(K.habia - 0.08, S.E4[1], '…había *suspendido* matemáticas', { size: 80, hlT: K.susp1 });
{
  const c = scene(S.E4[0], S.E4[1], t => {
    set(clip.wrap, { y: (1 - p(t, S.E4[0], 0.4, E.outBack)) * 900, r: -2 + wobble(t, 0.4, 0.5), s: 1 + 0.04 * p(t, S.E4[0], 4.3, E.linear) });
    TW.forEach(q => set(q.e, { s: pop(t, q.t - 0.03, 0.3), o: t < q.t - 0.03 ? 0 : 1 }));
    popA(gen, t, K.mayor, { r: -4 });
    stampA(z0, t, K.susp1 + 0.1, -12, 1);
    einFace(ein, t, { look: [3, -2], seed: 2, ang: 0 });
    set(y35, { r: 6, o: 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const clip = paperPiece(c, 90, 430, 900, 620, { seed: 41, bg: '#F7F0DC' });
  const iw = 882;
  el('div', clip.inner, { left: '0', top: '14px', width: px(iw), textAlign: 'center', fontFamily: 'Rye', fontSize: '42px', color: RED, whiteSpace: 'nowrap' }, '¡AUNQUE USTED NO LO CREA!');
  box(clip.inner, 30, 70, iw - 60, 5, { background: INK }); box(clip.inner, 30, 80, iw - 60, 2, { background: INK });
  const hd = el('div', clip.inner, { left: '20px', top: '96px', width: px(iw - 40), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '66px', lineHeight: 1.0, color: INK });
  const TW = []; const ig = find('el mayor genio', find('publico'));
  [['¡EL GENIO', W[ig + 2].s], ['SUSPENDIÓ', K.susp1], ['MATEMÁTICAS!', K.mat1]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.textContent = q[0]; hd.appendChild(s); TW.push({ e: s, t: q[1] }); });
  const frame = box(clip.inner, 40, 300, 300, 290, { border: `5px solid ${INK}`, background: '#FBF6EA', overflow: 'hidden' });
  const ein = mkEin(frame, [-20, 20, 330, 422]);
  let ln = ''; for (let yy = 316; yy < 590; yy += 24) ln += `<path d="M370,${yy} H${yy % 3 ? 850 : 760}" stroke="${INK}" stroke-width="6" opacity=".3"/>`;
  box(clip.inner, 0, 0, iw, 600).innerHTML = `<svg width="${iw}" height="600">${ln}</svg>`;
  const gen = chip(clip.wrap, 380, 520, 'el mayor genio del mundo', { size: 34, bg: INK, color: YEL, z: 30 });
  const y35 = chip(clip.wrap, 760, -20, '1935', { size: 40, bg: PINK, z: 30 });
  const z0 = box(c, 790, 740, 160, 192, { zIndex: 40 }); z0.innerHTML = ZERO(28);
}

/* ======================================================================
   F1 · EINSTEIN LO LEYÓ… (indignación)
   ====================================================================== */
headlineN(S.F1[0], S.F1[1], 'Einstein lo *leyó*…', { size: 100, hlT: K.leyo });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    const mad = t > K.leyo + 0.3;
    set(ein.d, { x: mad ? Math.sin(t * 40) * 4 : 0, y: wobble(t, 0.6, 3), s: 1 + 0.05 * p(t, K.leyo + 0.3, 0.5, E.outBack) });
    einFace(ein, t, { look: mad ? [0, 0] : [-8, 8], ang: mad ? 18 : 0, bL: mad ? -6 : 4, bR: mad ? -6 : 4, mad, jaw: t > K.contesto ? 0.35 + 0.3 * Math.abs(Math.sin(t * 12)) : 0, blink: !mad, seed: 0.7 });
    set(clip, { r: -10 + (mad ? Math.sin(t * 30) * 3 : wobble(t, 0.5, 1)), y: mad ? Math.sin(t * 35) * 4 : 0 });
    set(grr, { s: pop(t, K.leyo + 0.35, 0.3), r: -8 + Math.sin(t * 20) * 3, o: t < K.leyo + 0.35 ? 0 : 1 });
    popA(cnt, t, K.contesto, { r: -4 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -170, 380, 1420, 22, 'rgba(200,16,46,.10)', 'rgba(0,0,0,0)', 0);
  const ein = mkEin(c, [330, 470, 640, 818]); ein.d.style.zIndex = 3; ein.d.style.transformOrigin = '650px 900px';
  const clip = box(c, 90, 720, 420, 300, { zIndex: 6, background: '#F7F0DC', border: `5px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}` });
  el('div', clip, { left: '0', top: '12px', width: '410px', textAlign: 'center', fontFamily: 'Rye', fontSize: '22px', color: RED, whiteSpace: 'nowrap' }, '¡AUNQUE USTED NO LO CREA!');
  el('div', clip, { left: '10px', top: '50px', width: '390px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '46px', lineHeight: 1.02, color: INK }, '¡EL GENIO SUSPENDIÓ MATEMÁTICAS!');
  const grr = el('div', c, { left: '780px', top: '520px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', color: RED, textShadow: `4px 4px 0 ${INK}`, zIndex: 30 }, '¡!');
  const cnt = chip(c, 560, 1150, 'y contestó:', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   F2 · «NUNCA SUSPENDÍ EN MATEMÁTICAS» — cartela + dedo
   ====================================================================== */
{
  const c = scene(S.F2[0], S.F2[1], t => {
    set(bub, { s: pop(t, S.F2[0] + 0.02, 0.35), r: -1.5 + wobble(t, 0.4, 0.5), o: 1 });
    QW.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0.12 : 1 }));
    paint(nHL, t, K.nunca2 + 0.1, 0.35);
    const up = t > K.suspendi;
    set(ein.d, { y: wobble(t, 0.6, 3) - (up ? 10 : 0) });
    einFace(ein, t, { finger: up, look: [0, -2], ang: 10, bL: 0, bR: 4, jaw: talkW(t, 'VECINO') * 0.5, seed: 1.9 });
    set(ok, { s: pop(t, K.mat2e - 0.1, 0.35), r: -8, o: t < K.mat2e - 0.1 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 58px)' });
  const bub = box(c, 70, 330, 940, 420, { zIndex: 20 });
  bub.innerHTML = `<svg width="940" height="470" style="position:absolute;left:0;top:0;overflow:visible">${cut('<path d="M40,10 H900 Q930,10 930,40 V350 Q930,380 900,380 H640 L700,460 L560,380 H40 Q10,380 10,350 V40 Q10,10 40,10 Z"/>')}<path d="M40,10 H900 Q930,10 930,40 V350 Q930,380 900,380 H640 L700,460 L560,380 H40 Q10,380 10,350 V40 Q10,10 40,10 Z" fill="#fff" stroke="${INK}" stroke-width="7"/></svg>`;
  const q1 = el('div', bub, { left: '0', top: '50px', width: '940px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '100px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  const q2 = el('div', bub, { left: '0', top: '196px', width: '940px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  const QW = []; const iq = find('nunca suspendi en matematicas');
  [['«Nunca', q1], ['suspendí', q1], ['en', q2], ['matemáticas»', q2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.17em'; s.innerHTML = k === 0 ? `«${hlSpan('Nunca', 'nhl')}` : q[0]; q[1].appendChild(s); q[1].appendChild(document.createTextNode(' ')); QW.push({ e: s, t: W[iq + k].s }); });
  const nHL = bub.querySelector('.nhl');
  const ein = mkEin(c, [320, 760, 480, 614]); ein.d.style.zIndex = 4;
  const ok = stamp(c, 130, 790, 'A. EINSTEIN', { size: 52, bw: 7, z: 25, font: 'SpecialElite', bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   F3 · ANTES DE LOS QUINCE AÑOS YA DOMINABA EL CÁLCULO — pizarra
   ====================================================================== */
headlineN(S.F3[0], K.ya - 0.06, 'Antes de los *quince años*…', { size: 82, hlT: K.quince });
headlineN(K.ya - 0.06, S.F3[1], '…ya dominaba el *cálculo*', { size: 82, hlT: K.calc });
{
  const CH = [];
  const c = scene(S.F3[0], S.F3[1], t => {
    CH.forEach(q => { const k = p(t, q.t, 0.35, E.outCubic); q.e.style.clipPath = `inset(-20px ${f1((1 - k) * 100)}% -20px -20px)`; q.e.style.opacity = t < q.t ? 0 : 1; });
    { const k = p(t, K.quince, 0.18, E.outCubic); set(n15, { s: t < K.quince ? 0 : lerp(1.9, 1, k), r: -4, o: t < K.quince ? 0 : 1 }); }
    set(lb, { o: t > K.quince ? 1 : 0, s: pop(t, K.anos15, 0.3) });
    const wr = t > K.antes && t < K.calc;
    set(yng.d, { y: wobble(t, 0.7, 3) - (t > K.calc ? Math.abs(Math.sin(t * 10)) * 12 : 0), r: wr ? Math.sin(t * 14) * 2 : 0 });
    einFace(yng, t, { look: wr ? [-6, -6] : [0, 0], closed: t > K.calc + 0.2, bL: 6, bR: 6, finger: t > K.calc, seed: 0.2 });
    popA(ck, t, K.calc + 0.1, { r: -6 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  chalkboard(c, 60, 420, 960, 560, 2);
  [['∫ f(x) dx', 130, 470, 96, K.antes], ['d/dx', 140, 610, 104, K.dominaba - 0.3], ['lim', 470, 760, 90, K.dominaba], ['Σ', 150, 770, 120, K.calc - 0.2]].forEach(q => CH.push({ e: chalk(c, q[1], q[2], q[0], q[3]), t: q[4] }));
  const n15 = el('div', c, { left: '560px', top: '440px', width: '380px', textAlign: 'center', fontFamily: 'Rye', fontSize: '240px', lineHeight: '260px', color: YEL, textShadow: `9px 9px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 10 }, '15');
  const lb = chip(c, 640, 700, 'antes de los 15', { size: 42, bg: PINK, z: 12 });
  const yng = mkEin(c, [560, 860, 360, 460], { young: true, seed: 77 }); yng.d.style.zIndex = 6;
  const ck = stamp(c, 300, 870, 'CÁLCULO ✔', { size: 72, bw: 10, z: 20, col: INK, bg: YEL, blend: 'normal' });
}
