/* Ep. 61 · La epidemia de baile de 1518 — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  cientos0: Q('cientos de personas'), bailar0: Q('parar de bailar'), solucion: Q('la solución'), musica1: Q('más música'),
  estras: Q('estrasburgo'), julio: Q('julio de mil quinientos dieciocho'), mujer: Q('una mujer'), baila2: Q('se pone a bailar'), sinM: Q('sin música'),
  dias: Q('no para en días'), semana: Q('en una semana'), treinta: Q('más de treinta'),
  espera: Q('pero espera'), medicos: Q('los médicos'), sangre: Q('sangre caliente'), cura: Q('la cura es'), seguir: Q('seguir bailando'),
  contrata: Q('contrata músicos'), escenario: Q('monta un escenario'), mes: Q('en un mes'), cientos6: Q('ya son cientos'),
  despl: Q('hasta desplomarse'), rezar: Q('a rezar'), vito: Q('san vito'),
  poco: Q('poco a poco'), paran: Q('se paran'),
  ojo: Q('ojo'), murieron: Q('cuántos murieron'), cronicas: Q('las crónicas'),
  quinientos: Q('hace quinientos años'), contagia: Q('se contagiaba'), tiktok: Q('tiktok'),
};
const BAILAN = ['💃', '🕺'];
const BAIL = (c, x, y, sz, i = 0) => texto(c, y, BAILAN[i % 2], { size: sz, x, w: sz * 1.25 });
const bailando = (e, t, i, a = 1) => set(e, { r: Math.sin(t * 9 + i) * 14 * a, y: -Math.abs(Math.sin(t * 9 + i)) * 30 * a, sx: Math.sin(t * 4.5 + i) > 0 ? 1 : -1 });
const MULTITUD = (c, y0, n, sz = 110, cols = 7) => [...Array(n)].map((_, i) => BAIL(c, 30 + (i % cols) * (1000 / cols) + (Math.floor(i / cols) % 2) * 40, y0 + Math.floor(i / cols) * sz * 0.95, sz, i));

/* L0 · PORTADA */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, 'Cientos de personas…', { size: 88 });
  const t2 = texto(c, 400, 'no podían ' + hlSpan('parar', 'phl') + '<br>de bailar', { size: 112, italic: true });
  const m = MULTITUD(c, 700, 14, 150, 5);
  sello(c, 1200, '1518', T.bailar0 + 0.2, { size: 120, r: -6, col: INK });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1.2) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); m.forEach((e, i) => bailando(e, t, i)); };
}, { sfx: false });

/* L1 · la solución de las autoridades: más música */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 280, 360, '🏛️ las autoridades', { size: 76, bg: '#fff', color: INK }), L(1) + 0.05);
  const ins = ['🎺', '🥁', '🎻'].map((e, i) => texto(c, 620, e, { size: 220, x: 60 + i * 330, w: 300 }));
  sello(c, 1000, '¡MÁS MÚSICA!', T.musica1, { size: 120, r: -6 });
  return t => ins.forEach((e, i) => set(e, { s: pop(t, L(1) + 0.4 + i * 0.25, 0.35), o: t > L(1) + 0.4 + i * 0.25 ? 1 : 0, r: Math.sin(t * 8 + i) * 8 }));
});

/* L2 · Estrasburgo, julio de 1518: una mujer se pone a bailar sin música */
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  sello(c, 320, 'JULIO 1518', T.julio, { size: 120, r: -4, col: INK });
  aparece(chip(c, 330, 520, '📍 Estrasburgo', { size: 70, bg: PINK }), T.estras);
  const d = BAIL(c, 360, 660, 300);
  const nm = texto(c, 1080, '🔇 sin música', { size: 80 });
  return t => { set(d, { o: t > T.mujer ? 1 : 0 }); if (t > T.baila2) bailando(d, t, 0); set(nm, { o: t > T.sinM ? 1 : 0, s: pop(t, T.sinM, 0.35) }); };
});

/* L3 · días sin parar; en una semana, más de treinta */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  const n = texto(c, 320, '1', { size: 200, color: RED });
  const m = MULTITUD(c, 600, 35, 105, 7);
  return t => { const k = clamp(p(t, T.semana, T.treinta + 0.6 - T.semana)); const vis = Math.max(1, Math.round(k * 35)); n.innerHTML = t > T.treinta ? '+30' : String(vis); m.forEach((e, i) => { set(e, { o: i < vis ? 1 : 0 }); if (i < vis) bailando(e, t, i, 0.7); }); };
});

