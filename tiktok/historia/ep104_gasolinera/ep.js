/* Ep. 104 (v2) · «Estos dos carteles parecen iguales… pero uno te saca de la autovía» — los carteles de gasolinera (Norma 8.1-IC, 9.24.1.1).
   Contado desde DENTRO del coche (los carteles vienen hacia ti, grandes): día 1, 1000/500 → la gasolinera está ahí; día 2, 750/250 → acabas en un pueblo.
   Luego el porqué en un esquema simple (los huecos de 1000 y 500 ya están ocupados por la salida) y la regla para recordarlo. */
Story.prepara();
const T = {
  iguales: Q('parecen iguales'), saca: Q('te saca'),
  chiva: Q('te lo chiva'), fijate: Q('fíjate'),
  reserva: Q('en reserva'), g1000: Q('a 1000'), g500: Q('a 500'),
  ahi: Q('ahí la tienes'), pegada: Q('pegada'), repostas: Q('repostas'),
  otrodia: Q('otro día'), p750: Q('pone 750'), p250: Q('luego 250'),
  salida5: Q('tomas la salida'), pueblo5: Q('un pueblo'), buscandola: Q('buscándola'),
  porque: Q('por qué'), propia: Q('salida propia'), delpueblo: Q('la del pueblo'),
  e1000: Q('los 1000'), e500: Q('los 500'), carteles7: Q('los carteles de esa salida'), medio: Q('en medio'), a750: Q('a 750'), a250: Q('a 250'),
  casualidad: Q('no es casualidad'), norma: Q('la norma'),
  redondo: Q('número redondo'), raro: Q('número raro'), desvio: Q('toca desvío'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZ = '#1f4fa0', VERDE = '#2e6b3a';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* señal de gasolinera con distancia (300 × 420); .num = el número (para resaltarlo) */
const S105 = (c, dist, z = 8, col = INK) => { const d = box(c, 0, 0, 300, 420, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 420" width="300" height="420" style="overflow:visible">
  <rect x="6" y="6" width="288" height="288" rx="18" fill="${AZ}" stroke="#fff" stroke-width="10"/><rect x="2" y="2" width="296" height="296" rx="20" fill="none" stroke="${INK}" stroke-width="4"/>
  <rect x="60" y="40" width="180" height="220" rx="12" fill="#fff"/><g transform="translate(95 70)"><rect x="0" y="0" width="80" height="140" rx="8" fill="${AZ}"/><rect x="14" y="16" width="52" height="34" fill="#fff"/><path d="M80,40 h24 v80 h-14" stroke="${AZ}" stroke-width="10" fill="none"/></g>
  <rect class="pan" x="20" y="310" width="260" height="96" rx="10" fill="#fff" stroke="${INK}" stroke-width="6"/><text class="num" x="150" y="378" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="64" fill="${col}">${dist}</text></svg>`);
  d.pan = d.querySelector('.pan'); return d; };
const SALIDA = (c, dist, z = 8) => box(c, 0, 0, 380, 260, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 380 260" width="380" height="260" style="overflow:visible">
  <rect x="80" y="0" width="220" height="70" rx="10" fill="${AZ}" stroke="#fff" stroke-width="6"/><text x="190" y="52" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="46" fill="#fff">${dist}</text>
  <rect x="6" y="80" width="368" height="174" rx="16" fill="${AZ}" stroke="#fff" stroke-width="9"/><text x="40" y="180" font-family="Bricolage" font-weight="800" font-size="52" fill="#fff">Villanueva</text><path d="M300,230 L350,180 M322,176 H354 V208" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/></svg>`);
/* vista desde el asiento: cielo, carretera en perspectiva, salpicadero con la luz de reserva */
function pov(c, o = {}) {
  const cam = CAM(c);
  const cielo = box(cam, -300, -300, 1680, 1250, { zIndex: 0, background: o.tarde ? 'linear-gradient(#f6a96a, #ffe1a6)' : 'linear-gradient(#7fbfe8, #d8eef8)' });
  box(cam, -300, 940, 1680, 1200, { zIndex: 1, background: '#8fb46a' });
  const carr = box(cam, -300, 940, 1680, 1100, { zIndex: 2, background: '#6d6a72', clipPath: 'polygon(48% 0, 52% 0, 100% 100%, 0 100%)' });
  const lineas = [...Array(6)].map(() => box(cam, 0, 0, 16, 60, { zIndex: 3, background: '#f4efe2' }));
  const salp = box(c, 0, 1480, 1080, 440, { zIndex: 30, background: '#1d1a22', borderTop: `14px solid ${INK}`, borderRadius: '80px 80px 0 0' });
  const luz = box(c, 420, 1560, 240, 120, { zIndex: 31, borderRadius: '16px', border: `6px solid ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', textAlign: 'center', lineHeight: '106px' }, 'RESERVA');
  return { cam, carr, lineas, luz, cielo };
}
const pintaPov = (P, t, giro = 0) => { P.lineas.forEach((l, i) => { const k = ((t * 0.9 + i / 6) % 1), y = 950 + k * k * 1000, w = 4 + k * 26; set(l, { x: 540 + giro * k * 300 - w / 2, y, sx: w / 16, sy: 0.3 + k * 2 }); });
  const on = Math.sin(t * 7) > 0; P.luz.style.background = on ? '#ffb020' : '#3a2a00'; P.luz.style.color = on ? INK : '#6a5a30';
  P.carr.style.clipPath = `polygon(${f1(48 + giro * 14)}% 0, ${f1(52 + giro * 14)}% 0, 100% 100%, 0 100%)`; };
/* un cartel que viene hacia ti por la derecha: de pequeño en el horizonte a grande, y sale de cuadro */
const viene = (s, t, t0) => { const a = p(t, t0 - 1.0, 1.0, E.outCubic), b = p(t, t0 + 1.6, 0.6, E.inCubic); set(s, { o: t > t0 - 1.0 && t < t0 + 2.2 ? 1 : 0, x: lerp(590, 700, a) + b * 600 - 150, y: lerp(820, 470, a) - b * 300 - 210, s: lerp(0.12, 1.25, a) + b * 1.2 }); };

/* PORTADA + L1 (sin cortar): los dos carteles juntos: «1000 m» y «750 m» → «te lo chiva el número»: los números se encienden */
plano(-1, L(2) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#7fbfe8 0 50%, #8fb46a 50%)' });
  box(cam, 380, 960, 320, 1400, { zIndex: 1, background: '#6d6a72', clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' });
  const a = S105(cam, '1000 m', 6), b = S105(cam, '750 m', 6);
  const t1 = texto(c, 170, 'PARECEN IGUALES…', { size: 84, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 280, 'pero ' + hlSpan('UNO', 'phl', RED) + ' te saca', { size: 84, color: '#fff', z: 40, shadow: OUT }); const t3 = texto(c, 385, 'de la autovía', { size: 84, color: YEL, z: 40, shadow: OUT });
  const q = texto(c, 1170, '¿cuál?', { size: 110, color: YEL, z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.saca, 'thud', 0.7); sp(T.chiva, 'pop', 0.5); sp(T.fijate, 'ding', 0.7);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 900, 1.0], [540, 880, 1.1]);
    set(a, { x: 110, y: 600, s: 1.0, r: -3 + Math.sin(t * 1.4) * 1.5 }); set(b, { x: 670, y: 600, s: 1.0, r: 3 + Math.sin(t * 1.3 + 1) * 1.5 });
    const on = t > T.chiva - 0.1; [a, b].forEach(s => { s.pan.setAttribute('fill', on && Math.sin(t * 8) > 0 ? YEL : '#fff'); });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.6) });
    set(q, { o: t > T.fijate - 0.1 ? 1 : 0, s: pop(t, T.fijate - 0.1, 0.35), r: -4 });
  };
}, { sfx: false });

/* DÍA 1 (L2 → L4), desde el asiento: luz de reserva → «1000 m» viene hacia ti → «500 m» → la gasolinera aparece pegada a la carretera ✓ */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#7fbfe8' }, c => {
  const P = pov(c);
  const s1 = S105(P.cam, '1000 m', 6), s2 = S105(P.cam, '500 m', 6);
  const gas = box(P.cam, 0, 0, 520, 300, { zIndex: 5, transformOrigin: '0 100%' }, `<svg viewBox="0 0 520 300" width="520" height="300"><rect x="10" y="20" width="500" height="60" fill="#fbf6ea" stroke="${INK}" stroke-width="8"/><text x="260" y="68" text-anchor="middle" font-family="Rye" font-size="44" fill="${RED}">GASOLINERA</text>${[60, 230, 400].map(x => `<rect x="${x}" y="80" width="18" height="160" fill="#d8d2c4" stroke="${INK}" stroke-width="4"/>`).join('')}${[120, 300].map(x => `<rect x="${x}" y="170" width="70" height="110" rx="10" fill="#e8507a" stroke="${INK}" stroke-width="5"/>`).join('')}<rect x="0" y="280" width="520" height="20" fill="#5e5a62"/></svg>`);
  const ok = texto(c, 300, '✓ en la autovía', { size: 90, color: '#fff', z: 40, shadow: OUT });
  sp(T.reserva, 'error', 0.4); sp(T.g1000, 'ding', 0.6); sp(T.g500, 'ding', 0.6); sp(T.ahi, 'tada', 0.7);
  return t => {
    zoom(P.cam, t, L(2) - 0.1, L(4) - L(2), 0.05); pintaPov(P, t);
    viene(s1, t, T.g1000); viene(s2, t, T.g500);
    const kg = p(t, T.ahi - 0.8, 1.6, E.outCubic); set(gas, { o: t > T.ahi - 0.8 ? 1 : 0, x: lerp(600, 520, kg), y: lerp(840, 760, kg) - 300, s: lerp(0.15, 1.0, kg) });
    set(ok, { o: t > T.pegada - 0.1 ? 1 : 0, s: pop(t, T.pegada - 0.1, 0.35), r: -3 });
  };
});

/* DÍA 2 (L4 → L6), desde el asiento, al atardecer: «750 m» (número en rojo) → «250 m» → tomas la salida → el pueblo: «¿dónde está?» */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#f6a96a' }, c => {
  const P = pov(c, { tarde: true });
  const s1 = S105(P.cam, '750 m', 6, RED), s2 = S105(P.cam, '250 m', 6, RED);
  const casas = [...Array(5)].map((_, i) => box(P.cam, 0, 0, 300, 260, { zIndex: 5, transformOrigin: '50% 100%' }, CASA(300, 260, ['#b5523a', '#c87a3a', '#a8452e'][i % 3])));
  const donde = BOCADILLO(c, 0, 0, '¿Y la gasolinera?', { size: 54, z: 40 });
  const km = chip(c, 380, 420, '+ 3 km', { size: 64, bg: RED, z: 40 });
  sp(T.p750, 'error', 0.5); sp(T.p250, 'error', 0.5); sp(T.salida5, 'whoosh', 0.6); sp(T.buscandola, 'boing', 0.6);
  return t => {
    zoom(P.cam, t, L(4) - 0.1, L(6) - L(4), 0.05);
    const gi = p(t, T.salida5 - 0.2, 0.8, E.inOutCubic) - p(t, T.pueblo5, 0.6, E.inOutCubic); pintaPov(P, t, gi);
    viene(s1, t, T.p750); viene(s2, t, T.p250);
    const enP = t > T.pueblo5 - 0.3; casas.forEach((h, i) => { const k = ((t * 0.35 + i / 5) % 1), izq = i % 2; set(h, { o: enP ? 1 : 0, x: izq ? lerp(470, -400, k * k) : lerp(610, 1200, k * k) - 150, y: lerp(700, 900, k * k), s: lerp(0.2, 2.2, k * k) }); });
    set(donde, { o: t > T.buscandola - 0.4 ? 1 : 0, x: 260, y: 1160, s: pop(t, T.buscandola - 0.4, 0.3), r: -3 });
    set(km, { o: t > T.buscandola ? 1 : 0, s: pop(t, T.buscandola, 0.3), r: 4 });
  };
});

/* EL PORQUÉ (L6 → L8), esquema (corte): la carretera de izquierda a derecha con su salida al pueblo; cuatro huecos (1000, 750, 500, 250);
   los carteles de la SALIDA ocupan 1000 y 500 → el de la gasolinera intenta ir a 1000, choca, y baja a 750; el otro a 250 */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#efe1c6' });
  box(cam, -200, 1060, 1480, 150, { zIndex: 2, background: '#6d6a72', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` });
  box(cam, -200, 1128, 1480, 10, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 50px, transparent 50px 100px)' });
  const ramal = box(cam, 1000, 860, 120, 260, { zIndex: 1, background: '#6d6a72', border: `8px solid ${INK}`, transform: 'skewX(30deg)' });
  const pueblo = box(cam, 820, 560, 260, 230, { zIndex: 3 }, CASA(260, 230, '#b5523a'));
  const gasP = box(cam, 600, 640, 200, 110, { zIndex: 4, background: '#fbf6ea', border: `6px solid ${INK}`, fontFamily: 'Rye', fontSize: '28px', textAlign: 'center', lineHeight: '98px', color: RED }, 'GASOLINERA');
  const coche = box(cam, 0, 0, 120, 70, { zIndex: 5, background: '#e8507a', border: `6px solid ${INK}`, borderRadius: '20px' });
  const XS = { 1000: 150, 750: 385, 500: 620, 250: 855 }, YS = 1230;
  const sen = texto(cam, 1000, 'sentido de la marcha', { size: 50, color: '#fff', x: 0, w: 400, z: 4, shadow: OUT }); const salP = texto(cam, 800, 'salida al pueblo', { size: 44, color: INK, x: 560, w: 400, z: 4 });
  Object.values(XS).forEach(x => box(cam, x - 5, 1210, 10, 70, { zIndex: 5, background: INK }));
  const e1 = SALIDA(cam, '1000 m', 7), e2 = SALIDA(cam, '500 m', 7);
  const g1 = S105(cam, '750 m', 8, RED), g2 = S105(cam, '250 m', 8, RED);
  const ocup = texto(cam, 1040, '¡ocupado!', { size: 64, color: RED, x: 0, w: 400, z: 9, shadow: `4px 4px 0 #fff` });
  const sin = chip(c, 300, 420, 'sin salida propia', { size: 56, bg: '#7a2a2a', z: 40 });
  sp(T.propia, 'error', 0.4); sp(T.e1000, 'thud', 0.6); sp(T.e500, 'thud', 0.6); sp(T.medio - 0.6, 'boing', 0.6); sp(T.a750, 'stamp', 0.8); sp(T.a250, 'stamp', 0.8);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(8) - 0.1, [560, 1050, 0.92], [520, 1180, 1.0]);
    const kc = clamp((t - L(6)) / 3); set(coche, { x: lerp(-100, 860, kc), y: 1100 - (kc > 0.9 ? (kc - 0.9) * 2000 : 0), r: kc > 0.9 ? -30 : 0 });
    set(sin, { o: t > T.propia - 0.2 && t < T.e1000 ? 1 : 0, s: pop(t, T.propia - 0.2, 0.3), r: -3 });
    set(gasP, { s: t > T.delpueblo ? 1 + 0.08 * Math.sin(t * 8) : 1 });
    // carteles de la salida: caen en 1000 y 500 (señal pequeña, sobre el arcén)
    [[e1, T.e1000, 1000], [e2, T.e500, 500]].forEach(([e, t0, m]) => { const k = p(t, t0 - 0.2, 0.4, E.outBack); set(e, { o: t > t0 - 0.2 ? 1 : 0, x: XS[m] - 190, y: lerp(300, 1250, k), s: 0.62 }); });
    // el de la gasolinera: intenta 1000 (rebota) y baja a 750; el segundo a 250
    const t0 = T.medio - 0.6, kb = p(t, t0, 0.35, E.outCubic), kr = p(t, t0 + 0.4, 0.25), k7 = p(t, T.a750 - 0.3, 0.4, E.outBack);
    const xg = t < T.a750 - 0.3 ? XS[1000] - 150 : lerp(XS[1000] - 150, XS[750] - 150, k7), yg = t < T.a750 - 0.3 ? lerp(200, 780, kb) - kr * 120 : lerp(660, 1180, k7);
    set(g1, { o: t > t0 ? 1 : 0, x: xg, y: yg, s: 0.62, r: t > t0 + 0.35 && t < T.a750 ? Math.sin(t * 30) * 6 : 0 });
    set(ocup, { o: t > t0 + 0.35 && t < T.a750 - 0.2 ? 1 : 0, x: XS[1000] - 60, y: 600, s: pop(t, t0 + 0.35, 0.25) });
    const k2 = p(t, T.a250 - 0.3, 0.4, E.outBack); set(g2, { o: t > T.a250 - 0.3 ? 1 : 0, x: XS[250] - 150, y: lerp(300, 1180, k2), s: 0.62 });
  };
});

