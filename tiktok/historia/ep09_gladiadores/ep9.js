/* Ep. 9 · El pulgar de los gladiadores — escenas, óvalo del Vecino, frame y sonido */
{ // símbolos extra para avatares y trampas
  const dfs = defsSvg.querySelector('defs');
  dfs.insertAdjacentHTML('beforeend', `<symbol id="gladM" viewBox="0 0 300 560" overflow="visible">${gladInner({ type: 'murm', seed: 3 })}</symbol><symbol id="gladR" viewBox="0 0 300 560" overflow="visible">${gladInner({ type: 'ret', seed: 4 })}</symbol><symbol id="romS" viewBox="0 0 360 460" overflow="visible">${romanInner({ purple: true })}</symbol>`);
}
AV.GLADM = ['gladM', '96 18 110 110', 300, 560]; AV.GLADR = ['gladR', '96 40 110 110', 300, 560]; AV.ROM = ['romS', '90 70 180 180', 360, 460];
const WALL = { background: '#6E2A26', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 3px, transparent 3px 46px), radial-gradient(circle at 50% 50%, rgba(255,200,150,.18), rgba(0,0,0,.35) 80%)' };

/* ======================================================================
   0 · GANCHO + MARCO DE CUADRO + MITO (L0–L1)  -1 … S.pol0
   ====================================================================== */