/* L4 · los médicos: «sangre caliente» y la cura es… seguir bailando */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const doc = figura(c, 340, 400, 400, 511, bustInner({ beard: true, hat: 'slouch', seed: 41 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 400, 360, '🩺 médicos', { size: 64, bg: '#fff', color: INK }), T.medicos);
  aparece(chip(c, 250, 960, '🔥 «sangre caliente»', { size: 72, bg: RED }), T.sangre, { sfx: 'boing' });
  sello(c, 1110, '¡A BAILAR MÁS!', T.seguir, { size: 110, r: -6 });
  return t => set(doc, { r: wobble(t, 0.4, 2) });
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · la ciudad contrata músicos, monta un escenario… y en un mes, cientos */
plano(L(6) - 0.1, T.mes - 0.1, { background: '#E9C6BE' }, c => {
  const st = box(c, 90, 900, 900, 90, { zIndex: 5, background: WOOD, border: `7px solid ${INK}`, borderRadius: '10px', boxShadow: `10px 10px 0 ${INK}` });
  const ms = ['🎺', '🥁', '🎻', '🪈'].map((e, i) => texto(c, 680, e, { size: 170, x: 110 + i * 220, w: 200 }));
  aparece(chip(c, 300, 400, '🎶 músicos', { size: 76, bg: YEL, color: INK }), T.contrata);
  aparece(chip(c, 280, 1060, '🪵 un escenario', { size: 70, bg: '#fff', color: INK }), T.escenario);
  return t => { ms.forEach((e, i) => set(e, { o: t > T.contrata + i * 0.15 ? 1 : 0, s: pop(t, T.contrata + i * 0.15, 0.3), y: -Math.abs(Math.sin(t * 8 + i)) * 20 })); set(st, { o: t > T.escenario - 0.2 ? 1 : 0, sx: p(t, T.escenario - 0.2, 0.4) }); };
});
plano(T.mes - 0.1, L(7) - 0.1, { background: YEL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const m = MULTITUD(c, 420, 49, 115, 7);
  sello(c, 1180, '¡CIENTOS!', T.cientos6, { size: 130, r: -6 });
  return t => m.forEach((e, i) => { set(e, { o: t > T.mes + i * 0.03 ? 1 : 0 }); bailando(e, t, i); });
});

/* L7 · bailan hasta desplomarse; San Vito */
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const m = MULTITUD(c, 420, 14, 120, 7);
  const ig = figura(c, 300, 760, 480, 400, `${FIGP('M40,400 L40,160 L240,40 L440,160 L440,400 Z', '#f3efe6', 6, .2)}<path d="M240,40 V-60 M200,-20 H280" stroke="${INK}" stroke-width="12"/><path d="M190,400 V290 Q240,240 290,290 V400" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>`, '0 0 480 400', { z: 6 });
  aparece(chip(c, 300, 1230, '⛪ San Vito', { size: 76, bg: PINK }), T.vito);
  return t => { m.forEach((e, i) => { const k = p(t, T.despl + i * 0.08, 0.4); set(e, { r: k * 90 * (i % 2 ? 1 : -1), y: k * 60 }); }); set(ig, { o: t > T.rezar - 0.2 ? 1 : 0, s: pop(t, T.rezar - 0.2, 0.4) }); };
});

/* L8 · y poco a poco… se paran */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#C9D3E6' }, c => {
  const m = MULTITUD(c, 520, 21, 120, 7);
  texto(c, 330, 'poco a poco…', { size: 96, italic: true });
  return t => m.forEach((e, i) => bailando(e, t, i, 1 - p(t, L(8), T.paran + 0.4 - L(8))));
});

/* L9 · OJO */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const sc = texto(c, 560, '💀', { size: 260, x: 400, w: 340 });
  aparece(chip(c, 380, 1000, '💀 ¿cuántos murieron?', { size: 58, bg: '#fff', color: INK }), T.murieron);
  aparece(chip(c, 420, 1140, 'cifras dudosas 🤔', { size: 62, bg: PINK }), T.cronicas);
});

/* L10 · O sea */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, 'Hace 500 años…', '…un baile ya<br>se contagiaba 📱', { y: 470, size: 130, size2: 104, t2: T.contagia - 0.2 });

/* L11 · pregunta final */
preguntaFinal('¿Por qué crees', 'que no podían parar?', { size: 92, draw: c => [['🍄 ¿un hongo?', '#9fd3c0'], ['🧠 ¿histeria?', YEL], ['👇 tu teoría', PINK]].map(([s, col], i) => aparece(chip(c, 140 + i * 60, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(11) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre (clip reutilizado del ep55) */
cierre(61, 'La epidemia de baile', ['BAILE', '1518']);

Story.run({ ovalo: [[L(9), L(10) - 0.15]] });
