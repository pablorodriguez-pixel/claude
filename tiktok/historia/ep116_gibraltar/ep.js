/* Ep. 116 · «Aquí, para cruzar la calle, esperas a que pase un avión» (Gibraltar). La avenida Winston Churchill, única carretera entre Gibraltar y España,
   la cruza la pista del aeropuerto; cuando hay vuelo se cierran barreras. El istmo es el único terreno llano; la pista se empezó en 1938 y se alargó en la
   II Guerra Mundial ganando terreno al mar (≈ un tercio sobre el agua). España sostiene que el istmo no se cedió en Utrecht (1713). Desde el 31-III-2023
   los coches van por un túnel; peatones y bicis siguen cruzando la pista.
   ESTRATEGIA §8-11: imagen-idea en el fotograma 0 (un avión pasando por encima de un paso de cebra), todo en movimiento, zonas seguras de TikTok. */
Story.prepara();
const T = {
  cruzar: Q('cruzar la calle'), avion0: Q('pase un avión'), espana0: Q('un paso de españa'), gib: Q('en gibraltar'),
  unica: Q('la única carretera'), avenida: Q('la avenida'), mitad: Q('a mitad de camino'), pista: Q('la pista del aeropuerto'),
  llega: Q('cuando llega'), alarma: Q('suena la alarma'), barreras: Q('bajan las barreras'), espera: Q('todo el mundo espera'), nivel: Q('paso a nivel'),
  porque: Q('por qué poner'), roca: Q('casi todo roca'), llano: Q('el único trozo llano'), franja: Q('la franja de arena'),
  anio: Q('mil novecientos treinta y ocho'), empiezan: Q('empiezan a hacer'), guerra: Q('segunda guerra mundial'), mar: Q('al mar'),
  tercio: Q('casi un tercio'), agua: Q('sobre el agua'),
  polemico: Q('lo polémico'), tratado: Q('el tratado'), espdice: Q('españa dice'), cedio: Q('nunca cedió'),
  tunel: Q('un túnel'), peatones: Q('los peatones'), andando: Q('cruzando la pista andando'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const CIELO = 'linear-gradient(#7fbfe8, #d8eef8)', ASF = '#55525c', ROCA = '#a89a86', ARENA = '#e9d6a6', AGUA = '#4a8fc8', C_ES = '#f2c230';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* avión de lado (morro a la derecha) */
const AVION = (c, w, z = 10) => box(c, 0, 0, w, w * 0.36, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 500 180" width="${w}" height="${f1(w * 0.36)}"><path d="M30,60 L70,10 L110,10 L120,70Z" fill="#c8102e" stroke="${INK}" stroke-width="7"/><path d="M20,80 Q20,62 60,62 L420,62 Q480,66 490,90 Q480,114 420,116 L60,116 Q20,116 20,98Z" fill="#fbfbf6" stroke="${INK}" stroke-width="8"/>
  ${[...Array(9)].map((_, i) => `<circle cx="${150 + i * 28}" cy="82" r="7" fill="#7cc4ea" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M440,72 Q470,74 476,88 L440,88Z" fill="#7cc4ea" stroke="${INK}" stroke-width="4"/>
  <path d="M200,100 L300,100 L240,170 L200,170Z" fill="#d9d4c9" stroke="${INK}" stroke-width="6"/><rect x="250" y="110" width="40" height="22" rx="10" fill="#9a948a" stroke="${INK}" stroke-width="5"/></svg>`);
/* barrera roja y blanca que gira en su base */
const BARRERA = (c, x, y, w, z = 8) => { const b = box(c, x, y, w, 30, { zIndex: z, transformOrigin: '0 50%', background: `repeating-linear-gradient(90deg, ${RED} 0 50px, #fff 50px 100px)`, border: `5px solid ${INK}`, borderRadius: '10px' }); box(c, x - 20, y - 20, 44, 120, { zIndex: z, background: '#3d3a44', border: `5px solid ${INK}`, borderRadius: '10px' }); return b; };
const SEMAFORO = (c, x, y, z = 8) => box(c, x, y, 70, 160, { zIndex: z, background: '#1d1a22', border: `6px solid ${INK}`, borderRadius: '14px' }, `<div class="l1" style="position:absolute;left:12px;top:12px;width:34px;height:34px;border-radius:50%;background:#5a1010"></div><div class="l2" style="position:absolute;left:12px;top:90px;width:34px;height:34px;border-radius:50%;background:#5a1010"></div>`);
const parpadea = (s, t, on) => { const a = s.querySelector('.l1'), b = s.querySelector('.l2'); const k = Math.floor(t * 3) % 2; if (a) a.style.background = on && k ? '#ff2a2a' : '#5a1010'; if (b) b.style.background = on && !k ? '#ff2a2a' : '#5a1010'; };

/* PORTADA + L0-L1: a pie de calle: un paso de cebra con gente esperando, semáforo rojo parpadeando, y un avión enorme pasando por encima; al fondo, el Peñón */
plano(-1, L(2) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: CIELO });
  const penon = box(cam, -200, 520, 1500, 700, { zIndex: 1 }, `<svg viewBox="0 0 1500 700" width="1500" height="700"><path d="M0,700 L180,520 L420,200 L620,60 L760,40 L900,160 L1100,420 L1500,700Z" fill="${ROCA}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M420,200 L520,360 L620,300 L760,40" fill="none" stroke="rgba(43,33,24,.25)" stroke-width="8"/></svg>`);
  box(cam, -800, 1160, 2680, 1600, { zIndex: 2, background: ASF, borderTop: `10px solid ${INK}` });
  const cebra = box(cam, 140, 1240, 800, 360, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 70px, transparent 70px 130px)' });
  const gente = [[-40, 860, '#f2c230'], [140, 900, '#e8507a'], [760, 880, '#2b8ad6'], [930, 910, '#2e9e6b']].map(([x, y, col], i) => PERS(cam, x, y, 240, { ropa: col, pelo: i % 2 ? 'largo' : 'corto', pcol: '#3a2a1e', z: 6 }));
  const sem = SEMAFORO(cam, 920, 980, 7);
  const av = AVION(cam, 1100, 9);
  const t1 = texto(c, 285, 'AQUÍ ESPERAS A QUE', { size: 78, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 380, `PASE UN ${hlSpan('AVIÓN', 'phl', YEL)}`, { size: 112, color: '#fff', z: 40, shadow: OUT });
  const gch = chip(c, 330, 1475, 'Gibraltar', { size: 70, bg: RED, z: 41 });
  sfx('whoosh', 0.1, 0.6); sp(T.avion0, 'swoosh_up', 0.6); sp(T.gib, 'ding', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 0.98], [540, 1000, 1.08]);
    // el avión cruza en bucle de izquierda a derecha, bajando un poco (aterrizando)
    const k = ((t + 0.9) % 3.2) / 3.2; set(av, { x: lerp(-1300, 1300, k), y: lerp(600, 760, k), r: lerp(-4, 2, k) });
    parpadea(sem, t, true);
    gente.forEach((g, i) => { pFace(g, t, { feliz: 0.2, ceja: 10, look: [i < 2 ? 14 : -14, -14], jaw: 0.3, seed: 60 + i }); set(g, { y: wobble(t, 0.6, 3, i) }); });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
    popA(gch, t, T.gib - 0.1, { r: -3 });
  };
}, { sfx: false });

