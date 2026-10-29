/* Ep. 110 · «¿Ventanilla o aire acondicionado?». El aire acondicionado gasta (el compresor va con el motor); la ventanilla abierta también: el aire que entra
   frena el coche y ese freno crece con el cuadrado de la velocidad. En ciudad gana la ventanilla; en autovía, a partir de unos 80-100 km/h según el coche,
   la ventanilla puede gastar tanto o más que el aire (SAE 2013-01-0551 y otros ensayos). Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  ventanilla0: Q('ventanilla o aire'), reves: Q('al revés'), velocidad0: Q('la velocidad'),
  verano: Q('verano'), padre: Q('tu padre'), nada: Q('nada de aire'), bajad: Q('bajad'),
  razon: Q('tiene razón'), motor: Q('con el motor'), gasolina: Q('gasta gasolina'),
  tambien: Q('también gasta'), nonota: Q('no se nota'),
  entra: Q('el aire entra'), remolinos: Q('remolinos'), frena: Q('lo frena'), paracaidas: Q('paracaídas'),
  crece: Q('crece muchísimo'), cuarenta: Q('a cuarenta'), casinada: Q('casi nada'), cientoveinte: Q('ciento veinte'), monton: Q('un montón'),
  ciudad: Q('en ciudad'), gana: Q('gana la ventanilla'), menos: Q('gasta menos'),
  autovia: Q('en la autovía'), ochenta: Q('ochenta'), cien: Q('cien por hora'), tanto: Q('tanto o más'),
  coche: Q('depende del coche'), aero: Q('aerodinámico'), cerrar: Q('compensa cerrar'),
  ciudad2: Q('ciudad'), autovia2: Q('autovía'), protesta: Q('protesta'), video: Q('este vídeo'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZ = '#2b8ad6', VER = '#2e9e6b', HIELO = '#bfe3f5';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* coche de lado (600×300): o.abierta = ventanilla bajada; las ruedas giran con giraRuedas() */
