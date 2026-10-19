/* Ep. 40 · El cambio de hora es culpa de un señor que cazaba bichos — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  bichos0: Q('bichos'), domingo: Q('este domingo'), mas1: Q('una hora más'),
  cazador3: Q('un cazador de bichos'), mundo3: Q('medio mundo'), tres3: Q('tres pasos'),
  franklin: Q('benjamin franklin'), pero4: Q('pero lo de franklin'), broma: Q('broma'), paris: Q('paris'), canon: Q('cañonazos'),
  hudson: Q('george hudson'), zelanda: Q('nueva zelanda'), correos: Q('correos'), quer: Q('y quería'), luz: Q('luz'), insectos: Q('insectos'),
  y1895: Q('mil ochocientos'), adelantar: Q('adelantar los relojes'), rieron: Q('y se rieron'),
  noCons: Q('lo que no consiguió'), guerra: Q('una guerra'), y1916: Q('mil novecientos'), alemania: Q('alemania'), carbon: Q('carbón'), semanas: Q('y en pocas'), europaC: Q('media europa'),
  ojo: Q('ojo'), mexico: Q('méxico'), y2022: Q('dos mil veintidós'),
  europaV: Q('y europa'), y2019: Q('dos mil diecinueve'), acuerdo: Q('puesto de acuerdo'),
  osea: Q('o sea'), gracias: Q('las gracias'), bichosR: Q('cazar bichos', 10),
};
const BF = (pa, x, y, s, col, z = 30) => { const d = figura(pa, x, y, 200 * s, 160 * s, '', '0 0 200 160', { z }); return { d, upd: t => { d.firstChild.innerHTML = butterflyInner(0.5 + 0.5 * Math.abs(Math.sin(t * 9)), col); } }; };
const vuela = (b, t, t0, x0, y0, x1, y1, d = 2.5) => { const k = clamp((t - t0) / d); set(b.d, { x: lerp(x0, x1, k) + Math.sin(t * 3) * 30, y: lerp(y0, y1, k) + Math.sin(t * 5) * 40, r: Math.sin(t * 4) * 12, o: t < t0 ? 0 : 1 }); b.upd(t); };

/* L0 · PORTADA: reloj gigante que va hacia atrás + «¿Quién cambia la hora?»; a «bichos» entra la mariposa y la red */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Quién te cambia', { size: 104 });
  const t2 = texto(c, 420, hlSpan('la hora?', 'phl'), { size: 130, italic: true });
  const ck = mkClock(c, 240, 600, 600, { z: 6 });
  const net = figura(c, 790, 640, 240, 500, netInner(), '0 0 200 420', { z: 12 });
  const b = BF(c, 0, 0, 1.1, PINK, 14);
  sello(c, 1180, '¡BICHOS!', T.bichos0, { size: 120, r: -8 });
  shakeAt(T.bichos0, 0.3, 14); sfx('swoosh_up', 0.05, 0.6);
  return t => {
    ck.setH(3 - t * 0.9); set(ck.d, { r: wobble(t, 0.8, 3), s: 1 + 0.02 * Math.sin(t * 6) });
    set(t2, { r: -2 + wobble(t, 0.5, 1), s: 1 + 0.03 * Math.sin(t * 3) });
    paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(net, { r: -18 + Math.sin(t * 4) * 14, x: 90 * (1 - p(t, T.bichos0 - 0.4, 0.3)) });
    b.upd(t); set(b.d, { x: 200 + Math.sin(t * 2.2) * 260, y: 980 + Math.sin(t * 3.1) * 120, r: Math.sin(t * 4) * 15 });
  };
}, { sfx: false });

