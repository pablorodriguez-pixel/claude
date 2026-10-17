/* Ep. 20 · escenas L0–L3 (todo clavado por texto a words.js vía K) */
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 30px 12px', fontFamily: 'Playfair', fontStyle: o.it ? 'italic' : 'normal', fontWeight: 900, fontSize: px(o.size || 64), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}
const handBox = (pa, x, y, sz = 130, rot = 0, z = 30) => { const d = box(pa, x, y, sz, sz, { zIndex: z }); d.innerHTML = `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.15)}</svg>`; return d; };
// notas que suben en bucle (deterministas; ya en movimiento en el fotograma 0)
function riseNotes(pa, n, x0, y0, spread, seed, o = {}) {
  const r = rng(seed); const L = [];
  for (let i = 0; i < n; i++) { const sz = (o.sz || 90) * (0.75 + r() * 0.5); L.push({ e: noteBox(pa, x0 + (r() - 0.5) * spread, y0, sz, i % 2, o.col ? o.col[i % o.col.length] : INK, o.z || 25), ph: i / n + r() * 0.08, sw: 30 + r() * 40, sp: 0.4 + r() * 0.25 }); }
  return L;
}
function updNotes(L, t, h = 600, on = 1) { L.forEach((q, i) => { const ph = (t * q.sp + q.ph) % 1; set(q.e, { x: Math.sin(ph * 7 + i) * q.sw, y: -ph * h, s: (0.6 + 0.5 * ph) * on, r: Math.sin(t * 3 + i) * 16, o: on * Math.min(1, ph * 6, (1 - ph) * 4) }); }); }

/* ======================================================================
   A · GANCHO / PORTADA — tarta gigante + caja registradora «€ ?»
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.06 * p(t, 0, 5, E.linear) });
    set(cake.d, { y: wobble(t, 0.6, 4), r: wobble(t, 0.4, 0.8) });
    flick(cake, t);
    updNotes(NT, t, 330);
    // caja registradora: tiembla en «dinero» y abre el cajón
    const kd = p(t, K.dinero, 0.25, E.outBack);
    set(reg.d, { r: 4 + (t > K.dinero && t < K.dinero + 0.3 ? Math.sin(t * 60) * 3 : wobble(t, 0.5, 1)), y: wobble(t, 0.7, 3, 2) });
    reg.drawer.setAttribute('transform', `translate(0 ${f1(kd * 34)})`);
    CO.forEach((co, i) => { const t0 = K.dinero + 0.05 + i * 0.08, k = clamp((t - t0) / 0.7); set(co, { x: (i - 1) * 120 * k, y: -320 * k + 520 * k * k, r: k * 300 * (i % 2 ? 1 : -1), o: t < t0 || k >= 1 ? 0 : 1 }); });
    // título-portada
    set(ttl, { y: wobble(t, 0.5, 3) });
    const kq = p(t, K.yasi, 0.3, E.outBack);
    set(qm, { s: 1 + 0.12 * Math.sin(t * 5), r: -6 + Math.sin(t * 3) * 4 });
    stampA(dp, t, K.costar, -9, 1);
    popA(h16, t, K.dieci16, { r: 4 });
    set(cal, { s: pop(t, K.hasta, 0.4), r: -8 + wobble(t, 0.6, 2), o: t < K.hasta ? 0 : 1 });
    void kq;
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 46% 58%, rgba(255,230,0,.35), rgba(255,230,0,0) 55%)' });
  rays(cam, -200, 330, 1480, 26, 'rgba(255,62,165,.12)', 'rgba(0,0,0,0)', 0);
  const cake = mkCake(cam, [40, 580, 680, 725]); cake.d.style.zIndex = 4;
  const NT = riseNotes(cam, 7, 330, 700, 560, 11, { sz: 96, col: [INK, RED, INK, '#5b8bd6'] });
  const reg = mkReg(cam, [600, 930, 340, 356]); reg.d.style.zIndex = 8;
  const CO = [0, 1, 2].map(() => { const d = box(cam, 720, 1120, 96, 96, { zIndex: 9 }); d.innerHTML = coinSvg(); return d; });
  // portada: la pregunta (sin respuesta)
  const ttl = el('div', cam, { left: '30px', top: '168px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, zIndex: 50, lineHeight: 1 });
  ttl.innerHTML = `<div style="font-style:italic;font-weight:800;font-size:82px;line-height:96px">¿Cantar</div><div style="font-size:112px;line-height:122px">${hlSpan('<i>Cumpleaños feliz</i>', 'th')}</div>`;
  ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const qm = el('div', ttl, { position: 'relative', display: 'inline-block', left: 'auto', top: 'auto', marginTop: '10px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '124px', lineHeight: '136px', color: '#fff', background: PINK, padding: '0 34px 8px', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 8px 0 ${INK}` }, '= € ?');
  const dp = stamp(cam, 110, 880, 'DE PAGO', { size: 168, bw: 18, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const cal = box(cam, 70, 1090, 200, 200, { zIndex: 40 });
  cal.innerHTML = `<svg viewBox="0 0 200 200" width="200" height="200" style="overflow:visible">${cut('<rect x="10" y="20" width="180" height="170" rx="16"/>')}<rect x="10" y="20" width="180" height="170" rx="16" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><rect x="10" y="20" width="180" height="50" rx="16" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle cx="60" cy="22" r="9" fill="${INK}"/><circle cx="140" cy="22" r="9" fill="${INK}"/><text x="100" y="152" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">2016</text></svg>`;
  const h16 = chip(cam, 290, 1160, 'hasta 2016', { size: 60, bg: INK, color: YEL, z: 45 });
}

/* ======================================================================
   B · «EN LAS PELÍCULAS CASI NUNCA LA CANTABAN» — claqueta + se tapan la boca
   ====================================================================== */
