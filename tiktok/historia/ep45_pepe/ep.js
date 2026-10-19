/* Ep. 45 · ¿Por qué a los José les llaman Pepe? — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  padre0: Q('padre putativo'), bonita: Q('muy bonita'), sinPr: Q('sin pruebas'),
  jose3: Q('a un josé'), pepe3: Q('pepe'), tres3: Q('tres pasos'),
  bulo: Q('el bulo'), misales: Q('los misales'), sanJose: Q('san josé'), letras: Q('dos letras'), pp: Q('pe pe'), pater: Q('pater putativus'), leyo: Q('leyó'), pepe4: Q('pepe'),
  buscado: Q('han buscado'), casiNo: Q('casi no aparecen'),
  pista: Q('la pista'), anios: Q('quinientos años'), josepe6: Q('josepe'),
  facil: Q('lo fácil'), final7: Q('el final'), pp7: Q('pe pe'),
  prueba: Q('la prueba'), italia: Q('en italia'), peppe: Q('peppe'), cataluna: Q('en cataluña'), pep8: Q('pep'),
  guardiola: Q('pep guardiola'), esPepe: Q('es pepe'),
  ojo: Q('ojo'), academia: Q('academia mexicana'), pelea: Q('hay pelea'),
  tio: Q('tu tío pepe'), mismo: Q('mismo apodo'),
};
const TAG = (pa, x, y, w, n, z = 6) => figura(pa, x, y, w, w * 0.6, nameTagInner(n), '0 0 700 420', { z, origin: '50% 50%' });
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
// misal abierto con «S. JOSÉ, P.P.» (vb 0 0 760 480)
const MISAL = `${FIGP('M20,40 L370,20 L370,460 L20,470 Z', '#F7F0E0', 5, .2)}${FIGP('M390,20 L740,40 L740,470 L390,460 Z', '#F7F0E0', 5, .2)}<path d="M380,20 V470" stroke="${INK}" stroke-width="6"/>
 <text x="195" y="110" text-anchor="middle" font-family="Rye" font-size="44" fill="${RED}">MISSALE</text>${[...Array(8)].map((_, k) => `<path d="M60,${160 + k * 34} H330" stroke="${INK}" stroke-width="4" opacity=".45"/>`).join('')}
 <text x="565" y="170" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="60" fill="${INK}">S. JOSÉ</text>
 <text class="pp" x="565" y="290" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="120" fill="${RED}">P. P.</text>${[...Array(4)].map((_, k) => `<path d="M430,${340 + k * 30} H700" stroke="${INK}" stroke-width="4" opacity=".45"/>`).join('')}`;
const LUPA = `<circle cx="120" cy="120" r="100" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="14"/><circle cx="120" cy="120" r="100" fill="none" stroke="${BRASS}" stroke-width="7"/><path d="M190,190 L300,300" stroke="${INK}" stroke-width="34" stroke-linecap="round"/><path d="M190,190 L300,300" stroke="${WOOD}" stroke-width="20" stroke-linecap="round"/>`;

/* L0 · PORTADA: «Hola, me llamo José» + «¿Por qué Pepe?»; a «Padre Putativo» cae ¡FALSO! */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Por qué le llaman', { size: 92 });
  const t2 = texto(c, 400, hlSpan('Pepe?', 'phl'), { size: 170, italic: true });
  const tg = TAG(c, 200, 640, 680, 'José');
  aparece(chip(c, 230, 1110, '«Padre Putativo»', { size: 60, bg: '#fff', color: INK }), T.padre0 - 0.2);
  sello(c, 1180, '¡FALSO!', T.padre0 + 0.7, { size: 150, r: -8 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(tg, { r: -4 + wobble(t, 0.6, 2), s: 1 + 0.02 * Math.sin(t * 5) }); set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.04 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); };
}, { sfx: false });

