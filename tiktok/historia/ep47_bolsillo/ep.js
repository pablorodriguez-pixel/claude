/* Ep. 47 · ¿Para qué es el bolsillo enano de los vaqueros? — escenas (librería: engine/story.js) */
Story.prepara();
const T = {
  monedas: Q('no es para monedas'), mechero: Q('mechero'), otra: Q('otra cosa'),
  diminuto: Q('diminuto'), tres3: Q('tres pasos'),
  problema: Q('el problema'), oeste: Q('oeste americano'), mineros: Q('mineros'), rompian: Q('rompían'), bolsillos4: Q('los bolsillos'),
  davis: Q('jacob davis'), clavar: Q('clavar'), remaches5: Q('remaches de cobre'), dinero: Q('no tenía dinero'), proveedor: Q('proveedor'), levi: Q('levi strauss'),
  bolsillo6: Q('el bolsillo'), hombre: Q('un hombre'), reloj: Q('un reloj'), cadena: Q('cadena'),
  casa: Q('era su casa'), tamano: Q('ese tamaño'),
  prueba: Q('la prueba'), mira: Q('mira tus vaqueros'), esquinas: Q('esquinas'), remaches8: Q('hay remaches'), siguen: Q('ahí siguen'),
  desaparecio: Q('desapareció'), entrep: Q('entrepierna'),
  ojo: Q('ojo'), leyenda: Q('la leyenda'), quemo: Q('se quemó'), hoguera: Q('hoguera'),
  osea: Q('o sea'), nadie: Q('ya no lleva nadie'),
};
const COB = '#c27a3a';
const rem = (x, y, r = 11) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${COB}" stroke="${INK}" stroke-width="4"/><circle cx="${x - 3}" cy="${y - 3}" r="${r * 0.35}" fill="#f2c18c"/>`;
// vaqueros de frente (vb 0 0 600 760); .wp = bolsillo enano, .rv = sus remaches, .cr = remache de la entrepierna
const JEANS = `${FIGP('M60,20 L540,20 L560,740 L350,740 L300,330 L250,740 L40,740 Z', '#3b5f9a', 7, .3)}
 <path d="M60,20 L540,20 L542,80 L58,80 Z" fill="#335489" stroke="${INK}" stroke-width="6"/><rect x="285" y="34" width="30" height="34" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>
 <path d="M300,80 V300" stroke="#e8b04a" stroke-width="5" stroke-dasharray="12 8"/><path d="M70,90 Q170,110 190,230" fill="none" stroke="#e8b04a" stroke-width="5" stroke-dasharray="12 8"/><path d="M530,90 Q430,110 410,230" fill="none" stroke="#e8b04a" stroke-width="5" stroke-dasharray="12 8"/>
 <g class="wp"><path d="M420,110 L500,104 L504,190 L426,196 Z" fill="#456bab" stroke="${INK}" stroke-width="5"/><path d="M424,120 L500,114" stroke="#e8b04a" stroke-width="4" stroke-dasharray="8 6"/></g>
 <g class="rv">${rem(424, 112)}${rem(500, 106)}${rem(190, 226)}${rem(410, 226)}</g>
 <g class="cr">${rem(300, 318, 14)}</g>`;
// reloj de bolsillo con cadena (vb 0 0 300 380)
const RELOJ = `<path d="M150,60 C60,0 20,-20 -60,40" fill="none" stroke="${BRASS}" stroke-width="9" stroke-dasharray="14 6"/><rect x="132" y="40" width="36" height="34" rx="8" fill="${BRASS}" stroke="${INK}" stroke-width="5"/>
 <circle cx="150" cy="200" r="130" fill="${BRASS}" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="200" r="104" fill="#FBF6E8" stroke="${INK}" stroke-width="5"/>
 ${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<circle cx="${150 + Math.sin(a) * 86}" cy="${200 - Math.cos(a) * 86}" r="6" fill="${INK}"/>`; }).join('')}
 <path class="mh" d="M150,200 L150,130" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M150,200 L195,200" stroke="${INK}" stroke-width="11" stroke-linecap="round"/><circle cx="150" cy="200" r="10" fill="${RED}"/>`;
