/* Ep. 46 · ¿Por qué el teclado no va en orden? — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  desord: Q('desordenado'), aProp: Q('a propósito'), lento: Q('más lento'),
  qwe: Q('q w e'), abc: Q('a b c'), tres3: Q('tres pasos'),
  atasco: Q('el atasco'), anios: Q('ciento cincuenta años'), sholes: Q('sholes'), maquina: Q('máquina de escribir'), orden: Q('en orden'),
  varilla: Q('varilla de metal'), vecinas: Q('dos vecinas'), clac: Q('clac'), chocaban: Q('chocaban'), atascaba: Q('se atascaba'),
  truco: Q('el truco'), separo: Q('separó'), juntas: Q('juntas'), frenarte: Q('no para frenarte'), trabara: Q('no se trabara'),
  prueba: Q('la prueba'), fila: Q('la fila de arriba'), typew: Q('typewriter'), ingles: Q('en inglés'),
  espanol: Q('en español'), portero: Q('portero'), pruebalo: Q('pruébalo'),
  loco: Q('lo más loco'), anio36: Q('mil novecientos treinta y seis'), comodo: Q('más cómodo'), fracaso: Q('fracasó'), todos: Q('todos habían'),
  ojo: Q('ojo'), telegr: Q('telegrafistas'), atascos10: Q('atascos'),
  movil: Q('tu móvil'), siglo: Q('siglo y medio'),
};
const ROWS = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM'];
// teclado (vb 0 0 1000 330): cada tecla es <g data-l="X">
const KBD = (rows = ROWS, fs = 56) => `${FIGP('M0,0 L1000,0 L1000,330 L0,330 Z', '#3a3530', 6, .15)}` + rows.map((r, j) => [...r].map((ch, i) => {
  const x = 15 + j * 28 + i * 97, y = 15 + j * 103;
  return `<g data-l="${ch}"><rect x="${x}" y="${y}" width="88" height="92" rx="14" fill="#F7F0E0" stroke="${INK}" stroke-width="5"/><text x="${x + 44}" y="${y + 66}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="${fs}" fill="${INK}">${ch}</text></g>`;
}).join('')).join('');
const TECLADO = (pa, x, y, w, rows, o = {}) => figura(pa, x, y, w, w * 0.33, KBD(rows), '0 0 1000 330', Object.assign({ z: 6, origin: '50% 50%' }, o));
const luz = (k, on, col = YEL) => k.querySelectorAll('[data-l]').forEach(g => g.querySelector('rect').setAttribute('fill', on(g.dataset.l) ? col : '#F7F0E0'));
// escribe «pal» letra a letra entre t0 y t1, encendiendo la tecla de cada letra
function teclea(pa, k, pal, y, t0, t1, o = {}) {
  const out = texto(pa, y, '', { size: o.size || 130, color: o.color || INK });
  const n = pal.length, dt = (t1 - t0) / n;
  for (let i = 0; i < n; i++) sfx('click', t0 + i * dt, 0.5);
  return t => {
    const i = Math.max(0, Math.min(n, Math.floor((t - t0) / dt) + 1));
    out.innerHTML = t < t0 ? '' : pal.slice(0, i);
    const cur = t >= t0 && t < t1 ? pal[i - 1] : null;
    luz(k, l => o.fila ? ROWS[0].includes(l) && t > o.fila : false, '#ffe9a8');
    if (cur) k.querySelector(`[data-l="${cur}"] rect`).setAttribute('fill', PINK);
  };
}
// máquina de escribir (vb 0 0 700 520)
const MAQ = `${FIGP('M220,10 L480,10 L480,170 L220,170 Z', '#fff', 5, .1)}${[0, 1, 2].map(k => `<path d="M250,${50 + k * 34} H${k === 2 ? 380 : 450}" stroke="${INK}" stroke-width="5" opacity=".5"/>`).join('')}
 <rect x="120" y="160" width="460" height="56" rx="28" fill="#2b2622" stroke="${INK}" stroke-width="6"/><circle cx="120" cy="188" r="34" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><circle cx="580" cy="188" r="34" fill="${BRASS}" stroke="${INK}" stroke-width="6"/>
 ${FIGP('M90,230 L610,230 L680,500 L20,500 Z', '#2f4a3a', 7, .25)}
 ${[0, 1, 2].map(j => [...Array(9 - j)].map((_, i) => `<circle cx="${120 + j * 30 + i * 58}" cy="${330 + j * 52}" r="22" fill="#F7F0E0" stroke="${INK}" stroke-width="5"/>`).join('')).join('')}`;
// varillas que chocan (vb 0 0 600 520): dos barras que giran desde abajo hacia el centro
const VARILLAS = `<path d="M60,500 A260,260 0 0 1 540,500" fill="none" stroke="${INK}" stroke-width="8" opacity=".35"/>
 <g class="v1"><rect x="186" y="150" width="28" height="350" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><rect x="176" y="140" width="48" height="50" rx="8" fill="${INK}"/></g>
 <g class="v2"><rect x="386" y="150" width="28" height="350" rx="12" fill="${BRASS}" stroke="${INK}" stroke-width="6"/><rect x="376" y="140" width="48" height="50" rx="8" fill="${INK}"/></g>`;
// móvil (vb 0 0 400 760)
const MOVIL = `${FIGP('M20,20 Q20,0 40,0 L360,0 Q380,0 380,20 L380,740 Q380,760 360,760 L40,760 Q20,760 20,740 Z', '#222', 7, .1)}<rect x="45" y="40" width="310" height="680" rx="20" fill="#fff"/>
 <rect x="70" y="80" width="200" height="56" rx="26" fill="#d9f0e6"/><rect x="130" y="160" width="200" height="56" rx="26" fill="#9fd3c0"/>
 <g transform="translate(50,520) scale(0.3)">${KBD()}</g>`;
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));

/* L0 · PORTADA: «¿Por qué tu teclado está desordenado?» con el teclado temblando */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Por qué tu teclado', { size: 92 });
  const t2 = texto(c, 400, 'está ' + hlSpan('desordenado?', 'phl'), { size: 124, italic: true });
  const k = TECLADO(c, 50, 720, 980, ROWS);
  aparece(chip(c, 250, 1150, '¡A PROPÓSITO! 😈', { size: 68, bg: RED }), T.aProp, { sfx: 'stamp' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(k, { r: wobble(t, 0.7, 2) }); luz(k, l => 'QWERTY'.includes(l) && Math.sin(t * 6 + l.charCodeAt(0)) > 0, PINK); };
}, { sfx: false });

