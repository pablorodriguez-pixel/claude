/* LA LATA DE LA ABUELA — Ep. 8 «El cajetín de la lavadora» (formato 1 secreto, ~30 s) */
/* (common.js ya ha creado STG, BG, CAM, OV, utilidades, titulares y la abuela) */
const T_QUE = w(10), T_NO = w(17), T_UNO = w(21), T_DOS = w(31), T_FLOR = w(44), T_MAX = w(57), TC = w(68);

/* ================= CAJETÍN (persistente) ================= */
const WX = [28, 282, 638], WW = [228, 330, 194], WY = 92, WH = 300, WIN = WH - 12;
const WCX = WX.map((x, i) => x + WW[i] / 2);
const DR = box('', CAM, 110, 640, 860, 420, { zIndex: 5 });
box('', DR, 0, 0, 860, 420, { borderRadius: '44px', background: 'linear-gradient(180deg,#FFFFFF,#E9E3D3)', border: `8px solid ${INK}`, boxSizing: 'border-box', boxShadow: '0 16px 0 rgba(8,16,48,.45), 0 36px 60px rgba(0,0,0,.35)' });
box('', DR, 230, 22, 400, 34, { borderRadius: '17px', background: '#2b3252', boxShadow: 'inset 0 6px 0 rgba(0,0,0,.35)' });
const WELL = WX.map((x, i) => {
  const wl = box('', DR, x, WY, WW[i], WH, { borderRadius: '28px', background: 'linear-gradient(180deg,#9FB4D2,#D6E2F2 40%,#CFDDEE)', border: `6px solid ${INK}`, boxSizing: 'border-box', overflow: 'hidden' });
  const liq = box('', wl, 0, WIN, WW[i] - 12, 0, { background: '#7FC0F5' });
  return { wl, liq };
});
box('', WELL[2].wl, WW[2] / 2 - 6 - 28, 70, 56, 250, { borderRadius: '28px 28px 0 0', background: 'linear-gradient(90deg,#9db1cf,#d6e2f2,#9db1cf)', border: `5px solid ${INK}`, boxSizing: 'border-box' });
const LAB = [
  box(`<div style="font-family:DMSerif;font-size:150px;line-height:1;color:#1B2340;text-align:center;width:${WW[0] - 12}px">I</div>`, WELL[0].wl, 0, 18, WW[0] - 12, 160),
  box(`<div style="font-family:DMSerif;font-size:150px;line-height:1;color:#1B2340;text-align:center;width:${WW[1] - 12}px">II</div>`, WELL[1].wl, 0, 18, WW[1] - 12, 160),
  box(A.flowerI(), WELL[2].wl, WW[2] / 2 - 6 - 60, 16, 120, 120, { zIndex: 3 })];
const MAXL = box(`<div style="width:${WW[2] - 12}px;border-top:7px dashed ${RED};position:relative"><div style="position:absolute;right:8px;top:-44px;font-family:Fredoka;font-weight:700;font-size:34px;color:${RED};background:#FFF7EA;border-radius:12px;padding:0 10px">MÁX</div></div>`, WELL[2].wl, 0, 100, WW[2] - 12, 8, { zIndex: 4 });
const HLW = WX.map((x, i) => box('', DR, x - 14, WY - 14, WW[i] + 28, WH + 28, { border: '10px solid #FFD66B', borderRadius: '40px', boxShadow: '0 0 40px rgba(255,214,107,.95), inset 0 0 30px rgba(255,214,107,.6)', boxSizing: 'border-box' }));
const QM = WX.map((x, i) => box(`<div style="width:110px;height:110px;border-radius:26px;background:${RED};border:6px solid ${CREAM};box-shadow:0 8px 0 #5a0a14;display:flex;align-items:center;justify-content:center;font-family:Fredoka;font-weight:700;font-size:84px;color:#fff;box-sizing:border-box;padding-bottom:6px">?</div>`, DR, WCX[i] - 55, 0, 110, 110, { zIndex: 6 }));
const setLevel = (i, f, col) => { const h = clamp(f, 0, 1.2) * WIN; WELL[i].liq.style.top = (WIN - Math.min(h, WIN)) + 'px'; WELL[i].liq.style.height = Math.min(h, WIN) + 'px'; if (col) WELL[i].liq.style.background = col; };

