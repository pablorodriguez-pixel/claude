/* Ep. 56 · El dulce de leche no lo inventó Argentina — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  arg0: Q('argentina'), trampa: Q('tiene trampa'),
  mil829: Q('mil ochocientos veintinueve'), rosas: Q('rosas'), lavalle: Q('lavalle'), enemigos: Q('dos enemigos'), paz: Q('firmar la paz'),
  criada: Q('una criada'), leche3: Q('leche con azúcar'), despista: Q('se despista'), vuelve: Q('cuando vuelve'), dulce3: Q('dulce de leche'),
  espera: Q('pero espera'), papel: Q('ni un solo papel'), leyenda: Q('es una leyenda'),
  manera: Q('a su manera'), cajeta: Q('cajeta'), arequipe: Q('arequipe'), manjar: Q('manjar'), doce: Q('doce de leite'),
  uruguay: Q('uruguay'), mate: Q('el mate'),
  ojo: Q('ojo'), francia: Q('francia'), napoleon: Q('napoleón'),
  inventor: Q('no tiene inventor'), seis: Q('seis nombres'),
};
const PAPELITO = c => figura(c, 240, 450, 600, 700, FIGP('M0,0 L600,0 L600,700 L0,700 Z', '#FBF6EA', 6, .15) + [...Array(9)].map((_, k) => `<path d="M70,${300 + k * 40} H530" stroke="${INK}" stroke-width="4" opacity=".35"/>`).join(''), '0 0 600 700', { z: 5 });
const DDL = '#a5652a', CELESTE = '#6CACE4';
const tarroInner = (rot = 'DULCE<br>DE LECHE') => `${FIGP('M60,90 C60,70 340,70 340,90 L330,420 C330,450 70,450 70,420 Z', '#f3efe6', 6, .12)}
  <path d="M72,170 L328,170 L330,420 C330,450 70,450 70,420 Z" fill="${DDL}" stroke="${INK}" stroke-width="5"/><path d="M110,200 C150,190 200,215 250,200" stroke="#d99a5c" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="40" y="30" width="320" height="70" rx="14" fill="${RED}" stroke="${INK}" stroke-width="6"/>${[...Array(8)].map((_, i) => `<path d="M${70 + i * 38},34 V96" stroke="${INK}" stroke-width="3" opacity=".4"/>`).join('')}
  <rect x="100" y="250" width="200" height="120" rx="10" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/><text x="200" y="300" text-anchor="middle" font-family="Rye" font-size="30" fill="${INK}">DULCE</text><text x="200" y="345" text-anchor="middle" font-family="Rye" font-size="26" fill="${INK}">DE LECHE</text>`;
const TARRO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 460 / 400, tarroInner(), '0 0 400 460', Object.assign({ z: 7, origin: '50% 100%' }, o));
const ollaInner = () => `${FIGP('M40,120 L360,120 L340,330 C330,360 70,360 60,330 Z', '#7d8790', 6, .3)}<rect x="20" y="100" width="360" height="34" rx="12" fill="#5c656d" stroke="${INK}" stroke-width="6"/><path d="M20,170 H-30 M380,170 H430" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
  <ellipse cx="200" cy="112" rx="160" ry="16" fill="#f3efe6" class="lec" stroke="${INK}" stroke-width="3"/>`;
const OLLA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 380 / 400, ollaInner(), '0 0 400 380', Object.assign({ z: 6, origin: '50% 100%' }, o));

/* L0 · PORTADA */
plano(-1, L(1) - 0.1, { background: '#3b2414' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(108,172,228,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, 'El dulce de leche…', { size: 84, color: '#fff' });
  const t2 = texto(c, 400, 'NO lo inventó<br>' + hlSpan('Argentina', 'phl') + ' 🇦🇷', { size: 104, italic: true, color: '#fff', shadow: OUTL(INK, 7) });
  const j = TARRO(c, 300, 690, 480);
  const x = box(c, 390, 860, 300, 300, { zIndex: 25 }, XSVG);
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(j, { r: Math.sin(t * 2.5) * 4 }); set(x, { s: 1 + 0.05 * Math.sin(t * 6), o: 0.9 }); };
}, { sfx: false });

/* L1 · la historia que te contaron tiene trampa */
plano(L(1) - 0.1, L(2) - 0.1, PAPEL, c => {
  const s = PAPELITO(c);
  texto(c, 640, 'La historia<br>oficial', { size: 90, italic: true, x: 240, w: 600, z: 8 });
  sello(c, 1050, '¡TRAMPA!', T.trampa, { size: 130, r: -8 });
  return t => set(s, { r: wobble(t, 0.4, 1.5) });
});

/* L2 · 1829: Rosas y Lavalle firman la paz */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#C9D3E6' }, c => {
  sello(c, 320, '1829', T.mil829, { size: 140, r: -4, col: INK });
  const a = figura(c, 80, 560, 400, 511, bustInner({ uniform: true, moustache: true, seed: 21 }), '0 0 360 460', { z: 6 });
  const b = figura(c, 600, 560, 400, 511, bustInner({ uniform: true, beard: true, seed: 8 }), '0 0 360 460', { z: 6 });
  aparece(chip(c, 140, 1090, 'Rosas', { size: 66, bg: RED }), T.rosas);
  aparece(chip(c, 660, 1090, 'Lavalle', { size: 66, bg: CELESTE, color: INK }), T.lavalle);
  aparece(texto(c, 720, '⚔️', { size: 150, x: 465, w: 150 }), T.enemigos, { sfx: 'thud' });
  aparece(chip(c, 330, 1240, '🤝 la paz', { size: 70, bg: '#fff', color: INK }), T.paz);
  return t => { set(a, { r: wobble(t, 0.4, 1.5) }); set(b, { r: wobble(t, 0.45, 1.5, 1), sx: -1 }); };
});

