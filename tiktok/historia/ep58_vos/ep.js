/* Ep. 58 · Si dices «vos», hablas como en tiempos del Quijote — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  vos0: Q('vos'), quijote: Q('quijote'), tu1: Q('tú'), modernos: Q('los modernos'),
  espana2: Q('la españa'), xvi: Q('siglo dieciséis'), confianza: Q('con confianza'), iguales: Q('entre iguales'),
  prueba: Q('la prueba'), tenes: Q('vos tenés'), teneis: Q('vos tenéis'), letra: Q('una letra'),
  espera: Q('pero espera'), poca: Q('poca cosa'), cambio: Q('se cambió por tú'),
  america: Q('en américa'), cortes: Q('las cortes'), lima: Q('lima'), mexico: Q('y méxico'), madrid: Q('moda de madrid'),
  plata: Q('río de la plata'), nadie: Q('nadie se enteró'), quedo: Q('se quedó'),
  soloA: Q('no solo allí'), paraguay: Q('paraguay'), centro: Q('centroamérica'),
  ojo: Q('ojo'), chile: Q('chile'), manera: Q('a su manera'),
  argentino: Q('no es argentino'), antiguo: Q('castellano antiguo'), perdio: Q('españa perdió'),
};
const CELESTE = '#6CACE4';
const PAL = (c, y, html, o = {}) => texto(c, y, html, Object.assign({ size: 160, color: INK }, o));
const PIN = (c, lo, la, col) => { const [x, y] = laPj(lo, la).map(Number); return box(c, x - 30, y - 80, 60, 80, { zIndex: 12, transformOrigin: '50% 100%' }, pinSvg(col)); };

/* L0 · PORTADA */
plano(-1, L(1) - 0.1, { background: CELESTE }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.3)', 'rgba(0,0,0,0)', 0);
  texto(c, 290, 'Si dices «vos»…', { size: 96, color: '#fff', shadow: OUTL(INK, 6) });
  const t2 = texto(c, 410, 'hablas como<br>en el ' + hlSpan('Quijote', 'phl'), { size: 110, italic: true, color: '#fff', shadow: OUTL(INK, 7) });
  const q = figura(c, 350, 660, 380, 486, bustInner({ beard: true, moustache: true, seed: 33 }), '0 0 360 460', { z: 6 });
  const b = PAL(c, 1150, '«VOS»', { color: RED, size: 130, shadow: OUTL('#fff', 6) });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(q, { r: wobble(t, 0.4, 2) }); set(b, { r: -4, s: 1 + 0.04 * Math.sin(t * 5) }); };
}, { sfx: false });

/* L1 · los que dicen «tú» son los modernos */
plano(L(1) - 0.1, L(2) - 0.1, PAPEL, c => {
  const a = PAL(c, 520, '«TÚ»', { color: '#3a6ea5' });
  aparece(chip(c, 330, 800, '📱 los modernos', { size: 80, bg: YEL, color: INK }), T.modernos, { sfx: 'boing' });
  return t => set(a, { s: pop(t, T.tu1 - 0.1, 0.35), o: t > T.tu1 - 0.1 ? 1 : 0, r: wobble(t, 0.5, 4) });
});

/* L2 · siglo XVI: «vos» con confianza, entre iguales */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#E9D7B0' }, c => {
  sello(c, 320, 'SIGLO XVI', T.xvi, { size: 120, r: -4, col: INK });
  const a = figura(c, 90, 600, 380, 486, bustInner({ beard: true, seed: 4 }), '0 0 360 460', { z: 6 });
  const b = figura(c, 610, 600, 380, 486, bustInner({ moustache: true, seed: 9 }), '0 0 360 460', { z: 6 });
  const bub = chip(c, 400, 560, '¡vos!', { size: 80, bg: '#fff', color: INK });
  aparece(chip(c, 300, 1150, '🤝 entre iguales', { size: 70, bg: PINK }), T.iguales);
  return t => { set(a, { r: wobble(t, 0.4, 1.5) }); set(b, { r: wobble(t, 0.45, 1.5, 1) }); popA(bub, t, T.confianza - 0.3, { r: -4 }); };
});