/* botella y jarra para verter (cuello abajo-derecha) */
const BOT = box(sz(A.bottle('JABÓN'), 110, 300), DR, 0, 0, 110, 300, { zIndex: 8 });
const JUG = box(A.jug(), DR, 0, 0, 120, 200, { zIndex: 8 });
const POUR = (col) => box('', DR, 0, 0, 22, 100, { borderRadius: '11px', background: col, border: '3px solid rgba(0,0,0,.25)', transformOrigin: '50% 0', zIndex: 7 });
const PB = POUR('#7FC0F5'), PJ = POUR('#F08FBD');
function pourAt(obj, stream, kind, cx, ty, t, on, lvlTop, tilt) {
  /* kind: 'b' botella (cuello a 150 px del centro) o 'j' jarra (100 px) · cx: x del cuello · ty: y del cuello */
  const L = kind === 'b' ? 150 : 100, s = 0.62, th = (tilt == null ? 135 : tilt) * Math.PI / 180;
  const nx = L * s * Math.sin(th), ny = -L * s * Math.cos(th);
  const W_ = kind === 'b' ? 110 : 120, H_ = kind === 'b' ? 300 : 200;
  set(obj, { x: cx - nx - W_ / 2 + W_ / 2 * 0, y: ty - ny - H_ / 2, s, r: tilt == null ? 135 : tilt, o: on });
  obj.style.left = '0px'; obj.style.top = '0px';
  set(stream, { x: cx - 11, y: ty, sy: Math.max(0.001, (lvlTop - ty) / 100) * (on ? 1 : 0), o: on });
  stream.style.backgroundPosition = `0 ${(fr(t * 6) * 40).toFixed(1)}px`;
}
const lvlTopY = (i, f) => WY + 6 + WIN * (1 - f);

/* camino de la botella en «cualquiera»: [t, pozo] */
const HOP = [[w(11), 1], [w(13), 0], [w(15), 2], [w(16) + 0.15, 1], [w(17), 0]];
const DK = [[-1, 0, 0, 1], [T_MAX - 0.1, 0, 0, 1], [T_MAX + 0.45, -520, -60, 1.7, 'back'], [TC - 0.1, -520, -60, 1.7], [TC + 0.2, 0, 0, 1], [DUR, 0, 0, 1]];

