/* Ep. 50 · «Gringo» no viene de «Green, go home» (y «guiri» viene de una guerra) — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  green0: Q('green go home'), prueba1: Q('la prueba'), dicc1: Q('un diccionario'), antes1: Q('de antes de esa guerra'),
  gringo3: Q('gringo'), guiri3: Q('guiri'), tres3: Q('tres pasos'),
  mito: Q('el mito'), guerra4: Q('la guerra entre méxico'), gritaban: Q('gritaban'), verde: Q('uniforme verde'), greenGo: Q('green go'),
  problema: Q('pequeño problema'), azul: Q('de azul'),
  prueba6: Q('la prueba'), anio6: Q('mil setecientos ochenta y siete'), dicc6: Q('un diccionario español'), malaga: Q('en málaga'), acento: Q('acento raro'), madrid: Q('en madrid'), irlandeses: Q('irlandeses'),
  sesenta: Q('sesenta años antes'), griego7: Q('griego'), noEnt: Q('no se entiende'), suena: Q('me suena a griego'),
  guiri8: Q('el guiri'), enEsp: Q('y en españa'), nace: Q('nace en una guerra'), carlistas: Q('las guerras carlistas'),
  guiristinos: Q('guiristinos'), reina: Q('maría cristina'), guardia: Q('el guardia civil'), turista: Q('el turista'),
  ojo: Q('ojo'), aceptado: Q('lo más aceptado'), otro: Q('otro origen'),
  osea: Q('o sea'), inventamos: Q('los inventamos en españa'),
};
const TORSO = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
const SOLD = (c, x, y, w, seed, col = '#4f7a3a') => { const f = figura(c, x, y, w, w * 460 / 360, bustInner({ moustache: seed % 2 === 0, seed }) + `<path class="uni" d="${TORSO}" fill="${col}" opacity=".78" stroke="${INK}" stroke-width="6"/><circle cx="180" cy="390" r="9" fill="${BRASS}"/><circle cx="180" cy="425" r="9" fill="${BRASS}"/>`, '0 0 360 460', { z: 6 }); f.uni = f.querySelector('.uni'); return f; };
const LIBRO = (c, x, y, w, tit, ls, o = {}) => figura(c, x, y, w, w * 480 / 760, libroViejoInner(tit, ls), '0 0 760 480', Object.assign({ z: 6, origin: '50% 50%' }, o));
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 150, color: INK }, o));
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));

/* L0 · PORTADA: «Gringo NO viene de "Green, go"» con soldado de verde */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '«Gringo» NO viene de', { size: 92 });
  const t2 = texto(c, 410, hlSpan('«Green, go»', 'phl'), { size: 150, italic: true });
  const s = SOLD(c, 290, 700, 500, 12);
  aparece(chip(c, 520, 680, '«¡Green, go!»', { size: 62, bg: '#fff', color: INK }), -0.5);
  sello(c, 1300, '¡FALSO!', T.green0 + 0.8, { size: 170, r: -8 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(s, { r: wobble(t, 0.5, 2) }); };
}, { sfx: false });

/* L1 · la prueba: un diccionario de antes de esa guerra */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const b = LIBRO(c, 120, 600, 840, 'DICCIONARIO', ['Gringo:', '«extranjero', 'que habla', 'raro»']);
  aparece(chip(c, 380, 480, '📖 1787', { size: 76, bg: YEL, color: INK }), T.dicc1, { sfx: 'stamp' });
  sello(c, 1250, '¡ANTES!', T.antes1, { size: 170, r: -6 });
  sfx('paper', T.dicc1, 0.7);
  return t => set(b, { s: pop(t, L(1), 0.4), r: -2 + wobble(t, 0.5, 1) });
});

/* L2 · marca */
marca(2);

/* L3 · GRINGO y GUIRI */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = PAL(c, 420, '«GRINGO»', { color: '#2f7a4a' }), b = PAL(c, 700, '«GUIRI»', { color: RED });
  [0, 1].map(i => aparece(qMark(c, 880 - i * 800, 420 + i * 300, 120, i ? YEL : PINK), T.guiri3 + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(a, { s: pop(t, T.gringo3, 0.35), o: t > T.gringo3 ? 1 : 0, r: -3 }); set(b, { s: pop(t, T.guiri3, 0.35), o: t > T.guiri3 ? 1 : 0, r: 3 }); };
});

/* PASO 1 · el mito (L4–L5): soldados «de verde»… que iban de azul */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('mito', 'shl'), T.mito);
plano(L(4) - 0.1, L(6) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 200, 560, '🇲🇽 vs 🇺🇸 · 1846', { size: 66, bg: '#fff', color: INK }), T.guerra4, { sfx: 'thud' });
  const ss = [0, 1, 2].map(i => SOLD(c, 40 + i * 340, 760, 300, 12 + i * 5));
  const grito = aparece(chip(c, 240, 680, '«¡GREEN, GO!» 📢', { size: 70, bg: '#2f7a4a' }), T.greenGo - 0.2, { sfx: 'boing' });
  const ch = aparece(chip(c, 230, 1260, 'pequeño problema… 🤏', { size: 58, bg: YEL, color: INK }), T.problema);
  sello(c, 1400, '¡IBAN DE AZUL!', T.azul, { size: 120, r: -6 });
  return t => ss.forEach((s, i) => { const k = p(t, T.azul - 0.2 + i * 0.12, 0.25); s.uni.setAttribute('fill', k > 0.5 ? '#2f4f9a' : '#4f7a3a'); set(s, { s: 1 + 0.1 * Math.sin(Math.PI * k), y: t > T.gritaban && t < T.problema ? -Math.abs(Math.sin(t * 6 + i)) * 18 : 0 }); });
});

