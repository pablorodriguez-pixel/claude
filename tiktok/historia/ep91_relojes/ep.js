/* Ep. 91 · ¿Por qué los relojes de los anuncios marcan las 10:10? — formato del canal (Vecino, portada amarilla, pícaro) */
Story.prepara();
const T = {
  diez0: Q('diez y diez'),
  buscalo: Q('búscalo luego'), todos: Q('todos'), casualidad: Q('no es casualidad'), psico: Q('es psicología'),
  primero: Q('primero'), sonrisa: Q('una sonrisa'), sonrie: Q('te sonríe'), compres: Q('lo compres'),
  segundo: Q('segundo'), arriba: Q('la parte de arriba'), marca: Q('la marca'), nombre: Q('el nombre'),
  tercero: Q('tercero'), uve: Q('una uve'), victoria: Q('de victoria'), ganador: Q('de ganador'),
  ocho: Q('las ocho y veinte'), lunes: Q('cara de lunes'),
  ley: Q('casi una ley'), tiendas: Q('tiendas'), catalogos: Q('catálogos'), webs: Q('webs'), diez7: Q('diez y diez'),
  marcas8: Q('hay marcas'), alsegundo: Q('al segundo'), foto: Q('quede perfecta'),
  sabes: Q('ahora que lo sabes'), verlo: Q('dejar de verlo'),
  ojo: Q('ojo'), lincoln: Q('lincoln'), bulo: Q('un bulo'),
  osea: Q('o sea'), hora: Q('la hora'), ligando: Q('te está ligando'),
};
const ORO_R = '#d9b24a', ACERO_R = '#b9c2cb';
/* reloj (vb 0 0 300 300): esfera, marca arriba, agujas (.hh .mm .ss) y, si se pide, ojos/boca para que «sonría» */
const RELOJ = (c, x, y, w, o = {}) => { const d = box(c, x, y, w, w, { zIndex: o.z || 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 300" width="${w}" height="${w}" style="overflow:visible">
  ${o.correa !== false ? `<rect x="105" y="-90" width="90" height="120" rx="14" fill="${o.correa || '#6b4a2a'}" stroke="${INK}" stroke-width="7"/><rect x="105" y="270" width="90" height="120" rx="14" fill="${o.correa || '#6b4a2a'}" stroke="${INK}" stroke-width="7"/>` : ''}
  <circle cx="150" cy="150" r="140" fill="${o.caja || ORO_R}" stroke="${INK}" stroke-width="9"/><circle cx="150" cy="150" r="114" fill="#fbf6ea" stroke="${INK}" stroke-width="6"/>
  ${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path d="M${f1(150 + Math.sin(a) * 96)},${f1(150 - Math.cos(a) * 96)} L${f1(150 + Math.sin(a) * 108)},${f1(150 - Math.cos(a) * 108)}" stroke="${INK}" stroke-width="${i % 3 ? 4 : 8}"/>`; }).join('')}
  <text class="lg" x="150" y="98" text-anchor="middle" font-family="Rye" font-size="24" fill="${INK}">${o.marca || 'MARCA'}</text>
  <g class="ojos" style="opacity:0"><ellipse cx="118" cy="132" rx="10" ry="13" fill="${INK}"/><ellipse cx="182" cy="132" rx="10" ry="13" fill="${INK}"/><circle cx="104" cy="160" r="12" fill="#f4a0b0" opacity=".7"/><circle cx="196" cy="160" r="12" fill="#f4a0b0" opacity=".7"/></g>
  <g class="hh"><path d="M150,150 L150,92" stroke="${INK}" stroke-width="13" stroke-linecap="round"/></g><g class="mm"><path d="M150,150 L150,60" stroke="${INK}" stroke-width="9" stroke-linecap="round"/></g>
  <g class="ss" style="opacity:${o.seg ? 1 : 0}"><path d="M150,170 L150,50" stroke="${RED}" stroke-width="4"/></g><circle cx="150" cy="150" r="10" fill="${o.caja || ORO_R}" stroke="${INK}" stroke-width="5"/></svg>`);
  d.hh = d.querySelector('.hh'); d.mm = d.querySelector('.mm'); d.ss = d.querySelector('.ss'); d.ojos = d.querySelector('.ojos'); d.lg = d.querySelector('.lg'); return d; };
const hora = (r, h, m, s = 0) => { r.mm.setAttribute('transform', `rotate(${f1(m * 6 + s * 0.1)} 150 150)`); r.hh.setAttribute('transform', `rotate(${f1((h % 12) * 30 + m * 0.5)} 150 150)`); r.ss.setAttribute('transform', `rotate(${f1(s * 6)} 150 150)`); };
const ojos = (r, on) => { r.ojos.style.opacity = on ? 1 : 0; };
const MANO = (c, x, y, sz = 170, rot = -40, z = 18) => box(c, x, y, sz, sz, { zIndex: z }, `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.1)}</svg>`);
const ESCAPARATE = { background: '#efe3c8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(122,31,58,.10) 0 40px, transparent 40px 80px)' };

/* L0 · PORTADA (fotograma 0 completo, amarilla): un reloj gigante a las 10:10 con ojitos: las agujas le hacen la sonrisa */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 200, '¿Por qué los relojes…', { size: 92 });
  const t2 = texto(c, 310, '…marcan las ' + hlSpan('10:10', 'phl') + '?', { size: 104, italic: true });
  const r = RELOJ(c, 290, 620, 500); ojos(r, true);
  const bs = estrellas(c, 5);
  sfx('swoosh_up', 0.05, 0.6); sp(T.diez0, 'ding', 0.8); sp(T.diez0 + 0.3, 'sparkle', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    hora(r, 10, 10); set(r, { r: Math.sin(t * 2) * 4, s: 1 + 0.03 * Math.sin(t * 4) }); orb(bs, t, 540, 870, 340, 330);
  };
}, { sfx: false });
shakeAt(T.diez0, 0.25, 10);

