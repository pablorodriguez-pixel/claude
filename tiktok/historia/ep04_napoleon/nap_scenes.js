/* Ep. 4 · «Napoleón no era bajito» — escenas (tiempos clavados a words_table.txt) */
const TW = i => W[i].s;           // inicio palabra i
const TE = i => W[i].e;           // fin palabra i
const useSvg = (sym, vb, w, h, css = '') => `<svg viewBox="${vb}" width="100%" height="100%" style="overflow:visible;${css}"><use href="#${sym}" width="${w}" height="${h}"/></svg>`;
function burst(parent, cx, cy, r0, r1, n = 14, z = 2) {
  const d = box(parent, cx - r1, cy - r1, r1 * 2, r1 * 2, { zIndex: z }); let s = '';
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const x0 = r1 + Math.cos(a) * r0, y0 = r1 + Math.sin(a) * r0, x1 = r1 + Math.cos(a) * r1, y1 = r1 + Math.sin(a) * r1; s += `<path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${i % 2 ? YEL : PINK}" stroke-width="9" stroke-linecap="round"/>`; }
  d.innerHTML = `<svg width="${r1 * 2}" height="${r1 * 2}" style="overflow:visible">${s}</svg>`; return d;
}
const heartSvg = (c = PINK) => `<svg viewBox="0 0 100 92" width="100%" height="100%" style="overflow:visible"><path d="M50,88 C20,64 4,46 4,28 C4,12 16,2 30,2 C40,2 46,8 50,16 C54,8 60,2 70,2 C84,2 96,12 96,28 C96,46 80,64 50,88 Z" fill="${c}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M22,22 Q26,12 36,12" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/></svg>`;
function newspaperSmall(parent, x, y, w, h, title, seed) {
  const pp = paperPiece(parent, x, y, w, h, { seed, bg: '#F2EBDA' });
  el('div', pp.inner, { left: '0', top: '8px', width: px(w - 18), textAlign: 'center', fontFamily: 'Rye', fontSize: px(h * 0.13), color: INK, whiteSpace: 'nowrap' }, 'GAZETTE');
  box(pp.inner, 10, h * 0.25, w - 38, 4, { background: INK });
  el('div', pp.inner, { left: '0', top: px(h * 0.3), width: px(w - 18), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(h * 0.2), color: RED, whiteSpace: 'nowrap', lineHeight: 1 }, title);
  let ln = ''; for (let i = 0; i < 5; i++) ln += `<path d="M10,${f1(h * 0.62 + i * h * 0.065)} H${i % 2 ? w * 0.42 : w - 40}" stroke="${INK}" stroke-width="3" opacity=".45"/>`;
  box(pp.inner, 0, 0, w - 18, h - 18).innerHTML = `<svg width="${w}" height="${h}">${ln}</svg>`;
  return pp.wrap;
}

/* ======================================================================
   A · GANCHO + «≈ 1,68 m» (0 – 5.8)  L0 + L1a
   ====================================================================== */
