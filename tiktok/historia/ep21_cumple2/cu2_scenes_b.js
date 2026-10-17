/* Ep. 21 · escenas L5–L10 (resultado, restaurantes, juez, de todos, ojo + emú, factura, remate, pregunta, balcón, libro) */

/* ======================================================================
   E1 · «RESULTADO: ¿SALÍA EN UNA PELI O EN UN ANUNCIO? A PAGAR.»
   ====================================================================== */
headline(K.salia - 0.1, S.E1[1], '¿Peli o anuncio? *A pagar*', { size: 92, hlT: K.pagar });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    // la cinta «RESULTADO:» entra YA con la película y la tele detrás, y sube a la cabecera
    const kr = p(t, S.E1[0], 0.3, E.outBack), kro = p(t, K.salia - 0.15, 0.35, E.inOutCubic);
    set(rib, { sx: kr, y: -kro * 1000, r: -2 - kro * 8, o: 1 - kro });
    set(fs, { s: lerp(0.9, 1, p(t, S.E1[0], 0.3)) * (1 + 0.08 * pop(t, K.peli, 0.3) * (1 - p(t, K.peli + 0.3, 0.3))), r: -5 + wobble(t, 0.5, 1), o: 1 });
    FF.forEach((f, i) => { set(f, { y: Math.sin(t * 9 + i) * 4 }); });
    set(tv, { s: lerp(0.9, 1, p(t, S.E1[0], 0.3)) * (1 + 0.08 * pop(t, K.anuncio, 0.3) * (1 - p(t, K.anuncio + 0.3, 0.3))), r: 4 + wobble(t, 0.5, 1, 1), o: 1 });
    flick(tvc, t); set(adl, { s: 1 + 0.08 * Math.sin(t * 8) });
    set(reg.d, { s: pop(t, K.pagar - 0.3, 0.4), r: (t > K.pagar + 0.1 && t < K.pagar + 0.7 ? Math.sin(t * 50) * 2 : 0), o: t < K.pagar - 0.3 ? 0 : 1 });
    reg.drawer.setAttribute('transform', `translate(0 ${f1(p(t, K.pagar, 0.25, E.outBack) * 34)})`);
    reg.disp.textContent = t > K.pagar ? '$ $' : '$ ?';
    COINS.forEach(q => { const k = clamp((t - q.t0) / 0.75); set(q.e, { x: q.dx * k, y: -260 + 560 * k * k, r: q.rr * k, o: t < q.t0 || k >= 1 ? 0 : 1 }); });
    set(pl, { s: pop(t, K.peli, 0.3), r: -4, o: t < K.peli ? 0 : 1 });
    set(an, { s: pop(t, K.anuncio, 0.3), r: 4, o: t < K.anuncio ? 0 : 1 });
    stampA(dp, t, K.pagar + 0.05, -9, 1);
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const rib = box(c, 40, 620, 1000, 330, { zIndex: 30 });
  rib.innerHTML = `<svg width="1000" height="330" style="overflow:visible">${cut('<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z"/>')}<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,60 H960 M40,270 H960" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/></svg>`;
  el('div', rib, { left: '0', top: '104px', width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: '120px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `5px 5px 0 ${INK}` }, 'RESULTADO:');
  const fs = filmStrip(c, 60, 590, 440, 330, 6);
  const FF = [0, 1, 2].map(i => { const fr = box(fs, 14 + i * 140, 44, 128, 226, { background: '#F4ECDB', border: `3px solid ${INK}`, overflow: 'hidden' }); const n = box(fr, 20, 40, 88, 110); n.innerHTML = noteSvg(i % 2, [INK, RED, INK][i]); box(fr, 10, 160, 108, 50, { background: CREAM2, border: `3px solid ${INK}`, borderRadius: '8px 8px 4px 4px' }); return fr; });
  const tv = box(c, 530, 570, 400, 381, { zIndex: 6 }); tv.innerHTML = tvSvg();
  const scr = box(tv, 36, 36, 252, 254, { borderRadius: '36px', overflow: 'hidden', background: '#F4ECDB' });
  const tvc = mkCake(scr, [30, 70, 190, 203]);
  const adl = el('div', scr, { left: '20px', top: '10px', width: '212px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: RED, whiteSpace: 'nowrap' }, 'ANUNCIO');
  const pl = chip(c, 150, 950, 'peli', { size: 56, bg: PINK, z: 20 });
  const an = chip(c, 650, 960, 'anuncio', { size: 56, bg: PINK, z: 20 });
  const reg = mkReg(c, [420, 990, 290, 304]); reg.d.style.zIndex = 10;
  const r = rng(77); const COINS = [];
  for (let i = 0; i < 12; i++) { const e = box(c, 300 + r() * 420, 840, 90, 90, { zIndex: 12 }); e.innerHTML = dollarSvg(); COINS.push({ e, t0: K.pagar - 0.1 + i * 0.07, dx: (r() - 0.5) * 120, rr: (r() - 0.5) * 600 }); }
  const dp = stamp(c, 330, 1080, 'DE PAGO', { size: 120, bw: 14, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   E2 · «Y HUBO RESTAURANTES QUE SE INVENTARON OTRA CANCIÓN PARA NO SOLTAR NI UN DÓLAR»
   ====================================================================== */
headline(S.E2[0], K.inventaron - 0.1, 'Y hubo *restaurantes*…', { size: 94, hlT: K.restaurantes });
headline(K.inventaron - 0.1, K.para6 - 0.08, '…con *otra* canción', { size: 104, hlT: K.otra });
headline(K.para6 - 0.08, S.E2[1], 'Para no soltar *ni un dólar*', { size: 92, hlT: K.dolar });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(aw, { sy: p(t, S.E2[0], 0.35, E.outBack) });
    WT.forEach((f, i) => { const t0 = S.E2[0] + 0.15 + i * 0.12; const sing = t > K.inventaron && t < K.para6; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.6, 3, i) - (sing ? Math.abs(Math.sin(t * 7 + i * 1.5)) * 14 : 0), r: [5, -5][i], o: t < t0 ? 0 : 1 }); face(f, t, { jaw: sing ? 0.35 + 0.3 * Math.sin(t * 13 + i) : 0, closed: sing && Math.sin(t * 3) > 0, look: t > K.para6 ? [[8, 2], [-8, 2]][i] : [[6, 0], [-6, 0]][i], half: t > K.soltar, seed: i }); });
    set(ck.d, { y: -(1 - p(t, S.E2[0] + 0.3, 0.45, E.outBounce)) * 900 + Math.sin(t * 7) * 6 }); flick(ck, t);
    set(bub, { s: pop(t, K.inventaron, 0.35), r: -3 + Math.sin(t * 4) * 2, o: t < K.inventaron ? 0 : 1 });
    popA(inv, t, K.cancion6, { r: -4 });
    updNotes(NT, t, 360, t > K.inventaron && t < K.para6 + 0.4 ? 1 : 0);
    // la mano agarra el dólar y no lo suelta
    const kg = p(t, K.soltar - 0.1, 0.3, E.outBack);
    set(co, { s: pop(t, K.para6, 0.35), r: Math.sin(t * 6) * 8, y: t > K.dolar ? Math.sin(t * 40) * 4 : 0, o: t < K.para6 ? 0 : 1 });
    set(gr, { y: (1 - kg) * 300, o: t < K.soltar - 0.1 ? 0 : 1, r: 180 + Math.sin(t * 30) * (t > K.dolar ? 3 : 0) });
    set(cx, { s: t < K.dolar ? 0 : lerp(1.7, 1, p(t, K.dolar, 0.15)), o: t < K.dolar ? 0 : 1 });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.08) 0 40px, transparent 40px 80px)' });
  const aw = box(c, 40, 420, 1000, 120, { zIndex: 3, transformOrigin: '50% 0' });
  { let sc = ''; for (let k = 0; k < 10; k++) sc += `<path d="M${k * 100},20 H${k * 100 + 100} V90 Q${k * 100 + 50},130 ${k * 100},90 Z" fill="${k % 2 ? '#fff' : RED}" stroke="${INK}" stroke-width="4"/>`; aw.innerHTML = `<svg width="1000" height="140" style="overflow:visible"><rect x="-10" y="0" width="1020" height="24" fill="${INK}"/>${sc}</svg>`; }
  const WT = [mkB(c, [60, 720, 320, 409], waiterInner(61, 0)), mkB(c, [600, 720, 320, 409], waiterInner(62, 1))];
  WT.forEach(f => f.d.style.zIndex = 5);
  const ck = mkCake(c, [360, 860, 340, 363]); ck.d.style.zIndex = 8;
  const bub = bubble(c, 170, 580, '♪ ¡Otra canción! ♪', { size: 64, it: true, z: 30, rad: '44px 44px 10px 44px' });
  const inv = chip(c, 400, 1240, 'canción inventada', { size: 46, bg: PINK, z: 30 });
  const NT = riseNotes(c, 5, 520, 860, 600, 51, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 9 });
  const co = box(c, 730, 1040, 190, 190, { zIndex: 30 }); co.innerHTML = dollarSvg();
  const gr = handBox(c, 760, 1150, 170, 0, 31);
  const cx = box(co, -10, -10, 210, 210, { zIndex: 2 }); cx.innerHTML = XSVG;
}

