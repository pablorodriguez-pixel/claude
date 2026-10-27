/* Ep. 114 · «Las parabólicas son una brújula». En España casi todas apuntan hacia el sur (la mayoría, sur-sureste: Astra 19,2° E), a satélites geoestacionarios
   sobre el ecuador a ~36.000 km, que giran al ritmo de la Tierra y se ven quietos. La idea la publicó Arthur C. Clarke en 1945 («Extra-Terrestrial Relays»,
   Wireless World); el primer geoestacionario, en 1964; la órbita se llama «órbita Clarke». Bonus: casi todas las iglesias románicas tienen el ábside al este.
   ESTRATEGIA §8-10: imagen-idea en el fotograma 0 (todas las antenas girando a la vez como girasoles), todo en movimiento, la imagen enseña lo que dice la voz. */
Story.prepara();
const T = {
  pierdes: Q('te pierdes'), tejados: Q('los tejados'), parab: Q('las parabólicas'), sur0: Q('está el sur'), fijado: Q('ha fijado'),
  proxima: Q('la próxima vez'), espana: Q('de españa'), mismo: Q('el mismo lado'), haciasur: Q('hacia el sur'),
  porque: Q('por qué'), satelites: Q('unos satélites'), ecuador: Q('del ecuador'), km: Q('treinta y seis mil'),
  vuelta: Q('dan la vuelta'), ritmo: Q('mismo ritmo'), quietos: Q('quietos en el cielo'),
  coloca: Q('se coloca'), siempre: Q('para siempre'),
  mejor: Q('lo mejor'), anio: Q('mil novecientos cuarenta y cinco'), joven: Q('un joven'), publico: Q('publicó'), ficcion: Q('ciencia ficción'),
  pones: Q('si pones'), quieto: Q('se queda quieto'), veinte: Q('casi veinte'), alli: Q('uno allí'),
  nombre: Q('su nombre'), orbita: Q('la órbita clarke'), chaval: Q('aquel chaval'), arthur: Q('arthur'), odisea: Q('una odisea'),
  iglesia: Q('una iglesia'), romanicas: Q('las románicas'), este: Q('al este'), sol: Q('sale el sol'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const NOCHE = '#141a2e', OCASO = 'linear-gradient(#1d2547 0%, #4a3a6b 45%, #f08a3c 85%, #f7b267 100%)', ESPACIO = '#0b0e1a';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* parabólica de lado: mástil fijo y «cabeza» (plato + brazo + LNB) que gira; ang 0 = mira a la derecha (el sur), un poco hacia arriba */
function PARAB(c, x, y, w, z = 6) {
  const b = box(c, x, y, w, w * 1.3, { zIndex: z });
  box(b, w * 0.46, w * 0.55, w * 0.08, w * 0.75, { background: '#5e5a52', border: `${f1(w * 0.025)}px solid ${INK}`, boxSizing: 'border-box' });
  const cab = box(b, 0, 0, w, w, { transformOrigin: '50% 60%' }, `<svg viewBox="0 0 100 100" width="${w}" height="${w}"><path d="M44,60 L50,60" stroke="${INK}" stroke-width="6"/><ellipse cx="34" cy="50" rx="20" ry="40" fill="#f4f1ea" stroke="${INK}" stroke-width="6"/><ellipse cx="37" cy="50" rx="12" ry="29" fill="#d9d4c9"/><path d="M40,56 L84,40" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><rect x="80" y="32" width="15" height="15" rx="3" fill="#3d3a44" stroke="${INK}" stroke-width="4" transform="rotate(-20 87 40)"/></svg>`);
  b.cab = cab; return b;
}
const SOL_SVG = r => `<svg viewBox="0 0 ${r * 2} ${r * 2}" width="${r * 2}" height="${r * 2}"><circle cx="${r}" cy="${r}" r="${r * 0.9}" fill="#ffcf4a" stroke="${INK}" stroke-width="8"/></svg>`;
/* tejados de una ciudad al atardecer, con N parabólicas; devuelve las antenas y una función para moverlas */
function tejados(cam, n = 9) {
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: OCASO });
  const estrellas = box(cam, -800, -600, 2680, 1200, { zIndex: 0, backgroundImage: 'radial-gradient(#fff 1.5px, transparent 2px)', backgroundSize: '90px 110px', opacity: 0.35 });
  const edif = [[-300, 1050, 420, '#3d3a52'], [120, 980, 320, '#4a4560'], [440, 1100, 360, '#3a3650'], [800, 1000, 380, '#45405a'], [1180, 1080, 400, '#3d3a52']].map(([x, y, w, col]) => box(cam, x, y, w, 1600, { zIndex: 2, background: col, borderTop: `10px solid ${INK}`, backgroundImage: 'linear-gradient(rgba(255,233,166,.85) 0 0)', backgroundSize: '40px 56px', backgroundRepeat: 'repeat' }, `<div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg, ${col} 0 30px, transparent 30px 70px), repeating-linear-gradient(${col} 0 40px, transparent 40px 96px);opacity:.9"></div>`));
  const pos = [[-240, 1050], [-60, 1050], [150, 980], [300, 980], [480, 1100], [640, 1100], [840, 1000], [1000, 1000], [1240, 1080]].slice(0, n);
  const ants = pos.map(([x, y], i) => { const w = 150 - (i % 3) * 18; return PARAB(cam, x, y - w * 1.3 + 8, w, 5); });
  return { ants, estrellas };
}
/* ángulo de la cabeza: desordenadas al principio; k = 0..1 las va alineando hacia el sur (derecha, 20° arriba) */
const alinea = (ants, k, t) => ants.forEach((a, i) => { const desorden = [150, -120, 70, 200, -60, 110, -160, 40, 180][i % 9]; set(a.cab, { r: lerp(desorden + Math.sin(t * 1.3 + i) * 25, -20 + Math.sin(t * 1.1 + i) * 2, k) }); });

