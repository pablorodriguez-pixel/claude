/* Ep. 41 · La Mona Lisa es famosa porque la robaron — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  robaron: Q('la robaron'), sosp: Q('sospechosos'), picasso1: Q('picasso'),
  louvre3: Q('del louvre'), tres3: Q('tres momentos'),
  robo4: Q('el robo'), y1911: Q('mil novecientos once'), hombre: Q('un hombre'), ropa: Q('bajo la ropa'), salio: Q('y salió'), tranq: Q('tranquilo'),
  nadie: Q('y nadie'), dia: Q('más de un día'), vigil: Q('los vigilantes'), foto: Q('fotografiar'),
  poeta: Q('un poeta'), apoll: Q('apollinaire'), porel: Q('y por él'), interr: Q('interrogando'), pablo: Q('pablo picasso'), inoc: Q('inocentes'),
  raro: Q('rarísimo'), cola: Q('hacía cola'), pared: Q('la pared vacía'),
  ladron: Q('el ladrón'), anios: Q('dos años'), florencia: Q('florencia'), pillaron: Q('le pillaron'), italia: Q('en italia'), heroe: Q('héroe'),
  ojo: Q('ojo'), admirado: Q('admirado'), famoso9: Q('el más famoso'),
  osea: Q('o sea'), creo: Q('lo creó'),
  hace: Q('y hace un año'), siete: Q('siete minutos'), joyas: Q('joyas'), siguen: Q('y siguen sin aparecer'),
};
const FRAME = (pa, x, y, w, inner, z = 6) => figura(pa, x, y, w, w * 1.3, frameInner(inner), '0 0 400 520', { z, origin: '50% 50%' });
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 330 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const PICASSO = () => bustInner({ uniform: 'farmer', seed: 41 }) + stripesOver();

/* L0 · PORTADA: la Gioconda en su marco + «¿Por qué es tan famosa?»; a «robaron» desaparece y cae ¡ROBADA! */
plano(-1, L(1) - 0.1, { background: '#7a2b2b', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 6px, transparent 6px 60px)' }, c => {
  texto(c, 300, '¿Por qué es tan', { size: 100, color: '#fff', shadow: OUTL(INK, 8) });
  const t2 = texto(c, 410, hlSpan('famosa?', 'phl'), { size: 140, italic: true, color: '#fff', shadow: OUTL(INK, 8) });
  const full = FRAME(c, 300, 600, 480, giocondaInner());
  const empty = FRAME(c, 300, 600, 480, '');
  sello(c, 1060, '¡ROBADA!', T.robaron + 0.15, { size: 140, r: -8 });
  sfx('swoosh_up', 0.05, 0.6); sfx('glitch', T.robaron, 0.6);
  return t => {
    const gone = t > T.robaron; full.style.visibility = gone ? 'hidden' : 'visible'; empty.style.visibility = gone ? 'visible' : 'hidden';
    set(full, { r: wobble(t, 0.6, 1.5), s: 1 + 0.02 * Math.sin(t * 5) }); set(empty, { r: shake(t, T.robaron, 0.4, 6) });
    set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
  };
}, { sfx: false });

/* L1 · Picasso, sospechoso (cartel de SE BUSCA) */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const poster = figura(c, 170, 300, 740, 900, `${FIGP('M0,0 L740,0 L740,900 L0,900 Z', '#F2E6C8', 6, .25)}<text x="370" y="120" text-anchor="middle" font-family="Rye" font-size="96" fill="${INK}">SOSPECHOSO</text><path d="M60,150 H680" stroke="${INK}" stroke-width="5"/>`, '0 0 740 900', { z: 4, origin: '50% 50%' });
  const pi = mk(c, [270, 470, 540, 690], PICASSO(), '0 0 360 460', 'bust'); pi.d.style.zIndex = 10;
  aparece(chip(c, 330, 1180, 'Pablo Picasso', { size: 64, bg: PINK }), T.picasso1, { sfx: 'stamp' });
  shakeAt(T.picasso1, 0.35, 16);
  return t => { set(poster, { r: -2 + wobble(t, 0.4, 0.8) }); set(pi.d, { y: wobble(t, 0.6, 3) }); };
});

/* L2 · marca */
marca(2);

/* L3 · «¿Cómo se roba un cuadro del Louvre?» */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  texto(c, 300, '¿Cómo se roba', { size: 92 });
  texto(c, 410, 'un cuadro del ' + hlSpan('Louvre?', 'lhl'), { size: 92 });
  const pyr = figura(c, 190, 560, 700, 480, `${FIGP('M350,20 L680,460 L20,460 Z', '#C9D3E6', 6, .35)}${[...Array(7)].map((_, k) => `<path d="M${350 - k * 47},${20 + k * 63} L${350 + k * 47},${20 + k * 63}" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M350,20 L350,460 M350,20 L185,460 M350,20 L515,460" stroke="${INK}" stroke-width="3"/>`, '0 0 700 480', { z: 4 });
  pinta(c, 'lhl', T.louvre3 + 0.2); NUMS(c, T.tres3);
});

