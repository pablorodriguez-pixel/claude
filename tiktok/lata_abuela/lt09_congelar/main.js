/* LA LATA DE LA ABUELA — Ep. 9 «Congelar bien» (formato 2 consejos útiles, ~39 s) */
const T_DOS = w(13), T1 = w(18), T2 = w(52), T3 = w(62), T4 = w(79), TC = w(88);
const ORANGE = '#F2983E';

/* ================= 0 · GANCHO: el bloque ================= */
const s0 = scene(-1, T1, { exit: 'cut' });
const H = {};
const shadowSpan = s => `<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">${s}</span>`;
H.title = el('div', s0.el, { left: '40px', top: '262px', width: '1000px', display: 'flex', justifyContent: 'center', columnGap: '0.24em', fontFamily: 'DMSerif', fontSize: '92px', lineHeight: 1.02, color: CREAM, whiteSpace: 'nowrap' }, `${shadowSpan('¿Congelas')}<span class="gold" style="font-style:italic;padding:0 .08em">así?</span>`);
H.block = box(A.blockBag(), s0.el, 230, 560, 620, 460);
H.no = box(A.cross(), s0.el, 760, 520, 130, 130);
H.c1 = chip(s0.el, '1 · 🧊 congelar', 190, 1170, { size: 40 });
H.c2 = chip(s0.el, '2 · ♨️ descongelar', 560, 1170, { size: 40 });
H.fl = [[200, 600, 0.8], [830, 700, 1], [780, 940, 0.7], [250, 960, 0.9]].map(([x, y, s]) => ({ e: box(A.flake(), s0.el, x, y, 60, 60), s }));
s0.upd = t => {
  set(H.title, { o: 1 - p(t, w(5) - 0.15, 0.15), s: 1 + 0.03 * Math.sin(t * 4) });
  set(H.block, { s: pop(t, 0, 0.01) * (1 + 0.02 * Math.sin(t * 3)), r: -4 + wobble(t, 0.6, 2) });
  set(H.no, { s: pop(t, w(7), 0.4), o: t >= w(7) ? 1 : 0, r: wobble(t, 0.7, 6) });
  H.fl.forEach((f, i) => set(f.e, { s: f.s * (0.8 + 0.3 * Math.sin(t * 3 + i)), r: t * 40 + i * 50, o: 0.9 }));
  chipAnim(H.c1, t, T_DOS, T1 + 1, -3); chipAnim(H.c2, t, w(15), T1 + 1, 3);
};

