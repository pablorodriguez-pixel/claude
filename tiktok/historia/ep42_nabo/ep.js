/* Ep. 42 · La calabaza de Halloween era un nabo — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  nabo0: Q('un nabo'), miedo: Q('más miedo'),
  cara3: Q('con cara'), calab3: Q('una calabaza'), tres3: Q('tres pasos'),
  irlanda: Q('irlanda'), difuntos: Q('noche de difuntos'), caras: Q('caras horribles'), vela: Q('una vela'), ventanas: Q('ventanas'),
  jack5: Q('jack el tacaño'), diablo5: Q('al diablo'), dos5: Q('una vez dos'),
  moneda: Q('una moneda'), bolsillo: Q('el bolsillo'), cruz6: Q('una cruz'), escapar: Q('escapar'),
  arbol: Q('un árbol'), cruz7: Q('una cruz'), bajar: Q('bajar'),
  murio: Q('jack murió'), cielo: Q('en el cielo'), tramposo: Q('tramposo'), infierno: Q('en el infierno'), tampoco: Q('tampoco'),
  brasa: Q('una brasa'), nabo9: Q('en un nabo'), vaga: Q('vaga'), linterna: Q('linterna'),
  millones: Q('millones de irlandeses'), eeuu: Q('estados unidos'), calab10: Q('la calabaza'),
  ojo: Q('ojo'), version: Q('quién la cuente'),
  cada: Q('cada calabaza'), linternaR: Q('la linterna'), diabloR: Q('ni el diablo'),
};
const NOCHE = { background: '#1f2236', backgroundImage: 'radial-gradient(circle at 50% 40%, #3a3f63 0, #1f2236 70%)' };
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const flick = t => 0.6 + 0.4 * Math.abs(Math.sin(t * 13) * Math.sin(t * 7.3));
const JACK = () => bustInner({ hat: 'slouch', uniform: 'farmer', beard: true, seed: 66 });
const GLOW = (pa, x, y, r) => box(pa, x - r, y - r, r * 2, r * 2, { borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,190,60,.55), rgba(255,140,0,0) 70%)', zIndex: 3 });

/* L0 · PORTADA: calabaza gigante + «¿Qué era antes la calabaza?»; a «nabo» se convierte en nabo */
plano(-1, L(1) - 0.1, NOCHE, c => {
  texto(c, 300, '¿Qué era antes', { size: 100, color: '#fff', shadow: OUTL(INK, 8) });
  const t2 = texto(c, 410, 'la ' + hlSpan('calabaza?', 'phl', '#E57A2A'), { size: 130, italic: true, color: '#fff', shadow: OUTL(INK, 8) });
  const gl = GLOW(c, 540, 860, 420);
  const pk = figura(c, 240, 600, 600, 565, pumpkinInner(1), '0 0 340 320', { z: 6, origin: '50% 50%' });
  const tn = figura(c, 270, 560, 540, 612, turnipInner(1), '0 0 300 340', { z: 6, origin: '50% 50%' });
  sello(c, 1150, '¡UN NABO!', T.nabo0, { size: 140, r: -8 });
  sfx('swoosh_up', 0.05, 0.6); sfx('glitch', T.nabo0 - 0.05, 0.6);
  return t => {
    const sw = t > T.nabo0 - 0.05; pk.style.visibility = sw ? 'hidden' : 'visible'; tn.style.visibility = sw ? 'visible' : 'hidden';
    pk.firstChild.innerHTML = pumpkinInner(flick(t)); tn.firstChild.innerHTML = turnipInner(flick(t));
    set(pk, { r: wobble(t, 0.6, 2), s: 1 + 0.02 * Math.sin(t * 5) }); set(tn, { r: wobble(t, 0.6, 2) + shake(t, T.nabo0, 0.4, 6) });
    set(gl, { o: flick(t) }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
  };
}, { sfx: false });

/* L1 · «daba muchísimo más miedo»: el nabo en primer plano, temblando */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#0f1020' }, c => {
  const gl = GLOW(c, 540, 900, 520);
  const tn = figura(c, 140, 420, 800, 907, turnipInner(1), '0 0 300 340', { z: 6, origin: '50% 50%' });
  sello(c, 1250, 'MÁS MIEDO', T.miedo, { size: 130, col: '#fff', bg: 'rgba(200,16,46,.85)', r: -5 });
  sfx('sad', T.miedo - 0.3, 0.5);
  return t => { tn.firstChild.innerHTML = turnipInner(flick(t)); set(tn, { s: 1 + p(t, L(1), 2.5, E.linear) * 0.12, r: Math.sin(t * 30) * 0.8 }); set(gl, { o: flick(t) }); };
});

