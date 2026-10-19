/* Ep. 54 · «América» no era de Estados Unidos — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  nombre0: Q('un nombre'), suyo0: Q('no era suyo'), mapa1: Q('el primer mapa'), america1: Q('américa'), brasil1: Q('en brasil'),
  ano: Q('año mil quinientos siete'), aleman: Q('un alemán'), mundo: Q('nuevo mundo'), llama: Q('lo llama'), americo: Q('américo vespucio'),
  donde: Q('dónde escribe'), sur: Q('en el sur'), hoyB: Q('hoy está brasil'),
  espera: Q('pero espera'), seis: Q('seis años después'), nuevo4: Q('en su nuevo mapa'), noesta: Q('ya no está'),
  tarde: Q('demasiado tarde'), mil538: Q('mil quinientos treinta y ocho'), mercator: Q('mercator'), norte: Q('hasta el norte'),
  espana7: Q('y españa'), indias: Q('las indias'),
  mil776: Q('mil setecientos setenta y seis'), trece: Q('trece colonias'), indep: Q('se independizan'), eeuu: Q('estados unidos de américa'),
  desde: Q('desde entonces'), americano: Q('americano'), solo: Q('solo ellos'),
  ojo: Q('ojo'), nicaragua: Q('nicaragua'), casi: Q('casi ningún historiador'),
  hoyEs: Q('hoy es brasil'),
};
const AZUL = '#1f3a6b', PERG = '#E8D5A8';
/* mapa antiguo (vb 0 0 600 760): modo 1507 = nombre en el sur · 1513 = sin nombre · 1538 = norte y sur */
const NORTE = 'M110,90 C200,55 340,62 410,105 C440,150 395,195 350,225 C318,272 290,298 258,328 C232,296 185,258 152,220 C112,180 88,130 110,90 Z';
const SUR = 'M300,402 C362,390 436,420 474,470 C486,522 446,562 414,604 C384,652 352,702 332,734 C316,692 300,642 290,592 C270,522 262,452 300,402 Z';
const lbl = (cls, x, y, s, rot = 0) => `<g class="${cls}" transform="translate(${x},${y}) rotate(${rot})"><text x="0" y="0" text-anchor="middle" font-family="Rye" font-size="${s}" fill="${RED}">AMERICA</text></g>`;
const mapaInner = () => `${FIGP('M0,0 L600,0 L600,760 L0,760 Z', PERG, 6, .25)}<path d="M18,18 L582,18 L582,742 L18,742 Z" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/>
  ${[150, 300, 450, 600].map(y => `<path d="M18,${y} H582" stroke="${INK}" stroke-width="2" opacity=".25"/>`).join('')}${[150, 300, 450].map(x => `<path d="M${x},18 V742" stroke="${INK}" stroke-width="2" opacity=".25"/>`).join('')}
  ${FIGP(NORTE, FIG, 5, .35)}<path d="M258,328 C276,352 290,378 300,402" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/>${FIGP(SUR, FIG, 5, .35)}
  <path class="brasil" d="M330,440 C390,430 445,455 462,490 C452,540 420,575 380,580 C350,560 330,520 322,480 Z" fill="${'#2e9e5b'}" opacity="0"/>
  ${lbl('lS', 382, 528, 52, -8)}${lbl('lN', 262, 168, 52, -4)}
  <g transform="translate(520,660)"><circle r="44" fill="none" stroke="${INK}" stroke-width="4"/><path d="M0,-40 L10,0 L0,40 L-10,0 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/></g>`;
const MAPA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 760 / 600, mapaInner(), '0 0 600 760', Object.assign({ z: 6, origin: '50% 50%' }, o));
const op = (m, cls, v) => { const g = m.querySelector('.' + cls); if (g) g.setAttribute('opacity', v); };
const BANDERA = (c, x, y, w) => { const h = w * 0.62, b = box(c, x, y, w, h, { zIndex: 7, transformOrigin: '0 50%' });
  b.innerHTML = `<svg viewBox="0 0 380 236" width="100%" height="100%" style="overflow:visible">${cut('<rect x="0" y="0" width="380" height="236"/>')}${[...Array(13)].map((_, i) => `<rect x="0" y="${i * 236 / 13}" width="380" height="${236 / 13 + 0.5}" fill="${i % 2 ? '#fff' : RED}"/>`).join('')}<rect x="0" y="0" width="160" height="127" fill="${AZUL}"/>${[...Array(12)].map((_, i) => `<text x="${18 + (i % 4) * 38}" y="${34 + Math.floor(i / 4) * 38}" font-size="26" fill="#fff">★</text>`).join('')}<rect x="0" y="0" width="380" height="236" fill="none" stroke="${INK}" stroke-width="6"/></svg>`; return b; };
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 140, color: INK }, o));

