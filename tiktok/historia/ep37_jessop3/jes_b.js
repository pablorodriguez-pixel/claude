/* Ep. 37 · L4–L7: los tres pasos (titular numerado fijo + marcador de 3 barcos que se tachan) */

/* ======================================================================
   TITULAR NUMERADO (modelo Napoleón «Una: las pulgadas») + MARCADOR DE 3 BARCOS
   Vive por encima de las escenas (z 800) y aguanta todo el paso, aunque cambie el plano.
   ====================================================================== */
const STEPW = el('div', world, { left: 0, top: 0, width: '1080px', height: '600px', zIndex: 800, visibility: 'hidden' });
const SB = []; // un titular por paso
STEPS.forEach(st => {
  const b = box(STEPW, 60, 172, 960, 150, { background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '24px', boxShadow: `10px 11px 0 ${SH}`, visibility: 'hidden', transformOrigin: '480px 75px' });
  const num = box(b, 18, 10, 118, 118, { borderRadius: '50%', background: RED, border: `6px solid ${INK}`, boxSizing: 'border-box', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '100px', color: '#fff', transformOrigin: '59px 59px' }, String(st.n));
  const nm = el('div', b, { left: '160px', top: '14px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '104px', lineHeight: '110px', color: INK, whiteSpace: 'nowrap', transformOrigin: '0 60px' }, `${st.name}`);
  const yr = el('div', b, { right: '28px', top: '30px', fontFamily: 'Rye', fontSize: '76px', lineHeight: '84px', color: '#7a2a1e', whiteSpace: 'nowrap', transformOrigin: '100% 50%' }, `· ${st.year}`);
  const hl = el('div', b, { left: '150px', top: '84px', width: '0px', height: '34px', background: YEL, zIndex: -1, borderRadius: '6px 14px 6px 14px', transformOrigin: 'left center' });
  SB.push({ st, b, num, nm, yr, hl });
});
// marcador: tres casillas con barco + nombre; se tachan en rojo al salir viva de cada uno
const MK = [];
['OLYMPIC', 'TITANIC', 'BRITANNIC'].forEach((nmS, i) => {
  const x = 66 + i * 316;
  const d = box(STEPW, x, 348, 292, 112, { background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `6px 6px 0 ${SH}`, transformOrigin: '146px 56px' });
  const ic = box(d, 8, 8, 120, 40); ic.innerHTML = shipSvg({ hospital: i === 2 });
  el('div', d, { left: '132px', top: '6px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '46px', lineHeight: '50px', color: RED }, String(i + 1));
  el('div', d, { left: 0, top: '56px', width: '282px', textAlign: 'center', fontFamily: 'Rye', fontSize: i === 2 ? '33px' : '36px', lineHeight: '40px', color: INK, letterSpacing: '0.04em' }, nmS);
  const cofI = box(d, 196, -34, 84, 42, { zIndex: 4 }); cofI.innerHTML = cofiaSvg();
  const ok = box(d, 228, -30, 72, 72, { zIndex: 6 }); ok.innerHTML = `<svg viewBox="0 0 100 100" width="72" height="72" style="overflow:visible"><circle cx="50" cy="50" r="44" fill="#3f7a52" stroke="${INK}" stroke-width="7"/><path d="M26,52 L44,70 L76,30" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  MK.push({ d, ok, cofI });
});
const STEP_T0 = STEPS[0].t0, STEP_T1 = STEPS[2].t1;
function updSteps(t) {
  const on = t >= STEP_T0 && t < STEP_T1;
  STEPW.style.display = on ? '' : 'none'; STEPW.style.visibility = 'visible';
  if (!on) return;
  const cur = STEPS.findIndex(st => t >= st.t0 && t < st.t1);
  SB.forEach((s, i) => {
    const vis = i === cur; s.b.style.visibility = vis ? 'visible' : 'hidden'; if (!vis) return;
    const st = s.st;
    const kin = p(t, st.t0, 0.32, E.outBack);
    set(s.b, { x: (1 - kin) * -1100, r: -1 + wobble(t, 0.4, 0.4), s: 1 });
    stampA(s.num, t, Math.max(st.t0 + 0.05, st.tN - 0.05), -8, 1);
    const tNm = Math.min(st.tName, st.tN + 0.35) - 0.06;
    const kn = p(t, tNm, 0.3, E.outBack);
    set(s.nm, { x: (1 - kn) * 40, o: t < tNm ? 0 : clamp(kn * 1.5) });
    s.hl.style.width = f1(lerp(0, s.nm.offsetWidth || 400, p(t, st.tName, 0.35, E.outCubic))) + 'px';
    const ky = p(t, st.tYear - 0.04, 0.22, E.outCubic);
    set(s.yr, { s: t < st.tYear - 0.04 ? 0 : lerp(2, 1, ky), r: -4, o: t < st.tYear - 0.04 ? 0 : clamp(ky * 2) });
  });
  MK.forEach((m, i) => {
    const st = STEPS[i], done = t >= st.tDone, act = i === cur && !done;
    const kin = p(t, STEP_T0 + 0.12 + i * 0.08, 0.32, E.outBack);
    set(m.d, { y: (1 - kin) * -300, s: act ? 1.06 + 0.02 * Math.sin(t * 6) : 1, r: act ? -1.5 : 0, o: 1 });
    m.d.style.background = act ? YEL : '#FBF6EA';
    m.d.style.opacity = i > cur && !done ? 0.78 : 1;
    m.d.style.background = act ? YEL : done ? '#E3F0DC' : '#FBF6EA';
    stampA(m.ok, t, st.tDone, -10, 1.15);
    m.cofI.style.visibility = i === cur ? 'visible' : 'hidden';
    set(m.cofI, { y: Math.sin(t * 5) * 4, r: Math.sin(t * 3) * 8 });
  });
}
SCX.push(updSteps);

/* ======================================================================
   O1 · «UNO: EL OLYMPIC.» — el Olympic navega, enorme
   ====================================================================== */
{
  const c = scene(S.O1[0], S.O1[1], t => {
    const tl = t - S.O1[0];
    set(cam, { s: 1 + 0.06 * p(t, S.O1[0], 1.6, E.linear) });
    set(oly, { x: lerp(260, 0, p(t, S.O1[0], 0.7, E.outCubic)) - tl * 20, y: Math.sin(t * 2) * 5, r: Math.sin(t * 1.7) * 0.8 });
    set(sea, { x: -((tl * 50) % 60) });
    SMK.forEach((s2, i) => { const ph = (tl * 0.7 + i * 0.25) % 1; set(s2, { x: -ph * 220, y: -ph * 160, s: 0.5 + ph, o: (1 - ph) * 0.8 }); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #b9d3dc 0%, #e9e2cf 62%)' });
  rays(cam, -160, 300, 1400, 24, 'rgba(255,255,255,.18)', 'rgba(0,0,0,0)', 0);
  const sea = box(cam, 0, 0, 1140, 1920, { zIndex: 3 }); sea.innerHTML = waterSvg(1010, 500, 23, LAGOON, INK, 1140);
  const oly = box(cam, 40, 660, 1000, 333, { zIndex: 2 }); oly.innerHTML = shipSvg({});
  const SMK = [0, 1, 2, 3].map(i => box(oly, 300 + i * 120 * 0, 20, 110, 70, { borderRadius: '50%', background: 'rgba(80,70,60,.55)', border: `3px solid ${INK}`, zIndex: -1 }));
}

/* ======================================================================
   O2 · «EN 1911 CHOCÓ CONTRA UN BUQUE DE GUERRA.» — el buque gris embiste; ¡CRAC!
   ====================================================================== */
const T_CRAC = K.choco1 + 0.12;
{
  const c = scene(S.O2[0], S.O2[1], t => {
    set(fr, { s: lerp(0.7, 1, p(t, S.O2[0], 0.3, E.outCubic)), o: 1 });
    set(sea, { x: -(((t - S.O2[0]) * 40) % 60) });
    const kw = p(t, S.O2[0], T_CRAC - S.O2[0], E.inCubic);
    const recoil = t > T_CRAC ? -40 * Math.sin(p(t, T_CRAC, 0.5) * Math.PI) : 0;
    set(war, { x: lerp(-700, -150, kw) + recoil, y: Math.sin(t * 2.6) * 4 });
    const tilt = t > T_CRAC ? 4 * p(t, T_CRAC, 0.3, E.outBack) : 0;
    set(oly, { r: tilt + Math.sin(t * 2.2) * 0.6, y: Math.sin(t * 2.2 + 1) * 4 });
    set(boom, { s: pop(t, T_CRAC, 0.25) * (1 - p(t, T_CRAC + 0.7, 0.3)), r: t * 40, o: t < T_CRAC ? 0 : 1 });
    set(crac, { s: pop(t, T_CRAC + 0.02, 0.3), r: -8, o: t < T_CRAC ? 0 : 1 });
    popA(lab, t, K.buque - 0.05, { r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.15), rgba(0,0,0,.35) 80%)' });
  const fr = box(c, 60, 500, 880, 760, { zIndex: 5, background: '#FBF6EA', border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `12px 14px 0 ${SH}` });
  const inner = box(fr, 18, 18, 830, 620, { overflow: 'hidden', borderRadius: '12px', border: `4px solid ${INK}`, background: 'linear-gradient(180deg, #cfe0e4 0%, #e9e2cf 70%)' });
  const sea = box(inner, 0, 0, 900, 700, { zIndex: 1 }); sea.innerHTML = waterSvg(420, 300, 21, LAGOON, INK, 900);
  const oly = box(inner, 230, 200, 600, 200, { zIndex: 3, transformOrigin: '300px 160px' }); oly.innerHTML = shipSvg({});
  const war = box(inner, 0, 285, 480, 164, { zIndex: 4 }); war.innerHTML = svgW(warshipInner(), '0 0 760 260');
  const boom = box(inner, 220, 210, 240, 240, { zIndex: 6 }); boom.innerHTML = svgW(boomInner(), '0 0 600 600');
  const crac = BIGT(inner, 0, 50, 830, '¡CRAC!', { fontSize: '130px', color: YEL, textShadow: OUTL(INK, 8), zIndex: 8 });
  const lab = el('div', fr, { left: 0, top: '654px', width: '866px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK }, 'contra un BUQUE DE GUERRA');
}

/* ======================================================================
   O3 · «ELLA IBA A BORDO Y SALIÓ SIN UN RASGUÑO.» — Violet en cubierta + sello
   ====================================================================== */
{
  const c = scene(S.O3[0], S.O3[1], t => {
    set(cam, { s: 1.04 + 0.05 * p(t, S.O3[0], 2.6, E.linear) });
    set(vio.d, { s: pop(t, S.O3[0], 0.4), y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1.5), o: 1 });
    face(vio, t, { look: [6, -3], bL: t > K.sin ? 4 : 8, bR: t > K.sin ? 4 : 8, seed: 11.2 });
    set(vio.d, { y: lerp(-60, 0, p(t, K.bajo - 0.1, 0.4, E.outCubic)) + wobble(t, 0.5, 4) });
    set(wt, { x: -(((t - S.O3[0]) * 40) % 60) });
    stampA(abo, t, K.nohundio - 0.04, 5, 1);
    stampA(stV, t, K.sin - 0.04, -7, 1);
    SP.forEach((s2, i) => set(s2, { o: t > K.sin ? 0.5 + 0.5 * Math.sin(t * 8 + i * 1.3) : 0, r: t * 120 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #9cc3d6 0%, #d7e6e6 50%, #EFE1C6 100%)' });
  const wt = box(cam, 0, 0, 1140, 1920, { zIndex: 1 }); wt.innerHTML = waterSvg(880, 600, 41, LAGOON, INK, 1140);
  const vio = mkViolet(cam, [330, 560, 460, 588]); vio.d.style.zIndex = 4;
  box(cam, 0, 0, 1080, 1920, { zIndex: 5 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1020" width="1080" height="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 18 }, (_, k) => `<path d="M${30 + k * 60},1040 V1160" stroke="#fff" stroke-width="10"/><path d="M${30 + k * 60},1040 V1160" stroke="${INK}" stroke-width="2.5" fill="none"/>`).join('')}<rect x="0" y="1160" width="1080" height="200" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="1160" width="1080" height="200" fill="url(#hW)" opacity=".35"/><g transform="translate(860,1080)"><circle r="62" fill="none" stroke="#fff" stroke-width="30"/><circle r="62" fill="none" stroke="${RED}" stroke-width="30" stroke-dasharray="32 32"/><circle r="78" fill="none" stroke="${INK}" stroke-width="4"/><circle r="46" fill="none" stroke="${INK}" stroke-width="4"/></g></svg>`;
  const abo = stamp(cam, 200, 500, 'NO SE HUNDIÓ', { size: 80, bw: 12, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal', col: '#2f6a46' });
  const stV = stamp(cam, 150, 1010, 'SIN UN RASGUÑO', { size: 82, bw: 12, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const SP = [[230, 760], [820, 720], [740, 980]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
}

/* ======================================================================
   O4 · «…NI EL UNIFORME SE LE ARRUGÓ.» — Violet impecable, brillos y sello «NI UNA ARRUGA»
   ====================================================================== */
{
  const c = scene(S.O4[0], S.O4[1], t => {
    set(ry, { r: t * 12 });
    set(vio.d, { s: pop(t, S.O4[0], 0.35) * (1 + 0.03 * Math.sin(t * 4)), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [0, -2], bL: 4, bR: 4, seed: 4.4, closed: t > K.arrugo && t < K.arrugo + 0.25 });
    stampA(stA, t, K.uniforme - 0.04, -6, 1);
    SP.forEach((s2, i) => set(s2, { o: 0.5 + 0.5 * Math.sin(t * 8 + i * 1.7), s: 1 + 0.3 * Math.sin(t * 6 + i), r: t * 140 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -160, 220, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const vio = mkViolet(c, [260, 480, 560, 716]); vio.d.style.zIndex = 4;
  const SP = [[230, 620], [820, 660], [300, 980], [760, 1000], [540, 520]].map(([x, y]) => el('div', c, { left: px(x), top: px(y), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 6 }, '✦'));
  const stA = stamp(c, 170, 1080, 'NI UNA ARRUGA', { size: 84, bw: 12, z: 60, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   T1 · «DOS: EL TITANIC.» — el Titanic, de noche, con todas las luces
   ====================================================================== */
{
  const c = scene(S.T1[0], S.T1[1], t => {
    const tl = t - S.T1[0];
    set(cam, { s: 1 + 0.06 * p(t, S.T1[0], 1.6, E.linear) });
    set(tit, { x: lerp(300, 0, p(t, S.T1[0], 0.6, E.outCubic)) - tl * 18, y: Math.sin(t * 2) * 4 });
    set(sea, { x: -((tl * 50) % 60) });
    LT.style.opacity = 0.6 + 0.4 * Math.abs(Math.sin(t * 5));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 70%, #485c74 100%)` });
  svgBox(cam, 0, 0, 1080, 1000, stars(80, 5, 1080, 1000), '0 0 1080 1000', 1);
  const sea = box(cam, 0, 0, 1140, 1920, { zIndex: 3 }); sea.innerHTML = waterSvg(1000, 520, 27, '#152131', '#c9d6e2', 1140);
  const tit = box(cam, 40, 660, 1000, 333, { zIndex: 2 }); tit.innerHTML = shipSvg({});
  const LT = box(tit, 0, 0, 1000, 333, { zIndex: 3 }); LT.innerHTML = `<svg viewBox="0 0 900 300" width="100%" height="100%" style="overflow:visible">${Array.from({ length: 28 }, (_, k) => `<circle cx="${130 + k * 26}" cy="184" r="5" fill="${YEL}"/>`).join('')}${Array.from({ length: 26 }, (_, k) => `<rect x="${170 + k * 22}" y="143" width="9" height="12" fill="${YEL}" opacity=".9"/>`).join('')}</svg>`;
}

/* ======================================================================
   T2 · «AL AÑO SIGUIENTE.» — la proa de noche, frente al iceberg; hoja de calendario «1912»
   ====================================================================== */
{
  const c = scene(S.T2[0], S.T2[1], t => {
    set(cam, { s: 1 + 0.08 * p(t, S.T2[0], 1.7, E.inCubic) });
    const kh = p(t, S.T2[0], S.T2[1] - S.T2[0], E.inCubic);
    set(bw, { x: -60 * kh, y: Math.sin(t * 2) * 4 + 180 * kh, r: 2 + 12 * kh });
    set(ice, { x: -50 * p(t, S.T2[0], 1.7, E.linear), y: Math.sin(t * 1.4) * 3 });
    popA(cal, t, S.T2[0] + 0.1, { r: -4 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, #0f1824 0%, ${NIGHT} 60%, #2c3d55 100%)` });
  svgBox(cam, 0, 0, 1080, 1000, stars(110, 9, 1080, 1000, 1), '0 0 1080 1000', 1);
  const ice = box(cam, 600, 640, 420, 520, { zIndex: 2 }); ice.innerHTML = `<svg viewBox="0 0 420 520" width="420" height="520" style="overflow:visible">${cut('<path d="M20,500 L80,260 L150,300 L210,80 L280,240 L330,180 L400,500 Z"/>', 6, 8)}<path d="M20,500 L80,260 L150,300 L210,80 L280,240 L330,180 L400,500 Z" fill="#e8f2f7" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M210,80 L190,300 L240,500 M80,260 L110,500 M330,180 L320,500" stroke="#9bb8c8" stroke-width="5" fill="none"/><path d="M210,80 L280,240 L330,180 L400,500 L240,500 Z" fill="url(#hB)" opacity=".35"/></svg>`;
  const sea = box(cam, 0, 0, 1140, 1920, { zIndex: 4 }); sea.innerHTML = waterSvg(1110, 500, 33, '#152131', '#c9d6e2', 1140);
  const bw = box(cam, -520, 700, 1300, 760, { zIndex: 3, transformOrigin: '1100px 520px' }); bw.innerHTML = svgW(bowInner(), '0 0 1300 760');
  const cal = chip(cam, 260, 560, 'mientras se hundía', { size: 60, bg: RED, color: '#fff', z: 30 });
}

/* ======================================================================
   T3 · «ELLA SE SALVÓ EN UN BOTE SALVAVIDAS,» — el bote baja por el costado
   ====================================================================== */
{
  const c = scene(S.T3[0], S.T3[1], t => {
    const kd = p(t, S.T3[0], 1.8, E.outCubic);
    set(bw, { y: lerp(-260, 0, kd) + wobble(t, 0.7, 4), r: Math.sin(t * 2.2) * 1.6 });
    set(hullL, { y: -kd * 120 });
    face(vio, t, { look: [-3, 0], bL: 6, bR: 6, seed: 2.1 });
    popA(lab, t, K.bote5 - 0.05, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 100%)` });
  const hullL = box(c, 0, 0, 1080, 2100, { zIndex: 1 });
  {
    let s = `<rect x="0" y="0" width="1080" height="2100" fill="${HULL}"/><rect x="0" y="0" width="1080" height="2100" fill="url(#hB)" opacity=".4"/>`;
    for (let y = 120; y < 2100; y += 170) { s += `<path d="M0,${y} H1080" stroke="#E9DFC8" stroke-width="2" opacity=".3"/>`; for (let x = 40; x < 1080; x += 110) s += `<circle cx="${x + (y % 340 ? 55 : 0)}" cy="${y + 70}" r="18" fill="#3b4f6b" stroke="#E9DFC8" stroke-width="4" opacity=".9"/><circle cx="${x + (y % 340 ? 55 : 0) - 5}" cy="${y + 65}" r="5" fill="${YEL}" opacity=".7"/>`; }
    hullL.innerHTML = `<svg width="1080" height="2100" style="overflow:visible">${s}</svg>`;
  }
  const bw = box(c, 0, 0, 1080, 1920, { zIndex: 5, transformOrigin: '540px 600px' });
  box(bw, 0, 0, 1080, 1920).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M260,-100 L260,1010 M820,-100 L820,1010" stroke="#E9DFC8" stroke-width="7"/><path d="M260,-100 L260,1010 M820,-100 L820,1010" stroke="${INK}" stroke-width="3" stroke-dasharray="6 6"/><circle cx="260" cy="1000" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="820" cy="1000" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="4"/></svg>`;
  const vio = mkViolet(bw, [380, 620, 320, 409]); vio.d.style.zIndex = 2;
  const lb = box(bw, 230, 990, 620, 248, { zIndex: 3 }); lb.innerHTML = svgW(lifeboatInner(), '0 0 600 240');
  const lab = chip(c, 330, 560, 'bote salvavidas', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   T4 · «CON UN BEBÉ QUE LE PUSIERON EN LOS BRAZOS AL SUBIR.» — el fardo cae en sus brazos: un bebé
   ====================================================================== */
{
  const c = scene(S.T4[0], S.T4[1], t => {
    set(cam, { s: 1.04 + 0.06 * p(t, S.T4[0], 2.4, E.linear) });
    const tb = K.pusieron - 0.3, kb = p(t, tb, 0.3, E.inCubic);
    const ko = p(t, K.bebe - 0.02, 0.2, E.outBack);
    set(bnd, { y: lerp(-900, 0, kb) + (t > tb + 0.3 ? Math.sin((t - tb - 0.3) * 30) * 8 * (1 - p(t, tb + 0.3, 0.4)) : 0), s: 1 + 0.1 * Math.sin(clamp(ko) * Math.PI), r: wobble(t, 0.6, 1.5) });
    bc.style.opacity = ko < 0.5 ? 1 : 0; bo.style.opacity = ko < 0.5 ? 0 : 1;
    const mano = bo.querySelector('.mano'); if (mano) mano.setAttribute('transform', `rotate(${f1(Math.sin(t * 9) * 12)} 232 132)`);
    face(vio, t, { look: [4, 6], bL: t > K.pusieron ? 14 : 6, bR: t > K.pusieron ? 14 : 6, seed: 3.1 });
    set(vio.d, { y: wobble(t, 0.5, 3) });
    set(hd, { y: lerp(-500, 0, p(t, K.pusieron - 0.15, 0.3, E.outCubic)) - 600 * p(t, K.brazos + 0.25, 0.35, E.inCubic), o: t > K.pusieron - 0.15 ? 1 : 0 });
    SP.forEach((s2, i) => set(s2, { o: t > K.bebe ? 0.5 + 0.5 * Math.sin(t * 7 + i) : 0, r: t * 80 + i * 40 }));
    popA(lab, t, K.bebe, { r: 4 }); popA(seg, t, K.segun - 0.05, { r: -3 });
    set(bnd, { o: t < tb ? 0 : 1 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 70%, #485c74 100%)` });
  svgBox(cam, 0, 0, 1080, 900, stars(70, 9, 1080, 900), '0 0 1080 900', 1);
  const wt = box(cam, 0, 1120, 1080, 900, { zIndex: 2 }); wt.innerHTML = WAVES(13, '#152131', '#c9d6e2');
  const vio = mkViolet(cam, [330, 520, 440, 562]); vio.d.style.zIndex = 4;
  const bnd = box(cam, 350, 900, 470, 345, { zIndex: 6 });
  const bc = box(bnd, 0, 0, 470, 345); bc.innerHTML = svgW(bundleInner(false), '0 0 300 220');
  const bo = box(bnd, 0, 0, 470, 345); bo.innerHTML = svgW(bundleInner(true), '0 0 300 220');
  const hd = box(cam, 600, 700, 300, 200, { zIndex: 7 }); hd.innerHTML = handsSvg();
  const SP = [[380, 860], [820, 900], [600, 820]].map(([x, y]) => el('div', cam, { left: px(x), top: px(y), fontSize: '50px', color: YEL, textShadow: `2px 2px 0 ${INK}`, zIndex: 7 }, '✦'));
  const lab = chip(cam, 110, 640, '¡un bebé!', { size: 60, bg: PINK, z: 30 });
  const seg = chip(cam, 290, 520, 'SEGÚN CONTÓ ELLA', { size: 52, bg: YEL, color: INK, z: 31 });
}

/* ======================================================================
   B1x · «Y TRES: EL BRITANNIC, EN PLENA GUERRA,» — el Britannic entre reflectores y humo
   ====================================================================== */
{
  const c = scene(S.B1x[0], S.B1x[1], t => {
    const tl = t - S.B1x[0];
    set(cam, { s: 1 + 0.05 * p(t, S.B1x[0], 2.4, E.linear) });
    set(bri, { x: lerp(300, 0, p(t, S.B1x[0], 0.6, E.outCubic)) - tl * 16, y: Math.sin(t * 2) * 4 });
    set(sea, { x: -((tl * 50) % 60) });
    BEAM.forEach((b, i) => set(b, { r: -30 + i * 50 + Math.sin(t * 1.3 + i * 2) * 14, o: 0.55 }));
    set(war1, { x: -tl * 30, y: Math.sin(t * 2.2) * 3 });
    popA(lab, t, K.plena - 0.05, { r: -3 });
    FL.forEach((f, i) => { const ph = (tl * 1.4 + i * 0.33) % 1; set(f, { s: ph < 0.2 ? pop(ph * 5, 0, 1) : 1 - (ph - 0.2), o: ph < 0.6 ? 1 - ph : 0 }); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, #3a2f2a 0%, #5d4a3e 60%, #7b6553 100%)` });
  const BEAM = [[160, 1000], [520, 1000], [880, 1000]].map(([x, y]) => { const b = box(cam, x - 40, y - 900, 80, 900, { zIndex: 1, transformOrigin: '40px 900px', background: 'linear-gradient(0deg, rgba(255,240,180,.7), rgba(255,240,180,0))' }); return b; });
  const FL = [[200, 640], [760, 600], [480, 560]].map(([x, y]) => { const f = box(cam, x, y, 120, 120, { zIndex: 1 }); f.innerHTML = svgW(boomInner('#F2983E'), '0 0 600 600'); return f; });
  const war1 = box(cam, 600, 870, 380, 130, { zIndex: 2, filter: 'brightness(.35)' }); war1.innerHTML = svgW(warshipInner(), '0 0 760 260');
  const sea = box(cam, 0, 0, 1140, 1920, { zIndex: 4 }); sea.innerHTML = waterSvg(1010, 500, 29, '#3b4a52', '#c9d6e2', 1140);
  const bri = box(cam, 40, 680, 1000, 333, { zIndex: 3 }); bri.innerHTML = shipSvg({});
  const lab = chip(cam, 300, 1080, 'en plena guerra', { size: 60, bg: RED, color: '#fff', z: 30 });
}

/* ======================================================================
   B2x · «CONVERTIDO EN BARCO HOSPITAL.» — una brocha lo pinta de blanco con cruces rojas
   ====================================================================== */
{
  const c = scene(S.B2x[0], S.B2x[1], t => {
    const kp = p(t, S.B2x[0] + 0.1, K.hospital - S.B2x[0], E.inOutCubic);
    wipe.style.clipPath = `inset(0 ${f1((1 - kp) * 100)}% 0 0)`;
    set(brush, { x: lerp(40, 900, kp), y: Math.sin(t * 14) * 18, r: -20 + Math.sin(t * 14) * 8, o: kp < 0.99 ? 1 : 0 });
    set(crs, { s: pop(t, K.hospital, 0.35), r: 8, o: t < K.hospital ? 0 : 1 });
    set(sea, { x: -(((t - S.B2x[0]) * 40) % 60) });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9E3D6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.06) 0 3px, transparent 3px 80px)' });
  rays(c, -160, 220, 1400, 24, 'rgba(200,16,46,.06)', 'rgba(0,0,0,0)', 0);
  const sea = box(c, 0, 0, 1140, 1920, { zIndex: 4 }); sea.innerHTML = waterSvg(1010, 500, 31, LAGOON, INK, 1140);
  const sh0 = box(c, 40, 680, 1000, 333, { zIndex: 2 }); sh0.innerHTML = shipSvg({});
  const wipe = box(c, 40, 680, 1000, 333, { zIndex: 3 }); wipe.innerHTML = shipSvg({ hospital: true });
  const brush = box(c, 0, 620, 140, 420, { zIndex: 6 }); brush.innerHTML = `<svg viewBox="0 0 140 420" width="140" height="420" style="overflow:visible"><rect x="58" y="0" width="24" height="240" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="30" y="230" width="80" height="40" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><path d="M26,270 H114 L120,400 Q70,420 20,400 Z" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  const crs = box(c, 420, 450, 220, 220, { zIndex: 8 }); crs.innerHTML = `<svg viewBox="0 0 100 100" width="220" height="220" style="overflow:visible">${cut('<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z"/>', 4, 5)}<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/></svg>`;
  chip(c, 290, 1090, 'barco hospital', { size: 64, bg: '#fff', color: RED, z: 30 });
}

/* ======================================================================
   B3x · «CHOCÓ CON UNA MINA Y SE HUNDIÓ.» — sube la mina y ¡BUM!; el barco se inclina y se hunde
   ====================================================================== */
const T_BUM = Math.min(K.minaE - 0.1, K.mina + 0.25);
{
  const c = scene(S.B3x[0], S.B3x[1], t => {
    const km = p(t, S.B3x[0], T_BUM - S.B3x[0], E.inCubic);
    set(mine, { y: lerp(800, 0, km), r: Math.sin(t * 3) * 4, o: t > T_BUM + 0.08 ? 0 : 1 });
    set(boom, { s: pop(t, T_BUM, 0.28) * (1 + 0.1 * Math.sin(t * 20)), r: t * 30, o: t < T_BUM ? 0 : 1 - p(t, T_BUM + 0.8, 0.3) });
    const kt = t > T_BUM ? p(t, T_BUM, 0.3, E.outCubic) : 0, kh = p(t, K.hundia6 - 0.05, 0.9, E.inCubic);
    set(shp, { r: kt * 7 + kh * 10 + Math.sin(t * 2) * 0.5, y: kt * 30 + kh * 260 });
    SM.forEach((s2, i) => { const ks = p(t, T_BUM + 0.05 + i * 0.05, 0.9, E.outCubic); set(s2, { x: (i - 2) * 90 * ks, y: -ks * (180 + i * 30), s: 0.4 + ks * 1.2, o: t > T_BUM && ks < 1 ? 1 - ks * 0.8 : 0 }); });
    BUB.forEach((b, i) => { const ph = ((t - S.B3x[0]) * 0.8 + i * 0.21) % 1; set(b, { y: -ph * 700, o: 0.7 * (1 - ph) }); });
    set(bum, { s: pop(t, T_BUM + 0.02, 0.3), r: -6, o: t < T_BUM ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `linear-gradient(180deg, #cfe0e4 0%, #e9e2cf 39%, ${DEEP} 40%, ${DEEP2} 100%)` });
  box(c, 0, 770, 1080, 1400, { zIndex: 1, background: 'repeating-linear-gradient(100deg, rgba(255,255,255,.05) 0 40px, transparent 40px 130px)' });
  const shp = box(c, 140, 560, 800, 267, { zIndex: 3, transformOrigin: '400px 220px' }); shp.innerHTML = shipSvg({ hospital: true });
  const sfc = box(c, 0, 760, 1080, 1160, { zIndex: 4, background: `linear-gradient(180deg, rgba(18,58,68,.92) 0%, rgba(11,34,41,.96) 100%)` });
  box(c, 0, 752, 1080, 20, { zIndex: 5 }).innerHTML = `<svg width="1080" height="20" style="overflow:visible"><path d="M0,10 ${Array.from({ length: 27 }, () => 'q20,-10 40,0').join(' ')}" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/></svg>`;
  const mine = box(c, 400, 760, 260, 364, { zIndex: 6 }); mine.innerHTML = svgW(mineInner(), '0 0 300 420');
  const boom = box(c, 290, 540, 480, 480, { zIndex: 7 }); boom.innerHTML = svgW(boomInner(), '0 0 600 600');
  const bum = BIGT(c, 0, 1060, 1080, '¡BUM!', { fontSize: '190px', color: YEL, textShadow: OUTL(INK, 10), zIndex: 9 });
  const SM = [0, 1, 2, 3, 4].map(() => box(c, 480, 690, 140, 100, { borderRadius: '50%', background: '#6a645a', border: `4px solid ${INK}`, zIndex: 6 }));
  const BUB = []; for (let i = 0; i < 8; i++) BUB.push(box(c, 200 + i * 90, 1300, 16 + (i % 3) * 8, 16 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 5 }));
  void sfc;
}

/* ======================================================================
   B4x · «ELLA IBA DE ENFERMERA.» — la cofia de camarera se vuelve toca de enfermera
   ====================================================================== */
{
  const c = scene(S.B4x[0], S.B4x[1], t => {
    const km = p(t, K.cruz - 0.1, 0.2, E.outCubic);
    set(v1.d, { s: pop(t, S.B4x[0], 0.35) * (1 + 0.06 * Math.sin(km * Math.PI)), o: 1 - km, y: wobble(t, 0.5, 3) });
    set(v2.d, { s: 1 + 0.06 * Math.sin(km * Math.PI), o: km, y: wobble(t, 0.5, 3) });
    face(v1, t, { look: [-4, 0], bL: 4, bR: 4, seed: 8.1 }); face(v2, t, { look: [-4, 0], bL: 8, bR: 8, seed: 8.1 });
    PF.forEach((f, i) => { const kf = p(t, K.cruz - 0.08, 0.5, E.outCubic); set(f, { x: Math.cos(i * 1.6) * 180 * kf, y: Math.sin(i * 1.6) * 120 * kf, s: 0.4 + kf, o: t > K.cruz - 0.08 && kf < 1 ? 1 - kf : 0 }); });
    popA(cross, t, K.cruz + 0.05, { r: 8 });
    popA(lab, t, K.cruz + 0.1, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E9E3D6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(200,16,46,.06) 0 3px, transparent 3px 80px)' });
  rays(c, -160, 220, 1400, 24, 'rgba(200,16,46,.07)', 'rgba(0,0,0,0)', 0);
  const v1 = mkViolet(c, [290, 520, 500, 639]); v1.d.style.zIndex = 4;
  const v2 = mkViolet(c, [290, 520, 500, 639], { nurse: true }); v2.d.style.zIndex = 5;
  const PF = [0, 1, 2, 3].map(() => box(c, 480, 580, 120, 80, { borderRadius: '50%', background: '#fff', border: `4px solid ${INK}`, zIndex: 6 }));
  const cross = box(c, 760, 520, 130, 130, { zIndex: 8 }); cross.innerHTML = `<svg viewBox="0 0 100 100" width="130" height="130" style="overflow:visible">${cut('<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z"/>', 4, 5)}<path d="M35,5 H65 V35 H95 V65 H65 V95 H35 V65 H5 V35 H35 Z" fill="${RED}" stroke="${INK}" stroke-width="5"/></svg>`;
  const lab = chip(c, 260, 1170, 'con la Cruz Roja', { size: 64, bg: INK, color: '#fff', z: 30 });
}

/* ======================================================================
   P1 · «SU BOTE SALVAVIDAS ACABÓ ARRASTRADO…» — el bote (con ella, con su toca) visto desde arriba
   ====================================================================== */
{
  const c = scene(S.P1[0], S.P1[1], t => {
    const tl = t - S.P1[0];
    set(cam, { s: lerp(1, 1.3, p(t, S.P1[0], S.P1[1] - S.P1[0], E.inOutCubic)) });
    AR1.forEach((a, i) => { const ph = ((t - S.P1[0]) * 1.3 + i / 3) % 1; set(a, { x: lerp(-40, 60, ph), y: lerp(-30, 90, ph), o: (1 - Math.abs(ph - 0.5) * 2) }); });
    set(bt, { x: tl * 70 * p(t, K.arrastrado - 0.2, 0.5), y: Math.sin(t * 2) * 6 + tl * 40 * p(t, K.arrastrado - 0.2, 0.5), r: -8 + tl * 6 });
    RG.forEach((r2, i) => { const ph = (tl * 0.9 + i / 3) % 1; set(r2, { s: 0.6 + ph * 1.2, o: (1 - ph) * 0.7 }); });
    set(wv, { x: -((tl * 30) % 80), y: -((tl * 20) % 60) });
    popA(lab, t, K.arrastrado - 0.05, { r: -4 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '700px 900px' });
  sceneBg(cam, { background: '#2d6f7a' });
  const AR1 = [0, 1, 2].map(i => { const a = box(cam, 320 + i * 150, 1020 + (i % 2) * 40, 160, 140, { zIndex: 6 }); a.innerHTML = arrowSvg('M10,10 Q60,40 120,120 M90,118 L124,126 L120,92', PINK, 10); return a; });
  const wv = box(cam, -100, -100, 1300, 2200, { zIndex: 1, backgroundImage: `repeating-linear-gradient(170deg, rgba(255,255,255,.12) 0 4px, transparent 4px 60px), repeating-linear-gradient(80deg, rgba(0,0,0,.08) 0 3px, transparent 3px 80px)` });
  box(cam, 0, 0, 1080, 520, { zIndex: 2, background: HULL, borderBottom: `8px solid ${INK}` }).innerHTML = `<svg width="1080" height="520"><path d="M0,480 H1080" stroke="#E9DFC8" stroke-width="4" opacity=".6"/>${Array.from({ length: 14 }, (_, k) => `<circle cx="${40 + k * 78}" cy="450" r="9" fill="#E9DFC8" opacity=".6"/>`).join('')}</svg>`;
  const RG = [0, 1, 2].map(() => box(cam, 300, 700, 480, 300, { borderRadius: '50%', border: '5px solid rgba(255,255,255,.6)', zIndex: 3 }));
  const bt = box(cam, 230, 720, 620, 262, { zIndex: 5 });
  bt.innerHTML = svgW(boatTopInner({ heads: [[160, 86], [160, 136], [240, 80], [240, 140], [320, 92], [320, 130]] }) + `<g transform="translate(372,58)"><circle cx="40" cy="52" r="26" fill="#4a2e1c" stroke="${INK}" stroke-width="3"/><g transform="translate(0,0) scale(0.31)">${cofiaInner({ noBow: true })}</g><path d="M16,30 h48 v-14 h-48 z" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="34" y="14" width="12" height="18" fill="${RED}"/></g>`, '0 0 520 220');
  const lab = chip(cam, 520, 1120, 'arrastrado', { size: 56, bg: PINK, z: 30 });
}

/* ======================================================================
   P2 · «…HACIA LAS HÉLICES, QUE SEGUÍAN GIRANDO.» — bajo el agua: la hélice enorme y ella encima
   ====================================================================== */
{
  const c = scene(S.P2[0], S.P2[1], t => {
    const kz = p(t, S.P2[0], S.P2[1] - S.P2[0], E.inCubic);
    set(cam, { s: 1 + 0.16 * kz, x: Math.sin(t * 50) * 3 * kz, y: Math.cos(t * 43) * 3 * kz });
    set(pr, { r: t * (t > K.seguian ? 620 : 380) });
    set(bt, { y: lerp(0, 150, kz), x: lerp(0, 60, kz), r: Math.sin(t * 4) * 4 });
    face(vio, t, { look: [0, 8], bL: 18, bR: 18, seed: 6.6 });
    RT.forEach((a, i) => set(a, { r: -t * 200 + i * 180, o: t > K.seguian - 0.1 ? 0.9 : 0 }));
    BUB.forEach((b, i) => { const ph = ((t - S.P2[0]) * 1.4 + i * 0.13) % 1; set(b, { y: -ph * 700, x: Math.sin(t * 4 + i) * 30, o: 0.8 * (1 - ph) }); });
    popA(lab, t, K.helices - 0.05, { r: 3 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 950px' });
  sceneBg(cam, { background: `radial-gradient(circle at 50% 60%, #1f5560 0%, ${DEEP2} 75%)` });
  box(cam, 0, 0, 1080, 560, { zIndex: 1, background: 'linear-gradient(180deg, #3f8a90 0%, rgba(63,138,144,.4) 100%)' });
  const pr = box(cam, 200, 700, 680, 680, { zIndex: 4 }); pr.innerHTML = svgW(propInner(3), '0 0 400 400');
  const RT = [0, 1].map(() => { const a = box(cam, 160, 660, 760, 760, { zIndex: 5 }); a.innerHTML = `<svg viewBox="0 0 840 840" width="760" height="760" style="overflow:visible"><path d="M420,40 A380,380 0 0,1 790,360" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M420,40 A380,380 0 0,1 790,360" stroke="${PINK}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M760,330 L796,380 L820,318" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M760,330 L796,380 L820,318" stroke="${PINK}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`; return a; });
  // el bote por debajo, con Violet asomada (se ve que es ELLA la que va hacia la hélice)
  const bt = box(cam, 230, 470, 600, 360, { zIndex: 6 });
  const vio = mkViolet(bt, [190, -60, 220, 281], { nurse: true }); vio.d.style.zIndex = 1;
  box(bt, 0, 0, 600, 360, { zIndex: 2 }).innerHTML = `<svg width="600" height="360" style="overflow:visible"><path d="M20,190 C120,320 480,320 580,190 Z" fill="#2a1f17" stroke="${INK}" stroke-width="6"/><path d="M0,190 H600" stroke="#cfe0e4" stroke-width="7"/></svg>`;
  const BUB = []; for (let i = 0; i < 12; i++) BUB.push(box(cam, 140 + i * 70, 1300, 14 + (i % 3) * 8, 14 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 6 }));
  const lab = chip(cam, 560, 1110, '¡las hélices!', { size: 58, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   P3 · GOLPE AMARILLO: «ASÍ QUE SALTÓ AL AGUA,» — silueta en el aire
   ====================================================================== */
colorHit(S.P3[0], S.P3[1], YEL, c => {
  const big = el('div', c, { left: 0, top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', color: INK, zIndex: 10, whiteSpace: 'nowrap' }, '¡SALTÓ!');
  const jm = box(c, 360, 760, 360, 504, { zIndex: 8 }); jm.innerHTML = svgW(jumperInner(INK), '0 0 400 560');
  const sp = box(c, 200, 1230, 680, 120, { zIndex: 7 }); sp.innerHTML = `<svg width="680" height="120" style="overflow:visible"><path d="M0,80 ${Array.from({ length: 17 }, () => 'q20,-24 40,0').join(' ')}" stroke="${INK}" stroke-width="10" fill="none"/></svg>`;
  const ag = chip(c, 600, 1150, 'al agua', { size: 56, bg: INK, color: YEL, z: 12 });
  return t => {
    const kb = p(t, K.salto - 0.04, 0.16, E.outBack);
    set(big, { s: t < K.salto - 0.04 ? 0 : lerp(1.6, 1, kb), r: -4, o: t < K.salto - 0.04 ? 0 : 1 });
    const up = p(t, S.P3[0], 0.3, E.outCubic), fall = p(t, K.agua - 0.1, 0.4, E.inCubic);
    set(jm, { y: lerp(260, -30, up) + fall * 200, r: lerp(-10, 6, up) + fall * 10, s: 1 });
    popA(ag, t, K.agua - 0.05, { r: 4 });
  };
});

/* ======================================================================
   P4 · «SE GOLPEÓ LA CABEZA…» — chapuzón, oscuridad y ¡PUM!
   ====================================================================== */
{
  const c = scene(S.P4[0], S.P4[1], t => {
    const ks = p(t, S.P4[0], 0.35, E.outCubic);
    set(spl, { s: 0.5 + ks * 1.4, o: 1 - ks });
    dark.style.opacity = 0.15 + 0.5 * p(t, K.cabeza - 0.2, 0.5);
    const kh = t > K.cabeza ? p(t, K.cabeza, 0.25, E.outBack) : 0;
    set(vio.d, { y: lerp(-120, 0, p(t, S.P4[0], 0.5, E.outCubic)) + wobble(t, 0.6, 4), r: kh * 18 + wobble(t, 0.4, 2) });
    face(vio, t, { closed: t > K.cabeza, look: [0, 0], bL: 10, bR: 10, seed: 9.9 });
    ST.forEach((s2, i) => { const a = t * 5 + i * 2.1; set(s2, { x: Math.cos(a) * 170, y: Math.sin(a) * 50, o: t > K.cabeza + 0.05 ? 1 : 0, r: t * 200 }); });
    set(pum, { s: pop(t, K.cabeza, 0.3), r: -10, o: t < K.cabeza ? 0 : 1 });
    BUB.forEach((b, i) => { const ph = ((t - S.P4[0]) * 1.2 + i * 0.19) % 1; set(b, { y: -ph * 800, o: 0.8 * (1 - ph) }); });
  }, { clip: true, cut: true });
  sceneBg(c, { background: `linear-gradient(180deg, #2d6f7a 0%, ${DEEP} 40%, ${DEEP2} 100%)` });
  const vio = mkViolet(c, [330, 600, 420, 537], { nurse: true }); vio.d.style.zIndex = 4;
  const spl = box(c, 240, 520, 600, 300, { zIndex: 5, borderRadius: '50%', border: '14px solid #fff' });
  const ST = [0, 1, 2, 3].map(() => el('div', c, { left: '510px', top: '640px', fontSize: '64px', color: YEL, textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 7 }, '✦'));
  const pum = box(c, 560, 500, 340, 340, { zIndex: 8 }); pum.innerHTML = svgW(boomInner(YEL) + `<text x="300" y="350" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="150" fill="#fff" stroke="${INK}" stroke-width="8" paint-order="stroke">¡PUM!</text>`, '0 0 600 600');
  const dark = box(c, 0, 0, 1080, 1920, { zIndex: 6, background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 22%, rgba(0,0,0,.9) 70%)' });
  const BUB = []; for (let i = 0; i < 10; i++) BUB.push(box(c, 260 + i * 55, 1240, 14 + (i % 3) * 8, 14 + (i % 3) * 8, { borderRadius: '50%', border: '3px solid #cfe0e4', zIndex: 5 }));
}

/* ======================================================================
   P5 · «…Y SOBREVIVIÓ OTRA VEZ.» — sale a flote con el salvavidas; sello «¡OTRA VEZ!»
   ====================================================================== */
{
  const c = scene(S.P5[0], S.P5[1], t => {
    const ku = p(t, S.P5[0], 0.5, E.outBack);
    set(vio.d, { y: lerp(420, 0, ku) + wobble(t, 0.6, 3) });
    face(vio, t, { look: [4, -6], bL: 12, bR: 12, seed: 10.4 });
    set(ring, { y: lerp(420, 0, ku) + Math.sin(t * 2.4) * 6, r: Math.sin(t * 2) * 4 });
    set(wt, { x: -(((t - S.P5[0]) * 40) % 60) });
    stampA(stO, t, K.salio - 0.05, -6, 1);
    set(ry, { r: t * 10, o: t > K.aun ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #f2b8c6 0%, #f7d7a8 60%)' });
  const ry = rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const vClip = box(c, 300, 560, 480, 600, { overflow: 'hidden', zIndex: 4 });
  const vio = mkViolet(vClip, [40, 40, 400, 511], { nurse: true });
  const ring = box(c, 330, 1000, 420, 200, { zIndex: 6 }); ring.innerHTML = `<svg width="420" height="200" style="overflow:visible"><ellipse cx="210" cy="100" rx="180" ry="70" fill="none" stroke="${INK}" stroke-width="64"/><ellipse cx="210" cy="100" rx="180" ry="70" fill="none" stroke="#fff" stroke-width="52"/><ellipse cx="210" cy="100" rx="180" ry="70" fill="none" stroke="${RED}" stroke-width="52" stroke-dasharray="70 70"/></svg>`;
  const wt = box(c, 0, 0, 1140, 1920, { zIndex: 5 }); wt.innerHTML = waterSvg(1110, 300, 31, '#6f8fa6', INK, 1140);
  const stO = stamp(c, 210, 560, '¡SALIÓ VIVA!', { size: 100, bw: 14, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   C1 · «…VOLVIÓ A SU CAMAROTE A POR UNA SOLA COSA…» — pasillo inclinado, la puerta se abre
   ====================================================================== */
{
  const c = scene(S.C1[0], S.C1[1], t => {
    set(cor, { r: 9 + Math.sin(t * 1.5) * 1, s: 1 + 0.25 * p(t, S.C1[0], S.C1[1] - S.C1[0], E.inCubic) });
    const kd = p(t, K.camarote - 0.05, 0.4, E.outCubic);
    set(door, { sx: lerp(1, 0.12, kd) });
    lite.style.opacity = kd;
    popA(lab, t, K.camarote - 0.05, { r: -3 });
    popA(lab2, t, K.sola - 0.05, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2a1e' });
  const cor = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 820px' }); cor.innerHTML = corridorSvg();
  const lite = box(cor, 390, 610, 300, 420, { background: 'radial-gradient(circle at 50% 50%, #FFF3A8, #FFE600 60%, #d9a44a)', zIndex: 3 });
  const door = box(cor, 390, 610, 300, 420, { zIndex: 4, transformOrigin: '0px 210px', background: WOOD, border: `6px solid ${INK}`, boxSizing: 'border-box' });
  door.innerHTML = `<div style="position:absolute;left:30px;top:30px;width:228px;height:150px;border:4px solid ${INK}"></div><div style="position:absolute;left:30px;top:210px;width:228px;height:160px;border:4px solid ${INK}"></div><div style="position:absolute;left:236px;top:196px;width:22px;height:22px;border-radius:50%;background:${BRASS};border:3px solid ${INK}"></div>`;
  const lab = chip(c, 150, 1110, 'volvió a su camarote', { size: 58, bg: INK, color: YEL, z: 30 });
  const lab2 = chip(c, 330, 1210, 'a por UNA cosa', { size: 52, bg: PINK, z: 30 });
}

/* ======================================================================
   C2 · «…AHORA TE DIGO CUÁL.» — dentro del camarote: un fardo tapado con un «?» enorme
   ====================================================================== */
headline(S.C2[0], S.C2[1], 'Ahora te digo *cuál*', { size: 110, hlT: K.cual, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.C2[0], S.C2[1], t => {
    set(rm, { r: 7 + Math.sin(t * 1.4) * 1.2 });
    set(q, { s: pop(t, S.C2[0] + 0.05, 0.4) * (1 + 0.06 * Math.sin(t * 7)), r: Math.sin(t * 4) * 8, o: 1 });
    set(gl, { s: 0.9 + 0.1 * Math.sin(t * 6), o: 0.8 });
    set(cl, { y: Math.sin(t * 3) * 4 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2b2118' });
  const rm = box(c, -100, -100, 1280, 2120, { zIndex: 1, transformOrigin: '640px 1000px' });
  rm.innerHTML = `<svg width="1280" height="2120" style="overflow:visible"><rect x="0" y="0" width="1280" height="2120" fill="#c9b285"/><rect x="0" y="0" width="1280" height="2120" fill="url(#hW)" opacity=".2"/>${Array.from({ length: 12 }, (_, k) => `<path d="M${k * 110},0 V2120" stroke="${INK}" stroke-width="3" opacity=".25"/>`).join('')}
   <circle cx="900" cy="560" r="110" fill="#1d2a3c" stroke="${BRASS}" stroke-width="26"/><circle cx="900" cy="560" r="110" fill="none" stroke="${INK}" stroke-width="5"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<circle cx="${f1(900 + Math.cos(k * Math.PI / 4) * 124)}" cy="${f1(560 + Math.sin(k * Math.PI / 4) * 124)}" r="8" fill="${INK}"/>`).join('')}
   <rect x="120" y="1240" width="800" height="90" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="140" y="1190" width="760" height="60" rx="20" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  const gl = box(c, 240, 620, 600, 600, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,230,0,.6), rgba(255,230,0,0))' });
  const cl = box(c, 340, 900, 400, 300, { zIndex: 3 }); cl.innerHTML = `<svg viewBox="0 0 400 300" width="400" height="300" style="overflow:visible">${cut('<path d="M20,280 C10,160 80,60 200,60 C320,60 390,160 380,280 Z"/>', 6, 8)}<path d="M20,280 C10,160 80,60 200,60 C320,60 390,160 380,280 Z" fill="#EFE6CF" stroke="${INK}" stroke-width="6"/><path d="M20,280 C10,160 80,60 200,60 C320,60 390,160 380,280 Z" fill="url(#hA)" opacity=".3"/><path d="M80,140 Q200,100 320,140 M60,210 Q200,170 340,210" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/></svg>`;
  const q = qMark(c, 430, 620, 300, YEL);
}

/* ======================================================================
   P0 · «Y ENTONCES VINO LO PEOR:» — la popa del Britannic asoma y se ven las hélices
   ====================================================================== */
headline(S.P0[0], S.P0[1], 'Y entonces vino *lo peor*', { size: 100, hlT: K.peor, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.P0[0], S.P0[1], t => {
    const k = p(t, S.P0[0], S.P0[1] - S.P0[0], E.inOutCubic);
    set(cam, { s: 1 + 0.12 * k });
    set(stern, { r: 12 + 6 * k, y: 120 + 60 * k + Math.sin(t * 1.6) * 6 });
    PR.forEach((pr, i) => set(pr, { r: t * 260 * (i ? -1 : 1) }));
    set(sea, { x: -(((t - S.P0[0]) * 40) % 60) });
    flash.style.opacity = t > K.peor - 0.05 && t < K.peor + 0.15 ? 0.6 : 0;
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, #3a2f2a 0%, #6b5646 100%)` });
  const stern = box(cam, 40, 640, 1000, 333, { zIndex: 2, transformOrigin: '500px 300px' }); stern.innerHTML = shipSvg({ hospital: true });
  const SMK = [0, 1, 2, 3, 4].map(i => box(cam, 300 + i * 90, 600, 140, 100, { borderRadius: '50%', background: 'rgba(70,60,52,.75)', border: `4px solid ${INK}`, zIndex: 1 }));
  SCX.push(t => { if (t < S.P0[0] || t >= S.P0[1]) return; SMK.forEach((m, i) => { const ph = ((t - S.P0[0]) * 0.8 + i * 0.2) % 1; set(m, { x: -ph * 120, y: -ph * 420, s: 0.6 + ph * 1.4, o: 1 - ph * 0.7 }); }); });
  const PR = [[60, 1060], [300, 1110]].map(([x, y]) => { const d = box(cam, x, y, 200, 200, { zIndex: 3 }); d.style.display = 'none'; d.innerHTML = svgW(propInner(3), '0 0 400 400'); return d; });
  const sea = box(cam, 0, 0, 1140, 1920, { zIndex: 4 }); sea.innerHTML = waterSvg(1110, 500, 37, '#3b4a52', '#c9d6e2', 1140);
  const flash = box(cam, 0, 0, 1080, 1920, { zIndex: 9, background: '#fff', opacity: 0 });
}

/* rótulo del CAMAROTE con «?»: la promesa de L6 sigue abierta hasta que se paga en L9 */
{
  const tag = el('div', world, { left: '40px', top: '486px', zIndex: 790, visibility: 'hidden' });
  tag.innerHTML = `<svg width="150" height="170" style="overflow:visible">${cut('<rect x="10" y="10" width="120" height="150" rx="10"/>', 5, 6)}<rect x="10" y="10" width="120" height="150" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="26" y="26" width="88" height="118" rx="4" fill="none" stroke="${INK}" stroke-width="3"/><circle cx="108" cy="90" r="7" fill="${BRASS}" stroke="${INK}" stroke-width="2"/><text x="70" y="112" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="96" fill="${YEL}" stroke="${INK}" stroke-width="4" paint-order="stroke">?</text></svg>`;
  const T0 = S.P0[0], T1 = S.R1[0];
  SCX.push(t => { const on = t >= T0 && t < T1; tag.style.visibility = on ? 'visible' : 'hidden'; if (on) set(tag, { s: pop(t, T0, 0.35), r: -6 + Math.sin(t * 3) * 4, y: Math.sin(t * 2.2) * 5 }); });
}
