/* Ep. 107 · «Este número te dice cuánto te queda» — el número de cada salida es su punto kilométrico (Norma 8.1-IC, 3.x: «Las salidas se numerarán con el punto
   kilométrico en que se encuentren»); en las radiales, contado desde el km 0 de Sol; dos salidas en el mismo km → A (kilometraje creciente) y B (decreciente).
   Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  queda0: Q('cuánto te queda'), nadie0: Q('nadie lo usa'),
  salida1: Q('el número de la salida'), azar: Q('al azar'),
  norma: Q('la norma'), kilometro2: Q('del kilómetro'),
  s23: Q('la salida 23'), k23: Q('kilómetro 23'), s120: Q('la 120'),
  pasas: Q('pasas por la salida 120'), tuya: Q('la tuya es la 165'), quedan: Q('te quedan'), gps: Q('sin gps'),
  madrid: Q('salen de madrid'), sol: Q('la puerta del sol'),
  osea: Q('o sea'), a3: Q('la a tres'), cero6: Q('kilómetro cero'),
  dos: Q('dos salidas'), letra: Q('una letra'),
  primeraA: Q('la a es'), subiendo: Q('van subiendo'), laB: Q('la b'), bajando: Q('van bajando'),
  cuanto: Q('cuánto queda'), resta: Q('y resta'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZ = '#1f4fa0', VERDE = '#2e6b3a';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* cartel de salida de autovía: arriba el cajetín «SALIDA nn» (.num), abajo el destino (480 × 330) */
const SALIDA = (c, n, dest = 'Villanueva', z = 8) => { const d = box(c, 0, 0, 480, 330, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 480 330" width="480" height="330" style="overflow:visible">
  <rect x="100" y="0" width="280" height="96" rx="12" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M128,74 L128,36 L150,36 M128,36 L160,66" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/><text class="num" x="268" y="74" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="70" fill="${INK}">${n}</text>
  <rect x="6" y="106" width="468" height="218" rx="18" fill="${AZ}" stroke="#fff" stroke-width="10"/><text x="40" y="215" font-family="Bricolage" font-weight="800" font-size="64" fill="#fff">${dest}</text><path d="M370,290 L430,230 M398,226 H434 V262" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`);
  d.num = d.querySelector('.num'); return d; };
/* hito kilométrico (poste blanco con el número) */
const HITO = (c, n, z = 7) => box(c, 0, 0, 150, 260, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 150 260" width="150" height="260"><path d="M20,260 V70 C20,20 130,20 130,70 V260 Z" fill="#fbf6ea" stroke="${INK}" stroke-width="7"/><rect x="20" y="60" width="110" height="50" fill="${RED}"/><text x="75" y="190" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="62" fill="${INK}">${n}</text></svg>`);
const COCHE = (c, col = '#e8507a', z = 12) => box(c, 0, 0, 100, 170, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 170" width="100" height="170">${[[2, 22], [82, 22], [2, 114], [82, 114]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="34" rx="5" fill="${INK}"/>`).join('')}<rect x="10" y="6" width="80" height="158" rx="26" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M22,48 Q50,34 78,48 L72,70 Q50,62 28,70 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="4"/></svg>`);
/* vista desde el asiento (igual que en el ep104) */
function pov(c) {
  const cam = CAM(c);
  box(cam, -300, -300, 1680, 1250, { zIndex: 0, background: 'linear-gradient(#7fbfe8, #d8eef8)' });
  box(cam, -300, 940, 1680, 1200, { zIndex: 1, background: '#8fb46a' });
  const carr = box(cam, -300, 940, 1680, 1100, { zIndex: 2, background: '#6d6a72', clipPath: 'polygon(48% 0, 52% 0, 100% 100%, 0 100%)' });
  const lineas = [...Array(6)].map(() => box(cam, 0, 0, 16, 60, { zIndex: 3, background: '#f4efe2' }));
  box(c, 0, 1480, 1080, 440, { zIndex: 30, background: '#1d1a22', borderTop: `14px solid ${INK}`, borderRadius: '80px 80px 0 0' });
  return { cam, lineas };
}
const rueda = (P, t) => P.lineas.forEach((l, i) => { const k = ((t * 0.9 + i / 6) % 1), w = 4 + k * 26; set(l, { x: 540 - w / 2, y: 950 + k * k * 1000, sx: w / 16, sy: 0.3 + k * 2 }); });
const viene = (s, t, t0, hold = 1.6) => { const a = p(t, t0 - 1.0, 1.0, E.outCubic), b = p(t, t0 + hold, 0.6, E.inCubic); set(s, { o: t > t0 - 1.0 && t < t0 + hold + 0.6 ? 1 : 0, x: lerp(590, 680, a) + b * 600 - 240, y: lerp(820, 470, a) - b * 300 - 165, s: lerp(0.1, 1.0, a) + b * 1.2 }); };

/* PORTADA + L1 (sin cortar): el cartel «SALIDA 23» enorme con el número rodeado → «no está puesto al azar» */
plano(-1, L(2) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#7fbfe8 0 52%, #8fb46a 52%)' });
  box(cam, 380, 1000, 320, 1400, { zIndex: 1, background: '#6d6a72', clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' });
  const s = SALIDA(cam, '23'); const circ = box(cam, 0, 0, 260, 140, { zIndex: 10, border: `10px solid ${RED}`, borderRadius: '50%' });
  const t1 = texto(c, 170, 'ESTE NÚMERO', { size: 104, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 290, 'te dice ' + hlSpan('cuánto te queda', 'phl', RED), { size: 84, color: '#fff', z: 40, shadow: OUT });
  const az = texto(c, 1180, 'no está puesto al azar', { size: 74, color: YEL, z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.queda0, 'ding', 0.7); sp(T.azar, 'stamp', 0.7);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 900, 1.0], [560, 860, 1.12]);
    set(s, { x: 300, y: 560, s: 1.25, r: -2 + Math.sin(t * 1.3) * 1.5 }); set(circ, { x: 300 + 240 * 1.25 - 120 - 10, y: 560 + 48 - 70 - 40, s: 1 + 0.06 * Math.sin(t * 6), o: t > 0.15 ? 1 : 0 });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.6) });
    set(az, { o: t > T.azar - 0.2 ? 1 : 0, s: pop(t, T.azar - 0.2, 0.35), r: -3 });
  };
}, { sfx: false });