/* L1 · «no es para que escribas más lento» */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const s = texto(c, 640, '🐌', { size: 340 });
  aparece(chip(c, 230, 1060, '¿para ir más lento?', { size: 64, bg: '#fff', color: INK }), T.lento - 0.5);
  sello(c, 1200, '¡NO!', T.lento + 0.3, { size: 170, r: -8 });
  return t => set(s, { x: -120 + (t - L(1)) * 90, r: wobble(t, 0.5, 3) });
});

/* L2 · marca */
marca(2);

/* L3 · QWERTY contra ABC */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = texto(c, 420, 'Q W E R T Y', { size: 140, color: RED });
  const b = texto(c, 700, 'A B C D E F', { size: 140, color: '#2f7a4a' });
  [0, 1].map(i => aparece(qMark(c, 880 - i * 760, 880 + i * 40, 130, i ? YEL : PINK), T.abc + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(a, { s: pop(t, T.qwe, 0.3), o: t > T.qwe ? 1 : 0, r: -3 }); set(b, { s: pop(t, T.abc, 0.3), o: t > T.abc ? 1 : 0, r: 2 }); };
});

/* PASO 1 · el atasco (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('atasco', 'shl'), T.atasco);
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 320, 520, 'hace 150 años', { size: 66, bg: YEL, color: INK }), T.anios, { sfx: 'stamp' });
  const m = figura(c, 160, 640, 760, 565, MAQ, '0 0 700 520', { z: 6 });
  aparece(chip(c, 80, 1250, 'Sholes ✍️', { size: 60, bg: PINK }), T.sholes);
  const ab = texto(c, 1240, 'A B C D E…', { size: 110, x: 420, w: 640, color: '#2f7a4a' });
  sfx('click', T.maquina, 0.5); sfx('click', T.maquina + 0.15, 0.5); sfx('ding', T.maquina + 0.5, 0.5);
  return t => { set(m, { s: pop(t, T.anios + 0.3, 0.4), r: wobble(t, 0.6, 1), y: t > T.maquina && t < T.maquina + 0.6 ? -10 * Math.abs(Math.sin(t * 30)) : 0 }); set(ab, { s: pop(t, T.orden, 0.35), o: t > T.orden ? 1 : 0 }); };
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  const v = figura(c, 140, 520, 800, 693, VARILLAS, '0 0 600 520', { z: 6, origin: '50% 50%' });
  const v1 = v.querySelector('.v1'), v2 = v.querySelector('.v2');
  aparece(chip(c, 260, 1260, 'una varilla por letra', { size: 58, bg: YEL, color: INK }), T.varilla);
  sello(c, 600, '¡CLAC!', T.clac, { size: 180, r: -10 });
  sello(c, 1010, '¡ATASCO!', T.atascaba, { size: 140, r: -5 });
  sfx('thud', T.clac, 0.8); sfx('error', T.atascaba, 0.5);
  return t => {
    const a1 = p(t, T.vecinas, 0.5) * 28, a2 = p(t, T.vecinas + 0.25, 0.5) * 28;
    v1.setAttribute('transform', `rotate(${a1} 200 500)`); v2.setAttribute('transform', `rotate(${-a2} 400 500)`);
    if (t > T.clac) shake(v, t, T.clac, 0.5, 18);
  };
});

/* PASO 2 · el truco (L6) */
paso(L(6) - 0.1, L(7) - 0.1, 2, 'El ' + hlSpan('truco', 'shl'), T.truco);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  const k = TECLADO(c, 50, 620, 980, ROWS);
  const pares = ['T', 'H', 'E', 'R'];
  aparece(chip(c, 140, 1020, 'las que van juntas… ¡separadas! ↔️', { size: 54, bg: YEL, color: INK }), T.juntas);
  aparece(chip(c, 120, 1180, 'no para frenarte a ti 🐌❌', { size: 54, bg: '#fff', color: INK }), T.frenarte);
  sello(c, 1330, '¡SIN ATASCOS!', T.trabara, { size: 110, r: -5 });
  return t => { luz(k, l => t > T.separo && pares.includes(l) && Math.sin(t * 8) > -0.3, PINK); set(k, { r: wobble(t, 0.5, 1) }); };
});