/* L2 · marca */
marca(2);

/* L3 · nabo vs calabaza */
plano(L(3) - 0.1, L(4) - 0.12, NOCHE, c => {
  texto(c, 300, '¿Por qué con cara…', { size: 84, color: '#fff', shadow: OUTL(INK, 6) });
  const l2 = texto(c, 400, '…y por qué hoy calabaza?', { size: 76, color: '#fff', shadow: OUTL(INK, 6) });
  const tn = figura(c, 90, 600, 400, 453, turnipInner(1), '0 0 300 340', { z: 6 });
  const pk = aparece(figura(c, 560, 640, 440, 414, pumpkinInner(1), '0 0 340 320', { z: 6 }), T.calab3);
  NUMS(c, T.tres3);
  return t => { tn.firstChild.innerHTML = turnipInner(flick(t)); set(l2, { o: t < T.calab3 - 0.6 ? 0 : 1 }); };
});

/* PASO 1 · Irlanda (L4) */
paso(L(4) - 0.1, L(5) - 0.1, 1, 'En ' + hlSpan('Irlanda', 'shl'), T.irlanda);
plano(L(4) - 0.1, L(5) - 0.1, NOCHE, c => {
  aparece(chip(c, 300, 560, 'noche de difuntos', { size: 60, bg: '#9fd3c0', color: INK }), T.difuntos);
  const house = figura(c, 90, 680, 900, 640, `${FIGP('M60,640 L60,240 L450,20 L840,240 L840,640 Z', '#5a4a3e', 6, .5)}<rect x="160" y="300" width="250" height="230" fill="#14121c" stroke="${INK}" stroke-width="8"/><rect x="490" y="300" width="250" height="230" fill="#14121c" stroke="${INK}" stroke-width="8"/><path d="M285,300 V530 M160,415 H410 M615,300 V530 M490,415 H740" stroke="${INK}" stroke-width="6"/>`, '0 0 900 640', { z: 3 });
  const tns = [[200, 1010], [530, 1010], [750, 1010]].map(([x, y], i) => aparece(figura(c, x, y, 180, 204, turnipInner(1), '0 0 300 340', { z: 8 }), T.ventanas - 0.2 + i * 0.15));
  const big = aparece(figura(c, 380, 760, 320, 362, turnipInner(1), '0 0 300 340', { z: 9 }), T.caras, { sfx: 'boing' });
  sfx('sparkle', T.vela, 0.5);
  return t => { [...tns, big].forEach((e, i) => e.firstChild.innerHTML = turnipInner(t > T.vela ? flick(t + i) : 0)); set(big, { o: t > T.ventanas - 0.3 ? 0 : 1 }); };
});