headline(at(L.gesto, 0, -0.02), at(L.gesto, 7, -0.02), 'Te lo enseñó *un cuadro*', { size: 80, y: 228, color: '#fff', shadow: `4px 4px 0 ${INK}` });
headline(at(L.gesto, 7, -0.02), S.pol0, 'No los *romanos*', { size: 96, y: 228, color: '#fff', shadow: `4px 4px 0 ${INK}` });
{
  const FI = { x: 150, y: 470, w: 780, h: 700 }, FC = [540, 820];
  const c = scene(-1, S.pol0, t => {
    // cierre del marco
    const k = p(t, at(L.gesto, 0, 0.03), 0.75, E.inOutCubic), fs = lerp(2.5, 1, k);
    const it = FC[1] - FI.h / 2 * fs, il = FC[0] - FI.w / 2 * fs, ir = 1080 - (FC[0] + FI.w / 2 * fs), ib = 1920 - (FC[1] + FI.h / 2 * fs);
    pc.style.clipPath = t < at(L.gesto, 0, 0.03) ? 'none' : `inset(${f1(Math.max(0, it))}px ${f1(Math.max(0, ir))}px ${f1(Math.max(0, ib))}px ${f1(Math.max(0, il))}px)`;
    set(frm, { s: fs, o: t < at(L.gesto, 0, 0.03) ? 0 : 1 });
    set(cam, { s: lerp(1, 0.78, k) * (1 + 0.04 * p(t, atE(L.gesto, 2, -0.08), 2.6, E.linear)) * (1 + 0.03 * p(t, -1, 6.5, E.linear)) });
    popA(plq, t, at(L.gesto, 6), { r: 0 });
    // mano gigante
    const land = p(t, 0, 0.75, E.outBack);
    let rot = 0;
    if (t > at(L.gancho, 4) && t < at(L.gancho, 6)) rot = Math.sin((t - at(L.gancho, 4)) * 15) * 34 * Math.sin(clamp((t - at(L.gancho, 4)) / 0.75) * Math.PI);
    if (t > at(L.gancho, 7) && t < atE(L.gancho, 13, 0.1)) rot = Math.sin((t - at(L.gancho, 7)) * 3.4) * 72 * Math.min(1, (t - at(L.gancho, 7)) / 0.3) * (1 - p(t, atE(L.gancho, 13, -0.2), 0.3));
    const slam = t > at(L.gancho, 6) ? 26 * Math.sin(clamp((t - at(L.gancho, 6)) / 0.3) * Math.PI) : 0;
    set(hand.d, { y: lerp(-130, 0, land) + slam + wobble(t, 0.4, 5), r: rot * 0.06 });
    hand.fist.setAttribute('transform', `rotate(${f1(rot)} 200 730)`);
    qs.forEach((q, i) => { const tq = atE(L.gancho, 7, -0.09) + i * 0.7; const kq = pop(t, tq, 0.4); set(q, { s: kq, y: -(t - tq) * 30, r: Math.sin(t * 4 + i) * 12, o: t < tq || t > at(L.gesto, 0, -0.02) ? 0 : 1 }); });
    // gladiadores
    const scared = t > at(L.gancho, 6) && t < at(L.gancho, 7, 0.02), shrug = t > at(L.gancho, 7, 0.06) && t < at(L.gesto, 0, -0.07) ? Math.sin(clamp((t - at(L.gancho, 7, 0.06)) / 0.4) * Math.PI / 2) : 0;
    gface(gm, t, { look: t < at(L.gancho, 7, 0.02) ? [2, -4] : [4, -1], oh: scared, sweat: t > at(L.gancho, 6, 0.05) && t < at(L.gesto, 0, -0.07), brow: scared ? -5 : 0, aR: -10 + wobble(t, 0.5, 3) + shrug * 26, aL: shrug * -10, hr: shrug * 6, seed: 0.3 });
    gface(gr, t, { look: t < at(L.gancho, 7, 0.02) ? [2, -4] : [4, -1], oh: scared, sweat: false, brow: scared ? -5 : 0, aR: wobble(t, 0.6, 3) + shrug * 22, hr: -shrug * 6, seed: 1.7 });
    set(gm.d, { y: wobble(t, 0.5, 3) - (scared ? 10 : 0) }); set(gr.d, { y: wobble(t, 0.55, 3, 0.3) - (scared ? 10 : 0), sx: -1 });
    // texto del gancho
    const k1 = 1 - p(t, at(L.gancho, 7, -0.06), 0.12, E.inCubic), k2 = p(t, at(L.gancho, 7, -0.02), 0.25, E.outBack) * (1 - p(t, atE(L.gancho, 13, 0.1), 0.14, E.inCubic));
    set(hk1, { o: k1, s: 1 + 0.03 * (1 - p(t, 0, 0.3)) }); set(hk2, { o: Math.max(0, Math.min(1, k2)), s: 0.85 + 0.15 * k2 });
    set(hkP, { o: t < atE(L.gancho, 13, 0.1) ? 1 : 1 - p(t, atE(L.gancho, 13, 0.1), 0.14), y: (t > at(L.gancho, 7, -0.06) && t < at(L.gancho, 7, 0.11)) ? -Math.sin((t - at(L.gancho, 7, -0.06)) / 0.18 * Math.PI) * 14 : 0 });
    noW.style.textShadow = glitch(t, at(L.gancho, 4), 0.3); set(noW, { s: 1 + 0.25 * Math.sin(clamp((t - at(L.gancho, 4)) / 0.3) * Math.PI) });
    paint(hl1, t, at(L.gancho, 6), 0.3); paint(hl2, t, at(L.gancho, 11), 0.4);
    set(mataW, { s: 1 + 0.18 * Math.sin(clamp((t - at(L.gancho, 6)) / 0.32) * Math.PI) });
    stampA(mito, t, at(L.gesto, 7), -12);
  }, { clip: true });
  sceneBg(c, WALL);
  const pc = box(c, 0, 0, 1080, 1920, { overflow: 'hidden', zIndex: 1 });
  const cam = box(pc, 0, 0, 1080, 1920, { transformOrigin: `${FC[0]}px ${FC[1]}px` });
  box(cam, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${coliseumSvg({ top: 470, seed: 5 })}</svg>`;
  const gm = mkGlad(cam, [100, 650, 380, 709], { type: 'murm', seed: 2 });
  const gr = mkGlad(cam, [580, 650, 380, 709], { type: 'ret', seed: 5 });
  box(cam, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920"><ellipse cx="300" cy="1300" rx="170" ry="26" fill="${SH}"/><ellipse cx="770" cy="1300" rx="170" ry="26" fill="${SH}"/></svg>`;
  const hand = mk(cam, [290, -200, 500, 1125], thumbHandInner(), '0 0 400 900', 'hand'); hand.fist = hand.d.querySelector('.fist'); hand.d.style.zIndex = 5;
  const qs = [[280, 600], [740, 640], [560, 520]].map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 6, lineHeight: 1 }, '?'));
  // panel del gancho
  const hkP = box(c, 50, 168, 980, 300, { zIndex: 40 });
  box(hkP, 0, 0, 980, 300, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `10px 12px 0 ${SH}` });
  const hk1 = el('div', hkP, { left: 0, top: '22px', width: '980px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, color: INK, lineHeight: 1.04 },
    `<div style="font-size:74px">El pulgar abajo</div><div style="font-size:74px"><span class="noW" style="display:inline-block;color:${RED};font-weight:900">NO</span> significaba</div><div class="mataW" style="display:inline-block;font-size:100px;font-style:italic;font-weight:900">«${hlSpan('mátalo', 'hl1')}»</div>`);
  const noW = hk1.querySelector('.noW'), mataW = hk1.querySelector('.mataW'), hl1 = hk1.querySelector('.hl1');
  const hk2 = el('div', hkP, { left: 0, top: '44px', width: '980px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, color: INK, lineHeight: 1.08 },
    `<div style="font-size:70px">O, por lo menos…</div><div style="font-size:112px;font-style:italic;font-weight:900">${hlSpan('no lo sabemos', 'hl2', PINK)}</div>`);
  const hl2 = hk2.querySelector('.hl2');
  // marco dorado
  const frm = box(c, FI.x - 46, FI.y - 46, FI.w + 92, FI.h + 92, { zIndex: 30 }); frm.innerHTML = goldFrame(FI.w, FI.h, 46);
  const plq = el('div', c, { left: '390px', top: '1236px', width: '300px', textAlign: 'center', background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', fontFamily: 'Rye', fontSize: '30px', color: INK, padding: '6px 0', boxShadow: `5px 5px 0 ${SH}`, zIndex: 31 }, 'UN CUADRO');
  const mito = stamp(c, 250, 690, 'MITO', { size: 210, bw: 18, z: 60, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
}
/* ======================================================================
   3 · POLLICE VERSO (L3)  at(L.pollice, 0, -0.07) … at(L.imagen, 0, -0.09)
   ====================================================================== */
headline(at(L.pollice, 0, -0.02), atE(L.pollice, 8, 0.06), 'Los textos *romanos*…', { size: 84, hlT: at(L.pollice, 2) });
headline(atE(L.pollice, 8, 0.06), at(L.imagen, 0, -0.09), 'No dicen hacia *dónde*', { size: 88, hlT: at(L.pollice, 13) });
{
  const c = scene(at(L.pollice, 0, -0.07), at(L.imagen, 0, -0.09), t => {
    set(scr, { s: pop(t, at(L.pollice, 0, 0.03), 0.5), r: -1.5 + wobble(t, 0.4, 0.6), o: t < at(L.pollice, 0, 0.03) ? 0 : 1 });
    const un = p(t, at(L.pollice, 0, 0.08), 0.6, E.outCubic); paperIn.style.clipPath = `inset(0 ${f1((1 - un) * 50)}% 0 ${f1((1 - un) * 50)}%)`;
    set(rollL, { x: (1 - un) * 380 }); set(rollR, { x: -(1 - un) * 380 });
    popA(w1, t, at(L.pollice, 5), { r: -2 }); popA(w2, t, at(L.pollice, 6), { r: 2 }); paint(pvHL, t, atE(L.pollice, 6, -0.23), 0.35);
    popA(ctx, t, at(L.pollice, 1, 0.06), { r: -4 });
    set(arr, { o: t < at(L.pollice, 7) ? 0 : 1, sy: p(t, at(L.pollice, 7), 0.3, E.outBack) });
    popA(tr, t, at(L.pollice, 7, 0.08), { r: -2 });
    // el pulgar dibuja una interrogación
    const kq = p(t, at(L.pollice, 9, 0.06), 1.55, E.inOutCubic), qL = qLen * kq;
    qPath.setAttribute('stroke-dashoffset', f1(qLen - qL)); qPath0.setAttribute('stroke-dashoffset', f1(qLen - qL));
    const pt = qPath.getPointAtLength(Math.max(0.01, qL));
    const vis = t > at(L.pollice, 7, 0.13);
    const dot = t > at(L.pollice, 13, 0.4);
    set(qDot, { s: pop(t, at(L.pollice, 13, 0.45), 0.35), o: dot ? 1 : 0 });
    const fx = 600 + (dot ? 150 : pt.x) * 0.85, fy = 1000 + (dot ? 330 : pt.y) * 0.85;
    const rot = dot ? Math.sin(t * 9) * 25 : (t < at(L.pollice, 9, 0.06) ? 360 * p(t, atE(L.pollice, 7, -0.09), 0.75, E.inOutCubic) : Math.sin(t * 7) * 10);
    set(fq, { x: fx - 50, y: fy - 194 + (dot ? -Math.abs(Math.sin((t - at(L.pollice, 13, 0.4)) * 10)) * 14 : 0), r: rot, o: vis ? 1 : 0, s: pop(t, at(L.pollice, 7, 0.13), 0.35) });
    set(qW, { o: t > at(L.pollice, 9, 0.01) ? 1 : 0 });
    popA(up, t, at(L.pollice, 10), { r: -6 }); popA(dn, t, at(L.pollice, 12), { r: 5 });
  });
  const scr = box(c, 70, 400, 940, 420, { zIndex: 3 });
  const paperIn = box(scr, 40, 20, 860, 380, { background: '#F3E3BC', border: `5px solid ${INK}`, boxShadow: `8px 10px 0 ${SH}` });
  { let ln = ''; const r = rng(31); for (let y = 40; y < 360; y += 34) { if (y > 120 && y < 280) continue; let x = 30; while (x < 820) { const w = 30 + r() * 80; ln += `M${f1(x)},${y} h${f1(Math.min(w, 830 - x))} `; x += w + 16; } }
    box(paperIn, 0, 0, 860, 380).innerHTML = `<svg width="860" height="380"><rect width="860" height="380" fill="url(#hP)" opacity=".7"/><path d="${ln}" stroke="${INK}" stroke-width="7" opacity=".38" stroke-linecap="round"/><path d="M0,0 H860 V380 H0 Z" fill="none" stroke="#b08850" stroke-width="18" opacity=".35"/></svg>`; }
  const rollSvg = `<svg width="70" height="440" viewBox="0 0 70 440" style="overflow:visible">${cut('<rect x="6" y="10" width="58" height="420" rx="29"/>', 6, 8)}<rect x="6" y="10" width="58" height="420" rx="29" fill="#E8D3A2" stroke="${INK}" stroke-width="5"/><rect x="6" y="10" width="58" height="420" rx="29" fill="url(#hA)" opacity=".5"/><rect x="14" y="-8" width="42" height="26" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="14" y="422" width="42" height="26" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const rollL = box(scr, 0, -10, 70, 440); rollL.innerHTML = rollSvg;
  const rollR = box(scr, 870, -10, 70, 440); rollR.innerHTML = rollSvg;
  const pv = el('div', paperIn, { left: 0, top: '140px', width: '860px', textAlign: 'center', fontFamily: 'Rye', fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  pv.innerHTML = `<span class="w1" style="display:inline-block">POLLICE</span> <span class="w2" style="display:inline-block">${hlSpan('VERSO', 'pvh')}</span>`;
  const w1 = pv.querySelector('.w1'), w2 = pv.querySelector('.w2'), pvHL = pv.querySelector('.pvh');
  const ctx = chip(c, 90, 372, 'textos romanos', { size: 32, bg: INK, color: YEL, z: 8 });
  const arr = box(c, 520, 822, 40, 60, { zIndex: 4, transformOrigin: '20px 0' }); arr.innerHTML = `<svg width="40" height="60"><path d="M20,0 V44 M6,30 L20,50 L34,30" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  const tr = el('div', c, { left: '230px', top: '850px', width: '620px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '66px', color: INK, background: '#fff', border: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `7px 7px 0 ${PINK}`, padding: '4px 0 10px', zIndex: 5 }, '«pulgar girado»');
  // interrogación trazada
  const qW = box(c, 600, 1000, 255, 340, { zIndex: 6 });
  qW.innerHTML = `<svg viewBox="0 0 300 400" width="255" height="340" style="overflow:visible"><path class="qp" d="M60,130 C56,40 244,30 240,130 C238,196 150,196 150,262 L150,286" stroke="${INK}" stroke-width="40" fill="none" stroke-linecap="round"/><path class="qp2" d="M60,130 C56,40 244,30 240,130 C238,196 150,196 150,262 L150,286" stroke="${PINK}" stroke-width="26" fill="none" stroke-linecap="round"/><g class="qd"><circle cx="150" cy="350" r="26" fill="${PINK}" stroke="${INK}" stroke-width="7"/></g></svg>`;
  const qPath = qW.querySelector('.qp2'), qPath0 = qW.querySelector('.qp'), qLen = qPath.getTotalLength(), qDot = qW.querySelector('.qd');
  qPath.setAttribute('stroke-dasharray', f1(qLen)); qPath0.setAttribute('stroke-dasharray', f1(qLen));
  qDot.style.transformBox = 'fill-box'; qDot.style.transformOrigin = 'center';
  const fq = box(c, 0, 0, 138, 200, { zIndex: 7 }); fq.innerHTML = fistSvg(200);
  const up = chip(c, 340, 1040, '↑ ¿?', { size: 46, bg: '#fff', color: INK, z: 8 });
  const dn = chip(c, 350, 1160, '↓ ¿?', { size: 46, bg: '#fff', color: INK, z: 8 });
}

/* ======================================================================
   4a · EL CUADRO DE GÉRÔME (L4a)  at(L.imagen, 0, -0.09) … at(L.imagen, 20, -0.04)
   ====================================================================== */
headline(at(L.imagen, 0, -0.04), atE(L.imagen, 5, 0.02), 'El pulgar *hacia abajo*', { size: 84, hlT: at(L.imagen, 4), color: '#fff', shadow: `4px 4px 0 ${INK}` });
headline(atE(L.imagen, 5, 0.02), at(L.imagen, 20, -0.04), 'La hizo famosa *un cuadro*', { size: 80, hlT: at(L.imagen, 10), color: '#fff', shadow: `4px 4px 0 ${INK}` });
{
  const PI = { x: 130, y: 450, w: 820, h: 560 };
  const c = scene(at(L.imagen, 0, -0.09), at(L.imagen, 20, -0.04), t => {
    set(art, { s: pop(t, at(L.imagen, 0, -0.04), 0.5), r: -1 + wobble(t, 0.3, 0.4), o: t < at(L.imagen, 0, -0.04) ? 0 : 1 });
    set(pcam, { s: 1 + 0.08 * p(t, at(L.imagen, 0, -0.04), 6, E.linear) });
    TH.forEach(q => { const k = pop(t, q.t, 0.3); set(q.e, { s: k * (1 + 0.06 * Math.sin(t * 9 + q.ph)), y: Math.sin(t * 6 + q.ph) * 3, r: Math.sin(t * 5 + q.ph) * 8, o: t < q.t ? 0 : 1 }); });
    gface(pm, t, { look: [-3, -4], aR: -150 + wobble(t, 0.5, 4), seed: 2 });
    gface(pr, t, { closed: true, blink: false, sweat: true, seed: 4 });
    face(emp, t, { look: [3, 2], brow: -3, seed: 0.7 }); emp.headg.setAttribute('transform', `rotate(${f1(Math.sin(t * 1.4) * 3)} 180 300)`);
    // 1872
    // «1872» directo, golpe de sello en «mil» (sin contar años intermedios)
    { const T = at(L.imagen, 12), k = p(t, T, 0.18, E.outCubic); set(yr, { s: t < T ? 0 : lerp(2.3, 1, k) * (1 + 0.1 * (1 - p(t, atE(L.imagen, 16), 0.3, E.outBack)) * (t > atE(L.imagen, 16) ? 1 : 0)), o: t < T ? 0 : clamp(k * 2), r: -4 }); }
    paint(yHL, t, atE(L.imagen, 16), 0.3);
    popA(who, t, at(L.imagen, 18), { r: -2 });
    popA(ttl, t, at(L.imagen, 1, 0.12), { r: 0 });
  }, { clip: true });
  sceneBg(c, WALL);
  const art = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 730px', zIndex: 2 });
  const canvas = box(art, PI.x, PI.y, PI.w, PI.h, { overflow: 'hidden', background: '#E9D7B0' });
  const pcam = box(canvas, 0, 0, PI.w, PI.h, { transformOrigin: '60% 40%' });
  box(pcam, 0, 0, PI.w, PI.h).innerHTML = `<svg viewBox="0 330 1080 736" width="${PI.w}" height="${PI.h}" preserveAspectRatio="xMidYMid slice">${coliseumSvg({ top: 380, seed: 12, sky: '#EED9AE' })}</svg>`;
  // palco del emperador
  const box0 = box(pcam, 30, 120, 250, 230); box0.innerHTML = `<svg width="250" height="230" style="overflow:visible">${cut('<rect x="10" y="40" width="230" height="190"/>', 5, 6)}<rect x="10" y="40" width="230" height="190" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/>
   <path d="M0,10 L250,10 L240,52 L10,52 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4].map(k => `<path d="M${22 + k * 46},10 L${10 + k * 46 + 30},52" stroke="#fff" stroke-width="10" opacity=".7"/>`).join('')}
   <rect x="0" y="180" width="250" height="50" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><rect x="0" y="180" width="250" height="50" fill="url(#hA)" opacity=".5"/></svg>`;
  const emp = mk(box0, [40, 50, 170, 217], romanInner({ purple: true, laurel: BRASS }), '0 0 360 460', 'rom'); emp.headg = emp.d.querySelector('.headg');
  box0.lastChild.style.zIndex = 1; { const fr = box(box0, 0, 180, 250, 50, { background: BRASS, border: `4px solid ${INK}`, zIndex: 2 }); fr.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 2px, transparent 2px 7px)'; }
  // pulgares del público
  const TH = []; const tp = [[320, 40], [440, 70], [560, 36], [680, 66], [300, 190], [420, 214], [660, 200], [750, 150]];
  tp.forEach((q, i) => { const e = box(pcam, q[0], q[1], 76, 110, { zIndex: 3 }); e.innerHTML = `<div style="position:absolute;left:-14px;top:-6px;width:104px;height:104px;border-radius:50%;background:${PINK};border:4px solid ${INK};opacity:.9"></div><div style="position:absolute;left:4px;top:-2px">${fistSvg(100)}</div>`; TH.push({ e, t: atE(L.imagen, 2) + i * 0.1, ph: i * 1.7 }); });
  const pr = mkGlad(pcam, [120, 330, 190, 355], { type: 'ret', seed: 9 }); pr.d.style.transform = 'rotate(-78deg)'; pr.d.style.zIndex = 4;
  pr.d.style.left = '180px'; pr.d.style.top = '270px';
  const pm = mkGlad(pcam, [430, 205, 200, 373], { type: 'murm', seed: 3 }); pm.d.style.zIndex = 5;
  box(canvas, 0, 0, PI.w, PI.h, { background: 'radial-gradient(ellipse at 50% 40%, rgba(255,220,150,.10), rgba(90,50,10,.42) 95%)', zIndex: 8 });
  const frm = box(art, PI.x - 46, PI.y - 46, PI.w + 92, PI.h + 92, { zIndex: 9 }); frm.innerHTML = goldFrame(PI.w, PI.h, 46);
  const ttl = el('div', art, { left: '340px', top: '1036px', width: '400px', textAlign: 'center', background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '32px', color: INK, padding: '4px 0 8px', boxShadow: `5px 5px 0 ${SH}`, zIndex: 10 }, '«Pollice Verso»');
  const yr = el('div', c, { left: '330px', top: '1088px', width: '620px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', textShadow: `7px 7px 0 ${INK}`, zIndex: 12 }, '<span>1872</span>');
  const yHLw = box(yr, 120, 96, 380, 40, { zIndex: -1 }); const yHL = box(yHLw, 0, 0, 380, 40, { background: PINK, transformOrigin: 'left center', borderRadius: '6px 16px 8px 18px' });
  const who = chip(c, 330, 1250, 'Jean-Léon Gérôme · 1872', { size: 40, bg: INK, color: YEL, z: 13 });
}

/* ======================================================================
   4b · EL CINE LO COPIÓ (L4b)  at(L.imagen, 20, -0.04) … at(L.mas, 0, -0.08)
   ====================================================================== */
headline(at(L.imagen, 20, -0.04), at(L.mas, 0, -0.08), 'Y el *cine* la copió', { size: 92, hlT: at(L.imagen, 23), color: '#fff', shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(at(L.imagen, 20, -0.04), at(L.mas, 0, -0.08), t => {
    set(cm.d, { s: pop(t, at(L.imagen, 20), 0.45), r: -3 + Math.sin(t * 30) * 0.4, o: t < at(L.imagen, 20) ? 0 : 1 });
    const a = (t - at(L.imagen, 20, -0.02)) * 400; cm.rA.setAttribute('transform', `rotate(${f1(a)} 130 130)`); cm.rB.setAttribute('transform', `rotate(${f1(a)} 268 130)`); cm.cr.setAttribute('transform', `rotate(${f1(a * 0.8)} 60 300)`);
    const ks = p(t, at(L.imagen, 21), 0.6, E.outCubic); strip.style.clipPath = `inset(0 ${f1((1 - ks) * 100)}% 0 0)`;
    set(film, { x: -(((t - at(L.imagen, 21)) * 300) % 200) });
    set(beam, { o: t > at(L.imagen, 21) ? 0.45 + Math.sin(t * 40) * 0.05 : 0, sx: ks });
    set(cl.d, { s: pop(t, at(L.imagen, 23), 0.4), r: 6, o: t < at(L.imagen, 23) ? 0 : 1 });
    const kc = p(t, at(L.imagen, 23, 0.13), 0.12, E.inCubic); cl.clap.setAttribute('transform', `rotate(${f1(-26 * (1 - kc))} 18 78)`);
    stampA(cop, t, at(L.imagen, 25, 0.02), -8);
  }, { clip: true });
  sceneBg(c, { background: '#2E241C', backgroundImage: 'repeating-linear-gradient(45deg, rgba(234,223,200,.05) 0 2px, transparent 2px 9px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 55% 45%, rgba(255,230,0,.16), rgba(0,0,0,.5) 75%)' });
  const beam = box(c, 440, 520, 640, 380, { transformOrigin: '0 50%', zIndex: 2 }); beam.innerHTML = `<svg width="640" height="380"><path d="M0,170 L640,0 L640,380 L0,210 Z" fill="${YEL}" opacity=".35"/></svg>`;
  const strip = box(c, 460, 570, 620, 250, { zIndex: 3, overflow: 'hidden' });
  const film = box(strip, 0, 0, 1000, 250, {});
  { let s = `<rect x="0" y="0" width="1000" height="250" fill="#1d1712"/>`; for (let x = 8; x < 1000; x += 40) s += `<rect x="${x}" y="10" width="22" height="18" rx="4" fill="#F3E3BC"/><rect x="${x}" y="222" width="22" height="18" rx="4" fill="#F3E3BC"/>`;
    for (let k = 0; k < 5; k++) s += `<rect x="${k * 200 + 14}" y="40" width="172" height="170" fill="#E9D7B0" stroke="#F3E3BC" stroke-width="4"/>`;
    film.innerHTML = `<svg width="1000" height="250">${s}</svg>`;
    for (let k = 0; k < 5; k++) { const f = box(film, k * 200 + 60, 52, 82, 120); f.innerHTML = fistSvg(140); } }
  const cm = mk(c, [60, 470, 420, 493], cameraInner(), '0 0 460 540', 'cam'); cm.rA = cm.d.querySelector('.reelA'); cm.rB = cm.d.querySelector('.reelB'); cm.cr = cm.d.querySelector('.crank'); cm.d.style.zIndex = 4;
  const cl = mk(c, [560, 860, 360, 293], clapInner('TOMA 2'), '0 0 320 260', 'clap'); cl.clap = cl.d.querySelector('.clap'); cl.d.style.zIndex = 5;
  const cop = stamp(c, 360, 660, 'COPIADO', { size: 66, bw: 9, z: 9, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
}

/* ======================================================================
   5 · MARCADOR: MUERTE / SOBREVIVE (L5)  at(L.mas, 0, -0.08) … at(L.caro, 0, -0.06)
   ====================================================================== */
headline(at(L.mas, 0, -0.05), at(L.mas, 3, -0.02), 'Y hay *más*…', { size: 96, hlT: at(L.mas, 2) });
headline(at(L.mas, 3, -0.02), at(L.mas, 7, -0.04), '*Muchos* combates…', { size: 88, hlT: at(L.mas, 3) });
headline(at(L.mas, 7, -0.04), at(L.caro, 0, -0.06), '…no acababan en *muerte*', { size: 82, hlT: at(L.mas, 10) });
{
  const c = scene(at(L.mas, 0, -0.08), at(L.caro, 0, -0.06), t => {
    set(brd, { y: (1 - p(t, at(L.mas, 0, -0.02), 0.45, E.outBack)) * 900, r: -1, o: 1 });
    const on = t > at(L.mas, 7);
    set(lamp2, { s: on ? 1 + 0.12 * (1 - p(t, at(L.mas, 7), 0.35, E.outBack)) : 1 }); lamp2.firstChild.style.opacity = on ? 1 : 0;
    set(ray2, { r: t * 50, s: on ? pop(t, at(L.mas, 7), 0.4) : 0, o: on ? 1 : 0 });
    row2.style.opacity = 1; row1.style.opacity = on ? 0.42 : 1;
    set(txt2, { s: on ? 1 + 0.1 * (1 - p(t, at(L.mas, 7), 0.4)) : 1 });
    lamp1.firstChild.style.opacity = (t > atE(L.mas, 3, -0.21) && t < at(L.mas, 7, -0.04) && Math.sin(t * 16) > 0) ? 1 : 0; lamp2.lastChild.style.opacity = (t > atE(L.mas, 3, -0.21) && t < at(L.mas, 7, -0.04) && Math.sin(t * 16) <= 0) ? 1 : 0;
    stampA(ns, t, at(L.mas, 10, 0.02), -8);
    TK.forEach((q, i) => { popA(q.e, t, q.t, { r: (i % 2 ? 4 : -4) }); if (t > q.t + 0.4) set(q.e, { s: 1, y: -Math.max(0, Math.sin((t - at(L.mas, 7, 0.01)) * 8 - i * 0.6)) * (t > at(L.mas, 7, 0.01) ? 18 : 0), r: (i % 2 ? 4 : -4), o: 1 }); });
    face(av1.f, t, { look: [4, 0], seed: 1 }); face(av2.f, t, { look: [-4, 0], seed: 2 });
  });
  const brd = box(c, 110, 430, 860, 600, { zIndex: 3 });
  box(brd, 0, 0, 860, 600, { background: '#B48C5C', border: `14px solid #5a3d22`, borderRadius: '18px', boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(92deg, rgba(43,33,24,.16) 0 2px, transparent 2px 15px)' });
  el('div', brd, { left: '250px', top: '-34px', width: '360px', textAlign: 'center', background: INK, color: YEL, fontFamily: 'Rye', fontSize: '50px', padding: '6px 0 10px', borderRadius: '12px', border: `4px solid ${BRASS}` }, 'COMBATE');
  const mkAv = (x, sym) => { const d = box(brd, x, 70, 170, 170, { borderRadius: '50%', overflow: 'hidden', background: FIG, border: `6px solid ${INK}`, boxShadow: `5px 5px 0 ${SH}` }); const f = mk(d, [-150, -70, 470, 877], gladInner({ type: sym, seed: 6 }), '0 0 300 560', 'glad'); return { d, f }; };
  const av1 = mkAv(150, 'murm'), av2 = mkAv(540, 'ret');
  el('div', brd, { left: '360px', top: '108px', width: '140px', textAlign: 'center', fontFamily: 'Rye', fontSize: '74px', color: '#fff', textShadow: `4px 4px 0 ${INK}` }, 'VS');
  const mkRow = (y, txt) => { const r = box(brd, 60, y, 740, 120, { background: '#F3E3BC', border: `5px solid ${INK}`, borderRadius: '60px' }); const l = box(r, 14, 10, 90, 90, { borderRadius: '50%', background: '#6d6256', border: `5px solid ${INK}` }); box(l, -5, -5, 90, 90, { borderRadius: '50%', background: YEL, border: `5px solid ${INK}`, opacity: 0, boxShadow: `0 0 40px 14px rgba(255,230,0,.8)` }); box(l, -5, -5, 90, 90, { borderRadius: '50%', background: YEL, border: `5px solid ${INK}`, opacity: 0 }); const tx = el('div', r, { left: '130px', top: '14px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '74px', lineHeight: 1, color: INK, whiteSpace: 'nowrap', transformOrigin: 'left center' }, txt); return { r, l, tx }; };
  const ray2 = rays(brd, 119 - 150, 495 - 150, 300, 18, 'rgba(255,230,0,.6)', 'transparent', 0);
  const R1 = mkRow(290, 'muerte'), R2 = mkRow(440, 'sobrevive');
  const row1 = R1.r, row2 = R2.r, lamp1 = R1.l, lamp2 = R2.l, txt2 = R2.tx;
  lamp1.children[0].style.boxShadow = 'none'; lamp1.children[0].style.background = '#ff6b6b'; lamp1.children[1].remove();
  const ns = stamp(c, 180, 700, '¡NO SIEMPRE!', { size: 70, bw: 10, z: 9, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
  const TK = [];
  for (let i = 0; i < 6; i++) { const e = box(c, 330 + i * 102, 1078, 90, 90, { zIndex: 4 }); e.innerHTML = `<svg viewBox="0 0 100 100" width="90" height="90" style="overflow:visible"><circle cx="54" cy="56" r="44" fill="${SH}"/><circle cx="50" cy="50" r="44" fill="${FIG}" stroke="${INK}" stroke-width="5"/><path d="M28,72 L72,24 M28,24 L72,72" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M28,72 L72,24 M28,24 L72,72" stroke="#e8e4dc" stroke-width="4" stroke-linecap="round"/><path d="M22,64 l14,14 M64,22 l14,14 M64,78 l14,-14 M22,36 l14,-14" stroke="${BRASS}" stroke-width="7" stroke-linecap="round"/></svg>`; TK.push({ e, t: at(L.mas, 3, 0.05) + i * 0.16 }); }
}

/* ======================================================================
   6 · LIBRO DE CUENTAS (L6)  at(L.caro, 0, -0.06) … atE(L.caro, 15, 0.02)
   ====================================================================== */
headline(at(L.caro, 0, -0.04), at(L.caro, 4), 'Un gladiador era *carísimo*', { size: 78, hlT: at(L.caro, 3) });
headline(at(L.caro, 4), at(L.caro, 12, -0.05), 'Comprarlo, alimentarlo, *entrenarlo*…', { size: 66, hlT: at(L.caro, 9) });
headline(at(L.caro, 12, -0.05), atE(L.caro, 15, 0.02), 'Matarlo en cada *pelea*…', { size: 84, hlT: at(L.caro, 15) });
{
  const c = scene(at(L.caro, 0, -0.06), atE(L.caro, 15, 0.02), t => {
    set(bk.wrap, { y: (1 - p(t, at(L.caro, 0, -0.01), 0.45, E.outBack)) * 900, r: -1, o: 1 });
    gface(gl, t, { look: t < at(L.caro, 12, -0.08) ? [4, -1] : [2, 3], sweat: t > at(L.caro, 12, 0.02), oh: t > at(L.caro, 12, 0.07) && t < at(L.caro, 13, -0.01), aR: wobble(t, 0.5, 4), seed: 1 });
    set(gl.d, { y: wobble(t, 0.5, 3) });
    const kt = pop(t, at(L.caro, 3), 0.45); const sw = t > at(L.caro, 3) ? Math.sin((t - at(L.caro, 3)) * 6) * 18 * Math.exp(-(t - at(L.caro, 3)) * 1.2) : 0;
    set(tag, { s: kt * (1 + 0.08 * Math.sin(clamp((t - at(L.caro, 3)) / 0.4) * Math.PI)), r: -8 + sw, o: t < at(L.caro, 3) ? 0 : 1 });
    ROWS.forEach(rw => { popA(rw.l, t, rw.t, { rise: 20 }); rw.c.forEach((cn, i) => popA(cn, t, rw.t + 0.12 + i * 0.07, { rise: 30 })); });
    // calendario que pasa hojas
    const kf = clamp((t - at(L.caro, 10)) / 0.95); const pg = Math.floor(kf * 6);
    cal.lastChild.style.transform = (t > at(L.caro, 10) && t < atE(L.caro, 11, 0.07)) ? `rotateX(${f1(((kf * 6) % 1) * 180)}deg)` : 'none';
    popA(cal, t, at(L.caro, 10), {}); calN.textContent = t < at(L.caro, 10) ? 'AÑO' : (pg % 2 ? 'AÑO' : 'AÑO');
    popA(tot, t, atE(L.caro, 11, -0.08), { rise: 20 }); paint(totHL, t, atE(L.caro, 11, -0.03), 0.3);
    const kx = p(t, at(L.caro, 12, 0.02), 0.4, E.inOutCubic); redX.setAttribute('stroke-dashoffset', f1((1 - kx) * 900)); redX.style.opacity = t > at(L.caro, 12, 0.02) ? 1 : 0;
  });
  const bk = paperPiece(c, 50, 410, 980, 640, { seed: 41, bg: '#FBF6EA' });
  box(bk.inner, 0, 0, 962, 622, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 2px, transparent 2px 50px)', backgroundPosition: '0 26px' });
  box(bk.inner, 470, 0, 8, 622, { background: 'linear-gradient(90deg, rgba(43,33,24,.0), rgba(43,33,24,.35), rgba(43,33,24,.0))' });
  box(bk.inner, 500, 0, 3, 622, { background: RED, opacity: 0.5 });
  const gl = mkGlad(bk.wrap, [70, 50, 300, 560], { type: 'murm', seed: 8 });
  const tag = box(bk.wrap, 236, 236, 260, 170, { zIndex: 6, transformOrigin: '30px 20px' });
  tag.innerHTML = `<svg width="260" height="170" viewBox="0 0 260 170" style="overflow:visible;position:absolute;left:0;top:0">${cut('<path d="M8,40 L50,6 L250,6 L250,160 L50,160 L8,126 Z"/>', 6, 8)}<path d="M8,40 L50,6 L250,6 L250,160 L50,160 L8,126 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/><circle cx="38" cy="83" r="11" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><path d="M-60,-60 Q0,30 30,80" stroke="${INK}" stroke-width="4" fill="none"/></svg>
   <div style="position:absolute;left:58px;top:24px;width:186px;text-align:center;font-family:Rye;font-size:34px;line-height:1;color:${INK}">CARÍSIMO</div><div style="position:absolute;left:58px;top:72px;width:186px;text-align:center;font-family:Playfair;font-weight:900;font-size:62px;line-height:1;color:${RED}">✦✦✦</div>`;
  el('div', bk.wrap, { left: '520px', top: '40px', fontFamily: 'Rye', fontSize: '44px', color: INK, whiteSpace: 'nowrap' }, 'CUENTAS');
  const ROWS = [];
  [['compra', at(L.caro, 6), 3], ['comida', at(L.caro, 7), 3], ['entrenar (años)', at(L.caro, 9), 4]].forEach((q, i) => {
    const y = 120 + i * 130;
    const l = el('div', bk.wrap, { left: '520px', top: px(y), fontFamily: 'SpecialElite', fontSize: '34px', color: INK, whiteSpace: 'nowrap' }, (i + 1) + '. ' + q[0]);
    const cs = []; for (let k = 0; k < q[2]; k++) { const e = box(bk.wrap, 540 + k * 56, y + 50, 52, 52, { zIndex: 3 }); e.innerHTML = coinSvg(52); cs.push(e); }
    ROWS.push({ l, c: cs, t: q[1] });
  });
  const cal = box(bk.wrap, 790, 418, 74, 82, { zIndex: 4, perspective: '200px' });
  cal.innerHTML = `<div style="position:absolute;inset:0;background:#fff;border:4px solid ${INK};border-radius:8px;box-shadow:4px 4px 0 ${SH}"></div><div style="position:absolute;left:0;top:0;width:74px;height:22px;background:${RED};border:4px solid ${INK};border-radius:8px 8px 0 0"></div><div class="calN" style="position:absolute;left:0;top:30px;width:74px;text-align:center;font-family:Rye;font-size:20px;color:${INK}">AÑO</div><div style="position:absolute;left:4px;top:22px;width:66px;height:28px;background:#fff;border-bottom:2px solid ${INK};transform-origin:50% 0"></div>`;
  const calN = cal.querySelector('.calN');
  const tot = el('div', bk.wrap, { left: '520px', top: '500px', width: '400px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '44px', lineHeight: 1.05, color: INK, borderTop: `6px double ${INK}`, paddingTop: '6px', whiteSpace: 'nowrap' }, `TOTAL:<br>${hlSpan('un dineral', 'tothl')}`);
  const totHL = tot.querySelector('.tothl');
  const xs = svgLayer(bk.wrap, 8); xs.innerHTML = `<path class="rx" d="M520,100 L920,520 M920,100 L520,520" stroke="${RED}" stroke-width="16" stroke-linecap="round" fill="none" stroke-dasharray="900" stroke-dashoffset="900" opacity=".85"/>`;
  const redX = xs.querySelector('.rx');
}
colorHit(atE(L.caro, 15, 0.02), at(L.clem, 0, -0.05), YEL, c => {
  const t1 = el('div', c, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '138px', lineHeight: 1, color: INK, zIndex: 4 }, '¡TIRAR EL<br>DINERO!');
  const hole = box(c, 190, 1010, 700, 190, { zIndex: 2 }); hole.innerHTML = `<svg width="700" height="190" style="overflow:visible"><ellipse cx="350" cy="95" rx="340" ry="86" fill="${INK}"/><ellipse cx="350" cy="80" rx="300" ry="60" fill="#000"/></svg>`;
  const lip = box(c, 190, 1010, 700, 190, { zIndex: 6 }); lip.innerHTML = `<svg width="700" height="190" style="overflow:visible"><path d="M10,95 A340,86 0 0,0 690,95 A340,70 0 0,1 10,95 Z" fill="${INK}"/></svg>`;
  const CN = []; const r = rng(55);
  for (let i = 0; i < 11; i++) { const e = box(c, 0, 0, 120, 120, { zIndex: 5 }); e.innerHTML = coinSvg(120, INK); CN.push({ e, x: 330 + r() * 420, t0: at(L.caro, 16, -0.03) + i * 0.12, sp: 0.55 + r() * 0.2, rr: (r() - .5) * 600 }); }
  CN.forEach(q => q.e.querySelectorAll('path').forEach(pth => pth.setAttribute('fill', YEL)));
  const st = stamp(c, 330, 760, 'PÉRDIDA', { size: 96, bw: 12, z: 7, col: INK, bg: 'rgba(255,255,255,.0)' });
  return t => {
    set(t1, { s: lerp(1.35, 1, p(t, atE(L.caro, 15, 0.02), 0.2)), o: 1 }); t1.style.textShadow = glitch(t, atE(L.caro, 15, 0.02), 0.25);
    CN.forEach(q => { const k = clamp((t - q.t0) / q.sp); const y = lerp(580, 1080, k * k); set(q.e, { x: q.x - 60, y, r: q.rr * k, s: 1 - Math.max(0, (y - 1000) / 160) * 0.7, o: t < q.t0 || k >= 1 ? 0 : 1 }); });
    stampA(st, t, at(L.caro, 17), -10);
  };
});

/* ======================================================================
   7 · CLEMENCIA · MISSIO (L7)  at(L.clem, 0, -0.05) … at(L.augusto, 0, -0.07)   (+ cameo del emú)
   ====================================================================== */
headline(at(L.clem, 0, -0.02), atE(L.clem, 5, 0.02), 'Podía pedir *clemencia*', { size: 84, hlT: at(L.clem, 5) });
headline(atE(L.clem, 5, 0.02), at(L.augusto, 0, -0.07), 'Y muchas veces se la *concedían*', { size: 62, hlT: at(L.clem, 11) });
{
  const c = scene(at(L.clem, 0, -0.05), at(L.augusto, 0, -0.07), t => {
    set(cam, { s: 1.02 + 0.05 * p(t, at(L.clem, 0, -0.05), 4.1, E.linear) });
    const up = p(t, atE(L.clem, 3, -0.02), 0.35, E.outBack);
    gface(gk, t, { look: up > 0.5 ? [-3, -3] : [3, -1], aR: lerp(115, 0, up) + (t > at(L.clem, 5, 0.13) ? Math.sin(t * 6) * 4 : 0), sweat: t < at(L.clem, 11, 0.04), closed: t > at(L.clem, 11, 0.14) && t < atE(L.clem, 11, -0.07), blink: t < at(L.clem, 11, 0.04), brow: t > atE(L.clem, 3, -0.02) && t < at(L.clem, 11, 0.04) ? -4 : 0, seed: 2 });
    const low = p(t, at(L.clem, 11), 0.5, E.inOutCubic);
    gface(gs, t, { look: t > at(L.clem, 7, 0.01) ? [-4, -4] : [-4, 2], aR: lerp(-150, 20, low), seed: 3, brow: -3 });
    face(ed, t, { look: [3, 3], seed: 0.4 }); ed.headg.setAttribute('transform', t > at(L.clem, 8, 0.14) ? `rotate(0) translate(0 ${f1(Math.max(0, Math.sin((t - at(L.clem, 8, 0.14)) * 12)) * 8)})` : '');
    popA(edc, t, at(L.clem, 7, 0.11), { r: -3 });
    CL.forEach((q, i) => { const on = t > at(L.clem, 7) + i * 0.04; set(q, { o: on ? 1 : 0, s: on ? pop(t, at(L.clem, 7) + i * 0.04, 0.3) : 0, r: on ? Math.sin(t * 14 + i) * 25 : 0, y: on ? -Math.abs(Math.sin(t * 7 + i)) * 10 : 0 }); });
    popA(ms, t, at(L.clem, 11), { r: -3, s: 1 }); popA(msT, t, at(L.clem, 11, 0.16), { rise: 20 });
    // cameo del emú (ala arriba)
    const ke = p(t, at(L.clem, 7, 0.06), 0.3, E.outBack) * (1 - p(t, atE(L.clem, 8, -0.05), 0.18, E.inCubic));
    set(emu.d, { y: (1 - ke) * 260, o: t > at(L.clem, 7, 0.06) && t < atE(L.clem, 9, -0.01) ? 1 : 0, r: -4 });
    face(emu, t, { look: [-5, 3], wing: -70 - Math.sin(t * 18) * 10, half: false, blink: false, jaw: t > atE(L.clem, 7, 0.03) && t < at(L.clem, 8, 0.14) ? 0.5 : 0, bR: 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  box(cam, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${coliseumSvg({ top: 380, seed: 21 })}</svg>`;
  const emuClip = box(cam, 500, 360, 220, 300, { overflow: 'hidden', zIndex: 2 });
  const emu = mkEmu(emuClip, [20, 40, 190, 285], { seed: 61 });
  const pal = box(cam, 60, 400, 290, 280, { zIndex: 3 }); pal.innerHTML = `<svg width="290" height="280" style="overflow:visible">${cut('<rect x="10" y="40" width="270" height="240"/>', 5, 6)}<rect x="10" y="40" width="270" height="240" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><path d="M0,10 L290,10 L280,56 L10,56 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${22 + k * 46},10 L${10 + k * 46 + 30},56" stroke="#fff" stroke-width="10" opacity=".7"/>`).join('')}</svg>`;
  const ed = mk(pal, [45, 60, 200, 256], romanInner({ purple: true }), '0 0 360 460', 'rom'); ed.headg = ed.d.querySelector('.headg');
  { const fr = box(pal, 0, 220, 290, 60, { background: BRASS, border: `4px solid ${INK}`, zIndex: 2 }); fr.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 2px, transparent 2px 7px)'; }
  const edc = chip(cam, 90, 690, 'el editor del juego', { size: 30, bg: INK, color: YEL, z: 9 });
  const CL = []; const r = rng(77);
  for (let i = 0; i < 12; i++) { const e = box(cam, (i % 6 < 2 ? 380 + (i % 6) * 60 : 610 + (i % 6) * 70) + r() * 16, 430 + Math.floor(i / 6) * 120 + r() * 20, 54, 44, { zIndex: 4 }); e.innerHTML = `<svg width="54" height="44" viewBox="0 0 54 44" style="overflow:visible"><path d="M4,6 Q26,-4 50,8 Q44,24 52,40 Q28,30 6,38 Q12,22 4,6 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`; CL.push(e); }
  const gk = mkGlad(cam, [300, 540, 300, 560], { type: 'ret', pose: 'kneel', arm: 'finger', seed: 11 }); gk.d.style.zIndex = 5;
  const gs = mkGlad(cam, [640, 500, 300, 560], { type: 'murm', seed: 12 }); gs.d.style.zIndex = 5;
  const ms = chip(c, 330, 1110, '«missio»', { size: 66, bg: YEL, color: INK, z: 12 });
  const msT = el('div', c, { left: '640px', top: '1134px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '50px', color: INK, background: '#fff', padding: '2px 18px 6px', border: `4px solid ${INK}`, borderRadius: '12px', zIndex: 12, whiteSpace: 'nowrap' }, '= perdón');
}

/* ======================================================================
   8 · AUGUSTO Y SU DECRETO (L8)  at(L.augusto, 0, -0.07) … at(L.ojo, 0, -0.06)
   ====================================================================== */
headline(at(L.augusto, 0, -0.05), at(L.augusto, 6, -0.02), 'Incluso el emperador *Augusto*', { size: 74, hlT: at(L.augusto, 3) });
headline(at(L.augusto, 6, -0.02), at(L.ojo, 0, -0.06), 'Llegó a *prohibir*…', { size: 92, hlT: at(L.augusto, 6) });
{
  const c = scene(at(L.augusto, 0, -0.07), at(L.ojo, 0, -0.06), t => {
    set(sun, { r: t * 8 });
    set(bu.d, { s: pop(t, at(L.augusto, 0, 0.01), 0.5), o: t < at(L.augusto, 0, 0.01) ? 0 : 1, y: wobble(t, 0.4, 2) });
    face(bu, t, { look: t > at(L.augusto, 4, 0.05) ? [5, 1] : [0, 0], brow: t > at(L.augusto, 5, 0.01) ? -4 : 0, seed: 0.6 });
    bu.headg.setAttribute('transform', t > at(L.augusto, 6) && t < at(L.augusto, 8, 0.03) ? `translate(0 ${f1(Math.sin((t - at(L.augusto, 6)) * 18) * 5)})` : '');
    popA(plq, t, at(L.augusto, 3), { r: -2 }); set(spk, { o: t > at(L.augusto, 3) && t < at(L.augusto, 6, 0.03) ? 1 : 0, s: 0.8 + Math.sin(t * 14) * 0.3, r: t * 200 });
    const ku = p(t, at(L.augusto, 4), 0.45, E.outCubic); set(sc, { o: t < atE(L.augusto, 3) ? 0 : 1, s: pop(t, atE(L.augusto, 3), 0.3) }); sheet.style.height = px(f1(30 + ku * 520)); set(rollB, { y: ku * 520 });
    LN.forEach(q => { q.e.style.opacity = t >= q.t - 0.05 ? 1 : 0; set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 16 }); });
    paint(pHL, t, at(L.augusto, 12), 0.35);
    stampA(seal, t, at(L.augusto, 12, 0.08), 0);
  });
  sceneBg(c, { background: '#E7D3B0' });
  const sun = rays(c, -180, 160, 1440, 26, 'rgba(255,230,0,.25)', 'transparent', 0);
  const bu = mk(c, [50, 420, 440, 562], romanInner({ col: MARBLE }), '0 0 360 460', 'rom'); bu.headg = bu.d.querySelector('.headg'); bu.d.style.zIndex = 3;
  const ped = box(c, 80, 970, 380, 80, { zIndex: 2, background: STONE, border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(38deg, rgba(43,33,24,.18) 0 2px, transparent 2px 7px)' });
  const plq = el('div', c, { left: '120px', top: '982px', width: '300px', textAlign: 'center', fontFamily: 'Rye', fontSize: '46px', color: INK, background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', zIndex: 4 }, 'AUGUSTO');
  const spk = el('div', c, { left: '390px', top: '440px', fontSize: '80px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 5 }, '✦');
  const sc = box(c, 470, 430, 500, 640, { zIndex: 4 });
  const sheet = box(sc, 20, 40, 440, 30, { background: '#F3E3BC', border: `5px solid ${INK}`, overflow: 'hidden', boxShadow: `8px 10px 0 ${SH}` });
  box(sheet, 0, 0, 440, 600, { backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(160,110,40,0) 40%, rgba(160,110,40,.2) 100%)' });
  el('div', sheet, { left: 0, top: '30px', width: '430px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: RED }, 'DECRETO');
  const LN = []; [['Prohibidos', at(L.augusto, 6)], ['los combates', at(L.augusto, 8)], ['sin posibilidad', at(L.augusto, 9)], ['de perdón', at(L.augusto, 12)]].forEach((q, i) => {
    const y = [110, 184, 262, 336][i];
    const e = el('div', sheet, { left: 0, top: px(y), width: '430px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontStyle: i >= 2 ? 'italic' : 'normal', fontSize: i === 3 ? '62px' : '48px', color: INK, whiteSpace: 'nowrap' }, i === 3 ? `de ${hlSpan('perdón', 'phl')}` : q[0]);
    LN.push({ e, t: q[1] });
  });
  const pHL = sheet.querySelector('.phl');
  const rollT = box(sc, 0, 10, 480, 50); rollT.innerHTML = `<svg width="480" height="50" style="overflow:visible"><rect x="10" y="6" width="460" height="40" rx="20" fill="#E8D3A2" stroke="${INK}" stroke-width="5"/><rect x="10" y="6" width="460" height="40" rx="20" fill="url(#hA)" opacity=".5"/><rect x="-6" y="12" width="24" height="28" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="462" y="12" width="24" height="28" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/></svg>`;
  const rollB = box(sc, 0, 40, 480, 50); rollB.innerHTML = rollT.innerHTML;
  const seal = box(c, 770, 930, 140, 140, { zIndex: 7 }); seal.innerHTML = `<svg viewBox="0 0 140 140" width="140" height="140" style="overflow:visible"><path d="M70,6 C96,4 132,30 134,66 C138,100 108,134 70,134 C30,136 4,104 6,70 C6,34 40,8 70,6 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><circle cx="70" cy="70" r="42" fill="none" stroke="#7a0a1c" stroke-width="5"/><text x="70" y="88" text-anchor="middle" font-family="Rye" font-size="50" fill="#7a0a1c">A</text></svg>`;
}

/* ======================================================================
   9 · ¡OJO! (L9)  at(L.ojo, 0, -0.06) … at(L.osea, 0, -0.07)
   ====================================================================== */
headline(at(L.ojo, 1, -0.04), at(L.ojo, 4, -0.02), 'Sí morían *gladiadores*', { size: 84, hlT: at(L.ojo, 2), color: PAPER, shadow: `4px 4px 0 ${INK}` });
headline(at(L.ojo, 4, -0.02), atE(L.ojo, 7, 0.04), 'Era un espectáculo *brutal*', { size: 80, hlT: at(L.ojo, 7), hlc: PINK, color: PAPER, shadow: `4px 4px 0 ${INK}` });
headline(atE(L.ojo, 7, 0.04), atE(L.ojo, 15, 0.01), 'Pero no en *cada* combate', { size: 84, hlT: at(L.ojo, 14), color: PAPER, shadow: `4px 4px 0 ${INK}` });
headline(atE(L.ojo, 15, 0.01), at(L.osea, 0, -0.07), 'Como en las *películas*', { size: 84, hlT: at(L.ojo, 19), color: PAPER, shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(at(L.ojo, 0, -0.06), at(L.osea, 0, -0.07), t => {
    const ko = p(t, atE(L.ojo, 0, 0.01), 0.35, E.inOutCubic);
    set(ojo, { s: lerp(1, 0.45, ko) * (t < at(L.ojo, 0) ? 0 : lerp(2.3, 1, p(t, at(L.ojo, 0), 0.18))), x: ko * 330, y: ko * -260, r: -8, o: t < at(L.ojo, 0) ? 0 : 0.97 });
    const kl = p(t, at(L.ojo, 1), 0.5, E.outBack), out = p(t, atE(L.ojo, 15, -0.06), 0.25, E.inCubic);
    set(lap, { y: (1 - kl) * 300 + out * 40, o: t < at(L.ojo, 1) ? 0 : 1 - out, r: -2 });
    set(lapH, { s: 1 + 0.1 * Math.sin(clamp((t - at(L.ojo, 2, 0.01)) / 0.4) * Math.PI) });
    popA(br, t, at(L.ojo, 7), { r: -6, s: 1 });
    set(br, { o: t < at(L.ojo, 7) ? 0 : 1 - p(t, atE(L.ojo, 7, -0.01), 0.15), s: pop(t, at(L.ojo, 7), 0.35) * (1 - p(t, atE(L.ojo, 7, -0.01), 0.15)), r: -6 + shake(t, at(L.ojo, 7), 0.4, 6) });
    const ks = p(t, at(L.ojo, 8), 0.6, E.outElastic);
    set(sg, { x: (1 - clamp(ks)) * 600, r: (1 - ks) * 14 + Math.sin(t * 2) * 1.2, o: t < at(L.ojo, 8, -0.02) ? 0 : 1 });
    paint(sgHL, t, at(L.ojo, 14), 0.3);
    set(cl.d, { s: pop(t, at(L.ojo, 16, 0.05), 0.4), r: -6, o: t < at(L.ojo, 16, 0.03) ? 0 : 1 }); cl.clap.setAttribute('transform', `rotate(${f1(-26 * (1 - p(t, atE(L.ojo, 16, -0.06), 0.12, E.inCubic)))} 18 78)`);
    set(xx, { s: pop(t, at(L.ojo, 19, 0.1), 0.3), o: t < at(L.ojo, 19, 0.1) ? 0 : 1 });
    set(spot, { o: 0.9 + Math.sin(t * 3) * 0.05 });
  }, { clip: true });
  sceneBg(c, { background: '#2a2018' });
  const col = box(c, 0, 0, 1080, 1920, { opacity: 0.38 }); col.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${coliseumSvg({ top: 380, seed: 33, sky: '#4a3a2a' })}</svg>`;
  const spot = box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 40% 62%, rgba(255,230,180,.25), rgba(0,0,0,.55) 70%)', zIndex: 1 });
  const ojo = stamp(c, 330, 600, '¡OJO!', { size: 160, bw: 14, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const lap = box(c, 110, 560, 380, 470, { zIndex: 3 });
  lap.innerHTML = `<svg width="380" height="470" style="overflow:visible">${cut('<path d="M20,440 L20,140 Q20,20 190,20 Q360,20 360,140 L360,440 Z"/>', 8, 10)}<path d="M20,440 L20,140 Q20,20 190,20 Q360,20 360,140 L360,440 Z" fill="#B9B0A0" stroke="${INK}" stroke-width="6"/><path d="M20,440 L20,140 Q20,20 190,20 Q360,20 360,140 L360,440 Z" fill="url(#hA)" opacity=".45"/><path d="M50,430 L50,150 Q50,52 190,52 Q330,52 330,150 L330,430" fill="none" stroke="${INK}" stroke-width="3"/><path d="M0,440 Q190,410 380,440 L380,470 L0,470 Z" fill="#6b5236" stroke="${INK}" stroke-width="5"/><path d="M80,118 l20,20 M260,140 l18,-26 M300,300 l-14,24" stroke="${INK}" stroke-width="3"/></svg>`;
  const lapH = box(lap, 140, 92, 100, 100); lapH.innerHTML = `<svg viewBox="96 0 120 150" width="100" height="100" style="overflow:hidden;opacity:.8"><use href="#gladM" width="300" height="560"/></svg>`; lapH.style.filter = 'grayscale(1) contrast(1.1)';
  el('div', lap, { left: '40px', top: '224px', width: '300px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '42px', lineHeight: 1.15, color: INK }, 'sí morían<br><b style="font-family:Playfair;font-size:46px">gladiadores</b>');
  const br = chip(c, 520, 600, 'brutal', { size: 80, bg: RED, color: '#fff', z: 9 });
  const sg = box(c, 500, 600, 440, 520, { zIndex: 5 });
  sg.innerHTML = `<svg width="440" height="520" style="overflow:visible">${cut('<rect x="200" y="200" width="40" height="320"/><rect x="10" y="20" width="420" height="230" rx="14"/>', 7, 9)}<rect x="200" y="200" width="40" height="320" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="200" y="200" width="40" height="320" fill="url(#hD)" opacity=".5"/><rect x="10" y="20" width="420" height="230" rx="14" fill="#D8B27A" stroke="${INK}" stroke-width="6"/><rect x="10" y="20" width="420" height="230" rx="14" fill="url(#hW)" opacity=".25"/><circle cx="40" cy="50" r="8" fill="${INK}"/><circle cx="400" cy="50" r="8" fill="${INK}"/><circle cx="40" cy="220" r="8" fill="${INK}"/><circle cx="400" cy="220" r="8" fill="${INK}"/></svg>`;
  el('div', sg, { left: '10px', top: '50px', width: '420px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '54px', lineHeight: 1.1, color: INK }, `pero no en<br>${hlSpan('cada', 'sghl')} combate`);
  const sgHL = sg.querySelector('.sghl');
  const cl = mk(c, [120, 640, 380, 309], clapInner('MATANZA'), '0 0 320 260', 'clap'); cl.clap = cl.d.querySelector('.clap'); cl.d.style.zIndex = 6;
  el('div', cl.d, { left: '20px', top: '-56px', width: '340px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: YEL, whiteSpace: 'nowrap' }, 'versión película');
  const xx = box(c, 150, 660, 320, 300, { zIndex: 7 }); xx.innerHTML = XSVG;
}

/* ======================================================================
   10 · DEPORTISTAS DE ÉLITE (L10)  at(L.osea, 0, -0.07) … at(L.osea, 12, 0.02)
   ====================================================================== */
headline(at(L.osea, 0, -0.03), at(L.osea, 2, -0.01), 'O sea…', { size: 110, y: 214 });
headline(at(L.osea, 2, -0.01), at(L.osea, 12, 0.02), 'Más *deportistas de élite*…', { size: 68, hlT: at(L.osea, 8), y: 186 });
{
  const c = scene(at(L.osea, 0, -0.07), at(L.osea, 12, 0.02), t => {
    set(ry, { r: t * 12 });
    const jump = t > atE(L.osea, 0, 0.02) && t < at(L.osea, 2, 0.07) ? Math.sin((t - atE(L.osea, 0, 0.02)) / 0.55 * Math.PI) * 120 : 0;
    const k0 = p(t, at(L.osea, 0), 0.3, E.outCubic);
    set(ch.d, { x: (1 - k0) * -500, y: -jump + wobble(t, 0.6, 2), o: 1 });
    const vic = p(t, atE(L.osea, 7, -0.01), 0.35, E.outBack);
    gface(ch, t, { look: t > atE(L.osea, 7, -0.01) ? [0, 1] : [3, -1], aR: lerp(-10, -150, vic), seed: 1, hr: vic * -4 });
    set(ban, { y: (1 - p(t, at(L.osea, 2, -0.03), 0.5, E.outBack)) * -400, r: -1.5 + Math.sin(t * 2) * 1, o: 1 });
    FL.forEach(q => { const k = clamp((t - q.t) / 0.3); set(q.e, { s: Math.sin(k * Math.PI) * 1.6, r: t * 200, o: t > q.t && k < 1 ? 1 : 0 }); });
    ch.medals.forEach((m, i) => m.setAttribute('transform', `rotate(${f1(Math.sin(t * 5 + i) * 6)} ${[118, 150, 182][i]} 186)`));
    popA(eli, t, at(L.osea, 8), { r: 6 });
  }, { clip: true });
  sceneBg(c, { background: PAPER });
  const ry = rays(c, -180, 140, 1440, 28, 'rgba(255,230,0,.35)', 'transparent', 0);
  const ban = box(c, 80, 296, 920, 110, { zIndex: 2 });
  ban.innerHTML = `<svg width="920" height="110" style="overflow:visible">${cut('<rect x="0" y="0" width="920" height="100" rx="8"/>', 6, 8)}<rect x="0" y="0" width="920" height="100" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<rect x="${k * 104 + 8}" y="8" width="52" height="84" fill="${RED}" opacity=".18"/>`).join('')}</svg>`;
  el('div', ban, { left: 0, top: '18px', width: '920px', textAlign: 'center', fontFamily: 'Rye', fontSize: '56px', color: RED, whiteSpace: 'nowrap' }, '★ TU MARCA AQUÍ ★');
  const pod = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  pod.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut('<rect x="200" y="1040" width="200" height="130"/><rect x="400" y="975" width="280" height="195"/><rect x="680" y="1070" width="200" height="100"/>', 8, 10)}
   <rect x="200" y="1040" width="200" height="130" fill="#d9d4cc" stroke="${INK}" stroke-width="5"/><rect x="680" y="1070" width="200" height="100" fill="#d29a55" stroke="${INK}" stroke-width="5"/><rect x="400" y="975" width="280" height="195" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="400" y="975" width="280" height="195" fill="url(#hA)" opacity=".35"/>
   <text x="540" y="1110" text-anchor="middle" font-family="Rye" font-size="110" fill="${INK}">1</text><text x="330" y="1125" text-anchor="middle" font-family="Rye" font-size="60" fill="${INK}">2</text><text x="780" y="1140" text-anchor="middle" font-family="Rye" font-size="50" fill="${INK}">3</text></svg>`;
  const ch = mkGlad(c, [370, 398, 340, 635], { type: 'murm', seed: 14, medals: true }); ch.d.style.zIndex = 4;
  const FL = []; [[170, 600, at(L.osea, 8, 0.04)], [790, 700, atE(L.osea, 8, -0.17)], [220, 820, at(L.osea, 10, 0.09)], [760, 900, at(L.osea, 10, 0.49)], [200, 520, atE(L.osea, 10, -0.26)]].forEach(q => { const e = el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '110px', color: '#fff', textShadow: `0 0 20px ${YEL}, 3px 3px 0 ${INK}`, zIndex: 6, lineHeight: 1 }, '✦'); FL.push({ e, t: q[2] }); });
  const eli = chip(c, 680, 560, 'ÉLITE', { size: 64, bg: YEL, color: INK, z: 7 });
}
/* ======================================================================
   10b · GOLPE ROSA CITABLE «…que a carne de cañón» → en «¿Te lo creías?» botones SÍ / NO (misma escena)
   ====================================================================== */
colorHit(S.hit2, S.bal, PINK, c => {
  const g = mkGlad(c, [310, 820, 460, 859], { type: 'murm', seed: 15 }); g.d.style.filter = SIL; g.d.style.zIndex = 3;
  const top = box(c, 0, 0, 1080, 900, { zIndex: 4, transformOrigin: '540px 200px' });
  const t1 = el('div', top, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '120px', lineHeight: 1.05, color: INK, zIndex: 4 }, '…que a<br>carne de cañón');
  const strike = box(top, 70, 390, 940, 60, { zIndex: 5 }); strike.innerHTML = `<svg width="940" height="60" style="overflow:visible"><path class="sk" d="M10,40 Q470,10 930,30" stroke="${INK}" stroke-width="20" stroke-linecap="round" fill="none" stroke-dasharray="1000" stroke-dashoffset="1000"/><path class="sk2" d="M10,40 Q470,10 930,30" stroke="${RED}" stroke-width="12" stroke-linecap="round" fill="none" stroke-dasharray="1000" stroke-dashoffset="1000"/></svg>`;
  const sk = strike.querySelector('.sk'), sk2 = strike.querySelector('.sk2');
  const no = stamp(top, 380, 640, '¡NO!', { size: 120, bw: 13, z: 6, col: INK, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  // CTA: pregunta + botones gigantes
  const q = el('div', c, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: 1.05, color: INK, zIndex: 8 }, `¿Te lo ${hlSpan('<i>creías</i>', 'qhl', YEL)}?`);
  const qhl = q.querySelector('.qhl');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '1010px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 30 }, txt);
  const bS = btn(120, 'SÍ', YEL, INK), bN = btn(560, 'NO', '#fff', RED);
  const thU = box(c, 330, 1130, 120, 175, { zIndex: 35 }); thU.innerHTML = fistSvg(175);
  const thD = box(c, 770, 1130, 120, 175, { zIndex: 35 }); thD.innerHTML = fistSvg(175);
  const CM = [];
  [['GLADM', '@tribuno_paco', 'SÍ, toda la vida 😳'], ['VECINA', '@lucia_del_foro', 'No, ¡ya lo sabía!']].forEach((m, i) => {
    const e = box(c, 40, [560, 700][i], 520, 112, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 10, 84, m[0], { bw: 3 });
    el('div', e, { left: '108px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '108px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: [K.creias + 0.25, K.creias + 0.65][i] });
  });
  return t => {
    const out = p(t, K.te - 0.1, 0.18, E.inCubic);
    set(top, { s: 1 - 0.5 * out, y: -out * 300, o: 1 - out });
    set(t1, { s: lerp(1.3, 1, p(t, S.hit2, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, at(L.osea, 13, -0.03), 0.3);
    const k = p(t, at(L.osea, 15, 0.01), 0.3, E.inOutCubic); sk.setAttribute('stroke-dashoffset', f1((1 - k) * 1000)); sk2.setAttribute('stroke-dashoffset', f1((1 - k) * 1000));
    stampA(no, t, atE(L.osea, 15, -0.13), -10);
    // la silueta se aparta a la derecha y duda
    const mv = p(t, K.te - 0.1, 0.3, E.inOutCubic);
    gface(g, t, { aR: lerp(60 + Math.sin(t * 8) * 10, 150, mv), aL: -20, hr: Math.sin(t * 6) * 6 });
    set(g.d, { x: mv * 220, y: -Math.abs(Math.sin((t - S.hit2) * 6)) * 30 * (1 - mv) - mv * 380, s: lerp(1, 0.62, mv) });
    set(q, { o: t < K.te - 0.04 ? 0 : 1, s: pop(t, K.te - 0.04, 0.3) }); paint(qhl, t, K.creias, 0.3);
    [[bS, K.si, thU, 0], [bN, K.noB, thD, 1]].forEach(([b, t0, th, i]) => {
      const tin = K.te + 0.1 + i * 0.12, press = t > t0 && t < t0 + 0.14;
      set(b, { s: pop(t, tin, 0.4) * (press ? 0.9 : 1 + 0.07 * Math.max(0, Math.sin((t - t0) * 9)) * (t > t0 ? 1 : 0)), r: [-3, 3][i], o: t < tin ? 0 : 1 });
      set(th, { s: pop(t, t0 - 0.12, 0.3), r: i ? Math.sin(t * 7) * 8 : 180 + Math.sin(t * 7) * 8, o: t < t0 - 0.12 ? 0 : 1 });
    });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   11 · MARCA AL FINAL: EL VECINO EN SU BALCÓN (rápido)  S.bal … S.book
   ====================================================================== */
{
  const T0 = S.bal, T1 = S.book;
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.2, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.05 * p(t, T0, T1 - T0, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, K.vecino - 0.1, 0.35, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > T0 + 0.15 && t < K.vecino;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.3 ? [0, -5] : [0, 0], bL: fanFast ? 8 : 6, bR: fanFast ? 8 : 12, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), noCup: true, seed: 0.3 });
    popA(tag, t, K.vecino, { r: -5 });
    const ks = p(t, T0 + 0.02, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, T0, 2)) + (1 - ks) * 8, o: t < T0 + 0.01 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino + 0.1, 0.3);
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
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const tag = chip(cam, 640, 610, 'tu vecino', { size: 44, bg: PINK });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', K.isoy], ['tu', K.isoy + 1], ['vecino…', K.isoy + 2]].forEach(([wd, wi], k) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = wd === 'vecino…' ? hlSpan('vecino…', 'shl') : wd; (k < 2 ? sl1 : sl2).appendChild(s); sw.push({ e: s, t: W[wi].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   12 · …Y ESTO NO VENÍA EN EL LIBRO — el libro HISTORIA se cierra de golpe  S.book … LOOP
   ====================================================================== */
headline(S.book, K.noV - 0.06, 'Y esto…', { size: 120, color: YEL, y: 220, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(K.noV - 0.06, LOOP, '…no venía en el *libro*.', { size: 84, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S.book, LOOP, t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    fq.style.display = sx > 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    const panic = t > TC - 0.35;
    gface(stand, t, { look: panic ? [4, -5] : [-3, 2], oh: panic, sweat: panic, aR: panic ? -60 : 0, seed: 1 }); set(stand.d, { y: wobble(t, 1, 3) - (panic ? Math.abs(Math.sin(t * 14)) * 10 : 0) });
    set(bookW, { s: 1.25 * pop(t, S.book + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    puffs.forEach((f, i) => { const kf = p(t, TC + 0.3, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 150 * kf, y: -kf * 120, s: 0.5 + kf, o: closed ? 1 - kf : 0 }); });
    set(fq, { r: Math.sin(t * 3) * 6 });
    popA(epl, t, TC + 0.3, { r: -1 });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 6; i++) lines += `<path d="M170,${990 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#gladM" x="250" y="470" width="250" height="467"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="720" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="40" fill="${INK}">GLADIADORES</text><text x="335" y="762" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="32" fill="${INK}">cap. «pulgar abajo»</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const fq = box(bookW, 280, 790, 120, 175, { zIndex: 1 }); fq.innerHTML = fistSvg(175);
  const stand = mkGlad(bookW, [640, 520, 230, 429], { type: 'murm', seed: 81 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '360px', top: '470px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const puffs = [0, 1, 2, 3].map(() => box(bookW, 480, 600, 120, 80, { borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}`, zIndex: 3 }));
  const epl = el('div', c, { left: '0', top: '1150px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:38px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 9 · El pulgar de los gladiadores</span>`);
}


/* =================== EL VECINO en su marco ovalado =================== */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
const CX = -41, CY = 45;
const OVK = (() => {
  const P = S.pol0, H1 = atE(L.caro, 15, 0.02), C = at(L.clem, 0), H2 = S.hit2;
  return [
    [0, CX, CY, 0.75, 0, 0], [P + 0.05, CX, CY, 0.75, 0, 0], [P + 0.06, CX, CY, 0.4, 0, 1], [P + 0.4, CX, CY, 0.75, 0, 1],
    [H1 - 0.02, CX, CY, 0.75, 0, 1], [H1 - 0.01, CX, CY, 0.75, 0, 0], [C + 0.05, CX, CY, 0.75, 0, 0], [C + 0.06, CX, CY, 0.4, 0, 1], [C + 0.35, CX, CY, 0.75, 0, 1],
    [H2 - 0.02, CX, CY, 0.75, 0, 1], [H2 - 0.01, CX, CY, 0.75, 0, 0],
  ];
})();
function ovalState(t) {
  if (t <= OVK[0][0]) return OVK[0];
  for (let i = 0; i < OVK.length - 1; i++) {
    const a = OVK[i], b = OVK[i + 1];
    if (t >= a[0] && t < b[0]) { const k = (b[0] - a[0]) < 0.02 ? 0 : (b[2] !== a[2] || b[1] !== a[1] || b[3] !== a[3] ? E.inOutCubic(clamp((t - a[0]) / (b[0] - a[0]))) : 0); const pk = b[3] > a[3] && a[3] < 0.7 ? E.outBack(clamp((t - a[0]) / (b[0] - a[0]))) : k; return [t, lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], pk), lerp(a[4], b[4], k), a[5]]; }
  }
  return OVK[OVK.length - 1];
}
const LAUGH = [[atE(L.osea, 7, -0.01), at(L.osea, 10, 0.09)]];
function updOval(t) {
  const st = ovalState(t);
  const inL = LAUGH.find(r => t >= r[0] && t < r[1]);
  const shk = inL ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st[1], y: st[2] + shk + wobble(t, 0.5, 2), s: st[3], r: st[4] + (inL ? Math.sin(t * 20) * 2 : 0), o: st[5] });
  if (st[5] === 0) return;
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3, noCup: true };
  if (inL) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  if (t > atE(L.pollice, 4, 0.01) && t < at(L.pollice, 7, 0.03)) { o.look = [5, -5]; o.bL = 8; o.bR = 8; }
  if (t > at(L.pollice, 9, 0.01) && t < atE(L.pollice, 13, 0.02)) { o.look = [6, 2]; o.bL = 4; o.bR = 14; }
  if (t > atE(L.caro, 2, -0.01) && t < at(L.caro, 4, 0.07)) { o.fan = Math.sin(t * 26) * 22 - 10; o.bL = 14; o.bR = 14; o.jaw = Math.max(o.jaw, 0.6); }
  if (t > at(L.caro, 12, 0.02) && t < atE(L.caro, 15)) { o.bL = 12; o.bR = 12; o.look = [3, 2]; }
  if (t > at(L.clem, 6) && t < atE(L.clem, 11, 0.03)) { o.bL = 10; o.bR = 4; }
  if (t > at(L.ojo, 0, -0.06) && t < atE(L.ojo, 1, -0.16)) { o.bL = 16; o.bR = 16; o.jaw = Math.max(o.jaw, 0.7); }
  if (t > atE(L.ojo, 6, -0.06) && t < atE(L.ojo, 7, -0.01)) { o.he = true; }
  vecFace(vecO, t, o);
}

/* =================== frame =================== */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1; s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic), kout = p(t, s.t1 - 0.12, 0.12, E.inCubic); set(s.c, { x: (1 - kin) * 160 * s.dir - kout * 150, o: Math.min(clamp(kin * 1.8), 1 - kout) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.t1; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.t1 - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updOval(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};
[[at(L.gancho, 6), .3, 8], [at(L.imagen, 12, 0.05), .3, 10], [at(L.gesto, 2, 0.09), .3, 8], [at(L.gesto, 7), .45, 18], [at(L.imagen, 25, 0.02), .3, 10], [at(L.mas, 10, 0.02), .3, 8], [at(L.caro, 3), .3, 10], [atE(L.caro, 15, 0.02), .4, 14], [at(L.caro, 17), .4, 12], [at(L.augusto, 12, 0.08), .3, 10], [at(L.ojo, 0), .4, 16], [at(L.ojo, 7), .35, 12], [at(L.osea, 12, 0.02), .4, 14], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
[
  [at(L.gancho, 0, -0.14), 'swoosh_up', .55], [at(L.gancho, 2, 0.01), 'thud', .7], [at(L.gancho, 4), 'glitch', .5], [at(L.gancho, 6), 'burst', .8], [at(L.gancho, 6, 0.25), 'gulp', .7], [at(L.gancho, 7, 0.06), 'boing', .6], [atE(L.gancho, 7, -0.09), 'pop2', .5], [atE(L.gancho, 10, -0.13), 'pop2', .5], [at(L.gancho, 13, 0.2), 'pop2', .5],
  [at(L.gesto, 0, 0.03), 'whoosh', .7], [at(L.gesto, 2, 0.04), 'thud', .7], [at(L.gesto, 6), 'pop', .6], [at(L.gesto, 7, -0.02), 'glitch', .5], [at(L.gesto, 7), 'stamp', 1.0], [atE(L.gesto, 9, -0.09), 'whoosh', .6],
  [at(L.pollice, 0, 0.05), 'paper', .7], [at(L.pollice, 1, 0.09), 'pop2', .5], [at(L.pollice, 5), 'stamp', .8], [atE(L.pollice, 6, -0.23), 'ding', .5], [at(L.pollice, 7, 0.05), 'pop', .7], [at(L.pollice, 9, 0.01), 'swoosh_up', .5], [at(L.pollice, 10), 'ping', .5], [at(L.pollice, 12), 'ping', .5], [at(L.pollice, 13, 0.45), 'boing', .6],
  [at(L.imagen, 0, -0.06), 'whoosh', .6], [at(L.imagen, 1, 0.12), 'paper', .5], [atE(L.imagen, 2, 0.02), 'pop2', .5], [at(L.imagen, 4, -0.01), 'pop2', .5], [atE(L.imagen, 5, -0.13), 'pop2', .5], [at(L.imagen, 12), 'stamp', .9], [atE(L.imagen, 16), 'ding', .8], [at(L.imagen, 18, 0.02), 'pop', .7],
  [at(L.imagen, 20, -0.02), 'whoosh', .6], [at(L.imagen, 21), 'clockfast', .35], [at(L.imagen, 23), 'pop2', .6], [atE(L.imagen, 23, -0.05), 'click', 1.0], [at(L.imagen, 25, 0.02), 'stamp', .9],
  [at(L.mas, 0, -0.05), 'whoosh', .5], [at(L.mas, 1, -0.01), 'bell', .6], [at(L.mas, 3, 0.05), 'pop', .5], [atE(L.mas, 3, -0.18), 'pop', .5], [at(L.mas, 4, 0.09), 'pop', .5], [at(L.mas, 7, 0.01), 'tada', .8], [at(L.mas, 10, 0.02), 'stamp', .8],
  [at(L.caro, 0, -0.01), 'whoosh', .5], [at(L.caro, 1, 0.08), 'paper', .6], [at(L.caro, 3), 'cash', .9], [at(L.caro, 6, 0.03), 'pop', .6], [at(L.caro, 7, 0.02), 'pop', .6], [at(L.caro, 9, 0.04), 'pop', .6], [at(L.caro, 10, 0.05), 'paper', .5], [atE(L.caro, 11, -0.05), 'ding', .6], [at(L.caro, 12, 0.04), 'scratch', .7],
  [atE(L.caro, 15, 0.02), 'burst', .9], [at(L.caro, 17), 'cash', .9], [atE(L.caro, 18, 0.01), 'cash', .6],
  [at(L.clem, 0), 'whoosh', .6], [atE(L.clem, 3), 'pop2', .7], [at(L.clem, 7, 0.01), 'sparkle', .6], [at(L.clem, 7, 0.09), 'emu', .6], [at(L.clem, 11), 'ding', .8],
  [at(L.augusto, 0, -0.05), 'whoosh', .6], [at(L.augusto, 0, 0.05), 'pop', .6], [at(L.augusto, 3), 'sparkle', .6], [at(L.augusto, 4), 'paper', .7], [at(L.augusto, 6, 0.03), 'type', .5], [at(L.augusto, 8, 0.03), 'type', .5], [at(L.augusto, 10, 0.01), 'type', .5], [at(L.augusto, 12, 0.01), 'type', .5], [at(L.augusto, 12, 0.08), 'stamp', .9],
  [at(L.ojo, 0), 'stamp', 1.0], [at(L.ojo, 1, 0.01), 'thud', .7], [at(L.ojo, 7), 'thud', .8], [at(L.ojo, 8, 0.02), 'swoosh_up', .5], [at(L.ojo, 16, 0.05), 'click', .7], [at(L.ojo, 19, 0.1), 'error', .6],
  [at(L.osea, 0, -0.03), 'whoosh', .6], [at(L.osea, 1, -0.02), 'boing', .6], [at(L.osea, 2, 0.02), 'pop', .5], [atE(L.osea, 7, 0.01), 'tada', .8], [at(L.osea, 8, 0.09), 'sparkle', .6], [at(L.osea, 10, 0.09), 'sparkle', .5],
  [at(L.osea, 12, 0.02), 'burst', .9], [at(L.osea, 13, -0.03), 'glitch', .6], [at(L.osea, 15, 0.01), 'scratch', .8], [atE(L.osea, 15, -0.13), 'stamp', .7],
  [K.te - 0.08, 'whoosh', .6], [K.te + 0.1, 'pop', .7], [K.te + 0.22, 'pop', .6], [K.creias + 0.25, 'msg_in', .7], [K.creias + 0.65, 'msg_in', .7], [K.si, 'click', .9], [K.si + 0.05, 'ding', .6], [K.noB, 'click', .8], [K.noB + 0.05, 'boing', .5],
  [S.bal + 0.02, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6], [S.book, 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [K.libro + 0.3, 'stamp', .5], [LOOP, 'whoosh', .6],
].forEach(s => sfx(s[1], s[0], s[2]));

/* ---------- bucle: los últimos 0,4 s enlazan con la portada (fotograma 0) ---------- */
{
  const f0 = window.frame;
  window.frame = t => {
    if (t < LOOP) return f0(t);
    f0(0);
    const k = p(t, LOOP, 0.22, E.outCubic);
    set(world, { x: (1 - k) * 1080 });
  };
}
