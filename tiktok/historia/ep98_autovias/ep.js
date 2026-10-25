/* Ep. 98 · «Las autovías van como las agujas del reloj» — FORMATO NUEVO (dato para hacerse el listo). El mapa de España con un reloj encima de Madrid;
   cada autovía se enciende cuando la aguja pasa por ella. Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  reloj0: Q('reloj'),
  sepas: Q('lo sepas'), olvida: Q('se te olvida'),
  mismo: Q('mismo sitio'), placa: Q('una placa'), sol2: Q('puerta del sol'), cero: Q('kilómetro cero'),
  seis: Q('las seis'), salen: Q('salen de madrid'),
  numero: Q('ponerles número'), idea: Q('una idea'), comoreloj: Q('como un reloj'),
  a1: Q('a-1'), norte: Q('norte'), burgos: Q('burgos'), doce: Q('las doce'),
  girando: Q('girando'), a2: Q('a-2'), a3: Q('a-3'), a4: Q('a-4'),
  a5: Q('a-5'), a6: Q('a-6'), vuelta: Q('una vuelta'), sentido: Q('sentido del reloj'),
  proxima: Q('la próxima'), a3b: Q('a-3'), mire: Q('mire el reloj'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZUL = '#1f4fa0';
/* mapa (vb 0 0 1000 800): España peninsular simplificada; Madrid en (470, 400) */
const SPAIN = 'M90,120 L200,80 L320,86 L420,92 L560,112 L640,150 L720,170 L800,180 L900,200 L880,280 L800,380 L740,450 L760,540 L700,620 L640,700 L520,730 L400,742 L300,760 L230,700 L200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L60,170 Z';
const MX = 470, MY = 400;
const RUTAS = [['A-1', 'Burgos', 520, 100], ['A-2', 'Barcelona', 860, 250], ['A-3', 'Valencia', 750, 470], ['A-4', 'Andalucía', 340, 720], ['A-5', 'Extremadura', 215, 520], ['A-6', 'Galicia', 110, 145]];
const ang = ([, , x, y]) => Math.atan2(x - MX, -(y - MY)) * 180 / Math.PI;
const MAPA = () => `<svg viewBox="0 0 1000 800" width="1000" height="800" style="overflow:visible">
  <path d="M0,0 H1000 V800 H0 Z" fill="#9fd0ee" opacity="0"/>
  <path d="${SPAIN}" fill="#efe1c0" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L90,240 L60,700 Z" fill="#d8cdb8" opacity=".0"/>
  ${RUTAS.map(([n, , x, y], i) => `<g class="ru" data-i="${i}"><path d="M${MX},${MY} L${x},${y}" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path class="rl" d="M${MX},${MY} L${x},${y}" stroke="#9a9a9a" stroke-width="12" stroke-linecap="round"/></g>`).join('')}
  <circle cx="${MX}" cy="${MY}" r="22" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`;
const RELOJ_M = () => `<svg viewBox="-380 -380 760 760" width="760" height="760" style="overflow:visible"><circle r="350" fill="rgba(251,246,234,.35)" stroke="${INK}" stroke-width="8" stroke-dasharray="18 12"/>
  ${[...Array(12)].map((_, i) => { const a = i * 30 * Math.PI / 180; return `<text x="${f1(Math.sin(a) * 305)}" y="${f1(-Math.cos(a) * 305 + 18)}" text-anchor="middle" font-family="Rye" font-size="50" fill="${INK}">${i || 12}</text>`; }).join('')}
  <g class="ag"><path d="M0,0 V-270" stroke="${RED}" stroke-width="14" stroke-linecap="round"/><path d="M-22,-240 L0,-290 L22,-240 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/></g><circle r="18" fill="${INK}"/></svg>`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* el mapa con su reloj dentro de una cámara; Madrid queda en (510, 980) de la cámara */
const OX = 40, OY = 580;
function escenaMapa(c) {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#9fd0ee', backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0 3px, transparent 3px 60px)' });
  const mapa = box(cam, OX, OY, 1000, 800, { zIndex: 2 }, MAPA());
  const reloj = box(cam, OX + MX - 380, OY + MY - 380, 760, 760, { zIndex: 4, transformOrigin: '50% 50%' }, RELOJ_M());
  const ag = reloj.querySelector('.ag'), rl = [...mapa.querySelectorAll('.rl')];
  const eti = RUTAS.map(([n, d, x, y]) => box(cam, OX + x - 120, OY + y + (y < MY ? -110 : 20), 240, 96, { zIndex: 6, background: AZUL, border: `5px solid #fff`, outline: `4px solid ${INK}`, borderRadius: '12px', color: '#fff', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, transformOrigin: '50% 50%' },
    `<div style="font-size:40px;line-height:46px">${n}</div><div style="font-size:26px">${d}</div>`));
  return { cam, reloj, ag, rl, eti };
}
const enciende = (S, t, tiempos) => S.rl.forEach((r, i) => { const on = tiempos[i] != null && t > tiempos[i]; r.setAttribute('stroke', on ? '#f2c230' : '#9a9a9a'); set(S.eti[i], { o: on ? 1 : 0, s: on ? pop(t, tiempos[i], 0.35) : 0 }); });