const COCHE = (c, x, y, w, o = {}) => box(c, x, y, w, w / 2, { zIndex: o.z || 8, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 600 300" width="${w}" height="${w / 2}">
  <path d="M30,200 L30,150 Q34,120 80,114 L150,108 L215,46 Q230,34 260,34 L400,34 Q430,34 448,52 L505,108 L555,118 Q585,126 585,160 L585,200 Q585,220 560,220 L50,220 Q30,220 30,200Z" fill="${o.col || '#e8507a'}" stroke="${INK}" stroke-width="9"/>
  <path d="M168,108 L228,52 Q236,46 250,46 L318,46 L318,108Z" fill="${o.abierta ? (o.dentro || '#2a2530') : HIELO}" stroke="${INK}" stroke-width="6"/>
  ${o.abierta ? `<rect x="174" y="98" width="140" height="14" fill="${HIELO}" stroke="${INK}" stroke-width="4"/>` : `<path d="M190,96 L238,58" stroke="#fff" stroke-width="8" opacity=".7"/>`}
  <path d="M332,46 L398,46 Q418,46 430,58 L478,108 L332,108Z" fill="${HIELO}" stroke="${INK}" stroke-width="6"/>
  <rect x="540" y="140" width="34" height="20" rx="6" fill="#ffe9a6" stroke="${INK}" stroke-width="5"/>
  ${[150, 465].map(cx => `<g class="rd" style="transform-box:fill-box;transform-origin:center"><circle cx="${cx}" cy="222" r="56" fill="#3d3a44" stroke="${INK}" stroke-width="9"/><circle cx="${cx}" cy="222" r="24" fill="#c9c4bc" stroke="${INK}" stroke-width="6"/><path d="M${cx - 50},222 L${cx + 50},222 M${cx},172 L${cx},272" stroke="#c9c4bc" stroke-width="7"/></g>`).join('')}</svg>`);
const giraRuedas = (car, t, v = 1) => car.querySelectorAll('.rd').forEach(r => r.style.transform = `rotate(${f1((t * 720 * v) % 360)}deg)`);
/* copo (aire acondicionado) y ventanilla (iconos) */
const COPO = sz => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><circle cx="50" cy="50" r="46" fill="${AZ}" stroke="${INK}" stroke-width="6"/>${[0, 60, 120].map(a => `<path d="M50,16 L50,84 M42,24 L50,32 L58,24 M42,76 L50,68 L58,76" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" transform="rotate(${a} 50 50)"/>`).join('')}</svg>`;
const VENT = sz => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><circle cx="50" cy="50" r="46" fill="${VER}" stroke="${INK}" stroke-width="6"/><path d="M24,70 L24,44 L44,26 L76,26 L76,70Z" fill="${HIELO}" stroke="#fff" stroke-width="6"/><path d="M28,56 Q50,46 72,56" stroke="#fff" stroke-width="7" fill="none"/></svg>`;
/* velocímetro (aguja con clase .aguja; 0 → -120º, 160 → +120º) */
const VELO = (c, x, y, sz, z = 30) => box(c, x, y, sz, sz, { zIndex: z }, `<svg viewBox="0 0 200 200" width="${sz}" height="${sz}"><circle cx="100" cy="100" r="92" fill="#fff" stroke="${INK}" stroke-width="10"/>
  <path d="M30,140 A80,80 0 1,1 170,140" stroke="#e3ddd0" stroke-width="16" fill="none"/><path d="M128,26 A80,80 0 0,1 170,140" stroke="${RED}" stroke-width="16" fill="none"/>
  ${[0, 40, 80, 120, 160].map(v => { const a = (-120 + v * 1.5) * Math.PI / 180; return `<text x="${f1(100 + Math.sin(a) * 56)}" y="${f1(108 - Math.cos(a) * 56)}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="20" fill="${INK}">${v}</text>`; }).join('')}
  <g class="aguja" style="transform-origin:100px 100px"><path d="M96,100 L100,28 L104,100Z" fill="${RED}" stroke="${INK}" stroke-width="3"/></g><circle cx="100" cy="100" r="12" fill="${INK}"/></svg>`);
const aguja = (v, kmh) => { const g = v.querySelector('.aguja'); if (g) g.style.transform = `rotate(${f1(-120 + kmh * 1.5)}deg)`; };
/* carretera de lado con rayas que pasan */
function carretera(cam, y = 1300) {
  box(cam, -800, -400, 2680, y + 400, { zIndex: 0, background: 'linear-gradient(#7fbfe8, #d8eef8)' });
  box(cam, -800, y, 2680, 1400, { zIndex: 1, background: '#6d6a72', borderTop: `10px solid ${INK}` });
  const rayas = box(cam, -800, y + 120, 4000, 24, { zIndex: 2, background: 'repeating-linear-gradient(90deg, #fff 0 120px, transparent 120px 260px)' });
  const arb = box(cam, -800, y - 300, 4000, 300, { zIndex: 1 }, `<svg viewBox="0 0 4000 300" width="4000" height="300">${[...Array(16)].map((_, i) => `<g transform="translate(${i * 260 + 60} 0)"><rect x="40" y="170" width="24" height="130" fill="#7a5a3a" stroke="${INK}" stroke-width="5"/><circle cx="52" cy="140" r="${60 + (i % 3) * 10}" fill="#6fae5a" stroke="${INK}" stroke-width="6"/></g>`).join('')}</svg>`);
  return (t, v) => { set(rayas, { x: -((t * 900 * v) % 260) }); set(arb, { x: -((t * 420 * v) % 260) }); };
}
/* remolinos (espirales) */
const ESPIRAL = (c, x, y, sz, col = AZ, z = 12) => box(c, x, y, sz, sz, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><path d="M50,50 m0,-6 a6,6 0 1,1 -6,6 a12,12 0 1,1 12,12 a20,20 0 1,1 -20,-20 a30,30 0 1,1 30,30" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`);

/* PORTADA + L0-L1: el mismo coche partido en dos — ventanilla bajada (pelo al viento) vs. cerrada con el copo; «¿VENTANILLA o AIRE?»; el velocímetro decide */
plano(-1, L(2) - 0.1, { background: '#d8eef8' }, c => {
  const cam = CAM(c); const mueve = carretera(cam, 1320);
  const car = COCHE(cam, 140, 920, 800, { abierta: 1 });
  const pelo = box(cam, 330, 900, 260, 140, { zIndex: 9 }, `<svg viewBox="0 0 260 140" width="260" height="140">${[0, 1, 2, 3].map(i => `<path d="M240,${40 + i * 20} Q160,${20 + i * 22} 80,${50 + i * 18} T0,${40 + i * 20}" stroke="#3a2a1e" stroke-width="12" fill="none" stroke-linecap="round"/>`).join('')}</svg>`);
  const viento = [0, 1, 2, 3].map(i => box(cam, 0, 760 + i * 70, 300, 40, { zIndex: 9 }, `<svg viewBox="0 0 300 40" width="300" height="40"><path d="M0,20 Q75,0 150,20 T300,20" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`));
  const copo = box(cam, 680, 820, 200, 200, { zIndex: 10, transformOrigin: '50% 50%' }, COPO(200));
  const ven = box(cam, 220, 760, 190, 190, { zIndex: 10, transformOrigin: '50% 50%' }, VENT(190));
  const t1 = texto(c, 150, `¿${hlSpan('VENTANILLA', 'phl', YEL)}`, { size: 112, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 280, 'o AIRE?', { size: 124, color: '#fff', z: 40, shadow: OUT });
  const rev = chip(c, 170, 1590, 'casi todos, al revés', { size: 62, bg: RED, z: 41 });
  const velo = VELO(c, 690, 1520, 330, 41);
  sp(T.reves, 'error', 0.5); sp(T.velocidad0, 'swoosh_up', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1000, 0.95], [560, 1020, 1.08]);
    const v = 1 + 0.6 * p(t, T.velocidad0, 1.2); mueve(t, v); giraRuedas(car, t, v); set(car, { y: Math.sin(t * 9) * 3 });
    set(pelo, { y: Math.sin(t * 7) * 6, r: Math.sin(t * 5) * 3 });
    viento.forEach((w, i) => set(w, { x: 1000 - ((t * 900 + i * 240) % 1300), o: 0.8 }));
    set(copo, { r: t * 40, s: 1 + 0.05 * Math.sin(t * 3) }); set(ven, { s: 1 + 0.05 * Math.sin(t * 3 + 1.5) });
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
    popA(rev, t, T.reves - 0.1, { r: -4 });
    set(velo, { o: t > T.velocidad0 - 0.2 ? 1 : 0, s: pop(t, T.velocidad0 - 0.2, 0.4) }); aguja(velo, t > T.velocidad0 ? 30 + 90 * (0.5 + 0.5 * Math.sin((t - T.velocidad0) * 2.4 - 1.5)) : 0);
  };
}, { sfx: false });

