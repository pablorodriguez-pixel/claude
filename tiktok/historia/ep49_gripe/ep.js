/* Ep. 49 · La gripe española no empezó en España — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  noEmp: Q('no empezó en españa'), culpa: Q('la culpa'), escondio: Q('no la escondieron'),
  pandemia: Q('pandemia mundial'), nombre: Q('nuestro nombre'), tres3: Q('tres pasos'),
  guerra: Q('la guerra'), anio: Q('mil novecientos dieciocho'), pgm: Q('primera guerra mundial'), soldados: Q('los soldados'), deGripe: Q('de gripe'),
  tapan: Q('lo tapan'), enemigo: Q('el enemigo'), ataca: Q('te ataca'),
  chivato: Q('el chivato'), noEstaba: Q('no estaba'), periodicos: Q('sus periódicos'), todo: Q('lo contaban todo'), rey: Q('el rey'), contagio: Q('se contagió'),
  leyo: Q('el mundo leyó'), enEsp: Q('gripe en españa'), espanola: Q('española'),
  culpas: Q('el juego de las culpas'), napoles: Q('soldado de nápoles'), cancion: Q('canción de moda'),
  culpaba: Q('culpaba a otro'), brasil: Q('en brasil'), alemana: Q('alemana'), polonia: Q('en polonia'), bolch: Q('bolchevique'),
  ojo: Q('ojo'), eeuu: Q('estados unidos'), francia: Q('francia'), china: Q('china'),
  verdad: Q('decir la verdad'), fama: Q('mala fama'),
};
const VIR = (c, x, y, w, o = {}) => figura(c, x, y, w, w, virusInner(o.col), '0 0 300 300', Object.assign({ z: 7, origin: '50% 50%' }, o));
const DIARIO = (c, x, y, w, cab, tit, o = {}) => figura(c, x, y, w, w * 760 / 600, periodicoInner(cab, tit), '0 0 600 760', Object.assign({ z: 6, origin: '50% 50%' }, o));
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const SOLD = (c, x, y, w, seed) => figura(c, x, y, w, w * 460 / 360, bustInner({ moustache: true, seed }), '0 0 360 460', { z: 5, origin: '50% 100%' });

/* L0 · PORTADA: «La gripe española… ¿era española?» */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, 'La gripe española…', { size: 100 });
  const t2 = texto(c, 420, '¿era ' + hlSpan('española?', 'phl'), { size: 140, italic: true });
  const v = VIR(c, 290, 680, 500);
  aparece(chip(c, 300, 1230, '🇪🇸 ¿culpable?', { size: 70, bg: '#fff', color: INK }), 0.6);
  sello(c, 1360, '¡NO EMPEZÓ AQUÍ!', T.noEmp + 0.6, { size: 110, r: -7 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(v, { r: t * 20, s: 1 + 0.05 * Math.sin(t * 4) }); };
}, { sfx: false });

/* L1 · España se llevó la culpa… por no esconderla */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const d = DIARIO(c, 240, 480, 600, 'EL SOL', ['¡GRIPE!', 'MUERTOS']);
  aparece(chip(c, 120, 1300, '🇪🇸 la única que lo contó', { size: 60, bg: YEL, color: INK }), T.escondio - 0.4);
  return t => set(d, { r: -3 + wobble(t, 0.5, 1.5), s: pop(t, L(1), 0.4) });
});

/* L2 · marca */
marca(2);

/* L3 · ¿cómo acaba una pandemia con nuestro nombre? */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const g = figura(c, 290, 380, 500, 500, globeInner(0), '0 0 400 400', { z: 5, origin: '50% 50%' });
  aparece(chip(c, 300, 920, '«gripe ESPAÑOLA» 🇪🇸', { size: 64, bg: RED }), T.nombre, { sfx: 'stamp' });
  [0, 1].map(i => aparece(qMark(c, 880 - i * 800, 420 + i * 60, 120, i ? YEL : PINK), T.nombre + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => g.firstChild.innerHTML = globeInner(t * 0.3);
});

