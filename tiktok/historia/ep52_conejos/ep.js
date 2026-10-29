/* Ep. 52 · «España» significaría «tierra de conejos» — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  significa: Q('significa'), conejos0: Q('tierra de conejos'), romanos1: Q('los romanos'), monedas1: Q('sus monedas'),
  sellama: Q('se llama españa'), tres3: Q('tres pasos'),
  error: Q('el error'), tresmil: Q('casi tres mil años'), fenicios: Q('los fenicios'), costas: Q('nuestras costas'), bicho: Q('un bicho'), conejo4: Q('el conejo'),
  confunden: Q('lo confunden'), daman: Q('el damán'), suTierra: Q('de su tierra'), ishapan: Q('llaman al lugar'), costaD: Q('la costa de los damanes'),
  oyen: Q('lo oyen'), hispania: Q('hispania'), espana6: Q('españa'),
  prueba: Q('la prueba'), adriano: Q('emperador adriano'), tumbada: Q('tumbada'), pies: Q('a sus pies'),
  plaga: Q('la plaga'), tantos: Q('había tantos'), baleares: Q('en baleares'), augusto: Q('emperador augusto'), soldados: Q('soldados contra los conejos'),
  catulo: Q('el poeta catulo'), insultar: Q('insultar'), conejera: Q('celtiberia conejera'),
  ojo: Q('ojo'), teorias: Q('más teorías'),
  malId: Q('mal identificado'),
};
const CONEJO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 340 / 300, conejoInner(o.orejas ?? 1, o.col), '0 0 300 340', Object.assign({ z: 7, origin: '50% 100%' }, o));
const MONEDA = (c, x, y, w, o = {}) => figura(c, x, y, w, w, monedaHispaniaInner(), '0 0 400 400', Object.assign({ z: 6, origin: '50% 50%' }, o));
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 150, color: INK }, o));
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const DAMAN = '#8a7558';

/* L0 · PORTADA: «España significa… tierra de conejos» */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '🇪🇸 «España» significa…', { size: 88 });
  const t2 = texto(c, 410, hlSpan('tierra de conejos', 'phl'), { size: 100, italic: true });
  const k = CONEJO(c, 290, 760, 500);
  sfx('swoosh_up', 0.05, 0.6); sfx('boing', T.conejos0, 0.5);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(k, { y: -Math.abs(Math.sin(t * 4)) * 60, r: wobble(t, 0.5, 3) }); };
}, { sfx: false });

/* L1 · y los romanos lo grabaron en sus monedas */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const m = MONEDA(c, 190, 560, 700);
  aparece(chip(c, 280, 1330, '🏛️ moneda romana', { size: 66, bg: YEL, color: INK }), T.monedas1, { sfx: 'ding' });
  return t => set(m, { s: pop(t, L(1), 0.45), r: Math.sin(t * 1.5) * 8 });
});

/* L2 · marca */
marca(2);

/* L3 · ¿por qué España se llama España? */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const e = PAL(c, 420, '«ESPAÑA»', { color: RED, size: 170 });
  const k = CONEJO(c, 390, 640, 300);
  [0, 1].map(i => aparece(qMark(c, 880 - i * 800, 520 + i * 100, 120, i ? YEL : PINK), T.sellama + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(e, { s: pop(t, T.sellama, 0.35), o: t > T.sellama ? 1 : 0, r: -3 }); set(k, { r: wobble(t, 0.6, 4), y: -Math.abs(Math.sin(t * 3)) * 20 }); };
});

/* PASO 1 · el error (L4–L6) */
paso(L(4) - 0.1, L(7) - 0.1, 1, 'El ' + hlSpan('error', 'shl'), T.error);
plano(L(4) - 0.1, L(5) - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 260, 520, 'hace casi 3.000 años', { size: 62, bg: YEL, color: INK }), T.tresmil, { sfx: 'stamp' });
  const g = figura(c, 160, 680, 520, 451, galeonInner('#7a3a8a'), '0 0 600 520', { z: 6, origin: '50% 50%' });
  aparece(chip(c, 80, 1180, '⛵ fenicios', { size: 66, bg: '#7a3a8a' }), T.fenicios);
  const k = CONEJO(c, 680, 960, 300);
  aparece(qMark(c, 760, 760, 140, PINK), T.bicho + 0.2);
  return t => { set(g, { x: lerp(-500, 0, p(t, T.fenicios - 0.4, 1.4)), y: Math.sin(t * 2) * 12, r: wobble(t, 0.5, 3) }); set(k, { o: t > T.conejo4 - 0.2 ? 1 : 0, s: pop(t, T.conejo4 - 0.2, 0.45), y: -Math.abs(Math.sin(t * 4)) * 30 }); };
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  const a = CONEJO(c, 60, 560, 400);
  const b = CONEJO(c, 620, 640, 400, { orejas: 0.25, col: DAMAN });
  texto(c, 720, '≈', { size: 220, x: 440, w: 200 });
  aparece(chip(c, 120, 1060, 'conejo 🇪🇸', { size: 56, bg: '#fff', color: INK }), T.confunden);
  aparece(chip(c, 640, 1060, 'damán 🌴', { size: 56, bg: YEL, color: INK }), T.daman, { sfx: 'pop2' });
  const n = PAL(c, 1230, '«I-Shapan-im»', { size: 120, color: '#7a3a8a' });
  aparece(chip(c, 180, 1420, 'la costa de los damanes', { size: 58, bg: PINK }), T.costaD);
  return t => { set(b, { o: t > T.daman - 0.2 ? 1 : 0, s: pop(t, T.daman - 0.2, 0.4) }); set(n, { s: pop(t, T.ishapan, 0.35), o: t > T.ishapan ? 1 : 0 }); };
});
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  const ws = [['I-Shapan-im', '#7a3a8a', T.oyen - 0.3], ['HISPANIA', '#8a5a34', T.hispania], ['ESPAÑA', RED, T.espana6]].map(([w, col, t0], i) => [PAL(c, 590 + i * 280, w, { color: col, size: 130 }), t0]);
  const fl = [0, 1].map(i => texto(c, 750 + i * 280, '⬇️', { size: 90 }));
  return t => { ws.forEach(([w, t0]) => set(w, { s: pop(t, t0, 0.4), o: t > t0 ? 1 : 0 })); fl.forEach((f, i) => set(f, { o: t > ws[i + 1][1] - 0.3 ? 1 : 0 })); };
});

