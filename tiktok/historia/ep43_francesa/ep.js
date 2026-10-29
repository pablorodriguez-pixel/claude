/* Ep. 43 · Irse a la francesa (o a la inglesa) — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  adios0: Q('sin decir adiós'), ingles0: Q('eres inglés'), ingleses1: Q('los ingleses'), frances1: Q('eres francés'),
  quien: Q('quién tiene razón'), ninguno: Q('ninguno'), pelea: Q('la pelea'), tres3: Q('tres pasos'),
  francia4: Q('francia siglo'), fiestas: Q('en las fiestas'), moda: Q('de moda'), marcharse: Q('marcharse sin despedirse'), cortar: Q('cortar la fiesta'),
  ingleses5: Q('y a los ingleses'), guerra: Q('en guerra'), maleduc5: Q('maleducados'), bautiz: Q('lo bautizaron'), francesa5: Q('irse a la francesa'),
  venganza: Q('la venganza'), callados: Q('no se quedaron callados'), reves: Q('al revés'), inglesa6: Q('irse a la inglesa'),
  bando: Q('elegir bando'), italianos: Q('los italianos'), alemanes: Q('los alemanes'),
  nosotros: Q('nosotros'), lado: Q('del lado inglés'), maleduc8: Q('el maleducado es el francés'),
  ojo: Q('ojo'), teorias: Q('más teorías'),
  contrario: Q('el problema contrario'), mevoy: Q('me voy'), cuarenta: Q('cuarenta minutos'), puerta: Q('la puerta'),
  osea: Q('o sea'), europa11: Q('en toda europa'), alLado: Q('el de al lado'),
};
const FL_FR = `<rect x="0" y="0" width="100" height="200" fill="#2b4fa8"/><rect x="100" y="0" width="100" height="200" fill="#fff"/><rect x="200" y="0" width="100" height="200" fill="${RED}"/><rect x="0" y="0" width="300" height="200" fill="none" stroke="${INK}" stroke-width="8"/>`;
const FL_UK = `<rect x="0" y="0" width="300" height="200" fill="#25356e"/><path d="M0,0 L300,200 M300,0 L0,200" stroke="#fff" stroke-width="34"/><path d="M0,0 L300,200 M300,0 L0,200" stroke="${RED}" stroke-width="12"/><path d="M150,0 V200 M0,100 H300" stroke="#fff" stroke-width="56"/><path d="M150,0 V200 M0,100 H300" stroke="${RED}" stroke-width="30"/><rect x="0" y="0" width="300" height="200" fill="none" stroke="${INK}" stroke-width="8"/>`;
const flag = (pa, x, y, w, inner, z = 10) => figura(pa, x, y, w, w * 2 / 3, inner, '0 0 300 200', { z, origin: '0% 100%' });
const WIG = `<path d="M70,200 C40,120 100,60 180,60 C260,60 320,120 290,200 C320,230 320,290 300,320 C280,300 270,260 262,230 L98,230 C90,260 80,300 60,320 C40,290 40,230 70,200 Z" fill="#F4F0E6" stroke="${INK}" stroke-width="4"/>${[...Array(5)].map((_, k) => `<circle cx="${70 + k * 0 + (k % 2) * 6}" cy="${210 + k * 22}" r="16" fill="#F4F0E6" stroke="${INK}" stroke-width="3"/><circle cx="${290 - (k % 2) * 6}" cy="${210 + k * 22}" r="16" fill="#F4F0E6" stroke="${INK}" stroke-width="3"/>`).join('')}`;
const NOBLE = s => WIG + bustInner({ uniform: 'officer', seed: s });
const SOLDADO = s => bustInner({ hat: 'cap', uniform: 'soldier', moustache: true, seed: s });
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
const PELOTA = (pa, t, t0, a, b, d = 0.7) => { const k = ((t - t0) / d) % 2, f = k < 1 ? k : 2 - k; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f) - Math.sin(f * Math.PI) * 220]; };

/* L0 · PORTADA: puerta entreabierta + señor que se escabulle + «¿Te vas sin decir adiós?»; a «inglés» cae la bandera inglesa */
plano(-1, L(1) - 0.1, { background: '#E9D7B0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 70px)' }, c => {
  texto(c, 300, '¿Te vas sin', { size: 110 });
  const t2 = texto(c, 420, hlSpan('decir adiós?', 'phl'), { size: 124, italic: true });
  const dr = figura(c, 560, 640, 400, 613, doorInner(0.5), '0 0 300 460', { z: 3, origin: '50% 50%' });
  const m = mk(c, [140, 740, 460, 588], NOBLE(31), '0 0 360 460', 'bust');
  const f = aparece(flag(c, 600, 1000, 360, FL_UK, 20), T.ingles0, { sfx: 'stamp', r: -6 });
  sello(c, 1180, '¿INGLÉS?', T.ingles0 + 0.15, { size: 130, r: -6 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => {
    dr.firstChild.innerHTML = doorInner(0.45 + 0.1 * Math.sin(t * 2));
    set(m.d, { x: Math.min(1, t / 3) * 140, y: Math.abs(Math.sin(t * 7)) * -10, r: 4 });
    set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
  };
}, { sfx: false });

/* L1 · «Y los ingleses… dicen que eres francés» — ping-pong de banderas */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const uk = flag(c, 60, 560, 380, FL_UK), fr = flag(c, 640, 560, 380, FL_FR);
  const m = mk(c, [330, 860, 420, 537], NOBLE(31), '0 0 360 460', 'bust');
  const arrow = box(c, 300, 820, 480, 120, { zIndex: 12 }, arrowSvg('M20,80 Q240,-20 460,80', PINK, 12));
  sello(c, 1160, '¿FRANCÉS?', T.frances1, { size: 130, r: 6 });
  return t => { set(uk, { r: wobble(t, 1.2, 3) }); set(fr, { r: wobble(t, 1.2, 3, 0.5) }); set(m.d, { x: t > T.frances1 ? 0 : 0, r: Math.sin(t * 6) * 6 }); set(arrow, { o: t > T.ingleses1 ? 1 : 0, sx: t > T.frances1 ? -1 : 1 }); };
});

