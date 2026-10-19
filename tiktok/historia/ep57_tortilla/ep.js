/* Ep. 57 · La tortilla de patatas no es 100 % española — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  espanola0: Q('española'), estrella: Q('ingrediente estrella'), peru: Q('de perú'),
  llega: Q('la patata llega'), xvi: Q('siglo dieciséis'), andes: Q('desde los andes'), nadie: Q('casi nadie'),
  quien: Q('quién inventó'), zuma: Q('zumalacárregui'), guerra: Q('guerra carlista'), tropas: Q('sus tropas'),
  pues: Q('pues no'), mil817: Q('mil ochocientos diecisiete'), navarra: Q('navarra'), conPat: Q('tortilla con patatas'),
  mexico: Q('en méxico'), otra: Q('otra cosa'),
  maiz: Q('pan de maíz'), tlax: Q('tlaxcalli'), llamaron: Q('lo llamaron'), redondo: Q('pequeño y redondo'),
  ojo: Q('ojo'), extre: Q('extremadura'), mil798: Q('mil setecientos noventa y ocho'),
  peruana: Q('patata peruana'), mexico9: Q('con méxico'),
};
const HUEVO = '#f2c14e', DORADO = '#d9952e';
const tortillaInner = (partida = false) => `${cut('<ellipse cx="200" cy="150" rx="190" ry="120"/>')}<ellipse cx="200" cy="150" rx="190" ry="120" fill="${DORADO}" stroke="${INK}" stroke-width="6"/>
  <ellipse cx="200" cy="140" rx="165" ry="98" fill="${HUEVO}" stroke="${INK}" stroke-width="3"/>${[[120, 120], [230, 100], [280, 160], [170, 180], [90, 160], [300, 120]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="9" fill="${DORADO}" opacity=".7"/>`).join('')}
  ${partida ? `<path d="M200,25 L200,275" stroke="${INK}" stroke-width="8"/>` : `<path d="M200,140 L330,70 L360,150 Z" fill="#f7dc8a" stroke="${INK}" stroke-width="5"/>`}`;
const TORTILLA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 300 / 400, tortillaInner(o.partida), '0 0 400 300', Object.assign({ z: 7, origin: '50% 50%' }, o));
const patataInner = () => `${FIGP('M40,110 C30,50 120,20 200,30 C290,40 330,90 320,150 C310,210 230,240 150,230 C80,220 48,170 40,110 Z', '#b7834a', 6, .35)}${[[110, 90], [200, 70], [250, 150], [150, 170]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${INK}" opacity=".5"/>`).join('')}`;
const PATATA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 260 / 360, patataInner(), '0 0 360 260', Object.assign({ z: 7, origin: '50% 50%' }, o));
const maizInner = () => `${cut('<circle cx="200" cy="200" r="180"/>')}<circle cx="200" cy="200" r="180" fill="#f1e2b8" stroke="${INK}" stroke-width="6"/>${[[120, 140], [250, 110], [290, 230], [160, 260], [210, 190], [100, 230]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14" fill="#b58b4a" opacity=".55"/>`).join('')}`;
const MAIZ = (c, x, y, w, o = {}) => figura(c, x, y, w, w, maizInner(), '0 0 400 400', Object.assign({ z: 7, origin: '50% 50%' }, o));
const MONTES = (c, x, y, w) => { const b = box(c, x, y, w, w / 2, { zIndex: 5 }); b.innerHTML = `<svg viewBox="0 0 600 300" width="100%" height="100%" style="overflow:visible">${FIGP('M0,300 L150,70 L250,180 L360,20 L470,150 L600,300 Z', '#8fa07a', 6, .3)}<path d="M330,62 L360,20 L392,64 L372,54 L350,70 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`; return b; };

/* L0 · PORTADA: tortilla partida, mitad 🇪🇸 mitad 🇵🇪 */
plano(-1, L(1) - 0.1, { background: '#7a1f1f' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.18)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, 'La tortilla de patatas…', { size: 80, color: '#fff' });
  const t2 = texto(c, 400, 'NO es 100 % ' + hlSpan('española', 'phl'), { size: 104, italic: true, color: '#fff', shadow: OUTL(INK, 7) });
  const tl = TORTILLA(c, 140, 640, 800, { partida: true });
  texto(c, 1240, '🇪🇸 + 🇵🇪', { size: 120 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(tl, { r: Math.sin(t * 2) * 3 }); };
}, { sfx: false });

/* L1 · su ingrediente estrella vino de Perú */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const pt = PATATA(c, 290, 560, 500);
  aparece(chip(c, 360, 1000, '🇵🇪 de Perú', { size: 84, bg: RED }), T.peru, { sfx: 'ding' });
  return t => set(pt, { s: pop(t, T.estrella, 0.4), o: t > T.estrella ? 1 : 0, r: Math.sin(t * 3) * 8 });
});