/* L2 (corte): desde arriba: España arriba (amarillo), la franja de arena, la pista de este a oeste y la avenida de norte a sur que la cruza; coches que bajan */
function mapaArriba(cam) {
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: AGUA, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 4px, transparent 4px 40px)' });
  box(cam, -800, -600, 2680, 900, { zIndex: 1, background: C_ES, borderBottom: `10px solid ${INK}` });
  const esp = box(cam, 340, 120, 400, 120, { zIndex: 2, fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', color: 'rgba(43,33,24,.55)', textAlign: 'center' }, 'ESPAÑA');
  box(cam, 200, 300, 680, 900, { zIndex: 1, background: ARENA, borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}` });
  const penon = box(cam, 120, 1150, 840, 1100, { zIndex: 2, background: ROCA, border: `10px solid ${INK}`, borderRadius: '40% 40% 48% 52% / 20% 20% 70% 70%' }, `<div style="position:absolute;left:0;right:0;top:120px;text-align:center;font-family:Playfair;font-weight:900;font-size:80px;color:rgba(43,33,24,.55)">GIBRALTAR</div>`);
  const pista = box(cam, -300, 640, 1500, 170, { zIndex: 3, background: '#3d3a44', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` }, `<div style="position:absolute;left:0;right:0;top:72px;height:10px;background:repeating-linear-gradient(90deg, #fff 0 70px, transparent 70px 130px)"></div>`);
  const calle = box(cam, 470, 300, 140, 900, { zIndex: 2, background: ASF, borderLeft: `6px solid ${INK}`, borderRight: `6px solid ${INK}` }, `<div style="position:absolute;left:64px;top:0;bottom:0;width:10px;background:repeating-linear-gradient(#f2c230 0 40px, transparent 40px 80px)"></div>`);
  const cruce = box(cam, 470, 640, 140, 170, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(0deg, #fff 0 18px, transparent 18px 34px)', opacity: 0.85 });
  const coches = [0, 1, 2].map(i => box(cam, 0, 0, 50, 80, { zIndex: 5, background: ['#e8507a', '#2b8ad6', '#fbfbf6'][i], border: `5px solid ${INK}`, borderRadius: '12px' }));
  return { pista, calle, cruce, coches, penon };
}
plano(L(2) - 0.1, L(3) - 0.1, { background: AGUA }, c => {
  const cam = CAM(c); const M = mapaArriba(cam);
  const av = box(cam, 0, 0, 1, 1); // marcador
  const nom = chip(cam, 640, 420, 'Av. Winston Churchill', { size: 44, bg: INK, color: '#fff', z: 6 });
  const unica = chip(c, 200, 1475, 'la única carretera a España', { size: 58, bg: '#1f4fa0', z: 40 });
  const pis = chip(c, 300, 1475, '¡la cruza la pista!', { size: 64, bg: RED, z: 41 });
  sp(T.unica, 'pop', 0.4); sp(T.pista, 'stamp', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 520, 0.85], [540, 720, 1.15]);
    M.coches.forEach((k, i) => { const kk = ((t * 0.35) + i * 0.33) % 1; set(k, { x: 515, y: lerp(260, 1180, kk) }); });
    set(nom, { o: t > T.avenida - 0.1 ? 1 : 0, s: pop(t, T.avenida - 0.1, 0.3), r: -3 });
    set(unica, { o: t > T.unica - 0.1 && t < T.mitad ? 1 : 0, s: pop(t, T.unica - 0.1, 0.3), r: -3 });
    set(pis, { o: t > T.pista - 0.1 ? 1 : 0, s: pop(t, T.pista - 0.1, 0.3), r: -4 });
    M.pista.style.boxShadow = t > T.pista - 0.1 ? `0 0 0 ${f1(10 + 8 * Math.sin(t * 8))}px rgba(255,230,0,.6)` : 'none';
  };
});

