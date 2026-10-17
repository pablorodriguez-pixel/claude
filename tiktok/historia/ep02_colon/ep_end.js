/* =====================================================================
   Ep. 2 v2 · escenas NUEVAS (tiempos de la voz nueva, todo por texto)
   ===================================================================== */
WARP = false;
const S_CTA = [CUT_C, K.soy - 0.1], S_BAL = [K.soy - 0.1, K.ye - 0.05], S_BOOK = [K.ye - 0.05, LOOP];

/* ======================================================================
   CTA · ¿TE LO HABÍAN CONTADO ASÍ? SÍ O NO — botones gigantes
   ====================================================================== */
headline(S_CTA[0], K.si - 0.06, '¿Te lo habían *contado* así?', { size: 84, hlT: w('contado') });
headline(K.si - 0.06, S_CTA[1], '*¿Sí o no?*', { size: 124, hlT: K.si });
{
  const CM = [];
  const T0 = S_CTA[0];
  const c = scene(T0, S_CTA[1], t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, T0, 3, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < K.si ? [-4, 3] : [-4, 6], bL: t > K.te && t < K.si ? 12 : 2, bR: t > K.te && t < K.si ? 16 : 6, noCup: true, fan: wobble(t, 0.8, 5), seed: 2 });
    [[bS, K.si], [bN, K.noB]].forEach(([b, t0], i) => { const a = T0 + 0.2 + i * 0.12, press = t > t0 + 0.3 && t < t0 + 0.45; set(b, { s: pop(t, a, 0.4) * (press ? 0.9 : 1 + 0.07 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < a ? 0 : 1 }); });
    set(hand, { o: t > K.si ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.45 ? 14 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const vec = mkVec(c, [470, 430, 440, 545]);
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1020px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(120, 'SÍ', YEL, INK), bN = btn(560, 'NO', '#fff', RED);
  const hand = box(c, 320, 1150, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const cms = [['ERA', '@lucia_4B', 'SÍ, en el cole 😳', K.te + 0.35], ['SAB0', '@marinera_88', 'No, ya lo sabía', K.asi + 0.1]];
  cms.forEach((m, i) => {
    const e = box(c, 40, [560, 720][i], 430, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   MARCA (rápida): SOY TU VECINO… — El Vecino en su balcón (~1,4 s)
   ====================================================================== */
{
  const [T0, T1] = S_BAL;
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const fanFast = t > T0 + 0.1 && t < T0 + 0.6;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.4 ? [0, -5] : [0, 0], bL: fanFast ? 8 : 0, bR: fanFast ? 8 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, T0, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: (1 - ks) * 8 + Math.sin(t * 2.4) * 1.2, o: t < T0 + 0.01 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino + 0.1, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14).keys()].map(k => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
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
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 46, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  const i0 = find('soy tu vecino');
  [['Soy', i0, sl1], ['tu', i0 + 1, sl1], ['vecino…', i0 + 2, sl2]].forEach(([wd, wi, ln]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; ln.appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   …Y ESTO NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra de golpe
   ====================================================================== */
headline(S_BOOK[0], LOOP, '…y esto no venía en el *libro.*', { size: 84, hlT: K.libro });
{
  const TC = K.libro - 0.15, TD = 0.22;
  const c = scene(S_BOOK[0], LOOP, t => {
    const k = p(t, TC, TD, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + TD;
    stand.d.style.display = sx > 0.25 ? '' : 'none';
    face(stand, t, { look: t > TC - 0.4 ? [6, -5] : [-3, 2], brow: t > TC - 0.4 ? 8 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { x: 270 * p(t, TC, 0.3, E.inOutCubic), s: 1.2 * pop(t, S_BOOK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + TD, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    const kh = p(t, TC + TD, 0.6, E.outCubic); set(hat, { x: kh * 160, y: -kh * 260 + kh * kh * 200, r: kh * 300, o: closed ? 1 : 0 });
    puffs.forEach((f, i) => { const kf = p(t, TC + TD, 0.45, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, TC + TD - 0.02, { r: -1, d: 0.3 });
  }, { cut: true });
  sceneBg(c, { background: '#EADFC8' }); halftone(c, 'rgba(43,33,24,.06)', 0);
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">COLÓN</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">capítulo 1</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stand = mkCol(bookW, [640, 470, 240, 307]); stand.d.style.zIndex = 2;
  const hat = svgBox(bookW, 690, 560, 120, 70, `<path d="M6,60 C-4,20 30,4 60,4 C90,4 124,20 114,60 Q60,48 6,60 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="5"/><path d="M4,52 Q60,38 116,52 L116,66 Q60,52 4,66 Z" fill="${INK}"/>`, '0 0 120 70', { zIndex: 3 });
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 2 · Colón y la Tierra redonda</span>`);
}