/* ================= 1 · CONGELA PLANO: bolsa, aire, aplastar ================= */
const s1 = scene(T1, w(32), { exit: 'cut' });
const E1 = {};
E1.bag = box(A.bag(), s1.el, 230, 600, 620, 420, { transformOrigin: '310px 400px' });
E1.air = [0, 1, 2, 3, 4].map(i => box(A.bubble(26), s1.el, 540, 600, 60, 60));
E1.sq = box(`<div style="display:flex;gap:30px;font-family:DMSerif;font-size:140px;color:${CREAM};text-shadow:0 8px 0 #0b1946">⬇</div>`, s1.el, 480, 380, 120, 170);
E1.b = burst(s1.el, 540, 960, w(31), 14, 300, 1);
E1.c1 = chip(s1.el, '1 · 🛍️ bolsa', 330, 1180, { size: 44 });
E1.c2 = chip(s1.el, '💨 sin aire', 360, 1180, { size: 44 });
E1.c3 = chip(s1.el, '✋ aplástala', 350, 1180, { size: 44 });
s1.upd = t => {
  const puff = p(t, w(23), 0.45, E.outBack) * (1 - p(t, w(27), 0.7, E.inOutCubic));
  const flat = p(t, w(30), 0.5, E.outBounce);
  const sx = lerp(0.001, 0.88 + 0.12 * puff, p(t, w(21), 0.45, E.outBack)) * lerp(1, 1.14, flat);
  const sy = (p(t, w(21), 0.45, E.outBack) * (0.9 + 0.3 * puff)) * lerp(1, 0.36, flat) + 0.001;
  set(E1.bag, { sx, sy, o: t >= w(21) - 0.02 ? 1 : 0, r: wobble(t, 0.5, 1.2) * (1 - flat) });
  E1.air.forEach((a, i) => { const k = clamp((t - w(27) - i * 0.1) / 0.8); set(a, { x: -140 + i * 80 + 30 * Math.sin(k * 6 + i), y: -420 * k - 40, s: (0.7 + 0.3 * (i % 2)) * (1 - 0.3 * k), o: t >= w(27) && k < 1 ? 0.9 * (1 - k * k) : 0 }); });
  set(E1.sq, { y: 40 * Math.abs(Math.sin(t * 9)) + 120 * (1 - flat), s: pop(t, w(30) - 0.1, 0.3), o: t >= w(30) - 0.1 && t < w(32) ? 1 : 0 });
  chipAnim(E1.c1, t, w(23), w(27) - 0.05, -3); chipAnim(E1.c2, t, w(27), w(30) - 0.05, 2); chipAnim(E1.c3, t, w(30), w(32), -2);
  E1.b.upd(t);
};
/* ================= 1b · EL CONGELADOR: planas, ordenadas ================= */
const s1b = scene(w(32), w(46), { exit: 'cut' });
const E1b = {};
E1b.panel = box('', s1b.el, 150, 520, 780, 600, { borderRadius: '40px', background: 'linear-gradient(180deg,#F4FBFF,#BFDDF5)', border: '8px solid #D4A74A', boxSizing: 'border-box', boxShadow: '0 14px 0 rgba(8,16,48,.45)' });
E1b.bags = [0, 1, 2, 3, 4].map(i => box(A.flatBag(), E1b.panel, 70, 440 - i * 98, 640, 120, { transformOrigin: '320px 60px' }));
E1b.c1 = chip(s1b.el, '⚡ más rápido', 190, 1170, { size: 42 });
E1b.c2 = chip(s1b.el, '📦 menos sitio', 190, 1170, { size: 42 });
E1b.c3 = chip(s1b.el, '⏱ se descongela en un rato', 190, 1170, { size: 40 });
E1b.fl = [[130, 500], [850, 560], [880, 960]].map(([x, y]) => box(A.flake(), s1b.el, x, y, 60, 60));
const bagT = [w(33), w(35), w(37), w(38) + 0.1, w(39) + 0.1];
s1b.upd = t => {
  E1b.bags.forEach((b, i) => { const k = p(t, bagT[i], 0.4, E.outBack); set(b, { x: (1 - k) * 700, s: 1, o: t >= bagT[i] ? 1 : 0 }); });
  set(E1b.panel, { s: pop(t, w(32) + 0.0, 0.01) });
  chipAnim(E1b.c1, t, w(35), w(37) + 0.2, -3); chipAnim(E1b.c2, t, w(37) + 0.2, w(41) - 0.05, 3); chipAnim(E1b.c3, t, w(41), w(46), -2);
  E1b.fl.forEach((f, i) => set(f, { s: 0.8 + 0.3 * Math.sin(t * 3 + i), r: t * 40 + i * 50, o: 0.9 }));
};
/* ================= 1c · LA FECHA CON ROTULADOR ================= */
const s1c = scene(w(46), T2, { exit: 'cut' });
const E1c = {};
E1c.bag = box(A.flatBag(), s1c.el, 140, 700, 640, 120, { transformOrigin: '320px 60px' });
E1c.txt = el('div', E1c.bag, { left: '80px', top: '48px', width: '520px', fontFamily: 'JetBrains', fontWeight: 800, fontSize: '40px', color: '#102a6b', whiteSpace: 'nowrap', textShadow: '0 0 1px #102a6b' });
E1c.pen = box(A.pen(), s1c.el, 520, 560, 120, 380, { transformOrigin: '60px 8px' });
E1c.chip = chip(s1c.el, '✍️ rotulador permanente', 320, 1170, { size: 40 });
E1c.cal = box(`<div style="width:240px;height:240px;border-radius:30px;background:#fff;border:7px solid ${INK};box-shadow:0 10px 0 rgba(8,16,48,.45);overflow:hidden;box-sizing:border-box"><div style="background:${RED};height:70px;display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:40px;color:#fff">OCT</div><div style="font-family:DMSerif;font-size:128px;text-align:center;color:${INK};line-height:1.05">24</div></div>`, s1c.el, 760, 980, 240, 240, { transformOrigin: '120px 120px' });
s1c.upd = t => {
  const T0 = w(47);
  set(E1c.bag, { s: 1.0 + 0.0 * t, x: 0, o: 1, r: -4 });
  const full = 'POLLO · 24/10';
  const n = Math.floor(clamp((t - w(51) + 0.9) / 0.9) * full.length);
  E1c.txt.textContent = full.slice(0, n);
  const k = clamp((t - (w(51) - 0.9)) / 0.9);
  set(E1c.pen, { x: -40 + 400 * k * 0.85, y: 120 + Math.sin(t * 22) * 4, r: 38, o: 1, s: p(t, T0 - 0.4, 0.4, E.outBack) });
  chipAnim(E1c.chip, t, w(51), T2, -2);
  set(E1c.cal, { s: pop(t, w(49), 0.45), r: 6 + wobble(t, 0.6, 3), o: t >= w(49) ? 1 : 0 });
};

