/* Ep. 23 · escenas L0–L2 (todo clavado por texto a words.js vía K) */
const jaT = (pa, x, y, txt = '¡JA!', sz = 84) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(sz), color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 40 }, txt);
function laughB(f, t, i = 0) { face(f, t, { closed: true, jaw: 0.55 + 0.35 * Math.abs(Math.sin(t * 17 + i)), brow: -6, blink: false }); }
const qMark = (pa, x, y, sz = 110, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1, color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 30 }, '?');
const newsLines = (w, h, seed, x0 = 20) => { const r = rng(seed); let s = ''; for (let y = 20; y < h - 10; y += 22) s += `M${x0},${y}H${f1(w - 20 - (r() < 0.2 ? 30 + r() * 80 : 0))}`; return `<svg width="${w}" height="${h}" style="position:absolute;left:0;top:0"><path d="${s}" stroke="${INK}" stroke-width="7" opacity=".28"/></svg>`; };

/* ======================================================================
   A · PORTADA / GANCHO — el comentario de Daniela + «OK → A.C.?» (pregunta, sin respuesta)
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, 0, 3, E.linear) });
    set(ry, { r: t * 9 });
    set(card, { y: wobble(t, 0.6, 5), r: -1.5 + wobble(t, 0.45, 0.8) });
    set(hrt, { s: 1 + 0.14 * Math.abs(Math.sin(t * 4.2)) });
    const yes = t > K.si;
    [o1, k1].forEach((f, i) => {
      set(f.d, { y: wobble(t, 0.7, 6, i * 0.4) - (yes ? Math.abs(Math.sin(t * 14 + i)) * 18 : 0), r: (i ? 5 : -5) + wobble(t, 0.5, 2, i) });
      sortFace(f, t, { seed: 1.1 + i * 1.7, look: yes ? [0, -2] : [10, -3], bL: yes ? 14 : (i ? 4 : 12), bR: yes ? 14 : (i ? 12 : 4), open: yes ? 0.7 : (t > K.A1 && t < K.C1 + 0.3 ? 0.3 : 0), aL: yes ? 120 + Math.sin(t * 20) * 10 : (i ? 14 : 150 + Math.sin(t * 9) * 12), aR: yes ? 120 + Math.cos(t * 20) * 10 : (i ? 150 + Math.sin(t * 9 + 1) * 12 : 14) });
    });
    QM.forEach((q, i) => set(q, { y: Math.sin(t * 3 + i * 2) * 14, r: -12 + i * 24 + Math.sin(t * 4 + i) * 10, s: 1 + 0.1 * Math.sin(t * 5 + i), o: yes ? 1 - p(t, K.si, 0.15) : 1 }));
    set(arr, { x: Math.sin(t * 6) * 10 });
    set(ac, { r: -4 + wobble(t, 0.6, 2), s: 1 + 0.04 * Math.sin(t * 5) + (yes ? 0.12 * (1 - p(t, K.si, 0.35)) : 0) });
    acQ.style.opacity = yes ? 0 : 1; acK.style.opacity = yes ? 1 : 0;
    stampA(siS, t, K.si, -8, 1);
    popA(chk, t, K.daniela, { r: -8 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#EFE1C6' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.38), rgba(255,230,0,0) 58%)' });
  const ry = rays(cam, -160, 160, 1400, 26, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  // el comentario real (dibujado, centrado; arriba queda hueco para la pegatina de TikTok)
  const card = box(cam, 60, 380, 960, 270, { background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${SH}`, zIndex: 20 });
  box(card, 26, 34, 140, 140, { borderRadius: '50%', overflow: 'hidden', border: `4px solid ${INK}` }, genAvatar());
  el('div', card, { left: '196px', top: '26px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '36px', color: '#7a6a58', whiteSpace: 'nowrap' }, 'danielaaaablopp');
  el('div', card, { left: '196px', top: '78px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '68px', lineHeight: 1.06, color: INK, whiteSpace: 'nowrap' }, 'osea q bien escrito<br>sería ac?');
  const hrt = box(card, 846, 62, 84, 76, { zIndex: 3 }); hrt.innerHTML = heartSvg('#fff', '#8d8475');
  el('div', card, { left: '820px', top: '146px', width: '136px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '42px', color: '#7a6a58' }, '75');
  const chk = box(card, 640, 150, 110, 110, { zIndex: 4 }); chk.innerHTML = CHECK;
  // OK → A.C.?
  const o1 = mkSort(cam, [30, 760, 290, 454], 'O'), k1 = mkSort(cam, [282, 770, 290, 454], 'K');
  o1.d.style.zIndex = 10; k1.d.style.zIndex = 10;
  const QM = [qMark(cam, 40, 700, 110), qMark(cam, 500, 690, 120, YEL)];
  const arr = box(cam, 540, 920, 120, 110, { zIndex: 12 });
  arr.innerHTML = `<svg width="120" height="110" style="overflow:visible"><path d="M6,55 H86 M60,20 L100,55 L60,90" stroke="${INK}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M6,55 H86 M60,20 L100,55 L60,90" stroke="${PINK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const ac = el('div', cam, { left: '640px', top: '868px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '124px', lineHeight: '150px', color: INK, background: YEL, padding: '0 24px 6px', border: `6px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 10px 0 ${INK}`, zIndex: 14, whiteSpace: 'nowrap' }, 'A.C.<span class="q">?</span><span class="k" style="position:absolute;right:20px;top:0;opacity:0"> </span>');
  const acQ = ac.querySelector('.q'), acK = ac.querySelector('.k');
  const siS = stamp(cam, 590, 1080, '¡SÍ!', { size: 190, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   B · «Y ES AÚN MÁS ABSURDO» — O y K se parten de risa + absurdómetro
   ====================================================================== */
