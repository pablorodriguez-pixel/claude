/* Ep. 5 v2 · tramo final nuevo (todo por K, clavado por texto en keys_vik.js) */
const S = {
  I2: [K.pero - 0.06, K.yeran - 0.1], I3: [K.yeran - 0.1, K.osea - 0.12], J1: [K.osea - 0.12, K.disenoP - 0.08],
  HIT: [K.disenoP - 0.08, K.soy - 0.12], BAL: [K.soy - 0.12, K.yesto - 0.04], BOOK: [K.yesto - 0.04, LOOP],
};
const CTA0 = K.te - 0.1;

/* ======================================================================
   I2 · PERO ≈ 2.000 AÑOS ANTES DE LOS VIKINGOS — línea de tiempo
   ====================================================================== */
headline(S.I2[0], S.I2[1], 'Pero *dos mil años* antes', { size: 84, hlT: K.dos });
{
  const a = S.I2[0];
  const c = scene(S.I2[0], S.I2[1], t => {
    const kl = p(t, a + 0.02, 0.35, E.outCubic); set(line, { sx: Math.max(0.001, kl), o: 1 });
    popA(vx.d, t, a + 0.05, { r: -4, rise: 100 }); popA(cB, t, a + 0.2, { r: -3 });
    brk.style.strokeDashoffset = f1((1 - p(t, K.dos, 0.8, E.inOutCubic)) * 1000) / 1000;
    const kn = p(t, K.dos, 0.18, E.outCubic); // cifra final directa (sin contar), golpe de sello
    set(numW, { s: (t < K.dos ? 0 : lerp(2.3, 1, kn)) * (t > K.anos ? 1 + 0.08 * (1 - p(t, K.anos, 0.4)) : 1), r: -2, o: t < K.dos ? 0 : clamp(kn * 2) });
    popA(cA, t, K.antes, { r: -2 });
    popA(vk.d, t, K.vikL7 - 0.12, { rise: 100 }); popA(cV, t, K.vikL7, { r: 3 });
    face(vk, t, { look: [-5, 0], bL: t > K.vikL7 + 0.3 ? 10 : 0, bR: t > K.vikL7 + 0.3 ? 10 : 0, seed: 0.2 });
  });
  const line = box(c, 80, 900, 880, 16, { background: INK, borderRadius: '8px', transformOrigin: '0 50%', zIndex: 2 });
  box(c, 0, 0, 1080, 1920, { zIndex: 2 }).innerHTML = `<svg width="1080" height="1920"><path d="M960,908 l-34,-24 v48 Z" fill="${INK}"/><circle cx="250" cy="908" r="20" fill="${YEL}" stroke="${INK}" stroke-width="6"/><circle cx="790" cy="908" r="20" fill="${PINK}" stroke="${INK}" stroke-width="6"/></svg>`;
  const vx = mk(c, [110, 560, 290, 305], veksoInner(), '0 0 400 420', 'vx');
  const vk = mkVik(c, [650, 520, 280, 373], { horns: false, axe: false, seed: 39 });
  const cB = chip(c, 110, 950, 'Edad del Bronce', { size: 40, bg: BRONZE, color: INK });
  const cV = chip(c, 690, 950, 'vikingos', { size: 40, bg: INK, color: YEL });
  const bL = box(c, 0, 0, 1080, 1920, { zIndex: 3 }); bL.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="brk" d="M790,870 Q520,700 250,870" pathLength="1" stroke-dasharray="1" stroke="${PINK}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
  const brk = bL.querySelector('.brk');
  const numW = box(c, 200, 1040, 680, 140, { zIndex: 5 });
  const num = el('div', numW, { left: 0, top: 0, width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, textShadow: `6px 6px 0 ${YEL}` }, '≈ ' + fmt(2000));
  const cA = chip(c, 400, 1180, 'años antes', { size: 40, bg: '#fff', color: INK });
}

/* ======================================================================
   I3 · Y ERAN CEREMONIALES
   ====================================================================== */