/* L1 · búscalo: TODOS (catálogo de relojes, todos a las 10:10) → no es casualidad: es PSICOLOGÍA */
headline(L(1) - 0.1, L(2) - 0.1, 'No es *casualidad*', { size: 96, hlT: T.casualidad });
plano(L(1) - 0.1, L(2) - 0.1, ESCAPARATE, c => {
  const cam = CAM(c);
  const rs = [...Array(6)].map((_, i) => { const r = RELOJ(cam, 330 + (i % 3) * 230, 560 + Math.floor(i / 3) * 330, 190, { caja: [ORO_R, ACERO_R, '#2b2b30', ACERO_R, ORO_R, '#c87a3a'][i], correa: ['#6b4a2a', ACERO_R, '#1d1a22', '#2b4a8a', '#7a1f3a', '#6b4a2a'][i], marca: ['LUX', 'PRO', 'ÉLITE', 'SPORT', 'ROYAL', 'CLASSIC'][i] }); hora(r, 10, 10); return [r, i]; });
  const ps = stamp(cam, 320, 1160, 'PSICOLOGÍA', { size: 92, z: 30, col: '#7a5aa8', bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  rs.forEach(([, i]) => sp(T.todos - 0.3 + i * 0.12, 'pop', 0.4)); sp(T.psico, 'stamp', 0.9);
  return t => { zoom(cam, t, L(1), 4, 0.06); rs.forEach(([r, i]) => set(r, { s: pop(t, T.buscalo + i * 0.12, 0.35), r: Math.sin(t * 2 + i) * 4 })); stampA(ps, t, T.psico, -6); };
});
shakeAt(T.psico, 0.25, 10);

/* L2 · PRIMERO: las agujas forman una sonrisa (aparece la cara) → el reloj te sonríe… para que lo compres (cliente enamorado + etiqueta) */
headline(L(2) - 0.1, L(3) - 0.1, '1 · Te *sonríe*', { size: 104, hlT: T.sonrisa });
plano(L(2) - 0.1, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 0);
  const r = RELOJ(cam, 300, 440, 480);
  const son = box(cam, 300, 440, 480, 480, { zIndex: 9 }, `<svg viewBox="0 0 300 300" width="480" height="480"><path class="sm" d="M70,120 Q150,250 230,120" stroke="${RED}" stroke-width="10" fill="none" stroke-dasharray="320" stroke-dashoffset="320" stroke-linecap="round"/></svg>`);
  const cli = PERS(cam, 360, 1020, 260, { ropa: '#2b8ad6', pelo: 'largo', pcol: '#c87a3a' });
  const cor = [0, 1].map(i => box(cam, 0, 0, 60, 56, { zIndex: 20 }, `<svg viewBox="0 0 240 220" width="60" height="56"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="12"/></svg>`));
  const pr = PRECIO(cam, 700, 1020, '¡CÓMPRAME!');
  sp(T.primero, 'pop2', 0.5); sp(T.sonrisa, 'sparkle', 0.8); sp(T.sonrie, 'boing', 0.6); sp(T.compres, 'cash', 0.9);
  return t => {
    zoom(cam, t, L(2), 4, 0.06); set(ry, { r: t * 8 }); hora(r, 10, 10); ojos(r, t > T.sonrie - 0.2); set(r, { r: Math.sin(t * 2) * 3 });
    son.querySelector('.sm').setAttribute('stroke-dashoffset', f1(320 * (1 - p(t, T.sonrisa, 0.6))));
    set(cli, { o: t > T.sonrie ? 1 : 0, s: pop(t, T.sonrie, 0.35) }); pFace(cli, t, { feliz: 1, closed: t > T.compres, ceja: 10, look: [10, -10] });
    cor.forEach((h, i) => set(h, { o: t > T.sonrie + 0.2 ? 1 : 0, x: 430 + i * 90, y: 1060 + Math.sin(t * 6 + i) * 8, s: 1 + 0.2 * Math.abs(Math.sin(t * 8 + i)) }));
    set(pr, { o: t > T.compres - 0.1 ? 1 : 0, s: pop(t, T.compres - 0.1, 0.35), r: 8 + Math.sin(t * 4) * 6 });
  };
});