/* L3 · la criada se despista… ¡dulce de leche! */
plano(L(3) - 0.1, T.vuelve - 0.1, PAPEL, c => {
  const o = OLLA(c, 290, 760, 500);
  aparece(chip(c, 260, 520, '🥛 leche + azúcar', { size: 68, bg: '#fff', color: INK }), T.leche3);
  const hum = [0, 1, 2].map(i => texto(c, 640, '〰️', { size: 90, x: 380 + i * 110, w: 120 }));
  aparece(chip(c, 360, 1330 - 200, '💭 se despista…', { size: 62, bg: PINK }), T.despista, { sfx: 'boing' });
  return t => { set(o, { r: Math.sin(t * 12) * (t > T.despista ? 1.5 : 0.3) }); hum.forEach((h, i) => set(h, { y: -((t * 80 + i * 40) % 120), o: 0.7 })); };
});
plano(T.vuelve - 0.1, L(4) - 0.1, { background: YEL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const j = TARRO(c, 290, 520, 500);
  sello(c, 1180, '¡DULCE DE LECHE!', T.dulce3, { size: 100, r: -5 });
  return t => set(j, { s: pop(t, T.vuelve, 0.45), r: Math.sin(t * 3) * 5 });
});

/* L4 · pero espera: ni un solo papel lo demuestra. Es una leyenda */
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const s = PAPELITO(c);
  aparece(qMark(c, 460, 640, 220, PINK), T.papel, { sfx: 'boing' });
  sello(c, 1180, 'LEYENDA', T.leyenda, { size: 140, r: -8 });
  return t => set(s, { r: wobble(t, 0.4, 1.5), o: t > T.papel ? 0.5 : 1 });
});

/* L5 · CTA de seguir (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · cada país lo llama a su manera */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#EFE1C6' }, c => {
  const j = TARRO(c, 380, 330, 320);
  const nombres = [['🇲🇽 cajeta', T.cajeta, '#9fd3c0'], ['🇨🇴 arequipe', T.arequipe, YEL], ['🇨🇱 manjar', T.manjar, PINK], ['🇧🇷 doce de leite', T.doce, '#2e9e5b']].map(([s, t0, col], i) => aparece(chip(c, 120 + (i % 2) * 120, 760 + i * 140, s, { size: 74, bg: col, color: i === 3 ? '#fff' : INK }), t0, { sfx: 'pop2' }));
  return t => set(j, { r: Math.sin(t * 2) * 4, y: -Math.abs(Math.sin(t * 3)) * 20 });
});

/* L7 · Uruguay también lo reclama: tan suyo como el mate */
plano(L(7) - 0.1, L(8) - 0.1, { background: CELESTE }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.25)', 'rgba(0,0,0,0)', 0);
  const u = texto(c, 340, '🇺🇾 Uruguay:', { size: 110, color: '#fff', shadow: OUTL(INK, 7) });
  sello(c, 520, '¡ES NUESTRO!', T.uruguay + 0.5, { size: 110, r: -6, bg: 'rgba(255,255,255,.9)' });
  const j = TARRO(c, 160, 760, 360);
  const m = texto(c, 820, '🧉', { size: 300, x: 560, w: 400 });
  aparece(texto(c, 900, '=', { size: 180, x: 470, w: 150, color: '#fff', shadow: OUTL(INK, 6) }), T.mate - 0.2);
  return t => { set(m, { o: t > T.mate - 0.3 ? 1 : 0, s: pop(t, T.mate - 0.3, 0.4), r: Math.sin(t * 3) * 6 }); set(j, { r: Math.sin(t * 2.5) * 4 }); };
});
emu(T.mate + 0.8);

/* L8 · OJO: Francia y el cocinero de Napoleón */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const e = texto(c, 560, '🇫🇷👨‍🍳', { size: 220, x: 300, w: 600 });
  aparece(chip(c, 380, 960, 'otra leyenda 🤔', { size: 66, bg: PINK }), T.francia);
  aparece(chip(c, 380, 1110, 'cocinero de Napoleón', { size: 56, bg: '#fff', color: INK }), T.napoleon);
  return t => set(e, { r: Math.sin(t * 3) * 4 });
});

/* L9 · O sea: no tiene inventor… tiene seis nombres */
golpe(L(9) - 0.1, L(10) - 0.1, YEL, 'Sin inventor…', '…con seis<br>nombres', { y: 470, size: 130, size2: 120, t2: T.seis - 0.2 });

/* L10 · pregunta final */
preguntaFinal('¿Cómo se llama', 'en tu país?', { size: 100, draw: c => [['🇦🇷🇺🇾 dulce de leche', CELESTE], ['🇲🇽 cajeta', '#9fd3c0'], ['¿y en el tuyo? 👇', PINK]].map(([s, col], i) => aparece(chip(c, 120 + i * 60, 600 + i * 160, s, { size: 58, bg: col, color: INK }), L(10) + 0.4 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre (clip reutilizado del ep55) */
cierre(56, 'El dulce de leche', ['DULCE', 'de leche']);

Story.run({ ovalo: [[L(8), L(9) - 0.15]] });
