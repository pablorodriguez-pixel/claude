/* LA LATA DE LA ABUELA — Ep. 10 «Las estrellas del congelador» (formato 1 secreto / curiosidad, ~33 s) */
const T_TAB = w(18), T_OJO = w(59), TC = w(70);

/* ================= 0 · GANCHO: el congelador y su etiqueta ================= */
const s0 = scene(-1, T_TAB, { exit: 'cut' });
const H = {};
const shadowSpan = s => `<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">${s}</span>`;
H.title = el('div', s0.el, { left: '40px', top: '262px', width: '1000px', display: 'flex', justifyContent: 'center', columnGap: '0.24em', fontFamily: 'DMSerif', fontSize: '88px', lineHeight: 1.02, color: CREAM, whiteSpace: 'nowrap' }, `${shadowSpan('¿Y estas')}<span class="gold" style="font-style:italic;padding:0 .08em">estrellitas?</span>`);
H.fz = box('', s0.el, 190, 520, 700, 640, { borderRadius: '56px', background: 'linear-gradient(180deg,#FFFFFF,#CFE6F7)', border: `8px solid ${INK}`, boxSizing: 'border-box', boxShadow: '0 16px 0 rgba(8,16,48,.45), 0 36px 60px rgba(0,0,0,.35)' });
box('', H.fz, 40, 40, 20, 150, { borderRadius: '10px', background: '#9db1cf', border: `5px solid ${INK}`, boxSizing: 'border-box' });
box('', H.fz, 40, 440, 610, 8, { background: 'rgba(27,35,64,.25)', borderRadius: '4px' });
H.plate = box(`<div style="width:100%;height:100%;border-radius:24px;background:#FFF7EA;border:6px solid ${INK};display:flex;align-items:center;justify-content:center;gap:6px">${A.starsRow(4, 4, 96)}</div>`, H.fz, 120, 190, 460, 150);
H.ring = box('', H.fz, 100, 170, 500, 190, { border: '10px solid #FFD66B', borderRadius: '40px', boxShadow: '0 0 40px rgba(255,214,107,.95), inset 0 0 30px rgba(255,214,107,.6)', boxSizing: 'border-box' });
H.q = box(`<div style="width:120px;height:120px;border-radius:28px;background:${RED};border:6px solid ${CREAM};box-shadow:0 8px 0 #5a0a14;display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:90px;color:#fff;box-sizing:border-box;padding-bottom:6px">?</div>`, s0.el, 780, 480, 120, 120);
H.eye = box(A.eye(), s0.el, 130, 1140, 140, 90);
H.c1 = chip(s0.el, '👀 la has visto mil veces', 330, 1190, { size: 40 });
H.c2 = chip(s0.el, '🤷 y nadie te la explicó', 330, 1190, { size: 40 });
s0.upd = t => {
  set(H.title, { o: 1 - p(t, w(3) - 0.15, 0.15), s: 1 + 0.03 * Math.sin(t * 4) });
  set(H.fz, { s: 1 + 0.012 * Math.sin(t * 2.2), r: wobble(t, 0.4, 1) });
  set(H.ring, { o: 0.65 + 0.35 * Math.sin(t * 6), s: 1 + 0.015 * Math.sin(t * 6) });
  set(H.q, { s: pop(t, 0.1, 0.4), r: 8 + wobble(t, 0.7, 6), y: 8 * Math.sin(t * 5) });
  set(H.eye, { o: 0 });
  chipAnim(H.c1, t, w(10), w(13) + 0.1, -3); chipAnim(H.c2, t, w(14), T_TAB + 0.5, 3);
};

/* ================= 1 · LA TABLA: 1 a 4 estrellas ================= */
const s1 = scene(T_TAB, T_OJO, { enter: 'whip', exit: 'cut' });
const E1 = {};
const ROWS = [
  { n: 1, temp: '−6 °C', dur: '1 semana', bar: 0.14, t: w(18), tTemp: w(21), tDur: w(30) },
  { n: 2, temp: '−12 °C', dur: '1 mes', bar: 0.36, t: w(32), tTemp: w(34), tDur: w(36) },
  { n: 3, temp: '−18 °C', dur: '3 meses', bar: 0.62, t: w(38), tTemp: w(39), tDur: w(42) },
  { n: 4, temp: '≤ −18 °C', dur: 'mucho más', bar: 1, t: w(45), tTemp: w(48), tDur: w(50) }];