/* L3 · SEGUNDO: dejan libre la parte de arriba, donde va la marca (a las 12:00 la tapan ✗; a las 10:10 se lee ✔) */
headline(L(3) - 0.1, L(4) - 0.1, '2 · Se ve *la marca*', { size: 100, hlT: T.marca });
plano(L(3) - 0.1, L(4) - 0.1, ESCAPARATE, c => {
  const cam = CAM(c);
  const a = RELOJ(cam, 300, 620, 300, { marca: 'MARCA' }), b = RELOJ(cam, 660, 620, 300, { marca: 'MARCA' });
  const no = texto(cam, 1000, '✗', { size: 160, color: RED, x: 330, w: 240, z: 12, shadow: `5px 5px 0 ${INK}` }); const si = box(cam, 720, 1020, 180, 180, { zIndex: 12 }, CHECK);
  const lab = [chip(cam, 340, 470, '12:00', { size: 50, bg: '#1d1a22' }), chip(cam, 700, 470, '10:10', { size: 50, bg: VERDEI })];
  const lupa = box(cam, 660, 570, 220, 220, { zIndex: 20 }, `<svg viewBox="0 0 200 200" width="220" height="220"><circle cx="80" cy="80" r="62" fill="rgba(200,230,255,.3)" stroke="${INK}" stroke-width="14"/><path d="M126,126 L190,190" stroke="${INK}" stroke-width="22" stroke-linecap="round"/></svg>`);
  sp(T.segundo, 'pop2', 0.5); sp(T.arriba, 'error', 0.5); sp(T.marca, 'ding', 0.8); sp(T.nombre, 'sparkle', 0.6);
  return t => {
    zoom(cam, t, L(3), 4, 0.06); hora(a, 12, 0); hora(b, 10, 10);
    a.lg.style.opacity = 0.25; b.lg.setAttribute('fill', t > T.marca ? RED : INK);
    set(no, { o: t > T.arriba ? 1 : 0, s: pop(t, T.arriba, 0.3) }); stampA(si, t, T.marca, -8); lab.forEach((l, i) => popA(l, t, L(3) + 0.2 + i * 0.2, { r: i ? 4 : -4 }));
    set(lupa, { o: t > T.nombre - 0.2 ? 1 : 0, x: Math.sin(t * 3) * 14, y: Math.cos(t * 3) * 8 });
  };
});