/* L3 (corte): el cruce de cerca: suena la alarma (luces rojas), bajan las dos barreras, los coches se paran… y pasa el avión por encima */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: CIELO });
  box(cam, -800, 1000, 2680, 1600, { zIndex: 1, background: '#3d3a44', borderTop: `10px solid ${INK}` });
  box(cam, -800, 1180, 2680, 14, { zIndex: 2, background: 'repeating-linear-gradient(90deg, #fff 0 90px, transparent 90px 170px)' });
  const b1 = BARRERA(cam, 100, 1300, 380, 6), b2 = BARRERA(cam, 980, 1300, 380, 6);
  const s1 = SEMAFORO(cam, 30, 1080, 7), s2 = SEMAFORO(cam, 980, 1080, 7);
  const cola = [0, 1].map(i => box(cam, 0, 0, 260, 150, { zIndex: 5, background: ['#e8507a', '#2b8ad6'][i], border: `7px solid ${INK}`, borderRadius: '30px 30px 14px 14px' }, `<div style="position:absolute;left:40px;top:20px;width:170px;height:50px;background:#9fc6dc;border:5px solid ${INK};border-radius:10px"></div>`));
  const av = AVION(cam, 1300, 9);
  const nivel = chip(c, 200, 1475, 'como un paso a nivel… de aviones', { size: 52, bg: INK, color: YEL, z: 40 });
  sp(T.alarma, 'bell', 0.6); sp(T.barreras, 'click', 0.5); sp(T.espera - 0.2, 'whoosh', 0.9);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [540, 1100, 0.9], [540, 1060, 1.0]);
    const on = t > T.alarma - 0.1; parpadea(s1, t, on); parpadea(s2, t, on);
    const kb = p(t, T.barreras - 0.1, 0.7, E.outCubic); set(b1, { r: lerp(-85, 0, kb) }); set(b2, { r: lerp(-95, -180, kb) });
    cola.forEach((k, i) => { const kc = p(t, T.llega - 0.3, T.barreras - T.llega + 0.8, E.outCubic); set(k, { x: lerp(-400 - i * 320, 60 - i * 300, kc) + (i ? 0 : 0), y: 1220 - (i ? 0 : 0), s: 1 }); });
    const ka = p(t, T.espera - 0.4, 2.2, E.linear); set(av, { o: t > T.espera - 0.4 && ka < 1 ? 1 : 0, x: lerp(-1500, 1400, ka), y: lerp(560, 760, ka) });
    set(nivel, { o: t > T.nivel - 0.2 ? 1 : 0, s: pop(t, T.nivel - 0.2, 0.3), r: -3 });
  };
});