/* L8 · la norma (corte): el BOE con la frase subrayada */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#e9e2cf' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#d8cdb8' });
  const doc = box(cam, 110, 460, 860, 900, { zIndex: 2, background: '#fbf6ea', border: `8px solid ${INK}`, boxShadow: '14px 14px 0 rgba(0,0,0,.2)', padding: '40px', boxSizing: 'border-box', color: INK },
    `<div style="font-family:Playfair;font-weight:900;font-size:58px;text-align:center">NORMA 8.1-IC</div><div style="font-family:SpecialElite;font-size:32px;text-align:center;margin:10px 0 40px">Señalización vertical · BOE</div>
     <div style="font-family:SpecialElite;font-size:38px;line-height:1.45">Si la salida no fuera específica, sino compartida…, no se mezclarán ambas preseñalizaciones, sino que la correspondiente a los servicios se colocará <span class="hl" style="background:linear-gradient(${YEL},${YEL}) no-repeat 0 100% / 0% 60%">a 250 y 750 m de la salida</span>.</div>`);
  const hl = doc.querySelector('.hl');
  sp(T.casualidad, 'paper', 0.7); sp(T.norma + 0.3, 'stamp', 0.8);
  return t => { deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 900, 1.0], [540, 1000, 1.12]); hl.style.backgroundSize = `${f1(p(t, T.norma, 0.8) * 100)}% 60%`; };
});

