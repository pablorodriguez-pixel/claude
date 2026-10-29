/* ---------- rótulo INTENTO N (grande → etiqueta) ---------- */
function intentoBanner(c, n, t0) {
  const b = el('div', c, { left: '90px', top: '640px', fontFamily: 'Rye', fontSize: '96px', color: INK, background: YEL, border: `7px solid ${INK}`, borderRadius: '18px', padding: '6px 40px 14px', whiteSpace: 'nowrap', boxShadow: `10px 10px 0 ${PINK}`, zIndex: 90 }, `INTENTO ${n}`);
  const marks = box(c, 470, 168, 260, 70, { zIndex: 90, display: 'flex', gap: '12px' });
  marks.innerHTML = [1, 2, 3].map(k => `<div style="position:relative;width:66px;height:66px;border:5px solid ${INK};border-radius:12px;background:${k === n ? YEL : FIG};font-family:Playfair;font-weight:900;font-size:42px;line-height:56px;text-align:center;color:${INK}">${k}${k < n ? `<div style="position:absolute;left:-8px;top:-8px;width:82px;height:82px">${XSVG}</div>` : ''}</div>`).join('');
  return t => {
    const k = pop(t, t0, 0.4), km = p(t, t0 + 0.75, 0.35, E.inOutCubic);
    set(b, { x: lerp(0, -165, km), y: lerp(0, -474, km), s: k * lerp(1, 0.4, km), r: lerp(-5, -3, km), o: t < t0 ? 0 : 1 });
    set(marks, { x: lerp(0, 110, 0), o: km, s: 0.9 + 0.1 * km });
  };
}
const HLY = 292;

/* ======================================================================
   O · INTENTO 1 (37.22 – 43.8)  L7–L9
   ====================================================================== */
headline(40.71, 43.35, 'Los emús se *dispersan*', { size: 76, y: HLY, hlT: 42.2 });
headline(43.35, 43.8, 'Fuera de *alcance*', { size: 80, y: HLY });
{
  const E1 = [];
  const c = scene(37.22, 43.8, t => {
    ban(t);
    chat.update(t, 37.8, 40.62);
    face(mer, t, { look: [5, -1], jaw: talkW(t, 'MEREDITH', 0.7) + (t > 43.35 ? 0.5 : 0), brow: t > 43.35 ? -7 : -4, seed: 0.8 });
    const firing = t > 39.45 && t < 40.6;
    gun.flash.style.opacity = firing && Math.sin(t * 80) > 0 ? 1 : 0;
    set(gun.d, { r: -6 + (firing ? Math.sin(t * 90) * 1.5 : 0) });
    trs.forEach((tr, i) => { const ph = ((t - 39.45) * 3.5 + i / trs.length) % 1; set(tr, { x: ph * 300, y: -ph * 40, o: firing ? 1 : 0 }); });
    const ka = p(t, 37.6, 0.5, E.outBack); set(arc, { s: ka, o: t < 37.6 ? 0 : 1 });
    E1.forEach(e => {
      const k = p(t, 40.97 + e.d, 0.9, E.outCubic), moving = t > 40.97 + e.d && k < 1;
      const x = lerp(e.x0, e.x1, k), y = lerp(e.y0, e.y1, k) + (moving ? -Math.abs(Math.sin(t * 18 + e.ph)) * 14 : wobble(t, 1, 2, e.ph));
      e.u.setAttribute('href', moving ? (Math.sin(t * 18 + e.ph) > 0 ? '#emuA' : '#emuB') : (e.k && Math.sin(t * 2 + e.ph) > 0.3 ? '#emuG' : '#emuS'));
      placeU(e.u, x - 45, y - 135, 90, { flip: k > 0 && e.x1 > e.x0 });
    });
    stampA(xx, t, 43.35, -8);
    popA(fa, t, 43.4, { r: -6 });
  });
  const ban = intentoBanner(c, 1, 37.28);
  ground(c, 1070);
  const arc = box(c, 300, 840, 460, 240, { transformOrigin: '230px 230px', zIndex: 1 });
  arc.innerHTML = `<svg viewBox="0 0 460 240" width="460" height="240" style="overflow:visible"><path d="M10,230 A220,220 0 0,1 450,230 Z" fill="${YEL}" opacity=".55" style="mix-blend-mode:multiply"/><path d="M10,230 A220,220 0 0,1 450,230" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="18 12"/><text x="230" y="90" text-anchor="middle" font-family="Rye" font-size="38" fill="${INK}">ALCANCE</text></svg>`;
  const mer = mkMer(c, [60, 800, 210, 269]);
  const gun = mkGun(c, [120, 960, 300, 137]);
  const trs = []; for (let i = 0; i < 5; i++) trs.push(el('div', c, { left: '410px', top: px(1010 + (i % 3) * 7), width: '60px', height: '6px', background: INK, borderRadius: '3px' }));
  const es = svgLayer(c, 4); const r = rng(61);
  const fin = [[110, 560], [300, 520], [520, 540], [660, 610], [640, 760], [90, 700], [420, 640], [230, 650], [560, 680]];
  fin.forEach((f, i) => { E1.push({ u: use(es, '#emuS', 90, 135), x0: 520 + (r() - .5) * 240, y0: 1050 + (r() - .5) * 40, x1: f[0] + 20, y1: f[1] + 130, d: r() * 0.25, ph: r() * 6, k: r() > .5 }); });
  E1.sort((a, b) => a.y0 - b.y0).forEach(e => es.appendChild(e.u));
  const xx = box(c, 300, 700, 400, 400, { zIndex: 8 }); xx.innerHTML = XSVG;
  const fa = chip(c, 330, 1130, 'fuera de alcance', { bg: RED, size: 40, z: 9 });
  const chat = mkChat(c, 60, 390, 640, [
    { who: 'MEREDITH', words: [100, 103], t: 38.28, ty: 37.9, h: 110, fs: 38 },
    { who: 'MEREDITH', words: [104, 105], emoji: '💥', t: 39.36, ty: 39.05, h: 110, fs: 38 },
  ], { h: 430 });
}

/* ======================================================================
   P · INTENTO 2 (44.45 – 52.78)  L10–L12
   ====================================================================== */