/* PASO 1 · la guerra (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'La ' + hlSpan('guerra', 'shl'), T.guerra);
plano(L(4) - 0.1, T.soldados - 0.1, { background: '#E9D7B0' }, c => {
  const a = texto(c, 560, '1918', { size: 260, color: RED, shadow: OUTL(INK, 8) });
  const can = figura(c, 300, 920, 480, 360, cannonInner(0), '0 0 420 260', { z: 6 });
  aparece(chip(c, 180, 1340, '1ª Guerra Mundial 💥', { size: 62, bg: YEL, color: INK }), T.pgm, { sfx: 'thud' });
  return t => { set(a, { s: pop(t, T.anio, 0.4), o: t > T.anio ? 1 : 0, r: -4 }); can.firstChild.innerHTML = cannonInner(t > T.pgm && t < T.pgm + 0.5 ? 1 : 0); };
});
plano(T.soldados - 0.1, L(5) - 0.1, PAPEL, c => {
  const ss = [0, 1, 2].map(i => SOLD(c, 40 + i * 340, 760, 300, 41 + i * 9));
  const vs = [0, 1, 2].map(i => VIR(c, 120 + i * 330, 520, 160));
  sello(c, 1360, '…¡DE GRIPE!', T.deGripe, { size: 130, r: -6 });
  return t => { ss.forEach((s, i) => set(s, { r: t > T.deGripe ? Math.min(80, (t - T.deGripe - i * 0.2) * 160) * (i % 2 ? -1 : 1) : 0 })); vs.forEach((v, i) => set(v, { r: t * 40, y: Math.sin(t * 3 + i) * 30, o: t > T.soldados + 0.3 ? 1 : 0 })); };
});
plano(L(5) - 0.1, L(6) - 0.1, { background: '#E9D7B0' }, c => {
  const d = DIARIO(c, 240, 470, 600, 'THE TIMES', ['TODO', 'BIEN']);
  const bars = [0, 1].map(i => box(c, 300, 690 + i * 115, 480, 80, { zIndex: 9, background: INK, transformOrigin: '0 50%' }));
  sello(c, 1000, 'CENSURADO', T.tapan + 0.3, { size: 130, r: -6 });
  aparece(chip(c, 260, 1270, '…el enemigo te ataca ⚔️', { size: 56, bg: PINK }), T.ataca - 0.4);
  return t => bars.forEach((b, i) => set(b, { sx: p(t, T.tapan + i * 0.2, 0.3) }));
});

/* PASO 2 · el chivato (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'El ' + hlSpan('chivato', 'shl'), T.chivato);
plano(L(6) - 0.1, T.rey - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 250, 560, '🇪🇸 ni en guerra 🕊️', { size: 66, bg: '#fff', color: INK }), T.noEstaba);
  const d = DIARIO(c, 260, 700, 560, 'EL SOL', ['¡GRIPE', 'EN MADRID!']);
  sfx('paper', T.periodicos, 0.7);
  return t => set(d, { s: pop(t, T.periodicos, 0.4), o: t > T.periodicos ? 1 : 0, r: -2 + (t > T.todo ? Math.sin(t * 9) * 3 : 0) });
});
plano(T.rey - 0.1, L(7) - 0.1, PAPEL, c => {
  const b = figura(c, 290, 560, 500, 639, bustInner({ moustache: true, seed: 23 }), '0 0 360 460', { z: 6 });
  figura(c, 440, 610, 200, 150, crownInner(), '0 0 400 300', { z: 7 });
  aparece(chip(c, 260, 1260, 'Alfonso XIII 🤒', { size: 70, bg: RED }), T.rey + 0.3);
  sello(c, 640, '¡CONTAGIADO!', T.contagio, { size: 120, r: -6 });
  sfx('gulp', T.contagio, 0.6);
  return t => set(b, { r: t > T.contagio ? Math.sin(t * 14) * 3 : 0 });
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#C9D3E6' }, c => {
  const ds = [['THE TIMES', ['SPANISH', 'FLU']], ['LE PETIT', ['GRIPPE', 'ESPAGNOLE']], ['ZEITUNG', ['SPANISCHE', 'GRIPPE']]].map(([cab, tit], i) => DIARIO(c, 30 + i * 340, 520 + (i % 2) * 120, 340, cab, tit));
  sello(c, 1250, '¡ESPAÑOLA!', T.espanola, { size: 160, r: -6 });
  return t => ds.forEach((d, i) => set(d, { s: pop(t, T.leyo + i * 0.35, 0.35), o: t > T.leyo + i * 0.35 ? 1 : 0, r: (i - 1) * 5 }));
});

/* PASO 3 · el juego de las culpas (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'Las ' + hlSpan('culpas', 'shl'), T.culpas);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#E9D7B0' }, c => {
  const s = SOLD(c, 340, 640, 400, 57);
  aparece(chip(c, 140, 520, '«El soldado de Nápoles»', { size: 62, bg: YEL, color: INK }), T.napoles, { sfx: 'stamp' });
  const notas = [0, 1, 2].map(i => texto(c, 700 + i * 60, '🎵', { size: 100, x: 700 + i * 90, w: 140 }));
  aparece(chip(c, 300, 1260, 'canción de moda 🎶', { size: 58, bg: PINK }), T.cancion);
  return t => { set(s, { r: Math.sin(t * 4) * 5 }); notas.forEach((n, i) => set(n, { o: t > T.cancion ? 1 : 0, y: -((t * 80 + i * 60) % 240) })); };
});
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  aparece(texto(c, 560, 'Cada país culpaba al vecino 👉', { size: 70 }), T.culpaba - 0.5);
  aparece(chip(c, 120, 700, '🇧🇷 Brasil → «gripe alemana» 🇩🇪', { size: 52, bg: '#2f7a4a' }), T.alemana - 0.3, { sfx: 'pop2' });
  aparece(chip(c, 120, 880, '🇵🇱 Polonia → «la bolchevique» ☭', { size: 52, bg: RED }), T.bolch - 0.3, { sfx: 'pop2' });
  aparece(chip(c, 120, 1060, '🇪🇸 España → «el soldado de Nápoles» 🇮🇹', { size: 44, bg: '#fff', color: INK }), T.culpaba);
});
emu(T.bolch + 1.0);

/* L10 · OJO: ¿dónde empezó? */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  texto(c, 520, '¿Dónde empezó?', { size: 96 });
  [['🇺🇸', T.eeuu], ['🇫🇷', T.francia], ['🇨🇳', T.china]].map(([f, t0], i) => aparece(texto(c, 760, f, { size: 180, x: 260 + i * 220, w: 200 }), t0, { sfx: 'pop' }));
  [0, 1, 2].map(i => aparece(qMark(c, 300 + i * 220, 1000, 110, [PINK, YEL, PINK][i]), T.china + 0.4 + i * 0.1));
});

/* L11 · O sea: decir la verdad nos costó 100 años de mala fama */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'Decir la verdad…', '…100 años de mala fama', { y: 480, size: 130, size2: 96, t2: T.fama - 0.5, draw: c => { DIARIO(c, 380, 900, 320, 'EL SOL', ['LA', 'VERDAD']); } });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final: la memoria de la familia */
preguntaFinal('¿En tu familia', 'se contaba algo?', { size: 110, draw: c => { figura(c, 340, 620, 400, 480, frameInner(`<g transform="translate(62,90) scale(0.77)">${bustInner({ moustache: true, seed: 9 })}</g>`), '0 0 400 520', { z: 6 }); } });

/* L14 · cierre */
cierre(49, '¿Gripe española?', ['HISTORIA', 'de verdad']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
