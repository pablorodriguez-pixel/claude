/* Ep. 51 · Por qué en Argentina a todos los españoles les dicen «gallegos» — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  eresGal: Q('eres gallego'), sevilla: Q('de sevilla'), preciosa: Q('preciosa'),
  dicen3: Q('le dicen gallego'), tres3: Q('tres pasos'),
  barcos: Q('los barcos'), anios: Q('mil ochocientos ochenta'), millones: Q('millones de europeos'), grupo: Q('el grupo más grande'), eranGal: Q('eran gallegos'),
  pobre: Q('era pobre'), mar: Q('miraba al mar'), familias: Q('familias enteras'), maleta: Q('maleta de cartón'),
  ciudad: Q('la ciudad'), tantos: Q('llegaron tantos'), quinta: Q('la quinta provincia gallega'),
  bares: Q('sus bares'), periodicos: Q('sus periódicos'), hospital: Q('su propio hospital'), centro: Q('el centro gallego'), esquina: Q('de la esquina'), eraGal: Q('era gallego'),
  noSolo: Q('no solo argentina'), uruguay: Q('en uruguay'), cuba: Q('en cuba'), fidel: Q('fidel castro'), gal8: Q('era gallego'),
  castelao: Q('castelao'), murio: Q('murió'), bsas9: Q('en buenos aires'),
  ojo: Q('ojo'), coruna: Q('la coruña'), claro: Q('no está tan claro'),
  abuelo: Q('es decir abuelo'),
};
const TAG = (pa, x, y, w, n, z = 6) => figura(pa, x, y, w, w * 0.6, nameTagInner(n), '0 0 700 420', { z, origin: '50% 50%' });
const BARCO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 0.6, shipInner(), '0 0 600 360', Object.assign({ z: 6, origin: '50% 50%' }, o));
const MALETA = (c, x, y, w) => figura(c, x, y, w, w * 0.75, maletaInner(), '0 0 400 300', { z: 7, origin: '50% 100%' });
const BUST = (c, x, y, w, o) => figura(c, x, y, w, w * 460 / 360, bustInner(o), '0 0 360 460', { z: 6 });
const [BAx, BAy] = laPj(-58.4, -34.6).map(Number);
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const AZUL = '#6CACE4';

/* L0 · PORTADA: «En Argentina… ¡eres gallego!» */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(108,172,228,.28)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '🇦🇷 Si eres español…', { size: 96 });
  const t2 = texto(c, 410, '…eres ' + hlSpan('gallego', 'phl'), { size: 150, italic: true });
  const b = BUST(c, 350, 620, 380, { moustache: true, hat: 'cap', seed: 33 });
  const tg = TAG(c, 230, 990, 620, 'Gallego', 8);
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(tg, { r: -5 + wobble(t, 0.6, 2), s: 1 + 0.03 * Math.sin(t * 4) }); set(b, { r: wobble(t, 0.5, 1.5) }); };
}, { sfx: false });

/* L1 · aunque seas de Sevilla */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const a = TAG(c, 190, 480, 700, 'Sevilla');
  const x = box(c, 190, 560, 700, 260, { zIndex: 9 }, `<svg viewBox="0 0 700 260" width="100%" height="100%"><path d="M40,30 L660,230 M660,30 L40,230" stroke="${RED}" stroke-width="30" stroke-linecap="round"/></svg>`);
  const b = TAG(c, 240, 860, 600, 'Gallego', 8);
  aparece(chip(c, 240, 1250, 'y tiene explicación 💛', { size: 62, bg: YEL, color: INK }), T.preciosa - 0.6);
  return t => { set(x, { o: t > T.sevilla + 0.4 ? 1 : 0, sx: p(t, T.sevilla + 0.4, 0.3) }); set(b, { s: pop(t, T.sevilla + 0.9, 0.4), o: t > T.sevilla + 0.9 ? 1 : 0, r: -4 }); };
});

/* L2 · marca */
marca(2);

