/* Ep. 53 · Por qué «México» se escribe con X y se dice con J — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  jota0: Q('con jota'), duele: Q('le duele'), culpa: Q('la culpa'), sh1: Q('sonaba sh'),
  equis3: Q('con equis'), jota3: Q('con jota'), tres3: Q('tres pasos'),
  sonido: Q('el sonido'), anios: Q('quinientos años'), sh4: Q('sonaba sh'), mexicas: Q('los mexicas'), meshico: Q('méshico'), escribieron: Q('lo escribieron así'),
  ingleses: Q('los ingleses'), sherry: Q('sherry'), xerez: Q('se escribía xerez'), quixote: Q('don quixote'),
  cambio: Q('el cambio'), aJota: Q('sonando a jota'), anio: Q('mil ochocientos quince'), academia: Q('la academia'), xj: Q('xerez jerez'), qq: Q('quixote quijote'),
  seis: Q('seis años después'), indep: Q('se independiza'), noToca: Q('no se toca'), bandera: Q('como bandera'),
  prueba: Q('la prueba'), mejico: Q('méjico'), mucho: Q('muchísimo tiempo'), propia: Q('la propia academia'), recomendo: Q('recomendó la equis'),
  cuatro: Q('cuatro formas'), w1: Q('méxico'), w2: Q('xochimilco'), w3: Q('xola'), w4: Q('taxi'),
  ojo: Q('ojo'), correcto: Q('es correcto'), noRec: Q('no se recomienda'),
  cicatriz: Q('una cicatriz'),
};
const VERDE = '#006847', ROJO = '#CE1126';
const LETRA = (c, x, y, ch, col, sz = 260) => box(c, x, y, sz, sz, { zIndex: 8, borderRadius: '30px', background: col, border: `10px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz * 0.8), lineHeight: px(sz * 0.95), color: '#fff' }, ch);
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 150, color: INK }, o));
const LIBRO = (c, x, y, w, tit, ls, o = {}) => figura(c, x, y, w, w * 480 / 760, libroViejoInner(tit, ls), '0 0 760 480', Object.assign({ z: 6, origin: '50% 50%' }, o));
const DIARIO = (c, x, y, w, cab, tit) => figura(c, x, y, w, w * 760 / 600, periodicoInner(cab, tit), '0 0 600 760', { z: 6, origin: '50% 50%' });
const BOTELLA = `${FIGP('M80,20 L120,20 L120,110 C170,140 180,180 180,230 L180,560 Q180,580 160,580 L40,580 Q20,580 20,560 L20,230 C20,180 30,140 80,110 Z', '#5a2a1a', 6, .3)}<rect x="74" y="0" width="52" height="34" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><rect x="34" y="300" width="132" height="150" fill="#F2E6C8" stroke="${INK}" stroke-width="5"/><text x="100" y="390" text-anchor="middle" font-family="Rye" font-size="34" fill="${RED}">XEREZ</text>`;
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));

/* L0 · PORTADA: «¿Por qué México se escribe con X?» — la J tachada */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(0,104,71,.2)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Por qué México', { size: 104 });
  const t2 = texto(c, 410, 'se escribe con ' + hlSpan('X?', 'phl'), { size: 124, italic: true });
  const w = PAL(c, 720, 'MÉ<span style="color:#CE1126;text-decoration:line-through;text-decoration-thickness:18px">J</span>ICO', { size: 190 });
  const x = LETRA(c, 400, 960, 'X', VERDE, 280);
  aparece(chip(c, 640, 1000, '😖 ¡duele!', { size: 70, bg: ROJO }), T.duele, { sfx: 'boing' });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(w, { r: -3 + wobble(t, 0.6, 1.5) }); set(x, { r: 6 + wobble(t, 0.5, 4), s: 1 + 0.06 * Math.sin(t * 5) }); };
}, { sfx: false });

/* L1 · la culpa: una letra que sonaba «sh» */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const x = LETRA(c, 390, 560, 'X', VERDE, 300);
  const sh = PAL(c, 980, '= «sh» 🤫', { size: 170, color: VERDE });
  return t => { set(x, { s: pop(t, L(1), 0.4), r: Math.sin(t * 3) * 6 }); set(sh, { s: pop(t, T.sh1, 0.35), o: t > T.sh1 ? 1 : 0 }); };
});