/* PASO 1 · el robo (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('robo', 'shl'), T.robo4);
plano(L(4) - 0.1, T.salio - 0.06, PAPEL, c => {
  aparece(chip(c, 400, 560, '1911', { size: 100, bg: YEL, color: INK }), T.y1911, { sfx: 'stamp' });
  const th = mk(c, [240, 700, 520, 664], bustInner({ uniform: 'farmer', moustache: true, seed: 12 }) + `<path d="M40,460 C50,380 120,340 180,340 C240,340 310,380 320,460 Z" fill="#F4F0E6" stroke="${INK}" stroke-width="5"/>`, '0 0 360 460', 'bust');
  aparece(chip(c, 600, 760, 'ex-empleado', { size: 48, bg: PINK }), T.hombre);
  const fr = figura(c, 400, 1000, 200, 260, frameInner(giocondaInner()), '0 0 400 520', { z: 12, origin: '50% 50%' });
  sfx('swoosh_up', T.ropa, 0.5);
  return t => { set(th.d, { y: wobble(t, 0.6, 3) }); const k = p(t, T.ropa, 0.5, E.inOutCubic); set(fr, { y: k * 160, s: 1 - k * 0.6, o: 1 - k, r: k * 20 }); };
});
plano(T.salio - 0.06, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  const dr = figura(c, 600, 560, 340, 520, doorInner(0), '0 0 300 460', { z: 3, origin: '50% 50%' });
  const th = mk(c, [100, 700, 440, 562], bustInner({ uniform: 'farmer', moustache: true, seed: 12 }) + `<path d="M40,460 C50,380 120,340 180,340 C240,340 310,380 320,460 Z" fill="#F4F0E6" stroke="${INK}" stroke-width="5"/><path d="M150,380 L210,380 L210,440 L150,440 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`, '0 0 360 460', 'bust');
  aparece(chip(c, 140, 1180, 'tan tranquilo 😌', { size: 58, bg: YEL, color: INK }), T.tranq);
  return t => { dr.firstChild.innerHTML = doorInner(p(t, T.salio, 0.5)); set(th.d, { x: p(t, T.salio + 0.3, 1.6, E.inOutCubic) * 560, y: Math.abs(Math.sin(t * 7)) * -14 }); };
});
plano(L(5) - 0.1, T.vigil - 0.06, PAPEL, c => {
  const ck = mkClock(c, 270, 560, 540, { z: 6 });
  sello(c, 1150, '¡+1 DÍA!', T.dia + 0.1, { size: 140, r: -6 });
  sfx('clockfast', T.nadie, 0.5);
  return t => ck.setH(t * 5);
});
plano(T.vigil - 0.06, L(6) - 0.1, { background: '#7a2b2b' }, c => {
  const fr = FRAME(c, 330, 560, 420, '');
  const g = mk(c, [60, 820, 420, 537], bustInner({ hat: 'cap', uniform: 'officer', moustache: true, seed: 5 }), '0 0 360 460', 'bust');
  aparece(chip(c, 520, 1120, '«Estará en el fotógrafo»', { size: 46, bg: '#fff', color: INK }), T.foto - 0.4);
  aparece(texto(c, 1000, '📷', { size: 160, x: 700, w: 300 }), T.foto, { sfx: 'click' });
  return t => set(g.d, { r: wobble(t, 0.5, 2) });
});

/* PASO 2 · los sospechosos (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'Los ' + hlSpan('sospechosos', 'shl'), T.poeta - 0.3);
plano(L(6) - 0.1, T.porel - 0.06, PAPEL, c => {
  const ap = mk(c, [270, 580, 540, 690], bustInner({ uniform: 'officer', seed: 23 }), '0 0 360 460', 'bust');
  aparece(chip(c, 330, 1170, 'Apollinaire, poeta', { size: 56, bg: PINK }), T.apoll);
  const bars = aparece(figura(c, 240, 560, 600, 750, barsInner(), '0 0 400 500', { z: 20 }), T.poeta + 0.2, { sfx: 'thud' });
});
plano(T.porel - 0.06, T.inoc - 0.06, PAPEL, c => {
  const pi = mk(c, [270, 580, 540, 690], PICASSO(), '0 0 360 460', 'bust');
  aparece(chip(c, 300, 1170, 'Pablo Picasso 🇪🇸', { size: 60, bg: PINK }), T.pablo);
  sello(c, 600, 'INTERROGADO', T.interr + 0.1, { size: 100, r: -6 });
  return t => set(pi.d, { y: wobble(t, 0.6, 3) });
});
plano(T.inoc - 0.06, L(7) - 0.1, PAPEL, c => {
  mk(c, [40, 640, 480, 613], bustInner({ uniform: 'officer', seed: 23 }), '0 0 360 460', 'bust');
  mk(c, [540, 640, 480, 613], PICASSO(), '0 0 360 460', 'bust');
  sello(c, 1050, 'INOCENTES', T.inoc, { size: 130, col: '#2f7a4a', bg: 'rgba(255,255,255,.7)', r: -4 });
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#7a2b2b', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 6px, transparent 6px 60px)' }, c => {
  const fr = FRAME(c, 340, 580, 400, '');
  const heads = [0, 1, 2, 3, 4].map(i => mk(c, [-40 + i * 230, 960, 300, 383], bustInner({ hat: ['bowler', 'cap', 'slouch', 'brodie', 'bowler'][i], uniform: i % 2 ? 'farmer' : 'officer', seed: 50 + i }), '0 0 360 460', 'bust'));
  sello(c, 600, '¡LA PARED VACÍA!', T.pared + 0.1, { size: 92, r: -5 });
  aparece(chip(c, 360, 1260, 'cola para ver… nada', { size: 52, bg: YEL, color: INK }), T.cola);
  return t => heads.forEach((h, i) => set(h.d, { x: (1 - p(t, T.cola - 0.4 + i * 0.1, 0.5, E.outBack)) * 900, y: Math.abs(Math.sin(t * 3 + i)) * -10 }));
});
emu(T.pared + 0.9);

/* PASO 3 · el ladrón (L8) */
paso(L(8) - 0.1, L(9) - 0.1, 3, 'El ' + hlSpan('ladrón', 'shl'), T.ladron + 0.2);
plano(L(8) - 0.1, T.florencia - 0.06, PAPEL, c => {
  const trunk = figura(c, 220, 700, 640, 420, `${FIGP('M20,80 L620,80 L620,400 L20,400 Z', WOOD)}<rect x="20" y="40" width="600" height="60" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="6"/><rect x="290" y="150" width="60" height="70" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>`, '0 0 640 420', { z: 4 });
  aparece(chip(c, 380, 580, 'escondido', { size: 56, bg: PINK }), T.ladron + 0.8);
  aparece(chip(c, 400, 1170, '2 años', { size: 90, bg: YEL, color: INK }), T.anios, { sfx: 'stamp' });
});
plano(T.florencia - 0.06, L(9) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, -60, 1080, 1920, { zIndex: 2 }); m.innerHTML = europeSvg();
  const it = m.querySelector('.cIT');
  const [fx, fy] = euPj(11.25, 43.77);
  aparece(box(c, +fx - 30, +fy - 200, 60, 80, { zIndex: 12 }, pinSvg(RED)), T.florencia);
  aparece(chip(c, +fx + 30, +fy - 200, 'Florencia', { size: 52, bg: PINK }), T.florencia);
  sello(c, 820, '¡PILLADO!', T.pillaron + 0.1, { size: 120, r: -6 });
  const med = aparece(figura(c, 640, 980, 300, 300, coinBigInner('★'), '0 0 200 200', { z: 14 }), T.heroe - 0.2, { sfx: 'tada' });
  aparece(chip(c, 260, 1180, '¿un héroe?', { size: 64, bg: YEL, color: INK }), T.heroe);
  return t => it.setAttribute('opacity', t > T.italia ? 1 : 0);
});