/* ================= 2 · NEVERA ✓ / ENCIMERA ✗ ================= */
const s2 = scene(T2, T3, { exit: 'cut' });
const E2 = {};
E2.fr = box(sz(A.fridge(), 300, 442), s2.el, 150, 600, 300, 442);
E2.bag = box(A.flatBag(), E2.fr, 40, 230, 220, 41, { transformOrigin: '110px 20px' });
E2.bag.firstChild.setAttribute('width', 220); E2.bag.firstChild.setAttribute('height', 41);
E2.cn = box(`<div style="width:360px;height:30px;border-radius:12px;background:#C79A5A;border:6px solid ${INK};box-sizing:border-box"></div><div style="position:absolute;left:30px;top:30px;width:26px;height:260px;background:#A9793A;border:6px solid ${INK};box-sizing:border-box"></div><div style="position:absolute;right:30px;top:30px;width:26px;height:260px;background:#A9793A;border:6px solid ${INK};box-sizing:border-box"></div>`, s2.el, 590, 880, 360, 300);
E2.bag2 = box(A.flatBag(), s2.el, 640, 830, 260, 49);
E2.bag2.firstChild.setAttribute('width', 260); E2.bag2.firstChild.setAttribute('height', 49);
E2.ok = box(A.check(), s2.el, 340, 540, 130, 130);
E2.no = box(A.cross(), s2.el, 830, 740, 130, 130);
E2.l1 = chip(s2.el, '❄️ nevera', 290, 1090, { size: 46, css: { color: '#1f7a45', borderColor: '#2f9e5b' } });
E2.l2 = chip(s2.el, '🍽️ encimera', 650, 1090, { size: 46, css: { color: RED, borderColor: RED } });
s2.upd = t => {
  set(E2.fr, { s: pop(t, w(55), 0.45), o: t >= w(55) - 0.05 ? 1 : 0, r: wobble(t, 0.5, 1) });
  set(E2.bag, { s: pop(t, w(56), 0.4) , o: t >= w(56) ? 1 : 0 });
  set(E2.ok, { s: pop(t, w(57), 0.4), o: t >= w(57) ? 1 : 0 });
  set(E2.cn, { s: pop(t, w(60) - 0.3, 0.45), o: t >= w(60) - 0.3 ? 1 : 0 });
  set(E2.bag2, { s: pop(t, w(60), 0.4), o: t >= w(60) ? 1 : 0 });
  set(E2.no, { s: pop(t, w(61), 0.4), o: t >= w(61) ? 1 : 0, r: wobble(t, 0.8, 8) });
  chipAnim(E2.l1, t, w(56), T3 + 1, -3); chipAnim(E2.l2, t, w(60), T3 + 1, 3);
};
/* ================= 3 · POR FUERA CALIENTE, POR DENTRO HELADO ================= */
const s3 = scene(T3, T4, { exit: 'cut' });
const E3 = {};
E3.ball = box(`<div class="o" style="position:absolute;left:0;top:0;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,${FOOD} 0%,#E57A32 100%);border:8px solid ${INK};box-sizing:border-box"></div><div class="i" style="position:absolute;left:130px;top:130px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#fff,#BFE3FF 60%,#8CC6F2);border:6px solid ${INK};box-sizing:border-box"></div>`, s3.el, 280, 560, 520, 520);
E3.ball.insertAdjacentHTML('beforeend', '');
E3.inner = q(E3.ball, '.i');
E3.fl = box(A.flake(), E3.ball, 215, 215, 90, 90);
E3.heat = [0, 1, 2, 3, 4, 5].map(i => box(`<div style="font-size:70px">♨️</div>`, s3.el, 230 + i * 120, 480, 80, 80));
E3.bs = [[160, 640], [820, 640], [140, 960], [850, 980]].map(([x, y], i) => ({ a: box(A.bact('#7BC96F', '#4d9a45', 'sleep'), s3.el, x - 64, y - 64, 128, 128), g: box(A.bact('#7BC96F', '#4d9a45', 'grin'), s3.el, x - 64, y - 64, 128, 128), z: box(`<div style="font-family:DMSerif;font-size:56px;color:${CREAM}">zZz</div>`, s3.el, x + 30, y - 110, 120, 60) }));
E3.c1 = chip(s3.el, '🌡️ fuera: se calienta', 280, 1170, { size: 40 });
E3.c2 = chip(s3.el, '❄️ dentro: hielo', 360, 1170, { size: 44, css: { color: '#1f6fb0', borderColor: '#3f7fd0' } });
s3.upd = t => {
  set(E3.ball, { s: pop(t, T3, 0.45), r: wobble(t, 0.4, 2) });
  const warm = p(t, w(65), 5, E.inOutCubic);
  E3.inner.style.transform = `scale(${lerp(1, 0.9, p(t, w(66), 7, E.linear))})`;
  set(E3.fl, { r: t * 30, s: 1 + 0.15 * Math.sin(t * 4) + 0.3 * bump(t, w(76)) });
  E3.heat.forEach((h, i) => set(h, { y: -40 * fr(t * 0.9 + i / 6), o: t >= w(66) && t < w(79) ? 0.9 * (1 - fr(t * 0.9 + i / 6)) : 0, s: 0.8 }));
  E3.bs.forEach((b, i) => { const t0 = w(70) + i * 0.15, woke = t >= w(73) + i * 0.12;
    set(b.a, { s: pop(t, t0, 0.4), o: t >= t0 && !woke ? 1 : 0, r: wobble(t, 0.5, 3, i) });
    set(b.g, { s: pop(t, w(73) + i * 0.12, 0.35) * (1 + 0.08 * Math.sin(t * 9 + i)), o: woke ? 1 : 0, r: wobble(t, 1.4, 8, i) });
    set(b.z, { y: -20 * fr(t * 0.8 + i / 4), o: t >= t0 && !woke ? 0.9 : 0, s: 0.9 }); });
  chipAnim(E3.c1, t, w(66), w(75), -3); chipAnim(E3.c2, t, w(76), T4, 3);
};
/* ================= 4 · LA NOCHE ANTERIOR ================= */
const s4 = scene(T4, TC, { exit: 'cut' });
const E4_ = {};
E4_.fr = box(sz(A.fridge(), 380, 560), s4.el, 150, 560, 380, 560);
E4_.bag = box(A.flatBag(), s4.el, 700, 760, 280, 53, {});
E4_.bag.firstChild.setAttribute('width', 280); E4_.bag.firstChild.setAttribute('height', 53);
E4_.moon = box(A.moon(), s4.el, 700, 540, 120, 120);
E4_.sun = box(A.sun(), s4.el, 760, 540, 140, 140);
E4_.c1 = chip(s4.el, '🌙 la noche anterior', 450, 1170, { size: 44 });
E4_.c2 = chip(s4.el, '✓ lista por la mañana', 400, 1170, { size: 44, css: { color: '#1f7a45', borderColor: '#2f9e5b' } });
s4.upd = t => {
  set(E4_.fr, { s: pop(t, T4 - 0.01, 0.01), r: wobble(t, 0.5, 1) });
  const k = p(t, w(81), 0.7, E.inOutCubic);
  set(E4_.bag, { x: -480 * k, y: 40 * k - Math.sin(Math.PI * k) * 60, r: -10 * (1 - k), s: 1 - 0.3 * k, o: t >= w(79) ? 1 : 0 });
  set(E4_.moon, { s: pop(t, w(86) - 0.3, 0.45) * (1 - p(t, w(87) + 0.3, 0.3)), o: t >= w(86) - 0.3 && t < w(87) + 0.6 ? 1 : 0, r: wobble(t, 0.5, 6) });
  set(E4_.sun, { s: pop(t, w(87) + 0.35, 0.45), o: t >= w(87) + 0.35 ? 1 : 0, r: t * 25 });
  chipAnim(E4_.c1, t, w(85), w(87) + 0.3, -3); chipAnim(E4_.c2, t, w(87) + 0.35, TC, 2);
};
/* ================= 5 · GUÁRDALO Y SÍGUEME ================= */
const s5 = endSave(TC, [['🛍️ Congela plano', w(90)], ['✍️ Apunta la fecha', w(92)], ['❄️ Descongela en nevera', w(93) + 0.2], ['🌙 Noche anterior', w(94)]], w(90) + 0.1, w(95), w(101) + 0.3);

