/* Ep. 44 · ¿Por qué a los Franciscos les llaman Paco? — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  padre0: Q('padre de la comunidad'), mal1: Q('contado mal'), tierna: Q('más tierna'),
  francisco3: Q('a un francisco'), paco3: Q('paco'), tres3: Q('tres pasos'),
  bulo: Q('el bulo'), frailes: Q('los frailes'), firmaban: Q('firmaban'), pater: Q('pater comunitatis'), abrev: Q('abreviado'), pa: Q('pa co'), paco4: Q('paco'),
  precioso: Q('suena precioso'), noCreen: Q('no se lo creen'), pruebas: Q('no hay pruebas'),
  culpable: Q('el culpable'), fabrican: Q('los fabrican'), bebes: Q('los bebés'),
  nino: Q('un niño pequeño'), dificil: Q('muy difícil'), efe: Q('cambia la efe'), finalw: Q('con el final'), sale: Q('le sale'),
  prueba8: Q('la prueba'), dolores: Q('dolores'), lola: Q('lola'), concepcion: Q('concepción'), concha: Q('concha'), ignacio: Q('ignacio'), nacho: Q('nacho'), mexico: Q('en méxico'), pancho: Q('pancho'),
  ojo: Q('ojo'), dos9: Q('dos sílabas'), pruebalo: Q('pruébalo'),
  osea: Q('o sea'), fraile10: Q('un fraile'), bebe10: Q('un bebé'),
};
const TAG = (pa, x, y, w, n, z = 6) => figura(pa, x, y, w, w * 0.6, nameTagInner(n), '0 0 700 420', { z, origin: '50% 50%' });
const BABY = (pa, x, y, w, z = 6) => figura(pa, x, y, w, w * 400 / 360, babyInner(0), '0 0 360 400', { z, origin: '50% 100%' });
const babyTalk = (b, t) => { b.firstChild.innerHTML = babyInner(Math.abs(Math.sin(t * 9)) * (Math.sin(t * 2) > 0 ? 1 : 0.2)); };
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const FRAILE = s => monkInner(s, true);

/* L0 · PORTADA: etiqueta «Hola, me llamo Francisco» + «¿Por qué PACO?»; a «Padre de la Comunidad» cae ¡FALSO! */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Por qué le llaman', { size: 92 });
  const t2 = texto(c, 400, hlSpan('Paco?', 'phl'), { size: 170, italic: true });
  const tg = TAG(c, 200, 640, 680, 'Francisco');
  const ch = aparece(chip(c, 140, 1110, '«Padre de la Comunidad»', { size: 56, bg: '#fff', color: INK }), T.padre0 - 0.2);
  sello(c, 1180, '¡FALSO!', T.padre0 + 0.6, { size: 150, r: -8 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(tg, { r: -4 + wobble(t, 0.6, 2), s: 1 + 0.02 * Math.sin(t * 5) }); set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.04 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); };
}, { sfx: false });

/* L1 · «te lo han contado mal… la explicación es mucho más tierna» → asoma el bebé */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const f = mk(c, [60, 700, 460, 588], FRAILE(61), '0 0 360 460', 'bust');
  const x = aparece(figura(c, 80, 700, 420, 420, `<path d="M20,20 L400,400 M400,20 L20,400" stroke="${RED}" stroke-width="40" stroke-linecap="round"/>`, '0 0 420 420', { z: 9 }), T.mal1 + 0.2, { sfx: 'error' });
  const b = BABY(c, 600, 640, 380, 7);
  aparece(chip(c, 580, 1150, 'más tierna 💗', { size: 60, bg: PINK }), T.tierna, { sfx: 'sparkle' });
  return t => { babyTalk(b, t); set(b, { y: (1 - p(t, T.tierna - 0.4, 0.5, E.outBack)) * 700, o: t < T.tierna - 0.4 ? 0 : 1 }); };
});

