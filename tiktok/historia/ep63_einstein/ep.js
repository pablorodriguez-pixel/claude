/* Ep. 63 · A Einstein le robaron el cerebro — figuras propias, sin emojis (librería: engine/story.js + ein_lib.js del ep10) */
Story.prepara();
const T = {
  robaron: Q('le robaron'), cerebro0: Q('el cerebro'), raro: Q('lo más raro'), final1: Q('para el final'),
  abril: Q('abril de mil novecientos cincuenta y cinco'), muere: Q('einstein muere'), incineren: Q('lo incineren'),
  patologo: Q('el patólogo'), harvey: Q('thomas harvey'), saca: Q('le saca el cerebro'), queda: Q('se lo queda'),
  permiso4: Q('sin permiso'), hospital: Q('el hospital'), niega: Q('se niega'), despiden: Q('lo despiden'),
  corta: Q('lo corta'), trozos: Q('doscientos cuarenta trozos'), tarros: Q('en tarros'), sidra: Q('caja de sidra'),
  devuelve: Q('no lo devuelve'), m1998: Q('mil novecientos noventa y ocho'), anos: Q('cuarenta y tres años'),
  raro8: Q('lo más raro'), ojos: Q('sus ojos'), oculista: Q('su oculista'), fuerte: Q('caja fuerte'), ny: Q('nueva york'),
  ojo: Q('ojo'), hijo: Q('el hijo de einstein'), toro: Q('a toro pasado'),
  listo: Q('más listo'), desaparecer: Q('pidió desaparecer'), acabo: Q('acabó en tarros'),
};
const ROSA_C = '#f2a7b8', VIDRIO = 'rgba(190,225,235,.55)', FORMOL = 'rgba(235,215,120,.55)', MADERA = '#b07a45';
/* ---------- figuras nuevas ---------- */
const brainInner = () => { const L = 'M150,30 C100,10 40,30 30,90 C14,120 20,170 60,190 C90,212 130,205 150,190 Z', R = 'M150,30 C200,10 260,30 270,90 C286,120 280,170 240,190 C210,212 170,205 150,190 Z';
  return `${cut(P(L) + P(R), 6, 8)}${D(L, ROSA_C, 5)}${D(R, ROSA_C, 5)}<path d="M150,32 V190" stroke="${INK}" stroke-width="5"/>
  <path d="M60,70 q20,-14 40,0 t40,0 M50,110 q24,-18 48,0 t44,-4 M64,150 q20,-14 40,0 t36,0 M160,70 q20,-14 40,0 t40,0 M158,110 q24,-18 48,0 t44,4 M164,150 q20,-14 40,0 t36,0" stroke="#b5677a" stroke-width="6" fill="none" stroke-linecap="round"/>`; };
const BRAIN = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 220 / 300, brainInner(), '0 0 300 220', Object.assign({ z: 9, origin: '50% 50%' }, o));
const jarInner = (contenido = '') => `${cut('<rect x="20" y="40" width="160" height="230" rx="26"/>', 5, 7)}<rect x="20" y="40" width="160" height="230" rx="26" fill="${VIDRIO}" stroke="${INK}" stroke-width="6"/>
  <rect x="26" y="90" width="148" height="174" rx="22" fill="${FORMOL}"/>${contenido}<rect x="10" y="14" width="180" height="40" rx="10" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><path d="M46,60 V250" stroke="#fff" stroke-width="10" opacity=".55" stroke-linecap="round"/>`;
const JAR = (c, x, y, w, cont, o = {}) => figura(c, x, y, w, w * 280 / 200, jarInner(cont), '0 0 200 280', Object.assign({ z: 8, origin: '50% 100%' }, o));
const trozo = (x, y, s = 36) => `<rect x="${x}" y="${y}" width="${s}" height="${s * 0.8}" rx="6" fill="${ROSA_C}" stroke="${INK}" stroke-width="3"/>`;
const ojoSvg = (x, y) => `<circle cx="${x}" cy="${y}" r="36" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="${x + 6}" cy="${y}" r="16" fill="#5a7fb5" stroke="${INK}" stroke-width="3"/><circle cx="${x + 8}" cy="${y}" r="7" fill="${INK}"/><path d="M${x - 26},${y + 22} q10,10 22,6" stroke="${RED}" stroke-width="2.5" fill="none"/>`;
const safeInner = () => `${FIGP('M20,20 L380,20 L380,400 L20,400 Z', '#7d8790', 7, .3)}<rect x="60" y="60" width="280" height="300" rx="10" fill="#2b2f33" stroke="${INK}" stroke-width="5"/>
  <g class="inside">${jarInner(ojoSvg(70, 170) + ojoSvg(130, 190)).replace(/<path d="M46/, '<path d="M46')}</g>
  <g class="door"><rect x="40" y="40" width="320" height="340" rx="12" fill="#98a2ab" stroke="${INK}" stroke-width="7"/><circle cx="200" cy="210" r="70" fill="#5c656d" stroke="${INK}" stroke-width="6"/><g class="dial">${[...Array(12)].map((_, i) => `<path d="M200,148 V164" transform="rotate(${i * 30} 200 210)" stroke="#fff" stroke-width="5"/>`).join('')}<path d="M200,210 L200,160" stroke="${RED}" stroke-width="10" stroke-linecap="round"/></g><rect x="320" y="170" width="24" height="80" rx="8" fill="${INK}"/></g>`;
