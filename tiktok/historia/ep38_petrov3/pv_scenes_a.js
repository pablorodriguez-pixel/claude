/* Ep. 38 · escenas L0–L4 (todo clavado por texto vía K) */

/* ---------- TITULAR NUMERADO (aguanta todo el paso; entra grande en el centro y sube arriba) ---------- */
const BANNERS = [];
function stepBanner(t0, tFly, t1, num, txt, o = {}) {
  const b = el('div', world, { left: '0px', top: '0px', width: '1080px', height: '1px', zIndex: 820 });
  const pill = el('div', b, { left: '0px', top: '0px', width: '1080px', textAlign: 'center', whiteSpace: 'nowrap' },
    `<span style="display:inline-flex;align-items:center;gap:22px;background:${o.bg || '#FBF6EA'};border:7px solid ${INK};border-radius:999px;padding:8px 40px 12px 12px;box-shadow:9px 10px 0 ${INK};font-family:Playfair;font-weight:900;font-size:${o.size || 86}px;line-height:1.05;color:${INK}">` +
    `<span style="display:inline-block;width:112px;height:112px;border-radius:50%;background:${o.nbg || RED};border:6px solid ${INK};color:#fff;font-size:84px;line-height:96px;text-align:center;font-style:normal">${num}</span>` +
    `<span style="font-style:italic">${txt}</span></span>`);
  BANNERS.push({ b: pill, t0, tFly, t1 });
}
function updBanners(t) {
  BANNERS.forEach(B => {
    const vis = t >= B.t0 && t < B.t1; B.b.style.display = vis ? '' : 'none'; if (!vis) return;
    const kin = pop(t, B.t0, 0.4), kf = p(t, B.tFly, 0.35, E.inOutCubic);
    const y = lerp(760, 168, kf), s = lerp(1.32, 1, kf) * kin;
    set(B.b, { y, s, r: lerp(-3, -1.2, kf) + (kf >= 1 ? wobble(t, 0.4, 0.4) : 0), o: 1 - p(t, B.t1 - 0.12, 0.12) });
  });
}
// fondo de capítulo: golpe de color con el número gigante de marca de agua
function chapter(t0, t1, col, num, extra) {
  return colorHit(t0, t1, col, c => {
    const wm = el('div', c, { left: 0, top: '980px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '560px', lineHeight: 1, color: 'rgba(43,33,24,.13)', zIndex: 2 }, num);
    const fx = extra ? extra(c) : null;
    return t => { set(wm, { s: 1 + 0.04 * p(t, t0, t1 - t0), r: -4 }); if (fx) fx(t); };
  });
}

/* ======================================================================
   A · PORTADA / GANCHO — pantalla de radar «MISIL» + silueta con teléfono + «¿TE SALVÓ LA VIDA?»
   ====================================================================== */
function radarLayer(scr, w, h) {
  const r = box(scr, 0, 0, w, h, { zIndex: 3 });
  const cx = w / 2, cy = h / 2, R = Math.max(w, h) * 0.62;
  r.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible">${[0.25, 0.5, 0.75, 1].map(k => `<circle cx="${cx}" cy="${cy}" r="${f1(R * k * 0.7)}" fill="none" stroke="rgba(255,235,220,.35)" stroke-width="3"/>`).join('')}<path d="M0,${cy} H${w} M${cx},0 V${h}" stroke="rgba(255,235,220,.3)" stroke-width="3"/></svg>`;
  const sw = box(scr, cx - R, cy - R, R * 2, R * 2, { zIndex: 3, borderRadius: '50%', background: 'conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 300deg, rgba(255,240,230,.45) 358deg, rgba(255,255,255,0) 360deg)' });
  const blip = box(scr, cx - R * 0.36, cy + R * 0.2, 26, 26, { zIndex: 4, borderRadius: '50%', background: YEL, border: `4px solid ${INK}` });
  return { sw, blip };
}
{
  const c = scene(S.A[0], S.A[1], t => {
    set(cam, { s: 1 + 0.06 * p(t, 0, 1.9, E.linear) });
    set(beam, { r: -30 + t * 70 });
    crtState(crt, t, 'red');
    set(crt.txt, { x: blink2(t) ? 0 : 3, s: 1 + 0.03 * Math.sin(t * 25), o: blink2(t) ? 1 : 0.35 });
    set(rd.sw, { r: t * 220 });
    set(rd.blip, { s: 1 + 0.5 * Math.abs(Math.sin(t * 6)), o: 1 });
    set(sil.d, { y: wobble(t, 0.5, 4), r: wobble(t, 0.4, 1) });
    sil.d.style.filter = `brightness(0) drop-shadow(${blink2(t) ? 7 : 4}px 0 0 #E0202F)`;
    set(glowBg, { o: blink2(t) ? 1 : 0.55 });
    set(l1, { r: -2 + wobble(t, 0.5, 0.6), s: 1 + 0.02 * Math.sin(t * 3.2) });
    set(l2, { r: 1.5 + wobble(t, 0.45, 0.6, 1), s: 1 + 0.025 * Math.sin(t * 3.2 + 1) });
    set(arr, { o: 1, y: Math.sin(t * 6) * 6 });
    LEDS.forEach((l, i) => l.style.opacity = (Math.floor(t * 5 + i * 1.7) % 3) ? 1 : 0.25);
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '440px 1000px' });
  sceneBg(cam, { background: BUNK });
  const glowBg = box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 42% 50%, rgba(224,32,47,.55), rgba(224,32,47,0) 55%)', zIndex: 1 });
  const beam = box(cam, -560, -800, 2200, 2200, { zIndex: 2, background: 'conic-gradient(from 0deg, rgba(255,60,60,.0) 0deg, rgba(255,60,60,.22) 18deg, rgba(255,60,60,0) 40deg, rgba(0,0,0,0) 360deg)', borderRadius: '50%' });
  box(cam, 0, 0, 1080, 1920, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 3px, transparent 3px 120px)' });
  const con = box(cam, 40, 1150, 1000, 190, { zIndex: 8 });
  con.innerHTML = `<svg width="1000" height="190" style="overflow:visible"><path d="M0,40 L1000,40 L1000,190 L0,190 Z" fill="#4a3a2c" stroke="${INK}" stroke-width="6"/><path d="M0,40 L1000,40 L980,0 L20,0 Z" fill="#6b5640" stroke="${INK}" stroke-width="6"/><path d="M0,40 L1000,40 L1000,190 L0,190 Z" fill="url(#hA)" opacity=".4"/></svg>`;
  const LEDS = []; for (let i = 0; i < 9; i++) { const l = box(con, 60 + i * 52, 10, 26, 18, { borderRadius: '6px', background: i % 3 ? YEL : '#ff4040', border: `3px solid ${INK}`, zIndex: 2 }); LEDS.push(l); }
  const crt = mkCRT(cam, 70, 640, 720, 560, { z: 6, size: 160 });
  const rd = radarLayer(crt.scr, crt.sw, crt.sh);
  const sil = mk(cam, [610, 830, 370, 473], silPhoneInner(), '0 0 360 460', 'bust'); sil.d.style.zIndex = 9;
  vignette(cam, 12, 0.75);
  const TS = `7px 7px 0 ${RED}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
  const l1 = BIGT(c, 0, 318, 1080, '¿TE SALVÓ', { fontSize: '142px', color: '#fff', textShadow: TS, zIndex: 40 });
  const l2 = BIGT(c, 0, 466, 1080, `LA <span style="color:${YEL}">VIDA</span>?`, { fontSize: '150px', color: '#fff', textShadow: TS, zIndex: 40 });
  const arr = box(c, 720, 610, 200, 250, { zIndex: 41 }); arr.innerHTML = arrowSvg('M60,20 C150,40 170,120 120,220 M84,186 L120,226 L150,176', PINK, 12);
}

/* ======================================================================
   A2 · «…DEL QUE NUNCA HAS OÍDO HABLAR» — la silueta bajo un foco, con la placa del nombre vacía
   ====================================================================== */
headline(S.A2[0], S.A2[1], 'Nunca has *oído hablar*', { size: 92, hlT: K.nunca + 0.4, y: 230, color: '#fff', hlc: RED });
{
  const c = scene(S.A2[0], S.A2[1], t => {
    set(cam, { s: 1.0 + 0.08 * p(t, S.A2[0], S.A2[1] - S.A2[0], E.linear) });
    set(sp, { o: 0.85 + 0.15 * Math.sin(t * 9) });
    set(sl.d, { y: wobble(t, 0.5, 4) });
    popA(plate, t, S.A2[0] + 0.12, { r: -2 });
    QS.forEach((q, i) => set(q, { s: pop(t, S.A2[0] + 0.3 + i * 0.18, 0.3), r: (i - 1) * 16 + Math.sin(t * 6 + i) * 6, o: t < S.A2[0] + 0.3 + i * 0.18 ? 0 : 1 }));
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#1e1712' });
  const sp = box(cam, 140, 300, 800, 1200, { zIndex: 1, background: 'radial-gradient(ellipse at 50% 70%, rgba(255,236,190,.55), rgba(255,236,190,0) 62%)' });
  const sl = mk(cam, [250, 480, 580, 742], silPhoneInner(), '0 0 360 460', 'bust'); sl.d.style.zIndex = 4; sl.d.style.filter = 'brightness(0)';
  const plate = el('div', cam, { left: '250px', top: '1150px', width: '580px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '58px', color: INK, background: '#E7D9BC', border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `8px 8px 0 ${INK}`, padding: '6px 0 10px', zIndex: 6 }, 'NOMBRE: ¿ ? ? ?');
  const QS = [0, 1, 2].map(i => qMark(cam, 200 + i * 290, 520 + (i === 1 ? -40 : 0), 150, i === 1 ? YEL : PINK));
}

/* ======================================================================
   B2 · «SE LLAMABA STANISLAV PETROV,» — retrato de grabado con el nombre
   ====================================================================== */
{
  const c = scene(S.B2[0], S.B2[1], t => {
    set(pv.d, { s: 1 + 0.05 * p(t, S.B2[0], 2.2, E.linear), y: wobble(t, 0.5, 3) });
    face(pv, t, { look: [-4, 0], bL: 4, bR: 4, seed: 1.1 });
    NW.forEach(w => set(w.e, { s: pop(t, w.t - 0.03, 0.32), o: t < w.t - 0.03 ? 0 : 1, r: w.r }));
    popA(lab, t, S.B2[0] + 0.05, { rise: 20 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  box(c, 0, 0, 1080, 1920, { zIndex: 1, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 3px, transparent 3px 60px)' });
  const fr = box(c, 150, 560, 780, 760, { zIndex: 2 });
  fr.innerHTML = `<svg width="780" height="760" style="overflow:visible">${cut('<rect x="0" y="0" width="780" height="760" rx="30"/>')}<rect x="0" y="0" width="780" height="760" rx="30" fill="#E7D9BC" stroke="${INK}" stroke-width="8"/><rect x="0" y="0" width="780" height="760" rx="30" fill="url(#hP)" opacity=".6"/><rect x="26" y="26" width="728" height="708" rx="20" fill="none" stroke="${BRASS}" stroke-width="10"/></svg>`;
  const pv = mk(c, [210, 600, 660, 843], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const nm = el('div', c, { left: 0, top: '336px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '108px', lineHeight: 1.1, color: '#fff', textShadow: `6px 6px 0 ${INK}`, zIndex: 40, whiteSpace: 'nowrap' });
  const NW = [];
  [['Stanislav', K.stanislav, -2], [`<span style="background:${YEL};color:${INK};padding:0 22px 8px;border:6px solid ${INK};border-radius:18px;box-shadow:7px 7px 0 ${INK};text-shadow:none">Petrov</span>`, K.petrov, 2]].forEach(([s, tt, r]) => { const e = document.createElement('span'); e.style.display = 'inline-block'; e.style.margin = '0 0.12em'; e.style.position = 'relative'; e.innerHTML = s; nm.appendChild(e); NW.push({ e, t: tt, r }); });
  const lab = el('div', c, { left: 0, top: '236px', width: '1080px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '56px', color: '#F4ECDB', zIndex: 40 }, 'Se llamaba…');
}

/* ======================================================================
   N1 · «…Y UNA NOCHE DE 1983» — el búnker de noche; la luna; sello 1983
   ====================================================================== */
{
  const c = scene(S.N1[0], S.N1[1], t => {
    set(cam, { s: 1 + 0.1 * p(t, S.N1[0], S.N1[1] - S.N1[0], E.linear) });
    set(moon, { s: pop(t, K.noche1 - 0.05, 0.45), r: wobble(t, 0.3, 3), o: t < K.noche1 - 0.05 ? 0 : 1 });
    WIN.forEach((w, i) => w.style.opacity = (Math.floor(t * 3 + i * 1.3) % 4) ? 1 : 0.35);
    set(dish, { r: Math.sin(t * 1.4) * 12 });
    stampA(st83, t, K.mil, -6, 1);
    popA(nchip, t, S.N1[0] + 0.1, { r: -3 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 1000px' });
  sceneBg(cam, { background: 'linear-gradient(180deg, #141a2e 0%, #2f3550 60%, #3a3530 100%)' });
  STARS(cam);
  const moon = box(cam, 650, 400, 230, 230, { zIndex: 2 }); moon.innerHTML = `<svg viewBox="0 0 230 230" width="230" height="230" style="overflow:visible">${cut('<circle cx="115" cy="115" r="100"/>', 4, 6)}<circle cx="115" cy="115" r="100" fill="#F4ECDB" stroke="${INK}" stroke-width="6"/><circle cx="80" cy="90" r="16" fill="#d8ccb0"/><circle cx="140" cy="150" r="22" fill="#d8ccb0"/><circle cx="150" cy="80" r="9" fill="#d8ccb0"/><path d="M60,120 q12,8 24,0 M130,112 q12,8 24,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  const bk = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  bk.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M0,1250 Q300,1180 540,1220 T1080,1200 L1080,1920 L0,1920 Z" fill="#2a2620" stroke="${INK}" stroke-width="6"/>
   ${cut('<path d="M180,1240 L180,1000 L860,1000 L860,1240 Z"/>')}<path d="M180,1240 L180,1000 L860,1000 L860,1240 Z" fill="#7d776c" stroke="${INK}" stroke-width="7"/><path d="M180,1240 L180,1000 L860,1000 L860,1240 Z" fill="url(#hA)" opacity=".45"/>
   <path d="M150,1000 L890,1000 L860,960 L180,960 Z" fill="#5e5a52" stroke="${INK}" stroke-width="6"/><rect x="470" y="1110" width="100" height="130" fill="#2B2118" stroke="${INK}" stroke-width="5"/>
   <path d="M640,960 V860" stroke="${INK}" stroke-width="10"/></svg>`;
  const WIN = [[240, 1060], [330, 1060], [680, 1060], [770, 1060]].map(q => box(cam, q[0], q[1], 60, 40, { zIndex: 5, background: YEL, border: `4px solid ${INK}` }));
  const dish = box(cam, 580, 760, 130, 120, { zIndex: 5, transformOrigin: '60px 100px' }); dish.innerHTML = `<svg viewBox="0 0 130 120" width="130" height="120" style="overflow:visible"><path d="M10,40 Q65,130 120,40 Z" fill="#CFC8B8" stroke="${INK}" stroke-width="6"/><path d="M65,80 L65,30 M65,30 l-8,-8 M65,30 l8,-8" stroke="${INK}" stroke-width="5"/><path d="M60,92 L60,118 L70,118 L70,92" fill="${INK}"/></svg>`;
  vignette(cam, 8, 0.55);
  const nchip = chip(c, 300, 300, 'una noche…', { size: 70, bg: '#fff', color: INK, z: 40 });
  const st83 = stamp(c, 310, 470, '1983', { size: 190, bw: 16, z: 41, bg: YEL, blend: 'normal', col: INK, font: 'Playfair' }); st83.style.fontWeight = 900;
}

/* ======================================================================
   N2 · «…TUVO EL MUNDO EN SUS MANOS.» — el planeta en dos manos enguantadas (el chip 1983 se queda)
   ====================================================================== */
headline(S.N2[0], S.N2[1], 'Tuvo el mundo *en sus manos*', { size: 84, hlT: K.manos, y: 236 });
function globeAwake() { return globeSvg().replace('M150,220 q26,20 52,0 M258,220 q26,20 52,0', 'M150,226 q26,-22 52,0 M258,226 q26,-22 52,0'); }
{
  const c = scene(S.N2[0], S.N2[1], t => {
    const kg = p(t, S.N2[0], 0.45, E.outBack);
    set(gb, { y: (1 - kg) * -500 + Math.sin(t * 2.4) * 8, r: t * 5, s: 1 });
    set(hands, { y: (1 - p(t, S.N2[0] + 0.05, 0.4, E.outCubic)) * 400 + Math.sin(t * 2.4) * 8 });
    SW.forEach((s, i) => { const t0 = K.mundo1 + i * 0.1; set(s, { s: pop(t, t0, 0.25), o: t > t0 ? 1 : 0, r: (i - 1) * 20 + Math.sin(t * 8 + i) * 10 }); });
    set(y83, { s: 1, r: -6, o: 1 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#E7D9BC' });
  rays(c, -160, 260, 1400, 26, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 1);
  const gb = box(c, 270, 470, 540, 540, { zIndex: 4 }); gb.innerHTML = globeAwake();
  const hands = box(c, 0, 0, 1080, 1920, { zIndex: 5 }); hands.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M120,1320 L260,1000 L360,1040 L260,1320 Z" fill="#3d4a3a" stroke="${INK}" stroke-width="6"/><path d="M960,1320 L820,1000 L720,1040 L820,1320 Z" fill="#3d4a3a" stroke="${INK}" stroke-width="6"/>${gloveHand(330, 990, 40, 1.6)}${gloveHand(750, 990, -40, 1.6)}</svg>`;
  const SW = [0, 1, 2].map(i => el('div', c, { left: px(250 + i * 260), top: px(400 + (i % 2) * 40), fontSize: '90px', color: '#9fd3f0', textShadow: `3px 3px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 6 }, i === 1 ? '!' : '✦'));
  const y83 = stamp(c, 60, 1080, '1983', { size: 96, bw: 11, z: 30, bg: YEL, blend: 'normal', col: INK, font: 'Playfair' }); y83.style.fontWeight = 900;
}

/* ======================================================================
   Q1 · «¿QUÉ PASÓ ESA NOCHE?» — la pantalla, aún apagada, en el búnker
   ====================================================================== */
headline(S.Q1[0], S.Q1[1], '¿Qué pasó *esa noche?*', { size: 104, hlT: K.noche3, y: 236, color: '#fff', hlc: RED });
{
  const c = scene(S.Q1[0], S.Q1[1], t => {
    crtState(crt, t, 'dim');
    set(cam, { s: 1 + 0.08 * p(t, S.Q1[0], 1.2, E.linear) });
    set(qm, { s: pop(t, S.Q1[0] + 0.2, 0.3), r: 10 + Math.sin(t * 8) * 8, o: t < S.Q1[0] + 0.2 ? 0 : 1 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: BUNK });
  const crt = mkCRT(cam, 170, 560, 740, 580, { z: 4, size: 150, text: '· · ·' });
  vignette(cam, 7, 0.7);
  const qm = qMark(cam, 780, 480, 220, YEL);
}

/* ======================================================================
   Q2 · «TE LO CUENTO EN TRES MOMENTOS.» — tres tarjetas numeradas, boca abajo
   ====================================================================== */
headline(S.Q2[0], S.Q2[1], 'En *tres momentos*', { size: 108, hlT: K.tres3, y: 236 });
{
  const CT = [K.te3 + 0.15, K.cuento ? K.cuento : K.te3 + 0.5, K.tres3];
  const c = scene(S.Q2[0], S.Q2[1], t => {
    CD.forEach((d, i) => { const t0 = [S.Q2[0] + 0.1, S.Q2[0] + 0.45, K.tres3 - 0.05][i]; const k = p(t, t0, 0.4, E.outBack); set(d, { y: (1 - k) * -900, r: (i - 1) * 4 + wobble(t, 0.5, 1, i), o: t < t0 ? 0 : 1 }); });
    set(glow, { o: t > K.tres3 ? 0.6 + 0.4 * Math.sin(t * 10) : 0 });
  }, { clip: true, cut: true });
  void CT;
  sceneBg(c, { background: '#E9C6BE' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const glow = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 50% 55%, rgba(255,230,0,.6), rgba(255,230,0,0) 60%)' });
  const CD = [1, 2, 3].map((n, i) => {
    const d = box(c, 80 + i * 300, 640, 260, 380, { zIndex: 4 });
    d.innerHTML = `<svg width="260" height="380" style="overflow:visible">${cut('<rect x="0" y="0" width="260" height="380" rx="24"/>')}<rect x="0" y="0" width="260" height="380" rx="24" fill="${[YEL, PINK, '#9fd3f0'][i]}" stroke="${INK}" stroke-width="7"/><rect x="18" y="18" width="224" height="344" rx="16" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="8 8"/></svg>`;
    el('div', d, { left: 0, top: '40px', width: '260px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '200px', lineHeight: 1, color: '#fff', textShadow: OUTL(INK, 7), zIndex: 2 }, String(n));
    el('div', d, { left: 0, top: '262px', width: '260px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: 1, color: INK, zIndex: 2 }, '?');
    return d;
  });
}

/* ======================================================================
   CH1 · CAPÍTULO 1 · LA ALARMA (titular que entra grande y sube)
   ====================================================================== */
stepBanner(K.uno - 0.05, S.CH1[1] - 0.36, S.U6[1], '1', 'La alarma', { nbg: RED });
chapter(S.CH1[0], S.CH1[1], YEL, '1', c => {
  const L = [0, 1].map(i => { const d = box(c, i ? 760 : 120, 1080, 200, 200, { zIndex: 5 }); d.innerHTML = `<svg viewBox="0 0 200 200" width="200" height="200" style="overflow:visible">${cut('<path d="M40,170 L40,100 C40,40 160,40 160,100 L160,170 Z"/>', 4, 6)}<path d="M40,170 L40,100 C40,40 160,40 160,100 L160,170 Z" fill="${RED}" stroke="${INK}" stroke-width="7"/><rect x="20" y="166" width="160" height="30" rx="8" fill="${STEEL}" stroke="${INK}" stroke-width="5"/><path d="M70,90 C74,70 90,62 104,62" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/></svg>`; return d; });
  const RY = L.map(l => { const r = el('div', l, { left: '-60px', top: '-60px', width: '320px', height: '320px', zIndex: -1, borderRadius: '50%', background: 'conic-gradient(from 0deg, rgba(200,16,46,.0) 0deg, rgba(200,16,46,.45) 30deg, rgba(200,16,46,0) 60deg, rgba(0,0,0,0) 360deg)' }); return r; });
  return t => { L.forEach((l, i) => set(l, { s: pop(t, S.CH1[0] + 0.1 + i * 0.1, 0.3), r: Math.sin(t * 30) * 3 })); RY.forEach((r, i) => set(r, { r: t * 500 + i * 180 })); };
});

/* ======================================================================
   U1 · «PETROV ERA MILITAR SOVIÉTICO» — retrato + chip
   ====================================================================== */
{
  const c = scene(S.U1[0], S.U1[1], t => {
    set(pv.d, { s: 1 + 0.05 * p(t, S.U1[0], 2, E.linear), y: wobble(t, 0.5, 3) });
    face(pv, t, { look: [-2, 0], bL: 2, bR: 2, seed: 2.1 });
    popA(ch1, t, S.U1[0] + 0.12, { r: -3 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#3a2c20' });
  rays(c, -160, 300, 1400, 24, 'rgba(255,230,0,.10)', 'rgba(0,0,0,0)', 1);
  const fr = box(c, 190, 400, 700, 700, { zIndex: 2 });
  fr.innerHTML = `<svg width="700" height="700" style="overflow:visible">${cut('<rect x="0" y="0" width="700" height="700" rx="30"/>')}<rect x="0" y="0" width="700" height="700" rx="30" fill="#E7D9BC" stroke="${INK}" stroke-width="8"/><rect x="0" y="0" width="700" height="700" rx="30" fill="url(#hP)" opacity=".6"/></svg>`;
  const pv = mk(c, [250, 420, 580, 680], petrovInner(), '0 0 360 460', 'bust'); pv.d.style.zIndex = 3;
  const ch1 = chip(c, 200, 1150, 'militar soviético', { size: 64, bg: '#fff', color: INK, z: 30 });
}

/* ======================================================================
   U2 · «Y VIGILABA LOS SATÉLITES» — el satélite en órbita, con prismáticos de Petrov abajo
   ====================================================================== */
{
  const c = scene(S.U2[0], S.U2[1], t => {
    set(sat.d, { s: pop(t, S.U2[0] + 0.02, 0.4), x: Math.sin(t * 1.4) * 10, y: Math.cos(t * 1.2) * 8, r: -6 });
    face(sat, t, { look: [-2, 8], seed: 0.6 });
    set(orb, { r: t * 6 });
    popA(ch2, t, S.U2[0] + 0.1, { r: 2 });
    BL.forEach((b, i) => set(b, { o: (Math.floor(t * 4 + i) % 3) ? 1 : 0.2 }));
  }, { clip: true, cut: true });
  sceneBg(c, { background: 'linear-gradient(180deg, #141a2e 0%, #2f3550 100%)' });
  STARS(c);
  const orb = box(c, -400, 1050, 1880, 1880, { zIndex: 2, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, #8fb3c0 0 60%, #AFC6CF 70%)', border: `8px solid ${INK}` });
  const path = box(c, 0, 0, 1080, 1920, { zIndex: 3 }); path.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M-40,900 Q540,420 1120,900" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="14 14" opacity=".7"/></svg>`;
  const sat = mk(c, [180, 420, 720, 415], satInner(), '0 0 520 300', 'sat'); sat.d.style.zIndex = 5;
  const BL = [0, 1, 2].map(i => el('div', c, { left: px(260 + i * 260), top: px(920 + (i % 2) * 30), width: '30px', height: '30px', borderRadius: '50%', background: YEL, border: `4px solid ${INK}`, zIndex: 6 }));
  const ch2 = chip(c, 210, 1060, 'vigilaba los satélites', { size: 60, bg: YEL, color: INK, z: 30 });
}

/* ======================================================================
   U3 · «QUE AVISABAN SI ESTADOS UNIDOS LANZABA MISILES NUCLEARES.» — mapa: trayectoria punteada hipotética
   ====================================================================== */
const usX = lo => 40 + (lo + 125) * 7.0, usY = la => 650 + (50 - la) * 8.4;
function mapLayer(pa) {
  const us = 'M' + USA.map(q => [f1(usX(q[0])), f1(usY(q[1]))].join(',')).join('L') + 'Z';
  const can = jagPath([[-20, 655], [40, 655], [470, 655], [480, 600], [440, 560], [470, 470], [420, 430], [360, 470], [330, 420], [250, 400], [180, 430], [120, 390], [40, 420], [-20, 400]], 11, 14);
  const ru = jagPath([[1100, 300], [990, 310], [900, 340], [840, 330], [780, 370], [720, 380], [680, 420], [640, 400], [600, 430], [580, 480], [560, 540], [540, 600], [520, 660], [560, 720], [620, 700], [700, 720], [780, 700], [880, 730], [980, 720], [1100, 740]], 23, 16);
  const ms = box(pa, 0, 0, 1080, 1920, { zIndex: 1 });
  ms.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${cut(P(can) + P(us) + P(ru), 6, 8)}
     <path d="${can}" fill="#E7DFC8" stroke="${INK}" stroke-width="5"/><path d="${can}" fill="url(#hP)" opacity=".6"/>
     <path d="${us}" fill="#F2E3A8" stroke="${INK}" stroke-width="5"/><path d="${us}" fill="url(#hA)" opacity=".3"/>
     <path d="${ru}" fill="#E9C6BE" stroke="${INK}" stroke-width="5"/><path d="${ru}" fill="url(#hB)" opacity=".3"/></svg>`;
  return ms;
}
const mapBg = c => sceneBg(c, { background: '#C9D3C6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 2px, transparent 2px 64px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 2px, transparent 2px 64px)' });
{
  const c = scene(S.U3[0], S.U3[1], t => {
    set(mp, { s: 1.04 - 0.04 * p(t, S.U3[0], 2.4, E.linear) });
    const k = p(t, K.lanzaba - 0.05, 1.0, E.inOutCubic);
    arcP.style.strokeDashoffset = f1(1000 * (1 - k));
    set(q, { s: pop(t, K.nucleares, 0.3), r: 12 + Math.sin(t * 6) * 8, o: t < K.nucleares ? 0 : 1 });
    popA(lbUS, t, S.U3[0] + 0.05, { r: -3 });
    popA(ch3, t, S.U3[0] + 0.15, { r: -2 });
    set(eye, { s: pop(t, S.U3[0] + 0.2, 0.3), x: Math.sin(t * 3) * 6 });
  }, { clip: true, cut: true });
  mapBg(c);
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 600px' });
  mapLayer(mp);
  const arc = box(mp, 0, 0, 1080, 1920, { zIndex: 5 }); arc.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path pathLength="1000" stroke-dasharray="1000" stroke-dashoffset="1000" d="M${f1(usX(-104))},${f1(usY(44))} Q440,300 760,540" stroke="${RED}" stroke-width="9" fill="none"/></svg>`;
  const arcP = arc.querySelector('path');
  const q = qMark(mp, 600, 330, 150, PINK);
  const lbUS = el('div', mp, { left: '120px', top: '760px', fontFamily: 'Rye', fontSize: '46px', color: INK, background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px', zIndex: 9, whiteSpace: 'nowrap' }, 'ESTADOS UNIDOS');
  const eye = box(c, 640, 760, 260, 200, { zIndex: 12 }); eye.innerHTML = `<svg viewBox="0 0 260 200" width="260" height="200" style="overflow:visible"><path d="M10,100 Q130,-10 250,100 Q130,210 10,100 Z" fill="#fff" stroke="${INK}" stroke-width="8"/><circle cx="130" cy="100" r="46" fill="#4a5a7a" stroke="${INK}" stroke-width="6"/><circle cx="130" cy="100" r="20" fill="${INK}"/><circle cx="116" cy="86" r="9" fill="#fff"/></svg>`;
  const ch3 = chip(c, 420, 1030, '¿lanza misiles?', { size: 64, bg: RED, color: '#fff', z: 30 });
}

/* ======================================================================
   U4 · «Y A MEDIANOCHE, LA PANTALLA DIJO:» — el reloj marca las 12 y la pantalla se enciende
   ====================================================================== */
{
  const c = scene(S.U4[0], S.U4[1], t => {
    const kh = p(t, K.medianoche - 0.25, 0.35, E.outBack);
    hm.setAttribute('transform', `rotate(${f1(lerp(-120, 0, kh))} 200 200)`); hh.setAttribute('transform', `rotate(${f1(lerp(-60, 0, kh))} 200 200)`);
    set(clk, { s: pop(t, S.U4[0] + 0.02, 0.35), r: -3 + (t > K.medianoche ? Math.sin(t * 40) * 2 * Math.exp(-(t - K.medianoche) * 3) : 0) });
    stampA(stM, t, K.medianoche, -6, 1);
    const on = t > K.pantalla4 - 0.05;
    crtState(crt, t, on ? 'red' : 'dim');
    crt.txt.style.opacity = 0;
    set(crt.d, { s: pop(t, S.U4[0] + 0.12, 0.35), r: 2 });
  }, { clip: true, cut: true });
  sceneBg(c, { background: '#2f3550' });
  STARS(c);
  const clk = box(c, 420, 330, 400, 400, { zIndex: 5 });
  clk.innerHTML = `<svg viewBox="0 0 400 400" width="400" height="400" style="overflow:visible">${cut('<circle cx="200" cy="200" r="180"/>')}<circle cx="200" cy="200" r="180" fill="#FBF6EA" stroke="${INK}" stroke-width="10"/>${[...Array(12)].map((_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${f1(200 + Math.sin(a) * 150)},${f1(200 - Math.cos(a) * 150)} L${f1(200 + Math.sin(a) * 166)},${f1(200 - Math.cos(a) * 166)}" stroke="${INK}" stroke-width="${i % 3 ? 5 : 10}"/>`; }).join('')}<text x="200" y="92" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="50" fill="${INK}">12</text><g class="hh"><path d="M200,200 L200,110" stroke="${INK}" stroke-width="16" stroke-linecap="round"/></g><g class="hm"><path d="M200,200 L200,66" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></g><circle cx="200" cy="200" r="14" fill="${INK}"/></svg>`;
  const hh = clk.querySelector('.hh'), hm = clk.querySelector('.hm');
  const crt = mkCRT(c, 440, 820, 470, 380, { z: 4, size: 80 });
  const stM = stamp(c, 90, 720, 'MEDIANOCHE', { size: 92, bw: 12, z: 40, bg: YEL, blend: 'normal', col: INK });
}

/* ======================================================================
   U5 · «MISIL.» — primer plano de la pantalla: «MISIL» con temblor + Nº 1
   ====================================================================== */
{
  const c = scene(S.U5[0], S.U5[1], t => {
    const on = t > K.misil - 0.02;
    crtState(crt, t, 'red');
    crt.txt.style.opacity = on ? 1 : 0;
    const k = p(t, K.misil - 0.02, 0.18, E.outCubic);
    set(crt.txt, { s: on ? lerp(1.8, 1, k) : 0, x: t > K.misil && t < K.misil + 0.2 ? Math.sin(t * 90) * 14 : 0 });
    crt.txt.style.textShadow = (glitch(t, K.misil, 0.25) ? glitch(t, K.misil, 0.25) + ', ' : '') + '0 0 18px rgba(255,255,255,.7), 5px 5px 0 rgba(43,33,24,.55)';
    set(dots, { o: on ? 0 : (Math.floor(t * 6) % 2 ? 1 : 0.3) });
    set(cam, { s: 1 + 0.06 * p(t, S.U5[0], 1.8, E.linear) });
    set(flash, { o: on ? Math.max(0, 1 - (t - K.misil) * 3) * 0.7 : 0 });
    set(n1, { s: pop(t, K.misil + 0.3, 0.3), o: t < K.misil + 0.3 ? 0 : 1, r: -6 });
    set(rd.sw, { r: t * 220 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: BUNK });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 42%, rgba(224,32,47,.5), rgba(224,32,47,0) 60%)', zIndex: 1 });
  const crt = mkCRT(cam, 70, 380, 880, 780, { z: 5, size: 210 });
  const rd = radarLayer(crt.scr, crt.sw, crt.sh);
  const dots = el('div', crt.scr, { left: 0, top: '200px', width: px(crt.sw), textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '120px', color: '#ffd0d0', zIndex: 6 }, '· · ·');
  const n1 = stamp(cam, 380, 1190, 'Nº 1', { size: 110, bw: 12, z: 30, bg: YEL, col: INK, blend: 'normal', font: 'Playfair' }); n1.style.fontWeight = 900;
  vignette(cam, 8, 0.6);
  const flash = box(c, 0, 0, 1080, 1920, { zIndex: 60, background: '#fff' });
}

/* ======================================================================
   U6 · «LUEGO, OTRO. HASTA CINCO.» — mapa con trayectorias + contador ×1 → ×5 (sin counter)
   ====================================================================== */
{
  const MS = [ // [x0,y0, cx,cy, x1,y1, t]
    [usX(-106), usY(47), 430, 300, 720, 520, S.U6[0] - 0.4],
    [usX(-101), usY(44), 450, 330, 760, 560, K.otro - 0.05],
    [usX(-110), usY(43), 400, 280, 700, 560, K.hasta4 - 0.1],
    [usX(-97), usY(46), 470, 320, 800, 500, K.hasta4 + 0.15],
    [usX(-104), usY(41), 440, 350, 740, 600, K.hasta4 + 0.4],
  ];
  const bz = (m, k) => { const a = 1 - k; return [a * a * m[0] + 2 * a * k * m[2] + k * k * m[4], a * a * m[1] + 2 * a * k * m[3] + k * k * m[5]]; };
  const c = scene(S.U6[0], S.U6[1], t => {
    const kc = p(t, S.U6[0], S.U6[1] - S.U6[0], E.linear);
    set(mp, { s: 1.06 - 0.06 * kc, x: lerp(20, -10, kc) });
    MS.forEach((m, i) => {
      const k = clamp((t - m[6]) / 3.2) * 0.8;
      const q = R[i]; const on = t >= m[6];
      q.path.style.strokeDashoffset = f1(1000 * (1 - k)); q.path.style.opacity = on ? 1 : 0;
      const [x, y] = bz(m, Math.max(k, 0.001)), [x2, y2] = bz(m, Math.max(k, 0.001) + 0.01);
      const ang = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI + 90;
      set(q.r, { x: x - 22, y: y - 50, r: ang, s: on ? (i ? pop(t, m[6], 0.25) : 1) : 0, o: on ? 1 : 0 });
      set(q.puff, { s: on ? p(t, m[6], 0.4) * 1.4 : 0, o: on ? 1 - p(t, m[6] + 0.2, 0.6) : 0 });
    });
    popA(lbUS, t, S.U6[0] - 1, { r: -3 });
    crtState(crt, t, 'red');
    const n = t >= K.hasta4 - 0.1 ? 5 : 1;
    crt.num.textContent = '×' + n;
    const tj = n === 5 ? K.hasta4 - 0.1 : S.U6[0];
    const kj = p(t, tj, 0.18, E.outCubic);
    set(crt.num, { s: n === 1 ? 1 : lerp(2.2, 1, kj), r: -4 });
    set(crt.d, { r: 2, o: 1 });
    stampA(st5, t, K.cinco4, -8, 1);
  }, { clip: true, cut: true });
  mapBg(c);
  const mp = box(c, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 600px' });
  mapLayer(mp);
  const R = MS.map(m => {
    const lay = box(mp, 0, 0, 1080, 1920, { zIndex: 5 });
    lay.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path pathLength="1000" d="M${f1(m[0])},${f1(m[1])} Q${m[2]},${m[3]} ${m[4]},${m[5]}" stroke="${RED}" stroke-width="7" fill="none"/></svg>`;
    const path = lay.querySelector('path'); path.setAttribute('stroke-dasharray', '1000'); path.setAttribute('stroke-dashoffset', '1000');
    const r = box(mp, 0, 0, 44, 100, { zIndex: 7 }); r.innerHTML = rocketSvg();
    const puff = box(mp, f1(m[0] - 40), f1(m[1] - 40), 80, 80, { zIndex: 6, borderRadius: '50%', background: '#F4ECDB', border: `4px solid ${INK}` });
    return { path, r, puff };
  });
  const lbUS = el('div', mp, { left: '120px', top: '760px', fontFamily: 'Rye', fontSize: '46px', color: INK, background: '#FBF6EA', border: `4px solid ${INK}`, borderRadius: '12px', padding: '2px 16px', zIndex: 9, whiteSpace: 'nowrap' }, 'ESTADOS UNIDOS');
  const crt = mkCRT(c, 440, 900, 460, 360, { z: 20, size: 66, num: true });
  const st5 = stamp(c, 380, 710, '¡CINCO!', { size: 96, bw: 12, z: 30, bg: 'rgba(255,255,255,.94)', blend: 'normal' });
}