/* L2 · marca */
marca(2);

/* L3 · se escribe con X, se dice con J */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const a = box(c, 60, 400, 460, 300, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '24px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: '120px' }, `✍️ se escribe<br><span style="color:${VERDE};font-size:150px">X</span>`);
  const b = box(c, 560, 640, 460, 300, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, borderRadius: '24px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', lineHeight: '120px' }, `🗣️ se dice<br><span style="color:${ROJO};font-size:150px">J</span>`);
  [0, 1].map(i => aparece(qMark(c, 880 - i * 800, 420 + i * 560, 120, i ? YEL : PINK), T.jota3 + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => { set(a, { s: pop(t, T.equis3, 0.35), o: t > T.equis3 ? 1 : 0, r: -3 }); set(b, { s: pop(t, T.jota3, 0.35), o: t > T.jota3 ? 1 : 0, r: 3 }); };
});

/* PASO 1 · el sonido (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('sonido', 'shl'), T.sonido);
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 340, 560, 'hace 500 años', { size: 66, bg: YEL, color: INK }), T.anios, { sfx: 'stamp' });
  const x = LETRA(c, 140, 720, 'X', VERDE, 240);
  const sh = PAL(c, 760, '= «sh»', { size: 150, x: 420, w: 620, color: VERDE });
  aparece(chip(c, 140, 1060, '🦅🌵 los mexicas: «Méshico»', { size: 54, bg: '#fff', color: INK }), T.mexicas);
  const me = PAL(c, 1220, 'MÉ<span style="color:#006847">X</span>ICO', { size: 170 });
  sfx('paper', T.escribieron, 0.6);
  return t => { set(sh, { o: t > T.sh4 ? 1 : 0, s: pop(t, T.sh4, 0.35) }); set(me, { s: pop(t, T.escribieron, 0.4), o: t > T.escribieron ? 1 : 0, r: -3 }); };
});
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  aparece(chip(c, 330, 560, '🇬🇧 los ingleses…', { size: 64, bg: '#fff', color: INK }), T.ingles ?? T.ingleses);
  const b = figura(c, 120, 660, 180, 522, BOTELLA, '0 0 200 580', { z: 6 });
  aparece(chip(c, 60, 1200, '«sherry»', { size: 70, bg: '#5a2a1a' }), T.sherry, { sfx: 'pop2' });
  const l = LIBRO(c, 420, 820, 620, 'QUIXOTE', ['Don', 'Quixote']);
  aparece(chip(c, 520, 1250, '«Don Quixote»', { size: 62, bg: YEL, color: INK }), T.quixote, { sfx: 'pop2' });
  return t => { set(b, { r: Math.sin(t * 2) * 5, o: t > T.sherry - 0.4 ? 1 : 0 }); set(l, { s: pop(t, T.quixote - 0.3, 0.4), o: t > T.quixote - 0.3 ? 1 : 0, r: 3 }); };
});

/* PASO 2 · el cambio (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'El ' + hlSpan('cambio', 'shl'), T.cambio);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  const shj = PAL(c, 600, '«sh» → <span style="color:#CE1126">J</span>', { size: 170 });
  aparece(chip(c, 360, 560, '1815', { size: 90, bg: YEL, color: INK }), T.anio, { sfx: 'stamp' });
  const l = LIBRO(c, 220, 660, 640, 'ORTOGRAFÍA', ['Real', 'Academia']);
  const a = PAL(c, 1080, 'Xerez → <span style="color:#CE1126">J</span>erez', { size: 100 });
  const b = PAL(c, 1200, 'Quixote → Qui<span style="color:#CE1126">j</span>ote', { size: 90 });
  return t => { set(shj, { o: t > T.aJota - 0.4 && t < T.anio - 0.1 ? 1 : 0, s: pop(t, T.aJota - 0.4, 0.35) }); set(l, { s: pop(t, T.academia, 0.4), o: t > T.academia ? 1 : 0 }); set(a, { o: t > T.xj ? 1 : 0, s: pop(t, T.xj, 0.3) }); set(b, { o: t > T.qq ? 1 : 0, s: pop(t, T.qq, 0.3) }); };
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#F0F0E8' }, c => {
  [VERDE, '#fff', ROJO].map((col, i) => box(c, i * 360, 0, 360, 1920, { zIndex: 1, background: col, opacity: 0.35 }));
  aparece(chip(c, 280, 560, '🇲🇽 1821: independencia', { size: 62, bg: VERDE }), T.indep, { sfx: 'tada' });
  const x = LETRA(c, 350, 760, 'X', VERDE, 380);
  sello(c, 1150, '¡NO SE TOCA!', T.noToca, { size: 140, r: -6 });
  return t => set(x, { s: pop(t, T.seis, 0.4) * (t > T.bandera ? 1 + 0.06 * Math.sin(t * 6) : 1), r: t > T.bandera ? Math.sin(t * 5) * 8 : 0 });
});

/* PASO 3 · la prueba (L8–L9) */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'La ' + hlSpan('prueba', 'shl'), T.prueba);
plano(L(8) - 0.1, T.propia - 0.1, { background: '#E9D7B0' }, c => {
  const d = DIARIO(c, 260, 560, 560, 'DIARIO', ['NOTICIAS', 'DE MÉJICO']);
  aparece(chip(c, 260, 1320, '🇪🇸 durante muchísimo tiempo', { size: 54, bg: '#fff', color: INK }), T.mucho);
  return t => set(d, { s: pop(t, L(8) + 0.3, 0.4), o: t > L(8) + 0.3 ? 1 : 0, r: -3 });
});
plano(T.propia - 0.1, L(9) - 0.1, PAPEL, c => {
  const l = LIBRO(c, 160, 560, 760, 'ACADEMIA', ['Se recomienda:', 'México']);
  sello(c, 1150, '✓ MÉXICO', T.recomendo, { size: 150, r: -6 });
  return t => set(l, { s: pop(t, T.propia, 0.4), r: wobble(t, 0.4, 1) });
});
plano(L(9) - 0.1, L(10) - 0.1, { background: '#C9E0D4' }, c => {
  aparece(texto(c, 520, 'Una X, 4 sonidos:', { size: 84 }), T.cuatro - 0.4);
  [['Mé<b style="color:#006847">x</b>ico', '[ j ]', T.w1], ['<b style="color:#006847">X</b>ochimilco', '[ s ]', T.w2], ['<b style="color:#006847">X</b>ola', '[ sh ]', T.w3], ['ta<b style="color:#006847">x</b>i 🚕', '[ ks ]', T.w4]].map(([w, s, t0], i) => {
    aparece(texto(c, 680 + i * 170, w, { size: 92, x: 60, w: 620 }), t0, { sfx: 'pop' });
    aparece(chip(c, 700, 700 + i * 170, s, { size: 62, bg: [YEL, '#fff', PINK, '#9fd3c0'][i], color: INK }), t0 + 0.15);
  });
});
emu(T.w4 + 0.9);

/* L10 · OJO: «Méjico» no es falta */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 300, 620, 'Méjico ✓ correcto', { size: 64, bg: '#fff', color: INK }), T.correcto);
  aparece(chip(c, 300, 800, 'México ★ recomendado', { size: 64, bg: VERDE }), T.noRec);
});

/* L11 · O sea: esa X es una cicatriz de 500 años */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'No es un error…', '…es una cicatriz', { y: 470, size: 110, size2: 120, t2: T.cicatriz - 0.2, draw: c => { const x = LETRA(c, 400, 1000, 'X', VERDE, 280); FX.fns.push(t => set(x, { r: Math.sin(t * 4) * 10 })); } });

/* L12 · CTA de seguir */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final */
preguntaFinal('¿Qué palabra de tu país', 'escribe todo el mundo mal?', { size: 90, draw: c => { const p1 = LETRA(c, 220, 760, '✍️', YEL, 240); LETRA(c, 620, 760, '❌', '#fff', 240); } });

/* L14 · cierre */
cierre(53, '¿Por qué con X?', ['IDIOMA', 'y acentos']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