headline(S.I3[0], S.I3[1], 'Y eran *ceremoniales*', { size: 88, hlT: K.cerem });
{
  const c = scene(S.I3[0], S.I3[1], t => {
    set(rr, { r: t * 10, o: 0.8 });
    [h1, h2].forEach((h, i) => set(h.d, { y: wobble(t, 0.5, 6, i * 0.5), r: (i ? 6 : -6) + wobble(t, 0.4, 2, i), s: pop(t, S.I3[0] + 0.02 + i * 0.1, 0.4) }));
    flames.forEach((f, i) => set(f, { sy: 1 + 0.15 * Math.sin(t * 17 + i * 2), sx: 1 + 0.08 * Math.sin(t * 13 + i), r: Math.sin(t * 9 + i) * 5 }));
    popA(cC, t, K.cerem, { r: -3 });
    popA(wp, t, K.cerem + 0.3, { r: 0 });
    const kx = p(t, K.cerem + 0.42, 0.2, E.outBack); set(wx, { s: lerp(2, 1, kx), o: t < K.cerem + 0.42 ? 0 : 1 });
    popA(cN, t, K.cerem + 0.55, { r: 3 });
  }, { clip: true });
  sceneBg(c, { background: '#e7d3a8' });
  const rr = rays(c, -60, 260, 1200, 24, 'rgba(201,162,74,.35)', 'transparent', 0); rr.style.transformOrigin = '600px 600px';
  const cush = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  cush.innerHTML = `<svg width="1080" height="1920"><g>${cut('<path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z"/>')}<path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z" fill="${CURT}" stroke="${INK}" stroke-width="5"/><path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z" fill="url(#hD)" opacity=".4"/><path d="M270,975 Q540,925 810,975" stroke="${BRASS}" stroke-width="6" fill="none"/><circle cx="240" cy="1066" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="840" cy="1066" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></g>
  <rect x="210" y="1080" width="660" height="220" fill="#cdbf9f" stroke="${INK}" stroke-width="6"/><rect x="210" y="1080" width="660" height="220" fill="url(#hB)" opacity=".5"/><rect x="190" y="1070" width="700" height="30" fill="#efe4ca" stroke="${INK}" stroke-width="5"/></svg>`;
  const flames = [];
  [100, 900].forEach(x => {
    box(c, x - 26, 900, 52, 260, { background: '#f4ecdb', border: `5px solid ${INK}`, borderRadius: '8px', zIndex: 2, backgroundImage: 'linear-gradient(90deg, transparent 60%, rgba(43,33,24,.2) 60%)' });
    const f = box(c, x - 30, 810, 60, 100, { zIndex: 3, transformOrigin: '30px 100px' }); f.innerHTML = `<svg viewBox="0 0 60 100" width="60" height="100"><path d="M30,4 C46,36 56,56 54,74 A24,24 0 0,1 6,74 C4,56 14,36 30,4 Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/><path d="M30,40 C38,56 42,66 40,76 A10,10 0 0,1 20,76 C18,66 22,56 30,40 Z" fill="#ff8a2a"/></svg>`; flames.push(f);
  });
  const h1 = mk(c, [190, 560, 360, 378], veksoInner(), '0 0 400 420', 'vx'); h1.d.style.zIndex = 3;
  const h2 = mk(c, [530, 560, 360, 378], veksoInner(), '0 0 400 420', 'vx'); h2.d.style.zIndex = 3;
  const cC = chip(c, 340, 1140, 'ceremoniales', { size: 50, bg: YEL, color: INK });
  const wp = box(c, 600, 360, 340, 260, { zIndex: 5 }); wp.innerHTML = `<svg viewBox="0 0 260 200" width="100%" height="100%" style="overflow:visible"><g transform="rotate(-35 130 100)">${cut('<rect x="30" y="88" width="200" height="22" rx="6"/>', 4, 5)}<rect x="30" y="88" width="160" height="22" rx="4" fill="${IRON}" stroke="${INK}" stroke-width="4"/><rect x="186" y="78" width="14" height="42" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><rect x="200" y="90" width="40" height="18" fill="${WOOD}" stroke="${INK}" stroke-width="3"/></g><g transform="rotate(35 130 100)"><rect x="30" y="88" width="200" height="14" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M30,70 C60,70 70,120 30,124 Z" fill="${IRON}" stroke="${INK}" stroke-width="4"/></g></svg>`;
  const wx = box(c, 710, 430, 120, 120, { zIndex: 6 }, XSVG);
  const cN = chip(c, 580, 640, 'no para la guerra', { size: 36, bg: RED, color: '#fff' });
}

/* ======================================================================
   J1 · O SEA: LA IMAGEN QUE TIENES DE UN VIKINGO…
   ====================================================================== */