/* L2-L3 (corte): dentro del coche, verano; el padre con bigote: «¡Nada de aire, que gasta!»; luego el capó abierto: el compresor va con la correa del motor y el depósito baja */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#ffe9a6' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'linear-gradient(#ffd36b, #ffe9a6)' });
  const sol = box(cam, 760, 140, 240, 240, { zIndex: 1, borderRadius: '50%', background: '#ffb02e', border: `8px solid ${INK}` });
  // salpicadero visto desde atrás
  box(cam, -200, 1150, 1480, 900, { zIndex: 5, background: '#3d3a44', borderTop: `12px solid ${INK}`, borderRadius: '80px 80px 0 0' });
  const volante = box(cam, 120, 1010, 340, 340, { zIndex: 7, borderRadius: '50%', border: `30px solid ${INK}`, boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const padre = PERS(cam, 100, 520, 420, { ropa: '#2b3550', pelo: 'corto', pcol: '#4a4a4a', bigote: true });
  const hijo = PERS(cam, 600, 640, 320, { ropa: '#f2c230', pelo: 'corto', pcol: '#3a2a1e' });
  const sudo = [0, 1].map(i => box(cam, 800 + i * 60, 600, 40, 56, { zIndex: 9 }, `<svg viewBox="0 0 50 70" width="40" height="56"><path d="M25,4 Q48,44 25,66 Q2,44 25,4Z" fill="#7cc4ea" stroke="${INK}" stroke-width="4"/></svg>`));
  const dice = chip(c, 80, 330, '«¡Nada de aire, que gasta!»', { size: 58, bg: INK, color: YEL, z: 40 });
  const baja = chip(c, 220, 470, 'bajad las ventanillas', { size: 54, bg: VER, z: 40 });
  const term = chip(c, 640, 180, '38 ºC', { size: 70, bg: RED, z: 40 });
  // capó abierto (aparece en «funciona con el motor»): motor, correa y compresor; depósito que baja
  const capo = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: '#efe1c6' }, `<svg viewBox="0 0 1080 1920" width="1080" height="1920">
    <rect x="120" y="640" width="440" height="420" rx="40" fill="#5e5a52" stroke="${INK}" stroke-width="10"/><text x="340" y="880" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="72" fill="#fff">motor</text>
    <circle cx="340" cy="1160" r="80" fill="#c9c4bc" stroke="${INK}" stroke-width="10"/><circle cx="780" cy="1160" r="70" fill="#c9c4bc" stroke="${INK}" stroke-width="10"/>
    <path class="correa" d="M340,1080 L780,1090 M340,1240 L780,1230" stroke="${INK}" stroke-width="16" stroke-dasharray="40 20"/>
    <rect x="660" y="880" width="240" height="200" rx="30" fill="${AZ}" stroke="${INK}" stroke-width="10"/><text x="780" y="960" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="#fff">aire</text><text x="780" y="1010" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="#fff">acond.</text></svg>`);
  const dep = box(capo, 300, 420, 480, 120, { background: '#fff', border: `8px solid ${INK}`, borderRadius: '24px', overflow: 'hidden' }, `<div class="nivel" style="position:absolute;left:0;top:0;bottom:0;width:80%;background:#f2c230"></div><div style="position:absolute;inset:0;font-family:Bricolage;font-weight:800;font-size:54px;line-height:104px;text-align:center;color:${INK}">depósito</div>`);
  const razon = chip(c, 260, 360, 'en parte… tiene razón', { size: 60, bg: VER, z: 41 });
  const gasta = texto(c, 1560, 'gasta gasolina', { size: 92, color: RED, z: 41, shadow: '4px 4px 0 #fff' });
  sp(T.verano, 'tada', 0.4); sp(T.nada, 'boing', 0.5); sp(T.bajad, 'swoosh_up', 0.5); sp(T.razon, 'ding', 0.5); sp(T.motor, 'click', 0.6); sp(T.gasolina, 'gulp', 0.6);
  return t => {
    const enCapo = t > T.motor - 0.4;
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 900, 0.95], [520, 920, 1.1]);
    set(sol, { r: t * 20, s: 1 + 0.04 * Math.sin(t * 2) }); set(volante, { r: Math.sin(t * 1.3) * 6 });
    pFace(padre, t, { feliz: t > T.nada - 0.1 && t < T.razon ? -0.4 : 0.3, ceja: t > T.nada - 0.1 ? 14 : 4, jaw: t > T.nada && t < T.razon ? 0.4 + 0.3 * Math.abs(Math.sin(t * 12)) : 0, look: [16, 0], seed: 1 });
    pFace(hijo, t, { feliz: -0.5, ceja: 10, look: [-14, 0], seed: 2 }); set(hijo, { y: wobble(t, 0.7, 4) });
    sudo.forEach((s, i) => { const k = ((t * 0.8) + i * 0.5) % 1; set(s, { y: k * 120, o: 1 - k }); });
    popA(term, t, T.verano, { r: 4, o: enCapo ? 0 : 1 });
    set(dice, { o: t > T.nada - 0.1 && t < T.razon ? 1 : 0, s: pop(t, T.nada - 0.1, 0.35), r: -3 });
    set(baja, { o: t > T.bajad - 0.1 && t < T.razon ? 1 : 0, s: pop(t, T.bajad - 0.1, 0.35), r: 3 });
    set(razon, { o: t > T.razon - 0.1 && t < T.motor - 0.4 ? 1 : 0, s: pop(t, T.razon - 0.1, 0.35), r: -3 });
    // el capó entra desde abajo y se queda (un solo sentido)
    const kc = p(t, T.motor - 0.4, 0.5, E.outCubic); set(capo, { o: enCapo ? 1 : 0, y: (1 - kc) * 1920 + Math.sin(t * 0.9) * 10, s: 1 + 0.04 * clamp((t - T.motor) / 3) });
    const cor = capo.querySelector('.correa'); if (cor) cor.setAttribute('stroke-dashoffset', f1(-t * 300));
    const niv = dep.querySelector('.nivel'); if (niv) niv.style.width = f1(80 - 50 * p(t, T.gasolina - 0.2, 1.6, E.inOutCubic)) + '%';
    set(gasta, { o: t > T.gasolina - 0.1 ? 1 : 0, s: pop(t, T.gasolina - 0.1, 0.35), r: -3 });
  };
});