/* PASO 2 · Jack el Tacaño (L5–L9) */
paso(L(5) - 0.1, L(10) - 0.1, 2, hlSpan('Jack', 'shl') + ' el Tacaño', T.jack5);
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  const j = mk(c, [60, 640, 460, 588], JACK(), '0 0 360 460', 'bust');
  const d = aparece(figura(c, 560, 600, 440, 562, devilInner(0), '0 0 360 460', { z: 6 }), T.diablo5, { sfx: 'boing' });
  aparece(chip(c, 80, 1210, 'Jack el Tacaño', { size: 56, bg: PINK }), T.jack5);
  sello(c, 1180, '× 2', T.dos5 + 0.3, { size: 150, r: -6 });
  return t => { set(j.d, { y: wobble(t, 0.6, 4) }); d.firstChild.innerHTML = devilInner(Math.abs(Math.sin(t * 6)) * 0.5); };
});
plano(L(6) - 0.1, L(7) - 0.1, PAPEL, c => {
  aparece(chip(c, 60, 560, 'Engaño 1', { size: 60, bg: YEL, color: INK }), L(6));
  const dv = figura(c, 300, 600, 440, 562, devilInner(0), '0 0 360 460', { z: 6, origin: '50% 50%' });
  const coin = figura(c, 390, 700, 300, 300, coinBigInner('★'), '0 0 200 200', { z: 7, origin: '50% 50%' });
  const pocket = figura(c, 300, 960, 480, 380, `${FIGP('M20,20 L460,20 L440,300 C400,360 80,360 40,300 Z', '#6b5a48')}<path d="M20,20 L460,20" stroke="${INK}" stroke-width="12"/>`, '0 0 480 380', { z: 8 });
  const cross = aparece(figura(c, 640, 880, 180, 240, `<path d="M90,10 V230 M20,80 H160" stroke="#fff" stroke-width="44" stroke-linecap="round"/><path d="M90,10 V230 M20,80 H160" stroke="${BRASS}" stroke-width="26" stroke-linecap="round"/>`, '0 0 180 240', { z: 9 }), T.cruz6, { sfx: 'ding' });
  return t => {
    const k = p(t, T.moneda, 0.4), kp = p(t, T.bolsillo - 0.3, 0.5, E.inCubic);
    set(dv, { s: 1 - k, o: 1 - k }); set(coin, { s: k, y: kp * 380, r: t * 200 * (1 - kp), o: t < T.moneda ? 0 : 1 }); set(pocket, { o: t > T.bolsillo - 0.5 ? 1 : 0 });
  };
});
plano(L(7) - 0.1, L(8) - 0.1, { background: '#CFE0C3' }, c => {
  aparece(chip(c, 60, 560, 'Engaño 2', { size: 60, bg: YEL, color: INK }), L(7));
  const tr = figura(c, 240, 560, 600, 900, treeInner(0), '0 0 400 600', { z: 4 });
  const dv = figura(c, 420, 620, 220, 281, devilInner(0), '0 0 360 460', { z: 6 });
  return t => { tr.firstChild.innerHTML = treeInner(p(t, T.cruz7, 0.5)); set(dv, { y: (1 - p(t, T.arbol, 0.5, E.outBack)) * 500 + Math.sin(t * 8) * 6, o: t < T.arbol - 0.1 ? 0 : 1 }); };
});
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const sky = box(c, 0, 520, 540, 820, { background: '#dfe9f5', borderRight: `8px solid ${INK}`, zIndex: 1 });
  const hell = box(c, 540, 520, 540, 820, { background: '#8a2a20', zIndex: 1 });
  texto(c, 600, 'CIELO', { size: 80, x: 0, w: 540 }); texto(c, 600, 'INFIERNO', { size: 70, x: 540, w: 540, color: '#fff' });
  figura(c, 640, 740, 340, 435, devilInner(0), '0 0 360 460', { z: 6 });
  const a = box(c, 60, 1000, 420, 150, { zIndex: 40 }, `<span style="display:inline-block;border:12px solid ${RED};color:${RED};font-family:Rye;font-size:96px;padding:4px 24px 10px;border-radius:16px;background:rgba(255,255,255,.7)">¡NO!</span>`);
  const b = box(c, 560, 1000, 500, 150, { zIndex: 40 }, `<span style="display:inline-block;border:12px solid #fff;color:#fff;font-family:Rye;font-size:84px;padding:4px 24px 10px;border-radius:16px;background:rgba(200,16,46,.85)">TAMPOCO</span>`);
  FX.stamps.push({ e: a, t: T.tramposo, r: -8 }, { e: b, t: T.tampoco, r: 6 }); sfx('stamp', T.tramposo, 1); sfx('stamp', T.tampoco, 1); shakeAt(T.tampoco, 0.35, 16);
});
emu(T.tampoco + 0.6);
plano(L(9) - 0.1, L(10) - 0.1, NOCHE, c => {
  const gl = GLOW(c, 700, 900, 360);
  const j = mk(c, [120, 700, 440, 562], JACK(), '0 0 360 460', 'bust');
  const tn = figura(c, 560, 740, 300, 340, turnipInner(1), '0 0 300 340', { z: 8 });
  const ember = aparece(texto(c, 640, '🔥', { size: 140, x: 560, w: 300 }), T.brasa, { sfx: 'sparkle' });
  aparece(chip(c, 230, 1210, 'Jack el de la linterna', { size: 56, bg: '#E57A2A' }), T.linterna, { sfx: 'tada' });
  return t => { tn.firstChild.innerHTML = turnipInner(t > T.nabo9 ? flick(t) : 0); set(tn, { o: t > T.nabo9 - 0.2 ? 1 : 0 }); set(ember, { o: t > T.brasa && t < T.nabo9 ? 1 : 0, y: Math.sin(t * 9) * 8 }); set(j.d, { x: t > T.vaga ? (t - T.vaga) * 60 : 0, y: t > T.vaga ? Math.abs(Math.sin(t * 6)) * -12 : 0 }); set(tn, { x: t > T.vaga ? (t - T.vaga) * 60 : 0 }); set(gl, { o: t > T.nabo9 ? flick(t) : 0 }); };
});