const crateInner = () => `${FIGP('M10,60 L410,60 L410,290 L10,290 Z', MADERA, 6, .35)}${[100, 160, 220].map(y => `<path d="M10,${y} H410" stroke="${INK}" stroke-width="4" opacity=".5"/>`).join('')}
  <rect x="120" y="130" width="180" height="70" rx="8" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><text x="210" y="180" text-anchor="middle" font-family="Rye" font-size="44" fill="${RED}">CIDER</text><g class="tapa"><rect x="0" y="30" width="420" height="40" rx="6" fill="#8a5a34" stroke="${INK}" stroke-width="6"/></g>`;
const urnInner = () => `${FIGP('M60,60 C40,120 30,200 70,240 L130,240 C170,200 160,120 140,60 Z', '#3c4a63', 6, .3)}<rect x="50" y="36" width="100" height="30" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><rect x="60" y="240" width="80" height="20" rx="4" fill="${GOLD}" stroke="${INK}" stroke-width="5"/>`;
const hospInner = () => `${FIGP('M20,380 L20,80 L480,80 L480,380 Z', '#f3efe6', 6, .18)}<rect x="200" y="20" width="100" height="100" rx="10" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M250,40 V100 M220,70 H280" stroke="${RED}" stroke-width="18"/>${[0, 1].map(r => [0, 1, 2, 3, 4].map(k => `<rect x="${50 + k * 85}" y="${150 + r * 100}" width="50" height="60" fill="#9fd3e0" stroke="${INK}" stroke-width="4"/>`).join('')).join('')}<path d="M210,380 V320 H290 V380" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>`;
const docInner = () => `${FIGP('M0,0 L500,0 L500,620 L0,620 Z', '#FBF6EA', 6, .12)}<text x="250" y="90" text-anchor="middle" font-family="Rye" font-size="52" fill="${INK}">PERMISO</text>${[...Array(7)].map((_, k) => `<path d="M60,${160 + k * 50} H440" stroke="${INK}" stroke-width="4" opacity=".35"/>`).join('')}<path class="firma" pathLength="1" stroke-dasharray="0 1" d="M90,540 C130,480 150,580 190,520 S260,500 290,540 S360,520 410,500" stroke="#2b4a8c" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M80,560 H420" stroke="${INK}" stroke-width="3"/>`;
const EIN = (c, b) => mkEin(c, b, { seed: 1955 });
const viva = (f, t, o = {}) => einFace(f, t, Object.assign({ jaw: 0, look: [0, 0], bL: 0, bR: 0, fan: 0, seed: 0.4 }, o));

/* L0 · PORTADA: Einstein y su cerebro volando, con la palabra ROBADO */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 280, 'A Einstein le…', { size: 92 });
  const t2 = texto(c, 380, hlSpan('robaron', 'phl') + ' el cerebro', { size: 112, italic: true });
  const e = EIN(c, [250, 760, 580, 741]);
  const br = BRAIN(c, 610, 560, 330, { r: 14 });
  const arrow = box(c, 520, 610, 200, 200, { zIndex: 8 }, arrowSvg('M20,180 Q60,40 180,30', PINK, 12));
  const st = stamp(c, 600, 1000 - 140, 'ROBADO', { size: 76, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); viva(e, t, { bL: 14, bR: 14, sweat: true, look: [6, -4] }); set(br, { r: 14 + Math.sin(t * 3) * 6, y: -Math.abs(Math.sin(t * 2.5)) * 30 }); set(st, { r: -10, s: 1 + 0.04 * Math.sin(t * 6) }); };
}, { sfx: false });

