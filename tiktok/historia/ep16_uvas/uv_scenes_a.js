/* Ep. 16 · escenas L0–L3 (todo clavado por texto a words.js vía K) */
const qMark = (pa, x, y, sz = 120, col = PINK) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, '?');
const bigTxt = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20, whiteSpace: 'nowrap' }, css), html);
const OUTL = (c = INK, d = 10) => `${d}px ${d}px 0 ${c}, -4px -4px 0 ${c}, 4px -4px 0 ${c}, -4px 4px 0 ${c}`;
const hop = (t, k, n, f = 1.2, amp = 26) => { const ph = Math.max(0, Math.sin(2 * Math.PI * (t * f - k / n))); return -ph * ph * amp; };
// fila de bustos de calle como <use> (multitud barata)
function crowdLayer(pa, rows, z = 5) {
  const d = box(pa, 0, 0, 1080, 1920, { zIndex: z });
  d.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible;position:absolute;left:0;top:0"></svg>`;
  const svg = d.firstChild, U = [];
  rows.forEach(r => r.xs.forEach((x, i) => { const u = use(svg, '#' + r.sym[i % r.sym.length], r.w, r.w * 460 / 360); u.setAttribute('x', x); u.setAttribute('y', r.y); U.push({ u, x, y: r.y, w: r.w, row: r }); }));
  return { d, U };
}

