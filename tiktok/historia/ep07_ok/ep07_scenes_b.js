/* Ep. 7 · escenas L6–L11 + tarjeta final */

/* ======================================================================
   J · SALE DE LA PAPELERA → CAMPAÑA DE VAN BUREN (33.0 – 36.45)  L6a
   ====================================================================== */
headline(33.0, 34.5, 'Pero al *año siguiente*…', { size: 92, hlT: 33.28 });
headline(34.5, 36.45, 'La campaña de *Martin Van Buren*', { size: 80, hlT: 35.34 });
{
  const c = scene(33.0, 36.45, t => {
    // papelera → bola que sale volando
    const kb = clamp((t - 33.15) / 0.75);
    const bx = lerp(760, 540, kb), by = lerp(1020, 820, kb) - Math.sin(kb * Math.PI) * 280;
    set(ball, { x: bx - 90, y: by - 90, r: -t * 380, s: t < 33.15 ? 0 : lerp(0.7, 3.4, E.inCubic(kb)), o: t < 33.15 || t > 34.0 ? 0 : 1 });
    set(bk.d, { r: t < 33.2 ? Math.sin(t * 50) * 6 * p(t, 33.0, 0.1) : 0, y: (t > 33.6 ? p(t, 33.6, 0.3, E.inCubic) * 900 : 0), o: t > 34.0 ? 0 : 1 });
    const kc = p(t, 33.95, 0.3, E.outCubic);
    camp.style.opacity = kc; camp.style.visibility = kc > 0 ? 'visible' : 'hidden';
    set(flash, { o: t > 33.9 && t < 34.25 ? 1 - p(t, 33.95, 0.3) : 0 });
    popA(rib, t, 34.19, { r: -2 });
    set(vb.d, { s: pop(t, 34.05, 0.5), y: wobble(t, 0.5, 3), o: t < 34.05 ? 0 : 1 });
    face(vb, t, { look: t > 35.3 ? [0, 0] : [4, -2], brow: t > 35.34 && t < 36.0 ? -10 : 0, seed: 0.8 });
    popA(nm, t, 35.34, { r: -3 });
    set(bunt, { y: Math.sin(t * 3) * 4 });
    CF.forEach(q => { const k = clamp((t - 34.05 - q.d) / 2.2); set(q.e, { x: q.x + Math.sin(t * 3 + q.d * 9) * 30, y: lerp(-80, 1300, k), r: t * q.rs, o: t > 34.05 + q.d ? 1 : 0 }); });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const bk = mk(c, [640, 980, 240, 277], basketInner(), '0 0 260 300', 'bk'); bk.d.style.zIndex = 9;
  const ball = box(c, 0, 0, 180, 180, { zIndex: 12 }); ball.innerHTML = svgW(ballInner(), '0 0 200 200');
  const camp = box(c, 0, 0, 1080, 1920, { zIndex: 5 });
  sceneBg(camp, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.10) 0 46px, transparent 46px 92px)' });
  const r0 = rays(camp, -170, 290, 1420, 24, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 0);
  const bunt = box(camp, 0, 0, 1080, 300, { zIndex: 3 }); bunt.innerHTML = `<svg width="1080" height="600" style="overflow:visible;position:absolute;top:0;left:0">${buntingSvg(1080, 440, 6)}</svg>`;
  const vb = mk(camp, [300, 640, 480, 613], vbInner(), '0 0 360 460', 'bust'); vb.d.style.zIndex = 4;
  const rib = el('div', camp, { left: '160px', top: '560px', width: '760px', textAlign: 'center', background: RED, color: '#fff', fontFamily: 'Rye', fontSize: '50px', padding: '8px 0 12px', border: `5px solid ${INK}`, boxShadow: `7px 8px 0 ${SH}`, zIndex: 6, whiteSpace: 'nowrap' }, 'CAMPAÑA PRESIDENCIAL');
  const nm = chip(camp, 460, 1140, 'Martin Van Buren', { size: 50, bg: INK, color: YEL, z: 8 });
  const flash = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 20 });
  const CF = []; const r = rng(55);
  for (let i = 0; i < 16; i++) CF.push({ e: box(camp, 0, 0, 24, 14, { background: [RED, YEL, '#fff', PINK][i % 4], border: `2px solid ${INK}`, zIndex: 7 }), x: 60 + r() * 900, d: r() * 0.8, rs: 200 + r() * 300 });
  void r0;
}

/* ======================================================================
   K · KINDERHOOK → «OLD KINDERHOOK» (36.45 – 41.1)  L6b
   ====================================================================== */