/* PORTADA + L0-L1: los tejados al atardecer; las parabólicas, desordenadas, giran a la vez hasta mirar todas al mismo sitio (como girasoles); aparece «SUR» */
plano(-1, L(2) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c); const { ants } = tejados(cam, 0);
  const grandes = [[40, 1150], [300, 1110], [560, 1170], [820, 1120]].map(([x, y], i) => PARAB(cam, x, y - 270 * 1.3 + 10, 250 - (i % 2) * 30, 5));
  box(cam, -800, 1150, 2680, 60, { zIndex: 4, background: '#2a2640', borderTop: `10px solid ${INK}` });
  const flecha = box(cam, 640, 560, 360, 120, { zIndex: 8, transformOrigin: '0 50%' }, `<svg viewBox="0 0 360 120" width="360" height="120"><rect x="0" y="40" width="250" height="40" rx="10" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M240,10 L350,60 L240,110Z" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`);
  const sur = box(cam, 640, 440, 360, 120, { zIndex: 8, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '110px', color: '#fff', textAlign: 'center', textShadow: OUT }, 'SUR');
  const t1 = texto(c, 140, 'LAS PARABÓLICAS', { size: 96, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 255, `SON UNA <span style="color:${YEL}">BRÚJULA</span>`, { size: 96, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.35); sp(T.tejados, 'click', 0.5); sp(T.sur0, 'ding', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 900, 1.0], [560, 880, 1.08]);
    // a los 0,3 s empiezan a girar y a los ~2 s ya miran todas igual (en el fotograma 0 ya se mueven)
    alinea(grandes, p(t, 0.3, 1.8, E.inOutCubic), t);
    const ks = p(t, T.sur0 - 0.3, 0.5, E.outBack); set(flecha, { o: t > T.sur0 - 0.3 ? 1 : 0, s: ks, x: Math.sin(t * 4) * 12 }); set(sur, { o: t > T.sur0 - 0.3 ? 1 : 0, s: ks, r: -4 });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
  };
}, { sfx: false });