/* ======================================================================
   A · PORTADA — reloj de la Puerta del Sol + 12 uvas con cara «12 UVAS = ?»
   ====================================================================== */
{
  const G12 = [];
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.035 * clamp(t / 2.8) });
    set(ry, { r: t * 9 });
    const bell = t > K.burla - 0.1 ? Math.sin((t - K.burla) * 14) * 16 * (1 - p(t, K.burla, 1.2)) : Math.sin(t * 7) * 5;
    solHands(tw, t, -2.2 + 2.2 * clamp((t + 0.6) / (K.burla + 0.6)), bell);
    const laugh = t > K.burla + 0.08;
    G12.forEach((g, k) => {
      const h = laugh ? -Math.abs(Math.sin(t * 16 + k)) * 14 : hop(t, k, 12, 1.25, 30);
      set(g.f.d, { x: g.x, y: g.y + h, r: g.r + (laugh ? Math.sin(t * 20 + k) * 5 : wobble(t, 0.7, 3, k * 0.13)), s: 1 });
      gFace(g.f, t, { look: laugh ? [0, 0] : [(540 - g.x - 75) / 40, (380 - g.y) / 70], laugh, jaw: laugh ? 0.6 + 0.4 * Math.abs(Math.sin(t * 14 + k)) : (h < -18 ? 0.5 : 0), bL: laugh ? 6 : 4, bR: laugh ? 6 : 4, seed: k * 0.37 });
    });
    // «?» que se mueve desde el fotograma 0 → sale cuando cae el sello
    const qo = p(t, K.burla - 0.06, 0.12, E.inCubic);
    set(qm, { s: (1 + 0.1 * Math.sin(t * 6)) * (1 - qo), r: Math.sin(t * 4) * 12, y: -Math.abs(Math.sin(t * 3)) * 16, o: 1 - qo });
    stampA(bur, t, K.burla, -7, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.34), rgba(255,230,0,0) 62%)' });
  const ry = rays(cam, -170, 360, 1420, 26, 'rgba(255,230,0,.32)', 'rgba(0,0,0,0)', 0);
  const tw = mkSolT(cam, [0, 0, 1080, 1920], '225 25 450 800'); tw.d.style.zIndex = 2;
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2, cx = 540 + Math.sin(a) * 312, cy = 900 - Math.cos(a) * 312;
    const f = mkGrape(cam, [0, 0, 150, 188]); f.d.style.zIndex = 6;
    G12.push({ f, x: cx - 75, y: cy - 98, r: Math.sin(a) * 10 });
  }
  // título-portada
  const rib = box(cam, 40, 166, 1000, 200, { zIndex: 40 });
  rib.innerHTML = `<svg width="1000" height="200" style="overflow:visible">${cut('<path d="M10,14 H990 L970,100 L990,186 H10 L30,100 Z"/>')}<path d="M10,14 H990 L970,100 L990,186 H10 L30,100 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="7"/><path d="M10,14 H990 L970,100 L990,186 H10 L30,100 Z" fill="url(#hP)" opacity=".5"/></svg>`;
  bigTxt(rib, 0, 22, 820, `12 UVAS =`, { fontSize: '150px', lineHeight: '160px', textShadow: `5px 5px 0 rgba(43,33,24,.25)` });
  const qm = el('div', cam, { left: '760px', top: '128px', width: '240px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '270px', lineHeight: '270px', color: PINK, textShadow: OUTL(INK, 9), zIndex: 45 }, '?');
  const bur = stamp(cam, 140, 380, '¡BURLA!', { size: 180, bw: 18, z: 60, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  const crA = crowdLayer(cam, [{ y: 1330, w: 230, xs: [-80, 100, 280, 460, 640, 820], sym: ['wkA', 'wkC', 'wkB'] }, { y: 1450, w: 270, xs: [-40, 200, 440, 680, 920], sym: ['wkB', 'wkA', 'wkC'] }], 8); crA.d.style.filter = 'brightness(.35) sepia(.6)';
}

/* ======================================================================
   B · «Y A LO MEJOR, LA BURLA ERA DE TI» — las uvas te señalan
   ====================================================================== */
headline(S.B[0], S.B[1], 'Y a lo mejor, la burla era de *ti*', { size: 86, hlT: K.ti, y: 200 });
{
  const c = scene(S.B[0], S.B[1], t => {
    set(ry, { r: -t * 10 });
    const laugh = t > K.burla2 - 0.05, at = t > K.ti - 0.08;
    [[gL, 1], [gR, -1]].forEach(([g, dir], i) => {
      const k = pop(t, S.B[0] + 0.05 + i * 0.1, 0.4);
      set(g.d, { s: k, y: (laugh ? -Math.abs(Math.sin(t * 15 + i)) * 16 : wobble(t, 0.6, 4, i)), r: dir * -6 + (laugh ? Math.sin(t * 22 + i) * 4 : 0), o: t < S.B[0] + 0.05 + i * 0.1 ? 0 : 1 });
      const pt = dir > 0 ? { armR: -28 + Math.sin(t * 9) * 4 } : { armL: 28 + Math.sin(t * 9) * 4 };
      gFace(g, t, Object.assign({ look: [dir * 8, 6], laugh, jaw: laugh ? 0.5 + 0.5 * Math.abs(Math.sin(t * 13 + i)) : 0, seed: i }, pt));
    });
    const kc = pop(t, S.B[0] + 0.02, 0.4);
    set(gC.d, { s: kc * (1 + (at ? 0.18 * p(t, K.ti - 0.08, 0.3, E.outBack) : 0)), y: wobble(t, 0.5, 4) + (laugh && !at ? -Math.abs(Math.sin(t * 13)) * 12 : 0), o: 1 });
    gFace(gC, t, { look: at ? [0, 2] : [-3, 4], laugh: laugh && !at, jaw: at ? 0.25 : laugh ? 0.7 + 0.3 * Math.abs(Math.sin(t * 12)) : talkW(t, 'VECINO') * 0.6, bL: at ? -4 : 8, bR: at ? 12 : 8, seed: 2, armL: t > K.mejor ? -50 + (at ? 0 : Math.sin(t * 9) * 5) : null, armR: t > K.mejor ? 50 - (at ? 0 : Math.sin(t * 9) * 5) : null });
    const kh = p(t, K.ti - 0.08, 0.32, E.outBack);
    set(hand, { s: pop(t, K.mejor, 0.4) * (1 + 0.3 * kh), y: kh * 30 + (at ? Math.sin(t * 30) * 3 : wobble(t, 0.8, 4)), r: at ? 0 : -6, o: t < K.mejor ? 0 : 1 });
    set(tu, { s: pop(t, K.ti, 0.35), r: -8 + Math.sin(t * 6) * 3, o: t < K.ti ? 0 : 1 });
    JA.forEach((j, i) => { const t0 = K.burla2 + i * 0.18; set(j, { s: pop(t, t0, 0.3) * (at ? 1 - p(t, K.ti - 0.1, 0.15) : 1), y: -p(t, t0, 1.2) * 40, r: [-12, 10, -6, 14][i], o: t < t0 ? 0 : 1 }); });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  const ry = rays(c, -170, 420, 1420, 22, 'rgba(255,62,165,.16)', 'rgba(0,0,0,0)', 0);
  const gL = mkGrape(c, [10, 760, 300, 375]); gL.d.style.zIndex = 4;
  const gR = mkGrape(c, [770, 760, 300, 375]); gR.d.style.zIndex = 4;
  const gC = mkGrape(c, [290, 500, 500, 625]); gC.d.style.zIndex = 5; gC.d.style.transformOrigin = '250px 560px';
  const hand = box(c, 0, 0, 1, 1, {});
  const JA = [[60, 520], [820, 560], [120, 1180], [780, 1180]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Rye', fontSize: '70px', color: YEL, textShadow: OUTL(INK, 5), zIndex: 30 }, 'JA'));
  const tu = chip(c, 640, 1180, '¿yo?', { size: 54, bg: INK, color: YEL, z: 40 });
}

/* ======================================================================
   C1 · MADRID, AÑOS OCHENTA… DEL SIGLO XIX
   ====================================================================== */
headline(S.C1[0], K.del - 0.05, 'Madrid, años *ochenta*…', { size: 92, hlT: K.ochenta });
headline(K.del - 0.05, S.C1[1], '…del *siglo XIX*', { size: 112, hlT: K.siglo });
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(cam, { s: 1.0 + 0.06 * p(t, S.C1[0], 3.8, E.linear), x: -14 * p(t, S.C1[0], 3.8, E.linear) });
    set(sky.d || sky, { y: (1 - p(t, S.C1[0], 0.45, E.outBack)) * 700 });
    const ks = p(t, K.madrid - 0.05, 0.6, E.outElastic); set(plq, { y: (1 - clamp(ks)) * -360, r: Math.sin(t * 2.6) * 2 * (1 - p(t, K.madrid, 2)) + (1 - ks) * 10, o: t < K.madrid - 0.07 ? 0 : 1 });
    stampA(s80, t, K.ochenta, -8, 1);
    { const k = p(t, K.diecinueve, 0.2, E.outCubic); set(xix, { s: t < K.diecinueve ? 0 : lerp(1.9, 1, k), r: 5, o: t < K.diecinueve ? 0 : 1 }); xix.style.textShadow = (glitch(t, K.diecinueve, 0.25) ? glitch(t, K.diecinueve, 0.25) + ', ' : '') + OUTL(INK, 9); }
    popA(ch, t, K.diecinueve + 0.45, { r: -3 });
    LG.forEach((l, i) => { l.style.opacity = 0.75 + 0.25 * Math.sin(t * 9 + i * 2); });
    set(moon, { r: wobble(t, 0.2, 4) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: 'linear-gradient(#E9DCC0, #E2CFAA)' });
  const moon = box(cam, 760, 380, 150, 150, { zIndex: 1 }); moon.innerHTML = `<svg width="150" height="150" style="overflow:visible"><circle cx="75" cy="75" r="62" fill="#FBF0C0" stroke="${INK}" stroke-width="4"/><circle cx="100" cy="60" r="56" fill="#E6D6B4"/><circle cx="75" cy="75" r="62" fill="url(#hP)"/></svg>`;
  const sky = box(cam, 0, 560, 1080, 700, { zIndex: 2 }); sky.innerHTML = svgW(madridSvg(), '0 0 1080 700');
  const lamps = [[90, 900], [890, 900]].map(([x, y]) => { const d = box(cam, x, y, 80, 360, { zIndex: 4 }); d.innerHTML = lampSvg(); return d; });
  const LG = lamps.map(l => l.querySelector('.lgl'));
  const plq = box(cam, 170, 380, 740, 190, { zIndex: 30, transformOrigin: '370px -40px' });
  plq.innerHTML = `<svg width="740" height="190" style="overflow:visible"><path d="M180,-60 L200,10 M560,-60 L540,10" stroke="${INK}" stroke-width="5"/>${cut('<rect x="0" y="0" width="740" height="190" rx="24"/>')}<rect x="0" y="0" width="740" height="190" rx="24" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="16" y="16" width="708" height="158" rx="14" fill="none" stroke="${NAVY}" stroke-width="10"/><path d="M16,60 q30,-10 44,-44 M724,60 q-30,-10 -44,-44 M16,130 q30,10 44,44 M724,130 q-30,10 -44,44" stroke="${NAVY}" stroke-width="4" fill="none"/><rect x="0" y="0" width="740" height="190" rx="24" fill="url(#hP)" opacity=".35"/></svg>`;
  bigTxt(plq, 0, 30, 740, 'MADRID', { fontSize: '130px', lineHeight: '130px', color: NAVY, letterSpacing: '0.06em' });
  const s80 = stamp(cam, 110, 590, 'AÑOS 80…', { size: 130, bw: 15, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const xix = el('div', cam, { left: '0', top: '850px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '180px', lineHeight: '210px', color: YEL, zIndex: 42, whiteSpace: 'nowrap' }, 'SIGLO XIX');
  const ch = chip(cam, 420, 1090, 'Madrid · siglo XIX', { size: 44, bg: INK, color: YEL, z: 44 });
}

/* ======================================================================
   C2 · LAS FAMILIAS RICAS COPIABAN UNA MODA FRANCESA
   ====================================================================== */
headline(S.C2[0], K.copiaban - 0.05, 'Las familias *ricas*…', { size: 100, hlT: K.ricas });
headline(K.copiaban - 0.05, S.C2[1], '…copiaban una *moda francesa*', { size: 82, hlT: K.francesa });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    set(lady.d, { x: (1 - p(t, S.C2[0], 0.45, E.outBack)) * -700, y: wobble(t, 0.5, 3), r: wobble(t, 0.3, 1) });
    set(gent.d, { x: (1 - p(t, S.C2[0] + 0.1, 0.45, E.outBack)) * 700, y: wobble(t, 0.5, 3, 0.4), r: wobble(t, 0.3, 1, 0.5) });
    const cop = t > K.copiaban;
    posh(lady, t, { look: cop ? [5, 0] : [2, -1], jaw: talkW(t, 'VECINO') * 0 + (t > K.ricas && t < K.ricas + 0.6 ? 0.6 : 0), seed: 0.2 });
    posh(gent, t, { look: cop ? [-5, 0] : [0, -1], seed: 1.1 });
    const raise = p(t, K.ricas, 0.3, E.outBack);
    lady.d.querySelector('.glass').setAttribute('transform', `translate(0 ${f1(-raise * 10)}) rotate(${f1(Math.sin(t * 3) * 3)} 292 112)`);
    gent.d.querySelector('.glass').setAttribute('transform', `translate(0 ${f1(-raise * 10)}) rotate(${f1(-Math.sin(t * 3) * 3)} 238 146)`);
    gent.d.querySelector('.mono').style.opacity = 1;
    SP.forEach((s, i) => { const t0 = K.ricas + i * 0.09; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 120, o: t < t0 ? 0 : 1 - p(t, K.copiaban, 0.3) }); });
    set(glint, { s: pop(t, K.ricas + 0.2, 0.3) * (0.7 + 0.3 * Math.sin(t * 12)), r: t * 200, o: t < K.ricas + 0.2 ? 0 : 1 });
    const kf = pop(t, K.francesa - 0.05, 0.45);
    set(flag, { s: kf, r: -6 + Math.sin(t * 5) * 4, o: t < K.francesa - 0.05 ? 0 : 1 });
    popA(mf, t, K.moda, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(122,46,62,.10) 0 26px, transparent 26px 70px), radial-gradient(circle at 50% 40%, rgba(255,255,255,.35), rgba(0,0,0,0) 70%)' });
  box(c, 0, 1180, 1080, 740, { background: '#B9874F', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 4px, transparent 4px 120px)', borderTop: `6px solid ${INK}`, zIndex: 1 });
  const lady = mkLady(c, [50, 420, 400, 820]); lady.d.style.zIndex = 5;
  const gent = mkGent(c, [620, 430, 300, 820]); gent.d.style.zIndex = 5;
  const SP = [[120, 470], [480, 560], [880, 520], [560, 900], [200, 820]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 30 }, '✦'));
  const glint = el('div', c, { left: '760px', top: '570px', fontSize: '60px', color: '#fff', textShadow: `2px 2px 0 ${INK}`, zIndex: 31 }, '✦');
  const flag = box(c, 400, 400, 270, 198, { zIndex: 8, transformOrigin: '20px 190px' }); flag.innerHTML = svgW(flagInner(), '0 0 300 220');
  const mf = chip(c, 330, 620, 'moda francesa', { size: 46, bg: PINK, z: 20 });
}

/* ======================================================================
   C3 · CENAR CON CHAMPÁN Y UVAS EN NOCHEVIEJA
   ====================================================================== */
headline(S.C3[0], S.C3[1], 'Cenar con *champán* y uvas', { size: 92, hlT: K.champan });
{
  const c = scene(S.C3[0], S.C3[1], t => {
    set(cam, { s: 1.02 + 0.05 * p(t, S.C3[0], 2.2, E.linear) });
    posh(lady, t, { look: t > K.champan ? [3, -4] : [4, 2], closed: false, seed: 0.5 });
    posh(gent, t, { look: t > K.champan ? [-3, -4] : [-4, 2], seed: 1.5 });
    set(lady.d, { y: wobble(t, 0.5, 3) }); set(gent.d, { y: wobble(t, 0.5, 3, 0.3) });
    const kc = p(t, K.champan, 0.55, E.outCubic);
    set(cork, { x: kc * 120, y: -kc * 330 + kc * kc * 90, r: kc * 520, o: t < K.champan - 0.02 ? 1 : 1 - p(t, K.champan + 0.45, 0.15) });
    set(bot.d, { r: t > K.champan && t < K.champan + 0.25 ? Math.sin(t * 60) * 3 : 0 });
    FO.forEach((f, i) => { const k = p(t, K.champan + i * 0.03, 0.6, E.outCubic); set(f, { x: Math.cos(i * 1.3) * 70 * k, y: -k * (120 + i * 22), s: k * (1 - p(t, K.champan + 0.5, 0.3)), o: t < K.champan ? 0 : 1 }); });
    set(plop, { s: pop(t, K.champan + 0.05, 0.3), r: -10, o: t < K.champan + 0.05 ? 0 : 1 - p(t, K.uvas1 - 0.1, 0.2) });
    set(bunch.d || bunch, { s: pop(t, K.uvas1 - 0.04, 0.45), r: -4 + wobble(t, 0.6, 2), o: t < K.uvas1 - 0.04 ? 0 : 1 });
    popA(nv, t, K.noche1, { r: -3 });
    set(clk, { s: pop(t, K.noche1 + 0.05, 0.4), r: wobble(t, 0.6, 3), o: t < K.noche1 + 0.05 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(122,46,62,.10) 0 26px, transparent 26px 70px)' });
  const lady = mkLady(cam, [10, 430, 400, 820]); lady.d.style.zIndex = 3;
  const gent = mkGent(cam, [690, 440, 300, 820]); gent.d.style.zIndex = 3;
  const tbl = box(cam, -20, 990, 1120, 520, { zIndex: 6 });
  let lace = ''; for (let x = 0; x < 1120; x += 40) lace += `<path d="M${x},300 q20,26 40,0" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  tbl.innerHTML = `<svg width="1120" height="520" style="overflow:visible">${cut('<rect x="0" y="0" width="1120" height="300"/>', 0, 10)}<rect x="0" y="0" width="1120" height="300" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="1120" height="300" fill="url(#hP)" opacity=".6"/><path d="M0,30 H1120" stroke="${INK}" stroke-width="3"/>${lace}<path d="M200,40 V290 M560,40 V290 M920,40 V290" stroke="${INK}" stroke-width="2" opacity=".3"/></svg>`;
  const bot = mk(cam, [470, 610, 140, 420], bottleInner(), '0 0 140 420', 'bot'); bot.d.style.zIndex = 8; bot.d.style.transformOrigin = '70px 410px';
  const cork = box(cam, 510, 590, 60, 70, { zIndex: 9 }); cork.innerHTML = corkSvg();
  const FO = [0, 1, 2, 3, 4, 5, 6].map(i => box(cam, 520, 600, 40, 40, { borderRadius: '50%', background: '#fff', border: `4px solid ${INK}`, zIndex: 7 }));
  const plop = el('div', cam, { left: '600px', top: '420px', fontFamily: 'Rye', fontSize: '80px', color: YEL, textShadow: OUTL(INK, 5), zIndex: 20 }, '¡PLOP!');
  const bunch = mk(cam, [700, 790, 220, 280], bunchInner(5), '0 0 220 280', 'bunch'); bunch.d.style.zIndex = 8; bunch.d.style.transformOrigin = '110px 260px';
  const nv = chip(cam, 330, 1120, 'Nochevieja', { size: 56, bg: INK, color: YEL, z: 20 });
  const clk = box(cam, 120, 410, 150, 150, { zIndex: 2 }); clk.innerHTML = `<svg width="150" height="150" style="overflow:visible"><circle cx="75" cy="75" r="68" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="75" cy="75" r="56" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M75,75 V30 M75,75 V38" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><text x="75" y="44" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="18" fill="${INK}">XII</text><circle cx="75" cy="75" r="6" fill="${INK}"/></svg>`;
}

/* ======================================================================
   D1 · A LA GENTE DE LA CALLE LE PARECIÓ TAN CURSI
   ====================================================================== */
headline(S.D1[0], K.parecio - 0.1, 'Y a la gente de la *calle*…', { size: 86, hlT: K.calle });
headline(K.parecio - 0.1, S.D1[1], '…le pareció tan *cursi*', { size: 96, hlT: K.cursi, hlc: '#ff9aa8' });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const cu = t > K.cursi - 0.05;
    B3.forEach((b, i) => {
      const t0 = K.gente - 0.25 + i * 0.12;
      set(b.d, { y: (1 - p(t, t0, 0.4, E.outBack)) * 600 + wobble(t, 0.6, 3, i) + (cu ? -Math.abs(Math.sin(t * 10 + i)) * 6 : 0), r: [-4, 2, 5][i] + (cu ? Math.sin(t * 8 + i) * 2 : 0), o: t < t0 ? 0 : 1 });
      face(b, t, { look: cu ? [[-6, -8], [-8, -8], [-10, -6]][i] : [[-8, -4], [-10, -2], [-10, -4]][i], half: cu, brow: cu ? -8 : 0, jaw: cu && i === 1 ? 0.3 + 0.2 * Math.sin(t * 12) : 0, seed: i });
    });
    posh(wl, t, { look: [4, -2], seed: 0.3 }); posh(wg, t, { look: [-4, -2], seed: 1.3 });
    set(win, { s: 1 + 0.03 * p(t, S.D1[0], 2.7, E.linear) });
    const ks = p(t, K.cursi, 0.17, E.outCubic); set(cur, { s: t < K.cursi ? 0 : lerp(2.3, 1, ks), r: -10, o: t < K.cursi ? 0 : 1 }); cur.style.textShadow = glitch(t, K.cursi, 0.22);
    set(dots, { o: t > K.calle && !cu ? 1 : 0, y: Math.sin(t * 6) * 6 });
    popA(gc, t, K.gente, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: '#D9C7A6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 4px, transparent 4px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 4px, transparent 4px 128px)' });
  box(c, 0, 1200, 1080, 720, { background: '#B9A27E', backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(43,33,24,.25) 18px, transparent 20px)', backgroundSize: '64px 52px', borderTop: `6px solid ${INK}`, zIndex: 1 });
  const win = box(c, 110, 380, 640, 480, { zIndex: 3, transformOrigin: '320px 240px' });
  box(win, 0, 0, 640, 480, { background: STONE, border: `6px solid ${INK}`, boxShadow: `10px 12px 0 ${SH}` });
  const wIn = box(win, 40, 40, 560, 400, { background: 'radial-gradient(circle at 50% 40%, #FFF2B0, #F2C860 80%)', border: `6px solid ${INK}`, overflow: 'hidden' });
  const wl = mkLady(wIn, [30, 40, 260, 533]); const wg = mkGent(wIn, [300, 40, 195, 533]);
  box(win, 316, 40, 8, 400, { background: INK, zIndex: 5 }); box(win, 40, 236, 560, 8, { background: INK, zIndex: 5 });
  box(win, -20, 440, 680, 40, { background: STONE2, border: `5px solid ${INK}`, zIndex: 6 });
  const B3 = [mk(c, [250, 820, 300, 383], womanInner(81), '0 0 360 460', 'bust'), mk(c, [500, 780, 320, 409], fanInner(74, 'cap', '#3a2f26'), '0 0 360 460', 'bust'), mk(c, [740, 830, 290, 371], fanInner(71, 'slouch', '#5a4632'), '0 0 360 460', 'bust')];
  B3.forEach((b, i) => b.d.style.zIndex = 8 + i);
  const dots = el('div', c, { left: '820px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 20 }, '…');
  const gc = chip(c, 640, 1130, 'la gente de la calle', { size: 40, bg: PINK, z: 30 });
  const cur = stamp(c, 170, 520, '¡CURSI!', { size: 170, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   D2 · SE FUE A LA PUERTA DEL SOL A COMERSE LAS UVAS CON LAS CAMPANADAS
   ====================================================================== */
headline(S.D2[0], K.comerse - 0.05, 'Se fue a la *Puerta del Sol*', { size: 88, hlT: K.puerta });
headline(K.comerse - 0.05, S.D2[1], 'Uvas con las *campanadas*', { size: 92, hlT: K.campanadas });
{
  const DONG = [K.campanadas, K.campanadas + 0.24, K.campanadas + 0.48];
  const c = scene(S.D2[0], S.D2[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.D2[0], 3.3, E.linear) });
    set(tw.d, { y: (1 - p(t, S.D2[0], 0.5, E.outBack)) * 900 });
    let bell = Math.sin(t * 5) * 4; DONG.forEach(d => { if (t > d) bell = Math.sin((t - d) * 18) * 22 * (1 - p(t, d, 0.6)); });
    solHands(tw, t, -1.5 + 1.5 * clamp((t - S.D2[0]) / (K.campanadas - S.D2[0])), bell);
    popA(ps, t, K.puerta, { r: -4 });
    DG.forEach((d, i) => { set(d, { s: pop(t, DONG[i], 0.25) * (1 - p(t, DONG[i] + 0.5, 0.2)), r: [-12, 8, -4][i], o: t < DONG[i] ? 0 : 1 }); });
    // uvas sobre las cabezas: aparecen en «uvas» y caen a la boca con cada campanada
    UV.forEach((u, i) => {
      const t0 = K.uvas2 - 0.1 + (i % 5) * 0.05, d = DONG[i % 3];
      const fall = p(t, d, 0.18, E.inCubic);
      set(u.e, { s: pop(t, t0, 0.3) * (1 - fall * 0.6), y: fall * 70 + (t < d ? Math.sin(t * 8 + i) * 5 : 0), o: t < t0 ? 0 : 1 - p(t, d + 0.12, 0.08) });
    });
    const chomp = DONG.some(d => t > d + 0.12 && t < d + 0.24);
    set(crowd.d, { y: chomp ? 6 : 0 });
    // cameo del emú
    const ke = p(t, K.comerse - 0.15, 0.18, E.outBack), ko = p(t, K.comerse + 0.55, 0.18, E.inCubic);
    set(emu.d, { y: (1 - ke) * 260 + ko * 280, o: t > K.comerse - 0.15 && t < K.comerse + 0.75 ? 1 : 0 });
    face(emu, t, { look: [0, 0], half: false, bL: 18, bR: 26, blink: false });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: 'linear-gradient(#E9DCC0 0%, #E2CFAA 60%)' });
  const tw = mkSolT(cam, [90, 380, 900, 1000]); tw.d.style.zIndex = 2;
  const emu = mkEmuF(cam, [790, 860, 210, 315]); emu.d.style.zIndex = 7;
  const crowd = crowdLayer(cam, [{ y: 1000, w: 230, xs: [-60, 120, 300, 480, 660, 840], sym: ['wkA', 'wkC', 'wkB'] }, { y: 1110, w: 260, xs: [40, 260, 470, 690, 900], sym: ['wkB', 'wkA', 'wkC', 'wkB', 'wkA'] }], 5);
  const UV = crowd.U.map(q => { const e = box(cam, q.x + q.w * 0.5 - 22, q.y + q.w * 0.18 - 40, 44, 52, { zIndex: 6 }); e.innerHTML = `<svg viewBox="0 0 44 52" width="44" height="52" style="overflow:visible"><path d="M22,8 V0" stroke="#6b4a2a" stroke-width="4"/><circle cx="22" cy="28" r="19" fill="${GRAPE}" stroke="${INK}" stroke-width="3.5"/><circle cx="15" cy="21" r="5" fill="#fff" opacity=".7"/></svg>`; return { e }; });
  const ps = chip(cam, 330, 930, 'Puerta del Sol', { size: 46, bg: INK, color: YEL, z: 20 });
  const DG = [[70, 600], [720, 640], [90, 790]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontFamily: 'Rye', fontSize: '82px', color: '#fff', background: RED, padding: '0 24px 8px', border: `5px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${INK}`, zIndex: 30, whiteSpace: 'nowrap' }, '¡DONG!'));
}

/* ======================================================================
   D3 · DE CACHONDEO — risas en primer plano
   ====================================================================== */
{
  const c = scene(S.D3[0], S.D3[1], t => {
    set(ry, { r: t * 30 });
    B3.forEach((b, i) => { set(b.d, { s: pop(t, S.D3[0] + i * 0.07, 0.35), y: -Math.abs(Math.sin(t * 14 + i * 1.3)) * 22, r: Math.sin(t * 18 + i) * 4, o: 1 }); face(b, t, { closed: true, jaw: 0.55 + 0.45 * Math.abs(Math.sin(t * 15 + i)), brow: -6, seed: i }); });
    WD.forEach(q => set(q.e, { s: pop(t, q.t - 0.04, 0.3), o: t < q.t - 0.04 ? 0 : 1, r: q.r }));
    set(rib, { sx: p(t, S.D3[0], 0.22, E.outBack) });
    JA.forEach((j, i) => { const t0 = S.D3[0] + 0.1 + i * 0.12; set(j, { s: pop(t, t0, 0.25), y: -p(t, t0, 1) * 60, r: [-14, 12, -8, 16, -4][i], o: t < t0 ? 0 : 1 }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F4CFDA' });
  const ry = rays(c, -170, 480, 1420, 24, 'rgba(255,62,165,.28)', 'rgba(0,0,0,0)', 0);
  const rib = box(c, 40, 330, 1000, 300, { zIndex: 20 });
  rib.innerHTML = `<svg width="1000" height="300" style="overflow:visible">${cut('<path d="M0,30 H1000 L970,150 L1000,270 H0 L30,150 Z"/>')}<path d="M0,30 H1000 L970,150 L1000,270 H0 L30,150 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,50 H960 M40,250 H960" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/></svg>`;
  const WD = [];
  [['¡DE', K.de, 52, 80], ['CACHONDEO!', K.cachondeo, 128, 108]].forEach((q, k) => { const s = el('div', rib, { left: '0', top: px(q[2]), width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: px(q[3]), lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `5px 5px 0 ${INK}` }, q[0]); WD.push({ e: s, t: q[1], r: [-3, 2][k] }); });
  const B3 = [mk(c, [20, 720, 400, 511], womanInner(81), '0 0 360 460', 'bust'), mk(c, [340, 660, 440, 562], fanInner(74, 'cap', '#3a2f26'), '0 0 360 460', 'bust'), mk(c, [670, 730, 390, 498], fanInner(71, 'slouch', '#5a4632'), '0 0 360 460', 'bust')];
  B3.forEach((b, i) => { b.d.style.zIndex = 8 + (i === 1 ? 2 : 0); b.d.style.transformOrigin = '50% 100%'; });
  const JA = [[90, 640], [830, 650], [470, 1240], [150, 1220], [800, 1230]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontFamily: 'Rye', fontSize: '80px', color: YEL, textShadow: OUTL(INK, 5), zIndex: 30 }, 'JA'));
}