/* L4 (corte): de lado: el Peñón enorme, todo roca y acantilado; la franja de arena plana que lo une con España, con una flecha «el único sitio llano» */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: CIELO });
  box(cam, -800, 1150, 2680, 1500, { zIndex: 1, background: AGUA, borderTop: `8px solid ${INK}` });
  const penon = box(cam, 300, 240, 1100, 940, { zIndex: 3 }, `<svg viewBox="0 0 1100 940" width="1100" height="940"><path d="M0,940 L60,700 L200,420 L360,140 L480,40 L560,30 L700,240 L900,560 L1100,940Z" fill="${ROCA}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M200,420 L300,500 L360,420 L480,40" fill="none" stroke="rgba(43,33,24,.25)" stroke-width="8"/></svg>`);
  const istmo = box(cam, -500, 1110, 860, 60, { zIndex: 2, background: ARENA, border: `8px solid ${INK}`, borderRadius: '14px' });
  const esp = box(cam, -800, 900, 340, 280, { zIndex: 2, background: C_ES, border: `8px solid ${INK}` }, `<div style="position:absolute;left:0;right:0;top:90px;text-align:center;font-family:Bricolage;font-weight:800;font-size:56px;color:${INK}">España</div>`);
  const roca = chip(c, 560, 330, 'todo roca', { size: 64, bg: '#7a6a56', z: 40 });
  const llano = chip(c, 70, 1475, 'el único sitio llano', { size: 60, bg: '#2e9e6b', z: 40 });
  const flecha = box(cam, 0, 960, 120, 140, { zIndex: 4 }, `<svg viewBox="0 0 120 140" width="120" height="140"><path d="M40,0 L80,0 L80,80 L115,80 L60,138 L5,80 L40,80Z" fill="#2e9e6b" stroke="${INK}" stroke-width="6"/></svg>`);
  sp(T.roca, 'thud', 0.6); sp(T.llano, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(5) - 0.1, [700, 760, 0.85], [300, 980, 1.0]);
    set(roca, { o: t > T.roca - 0.1 ? 1 : 0, s: pop(t, T.roca - 0.1, 0.3), r: 3 });
    set(llano, { o: t > T.llano - 0.1 ? 1 : 0, s: pop(t, T.llano - 0.1, 0.3), r: -3 });
    set(flecha, { o: t > T.llano - 0.1 ? 1 : 0, y: Math.sin(t * 5) * 14 });
    istmo.style.boxShadow = t > T.franja - 0.1 ? `0 0 0 ${f1(8 + 6 * Math.sin(t * 7))}px rgba(255,230,0,.7)` : 'none';
  };
});