/* L4 · TERCERO: parecen una uve, de victoria, de ganador (mano haciendo la V + copa) */
headline(L(4) - 0.1, L(5) - 0.1, '3 · *Victoria*', { size: 110, hlT: T.victoria });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const r = RELOJ(cam, 300, 440, 480);
  const v = box(cam, 300, 440, 480, 480, { zIndex: 9 }, `<svg viewBox="0 0 300 300" width="480" height="480"><path class="vv" d="M70,70 L150,150 L230,70" stroke="${RED}" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="260" stroke-dashoffset="260"/></svg>`);
  const ga = PERS(cam, 640, 980, 260, { ropa: GOLD, pelo: 'corto', gorro: 'corona' });
  const copa = box(cam, 340, 1040, 180, 200, { zIndex: 12 }, `<svg viewBox="0 0 150 170" width="180" height="200"><path d="M30,10 H120 C120,80 100,100 75,104 C50,100 30,80 30,10 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="62" y="104" width="26" height="36" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><rect x="36" y="140" width="78" height="22" fill="#8a5a32" stroke="${INK}" stroke-width="6"/></svg>`);
  const bs = estrellas(cam, 5);
  sp(T.tercero, 'pop2', 0.5); sp(T.uve, 'swoosh_up', 0.6); sp(T.victoria, 'tada', 0.8); sp(T.ganador, 'sparkle', 0.7);
  return t => {
    zoom(cam, t, L(4), 4, 0.07); set(ry, { r: t * 8 }); hora(r, 10, 10); v.querySelector('.vv').setAttribute('stroke-dashoffset', f1(260 * (1 - p(t, T.uve, 0.5))));
    set(ga, { o: t > T.ganador - 0.2 ? 1 : 0, s: pop(t, T.ganador - 0.2, 0.35), y: -Math.abs(Math.sin(t * 5)) * 16 }); pFace(ga, t, { feliz: 1, closed: true, ceja: 10, seed: 1 });
    set(copa, { o: t > T.victoria ? 1 : 0, s: pop(t, T.victoria, 0.35), r: Math.sin(t * 4) * 8 }); orb(bs, t, 540, 680, 320, 300); bs.forEach(b => b.style.opacity = t > T.victoria ? b.style.opacity : 0);
  };
});

