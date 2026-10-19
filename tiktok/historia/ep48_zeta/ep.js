/* Ep. 48 · La Z de los españoles no es por un rey ceceoso — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  sevillano: Q('sevillano'), rey: Q('rey que ceceaba'), mentira: Q('es mentira'),
  madrid: Q('en madrid'), zeta3: Q('con zeta'), mexico3: Q('en méxico'), ese3: Q('con ese'), tres3: Q('tres pasos'),
  mito: Q('el mito'), ceceaba: Q('ceceaba'), corte: Q('toda la corte'), pelota: Q('hacerle la pelota'),
  nadie: Q('nadie ha encontrado'), idioma: Q('un idioma entero'),
  verdad: Q('lo que pasó de verdad'), anios: Q('quinientos años'), eses: Q('varias eses'), zona: Q('cada zona'),
  castilla: Q('en castilla'), zeta7: Q('zeta'), sevilla7: Q('en sevilla'), unaEse: Q('una sola ese'),
  barco: Q('el barco'), dondeSal: Q('desde dónde salían'), desdeSev: Q('desde sevilla'), andaluces: Q('andaluces y canarios'),
  mexicano: Q('un mexicano'), canario: Q('un canario'), sevillano9: Q('un sevillano'), igual: Q('igual'),
  ojo: Q('ojo'), uno10: Q('uno de cada diez'),
  raros: Q('los raros'), deZ: Q('los de la zeta'),
};
const LETRA = (c, x, y, ch, col, sz = 260) => box(c, x, y, sz, sz, { zIndex: 8, borderRadius: '30px', background: col, border: `10px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz * 0.8), lineHeight: px(sz * 0.95), color: '#fff' }, ch);
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const REY = (c, x, y, w) => { const b = figura(c, x, y, w, w * 460 / 360, bustInner({ moustache: true, beard: true, seed: 23 }), '0 0 360 460', { z: 6 }); figura(c, x + w * 0.3, y - w * 0.02, w * 0.4, w * 0.3, crownInner(), '0 0 400 300', { z: 7 }); return b; };
const LUPA = `<circle cx="120" cy="120" r="100" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="14"/><circle cx="120" cy="120" r="100" fill="none" stroke="${BRASS}" stroke-width="7"/><path d="M190,190 L300,300" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M190,190 L300,300" stroke="${WOOD}" stroke-width="20" stroke-linecap="round"/>`;
const ROJO = '#C8102E', VERDE = '#2f7a4a';

/* L0 · PORTADA: «¿Hablas como un sevillano?» — Z tachada contra S */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, 'Si eres latino,', { size: 96 });
  const t2 = texto(c, 410, 'hablas como un ' + hlSpan('sevillano', 'phl'), { size: 116, italic: true });
  const z = LETRA(c, 160, 760, 'Z', ROJO), s = LETRA(c, 660, 760, 'S', VERDE);
  texto(c, 840, '≠', { size: 200, x: 440, w: 200 });
  const g = figura(c, 300, 1100, 480, 416, galeonInner(), '0 0 600 520', { z: 6, origin: '50% 50%' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(z, { r: -8 + wobble(t, 0.6, 3) }); set(s, { r: 8 + wobble(t, 0.6, 3, 0.5), s: 1 + 0.06 * Math.sin(t * 5) }); set(g, { r: wobble(t, 0.5, 4), y: Math.sin(t * 2) * 10 }); };
}, { sfx: false });

/* L1 · el rey que ceceaba… ¡MENTIRA! */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const r = REY(c, 290, 620, 500);
  aparece(chip(c, 560, 560, '«Grathiath…»', { size: 60, bg: '#fff', color: INK }), T.rey + 0.3, { sfx: 'pop' });
  sello(c, 1250, '¡MENTIRA!', T.mentira, { size: 160, r: -8 });
  return t => set(r, { r: wobble(t, 0.5, 2) });
});

/* L2 · marca */
marca(2);