/* L4-L5 (corte): el coche visto desde arriba con la ventanilla abierta: el aire entra, hace remolinos y detrás se abre un paracaídas */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#6d6a72' }, c => {
  const cam = CAM(c);
  box(cam, -600, -1400, 2280, 4400, { zIndex: 0, background: '#6d6a72' });
  const lineas = box(cam, 520, -1400, 40, 4400, { zIndex: 1, background: 'repeating-linear-gradient(#fff 0 140px, transparent 140px 300px)' });
  box(cam, -600, -1400, 260, 4400, { zIndex: 1, background: '#8fb46a' }); box(cam, 1420, -1400, 260, 4400, { zIndex: 1, background: '#8fb46a' });
  // coche (vista cenital, morro arriba): carrocería, techo y la ventanilla izquierda abierta
  const car = box(cam, 290, 560, 500, 900, { zIndex: 5 }, `<svg viewBox="0 0 500 900" width="500" height="900">${[[20, 140], [440, 140], [20, 640], [440, 640]].map(([x, y]) => `<rect x="${x}" y="${y}" width="40" height="130" rx="12" fill="${INK}"/>`).join('')}
    <rect x="50" y="30" width="400" height="840" rx="140" fill="#e8507a" stroke="${INK}" stroke-width="12"/><path d="M110,260 Q250,200 390,260 L370,350 Q250,320 130,350Z" fill="${HIELO}" stroke="${INK}" stroke-width="8"/>
    <rect x="120" y="360" width="260" height="360" rx="40" fill="#c8456c" stroke="${INK}" stroke-width="8"/><rect x="40" y="380" width="40" height="200" fill="#2a2530" stroke="${INK}" stroke-width="6"/>
    <path d="M140,740 Q250,780 360,740 L370,800 Q250,830 130,800Z" fill="${HIELO}" stroke="${INK}" stroke-width="8"/></svg>`);
  const flechas = [0, 1, 2, 3].map(i => box(cam, 0, 0, 200, 60, { zIndex: 6, transformOrigin: '100% 50%' }, `<svg viewBox="0 0 200 60" width="200" height="60"><path d="M0,30 L160,30" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M140,8 L190,30 L140,52Z" fill="#fff"/></svg>`));
  const rem = [[360, 760], [520, 900], [380, 1060], [560, 1180]].map(([x, y], i) => [ESPIRAL(cam, x - 60, y - 60, 140, '#fff', 7), i]);
  const para = box(cam, 290, 1500, 500, 520, { zIndex: 4, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 500 520" width="500" height="520">${[[120, 0], [380, 0]].map(([x]) => `<path d="M${x},0 L${x < 250 ? 30 : 470},300" stroke="${INK}" stroke-width="6"/>`).join('')}<path d="M10,300 Q250,560 490,300 Q250,380 10,300Z" fill="${RED}" stroke="${INK}" stroke-width="10"/><path d="M170,330 Q250,470 330,330" stroke="#fff" stroke-width="10" fill="none"/></svg>`);
  const tamb = chip(c, 140, 300, 'la ventanilla también gasta', { size: 58, bg: RED, z: 40 });
  const nonota = chip(c, 300, 430, '(no se nota)', { size: 54, bg: INK, color: '#fff', z: 40 });
  const frena = texto(c, 1600, '¡lo FRENA!', { size: 120, color: RED, z: 40, shadow: '5px 5px 0 #fff' });
  sp(T.tambien, 'error', 0.5); sp(T.entra, 'whoosh', 0.7); sp(T.remolinos, 'swoosh_up', 0.5); sp(T.frena, 'thud', 0.7); sp(T.paracaidas, 'boing', 0.6);
  return t => {
    // la cámara baja siguiendo el aire: ventanilla → remolinos → paracaídas
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 900, 0.95], [540, 1500, 0.8]);
    set(lineas, { y: (t * 900) % 300 }); set(car, { x: Math.sin(t * 1.7) * 6 });
    flechas.forEach((f, i) => { const k = ((t - T.entra) * 1.1 + i * 0.25) % 1; set(f, { o: t > T.entra - 0.1 ? Math.sin(k * Math.PI) : 0, x: lerp(-120, 200, k), y: 900 + i * 40 + k * 30 }); });
    rem.forEach(([r, i]) => set(r, { o: t > T.remolinos + i * 0.2 ? 0.95 : 0, r: t * (i % 2 ? -300 : 300), s: pop(t, T.remolinos + i * 0.2, 0.4) }));
    const kp = p(t, T.paracaidas - 0.3, 0.6, E.outBack); set(para, { o: t > T.frena - 0.2 ? 1 : 0, s: t > T.paracaidas - 0.3 ? 0.5 + 0.5 * kp : (t > T.frena - 0.2 ? 0.5 : 0), r: Math.sin(t * 3) * 3 });
    set(tamb, { o: t > T.tambien - 0.1 && t < T.entra ? 1 : 0, s: pop(t, T.tambien - 0.1, 0.35), r: -3 });
    set(nonota, { o: t > T.nonota - 0.1 && t < T.entra ? 1 : 0, s: pop(t, T.nonota - 0.1, 0.35), r: 3 });
    set(frena, { o: t > T.frena - 0.1 ? 1 : 0, s: pop(t, T.frena - 0.1, 0.35), r: -5 });
  };
});

