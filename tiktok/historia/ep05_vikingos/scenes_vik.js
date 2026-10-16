/* Ep. 5 · Los vikingos nunca llevaron cuernos — escenas (tiempos clavados a words_table.txt) */
const extraDefs = document.createElementNS(NS, 'svg');
extraDefs.setAttribute('width', '0'); extraDefs.setAttribute('height', '0'); extraDefs.style.position = 'absolute';
extraDefs.innerHTML = `<defs><symbol id="vikS" viewBox="0 0 420 560" overflow="visible">${vikingInner({ horns: true, seed: 33 })}</symbol>
<symbol id="vikN" viewBox="0 0 420 560" overflow="visible">${vikingInner({ horns: false, axe: false, seed: 34 })}</symbol></defs>`;
STAGE.appendChild(extraDefs);
AV.VIK = ['vikS', '110 150 200 200', 420, 560];
const mkVik = (pa, b, o = {}) => { const f = mk(pa, b, vikingInner(o), '0 0 420 560', 'vik'); const q = s => f.d.querySelector(s); f.head = q('.headg'); f.hL = q('.hornL'); f.hR = q('.hornR'); return f; };
const hornSvg = () => `<svg viewBox="30 30 130 180" width="100%" height="100%" style="overflow:visible">${hornG('h')}</svg>`;
const emuHelm = `<g>${cut('<path d="M104,150 C104,74 150,52 200,52 C250,52 296,74 296,150 Z"/><path d="M110,120 C80,116 56,96 50,60 C48,46 52,34 58,26 C62,56 80,82 116,96 Z"/><path d="M290,120 C320,116 344,96 350,60 C352,46 348,34 342,26 C338,56 320,82 284,96 Z"/>', 4, 5)}
<path d="M110,120 C80,116 56,96 50,60 C48,46 52,34 58,26 C62,56 80,82 116,96 Z" fill="${HORN}" stroke="${INK}" stroke-width="3"/><path d="M290,120 C320,116 344,96 350,60 C352,46 348,34 342,26 C338,56 320,82 284,96 Z" fill="${HORN}" stroke="${INK}" stroke-width="3"/>
<path d="M104,150 C104,74 150,52 200,52 C250,52 296,74 296,150 Z" fill="${IRON}" stroke="${INK}" stroke-width="3.5"/><path d="M104,150 C104,74 150,52 200,52 C250,52 296,74 296,150 Z" fill="url(#hA)"/><path d="M98,140 H302 V160 H98 Z" fill="#9a9384" stroke="${INK}" stroke-width="3"/></g>`;
const pencilSvg = `<svg viewBox="0 0 60 300" width="60" height="300" style="overflow:visible"><path d="M30,0 L18,40 L42,40 Z" fill="#e8c9a0" stroke="${INK}" stroke-width="3"/><path d="M30,0 L26,14 L34,14 Z" fill="${INK}"/><rect x="18" y="40" width="24" height="230" fill="${YEL}" stroke="${INK}" stroke-width="3"/><path d="M26,44 V266" stroke="${INK}" stroke-width="1.5"/><rect x="16" y="266" width="28" height="22" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><rect x="18" y="286" width="24" height="14" rx="5" fill="${PINK}" stroke="${INK}" stroke-width="3"/></svg>`;
// boceto de figurín (línea) — viewBox 0 0 600 700; los cuernos van aparte
function sketchFig(withHorns, hornCls = 'skh') {
  const ln = `stroke="#3d342b" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  let s = `<path d="M300,200 m-62,0 a62,66 0 1,0 124,0 a62,66 0 1,0 -124,0" ${ln}/><path d="M232,186 C232,120 270,100 300,100 C330,100 368,120 368,186 Z" ${ln}/><path d="M228,186 H372" ${ln}/>`;
  s += `<path d="M252,232 C256,300 284,330 300,342 C316,330 344,300 348,232" ${ln}/><path d="M276,218 q24,10 48,0" ${ln}/><circle cx="278" cy="198" r="5" fill="#3d342b"/><circle cx="322" cy="198" r="5" fill="#3d342b"/>`;
  s += `<path d="M230,340 L370,340 L440,660 L160,660 Z" ${ln}/><path d="M230,340 L150,470 L130,560 M370,340 L450,470 L470,560" ${ln}/><path d="M200,420 H400 M300,350 V650" ${ln} stroke-dasharray="8 12"/>`;
  s += `<path d="M120,680 q180,-30 360,0" stroke="#3d342b" stroke-width="2" fill="none" opacity=".5"/>`;
  const hp = [`M240,170 C200,160 168,128 164,74`, `M164,74 C186,112 214,132 244,140`, `M360,170 C400,160 432,128 436,74`, `M436,74 C414,112 386,132 356,140`];
  if (withHorns) s += hp.map(d => `<path class="${hornCls}" d="${d}" pathLength="1" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('');
  return s;
}
const SKH = [[240, 170], [164, 74], [244, 140], [360, 170], [436, 74], [356, 140]];

