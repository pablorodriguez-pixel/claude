/* Ep. 96 · «En Madrid se conducía por la IZQUIERDA» — FORMATO NUEVO (cuento continuo). Mundo visto desde arriba (Barcelona → carretera → Madrid) que la cámara
   recorre en UNA sola dirección; cortes duros solo a la norma, al bando, al cambio de lado y al Metro. Cámara siempre en movimiento lento (nada de paradas ni idas y venidas). */
Story.prepara();
const T = {
  izquierda0: Q('izquierda'), londres: Q('londres'),
  sitio: Q('un sitio'), todavia: Q('todavía se hace'),
  siglo: Q('siglo veinte'), barcelona: Q('en barcelona'), derecha2: Q('la derecha'), pero2: Q('pero en madrid'), izq2: Q('por la izquierda'),
  sales: Q('cuando sales'), cambiarte: Q('cambiarte de lado'), mitad: Q('en mitad'),
  claro: Q('y claro'), sustos: Q('sustos'), choques: Q('choques'), accidentes: Q('accidentes'),
  dieciocho: Q('dieciocho'), norma: Q('una norma'), derecha5: Q('la derecha'), excepcion: Q('una excepción'), agarra: Q('se agarra'),
  veinticuatro: Q('veinticuatro'), gobernador: Q('el gobernador'), basta: Q('basta'),
  bando: Q('un bando'), abril: Q('diez de abril'), todos7: Q('todo el mundo'), derecha7: Q('a la derecha'),
  diaese: Q('ese día'), entero: Q('madrid entero'), lado8: Q('de lado'),
  menos: Q('menos uno'), metro9: Q('el metro'), cinco: Q('cinco años'), fortuna: Q('una fortuna'),
  coges: Q('coges el metro'), fijate: Q('fíjate'), izq10: Q('la izquierda'), cien: Q('cien años'), enterado: Q('se ha enterado'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
/* el mundo visto desde arriba: x 0..1400; carretera vertical; Barcelona arriba, Madrid abajo */
const RX = 700, XI = 610, XD = 790, BCN = [200, 1700], MAD = [3900, 5800], LIM = 3800;
const COCHE = (c, col, o = {}) => { const w = o.w || 96, h = w * 1.7; return box(c, 0, 0, w, h, { zIndex: o.z || 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 170" width="${w}" height="${h}">
  ${[[2, 22], [82, 22], [2, 114], [82, 114]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="34" rx="5" fill="${INK}"/>`).join('')}
  <rect x="10" y="6" width="80" height="158" rx="26" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M22,48 Q50,34 78,48 L72,70 Q50,62 28,70 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="4"/>
  <rect x="26" y="80" width="48" height="56" rx="10" fill="rgba(0,0,0,.14)"/><circle cx="26" cy="14" r="6" fill="#fff6c8" stroke="${INK}" stroke-width="3"/><circle cx="74" cy="14" r="6" fill="#fff6c8" stroke="${INK}" stroke-width="3"/></svg>`); };
const BUS = c => box(c, 0, 0, 120, 300, { zIndex: 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 120 300" width="120" height="300"><rect x="6" y="6" width="108" height="288" rx="18" fill="#c8102e" stroke="${INK}" stroke-width="7"/><rect x="20" y="24" width="80" height="40" rx="8" fill="#bfe3f5" stroke="${INK}" stroke-width="4"/>${[90, 140, 190, 240].map(y => `<rect x="22" y="${y}" width="76" height="30" rx="6" fill="rgba(255,255,255,.3)"/>`).join('')}</svg>`);
const pon = (car, x, y, r = 0) => { const w = parseFloat(car.style.width), h = parseFloat(car.style.height); set(car, { x: x - w / 2, y: y - h / 2, r }); };
const ROMBO = (w = 260) => `<svg viewBox="0 0 260 260" width="${w}" height="${w}"><path d="M130,6 L254,130 L130,254 L6,130 Z" fill="#c8102e" stroke="${INK}" stroke-width="8"/><path d="M130,40 L220,130 L130,220 L40,130 Z" fill="#fff"/><rect x="18" y="104" width="224" height="52" fill="#1f4fa0" stroke="${INK}" stroke-width="5"/><text x="130" y="144" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="#fff">METRO</text></svg>`;

function ciudad(c) {
  const M = MUNDO(c, 1400, 6000); M.sky.style.background = '#8fb46a';
  box(M.w, 0, 0, 1400, 6000, { zIndex: 1, background: '#8fb46a', backgroundImage: 'radial-gradient(rgba(60,90,40,.25) 6px, transparent 7px)', backgroundSize: '90px 90px' });
  [BCN, MAD].forEach(([a, b]) => { box(M.w, 0, a - 60, 1400, b - a + 120, { zIndex: 2, background: '#d8cdb8' });
    for (let y = a; y < b; y += 260) [[40, 400], [960, 400]].forEach(([x, w], j) => box(M.w, x + (j ? 0 : 0), y, w, 200, { zIndex: 3, background: ['#c87a3a', '#b5523a', '#e9c79a', '#a8452e'][((y / 260) | 0 + j) % 4], border: `7px solid ${INK}`, borderRadius: '10px', boxShadow: '10px 10px 0 rgba(0,0,0,.18)' })); });
  box(M.w, RX - 190, 0, 380, 6000, { zIndex: 4, background: '#6d6a72', borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}` });
  box(M.w, RX - 4, 0, 8, 6000, { zIndex: 5, backgroundImage: 'repeating-linear-gradient(#f4efe2 0 60px, transparent 60px 120px)' });
  for (let y = 1900; y < 3700; y += 240) [180, 1220].forEach(x => box(M.w, x - 60, y + (x > 700 ? 120 : 0), 120, 120, { zIndex: 3, borderRadius: '50%', background: '#4f7a3a', border: `6px solid ${INK}` }));
  ROTULO(M.w, 920, BCN[0] + 40, 'BARCELONA', '', { w: 440, size: 64, z: 6 });
  ROTULO(M.w, 900, MAD[0] + 60, 'MADRID', '', { w: 380, size: 70, z: 6 });
  const lim = box(M.w, 920, LIM - 70, 300, 120, { zIndex: 6, background: '#f2c230', border: `7px solid ${INK}`, fontFamily: 'Rye', fontSize: '52px', textAlign: 'center', lineHeight: '106px', color: INK }, 'MADRID');
  return { M };
}
/* tráfico de una zona: coches que suben y bajan en bucle; regla 'izq' (Madrid) o 'der'; k = 0..1 cambio de izq a der */
function trafico(Mw, zona, n, cols) { return [...Array(n)].map((_, i) => ({ car: COCHE(Mw, cols[i % cols.length]), sube: i % 2 === 0, ph: i / n, v: 150 + (i % 3) * 25, zona })); }
const mueve = (TR, t, k) => TR.forEach((q, i) => { const [a, b] = q.zona, Lz = b - a, d = ((q.ph * Lz + t * q.v) % Lz);
  const y = q.sube ? b - d : a + d, ki = typeof k === 'function' ? k(i) : k, x = q.sube ? lerp(XI, XD, ki) : lerp(XD, XI, ki);
  const o = clamp(Math.min(y - a, b - y) / 120); pon(q.car, x, y, q.sube ? 0 : 180); q.car.style.opacity = f1(o); });

/* PORTADA + L1 (Madrid desde arriba, sin cortar): los coches van por la izquierda, un autobús rojo «de Londres» → «un sitio donde todavía se hace»: el rombo del Metro con «?» */
plano(-1, L(2) - 0.1, { background: '#8fb46a' }, c => {
  const W = ciudad(c);
  const TR = trafico(W.M.w, [MAD[0] - 300, MAD[1]], 8, ['#2b8ad6', '#f2c230', '#e8507a', '#9fd3c0', '#f4efe2']); const bus = BUS(W.M.w);
  const t1 = texto(c, 190, 'EN MADRID SE CONDUCÍA', { size: 70, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 290, 'POR LA ' + hlSpan('IZQUIERDA', 'phl'), { size: 92, color: '#fff', z: 40, shadow: OUT });
  const fl = box(c, 0, 0, 170, 170, { zIndex: 30, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="170" height="170"><path d="M50,6 L92,50 H66 V94 H34 V50 H8 Z" fill="${YEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" transform="rotate(0 50 50)"/></svg>`);
  const lon = chip(c, 560, 430, 'como en Londres', { size: 50, bg: '#c8102e', z: 41 });
  const rombo = box(c, 410, 760, 260, 260, { zIndex: 42, transformOrigin: '50% 50%' }, ROMBO());
  const qm = texto(c, 1010, '¿?', { size: 130, color: YEL, z: 43, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.izquierda0, 'thud', 0.8); sp(T.londres, 'bell', 0.5); sp(T.sitio, 'pop', 0.6); sp(T.todavia, 'ding', 0.6);
  return t => {
    camara(W.M, t, [[-1, RX, 4500, 0.66], [L(2), RX, 4380, 0.8]]); mueve(TR, t, 0);
    const yb = 4900 - ((t * 140) % 900); pon(bus, XI, yb, 0);
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
    const fuera = p(t, T.sitio - 0.2, 0.3); set(t1, { o: 1 - fuera }); set(t2, { o: 1 - fuera, r: -2 + wobble(t, 0.5, 0.8) });
    set(fl, { o: 1 - fuera, x: 395, y: 980 - ((t * 120) % 160) });
    set(lon, { o: t > T.londres - 0.1 && t < T.sitio - 0.1 ? 1 : 0, s: pop(t, T.londres - 0.1, 0.3), r: -4 });
    set(rombo, { o: t > T.sitio ? 1 : 0, s: pop(t, T.sitio, 0.4) * (1 + 0.04 * Math.sin(t * 5)), r: Math.sin(t * 2) * 4 });
    set(qm, { o: t > T.todavia ? 1 : 0, s: pop(t, T.todavia, 0.3), r: 6 });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L5), un solo mundo y una sola dirección: Barcelona (por la derecha) → la cámara baja por la carretera → Madrid (por la izquierda)
   → un coche sale de Madrid, cruza el cartel y se cambia de lado → choca con uno que no se ha cambiado */
plano(L(2) - 0.1, L(5) - 0.1, { background: '#8fb46a' }, c => {
  const W = ciudad(c);
  const cols = ['#2b8ad6', '#e8507a', '#9fd3c0', '#f4efe2', '#7a5aa8'];
  const TB = trafico(W.M.w, BCN, 6, cols), TM = trafico(W.M.w, MAD, 6, cols);
  const yo = COCHE(W.M.w, '#f2c230', { z: 10 }), otro = COCHE(W.M.w, '#3d3a44', { z: 10 });
  const chip_ = chip(c, 380, 420, 'Principios del siglo XX', { size: 50, bg: '#2b3550' });
  const ok = texto(c, 1180, 'por la DERECHA', { size: 80, color: '#fff', z: 40, shadow: OUT }), mal = texto(c, 1180, 'por la IZQUIERDA', { size: 80, color: YEL, z: 40, shadow: OUT });
  const pii = BOCADILLO(W.M.w, 0, 0, '¡PIII!', { size: 54 }), pum = texto(W.M.w, 0, '¡PUM!', { size: 170, color: RED, x: 0, w: 600, z: 30, shadow: `6px 6px 0 ${INK}, -3px -3px 0 #fff` });
  const est = [0, 1, 2].map(() => texto(W.M.w, 0, '✦', { size: 70, color: YEL, x: 0, w: 100, z: 31, shadow: `3px 3px 0 ${INK}` }));
  sp(T.siglo, 'whoosh', 0.4); sp(T.derecha2, 'ding', 0.5); sp(T.izq2, 'boing', 0.6); sp(T.cambiarte, 'swoosh_up', 0.5); sp(T.sustos, 'error', 0.4); sp(T.choques, 'burst', 0.9); sp(T.accidentes, 'thud', 0.6);
  // el coche amarillo sube desde Madrid; pasa el cartel y se cambia al carril derecho; el gris baja «a la madrileña» por ese mismo carril
  const y0 = 4500, v = 170, yYo = t => y0 - v * (t - L(3) + 0.1), yC = yYo(T.choques);
  return t => {
    const tc = Math.min(t, T.choques), ys = yYo(tc) + (t > T.choques ? p(t, T.choques, 0.4, E.outCubic) * 50 : 0);
    camara(W.M, t, [[L(2) - 0.1, RX, 900, 0.7], [T.derecha2 + 0.3, RX, 1250, 0.66], [T.pero2, RX, 2900, 0.45], [T.izq2 + 0.4, RX, 4450, 0.7], [L(3), RX, 4480, 0.74],
      [T.choques, RX, yC - 40, 0.95], [L(5), RX, yC - 70, 1.05]]);
    mueve(TB, t, 1); mueve(TM, t, 0);
    rotuloA(chip_, t, T.siglo, T.barcelona);
    set(ok, { o: t > T.barcelona && t < T.pero2 ? 1 : 0, s: pop(t, T.barcelona, 0.3) }); set(mal, { o: t > T.pero2 && t < L(3) ? 1 : 0, s: pop(t, T.pero2, 0.3) });
    const vis = t > L(3) - 0.1; yo.style.visibility = otro.style.visibility = vis ? 'visible' : 'hidden';
    const kx = p(t, T.mitad - 0.3, 0.9, E.inOutCubic), xs = lerp(XI, XD, kx);
    pon(yo, xs, ys, t > T.choques ? 30 * p(t, T.choques, 0.5, E.outCubic) : (kx > 0 && kx < 1 ? 12 : 0));
    const yo2 = t < T.choques ? yC - 175 - 230 * (T.choques - t) : yC - 175 - p(t, T.choques, 0.4, E.outCubic) * 60;
    pon(otro, XD, yo2, 180 - (t > T.choques ? 35 * p(t, T.choques, 0.5, E.outCubic) : 0));
    set(pii, { o: t > T.sustos - 0.2 && t < T.choques ? 1 : 0, x: XD + 70, y: yC - 420, s: pop(t, T.sustos - 0.2, 0.3), r: 5 });
    set(pum, { o: t > T.choques ? 1 : 0, x: XD - 400, y: yC - 380, s: t > T.choques ? lerp(1.8, 1, p(t, T.choques, 0.2)) : 0, r: -6 });
    est.forEach((e, i) => { const a = t * 4 + i * 2.1; set(e, { o: t > T.choques + 0.2 ? 1 : 0, x: XD - 50 + Math.cos(a) * 110, y: yC - 220 + Math.sin(a) * 40 }); });
  };
}, { sfx: false });
shakeAt(T.choques, 0.35, 16);

/* ACTO 2 (L5): la norma de 1918 (corte): POR LA DERECHA… con un asterisco; «Madrid» se agarra a él. Empuje lento hacia el asterisco */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#e9e2cf' }, c => {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#e9e2cf', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.05) 0 2px, transparent 2px 40px)' });
  const doc = box(cam, 120, 420, 840, 900, { zIndex: 2, background: '#fbf6ea', border: `8px solid ${INK}`, boxShadow: `14px 14px 0 rgba(0,0,0,.25)` },
    `<div style="font-family:Playfair;font-weight:900;font-size:56px;text-align:center;margin-top:40px;color:${INK}">REGLAMENTO · 1918</div>
     <div style="height:6px;background:${INK};margin:20px 60px"></div>
     <div style="font-family:SpecialElite;font-size:46px;text-align:center;margin-top:60px;color:${INK}">En toda España, los vehículos<br>circularán</div>
     <div style="font-family:Rye;font-size:96px;text-align:center;margin-top:30px;color:${INK}">POR LA <span style="position:relative;display:inline-block;z-index:0"><span class="dhl" style="position:absolute;left:-8px;right:-8px;bottom:4%;height:44%;background:${YEL};z-index:-1;transform-origin:left center;transform:scaleX(0)"></span>DERECHA</span><span class="ast" style="display:inline-block;color:${RED}">*</span></div>
     <div class="pie" style="font-family:SpecialElite;font-size:36px;text-align:center;margin-top:170px;color:${INK}">* salvo los municipios con normas propias</div>`);
  const ast = doc.querySelector('.ast'), pie = doc.querySelector('.pie');
  const circ = box(cam, 150, 1130, 780, 120, { zIndex: 3, border: `7px solid ${RED}`, borderRadius: '50%', opacity: 0 });
  const mad = PERS(cam, 640, 1180, 300, { ropa: '#3d3a44', gorro: 'gorra', gcol: '#3d3a44', bigote: true, pelo: 'corto', pcol: '#2a2118' });
  const tag = chip(cam, 690, 1150, 'MADRID', { size: 48, bg: RED, z: 20 });
  const cor = box(cam, 0, 0, 90, 82, { zIndex: 21 }, `<svg viewBox="0 0 240 220" width="90" height="82"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="12"/></svg>`);
  sp(T.dieciocho, 'paper', 0.7); sp(T.derecha5, 'stamp', 0.8); sp(T.excepcion, 'click', 0.7); sp(T.agarra, 'boing', 0.7);
  return t => {
    const k = clamp((t - L(5) + 0.1) / (L(6) - L(5))), cx = lerp(540, 540, k), cy = lerp(900, 1150, k), s = lerp(1.0, 1.3, k);
    cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s });
    const hl = doc.querySelector('.dhl'); if (hl) hl.style.transform = `scaleX(${f1(p(t, T.derecha5, 0.35) * 1000) / 1000}) rotate(-1.2deg)`;
    ast.style.transform = `scale(${f1(1 + 1.2 * pop(t, T.excepcion, 0.4) * (t > T.excepcion ? 1 : 0))})`; pie.style.color = t > T.excepcion ? RED : INK;
    circ.style.opacity = t > T.excepcion + 0.2 ? 1 : 0; set(circ, { o: t > T.excepcion + 0.2 ? 1 : 0, s: pop(t, T.excepcion + 0.2, 0.35), r: -2 });
    const km = p(t, T.agarra - 0.3, 0.5, E.outBack); set(mad, { y: (1 - km) * 500, r: -10 + Math.sin(t * 3) * 3, o: t > T.agarra - 0.3 ? 1 : 0 }); pFace(mad, t, { feliz: 1, closed: t > T.agarra + 0.4, look: [-14, -6] });
    set(tag, { o: t > T.agarra ? 1 : 0, s: pop(t, T.agarra, 0.3), r: 6 });
    set(cor, { o: t > T.agarra + 0.2 ? 1 : 0, x: 600, y: 1000 - p(t, T.agarra + 0.2, 1.2) * 100, s: pop(t, T.agarra + 0.2, 0.3) });
  };
});

/* ACTO 3 (L6 → L8): la calle (corte): el gobernador dice «¡BASTA!» → el bando en la pared, línea a línea. La cámara se desliza despacio del gobernador al bando */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#e9dcc2' }, c => {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#e9dcc2', backgroundImage: 'linear-gradient(rgba(43,33,24,.18) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.12) 4px, transparent 4px)', backgroundSize: '120px 60px, 240px 120px' });
  box(cam, 0, 1420, 1080, 500, { zIndex: 1, background: '#b8a07a', borderTop: `10px solid ${INK}` });
  const bando = box(cam, 70, 470, 520, 760, { zIndex: 3, background: '#fbf6ea', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 rgba(0,0,0,.25)`, transformOrigin: '50% 0' },
    `<div style="font-family:Rye;font-size:84px;text-align:center;margin-top:30px;color:${RED}">BANDO</div><div style="height:5px;background:${INK};margin:10px 40px 30px"></div>
     <div class="b1" style="font-family:SpecialElite;font-size:40px;text-align:center;color:${INK};opacity:0">Desde el</div>
     <div class="b2" style="font-family:Playfair;font-weight:900;font-size:66px;text-align:center;color:${INK};opacity:0">10 de ABRIL<br>de 1924</div>
     <div class="b3" style="font-family:Rye;font-size:60px;text-align:center;margin-top:40px;color:${INK};opacity:0">TODOS A LA<br><span style="color:${RED}">DERECHA</span></div>`);
  const b1 = bando.querySelector('.b1'), b2 = bando.querySelector('.b2'), b3 = bando.querySelector('.b3');
  const gob = PERS(cam, 620, 760, 380, { ropa: '#2b3550', gorro: 'gorra', gcol: '#2b3550', bigote: true, pelo: 'calvo', pcol: '#6b6a74', piernas: true, calzas: '#2b3550' });
  const eG = ETIQUETA(c, 'DUQUE DE TETUÁN', 'gobernador de Madrid');
  const basta = texto(cam, 560, '¡BASTA!', { size: 150, color: RED, x: 480, w: 600, z: 20, shadow: `6px 6px 0 ${INK}` });
  const chip_ = chip(c, 420, 420, '1924', { size: 64, bg: '#2b3550' });
  sp(T.veinticuatro, 'whoosh', 0.4); sp(T.basta, 'stamp', 1); sp(T.bando, 'paper', 0.8); sp(T.abril, 'click', 0.6); sp(T.derecha7, 'ding', 0.7);
  return t => {
    const k = clamp((t - L(6) + 0.1) / (L(8) - L(6))), cx = lerp(700, 380, E.inOutCubic(k)), cy = lerp(1000, 900, k), s = lerp(1.0, 1.28, k);
    cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s });
    rotuloA(chip_, t, T.veinticuatro, T.bando);
    pFace(gob, t, { feliz: t > T.basta ? -0.5 : 0.1, ceja: t > T.basta ? -16 : 0, jaw: t > T.basta && t < T.basta + 0.6 ? 0.9 : 0, look: [-12, 0] });
    etiquetaA(eG, t, T.gobernador, T.basta + 0.1, [cx, cy, s], 810, 900, -260);
    set(basta, { o: t > T.basta - 0.05 && t < T.bando ? 1 : 0, s: t > T.basta ? lerp(1.8, 1, p(t, T.basta - 0.05, 0.2)) : 0, r: -6 });
    set(bando, { o: t > T.bando - 0.2 ? 1 : 0, r: lerp(-14, -2, p(t, T.bando - 0.2, 0.4, E.outBack)), s: lerp(0.6, 1, p(t, T.bando - 0.2, 0.4, E.outBack)) });
    b1.style.opacity = b2.style.opacity = t > T.abril - 0.3 ? 1 : 0; b3.style.opacity = t > T.todos7 - 0.1 ? 1 : 0;
  };
});
shakeAt(T.basta, 0.3, 14);

/* ACTO 4 (L8): Madrid desde arriba (corte): TODOS los coches se cambian de lado a la vez */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#8fb46a' }, c => {
  const W = ciudad(c);
  const TM = trafico(W.M.w, [MAD[0] - 300, MAD[1]], 10, ['#2b8ad6', '#f2c230', '#e8507a', '#9fd3c0', '#f4efe2', '#7a5aa8']);
  const der = texto(c, 1180, '¡A LA DERECHA!', { size: 96, color: '#fff', z: 40, shadow: OUT });
  sp(T.entero, 'swoosh_up', 0.7); sp(T.lado8, 'tada', 0.7);
  return t => {
    camara(W.M, t, [[L(8) - 0.1, RX, 4700, 0.6], [L(9), RX, 4560, 0.7]]);
    mueve(TM, t, i => p(t, T.entero - 0.1 + i * 0.07, 0.9, E.inOutCubic));
    set(der, { o: t > T.lado8 - 0.1 ? 1 : 0, s: pop(t, T.lado8 - 0.1, 0.35), r: -3 });
  };
});

/* ACTO 5 (L9 → L11): el Metro (corte), visto desde arriba: los trenes van por la IZQUIERDA… cien años después. El tren, dormido: «no se ha enterado» */
plano(L(9) - 0.1, L(11) - 0.1, { background: '#2a2530' }, c => {
  const cam = CAM(c);
  box(cam, 0, -200, 1080, 2400, { zIndex: 0, background: '#2a2530' });
  [[0, 230], [850, 230]].forEach(([x, w]) => box(cam, x, -200, w, 2400, { zIndex: 1, background: '#d8d2c4', backgroundImage: 'linear-gradient(rgba(43,33,24,.15) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.15) 3px, transparent 3px)', backgroundSize: '60px 60px', borderLeft: x ? `8px solid ${INK}` : 'none', borderRight: x ? 'none' : `8px solid ${INK}` }));
  [[230, 0], [850, 0]].forEach(([x]) => box(cam, x - (x > 500 ? 30 : 0), -200, 30, 2400, { zIndex: 2, background: '#f2c230' }));
  const via = x => box(cam, x - 70, -200, 140, 2400, { zIndex: 2, borderLeft: `8px solid #9a9a9a`, borderRight: `8px solid #9a9a9a`, backgroundImage: 'repeating-linear-gradient(#5a4a3a 0 16px, transparent 16px 60px)' });
  via(400); via(680);
  const TREN = (z) => box(cam, 0, 0, 170, 1100, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 170 1100" width="170" height="1100">${[0, 1, 2].map(i => `<rect x="8" y="${8 + i * 362}" width="154" height="350" rx="${i ? 14 : 50}" fill="#f4efe2" stroke="${INK}" stroke-width="7"/><rect x="8" y="${150 + i * 362}" width="154" height="26" fill="#c8102e"/>`).join('')}
    <g class="cara"><ellipse cx="58" cy="60" rx="18" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="112" cy="60" rx="18" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><path class="par" d="M40,60 H76 M94,60 H130" stroke="${INK}" stroke-width="7" opacity="0"/><circle class="pu" cx="58" cy="62" r="7" fill="${INK}"/><circle class="pu" cx="112" cy="62" r="7" fill="${INK}"/></g></svg>`);
  const sube = TREN(5), baja = TREN(5);
  const par = sube.querySelector('.par'), pus = [...sube.querySelectorAll('.pu')];
  const rombo = box(cam, 60, 300, 220, 220, { zIndex: 9, transformOrigin: '50% 50%' }, ROMBO(220));
  const abierto = chip(cam, 560, 420, 'abierto en 1919', { size: 50, bg: '#1f4fa0', z: 12 });
  const caro = chip(cam, 470, 520, 'cambiarlo: carísimo', { size: 50, bg: RED, z: 12 });
  const fl = texto(cam, 1180, 'IZQUIERDA', { size: 92, color: YEL, x: 240, w: 800, z: 20, shadow: OUT }); const fl2 = box(cam, 0, 0, 170, 170, { zIndex: 20, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="170" height="170"><path d="M50,6 L92,50 H66 V94 H34 V50 H8 Z" fill="${YEL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round" transform="rotate(-90 50 50)"/></svg>`);
  const cien = chip(cam, 600, 300, '1924 → HOY', { size: 56, bg: INK, color: YEL, z: 12 });
  const zz = texto(cam, 0, 'Zzz', { size: 70, italic: true, color: '#fff', x: 0, w: 200, z: 21, shadow: `3px 3px 0 ${INK}` });
  sp(L(9) - 0.1, 'whoosh', 0.5); sp(T.metro9, 'ding', 0.7); sp(T.cinco, 'pop', 0.5); sp(T.fortuna, 'pop', 0.5); sp(T.fijate, 'swoosh_up', 0.6); sp(T.izq10, 'stamp', 0.9); sp(T.cien, 'tick', 0.6); sp(T.enterado, 'boing', 0.7);
  return t => {
    zoom(cam, t, L(9), L(11) - L(9), 0.14);
    // el tren que sube (vía izquierda) entra y frena en la estación; el que baja (vía derecha) pasa en bucle
    const ks = p(t, L(9) - 0.1, T.fijate - L(9) + 0.6, E.outCubic); pon(sube, 400, lerp(2600, 1150, ks), 0);
    const yb = -1300 + ((t - L(9)) * 420) % 3600; pon(baja, 680, yb, 180);
    const dorm = t > T.enterado - 0.1; par.setAttribute('opacity', dorm ? 1 : 0); pus.forEach(q => q.setAttribute('opacity', dorm ? 0 : 1));
    set(rombo, { o: t > T.metro9 - 0.1 ? 1 : 0, s: pop(t, T.metro9 - 0.1, 0.4), r: Math.sin(t * 2) * 4 });
    set(abierto, { o: t > T.cinco && t < T.coges ? 1 : 0, s: pop(t, T.cinco, 0.3), r: -3 }); set(caro, { o: t > T.fortuna && t < T.coges ? 1 : 0, s: pop(t, T.fortuna, 0.3), r: 3 });
    set(fl, { o: t > T.izq10 - 0.15 ? 1 : 0, s: t > T.izq10 - 0.15 ? lerp(1.6, 1, p(t, T.izq10 - 0.15, 0.25)) : 0, r: -3 }); set(fl2, { o: t > T.izq10 - 0.15 ? 1 : 0, x: 500 + Math.sin(t * 5) * 14, y: 1000 });
    set(cien, { o: t > T.cien - 0.1 ? 1 : 0, s: pop(t, T.cien - 0.1, 0.3), r: 4 });
    set(zz, { o: dorm ? 1 : 0, x: 470, y: 520 - ((t * 0.6) % 1) * 100 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú te habías', 'dado cuenta?', { size: 88, draw: c => [['sí, siempre', YEL], ['nunca', PINK], ['mañana me fijo', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(96, 'Madrid por la izquierda', ['TRÁFICO', 'y Metro']);

Story.run({
  textura: true,
  ovalo: [[T.cien - 0.2, L(11) - 0.15]],
  vecino: { risa: [[T.enterado, T.enterado + 1.2]], sorpresa: [], golpes: [] },
});