/* L6 (corte): el freno crece con la velocidad — a 40 un paracaídas de juguete, a 120 uno enorme; la curva sube */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#efe1c6' });
  const graf = box(cam, 90, 480, 900, 900, { zIndex: 2 }, `<svg viewBox="0 0 900 900" width="900" height="900"><path d="M80,40 L80,820 L880,820" stroke="${INK}" stroke-width="10" fill="none"/>
    <text x="70" y="30" font-family="Bricolage" font-weight="800" font-size="44" fill="${INK}">freno del aire</text><text x="880" y="790" text-anchor="end" font-family="Bricolage" font-weight="800" font-size="44" fill="${INK}">velocidad</text>
    ${[40, 80, 120].map(v => `<text x="${80 + v * 6}" y="870" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">${v}</text>`).join('')}
    <path class="curva" d="${[...Array(31)].map((_, i) => { const v = i * 4.4; return `${i ? 'L' : 'M'}${f1(80 + v * 6)},${f1(820 - v * v * 0.042)}`; }).join(' ')}" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
  const pt40 = box(cam, 90 + 80 + 240 - 22, 480 + 820 - 67 - 22, 44, 44, { zIndex: 3, borderRadius: '50%', background: '#fff', border: `8px solid ${INK}` });
  const pt120 = box(cam, 90 + 80 + 720 - 22, 480 + 820 - 605 - 22, 44, 44, { zIndex: 3, borderRadius: '50%', background: RED, border: `8px solid ${INK}` });
  const c40 = chip(cam, 200, 950, '40 km/h: casi nada', { size: 52, bg: VER, z: 4 }), c120 = chip(cam, 360, 400, '120: ¡un montón!', { size: 56, bg: RED, z: 4 });
  const crece = texto(c, 220, 'el freno CRECE', { size: 104, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  sp(T.crece, 'swoosh_up', 0.6); sp(T.casinada, 'pop', 0.5); sp(T.monton, 'thud', 0.7);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [480, 1100, 1.0], [640, 840, 1.08]);
    const cv = graf.querySelector('.curva'); if (cv) cv.setAttribute('stroke-dashoffset', f1(1 - p(t, T.crece, T.cientoveinte - T.crece + 0.4, E.inOutCubic)));
    set(crece, { o: 1, s: pop(t, L(6) - 0.1, 0.35), r: -2 + wobble(t, 0.5, 0.8) });
    set(pt40, { o: t > T.cuarenta ? 1 : 0, s: pop(t, T.cuarenta, 0.3) }); set(c40, { o: t > T.casinada - 0.1 ? 1 : 0, s: pop(t, T.casinada - 0.1, 0.35), r: -3 });
    set(pt120, { o: t > T.cientoveinte + 0.2 ? 1 : 0, s: pop(t, T.cientoveinte + 0.2, 0.3) * (1 + 0.1 * Math.sin(t * 8)) }); set(c120, { o: t > T.monton - 0.1 ? 1 : 0, s: pop(t, T.monton - 0.1, 0.35), r: 3 });
  };
});