/* L2 · llega en el siglo XVI desde los Andes; casi nadie se la quería comer */
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  sello(c, 320, 'SIGLO XVI', T.xvi, { size: 120, r: -4, col: INK });
  const m = MONTES(c, 240, 560, 600);
  aparece(chip(c, 380, 900, '⛰️ los Andes', { size: 66, bg: '#fff', color: INK }), T.andes);
  const pt = PATATA(c, 380, 1030, 300);
  aparece(chip(c, 280, 1270 - 40, '🤢 ¡qué asco!', { size: 64, bg: PINK }), T.nadie);
  return t => set(pt, { r: t > T.nadie ? Math.sin(t * 14) * 10 : 0, o: t > T.andes ? 1 : 0 });
});

/* L3 · el mito: Zumalacárregui y sus tropas */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 230, 330, '¿quién la inventó? 🤔', { size: 70, bg: YEL, color: INK }), T.quien);
  const g = figura(c, 340, 470, 400, 511, bustInner({ uniform: true, moustache: true, seed: 17 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 230, 1010, '⚔️ Zumalacárregui', { size: 70, bg: RED }), T.zuma);
  const tl = TORTILLA(c, 340, 1120, 400);
  aparece(chip(c, 300, 1250 + 50, 'guerra carlista · 1835', { size: 52, bg: '#fff', color: INK }), T.guerra, { sfx: false });
  return t => { set(g, { r: wobble(t, 0.4, 1.5) }); set(tl, { o: t > T.tropas - 0.2 ? 1 : 0, s: pop(t, T.tropas - 0.2, 0.4) }); };
});

/* L4 · pues no: Navarra, 1817 */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  sello(c, 320, '¡MITO!', T.pues, { size: 130, r: -8 });
  const lb = figura(c, 160, 560, 760, 480, libroViejoInner('NAVARRA · 1817', ['tortilla', 'con', 'patatas']), '0 0 760 480', { z: 6, origin: '50% 50%' });
  aparece(chip(c, 260, 1100, '📜 años antes de la guerra', { size: 58, bg: YEL, color: INK }), T.mil817 + 0.6);
  return t => set(lb, { s: pop(t, T.mil817, 0.4), o: t > T.mil817 ? 1 : 0, r: -2 + wobble(t, 0.4, 1) });
});

/* L5 · CTA de seguir (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6–L7 · en México, «tortilla» es otra cosa: el tlaxcalli */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#2e7a4a' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.16)', 'rgba(0,0,0,0)', 0);
  texto(c, 330, '🇲🇽 En México…', { size: 100, color: '#fff', shadow: OUTL(INK, 6) });
  const a = TORTILLA(c, 90, 700, 420), b = MAIZ(c, 600, 640, 380);
  texto(c, 780, '≠', { size: 200, x: 470, w: 150, color: '#fff', shadow: OUTL(INK, 6) });
  return t => { set(a, { r: Math.sin(t * 2) * 4 }); set(b, { o: t > T.otra - 0.3 ? 1 : 0, s: pop(t, T.otra - 0.3, 0.4) }); };
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#EFE1C6' }, c => {
  const m = MAIZ(c, 290, 420, 500);
  aparece(chip(c, 330, 960, '🌽 «tlaxcalli»', { size: 80, bg: YEL, color: INK }), T.tlax);
  sello(c, 1110, '= «TORTILLA»', T.llamaron + 0.5, { size: 110, r: -5 });
  return t => set(m, { s: pop(t, T.maiz, 0.4) * (t > T.redondo ? 1 - 0.25 * p(t, T.redondo, 0.4) : 1), r: t * 20 });
});
emu(T.redondo + 1.0);

/* L8 · OJO: Extremadura, 1798 */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const tl = TORTILLA(c, 390, 580, 400);
  aparece(chip(c, 430, 960, '📍 Extremadura', { size: 66, bg: '#2e7a4a' }), T.extre);
  aparece(chip(c, 450, 1110, '¿1798? 🤔', { size: 66, bg: PINK }), T.mil798);
  return t => set(tl, { r: Math.sin(t * 2) * 4 });
});

/* L9 · O sea */
golpe(L(9) - 0.1, L(10) - 0.1, YEL, 'Patata 🇵🇪…', '…y nombre<br>compartido 🇲🇽', { y: 470, size: 140, size2: 110, t2: T.peruana + 0.5 });

/* L10 · pregunta final */
preguntaFinal('¿Cómo se hace', 'en tu casa?', { size: 100, draw: c => [['🧅 con cebolla', YEL], ['🚫 sin cebolla', '#9fd3c0'], ['🌮 de maíz', PINK]].map(([s, col], i) => aparece(chip(c, 140 + i * 60, 600 + i * 160, s, { size: 60, bg: col, color: INK }), L(10) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L11 · cierre (clip reutilizado del ep55) */
cierre(57, 'La tortilla', ['TORTILLA', 'de patatas']);

Story.run({ ovalo: [[L(8), L(9) - 0.15]] });
