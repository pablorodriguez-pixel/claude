/* Ep. 104 · «¿750 metros? Toca desviarse» — los carteles de gasolinera de las autovías (Norma 8.1-IC, apartado 9.24.1.1).
   Autovía vista desde arriba; el coche sube y la cámara lo sigue en UNA dirección. Caso A: gasolinera con salida propia (carteles a 1.000 y 500 m).
   Caso B: salida compartida con un pueblo: los carteles de la salida ocupan 1.000 y 500, así que los de la gasolinera se adelantan a 750 y 250. */
Story.prepara();
const T = {
  setecientos0: Q('setecientos cincuenta'), desviarse: Q('toca desviarse'),
  mil1: Q('mil o quinientos'), autovia1: Q('en la autovía'), porque1: Q('por qué'),
  salida2: Q('cada salida'), mil2: Q('a mil metros'), quinientos2: Q('a quinientos'),
  propia: Q('su propia salida'), justo: Q('justo ahí'), pegada: Q('pegada'),
  fuera: Q('están fuera'), pueblo: Q('en un pueblo'), misma: Q('la misma salida'),
  lio: Q('el lío'), cartel5: Q('el cartel de esa salida'), prohibe: Q('prohíbe mezclarlos'),
  adelanta: Q('se adelanta'), a750: Q('a setecientos cincuenta'), a250: Q('y a doscientos cincuenta'),
  osea: Q('o sea'), redondos: Q('mil y quinientos'), s750: Q('setecientos cincuenta y doscientos'), desvio: Q('desvío'),
  ojo: Q('y ojo'), salir8: Q('salir repostar'), cinco: Q('cinco kilómetros'),
  reserva: Q('en reserva'), precio: Q('el precio'), metros9: Q('mira los metros'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZ = '#1f4fa0';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* señal S-105 (gasolinera) con su panel de distancia debajo (300 × 420) */
const S105 = (c, dist, z = 8) => box(c, 0, 0, 300, 420, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 420" width="300" height="420" style="overflow:visible">
  <rect x="6" y="6" width="288" height="288" rx="18" fill="${AZ}" stroke="#fff" stroke-width="10"/><rect x="2" y="2" width="296" height="296" rx="20" fill="none" stroke="${INK}" stroke-width="4"/>
  <rect x="60" y="40" width="180" height="220" rx="12" fill="#fff"/><g transform="translate(95 70)"><rect x="0" y="0" width="80" height="140" rx="8" fill="${AZ}"/><rect x="14" y="16" width="52" height="34" fill="#fff"/><path d="M80,40 h24 v80 h-14" stroke="${AZ}" stroke-width="10" fill="none"/></g>
  <rect x="20" y="310" width="260" height="96" rx="10" fill="#fff" stroke="${INK}" stroke-width="6"/><text x="150" y="378" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="62" fill="${INK}">${dist}</text></svg>`);
/* cartel de salida (480 × 330) con su distancia arriba */
const SALIDA = (c, dist, z = 8) => box(c, 0, 0, 480, 330, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 480 330" width="480" height="330" style="overflow:visible">
  <rect x="120" y="0" width="240" height="80" rx="10" fill="${AZ}" stroke="#fff" stroke-width="6"/><text x="240" y="60" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="52" fill="#fff">${dist}</text>
  <rect x="6" y="90" width="468" height="234" rx="18" fill="${AZ}" stroke="#fff" stroke-width="10"/><rect x="30" y="116" width="96" height="70" rx="8" fill="#fff"/><text x="78" y="170" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="50" fill="${AZ}">23</text>
  <text x="150" y="180" font-family="Bricolage" font-weight="800" font-size="56" fill="#fff">Villanueva</text><path d="M380,300 L440,240 M410,236 H444 V270" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`);
const COCHE = (c, col = '#e8507a', z = 12) => box(c, 0, 0, 100, 170, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 170" width="100" height="170">${[[2, 22], [82, 22], [2, 114], [82, 114]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="34" rx="5" fill="${INK}"/>`).join('')}<rect x="10" y="6" width="80" height="158" rx="26" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M22,48 Q50,34 78,48 L72,70 Q50,62 28,70 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="4"/></svg>`);
/* la autovía desde arriba: 2 carriles de subida; salida a la derecha en y = EX; cada metro = 2,4 px */
const EX = 1600, PX = 2.4, XR = 790, ym = m => EX + m * PX;
function autovia(c, tipo) {
  const M = MUNDO(c, 1800, 5600); M.sky.style.background = '#8fb46a';
  box(M.w, 0, 0, 1800, 5600, { zIndex: 1, background: '#8fb46a', backgroundImage: 'radial-gradient(rgba(60,90,40,.25) 6px, transparent 7px)', backgroundSize: '90px 90px' });
  box(M.w, 520, 0, 360, 5600, { zIndex: 3, background: '#6d6a72', borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}` });
  box(M.w, 696, 0, 8, 5600, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(#f4efe2 0 60px, transparent 60px 120px)' });
  // la salida: un ramal en diagonal hacia la derecha
  const ramal = box(M.w, 860, EX - 700, 140, 900, { zIndex: 2, background: '#6d6a72', border: `8px solid ${INK}`, transform: 'skewX(-28deg)', transformOrigin: '0 100%' });
  const S = {};
  if (tipo === 'A') {
    box(M.w, 1040, EX - 1300, 700, 700, { zIndex: 2, background: '#d8d2c4', border: `8px solid ${INK}`, borderRadius: '20px' });
    S.mar = box(M.w, 1100, EX - 1240, 580, 260, { zIndex: 5, background: '#fbf6ea', border: `8px solid ${INK}`, fontFamily: 'Rye', fontSize: '80px', textAlign: 'center', lineHeight: '240px', color: RED }, 'GASOLINERA');
    [0, 1, 2].forEach(i => box(M.w, 1140 + i * 190, EX - 900, 90, 130, { zIndex: 5, background: '#e8507a', border: `6px solid ${INK}`, borderRadius: '12px' }));
    S.s = [S105(M.w, '1000 m'), S105(M.w, '500 m')]; set(S.s[0], { x: 920, y: ym(1000) - 420 }); set(S.s[1], { x: 920, y: ym(500) - 420 });
  } else {
    box(M.w, 1000, EX - 1500, 120, 20, { zIndex: 2 });
    const carr = box(M.w, 1000, EX - 1060, 800, 120, { zIndex: 2, background: '#8a8690', borderTop: `6px solid ${INK}`, borderBottom: `6px solid ${INK}` });
    for (let i = 0; i < 6; i++) box(M.w, 1050 + i * 130, EX - 1300 - (i % 2) * 120, 110, 110, { zIndex: 3, borderRadius: '50%', background: '#4f7a3a', border: `6px solid ${INK}` });
    S.pue = box(M.w, 1300, EX - 2100, 480, 420, { zIndex: 3 }, CASA(480, 420, '#b5523a'));
    S.gas = box(M.w, 1340, EX - 1580, 380, 140, { zIndex: 5, background: '#fbf6ea', border: `7px solid ${INK}`, fontFamily: 'Rye', fontSize: '44px', textAlign: 'center', lineHeight: '126px', color: RED }, 'GASOLINERA');
    S.e = [SALIDA(M.w, '1000 m'), SALIDA(M.w, '500 m')]; set(S.e[0], { x: 900, y: ym(1000) - 330 }); set(S.e[1], { x: 900, y: ym(500) - 330 });
    S.s = [S105(M.w, '750 m'), S105(M.w, '250 m')]; set(S.s[0], { x: 920, y: ym(750) - 420 }); set(S.s[1], { x: 920, y: ym(250) - 420 });
    S.fantasma = S105(M.w, '1000 m', 9); set(S.fantasma, { x: 1300, y: ym(1000) - 420, o: 0 });
  }
  S.coche = COCHE(M.w);
  return { M, S };
}

/* PORTADA + L1 (sin cortar): la señal «750 m» enorme y la de «1000 m» al lado → «toca desviarse» */
plano(-1, L(2) - 0.1, { background: '#8fb46a' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#9fd0ee 0 45%, #8fb46a 45%)' });
  box(cam, 380, 900, 320, 1600, { zIndex: 1, background: '#6d6a72', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' });
  const g = S105(cam, '750 m', 6), b = S105(cam, '1000 m', 6);
  const t1 = texto(c, 180, '¿PONE ' + hlSpan('750 m', 'phl', RED) + '?', { size: 104, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 320, '…esa gasolinera no está en la autovía', { size: 60, italic: true, color: YEL, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` });
  const x1 = texto(c, 1150, 'DESVÍO', { size: 90, color: RED, x: 60, w: 480, z: 40, shadow: `5px 5px 0 #fff` }), x2 = texto(c, 1150, 'EN LA AUTOVÍA', { size: 66, color: '#2e6b3a', x: 520, w: 520, z: 40, shadow: `5px 5px 0 #fff` });
  sfx('swoosh_up', 0.05, 0.5); sp(T.desviarse, 'error', 0.6); sp(T.mil1, 'pop', 0.6); sp(T.autovia1, 'ding', 0.7);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 1.0], [540, 960, 1.1]);
    const kb = p(t, T.mil1 - 0.2, 0.5, E.inOutCubic);
    set(g, { x: lerp(390, 140, kb), y: 520, s: lerp(1.35, 1.0, kb), r: -3 + Math.sin(t * 1.5) * 2 });
    set(b, { o: t > T.mil1 - 0.2 ? 1 : 0, x: 640, y: 520, s: pop(t, T.mil1 - 0.2, 0.4), r: 3 });
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) });
    set(x1, { o: t > T.desviarse - 0.1 ? 1 : 0, s: pop(t, T.desviarse - 0.1, 0.3), r: -4 }); set(x2, { o: t > T.autovia1 - 0.1 ? 1 : 0, s: pop(t, T.autovia1 - 0.1, 0.3), r: 3 });
  };
}, { sfx: false });

