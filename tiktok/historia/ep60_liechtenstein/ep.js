/* Ep. 60 · Fueron 80 a la guerra y volvieron 81 (Liechtenstein, 1866) — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  ochenta0: Q('ochenta'), uno0: Q('ochenta y uno'), despues: Q('todavía mejor'),
  mil866: Q('mil ochocientos sesenta y seis'), lie: Q('liechtenstein'), diminuto: Q('país diminuto'), suiza: Q('suiza'), austria2: Q('y austria'), guerra2: Q('entra en guerra'),
  todo: Q('todo su ejército'), ochenta3: Q('ochenta hombres'), alpes: Q('los alpes'), italia: Q('italia'),
  espera: Q('pero espera'), nadie: Q('no aparece nadie'), disparo: Q('ni un solo disparo'),
  acaba: Q('acaba la guerra'), casa: Q('vuelven a casa'), contarlos: Q('al contarlos'), uno6: Q('ochenta y uno'),
  amigo: Q('un amigo'),
  dosA: Q('dos años después'), atreve: Q('se atreve'), disuelve: Q('disuelve su ejército'),
  ojo: Q('ojo'), n81: Q('número ochenta y uno'),
  sinEj: Q('sin ejército'), invadido: Q('nadie lo ha invadido'),
};
const AZ = '#2b3f8c', ROJO = '#C8102E';
const soldInner = (col = AZ) => `<circle cx="30" cy="16" r="12" fill="#f2d4b4" stroke="${INK}" stroke-width="3"/><rect x="18" y="0" width="24" height="8" rx="3" fill="${INK}"/><path d="M14,30 L46,30 L44,70 L16,70 Z" fill="${col}" stroke="${INK}" stroke-width="3"/><path d="M20,70 L20,96 M40,70 L40,96" stroke="${INK}" stroke-width="7"/><path d="M48,24 L48,74" stroke="${INK}" stroke-width="4"/>`;
const SOLD = (c, x, y, w, col) => figura(c, x, y, w, w * 100 / 60, soldInner(col), '0 0 60 100', { z: 7 });
const PELOTON = (c, y0, n, w = 70, col) => [...Array(n)].map((_, i) => SOLD(c, 60 + (i % 12) * 80, y0 + Math.floor(i / 12) * 100, w, col));
const CONT = (c, y, txt, o = {}) => texto(c, y, txt, Object.assign({ size: 230, color: INK }, o));
const MONTES = (c, x, y, w) => { const b = box(c, x, y, w, w / 2, { zIndex: 5 }); b.innerHTML = `<svg viewBox="0 0 600 300" width="100%" height="100%" style="overflow:visible">${FIGP('M0,300 L150,70 L250,180 L360,20 L470,150 L600,300 Z', '#8fa07a', 6, .3)}<path d="M330,62 L360,20 L392,64 L372,54 L350,70 Z" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M125,108 L150,70 L178,110 L160,100 L142,114 Z" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`; return b; };

/* L0 · PORTADA: 80 → 81 */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, 'Fueron a la guerra…', { size: 92 });
  const a = CONT(c, 400, '80', { x: 60, w: 400, color: AZ }), fl = texto(c, 470, '➜', { size: 150, x: 440, w: 200 }), b = CONT(c, 400, '81', { x: 620, w: 400, color: ROJO });
  texto(c, 650, 'y volvieron <i>más</i>', { size: 80 });
  const s = PELOTON(c, 820, 36, 64);
  sello(c, 1180, '¿+1?', T.uno0, { size: 120, r: -6 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(a, { r: -3 }); set(b, { r: 3, s: 1 + 0.05 * Math.sin(t * 6) }); s.forEach((e, i) => set(e, { y: -Math.abs(Math.sin(t * 6 + i * 0.4)) * 10 })); };
}, { sfx: false });

/* L1 · y lo de después es todavía mejor */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const q = texto(c, 600, '🤯', { size: 320 });
  aparece(chip(c, 300, 1050, '…todavía mejor', { size: 80, bg: YEL, color: INK }), T.despues);
  return t => set(q, { s: pop(t, L(1) + 0.2, 0.4), r: Math.sin(t * 4) * 6 });
});

/* L2 · 1866: Liechtenstein, diminuto entre Suiza y Austria, entra en guerra con Austria */
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  sello(c, 320, '1866', T.mil866, { size: 150, r: -4, col: INK });
  const fs = [['🇨🇭', T.suiza, 90], ['🇱🇮', T.lie, 440], ['🇦🇹', T.austria2, 790]].map(([f, t0, x]) => [texto(c, 600, f, { size: 200, x, w: 220 }), t0]);
  const lupa = chip(c, 380, 880, '🔍 diminuto', { size: 70, bg: PINK });
  aparece(chip(c, 280, 1040, '⚔️ con Austria', { size: 70, bg: '#fff', color: INK }), T.guerra2);
  return t => { fs.forEach(([e, t0], i) => set(e, { s: (i === 1 ? 0.55 : 1) * pop(t, t0, 0.35), o: t > t0 ? 1 : 0 })); popA(lupa, t, T.diminuto, { r: -4 }); };
});