headline(36.45, 39.0, 'Era de un pueblo: *Kinderhook*', { size: 80, hlT: 37.96 });
headline(39.0, 41.1, 'Le apodaban *Old Kinderhook*', { size: 82, hlT: 39.65 });
{
  const c = scene(36.45, 41.1, t => {
    const ks = p(t, 37.96, 0.6, E.outElastic);
    set(sign.d, { y: (1 - clamp(ks)) * -700, r: (1 - ks) * 10 + Math.sin(t * 2) * 1.2, o: t < 37.9 ? 0 : 1 });
    popA(av, t, 36.55, { r: -4 }); set(avArr, { o: t > 36.9 ? 1 : 0 });
    popA(pc, t, 37.29, { r: 4 });
    set(cam, { s: 1 + 0.05 * p(t, 36.5, 2.5, E.linear) });
    // cartel de campaña
    const kp = p(t, 38.95, 0.45, E.outBack);
    set(post.wrap, { y: (1 - kp) * 1200, r: lerp(10, -2, kp), o: t < 38.95 ? 0 : 1 });
    paint(hO, t, 39.65, 0.25); paint(hK, t, 40.09, 0.25);
    set(lO, { s: 1 + 0.25 * (t > 39.65 ? 1 - p(t, 39.65, 0.35) : 0) }); set(lK, { s: 1 + 0.25 * (t > 40.09 ? 1 - p(t, 40.09, 0.35) : 0) });
    const ko = pop(t, 40.45, 0.45); set(okb, { s: ko, o: t < 40.45 ? 0 : 1, r: -3 });
    set(arr, { o: t > 40.4 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9DFC6' });
  box(cam, 0, 0, 1080, 1920).innerHTML = villageSvg();
  const sign = mk(cam, [190, 560, 700, 520], `${cut('<rect x="300" y="120" width="40" height="400"/><path d="M20,40 L600,40 L680,140 L600,240 L20,240 Z"/>')}<rect x="300" y="120" width="40" height="400" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="300" y="120" width="40" height="400" fill="url(#hW)" opacity=".4"/><path d="M20,40 L600,40 L680,140 L600,240 L20,240 Z" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><path d="M20,40 L600,40 L680,140 L600,240 L20,240 Z" fill="url(#hW)" opacity=".3"/><path d="M36,58 L590,58 L656,140 L590,222 L36,222 Z" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="8 6"/><text x="330" y="168" text-anchor="middle" font-family="Rye" font-size="80" fill="${INK}">KINDERHOOK</text>`, '0 0 700 520', 'sign');
  sign.d.style.zIndex = 5;
  const av = box(cam, 90, 420, 190, 190, { borderRadius: '50%', overflow: 'hidden', background: YEL, border: `6px solid ${INK}`, boxShadow: `6px 6px 0 ${SH}`, zIndex: 6 });
  av.innerHTML = `<svg viewBox="70 70 220 220" width="100%" height="100%">${vbInner()}</svg>`;
  const avArr = box(cam, 0, 0, 1080, 1920, { zIndex: 6 }); avArr.innerHTML = arrowSvg('M290,520 Q380,530 420,610', PINK, 9);
  const pc = chip(cam, 620, 470, 'su pueblo', { size: 44, bg: PINK, z: 7 });
  const post = paperPiece(c, 140, 430, 800, 640, { seed: 61, bg: '#F6ECD4' });
  post.wrap.style.zIndex = 20;
  el('div', post.inner, { left: '0', top: '26px', width: '782px', textAlign: 'center', fontSize: '44px', color: RED, letterSpacing: '0.4em', fontFamily: 'Playfair' }, '★ ★ ★');
  const lineO = el('div', post.inner, { left: '0', top: '96px', width: '782px', textAlign: 'center', fontFamily: 'Rye', fontSize: '190px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `<span class="lo" style="display:inline-block">${hlSpan('O', 'hO')}</span>LD`);
  const lineK = el('div', post.inner, { left: '0', top: '300px', width: '782px', textAlign: 'center', fontFamily: 'Rye', fontSize: '88px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, `<span class="lk" style="display:inline-block">${hlSpan('K', 'hK')}</span>INDERHOOK`);
  el('div', post.inner, { left: '0', top: '440px', width: '782px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '34px', color: INK, whiteSpace: 'nowrap' }, '— Martin Van Buren —');
  el('div', post.inner, { left: '0', top: '520px', width: '782px', textAlign: 'center', fontSize: '44px', color: RED, letterSpacing: '0.4em', fontFamily: 'Playfair' }, '★ ★ ★');
  const hO = lineO.querySelector('.hO'), hK = lineK.querySelector('.hK'), lO = lineO.querySelector('.lo'), lK = lineK.querySelector('.lk');
  const okb = el('div', c, { left: '330px', top: '1090px', width: '420px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: '190px', color: INK, background: YEL, border: `6px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 10px 0 ${INK}`, zIndex: 30 }, 'O.K.');
  const arr = box(c, 0, 0, 1080, 1920, { zIndex: 29 }); arr.innerHTML = arrowSvg('M392,735 Q330,900 430,1080', PINK, 10);
  const arr2 = box(arr, 0, 0, 1080, 1920); arr2.innerHTML = arrowSvg('M240,880 Q250,1010 350,1100', PINK, 10);
}

/* ======================================================================
   L · LOS OK CLUBS (41.1 – 43.8)  L7a
   ====================================================================== */
headline(41.1, 43.8, 'Sus seguidores: los *OK Clubs*', { size: 82, hlT: 42.7 });
{
  const c = scene(41.1, 43.8, t => {
    FANS.forEach((f, i) => {
      set(f.d, { y: -Math.abs(Math.sin(t * 7 + i * 0.9)) * 18, x: Math.sin(t * 3.5 + i) * 6, s: pop(t, 41.3 + i * 0.1, 0.4), o: t < 41.3 + i * 0.1 ? 0 : 1 });
      face(f, t, { jaw: Math.max(0, Math.sin(t * 9 + i * 1.7)) * 0.7, look: [i < 2 ? 4 : -4, -3], brow: -4, seed: i });
    });
    PL.forEach((q, i) => set(q, { y: -Math.abs(Math.sin(t * 7 + i * 1.3)) * 22 + (1 - p(t, 41.6 + i * 0.15, 0.4, E.outBack)) * 600, r: Math.sin(t * 5 + i) * 5 }));
    stampA(st, t, 43.04, -7);
    set(cam, { s: 1.03 + 0.03 * Math.sin(t * 1.5) });
    HATS.forEach((h, i) => { const k = clamp((t - 43.1 - i * 0.07) / 0.7); set(h, { y: -Math.sin(k * Math.PI) * 260, r: k * 360 * (i % 2 ? 1 : -1), o: t > 43.1 && k < 1 ? 1 : 0 }); });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.10) 0 46px, transparent 46px 92px)' });
  box(cam, 0, 0, 1080, 300).innerHTML = `<svg width="1080" height="600" style="overflow:visible;position:absolute;top:0;left:0">${buntingSvg(1080, 440, 5)}</svg>`;
  const PL = [];
  [[110, 545, -4], [400, 515, 3], [690, 550, -2]].forEach(([x, y, r]) => {
    const d = box(cam, x, y, 290, 420, { zIndex: 4 });
    d.innerHTML = `<svg width="290" height="420" style="overflow:visible"><rect x="135" y="120" width="20" height="300" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>${cut('<rect x="0" y="0" width="290" height="140" rx="8"/>')}<rect x="0" y="0" width="290" height="140" rx="8" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/><rect x="10" y="10" width="270" height="120" rx="4" fill="none" stroke="${RED}" stroke-width="3"/><text x="145" y="70" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">O.K.</text><text x="145" y="114" text-anchor="middle" font-family="Rye" font-size="40" fill="${RED}">CLUB</text></svg>`;
    d.style.transform = `rotate(${r}deg)`; PL.push(d);
  });
  const FANS = [
    mk(cam, [100, 770, 230, 294], fanInner(61, 'brodie', '#4a3a2c'), '0 0 360 460', 'bust'),
    mk(cam, [300, 735, 240, 307], fanInner(62, 'cap', '#3a2f26'), '0 0 360 460', 'bust'),
    mk(cam, [500, 770, 230, 294], fanInner(63, 'slouch', '#5a4632'), '0 0 360 460', 'bust'),
    mk(cam, [700, 740, 235, 300], fanInner(64, undefined, '#2f241c'), '0 0 360 460', 'bust'),
  ];
  FANS.forEach(f => (f.d.style.zIndex = 5));
  const HATS = [[230, 760], [430, 720], [800, 730]].map(([x, y]) => { const h = box(cam, x, y, 90, 60, { zIndex: 6 }); h.innerHTML = `<svg viewBox="40 80 280 110" width="90" height="60" style="overflow:visible"><path d="M104,158 Q180,64 256,158 Z" fill="#3a2f26" stroke="${INK}" stroke-width="5"/><path d="M54,160 Q180,138 306,160 Q180,188 54,160 Z" fill="#3a2f26" stroke="${INK}" stroke-width="5"/></svg>`; return h; });
  const st = stamp(c, 220, 980, 'O.K. CLUB', { size: 100, bw: 14, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   M · GOLPE DE COLOR AMARILLO: «OK» EN TODO EL PAÍS (43.8 – 46.6)  L7b
   ====================================================================== */
colorHit(43.8, 46.6, YEL, c => {
  const mp = box(c, 80, 560, 920, 500, { zIndex: 3 });
  const path = usPath();
  mp.innerHTML = `<svg width="920" height="500" viewBox="0 0 920 500" style="overflow:visible"><path d="${path}" fill="#fff" stroke="#fff" stroke-width="22" stroke-linejoin="round" transform="translate(10,12)" opacity=".0"/><path d="${path}" fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/></svg>`;
  const bos = usPj(-71.06, 42.36);
  const pts = []; const r = rng(808);
  const POLY = USA.map(q => usPj(q[0], q[1]));
  const inside = (x, y) => { let ins = false; for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) { const [xi, yi] = POLY[i], [xj, yj] = POLY[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) ins = !ins; } return ins; };
  let guard = 0; while (pts.length < 20 && guard++ < 2000) { const lo = -122 + r() * 52, la = 28 + r() * 20; const [x, y] = usPj(lo, la); if (inside(x, y) && inside(x - 40, y) && inside(x + 40, y) && pts.every(q => Math.hypot(q[0] - x, q[1] - y) > 110)) pts.push([x, y]); }
  const OKS = pts.map(([x, y]) => {
    const d = Math.hypot(x - bos[0], y - bos[1]);
    const e = el('div', c, { left: px(80 + x - 44), top: px(560 + y - 26), width: '88px', height: '52px', background: '#fff', border: `4px solid ${INK}`, borderRadius: '26px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', lineHeight: '44px', textAlign: 'center', color: INK, zIndex: 5 }, 'OK');
    return { e, t: 43.95 + d / 820 * 1.05 };
  });
  const bDot = box(c, 80 + bos[0] - 22, 560 + bos[1] - 22, 44, 44, { borderRadius: '50%', background: RED, border: `5px solid #fff`, zIndex: 6 });
  const bLbl = chip(c, 80 + bos[0] - 220, 560 + bos[1] - 120, 'Boston', { size: 34, bg: INK, color: '#fff', z: 7 });
  const top = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, zIndex: 8 }, 'Famosa en');
  const big = el('div', c, { left: 0, top: '560px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '420px', lineHeight: '440px', color: '#fff', textShadow: `14px 14px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 9 }, 'OK');
  const bot = el('div', c, { left: 0, top: '1130px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '100px', lineHeight: 1, color: INK, zIndex: 8 }, '¡TODO EL PAÍS!');
  return t => {
    OKS.forEach(q => set(q.e, { s: pop(t, q.t, 0.3) * (t > 45.0 ? 0.8 : 1), o: t < q.t ? 0 : 1 }));
    set(bDot, { s: 1 + 0.25 * Math.abs(Math.sin(t * 8)), o: 1 }); popA(bLbl, t, 43.85, { r: -3 });
    set(mp, { s: 1 + 0.03 * p(t, 43.8, 2.8, E.linear) });
    set(top, { s: pop(t, 44.8, 0.35), o: t < 44.8 ? 0 : 1 });
    const kb = p(t, 45.05, 0.22, E.outBack); set(big, { s: t < 45.05 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < 45.05 ? 0 : 1 }); big.style.textShadow = (glitch(t, 45.05, 0.3) ? glitch(t, 45.05, 0.3) + ', ' : '') + `14px 14px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    stampA(bot, t, 45.63, -3);
  };
});

/* ======================================================================
   N/P · TABLÓN DE TEORÍAS (46.6 – 49.85 y 55.25 – 57.75)  L8
   ====================================================================== */
function mkBoard(c) {
  const bd = box(c, 80, 450, 860, 600, { zIndex: 3 });
  bd.innerHTML = `<svg width="860" height="600" style="overflow:visible">${cut('<rect x="0" y="0" width="860" height="600" rx="14"/>')}<rect x="0" y="0" width="860" height="600" rx="14" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="24" y="24" width="812" height="552" rx="6" fill="#C9A27A" stroke="${INK}" stroke-width="4"/><rect x="24" y="24" width="812" height="552" fill="url(#hP)"/></svg>`;
  const POS = [[60, 50, -4], [450, 66, 3], [70, 320, 2], [460, 310, -3]];
  const cards = POS.map(([x, y, r], i) => {
    const w = box(bd, x, y, 340, 230, { zIndex: 4 });
    const front = box(w, 0, 0, 340, 230, { background: '#FBF6EA', border: `4px solid ${INK}`, boxShadow: `6px 7px 0 ${SH}` });
    el('div', front, { left: '0', top: '8px', width: '332px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'otra teoría');
    el('div', front, { left: '0', top: '40px', width: '332px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1.1, color: PINK, textShadow: `4px 4px 0 ${INK}` }, '?');
    const back = box(w, 0, 0, 340, 230, { background: '#FFF7C2', border: `4px solid ${INK}`, boxShadow: `6px 7px 0 ${SH}` });
    el('div', back, { left: '0', top: '22px', width: '332px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '52px', color: INK, whiteSpace: 'nowrap' }, '«oll korrect»');
    el('div', back, { left: '0', top: '96px', width: '332px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK }, '= O.K.');
    back.style.display = 'none';
    box(w, 150, -14, 36, 36, { borderRadius: '50%', background: RED, border: `4px solid ${INK}`, zIndex: 3 });
    const x2 = box(w, 50, 0, 240, 230, { zIndex: 5 }); x2.innerHTML = XSVG;
    return { w, front, back, x: x2, r, i };
  });
  const str = box(bd, 0, 0, 860, 600, { zIndex: 6 });
  str.innerHTML = `<svg width="860" height="600" style="overflow:visible"><path d="M228,54 L618,70 L238,324 L628,314" stroke="${RED}" stroke-width="4" fill="none"/></svg>`;
  return { bd, cards, str };
}
headline(46.6, 49.85, 'Durante años: *otras teorías*', { size: 82, hlT: 48.34 });
{
  const c = scene(46.6, 49.85, t => {
    B.cards.forEach((q, i) => { const t0 = 48.34 + i * 0.16; set(q.w, { s: pop(t, t0, 0.4), r: q.r, o: t < t0 ? 0 : 1 }); q.x.style.display = 'none'; set(q.front, { r: wobble(t, 0.6, 1, i) }); });
    B.str.style.opacity = t > 48.9 ? 1 : 0;
    // ¡OJO! grande → etiqueta
    const kt = p(t, 47.3, 0.35, E.inOutCubic);
    const k0 = p(t, 46.74, 0.18, E.outCubic);
    set(ojo, { s: t < 46.74 ? 0 : lerp(lerp(2.4, 1, k0), 0.42, kt), x: kt * -370, y: kt * -175, r: -10, o: t < 46.74 ? 0 : 1 });
    popA(yrs, t, 47.55, { r: 3 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const B = mkBoard(c);
  const ojo = stamp(c, 150, 600, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const yrs = chip(c, 600, 1090, 'durante años', { size: 40, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   O · EL LINGÜISTA Y EL ARCHIVO (49.85 – 55.25)  L8b
   ====================================================================== */
headline(49.85, 52.5, 'Un lingüista: *Allen Walker Read*', { size: 76, hlT: 51.19 });
headline(52.5, 55.25, 'Rastreó los *periódicos* de la época', { size: 78, hlT: 53.08 });
{
  const c = scene(49.85, 55.25, t => {
    const found = t >= 54.31;
    face(ling, t, { look: found ? [5, -4] : [6, 2], brow: found ? -10 : t > 51.0 && t < 51.8 ? -6 : 0, jaw: found && t < 54.9 ? 0.6 : 0, seed: 0.7 });
    set(ling.d, { y: wobble(t, 0.6, 3), r: found ? -2 : 0 });
    popA(cL, t, 50.45, { r: -4 }); popA(cN, t, 51.19, { r: 2 });
    // lupa rastreando
    let lx, ly;
    if (t < 52.6) { lx = 560; ly = 760; }
    else if (!found) { const k = (t - 52.6); lx = 650 + Math.sin(k * 3.4) * 190; ly = 760 + Math.sin(k * 5.1) * 150 + k * 20; }
    else { const k = p(t, 54.31, 0.25, E.outBack); lx = lerp(650 + Math.sin(1.71 * 3.4) * 190, 600, k); ly = lerp(760 + Math.sin(1.71 * 5.1) * 150 + 34, 820, k); }
    set(lens, { x: lx - 150, y: ly - 150, s: pop(t, 52.5, 0.35) * (found ? 1 + 0.1 * (1 - p(t, 54.31, 0.4)) : 1), r: -6, o: t < 52.5 ? 0 : 1 });
    lFound.style.opacity = found ? 1 : 0; lLines.style.transform = `translateY(${f1(-((t * 120) % 46))}px)`;
    const kp = p(t, 54.25, 0.3, E.outBack); set(fp, { x: kp * -80, y: kp * -40, r: lerp(0, -8, kp) });
    popA(este, t, 54.81, { r: -6 });
  });
  sceneBg(c, { background: '#DCCBA8', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.18) 0 6px, transparent 6px 150px)' });
  const shelves = box(c, 0, 0, 1080, 1920, { zIndex: 1 });
  let s = ''; const r = rng(52);
  [[470, 640, 160], [650, 780, 150], [810, 600, 130]].forEach(([x, y0, w], j) => {
    for (let y = 1150; y > y0; y -= 22) { const dx = (r() - 0.5) * 16; s += `<rect x="${f1(x + dx)}" y="${y - 20}" width="${w}" height="20" fill="${['#F4ECDA', '#EADFC8', '#F0E4CC'][(y / 22 | 0) % 3]}" stroke="${INK}" stroke-width="3"/><path d="M${f1(x + dx + 10)},${y - 10} h${w - 40}" stroke="${INK}" stroke-width="2" opacity=".35"/>`; }
  });
  shelves.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="430" y="1150" width="520" height="30" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>${s}</svg>`;
  const fp = box(c, 650, 880, 220, 150, { zIndex: 4 });
  fp.innerHTML = `<svg width="220" height="150" style="overflow:visible">${cut('<rect x="0" y="0" width="220" height="150"/>', 4, 5)}<rect x="0" y="0" width="220" height="150" fill="#F4ECDA" stroke="${INK}" stroke-width="3"/><text x="110" y="34" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="22" fill="${INK}">MORNING POST</text><path d="M14,46 H206 M14,62 H190 M14,78 H200 M14,94 H150 M14,110 H206 M14,126 H180" stroke="${INK}" stroke-width="5" opacity=".4"/></svg>`;
  const ling = mk(c, [70, 600, 380, 486], lingInner(), '0 0 360 460', 'bust'); ling.d.style.zIndex = 5;
  const cL = chip(c, 300, 560, 'lingüista', { size: 38, bg: PINK, z: 20 });
  const cN = chip(c, 90, 440, 'Allen Walker Read', { size: 52, bg: INK, color: YEL, z: 20 });
  const lens = box(c, 0, 0, 300, 300, { zIndex: 30 });
  lens.innerHTML = `<svg width="300" height="400" style="overflow:visible;position:absolute;left:0;top:0"><path d="M246,246 L330,350" stroke="${INK}" stroke-width="36" stroke-linecap="round"/><path d="M246,246 L330,350" stroke="${WOOD}" stroke-width="24" stroke-linecap="round"/><circle cx="150" cy="150" r="146" fill="${INK}"/><circle cx="150" cy="150" r="138" fill="${BRASS}"/><circle cx="150" cy="150" r="124" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/></svg>`;
  const lIn = box(lens, 26, 26, 248, 248, { borderRadius: '50%', overflow: 'hidden' });
  const lLines = box(lIn, 0, 0, 248, 340, { backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 30px, rgba(43,33,24,.3) 30px 46px)' });
  const lFound = el('div', lIn, { left: 0, top: 0, width: '248px', height: '248px', background: '#FBF6EA', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', lineHeight: '248px', color: INK }, hlSpan('O.K.', 'x'));
  lFound.querySelector('.x').style.transform = 'scaleX(1) rotate(-1.2deg)';
  box(lens, 50, 40, 90, 44, { borderRadius: '50%', background: 'rgba(255,255,255,.55)', transform: 'rotate(-30deg)' });
  const este = chip(c, 690, 1060, '¡este!', { size: 56, bg: PINK, z: 35 });
}
headline(55.25, 57.75, 'Hoy: la explicación *más aceptada*', { size: 82, hlT: 56.83 });
{
  const c = scene(55.25, 57.75, t => {
    B.cards.forEach((q, i) => {
      if (i < 3) { set(q.w, { r: q.r, s: 1, o: 1 - 0.45 * p(t, 56.18, 0.3) }); q.x.style.display = ''; set(q.x, { s: t < 55.33 + i * 0.15 ? 0 : lerp(1.7, 1, p(t, 55.33 + i * 0.15, 0.14)), o: t < 55.33 + i * 0.15 ? 0 : 1 }); return; }
      const kf = p(t, 55.85, 0.3, E.inOutCubic), sx = Math.cos(kf * Math.PI);
      q.front.style.display = sx > 0 ? '' : 'none'; q.back.style.display = sx > 0 ? 'none' : '';
      q.x.style.display = 'none';
      const kg = p(t, 56.18, 0.45, E.outBack);
      set(q.w, { sx: Math.max(0.02, Math.abs(sx)), s: lerp(1, 1.45, kg), x: lerp(0, -200, kg), y: lerp(0, -160, kg), r: lerp(q.r, -2, kg), o: 1 });
      q.w.style.zIndex = 20;
    });
    B.str.style.opacity = 1 - p(t, 56.1, 0.2);
    popA(ck, t, 56.4, { r: -6 });
    stampA(acc, t, 56.83, -6);
    set(ojoS, { s: 0.42, x: -370, y: -175, r: -10, o: 1 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const B = mkBoard(c);
  const ojoS = stamp(c, 150, 600, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const ck = box(c, 760, 560, 170, 170, { zIndex: 40 }); ck.innerHTML = CHECK;
  const acc = stamp(c, 170, 1060, 'LA MÁS ACEPTADA', { size: 62, bw: 12, z: 50, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   Q · EL MÓVIL: «ok» VEINTE VECES AL DÍA (57.75 – 61.4)  L9a
   ====================================================================== */
headline(57.75, 61.4, 'La palabra que usas *veinte veces al día*', { size: 78, hlT: 59.77 });
{
  const N = 20, T0 = 58.4, DT = 0.09, BH = 66;
  const c = scene(57.75, 61.4, t => {
    const n = t < T0 ? 0 : Math.min(N, Math.floor((t - T0) / DT) + 1);
    BUB.forEach((b, i) => { const tb = T0 + i * DT; set(b, { s: i < n ? pop(t, tb, 0.25) : 0, o: i < n ? 1 : 0 }); });
    const total = n * BH, visH = 560;
    const kk = n > 0 ? p(t, T0 + (n - 1) * DT, 0.12) : 0;
    const scroll = Math.max(0, (n - 1 + kk) * BH - visH + BH);
    set(col, { y: -scroll });
    void total;
    set(ph, { r: -3 + (t > 58.4 && t < 61.1 ? Math.sin(t * 40) * 0.8 : 0), y: wobble(t, 0.5, 4) });
    cntN.textContent = '×' + n;
    const done = T0 + (N - 1) * DT;
    set(badge, { s: pop(t, T0, 0.35) * (1 + (t > done ? 0.25 * (1 - p(t, done, 0.4)) : 0.05 * Math.abs(Math.sin(t * 9)))), r: 8, o: t < T0 ? 0 : 1 });
    badge.style.background = t > done ? YEL : PINK;
    popA(dia, t, 60.72, { r: -4 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const ph = box(c, 330, 450, 420, 840, { zIndex: 3 });
  ph.innerHTML = `<svg width="420" height="840" style="overflow:visible;position:absolute;left:0;top:0">${cut('<rect x="0" y="0" width="420" height="840" rx="64"/>')}<rect x="0" y="0" width="420" height="840" rx="64" fill="#3a2f26" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="420" height="840" rx="64" fill="url(#hD)" opacity=".5"/><rect x="26" y="70" width="368" height="700" rx="20" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><rect x="160" y="30" width="100" height="16" rx="8" fill="${INK}"/><circle cx="210" cy="806" r="18" fill="none" stroke="${FIG}" stroke-width="4"/><path d="M14,120 v60 M406,150 v90" stroke="${INK}" stroke-width="6"/></svg>`;
  const hd = box(ph, 26, 70, 368, 86, { background: INK, borderRadius: '20px 20px 0 0', zIndex: 2 });
  avatar(hd, 14, 10, 64, 'FAR', { bw: 3, bg: YEL });
  el('div', hd, { left: '92px', top: '22px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '32px', color: '#fff', whiteSpace: 'nowrap' }, 'Tú, hoy');
  const scr = box(ph, 26, 156, 368, 614, { overflow: 'hidden', zIndex: 1, borderRadius: '0 0 20px 20px' });
  const col = box(scr, 0, 24, 368, N * BH);
  const words = ['ok', 'OK', 'ok!', 'okk', 'ok 👌', 'ok', 'OK!', 'ok', 'okis', 'ok 👍'];
  const BUB = [];
  for (let i = 0; i < N; i++) {
    const me = i % 3 !== 1;
    const b = el('div', col, { left: me ? 'auto' : '18px', right: me ? '18px' : 'auto', top: px(i * BH), background: me ? '#FFE9A8' : '#fff', border: `3px solid ${INK}`, borderRadius: me ? '24px 24px 6px 24px' : '24px 24px 24px 6px', padding: '4px 22px 6px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: INK, whiteSpace: 'nowrap', boxShadow: `3px 3px 0 ${SH}` }, words[i % words.length]);
    BUB.push(b);
  }
  const badge = box(c, 700, 410, 210, 210, { borderRadius: '50%', background: PINK, border: `6px solid ${INK}`, boxShadow: `7px 7px 0 ${INK}`, zIndex: 10 });
  const cntN = el('div', badge, { left: 0, top: '38px', width: '198px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: '#fff', textShadow: `4px 4px 0 ${INK}` }, '×0');
  el('div', badge, { left: 0, top: '134px', width: '198px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '28px', color: INK }, 'veces');
  const dia = chip(c, 650, 1150, 'al día', { size: 50, bg: INK, color: YEL, z: 12 });
}

/* ======================================================================
   R · GOLPE DE COLOR ROSA: FALTA DE ORTOGRAFÍA DE HACE CASI 200 AÑOS (61.4 – 65.3)  L9b
   ====================================================================== */
colorHit(61.4, 65.3, PINK, c => {
  const l1 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '90px', color: INK, zIndex: 5 }, '…es una');
  const st = stamp(c, 140, 400, '¡FALTA DE<br>ORTOGRAFÍA!', { size: 100, bw: 15, z: 6, bg: 'rgba(255,255,255,.94)', blend: 'normal' }); st.style.textAlign = 'center'; st.style.lineHeight = '1.02';
  const l3 = el('div', c, { left: 0, top: '720px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, zIndex: 5 }, 'de hace casi');
  const n = el('div', c, { left: 0, top: '820px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', lineHeight: '240px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 5 }, '0');
  const yrs = el('div', c, { left: 0, top: '1060px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '96px', color: INK, zIndex: 5 }, 'AÑOS');
  const so = mkSort(c, [90, 1040, 170, 266], 'O'), sk = mkSort(c, [760, 1030, 170, 266], 'K');
  [so, sk].forEach(f => { f.d.style.filter = SIL; f.d.style.zIndex = 4; });
  const ph = box(c, 0, 0, 1, 1); void ph;
  return t => {
    popA(l1, t, 61.45, { rise: 30 });
    const k0 = p(t, 62.4, 0.17, E.outCubic); set(st, { s: t < 62.4 ? 0 : lerp(2.2, 1, k0), r: -6, o: t < 62.4 ? 0 : 1 }); st.style.textShadow = glitch(t, 62.4, 0.25);
    popA(l3, t, 63.36, { rise: 30 });
    const v = Math.round(counter(t, 64.06, 0.6, 0, 200)); n.textContent = v; set(n, { s: pop(t, 64.0, 0.3) * (1 + (t > 64.66 ? 0.12 * (1 - p(t, 64.66, 0.3)) : 0)), o: t < 64.0 ? 0 : 1 });
    popA(yrs, t, 64.72, { r: -2 });
    [so, sk].forEach((f, i) => { set(f.d, { y: -Math.abs(Math.sin(t * 6 + i)) * 30, r: Math.sin(t * 5 + i) * 6 }); sortFace(f, t, { aL: 40 + Math.sin(t * 10) * 20, aR: 40 + Math.cos(t * 10) * 20, open: 0.5 }); });
  };
});

/* ======================================================================
   S · CTA: ¿QUÉ OTRA PALABRA? (65.3 – 68.15)  L10 — El Vecino a pantalla completa
   ====================================================================== */
headline(65.3, 67.1, '¿Qué otra *palabra* investigo?', { size: 80, hlT: 65.76 });
headline(67.1, 68.15, 'Os leo en *comentarios*', { size: 88, hlT: 67.57 });
{
  const CM = [];
  const c = scene(65.3, 68.15, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 65.3, 2.9, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < 66.4 ? [0, 0] : [-4, 6], bL: t > 65.7 && t < 66.3 ? 10 : 2, bR: t > 65.7 && t < 66.3 ? 14 : 6, noCup: true, fan: t > 67.1 ? Math.sin(t * 12) * 10 : wobble(t, 0.8, 5), seed: 2 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(qm, { o: t > 65.4 ? 1 : 0, y: Math.sin(t * 6) * 8, r: 10, s: pop(t, 65.4, 0.3) });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [160, 400, 640, 792]);
  const qm = el('div', c, { left: '770px', top: '460px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', color: YEL, textShadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, zIndex: 20 }, '?');
  const cms = [['FAR', '@lola_lee', '¡Haz «guay»!', 66.4], ['SOL', '@pepe_tipos', 'ok 👌', 66.95], ['MEREDITH', '@marta.vale', '¿Y el «vale»?', 67.5]];
  cms.forEach((m, i) => {
    const e = box(c, 270 + (i % 2) * 30, 920 + i * 116, 620, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 78, m[0], { bw: 3 });
    el('div', e, { left: '104px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '104px', top: '38px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   T · Y ESTO… NO VENÍA EN EL LIBRO (68.15 – 70.85)  L11
   ====================================================================== */
headline(68.15, 69.82, 'Y esto…', { size: 130, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(69.82, 70.85, '…no venía en el *libro.*', { size: 86, hlT: 70.41 });
{
  const c = scene(68.15, 69.82, t => {
    const k = p(t, 68.15, 1.6, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const TC = 70.05;
  const c = scene(69.82, 70.85, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    sortFace(stand, t, { look: t > 69.95 ? [6, -6] : [-3, 2], open: t > 69.95 ? 0.6 : 0, bL: 12, bR: 12, aL: t > 69.95 ? 90 : 10, aR: t > 69.95 ? 90 : 10, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, 69.83, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    lets.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 130 * kf, y: -kf * 220 + kf * kf * 170, r: Math.sin(t * 4 + i) * 40, o: closed ? 1 : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">PALABRAS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de siempre</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkSort(bookW, [640, 520, 220, 345], 'K'); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const lets = ['O', '.', 'K', '.'].map(ch => el('div', bookW, { left: '510px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', color: INK, textShadow: `3px 3px 0 #fff`, zIndex: 3 }, ch));
}

/* ======================================================================
   TARJETA FINAL (70.85 – fin) — logo con El Vecino en su óvalo
   ====================================================================== */
{
  const c = scene(70.85, 999, t => {
    set(lt, { s: pop(t, 71.1, 0.45), o: t < 71.1 ? 0 : 1 }); paint(lhl, t, 71.4, 0.4);
    popA(ttl, t, 71.55, { r: -1 }); popA(src, t, 71.8, { rise: 30 });
    [so, sk].forEach((f, i) => { const t0 = 72.0 + i * 0.15; set(f.d, { x: (1 - p(t, t0, 0.45, E.outBack)) * (i ? 400 : -400), y: wobble(t, 0.6, 4, i), r: (i ? -8 : 8) + wobble(t, 0.5, 2, i) }); sortFace(f, t, { look: [i ? -5 : 5, -3], aL: i ? 10 : 60 + Math.sin(t * 6) * 20, aR: i ? 60 + Math.sin(t * 6) * 20 : 10, seed: i }); });
  });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const lt = box(c, 40, 840, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1090px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 7 · El origen de OK');
  const src = el('div', c, { left: '90px', top: '1215px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '29px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: Boston Morning Post (1839) · Allen Walker Read, estudios sobre el origen de OK');
  const so = mkSort(c, [50, 440, 180, 282], 'O'), sk = mkSort(c, [830, 420, 180, 282], 'K');
}