/* L7-L9 (corte): la regla — una barra de velocidad 0-140: verde «VENTANILLA» en ciudad, zona «depende» 80-100, azul «AIRE» en autovía; el coche avanza por la barra.
   L9: dos coches, uno afilado y otro cuadrado: el afilado cambia antes */
plano(L(7) - 0.1, L(10) - 0.1, { background: '#d8eef8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#d8eef8' });
  const X = v => 90 + v * 900 / 140;
  const barra = box(cam, 90, 1000, 900, 120, { zIndex: 2, border: `10px solid ${INK}`, borderRadius: '30px', overflow: 'hidden', boxSizing: 'border-box',
    background: `linear-gradient(90deg, ${VER} 0 ${f1(80 / 1.4)}%, #f2c230 ${f1(80 / 1.4)}% ${f1(100 / 1.4)}%, ${AZ} ${f1(100 / 1.4)}% 100%)` });
  const marcas = [0, 50, 80, 100, 140].map(v => texto(cam, 1130, String(v), { size: 50, x: X(v) - 100, w: 200, z: 3 }));
  const zV = box(cam, X(0), 860, X(80) - X(0), 120, { zIndex: 3, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '62px', textAlign: 'center', color: VER, lineHeight: '120px' }, 'VENTANILLA');
  const zA = box(cam, X(100) - 40, 860, X(140) - X(100) + 40, 120, { zIndex: 3, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '62px', textAlign: 'center', color: AZ, lineHeight: '120px' }, 'AIRE');
  const zD = chip(cam, X(80) - 60, 1250, 'depende', { size: 48, bg: '#f2c230', color: INK, z: 4 });
  const car = COCHE(cam, 0, 0, 260, { abierta: 1, z: 6 }), carC = COCHE(cam, 0, 0, 260, { z: 6, col: '#9fd3c0' });
  const ciudad = box(cam, 90, 380, 400, 380, { zIndex: 2 }, `<svg viewBox="0 0 400 380" width="400" height="380">${[[0, 160, 110], [120, 60, 120], [250, 120, 130]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${380 - y}" fill="#c9bfa6" stroke="${INK}" stroke-width="7"/>${[0, 1, 2].map(j => `<rect x="${x + 22}" y="${y + 30 + j * 70}" width="${w - 44}" height="34" fill="#ffe9a6" stroke="${INK}" stroke-width="4"/>`).join('')}`).join('')}</svg>`);
  const senal = box(cam, 600, 400, 300, 300, { zIndex: 2 }, `<svg viewBox="0 0 300 300" width="300" height="300"><rect x="10" y="40" width="280" height="200" rx="26" fill="${AZ}" stroke="${INK}" stroke-width="9"/><text x="150" y="170" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="76" fill="#fff">AUTOVÍA</text></svg>`);
  const velo = VELO(c, 720, 1560, 280, 40);
  const gana = chip(c, 140, 260, 'en ciudad: gana la ventanilla', { size: 56, bg: VER, z: 40 });
  const tanto = chip(c, 100, 260, 'a 80-100 km/h: ¡tanto o más!', { size: 56, bg: AZ, z: 40 });
  // L9: aerodinámico vs. cuadrado
  const aero = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: '#efe1c6' });
  const afilado = box(aero, 100, 480, 880, 300, {}, `<svg viewBox="0 0 880 300" width="880" height="300"><path d="M40,230 Q60,150 260,120 Q420,40 600,90 Q800,140 840,230Z" fill="#e8507a" stroke="${INK}" stroke-width="10"/>${[230, 690].map(x => `<circle cx="${x}" cy="240" r="48" fill="#3d3a44" stroke="${INK}" stroke-width="9"/>`).join('')}</svg>`);
  const cuadrado = box(aero, 160, 920, 760, 360, {}, `<svg viewBox="0 0 760 360" width="760" height="360"><path d="M30,290 L30,60 L560,60 L620,150 L730,170 L730,290Z" fill="#9fd3c0" stroke="${INK}" stroke-width="10"/>${[180, 590].map(x => `<circle cx="${x}" cy="296" r="54" fill="#3d3a44" stroke="${INK}" stroke-width="9"/>`).join('')}</svg>`);
  const lA = chip(aero, 160, 790, 'aerodinámico: cierra antes', { size: 54, bg: '#e8507a', z: 2 }), lC = chip(aero, 160, 1540, 'cuadrado: aguanta más', { size: 54, bg: VER, z: 2 });
  const dep = texto(aero, 300, 'depende del coche', { size: 96, z: 3, shadow: '4px 4px 0 #fff' });
  const vientoA = [0, 1, 2].map(i => box(aero, 0, 520 + i * 70, 260, 40, { zIndex: 1 }, `<svg viewBox="0 0 260 40" width="260" height="40"><path d="M0,20 Q65,0 130,20 T260,20" stroke="${AZ}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`));
  sp(T.ciudad, 'ding', 0.5); sp(T.gana, 'tada', 0.5); sp(T.autovia, 'whoosh', 0.6); sp(T.tanto, 'thud', 0.6); sp(T.coche, 'swoosh_up', 0.6); sp(T.aero, 'pop', 0.5); sp(T.cerrar, 'click', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [540, 960, 0.95], [560, 980, 1.08]);
    // velocidad del coche a lo largo de la frase: ciudad (30-50) → autovía (≥100)
    const kv = p(t, T.autovia - 0.3, T.cien - T.autovia + 0.8, E.inOutCubic); const kmh = lerp(40, 115, kv) + Math.sin(t * 2) * 4;
    const auto = t > T.autovia - 0.3;
    set(car, { x: X(kmh) - 130, y: 740 + Math.sin(t * 9) * 3, o: auto && kmh > 95 ? 0 : 1 }); set(carC, { x: X(kmh) - 130, y: 740 + Math.sin(t * 9) * 3, o: auto && kmh > 95 ? 1 : 0 });
    giraRuedas(car, t, 1 + kv); giraRuedas(carC, t, 1 + kv); aguja(velo, kmh); set(velo, { o: t > T.coche - 0.4 ? 0 : 1 });
    set(ciudad, { o: auto ? 1 - kv : 1, y: kv * 40 }); set(senal, { o: auto ? kv : 0, s: 0.8 + 0.2 * kv });
    set(zV, { s: t > T.gana - 0.1 && !auto ? 1 + 0.06 * Math.sin(t * 6) : 1 }); set(zA, { s: t > T.tanto - 0.1 ? 1 + 0.06 * Math.sin(t * 6) : 1 });
    set(zD, { o: t > T.ochenta - 0.1 ? 1 : 0, s: pop(t, T.ochenta - 0.1, 0.35), r: -4 });
    set(gana, { o: t > T.gana - 0.2 && t < T.autovia - 0.3 ? 1 : 0, s: pop(t, T.gana - 0.2, 0.35), r: -3 });
    set(tanto, { o: t > T.tanto - 0.2 && t < T.coche - 0.3 ? 1 : 0, s: pop(t, T.tanto - 0.2, 0.35), r: 3 });
    // L9 entra desde la derecha y se queda
    const ka = p(t, T.coche - 0.4, 0.5, E.outCubic); set(aero, { o: t > T.coche - 0.4 ? 1 : 0, x: (1 - ka) * 1080, s: 1 + 0.05 * clamp((t - T.coche) / 4) });
    set(dep, { r: -2 + wobble(t, 0.5, 0.8) });
    set(afilado, { y: Math.sin(t * 6) * 3 }); set(cuadrado, { y: Math.sin(t * 6 + 1) * 3 });
    vientoA.forEach((w, i) => set(w, { x: 900 - ((t * 800 + i * 300) % 1100) }));
    set(lA, { o: t > T.aero - 0.1 ? 1 : 0, s: pop(t, T.aero - 0.1, 0.35), r: -3 }); set(lC, { o: t > T.cerrar - 0.1 ? 1 : 0, s: pop(t, T.cerrar - 0.1, 0.35), r: 3 });
  };
});