/* L2 → L4 (corte): la norma (BOE) con la frase subrayada → en la carretera: el hito «23» junto al cartel «SALIDA 23»: = ; luego 120 = 120 */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#e9e2cf' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#d8cdb8' });
  const doc = box(cam, 110, 420, 860, 760, { zIndex: 2, background: '#fbf6ea', border: `8px solid ${INK}`, boxShadow: '14px 14px 0 rgba(0,0,0,.2)', padding: '40px', boxSizing: 'border-box', color: INK },
    `<div style="font-family:Playfair;font-weight:900;font-size:56px;text-align:center">NORMA 8.1-IC</div><div style="font-family:SpecialElite;font-size:30px;text-align:center;margin:10px 0 50px">Señalización de carreteras · BOE</div>
     <div style="font-family:SpecialElite;font-size:46px;line-height:1.4">«<span class="hl" style="background:linear-gradient(${YEL},${YEL}) no-repeat 0 100% / 0% 60%">Las salidas se numerarán con el punto kilométrico</span> en que se encuentren.»</div>`);
  const hl = doc.querySelector('.hl');
  const pista = box(cam, -400, 1260, 1880, 600, { zIndex: 4, background: '#8fb46a', opacity: 0 });
  const s23 = SALIDA(cam, '23', 'Villanueva', 6), h23 = HITO(cam, '23', 6), igual = texto(cam, 900, '=', { size: 220, color: RED, x: 380, w: 300, z: 8, shadow: `6px 6px 0 #fff` });
  sp(T.norma, 'paper', 0.7); sp(T.kilometro2, 'stamp', 0.8); sp(T.s23, 'pop', 0.6); sp(T.k23, 'ding', 0.8); sp(T.s120, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 900, 1.0], [540, 1040, 1.08]);
    hl.style.backgroundSize = `${f1(p(t, T.norma + 0.4, 1.2) * 100)}% 60%`;
    const ej = t > T.s23 - 0.3; set(doc, { o: ej ? 1 - p(t, T.s23 - 0.3, 0.3) : 1 });
    const n = t > T.s120 - 0.1 ? '120' : '23'; s23.num.textContent = n; h23.querySelector('text').textContent = n;
    set(s23, { o: ej ? 1 : 0, x: 60, y: 760, s: pop(t, T.s23 - 0.3, 0.4) * (t > T.s120 - 0.1 ? 1 + 0.1 * (1 - p(t, T.s120 - 0.1, 0.3)) : 1) });
    set(h23, { o: t > T.k23 - 0.3 ? 1 : 0, x: 820, y: 860, s: pop(t, T.k23 - 0.3, 0.4) * 1.3 });
    set(igual, { o: t > T.k23 ? 1 : 0, s: pop(t, T.k23, 0.3) });
  };
});