/* CASO A (L2 → L4): autovía desde arriba; el coche sube; carteles a 1000 y 500 → la gasolinera, pegada */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#8fb46a' }, c => {
  const W = autovia(c, 'A');
  const ch = chip(c, 300, 420, 'gasolinera con salida propia', { size: 48, bg: '#2e6b3a', z: 40 });
  const peg = texto(c, 1150, '¡pegada!', { size: 110, color: '#fff', z: 40, shadow: OUT });
  sp(T.mil2, 'ding', 0.6); sp(T.quinientos2, 'ding', 0.6); sp(T.pegada, 'tada', 0.6);
  // el coche: pasa el cartel de 1000 cuando se dice «a mil metros» y el de 500 en «a quinientos»; al final toma la salida
  const yc = t => t < T.mil2 ? lerp(ym(1300), ym(1000), clamp((t - L(2)) / (T.mil2 - L(2)))) : t < T.quinientos2 ? lerp(ym(1000), ym(500), (t - T.mil2) / (T.quinientos2 - T.mil2)) : lerp(ym(500), EX - 500, clamp((t - T.quinientos2) / (T.pegada - T.quinientos2 + 0.5)));
  return t => {
    const y = yc(t), sale = clamp((EX + 200 - y) / 700), x = XR + sale * 420;
    camara(W.M, t, [[L(2) - 0.1, 860, ym(1300) - 300, 0.62], [T.mil2, 860, ym(1000) - 300, 0.62], [T.quinientos2, 880, ym(500) - 300, 0.62], [T.pegada, 1000, EX - 700, 0.6], [L(4), 1040, EX - 760, 0.62]]);
    set(W.S.coche, { x: x - 50, y: y - 85, r: sale * 35 });
    W.S.s.forEach((s, i) => set(s, { x: 920, y: ym(i ? 500 : 1000) - 420, s: 1 + 0.08 * Math.sin(t * 5 + i) }));
    set(ch, { o: t > T.propia - 0.2 ? 1 : 0, s: pop(t, T.propia - 0.2, 0.3), r: -2 });
    set(peg, { o: t > T.pegada - 0.1 ? 1 : 0, s: pop(t, T.pegada - 0.1, 0.35), r: -4 });
  };
}, { sfx: false });