/* L1 · «este domingo vas a dormir una hora más»: cama + reloj que salta de 3 a 2 + sello «+1 HORA» */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#2f3550' }, c => {
  box(c, 0, 1100, 1080, 820, { background: '#4a3b30' });
  const moon = figura(c, 760, 360, 220, 220, `<circle cx="100" cy="100" r="90" fill="#F4ECDB" stroke="${INK}" stroke-width="6"/><circle cx="140" cy="80" r="80" fill="#2f3550"/>`, '0 0 200 200', { z: 2 });
  const bed = figura(c, 160, 760, 760, 456, bedInner(), '0 0 600 360', { z: 5 });
  const ck = mkClock(c, 380, 380, 330, { z: 8 });
  const ch = aparece(chip(c, 120, 400, 'DOMINGO', { size: 58, bg: YEL, color: INK }), T.domingo);
  sello(c, 1180, '+1 HORA', T.mas1 + 0.2, { size: 130, col: '#fff', bg: 'rgba(200,16,46,.85)', r: -6 });
  return t => {
    const back = p(t, T.mas1, 0.6, E.outBack); ck.setH(3 - back);
    set(ck.d, { r: wobble(t, 0.7, 2) });
    bed.firstChild.innerHTML = bedInner(Math.sin(t * 2.4)); set(moon, { r: wobble(t, 0.3, 3) });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* L3 · «¿Cómo acaba un cazador de bichos cambiando la hora de medio mundo? En tres pasos.» */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  texto(c, 300, '¿Un cazador de bichos…', { size: 78 });
  const l2 = texto(c, 400, '…cambiando la hora del ' + hlSpan('mundo?', 'mhl'), { size: 78 });
  const g = figura(c, 300, 560, 480, 480, globeInner(0), '0 0 400 400', { z: 6 });
  const b = BF(c, 0, 0, 0.9, PINK, 10);
  const nums = [1, 2, 3].map((n, i) => aparece(box(c, 330 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), T.tres3 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
  pinta(c, 'mhl', T.mundo3);
  return t => { g.firstChild.innerHTML = globeInner(t * 0.4); set(l2, { o: t < T.cazador3 + 0.6 ? 0 : 1 }); vuela(b, t, L(3), 300, 900, 600, 620, 3); };
});

/* PASO 1 · Franklin (L4) */
paso(L(4) - 0.1, L(5) - 0.1, 1, 'No fue ' + hlSpan('Franklin', 'shl'), T.franklin + 0.3);
plano(L(4) - 0.1, T.pero4 - 0.06, PAPEL, c => {
  const f = mk(c, [250, 560, 580, 740], bustInner({ uniform: 'farmer', seed: 17 }) + `<circle cx="150" cy="210" r="22" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="210" cy="210" r="22" fill="none" stroke="${INK}" stroke-width="5"/><path d="M172,210 h16" stroke="${INK}" stroke-width="5"/>`, '0 0 360 460', 'bust');
  aparece(chip(c, 260, 1210, 'Benjamin Franklin', { size: 56, bg: PINK }), T.franklin);
  return t => set(f.d, { y: wobble(t, 0.6, 4), r: wobble(t, 0.4, 1.5) });
});
plano(T.pero4 - 0.06, L(5) - 0.1, { background: '#C9D3E6' }, c => {
  const sk = figura(c, 0, 900, 1080, 300, `<path d="M0,300 L0,200 L80,200 L80,120 L140,120 L140,180 L240,180 L240,60 L262,0 L284,60 L284,180 L380,180 L380,140 L470,140 L470,200 L600,200 L600,90 L640,40 L680,90 L680,200 L820,200 L820,150 L920,150 L920,210 L1080,210 L1080,300 Z" fill="#8a8f9e" stroke="${INK}" stroke-width="5"/>`, '0 0 1080 300', { z: 2 });
  aparece(chip(c, 700, 860, 'París', { size: 60, bg: YEL, color: INK }), T.paris);
  const cn = figura(c, 80, 1000, 620, 384, cannonInner(0), '0 0 420 260', { z: 6 });
  sello(c, 520, '¡BROMA!', T.broma, { size: 130, r: -8 });
  const bum = texto(c, 700, '¡BUM!', { size: 220, color: YEL, shadow: OUTL(INK, 10), z: 40, x: 400, w: 640 });
  sfx('thud', T.canon + 0.2, 1.2); shakeAt(T.canon + 0.2, 0.5, 26); sfx('boing', T.broma + 0.1, 0.5);
  return t => { cn.firstChild.innerHTML = cannonInner(clamp((t - T.canon - 0.2) * 4) * (t < T.canon + 0.9 ? 1 : 0)); set(bum, { s: pop(t, T.canon + 0.2, 0.3), r: -8, o: t < T.canon + 0.2 ? 0 : 1 }); };
});

/* PASO 2 · Hudson (L5–L6) */
paso(L(5) - 0.1, L(7) - 0.1, 2, 'Un ' + hlSpan('cartero', 'shl') + ' de Nueva Zelanda', T.correos);
plano(L(5) - 0.1, T.quer - 0.06, PAPEL, c => {
  const h = mk(c, [320, 560, 540, 690], englishInner(), '0 0 360 460', 'bust');
  aparece(chip(c, 190, 1220, 'George Hudson', { size: 56, bg: PINK }), T.hudson);
  aparece(chip(c, 560, 1290, 'Nueva Zelanda', { size: 44, bg: YEL, color: INK }), T.zelanda);
  const env = [0, 1, 2].map(i => aparece(figura(c, 60 + i * 30, 600 + i * 150, 240, 160, envelopeInner(), '0 0 300 200', { z: 12 }), T.correos + i * 0.12, { r: -10 + i * 8 }));
  return t => set(h.d, { y: wobble(t, 0.6, 4) });
});
plano(T.quer - 0.06, L(6) - 0.1, { background: '#F6E7B8' }, c => {
  const sun = figura(c, 600, 540, 380, 380, sunInner(), '0 0 300 300', { z: 3 });
  const h = mk(c, [300, 760, 480, 613], englishInner(), '0 0 360 460', 'bust');
  const net = figura(c, 640, 860, 240, 500, netInner(), '0 0 200 420', { z: 12 });
  const bs = [0, 1, 2, 3].map(i => BF(c, 0, 0, 0.7, [PINK, YEL, '#9fd3c0', PINK][i], 20));
  sello(c, 1120, '¡INSECTOS!', T.insectos, { size: 110, r: -6 });
  return t => {
    sun.firstChild.innerHTML = sunInner(t * 0.5); set(sun, { y: (1 - p(t, T.luz - 0.2, 0.5, E.outBack)) * 300, o: t < T.luz - 0.2 ? 0 : 1 });
    set(net, { r: -30 + Math.sin(t * 5) * 25 });
    bs.forEach((b, i) => vuela(b, t, T.insectos - 0.6 + i * 0.12, 100 + i * 200, 1250, 200 + i * 180, 600 + (i % 2) * 120, 2.2));
  };
});
plano(L(6) - 0.1, T.rieron - 0.06, PAPEL, c => {
  aparece(chip(c, 380, 560, '1895', { size: 110, bg: YEL, color: INK }), T.y1895, { sfx: 'stamp' });
  const ck = mkClock(c, 270, 720, 540, { z: 6 });
  const a = texto(c, 1280, 'adelantar los relojes', { size: 70, italic: true });
  sfx('clockfast', T.adelantar - 0.1, 0.5);
  return t => { ck.setH(10 + p(t, T.adelantar, 1.0, E.inOutCubic) * 2); set(a, { o: t < T.adelantar ? 0 : 1 }); };
});
golpe(T.rieron - 0.06, L(7) - 0.1, PINK, '¡JA, JA, JA!', 'se rieron de él', { y: 700, size: 170, t2: T.rieron + 0.3 });
emu(T.rieron + 0.4);

/* PASO 3 · la guerra (L7) */
paso(L(7) - 0.1, L(8) - 0.1, 3, 'Lo consiguió una ' + hlSpan('guerra', 'shl'), T.guerra + 0.2);
plano(L(7) - 0.1, T.y1916 - 0.06, PAPEL, c => {
  const net = figura(c, 140, 640, 280, 590, netInner(), '0 0 200 420', { z: 6 });
  const cn = figura(c, 470, 820, 560, 347, cannonInner(0), '0 0 420 260', { z: 6 });
  const x = aparece(figura(c, 120, 760, 340, 340, `<path d="M20,20 L320,320 M320,20 L20,320" stroke="${RED}" stroke-width="44" stroke-linecap="round"/>`, '0 0 340 340', { z: 9 }), T.noCons + 0.6, { sfx: 'error' });
  sello(c, 1180, '¡GUERRA!', T.guerra, { size: 130, r: -6 });
  return t => { set(net, { r: -10 + Math.sin(t * 3) * 6 }); cn.firstChild.innerHTML = cannonInner(t > T.guerra && t < T.guerra + 0.6 ? clamp((t - T.guerra) * 4) : 0); };
});
plano(T.y1916 - 0.06, L(8) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, -60, 1080, 1920, { zIndex: 2 }); m.innerHTML = europeSvg();
  const de = m.querySelector('.cDE'), at = m.querySelector('.cAT'), it = m.querySelector('.cIT');
  aparece(chip(c, 60, 560, '1916', { size: 110, bg: YEL, color: INK }), T.y1916, { sfx: 'stamp' });
  aparece(chip(c, 480, 600, 'Alemania', { size: 50, bg: PINK }), T.alemania);
  const coal = aparece(figura(c, 600, 1000, 400, 200, coalInner(), '0 0 400 200', { z: 10 }), T.carbon);
  const pins = [[-2, 53], [2.3, 48.8], [14, 47.5], [12.5, 42], [-3.7, 40.4], [19, 52], [4.9, 52.4], [18, 59.3]].map(([lo, la], i) => { const [x, y] = euPj(lo, la); return aparece(box(c, +x - 26, +y - 120, 52, 70, { zIndex: 12 }, pinSvg(RED)), T.europaC + i * 0.1, { sfx: i % 2 ? 'pop' : 'pop2' }); });
  return t => { de.setAttribute('opacity', t > T.alemania ? 1 : 0); at.setAttribute('opacity', t > T.europaC + 0.2 ? 1 : 0); it.setAttribute('opacity', t > T.europaC + 0.4 ? 1 : 0); };
});

