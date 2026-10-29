/* Ep. 113 · «España está partida en seis trozos» (parte 2 de las autovías). Plan Peña (1939): las seis radiales dividen la península en seis sectores; en las
   nacionales de tres cifras, la primera cifra es el sector (entre la radial n y la n+1) y la segunda la corona de 100 km desde Madrid. N-634: sector 6,
   a más de 300 km; va de Galicia al País Vasco por la costa norte. Mismo mapa que el vídeo de las autovías para que se reconozca.
   Estilo ESTRATEGIA §8-9: imagen-idea en el fotograma 0 (España cortada como una tarta), todo en movimiento, la imagen enseña lo que dice la voz. */
Story.prepara();
const T = {
  partida: Q('partida en seis trozos'), cual: Q('en cuál estás'), fijado: Q('habías fijado'),
  mira: Q('mira esta'), n634: Q('la n'), cualquiera: Q('número cualquiera'), noes: Q('no lo es'),
  anio: Q('mil novecientos treinta y nueve'), ministro: Q('el ministro'), mapa: Q('el mapa'), tarta: Q('como una tarta'),
  cuchillos: Q('los cuchillos'), salen: Q('salen de madrid'), seis2: Q('seis trozos'), numerados: Q('numerados'),
  primera: Q('la primera cifra'), seis3: Q('empieza por seis'), entre: Q('entre la a'), norte: Q('el norte'),
  segunda: Q('la segunda cifra'), cien: Q('cien kilómetros'), tres: Q('un tres'), trescientos: Q('más de trescientos'),
  asi: Q('así que'), trozo6: Q('trozo seis'), efect: Q('efectivamente'), costa: Q('la costa'), galicia: Q('de galicia'),
  prueba: Q('pruébalo'), c400: Q('la cuatrocientos'), c300: Q('la trescientos'), valencia: Q('entre valencia'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const SPAIN = 'M90,120 L200,80 L320,86 L420,92 L560,112 L640,150 L720,170 L800,180 L900,200 L880,280 L800,380 L740,450 L760,540 L700,620 L640,700 L520,730 L400,742 L300,760 L230,700 L200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L60,170 Z';
const MX = 470, MY = 400, OX = 40, OY = 600;   // Madrid en (510, 1000) de la cámara
const RUTAS = [['A-1', 520, 100], ['A-2', 860, 250], ['A-3', 750, 470], ['A-4', 340, 720], ['A-5', 215, 520], ['A-6', 110, 145]];
const angR = ([, x, y]) => { let a = Math.atan2(x - MX, -(y - MY)) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
const COLS = ['#f2c230', '#e8507a', '#2b8ad6', '#2e9e6b', '#9a6bd0', '#f08a3c'];
const pt = (a, r) => [MX + Math.sin(a * Math.PI / 180) * r, MY - Math.cos(a * Math.PI / 180) * r];
/* sector k (1..6): de la radial k a la k+1 (el 6 va de la A-6 a la A-1) */
const cuña = k => { let a0 = angR(RUTAS[k - 1]), a1 = angR(RUTAS[k % 6]); if (a1 < a0) a1 += 360; const P = [`M${MX},${MY}`]; for (let a = a0; a <= a1 + 0.01; a += (a1 - a0) / 16) P.push('L' + pt(a, 900).map(f1).join(',')); return [P.join(' ') + 'Z', (a0 + a1) / 2]; };
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* el mapa: España recortada en 6 cuñas (cada una en su <g> para moverla), las radiales, los números de sector, los anillos de 100 km y la N-634 */
let MID = 0;
function MAPA6(cam) {
  const mid = MID++;
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#9fd0ee', backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0 3px, transparent 3px 60px)' });
  const sombra = box(cam, OX + 14, OY + 18, 1000, 800, { zIndex: 1 }, `<svg viewBox="0 0 1000 800" width="1000" height="800"><path d="${SPAIN}" fill="rgba(20,30,50,.25)"/></svg>`);
  const cuñas = [1, 2, 3, 4, 5, 6].map(k => { const [d, am] = cuña(k); const g = box(cam, OX, OY, 1000, 800, { zIndex: 2, transformOrigin: `${MX}px ${MY}px` }, `<svg viewBox="0 0 1000 800" width="1000" height="800" style="overflow:visible"><defs><clipPath id="cp${mid}_${k}"><path d="${SPAIN}"/></clipPath></defs><g clip-path="url(#cp${mid}_${k})"><path d="${d}" fill="${COLS[k - 1]}" fill-opacity=".55"/><path d="${SPAIN}" fill="none" stroke="${INK}" stroke-width="16"/></g></svg>`); g.am = am; return g; });
  const rad = box(cam, OX, OY, 1000, 800, { zIndex: 3 }, `<svg viewBox="0 0 1000 800" width="1000" height="800" style="overflow:visible">${RUTAS.map(([n, x, y], i) => `<g class="ra" style="opacity:1"><path d="M${MX},${MY} L${x},${y}" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M${MX},${MY} L${x},${y}" stroke="#fbf6ea" stroke-width="8" stroke-linecap="round"/></g>`).join('')}
    <g class="anillos" style="opacity:0">${[1, 2, 3, 4, 5].map(r => `<circle class="an${r}" cx="${MX}" cy="${MY}" r="${r * 85}" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="14 10"/><text x="${MX + 6}" y="${MY - r * 85 - 8}" font-family="Bricolage" font-weight="800" font-size="26" fill="${INK}">${r * 100} km</text>`).join('')}</g>
    <path class="n634" d="M95,175 L150,140 L210,112 L290,108 L370,112 L440,114 L500,122 L548,128" stroke="${RED}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <circle cx="${MX}" cy="${MY}" r="20" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`);
  const etq = RUTAS.map(([n, x, y]) => box(cam, OX + x - 60, OY + y - 26, 120, 52, { zIndex: 6, background: '#1f4fa0', border: `5px solid #fff`, outline: `4px solid ${INK}`, borderRadius: '10px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '34px', color: '#fff', textAlign: 'center', lineHeight: '42px', boxSizing: 'border-box' }, n));
  const nums = [1, 2, 3, 4, 5, 6].map(k => { const [x, y] = pt(cuñas[k - 1].am, k === 6 ? 230 : 250); return box(cam, OX + x - 50, OY + y - 50, 100, 100, { zIndex: 5, borderRadius: '50%', background: '#fff', border: `7px solid ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '64px', color: INK, textAlign: 'center', lineHeight: '86px', boxSizing: 'border-box', transformOrigin: '50% 50%' }, String(k)); });
  return { cuñas, rad, etq, nums, sombra };
}
/* señal de nacional: roja, borde blanco, «N-634» (cada cifra en su span) */
const SENAL = (c, x, y, w, num, z = 30) => box(c, x, y, w, w * 0.38, { zIndex: z, background: '#d8202a', border: `${f1(w * 0.025)}px solid #fff`, outline: `${f1(w * 0.012)}px solid ${INK}`, borderRadius: px(w * 0.05), fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(w * 0.24), color: '#fff', textAlign: 'center', lineHeight: px(w * 0.33), boxSizing: 'border-box', transformOrigin: '50% 50%', boxShadow: '0 16px 30px rgba(0,0,0,.35)' },
  `N-${[...num].map((d, i) => `<span class="d${i}" style="display:inline-block;border-radius:10px;padding:0 4px">${d}</span>`).join('')}`);
const marcaDig = (s, i, on, col = YEL) => { const e = s.querySelector('.d' + i); if (e) { e.style.background = on ? col : 'transparent'; e.style.color = on ? INK : '#fff'; } };
/* separación de las cuñas (tarta abierta): k = 0 cerrada, 1 abierta */
const abre = (M, k, t) => M.cuñas.forEach((g, i) => { const a = g.am * Math.PI / 180, d = k * (34 + 6 * Math.sin(t * 2 + i)); set(g, { x: Math.sin(a) * d, y: -Math.cos(a) * d }); });
const solo = (M, sel, t) => M.cuñas.forEach((g, i) => { g.style.opacity = sel == null || sel.includes(i + 1) ? 1 : 0.25; });

/* PORTADA + L0-L1: España cortada como una tarta, las cuñas se separan y respiran; «ESPAÑA ESTÁ PARTIDA EN 6 TROZOS»; aparecen las señales N-634, N-432, N-340 en su trozo */
plano(-1, L(2) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c); const M = MAPA6(cam);
  const sen = [['634', 6, 330], ['432', 4, 320], ['340', 3, 300]].map(([n, k, r]) => { const [x, y] = pt(M.cuñas[k - 1].am, r); const s = SENAL(cam, OX + x - 110, OY + y - 42, 220, n, 8); s.k = k; return s; });
  const t1 = texto(c, 140, 'ESPAÑA ESTÁ PARTIDA', { size: 76, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 250, `EN ${hlSpan('6 TROZOS', 'phl', YEL)}`, { size: 120, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.4); sp(T.partida, 'thud', 0.5); sen.forEach((s, i) => sp(T.cual + i * 0.3, 'pop', 0.45));
  return t => {
    deriva(cam, t, -0.2, L(2), [520, 1000, 1.05], [520, 1010, 1.16]);
    abre(M, 0.75 + 0.25 * Math.sin(t * 1.6), t);
    M.nums.forEach((n, i) => set(n, { s: 1 + 0.06 * Math.sin(t * 3 + i), r: Math.sin(t * 2 + i) * 5, x: Math.sin(M.cuñas[i].am * Math.PI / 180) * 30, y: -Math.cos(M.cuñas[i].am * Math.PI / 180) * 30 }));
    sen.forEach((s, i) => set(s, { o: t > T.cual + i * 0.3 ? 1 : 0, s: pop(t, T.cual + i * 0.3, 0.35), r: -4 + Math.sin(t * 2 + i) * 2 }));
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
  };
}, { sfx: false });

/* L2 (corte): la señal N-634 en primer plano en una carretera; las cifras laten «¿un número cualquiera?» */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 1600, { zIndex: 0, background: 'linear-gradient(#7fbfe8, #d8eef8)' });
  box(cam, -800, 1000, 2680, 1600, { zIndex: 1, background: '#8fb46a' });
  const carr = box(cam, -800, 1000, 2680, 1600, { zIndex: 2, background: '#55525c', clipPath: 'polygon(47% 0, 53% 0, 100% 100%, 0 100%)' });
  const rayas = box(cam, 530, 1000, 20, 1600, { zIndex: 3, background: 'repeating-linear-gradient(#fff 0 60px, transparent 60px 140px)' });
  const poste = box(cam, 520, 820, 40, 400, { zIndex: 4, background: '#9a948a', border: `6px solid ${INK}` });
  const sen = SENAL(cam, 160, 560, 760, '634', 5);
  const q = chip(c, 220, 330, '¿un número cualquiera?', { size: 60, bg: INK, color: '#fff', z: 40 });
  const no = texto(c, 1560, '¡NO!', { size: 150, color: RED, z: 40, shadow: '6px 6px 0 #fff' });
  sp(T.mira, 'whoosh', 0.5); sp(T.cualquiera, 'boing', 0.4); sp(T.noes, 'stamp', 0.7);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 900, 0.9], [540, 760, 1.15]);
    set(rayas, { y: (t * 500) % 140 });
    set(sen, { r: Math.sin(t * 1.4) * 1.5, s: 1 + 0.015 * Math.sin(t * 3) });
    [0, 1, 2].forEach(i => marcaDig(sen, i, t > T.cualquiera && Math.floor(t * 3) % 3 === i));
    set(q, { o: t > T.cualquiera - 0.1 && t < T.noes ? 1 : 0, s: pop(t, T.cualquiera - 0.1, 0.3), r: -3 });
    set(no, { o: t > T.noes - 0.05 ? 1 : 0, s: pop(t, T.noes - 0.05, 0.3), r: -6 });
  };
});

/* L3-L4 (corte): 1939, el ministro Peña con un cuchillo gigante sobre el mapa entero; las radiales se dibujan como cortes y la tarta se abre en 6 trozos numerados */
plano(L(3) - 0.1, L(5) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c); const M = MAPA6(cam);
  const ras = [...M.rad.querySelectorAll('.ra')];
  const min = PERS(c, 30, 160, 300, { ropa: '#2b3550', pelo: 'calvo', pcol: '#4a4a4a', z: 38 });
  const cuchillo = box(cam, 0, 0, 520, 90, { zIndex: 9, transformOrigin: '10% 50%' }, `<svg viewBox="0 0 520 90" width="520" height="90"><rect x="0" y="22" width="150" height="46" rx="16" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><path d="M150,18 L500,30 Q520,45 500,60 L150,72Z" fill="#dfe3e8" stroke="${INK}" stroke-width="7"/></svg>`);
  const ano = chip(c, 380, 330, '1939', { size: 80, bg: INK, color: YEL, z: 40 });
  const pena = chip(c, 360, 460, 'Plan Peña', { size: 58, bg: '#1f4fa0', z: 40 });
  sp(T.anio, 'whoosh', 0.4); sp(T.tarta, 'swoosh_up', 0.6); RUTAS.forEach((r, i) => sp(T.cuchillos + 0.2 + i * 0.35, 'click', 0.4)); M.nums.forEach((n, i) => sp(T.numerados + i * 0.18, 'pop', 0.35));
  return t => {
    deriva(cam, t, L(3) - 0.1, L(5) - 0.1, [520, 1060, 0.95], [520, 1010, 1.06]);
    // los cortes: cada radial aparece en orden con el cuchillo recorriéndola
    ras.forEach((r, i) => r.style.opacity = t > T.cuchillos + 0.2 + i * 0.35 ? 1 : 0);
    const ic = Math.min(5, Math.max(0, Math.floor((t - T.cuchillos - 0.2) / 0.35))), kc = clamp(((t - T.cuchillos - 0.2) % 0.35) / 0.35);
    const [, x2, y2] = RUTAS[ic]; const cx = OX + lerp(MX, x2, kc), cy = OY + lerp(MY, y2, kc), a = Math.atan2(y2 - MY, x2 - MX) * 180 / Math.PI;
    const corte = t > T.cuchillos && t < T.cuchillos + 0.2 + 6 * 0.35;
    set(cuchillo, { o: corte ? 1 : t < T.cuchillos && t > T.tarta - 0.4 ? 1 : 0, x: corte ? cx - 52 : 600 + Math.sin(t * 3) * 20, y: corte ? cy - 45 : 560 + Math.sin(t * 2) * 10, r: corte ? a + 180 : -20 + Math.sin(t * 4) * 8 });
    abre(M, p(t, T.seis2 - 0.2, 0.8, E.outBack), t);
    M.nums.forEach((n, i) => set(n, { o: t > T.numerados + i * 0.18 ? 1 : 0, s: pop(t, T.numerados + i * 0.18, 0.3), r: Math.sin(t * 2 + i) * 5 }));
    pFace(min, t, { feliz: 0.8, ceja: 6, look: [12, 10], seed: 31 }); set(min, { o: t < T.cuchillos + 0.2 ? 1 : 0, y: wobble(t, 0.6, 4) });
    set(ano, { o: t > T.anio - 0.1 && t < T.cuchillos ? 1 : 0, s: pop(t, T.anio - 0.1, 0.3), r: -3 }); set(pena, { o: t > T.ministro && t < T.cuchillos ? 1 : 0, s: pop(t, T.ministro, 0.3), r: 3 });
  };
});

/* L5-L7 (corte): la señal arriba; «6» → se ilumina el trozo 6 (entre la A-6 y la A-1); «3» → anillos de 100 km y el 3; la N-634 se dibuja por la costa del norte */
plano(L(5) - 0.1, L(8) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c); const M = MAPA6(cam);
  const sen = SENAL(c, 250, 300, 580, '634', 40);
  const an = M.rad.querySelector('.anillos'), an3 = M.rad.querySelector('.an3'), rd = M.rad.querySelector('.n634');
  const norte = chip(c, 380, 1540, 'el norte', { size: 62, bg: COLS[5], color: INK, z: 40 });
  const km = chip(c, 300, 1540, 'más de 300 km', { size: 62, bg: INK, color: YEL, z: 40 });
  const ruta = chip(c, 150, 1540, 'de Galicia al País Vasco', { size: 58, bg: RED, z: 40 });
  sp(T.primera, 'click', 0.5); sp(T.seis3, 'ding', 0.6); sp(T.segunda, 'click', 0.5); sp(T.cien, 'swoosh_up', 0.5); sp(T.tres, 'ding', 0.6); sp(T.efect, 'tada', 0.7);
  return t => {
    const fase3 = t > T.segunda - 0.2, fin = t > T.asi - 0.2;
    deriva(cam, t, L(5) - 0.1, L(8) - 0.1, [520, 1020, 0.98], [400, 820, 1.25]);
    abre(M, 0.35 + 0.05 * Math.sin(t * 1.5), t);
    marcaDig(sen, 0, t > T.primera && !fase3 || fin); marcaDig(sen, 1, fase3); set(sen, { r: -2 + Math.sin(t * 1.4) * 1.5, s: pop(t, L(5) - 0.1, 0.3) });
    solo(M, t > T.seis3 - 0.2 ? [6] : null, t);
    M.nums.forEach((n, i) => set(n, { s: i === 5 && t > T.seis3 - 0.2 ? 1.3 + 0.08 * Math.sin(t * 6) : 1, r: Math.sin(t * 2 + i) * 4 }));
    M.etq.forEach((e, i) => set(e, { s: (i === 0 || i === 5) && t > T.entre - 0.1 && !fase3 ? 1.25 + 0.06 * Math.sin(t * 6) : 1 }));
    if (an) an.style.opacity = f1(p(t, T.cien - 0.3, 0.6)); if (an3) { an3.setAttribute('stroke', t > T.tres - 0.1 ? RED : INK); an3.setAttribute('stroke-width', t > T.tres - 0.1 ? 10 : 5); }
    if (rd) rd.setAttribute('stroke-dashoffset', f1(1 - p(t, T.efect - 0.2, 1.8, E.inOutCubic)));
    set(norte, { o: t > T.norte - 0.1 && !fase3 ? 1 : 0, s: pop(t, T.norte - 0.1, 0.3), r: -3 });
    set(km, { o: t > T.trescientos - 0.1 && t < T.efect - 0.3 ? 1 : 0, s: pop(t, T.trescientos - 0.1, 0.3), r: 3 });
    set(ruta, { o: t > T.galicia - 0.2 ? 1 : 0, s: pop(t, T.galicia - 0.2, 0.3), r: -3 });
  };
});

/* L8 (corte): pruébalo — N-4xx: trozo 4 (entre la A-4 y la A-5); N-3xx: trozo 3 (entre Valencia y Andalucía) */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c); const M = MAPA6(cam);
  const s4 = SENAL(c, 260, 300, 560, '4··', 40), s3 = SENAL(c, 260, 300, 560, '3··', 40);
  const prueba = chip(c, 230, 1540, 'pruébalo en la carretera', { size: 58, bg: INK, color: '#fff', z: 40 });
  sp(T.c400, 'ding', 0.6); sp(T.c300, 'ding', 0.6);
  return t => {
    const f3 = t > T.c300 - 0.2, f4 = t > T.c400 - 0.2 && !f3;
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [520, 1060, 1.0], [560, 1120, 1.12]);
    abre(M, 0.4 + 0.08 * Math.sin(t * 1.6), t);
    solo(M, f3 ? [3] : f4 ? [4] : null, t);
    M.nums.forEach((n, i) => set(n, { s: (f4 && i === 3) || (f3 && i === 2) ? 1.3 + 0.08 * Math.sin(t * 6) : 1, r: Math.sin(t * 2 + i) * 4 }));
    M.etq.forEach((e, i) => set(e, { s: (f4 && (i === 3 || i === 4)) || (f3 && (i === 2 || i === 3)) ? 1.25 + 0.06 * Math.sin(t * 6) : 1 }));
    set(s4, { o: f4 ? 1 : 0, s: pop(t, T.c400 - 0.2, 0.3), r: -2 + Math.sin(t * 1.4) * 1.5 }); marcaDig(s4, 0, true);
    set(s3, { o: f3 ? 1 : 0, s: pop(t, T.c300 - 0.2, 0.3), r: 2 + Math.sin(t * 1.4) * 1.5 }); marcaDig(s3, 0, true);
    set(prueba, { o: t > T.prueba - 0.1 && t < T.c400 - 0.2 ? 1 : 0, s: pop(t, T.prueba - 0.1, 0.3), r: -3 });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué carretera pasa', 'por tu pueblo?', { size: 88, draw: c => [['la N-…', YEL], ['ni idea, voy a mirar', PINK], ['¡la mía cuadra!', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 250 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(113, 'Los 6 trozos', ['CARRETERAS', 'parte 2']);

Story.run({
  textura: true,
  ovalo: [[T.c300 + 0.6, L(9) - 0.15]],
  vecino: { risa: [], sorpresa: [[T.efect, T.efect + 1]], golpes: [] },
});