headline(45.2, 47.4, 'Una *emboscada*', { size: 86, y: HLY, hlT: 45.6 });
headline(49.55, 51.66, 'Y la ametralladora…', { size: 80, y: HLY });
{
  const CR = [];
  const c = scene(44.45, 51.66, t => {
    ban(t);
    chat.update(t, 47.3, 49.55);
    CR.forEach(e => { const kin = p(t, 46.2 + e.d, 0.6, E.outCubic); const scat = t > 50.4 ? p(t, 50.4 + e.d, 0.9, E.inCubic) : 0;
      const moving = (kin > 0 && kin < 1) || scat > 0;
      e.u.setAttribute('href', moving ? (Math.sin(t * 18 + e.ph) > 0 ? '#emuA' : '#emuB') : (e.k && Math.sin(t * 3 + e.ph) > 0 ? '#emuG' : '#emuS'));
      placeU(e.u, e.x + (1 - kin) * 500 + scat * 500, e.y + wobble(t, 1.2, 2, e.ph) - (moving ? Math.abs(Math.sin(t * 18)) * 10 : 0), e.w, { flip: scat > 0, o: t < 46.2 + e.d ? 0 : 1 }); });
    bushes.forEach((b, i) => { const k = pop(t, 45.55 + i * 0.06, 0.4); b.setAttribute('transform', `translate(${b.bx},${b.by}) scale(${f1(k * 100) / 100}) translate(-130,-160)`); });
    const up = p(t, 49.7, 0.35, E.outBack);
    set(sol.d, { y: (1 - up) * 200 + shake(t, 51.1, 0.5, 6) }); set(gun.d, { y: (1 - up) * 200, x: (t > 49.95 && t < 51.0 ? Math.sin(t * 90) * 5 : 0) + shake(t, 51.1, 0.6, 10), r: -6 + shake(t, 51.1, 0.6, 3) });
    face(sol, t, { look: [5, -2], jaw: t > 51.1 ? 0.8 : t > 49.95 ? 0.3 : 0, brow: t > 51.1 ? -7 : 0, seed: 0.2 });
    face(mer, t, { look: [4, -3], jaw: talkW(t, 'MEREDITH', 0.7), brow: -6, seed: 0.6 }); set(mer.d, { y: (1 - p(t, 45.6, 0.4, E.outBack)) * 300, o: t < 45.6 ? 0 : 1 });
    const firing = t > 49.95 && t < 51.0; gun.flash.style.opacity = firing && Math.sin(t * 80) > 0 ? 1 : 0;
    trs.forEach((tr, i) => { const ph = ((t - 49.95) * 4 + i / trs.length) % 1; set(tr, { x: ph * 340, y: -ph * 60, o: firing ? 1 : 0 }); });
    smk.forEach((s, i) => { const k = p(t, 51.1 + i * 0.08, 0.6); set(s, { s: t < 51.1 + i * 0.08 ? 0 : 0.3 + k, y: -k * 140, x: k * 30 * (i % 2 ? 1 : -1), o: t < 51.1 ? 0 : 1 - k * 0.5 }); });
    const ks = p(t, 51.15, 0.5, E.outElastic); set(spr, { y: -ks * 150, r: ks * 40, o: t < 51.15 ? 0 : 1, s: 0.6 + ks * 0.4 });
    popA(n1k, t, 46.6, { r: 2 }); n1k.textContent = '≈ ' + fmt(Math.round(counter(t, 46.6, 0.5, 0, 1000) / 10) * 10) + ' emús';
  });
  const ban = intentoBanner(c, 2, 44.45);
  ground(c, 1070);
  const hs = svgLayer(c, 2); const r = rng(72);
  for (let i = 0; i < 30; i++) { const row = Math.floor(i / 6), w = 62 + row * 10; CR.push({ u: use(hs, '#emuS', w, w * 1.5), x: 330 + (i % 6) * 62 + (row % 2) * 24 + (r() - .5) * 16, y: 560 + row * 86, w, ph: r() * 6, d: r() * 0.3, k: r() > 0.5 }); }
  const bs = svgLayer(c, 3); const bushes = [];
  [[140, 1076], [310, 1090], [480, 1070], [640, 1088], [400, 980]].forEach(q => { const u = use(bs, '#bush', 260, 170); u.bx = q[0]; u.by = q[1]; bushes.push(u); });
  const n1k = chip(c, 350, 470, '≈ 1.000 emús', { size: 44, bg: INK, color: YEL, z: 8 });
  const mer = mkMer(c, [40, 760, 190, 243]); mer.d.style.zIndex = 2;
  const sol = mkSol(c, [190, 820, 170, 218], 12); sol.d.style.zIndex = 2;
  const gun = mkGun(c, [210, 940, 300, 137]); gun.d.style.zIndex = 4;
  const trs = []; for (let i = 0; i < 6; i++) trs.push(el('div', c, { left: '500px', top: px(990 + (i % 3) * 8), width: '60px', height: '6px', background: INK, borderRadius: '3px', zIndex: 4 }));
  const smk = []; for (let i = 0; i < 6; i++) smk.push(el('div', c, { left: px(280 + i * 22), top: '930px', width: '90px', height: '90px', borderRadius: '50%', background: '#d9d0bf', border: `4px solid ${INK}`, zIndex: 5, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.35) 0 2px, transparent 2px 7px)' }));
  const spr = box(c, 330, 930, 60, 120, { zIndex: 6 }); spr.innerHTML = `<svg viewBox="0 0 60 120" width="60" height="120" style="overflow:visible"><path d="M30,120 L10,108 L50,96 L10,84 L50,72 L10,60 L50,48 L10,36 L50,24 L30,12" stroke="#fff" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M30,120 L10,108 L50,96 L10,84 L50,72 L10,60 L50,48 L10,36 L50,24 L30,12" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/></svg>`;
  const chat = mkChat(c, 60, 390, 640, [
    { who: 'MEREDITH', words: [104, 105], emoji: '💥', old: true, h: 100, fs: 36 },
    { who: 'MEREDITH', words: [123, 127], emoji: '😤', t: 47.68, ty: 47.35, h: 150, fs: 40 },
  ], { h: 460 });
}
colorHit(51.66, 52.5, YEL, c => {
  const g = mkGun(c, [140, 600, 800, 365]); g.d.style.filter = SIL; g.d.style.zIndex = 3;
  const sp = box(c, 500, 400, 120, 240, { zIndex: 3 }); sp.innerHTML = `<svg viewBox="0 0 60 120" width="120" height="240" style="overflow:visible"><path d="M30,120 L10,108 L50,96 L10,84 L50,72 L10,60 L50,48 L10,36 L50,24 L30,12" stroke="${INK}" stroke-width="7" fill="none" stroke-linejoin="round"/></svg>`;
  const pf = []; for (let i = 0; i < 4; i++) pf.push(box(c, 340 + i * 70, 560, 130, 130, { borderRadius: '50%', background: INK, zIndex: 2 }));
  const t1 = el('div', c, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '118px', lineHeight: 1, color: INK, zIndex: 4 }, '…se encasquilla');
  const st = stamp(c, 400, 1040, '¡ATASCO!', { size: 110, bw: 12, z: 5 });
  return t => {
    set(g.d, { r: -4 + Math.sin(t * 50) * 2 * (1 - p(t, 51.66, 0.5)), s: lerp(1.15, 1, p(t, 51.66, 0.2)) });
    const ks = p(t, 51.7, 0.5, E.outElastic); set(sp, { y: -ks * 140, r: ks * 30, s: 0.6 + ks * 0.5 });
    pf.forEach((q, i) => { const k = p(t, 51.7 + i * 0.07, 0.6); set(q, { s: 0.3 + k, y: -k * 160, o: 1 }); });
    set(t1, { s: lerp(1.3, 1, p(t, 51.66, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, 51.66, 0.3);
    stampA(st, t, 51.8, -10);
  };
});
// después del atasco: los emús se ríen
{
  const c = scene(52.5, 52.78, t => { lol.forEach((e, i) => { set(e.d, { y: -Math.abs(Math.sin(t * 14 + i)) * 40 }); face(e, t, { jaw: 0.8, closed: true, wing: Math.sin(t * 30 + i) * 30, seed: i }); }); }, { cut: true });
  const lol = [mkEmu(c, [120, 620, 300, 450], { seed: 71 }), mkEmu(c, [400, 560, 320, 480], { seed: 72 })];
  el('div', c, { left: '160px', top: '480px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '110px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 5 }, 'JA JA JA');
}

/* ======================================================================
   Q · INTENTO 3 (53.4 – 62.04)  L13–L15
   ====================================================================== */
headline(54.4, 56.1, 'Montan la ametralladora en un *camión*', { size: 64, y: HLY, hlT: 55.77 });
headline(58.1, 59.54, 'Los emús corren *más*', { size: 80, y: HLY, hlT: 58.69 });
headline(59.54, 62.04, 'No hay quien *apunte*', { size: 80, y: HLY, hlT: 61.64 });
{
  const R3 = [];
  const c = scene(53.4, 62.04, t => {
    ban(t);
    chat.update(t, 55.95, 58.05);
    const kin = p(t, 53.5, 0.8, E.outCubic), chase = t > 58.1;
    const bounce = t > 59.9 ? Math.abs(Math.sin((t - 59.9) * 9)) * 50 : (chase || t < 54.3 ? Math.abs(Math.sin(t * 20)) * 3 : 0);
    set(rig, { x: lerp(-760, 0, kin) - (chase ? p(t, 58.1, 1.5, E.inOutCubic) * 60 : 0), y: -bounce + shake(t, 55.39, 0.35, 8), r: t > 59.9 ? Math.sin((t - 59.9) * 9) * 5 : 0 });
    const spin = t < 54.3 || chase ? t * 720 : 54.3 * 720;
    tr.wheels.forEach(w => { const [cx, cy] = w.dataset.c.split(','); w.setAttribute('transform', `rotate(${f1(spin)} ${cx} ${cy})`); });
    // mano gigante
    const kd = p(t, 54.5, 0.85, E.inOutCubic), ku = p(t, 55.6, 0.5, E.inCubic);
    const hy = -(1 - kd) * 1300 - ku * 1400;
    set(hand.d, { y: hy, o: t > 54.45 && t < 56.2 ? 1 : 0, r: Math.sin(t * 3) * 1.5 });
    set(gunH.d, { y: t < 55.39 ? -(1 - kd) * 1300 : 0, r: t < 55.39 ? Math.sin(t * 6) * 4 : (t > 59.9 ? Math.sin(t * 23) * 8 : 0), o: t > 54.45 ? 1 : 0 });
    popA(thudT, t, 55.39, { r: -6, o: 1 - p(t, 56.0, 0.2) });
    const kg = p(t, 55.6, 0.4, E.outBack); set(gunner.d, { y: (1 - kg) * 120, o: t < 55.6 ? 0 : 1 });
    face(gunner, t, { jaw: t > 59.9 ? 0.5 + Math.sin(t * 20) * 0.2 : 0, brow: t > 59.9 ? -6 : 0, look: [5, -2] });
    dash.forEach((d, i) => { const x = ((i * 180 - t * 1000) % 1080 + 1080) % 1080; set(d, { x, o: chase ? 1 : 0 }); });
    R3.forEach((e, i) => { const k = p(t, 58.15 + i * 0.1, 0.5, E.outCubic); const lead = p(t, 58.6, 3, E.linear) * 60 + Math.sin(t * 1.3 + i) * 12; const x = e.x + lead + (1 - k) * -500, y = e.y - Math.abs(Math.sin(t * 22 + e.ph)) * 16;
      e.u.setAttribute('href', Math.sin(t * 22 + e.ph) > 0 ? '#emuA' : '#emuB'); placeU(e.u, x, y, e.w, { flip: true, o: chase ? 1 : 0 }); });
    sl.forEach((s, i) => set(s, { o: chase ? 0.9 : 0, x: -((t * 900 + i * 70) % 160) }));
    popA(fast, t, 58.7, { r: 3 });
    const aim = t > 60.9; const ax = 540 + Math.sin(t * 13) * 140 + Math.sin(t * 31) * 50, ay = 700 + Math.cos(t * 17) * 150 + Math.sin(t * 27) * 40;
    set(cross, { x: ax - 110, y: ay - 110, o: aim && t < 61.64 ? 1 : 0, r: t * 90 });
    popA(boing, t, 60.23, { r: -6 });
    stampA(xx, t, 61.64, -8);
  });
  const ban = intentoBanner(c, 3, 53.4);
  ground(c, 1150);
  const dash = []; for (let i = 0; i < 7; i++) dash.push(el('div', c, { left: 0, top: '1180px', width: '90px', height: '7px', background: INK, borderRadius: '4px' }));
  const es = svgLayer(c, 2);
  [[400, 560, 150], [520, 620, 140], [420, 740, 160], [550, 790, 130]].forEach((q, i) => R3.push({ u: use(es, '#emuA', q[2], q[2] * 1.5), x: q[0], y: q[1], w: q[2], ph: i * 1.7 }));
  const sl = []; for (let i = 0; i < 5; i++) sl.push(el('div', c, { left: px(380), top: px(660 + i * 70), width: '110px', height: '6px', background: INK, borderRadius: '3px', zIndex: 3 }));
  const rig = box(c, 0, 0, 1080, 1920, { zIndex: 4 });
  const gunner = mkSol(rig, [190, 790, 160, 205], 14);
  const tr = mk(rig, [140, 860, 520, 286], truckInner(), '0 0 600 330', 'truck');
  const gunH = mkGun(rig, [190, 880, 300, 137]); gunH.d.style.zIndex = 3;
  const hand = mk(c, [168, 271, 300, 675], handInner(), '0 0 400 900', 'hand'); hand.d.style.zIndex = 20;
  const thudT = el('div', c, { left: '480px', top: '820px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '90px', color: YEL, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 21, whiteSpace: 'nowrap' }, '¡CLONC!');
  const fast = chip(c, 70, 450, 'más rápidos →', { size: 44, z: 6 });
  const cross = box(c, 0, 0, 220, 220, { zIndex: 8 }); cross.innerHTML = `<svg viewBox="0 0 220 220" width="220" height="220"><circle cx="110" cy="110" r="80" fill="none" stroke="${INK}" stroke-width="16"/><circle cx="110" cy="110" r="80" fill="none" stroke="${PINK}" stroke-width="9"/><path d="M110,10 V80 M110,140 V210 M10,110 H80 M140,110 H210" stroke="${INK}" stroke-width="14"/><path d="M110,10 V80 M110,140 V210 M10,110 H80 M140,110 H210" stroke="${PINK}" stroke-width="7"/></svg>`;
  const boing = el('div', c, { left: '70px', top: '600px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '110px', color: YEL, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 7, whiteSpace: 'nowrap' }, '¡BOING!');
  const xx = box(c, 300, 560, 400, 400, { zIndex: 9 }); xx.innerHTML = XSVG;
  const chat = mkChat(c, 60, 390, 640, [
    { who: 'MINISTRO', words: [141, 143], t: 56.3, ty: 56.0, h: 110, fs: 40 },
    { who: 'MINISTRO', words: [144, 144], emoji: '🧐', t: 57.2, ty: 56.95, h: 110, fs: 40 },
  ], { h: 430 });
}

/* ======================================================================
   R · RETIRADA · VUELVEN (62.7 – 64.75)  L16a
   ====================================================================== */
headline(62.7, 63.15, '*Retirada*.', { size: 110, hlT: 62.72 });
headline(63.15, 64.75, 'Vuelven unos días *después*', { size: 72, hlT: 64.21 });
{
  const pages = [];
  const c = scene(62.7, 64.75, t => {
    const a = t < 63.15;
    fl.style.display = a ? '' : 'none'; cal.style.display = a ? 'none' : '';
    if (a) {
      set(flagSol.d, { y: wobble(t, 1.4, 3) }); face(flagSol, t, { jaw: 0.1, brow: 4, look: [0, 4], seed: 2 });
      let d = 'M0,0'; for (let x = 0; x <= 300; x += 20) d += `L${x},${f1(Math.sin(x * 0.03 - t * 8) * 14 * (x / 300))}`; for (let x = 300; x >= 0; x -= 20) d += `L${x},${f1(170 + Math.sin(x * 0.03 - t * 8) * 14 * (x / 300))}`;
      flagP.setAttribute('d', d + 'Z'); flagP2.setAttribute('d', d + 'Z');
      cheer.forEach((e, i) => { set(e.d, { y: -Math.abs(Math.sin(t * 7 + i)) * 30 }); face(e, t, { jaw: 0.7 + Math.sin(t * 20 + i) * 0.25, half: true, wing: Math.sin(t * 25 + i) * 25, seed: i }); });
    } else {
      set(calW, { s: pop(t, 63.17, 0.4), r: -3, o: 1 });
      pages.forEach((pg, i) => { const te = 63.4 + i * 0.17; const k = p(t, te, 0.4, E.inCubic); set(pg, { x: k * 300, y: k * 500, r: k * 50, o: t < te ? 1 : 1 - k }); });
      popA(c2, t, 64.2, { r: -4 });
    }
  });
  const fl = box(c, 0, 0, 1080, 1920);
  const flagW = box(fl, 300, 430, 360, 600);
  flagW.innerHTML = `<svg viewBox="0 0 360 600" width="360" height="600" style="overflow:visible"><rect x="16" y="0" width="12" height="600" fill="#b89a6a" stroke="${INK}" stroke-width="4"/><g transform="translate(28,14)"><path class="fp2" fill="${SH}" transform="translate(8,10)"/><path class="fp" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g><circle cx="22" cy="0" r="12" fill="${YEL}" stroke="${INK}" stroke-width="4"/></svg>`;
  const flagP = flagW.querySelector('.fp'), flagP2 = flagW.querySelector('.fp2');
  const flagSol = mkSol(fl, [150, 720, 330, 422], 15);
  const cheer = [mkEmu(fl, [470, 700, 260, 390], { seed: 51 }), mkEmu(fl, [400, 380, 200, 300], { seed: 52 })];
  const cal = box(c, 0, 0, 1080, 1920);
  const calW = box(cal, 170, 450, 500, 560);
  calW.innerHTML = `<div style="position:absolute;left:0;top:0;width:500px;height:560px;background:${FIG};border:6px solid ${INK};border-radius:16px;box-shadow:10px 12px 0 ${SH}"></div><div style="position:absolute;left:0;top:0;width:500px;height:110px;background:${INK};border-radius:16px 16px 0 0;color:${PAPER};font-family:Rye;font-size:52px;text-align:center;line-height:110px">1932</div>`;
  ['DOMINGO', 'SÁBADO', 'VIERNES', 'JUEVES', 'MIÉRCOLES', 'MARTES'].forEach((d, i) => { const pg = el('div', calW, { left: '14px', top: '120px', width: '472px', height: '420px', background: i % 2 ? '#F7F0E0' : '#FBF6EA', border: `3px solid ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: d.length > 7 ? '74px' : '88px', lineHeight: '420px', color: INK }, d); pages.unshift(pg); });
  const c2 = chip(cal, 380, 1050, 'unos días después', { size: 42 });
}

/* ======================================================================
   S · EL BALANCE (64.75 – 71.45)  L16b
   ====================================================================== */
headline(64.75, 68.9, 'Según *Meredith*…', { size: 88, hlT: 65.58 });
headline(68.9, 71.45, '…con *9.860* balas', { size: 88, hlT: 69.3 });
{
  const c = scene(64.75, 71.45, t => {
    set(mer.d, { x: (1 - p(t, 64.8, 0.45, E.outBack)) * -500, y: wobble(t, 0.6, 4) });
    face(mer, t, { jaw: t > 66.1 && t < 66.7 ? 0.3 : 0, seed: 0.5, look: [5, -1], brow: -5 });
    popA(seg, t, 65.97, { r: -5 });
    const a = counter(t, 66.74, 1.8, 0, 986), b = counter(t, 69.05, 1.6, 0, 9860);
    nA.textContent = fmt(Math.round(a)); nB.textContent = fmt(Math.round(b));
    popA(bA, t, 66.7, {}); popA(bB, t, 69.0, {});
    paint(hA, t, 68.05, 0.3); paint(hB, t, 70.59, 0.3);
    eA.forEach((e, i) => set(e, { o: a >= (i + 1) * 98 ? 1 : 0.12, s: a >= (i + 1) * 98 ? 1 : 0.8 }));
  });
  const mer = mkMer(c, [40, 440, 340, 435]);
  const seg = chip(c, 70, 890, 'según él', { size: 44, bg: INK, color: YEL });
  const bA = box(c, 400, 420, 560, 300, { zIndex: 4 });
  bA.innerHTML = `<div class="n" style="position:absolute;left:0;top:0;font-family:Playfair;font-weight:900;font-size:190px;line-height:200px;color:${INK};text-shadow:8px 8px 0 ${YEL}">0</div><div style="position:absolute;left:8px;top:196px;font-family:Playfair;font-style:italic;font-weight:800;font-size:56px;color:${INK};white-space:nowrap">${hlSpan('emús', 'ha')} abatidos</div>`;
  const nA = bA.querySelector('.n'), hA = bA.querySelector('.ha');
  const eA = []; for (let i = 0; i < 10; i++) { const e = box(c, 420 + i * 50, 730, 46, 69, { zIndex: 4 }); e.innerHTML = cropUse('emuS', '40 30 360 560'); eA.push(e); }
  const bB = box(c, 400, 830, 560, 300, { zIndex: 4 });
  bB.innerHTML = `<div class="n" style="position:absolute;left:0;top:0;font-family:Playfair;font-weight:900;font-size:190px;line-height:200px;color:${INK};text-shadow:8px 8px 0 ${PINK}">0</div><div style="position:absolute;left:8px;top:196px;font-family:Playfair;font-style:italic;font-weight:800;font-size:56px;color:${INK};white-space:nowrap">${hlSpan('balas', 'hb')}</div>`;
  const nB = bB.querySelector('.n'), hB = bB.querySelector('.hb');
}
colorHit(71.45, 72.25, YEL, c => {
  const t0 = el('div', c, { left: '0', top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '64px', color: INK, zIndex: 4 }, '9.860 ÷ 986 =');
  const t1 = el('div', c, { left: '0', top: '330px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '440px', lineHeight: 1, color: INK, zIndex: 4 }, '10');
  const t2 = el('div', c, { left: '0', top: '790px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '110px', lineHeight: 1, color: INK, zIndex: 4 }, 'balas por emú');
  const e = mkEmu(c, [600, 920, 300, 450], { seed: 9 }); e.d.style.filter = SIL; e.d.style.zIndex = 3;
  return t => {
    popA(t0, t, 71.45, { d: 0.25 }); set(t1, { s: lerp(1.6, 1, p(t, 71.5, 0.25, E.outBack)), o: t < 71.5 ? 0 : 1 }); t1.style.textShadow = glitch(t, 71.5, 0.3);
    popA(t2, t, 71.77, { d: 0.3 });
    set(e.d, { y: -Math.abs(Math.sin(t * 12)) * 30 }); face(e, t, { jaw: 0.8, wing: Math.sin(t * 30) * 30 });
  };
});
{ // fondo para la explosión del humillómetro
  const c = scene(72.25, 72.95, () => { }, { cut: true });
  sceneBg(c, { background: PINK });
}

/* ======================================================================
   T · ORGULLOSO (72.95 – 75.25)  L17
   ====================================================================== */
headline(72.95, 75.25, 'Y el hombre, *orgulloso*…', { size: 80, hlT: 73.58 });
{
  const c = scene(72.95, 75.25, t => {
    const puff = p(t, 73.58, 0.4, E.outBack);
    set(mer.d, { sy: 1 + 0.06 * puff, sx: 1 + 0.03 * puff, y: wobble(t, 0.6, 3) - puff * 10 });
    face(mer, t, { look: [-3, -4], brow: -2, jaw: 0, closed: t > 73.6 && t < 74.4, seed: 0.5 });
    mer.medals.forEach((m, i) => { const [cx, cy] = m.dataset.c.split(','); m.setAttribute('transform', `rotate(${f1(Math.sin(t * 6 + i) * 8 * (t > 73.58 ? 1 : 0.3))} ${cx} ${cy})`); });
    spk.forEach((s, i) => set(s, { o: t > 73.6 ? 1 : 0, s: 0.6 + Math.abs(Math.sin(t * 6 + i)) * 0.6, r: t * 100 + i * 40 }));
    popA(su, t, 74.4, { r: 3 });
  });
  const ry = rays(c, -180, 220, 1440, 24, 'rgba(255,230,0,.55)', 'rgba(0,0,0,0)', 0);
  const mer = mkMer(c, [400, 420, 540, 690], true);
  const spk = [[440, 470], [880, 520], [820, 900], [480, 860]].map(q => el('div', c, { left: px(q[0]), top: px(q[1]), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 5 }, '✦'));
  const su = chip(c, 560, 1160, 'y suelta esto:', { size: 40, bg: INK, color: YEL });
}

/* ======================================================================
   U · LA CITA (75.25 – 80.76)  L18 — chat en grande
   ====================================================================== */
{
  const qw = [];
  const c = scene(75.25, 80.76, t => {
    set(hdr, { y: (1 - p(t, 75.27, 0.35, E.outBack)) * -200, o: 1 });
    const kb = pop(t, 75.3, 0.4); set(bub, { s: kb, o: t < 75.28 ? 0 : 1, r: -1 });
    qw.forEach(q => { q.e.style.opacity = t >= q.t - 0.05 ? 1 : 0.14; if (q.h) paint(q.h, t, q.t + 0.1, 0.3); });
    const puff = 0.5 + 0.5 * Math.sin(t * 2.2);
    set(mer.d, { y: (1 - p(t, 75.3, 0.45, E.outBack)) * 600 + wobble(t, 0.7, 3), sy: 1 + 0.05 * puff, sx: 1 + 0.025 * puff });
    face(mer, t, { jaw: talkW(t, 'MEREDITH', 0.8), seed: 0.9, look: [5, -3], brow: t > 79.2 ? -7 : -3 });
    mer.medals.forEach((m, i) => { const [cx, cy] = m.dataset.c.split(','); m.setAttribute('transform', `rotate(${f1(Math.sin(t * 5 + i) * 7)} ${cx} ${cy})`); });
    const kt = p(t, 76.0, 0.6, E.outBack); set(tank.d, { x: (1 - kt) * 600 + Math.sin(t * 1.5) * 12, y: wobble(t, 3, 2) + shake(t, 79.5, 0.3, 8), o: t < 75.9 ? 0 : 1 });
    face(tank, t, { half: true, look: [-4, 2], jaw: t > 79.5 && t < 80.2 ? 0.5 : 0, wing: t > 77.55 && t < 78.35 ? -40 : 0 });
    tank.wheels.forEach(w => { const [cx, cy] = w.dataset.c.split(','); w.setAttribute('transform', `rotate(${f1(-t * 200)} ${cx} ${cy})`); });
    if (tank.track) tank.track.setAttribute('stroke-dashoffset', f1(t * 40));
    set(rc, { r: 3 + wobble(t, 0.8, 2) });
  });
  const hdr = box(c, 60, 170, 960, 110, { background: INK, borderRadius: '20px', border: `4px solid ${BRASS}`, zIndex: 20, boxShadow: `8px 8px 0 ${SH}` });
  const gav = box(hdr, 14, 12, 80, 80, { borderRadius: '50%', overflow: 'hidden', background: YEL, border: `3px solid ${BRASS}` }); gav.innerHTML = cropUse('emuS', '50 30 150 110');
  el('div', hdr, { left: '112px', top: '10px', fontFamily: 'Rye', fontSize: '42px', color: YEL, whiteSpace: 'nowrap' }, 'OPERACIÓN EMÚ 🐦');
  el('div', hdr, { left: '114px', top: '60px', fontFamily: 'SpecialElite', fontSize: '26px', color: PAPER, whiteSpace: 'nowrap' }, 'Mayor Meredith está escribiendo…');
  const rc = chip(hdr, 640, 70, 'recreación con humor', { size: 26, bg: PINK, z: 30 });
  const bub = box(c, 60, 310, 900, 560, { background: '#fff', border: `5px solid ${INK}`, borderRadius: '10px 44px 44px 44px', boxShadow: `10px 12px 0 ${SH}`, zIndex: 10 });
  box(bub, 0, 0, 890, 550, { borderRadius: '10px 44px 44px 44px', backgroundImage: `repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 2px, transparent 2px 40px)` });
  avatar(bub, 26, -30, 88, 'MEREDITH', { bw: 4 });
  el('div', bub, { left: '128px', top: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: '#5a3d22', whiteSpace: 'nowrap' }, 'Mayor Meredith');
  const qt = el('div', bub, { left: '40px', top: '72px', width: '820px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 600, fontSize: '60px', lineHeight: 1.2, color: INK });
  for (let i = 192; i <= 208; i++) {
    let w0 = W[i].w; if (i === 192) w0 = '«' + w0; if (i === 208) w0 = w0.replace('.', '»');
    const sp = document.createElement('span'); sp.style.display = 'inline-block'; sp.style.marginRight = '0.24em';
    const key = i === 198 || i === 201 || i === 203 || i === 206;
    if (key) { sp.innerHTML = hlSpan(w0, 'qh', i === 203 || i === 206 ? PINK : YEL); sp.style.fontWeight = 800; }
    else sp.textContent = w0;
    qt.appendChild(sp); qw.push({ e: sp, t: W[i].s, h: key ? sp.querySelector('.qh') : null });
  }
  el('div', bub, { left: '560px', top: '500px', fontFamily: 'SpecialElite', fontSize: '28px', color: '#7a6a58', whiteSpace: 'nowrap' }, '— Mayor Meredith ✓✓');
  const tank = mkEmu(c, [500, 790, 420, 630], { seed: 61, helmet: true, tank: true });
  const mer = mkMer(c, [30, 860, 440, 563], true); mer.d.style.zIndex = 5;
}

/* ======================================================================
   V · ¡OJO! (80.76 – 88.5)  L19
   ====================================================================== */
headline(81.2, 83.25, 'No *resolvió* el problema', { size: 76, hlT: 82.27 });
headline(83.25, 86.4, 'Lo que *funcionó*', { size: 84, hlT: 83.7 });
headline(86.4, 87.62, 'Menos *épico*.', { size: 96 });
headline(87.62, 88.5, 'Más *útil*.', { size: 100 });
{
  const c = scene(80.76, 88.5, t => {
    const ko = p(t, 81.15, 0.35, E.inOutCubic);
    set(ojo, { s: lerp(1, 0.42, ko) * (t < 80.84 ? 0 : lerp(2.3, 1, p(t, 80.84, 0.18))), x: ko * 300, y: ko * -40, r: -8, o: t < 80.84 ? 0 : 0.97 });
    set(board, { y: (1 - p(t, 81.1, 0.45, E.outBack)) * 1200, o: t < 81.0 ? 0 : 1 });
    const kA = pop(t, 81.47, 0.4), ep = p(t, 86.43, 0.5);
    set(cA, { s: kA * lerp(1, 0.86, ep), r: -3, o: t < 81.47 ? 0 : lerp(1, 0.55, ep) });
    cA.style.filter = ep > 0 ? `grayscale(${f1(ep * 100) / 100})` : 'none';
    set(rayA, { r: t * 30 });
    stampA(noR, t, 82.27, -12);
    const th = p(t, 83.3, 0.5, E.inOutCubic); thread.setAttribute('stroke-dashoffset', f1((1 - th) * 700)); thr.style.opacity = t < 83.3 ? 0 : 1;
    const ul = p(t, 87.66, 0.35, E.outBack);
    set(cB, { s: pop(t, 83.56, 0.4) * (1 + 0.12 * ul), r: 2, o: t < 83.56 ? 0 : 1 });
    popA(coin, t, 84.84, { r: wobble(t, 1, 6) });
    // mano gigante coloca la valla
    const kd = p(t, 85.2, 0.6, E.inOutCubic), ku = p(t, 86.0, 0.45, E.inCubic);
    set(hand.d, { y: -(1 - kd) * 1300 - ku * 1400, o: t > 85.15 && t < 86.5 ? 1 : 0 });
    set(fen, { y: t < 85.82 ? -(1 - kd) * 1300 : 0, o: t > 85.15 ? 1 : 0, s: 1 + 0.15 * ul });
    stampA(ok, t, 85.9, 8);
    set(spk, { o: t > 87.66 ? 1 : 0, s: 0.8 + Math.sin(t * 12) * 0.2, r: t * 120 });
  });
  const ojo = stamp(c, 330, 520, '¡OJO!', { size: 160, bw: 14, z: 40, bg: 'rgba(255,255,255,.7)', blend: 'normal' });
  const board = box(c, 50, 420, 900, 560, { background: '#B48C5C', border: `16px solid #5a3d22`, borderRadius: '12px', boxShadow: `10px 12px 0 ${SH}` });
  box(board, 0, 0, 868, 528, { backgroundImage: 'radial-gradient(rgba(60,35,10,.35) 1.5px, transparent 2px)', backgroundSize: '14px 14px' });
  const th = svgLayer(c, 8); th.innerHTML = `<path class="thr" d="M330,760 Q450,830 620,720" stroke="${RED}" stroke-width="6" fill="none" stroke-dasharray="700" stroke-dashoffset="700"/><circle cx="330" cy="760" r="14" fill="${PINK}" stroke="${INK}" stroke-width="4"/><circle cx="620" cy="720" r="14" fill="${PINK}" stroke="${INK}" stroke-width="4"/>`;
  const thread = th.querySelector('.thr'), thr = th.parentNode;
  const cA = box(c, 90, 470, 420, 330, { background: '#F7F0E0', border: `4px solid ${INK}`, boxShadow: `8px 8px 0 ${SH}`, overflow: 'hidden', zIndex: 5 });
  const rayA = box(cA, -140, -180, 700, 700); { let s = ''; for (let i = 0; i < 16; i++) { const a0 = i / 16 * 6.283, a1 = (i + .5) / 16 * 6.283; s += `<path d="M350,350 L${f1(350 + 500 * Math.cos(a0))},${f1(350 + 500 * Math.sin(a0))} L${f1(350 + 500 * Math.cos(a1))},${f1(350 + 500 * Math.sin(a1))} Z" fill="${i % 2 ? YEL : PINK}"/>`; } rayA.innerHTML = `<svg viewBox="0 0 700 700" width="700" height="700">${s}</svg>`; }
  const ca = box(cA, 0, 0, 420, 330); ca.innerHTML = `<svg viewBox="0 0 420 330" width="420" height="330" style="overflow:visible"><use href="#merS" x="10" y="60" width="200" height="256"/><use href="#gunS" x="160" y="180" width="250" height="114"/></svg>`;
  el('div', cA, { left: '0', top: '0', width: '420px', background: INK, color: PAPER, fontFamily: 'SpecialElite', fontSize: '32px', textAlign: 'center', padding: '8px 0' }, 'OPERACIÓN MILITAR');
  const noR = stamp(c, 110, 640, 'NO RESOLVIÓ', { size: 56, z: 9 });
  const cB = box(c, 520, 560, 410, 360, { background: '#F7F0E0', border: `4px solid ${INK}`, boxShadow: `8px 8px 0 ${SH}`, zIndex: 5 });
  el('div', cB, { left: '0', top: '0', width: '402px', background: INK, color: YEL, fontFamily: 'SpecialElite', fontSize: '30px', textAlign: 'center', padding: '8px 0' }, 'RECOMPENSAS + VALLAS');
  const coin = box(cB, 24, 76, 150, 150); coin.innerHTML = `<svg viewBox="0 0 150 150" width="150" height="150" style="overflow:visible">${cut('<circle cx="75" cy="75" r="62"/>', 5, 7)}<circle cx="75" cy="75" r="62" fill="#e9c75c" stroke="${INK}" stroke-width="5"/><circle cx="75" cy="75" r="48" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 5"/><text x="75" y="96" text-anchor="middle" font-family="Rye" font-size="60" fill="${INK}">✦</text></svg>`;
  el('div', cB, { left: '22px', top: '240px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'recompensas');
  el('div', cB, { left: '232px', top: '240px', fontFamily: 'SpecialElite', fontSize: '30px', color: INK }, 'vallas');
  const fen = box(c, 720, 630, 200, 150, { zIndex: 12 }); fen.innerHTML = `<svg viewBox="0 0 220 150" width="200" height="136" style="overflow:visible"><path d="M10,40 H210 M10,90 H210" stroke="${INK}" stroke-width="12"/><path d="M10,40 H210 M10,90 H210" stroke="#e3d3ae" stroke-width="6"/>${[20, 80, 140, 200].map(x => `<rect x="${x - 9}" y="10" width="18" height="135" fill="#d8c7a2" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`;
  const hand = mk(c, [668, -220, 300, 675], handInner(), '0 0 400 900', 'hand'); hand.d.style.zIndex = 20;
  hand.d.style.top = px(630 - 664 + 20);
  const ok = box(c, 800, 820, 140, 140, { zIndex: 13 }); ok.innerHTML = `<div style="position:absolute;inset:0;background:${YEL};border:5px solid ${INK};border-radius:50%"></div><div style="position:absolute;left:22px;top:22px;width:96px;height:96px">${CHECK}</div>`;
  const spk = el('div', c, { left: '700px', top: '980px', fontSize: '90px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 14 }, '✦');
  // contraste grande bajo el tablón
  const vs = box(c, 420, 1010, 520, 260, { zIndex: 6 });
  vs.innerHTML = `<div style="position:absolute;left:0;top:0;font-family:Playfair;font-weight:900;font-size:44px;color:${INK};white-space:nowrap"><span style="color:${RED}">✗</span> operación militar</div><div style="position:absolute;left:0;top:70px;font-family:Playfair;font-weight:900;font-size:44px;color:${INK};white-space:nowrap"><span style="color:#2f7a3a">✓</span> recompensas + vallas</div>`;
  const vA = vs.children[0], vB = vs.children[1];
  SC[SC.length - 1].fn = ((f) => t => { f(t); popA(vA, t, 82.3, { rise: 20, o: lerp(1, 0.45, p(t, 86.43, 0.4)) }); popA(vB, t, 85.85, { rise: 20, s: 1 + 0.08 * p(t, 87.66, 0.3, E.outBack) }); })(SC[SC.length - 1].fn);
}

/* ======================================================================
   X · EJÉRCITO VS PÁJAROS (88.5 – 93.75)  L20
   ====================================================================== */
headline(88.5, 90.97, 'Un ejército contra unos *pájaros*', { size: 72, hlT: 90.47 });
headline(91.85, 93.75, 'Y ni se *enteraron*', { size: 88, hlT: 92.92 });
{
  const c = scene(88.5, 93.75, t => {
    const peck = 0.5 + 0.5 * Math.sin(t * 4);
    face(big, t, { neck: -15 - peck * 55, jaw: peck > 0.8 ? 0.4 : 0, half: true, wing: 0, seed: 3 });
    set(big.d, { y: wobble(t, 0.4, 4), s: 1 + p(t, 88.5, 5, E.linear) * 0.05 });
    set(army.d, { x: (1 - p(t, 89.36, 0.6, E.outBack)) * -600 + Math.sin(t * 6) * 3, y: -Math.abs(Math.sin(t * 9)) * 6 });
    army.figs.forEach((f, i) => face(f, t, { brow: -6, look: [4, -2], jaw: t > 89.4 && t < 89.9 ? 0.4 : 0, seed: i }));
    army.gun.flash.style.opacity = t > 89.5 && t < 90.6 && Math.sin(t * 70) > 0 ? 1 : 0;
    popA(cEj, t, 89.36, { r: -3 }); popA(cPa, t, 90.25, { r: 3 });
    set(qm, { o: t > 92.3 ? 1 : 0, y: Math.sin(t * 6) * 8, r: 10 });
  });
  ground(c, 1196);
  const hill = box(c, 0, 0, 1080, 1920); hill.innerHTML = `<svg width="1080" height="1920"><path d="M30,900 Q200,820 420,900 L420,920 L30,920 Z" fill="#E3D2AE" stroke="${INK}" stroke-width="4"/></svg>`;
  const big = mkEmu(c, [420, 380, 560, 840], { seed: 71 });
  const ws = svgLayer(c, 3); for (let i = 0; i < 10; i++) { const u = use(ws, '#wheat', 50, 210); u.setAttribute('x', 430 + i * 50); u.setAttribute('y', 990 + (i % 2) * 8); }
  const army = (() => { const d = box(c, 60, 740, 340, 180, { zIndex: 4 }); const figs = [mkSol(d, [0, 40, 80, 102], 2), mkSol(d, [150, 46, 80, 102], 9), mkMer(d, [70, 20, 96, 123])]; const gun = mkGun(d, [110, 110, 150, 69]); return { d, figs, gun }; })();
  const cEj = chip(c, 60, 600, '1 mayor + 2 soldados', { size: 32 });
  const cPa = chip(c, 560, 1240, '≈ 20.000 emús', { size: 34, bg: INK, color: YEL });
  const qm = el('div', c, { left: '820px', top: '520px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', color: PINK, textShadow: `4px 4px 0 ${INK}` }, '?');
}
colorHit(90.97, 91.85, PINK, c => {
  const e = mkEmu(c, [300, 700, 480, 720], { seed: 12 }); e.d.style.filter = SIL; e.d.style.zIndex = 3;
  const t1 = el('div', c, { left: '0', top: '230px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '128px', lineHeight: 1.02, color: INK, zIndex: 4, textShadow: '5px 5px 0 #fff' }, 'que no saben<br>VOLAR');
  return t => {
    const k = (t - 90.97) / 0.88; const jump = Math.sin(clamp(k * 1.6) * Math.PI) * 160;
    set(e.d, { y: -jump, r: Math.sin(t * 8) * 4 }); face(e, t, { wing: Math.sin(t * 50) * 40, jaw: 0.5, legL: -20, legR: 20 });
    set(t1, { s: lerp(1.3, 1, p(t, 90.97, 0.2)), o: 1 }); t1.style.textShadow = glitch(t, 90.97, 0.25) || '5px 5px 0 #fff';
  };
});

/* ======================================================================
   Y · ¿QUÉ OTRA GUERRA? (93.75 – 96.75)  L21 — Vecina a pantalla completa
   ====================================================================== */
headline(93.75, 95.37, '¿Qué otra guerra *absurda*?', { size: 74, hlT: 94.32 });
headline(95.37, 96.75, 'Os leo en *comentarios*', { size: 84, hlT: 95.81 });
{
  const CM = [];
  const c = scene(93.75, 96.75, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 93.75, 3, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINA'), look: t < 94.8 ? [0, 0] : [-4, 6], bL: t > 94.3 && t < 94.8 ? 10 : 2, bR: t > 94.3 && t < 94.8 ? 14 : 6, noFan: true, noCup: true, seed: 2 });
    set(nb.wrap, { y: (1 - p(t, 93.8, 0.4, E.outBack)) * 500, r: -6, o: 1 });
    nbT.textContent = typeText('Guerras absurdas:\n1. emús ✓\n2. …', t, 94.3, 16);
    const qx = 230 + Math.min(1, (t - 94.3) / 2) * 120 + Math.sin(t * 18) * 12, qy = 1020 + Math.cos(t * 9) * 8 + Math.floor(clamp((t - 94.3) / 2.2) * 3) * 40;
    set(quill, { x: qx, y: qy, r: -20 + Math.sin(t * 18) * 6, o: t > 94.0 ? 1 : 0 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const frame = box(c, 640, 420, 300, 360, { border: `14px solid ${BRASS}`, outline: `4px solid ${INK}`, background: PAPER, boxShadow: `8px 8px 0 ${SH}` }); frame.innerHTML = cropUse('emuS', '0 0 420 600');
  const vec = mkVec(c, [120, 380, 660, 817]);
  const nb = paperPiece(c, 40, 960, 440, 330, { seed: 77, bg: '#FBF6EA' });
  box(nb.inner, 0, 0, 422, 312, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.18) 0 2px, transparent 2px 44px)', backgroundPosition: '0 30px' });
  const nbT = el('div', nb.inner, { left: '26px', top: '26px', fontFamily: 'SpecialElite', fontSize: '40px', lineHeight: '44px', color: INK, whiteSpace: 'pre' }, '');
  const quill = box(c, 0, 0, 160, 260, { zIndex: 30 }); quill.innerHTML = `<svg viewBox="0 0 80 200" width="160" height="260" style="overflow:visible"><path d="M10,196 L22,150" stroke="${INK}" stroke-width="5"/><path d="M22,150 C10,100 30,30 76,2 C70,60 58,120 22,150 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M22,150 Q50,80 74,8" stroke="${INK}" stroke-width="2.5" fill="none"/><path d="M30,120 l-10,-8 M38,96 l-12,-8 M46,72 l-12,-8 M54,50 l-10,-8 M42,128 l10,-10 M50,104 l12,-10 M58,80 l12,-10" stroke="${INK}" stroke-width="2"/></svg>`;
  const cms = [['EMU', '@emu_de_campo', '¡La guerra de la oreja de Jenkins!', 95.4], ['FAR', '@paco_trigo', '¿Hay más como esta? 😂', 95.85], ['SOL', '@soldado_raso', 'Respeto máximo a los emús', 96.3]];
  cms.forEach((m, i) => {
    const e = box(c, 290 + (i % 2) * 20, 930 + i * 112, 630, 96, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    avatar(e, 10, 8, 76, m[0], { bw: 3 });
    el('div', e, { left: '100px', top: '8px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]);
    el('div', e, { left: '100px', top: '38px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: INK, whiteSpace: 'nowrap' }, m[2]);
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   Z · Y ESTO… NO VENÍA EN EL LIBRO (96.75 – 98.75)  L22
   ====================================================================== */
headline(96.75, 97.62, 'Y esto…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(97.62, 98.75, '…no venía en el *libro*.', { size: 84, hlT: 98.26 });
{
  const c = scene(96.75, 97.62, t => {
    const k = p(t, 96.75, 0.85, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINA') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(97.62, 98.75, t => {
    const k = p(t, 97.95, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 98.25;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    face(stand, t, { look: t > 97.8 ? [6, -5] : [-3, 2], seed: 1, jaw: t > 97.85 ? 0.5 : 0 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, 97.63, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 98.26, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    fth.forEach((f, i) => { const kf = p(t, 98.26, 0.5, E.outCubic); set(f, { x: (i - 1.5) * 120 * kf, y: -kf * 200 + kf * kf * 160, r: Math.sin(t * 4 + i) * 40, o: closed ? 1 : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 12; i++) lines += `<path d="M180,${790 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#emuS" x="230" y="472" width="300" height="450"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="730" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">GRANDES</text><text x="335" y="770" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">guerras</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const stand = mkEmu(bookW, [620, 590, 250, 375], { seed: 81 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const fth = []; for (let i = 0; i < 4; i++) { const f = box(bookW, 330, 590, 60, 26, { zIndex: 3 }); f.innerHTML = `<svg viewBox="0 0 60 26" width="60" height="26"><path d="M2,13 Q30,-6 58,13 Q30,30 2,13 Z" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M4,13 H56" stroke="${INK}" stroke-width="2"/></svg>`; fth.push(f); }
}

/* ======================================================================
   TARJETA FINAL (98.75 – fin)
   ====================================================================== */
{
  const c = scene(98.75, 999, t => {
    set(peek.d, { x: (1 - p(t, 99.1, 0.45, E.outBack)) * 400, r: 8 + wobble(t, 0.6, 2), o: 1 });
    face(peek, t, { look: [-5, 2], half: true, seed: 2 });
    set(lt, { s: pop(t, 99.0, 0.45), o: t < 99.0 ? 0 : 1 }); paint(lhl, t, 99.3, 0.4);
    popA(ttl, t, 99.45, { r: -1 }); popA(src, t, 99.7, { rise: 30 }); stampA(dat, t, 100.0, -6);
  });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const peek = mkEmu(c, [700, 380, 280, 420], { seed: 21 }); peek.d.style.zIndex = 2;
  const lt = box(c, 40, 800, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1050px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '54px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'La Gran Guerra del Emú (1932)');
  const src = el('div', c, { left: '90px', top: '1170px', width: '900px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '28px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: Australian War Memorial · prensa australiana de la época (Trove, National Library of Australia) · Chat: recreación con humor');
  const dat = stamp(c, 390, 1300, '16/10/2026', { size: 48, bw: 7 });
}