/* PASO 3 · la prueba: «typewriter» y «portero» con la fila de arriba (L7–L8) */
paso(L(7) - 0.1, L(9) - 0.1, 3, 'La ' + hlSpan('prueba', 'shl'), T.prueba);
plano(L(7) - 0.1, L(9) - 0.1, PAPEL, c => {
  const k = TECLADO(c, 50, 580, 980, ROWS);
  const flecha = aparece(box(c, 880, 470, 160, 160, { zIndex: 9 }, arrowSvg('M140,10 Q120,100 30,140', PINK, 12)), T.fila);
  const w1 = teclea(c, k, 'TYPEWRITER', 960, T.typew - 0.1, T.typew + 1.1, { fila: T.fila, color: INK });
  const ch = aparece(chip(c, 240, 1110, '= máquina de escribir 🇬🇧', { size: 52, bg: '#fff', color: INK }), T.ingles);
  const w2 = teclea(c, k, 'PORTERO', 1260, T.portero - 0.1, T.portero + 0.9, { fila: T.fila, size: 150, color: RED });
  aparece(chip(c, 300, 1450, '¡pruébalo! 📱', { size: 70, bg: YEL, color: INK }), T.pruebalo, { sfx: 'tada' });
  return t => { w1(t); if (t > T.portero - 0.1) w2(t); };
});

/* L9 · 1936: un teclado más cómodo… que fracasó */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#C9D3E6' }, c => {
  aparece(chip(c, 380, 360, '1936', { size: 90, bg: YEL, color: INK }), T.anio36, { sfx: 'stamp' });
  const k = TECLADO(c, 50, 560, 980, ['PYFGCRL', 'AOEUIDHTNS', 'QJKXBMWVZ']);
  aparece(chip(c, 260, 940, 'más cómodo ✨', { size: 64, bg: '#9fd3c0', color: INK }), T.comodo);
  sello(c, 1010, '¡FRACASÓ!', T.fracaso, { size: 150, r: -7 });
  aparece(chip(c, 140, 1220, 'todos sabían QWERTY 🤷', { size: 58, bg: PINK }), T.todos);
  return t => { set(k, { r: wobble(t, 0.5, 1.5), o: t > T.fracaso ? 0.45 : 1 }); };
});
emu(T.todos + 1.0);

/* L10 · OJO: telegrafistas contra atascos */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 120, 640, 'telegrafistas 📡', { size: 60, bg: '#9fd3c0', color: INK }), T.telegr);
  aparece(chip(c, 440, 800, 'atascos ⚙️', { size: 60, bg: PINK }), T.atascos10);
  aparece(texto(c, 1000, '🥊 ¡HAY PELEA! 🥊', { size: 104, color: RED }), T.atascos10 + 0.6, { sfx: 'drumroll' });
});

/* L11 · O sea: tu móvil, con el orden de una máquina del siglo XIX */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'Tu móvil…', '…teclado del siglo XIX', { y: 480, size: 130, size2: 92, t2: T.siglo - 0.5, draw: c => { const m = figura(c, 160, 900, 300, 570, MOVIL, '0 0 400 760', { z: 6 }); figura(c, 520, 1000, 420, 312, MAQ, '0 0 700 520', { z: 6 }); FX.fns.push(t => set(m, { r: -6 + wobble(t, 0.6, 2) })); } });

/* L12 · CTA de seguir: lo que llevas en el bolsillo */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final: ¿dos dedos o diez? */
preguntaFinal('¿Escribes con dos', 'dedos o con diez?', { size: 104, draw: c => { const k = TECLADO(c, 50, 640, 980, ROWS); aparece(chip(c, 200, 1050, '✌️ dos   o   diez 🙌', { size: 64, bg: YEL, color: INK }), L(13) + 1.0); FX.fns.push(t => luz(k, l => Math.sin(t * 7 + l.charCodeAt(0) * 1.7) > 0.6, PINK)); } });

/* L14 · cierre */
cierre(46, '¿Por qué QWERTY?', ['OBJETOS', 'de cada día']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
