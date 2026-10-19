/* Ep. 55 · Si eres español, hablas azteca todos los días — formato ráfaga de palabras (librería: engine/story.js) */
Story.prepara();
const T = {
  azteca0: Q('hablas azteca'), nevera: Q('en la nevera'),
  tomate: Q('tomate'), nahuatl: Q('en náhuatl'), tomatl: Q('tomatl'),
  aguacate: Q('aguacate'), ahuacatl: Q('ahuacatl'), testiculo: Q('testículo'),
  chicle: Q('chicle'), tzictli: Q('tzictli'), cacahuete: Q('y cacahuete'), tlal: Q('tlalcacahuatl'), cacaoT: Q('el cacao de la tierra'),
  clase: Q('hablando de clase'), tiza: Q('la tiza'), azteca6: Q('también es azteca'), tizatl: Q('tizatl'),
  pelea: Q('la pelea'), mexico: Q('en méxico'), cacahuate: Q('cacahuate'), sud: Q('en sudamérica'), mani: Q('maní'), caribe: Q('del caribe'),
  ojo: Q('ojo'), choco: Q('chocolate'),
  guaca: Q('sin guacamole'), pizarra: Q('sin pizarra'),
};
const VERDE = '#1d5c3a';
const EMO = (c, x, y, e, sz = 300) => texto(c, y, e, { size: sz, x, w: sz * 1.3 });
/* tarjeta de ráfaga: emoji gigante + palabra en español + sello con la palabra náhuatl */
function tarjeta(t0, t1, bg, emo, es, nah, tNah, extra) {
  plano(t0, t1, { background: bg }, c => {
    rays(c, -160, 420, 1400, 20, 'rgba(255,255,255,.16)', 'rgba(0,0,0,0)', 0);
    const e = EMO(c, 345, 420, emo);
    const w = texto(c, 840, es, { size: 150, color: '#fff', shadow: OUTL(INK, 8) });
    const n = sello(c, 1080, '«' + nah + '»', tNah, { size: 110, r: -5, bg: 'rgba(255,255,255,.9)', col: INK });
    aparece(chip(c, 380, 1270, '🗿 náhuatl', { size: 56, bg: YEL, color: INK }), tNah + 0.2, { sfx: false });
    if (extra) extra(c);
    return t => { set(e, { s: pop(t, t0 + 0.05, 0.4), r: Math.sin(t * 3) * 6, y: -Math.abs(Math.sin(t * 4)) * 20 }); set(w, { s: pop(t, t0 + 0.15, 0.35), r: -2 }); };
  });
}

/* L0 · PORTADA */
plano(-1, L(1) - 0.1, { background: VERDE }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.2)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '🇪🇸 Si eres español…', { size: 80, color: '#fff' });
  const t2 = texto(c, 410, 'hablas ' + hlSpan('AZTECA', 'phl'), { size: 130, italic: true, color: '#fff', shadow: OUTL(INK, 7) });
  const es = ['🍅', '🥑', '🥜'].map((e, i) => EMO(c, 60 + i * 330, 700, e, 250));
  const d = texto(c, 1040, 'todos los días', { size: 84, color: YEL, shadow: OUTL(INK, 6) });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); es.forEach((e, i) => set(e, { y: -Math.abs(Math.sin(t * 4 + i)) * 40, r: Math.sin(t * 3 + i) * 8 })); set(d, { r: 2 }); };
}, { sfx: false });