/* L1 · «una historia muy bonita… pero sin pruebas» */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const m = figura(c, 160, 560, 760, 480, MISAL, '0 0 760 480', { z: 4, origin: '50% 50%' });
  aparece(chip(c, 300, 1080, 'muy bonita… 💗', { size: 64, bg: PINK }), T.bonita, { sfx: 'sparkle' });
  sello(c, 1200, 'SIN PRUEBAS', T.sinPr, { size: 120, r: -6 });
  return t => set(m, { r: wobble(t, 0.5, 1.5) });
});

/* L2 · marca */
marca(2);

/* L3 · José → ¿Pepe? */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = TAG(c, 60, 340, 520, 'José'); aparece(TAG(c, 500, 640, 520, 'Pepe', 7), T.pepe3, { sfx: 'pop2' });
  aparece(box(c, 380, 640, 200, 200, { zIndex: 8 }, arrowSvg('M20,20 Q160,40 180,180', PINK, 12)), T.pepe3 - 0.2);
  [0, 1].map(i => aparece(qMark(c, 880 - i * 760, 900 + i * 40, 130, i ? YEL : PINK), T.pepe3 + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => set(a, { r: -3 + wobble(t, 0.5, 1.5) });
});

/* PASO 1 · el bulo (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('bulo', 'shl'), T.bulo);
plano(L(4) - 0.1, T.leyo - 0.06, { background: '#E9D7B0' }, c => {
  const m = figura(c, 80, 560, 920, 581, MISAL, '0 0 760 480', { z: 4, origin: '50% 50%' });
  const pp = m.querySelector('.pp');
  aparece(chip(c, 260, 1180, '«Pater Putativus»', { size: 64, bg: YEL, color: INK }), T.pater);
  sfx('paper', T.misales, 0.6); sfx('ding', T.pp, 0.7);
  return t => { pp.setAttribute('opacity', t > T.letras ? 1 : 0); pp.setAttribute('font-size', t > T.pp && t < T.pp + 1.2 ? 140 : 120); set(m, { s: 1 + p(t, T.sanJose, 1.2) * 0.06 }); };
});
plano(T.leyo - 0.06, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  texto(c, 620, '<span style="color:#C8102E">P.</span> <span style="color:#C8102E">P.</span>', { size: 220 });
  const pe = texto(c, 900, '= PEPE', { size: 190, color: YEL, shadow: OUTL(INK, 10) });
  return t => set(pe, { s: pop(t, T.pepe4, 0.35), o: t > T.pepe4 ? 1 : 0, r: -4 });
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  const docs = [0, 1, 2, 3].map(i => figura(c, 60 + (i % 2) * 480, 580 + Math.floor(i / 2) * 300, 440, 260, `${FIGP('M10,10 L430,10 L430,250 L10,250 Z', '#F2E6C8', 5, .25)}${[...Array(5)].map((_, k) => `<path d="M40,${50 + k * 38} H${k % 2 ? 300 : 390}" stroke="${INK}" stroke-width="5" opacity=".5"/>`).join('')}`, '0 0 440 260', { z: 4 }));
  const lupa = figura(c, 300, 600, 320, 320, LUPA, '0 0 320 320', { z: 10 });
  sello(c, 1180, 'CASI NI RASTRO', T.casiNo, { size: 100, r: -5 });
  return t => set(lupa, { x: Math.sin(t * 1.6) * 260, y: Math.sin(t * 2.3) * 180 });
});

/* PASO 2 · la pista (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'La ' + hlSpan('pista', 'shl'), T.pista);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 340, 560, 'hace 500 años', { size: 66, bg: YEL, color: INK }), T.anios, { sfx: 'stamp' });
  const sc = figura(c, 140, 700, 800, 420, `${FIGP('M30,40 L770,40 L770,380 L30,380 Z', '#F2E6C8', 6, .3)}<circle cx="30" cy="210" r="36" fill="#E2D2A8" stroke="${INK}" stroke-width="5"/><circle cx="770" cy="210" r="36" fill="#E2D2A8" stroke="${INK}" stroke-width="5"/><text x="400" y="250" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="150" fill="${INK}">Josepe</text>`, '0 0 800 420', { z: 6, origin: '50% 50%' });
  sello(c, 1180, '¡JOSEPE!', T.josepe6 + 0.2, { size: 130, r: -6 });
  return t => set(sc, { s: pop(t, T.pista + 0.3, 0.4), r: -2 + wobble(t, 0.5, 1) });
});
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const w = texto(c, 600, 'JO·SE·<span class="pe" style="color:#C8102E">PE</span>', { size: 160 });
  const pp = texto(c, 880, 'PE · PE', { size: 210, color: RED });
  const b = figura(c, 60, 1000, 300, 333, babyInner(0), '0 0 360 400', { z: 6 });
  aparece(chip(c, 400, 1200, 'como con Paco 👶', { size: 56, bg: YEL, color: INK }), T.facil - 0.6);
  sfx('pop', T.pp7, 0.6); sfx('pop2', T.pp7 + 0.5, 0.7);
  return t => { set(pp, { s: pop(t, T.pp7, 0.35), o: t > T.pp7 ? 1 : 0, r: -4 }); w.querySelector('.pe').style.background = t > T.final7 ? YEL : 'none'; b.firstChild.innerHTML = babyInner(Math.abs(Math.sin(t * 9)) * 0.8); };
});

/* PASO 3 · la prueba (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'La ' + hlSpan('prueba', 'shl'), T.prueba);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, -60, 1080, 1920, { zIndex: 2 }); m.innerHTML = europeSvg();
  const it = m.querySelector('.cIT');
  const [ix, iy] = euPj(12.5, 42.5), [cx, cy] = euPj(1.8, 41.6);
  aparece(chip(c, +ix - 60, +iy - 40, 'Giuseppe → Peppe', { size: 46, bg: '#2f7a4a' }), T.peppe);
  aparece(box(c, +cx - 30, +cy - 140, 60, 80, { zIndex: 12 }, pinSvg(RED)), T.cataluna);
  aparece(chip(c, 60, +cy + 120, 'Josep → Pep', { size: 56, bg: PINK }), T.pep8, { sfx: 'pop2' });
  return t => it.setAttribute('opacity', t > T.italia ? 1 : 0);
});
golpe(L(9) - 0.1, L(10) - 0.1, '#2f7a4a', 'Pep Guardiola', '= PEPE', { y: 560, size: 104, size2: 220, t2: T.esPepe, draw: c => { const bl = texto(c, 1080, '⚽', { size: 220, x: 390, w: 300 }); FX.fns.push(t => set(bl, { r: t * 300, y: -Math.abs(Math.sin(t * 5)) * 80 })); } });
emu(T.esPepe + 0.6);

/* L10 · OJO: hay pelea */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 80, 620, 'Academia Mexicana: SÍ ✓', { size: 54, bg: '#9fd3c0', color: INK }), T.academia);
  aparece(chip(c, 380, 780, 'Etimólogos: NO ✗', { size: 54, bg: PINK }), T.academia + 1.0);
  aparece(texto(c, 900, '🥊 ¡PELEA! 🥊', { size: 120, color: RED }), T.pelea, { sfx: 'drumroll' });
});

/* L11 · O sea (golpe amarillo) */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'Tu tío Pepe…', '…y Pep Guardiola: ¡mismo apodo!', { y: 560, size: 130, size2: 86, t2: T.mismo - 0.4, draw: c => { TAG(c, 140, 1000, 380, 'Pepe'); TAG(c, 560, 1000, 380, 'Pep'); } });

/* L12 · CTA de seguir con cliffhanger de Charo */
sigueme(12, 'Como esta…', '¡tengo MUCHAS más!', 'sígueme');

/* L13 · pregunta final: menciona a tu Pepe */
preguntaFinal('¿Tienes un Pepe', 'en tu vida?', { size: 110, draw: c => { TAG(c, 240, 600, 600, 'Pepe'); aparece(chip(c, 300, 1000, '@ menciónale 👇', { size: 64, bg: YEL, color: INK }), L(13) + 1.2); } });

/* L14 · cierre */
cierre(45, '¿Por qué Pepe?', ['NOMBRES', 'y apodos']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