/* ======================================================================
   A · GANCHO (0 – 4.42)  L0 — vikingo feroz; en "nunca" los cuernos salen disparados
   ====================================================================== */
{
  const c = scene(-1, 4.42, t => {
    const punch = t > 2.49 ? 0.06 * (1 - p(t, 2.49, 0.5, E.outCubic)) : 0;
    set(cam, { s: 1 + 0.05 * p(t, 0, 4.4, E.linear) + punch });
    set(sunR, { r: t * 10 });
    set(ttl, { s: lerp(1.06, 1, p(t, 0, 0.3)) * (t > 2.49 ? 1 + 0.05 * (1 - p(t, 2.49, 0.35)) : 1), o: 1 });
    nn.style.textShadow = glitch(t, 2.49, 0.3) || glitch(t, 0.75, 0.2);
    paint(nh, t, 0.75, 0.3);
    const kf = p(t, 0.76, 0.75, E.outCubic), sp = t > 0.76 ? (t - 0.76) : 0, fast = t > 2.49 ? (t - 2.49) * 200 : 0;
    vk.hL.setAttribute('transform', t < 0.76 ? '' : `translate(${f1(-95 * kf + Math.sin(t * 2.2) * 6)},${f1(-120 * kf + Math.sin(t * 3) * 8)}) rotate(${f1(-sp * 300 - fast)} 95 120)`);
    vk.hR.setAttribute('transform', t < 0.76 ? '' : `translate(${f1(95 * kf + Math.sin(t * 2.6) * 6)},${f1(-135 * kf + Math.cos(t * 3) * 8)}) rotate(${f1(sp * 320 + fast)} 325 120)`);
    const sur = t > 0.85;
    face(vk, t, { look: !sur ? [0, 0] : t < 2.45 ? [0, -5] : [0, 1], bL: sur ? 14 : 0, bR: sur ? 14 : 0, jaw: sur ? 0.55 * p(t, 0.85, 0.2) : 0, seed: 0.5, blink: t > 1.2 });
    vk.head.setAttribute('transform', `rotate(${f1(sur && t < 2.45 ? Math.sin(t * 4) * 2 : 0)} 210 300)`);
    set(vk.d, { y: wobble(t, 0.5, 3) });
    const kb = pop(t, 0.76, 0.3); set(plof, { s: kb * (1 + 0.1 * Math.sin(t * 30)), r: -8, o: t < 0.76 ? 0 : 1 - p(t, 1.55, 0.25) });
    popA(drop, t, 1.35, { y: (t > 1.35 ? (t - 1.35) * 30 : 0) });
    set(qm, { o: t > 2.55 ? 1 : 0, s: pop(t, 2.55, 0.35), y: Math.sin(t * 5) * 8, r: 10 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const sunR = rays(cam, 90, 560, 900, 22, 'rgba(255,230,0,.35)', 'transparent', 0); sunR.style.transformOrigin = '450px 450px';
  box(cam, 200, 640, 680, 680, { borderRadius: '50%', background: YEL, border: `6px solid ${INK}`, boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(43,33,24,.12) 0 2px, transparent 2px 9px)' });
  const vk = mkVik(cam, [130, 600, 820, 1093], { horns: true, hornsSep: true, seed: 31 });
  vk.d.style.zIndex = 3;
  const ttl = el('div', c, { left: '30px', top: '186px', width: '1020px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '94px', lineHeight: 1.04, color: INK, zIndex: 40, textShadow: '4px 4px 0 #fff' },
    `Los vikingos <span class="nn" style="font-style:italic;color:${RED}">${hlSpan('NUNCA', 'nh')}</span><br>llevaron cuernos`);
  const nn = ttl.querySelector('.nn'), nh = ttl.querySelector('.nh');
  const plof = box(c, 330, 520, 420, 300, { zIndex: 30 });
  { let pts = ''; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, rr = i % 2 ? 0.62 : 1; pts += (i ? 'L' : 'M') + f1(210 + Math.cos(a) * 200 * rr) + ',' + f1(150 + Math.sin(a) * 140 * rr); }
    plof.innerHTML = `<svg width="420" height="300" style="overflow:visible"><path d="${pts}Z" fill="#fff" stroke="#fff" stroke-width="22" stroke-linejoin="round"/><path d="${pts}Z" fill="${YEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><text x="210" y="178" text-anchor="middle" font-family="Rye" font-size="92" fill="${RED}" stroke="${INK}" stroke-width="3">¡PLOF!</text></svg>`; }
  const drop = box(c, 790, 860, 50, 70, { zIndex: 31 }); drop.innerHTML = `<svg viewBox="0 0 50 70" width="50" height="70"><path d="M25,2 C10,30 4,44 4,52 A21,21 0 0,0 46,52 C46,44 40,30 25,2 Z" fill="#9fd6ff" stroke="${INK}" stroke-width="4"/><path d="M16,50 q0,-10 6,-16" stroke="#fff" stroke-width="4" fill="none"/></svg>`;
  const qm = el('div', c, { left: '820px', top: '700px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 31 }, '?');
}

/* ======================================================================
   B · LA CULPA ES DE UNA ÓPERA (4.42 – 7.75)  L1 — telón + foco + sello MITO
   ====================================================================== */
headline(4.42, 7.75, 'La culpa es de una *ópera*', { size: 84, color: PAPER, keyColor: YEL, hlc: 'transparent', hlT: 6.97, shadow: `4px 4px 0 ${INK}` });
{
  const NOTES = [];
  const c = scene(4.42, 7.75, t => {
    const k = p(t, 4.65, 1.4, E.inOutCubic);
    set(cL, { x: -k * 430 }); set(cR, { x: k * 430 });
    set(spot, { o: p(t, 5.31, 0.3) * (0.85 + 0.15 * Math.sin(t * 7)) });
    const ks = pop(t, 6.97, 0.4); set(sng.d, { s: ks, y: (1 - clamp(ks)) * 80 + wobble(t, 1.4, 4), o: t < 6.97 ? 0 : 1 });
    if (sng.mouth) sng.mouth.setAttribute('transform', `translate(150 212) scale(1 ${f1(0.6 + 0.6 * Math.abs(Math.sin(t * 8)))}) translate(-150 -212)`);
    NOTES.forEach((n, i) => { const ph = ((t - 7.0) * 0.9 + i * 0.33) % 1; set(n, { x: Math.sin(ph * 6 + i) * 30, y: -ph * 220, o: t > 7.0 ? 1 - ph : 0, r: Math.sin(ph * 5) * 20 }); });
    const km = p(t, 6.97, 0.3, E.outBack); set(marq, { s: km, o: t < 6.97 ? 0 : 1 });
    bulbs.forEach((b, i) => b.style.background = (t > 6.97 && (Math.floor(t * 8) + i) % 2) ? YEL : '#7a6a3a');
    stampA(mito, t, 7.12, -12);
  }, { clip: true });
  sceneBg(c, { background: '#1d1510' });
  const back = box(c, 0, 420, 1080, 700, { background: '#3a1a14', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 6px, transparent 6px 40px)' });
  const floor = box(c, 0, 1080, 1080, 900, { background: '#6b4423', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0 4px, transparent 4px 90px), linear-gradient(#7a5030, #3a2412)', borderTop: `8px solid ${INK}` });
  const spot = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); spot.innerHTML = `<svg width="1080" height="1920"><defs><radialGradient id="spg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".75"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient></defs><path d="M470,420 L610,420 L860,1150 L220,1150 Z" fill="rgba(255,240,170,.22)"/><ellipse cx="540" cy="1120" rx="340" ry="70" fill="url(#spg)"/></svg>`;
  const sng = mk(c, [430, 640, 220, 469], singerInner({ weapon: 'spear', horns: true, wings: true, raise: true, seed: 5 }), '0 0 300 640', 'sng'); sng.mouth = sng.d.querySelector('.mouth'); sng.d.style.zIndex = 3; sng.d.style.transformOrigin = '50% 100%';
  for (let i = 0; i < 4; i++) NOTES.push(el('div', c, { left: px(i % 2 ? 690 : 320), top: px(640 + (i % 3) * 30), fontSize: '70px', color: YEL, textShadow: `3px 3px 0 ${INK}`, zIndex: 4, fontFamily: 'InterV' }, i % 2 ? '♫' : '♪'));
  let fl = ''; for (let x = 30; x < 1080; x += 70) fl += `<ellipse cx="${x}" cy="1092" rx="22" ry="12" fill="${YEL}" stroke="${INK}" stroke-width="3"/>`;
  box(c, 0, 0, 1080, 1920, { zIndex: 5 }).innerHTML = `<svg width="1080" height="1920">${fl}</svg>`;
  const cL = box(c, -20, 330, 580, 800, { zIndex: 8 }); cL.innerHTML = curtainHTML(580, 800);
  const cR = box(c, 520, 330, 580, 800, { zIndex: 8 }); cR.innerHTML = curtainHTML(580, 800, true);
  const val = box(c, -10, 320, 1100, 130, { zIndex: 9 }); { let sw = ''; for (let x = 0; x < 1100; x += 220) sw += `<path d="M${x},20 Q${x + 110},150 ${x + 220},20" fill="${CURT}" stroke="${INK}" stroke-width="5"/><path d="M${x},20 Q${x + 110},150 ${x + 220},20" fill="url(#hD)" opacity=".35"/><path d="M${x + 10},40 Q${x + 110},140 ${x + 210},40" stroke="${BRASS}" stroke-width="6" fill="none"/>`; val.innerHTML = `<svg width="1100" height="160" style="overflow:visible"><rect x="0" y="0" width="1100" height="34" fill="${CURT}" stroke="${INK}" stroke-width="5"/>${sw}</svg>`; }
  const marq = box(c, 340, 452, 400, 110, { zIndex: 7, background: INK, border: `6px solid ${BRASS}`, borderRadius: '18px', boxShadow: `8px 8px 0 rgba(0,0,0,.5)` });
  el('div', marq, { left: 0, top: '6px', width: '388px', textAlign: 'center', fontFamily: 'Rye', fontSize: '68px', color: YEL, textShadow: `3px 3px 0 ${RED}` }, 'ÓPERA');
  const bulbs = []; for (let i = 0; i < 10; i++) bulbs.push(box(marq, 8 + i * 38, -16, 16, 16, { borderRadius: '50%', border: `2px solid ${INK}` }));
  const mito = stamp(c, 220, 860, 'MITO', { size: 220, bw: 18, z: 60, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   C · MARCA: EL VECINO EN SU BALCÓN (7.75 – 11.05)  L2
   ====================================================================== */
{
  const c = scene(7.75, 11.05, t => {
    const ex = p(t, 10.85, 0.2, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.04 * p(t, 7.75, 3.2, E.linear), 0.3, ex), x: ex * -330, y: ex * 380, o: 1 - ex * 0.6 });
    set(vec.d, { y: wobble(t, 0.5, 3) });
    const fanFast = t > 7.9 && t < 8.6;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > 9.1 && t < 9.9 ? [0, -5] : t > 10.3 ? [-4, 3] : [0, 0], bL: t > 8.0 && t < 8.9 ? 8 : 0, bR: t > 8.0 && t < 8.9 ? 12 : 0, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    popA(tag, t, 8.01, { r: -5 });
    const ks = p(t, 9.05, 0.55, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 * (1 - p(t, 9.0, 2)) + (1 - ks) * 8, o: t < 9.0 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, 10.4, 0.35);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
  }, { clip: true, cut: true });
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
  [['esto', 24, sl1], ['no', 25, sl1], ['venía', 26, sl1], ['en', 27, sl2], ['el', 28, sl2], ['libro', 29, sl2]].forEach(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.innerHTML = q[0] === 'libro' ? hlSpan('libro', 'shl') : q[0]; q[2].appendChild(s); s.style.position = 'relative'; sw.push({ e: s, t: W[q[1]].s }); });
  const sHL = sign.querySelector('.shl');
}

/* ======================================================================
   D1 · EL CASCO REAL EN SU VITRINA (11.05 – 14.72)  L3a
   ====================================================================== */
headline(11.05, 13.0, 'Casco vikingo *casi completo*…', { size: 76, hlT: 11.82 });
headline(13.0, 14.72, '…se ha encontrado *uno*', { size: 84, hlT: 14.34 });
{
  const c = scene(11.05, 14.72, t => {
    set(cam, { s: 1 + 0.06 * p(t, 11.05, 3.6, E.linear) });
    const kv = p(t, 11.1, 0.5, E.outBack); set(vit, { y: (1 - kv) * 600, o: 1 });
    set(shine, { x: lerp(-300, 700, p(t, 11.6, 1.2, E.inOutCubic)) });
    set(gj.d, { r: wobble(t, 0.4, 1.2), y: wobble(t, 0.5, 4) });
    popA(plq, t, 11.42, { r: -2 });
    popA(ch1, t, 13.61, { r: -3 }); popA(ch2, t, 13.9, { r: 2 });
    const kb = pop(t, 14.34, 0.45); set(badge, { s: kb, r: 8 + wobble(t, 0.8, 3), o: t < 14.34 ? 0 : 1 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 800px' });
  sceneBg(cam, { background: '#d6c4a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 60px)' });
  box(cam, 0, 1160, 1080, 760, { background: '#7a5232', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 3px, transparent 3px 120px)' });
  box(cam, 0, 0, 1080, 1920, {}).innerHTML = `<svg width="1080" height="1920"><path d="M470,330 L610,330 L860,1200 L220,1200 Z" fill="rgba(255,250,215,.35)"/></svg>`;
  const vit = box(cam, 0, 0, 1080, 1920);
  const ped = box(vit, 300, 930, 480, 330, { background: '#efe6d2', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.12) 0 2px, transparent 2px 14px)' });
  box(vit, 280, 910, 520, 34, { background: '#cdbf9f', border: `6px solid ${INK}` });
  const glass = box(vit, 290, 470, 500, 450, { border: `7px solid ${INK}`, background: 'rgba(210,235,235,.28)', overflow: 'hidden', zIndex: 3 });
  const gj = mk(vit, [330, 560, 420, 357], gjermInner(), '0 0 400 340', 'gj'); gj.d.style.zIndex = 2;
  const shine = box(glass, 0, -40, 160, 560, { background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)', transform: 'skewX(-18deg)' });
  box(glass, 30, 20, 30, 400, { background: 'rgba(255,255,255,.35)', transform: 'skewX(-12deg)' });
  const plq = el('div', vit, { left: '360px', top: '980px', width: '360px', textAlign: 'center', background: BRASS, border: `4px solid ${INK}`, borderRadius: '8px', fontFamily: 'Playfair', fontWeight: 800, fontSize: '30px', color: INK, padding: '8px 0', zIndex: 4 }, 'Casco de Gjermundbu');
  const ch1 = chip(c, 330, 1075, 'prácticamente el único', { size: 36, z: 30 });
  const ch2 = chip(c, 420, 1150, 'casi completo', { size: 36, bg: INK, color: YEL, z: 30 });
  const badge = box(c, 740, 420, 200, 200, { borderRadius: '50%', background: YEL, border: `7px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, zIndex: 31, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '186px', color: INK }, '1');
}

/* ======================================================================
   D2 · NORUEGA, 1943 (14.72 – 17.3)  L3b
   ====================================================================== */
headline(14.72, 17.3, 'En *Noruega*…', { size: 92, hlT: 15.23 });
{
  const c = scene(14.72, 17.3, t => {
    const km = p(t, 14.75, 0.5, E.outBack); set(mp.d, { s: lerp(0.6, 1, km), r: lerp(-8, -2, km), o: clamp(km * 2) });
    const kp = p(t, 15.23, 0.5, E.outBounce); set(pin, { y: (1 - kp) * -300, o: t < 15.23 ? 0 : 1 });
    const yr = Math.round(counter(t, 15.69, 1.5, 1900, 1943));
    year.textContent = t < 15.69 ? '' : String(yr); set(year, { s: t > 17.2 ? 1 : 1 + 0.04 * Math.sin(t * 20) * (t < 17.2 ? 1 : 0), o: t < 15.69 ? 0 : 1 });
    popA(gjs.d, t, 16.75, { r: -6 }); popA(ch, t, 16.9, { r: -3 });
  });
  const mp = mk(c, [60, 400, 520, 563], norwayInner(), '0 0 720 780', 'map');
  el('div', c, { left: '300px', top: '560px', fontFamily: 'Rye', fontSize: '34px', color: INK, zIndex: 5, opacity: .7 }, '');
  const pin = box(c, 144, 790, 60, 84, { zIndex: 8 }); pin.innerHTML = `<svg viewBox="0 0 60 84" width="60" height="84" style="overflow:visible"><path d="M30,82 C18,60 4,44 4,28 A26,26 0 0,1 56,28 C56,44 42,60 30,82 Z" fill="${PINK}" stroke="${INK}" stroke-width="5"/><circle cx="30" cy="28" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
  const gjs = mk(c, [210, 840, 150, 128], gjermInner(), '0 0 400 340', 'gj'); gjs.d.style.zIndex = 7;
  const year = el('div', c, { left: '500px', top: '470px', width: '460px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '172px', lineHeight: 1, color: INK, textShadow: `8px 8px 0 ${YEL}, 12px 12px 0 ${INK}`, zIndex: 6 }, '');
  const ch = chip(c, 560, 720, 'Noruega · 1943', { size: 42, bg: INK, color: YEL });
}

/* ======================================================================
   D3 · REDONDO, CON PROTECCIÓN PARA LOS OJOS, SIN CUERNOS (17.3 – 21.0)  L3c
   ====================================================================== */
headline(17.3, 19.62, '*Redondo*, con protección para los ojos', { size: 70, hlT: 17.34 });
headline(19.62, 21.0, 'Ni rastro de *cuernos*', { size: 90, hlT: 20.27 });
{
  const c = scene(17.3, 21.0, t => {
    set(cam, { s: 1 + 0.05 * p(t, 17.3, 3.7, E.linear) });
    circ.style.strokeDashoffset = (1 - p(t, 17.34, 0.55, E.inOutCubic)).toFixed(3);
    popA(cR, t, 17.6, { r: -4 });
    const ka = p(t, 18.06, 0.35, E.outBack); set(arw, { s: ka, o: t < 18.06 ? 0 : 1 });
    popA(cE, t, 18.1, { r: 2 });
    const pe = t > 18.5; peep.style.opacity = pe ? 1 : 0;
    peepP.setAttribute('transform', `translate(${f1(Math.sin(t * 2.2) * 5)} 0)`);
    if (pe && ((t % 2.1) < 0.12)) peep.style.opacity = 0.2;
    ghosts.forEach((g, i) => { set(g, { o: t < 19.64 ? 0 : 0.85, s: 1 + 0.03 * Math.sin(t * 6 + i) }); });
    xs.forEach((x, i) => { const k = p(t, 20.27 + i * 0.12, 0.2, E.outBack); set(x, { s: lerp(2, 1, k), o: t < 20.27 + i * 0.12 ? 0 : 1, r: -4 }); });
    const km = p(t, 19.64, 0.6, E.inOutCubic); set(lens, { x: lerp(-200, 560, km), y: Math.sin(km * 6) * 30, o: t > 19.62 && t < 20.4 ? 1 : 0 });
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 760px' });
  box(cam, 90, 420, 900, 900, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.55), rgba(255,255,255,0) 65%)' });
  const gj = mk(cam, [140, 470, 800, 680], gjermInner(), '0 0 400 340', 'gj');
  const peep = gj.d.querySelector('.peep'), peepP = peep.querySelector('.pup');
  const ov = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  ov.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><ellipse class="circ" cx="540" cy="760" rx="330" ry="250" pathLength="1" stroke-dasharray="1" stroke="${PINK}" stroke-width="12" fill="none" stroke-linecap="round" transform="rotate(-6 540 760)"/></svg>`;
  const circ = ov.querySelector('.circ');
  const cR = chip(c, 640, 440, 'redondo ✓', { size: 44 });
  const arw = box(c, 600, 1060, 200, 120, { zIndex: 25, transformOrigin: '20% 80%' }); arw.innerHTML = arrowSvg('M150,100 Q120,30 40,10', PINK, 10);
  const cE = chip(c, 330, 1180, 'protección para los ojos ✓', { size: 40, bg: INK, color: YEL });
  const ghosts = [], xs = [];
  [[150, 270, false], [630, 270, true]].forEach(q => {
    const g = box(c, q[0], q[1], 300, 415, { zIndex: 6, transform: q[2] ? 'scaleX(-1)' : '' });
    g.innerHTML = `<svg viewBox="30 30 130 180" width="300" height="415" style="overflow:visible"><path d="${HORN_D}" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="3" stroke-dasharray="8 7"/></svg>`;
    const gw = box(c, q[0], q[1], 300, 415, { zIndex: 6 }); gw.appendChild(g); g.style.left = '0'; g.style.top = '0';
    ghosts.push(gw);
    xs.push(box(c, q[0] + 50, q[1] + 60, 200, 200, { zIndex: 7 }, XSVG));
  });
  const lens = box(c, 0, 520, 300, 420, { zIndex: 9 }); lens.innerHTML = `<svg viewBox="0 0 300 420" width="300" height="420" style="overflow:visible"><path d="M190,250 L270,400" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M190,250 L270,400" stroke="${WOOD}" stroke-width="22" stroke-linecap="round"/><circle cx="130" cy="140" r="120" fill="rgba(200,230,255,.25)" stroke="${INK}" stroke-width="16"/><circle cx="130" cy="140" r="120" fill="none" stroke="${BRASS}" stroke-width="8"/><path d="M60,100 q20,-40 60,-50" stroke="#fff" stroke-width="10" fill="none" opacity=".7" stroke-linecap="round"/></svg>`;
}

/* ======================================================================
   E · EN UNA PELEA, LOS CUERNOS SON UN ESTORBO (21.0 – 25.72)  L4
   ====================================================================== */
headline(21.0, 22.28, 'Y tiene *sentido*', { size: 92, hlT: 21.48 });
headline(22.28, 25.72, 'En una *pelea*… ¡un *estorbo*!', { size: 84 });
{
  const VS = 620 / 420; // escala del héroe
  const c = scene(21.0, 25.72, t => {
    const grab = p(t, 23.15, 0.25, E.outBack), snag = p(t, 23.3, 0.3, E.outBack);
    const strug = t > 23.2 ? Math.sin(t * 13) * (t > 24.3 ? 7 : 4) : 0;
    const tilt = 9 * grab + strug;
    hero.head.setAttribute('transform', `rotate(${f1(tilt)} 210 300)`);
    set(hero.d, { x: Math.sin(t * 2) * 4 + (t > 24.3 ? shake(t, 24.3, 0.5, 10) : 0), y: wobble(t, 0.6, 3) });
    face(hero, t, { look: t < 22.3 ? [4, 0] : t < 23.2 ? [6, -2] : [-3, -5], bL: t > 23.2 ? 14 : 0, bR: t > 23.2 ? 6 : 0, jaw: t > 23.2 ? 0.45 + 0.15 * Math.sin(t * 13) : 0, seed: 1.1 });
    // enemigo entra
    const ke = p(t, 22.31, 0.4, E.outBack); set(enW, { x: (1 - ke) * 600, o: t < 22.31 ? 0 : 1 });
    face(en, t, { look: [-5, -2], jaw: t > 23.2 ? 0.3 : 0, bL: -4, bR: -4, seed: 2.2 });
    // puño en el cuerno derecho: punta (358,44) girada con la cabeza
    const a = tilt * Math.PI / 180, ox = 210, oy = 300, hx = 358, hy = 60;
    const rx = ox + (hx - ox) * Math.cos(a) - (hy - oy) * Math.sin(a), ry = oy + (hx - ox) * Math.sin(a) + (hy - oy) * Math.cos(a);
    const sx = 230 + rx * VS, sy = 470 + ry * VS + wobble(t, 0.6, 3);
    const fx = lerp(1040, sx, grab), fy = lerp(560, sy, grab);
    arm.setAttribute('d', `M1120,${f1(fy + 160)} Q${f1((fx + 1120) / 2 + 40)},${f1(fy + 120)} ${f1(fx + 20)},${f1(fy + 20)}`);
    set(fist, { x: fx - 50, y: fy - 40, o: t < 22.31 ? 0 : 1, r: -20 });
    // cuerda enganchada en el cuerno izquierdo (62,44)
    const lx0 = 62, ly0 = 60;
    const lx = ox + (lx0 - ox) * Math.cos(a) - (ly0 - oy) * Math.sin(a), ly = oy + (lx0 - ox) * Math.sin(a) + (ly0 - oy) * Math.cos(a);
    const qx = 230 + lx * VS, qy = 470 + ly * VS;
    const midX = lerp(380, qx, snag), midY = lerp(500, qy + 6, snag) + (t < 23.3 ? Math.sin(t * 3) * 6 : 0);
    rope.setAttribute('d', `M-20,470 Q${f1((midX - 20) / 2)},${f1(midY + 20)} ${f1(midX)},${f1(midY)} Q${f1((midX + 760) / 2)},${f1(midY + 10)} 1100,480`);
    rope2.setAttribute('d', rope.getAttribute('d'));
    popA(cRope, t, 23.35, { r: -6 }); popA(cGrab, t, 23.55, { r: 5 });
    stampA(st, t, 24.3, -9);
    set(drops, { o: t > 23.4 ? 1 : 0, y: t > 23.4 ? ((t - 23.4) * 40) % 30 : 0 });
    lines.forEach((l, i) => set(l, { x: -((t * 900 + i * 230) % 1300) + 1100, o: t > 22.31 ? 0.5 : 0 }));
  }, { clip: true });
  const lines = []; for (let i = 0; i < 6; i++) lines.push(box(c, 0, 520 + i * 120, 260, 8, { background: INK, borderRadius: '4px', opacity: .5 }));
  const ropeL = box(c, 0, 0, 1080, 1920, { zIndex: 6 }); ropeL.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="r1" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><path class="r2" stroke="#d8b878" stroke-width="9" fill="none" stroke-dasharray="10 8" stroke-linecap="round"/></svg>`;
  const rope = ropeL.querySelector('.r1'), rope2 = ropeL.querySelector('.r2');
  const hero = mkVik(c, [230, 470, 620, 827], { horns: true, axe: false, seed: 35 }); hero.d.style.zIndex = 4;
  const enW = box(c, 0, 0, 1080, 1920, { zIndex: 3 });
  const enIn = box(enW, 700, 640, 520, 693, { transform: 'scaleX(-1)' });
  const en = mk(enIn, [0, 0, 520, 693], vikingInner({ horns: false, axe: false, seed: 36 }), '0 0 420 560', 'vik');
  const armL = box(c, 0, 0, 1080, 1920, { zIndex: 7 }); armL.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="arm" stroke="${INK}" stroke-width="74" fill="none" stroke-linecap="round"/><path class="arm2" stroke="#6b4a2a" stroke-width="62" fill="none" stroke-linecap="round"/></svg>`;
  const arm = armL.querySelector('.arm'), arm2 = armL.querySelector('.arm2');
  const _set = arm.setAttribute.bind(arm); arm.setAttribute = (k, v) => { _set(k, v); if (k === 'd') arm2.setAttribute('d', v); };
  const fist = box(c, 0, 0, 120, 100, { zIndex: 8, transform: 'scale(1.4)' }); fist.innerHTML = `<svg viewBox="-60 -50 120 100" width="120" height="100" style="overflow:visible">${cut('<ellipse cx="0" cy="0" rx="50" ry="40"/>', 4, 5)}<ellipse cx="0" cy="0" rx="50" ry="40" fill="${FIG}" stroke="${INK}" stroke-width="4"/><path d="M-30,-22 v40 M-8,-30 v50 M14,-28 v48 M34,-18 v34" stroke="${INK}" stroke-width="3"/><ellipse cx="10" cy="8" rx="34" ry="26" fill="url(#hA)"/></svg>`;
  const drops = box(c, 330, 600, 80, 80, { zIndex: 9 }); drops.innerHTML = `<svg viewBox="0 0 50 70" width="44" height="62"><path d="M25,2 C10,30 4,44 4,52 A21,21 0 0,0 46,52 C46,44 40,30 25,2 Z" fill="#9fd6ff" stroke="${INK}" stroke-width="4"/></svg>`;
  const cRope = chip(c, 60, 560, '¡enganchado!', { size: 36, bg: '#fff', color: INK });
  const cGrab = chip(c, 640, 400, '¡agarrado!', { size: 36, bg: '#fff', color: INK });
  const st = stamp(c, 230, 1040, '¡ESTORBO!', { size: 120, bw: 14, z: 40, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
}

/* ======================================================================
   F1 · ¿ENTONCES DE DÓNDE SALEN? (25.72 – 27.15)  L5a
   ====================================================================== */
headline(25.72, 27.15, '¿Entonces de dónde *salen*?', { size: 84, hlT: 26.55 });
{
  const c = scene(25.72, 27.15, t => {
    hs.forEach((h, i) => set(h, { r: t * (i ? 260 : -240), x: Math.sin(t * 2 + i) * 20, y: Math.cos(t * 2.4 + i) * 16, s: pop(t, 25.75 + i * 0.12, 0.4) }));
    const kq = pop(t, 26.0, 0.45); set(q, { s: kq, r: 8 + wobble(t, 1, 4), o: t < 26 ? 0 : 1 });
  });
  const hs = [box(c, 560, 420, 180, 250, { zIndex: 4 }, hornSvg()), box(c, 760, 680, 160, 222, { zIndex: 4, transform: 'scaleX(-1)' })];
  hs[1].innerHTML = `<div style="width:100%;height:100%;transform:scaleX(-1)">${hornSvg()}</div>`;
  const q = el('div', c, { left: '520px', top: '620px', width: '420px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '520px', lineHeight: 1, color: PINK, textShadow: `10px 10px 0 ${INK}`, zIndex: 3 }, '?');
}

/* ======================================================================
   F2 · 1876 · ALEMANIA (27.15 – 31.25)  L5b
   ====================================================================== */
{
  const c = scene(27.15, 31.25, t => {
    const yr = Math.round(counter(t, 27.24, 2.4, 1800, 1876, E.outCubic));
    yE.textContent = String(yr); set(yE, { s: t > 29.3 ? 1 + 0.06 * (1 - p(t, 29.3, 0.4)) : 1, o: 1 });
    yE.style.textShadow = `6px 6px 0 ${PINK}, 10px 10px 0 ${INK}` + (glitch(t, 29.3, 0.25) ? ',' + glitch(t, 29.3, 0.25) : '');
    const kh = p(t, 29.98, 0.6, E.outBack); set(house.d, { y: (1 - kh) * 700, o: t < 29.98 ? 0 : 1 });
    popA(ch, t, 30.0, { r: -3 });
    const push = p(t, 30.85, 0.4, E.inCubic); set(cam, { s: 1 + push * 1.6, o: 1 - push * 0.3 });
    stars.forEach((s, i) => set(s, { o: 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i)) }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '600px 1100px' });
  sceneBg(cam, { background: '#1d1510' });
  box(cam, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 35%, rgba(255,210,120,.25), rgba(0,0,0,0) 60%)' });
  const stars = []; const r = rng(18); for (let i = 0; i < 26; i++) stars.push(el('div', cam, { left: px(60 + r() * 940), top: px(180 + r() * 600), fontSize: px(18 + r() * 20), color: PAPER }, '✦'));
  const yE = el('div', cam, { left: '0', top: '360px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '260px', lineHeight: 1, color: YEL, zIndex: 5 }, '1800');
  const house = mk(cam, [300, 860, 640, 460], operaHouseInner(), '0 0 640 460', 'oh');
  const ch = chip(c, 380, 700, 'Alemania', { size: 56, bg: PINK });
}
function operaHouseInner() {
  const id = uid('oh');
  const body = 'M30,170 L610,170 L610,440 L30,440 Z', ped = 'M10,176 L320,40 L630,176 Z', steps = 'M0,440 L640,440 L640,460 L0,460 Z';
  let s = cut(P(body) + P(ped) + P(steps) + '<path d="M250,40 C250,-20 390,-20 390,40 Z"/>');
  s += D('M250,46 C250,-14 390,-14 390,46 Z', '#9aa38a') + HF('M250,46 C250,-14 390,-14 390,46 Z', 'hA');
  s += D(body, '#e8dcc0') + clipG(id + 'b', body, `<rect x="420" y="160" width="200" height="290" fill="url(#hA)"/>`);
  s += D(ped, '#efe4ca') + HF(ped, 'hB') + `<circle cx="320" cy="122" r="26" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M308,122 h24 M320,110 v24" stroke="${INK}" stroke-width="2.5"/>`;
  for (let k = 0; k < 7; k++) { const x = 60 + k * 86; s += `<rect x="${x}" y="196" width="34" height="230" fill="#f4ecdb" stroke="${INK}" stroke-width="3"/><path d="M${x + 10},200 v222 M${x + 22},200 v222" stroke="${INK}" stroke-width="1.5"/><rect x="${x - 6}" y="186" width="46" height="14" fill="#e8dcc0" stroke="${INK}" stroke-width="3"/>`; }
  for (let k = 0; k < 6; k++) { const x = 104 + k * 86; s += `<path d="M${x},420 V300 Q${x + 21},270 ${x + 42},300 V420 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M${x},420 V300 Q${x + 21},270 ${x + 42},300 V420 Z" fill="rgba(255,220,120,.55)"/>`; }
  s += D(steps, '#cdbf9f') + `<path d="M0,450 H640" stroke="${INK}" stroke-width="2"/>`;
  return s;
}

/* ======================================================================
   F3 · WAGNER ESTRENA SU CICLO (31.25 – 35.62)  L5c — + cameo del emú en el público
   ====================================================================== */
headline(31.25, 33.9, 'Wagner estrena su gran *ciclo de óperas*', { size: 72, color: PAPER, keyColor: YEL, hlc: 'transparent', hlT: 33.04, shadow: `4px 4px 0 ${INK}` });
headline(33.9, 35.62, 'sobre *dioses y héroes* nórdicos', { size: 78, color: PAPER, keyColor: YEL, hlc: 'transparent', hlT: 33.96, shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(31.25, 35.62, t => {
    set(cam, { s: 1 + 0.04 * p(t, 31.25, 4.3, E.linear) });
    const kp = p(t, 31.32, 0.45, E.outBack); set(post.wrap, { s: kp, r: -5, o: t < 31.32 ? 0 : 1 });
    [god, hero].forEach((f, i) => { if (f.mouth) f.mouth.setAttribute('transform', `translate(150 212) scale(1 ${f1(0.5 + 0.7 * Math.abs(Math.sin(t * (7 + i))))}) translate(-150 -212)`); set(f.d, { y: wobble(t, 0.8, 4, i) }); });
    popA(cD, t, 33.96, { r: -4 }); popA(cH, t, 34.48, { r: 4 });
    // cameo del emú (≈0,6 s mirando a cámara)
    const ke = p(t, 32.75, 0.25, E.outBack) * (1 - p(t, 33.75, 0.2, E.inCubic));
    set(emu.d, { y: (1 - ke) * 300, o: t > 32.7 && t < 34.0 ? 1 : 0, s: t > 33.05 && t < 33.65 ? 1 + 0.06 * p(t, 33.05, 0.2) : 1 });
    face(emu, t, { half: !(t > 33.05 && t < 33.65), blink: false, bR: t > 33.15 && t < 33.65 ? 20 : 0, jaw: 0 });
    emu.pup.forEach(q => q.setAttribute('transform', t > 33.05 && t < 33.65 ? 'translate(0 2)' : 'translate(-10 -8)'));
    heads.forEach((h, i) => set(h, { y: Math.sin(t * 3 + i) * 3 }));
  }, { clip: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  sceneBg(cam, { background: '#1d1510' });
  box(cam, 60, 420, 960, 640, { background: 'linear-gradient(#6d86a3, #c9b48a)', border: `8px solid ${INK}` });
  box(cam, 60, 420, 960, 640, {}).innerHTML = `<svg width="960" height="640"><path d="M0,470 L140,300 L260,420 L420,220 L560,400 L700,260 L860,420 L960,330 L960,640 L0,640 Z" fill="#8a8a7a" stroke="${INK}" stroke-width="5"/><path d="M0,470 L140,300 L260,420 L420,220 L560,400 L700,260 L860,420 L960,330 L960,640 L0,640 Z" fill="url(#hA)"/><path d="M380,270 L420,220 L460,270 L440,262 L420,280 L400,262 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="800" cy="120" r="56" fill="${YEL}" stroke="${INK}" stroke-width="4" opacity=".8"/><rect x="0" y="560" width="960" height="80" fill="#6b4423" stroke="${INK}" stroke-width="5"/></svg>`;
  const god = mk(cam, [380, 560, 220, 469], singerInner({ weapon: 'spear', raise: true, seed: 7 }), '0 0 300 640', 'sng'); god.mouth = god.d.querySelector('.mouth');
  const hero = mk(cam, [630, 590, 210, 448], singerInner({ weapon: 'sword', shield: true, beard: false, seed: 8, capeCol: '#2f4a6a' }), '0 0 300 640', 'sng'); hero.mouth = hero.d.querySelector('.mouth');
  const cl = box(cam, 30, 400, 190, 680, { zIndex: 5 }); cl.innerHTML = curtainHTML(190, 680);
  const cr = box(cam, 860, 400, 190, 680, { zIndex: 5 }); cr.innerHTML = curtainHTML(190, 680, true);
  box(cam, 20, 380, 1040, 60, { background: CURT, border: `6px solid ${INK}`, zIndex: 6, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0 8px, transparent 8px 40px)' });
  const emu = mk(cam, [600, 820, 300, 450], emuFrontInner() + emuHelm, '0 0 400 600', 'emuF'); emu.d.style.zIndex = 7;
  const heads = []; const hr = rng(44);
  const aud = box(cam, 0, 0, 1080, 1920, { zIndex: 8 });
  for (let i = 0; i < 9; i++) { const x = -20 + i * 128 + hr() * 20, y = 1010 + (i % 2) * 24; const h = box(aud, x, y, 160, 260); h.innerHTML = `<svg viewBox="0 0 160 260" width="160" height="260"><ellipse cx="80" cy="70" rx="52" ry="60" fill="#120c08"/><path d="M0,260 C0,160 40,130 80,130 C120,130 160,160 160,260 Z" fill="#120c08"/>${i % 3 === 1 ? '<path d="M24,40 Q80,-20 136,40 Z" fill="#120c08"/>' : ''}</svg>`; heads.push(h); }
  const post = paperPiece(c, 60, 470, 300, 420, { seed: 33, bg: '#F7F0E0' }); post.wrap.style.zIndex = 20;
  post.inner.innerHTML += `<div style="position:absolute;left:0;top:30px;width:282px;text-align:center;font-family:Rye;font-size:54px;color:${RED}">WAGNER</div><div style="position:absolute;left:14px;top:104px;width:254px;height:4px;background:${INK}"></div><div style="position:absolute;left:0;top:124px;width:282px;text-align:center;font-family:Playfair;font-style:italic;font-weight:800;font-size:38px;line-height:1.05;color:${INK}">El anillo<br>del nibelungo</div><div style="position:absolute;left:0;top:250px;width:282px;text-align:center;font-family:Rye;font-size:60px;color:${INK}">1876</div><div style="position:absolute;left:30px;top:336px;width:222px;text-align:center;font-family:SpecialElite;font-size:22px;color:#5a4a3a">— estreno —</div>`;
  const cD = chip(c, 380, 520, 'dioses', { size: 42 });
  const cH = chip(c, 680, 540, 'héroes', { size: 42 });
}

/* ======================================================================
   G1 · CARL EMIL DOEPLER, DISEÑADOR DE VESTUARIO (35.62 – 38.95)  L6a
   ====================================================================== */
headline(35.62, 38.95, 'El diseñador de *vestuario*', { size: 84, hlT: 36.45 });
{
  const c = scene(35.62, 38.95, t => {
    set(dp.d, { y: wobble(t, 0.5, 3) });
    face(dp, t, { look: t < 37.2 ? [-4, 2] : [0, 0], seed: 0.7, brow: t > 37.2 && t < 38.0 ? -6 : 0 });
    popA(cV, t, 36.45, { r: -3 }); popA(cN.wrapper || cN, t, 37.23, { r: 2 });
    sk.forEach((s, i) => set(s.wrap, { r: [-6, 5, -3][i] + wobble(t, 0.6, 1.5, i), s: pop(t, 35.7 + i * 0.15, 0.4), o: 1 }));
    set(pen, { x: Math.sin(t * 6) * 10, y: Math.cos(t * 9) * 6, r: -30 + Math.sin(t * 6) * 6 });
  });
  const sk = [];
  [[70, 470, 190, 250], [250, 560, 180, 240], [90, 760, 200, 270]].forEach((q, i) => {
    const pp = paperPiece(c, q[0], q[1], q[2], q[3], { seed: 50 + i, bg: '#FBF6EA' });
    pp.inner.innerHTML += `<svg viewBox="0 0 600 700" width="${q[2] - 18}" height="${q[3] - 18}" style="position:absolute;left:0;top:0">${sketchFig(i !== 1)}</svg>`;
    sk.push(pp);
  });
  const dp = mk(c, [470, 520, 480, 613], doeplerInner(), '0 0 360 460', 'bust');
  const pen = box(c, 360, 900, 60, 300, { zIndex: 6, transformOrigin: '30px 0px' }, pencilSvg);
  const cV = chip(c, 520, 1230, 'diseñador de vestuario', { size: 34, bg: '#fff', color: INK });
  const cN = chip(c, 400, 1150, 'Carl Emil Doepler', { size: 46, bg: INK, color: YEL });
}

/* ======================================================================
   G2 · ...LES PONE CUERNOS (38.95 – 40.02)  L6b — el lápiz dibuja los cuernos
   ====================================================================== */
headline(38.95, 40.02, '…les pone *cuernos*', { size: 96, hlT: 39.28 });
{
  const c = scene(38.95, 40.02, t => {
    const segs = [[39.1, 39.3], [39.3, 39.44], [39.46, 39.66], [39.66, 39.84]];
    let tip = null;
    hp.forEach((h, i) => { const k = clamp((t - segs[i][0]) / (segs[i][1] - segs[i][0])); h.style.strokeDashoffset = f1((1 - k) * 1000) / 1000; if (k > 0 && k < 1) { const L = h.getTotalLength(); const pt = h.getPointAtLength(L * k); tip = [pt.x, pt.y]; } });
    if (!tip) tip = t < 39.1 ? [240, 170] : [356, 140];
    const sc = (800 - 18) / 600;
    set(pen, { x: 140 + 9 + tip[0] * sc - 30, y: 400 + 9 + tip[1] * sc, r: 24 });
    set(av.d, { y: wobble(t, 0.7, 3) }); face(av, t, { look: [-5, 3], seed: 2 });
  }, { clip: true });
  const pp = paperPiece(c, 140, 400, 800, 900, { seed: 61, bg: '#FBF6EA' });
  box(pp.inner, 0, 0, 782, 882, { backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 2px, transparent 2px 40px)' });
  pp.inner.innerHTML += `<svg viewBox="0 0 600 690" width="782" height="900" style="position:absolute;left:0;top:0;overflow:visible">${sketchFig(true, 'skh')}</svg><div style="position:absolute;right:26px;bottom:20px;font-family:SpecialElite;font-size:30px;color:#5a4a3a">figurín · 1876</div>`;
  const hp = [...pp.inner.querySelectorAll('.skh')]; hp.forEach(h => { h.style.strokeDasharray = '1'; h.style.strokeDashoffset = '1'; });
  const pen = box(c, 0, 0, 60, 300, { zIndex: 6, transformOrigin: '30px 0px' }, pencilSvg);
  const avw = box(c, 700, 1040, 220, 280, { zIndex: 7 });
  const av = mk(avw, [0, 0, 220, 281], doeplerInner(), '0 0 360 460', 'bust');
}

/* ======================================================================
   G3 · EN EL ESCENARIO (40.02 – 41.72)  L6c — cantantes con cuernos y alas bajo el foco
   ====================================================================== */
headline(40.02, 41.72, 'En el *escenario*…', { size: 92, color: PAPER, keyColor: YEL, hlc: 'transparent', hlT: 40.71, shadow: `4px 4px 0 ${INK}` });
{
  const c = scene(40.02, 41.72, t => {
    S.forEach((f, i) => { const k = pop(t, f.t, 0.4); set(f.d, { s: k, o: t < f.t ? 0 : 1, y: wobble(t, 0.9, 4, i) }); if (f.mouth) f.mouth.setAttribute('transform', `translate(150 212) scale(1 ${f1(0.6 + 0.6 * Math.abs(Math.sin(t * (8 + i))))}) translate(-150 -212)`); });
    set(spotL, { x: Math.sin(t * 1.5) * 60, o: 0.9 });
  }, { clip: true });
  sceneBg(c, { background: '#1d1510' });
  const spotL = box(c, 0, 0, 1080, 1920, { zIndex: 1 }); spotL.innerHTML = `<svg width="1080" height="1920"><path d="M440,330 L640,330 L1000,1180 L80,1180 Z" fill="rgba(255,240,170,.25)"/><ellipse cx="540" cy="1170" rx="430" ry="80" fill="rgba(255,240,170,.4)"/></svg>`;
  box(c, 0, 1170, 1080, 750, { background: '#5a3a1e', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0 4px, transparent 4px 90px)' });
  const S = [];
  [[250, 660, 'spear', { horns: true, wings: true, raise: true }, 40.09], [480, 620, 'none', { horns: true, wings: true }, 40.71], [710, 660, 'sword', { horns: true, shield: true, beard: false }, 41.19]].forEach((q, i) => {
    const f = mk(c, [q[0], q[1], 230, 491], singerInner(Object.assign({ weapon: q[2], seed: 70 + i }, q[3])), '0 0 300 640', 'sng'); f.mouth = f.d.querySelector('.mouth'); f.t = q[4]; f.d.style.zIndex = 3; f.d.style.transformOrigin = '50% 100%'; S.push(f);
  });
}
colorHit(41.72, 43.35, YEL, c => {
  const sil = [];
  [[60, 760, 'spear', { horns: true, wings: true, raise: true }], [380, 700, 'none', { horns: true, wings: true }], [700, 760, 'sword', { horns: true, shield: true, beard: false }]].forEach((q, i) => {
    const f = mk(c, [q[0], q[1], 300, 640], singerInner(Object.assign({ weapon: q[2], seed: 80 + i }, q[3])), '0 0 300 640', 'sng'); f.d.style.filter = SIL; f.d.style.zIndex = 3; f.d.style.transformOrigin = '50% 100%'; sil.push(f);
  });
  const t1 = el('div', c, { left: '0', top: '250px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '92px', lineHeight: 1, color: INK, zIndex: 4 }, '¡ESPECTACULARES!');
  const t2 = el('div', c, { left: '0', top: '380px', width: '1080px', textAlign: 'center', fontFamily: 'Rye', fontSize: '54px', color: RED, zIndex: 4 }, 'cuernos… ¡y alas!');
  const sp = []; for (let i = 0; i < 6; i++) sp.push(el('div', c, { left: px(100 + i * 160), top: px(560 + (i % 2) * 90), fontSize: '64px', color: '#fff', textShadow: `3px 3px 0 ${INK}`, zIndex: 5 }, '✦'));
  return t => {
    sil.forEach((f, i) => set(f.d, { s: 1 + 0.05 * Math.sin(t * 8 + i), r: Math.sin(t * 4 + i) * 3, y: -Math.abs(Math.sin(t * 5 + i)) * 20 }));
    set(t1, { s: lerp(1.35, 1, p(t, 41.72, 0.22)), o: 1 }); t1.style.textShadow = glitch(t, 41.75, 0.3) || '5px 5px 0 #fff';
    popA(t2, t, 42.3, { r: -3 });
    sp.forEach((s, i) => set(s, { s: 0.6 + 0.6 * Math.abs(Math.sin(t * 5 + i)), r: t * 120 }));
  };
});

/* ======================================================================
   H · CÓMICS, PELÍCULAS, FÚTBOL AMERICANO… TODOS CON CUERNOS (43.35 – 49.38)  L7
   ====================================================================== */
headline(43.35, 44.4, 'Funcionó *tan bien*…', { size: 92, hlT: 43.76 });
headline(44.4, 49.38, 'Desde entonces… todos con *cuernos*', { size: 76, hlT: 48.54 });
{
  const c = scene(43.35, 49.38, t => {
    // boceto original que se encoge a la esquina
    const ks = p(t, 44.3, 0.45, E.inOutCubic);
    set(skP.wrap, { x: lerp(0, -170, ks), y: lerp(0, -40, ks), s: lerp(1, 0.55, ks) * pop(t, 43.4, 0.4), r: lerp(-3, -8, ks), o: 1 });
    stampA(ok, t, 43.9, -12, 1); if (t > 44.3) ok.style.opacity = 1 - ks;
    const items = [[cm, 45.06, -4], [po, 45.59, 3], [fb.d, 46.35, -2]];
    items.forEach(([e, t0, r], i) => { const k = p(t, t0, 0.45, E.outBack); const jump = t > 48.17 ? -Math.abs(Math.sin((t - 48.17 - i * 0.12) * 9)) * 26 * (1 - p(t, 49.0, 0.3)) : 0; set(e, { y: (1 - k) * -900 + jump, r: r + (1 - k) * 20, o: t < t0 ? 0 : 1 }); });
    popA(c1, t, 45.25, { r: -5 }); popA(c2, t, 45.8, { r: 4 }); popA(c3, t, 46.8, { r: -3 });
    stampA(all, t, 48.54, -8);
    arws.forEach((a, i) => set(a, { o: t > 48.17 ? 1 : 0, s: pop(t, 48.17 + i * 0.1, 0.35) }));
    if (cmV) face(cmV, t, { jaw: Math.abs(Math.sin(t * 9)) * 0.5, seed: 3 });
  }, { clip: true });
  const skP = paperPiece(c, 330, 440, 420, 500, { seed: 81, bg: '#FBF6EA' });
  skP.inner.innerHTML += `<svg viewBox="0 0 600 700" width="402" height="482" style="position:absolute;left:0;top:0">${sketchFig(true, 'x')}</svg><div style="position:absolute;right:16px;bottom:10px;font-family:SpecialElite;font-size:24px;color:#5a4a3a">Doepler · 1876</div>`;
  const ok = stamp(c, 360, 860, '¡ÉXITO!', { size: 84, bw: 10, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  // cómic
  const cm = box(c, 60, 560, 440, 440, { border: `8px solid ${INK}`, background: YEL, overflow: 'hidden', boxShadow: `10px 10px 0 ${SH}`, zIndex: 10 });
  box(cm, 0, 0, 424, 424, { backgroundImage: `radial-gradient(rgba(200,16,46,.35) 4px, transparent 4.6px)`, backgroundSize: '18px 18px' });
  const cmV = mk(cm, [40, 70, 360, 480], vikingInner({ horns: true, seed: 37 }), '0 0 420 560', 'vik');
  const bub = el('div', cm, { left: '150px', top: '14px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '40px', padding: '6px 22px', fontFamily: 'Rye', fontSize: '50px', color: INK, zIndex: 3 }, '¡GRAAAH!');
  // póster de película
  const po = box(c, 540, 520, 400, 560, { border: `8px solid ${INK}`, background: '#1d1510', overflow: 'hidden', boxShadow: `10px 10px 0 ${SH}`, zIndex: 11 });
  const pr = rays(po, -200, -100, 800, 18, 'rgba(255,62,165,.35)', 'transparent', 0);
  mk(po, [30, 70, 330, 440], vikingInner({ horns: true, seed: 38 }), '0 0 420 560', 'vik');
  el('div', po, { left: 0, top: '420px', width: '384px', textAlign: 'center', fontFamily: 'Rye', fontSize: '62px', color: YEL, textShadow: `4px 4px 0 ${RED}`, zIndex: 3, background: 'rgba(29,21,16,.85)', padding: '6px 0' }, 'VIKINGOS');
  el('div', po, { left: 0, top: '500px', width: '384px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '24px', color: PAPER, zIndex: 3 }, '★ ★ ★ ★ ★');
  // casco de fútbol americano
  const fb = mk(c, [330, 960, 520, 402], fbInner(), '0 0 440 340', 'fb'); fb.d.style.zIndex = 12;
  const c1 = chip(c, 90, 500, 'cómics', { size: 40 });
  const c2 = chip(c, 700, 1095, 'películas', { size: 40 });
  const c3 = chip(c, 500, 1300, 'fútbol americano', { size: 38, bg: INK, color: YEL });
  const arws = [[300, 520, 'M20,10 Q60,60 110,80'], [620, 470, 'M20,10 Q60,60 110,80'], [380, 900, 'M20,10 Q60,60 110,80']].map(q => { const a = box(c, q[0], q[1], 140, 110, { zIndex: 25 }); a.innerHTML = arrowSvg(q[2], PINK, 10); return a; });
  const all = stamp(c, 120, 770, 'TODOS CON CUERNOS', { size: 74, bw: 10, z: 40, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
}

/* ======================================================================
   I1 · ¡OJO! CASCOS CON CUERNOS SÍ EXISTIERON (49.38 – 53.02)  L8a
   ====================================================================== */
headline(49.38, 53.02, 'Cascos con cuernos *sí existieron*', { size: 76, hlT: 51.25 });
{
  const c = scene(49.38, 53.02, t => {
    const k = p(t, 49.42, 0.18, E.outCubic), sh = p(t, 50.15, 0.35, E.inOutCubic);
    set(ojo, { s: t < 49.42 ? 0 : lerp(2.4, 1, k) * lerp(1, 0.5, sh), x: sh * 300, y: sh * -110, r: -8, o: t < 49.42 ? 0 : 1 });
    popA(h1.d, t, 50.41, { r: -4, rise: 200 }); popA(h2.d, t, 50.69, { r: 4, rise: 200 });
    set(h1.d.firstChild, { r: wobble(t, 0.5, 2) }); set(h2.d.firstChild, { r: wobble(t, 0.5, 2, 0.5) });
    popA(cS, t, 51.25, { r: -4 }); popA(cE, t, 52.28, { r: 3 });
    set(glow, { o: t > 50.4 ? 0.9 : 0, r: t * 8 });
  }, { clip: true });
  const glow = rays(c, 40, 380, 1000, 20, 'rgba(255,230,0,.4)', 'transparent', 0); glow.style.transformOrigin = '500px 500px';
  const ojo = stamp(c, 260, 520, '¡OJO!', { size: 190, bw: 16, z: 60, bg: 'rgba(255,255,255,.93)', blend: 'normal' });
  const h1 = mk(c, [80, 560, 440, 462], veksoInner(), '0 0 400 420', 'vx');
  const h2 = mk(c, [540, 540, 440, 462], veksoInner(), '0 0 400 420', 'vx');
  const cS = chip(c, 330, 1020, 'sí existieron ✓', { size: 46, bg: YEL, color: INK });
  const cE = chip(c, 560, 1120, 'Escandinavia', { size: 42 });
}

/* ======================================================================
   I2 · EDAD DEL BRONCE, ≈ 2.000 AÑOS ANTES (53.02 – 56.68)  L8b — línea de tiempo
   ====================================================================== */
headline(53.02, 56.68, 'Pero en la *Edad del Bronce*', { size: 80, hlT: 53.79 });
{
  const c = scene(53.02, 56.68, t => {
    const kl = p(t, 53.1, 0.5, E.outCubic); set(line, { sx: Math.max(0.001, kl), o: 1 });
    popA(vx.d, t, 53.6, { r: -4, rise: 100 }); popA(cB, t, 53.79, { r: -3 });
    popA(vk.d, t, 55.84, { rise: 100 }); popA(cV, t, 55.94, { r: 3 });
    brk.style.strokeDashoffset = f1((1 - p(t, 54.57, 1.2, E.inOutCubic)) * 1000) / 1000;
    const n = counter(t, 54.79, 0.9, 0, 2000); num.textContent = t < 54.75 ? '' : '≈ ' + fmt(Math.round(n / 10) * 10);
    set(numW, { s: t > 55.2 ? 1 + 0.08 * (1 - p(t, 55.2, 0.4)) : 1, o: t < 54.75 ? 0 : 1 });
    popA(cA, t, 55.49, { r: -2 });
    face(vk, t, { look: [-5, 0], bL: t > 56 ? 10 : 0, bR: t > 56 ? 10 : 0, seed: 0.2 });
  });
  const line = box(c, 80, 900, 880, 16, { background: INK, borderRadius: '8px', transformOrigin: '0 50%', zIndex: 2 });
  box(c, 0, 0, 1080, 1920, { zIndex: 2 }).innerHTML = `<svg width="1080" height="1920"><path d="M960,908 l-34,-24 v48 Z" fill="${INK}"/><circle cx="250" cy="908" r="20" fill="${YEL}" stroke="${INK}" stroke-width="6"/><circle cx="790" cy="908" r="20" fill="${PINK}" stroke="${INK}" stroke-width="6"/></svg>`;
  const vx = mk(c, [110, 560, 290, 305], veksoInner(), '0 0 400 420', 'vx');
  const vk = mkVik(c, [650, 520, 280, 373], { horns: false, axe: false, seed: 39 });
  const cB = chip(c, 110, 950, 'Edad del Bronce', { size: 40, bg: BRONZE, color: INK });
  const cV = chip(c, 690, 950, 'vikingos', { size: 40, bg: INK, color: YEL });
  const bL = box(c, 0, 0, 1080, 1920, { zIndex: 3 }); bL.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><path class="brk" d="M790,870 Q520,700 250,870" pathLength="1" stroke-dasharray="1" stroke="${PINK}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
  const brk = bL.querySelector('.brk');
  const numW = box(c, 200, 1040, 680, 140, { zIndex: 5 });
  const num = el('div', numW, { left: 0, top: 0, width: '680px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: 1, color: INK, textShadow: `6px 6px 0 ${YEL}` }, '');
  const cA = chip(c, 400, 1180, 'años antes', { size: 40, bg: '#fff', color: INK });
}

/* ======================================================================
   I3 · CEREMONIALES, NO PARA LA GUERRA (56.68 – 59.18)  L8c
   ====================================================================== */
headline(56.68, 59.18, 'Y eran *ceremoniales*', { size: 88, hlT: 57.17 });
{
  const c = scene(56.68, 59.18, t => {
    set(rr, { r: t * 10, o: 0.8 });
    [h1, h2].forEach((h, i) => set(h.d, { y: wobble(t, 0.5, 6, i * 0.5), r: (i ? 6 : -6) + wobble(t, 0.4, 2, i) }));
    flames.forEach((f, i) => set(f, { sy: 1 + 0.15 * Math.sin(t * 17 + i * 2), sx: 1 + 0.08 * Math.sin(t * 13 + i), r: Math.sin(t * 9 + i) * 5 }));
    popA(cC, t, 57.17, { r: -3 });
    popA(wp, t, 58.11, { r: 0 });
    const kx = p(t, 58.15, 0.2, E.outBack); set(wx, { s: lerp(2, 1, kx), o: t < 58.15 ? 0 : 1 });
    popA(cN, t, 58.3, { r: 3 });
  }, { clip: true });
  sceneBg(c, { background: '#e7d3a8' });
  const rr = rays(c, -60, 260, 1200, 24, 'rgba(201,162,74,.35)', 'transparent', 0); rr.style.transformOrigin = '600px 600px';
  const cush = box(c, 0, 0, 1080, 1920, { zIndex: 2 });
  cush.innerHTML = `<svg width="1080" height="1920"><g>${cut('<path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z"/>')}<path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z" fill="${CURT}" stroke="${INK}" stroke-width="5"/><path d="M250,960 Q540,900 830,960 L850,1060 Q540,1110 230,1060 Z" fill="url(#hD)" opacity=".4"/><path d="M270,975 Q540,925 810,975" stroke="${BRASS}" stroke-width="6" fill="none"/><circle cx="240" cy="1066" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="840" cy="1066" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></g>
  <rect x="210" y="1080" width="660" height="220" fill="#cdbf9f" stroke="${INK}" stroke-width="6"/><rect x="210" y="1080" width="660" height="220" fill="url(#hB)" opacity=".5"/><rect x="190" y="1070" width="700" height="30" fill="#efe4ca" stroke="${INK}" stroke-width="5"/></svg>`;
  const flames = [];
  [100, 900].forEach(x => {
    box(c, x - 26, 900, 52, 260, { background: '#f4ecdb', border: `5px solid ${INK}`, borderRadius: '8px', zIndex: 2, backgroundImage: 'linear-gradient(90deg, transparent 60%, rgba(43,33,24,.2) 60%)' });
    const f = box(c, x - 30, 810, 60, 100, { zIndex: 3, transformOrigin: '30px 100px' }); f.innerHTML = `<svg viewBox="0 0 60 100" width="60" height="100"><path d="M30,4 C46,36 56,56 54,74 A24,24 0 0,1 6,74 C4,56 14,36 30,4 Z" fill="${YEL}" stroke="${INK}" stroke-width="4"/><path d="M30,40 C38,56 42,66 40,76 A10,10 0 0,1 20,76 C18,66 22,56 30,40 Z" fill="#ff8a2a"/></svg>`; flames.push(f);
  });
  const h1 = mk(c, [190, 560, 360, 378], veksoInner(), '0 0 400 420', 'vx'); h1.d.style.zIndex = 3;
  const h2 = mk(c, [530, 560, 360, 378], veksoInner(), '0 0 400 420', 'vx'); h2.d.style.zIndex = 3;
  const cC = chip(c, 340, 1140, 'ceremoniales', { size: 50, bg: YEL, color: INK });
  const wp = box(c, 600, 360, 340, 260, { zIndex: 5 }); wp.innerHTML = `<svg viewBox="0 0 260 200" width="100%" height="100%" style="overflow:visible"><g transform="rotate(-35 130 100)">${cut('<rect x="30" y="88" width="200" height="22" rx="6"/>', 4, 5)}<rect x="30" y="88" width="160" height="22" rx="4" fill="${IRON}" stroke="${INK}" stroke-width="4"/><rect x="186" y="78" width="14" height="42" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><rect x="200" y="90" width="40" height="18" fill="${WOOD}" stroke="${INK}" stroke-width="3"/></g><g transform="rotate(35 130 100)"><rect x="30" y="88" width="200" height="14" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><path d="M30,70 C60,70 70,120 30,124 Z" fill="${IRON}" stroke="${INK}" stroke-width="4"/></g></svg>`;
  const wx = box(c, 710, 430, 120, 120, { zIndex: 6 }, XSVG);
  const cN = chip(c, 580, 640, 'no para la guerra', { size: 36, bg: RED, color: '#fff' });
}

/* ======================================================================
   J1 · LA IMAGEN QUE TIENES DE UN VIKINGO… (59.18 – 62.75)  L9a
   ====================================================================== */
headline(59.18, 62.75, 'La imagen que tienes de un *vikingo*…', { size: 74, hlT: 61.32 });
{
  const c = scene(59.18, 62.75, t => {
    set(vk.d, { y: wobble(t, 0.5, 3) });
    const lookC = t > 61.32;
    face(vk, t, { look: lookC ? [0, 1] : [6, -1], bL: lookC ? 14 : 0, bR: lookC ? 14 : 0, jaw: lookC ? 0.35 : 0, seed: 0.9 });
    vk.head.setAttribute('transform', `rotate(${f1(lookC ? -3 : 4)} 210 300)`);
    const ks = p(t, 59.39, 0.45, E.outBack); set(sk.wrap, { s: ks, r: 6 + wobble(t, 0.6, 2), o: t < 59.39 ? 0 : 1 });
    set(qm, { o: t > 61.5 ? 1 : 0, s: pop(t, 61.5, 0.35), y: Math.sin(t * 5) * 8, r: -10 });
    set(eq, { o: t > 60.28 ? 1 : 0, s: pop(t, 60.28, 0.35) });
  });
  const vk = mkVik(c, [110, 560, 520, 693], { horns: true, seed: 31 });
  const sk = paperPiece(c, 620, 520, 340, 420, { seed: 91, bg: '#FBF6EA' });
  sk.inner.innerHTML += `<svg viewBox="0 0 600 700" width="322" height="380" style="position:absolute;left:0;top:0">${sketchFig(true, 'x')}</svg><div style="position:absolute;right:12px;bottom:6px;font-family:SpecialElite;font-size:22px;color:#5a4a3a">Doepler · 1876</div>`;
  const eq = el('div', c, { left: '560px', top: '640px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: PINK, textShadow: `4px 4px 0 ${INK}`, zIndex: 20 }, '=');
  const qm = el('div', c, { left: '160px', top: '470px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', color: PINK, textShadow: `5px 5px 0 ${INK}`, zIndex: 20 }, '?');
}
colorHit(62.75, 64.95, PINK, c => {
  const dp = mk(c, [540, 640, 440, 562], doeplerInner(), '0 0 360 460', 'bust'); dp.d.style.filter = SIL; dp.d.style.zIndex = 3;
  const th = box(c, 70, 620, 460, 560, { zIndex: 3 });
  th.innerHTML = `<svg viewBox="0 0 460 560" width="460" height="560" style="overflow:visible"><path d="M0,560 V120 Q0,0 230,0 Q460,0 460,120 V560 H400 V150 Q400,60 230,60 Q60,60 60,150 V560 Z" fill="${INK}"/><path d="M60,560 V150 Q60,60 230,60 Q400,60 400,150 V560 Z" fill="rgba(0,0,0,.18)"/></svg>`;
  const vk = mk(c, [140, 760, 320, 427], vikingInner({ horns: true, seed: 31 }), '0 0 420 560', 'vik'); vk.d.style.filter = SIL; vk.d.style.zIndex = 4;
  const pen = box(c, 560, 900, 60, 300, { zIndex: 5, transformOrigin: '30px 0' }, pencilSvg);
  const t1 = el('div', c, { left: '0', top: '210px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '92px', lineHeight: 1.05, color: INK, zIndex: 6 });
  const parts = [['la diseñó', 165, false], ['un', 167, false], ['SEÑOR', 168, true], ['<br>para', 169, false], ['un', 170, false], ['TEATRO', 171, true]];
  const ws = parts.map(q => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; if (q[0].startsWith('<br>')) { t1.appendChild(document.createElement('br')); q[0] = q[0].slice(4); } s.innerHTML = q[2] ? `<span style="font-style:italic;color:#fff;text-shadow:5px 5px 0 ${INK}">${q[0]}</span>` : q[0]; t1.appendChild(s); return { e: s, t: W[q[1]].s }; });
  return t => {
    ws.forEach(q => { const k = p(t, q.t - 0.1, 0.25, E.outBack); set(q.e, { y: (1 - k) * 40, o: t < q.t - 0.1 ? 0 : 1 }); });
    t1.style.textShadow = glitch(t, 62.8, 0.25) || glitch(t, 64.32, 0.3);
    set(dp.d, { y: wobble(t, 0.6, 4), r: Math.sin(t * 2) * 2 });
    set(vk.d, { y: -Math.abs(Math.sin(t * 6)) * 14, r: Math.sin(t * 6) * 4 });
    set(pen, { x: Math.sin(t * 8) * 18, r: -20 + Math.sin(t * 8) * 8 });
  };
});

/* ======================================================================
   K · CTA: ¿QUÉ OTRO MITO DE PELÍCULA? (64.95 – 67.98)  L10 — Vecino a pantalla completa
   ====================================================================== */
headline(64.95, 67.25, '¿Qué otro *mito* de película?', { size: 78, hlT: 65.46 });
headline(67.25, 67.98, 'Os *leo*', { size: 100, hlT: 67.44 });
{
  const CM = [];
  const c = scene(64.95, 67.98, t => {
    set(vec.d, { y: wobble(t, 0.5, 3), s: 1 + 0.03 * p(t, 64.95, 3, E.linear) });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t < 66.4 ? [0, 0] : [-4, 6], bL: t > 65.4 && t < 66.2 ? 10 : 2, bR: t > 65.4 && t < 66.2 ? 14 : 6, fan: wobble(t, 0.9, 6), noCup: true, seed: 2 });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
    set(frameV, { r: 4 + wobble(t, 0.4, 1) });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 30px, #F9E3EA 30px 60px)` });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,.4), rgba(120,40,60,.3) 85%)' });
  const frameV = box(c, 680, 420, 260, 330, { border: `14px solid ${BRASS}`, outline: `4px solid ${INK}`, background: PAPER, boxShadow: `8px 8px 0 ${SH}`, overflow: 'hidden' }); frameV.innerHTML = cropUse('vikS', '0 40 420 560', 420, 560);
  const vec = mkVec(c, [100, 400, 660, 817]);
  const cms = [['VIK', '@vikinga_de_ciudad', '¿Y los piratas con loro?', 66.19], ['FAR', '@disfraz_total', 'mi disfraz de carnaval está mal entonces 😭', 66.75], ['SOL', '@historia_sin_filtro', '¡Más mitos, porfa! 🙏', 67.4]];
  cms.forEach((m, i) => {
    const e = box(c, 70 + (i % 2) * 30, 930 + i * 112, 0, 96, { width: 'auto', paddingRight: '34px', background: '#fff', border: `4px solid ${INK}`, borderRadius: '50px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 40 });
    const a = avatar(e, 10, 8, 76, m[0], { bw: 3 }); a.style.position = 'absolute';
    const u = el('div', e, { position: 'relative', marginLeft: '100px', marginTop: '6px', fontFamily: 'Bricolage', fontWeight: 600, fontSize: '24px', color: '#7a6a58', whiteSpace: 'nowrap' }, m[1]); u.style.position = 'relative';
    const tx = el('div', e, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '30px', color: INK, whiteSpace: 'nowrap', marginLeft: '100px' }, m[2]); tx.style.position = 'relative';
    CM.push({ e, t: m[3] });
  });
}

/* ======================================================================
   L1 · Y ESTO… (67.98 – 69.17)   L2 · NO VENÍA EN EL LIBRO — libro que se cierra (69.17 – 70.45)
   ====================================================================== */
headline(67.98, 69.17, 'Y esto…', { size: 120, color: YEL, y: 200, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}` });
headline(69.17, 70.45, '…no venía en el *libro*.', { size: 84, hlT: 69.83 });
{
  const c = scene(67.98, 69.17, t => {
    const k = p(t, 67.98, 1.1, E.inOutCubic);
    set(vec.d, { s: 1 + 0.22 * k, y: k * 30, r: -k * 4 });
    vecFace(vec, t, { jaw: talkW(t, 'VECINO') * 0.6, look: [0, 1], bL: 10, bR: 14, fan: -30, half: true, blink: false });
    vec.hMouth.setAttribute('transform', 'translate(64,-34) rotate(-20 206 318)'); vec.hMouth.style.opacity = 1; vec.cup.style.opacity = 0;
  }, { cut: true, clip: true });
  sceneBg(c, { background: INK });
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(ellipse at 50% 46%, rgba(255,230,180,.35), rgba(0,0,0,0) 55%)', zIndex: 1 });
  const vec = mkVec(c, [-30, 300, 1140, 1411]); vec.d.style.zIndex = 2; vec.d.style.transformOrigin = '540px 650px';
}
{
  const c = scene(69.17, 70.45, t => {
    const k = p(t, 69.5, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > 69.8;
    stand.d.style.display = sx > 0.25 ? '' : 'none'; trap.style.display = sx <= 0.25 ? '' : 'none';
    face(stand, t, { look: t > 69.35 ? [6, -5] : [-3, 2], seed: 1, jaw: t > 69.4 ? 0.5 : 0, bL: t > 69.35 ? 14 : 0, bR: t > 69.35 ? 14 : 0 }); set(stand.d, { y: wobble(t, 1, 3) });
    set(bookW, { s: 1.25 * pop(t, 69.18, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, 69.83, 0.3)) : 0)), o: 1 });
    stars.forEach((s, i) => { const a = t * 4 + i * 2.1; set(s, { x: Math.cos(a) * 80, y: Math.sin(a) * 24, o: closed ? 1 : 0, r: t * 200 }); });
    hrn.forEach((f, i) => { const kf = p(t, 69.83, 0.5, E.outCubic); set(f, { x: (i - 0.5) * 260 * kf, y: -kf * 220 + kf * kf * 160, r: t * (i ? 300 : -300), o: closed ? 1 : 0 }); });
  });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 10; i++) lines += `<path d="M180,${850 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <g class="trap"><use href="#vikS" x="250" y="520" width="260" height="347"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="740" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="50" fill="${INK}">VIKINGOS</text><text x="335" y="790" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="34" fill="${INK}">capítulo IV</text>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF'), trap = bs.querySelector('.trap');
  const stand = mkVik(bookW, [600, 560, 300, 400], { horns: true, axe: true, seed: 31 }); stand.d.style.zIndex = 2;
  const stars = []; for (let i = 0; i < 3; i++) stars.push(el('div', bookW, { left: '330px', top: '500px', fontSize: '54px', color: YEL, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}`, zIndex: 3 }, '✦'));
  const hrn = [box(bookW, 300, 520, 90, 125, { zIndex: 3 }, hornSvg()), box(bookW, 420, 520, 90, 125, { zIndex: 3 }, `<div style="width:100%;height:100%;transform:scaleX(-1)">${hornSvg()}</div>`)];
}

/* ======================================================================
   TARJETA FINAL (70.45 – fin)
   ====================================================================== */
{
  const c = scene(70.45, 999, t => {
    set(lt, { s: pop(t, 70.7, 0.45), o: t < 70.7 ? 0 : 1 }); paint(lhl, t, 71.0, 0.4);
    popA(ttl, t, 71.15, { r: -1 }); popA(src, t, 71.4, { rise: 30 });
    set(peek.d, { x: (1 - p(t, 71.6, 0.45, E.outBack)) * 400, r: -10 + wobble(t, 0.6, 2), o: 1 });
    face(peek, t, { look: [-5, 2], seed: 2, bL: 8, bR: 8 });
  }, { clip: true });
  sceneBg(c, { background: `repeating-linear-gradient(90deg, rgba(244,207,218,.55) 0 30px, rgba(249,227,234,.55) 30px 60px)` });
  const peek = mkVik(c, [800, 1060, 300, 400], { horns: false, axe: false, seed: 40 }); peek.d.style.zIndex = 2;
  const lt = box(c, 40, 790, 1000, 240, { textAlign: 'center', zIndex: 3 });
  lt.innerHTML = `<div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:92px;line-height:1;color:${INK}">esto no venía</div><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1.1;color:${INK}">en el ${hlSpan('libro', 'lhl')}</div>`;
  const lhl = lt.querySelector('.lhl');
  const ttl = el('div', c, { left: '90px', top: '1030px', width: '900px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: '56px', color: '#fff', background: INK, padding: '14px 10px 18px', borderRadius: '14px', boxShadow: `7px 7px 0 ${PINK}`, zIndex: 3 }, 'Ep. 5 · Vikingos sin cuernos');
  const src = el('div', c, { left: '80px', top: '1150px', width: '840px', textAlign: 'center', fontFamily: 'SpecialElite', fontSize: '27px', lineHeight: 1.3, color: INK, zIndex: 3 }, 'Fuentes: casco de Gjermundbu (Museo de Historia Cultural, Oslo) · vestuario de Carl Emil Doepler, Bayreuth 1876 · cascos de Veksø (Museo Nacional de Dinamarca)');
}