/* PASO 2 · la prueba (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'La ' + hlSpan('prueba', 'shl'), T.prueba6);
plano(L(6) - 0.1, T.malaga - 0.1, { background: '#E9D7B0' }, c => {
  const a = texto(c, 520, '1787', { size: 240, color: RED, shadow: OUTL(INK, 8) });
  const b = LIBRO(c, 120, 860, 840, 'DICCIONARIO', ['Terreros', 'y Pando']);
  sfx('paper', T.dicc6, 0.7);
  return t => { set(a, { s: pop(t, T.anio6, 0.4), o: t > T.anio6 ? 1 : 0, r: -4 }); set(b, { s: pop(t, T.dicc6, 0.4), o: t > T.dicc6 ? 1 : 0 }); };
});
plano(T.malaga - 0.1, T.madrid - 0.1, PAPEL, c => {
  const b = LIBRO(c, 40, 520, 1000, 'GRINGOS', ['«Gringos llaman', 'en Málaga a los', 'extranjeros…»']);
  aparece(chip(c, 240, 1260, '…con acento raro 🗣️', { size: 62, bg: YEL, color: INK }), T.acento);
  return t => set(b, { r: -1 + wobble(t, 0.4, 1) });
});
plano(T.madrid - 0.1, L(7) - 0.1, { background: '#C9E0C9' }, c => {
  aparece(chip(c, 300, 520, '📍 Madrid', { size: 76, bg: RED }), T.madrid);
  const tr = texto(c, 700, '☘️', { size: 340 });
  aparece(chip(c, 220, 1180, '¡a los IRLANDESES!', { size: 76, bg: '#2f7a4a' }), T.irlandeses, { sfx: 'tada' });
  return t => set(tr, { r: Math.sin(t * 3) * 12, s: pop(t, T.irlandeses - 0.3, 0.4), o: t > T.irlandeses - 0.3 ? 1 : 0 });
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#E9D7B0' }, c => {
  sello(c, 600, '¡60 AÑOS ANTES!', T.sesenta, { size: 96, r: -6 });
  const g = PAL(c, 820, 'GRI<span style="color:#C8102E">E</span>GO', { size: 170 });
  const n = PAL(c, 1040, 'GRI<span style="color:#2f7a4a">N</span>GO', { size: 170 });
  aparece(chip(c, 180, 1300, '«me suena a griego» 🏛️', { size: 64, bg: YEL, color: INK }), T.suena);
  return t => { set(g, { o: t > T.griego7 ? 1 : 0, s: pop(t, T.griego7, 0.35) }); set(n, { o: t > T.griego7 + 0.8 ? 1 : 0, s: pop(t, T.griego7 + 0.8, 0.35), r: -3 }); };
});

/* PASO 3 · el guiri (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'El ' + hlSpan('guiri', 'shl'), T.guiri8);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 360, 560, '🇪🇸 ¿y aquí?', { size: 70, bg: '#fff', color: INK }), T.enEsp);
  const can = figura(c, 270, 700, 540, 334, cannonInner(0), '0 0 420 260', { z: 6 });
  aparece(chip(c, 180, 1150, '⚔️ guerras carlistas', { size: 72, bg: RED }), T.carlistas, { sfx: 'thud' });
  return t => can.firstChild.innerHTML = cannonInner(t > T.carlistas && t < T.carlistas + 0.5 ? 1 : 0);
});
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const cr = figura(c, 400, 480, 240, 180, crownInner(), '0 0 400 300', { z: 6 });
  [['«guiristinos» 👑', T.guiristinos, '#7a4a9a'], ['guardia civil 🎩', T.guardia, '#2f7a4a'], ['turista 📸🩴', T.turista, RED]].map(([s, t0, col], i) => {
    aparece(chip(c, 200 + i * 60, 760 + i * 220, s, { size: 70, bg: col }), t0, { sfx: 'pop2' });
    if (i) aparece(texto(c, 650 + i * 220, '⬇️', { size: 70, x: 470, w: 140 }), t0 - 0.3);
  });
  aparece(chip(c, 300, 690, 'soldados de María Cristina', { size: 44, bg: '#fff', color: INK }), T.reina);
  return t => set(cr, { r: wobble(t, 0.5, 3), o: t < T.guardia ? 1 : 0.3 });
});
emu(T.turista + 1.0);

/* L10 · OJO: lo de «griego» es lo más aceptado */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  PAL(c, 640, 'griego → gringo', { size: 110 });
  aparece(chip(c, 300, 880, 'lo más aceptado ✓', { size: 62, bg: '#9fd3c0', color: INK }), T.aceptado);
  aparece(chip(c, 380, 1040, 'otras teorías 🤔', { size: 62, bg: PINK }), T.otro);
});

/* L11 · O sea: gringo y guiri los inventamos en España */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, '«Gringo» y «guiri»…', '…¡son de aquí! 🇪🇸', { y: 480, size: 120, size2: 96, t2: T.inventamos - 0.3, draw: c => LIBRO(c, 240, 980, 600, 'DICCIONARIO', ['Gringo', 'Guiri']) });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final */
preguntaFinal('¿Cómo llamáis', 'a los extranjeros?', { size: 108, draw: c => [['gringo 🇲🇽', '#2f7a4a'], ['guiri 🇪🇸', RED], ['yuma 🇨🇺', '#2f5a9a'], ['¿y tú? 👇', YEL]].map(([s, col], i) => aparece(chip(c, 140 + (i % 2) * 420, 680 + Math.floor(i / 2) * 200, s, { size: 66, bg: col, color: i === 3 ? INK : '#fff' }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(50, '¿De dónde viene «gringo»?', ['IDIOMA', 'y acentos']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
