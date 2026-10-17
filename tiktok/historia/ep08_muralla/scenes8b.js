/* ======================================================================
   S6a · EL MITO ES MÁS ANTIGUO QUE LOS VIAJES ESPACIALES (31.85 – 35.8)  L6a
   ====================================================================== */
headline(T(31.85), T(34.1), 'Lo curioso: el mito es más *antiguo*…', { size: 76, hlT: T(33.47) });
headline(T(34.1), T(35.8), '…que los viajes *espaciales*', { size: 84, hlT: T(34.46) });
const gazetteSvg = (w, h) => `<svg viewBox="0 0 300 360" width="${w}" height="${h}" style="overflow:visible">${cut('<rect x="10" y="10" width="280" height="340" rx="4"/>')}<rect x="10" y="10" width="280" height="340" rx="4" fill="#EFE3C4" stroke="${INK}" stroke-width="4"/><rect x="10" y="10" width="280" height="340" fill="url(#hP)"/><text x="150" y="62" text-anchor="middle" font-family="Rye" font-size="38" fill="${INK}">GACETA</text><path d="M30,76 H270 M30,82 H270" stroke="${INK}" stroke-width="3"/><circle cx="96" cy="160" r="52" fill="#E3DED2" stroke="${INK}" stroke-width="4"/><circle cx="80" cy="146" r="10" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="112" cy="178" r="7" fill="none" stroke="${INK}" stroke-width="3"/><path d="M164,120 H270 M164,140 H270 M164,160 H250 M164,180 H270 M164,200 H230 M30,240 H270 M30,260 H270 M30,280 H210 M30,300 H270 M30,320 H250" stroke="${INK}" stroke-width="5" opacity=".45"/></svg>`;
{
  const c = scene(T(31.85), T(35.8), t => {
    const kl = p(t, T(31.95), 0.6, E.inOutCubic); line.style.clipPath = `inset(0 ${f1((1 - kl) * 100)}% 0 0)`;
    const km = p(t, T(33.28), 0.55, E.inOutCubic);
    set(cM, { s: pop(t, T(32.02), 0.45), x: lerp(200, 0, km), r: -4 + wobble(t, 0.5, 1), o: t < T(32.02) ? 0 : 1 });
    set(cR, { s: pop(t, T(34.12), 0.45), r: 3, o: t < T(34.12) ? 0 : 1 });
    const kr = p(t, T(34.6), 1.0, E.inCubic); set(rk.d, { y: -kr * 60 + (t > T(34.6) ? Math.sin(t * 60) * 2 : 0) });
    rk.d.querySelector('.flame').style.opacity = t > T(34.5) ? (Math.sin(t * 40) > -0.3 ? 1 : 0.6) : 0;
    set(chA, { s: pop(t, T(33.47), 0.4), r: -3, o: t < T(33.47) ? 0 : 1 });
    const ka = p(t, T(33.5), 0.5); arr.style.clipPath = `inset(0 0 0 ${f1((1 - ka) * 100)}%)`;
    set(dM, { o: t > T(32.02) ? 1 : 0, x: lerp(200, 0, km) }); set(dR, { o: t > T(34.12) ? 1 : 0 });
  }, { clip: true });
  const line = box(c, 60, 960, 960, 80, { zIndex: 2 }); line.innerHTML = arrowSvg('M10,40 H930 M930,40 L896,16 M930,40 L896,64', INK, 10);
  el('div', c, { left: '700px', top: '1030px', fontFamily: 'SpecialElite', fontSize: '40px', color: INK, whiteSpace: 'nowrap' }, 'tiempo →');
  const dM = box(c, 250, 980, 40, 40, { borderRadius: '50%', background: PINK, border: `5px solid ${INK}`, zIndex: 3 });
  const dR = box(c, 730, 980, 40, 40, { borderRadius: '50%', background: YEL, border: `5px solid ${INK}`, zIndex: 3 });
  const cM = paperPiece(c, 90, 500, 340, 440, { seed: 31, bg: '#FBF6EA' }).wrap;
  cM.lastChild.innerHTML = `<div style="position:absolute;left:30px;top:20px">${gazetteSvg(260, 312)}</div><div style="position:absolute;left:0;top:338px;width:322px;text-align:center;font-family:Playfair;font-weight:900;font-size:48px;color:${INK}">el mito</div>`;
  const cR = paperPiece(c, 590, 500, 340, 440, { seed: 37, bg: '#FBF6EA' }).wrap;
  const rk = mk(cR.lastChild, [96, 16, 130, 273], rocketInner(), '0 0 200 420', 'rk');
  el('div', cR.lastChild, { left: '0', top: '290px', width: '322px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '42px', lineHeight: 1, color: INK }, 'viajes<br>espaciales');
  const chA = chip(c, 380, 1150, '¡más antiguo!', { size: 46, bg: PINK });
  const arr = box(c, 380, 1100, 420, 50, { zIndex: 4 }); arr.innerHTML = arrowSvg('M400,25 H20 M20,25 L48,6 M20,25 L48,44', PINK, 8);
}

/* ======================================================================
   S6b · YA SE DECÍA… DESDE LA LUNA (35.8 – 39.95)  L6b
   ====================================================================== */
headline(T(35.8), T(38.08), 'Ya se decía que se veía desde la *Luna*…', { size: 68, hlT: T(37.27), color: PAPER, shadow: `4px 4px 0 ${INK}` });
headline(T(38.08), T(39.95), '…antes de que *nadie* hubiera ido', { size: 76, hlT: T(38.69), color: PAPER, shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(T(35.8), T(39.95), t => {
    set(np.wrap, { s: lerp(0.95, 1.04, p(t, T(35.8), 4, E.linear)) * pop(t, T(35.82), 0.45), r: -3 + p(t, T(35.8), 4) * 2, o: 1 });
    hw.forEach(q => set(q.e, { o: t >= q.t - 0.04 ? 1 : 0, s: t >= q.t - 0.04 ? 1 + 0.25 * (1 - p(t, q.t - 0.04, 0.2)) : 1 }));
    set(moon, { r: wobble(t, 0.3, 4), s: pop(t, T(37.27), 0.4) });
    set(sight, { o: t > T(37.4) ? 1 : 0 }); sight.style.clipPath = `inset(0 0 0 ${f1((1 - p(t, T(37.4), 0.4)) * 100)}%)`;
    set(rk.d, { s: pop(t, T(38.12), 0.45), r: 12 + wobble(t, 0.6, 2), o: t < T(38.1) ? 0 : 1 });
    const kx = p(t, T(38.69), 0.2); set(xx, { s: lerp(1.6, 1, kx), o: t < T(38.69) ? 0 : kx });
    popA(chN, t, T(39.0), { r: 3 });
  }, { clip: true });
  sceneBg(c, { background: '#3B2E25', backgroundImage: 'repeating-linear-gradient(92deg, rgba(0,0,0,.18) 0 3px, transparent 3px 40px)' });
  const np = paperPiece(c, 80, 450, 920, 760, { seed: 44, bg: '#EFE3C4' });
  el('div', np.inner, { left: '0', top: '18px', width: '902px', textAlign: 'center', fontFamily: 'Rye', fontSize: '84px', color: INK }, 'EL ALMANAQUE');
  box(np.inner, 30, 122, 842, 14, { borderTop: `4px solid ${INK}`, borderBottom: `3px solid ${INK}` });
  el('div', np.inner, { left: '30px', top: '142px', fontFamily: 'SpecialElite', fontSize: '26px', color: INK, whiteSpace: 'nowrap' }, 'Curiosidades del mundo · Edición extraordinaria');
  const hd = el('div', np.inner, { left: '30px', top: '190px', width: '842px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '68px', lineHeight: 1.05, color: INK });
  const hw = [];
  [['«La', 1], ['Gran', 2], ['Muralla', 3], ['se', 4], ['ve', 5], ['desde', 6], ['la', 7], ['Luna»', 8]].map(q => [q[0], find('ya se decia que se veia desde la luna') + q[1]]).forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.textContent = q[0]; if (q[0] === 'Luna»') s.style.fontStyle = 'italic'; hd.appendChild(s); hw.push({ e: s, t: W[q[1]].s }); });
  const ill = box(np.inner, 40, 370, 520, 320, { background: '#E6D9BA', border: `4px solid ${INK}` });
  const moon = box(ill, 330, 20, 170, 170); moon.innerHTML = `<svg viewBox="0 0 170 170" width="170" height="170"><circle cx="85" cy="85" r="78" fill="#F4ECDB" stroke="${INK}" stroke-width="5"/><circle cx="110" cy="100" r="70" fill="url(#hA)" opacity=".7"/><circle cx="60" cy="60" r="14" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="100" cy="110" r="10" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="58" cy="112" r="6" fill="none" stroke="${INK}" stroke-width="3"/><path d="M50,92 q6,6 12,0 M90,70 q6,6 12,0 M66,130 q20,10 40,0" stroke="${INK}" stroke-width="3" fill="none"/></svg>`;
  const wl = box(ill, 0, 0, 520, 320); wl.innerHTML = `<svg width="520" height="320">${ridge(77, 300, 70, 6, '#D9C8A3', 520)}${wallStroke('M-10,300 Q100,240 200,262 T420,236', 10)}</svg>`;
  const sight = box(ill, 140, 120, 220, 140); sight.innerHTML = `<svg width="220" height="140" style="overflow:visible"><path d="M10,130 Q120,40 200,10" stroke="${PINK}" stroke-width="6" stroke-dasharray="12 10" fill="none"/><text x="20" y="60" font-family="Playfair" font-style="italic" font-weight="900" font-size="48" fill="${PINK}" stroke="${INK}" stroke-width="1.5">¿?</text></svg>`;
  let cols = ''; for (let i = 0; i < 12; i++) cols += `<div style="height:8px;margin:16px 0;background:rgba(43,33,24,.4);width:${i % 4 === 3 ? 60 : 100}%"></div>`;
  box(np.inner, 590, 370, 280, 320).innerHTML = cols;
  const rk = mk(c, [680, 760, 200, 420], rocketInner(), '0 0 200 420', 'rk'); rk.d.style.zIndex = 8; rk.d.querySelector('.flame').style.opacity = 0;
  const xx = box(c, 630, 820, 300, 300, { zIndex: 9 }); xx.innerHTML = XSVG;
  const chN = chip(c, 380, 1150, 'nadie había ido aún', { size: 42, bg: INK, color: YEL });
}

/* ======================================================================
   S7 · DESDE LA LUNA (39.95 – 46.55)  L7
   ====================================================================== */
headline(T(39.95), T(43.6), 'Desde la Luna: *ninguna* construcción humana', Object.assign({ size: 70 }, DARK));
headline(T(43.6), T(46.55), 'Se ven continentes, *nubes* y océanos', Object.assign({ size: 74 }, DARK));
{
  const EC = [540, 660], ER = 165;
  const c = scene(T(39.95), T(46.55), t => {
    set(cam, { s: lerp(1.1, 1, p(t, T(39.95), 1.2, E.outCubic)) });
    set(earth.d, { r: t * 2 });
    // lupa: entra, recorre la Tierra, se va
    const k = clamp((t - T(41.3)) / 2.2), out = p(t, T(43.5), 0.4, E.inCubic), ink = p(t, T(41.0), 0.4, E.outBack);
    const a = k * Math.PI * 1.6 + 0.6;
    const lx = EC[0] + Math.cos(a) * 70 + out * 600 + (1 - ink) * 700, ly = EC[1] + Math.sin(a) * 50 - 20;
    set(lupa, { x: lx - 130, y: ly - 130, r: -6, o: t > T(40.9) && t < 44 ? 1 : 0 });
    set(lens, { x: lx - 104, y: ly - 104, o: t > T(40.9) && t < 44 ? 1 : 0 });
    set(earth2, { x: (EC[0] - lx) * 2.2 + 104 - ER * 2.2, y: (EC[1] - ly) * 2.2 + 104 - ER * 2.2 });
    earth2.firstChild.style.transform = `rotate(${f1(t * 2)}deg)`;
    set(qq, { s: pop(t, T(42.06), 0.35), o: t > T(42.06) && t < 44 ? 1 : 0, x: lx - 40, y: ly - 70 });
    popA(chN, t, T(42.48), { r: -3 });
    set(card.wrap, { y: (1 - p(t, T(43.62), 0.4, E.outBack)) * 900, r: 2, o: t < T(43.6) ? 0 : 1 });
    rows.forEach((r, i) => set(r, { s: pop(t, [T(43.91), T(44.91), T(45.68), T(46.05)][i], 0.35), o: t < [T(43.91), T(44.91), T(45.68), T(46.05)][i] ? 0 : 1 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: SKY });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const st = box(cam, 0, 0, 1080, 1920); st.innerHTML = starsSvg(77, 110);
  const earth = mk(cam, [EC[0] - ER * 400 / 380, EC[1] - ER * 400 / 380, ER * 800 / 380, ER * 800 / 380], earthInner({ seed: 52 }), '0 0 400 400', 'earth');
  const ms = box(cam, 0, 0, 1080, 1920); ms.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${moonSurface(1100)}</svg>`;
  const lens = box(cam, 0, 0, 208, 208, { borderRadius: '50%', overflow: 'hidden', background: SKY, zIndex: 5 });
  const earth2 = box(lens, 0, 0, ER * 4.4, ER * 4.4); earth2.innerHTML = `<div style="width:100%;height:100%">${svgW(earthInner({ seed: 52 }), '-10.5 -10.5 421 421')}</div>`;
  const lupa = box(cam, 0, 0, 300, 420, { zIndex: 6 }); lupa.innerHTML = lupaFrame();
  const qq = el('div', cam, { left: 0, top: 0, fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: YEL, textShadow: `4px 4px 0 ${INK}`, zIndex: 7 }, '?');
  const chN = chip(c, 200, 425, 'construcciones humanas: ninguna', { size: 34, bg: PINK });
  const card = paperPiece(c, 470, 880, 440, 360, { seed: 61, bg: '#FBF6EA' });
  el('div', card.inner, { left: '24px', top: '14px', fontFamily: 'Rye', fontSize: '30px', color: INK }, 'Se ve desde la Luna:');
  const rows = [['continentes', 1], ['nubes', 1], ['océanos', 1], ['la muralla', 0]].map((q, i) => checkRow(card.inner, 24, 62 + i * 68, q[0], q[1], { size: 42 }));
}

/* ======================================================================
   S8a · ¡OJO! CÁMARAS Y ZOOM DESDE LA ÓRBITA (46.55 – 52.0)  L8a
   ====================================================================== */
headline(T(47.2), T(52.0), 'Con cámaras y *zoom…* sí aparece', Object.assign({ size: 80 }, DARK));
{
  const c = scene(T(46.55), T(52.0), t => {
    set(cam, { s: 1 + 0.05 * p(t, T(46.55), 5.4, E.linear) });
    set(earth.d, { r: t * 1.2 });
    stampA(ojo, t, T(46.66), -10, 1);
    const ko = p(t, T(47.25), 0.3, E.inOutCubic);
    set(ojo, { s: lerp(1, 0.42, ko) * (t < T(46.66) ? 0 : 1) * (t < T(46.84) ? lerp(2.3, 1, p(t, T(46.66), 0.18)) : 1), x: ko * -310, y: ko * -150, r: -10, o: t < T(46.66) ? 0 : 1 });
    set(camG, { x: (1 - p(t, T(47.25), 0.5, E.outBack)) * -700, y: wobble(t, 0.3, 6), r: 24 + wobble(t, 0.25, 1.5) });
    const kz = p(t, T(48.41), 0.5, E.outBack); set(lensT, { sx: lerp(0.35, 1.25, kz) });
    popA(chZ, t, T(48.5), { r: -4 });
    const kor = p(t, T(49.4), 0.7, E.inOutCubic); orb.style.clipPath = `inset(0 ${f1((1 - kor) * 100)}% 0 0)`;
    popA(chO, t, T(49.45), { r: 3 });
    const fOn = t > T(50.69) && t < T(50.85); flash.style.opacity = fOn ? 1 - (t - T(50.69)) / 0.16 : 0; flash.style.visibility = fOn ? 'visible' : 'hidden';
    camF.style.opacity = t > T(50.6) && t < T(50.9) ? 1 : 0;
    const kp = p(t, T(50.75), 0.5, E.outBack); set(photo.wrap, { y: (1 - kp) * 260, x: (1 - kp) * -200, s: lerp(0.3, 1, kp), r: lerp(30, 6, kp), o: t < T(50.72) ? 0 : 1 });
    reveal(circ, cL, p(t, T(51.25), 0.45, E.inOutCubic));
    popA(chA, t, T(51.3), { r: -5 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: SKY });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const st = box(cam, 0, 0, 1080, 1920); st.innerHTML = starsSvg(91, 110);
  const earth = mk(cam, [-420, 1000, 1920, 1920], earthInner({ seed: 61 }), '0 0 400 400', 'earth');
  const orb = box(cam, -60, 900, 1200, 360, { zIndex: 1 }); orb.innerHTML = `<svg width="1200" height="360" style="overflow:visible"><ellipse cx="600" cy="300" rx="660" ry="240" stroke="${YEL}" stroke-width="5" stroke-dasharray="16 14" fill="none"/></svg>`;
  const camG = box(cam, 40, 470, 520, 320, { zIndex: 4, transformOrigin: '140px 185px' });
  const lensT = box(camG, 246, 100, 300, 170, { transformOrigin: '0 50%' }); lensT.innerHTML = lensSvg();
  camG.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:0;top:0;width:520px;height:320px">${svgW(cameraInner(), '0 0 520 320')}</div>`);
  const camF = camG.querySelector('.flashG');
  const chZ = chip(cam, 330, 900, 'zoom', { size: 44, bg: PINK });
  const chO = chip(cam, 560, 1160, 'desde la órbita', { size: 36, bg: INK, color: YEL });
  const flash = box(c, 0, 0, 1080, 1920, { background: '#fff', zIndex: 60 });
  const photo = paperPiece(cam, 540, 440, 400, 470, { seed: 71, bg: '#fff', plain: true });
  const ph = box(photo.inner, 16, 16, 370, 330, { background: '#D9CCAA', border: `4px solid ${INK}`, overflow: 'hidden' });
  ph.innerHTML = `<svg width="370" height="330">${ridge(81, 160, 60, 6, '#E3D2AE', 370)}${ridge(82, 260, 80, 5, '#D2BB8E', 370)}<path d="M-10,300 C80,250 120,200 190,210 S300,150 380,120" stroke="${INK}" stroke-width="6" fill="none"/><path d="M-10,300 C80,250 120,200 190,210 S300,150 380,120" stroke="${STONE}" stroke-width="3" fill="none"/><ellipse class="circ" cx="190" cy="205" rx="120" ry="70" stroke="${PINK}" stroke-width="8" fill="none" transform="rotate(-18 190 205)"/></svg>`;
  el('div', photo.inner, { left: '0', top: '360px', width: '402px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'foto con teleobjetivo');
  const circ = ph.querySelector('.circ'); const cL = pathLen(circ) + 10;
  const chA = chip(cam, 600, 930, '¡sí aparece!', { size: 42, bg: YEL, color: INK });
  const ojo = stamp(c, 200, 560, '¡OJO!', { size: 190, bw: 16, z: 70, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   S8b · A SIMPLE VISTA, NO (52.0 – 55.4)  L8b
   ====================================================================== */
headline(T(52.0), T(55.4), 'Pero a *simple vista,* no', { size: 92, hlT: T(52.84) });
{
  const c = scene(T(52.0), T(55.4), t => {
    set(cA.wrap, { s: pop(t, T(52.05), 0.4), r: -3, o: 1 }); set(cB.wrap, { s: pop(t, T(52.84), 0.4), r: 3, o: t < T(52.84) ? 0 : 1 });
    const iris = eye.d.querySelector('.iris'); iris.setAttribute('transform', `translate(${f1(Math.sin(t * 3.2) * 40)},${f1(Math.cos(t * 2.1) * 10)})`);
    const kx = p(t, T(53.98), 0.2); set(xx, { s: lerp(1.8, 1, kx), o: t < T(53.98) ? 0 : 1 });
    set(okA, { s: pop(t, T(52.3), 0.4), o: t < T(52.3) ? 0 : 1 });
    popA(chC, t, T(54.4), { r: -2, rise: 40 });
    set(dotE, { s: 0.6 + 0.1 * Math.sin(t * 6) });
  }, { clip: true });
  const cA = paperPiece(c, 60, 470, 430, 560, { seed: 81, bg: '#FBF6EA' });
  el('div', cA.inner, { left: '0', top: '20px', width: '412px', textAlign: 'center', fontFamily: 'Rye', fontSize: '36px', color: INK }, 'con zoom');
  const ca = box(cA.inner, 20, 90, 370, 230); ca.innerHTML = `<div style="position:absolute;left:0;top:30px;width:240px;height:148px">${svgW(cameraInner(), '0 0 520 320')}</div><div style="position:absolute;left:112px;top:78px;width:240px;height:84px;transform:rotate(0deg)">${lensSvg()}</div>`;
  const okA = box(cA.inner, 130, 360, 150, 150, { borderRadius: '50%', background: YEL, border: `6px solid ${INK}` }); okA.innerHTML = `<div style="position:absolute;left:28px;top:28px;width:82px;height:82px">${CHECK}</div>`;
  const cB = paperPiece(c, 520, 470, 410, 560, { seed: 83, bg: '#FBF6EA' });
  el('div', cB.inner, { left: '0', top: '20px', width: '392px', textAlign: 'center', fontFamily: 'Rye', fontSize: '34px', color: INK }, 'a simple vista');
  const eye = mk(cB.inner, [30, 110, 330, 198], eyeInner(), '0 0 400 240', 'eye');
  const dotE = box(cB.inner, 166, 370, 60, 60, { borderRadius: '50%', background: OCEAN, border: `4px solid ${INK}` });
  el('div', cB.inner, { left: '0', top: '440px', width: '392px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', color: INK }, '(la Tierra, de lejos)');
  const xx = box(c, 570, 560, 320, 320, { zIndex: 9 }); xx.innerHTML = XSVG;
  const chC = chip(c, 320, 1100, 'no es lo que te contaron', { size: 42, bg: PINK });
}

/* ======================================================================
   S9 · UNA DE LAS MAYORES CONSTRUCCIONES… (55.4 – 60.5)  L9
   ====================================================================== */
headline(T(55.4), T(59.58), 'Una de las mayores *construcciones* de la historia…', { size: 68, hlT: T(57.51) });
headline(T(59.58), T(60.5), '…y desde *arriba*', { size: 100, hlT: T(60.0) });
{
  const c = scene(T(55.4), T(60.5), t => {
    const kz = p(t, T(59.62), 0.8, E.inCubic);
    set(near, { s: (1 + 0.06 * p(t, T(55.4), 4.2, E.linear)) * lerp(1, 0.05, kz), o: 1 - p(t, T(60.1), 0.3) });
    set(far, { s: lerp(4, 1, p(t, T(59.75), 0.7, E.outCubic)), o: p(t, T(59.85), 0.3) });
    ppl.forEach((q, i) => set(q, { y: -Math.abs(Math.sin(t * 6 + i)) * 4 }));
    popA(chP, t, T(56.3), { r: -3 });
    set(clouds, { x: -t * 14 });
  }, { clip: true });
  sceneBg(c, { background: '#F1E6CC' });
  const far = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px', zIndex: 1 });
  far.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${ridge(91, 640, 140, 14, '#E7D8B6')}${ridge(92, 820, 170, 12, '#DDC9A0')}${ridge(93, 1030, 200, 10, '#D2BB8E')}${ridge(94, 1300, 160, 8, '#C8AF80')}<path d="M-20,1180 C200,1100 300,980 470,960 S700,860 820,800 S1000,720 1120,700" stroke="${INK}" stroke-width="2" fill="none" opacity=".55"/></svg>`;
  const near = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 860px', zIndex: 2 });
  const clouds = el('div', near, { left: '100px', top: '520px', fontSize: 0 }, `<svg width="1400" height="120" style="overflow:visible"><path d="M20,80 q0,-50 60,-40 q20,-40 70,-20 q40,-30 80,10 q50,0 50,50 Z M720,60 q0,-40 50,-34 q20,-30 60,-14 q40,-24 70,10 q40,0 40,40 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`);
  {
    let mer = ''; for (let x = -40; x < 1120; x += 70) mer += `<rect x="${x}" y="690" width="40" height="50" fill="${STONE}" stroke="${INK}" stroke-width="4"/>`;
    let br = ''; for (let y = 760; y < 1180; y += 40) { const off = ((y - 760) / 40) % 2 ? 0 : 45; for (let x = -40 + off; x < 1120; x += 90) br += `M${x},${y} v40 `; br += `M-40,${y} H1120 `; }
    const tw = 'M600,1180 L610,560 L840,560 L850,1180 Z';
    let tmer = ''; for (let x = 600; x < 850; x += 50) tmer += `<rect x="${x}" y="510" width="30" height="52" fill="${STONE}" stroke="${INK}" stroke-width="4"/>`;
    const wall = 'M-40,740 H1120 V1180 H-40 Z';
    let people = ''; [[120, 1180, 80, 1], [190, 1180, 74, 2], [380, 1180, 84, 3], [470, 1180, 70, 4], [900, 1180, 80, 5], [980, 1180, 76, 6], [250, 690, 40, 7], [330, 690, 38, 8], [930, 690, 40, 9]].forEach(q => people += `<g class="pp">${personSvg(...q)}</g>`);
    const wsv = box(near, 0, 0, 1080, 1920);
    wsv.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-40,1180 H1120 V1400 H-40 Z" fill="${SAND}" stroke="${INK}" stroke-width="5"/><path d="M-40,1180 H1120 V1400 H-40 Z" fill="url(#hP)"/>
      ${mer}<path d="${wall}" fill="#ABA394" stroke="${INK}" stroke-width="6"/>${clipG(uid('nw'), wall, `<path d="${br}" stroke="${INK}" stroke-width="2.5" opacity=".55"/><rect x="-40" y="740" width="1160" height="90" fill="url(#hB)" opacity=".6"/>`)}
      ${tmer}${cut(P(tw), 8, 0)}<path d="${tw}" fill="#B4AC9C" stroke="${INK}" stroke-width="6"/>${clipG(uid('tw'), tw, `<path d="${br}" stroke="${INK}" stroke-width="2.5" opacity=".55"/><rect x="760" y="540" width="100" height="660" fill="url(#hA)"/>`)}<rect x="690" y="640" width="70" height="110" rx="35" fill="#160f0a"/><path d="M670,1180 L670,1060 Q725,1000 780,1060 L780,1180 Z" fill="#160f0a"/>${people}</svg>`;
  }
  const ppl = [...near.querySelectorAll('.pp')];
  const chP = chip(c, 360, 1236, 'personas, a escala', { size: 34, bg: '#fff', color: INK });
}
