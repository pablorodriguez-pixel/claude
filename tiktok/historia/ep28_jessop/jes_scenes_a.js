/* Ep. 28 · escenas L0–L3 (todo clavado por texto vía K) */

/* ======================================================================
   A · PORTADA / GANCHO — la proa del Titanic hundiéndose + «¿TÚ TE SALVABAS?» + la cofia que flota
   ====================================================================== */
const WAVES = (seed, col, line, h = 1100) => waterSvg(0, h, seed, col, line);
{
  const c = scene(S.A[0], S.A[1], t => {
    const tl = Math.max(0, t);
    set(cam, { s: 1.02 + 0.05 * p(t, 0, 4.4, E.linear) });
    // la proa se inclina (+3° → +8°) y se hunde
    const kr = p(t, 0, 4.4, E.linear);
    set(bow, { r: 6 + 6 * kr + wobble(t, 0.35, 0.4), y: 70 * kr + wobble(t, 0.4, 4), s: 1.2 });
    set(buoy, { y: Math.sin(t * 2.1) * 10, r: Math.sin(t * 1.7) * 8 }); set(plank, { y: Math.sin(t * 2.3 + 1) * 8, r: -12 + Math.sin(t * 1.9) * 6 });
    MR.forEach((m, i) => set(m, { x: Math.sin(t * 3 + i) * 14, o: 0.35 + 0.25 * Math.sin(t * 4 + i * 2) }));
    // «Tú no salías vivo»: el agua sube y tapa la proa
    const kw = p(t, K.tu0 - 0.1, 1.6, E.inOutCubic);
    set(wat, { y: -150 * kw, x: -((tl * 30) % 60) });
    set(fwave, { x: -((tl * 50) % 60), y: Math.sin(t * 2.4) * 6 });
    set(sky, { y: 0 });
    // título vivo desde el fotograma 0
    set(l1, { r: -2 + wobble(t, 0.5, 0.7), s: 1 + 0.025 * Math.sin(t * 3.1) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.7, 1), s: 1 + 0.025 * Math.sin(t * 3.1 + 1) });
    // «Esta camarera, sí»: la cofia sube y debajo emerge Violet
    const ke = p(t, K.esta - 0.05, 0.7, E.outBack);
    set(vio.d, { y: lerp(420, 0, clamp(ke)) + wobble(t, 0.5, 3) * ke });
    face(vio, t, { look: [-4, -3], closed: t < K.esta + 0.3, bL: t > K.si - 0.1 ? 10 : 4, bR: t > K.si - 0.1 ? 10 : 4, seed: 0.4 });
    const bob = Math.sin(t * 2.4) * 8, rot = Math.sin(t * 2.0) * 7;
    const capX = lerp(0, 12, ke), capY = lerp(0, -292, clamp(ke)), capS = lerp(1, 0.75, clamp(ke));
    set(cof, { x: capX, y: capY + bob * (1 - ke), r: rot * (1 - ke) - 4 * ke, s: capS });
    // lazo rosa con «?» (todavía no hay veredicto)
    const kq = p(t, K.si - 0.08, 0.4, E.outBack);
    set(rib, { y: (1 - kq) * -600, r: -8 + Math.sin(t * 5) * 3 * kq, o: t < K.si - 0.08 ? 0 : 1 });
    BUB.forEach((b, i) => { const ph = (tl * 0.9 + i * 0.37) % 1; set(b, { y: -ph * 160, o: (1 - ph) * 0.8 * (t > K.esta ? 1 : 0.4) }); });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const sky = sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 55%, #5d6f86 100%)` });
  svgBox(cam, 0, 0, 1080, 1100, stars(90, 7, 1080, 1000), '0 0 1080 1100', 1);
  box(cam, 640, 120, 200, 200, { borderRadius: '50%', background: 'radial-gradient(circle, #FBF6EA 0 38%, rgba(251,246,234,.25) 40%, rgba(251,246,234,0) 70%)', zIndex: 1 });
  const bow = box(cam, -250, 640, 1300, 760, { zIndex: 3, transformOrigin: '1100px 520px' });
  bow.innerHTML = svgW(bowInner(), '0 0 1300 760');
  const wat = box(cam, 0, 1110, 1080, 1100, { zIndex: 5 }); wat.innerHTML = WAVES(11, '#152131', '#c9d6e2');
  const MR = [0, 1, 2, 3, 4, 5].map(i => box(cam, 640 + (i % 3) * 40 - 20, 1330 + i * 70, 220 - i * 18, 10, { zIndex: 6, borderRadius: '6px', background: '#FBF6EA' }));
  const buoy = box(cam, 90, 1420, 200, 120, { zIndex: 8 }); buoy.innerHTML = `<svg width="200" height="120" style="overflow:visible"><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="${INK}" stroke-width="40"/><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="#fff" stroke-width="30"/><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="${RED}" stroke-width="30" stroke-dasharray="44 44"/></svg>`;
  const plank = box(cam, 380, 1560, 300, 50, { zIndex: 8, background: WOOD, border: `5px solid ${INK}`, borderRadius: '6px' });
  box(cam, 0, 1110, 1080, 900, { zIndex: 6, background: 'linear-gradient(180deg, rgba(10,18,28,0) 0%, rgba(10,18,28,.55) 100%)' });
  // Violet (sale del agua) dentro de un recorte con el borde inferior en la línea de agua del primer plano
  const vClip = box(cam, 540, 820, 420, 470, { overflow: 'hidden', zIndex: 7 });
  const vio = mkViolet(vClip, [60, 40, 300, 383], { noCap: true });
  const BUB = []; for (let i = 0; i < 6; i++) BUB.push(box(cam, 600 + i * 50, 1240, 18 + (i % 3) * 8, 18 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #dfe8ef', zIndex: 8 }));
  const fwave = box(cam, -30, 1262, 1140, 120, { zIndex: 8 });
  fwave.innerHTML = `<svg width="1140" height="120" style="overflow:visible"><path d="M0,30 ${Array.from({ length: 20 }, (_, k) => `q30,-22 60,0`).join(' ')} V700 H0 Z" fill="#152131"/><path d="M0,30 ${Array.from({ length: 20 }, (_, k) => `q30,-22 60,0`).join(' ')}" fill="none" stroke="#dfe8ef" stroke-width="5"/><path d="M0,60 ${Array.from({ length: 28 }, () => 'q20,-12 40,0').join(' ')}" stroke="#dfe8ef" stroke-width="2.5" fill="none" opacity=".5"/></svg>`;
  const cof = box(cam, 618, 1192, 240, 120, { zIndex: 9 }); cof.innerHTML = cofiaSvg();
  const l1 = BIGT(cam, 0, 335, 1080, `¿<span style="color:${YEL}">TÚ</span> TE`, { fontSize: '170px', color: '#FBF6EA', textShadow: OUTL(INK, 9), zIndex: 40 });
  const l2 = BIGT(cam, 0, 505, 1080, 'SALVABAS?', { fontSize: '150px', color: '#FBF6EA', textShadow: OUTL(INK, 9), zIndex: 40 });
  const rib = box(cam, 330, 1000, 220, 200, { zIndex: 30 });
  rib.innerHTML = `<svg viewBox="0 0 260 230" width="220" height="200" style="overflow:visible">${cut('<path d="M130,90 C80,10 10,30 30,90 C46,130 100,110 130,90 Z M130,90 C180,10 250,30 230,90 C214,130 160,110 130,90 Z M110,100 L70,220 L110,196 L130,226 L140,110 Z M150,100 L190,220 L150,196 L130,226 Z"/>', 5, 7)}<path d="M110,100 L70,220 L110,196 L130,226 L140,110 Z M150,100 L190,220 L150,196 L130,226 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><path d="M130,90 C80,10 10,30 30,90 C46,130 100,110 130,90 Z M130,90 C180,10 250,30 230,90 C214,130 160,110 130,90 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><circle cx="130" cy="92" r="26" fill="${PINK}" stroke="${INK}" stroke-width="5"/><text x="130" y="108" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="#fff" stroke="${INK}" stroke-width="2">?</text></svg>`;
}

/* ======================================================================
   B · «VIOLET YÉSOP, NACIDA EN ARGENTINA» — retrato + nombre a máquina + sello de la bandera
   ====================================================================== */
{
  const NAME = 'VIOLET JESSOP';
  const c = scene(S.B[0], S.B[1], t => {
    set(ry, { r: t * 9 });
    set(cam, { s: 1 + 0.06 * p(t, S.B[0], 2.4, E.linear) });
    set(vio.d, { s: pop(t, S.B[0], 0.4), y: wobble(t, 0.5, 4), o: 1 });
    face(vio, t, { look: [3, -2], bL: 6, bR: 6, seed: 1.1 });
    const n = Math.min(NAME.length, Math.max(0, Math.floor((t - K.violet + 0.05) * 16)));
    nm.textContent = NAME.slice(0, n) + (n < NAME.length && Math.floor(t * 6) % 2 ? '|' : '');
    set(strip, { s: pop(t, S.B[0] + 0.02, 0.35), r: -1.5 });
    popA(nac, t, K.nacida - 0.05, { r: -3 });
    const kf = p(t, K.argentina - 0.05, 0.18, E.outCubic), out = p(t, K.argentina + 0.85, 0.2, E.inCubic);
    set(flg, { s: t < K.argentina - 0.05 ? 0 : lerp(2.2, 1, kf) * (1 - out), r: -10, o: t < K.argentina - 0.05 ? 0 : 1 - out });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EFE1C6' });
  const ry = rays(cam, -160, 160, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 55%, rgba(255,230,0,.35), rgba(255,230,0,0) 52%)' });
  const vio = mkViolet(cam, [210, 520, 660, 843]); vio.d.style.zIndex = 5;
  const strip = box(cam, 90, 270, 900, 150, { zIndex: 20, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `9px 10px 0 ${SH}` });
  const nm = el('div', strip, { left: 0, top: '22px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '100px', lineHeight: '110px', color: INK, whiteSpace: 'nowrap' }, '');
  const nac = chip(cam, 300, 450, 'nacida en Argentina', { size: 52, bg: INK, color: YEL, z: 25 });
  const flg = box(cam, 640, 560, 240, 160, { zIndex: 30 }); flg.innerHTML = flagAR();
}

/* ======================================================================
   C · «EN EL BOTE LE LANZAN UN BULTO…» — el bote baja por el costado del Titanic y cae un fardo
   ====================================================================== */
headline(S.C[0], S.C[1], 'En el bote le lanzan *un bulto*…', { size: 80, hlT: K.bulto, color: '#FBF6EA', shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(S.C[0], S.C[1], t => {
    const kd = p(t, S.C[0], 1.7, E.outCubic);
    set(bw, { y: lerp(-260, 0, kd) + wobble(t, 0.7, 4), r: Math.sin(t * 2.2) * 1.6 });
    set(hullL, { y: -kd * 120 });
    face(vio, t, { look: t > K.bulto ? [0, -6] : [-3, 0], bL: t > K.bulto ? 14 : 4, bR: t > K.bulto ? 14 : 4, seed: 2.1 });
    const tb = K.bulto - 0.12, kb = p(t, tb, 0.42, E.inCubic);
    set(bun, { y: lerp(-900, 0, kb) + (t > tb + 0.42 ? Math.sin((t - tb - 0.42) * 30) * 8 * (1 - p(t, tb + 0.42, 0.4)) : 0), r: lerp(-40, 0, kb), o: t < tb ? 0 : 1 });
    set(ql, { s: pop(t, tb + 0.42, 0.3), o: t < tb + 0.42 ? 0 : 1, r: 8 });
  }, { clip: true });
  sceneBg(c, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 100%)` });
  const hullL = box(c, 0, 0, 1080, 2100, { zIndex: 1 });
  {
    let s = `<rect x="0" y="0" width="1080" height="2100" fill="${HULL}"/><rect x="0" y="0" width="1080" height="2100" fill="url(#hB)" opacity=".4"/>`;
    for (let y = 120; y < 2100; y += 170) { s += `<path d="M0,${y} H1080" stroke="#E9DFC8" stroke-width="2" opacity=".3"/>`; for (let x = 40; x < 1080; x += 110) s += `<circle cx="${x + (y % 340 ? 55 : 0)}" cy="${y + 70}" r="18" fill="#3b4f6b" stroke="#E9DFC8" stroke-width="4" opacity=".9"/><circle cx="${x + (y % 340 ? 55 : 0) - 5}" cy="${y + 65}" r="5" fill="${YEL}" opacity=".7"/>`; }
    hullL.innerHTML = `<svg width="1080" height="2100" style="overflow:visible">${s}</svg>`;
  }
  const bw = box(c, 0, 0, 1080, 1920, { zIndex: 5, transformOrigin: '620px 600px' });
  box(bw, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M380,-100 L380,1010 M860,-100 L860,1010" stroke="#E9DFC8" stroke-width="7"/><path d="M380,-100 L380,1010 M860,-100 L860,1010" stroke="${INK}" stroke-width="3" stroke-dasharray="6 6"/><circle cx="380" cy="1000" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="860" cy="1000" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></svg>`;
  const vio = mkViolet(bw, [470, 650, 300, 383]); vio.d.style.zIndex = 2;
  const bun = box(bw, 530, 900, 190, 140, { zIndex: 4 }); bun.innerHTML = svgW(bundleInner(false), '0 0 300 220');
  const lb = box(bw, 330, 990, 580, 232, { zIndex: 3 }); lb.innerHTML = svgW(lifeboatInner(), '0 0 600 240');
  const ql = qMark(bw, 760, 760, 120, PINK);
}

/* ======================================================================
   D · «UN BEBÉ. QUE NO ERA SUYO.» — el fardo se abre: un bebé
   ====================================================================== */
headline(S.D[0], K.que22 - 0.06, 'Un *bebé*', { size: 130, hlT: K.bebe, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(K.que22 - 0.06, S.D[1], '*No era suyo*', { size: 112, hlT: K.noera, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.D[0], S.D[1], t => {
    set(cam, { s: 1.04 + 0.06 * p(t, S.D[0], 2.3, E.linear) });
    const ko = p(t, K.bebe - 0.05, 0.25, E.outBack);
    bc.style.opacity = ko < 0.5 ? 1 : 0; bo.style.opacity = ko < 0.5 ? 0 : 1;
    set(bnd, { s: 1 + 0.1 * Math.sin(clamp(ko) * Math.PI), r: wobble(t, 0.6, 1.5), y: wobble(t, 0.8, 3) });
    const mano = bo.querySelector('.mano'); if (mano) mano.setAttribute('transform', `rotate(${f1(Math.sin(t * 9) * 12)} 232 132)`);
    face(vio, t, { look: [4, 6], bL: t > K.noera ? 14 : 6, bR: t > K.noera ? 14 : 6, seed: 3.1 });
    set(vio.d, { y: wobble(t, 0.5, 3) });
    set(q, { s: pop(t, K.noera - 0.03, 0.35), r: 10 + Math.sin(t * 6) * 8, o: t < K.noera - 0.03 ? 0 : 1 });
    SP.forEach((s2, i) => set(s2, { o: t > K.bebe ? 0.5 + 0.5 * Math.sin(t * 7 + i) : 0, r: t * 80 + i * 40 }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 70%, #485c74 100%)` });
  svgBox(cam, 0, 0, 1080, 900, stars(70, 9, 1080, 900), '0 0 1080 900', 1);
  const wt = box(cam, 0, 1060, 1080, 900, { zIndex: 2 }); wt.innerHTML = WAVES(13, '#152131', '#c9d6e2');
  const vio = mkViolet(cam, [380, 470, 440, 562]); vio.d.style.zIndex = 4;
  const bnd = box(cam, 400, 850, 470, 345, { zIndex: 6 });
  const bc = box(bnd, 0, 0, 470, 345); bc.innerHTML = svgW(bundleInner(false), '0 0 300 220');
  const bo = box(bnd, 0, 0, 470, 345); bo.innerHTML = svgW(bundleInner(true), '0 0 300 220');
  const q = qMark(cam, 790, 620, 170, PINK);
  const SP = [[420, 820], [860, 860], [640, 780]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontSize: '50px', color: YEL, textShadow: `2px 2px 0 ${INK}`, zIndex: 7 }, '✦'));
}

/* ======================================================================
   E1 · «AL RESCATARLOS, CUENTA,…» — amanece (azul → rosa) y llega el barco de rescate
   ====================================================================== */
headline(S.E1[0], S.E1[1], 'Al *rescatarlos*…', { size: 120, hlT: K.rescatarlos });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    const kd = p(t, S.E1[0], 1.6, E.inOutCubic);
    dawn.style.opacity = kd;
    set(sun, { y: lerp(120, -40, kd), o: kd });
    set(rs, { x: lerp(160, 0, p(t, S.E1[0], 1.9, E.outCubic)), y: Math.sin(t * 1.6) * 4 });
    set(lb, { x: lerp(-200, 0, p(t, S.E1[0], 1.8, E.outCubic)), y: Math.sin(t * 2.4) * 8, r: Math.sin(t * 2.4 + 0.5) * 2 });
    face(vio, t, { look: [6, -3], bL: 6, bR: 6, seed: 4.2 });
  }, { clip: true });
  sceneBg(c, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 100%)` });
  const dawn = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'linear-gradient(180deg, #8fb3cf 0%, #f2b8c6 48%, #f7d7a8 70%)' });
  const sun = box(c, 380, 860, 320, 320, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(circle, #FFE9A8 0 40%, rgba(255,233,168,.3) 42%, rgba(255,233,168,0) 70%)' });
  const rs = box(c, 470, 820, 480, 160, { zIndex: 3 }); rs.innerHTML = shipSvg({ funnels: [380] });
  const wt = box(c, 0, 950, 1080, 1000, { zIndex: 4 }); wt.innerHTML = WAVES(17, '#6f8fa6', INK);
  const lb = box(c, 0, 0, 1080, 1920, { zIndex: 6 });
  const vio = mkViolet(lb, [400, 700, 300, 383]); vio.d.style.zIndex = 1;
  const bun = box(lb, 470, 930, 170, 125, { zIndex: 2 }); bun.innerHTML = svgW(bundleInner(true), '0 0 300 220');
  const lbs = box(lb, 300, 1000, 560, 224, { zIndex: 3 }); lbs.innerHTML = svgW(lifeboatInner(), '0 0 600 240');
}

/* ======================================================================
   E2 · «…UNA MUJER SE LO ARRANCÓ» — unas manos se llevan al bebé; queda el regazo vacío
   ====================================================================== */
headline(S.E2[0], S.E2[1], 'una mujer *se lo arrancó*', { size: 96, hlT: K.arranco });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(cam, { s: 1.05 + 0.05 * p(t, S.E2[0], 1.7, E.linear) });
    const ki = p(t, K.mujer - 0.1, 0.35, E.outCubic), ko = p(t, K.arranco + 0.05, 0.4, E.inCubic);
    const hy = lerp(-700, 0, ki) - ko * 1000;
    set(hd, { y: hy, r: Math.sin(t * 8) * 2 });
    set(bun, { y: -ko * 1000, r: -ko * 30 });
    face(vio, t, { look: t > K.arranco ? [4, -8] : [3, 4], bL: t > K.arranco ? 18 : 4, bR: t > K.arranco ? 18 : 4, seed: 5.3 });
    set(vio.d, { y: wobble(t, 0.5, 3) + (t > K.arranco && t < K.arranco + 0.3 ? Math.sin(t * 60) * 5 : 0) });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '640px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #8fb3cf 0%, #f2b8c6 50%, #f7d7a8 80%)' });
  rays(cam, -160, 200, 1400, 22, 'rgba(255,255,255,.18)', 'rgba(0,0,0,0)', 0);
  const vio = mkViolet(cam, [420, 520, 420, 537]); vio.d.style.zIndex = 4;
  const bun = box(cam, 470, 880, 360, 264, { zIndex: 6 }); bun.innerHTML = svgW(bundleInner(true), '0 0 300 220');
  const hd = box(cam, 460, 860, 380, 260, { zIndex: 7 }); hd.innerHTML = handsSvg();
}

/* rótulo pequeño «SEGÚN SUS MEMORIAS» durante toda la L2 (P6 en pantalla) */
{
  const mem = el('div', world, { left: '400px', top: '1250px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: INK, background: YEL, border: `4px solid ${INK}`, borderRadius: '100px', padding: '6px 26px 8px', boxShadow: `5px 5px 0 ${INK}`, zIndex: 520, letterSpacing: '0.06em', whiteSpace: 'nowrap', visibility: 'hidden' }, 'SEGÚN SUS MEMORIAS');
  SCX.push(t => { const on = t >= S.D[0] + 0.1 && t < S.F[1]; mem.style.visibility = on ? 'visible' : 'hidden'; if (on) set(mem, { s: pop(t, S.D[0] + 0.1, 0.3), o: 1 }); });
}

/* ======================================================================
   F · «NI LAS GRACIAS.» — la mujer se va con el bebé; bocadillo que se queda en «…»
   ====================================================================== */
headline(S.F[0], S.F[1], 'Ni *las gracias*', { size: 124, hlT: K.gracias });
{
  const c = scene(S.F[0], S.F[1], t => {
    set(ry, { r: t * 8 });
    set(lady.d, { x: lerp(-40, 40, p(t, S.F[0], 1.7, E.linear)), y: Math.abs(Math.sin(t * 5)) * -10 });
    face(lady, t, { look: [8, -2], half: true, bL: 10, bR: 2, seed: 6.4 });
    set(vio.d, { s: pop(t, S.F[0] + 0.05, 0.35), o: 1, y: wobble(t, 0.5, 2) });
    face(vio, t, { look: [8, 0], bL: 16, bR: 4, seed: 6.9 });
    set(bb, { s: pop(t, K.ni34 + 0.05, 0.35), r: 3 + wobble(t, 0.6, 1), o: t < K.ni34 + 0.05 ? 0 : 1 });
    const n = t < K.ni34 + 0.3 ? 0 : 1 + Math.floor((t - K.ni34 - 0.3) * 3) % 3;
    dots.textContent = '.'.repeat(n + 1).padEnd(3, ' ');
    set(sweat, { o: t > K.gracias ? 1 : 0, y: t > K.gracias ? ((t - K.gracias) * 60) % 40 : 0 });
  }, { clip: true });
  sceneBg(c, { background: '#F1D9D2' });
  const ry = rays(c, -160, 160, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const lady = mk(c, [560, 560, 340, 434], `<g transform="translate(360,0) scale(-1,1)">${ladyInner(77, '#2b2118', '#5a3a3a', { hat: true })}</g>`, '0 0 360 460', 'bust'); lady.d.style.zIndex = 4;
  const lb2 = box(c, 600, 880, 240, 176, { zIndex: 6 }); lb2.innerHTML = svgW(bundleInner(true), '0 0 300 220');
  const vio = mkViolet(c, [80, 470, 300, 383]); vio.d.style.zIndex = 5;
  const bb = bubble(c, 610, 420, '', { size: 90, tail: 'br', z: 20, pad: '0px 40px 18px' });
  const dots = document.createElement('span'); dots.style.display = 'inline-block'; dots.style.minWidth = '140px'; dots.style.textAlign = 'center'; bb.insertBefore(dots, bb.lastChild);
  const sweat = el('div', c, { left: '330px', top: '540px', fontSize: '50px', zIndex: 8 }, '💧');
}

/* ======================================================================
   G · «¿FIN? QUÉ VA:» — el rótulo FIN de película antigua se rompe
   ====================================================================== */
{
  const c = scene(S.G[0], S.G[1], t => {
    const fl = 0.85 + 0.15 * Math.abs(Math.sin(t * 37)) ;
    set(card, { s: pop(t, S.G[0], 0.3) * (1 + 0.02 * Math.sin(t * 9)), o: 1 });
    cardWrap.style.opacity = fl;
    SCR.forEach((s2, i) => set(s2, { x: Math.sin(t * 13 + i * 3) * 300, o: Math.sin(t * 29 + i) > 0.3 ? 0.5 : 0 }));
    // se rompe en «Qué va»
    const tb = K.queva - 0.04, kb = t > tb ? t - tb : 0;
    set(hL, { x: -kb * 700, y: kb * kb * 2600, r: -kb * 50 });
    set(hR, { x: kb * 700, y: kb * kb * 2600, r: kb * 60 });
    crk.style.opacity = t > tb - 0.25 ? 1 : 0;
    const kq = p(t, K.queva + 0.05, 0.3, E.outBack);
    set(qv, { s: t < K.queva + 0.05 ? 0 : kq * (t > K.va ? 1 + 0.06 * Math.sin((t - K.va) * 16) * (1 - p(t, K.va, 0.6)) : 1), r: -5, o: t < K.queva + 0.05 ? 0 : 1 });
    set(ry, { r: t * 12, o: t > K.queva ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#14110e' });
  const ry = rays(c, -160, 260, 1400, 26, 'rgba(255,230,0,.95)', 'rgba(255,62,165,1)', 1);
  const card = box(c, 140, 650, 800, 500, { zIndex: 10 });
  const cardWrap = box(card, 0, 0, 800, 500);
  const J = 'polygon(0 0, 52% 0, 47% 22%, 55% 41%, 46% 63%, 53% 80%, 48% 100%, 0 100%)';
  const JR = 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%, 53% 80%, 46% 63%, 55% 41%, 47% 22%)';
  const hL = box(cardWrap, 0, 0, 800, 500, { clipPath: J }); hL.innerHTML = finCardSvg(800, 500);
  const hR = box(cardWrap, 0, 0, 800, 500, { clipPath: JR }); hR.innerHTML = finCardSvg(800, 500);
  const crk = box(cardWrap, 0, 0, 800, 500, { zIndex: 3 }); crk.innerHTML = `<svg width="800" height="500" style="overflow:visible"><path d="M416,0 L376,110 L440,205 L368,315 L424,400 L384,500" stroke="#FBF6EA" stroke-width="7" fill="none"/></svg>`;
  const SCR = [0, 1, 2].map(i => box(c, 540, 0, 4, 1920, { background: 'rgba(255,255,255,.6)', zIndex: 12 }));
  const qv = BIGT(c, 0, 760, 1080, '¡QUÉ VA!', { fontSize: '190px', color: '#fff', textShadow: OUTL(INK, 11), zIndex: 30 });
}

/* ======================================================================
   H · «EL TITANIC NO FUE EL ÚNICO. TENÍA DOS GEMELOS… Y ELLA, EN LOS TRES.» — tres cartas en fila
   ====================================================================== */
const CW = 250, CX3 = [60, 375, 690], CY3 = 540;
headline(S.H[0], K.tenia - 0.06, 'El Titanic *no fue el único*', { size: 92, hlT: K.unico, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(K.tenia - 0.06, K.y49 - 0.06, 'Tenía *dos gemelos*', { size: 108, hlT: K.gemelos, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(K.y49 - 0.06, S.H[1], 'y ella, *en los tres*', { size: 108, hlT: K.tres3, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.H[0], S.H[1], t => {
    set(cam, { s: 1 + 0.04 * p(t, S.H[0], 5, E.linear) });
    set(ry, { r: t * 6 });
    // carta central (Titanic) primero; las gemelas entran en «dos»
    const k2 = p(t, S.H[0], 0.4, E.outBack);
    set(C2.d, { y: (1 - k2) * 900, r: wobble(t, 0.4, 0.8) });
    const k1 = p(t, K.dos - 0.1, 0.4, E.outBack), k3 = p(t, K.dos + 0.02, 0.4, E.outBack);
    set(C1.d, { x: (1 - k1) * -700, r: -4 * k1 + wobble(t, 0.4, 0.8, 1) });
    set(C3.d, { x: (1 - k3) * 700, r: 4 * k3 + wobble(t, 0.4, 0.8, 2) });
    const g = p(t, K.gemelos, 0.3) * (1 - p(t, K.y49, 0.3));
    C1.glow.style.opacity = g; C3.glow.style.opacity = g;
    C2.glow.style.opacity = t > K.tres3 + 0.2 ? 0.6 : 0;
    // la cofia salta de carta en carta: 1 → 2 → 3
    const jumps = [[K.ella3 - 0.1, 0], [K.en3 - 0.05, 1], [K.tres3 - 0.05, 2]];
    let cx = CX3[0] + CW / 2 - 70, cy = CY3 - 70, sc = 0, rr = 0;
    jumps.forEach(([tj, i], j) => {
      if (t < tj) return;
      const kj = p(t, tj, 0.3, E.inOutCubic);
      const fx = j ? CX3[i - 1] + CW / 2 - 70 : CX3[0] + CW / 2 - 70, tx = CX3[i] + CW / 2 - 70;
      cx = lerp(fx, tx, kj); cy = CY3 - 70 - Math.sin(kj * Math.PI) * (j ? 160 : 0) - (j ? 0 : (1 - kj) * 400); sc = 1; rr = Math.sin(kj * Math.PI) * 20;
    });
    set(cof, { x: cx, y: cy + wobble(t, 0.8, 3), s: sc, r: rr, o: t < K.ella3 - 0.1 ? 0 : 1 });
    set(TL.d, { s: pop(t, K.ella3, 0.35), o: t < K.ella3 ? 0 : 1 });
    stampA(TL.st[1], t, K.tres3 + 0.22, 8, 1); TL.st[0].style.opacity = 0; TL.st[2].style.opacity = 0;
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  const ry = rays(cam, -160, 120, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const C1 = mkCard(cam, CX3[0], CY3, 1, 'OLYMPIC', '1911', { w: CW });
  const C2 = mkCard(cam, CX3[1], CY3, 2, 'TITANIC', '1912', { w: CW, z: 12 });
  const C3 = mkCard(cam, CX3[2], CY3, 3, 'BRITANNIC', '1916', { w: CW, hospital: true });
  const cof = box(cam, 0, 0, 140, 70, { zIndex: 30 }); cof.innerHTML = cofiaSvg();
  const TL = mkTally(cam, 342, 1000, 110, 40);
}