/* REMATE (L9): la regla para recordar: los dos carteles otra vez (cierra el bucle con el gancho) */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#7fbfe8 0 50%, #8fb46a 50%)' });
  const a = S105(cam, '1000 m', 6), b = S105(cam, '750 m', 6, RED);
  const ta = texto(cam, 1000, '✓ la tienes ahí', { size: 56, color: '#fff', x: 40, w: 500, z: 8, shadow: OUT }), tb = texto(cam, 1000, '↗ toca desvío', { size: 56, color: YEL, x: 540, w: 500, z: 8, shadow: OUT });
  const r1 = texto(c, 230, 'REDONDO = AHÍ', { size: 80, color: '#fff', z: 40, shadow: OUT }), r2 = texto(c, 340, 'RARO = DESVÍO', { size: 80, color: YEL, z: 40, shadow: OUT });
  sp(T.redondo, 'ding', 0.7); sp(T.raro, 'error', 0.5); sp(T.desvio, 'stamp', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 920, 1.0], [540, 900, 1.08]);
    set(a, { x: 110, y: 520, s: 1.05, r: -3 }); set(b, { x: 670, y: 520, s: 1.05, r: 3 });
    set(ta, { o: t > T.redondo ? 1 : 0, s: pop(t, T.redondo, 0.3) }); set(tb, { o: t > T.raro ? 1 : 0, s: pop(t, T.raro, 0.3) });
    set(r1, { o: t > T.redondo - 0.1 ? 1 : 0, s: pop(t, T.redondo - 0.1, 0.3), r: -2 }); set(r2, { o: t > T.raro - 0.1 ? 1 : 0, s: pop(t, T.raro - 0.1, 0.3), r: 2 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Te ha tocado alguna vez', 'la del pueblo?', { size: 82, draw: c => [['sí, y casi me quedo tirado', YEL], ['nunca me había fijado', PINK], ['ahora lo voy a mirar', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 30, 640 + i * 160, s, { size: 48, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(104, 'Los metros de la gasolinera', ['CARRETERAS', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[T.desvio + 0.2, L(10) - 0.15]],
  vecino: { risa: [[T.desvio + 0.2, T.desvio + 1.3]], sorpresa: [], golpes: [] },
});