/* L1 · mira lo que tienes en la nevera */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const f = box(c, 290, 420, 500, 900, { zIndex: 6, background: '#f4f7fb', border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 14px 0 ${INK}` });
  box(f, 0, 300, 484, 8, { background: INK }); box(f, 410, 120, 20, 120, { background: INK, borderRadius: '10px' }); box(f, 410, 380, 20, 160, { background: INK, borderRadius: '10px' });
  const es = ['🍅', '🥑', '🥜', '🍫'].map((e, i) => EMO(c, 310 + (i % 2) * 230, 820 + Math.floor(i / 2) * 210, e, 150));
  aparece(qMark(c, 820, 460, 150, PINK), T.nevera);
  return t => es.forEach((e, i) => set(e, { s: pop(t, L(1) + 0.4 + i * 0.3, 0.35), o: t > L(1) + 0.4 + i * 0.3 ? 1 : 0 }));
});

/* L2–L4 · ráfaga */
tarjeta(L(2) - 0.1, L(3) - 0.1, '#C8102E', '🍅', 'TOMATE', 'tomatl', T.tomatl);
tarjeta(L(3) - 0.1, L(4) - 0.1, '#3f7d2a', '🥑', 'AGUACATE', 'ahuacatl', T.ahuacatl, c => {
  const s = sello(c, 270, '= ¡TESTÍCULO!', T.testiculo, { size: 90, r: 5, col: RED, bg: 'rgba(255,255,255,.95)' });
  sfx('boing', T.testiculo + 0.4, 0.6);
});
tarjeta(L(4) - 0.1, T.cacahuete - 0.1, '#d6589a', '🍬', 'CHICLE', 'tzictli', T.tzictli);
tarjeta(T.cacahuete - 0.1, L(5) - 0.1, '#a8692e', '🥜', 'CACAHUETE', 'tlalcacahuatl', T.tlal, c => aparece(chip(c, 230, 300, '🌱 «el cacao de la tierra»', { size: 56, bg: '#fff', color: INK }), T.cacaoT));
emu(T.cacaoT + 1.0);

/* L5 · CTA de seguir */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · la tiza de la pizarra también es azteca */
tarjeta(L(6) - 0.1, L(7) - 0.1, '#2b4a3a', '✏️', 'TIZA', 'tizatl', T.tizatl, c => {
  const p0 = box(c, 140, 330, 800, 110, { zIndex: 5, background: '#1e3328', border: `8px solid ${WOOD}`, borderRadius: '12px' });
  texto(c, 345, 'a b c', { size: 70, color: '#f4f1e6', z: 6, italic: true });
});

/* L7 · la pelea: cacahuete 🇪🇸 · cacahuate 🇲🇽 · maní 🌴 */
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  sello(c, 320, '¡PELEA!', L(7) + 0.1, { size: 130, r: -5 });
  const fil = [['🇪🇸', 'cacahuete', T.pelea + 0.3, YEL], ['🇲🇽', 'cacahuate', T.cacahuate, '#9fd3c0'], ['🌎', 'maní', T.mani, PINK]].map(([f, w, t0, col], i) => [chip(c, 150, 560 + i * 230, `${f} ${w}`, { size: 96, bg: col, color: INK }), t0]);
  aparece(chip(c, 560, 1270, '🏝️ del Caribe (taíno)', { size: 52, bg: '#fff', color: INK }), T.caribe);
  return t => fil.forEach(([e, t0], i) => popA(e, t, t0, { r: i % 2 ? 3 : -3 }));
});

/* L8 · OJO: chocolate */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const e = EMO(c, 370, 560, '🍫', 260);
  aparece(chip(c, 390, 960, '«chocolate» = ¿?', { size: 70, bg: '#6b3a1e' }), T.choco);
  aparece(chip(c, 400, 1110, 'aún se discute 🤔', { size: 60, bg: PINK }), T.choco + 1.0);
  return t => set(e, { r: Math.sin(t * 3) * 8 });
});

/* L9 · O sea: sin los aztecas, sin guacamole y sin pizarra */
golpe(L(9) - 0.1, L(10) - 0.1, YEL, 'Sin aztecas…', 'sin guacamole 🥑<br>y sin pizarra', { y: 470, size: 140, size2: 96, t2: T.guaca - 0.1 });

/* L10 · pregunta final */
preguntaFinal('¿Cacahuete, cacahuate', 'o maní?', { size: 90, draw: c => [['🇪🇸 cacahuete', YEL], ['🇲🇽 cacahuate', '#9fd3c0'], ['🌎 maní', PINK]].map(([s, col], i) => aparece(chip(c, 160 + i * 60, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(10) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(55, 'Hablas azteca', ['NÁHUATL', 'tomatl · tizatl']);

Story.run({ ovalo: [[L(8), L(9) - 0.15]] });