const PATENTE = `${FIGP('M20,10 L480,10 L480,600 L20,600 Z', '#F7F0E0', 6, .2)}<text x="250" y="90" text-anchor="middle" font-family="Rye" font-size="54" fill="${RED}">PATENT</text><text x="250" y="160" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="52" fill="${INK}">1873</text>${[...Array(7)].map((_, k) => `<path d="M60,${220 + k * 40} H${k % 2 ? 380 : 440}" stroke="${INK}" stroke-width="5" opacity=".45"/>`).join('')}<circle cx="380" cy="520" r="54" fill="${RED}" stroke="${INK}" stroke-width="5"/>`;
const VAQ = (pa, x, y, w, o = {}) => figura(pa, x, y, w, w * 760 / 600, JEANS, '0 0 600 760', Object.assign({ z: 6, origin: '50% 50%' }, o));
const NUMS = (c, t0) => [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 160, 1110, 130, 130, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', lineHeight: '120px', color: INK, zIndex: 30 }, String(n)), t0 + i * 0.15, { sfx: i === 2 ? 'pop2' : 'pop' }));
// círculo que señala el bolsillo enano dentro de unos vaqueros dibujados en (x,y,w)
const anilla = (c, x, y, w, t0) => aparece(box(c, x + w * 0.66, y + w * 0.1, w * 0.24, w * 0.24, { borderRadius: '50%', border: `10px solid ${PINK}`, zIndex: 9 }), t0, { sfx: 'ding' });

/* L0 · PORTADA: «¿Para qué es este bolsillo?» con los vaqueros y el bolsillo señalado */
plano(-1, L(1) - 0.1, { background: '#EADFC8' }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,62,165,.22)', 'rgba(0,0,0,0)', 0);
  texto(c, 300, '¿Para qué es', { size: 100 });
  const t2 = texto(c, 410, 'este ' + hlSpan('bolsillo?', 'phl'), { size: 140, italic: true });
  const j = VAQ(c, 240, 640, 600);
  const an = box(c, 240 + 600 * 0.66, 640 + 600 * 0.1, 600 * 0.24, 600 * 0.24, { borderRadius: '50%', border: `12px solid ${PINK}`, zIndex: 9 });
  aparece(chip(c, 140, 1180, '🪙 ¿monedas?', { size: 66, bg: '#fff', color: INK }), T.monedas - 0.4);
  sello(c, 1290, '¡NO!', T.monedas + 0.4, { size: 150, r: -8 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -3 + wobble(t, 0.5, 1.5), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(j, { r: wobble(t, 0.6, 1.5) }); set(an, { s: 1 + 0.08 * Math.sin(t * 6) }); };
}, { sfx: false });

/* L1 · ni monedas ni mechero: guarda otra cosa */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#E9D7B0' }, c => {
  const a = texto(c, 560, '🪙 ❌', { size: 200 }), b = texto(c, 800, '🔥 ❌', { size: 200 });
  aparece(chip(c, 220, 1100, '150 años guardando…', { size: 62, bg: YEL, color: INK }), T.otra - 1.2);
  aparece(qMark(c, 450, 1220, 180, PINK), T.otra, { sfx: 'pop2' });
  return t => { set(a, { r: -4 }); set(b, { o: t > T.mechero ? 1 : 0, s: pop(t, T.mechero, 0.35), r: 3 }); };
});

/* L2 · marca */
marca(2);

/* L3 · ¿para qué sirve? */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const j = VAQ(c, 290, 380, 500);
  anilla(c, 290, 380, 500, T.diminuto);
  [0, 1].map(i => aparece(qMark(c, 900 - i * 800, 520 + i * 60, 130, i ? YEL : PINK), T.diminuto + 0.2 + i * 0.1));
  NUMS(c, T.tres3);
  return t => set(j, { r: wobble(t, 0.5, 1.5) });
});