/* L3 · todo su ejército: 80 hombres, a un paso de los Alpes frente a Italia */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  const n = CONT(c, 300, '80', { size: 200, color: AZ });
  const s = PELOTON(c, 560, 80, 56);
  const m = box(c, 0, 0, 10, 10, {});
  aparece(chip(c, 320, 1270, '🏔️ los Alpes · 🇮🇹', { size: 60, bg: '#fff', color: INK }), T.alpes);
  return t => { set(n, { s: pop(t, T.todo, 0.4), o: t > T.todo ? 1 : 0 }); s.forEach((e, i) => set(e, { o: t > T.ochenta3 - 0.5 + i * 0.012 ? 1 : 0 })); set(m, { o: t > T.alpes - 0.2 ? 1 : 0, s: pop(t, T.alpes - 0.2, 0.4) }); };
});

/* L4 · allí arriba no aparece nadie: ni un disparo */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#C9D3E6' }, c => {
  const m = MONTES(c, 90, 520, 900);
  const s = PELOTON(c, 1000, 12, 64);
  aparece(qMark(c, 820, 420, 150, PINK), T.nadie, { sfx: 'boing' });
  sello(c, 330, 'NI UN DISPARO', T.disparo, { size: 100, r: -5 });
  return t => s.forEach((e, i) => set(e, { r: Math.sin(t * 2 + i) * 4 }));
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · vuelven a casa… y al contarlos: 81 */
plano(L(6) - 0.1, L(7) - 0.1, PAPEL, c => {
  const n = CONT(c, 320, '80', { color: AZ, size: 220 });
  const s = PELOTON(c, 600, 80, 56);
  const extra = SOLD(c, 60 + 8 * 80, 600 + 6 * 100, 56, ROJO);
  sello(c, 1420 - 200, '¡81!', T.uno6, { size: 150, r: -8 });
  return t => { const k = t > T.uno6; n.innerHTML = k ? '<span style="color:#C8102E">81</span>' : (t > T.contarlos ? String(Math.min(80, Math.floor((t - T.contarlos) * 90))) : '80'); set(extra, { o: k ? 1 : 0, s: pop(t, T.uno6, 0.4), y: k ? -Math.abs(Math.sin(t * 7)) * 20 : 0 }); };
});

/* L7 · habían hecho un amigo por el camino */
plano(L(7) - 0.1, L(8) - 0.1, { background: YEL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  const a = SOLD(c, 330, 620, 200, AZ), b = SOLD(c, 560, 620, 200, ROJO);
  texto(c, 500, '🤝', { size: 150 });
  aparece(chip(c, 260, 1060, '«un amigo por el camino»', { size: 60, bg: PINK }), T.amigo);
  return t => { set(a, { r: -6 + Math.sin(t * 5) * 4 }); set(b, { r: 6 - Math.sin(t * 5) * 4 }); };
});
emu(L(8) - 1.0);

/* L8 · dos años después disuelve su ejército */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 320, '1868', T.dosA, { size: 150, r: -4, col: INK });
  const s = PELOTON(c, 600, 48, 64);
  sello(c, 1180, 'SIN EJÉRCITO', T.disuelve + 0.4, { size: 110, r: -6 });
  return t => s.forEach((e, i) => set(e, { o: 1 - p(t, T.disuelve + i * 0.02, 0.3), y: p(t, T.disuelve + i * 0.02, 0.4) * 80 }));
});

/* L9 · OJO: nadie sabe quién era el 81 */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  const s = SOLD(c, 470, 560, 160, ROJO);
  aparece(qMark(c, 650, 560, 140, PINK), T.n81);
  aparece(chip(c, 400, 900, 'el nº 81: ¿quién? 🤔', { size: 60, bg: YEL, color: INK }), T.n81);
  return t => set(s, { r: Math.sin(t * 4) * 5 });
});

/* L10 · O sea */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, '+150 años…', '…sin ejército<br>y sin invasiones', { y: 470, size: 150, size2: 100, t2: T.sinEj - 0.2 });

/* L11 · pregunta final */
preguntaFinal('¿Qué país', 'se atrevería?', { size: 104, draw: c => [['🇨🇷 Costa Rica ya lo hizo', '#9fd3c0'], ['¿y el tuyo? 👇', PINK]].map(([s, col], i) => aparece(chip(c, 120 + i * 80, 640 + i * 170, s, { size: 58, bg: col, color: INK }), L(11) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre (clip reutilizado del ep55) */
cierre(60, '80 → 81', ['80 → 81', '1866'])

Story.run({ ovalo: [[L(9), L(10) - 0.15]] });