/* L9 · OJO */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const fr = FRAME(c, 320, 560, 440, giocondaInner());
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 540, 1000, 'admirada ✓', { size: 54, bg: '#9fd3c0', color: INK }), T.admirado);
  aparece(chip(c, 470, 1100, 'la más famosa ✗', { size: 54, bg: PINK }), T.famoso9, { sfx: 'error' });
  return t => set(fr, { r: wobble(t, 0.5, 1.5) });
});

/* L10 · O sea: no se la llevó… la creó */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, 'No robó el cuadro más famoso…', '…¡LO CREÓ!', { y: 560, size: 104, size2: 170, t2: T.creo, draw: c => { figura(c, 380, 1000, 320, 416, frameInner(giocondaInner()), '0 0 400 520', { z: 6 }); } });

/* L11 · y hace un año… */
plano(L(11) - 0.1, L(12) - 0.1, { background: '#2f3550' }, c => {
  aparece(chip(c, 330, 300, 'Hace un año', { size: 76, bg: YEL, color: INK }), T.hace);
  const cr = figura(c, 240, 560, 600, 450, crownInner(), '0 0 400 300', { z: 6, origin: '50% 50%' });
  const ck = mkClock(c, 720, 860, 280, { z: 8 });
  aparece(chip(c, 700, 1160, '7 minutos', { size: 54, bg: PINK }), T.siete);
  sello(c, 1100, 'NI RASTRO', T.siguen + 0.2, { size: 120, r: -6 });
  return t => { ck.setH(t * 6); set(cr, { r: wobble(t, 0.5, 3), o: t > T.siguen + 0.1 ? clamp(1 - (t - T.siguen - 0.1) * 2) : 1, s: 1 + 0.03 * Math.sin(t * 5) }); };
});

/* L12 · pregunta final */
preguntaFinal('¿Dónde crees', 'que están?', { size: 116, draw: c => figura(c, 340, 640, 400, 300, crownInner(), '0 0 400 300', { z: 6 }) });

/* L13 · cierre */
cierre(41, 'La Mona Lisa robada', ['ARTE', 'de museo']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(5), T.vigil - 0.1]] });
