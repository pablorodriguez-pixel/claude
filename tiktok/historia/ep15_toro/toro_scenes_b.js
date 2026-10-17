/* Ep. 15 · escenas L5–L9 */

/* ======================================================================
   F · TRAPOS DE VARIOS COLORES — va a por el que se mueve
   ====================================================================== */
headline(S.F[0], K.el5 - 0.05, 'Lo han probado: *varios colores*', { size: 80, hlT: K.varios });
headline(K.el5 - 0.05, K.sea - 0.05, 'Va a por *el que se mueve*', { size: 88, hlT: K.que5 });
headline(K.sea - 0.05, S.F[1], 'Sea del *color* que sea', { size: 100, hlT: K.color5 });
{
  const CYC = [BLUE, GREEN, CAPY, '#fff', RED, BLUE];
  const c = scene(S.F[0], S.F[1], t => {
    const mv = t > K.que5 - 0.1;
    TR.forEach((q, i) => {
      const t0 = K.trapos + i * 0.18;
      const moving = mv && i === 2;
      let col = q.col;
      if (moving && t > K.sea) col = CYC[Math.min(CYC.length - 1, Math.floor((t - K.sea) / 0.26))];
      updCloth(q.c, t + i * 0.7, { amp: moving ? 34 : 4, sp: moving ? 4.2 : 1.5, col, sway: moving ? Math.sin(t * 3.4) * 50 : 0, trailDx: moving ? Math.cos(t * 3.4) * 14 : 0 });
      set(q.c.d, { y: (1 - p(t, t0, 0.4, E.outBack)) * -700, o: t < t0 ? 0 : 1, x: moving ? Math.sin(t * 3.4) * 26 : 0 });
    });
    const run = t > K.va - 0.1;
    set(bs.d, { x: run ? -120 * p(t, K.va - 0.1, 0.6, E.outCubic) : 0, y: run ? Math.abs(Math.sin(t * 14)) * -10 : wobble(t, 0.6, 3) });
    bullRun(bs, t, { sp: run ? 16 : 0, amp: run ? 24 : 0, look: run ? [-2, -8] : [-6, 0] });
    set(arr, { s: pop(t, K.mueve5 - 0.1, 0.35), o: t < K.mueve5 - 0.1 ? 0 : 1 });
    popA(pr, t, K.probado, { r: -4, o: 1 - p(t, K.el5 - 0.1, 0.2) });
    popA(sc, t, K.color5 + 0.1, { r: 3 });
    set(ck, { s: pop(t, K.mueve5 + 0.1, 0.3), o: t < K.mueve5 + 0.1 ? 0 : 1, r: -8 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  const rope = box(c, 0, 470, 1080, 60, { zIndex: 7 }); rope.innerHTML = `<svg width="1080" height="60" style="overflow:visible"><path d="M-10,14 Q540,46 1090,14" stroke="${INK}" stroke-width="10" fill="none"/><path d="M-10,14 Q540,46 1090,14" stroke="${WOOD}" stroke-width="5" fill="none" stroke-dasharray="10 6"/></svg>`;
  const TR = [[BLUE, 70], [GREEN, 315], ['#fff', 560], [CAPY, 805]].map(([col, x], i) => {
    const cc = mkCloth(c, x, 500 + [6, 16, 18, 8][i], 200, 270, { col, amp: 4, stick: false, trails: i === 2 ? 2 : 0, z: 8 });
    const pin = box(cc.d, 140 + 90, 128, 24, 46, { background: WOOD, border: `4px solid ${INK}`, borderRadius: '6px', zIndex: 3 }); void pin;
    return { c: cc, col };
  });
  const bs = mkBullS(c, [540, 880, 470, 292]); bs.d.style.zIndex = 6;
  const arr = box(c, 640, 800, 140, 120, { zIndex: 9 }); arr.innerHTML = arrowSvg('M20,110 Q30,40 70,14 M40,20 L72,12 L70,46', PINK, 12);
  const ck = box(c, 820, 400, 120, 120, { zIndex: 30 }); ck.innerHTML = `<svg width="120" height="120" style="overflow:visible"><circle cx="60" cy="60" r="56" fill="${YEL}" stroke="${INK}" stroke-width="6"/><g transform="translate(18,18) scale(.84)">${CHECK.replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`;
  const pr = chip(c, 560, 1210, 'lo han probado', { size: 40, bg: PINK, z: 30 });
  const sc = chip(c, 480, 1210, 'sea del color que sea', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   G1 · ¿Y POR QUÉ LA MULETA ES ROJA?
   ====================================================================== */
headline(S.G1[0], S.G1[1], '¿Y por qué la *muleta* es roja?', { size: 86, hlT: K.muleta });
{
  const c = scene(S.G1[0], S.G1[1], t => {
    updCloth(mu, t, { amp: 22, sway: Math.sin(t * 1.6) * 16 });
    set(mu.d, { s: pop(t, S.G1[0] + 0.02, 0.45), r: -6 + wobble(t, 0.5, 2) });
    QQ.forEach((q, i) => set(q, { s: pop(t, K.roja - 0.1 + i * 0.15, 0.35), y: Math.sin(t * 4 + i) * 12, r: [-12, 14][i], o: t < K.roja - 0.1 + i * 0.15 ? 0 : 1 }));
    popA(lb, t, K.muleta + 0.1, { r: -5 });
  });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 58px)' });
  const mu = mkCloth(c, 280, 520, 520, 380, { amp: 22, sp: 2.4, z: 8 });
  mu.d.style.transformOrigin = '400px 300px';
  const QQ = [qMark(c, 110, 560, 200), qMark(c, 860, 760, 170)];
  const lb = chip(c, 470, 1010, 'la muleta', { size: 56, bg: RED, z: 30 });
}

/* ======================================================================
   G2 · POR TRADICIÓN… — cuadro de museo
   ====================================================================== */
headline(S.G2[0], S.G2[1], 'Por *tradición*…', { size: 118, hlT: K.trad, color: '#F4ECDB', keyColor: '#fff', hlc: RED });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(fr, { s: 1.05 + 0.05 * p(t, S.G2[0], 1.9, E.linear), r: -1.5 + wobble(t, 0.3, 0.5) });
    updCloth(mu, t, { amp: 12, sp: 1.8 });
    const ks = p(t, K.trad, 0.55, E.outElastic); set(rib, { y: (1 - clamp(ks)) * 300, r: (1 - ks) * 6 + Math.sin(t * 2) * 1, o: t < K.trad - 0.05 ? 0 : 1 });
    DM.forEach((d, i) => set(d, { y: -((t * 30 + i * 70) % 300), x: Math.sin(t + i) * 20, o: 0.7 }));
  });
  sceneBg(c, { background: '#3a2a1e' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse 520px 640px at 540px 760px, rgba(255,230,170,.55), rgba(0,0,0,0) 70%)' });
  const fr = box(c, 170, 430, 740, 640, { zIndex: 4 });
  box(fr, 0, 0, 740, 640, { background: BRASS, border: `8px solid ${INK}`, borderRadius: '18px', boxShadow: `12px 14px 0 rgba(0,0,0,.5)`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 3px, transparent 3px 10px)' });
  box(fr, 46, 46, 648, 548, { background: '#F1E6CE', border: `6px solid ${INK}`, overflow: 'hidden' });
  const mu = mkCloth(fr.children[1], 160, 130, 330, 300, { amp: 12, sp: 1.8, z: 3 });
  const plate = el('div', fr, { left: '230px', top: '600px', width: '280px', textAlign: 'center', background: INK, color: YEL, fontFamily: 'Rye', fontSize: '30px', padding: '4px 0 6px', border: `4px solid ${BRASS}`, borderRadius: '8px', zIndex: 6 }, 'LA MULETA'); void plate;
  const rib = box(c, 90, 1080, 900, 200, { zIndex: 10 });
  rib.innerHTML = `<svg width="900" height="200" style="overflow:visible">${cut('<path d="M0,30 H900 L870,100 L900,170 H0 L30,100 Z"/>')}<path d="M0,30 H900 L870,100 L900,170 H0 L30,100 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,46 H860 M40,154 H860" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/><text x="450" y="128" text-anchor="middle" font-family="Rye" font-size="80" fill="${YEL}" stroke="${INK}" stroke-width="3" paint-order="stroke">TRADICIÓN</text></svg>`;
  const DM = [0, 1, 2, 3, 4, 5].map(i => box(c, 200 + i * 130, 1000, 10, 10, { borderRadius: '50%', background: 'rgba(255,240,200,.8)', zIndex: 5 }));
}

/* ======================================================================
   G3 · …Y PORQUE DICEN QUE ASÍ SE NOTA MENOS LA SANGRE (sin mostrarla)
   ====================================================================== */
headline(S.G3[0], S.G3[1], 'Y porque *dicen*…', { size: 110, hlT: K.dicen });
{
  const c = scene(S.G3[0], S.G3[1], t => {
    G.forEach((f, i) => { const t0 = S.G3[0] + 0.05 + i * 0.12; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.8, 3, i), r: [8, 0, -8][i] + Math.sin(t * 3 + i) * 2, o: t < t0 ? 0 : 1 }); face(f, t, { look: [[8, 0], [0, 4], [-8, 0]][i], jaw: t > K.dicen && t < K.L6e ? Math.abs(Math.sin(t * 13 + i)) * 0.35 : 0, seed: i }); });
    PS.forEach((s, i) => { const t0 = K.dicen + i * 0.18; set(s, { s: pop(t, t0, 0.3), y: -p(t, t0, 1) * 30, r: [-8, 6, -4][i], o: t < t0 ? 0 : 1 }); });
    set(qc.wrap, { s: pop(t, K.nota - 0.25, 0.4), r: -2 + wobble(t, 0.4, 0.6), o: t < K.nota - 0.25 ? 0 : 1 });
    QW.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0.15 : 1 }));
    popA(tg, t, K.nota - 0.1, { r: -8 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const G = [mk(c, [380, 740, 260, 332], fanInner(71, 'slouch', '#5a4632'), '0 0 360 460', 'bust'), mk(c, [590, 700, 290, 371], journalistInner(72, 1), '0 0 360 460', 'bust'), mk(c, [820, 740, 250, 320], fanInner(74, 'cap', '#3a2f26'), '0 0 360 460', 'bust')];
  const PS = [[380, 700, 'psst…'], [620, 660, '¿sabes?'], [820, 700, 'dicen…']].map(([x, y, s]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '44px', color: INK, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '0 20px 6px', boxShadow: `4px 5px 0 ${SH}`, zIndex: 30, whiteSpace: 'nowrap' }, s));
  const qc = paperPiece(c, 70, 420, 940, 250, { seed: 17, bg: '#FBF6EA' });
  const qt = el('div', qc.inner, { left: '0', top: '34px', width: '922px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', lineHeight: 1.12, color: INK });
  const QW = []; const iq = find('asi se nota menos la sangre');
  ['«Así', 'se', 'nota', 'menos', 'la', 'sangre»'].forEach((wd, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.14em'; s.textContent = wd; qt.appendChild(s); if (k === 2) qt.appendChild(document.createElement('br')); QW.push({ e: s, t: W[iq + k].s }); });
  const tg = chip(c, 40, 380, 'dicen', { size: 46, bg: PINK, z: 40 });
}

/* ======================================================================
   H1 · ¡OJO! — EL TORO NO ES CIEGO (gafas de ver)
   ====================================================================== */
headline(K.el7 - 0.1, S.H1[1], 'El toro *no es ciego*', { size: 100, hlT: K.noes });
{
  const c = scene(S.H1[0], S.H1[1], t => {
    const kt = p(t, K.ojo + 0.5, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.4, kt), x: kt * 330, y: kt * -270, r: -10, o: t < K.ojo ? 0 : 1 });
    const gOn = t > K.el7 + 0.2;
    set(bull.d, { y: wobble(t, 0.5, 4), s: 1 + 0.04 * p(t, S.H1[0], 2.8, E.linear) });
    bullFace(bull, t, { specs: gOn, look: gOn ? [0, 0] : [-6, 6], bL: gOn ? 16 : 0, bR: gOn ? 16 : 0, seed: 2.2 });
    set(gl, { y: (1 - p(t, K.el7 - 0.1, 0.35, E.outBounce)) * -600, o: t < K.el7 - 0.1 || gOn ? 0 : 1 });
    SPK.forEach((s, i) => { const t0 = K.el7 + 0.25 + i * 0.08; set(s, { s: pop(t, t0, 0.3), r: t * 120, o: t < t0 ? 0 : 1 - p(t, t0 + 0.8, 0.3) }); });
    const ks = p(t, K.ciego, 0.17, E.outCubic); set(nc, { s: t < K.ciego ? 0 : lerp(2.2, 1, ks), r: -7, o: t < K.ciego ? 0 : 1 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -170, 360, 1420, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const bull = mkBull(c, [230, 420, 620, 661]); bull.d.style.zIndex = 4;
  const gl = box(c, 420, 590, 260, 120, { zIndex: 6 }); gl.innerHTML = `<svg viewBox="180 200 240 120" width="260" height="130" style="overflow:visible"><circle cx="242" cy="262" r="50" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="9"/><circle cx="358" cy="262" r="50" fill="rgba(255,255,255,.22)" stroke="${INK}" stroke-width="9"/><path d="M292,258 q8,-12 16,0" stroke="${INK}" stroke-width="8" fill="none"/></svg>`;
  const SPK = [[300, 520], [800, 540], [880, 760], [240, 760]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '60px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 31 }, '✦'));
  const ojo = stamp(c, 170, 640, '¡OJO!', { size: 210, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const nc = stamp(c, 380, 1110, 'NO ES CIEGO', { size: 88, bw: 12, z: 50, col: INK, bg: YEL, blend: 'normal' });
}

/* ======================================================================
   H2 · VE EL MOVIMIENTO ✔ (muy bien) — EL ROJO ✘ (visor del toro)
   ====================================================================== */
headline(S.H2[0], K.loque - 0.05, 'El movimiento lo ve *muy bien*', { size: 82, hlT: K.muy });
headline(K.loque - 0.05, S.H2[1], 'Lo que no ve es *el rojo*', { size: 92, hlT: K.rojo7, hlc: '#ff9aa8' });
{
  const c = scene(S.H2[0], S.H2[1], t => {
    set(card.wrap, { y: (1 - p(t, S.H2[0] + 0.02, 0.4, E.outBack)) * -900, r: -1.5 + wobble(t, 0.4, 0.4) });
    ROWS.forEach(q => { q.e.style.opacity = t >= q.t - 0.05 ? 1 : 0.15; set(q.e, { x: (1 - p(t, q.t - 0.05, 0.25, E.outBack)) * 30 }); });
    const k1 = p(t, K.movim7 + 0.5, 0.16); set(m1, { s: t < K.movim7 + 0.5 ? 0 : lerp(1.6, 1, k1), o: t < K.movim7 + 0.5 ? 0 : 1 });
    const k2 = p(t, K.rojo7, 0.16); set(m2, { s: t < K.rojo7 ? 0 : lerp(1.7, 1, k2), o: t < K.rojo7 ? 0 : 1 });
    set(qm2, { o: t > K.loque && t < K.rojo7 ? 1 : 0, r: Math.sin(t * 5) * 8 });
    STR.forEach((s, i) => { const t0 = K.muy + i * 0.12; set(s, { s: pop(t, t0, 0.3), r: Math.sin(t * 6 + i) * 10, o: t < t0 ? 0 : 1 }); });
    // visor: se abre en «Ve», el trapo se mueve; en «no ve» pasa a gris
    const ko = p(t, K.ve, 0.45, E.outBack); set(vw, { s: Math.max(0.01, ko), o: t < K.ve ? 0 : 1, y: wobble(t, 0.5, 3) });
    const g = t > K.nove;
    updCloth(vc, t, { amp: 26, sway: Math.sin(t * 3) * 50, trailDx: Math.cos(t * 3) * 16, col: g ? GREY : RED });
    set(vc.d, { x: Math.sin(t * 3) * 70 });
    vfl.style.opacity = g ? 1 - p(t, K.nove, 0.3) : 0;
    set(eye.d, { y: wobble(t, 0.6, 3) }); bullFace(eye, t, { specs: true, look: [Math.sin(t * 3) * 10, 0], bL: 10, bR: 10, seed: 0.5 });
    popA(vl, t, K.ve + 0.2, { r: -3 });
    popA(rg, t, K.nove + 0.15, { r: 4 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const card = paperPiece(c, 90, 420, 900, 330, { seed: 23, bg: '#FBF6EA' });
  const ROWS = [];
  [['Ve el movimiento', K.movim7], ['Ve el rojo', K.loque]].forEach((q, i) => {
    const y = 34 + i * 140;
    const e = el('div', card.inner, { left: '40px', top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontStyle: i ? 'italic' : 'normal', fontSize: '76px', lineHeight: 1.2, color: i ? RED : INK, whiteSpace: 'nowrap' }, q[0]);
    if (!i) box(card.inner, 40, y + 118, 800, 3, { background: 'rgba(43,33,24,.3)' });
    ROWS.push({ e, t: q[1] });
  });
  const m1 = box(card.inner, 730, 30, 110, 110, { zIndex: 3 }); m1.innerHTML = CHECK;
  const m2 = box(card.inner, 730, 170, 110, 110, { zIndex: 3 }); m2.innerHTML = XSVG;
  const qm2 = el('div', card.inner, { left: '740px', top: '150px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 3 }, '?');
  const STR = [0, 1, 2].map(i => el('div', c, { left: px(560 + i * 80), top: '380px', fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 31 }, '★'));
  const vw = box(c, 400, 800, 480, 480, { zIndex: 6, borderRadius: '50%', overflow: 'hidden', border: `12px solid ${INK}`, boxShadow: `0 0 0 8px #fff, 12px 14px 0 8px ${SH}`, background: '#E2DED6' });
  const vc = mkCloth(vw, 110, 150, 240, 200, { amp: 26, trails: 2, z: 3 });
  box(vw, 0, 0, 456, 456, { zIndex: 4, backgroundImage: `linear-gradient(${INK},${INK}), linear-gradient(${INK},${INK})`, backgroundSize: '4px 100%, 100% 4px', backgroundPosition: 'center, center', backgroundRepeat: 'no-repeat', opacity: 0.35 });
  const vfl = box(vw, 0, 0, 456, 456, { background: '#fff', zIndex: 5, opacity: 0 });
  const eye = mkBull(c, [820, 1050, 200, 213]); eye.d.style.zIndex = 8;
  const vl = chip(c, 470, 770, 'lo que ve el toro', { size: 40, bg: INK, color: '#fff', z: 30 });
  const rg = chip(c, 640, 1230, 'rojo → gris', { size: 44, bg: '#fff', color: INK, z: 30 });
}

/* ======================================================================
   HIT · GOLPE AMARILLO: EL TRAPO ROJO ES PARA EL PÚBLICO + ¿SÍ O NO?
   ====================================================================== */
{
  const CM = [];
  const T2 = K.te - 0.15;
  const c = scene(S.HIT[0], S.HIT[1], t => {
    const k2 = p(t, T2, 0.35, E.inOutCubic);
    popA(l1, t, S.HIT[0] + 0.02, { rise: 30, y: -k2 * 800 });
    const kb = p(t, K.publico - 0.02, 0.2, E.outBack); set(big, { s: t < K.publico - 0.02 ? 0 : lerp(1.6, 1, kb), r: -3, y: -k2 * 800, o: t < K.publico - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.publico, 0.3) ? glitch(t, K.publico, 0.3) + ', ' : '') + bigOut();
    set(crowd, { y: k2 * 1200 + Math.abs(Math.sin(t * 7)) * (t > K.publico ? -8 : 0), o: 1 });
    set(crowd2, { y: k2 * 1200 + Math.abs(Math.sin(t * 7 + 1)) * (t > K.publico ? -10 : 0) });
    updCloth(tr, t, { amp: 30, sway: Math.sin(t * 2.6) * 40 });
    set(tr.d, { y: k2 * 1200, x: Math.sin(t * 2.6) * 20 });
    set(hd, { y: k2 * 1200, x: Math.sin(t * 2.6) * 20 });
    // cameo del emú (una vez): asoma y mira a cámara 0,6 s
    const e0 = K.publico + 0.35, look = t > e0 + 0.15 && t < e0 + 0.75;
    const ke = t < e0 ? 0 : t < e0 + 0.15 ? p(t, e0, 0.15) : t < e0 + 0.75 ? 1 : 1 - p(t, e0 + 0.75, 0.2);
    set(emu.d, { y: (1 - ke) * 330 + k2 * 1200 });
    face(emu, t, { look: look ? [0, 0] : [-14, 6], half: !look, bL: look ? 18 : 0, bR: look ? 24 : 0, blink: false });
    // el toro, abajo: «no para el toro»
    const kt = pop(t, K.no8 - 0.05, 0.4);
    set(bull.d, { s: kt, o: t < K.no8 - 0.05 ? 0 : 1, y: k2 * 1200 + wobble(t, 0.6, 3) });
    bullFace(bull, t, { shrug: t > K.toro8 ? 18 * p(t, K.toro8, 0.3) : 0, tilt: t > K.toro8 ? -6 : 0, half: true, look: [0, 0], seed: 0.3 });
    set(np, { s: pop(t, K.no8 + 0.15, 0.35), r: -4, o: t < K.no8 + 0.15 ? 0 : 1, y: k2 * 1200 });
    // fase 2: ¿te lo creías? ¿sí o no?
    set(q1, { s: pop(t, T2 + 0.05, 0.4), o: t < T2 + 0.05 ? 0 : 1, y: -p(t, K.si - 0.2, 0.3, E.inOutCubic) * 0 });
    popA(q2, t, K.si - 0.15, { rise: 40 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const ta = T2 + 0.3 + i * 0.12, press = t > t0 + 0.3 && t < t0 + 0.45; set(b, { s: pop(t, ta, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < ta ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.45 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { z: 700, cut: true, clip: true });
  sceneBg(c, { background: YEL }); halftone(c, 'rgba(0,0,0,.10)', 1);
  const l1 = BIGT(c, 0, 196, 1080, 'El trapo rojo es para', { fontStyle: 'italic', fontSize: '86px', zIndex: 8 });
  const big = BIGT(c, 0, 300, 1080, 'EL PÚBLICO', { fontSize: '172px', lineHeight: '220px', color: '#fff', zIndex: 9 });
  const crowd2 = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); crowd2.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${crowdSvg(590, 1, 9)}</svg>`;
  const emu = mkEmuF(c, [720, 470, 230, 345]); emu.d.style.zIndex = 4;
  const crowd = box(c, 0, 0, 1080, 1920, { zIndex: 5 }); crowd.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${crowdSvg(720, 4, 15)}</svg>`;
  const tr = mkCloth(c, 380, 820, 320, 250, { amp: 30, sp: 3, z: 7 });
  const hd = box(c, 300, 740, 150, 150, { zIndex: 8 }); hd.innerHTML = gripSvg(120);
  const bull = mkBull(c, [650, 990, 290, 309]); bull.d.style.zIndex = 9; bull.d.style.transformOrigin = '795px 1300px';
  const np = chip(c, 120, 1170, 'no para el toro', { size: 58, bg: '#fff', color: INK, z: 12 });
  const q1 = BIGT(c, 0, 200, 1080, `¿Te lo ${hlSpan('<i>creías</i>', 'qhl')}?`, { fontSize: '108px', zIndex: 10 }); q1.querySelector('.qhl').style.transform = 'scaleX(1) rotate(-1.2deg)'; q1.querySelector('.qhl').style.background = '#fff';
  const q2 = BIGT(c, 0, 330, 1080, '¿Sí o no?', { fontStyle: 'italic', fontSize: '96px', color: RED, zIndex: 10 });
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '960px', width: '380px', height: '220px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '160px', lineHeight: '206px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(110, 'SÍ', PINK, '#fff'), bN = btn(570, 'NO', '#fff', RED);
  const hand = box(c, 300, 1110, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const cms = [['FAR', '@marta_ruiz', 'SÍ 😳', T2 + 0.5], ['SOL', '@javi.92', 'No, ya lo sabía', T2 + 0.85], ['MEREDITH', '@lola_sev', 'Sí, toda la vida…', K.creias + 0.1]];
  cms.forEach((m, i) => {
    const e = box(c, 60, [480, 620, 760][i], 470, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (rápido) — «Soy tu vecino…»
   ====================================================================== */
{
  const T0 = S.C[0], T1 = S.C[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.18, 0.18, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.05 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    const fanFast = t > T0 + 0.2 && t < T0 + 0.8;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.4 ? [0, -5] : [0, 0], bL: fanFast ? 8 : 4, bR: fanFast ? 8 : 10, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, K.soy - 0.05, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: (1 - ks) * 8 + Math.sin(t * 2.4) * 1.2, o: t < K.soy - 0.07 ? 0 : 1 });
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
  const sign = box(cam, 120, 170, 840, 220, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="220" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="170" rx="22"/>')}<rect x="20" y="40" width="800" height="170" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="138" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '76px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2]].forEach(([wd, wi]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; sl1.appendChild(s); sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   L · …Y ESTO NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra
   ====================================================================== */
headline(S.L2[0], LOOP, 'Y esto no venía en el *libro.*', { size: 84, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    bullFace(stand, t, { look: t > TC - 0.3 ? [8, -8] : [-4, 4], bL: 12, bR: 12, jaw: t > TC - 0.3 ? 0.4 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, S.L2[0] + 0.25, { r: -1 });
  }, { cut: true });
  sceneBg(c, { background: 'transparent' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 11; i++) lines += `<path d="M180,${820 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="${INK}">EL TORO</text><text x="335" y="780" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="40" fill="${RED}">y el rojo</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkBull(bookW, [620, 520, 250, 267]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1180px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:36px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 15 · Al toro le da igual el rojo</span>`);
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