/* L0 · PORTADA: «Estados Unidos se quedó un nombre que no era suyo» */
plano(-1, L(1) - 0.1, { background: AZUL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.18)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '🇺🇸 Estados Unidos se quedó…', { size: 62, color: '#fff' });
  const t2 = texto(c, 390, hlSpan('un nombre que', 'phl') + '<br>no era suyo', { size: 104, italic: true, color: '#fff', shadow: OUTL(INK, 6) });
  const tag = figura(c, 190, 720, 700, 420, nameTagInner('AMÉRICA'), '0 0 700 420', { z: 7, origin: '50% 50%' });
  sello(c, 1180, '¡NO ERA SUYO!', T.suyo0, { size: 110, r: -7, bg: 'rgba(255,255,255,.85)' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1.2), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(tag, { r: -4 + Math.sin(t * 2.5) * 3, s: 1 + 0.02 * Math.sin(t * 5) }); };
}, { sfx: false });

/* L1 · el primer mapa con «América»… la puso en Brasil */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#C9D3E6' }, c => {
  const m = MAPA(c, 190, 400, 700);
  op(m, 'lN', 0);
  aparece(chip(c, 560, 1080, '📍 ¡Brasil!', { size: 70, bg: '#2e9e5b' }), T.brasil1, { sfx: 'ding' });
  return t => { set(m, { s: pop(t, L(1), 0.45), r: Math.sin(t * 1.4) * 2 }); op(m, 'lS', t > T.america1 ? (0.6 + 0.4 * Math.sin(t * 9)) : 0); op(m, 'brasil', t > T.brasil1 ? 0.55 : 0); };
});

/* L2 · 1507: un alemán dibuja el Nuevo Mundo y lo llama «América» por Américo Vespucio */
plano(L(2) - 0.1, T.llama - 0.1, PAPEL, c => {
  sello(c, 330, '1507', T.ano, { size: 150, r: -4 });
  const b = figura(c, 340, 620, 400, 511, bustInner({ moustache: true, hat: 'slouch', seed: 12 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 300, 1170, '🇩🇪 cartógrafo alemán', { size: 60, bg: YEL, color: INK }), T.aleman);
  aparece(chip(c, 330, 1290, '🌎 el Nuevo Mundo', { size: 60, bg: '#fff', color: INK }), T.mundo);
  return t => set(b, { r: wobble(t, 0.4, 1.5) });
});
plano(T.llama - 0.1, L(3) - 0.1, { background: '#E9D7B0' }, c => {
  const nm = PAL(c, 600, '«AMÉRICA»', { color: RED, size: 160 });
  const b = figura(c, 390, 820, 300, 383, bustInner({ beard: true, seed: 3 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 250, 1240, '⛵ Américo Vespucio', { size: 64, bg: PINK }), T.americo, { sfx: 'pop2' });
  return t => { set(nm, { s: pop(t, T.llama + 0.3, 0.4), o: t > T.llama + 0.3 ? 1 : 0, r: -3 }); set(b, { o: t > T.americo - 0.2 ? 1 : 0, s: pop(t, T.americo - 0.2, 0.4) }); };
});

/* L3 · ¿dónde escribe el nombre? En el sur: donde hoy está Brasil */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#C9D3E6' }, c => {
  const m = MAPA(c, 150, 380, 780);
  op(m, 'lN', 0);
  const ring = box(c, 150 + 780 * 0.42, 380 + 780 * 1.267 * 0.6, 780 * 0.4, 780 * 0.2, { zIndex: 9, borderRadius: '50%', border: `14px solid ${PINK}` });
  sello(c, 1400, '¡EN BRASIL!', T.hoyB, { size: 120, r: -6 });
  return t => { set(m, { s: 1 + 0.08 * p(t, T.sur, 1.0) }); set(ring, { o: t > T.sur ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 7) }); op(m, 'brasil', t > T.hoyB ? 0.55 : 0); };
});

/* L4 · pero espera: seis años después, en su nuevo mapa, el nombre ya no está */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  sello(c, 330, '1513', T.seis, { size: 140, r: 4, col: INK });
  const m = MAPA(c, 230, 560, 620);
  op(m, 'lN', 0);
  aparece(qMark(c, 800, 900, 160, PINK), T.noesta, { sfx: 'boing' });
  aparece(chip(c, 260, 1390, '¿y el nombre? 🤔', { size: 64, bg: YEL, color: INK }), T.noesta + 0.3);
  return t => { set(m, { r: wobble(t, 0.4, 2), s: pop(t, T.nuevo4 - 0.2, 0.4), o: t > T.nuevo4 - 0.2 ? 1 : 0 }); op(m, 'lS', 1 - p(t, T.noesta - 0.2, 0.4)); };
});

/* L5 · demasiado tarde: en 1538 Mercator lo estira hasta el norte */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 230, 330, '1538 · Mercator 🧭', { size: 70, bg: YEL, color: INK }), T.mil538, { sfx: 'stamp' });
  const m = MAPA(c, 190, 470, 700);
  const fl = box(c, 600, 640, 200, 360, { zIndex: 12 }, arrowSvg('M60,340 Q160,180 60,20', PINK, 14));
  return t => { op(m, 'lS', 1); op(m, 'lN', p(t, T.norte, 0.4)); set(fl, { o: t > T.mercator ? 1 : 0, sy: p(t, T.mercator, 0.5) }); set(m, { r: Math.sin(t * 1.3) * 2 }); };
});