headline(S.J1[0], S.J1[1], 'O sea: la imagen que tienes de un *vikingo*…', { size: 72, hlT: K.vik9 });
{
  const c = scene(S.J1[0], S.J1[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, S.J1[0], S.J1[1] - S.J1[0], E.linear) });
    set(vk.d, { y: wobble(t, 0.5, 3) });
    const lookC = t > K.vik9;
    face(vk, t, { look: lookC ? [0, 1] : [6, -1], bL: lookC ? 14 : 0, bR: lookC ? 14 : 0, jaw: lookC ? 0.35 : 0, seed: 0.9 });
    vk.head.setAttribute('transform', `rotate(${f1(lookC ? -3 : 4)} 210 300)`);
    const ks = p(t, K.sea, 0.45, E.outBack); set(sk.wrap, { s: ks, r: 6 + wobble(t, 0.6, 2), o: t < K.sea ? 0 : 1 });
    set(eq, { o: t > K.imagen ? 1 : 0, s: pop(t, K.imagen, 0.35) });
    set(qm, { o: t > K.vik9 + 0.18 ? 1 : 0, s: pop(t, K.vik9 + 0.18, 0.35), y: Math.sin(t * 5) * 8, r: -10 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  const vk = mkVik(cam, [110, 560, 520, 693], { horns: true, seed: 31 });
  const sk = paperPiece(cam, 620, 520, 340, 420, { seed: 91, bg: '#FBF6EA' });
  sk.inner.innerHTML += `<svg viewBox="0 0 600 700" width="322" height="380" style="position:absolute;left:0;top:0">${sketchFig(true, 'x')}</svg><div style="position:absolute;right:12px;bottom:6px;font-family:SpecialElite;font-size:22px;color:#5a4a3a">Doepler · 1876</div>`;
  const eq = el('div', cam, { left: '560px', top: '640px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 20 }, '=');
  const qm = el('div', cam, { left: '160px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 20 }, '?');
}

/* ======================================================================
   HIT + CTA · GOLPE ROSA citable «la diseñó un SEÑOR para un TEATRO»
   → en «¿Te lo creías?» la misma escena se convierte en botones SÍ / NO
   ====================================================================== */
colorHit(S.HIT[0], S.HIT[1], PINK, c => {
  const stg = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  const dp = mk(stg, [540, 640, 440, 562], doeplerInner(), '0 0 360 460', 'bust'); dp.d.style.filter = SIL; dp.d.style.zIndex = 3;
  const th = box(stg, 70, 620, 460, 560, { zIndex: 3 });
  th.innerHTML = `<svg viewBox="0 0 460 560" width="460" height="560" style="overflow:visible"><path d="M0,560 V120 Q0,0 230,0 Q460,0 460,120 V560 H400 V150 Q400,60 230,60 Q60,60 60,150 V560 Z" fill="${INK}"/><path d="M60,560 V150 Q60,60 230,60 Q400,60 400,150 V560 Z" fill="rgba(0,0,0,.18)"/></svg>`;
  const vk = mk(stg, [140, 760, 320, 427], vikingInner({ horns: true, seed: 31 }), '0 0 420 560', 'vik'); vk.d.style.filter = SIL; vk.d.style.zIndex = 4;
  const pen = box(stg, 560, 900, 60, 300, { zIndex: 5, transformOrigin: '30px 0' }, pencilSvg);
  const t1 = el('div', c, { left: '0', top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.05, color: INK, zIndex: 6, transformOrigin: '540px 0' });
  const parts = [['la diseñó', 0, false], ['un', 2, false], ['SEÑOR', 3, true], ['<br>para', 4, false], ['un', 5, false], ['TEATRO', 6, true]];
  const wsp = parts.map(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; if (q[0].startsWith('<br>')) { t1.appendChild(document.createElement('br')); q[0] = q[0].slice(4); } s.innerHTML = q[2] ? `<span style="font-style:italic;color:#fff;text-shadow:5px 5px 0 ${INK}">${q[0]}</span>` : q[0]; t1.appendChild(s); return { e: s, t: W[K.idis + q[1]].s }; });
  // --- CTA ---
  const qq = el('div', c, { left: '0', top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '118px', lineHeight: 1, color: INK, zIndex: 8, textShadow: '6px 6px 0 #fff' }, '¿Te lo creías?');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1000px', width: '380px', height: '220px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '160px', lineHeight: '206px', color: col, background: bg, border: `9px solid ${INK}`, borderRadius: '44px', boxShadow: `12px 14px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(100, 'SÍ', YEL, INK), bN = btn(580, 'NO', '#fff', RED);
  const hand = box(c, 300, 1150, 160, 200, { zIndex: 40 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const CM = [];
  [['FAR', '@lucas_runas', 'SÍ, toda la vida 😳', K.creias, 70, 600], ['VIK', '@vikinga_de_ciudad', 'No, yo ya lo sabía 😎', K.si, 330, 760]].forEach(m => {
    const e = box(c, m[4], m[5], 0, 104, { width: 'auto', paddingRight: '34px', background: '#fff', border: `4px solid ${INK}`, borderRadius: '52px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 80, m[0], { bw: 3 }).style.position = 'absolute';
    el('div', e, { position: 'relative', marginLeft: '104px', marginTop: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '25px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]).style.position = 'relative';
    el('div', e, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap', marginLeft: '104px' }, m[2]).style.position = 'relative';
    CM.push({ e, t: m[3] });
  });
  return t => {
    const cta = t >= CTA0, kc = p(t, CTA0, 0.22, E.inCubic);
    wsp.forEach(q => { const k = p(t, q.t - 0.1, 0.25, E.outBack); set(q.e, { y: (1 - k) * 40, o: t < q.t - 0.1 ? 0 : 1 }); });
    t1.style.textShadow = glitch(t, K.senor, 0.25) || glitch(t, K.teatro, 0.3);
    set(t1, { s: lerp(1, 0.62, p(t, CTA0, 0.25, E.inOutCubic)), y: lerp(0, -40, p(t, CTA0, 0.25, E.inOutCubic)), o: 1 });
    set(stg, { y: kc * 1300, o: 1 - kc }); stg.style.display = t > CTA0 + 0.25 ? 'none' : '';
    set(dp.d, { y: wobble(t, 0.6, 4), r: Math.sin(t * 2) * 2 });
    set(vk.d, { y: -Math.abs(Math.sin(t * 6)) * 14, r: Math.sin(t * 6) * 4 });
    set(pen, { x: Math.sin(t * 8) * 18, r: -20 + Math.sin(t * 8) * 8 });
    const q0 = CTA0 + 0.18, kq = p(t, q0, 0.28, E.outBack); set(qq, { s: t >= q0 ? lerp(1.3, 1, kq) : 0, r: -2, o: t >= q0 ? clamp(kq * 2) : 0 });
    [[bS, K.si], [bN, K.no]].forEach(([b, t0], i) => { const a0 = K.te + 0.05 + i * 0.12; const press = t > t0 + 0.12 && t < t0 + 0.28; set(b, { s: pop(t, a0, 0.4) * (press ? 0.9 : 1 + 0.07 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < a0 ? 0 : 1 }); });
    const hx = lerp(0, 480, p(t, K.no - 0.12, 0.15, E.inOutCubic));
    set(hand, { o: t > K.si - 0.15 ? 1 : 0, x: hx, y: ((t > K.si + 0.1 && t < K.si + 0.28) || (t > K.no + 0.1 && t < K.no + 0.28) ? 16 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si - 0.15, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   BAL · SOY TU VECINO… — El Vecino en su balcón (rápido)
   ====================================================================== */
headline(S.BAL[0], S.BAL[1], 'Soy tu *vecino*…', { size: 96, hlT: K.vecino });
{
  const c = scene(S.BAL[0], S.BAL[1], t => {
    const ex = p(t, S.BAL[1] - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.12 - 0.08 * p(t, S.BAL[0], 0.5, E.outCubic), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino ? [0, -2] : [0, 0], bL: t > K.tu ? 10 : 0, bR: t > K.tu ? 14 : 0, fan: Math.sin(t * 22) * 14, seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
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
}

/* ======================================================================
   BOOK · …Y ESTO NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra de golpe
   ====================================================================== */
headline(S.BOOK[0], LOOP, '…no venía en el *libro.*', { size: 96, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BOOK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    face(stand, t, { look: t > TC - 0.25 ? [6, -5] : [-3, 2], seed: 1, jaw: t > TC - 0.2 ? 0.5 : 0, bL: t > TC - 0.25 ? 14 : 0, bR: t > TC - 0.25 ? 14 : 0 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, S.BOOK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    hrn.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 0.5) * 260 * kf, y: -kf * 220 + kf * kf * 160, r: t * (i ? 300 : -300), o: closed ? 1 : 0 }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 10; i++) lines += `<path d="M180,${850 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#vikS" x="250" y="520" width="260" height="347"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="740" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="50" fill="${INK}">VIKINGOS</text><text x="335" y="790" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">capítulo IV</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const stand = mkVik(bookW, [600, 560, 300, 400], { horns: true, axe: true, seed: 31 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const hrn = [box(bookW, 300, 520, 90, 125, { zIndex: 3 }, hornSvg()), box(bookW, 420, 520, 90, 125, { zIndex: 3 }, `<div style="width:100%;height:100%;transform:scaleX(-1)">${hornSvg()}</div>`)];
  const epl = el('div', c, { left: '0', top: '1190px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 5 · Los vikingos no llevaban cuernos</span>`);
}