/* PORTADA + L1 (sin cortar): España con las seis autovías encendidas y el reloj encima; la aguja da vueltas */
plano(-1, L(2) - 0.1, { background: '#9fd0ee' }, c => {
  const S = escenaMapa(c);
  const t1 = texto(c, 180, 'LAS AUTOVÍAS VAN COMO', { size: 66, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 265, 'LAS AGUJAS DEL ' + hlSpan('RELOJ', 'phl'), { size: 76, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.reloj0, 'tick', 0.8); sp(T.olvida, 'ding', 0.6);
  return t => {
    deriva(S.cam, t, -0.2, L(2), [520, 930, 0.9], [520, 920, 1.0]);
    S.ag.setAttribute('transform', `rotate(${f1((t * 70) % 360)})`); enciende(S, t, [-1, -1, -1, -1, -1, -1]);
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L4): Puerta del Sol (corte): la placa del kilómetro 0 en el suelo; la cámara baja hasta ella → seis flechas salen de la placa */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#c9b48a' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#c9b48a', backgroundImage: 'linear-gradient(rgba(43,33,24,.15) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.15) 4px, transparent 4px)', backgroundSize: '160px 110px' });
  const placa = box(cam, 240, 700, 600, 520, { zIndex: 3, background: '#e9e2cf', border: `10px solid ${INK}`, borderRadius: '300px 300px 30px 30px', boxShadow: '12px 12px 0 rgba(0,0,0,.25)' },
    `<svg viewBox="0 0 600 520" width="580" height="500"><path d="M300,120 L300,40" stroke="${INK}" stroke-width="6"/>${[-60, -30, 0, 30, 60, 90].map(a => '').join('')}
     <text x="300" y="250" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="70" fill="${INK}">KILÓMETRO</text>
     <text x="300" y="400" text-anchor="middle" font-family="Rye" font-size="170" fill="${RED}">0</text>
     <text x="300" y="470" text-anchor="middle" font-family="SpecialElite" font-size="30" fill="${INK}">ORIGEN DE LAS CARRETERAS</text></svg>`);
  const pies_ = [0, 1].map(i => box(cam, 0, 0, 90, 150, { zIndex: 5, background: '#3d3a44', border: `5px solid ${INK}`, borderRadius: '45px 45px 20px 20px' }));
  const fl = [...Array(6)].map((_, i) => box(cam, 540 - 12, 960 - 12, 24, 24, { zIndex: 4, transformOrigin: '12px 12px' }, `<svg width="24" height="400" style="overflow:visible"><path d="M12,0 V-330" stroke="${YEL}" stroke-width="20" stroke-linecap="round"/><path d="M-14,-320 L12,-370 L38,-320 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/></svg>`));
  const n6 = texto(cam, 480, '6 carreteras', { size: 90, color: '#fff', z: 8, shadow: OUT });
  const chip_ = chip(c, 330, 420, 'Puerta del Sol · Madrid', { size: 50, bg: '#2b3550' });
  sp(T.placa, 'thud', 0.6); sp(T.cero, 'ding', 0.8); [...Array(6)].forEach((_, i) => sp(T.seis + i * 0.12, 'pop', 0.35));
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 820, 0.8], [540, 960, 1.15]);
    rotuloA(chip_, t, T.mismo, T.seis);
    pies_.forEach((f, i) => { const k = p(t, T.placa - 0.3 + i * 0.3, 0.5, E.outCubic); set(f, { x: 400 + i * 180, y: lerp(1500, 1260, k) - (i ? 30 : 0), o: t < T.seis ? 1 : 1 - p(t, T.seis, 0.3) }); });
    fl.forEach((f, i) => { const k = p(t, T.seis + i * 0.12, 0.5, E.outBack); set(f, { o: t > T.seis + i * 0.12 ? 1 : 0, r: [10, 55, 100, 190, 245, 315][i], sy: k }); });
    set(n6, { o: t > T.salen - 0.2 ? 1 : 0, s: pop(t, T.salen - 0.2, 0.3) });
  };
});