/* L1 · lo más raro… te lo guardo para el final (caja fuerte cerrada) */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const s = figura(c, 290, 520, 500, 525, safeInner(), '0 0 400 420', { z: 6, origin: '50% 50%' });
  const dial = s.querySelector('.dial');
  aparece(chip(c, 330, 1120, 'abrir al final', { size: 70, bg: YEL, color: INK }), T.final1);
  return t => { dial.setAttribute('transform', `rotate(${f1(t * 140)} 200 210)`); set(s, { s: pop(t, L(1), 0.4), r: Math.sin(t * 10) * (t > T.final1 ? 1.5 : 0) }); };
});

/* L2 · abril de 1955: muere y pide que lo incineren */
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  sello(c, 310, 'ABRIL 1955', T.abril, { size: 120, r: -4, col: INK });
  const e = EIN(c, [120, 560, 460, 588]);
  const u = figura(c, 700, 760, 240, 312, urnInner(), '0 0 200 260', { z: 7 });
  aparece(chip(c, 610, 1110, 'incineración', { size: 60, bg: '#fff', color: INK }), T.incineren + 0.2);
  return t => { viva(e, t, { bL: 4, bR: 4, look: [8, 2] }); set(e.d, { o: 1 - 0.5 * p(t, T.muere, 0.8) }); set(u, { o: t > T.incineren - 0.2 ? 1 : 0, s: pop(t, T.incineren - 0.2, 0.4) }); };
});

/* L3 · el patólogo Thomas Harvey le saca el cerebro y se lo queda */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  const e = EIN(c, [40, 640, 400, 511]);
  const h = figura(c, 640, 640, 400, 511, bustInner({ moustache: false, seed: 77 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 430, 1180, 'Thomas Harvey, patólogo', { size: 48, bg: '#fff', color: INK }), T.harvey);
  const br = BRAIN(c, 140, 600, 200);
  sello(c, 330, '¡SE LO QUEDA!', T.queda, { size: 110, r: -6 });
  return t => { viva(e, t, { bL: 8, bR: 8, sweat: t > T.saca }); const k = p(t, T.saca, 1.2, E.inOutCubic); set(br, { o: t > T.saca - 0.1 ? 1 : 0, x: k * 560, y: -Math.sin(k * Math.PI) * 220 + k * 120, r: k * 360 }); set(h, { r: wobble(t, 0.4, 1.5), s: 1 + (t > T.queda ? 0.04 * Math.sin(t * 8) : 0) }); };
});

/* L4 · sin permiso: el hospital se lo reclama, se niega, lo despiden */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const hs = figura(c, 90, 360, 520, 416, hospInner(), '0 0 500 400', { z: 5 });
  const bub = chip(c, 480, 380, '¿Y el cerebro?', { size: 60, bg: '#fff', color: INK, z: 30 });
  const h = figura(c, 600, 720, 380, 486, bustInner({ seed: 77 }), '0 0 360 460', { z: 6 });
  const no = texto(c, 760, 'NO', { size: 130, x: 560, w: 300, color: RED });
  sello(c, 1180, 'DESPEDIDO', T.despiden, { size: 130, r: -6 });
  return t => { popA(bub, t, T.hospital, { r: -3 }); set(no, { o: t > T.niega && t < T.despiden ? 1 : 0, s: pop(t, T.niega, 0.3) }); set(h, { r: t > T.niega ? Math.sin(t * 16) * 5 : 0 }); };
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · 240 trozos → tarros → caja de sidra */
plano(L(6) - 0.1, T.sidra - 0.25, PAPEL, c => {
  const br = BRAIN(c, 290, 380, 500);
  const g = box(c, 90, 360, 900, 520, { zIndex: 10 }); let s = ''; for (let i = 0; i < 240; i++) s += trozo((i % 20) * 44, Math.floor(i / 20) * 40, 36);
  g.innerHTML = `<svg width="900" height="520" style="overflow:visible">${s}</svg>`; const rs = [...g.querySelectorAll('rect')];
  const n = texto(c, 900, '0', { size: 150, color: RED });
  const js = [0, 1, 2].map(i => JAR(c, 140 + i * 290, 1060, 220, [0, 1, 2, 3, 4].map(k => trozo(50 + (k % 2) * 56, 120 + Math.floor(k / 2) * 44, 40)).join('')));
  return t => { const k = p(t, T.corta, T.trozos + 1.0 - T.corta, E.linear); set(br, { o: 1 - k * 3 }); const vis = Math.round(k * 240); rs.forEach((r, i) => r.style.opacity = i < vis ? 1 : 0); n.textContent = String(vis); set(g, { o: 1 - p(t, T.tarros - 0.3, 0.3) }); set(n, { o: 1 - p(t, T.tarros - 0.3, 0.3) }); js.forEach((j, i) => set(j, { o: t > T.tarros - 0.2 + i * 0.12 ? 1 : 0, s: pop(t, T.tarros - 0.2 + i * 0.12, 0.35) })); };
});
plano(T.sidra - 0.25, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  const js = [0, 1, 2].map(i => JAR(c, 200 + i * 230, 520, 180, trozo(60, 140) + trozo(100, 190)));
  const cr = figura(c, 120, 820, 840, 600, crateInner(), '0 0 420 300', { z: 9, origin: '50% 100%' });
  const tapa = cr.querySelector('.tapa');
  return t => { const k = p(t, T.sidra + 0.2, 0.6, E.inOutCubic); js.forEach((j, i) => set(j, { y: k * 520, o: 1 - p(t, T.sidra + 0.7, 0.2) })); tapa.setAttribute('transform', `translate(0 ${f1((1 - p(t, T.sidra + 0.8, 0.3, E.outBack)) * -160)})`); set(cr, { s: pop(t, T.sidra - 0.2, 0.4) }); };
});

