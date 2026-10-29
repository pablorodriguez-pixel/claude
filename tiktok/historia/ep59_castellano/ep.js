/* Ep. 59 · ¿Español o castellano? — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  espanol0: Q('español'), castellano0: Q('castellano'), trampa: Q('hay trampa'),
  academia: Q('la real academia'), bando: Q('cambió de bando'), siglo: Q('hace un siglo'),
  mil925: Q('mil novecientos veinticinco'), dicc: Q('su diccionario'), castellana: Q('lengua castellana'),
  ano3: Q('ese año'), titulo: Q('el título'), espanola3: Q('lengua española'),
  espera: Q('pero espera'), consti: Q('la constitución'), mil978: Q('mil novecientos setenta y ocho'), dice4: Q('dice castellano'), casual: Q('no por casualidad'),
  lenguas: Q('más lenguas'), catalan: Q('catalán'), gallego: Q('gallego'), euskera: Q('euskera'), art: Q('el castellano es la lengua española'),
  america: Q('en américa'), argentina: Q('argentina'), cast7: Q('dice castellano'), mexico: Q('en méxico'), esp7: Q('casi todos español'),
  ojo: Q('ojo'), dos: Q('los dos nombres valen'),
  usas: Q('la palabra que usas'), eres: Q('de dónde eres'),
};
const AZ = '#3a6ea5', VI = '#7a3a8a';
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 150, color: INK }, o));
const DICC = (c, x, y, w, l2) => figura(c, x, y, w, w * 480 / 760, libroViejoInner('DICCIONARIO', ['de la lengua', l2]), '0 0 760 480', { z: 6, origin: '50% 50%' });
const PIN = (c, lo, la, col) => { const [x, y] = laPj(lo, la).map(Number); return box(c, x - 30, y - 80, 60, 80, { zIndex: 12, transformOrigin: '50% 100%' }, pinSvg(col)); };

/* L0 · PORTADA */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const a = PAL(c, 330, '¿ESPAÑOL', { size: 140 });
  const o = texto(c, 500, 'o', { size: 100, italic: true, color: RED });
  const b = PAL(c, 620, 'CASTELLANO?', { size: 130 });
  sello(c, 860, '¡HAY TRAMPA!', T.trampa, { size: 120, r: -7, bg: 'rgba(255,255,255,.9)' });
  const d = DICC(c, 280, 1040, 520, '¿…?');
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(a, { r: -3 + wobble(t, 0.5, 1) }); set(b, { r: 2 + wobble(t, 0.45, 1, 1) }); set(o, { s: 1 + 0.08 * Math.sin(t * 5) }); set(d, { r: -2 + Math.sin(t * 2) * 2 }); };
}, { sfx: false });

/* L1 · la Real Academia cambió de bando hace un siglo */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 260, 360, '🏛️ Real Academia', { size: 80, bg: '#fff', color: INK }), T.academia);
  const f = texto(c, 600, '🔄', { size: 260 });
  aparece(chip(c, 340, 1000, '⏳ hace un siglo', { size: 70, bg: YEL, color: INK }), T.siglo);
  return t => set(f, { r: t > T.bando ? (t - T.bando) * 300 : 0, o: t > T.bando - 0.2 ? 1 : 0 });
});

/* L2–L3 · el diccionario: «castellana» (hasta 1925) → «española» */
plano(L(2) - 0.1, L(4) - 0.1, PAPEL, c => {
  const s = sello(c, 320, '1925', T.mil925, { size: 150, r: -4, col: INK });
  const d1 = DICC(c, 160, 560, 760, 'castellana'), d2 = DICC(c, 160, 560, 760, 'española');
  aparece(chip(c, 340, 1140, '✏️ nuevo título', { size: 66, bg: PINK }), T.titulo);
  return t => { const k = p(t, T.titulo, 0.5, E.inOutCubic); set(d1, { o: t > T.dicc - 0.2 ? 1 - k : 0, s: pop(t, T.dicc - 0.2, 0.4), sx: 1 - k }); set(d2, { o: k > 0.5 ? 1 : 0, sx: k > 0.5 ? (k - 0.5) * 2 : 0.01 }); };
});