/* L2 (corte): una calle de España a pie de calle; brújula en el suelo; las antenas de todos los balcones miran a la vez hacia el sur */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#7fbfe8, #d8eef8)' });
  const fach = [[-400, 300, 520, '#e9c79a'], [140, 200, 460, '#d9a77a'], [620, 260, 520, '#efd9b4'], [1160, 220, 480, '#d9b48a']].map(([x, y, w, col]) => box(cam, x, y, w, 1500, { zIndex: 1, background: col, borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}`, borderTop: `10px solid ${INK}` }, `<div style="position:absolute;inset:40px 30px;background:repeating-linear-gradient(90deg, transparent 0 40px, rgba(43,33,24,.0) 40px 50px);"></div>${[0, 1, 2, 3].map(r => [0, 1].map(k => `<div style="position:absolute;left:${60 + k * (w / 2 - 20)}px;top:${80 + r * 260}px;width:${w / 2 - 110}px;height:150px;background:#5b7da0;border:7px solid ${INK};border-radius:8px"></div><div style="position:absolute;left:${40 + k * (w / 2 - 20)}px;top:${236 + r * 260}px;width:${w / 2 - 70}px;height:16px;background:${INK}"></div>`).join('')).join('')}`));
  const ants = [[-280, 360], [10, 620], [260, 300], [380, 820], [720, 360], [900, 600], [1240, 330], [-120, 860]].map(([x, y], i) => PARAB(cam, x, y, 120, 5));
  box(cam, -800, 1700, 2680, 1200, { zIndex: 2, background: '#9a948a', borderTop: `10px solid ${INK}` });
  const brujula = box(cam, 340, 1730, 400, 240, { zIndex: 4, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 400 240" width="400" height="240"><ellipse cx="200" cy="120" rx="190" ry="110" fill="#fbf6ea" stroke="${INK}" stroke-width="8"/><path d="M200,30 L220,120 L200,210 L180,120Z" fill="#e3ddd0" stroke="${INK}" stroke-width="5"/><path d="M30,120 L200,100 L370,120 L200,140Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><text x="380" y="100" font-family="Bricolage" font-weight="800" font-size="40" fill="${RED}" text-anchor="end">S</text></svg>`);
  const mismo = chip(c, 220, 330, 'todas, al mismo lado', { size: 60, bg: INK, color: YEL, z: 40 });
  const sur = chip(c, 380, 450, 'al SUR', { size: 70, bg: RED, z: 40 });
  sp(T.mismo, 'pop', 0.5); sp(T.haciasur, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 1000, 0.72], [540, 1180, 0.8]);
    ants.forEach((a, i) => set(a.cab, { r: -20 + Math.sin(t * 1.2 + i) * 3 }));
    set(brujula, { r: Math.sin(t * 2) * 3 });
    set(mismo, { o: t > T.mismo - 0.1 ? 1 : 0, s: pop(t, T.mismo - 0.1, 0.3), r: -3 }); set(sur, { o: t > T.haciasur - 0.1 ? 1 : 0, s: pop(t, T.haciasur - 0.1, 0.3), r: 4 });
  };
});

/* L3-L5 (corte): la Tierra vista desde encima del polo norte: el anillo de la órbita sobre el ecuador; el satélite y España giran juntos (la línea antena-satélite no se rompe);
   un satélite bajo, de los normales, pasa rápido y se escapa. Luego la antena de cerca, fija para siempre */