/* ACTO 2 (L4 → L8): el mapa con el reloj encima (corte): la aguja gira y cada autovía se enciende al pasar → vuelta completa */
plano(L(4) - 0.1, L(8) - 0.1, { background: '#9fd0ee' }, c => {
  const S = escenaMapa(c);
  const tiempos = [T.a1, T.a2, T.a3, T.a4, T.a5, T.a6];
  const vuelta = texto(c, 300, 'una vuelta completa', { size: 72, color: '#fff', z: 40, shadow: OUT });
  sp(T.comoreloj, 'tick', 0.7); tiempos.forEach(x => sp(x, 'ding', 0.5)); sp(T.sentido, 'tada', 0.7);
  // la aguja: quieta en las 12 hasta la A-1, luego va a cada carretera justo cuando se nombra
  const A = RUTAS.map(ang).map((a, i) => a < -5 ? a + 360 : a);
  return t => {
    deriva(S.cam, t, L(4) - 0.1, L(8) - 0.1, [520, 960, 0.92], [520, 960, 1.04]);
    set(S.reloj, { o: t > T.idea - 0.2 ? 1 : 0.0, s: t > T.idea - 0.2 ? pop(t, T.idea - 0.2, 0.5) : 0 });
    let a = 0; for (let i = 0; i < 6; i++) if (t > tiempos[i] - 0.35) a = lerp(i ? A[i - 1] : 0, A[i], p(t, tiempos[i] - 0.35, 0.4, E.inOutCubic));
    if (t > T.vuelta - 0.2) a = lerp(A[5], 360, p(t, T.vuelta - 0.2, 0.8, E.inOutCubic));
    S.ag.setAttribute('transform', `rotate(${f1(a)})`);
    enciende(S, t, tiempos);
    set(vuelta, { o: t > T.vuelta ? 1 : 0, s: pop(t, T.vuelta, 0.35), r: -3 });
  };
});

/* ACTO 3 · REMATE (L8, corte): el cartel azul «A-3 Valencia»; tu colega duda entre Valencia y Galicia; tú señalas el reloj: las 3 */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#9fd0ee, #eaf2f6)' });
  box(cam, -400, 1300, 1880, 1000, { zIndex: 1, background: '#6d6a72', borderTop: `10px solid ${INK}` });
  const cartel = box(cam, 200, 380, 680, 300, { zIndex: 3, background: AZUL, border: `8px solid #fff`, outline: `6px solid ${INK}`, borderRadius: '20px', color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, textAlign: 'center' },
    `<div style="display:inline-block;margin-top:40px;background:#fff;color:${AZUL};border-radius:12px;padding:0 24px;font-size:86px">A-3</div><div style="font-size:84px;margin-top:10px">Valencia</div>`);
  [300, 760].forEach(x => box(cam, x, 680, 24, 640, { zIndex: 2, background: '#9a9a9a', border: `4px solid ${INK}` }));
  const amigo = PERS(cam, 560, 900, 340, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' }), tu = PERS(cam, 140, 900, 340, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' });
  const duda = BOCADILLO(cam, 0, 0, '¿Valencia… o Galicia?', { size: 44 });
  const rel = box(cam, 0, 0, 260, 260, { zIndex: 20, transformOrigin: '50% 50%' }, `<svg viewBox="-130 -130 260 260" width="260" height="260"><circle r="120" fill="#fbf6ea" stroke="${INK}" stroke-width="10"/>${[...Array(12)].map((_, i) => `<path d="M0,-108 V-${i % 3 ? 96 : 88}" stroke="${INK}" stroke-width="${i % 3 ? 4 : 8}" transform="rotate(${i * 30})"/>`).join('')}<path d="M0,0 V-90" stroke="${RED}" stroke-width="10" stroke-linecap="round" transform="rotate(90)"/><circle r="10" fill="${INK}"/></svg>`);
  sp(T.proxima, 'pop', 0.4); sp(T.mire, 'ding', 0.8);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 980, 1.0], [540, 940, 1.12]);
    pFace(amigo, t, { feliz: -0.3, ceja: 16, look: [-6, -10], seed: 2 }); pFace(tu, t, { feliz: 1, ceja: t > T.mire ? -8 : 2, look: [14, -4], seed: 1 });
    set(duda, { o: t > T.a3b - 0.3 && t < T.mire ? 1 : 0, x: 480, y: 760, s: pop(t, T.a3b - 0.3, 0.3), r: 3 });
    set(rel, { o: t > T.mire - 0.2 ? 1 : 0, x: 400, y: 720, s: pop(t, T.mire - 0.2, 0.4), r: Math.sin(t * 3) * 4 });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Por qué autovía', 'sales tú de Madrid?', { size: 84, draw: c => [['por la A-1', YEL], ['por la A-3', PINK], ['por la A-6', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(98, 'Las autovías del reloj', ['CARRETERAS', 'y relojes']);

Story.run({
  textura: true,
  ovalo: [[T.mire + 0.2, L(9) - 0.15]],
  vecino: { risa: [[T.mire + 0.2, T.mire + 1.4]], sorpresa: [], golpes: [] },
});