/* L3 · mapa: Buenos Aires */
plano(L(3) - 0.1, L(4) - 0.12, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); m.innerHTML = latamSvg();
  aparece(box(c, BAx - 30, BAy - 80, 60, 80, { zIndex: 12 }, pinSvg(RED)), T.dicen3 - 1.2, { sfx: 'pop2' });
  aparece(chip(c, BAx - 380, BAy - 60, '«¡Gallego!»', { size: 60, bg: AZUL, color: INK }), T.dicen3);
  NUMS(c, T.tres3);
});

/* PASO 1 · los barcos (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'Los ' + hlSpan('barcos', 'shl'), T.barcos);
plano(L(4) - 0.1, T.millones - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 300, 520, '1880 – 1930', { size: 76, bg: YEL, color: INK }), T.anios, { sfx: 'stamp' });
  const b = BARCO(c, 160, 760, 760);
  sfx('bell', T.barcos + 0.3, 0.5);
  return t => set(b, { x: Math.sin(t * 0.8) * 40, y: Math.sin(t * 2) * 12, r: wobble(t, 0.4, 2) });
});
plano(T.millones - 0.1, T.grupo - 0.1, PAPEL, c => {
  const fl = ['🇮🇹', '🇪🇸', '🇫🇷', '🇩🇪', '🇵🇹', '🇵🇱', '🇮🇹', '🇪🇸', '🇮🇹', '🇪🇸', '🇬🇧', '🇮🇹'];
  const fs = fl.map((f, i) => texto(c, 560 + Math.floor(i / 4) * 220, f, { size: 140, x: 60 + (i % 4) * 240, w: 220 }));
  aparece(chip(c, 260, 1280, 'MILLONES de europeos', { size: 66, bg: RED }), T.millones);
  return t => fs.forEach((f, i) => set(f, { s: pop(t, T.millones + i * 0.08, 0.3), o: t > T.millones + i * 0.08 ? 1 : 0 }));
});
plano(T.grupo - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  texto(c, 560, 'Españoles en Argentina:', { size: 72 });
  const big = box(c, 140, 700, 800, 220, { zIndex: 7, background: AZUL, border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '28px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '120px', lineHeight: '205px' }, 'Gallegos 🥇');
  const otros = ['asturianos', 'vascos', 'andaluces', 'catalanes'].map((n, i) => chip(c, 80 + (i % 2) * 480, 1000 + Math.floor(i / 2) * 130, n, { size: 46, bg: '#fff', color: INK }));
  return t => { set(big, { s: pop(t, T.grupo + 0.3, 0.45), o: t > T.grupo + 0.3 ? 1 : 0, r: -3 }); otros.forEach((o, i) => set(o, { o: t > T.grupo + 0.9 + i * 0.12 ? 0.8 : 0 })); };
});
plano(L(5) - 0.1, L(6) - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 150, 580, 'Galicia: pobre y mirando al mar 🌊', { size: 46, bg: '#fff', color: INK }), T.pobre);
  const ms = [0, 1, 2].map(i => MALETA(c, 90 + i * 320, 900 + (i % 2) * 60, 280));
  aparece(chip(c, 210, 1180, 'familias enteras 👨‍👩‍👧', { size: 64, bg: YEL, color: INK }), T.familias);
  return t => ms.forEach((m, i) => set(m, { s: pop(t, T.maleta - 0.3 + i * 0.2, 0.35), o: t > T.maleta - 0.3 + i * 0.2 ? 1 : 0, r: Math.sin(t * 4 + i) * 4 }));
});

/* PASO 2 · la ciudad (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'La ' + hlSpan('ciudad', 'shl'), T.ciudad);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  const prov = ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'].map((n, i) => box(c, 60 + (i % 2) * 500, 520 + Math.floor(i / 2) * 170, 460, 130, { zIndex: 6, background: '#fff', border: `6px solid ${INK}`, borderRadius: '20px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', lineHeight: '118px' }, n));
  const ba = box(c, 160, 900, 760, 170, { zIndex: 7, background: AZUL, border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '24px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '80px', lineHeight: '156px' }, '5ª: Buenos Aires');
  aparece(chip(c, 140, 1210, '«la quinta provincia gallega»', { size: 58, bg: YEL, color: INK }), T.quinta, { sfx: 'tada' });
  return t => { prov.forEach((b, i) => set(b, { s: pop(t, L(6) + 0.6 + i * 0.25, 0.3), o: t > L(6) + 0.6 + i * 0.25 ? 1 : 0 })); set(ba, { s: pop(t, T.quinta - 0.2, 0.45), o: t > T.quinta - 0.2 ? 1 : 0, r: -3 }); };
});
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  [['☕ sus bares', T.bares], ['📰 sus periódicos', T.periodicos], ['🏥 su hospital', T.hospital]].map(([s, t0], i) => aparece(chip(c, 100 + i * 60, 570 + i * 120, s, { size: 62, bg: [YEL, '#fff', '#9fd3c0'][i], color: INK }), t0, { sfx: 'pop' }));
  aparece(chip(c, 400, 920, 'Centro Gallego', { size: 56, bg: AZUL, color: INK }), T.centro);
  const b = BUST(c, 120, 1000, 320, { moustache: true, seed: 47 });
  const tg = TAG(c, 460, 1130, 520, 'Gallego', 8);
  return t => { set(b, { o: t > T.esquina - 0.5 ? 1 : 0 }); set(tg, { s: pop(t, T.eraGal, 0.4), o: t > T.eraGal ? 1 : 0, r: -6 }); };
});

/* PASO 3 · no solo Argentina (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'No solo ' + hlSpan('Argentina', 'shl'), T.noSolo);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 140, 580, '🇺🇾 Uruguay', { size: 66, bg: AZUL, color: INK }), T.uruguay);
  aparece(chip(c, 600, 580, '🇨🇺 Cuba', { size: 66, bg: RED }), T.cuba);
  const f = BUST(c, 340, 720, 400, { beard: true, hat: 'cap', seed: 52 });
  aparece(chip(c, 300, 1250, 'Fidel Castro: su padre…', { size: 58, bg: '#fff', color: INK }), T.fidel - 0.3);
  sello(c, 1400, '¡GALLEGO!', T.gal8, { size: 150, r: -6 });
  return t => set(f, { o: t > T.fidel - 0.6 ? 1 : 0, s: pop(t, T.fidel - 0.6, 0.4) });
});
plano(L(9) - 0.1, L(10) - 0.1, { background: '#C9D3E6' }, c => {
  const b = BUST(c, 330, 520, 420, { moustache: true, seed: 61 });
  aparece(chip(c, 300, 1080, 'Castelao ✍️', { size: 72, bg: AZUL, color: INK }), T.castelao);
  aparece(chip(c, 220, 1260, 'murió en Buenos Aires 🇦🇷', { size: 58, bg: '#fff', color: INK }), T.bsas9, { sfx: 'bell' });
  return t => set(b, { r: wobble(t, 0.4, 1.5) });
});
emu(T.bsas9 + 1.0);

/* L10 · OJO: ¿más gallegos que La Coruña? */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 300, 620, 'Buenos Aires 🇦🇷', { size: 64, bg: AZUL, color: INK }), T.ojo + 0.8);
  texto(c, 780, '¿ > ?', { size: 140 });
  aparece(chip(c, 360, 980, 'A Coruña 🇪🇸', { size: 64, bg: '#fff', color: INK }), T.coruna);
  aparece(chip(c, 320, 1150, 'no está tan claro 🤔', { size: 58, bg: PINK }), T.claro);
});

/* L11 · O sea: allí «gallego» es «abuelo» */
golpe(L(11) - 0.1, L(12) - 0.1, AZUL, 'Allí, «gallego»…', '…es «abuelo» 👴', { y: 480, size: 130, size2: 130, t2: T.abuelo - 0.2, draw: c => { MALETA(c, 380, 1000, 320); } });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final */
preguntaFinal('¿Un abuelo que', 'cruzó el charco?', { size: 110, draw: c => { figura(c, 340, 620, 400, 520, frameInner(`<g transform="translate(62,90) scale(0.77)">${bustInner({ moustache: true, hat: 'cap', seed: 33 })}</g>`), '0 0 400 520', { z: 6 }); } });

/* L14 · cierre */
cierre(51, '¿Por qué «gallego»?', ['ESPAÑA', 'y América']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
