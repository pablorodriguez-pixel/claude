/* Ep. 26 · escenas L11–L12 (votación, balcón, libro HISTORIA) — adaptadas del Ep. 24 */
/* ======================================================================
   T · VOTACIÓN «EL PRÓXIMO LO ELEGÍS: A, B o C»
   ====================================================================== */
headline(S.T[0], S.T[1], 'El próximo *lo elegís*', { size: 100, hlT: K.elegis, y: 262 });
K.vota = K.A11 - 0.12;
{
  const CT = [K.alejandro, K.cero, K.napoleon], LT = [K.A11, K.B11, K.C11];
  const CDS = [];
  const c = scene(S.T[0], S.T[1], t => {
    CDS.forEach((q, i) => {
      const t0 = S.T[0] + 0.05 + i * 0.1, kin = p(t, t0, 0.4, E.outCubic);
      const kf = p(t, CT[i] - 0.1, 0.35, E.inOutCubic), sx = Math.cos(kf * Math.PI);
      q.flip.style.transform = `scaleX(${f1(Math.max(0.02, Math.abs(sx)) * 1000) / 1000})`;
      q.front.style.display = sx < 0 ? '' : 'none'; q.back.style.display = sx < 0 ? 'none' : '';
      const act = t > CT[i] && (i === 2 ? t < K.vota : t < CT[i + 1]);
      const vb = t > LT[i] && t < LT[i] + 0.5 ? Math.sin((t - LT[i]) / 0.5 * Math.PI) : 0;
      set(q.e, { y: (1 - kin) * 1200 - (act ? 20 : 0) - vb * 40, s: ((act ? 1.06 : 1) + vb * 0.08) * 0.93, r: q.r + wobble(t, 0.4, 0.8, i) });
      q.glow.style.opacity = act || vb > 0 ? 1 : 0;
    });
    // B: las letras O y K; C: Napoleón y el tallímetro
    [bo, bk].forEach((f, i) => { set(f.d, { y: wobble(t, 0.7, 4, i), r: [-5, 5][i] }); sortFace(f, t, { look: [0, -2], open: t > K.cero && t < K.napoleon ? 0.4 : 0, bL: 10, bR: 10, aL: 20, aR: 20, seed: i }); });
    nface(nap, t, { look: [-4, 0], seed: 0.5, angry: t > K.napoleon ? 0.6 : 0, mouth: t > K.napoleon ? 'S' : 'N' });
    set(alx.d, { y: wobble(t, 0.5, 3) }); face(alx, t, { look: [3, 0], seed: 0.9 });
    R.setH(1.68);
    const kv = p(t, K.vota - 0.05, 0.35, E.outBack);
    set(vt, { s: kv, o: t > K.vota - 0.05 ? 1 : 0, r: -2 });
    set(hand, { o: t > K.vota ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.vota, 0.3) });
    set(cam0, { s: 1 + 0.03 * p(t, S.T[0], S.T[1] - S.T[0], E.linear) });
  }, { clip: true });
  const cam0 = c;
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.05) 0 3px, transparent 3px 60px)' });
  halftone(c, 'rgba(43,33,24,.05)', 0);
  const NAMES = ['Alejandro<br>Magno', 'los «cero<br>muertos»', 'Napoleón,<br>la revancha'];
  [[60, -3], [360, 2], [655, -2]].forEach(([x, r], i) => {
    const e = box(c, x, 486, 285, 600, { zIndex: 10 + i, transformOrigin: '142px 300px' });
    const glow = box(e, -14, -14, 313, 628, { borderRadius: '40px', background: YEL, opacity: 0, border: `5px solid ${INK}` });
    const flip = box(e, 0, 0, 285, 600, { transformOrigin: '142px 300px' });
    const back = box(flip, 0, 0, 285, 600, { background: '#3a2a1e', border: `6px solid ${INK}`, borderRadius: '28px', boxShadow: `9px 11px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.07) 0 10px, transparent 10px 24px)' });
    el('div', back, { left: '0', top: '180px', width: '273px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: '220px', color: YEL, textShadow: `5px 5px 0 ${INK}` }, '?');
    const front = box(flip, 0, 0, 285, 600, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '28px', boxShadow: `9px 11px 0 ${SH}`, overflow: 'hidden' });
    el('div', front, { left: '0', top: '470px', width: '273px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', lineHeight: 1.08, color: INK }, NAMES[i]);
    [back, front].forEach(f => el('div', f, { left: '14px', top: '12px', width: '84px', height: '84px', borderRadius: '50%', background: [PINK, YEL, '#7ac08a'][i], border: `5px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', lineHeight: '74px', textAlign: 'center', color: INK, zIndex: 5 }, 'ABC'[i]));
    CDS.push({ e, flip, back, front, glow, r });
  });
  const alx = mk(CDS[0].front, [18, 108, 250, 319], alexInner(), '0 0 360 460', 'bust');
  const bo = mkSort(CDS[1].front, [20, 150, 130, 204], 'O'), bk = mkSort(CDS[1].front, [140, 160, 130, 204], 'K');
  el('div', CDS[1].front, { left: '0', top: '370px', width: '273px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', color: RED }, '«0 killed»');
  const NW = box(CDS[2].front, 10, 40, 400, 470, { transformOrigin: '0 0', transform: 'scale(0.8)' });
  const R = mkRuler(NW, 0, 440, 210, { arm: 90, top: 1.9, slZ: 2, z: 3, tagSize: 40 }); R.tag.innerHTML = '1,68';
  const nap = mkMan(NW, 260, 440, 1.68, 210, { seed: 1 }); nap.d.style.zIndex = 4;
  const vt = el('div', c, { left: '120px', top: '1112px', width: '800px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: 1.15, color: '#fff', background: INK, borderRadius: '28px', padding: '4px 0 10px', boxShadow: `8px 8px 0 ${PINK}`, zIndex: 30, whiteSpace: 'nowrap' }, `VOTA <span style="color:${YEL}">A, B o C</span> 👇`);
  const hand = box(c, 760, 1150, 130, 130, { zIndex: 31 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 90, 1.15)}</svg>`;
}

/* ======================================================================
   BAL · «MIL GRACIAS. SOY TU VECINO… Y ESTO NO VENÍA…» — balcón + confeti de papel (del Ep. 23)
   ====================================================================== */
{
  const T0 = S.BAL[0], T1 = S.BAL[1];
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.esto - 0.3, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const thr = t > K.mil12 && t < K.soy;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.5 && t < K.esto ? [0, -5] : t > K.esto ? [-4, 3] : [0, 0], bL: thr ? 10 : t > K.esto ? 6 : 0, bR: thr ? 10 : t > K.esto ? 12 : 0, fan: thr ? Math.sin(t * 22) * 18 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    set(mg, { s: pop(t, K.mil12 - 0.05, 0.35), y: t > K.soy - 0.1 ? -p(t, K.soy - 0.1, 0.2) * 500 : 0, r: -3, o: t > K.mil12 - 0.05 ? 1 : 0 });
    const ks = p(t, K.soy - 0.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, K.soy, 2)) + (1 - ks) * 8, o: t < K.soy - 0.07 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    updConf(CF, t, K.mil12 + 0.1);
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
  const CF = paperConfetti(cam, 40, 63, [PINK, YEL, '#fff', RED, '#8a6a4a'], { z: 45, vy: 1000, x0: 140, xw: 800, y0: 500, spread: 120, dd: 1.2 });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const mg = el('div', cam, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '140px', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 41, whiteSpace: 'nowrap' }, '¡Mil gracias!');
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2], ['y', K.iye], ['esto', K.iye + 1], ['no', K.iye + 2], ['venía…', K.iye + 3]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 3 ? sl1 : sl2).appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   BK · …EN EL LIBRO — el libro HISTORIA se cierra (un milpiés encima: guiño al bucle)
   ====================================================================== */
headline(S.BK[0], LOOP, '…en el *libro.*', { size: 96, hlT: K.libro, y: 150 });
{
  const TC = K.libro - 0.22;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    set(bookW, { x: 210 * 1.25 * p(t, TC + 0.2, 0.25, E.outCubic), s: 1.25 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
  });
  sceneBg(c, { background: '#EADFC8', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.35), rgba(160,110,40,.18) 90%)' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 2 });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="54" fill="${INK}">COLADOS</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="32" fill="${INK}">Aladino · Alí Babá</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:34px;color:#fff;background:${INK};padding:8px 22px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 26 · ¿Aladino, un colado?</span>`);
  const _fe = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _fe(t); popA(epl, t, TC + 0.3, { r: -1 }); };
  // Aladino (la silueta del golpe rosa) se queda FUERA del libro: asoma por detrás de la tapa, con la lámpara
  const sil = mk(bookW, [390, 400, 150, 266], aladInner(), '0 0 260 460', 'bust'); sil.d.style.filter = SIL; sil.d.style.zIndex = 0; sil.d.style.transformOrigin = '50% 100%';
  const slp = box(bookW, 320, 520, 120, 68, { zIndex: 0, filter: SIL, transformOrigin: '80% 50%' }); slp.innerHTML = svgW(lampInner(), '0 0 300 170');
  const _fe2 = SC[SC.length - 1].fn;
  SC[SC.length - 1].fn = t => {
    _fe2(t);
    const ka = p(t, TC + 0.32, 0.4, E.outBack), on = t > TC + 0.3;
    set(sil.d, { y: (1 - ka) * 260, r: on ? -6 + Math.sin(t * 5) * 3 : 0, o: on ? 1 : 0 });
    set(slp, { y: (1 - ka) * 260, x: 0, r: -14 + Math.sin(t * 6) * 6, o: on ? 1 : 0 });
  };
}