headline(S.B[0], S.B[1], 'En las *películas* casi nunca la cantaban', { size: 76, hlT: K.peliculas });
{
  const AC = [];
  const c = scene(S.B[0], S.B[1], t => {
    // claqueta: entra, «clac» en películas y se retira a la esquina
    const kin = p(t, S.B[0], 0.35, E.outBack), kout = p(t, K.peliculas + 0.35, 0.4, E.inOutCubic);
    set(clap, { x: lerp(0, 330, kout), y: lerp((1 - kin) * -700, -40, kout), s: lerp(1, 0.42, kout), r: lerp(-6, 8, kout) });
    const ka = t < K.peliculas - 0.1 ? 1 : 1 - p(t, K.peliculas - 0.1, 0.1, E.inCubic);
    arm.setAttribute('transform', `rotate(${f1(-28 * ka)} 24 96)`);
    AC.forEach((a, i) => {
      const t0 = K.peliculas + 0.25 + i * 0.1;
      const cover = t > K.nunca + i * 0.07;
      set(a.f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.7, 3, i) + (cover ? Math.sin(t * 30 + i) * 3 : 0), r: [-4, 0, 4][i], o: t < t0 ? 0 : 1 });
      face(a.f, t, { jaw: t > K.casi && !cover ? 0.45 + 0.25 * Math.sin(t * 14 + i) : 0, look: cover ? [[6, 0], [0, -3], [-6, 0]][i] : [0, -4], half: cover, blink: !cover, seed: i, bL: cover ? 10 : 2, bR: cover ? 10 : 2 });
      const kh = p(t, K.nunca + i * 0.07, 0.18, E.outBack);
      set(a.h, { y: (1 - kh) * 320, o: t < K.nunca + i * 0.07 ? 0 : 1, r: Math.sin(t * 20 + i) * 2 });
      a.n.forEach((q, j) => { const t1 = K.casi + j * 0.18 + i * 0.06; const ph = clamp((t - t1) / 0.9); const fall = p(t, K.nunca, 0.5, E.inCubic); set(q, { x: (j ? 30 : -30) * ph, y: -ph * 170 + fall * 400, s: pop(t, t1, 0.3), r: (j ? 14 : -14) + fall * 120, o: t < t1 ? 0 : 1 - fall }); });
      set(a.m, { s: pop(t, K.nunca + 0.15 + i * 0.1, 0.3), r: [-8, 5, -4][i], o: t < K.nunca + 0.15 + i * 0.1 ? 0 : 1 });
    });
    set(ck.d, { s: pop(t, K.peliculas + 0.5, 0.4), o: t < K.peliculas + 0.5 ? 0 : 1 }); flick(ck, t);
    stampA(dr, t, K.cantaban + 0.2, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  // cortinas de cine
  const cur = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  { let fo = ''; for (let k = 0; k < 7; k++) fo += `<path d="M${k * 24},420 Q${k * 24 + 12},860 ${k * 24},1320" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/><path d="M${1080 - k * 24},420 Q${1068 - k * 24},860 ${1080 - k * 24},1320" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>`;
    cur.innerHTML = `<svg width="1080" height="1920"><path d="M0,400 H170 Q120,860 60,1330 H0 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M1080,400 H910 Q960,860 1020,1330 H1080 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/>${fo}<rect x="0" y="392" width="1080" height="40" fill="${BRASS}" stroke="${INK}" stroke-width="5"/></svg>`; }
  const clap = box(c, 290, 470, 500, 428, { zIndex: 40 }); clap.innerHTML = clapSvg(); const arm = clap.querySelector('.arm');
  const ck = mkCake(c, [400, 960, 280, 299]); ck.d.style.zIndex = 12;
  [[90, 680, ladyInner(31, '#6b4a2a', '#4a6a5a')], [380, 640, suitInner(43, false)], [660, 680, fanInner(74, 'cap', '#5a4632')]].forEach(([x, y, inner], i) => {
    const f = mkB(c, [x, y, 290, 371], inner); f.d.style.zIndex = 6;
    const k = 290 / 360; const mx = x + 180 * k, my = y + 258 * k;
    const h = handBox(c, mx - 70, my - 66, 140, 0, 20);
    const n = [noteBox(c, mx - 40, my - 120, 80, 0, INK, 9), noteBox(c, mx + 10, my - 140, 70, 1, RED, 9)];
    const m = bubble(c, x + 150, y - 40, '¡mmm!', { size: 44, it: true, z: 22 });
    AC.push({ f, h, n, m });
  });
  const dr = stamp(c, 230, 1110, 'DATO REAL', { size: 110, bw: 14, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   C1 · LA MELODÍA — FINALES DEL SIGLO XIX (partitura que se escribe)
   ====================================================================== */
headline(S.C1[0], S.C1[1], 'La *melodía*…', { size: 120, hlT: K.melodia });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(sc.wrap, { y: (1 - p(t, S.C1[0], 0.4, E.outBack)) * 900, r: -2 + wobble(t, 0.4, 0.6), s: 1 + 0.04 * p(t, S.C1[0], 2.7, E.linear) });
    const nN = sc.notes.length, k = clamp((t - K.melodia) / (S.C1[1] - K.melodia - 0.3));
    sc.notes.forEach((g, i) => { g.style.opacity = i / nN < k ? 1 : 0; });
    const lastI = Math.min(nN - 1, Math.floor(k * nN)); const bb = sc.notes[lastI] && sc.notes[lastI].firstChild;
    const qx = bb ? +bb.getAttribute('cx') : 0, qy = bb ? +bb.getAttribute('cy') : 0;
    set(quill, { x: qx - 10 + Math.sin(t * 18) * 6, y: qy - 210 + Math.cos(t * 18) * 4, r: 18 + Math.sin(t * 9) * 4, o: t > K.melodia - 0.1 && k < 1 ? 1 : 0 });
    stampA(xix, t, K.finales, -6, 1);
    updNotes(NT, t, 380, t > K.melodia ? 1 : 0);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const sc = scoreSheet(c, 110, 440, 860, 600, { seed: 19, top: 120 });
  sc.T('Partitura', { fontFamily: 'Rye', fontStyle: 'normal', fontWeight: 400, fontSize: '50px', top: '26px' });
  const quill = box(sc.inner, 0, 0, 120, 240, { zIndex: 8 });
  quill.innerHTML = `<svg viewBox="0 0 120 240" width="120" height="240" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/><path d="M44,130 l20,-8 M40,104 l26,-10 M40,78 l30,-12 M48,52 l28,-12" stroke="${INK}" stroke-width="2" opacity=".6"/></svg>`;
  quill.style.transformOrigin = '60px 236px';
  const xix = stamp(c, 300, 1070, 'finales del siglo XIX', { size: 70, bw: 10, z: 30, col: INK, bg: YEL, blend: 'normal', font: 'Playfair' });
  const NT = riseNotes(c, 4, 760, 760, 200, 5, { sz: 80, col: [INK, RED] });
}

/* ======================================================================
   C2 · DOS HERMANAS AMERICANAS — retratos ovalados
   ====================================================================== */
headline(S.C2[0], S.C2[1], 'La compusieron dos *hermanas*', { size: 82, hlT: K.hermanas });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    FR.forEach((f, i) => { const t0 = S.C2[0] + 0.05 + i * 0.15; set(f.w, { s: pop(t, t0, 0.45), r: [-4, 4][i] + wobble(t, 0.5, 1, i), y: wobble(t, 0.6, 4, i), o: t < t0 ? 0 : 1 }); face(f.f, t, { look: [[8, 0], [-8, 0]][i], seed: i * 1.3, jaw: t > K.hermanas && t < K.hermanas + 0.4 ? 0.3 : 0 }); });
    popA(ch1, t, K.dosH, { r: -4 });
    popA(ch2, t, K.americanas, { r: 4 });
    ST.forEach((s, i) => set(s, { s: pop(t, K.americanas + 0.1 + i * 0.08, 0.3), r: t * 90 + i * 30, o: t < K.americanas + 0.1 + i * 0.08 ? 0 : 1 }));
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const FR = [[90, 470, '#5a3a24', '#3f5a72'], [560, 470, '#2f241c', '#7a3f4a']].map(([x, y, hair, dress], i) => {
    const w = box(c, x, y, 380, 500, { zIndex: 5 });
    box(w, 0, 0, 380, 500, { background: BRASS, border: `6px solid ${INK}`, borderRadius: '50%', boxShadow: `9px 11px 0 ${SH}` });
    const inn = box(w, 22, 22, 336, 456, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)`, border: `4px solid ${INK}` });
    const f = mkB(inn, [-10, 40, 356, 455], ladyInner(80 + i, hair, dress, { specs: i === 1 }));
    return { w, f };
  });
  const ch1 = chip(c, 300, 1000, 'dos hermanas', { size: 58, bg: PINK, z: 30 });
  const ch2 = chip(c, 520, 1100, 'americanas ★', { size: 54, bg: INK, color: '#fff', z: 30 });
  const ST = [[470, 420], [480, 920], [930, 900]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 31 }, '★'));
}

/* ======================================================================
   C3 · CANCIÓN DE CLASE — «BUENOS DÍAS A TODOS»
   ====================================================================== */
headline(S.C3[0], K.buenos - 0.1, 'Para una canción de *clase*', { size: 82, hlT: K.clase });
headline(K.buenos - 0.1, S.C3[1], '*Buenos días* a todos', { size: 100, hlT: K.buenos });
{
  const TW = [];
  const c = scene(S.C3[0], S.C3[1], t => {
    set(sc.wrap, { s: pop(t, S.C3[0] + 0.05, 0.4), r: -2 + wobble(t, 0.4, 0.6), o: 1 });
    TW.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0 : 1 }));
    T2.forEach((f, i) => { set(f.d, { y: wobble(t, 0.6, 3, i), r: [4, -4][i] }); face(f, t, { look: [[10, 2], [-10, 2]][i], seed: i + 3, jaw: t > K.buenos ? 0.3 + 0.2 * Math.sin(t * 12 + i) : 0 }); });
    KD.forEach((f, i) => { const t0 = K.clase - 0.1 + i * 0.1; set(f.d, { s: pop(t, t0, 0.4), y: (t > K.buenos ? -Math.abs(Math.sin(t * 6 + i)) * 12 : 0), o: t < t0 ? 0 : 1 }); face(f, t, { jaw: t > K.buenos ? 0.35 + 0.25 * Math.sin(t * 13 + i * 2) : 0, look: [0, -4], seed: i * 0.7 }); });
    updNotes(NT, t, 360, t > K.buenos ? 1 : 0);
    popA(cl, t, K.clase, { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  chalkboard(c, 40, 430, 1000, 520, 1);
  const sc = scoreSheet(c, 270, 460, 540, 440, { seed: 23, top: 160, tsz: 52 }); sc.wrap.style.zIndex = 3;
  const t1 = sc.T('', { top: '20px' }), t2 = sc.T('', { top: '78px' });
  const ib = find('buenos dias a todos');
  [['«Buenos', t1], ['días', t1], ['a', t2], ['todos»', t2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.textContent = q[0]; q[1].appendChild(s); TW.push({ e: s, t: W[ib + k].s }); });
  const T2 = [mkB(c, [30, 560, 260, 332], ladyInner(80, '#5a3a24', '#3f5a72')), mkB(c, [790, 560, 240, 307], ladyInner(81, '#2f241c', '#7a3f4a', { specs: true }))];
  T2.forEach(f => f.d.style.zIndex = 4);
  const KD = [[320, 930, false, '#7d8fa8'], [500, 920, true, '#a87d8f'], [680, 930, false, '#8fa87d']].map(([x, y, g, col], i) => { const f = mkB(c, [x, y, 200, 256], kidInner(90 + i, g, col)); f.d.style.zIndex = 6; return f; });
  box(c, 290, 1150, 640, 60, { zIndex: 8, background: WOOD, border: `5px solid ${INK}`, borderRadius: '10px', boxShadow: `6px 8px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.18) 0 2px, transparent 2px 12px)' });
  const NT = riseNotes(c, 6, 600, 960, 420, 31, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 7 });
  const cl = chip(c, 650, 880, 'canción de clase', { size: 40, bg: PINK, z: 30 });
}

/* ======================================================================
   D1 · LA GENTE LE CAMBIÓ LA LETRA → «CUMPLEAÑOS FELIZ»
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'La gente cambió la *letra*', { size: 86, hlT: K.letra });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    set(sc.wrap, { y: (1 - p(t, S.D1[0], 0.35, E.outBack)) * 900, r: 2 + wobble(t, 0.4, 0.6) });
    const ks = p(t, K.cambio, 0.35, E.inOutCubic);
    strike.style.transform = `scaleX(${f1(ks * 1000) / 1000})`;
    set(old, { o: 1 - 0.55 * p(t, K.cumple2, 0.3), y: p(t, K.cumple2, 0.3) * 20, s: 1 - 0.1 * p(t, K.cumple2, 0.3) });
    set(neu, { s: t < K.cumple2 ? 0 : lerp(1.7, 1, p(t, K.cumple2, 0.2, E.outCubic)), r: -4, o: t < K.cumple2 ? 0 : 1 });
    paint(nHL, t, K.cumple2 + 0.15, 0.35);
    set(caret, { s: pop(t, K.letra, 0.3), r: -6, o: t < K.letra ? 0 : (t > K.cumple2 ? 0 : 1) });
    PP.forEach((f, i) => { const t0 = K.gente + i * 0.12; set(f.d, { s: pop(t, t0, 0.45), y: wobble(t, 0.6, 3, i) - (t > K.cumple2 ? Math.abs(Math.sin(t * 7 + i)) * 12 : 0), o: t < t0 ? 0 : 1, r: [6, -4][i] }); face(f, t, { jaw: t > K.cumple2 ? 0.35 + 0.25 * Math.sin(t * 12 + i) : 0, look: [8, -4], closed: t > K.cumple2 + 0.1, seed: i }); });
    updNotes(NT, t, 380, t > K.cumple2 ? 1 : 0);
    set(cf.d, { y: (1 - p(t, K.cumple2 + 0.1, 0.35, E.outBack)) * 600, o: t < K.cumple2 + 0.1 ? 0 : 1 }); flick(cf, t);
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const sc = scoreSheet(c, 330, 440, 620, 600, { seed: 29, top: 240 });
  const old = el('div', sc.inner, { left: '0', top: '126px', width: '602px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '50px', color: INK, whiteSpace: 'nowrap', zIndex: 5 });
  old.innerHTML = `<span style="position:relative;display:inline-block">«Buenos días a todos»<span class="stk" style="position:absolute;left:-10px;right:-10px;top:52%;height:12px;background:${RED};border-radius:6px;transform-origin:left center;transform:scaleX(0)"></span></span>`;
  const strike = old.querySelector('.stk');
  const neu = el('div', sc.inner, { left: '0', top: '22px', width: '602px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: INK, whiteSpace: 'nowrap', zIndex: 6 }, hlSpan('«Cumpleaños feliz»', 'nhl', PINK));
  const nHL = neu.querySelector('.nhl');
  const caret = el('div', sc.wrap, { left: '240px', top: '60px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '80px', color: RED, zIndex: 9 }, '^ ?');
  const PP = [mkB(c, [10, 450, 300, 383], kidInner(95, true, '#a87d8f') + PARTYHAT(YEL)), mkB(c, [40, 640, 300, 383], bustInner({ uniform: 'soldier', moustache: true, seed: 72 }) + coatOver('#3a2f26') + PARTYHAT(PINK))];
  PP.forEach(f => f.d.style.zIndex = 8);
  const NT = riseNotes(c, 5, 220, 640, 260, 41, { sz: 74, col: [INK, RED, '#5b8bd6'], z: 9 });
  const cf = mkCake(c, [560, 860, 280, 299]); cf.d.style.zIndex = 10;
}

/* ======================================================================
   D2 · UNA EMPRESA ACABÓ RECLAMANDO LOS DERECHOS — señor del maletín
   ====================================================================== */
headline(S.D2[0], S.D2[1], 'Una *empresa* reclamó los derechos', { size: 78, hlT: K.empresa });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    set(sc.wrap, { r: -3 + wobble(t, 0.4, 0.6), x: p(t, K.reclamando, 0.4, E.inOutCubic) * 60 });
    const kw = p(t, K.empresa - 0.15, 0.55, E.outCubic);
    set(man.d, { x: (1 - kw) * 700, y: wobble(t, 0.6, 3) - (kw < 1 ? Math.abs(Math.sin(t * 12)) * 16 : 0) });
    face(man, t, { look: [-8, 2], half: t > K.acabo, blink: false, seed: 2, bL: 4, bR: 12 });
    set(cs, { x: (1 - kw) * 700, r: -6 + (kw < 1 ? Math.sin(t * 12) * 6 : wobble(t, 0.6, 2)), y: wobble(t, 0.5, 3, 1) });
    popA(emp, t, K.empresa + 0.1, { r: -4 });
    const kp = p(t, K.reclamando - 0.1, 0.25, E.outBack);
    set(pt, { x: (1 - kp) * 300, o: t < K.reclamando - 0.1 ? 0 : 1, r: -90 + Math.sin(t * 8) * 4 });
    stampA(dz, t, K.derechos, -10, 1);
    set(cp, { s: t < K.derechos + 0.12 ? 0 : lerp(2, 1, p(t, K.derechos + 0.12, 0.2, E.outCubic)), r: -12, o: t < K.derechos + 0.12 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const sc = scoreSheet(c, 70, 450, 460, 540, { seed: 33, top: 170 });
  sc.T('«Cumpleaños feliz»', { fontSize: '50px', top: '40px' });
  const man = mkB(c, [500, 470, 440, 562], suitInner(41)); man.d.style.zIndex = 6;
  const cs = box(c, 640, 960, 280, 215, { zIndex: 9 }); cs.innerHTML = caseSvg();
  const emp = chip(c, 560, 1180, 'una empresa', { size: 54, bg: INK, color: YEL, z: 30 });
  const pt = handBox(c, 420, 640, 150, 0, 20);
  const dz = stamp(c, 90, 730, 'DERECHOS', { size: 100, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const cp = el('div', c, { left: '380px', top: '880px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: 1, color: RED, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 #fff`, zIndex: 42 }, '©');
}
