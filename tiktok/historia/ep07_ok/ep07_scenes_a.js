/* Ep. 7 · escenas L0–L5 (tiempos clavados a words_table.txt) */
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const jaT = (pa, x, y, txt = '¡JA!', sz = 84) => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: px(sz), color: PINK, textShadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}`, whiteSpace: 'nowrap', zIndex: 40 }, txt);
function laughB(f, t, i = 0) { face(f, t, { closed: true, jaw: 0.55 + 0.35 * Math.abs(Math.sin(t * 17 + i)), brow: -6, blink: false }); }
function bubble(pa, x, y, txt, o = {}) {
  return el('div', pa, { left: px(x), top: px(y), background: '#fff', border: `5px solid ${INK}`, borderRadius: o.rad || '44px 44px 44px 10px', boxShadow: `7px 8px 0 ${SH}`, padding: o.pad || '6px 34px 12px', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.size || 72), lineHeight: 1.05, color: INK, whiteSpace: 'nowrap', zIndex: o.z || 30 }, txt);
}

/* ======================================================================
   A · GANCHO (0 – 5.15)  L0 — «OK» de imprenta + sello desde el fotograma 1
   ====================================================================== */
headline(-1, 3.12, 'La palabra más usada del mundo nació como un *CHISTE*', { size: 74, hlT: 2.42, y: 190 });
headline(3.12, 5.15, 'Y con una *falta de ortografía*', { size: 92, hlT: 3.88, y: 210 });
{
  const c = scene(-1, 5.15, t => {
    set(cam, { s: 1 + 0.06 * p(t, 0, 5.1, E.linear) });
    set(ry, { r: t * 9 });
    const laugh = t > 2.42 && t < 3.4, sad = t > 3.86;
    [o1, k1].forEach((f, i) => {
      const bob = laugh ? -Math.abs(Math.sin(t * 15 + i * 1.3)) * 22 : wobble(t, 0.7, 5, i * 0.3);
      set(f.d, { y: bob + (sad ? 10 : 0), r: (laugh ? Math.sin(t * 19 + i) * 4 : wobble(t, 0.5, 1.5, i)) + (i ? 4 : -4) });
      sortFace(f, t, { look: laugh ? [0, 0] : sad ? [i ? -4 : 4, 7] : [i ? -6 : 6, 1], closed: laugh, open: laugh ? 0.55 + 0.45 * Math.abs(Math.sin(t * 18 + i)) : (t > 4.21 && t < 4.7 ? 0.5 : 0), bL: sad ? -7 : 5, bR: sad ? -7 : 5, aL: laugh ? 70 + Math.sin(t * 22) * 12 : sad ? -6 : 14, aR: laugh ? 70 + Math.cos(t * 22) * 12 : sad ? -6 : 14, seed: i * 1.7 });
    });
    jas.forEach((j, i) => { const t0 = 2.44 + i * 0.16; set(j, { s: pop(t, t0, 0.3) * (1 - p(t, 3.3, 0.15)), r: [-12, 10, -6][i], y: -p(t, t0, 1) * 40, o: t < t0 ? 0 : 1 }); });
    circ.style.strokeDashoffset = f1(1100 * (1 - p(t, 3.88, 0.4, E.inOutCubic)));
    circW.style.opacity = t > 3.86 ? 1 : 0;
    const k2 = p(t, 4.21, 0.17, E.outCubic);
    set(stp, { s: t < 4.21 ? 1 + wobble(t, 0.8, 0.012) : lerp(1.55, 1.06, k2), r: -9, o: 0.96 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 820px' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 46%, rgba(255,230,0,.35), rgba(255,230,0,0) 55%)' });
  const ry = rays(cam, -160, 140, 1400, 26, 'rgba(255,230,0,.42)', 'rgba(0,0,0,0)', 0);
  const o1 = mkSort(cam, [140, 520, 380, 595], 'O');
  const k1 = mkSort(cam, [560, 520, 380, 595], 'K');
  const circW = box(cam, 0, 0, 1080, 1920, { zIndex: 35 });
  circW.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path d="M770,420 C980,420 990,660 780,700 C560,740 520,520 640,450 C700,412 790,404 860,440" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-dasharray="1100" class="cc0"/><path class="cc" d="M770,420 C980,420 990,660 780,700 C560,740 520,520 640,450 C700,412 790,404 860,440" fill="none" stroke="${RED}" stroke-width="13" stroke-linecap="round" stroke-dasharray="1100"/></svg>`;
  const circ = circW.querySelector('.cc'); const circ0 = circW.querySelector('.cc0');
  const stp = stamp(cam, 150, 900, '¡FALTA DE<br>ORTOGRAFÍA!', { size: 96, bw: 13, z: 50, bg: 'rgba(255,255,255,.9)', blend: 'normal' }); stp.style.textAlign = 'center'; stp.style.lineHeight = '1.02';
  const jas = [jaT(cam, 70, 470), jaT(cam, 820, 440), jaT(cam, 440, 410, '¡JA!', 70)];
  // el trazo blanco de debajo sigue al rojo
  const _f = SC[SC.length - 1].fn; SC[SC.length - 1].fn = t => { _f(t); circ0.style.strokeDashoffset = circ.style.strokeDashoffset; };
}