/* L7 · no lo devuelve hasta 1998: 43 años */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#EFE1C6' }, c => {
  const line = box(c, 140, 820, 800, 16, { zIndex: 5, background: INK, borderRadius: '8px', transformOrigin: '0 50%' });
  texto(c, 660, '1955', { size: 90, x: 40, w: 300 }); const b = texto(c, 660, '1998', { size: 90, x: 740, w: 300, color: RED });
  const cr = figura(c, 100, 880, 200, 143, crateInner(), '0 0 420 300', { z: 8 });
  const n = texto(c, 1060, '0 años', { size: 140, color: RED });
  return t => { const k = p(t, T.devuelve, T.anos + 0.6 - T.devuelve, E.inOutCubic); set(line, { sx: k }); set(cr, { x: k * 700, r: Math.sin(t * 14) * 3 }); set(b, { o: t > T.m1998 ? 1 : 0 }); n.textContent = Math.round(k * 43) + ' años'; };
});

/* L8 · PAGO DEL GANCHO: la caja fuerte se abre… sus ojos */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#C9D3E6' }, c => {
  const s = figura(c, 240, 420, 600, 630, safeInner(), '0 0 400 420', { z: 6, origin: '50% 50%' });
  const door = s.querySelector('.door'), ins = s.querySelector('.inside');
  ins.setAttribute('transform', 'translate(100 70) scale(1)');
  sello(c, 1060, 'SUS OJOS', T.ojos, { size: 130, r: -5 });
  aparece(chip(c, 330, 1270 - 20, 'caja fuerte · Nueva York', { size: 52, bg: YEL, color: INK }), T.ny, { sfx: false });
  return t => { const k = p(t, T.ojos - 0.4, 0.7, E.inOutCubic); door.setAttribute('transform', `translate(${f1(40 * (1 - Math.cos(k * Math.PI / 2)) * 9)} 0) scale(${f1((1 - k * 0.92) * 1000) / 1000} 1)`); set(s, { s: 1 + 0.06 * p(t, T.ojos, 2) }); };
});

/* L9 · OJO: el permiso del hijo, a toro pasado */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const d = figura(c, 380, 480, 420, 520, docInner(), '0 0 500 620', { z: 6 });
  const firma = d.querySelector('.firma');
  aparece(chip(c, 400, 1030, 'el hijo de Einstein', { size: 56, bg: '#fff', color: INK }), T.hijo);
  aparece(chip(c, 420, 1150, 'a toro pasado', { size: 62, bg: PINK }), T.toro);
  return t => firma.setAttribute('stroke-dasharray', `${f1(p(t, T.hijo + 0.3, 1.0) * 1000) / 1000} 1`);
});

/* L10 · O sea */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, 'El más listo…', '…acabó en tarros', { y: 470, size: 140, size2: 120, t2: T.acabo - 0.1, draw: c => { const j = JAR(c, 420, 880, 240, trozo(60, 140) + trozo(100, 190) + trozo(70, 220)); FX.fns.push(t => set(j, { r: Math.sin(t * 3) * 4 })); } });

/* L11 · pregunta final */
preguntaFinal('¿Qué parte te parece', 'más rara?', { size: 92, draw: c => [['el cerebro en tarros', ROSA_C], ['la caja de sidra', YEL], ['los ojos en la caja fuerte', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 100 + i * 40, 620 + i * 160, s, { size: 54, bg: col, color: INK }), L(11) + 0.4 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre (clip reutilizado del ep55) */
cierre(63, 'El cerebro de Einstein', ['EINSTEIN', '1955']);

Story.run({ ovalo: [[L(9), L(10) - 0.15]] });