plano(L(3) - 0.1, L(6) - 0.1, { background: ESPACIO }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: ESPACIO, backgroundImage: 'radial-gradient(#fff 1.4px, transparent 2px), radial-gradient(#9fd3e8 1px, transparent 1.6px)', backgroundSize: '120px 130px, 70px 90px', backgroundPosition: '0 0, 30px 50px' });
  const CX = 540, CY = 1000, RT = 230, RO = 640;
  const anillo = box(cam, CX - RO, CY - RO, RO * 2, RO * 2, { zIndex: 1, borderRadius: '50%', border: '8px dashed rgba(242,194,48,.8)', boxSizing: 'border-box' });
  const tierra = box(cam, CX - RT, CY - RT, RT * 2, RT * 2, { zIndex: 3, borderRadius: '50%', overflow: 'hidden', border: `8px solid ${INK}`, background: '#2b6fb0', transformOrigin: '50% 50%' }, `<svg viewBox="0 0 460 460" width="460" height="460"><path d="M150,40 Q260,10 320,70 Q300,140 230,150 Q170,120 150,40Z M60,200 Q120,170 170,230 Q150,300 90,300 Q50,260 60,200Z M300,240 Q380,220 410,300 Q360,380 300,350 Q270,300 300,240Z M180,330 Q240,320 250,390 Q200,430 170,400Z" fill="#6fae5a" stroke="${INK}" stroke-width="5"/></svg>`);
  const polo = box(cam, CX - 20, CY - 20, 40, 40, { zIndex: 4, borderRadius: '50%', background: '#fff', border: `5px solid ${INK}` });
  // España (punto rojo) en la Tierra, a medio radio; el satélite en el anillo, en la misma dirección → línea entre los dos
  const esp = box(cam, 0, 0, 40, 40, { zIndex: 5, borderRadius: '50%', background: RED, border: `5px solid ${INK}` });
  const linea = box(cam, 0, 0, 10, 10, { zIndex: 4, transformOrigin: '0 50%', background: 'repeating-linear-gradient(90deg, #ffe9a6 0 18px, transparent 18px 30px)' });
  const sat = box(cam, 0, 0, 150, 70, { zIndex: 6, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 150 70" width="150" height="70"><rect x="0" y="20" width="50" height="30" fill="#2b8ad6" stroke="${INK}" stroke-width="4"/><rect x="100" y="20" width="50" height="30" fill="#2b8ad6" stroke="${INK}" stroke-width="4"/><rect x="50" y="12" width="50" height="46" rx="8" fill="#e3ddd0" stroke="${INK}" stroke-width="5"/></svg>`);
  const rapido = box(cam, 0, 0, 70, 34, { zIndex: 6 }, `<svg viewBox="0 0 70 34" width="70" height="34"><rect x="0" y="10" width="20" height="14" fill="#9a948a" stroke="${INK}" stroke-width="3"/><rect x="50" y="10" width="20" height="14" fill="#9a948a" stroke="${INK}" stroke-width="3"/><rect x="20" y="5" width="30" height="24" rx="5" fill="#e3ddd0" stroke="${INK}" stroke-width="4"/></svg>`);
  const km = chip(c, 230, 330, 'a 36.000 km', { size: 66, bg: INK, color: YEL, z: 40 }), ecu = chip(c, 300, 450, 'sobre el ecuador', { size: 56, bg: '#2b8ad6', z: 40 });
  const mismo = chip(c, 140, 330, 'giran al mismo ritmo', { size: 62, bg: '#2e9e6b', z: 40 });
  const quieto = texto(c, 1560, 'desde aquí: QUIETO', { size: 84, color: '#fff', z: 40, shadow: OUT });
  // L5: la antena de cerca, atornillada para siempre
  const cerca = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: OCASO });
  const ant = PARAB(cerca, 240, 620, 600, 2); const tornillos = [0, 1, 2].map(i => box(cerca, 520, 1080 + i * 110, 60, 60, { zIndex: 3, borderRadius: '50%', background: '#c9c4bc', border: `6px solid ${INK}` }, `<svg viewBox="0 0 60 60" width="48" height="48"><path d="M14,30 H46 M30,14 V46" stroke="${INK}" stroke-width="6"/></svg>`));
  const siempre = texto(cerca, 300, 'mirando al sur<br>para siempre', { size: 92, color: '#fff', z: 4, shadow: OUT });
  sp(T.satelites, 'pop', 0.4); sp(T.km, 'whoosh', 0.5); sp(T.ritmo, 'swoosh_up', 0.5); sp(T.quietos, 'ding', 0.6); sp(T.coloca, 'click', 0.6); sp(T.siempre, 'tada', 0.5);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(5) - 0.1, [540, 1000, 0.82], [540, 1000, 0.92]);
    const a = (t - L(3)) * 0.55; // giro de la Tierra (rad)
    tierra.style.transform = `rotate(${f1(a * 180 / Math.PI)}deg)`;
    const ex = CX + Math.cos(a + 0.6) * RT * 0.55, ey = CY + Math.sin(a + 0.6) * RT * 0.55, sx = CX + Math.cos(a + 0.6) * RO, sy = CY + Math.sin(a + 0.6) * RO;
    set(esp, { x: ex - 20, y: ey - 20 }); set(sat, { x: sx - 75, y: sy - 35, r: (a + 0.6) * 180 / Math.PI + 90, o: t > T.satelites - 0.2 ? 1 : 0, s: pop(t, T.satelites - 0.2, 0.35) });
    const dl = Math.hypot(sx - ex, sy - ey); linea.style.width = f1(dl) + 'px'; set(linea, { x: ex, y: ey - 5, r: Math.atan2(sy - ey, sx - ex) * 180 / Math.PI, o: t > T.satelites ? 1 : 0 });
    const ar = (t - L(3)) * 2.4; set(rapido, { x: CX + Math.cos(ar) * 330 - 35, y: CY + Math.sin(ar) * 330 - 17, o: t > T.ritmo - 0.3 ? 1 : 0 });
    set(km, { o: t > T.km - 0.1 && t < T.vuelta ? 1 : 0, s: pop(t, T.km - 0.1, 0.3), r: -3 }); set(ecu, { o: t > T.ecuador - 0.1 && t < T.vuelta ? 1 : 0, s: pop(t, T.ecuador - 0.1, 0.3), r: 3 });
    set(mismo, { o: t > T.ritmo - 0.1 && t < T.coloca - 0.4 ? 1 : 0, s: pop(t, T.ritmo - 0.1, 0.3), r: -3 });
    set(quieto, { o: t > T.quietos - 0.1 && t < T.coloca - 0.4 ? 1 : 0, s: pop(t, T.quietos - 0.1, 0.3), r: -3 });
    const kc = p(t, T.coloca - 0.4, 0.5, E.outCubic); set(cerca, { o: t > T.coloca - 0.4 ? 1 : 0, y: (1 - kc) * 1920, s: 1 + 0.04 * clamp((t - T.coloca) / 4) });
    set(ant.cab, { r: -20 + Math.sin(t * 1.3) * 1.5 });
    tornillos.forEach((s, i) => set(s, { r: t > T.coloca + i * 0.25 ? -360 * p(t, T.coloca + i * 0.25, 0.4) : 0 }));
    set(siempre, { o: t > T.siempre - 0.2 ? 1 : 0, s: pop(t, T.siempre - 0.2, 0.35), r: -2 });
  };
});

