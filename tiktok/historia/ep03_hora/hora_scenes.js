/* ======================================================================
   Ep. 3 · «España vive con la hora equivocada» — escenas (tiempos de words_table.txt)
   ====================================================================== */

/* ---------- mapa de Europa (se instancia por escena) ---------- */
function buildMap(parent) {
  const cam = box(parent, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const lands = [G_CONT, G_SCAN, G_GB, G_IE, G_AFR, ...G_ISL];
  let s = `<rect x="-400" y="-400" width="1880" height="2720" fill="#DCCFAF"/><rect x="-400" y="-400" width="1880" height="2720" fill="url(#hW)" opacity=".13"/>`;
  let gr = ''; for (let lo = -25; lo <= 25; lo += 5) gr += `M${f1(MX(lo))},-400V2400`; for (let la = 15; la <= 70; la += 5) gr += `M-400,${f1(MY(la))}H1500`;
  s += `<path d="${gr}" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 7" opacity=".22"/>`;
  [[120, 560], [170, 760], [96, 1000], [200, 1150], [330, 640], [760, 960], [880, 1030], [600, 1060], [140, 1320], [420, 1240]].forEach(q => s += `<path d="M${q[0]},${q[1]} q10,-8 20,0 t20,0 t20,0" stroke="${INK}" stroke-width="2.4" fill="none" opacity=".45"/>`);
  s += cut(lands.map(a => P(mpath(a))).join('') + P(mpath(G_SPAIN)) + P(mpath(G_PORT)), 6, 8);
  lands.forEach(a => { const d = mpath(a); s += D(d, FIG, 3) + `<path d="${d}" fill="url(#hP)"/>`; });
  s += `<path class="euHL" d="${mpath(G_CONT)}" fill="${PINK}" style="opacity:0;mix-blend-mode:multiply"/>`;
  s += `<path class="gerHL" d="${mpath(G_GER)}" fill="${PINK}" style="opacity:0;mix-blend-mode:multiply"/>`;
  s += `<path d="${mpath(G_GER)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="9 6"/>`;
  s += `<path d="${mline(B_FR)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="9 6"/><path d="${mline(B_IT)}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="9 6"/>`;
  s += D(mpath(G_PORT), FIG, 3.5) + `<path d="${mpath(G_PORT)}" fill="url(#hP)"/>`;
  s += D(mpath(G_SPAIN), '#F1DFAE', 4) + `<path d="${mpath(G_SPAIN)}" fill="url(#hP)"/>`;
  s += `<path class="spHL" d="${mpath(G_SPAIN)}" fill="${YEL}" style="opacity:0;mix-blend-mode:multiply"/><path class="spPK" d="${mpath(G_SPAIN)}" fill="${PINK}" style="opacity:0;mix-blend-mode:multiply"/>`;
  s += `<path d="${mpath(G_SPAIN)}" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  const lbl = (txt, lon, lat, sz, o = {}) => `<text x="${f1(MX(lon))}" y="${f1(MY(lat))}" text-anchor="middle" font-family="${o.font || 'Rye'}" font-size="${sz}" fill="${INK}" ${o.r ? `transform="rotate(${o.r} ${f1(MX(lon))} ${f1(MY(lat))})"` : ''} stroke="${o.halo || FIG}" stroke-width="6" paint-order="stroke" letter-spacing="2">${txt}</text>`;
  s += lbl('ESPAÑA', -3.8, 39.9, 42) + lbl('PORTUGAL', -8.0, 39.4, 19, { font: 'SpecialElite', r: -78 }) + lbl('FRANCIA', 2.2, 46.6, 32) + lbl('ALEMANIA', 10.2, 50.6, 24) + lbl('ITALIA', 12.9, 43.0, 22, { r: 55 }) + lbl('REINO UNIDO', -2.3, 52.8, 18, { font: 'SpecialElite' });
  s += lbl('OCÉANO ATLÁNTICO', -13.6, 45, 22, { font: 'SpecialElite', r: -90, halo: '#DCCFAF' }) + lbl('Mar Mediterráneo', 4.6, 37.6, 22, { font: 'SpecialElite', halo: '#DCCFAF' });
  // meridiano de Greenwich desde Londres
  const x0 = f1(MX(0)), yL = f1(MY(51.48)), yB = f1(MY(34.6));
  s += `<g class="mer"><path class="merW" d="M${x0},${yL} V${yB}" stroke="#fff" stroke-width="20" stroke-linecap="round"/><path class="merR" d="M${x0},${yL} V${yB}" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></g>`;
  s += `<path class="merSp" d="M${x0},${f1(MY(42.7))} V${f1(MY(39.95))}" stroke="${YEL}" stroke-width="5" opacity="0"/>`;
  s += `<g class="lon"><circle cx="${f1(MX(-0.1))}" cy="${yL}" r="16" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="${f1(MX(-0.1))}" cy="${yL}" r="6" fill="#fff"/></g>`;
  const svg = box(cam, 0, 0, 1080, 1920); svg.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible">${s}</svg>`;
  const q = c => svg.querySelector(c);
  return { cam, euHL: q('.euHL'), gerHL: q('.gerHL'), spHL: q('.spHL'), spPK: q('.spPK'), mer: q('.mer'), merW: q('.merW'), merR: q('.merR'), merSp: q('.merSp'), lon: q('.lon'), merLen: yB - yL };
}
function camSet(m, s, x = 0, y = 0) { set(m.cam, { s, x, y }); }
function miniAt(parent, lon, lat, sz, h, mm, o = {}) { const d = box(parent, MX(lon) - sz / 2, MY(lat) - sz / 2, sz, sz, { zIndex: 6 }); d.innerHTML = miniClock(h, mm, o); return d; }

/* ======================================================================
   L0 · GANCHO (−1 – 5.42): el reloj de España salta una hora — ¡CLONC!
   ====================================================================== */
headline(-1, 2.42, 'En España vivimos con la *hora equivocada*', { size: 74, y: 172, allAt: -0.5, hlT: 1.71 });
headline(2.42, 5.42, 'Y llevamos así desde *1940~3.54*', { size: 84, y: 190 });
{
  const c = scene(-1, 5.42, t => {
    set(sb, { r: t * 8, s: 1 + 0.04 * Math.sin(t * 2) });
    const jump = E.outBack(clamp((t - 1.71) / 0.32));
    setClock(ck, 9 + (t < 1.71 ? 0 : jump), Math.sin(t * Math.PI * 1.6) * 13);
    set(ck.d, { r: shake(t, 1.71, 0.45, 3), s: 1 + 0.05 * (t > 1.71 ? 1 - p(t, 1.71, 0.5) : 0) + 0.03 * p(t, -1, 6.4, E.linear) });
    const kc = pop(t, 1.73, 0.3); set(clonc, { s: kc, r: -10 + Math.sin(t * 30) * 2 * (1 - p(t, 1.73, 0.6)), o: t < 1.73 ? 0 : 1 - p(t, 2.55, 0.2) });
    clonc.style.textShadow = glitch(t, 1.73, 0.22) || `6px 6px 0 ${INK}`;
    popA(plus, t, 1.85, { r: 8 });
    set(plus, { o: t < 1.85 ? 0 : 1 - p(t, 2.6, 0.2), s: pop(t, 1.85, 0.35) });
    popA(cDesde, t, 3.56, { r: -5 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'transparent' });
  const sb = rays(c, -420, -260, 1920, 28, 'rgba(255,230,0,.38)', 'transparent', 0);
  const ck = mkClock(c, [220, 380, 640, 1088], { spain: true }); ck.d.style.zIndex = 3; ck.d.style.transformOrigin = '320px 320px';
  const clonc = el('div', c, { left: '420px', top: '330px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '104px', color: PINK, WebkitTextStroke: `4px ${INK}`, zIndex: 8, whiteSpace: 'nowrap' }, '¡CLONC!');
  const plus = chip(c, 130, 460, '+1 h', { size: 64, bg: RED, z: 9 });
  const cDesde = chip(c, 600, 930, 'desde 1940', { size: 48, bg: INK, color: YEL, z: 9 });
}
// sello DATO REAL (cae al acabar el gancho y se queda en la esquina durante el mapa)
{
  const st = stamp(world, 120, 560, 'DATO REAL', { size: 120, bw: 13, z: 760, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
  UPD.push(t => {
    if (t < 5.05 || t > 10.62) { st.style.visibility = 'hidden'; return; }
    const k = p(t, 5.05, 0.18, E.outCubic), mv = p(t, 5.9, 0.45, E.inOutCubic);
    set(st, { s: lerp(2.3, 1, k) * lerp(1, 0.42, mv), x: mv * -320, y: mv * 400, r: lerp(-9, 6, mv), o: clamp(k * 2) * (1 - p(t, 10.5, 0.12)) });
  });
}

/* ======================================================================
   L1 · EL MERIDIANO DE GREENWICH (5.42 – 10.62)
   ====================================================================== */
headline(5.42, 6.42, 'Mira un *mapa*', { size: 76, band: true });
headline(6.42, 9.28, 'El meridiano de *Greenwich*, el de Londres…', { size: 60, band: true });
headline(9.28, 10.62, '…pasa por *España*', { size: 80, band: true, hlT: 9.76 });
{
  const c = scene(5.42, 10.62, t => {
    const ko = p(t, 5.42, 0.7, E.outCubic);
    const pan = p(t, 6.9, 0.8, E.inOutCubic) * (1 - p(t, 8.9, 0.8, E.inOutCubic));
    set(m.cam, { s: lerp(1.35, 1.0, ko) + 0.06 * p(t, 9.3, 1.3, E.outCubic), y: pan * 150 + (1 - ko) * 80, r: (1 - ko) * -4 });
    const kd = p(t, 7.1, 2.75, E.inOutCubic);
    [m.merW, m.merR].forEach(e => { e.style.strokeDasharray = `${m.merLen} ${m.merLen}`; e.style.strokeDashoffset = f1(m.merLen * (1 - kd)); });
    m.mer.style.opacity = t > 7.08 ? 1 : 0;
    set(pen, { x: 0, y: kd * m.merLen, o: t > 7.08 && kd < 0.995 ? 1 : 0 });
    const pl = t > 8.0 ? 1 + 0.35 * Math.abs(Math.sin((t - 8.0) * 6)) * (1 - p(t, 8.0, 1.4)) : 1;
    m.lon.setAttribute('transform', `translate(${f1(MX(-0.1) * (1 - pl))},${f1(MY(51.48) * (1 - pl))}) scale(${f1(pl * 100) / 100})`);
    popA(cLon, t, 8.03, { r: -3 }); popA(cGr, t, 7.05, { r: 3 });
    m.spHL.style.opacity = f1(0.85 * p(t, 9.78, 0.3)); m.merSp.setAttribute('opacity', t > 9.8 ? 1 : 0);
    popA(cSp, t, 9.8, { r: -4 });
  }, { clip: true, cut: true });
  const m = buildMap(c);
  const pen = box(m.cam, MX(0) - 22, MY(51.48) - 22, 44, 44, { borderRadius: '50%', background: RED, border: `5px solid #fff`, boxShadow: `0 0 0 4px ${INK}`, zIndex: 7 });
  const cLon = chip(m.cam, MX(-0.1) - 290, MY(51.48) - 30, 'Londres', { size: 40, bg: INK, color: '#fff' });
  const cGr = chip(m.cam, MX(0) + 30, MY(47.5), 'meridiano de Greenwich · 0°', { size: 30, bg: RED, color: '#fff' });
  const cSp = chip(m.cam, MX(-1.2), MY(37.0), '¡pasa por aquí!', { size: 40, bg: YEL, color: INK });
}

/* ======================================================================
   L2 · MARCA: EL VECINO EN SU BALCÓN (10.62 – 13.42)
   ====================================================================== */
{
  const c = scene(10.62, 13.42, t => {
    const ex = p(t, 13.2, 0.22, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 10.62, 2.6, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, 12.6, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > 10.75 && t < 11.4;
    vecFace(vec, t, { jaw: talkW(t), look: t > 11.5 && t < 12.3 ? [0, -5] : [0, 0], bL: t > 10.7 && t < 11.4 ? 8 : t > 12.7 ? 6 : 0, bR: t > 10.7 && t < 11.4 ? 8 : t > 12.7 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3, noCup: true });
    popA(tag, t, 10.97, { r: -5 });
    const ks = p(t, 11.71, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 11.7, 2)) + (1 - ks) * 8, o: t < 11.7 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 12.95, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    set(miniK, { r: wobble(t, 0.6, 3), o: 1 });
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
  const miniK = box(cam, 720, 520, 150, 150, { zIndex: 2 }); miniK.innerHTML = miniClock(10, 0);
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
  [['esto', 31, sl1], ['no', 32, sl1], ['venía', 33, sl1], ['en', 34, sl2], ['el', 35, sl2], ['libro', 36, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   L3 · FRANJAS HORARIAS (13.42 – 18.22)
   ====================================================================== */
headline(13.42, 14.9, 'Por *geografía*…', { size: 74, band: true, hlT: 13.8 });
headline(14.9, 18.22, '…nos tocaría la *misma hora*', { size: 66, band: true, hlT: 15.02 });
{
  const c = scene(13.42, 18.22, t => {
    const ki = p(t, 13.42, 0.5, E.outCubic);
    set(m.cam, { s: lerp(0.95, 0.86, ki), y: 30 * ki });
    set(band, { sy: p(t, 13.8, 0.55, E.outCubic), o: 1 });
    popA(cGeo, t, 14.0, { r: -3 });
    popA(kSp, t, 14.6, { r: Math.sin(t * 8) * 6 });
    popA(kPt, t, 15.62, { r: -4 }); popA(lPt, t, 15.7, { r: -3 });
    popA(kUk, t, 16.27, { r: 4 }); popA(lUk, t, 16.35, { r: 3 });
    const kc = p(t, 17.12, 0.4, E.outBack); set(inset.wrap, { x: (1 - kc) * -520, r: (1 - kc) * -8 + 2, o: t < 17.1 ? 0 : 1 });
    popA(kCa, t, 17.4, { r: 3 });
    const tk = t > 17.9 ? Math.sin(t * 9) * 4 : 0; [kPt, kUk, kCa].forEach(e => { if (t > 17.9) set(e, { s: 1, r: tk }); });
  }, { clip: true, cut: true });
  const m = buildMap(c);
  const band = box(m.cam, MX(-10.5), -400, MX(3.5) - MX(-10.5), 2700, { background: 'rgba(255,230,0,.5)', mixBlendMode: 'multiply', transformOrigin: 'top center', zIndex: 3, borderLeft: `5px dashed ${INK}`, borderRight: `5px dashed ${INK}` });
  const cGeo = chip(c, 40, 345, 'franja que nos tocaría', { size: 30, bg: INK, color: YEL, z: 30 });
  const kSp = miniAt(m.cam, -3.6, 40.4, 120, 0, 0, { q: true });
  const kPt = miniAt(m.cam, -8.1, 39.0, 110, 12, 0);
  const lPt = chip(m.cam, MX(-8.1) - 250, MY(39.0) - 20, 'Portugal', { size: 34, bg: '#fff', color: INK });
  const kUk = miniAt(m.cam, -1.6, 53.3, 110, 12, 0);
  const lUk = chip(m.cam, MX(-1.6) + 64, MY(53.3) - 20, 'Reino Unido', { size: 34, bg: '#fff', color: INK });
  const inset = paperPiece(c, 70, 1020, 470, 300, { seed: 31, bg: '#DCCFAF', z: 40 });
  {
    const fx = lon => 30 + (lon + 18.3) * 82, fy = lat => 70 + (29.4 - lat) * 92;
    let s = `<rect x="0" y="0" width="460" height="300" fill="url(#hW)" opacity=".13"/><rect x="40" y="0" width="330" height="300" fill="rgba(255,230,0,.55)" style="mix-blend-mode:multiply"/>`;
    G_CAN.forEach(a => { s += `<path d="${mpath(a, fx, fy)}" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/>`; });
    G_CAN.forEach(a => { s += D(mpath(a, fx, fy), FIG, 3) + `<path d="${mpath(a, fx, fy)}" fill="url(#hP)"/>`; });
    box(inset.inner, 0, 0, 452, 282).innerHTML = `<svg width="452" height="282" style="overflow:visible">${s}</svg>`;
    el('div', inset.inner, { left: '16px', top: '12px', fontFamily: 'Rye', fontSize: '36px', color: INK, background: '#fff', border: `3px solid ${INK}`, padding: '2px 14px', borderRadius: '8px' }, 'Canarias');
  }
  const kCa = box(inset.wrap, 330, 150, 110, 110, { zIndex: 5 }); kCa.innerHTML = miniClock(12, 0);
}

/* ======================================================================
   L4a · 1940, EN PLENA SEGUNDA GUERRA MUNDIAL (18.22 – 21.95)
   ====================================================================== */
headline(18.22, 19.62, 'Pero en *1940~18.57*…', { size: 90 });
headline(19.62, 21.95, 'en plena *Segunda Guerra Mundial*', { size: 74, hlT: 20.32 });
{
  const PG = [];
  const c = scene(18.22, 21.95, t => {
    set(cal, { y: (1 - p(t, 18.22, 0.35, E.outBack)) * 700 + wobble(t, 0.5, 3), r: -2 + shake(t, 19.18, 0.4, 2), s: 1 + 0.06 * (t > 19.18 ? 1 - p(t, 19.18, 0.5) : 0) });
    PG.forEach(q => { const k = p(t, q.t, 0.6, E.inCubic); set(q.e, { x: k * -700, y: -k * 500 + k * k * 300, r: -k * 70, o: t < q.t + 0.6 ? 1 : 0 }); });
    planes.forEach((pl, i) => { const k = (t - 19.9 - i * 0.28) / 2.2; set(pl, { x: lerp(-420, 1300, k), y: Math.sin(k * 6 + i) * 10, o: k > 0 && k < 1 ? 1 : 0 }); });
    popA(cWar, t, 20.32, { r: -3 });
    smoke.forEach((s, i) => { const k = ((t * 0.4 + i * 0.27) % 1); set(s, { y: -k * 260, s: 0.6 + k * 1.2, o: t > 20.0 ? (1 - k) * 0.7 : 0 }); });
  }, { clip: true });
  const smoke = []; for (let i = 0; i < 4; i++) smoke.push(box(c, 120 + i * 230, 1000, 160, 160, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(60,45,30,.55), rgba(60,45,30,0) 70%)', zIndex: 1 }));
  const cal = box(c, 270, 520, 540, 600, { zIndex: 3, transformOrigin: '270px 300px' });
  cal.innerHTML = `<svg width="540" height="600" style="overflow:visible">${cut('<rect x="10" y="30" width="520" height="560" rx="22"/>')}<rect x="10" y="30" width="520" height="560" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="10" y="30" width="520" height="140" rx="22" fill="${RED}" stroke="${INK}" stroke-width="6"/><rect x="10" y="30" width="520" height="140" rx="22" fill="url(#hA)" opacity=".4"/>
  <text x="270" y="128" text-anchor="middle" font-family="Rye" font-size="62" fill="#fff" letter-spacing="6">AÑO</text>${[90, 190, 350, 450].map(x => `<rect x="${x - 10}" y="0" width="20" height="62" rx="10" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>`).join('')}
  <text x="270" y="460" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="230" fill="${INK}">1940</text><path d="M60,520 H480" stroke="${INK}" stroke-width="3" stroke-dasharray="6 8"/></svg>`;
  ['1937', '1938', '1939'].reverse().forEach((y, i) => {
    const pg = box(cal, 14, 172, 512, 414, { background: '#FBF6EA', borderTop: `4px dashed ${INK}`, zIndex: 2 + i, transformOrigin: '0 0' });
    el('div', pg, { left: 0, top: '70px', width: '512px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '230px', color: INK, opacity: 0.85 }, y);
    PG.push({ e: pg, t: [18.98, 18.78, 18.57][i] });
  });
  const planes = []; for (let i = 0; i < 3; i++) { const pl = box(c, 0, 360 + i * 90, 220 - i * 30, 88 - i * 12, { zIndex: 2 }); pl.innerHTML = PLANE; planes.push(pl); }
  const cWar = chip(c, 400, 1150, '1940 · Segunda Guerra Mundial', { size: 33, bg: INK, color: '#fff', z: 9 });
}

/* ======================================================================
   L4b · FRANCO ADELANTA EL RELOJ UNA HORA (21.95 – 23.78)
   ====================================================================== */
headline(21.95, 23.78, 'Franco *adelantó* el reloj una hora', { size: 70, hlT: 22.29 });
{
  const c = scene(21.95, 23.78, t => {
    const k = p(t, 22.29, 1.35, E.inOutCubic);
    setClock(ck, 9 + k, Math.sin(t * Math.PI * 1.6) * 12);
    set(ck.d, { s: 1 + 0.03 * p(t, 21.95, 1.8, E.linear) });
    key.style.transform = `scaleY(${f1(Math.cos(k * Math.PI * 6) * 100) / 100})`;
    const tw = Math.sin(k * Math.PI * 6) * 4 * (k > 0 && k < 1 ? 1 : 0);
    arm.setAttribute('transform', `rotate(${f1(-9.3 + tw)} 360 470)`);
    set(prof.d, { x: (1 - p(t, 21.95, 0.4, E.outCubic)) * -300, y: wobble(t, 0.4, 2) });
    popA(plus, t, 23.06, { r: 6 }); popA(cF, t, 22.0, { r: -2 });
  }, { clip: true });
  sceneBg(c, { background: 'radial-gradient(ellipse at 60% 45%, #F1E4C6 20%, #C9AF84 95%)' });
  halftone(c, 'rgba(43,33,24,.08)', 0);
  const ck = mkClock(c, [440, 430, 560, 952], { spain: true }); ck.d.style.zIndex = 2;
  const key = box(c, 625, 742, 70, 86, { zIndex: 4 });
  key.innerHTML = `<svg viewBox="0 0 70 86" width="70" height="86" style="overflow:visible"><rect x="46" y="38" width="30" height="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><ellipse cx="30" cy="43" rx="22" ry="40" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><ellipse cx="30" cy="43" rx="9" ry="20" fill="#F1E4C6" stroke="${INK}" stroke-width="3"/></svg>`;
  const prof = mk(c, [-100, 380, 600, 900], profileInner(), '0 0 600 900', 'prof'); prof.d.style.zIndex = 3;
  const arm = prof.d.querySelector('.arm');
  const plus = chip(c, 740, 400, '+1 hora', { size: 56, bg: PINK, z: 9 });
  const cF = chip(c, 60, 1250, 'Franco · 1940', { size: 34, bg: INK, color: YEL, z: 9 });
}

/* ======================================================================
   L4c · PARA IR CON ALEMANIA Y BUENA PARTE DE EUROPA (23.78 – 27.15)
   ====================================================================== */
headline(23.78, 25.88, 'Para ir con la hora de *Alemania*', { size: 60, band: true, hlT: 25.1 });
headline(25.88, 27.15, 'y de buena parte de *Europa*', { size: 64, band: true, hlT: 26.51 });
{
  const c = scene(23.78, 27.15, t => {
    const ki = p(t, 23.78, 0.5, E.outCubic);
    set(m.cam, { s: lerp(1.1, 0.92, ki) - 0.04 * p(t, 25.9, 1.2, E.outCubic), y: 40 });
    m.spPK.style.opacity = f1(0.55 * p(t, 24.0, 0.3));
    const ka = p(t, 25.0, 0.5, E.outCubic);
    arP.forEach(e => { e.style.strokeDasharray = '900 900'; e.style.strokeDashoffset = f1(900 * (1 - ka)); });
    set(ahead, { o: ka > 0.95 ? 1 : 0, s: pop(t, 25.45, 0.3) });
    m.gerHL.style.opacity = f1(0.75 * p(t, 25.15, 0.3));
    popA(cDe, t, 25.15, { r: 4 });
    m.euHL.style.opacity = f1(0.42 * p(t, 25.92, 0.6));
    [[kEs, 24.05], [kDe, 25.45], [kFr, 26.11], [kIt, 26.41]].forEach(q => popA(q[0], t, q[1], { r: Math.sin(t * 5 + q[1]) * 4 }));
    popA(cSame, t, 26.5, { r: -3 });
  }, { clip: true, cut: true });
  const m = buildMap(c);
  const arw = box(m.cam, 0, 0, 1080, 1920, { zIndex: 5 });
  const ad = `M${f1(MX(-3))},${f1(MY(41))} C${f1(MX(-2))},${f1(MY(47))} ${f1(MX(4))},${f1(MY(51))} ${f1(MX(8.6))},${f1(MY(51.2))}`;
  arw.innerHTML = arrowSvg(ad, PINK, 14);
  const arP = [...arw.querySelectorAll('.ap')];
  const ahead = box(m.cam, MX(8.6) - 40, MY(51.2) - 40, 80, 80, { zIndex: 6 });
  ahead.innerHTML = `<svg viewBox="0 0 80 80" width="80" height="80" style="overflow:visible"><path d="M10,10 L70,40 L10,70 Z" fill="${PINK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" transform="rotate(4 40 40)"/></svg>`;
  const kEs = miniAt(m.cam, -3.6, 40.3, 110, 10, 0);
  const kDe = miniAt(m.cam, 10.2, 49.6, 100, 10, 0);
  const kFr = miniAt(m.cam, 2.6, 45.3, 100, 10, 0);
  const kIt = miniAt(m.cam, 11.6, 44.3, 96, 10, 0);
  const cDe = chip(m.cam, MX(10.2) - 220, MY(53.3), 'hora de Alemania', { size: 32, bg: PINK });
  const cSame = chip(c, 230, 1180, 'la misma hora', { size: 46, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   L5 · LA GUERRA TERMINÓ… Y EL CAMBIO SE QUEDÓ (27.15 – 31.02)
   ====================================================================== */
headline(27.15, 28.48, 'La guerra *terminó*.', { size: 96, hlT: 27.62 });
headline(28.48, 31.02, 'Y el cambio… se *quedó*.', { size: 88, hlT: 30.33 });
{
  const c = scene(27.15, 28.48, t => {
    flag.setAttribute('d', flagPath(t, 0, 0, 330, 210));
    set(fl, { y: (1 - p(t, 27.15, 0.45, E.outBack)) * 900 });
    const kd = p(t, 27.5, 1.0, E.linear);
    set(dove, { x: lerp(800, -160, kd), y: lerp(520, 330, kd) + Math.sin(t * 14) * 10, o: t > 27.5 ? 1 : 0, r: -6 });
    dove.querySelector('.wingD').setAttribute('transform', `rotate(${f1(Math.sin(t * 22) * 22)} 110 72)`);
    popA(cFin, t, 27.65, { r: -4 });
  }, { clip: true });
  ground(c, 1130);
  const fl = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  const fs = svgLayerIn(fl);
  fs.innerHTML = `<g transform="translate(350,500)"><rect x="-14" y="-20" width="16" height="660" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><circle cx="-6" cy="-26" r="14" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>
   <g transform="translate(2,0)"><path class="flagS" d="" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g></g>
   <g transform="translate(560,1040)">${cut('<path d="M0,90 Q100,-40 200,90 Z"/><path d="M-30,92 Q100,70 230,92 Q100,112 -30,92 Z"/>', 5, 6)}<path d="M0,90 Q100,-40 200,90 Z" fill="#9a8a6a" stroke="${INK}" stroke-width="4"/><path d="M0,90 Q100,-40 200,90 Z" fill="url(#hA)"/><path d="M-30,92 Q100,70 230,92 Q100,112 -30,92 Z" fill="#9a8a6a" stroke="${INK}" stroke-width="4"/><path d="M-30,92 Q100,70 230,92 Q100,112 -30,92 Z" fill="url(#hD)"/></g>`;
  const flag = fs.querySelector('.flagS');
  const dove = box(c, 0, 0, 200, 140, { zIndex: 4 }); dove.innerHTML = doveSvg();
  const cFin = chip(c, 560, 940, 'fin de la guerra', { size: 40, bg: '#fff', color: INK, z: 9 });
}
function svgLayerIn(parent) { parent.innerHTML = `<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="overflow:visible;position:absolute;left:0;top:0"></svg>`; return parent.firstChild; }
{
  const c = scene(28.48, 31.02, t => {
    setClock(ck, 10, Math.sin(t * Math.PI * 1.6) * 13);
    set(ck.d, { r: shake(t, 30.33, 0.45, 3), s: 1 + 0.02 * p(t, 28.48, 2.5, E.linear) });
    web.style.opacity = f1(p(t, 29.04, 0.9));
    const kl = p(t, 30.1, 0.24, E.outBounce);
    set(chains, { o: t > 30.18 ? 1 : 0, s: lerp(1.3, 1, p(t, 30.18, 0.15)) });
    set(lock, { y: lerp(-900, 0, kl), r: (1 - kl) * 20 + shake(t, 30.34, 0.4, 6), o: t > 30.1 ? 1 : 0 });
    popA(plus, t, 28.6, { r: -6 });
    popA(cSig, t, 30.5, { r: 4 });
  }, { clip: true, cut: true });
  const ck = mkClock(c, [220, 380, 640, 1088], { spain: true }); ck.d.style.zIndex = 2; ck.d.style.transformOrigin = '320px 320px';
  const web = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  { let s = ''; [[250, 420, 0], [830, 420, 90], [440, 1000, 180]].forEach(q => { let g = ''; for (let k = 0; k < 6; k++) { const a = k * 18 * rad; g += `M0,0 L${f1(Math.cos(a) * 170)},${f1(Math.sin(a) * 170)}`; } for (let r = 40; r <= 160; r += 40) { let d = ''; for (let k = 0; k < 6; k++) { const a = k * 18 * rad; d += (k ? ' Q' + f1(Math.cos(a - 9 * rad) * r * 0.82) + ',' + f1(Math.sin(a - 9 * rad) * r * 0.82) + ' ' : 'M') + f1(Math.cos(a) * r) + ',' + f1(Math.sin(a) * r); } g += d; } s += `<path d="${g}" transform="translate(${q[0]},${q[1]}) rotate(${q[2]})" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/><path d="${g}" transform="translate(${q[0]},${q[1]}) rotate(${q[2]})" stroke="${INK}" stroke-width="2" fill="none"/>`; }); web.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; }
  const chains = box(c, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 700px' });
  chains.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${chainSvg(170, 380, 910, 1020)}${chainSvg(910, 380, 170, 1020)}</svg>`;
  const lock = box(c, 430, 610, 220, 256, { zIndex: 5 }); lock.innerHTML = padlockSvg();
  const plus = chip(c, 700, 360, '+1 h', { size: 56, bg: RED, z: 9 });
  const cSig = chip(c, 600, 1110, 'y ahí sigue', { size: 40, bg: INK, color: YEL, z: 9 });
}

/* ======================================================================
   L6 · RELOJ vs SOL (31.02 – 36.15) + GOLPE AMARILLO «+2 h en verano» (36.15 – 37.82)
   ====================================================================== */
headline(31.02, 33.3, 'Resultado: en *invierno*…', { size: 76, hlT: 32.33 });
headline(33.3, 36.15, 'más o menos *una hora* por delante del sol', { size: 62, hlT: 34.12 });
{
  const c = scene(31.02, 36.15, t => {
    const sp = (t * 520) % 120;
    set(lines, { x: -sp });
    const bob = Math.abs(Math.sin(t * 9));
    set(ck.d, { y: -bob * 18, r: Math.sin(t * 9) * 3 });
    clockLegs(ck, t, 9, 34);
    setClock(ck, 10 + (t - 31) * 0.05, Math.sin(t * 9) * 20);
    const look = t > 34.95 && t < 35.9;
    ck.pup.forEach(q => q.setAttribute('transform', `translate(${look ? -9 : 6} ${look ? 2 : 0})`));
    const lag = t > 34.12 ? 0 : 0;
    set(sun.d, { x: lag + Math.sin(t * 2.2) * 6, y: -Math.abs(Math.sin(t * 8)) * 14, r: Math.sin(t * 8) * 4 });
    sunFace(sun, t, { run: 8, spin: t * 30, look: [6, -1], bL: 6, bR: 6, pant: t > 33.6, sweat: t > 34.5, seed: 0.7 });
    popA(lR, t, 31.3, { r: -3 }); popA(lS, t, 31.62, { r: 3 });
    popA(cInv, t, 32.35, { r: -4 });
    const kb = p(t, 34.12, 0.4, E.outBack); set(brk, { sx: Math.max(0.001, kb), o: t > 34.1 ? 1 : 0 });
    popA(gap, t, 34.25, { r: -2 });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(#F0E2BF, #EADFC8 60%)' });
  const lines = box(c, 0, 0, 1200, 1920, { zIndex: 1 }); { let s = ''; for (let x = 0; x < 1240; x += 120) s += `<path d="M${x},1012 h60" stroke="${INK}" stroke-width="6"/><path d="M${x + 30},640 h80 M${x + 70},760 h50" stroke="${INK}" stroke-width="3" opacity=".25"/>`; lines.innerHTML = `<svg width="1240" height="1920" style="overflow:visible">${s}</svg>`; }
  ground(c, 990);
  const ck = mkClock(c, [590, 410, 360, 612], { face: true, legs: true }); ck.d.style.zIndex = 3;
  const sun = mkSun(c, [40, 565, 400, 496], { legs: true }); sun.d.style.zIndex = 3;
  const lR = chip(c, 680, 1030, 'RELOJ', { size: 40, bg: INK, color: '#fff', z: 9 });
  const lS = chip(c, 175, 1030, 'SOL', { size: 40, bg: SUNC, color: INK, z: 9 });
  const cInv = chip(c, 60, 360, 'INVIERNO ❄', { size: 44, bg: '#fff', color: INK, z: 9 });
  const brk = box(c, 240, 1110, 530, 60, { zIndex: 8, transformOrigin: 'left center' });
  brk.innerHTML = `<svg width="520" height="60" style="overflow:visible"><path d="M4,6 V36 H520 V6" stroke="#fff" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="M4,6 V36 H520 V6" stroke="${RED}" stroke-width="8" fill="none" stroke-linejoin="round"/></svg>`;
  const gap = chip(c, 410, 1170, '≈ 1 h', { size: 60, bg: RED, color: '#fff', z: 9 });
}
colorHit(36.15, 37.82, YEL, c => {
  const ck = mkClock(c, [600, 760, 300, 510], { legs: true }); ck.d.style.filter = SIL; ck.d.style.zIndex = 3;
  const sun = mkSun(c, [60, 990, 250, 310], { legs: true }); sun.d.style.zIndex = 3; sun.d.style.filter = SIL;
  const drops = box(c, 60, 900, 300, 160, { zIndex: 4 }); drops.innerHTML = `<svg width="300" height="160" style="overflow:visible"><path d="M40,60 q-18,30 0,38 q18,-8 0,-38 Z M250,30 q-14,26 0,32 q14,-6 0,-32 Z M150,10 q-12,22 0,27 q12,-5 0,-27 Z" fill="${INK}"/></svg>`;
  const t0 = el('div', c, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', color: INK, zIndex: 5 }, 'y en verano…');
  const big = el('div', c, { left: '0', top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '330px', lineHeight: 1, color: INK, zIndex: 5, textShadow: '10px 10px 0 #fff' }, '+1 h');
  const lbl = el('div', c, { left: '0', top: '650px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '64px', color: INK, zIndex: 5 }, 'por delante del sol');
  return t => {
    set(t0, { s: lerp(1.3, 1, p(t, 36.15, 0.2)), o: 1 }); t0.style.textShadow = glitch(t, 36.15, 0.25);
    const two = t >= 37.15; big.textContent = two ? '+2 h' : '+1 h';
    set(big, { s: pop(t, 36.3, 0.35) * (two ? 1 + 0.18 * (1 - p(t, 37.15, 0.4, E.outBack)) : 1), r: two ? -3 : 0, o: t > 36.3 ? 1 : 0 });
    big.style.textShadow = (two ? glitch(t, 37.15, 0.25) + (glitch(t, 37.15, 0.25) ? ',' : '') : '') + '10px 10px 0 #fff';
    popA(lbl, t, 36.5, {});
    set(ck.d, { y: -Math.abs(Math.sin(t * 10)) * 26, x: (t - 36.15) * 60, r: Math.sin(t * 10) * 3 }); clockLegs(ck, t, 10, 36); setClock(ck, 10, 0);
    set(sun.d, { y: -Math.abs(Math.sin(t * 5)) * 8, r: Math.sin(t * 5) * 6 }); sunFace(sun, t, { run: 5, pant: true });
    set(drops, { y: (t * 80) % 40, o: 1 });
  };
});

/* ======================================================================
   L7 · GALICIA, 22:00 Y AÚN ES DE DÍA (37.82 – 42.18) — cameo del emú
   ====================================================================== */
headline(37.82, 39.9, 'Por eso en *Galicia*…', { size: 78, hlT: 38.26 });
headline(39.9, 42.18, 'de día pasadas las *diez de la noche*', { size: 64, hlT: 41.31 });
{
  const c = scene(37.82, 42.18, t => {
    set(sun.d, { y: wobble(t, 0.4, 6) + p(t, 37.82, 4.3, E.linear) * 30, r: wobble(t, 0.3, 4) });
    sunFace(sun, t, { spin: t * 12, look: [-4, 4], seed: 0.4, bL: t > 41.4 ? 10 : 2, bR: t > 41.4 ? 10 : 2 });
    const kh = p(t, 40.15, 1.32, E.inOutCubic);
    setClock(ck, 20 + 2 * kh, Math.sin(t * Math.PI * 1.6) * 12);
    face(gal, t, { jaw: t > 41.6 && t < 42.0 ? 0.4 : 0, seed: 0.8 });
    set(gal.d, { y: wobble(t, 0.5, 3), r: wobble(t, 0.35, 1.5) });
    set(glass, { r: t > 40.9 && t < 41.5 ? -25 : 0, y: t > 40.9 && t < 41.5 ? -40 : 0 });
    popA(cGal, t, 38.28, { r: -3 }); popA(cJun, t, 38.86, { r: 3 });
    popA(c22, t, 41.35, { r: -4 });
    popA(cDia, t, 41.7, { r: 4 });
    waves.forEach((w, i) => set(w, { x: Math.sin(t * 1.4 + i) * 18 }));
    // cameo del emú: asoma por la derecha y mira a cámara 0,6 s
    const kin = p(t, 38.95, 0.3, E.outBack), kout = p(t, 39.88, 0.25, E.inCubic);
    const turn = t > 39.22 && t < 39.82;
    set(emuP.d, { x: (1 - kin) * 360 + kout * 400, o: turn ? 0 : (t > 38.9 && t < 40.2 ? 1 : 0) });
    set(emuF.d, { x: kout * 400, o: turn ? 1 : 0, s: turn ? 1 + 0.06 * p(t, 39.22, 0.3) : 1 });
    face(emuP, t, { half: true, neck: -6, look: [-3, 0] }); face(emuF, t, { half: true, blink: false, bR: 16 });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(#F6D79A 0%, #F3E2BB 45%, #EADFC8 70%)' });
  const sun = mkSun(c, [720, 360, 240, 298], { shades: true }); sun.d.style.zIndex = 1;
  const sea = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  sea.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="770" width="1080" height="330" fill="#B9C3B0"/><rect x="0" y="770" width="1080" height="330" fill="url(#hW)" opacity=".25"/><path d="M0,770 H1080" stroke="${INK}" stroke-width="4"/>
  ${cut('<path d="M-20,1100 L-20,720 Q40,640 120,660 Q220,650 280,760 Q330,860 380,1100 Z"/>', 6, 8)}<path d="M-20,1100 L-20,720 Q40,640 120,660 Q220,650 280,760 Q330,860 380,1100 Z" fill="#B49A72" stroke="${INK}" stroke-width="5"/><path d="M-20,1100 L-20,720 Q40,640 120,660 Q220,650 280,760 Q330,860 380,1100 Z" fill="url(#hD)" opacity=".7"/></svg>`;
  const waves = []; for (let i = 0; i < 4; i++) { const w = box(c, 400 + (i % 2) * 120, 800 + i * 60, 600, 30, { zIndex: 2 }); w.innerHTML = `<svg width="600" height="30" style="overflow:visible"><path d="M0,15 q20,-14 40,0 t40,0 t40,0 M200,15 q20,-14 40,0 t40,0 M400,15 q20,-14 40,0 t40,0 t40,0" stroke="${INK}" stroke-width="3" fill="none" opacity=".55"/></svg>`; waves.push(w); }
  const lh = box(c, 50, 300, 190, 410, { zIndex: 3 }); lh.innerHTML = lighthouseSvg();
  const deck = box(c, 0, 0, 1080, 1920, { zIndex: 4 });
  { let bars = ''; for (let x = 20; x <= 1060; x += 48) bars += `<path d="M${x},1000 V1100" stroke="${INK}" stroke-width="8"/>`; deck.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1100" width="1080" height="820" fill="${WOOD}"/><rect x="0" y="1100" width="1080" height="820" fill="url(#hW)" opacity=".3"/>${bars}<rect x="0" y="990" width="1080" height="20" rx="6" fill="${INK}"/><rect x="0" y="1094" width="1080" height="14" fill="${INK}"/></svg>`; }
  const pole = box(c, 750, 860, 20, 260, { background: INK, borderRadius: '8px', zIndex: 5 });
  const ck = mkClock(c, [650, 600, 220, 374], {}); ck.d.style.zIndex = 6;
  const gal = mkBust(c, [270, 690, 320, 409], { uniform: 'farmer', seed: 6 }, BOINA + SHADES_B); gal.d.style.zIndex = 6;
  const table = box(c, 170, 1000, 560, 220, { zIndex: 7 });
  table.innerHTML = `<svg width="560" height="220" style="overflow:visible">${cut('<ellipse cx="280" cy="40" rx="270" ry="40"/><path d="M262,60 h36 v150 h-36 Z"/>', 6, 8)}<path d="M262,60 h36 v150 h-36 Z" fill="${INK}"/><path d="M200,210 h160" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><ellipse cx="280" cy="40" rx="270" ry="40" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M20,48 Q280,96 540,48 L530,90 Q280,130 30,90 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M30,90 Q280,130 530,90" stroke="${RED}" stroke-width="6" fill="none" stroke-dasharray="16 16"/></svg>`;
  const glass = box(c, 420, 900, 80, 130, { zIndex: 8 });
  glass.innerHTML = `<svg viewBox="0 0 80 130" width="80" height="130" style="overflow:visible"><path d="M10,10 L70,10 L62,120 L18,120 Z" fill="#fff8d0" stroke="${INK}" stroke-width="4"/><path d="M14,40 L66,40 L62,120 L18,120 Z" fill="#E8B84A" opacity=".85"/><path d="M24,56 h6 M40,74 h6 M30,94 h6" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`;
  const cGal = chip(c, 300, 370, 'Galicia', { size: 44, bg: INK, color: '#fff', z: 9 });
  const cJun = chip(c, 300, 460, 'finales de junio', { size: 40, bg: '#fff', color: INK, z: 9 });
  const c22 = chip(c, 620, 1150, '22:00', { size: 70, bg: RED, color: '#fff', z: 9 });
  const cDia = chip(c, 330, 1200, '¡y es de día!', { size: 44, bg: YEL, color: INK, z: 9 });
  const emuP = mkEmu(c, [700, 640, 420, 630], { seed: 9 }); emuP.d.style.zIndex = 8;
  const emuF = mk(c, [700, 600, 380, 570], emuFrontInner() + `<g><circle cx="152" cy="214" r="36" fill="${INK}"/><circle cx="248" cy="214" r="36" fill="${INK}"/><path d="M186,210 h28" stroke="${INK}" stroke-width="9"/><path d="M134,200 l22,-8 M230,200 l22,-8" stroke="#fff" stroke-width="6" opacity=".5"/></g>`, '0 0 400 600', 'emuF'); emuF.d.style.zIndex = 8;
}

/* ======================================================================
   L8 · ¡OJO! LA CENA (42.18 – 51.08)
   ====================================================================== */
headline(42.18, 45.75, '¿Por esto cenamos *tan tarde*?', { size: 72, hlT: 45.06 });
headline(45.75, 47.8, 'Influye… pero no lo *explica todo*', { size: 70, hlT: 47.09 });
headline(47.8, 51.08, 'También pesan los *horarios* y las *costumbres*', { size: 64 });
{
  const RW = [];
  const c = scene(42.18, 51.08, t => {
    // sello ¡OJO!
    const k = p(t, 42.27, 0.18, E.outCubic), mv = p(t, 42.95, 0.4, E.inOutCubic);
    set(ojo, { s: (t < 42.27 ? 0 : lerp(2.4, 1, k)) * lerp(1, 0.5, mv), x: mv * -320, y: mv * -150, r: -8, o: t < 42.27 ? 0 : 1 });
    const up = p(t, 45.75, 0.45, E.inOutCubic);
    set(card.wrap, { y: (1 - p(t, 42.18, 0.35, E.outBack)) * 700, s: lerp(1, 0.86, up), x: lerp(0, -70, up) });
    setClock(wck, 22.5, Math.sin(t * Math.PI * 1.6) * 12);
    steam.forEach((s, i) => set(s, { y: -((t * 40 + i * 20) % 50), o: 0.7 }));
    bubs.forEach(b => popA(b.e, t, b.t, { r: b.r }));
    bubs.forEach(b => { if (t > 45.6) set(b.e, { s: 1 - p(t, 45.6, 0.2), r: b.r, o: 1 - p(t, 45.6, 0.2) }); });
    set(list.wrap, { y: (1 - p(t, 45.75, 0.45, E.outBack)) * 900, r: 1.5, o: t < 45.72 ? 0 : 1 });
    RW.forEach(r => { popA(r.row, t, r.t, { rise: 20 }); set(r.ck, { s: pop(t, r.tc, 0.35), o: t < r.tc ? 0 : 1, r: -6 }); });
    stampA(nolo, t, 46.88, -7);
  }, { clip: true });
  const ojo = stamp(c, 300, 560, '¡OJO!', { size: 170, bw: 16, z: 60, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const card = paperPiece(c, 60, 380, 960, 560, { seed: 12, bg: '#F2DCC6', z: 5 });
  box(card.inner, 0, 0, 942, 542, { backgroundImage: 'repeating-linear-gradient(90deg, rgba(178,58,72,.22) 0 30px, rgba(255,255,255,.0) 30px 60px)' });
  const wck = mkClock(card.inner, [650, 30, 150, 255], {}); wck.d.style.zIndex = 2;
  box(card.inner, 0, 330, 942, 220, { background: '#fff', borderTop: `5px solid ${INK}`, backgroundImage: `repeating-linear-gradient(90deg, rgba(200,16,46,.55) 0 26px, transparent 26px 52px), repeating-linear-gradient(0deg, rgba(200,16,46,.55) 0 26px, transparent 26px 52px)`, zIndex: 1 });
  const tbl = box(card.inner, 0, 0, 942, 542, { zIndex: 3 });
  tbl.innerHTML = `<svg width="942" height="542" style="overflow:visible">
   ${[[200, 400], [480, 420]].map(q => `<ellipse cx="${q[0] + 6}" cy="${q[1] + 8}" rx="120" ry="34" fill="${SH}"/><ellipse cx="${q[0]}" cy="${q[1]}" rx="120" ry="34" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="${q[0]}" cy="${q[1] - 4}" rx="80" ry="20" fill="#F3E3B5" stroke="${INK}" stroke-width="3"/><path d="M${q[0] - 50},${q[1] - 6} q50,-26 100,0" fill="#E2A23F" stroke="${INK}" stroke-width="3"/>`).join('')}
   <path d="M700,250 L740,250 L746,300 Q770,320 770,360 L770,470 L670,470 L670,360 Q670,320 694,300 Z" fill="#3E5A2A" stroke="${INK}" stroke-width="5"/><rect x="684" y="380" width="72" height="56" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
   <rect x="330" y="230" width="34" height="150" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><path d="M347,230 q-12,-26 0,-46 q12,20 0,46 Z" fill="${YEL}" stroke="${INK}" stroke-width="3"/>
   <path d="M90,380 v70 M100,380 v70 M110,380 v70 M100,450 v50" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M590,390 q20,30 0,110" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;
  const steam = [200, 480].map(x => { const s = box(card.inner, x - 30, 300, 60, 70, { zIndex: 4 }); s.innerHTML = `<svg width="60" height="70" style="overflow:visible"><path d="M18,66 q-12,-16 0,-32 q12,-16 0,-32 M42,66 q-12,-16 0,-32 q12,-16 0,-32" stroke="${INK}" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/></svg>`; return s; });
  const bubs = [['«¡Es culpa del reloj!»', 120, 470, 43.15, -3], ['«¡Por eso cenamos tarde!»', 380, 210, 44.46, 3]].map(q => ({ e: el('div', card.inner, { left: px(q[1]), top: px(q[2]), background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px 30px 30px 6px', padding: '10px 24px 12px', fontFamily: 'SpecialElite', fontSize: '38px', color: INK, boxShadow: `6px 6px 0 ${SH}`, whiteSpace: 'nowrap', zIndex: 8 }, q[0]), t: q[3], r: q[4] }));
  const nolo = stamp(c, 330, 770, 'NO LO EXPLICA TODO', { size: 44, bw: 8, z: 50, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const list = paperPiece(c, 400, 900, 590, 420, { seed: 44, bg: '#FBF6EA', z: 20 });
  el('div', list.inner, { left: '30px', top: '18px', fontFamily: 'Rye', fontSize: '38px', color: INK, whiteSpace: 'nowrap' }, '¿Por qué cenamos tarde?');
  box(list.inner, 30, 72, 512, 4, { background: INK });
  [['la hora', 45.79, 46.05], ['horarios de trabajo', 49.14, 49.2], ['costumbres', 50.3, 50.36]].forEach((q, i) => {
    const row = box(list.inner, 26, 96 + i * 96, 540, 84);
    const cb = box(row, 0, 6, 70, 70, { background: '#fff', border: `5px solid ${INK}`, borderRadius: '10px' });
    el('div', row, { left: '92px', top: '10px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '46px', color: INK, whiteSpace: 'nowrap' }, q[0]);
    const ck = box(row, -4, -14, 90, 90, { zIndex: 3 }); ck.innerHTML = CHECK;
    RW.push({ row, ck, t: q[1], tc: q[2] });
  });
}

/* ======================================================================
   L9 · FRASE-RESUMEN (51.08 – 54.78) + GOLPE ROSA «reloj adelantado» (54.78 – 57.18)
   ====================================================================== */
headline(51.08, 53.22, 'O sea: parte de lo que *llamamos*…', { size: 72, hlT: 52.8 });
{
  const c = scene(51.08, 54.78, t => {
    set(plate, { s: pop(t, 51.2, 0.45), r: wobble(t, 0.5, 2), o: 1 });
    const kt = pop(t, 53.24, 0.4); set(txt, { s: kt, r: -3, o: t < 53.24 ? 0 : 1 });
    const ks = p(t, 53.92, 0.3, E.outCubic); strike.style.strokeDashoffset = f1(1200 * (1 - ks)); strike.parentNode.style.opacity = t > 53.9 ? 1 : 0;
    set(pkc, { s: pop(t, 52.1, 0.4), r: Math.sin(t * 6) * 8, o: t < 52.1 ? 0 : 1 });
  }, { clip: true });
  const plate = box(c, 290, 660, 500, 330, { zIndex: 2 });
  plate.innerHTML = `<svg width="500" height="330" style="overflow:visible"><ellipse cx="258" cy="180" rx="200" ry="70" fill="${SH}"/><ellipse cx="250" cy="170" rx="200" ry="70" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="250" cy="164" rx="140" ry="44" fill="${CREAM}" stroke="${INK}" stroke-width="3"/><path d="M40,60 v150 M30,60 v60 M50,60 v60 M30,120 q10,10 20,0" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M462,60 q24,40 0,90 v80" stroke="${INK}" stroke-width="9" stroke-linecap="round" fill="none"/></svg>`;
  const pkc = box(c, 680, 560, 150, 150, { zIndex: 3 }); pkc.innerHTML = miniClock(10, 0);
  const txt = el('div', c, { left: '0', top: '420px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '150px', color: INK, zIndex: 5, textShadow: `6px 6px 0 ${YEL}` }, '«cenar tarde»');
  const sk = box(c, 0, 0, 1080, 1920, { zIndex: 6 });
  sk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="stk" d="M90,540 C300,500 600,560 990,470 M120,600 C400,560 700,580 960,540" stroke="${RED}" stroke-width="22" fill="none" stroke-linecap="round" stroke-dasharray="1200 1200"/></svg>`;
  const strike = sk.querySelector('.stk');
}
colorHit(54.78, 57.18, PINK, c => {
  const ck = mkClock(c, [390, 880, 300, 510], {}); ck.d.style.filter = SIL; ck.d.style.zIndex = 3;
  const sm = el('div', c, { left: '0', top: '200px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '64px', color: INK, zIndex: 5, textDecoration: `line-through ${INK} 8px` }, '«cenar tarde»');
  const l1 = el('div', c, { left: '0', top: '320px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '82px', color: INK, zIndex: 5 }, 'es que nuestro');
  const l2 = el('div', c, { left: '0', top: '400px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '250px', lineHeight: 1, color: INK, zIndex: 5, textShadow: '9px 9px 0 #fff' }, 'RELOJ');
  const l3 = el('div', c, { left: '0', top: '660px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', lineHeight: 1.05, color: INK, zIndex: 5 }, `va ${hlSpan('ADELANTADO', 'adh', YEL)}`);
  const adh = l3.querySelector('.adh');
  return t => {
    set(sm, { s: lerp(1.3, 1, p(t, 54.78, 0.2)), o: 1 });
    set(l1, { o: t > 54.8 ? 1 : 0, y: (1 - p(t, 54.8, 0.25, E.outBack)) * 40 });
    set(l2, { s: pop(t, 55.4, 0.4), o: t < 55.4 ? 0 : 1 });
    set(l3, { s: pop(t, 56.0, 0.4) * (1 + 0.08 * (t > 56.27 ? 1 - p(t, 56.27, 0.4) : 0)), o: t < 56.0 ? 0 : 1, r: -2 });
    l3.style.textShadow = glitch(t, 56.27, 0.3); l2.style.textShadow = (glitch(t, 56.27, 0.3) || '9px 9px 0 #fff');
    paint(adh, t, 56.3, 0.35);
    setClock(ck, 9 + (t - 54.78) * 1.4, Math.sin(t * Math.PI * 2) * 14);
    set(ck.d, { r: Math.sin(t * 6) * 3 });
  };
});

/* ======================================================================
   L10 · ENCUESTA (57.18 – 66.4)
   ====================================================================== */
headline(57.18, 60.38, 'Y ahora dime: ¿volverías a la hora de *Portugal*?', { size: 62, hlT: 59.43 });
{
  const OPT = [];
  const c = scene(57.18, 66.4, t => {
    set(card.wrap, { y: (1 - p(t, 57.2, 0.45, E.outBack)) * 900 + (t > 60.3 ? -p(t, 60.3, 0.4, E.inOutCubic) * 0 : 0), r: -1 });
    q.textContent = typeText('¿Volverías a la hora de Portugal?', t, 58.1, 22);
    OPT.forEach(o => { popA(o.row, t, o.t, { rise: 30 }); const k = p(t, o.tm, 0.2, E.outBack); set(o.x, { s: k, o: t < o.tm ? 0 : 1, r: -8 }); o.row.style.background = t >= o.tm ? 'rgba(255,230,0,.55)' : 'transparent'; });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(av, { r: wobble(t, 0.6, 4), o: 1 });
    vecFace(avV, t, { jaw: talkW(t) * 0.8, noCup: true, noFan: true, look: [2, 2], seed: 0.2, bL: 4, bR: 8 });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.35), rgba(120,40,60,.28) 90%)' });
  const card = paperPiece(c, 70, 370, 940, 640, { seed: 61, bg: '#FBF6EA', z: 5 });
  el('div', card.inner, { left: '30px', top: '22px', fontFamily: 'Rye', fontSize: '44px', color: RED, letterSpacing: '0.06em' }, 'PAPELETA');
  box(card.inner, 30, 82, 862, 4, { background: INK });
  const q = el('div', card.inner, { left: '30px', top: '100px', fontFamily: 'SpecialElite', fontSize: '44px', color: INK, whiteSpace: 'nowrap' }, '');
  const av = box(card.inner, 760, 6, 150, 150, { borderRadius: '50%', overflow: 'hidden', border: `5px solid ${INK}`, background: '#F4CFDA', zIndex: 3 });
  const avV = mkVec(av, [-40, -6, 230, 285]);
  [['A', 'Sí', 60.44, 61.17], ['B', 'No', 62.35, 63.01], ['C', 'Me da igual mientras haya siesta', 63.68, 65.42]].forEach((o, i) => {
    const row = box(card.inner, 20, 180 + i * 130, 880, 112, { borderRadius: '16px' });
    const cb = box(row, 14, 18, 78, 78, { background: '#fff', border: `5px solid ${INK}`, borderRadius: '10px' });
    el('div', row, { left: '112px', top: '14px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: INK }, o[0]);
    el('div', row, { left: '180px', top: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: o[1].length > 10 ? '42px' : '56px', color: INK, whiteSpace: 'nowrap' }, '· ' + o[1]);
    const x = box(row, 10, 12, 88, 88, { zIndex: 3 }); x.innerHTML = XMARK;
    OPT.push({ row, x, t: o[2], tm: o[3] });
  });
  const CM = [];
  [['FAR', '@pepe_del_faro', 'Yo, la A ☀️', 64.25], ['EMU', '@emu_de_guardia', 'La C, sin ninguna duda 😴', 64.95]].forEach((m, i) => {
    const e = box(c, 80 + i * 30, 1050 + i * 120, 820, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 80, m[0], { bw: 3 });
    el('div', e, { left: '106px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '26px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '106px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   L11 · CIERRE: «Y esto…» (66.4 – 67.68) · libro (67.68 – 68.95) · tarjeta final
   ====================================================================== */
headline(66.4, 67.68, 'Y esto…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}`, allAt: 66.45 });
headline(67.68, 68.95, '…no venía en el *libro*.', { size: 84, hlT: 68.4 });
{
  const c = scene(66.4, 67.68, t => {
    const k = p(t, 66.4, 1.25, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t) * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false, noCup: true });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(67.68, 68.95, t => {
    const k = p(t, 68.1, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 68.4;
    set(bookW, { s: 1.25 * pop(t, 67.69, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 68.4, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 90, y: Math.sin(a) * 26, o: closed ? 1 : 0, r: t * 200 }); });
    dust.forEach((d, i) => { const kd = p(t, 68.4, 0.5, E.outCubic); set(d, { x: (i - 2) * 110 * kd, y: -kd * 60, s: 0.5 + kd, o: closed ? 1 - p(t, 68.6, 0.3) : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayerIn(box(bookW, 0, 0, 1080, 1920));
  let lines = ''; for (let i = 0; i < 6; i++) lines += `<path d="M180,${980 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="720" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="40" fill="${INK}">LA HORA</text><text x="335" y="760" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="32" fill="${INK}">oficial</text>
   <g transform="translate(265,790) scale(1.4)"><circle cx="50" cy="50" r="46" fill="${CREAM}" stroke="${INK}" stroke-width="4"/><path d="M50,50 L50,22 M50,50 L74,50" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '510px', top: '560px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const dust = []; for (let i = 0; i < 5; i++) dust.push(box(bookW, 500, 1170, 80, 80, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,90,60,.6), rgba(120,90,60,0) 70%)', zIndex: 3 }));
}
{
  const c = scene(68.95, 999, t => {
    set(ov.wrap, { s: pop(t, 69.0, 0.45), r: wobble(t, 0.4, 2), o: t < 69.0 ? 0 : 1 });
    vecFace(ov.vec, t, { look: [0, 0], bR: Math.sin(t * 3) > 0.6 ? 10 : 0, fan: wobble(t, 0.8, 6), noCup: true, closed: t > 70.4 && t < 70.62, seed: 0.5 });
    set(lt, { s: pop(t, 69.2, 0.45), o: t < 69.2 ? 0 : 1 }); paint(lhl, t, 69.5, 0.4);
    popA(ttl, t, 69.6, { r: -1 }); popA(src, t, 69.9, { rise: 30 });
    set(mck, { r: wobble(t, 0.5, 6), s: pop(t, 69.75, 0.4), o: t < 69.75 ? 0 : 1 });
  }, { cut: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const ov = ovalFrame(c, 375, 300, 330, 362, 3);
  const mck = box(c, 700, 300, 150, 150, { zIndex: 4 }); mck.innerHTML = miniClock(10, 0);
  const lt = box(c, 40, 780, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1040px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 3 · La hora de España');
  const src = el('div', c, { left: '90px', top: '1170px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: BOE (marzo de 1940) · Instituto Geográfico Nacional');
}

/* ======================================================================
   VECINO en el óvalo: cuándo aparece y reacciones
   ====================================================================== */
ovShow(-1, 5.3, { x: 0, y: 0, s: 1.05 });
ovShow(18.25, 21.95);
ovShow(27.15, 31.02);
ovShow(42.2, 54.78);
OVX.push(t => {
  if (t > 1.72 && t < 2.6) return { bL: 16, bR: 16, fan: Math.sin(t * 26) * 22 - 10 };
  if (t > 30.33 && t < 31.0) return { bL: 14, bR: 14, fan: Math.sin(t * 26) * 18 - 10 };
  if (t > 34.95 && t < 35.9) return { look: [4, -2], bR: 12 };
  if (t > 42.27 && t < 43.0) return { bL: 16, bR: 16, look: [3, -3] };
  if (t > 46.86 && t < 47.7) return { bL: 4, bR: 14, look: [-4, 2] };
  if (t > 53.92 && t < 54.6) return { hm: true, closed: true, bL: 10, bR: 10, jaw: 0.3 };
  return null;
});

/* ---------- temblores ---------- */
[[1.72, .45, 14], [5.05, .35, 12], [9.8, .3, 6], [19.18, .3, 8], [30.34, .45, 14], [36.15, .3, 10], [37.15, .3, 8], [42.27, .35, 12], [46.88, .3, 6], [53.92, .3, 8], [56.27, .4, 14], [68.4, .5, 20]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.05, 'swoosh_up', .45], [1.72, 'thud', 1.1], [1.75, 'bell', .8], [3.56, 'pop', .7], [5.05, 'stamp', 1],
  [5.45, 'whoosh', .6], [5.7, 'paper', .5], [7.05, 'pop2', .6], [7.15, 'swoosh_up', .45], [8.03, 'ping', .6], [9.8, 'ding', .8],
  [10.62, 'whoosh', .6], [10.98, 'pop', .7], [11.72, 'swoosh_up', .6], [12.97, 'stamp', .6],
  [13.3, 'whoosh', .6], [13.85, 'swoosh_up', .5], [14.6, 'pop', .5], [15.64, 'pop', .7], [16.29, 'pop', .7], [17.14, 'whoosh', .5], [17.42, 'pop2', .7],
  [18.25, 'whoosh', .6], [18.57, 'paper', .7], [18.78, 'paper', .6], [18.98, 'paper', .6], [19.2, 'thud', .9], [19.95, 'whoosh', .5], [20.34, 'pop', .6],
  [21.95, 'whoosh', .6], [22.3, 'clockfast', .7], [23.08, 'ding', .8],
  [23.8, 'whoosh', .5], [24.06, 'pop', .5], [25.02, 'swoosh_up', .6], [25.47, 'pop2', .6], [25.95, 'sparkle', .6], [26.43, 'pop', .5],
  [27.17, 'whoosh', .6], [27.65, 'tada', .55], [28.5, 'whoosh', .5], [29.1, 'tick', .5], [29.6, 'tick', .5], [30.1, 'tick', .5], [30.34, 'stamp', 1], [30.4, 'click', .7],
  [31.05, 'whoosh', .6], [31.32, 'pop', .5], [31.64, 'pop', .5], [32.37, 'pop2', .6], [34.14, 'ding', .7], [35.0, 'boing', .5],
  [36.15, 'burst', .9], [37.16, 'cash', .8],
  [37.84, 'whoosh', .6], [38.3, 'pop', .6], [38.88, 'pop', .5], [40.15, 'clockfast', .6], [39.24, 'emu', .8], [41.37, 'ding', .9], [41.72, 'sparkle', .5],
  [42.27, 'stamp', 1], [43.17, 'pop2', .5], [44.48, 'pop2', .5], [45.8, 'whoosh', .5], [46.05, 'click', .7], [46.88, 'stamp', .7], [49.2, 'click', .7], [50.36, 'click', .7],
  [51.1, 'whoosh', .6], [52.12, 'pop', .5], [53.25, 'thud', .7], [53.92, 'scratch', .9],
  [54.78, 'burst', .9], [55.42, 'pop', .6], [56.27, 'glitch', .8], [56.3, 'stamp', .8],
  [57.2, 'whoosh', .6], [58.1, 'typing', .6], [60.45, 'pop', .7], [61.18, 'click', .8], [62.36, 'pop', .7], [63.02, 'click', .8], [63.69, 'pop', .7], [64.26, 'msg_in', .7], [64.96, 'msg_in', .7], [65.43, 'click', .8],
  [66.4, 'whoosh', .6], [67.7, 'swoosh_up', .5], [68.4, 'thud', 1.3],
  [69.0, 'whoosh', .5], [69.25, 'tada', .7], [69.62, 'pop', .6], [69.92, 'paper', .5],
].forEach(s => sfx(s[1], s[0], s[2]));