function drawerUpd(t) {
  const [dx, dy, ds] = kf(DK, t);
  const tt = t >= LT ? t - DUR : t;
  set(DR, { x: dx, y: dy, s: ds, o: t >= LT ? p(t, LT, 0.3) : tt < TC + 0.05 ? 1 : 1 - p(tt, TC + 0.05, 0.2) });
  const pul = 0.65 + 0.35 * Math.sin(t * 6);
  /* gancho: aro dorado en los tres huecos + interrogantes */
  const hook = tt < T_QUE + 0.05;
  HLW.forEach((h, i) => {
    const on = hook ? pul : tt >= T_UNO && tt < T_DOS && i === 0 ? pul : tt >= T_DOS && tt < T_FLOR && i === 1 ? pul : tt >= T_FLOR && tt < TC && i === 2 ? pul : 0;
    set(h, { o: on, s: 1 + 0.01 * Math.sin(t * 6 + i) });
  });
  QM.forEach((q_, i) => set(q_, { y: -135 + 8 * Math.sin(t * 5 + i * 2), s: pop(t >= LT ? t - DUR : t, 0.05 + i * 0.12, 0.4) * (tt < T_QUE + 0.05 ? 1 : 0), r: (i - 1) * 8 + wobble(t, 0.7, 5, i), o: tt < T_QUE + 0.05 ? 1 : 0 }));
  /* niveles */
  const lv = [0, 0, 0], cl = ['#7FC0F5', '#7FC0F5', '#F08FBD'];
  lv[0] = p(tt, w(25), 1.3, E.inOutCubic) * 0.42;
  lv[1] = p(tt, w(38), 1.5, E.inOutCubic) * 0.62;
  lv[2] = p(tt, w(49), 1.4, E.inOutCubic) * 0.36;
  /* fase MAX: sube hasta la raya y se pasa */
  const toMax = p(tt, w(58), 2.2, E.inOutCubic), over = p(tt, w(66) + 0.1, 0.55, E.outCubic);
  if (tt >= w(58)) lv[2] = lerp(0.36, 0.64, toMax) + 0.2 * over;
  if (tt >= w(60) && tt < w(66)) lv[2] = lerp(0.36, 0.64, p(tt, w(58), 2.0, E.inOutCubic));
  lv.forEach((f, i) => setLevel(i, f, cl[i]));
  /* línea MAX (a 0.64 de altura) */
  MAXL.style.top = (WIN * (1 - 0.64) + 2) + 'px';
  set(MAXL, { o: tt >= w(61) ? p(tt, w(61), 0.25) : 0 });
  LAB.forEach(l => set(l, { o: 1 }));
  /* botella: «cualquiera» salta de pozo en pozo; luego vierte en II; jarra en flor (y en MAX) */
  let bOn = 0, bcx = WCX[1], jOn = 0;
  if (tt >= HOP[0][0] - 0.2 && tt < T_NO) {
    bOn = 1; let k = 0; for (let i = 0; i < HOP.length - 1; i++) if (tt >= HOP[i][0]) k = i;
    const a = HOP[k], b = HOP[Math.min(k + 1, HOP.length - 1)], u = E.inOutCubic(clamp((tt - a[0]) / Math.max(0.01, b[0] - a[0])));
    bcx = lerp(WCX[a[1]], WCX[b[1]], u);
  }
  const hopTop = lvlTopY(1, 0) ;
  if (tt >= HOP[0][0] - 0.2 && tt < T_NO) pourAt(BOT, PB, 'b', bcx, 40 + 6 * Math.sin(t * 20), t, 1, hopTop - 20, 135);
  else if (tt >= w(36) && tt < w(44) - 0.2) pourAt(BOT, PB, 'b', WCX[1], 40, t, p(tt, w(36), 0.2) * (1 - p(tt, w(41) + 0.4, 0.2)), lvlTopY(1, lv[1]), 135);
  else if (tt >= w(25) - 0.4 && tt < w(27) + 0.5) pourAt(BOT, PB, 'b', WCX[0], 40, t, p(tt, w(25) - 0.3, 0.2) * (1 - p(tt, w(27) + 0.3, 0.2)), lvlTopY(0, lv[0]), 135);
  else { set(BOT, { o: 0 }); set(PB, { o: 0 }); }
  if (tt >= w(48) && tt < w(52)) pourAt(JUG, PJ, 'j', WCX[2], 40, t, p(tt, w(48), 0.2) * (1 - p(tt, w(51) + 0.2, 0.2)), lvlTopY(2, lv[2]), 135);
  else if (tt >= w(58) && tt < w(63)) pourAt(JUG, PJ, 'j', WCX[2], 40, t, p(tt, w(58), 0.2) * (1 - p(tt, w(62) + 0.2, 0.2)), lvlTopY(2, lv[2]), 135);
  else if (tt >= w(65) + 0.4 && tt < w(67) + 0.3) pourAt(JUG, PJ, 'j', WCX[2], 40, t, p(tt, w(65) + 0.4, 0.2) * (1 - p(tt, w(67) + 0.1, 0.2)), lvlTopY(2, 1), 135);
  else { set(JUG, { o: 0 }); set(PJ, { o: 0 }); }
}

/* ================= 0 · GANCHO + «EN CUALQUIERA» ================= */
const s0 = scene(-1, T_UNO, { exit: 'cut' });
const H = {};
const shadowSpan = s => `<span style="text-shadow:0 8px 0 #0b1946, 0 16px 30px rgba(0,0,0,.4)">${s}</span>`;
H.title = el('div', s0.el, { left: '40px', top: '262px', width: '1000px', display: 'flex', justifyContent: 'center', columnGap: '0.24em', fontFamily: 'DMSerif', fontSize: '92px', lineHeight: 1.02, color: CREAM, whiteSpace: 'nowrap' }, `${shadowSpan('¿Para qué sirven')}<span class="gold" style="font-style:italic;padding:0 .08em">esto?</span>`);
H.c1 = chip(s0.el, '🧺 tu lavadora, por dentro', 330, 1190, { size: 40 });
H.any = chip(s0.el, '🤷 en cualquiera', 360, 1190, { size: 46 });
H.no = stampEl(s0.el, '¡NO DA IGUAL!', 250, 1160, { size: 84 });
s0.upd = t => {
  set(H.title, { o: 1 - p(t, T_QUE + 0.0 - 0.15, 0.15), s: 1 + 0.03 * Math.sin(t * 4) });
  chipAnim(H.c1, t, 0.3, T_QUE - 0.15, -3);
  chipAnim(H.any, t, w(15), T_NO - 0.05, 3);
  stampAnim(H.no, t, w(18), T_UNO, -6);
};

