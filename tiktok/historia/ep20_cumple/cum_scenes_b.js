/* Ep. 20 · escenas L4–L8 */

/* ======================================================================
   E1 · RESULTADO: PELÍCULA O ANUNCIO → HABÍA QUE PAGAR (monedas)
   ====================================================================== */
headline(K.pelicula - 0.1, S.E1[1], 'Película o anuncio: *había que pagar*', { size: 76, hlT: K.pagar1 });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    // cinta «RESULTADO:»
    const kr = p(t, S.E1[0], 0.3, E.outBack), kro = p(t, K.pelicula - 0.2, 0.3, E.inCubic);
    set(rib, { sx: kr, y: -kro * 900, r: -2 });
    // película + anuncio
    set(fs, { s: pop(t, K.pelicula, 0.4), r: -5 + wobble(t, 0.5, 1), o: t < K.pelicula ? 0 : 1, x: -(t > K.pelicula ? ((t - K.pelicula) * 30) % 48 : 0) * 0 });
    FF.forEach((f, i) => { set(f, { y: Math.sin(t * 9 + i) * 4 }); });
    set(tv, { s: pop(t, K.anuncio, 0.4), r: 4 + wobble(t, 0.5, 1, 1), o: t < K.anuncio ? 0 : 1 });
    flick(tvc, t); set(adl, { s: 1 + 0.08 * Math.sin(t * 8) });
    // pagar: caja + lluvia de monedas
    set(reg.d, { s: pop(t, K.pagar1 - 0.2, 0.4), r: (t > K.pagar1 + 0.2 && t < K.pagar1 + 0.8 ? Math.sin(t * 50) * 2 : 0), o: t < K.pagar1 - 0.2 ? 0 : 1 });
    reg.drawer.setAttribute('transform', `translate(0 ${f1(p(t, K.pagar1 + 0.1, 0.25, E.outBack) * 34)})`);
    reg.disp.textContent = t > K.pagar1 ? '€ €' : '€ ?';
    COINS.forEach(q => { const k = clamp((t - q.t0) / 0.75); set(q.e, { x: q.dx * k, y: -260 + 560 * k * k, r: q.rr * k, o: t < q.t0 || k >= 1 ? 0 : 1 }); });
    set(pl, { s: pop(t, K.pelicula + 0.15, 0.3), r: -4, o: t < K.pelicula + 0.15 ? 0 : 1 });
    set(an, { s: pop(t, K.anuncio + 0.15, 0.3), r: 4, o: t < K.anuncio + 0.15 ? 0 : 1 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const rib = box(c, 40, 640, 1000, 330, { zIndex: 30 });
  rib.innerHTML = `<svg width="1000" height="330" style="overflow:visible">${cut('<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z"/>')}<path d="M0,40 H1000 L970,165 L1000,290 H0 L30,165 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,60 H960 M40,270 H960" stroke="${YEL}" stroke-width="4" stroke-dasharray="14 10"/></svg>`;
  el('div', rib, { left: '0', top: '104px', width: '1000px', textAlign: 'center', fontFamily: 'Rye', fontSize: '120px', lineHeight: 1, color: YEL, whiteSpace: 'nowrap', textShadow: `5px 5px 0 ${INK}` }, 'RESULTADO:');
  const fs = filmStrip(c, 60, 470, 440, 330, 6);
  const FF = [0, 1, 2].map(i => { const fr = box(fs, 14 + i * 140, 44, 128, 226, { background: '#F4ECDB', border: `3px solid ${INK}`, overflow: 'hidden' }); const n = box(fr, 20, 40, 88, 110); n.innerHTML = noteSvg(i % 2, [INK, RED, INK][i]); box(fr, 10, 160, 108, 50, { background: CREAM2, border: `3px solid ${INK}`, borderRadius: '8px 8px 4px 4px' }); return fr; });
  const tv = box(c, 530, 450, 400, 381, { zIndex: 6 }); tv.innerHTML = tvSvg();
  const scr = box(tv, 36, 36, 252, 254, { borderRadius: '36px', overflow: 'hidden', background: '#F4ECDB' });
  const tvc = mkCake(scr, [30, 70, 190, 203]);
  const adl = el('div', scr, { left: '20px', top: '10px', width: '212px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: RED, whiteSpace: 'nowrap' }, 'ANUNCIO');
  const pl = chip(c, 140, 820, 'película', { size: 50, bg: PINK, z: 20 });
  const an = chip(c, 640, 830, 'anuncio', { size: 50, bg: PINK, z: 20 });
  const reg = mkReg(c, [370, 900, 320, 335]); reg.d.style.zIndex = 10;
  const r = rng(77); const COINS = [];
  for (let i = 0; i < 12; i++) { const e = box(c, 300 + r() * 420, 800, 90, 90, { zIndex: 12 }); e.innerHTML = coinSvg(); COINS.push({ e, t0: K.pagar1 - 0.1 + i * 0.07, dx: (r() - 0.5) * 120, rr: (r() - 0.5) * 600 }); }
}

/* ======================================================================
   E2 · RESTAURANTES: SU PROPIA CANCIÓN PARA NO PAGAR
   ====================================================================== */
headline(S.E2[0], K.inventaban - 0.1, 'Cadenas de *restaurantes*…', { size: 88, hlT: K.restaurantes });
headline(K.inventaban - 0.1, S.E2[1], '…con su *propia* canción', { size: 92, hlT: K.propia });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(aw, { sy: p(t, S.E2[0], 0.35, E.outBack) });
    WT.forEach((f, i) => { const t0 = S.E2[0] + 0.15 + i * 0.12; const sing = t > K.inventaban; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.6, 3, i) - (sing ? Math.abs(Math.sin(t * 7 + i * 1.5)) * 14 : 0), r: [5, -5][i], o: t < t0 ? 0 : 1 }); face(f, t, { jaw: sing ? 0.35 + 0.3 * Math.sin(t * 13 + i) : 0, closed: sing && Math.sin(t * 3) > 0, look: [[6, 0], [-6, 0]][i], seed: i }); });
    set(ck.d, { y: -(1 - p(t, S.E2[0] + 0.3, 0.45, E.outBounce)) * 900 + Math.sin(t * 7) * 6 }); flick(ck, t);
    set(bub, { s: pop(t, K.inventaban, 0.35), r: -3 + Math.sin(t * 4) * 2, o: t < K.inventaban ? 0 : 1 });
    popA(inv, t, K.propia + 0.1, { r: -4 });
    updNotes(NT, t, 360, t > K.inventaban ? 1 : 0);
    set(co, { s: pop(t, K.nop, 0.35), r: Math.sin(t * 6) * 8, o: t < K.nop ? 0 : 1 });
    set(cx, { s: t < K.pagar2 ? 0 : lerp(1.7, 1, p(t, K.pagar2, 0.15)), o: t < K.pagar2 ? 0 : 1 });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.08) 0 40px, transparent 40px 80px)' });
  const aw = box(c, 40, 420, 1000, 120, { zIndex: 3, transformOrigin: '50% 0' });
  { let sc = ''; for (let k = 0; k < 10; k++) sc += `<path d="M${k * 100},20 H${k * 100 + 100} V90 Q${k * 100 + 50},130 ${k * 100},90 Z" fill="${k % 2 ? '#fff' : RED}" stroke="${INK}" stroke-width="4"/>`; aw.innerHTML = `<svg width="1000" height="140" style="overflow:visible"><rect x="-10" y="0" width="1020" height="24" fill="${INK}"/>${sc}</svg>`; }
  const WT = [mkB(c, [60, 720, 320, 409], waiterInner(61, 0)), mkB(c, [600, 720, 320, 409], waiterInner(62, 1))];
  WT.forEach(f => f.d.style.zIndex = 5);
  const ck = mkCake(c, [360, 860, 340, 363]); ck.d.style.zIndex = 8;
  const bub = bubble(c, 170, 580, '♪ ¡Otra canción! ♪', { size: 64, it: true, z: 30, rad: '44px 44px 10px 44px' });
  const inv = chip(c, 420, 1240, 'canción inventada', { size: 46, bg: PINK, z: 30 });
  const NT = riseNotes(c, 5, 520, 860, 600, 51, { sz: 70, col: [INK, RED, '#5b8bd6'], z: 9 });
  const co = box(c, 740, 1060, 170, 170, { zIndex: 30 }); co.innerHTML = coinSvg();
  const cx = box(co, -10, -10, 190, 190, { zIndex: 2 }); cx.innerHTML = XSVG;
}