/* L2 · marca */
marca(2);

/* L3 · ¿Quién tiene razón? Ninguno. */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  texto(c, 300, '¿Quién tiene ' + hlSpan('razón?', 'qhl'), { size: 100 });
  const uk = flag(c, 120, 560, 320, FL_UK), fr = flag(c, 640, 560, 320, FL_FR);
  sello(c, 820, '¡NINGUNO!', T.ninguno, { size: 130, r: -6 });
  pinta(c, 'qhl', T.quien + 0.3); NUMS(c, T.tres3);
  return t => { set(uk, { r: -6 + Math.sin(t * 8) * 3 }); set(fr, { r: 6 + Math.sin(t * 8 + 1) * 3 }); };
});

/* PASO 1 · Francia, siglo XVIII (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'La moda ' + hlSpan('francesa', 'shl'), T.francia4);
plano(L(4) - 0.1, T.marcharse - 0.06, { background: '#F3E1C2', backgroundImage: 'radial-gradient(circle at 50% 30%, #fff6dd 0, #F3E1C2 60%)' }, c => {
  const chand = figura(c, 390, 540, 300, 220, `<path d="M150,0 V60" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3, 4].map(k => `<path d="M${30 + k * 60},120 Q150,${60 + Math.abs(2 - k) * 20} ${30 + k * 60},120" stroke="${BRASS}" stroke-width="8" fill="none"/><rect x="${20 + k * 60}" y="100" width="20" height="40" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M${30 + k * 60},100 q-8,-16 0,-26 q8,10 0,26" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`).join('')}<path d="M20,140 Q150,220 280,140" stroke="${BRASS}" stroke-width="10" fill="none"/>`, '0 0 300 220', { z: 2 });
  const ns = [0, 1, 2].map(i => mk(c, [40 + i * 340, 820, 360, 460], NOBLE(70 + i), '0 0 360 460', 'bust'));
  aparece(chip(c, 360, 1260, 'Siglo XVIII', { size: 60, bg: YEL, color: INK }), T.francia4);
  aparece(texto(c, 760, '♪ ♫', { size: 110, x: 760, w: 300, color: PINK, shadow: OUTL(INK, 5) }), T.fiestas, { sfx: 'sparkle' });
  return t => ns.forEach((n, i) => set(n.d, { y: Math.abs(Math.sin(t * 4 + i)) * -18, r: Math.sin(t * 4 + i) * 4 }));
});
plano(T.marcharse - 0.06, L(5) - 0.1, { background: '#F3E1C2' }, c => {
  const dr = figura(c, 640, 600, 360, 552, doorInner(0), '0 0 300 460', { z: 3, origin: '50% 50%' });
  const host = mk(c, [40, 780, 420, 537], NOBLE(80), '0 0 360 460', 'bust');
  const g = mk(c, [380, 820, 380, 486], NOBLE(81), '0 0 360 460', 'bust');
  aparece(chip(c, 60, 1250, 'anfitrión', { size: 48, bg: PINK }), T.marcharse + 0.5);
  aparece(chip(c, 520, 1250, '…sin decir adiós', { size: 48, bg: YEL, color: INK }), T.marcharse + 0.2);
  sfx('swoosh_up', T.marcharse + 0.4, 0.5);
  return t => { dr.firstChild.innerHTML = doorInner(p(t, T.marcharse, 0.5)); set(g.d, { x: p(t, T.marcharse + 0.3, 1.8, E.inOutCubic) * 420, y: Math.abs(Math.sin(t * 8)) * -10, o: 1 - p(t, T.cortar, 0.4) }); set(host.d, { y: Math.abs(Math.sin(t * 3)) * -8 }); };
});
plano(L(5) - 0.1, T.bautiz - 0.06, PAPEL, c => {
  const en = mk(c, [40, 620, 480, 613], SOLDADO(90), '0 0 360 460', 'bust');
  const fr = mk(c, [560, 620, 480, 613], SOLDADO(91), '0 0 360 460', 'bust');
  flag(c, 120, 1200, 240, FL_UK, 12); flag(c, 700, 1200, 240, FL_FR, 12);
  aparece(texto(c, 760, '⚔', { size: 200, x: 390, w: 300 }), T.guerra, { sfx: 'thud' }); shakeAt(T.guerra, 0.4, 18);
  sello(c, 560, '¡MALEDUCADOS!', T.maleduc5, { size: 100, r: -6 });
  return t => { set(en.d, { r: -4 + Math.sin(t * 5) * 3 }); set(fr.d, { r: 4 + Math.sin(t * 5 + 1) * 3 }); };
});
golpe(T.bautiz - 0.06, L(6) - 0.1, '#2b4fa8', '«French leave»', 'irse a la francesa', { y: 640, size: 140, size2: 96, t2: T.francesa5, draw: c => flag(c, 390, 1060, 300, FL_UK, 6) });

/* PASO 2 · la venganza (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'La ' + hlSpan('venganza', 'shl'), T.venganza);
plano(L(6) - 0.1, T.inglesa6 - 0.06, PAPEL, c => {
  const fr = mk(c, [300, 600, 480, 613], NOBLE(95), '0 0 360 460', 'bust');
  aparece(chip(c, 380, 1230, '¡Ah, sí?', { size: 64, bg: PINK }), T.callados);
  const arr = aparece(texto(c, 600, '↩', { size: 260, x: 700, w: 340, color: RED }), T.reves, { sfx: 'boing' });
  return t => set(fr.d, { r: Math.sin(t * 7) * 5, y: Math.abs(Math.sin(t * 7)) * -8 });
});
golpe(T.inglesa6 - 0.06, L(7) - 0.1, RED, '«Filer à l\'anglaise»', 'irse a la inglesa', { y: 640, size: 120, size2: 104, t2: T.inglesa6 + 0.2, draw: c => flag(c, 390, 1060, 300, FL_FR, 6) });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#C9D3E6' }, c => {
  const m = box(c, 0, -60, 1080, 1920, { zIndex: 2 }); m.innerHTML = europeSvg();
  const it = m.querySelector('.cIT'), de = m.querySelector('.cDE');
  const [ix, iy] = euPj(12.5, 42.5), [dx, dy] = euPj(10, 51);
  aparece(chip(c, +ix - 40, +iy - 120, 'a la inglesa', { size: 46, bg: '#fff', color: INK }), T.italianos);
  aparece(chip(c, +dx - 60, +dy - 130, 'a la francesa', { size: 46, bg: '#fff', color: INK }), T.alemanes);
  aparece(chip(c, 360, 1150, '¡elegid bando!', { size: 64, bg: YEL, color: INK }), T.bando, { sfx: 'drumroll' });
  return t => { it.setAttribute('opacity', t > T.italianos ? 1 : 0); de.setAttribute('opacity', t > T.alemanes ? 1 : 0); };
});

/* PASO 3 · nosotros (L8) */
paso(L(8) - 0.1, L(9) - 0.1, 3, 'Y ' + hlSpan('nosotros', 'shl') + ', ¿qué?', T.nosotros);
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const es = figura(c, 300, 600, 480, 320, `<rect x="0" y="0" width="300" height="50" fill="${RED}"/><rect x="0" y="50" width="300" height="100" fill="${YEL}"/><rect x="0" y="150" width="300" height="50" fill="${RED}"/><rect x="0" y="0" width="300" height="200" fill="none" stroke="${INK}" stroke-width="8"/>`, '0 0 300 200', { z: 6, origin: '50% 50%' });
  const uk = aparece(flag(c, 80, 980, 300, FL_UK), T.lado, { sfx: 'ding' });
  const fr = flag(c, 700, 980, 300, FL_FR);
  sello(c, 1180, 'MALEDUCADO →', T.maleduc8 + 0.2, { size: 92, r: -4 });
  return t => { set(es, { r: wobble(t, 1, 3), x: p(t, T.lado, 0.5, E.outBack) * -120 }); set(fr, { r: t > T.maleduc8 ? Math.sin(t * 20) * 4 : 0 }); };
});