/* L6 · CTA de seguir a mitad de vídeo */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · y España ni lo llamaba América: «las Indias» */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 380, 330, '🇪🇸 España', { size: 72, bg: RED }), T.espana7);
  const a = PAL(c, 520, '«América»', { size: 120, color: '#8a7a66' });
  const x = box(c, 300, 500, 480, 170, { zIndex: 25 }, XSVG);
  const lib = figura(c, 160, 760, 760, 480, libroViejoInner('ARCHIVO', ['las', 'Indias']), '0 0 760 480', { z: 6, origin: '50% 50%' });
  return t => { set(a, { o: t > T.espana7 + 0.4 ? 1 : 0 }); set(x, { o: t > T.espana7 + 1.0 ? 1 : 0, s: pop(t, T.espana7 + 1.0, 0.3) }); set(lib, { o: t > T.indias - 0.2 ? 1 : 0, s: pop(t, T.indias - 0.2, 0.4) }); };
});

/* L8 · 1776: trece colonias se independizan como «Estados Unidos de América» */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#F1E6D0' }, c => {
  sello(c, 330, '1776', T.mil776, { size: 140, r: -4, col: AZUL });
  const st = [...Array(13)].map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 13; return texto(c, 840 + Math.sin(a) * 230, '★', { size: 90, x: 490 + Math.cos(a) * 230, w: 100, color: AZUL }); });
  const fl = BANDERA(c, 300, 720, 480);
  const n = texto(c, 1130, 'Estados Unidos<br>de ' + hlSpan('América', 'shl'), { size: 96, italic: true });
  return t => { st.forEach((s, i) => set(s, { s: pop(t, T.trece + i * 0.06, 0.3), o: t > T.trece + i * 0.06 && t < T.indep ? 1 : 0 })); set(fl, { o: t > T.indep ? 1 : 0, s: pop(t, T.indep, 0.4), sy: 1 + 0.03 * Math.sin(t * 6) }); set(n, { o: t > T.eeuu - 0.1 ? 1 : 0, s: pop(t, T.eeuu - 0.1, 0.35) }); paint(c.querySelector('.shl'), t, T.eeuu + 0.8, 0.35); };
});

/* L9 · y desde entonces, «americano»… son solo ellos */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const a = PAL(c, 360, '«americano» =', { size: 110 });
  const us = chip(c, 330, 560, '🇺🇸 solo ellos', { size: 80, bg: AZUL, z: 30 });
  const fuera = ['🇲🇽 México', '🇦🇷 Argentina', '🇧🇷 Brasil', '🇨🇴 Colombia', '🇵🇪 Perú', '🇨🇱 Chile'].map((s, i) => chip(c, 90 + (i % 2) * 480, 800 + Math.floor(i / 2) * 170, s, { size: 58, bg: '#fff', color: INK }));
  return t => { popA(us, t, T.solo - 0.2, { r: -3 }); fuera.forEach((f, i) => set(f, { s: pop(t, T.desde + i * 0.12, 0.3), o: t < T.desde + i * 0.12 ? 0 : (t > T.solo ? 0.25 : 1), r: t > T.solo ? (i % 2 ? 8 : -8) : 0, y: t > T.solo ? 30 * p(t, T.solo, 0.4) : 0 })); };
});
emu(T.solo + 0.9);

/* L10 · OJO: unas montañas de Nicaragua */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const mt = box(c, 240, 600, 600, 300, { zIndex: 6 });
  mt.innerHTML = `<svg viewBox="0 0 600 300" width="100%" height="100%" style="overflow:visible">${FIGP('M0,300 L170,60 L270,190 L380,20 L600,300 Z', '#8fb07a', 6, .3)}<path d="M350,60 L380,20 L410,62 L390,52 L372,66 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`;
  aparece(chip(c, 310, 960, '⛰️ Amerrisque, Nicaragua', { size: 58, bg: YEL, color: INK }), T.nicaragua);
  aparece(chip(c, 350, 1110, 'casi nadie lo cree 🤔', { size: 60, bg: PINK }), T.casi);
  return t => set(mt, { s: pop(t, T.nicaragua - 0.3, 0.4), o: t > T.nicaragua - 0.3 ? 1 : 0 });
});

/* L11 · O sea: el primer sitio que se llamó «América»… hoy es Brasil */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, '«América»…', '…hoy es Brasil 🇧🇷', { y: 520, size: 150, size2: 104, t2: T.hoyEs - 0.2 });

/* L12 · pregunta final */
preguntaFinal('¿En tu país,', 'quién es americano?', { size: 92, draw: c => [['🇺🇸 solo ellos', AZUL], ['🌎 todos', '#2e9e5b'], ['¿y en el tuyo? 👇', PINK]].map(([s, col], i) => aparece(chip(c, 140 + i * 60, 620 + i * 160, s, { size: 58, bg: col }), L(12) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(54, '¿De quién es «América»?', ['AMÉRICA', 'desde 1507']);

Story.run({ ovalo: [[L(10), L(11) - 0.15]] });