/* L8 · OJO: en casi todo México ya no se cambia */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#C9D3C6' }, c => {
  const m = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); m.innerHTML = latamSvg();
  const [mx, my] = laPj(-102, 23);
  aparece(box(c, +mx - 30, +my - 140, 60, 80, { zIndex: 12 }, pinSvg(RED)), T.mexico);
  aparece(chip(c, +mx + 40, +my - 120, 'México', { size: 56, bg: PINK }), T.mexico);
  sello(c, 1060, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 640, 860, '2022', { size: 80, bg: YEL, color: INK }), T.y2022, { sfx: 'stamp' });
});

/* L9 · Europa votó quitarlo en 2019… y sin acuerdo */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, -60, 1080, 1920, { zIndex: 2 }); m.innerHTML = europeSvg();
  aparece(chip(c, 420, 300, '2019', { size: 110, bg: YEL, color: INK }), T.y2019, { sfx: 'stamp' });
  const ck = mkClock(c, 640, 760, 340, { z: 8 });
  sello(c, 1150, 'SIN ACUERDO', T.acuerdo - 0.3, { size: 110, r: -5 });
  return t => ck.setH(t * 3);
});

/* L10 · O sea (golpe amarillo) */
golpe(L(10) - 0.1, L(11) - 0.08, YEL, 'Dale las gracias…', '…al señor de los bichos', { y: 560, size: 120, size2: 104, t2: T.bichosR - 0.3, draw: c => { [0, 1, 2].forEach(i => { const b = BF(c, 160 + i * 280, 1000 + (i % 2) * 120, 1.1, i === 1 ? PINK : '#9fd3c0', 20); FX.fns.push(t => { b.upd(t); set(b.d, { y: Math.sin(t * 3 + i) * 30 }); }); }); } });

/* L11 · pregunta final */
preguntaFinal('¿Verano', 'o invierno?', { size: 120, draw: c => { figura(c, 120, 600, 380, 380, sunInner(), '0 0 300 300', { z: 6 }); figura(c, 600, 620, 340, 340, snowInner(), '0 0 300 300', { z: 6 }); texto(c, 650, 'o', { size: 120, x: 440, w: 200, italic: true }); } });

/* L12 · cierre */
cierre(40, 'El cambio de hora', ['EL RELOJ', 'de tu casa']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(8), L(10) - 0.15]] });