/* L9 · OJO */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  sello(c, 560, '¡OJO!', T.ojo, { size: 150 });
  aparece(chip(c, 470, 860, 'más teorías…', { size: 64, bg: YEL, color: INK }), T.teorias);
  [0, 1, 2].map(i => aparece(qMark(c, 520 + i * 160, 1000, 120, i % 2 ? PINK : YEL), T.teorias + 0.3 + i * 0.1));
});

/* L10 · la despedida española: «me voy»… y 40 minutos */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#F6E7B8' }, c => {
  const dr = figura(c, 760, 560, 280, 429, doorInner(0), '0 0 300 460', { z: 3 });
  const ps = [0, 1, 2, 3].map(i => mk(c, [-20 + i * 210, 860, 320, 409], bustInner({ uniform: i % 2 ? 'farmer' : 'officer', moustache: i === 1, seed: 100 + i }), '0 0 360 460', 'bust'));
  aparece(chip(c, 60, 600, '«¡Bueno, me voy!»', { size: 60, bg: '#fff', color: INK }), T.mevoy, { sfx: 'msg_in' });
  const ck = mkClock(c, 420, 560, 300, { z: 8 });
  aparece(chip(c, 380, 1260, '40 minutos después…', { size: 60, bg: PINK }), T.cuarenta, { sfx: 'clockfast' });
  return t => { ck.setH(t > T.mevoy ? (t - T.mevoy) * 4 : 0); ps.forEach((q, i) => set(q.d, { r: Math.sin(t * 6 + i * 1.3) * 8, y: Math.abs(Math.sin(t * 6 + i)) * -14 })); dr.firstChild.innerHTML = doorInner(t > T.puerta ? p(t, T.puerta, 0.4) : 0); };
});
emu(T.cuarenta + 1.2);

/* L11 · O sea (golpe amarillo): el maleducado siempre es el de al lado */
golpe(L(11) - 0.1, L(12) - 0.08, YEL, 'El maleducado…', '…¡siempre es el de al lado!', { y: 560, size: 120, size2: 96, t2: T.alLado, draw: c => { flag(c, 140, 1000, 300, FL_UK, 6); flag(c, 640, 1000, 300, FL_FR, 6); } });

/* L12 · pregunta final */
preguntaFinal('¿A la francesa…', '…o uno a uno?', { size: 104, draw: c => figura(c, 400, 620, 280, 429, doorInner(0.4), '0 0 300 460', { z: 6 }) });

/* L13 · cierre */
cierre(43, 'Irse a la francesa', ['MODALES', 'de Europa']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(9), L(10) - 0.15]] });