ROWS.forEach((r, i) => {
  r.e = box(`<div style="width:860px;height:140px;border-radius:34px;background:${i === 3 ? 'linear-gradient(90deg,#FFF1C4,#F6D77E)' : CREAM};border:6px solid ${i === 3 ? '#B0812F' : '#D4A74A'};box-shadow:0 8px 0 rgba(8,16,48,.4);box-sizing:border-box;position:relative;overflow:hidden">
    <div style="position:absolute;left:18px;top:34px;white-space:nowrap">${A.starsRow(r.n, 4, 52)}</div>
    <div class="tp" style="position:absolute;left:250px;top:30px;width:230px;font-family:Fredoka;font-weight:700;font-size:54px;color:#1f6fb0;white-space:nowrap">${r.temp}</div>
    <div class="du" style="position:absolute;left:490px;top:12px;font-family:Fredoka;font-weight:700;font-size:40px;color:${INK};white-space:nowrap">${r.dur}</div>
    <div style="position:absolute;left:490px;top:78px;width:330px;height:26px;border-radius:13px;background:#E3DCC8;border:4px solid ${INK};overflow:hidden;box-sizing:border-box"><div class="br" style="width:0;height:100%;background:linear-gradient(90deg,#7FC0F5,#2f9e5b)"></div></div></div>`, s1.el, 110, 490 + i * 150, 860, 140, { transformOrigin: '0 50%' });
  r.tp = q(r.e, '.tp'); r.du = q(r.e, '.du'); r.br = q(r.e, '.br');
});
E1.fresh = box(`<div style="display:flex;align-items:center;gap:14px;background:#2f9e5b;border:5px solid ${CREAM};border-radius:100px;padding:6px 24px 10px;font-family:Fredoka;font-weight:700;font-size:38px;color:#fff;white-space:nowrap;box-shadow:0 7px 0 #1f6b3d">🥬 congela fresco</div>`, s1.el, 600, 1100, 330, 80, { transformOrigin: '50% 50%' });
E1.no = [0, 1, 2].map(i => box(A.cross(), s1.el, 760, 490 + i * 150 + 20, 100, 100));
E1.tag = chip(s1.el, '≈ orientativo', 380, 1210, { size: 34 });
E1.b = burst(s1.el, 540, 1040, w(45), 16, 340, 1.1);
s1.upd = t => {
  ROWS.forEach(r => {
    const k = p(t, r.t - 0.05, 0.4, E.outBack);
    set(r.e, { x: (1 - k) * 700, s: 1 + 0.03 * bump(t, r.t), o: t >= r.t - 0.05 ? 1 : 0 });
    r.tp.style.opacity = t >= r.tTemp ? 1 : 0.0; r.du.style.opacity = t >= r.tDur ? 1 : 0;
    r.br.style.width = (100 * r.bar * p(t, r.tDur, 0.8, E.outCubic)) + '%';
  });
  const k4 = p(t, w(52), 0.4, E.outBack);
  set(E1.fresh, { s: k4 * (1 + 0.08 * Math.sin(t * 6)), o: t >= w(52) ? 1 : 0, r: -4 });
  E1.no.forEach((c, i) => set(c, { s: 0.55 * pop(t, w(54) + i * 0.15, 0.35), o: t >= w(54) + i * 0.15 ? 1 : 0 }));
  chipAnim(E1.tag, t, w(31), w(44), -2);
  E1.b.upd(t);
};

/* ================= 2 · OJO: LAS BACTERIAS SOLO DUERMEN ================= */
const s2 = scene(T_OJO, TC, { exit: 'cut' });
const E2 = {};
E2.cube = box(A.icecube(), s2.el, 320, 520, 440, 440, { transformOrigin: '220px 220px' });
E2.bs = [[150, 140], [250, 240], [150, 300]].map(([x, y]) => box(sz(A.bact('#7BC96F', '#4d9a45', 'sleep'), 110, 110), E2.cube, x + 40, y + 40, 110, 110));
E2.zz = box(`<div style="font-family:DMSerif;font-size:64px;color:${INK}">zZz</div>`, E2.cube, 250, 110, 130, 70);
E2.stamp = stampEl(s2.el, 'OJO', 400, 1010, { size: 80 });
E2.c1 = chip(s2.el, '🧊 congelar ≠ matar', 280, 1190, { size: 46 });
E2.c2 = chip(s2.el, '😴 dormidas, no muertas', 280, 1190, { size: 44 });
E2.fl = [[250, 560], [820, 620], [240, 900], [820, 900]].map(([x, y]) => box(A.flake(), s2.el, x, y, 60, 60));
s2.upd = t => {
  set(E2.cube, { s: pop(t, T_OJO, 0.45) * (1 + 0.015 * Math.sin(t * 2)), r: wobble(t, 0.5, 2) });
  E2.bs.forEach((b, i) => set(b, { s: pop(t, w(62) + i * 0.15, 0.4), r: wobble(t, 0.5, 4, i), y: 4 * Math.sin(t * 2 + i) }));
  set(E2.zz, { y: -18 * fr(t * 0.8), s: 0.9 + 0.1 * Math.sin(t * 3), o: t >= w(62) ? 1 : 0 });
  stampAnim(E2.stamp, t, w(59) + 0.05, w(62) + 0.3, -6);
  chipAnim(E2.c1, t, w(60), w(65) - 0.05, -3); chipAnim(E2.c2, t, w(65), TC, 3);
  E2.fl.forEach((f, i) => set(f, { s: 0.8 + 0.3 * Math.sin(t * 3 + i), r: t * 40 + i * 50, o: 0.9 }));
};