headline(S.B[0], S.B[1], 'Y es aún *más absurdo*', { size: 100, hlT: K.mas });
{
  const c = scene(S.B[0], S.B[1], t => {
    const laugh = t > K.absurdo;
    [o2, k2].forEach((f, i) => {
      const t0 = S.B[0] + 0.02 + i * 0.08;
      set(f.d, { s: pop(t, t0, 0.4), y: laugh ? -Math.abs(Math.sin(t * 15 + i * 1.3)) * 24 : wobble(t, 0.7, 5, i), r: (laugh ? Math.sin(t * 19 + i) * 5 : 0) + (i ? 5 : -5), o: t < t0 ? 0 : 1 });
      sortFace(f, t, { closed: laugh, open: laugh ? 0.55 + 0.45 * Math.abs(Math.sin(t * 18 + i)) : 0.25, look: [i ? -6 : 6, 3], bL: 8, bR: 8, aL: laugh ? 70 + Math.sin(t * 22) * 12 : 20, aR: laugh ? 70 + Math.cos(t * 22) * 12 : 20, seed: i });
    });
    const kn = p(t, K.aun, K.absurdo + 0.25 - K.aun, E.inOutCubic);
    needle.setAttribute('transform', `rotate(${f1(-80 + 168 * kn + (t > K.absurdo + 0.2 ? Math.sin(t * 40) * 4 : 0))} 260 250)`);
    set(gauge, { s: pop(t, S.B[0] + 0.1, 0.4), r: -2, o: t < S.B[0] + 0.1 ? 0 : 1 });
    popA(lab, t, K.absurdo, { r: -6 });
    jas.forEach((j, i) => { const t0 = K.absurdo + 0.05 + i * 0.12; set(j, { s: pop(t, t0, 0.3), r: [-12, 10, -6][i], y: -p(t, t0, 1) * 40, o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' });
  rays(c, -160, 160, 1400, 24, 'rgba(255,255,255,.22)', 'rgba(0,0,0,0)', 0);
  const o2 = mkSort(c, [170, 560, 300, 470], 'O'), k2 = mkSort(c, [610, 570, 300, 470], 'K');
  const gauge = box(c, 280, 1040, 520, 330, { zIndex: 20 });
  {
    const arc = (a0, a1, col) => { const r = 210, cx = 260, cy = 250; const P0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], P1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]; return `<path d="M${f1(P0[0])},${f1(P0[1])} A${r},${r} 0 0 1 ${f1(P1[0])},${f1(P1[1])}" stroke="${col}" stroke-width="46" fill="none"/>`; };
    const pi = Math.PI;
    gauge.innerHTML = `<svg width="520" height="330" style="overflow:visible">${cut('<path d="M10,262 A250,250 0 0 1 510,262 Z"/>')}<path d="M10,262 A250,250 0 0 1 510,262 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/>
    ${arc(pi, pi * 1.4, '#7ac08a')}${arc(pi * 1.4, pi * 1.7, YEL)}${arc(pi * 1.7, pi * 2, RED)}<path d="M50,250 A210,210 0 0 1 470,250" stroke="${INK}" stroke-width="4" fill="none"/>
    <g class="ndl"><path d="M254,250 L260,64 L266,250 Z" fill="${INK}"/></g><circle cx="260" cy="250" r="20" fill="${INK}"/><circle cx="260" cy="250" r="8" fill="${BRASS}"/>
    <text x="260" y="316" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">ABSURDÓMETRO</text></svg>`;
  }
  const needle = gauge.querySelector('.ndl');
  const lab = stamp(c, 640, 1010, '¡MÁXIMO!', { size: 64, bw: 9, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const jas = [jaT(c, 70, 440), jaT(c, 800, 420), jaT(c, 430, 380, '¡JA!', 70)];
}

/* ======================================================================
   C · «O.K. VIENE DE "OLL KORRECT"» — el Boston Morning Post
   ====================================================================== */
headline(S.C[0], S.C[1], '*O.K.* viene de…', { size: 116, hlT: K.ok1 });
{
  const c = scene(S.C[0], S.C[1], t => {
    const k = p(t, S.C[0], 0.45, E.outBack);
    set(np.d, { y: (1 - k) * 900, r: lerp(12, -2, k) + wobble(t, 0.4, 0.4), s: 1 + 0.04 * p(t, K.ok1, 2, E.linear) });
    okHL.setAttribute('width', f1(p(t, K.ok1 + 0.05, 0.3, E.outCubic) * 178));
    const ks = p(t, K.oll - 0.05, 0.35, E.outBack);
    set(strip.wrap, { x: (1 - ks) * 700, r: -3 + wobble(t, 0.5, 0.6), o: t < K.oll - 0.05 ? 0 : 1 });
    set(stW, { o: t > K.korrect ? 1 : 0.0 });
    set(ar, { o: t > K.oll + 0.15 ? 1 : 0 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const np = mk(c, [250, 380, 580, 735], newsInner({ title: 'BOSTON MORNING POST', mfs: 44, okY: 470, seed: 9 }), '0 0 600 760', 'np');
  const okHL = np.d.querySelector('.okHL');
  const strip = paperPiece(c, 390, 1000, 560, 190, { seed: 13, bg: '#FBF6EA' }); strip.wrap.style.zIndex = 20;
  el('div', strip.inner, { left: '0', top: '22px', width: '542px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '92px', color: RED, whiteSpace: 'nowrap' }, '«oll korrect»');
  const stW = el('div', strip.inner, { left: '0', top: '0', width: '1px', height: '1px' });
  const ar = box(c, 0, 0, 1080, 1920, { zIndex: 19 }); ar.innerHTML = arrowSvg('M430,880 Q470,940 560,990', PINK, 9);
}

/* ======================================================================
   D · «ALL CORRECT, ESCRITO MAL A PROPÓSITO» — se tacha y se corrige
   ====================================================================== */
headline(S.D[0], K.escrito - 0.06, 'O sea, *all correct*', { size: 104, hlT: K.all });
headline(K.escrito - 0.06, S.D[1], 'escrito mal *a propósito*', { size: 92, hlT: K.proposito });
{
  const c = scene(S.D[0], S.D[1], t => {
    [[r1, K.all - 0.05], [r2, K.correct - 0.05]].forEach(([r, t0], i) => set(r.e, { o: 1, x: (1 - p(t, S.D[0] + i * 0.08, 0.3, E.outBack)) * -80, r: [-2, 1.5][i] }));
    [[r1, K.all], [r2, K.correct]].forEach(([r, t0]) => { r.st.style.transform = `scaleX(${f1(p(t, t0, 0.15) * 100) / 100}) rotate(-8deg)`; popA(r.ad, t, t0 + 0.08, { r: -10 }); });
    stampA(prop, t, K.proposito, -8, 1);
    set(jn.d, { s: pop(t, S.D[0] + 0.15, 0.45), y: wobble(t, 0.6, 3), o: t < S.D[0] + 0.15 ? 0 : 1 });
    const wink = t > K.proposito - 0.05 && t < K.proposito + 0.7;
    face(jn, t, { look: [-6, -2], closed: wink, jaw: t > K.escrito && t < K.proposito ? Math.abs(Math.sin(t * 11)) * 0.3 : 0, seed: 2.2, bL: wink ? 12 : 2, bR: wink ? 0 : 2 });
    set(pen, { x: Math.sin(t * 16) * 10 * (t > K.escrito && t < K.proposito ? 1 : 0), y: Math.cos(t * 16) * 6 * (t > K.escrito && t < K.proposito ? 1 : 0), r: 20 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const mkRow = (y, wrong, rest, fix) => {
    const e = el('div', c, { left: '170px', top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '170px', lineHeight: 1, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
    e.innerHTML = `<span style="position:relative;display:inline-block">${wrong}<span class="st" style="position:absolute;left:-10px;top:46%;width:130%;height:16px;background:${RED};border-radius:8px;transform-origin:left center;transform:scaleX(0)"></span><span class="ad" style="position:absolute;left:4px;top:-86px;font-family:SpecialElite;font-style:normal;font-size:110px;color:${RED}">${fix}</span></span>${rest}`;
    return { e, st: e.querySelector('.st'), ad: e.querySelector('.ad') };
  };
  const r1 = mkRow(500, 'o', 'll', 'a'), r2 = mkRow(740, 'k', 'orrect', 'c');
  const prop = stamp(c, 120, 930, '¡A PROPÓSITO!', { size: 84, bw: 12, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const jn = mk(c, [620, 960, 300, 383], journalistInner(42, 1), '0 0 360 460', 'bust'); jn.d.style.zIndex = 8;
  const pen = box(c, 560, 1080, 120, 240, { zIndex: 9 });
  pen.innerHTML = `<svg viewBox="0 0 120 240" width="120" height="240" style="overflow:visible">${cut('<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z"/>', 4, 6)}<path d="M60,236 L52,150 C10,110 20,30 100,4 C96,60 90,120 68,150 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M60,232 C64,150 80,70 98,8" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
}

/* ======================================================================
   E · «BIEN ESCRITO, SERÍA A, C.» — ALL CORRECT en tipos → A.C. + sello
   ====================================================================== */
headline(S.E[0], K.yno - 0.05, '*Bien escrito*, sería…', { size: 96, hlT: K.bien2 });
{
  const LET = 'ALL CORRECT'.split('');
  const SO = [];
  const c = scene(S.E[0], S.E[1], t => {
    const fall = K.seria2;
    SO.forEach((q, i) => {
      const t0 = K.bien2 + i * 0.05, kd = p(t, t0, 0.3, E.outBounce);
      let x = 0, y = lerp(-420, 0, kd), r = 0, o = t < t0 ? 0 : 1, s = 1;
      if (q.ini) { const km = p(t, fall, 0.38, E.inOutCubic); x = km * (q.tx - q.x0); y += km * 80; s = lerp(1, 2.4, p(t, q.ini === 1 ? K.A2 : K.C2, 0.25, E.outBack)); }
      else if (t > fall) { const tf = t - fall - i * 0.02; y = tf > 0 ? 2700 * tf * tf : 0; r = tf > 0 ? (i % 2 ? 1 : -1) * tf * 200 : 0; }
      set(q.e, { x, y, r, o, s });
      q.e.style.background = q.ini && t > (q.ini === 1 ? K.A2 : K.C2) ? YEL : METAL;
    });
    dots.forEach((d, i) => popA(d, t, (i ? K.C2 : K.A2) + 0.08, { y: 0 }));
    set(tray, { y: 80 * p(t, fall, 0.38, E.inOutCubic), o: 1 - p(t, fall + 0.2, 0.2) });
    stampA(be, t, K.C2 + 0.04, -7, 1);
    [so, sk].forEach((f, i) => { set(f.d, { s: pop(t, S.E[0] + 0.2 + i * 0.1, 0.4), y: wobble(t, 0.6, 3, i), r: [-4, 4][i], o: t < S.E[0] + 0.2 + i * 0.1 ? 0 : 1 }); sortFace(f, t, { look: [-9, -3], bL: t > K.A2 ? -6 : 4, bR: t > K.A2 ? -6 : 4, open: t > K.C2 ? 0.45 : 0, aL: 6, aR: 6, seed: i + 2 }); });
    popA(jl, t, K.C2 + 0.3, { r: 6 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const tray = box(c, 60, 470, 960, 200, { zIndex: 4 });
  tray.innerHTML = `<svg width="960" height="200" style="overflow:visible">${cut('<rect x="0" y="40" width="960" height="150" rx="10"/>')}<rect x="0" y="150" width="960" height="40" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="0" y="150" width="960" height="40" fill="url(#hD)" opacity=".5"/><rect x="0" y="40" width="26" height="150" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="934" y="40" width="26" height="150" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="5"/></svg>`;
  LET.forEach((ch, i) => {
    const x0 = 100 + i * 80, blank = ch === ' ';
    const e = miniSort(c, x0, blank ? 556 : 516, blank ? '' : ch, { w: 72, h: blank ? 64 : 104, z: 10 });
    const ini = i === 0 ? 1 : i === 4 ? 2 : 0;
    SO.push({ e, x0, ini, tx: i === 0 ? 300 : 620 });
  });
  const dots = [440, 760].map(x => el('div', c, { left: px(x), top: '500px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '220px', lineHeight: '220px', color: INK, zIndex: 11 }, '.'));
  const be = stamp(c, 150, 810, '¡BIEN ESCRITO!', { size: 80, bw: 13, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const so = mkSort(c, [520, 1020, 190, 298], 'O'), sk = mkSort(c, [730, 1020, 190, 298], 'K');
  const jl = el('div', c, { left: '500px', top: '930px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '72px', color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30, whiteSpace: 'nowrap' }, '¡¿Y nosotras?!');
}

/* ======================================================================
   F · «Y NO ERA LA ÚNICA. TAMBIÉN ESCRIBÍAN…» — periodistas y recortes
   ====================================================================== */
headline(K.yno - 0.05, K.tambien - 0.06, 'Y no era *la única*', { size: 104, hlT: K.unica });
headline(K.tambien - 0.06, S.F[1], 'También escribían…', { size: 100 });
{
  const c = scene(S.F[0], S.F[1], t => {
    const laugh = t > K.tambien;
    JN.forEach((f, i) => {
      const t0 = S.F[0] + 0.05 + i * 0.1;
      set(f.d, { s: pop(t, t0, 0.45), y: laugh ? -Math.abs(Math.sin(t * 15 + i)) * 16 : wobble(t, 0.7, 3, i * 0.4), r: laugh ? Math.sin(t * 18 + i) * 4 : 0, o: t < t0 ? 0 : 1 });
      if (laugh) laughB(f, t, i); else face(f, t, { look: [0, -4], seed: i * 1.1 });
    });
    set(n1.wrap, { s: pop(t, S.F[0] + 0.05, 0.4), r: -6 + wobble(t, 0.5, 1), o: 1 });
    set(n2.wrap, { s: pop(t, K.unica, 0.4), r: 5 + wobble(t, 0.5, 1, 1), o: t < K.unica ? 0 : 1 });
    set(q2, { s: 1 + 0.15 * Math.abs(Math.sin(t * 6)), r: Math.sin(t * 4) * 8 });
    popA(c1, t, S.F[0] + 0.3, { r: -8 });
    jas.forEach((j, i) => { const t0 = K.tambien + 0.1 + i * 0.15; set(j, { s: pop(t, t0, 0.3), r: [-10, 8, -4][i], y: -p(t, t0, 0.8) * 30, o: t < t0 ? 0 : 1 }); });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const n1 = paperPiece(c, 90, 420, 430, 330, { seed: 41, bg: '#FBF6EA' });
  n1.inner.innerHTML += newsLines(412, 312, 3);
  el('div', n1.inner, { left: '0', top: '60px', width: '412px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: INK, background: 'rgba(251,246,234,.9)' }, 'O.K.');
  const c1 = box(n1.wrap, 300, 210, 120, 120, { zIndex: 5 }); c1.innerHTML = CHECK;
  const n2 = paperPiece(c, 560, 450, 420, 330, { seed: 43, bg: '#FBF6EA' });
  n2.inner.innerHTML += newsLines(402, 312, 7);
  const q2 = el('div', n2.inner, { left: '0', top: '50px', width: '402px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: RED, background: 'rgba(251,246,234,.9)' }, '¿…?');
  const desk = box(c, 380, 1110, 600, 120, { zIndex: 6 });
  desk.innerHTML = `<svg width="600" height="120" style="overflow:visible">${cut('<rect x="0" y="0" width="600" height="120"/>')}<rect x="0" y="0" width="600" height="120" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="600" height="120" fill="url(#hW)" opacity=".3"/><rect x="0" y="0" width="600" height="22" fill="#8b5a3a" stroke="${INK}" stroke-width="4"/></svg>`;
  const JN = [mk(c, [380, 850, 210, 268], journalistInner(41, 0), '0 0 360 460', 'bust'), mk(c, [570, 830, 220, 281], journalistInner(42, 1), '0 0 360 460', 'bust'), mk(c, [760, 850, 200, 255], journalistInner(43, 2), '0 0 360 460', 'bust')];
  JN.forEach(f => (f.d.style.zIndex = 5));
  const jas = [jaT(c, 400, 820, '¡JA!', 70), jaT(c, 610, 790, '¡JA, JA!', 60), jaT(c, 800, 830, '¡JA!', 70)];
}

/* ======================================================================
   G · «O.W.: OLL WRIGHT» — recorte de periódico + tipos O y W
   ====================================================================== */
headline(S.G[0], S.G[1], 'Otra igual: *O.W.*', { size: 110, hlT: K.OW });
{
  const c = scene(S.G[0], S.G[1], t => {
    const k = p(t, S.G[0], 0.4, E.outBack);
    set(clip.wrap, { y: (1 - k) * -900, r: lerp(-10, -2, k) + wobble(t, 0.4, 0.5), s: 1 + 0.03 * p(t, K.OW, 2.4, E.linear) });
    paint(owHL, t, K.OW + 0.1, 0.35);
    eqT.textContent = typeText('= «oll wright»', t, K.oll2 - 0.05, 22);
    popA(ar, t, K.wright + 0.2, { r: -4 });
    [sO, sW].forEach((f, i) => {
      const t0 = K.OW + i * 0.15;
      set(f.d, { s: pop(t, t0, 0.45), y: wobble(t, 0.6, 4, i) - (t > K.wright ? Math.abs(Math.sin(t * 9 + i)) * 12 : 0), r: [-5, 5][i], o: t < t0 ? 0 : 1 });
      sortFace(f, t, { look: [-6, -4], open: t > K.oll2 && t < K.wright + 0.5 ? 0.35 + 0.3 * Math.abs(Math.sin(t * 12 + i)) : 0, aL: t > K.wright ? 60 : 12, aR: t > K.wright ? 60 : 12, bL: 6, bR: 6, seed: i * 2 });
    });
  });
  sceneBg(c, { background: '#E9DFC6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 46px)' });
  const clip = paperPiece(c, 130, 400, 820, 500, { seed: 51, bg: '#F6ECD4' }); clip.wrap.style.zIndex = 10;
  clip.inner.innerHTML += newsLines(802, 482, 11);
  el('div', clip.inner, { left: '0', top: '10px', width: '802px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, background: '#F6ECD4', padding: '6px 0' }, '— recorte de periódico —');
  const ow = el('div', clip.inner, { left: '0', top: '60px', width: '802px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: '250px', color: INK }, hlSpan('O.W.', 'owh'));
  const owHL = ow.querySelector('.owh');
  const eqT = el('div', clip.inner, { left: '0', top: '330px', width: '802px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: RED, background: 'rgba(246,236,212,.92)', whiteSpace: 'nowrap', height: '120px' }, '');
  const ar = chip(c, 520, 920, '= all right ✔', { size: 54, bg: PINK, z: 30 });
  const sO = mkSort(c, [430, 1000, 180, 282], 'O'), sW = mkSort(c, [650, 1000, 180, 282], 'W', { fs: 180 });
  sO.d.style.zIndex = 12; sW.d.style.zIndex = 12;
}

/* ======================================================================
   H · GOLPE ROSA: «ERA EL "OLA K ASE" DE LA ÉPOCA» — grabado vs. móvil
   ====================================================================== */
colorHit(S.H[0], S.H[1], PINK, c => {
  const l0 = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '92px', color: INK, zIndex: 10 }, 'Era el…');
  const big = el('div', c, { left: 0, top: '340px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '170px', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 10, whiteSpace: 'nowrap' });
  const WD = []; const io = find('ola k ase');
  ['«ola', 'k', 'ase»'].forEach((s, k) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.1em'; e.textContent = s; big.appendChild(e); WD.push({ e, t: W[io + k].s }); });
  // izquierda: el grabado de 1800 y pico
  const old = paperPiece(c, 70, 640, 400, 380, { seed: 61, bg: '#F6ECD4' }); old.wrap.style.zIndex = 6;
  old.inner.innerHTML += newsLines(382, 362, 17);
  el('div', old.inner, { left: '0', top: '90px', width: '382px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', color: INK, background: 'rgba(246,236,212,.92)' }, 'O.W.');
  const eq = el('div', c, { left: '462px', top: '740px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: INK, zIndex: 7 }, '=');
  // derecha: el móvil de hoy
  const M = modernPhone(c, 590, 600, 360, 640, { z: 6 });
  box(M.hd, 18, 18, 66, 66, { borderRadius: '50%', overflow: 'hidden', border: `3px solid #fff` }, genAvatar('#B8C9D9', '#6f86a0'));
  el('div', M.hd, { left: '98px', top: '30px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '32px', color: '#fff', whiteSpace: 'nowrap' }, 'Grupo');
  const b1 = msgB(M.scr, false, 40, 'ola k ase', { size: 60 });
  const b2 = msgB(M.scr, true, 160, 'jajaja', { size: 50 });
  const ep = chip(c, 330, 1180, 'de la época', { size: 66, bg: INK, color: YEL, z: 20 });
  return t => {
    popA(l0, t, K.era, { rise: 30 });
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.3), r: -3, o: t < w.t - 0.03 ? 0 : 1 }));
    big.style.textShadow = (glitch(t, K.ase, 0.25) ? glitch(t, K.ase, 0.25) + ', ' : '') + `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`;
    set(old.wrap, { s: pop(t, S.H[0] + 0.05, 0.4), r: -7 + wobble(t, 0.5, 1), o: 1 });
    popA(eq, t, K.ola - 0.1, { r: 0 });
    set(M.ph, { y: (1 - p(t, S.H[0] + 0.1, 0.4, E.outBack)) * 900 + wobble(t, 0.6, 3), r: 4 });
    popA(b1, t, K.ola, { rise: 30 }); popA(b2, t, K.ase + 0.25, { rise: 30 });
    popA(ep, t, K.epoca, { r: -3 });
  };
});