/* L3 · Madrid con Z, México con S */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = box(c, 60, 400, 460, 300, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '24px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: '120px' }, `🇪🇸 Madrid<br><span style="color:${ROJO}">Z</span>apato`);
  const b = box(c, 560, 640, 460, 300, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '24px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: '120px' }, `🇲🇽 México<br><span style="color:${VERDE}">S</span>apato`);
  [0, 1].map(i => aparece(qMark(c, 880 - i * 800, 420 + i * 560, 120, i ? YEL : PINK), T.ese3 + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(a, { s: pop(t, T.madrid, 0.35), o: t > T.madrid ? 1 : 0, r: -3 }); set(b, { s: pop(t, T.mexico3, 0.35), o: t > T.mexico3 ? 1 : 0, r: 3 }); };
});

/* PASO 1 · el mito (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('mito', 'shl'), T.mito);
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  const r = REY(c, 340, 560, 380);
  aparece(chip(c, 600, 480, '«Ethpaña»', { size: 56, bg: '#fff', color: INK }), T.ceceaba);
  const cort = [0, 1, 2].map(i => figura(c, 40 + i * 340, 1000, 300, 383, bustInner({ moustache: i !== 1, seed: 31 + i * 7 }), '0 0 360 460', { z: 5 }));
  const bub = [0, 1, 2].map(i => aparece(chip(c, 60 + i * 340, 960, i === 1 ? '«¡Thí!»' : '«¡Grathiath!»', { size: 40, bg: YEL, color: INK }), T.corte + 0.3 + i * 0.25));
  aparece(chip(c, 280, 1420, 'para hacerle la pelota 🙇', { size: 54, bg: PINK }), T.pelota);
  return t => { set(r, { r: wobble(t, 0.5, 2) }); cort.forEach((k, i) => set(k, { o: t > T.corte ? 1 : 0, y: t > T.pelota ? Math.abs(Math.sin(t * 5 + i)) * 20 : 0, r: t > T.pelota ? 8 : 0 })); };
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  [0, 1, 2, 3].map(i => figura(c, 60 + (i % 2) * 480, 560 + Math.floor(i / 2) * 300, 440, 260, `${FIGP('M10,10 L430,10 L430,250 L10,250 Z', '#F2E6C8', 5, .25)}${[...Array(5)].map((_, k) => `<path d="M40,${50 + k * 38} H${k % 2 ? 300 : 390}" stroke="${INK}" stroke-width="5" opacity=".5"/>`).join('')}`, '0 0 440 260', { z: 4 }));
  const lupa = figura(c, 300, 600, 320, 320, LUPA, '0 0 320 320', { z: 10 });
  sello(c, 1180, '¿EL REY? NI RASTRO', T.nadie + 0.5, { size: 86, r: -5 });
  return t => set(lupa, { x: Math.sin(t * 1.6) * 260, y: Math.sin(t * 2.3) * 180 });
});

/* PASO 2 · lo que pasó de verdad (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'Lo que ' + hlSpan('pasó', 'shl'), T.verdad);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 340, 500, 'hace 500 años', { size: 66, bg: YEL, color: INK }), L(6) + 0.2, { sfx: 'stamp' });
  const ls = ['ç', 'z', 's', 'ss'].map((ch, i) => LETRA(c, 70 + i * 245, 760, ch, [ROJO, '#7a4a9a', VERDE, '#c27a3a'][i], 210));
  aparece(chip(c, 200, 1120, 'cada zona, a su manera 🔀', { size: 58, bg: '#fff', color: INK }), T.zona);
  return t => ls.forEach((l, i) => set(l, { s: pop(t, T.eses + i * 0.18, 0.35), o: t > T.eses + i * 0.18 ? 1 : 0, r: Math.sin(t * 3 + i) * 8, y: t > T.zona ? Math.sin(t * 6 + i * 2) * 30 : 0 }));
});
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const ca = box(c, 60, 520, 460, 120, { zIndex: 6 }); ca.innerHTML = `<div style="font:900 70px Playfair;text-align:center">Castilla</div>`;
  const se = box(c, 560, 520, 460, 120, { zIndex: 6 }); se.innerHTML = `<div style="font:900 70px Playfair;text-align:center">Sevilla</div>`;
  const z = LETRA(c, 160, 680, 'Z', ROJO), s = LETRA(c, 660, 680, 'S', VERDE);
  const tod = texto(c, 1000, 'ç · z · s · ss → <span style="color:#2f7a4a">S</span>', { size: 80, x: 500, w: 560 });
  return t => { set(ca, { o: t > T.castilla ? 1 : 0 }); set(z, { s: pop(t, T.zeta7, 0.4), o: t > T.zeta7 ? 1 : 0, r: -6 }); set(se, { o: t > T.sevilla7 ? 1 : 0 }); set(s, { s: pop(t, T.unaEse, 0.4), o: t > T.unaEse ? 1 : 0, r: 6 }); set(tod, { o: t > T.unaEse + 0.3 ? 1 : 0 }); };
});

/* PASO 3 · el barco (L8–L9): de Sevilla a América */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'El ' + hlSpan('barco', 'shl'), T.barco);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); m.innerHTML = latamSvg();
  const g = figura(c, 0, 0, 300, 260, galeonInner(), '0 0 600 520', { z: 12, origin: '50% 50%' });
  aparece(chip(c, 640, 480, '¡SEVILLA!', { size: 70, bg: RED }), T.desdeSev, { sfx: 'tada' });
  aparece(chip(c, 80, 1460, 'andaluces y canarios ⛵', { size: 58, bg: YEL, color: INK }), T.andaluces);
  aparece(qMark(c, 470, 520, 140, PINK), T.dondeSal);
  return t => { const k = p(t, T.desdeSev, 3.2); set(g, { x: lerp(760, 230, k), y: lerp(500, 820, k) + Math.sin(t * 3) * 10, r: wobble(t, 0.6, 5) }); };
});
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const ch = [['🇲🇽 mexicano', T.mexicano, VERDE], ['🇮🇨 canario', T.canario, '#2f5a9a'], ['🟩 sevillano', T.sevillano9, '#2f7a4a']].map(([s, t0, col], i) => aparece(chip(c, 140 + (i % 2) * 260, 640 + i * 150, s, { size: 66, bg: col }), t0, { sfx: 'pop2' }));
  texto(c, 480, 'Hoy dicen igual:', { size: 88 });
  const sa = texto(c, 1100, '«<span style="color:#2f7a4a">S</span>apato»', { size: 190 });
  sello(c, 1360, '¡IGUAL!', T.igual, { size: 150, r: -6 });
  return t => set(sa, { s: pop(t, T.igual - 0.6, 0.35), o: t > T.igual - 0.6 ? 1 : 0, r: -3 });
});
emu(T.igual + 0.9);

