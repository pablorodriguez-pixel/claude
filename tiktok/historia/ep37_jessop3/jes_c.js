/* Ep. 37 v4 · L8–L11 (Ojo, «O sea» con el cepillo, pregunta, balcón y libro) + balcón de la marca (L2) */

/* ======================================================================
   R1 · «O SEA: SE LE HUNDIERON DOS BARCOS ENCIMA,» — Titanic y Britannic se hunden; el Olympic, no
   ====================================================================== */
headline(S.R1[0], S.R1[1], 'se le hundieron *dos barcos* encima', { size: 86, hlT: K.dos9, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
const T_EMU = K.encima + 0.1;
{
  const c = scene(S.R1[0], S.R1[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.R1[0], 3, E.linear) });
    CC.forEach((cc, i) => {
      const ki = p(t, S.R1[0] + i * 0.08, 0.35, E.outBack);
      const ks = i ? p(t, K.hundieron + (i - 1) * 0.3, 0.9, E.inCubic) : 0;
      set(cc.d, { y: (1 - ki) * 900 + ks * 330, r: wobble(t, 0.4, 0.8, i) + (i - 1) * 3 + ks * (i === 1 ? -14 : 14) });
    });
    set(wv, { x: -(((t - S.R1[0]) * 40) % 60) });
    const ke = p(t, T_EMU - 0.15, 0.25, E.outBack) * (1 - p(t, T_EMU + 0.6, 0.2, E.inCubic));
    set(emu.d, { y: (1 - ke) * 380, r: -3 });
    face(emu, t, { look: [0, 0], blink: false, bL: 16, bR: 22, jaw: 0 });
    emuW.style.visibility = ke > 0.001 ? 'visible' : 'hidden';
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  rays(cam, -160, 120, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const CC = [mkCard(cam, CX3[0], 620, 1, 'OLYMPIC', '1911', { w: CW }), mkCard(cam, CX3[1], 620, 2, 'TITANIC', '1912', { w: CW, z: 12 }), mkCard(cam, CX3[2], 620, 3, 'BRITANNIC', '1916', { w: CW, hospital: true })];
  const wv = box(cam, 0, 0, 1140, 1920, { zIndex: 20 }); wv.innerHTML = waterSvg(1000, 520, 61, '#123a44', '#cfe0e4', 1140);
  const emuW = box(cam, 40, 760, 230, 260, { overflow: 'hidden', zIndex: 15 });
  const emu = mkEmuF(emuW, [0, 10, 220, 330]);
}

/* ======================================================================
   R2 · «…Y LO ÚNICO QUE VOLVIÓ A BUSCAR AL CAMAROTE FUE…» — la puerta del camarote, el «?» y redoble
   ====================================================================== */
headline(S.R2[0], S.R2[1], 'lo único que volvió a buscar *fue…*', { size: 86, hlT: K.fue, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.R2[0], S.R2[1], t => {
    const k = p(t, S.R2[0], S.R2[1] - S.R2[0], E.inCubic);
    set(cam, { s: 1 + 0.18 * k });
    set(door, { sx: lerp(1, 0.55, p(t, K.fue - 0.1, 0.8, E.outCubic)) });
    lite.style.opacity = 0.3 + 0.7 * p(t, K.fue - 0.1, 0.8);
    set(q, { s: pop(t, S.R2[0] + 0.1, 0.4) * (1 + 0.08 * Math.sin(t * 9)), r: Math.sin(t * 5) * 8, o: 1 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#3a2a1e' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 1, background: 'repeating-linear-gradient(90deg, #8a5a36 0 120px, #7a4e2e 120px 240px)' });
  const lite = box(cam, 290, 500, 500, 740, { zIndex: 2, background: 'radial-gradient(circle at 50% 50%, #FFF3A8, #FFE600 60%, #d9a44a)' });
  const door = box(cam, 290, 500, 500, 740, { zIndex: 3, transformOrigin: '0px 370px', background: WOOD, border: `8px solid ${INK}`, boxSizing: 'border-box' });
  door.innerHTML = `<div style="position:absolute;left:50px;top:50px;width:384px;height:270px;border:5px solid ${INK}"></div><div style="position:absolute;left:50px;top:380px;width:384px;height:280px;border:5px solid ${INK}"></div><div style="position:absolute;left:410px;top:350px;width:34px;height:34px;border-radius:50%;background:${BRASS};border:4px solid ${INK}"></div><div style="position:absolute;left:0;width:484px;text-align:center;top:118px;font-family:Rye;font-size:58px;color:${INK}">CAMAROTE</div>`;
  const q = qMark(cam, 440, 700, 280, YEL);
}

/* ======================================================================
   R3 · «…SU CEPILLO DE DIENTES.» — plano grande ≥ 2 s + sello «¡EL CEPILLO!» cuando lo dice la voz
   ====================================================================== */
{
  const c = scene(S.R3[0], S.R3[1], t => {
    set(ry, { r: t * 20 });
    const kb = p(t, K.cepillo - 0.12, 0.45, E.outBackBig || E.outBack);
    set(br, { s: t < K.cepillo - 0.12 ? 0 : kb * (1 + 0.03 * Math.sin(t * 5)), r: -10 + wobble(t, 0.5, 2), y: wobble(t, 0.6, 6), o: t < K.cepillo - 0.12 ? 0 : 1 });
    set(gl, { s: 0.6 + 0.4 * p(t, K.cepillo, 0.4) + 0.05 * Math.sin(t * 8), o: t > K.cepillo - 0.12 ? 1 : 0.3 });
    stampA(stC, t, K.cepillo - 0.04, -6, 1);
    SP.forEach((s2, i) => set(s2, { o: t > K.cepillo ? 0.5 + 0.5 * Math.sin(t * 8 + i * 1.3) : 0, s: 1 + 0.3 * Math.sin(t * 6 + i), r: t * 120 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2b2118' });
  const ry = rays(c, -160, 160, 1400, 28, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 1);
  const gl = box(c, 90, 520, 900, 720, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,230,0,.75), rgba(255,230,0,0))' });
  const br = box(c, 80, 760, 880, 193, { zIndex: 5 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const stC = stamp(c, 150, 380, '¡EL CEPILLO!', { size: 96, bw: 14, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const SP = [[160, 660], [860, 640], [260, 1080], [780, 1100], [540, 600]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
  chip(c, 300, 1110, 'de dientes', { size: 64, bg: PINK, z: 30 });
}

/* ======================================================================
   R4 · GOLPE ROSA: «PORQUE DESPUÉS DEL TITANIC, ERA LO QUE MÁS HABÍA ECHADO DE MENOS.»
   ====================================================================== */
colorHit(S.R4[0], S.R4[1], PINK, c => {
  const l0 = el('div', c, { left: 0, top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '84px', color: INK, zIndex: 10 }, 'Después del Titanic…');
  const l1 = el('div', c, { left: 0, top: '1040px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '80px', color: INK, zIndex: 10 }, 'era lo que más');
  const big = el('div', c, { left: 0, top: '1130px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '98px', lineHeight: '120px', color: '#fff', textShadow: OUTL(INK, 8), zIndex: 12, whiteSpace: 'nowrap' }, 'ECHÓ DE MENOS');
  const cd = mkCard(c, 160, 420, 2, 'TITANIC', '1912', { w: 300, z: 5 });
  const br = box(c, 440, 600, 480, 105, { zIndex: 7 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const ht = el('div', c, { left: '700px', top: '420px', fontSize: '130px', zIndex: 8, color: RED, textShadow: `4px 4px 0 ${INK}` }, '♥');
  return t => {
    popA(l0, t, S.R4[0] + 0.02, { rise: 30 });
    set(cd.d, { s: pop(t, S.R4[0] + 0.05, 0.35), r: -6 + wobble(t, 0.5, 1.5), o: 1 });
    set(br, { s: pop(t, S.R4[0] + 0.15, 0.35), r: -14 + wobble(t, 0.5, 2), o: 1 });
    popA(l1, t, K.era9 - 0.03, { rise: 30 });
    const kb = p(t, K.echado - 0.06, 0.2, E.outBack);
    set(big, { s: t < K.echado - 0.06 ? 0 : lerp(1.6, 1, kb), r: -2, o: t < K.echado - 0.06 ? 0 : 1 });
    set(ht, { s: pop(t, K.menos, 0.3) * (1 + 0.12 * Math.sin(t * 9)), o: t < K.menos ? 0 : 1 });
  };
});

/* ======================================================================
   V1 · «SE LE HUNDEN DOS BARCOS Y VUELVE A POR EL CEPILLO.» — dos barcos que se hunden / el cepillo
   ====================================================================== */
headline(S.V1[0], S.V1[1], 'Se le hunden dos barcos… *y vuelve a por el cepillo*', { size: 80, hlT: K.cepillo10, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.V1[0], S.V1[1], t => {
    SHP.forEach((d, i) => { const k = p(t, K.hunden10 + i * 0.2, 1.0, E.inCubic); set(d, { r: (i ? 1 : -1) * 18 * k, y: 260 * k }); });
    set(wv, { x: -(((t - S.V1[0]) * 40) % 60) });
    const kb = p(t, K.cepillo10 - 0.1, 0.4, E.outBack);
    set(br, { s: t < K.cepillo10 - 0.1 ? 0 : kb, r: -18 + wobble(t, 0.5, 3), o: t < K.cepillo10 - 0.1 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  const SHP = [[40, 640, false], [560, 660, true]].map(([x, y, h]) => { const d = box(c, x, y, 480, 160, { zIndex: 2 }); d.innerHTML = shipSvg({ hospital: h }); return d; });
  const wv = box(c, 0, 0, 1140, 1920, { zIndex: 3 }); wv.innerHTML = waterSvg(800, 700, 71, '#123a44', '#cfe0e4', 1140);
  const br = box(c, 140, 900, 800, 176, { zIndex: 5 }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
}

/* ======================================================================
   V2 · «PRIORIDADES, VECINO.» — el Vecino con la ceja levantada y el cepillo en la mano
   ====================================================================== */
{
  const c = scene(S.V2[0], S.V2[1], t => {
    set(ry, { r: t * 10 });
    set(vec.d, { s: pop(t, S.V2[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: [4, -4], bL: 2, bR: 24, fan: wobble(t, 0.9, 6), seed: 0.9 });
    set(br, { r: -40 + Math.sin(t * 5) * 6, y: Math.sin(t * 5) * 8 });
    stampA(stP, t, K.prioridades - 0.04, -6, 1);
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9C6BE' });
  const ry = rays(c, -160, 200, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const vec = mkVec(c, [200, 420, 680, 842]); vec.d.style.zIndex = 4;
  const br = box(c, 560, 820, 420, 92, { zIndex: 6, transformOrigin: '60px 46px' }); br.innerHTML = svgW(brushInner(), '0 0 820 180');
  const stP = stamp(c, 160, 260, 'PRIORIDADES', { size: 104, bw: 14, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  chip(c, 380, 1180, 'vecino', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   CTA · «Y TÚ, SI SE HUNDE TU BARCO, ¿QUÉ VUELVES A BUSCAR AL CAMAROTE? OS LEO.»
   ====================================================================== */
{
  const c = scene(S.CTA[0], S.CTA[1], t => {
    WD.forEach(w2 => set(w2.e, { s: pop(t, w2.t - 0.04, 0.3), o: t < w2.t - 0.04 ? 0 : 1 }));
    paint(vHL, t, K.vuelves, 0.3);
    const kh = p(t, K.hunde10, 1.2, E.inOutCubic);
    set(pb, { r: Math.sin(t * 2.2) * 7 + kh * 10, y: Math.sin(t * 2.2 + 0.8) * 14 + kh * 70 });
    set(wt, { x: -(((t - S.CTA[0]) * 40) % 60) });
    popA(ol, t, K.os - 0.03, { r: -4 });
    set(hand, { o: t > K.os ? 1 : 0, y: Math.sin(t * 6) * 12, s: pop(t, K.os, 0.3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  rays(c, -160, 240, 1400, 24, 'rgba(255,62,165,.08)', 'rgba(0,0,0,0)', 0);
  const wt = box(c, 0, 0, 1140, 1920, { zIndex: 2 }); wt.innerHTML = waterSvg(1060, 400, 51, LAGOON, INK, 1140);
  const pb = box(c, 300, 800, 520, 312, { zIndex: 3, transformOrigin: '260px 290px' }); pb.innerHTML = svgW(paperBoatInner(), '0 0 600 360');
  const mkL = (y, sz) => el('div', c, { left: 0, top: px(y), width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
  const l1 = mkL(236, 68), l2 = mkL(340, 112), l3 = mkL(470, 112), l4 = mkL(600, 92);
  const WD = [];
  [['Y TÚ,', l1, K.yt10], ['si se hunde', l1, K.si10], ['el tuyo…', l1, K.tuyo], ['¿QUÉ', l2, K.que10], ['VUELVES', l2, K.vuelves], ['A BUSCAR', l3, K.buscar10], ['AL CAMAROTE?', l4, K.camarote10]].forEach(([s2, ln, tt]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.15em'; if (s2 === 'VUELVES') { s.style.fontStyle = 'italic'; s.innerHTML = hlSpan('VUELVES', 'vhl', YEL); } else s.textContent = s2; ln.appendChild(s); WD.push({ e: s, t: tt }); });
  const vHL = c.querySelector('.vhl');
  const ol = chip(c, 520, 1150, 'Os leo 👇', { size: 64, bg: PINK, z: 40 });
  const hand = box(c, 400, 1140, 130, 130, { zIndex: 41 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 180, 1.0)}</svg>`;
}

/* ======================================================================
   BALCÓN del Vecino (marca): L2 completa y L11 «Y esto…»
   ====================================================================== */
function balcony(T0, T1, rows, o = {}) {
  const c = scene(T0, T1, t => {
    const punch = o.punch != null && t > o.punch ? 1 : 0;
    set(cam, { s: (punch ? 1.16 : 1.04) + 0.04 * p(t, T0, T1 - T0, E.linear), y: punch ? 60 : 0 });
    const lean = o.lean != null ? p(t, o.lean - 0.3, 0.4, E.inOutCubic) : 0;
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.3 && t < T0 + 0.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: lean ? [-4, 3] : [0, 0], bL: fanFast ? 8 : lean ? 6 : 0, bR: fanFast ? 8 : lean ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    if (tag) popA(tag, t, o.tagT, { r: -5 });
    const ks = p(t, T0 + 0.02, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, T0, 2)) + (1 - ks) * 8, o: 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    if (sHL) paint(sHL, t, o.hlT, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 700px' });
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
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = o.tagT != null ? chip(cam, 640, 640, 'tu vecino', { size: 44, bg: PINK }) : null;
  const SH_ = 60 + rows.length * 96;
  const sign = box(cam, 100, 150, 880, SH_ + 30, { zIndex: 40 });
  sign.innerHTML = `<svg width="880" height="${SH_ + 30}" style="position:absolute;left:0;top:0;overflow:visible"><path d="M170,0 L210,40 M710,0 L670,40" stroke="${INK}" stroke-width="5"/>${cut(`<rect x="20" y="40" width="840" height="${SH_ - 10}" rx="22"/>`)}<rect x="20" y="40" width="840" height="${SH_ - 10}" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="808" height="${SH_ - 42}" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sw = []; let sHL = null;
  rows.forEach((row, r) => {
    const ln = el('div', sign, { left: '0', top: px(64 + r * 96), width: '880px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: r === 0 ? 'italic' : 'normal', fontWeight: r === 0 ? 800 : 900, fontSize: r === 0 ? '78px' : '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
    row.forEach(([wd, ti, hl]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = hl ? hlSpan(wd, 'shl') : wd; ln.appendChild(s); sw.push({ e: s, t: ti }); });
  });
  sHL = sign.querySelector('.shl');
  return c;
}
{ // L2 · «Soy tu vecino, y esto no venía en el libro.»
  const a = K.isoy, b = K.iye;
  balcony(S.BAL[0], S.BAL[1], [
    [['Soy', ws(a)], ['tu', ws(a + 1)], ['vecino,', ws(a + 2), true]],
    [['y', ws(b)], ['esto', ws(b + 1)], ['no', ws(b + 2)], ['venía', ws(b + 3)]],
    [['en', ws(b + 4)], ['el', ws(b + 5)], ['libro.', ws(b + 6)]],
  ], { punch: K.yesto2 - 0.04, lean: K.esto2, tagT: K.vecino, hlT: K.vecino });
}
{ // L11 · «Y esto…»
  const b = K.i11;
  balcony(S.BAL2[0], S.BAL2[1], [[['Y', ws(b)], ['esto…', ws(b + 1), true]]], { lean: K.esto11, hlT: K.esto11 + 0.1 });
}

/* ======================================================================
   BK · «…NO VENÍA EN EL LIBRO.» — el libro HISTORIA se cierra (centrado) con «Ep. N · título»
   ====================================================================== */
headline(S.BK[0], LOOP, '…no venía en el *libro.*', { size: 96, hlT: K.libro, y: 200 });
{
  const TC = K.libro - 0.05;
  const c = scene(S.BK[0], LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    // abierto, el libro está centrado; cerrado solo ocupa la mitad derecha: se desplaza para quedar centrado
    set(bookW, { x: 210 * 1.15 * p(t, TC + 0.15, 0.25, E.outCubic), s: 1.15 * pop(t, S.BK[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EADFC8' }); box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,230,0,.25), rgba(255,230,0,0) 60%)' });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 915px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${820 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">VIOLET</text><text x="335" y="775" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">la del cepillo</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '310px', top: '1200px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const epl = el('div', c, { left: '0', top: '1270px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:44px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">${EP_TAG}</span>`);
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 270, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
}