/* PASO 1 · el problema (L4–L5) */
paso(L(4) - 0.1, L(6) - 0.1, 1, 'El ' + hlSpan('problema', 'shl'), T.problema);
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  aparece(chip(c, 300, 520, 'Oeste americano 🌵', { size: 62, bg: YEL, color: INK }), T.oeste, { sfx: 'stamp' });
  const m = texto(c, 640, '⛏️', { size: 260 });
  const j = VAQ(c, 290, 860, 500);
  sello(c, 920, '¡RAAAS!', T.rompian + 0.2, { size: 140, r: -10 });
  aparece(chip(c, 260, 1300, '…sobre todo los bolsillos', { size: 54, bg: PINK }), T.bolsillos4);
  sfx('glitch', T.rompian + 0.2, 0.5);
  return t => { set(m, { r: Math.sin(t * 7) * 25 }); if (t > T.rompian) set(j, { x: shake(t, T.rompian + 0.2, 0.6, 20) }); };
});
plano(L(5) - 0.1, T.dinero - 0.08, PAPEL, c => {
  aparece(chip(c, 260, 520, 'Jacob Davis, sastre ✂️', { size: 62, bg: YEL, color: INK }), L(5));
  const r = box(c, 140, 700, 800, 360, { zIndex: 6 }); r.innerHTML = `<svg viewBox="0 0 800 360" width="100%" height="100%">${[0, 1, 2].map(i => rem(160 + i * 240, 180, 80)).join('')}</svg>`;
  aparece(chip(c, 280, 1150, 'remaches de cobre', { size: 62, bg: '#fff', color: INK }), T.remaches5, { sfx: 'thud' });
  return t => set(r, { s: pop(t, T.clavar, 0.4), o: t > T.clavar ? 1 : 0 });
});
plano(T.dinero - 0.08, T.levi - 0.1, { background: '#E9D7B0' }, c => {
  const b = texto(c, 600, '💸', { size: 260 });
  sello(c, 900, 'SIN DINERO', T.dinero + 0.3, { size: 120, r: -6 });
  aparece(chip(c, 220, 1180, 'se lo pidió a su proveedor…', { size: 54, bg: '#fff', color: INK }), T.proveedor);
  return t => set(b, { y: -Math.abs(Math.sin(t * 3)) * 40 });
});
plano(T.levi - 0.1, L(6) - 0.1, { background: '#C9D3E6' }, c => {
  rays(c, -160, 700, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const n = texto(c, 600, hlSpan('LEVI STRAUSS', 'lhl'), { size: 140, color: RED });
  const pt = figura(c, 340, 860, 400, 480, PATENTE, '0 0 500 610', { z: 6, origin: '50% 50%' });
  sfx('tada', T.levi + 0.2, 0.6);
  return t => { set(n, { s: pop(t, T.levi, 0.4), r: -4 }); set(pt, { s: pop(t, T.levi + 0.5, 0.4), r: 5 + wobble(t, 0.5, 1) }); paint(c.querySelector('.lhl'), t, T.levi + 0.2, 0.4); };
});

/* PASO 2 · el bolsillo (L6–L7) */
paso(L(6) - 0.1, L(8) - 0.1, 2, 'El ' + hlSpan('bolsillo', 'shl'), T.bolsillo6);
plano(L(6) - 0.1, L(7) - 0.1, { background: '#E9D7B0' }, c => {
  texto(c, 480, '¿Qué llevaba encima?', { size: 84 });
  aparece(qMark(c, 470, 640, 120, PINK), T.hombre);
  const r = figura(c, 260, 760, 560, 709, RELOJ, '0 0 300 380', { z: 6, origin: '50% 30%' });
  const mh = r.querySelector('.mh');
  sfx('tick', T.reloj, 0.6); sfx('tick', T.reloj + 0.5, 0.6); sfx('tick', T.reloj + 1, 0.6);
  return t => { set(r, { s: pop(t, T.reloj, 0.45), o: t > T.reloj ? 1 : 0, r: Math.sin(t * 2.4) * 8 }); mh.setAttribute('transform', `rotate(${t * 60} 150 200)`); };
});
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const j = VAQ(c, 140, 520, 800);
  const r = figura(c, 0, 0, 120, 152, RELOJ, '0 0 300 380', { z: 10, origin: '50% 50%' });
  sello(c, 1150, '¡SU CASA!', T.casa + 0.2, { size: 140, r: -6 });
  sfx('gulp', T.casa, 0.6);
  return t => { const k = p(t, L(7), Math.max(0.3, T.casa - L(7))); set(r, { x: lerp(460, 140 + 800 * 0.71, k), y: lerp(1200, 520 + 800 * 0.15, k), s: 1 - k * 0.35, r: (1 - k) * 40 }); };
});