/* L4 · pero espera: la Constitución de 1978 dice «castellano» */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9C6BE' }, c => {
  const doc = figura(c, 240, 330, 600, 760, FIGP('M0,0 L600,0 L600,760 L0,760 Z', '#FBF6EA', 6, .12) + `<rect x="0" y="0" width="600" height="60" fill="${RED}"/><rect x="0" y="60" width="600" height="40" fill="${YEL}"/><text x="300" y="200" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">CONSTITUCIÓN</text><text x="300" y="270" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="60" fill="${INK}">1978</text>` + [...Array(8)].map((_, k) => `<path d="M70,${340 + k * 44} H530" stroke="${INK}" stroke-width="4" opacity=".35"/>`).join(''), '0 0 600 760', { z: 6, origin: '50% 50%' });
  sello(c, 1110, '«CASTELLANO»', T.dice4, { size: 110, r: -6 });
  return t => set(doc, { s: pop(t, T.consti - 0.1, 0.4), o: t > T.consti - 0.1 ? 1 : 0, r: wobble(t, 0.4, 1.5) });
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6 · más lenguas → artículo 3 */
plano(L(6) - 0.1, L(7) - 0.1, PAPEL, c => {
  texto(c, 330, '🇪🇸 En España…', { size: 96 });
  const ls = [['catalán', T.catalan, YEL], ['gallego', T.gallego, '#9fd3c0'], ['euskera', T.euskera, PINK]].map(([s, t0, col], i) => aparece(chip(c, 120 + i * 300, 520, s, { size: 62, bg: col, color: INK }), t0, { sfx: 'pop2' }));
  const q = texto(c, 760, '«El <span style="color:#C8102E">castellano</span> es la lengua <span style="color:#3a6ea5">española</span> oficial del Estado»', { size: 76, x: 120, w: 840, italic: true });
  aparece(chip(c, 380, 1170, '📜 artículo 3', { size: 60, bg: '#fff', color: INK }), T.art + 0.5);
  return t => set(q, { o: t > T.art - 0.2 ? 1 : 0, s: pop(t, T.art - 0.2, 0.4) });
});

/* L7 · en América: castellano (sur) / español (norte) */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, 0, 1080, 1920, { zIndex: 4 }); m.innerHTML = latamSvg();
  const sur = [[-64, -34], [-71, -35], [-76, -10]].map(([lo, la]) => PIN(c, lo, la, RED)), nor = [[-99, 19.4], [-70, 18.7], [-66, 18.2]].map(([lo, la]) => PIN(c, lo, la, AZ));
  const cs = chip(c, 300, 1190, '🇦🇷🇨🇱🇵🇪 «castellano»', { size: 52, bg: RED }), cn = chip(c, 380, 330, '🇲🇽🇩🇴🇵🇷 «español»', { size: 52, bg: AZ });
  return t => { sur.forEach((s, i) => popA(s, t, T.argentina + i * 0.2)); popA(cs, t, T.cast7, { r: -3 }); nor.forEach((s, i) => popA(s, t, T.mexico + i * 0.2)); popA(cn, t, T.esp7, { r: 3 }); };
});
emu(L(8) - 1.1);

/* L8 · OJO: los dos valen */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 400, 600, '✅ español', { size: 76, bg: AZ }), T.dos);
  aparece(chip(c, 400, 760, '✅ castellano', { size: 76, bg: RED }), T.dos + 0.3);
  aparece(chip(c, 420, 960, '🏛️ los dos valen', { size: 60, bg: YEL, color: INK }), T.dos + 0.8);
});

/* L9 · O sea */
golpe(L(9) - 0.1, L(10) - 0.1, YEL, 'Tu palabra…', '…dice de<br>dónde eres', { y: 470, size: 150, size2: 120, t2: T.eres - 0.3 });

/* L10 · pregunta final */
preguntaFinal('¿Y tú,', 'cómo lo llamas?', { size: 104, draw: c => [['español', AZ], ['castellano', RED], ['¿y en tu país? 👇', PINK]].map(([s, col], i) => aparece(chip(c, 160 + i * 60, 620 + i * 160, s, { size: 64, bg: col }), L(10) + 0.4 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre (clip reutilizado del ep55) */
cierre(59, '¿Español o castellano?', ['ESPAÑOL', 'o castellano']);

Story.run({ ovalo: [[L(8), L(9) - 0.15]] });