/* L2 · marca */
marca(2);

/* L3 · Francisco → ¿Paco? */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = TAG(c, 60, 340, 520, 'Francisco'), b = aparece(TAG(c, 500, 640, 520, 'Paco', 7), T.paco3, { sfx: 'pop2' });
  const ar = aparece(box(c, 380, 640, 200, 200, { zIndex: 8 }, arrowSvg('M20,20 Q160,40 180,180', PINK, 12)), T.paco3 - 0.2);
  [0, 1].map(i => aparece(qMark(c, 880 - i * 760, 900 + i * 40, 130, i ? YEL : PINK), T.paco3 + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(a, { r: -3 + wobble(t, 0.5, 1.5) }); };
});

/* PASO 1 · el bulo (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('bulo', 'shl'), T.bulo);
plano(L(4) - 0.1, T.abrev - 0.06, { background: '#E9D7B0' }, c => {
  const fs = [0, 1].map(i => mk(c, [40 + i * 560, 760, 440, 562], FRAILE(62 + i), '0 0 360 460', 'bust'));
  const sc = aparece(figura(c, 240, 560, 600, 300, `${FIGP('M20,30 L580,30 L580,270 L20,270 Z', '#F2E6C8', 5, .25)}<circle cx="20" cy="150" r="30" fill="#E2D2A8" stroke="${INK}" stroke-width="5"/><circle cx="580" cy="150" r="30" fill="#E2D2A8" stroke="${INK}" stroke-width="5"/><text x="300" y="130" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">PATER</text><text x="300" y="210" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">COMVNITATIS</text>`, '0 0 600 300', { z: 10 }), T.pater - 0.2, { sfx: 'paper' });
  aparece(chip(c, 300, 1250, 'padre de la comunidad', { size: 52, bg: YEL, color: INK }), T.pater + 0.8);
  return t => fs.forEach((f, i) => set(f.d, { y: wobble(t, 0.5, 3, i), r: wobble(t, 0.4, 1.5, i) }));
});
plano(T.abrev - 0.06, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  const p1 = texto(c, 600, '<span style="color:#C8102E">PA</span>TER', { size: 150, x: 40, w: 1000 });
  const p2 = texto(c, 780, '<span style="color:#C8102E">CO</span>MVNITATIS', { size: 120, x: 40, w: 1000 });
  const pc = texto(c, 1010, '= PACO', { size: 190, color: YEL, shadow: OUTL(INK, 10) });
  return t => { set(p1, { s: t > T.pa ? 1.08 : 1 }); set(p2, { s: t > T.pa + 0.4 ? 1.08 : 1 }); set(pc, { s: pop(t, T.paco4, 0.35), o: t > T.paco4 ? 1 : 0, r: -4 }); };
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  aparece(chip(c, 330, 580, 'Suena precioso…', { size: 70, bg: PINK }), T.precioso, { sfx: 'sparkle' });
  const f = mk(c, [300, 700, 480, 613], FRAILE(64), '0 0 360 460', 'bust');
  sello(c, 1060, 'SIN PRUEBAS', T.pruebas, { size: 120, r: -6 });
  return t => set(f.d, { r: Math.sin(t * 2) * 3 });
});

/* PASO 2 · el culpable (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'El ' + hlSpan('culpable', 'shl'), T.culpable);
plano(L(6) - 0.1, T.bebes - 0.06, PAPEL, c => {
  const sil = figura(c, 300, 600, 480, 533, babyInner(0), '0 0 360 400', { z: 6 });
  aparece(texto(c, 760, '?', { size: 300, x: 340, w: 400, color: YEL, shadow: OUTL(INK, 10), z: 9 }), T.culpable + 0.2);
  sil.style.filter = 'brightness(0)';
  return t => set(sil, { o: 1, s: 1 + 0.03 * Math.sin(t * 6) });
});
golpe(T.bebes - 0.06, L(7) - 0.1, PINK, '¡LOS BEBÉS!', null, { y: 520, size: 170, draw: c => { const b = BABY(c, 290, 760, 500, 6); FX.fns.push(t => { if (b.isConnected) babyTalk(b, t); }); } });
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const b = BABY(c, 60, 820, 380, 6);
  const w1 = texto(c, 600, '<span class="fr">FRAN</span><span class="ci">CIS</span>CO', { size: 140 });
  const pc = texto(c, 960, '<span class="pp">PA</span>·CO', { size: 200, color: RED, x: 380, w: 660 });
  aparece(chip(c, 470, 1220, 'F → P', { size: 80, bg: YEL, color: INK }), T.efe, { sfx: 'pop2' });
  sello(c, 760, '¡DIFÍCIL!', T.dificil, { size: 100, r: -6 });
  sfx('tada', T.sale + 0.3, 0.7);
  return t => {
    babyTalk(b, t);
    w1.querySelector('.fr').style.textDecoration = t > T.efe ? 'line-through' : 'none'; w1.querySelector('.ci').style.textDecoration = t > T.finalw ? 'line-through' : 'none';
    w1.querySelector('.fr').style.color = t > T.efe ? '#999' : INK; w1.querySelector('.ci').style.color = t > T.finalw ? '#999' : INK;
    set(pc, { s: pop(t, T.sale + 0.2, 0.4), o: t > T.sale + 0.2 ? 1 : 0, r: -5 });
  };
});

/* PASO 3 · la prueba (L8) */
paso(L(8) - 0.1, L(9) - 0.1, 3, 'La ' + hlSpan('prueba', 'shl'), T.prueba8);
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const rows = [['Dolores', 'Lola', T.dolores, T.lola], ['Concepción', 'Concha', T.concepcion, T.concha], ['Ignacio', 'Nacho', T.ignacio, T.nacho], ['Francisco', 'Pancho 🇲🇽', T.mexico, T.pancho]];
  rows.forEach(([a, b, ta, tb], i) => {
    aparece(chip(c, 60, 580 + i * 170, a, { size: 60, bg: '#fff', color: INK }), ta);
    aparece(texto(c, 570 + i * 170, '→', { size: 90, x: 470, w: 140, color: PINK }), tb - 0.15, { sfx: false });
    aparece(chip(c, 640, 580 + i * 170, b, { size: 66, bg: i === 3 ? '#2f7a4a' : PINK }), tb, { sfx: 'pop2' });
  });
});
emu(T.pancho + 0.5);

