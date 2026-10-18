/* Ep. 31 · escenas L0–L5 (todo clavado por texto vía K) */

/* ======================================================================
   A · PORTADA / GANCHO — pantalla roja gigante «MISIL» + silueta con teléfono + «¿ESTÁS VIVO POR ÉL?»
   ====================================================================== */
{
  const c = scene(S.A[0], S.A[1], t => {
    const kz = p(t, K.maquina - 0.1, 0.45, E.inOutCubic);
    set(cam, { s: 1 + 0.03 * p(t, 0, 3, E.linear) + 0.1 * kz });
    set(beam, { r: -30 + t * 70 });
    crtState(crt, t, 'red');
    set(crt.txt, { x: blink2(t) ? 0 : 3, s: 1 + 0.03 * Math.sin(t * 25), o: blink2(t) ? 1 : 0.3 });
    set(sil.d, { y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1) });
    sil.d.style.filter = `brightness(0) drop-shadow(${blink2(t) ? 7 : 4}px 0 0 #E0202F)`;
    set(glowBg, { o: blink2(t) ? 1 : 0.55 });
    set(l1, { r: -2 + wobble(t, 0.5, 0.6), s: 1 + 0.02 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.6, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1) });
    set(arr, { o: 1, y: Math.sin(t * 6) * 6 });
    LEDS.forEach((l, i) => l.style.opacity = (Math.floor(t * 5 + i * 1.7) % 3) ? 1 : 0.25);
    set(qm, { s: pop(t, K.maquina + 0.05, 0.35), r: 12 + Math.sin(t * 6) * 6, o: t < K.maquina + 0.05 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '440px 1150px' });
  sceneBg(cam, { background: BUNK });
  const glowBg = box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 42% 50%, rgba(224,32,47,.55), rgba(224,32,47,0) 55%)', zIndex: 1 });
  const beam = box(cam, -560, -800, 2200, 2200, { zIndex: 2, background: 'conic-gradient(from 0deg, rgba(255,60,60,.0) 0deg, rgba(255,60,60,.22) 18deg, rgba(255,60,60,0) 40deg, rgba(0,0,0,0) 360deg)', borderRadius: '50%' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 3px, transparent 3px 120px)' });
  // consola bajo la pantalla
  const con = box(cam, 40, 1150, 1000, 190, { zIndex: 8 });
  con.innerHTML = `<svg width="1000" height="190" style="overflow:visible"><path d="M0,40 L1000,40 L1000,190 L0,190 Z" fill="#4a3a2c" stroke="${INK}" stroke-width="6"/><path d="M0,40 L1000,40 L980,0 L20,0 Z" fill="#6b5640" stroke="${INK}" stroke-width="6"/><path d="M0,40 L1000,40 L1000,190 L0,190 Z" fill="url(#hA)" opacity=".4"/></svg>`;
  const LEDS = []; for (let i = 0; i < 9; i++) { const l = box(con, 60 + i * 52, 10, 26, 18, { borderRadius: '6px', background: i % 3 ? YEL : '#ff4040', border: `3px solid ${INK}`, zIndex: 2 }); LEDS.push(l); }
  const crt = mkCRT(cam, 90, 640, 680, 540, { z: 6, size: 150 });
  const sil = mk(cam, [600, 820, 380, 486], silPhoneInner(), '0 0 360 460', 'bust'); sil.d.style.zIndex = 9;
  vignette(cam, 12, 0.75);
  const l1 = BIGT(c, 0, 316, 1080, '¿ESTÁS VIVO', { fontSize: '138px', color: '#fff', textShadow: `7px 7px 0 ${RED}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 40 });
  const l2 = BIGT(c, 0, 462, 1080, `POR <span style="color:${YEL}">ÉL</span>?`, { fontSize: '150px', color: '#fff', textShadow: `7px 7px 0 ${RED}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 40 });
  const arr = box(c, 700, 600, 220, 260, { zIndex: 41 }); arr.innerHTML = arrowSvg('M60,20 C150,40 170,120 120,220 M84,186 L120,226 L150,176', PINK, 12);
  const qm = qMark(cam, 120, 660, 170, YEL); qm.style.zIndex = 30;
}