/* L5-L6 (corte): 1938, la pista en el mapa desde arriba; camiones echan tierra al mar por el oeste y la pista crece sobre el agua; «un tercio sobre el mar» */
plano(L(5) - 0.1, L(7) - 0.1, { background: AGUA }, c => {
  const cam = CAM(c); const M = mapaArriba(cam);
  const ext = box(cam, -660, 640, 360, 170, { zIndex: 3, background: '#3d3a44', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}`, borderLeft: `8px solid ${INK}`, transformOrigin: '100% 50%' });
  const tierra = box(cam, -700, 600, 440, 250, { zIndex: 2, background: ARENA, borderRadius: '40%', transformOrigin: '100% 50%' });
  const camion = box(cam, 0, 0, 160, 90, { zIndex: 6 }, `<svg viewBox="0 0 160 90" width="160" height="90"><rect x="0" y="10" width="100" height="50" fill="#f2c230" stroke="${INK}" stroke-width="6"/><rect x="100" y="24" width="50" height="36" fill="#e8507a" stroke="${INK}" stroke-width="6"/><circle cx="30" cy="70" r="14" fill="${INK}"/><circle cx="120" cy="70" r="14" fill="${INK}"/></svg>`);
  const ano = chip(c, 380, 285, '1938', { size: 80, bg: INK, color: YEL, z: 40 });
  const ww = chip(c, 180, 285, 'II Guerra Mundial: más larga', { size: 56, bg: '#5e5a52', z: 40 });
  const tercio = box(cam, -660, 840, 640, 90, { zIndex: 6, borderTop: `8px solid ${YEL}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', color: '#fff', textAlign: 'center', paddingTop: '6px', textShadow: `3px 3px 0 ${INK}` }, '≈ 1/3 sobre el mar');
  sp(T.anio, 'stamp', 0.5); sp(T.guerra, 'thud', 0.5); sp(T.mar, 'squish', 0.6); sp(T.tercio, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(7) - 0.1, [440, 720, 0.95], [-40, 760, 0.82]);
    M.coches.forEach((k, i) => { const kk = ((t * 0.35) + i * 0.33) % 1; set(k, { x: 515, y: lerp(260, 1180, kk) }); });
    const ke = p(t, T.guerra, T.mar - T.guerra + 1.2, E.inOutCubic);
    set(ext, { sx: Math.max(0.02, ke), o: ke > 0 ? 1 : 0 }); set(tierra, { sx: Math.max(0.02, ke), o: ke > 0 ? 0.9 : 0 });
    const kc = ((t - T.guerra) * 0.6) % 1; set(camion, { o: t > T.guerra && ke < 1 ? 1 : 0, x: lerp(-20, -300 - 360 * ke, kc), y: 690 });
    set(ano, { o: t > T.anio - 0.1 && t < T.guerra - 0.2 ? 1 : 0, s: pop(t, T.anio - 0.1, 0.3), r: -3 });
    set(ww, { o: t > T.guerra - 0.1 && t < T.tercio - 0.3 ? 1 : 0, s: pop(t, T.guerra - 0.1, 0.3), r: -3 });
    set(tercio, { o: t > T.tercio - 0.1 ? 1 : 0, s: pop(t, T.tercio - 0.1, 0.35) });
  };
});