/* ================= 1 · EL UNO ================= */
const s1 = scene(T_UNO, T_DOS, { exit: 'cut' });
const E1 = {};
E1.sh = box(A.tshirt(), s1.el, 690, 1090, 220, 200);
E1.chip = chip(s1.el, '🧦 ropa muy sucia', 330, 1180, { size: 44 });
E1.pre = chip(s1.el, '⏪ primero: prelavado', 330, 1290, { size: 38 });
E1.b = burst(s1.el, 800, 1190, w(29), 12, 240, 0.9);
s1.upd = t => {
  set(E1.sh, { s: pop(t, w(26), 0.45) * (1 + 0.1 * bump(t, w(29))), r: -8 + wobble(t, 0.6, 3), o: t >= w(26) ? 1 : 0 });
  chipAnim(E1.chip, t, w(28), T_DOS, 2);
  chipAnim(E1.pre, t, w(25), w(28) - 0.1, -3);
  E1.b.upd(t);
};
/* ================= 2 · EL DOS ================= */
const s2 = scene(T_DOS, T_FLOR, { exit: 'cut' });
const E2 = {};
E2.chip = chip(s2.el, '💧 detergente de cada día', 250, 1180, { size: 46 });
E2.main = chip(s2.el, '⭐ lavado principal', 340, 1300, { size: 40 });
E2.ck = box(A.check(), s2.el, 800, 1060, 120, 120);
s2.upd = t => {
  chipAnim(E2.main, t, w(35), w(40) - 0.05, -3);
  chipAnim(E2.chip, t, w(40), T_FLOR, 2);
  set(E2.ck, { s: pop(t, w(43), 0.4), o: t >= w(43) ? 1 : 0 });
};
/* ================= 3 · LA FLOR ================= */
const s3 = scene(T_FLOR, T_MAX, { exit: 'cut' });
const E3 = {};
E3.chip = chip(s3.el, '🌸 suavizante', 340, 1180, { size: 50 });
E3.bar = box(`<div style="width:760px;height:46px;border-radius:23px;background:#E9E3D3;border:5px solid ${INK};overflow:hidden;box-shadow:0 7px 0 rgba(8,16,48,.4)"><div class="f" style="width:0;height:100%;background:linear-gradient(90deg,#7FC0F5,#F08FBD)"></div></div><div style="position:absolute;left:0;top:60px;width:760px;display:flex;justify-content:space-between;font-family:Fredoka;font-weight:700;font-size:34px;color:${CREAM}"><span>⏱ lavado</span><span>🌸 al final, solo</span></div>`, s3.el, 160, 1290, 760, 120);
E3.f = q(E3.bar, '.f');
E3.b = burst(s3.el, 700, 1310, w(56) + 0.3, 14, 280, 1);
s3.upd = t => {
  chipAnim(E3.chip, t, w(46), w(52), -3);
  const k = p(t, w(52), 4.2, E.inOutCubic); E3.f.style.width = (k * 100) + '%';
  set(E3.bar, { s: pop(t, w(52) - 0.05, 0.4), o: t >= w(52) - 0.05 ? 1 : 0 });
  E3.b.upd(t);
};
/* ================= 4 · LA RAYA DE MÁXIMO ================= */
const s4 = scene(T_MAX, TC, { exit: 'cut' });
const E4_ = {};
E4_.ok = box(A.check(), s4.el, 760, 1010, 130, 130);
E4_.no = stampEl(s4.el, '¡SE DESBORDA!', 240, 1250, { size: 70 });
E4_.drops = [0, 1, 2, 3].map(i => box(A.drop('#F08FBD'), s4.el, 700 + i * 26, 1010, 60, 84, { transformOrigin: '30px 42px' }));
s4.upd = t => {
  set(E4_.ok, { s: pop(t, w(63), 0.4), o: t >= w(63) && t < w(66) ? 1 : 0 });
  stampAnim(E4_.no, t, w(67), TC, -5);
  E4_.drops.forEach((d, i) => { const k = fr(t * 1.6 + i / 4), on = t >= w(67) + 0.2; set(d, { x: -40 + i * 26 + (i % 2 ? 40 : -10), y: 40 + 320 * k * k, s: 0.6 * (1 - 0.3 * k), o: on && k < 0.92 ? 1 : 0 }); });
};
/* ================= 5 · PREGUNTA + SEGUIR ================= */
const s5 = endAsk(TC, [['Marta', '¡Yo, tres! 😮', w(76)], ['Luis', 'Solo tengo dos…', w(77)], ['Ana', 'Hoy lo miro 👀', w(79)]], w(82), w(87) + 0.2);

