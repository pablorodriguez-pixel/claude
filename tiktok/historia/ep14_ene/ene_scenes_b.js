/* Ep. 14 · escenas L4–L9 */

/* ======================================================================
   E · «AÑO» ← latín «ANNUS» — cartela de diccionario, elegante
   ====================================================================== */
headline(S.E[0], K.con4 - 0.08, 'Por eso *«año»*…', { size: 110, hlT: K.ano });
headline(K.con4 - 0.08, S.E[1], 'Con *dos enes*', { size: 120, hlT: K.dos });
{
  const c = scene(S.E[0], S.E[1], t => {
    set(pp.wrap, { y: (1 - p(t, S.E[0], 0.4, E.outBack)) * 900, r: -1 + wobble(t, 0.35, 0.4) });
    popA(ano, t, K.ano - 0.05, { rise: 30 });
    paint(nh, t, K.enes + 0.25, 0.3);
    set(arw, { o: t > K.viene ? 1 : 0 }); arwP.style.strokeDashoffset = f1(300 * (1 - p(t, K.viene, 0.4, E.inOutCubic)));
    popA(lat, t, K.latin, { r: 0 });
    an.style.clipPath = `inset(-30px ${f1((1 - p(t, K.annus, 0.55, E.inOutCubic)) * 100)}% -30px -30px)`; an.style.opacity = t < K.annus ? 0 : 1;
    paint(h1, t, K.dos, 0.25); paint(h2, t, K.enes, 0.25);
    [b1, b2].forEach((b, i) => set(b, { s: pop(t, [K.dos, K.enes][i] + 0.05, 0.3), o: t < [K.dos, K.enes][i] + 0.05 ? 0 : 1 }));
    lk.style.strokeDashoffset = f1(700 * (1 - p(t, K.enes + 0.2, 0.45, E.inOutCubic))); lk0.style.strokeDashoffset = lk.style.strokeDashoffset;
    set(lkW, { o: t > K.enes + 0.2 ? 1 : 0 });
  });
  sceneBg(c, { background: '#E9DFC9', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  const pp = paperPiece(c, 90, 420, 900, 700, { seed: 71, bg: '#FBF6EA' });
  const iw = 882;
  el('div', pp.inner, { left: '0', top: '16px', width: px(iw), textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', letterSpacing: '0.3em', color: '#7a6a58', whiteSpace: 'nowrap' }, 'DICCIONARIO');
  box(pp.inner, 40, 60, iw - 80, 3, { background: INK }); box(pp.inner, 40, 67, iw - 80, 1.5, { background: INK });
  const ano = el('div', pp.inner, { left: '0', top: '70px', width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '210px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  ano.innerHTML = `a${hlSpan('ñ', 'nh')}o`;
  const nh = ano.querySelector('.nh');
  const lat = el('div', pp.inner, { left: '0', top: '316px', width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 500, fontSize: '44px', color: '#5a4a3a', whiteSpace: 'nowrap' }, '— del latín —');
  const an = el('div', pp.inner, { left: '0', top: '376px', width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 700, fontSize: '206px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  an.innerHTML = `a${hlSpan('n', 'h1', '#ff9ac8')}${hlSpan('n', 'h2', '#ff9ac8')}us`;
  const h1 = an.querySelector('.h1'), h2 = an.querySelector('.h2');
  const b1 = el('div', pp.inner, { left: '330px', top: '612px', width: '48px', height: '48px', borderRadius: '50%', background: INK, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', lineHeight: '46px', textAlign: 'center', zIndex: 5 }, '1');
  const b2 = el('div', pp.inner, { left: '452px', top: '612px', width: '48px', height: '48px', borderRadius: '50%', background: INK, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', lineHeight: '46px', textAlign: 'center', zIndex: 5 }, '2');
  const arw = box(pp.inner, 700, 170, 120, 240, { zIndex: 3 });
  arw.innerHTML = `<svg width="120" height="240" style="overflow:visible"><path class="ap" d="M60,0 C100,60 100,150 60,210" stroke="${INK}" stroke-width="6" fill="none" stroke-dasharray="300" stroke-dashoffset="300" stroke-linecap="round"/><path d="M40,190 L60,214 L84,196" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  const arwP = arw.querySelector('.ap');
  // enlace: las dos enes → la ñ
  const lkW = box(pp.inner, 0, 0, iw, 600, { zIndex: 6 });
  lkW.innerHTML = `<svg width="${iw}" height="600" style="overflow:visible"><path class="l0" d="M420,440 C400,370 460,350 444,300" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-dasharray="700" stroke-dashoffset="700"/><path class="l1" d="M420,440 C400,370 460,350 444,300" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="700" stroke-dashoffset="700"/></svg>`;
  const lk = lkW.querySelector('.l1'), lk0 = lkW.querySelector('.l0');
}

/* ======================================================================
   F1 · 1991 — DESDE EUROPA SE PIDIÓ… TECLADOS SIN EÑE
   ====================================================================== */
headline(K.desde - 0.08, K.espana1 - 0.08, 'Desde *Europa* se pidió…', { size: 96, hlT: K.europa2 });
headline(K.espana1 - 0.08, S.F1[1], '…vender teclados *sin eñe*', { size: 92, hlT: K.sin });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    // 1991 aparece DIRECTO (sin contador) en «mil»
    const k = p(t, K.mil, 0.17, E.outCubic), kOut = p(t, K.desde - 0.25, 0.2, E.inCubic);
    set(yr, { s: t < K.mil ? 0 : lerp(1.9, 1, k) * (1 - kOut), r: -4, o: t < K.mil ? 0 : 1 - kOut });
    popA(ych, t, K.desde - 0.1, { r: -6 });
    set(flag.d, { s: pop(t, K.europa2, 0.45), r: -5 + wobble(t, 0.6, 3), o: t < K.europa2 ? 0 : 1 });
    // la carta viaja de la bandera al teclado
    const ke = p(t, K.pidio - 0.05, 0.75, E.inOutCubic);
    set(env, { x: lerp(0, 340, ke), y: lerp(0, 210, ke) - Math.sin(ke * Math.PI) * 180, r: lerp(-14, 6, ke) + Math.sin(t * 6) * 3, s: pop(t, K.pidio - 0.05, 0.3), o: t < K.pidio - 0.05 ? 0 : 1 - p(t, K.sin - 0.2, 0.2) });
    popA(es, t, K.espana1, { r: -4 });
    set(kb.wrap, { y: (1 - p(t, S.F1[0], 0.4, E.outBack)) * 600 + (t > K.teclados2 && t < K.teclados2 + 0.3 ? -Math.sin((t - K.teclados2) / 0.3 * Math.PI) * 20 : 0), r: -2 });
    // la Ñ desaparece en «sin eñe»
    const kg = p(t, K.sin, 0.25, E.inCubic);
    set(kb.enie, { s: 1 - kg, r: kg * 90, o: 1 - kg });
    set(ring, { s: pop(t, K.sin + 0.1, 0.35), o: t < K.sin + 0.1 ? 0 : 1, r: wobble(t, 0.7, 3) });
    set(nog, { s: pop(t, K.sin, 0.4), r: -6 + wobble(t, 0.6, 2), o: t < K.sin ? 0 : 1 });
    nogBar.style.strokeDashoffset = f1(420 * (1 - p(t, K.ene5, 0.22, E.outCubic)));
  });
  sceneBg(c, { background: '#E6DCC6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const yr = el('div', c, { left: 0, top: '190px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '230px', lineHeight: '250px', color: YEL, textShadow: outl(INK, 3, 10), zIndex: 30 }, '1991');
  const ych = chip(c, 70, 440, '1991', { size: 60, bg: INK, color: YEL, z: 30 });
  const flag = mk(c, [60, 520, 330, 260], euFlagInner(), '0 0 420 330', 'flag'); flag.d.style.zIndex = 8;
  const env = box(c, 280, 600, 200, 140, { zIndex: 20 });
  let est = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; est += `<path d="${starPath(100 + Math.cos(a) * 20, 92 + Math.sin(a) * 20, 5)}" fill="${YEL}"/>`; }
  env.innerHTML = `<svg width="200" height="140" style="overflow:visible">${cut('<rect x="0" y="0" width="200" height="140" rx="8"/>', 6, 8)}<rect x="0" y="0" width="200" height="140" rx="8" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><path d="M4,6 L100,80 L196,6" stroke="${INK}" stroke-width="5" fill="none"/><circle cx="100" cy="92" r="32" fill="${EUB}" stroke="${INK}" stroke-width="4"/>${est}</svg>`;
  const es = chip(c, 420, 660, 'España', { size: 56, bg: RED, color: '#fff', z: 30 });
  const kb = mkKeyboard(c, 230, 790, { k: 56, g: 8, pad: 18, hiN: true, z: 6 });
  const NX = 18 + 0.32 * 56 + 9 * 64 + 28, NY = 18 + 64 + 28;
  const ring = box(c, 230 + NX - 60, 790 + NY - 60, 120, 120, { zIndex: 25, border: `8px dashed ${RED}`, borderRadius: '50%', boxShadow: `0 0 0 3px #fff` });
  const nog = box(c, 620, 440, 300, 300, { zIndex: 26 });
  nog.innerHTML = `<svg viewBox="0 0 300 300" width="300" height="300" style="overflow:visible"><circle cx="156" cy="158" r="140" fill="${SH}"/><circle cx="150" cy="150" r="140" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="150" cy="150" r="118" fill="none" stroke="${RED}" stroke-width="30"/><text x="150" y="222" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="200" fill="${INK}">Ñ</text><path class="nb" d="M66,66 L234,234" stroke="${RED}" stroke-width="30" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="420"/></svg>`;
  const nogBar = nog.querySelector('.nb');
}

/* ======================================================================
   F2 · GOLPE ROSA — «SE MONTÓ UN ¡ESCÁNDALO! NACIONAL» + periódicos volando
   ====================================================================== */
colorHit(S.F2[0], S.F2[1], PINK, c => {
  const top = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, zIndex: 8 }, 'Se montó un…');
  const st = stamp(c, 90, 400, '¡ESCÁNDALO!', { size: 116, bw: 16, z: 40, bg: 'rgba(255,255,255,.96)', blend: 'normal' });
  const nac = el('div', c, { left: 0, top: '600px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '190px', color: '#fff', textShadow: outl(INK, 5, 12), zIndex: 39 }, 'NACIONAL');
  const NP = [[-40, 760, -18, -1], [700, 720, 16, 1], [40, 1010, 10, -1], [640, 980, -12, 1]].map(([x, y, r, d], i) => { const n = newsPaper(c, x, y, 380, 300, 80 + i, { head: 'LA Ñ, EN PELIGRO' }); n.wrap.style.zIndex = 10 + i; return { e: n.wrap, r, d, t0: S.F2[0] + 0.08 + i * 0.12 }; });
  const crowd = [mk(c, [100, 1120, 300, 383], fanInner(81, 'cap', '#3a2f26'), '0 0 360 460', 'bust'), mk(c, [390, 1080, 320, 409], journalistInner(82, 1), '0 0 360 460', 'bust'), mk(c, [690, 1120, 300, 383], fanInner(83, 'slouch', '#5a4632'), '0 0 360 460', 'bust')];
  crowd.forEach(f => { f.d.style.filter = SIL; f.d.style.zIndex = 5; });
  const FI = [[150, 1060], [520, 1000], [850, 1060]].map(([x, y]) => { const d = box(c, x, y, 80, 120, { zIndex: 6 }); d.innerHTML = `<svg viewBox="0 0 80 120" width="80" height="120"><rect x="24" y="50" width="32" height="70" fill="#000"/><rect x="8" y="10" width="64" height="52" rx="18" fill="#000"/></svg>`; return d; });
  return t => {
    popA(top, t, K.se5, { rise: 30 });
    stampA(st, t, K.escandalo, -8, 1);
    const kn = p(t, K.nacional - 0.02, 0.2, E.outBack); set(nac, { s: t < K.nacional - 0.02 ? 0 : lerp(1.6, 1, kn), r: -3, o: t < K.nacional - 0.02 ? 0 : 1 });
    nac.style.textShadow = (glitch(t, K.nacional, 0.3) ? glitch(t, K.nacional, 0.3) + ', ' : '') + outl(INK, 5, 12);
    NP.forEach((n, i) => { const k = p(t, n.t0, 0.45, E.outBack); set(n.e, { x: (1 - k) * 900 * n.d + Math.sin(t * 3 + i) * 14, y: Math.cos(t * 2.4 + i) * 16, r: n.r + Math.sin(t * 2 + i) * 6, o: t < n.t0 ? 0 : 1 }); });
    crowd.forEach((f, i) => { set(f.d, { y: -Math.abs(Math.sin(t * 9 + i * 1.3)) * 26, r: Math.sin(t * 7 + i) * 3 }); face(f, t, {}); });
    FI.forEach((f, i) => set(f, { y: -Math.abs(Math.sin(t * 9 + i * 1.3 + 0.4)) * 40, r: Math.sin(t * 12 + i) * 12 }));
  };
});

/* ======================================================================
   G1 · UNA NORMA OBLIGÓ — sello «OBLIGATORIA» y la Ñ vuelve al teclado
   ====================================================================== */
headline(S.G1[0], K.teclados3 - 0.08, 'Una *norma* obligó…', { size: 104, hlT: K.norma });
headline(K.teclados3 - 0.08, S.G1[1], 'En España, *con Ñ*', { size: 110, hlT: K.lleven });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    set(kb.wrap, { r: -6, y: (1 - p(t, S.G1[0], 0.4, E.outBack)) * 600 + (t > K.lleven + 0.3 && t < K.lleven + 0.6 ? Math.sin(t * 60) * 6 : 0) });
    set(doc.wrap, { s: pop(t, K.norma - 0.05, 0.45), r: -6 + wobble(t, 0.5, 1), o: t < K.norma - 0.05 ? 0 : 1 });
    stampA(ob, t, K.obligo, -10, 1);
    popA(es, t, K.espana2, { r: 4 });
    // la Ñ vuelve volando y encaja
    const kin = p(t, K.lleven - 0.1, 0.42, E.outBack);
    set(kb.enie, { x: (1 - kin) * 700, y: (1 - kin) * -900, r: (1 - kin) * 540, s: 1, o: t < K.lleven - 0.1 ? 0 : 1 });
    kb.kf.style.opacity = t > K.lleven - 0.1 && t < K.lleven + 0.5 ? 1 : 0;
    SP.forEach((s, i) => { const t0 = K.lleven + 0.3 + i * 0.06; set(s, { s: pop(t, t0, 0.3), r: t * 140, o: t < t0 ? 0 : 1 - p(t, t0 + 0.6, 0.2) }); });
  }, { clip: true });
  sceneBg(c, { background: '#E9DFC9', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const kb = mkKeyboard(c, 0, 0, { k: 150, g: 16, hiN: true, z: 5 });
  const NX = 26 + 0.32 * 150 + 9 * 166 + 75, NY = 26 + 166 + 75;
  kb.wrap.style.left = px(760 - NX); kb.wrap.style.top = px(920 - NY); kb.wrap.style.transformOrigin = `${NX}px ${NY}px`;
  const doc = paperPiece(c, 90, 400, 420, 380, { seed: 91, bg: '#FBF6EA' }); doc.wrap.style.zIndex = 20;
  el('div', doc.inner, { left: '0', top: '20px', width: '402px', textAlign: 'center', fontFamily: 'Rye', fontSize: '74px', color: INK, whiteSpace: 'nowrap' }, 'NORMA');
  box(doc.inner, 40, 112, 322, 5, { background: INK });
  box(doc.inner, 0, 0, 402, 362).innerHTML = `<svg width="402" height="362">${[140, 172, 204, 236, 268].map((y, i) => `<path d="M44,${y} H${i % 2 ? 300 : 360}" stroke="${INK}" stroke-width="7" opacity=".3"/>`).join('')}<circle cx="320" cy="296" r="38" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="320" cy="296" r="26" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M300,330 l-10,40 l20,-12 l14,16 l4,-40 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/></svg>`;
  const ob = stamp(c, 150, 640, 'OBLIGATORIA', { size: 96, bw: 13, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const es = chip(c, 640, 470, 'en España', { size: 54, bg: RED, color: '#fff', z: 30 });
  const SP = [[640, 700], [880, 760], [700, 1050], [880, 1040]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
}

/* ======================================================================
   G2 · HASTA HOY — tu móvil escribe «año» + cameo del emú
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Hasta *hoy*', { size: 140, hlT: K.hoy });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(ph.wrap, { y: (1 - p(t, S.G2[0], 0.35, E.outBack)) * 900, r: 3 + wobble(t, 0.5, 1) });
    const typed = ['', 'a', 'añ', 'año'][(t > K.hasta + 0.05) + (t > K.hasta + 0.3) + (t > K.hasta + 0.52)];
    ph.field.innerHTML = typed.replace('ñ', `<span style="background:${YEL}">ñ</span>`) + `<span style="display:inline-block;width:6px;height:70px;background:${INK};vertical-align:-8px;margin-left:4px;opacity:${Math.sin(t * 18) > 0 ? 1 : 0}"></span>`;
    const pr = t > K.hasta + 0.3 && t < K.hasta + 0.45;
    set(ph.keys['Ñ'], { s: pr ? 1.5 : 1 + 0.08 * Math.sin(t * 8), y: pr ? -20 : 0 });
    popA(mv, t, K.hoy, { r: -5 });
    // cameo del emú: asoma y mira a cámara ~0,6 s
    const kE = p(t, K.hasta + 0.1, 0.3, E.outBack), look = t > K.hasta + 0.25 && t < K.hasta + 0.85;
    set(emu.d, { x: lerp(-330, 0, kE), r: lerp(-20, 8, kE) + (look ? 0 : wobble(t, 0.7, 2)), o: t < K.hasta + 0.1 ? 0 : 1 });
    face(emu, t, { look: look ? [0, 0] : [16, 4], half: !look, bL: look ? 18 : 0, bR: look ? 26 : 0, blink: false });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -170, 360, 1420, 22, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const emu = mkEmuF(c, [0, 440, 380, 570]); emu.d.style.zIndex = 3;
  const ph = mkPhone(c, 360, 420, 440, 880, { z: 6 });
  const mv = chip(c, 640, 1170, 'tu móvil', { size: 50, bg: PINK, z: 30 });
}

/* ======================================================================
   H · ¡OJO! — la rayita en muchas letras… pero la Ñ se queda (con corona)
   ====================================================================== */
headline(K.esa - 0.1, K.muchas - 0.08, 'Esa *rayita*…', { size: 120, hlT: K.rayita2 });
headline(K.muchas - 0.08, K.pero - 0.06, '…con *muchas* letras', { size: 104, hlT: K.muchas });
headline(K.pero - 0.06, S.H[1], '*Letra propia*', { size: 130, hlT: K.letra7 });
{
  const c = scene(S.H[0], S.H[1], t => {
    const kt = p(t, K.ojo + 0.55, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.3, 1, k0), 0.36, kt), x: kt * -420, y: kt * -300, r: -10, o: t < K.ojo ? 0 : 1 });
    // rayita grande que se dibuja
    bt.style.strokeDashoffset = f1(700 * (1 - p(t, K.rayita2 - 0.05, 0.45, E.inOutCubic))); bt0.style.strokeDashoffset = bt.style.strokeDashoffset;
    set(btW, { o: t < K.muchas - 0.1 ? 1 : 1 - p(t, K.muchas - 0.1, 0.2), s: 1 + 0.05 * Math.sin(t * 4) });
    // monje copista
    set(mon.d, { y: (1 - p(t, K.copistas2 - 0.1, 0.4, E.outBack)) * 600 + p(t, K.pero, 0.3, E.inCubic) * 700, r: -4 + wobble(t, 0.6, 2), o: t < K.copistas2 - 0.1 || t > K.pero + 0.3 ? 0 : 1 });
    monkFace(mon, t, { look: [-6, -4], jaw: t > K.copistas2 && t < K.letras ? 0.2 : 0, seed: 0.9 });
    set(qd, { r: 20 + Math.sin(t * 7) * 8, y: (1 - p(t, K.copistas2 - 0.1, 0.4, E.outBack)) * 600 + p(t, K.pero, 0.3, E.inCubic) * 700, o: t < K.copistas2 - 0.1 || t > K.pero + 0.3 ? 0 : 1 });
    // fichas con rayita
    TL.forEach((q, i) => {
      const t0 = K.muchas - 0.05 + i * 0.09, fall = q.keep ? 0 : p(t, K.pero + i * 0.05, 0.45, E.inCubic);
      const kk = q.keep ? p(t, K.castellano - 0.15, 0.3, E.inCubic) : 0;
      set(q.e, { s: pop(t, t0, 0.35) * (1 - kk), y: fall * 900 + Math.sin(t * 4 + i) * 6, r: q.r + fall * (i % 2 ? 60 : -60), o: t < t0 ? 0 : (1 - fall) * (1 - kk) });
    });
    // la Ñ gigante sube y se corona
    const kr = p(t, K.castellano - 0.2, 0.45, E.outBack), kc = p(t, K.letra7 - 0.1, 0.5, E.outBounce), crowned = t > K.letra7 - 0.1;
    set(en.d, { y: (1 - kr) * 800 + wobble(t, 0.6, 4) - (crowned ? Math.abs(Math.sin(t * 10)) * 10 * p(t, K.propia, 0.2) : 0), s: 1, o: t < K.castellano - 0.2 ? 0 : 1 });
    eneFace(en, t, { look: crowned ? [0, -2] : [-6, -6], closed: t > K.propia + 0.2, bL: 10, bR: 10, aL: crowned ? 70 : 20, aR: crowned ? 70 : 20, seed: 0.8, crown: crowned ? { y: lerp(-500, 0, kc), r: wobble(t, 0.8, 4) } : null });
    popA(cs, t, K.castellano, { r: -4 });
    SP.forEach((s, i) => { const t0 = K.propia + i * 0.08; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 }); });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const btW = box(c, 240, 470, 600, 220, { zIndex: 5 });
  btW.innerHTML = `<svg viewBox="0 0 600 220" width="600" height="220" style="overflow:visible"><path class="b0" d="M50,170 C150,30 250,30 300,100 C350,170 450,190 550,50" stroke="#fff" stroke-width="80" fill="none" stroke-linecap="round" stroke-dasharray="700" stroke-dashoffset="700"/><path class="b1" d="M50,170 C150,30 250,30 300,100 C350,170 450,190 550,50" stroke="${INK}" stroke-width="56" fill="none" stroke-linecap="round" stroke-dasharray="700" stroke-dashoffset="700"/></svg>`;
  const bt = btW.querySelector('.b1'), bt0 = btW.querySelector('.b0');
  const mon = mkMonk(c, [600, 840, 330, 422]); mon.d.style.zIndex = 4;
  const qd = box(c, 540, 860, 76, 228, { zIndex: 5 }); qd.innerHTML = quillSvg();
  // fichas de imprenta: a e n o u q, cada una con su rayita
  const TL = [];
  ['a', 'e', 'n', 'o', 'u', 'q'].forEach((ch, i) => {
    const x = 120 + (i % 3) * 300, y = i < 3 ? 520 : 780;
    const w = box(c, x, y, 240, 210, { zIndex: ch === 'n' ? 9 : 8 });
    miniSort(w, 40, 40, ch, { w: 160, h: 170, fs: 120, z: 2 });
    const tw = box(w, 50, -18, 140, 70, { zIndex: 4 }); tw.innerHTML = `<svg viewBox="0 0 140 70" width="140" height="70" style="overflow:visible"><path d="M14,50 C40,6 70,8 80,28 C90,48 110,56 128,16" stroke="#fff" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M14,50 C40,6 70,8 80,28 C90,48 110,56 128,16" stroke="${ch === 'n' ? RED : INK}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`;
    TL.push({ e: w, keep: ch === 'n', r: [-6, 4, 0, 5, -4, 6][i] });
  });
  const en = mkEne(c, [340, 690, 400, 627], 'N'); en.d.style.zIndex = 10;
  const cs = chip(c, 660, 1150, 'en castellano', { size: 50, bg: RED, color: '#fff', z: 30 });
  const SP = [[260, 560], [800, 620], [860, 980], [220, 900]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
  const ojo = stamp(c, 270, 640, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   I · GOLPE AMARILLO: «LA LETRA MÁS ESPAÑOLA… = AHORRAR TINTA» → ¿SÍ o NO?
   ====================================================================== */
{
  const T2 = K.lo - 0.12;
  colorHit(S.I[0], S.I[1], YEL, c => {
    const g1 = box(c, 0, 0, 1080, 1920, { zIndex: 8 });
    const os = el('div', g1, { left: 0, top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', color: INK }, 'O sea:');
    const l1 = el('div', g1, { left: 0, top: '320px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.08, color: INK });
    const WD = [];
    [['La', K.la8], ['letra', K.letra8], ['más', K.mas], ['<i>española</i>', K.espanola], ['<br>', 0], ['del', K.abecedario - 0.1], ['abecedario…', K.abecedario]].forEach(([w, t0]) => { if (w === '<br>') { l1.appendChild(document.createElement('br')); return; } const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = w; l1.appendChild(s); WD.push({ e: s, t: t0 }); });
    const es = el('div', g1, { left: 0, top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', color: INK }, '…es un truco para');
    const ah = el('div', g1, { zIndex: 5, left: 0, top: '400px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '150px', color: '#fff', textShadow: outl(INK, 5, 12) }, 'AHORRAR<br>TINTA');
    const sil = mkEne(g1, [390, 860, 300, 470], 'N'); sil.d.style.filter = SIL; sil.d.style.zIndex = 2;
    const ink = mk(g1, [700, 900, 230, 251], inkwellInner(), '0 0 220 240', 'ink'); ink.d.style.filter = SIL;
    const drop = box(g1, 790, 760, 60, 84); drop.innerHTML = `<svg viewBox="0 0 40 56" width="60" height="84"><path d="M20,2 Q2,30 8,44 Q20,58 32,44 Q38,30 20,2 Z" fill="#000"/></svg>`;
    // fase 2: pregunta + SÍ / NO
    const g2 = box(c, 0, 0, 1080, 1920, { zIndex: 9 });
    const q1 = el('div', g2, { left: 0, top: '206px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: INK }, 'La Ñ = un truco para ahorrar tinta');
    const q2 = el('div', g2, { left: 0, top: '280px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '128px', color: INK }, '¿Lo sabías?');
    const btn = (x, txt, bg, col) => el('div', g2, { left: px(x), top: '1010px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
    const bS = btn(120, 'SÍ', '#fff', INK), bN = btn(560, 'NO', '#fff', RED);
    const hand = box(g2, 320, 1140, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
    const mini = mkEne(g2, [700, 500, 230, 361], 'N'); mini.d.style.zIndex = 12;
    const CM = [];
    [['FAR', '@marta.letras', 'SÍ 😳', K.lo + 0.2], ['SOL', '@javi_teclas', 'No, ya lo sabía', K.sabias + 0.35], ['MEREDITH', '@lucia.bcn', '¡Lo del sombrero! 🤯', K.sabias + 0.75]].forEach((m, i) => {
      const e = box(g2, 50, [480, 630, 780][i], 600, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 20 });
      avatar(e, 10, 10, 84, m[0], { bw: 3 });
      el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
      el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, m[2]);
      CM.push({ e, t: m[3] });
    });
    return t => {
      const out = p(t, T2, 0.25, E.inCubic);
      set(g1, { y: -out * 1200, o: 1 - out }); g1.style.display = out >= 1 ? 'none' : '';
      g2.style.display = t < T2 ? 'none' : '';
      popA(os, t, K.L8, { rise: 30 }); os.style.opacity = t < K.L8 ? 0 : 1 - p(t, K.es - 0.1, 0.15);
      WD.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0 : 1 - p(t, K.es - 0.1, 0.15) }));
      popA(es, t, K.es - 0.04, { rise: 30 });
      const ka = p(t, K.ahorrar8 - 0.02, 0.2, E.outBack); set(ah, { s: t < K.ahorrar8 - 0.02 ? 0 : lerp(1.6, 1, ka), r: -3, o: t < K.ahorrar8 - 0.02 ? 0 : 1 });
      ah.style.textShadow = (glitch(t, K.tinta, 0.3) ? glitch(t, K.tinta, 0.3) + ', ' : '') + outl(INK, 5, 12);
      set(sil.d, { y: Math.abs(Math.sin(t * 6)) * -16, r: Math.sin(t * 5) * 3, s: pop(t, S.I[0] + 0.1, 0.4) }); eneFace(sil, t, { aL: 40 + Math.sin(t * 8) * 20, aR: 40 + Math.cos(t * 8) * 20 });
      set(ink.d, { s: pop(t, K.tinta - 0.05, 0.4), r: -6, o: t < K.tinta - 0.05 ? 0 : 1 });
      set(drop, { y: ((t - K.tinta) * 300) % 160, o: t > K.tinta ? 1 : 0 });
      // fase 2
      popA(q1, t, T2 + 0.05, { rise: 20 });
      popA(q2, t, K.lo, { rise: 30, r: -2 });
      [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const press = t > t0 + 0.35 && t < t0 + 0.5; set(b, { s: pop(t, T2 + 0.2 + i * 0.12, 0.4) * (press ? 0.9 : 1 + 0.07 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < T2 + 0.2 + i * 0.12 ? 0 : 1 }); });
      bS.style.background = t > K.si + 0.35 ? INK : '#fff'; bS.style.color = t > K.si + 0.35 ? YEL : INK;
      set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.5 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
      CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
      set(mini.d, { s: pop(t, T2 + 0.3, 0.4), y: wobble(t, 0.7, 6), r: wobble(t, 0.5, 3) });
      eneFace(mini, t, { look: t > K.si ? [-8, 8] : [-6, 0], bL: t > K.sabias ? 14 : 4, bR: t > K.sabias ? 14 : 4, open: t > K.lo && t < K.sabias + 0.5 ? 0.5 : 0, aL: 30, aR: 70 + Math.sin(t * 10) * 15, seed: 1 });
    };
  });
}

/* ======================================================================
   C9 · MARCA (última frase): EL VECINO EN SU BALCÓN — rápido
   ====================================================================== */
{
  const T0 = S.C9[0], T1 = S.C9[1];
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
   L9 · …EN EL LIBRO — el libro HISTORIA se cierra de golpe (con la Ñ dentro)
   ====================================================================== */
headline(S.L9[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L9[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    eneFace(stand, t, { look: t > TC - 0.2 ? [6, -6] : [-3, 2], bL: 12, bR: 12, sweat: t > TC - 0.2, open: t > TC - 0.2 ? 0.5 : 0, aL: 40, aR: 40, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L9[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 10; i++) lines += `<path d="M180,${850 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="770" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="110" fill="${INK}">Ñ</text><text x="335" y="820" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">el abecedario</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkEne(bookW, [650, 560, 190, 298], 'N'); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 14 · La Ñ nació para ahorrar</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