/* L6-L7 (corte): 1945: la revista con el artículo y el joven de uniforme; el dibujo de su idea (un satélite quieto sobre un punto); cohete y «1964» */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.06) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.06) 2px, transparent 2px)', backgroundSize: '80px 80px' });
  const rev = box(cam, 300, 420, 640, 860, { zIndex: 3, background: '#fbf6ea', border: `10px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, padding: '40px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, transformOrigin: '50% 50%' },
    `<div style="font-family:Bricolage;font-weight:800;font-size:56px;letter-spacing:2px">WIRELESS WORLD</div><div style="font-size:34px;margin-top:6px">octubre de 1945</div>
     <div style="font-size:52px;font-weight:900;line-height:1.1;margin-top:40px">Extra-Terrestrial<br>Relays</div>
     <svg viewBox="0 0 400 320" width="520" height="400" style="margin-top:20px"><circle cx="200" cy="170" r="70" fill="#9fd3e8" stroke="${INK}" stroke-width="5"/><circle class="orb" cx="200" cy="170" r="150" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/>${[0, 120, 240].map(g => `<g transform="rotate(${g} 200 170)"><rect x="345" y="160" width="20" height="20" fill="${INK}"/></g>`).join('')}</svg>`);
  const joven = PERS(cam, -40, 760, 380, { ropa: '#3d5a8a', gorro: 'gorra', gcol: '#3d5a8a', pelo: 'corto', pcol: '#3a2a1e', z: 4 });
  const ano = chip(c, 380, 300, '1945', { size: 80, bg: INK, color: YEL, z: 40 });
  const cf = chip(c, 200, 1540, '«ciencia ficción»', { size: 62, bg: '#9a6bd0', z: 40 });
  // L7: la idea (satélite quieto encima de un punto) y luego el cohete de 1964
  const idea = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: ESPACIO, backgroundImage: 'radial-gradient(#fff 1.4px, transparent 2px)', backgroundSize: '110px 120px' });
  const globo = box(idea, 300, 760, 480, 480, { borderRadius: '50%', background: '#2b6fb0', border: `8px solid ${INK}`, overflow: 'hidden' }, `<div class="tierra" style="position:absolute;left:0;top:0;width:1440px;height:480px;background:repeating-linear-gradient(90deg, transparent 0 160px, #6fae5a 160px 300px, transparent 300px 480px)"></div>`);
  const punto = box(idea, 525, 940, 30, 30, { borderRadius: '50%', background: RED, border: `5px solid ${INK}` });
  const satI = box(idea, 465, 380, 150, 70, {}, `<svg viewBox="0 0 150 70" width="150" height="70"><rect x="0" y="20" width="50" height="30" fill="#2b8ad6" stroke="${INK}" stroke-width="4"/><rect x="100" y="20" width="50" height="30" fill="#2b8ad6" stroke="${INK}" stroke-width="4"/><rect x="50" y="12" width="50" height="46" rx="8" fill="#e3ddd0" stroke="${INK}" stroke-width="5"/></svg>`);
  const rayo = box(idea, 536, 450, 8, 490, { background: 'repeating-linear-gradient(#ffe9a6 0 18px, transparent 18px 30px)' });
  const cohete = box(idea, 760, 0, 120, 300, {}, `<svg viewBox="0 0 120 300" width="120" height="300"><path d="M60,0 Q100,60 100,180 L20,180 Q20,60 60,0Z" fill="#e9e5dc" stroke="${INK}" stroke-width="7"/><path d="M20,140 L0,210 L20,190Z M100,140 L120,210 L100,190Z" fill="${RED}" stroke="${INK}" stroke-width="5"/><path d="M35,185 Q60,300 85,185Z" fill="#ffb02e" stroke="${INK}" stroke-width="5"/></svg>`);
  const ch64 = chip(idea, 380, 300, '1964: el primero', { size: 62, bg: RED, z: 2 });
  sp(T.anio, 'whoosh', 0.4); sp(T.publico, 'papel_w', 0.6); sp(T.ficcion, 'sparkle', 0.5); sp(T.pones, 'swoosh_up', 0.5); sp(T.quieto, 'ding', 0.6); sp(T.veinte, 'whoosh', 0.7);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 900, 0.95], [580, 940, 1.08]);
    set(rev, { o: t > T.publico - 0.3 ? 1 : 0, s: pop(t, T.publico - 0.3, 0.4), r: -3 + Math.sin(t * 1.1) * 1.5 });
    const orb = rev.querySelector('.orb'); if (orb) orb.setAttribute('stroke-dashoffset', f1(-t * 40));
    pFace(joven, t, { feliz: 0.8, ceja: 8, look: [14, -6], seed: 41 }); set(joven, { y: wobble(t, 0.6, 4) });
    set(ano, { o: t > T.anio - 0.1 && t < T.pones - 0.4 ? 1 : 0, s: pop(t, T.anio - 0.1, 0.3), r: -3 });
    set(cf, { o: t > T.ficcion - 0.1 && t < T.pones - 0.4 ? 1 : 0, s: pop(t, T.ficcion - 0.1, 0.3), r: -3 });
    const ki = p(t, T.pones - 0.4, 0.5, E.outCubic); set(idea, { o: t > T.pones - 0.4 ? 1 : 0, x: (1 - ki) * 1080 });
    const tierraI = globo.querySelector('.tierra'); if (tierraI) tierraI.style.transform = `translateX(${f1(-((t * 90) % 480))}px)`;
    set(satI, { y: Math.sin(t * 3) * 4 }); set(punto, { s: 1 + 0.15 * Math.sin(t * 6) });
    rayo.style.opacity = t > T.quieto - 0.2 ? 1 : 0;
    const kr = p(t, T.veinte - 0.2, 1.6, E.inCubic); set(cohete, { o: t > T.veinte - 0.2 && kr < 1 ? 1 : 0, y: lerp(1900, -400, kr), x: Math.sin(t * 8) * 4 });
    set(ch64, { o: t > T.alli - 0.2 ? 1 : 0, s: pop(t, T.alli - 0.2, 0.3), r: -3 });
  };
});

/* L8 (corte): «la órbita Clarke» rotulada en el anillo; el chaval de uniforme se convierte en el escritor; el libro «2001» con su monolito */
plano(L(8) - 0.1, L(9) - 0.1, { background: ESPACIO }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: ESPACIO, backgroundImage: 'radial-gradient(#fff 1.4px, transparent 2px)', backgroundSize: '110px 120px' });
  const anillo = box(cam, 40, 560, 1000, 1000, { zIndex: 1, borderRadius: '50%', border: '10px dashed rgba(242,194,48,.85)', boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const tierra = box(cam, 340, 860, 400, 400, { zIndex: 2, borderRadius: '50%', background: '#2b6fb0', border: `8px solid ${INK}` });
  const rot = box(cam, 140, 470, 800, 120, { zIndex: 3, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '84px', color: YEL, textAlign: 'center', textShadow: OUT }, 'órbita Clarke');
  const libro = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: '#1d1a22' });
  const tapa = box(libro, 240, 520, 600, 860, { background: '#f4efe2', border: `10px solid ${INK}`, borderRadius: '10px 26px 26px 10px', boxShadow: `16px 16px 0 #000`, textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, color: INK, transformOrigin: '50% 50%' },
    `<div style="font-size:150px;margin-top:60px;letter-spacing:4px">2001</div><div style="font-family:Playfair;font-size:44px;font-style:italic">una odisea del espacio</div><div style="position:absolute;left:250px;top:420px;width:100px;height:320px;background:#111;border:4px solid #444"></div><div style="position:absolute;left:0;right:0;bottom:26px;font-size:38px">ARTHUR C. CLARKE</div>`);
  sp(T.orbita, 'tada', 0.6); sp(T.arthur, 'stamp', 0.6); sp(T.odisea, 'sparkle', 0.7);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 1000, 0.92], [540, 980, 1.04]);
    set(anillo, { r: t * 12 }); set(tierra, { r: t * 20 });
    set(rot, { o: t > T.orbita - 0.1 ? 1 : 0, s: pop(t, T.orbita - 0.1, 0.35), r: -3 + wobble(t, 0.5, 0.8) });
    const kl = p(t, T.arthur - 0.4, 0.5, E.outCubic); set(libro, { o: t > T.arthur - 0.4 ? 1 : 0, y: (1 - kl) * 1920 });
    set(tapa, { r: -3 + Math.sin(t * 1.2) * 2, s: 1 + 0.05 * p(t, T.odisea - 0.2, 0.6) });
  };
});

