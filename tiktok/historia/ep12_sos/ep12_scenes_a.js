/* Ep. 12 · escenas L0–L4 (anclas por texto: ver A/S() en ep12_figs.js) */
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 34px 12px', fontFamily: o.font || 'Playfair', fontWeight: 900, fontSize: px(o.size || 72), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}
const qMark = (pa, x, y, sz = 150, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
// letra «S» gigante de rótulo de telegrama
const bigS = (pa, x, y, sz = 330) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Rye', fontSize: px(sz), lineHeight: 1, color: '#FBF6EA', textShadow: `10px 12px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}, 5px 5px 0 ${INK}`, zIndex: 20 }, 'S');
function strikeBar(pa, x, y, w, rot = -4, z = 40) { const b = box(pa, x, y, w, 26, { zIndex: z, transformOrigin: 'left center' }); b.innerHTML = `<svg width="${w}" height="40" style="overflow:visible"><path d="M6,20 Q${w * 0.3},6 ${w * 0.55},18 T${w - 6},14" stroke="#fff" stroke-width="40" stroke-linecap="round" fill="none"/><path d="M6,20 Q${w * 0.3},6 ${w * 0.55},18 T${w - 6},14" stroke="${RED}" stroke-width="24" stroke-linecap="round" fill="none"/></svg>`; b.style.transform = `rotate(${rot}deg)`; return b; }
const drawBar = (b, t, t0, d = 0.3, rot = -4) => { const k = p(t, t0, d, E.outCubic); b.style.clipPath = `inset(-30px ${f1((1 - k) * 100)}% -30px -30px)`; b.style.transform = `rotate(${rot}deg)`; };

/* ======================================================================
   A · GANCHO / PORTADA (0 – no1)  «SOS» gigante + «Save Our Souls» tachado + ¡FALSO!
   El fotograma 0 ya es la portada completa (miniatura); luego se construye con la voz.
   ====================================================================== */
headline(-1, S('no1') - 0.1, '¡Lo siento, pero…', { size: 84, y: 186 });
headline(S('no1') - 0.1, T_A1, 'No significa…', { size: 96, y: 186 });
{
  const COVER = 0.1; // t < COVER: portada completa
  const c = scene(-1, T_A1, t => {
    const cov = t < COVER;
    set(cam, { s: 1 + 0.05 * p(t, 0, T_A1, E.linear) });
    set(ry, { r: t * 8 });
    const kS = cov ? 1 : pop(t, 0.12, 0.4);
    set(s1, { s: cov ? 1 : lerp(0.92, 1, kS), r: -4 + wobble(t, 0.6, 1.2) });
    set(s2, { s: cov ? 1 : lerp(0.92, 1, kS), r: 4 + wobble(t, 0.6, 1.2, 0.5) });
    set(bu.d, { r: t * 40 + (t > S('sos0') && t < S('sos0') + 0.4 ? Math.sin(t * 50) * 6 : 0), s: 1 + (t > S('sos0') ? 0.1 * (1 - p(t, S('sos0'), 0.35)) : 0) });
    // «Save Our Souls» con iniciales que se iluminan con la voz
    const kso = cov ? 1 : p(t, S('save0') - 0.25, 0.3, E.outBack);
    set(sos, { y: (1 - kso) * 60, o: cov ? 1 : clamp(kso * 1.5) });
    [['save0', ini[0]], ['our0', ini[1]], ['souls0', ini[2]]].forEach(([n, e]) => paint(e, t, cov ? -9 : S(n), 0.2));
    drawBar(bar, t, cov ? -9 : S('souls0') + 0.05, 0.32, -3);
    const TF = S('souls0') + 0.45, kF = p(t, TF, 0.18, E.outCubic);
    if (cov) set(falso, { s: 1, r: -9, o: 0.97 }); else set(falso, { s: t < TF ? 0 : lerp(2.2, 1, kF) * (1 + (t > S('no1') ? 0.04 * Math.sin(t * 9) : 0)), r: -9, o: t < TF ? 0 : 0.97 });
    falso.style.textShadow = glitch(t, TF, 0.25);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#E7D2A8' });
  const ry = rays(cam, -170, -60, 1420, 24, 'rgba(255,230,0,.45)', 'rgba(0,0,0,0)', 0);
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 36%, rgba(255,255,255,.35), rgba(0,0,0,0) 60%)', zIndex: 1 });
  const s1 = bigS(cam, 40, 360, 360), s2 = bigS(cam, 760, 360, 360);
  const bu = mk(cam, [330, 390, 420, 420], buoyInner('★ S.O.S. ★', { off: '25%' }), '0 0 300 300', 'buoy'); bu.d.style.zIndex = 21;
  const sos = el('div', cam, { left: '0', top: '880px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '128px', lineHeight: 1, color: INK, whiteSpace: 'nowrap', zIndex: 30 });
  sos.innerHTML = ['Save', 'Our', 'Souls'].map((wd, i) => `<span style="display:inline-block;margin:0 .1em">${hlSpan(wd[0], 'ini' + i)}${wd.slice(1)}</span>`).join('');
  const ini = [0, 1, 2].map(i => sos.querySelector('.ini' + i));
  const bar = strikeBar(cam, 60, 945, 960, -3, 35);
  const falso = stamp(cam, 115, 1090, '¡FALSO!', { size: 172, bw: 17, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   A2 · «NO SIGNIFICA NADA»: SOS = [hueco vacío] + sello MITO
   ====================================================================== */
headline(T_A1, T_B, 'No significa *nada*', { size: 104, hlT: S('nada0'), y: 196 });
{
  const c = scene(T_A1, T_B, t => {
    popA(lhs, t, T_A1 + 0.02, { r: -3 });
    popA(eq, t, T_A1 + 0.06, { r: 0 });
    const kh = pop(t, T_A1 + 0.1, 0.35); set(hole, { s: kh, o: t < T_A1 + 0.1 ? 0 : 1, r: 2 + (t > S('nada0') - 0.3 && t < S('nada0') + 0.2 ? Math.sin(t * 60) * 3 : 0) });
    // lupa buscando en el hueco
    const kl = clamp((t - (T_A1 + 0.15)) / 1.3); set(lens, { x: Math.sin(kl * Math.PI * 2) * 120, y: Math.cos(kl * Math.PI * 3) * 40, o: t > T_A1 + 0.15 && t < T_B - 0.2 ? 1 : 0, r: -12 });
    set(fly, { x: (t - S('nada0')) * 380, y: -(t - S('nada0')) * 260 + Math.sin(t * 30) * 8, o: t > S('nada0') - 0.05 ? 1 : 0, r: Math.sin(t * 40) * 20 });
    popA(nada, t, S('nada0'), { r: -4, s: 1 });
    stampA(mito, t, S('nada0') + 0.18, -10);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const lhs = el('div', c, { left: '40px', top: '560px', fontFamily: 'Rye', fontSize: '200px', lineHeight: 1, color: '#FBF6EA', textShadow: `8px 9px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 10 }, 'SOS');
  const eq = el('div', c, { left: '470px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: INK, zIndex: 10 }, '=');
  const hole = box(c, 640, 540, 300, 250, { border: `9px dashed ${INK}`, borderRadius: '24px', background: 'rgba(255,255,255,.45)', zIndex: 9 });
  el('div', hole, { left: '0', top: '60px', width: '282px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '54px', color: 'rgba(43,33,24,.35)' }, '( vacío )');
  const lens = box(c, 660, 660, 260, 300, { zIndex: 20 });
  lens.innerHTML = `<svg width="260" height="300" style="overflow:visible"><path d="M170,170 L250,280" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M170,170 L250,280" stroke="${WOOD}" stroke-width="22" stroke-linecap="round"/><circle cx="110" cy="110" r="104" fill="${INK}"/><circle cx="110" cy="110" r="94" fill="${BRASS}"/><circle cx="110" cy="110" r="80" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="4"/><path d="M60,80 q20,-30 50,-30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
  const fly = el('div', c, { left: '760px', top: '640px', fontSize: '70px', zIndex: 21 }, '<svg width="70" height="50" viewBox="0 0 70 50"><ellipse cx="22" cy="16" rx="18" ry="12" fill="#fff" stroke="#2B2118" stroke-width="3" opacity=".9"/><ellipse cx="46" cy="16" rx="18" ry="12" fill="#fff" stroke="#2B2118" stroke-width="3" opacity=".9"/><ellipse cx="34" cy="32" rx="10" ry="14" fill="#2B2118"/></svg>');
  const nada = el('div', c, { left: '0', top: '830px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '170px', color: INK, zIndex: 12 }, hlSpan('nada.', 'nh'));
  nada.querySelector('.nh').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const mito = stamp(c, 230, 1060, 'MITO', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   B · EL TITANIC SE HUNDE… «¿CON OTRA SEÑAL?» (T_B – soy)  L1 · cameo del emú
   ====================================================================== */
headline(T_B, S('empezo1') - 0.05, 'Y el *Titanic*, mientras se hundía…', { size: 80, hlT: S('titanic1') });
headline(S('empezo1') - 0.05, T_C, 'empezó pidiendo ayuda con *otra señal*', { size: 78, hlT: S('otra') });
{
  const tH = S('hundia'), tA = S('empezo1'), tQ = S('otra');
  const c = scene(T_B, T_C, t => {
    const kt = p(t, tH, 1.1, E.inOutCubic);
    set(cam, { s: 1 + 0.05 * p(t, T_B, T_C - T_B, E.linear) });
    set(ship.d, { r: kt * 9 + wobble(t, 0.5, 0.6), y: kt * 70 + wobble(t, 0.4, 4), x: -kt * 20 });
    [1, 2, 3].forEach(k => { const e = ship.d.querySelector('.wv' + k); const on = t > tA; const ph = ((t - tA) * 2.2 - k * 0.25) % 1; e.style.opacity = on && ph > 0 ? (1 - ph) : 0; });
    set(sea2, { x: Math.sin(t * 1.4) * 14 });
    set(sea1, { x: -Math.sin(t * 1.2) * 18 });
    // bote + emú
    const tE = S('hundia') + 0.25;
    set(boat.d, { y: Math.sin(t * 2.6) * 8, r: Math.sin(t * 2.1) * 3 });
    const up = t > tE && t < tE + 0.95 ? p(t, tE, 0.18, E.outBack) * (1 - p(t, tE + 0.8, 0.15, E.inCubic)) : 0;
    const look = t > tE + 0.15 && t < tE + 0.8;
    set(emu.d, { y: (1 - up) * 230 + Math.sin(t * 2.6) * 8, o: up > 0.02 ? 1 : 0 });
    face(emu, t, { look: look ? [0, 2] : [-8, 0], blink: false, half: !look, bR: look ? 16 : 0, bL: look ? 8 : 0 });
    // ¿?
    const kq = pop(t, tQ, 0.4); set(q, { s: kq * 1.1, r: 10 + Math.sin(t * 5) * 6, o: t < tQ ? 0 : 1 });
    popA(tp.wrap, t, tA + 0.2, { r: -3 }); tp.syms.forEach((s, i) => set(s, { o: t > tA + 0.3 + i * 0.12 ? 1 : 0 }));
    set(qs, { o: t > tQ + 0.1 ? 1 : 0, s: pop(t, tQ + 0.1, 0.3) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#D9CBB0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 2px, transparent 2px 16px)' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 70% 30%, rgba(255,250,230,.6), rgba(0,0,0,0) 40%)' });
  const ship = mk(cam, [60, 560, 900, 380], titanicInner({ waves: true }), '0 0 900 380', 'ship'); ship.d.style.zIndex = 3; ship.d.style.transformOrigin = '80% 70%';
  const sea1 = box(cam, -40, 0, 1160, 1920, { zIndex: 4 }); sea1.innerHTML = `<svg width="1160" height="1920" style="overflow:visible">${seaSvg(1160, 870, 900, 5, SEA)}</svg>`;
  const emu = mk(cam, [585, 770, 260, 390], emuFrontInner(), '0 0 400 600', 'emuF'); emu.d.style.zIndex = 5;
  const boat = mk(cam, [520, 1010, 400, 178], boatInner(), '0 0 360 160', 'boat'); boat.d.style.zIndex = 6;
  const sea2 = box(cam, -40, 0, 1160, 1920, { zIndex: 7 }); sea2.innerHTML = `<svg width="1160" height="1920" style="overflow:visible">${seaSvg(1160, 1150, 700, 9, SEA2)}</svg>`;
  const tp = tape(cam, 200, 1220, '−·− ? ·−·', { u: 34, z: 20 });
  const q = qMark(cam, 780, 1150, 200);
  const qs = chip(cam, 660, 1300, '¿cuál?', { size: 44, bg: PINK, z: 41 });
}

/* ======================================================================
   E1 · CADA UNO PEDÍA SOCORRO A SU MANERA (T_E1 – la compañía)  L3c
   ====================================================================== */
headline(T_E1, T_E2, 'Antes, cada barco pedía socorro *a su manera*', { size: 76, hlT: S('manera') });
{
  const FL = [];
  const c = scene(T_E1, T_E2, t => {
    FL.forEach((f, i) => { const t0 = T_E1 + 0.12 + i * 0.2; const k = p(t, t0, 0.5, E.outElastic); set(f.e, { y: (1 - clamp(k)) * -500, r: f.r + Math.sin(t * 3 + i) * 3 * clamp(k), o: t < t0 ? 0 : 1 }); });
    set(q1, { s: pop(t, S('manera'), 0.35), r: Math.sin(t * 5) * 8, o: t < S('manera') ? 0 : 1 });
    set(q2, { s: pop(t, S('manera') + 0.12, 0.35), r: -Math.sin(t * 5) * 8, o: t < S('manera') + 0.12 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const line = box(c, 0, 0, 1080, 1920, { zIndex: 5 }); line.innerHTML = `<svg width="1080" height="1920"><path d="M-10,520 Q540,610 1090,520" stroke="${INK}" stroke-width="6" fill="none"/></svg>`;
  [[40, 550, 'SOCORRO', 'Rye', 46, '·−·· −', -6, '#FBF6EA'], [290, 585, 'socorro', 'SpecialElite', 50, '−−· ·−', 4, '#FFF7C2'], [540, 585, 'SOCORRO', 'Playfair', 50, '·· −·−', -3, '#F4CFDA'], [790, 550, '¡socorro!', 'Bricolage', 44, '−·· ··', 5, '#DDE7D6']].forEach((q, i) => {
    const f = flagCard(c, q[0], q[1], 240, 380, `<div style="font-family:${q[3]};font-size:${q[4]}px;${q[3] === 'Playfair' ? 'font-weight:900;font-style:italic;' : q[3] === 'Bricolage' ? 'font-weight:800;' : ''}">${q[2]}</div><div style="font-family:InterV;font-weight:900;font-size:56px;margin-top:56px;letter-spacing:4px">${q[5]}</div><div style="font-family:Playfair;font-weight:900;font-size:80px;color:${RED};margin-top:10px">?</div>`, { bg: q[7], z: 8 + i });
    FL.push({ e: f, r: q[6] });
  });
  const q1 = qMark(c, 420, 1010, 190), q2 = qMark(c, 640, 1000, 150, YEL);
}

/* ======================================================================
   E2 · MARCONI USABA CQD (T_E2 – mil novecientos seis)  L3d
   ====================================================================== */
headline(T_E2, S('usaba') - 0.08, 'La compañía *Marconi*…', { size: 90, hlT: S('marconi') });
headline(S('usaba') - 0.08, T_F, '…usaba *CQD*', { size: 110, hlT: S('cqd3') });
{
  const c = scene(T_E2, T_F, t => {
    stampA(seal.d, t, S('marconi') - 0.05, -8);
    set(sh.d, { y: wobble(t, 0.5, 5), r: wobble(t, 0.4, 1) });
    popA(ej, t, S('ejemplo'), { r: 4 });
    const kc = p(t, S('cqd3'), 0.3, E.outBack); set(big, { s: t < S('cqd3') ? 0 : lerp(0.3, 1, kc), r: -3, o: t < S('cqd3') ? 0 : 1 });
    big.style.textShadow = (glitch(t, S('cqd3') + 0.05, 0.22) ? glitch(t, S('cqd3') + 0.05, 0.22) + ', ' : '') + `10px 10px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`;
    popA(tp.wrap, t, S('usaba'), { r: 2 }); tp.syms.forEach((s, i) => set(s, { o: t > S('usaba') + 0.1 + i * 0.07 ? 1 : 0 }));
    lbls.forEach((l, i) => popA(l, t, S('cqd3') + 0.1 + i * 0.12, {}));
  });
  sceneBg(c, { background: '#E2D5BA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const sh = mk(c, [420, 480, 640, 270], titanicInner({ waves: true }), '0 0 900 380', 'ship'); sh.d.style.zIndex = 2; sh.d.style.opacity = 0.9;
  const seal = mk(c, [60, 420, 400, 400], sealInner('COMPAÑÍA', 'MARCONI', '★ TELEGRAFÍA ★'), '0 0 400 400', 'seal'); seal.d.style.zIndex = 10;
  const ej = chip(c, 600, 800, 'por ejemplo', { size: 40, bg: '#fff', color: INK, z: 12 });
  const big = el('div', c, { left: '0', top: '820px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '230px', lineHeight: 1, color: YEL, zIndex: 14 }, 'CQD');
  const tp = tape(c, 360, 1110, '−·−· −−·− −··', { u: 26, z: 12 });
  const lbls = [chip(c, 400, 1210, 'C', { size: 34, bg: INK, color: '#fff', z: 13 }), chip(c, 600, 1210, 'Q', { size: 34, bg: INK, color: '#fff', z: 13 }), chip(c, 790, 1210, 'D', { size: 34, bg: INK, color: '#fff', z: 13 })];
}

/* ======================================================================
   F · 1906, BERLÍN: UNA SEÑAL PARA TODOS (T_F – por qué)  L4
   ====================================================================== */
headline(S('acordo') - 0.2, T_G1, 'Una señal *para todos*', { size: 96, hlT: S('todos') });
{
  const c = scene(T_F, T_G1, t => {
    set(cam, { s: 1 + 0.04 * p(t, T_F, T_G1 - T_F, E.linear) });
        { const t0 = S('seis') - 0.05, k = p(t, t0, 0.18, E.outCubic); set(yr, { s: t < t0 ? 0 : lerp(2.2, 1, k), r: -4, o: t < t0 ? 0 : 1 - p(t, S('acordo') - 0.3, 0.2) }); }
    const kb = p(t, S('berlin') - 0.1, 0.55, E.outElastic); set(ban, { y: (1 - clamp(kb)) * -300, r: Math.sin(t * 2) * 1.5, o: t < S('berlin') - 0.12 ? 0 : 1 });
    DL.forEach((d, i) => {
      const t0 = T_F + 0.15 + i * 0.1, k = p(t, t0, 0.4, E.outBack);
      const nod = t > S('senal4') && t < S('sos4') ? Math.abs(Math.sin((t - S('senal4')) * 7 + i)) * 10 : 0;
      const cheer = t > S('sos4') + 0.1 ? -Math.abs(Math.sin(t * 12 + i)) * 18 : 0;
      set(d.d, { y: (1 - k) * 420 + nod + cheer + wobble(t, 0.6, 2, i * 0.3), o: t < t0 ? 0 : 1 });
      face(d, t, { look: t > S('acordo') - 0.1 && t < S('acordo') + 0.5 ? [0, 4] : [i < 2 ? 4 : -4, -1], jaw: cheer ? 0.6 : (t > S('todos') && t < SE('todos') && i % 2 ? 0.3 : 0), brow: t > S('acordo') && t < S('acordo') + 0.4 ? -6 : 0, seed: i * 0.7 });
    });
    const kg = t < S('acordo') - 0.25 ? 0 : t < S('acordo') ? -p(t, S('acordo') - 0.25, 0.25) * 50 : -50 + p(t, S('acordo'), 0.08, E.inCubic) * 70;
    set(gav.d, { r: kg + (t > S('acordo') + 0.08 ? shake(t, S('acordo') + 0.08, 0.3, 5) : 0) });
    set(bang, { s: pop(t, S('acordo') + 0.08, 0.25), o: t > S('acordo') + 0.08 && t < S('acordo') + 0.7 ? 1 : 0 });
    popA(doc, t, S('senal4'), { r: -3 });
    stampA(st, t, S('sos4'), -7);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#D8C3A0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.1) 0 4px, transparent 4px 120px)' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 40%, rgba(255,240,200,.55), rgba(0,0,0,0) 55%)' });
  const yr = el('div', c, { left: '0', top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '190px', lineHeight: '200px', color: YEL, textShadow: `9px 9px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 30 }, '1906');
  const ban = box(cam, 230, 500, 620, 140, { zIndex: 4 });
  ban.innerHTML = `<svg width="620" height="140" style="overflow:visible"><path d="M40,0 L60,30 M580,0 L560,30" stroke="${INK}" stroke-width="5"/>${cut('<path d="M0,30 H620 L590,82 L620,134 H0 L30,82 Z"/>')}<path d="M0,30 H620 L590,82 L620,134 H0 L30,82 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><path d="M0,30 H620 L590,82 L620,134 H0 L30,82 Z" fill="url(#hA)" opacity=".35"/><text x="310" y="104" text-anchor="middle" font-family="Rye" font-size="64" fill="#FBF6EA">BERLÍN · 1906</text></svg>`;
  const DL = [[60, 650, 0, 61], [270, 620, 1, 62], [500, 640, 2, 63], [720, 630, 3, 64]].map(q => { const f = mk(cam, [q[0], q[1], 300, 383], delegateInner(q[3], q[2]), '0 0 360 460', 'bust'); f.d.style.zIndex = 5; return f; });
  const tb = box(cam, 0, 0, 1080, 1920, { zIndex: 7 }); tb.innerHTML = tableSvg(960);
  const doc = paperPiece(cam, 590, 895, 320, 170, { seed: 77, bg: '#FBF6EA' }).wrap; doc.style.zIndex = 8;
  el('div', doc, { left: '0', top: '22px', width: '320px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', color: INK }, 'señal de socorro');
  el('div', doc, { left: '0', top: '58px', width: '320px', textAlign: 'center', fontFamily: 'Rye', fontSize: '80px', color: INK }, 'SOS');
  const gav = mk(cam, [330, 860, 280, 175], gavelInner(), '0 0 320 200', 'gav'); gav.d.style.zIndex = 9; gav.d.style.transformOrigin = '12% 88%';
  const bang = el('div', cam, { left: '420px', top: '780px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 10 }, '¡PUM!');
  const st = stamp(c, 250, 700, 'SOS<br>PARA TODOS', { size: 96, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' }); st.style.textAlign = 'center';
}