/* ======================================================================
   B · «HABLO DE OK» (5.15 – 7.0)  L1 — OK en bocadillos de época + sello DATO REAL
   ====================================================================== */
headline(5.15, 7.0, 'Hablo de *OK*', { size: 120, hlT: 6.05, y: 200 });
{
  const IT = [];
  const c = scene(5.15, 7.0, t => {
    IT.forEach(q => { popA(q.a, t, q.t, { r: q.r }); popA(q.b, t, q.t + 0.06, { r: q.r * 0.5 }); const dim = t > 6.05 ? 0.45 : 1; q.a.style.opacity = t < q.t ? 0 : dim; q.b.style.opacity = t < q.t + 0.06 ? 0 : dim; });
    set(ph.d, { r: t > 5.62 && t < 6.0 ? Math.sin(t * 60) * 6 : 0, s: 1 });
    popA(big, t, 6.05, { r: -4, s: 1 });
    stampA(dr, t, 6.42, -10);
  });
  sceneBg(c, { background: '#F1E5CB', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.07) 0 3px, transparent 3px 30px)' });
  const ph = mk(c, [70, 760, 170, 306], phoneOldInner(), '0 0 200 360', 'phone');
  const rows = [
    [5.29, 'FAR', 80, 420, 260, 440, 'OK', -3], [5.45, 'SOL', 790, 600, 450, 620, 'Okay!', 3],
    [5.62, null, 0, 0, 260, 790, 'Okej', -2], [5.78, 'MEREDITH', 790, 950, 470, 960, 'Oké', 3],
  ];
  rows.forEach(r => {
    const a = r[1] ? avatar(c, r[2], r[3], 150, r[1], { bw: 5, z: 20 }) : box(c, 0, 0, 1, 1);
    const b = bubble(c, r[4], r[5], r[6], { size: 76, rad: r[2] > 500 ? '44px 44px 10px 44px' : '44px 44px 44px 10px' });
    IT.push({ a, b, t: r[0], r: r[7] });
  });
  const big = bubble(c, 250, 540, 'OK', { size: 300, pad: '0 70px 30px', rad: '90px 90px 90px 24px', z: 50 }); big.style.boxShadow = `14px 16px 0 ${INK}`; big.style.background = YEL;
  const dr = stamp(c, 230, 870, 'DATO REAL', { size: 104, bw: 14, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (7.0 – 10.3)  L2
   ====================================================================== */
{
  const c = scene(7.0, 10.3, t => {
    const ex = p(t, 10.1, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 7.0, 3.1, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    const lean = p(t, 9.5, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.07, y: wobble(t, 0.5, 3) - lean * 20 });
    const fanFast = t > 7.3 && t < 7.9;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > 8.3 && t < 9.1 ? [0, -5] : t > 9.6 ? [-4, 3] : [0, 0], bL: t > 7.2 && t < 7.9 ? 8 : t > 9.6 ? 6 : 0, bR: t > 7.2 && t < 7.9 ? 8 : t > 9.6 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, 7.38, { r: -5 });
    const ks = p(t, 8.2, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 8.2, 2)) + (1 - ks) * 8, o: t < 8.18 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 9.68, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true });
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
  [['esto', 23, sl1], ['no', 24, sl1], ['venía', 25, sl1], ['en', 26, sl2], ['el', 27, sl2], ['libro', 28, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   D · BOSTON, 1839 (10.3 – 12.75)  L3a — calle de grabado, voceador y cameo del emú
   ====================================================================== */
headline(10.3, 12.75, '*Boston*', { size: 116, hlT: 10.45, y: 196 });
{
  const c = scene(10.3, 12.75, t => {
    set(cam, { s: 1.05 - 0.05 * p(t, 10.3, 2.45, E.linear) });
    const yv = Math.round(counter(t, 11.07, 1.52, 1800, 1839));
    if (+yr.dataset.v !== yv) { yr.textContent = yv; yr.dataset.v = yv; }
    set(yr, { s: pop(t, 11.0, 0.4) * (1 + (t > 12.22 ? 0.14 * (1 - p(t, 12.22, 0.3)) : 0)), o: t < 11.0 ? 0 : 1 });
    face(boy, t, { jaw: t > 10.4 && t < 11.4 ? 0.35 + 0.45 * Math.abs(Math.sin(t * 11)) : 0, look: [3, -2], brow: -5, seed: 0.5 });
    set(boy.d, { y: wobble(t, 0.8, 3) });
    popA(extra, t, 10.42, { r: -8 + Math.sin(t * 9) * 3 });
    set(held, { r: -12 + Math.sin(t * 8) * 7, y: Math.sin(t * 8) * 6 });
    const look = t > 11.72 && t < 12.34;
    face(emuF, t, { look: look ? [0, -1] : [-2, 12], half: !look, bL: look ? 18 : 0, bR: look ? 26 : 0, blink: false });
    set(emuF.d, { y: look ? -26 * p(t, 11.72, 0.12, E.outBack) : wobble(t, 0.5, 2) });
    set(emuP.d, { r: -5 + wobble(t, 0.6, 1), y: look ? 18 * p(t, 11.72, 0.12) : 0 });
    popA(chipB, t, 12.5, { r: -4 });
  }, { clip: true });
  sceneBg(c, { background: '#d9c7a6' });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: PAPER });
  box(cam, 0, 0, 1080, 1920).innerHTML = streetSvg();
  const emuF = mkEmuF(cam, [600, 470, 300, 450]); emuF.d.style.zIndex = 3;
  const emuP = mk(cam, [575, 720, 350, 443], newsInner({ title: 'EXTRA!', mfs: 74, seed: 3 }), '0 0 600 760', 'np'); emuP.d.style.zIndex = 4;
  const boy = mk(cam, [100, 610, 300, 383], newsboyInner(), '0 0 360 460', 'bust'); boy.d.style.zIndex = 3;
  const held = box(cam, 330, 600, 150, 190, { zIndex: 4 }); held.innerHTML = svgW(newsInner({ title: 'NEWS', mfs: 90, seed: 8 }), '0 0 600 760');
  const crate = box(cam, 80, 940, 360, 160, { zIndex: 5 });
  crate.innerHTML = `<svg width="360" height="160" style="overflow:visible">${cut('<rect x="0" y="40" width="360" height="120"/><rect x="20" y="0" width="320" height="50"/>')}<rect x="20" y="4" width="320" height="18" fill="#F4ECDA" stroke="${INK}" stroke-width="3"/><rect x="26" y="20" width="310" height="18" fill="#F4ECDA" stroke="${INK}" stroke-width="3"/><rect x="16" y="34" width="320" height="16" fill="#F4ECDA" stroke="${INK}" stroke-width="3"/><rect x="0" y="48" width="360" height="112" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><rect x="0" y="48" width="360" height="112" fill="url(#hW)" opacity=".35"/><path d="M0,86 H360 M0,124 H360" stroke="${INK}" stroke-width="3"/><text x="180" y="116" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">NEWS</text></svg>`;
  const extra = bubble(cam, 120, 545, '¡EXTRA!', { size: 70, rad: '40px 40px 40px 8px', z: 6 }); extra.style.fontFamily = 'Rye'; extra.style.fontWeight = 400;
  const yr = el('div', c, { left: 0, top: '318px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '160px', lineHeight: '170px', color: YEL, textShadow: `8px 8px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`, zIndex: 30 }, '1800'); yr.dataset.v = 1800;
  const chipB = chip(c, 500, 1130, 'Boston · 1839', { size: 44, bg: INK, color: YEL, z: 30 });
}

/* ======================================================================
   E · LA MODA DE LOS PERIÓDICOS (12.75 – 18.45)  L3b
   ====================================================================== */
headline(12.75, 15.2, 'Los periódicos tenían una *moda*', { size: 82, hlT: 14.59 });
headline(15.2, 18.45, 'Abreviar frases *mal escritas*', { size: 86, hlT: 16.14 });
{
  const CK = [];
  const c = scene(12.75, 18.45, t => {
    const laugh = t > 17.78;
    JN.forEach((f, i) => {
      const k = pop(t, 13.6 + i * 0.12, 0.45);
      set(f.d, { s: k, y: laugh ? -Math.abs(Math.sin(t * 15 + i)) * 16 : wobble(t, 0.7, 3, i * 0.4), r: laugh ? Math.sin(t * 18 + i) * 4 : 0, o: t < 13.6 + i * 0.12 ? 0 : 1 });
      if (laugh) laughB(f, t, i); else face(f, t, { look: [-4, -3], seed: i * 1.1, jaw: t > 14.0 && t < 15.0 && i === 1 ? Math.abs(Math.sin(t * 10)) * 0.3 : 0 });
    });
    set(pap.wrap, { y: (1 - p(t, 12.85, 0.4, E.outBack)) * -700, r: -1.5 + wobble(t, 0.4, 0.4) });
    CK.forEach(q => { popA(q.chk, t, q.t, { r: -6 }); q.txt.style.opacity = t >= q.t - 0.05 ? 1 : 0.18; set(q.txt, { x: (1 - p(t, q.t - 0.05, 0.25, E.outBack)) * 30 }); });
    jas.forEach((j, i) => { const t0 = 17.8 + i * 0.15; set(j, { s: pop(t, t0, 0.3), r: [-10, 8, -4][i], y: -p(t, t0, 0.8) * 30, o: t < t0 ? 0 : 1 }); });
    popA(c1839, t, 14.6, { r: 6 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 3px, transparent 3px 90px)' });
  const pap = paperPiece(c, 110, 430, 860, 400, { seed: 21, bg: '#FBF6EA' });
  el('div', pap.inner, { left: '30px', top: '18px', fontFamily: 'Rye', fontSize: '50px', color: INK, whiteSpace: 'nowrap' }, 'LA MODA');
  const c1839 = chip(pap.wrap, 320, 20, '1839', { size: 36, bg: INK, color: YEL, z: 30 });
  [[15.25, 'abreviar frases'], [16.14, 'mal escritas'], [16.86, '…¡a propósito!'], [17.59, 'para hacer gracia']].forEach((q, i) => {
    const y = 92 + i * 68;
    box(pap.inner, 34, y + 6, 48, 48, { border: `5px solid ${INK}`, borderRadius: '8px', background: '#fff' });
    const chk = box(pap.inner, 30, y - 12, 68, 68, { zIndex: 3 }); chk.innerHTML = CHECK;
    const txt = el('div', pap.inner, { left: '110px', top: px(y - 4), fontFamily: 'Playfair', fontStyle: i === 2 ? 'italic' : 'normal', fontWeight: 800, fontSize: '54px', lineHeight: 1.1, color: i === 1 ? RED : INK, whiteSpace: 'nowrap' }, q[1]);
    CK.push({ chk, txt, t: q[0] });
  });
  const desk = box(c, 300, 1080, 640, 120, { zIndex: 6 });
  desk.innerHTML = `<svg width="640" height="120" style="overflow:visible">${cut('<rect x="0" y="0" width="640" height="120"/>')}<rect x="0" y="0" width="640" height="120" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="0" y="0" width="640" height="120" fill="url(#hW)" opacity=".3"/><rect x="0" y="0" width="640" height="22" fill="#8b5a3a" stroke="${INK}" stroke-width="4"/><rect x="60" y="-28" width="150" height="30" fill="#F4ECDA" stroke="${INK}" stroke-width="3" transform="rotate(-4 60 -28)"/><rect x="400" y="-24" width="170" height="26" fill="#F4ECDA" stroke="${INK}" stroke-width="3" transform="rotate(3 400 -24)"/></svg>`;
  const JN = [mk(c, [290, 790, 240, 306], journalistInner(41, 0), '0 0 360 460', 'bust'), mk(c, [505, 770, 250, 319], journalistInner(42, 1), '0 0 360 460', 'bust'), mk(c, [715, 790, 230, 294], journalistInner(43, 2), '0 0 360 460', 'bust')];
  JN.forEach(f => (f.d.style.zIndex = 5));
  const jas = [jaT(c, 330, 860, '¡JA!'), jaT(c, 610, 820, '¡JA, JA!', 64), jaT(c, 790, 900, '¡JA!')];
}

/* ======================================================================
   F · UN PERIÓDICO ESCRIBE «O.K.» (18.45 – 21.7)  L4a
   ====================================================================== */
headline(18.45, 21.7, 'Un periódico escribe *O.K.*', { size: 86, hlT: 19.86 });
{
  const c = scene(18.45, 21.7, t => {
    const k = p(t, 18.5, 0.5, E.outBack);
    set(np.d, { y: (1 - k) * 900, r: lerp(14, -2, k) + wobble(t, 0.4, 0.4), s: 1 + 0.04 * p(t, 19.0, 2.6, E.linear) });
    okHL.setAttribute('width', f1(p(t, 19.84, 0.35, E.outCubic) * 178));
    const kl = pop(t, 20.15, 0.45);
    set(lens, { s: kl, x: (1 - clamp(kl)) * -150, y: (1 - clamp(kl)) * 130, r: -4 + wobble(t, 0.7, 1.5), o: t < 20.15 ? 0 : 1 });
    paint(lensHL, t, 20.3, 0.3);
    popA(ini, t, 20.95, { r: -3 });
    set(arL, { o: t > 21.0 ? 1 : 0 }); set(arR, { o: t > 21.0 ? 1 : 0 });
    popA(chipN, t, 18.9, { r: 3 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.07)', 0);
  const np = mk(c, [280, 410, 640, 811], newsInner({ title: 'BOSTON MORNING POST', mfs: 44, okY: 470, seed: 9 }), '0 0 600 760', 'np');
  const okHL = np.d.querySelector('.okHL');
  const chipN = chip(c, 80, 420, 'Boston · 1839', { size: 36, bg: INK, color: YEL, z: 30 });
  const lens = box(c, 330, 600, 440, 440, { zIndex: 40 });
  lens.innerHTML = `<svg width="440" height="560" style="overflow:visible;position:absolute;left:0;top:0"><path d="M360,360 L470,500" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M360,360 L470,500" stroke="${WOOD}" stroke-width="30" stroke-linecap="round"/><circle cx="220" cy="220" r="214" fill="${INK}"/><circle cx="220" cy="220" r="204" fill="${BRASS}"/><circle cx="220" cy="220" r="186" fill="#FBF6EA" stroke="${INK}" stroke-width="5"/></svg>`;
  const lIn = box(lens, 34, 34, 372, 372, { borderRadius: '50%', overflow: 'hidden' });
  box(lIn, 0, 0, 372, 372, { backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 34px, rgba(43,33,24,.28) 34px 46px)' });
  const lt = el('div', lIn, { left: '0', top: '120px', width: '372px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '140px', color: INK, background: '#FBF6EA' }, hlSpan('O.K.', 'lhl'));
  const lensHL = lt.querySelector('.lhl');
  box(lens, 60, 40, 120, 60, { borderRadius: '50%', background: 'rgba(255,255,255,.55)', transform: 'rotate(-30deg)' });
  const ini = chip(c, 330, 1080, 'las iniciales de…', { size: 48, bg: PINK, z: 45 });
  const arL = box(c, 0, 0, 1080, 1920, { zIndex: 44 }); arL.innerHTML = arrowSvg('M430,1078 Q400,980 450,900', PINK, 9);
  const arR = box(c, 0, 0, 1080, 1920, { zIndex: 44 }); arR.innerHTML = arrowSvg('M700,1078 Q740,990 680,900', PINK, 9);
}

/* ======================================================================
   G · «OLL KORRECT» EN EL COMPONEDOR (21.7 – 26.2)  L4b
   ====================================================================== */
headline(21.7, 23.1, '«oll korrect»', { size: 116, y: 200, keyColor: RED });
headline(23.1, 24.97, 'O sea, *all correct*', { size: 100, hlT: 23.83 });
headline(24.97, 26.2, '*Todo correcto*', { size: 116, hlT: 25.15 });
{
  const LET = 'OLL KORRECT'.split(''); const TT = [21.76, 21.86, 21.96, 22.12, 22.33, 22.42, 22.51, 22.6, 22.69, 22.78, 22.87];
  const SO = [];
  const c = scene(21.7, 26.2, t => {
    const fall = 24.97;
    SO.forEach((q, i) => {
      const kd = p(t, q.t, 0.32, E.outBounce);
      let x = 0, y = lerp(-420, 0, kd), r = 0, o = t < q.t ? 0 : 1;
      if (q.ini) { const km = p(t, 25.0, 0.38, E.inOutCubic); x = km * (q.tx - q.x0); y += km * 70; q.sc = lerp(1, 1.7, p(t, 25.25, 0.3, E.outBack)); }
      else if (t > fall) { const tf = t - fall - i * 0.02; y = tf > 0 ? 900 * tf * tf * 3 : 0; r = tf > 0 ? (i % 2 ? 1 : -1) * tf * 200 : 0; }
      set(q.e, { x, y, r, o, s: q.ini ? q.sc : 1 });
      q.e.style.background = q.ini && t > 25.0 ? YEL : METAL;
    });
    dots.forEach((d, i) => popA(d, t, 25.45 + i * 0.1, { y: 70, s: 1.7 }));
    set(tray, { y: t > 24.97 ? 70 * p(t, 25.0, 0.38, E.inOutCubic) : 0, o: 1 - p(t, 25.25, 0.2) });
    const rowsO = 1 - p(t, 24.85, 0.15);
    [r1, r2].forEach((r, i) => { const t0 = i ? 22.33 : 21.76; set(r, { o: t < t0 ? 0 : rowsO, x: (1 - p(t, t0, 0.3, E.outBack)) * -60 }); });
    [[s1, a1, f1x, 23.83], [s2, a2, f2x, 24.13]].forEach(([s, a, f, t0]) => { s.style.transform = `scaleX(${f1(p(t, t0, 0.15) * 100) / 100}) rotate(-8deg)`; popA(a, t, t0 + 0.08, { r: -10 }); popA(f, t, t0 + 0.2, { r: 0 }); });
    const ke = pop(t, 25.15, 0.45); set(eq.wrap, { s: ke, o: t < 25.15 ? 0 : 1, r: -1.5 });
    popA(eqChk, t, 25.6, { r: -6 });
  });
  sceneBg(c, { background: '#E7D9BC', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.06) 0 3px, transparent 3px 40px)' });
  const tray = box(c, 60, 470, 960, 200, { zIndex: 4 });
  tray.innerHTML = `<svg width="960" height="200" style="overflow:visible">${cut('<rect x="0" y="40" width="960" height="150" rx="10"/>')}<rect x="0" y="150" width="960" height="40" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="0" y="150" width="960" height="40" fill="url(#hD)" opacity=".5"/><rect x="0" y="40" width="26" height="150" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="934" y="40" width="26" height="150" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><text x="480" y="182" text-anchor="middle" font-family="Rye" font-size="24" fill="${INK}">COMPONEDOR</text></svg>`;
  LET.forEach((ch, i) => {
    const x0 = 100 + i * 80, blank = ch === ' ';
    const e = miniSort(c, x0, blank ? 556 : 516, blank ? '' : ch, { w: 72, h: blank ? 64 : 104, z: 10 });
    const ini = i === 0 || i === 4;
    SO.push({ e, t: TT[i], x0, ini, tx: i === 0 ? 349 : 559, sc: 1 });
  });
  const dots = [miniSort(c, 459, 556, '.', { w: 52, h: 64, fs: 60, z: 10 }), miniSort(c, 669, 556, '.', { w: 52, h: 64, fs: 60, z: 10 })];
  dots.forEach(d => (d.style.lineHeight = '20px'));
  const mkRow = (y, wrong, rest, fix, good) => {
    const r = el('div', c, { left: '150px', top: px(y), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '124px', lineHeight: 1, color: INK, whiteSpace: 'nowrap', zIndex: 20 });
    r.innerHTML = `<span class="wr" style="position:relative;display:inline-block">${wrong}<span class="st" style="position:absolute;left:-8px;top:46%;width:115%;height:12px;background:${RED};border-radius:6px;transform-origin:left center;transform:scaleX(0)"></span><span class="ad" style="position:absolute;left:0;top:-70px;font-family:SpecialElite;font-style:normal;font-size:84px;color:${RED}">${fix}</span></span>${rest}<span class="fx" style="display:inline-block;margin-left:34px;font-style:normal;font-size:96px;color:${INK}"><span style="font-family:InterV;font-weight:800">→</span> ${hlSpan(good, 'gh')}</span>`;
    return r;
  };
  const r1 = mkRow(745, 'o', 'll', 'a', 'all'), r2 = mkRow(925, 'k', 'orrect', 'c', 'correct');
  r2.style.left = '130px'; r2.querySelector('.fx').style.fontSize = '84px';
  const s1 = r1.querySelector('.st'), a1 = r1.querySelector('.ad'), f1x = r1.querySelector('.fx'), s2 = r2.querySelector('.st'), a2 = r2.querySelector('.ad'), f2x = r2.querySelector('.fx');
  [r1, r2].forEach(r => { const g = r.querySelector('.gh'); g.style.transform = 'scaleX(1) rotate(-1.2deg)'; });
  const eq = paperPiece(c, 150, 760, 780, 300, { seed: 31, bg: '#FBF6EA' });
  el('div', eq.inner, { left: '0', top: '34px', width: '762px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '70px', color: INK, whiteSpace: 'nowrap' }, '«all correct»');
  el('div', eq.inner, { left: '0', top: '138px', width: '762px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', color: INK, whiteSpace: 'nowrap' }, '= todo correcto');
  const eqChk = box(c, 820, 700, 150, 150, { zIndex: 30 }); eqChk.innerHTML = CHECK;
}

/* ======================================================================
   H · «COMO ALGUIEN QUE NO SABE ESCRIBIR» (26.2 – 29.1)  L4c — pizarra
   ====================================================================== */
headline(26.2, 29.1, 'Escrito como alguien que *no sabe escribir*', { size: 74, hlT: 28.09 });
{
  const CH = [];
  const c = scene(26.2, 29.1, t => {
    CH.forEach(q => { set(q.e, { s: t >= q.t ? pop(t, q.t, 0.2) : 0, r: q.r, y: q.y, o: t >= q.t ? 1 : 0 }); });
    const writing = t > 26.37 && t < 27.6;
    const proud = t > 27.6 && t < 28.4, oops = t > 28.4;
    sortFace(kk, t, { hat: true, look: writing ? [-5, -6] : oops ? [0, -6] : [0, 0], closed: proud, open: oops ? 0.6 : 0, aR: writing ? 150 + Math.sin(t * 30) * 10 : 20, aL: proud ? 40 : 10, bL: oops ? 14 : 6, bR: oops ? 14 : 6, seed: 0.4 });
    sortFace(oo, t, { hat: true, look: oops ? [6, -6] : [6, -4], closed: proud, open: oops ? 0.45 : 0, aL: proud ? 60 : 10, aR: 10, bL: oops ? 14 : 4, bR: oops ? 14 : 4, seed: 1.2 });
    set(kk.d, { y: wobble(t, 0.8, 4) - (proud ? Math.abs(Math.sin(t * 10)) * 14 : 0), r: proud ? -4 : 0 });
    set(oo.d, { y: wobble(t, 0.8, 4, 0.5) - (proud ? Math.abs(Math.sin(t * 10 + 1)) * 14 : 0), r: proud ? 4 : 0 });
    stampA(ms, t, 28.41, -8);
  });
  sceneBg(c, { background: '#E7D9BC' });
  const slate = box(c, 120, 440, 820, 420, { zIndex: 3 });
  slate.innerHTML = `<svg width="820" height="420" style="overflow:visible">${cut('<rect x="0" y="0" width="820" height="420" rx="18"/>')}<rect x="0" y="0" width="820" height="420" rx="18" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect x="0" y="0" width="820" height="420" rx="18" fill="url(#hW)" opacity=".3"/><rect x="30" y="30" width="760" height="360" rx="8" fill="#2f3530" stroke="${INK}" stroke-width="5"/><path d="M60,350 q120,-20 240,4 M480,80 q100,10 260,-6" stroke="#fff" stroke-width="3" opacity=".12" fill="none"/></svg>`;
  const r = rng(39); let x = 190;
  'oll korrect'.split('').forEach((ch, i) => {
    if (ch === ' ') { x += 50; return; }
    const e = el('div', c, { left: px(x), top: '560px', fontFamily: 'SpecialElite', fontSize: '140px', lineHeight: 1, color: '#F4F1E8', zIndex: 6, textShadow: '2px 2px 0 rgba(255,255,255,.2)' }, ch);
    CH.push({ e, t: 26.4 + i * 0.105, r: (r() - 0.5) * 22, y: (r() - 0.5) * 40 });
    x += ch === 'l' ? 52 : 70;
  });
  const oo = mkSort(c, [330, 900, 230, 360], 'O'), kk = mkSort(c, [610, 900, 230, 360], 'K');
  [oo, kk].forEach(f => (f.d.style.zIndex = 5));
  const ms = stamp(c, 300, 790, '¡MAL ESCRITO!', { size: 64, bw: 9, z: 20, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   I · CHISTE DE PERIODISTAS → A LA PAPELERA (29.1 – 33.0)  L5
   ====================================================================== */
headline(29.1, 30.65, 'Un *chiste* de periodistas', { size: 90, hlT: 29.51 });
headline(30.65, 33.0, 'Debería haber *muerto* en una semana', { size: 78, hlT: 31.53 });
{
  const c = scene(29.1, 33.0, t => {
    const kc = p(t, 30.71, 0.55, E.inCubic);
    const jit = t > 30.71 && t < 31.3 ? Math.sin(t * 70) * 10 : 0;
    set(np.d, { sx: lerp(1, 0.2, kc), sy: lerp(1, 0.26, kc), r: kc * 160 + (t < 30.71 ? Math.sin(t * 16) * 2 : 0), x: jit, y: t < 30.65 ? -Math.abs(Math.sin(t * 14)) * 10 : 0, o: t < 31.24 ? 1 : 0 });
    okHL.setAttribute('width', 178);
    const kb = clamp((t - 31.4) / 0.7), on = t >= 31.2;
    const bx = lerp(540, 760, kb), by = lerp(810, 1030, kb) - Math.sin(kb * Math.PI) * 330;
    set(ball, { x: bx - 90, y: by - 90, r: t * 400, s: t < 31.4 ? pop(t, 31.2, 0.2) : 1, o: on && t < 32.08 ? 1 : 0 });
    set(bk.d, { r: t > 32.08 ? shake(t, 32.08, 0.4, 6) : 0, y: t > 32.08 ? -shake(t, 32.08, 0.3, 4) : 0 });
    jas.forEach((j, i) => { const t0 = 29.4 + i * 0.18; set(j, { s: pop(t, t0, 0.3) * (1 - p(t, 30.6, 0.12)), r: [-10, 8][i], y: -p(t, t0, 1) * 30, o: t < t0 ? 0 : 1 }); });
    set(cal, { o: t > 31.85 ? 1 : 0, y: (1 - p(t, 31.85, 0.3, E.outBack)) * -40 });
    XS.forEach((x, i) => { const t0 = 31.95 + i * 0.13; set(x, { s: t < t0 ? 0 : lerp(1.6, 1, p(t, t0, 0.12)), o: t < t0 ? 0 : 1 }); });
    popA(rip, t, 32.15, { r: -6 });
  });
  sceneBg(c, { background: '#E7D9BC' });
  halftone(c, 'rgba(43,33,24,.06)', 0);
  const np = mk(c, [330, 520, 420, 532], newsInner({ title: 'MORNING POST', mfs: 56, okY: 470, seed: 9 }), '0 0 600 760', 'np');
  const okHL = np.d.querySelector('.okHL');
  const ball = box(c, 0, 0, 180, 180, { zIndex: 8 }); ball.innerHTML = svgW(ballInner(), '0 0 200 200');
  const bk = mk(c, [640, 980, 240, 277], basketInner(), '0 0 260 300', 'bk'); bk.d.style.zIndex = 9;
  const jas = [jaT(c, 110, 620, '¡JA, JA!', 72), jaT(c, 760, 700, '¡JA!', 84)];
  const cal = box(c, 120, 420, 840, 100, { zIndex: 6 });
  const XS = [];
  ['L', 'M', 'X', 'J', 'V', 'S', 'D'].forEach((d, i) => {
    const cell = box(cal, i * 120, 0, 108, 96, { background: '#fff', border: `4px solid ${INK}`, borderRadius: '10px', boxShadow: `4px 5px 0 ${SH}`, fontFamily: 'Rye', fontSize: '50px', lineHeight: '90px', textAlign: 'center', color: INK }); cell.textContent = d;
    const x = box(cal, i * 120 + 6, 4, 96, 90, { zIndex: 3 }); x.innerHTML = XSVG; XS.push(x);
  });
  const rip = chip(c, 300, 1150, '¿fin del chiste?', { size: 40, bg: INK, color: '#fff', z: 20 });
}
