/* Ep. 15 · escenas L0–L4 (todo clavado por texto vía K) */

/* ======================================================================
   A · PORTADA / PREGUNTA — toro gigante mirando el trapo «¿ROJO?»
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1.0 + 0.05 * p(t, 0, 3.2, E.linear) });
    set(ry, { r: t * 6 });
    // trapo: ondea desde el fotograma 0
    const grey = t >= K.no0;
    updCloth(tr, t + 0.6, { col: grey ? GREY : RED, sway: Math.sin(t * 2.4) * 30 });
    tr.lb.textContent = grey ? 'GRIS' : '¿ROJO?';
    set(tr.d, { x: Math.sin(t * 2.4) * 18, r: Math.sin(t * 2.4) * 2 });
    set(hand, { x: Math.sin(t * 2.4) * 18, r: Math.sin(t * 2.4) * 2 });
    flash.style.opacity = grey ? 1 - p(t, K.no0, 0.25) : 0;
    ML.forEach((m, i) => set(m, { x: Math.sin(t * 2.4 + 1) * 10, o: 0.75 - 0.25 * Math.sin(t * 5 + i) }));
    // toro: mira el trapo, bosteza en «le da igual», encoge hombros
    const yw = t > K.le ? p(t, K.le, 0.35) * (1 - p(t, K.rojo0 + 0.25, 0.3)) : 0;
    const shr = t > K.le ? 22 * E.outBack(p(t, K.le, 0.3, E.linear)) * (1 - p(t, K.no0 - 0.1, 0.3)) : 0;
    const bored = t > K.le && t < K.no0;
    set(bull.d, { y: wobble(t, 0.5, 5), x: grey && t < K.no0 + 0.25 ? Math.sin(t * 60) * 6 : 0 });
    bullFace(bull, t, { look: bored ? [0, -4] : [-12, 10], jaw: yw, half: bored, closed: yw > 0.6, shrug: shr, tilt: bored ? -5 * p(t, K.le, 0.3) : 0, bL: bored ? -4 : 12, bR: bored ? -4 : 16, seed: 0.4, blink: !bored && t > 0.3 });
    QM.forEach((q, i) => set(q, { y: Math.sin(t * 4 + i * 2) * 12, r: [-12, 14][i] + Math.sin(t * 3 + i) * 5, s: 1 - p(t, K.le, 0.2), o: 1 - p(t, K.le, 0.2) }));
    set(zz, { s: pop(t, K.igual, 0.35), y: -p(t, K.igual, 1.2, E.linear) * 40, r: -10, o: t < K.igual ? 0 : 1 - p(t, K.no0, 0.2) });
    // título-pregunta + corrección
    stk.style.transform = `scaleX(${f1(p(t, K.le, 0.22, E.outCubic) * 1000) / 1000}) rotate(-3deg)`;
    set(ins, { s: pop(t, K.le, 0.35), r: -6, o: t < K.le ? 0 : 1 });
    set(ttl, { y: -p(t, K.disting - 0.1, 0.25, E.inOutCubic) * 20 });
    popA(nd, t, K.no0 + 0.05, { r: 4 });
    stampA(mito, t, K.disting, -9, 1);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 850px' });
  sceneBg(cam, { background: '#EADFC8' });
  const ry = rays(cam, -110, 120, 1460, 26, 'rgba(200,16,46,.13)', 'rgba(0,0,0,0)', 0);
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 60% 46%, rgba(255,240,200,.55), rgba(255,240,200,0) 55%)', zIndex: 0 });
  const bull = mkBull(cam, [250, 480, 760, 811]); bull.d.style.zIndex = 4;
  const tr = mkCloth(cam, 70, 920, 380, 290, { label: '¿ROJO?', lsz: 88, amp: 34, sp: 3.4, z: 9 });
  const hand = box(cam, -36, 836, 150, 150, { zIndex: 10 }); hand.innerHTML = gripSvg(90);
  const flash = box(cam, 0, 0, 1080, 1920, { background: '#fff', zIndex: 30, opacity: 0 });
  const ML = [0, 1, 2].map(i => { const m = box(cam, 470 + i * 6, 960 + i * 80, 90, 60, { zIndex: 8 }); m.innerHTML = `<svg width="90" height="60" style="overflow:visible"><path d="M0,30 q30,-26 60,-6 M10,48 q24,-16 48,-4" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`; return m; });
  const QM = [qMark(cam, 430, 600, 150), qMark(cam, 880, 580, 130)];
  const zz = el('div', cam, { left: '860px', top: '560px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: '#fff', textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 40 }, 'bah');
  // título (visible desde el fotograma 0): la PREGUNTA
  const ttl = el('div', cam, { left: '30px', top: '176px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '118px', lineHeight: 1.0, color: INK, zIndex: 50 });
  ttl.innerHTML = `¿El toro <span style="position:relative;display:inline-block">odia<span class="stk" style="position:absolute;left:-12px;right:-12px;top:52%;height:16px;background:${RED};border-radius:8px;transform-origin:left center;transform:scaleX(0)"></span></span><br>el ${hlSpan(`<i style="color:${RED}">rojo</i>`, 'th')}?`;
  const stk = ttl.querySelector('.stk'); ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const ins = el('div', ttl, { left: '560px', top: '-46px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: '#fff', background: PINK, padding: '0 24px 8px', border: `4px solid ${INK}`, borderRadius: '14px', boxShadow: `5px 5px 0 ${INK}`, zIndex: 3, whiteSpace: 'nowrap' }, '^ le da igual');
  const nd = chip(cam, 500, 1150, 'no lo distingue', { size: 54, bg: INK, color: YEL, z: 45 });
  const mito = stamp(cam, 170, 690, 'MITO', { size: 230, bw: 20, z: 70, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   B · «LA PRUEBA LA HAS VISTO MIL VECES» — expediente con candado
   ====================================================================== */