/* CASO B (L4 → L8): otra autovía (corte); la salida es la del pueblo: sus carteles ocupan 1000 y 500 → la gasolinera NO puede ir ahí (✗) → se adelanta a 750 y 250 → el coche sale y va al pueblo */
plano(L(4) - 0.1, L(8) - 0.1, { background: '#8fb46a' }, c => {
  const W = autovia(c, 'B');
  const regla = [[1000, '1000 m'], [750, '750 m'], [500, '500 m'], [250, '250 m'], [0, 'SALIDA']].map(([m, s]) => { const d = texto(W.M.w, ym(m) - 70, s, { size: 120, color: m % 500 ? RED : '#fff', x: -60, w: 560, z: 6, shadow: OUT }); box(W.M.w, 380, ym(m) - 6, 140, 12, { zIndex: 6, background: INK }); return [d, m]; });
  const nx = texto(W.M.w, ym(1000) - 360, '✗', { size: 220, color: RED, x: 1250, w: 400, z: 12, shadow: `6px 6px 0 #fff` });
  const ch = chip(c, 330, 250, 'salida compartida con el pueblo', { size: 46, bg: '#7a2a2a', z: 40 });
  const resumen = box(c, 60, 560, 960, 560, { zIndex: 40, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: '12px 12px 0 rgba(0,0,0,.25)', fontFamily: 'Bricolage', fontWeight: 800, color: INK, textAlign: 'center' },
    `<div style="font-size:64px;margin-top:50px">1000 · 500 m</div><div style="font-size:48px;color:#2e6b3a">→ en la autovía</div><div style="height:6px;background:${INK};margin:34px 80px"></div><div style="font-size:64px">750 · 250 m</div><div style="font-size:48px;color:${RED}">→ desvío</div>`);
  sp(T.lio, 'error', 0.4); sp(T.prohibe, 'stamp', 0.9); sp(T.adelanta, 'swoosh_up', 0.7); sp(T.a750, 'ding', 0.6); sp(T.a250, 'ding', 0.6); sp(T.osea, 'pop', 0.5);
  const yc = t => { const a = L(4) - 0.1, b = T.adelanta; if (t < b) return lerp(ym(1500), ym(1150), clamp((t - a) / (b - a))); return lerp(ym(1150), EX - 300, clamp((t - b) / (T.osea - b))); };
  return t => {
    const y = yc(t), sale = clamp((EX + 200 - y) / 600), x = XR + sale * 380;
    camara(W.M, t, [[L(4) - 0.1, 880, ym(1150), 0.55], [T.cartel5, 860, ym(800), 0.46], [T.adelanta, 860, ym(620), 0.42], [T.osea, 900, ym(450), 0.41], [L(8), 920, ym(420), 0.43]]);
    regla.forEach(([d, m]) => set(d, { o: (m === 1000 || m === 500 || m === 0) ? (t > T.cartel5 - 0.3 ? 1 : 0) : (t > (m === 750 ? T.a750 : T.a250) - 0.2 ? 1 : 0) }));
    set(W.S.coche, { x: x - 50, y: y - 85, r: sale * 35 });
    // el cartel de la gasolinera intenta ponerse en los 1000 (✗) y luego se va a los 750 y 250
    const kf = p(t, T.prohibe - 0.6, 0.4, E.outBack), kd = p(t, T.adelanta, 0.7, E.inOutCubic);
    set(W.S.fantasma, { o: t > T.prohibe - 0.6 && t < T.adelanta + 0.7 ? 1 - kd : 0, x: lerp(1300, 1140, kf), y: ym(1000) - 420 + kd * 600, r: Math.sin(t * 12) * (t > T.prohibe ? 4 : 0) });
    set(nx, { o: t > T.prohibe && t < T.adelanta ? 1 : 0, s: pop(t, T.prohibe, 0.3) });
    W.S.s.forEach((s, i) => set(s, { o: t > (i ? T.a250 : T.a750) - 0.2 ? 1 : 0, x: 920, y: ym(i ? 250 : 750) - 420, s: 1.3 * pop(t, (i ? T.a250 : T.a750) - 0.2, 0.4) }));
    W.S.e.forEach((e, i) => set(e, { x: 900, y: ym(i ? 500 : 1000) - 330, s: 1.3 * (t > T.cartel5 && t < T.prohibe + 0.5 ? 1 + 0.06 * Math.sin(t * 8) : 1) }));
    set(ch, { o: t > T.misma - 0.2 && t < T.osea ? 1 : 0, s: pop(t, T.misma - 0.2, 0.3), r: -2 });
    set(resumen, { o: t > T.osea - 0.1 ? 1 : 0, s: pop(t, T.osea - 0.1, 0.4), r: -1 });
  };
}, { sfx: false });