/* L3 · la prueba: «vos tenés» viene de «vos tenéis» */
plano(L(3) - 0.1, L(4) - 0.1, PAPEL, c => {
  sello(c, 320, 'LA PRUEBA', T.prueba, { size: 120, r: -5 });
  const a = PAL(c, 560, 'vos ten<span style="color:#C8102E">é</span>s', { size: 150, color: '#3a6ea5' });
  const fl = texto(c, 760, '⬆️', { size: 110 });
  const b = PAL(c, 900, 'vos ten<span style="color:#C8102E">éi</span>s', { size: 150, color: '#8a5a34' });
  const x = box(c, 600, 900, 120, 170, { zIndex: 25 }, XSVG);
  aparece(chip(c, 260, 1160, '✂️ solo cae una letra', { size: 66, bg: YEL, color: INK }), T.letra);
  return t => { set(a, { s: pop(t, T.tenes, 0.35), o: t > T.tenes ? 1 : 0 }); set(b, { s: pop(t, T.teneis, 0.35), o: t > T.teneis ? 1 : 0 }); set(fl, { o: t > T.teneis + 0.3 ? 1 : 0 }); set(x, { o: t > T.letra - 0.3 ? 1 : 0, s: pop(t, T.letra - 0.3, 0.3) }); };
});

/* L4 · en España «vos» empieza a sonar a poca cosa → «tú» */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9C6BE' }, c => {
  texto(c, 330, '🇪🇸 En España…', { size: 96 });
  const a = PAL(c, 560, '«vos»', { color: '#8a7a66' });
  aparece(chip(c, 360, 780, '😒 poca cosa', { size: 70, bg: '#fff', color: INK }), T.poca);
  const b = PAL(c, 950, '→ «TÚ»', { color: '#3a6ea5' });
  return t => { set(a, { o: t > T.espera + 0.3 ? (t > T.cambio ? 0.4 : 1) : 0, r: t > T.poca ? Math.sin(t * 12) * 3 : 0 }); set(b, { s: pop(t, T.cambio + 0.3, 0.4), o: t > T.cambio + 0.3 ? 1 : 0 }); };
});

/* L5 · CTA (clip reutilizado del ep55) */
sigueme(5, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L6–L7 · mapa: Lima y México copian a Madrid; el Río de la Plata se queda con «vos» */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, 0, 1080, 1920, { zIndex: 4 }); m.innerHTML = latamSvg();
  const pm = PIN(c, -99.1, 19.4, '#3a6ea5'), pl = PIN(c, -77, -12, '#3a6ea5'), pb = PIN(c, -58.4, -34.6, RED);
  const cm = chip(c, 300, 500, '👑 México: «tú»', { size: 52, bg: '#3a6ea5' }), cl = chip(c, 500, 770, '👑 Lima: «tú»', { size: 52, bg: '#3a6ea5' }), cb = chip(c, 300, 1050, '🧉 Río de la Plata: «VOS»', { size: 56, bg: RED });
  return t => { popA(pm, t, T.mexico); popA(cm, t, T.mexico + 0.2, { r: -3 }); popA(pl, t, T.lima); popA(cl, t, T.madrid, { r: 3 }); popA(pb, t, T.plata); popA(cb, t, T.quedo - 0.1, { r: -3 }); };
});

/* L8 · Paraguay y casi toda Centroamérica */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const v = PAL(c, 320, '«vos» 👋', { size: 130, color: RED });
  const ps = ['🇦🇷', '🇺🇾', '🇵🇾', '🇬🇹', '🇭🇳', '🇸🇻', '🇳🇮', '🇨🇷'].map((f, i) => texto(c, 600 + Math.floor(i / 4) * 230, f, { size: 150, x: 90 + (i % 4) * 230, w: 200 }));
  return t => ps.forEach((f, i) => { const t0 = i < 2 ? L(8) + 0.2 : i === 2 ? T.paraguay : T.centro + (i - 3) * 0.12; set(f, { s: pop(t, t0, 0.35), o: t > t0 ? 1 : 0, r: Math.sin(t * 3 + i) * 6 }); });
});
emu(L(9) - 1.1);

/* L9 · OJO */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  texto(c, 560, '🇨🇱 🇨🇴 🇻🇪', { size: 150, x: 280, w: 760 });
  aparece(chip(c, 400, 960, 'también «vos»…', { size: 64, bg: YEL, color: INK }), T.chile);
  aparece(chip(c, 420, 1110, '…a su manera 😏', { size: 64, bg: PINK }), T.manera);
});

/* L10 · O sea */
golpe(L(10) - 0.1, L(11) - 0.1, YEL, '«Vos»…', '…castellano antiguo<br>que España perdió', { y: 470, size: 150, size2: 92, t2: T.antiguo - 0.1 });

/* L11 · pregunta final */
preguntaFinal('¿Tú, vos', 'o usted?', { size: 110, draw: c => [['tú', '#3a6ea5'], ['vos', RED], ['usted', '#2e7a4a']].map(([s, col], i) => aparece(chip(c, 180 + i * 70, 600 + i * 160, s, { size: 72, bg: col }), L(11) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre (clip reutilizado del ep55) */
cierre(58, 'El «vos»', ['VOS', 'siglo XVI']);

Story.run({ ovalo: [[L(9), L(10) - 0.15]] });