/* L7 (corte): el tratado de 1713: el Peñón «cedido», la franja de arena con un interrogante; «España: no cedida» */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.06) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.06) 2px, transparent 2px)', backgroundSize: '80px 80px' });
  const per = box(cam, 110, 360, 860, 1080, { zIndex: 2, background: '#f4e4c0', border: `10px solid ${INK}`, borderRadius: '14px', boxShadow: `14px 14px 0 ${INK}`, padding: '40px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, transformOrigin: '50% 50%' },
    `<div style="font-family:Bricolage;font-weight:800;font-size:46px;text-align:center">TRATADO DE UTRECHT</div><div style="font-size:96px;font-weight:900;text-align:center">1713</div>
     <svg viewBox="0 0 780 700" width="760" height="680"><rect x="0" y="0" width="780" height="200" fill="${C_ES}" stroke="${INK}" stroke-width="6"/><rect class="ist" x="300" y="200" width="180" height="160" fill="${ARENA}" stroke="${INK}" stroke-width="6" stroke-dasharray="16 10"/><path d="M220,700 L250,520 L330,380 L450,380 L540,520 L560,700Z" fill="${ROCA}" stroke="${INK}" stroke-width="6"/>
     <text x="390" y="620" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">cedido</text><text class="qq" x="390" y="305" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="90" fill="${RED}">?</text><text x="390" y="120" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="60" fill="rgba(43,33,24,.5)">ESPAÑA</text></svg>`);
  const pol = chip(c, 320, 285, '¡polémica!', { size: 70, bg: RED, z: 40 });
  const es = chip(c, 150, 1475, 'España: esa franja no se cedió', { size: 54, bg: INK, color: YEL, z: 40 });
  const uk = chip(c, 210, 1475, 'Reino Unido opina lo contrario', { size: 50, bg: '#1f4fa0', z: 40 });
  sp(T.polemico, 'boing', 0.5); sp(T.tratado, 'paper', 0.6); sp(T.cedio, 'stamp', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(8) - 0.1, [540, 900, 0.95], [540, 1000, 1.1]);
    set(per, { r: -2 + Math.sin(t * 1.1) * 1 });
    const q = per.querySelector('.qq'); if (q) q.setAttribute('font-size', f1(90 + 14 * Math.sin(t * 6)));
    const ist = per.querySelector('.ist'); if (ist) ist.setAttribute('stroke-dashoffset', f1(-t * 40));
    set(pol, { o: t > T.polemico - 0.1 && t < T.tratado + 0.6 ? 1 : 0, s: pop(t, T.polemico - 0.1, 0.3), r: -4 });
    set(es, { o: t > T.espdice - 0.1 && t < T.cedio + 0.7 ? 1 : 0, s: pop(t, T.espdice - 0.1, 0.3), r: -3 });
    set(uk, { o: t > T.cedio + 0.7 ? 1 : 0, s: pop(t, T.cedio + 0.7, 0.3), r: 3 });
  };
});