/* L10 (corte): la regla de bolsillo — ciudad = ventanilla, autovía = aire; el padre protesta y el hijo le enseña el móvil */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#fff6c8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'radial-gradient(circle at 540px 900px, #ffe9a6, #fff6c8 60%)' });
  const fila = (y, txt, ico, col) => box(cam, 80, y, 920, 230, { zIndex: 3, background: '#fff', border: `10px solid ${INK}`, borderRadius: '40px', boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '78px', color: col, lineHeight: '210px', paddingLeft: '250px', boxSizing: 'border-box' }, `<div style="position:absolute;left:40px;top:22px">${ico}</div>${txt}`);
  const f1r = fila(380, 'CIUDAD', VENT(170), VER), f2r = fila(680, 'AUTOVÍA', COPO(170), AZ);
  const e1 = chip(cam, 600, 560, 'ventanilla', { size: 50, bg: VER, z: 4 }), e2 = chip(cam, 680, 860, 'aire', { size: 50, bg: AZ, z: 4 });
  const padre = PERS(cam, 60, 1100, 420, { ropa: '#2b3550', pelo: 'corto', pcol: '#4a4a4a', bigote: true });
  const hijo = PERS(cam, 560, 1160, 360, { ropa: '#f2c230', pelo: 'corto', pcol: '#3a2a1e' });
  const movil = box(cam, 560, 1300, 110, 190, { zIndex: 12, background: '#1d1a22', border: `6px solid ${INK}`, borderRadius: '18px' }, `<div style="margin:12px;height:150px;border-radius:8px;background:${AZ}"></div>`);
  const pro = chip(c, 80, 1000, '«¡Pero que gasta!»', { size: 52, bg: INK, color: YEL, z: 40 });
  sp(T.ciudad2, 'pop', 0.5); sp(T.autovia2, 'pop', 0.5); sp(T.protesta, 'boing', 0.5); sp(T.video, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(10) - 0.1, L(11) - 0.1, [540, 900, 0.95], [540, 1000, 1.08]);
    set(f1r, { o: t > T.ciudad2 - 0.2 ? 1 : 0, s: pop(t, T.ciudad2 - 0.2, 0.35), r: -1.5 }); set(f2r, { o: t > T.autovia2 - 0.2 ? 1 : 0, s: pop(t, T.autovia2 - 0.2, 0.35), r: 1.5 });
    set(e1, { o: t > T.ciudad2 + 0.3 ? 1 : 0, s: pop(t, T.ciudad2 + 0.3, 0.3), r: -4 }); set(e2, { o: t > T.autovia2 + 0.3 ? 1 : 0, s: pop(t, T.autovia2 + 0.3, 0.3), r: 4 });
    pFace(padre, t, { feliz: t > T.video ? -0.2 : -0.6, ceja: t > T.video ? 16 : 10, jaw: t > T.protesta && t < T.video ? 0.4 + 0.3 * Math.abs(Math.sin(t * 12)) : 0, look: [16, 0], seed: 1 }); set(padre, { y: wobble(t, 0.6, 4) });
    pFace(hijo, t, { feliz: 1, look: [-14, 0], seed: 2 }); set(hijo, { y: wobble(t, 0.7, 4, 1) });
    set(movil, { o: t > T.video - 0.2 ? 1 : 0, y: t > T.video - 0.2 ? -lerp(0, 120, p(t, T.video - 0.2, 0.4, E.outBack)) : 0, r: -10 });
    set(pro, { o: t > T.protesta - 0.1 && t < T.video ? 1 : 0, s: pop(t, T.protesta - 0.1, 0.35), r: -3 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿En tu coche quién', 'manda en el aire?', { size: 88, draw: c => [['mi padre, siempre', YEL], ['yo, y a tope', PINK], ['ventanilla y a correr', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 240 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(110, 'Ventanilla o aire', ['COCHES', 'y mitos']);

Story.run({
  textura: true,
  ovalo: [[T.video + 0.3, L(11) - 0.15]],
  vecino: { risa: [[T.protesta, L(11) - 0.2]], sorpresa: [[T.tanto, T.tanto + 1]], golpes: [] },
});