/* ================= 3 · PREGUNTA + SEGUIR ================= */
const s3 = endAsk(TC, [['Marta', '¡Tres! ⭐⭐⭐', w(75)], ['Luis', 'Cuatro, ¡el bueno! 🌟', w(77)], ['Ana', 'Hoy lo miro 👀', w(79)]], w(81), w(87) + 0.2);

/* ================= ABUELA ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 3.0, 'shout'], [3.1, 6.0, 'sly'], [6.1, 10.9, 'proud'], [11.0, 16.3, 'happy'], [16.4, 21.6, 'wow'], [21.7, 25.5, 'stern'], [25.6, 29.9, 'happy'], [30.0, 32.6, 'wink'], [32.6, 40, 'happy']];
const HANDS = [[0.1, 1.5, 'stop'], [3.2, 4.6, 'point'], [6.4, 7.6, 'up'], [11.2, 12.4, 'point'], [13.6, 14.6, 'point'], [16.6, 17.8, 'up'], [21.8, 23.0, 'wag'], [25.8, 27.0, 'point'], [30.2, 31.6, 'wave']];

/* ================= TITULARES ================= */
H_('Las has visto *mil_veces*', [8, 9, 10, 11], w(13));
H_('Y *nadie* te las explicó', [13, 14, 15, 16, 17], T_TAB);
H_('Una *estrella* · −6_°C', [18, 19, 21, 22], w(24));
H_('Aguanta *una_semana*', [26, 30], w(32));
H_('Dos *estrellas* · −12_°C', [32, 33, 33, 34], w(36));
H_('Un *mes*', [36, 37], w(38));
H_('Tres *estrellas* · −18_°C', [38, 38, 39, 40], w(41));
H_('Unos *tres_meses*', [41, 42], w(44));
H_('Cuatro *estrellas* = *el_de_verdad*', [45, 46, 47, 49], w(52));
H_('El único que *congela_fresco*', [53, 54, 55, 56], T_OJO);
H_('Ojo: *no_mata* bacterias', [59, 61, 63], w(65));
H_('Solo las pone *a_dormir*', [65, 66, 67, 68], TC);
H_('Mira *tu_congelador*', [70, 72], w(73));
H_('¿Cuántas *estrellas*?', [73, 74], w(76));
H_('Dímelo *abajo*', [76, 79], w(80));
H_('Y sígueme: *un_truco_cada_día*', [80, 81, 83], LT, { maxH: 200 });

/* ================= FIN ================= */
finish({
  first: s0, last: s3, whips: [T_TAB], shk: [w(59)],
  pun: [w(2), w(18), w(32), w(38), w(45), w(52), w(59), w(87) + 0.2],
  extra: () => { },
  sfx: [['pop', 0.05, 0.6], ['pop2', 0.2, 0.5], ['ping', w(2), 0.5], ['pop', w(10), 0.5], ['pop2', w(14), 0.5],
    ['whoosh', T_TAB], ['pop', w(18)], ['ding', w(21), 0.5], ['pop2', w(30), 0.5], ['pop', w(32)], ['ding', w(34), 0.5], ['pop2', w(36), 0.5], ['pop', w(38)], ['ding', w(39), 0.5], ['pop2', w(42), 0.5],
    ['pop', w(45)], ['tada', w(46), 0.5], ['ding', w(50), 0.6], ['pop', w(52)], ['error', w(54), 0.5], ['error', w(54) + 0.15, 0.4], ['error', w(54) + 0.3, 0.4],
    ['whoosh', T_OJO, 0.6], ['stamp', w(59) + 0.05, 0.9], ['pop', w(62)], ['pop2', w(62) + 0.15, 0.5], ['pop', w(62) + 0.3, 0.5], ['sad', w(67), 0.4],
    ['whoosh', TC, 0.6], ['pop', w(75), 0.5], ['pop2', w(77), 0.5], ['pop', w(79), 0.5], ['pop', w(81), 0.6], ['click', w(87) + 0.2], ['sparkle', w(87) + 0.35, 0.7], ['swoosh_up', LT, 0.5]]
});