/* PASO 3 · la prueba (L8–L9): mira tus remaches */
paso(L(8) - 0.1, L(10) - 0.1, 3, 'La ' + hlSpan('prueba', 'shl'), T.prueba);
plano(L(8) - 0.1, L(9) - 0.1, { background: '#E9D7B0' }, c => {
  const z = figura(c, -260, 380, 1500, 1900, JEANS, '0 0 600 760', { z: 6, origin: '50% 50%' });
  const rv = z.querySelector('.rv');
  aparece(chip(c, 300, 1250, '👀 ¡míralos ahora!', { size: 64, bg: YEL, color: INK }), T.mira);
  sello(c, 1000, '¡AHÍ SIGUEN!', T.siguen, { size: 120, r: -5 });
  sfx('ding', T.remaches8, 0.6);
  return t => { set(z, { x: -lerp(0, 650, p(t, T.mira, 1.2)), y: lerp(0, 180, p(t, T.mira, 1.2)), s: 1 }); rv.style.filter = t > T.remaches8 && Math.sin(t * 10) > 0 ? 'drop-shadow(0 0 10px #FF3EA5)' : 'none'; };
});
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const j = VAQ(c, 190, 480, 700);
  const cr = j.querySelector('.cr');
  sello(c, 1190, '¡DESAPARECIDO!', T.desaparecio + 0.3, { size: 86, r: -6 });
  aparece(box(c, 190 + 350 - 80, 480 + 700 * 0.53 - 80, 160, 160, { borderRadius: '50%', border: `10px solid ${PINK}`, zIndex: 9 }), T.entrep, { sfx: 'boing' });
  return t => cr.setAttribute('opacity', t > T.desaparecio && t < T.entrep ? 0.25 : 1);
});
emu(T.entrep + 0.9);

/* L10 · OJO: la leyenda de la hoguera */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 330, '¡OJO!', T.ojo, { size: 140 });
  aparece(chip(c, 360, 600, 'leyenda 📜', { size: 60, bg: '#fff', color: INK }), T.leyenda);
  const f = texto(c, 760, '🔥', { size: 300 });
  aparece(chip(c, 380, 1180, '¡AUCH! (el jefe)', { size: 66, bg: RED }), T.quemo + 0.2, { sfx: 'boing' });
  return t => set(f, { o: t > T.quemo ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 12) });
});

/* L11 · O sea: un bolsillo para un reloj que ya no lleva nadie */
golpe(L(11) - 0.1, L(12) - 0.1, YEL, 'Un bolsillo para un reloj…', '…que ya no lleva nadie', { y: 460, size: 104, size2: 92, t2: T.nadie - 0.3, draw: c => { const r = figura(c, 380, 900, 320, 405, RELOJ, '0 0 300 380', { z: 6, origin: '50% 30%' }); FX.fns.push(t => set(r, { r: Math.sin(t * 2.4) * 10 })); } });

/* L12 · CTA de seguir: la palabra de Edison */
sigueme(12, 'En la próxima cena…', '¡lo cuentas TÚ!', 'sígueme');

/* L13 · pregunta final */
preguntaFinal('¿Qué guardas tú', 'en ese bolsillo?', { size: 110, draw: c => { VAQ(c, 340, 620, 400); aparece(chip(c, 200, 1180, '🪙 💊 🎟️ … ¿o nada?', { size: 64, bg: YEL, color: INK }), L(13) + 1.0); } });

/* L14 · cierre */
cierre(47, '¿Y el bolsillo enano?', ['OBJETOS', 'de cada día']);

Story.run({ ovalo: [[L(3), L(4) - 0.15], [L(10), L(11) - 0.15]] });