/* L4 (corte): desde el asiento: pasa «SALIDA 120» → la tuya es la 165 → la cuenta en grande: 165 − 120 = 45 km · sin GPS */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#7fbfe8' }, c => {
  const P = pov(c);
  const s1 = SALIDA(P.cam, '120', 'Tarancón', 6);
  const cuenta = box(c, 90, 1040, 900, 300, { zIndex: 40, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: '12px 12px 0 rgba(0,0,0,.25)', fontFamily: 'Bricolage', fontWeight: 800, color: INK, textAlign: 'center' },
    `<div style="font-size:44px;margin-top:24px">tu salida: <span style="color:${RED}">165</span></div><div class="op" style="font-size:96px">165 − 120 = <span style="color:${VERDE}">45 km</span></div>`);
  const gps = texto(c, 300, 'sin GPS', { size: 96, color: YEL, z: 40, shadow: OUT });
  sp(T.pasas, 'whoosh', 0.5); sp(T.tuya, 'pop', 0.6); sp(T.quedan, 'ding', 0.8); sp(T.gps, 'tada', 0.6);
  return t => {
    zoom(P.cam, t, L(4) - 0.1, L(5) - L(4), 0.05); rueda(P, t); viene(s1, t, T.pasas + 0.6, 2.2);
    set(cuenta, { o: t > T.tuya - 0.2 ? 1 : 0, s: pop(t, T.tuya - 0.2, 0.4), r: -1 });
    set(gps, { o: t > T.gps - 0.1 ? 1 : 0, s: pop(t, T.gps - 0.1, 0.35), r: -3 });
  };
});