/* PASO 2 · la prueba: la moneda de Adriano (L7) */
paso(L(7) - 0.1, L(8) - 0.1, 2, 'La ' + hlSpan('prueba', 'shl'), T.prueba);
plano(L(7) - 0.1, L(8) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 220, 520, '👑 emperador Adriano', { size: 62, bg: YEL, color: INK }), T.adriano);
  const m = MONEDA(c, 160, 640, 760);
  const ring = box(c, 160 + 760 * 0.15, 640 + 760 * 0.45, 760 * 0.3, 760 * 0.3, { zIndex: 9, borderRadius: '50%', border: `14px solid ${PINK}` });
  sello(c, 1400, '¡EL CONEJO!', T.pies, { size: 140, r: -6 });
  sfx('ding', T.pies, 0.7);
  return t => { set(m, { s: pop(t, L(7) + 0.3, 0.45) * (1 + 0.06 * p(t, T.tumbada, 1.2)), r: Math.sin(t) * 3 }); set(ring, { o: t > T.pies ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 7) }); };
});

/* PASO 3 · la plaga (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'La ' + hlSpan('plaga', 'shl'), T.plaga);
plano(L(8) - 0.1, T.augusto - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 330, 570, '🏝️ Baleares', { size: 70, bg: '#fff', color: INK }), T.baleares);
  const ks = [...Array(12)].map((_, i) => CONEJO(c, 40 + (i % 4) * 250, 700 + Math.floor(i / 4) * 260, 200));
  return t => ks.forEach((k, i) => set(k, { s: pop(t, T.tantos + i * 0.12, 0.3), o: t > T.tantos + i * 0.12 ? 1 : 0, y: -Math.abs(Math.sin(t * 5 + i)) * 30 }));
});
plano(T.augusto - 0.1, L(9) - 0.1, PAPEL, c => {
  const r = figura(c, 340, 520, 400, 511, romanInner(), '0 0 360 460', { z: 6 });
  aparece(chip(c, 280, 1050, 'emperador Augusto 🏛️', { size: 60, bg: YEL, color: INK }), T.augusto);
  aparece(chip(c, 160, 1230, '⚔️ ¡soldados contra conejos!', { size: 58, bg: RED }), T.soldados, { sfx: 'thud' });
  const k = CONEJO(c, 60, 860, 180);
  return t => { set(r, { r: wobble(t, 0.4, 1.5) }); set(k, { x: (t * 300) % 1000, o: t > T.soldados ? 1 : 0, y: -Math.abs(Math.sin(t * 8)) * 30 }); };
});
plano(L(9) - 0.1, L(10) - 0.1, { background: '#E9D7B0' }, c => {
  const s = figura(c, 240, 520, 600, 700, scrollInner(), '0 0 600 700', { z: 5 });
  aparece(chip(c, 360, 620, '✍️ Catulo', { size: 66, bg: '#fff', color: INK }), T.catulo);
  const q = texto(c, 820, '«hijo de la Celtiberia<br><span style="color:#C8102E">conejera</span>»', { size: 72, x: 260, w: 560, italic: true });
  sfx('boing', T.conejera + 0.5, 0.4);
  return t => set(q, { o: t > T.conejera - 0.8 ? 1 : 0, s: pop(t, T.conejera - 0.8, 0.4) });
});
emu(T.conejera + 1.0);

/* L10 · OJO: hay más teorías */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  CONEJO(c, 390, 560, 300);
  aparece(chip(c, 300, 1000, 'no todos lo aceptan', { size: 58, bg: '#fff', color: INK }), T.ojo + 0.8);
  aparece(chip(c, 360, 1150, 'otras teorías 🤔', { size: 62, bg: PINK }), T.teorias);
});

/* L11 · O sea: España es un conejo mal identificado */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, '«España»…', '…un conejo<br>mal identificado', { y: 470, size: 150, size2: 100, t2: T.malId - 0.6, draw: c => { const k = CONEJO(c, 400, 980, 280); FX.fns.push(t => set(k, { y: -Math.abs(Math.sin(t * 4)) * 40 })); } });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final: ¿qué significa el nombre de tu país? */
preguntaFinal('¿Qué significa', 'el nombre de tu país?', { size: 100, draw: c => [['🇦🇷 Argentina = plata', '#6CACE4'], ['🇻🇪 Venezuela = pequeña Venecia', YEL], ['¿y el tuyo? 👇', PINK]].map(([s, col], i) => aparece(chip(c, 100, 700 + i * 180, s, { size: 56, bg: col, color: INK }), L(13) + 0.8 + i * 0.5, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(52, '¿Por qué «España»?', ['ESPAÑA', 'y América']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