headline(S.B[0], S.B[1], 'La *prueba* la has visto mil veces', { size: 84, hlT: K.prueba1 });
function evidence(pa, x, y) {
  const pp = paperPiece(pa, x, y, 760, 500, { seed: 31, bg: '#F3E3B8' });
  box(pp.inner, 0, 0, 742, 482, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 44px)' });
  box(pp.inner, 26, 26, 690, 430, { border: `5px solid ${INK}`, borderRadius: '10px' });
  el('div', pp.inner, { left: '0', top: '56px', width: '742px', textAlign: 'center', fontFamily: 'Rye', fontSize: '150px', lineHeight: 1, color: INK, letterSpacing: '0.04em' }, 'PRUEBA');
  el('div', pp.inner, { left: '0', top: '224px', width: '742px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '42px', color: RED }, 'EXPEDIENTE: EL TORO Y EL ROJO');
  const lk = box(pa, x + 270, y + 280, 220, 275, { zIndex: 12 }); lk.innerHTML = padlockSvg();
  return { pp, lk };
}
{
  const c = scene(S.B[0], S.B[1], t => {
    set(ev.pp.wrap, { y: (1 - p(t, S.B[0] + 0.02, 0.45, E.outBack)) * 900, r: -2 + wobble(t, 0.4, 0.6) });
    const rat = t > K.prueba1 && t < K.prueba1 + 0.5;
    set(ev.lk, { y: (1 - p(t, S.B[0] + 0.1, 0.45, E.outBack)) * 900, r: rat ? Math.sin(t * 50) * 8 : wobble(t, 0.6, 2) });
    setLock(ev.lk, 0);
    set(stk, { s: pop(t, K.prueba1 + 0.15, 0.35), r: 12 + Math.sin(t * 3) * 4, o: t < K.prueba1 + 0.15 ? 0 : 1 });
    const kE = pop(t, K.visto - 0.05, 0.35); set(eyes, { s: kE, o: t < K.visto - 0.05 ? 0 : 1, y: wobble(t, 0.7, 4) });
    const lk = clamp((t - K.visto) / 2); eyes.querySelectorAll('.ep').forEach(q => q.setAttribute('transform', `translate(${f1(Math.sin(t * 2.2) * 9)} ${f1(6)})`));
    eyes.querySelector('.lid').style.opacity = ((t + 0.4) % 2.4) < 0.12 ? 1 : 0; void lk;
    popA(mv, t, K.mil, { r: -5 });
    popA(sd, t, K.sin, { r: 3 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const ev = evidence(c, 160, 480);
  const stk = el('div', c, { left: '830px', top: '420px', width: '150px', height: '150px', borderRadius: '50%', background: PINK, border: `6px solid ${INK}`, boxShadow: `6px 7px 0 ${SH}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: '140px', textAlign: 'center', color: '#fff', zIndex: 20 }, '?');
  const eyes = box(c, 600, 1000, 360, 160, { zIndex: 25 });
  eyes.innerHTML = `<svg width="360" height="160" style="overflow:visible">${cut('<ellipse cx="90" cy="80" rx="80" ry="64"/><ellipse cx="270" cy="80" rx="80" ry="64"/>', 6, 8)}<ellipse cx="90" cy="80" rx="80" ry="64" fill="#fff" stroke="${INK}" stroke-width="7"/><ellipse cx="270" cy="80" rx="80" ry="64" fill="#fff" stroke="${INK}" stroke-width="7"/><g class="ep"><circle cx="90" cy="84" r="28" fill="${INK}"/><circle cx="270" cy="84" r="28" fill="${INK}"/><circle cx="80" cy="74" r="9" fill="#fff"/><circle cx="260" cy="74" r="9" fill="#fff"/></g><g class="lid" style="opacity:0"><ellipse cx="90" cy="80" rx="82" ry="66" fill="${FIG}" stroke="${INK}" stroke-width="7"/><ellipse cx="270" cy="80" rx="82" ry="66" fill="${FIG}" stroke="${INK}" stroke-width="7"/></g></svg>`;
  const mv = chip(c, 640, 1180, 'mil veces', { size: 50, bg: '#fff', color: INK, z: 30 });
  const sd = chip(c, 440, 1262, 'sin darte cuenta', { size: 50, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   C1 · LOS TOROS VEN POCOS COLORES — paleta de pintor
   ====================================================================== */
headline(S.C1[0], S.C1[1], 'Los toros ven *pocos colores*', { size: 86, hlT: K.pocos });
{
  const BL = [];
  const c = scene(S.C1[0], S.C1[1], t => {
    set(bull.d, { y: wobble(t, 0.5, 4), s: pop(t, S.C1[0] + 0.02, 0.4) });
    bullFace(bull, t, { look: [12, 0], half: t > K.pocos, bL: t > K.pocos ? 4 : 10, bR: t > K.pocos ? 14 : 10, seed: 1.1 });
    set(pal, { s: pop(t, S.C1[0] + 0.12, 0.4), r: -6 + wobble(t, 0.4, 1.5) });
    BL.forEach((b, i) => {
      const t0 = K.pocos + 0.05 + b.k * 0.11;
      const off = b.off && t > t0;
      b.e.setAttribute('fill', off ? GREY : b.col);
      const kx = p(t, t0, 0.16); b.x.style.opacity = off ? 1 : 0; b.x.setAttribute('transform', `translate(${b.cx} ${b.cy}) scale(${f1(off ? lerp(1.6, 1, kx) * 100 : 0) / 100})`);
    });
    popA(pc, t, K.colores, { r: -4 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  const bull = mkBull(c, [40, 470, 470, 501]); bull.d.style.zIndex = 4;
  const pal = box(c, 500, 470, 540, 470, { zIndex: 6 });
  const palD = 'M270,20 C420,10 530,90 528,220 C526,330 440,420 330,440 C250,452 230,400 190,396 C140,392 110,444 60,420 C10,396 6,300 20,220 C40,110 130,28 270,20 Z';
  const hole = 'M150,320 a34,28 0 1,0 68,0 a34,28 0 1,0 -68,0 Z';
  const COLS = [[RED, 140, 140, true], [BLUE, 270, 90, false], [GREEN, 400, 130, true], [CAPY, 440, 260, false], ['#7B3FA0', 330, 350, true], ['#F2983E', 270, 220, true]];
  let blobs = '';
  COLS.forEach(([col, x, y], i) => blobs += `<g><circle class="bl${i}" cx="${x}" cy="${y}" r="52" fill="${col}" stroke="${INK}" stroke-width="5"/><circle cx="${x - 16}" cy="${y - 18}" r="12" fill="#fff" opacity=".45"/><g class="bx${i}" style="opacity:0"><path d="M-36,-36 L36,36 M36,-36 L-36,36" stroke="#fff" stroke-width="22" stroke-linecap="round"/><path d="M-36,-36 L36,36 M36,-36 L-36,36" stroke="${RED}" stroke-width="12" stroke-linecap="round"/></g></g>`);
  pal.innerHTML = `<svg width="540" height="470" style="overflow:visible">${cut(P(palD), 8, 10)}<path d="${palD} ${hole}" fill="${WOOD}" stroke="${INK}" stroke-width="6" fill-rule="evenodd"/><path d="${palD} ${hole}" fill="url(#hW)" opacity=".25" fill-rule="evenodd"/>${blobs}</svg>`;
  let k = 0; COLS.forEach(([col, x, y, off], i) => { BL.push({ e: pal.querySelector('.bl' + i), x: pal.querySelector('.bx' + i), col, off, k: off ? k++ : 0, cx: x, cy: y }); });
  const pc = chip(c, 600, 980, 'pocos colores', { size: 54, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   C2 · SIN RECEPTORES PARA EL ROJO — COMO ALGUNAS PERSONAS DALTÓNICAS
   ====================================================================== */
headline(S.C2[0], K.como - 0.05, 'No tienen receptores para el *rojo*', { size: 80, hlT: K.rojo2 });
headline(K.como - 0.05, S.C2[1], 'Como algunas personas *daltónicas*', { size: 80, hlT: K.dalt });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    const out = p(t, K.como - 0.15, 0.3, E.inCubic);
    set(card.wrap, { y: (1 - p(t, S.C2[0] + 0.02, 0.4, E.outBack)) * 900 - out * 1300, r: -1.5 + wobble(t, 0.4, 0.5) });
    SK.forEach((q, i) => popA(q, t, K.recep + 0.05 + i * 0.14, { r: 0 }));
    const kx = p(t, K.rojo2, 0.16); set(xr, { s: t < K.rojo2 ? 0 : lerp(1.7, 1, kx), o: t < K.rojo2 ? 0 : 1 });
    set(emp, { r: t > K.rojo2 ? Math.sin(t * 30) * 3 * (1 - p(t, K.rojo2, 0.5)) : 0 });
    // segunda mitad: retratos
    [fL, fR].forEach((f, i) => set(f, { s: pop(t, K.como + 0.05 + i * 0.25, 0.42), r: [-4, 4][i] + wobble(t, 0.5, 1, i), o: t < K.como + 0.05 + i * 0.25 ? 0 : 1 }));
    bullFace(bL, t, { look: [6, 2], seed: 0.2 }); face(per, t, { look: [-4, 0], seed: 1.4 });
    set(apx, { s: pop(t, K.personas, 0.35), o: t < K.personas ? 0 : 1, r: Math.sin(t * 4) * 4 });
    popA(dch, t, K.dalt + 0.1, { r: -3 });
    [xL, xR].forEach((x, i) => popA(x, t, K.dalt + 0.35 + i * 0.12, { r: -8 }));
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const card = paperPiece(c, 100, 480, 880, 470, { seed: 44, bg: '#FBF6EA' });
  el('div', card.inner, { left: '0', top: '20px', width: '862px', textAlign: 'center', fontFamily: 'Rye', fontSize: '58px', color: INK }, 'RECEPTORES DEL TORO');
  box(card.inner, 40, 96, 782, 5, { background: INK });
  const SK = []; let emp, xr;
  [[0, BLUE, true], [1, CAPY, true], [2, RED, false]].forEach(([i, col, ok]) => {
    const x = 70 + i * 260;
    const sk = box(card.inner, x, 130, 210, 280, { zIndex: 3 });
    const cone = `<path d="M105,40 L170,200 Q105,240 40,200 Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M105,40 L170,200 Q105,240 40,200 Z" fill="url(#hA)" opacity=".35"/><circle cx="105" cy="40" r="16" fill="${FIG}" stroke="${INK}" stroke-width="5"/>`;
    sk.innerHTML = `<svg width="210" height="280" style="overflow:visible"><rect x="6" y="6" width="198" height="268" rx="20" fill="${ok ? '#fff' : 'rgba(200,16,46,.08)'}" stroke="${INK}" stroke-width="5" stroke-dasharray="${ok ? 'none' : '14 10'}"/>${ok ? cone : `<path d="M105,40 L170,200 Q105,240 40,200 Z" fill="none" stroke="${RED}" stroke-width="5" stroke-dasharray="12 10"/>`}</svg>`;
    if (ok) { SK.push(sk); const ck = box(sk, 140, 200, 80, 80, { zIndex: 4 }); ck.innerHTML = CHECK; }
    else { emp = sk; xr = box(card.inner, x - 10, 150, 230, 230, { zIndex: 6 }); xr.innerHTML = XSVG; el('div', sk, { left: '0', top: '-4px', width: '210px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: RED }, 'ROJO'); }
  });
  const mkF = (x, lbl, col) => { const f = box(c, x, 470, 400, 470, { zIndex: 4 }); box(f, 0, 0, 400, 470, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '200px 200px 24px 24px', boxShadow: `10px 12px 0 ${SH}` }); box(f, 20, 20, 360, 360, { background: '#F4ECDB', borderRadius: '180px 180px 10px 10px', overflow: 'hidden', border: `4px solid ${BRASS}` }); el('div', f, { left: '20px', top: '392px', width: '360px', textAlign: 'center', background: col, color: INK, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '40px', lineHeight: 1.05, padding: '8px 0 10px', border: `4px solid ${INK}`, borderRadius: '10px' }, lbl); return f; };
  const fL = mkF(90, 'el toro', YEL), fR = mkF(590, 'algunas personas', '#fff');
  const bL = mkBull(fL.children[1], [-10, 40, 380, 405]);
  const per = mk(fR.children[1], [10, 30, 340, 434], bustInner({ uniform: 'farmer', seed: 12 }) + specsOver(), '0 0 360 460', 'bust');
  const apx = el('div', c, { left: '488px', top: '600px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 20 }, '≈');
  const dch = chip(c, 560, 990, 'daltónicas', { size: 56, bg: PINK, z: 30 });
  const rx = (x) => { const d = box(c, x, 800, 110, 110, { zIndex: 25 }); d.innerHTML = `<svg width="110" height="110" style="overflow:visible"><rect x="6" y="6" width="98" height="98" rx="18" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg><div style="position:absolute;left:-10px;top:-10px;width:130px;height:130px">${XSVG}</div>`; return d; };
  const xL = rx(380), xR = rx(880);
}

/* ======================================================================
   C3 · TÚ VES / EL TORO VE — pantalla partida
   ====================================================================== */
headline(S.C3[0], S.C3[1], 'Para ellos, el rojo es *un gris más*', { size: 80, hlT: K.gris });
{
  const c = scene(S.C3[0], S.C3[1], t => {
    [pL, pR].forEach((q, i) => set(q, { y: (1 - p(t, S.C3[0] + i * 0.12, 0.4, E.outBack)) * 1000, r: [-2, 2][i] }));
    updCloth(cL, t, { sway: Math.sin(t * 2.4) * 20 });
    const kg = p(t, K.gris - 0.05, 0.3);
    const mix = (a, b, k) => { const h = s => [1, 3, 5].map(j => parseInt(s.substr(j, 2), 16)); const A = h(a), B = h(b); return `rgb(${A.map((v, j) => Math.round(lerp(v, B[j], k))).join(',')})`; };
    updCloth(cR, t, { sway: Math.sin(t * 2.4) * 20, col: mix(RED, GREY, kg) });
    flR.style.opacity = t > K.gris - 0.05 ? 0.9 * (1 - p(t, K.gris - 0.05, 0.3)) : 0;
    popA(lT, t, S.C3[0] + 0.3, { r: -3 }); popA(lB, t, S.C3[0] + 0.45, { r: 3 });
    set(eyeR.d, { y: wobble(t, 0.5, 3) }); bullFace(eyeR, t, { look: [-6, 6], half: t > K.gris, seed: 0.9 });
    popA(gm, t, K.gris + 0.25, { r: -4 });
    GS.forEach((g, i) => popA(g, t, K.gris + 0.35 + i * 0.1, { r: [-8, 6, -4][i] }));
  });
  sceneBg(c, { background: '#EFE1C6' });
  const panel = (x, bg) => { const d = box(c, x, 480, 470, 470, { zIndex: 4, background: bg, border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `10px 12px 0 ${SH}`, overflow: 'hidden' }); return d; };
  const pL = panel(60, '#F7EEDC'), pR = panel(550, '#E2DED6');
  box(pR, 0, 0, 460, 520, { backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.07) 0 3px, transparent 3px 14px)' });
  const cL = mkCloth(pL, 90, 120, 280, 230, { amp: 26 }), cR = mkCloth(pR, 90, 120, 280, 230, { amp: 26 });
  const flR = box(pR, 0, 0, 460, 520, { background: '#fff', zIndex: 20, opacity: 0 });
  const lT = chip(c, 90, 452, 'TÚ VES', { size: 52, bg: PINK, z: 30 });
  const lB = chip(c, 600, 452, 'EL TORO VE', { size: 52, bg: INK, color: '#fff', z: 30 });
  const eyeR = mkBull(c, [840, 800, 170, 181]); eyeR.d.style.zIndex = 26;
  const gm = chip(c, 560, 990, 'un gris más', { size: 54, bg: '#fff', color: INK, z: 30 });
  const GS = [[860, 1060, '#9a948c'], [930, 1110, GREY], [800, 1120, '#b2aca3']].map(([x, y, col]) => swatch(c, x, y, 70, col, 28));
}

/* ======================================================================
   D1 · ¿ENTONCES POR QUÉ EMBISTEN? — toro de perfil escarbando
   ====================================================================== */
headline(S.D1[0], S.D1[1], '¿Entonces por qué *embisten*?', { size: 86, hlT: K.embisten });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const go = t > K.embisten;
    set(bs.d, { x: go ? -40 * p(t, K.embisten, 0.3) + Math.sin(t * 30) * 3 : 0, y: wobble(t, 0.6, 3), r: go ? -3 : 0 });
    bullRun(bs, t, { sp: go ? 16 : 0, amp: go ? 18 : 0, look: [-6, 2] });
    if (!go) { const k = Math.sin(t * 9); bs.L[0].setAttribute('transform', `rotate(${f1(k * 22 - 6)} 330 330)`); }
    DU.forEach((d, i) => { const ph = (t * 1.8 + i * 0.33) % 1; set(d, { x: -ph * 120 - i * 30, y: -ph * 70, s: 0.5 + ph, o: (1 - ph) * 0.9 }); });
    SN.forEach((d, i) => { const ph = (t * 2.2 + i * 0.5) % 1; set(d, { x: -ph * 90, y: ph * 30, s: 0.6 + ph * 0.8, o: (1 - ph) }); });
    set(qq, { s: pop(t, K.L3 + 0.1, 0.4), r: 10 + Math.sin(t * 4) * 6, o: t < K.L3 + 0.1 ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DCC0' });
  rays(c, -170, 400, 1420, 24, 'rgba(255,62,165,.10)', 'rgba(0,0,0,0)', 0);
  ground(c, 1010);
  const bs = mkBullS(c, [130, 470, 860, 535]); bs.d.style.zIndex = 5;
  const DU = [0, 1, 2].map(() => box(c, 380, 950, 90, 60, { borderRadius: '50%', background: '#D9C7A6', border: `4px solid ${INK}`, zIndex: 6 }));
  const SN = [0, 1].map((k) => { const d = box(c, 210, 840 + k * 30, 70, 40, { zIndex: 7 }); d.innerHTML = `<svg width="70" height="40" style="overflow:visible"><path d="M60,20 q-20,-18 -40,0 q-14,12 -20,0" stroke="${INK}" stroke-width="5" fill="#fff"/></svg>`; return d; });
  const qq = qMark(c, 780, 400, 240);
}

/* ======================================================================
   D2 · POR EL MOVIMIENTO — el trapo se mueve con estelas, el toro lo sigue
   ====================================================================== */
headline(S.D2[0], K.van - 0.05, 'Por el *movimiento*', { size: 104, hlT: K.movim });
headline(K.van - 0.05, S.D2[1], 'Van a por lo que *se mueve*', { size: 88, hlT: K.mueve });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    const f = 2.6, X = 230 * Math.sin((t - S.D2[0]) * f), V = 230 * f * Math.cos((t - S.D2[0]) * f);
    updCloth(cl, t, { sway: -V * 0.05, trailDx: V * 0.09, amp: 30 });
    set(cl.d, { x: X, r: -V * 0.006 });
    const lx = clamp(X / 230, -1, 1);
    set(bull.d, { y: wobble(t, 0.6, 3), r: lx * 6, x: lx * 14 });
    bullFace(bull, t, { look: [lx * 13, -6], tilt: lx * 4, bL: 14, bR: 14, blink: false });
    SP.forEach((s, i) => { const ph = (t * 1.6 + i / 3) % 1; set(s, { x: X - Math.sign(V) * (60 + ph * 80), y: Math.sin(i * 2 + t) * 20, o: (1 - ph) * Math.min(1, Math.abs(V) / 300), s: 0.7 + ph * 0.4 }); });
    popA(mch, t, K.mueve + 0.05, { r: -4 });
    set(arr, { s: pop(t, K.van, 0.4), o: t < K.van ? 0 : 1, r: lx * 10 });
  });
  sceneBg(c, { background: '#EFE1C6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 3px, transparent 3px 60px)' });
  const cl = mkCloth(c, 400, 460, 280, 230, { amp: 30, trails: 3, z: 8 });
  const SP = [0, 1, 2].map(() => el('div', c, { left: '520px', top: '540px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 7 }, '≡'));
  const bull = mkBull(c, [430, 830, 520, 555]); bull.d.style.zIndex = 4;
  const arr = box(c, 610, 730, 120, 110, { zIndex: 9 }); arr.innerHTML = arrowSvg('M60,100 L60,10 M30,40 L60,8 L90,40', PINK, 12);
  const mch = chip(c, 480, 1270, 'lo que se mueve ✔', { size: 44, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   E1 · «Y AQUÍ ESTÁ LA PRUEBA» — el candado se abre ✔
   ====================================================================== */
headline(S.E1[0], S.E1[1], 'Y aquí está *la prueba*', { size: 96, hlT: K.prueba2 });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    set(ev.pp.wrap, { s: 1 + 0.04 * p(t, S.E1[0], 1.5, E.linear), r: -2 });
    const kO = p(t, K.prueba2, 0.35, E.outBack);
    setLock(ev.lk, kO);
    set(ev.lk, { r: t > K.prueba2 && t < K.prueba2 + 0.2 ? Math.sin(t * 60) * 6 : 0, y: kO * 10 });
    set(ok, { s: pop(t, K.prueba2 + 0.2, 0.35), r: -8, o: t < K.prueba2 + 0.2 ? 0 : 1 });
    SPK.forEach((s, i) => { const t0 = K.prueba2 + 0.2 + i * 0.07; set(s, { s: pop(t, t0, 0.3) * (0.8 + 0.2 * Math.sin(t * 9 + i)), r: t * 140, o: t < t0 ? 0 : 1 }); });
    set(gl, { r: t * 14, o: t > K.prueba2 ? p(t, K.prueba2, 0.3) : 0 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  const gl = rays(c, -170, 340, 1420, 22, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 0);
  const ev = evidence(c, 160, 480);
  const ok = box(c, 700, 760, 230, 230, { zIndex: 30 }); ok.innerHTML = `<svg width="230" height="230" style="overflow:visible"><circle cx="121" cy="123" r="105" fill="${SH}"/><circle cx="115" cy="115" r="108" fill="#fff"/><circle cx="115" cy="115" r="98" fill="${YEL}" stroke="${INK}" stroke-width="7"/><g transform="translate(40,40) scale(1.5)">${CHECK.replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`;
  const SPK = [[220, 430], [880, 470], [140, 980], [560, 1060]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 31 }, '✦'));
}

/* ======================================================================
   E2 · EL CAPOTE (1.ª parte de la corrida) ES ROSA Y AMARILLO
   ====================================================================== */
headline(S.E2[0], K.es4 - 0.05, 'El *capote*…', { size: 110, hlT: K.capote });
headline(K.es4 - 0.05, S.E2[1], '…es *rosa* y *amarillo*', { size: 104 });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    const tf = K.amarillo - 0.12, kf = p(t, tf, 0.3, E.inOutCubic), sx = Math.abs(1 - 2 * kf) || 0.02;
    const yel = kf >= 0.5;
    updCloth(cap, t, { col: yel ? CAPY : CAPP, amp: 46, sway: Math.sin(t * 1.8) * 30 });
    if (cap.ln) cap.ln.setAttribute('fill', yel ? CAPP : CAPY);
    set(cap.d, { s: pop(t, S.E2[0] + 0.02, 0.45), sx: Math.max(0.02, sx), y: wobble(t, 0.6, 4) });
    HN.forEach((h, i) => set(h, { x: (i ? 1 : -1) * (1 - sx) * 380, s: pop(t, S.E2[0] + 0.1, 0.4), o: 1, r: wobble(t, 0.6, 3, i) }));
    popA(pc, t, K.primera, { r: -3 });
    popA(lr, t, K.rosa, { r: -6 }); popA(ly, t, K.amarillo, { r: 5 });
    set(ar1, { s: pop(t, K.rosa + 0.05, 0.3), o: t < K.rosa + 0.05 ? 0 : 1 });
    set(ar2, { s: pop(t, K.amarillo + 0.05, 0.3), o: t < K.amarillo + 0.05 ? 0 : 1 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -170, 380, 1420, 24, 'rgba(255,62,165,.12)', 'rgba(0,0,0,0)', 0);
  const cap = mkCloth(c, 170, 470, 740, 520, { col: CAPP, lining: CAPY, amp: 46, sp: 2.6, z: 8 });
  cap.d.style.transformOrigin = '540px 700px';
  const HN = [box(c, 90, 380, 170, 170, { zIndex: 9 }), box(c, 820, 380, 170, 170, { zIndex: 9 })];
  HN[0].innerHTML = gripSvg(150); HN[1].innerHTML = gripSvg(-150);
  const pc = chip(c, 70, 1110, 'el de la primera parte de la corrida', { size: 42, bg: INK, color: '#fff', z: 30 });
  const lr = chip(c, 90, 1220, 'ROSA', { size: 66, bg: CAPP, z: 30 });
  const ly = chip(c, 560, 1220, 'AMARILLO', { size: 66, bg: CAPY, color: INK, z: 30 });
  const ar1 = box(c, 160, 1010, 120, 120, { zIndex: 29 }); ar1.innerHTML = arrowSvg('M60,110 L60,10 M30,40 L60,8 L90,40', PINK, 12);
  const ar2 = box(c, 680, 1010, 120, 120, { zIndex: 29 }); ar2.innerHTML = arrowSvg('M60,110 L60,10 M30,40 L60,8 L90,40', YEL, 12);
}

/* ======================================================================
   E3 · Y EL TORO EMBISTE IGUAL — pasa por debajo del capote
   ====================================================================== */
headline(S.E3[0], S.E3[1], 'Y el toro *embiste igual*', { size: 96, hlT: K.embiste });
{
  const c = scene(S.E3[0], S.E3[1], t => {
    const t0 = K.toro0 > 0 ? K.embiste - 0.55 : 0, kr = clamp((t - t0) / 1.25);
    const bx = lerp(820, -560, E.inOutCubic(kr));
    set(bs.d, { x: bx, y: Math.abs(Math.sin(t * 14)) * -14 });
    bullRun(bs, t, { sp: 18, amp: 30, look: [-6, 0] });
    const near = Math.max(0, 1 - Math.abs(bx + 120) / 420);
    updCloth(cap, t, { amp: 40 + near * 50, sway: -near * 260 * Math.sign(bx + 120 || 1) + Math.sin(t * 2) * 20, sp: 3 + near * 3 });
    set(cap.d, { r: -near * 14, y: wobble(t, 0.6, 3) });
    set(hd, { r: -near * 14 });
    DU.forEach((d, i) => { const ph = (t * 2 + i * 0.25) % 1; set(d, { x: bx + 600 + ph * 140, y: -ph * 60, s: 0.5 + ph, o: kr > 0 && kr < 1 ? (1 - ph) * 0.9 : 0 }); });
    const ks = p(t, K.igual4, 0.17, E.outCubic); set(st, { s: t < K.igual4 ? 0 : lerp(2.2, 1, ks), r: -8, o: t < K.igual4 ? 0 : 1 });
    popA(rc, t, S.E3[0] + 0.1, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DCC0' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  ground(c, 1150);
  const cap = mkCloth(c, 200, 560, 520, 380, { col: CAPP, lining: CAPY, amp: 40, sp: 3, z: 8 });
  const hd = box(c, 130, 470, 150, 150, { zIndex: 9 }); hd.innerHTML = gripSvg(150);
  const bs = mkBullS(c, [300, 640, 760, 452]); bs.d.style.zIndex = 6;
  const DU = [0, 1, 2, 3].map(() => box(c, 0, 1060, 100, 64, { borderRadius: '50%', background: '#D9C7A6', border: `4px solid ${INK}`, zIndex: 5 }));
  const rc = chip(c, 660, 440, 'rosa y amarillo', { size: 42, bg: CAPP, z: 30 });
  const st = stamp(c, 150, 1180, 'EMBISTE IGUAL ✔', { size: 84, bw: 12, z: 40, col: INK, bg: YEL, blend: 'normal' });
}