/* L8 · la regla de los 5 km (corte): salida → gasolinera → vuelta, con el cuentakilómetros que no puede pasar de 5,0 */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#8fb46a' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#8fb46a' });
  box(cam, 160, -400, 200, 2720, { zIndex: 1, background: '#6d6a72', borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}` });
  const ruta = box(cam, 0, 0, 1080, 1920, { zIndex: 3 }, `<svg width="1080" height="1920"><path class="rt" d="M300,1300 C500,1250 600,1000 760,900 C900,820 960,700 860,600 C760,500 560,560 420,640 C340,690 320,800 300,860" stroke="${YEL}" stroke-width="26" fill="none" stroke-linecap="round" stroke-dasharray="2600" stroke-dashoffset="2600"/></svg>`);
  const rt = ruta.querySelector('.rt');
  const gas = box(cam, 760, 520, 260, 150, { zIndex: 4, background: '#fbf6ea', border: `7px solid ${INK}`, fontFamily: 'Rye', fontSize: '36px', textAlign: 'center', lineHeight: '136px', color: RED }, 'GASOLINERA');
  const odo = box(c, 300, 1120, 480, 150, { zIndex: 40, background: '#1d1a22', border: `8px solid ${INK}`, borderRadius: '20px', fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '96px', color: '#ff7a3a', textAlign: 'center', lineHeight: '136px' }, '0,0 km');
  const max = texto(c, 1300, 'máximo 5 km', { size: 80, color: '#fff', z: 40, shadow: OUT });
  sp(T.salir8, 'whoosh', 0.5); sp(T.cinco, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(8) - 0.1, L(9) - L(8), 0.08);
    const k = clamp((t - T.salir8 + 0.3) / (T.cinco - T.salir8 + 0.3)); rt.setAttribute('stroke-dashoffset', f1(2600 * (1 - k)));
    odo.textContent = (k * 5).toFixed(1).replace('.', ',') + ' km'; odo.style.color = k >= 1 ? RED : '#ff7a3a';
    set(max, { o: t > T.cinco ? 1 : 0, s: pop(t, T.cinco, 0.35), r: -3 });
  };
});

/* REMATE (L9, corte): en reserva, por la autovía: la luz de reserva encendida y el cartel «250 m» → «mira los metros» */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#2a2530' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#9fd0ee 0 55%, #3d3a44 55%)' });
  box(cam, 380, 600, 320, 500, { zIndex: 1, background: '#6d6a72', clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' });
  const s1 = S105(cam, '1000 m', 3), s2 = S105(cam, '750 m', 3);
  const salpi = box(cam, -100, 1050, 1280, 900, { zIndex: 5, background: '#1d1a22', borderTop: `12px solid ${INK}` });
  const luz = box(cam, 420, 1180, 240, 160, { zIndex: 6, background: '#3a2a00', border: `6px solid ${INK}`, borderRadius: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', textAlign: 'center', lineHeight: '146px' }, 'RESERVA');
  const ok = texto(c, 300, '✓ mira los metros', { size: 84, color: YEL, z: 40, shadow: OUT });
  sp(T.reserva, 'error', 0.5); sp(T.metros9, 'ding', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 960, 1.0], [540, 900, 1.12]);
    const on = Math.sin(t * 7) > 0; luz.style.background = on ? '#ffb020' : '#3a2a00'; luz.style.color = on ? INK : '#6a5a30';
    set(s1, { x: 140, y: 420, s: 0.8, r: -2 }); set(s2, { x: 640, y: 420, s: 0.8, r: 2 });
    set(ok, { o: t > T.metros9 - 0.1 ? 1 : 0, s: pop(t, T.metros9 - 0.1, 0.35), r: -3 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿La gasolinera más', 'escondida que has visto?', { size: 80, draw: c => [['en un pueblo perdido', YEL], ['a 4 km del cartel', PINK], ['nunca me fijé', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 52, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(104, 'Los metros de la gasolinera', ['CARRETERAS', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[T.metros9 + 0.2, L(10) - 0.15]],
  vecino: { risa: [[T.metros9 + 0.2, T.metros9 + 1.3]], sorpresa: [], golpes: [] },
});