/* ================= ABUELA ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 2.3, 'shout'], [2.3, 4.1, 'disgust'], [4.1, 6.1, 'sly'], [6.2, 11.4, 'proud'], [11.5, 16.2, 'happy'], [16.3, 18.4, 'wink'], [18.5, 21.8, 'proud'], [21.9, 28.1, 'disgust'], [28.2, 30.8, 'sly'], [30.9, 34.0, 'happy'], [34.0, 36.0, 'wink'], [36.0, 45, 'happy']];
const HANDS = [[0.1, 1.5, 'stop'], [4.2, 5.5, 'up'], [6.3, 7.5, 'point'], [11.6, 12.8, 'point'], [18.5, 19.8, 'up'], [20.2, 21.7, 'wag'], [24.4, 25.4, 'point'], [28.3, 29.4, 'point'], [31.0, 32.2, 'up'], [34.2, 35.4, 'wave']];

/* ================= TITULARES ================= */
H_('Dos *consejos* para congelar bien', [13, 14, 15, 16, 17], T1);
H_('1 · Congela *plano*', [18, 19, 20], w(23));
H_('Comida en *bolsa*', [23, 24, 26], w(27));
H_('Sácale *el_aire*', [27, 29], w(30));
H_('Y *aplástala*', [30, 31], w(32));
H_('Se congela *más_rápido*', [33, 34, 36], w(37));
H_('Ocupa *menos_sitio*', [37, 38], w(41));
H_('Se descongela *en_un_rato*', [41, 42, 43], w(46));
H_('Apúntale *la_fecha*', [47, 49], T2);
H_('2 · Descongela *en_la_nevera*', [52, 53, 55], w(58));
H_('Nunca *en_la_encimera*', [58, 60], T3);
H_('Por fuera *se_calienta*', [65, 66, 67], w(70));
H_('Las *bacterias* despiertan', [70, 71, 73], w(75));
H_('El centro: *helado*', [75, 76, 78], T4);
H_('Pásala *la_noche_anterior*', [81, 85], TC);
H_('*Guárdalo* para cuando congeles', [88, 89, 91, 92], w(94));
H_('Y sígueme: *dos_más_cada_día*', [94, 95, 97, 101], LT, { maxH: 200 });