/* L5 · y si las pones a las 8:20… el reloj pone cara de LUNES (las agujas giran, la sonrisa se da la vuelta, nube con lluvia) */
headline(L(5) - 0.1, L(6) - 0.1, 'Cara de *lunes*', Object.assign({ size: 104, hlT: T.lunes }, BL));
plano(L(5) - 0.1, L(6) - 0.1, { background: '#5d6b80' }, c => {
  const cam = CAM(c);
  const r = RELOJ(cam, 300, 520, 480); ojos(r, true);
  const nube = box(cam, 340, 300, 400, 200, { zIndex: 12 }, `<svg viewBox="0 0 400 200" width="400" height="200"><path d="M80,170 C20,170 10,110 60,96 C50,40 130,20 160,60 C180,10 270,10 280,70 C340,60 380,110 340,150 C350,170 320,176 300,170 Z" fill="#9aa4ad" stroke="${INK}" stroke-width="8"/></svg>`);
  const gotas = [...Array(6)].map(() => box(cam, 0, 0, 16, 40, { zIndex: 11, background: '#7cc4ea', border: `3px solid ${INK}`, borderRadius: '8px' }));
  const lu = chip(cam, 380, 1120, 'LUNES 8:20', { size: 64, bg: '#1d1a22' });
  sp(T.ocho, 'whoosh', 0.6); sp(T.lunes, 'sad', 0.8);
  return t => {
    zoom(cam, t, L(5), 3, 0.07);
    const k = p(t, T.ocho - 0.2, 0.9, E.inOutCubic), mins = lerp(10 * 60 + 10, 8 * 60 + 20 + 12 * 60, k); hora(r, Math.floor(mins / 60), mins % 60);
    r.ojos.querySelectorAll('ellipse').forEach(e => e.setAttribute('ry', t > T.lunes ? 5 : 13));
    set(nube, { o: t > T.lunes - 0.2 ? 1 : 0, y: (1 - p(t, T.lunes - 0.2, 0.4, E.outBack)) * -300 });
    gotas.forEach((g, i) => { const kk = ((t * 1.4 + i / 6) % 1); set(g, { o: t > T.lunes ? 1 : 0, x: 400 + i * 50, y: 480 + kk * 300 }); });
    popA(lu, t, T.lunes, { r: -4 });
  };
});

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · casi una LEY: tiendas, catálogos, webs… todos a las 10:10 (escaparate, catálogo y móvil, uno tras otro) */
headline(L(7) - 0.1, L(8) - 0.1, 'Casi una *ley*', { size: 104, hlT: T.ley });
plano(L(7) - 0.1, L(8) - 0.1, ESCAPARATE, c => {
  const cam = CAM(c);
  const tienda = box(cam, 320, 520, 700, 300, { zIndex: 4, background: '#2b2b30', border: `8px solid ${INK}`, borderRadius: '16px' }); [0, 1, 2].forEach(i => { const r = RELOJ(tienda, 40 + i * 220, 60, 180, { correa: false }); hora(r, 10, 10); });
  box(tienda, 0, -70, 700, 70, { background: RED, border: `6px solid ${INK}`, fontFamily: 'Rye', fontSize: '44px', color: '#fff', textAlign: 'center', lineHeight: '58px' }, 'RELOJERÍA');
  const cat = box(cam, 330, 880, 330, 360, { zIndex: 5, background: '#fff', border: `7px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, transform: 'rotate(-5deg)' }); const rc = RELOJ(cat, 70, 90, 190); hora(rc, 10, 10);
  const mov = box(cam, 720, 880, 240, 360, { zIndex: 5, background: '#1d1a22', border: `8px solid ${INK}`, borderRadius: '34px' }); const sc = box(mov, 16, 40, 192, 320, { background: '#fbf6ea', borderRadius: '10px' }); const rm = RELOJ(sc, 20, 80, 150, { correa: false }); hora(rm, 10, 10);
  const le = stamp(cam, 330, 1250, 'LEY NO ESCRITA', { size: 70, z: 30 });
  sp(T.tiendas, 'pop', 0.6); sp(T.catalogos, 'paper', 0.6); sp(T.webs, 'click', 0.7); sp(T.diez7, 'stamp', 0.8);
  return t => { zoom(cam, t, L(7), 4, 0.06); set(tienda, { s: pop(t, L(7), 0.35) }); set(cat, { o: t > T.catalogos - 0.2 ? 1 : 0, s: pop(t, T.catalogos - 0.2, 0.35), r: -5 }); set(mov, { o: t > T.webs - 0.2 ? 1 : 0, s: pop(t, T.webs - 0.2, 0.35), r: 4 }); stampA(le, t, T.diez7, -6); };
});
shakeAt(T.diez7, 0.25, 10);

/* L8 · [susurro] hay marcas que lo ajustan AL SEGUNDO para la foto (macro del segundero encajando + flash de cámara) */
headline(L(8) - 0.1, L(9) - 0.1, '*Al segundo*', Object.assign({ size: 110, hlT: T.alsegundo }, BL));
plano(L(8) - 0.1, L(9) - 0.1, { background: '#1d1a22' }, c => {
  const cam = CAM(c);
  const r = RELOJ(cam, 190, 420, 700, { seg: true });
  const flash = box(c, 0, 0, 1080, 1920, { zIndex: 60, background: '#fff' });
  const cama = box(cam, 720, 1080, 260, 190, { zIndex: 14 }, `<svg viewBox="0 0 260 190" width="260" height="190"><rect x="10" y="40" width="240" height="140" rx="20" fill="#3d3a44" stroke="#f4efe2" stroke-width="7"/><rect x="80" y="14" width="90" height="36" rx="8" fill="#3d3a44" stroke="#f4efe2" stroke-width="6"/><circle cx="130" cy="110" r="48" fill="#1d1a22" stroke="#f4efe2" stroke-width="7"/><circle cx="130" cy="110" r="22" fill="#5a6a8a"/></svg>`);
  const ch = chip(cam, 330, 1180, 'clic… perfecta', { size: 50, bg: '#7a5aa8' });
  [...Array(6)].forEach((_, i) => sp(T.marcas8 + i * 0.4, 'tick', 0.5)); sp(T.foto, 'click', 0.9);
  return t => {
    zoom(cam, t, L(8), 5, 0.08); const sgs = Math.min(31, Math.floor((t - L(8)) * 4) + 20); hora(r, 10, 10, t > T.alsegundo ? 31 : sgs);
    set(flash, { o: t > T.foto && t < T.foto + 0.25 ? 1 - p(t, T.foto, 0.25) : 0 }); popA(ch, t, T.foto + 0.1, { r: -4 }); set(cama, { o: t > T.alsegundo - 0.2 ? 1 : 0 });
  };
});

/* L9 · y ahora que lo sabes, no vas a poder dejar de verlo (relojes con ojos por todas partes guiñándote; tú, mareado) */
headline(L(9) - 0.1, L(10) - 0.1, 'Ya no *dejarás de verlo*', { size: 86, hlT: T.verlo });
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const tu = PERS(cam, 380, 700, 340, { ropa: '#2b8ad6', pelo: 'corto' });
  const rs = [[120, 470], [760, 470], [80, 1060], [820, 1060], [450, 520], [470, 1240]].map(([x, y], i) => { const r = RELOJ(cam, x, y, 180, { correa: false, caja: [ORO_R, ACERO_R][i % 2] }); ojos(r, true); hora(r, 10, 10); return [r, i]; });
  rs.forEach(([, i]) => sp(T.sabes + i * 0.2, 'pop', 0.4)); sp(T.verlo, 'boing', 0.8);
  return t => {
    zoom(cam, t, L(9), 4, 0.06); pFace(tu, t, { feliz: -0.4, ceja: 18, look: [Math.sin(t * 6) * 14, Math.cos(t * 6) * 8], jaw: 0.4 });
    rs.forEach(([r, i]) => { set(r, { s: pop(t, T.sabes + i * 0.2, 0.3), r: Math.sin(t * 3 + i) * 8 }); r.ojos.querySelectorAll('ellipse')[0].setAttribute('ry', ((t + i * 0.3) % 1.4) < 0.15 ? 2 : 13); });
  };
});

/* L10 · OJO: lo de que es la hora a la que murió Lincoln es un BULO (chistera + sello) */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const ch = box(c, 380, 520, 320, 300, { zIndex: 6 }, `<svg viewBox="0 0 320 300" width="320" height="300"><rect x="80" y="10" width="160" height="220" fill="${INK}" stroke="${INK}" stroke-width="6"/><rect x="80" y="180" width="160" height="30" fill="#7a1f3a"/><rect x="20" y="226" width="280" height="40" rx="18" fill="${INK}"/></svg>`);
  const r = RELOJ(c, 400, 860, 280, { correa: false }); hora(r, 10, 10);
  const bu = stamp(c, 320, 1160, 'BULO', { size: 130, z: 30 });
  return t => { set(ch, { r: Math.sin(t * 2) * 4 }); stampA(bu, t, T.bulo, -8); };
});
sp(T.lincoln, 'pop', 0.5); sp(T.bulo, 'stamp', 1);

/* L11 · O sea: ese reloj no te está dando la hora… te está LIGANDO (guiño + piropo) */
colorHit(L(11) - 0.1, L(12) - 0.1, YEL, c => {
  const r = RELOJ(c, 290, 480, 500); ojos(r, true); hora(r, 10, 10);
  const pi = BOCADILLO(c, 520, 380, '¿estudias o trabajas?', { size: 46 });
  const cor = [0, 1, 2].map(i => box(c, 0, 0, 80, 74, { zIndex: 20 }, `<svg viewBox="0 0 240 220" width="80" height="74"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="12"/></svg>`));
  return t => {
    set(r, { r: Math.sin(t * 3) * 6 }); r.ojos.querySelectorAll('ellipse')[1].setAttribute('ry', t > T.ligando && ((t - T.ligando) % 1.2) < 0.3 ? 2 : 13);
    popA(pi, t, T.ligando + 0.1, { r: 4 }); cor.forEach((h, i) => { const k = ((t * 0.6 + i / 3) % 1); set(h, { o: t > T.ligando ? 1 - k : 0, x: 300 + i * 200, y: 1060 - k * 300 }); });
  };
});
sfx('swoosh_up', L(11), 0.6); sp(T.ligando, 'boing', 0.9); sp(T.ligando + 0.1, 'sparkle', 0.6); shakeAt(T.ligando, 0.25, 10);

/* L12 · pregunta final (pícara) */
preguntaFinal('¿Lo más caro que has pagado', 'solo porque te sonreía?', { size: 70, draw: c => [['un reloj, claro', YEL], ['el camarero majo', PINK], ['mi ex', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 48, bg: col, color: INK }), L(12) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(91, 'Las diez y diez', ['RELOJES', '10:10']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(12) - 0.15]],
  vecino: { risa: [[T.compres, T.compres + 1.0], [T.lunes, T.lunes + 1.0], [T.ligando, T.ligando + 1.0]], sorpresa: [[T.psico, T.psico + 0.8], [T.bulo, T.bulo + 0.8]], golpes: [T.psico, T.marca, T.victoria, T.diez7, T.ligando] },
});