/* ======================================================================
   F1 · «HASTA QUE EN 2015 UN JUEZ DE ESTADOS UNIDOS DIJO: ESOS DERECHOS NO VALEN»
   ====================================================================== */
headline(S.F1[0], K.derechos7 - 0.1, 'Un *juez* de Estados Unidos…', { size: 84, hlT: K.juez });
headline(K.derechos7 - 0.1, S.F1[1], 'Esos derechos *no valen*', { size: 96, hlT: K.valen, hlc: '#ff9aa8' });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    set(yr, { s: t < K.d15 ? 0 : lerp(1.8, 1, p(t, K.d15, 0.18, E.outCubic)), r: -5, o: t < K.d15 ? 0 : 1 });
    set(jd.d, { y: (1 - p(t, S.F1[0], 0.4, E.outBack)) * 700 + wobble(t, 0.6, 3), s: 1 + 0.04 * p(t, K.dijo7, 0.2) * (1 - p(t, K.dijo7 + 0.3, 0.3)) });
    face(jd, t, { look: t > K.derechos7 ? [-8, 6] : [0, 0], bL: t > K.dijo7 ? -4 : 8, bR: t > K.dijo7 ? -4 : 8, jaw: talkW(t, 'VECINO') * 0.5 * (t > K.dijo7 ? 1 : 0), seed: 1.5 });
    popA(us, t, K.eeuu7, { r: 4 });
    const hit = tt => { const a = p(t, tt - 0.35, 0.25, E.outCubic), b = p(t, tt - 0.08, 0.08, E.inCubic); return -40 * a * (1 - b); };
    set(gv, { r: hit(K.dijo7) + hit(K.valen), y: 0 });
    const on = (t > K.dijo7 && t < K.dijo7 + 0.35) || (t > K.valen && t < K.valen + 0.35);
    set(boom, { s: on ? 1 + p(t, t > K.valen ? K.valen : K.dijo7, 0.3) * 0.4 : 0, o: on ? 1 : 0 });
    set(doc.wrap, { r: -4 + wobble(t, 0.5, 0.5), y: (1 - p(t, K.derechos7 - 0.3, 0.35, E.outBack)) * 500, o: t < K.derechos7 - 0.3 ? 0 : 1 });
    stampA(nv, t, K.valen, -10, 1);
  });
  sceneBg(c, { background: '#d9c7a6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 120px)' });
  const cnp = box(c, 260, 430, 560, 200, { zIndex: 1 });
  cnp.innerHTML = `<svg width="560" height="220" style="overflow:visible"><path d="M0,0 H560 V120 Q420,200 280,130 Q140,200 0,120 Z" fill="#6b1d24" stroke="${INK}" stroke-width="5"/><path d="M0,0 H560 V120 Q420,200 280,130 Q140,200 0,120 Z" fill="url(#hB)" opacity=".4"/><circle cx="280" cy="60" r="40" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M260,48 h40 M280,40 v44 M258,70 l-10,16 h24 Z M302,70 l-10,16 h24 Z" stroke="${INK}" stroke-width="4" fill="none"/></svg>`;
  const jd = mkB(c, [300, 520, 480, 614], judgeInner(55)); jd.d.style.zIndex = 4;
  const bench = box(c, 70, 960, 940, 300, { zIndex: 6 });
  bench.innerHTML = `<svg width="940" height="300" style="overflow:visible">${cut('<rect x="0" y="0" width="940" height="290" rx="10"/>')}<rect x="0" y="0" width="940" height="290" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="940" height="290" rx="10" fill="url(#hW)" opacity=".35"/><rect x="-20" y="-10" width="980" height="34" rx="6" fill="#7a4a26" stroke="${INK}" stroke-width="5"/><rect x="60" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><rect x="350" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><rect x="640" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/></svg>`;
  const gv = box(c, 640, 760, 280, 228, { zIndex: 9, transformOrigin: '250px 220px' }); gv.innerHTML = gavelSvg();
  box(c, 640, 950, 200, 40, { zIndex: 8, background: '#7a4a26', border: `5px solid ${INK}`, borderRadius: '10px' });
  const boom = el('div', c, { left: '560px', top: '880px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '90px', color: RED, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 #fff`, zIndex: 12 }, '¡PUM!');
  const yr = el('div', c, { left: '70px', top: '440px', fontFamily: 'Rye', fontSize: '150px', lineHeight: '160px', color: YEL, textShadow: `8px 8px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 20 }, '2015');
  const us = chip(c, 700, 660, 'juez de EE. UU.', { size: 46, bg: INK, color: YEL, z: 30 });
  const doc = paperPiece(c, 330, 870, 420, 300, { seed: 61, bg: '#FBF6EA' }); doc.wrap.style.zIndex = 10;
  el('div', doc.inner, { left: '0', top: '22px', width: '402px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK, whiteSpace: 'nowrap' }, 'DERECHOS ©');
  el('div', doc.inner, { left: '0', top: '90px', width: '402px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, '«Cumpleaños feliz»');
  { let ln = ''; for (let yy = 160; yy < 270; yy += 26) ln += `<path d="M30,${yy} H${yy % 3 ? 370 : 300}" stroke="${INK}" stroke-width="5" opacity=".3"/>`; box(doc.inner, 0, 0, 402, 282).innerHTML = `<svg width="402" height="282">${ln}</svg>`; }
  const nv = stamp(c, 250, 900, 'NO VALEN', { size: 120, bw: 15, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · GOLPE ROSA: «HOY ES DE TODOS» — la partitura vuela libre (sin fechas)
   ====================================================================== */
colorHit(S.F2[0], S.F2[1], PINK, c => {
  const top = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 8 }, 'Hoy…');
  const fly = box(c, 290, 440, 500, 420, { zIndex: 6 });
  const wing = (flip) => `<g transform="${flip ? 'translate(500,0) scale(-1,1)' : ''}"><g class="wg"><path d="M60,200 C-20,120 -40,40 10,10 C40,60 70,80 120,90 C90,110 80,150 60,200 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M20,40 q40,40 80,52 M6,80 q40,40 74,56 M20,130 q20,20 46,40" stroke="${INK}" stroke-width="2.5" fill="none"/></g></g>`;
  fly.innerHTML = `<svg width="500" height="420" style="overflow:visible">${wing(false)}${wing(true)}</svg>`;
  const WG = [...fly.querySelectorAll('.wg')];
  const sc = scoreSheet(fly, 110, 60, 280, 330, { seed: 71, top: 120, tsz: 30, ty: 24 });
  sc.T('«Cumpleaños<br>feliz»', { fontSize: '32px', whiteSpace: 'normal', top: '14px' });
  const big = el('div', c, { left: 0, top: '1010px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '190px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 12, whiteSpace: 'nowrap' }, 'DE TODOS');
  const es = el('div', c, { left: 0, top: '920px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 12 }, 'es…');
  const SIL3 = [[60, 1010], [380, 990], [700, 1010]].map(([x, y], i) => { const f = mkB(c, [x, y, 300, 383], [ladyInner(91, '#333', '#333'), fanInner(92, 'slouch', '#333'), kidInner(93, true)][i]); f.d.style.filter = SIL; f.d.style.zIndex = 4; return f; });
  const NT = riseNotes(c, 8, 540, 1000, 900, 81, { sz: 80, col: ['#fff', YEL, '#fff', INK], z: 5 });
  const chn = box(c, 300, 820, 480, 80, { zIndex: 5 });
  chn.innerHTML = `<svg width="480" height="80" style="overflow:visible">${[0, 1, 2, 3, 4, 5].map(k => `<ellipse cx="${30 + k * 80}" cy="40" rx="40" ry="20" fill="none" stroke="${INK}" stroke-width="12"/><ellipse cx="${30 + k * 80}" cy="40" rx="40" ry="20" fill="none" stroke="#B8B0A0" stroke-width="6"/>`).join('')}</svg>`;
  return t => {
    set(top, { s: t < K.hoy ? 0 : lerp(1.7, 1, p(t, K.hoy, 0.2, E.outBack)), r: -3, o: t < K.hoy ? 0 : 1 });
    const kf = p(t, K.hoy + 0.25, 0.9, E.outCubic);
    set(fly, { y: 60 - kf * 40 + Math.sin(t * 5) * 14, r: Math.sin(t * 3) * 5, s: 0.9 + 0.1 * kf });
    const fl = t > K.hoy + 0.15 ? Math.sin(t * 16) * 22 : 0;
    WG.forEach(g => g.setAttribute('transform', `rotate(${f1(fl)} 60 200)`));
    const kb = p(t, K.hoy + 0.15, 0.4, E.outCubic);
    set(chn, { y: kb * 700, r: kb * 30, o: 1 - kb });
    updNotes(NT, t, 700, t > K.hoy + 0.15 ? 1 : 0);
    SIL3.forEach((f, i) => { set(f.d, { y: Math.abs(Math.sin(t * 6 + i)) * -14 }); face(f, t, { jaw: t > K.es ? 0.35 + 0.3 * Math.sin(t * 12 + i) : 0 }); });
    popA(es, t, K.es, { rise: 30 });
    set(big, { s: t < K.todos - 0.08 ? 0 : lerp(1.7, 1, p(t, K.todos - 0.08, 0.2, E.outBack)), r: -3, o: t < K.todos - 0.08 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.todos, 0.25) ? glitch(t, K.todos, 0.25) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
  };
});

/* ======================================================================
   G1 · ¡OJO! «EN TU CASA SIEMPRE FUE GRATIS» (+ cameo del emú soplando las velas)
   ====================================================================== */
headline(K.casa - 0.25, S.G1[1], 'En *tu casa:* siempre gratis', { size: 84, hlT: K.casa });
const T_EMU = K.casa + 0.05;
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const kt = p(t, K.ojo + 0.45, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.4, kt), x: kt * 330, y: kt * -330, r: -10, o: t < K.ojo ? 0 : 1 });
    FM.forEach((f, i) => { const t0 = K.ojo + 0.2 + i * 0.12; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.6, 3, i) - (t > K.casa ? Math.abs(Math.sin(t * 6 + i)) * 10 : 0), r: [4, -4][i], o: t < t0 ? 0 : 1 }); face(f, t, { jaw: t > K.casa && t < T_EMU + 0.6 ? 0.3 + 0.3 * Math.sin(t * 12 + i) : 0, closed: t > K.casa && Math.sin(t * 2.5 + i) > 0.2, look: t > T_EMU + 0.7 ? [0, 4] : [[8, 2], [-8, 2]][i], seed: i }); });
    set(ck.d, { s: pop(t, K.ojo + 0.15, 0.4), o: t < K.ojo + 0.15 ? 0 : 1 });
    const ke = p(t, T_EMU, 0.25, E.outBack), kd = p(t, T_EMU + 1.15, 0.25, E.inCubic);
    set(emu.d, { y: (1 - ke) * 330 + kd * 330, r: -4 });
    const blow = t > T_EMU + 0.6 && t < T_EMU + 1.0;
    face(emu, t, { look: [0, 0], half: false, blink: false, bL: 16, bR: 22, jaw: blow ? 0.15 : 0 });
    set(puff, { o: blow ? 1 : 0, s: 0.6 + p(t, T_EMU + 0.6, 0.3), x: 0, y: p(t, T_EMU + 0.6, 0.3) * 30 });
    flick(ck, t, t > T_EMU + 0.75 ? 1 : 0);
    updNotes(NT, t, 360, t > K.casa && t < T_EMU + 0.6 ? 1 : 0);
    set(ok, { s: t < K.gratis ? 0 : lerp(1.7, 1, p(t, K.gratis, 0.18)), r: -6, o: t < K.gratis ? 0 : 1 });
    popA(tc, t, K.gratis + 0.05, { r: -4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 3px, transparent 3px 60px), repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 30px, transparent 30px 60px)' });
  const win = box(c, 330, 440, 420, 360, { zIndex: 1 });
  win.innerHTML = `<svg width="420" height="360" style="overflow:visible"><rect x="0" y="0" width="420" height="340" rx="10" fill="#cfe0e6" stroke="${INK}" stroke-width="6"/><path d="M210,0 V340 M0,170 H420" stroke="${WOOD}" stroke-width="16"/><path d="M210,0 V340 M0,170 H420" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="330" cy="70" r="30" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M-30,-10 Q40,160 10,350 L-40,350 Z M450,-10 Q380,160 410,350 L460,350 Z" fill="${PINK}" stroke="${INK}" stroke-width="4"/><rect x="-50" y="-24" width="520" height="24" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const tb = box(c, 120, 1080, 840, 200, { zIndex: 7 });
  tb.innerHTML = `<svg width="840" height="200" style="overflow:visible"><path d="M0,0 H840 L800,60 H40 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M40,60 Q100,100 160,60 Q220,100 280,60 Q340,100 400,60 Q460,100 520,60 Q580,100 640,60 Q700,100 760,60 Q790,90 800,60" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="80" y="70" width="30" height="130" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="730" y="70" width="30" height="130" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const FM = [mkB(c, [60, 660, 330, 422], ladyInner(83, '#6b4a2a', '#5a7a6a')), mkB(c, [650, 690, 300, 383], bustInner({ uniform: 'farmer', moustache: true, seed: 84 }) + PARTYHAT(YEL))];
  FM.forEach(f => f.d.style.zIndex = 5);
  const emu = mkEmuF(c, [400, 610, 280, 420]); emu.d.style.zIndex = 4;
  const ck = mkCake(c, [380, 830, 320, 341]); ck.d.style.zIndex = 8;
  const puff = box(c, 470, 830, 140, 80, { zIndex: 9 });
  puff.innerHTML = `<svg width="140" height="80" style="overflow:visible"><path d="M10,20 q30,-14 60,0 M20,44 q40,-14 80,0 M10,68 q30,-14 60,0" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M10,20 q30,-14 60,0 M20,44 q40,-14 80,0 M10,68 q30,-14 60,0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
  const NT = riseNotes(c, 5, 520, 760, 560, 61, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 6 });
  const ok = box(c, 740, 870, 200, 200, { zIndex: 30 }); ok.innerHTML = `<svg viewBox="0 0 100 100" width="200" height="200" style="overflow:visible"><circle cx="52" cy="54" r="46" fill="${SH}"/><circle cx="50" cy="50" r="46" fill="#7ac08a" stroke="${INK}" stroke-width="5"/><path d="M26,52 L44,70 L76,32" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  const tc = chip(c, 420, 1210, 'gratis ✔', { size: 60, bg: INK, color: YEL, z: 30 });
  const ojo = stamp(c, 230, 760, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   G2 · «NADIE TE MANDA LA FACTURA DE TUS SEIS AÑOS» — la factura llega… y el matasuegras la tumba
   ====================================================================== */
headline(S.G2[0], K.seis - 0.1, 'Nadie te manda la *factura*…', { size: 84, hlT: K.factura });
headline(K.seis - 0.1, S.G2[1], '…de tus *seis años*', { size: 110, hlT: K.seis });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(kid.d, { s: pop(t, S.G2[0] + 0.02, 0.4), y: wobble(t, 0.6, 3), r: -3 });
    face(kid, t, { look: t > K.factura ? [10, -4] : [0, -2], jaw: t > K.anos ? 0.2 : 0, bL: t > K.factura && t < K.anos ? 12 : 2, bR: t > K.factura && t < K.anos ? 12 : 2, seed: 2 });
    set(ck6.d, { s: pop(t, S.G2[0] + 0.15, 0.4), y: wobble(t, 0.7, 2) }); flick(ck6, t);
    // la factura entra volando hacia el niño…
    const kf = p(t, K.manda - 0.05, 0.6, E.outCubic), kx = p(t, K.anos + 0.05, 0.45, E.inCubic);
    set(inv.wrap, { x: (1 - kf) * 800 + kx * 900, y: Math.sin(t * 4) * 12 - kx * 500, r: lerp(25, -6, kf) + kx * 90 + Math.sin(t * 5) * 3, o: t < K.manda - 0.05 ? 0 : 1 });
    // …y el matasuegras se desenrolla y la manda a paseo
    const kb = p(t, K.anos - 0.1, 0.2, E.outBack) * (1 - p(t, K.anos + 0.7, 0.25));
    blw.style.transform = `translate(${f1(0)}px,0) scaleX(${f1(Math.max(0.02, kb) * 1000) / 1000})`;
    set(xs, { s: t < K.anos + 0.15 ? 0 : lerp(1.8, 1, p(t, K.anos + 0.15, 0.18)), r: -8, o: t < K.anos + 0.15 ? 0 : 1 });
    popA(ch6, t, K.seis, { r: 4 });
    set(nada, { s: pop(t, K.nadie, 0.35), r: -6 + Math.sin(t * 5) * 3, o: t < K.nadie ? 0 : (t > K.factura ? 0 : 1) });
  }, { clip: true });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,62,165,.10) 0 40px, transparent 40px 80px)' });
  const kid = mkB(c, [40, 700, 380, 486], kidInner(96, false, '#7d8fa8') + PARTYHAT(PINK)); kid.d.style.zIndex = 6;
  const ck6 = mkCake(c, [80, 1040, 300, 320], { candles: 6 }); ck6.d.style.zIndex = 8;
  const inv = invoice(c, 520, 560, 440, 560, { sub: 'Tu cumple de los 6' }); inv.wrap.style.zIndex = 10;
  const blw = box(c, 300, 870, 520, 70, { zIndex: 12, transformOrigin: '0 50%' });
  blw.innerHTML = `<svg width="520" height="70" style="overflow:visible"><path d="M0,35 H470" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M0,35 H470" stroke="${PINK}" stroke-width="30" stroke-linecap="round"/><path d="M40,35 H460" stroke="${YEL}" stroke-width="8" stroke-dasharray="20 18"/><circle cx="496" cy="35" r="22" fill="${YEL}" stroke="${INK}" stroke-width="5"/></svg>`;
  const xs = box(c, 600, 640, 300, 300, { zIndex: 20 }); xs.innerHTML = XSVG;
  const ch6 = chip(c, 380, 1230, 'tus 6 años 🎂', { size: 56, bg: INK, color: YEL, z: 30 });
  const nada = el('div', c, { left: '560px', top: '560px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '120px', color: INK, zIndex: 9 }, '¿?');
}

/* ======================================================================
   H · GOLPE AMARILLO: «LA CANCIÓN QUE MÁS HAS CANTADO TENÍA UN DUEÑO… QUE NO LO ERA»
   ====================================================================== */
colorHit(S.H[0], S.H[1], YEL, c => {
  const osea = el('div', c, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK, zIndex: 8 }, 'O sea:');
  const l1 = el('div', c, { left: 0, top: '340px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 8 });
  const l2 = el('div', c, { left: 0, top: '446px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 8 });
  const WD = [];
  [['la', l1], ['canción', l1], ['que', l1], ['más', l2], ['has', l2], ['cantado', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.textContent = q[0]; if (k === 5) { s.style.fontStyle = 'italic'; s.style.color = '#fff'; s.style.textShadow = `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`; } q[1].appendChild(s); WD.push({ e: s, t: W[K.i9 + k].s }); });
  // la tarta de siempre con las notas en órbita
  const ck = mkCake(c, [340, 590, 400, 427]); ck.d.style.zIndex = 5;
  const OB = [0, 1, 2, 3, 4].map(i => noteBox(c, 490, 760, 100, i % 2, ['#fff', INK][i % 2], 6));
  const SIL2 = [[20, 1040], [760, 1040]].map(([x, y], i) => { const f = mkB(c, [x, y, 300, 383], [ladyInner(97, '#333', '#333'), fanInner(98, 'slouch', '#333')][i]); f.d.style.filter = SIL; f.d.style.zIndex = 4; return f; });
  const tn = el('div', c, { left: 0, top: '1010px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '80px', color: INK, zIndex: 12 }, 'tenía un');
  const big = el('div', c, { left: 0, top: '1090px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: '190px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 12, whiteSpace: 'nowrap' }, '<span style="position:relative;display:inline-block">DUEÑO…<span class="stk" style="position:absolute;left:-14px;right:-14px;top:46%;height:22px;background:' + RED + ';border:4px solid ' + INK + ';border-radius:8px;transform-origin:left center;transform:scaleX(0)"></span></span>');
  const stk = big.querySelector('.stk');
  const nl = stamp(c, 150, 850, 'QUE NO LO ERA', { size: 86, bw: 12, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  return t => {
    popA(osea, t, K.osea, { rise: 30 });
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.3), o: t < w.t - 0.03 ? 0 : 1 }));
    set(ck.d, { s: pop(t, K.osea, 0.45), y: wobble(t, 0.6, 4), o: t < K.osea ? 0 : 1 }); flick(ck, t);
    OB.forEach((n, i) => { const a = t * 2.2 + i * 1.256; set(n, { x: Math.cos(a) * 330, y: Math.sin(a) * 110 - 80, s: pop(t, K.cantado + i * 0.06, 0.3), r: Math.sin(t * 4 + i) * 15, o: t < K.cantado ? 0 : 1 }); });
    SIL2.forEach((f, i) => { set(f.d, { y: Math.abs(Math.sin(t * 6 + i)) * -12, o: t < K.cantado - 0.2 ? 0 : 1 }); face(f, t, { jaw: t < K.queno ? 0.3 + 0.3 * Math.sin(t * 12 + i) : 0.6 }); });
    popA(tn, t, K.tenia9, { rise: 30 });
    const kb = p(t, K.dueno9 - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.dueno9 - 0.02 ? 0 : lerp(1.6, 1, kb), r: -3, o: t < K.dueno9 - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.era, 0.3) ? glitch(t, K.era, 0.3) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    stk.style.transform = `scaleX(${f1(p(t, K.queno, 0.3, E.inOutCubic) * 1000) / 1000})`;
    stampA(nl, t, K.era, -6, 1);
  };
});

/* ======================================================================
   Q · «¿Y EN TU CASA, CÓMO SE CANTA? OS LEO.» — comentarios (pregunta abierta y personal)
   ====================================================================== */
headline(S.Q[0], K.os - 0.06, '¿Y en *tu casa,* cómo se canta?', { size: 84, hlT: K.casa9 });
headline(K.os - 0.06, S.Q[1], '*Os leo* 👇', { size: 130, hlT: K.os });
{
  const CM = [];
  const c = scene(S.Q[0], S.Q[1], t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, S.Q[0], 2.8, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < K.os ? [-6, 2] : [-4, 6], bL: t > K.como - 0.2 && t < K.os ? 12 : 2, bR: t > K.como - 0.2 && t < K.os ? 16 : 6, noCup: true, fan: wobble(t, 0.8, 5), seed: 2 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(hand, { s: pop(t, K.os, 0.3), y: Math.sin(t * 6) * 10, r: 90, o: t < K.os ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [560, 470, 470, 582]);
  const hand = box(c, 600, 1060, 170, 170, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="170" height="170" style="overflow:visible">${gloveHand(0, 0, 0, 1.2)}</svg>`;
  const cms = [['FAR', 'la vecina del 3.º B', 'Cumpleaños feliz 🎂', K.casa9 + 0.1], ['SOL', 'tu primo de México', '¡Las mañanitas! 🇲🇽', K.como + 0.1], ['MEREDITH', 'tu tío, cada año', 'La versión de mi tío 😂', K.canta + 0.05]];
  cms.forEach((m, i) => {
    const e = box(c, 40, [500, 680, 860][i], 560, 140, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 12, 14, 104, m[0], { bw: 3 });
    el('div', e, { left: '130px', top: '12px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '30px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '130px', top: '50px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
  // rótulo: son ejemplos, no comentarios reales
  const imag = el('div', c, { left: '40px', top: '1016px', width: '560px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 600, fontStyle: 'italic', fontSize: '32px', color: '#7a6a58', whiteSpace: 'nowrap', zIndex: 40 }, '(comentarios imaginarios)');
  CM.push({ e: imag, t: cms[0][3] });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (última frase) — del Ep. 20
   ====================================================================== */
{
  const T0 = S.C[0], T1 = S.C[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: t >= T1 ? 0 : 1 - ex });
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
   L · …EN EL LIBRO — el libro HISTORIA se cierra (tarta encima) + «Ep. 21 · …»
   ====================================================================== */
headline(S.L2[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.L2[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    mc.d.style.display = sx > 0.25 ? '' : 'none'; flick(mc, t); set(mc.d, { y: wobble(t, 1, 3) });
    set(bookW, { x: 210 * 1.25 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="48" fill="${INK}">CANCIONES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">de siempre</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const mc = mkCake(bookW, [620, 430, 240, 256]); mc.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 21 · Cumpleaños feliz tenía dueño</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