/* L8 (corte): 2023: los coches bajan por la rampa del túnel; arriba, peatones y bicis cruzan la pista andando, con un avión esperando al fondo */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: CIELO });
  const penon = box(cam, 300, 340, 1100, 700, { zIndex: 1 }, `<svg viewBox="0 0 1100 700" width="1100" height="700"><path d="M0,700 L200,380 L420,120 L560,60 L760,260 L1100,700Z" fill="${ROCA}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`);
  box(cam, -800, 1000, 2680, 1600, { zIndex: 2, background: '#3d3a44', borderTop: `10px solid ${INK}` });
  box(cam, -800, 1120, 2680, 14, { zIndex: 3, background: 'repeating-linear-gradient(90deg, #fff 0 90px, transparent 90px 170px)' });
  const avion = AVION(cam, 520, 4); set(avion, { x: 820, y: 860 });
  const tunel = box(cam, -200, 1240, 520, 260, { zIndex: 3, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '260px 260px 0 0' }, `<div style="position:absolute;left:0;right:0;top:-70px;text-align:center;font-family:Bricolage;font-weight:800;font-size:44px;color:#fff;text-shadow:3px 3px 0 ${INK}">TÚNEL</div>`);
  const coche = box(cam, 0, 0, 200, 110, { zIndex: 4, background: '#e8507a', border: `7px solid ${INK}`, borderRadius: '30px 30px 12px 12px' });
  const andan = [[0, '#f2c230'], [1, '#2e9e6b'], [2, '#2b8ad6']].map(([i, col]) => PERS(cam, 0, 0, 200, { ropa: col, pelo: i % 2 ? 'largo' : 'corto', pcol: '#3a2a1e', z: 6, piernas: true }));
  const bici = box(cam, 0, 0, 200, 120, { zIndex: 6 }, `<svg viewBox="0 0 200 120" width="200" height="120"><circle cx="40" cy="80" r="34" fill="none" stroke="${INK}" stroke-width="8"/><circle cx="160" cy="80" r="34" fill="none" stroke="${INK}" stroke-width="8"/><path d="M40,80 L90,30 L150,30 L160,80 M90,30 L110,80 L40,80" stroke="${RED}" stroke-width="8" fill="none"/></svg>`);
  const ano = chip(c, 380, 285, '2023', { size: 80, bg: INK, color: YEL, z: 40 });
  const and = chip(c, 140, 1475, 'peatones y bicis: ¡por la pista!', { size: 54, bg: RED, z: 40 });
  sp(T.tunel, 'whoosh', 0.5); sp(T.peatones, 'pop', 0.5); sp(T.andando, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [440, 1060, 0.95], [580, 1100, 1.05]);
    const kc = ((t - L(8)) * 0.4) % 1; set(coche, { x: lerp(900, 0, kc), y: lerp(1140, 1320, kc), s: lerp(1, 0.6, kc), o: t > T.tunel - 0.3 ? 1 - kc * 0.5 : 0 });
    andan.forEach((g, i) => { const kk = ((t - T.peatones) * 0.18 + i * 0.3) % 1; set(g, { o: t > T.peatones - 0.2 ? 1 : 0, x: lerp(-200, 1100, kk), y: 870 + Math.abs(Math.sin(t * 6 + i)) * -8 }); pFace(g, t, { feliz: 0.8, look: [14, 0], seed: 70 + i }); });
    const kb = ((t - T.peatones) * 0.3 + 0.5) % 1; set(bici, { o: t > T.peatones ? 1 : 0, x: lerp(1100, -200, kb), y: 1000 });
    set(avion, { y: 860 + Math.sin(t * 2) * 3 });
    set(ano, { o: t > T.tunel - 0.8 ? 1 : 0, s: pop(t, L(8), 0.3), r: -3 });
    set(and, { o: t > T.andando - 0.2 ? 1 : 0, s: pop(t, T.andando - 0.2, 0.3), r: -3 });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Cruzarías andando', 'una pista de aterrizaje?', { size: 84, draw: c => [['¡ya lo he hecho!', YEL], ['ni loco', PINK], ['solo si no hay vuelos', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(116, 'Gibraltar', ['FRONTERAS', 'raras']);

Story.run({
  textura: true,
  ovalo: [[T.andando + 0.2, L(9) - 0.15]],
  vecino: { risa: [], sorpresa: [[T.pista, T.pista + 1], [T.andando, T.andando + 1]], golpes: [] },
});