/* ======================================================================
   F1 · 2015: UN JUEZ — DERECHOS NO VÁLIDOS
   ====================================================================== */
headline(S.F1[0], K.derechos2 - 0.1, 'Un *juez* decidió…', { size: 100, hlT: K.juez });
headline(K.derechos2 - 0.1, S.F1[1], 'Esos derechos: *no válidos*', { size: 86, hlT: K.validos, hlc: '#ff9aa8' });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    set(yr, { s: t < K.d15 ? 0 : lerp(1.8, 1, p(t, K.d15, 0.18, E.outCubic)), r: -5, o: t < K.d15 ? 0 : 1 });
    set(jd.d, { y: (1 - p(t, S.F1[0], 0.4, E.outBack)) * 700 + wobble(t, 0.6, 3), s: 1 + 0.04 * p(t, K.decidio, 0.2) * (1 - p(t, K.decidio + 0.3, 0.3)) });
    face(jd, t, { look: t > K.derechos2 ? [-8, 6] : [0, 0], bL: t > K.decidio ? -4 : 8, bR: t > K.decidio ? -4 : 8, jaw: t > K.decidio && t < K.decidio + 0.3 ? 0.4 : 0, seed: 1.5 });
    // mazo: sube y golpea en «decidió» (y otra vez en «válidos»)
    const hit = tt => { const a = p(t, tt - 0.35, 0.25, E.outCubic), b = p(t, tt - 0.08, 0.08, E.inCubic); return -40 * a * (1 - b); };
    set(gv, { r: hit(K.decidio) + hit(K.validos), y: 0 });
    set(boom, { s: (t > K.decidio && t < K.decidio + 0.35) || (t > K.validos && t < K.validos + 0.35) ? 1 + p(t, t > K.validos ? K.validos : K.decidio, 0.3) * 0.4 : 0, o: (t > K.decidio && t < K.decidio + 0.35) || (t > K.validos && t < K.validos + 0.35) ? 1 : 0 });
    set(doc.wrap, { r: -4 + wobble(t, 0.5, 0.5), y: (1 - p(t, K.derechos2 - 0.3, 0.35, E.outBack)) * 500, o: t < K.derechos2 - 0.3 ? 0 : 1 });
    stampA(nv, t, K.validos, -10, 1);
  });
  sceneBg(c, { background: '#d9c7a6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 120px)' });
  // dosel / bandera de sala
  const cnp = box(c, 260, 430, 560, 200, { zIndex: 1 });
  cnp.innerHTML = `<svg width="560" height="220" style="overflow:visible"><path d="M0,0 H560 V120 Q420,200 280,130 Q140,200 0,120 Z" fill="#6b1d24" stroke="${INK}" stroke-width="5"/><path d="M0,0 H560 V120 Q420,200 280,130 Q140,200 0,120 Z" fill="url(#hB)" opacity=".4"/><circle cx="280" cy="60" r="40" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M260,48 h40 M280,40 v44 M258,70 l-10,16 h24 Z M302,70 l-10,16 h24 Z" stroke="${INK}" stroke-width="4" fill="none"/></svg>`;
  const jd = mkB(c, [300, 520, 480, 614], judgeInner(55)); jd.d.style.zIndex = 4;
  const bench = box(c, 70, 960, 940, 300, { zIndex: 6 });
  bench.innerHTML = `<svg width="940" height="300" style="overflow:visible">${cut('<rect x="0" y="0" width="940" height="290" rx="10"/>')}<rect x="0" y="0" width="940" height="290" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="940" height="290" rx="10" fill="url(#hW)" opacity=".35"/><rect x="-20" y="-10" width="980" height="34" rx="6" fill="#7a4a26" stroke="${INK}" stroke-width="5"/><rect x="60" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><rect x="350" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/><rect x="640" y="60" width="240" height="190" rx="8" fill="none" stroke="${INK}" stroke-width="4"/></svg>`;
  const gv = box(c, 640, 760, 280, 228, { zIndex: 9, transformOrigin: '250px 220px' }); gv.innerHTML = gavelSvg();
  const blk = box(c, 640, 950, 200, 40, { zIndex: 8, background: '#7a4a26', border: `5px solid ${INK}`, borderRadius: '10px' }); void blk;
  const boom = el('div', c, { left: '560px', top: '880px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '90px', color: RED, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 #fff`, zIndex: 12 }, '¡PUM!');
  const yr = el('div', c, { left: '70px', top: '440px', fontFamily: 'Rye', fontSize: '150px', lineHeight: '160px', color: YEL, textShadow: `8px 8px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 20 }, '2015');
  const doc = paperPiece(c, 330, 870, 420, 300, { seed: 61, bg: '#FBF6EA' }); doc.wrap.style.zIndex = 10;
  el('div', doc.inner, { left: '0', top: '22px', width: '402px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK, whiteSpace: 'nowrap' }, 'DERECHOS ©');
  el('div', doc.inner, { left: '0', top: '90px', width: '402px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, '«Cumpleaños feliz»');
  { let ln = ''; for (let yy = 160; yy < 270; yy += 26) ln += `<path d="M30,${yy} H${yy % 3 ? 370 : 300}" stroke="${INK}" stroke-width="5" opacity=".3"/>`; box(doc.inner, 0, 0, 402, 282).innerHTML = `<svg width="402" height="282">${ln}</svg>`; }
  const nv = stamp(c, 230, 900, 'NO VÁLIDOS', { size: 104, bw: 14, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   F2 · GOLPE ROSA: DESDE 2016, ES DE TODOS — la partitura vuela libre
   ====================================================================== */
colorHit(S.F2[0], S.F2[1], PINK, c => {
  const top = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, zIndex: 8 }, 'Y desde');
  const yr = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '190px', lineHeight: '200px', color: YEL, textShadow: `9px 9px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 9 }, '2016');
  const fly = box(c, 290, 560, 500, 420, { zIndex: 6 });
  const wing = (flip) => `<g transform="${flip ? 'translate(500,0) scale(-1,1)' : ''}"><g class="wg"><path d="M60,200 C-20,120 -40,40 10,10 C40,60 70,80 120,90 C90,110 80,150 60,200 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M20,40 q40,40 80,52 M6,80 q40,40 74,56 M20,130 q20,20 46,40" stroke="${INK}" stroke-width="2.5" fill="none"/></g></g>`;
  fly.innerHTML = `<svg width="500" height="420" style="overflow:visible">${wing(false)}${wing(true)}</svg>`;
  const WG = [...fly.querySelectorAll('.wg')];
  const sc = scoreSheet(fly, 110, 60, 280, 330, { seed: 71, top: 120, tsz: 30, ty: 24 });
  sc.T('«Cumpleaños<br>feliz»', { fontSize: '32px', whiteSpace: 'normal', top: '14px' });
  const big = el('div', c, { left: 0, top: '1010px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '190px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 12, whiteSpace: 'nowrap' }, 'DE TODOS');
  const es = el('div', c, { left: 0, top: '930px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '80px', color: INK, zIndex: 12 }, 'es…');
  const SIL3 = [[60, 1010], [380, 990], [700, 1010]].map(([x, y], i) => { const f = mkB(c, [x, y, 300, 383], [ladyInner(91, '#333', '#333'), fanInner(92, 'slouch', '#333'), kidInner(93, true)][i]); f.d.style.filter = SIL; f.d.style.zIndex = 4; return f; });
  const NT = riseNotes(c, 8, 540, 1000, 900, 81, { sz: 80, col: ['#fff', YEL, '#fff', INK], z: 5 });
  const chn = box(c, 300, 900, 480, 80, { zIndex: 5 });
  chn.innerHTML = `<svg width="480" height="80" style="overflow:visible">${[0, 1, 2, 3, 4, 5].map(k => `<ellipse cx="${30 + k * 80}" cy="40" rx="40" ry="20" fill="none" stroke="${INK}" stroke-width="12"/><ellipse cx="${30 + k * 80}" cy="40" rx="40" ry="20" fill="none" stroke="#B8B0A0" stroke-width="6"/>`).join('')}</svg>`;
  return t => {
    popA(top, t, S.F2[0] + 0.02, { rise: 30 });
    set(yr, { s: t < K.d16b ? 0 : lerp(1.8, 1, p(t, K.d16b, 0.18, E.outCubic)), r: -4, o: t < K.d16b ? 0 : 1 });
    const kf = p(t, K.dieci16b + 0.2, 0.9, E.outCubic);
    set(fly, { y: -kf * 120 + Math.sin(t * 5) * 14, r: Math.sin(t * 3) * 5, s: 0.9 + 0.1 * kf });
    const fl = t > K.dieci16b + 0.1 ? Math.sin(t * 16) * 22 : 0;
    WG.forEach(g => g.setAttribute('transform', `rotate(${f1(fl)} 60 200)`));
    // la cadena se rompe
    const kb = p(t, K.dieci16b + 0.1, 0.4, E.outCubic);
    set(chn, { y: kb * 700, r: kb * 30, o: 1 - kb });
    updNotes(NT, t, 700, t > K.dieci16b + 0.1 ? 1 : 0);
    SIL3.forEach((f, i) => { set(f.d, { y: Math.abs(Math.sin(t * 6 + i)) * -14 }); face(f, t, { jaw: t > K.es ? 0.35 + 0.3 * Math.sin(t * 12 + i) : 0 }); });
    popA(es, t, K.es, { rise: 30 });
    set(big, { s: t < K.todos2 - 0.08 ? 0 : lerp(1.7, 1, p(t, K.todos2 - 0.08, 0.2, E.outBack)), r: -3, o: t < K.todos2 - 0.08 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.todos2, 0.25) ? glitch(t, K.todos2, 0.25) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
  };
});

/* ======================================================================
   G1 · ¡OJO! — EN TU CASA NUNCA FUE UN PROBLEMA (+ cameo del emú)
   ====================================================================== */
headline(K.cantarla - 0.1, S.G1[1], 'En *tu casa*: nunca fue un problema', { size: 76, hlT: K.casa });
const T_EMU = K.problema - 0.15;
{
  const c = scene(S.G1[0], S.G1[1], t => {
    const kt = p(t, K.ojo + 0.5, 0.3, E.inOutCubic), k0 = p(t, K.ojo, 0.18, E.outCubic);
    set(ojo, { s: t < K.ojo ? 0 : lerp(lerp(2.4, 1, k0), 0.4, kt), x: kt * 330, y: kt * -330, r: -10, o: t < K.ojo ? 0 : 1 });
    FM.forEach((f, i) => { const t0 = K.cantarla + i * 0.12; set(f.d, { s: pop(t, t0, 0.4), y: wobble(t, 0.6, 3, i) - (t > K.casa ? Math.abs(Math.sin(t * 6 + i)) * 10 : 0), r: [4, -4][i], o: t < t0 ? 0 : 1 }); face(f, t, { jaw: t > K.cantarla + 0.3 ? 0.3 + 0.3 * Math.sin(t * 12 + i) : 0, closed: t > K.casa && Math.sin(t * 2.5 + i) > 0.2, look: [[8, 2], [-8, 2]][i], seed: i }); });
    set(ck.d, { s: pop(t, K.cantarla, 0.4), o: t < K.cantarla ? 0 : 1 });
    // emú: asoma, mira a cámara y sopla las velas
    const ke = p(t, T_EMU, 0.25, E.outBack), kd = p(t, T_EMU + 1.0, 0.25, E.inCubic);
    set(emu.d, { y: (1 - ke) * 330 + kd * 330, r: -4 });
    const blow = t > T_EMU + 0.6 && t < T_EMU + 1.0;
    face(emu, t, { look: [0, 0], half: false, blink: false, bL: 16, bR: 22, jaw: blow ? 0.15 : 0 });
    set(puff, { o: blow ? 1 : 0, s: 0.6 + p(t, T_EMU + 0.6, 0.3), x: 0, y: p(t, T_EMU + 0.6, 0.3) * 30 });
    flick(ck, t, t > T_EMU + 0.75 ? 1 : 0);
    updNotes(NT, t, 360, t > K.casa && t < T_EMU + 0.6 ? 1 : 0);
    set(ok, { s: t < K.nunca2 ? 0 : lerp(1.7, 1, p(t, K.nunca2, 0.18)), r: -6, o: t < K.nunca2 ? 0 : 1 });
    popA(tc, t, K.casa, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 3px, transparent 3px 60px), repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 30px, transparent 30px 60px)' });
  // ventana con cortinas
  const win = box(c, 330, 440, 420, 360, { zIndex: 1 });
  win.innerHTML = `<svg width="420" height="360" style="overflow:visible"><rect x="0" y="0" width="420" height="340" rx="10" fill="#cfe0e6" stroke="${INK}" stroke-width="6"/><path d="M210,0 V340 M0,170 H420" stroke="${WOOD}" stroke-width="16"/><path d="M210,0 V340 M0,170 H420" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="330" cy="70" r="30" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M-30,-10 Q40,160 10,350 L-40,350 Z M450,-10 Q380,160 410,350 L460,350 Z" fill="${PINK}" stroke="${INK}" stroke-width="4"/><rect x="-50" y="-24" width="520" height="24" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  // mesa
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
  const tc = chip(c, 120, 1180, 'en tu casa ✔', { size: 54, bg: INK, color: YEL, z: 30 });
  const ojo = stamp(c, 230, 760, '¡OJO!', { size: 200, bw: 18, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   G2 · LO QUE SE PAGABA: USARLA EN PÚBLICO O EN NEGOCIOS
   ====================================================================== */
headline(S.G2[0], K.usarla - 0.1, 'Lo que se pagaba…', { size: 100, hlT: K.pagar3 });
headline(K.usarla - 0.1, S.G2[1], 'Usarla en *público* o en negocios', { size: 80, hlT: K.publico });
{
  const c = scene(S.G2[0], S.G2[1], t => {
    set(hp.w, { s: pop(t, S.G2[0] + 0.02, 0.35), r: -3, o: 1 });
    flick(hp.ck, t);
    [[st, K.publico - 0.15, 3], [sh, K.negocios - 0.15, -3]].forEach(([q, t0, r]) => { set(q.w, { s: pop(t, t0, 0.4), r: r + wobble(t, 0.5, 1), o: t < t0 ? 0 : 1 }); face(q.f, t, { jaw: 0.3 + 0.3 * Math.sin(t * 12 + r), look: [0, -3], seed: r }); });
    [[st.bag, K.publico + 0.25], [sh.bag, K.negocios + 0.25]].forEach(([b, t0]) => set(b, { s: pop(t, t0, 0.35) * (1 + 0.05 * Math.sin(t * 8)), r: -8 + Math.sin(t * 5) * 6, o: t < t0 ? 0 : 1 }));
    set(bg0, { s: pop(t, K.pagar3, 0.4), r: Math.sin(t * 6) * 8, o: t < K.pagar3 ? 0 : (t > K.publico - 0.15 ? 0 : 1) });
    popA(pc, t, K.publico + 0.05, { r: -3 });
    popA(nc, t, K.negocios + 0.05, { r: 3 });
    set(spot, { r: Math.sin(t * 2) * 10 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const panel = (x, y, w, h, bgc) => { const wp = box(c, x, y, w, h, { zIndex: 5 }); box(wp, 0, 0, w, h, { background: bgc, border: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `9px 11px 0 ${SH}`, overflow: 'hidden' }); return wp; };
  // casa ✔ (izquierda)
  const hp = { w: panel(50, 440, 420, 740, '#E9C6BE') };
  { const inn = hp.w.children[0]; el('div', inn, { left: '0', top: '20px', width: '408px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK }, 'EN CASA');
    hp.ck = mkCake(inn, [60, 300, 290, 309]); mkB(inn, [-20, 110, 220, 281], ladyInner(83, '#6b4a2a', '#5a7a6a')).d.style.zIndex = 0; hp.ck.d.style.zIndex = 2;
    const okk = box(inn, 120, 560, 160, 160, { zIndex: 4 }); okk.innerHTML = `<svg viewBox="0 0 100 100" width="160" height="160"><circle cx="50" cy="50" r="46" fill="#7ac08a" stroke="${INK}" stroke-width="5"/><path d="M26,52 L44,70 L76,32" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
    el('div', inn, { left: '0', top: '470px', width: '408px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '50px', color: INK }, gratisTxt()); }
  // escenario (público)
  const st = { w: panel(510, 430, 420, 400, '#3a2a1e') };
  { const inn = st.w.children[0];
    inn.innerHTML = `<svg width="408" height="388" style="position:absolute;left:0;top:0"><path d="M0,0 H408 V40 Q300,80 204,46 Q108,80 0,40 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M0,0 Q60,200 30,388 H0 Z M408,0 Q348,200 378,388 H408 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><rect x="0" y="320" width="408" height="68" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
    st.spot = box(inn, 104, 0, 200, 340, { background: 'linear-gradient(180deg, rgba(255,230,0,.55), rgba(255,230,0,.08))', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)', transformOrigin: '50% 0' });
    st.f = mkB(inn, [104, 120, 200, 256], suitInner(47, false)); }
  const spot = st.spot;
  st.bag = box(st.w, 300, 220, 140, 153, { zIndex: 6 }); st.bag.innerHTML = bagSvg2();
  // tienda (negocios)
  const sh = { w: panel(510, 870, 420, 400, '#F4ECDB') };
  { const inn = sh.w.children[0]; let aw = ''; for (let k = 0; k < 6; k++) aw += `<path d="M${k * 70},0 H${k * 70 + 70} V60 Q${k * 70 + 35},90 ${k * 70},60 Z" fill="${k % 2 ? '#fff' : '#5b8bd6'}" stroke="${INK}" stroke-width="4"/>`;
    inn.innerHTML = `<svg width="408" height="388" style="position:absolute;left:0;top:0">${aw}<rect x="20" y="110" width="368" height="190" rx="8" fill="#cfe0e6" stroke="${INK}" stroke-width="5"/><path d="M204,110 V300" stroke="${INK}" stroke-width="4"/><rect x="0" y="300" width="408" height="88" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><text x="204" y="356" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">TIENDA</text></svg>`;
    sh.f = mkB(inn, [40, 110, 170, 217], waiterInner(63, 1)); }
  sh.bag = box(sh.w, 300, 200, 140, 153, { zIndex: 6 }); sh.bag.innerHTML = bagSvg2();
  const pc = chip(c, 560, 770, 'en público', { size: 46, bg: PINK, z: 30 });
  const nc = chip(c, 560, 1210, 'en negocios', { size: 46, bg: PINK, z: 30 });
  const bg0 = box(c, 620, 640, 200, 220, { zIndex: 25 }); bg0.innerHTML = bagSvg2();
}
function gratisTxt() { return 'cantarla ✔'; }

/* ======================================================================
   H · GOLPE AMARILLO: LA CANCIÓN MÁS CANTADA DEL MUNDO… ERA DE PAGO → ¿SÍ O NO?
   ====================================================================== */
colorHit(S.H[0], S.H[1], YEL, c => {
  const blk = box(c, 0, 0, 1080, 1920, { zIndex: 8 });
  const osea = el('div', blk, { left: 0, top: '220px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK }, 'O sea:');
  const l1 = el('div', blk, { left: 0, top: '350px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  const l2 = el('div', blk, { left: 0, top: '460px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1.05, color: INK, whiteSpace: 'nowrap' });
  const WD = []; const ia = find('la cancion mas cantada del mundo');
  [['la', l1], ['canción', l1], ['más', l1], ['cantada', l2], ['del', l2], ['mundo…', l2]].forEach((q, k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.textContent = q[0]; if (k === 3) { s.style.fontStyle = 'italic'; s.style.color = '#fff'; s.style.textShadow = `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`; } q[1].appendChild(s); WD.push({ e: s, t: W[ia + k].s }); });
  // globo terráqueo (silueta) con notas en órbita
  const gl = box(c, 340, 600, 400, 400, { zIndex: 5 });
  let mer = ''; for (let k = 0; k < 4; k++) mer += `<ellipse class="mr" cx="200" cy="200" rx="${180 - k * 45}" ry="180" fill="none" stroke="${YEL}" stroke-width="6"/>`;
  gl.innerHTML = `<svg width="400" height="400" style="overflow:visible"><circle cx="206" cy="208" r="184" fill="${SH}"/><circle cx="200" cy="200" r="184" fill="${INK}"/>${mer}<path d="M20,200 H380 M50,110 H350 M50,290 H350" stroke="${YEL}" stroke-width="6"/></svg>`;
  const OB = [0, 1, 2, 3, 4].map(i => noteBox(c, 490, 750, 100, i % 2, ['#fff', INK][i % 2], 6));
  const SIL2 = [[40, 1060], [740, 1060]].map(([x, y], i) => { const f = mkB(c, [x, y, 300, 383], [ladyInner(97, '#333', '#333'), fanInner(98, 'slouch', '#333')][i]); f.d.style.filter = SIL; f.d.style.zIndex = 4; return f; });
  const big = el('div', c, { left: 0, top: '1010px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '180px', color: '#fff', textShadow: `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`, zIndex: 12, whiteSpace: 'nowrap' }, 'ERA DE PAGO');
  const regS = mkReg(c, [400, 610, 280, 293]); regS.d.style.zIndex = 7;
  // CTA: ¿Lo sabías? SÍ / NO
  const q = el('div', c, { left: 0, top: '560px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '130px', color: INK, zIndex: 20 }, '¿Lo sabías?');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '780px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(110, 'SÍ', '#fff', INK), bN = btn(560, 'NO', INK, '#fff');
  const hand = box(c, 300, 910, 170, 170, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="170" height="170" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const CM = [];
  [['FAR', '@marta_cumple', 'SÍ 😳', K.sabias + 0.1], ['SOL', '@dani.velas', 'No, ya lo sabía', K.si + 0.2]].forEach((m, i) => {
    const e = box(c, [70, 420][i], [1080, 1210][i], 470, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
  return t => {
    const ku = p(t, K.lo - 0.1, 0.3, E.inOutCubic); // todo sube para dejar sitio a la pregunta
    set(blk, { y: -ku * 120, s: 1 - 0.25 * ku, o: 1 - ku });
    popA(osea, t, K.osea, { rise: 30 });
    WD.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.3), o: t < w.t - 0.03 ? 0 : 1 }));
    set(gl, { s: pop(t, K.cancion3, 0.45) * (1 - ku), r: t * 20, o: t < K.cancion3 || ku >= 1 ? 0 : 1 });
    gl.querySelectorAll('.mr').forEach((m, i) => m.setAttribute('rx', f1(Math.abs(Math.cos(t * 1.5 + i * 0.8)) * 180)));
    OB.forEach((n, i) => { const a = t * 2.2 + i * 1.256; set(n, { x: Math.cos(a) * 280, y: Math.sin(a) * 110 - 60, s: pop(t, K.cantada + i * 0.06, 0.3) * (1 - ku), r: Math.sin(t * 4 + i) * 15, o: t < K.cantada || ku >= 1 ? 0 : 1 }); });
    SIL2.forEach((f, i) => { set(f.d, { y: Math.abs(Math.sin(t * 6 + i)) * -12 + ku * 600, o: t < K.mundo - 0.3 || ku >= 1 ? 0 : 1 }); face(f, t, { jaw: t < K.era ? 0.3 + 0.3 * Math.sin(t * 12 + i) : 0.6 }); });
    const kb = p(t, K.era - 0.02, 0.2, E.outBack);
    set(big, { s: t < K.era - 0.02 ? 0 : lerp(1.6, 1, kb) * (1 - 0.45 * ku), y: -ku * 760, r: -3, o: t < K.era - 0.02 ? 0 : 1 });
    big.style.textShadow = (glitch(t, K.pago, 0.3) ? glitch(t, K.pago, 0.3) + ', ' : '') + `10px 10px 0 ${INK}, -5px -5px 0 ${INK}, 5px -5px 0 ${INK}, -5px 5px 0 ${INK}`;
    set(regS.d, { s: pop(t, K.pago, 0.3) * (1 - ku), r: Math.sin(t * 30) * (t > K.pago && t < K.pago + 0.4 ? 3 : 0), o: t < K.pago || ku >= 1 ? 0 : 1 });
    if (t > K.pago) gl.style.visibility = 'hidden';
    popA(q, t, K.lo, { rise: 40 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const t1 = K.sabias + 0.1 + i * 0.12; const press = t > t0 + 0.3 && t < t0 + 0.45; set(b, { s: pop(t, t1, 0.4) * (press ? 0.9 : 1 + 0.06 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < t1 ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.45 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (última frase) — copiado del Ep. 10
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
   L · …EN EL LIBRO — el libro HISTORIA se cierra (tarta encima)
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
    set(bookW, { s: 1.25 * pop(t, S.L2[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
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
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:36px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 20 · Cantar Cumpleaños feliz costaba dinero</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