/* L9 · OJO: dos sílabas */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const two = texto(c, 600, 'PA · CO', { size: 200, color: INK });
  const n = aparece(chip(c, 400, 860, '2 sílabas', { size: 80, bg: YEL, color: INK }), T.dos9, { sfx: 'ding' });
  aparece(chip(c, 380, 1230, '¿y el tuyo? 👇', { size: 70, bg: PINK }), T.pruebalo);
  return t => set(two, { s: 1 + 0.05 * Math.sin(t * 8) });
});

/* L10 · O sea (golpe amarillo) */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, 'No te lo puso un fraile…', '…¡te lo puso un bebé!', { y: 520, size: 96, size2: 110, t2: T.bebe10, draw: c => { const b = BABY(c, 330, 860, 420, 6); FX.fns.push(t => { if (b.isConnected) babyTalk(b, t); }); } });

/* L11 · CTA de seguir con cliffhanger de Pepe */
sigueme(11, 'En el próximo:', '¿Por qué PEPE?', 'sígueme');

/* L12 · pregunta final */
preguntaFinal('¿El apodo', 'más raro que conoces?', { size: 100, draw: c => TAG(c, 240, 640, 600, '¿…?') });

/* L13 · cierre */
cierre(44, '¿Por qué Paco?', ['NOMBRES', 'y apodos']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(9), L(10) - 0.15]] });