headline(3.81, 5.8, 'Medía *≈ 1,68 m*', { size: 88, hlT: 4.7 });
{
  const FL = 1250, M = 430, tG = 0.92;
  const c = scene(-1, 5.8, t => {
    // caricatura → tamaño real
    const kc = p(t, tG, 0.2, E.outCubic);
    set(cari.d, { s: 1 + 1.3 * kc, o: t < tG ? 1 : 1 - kc, y: wobble(t, 3.2, 6) * (t < tG ? 1 : 0) - (t < tG ? Math.abs(Math.sin(t * 9)) * 26 : 0) });
    cariAnim(cari, t, 1);
    set(steam, { o: t < tG ? 1 : 0, y: -Math.abs(Math.sin(t * 9)) * 26, s: 0.9 + 0.15 * Math.sin(t * 18) });
    const kn = t < tG ? 0 : E.outBackBig(clamp((t - tG) / 0.55));
    set(nap.d, { s: lerp(0.3, 1, kn), sy: 1 + 0.06 * Math.sin(clamp((t - tG) / 0.5) * Math.PI) , o: t < tG ? 0 : 1, y: wobble(t, 0.5, 1.5) });
    nface(nap, t, { look: t < 1.4 ? [0, -2] : t < 3.4 ? [-2, 1] : [2, -1], brow: t > 1.46 && t < 2.4 ? 6 : 0, mouth: t < 1.6 ? 'N' : 'S', seed: 0.7 });
    const kb = p(t, tG, 0.6, E.outCubic); set(bst, { s: 0.4 + 0.9 * kb, o: t < tG ? 0 : 1 - p(t, tG + 0.35, 0.3), r: t * 20 });
    // medidor
    let h = 0.6;
    if (t >= tG) h = lerp(0.6, 1.68, E.outElastic(clamp((t - tG - 0.05) / 0.8)));
    if (t >= 4.4) h = t < 4.67 ? lerp(1.68, 1.88, p(t, 4.4, 0.27, E.outCubic)) : lerp(1.88, 1.68, p(t, 4.67, 0.95, E.inOutCubic));
    R.setH(h);
    const tagOn = t >= 4.4;
    R.tag.style.visibility = tagOn ? 'visible' : 'hidden';
    if (tagOn) { R.tag.textContent = '≈ 1,68 m'; set(R.tag, { s: 1 + 0.18 * (1 - p(t, 5.62, 0.3, E.outBack)) * (t >= 5.62 ? 1 : 0), r: -2 }); }
    // título del gancho
    set(ttl, { o: 1 - p(t, 3.62, 0.18), y: -p(t, 3.62, 0.18) * 40 });
    stampA(noSt, t, 0.59, -12); if (t >= 3.62) noSt.style.opacity = 1 - p(t, 3.62, 0.18);
    strike.style.transform = `scaleX(${f1(p(t, 0.88, 0.22) * 1000) / 1000}) rotate(-3deg)`;
    popA(chB, t, 2.6, { r: 3, o: 1 - p(t, 3.62, 0.18) });
    // sello MITO
    const ks = p(t, 4.15, 0.4, E.inOutCubic);
    if (t < 3.56) set(mito, { o: 0 }); else { const k = p(t, 3.56, 0.18, E.outCubic); set(mito, { s: lerp(2.3, 1, k) * lerp(1, 0.42, ks), x: 235 * ks, y: 300 * ks, r: -12 + 4 * ks, o: 0.95 }); }
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920);
  ground(cam, FL - 6);
  const R = mkRuler(cam, 150, FL, M, { arm: 330, top: 1.9, slZ: 2, z: 3 });
  const nap = mkMan(cam, 470, FL, 1.68, M, { seed: 1 }); nap.d.style.zIndex = 4;
  const bst = burst(cam, 470, 820, 300, 470, 16, 1);
  const cari = mkCari(cam, [350, FL - 0.97 * 340, 250, 340]); cari.d.style.zIndex = 5;
  const steam = steamPuffs(cam, 325, FL - 0.97 * 340 - 40); steam.style.zIndex = 6;
  const ttl = box(c, 40, 140, 1000, 240, { zIndex: 500, textAlign: 'center' });
  ttl.innerHTML = `<div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.02;color:${INK}">Napoleón</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.02;color:${INK}">era <span style="position:relative;display:inline-block;font-style:italic;z-index:0"><span style="position:absolute;left:-10px;right:-10px;bottom:6%;height:42%;background:${YEL};z-index:-1;border-radius:4px 12px 6px 14px"></span>bajito<span class="stk" style="position:absolute;left:-14px;right:-14px;top:52%;height:14px;background:${RED};border-radius:7px;transform-origin:left center;transform:scaleX(0)"></span></span></div>`;
  const strike = ttl.querySelector('.stk');
  const noSt = stamp(c, 52, 262, 'NO', { size: 88, bw: 9, z: 510, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
  const chB = chip(c, 600, 430, '200 años de bulo', { size: 38, bg: PINK });
  const mito = stamp(c, 230, 600, 'MITO', { size: 190, bw: 16, z: 520, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
}

/* ======================================================================
   A2 · RUEDA DE RECONOCIMIENTO: lo normal en su época (5.8 – 7.47)  L1b
   ====================================================================== */
headline(5.8, 7.47, 'Lo *normal* en su época', { size: 84, hlT: 6.1 });
{
  const FL = 1240, M = 420;
  const c = scene(5.8, 7.47, t => {
    men.forEach((m, i) => { const k = p(t, m.t, 0.35, E.outBack); set(m.f.d, { x: (1 - k) * m.dx, y: -Math.abs(Math.sin((t - m.t) * 12)) * 10 * (1 - clamp((t - m.t) / 0.5)) }); nface(m.f, t, { look: [m.dx > 0 ? -2 : 2, 0], seed: i, mouth: t > 6.9 ? 'S' : 'N' }); });
    nface(nap, t, { look: [2, -1], seed: 0.3, mouth: 'S', brow: t > 7.0 ? 5 : 0 });
    set(nap.d, { y: wobble(t, 0.6, 1.5) });
    avg.style.transform = `scaleX(${f1(p(t, 6.67, 0.4, E.outCubic) * 1000) / 1000})`;
    popA(avgL, t, 6.75, { r: -2 });
    popA(chN, t, 6.08, { r: 3 });
  }, { cut: true, clip: true });
  sceneBg(c, { background: '#E4D6B8' });
  const wl = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); {
    let s = ''; [1.5, 1.6, 1.7, 1.8, 1.9].forEach(h => { const y = FL - h * M; s += `<path d="M60,${y} H1020" stroke="${INK}" stroke-width="${h * 10 % 2 === 0 ? 4 : 2.5}" opacity=".55"/><text x="66" y="${y - 8}" font-family="SpecialElite" font-size="30" fill="${INK}">${h.toFixed(1).replace('.', ',')} m</text>`; });
    for (let h = 1.5; h < 1.9; h += 0.02) { const y = f1(FL - h * M); s += `<path d="M60,${y} h18 M1002,${y} h18" stroke="${INK}" stroke-width="2" opacity=".5"/>`; }
    wl.innerHTML = `<svg width="1080" height="1920">${s}</svg>`;
  }
  ground(c, FL - 6);
  const men = [
    { f: mkMan(c, 190, FL, 1.64, M, { hat: 'top', pose: 'down', coat: '#8a6a4a', seed: 2 }), dx: -500, t: 5.83 },
    { f: mkMan(c, 390, FL, 1.66, M, { hat: 'none', pose: 'down', coat: '#6b5a4a', hairC: '#8a6a4a', seed: 3 }), dx: -700, t: 5.95 },
    { f: mkMan(c, 810, FL, 1.65, M, { hat: 'tricorne', pose: 'down', coat: '#9c7f5a', seed: 4 }), dx: 500, t: 6.08 },
  ];
  men.forEach(m => m.f.d.style.zIndex = 3);
  const nap = mkMan(c, 600, FL, 1.68, M, { seed: 1 }); nap.d.style.zIndex = 4;
  const avg = box(c, 60, FL - 1.65 * M - 4, 960, 8, { zIndex: 6, transformOrigin: 'left center', backgroundImage: `repeating-linear-gradient(90deg, ${PINK} 0 26px, transparent 26px 40px)` });
  const avgL = chip(c, 300, 372, 'media de su época', { size: 38, bg: PINK });
  const chN = chip(c, 640, 1272, 'lo normal ✓', { size: 36, bg: '#fff', color: INK });
}
/* golpe de color amarillo: …o incluso un poco más (7.47 – 8.62) */
colorHit(7.47, 8.62, YEL, c => {
  const FL = 1240, M = 420;
  const sil = [[190, 1.64, { hat: 'top', pose: 'down' }], [390, 1.66, { hat: 'none', pose: 'down' }], [810, 1.65, { hat: 'tricorne', pose: 'down' }], [600, 1.68, {}]].map(q => { const f = mkMan(c, q[0], FL, q[1], M, q[2]); f.d.style.filter = SIL; f.d.style.zIndex = 3; return f; });
  const ln = box(c, 60, FL - 1.65 * M - 4, 960, 8, { zIndex: 4, backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 26px, transparent 26px 40px)` });
  const t1 = el('div', c, { left: '0', top: '170px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '92px', lineHeight: 1, color: INK, zIndex: 5 }, '…o incluso');
  const t2 = el('div', c, { left: '0', top: '270px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 5 }, 'un poco MÁS');
  const arw = box(c, 560, 440, 80, 90, { zIndex: 6 }); arw.innerHTML = arrowSvg('M40,80 L40,10 M14,36 L40,10 L66,36', PINK, 12);
  return t => {
    set(t1, { s: lerp(1.3, 1, p(t, 7.47, 0.2)), o: 1 }); t2.style.textShadow = glitch(t, 8.23, 0.25) || `6px 6px 0 #fff`;
    set(t2, { s: pop(t, 7.95, 0.35), o: t < 7.95 ? 0 : 1 });
    set(arw, { y: -Math.abs(Math.sin(t * 8)) * 18, o: t > 7.6 ? 1 : 0 });
    set(sil[3].d, { sy: 1 + 0.03 * Math.abs(Math.sin((t - 7.5) * 6)) });
  };
});

/* ======================================================================
   B · MARCA: EL VECINO EN SU BALCÓN (8.62 – 11.92)  L2
   ====================================================================== */
{
  const c = scene(8.62, 11.92, t => {
    const ex = p(t, 11.7, 0.22, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 8.62, 3.3, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, 11.0, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > 8.85 && t < 9.5;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > 9.6 && t < 10.3 ? [0, -5] : t > 10.5 && t < 11.0 ? [-5, 4] : [0, 0], bL: t > 8.8 && t < 9.5 ? 8 : t > 11.1 ? 6 : 0, bR: t > 8.8 && t < 9.5 ? 8 : t > 11.1 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : (t > 10.5 && t < 11.0 ? 26 : wobble(t, 0.9, 6)), seed: 0.3 });
    popA(tag, t, 9.17, { r: -5 });
    const ks = p(t, 9.75, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 9.7, 2)) + (1 - ks) * 8, o: t < 9.73 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 11.32, 0.3);
    const kc = p(t, 10.5, 0.5, E.outBack); set(chair.d, { s: lerp(0.15, 1, kc), x: lerp(200, 0, kc), y: lerp(-420, 0, kc), r: lerp(-20, -4, kc), o: t < 10.48 ? 0 : 1 });
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
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['esto', 33, sl1], ['no', 34, sl1], ['venía', 35, sl1], ['en', 36, sl2], ['el', 37, sl2], ['libro', 38, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
  const chair = mk(cam, [300, 1000, 480, 640], chairInner(), '0 0 300 400', 'chair'); chair.d.style.zIndex = 30;
  el('div', chair.d, { left: '120px', top: '-60px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: PINK, textShadow: `3px 3px 0 ${INK}`, whiteSpace: 'nowrap' }, '¡siéntate!');
}

/* ======================================================================
   C · ¿POR QUÉ TODOS CREEN LO CONTRARIO? (11.92 – 15.0)  L3a
   ====================================================================== */
headline(11.92, 15.0, '¿Por qué todos creen *lo contrario*?', { size: 76, hlT: 14.21 });
{
  const BT = [13.39, 13.68, 13.91, 14.21];
  const c = scene(11.92, 15.0, t => {
    busts.forEach((b, i) => {
      const k = p(t, 12.0 + i * 0.12, 0.35, E.outBack);
      set(b.f.d, { y: (1 - k) * 500 + wobble(t, 0.5, 3, i * 0.3), r: t > BT[i] ? Math.sin((t - BT[i]) * 10) * 2 * (1 - p(t, BT[i], 0.8)) : 0 });
      face(b.f, t, { look: t > BT[i] ? [1, -4] : [0, 0], jaw: t > BT[i] && t < BT[i] + 0.25 ? 0.4 : 0, brow: t > BT[i] ? -4 : 0, seed: i * 0.7 });
      set(b.bub, { s: pop(t, BT[i], 0.4), o: t < BT[i] ? 0 : 1, y: wobble(t, 0.8, 4, i) });
      cariAnim(b.cf, t + i * 0.3, 0.7);
    });
    set(qm, { o: t > 14.4 ? 1 : 0, s: pop(t, 14.4, 0.3), r: Math.sin(t * 5) * 8 });
  });
  const opts = [{ uniform: 'farmer', moustache: true, seed: 12 }, { uniform: 'officer', hat: 'cap', seed: 14 }, { uniform: 'farmer', hat: 'cap', beard: true, seed: 16 }, { uniform: 'soldier', hat: 'slouch', seed: 18 }];
  const busts = opts.map((o, i) => {
    const x = 60 + i * 215, y = 730;
    const f = mk(c, [x, y, 250, 320], bustInner(o), '0 0 360 460', 'bust'); f.d.style.zIndex = 3;
    const bub = box(c, x + 4, 450, 230, 230, { zIndex: 4, transformOrigin: '50% 100%' });
    bub.innerHTML = `<svg viewBox="0 0 230 230" width="230" height="230" style="overflow:visible">${cut('<ellipse cx="115" cy="96" rx="104" ry="88"/><circle cx="96" cy="206" r="12"/><circle cx="108" cy="230" r="7"/>', 5, 7)}<ellipse cx="115" cy="96" rx="104" ry="88" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="96" cy="206" r="12" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="108" cy="230" r="7" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
    const cf = mkCari(bub, [60, 18, 110, 151]);
    return { f, bub, cf };
  });
  const qm = el('div', c, { left: '840px', top: '1080px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 6 }, '?');
}

/* ======================================================================
   TARJETAS 1-2-3 (boca abajo → se voltea la que toca)
   ====================================================================== */
const CARD_TXT = ['LAS PULGADAS', 'LOS INGLESES', 'SU MOTE'];
function cardIcon(n) {
  if (n === 1) { let tk = ''; for (let i = 0; i <= 24; i++) tk += `<path d="M${20 + i * 8},60 v${i % 12 === 0 ? -34 : i % 6 === 0 ? -24 : -14}" stroke="${INK}" stroke-width="${i % 6 === 0 ? 3 : 2}"/>`; return `<svg viewBox="0 0 230 100" width="100%" height="100%" style="overflow:visible">${cut('<rect x="8" y="20" width="214" height="60" rx="8"/>', 4, 5)}<rect x="8" y="20" width="214" height="60" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>${tk}<text x="44" y="76" font-family="SpecialElite" font-size="15" fill="${INK}">1</text><text x="140" y="76" font-family="SpecialElite" font-size="15" fill="${INK}">2</text></svg>`; }
  if (n === 2) return useSvg('cariS', '0 -14 320 460', 320, 440);
  return `<div style="position:absolute;left:30%;top:4%;width:40%;height:92%">${heartSvg(PINK)}</div>`;
}
function cardsScene(t0, t1, o) {
  const BX = [80, 380, 680], BY = 560, CW = 250, CH = 360;
  const c = scene(t0, t1, t => {
    cards.forEach((cd, i) => {
      const n = i + 1;
      let kin = 1; if (o.drops) kin = p(t, o.drops[i], 0.45, E.outBounce);
      const isF = n === o.flip, kf = isF ? p(t, o.tFlip, 0.55, E.inOutCubic) : 0;
      const away = !isF && o.flip ? p(t, o.tFlip, 0.3, E.inCubic) : 0;
      const sx = isF ? Math.max(0.02, Math.abs(Math.cos(Math.PI * kf))) : 1;
      cd.back.style.display = kf < 0.5 ? '' : 'none'; cd.front.style.display = kf >= 0.5 ? '' : 'none';
      set(cd.w, { x: (415 - BX[i]) * kf, y: lerp(-900, 0, kin) + 70 * kf + away * 1500, s: 1 + 0.6 * kf, sx, r: (i - 1) * 4 * (1 - kf) + (o.drops && kin < 1 ? (1 - kin) * 20 : 0) + wobble(t, 0.6, 0.6, i), o: (o.drops && t < o.drops[i]) ? 0 : 1 - away });
      cd.w.style.zIndex = isF ? 20 : 10;
      if (cd.done) cd.done.style.opacity = n < o.flip ? 1 : 0;
    });
    if (o.big3) set(big3, { s: pop(t, o.big3, 0.4), o: t < o.big3 ? 0 : 1 - (o.flip ? p(t, o.tFlip, 0.2) : 0), r: -6 });
  });
  const cards = [0, 1, 2].map(i => {
    const w = box(c, BX[i], BY, CW, CH, { zIndex: 10 });
    const back = box(w, 0, 0, CW, CH, { background: INK, border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 10px 0 ${SH}`, overflow: 'hidden' });
    box(back, 10, 10, CW - 32, CH - 32, { border: `4px solid ${BRASS2}`, borderRadius: '14px', backgroundImage: `repeating-linear-gradient(45deg, rgba(201,162,74,.22) 0 3px, transparent 3px 14px), repeating-linear-gradient(-45deg, rgba(201,162,74,.22) 0 3px, transparent 3px 14px)` });
    el('div', back, { left: '0', top: '86px', width: px(CW - 12), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: YEL, textShadow: `5px 5px 0 ${PINK}` }, String(i + 1));
    const front = box(w, 0, 0, CW, CH, { background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '22px', boxShadow: `8px 10px 0 ${SH}`, overflow: 'hidden' });
    box(front, 0, 0, CW - 12, 92, { background: YEL, borderBottom: `5px solid ${INK}` });
    el('div', front, { left: '0', top: '4px', width: px(CW - 12), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '78px', lineHeight: 1, color: INK }, String(i + 1));
    box(front, 30, 112, CW - 72, 150).innerHTML = cardIcon(i + 1);
    el('div', front, { left: '0', top: '276px', width: px(CW - 12), textAlign: 'center', fontFamily: 'Rye', fontSize: '27px', lineHeight: 1.1, color: INK }, CARD_TXT[i]);
    let done = null;
    if (i + 1 < (o.flip || 0)) { done = box(w, 40, 90, 170, 170, { zIndex: 5 }); done.innerHTML = `<div style="position:absolute;inset:0;background:${YEL};border:6px solid ${INK};border-radius:50%"></div><div style="position:absolute;left:30px;top:30px;width:110px;height:110px">${CHECK}</div>`; }
    return { w, back, front, done };
  });
  let big3 = null;
  if (o.big3) big3 = chip(c, 330, 1000, 'tres cosas', { size: 52, bg: PINK });
  return c;
}
headline(15.0, 16.8, 'Por *tres* cosas', { size: 92, hlT: 15.75 });
cardsScene(15.0, 18.6, { drops: [15.05, 15.75, 15.94], flip: 1, tFlip: 16.82, big3: 15.75 });
headline(16.8, 18.6, 'Una: las *pulgadas*', { size: 88, hlT: 17.55 });

/* ======================================================================
   D · LA AUTOPSIA: «5 pieds 2 pouces» (18.6 – 21.67)  L4b
   ====================================================================== */
headline(18.6, 21.67, 'Cuando murió, *midieron*…', { size: 80, hlT: 19.45 });
{
  const c = scene(18.6, 21.67, t => {
    set(doc.wrap, { y: (1 - p(t, 18.62, 0.4, E.outBack)) * 900, r: -1.5 });
    const s1 = typeText('5 pieds', t, 19.9, 16), s2 = typeText('2 pouces', t, 20.49, 18);
    l1.textContent = s1; l2.textContent = s2;
    const writing = (t > 19.9 && s1.length < 7) || (t > 20.49 && s2.length < 8);
    const qx = t < 20.49 ? 230 + s1.length * 40 : 230 + s2.length * 44, qy = t < 20.49 ? 640 : 760;
    set(quill, { x: qx + (writing ? Math.sin(t * 40) * 6 : 0), y: qy + (writing ? Math.cos(t * 33) * 5 : 0), r: -16, o: t > 19.6 && t < 21.4 ? 1 : 0 });
    paint(lhl, t, 20.7, 0.35);
    popA(chA, t, 19.01, { r: -3 });
    popA(chT, t, 20.9, { r: 2, rise: 30 });
    stampA(seal, t, 19.45, -14, 1);
  });
  const doc = paperPiece(c, 100, 420, 840, 590, { seed: 41, bg: '#F3E6C4' });
  const di = doc.inner;
  el('div', di, { left: '0', top: '26px', width: '822px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '40px', letterSpacing: '0.12em', color: INK }, 'PROCÈS-VERBAL D’AUTOPSIE');
  box(di, 60, 82, 700, 3, { background: INK });
  el('div', di, { left: '0', top: '96px', width: '822px', textAlign: 'center', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: '58px', color: INK }, 'Napoléon Bonaparte');
  { let s = ''; const r = rng(4); for (let i = 0; i < 4; i++) { let d = `M60,${190 + i * 26}`; for (let x = 60; x < 760; x += 14) d += ` q7,${f1(-6 - r() * 4)} 14,0`; s += `<path d="${d}" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>`; } let d2 = 'M60,500'; for (let x = 60; x < 520; x += 14) d2 += ` q7,-7 14,0`; s += `<path d="${d2}" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>`; box(di, 0, 0, 822, 572).innerHTML = `<svg width="822" height="572">${s}</svg>`; }
  el('div', di, { left: '60px', top: '300px', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: '50px', color: '#5a4a3a' }, 'Taille :');
  const l1 = el('div', di, { left: '230px', top: '250px', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: '110px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, '');
  const l2w = el('div', di, { left: '230px', top: '370px', fontFamily: 'Instrument', fontStyle: 'italic', fontSize: '110px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, hlSpan('<span class="l2"></span>', 'lhl'));
  const l2 = l2w.querySelector('.l2'), lhl = l2w.querySelector('.lhl');
  const seal = box(c, 760, 860, 150, 150, { zIndex: 8 }); seal.innerHTML = `<svg viewBox="0 0 150 150" width="150" height="150" style="overflow:visible"><path d="M75,6 C100,10 112,4 128,22 C146,40 138,56 144,75 C140,98 148,112 128,128 C110,146 96,138 75,144 C52,140 38,148 22,128 C4,110 12,96 6,75 C10,52 2,38 22,22 C40,4 54,12 75,6 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="75" cy="75" r="42" fill="none" stroke="#7a0a1c" stroke-width="5"/><text x="75" y="96" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="60" fill="#7a0a1c">N</text></svg>`;
  const quill = box(c, 0, 0, 160, 260, { zIndex: 30, transformOrigin: '10px 250px' }); quill.innerHTML = `<svg viewBox="0 0 80 200" width="160" height="260" style="overflow:visible"><path d="M10,196 L22,150" stroke="${INK}" stroke-width="5"/><path d="M22,150 C10,100 30,30 76,2 C70,60 58,120 22,150 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M22,150 Q50,80 74,8" stroke="${INK}" stroke-width="2.5" fill="none"/><path d="M30,120 l-10,-8 M38,96 l-12,-8 M46,72 l-12,-8 M54,50 l-10,-8 M42,128 l10,-10 M50,104 l12,-10 M58,80 l12,-10" stroke="${INK}" stroke-width="2"/></svg>`;
  quill.style.left = '-10px'; quill.style.top = '-250px';
  const chA = chip(c, 120, 380, 'informe de la autopsia · 1821', { size: 34, bg: INK, color: YEL });
  const chT = chip(c, 400, 1050, '= cinco pies y dos pulgadas', { size: 34, bg: '#fff', color: INK });
}

/* ======================================================================
   E · PULGADA FRANCESA vs INGLESA (21.67 – 24.85)  L4c
   ====================================================================== */
headline(21.67, 23.45, 'Pies y pulgadas *franceses*', { size: 80, hlT: 22.73 });
headline(23.45, 24.85, 'más *largos* que los ingleses', { size: 80, hlT: 23.61 });
{
  const X0 = 140, LF = 720, LE = Math.round(LF * 2.54 / 2.707); // proporción real pouce/inch
  const c = scene(21.67, 24.85, t => {
    const kf = p(t, 21.95, 0.6, E.inOutCubic), ke = p(t, 23.45, 0.5, E.inOutCubic);
    fr.clip.style.width = px(f1(kf * (LF + 30))); en.clip.style.width = px(f1(ke * (LE + 30)));
    set(fr.w, { o: t > 21.9 ? 1 : 0 }); set(en.w, { o: t > 23.4 ? 1 : 0 });
    popA(fr.lab, t, 22.73, { r: -3 }); popA(en.lab, t, 24.12, { r: 2 });
    guide.style.transform = `scaleY(${f1(p(t, 23.9, 0.3) * 1000) / 1000})`;
    set(brk, { s: pop(t, 23.95, 0.4), o: t < 23.95 ? 0 : 1 });
    popA(more, t, 24.05, { r: -4, rise: 20 });
    set(loupe, { s: pop(t, 24.3, 0.4) * (1 + 0.04 * Math.sin(t * 6)), o: t < 24.3 ? 0 : 1 });
    popA(note, t, 22.2, { rise: 20 });
  });
  function rulerBar(y, L, sub, txt, bg, col) {
    const w = box(c, X0, y, L + 40, 130, { zIndex: 4 });
    const clip = box(w, 0, 0, 0, 130, { overflow: 'hidden' });
    let tk = ''; for (let i = 0; i <= sub; i++) { const x = f1(16 + i * L / sub); tk += `<path d="M${x},6 v${i === 0 || i === sub ? 70 : i % (sub / 2) === 0 ? 50 : 30}" stroke="${INK}" stroke-width="${i === 0 || i === sub ? 6 : 3}"/>`; }
    clip.innerHTML = `<svg width="${L + 40}" height="130" style="overflow:visible">${cut(`<rect x="0" y="0" width="${L + 32}" height="110" rx="10"/>`, 6, 8)}<rect x="0" y="0" width="${L + 32}" height="110" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="${L + 32}" height="110" fill="url(#hW)" opacity=".25"/>${tk}<text x="${16 + L / 2}" y="100" text-anchor="middle" font-family="SpecialElite" font-size="26" fill="${INK}">1 ${txt}</text></svg>`;
    const lab = chip(c, X0, y - 78, txt === 'pouce' ? 'pulgada FRANCESA' : 'pulgada INGLESA', { size: 40, bg, color: col });
    return { w, clip, lab };
  }
  const fr = rulerBar(560, LF, 12, 'pouce', INK, YEL);
  const en = rulerBar(850, LE, 16, 'inch', '#fff', INK);
  const xE = X0 + 16 + LE, xF = X0 + 16 + LF;
  const guide = box(c, xE - 3, 540, 6, 440, { zIndex: 6, transformOrigin: 'center bottom', backgroundImage: `repeating-linear-gradient(0deg, ${PINK} 0 16px, transparent 16px 26px)` });
  const brk = box(c, xE - 4, 500, xF - xE + 8, 50, { zIndex: 7, transformOrigin: 'center bottom' }); brk.innerHTML = `<svg width="${xF - xE + 8}" height="50" style="overflow:visible"><path d="M4,46 V14 H${xF - xE + 4} V46" stroke="${INK}" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M4,46 V14 H${xF - xE + 4} V46" stroke="${PINK}" stroke-width="6" fill="none" stroke-linejoin="round"/></svg>`;
  const more = chip(c, xE - 300, 420, 'más larga ✓', { size: 40, bg: PINK });
  const loupe = box(c, xE - 120, 1010, 240, 240, { zIndex: 9 });
  loupe.innerHTML = `<svg viewBox="0 0 240 240" width="240" height="240" style="overflow:visible"><path d="M190,190 L232,232" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="M190,190 L230,230" stroke="${WOOD}" stroke-width="14" stroke-linecap="round"/><circle cx="110" cy="110" r="100" fill="#FBF6EA" stroke="${INK}" stroke-width="10"/><circle cx="110" cy="110" r="100" fill="none" stroke="${BRASS2}" stroke-width="5"/>
   <rect x="20" y="58" width="120" height="44" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="20" y="122" width="78" height="44" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M98,40 V186" stroke="${PINK}" stroke-width="6" stroke-dasharray="10 6"/><path d="M100,52 H140" stroke="${PINK}" stroke-width="8"/><text x="120" y="96" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="30" fill="${INK}">+</text></svg>`;
  const note = el('div', c, { left: '340px', top: '1100px', width: '360px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK, zIndex: 3 }, 'pie francés y pie inglés: mismos nombres, distinta medida');
  note.style.whiteSpace = 'normal';
}

/* ======================================================================
   F · EN MEDIDAS INGLESAS… ENCOGE (24.85 – 27.6)  L4d
   ====================================================================== */
headline(24.85, 26.26, 'En medidas *inglesas*…', { size: 84, hlT: 25.68 });
headline(26.26, 27.6, 'parecía mucho más *bajo*', { size: 84, hlT: 27.11 });
{
  const FL = 1180, M = 400, HS = 1.68 * 2.54 / 2.707, tS = 26.26;
  const c = scene(24.85, 27.6, t => {
    const ks = p(t, tS, 0.45, E.outBack), sq = Math.sin(clamp((t - tS) / 0.45) * Math.PI) * 0.06;
    const sc = lerp(1, HS / 1.68, ks);
    set(nap.d, { s: sc, sx: 1 + sq, sy: 1 - sq, y: wobble(t, 0.6, 1.2) });
    nface(nap, t, { look: t < tS ? [0, -2] : [-3, -3], mouth: t > 26.6 ? 'W' : 'N', brow: t > 26.6 ? 6 : 0, sweat: t > 26.8, seed: 0.4 });
    R.setH(lerp(1.68, HS, ks));
    R.tag.textContent = t < tS ? '1,68 m' : '¡más bajo!'; set(R.tag, { r: -2, s: 1 + 0.2 * (t > tS ? 1 - p(t, tS + 0.1, 0.3, E.outBack) : 0), o: 1 });
    R.tag.style.background = t < tS ? YEL : PINK; R.tag.style.color = t < tS ? INK : '#fff';
    ghost.style.opacity = t > tS ? 0.3 : 0;
    const flipK = p(t, 25.68, 0.4, E.inOutCubic); const fsx = Math.max(0.02, Math.abs(Math.cos(Math.PI * flipK)));
    set(card, { sx: fsx, y: (1 - p(t, 24.9, 0.4, E.outBack)) * 600, r: 3 });
    cFr.style.display = flipK < 0.5 ? '' : 'none'; cEn.style.display = flipK >= 0.5 ? '' : 'none';
    set(arwD, { o: t > tS + 0.2 ? 1 : 0, y: Math.abs(Math.sin(t * 7)) * 10 });
  }, { cut: true });
  ground(c, FL - 6);
  const R = mkRuler(c, 130, FL, M, { arm: 330, top: 1.9, slZ: 2, z: 3 });
  const ghost = box(c, 0, 0, 1080, 1920, { zIndex: 3 }); { const k = 1.68 * M / HU; ghost.innerHTML = `<div style="position:absolute;left:${f1(450 - 160 * k)}px;top:${f1(FL - H1 * k)}px;width:${f1(320 * k)}px;height:${f1(820 * k)}px;filter:brightness(0)">${useSvg('napS', '0 0 320 820', 320, 820)}</div>`; }
  const nap = mkMan(c, 450, FL, 1.68, M, { seed: 1 }); nap.d.style.zIndex = 4;
  const card = box(c, 680, 640, 250, 250, { zIndex: 8 });
  const cFr = box(card, 0, 0, 250, 250, { background: INK, color: YEL, border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `8px 8px 0 ${SH}`, textAlign: 'center' });
  cFr.innerHTML = `<div style="font-family:Rye;font-size:26px;margin-top:20px">FRANCESAS</div><div style="font-family:Playfair;font-weight:900;font-size:58px;line-height:1.05;margin-top:16px">5 pieds<br>2 pouces</div>`;
  const cEn = box(card, 0, 0, 250, 250, { background: '#fff', color: INK, border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `8px 8px 0 ${SH}`, textAlign: 'center' });
  cEn.innerHTML = `<div style="font-family:Rye;font-size:26px;margin-top:20px;color:${RED}">INGLESAS</div><div style="font-family:Playfair;font-weight:900;font-size:66px;line-height:1.05;margin-top:16px">5 ft<br>2 in</div>`;
  const arwD = box(c, 420, 400, 70, 90, { zIndex: 9 }); arwD.innerHTML = arrowSvg('M35,6 L35,76 M10,52 L35,78 L60,52', PINK, 11);
}

/* ======================================================================
   G · DOS: LOS INGLESES — caricatura en el periódico (27.6 – 33.95)  L5
   ====================================================================== */
headline(27.6, 29.35, 'Dos: los *ingleses*', { size: 88, hlT: 28.63 });
cardsScene(27.6, 29.35, { flip: 2, tFlip: 27.71 });
headline(29.35, 31.7, 'Lo dibujaban *diminuto*', { size: 84, hlT: 31.02 });
headline(31.7, 32.46, 'y con *rabietas*', { size: 92, hlT: 31.76 });
headline(32.46, 33.95, 'Propaganda de *guerra*', { size: 88, hlT: 33.32 });
{
  const c = scene(29.35, 33.95, t => {
    set(np.wrap, { y: (1 - p(t, 29.38, 0.45, E.outBack)) * 1000, r: -2 + shake(t, 32.46, 0.35, 2) });
    const kd = p(t, 31.02, 0.4, E.outBack);
    const tantrum = t > 31.7;
    set(cari.d, { s: lerp(1, 0.5, kd), y: tantrum ? -Math.abs(Math.sin((t - 31.7) * 11)) * 40 : 0, r: tantrum ? Math.sin(t * 22) * 6 : 0 });
    cariAnim(cari, t, tantrum ? 1.4 : 0.4);
    set(stm, { o: tantrum ? 1 : 0, s: 0.4 + 0.08 * Math.sin(t * 18), y: tantrum ? -Math.abs(Math.sin((t - 31.7) * 11)) * 20 : 0 });
    set(grr, { s: pop(t, 31.8, 0.3) * (1 + 0.06 * Math.sin(t * 30)), o: t < 31.8 ? 0 : 1, r: -8 });
    popA(chC, t, 29.82, { r: -3 }); popA(chG, t, 30.4, { r: 2 });
    stampA(prop, t, 32.46, -14); prop.style.textShadow = glitch(t, 32.46, 0.3);
    set(hand, { x: (1 - p(t, 30.56, 0.4, E.outBack)) * 500, y: Math.sin(t * 16) * 6, r: -20 + Math.sin(t * 16) * 5, o: t > 30.5 && t < 31.6 ? 1 : 0 });
  });
  const np = paperPiece(c, 80, 420, 880, 630, { seed: 61, bg: '#EFE6D2' });
  const ni = np.inner;
  el('div', ni, { left: '0', top: '14px', width: '862px', textAlign: 'center', fontFamily: 'Rye', fontSize: '52px', color: INK, whiteSpace: 'nowrap' }, 'THE LONDON PRINT-SHOP');
  box(ni, 24, 92, 814, 6, { background: INK }); box(ni, 24, 104, 814, 2, { background: INK });
  const panel = box(ni, 30, 122, 470, 470, { background: '#F7F0E0', border: `5px solid ${INK}`, overflow: 'hidden' });
  box(panel, 0, 0, 460, 460, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  panel.innerHTML += `<svg width="460" height="460" style="position:absolute;left:0;top:0"><path d="M0,420 Q230,396 460,424 L460,460 L0,460 Z" fill="#d8c7a2" stroke="${INK}" stroke-width="4"/></svg>`;
  const cari = mkCari(panel, [80, 10, 300, 412]);
  const stm = steamPuffs(panel, 80, 150); stm.style.transformOrigin = '150px 200px';
  const grr = el('div', panel, { left: '250px', top: '70px', fontFamily: 'Rye', fontSize: '54px', color: RED, background: '#fff', border: `4px solid ${INK}`, borderRadius: '30px', padding: '4px 18px', zIndex: 8, whiteSpace: 'nowrap' }, '¡GRRR!');
  { let s = ''; for (let i = 0; i < 12; i++) s += `<path d="M524,${150 + i * 36} H${i % 4 === 3 ? 700 : 830}" stroke="${INK}" stroke-width="5" opacity=".5"/>`; box(ni, 0, 0, 862, 612).innerHTML = `<svg width="862" height="612">${s}</svg>`; }
  el('div', ni, { left: '524px', top: '590px', fontFamily: 'SpecialElite', fontSize: '22px', color: '#5a4a3a' }, '');
  const hand = box(c, 560, 640, 420, 140, { zIndex: 12 }); hand.innerHTML = `<svg viewBox="0 0 420 140" width="420" height="140" style="overflow:visible">${cut('<path d="M20,90 L250,40 L262,70 L34,120 Z"/><path d="M250,40 L410,30 L410,90 L262,70 Z"/>', 5, 7)}<path d="M20,90 L250,40 L262,70 L34,120 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M20,90 L4,104 L34,120 Z" fill="${INK}"/><path d="M250,40 L410,30 L410,90 L262,70 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><path d="M262,46 L262,70" stroke="${BRASS2}" stroke-width="6"/></svg>`;
  const chC = chip(c, 340, 1072, 'caricaturistas británicos', { size: 34, bg: INK, color: YEL });
  const chG = chip(c, 470, 1150, 'estilo James Gillray', { size: 30, bg: '#fff', color: INK });
  const prop = stamp(c, 140, 700, 'PROPAGANDA', { size: 100, bw: 13, z: 40, bg: 'rgba(255,255,255,.86)', blend: 'normal' });
}

/* ======================================================================
   H · TRES: SU MOTE — «le petit caporal» (33.95 – 39.15)  L6
   ====================================================================== */
headline(33.95, 35.28, 'Tres: su *mote*', { size: 92, hlT: 34.87 });
cardsScene(33.95, 35.28, { flip: 3, tFlip: 34.0 });
headline(35.28, 37.1, '«el *pequeño* cabo»', { size: 88, hlT: 36.05 });
headline(37.1, 39.15, 'una forma de *cariño*', { size: 88, hlT: 37.74 });
{
  const HT = [37.2, 37.35, 37.5, 37.74, 37.9, 38.05];
  const c = scene(35.28, 39.15, t => {
    set(pst.wrap, { y: (1 - p(t, 35.3, 0.45, E.outBack)) * -900, r: 1.5 + wobble(t, 0.4, 0.5) });
    hearts.forEach((h, i) => set(h.e, { s: pop(t, HT[i], 0.4) * (1 + 0.08 * Math.sin(t * 9 + i)), o: t < HT[i] ? 0 : 1, y: -Math.max(0, t - HT[i]) * 30, r: h.r }));
    popA(chT, t, 36.05, { r: -2 });
    popA(wM, t, 36.5, { rise: 30 });
    stk.style.transform = `scaleX(${f1(p(t, 37.55, 0.25) * 1000) / 1000}) rotate(-4deg)`;
    popA(wC, t, 37.74, { r: -4 });
    stampA(xx, t, 38.58, 0, 1);
    set(med, { s: 1 + 0.03 * Math.sin(t * 3) });
  });
  const pst = paperPiece(c, 150, 400, 780, 600, { seed: 88, bg: '#F7EEDB' });
  const pi = pst.inner;
  box(pi, 14, 14, 734, 554, { border: `4px solid ${INK}`, outline: `2px solid ${INK}`, outlineOffset: '-12px' });
  const med = box(pi, 251, 40, 260, 300, { borderRadius: '50%', overflow: 'hidden', background: '#F4CFDA', border: `8px solid ${BRASS2}`, outline: `4px solid ${INK}` });
  med.innerHTML = useSvg('napS', '70 30 180 230', 320, 820);
  const ttlP = el('div', pi, { left: '0', top: '362px', width: '762px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '84px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' }, '« le petit caporal »');
  el('div', pi, { left: '0', top: '470px', width: '762px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '32px', color: '#5a4a3a', letterSpacing: '0.2em' }, '♥  VIVE L’EMPEREUR  ♥');
  const hearts = [[110, 470, -14], [800, 440, 12], [70, 760, -8], [840, 760, 16], [210, 330, 6], [760, 960, -10]].map(q => ({ e: box(c, q[0], q[1], 110, 102, { zIndex: 12 }, heartSvg(q[2] > 0 ? PINK : RED)), r: q[2] }));
  const chT = chip(c, 340, 1020, '= «el pequeño cabo»', { size: 36, bg: INK, color: YEL });
  const wM = el('div', c, { left: '340px', top: '1110px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '64px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, '¿medida?');
  const stk = box(wM, -10, 38, 290, 14, { background: RED, borderRadius: '7px', transformOrigin: 'left center' });
  const wC = el('div', c, { left: '650px', top: '1100px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '72px', color: PINK, textShadow: `3px 3px 0 ${INK}`, zIndex: 11, whiteSpace: 'nowrap' }, 'cariño ♥');
  const xx = box(c, 420, 1096, 110, 110, { zIndex: 12 }, XSVG);
}

/* ======================================================================
   I · LA GUARDIA: soldados escogidos por ser altos (39.15 – 46.5)  L7
   ====================================================================== */
headline(39.15, 41.6, 'Rodeado de su *guardia*', { size: 86, hlT: 41.07 });
headline(41.6, 45.0, 'escogidos… por ser *altos*', { size: 82, hlT: 44.35 });
headline(45.0, 46.5, 'Al lado de *ellos*…', { size: 88, hlT: 46.12 });
{
  const FL = 1150, M = 310, GH = 1.86;
  const GX = [190, 345, 735, 890];
  const c = scene(39.15, 46.5, t => {
    const kz = p(t, 45.08, 0.6, E.inOutCubic);
    set(cam, { s: 1 + 0.45 * kz + 0.02 * p(t, 39.15, 6, E.linear) });
    grens.forEach((g, i) => {
      const k = p(t, 39.75 + (i % 2) * 0.15, 0.7, E.outCubic), dir = i < 2 ? -1 : 1;
      const march = k < 1 ? Math.abs(Math.sin((t - 39.75) * 12)) * 14 : 0;
      set(g.d, { x: dir * (1 - k) * 700, y: -march });
      nface(g, t, { look: [i < 2 ? 2 : -2, 0], seed: i * 0.9, mouth: 'N', brow: t > 44.3 && t < 45 ? -4 : 0 });
    });
    nface(nap, t, { look: kz > 0.3 ? [Math.sin(t * 3) > 0 ? -3 : 3, -4] : [0, -2], mouth: kz > 0.4 ? 'W' : 'S', brow: kz > 0.3 ? 6 : 0, sweat: t > 45.6, seed: 0.2 });
    set(nap.d, { y: wobble(t, 0.6, 1.2) });
    popA(chG, t, 41.07, { r: -3, o: 1 - p(t, 44.9, 0.2) });
    set(lst, { y: (1 - p(t, 41.7, 0.45, E.outBack)) * 400, o: t > 41.65 ? 1 : 0, r: 2 });
    popA(r1, t, 42.11, { rise: 20 }); popA(r2, t, 43.07, { rise: 20 }); popA(r3, t, 44.35, { rise: 20, s: 1 + 0.1 * (1 - p(t, 44.6, 0.3)) });
    paint(rHL, t, 44.4, 0.3);
    hl.style.transform = `scaleX(${f1(p(t, 44.4, 0.45, E.outCubic) * 1000) / 1000})`;
    // cameo del emú con gorro de piel de oso
    const up = p(t, 42.85, 0.3, E.outBack) * (1 - p(t, 44.0, 0.25, E.inCubic));
    set(emu.d, { y: (1 - up) * 340, o: up > 0.02 ? 1 : 0 });
    face(emu, t, { look: t > 43.25 && t < 43.95 ? [0, 2] : [-8, 0], blink: false, half: !(t > 43.25 && t < 43.95), bR: t > 43.35 && t < 43.95 ? 16 * p(t, 43.35, 0.12, E.outBack) : 0, bL: 0, jaw: 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 700px' });
  sceneBg(cam, { background: '#E4D6B8' });
  { const d = box(cam, 0, 0, 1080, 1920); let s = ''; for (let x = 0; x < 1080; x += 120) s += `<rect x="${x + 10}" y="300" width="100" height="760" fill="none" stroke="${INK}" stroke-width="2" opacity=".18"/>`; d.innerHTML = `<svg width="1080" height="1920">${s}<path d="M0,1060 H1080" stroke="${INK}" stroke-width="3" opacity=".3"/></svg>`; }
  ground(cam, FL - 6);
  const emu = mk(cam, [700, 330, 220, 330], emuFrontInner() + emuBearskin(), '0 0 400 600', 'emuF'); emu.d.style.zIndex = 2;
  const grens = GX.map((x, i) => { const g = mkMan(cam, x, FL, GH + (i % 2 ? 0.02 : 0), M, { hat: 'bearskin', pose: 'musket', moustache: true, belts: true, epaul: true, lapel: '#fff', gaiters: true, seed: 4 + i }); g.d.style.zIndex = 3; return g; });
  const nap = mkMan(cam, 540, FL, 1.68, M, { seed: 1 }); nap.d.style.zIndex = 4;
  const hl = box(cam, 60, FL - GH * M - 3, 960, 6, { zIndex: 5, transformOrigin: 'left center', backgroundImage: `repeating-linear-gradient(90deg, ${PINK} 0 22px, transparent 22px 34px)` });
  const chG = chip(cam, 360, 400, 'su Guardia', { size: 40, bg: INK, color: YEL });
  const lst = box(c, 430, 1170, 500, 170, { background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `7px 7px 0 ${SH}`, zIndex: 20 });
  el('div', lst, { left: '20px', top: '8px', fontFamily: 'Rye', fontSize: '28px', color: RED }, 'ESCOGIDOS POR:');
  const r1 = el('div', lst, { left: '24px', top: '52px', fontFamily: 'SpecialElite', fontSize: '32px', color: INK, whiteSpace: 'nowrap' }, '✓ …entre otras cosas');
  const r2 = el('div', lst, { left: '300px', top: '52px', fontFamily: 'SpecialElite', fontSize: '32px', color: INK }, '');
  const r3 = el('div', lst, { left: '24px', top: '98px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '44px', color: INK, whiteSpace: 'nowrap' }, `✓ ser ${hlSpan('ALTOS', 'rhl')}`);
  const rHL = r3.querySelector('.rhl');
}
/* golpe de color rosa: cualquiera parece pequeño (46.5 – 48.2) */
colorHit(46.5, 48.2, PINK, c => {
  const FL = 1240, M = 380, GH = 1.86;
  [150, 320, 760, 930].forEach((x, i) => { const g = mkMan(c, x, FL, GH, M, { hat: 'bearskin', pose: 'musket', belts: true, epaul: true, gaiters: true }); g.d.style.filter = SIL; g.d.style.zIndex = 3; });
  const n = mkMan(c, 540, FL, 1.68, M, {}); n.d.style.filter = SIL; n.d.style.zIndex = 3;
  const t1 = el('div', c, { left: '0', top: '190px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '86px', lineHeight: 1, color: INK, zIndex: 5 }, 'cualquiera parece');
  const t2 = el('div', c, { left: '0', top: '290px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: '#fff', zIndex: 5, textShadow: `6px 6px 0 ${INK}` }, 'PEQUEÑO');
  return t => {
    set(t1, { s: lerp(1.3, 1, p(t, 46.5, 0.2)), o: 1 });
    set(t2, { s: pop(t, 47.52, 0.35), o: t < 47.52 ? 0 : 1 }); t2.style.textShadow = glitch(t, 47.52, 0.3) || `6px 6px 0 ${INK}`;
    set(n.d, { sy: 1 - 0.04 * Math.abs(Math.sin((t - 46.5) * 5)) });
  };
});

/* ======================================================================
   J · ¡OJO! estatura normal… con muy mala prensa (48.2 – 54.35)  L8
   ====================================================================== */
headline(48.6, 50.33, 'No era ningún *gigante*', { size: 84, hlT: 49.68 });
headline(50.33, 52.35, 'Estatura *normal*', { size: 92, hlT: 51.69 });
headline(52.35, 54.35, 'con muy *mala prensa*', { size: 88, hlT: 53.44 });
{
  const FL = 1180, M = 380, NT = [52.4, 52.8, 53.24, 53.44, 53.66];
  const c = scene(48.2, 54.35, t => {
    const ko = p(t, 48.7, 0.35, E.inOutCubic);
    if (t < 48.2) set(ojo, { o: 0 }); else set(ojo, { s: lerp(2.3, 1, p(t, 48.2, 0.18)) * lerp(1, 0.4, ko), x: ko * 330, y: ko * -290, r: -8, o: 0.97 });
    set(giant.d || giant, { o: t < 48.85 ? 0 : 0.22 * (1 - p(t, 50.3, 0.25)), y: (1 - p(t, 48.85, 0.4, E.outCubic)) * 200 });
    stampA(gx, t, 49.68, 0, 1); if (t > 50.3) gx.style.opacity = 1 - p(t, 50.3, 0.25);
    const plk = p(t, 51.29, 0.45, E.outBack);
    set(plac, { y: (1 - plk) * -600, r: -4 + (1 - plk) * 20, o: t < 51.25 ? 0 : 1 });
    set(okc, { s: pop(t, 51.69, 0.35), o: t < 51.69 ? 0 : 1 });
    const pressed = t > 52.4;
    nface(nap, t, { look: pressed ? [Math.sin(t * 5) * 3, -2] : [0, -2], mouth: pressed ? 'W' : (t > 51.6 ? 'S' : 'N'), brow: pressed ? 7 : 0, sweat: t > 52.7, seed: 0.5 });
    set(nap.d, { y: wobble(t, 0.6, 1.2), r: pressed ? Math.sin(t * 9) * 1 : 0 });
    papers.forEach((q, i) => { const k = p(t, NT[i], 0.3, E.outBack); set(q.e, { x: lerp(q.fx, 0, k), y: lerp(q.fy, 0, k), r: lerp(q.r * 4, q.r, k), s: lerp(1.4, 1, k), o: t < NT[i] ? 0 : 1 }); });
    R.setH(1.68); R.tag.textContent = '≈ 1,68 m'; set(R.tag, { r: -2, o: t > 50.37 ? 1 : 0, s: pop(t, 50.37, 0.4) });
  });
  ground(c, FL - 6);
  const R = mkRuler(c, 90, FL, M, { arm: 330, top: 1.9, slZ: 2, z: 3, tagSize: 46 });
  const giant = box(c, 520, 160, 420, 1076, { zIndex: 2, filter: 'brightness(0)' }, useSvg('grenS', '0 -60 320 880', 320, 820));
  const gx = box(c, 600, 520, 260, 260, { zIndex: 9 }, XSVG);
  const nap = mkMan(c, 400, FL, 1.68, M, { seed: 1 }); nap.d.style.zIndex = 5;
  const plac = box(c, 640, 680, 300, 520, { zIndex: 6 });
  plac.innerHTML = `<svg width="300" height="520" style="overflow:visible"><rect x="140" y="150" width="20" height="360" fill="${WOOD}" stroke="${INK}" stroke-width="4"/>${cut('<rect x="10" y="10" width="280" height="170" rx="14"/>')}<rect x="10" y="10" width="280" height="170" rx="14" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><text x="150" y="78" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="800" font-size="44" fill="${INK}">estatura</text><text x="150" y="146" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="58" fill="${INK}">NORMAL</text></svg>`;
  const okc = box(c, 860, 640, 110, 110, { zIndex: 7 }); okc.innerHTML = `<div style="position:absolute;inset:0;background:${YEL};border:5px solid ${INK};border-radius:50%"></div><div style="position:absolute;left:18px;top:18px;width:74px;height:74px">${CHECK}</div>`;
  const ojo = stamp(c, 300, 620, '¡OJO!', { size: 170, bw: 15, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const papers = [['¡BAJITO!', 60, 400, -10, -600, -200], ['¡DIMINUTO!', 520, 470, 8, 700, -300], ['¡RABIETAS!', 100, 850, -6, -600, 300], ['¡BAJITO!', 630, 960, 7, 700, 300], ['¡BAJITO!', 360, 1010, -3, 0, 900]].map((q, i) => ({ e: newspaperSmall(c, q[1], q[2], 270, 190, q[0], 300 + i), r: q[3], fx: q[4], fy: q[5] }));
  papers.forEach(q => q.e.style.zIndex = 20);
}

/* ======================================================================
   K · LA PROPAGANDA TODAVÍA FUNCIONA — museo (54.35 – 59.5)  L9
   ====================================================================== */
{
  const c = scene(54.35, 59.5, t => {
    set(cam, { s: 1 + 0.06 * p(t, 54.35, 5, E.linear) });
    set(fr, { y: (1 - p(t, 54.4, 0.5, E.outBack)) * 900 });
    cariAnim(cari, t, 0.6); set(cari.d, { y: -Math.abs(Math.sin(t * 7)) * 10 });
    popA(L1, t, 55.61, { rise: 40 }); popA(L2, t, 57.61, { rise: 40 });
    set(L3, { s: lerp(2, 1, p(t, 58.05, 0.2, E.outCubic)), r: -3, o: t < 58.05 ? 0 : 1 }); L3.style.textShadow = glitch(t, 58.05, 0.35) || `7px 7px 0 ${INK}`;
    paint(l3hl, t, 58.2, 0.35);
    popA(chB, t, 56.75, { r: 4 });
    popA(plq, t, 55.0, { rise: 20 });
    fl.style.opacity = t > 58.1 && t < 58.32 ? (1 - (t - 58.1) / 0.22) * 0.85 : 0;
    set(spot, { o: 0.9 + 0.1 * Math.sin(t * 2) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px' });
  sceneBg(cam, { background: '#7a2e34', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.10) 0 40px, transparent 40px 80px)' });
  box(cam, 0, 1180, 1080, 740, { background: '#4a2a17', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 4px, transparent 4px 140px)', borderTop: `8px solid ${INK}` });
  box(cam, 0, 1080, 1080, 100, { background: '#5a2026', borderTop: `6px solid ${BRASS2}` });
  const spot = box(cam, 160, 560, 760, 700, { background: 'radial-gradient(ellipse at 50% 40%, rgba(255,240,200,.45), rgba(255,240,200,0) 65%)' });
  const fr = box(cam, 250, 610, 580, 470, { zIndex: 3 });
  fr.innerHTML = `<div style="position:absolute;left:0;top:0;width:580px;height:470px;background:${BRASS2};border:6px solid ${INK};box-shadow:12px 14px 0 rgba(0,0,0,.4);background-image:repeating-linear-gradient(45deg, rgba(43,33,24,.25) 0 2px, transparent 2px 8px)"></div><div style="position:absolute;left:34px;top:34px;width:512px;height:402px;background:#F3E6C4;border:5px solid ${INK};overflow:hidden"></div>`;
  const inner = fr.children[1];
  inner.innerHTML = `<svg width="512" height="402" style="position:absolute;left:0;top:0"><path d="M0,360 Q256,340 512,364 L512,402 L0,402 Z" fill="#d8c7a2" stroke="${INK}" stroke-width="4"/></svg>`;
  const cari = mkCari(inner, [146, 60, 220, 302]);
  const plq = el('div', cam, { left: '360px', top: '1104px', width: '360px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '24px', lineHeight: 1.15, color: INK, background: BRASS2, border: `4px solid ${INK}`, borderRadius: '6px', padding: '6px 8px', zIndex: 4 }, 'Caricatura británica de la época');
  { const d = box(cam, 0, 0, 1080, 1920, { zIndex: 5 }); let s = ''; [420, 640, 860].forEach(x => s += `<rect x="${x - 8}" y="1180" width="16" height="140" fill="${BRASS2}" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="1176" r="16" fill="${BRASS2}" stroke="${INK}" stroke-width="4"/>`); d.innerHTML = `<svg width="1080" height="1920"><path d="M420,1190 Q530,1250 640,1190 Q750,1250 860,1190" stroke="#8a1a24" stroke-width="16" fill="none"/>${s}</svg>`; }
  const L1 = el('div', c, { left: '0', top: '180px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '104px', lineHeight: 1, color: '#fff', textShadow: `5px 5px 0 ${INK}`, zIndex: 20 }, 'la propaganda');
  const L2 = el('div', c, { left: '0', top: '300px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '96px', lineHeight: 1, color: '#fff', textShadow: `5px 5px 0 ${INK}`, zIndex: 20 }, 'todavía');
  const L3 = el('div', c, { left: '0', top: '410px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 21 }, hlSpan('FUNCIONA', 'l3h'));
  L3.style.color = '#fff';
  const l3hl = L3.querySelector('.l3h'); l3hl.style.background = PINK;
  const chB = chip(c, 640, 600, 'fue tan buena…', { size: 38, bg: YEL, color: INK, z: 22 });
  const fl = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 30 });
}

/* ======================================================================
   L · CTA: ¿quién más tiene fama injusta? (59.5 – 63.55)  L10
   ====================================================================== */
headline(59.5, 62.86, '¿Qué otro personaje tiene *fama injusta*?', { size: 72, hlT: 61.46 });
headline(62.86, 63.55, 'Os *leo*', { size: 100, hlT: 63.03 });
{
  const CM = [];
  const c = scene(59.5, 63.55, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 59.5, 4, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < 61.0 ? [0, 0] : [-4, 6], bL: t > 61.4 && t < 62.2 ? 10 : 2, bR: t > 61.4 && t < 62.2 ? 14 : 6, noCup: true, fan: wobble(t, 0.9, 6), seed: 2 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    cariAnim(cf, t, 0.5);
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const frm = box(c, 660, 440, 260, 320, { border: `14px solid ${BRASS2}`, outline: `4px solid ${INK}`, background: PAPER, boxShadow: `8px 8px 0 ${SH}`, overflow: 'hidden' });
  const cf = mkCari(frm, [30, 20, 180, 248]);
  const vec = mkVec(c, [60, 420, 640, 793]);
  const cms = [['FAR', '@lola_historia', '¡Haz uno de Cleopatra!', 61.0], ['SOL', '@uno_sesenta_y_ocho', 'yo mido 1,68 y me siento atacado 😂', 61.75], ['MINISTRO', '@curioso_del_quinto', '¡Más mitos así, porfa!', 62.5]];
  cms.forEach((m, i) => {
    const e = box(c, 250 - (i % 2) * 20, 950 + i * 116, 690, 100, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 78, m[0], { bw: 3 });
    el('div', e, { left: '102px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '102px', top: '40px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: i === 1 ? '28px' : '31px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   M · Y ESTO… NO VENÍA EN EL LIBRO (63.55 – 66.2)  L11
   ====================================================================== */
headline(63.55, 64.87, 'Y esto…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(64.87, 66.2, '…no venía en el *libro*.', { size: 84, hlT: 65.5 });
{
  const c = scene(63.55, 64.87, t => {
    const k = p(t, 63.55, 1.2, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const tC = 65.18, tS = 65.5;
  const c = scene(64.87, 66.2, t => {
    const k = p(t, tC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > tS - 0.02;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    cariAnim(stand, t, 1.2); set(stand.d, { y: -Math.abs(Math.sin(t * 10)) * 20 });
    set(bookW, { s: 1.25 * pop(t, 64.88, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, tS, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#cariS" x="280" y="560" width="220" height="302"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">GRANDES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">emperadores</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const stand = mkCari(bookW, [640, 640, 220, 302]); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '540px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
}

/* ======================================================================
   TARJETA FINAL (66.2 – fin)
   ====================================================================== */
{
  const c = scene(66.2, 999, t => {
    set(lt, { s: pop(t, 66.25, 0.45), o: t < 66.25 ? 0 : 1 }); paint(lhl, t, 66.55, 0.4);
    popA(ttl, t, 66.6, { r: -1 }); popA(src, t, 66.85, { rise: 30 });
    set(nap.d, { x: (1 - p(t, 67.3, 0.45, E.outBack)) * 400, y: wobble(t, 0.6, 2) });
    nface(nap, t, { look: [-4, 0], mouth: 'S', brow: Math.sin(t * 3) > 0.6 ? 6 : 0, seed: 0.1 });
  }, { cut: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const lt = box(c, 40, 800, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1050px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '54px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 4 · Napoleón no era bajito');
  const src = el('div', c, { left: '90px', top: '1170px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: informe de la autopsia de Napoleón (1821) · caricaturas británicas de la época (James Gillray)');
  const nap = mkMan(c, 820, 790, 1.68, 200, { seed: 1 }); nap.d.style.zIndex = 2;
}
