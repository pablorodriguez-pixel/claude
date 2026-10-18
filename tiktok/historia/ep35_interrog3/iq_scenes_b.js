/* Ep. 35 · «¿» v3 — escenas L5–L10 + marca (todo clavado por texto vía K) */

/* ======================================================================
   PASO 2 · «2 · La pregunta va en el tono» (aguanta todo L5)
   ====================================================================== */
stepHead(K.dos - 0.08, K.y6 - 0.08, 2, ['La pregunta', 'va en el *tono*'], { size: 88, ty: 0 });

/* E1 · «DOS: EN ESPAÑOL, LA PREGUNTA VA EN EL TONO.» — el Vecino lo dice y el tono se dibuja subiendo */
{
  const c = scene(S.E1[0], S.E1[1], t => {
    const zc = t > K.preg5 - 0.06;
    set(cam, zc ? { s: 1.08 + 0.02 * p(t, K.preg5, 2, E.linear), x: 20, y: 60 } : { s: lerp(1, 1.04, p(t, S.E1[0], 1.5, E.linear)) });
    set(vb.d, { s: pop(t, S.E1[0], 0.35), y: wobble(t, 0.6, 3) });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [6, -2], bL: 10, bR: t > K.tono ? 16 : 10, fan: wobble(t, 0.9, 6), seed: 0.9 });
    WV.forEach((w, i) => { const ph = ((t * 1.6 + i / 3) % 1); set(w, { s: 0.6 + ph * 0.8, o: (1 - ph) }); });
    popA(ce, t, K.espanol, { r: -3 });
    curs.forEach(cu => cu.style.strokeDashoffset = f1(1000 * (1 - p(t, K.preg5, K.tonoE - K.preg5 + 0.2, E.inOutCubic)))); set(cv, { o: t > K.preg5 ? 1 : 0 });
    set(qe, { s: pop(t, K.tonoE - 0.1, 0.35), o: t < K.tonoE - 0.1 ? 0 : 1, r: 10 + Math.sin(t * 5) * 6 });
    NT.forEach((n, i) => { const tt = K.tono + i * 0.15; set(n, { y: -p(t, tt, 1.2) * 120, o: t > tt ? 1 - p(t, tt + 0.6, 0.6) : 0, r: Math.sin(t * 4 + i) * 12 }); });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '400px 800px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 58px)' });
  const vb = mk(cam, [70, 600, 520, 643], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 5;
  const WV = [0, 1, 2].map(i => { const d = box(cam, 470, 700, 220, 300, { zIndex: 6, transformOrigin: '0px 150px' }); d.innerHTML = `<svg width="220" height="300" style="overflow:visible"><path d="M30,40 Q130,150 30,260" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M30,40 Q130,150 30,260" stroke="${PINK}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`; return d; });
  const cv = box(cam, 480, 560, 380, 300, { zIndex: 7 });
  cv.innerHTML = `<svg width="380" height="300" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M20,280 C130,278 230,262 290,200 C330,150 350,90 360,20" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round"/><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M20,280 C130,278 230,262 290,200 C330,150 350,90 360,20" stroke="${PINK}" stroke-width="18" fill="none" stroke-linecap="round"/></svg>`;
  const curs = [...cv.querySelectorAll('path')];
  const qe = el('div', cam, { left: '800px', top: '440px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', lineHeight: 1, color: RED, textShadow: OUTL(INK, 6), zIndex: 9 }, '?');
  const NT = [0, 1, 2].map(i => el('div', cam, { left: px(560 + i * 90), top: px(640 - i * 40), fontSize: '70px', color: INK, zIndex: 8 }, '♪'));
  const ce = chip(cam, 540, 1010, 'en ESPAÑOL', { size: 50, bg: INK, color: YEL, z: 20 });
}