/* PASO 3 · América (L10) */
paso(L(10) - 0.1, L(11) - 0.1, 3, 'Viaje a ' + hlSpan('América', 'shl'), T.eeuu);
plano(L(10) - 0.1, T.calab10 - 0.4, { background: '#C9D3E6' }, c => {
  const sh = figura(c, 140, 760, 800, 480, shipInner(), '0 0 600 360', { z: 4 });
  aparece(chip(c, 260, 600, 'Estados Unidos', { size: 64, bg: PINK }), T.eeuu);
  return t => set(sh, { x: (t - L(10)) * 30, y: Math.sin(t * 2) * 10, r: Math.sin(t * 1.6) * 2 });
});
plano(T.calab10 - 0.4, L(11) - 0.1, { background: '#F6E7B8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(229,122,42,.25)', 'rgba(0,0,0,0)', 0);
  const pk = aparece(figura(c, 220, 600, 640, 602, pumpkinInner(1), '0 0 340 320', { z: 6 }), T.calab10, { sfx: 'tada' });
  sello(c, 1200, '¡CALABAZA!', T.calab10 + 0.15, { size: 120, r: -6 });
});

/* L11 · OJO */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  mk(c, [420, 600, 500, 639], JACK(), '0 0 360 460', 'bust');
  sello(c, 340, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 430, 1260, 'muchas versiones', { size: 58, bg: YEL, color: INK }), T.version);
});

/* L12 · O sea (golpe naranja) */
golpe(L(12) - 0.1, L(13) - 0.08, '#E57A2A', 'Cada calabaza…', '…es la linterna de Jack', { y: 520, size: 130, size2: 96, t2: T.linternaR, draw: c => { const pk = figura(c, 300, 960, 480, 452, pumpkinInner(1), '0 0 340 320', { z: 6 }); FX.fns.push(t => { if (pk.isConnected) pk.firstChild.innerHTML = pumpkinInner(flick(t)); }); } });

/* L13 · pregunta final */
preguntaFinal('¿Halloween, Santos', 'o Día de Muertos?', { size: 92, draw: c => { figura(c, 330, 600, 420, 395, pumpkinInner(1), '0 0 340 320', { z: 6 }); } });

/* L14 · cierre */
cierre(42, 'La calabaza era un nabo', ['FIESTAS', 'de otoño']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(11), L(12) - 0.15]] });
