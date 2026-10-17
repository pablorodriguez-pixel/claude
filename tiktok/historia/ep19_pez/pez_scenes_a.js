/* Ep. 19 · escenas L0–L4 (todo clavado por texto a words.js vía K) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const qMark = (pa, x, y, sz = 120, col = PINK, ch = '?') => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 40, whiteSpace: 'nowrap' }, ch);
const heartBox = (pa, x, y, w, z = 40) => { const d = box(pa, x, y, w, w * 110 / 120, { zIndex: z }); d.innerHTML = HEART(); return d; };
const noteEl = (pa, x, y, sz, ch) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: INK, textShadow: '4px 4px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff', zIndex: 40 }, ch);
function speedLines(pa, x, y, w, h, z = 3) { const d = box(pa, x, y, w, h, { zIndex: z }); d.innerHTML = `<svg width="${w}" height="${h}" style="overflow:visible"><path d="M${w},${h * 0.25} Q${w * 0.5},${h * 0.18} 0,${h * 0.3} M${w},${h * 0.5} Q${w * 0.45},${h * 0.46} ${w * 0.1},${h * 0.52} M${w},${h * 0.75} Q${w * 0.5},${h * 0.82} 0,${h * 0.7}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M${w},${h * 0.25} Q${w * 0.5},${h * 0.18} 0,${h * 0.3} M${w},${h * 0.5} Q${w * 0.45},${h * 0.46} ${w * 0.1},${h * 0.52} M${w},${h * 0.75} Q${w * 0.5},${h * 0.82} 0,${h * 0.7}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`; return d; }
function flaskSvg(liq = PINK) {
  const fl = 'M66,10 H104 V86 L156,198 Q162,218 142,218 H28 Q8,218 14,198 L66,86 Z';
  return `<svg viewBox="0 0 170 230" width="100%" height="100%" style="overflow:visible">${cut(P(fl))}<path d="${fl}" fill="rgba(255,255,255,.6)" stroke="${INK}" stroke-width="5"/>${clipG(uid('fk'), fl, `<rect x="0" y="140" width="170" height="90" fill="${liq}"/><rect x="0" y="140" width="170" height="90" fill="url(#hA)" opacity=".35"/><ellipse cx="85" cy="140" rx="70" ry="8" fill="#fff" opacity=".5"/>`)}<path d="${fl}" fill="none" stroke="${INK}" stroke-width="5"/><rect x="58" y="2" width="54" height="14" rx="5" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M50,180 Q46,160 58,140" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/></svg>`;
}

/* ======================================================================
   A · PORTADA / GANCHO — pecera gigante, pez, cronómetro «3 s ¿?»
   ====================================================================== */
{
  const T1 = S.A[1];
  const c = scene(S.A[0], T1, t => {
    set(cam, { s: 1.0 + 0.05 * p(t, 0, 3.9, E.linear) });
    bw.upd(t + 2.0);
    set(bw.wrap, { y: wobble(t, 0.5, 4), r: wobble(t, 0.35, 0.6) });
    // pez nadando (ya en movimiento en el fotograma 0)
    const turn = p(t, K.acuerda - 0.12, 0.12, E.inCubic);
    const fx = 190 + Math.sin(t * 1.9 + 0.6) * 40, fy = 300 + Math.sin(t * 2.6) * 22;
    set(fs.d, { x: fx - 190, y: fy - 300, r: Math.sin(t * 2.6 + 1.2) * 5, sx: Math.max(0.02, 1 - turn), o: t < K.acuerda ? 1 : 0 });
    fishFace(fs, t + 0.3, { look: [5, -1], wag: 1.6, tf: 12, brow: 4, seed: 0.5 });
    set(sl, { x: fx - 190 + Math.sin(t * 8) * 6, o: t < K.se ? 1 : 0 });
    const kf = p(t, K.acuerda, 0.3, E.outBack);
    set(ff.d, { sx: Math.max(0.02, kf), s: 1 + 0.04 * Math.sin(t * 6), y: wobble(t, 0.5, 6), o: t < K.acuerda ? 0 : 1 });
    fishFFace(ff, t, { look: [0, 2], smile: t > K.ti - 0.1, bL: t > K.ti - 0.1 ? 10 : 4, bR: t > K.ti - 0.1 ? 10 : 4, blink: false, ff: 14 });
    // corazón en «ti»
    { const kh = pop(t, K.ti - 0.05, 0.4); set(ht, { s: kh * (1 + 0.1 * Math.max(0, Math.sin(t * 14))), y: -p(t, K.ti, 0.8) * 30, r: -8, o: t < K.ti - 0.05 ? 0 : 1 }); }
    // cronómetro + ¿?
    watchHand(sw, t + 0.7, 240);
    set(sw.d, { r: 8 + wobble(t, 0.6, 3), y: wobble(t, 0.8, 5, 1), x: (t > K.no0 && t < K.no0 + 0.25) ? Math.sin(t * 60) * 8 : 0 });
    set(qm, { r: -12 + Math.sin(t * 5) * 8, s: 1 + 0.08 * Math.sin(t * 7), o: 1 - p(t, K.se, 0.15) });
    // ¡FALSO! cae sobre los 3 s cuando la voz lo dice
    stampA(fal, t, K.se, -12, 1);
    st.style.transform = `scaleX(${f1(p(t, K.se + 0.05, 0.25, E.outCubic) * 1000) / 1000}) rotate(-3deg)`;
    set(ttl, { o: 1, y: 0 });
    popA(acu, t, K.acuerda + 0.05, { r: -4 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 52%, rgba(255,230,0,.34), rgba(255,230,0,0) 60%)' });
  rays(cam, -170, 380, 1420, 26, 'rgba(255,62,165,.13)', 'rgba(0,0,0,0)', 0);
  const bw = mkBowl(cam, 100, 500, 880, { seed: 11, nb: 11, z: 4 });
  const sl = speedLines(bw.mid, 70, 360, 150, 170, 3);
  const fs = mkFish(bw.mid, [190, 300, 440, 308]); fs.d.style.zIndex = 5;
  const ff = mkFishF(bw.mid, [250, 250, 380, 380]); ff.d.style.zIndex = 6;
  const ht = heartBox(cam, 200, 640, 170, 45);
  const sw = mkWatch(cam, 600, 400, 350, '3 s', true); sw.d.style.zIndex = 30;
  const qm = qMark(cam, 470, 470, 170, PINK, ''); qm.style.display = 'none';
  const fal = stamp(cam, 450, 560, '¡FALSO!', { size: 112, bw: 14, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const acu = chip(cam, 120, 1240, 'se acuerda de ti ♥', { size: 50, bg: PINK, z: 40 });
  const ttl = el('div', cam, { left: '30px', top: '170px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '118px', lineHeight: 1.0, color: INK, zIndex: 50 });
  ttl.innerHTML = `<span style="font-style:italic;font-size:96px">¿Memoria de</span><br><span style="position:relative;display:inline-block">${hlSpan('3 segundos?', 'th')}<span class="stk" style="position:absolute;left:-14px;right:-14px;top:48%;height:16px;background:${RED};border-radius:8px;transform-origin:left center;transform:scaleX(0)"></span></span>`;
  ttl.querySelector('.th').style.transform = 'scaleX(1) rotate(-1.2deg)';
  const st = ttl.querySelector('.stk');
}

/* ======================================================================
   B · «Y LO HAN DEMOSTRADO CON EXPERIMENTOS» — laboratorio
   ====================================================================== */
headline(S.B[0], K.experimentos - 0.08, 'Lo han *demostrado*', { size: 100, hlT: K.demostrado });
headline(K.experimentos - 0.08, S.B[1], '…con *experimentos*', { size: 104, hlT: K.experimentos });
{
  const c = scene(S.B[0], S.B[1], t => {
    bw.upd(t);
    set(bw.wrap, { s: pop(t, S.B[0], 0.45), y: wobble(t, 0.5, 4) });
    const fx = Math.sin(t * 1.5) * 60;
    set(fs.d, { x: fx, y: Math.sin(t * 2.2) * 14, sx: Math.cos(t * 1.5) >= 0 ? 1 : -1 });
    fishFace(fs, t, { look: [4, 0], seed: 1.4 });
    FL.forEach((f, i) => set(f, { s: pop(t, S.B[0] + 0.15 + i * 0.12, 0.4), r: [-6, 5, -3][i] + wobble(t, 0.6, 2, i), o: t < S.B[0] + 0.15 + i * 0.12 ? 0 : 1 }));
    FB.forEach((b, i) => { const ph = (t * 0.9 + i * 0.37) % 1; set(b, { y: -ph * 160, x: Math.sin(t * 4 + i) * 8, o: 1 - ph, s: 0.6 + ph * 0.6 }); });
    const kl = pop(t, K.demostrado - 0.2, 0.45);
    set(lens, { s: kl, x: Math.sin(t * 2.4) * 30, y: Math.cos(t * 2) * 16, r: -10, o: t < K.demostrado - 0.2 ? 0 : 1 });
    stampA(dem, t, K.demostrado + 0.1, -8, 1);
    popA(exp, t, K.experimentos + 0.05, { r: -4 });
    set(clip, { r: 6 + wobble(t, 0.5, 1), o: 1, y: (1 - p(t, S.B[0] + 0.2, 0.4, E.outBack)) * 600 });
    CK.forEach((k, i) => popA(k, t, K.experimentos + 0.2 + i * 0.16, { r: -6 }));
  }, { clip: true });
  sceneBg(c, { background: '#E6E2D2', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 90px), repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 3px, transparent 3px 90px)' });
  const bench = box(c, 0, 1100, 1080, 60, { background: WOOD, borderTop: `6px solid ${INK}`, borderBottom: `6px solid ${INK}`, zIndex: 2 });
  box(bench, 0, 0, 1080, 48, { backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.25) 0 2px, transparent 2px 14px)' });
  const bw = mkBowl(c, 300, 560, 560, { seed: 23, nb: 7, z: 4 });
  const fs = mkFish(bw.mid, [150, 250, 260, 182]); fs.d.style.zIndex = 5;
  const FL = [[90, 840, 180, 244, PINK], [880, 870, 150, 203, '#7FC8A9'], [150, 930, 120, 162, YEL]].map(q => { const d = box(c, q[0], q[1], q[2], q[3], { zIndex: 6 }); d.innerHTML = flaskSvg(q[4]); return d; });
  const FB = [[170, 860], [200, 880], [940, 890], [960, 900]].map(([x, y]) => box(c, x, y, 26, 26, { borderRadius: '50%', border: `4px solid ${INK}`, background: '#fff', zIndex: 7 }));
  const lens = box(c, 640, 640, 280, 280, { zIndex: 20 });
  lens.innerHTML = `<svg width="280" height="360" style="overflow:visible"><path d="M224,224 L310,330" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M224,224 L310,330" stroke="${WOOD}" stroke-width="26" stroke-linecap="round"/><circle cx="140" cy="140" r="136" fill="${INK}"/><circle cx="140" cy="140" r="126" fill="${BRASS}"/><circle cx="140" cy="140" r="110" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="5"/><path d="M70,90 q30,-40 80,-44" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity=".8"/></svg>`;
  const clip = box(c, 70, 470, 250, 330, { zIndex: 8, background: '#FBF6EA', border: `5px solid ${INK}`, borderRadius: '10px', boxShadow: `8px 9px 0 ${SH}` });
  box(clip, 80, -20, 80, 36, { background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px' });
  el('div', clip, { left: '0', top: '30px', width: '240px', textAlign: 'center', fontFamily: 'Rye', fontSize: '30px', color: INK }, 'PRUEBAS');
  const CK = [0, 1, 2].map(i => { box(clip, 30, 96 + i * 72, 120, 6, { background: 'rgba(43,33,24,.3)' }); const k = box(clip, 160, 66 + i * 72, 64, 64, { zIndex: 3 }); k.innerHTML = CHECK; return k; });
  const dem = stamp(c, 250, 930, 'DEMOSTRADO', { size: 96, bw: 12, z: 60, col: INK, bg: YEL, blend: 'normal' });
  const exp = chip(c, 560, 470, 'experimentos', { size: 46, bg: PINK, z: 40 });
}

/* ======================================================================
   C · EXPERIMENTO DE LA PALANCA (+ semanas después)
   ====================================================================== */
headline(S.C1[0], K.peces - 0.06, 'Hay *estudios*…', { size: 104, hlT: K.estudios });
headline(K.peces - 0.06, K.caiga - 0.06, 'Aprenden a *empujar* una palanca', { size: 80, hlT: K.empujar });
headline(K.caiga - 0.06, S.C1[1], '…y les cae *comida*', { size: 96, hlT: K.comida });
headline(S.C2[0], K.siguen - 0.3, '*Semanas* después…', { size: 104, hlT: K.semanas });
headline(K.siguen - 0.3, S.C2[1], '…se siguen *acordando*', { size: 96, hlT: K.acordando });
{
  const TK = { x: 150, y: 470, w: 780 }; const k = TK.w / 840;
  const A = [110, 250], L = [386, 223], F = [455, 60];
  const seg = (t, a, b, t0, d, e = E.inOutCubic) => { const q = e(p(t, t0, d, E.linear)); return [lerp(a[0], b[0], q), lerp(a[1], b[1], q)]; };
  function fishPos(t) {
    let pos, dir = 1;
    if (t < K.empujar - 0.3) pos = [A[0] + Math.sin(t * 1.8) * 40, A[1] + Math.sin(t * 2.3) * 20];
    else if (t < K.caiga - 0.1) { pos = seg(t, A, L, K.empujar - 0.3, 0.55); const pu = Math.max(0, Math.sin(clamp((t - K.palanca + 0.05) / 0.3) * Math.PI)); pos[0] += pu * 22; }
    else if (t < K.ys) { pos = seg(t, L, F, K.caiga - 0.1, 0.45); pos[1] += Math.sin(t * 6) * 4; }
    else if (t < K.siguen - 0.4) { pos = seg(t, F, A, K.ys, 0.7); dir = t < K.ys + 0.75 ? -1 : 1; }
    else if (t < K.acordando - 0.1) { pos = seg(t, A, L, K.siguen - 0.4, 0.4); const pu = Math.max(0, Math.sin(clamp((t - K.siguen + 0.02) / 0.28) * Math.PI)); pos[0] += pu * 22; }
    else { pos = seg(t, L, F, K.acordando - 0.1, 0.4); pos[1] += Math.sin(t * 6) * 4; }
    return { pos, dir };
  }
  const leverA = t => { let a = 0; for (const t0 of [K.palanca - 0.05, K.siguen - 0.02]) a = Math.max(a, Math.sin(clamp((t - t0) / 0.4) * Math.PI) * 30); return a; };
  const c = scene(S.C1[0], S.C2[1], t => {
    // el acuario se aparta a la derecha cuando llega el calendario
    const kc = p(t, K.ys - 0.05, 0.4, E.inOutCubic);
    set(tank, { s: pop(t, S.C1[0], 0.45) * lerp(1, 0.78, kc), x: kc * 120, y: kc * 60 + wobble(t, 0.6, 3) });
    const { pos, dir } = fishPos(t);
    let fsx = lerp(1, -1, p(t, K.ys, 0.14)); if (t > K.ys + 0.6) fsx = lerp(-1, 1, p(t, K.ys + 0.6, 0.14)); void dir;
    if (Math.abs(fsx) < 0.05) fsx = 0.05 * Math.sign(fsx || 1);
    set(fs.d, { x: pos[0] * k, y: pos[1] * k, sx: fsx });
    const eating = (t > K.comida - 0.05 && t < K.ys) || (t > K.acordando + 0.2);
    fishFace(fs, t, { look: t < K.empujar - 0.3 ? [-3, 2] : [5, -2], mouth: eating ? 0.3 + 0.9 * Math.abs(Math.sin(t * 11)) : null, smile: t > K.acordando + 0.6, brow: t > K.palanca - 0.1 && t < K.caiga ? 8 : 0, wag: t > K.empujar - 0.3 && t < K.palanca ? 2 : 1, tf: 12, seed: 0.9 });
    arm.setAttribute('transform', `rotate(${f1(leverA(t))})`);
    // comida que cae (dos tandas)
    FD.forEach(f => { const kf = p(t, f.t0, 0.75, E.outCubic); const eat = p(t, f.t0 + 0.6, 0.2); set(f.d, { x: f.x * k + Math.sin(t * 5 + f.ph) * 6, y: lerp(-30, f.y, kf) * k, r: t * 200 * (f.ph - 0.5), s: 1 - eat, o: t < f.t0 ? 0 : 1 }); });
    gate.setAttribute('transform', `translate(${f1(p(t, K.caiga - 0.08, 0.15) * (1 - p(t, K.caiga + 0.6, 0.2)) * 60 + p(t, K.siguen + 0.22, 0.15) * (1 - p(t, K.siguen + 0.85, 0.2)) * 60)},0)`);
    popA(est, t, K.estudios, { r: -4 }); if (t > K.caiga) est.style.opacity = 0;
    // palanca: destello y chasquido visual
    set(spark, { s: pop(t, K.palanca, 0.3) * (1 - p(t, K.palanca + 0.5, 0.2)) + pop(t, K.siguen + 0.05, 0.3) * (t > K.siguen ? 1 - p(t, K.siguen + 0.55, 0.2) : 0), r: t * 90, o: (t > K.palanca && t < K.palanca + 0.7) || (t > K.siguen + 0.05 && t < K.siguen + 0.75) ? 1 : 0 });
    popA(ym, t, K.comida + 0.1, { r: 6 });
    if (t > K.ys) { ym.style.opacity = 0; }
    // calendario
    set(cal, { s: pop(t, K.semanas - 0.15, 0.4), r: -5 + wobble(t, 0.5, 1.5), o: t < K.semanas - 0.15 ? 0 : 1 });
    PG.forEach((pg, i) => { const t0 = K.semanas + 0.15 + i * 0.33; const kk = p(t, t0, 0.45, E.inCubic); set(pg, { y: -kk * 700, x: kk * (i % 2 ? 420 : -260), r: kk * (i % 2 ? 70 : -60), o: kk > 0.95 ? 0 : 1 }); });
    const kok = pop(t, K.acordando, 0.45); set(ok, { s: kok * 1.0, r: -6, o: t < K.acordando ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const tank = box(c, TK.x, TK.y, TK.w, 620 * k, { zIndex: 4, transformOrigin: '60% 40%' });
  box(tank, 0, 0, TK.w, 620 * k, { zIndex: 1 }).innerHTML = `<svg viewBox="0 0 840 620" width="${TK.w}" height="${620 * k}" style="overflow:visible">${tankBackSvg()}</svg>`;
  const mid = box(tank, 0, 0, TK.w, 620 * k, { zIndex: 2 });
  const lev = box(mid, 642 * k, 282 * k, 156 * k, 338 * k, { zIndex: 3 }); lev.innerHTML = leverSvg(); const arm = lev.querySelector('.arm');
  const hop = box(tank, 600 * k, -150 * k, 220 * k, 220 * k, { zIndex: 5 }); hop.innerHTML = hopperSvg(); const gate = hop.querySelector('.gate');
  const fs = mkFish(mid, [0, 0, 280 * k, 196 * k]); fs.d.style.zIndex = 4;
  const FD = [];
  [[K.caiga - 0.05, 0], [K.siguen + 0.25, 1]].forEach(([t0, b]) => { const r = rng(40 + b); for (let i = 0; i < 6; i++) { const d = box(mid, 0, 0, 50, 50, { zIndex: 5 }); d.innerHTML = FLAKE(['#C8102E', '#EE7A2B', '#7a9a52', '#FFE600'][i % 4]); FD.push({ d, t0: t0 + i * 0.06, x: 690 + (r() - 0.5) * 70, y: 110 + r() * 80, ph: r() }); } });
  box(tank, 0, 0, TK.w, 620 * k, { zIndex: 6 }).innerHTML = `<svg viewBox="0 0 840 620" width="${TK.w}" height="${620 * k}" style="overflow:visible">${tankFrontSvg()}</svg>`;
  const spark = box(tank, 640 * k, 290 * k, 130, 130, { zIndex: 8 }); spark.innerHTML = `<svg viewBox="-50 -50 100 100" width="100%" height="100%" style="overflow:visible"><path d="M0,-46 L10,-10 L46,0 L10,10 L0,46 L-10,10 L-46,0 L-10,-10 Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/></svg>`;
  const est = chip(c, 360, 1100, 'estudios con peces', { size: 44, bg: INK, color: YEL, z: 30 });
  const ym = chip(c, 650, 960, '¡ñam!', { size: 54, bg: PINK, z: 30 });
  const cal = box(c, 60, 470, 300, 360, { zIndex: 10 }); cal.innerHTML = calBackSvg();
  // hojas que se arrancan: arriba la de menos cruces (pasan las semanas)
  const PG = [7, 14, 21].map((n, i) => { const pg = box(cal, 0, 0, 300, 360, { zIndex: 10 - i }); pg.innerHTML = calPageSvg(n); return pg; });
  { const last = box(cal, 0, 0, 300, 360, { zIndex: 1 }); last.innerHTML = calPageSvg(28); }
  const ok = stamp(c, 360, 1080, 'semanas<br>después ✔', { size: 66, bw: 10, z: 60, col: INK, bg: YEL, blend: 'normal' });
}

/* ======================================================================
   D1 · UN SONIDO = COMIDA — timbre, «=», lata
   ====================================================================== */
headline(S.D1[0], K.significa - 0.06, 'Otros aprenden que un *sonido*', { size: 76, hlT: K.sonido });
headline(K.significa - 0.06, S.D1[1], '…significa *comida*', { size: 100, hlT: K.comida2 });
{
  const c = scene(S.D1[0], S.D1[1], t => {
    const press = Math.max(0, Math.sin(clamp((t - K.sonido + 0.08) / 0.24) * Math.PI));
    set(bell, { s: pop(t, S.D1[0] + 0.05, 0.4), r: -4 + (t > K.sonido && t < K.sonido + 0.6 ? Math.sin(t * 60) * 3 : 0), o: 1 });
    plg.setAttribute('transform', `translate(0 ${f1(press * 22)})`);
    set(hand, { y: -110 + 100 * Math.max(press, p(t, K.sonido - 0.35, 0.27, E.inOutCubic) * (1 - p(t, K.sonido + 0.3, 0.3))), o: t > K.sonido - 0.4 && t < K.sonido + 0.65 ? 1 : 0 });
    NT.forEach((n, i) => { const t0 = K.sonido + 0.05 + i * 0.12; const kk = p(t, t0, 1.4, E.outCubic); set(n, { x: kk * [-60, 40, 140, -10][i] + Math.sin(t * 6 + i) * 14, y: -kk * 260, r: Math.sin(t * 5 + i) * 18, s: pop(t, t0, 0.3), o: t < t0 ? 0 : 1 - p(t, t0 + 1.2, 0.3) }); });
    set(eq, { s: pop(t, K.significa, 0.35), o: t < K.significa ? 0 : 1 });
    set(can, { s: pop(t, K.comida2 - 0.05, 0.45), r: 6 + wobble(t, 0.6, 2), o: t < K.comida2 - 0.05 ? 0 : 1 });
    const happy = t > K.comida2;
    set(fs.d, { x: Math.sin(t * 1.4) * 30, y: wobble(t, 0.5, 8) - (happy ? Math.abs(Math.sin(t * 9)) * 20 : 0), sx: t < K.significa ? -1 : 1 });
    fishFace(fs, t, { look: t < K.significa ? [4, -6] : [5, -6], brow: t > K.sonido ? 10 : 0, smile: happy, wag: happy ? 2 : 1, tf: 12, seed: 2 });
    set(q1, { s: pop(t, K.sonido + 0.2, 0.3), r: -10 + Math.sin(t * 5) * 6, o: t < K.sonido + 0.2 || happy ? 0 : 1 });
    set(ex, { s: pop(t, K.comida2, 0.3), r: 10, o: happy ? 1 : 0 });
  });
  sceneBg(c, { background: '#EFE1C6' });
  { const st = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); let l = ''; for (let s = 0; s < 3; s++) for (let i = 0; i < 5; i++) l += `<path d="M0,${470 + s * 300 + i * 22} H1080" stroke="rgba(43,33,24,.13)" stroke-width="3"/>`; st.innerHTML = `<svg width="1080" height="1920">${l}</svg>`; }
  const bell = box(c, 70, 600, 380, 304, { zIndex: 6 }); bell.innerHTML = deskBellSvg(); const plg = bell.querySelector('.plunger');
  const hand = box(c, 170, 510, 180, 200, { zIndex: 8 }); hand.innerHTML = `<svg viewBox="-70 -70 140 140" width="180" height="180" style="overflow:visible">${gloveHand(0, 0, 180, 1.4)}</svg>`;
  const NT = ['♪', '♫', '♪', '♬'].map((ch, i) => noteEl(c, 200 + i * 30, 560, 110, ch));
  const eq = el('div', c, { left: '450px', top: '600px', width: '180px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '220px', lineHeight: '220px', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, zIndex: 9 }, '=');
  const can = box(c, 650, 520, 270, 360, { zIndex: 6 }); can.innerHTML = foodCanSvg();
  const fs = mkFish(c, [380, 960, 380, 266]); fs.d.style.zIndex = 7;
  const q1 = qMark(c, 720, 900, 130, PINK, '?');
  const ex = qMark(c, 730, 890, 140, YEL, '!');
}

/* ======================================================================
   D2 · VUELVEN A ACUDIR AL OÍRLO, MUCHO TIEMPO DESPUÉS — telarañas
   ====================================================================== */
headline(S.D2[0], K.oirlo - 0.06, 'Vuelven a *acudir*', { size: 104, hlT: K.acudir });
headline(K.oirlo - 0.06, S.D2[1], '…al *oírlo*', { size: 116, hlT: K.oirlo });
{
  const c = scene(S.D2[0], S.D2[1], t => {
    bw.upd(t);
    // reloj loco (paso del tiempo, sin cifras)
    const spin = t < K.oirlo ? (t - S.D2[0]) * 900 : (K.oirlo - S.D2[0]) * 900;
    mh.setAttribute('transform', `rotate(${f1(spin % 360)} 130 150)`); hh.setAttribute('transform', `rotate(${f1((spin / 12) % 360)} 130 150)`);
    set(clk, { s: pop(t, S.D2[0] + 0.05, 0.4), r: t < K.oirlo ? Math.sin(t * 30) * 3 : 0, o: 1 });
    set(web, { o: 1 - p(t, K.oirlo + 0.05, 0.2), s: 1 });
    DU.forEach((d, i) => { const kk = p(t, K.oirlo + 0.05, 0.7, E.outCubic); set(d, { x: kk * [-120, -40, 60, 140][i], y: -kk * [90, 160, 140, 80][i], s: 0.6 + kk, o: t < K.oirlo ? 0 : 1 - kk }); });
    const press = Math.max(0, Math.sin(clamp((t - K.oirlo + 0.08) / 0.24) * Math.PI));
    plg.setAttribute('transform', `translate(0 ${f1(press * 22)})`);
    set(hand, { y: -200 + 190 * Math.max(press, p(t, K.oirlo - 0.35, 0.27, E.inOutCubic) * (1 - p(t, K.oirlo + 0.3, 0.3))), o: t > K.oirlo - 0.4 && t < K.oirlo + 0.65 ? 1 : 0 });
    set(bell, { r: (t > K.oirlo && t < K.oirlo + 0.6 ? Math.sin(t * 60) * 3 : 0) });
    NT.forEach((n, i) => { const t0 = K.oirlo + 0.05 + i * 0.12; const kk = p(t, t0, 1.2, E.outCubic); set(n, { x: kk * [80, 200, 300][i], y: -kk * [160, 220, 120][i], r: Math.sin(t * 5 + i) * 18, s: pop(t, t0, 0.3), o: t < t0 ? 0 : 1 - p(t, t0 + 1.0, 0.3) }); });
    // el pez: dormitando a la derecha → sale disparado hacia el timbre
    const go = p(t, K.oirlo + 0.1, 0.4, E.outBack);
    set(fs.d, { x: lerp(20, -110, go) + (t < K.oirlo ? Math.sin(t * 1.2) * 14 : 0), y: lerp(40, 10, go) + wobble(t, 0.6, 8), sx: t < K.oirlo + 0.1 ? 1 : -1, r: t < K.oirlo ? 0 : -6 });
    fishFace(fs, t, { half: t < K.oirlo, look: t < K.oirlo ? [0, 4] : [6, -2], brow: t > K.oirlo ? 12 : 0, wag: t > K.oirlo ? 2.4 : 0.6, tf: 14, blink: t > K.oirlo, seed: 3 });
    set(zz, { o: t < K.oirlo ? 1 : 0, y: -((t * 40) % 40), r: -8 });
    set(ex, { s: pop(t, K.oirlo + 0.15, 0.3), r: 12, o: t > K.oirlo + 0.15 ? 1 : 0 });
    const km = pop(t, K.mucho, 0.45); set(mt, { s: km, r: -5, o: t < K.mucho ? 0 : 1 });
  }, { clip: true });
  sceneBg(c, { background: '#E9DCC0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 40px)' });
  const shelf = box(c, 40, 930, 440, 40, { background: WOOD, border: `5px solid ${INK}`, borderRadius: '8px', boxShadow: `6px 7px 0 ${SH}`, zIndex: 3 });
  void shelf;
  const clk = box(c, 110, 430, 230, 265, { zIndex: 4 }); clk.innerHTML = wallClockSvg(); const mh = clk.querySelector('.mh'), hh = clk.querySelector('.hh');
  const bell = box(c, 90, 690, 300, 240, { zIndex: 6 }); bell.innerHTML = deskBellSvg(); const plg = bell.querySelector('.plunger');
  const web = box(c, 60, 640, 380, 300, { zIndex: 7 });
  web.innerHTML = `<svg width="380" height="300" style="overflow:visible"><g stroke="#fff" stroke-width="7" fill="none" opacity=".9"><path d="M0,0 L180,170 M0,0 L60,230 M0,0 L230,60 M0,0 L130,220 M0,0 L220,130"/><path d="M40,10 Q46,46 10,44 M80,22 Q92,90 20,86 M128,34 Q140,136 30,128 M176,50 Q190,184 40,176"/></g><g stroke="${INK}" stroke-width="2.4" fill="none"><path d="M0,0 L180,170 M0,0 L60,230 M0,0 L230,60 M0,0 L130,220 M0,0 L220,130"/><path d="M40,10 Q46,46 10,44 M80,22 Q92,90 20,86 M128,34 Q140,136 30,128 M176,50 Q190,184 40,176"/></g><g transform="translate(380,0) scale(-1,1)"><g stroke="#fff" stroke-width="7" fill="none" opacity=".9"><path d="M0,40 L120,170 M0,40 L180,90 M0,40 L60,200"/><path d="M30,56 Q44,80 14,84 M64,74 Q84,120 26,124"/></g><g stroke="${INK}" stroke-width="2.4" fill="none"><path d="M0,40 L120,170 M0,40 L180,90 M0,40 L60,200"/><path d="M30,56 Q44,80 14,84 M64,74 Q84,120 26,124"/></g></g></svg>`;
  const DU = [0, 1, 2, 3].map(i => box(c, 200 + i * 20, 720, 80, 54, { borderRadius: '50%', background: '#E2D6BC', border: `4px solid ${INK}`, zIndex: 9 }));
  const hand = box(c, 160, 520, 180, 200, { zIndex: 8 }); hand.innerHTML = `<svg viewBox="-70 -70 140 140" width="180" height="180" style="overflow:visible">${gloveHand(0, 0, 180, 1.4)}</svg>`;
  const NT = ['♪', '♫', '♪'].map((ch, i) => noteEl(c, 260 + i * 20, 640, 100, ch));
  const bw = mkBowl(c, 440, 520, 560, { seed: 31, nb: 7, z: 4 });
  const fs = mkFish(bw.mid, [150, 250, 270, 189]); fs.d.style.zIndex = 5;
  const zz = el('div', bw.mid, { left: '330px', top: '200px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '60px', color: INK, zIndex: 8 }, 'z z');
  const ex = qMark(c, 520, 560, 150, YEL, '!');
  const mt = stamp(c, 360, 1100, 'mucho tiempo<br>después ✔', { size: 60, bw: 10, z: 60, col: INK, bg: YEL, blend: 'normal' });
}

/* ======================================================================
   E · «SI TIENES UNO EN CASA» — puerta, reloj a la hora de comer, pez en el cristal
   ====================================================================== */
headline(S.E[0], K.acerca - 0.08, 'Si tienes uno en *casa*', { size: 92, hlT: K.casa });
headline(K.acerca - 0.08, K.llegas - 0.08, 'Se acerca al *cristal*', { size: 100, hlT: K.cristal });
headline(K.llegas - 0.08, S.E[1], 'Llegas a la *hora de comer*', { size: 74, hlT: K.comer });
{
  const c = scene(S.E[0], S.E[1], t => {
    set(cam, { s: 1 + 0.05 * p(t, K.acerca, 2.2, E.inOutCubic) });
    bw.upd(t);
    // pez: de perfil nadando → de frente pegado al cristal
    const kf = p(t, K.acerca, 0.45, E.outBack);
    set(fs.d, { x: Math.sin(t * 1.6) * 60, y: wobble(t, 0.6, 10), sx: Math.cos(t * 1.6) >= 0 ? 1 : -1, o: t < K.acerca ? 1 : 0 });
    fishFace(fs, t, { look: [4, 0], seed: 0.2 });
    const love = t > K.comer;
    set(ff.d, { s: lerp(0.4, 1.0, kf), y: (1 - clamp(kf)) * 60 + (love ? Math.abs(Math.sin(t * 10)) * -10 : wobble(t, 0.4, 3)), x: love ? Math.sin(t * 22) * 6 : 0, o: t < K.acerca ? 0 : 1 });
    fishFFace(ff, t, { press: t > K.cristal - 0.05, look: t > K.llegas - 0.1 ? [-12, 2] : [0, 0], bL: love ? 14 : 4, bR: love ? 14 : 4, ff: love ? 26 : 10, blink: false });
    smear.style.opacity = t > K.cristal ? 0.8 : 0;
    // cola moviéndose: ondas a los lados
    WG.forEach((w2, i) => set(w2, { o: love ? 1 : 0, r: Math.sin(t * 20 + i * 3) * 14, s: 0.9 + 0.1 * Math.sin(t * 12) }));
    HT.forEach((h, i) => { const t0 = K.comer + 0.05 + i * 0.22; const kk = p(t, t0, 1.1, E.outCubic); set(h, { y: -kk * 200, x: Math.sin(t * 4 + i) * 20, s: pop(t, t0, 0.3) * 0.9, r: [-12, 10, -4][i], o: t < t0 ? 0 : 1 - p(t, t0 + 0.9, 0.3) }); });
    // puerta + persona
    const kd = p(t, K.llegas - 0.15, 0.4, E.outCubic);
    set(leaf, { sx: lerp(1, 0.12, kd) });
    set(per.d, { x: lerp(-260, 0, p(t, K.llegas - 0.05, 0.5, E.outCubic)), y: wobble(t, 0.6, 3) - (t > K.llegas && t < K.llegas + 0.5 ? Math.abs(Math.sin(t * 12)) * 10 : 0), o: t < K.llegas - 0.1 ? 0 : 1 });
    face(per, t, { look: [8, 0], seed: 1.7, jaw: t > K.comer ? 0.2 : 0 });
    popA(tu, t, K.llegas + 0.15, { r: -6 });
    // reloj: marcha normal y salta a la marca de comer
    const tgt = p(t, K.hora - 0.1, 0.35, E.outBack);
    const mA = lerp((t * 30) % 360, 360, tgt), hA = lerp(250 + t * 2.5, 360, tgt);
    cmh.setAttribute('transform', `rotate(${f1(mA)} 130 150)`); chh.setAttribute('transform', `rotate(${f1(hA)} 130 150)`);
    ctg.setAttribute('opacity', t > K.comer - 0.05 ? (0.6 + 0.4 * Math.sin(t * 14)) : 0);
    set(clk, { r: t > K.comer && t < K.comer + 0.4 ? Math.sin(t * 50) * 4 : 0 });
    popA(hc, t, K.comer, { r: 5 });
    popA(cs, t, K.casa, { r: -4 });
    // CAMEO DEL EMÚ en la ventana: mira la pecera y, en «visto», a cámara
    const look = t > K.visto - 0.1 && t < K.visto + 0.55;
    face(emu, t, { look: look ? [0, 0] : [-14, 10], half: !look, bL: look ? 18 : 0, bR: look ? 26 : 0, blink: false });
    set(emu.d, { y: look ? -26 * p(t, K.visto - 0.1, 0.12, E.outBack) : 34 + wobble(t, 0.6, 3), r: look ? 0 : -8 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '730px 860px' });
  sceneBg(cam, { background: '#E9CDBA', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 60px), repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 26px, transparent 26px 60px)' });
  box(cam, 0, 1290, 1080, 630, { background: '#B98A5A', borderTop: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 3px, transparent 3px 120px)', zIndex: 1 });
  // ventana con el emú
  const win = box(cam, 620, 400, 320, 270, { zIndex: 2, background: '#CFE3E6', border: `8px solid ${WOOD}`, outline: `4px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}`, overflow: 'hidden' });
  const emu = mkEmuF(win, [20, -10, 280, 420]);
  box(win, 148, 0, 8, 270, { background: WOOD, borderLeft: `3px solid ${INK}`, borderRight: `3px solid ${INK}`, zIndex: 5 });
  box(win, 0, 200, 320, 8, { background: WOOD, borderTop: `3px solid ${INK}`, borderBottom: `3px solid ${INK}`, zIndex: 5 });
  // reloj
  const clk = box(cam, 110, 450, 210, 243, { zIndex: 3 }); clk.innerHTML = wallClockSvg(); const cmh = clk.querySelector('.mh'), chh = clk.querySelector('.hh'), ctg = clk.querySelector('.tgt');
  // puerta
  const door = box(cam, 70, 700, 320, 600, { zIndex: 3 }); door.innerHTML = doorFrameSvg();
  const per = mk(door, [-20, 150, 360, 460], journalistInner(72, 1), '0 0 360 460', 'bust'); per.d.style.zIndex = 2;
  const leaf = box(door, 24, 24, 272, 576, { zIndex: 4, transformOrigin: '0 50%' }); leaf.innerHTML = doorLeafSvg();
  // mesa + pecera
  const tb = box(cam, 480, 1080, 500, 250, { zIndex: 3 }); tb.innerHTML = tableSvg();
  const bw = mkBowl(cam, 500, 650, 460, { seed: 41, nb: 6, z: 4 });
  const fs = mkFish(bw.mid, [130, 220, 220, 154]); fs.d.style.zIndex = 5;
  const ff = mkFishF(bw.mid, [110, 170, 240, 240]); ff.d.style.zIndex = 6; ff.d.style.transformOrigin = '50% 70%';
  const smear = box(bw.front, 190, 335, 80, 40, { borderRadius: '50%', background: 'rgba(255,255,255,.55)', zIndex: 5 });
  const WG = [[90, 330, '('], [330, 330, ')']].map(([x, y, ch]) => el('div', bw.mid, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 7 }, ch));
  const HT = [0, 1, 2].map(i => heartBox(cam, 640 + i * 70, 640, 90, 30));
  const tu = chip(cam, 210, 650, 'tú', { size: 52, bg: PINK, z: 30 });
  const hc = chip(cam, 300, 540, 'hora de comer', { size: 40, bg: INK, color: YEL, z: 30 });
  const cs = chip(cam, 700, 1240, 'en casa', { size: 44, bg: PINK, z: 30 });
}