/* L10 · OJO: menos de uno de cada diez dice Z */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const ps = [...Array(10)].map((_, i) => box(c, 250 + (i % 5) * 160, 620 + Math.floor(i / 5) * 230, 140, 190, { zIndex: 6, borderRadius: '75px 75px 20px 20px', background: i === 0 ? ROJO : VERDE, border: `7px solid ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', lineHeight: '190px', color: '#fff' }, i === 0 ? 'Z' : 'S'));
  aparece(chip(c, 300, 1150, 'menos de 1 de cada 10', { size: 62, bg: YEL, color: INK }), T.uno10, { sfx: 'stamp' });
  return t => ps.forEach((q, i) => set(q, { s: pop(t, T.ojo + 0.3 + i * 0.12, 0.3), o: t > T.ojo + 0.3 + i * 0.12 ? 1 : 0 }));
});

/* L11 · O sea: los raros somos los de la Z */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'Los raros…', '…¡somos los de la Z!', { y: 480, size: 150, size2: 104, t2: T.deZ - 0.3, draw: c => { const z = LETRA(c, 400, 1000, 'Z', ROJO, 280); FX.fns.push(t => set(z, { r: Math.sin(t * 4) * 12 })); } });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final */
preguntaFinal('¿Y tú, «zapato»', 'con Z o con S?', { size: 110, draw: c => { LETRA(c, 200, 700, 'Z', ROJO, 240); LETRA(c, 640, 700, 'S', VERDE, 240); aparece(chip(c, 230, 1060, '📍 dime de dónde eres', { size: 62, bg: YEL, color: INK }), L(13) + 1.4); } });

/* L14 · cierre */
cierre(48, '¿Por qué la Z?', ['IDIOMA', 'y acentos']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
