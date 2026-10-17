/* ======================================================================
   S0 · GANCHO (0 – 5.35)  L0 — astronauta con prismáticos, la muralla como un hilo
   ====================================================================== */
headline(-1, T(2.88), 'La Gran Muralla *NO* se ve desde el espacio', Object.assign({ size: 86, y: 200 }, DARK, { keyColor: YEL }));
HLS[HLS.length - 1].spans.forEach(s => s.t = -1);
headline(T(2.88), T(5.35), '…y el primer *astronauta chino* lo confirmó', Object.assign({ size: 68, y: 200 }, DARK));
{
  const c = scene(-1, T(5.35), t => {
    set(cam, { s: 1 + 0.06 * p(t, 0, 5.3, E.linear) });
    set(stars, { x: -t * 6 });
    set(earth.d, { r: t * 0.8 });
    set(ship, { y: wobble(t, 0.35, 6), r: wobble(t, 0.25, 0.8) });
    const down = p(t, T(3.45), 0.35, E.inOutCubic);
    astro.binos.setAttribute('transform', `translate(${f1(-down * 30)},${f1(down * 150)}) rotate(${f1(-down * 18)} 150 260)`);
    face(astro, t, { look: down > 0.5 ? [0, 0] : [-5, 5], bL: 0, brow: down > 0.5 ? -10 : 0, jaw: down > 0.5 ? 0.25 + Math.abs(Math.sin(t * 7)) * 0.2 : 0, seed: 0.7 });
    set(astro.d, { r: wobble(t, 0.3, 2), y: wobble(t, 0.45, 5) });
    qm.forEach((q, i) => { const tq = T(3.9) + i * 0.22; set(q, { s: pop(t, tq, 0.4), y: Math.sin(t * 5 + i) * 8, r: (i - 1) * 14, o: t < tq ? 0 : 1 }); });
    set(thread, { o: 0.75 + 0.25 * Math.sin(t * 9) });
    const kc = pop(t, -0.5, 0.45); set(chipW, { s: kc, r: -4, o: 1 });
    const ka = p(t, -0.5, 0.35); arw.style.clipPath = `inset(0 0 ${f1((1 - ka) * 100)}% 0)`;
    set(ring, { s: 1 + 0.08 * Math.sin(t * 6), o: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: SKY });
  const stars = box(c, 0, 0, 1200, 1920, { zIndex: 0 }); stars.innerHTML = starsSvg(8, 120);
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '560px 900px' });
  const earth = mk(cam, [-330, 860, 1740, 1740], earthInner({ seed: 41 }), '0 0 400 400', 'earth');
  // tierra firme con la muralla-hilo
  const land = box(cam, 0, 0, 1080, 1920); {
    const r = rng(5); const pts = []; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, rr = 1 + (r() - .5) * .35; pts.push([600 + Math.cos(a) * 300 * rr, 1110 + Math.sin(a) * 140 * rr]); }
    const lp = smooth(pts);
    land.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut(P(lp), 6, 8)}<path d="${lp}" fill="${SAND}" stroke="${INK}" stroke-width="4"/><path d="${lp}" fill="url(#hP)"/>${clipG(uid('ld'), lp, '<rect x="300" y="1110" width="700" height="200" fill="url(#hA)" opacity=".4"/>')}
    <path d="M470,1160 q30,-16 50,-4 t46,-12 t50,4 t44,-16 t40,8" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round" class="thr"/></svg>`;
  }
  const thread = land.querySelector('.thr');
  const ring = box(cam, 440, 1100, 330, 110, { border: `5px dashed ${PINK}`, borderRadius: '50%', zIndex: 3 });
  const chipW = chip(cam, 610, 1222, 'la muralla', { size: 36, bg: PINK });
  const arw = box(cam, 560, 1180, 80, 60, { zIndex: 21 }); arw.innerHTML = arrowSvg('M50,50 L20,8 M20,8 L20,30 M20,8 L40,14', PINK, 7);
  // nave + ojo de buey
  const ship = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  {
    const hull = 'M300,470 Q420,410 1120,420 L1120,960 Q620,990 380,900 Q280,820 300,470 Z';
    let riv = ''; for (let k = 0; k < 16; k++) riv += `<circle cx="${380 + k * 48}" cy="${448 - Math.max(0, 6 - k) * 4}" r="6" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`;
    ship.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut(P(hull))}<path d="${hull}" fill="#9a958c" stroke="${INK}" stroke-width="6"/>${clipG(uid('hl'), hull, `<rect x="280" y="400" width="900" height="600" fill="url(#hW)" opacity=".35"/><rect x="820" y="400" width="300" height="600" fill="url(#hA)"/><path d="M300,560 Q700,520 1120,540 M330,820 Q700,860 1120,850" stroke="${INK}" stroke-width="4" fill="none"/>`)}${riv}
    <circle cx="700" cy="680" r="228" fill="#fff"/><circle cx="700" cy="680" r="214" fill="${INK}"/><circle cx="700" cy="680" r="200" fill="${BRASS}"/><circle cx="700" cy="680" r="200" fill="url(#hA)" opacity=".5"/>
    ${[...Array(12)].map((_, k) => { const a = k / 12 * Math.PI * 2; return `<circle cx="${f1(700 + Math.cos(a) * 190)}" cy="${f1(680 + Math.sin(a) * 190)}" r="7" fill="${INK}"/>`; }).join('')}</svg>`;
  }
  const port = box(ship, 518, 498, 364, 364, { borderRadius: '50%', overflow: 'hidden', background: '#2a3346', border: `6px solid ${INK}` });
  box(port, 0, 0, 364, 364, { background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,.25), rgba(0,0,0,.35) 80%)' });
  const astro = mk(port, [-56, -60, 470, 600], astroInner({ bowl: true, binos: true, seed: 3 }), '0 0 360 460', 'bust');
  astro.binos = astro.d.querySelector('.binos');
  box(port, 0, 0, 364, 364, { background: 'linear-gradient(130deg, rgba(255,255,255,.28) 0 18%, rgba(255,255,255,0) 30%)', zIndex: 3 });
  const qm = ['?', '¿?', '?'].map((s, i) => el('div', ship, { left: px([420, 900, 860][i]), top: px([560, 470, 700][i]), fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', color: YEL, textShadow: `4px 4px 0 ${INK}`, zIndex: 6 }, s));
}

/* ======================================================================
   S1 · EL LIBRO DE TEXTO (5.35 – 8.45)  L1 — frase tachada + sello MITO
   ====================================================================== */
headline(T(5.35), T(7.72), 'Ese dato que te *enseñaron…*', { size: 84, hlT: T(6.15), color: PAPER, shadow: `4px 4px 0 ${INK}` });
headline(T(7.72), T(11.95), '…es *falso.*', { size: 120, hlT: T(7.9), hlc: PINK, color: PAPER, shadow: `5px 5px 0 ${INK}` });
{
  const c = scene(T(5.35), T(11.95), t => {
    const kz = p(t, T(5.4), 2.4, E.inOutCubic);
    set(bk.d, { s: lerp(0.92, 1.12, kz) * (t > T(7.95) ? 1 + 0.04 * (1 - p(t, T(7.95), 0.3)) : 1), r: lerp(-5, -2, kz), y: lerp(60, 0, kz), o: 1 });
    hl.setAttribute('width', f1(p(t, T(6.15), 0.6, E.inOutCubic) * 350));
    reveal(strike, sL, p(t, T(7.88), 0.25, E.linear));
    stampA(mito, t, T(7.95), -12);
    set(apple, { s: pop(t, T(5.5), 0.45), r: wobble(t, 0.6, 4), o: t < T(5.5) ? 0 : 1 });
    set(stud, { s: pop(t, T(6.15), 0.45), r: 6, o: t < T(6.15) ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#2F4A3A', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 2px, transparent 2px 9px)' });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.12), rgba(0,0,0,.45) 80%)' });
  el('div', c, { left: '90px', top: '1180px', fontFamily: 'SpecialElite', fontSize: '42px', color: 'rgba(255,255,255,.55)', transform: 'rotate(-3deg)', whiteSpace: 'nowrap' }, 'Tema 7 · Las maravillas de Asia');
  const bk = mk(c, [90, 470, 900, 620], textbookInner(), '0 0 900 640', 'book'); bk.d.style.transformOrigin = '700px 230px';
  const svgB = bk.d.querySelector('svg');
  const hl = document.createElementNS(NS, 'rect'); hl.setAttribute('x', 492); hl.setAttribute('y', 186); hl.setAttribute('height', 80); hl.setAttribute('width', 0); hl.setAttribute('fill', YEL); hl.setAttribute('opacity', '.75'); hl.style.mixBlendMode = 'multiply';
  svgB.insertBefore(hl, svgB.querySelector('text[y="214"]'));
  const strike = bk.d.querySelector('.strike'); const sL = pathLen(strike) + 10;
  const apple = box(c, 820, 1130, 150, 160, { zIndex: 5 }); apple.innerHTML = `<svg viewBox="0 0 150 160" width="150" height="160" style="overflow:visible">${cut('<path d="M75,40 C30,20 0,60 14,104 C28,150 60,156 75,144 C90,156 122,150 136,104 C150,60 120,20 75,40 Z"/>')}<path d="M75,40 C30,20 0,60 14,104 C28,150 60,156 75,144 C90,156 122,150 136,104 C150,60 120,20 75,40 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M90,50 C130,40 140,100 120,130" stroke="none" fill="url(#hA)"/><path d="M40,60 q-10,20 -6,40" stroke="#fff" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/><path d="M75,40 Q74,20 84,6" stroke="${INK}" stroke-width="6" fill="none"/><path d="M80,22 Q104,4 122,16 Q100,30 80,22 Z" fill="#7a9a52" stroke="${INK}" stroke-width="3"/></svg>`;
  const stud = chip(c, 560, 1080, 'lo que dice el libro', { size: 34, bg: '#fff', color: INK });
  const mito = stamp(c, 330, 860, 'MITO', { size: 190, bw: 16, z: 60, bg: 'rgba(255,255,255,.88)', blend: 'normal' });
}

/* ======================================================================
   S3a · LARGUÍSIMA: MILES DE KM (11.95 – 15.38)  L3a
   ====================================================================== */
headline(T(11.95), T(13.86), 'La muralla es *larguísima*', { size: 86, hlT: T(12.7) });
headline(T(13.86), T(15.38), '*miles* de kilómetros', { size: 96, hlT: T(13.95) });
{
  const WP = 'M60,1300 C200,1250 430,1170 380,1070 S290,940 460,890 S640,820 600,750 S690,650 800,620 S960,575 1140,530';
  const c = scene(T(11.95), T(15.38), t => {
    set(cam, { s: lerp(1.14, 1, p(t, T(11.95), 3.4, E.outCubic)) });
    const k = p(t, T(12.7), 2.5, E.inOutCubic);
    reveal(tape, tL, k);
    const pt = tape.getPointAtLength(Math.max(1, tL * k)), pt0 = tape.getPointAtLength(Math.max(0, tL * k - 6));
    set(head, { x: pt.x - 30, y: pt.y - 30, r: Math.atan2(pt.y - pt0.y, pt.x - pt0.x) * 180 / Math.PI, o: k > 0.01 && k < 0.995 ? 1 : 0 });
    // contador
    const rolling = t < T(13.95);
    digs.forEach((d, i) => { d.textContent = '?'; set(d, { y: Math.sin(t * 40 + i) * 3 }); d.style.visibility = rolling ? 'visible' : 'hidden'; });
    set(odo, { s: pop(t, T(12.05), 0.45) * (rolling ? 1 : 1 + 0.12 * (1 - p(t, T(13.95), 0.3))), r: -2, o: t < T(12.05) ? 0 : 1 });
    set(mil, { s: rolling ? 0 : pop(t, T(13.93), 0.4), o: rolling ? 0 : 1 });
    set(lbl, { o: t > T(15.0) ? 1 : 0, s: pop(t, T(15.0), 0.3) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1E6CC' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  const land = box(cam, 0, 0, 1080, 1920);
  let walls = '';
  [[1100, 1960, 34], [900, 1100, 22], [700, 900, 14], [0, 700, 8]].forEach(([y0, y1, w], i) => { walls += clipG(uid('wb'), `M-100,${y0} H1200 V${y1} H-100 Z`, wallStroke(WP, w)); });
  let tws = '';
  land.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><circle cx="840" cy="520" r="80" fill="${YEL}" stroke="${INK}" stroke-width="5"/>${ridge(11, 640, 120, 11, '#E7D8B6')}${ridge(12, 860, 190, 8, '#DDC9A0')}${ridge(13, 1110, 230, 6, '#D2BB8E')}${ridge(14, 1330, 120, 5, '#C8AF80')}${walls}<g class="tws"></g><path class="tape" d="${WP}" stroke="${INK}" stroke-width="15" fill="none" stroke-linecap="round" transform="translate(0,-46)"/><path class="tape2" d="${WP}" stroke="${PINK}" stroke-width="8" fill="none" stroke-linecap="round" transform="translate(0,-46)"/></svg>`;
  const wpEl = document.createElementNS(NS, 'path'); wpEl.setAttribute('d', WP); land.querySelector('svg').appendChild(wpEl); wpEl.setAttribute('fill', 'none');
  const WL = wpEl.getTotalLength();
  [0.12, 0.3, 0.47, 0.62, 0.76, 0.9].forEach(u => { const q = wpEl.getPointAtLength(WL * u); const s = q.y > 1100 ? 1.3 : q.y > 900 ? 0.95 : q.y > 700 ? 0.62 : 0.4; tws += towerSvg(q.x, q.y + 6 * s, s); });
  land.querySelector('.tws').innerHTML = tws;
  const tape = land.querySelector('.tape2'), tapeO = land.querySelector('.tape'); const tL = pathLen(tape) + 6;
  const _r = tape.setAttribute.bind(tape); tape.setAttribute = (a, v) => { _r(a, v); if (a.startsWith('stroke-dash')) tapeO.setAttribute(a, v); };
  const head = box(cam, 0, -46, 60, 60, { zIndex: 5 }); head.innerHTML = `<svg width="60" height="60" style="overflow:visible"><path d="M14,8 L54,30 L14,52 Z" fill="${PINK}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`;
  const odo = box(c, 230, 470, 620, 150, { zIndex: 30, background: INK, border: `6px solid ${BRASS}`, borderRadius: '22px', boxShadow: `8px 10px 0 ${SH}` });
  el('div', odo, { left: '22px', top: '10px', fontFamily: 'Rye', fontSize: '28px', color: BRASS, whiteSpace: 'nowrap' }, 'LONGITUD');
  const digs = []; for (let i = 0; i < 5; i++) { const d = box(odo, 200 + i * 78, 22, 64, 96, { background: '#F7F0E0', border: `4px solid ${BRASS}`, borderRadius: '8px', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '70px', lineHeight: '90px', textAlign: 'center', color: INK }); digs.push(d); }
  el('div', odo, { left: '22px', top: '58px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '54px', color: PAPER }, 'km');
  const mil = el('div', odo, { left: '160px', top: '8px', width: '440px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '96px', lineHeight: '120px', color: YEL, whiteSpace: 'nowrap' }, 'MILES');
  const lbl = chip(c, 640, 640, 'y sigue… →', { size: 36, bg: PINK });
}

/* ======================================================================
   S3b · PERO ESTRECHA (15.38 – 19.4)  L3b — sección + regla + cameo del emú
   ====================================================================== */
headline(T(15.38), T(17.6), 'Pero *estrecha*', { size: 100, hlT: T(15.56) });
headline(T(17.6), T(19.4), 'apenas unos *metros* de ancho', { size: 86, hlT: T(18.36) });
{
  const EX = 380, EY = 478;
  const c = scene(T(15.38), T(19.4), t => {
    set(cam, { s: lerp(1.25, 1, p(t, T(15.38), 0.6, E.outCubic)) * (1 + 0.04 * p(t, T(16), 3.4, E.linear)) });
    // emú: camina, se para, mira a cámara 0,6 s, sigue
    const walkA = clamp((t - T(15.5)) / 1.9), walking = (t > T(15.5) && t < T(17.4)) || t > T(18.35);
    const x = EX + walkA * 150 + (t > T(18.35) ? (t - T(18.35)) * 110 : 0);
    const look = t > T(17.55) && t < T(18.25); const turn = look ? clamp((t - T(17.55)) / 0.12) * (1 - clamp((t - T(18.13)) / 0.12)) : 0;
    set(emu.d, { x: x - EX, y: -(walking ? Math.abs(Math.sin(t * 9)) * 8 : 0) });
    face(emu, t, Object.assign(walking ? run(emu, t, 10, 24) : {}, { look: [-3, 0], half: true, neck: walking ? Math.sin(t * 9) * 4 : 0, seed: 1 }));
    emu.neck.style.opacity = turn > 0.5 ? 0 : 1;
    set(efr.d, { x: x - EX, sx: Math.max(0.001, (turn - 0.5) * 2), o: turn > 0.5 ? 1 : 0 });
    face(efr, t, { half: true, blink: false, bR: turn > 0.9 ? 18 : 0 });
    // regla
    const kr = p(t, T(17.68), 0.45, E.outBack);
    set(rul, { sx: Math.max(0.001, kr), o: t < T(17.68) ? 0 : 1 });
    popA(chA, t, T(18.36), { r: -3 }); popA(chL, t, T(15.9), { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#F1E6CC' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  const sec = box(cam, 0, 0, 1080, 1920);
  {
    const VP = [700, 560];
    const HW = 70; const top = `M330,860 L770,860 L${VP[0] + HW},${VP[1]} L${VP[0] - HW},${VP[1]} Z`;
    const face = 'M330,860 L770,860 L810,1250 L290,1250 Z';
    let mer = '';
    for (let k = 0; k < 16; k++) { const f = 1 - Math.pow(0.82, k), sc = 1 - f; [[330, 860], [770, 860]].forEach(([x0, y0], side) => { const x = lerp(x0, VP[0] + (side ? HW : -HW), f), y = lerp(y0, VP[1], f), w = 26 * sc + 2, h = 34 * sc + 2; mer += `<rect x="${f1(x - w / 2)}" y="${f1(y - h)}" width="${f1(w)}" height="${f1(h)}" fill="${STONE}" stroke="${INK}" stroke-width="${f1(2 + 2 * sc)}"/>`; }); }
    let bricks = ''; for (let y = 880; y < 1250; y += 34) { const off = ((y - 880) / 34) % 2 ? 0 : 40; for (let x = 250 + off; x < 830; x += 80) bricks += `M${x},${y} v34 `; bricks += `M250,${y} H850 `; }
    const lf = `M330,860 L290,1250 L${f1(lerp(290, VP[0] - HW, .9))},${f1(lerp(1250, VP[1] + 70, .9))} L${f1(lerp(330, VP[0] - HW, .9))},${f1(lerp(860, VP[1], .9))} Z`;
    let ftw = ''; [[0.55, .45], [0.78, .25]].forEach(([f, s]) => { ftw += towerSvg(lerp(550, VP[0], f), lerp(860, VP[1], f) + 4, s * 2.2); });
    sec.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${ridge(21, 600, 120, 10, '#E7D8B6')}${ridge(22, 700, 90, 7, '#DDC9A0')}
      <path d="M-40,1250 L-40,760 Q540,700 1120,760 L1120,1250 Z" fill="${SAND}" stroke="${INK}" stroke-width="4"/><path d="M-40,1250 L-40,760 Q540,700 1120,760 L1120,1250 Z" fill="url(#hP)"/>
      ${cut(P(top) + P(face))}<path d="${lf}" fill="#8F887B" stroke="${INK}" stroke-width="4"/>${clipG(uid('lf'), lf, `<rect x="200" y="500" width="600" height="800" fill="url(#hD)" opacity=".6"/>`)}<path d="${top}" fill="#C4BBA8" stroke="${INK}" stroke-width="4"/>${clipG(uid('tp'), top, `<rect x="300" y="460" width="500" height="420" fill="url(#hF)" opacity=".5"/>`)}${mer}${ftw}
      <path d="${face}" fill="#ABA394" stroke="${INK}" stroke-width="6"/>${clipG(uid('fc'), face, `<path d="${bricks}" stroke="${INK}" stroke-width="2.5" opacity=".6"/><rect x="560" y="860" width="300" height="400" fill="url(#hA)" opacity=".7"/><rect x="250" y="1150" width="600" height="110" fill="url(#hB)" opacity=".6"/>`)}
      <rect x="318" y="826" width="34" height="36" fill="${STONE}" stroke="${INK}" stroke-width="4"/><rect x="748" y="826" width="34" height="36" fill="${STONE}" stroke="${INK}" stroke-width="4"/></svg>`;
  }
  const chL = chip(cam, 80, 560, 'largo: miles de km ↗', { size: 32, bg: INK, color: YEL });
  const emu = mkEmu(cam, [EX, EY, 260, 390], { seed: 31 });
  const efr = mkEmuF(cam, [EX + 104 - 62, EY + 58 - 68.5, 124, 186]); efr.d.style.zIndex = 3;
  const rul = box(cam, 330, 900, 440, 70, { zIndex: 6, transformOrigin: '0 50%' });
  { let tk = ''; for (let x = 10; x <= 430; x += 21) tk += `M${x},10 v${(x - 10) % 105 === 0 ? 30 : 16} `; rul.innerHTML = `<svg width="440" height="70" style="overflow:visible">${cut('<rect x="0" y="0" width="440" height="64" rx="6"/>', 5, 6)}<rect x="0" y="0" width="440" height="64" rx="6" fill="${YEL}" stroke="${INK}" stroke-width="4"/><path d="${tk}" stroke="${INK}" stroke-width="3"/><path d="M-30,32 h-20 M470,32 h20" stroke="${INK}" stroke-width="5"/></svg>`; }
  const chA = chip(cam, 360, 1010, 'unos metros de ancho', { size: 44, bg: PINK });
}

/* ======================================================================
   S4 · CAMUFLAJE (19.4 – 23.8)  L4
   ====================================================================== */
headline(T(19.4), T(22.5), 'del mismo *color* que el terreno', { size: 80, hlT: T(20.72) });
headline(T(22.5), T(23.8), 'Se *camufla*', { size: 110, hlT: T(23.0) });
{
  const WC = 'M-60,1190 C160,1150 260,1010 420,1000 S640,1060 760,930 S960,760 1140,740';
  const c = scene(T(19.4), T(23.8), t => {
    const kc = p(t, T(20.72), 0.9, E.inOutCubic), kf = p(t, T(22.55), 0.7, E.inOutCubic);
    const col = hexMix(STONE, SAND, kc);
    wf.forEach(e => e.setAttribute('stroke', col)); twr.forEach(e => e.setAttribute('fill', col));
    sw1.style.background = col;
    wo.forEach(e => e.setAttribute('opacity', f1((1 - kf * 0.8) * 100) / 100)); wd.forEach(e => e.setAttribute('opacity', f1((1 - kf * 0.85) * 100) / 100)); halo.forEach(e => e.setAttribute('opacity', f1((1 - kf) * 100) / 100));
    twg.style.opacity = 1 - kf * 0.75;
    set(s1.wrap, { s: pop(t, T(19.63), 0.45), r: -4, o: t < T(19.63) ? 0 : 1 }); set(s2.wrap, { s: pop(t, T(21.3), 0.45), r: 3, o: t < T(21.3) ? 0 : 1 });
    set(eq, { s: pop(t, T(20.46), 0.4), o: t < T(20.46) ? 0 : 1 });
    popA(chC, t, T(21.3), { r: -2 });
    // camaleón
    set(cham.d, { s: pop(t, T(22.6), 0.5), x: Math.sin(t * 2) * 6, o: t < T(22.6) ? 0 : 1 });
    chB.setAttribute('fill', hexMix(PINK, SAND, p(t, T(22.9), 0.5))); chT.setAttribute('stroke', hexMix(PINK, SAND, p(t, T(22.9), 0.5)));
    face(cham, t, { look: [Math.sin(t * 3) * 4, 0] });
    popA(chK, t, T(23.05), { r: 4 });
    set(cam, { s: 1 + 0.05 * p(t, T(19.4), 4.4, E.linear) });
  }, { clip: true });
  sceneBg(c, { background: '#F1E6CC' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  const lnd = box(cam, 0, 0, 1080, 1920);
  {
    const ter = 'M-60,1960 L-60,720 Q300,660 600,700 T1140,680 L1140,1960 Z';
    let tf = ''; const r = rng(66); for (let k = 0; k < 160; k++) { const x = r() * 1080, y = 720 + r() * 640; tf += `M${f1(x)},${f1(y)} q6,-8 14,-2`; }
    let tws = ''; [[180, 1112, 1.2], [560, 1010, 1.0], [900, 800, .75]].forEach(q => tws += towerSvg(q[0], q[1], q[2]));
    lnd.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="${ter}" fill="${SAND}" stroke="${INK}" stroke-width="5"/><path d="${ter}" fill="url(#hP)"/><path d="${tf}" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>${wallStroke(WC, 46)}<g class="twg">${tws}</g></svg>`;
  }
  const wf = [...lnd.querySelectorAll('.wf')], wo = [...lnd.querySelectorAll('.wo')], wd = [...lnd.querySelectorAll('.wd')], halo = [...lnd.querySelectorAll('g > path:first-child')].filter(e => e.getAttribute('stroke') === '#fff');
  const twg = lnd.querySelector('.twg'), twr = [...twg.querySelectorAll('rect:first-child, path')].filter(e => e.getAttribute('fill') === STONE);
  const s1 = paperPiece(c, 110, 450, 330, 190, { seed: 9 }); const s2 = paperPiece(c, 640, 450, 330, 190, { seed: 13 });
  const sw1 = box(s1.inner, 16, 16, 110, 128, { background: STONE, border: `4px solid ${INK}`, borderRadius: '10px' });
  box(s2.inner, 16, 16, 110, 128, { background: SAND, border: `4px solid ${INK}`, borderRadius: '10px' });
  el('div', s1.inner, { left: '140px', top: '44px', fontFamily: 'Rye', fontSize: '36px', color: INK }, 'muralla');
  el('div', s2.inner, { left: '140px', top: '44px', fontFamily: 'Rye', fontSize: '36px', color: INK }, 'terreno');
  const eq = el('div', c, { left: '470px', top: '440px', width: '140px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '170px', lineHeight: '190px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 30 }, '=');
  const chC = chip(c, 300, 1200, 'mismo color que el terreno', { size: 38, bg: INK, color: YEL });
  const cham = mk(cam, [500, 820, 300, 200], chamInner(), '0 0 300 200', 'cham'); cham.d.style.zIndex = 4;
  const chB = cham.d.querySelector('.cb'), chT = cham.d.querySelector('.cbt');
  const chK = chip(c, 620, 760, 'modo camaleón', { size: 34, bg: PINK });
}

/* ======================================================================
   S5a · 2003 · YANG LIWEI (23.8 – 27.1)  L5a
   ====================================================================== */
const Y2003 = w(find('en dos mil tres') + 1);
headline(T(24.75), T(27.1), 'Yang Liwei, el primer *astronauta chino*', Object.assign({ size: 72 }, DARK));
{
  const c = scene(T(23.8), T(27.1), t => {
    const km = p(t, T(24.72), 0.4, E.inOutCubic);
    const ky = p(t, Y2003, 0.18, E.outCubic); // «2003» directo, golpe de sello en «dos (mil tres)», sin contar
    set(yr, { s: (t < Y2003 ? 0 : lerp(2.2, 1, ky) * (1 + 0.08 * (1 - p(t, Y2003 + 0.18, 0.25)))) * lerp(1, 0.36, km), o: t < Y2003 ? 0 : clamp(ky * 2), x: km * 300, y: km * -240, r: km * 8 });
    const kp = p(t, T(24.82), 0.5, E.outBack);
    set(fr.wrap, { y: (1 - kp) * 1100, r: -2 + (1 - kp) * 10, o: t < T(24.8) ? 0 : 1 });
    face(yang, t, { look: t < T(26) ? [0, 0] : [-3, 1], seed: 0.2 });
    set(yang.d, { y: wobble(t, 0.5, 3) });
    popA(nm, t, T(25.11), { r: -3 });
    popA(chY, t, T(25.85), { r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: SKY });
  const st = box(c, 0, 0, 1080, 1920); st.innerHTML = starsSvg(23, 80);
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,230,0,.12), rgba(0,0,0,.5) 75%)' });
  const yr = el('div', c, { left: 0, top: '640px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '300px', lineHeight: '320px', color: YEL, textShadow: `10px 10px 0 ${PINK}`, zIndex: 50 }, '2003');
  const fr = paperPiece(c, 240, 470, 600, 700, { seed: 21, bg: '#E9E2D2' });
  box(fr.inner, 0, 0, 582, 682, { background: 'repeating-linear-gradient(90deg, #D9CFC0 0 30px, #E6DDCF 30px 60px)' });
  const yang = mk(fr.inner, [40, 90, 500, 639], astroInner({ hair: true, flag: true, seed: 12 }), '0 0 360 460', 'bust');
  const nm = el('div', c, { left: '300px', top: '1090px', width: '480px', textAlign: 'center', fontFamily: 'Rye', fontSize: '52px', color: YEL, background: INK, padding: '6px 10px 10px', border: `4px solid ${BRASS}`, borderRadius: '12px', zIndex: 20 }, 'Yang Liwei');
  const chY = chip(c, 300, 1218, 'primer astronauta chino · 2003', { size: 36, bg: PINK });
}

/* ======================================================================
   S5b · VOLVIÓ DEL ESPACIO (27.1 – 28.2)
   ====================================================================== */
headline(T(27.1), T(28.2), '… *volvió* del espacio', { size: 96, hlT: T(27.12) });
{
  const c = scene(T(27.1), T(28.2), t => {
    const k = p(t, T(27.1), 0.95, E.outCubic);
    set(cap.d, { y: lerp(-700, 0, k), r: Math.sin(t * 5) * 4 * (1 - k * 0.7), o: 1 });
    const kp = p(t, T(27.95), 0.3, E.outCubic); set(puff, { s: t < T(27.95) ? 0 : 0.6 + kp * 0.6, o: t < T(27.95) ? 0 : 1 - kp * 0.6 });
    set(cl1, { x: -t * 30 }); set(cl2, { x: t * 20 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#DCE6E2', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 10px)' });
  const cl1 = el('div', c, { left: '700px', top: '560px', fontSize: 0 }, `<svg width="300" height="100" style="overflow:visible"><path d="M20,80 q0,-50 60,-40 q20,-40 70,-20 q40,-30 80,10 q50,0 50,50 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`);
  const cl2 = el('div', c, { left: '-200px', top: '780px', fontSize: 0 }, `<svg width="300" height="100" style="overflow:visible"><path d="M20,80 q0,-50 60,-40 q20,-40 70,-20 q40,-30 80,10 q50,0 50,50 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`);
  const gr = box(c, 0, 0, 1080, 1920); gr.innerHTML = `<svg width="1080" height="1920">${ridge(31, 1130, 80, 6, SAND)}</svg>`;
  const cap = mk(c, [330, 460, 420, 672], capsuleInner(), '0 0 400 640', 'cap');
  const puff = el('div', c, { left: '340px', top: '1040px', width: '400px', height: '160px', fontSize: 0, zIndex: 3 }, `<svg width="400" height="160" style="overflow:visible"><path d="M10,150 q-10,-60 50,-60 q10,-50 70,-30 q40,-50 90,-10 q60,-30 90,20 q60,0 70,80 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5"/><path d="M10,150 q-10,-60 50,-60 q10,-50 70,-30 q40,-50 90,-10 q60,-30 90,20 q60,0 70,80 Z" fill="url(#hP)"/></svg>`);
}

/* ======================================================================
   S5c · RUEDA DE PRENSA (28.2 – 30.55)
   ====================================================================== */
headline(T(28.2), T(30.55), 'Le *preguntaron,* claro', Object.assign({ size: 88 }, DARK));
{
  const FL = [[150, 700], [880, 620], [200, 1000], [860, 980], [520, 560], [100, 860]];
  const c = scene(T(28.2), T(30.55), t => {
    set(cam, { s: 1 + 0.08 * p(t, T(28.2), 2.35, E.linear) });
    const talk = t > T(29.85) ? Math.abs(Math.sin((t - T(29.85)) * 12)) * 0.35 : 0;
    face(yang, t, { jaw: talk, look: t < T(29.4) ? [Math.sin(t * 2) * 5, 0] : [0, 0], brow: t > T(29.4) ? -4 : 0, seed: 0.5 });
    set(yang.d, { y: wobble(t, 0.5, 2) });
    mics.forEach((m, i) => set(m, { y: (1 - p(t, T(28.25) + i * 0.07, 0.35, E.outBack)) * 220, r: m.r0 + wobble(t, 0.6, 1.5, i) }));
    fl.forEach((f, i) => { const on = t > T(28.4) && t < T(30.4) && ((Math.floor(t * 9 + i * 3.7) % 5) === 0); set(f, { s: on ? 1 : 0, o: on ? 1 : 0, r: i * 20 }); });
    set(q1, { s: pop(t, T(28.54), 0.35), r: -4, o: t < T(28.54) || t > T(29.5) ? 0 : 1 });
    set(q2, { s: pop(t, T(28.95), 0.35), r: 4, o: t < T(28.95) || t > T(29.5) ? 0 : 1 });
    set(ans, { s: pop(t, T(29.6), 0.35), o: t < T(29.6) ? 0 : 1 });
    ansD.forEach((d, i) => set(d, { y: -Math.max(0, Math.sin(t * 14 - i * 0.9)) * 12 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#6E1D27', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 26px, rgba(255,255,255,.05) 26px 60px)' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  const yang = mk(cam, [260, 470, 560, 716], astroInner({ hair: true, flag: true, seed: 12 }), '0 0 360 460', 'bust');
  const tbl = box(cam, 0, 0, 1080, 1920, { zIndex: 4 }); tbl.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut('<rect x="60" y="1080" width="960" height="240" rx="10"/>')}<rect x="60" y="1080" width="960" height="240" rx="10" fill="#F4ECDB" stroke="${INK}" stroke-width="6"/><rect x="60" y="1080" width="960" height="240" rx="10" fill="url(#hP)"/><path d="M60,1130 H1020" stroke="${INK}" stroke-width="3"/><path d="M120,1130 Q160,1240 120,1320 M360,1130 Q400,1240 360,1320 M720,1130 Q680,1240 720,1320 M960,1130 Q920,1240 960,1320" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/></svg>`;
  const mics = [[300, -24, RED], [400, -10, BRASS], [490, 0, PINK], [580, 8, '#4a7a9a'], [680, 22, YEL]].map(([x, r0, col]) => { const m = box(cam, x, 880, 70, 230, { zIndex: 3, transformOrigin: '50% 100%' }); m.innerHTML = micSvg(col); m.r0 = r0; return m; });
  const fl = FL.map(q => el('div', cam, { left: px(q[0]), top: px(q[1]), fontSize: '120px', color: '#fff', textShadow: `0 0 20px #fff`, zIndex: 6, lineHeight: 1 }, '✦'));
  const q1 = bubble(cam, 50, 500, 0, '¿La viste?', { size: 48, z: 8, tailX: 160 });
  const q2 = bubble(cam, 560, 450, 0, '¿Se ve la muralla?', { size: 44, z: 8, tailX: 60 });
  box(tbl, 380, 1180, 320, 70, { background: INK, border: `4px solid ${BRASS}`, borderRadius: '10px', zIndex: 2 }).innerHTML = `<div style="position:absolute;left:0;top:6px;width:312px;text-align:center;font-family:Rye;font-size:38px;color:${YEL}">Yang Liwei</div>`;
  const ans = bubble(cam, 650, 520, 180, '', { size: 50, z: 8, tailX: 20, pad: '20px 20px', rad: '50px' }); ans.style.height = '80px';
  const ansD = [0, 1, 2].map(k => box(ans, 30 + k * 40, 26, 20, 20, { borderRadius: '50%', background: INK }));
}
colorHit(T(30.55), T(31.85), YEL, c => {
  const sil = mk(c, [250, 820, 580, 742], astroInner({ hair: true, seed: 12 }), '0 0 360 460', 'bust'); sil.d.style.filter = SIL; sil.d.style.zIndex = 3;
  const t1 = el('div', c, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '150px', lineHeight: 1, color: INK, zIndex: 4 }, 'NO LA VIO');
  const b = bubble(c, 300, 560, 0, '«no la vi»', { size: 84, z: 6, tailX: 140, italic: true, font: 'Playfair' });
  return t => {
    set(sil.d, { y: wobble(t, 0.8, 4) });
    set(t1, { s: lerp(1.4, 1, p(t, T(30.55), 0.2)), o: 1 }); t1.style.textShadow = glitch(t, T(30.6), 0.3);
    set(b, { s: pop(t, T(30.62), 0.4), r: -3, o: t < T(30.62) ? 0 : 1 });
  };
});