/* L5 → L7 (corte): desde la placa del km 0 de Sol, la A-3 sale hacia Valencia; la cámara recorre la carretera (una dirección) con una regla de km hasta la salida 23 */
plano(L(5) - 0.1, L(7) - 0.1, { background: '#8fb46a' }, c => {
  const M = MUNDO(c, 1400, 7600); M.sky.style.background = '#8fb46a';
  box(M.w, 0, 0, 1400, 7600, { zIndex: 1, background: '#8fb46a', backgroundImage: 'radial-gradient(rgba(60,90,40,.25) 6px, transparent 7px)', backgroundSize: '90px 90px' });
  box(M.w, 520, 0, 360, 7000, { zIndex: 3, background: '#6d6a72', borderLeft: `8px solid ${INK}`, borderRight: `8px solid ${INK}` });
  box(M.w, 696, 0, 8, 7000, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(#f4efe2 0 60px, transparent 60px 120px)' });
  const placa = box(M.w, 360, 7000, 680, 520, { zIndex: 5, background: '#e9e2cf', border: `10px solid ${INK}`, borderRadius: '300px 300px 30px 30px' }, `<div style="font-family:Playfair;font-weight:900;font-size:70px;text-align:center;margin-top:120px;color:${INK}">KILÓMETRO</div><div style="font-family:Rye;font-size:170px;text-align:center;line-height:170px;color:${RED}">0</div>`);
  const KPX = 290; for (let k = 0; k <= 23; k++) { const y = 7000 - k * KPX; box(M.w, 900, y - 4, k % 5 ? 40 : 80, 8, { zIndex: 5, background: INK }); if (k % 5 === 0 || k === 23) texto(M.w, y - 50, k + ' km', { size: 70, color: k === 23 ? RED : '#fff', x: 990, w: 300, z: 6, shadow: OUT }); }
  const sal = SALIDA(M.w, '23', 'Valencia · A-3', 7); set(sal, { x: 900, y: 7000 - 23 * KPX - 420, s: 0.9 });
  const coche = COCHE(M.w);
  const sol = chip(c, 280, 420, 'Puerta del Sol · km 0', { size: 54, bg: '#2b3550', z: 40 }), a3 = chip(c, 380, 420, 'A-3 · salida 23', { size: 60, bg: AZ, z: 40 });
  sp(T.madrid, 'whoosh', 0.5); sp(T.sol, 'ding', 0.7); sp(T.a3, 'pop', 0.6); sp(T.cero6, 'tada', 0.7);
  return t => {
    const k = clamp((t - T.sol) / (T.cero6 - T.sol + 0.4)), y = 7000 - k * 23 * KPX;
    camara(M, t, [[L(5) - 0.1, 760, 7150, 0.7], [T.sol, 760, 7000, 0.7], [T.cero6 + 0.4, 760, 7000 - 23 * KPX, 0.6], [L(7), 780, 7000 - 23 * KPX - 100, 0.62]]);
    set(coche, { x: 740, y: y - 85 });
    set(sol, { o: t > T.sol - 0.2 && t < T.osea ? 1 : 0, s: pop(t, T.sol - 0.2, 0.3), r: -3 }); set(a3, { o: t > T.a3 - 0.1 ? 1 : 0, s: pop(t, T.a3 - 0.1, 0.3), r: -3 });
  };
}, { sfx: false });

/* L7 → L9 (corte): dos salidas en el mismo kilómetro: la carretera de lado a lado; flecha «km ↑» → la primera es la 23A; flecha «km ↓» → la primera es la 23B */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#8fb46a' });
  box(cam, -400, 880, 1880, 300, { zIndex: 2, background: '#6d6a72', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` });
  box(cam, -400, 1026, 1880, 8, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 60px, transparent 60px 120px)' });
  const r1 = box(cam, 330, 640, 110, 260, { zIndex: 1, background: '#6d6a72', border: `7px solid ${INK}`, transform: 'skewX(-30deg)' }), r2 = box(cam, 640, 1160, 110, 260, { zIndex: 1, background: '#6d6a72', border: `7px solid ${INK}`, transform: 'skewX(-30deg)' });
  const la = texto(cam, 520, '23A', { size: 120, color: '#fff', x: 220, w: 360, z: 6, shadow: OUT }), lb = texto(cam, 1420, '23B', { size: 120, color: '#fff', x: 540, w: 360, z: 6, shadow: OUT });
  const cA = COCHE(cam, '#f2c230'), cB = COCHE(cam, '#e8507a');
  const fa = texto(c, 330, 'kilómetros subiendo: A', { size: 64, color: '#fff', z: 40, shadow: OUT }), fb = texto(c, 1220, 'kilómetros bajando: B', { size: 64, color: '#fff', z: 40, shadow: OUT });
  const mismo = chip(c, 280, 420, 'el mismo kilómetro: 23', { size: 56, bg: INK, color: YEL, z: 41 });
  sp(T.dos, 'pop', 0.5); sp(T.letra, 'ding', 0.6); sp(T.primeraA, 'swoosh_up', 0.6); sp(T.laB, 'swoosh_up', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [540, 1040, 0.95], [540, 1040, 1.08]);
    set(mismo, { o: t > T.dos && t < T.primeraA ? 1 : 0, s: pop(t, T.dos, 0.3), r: -3 });
    const ka = p(t, T.primeraA - 0.3, 2.0, E.inOutCubic); set(cA, { o: t > T.primeraA - 0.3 ? 1 : 0, x: lerp(-200, 380, ka), y: 900, r: 90 - (ka > 0.8 ? (ka - 0.8) * 5 * 50 : 0) });
    const kb = p(t, T.laB - 0.3, 2.0, E.inOutCubic); set(cB, { o: t > T.laB - 0.3 ? 1 : 0, x: lerp(1200, 690, kb), y: 990, r: -90 - (kb > 0.8 ? (kb - 0.8) * 5 * 50 : 0) });
    set(la, { o: t > T.letra ? 1 : 0, s: pop(t, T.letra, 0.3) * (t > T.primeraA && t < T.laB ? 1.15 : 1) }); set(lb, { o: t > T.letra ? 1 : 0, s: pop(t, T.letra + 0.2, 0.3) * (t > T.laB ? 1.15 : 1) });
    set(fa, { o: t > T.subiendo - 0.3 ? 1 : 0, s: pop(t, T.subiendo - 0.3, 0.3), r: -2 }); set(fb, { o: t > T.bajando - 0.3 ? 1 : 0, s: pop(t, T.bajando - 0.3, 0.3), r: -2 });
  };
});

/* REMATE (L9, corte): en el coche, el niño: «¿cuánto queda?» → tú miras el cartel y restas */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#7fbfe8' }, c => {
  const P = pov(c);
  const nino = PERS(c, 700, 1180, 300, { ropa: '#f2c230', pelo: 'corto', pcol: '#3a2a1e' }); nino.style.zIndex = 35;
  const bo = BOCADILLO(c, 0, 0, '¿Cuánto queda?', { size: 54, z: 40 });
  const s = SALIDA(P.cam, '140', 'Motilla', 6);
  const cu = texto(c, 720, '165 − 140 = 25', { size: 100, color: '#fff', z: 40, shadow: OUT });
  sp(T.cuanto, 'pop', 0.6); sp(T.resta, 'ding', 0.8);
  return t => {
    zoom(P.cam, t, L(9) - 0.1, L(10) - L(9), 0.05); rueda(P, t); viene(s, t, T.cuanto + 0.8, 2.5);
    pFace(nino, t, { feliz: 0.2, ceja: 14, jaw: t > T.cuanto - 0.2 && t < T.cuanto + 0.8 ? 0.6 : 0, look: [-10, -8] });
    set(bo, { o: t > T.cuanto - 0.3 ? 1 : 0, x: 520, y: 1020, s: pop(t, T.cuanto - 0.3, 0.3), r: 3 });
    set(cu, { o: t > T.resta - 0.2 ? 1 : 0, s: pop(t, T.resta - 0.2, 0.35), r: -3 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué número tiene', 'la salida de tu casa?', { size: 84, draw: c => [['la 13', YEL], ['la 26', PINK], ['ni idea, voy a mirar', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(107, 'El número de la salida', ['CARRETERAS', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[T.resta, L(10) - 0.15]],
  vecino: { risa: [[T.resta, T.resta + 1.2]], sorpresa: [], golpes: [] },
});