/* ================= ABUELA ================= */
const MKF = [[-0.5, 175, 1165, 0.5], [LT, 175, 1165, 0.5], [DUR, 175, 1165, 0.5]];
const EXPR = [[0, 3.3, 'shout'], [3.4, 7.0, 'sly'], [7.1, 10.6, 'proud'], [10.7, 14.8, 'happy'], [14.85, 18.8, 'proud'], [18.9, 22.3, 'stern'], [22.4, 26.8, 'happy'], [26.9, 29.0, 'wink'], [29.0, 40, 'happy']];
const HANDS = [[0.2, 1.6, 'stop'], [4.0, 5.2, 'wag'], [7.9, 9.0, 'point'], [11.8, 12.8, 'point'], [15.4, 16.4, 'point'], [19.8, 21.0, 'wag'], [23.3, 24.6, 'up'], [27.4, 28.6, 'wave']];

/* ================= TITULARES ================= */
H_('Detergente *en_cualquiera*', [10, 12, 15], T_NO);
H_('Pues *no_da_igual*', [17, 18, 19], T_UNO);
H_('El *uno* · prelavado', [21, 22, 23, 25], w(26));
H_('Solo ropa *muy_sucia*', [26, 27, 28], T_DOS);
H_('El *dos* · lavado principal', [31, 32, 33, 35], w(37));
H_('Aquí: el *detergente*', [37, 39, 40], T_FLOR);
H_('La *flor* · suavizante', [44, 46, 47], w(52));
H_('Lo suelta *sola_al_final*', [52, 53, 54], T_MAX);
H_('No pases *la_raya_de_máximo*', [59, 60, 62], w(65));
H_('O *se_desborda*', [65, 66, 67], TC);
H_('Ve a *tu_lavadora*', [68, 70, 71], w(72));
H_('¿Cuántos *huecos*?', [72, 73], w(77));
H_('Cuéntamelo *abajo*', [77, 78, 80], w(81));
H_('Y sígueme: *un_truco_cada_día*', [81, 82, 84, 85], LT, { maxH: 200 });

/* ================= FIN ================= */
finish({
  first: s0, last: s5, whips: [], shk: [w(18)],
  pun: [w(2), w(18), w(26), w(43), w(46), w(56) + 0.3, w(63), w(67), w(87) + 0.2],
  extra: drawerUpd,
  sfx: [['pop', 0.05, 0.6], ['pop2', 0.2, 0.5], ['ping', w(3), 0.5], ['pop', w(11), 0.5], ['pop2', w(13), 0.5], ['pop', w(15), 0.5], ['stamp', w(18), 0.9],
    ['pop', w(21), 0.6], ['swoosh_up', w(25) - 0.3, 0.5], ['pop', w(26)], ['ding', w(29), 0.6],
    ['pop', w(31), 0.6], ['swoosh_up', w(36), 0.5], ['pop', w(35)], ['pop2', w(40), 0.6], ['ding', w(43), 0.7],
    ['pop', w(44), 0.6], ['swoosh_up', w(48), 0.5], ['pop', w(46)], ['click', w(52)], ['sparkle', w(56) + 0.3, 0.7],
    ['whoosh', T_MAX, 0.6], ['pop', w(61)], ['ding', w(63), 0.7], ['error', w(66) + 0.3, 0.6], ['stamp', w(67), 0.8],
    ['whoosh', TC, 0.6], ['pop', w(76), 0.5], ['pop2', w(77), 0.5], ['pop', w(79), 0.5], ['pop', w(82), 0.6], ['click', w(87) + 0.2], ['sparkle', w(87) + 0.35, 0.7], ['swoosh_up', LT, 0.5]]
});