/* ================= FIN ================= */
finish({
  first: s0, last: s5, whips: [T1, T2, T3, T4, TC],
  shk: [w(7)],
  pun: [w(7), w(23), w(31), w(35), w(37), w(41), w(49), w(57), w(61), w(73), w(76), w(87) + 0.35, w(90) + 0.1, w(101) + 0.3],
  extra: () => { },
  sfx: [['error', 0.05, 0.5], ['pop', w(5), 0.6], ['sad', w(7), 0.5], ['pop', T_DOS, 0.6], ['pop2', w(15), 0.6],
    ['whoosh', T1], ['pop', w(21), 0.6], ['pop2', w(27), 0.5], ['swoosh_up', w(28), 0.5], ['thud', w(30) + 0.1, 0.7], ['sparkle', w(31), 0.6],
    ['whoosh', w(32), 0.5], ['pop', w(33), 0.5], ['pop2', w(35), 0.5], ['pop', w(37), 0.5], ['pop2', w(38) + 0.1, 0.5], ['pop', w(39) + 0.1, 0.5], ['ding', w(41), 0.6],
    ['whoosh', w(46), 0.5], ['type', w(50), 0.6], ['pop', w(49), 0.5], ['ding', w(51) + 0.8, 0.6],
    ['whoosh', T2], ['pop', w(55)], ['ding', w(57), 0.7], ['pop2', w(60)], ['error', w(61), 0.7],
    ['whoosh', T3], ['pop', w(66), 0.5], ['pop', w(70)], ['pop2', w(71), 0.5], ['glitch', w(73), 0.5], ['ping', w(76), 0.6],
    ['whoosh', T4], ['swoosh_up', w(81), 0.5], ['thud', w(82), 0.5], ['ding', w(87) + 0.35, 0.6],
    ['whoosh', TC], ['ding', w(90) + 0.1, 0.8], ['pop', w(90), 0.5], ['pop2', w(92), 0.5], ['pop', w(93) + 0.2, 0.5], ['pop2', w(94), 0.5], ['pop', w(95), 0.6], ['click', w(101) + 0.3], ['sparkle', w(101) + 0.45, 0.7], ['swoosh_up', LT, 0.5]]
});