/* ======================================================================
   B1 · «RUSIA, AÑO OCHENTA Y TRES.» — la cámara entra por el pasillo del búnker; la puerta se abre
   ====================================================================== */
{
  const c = scene(S.B1[0], S.B1[1], t => {
    const tl = t - S.B1[0];
    set(cam, { s: 1 + 0.42 * p(t, S.B1[0], S.B1[1] - S.B1[0], E.inCubic) });
    const kd = p(t, K.tres - 0.05, 0.7, E.inOutCubic);
    set(dL, { x: -kd * 170 }); set(dR, { x: kd * 170 });
    set(wh, { r: tl * 140 * (1 - kd) });
    set(rg, { o: 0.3 + kd * 0.7 });
    LAMPS.forEach((l, i) => l.style.opacity = (Math.floor(t * 6 + i) % 7) ? 1 : 0.4);
    popA(cR, t, K.rusia, { r: -3 });
    stampA(st83, t, K.ochenta, -6, 1);
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#3a2c20' });
  const rg = box(cam, 340, 660, 400, 480, { zIndex: 1, background: 'radial-gradient(circle at 50% 50%, #ff5050, #C8102E 50%, #5a0a12 100%)' });
  const cor = box(cam, 0, 0, 1080, 1920, { zIndex: 2 });
  {
    const vx = 540, vy = 900; let s = '';
    s += `<path d="M0,0 L340,660 L340,1140 L0,1920 Z" fill="#5a4636" stroke="${INK}" stroke-width="6"/><path d="M1080,0 L740,660 L740,1140 L1080,1920 Z" fill="#4e3c2e" stroke="${INK}" stroke-width="6"/>`;
    s += `<path d="M0,0 L1080,0 L740,660 L340,660 Z" fill="#2f241a" stroke="${INK}" stroke-width="6"/><path d="M0,1920 L1080,1920 L740,1140 L340,1140 Z" fill="#6b5640" stroke="${INK}" stroke-width="6"/>`;
    for (let k = 1; k < 8; k++) { const f = Math.pow(k / 8, 1.6); const xl = lerp(0, 340, f), yt = lerp(0, 660, f), yb = lerp(1920, 1140, f), xr = lerp(1080, 740, f); s += `<path d="M${f1(xl)},${f1(yt)} L${f1(xl)},${f1(yb)} M${f1(xr)},${f1(yt)} L${f1(xr)},${f1(yb)} M${f1(xl)},${f1(yb)} L${f1(xr)},${f1(yb)}" stroke="${INK}" stroke-width="${f1(6 - k * 0.5)}" opacity=".8"/>`; }
    for (let k = -4; k <= 4; k++) s += `<path d="M${540 + k * 130},1920 L${540 + k * 26},1140" stroke="${INK}" stroke-width="3" opacity=".5"/>`;
    s += `<path d="M0,0 L340,660 L340,1140 L0,1920 Z" fill="url(#hA)" opacity=".35"/><path d="M1080,0 L740,660 L740,1140 L1080,1920 Z" fill="url(#hB)" opacity=".35"/><path d="M0,1920 L1080,1920 L740,1140 L340,1140 Z" fill="url(#hW)" opacity=".2"/>`;
    s += `<path d="M120,980 L300,900 M100,1060 L300,960 M960,980 L780,900 M980,1060 L780,960" stroke="#2b2118" stroke-width="16" stroke-linecap="round"/>`; // tuberías
    cor.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; void vx; void vy;
  }
  const LAMPS = [[540, 140, 1.4], [540, 420, 0.9], [540, 590, 0.55]].map(([x, y, s]) => { const l = box(cam, x - 60 * s, y - 30 * s, 120 * s, 90 * s, { zIndex: 3 }); l.innerHTML = `<svg viewBox="0 0 120 90" width="100%" height="100%" style="overflow:visible"><path d="M60,0 V20" stroke="${INK}" stroke-width="6"/><path d="M20,30 Q60,10 100,30 L90,70 Q60,90 30,70 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="M30,40 L90,40 M26,56 L94,56 M60,20 V84" stroke="${INK}" stroke-width="4"/></svg>`; return l; });
  const door = box(cam, 340, 660, 400, 480, { zIndex: 4, overflow: 'hidden' });
  const mkHalf = (x) => { const h = box(door, x, 0, 200, 480, { zIndex: 1 }); h.innerHTML = `<svg width="200" height="480" style="overflow:visible"><rect x="0" y="0" width="200" height="480" fill="#8E8A80" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="200" height="480" fill="url(#hA)" opacity=".5"/>${[40, 120, 200, 280, 360, 440].map(y => `<circle cx="${x ? 180 : 20}" cy="${y}" r="7" fill="${INK}"/>`).join('')}<path d="M${x ? 0 : 200},0 V480" stroke="${INK}" stroke-width="8"/></svg>`; return h; };
  const dL = mkHalf(0), dR = mkHalf(200);
  const wh = box(dL, 120, 170, 160, 160, { zIndex: 3 }); wh.innerHTML = `<svg viewBox="0 0 160 160" width="160" height="160" style="overflow:visible"><circle cx="80" cy="80" r="66" fill="none" stroke="${INK}" stroke-width="16"/><circle cx="80" cy="80" r="66" fill="none" stroke="#c9a24a" stroke-width="8"/><path d="M80,14 V146 M14,80 H146" stroke="${INK}" stroke-width="12"/><circle cx="80" cy="80" r="16" fill="#c9a24a" stroke="${INK}" stroke-width="5"/></svg>`;
  vignette(cam, 6, 0.6);
  const cR = chip(c, 300, 330, 'RUSIA', { size: 84, bg: '#fff', color: INK, z: 40 });
  const st83 = stamp(c, 290, 470, '1983', { size: 170, bw: 16, z: 41, bg: YEL, blend: 'normal', col: INK, font: 'Playfair' }); st83.style.fontWeight = 900;
}

/* ======================================================================
   B2 · «LA PANTALLA DE STANISLAV PETROV GRITA:» — retrato de grabado con el nombre
   ====================================================================== */
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(pv.d, { s: 1 + 0.05 * p(t, S.B2[0], 2.2, E.linear), y: wobble(t, 0.5, 3) });
    const scared = t > K.grita - 0.05;
    face(pv, t, { look: scared ? [-7, -3] : [-4, 0], bL: scared ? 14 : 4, bR: scared ? 18 : 4, seed: 1.1 });
    const on = t > K.pantalla - 0.05 && blink2(t);
    set(red, { o: t < K.pantalla - 0.05 ? 0.15 : on ? 1 : 0.4 });
    set(redL, { o: t < K.pantalla - 0.05 ? 0 : on ? 0.55 : 0.2 });
    NW.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.32), o: t < w.t - 0.03 ? 0 : 1, r: w.r }));
    set(sw, { o: scared ? 1 : 0, y: scared ? (t - K.grita) * 60 : 0 });
    EX.forEach((e, i) => set(e, { s: pop(t, K.grita + i * 0.06, 0.25), o: t < K.grita + i * 0.06 ? 0 : 1, r: (i - 1) * 25 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  const red = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 92% 60%, rgba(255,40,40,.75), rgba(200,16,46,0) 60%)' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 3px, transparent 3px 60px)' });
  // marco del retrato
  const fr = box(c, 150, 560, 780, 760, { zIndex: 2 });
  fr.innerHTML = `<svg width="780" height="760" style="overflow:visible">${cut('<rect x="0" y="0" width="780" height="760" rx="30"/>')}<rect x="0" y="0" width="780" height="760" rx="30" fill="#E7D9BC" stroke="${INK}" stroke-width="8"/><rect x="0" y="0" width="780" height="760" rx="30" fill="url(#hP)" opacity=".6"/><rect x="26" y="26" width="728" height="708" rx="20" fill="none" stroke="${BRASS}" stroke-width="10"/></svg>`;
  const pv = mk(c, [210, 600, 660, 843], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const redL = box(c, 150, 560, 780, 760, { zIndex: 4, borderRadius: '30px', background: 'linear-gradient(270deg, rgba(224,32,47,.8), rgba(224,32,47,0) 60%)', mixBlendMode: 'multiply' });
  const sw = el('div', c, { left: '700px', top: '820px', fontSize: '70px', zIndex: 6 }, `<svg width="40" height="60" style="overflow:visible"><path d="M20,0 C30,20 40,34 40,44 A20,20 0 0,1 0,44 C0,34 10,20 20,0 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/></svg>`);
  const EX = [0, 1, 2].map(i => { const e = el('div', c, { left: px(620 + i * 90), top: px(620 - (i === 1 ? 40 : 0)), fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: YEL, textShadow: OUTL(INK, 5), zIndex: 7 }, '!'); return e; });
  const nm = el('div', c, { left: 0, top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: 1.1, color: '#fff', textShadow: `6px 6px 0 ${INK}`, zIndex: 40, whiteSpace: 'nowrap' });
  const NW = [];
  [['Stanislav', K.stanislav, -2], [`<span style="background:${YEL};color:${INK};padding:0 22px 8px;border:6px solid ${INK};border-radius:18px;box-shadow:7px 7px 0 ${INK};text-shadow:none">Petrov</span>`, K.petrov, 2]].forEach(([s, tt, r]) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.12em'; e.style.position = 'relative'; e.innerHTML = s; nm.appendChild(e); NW.push({ e, t: tt, r }); });
  const lab = el('div', c, { left: 0, top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '50px', color: '#F4ECDB', zIndex: 40 }, 'la pantalla de…');
  void lab;
}

/* ======================================================================
   B3 · «…MISIL.» — primer plano de la pantalla: «MISIL» con temblor
   ====================================================================== */
{
  const c = scene(S.B3[0], S.B3[1], t => {
    const on = t > K.misil1 - 0.02;
    crtState(crt, t, 'red');
    crt.txt.style.opacity = on ? 1 : 0;
    const k = p(t, K.misil1 - 0.02, 0.18, E.outCubic);
    set(crt.txt, { s: on ? lerp(1.8, 1, k) : 0, x: t > K.misil1 && t < K.misil1 + 0.2 ? Math.sin(t * 90) * 14 : 0 });
    crt.txt.style.textShadow = (glitch(t, K.misil1, 0.25) ? glitch(t, K.misil1, 0.25) + ', ' : '') + '0 0 18px rgba(255,255,255,.7), 5px 5px 0 rgba(43,33,24,.55)';
    set(dots, { o: on ? 0 : (Math.floor(t * 6) % 2 ? 1 : 0.3) });
    set(cam, { s: 1 + 0.06 * p(t, S.B3[0], 1.8, E.linear) });
    set(flash, { o: on ? Math.max(0, 1 - (t - K.misil1) * 3) * 0.7 : 0 });
    set(n1, { s: pop(t, K.misil1 + 0.35, 0.3), o: t < K.misil1 + 0.35 ? 0 : 1, r: -6 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: BUNK });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 42%, rgba(224,32,47,.5), rgba(224,32,47,0) 60%)', zIndex: 1 });
  const crt = mkCRT(cam, 60, 380, 960, 820, { z: 5, size: 228 });
  const dots = el('div', crt.scr, { left: 0, top: '220px', width: '806px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '120px', color: '#ffd0d0', zIndex: 6 }, '· · ·');
  const n1 = stamp(cam, 380, 1230, 'Nº 1', { size: 110, bw: 12, z: 30, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); n1.style.fontWeight = 900;
  vignette(cam, 8, 0.6);
  const flash = box(c, 0, 0, 1080, 1920, { zIndex: 60, background: '#fff' });
}

/* ======================================================================
   C · «UN MISIL NUCLEAR DESDE ESTADOS UNIDOS. LUEGO OTRO. HASTA CINCO.» — mapa con trayectorias + contador por saltos
   ====================================================================== */
headline(S.C[0], K.luego - 0.06, 'Un *misil nuclear*', { size: 96, hlT: K.nuclear, y: 196 });
headline(K.luego - 0.06, K.hasta - 0.06, 'Luego *otro…*', { size: 110, hlT: K.otro, y: 190 });
headline(K.hasta - 0.06, S.C[1], 'Hasta *cinco*', { size: 116, hlT: K.cinco2, y: 186 });
{
  const usX = lo => 40 + (lo + 125) * 7.0, usY = la => 650 + (50 - la) * 8.4;
  const MS = [ // [x0,y0, cx,cy, x1,y1, t]
    [usX(-106), usY(47), 430, 300, 720, 520, K.misil2],
    [usX(-101), usY(44), 450, 330, 760, 560, K.otro - 0.05],
    [usX(-110), usY(43), 400, 280, 700, 560, K.hasta + 0.0],
    [usX(-97), usY(46), 470, 320, 800, 500, K.hasta + 0.2],
    [usX(-104), usY(41), 440, 350, 740, 600, K.cinco2],
  ];
  const bz = (m, k) => { const a = 1 - k; return [a * a * m[0] + 2 * a * k * m[2] + k * k * m[4], a * a * m[1] + 2 * a * k * m[3] + k * k * m[5]]; };
  const c = scene(S.C[0], S.C[1], t => {
    const kc = p(t, S.C[0], S.C[1] - S.C[0], E.linear);
    set(mp, { s: 1.06 - 0.06 * kc, x: lerp(20, -10, kc) });
    MS.forEach((m, i) => {
      const k = clamp((t - m[6]) / 3.2) * 0.8;
      const q = R[i]; const on = t >= m[6];
      q.path.style.strokeDashoffset = f1(1000 * (1 - k / 1)); q.path.style.opacity = on ? 1 : 0;
      const [x, y] = bz(m, Math.max(k, 0.001)), [x2, y2] = bz(m, Math.max(k, 0.001) + 0.01);
      const ang = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI + 90;
      set(q.r, { x: x - 22, y: y - 50, r: ang, s: on ? pop(t, m[6], 0.25) : 0, o: on ? 1 : 0 });
      set(q.puff, { s: on ? p(t, m[6], 0.4) * 1.4 : 0, o: on ? 1 - p(t, m[6] + 0.2, 0.6) : 0 });
    });
    popA(lbUS, t, K.estados, { r: -3 });
    popA(lbRU, t, S.C[0] + 0.1, { r: 3 });
    crtState(crt, t, 'red');
    const n = t >= K.cinco2 ? 5 : t >= K.otro - 0.05 ? 2 : 1;
    crt.num.textContent = '×' + n;
    const tj = n === 5 ? K.cinco2 : n === 2 ? K.otro - 0.05 : S.C[0] + 0.15;
    const kj = p(t, tj, 0.18, E.outCubic);
    set(crt.num, { s: lerp(2.2, 1, kj), r: -4 });
    set(crt.d, { s: pop(t, S.C[0] + 0.05, 0.35), r: 2, o: 1 });
    stampA(st5, t, K.cinco2 + 0.05, -8, 1);
  }, { clip: true });
  sceneBg(c, { background: '#C9D3C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 2px, transparent 2px 64px)' });
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 600px' });
  {
    const us = 'M' + USA.map(q => [f1(usX(q[0])), f1(usY(q[1]))].join(',')).join('L') + 'Z';
    const can = jagPath([[-20, 655], [40, 655], [470, 655], [480, 600], [440, 560], [470, 470], [420, 430], [360, 470], [330, 420], [250, 400], [180, 430], [120, 390], [40, 420], [-20, 400]], 11, 14);
    const ru = jagPath([[1100, 300], [990, 310], [900, 340], [840, 330], [780, 370], [720, 380], [680, 420], [640, 400], [600, 430], [580, 480], [560, 540], [540, 600], [520, 660], [560, 720], [620, 700], [700, 720], [780, 700], [880, 730], [980, 720], [1100, 740]], 23, 16);
    const eu = jagPath([[600, 430], [570, 380], [590, 320], [640, 300], [660, 340], [640, 400]], 5, 10);
    void eu;
    const ms = box(mp, 0, 0, 1080, 1920, { zIndex: 1 });
    ms.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut(P(can) + P(us) + P(ru) , 6, 8)}
     <path d="${can}" fill="#E7DFC8" stroke="${INK}" stroke-width="5"/><path d="${can}" fill="url(#hP)" opacity=".6"/>
     <path d="${us}" fill="#F2E3A8" stroke="${INK}" stroke-width="5"/><path d="${us}" fill="url(#hA)" opacity=".3"/>
     <path d="${ru}" fill="#E9C6BE" stroke="${INK}" stroke-width="5"/><path d="${ru}" fill="url(#hB)" opacity=".3"/>
     <path d="M500,300 Q560,250 640,290" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="4 10" opacity=".5"/></svg>`;
  }
  const R = MS.map((m, i) => {
    const lay = box(mp, 0, 0, 1080, 1920, { zIndex: 5 });
    lay.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path pathLength="1000" stroke-dasharray="14 12" d="M${f1(m[0])},${f1(m[1])} Q${m[2]},${m[3]} ${m[4]},${m[5]}" stroke="${RED}" stroke-width="7" fill="none"/></svg>`;
    const path = lay.querySelector('path');
    // trazo progresivo: dasharray doble (punteado + máscara)
    path.setAttribute('stroke-dasharray', '1000'); path.setAttribute('stroke-dashoffset', '1000');
    const r = box(mp, 0, 0, 44, 100, { zIndex: 7 }); r.innerHTML = rocketSvg();
    const puff = box(mp, f1(m[0] - 40), f1(m[1] - 40), 80, 80, { zIndex: 6, borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}` });
    return { path, r, puff };
  });
  const lbUS = el('div', mp, { left: '90px', top: '880px', fontFamily: 'Rye', fontSize: '46px', color: INK, background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px', zIndex: 9, whiteSpace: 'nowrap' }, 'ESTADOS UNIDOS');
  const lbRU = el('div', mp, { left: '680px', top: '440px', fontFamily: 'Rye', fontSize: '52px', color: INK, background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px', zIndex: 9 }, 'RUSIA');
  const crt = mkCRT(c, 470, 960, 440, 340, { z: 20, size: 66, num: true });
  const st5 = stamp(c, 420, 770, '¡CINCO!', { size: 84, bw: 11, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}

/* ======================================================================
   D1 · «Y ESE MISMO MES…» — hoja de calendario SEPTIEMBRE 1983
   ====================================================================== */
headline(S.D1[0], S.D1[1], 'Ese *mismo mes…*', { size: 112, hlT: K.mismo });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const k = p(t, S.D1[0], 0.35, E.outBack);
    set(cal, { y: (1 - k) * -900, r: lerp(-14, -3, k) + wobble(t, 0.5, 0.8) });
    const kc = p(t, K.mes - 0.05, 0.35, E.outCubic);
    ring.style.strokeDashoffset = f1(1000 * (1 - kc));
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 44px)' });
  const cal = calPage(620, 640, 'SEPTIEMBRE', '1983', { bigSize: 210 }); c.appendChild(cal); set(cal, {}); cal.style.left = '230px'; cal.style.top = '470px'; cal.style.zIndex = 5;
  const rl = box(c, 200, 690, 680, 360, { zIndex: 6 }); rl.innerHTML = `<svg width="680" height="360" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M80,180 C80,40 600,20 620,170 C640,320 160,340 90,230 C70,190 120,120 200,100" stroke="${PINK}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`;
  const ring = rl.querySelector('path');
}

/* ======================================================================
   D2 · «…LOS SOVIÉTICOS HABÍAN DERRIBADO UN AVIÓN DE PASAJEROS.» — el avión y el sello TENSIÓN MÁXIMA
   ====================================================================== */
headline(S.D2[0], S.D2[1], '*Derribado:* un avión de pasajeros', { size: 80, hlT: K.derribado, y: 196 });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    const tl = t - S.D2[0];
    const hit = t > K.derribado;
    const kf = hit ? p(t, K.derribado, 1.8, E.inCubic) : 0;
    set(pl.d, { x: lerp(-700, 160, p(t, S.D2[0], 1.0, E.outCubic)) + tl * 30 + kf * 160, y: kf * 420 + Math.sin(t * 2) * 6, r: kf * 24 });
    set(fl, { s: pop(t, K.derribado, 0.25) * (1 + 0.1 * Math.sin(t * 30)), o: hit && t < K.derribado + 0.6 ? 1 : 0, x: 0 });
    SM.forEach((s, i) => { const t0 = K.derribado + 0.1 + i * 0.15; const ks = p(t, t0, 1.2, E.outCubic); set(s, { x: -ks * 40, y: -ks * 30, s: 0.4 + ks, o: t > t0 ? 0.85 - ks * 0.5 : 0 }); });
    popA(chA, t, K.avion, { r: -3 });
    stampA(stT, t, K.pasajeros + 0.1, -7, 1);
    set(sky, { x: -tl * 18 });
  }, { clip: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #8E9AA6 0%, #CDB49A 70%, #E7D9BC 100%)' });
  const sky = box(c, 0, 0, 1300, 1920, { zIndex: 1 });
  sky.innerHTML = [cloudSvg(1300, 1920, 220, 560, 1.1), cloudSvg(1300, 1920, 900, 460, 0.8), cloudSvg(1300, 1920, 700, 1060, 1.3)].join('');
  const plW = box(c, 0, 0, 1080, 1920, { zIndex: 5 });
  const pl = mk(plW, [0, 560, 640, 220], planeInner(), '0 0 640 220', 'plane');
  const fl = el('div', pl.d, { left: '250px', top: '60px', width: '160px', height: '160px', zIndex: 3 }, `<svg viewBox="-80 -80 160 160" width="160" height="160" style="overflow:visible"><circle cx="-22" cy="6" r="34" fill="#8E8A80" stroke="${INK}" stroke-width="5"/><circle cx="20" cy="-10" r="40" fill="#A39A88" stroke="${INK}" stroke-width="5"/><circle cx="26" cy="26" r="28" fill="#8E8A80" stroke="${INK}" stroke-width="5"/></svg>`);
  const SM = [0, 1, 2, 3, 4].map(i => el('div', pl.d, { left: px(230 - i * 20), top: px(90 + i * 6), width: '90px', height: '70px', borderRadius: '50%', background: '#5E5A52', border: `4px solid ${INK}`, zIndex: 2 }));
  const chA = chip(c, 420, 880, 'avión de pasajeros', { size: 48, bg: '#fff', color: INK, z: 30 });
  const stT = stamp(c, 360, 1000, 'TENSIÓN<br>MÁXIMA', { size: 92, bw: 13, z: 40, bg: 'rgba(255,255,255,.94)', blend: 'normal' }); stT.style.textAlign = 'center';
}

/* ======================================================================
   E1 · «NO TENÍA EL BOTÓN.» — el botón rojo, bajo una campana con candado
   ====================================================================== */
headline(S.E1[0], S.E1[1], 'No tenía *el botón*', { size: 108, hlT: K.boton, color: '#fff', hlc: RED });
{
  const c = scene(S.E1[0], S.E1[1], t => {
    set(bt.d, { s: pop(t, S.E1[0] + 0.02, 0.35), y: wobble(t, 0.5, 2), o: 1 });
    const kg = p(t, K.boton - 0.12, 0.22, E.inCubic);
    set(gl, { y: (1 - kg) * -900, o: t < K.boton - 0.12 ? 0 : 1 });
    set(lk, { s: pop(t, K.boton + 0.12, 0.3), r: -8, o: t < K.boton + 0.12 ? 0 : 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  rays(c, -160, 300, 1400, 24, 'rgba(224,32,47,.18)', 'rgba(0,0,0,0)', 1);
  const bt = mk(c, [250, 560, 580, 580], buttonInner(), '0 0 360 360', 'btn'); bt.d.style.zIndex = 4;
  const gl = box(c, 230, 470, 620, 560, { zIndex: 6 });
  gl.innerHTML = `<svg width="620" height="560" style="overflow:visible"><path d="M40,540 L40,200 C40,40 580,40 580,200 L580,540 Z" fill="rgba(200,230,240,.25)" stroke="${INK}" stroke-width="7"/><path d="M90,480 L90,220 C90,130 180,100 240,96" stroke="#fff" stroke-width="12" fill="none" opacity=".7" stroke-linecap="round"/><rect x="20" y="530" width="580" height="30" rx="8" fill="${STEEL}" stroke="${INK}" stroke-width="5"/></svg>`;
  const lk = box(c, 640, 900, 170, 200, { zIndex: 8 }); lk.innerHTML = `<svg viewBox="0 0 170 200" width="170" height="200" style="overflow:visible">${cut('<path d="M40,80 V50 a45,45 0 0,1 90,0 V80"/><rect x="10" y="80" width="150" height="110" rx="16"/>', 4, 6)}<path d="M40,80 V50 a45,45 0 0,1 90,0 V80" fill="none" stroke="${INK}" stroke-width="20"/><path d="M40,80 V50 a45,45 0 0,1 90,0 V80" fill="none" stroke="${STEEL}" stroke-width="10"/><rect x="10" y="80" width="150" height="110" rx="16" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="85" cy="128" r="14" fill="${INK}"/><path d="M85,130 V160" stroke="${INK}" stroke-width="10"/></svg>`;
}

/* ======================================================================
   E2 · «PERO SU AVISO PODÍA HACER QUE ALGUIEN LO PULSARA.» — dos salas: Petrov al teléfono | una mano sobre el botón
   ====================================================================== */
headline(S.E2[0], K.podia - 0.06, 'Pero su *aviso…*', { size: 104, hlT: K.aviso });
headline(K.podia - 0.06, S.E2[1], 'podía hacer que *alguien* lo pulsara', { size: 76, hlT: K.alguien });
{
  const c = scene(S.E2[0], S.E2[1], t => {
    set(pv.d, { y: wobble(t, 0.6, 3) });
    face(pv, t, { look: [8, -2], bL: 10, bR: 10, seed: 0.4 });
    // el aviso cruza la pared
    const ka = p(t, K.aviso - 0.05, 0.7, E.inOutCubic);
    set(av, { x: lerp(0, 430, ka), y: -Math.sin(ka * Math.PI) * 160, s: t < K.aviso - 0.05 ? 0 : 1, r: -6 + Math.sin(t * 8) * 4 });
    WV.forEach((w, i) => set(w, { o: t > K.aviso - 0.1 && t < K.aviso + 0.9 ? (Math.floor(t * 8 + i) % 3 ? 1 : 0.3) : 0 }));
    // la mano baja… y se congela a 2 mm
    const kh = p(t, K.alguien - 0.1, 0.4, E.outCubic), kp = p(t, K.pulsara - 0.05, 0.3, E.inCubic);
    set(hand, { y: lerp(-160, -40, kh) + kp * 34 + (t > K.pulsara + 0.25 ? Math.sin(t * 40) * 1.5 : 0) });
    set(pulse, { o: t > K.pulsara ? (blink2(t) ? 0.7 : 0.2) : 0 });
    popA(chP, t, S.E2[0] + 0.05, { r: -3 }); popA(chQ, t, K.alguien + 0.05, { r: 3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  box(c, 540, 0, 540, 1920, { zIndex: 0, background: '#E9C6BE' });
  const pulse = box(c, 540, 0, 540, 1920, { zIndex: 1, background: 'radial-gradient(circle at 50% 62%, rgba(224,32,47,.7), rgba(224,32,47,0) 60%)' });
  const wall = box(c, 500, 440, 80, 940, { zIndex: 8 });
  { let b = ''; for (let y = 0; y < 940; y += 50) b += `<path d="M0,${y} H80 M${(y / 50) % 2 ? 40 : 0},${y} V${y + 50}" stroke="${INK}" stroke-width="3"/>`; wall.innerHTML = `<svg width="80" height="940" style="overflow:visible"><rect x="0" y="0" width="80" height="940" fill="#B98A6A" stroke="${INK}" stroke-width="6"/>${b}<rect x="0" y="0" width="80" height="940" fill="url(#hA)" opacity=".35"/></svg>`; }
  const pv = mk(c, [60, 700, 420, 537], silPhoneInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 4;
  const chP = chip(c, 120, 1220, 'PETROV', { size: 48, bg: '#fff', color: INK, z: 30 });
  const WV = [0, 1, 2].map(i => { const e = box(c, 40 - i * 26, 800 - i * 20, 60 + i * 30, 120 + i * 40, { zIndex: 5 }); e.innerHTML = `<svg width="${60 + i * 30}" height="${120 + i * 40}" style="overflow:visible"><path d="M${50 + i * 30},10 Q${10},${60 + i * 20} ${50 + i * 30},${110 + i * 40}" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`; return e; });
  const av = bubble(c, 160, 560, '¡AVISO!', { size: 62, tail: 'bl', z: 40, bg: YEL });
  const bt = mk(c, [640, 950, 300, 300], buttonInner(), '0 0 360 360', 'btn'); bt.d.style.zIndex = 4;
  const hand = box(c, 700, 470, 200, 560, { zIndex: 6 }); hand.innerHTML = svgW(sleeveHand(), '0 0 200 560');
  const chQ = chip(c, 600, 1260, '¿ALGUIEN?', { size: 46, bg: PINK, z: 30 });
}

/* ======================================================================
   F1 · «¿QUÉ HACE?» — Petrov, sudando
   ====================================================================== */
headline(S.F1[0], S.F1[1], '¿Qué *hace?*', { size: 140, hlT: K.hace, y: 230, color: '#fff', hlc: RED });
{
  const c = scene(S.F1[0], S.F1[1], t => {
    set(pv.d, { s: 1 + 0.08 * p(t, S.F1[0], 0.6, E.outCubic), y: wobble(t, 0.6, 2) });
    face(pv, t, { look: [Math.sin(t * 9) * 8, -2], bL: 16, bR: 16, blink: false });
    set(dr, { y: (t - S.F1[0]) * 120, o: 1 });
    set(qm, { s: pop(t, S.F1[0] + 0.05, 0.3), r: 10 + Math.sin(t * 8) * 8, o: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 80% 55%, rgba(255,40,40,.6), rgba(200,16,46,0) 60%)' });
  const pv = mk(c, [140, 480, 800, 1022], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const dr = el('div', c, { left: '700px', top: '820px', zIndex: 6 }, `<svg width="50" height="76" style="overflow:visible"><path d="M25,0 C38,26 50,42 50,55 A25,25 0 0,1 0,55 C0,42 12,26 25,0 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="5"/></svg>`);
  const qm = qMark(c, 760, 520, 190, YEL);
}

/* ======================================================================
   F2 · «COGE EL TELÉFONO: "FALSA ALARMA".» — el auricular sube; el sello apaga la pantalla
   ====================================================================== */
{
  const c = scene(S.F2[0], S.F2[1], t => {
    const off = t > K.falsa + 0.05;
    crtState(crt, t, off ? 'off' : 'red');
    set(crt.d, { y: wobble(t, 0.5, 2) });
    const kr = p(t, K.coge - 0.02, 0.4, E.outBack);
    set(rc, { y: -kr * 130, x: -kr * 250, r: -kr * 28 });
    set(gh, { o: kr > 0.05 ? 1 : 0, y: -kr * 130, x: -kr * 250, r: -kr * 28 });
    set(cord, { o: 1 });
    cordP.setAttribute('d', `M690,1150 C${f1(760 - kr * 100)},${f1(1200 - kr * 40)} ${f1(700 - kr * 200)},${f1(1080 - kr * 60)} ${f1(560 - kr * 250)},${f1(1000 - kr * 130)}`);
    stampA(stF, t, K.falsa, -6, 1);
    set(offT, { o: off ? 1 : 0 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: BUNK });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 3px, transparent 3px 120px)' });
  const crt = mkCRT(c, 150, 300, 780, 600, { z: 4, size: 170 });
  const offT = el('div', crt.scr, { left: 0, top: '170px', width: '655px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '60px', color: '#9fb8a8', zIndex: 6 }, '— apagado —');
  const desk = box(c, 0, 1180, 1080, 300, { zIndex: 5, background: '#6b5640', borderTop: `7px solid ${INK}` });
  void desk;
  const ph = mk(c, [330, 960, 420, 300], phoneInner(), '0 0 420 300', 'phone'); ph.d.style.zIndex = 6;
  const cord = box(c, 0, 0, 1080, 1920, { zIndex: 7 }); cord.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="" stroke="${INK}" stroke-width="7" fill="none" stroke-dasharray="3 6"/></svg>`;
  const cordP = cord.querySelector('path');
  const rc = box(c, 400, 930, 300, 120, { zIndex: 8 }); rc.innerHTML = receiverSvg();
  const gh = box(c, 480, 900, 130, 130, { zIndex: 9 }); gh.innerHTML = `<svg viewBox="-60 -70 120 120" width="130" height="130" style="overflow:visible">${gloveHand(0, 0, 90, 1.25)}</svg>`;
  const stF = stamp(c, 170, 470, 'FALSA<br>ALARMA', { size: 150, bw: 16, z: 40, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); stF.style.fontWeight = 900; stF.style.textAlign = 'center';
}