/* L9 (corte): una iglesia románica con el ábside a la derecha; el sol sale por detrás del ábside: «ESTE» */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#f7b267' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#5a6aa8 0%, #f08a3c 70%, #f7b267 100%)' });
  const sol = box(cam, 820, 1000, 300, 300, { zIndex: 1 }, SOL_SVG(150));
  box(cam, -800, 1300, 2680, 1400, { zIndex: 2, background: '#8fb46a', borderTop: `10px solid ${INK}` });
  const igl = box(cam, 40, 560, 1000, 760, { zIndex: 3 }, `<svg viewBox="0 0 1000 760" width="1000" height="760"><rect x="60" y="300" width="560" height="460" fill="#d9b48a" stroke="${INK}" stroke-width="10"/><path d="M40,310 L340,140 L640,310Z" fill="#b5523a" stroke="${INK}" stroke-width="10"/>
    <rect x="80" y="40" width="160" height="270" fill="#d9b48a" stroke="${INK}" stroke-width="10"/><path d="M70,50 L160,0 L250,50Z" fill="#b5523a" stroke="${INK}" stroke-width="8"/><path d="M130,120 Q160,80 190,120 L190,200 L130,200Z" fill="#3d3a44"/>
    <path d="M620,420 Q820,420 820,590 L820,760 L620,760Z" fill="#d9b48a" stroke="${INK}" stroke-width="10"/><path d="M620,420 Q820,400 840,470 L620,470Z" fill="#b5523a" stroke="${INK}" stroke-width="8"/>
    <path d="M300,760 L300,560 Q340,500 380,560 L380,760Z" fill="#6b4a2a" stroke="${INK}" stroke-width="8"/><path d="M700,560 Q720,530 740,560 L740,640 L700,640Z" fill="#3d3a44"/></svg>`);
  const altar = chip(c, 560, 1100, 'altar', { size: 56, bg: INK, color: YEL, z: 40 });
  const este = box(c, 640, 300, 400, 180, { zIndex: 40, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '130px', color: '#fff', textAlign: 'center', textShadow: OUT }, 'ESTE');
  const rom = chip(c, 120, 330, 'iglesias románicas', { size: 58, bg: '#b5523a', z: 40 });
  sp(T.iglesia, 'harpa', 0.5); sp(T.este, 'ding', 0.6); sp(T.sol, 'sparkle', 0.7);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [480, 960, 0.92], [620, 920, 1.05]);
    set(sol, { y: -lerp(0, 380, p(t, T.romanicas, 3.5, E.outCubic)), r: t * 10 });
    set(rom, { o: t > T.romanicas - 0.1 ? 1 : 0, s: pop(t, T.romanicas - 0.1, 0.3), r: -3 });
    set(altar, { o: t > T.este - 0.6 ? 1 : 0, s: pop(t, T.este - 0.6, 0.3), r: 3 });
    set(este, { o: t > T.este - 0.1 ? 1 : 0, s: pop(t, T.este - 0.1, 0.35), r: -4 + wobble(t, 0.5, 0.8) });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Hacia dónde mira', 'la parabólica de tu edificio?', { size: 80, draw: c => [['¡al sur, es verdad!', YEL], ['voy a asomarme', PINK], ['la mía mira al revés', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(114, 'La brújula escondida', ['TU CIUDAD', 'te orienta']);

Story.run({
  textura: true,
  ovalo: [[T.sol + 0.3, L(10) - 0.15]],
  vecino: { risa: [], sorpresa: [[T.arthur, T.arthur + 1.2]], golpes: [] },
});
