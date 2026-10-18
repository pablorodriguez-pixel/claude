/* Ep. 37 · escenas L0–L3 (gancho, contexto, marca, bucle numerado) — todo clavado por texto vía K */
const WAVES = (seed, col, line, h = 1100) => waterSvg(0, h, seed, col, line);

/* ======================================================================
   A · PORTADA (fotograma 0): la proa del Titanic hundiéndose + «¿SOBREVIVIÓ A 3 NAUFRAGIOS?»
   «Esta mujer…» → Violet asoma del agua con su cofia
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    const tl = Math.max(0, t);
    set(cam, { s: 1.0 + 0.07 * p(t, 0, 2.4, E.linear) });
    // la proa ya va inclinada en el fotograma 0 y se hunde
    const kr = p(t, 0, 2.4, E.linear);
    set(bow, { r: 10 + 9 * kr + Math.sin(t * 2.6) * 1.2, y: 90 * kr + wobble(t, 0.4, 4), s: 1.05 });
    set(buoy, { y: Math.sin(t * 2.1) * 10, r: Math.sin(t * 1.7) * 8 }); set(plank, { y: Math.sin(t * 2.3 + 1) * 8, r: -12 + Math.sin(t * 1.9) * 6 });
    set(chair, { y: Math.sin(t * 1.9 + 2) * 9, r: 18 + Math.sin(t * 1.6) * 6 });
    MR.forEach((m, i) => set(m, { x: Math.sin(t * 3 + i) * 14, o: 0.35 + 0.25 * Math.sin(t * 4 + i * 2) }));
    set(wat, { x: -((tl * 30) % 60) });
    set(fwave, { x: -((tl * 50) % 60), y: Math.sin(t * 2.4) * 6 });
    // título vivo desde el fotograma 0
    set(l1, { r: -2 + wobble(t, 0.5, 0.7), s: 1 + 0.02 * Math.sin(t * 3.1) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.7, 1), s: 1 + 0.035 * Math.sin(t * 3.1 + 1) });
    set(l3, { r: -1 + wobble(t, 0.5, 0.7, 2), s: 1 + 0.02 * Math.sin(t * 3.1 + 2) });
    // Violet, a salvo DENTRO de un bote salvavidas desde el fotograma 0 (se mece)
    set(lbt, { y: Math.sin(t * 3.1) * 16, r: Math.sin(t * 2.6) * 6 });
    stampA(stT, t, K.tragedia - 0.04, -6, 1);
    face(vio, t, { look: [-6, -4], bL: t > K.tragedia ? 12 : 6, bR: t > K.tragedia ? 12 : 6, seed: 0.4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 55%, #5d6f86 100%)` });
  svgBox(cam, 0, 0, 1080, 1100, stars(90, 7, 1080, 1000), '0 0 1080 1100', 1);
  box(cam, 700, 820, 160, 160, { borderRadius: '50%', background: 'radial-gradient(circle, #FBF6EA 0 38%, rgba(251,246,234,.25) 40%, rgba(251,246,234,0) 70%)', zIndex: 1 });
  const bow = box(cam, -300, 840, 1300, 760, { zIndex: 3, transformOrigin: '1100px 520px' });
  bow.innerHTML = svgW(bowInner(), '0 0 1300 760');
  const wat = box(cam, 0, 1250, 1140, 1100, { zIndex: 5 }); wat.innerHTML = WAVES(11, '#152131', '#c9d6e2');
  const MR = [0, 1, 2, 3, 4, 5].map(i => box(cam, 640 + (i % 3) * 40 - 20, 1430 + i * 60, 220 - i * 18, 10, { zIndex: 9, borderRadius: '6px', background: '#FBF6EA' }));
  const buoy = box(cam, 80, 1470, 200, 120, { zIndex: 10 }); buoy.innerHTML = `<svg width="200" height="120" style="overflow:visible"><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="${INK}" stroke-width="40"/><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="#fff" stroke-width="30"/><ellipse cx="100" cy="60" rx="86" ry="40" fill="none" stroke="${RED}" stroke-width="30" stroke-dasharray="44 44"/></svg>`;
  const plank = box(cam, 380, 1600, 300, 50, { zIndex: 10, background: WOOD, border: `5px solid ${INK}`, borderRadius: '6px' });
  const chair = box(cam, 300, 1380, 150, 90, { zIndex: 8 }); chair.innerHTML = `<svg width="150" height="90" style="overflow:visible"><path d="M10,70 L60,10 L140,30 L100,80 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><path d="M30,50 L110,62 M44,32 L124,46" stroke="${INK}" stroke-width="3"/></svg>`;
  box(cam, 0, 1250, 1080, 900, { zIndex: 6, background: 'linear-gradient(180deg, rgba(10,18,28,0) 0%, rgba(10,18,28,.55) 100%)' });
  const lbt = box(cam, 380, 1010, 540, 420, { zIndex: 9, transformOrigin: '270px 330px' });
  const vio = mkViolet(lbt, [120, 0, 300, 383]); vio.d.style.zIndex = 1;
  box(lbt, 0, 260, 540, 216, { zIndex: 2 }).innerHTML = svgW(lifeboatInner(), '0 0 600 240');
  const fwave = box(cam, -30, 1350, 1140, 120, { zIndex: 8 });
  fwave.innerHTML = `<svg width="1140" height="120" style="overflow:visible"><path d="M0,30 ${Array.from({ length: 20 }, () => `q30,-22 60,0`).join(' ')} V700 H0 Z" fill="#152131"/><path d="M0,30 ${Array.from({ length: 20 }, () => `q30,-22 60,0`).join(' ')}" fill="none" stroke="#dfe8ef" stroke-width="5"/><path d="M0,60 ${Array.from({ length: 28 }, () => 'q20,-12 40,0').join(' ')}" stroke="#dfe8ef" stroke-width="2.5" fill="none" opacity=".5"/></svg>`;
  // la pregunta (≤ 6 palabras), borde superior por debajo de y≈300 (recorte del perfil)
  const stT = stamp(cam, 150, 850, 'TÚ: TRAGEDIA', { size: 84, bw: 12, z: 45, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const l1 = BIGT(cam, 0, 318, 1080, '¿SALIÓ VIVA', { fontSize: '128px', color: '#FBF6EA', textShadow: OUTL(INK, 9), zIndex: 40 });
  const l2 = BIGT(cam, 0, 446, 1080, `DE LOS <span style="color:${YEL};font-size:250px;line-height:0.8">3</span>`, { fontSize: '140px', color: '#FBF6EA', textShadow: OUTL(INK, 10), zIndex: 40 });
  const l3 = BIGT(cam, 0, 668, 1080, 'BARCOS?', { fontSize: '128px', color: '#FBF6EA', textShadow: OUTL(INK, 9), zIndex: 40 });
}

/* ======================================================================
   A2 · «…Y NO FUE LO MÁS RARO DE SU VIDA» — Violet, y detrás dos barcos más con «?»
   ====================================================================== */
{
  const c = scene(S.A2[0], S.A2[1], t => {
    set(ry, { r: t * 9 });
    set(cam, { s: 1 + 0.05 * p(t, S.A2[0], 2, E.linear) });
    set(vio.d, { s: pop(t, S.A2[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [5, -3], bL: t > K.segundo ? 4 : 10, bR: t > K.segundo ? 18 : 10, seed: 0.9 });
    SH3.forEach((s2, i) => set(s2, { x: (1 - p(t, S.A2[0] + 0.15 + i * 0.12, 0.35, E.outBack)) * (i ? 700 : -700), y: Math.sin(t * 2 + i) * 6, o: 1 }));
    stampA(st2, t, K.segundo - 0.05, -6, 1); set(stT2, { s: 0.8, r: -6, o: 0.9 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  const ry = rays(cam, -160, 160, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const vio = mkViolet(cam, [300, 470, 480, 614]); vio.d.style.zIndex = 5;
  const SH3 = [[70, 1110], [380, 1130], [690, 1110]].map(([x, y], i) => { const d = box(cam, x, y, 310, 104, { zIndex: 6 }); d.innerHTML = shipSvg({ hospital: i === 2 }); if (i === 1) d.style.filter = 'none'; return d; });
  const st2 = stamp(cam, 130, 1000, 'ELLA: 2.º SUSTO', { size: 84, bw: 12, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
  const stT2 = stamp(cam, 240, 250, 'TÚ: TRAGEDIA', { size: 70, bw: 10, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
}

/* ======================================================================
   B1 · «SE LLAMABA VIOLET JESSOP» — retrato + nombre a máquina
   ====================================================================== */
{
  const NAME = 'VIOLET JESSOP';
  const c = scene(S.B1[0], S.B1[1], t => {
    set(ry, { r: t * 9 });
    set(cam, { s: 1 + 0.06 * p(t, S.B1[0], 2, E.linear) });
    set(vio.d, { s: pop(t, S.B1[0], 0.4), y: wobble(t, 0.5, 4), o: 1 });
    face(vio, t, { look: [3, -2], bL: 6, bR: 6, seed: 1.1 });
    const n = Math.min(NAME.length, Math.max(0, Math.floor((t - K.violet + 0.05) * 18)));
    nm.textContent = NAME.slice(0, n) + (n < NAME.length && Math.floor(t * 6) % 2 ? '|' : '');
    set(strip, { s: pop(t, K.violet - 0.12, 0.3), r: -1.5, o: t < K.violet - 0.12 ? 0 : 1 });
    popA(lab, t, S.B1[0] + 0.1, { r: -3 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#EFE1C6' });
  const ry = rays(cam, -160, 160, 1400, 26, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 55%, rgba(255,230,0,.35), rgba(255,230,0,0) 52%)' });
  const vio = mkViolet(cam, [210, 520, 660, 843]); vio.d.style.zIndex = 5;
  const strip = box(cam, 90, 290, 900, 150, { zIndex: 20, background: '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `9px 10px 0 ${SH}` });
  const nm = el('div', strip, { left: 0, top: '22px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '100px', lineHeight: '110px', color: INK, whiteSpace: 'nowrap' }, '');
  const lab = chip(cam, 110, 230, 'Se llamaba…', { size: 44, bg: INK, color: YEL, z: 25 });
}

/* ======================================================================
   B2 · «ERA CAMARERA DE BARCOS» — Violet con la bandeja, en cubierta
   ====================================================================== */
headline(S.B2[0], S.B2[1], 'Era *camarera de barco*', { size: 96, hlT: K.camarera });
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(cam, { s: 1.04 + 0.05 * p(t, S.B2[0], 1.6, E.linear) });
    set(shp, { x: -((t - S.B2[0]) * 50), y: Math.sin(t * 2) * 4 });
    set(wt, { x: -(((t - S.B2[0]) * 40) % 60) });
    set(vio.d, { s: pop(t, S.B2[0] + 0.05, 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [5, 0], bL: 4, bR: 4, seed: 1.7 });
    set(tray, { s: pop(t, K.camarera - 0.05, 0.35), r: -4 + Math.sin(t * 3) * 3, o: t < K.camarera - 0.05 ? 0 : 1 });
    set(gull, { x: (t - S.B2[0]) * 160, y: Math.sin(t * 6) * 14 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #9cc3d6 0%, #d7e6e6 50%, #EFE1C6 100%)' });
  const shp = box(cam, 120, 560, 900, 300, { zIndex: 1 }); shp.innerHTML = shipSvg({});
  const wt = box(cam, 0, 0, 1140, 1920, { zIndex: 2 }); wt.innerHTML = waterSvg(800, 600, 41, LAGOON, INK, 1140);
  const gull = el('div', cam, { left: '120px', top: '470px', zIndex: 2 }, `<svg width="90" height="40" style="overflow:visible"><path d="M0,20 q22,-24 45,0 q22,-24 45,0" stroke="${INK}" stroke-width="6" fill="none"/></svg>`);
  const vio = mkViolet(cam, [280, 640, 470, 601]); vio.d.style.zIndex = 4;
  const tray = box(cam, 620, 930, 300, 160, { zIndex: 6 });
  tray.innerHTML = `<svg viewBox="0 0 300 160" width="300" height="160" style="overflow:visible">${cut('<ellipse cx="150" cy="120" rx="140" ry="30"/>', 5, 6)}<ellipse cx="150" cy="120" rx="140" ry="30" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><ellipse cx="150" cy="114" rx="116" ry="20" fill="#f3d27a" stroke="${INK}" stroke-width="3"/>
   <path d="M80,110 L86,64 L134,64 L140,110 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M140,74 q22,4 4,26" stroke="${INK}" stroke-width="4" fill="none"/><path d="M96,56 q-6,-16 4,-28 M116,56 q-6,-16 4,-28" stroke="${INK}" stroke-width="3" fill="none" opacity=".6"/>
   <path d="M176,112 L186,40 L214,40 L224,112 Z" fill="#cfe6f0" stroke="${INK}" stroke-width="4"/><path d="M200,40 V24" stroke="${INK}" stroke-width="5"/></svg>`;
  box(cam, 0, 0, 1080, 1920, { zIndex: 5 }).innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="0" y="1060" width="1080" height="20" fill="#fff" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 18 }, (_, k) => `<path d="M${30 + k * 60},1080 V1200" stroke="#fff" stroke-width="10"/><path d="M${30 + k * 60},1080 V1200" stroke="${INK}" stroke-width="2.5" fill="none"/>`).join('')}<rect x="0" y="1200" width="1080" height="160" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="1200" width="1080" height="160" fill="url(#hW)" opacity=".35"/></svg>`;
}

/* ======================================================================
   H · «…Y VIAJÓ EN LOS TRES HERMANOS GEMELOS DEL TITANIC. LOS TRES TUVIERON UN ACCIDENTE.»
   ====================================================================== */
const CW = 250, CX3 = [60, 375, 690], CY3 = 560;
headline(S.H1[0], S.H1[1], 'Trabajó en el Titanic… *y en sus dos gemelos*', { size: 84, hlT: K.gemelos, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
headline(S.H2[0], S.H2[1], 'En los tres hubo *un accidente*… con ella a bordo', { size: 82, hlT: K.accidente, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.H1[0], S.H2[1], t => {
    const inH2 = t >= S.H2[0];
    set(cam, { s: (inH2 ? 1.06 : 1) + 0.03 * p(t, inH2 ? S.H2[0] : S.H1[0], 2.5, E.linear), y: inH2 ? -30 : 0 });
    set(ry, { r: t * 6 });
    const ks = [K.dos1 - 0.05, K.titanic1 - 0.1, K.gemelos - 0.05];
    CC.forEach((cc, i) => {
      const k = p(t, ks[i], 0.4, E.outBack);
      set(cc.d, { y: (1 - k) * 900, r: (i - 1) * 3 + wobble(t, 0.4, 0.8, i) + (inH2 && t > CR[i] ? Math.sin((t - CR[i]) * 40) * 3 * (1 - p(t, CR[i], 0.4)) : 0), o: 1 });
    });
    CC[1].glow.style.opacity = t > K.titanic1 - 0.05 && !inH2 ? 0.8 : 0;
    // la cofia de Violet salta de carta en carta: 1 → 2 → 3
    const jumps = [[K.con1 - 0.05, 0], [K.ella1 + 0.05, 1], [K.bordo1, 2]];
    let cx = CX3[0] + CW / 2 - 70, cy = CY3 - 70, sc = 0, rr = 0;
    jumps.forEach(([tj, i], j) => {
      if (t < tj) return;
      const kj = p(t, tj, 0.3, E.inOutCubic);
      const fx = j ? CX3[i - 1] + CW / 2 - 70 : CX3[0] + CW / 2 - 70, tx = CX3[i] + CW / 2 - 70;
      cx = lerp(fx, tx, kj); cy = CY3 - 70 - Math.sin(kj * Math.PI) * (j ? 160 : 0) - (j ? 0 : (1 - kj) * 400); sc = 1; rr = Math.sin(kj * Math.PI) * 20;
    });
    set(cof, { x: cx, y: cy + wobble(t, 0.8, 3), s: sc, r: rr, o: t < K.con1 - 0.05 ? 0 : 1 });
    // «Los tres tuvieron un accidente»: un ¡CRAC! en cada carta
    BG.forEach((b, i) => { set(b, { s: pop(t, CR[i], 0.3) * (1 + 0.06 * Math.sin(t * 12 + i)), r: t * 30 + i * 40, o: t < CR[i] ? 0 : 1 }); });
    XC.forEach((x, i) => { x.style.strokeDashoffset = f1(1000 * (1 - p(t, CR[i], 0.25))); });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  sceneBg(cam, { background: '#2f5a46', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.18), rgba(0,0,0,.35) 80%)' });
  const ry = rays(cam, -160, 120, 1400, 26, 'rgba(255,255,255,.06)', 'rgba(0,0,0,0)', 0);
  const CC = [mkCard(cam, CX3[0], CY3, 1, 'OLYMPIC', '1911', { w: CW }), mkCard(cam, CX3[1], CY3, 2, 'TITANIC', '1912', { w: CW, z: 12 }), mkCard(cam, CX3[2], CY3, 3, 'BRITANNIC', '1916', { w: CW, hospital: true })];
  const cof = box(cam, 0, 0, 140, 70, { zIndex: 30 }); cof.innerHTML = cofiaSvg();
  const CR = [K.tres1, K.hubo, K.accidente];
  const BG = CX3.map(x => { const b = box(cam, x + 45, CY3 + 330, 160, 160, { zIndex: 25 }); b.innerHTML = svgW(boomInner(YEL) + `<text x="300" y="370" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="230" fill="#fff" stroke="${INK}" stroke-width="10" paint-order="stroke">!</text>`, '0 0 600 600'); return b; });
  const XC = CX3.map((x, i) => { const b = box(cam, x, CY3, CW, CW * 400 / 270, { zIndex: 24 }); b.innerHTML = `<svg width="${CW}" height="${f1(CW * 400 / 270)}" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" d="M${CW * 0.55},0 L${CW * 0.42},${CW * 0.5} L${CW * 0.6},${CW * 0.8} L${CW * 0.45},${CW * 1.2}" stroke="${RED}" stroke-width="9" fill="none" stroke-linejoin="round"/></svg>`; return b.querySelector('path'); });
}

/* ======================================================================
   M · «TE LOS CUENTO UNO A UNO.» — tres medallones numerados (el bucle numerado)
   ====================================================================== */
headline(S.Q[0], S.Q[1], '¿Y cómo se sale *viva* de los tres?', { size: 88, hlT: K.viva3, color: '#FBF6EA', shadow: `5px 5px 0 ${INK}`, keyColor: YEL, hlc: 'rgba(255,62,165,.9)' });
{
  const c = scene(S.Q[0], S.Q[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, S.Q[0], 1.9, E.linear) });
    set(vio.d, { s: pop(t, S.Q[0], 0.35), y: wobble(t, 0.5, 3), o: 1 });
    face(vio, t, { look: [0, -6], bL: 14, bR: 14, seed: 2.9 });
    SH3.forEach((s2, i) => set(s2, { y: Math.sin(t * 2 + i) * 6 }));
    QQ.forEach((q, i) => set(q, { s: pop(t, K.tres3 - 0.1 + i * 0.12, 0.3), r: Math.sin(t * 6 + i) * 12, o: t < K.tres3 - 0.1 + i * 0.12 ? 0 : 1 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT2} 100%)` });
  svgBox(cam, 0, 0, 1080, 1000, stars(70, 3, 1080, 1000), '0 0 1080 1000', 1);
  const vio = mkViolet(cam, [330, 470, 420, 537]); vio.d.style.zIndex = 5;
  const SH3 = [[70, 1080], [380, 1100], [690, 1080]].map(([x, y], i) => { const d = box(cam, x, y, 310, 104, { zIndex: 6 }); d.innerHTML = shipSvg({ hospital: i === 2 }); return d; });
  const QQ = [[170, 930], [480, 950], [790, 930]].map(([x, y]) => qMark(cam, x, y, 130, YEL));
}
headline(S.M[0], S.M[1], 'Te lo cuento *barco a barco*', { size: 96, hlT: K.barco3 });
{
  const c = scene(S.M[0], S.M[1], t => {
    set(ry, { r: t * 10 });
    MD.forEach((m, i) => {
      const k = p(t, S.M[0] + 0.05 + i * 0.12, 0.4, E.outBack);
      const pulse = i === 0 ? 0.12 * Math.sin(clamp((t - K.barco3) / 0.4) * Math.PI) : i === 1 ? 0.12 * Math.sin(clamp((t - K.barco3b) / 0.4) * Math.PI) : 0;
      set(m.d, { y: (1 - k) * 800 + wobble(t, 0.5, 4, i), s: 1 + pulse, r: (i - 1) * 4, o: 1 });
    });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#EFE1C6' });
  const ry = rays(c, -160, 220, 1400, 24, 'rgba(255,62,165,.09)', 'rgba(0,0,0,0)', 0);
  const NM = ['OLYMPIC', 'TITANIC', 'BRITANNIC'];
  const MD = [80, 380, 680].map((x, i) => {
    const d = box(c, x, 520, 300, 470, { zIndex: 5 });
    d.innerHTML = `<svg viewBox="0 0 300 470" width="300" height="470" style="overflow:visible">${cut('<circle cx="150" cy="140" r="130"/>', 7, 9)}<circle cx="150" cy="140" r="130" fill="${i === 0 ? YEL : '#FBF6EA'}" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="140" r="112" fill="none" stroke="${RED}" stroke-width="5"/>
     <text x="150" y="208" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="190" fill="${RED}" stroke="${INK}" stroke-width="4" paint-order="stroke">${i + 1}</text>
     <g transform="translate(15,300) scale(0.3)">${shipInner({ hospital: i === 2 })}</g>
     <text x="150" y="440" text-anchor="middle" font-family="Rye" font-size="${i === 2 ? 40 : 44}" fill="${INK}">${NM[i]}</text></svg>`;
    return { d };
  });
}