/* E2 · «TIENES HAMBRE» Y «¿TIENES HAMBRE?» SON LAS MISMAS PALABRAS. SIN EL SIGNO DE ABRIR…
   las dos frases ESCRITAS una debajo de otra, con su tono; «= MISMAS PALABRAS»; y en «sin», el «¿» se va */
{
  const c = scene(S.E2[0], S.E2[1], t => {
    // planos: 1) primera frase · 2) llega la segunda (la cámara baja) · 3) «mismas palabras» (plano general) · 4) «sin el signo» (zoom al «¿»)
    const z2 = t > K.tienes2 - 0.1, z3 = t > K.son - 0.06, z4 = t > K.sin5 - 0.06;
    set(cam, z4 ? { s: 1.03, x: 10, y: -24 } : z3 ? { s: 1, x: 0, y: 0 } : z2 ? { s: 1.06, x: 20, y: -40 } : { s: 1.1, x: 40, y: 140 });
    set(b1, { s: pop(t, K.tienes1 - 0.04, 0.35), r: -2 + wobble(t, 0.5, 0.6), o: t < K.tienes1 - 0.04 ? 0 : 1 });
    c1.style.strokeDashoffset = f1(1000 * (1 - p(t, K.tienes1, K.hambre1E - K.tienes1 + 0.1, E.linear)));
    set(n1, { s: pop(t, K.hambre1E - 0.1, 0.3), o: t < K.hambre1E - 0.1 ? 0 : 1, r: -3 });
    set(b2, { s: pop(t, K.tienes2 - 0.06, 0.35), r: 2 + wobble(t, 0.5, 0.6, 1), o: t < K.tienes2 - 0.06 ? 0 : 1 });
    c2.style.strokeDashoffset = f1(1000 * (1 - p(t, K.tienes2, K.hambre2E - K.tienes2 + 0.1, E.linear)));
    set(n2, { s: pop(t, K.hambre2E - 0.15, 0.3), o: t < K.hambre2E - 0.15 ? 0 : 1, r: 3 });
    set(ya, { s: pop(t, K.y5 - 0.05, 0.3), o: t < K.y5 - 0.05 || t > K.tienes2 ? 0 : 1, r: -4 });
    set(lnk, { o: z3 && !z4 ? 1 : 0 });
    paint(c.querySelector('.fh1'), t, K.mismas, 0.3); paint(c.querySelector('.fh2'), t, K.mismas + 0.1, 0.3);
    stampA(eq, t, K.son, -6, 1);
    // en «sin el signo de abrir», el «¿» rojo salta fuera de la frase y queda tachado
    const kq = p(t, K.sin5, 0.45, E.inOutCubic);
    set(qa, { x: lerp(0, -40, kq), y: lerp(0, -230, kq) - Math.sin(kq * Math.PI) * 60, r: kq * -30, s: 1 + kq * 0.6 });
    set(xq, { o: t > K.sin5 + 0.4 ? 1 : 0, s: pop(t, K.sin5 + 0.4, 0.25) });
    set(gap, { o: t > K.sin5 + 0.2 ? (Math.floor(t * 4) % 2 ? 1 : 0.35) : 0 });
    popA(sn, t, K.abrir5 - 0.1, { r: 4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 60px)' });
  // frase 1: afirmas (el tono BAJA al final)
  const cv1 = box(cam, 120, 390, 760, 130, { zIndex: 6 });
  cv1.innerHTML = `<svg width="760" height="130" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M20,30 C200,28 380,28 520,40 C620,50 680,80 740,120" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`;
  const c1 = cv1.querySelector('path');
  const b1 = bubble(cam, 110, 540, '<span style="visibility:hidden">¿</span>' + hlSpan('tienes hambre', 'fh1') + '.', { size: 92, tail: 'bl', z: 20, bg: '#fff' });
  const n1 = chip(cam, 600, 690, '↘ afirmas', { size: 42, bg: INK, color: '#fff', z: 25 });
  // frase 2: preguntas (el tono SUBE al final)
  const cv2 = box(cam, 120, 790, 760, 130, { zIndex: 6 });
  cv2.innerHTML = `<svg width="760" height="130" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M20,110 C200,110 380,108 520,96 C620,86 680,56 740,10" stroke="${PINK}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`;
  const c2 = cv2.querySelector('path');
  const b2 = bubble(cam, 110, 940, '<span class="qa" style="display:inline-block;color:' + RED + '">¿</span>' + hlSpan('tienes hambre', 'fh2') + '<span style="color:' + RED + '">?</span>', { size: 92, tail: 'bl', z: 21, bg: '#FFF3A8' });
  const qa = b2.querySelector('.qa');
  const gap = box(b2, 30, 18, 58, 92, { border: `5px dashed ${PINK}`, borderRadius: '10px', zIndex: 2 });
  const xq = el('div', cam, { left: '120px', top: '720px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: 1, color: INK, zIndex: 40 }, '✕');
  const n2 = chip(cam, 600, 1090, '↗ preguntas', { size: 44, bg: PINK, color: '#fff', z: 25 });
  const ya = stamp(cam, 560, 820, 'Y AHORA:', { size: 60, bw: 9, z: 30, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const lnk = box(cam, 0, 0, 1080, 1920, { zIndex: 22 }); lnk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[260, 380, 500, 620, 740].map(x => `<path d="M${x},660 V940" stroke="${PINK}" stroke-width="6" stroke-dasharray="12 9"/>`).join('')}</svg>`;
  const eq = stamp(cam, 150, 1205, '= MISMAS PALABRAS', { size: 64, bw: 10, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  const sn = chip(cam, 500, 750, 'sin el «¿»…', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* E4 · «EN UNA FRASE LARGA NO SABÍAS QUE ERA UNA PREGUNTA HASTA EL FINAL» — teletipo sin «¿»: el «?» llega tarde */
{
  const c = scene(S.E4[0], S.E4[1], t => {
    const k = p(t, S.E4[0] + 0.05, K.preg5b - S.E4[0] - 0.05, E.linear);
    const W0 = tk.offsetWidth || 3000;
    set(tk, { x: lerp(1080, 820 - W0, k) });
    const got = t > K.preg5b - 0.02;
    const zr = t > K.sabias - 0.06 ? 1.22 : 1;
    set(rd.d, { y: wobble(t, 0.6, 3) - (got ? 30 * p(t, K.preg5b, 0.25, E.outBack) : 0), s: pop(t, S.E4[0], 0.35) * zr });
    face(rd, t, { look: got ? [0, -3] : [Math.sin(t * 3) * 8, -4], brow: got ? -14 : 0, half: !got && t > K.sabias, seed: 0.2 });
    set(dots, { o: !got && t > S.E4[0] + 0.3 ? 1 : 0 });
    dots.textContent = '.'.repeat(1 + Math.floor(t * 4) % 3);
    set(qd, { o: !got ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 8) });
    stampA(ah, t, K.preg5b, -6, 1);
    set(qbig, { s: got ? 1 + 0.4 * (1 - p(t, K.preg5b, 0.3)) : 1 });
    popA(lg, t, K.larga, { r: -3 });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  box(c, 0, 440, 1080, 190, { background: CREAM, borderTop: `6px solid ${INK}`, borderBottom: `6px solid ${INK}`, zIndex: 3 });
  const tk = el('div', c, { left: '0px', top: '466px', fontFamily: 'SpecialElite', fontSize: '92px', lineHeight: '140px', color: INK, whiteSpace: 'nowrap', zIndex: 5 },
    'y si el sábado por la tarde vamos todos juntos a la feria del pueblo a comer churros con chocolate<span class="qq" style="display:inline-block;font-family:Playfair;font-weight:900;color:' + RED + ';font-size:130px">?</span>');
  const qbig = tk.querySelector('.qq');
  const lg = chip(c, 120, 660, 'frase larga, sin «¿»', { size: 44, bg: INK, color: YEL, z: 20 });
  const rd = mk(c, [300, 760, 440, 563], readerInner(), '0 0 360 460', 'bust'); rd.d.style.zIndex = 6;
  const qd = el('div', c, { left: '700px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 8 }, '?');
  const dots = el('div', c, { left: '700px', top: '880px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 8 }, '...');
  const ah = stamp(c, 130, 1160, '¡AH, ERA PREGUNTA!', { size: 62, bw: 9, z: 30, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
}

/* ======================================================================
   PASO 3 · «3 · Costó usarlo» (aguanta todo L6)
   ====================================================================== */
stepHead(K.y6 - 0.08, K.ojo - 0.08, 3, ['Costó *usarlo*'], { size: 112, ty: 22 });

/* G1 · «COSTÓ MUCHÍSIMO QUE LA GENTE LO USARA» — el impresor con el tipo «¿» en la mano, que no le convence */
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const zg = t > K.gente - 0.06;
    set(cam, zg ? { s: 1.15, x: 60, y: 60 } : { s: lerp(1, 1.04, p(t, S.G1[0], 2, E.linear)) });
    set(pr.d, { s: pop(t, S.G1[0], 0.4), y: wobble(t, 0.6, 3), r: t > K.gente ? Math.sin(t * 3) * 3 : 0 });
    const doubt = t > K.costo;
    face(pr, t, { look: doubt ? [8, -3] : [0, 2], brow: doubt ? -10 : 0, seed: 0.6 });
    set(tb, { r: -10 + Math.sin(t * 3) * 6, y: Math.sin(t * 2.4) * 10, s: pop(t, S.G1[0] + 0.15, 0.35), o: t < S.G1[0] + 0.15 ? 0 : 1 });
    set(qm, { s: pop(t, K.muchisimo, 0.3), r: 12 + Math.sin(t * 6) * 8, o: t < K.muchisimo ? 0 : 1 });
    set(bb, { s: pop(t, K.gente - 0.05, 0.32), r: -3 + wobble(t, 0.6, 1), o: t < K.gente - 0.05 ? 0 : 1 });
    set(tc, { y: (1 - p(t, S.G1[0] + 0.1, 0.4, E.outBack)) * 400 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '640px 800px' });
  sceneBg(cam, { background: '#D9CDB4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 80px)' });
  const pr = mk(cam, [400, 440, 500, 639], printerInner(), '0 0 360 460', 'bust'); pr.d.style.zIndex = 5;
  const tb = box(cam, 800, 800, 110, 138, { zIndex: 8 }); tb.innerHTML = typeBlockSvg('¿');
  const tc = box(cam, 400, 1060, 540, 231, { zIndex: 7 }); tc.innerHTML = typeCaseSvg();
  const qm = qMark(cam, 820, 560, 120, PINK);
  const bb = bubble(cam, 120, 560, '¿esto? bah…', { size: 62, tail: 'br', z: 30, bg: '#fff' });
}

/* G2 · «TODAVÍA EN EL SIGLO XIX SE IMPRIMÍAN LIBROS SIN ÉL» — la prensa escupe hojas y el «¿» acaba en la papelera */
{
  const SH_ = [];
  const c = scene(S.G2[0], S.G2[1], t => {
    set(cam, t > K.imprimian - 0.06 ? { s: 0.94, x: -20, y: 20 } : { s: 1.06, x: 30, y: -10 });
    const cyc = (t * 2.2) % 1, dn = Math.sin(cyc * Math.PI);
    plat.setAttribute('transform', `translate(0 ${f1(dn * 40)})`);
    bar.setAttribute('transform', `rotate(${f1(-dn * 12)} 260 180)`);
    set(prs, { s: pop(t, S.G2[0], 0.35) });
    SH_.forEach(q => { const k = p(t, q.t, 0.45, E.outCubic); set(q.e, { x: lerp(0, q.dx, k), y: lerp(0, q.dy, k) - Math.sin(k * Math.PI) * 140, r: lerp(0, q.r, k), s: lerp(0.5, 1, k), o: t < q.t ? 0 : 1 }); });
    const kt = p(t, K.imprimian - 0.1, 0.9, E.inOutCubic);
    set(tb, { x: lerp(0, -380, kt), y: lerp(0, 470, kt) - Math.sin(kt * Math.PI) * 380, r: kt * 540, o: kt >= 1 ? 0 : 1 });
    set(bin, { s: pop(t, S.G2[0] + 0.2, 0.35), r: kt >= 1 ? Math.sin((t - K.imprimian - 0.8) * 30) * 6 * (1 - p(t, K.imprimian + 0.8, 0.5)) : 0 });
    stampA(xx, t, K.siglo, -5, 1);
    stampA(st, t, K.libros, -7, 1);
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 800px', zIndex: 2 });
  const prs = box(cam, 440, 430, 460, 672, { zIndex: 5 }); prs.innerHTML = pressSvg();
  const plat = prs.querySelector('.plat'), bar = prs.querySelector('.bar');
  [0, 1, 2, 3, 4].forEach(i => { const e = box(cam, 540, 860, 200, 264, { zIndex: 9 - i }); e.innerHTML = sheetSvg(i + 3); SH_.push({ e, t: K.siglo + 0.2 + i * 0.45, dx: -160 - i * 60 + (i % 2) * 40, dy: -300 + i * 60, r: -14 + i * 8 }); });
  const tb = box(cam, 860, 520, 90, 112, { zIndex: 12 }); tb.innerHTML = typeBlockSvg('¿');
  const bin = box(cam, 470, 1080, 190, 190, { zIndex: 11 }); bin.innerHTML = binSvg();
  const xx = stamp(c, 90, 430, 'SIGLO XIX', { size: 84, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const st = stamp(c, 150, 760, 'LIBROS SIN «¿»', { size: 82, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   H1 · «OJO: EL QUIJOTE QUE LEÍSTE EN EL COLE…» — sello OJO + el Quijote escolar cerrado
   ====================================================================== */
headline(S.H1[0], S.H1[1], 'El Quijote *del cole*…', { size: 104, hlT: K.cole, y: 236 });
{
  const c = scene(S.H1[0], S.H1[1], t => {
    stampA(oj, t, K.ojo, -8, 1);
    set(gq, { r: SWING(t), s: pop(t, S.H1[0], 0.35) });
    set(ry, { r: t * 12 });
    const kb = p(t, K.quijote7 - 0.1, 0.4, E.outBack);
    set(bk, { y: (1 - kb) * 900, r: 5 + wobble(t, 0.5, 1), o: t < K.quijote7 - 0.1 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: YEL });
  halftone(c, 'rgba(0,0,0,.10)', 1);
  const ry = rays(c, -160, 260, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 1);
  const gq = box(c, 90, 460, 360, 540, { zIndex: 10, transformOrigin: '180px 30px' }); gq.innerHTML = glyphSvg('¿', { fs: 900, base: 640 });
  const bk = box(c, 470, 430, 420, 565, { zIndex: 12 }); bk.innerHTML = schoolCoverSvg();
  const oj = stamp(c, 230, 1060, '¡OJO!', { size: 150, bw: 20, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* H2 · «…SÍ LO LLEVA. SE LO PUSIERON DESPUÉS.» — el libro se abre y salen los «¿» en amarillo (+ cameo del emú) */
headline(S.H2[0], S.H2[1], 'sí lo lleva: *puesto después*', { size: 80, hlT: K.pusieron, y: 236 });
const T_EMU = K.despuesE + 0.05;
{
  const QY = [];
  const c = scene(S.H2[0], S.H2[1], t => {
    const k = p(t, S.H2[0], 0.4, E.outBack);
    set(bk, { y: (1 - k) * 900, r: -2 + wobble(t, 0.4, 0.6), s: 1 + 0.04 * p(t, S.H2[0], 2.6, E.linear) });
    QY.forEach((q, i) => { const tq = K.si7 + 0.05 + i * 0.1; set(q, { s: pop(t, tq, 0.3), o: t < tq ? 0 : 1 }); q.style.background = t > tq ? YEL : 'transparent'; });
    set(ar, { o: t > K.se7 ? 1 : 0, x: Math.sin(t * 8) * 6 });
    popA(lb, t, K.se7, { r: -4 });
    const ke = p(t, T_EMU - 0.15, 0.22, E.outBack) * (1 - p(t, T_EMU + 0.6, 0.2, E.inCubic));
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
    set(emu.d, { y: (1 - ke) * 420 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: t > T_EMU && t < T_EMU + 0.3 ? 0.5 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#CFE0EA', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 56px)' });
  const bk = box(c, 90, 400, 900, 600, { zIndex: 5 }); bk.innerHTML = schoolBookSvg();
  [[120, 155], [520, 231], [130, 345], [540, 421], [130, 497]].forEach(([x, y]) => {
    const q = el('div', bk, { left: px(x - 34), top: px(y - 52), fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', lineHeight: '84px', color: RED, padding: '0 8px', borderRadius: '10px', zIndex: 3 }, '¿'); QY.push(q);
  });
  const ar = box(c, 300, 980, 150, 150, { zIndex: 8 }); ar.innerHTML = arrowSvg('M20,140 Q30,60 110,20 M70,14 L110,20 L100,60', PINK, 12);
  const lb = chip(c, 110, 1140, 'AÑADIDOS DESPUÉS', { size: 52, bg: INK, color: YEL, z: 30 });
  const emuW = box(c, 620, 900, 320, 430, { overflow: 'hidden', zIndex: 30 });
  const emu = mkEmuF(emuW, [30, 40, 260, 390]);
  el('div', emu.d, { left: '86px', top: '-60px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3, transform: 'rotate(-10deg)' }, '¿');
}

/* ======================================================================
   K1 · «O SEA: CERVANTES TENÍA EXCUSA PARA NO PONERLO.» — Cervantes se encoge de hombros
   ====================================================================== */
headline(S.K1[0], S.K1[1], 'Cervantes tenía *excusa*', { size: 92, hlT: K.excusa, y: 236 });
{
  const c = scene(S.K1[0], S.K1[1], t => {
    set(cam, { s: lerp(1, 1.06, p(t, S.K1[0], 2.6, E.linear)) });
    const sh = t > K.tenia ? Math.sin(p(t, K.tenia, 0.5) * Math.PI) * 30 : 0;
    set(cv.d, { s: pop(t, S.K1[0], 0.4), y: wobble(t, 0.6, 3) - sh, r: Math.sin(t * 2) * 2 });
    face(cv, t, { look: [0, -2], brow: t > K.tenia ? -12 : 0, half: t > K.ponerlo, seed: 1.7 });
    set(ql, { r: -20 + Math.sin(t * 5) * 10, s: pop(t, S.K1[0] + 0.15, 0.35), o: t < S.K1[0] + 0.15 ? 0 : 1 });
    set(c54, { s: pop(t, K.cerv8, 0.3), r: -4, o: t < K.cerv8 ? 0 : 1 });
    stampA(ex, t, K.tenia - 0.02, -6, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' });
  rays(cam, -160, 300, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const cv = mkCerv(cam, [230, 420, 600, 767]); cv.d.style.zIndex = 5; cv.d.style.transformOrigin = '300px 700px';
  const ql = box(cam, 760, 640, 140, 280, { zIndex: 7, transformOrigin: '70px 270px' }); ql.innerHTML = quillSvg();
  const c54 = chip(cam, 120, 560, '«¿» = 1754', { size: 46, bg: INK, color: YEL, z: 20 });
  const ex = stamp(c, 170, 1060, 'ÉL TENÍA EXCUSA', { size: 76, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* K3 · GOLPE ROSA: «TÚ, EN EL WHATSAPP, NO.» — sello «SIN EXCUSA» sobre tu mensaje sin abrir */
colorHit(S.K3[0], S.K3[1], PINK, c => {
  const big = el('div', c, { left: 0, top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '190px', lineHeight: '210px', color: '#fff', textShadow: OUTL(INK, 10), zIndex: 10, whiteSpace: 'nowrap' }, '<span class="a" style="display:inline-block">Tú,</span> <span class="b" style="display:inline-block">no.</span>');
  const sa = big.querySelector('.a'), sb = big.querySelector('.b');
  const bb = el('div', c, { left: '200px', top: '640px', background: '#fff', border: `6px solid ${INK}`, borderRadius: '34px 34px 8px 34px', padding: '18px 36px 22px', fontFamily: 'Bricolage', fontWeight: 700, fontSize: '72px', color: INK, whiteSpace: 'nowrap', boxShadow: `8px 8px 0 ${INK}`, zIndex: 8 }, 'tienes hambre?');
  const tag = chip(c, 300, 560, 'tu chat', { size: 40, bg: INK, color: '#fff', z: 9 });
  const st = stamp(c, 160, 830, 'SIN EXCUSA', { size: 90, bw: 16, z: 40, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  return t => {
    set(sa, { s: pop(t, K.tu8 - 0.04, 0.3), r: -3, o: t < K.tu8 - 0.04 ? 0 : 1 });
    set(sb, { s: pop(t, K.no8 - 0.04, 0.3), r: 3, o: t < K.no8 - 0.04 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.no8, 0.3) ? glitch(t, K.no8, 0.3) + ', ' : '') + OUTL(INK, 10);
    set(bb, { s: pop(t, S.K3[0] + 0.05, 0.3), r: -2 });
    set(tag, { s: pop(t, K.whats - 0.1, 0.3), o: t < K.whats - 0.1 ? 0 : 1, r: -4 });
    stampA(st, t, K.whats, -9, 1);
  };
});

/* K4 · «¿TÚ LO PONES CUANDO ESCRIBES, O ERES DE LOS QUE NO? OS LEO.» — la pregunta + burbujas que se llenan */
{
  const QB = [];
  const c = scene(S.K4[0], S.K4[1], t => {
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.04, 0.3), o: t < w.t - 0.04 ? 0 : 1 }));
    paint(dHL, t, K.no9, 0.3);
    QB.forEach(q => { set(q.e, { s: pop(t, q.t, 0.3), r: q.r + Math.sin(t * 5 + q.t * 7) * 3, o: t < q.t ? 0 : 1 }); q.tx.textContent = '.'.repeat(1 + ((Math.floor((t - q.t) * 4 + 3) % 3) + 3) % 3); });
    popA(ol, t, K.os, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(255,62,165,.10)', 0);
  const L = [0, 1, 2].map(i => el('div', c, { left: 0, top: px(210 + i * 92), width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 }));
  const WD = [];
  [['¿Tú', 0], ['lo', 0], ['pones', 0], ['cuando', 1], ['escribes,', 1], ['o', 2], ['eres', 2], ['de', 2], ['los', 2], ['que', 2], ['no?', 2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.1em'; if (k === 10) { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('no?', 'dhl', YEL); } else s.textContent = q[0]; L[q[1]].appendChild(s); WD.push({ e: s, t: Math.max(W[K.i9 + k].s, S.K4[0] + k * 0.05) }); });
  const dHL = c.querySelector('.dhl');
  const BP = [[100, 540, S.K4[0] + 0.1], [560, 590, K.eres], [260, 770, K.no9 - 0.1], [600, 840, K.no9 + 0.2], [110, 980, K.os - 0.05], [500, 1010, K.leo]];
  BP.forEach((q, i) => { const e = bubble(c, q[0], q[1], '', { size: 150, tail: i % 2 ? 'br' : 'bl', z: 25, pad: '0px 70px 30px', bg: i % 2 ? '#fff' : '#FFF3A8' }); const tx = document.createElement('span'); tx.textContent = '…'; e.insertBefore(tx, e.lastChild); QB.push({ e, tx, t: q[2], r: (i % 2 ? 1 : -1) * 5 }); });
  const ol = chip(c, 520, 1170, 'Os leo 👇', { size: 70, bg: PINK, z: 40 });
  const hand = box(c, 380, 1160, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
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
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.4 && t < K.esto2 ? [0, -5] : t > K.esto2 ? [-4, 3] : [0, 0], bL: fanFast ? 8 : t > K.esto2 ? 6 : 0, bR: fanFast ? 8 : t > K.esto2 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
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
  const vec = mkVec(cam, [190, 470, 700, 867]);
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
  const tag = chip(cam, 640, 640, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 90, 190, 900, 290, { zIndex: 40 });
  sign.innerHTML = `<svg width="900" height="290" style="position:absolute;left:0;top:0;overflow:visible"><path d="M170,0 L210,40 M730,0 L690,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="860" height="246" rx="22"/>')}<rect x="20" y="40" width="860" height="246" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="828" height="214" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '66px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '82px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '170px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '60px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', 0], ['tu', 1], ['vecino,', 2], ['y', 3], ['esto', 4], ['no', 5], ['venía', 6], ['en', 7], ['el', 8], ['libro.', 9]].forEach(([wd, k]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino,' ? hlSpan('vecino,', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[K.isoy + k].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · «Y ESTO… NO VENÍA EN EL LIBRO.» — el libro HISTORIA se cierra (centrado) y el Vecino dice adiós
   ====================================================================== */
headline(S.BK[0], LOOP, 'Y esto… no venía *en el libro.*', { size: 84, hlT: K.libro, y: 210 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // al cerrarse, el libro (que solo ocupa la mitad derecha) se desplaza para quedar centrado
    set(bookW, { x: 210 * 1.1 * p(t, TC + 0.05, 0.25, E.outCubic), s: 1.1 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    const kv = p(t, S.BK[0] + 0.05, 0.35, E.outBack);
    set(vb.d, { y: (1 - kv) * 200 + wobble(t, 0.6, 3), o: t < S.BK[0] + 0.05 ? 0 : 1 });
    vecFace(vb, t, { jaw: talkW(t, 'VECINO'), look: [0, 2], bL: 8, bR: 8, fan: closed ? Math.sin(t * 2 * Math.PI * 1.2) * 18 : wobble(t, 0.9, 6), seed: 0.7 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const vb = mk(bookW, [140, 470, 380, 470], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); vb.d.style.zIndex = 0;
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">SIGNOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">¿ ? ¡ !</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1292px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 29 · Interrogación</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.15, { r: -1 }); };
}
