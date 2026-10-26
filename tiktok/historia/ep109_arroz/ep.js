/* Ep. 109 · «¿Móvil mojado? NO lo metas en arroz». Apple lo pone en su soporte (enero 2024): «Don't put your iPhone in a bag of rice» — las partículas de arroz
   pueden dañarlo. Lo que recomienda: golpecitos con el conector hacia abajo, sitio seco y ventilado, esperar ≥30 min antes de cargar (hasta 24 h); nada de calor,
   aire comprimido ni bastoncillos. Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  mojado: Q('mojado'), arroz0: Q('en arroz'), apple0: Q('lo dice apple'), funciona: Q('sí funciona'),
  cae: Q('se te cae'), agua: Q('al agua'), panico: Q('pánico'), grita: Q('alguien grita'), bol: Q('un bol'),
  todos: Q('hemos hecho todos'), amigo: Q('un amigo'), internet: Q('en internet'), logico: Q('parecía lógico'), chupa: Q('chupa la humedad'),
  fuera: Q('por fuera'), dentro: Q('está dentro'), nollega: Q('no llega'),
  polvo: Q('suelta polvo'), granitos: Q('granitos'), conector: Q('el conector'),
  dosmil: Q('dos mil veinticuatro'), escrito: Q('por escrito'), nometas: Q('no metas'),
  quehago: Q('qué hago'), golpes: Q('golpecitos'), abajo: Q('hacia abajo'),
  seco: Q('sitio seco'), conaire: Q('con aire'), media: Q('media hora'),
  secador: Q('secador'), bastoncillos: Q('bastoncillos'), presion: Q('a presión'), undia: Q('hasta un día'),
  paella: Q('la paella'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZ = '#2b8ad6', ARZ = '#fbf6ea';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* granos de arroz (SVG) repartidos en una caja w×h */
const granos = (w, h, n, seed = 1, col = ARZ, st = '#c9bfa6') => { let s = seed, g = ''; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) g += `<ellipse cx="${f1(r() * w)}" cy="${f1(r() * h)}" rx="13" ry="6" transform="rotate(${f1(r() * 180)} ${f1(r() * w)} ${f1(r() * h)})" fill="${col}" stroke="${st}" stroke-width="${st === INK ? 4 : 2}"/>`; return g; };
/* el móvil (de frente): pantalla, cámara y el conector abajo */
const MOVIL = (c, x, y, w, o = {}) => { const h = w * 2; return box(c, x, y, w, h, { zIndex: o.z || 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 200 400" width="${w}" height="${h}">
  <rect x="6" y="6" width="188" height="388" rx="34" fill="#1d1a22" stroke="${INK}" stroke-width="8"/><rect x="20" y="30" width="160" height="330" rx="18" fill="${o.pant || '#3d6fb0'}"/>
  <rect x="80" y="14" width="40" height="10" rx="5" fill="#000"/><rect x="78" y="376" width="44" height="10" rx="5" fill="#000" stroke="#666" stroke-width="2"/>
  ${o.gotas ? [[50, 90], [140, 150], [70, 250], [150, 300], [100, 190]].map(([a, b]) => `<path d="M${a},${b - 22} Q${a + 14},${b} ${a},${b + 10} Q${a - 14},${b} ${a},${b - 22}Z" fill="#bfe3f5" stroke="${INK}" stroke-width="3"/>`).join('') : ''}</svg>`); };
/* bol de arroz (de lado), con espacio para meter el móvil */
const BOL = (c, x, y, w, z = 6) => box(c, x, y, w, w * 0.62, { zIndex: z }, `<svg viewBox="0 0 500 310" width="${w}" height="${f1(w * 0.62)}">
  <path d="M10,90 Q250,40 490,90 L490,100 Q250,60 10,100Z" fill="${ARZ}" stroke="${INK}" stroke-width="6"/>${granos(480, 50, 40, 3).replace(/<ellipse/g, '<ellipse transform-origin="0 0"')}
  <path d="M10,95 Q20,300 250,300 Q480,300 490,95 Z" fill="#e8507a" stroke="${INK}" stroke-width="9"/><path d="M60,170 Q250,200 440,170" stroke="#fff" stroke-width="10" fill="none" opacity=".5"/></svg>`);
/* la tarjeta de soporte de Apple */
const icoX = (sz = 120) => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><circle cx="50" cy="50" r="44" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M32,32 L68,68 M68,32 L32,68" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>`;
const icoOK = (sz = 120) => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}"><circle cx="50" cy="50" r="44" fill="#2e9e6b" stroke="${INK}" stroke-width="6"/><path d="M28,52 L44,68 L72,34" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* PORTADA + L0-L1: el móvil chorreando hundido en un bol de arroz; sello rojo «NO»; «lo dice Apple»; y «lo que SÍ funciona» */
plano(-1, L(2) - 0.1, { background: '#bfe3f5' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'radial-gradient(circle at 540px 1100px, #fff6c8, #bfe3f5 60%)' });
  box(cam, -600, 1440, 2280, 900, { zIndex: 1, background: '#c99a6b', borderTop: `10px solid ${INK}` });
  const mov = MOVIL(cam, 400, 760, 280, { gotas: 1 });
  const bol = BOL(cam, 190, 1100, 700, 9);
  const vuela = box(cam, 140, 1020, 800, 140, { zIndex: 10 }, `<svg viewBox="0 0 800 140" width="800" height="140">${granos(800, 140, 26, 7)}</svg>`);
  const t1 = texto(c, 140, '¿MÓVIL MOJADO?', { size: 90, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 260, `NO lo metas<br>en ${hlSpan('ARROZ', 'phl', YEL)}`, { size: 108, color: '#fff', z: 40, shadow: OUT });
  const no = box(c, 700, 780, 260, 260, { zIndex: 41, transformOrigin: '50% 50%' }, icoX(260));
  const ap = chip(c, 330, 1600, 'lo dice Apple', { size: 64, bg: INK, color: '#fff', z: 42 });
  const si = chip(c, 220, 1720, 'y lo que SÍ funciona…', { size: 58, bg: '#2e9e6b', z: 42 });
  sp(T.arroz0, 'thud', 0.6); sp(T.arroz0 + 0.35, 'error', 0.5); sp(T.apple0, 'stamp', 0.6); sp(T.funciona, 'ding', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1050, 0.95], [540, 1100, 1.1]);
    set(mov, { y: Math.sin(t * 2.2) * 10, r: -8 + Math.sin(t * 1.3) * 3 });
    set(vuela, { y: -Math.abs(Math.sin(t * 3)) * 20 });
    paint(c.querySelector('.phl'), t, T.arroz0 - 0.1, 0.35); set(t2, { r: -2 + wobble(t, 0.5, 0.8) }); set(t1, { r: wobble(t, 0.4, 0.6, 1) });
    set(no, { o: t > T.arroz0 + 0.3 ? 1 : 0, s: t > T.arroz0 + 0.3 ? lerp(1.8, 1, p(t, T.arroz0 + 0.3, 0.2)) : 0, r: -10 + Math.sin(t * 2) * 3 });
    popA(ap, t, T.apple0, { r: -4 }); popA(si, t, T.funciona - 0.1, { r: 3 });
  };
}, { sfx: false });

/* L2-L3 (corte): la cocina; el móvil cae al vaso, ¡plof!; pánico; alguien grita «¡a un bol de arroz!»; un amigo, internet, «parece lógico»: el arroz chupa las gotas */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#fff6c8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#fff6c8', backgroundImage: 'linear-gradient(rgba(43,33,24,.08) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.08) 3px, transparent 3px)', backgroundSize: '120px 120px' });
  box(cam, -600, 1300, 2280, 1000, { zIndex: 1, background: '#c99a6b', borderTop: `10px solid ${INK}` });
  const vaso = box(cam, 620, 920, 300, 400, { zIndex: 6 }, `<svg viewBox="0 0 300 400" width="300" height="400"><path d="M20,10 L280,10 L250,390 L50,390Z" fill="rgba(191,227,245,.5)" stroke="${INK}" stroke-width="8"/><path d="M34,120 L266,120 L250,384 L50,384Z" fill="#7cc4ea"/></svg>`);
  const mov = MOVIL(cam, 700, 300, 130, { z: 5 });
  const splash = box(cam, 560, 840, 420, 160, { zIndex: 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 420 160" width="420" height="160">${[[60, 60], [130, 20], [210, 5], [290, 20], [360, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y + 40}" r="22" fill="#7cc4ea" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const yo = PERS(cam, 60, 760, 420, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  const grito = chip(c, 140, 380, '¡Rápido, a un bol de ARROZ!', { size: 58, bg: INK, color: YEL, z: 40 });
  const pan = texto(c, 220, '¡PÁNICO!', { size: 130, color: RED, z: 40, shadow: '5px 5px 0 #fff' });
  const fuentes = [['me lo dijo un amigo', PINK, T.amigo], ['lo vi en internet', AZ, T.internet], ['parece lógico…', '#2e9e6b', T.logico]].map(([s, col, tt], i) => [chip(c, 120 + i * 60, 420 + i * 150, s, { size: 54, bg: col, z: 40 }), tt]);
  // «el arroz chupa la humedad»: un bol en primer plano con gotas que bajan hacia el arroz
  const bol = BOL(c, 190, 1950, 700, 30);
  const gotas = [0, 1, 2, 3, 4].map(i => box(c, 300 + i * 110, 0, 50, 70, { zIndex: 31 }, `<svg viewBox="0 0 50 70" width="50" height="70"><path d="M25,4 Q48,44 25,66 Q2,44 25,4Z" fill="#7cc4ea" stroke="${INK}" stroke-width="4"/></svg>`));
  sp(T.cae, 'whoosh', 0.6); sp(T.agua, 'squish', 0.8); sp(T.panico, 'error', 0.5); sp(T.grita, 'boing', 0.5); sp(T.todos, 'pop', 0.4); sp(T.chupa, 'gulp', 0.7);
  return t => {
    const enBol = t > T.logico - 0.4;
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [560, 980, 0.95], [520, 1000, 1.12]);
    const kc = p(t, T.cae - 0.1, T.agua - T.cae + 0.15, E.inCubic); set(mov, { y: lerp(0, 700, kc), r: lerp(0, 160, kc), o: kc < 1 ? 1 : 0 });
    const ks = t > T.agua ? clamp((t - T.agua) / 0.6) : 0; set(splash, { o: ks > 0 && ks < 1 ? 1 : 0, s: lerp(0.3, 1.2, ks), y: -ks * 30 });
    set(vaso, { r: t > T.agua && t < T.agua + 0.6 ? Math.sin(t * 40) * 2 : 0 });
    pFace(yo, t, { feliz: t > T.agua ? -1 : 0.6, ceja: t > T.agua ? 18 : 0, jaw: t > T.panico && t < T.todos ? 0.8 : 0, look: t > T.agua ? [16, 10] : [10, 0], seed: 2 });
    set(yo, { y: t > T.panico && t < T.grita ? Math.sin(t * 30) * 6 : wobble(t, 0.6, 4) });
    set(pan, { o: t > T.panico - 0.1 && t < T.grita ? 1 : 0, s: pop(t, T.panico - 0.1, 0.3), r: -6 + Math.sin(t * 20) * 2 });
    set(grito, { o: t > T.grita && t < T.todos ? 1 : 0, s: pop(t, T.grita, 0.35), r: -3 });
    fuentes.forEach(([f, tt]) => set(f, { o: t > tt - 0.1 && t < T.chupa ? 1 : 0, s: pop(t, tt - 0.1, 0.35), r: -3 + Math.sin(t * 2) * 1.5 }));
    set(bol, { y: enBol ? -lerp(0, 860, p(t, T.logico - 0.4, 0.6, E.outCubic)) : 0 });
    gotas.forEach((g, i) => { const k = ((t - T.chupa) * 0.9 + i * 0.21) % 1; set(g, { o: t > T.chupa - 0.1 ? 1 - k * 0.6 : 0, y: 860 + k * 260, s: 1 - k * 0.5 }); });
  };
});

/* L4-L5 (corte): el móvil abierto en corte: por fuera seco (las gotas desaparecen), por dentro el agua sigue; los granitos y el polvo se meten por el conector */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#efe1c6' });
  // carcasa grande con el interior a la vista
  const cuerpo = box(cam, 230, 420, 620, 1240, { zIndex: 2 }, `<svg viewBox="0 0 620 1240" width="620" height="1240"><rect x="10" y="10" width="600" height="1220" rx="90" fill="#3d3a44" stroke="${INK}" stroke-width="14"/>
    <rect x="60" y="80" width="500" height="1060" rx="40" fill="#2a2530"/>
    <rect x="110" y="140" width="400" height="420" rx="20" fill="#2e6b3a" stroke="#9fd3c0" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${150 + (i % 3) * 120}" y="${200 + Math.floor(i / 3) * 180}" width="80" height="80" rx="8" fill="#1d1a22" stroke="#9fd3c0" stroke-width="4"/>`).join('')}
    <rect x="110" y="620" width="400" height="420" rx="30" fill="#5e5a52" stroke="${INK}" stroke-width="6"/><text x="310" y="850" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="70" fill="#fff">batería</text>
    <rect x="250" y="1180" width="120" height="40" rx="14" fill="#000" stroke="#aaa" stroke-width="4"/></svg>`);
  const charcos = [[300, 600, 150], [640, 720, 120], [330, 1080, 170], [620, 1360, 140]].map(([x, y, w]) => box(cam, x, y, w, w * 0.6, { zIndex: 3, borderRadius: '50%', background: 'rgba(124,196,234,.85)', border: `5px solid ${AZ}` }));
  const gotasF = [[160, 300], [910, 520], [130, 1000], [920, 1250], [520, 360]].map(([x, y]) => box(cam, x, y, 60, 84, { zIndex: 4 }, `<svg viewBox="0 0 50 70" width="60" height="84"><path d="M25,4 Q48,44 25,66 Q2,44 25,4Z" fill="#7cc4ea" stroke="${INK}" stroke-width="4"/></svg>`));
  const lFuera = chip(c, 120, 300, 'por fuera: seco', { size: 60, bg: '#2e9e6b', z: 40 }), lDentro = chip(c, 480, 300, 'por dentro: AGUA', { size: 60, bg: AZ, z: 40 });
  const nollega = texto(c, 1720, 'el arroz no llega', { size: 84, color: RED, z: 40, shadow: '4px 4px 0 #fff' });
  const polvo = box(cam, 240, 1700, 600, 400, { zIndex: 5 }, `<svg viewBox="0 0 600 400" width="600" height="400">${[...Array(40)].map((_, i) => `<circle cx="${(i * 97) % 600}" cy="${(i * 53) % 400}" r="${5 + i % 5}" fill="#8a7a5a"/>`).join('')}${granos(600, 400, 30, 11, '#fff', INK)}</svg>`);
  const con = box(cam, 470, 1585, 140, 80, { zIndex: 6, border: `8px solid ${RED}`, borderRadius: '20px' });
  const etq = chip(c, 300, 300, '¡por el conector!', { size: 62, bg: RED, z: 41 });
  sp(T.fuera, 'swoosh_up', 0.5); sp(T.dentro, 'squish', 0.6); sp(T.nollega, 'error', 0.5); sp(T.polvo, 'paper', 0.6); sp(T.conector, 'thud', 0.6);
  return t => {
    const cpo = t > T.polvo - 0.3;
    // primero todo el móvil; luego baja hacia el conector siguiendo los granitos (un solo sentido)
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 1000, 0.92], [540, 1560, 1.25]);
    gotasF.forEach((g, i) => set(g, { o: t > T.fuera + i * 0.12 ? 0 : 1, s: t > T.fuera + i * 0.12 ? 0 : 1 + 0.04 * Math.sin(t * 4 + i), y: Math.sin(t * 2 + i) * 6 }));
    charcos.forEach((ch, i) => set(ch, { o: t > T.dentro - 0.2 ? 1 : 0, s: (t > T.dentro - 0.2 ? pop(t, T.dentro - 0.2 + i * 0.1, 0.4) : 0) * (1 + 0.05 * Math.sin(t * 3 + i)) }));
    set(lFuera, { o: t > T.fuera - 0.1 && t < T.dentro ? 1 : 0, s: pop(t, T.fuera - 0.1, 0.3), r: -3 });
    set(lDentro, { o: t > T.dentro - 0.1 && t < T.polvo - 0.3 ? 1 : 0, s: pop(t, T.dentro - 0.1, 0.3), r: 3 });
    set(nollega, { o: t > T.nollega - 0.1 && t < T.polvo - 0.3 ? 1 : 0, s: pop(t, T.nollega - 0.1, 0.35), r: -4 });
    set(polvo, { o: cpo ? 1 : 0, y: cpo ? lerp(300, -20, p(t, T.polvo - 0.3, T.conector - T.polvo + 0.4, E.inOutCubic)) : 300, s: cpo ? lerp(1, 0.4, p(t, T.polvo - 0.3, T.conector - T.polvo + 0.6)) : 1 });
    set(con, { o: t > T.conector - 0.1 ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 9) });
    set(etq, { o: t > T.conector - 0.1 ? 1 : 0, s: pop(t, T.conector - 0.1, 0.35), r: -4 });
  };
});

/* L6 (corte): la página de soporte de Apple con la frase original, y la versión en grande */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#f4f4f6' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#f4f4f6' });
  const pag = box(cam, 90, 500, 900, 1000, { zIndex: 2, background: '#fff', border: `8px solid ${INK}`, borderRadius: '34px', boxShadow: `14px 14px 0 ${INK}`, padding: '60px 60px', boxSizing: 'border-box', fontFamily: 'Bricolage', color: INK },
    `<div style="font-size:40px;font-weight:800;opacity:.55">Soporte de Apple · 2024</div><div style="font-size:62px;font-weight:800;line-height:1.1;margin-top:26px">If your iPhone gets wet…</div>
     <div style="height:16px;background:#e3e3e8;border-radius:8px;margin:44px 0 18px;width:90%"></div><div style="height:16px;background:#e3e3e8;border-radius:8px;width:70%"></div>
     <div class="frase" style="position:relative;font-size:56px;font-weight:800;line-height:1.15;margin-top:60px">“Don't put your iPhone in a bag of rice.”</div>
     <div style="height:16px;background:#e3e3e8;border-radius:8px;margin:60px 0 18px;width:85%"></div><div style="height:16px;background:#e3e3e8;border-radius:8px;width:60%"></div>`);
  const marca = box(pag, 40, 420, 820, 150, { zIndex: -1, background: YEL, transformOrigin: '0 50%', borderRadius: '10px', opacity: 0.9 });
  const ano = chip(c, 380, 300, '2024', { size: 80, bg: INK, color: YEL, z: 40 });
  const grande = texto(c, 1560, '«No metas tu iPhone<br>en arroz»', { size: 84, color: RED, z: 40, shadow: '4px 4px 0 #fff' });
  sp(T.dosmil, 'whoosh', 0.5); sp(T.escrito, 'papel_w', 0.6); sp(T.nometas, 'stamp', 0.8);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 1000, 0.9], [540, 1020, 1.05]);
    popA(ano, t, T.dosmil - 0.1, { r: -4 });
    marca.style.transform = `scaleX(${f1(p(t, T.nometas - 0.2, 0.6, E.outCubic) * 1000) / 1000})`;
    set(grande, { o: t > T.nometas + 0.4 ? 1 : 0, s: pop(t, T.nometas + 0.4, 0.4), r: -3 + wobble(t, 0.5, 0.8) });
  };
});

/* L7-L9 (corte): qué hacer — 1) golpecitos con el conector hacia abajo; 2) sitio seco y con aire, 30 min antes de cargar; 3) nada de secador, bastoncillos ni aire a presión; hasta 24 h */
plano(L(7) - 0.1, L(10) - 0.1, { background: '#dff3ea' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 4400, { zIndex: 0, background: '#dff3ea' });
  // paso 1 (arriba): la mano y el móvil boca abajo
  const n1 = chip(cam, 80, 260, '1 · golpecitos', { size: 64, bg: '#2e9e6b', z: 5 });
  const mano = box(cam, 300, 900, 520, 240, { zIndex: 3 }, `<svg viewBox="0 0 520 240" width="520" height="240"><path d="M20,120 Q20,60 120,60 L440,60 Q500,60 500,110 Q500,150 440,150 L300,150 Q330,200 260,220 L120,220 Q20,220 20,120Z" fill="#f2c9a0" stroke="${INK}" stroke-width="9"/></svg>`);
  const m1 = MOVIL(cam, 440, 420, 220, { z: 4, gotas: 1 });
  const caen = [0, 1, 2].map(i => box(cam, 520 + i * 30, 0, 40, 56, { zIndex: 4 }, `<svg viewBox="0 0 50 70" width="40" height="56"><path d="M25,4 Q48,44 25,66 Q2,44 25,4Z" fill="#7cc4ea" stroke="${INK}" stroke-width="4"/></svg>`));
  const abajo = chip(cam, 120, 1200, 'conector hacia abajo', { size: 56, bg: INK, color: '#fff', z: 5 });
  // paso 2 (abajo): mesa, brisa y reloj de 30 min
  const n2 = chip(cam, 80, 1460, '2 · seco y con aire', { size: 64, bg: AZ, z: 5 });
  box(cam, -200, 2100, 1480, 60, { zIndex: 2, background: '#c99a6b', border: `8px solid ${INK}` });
  const m2 = box(cam, 300, 2030, 360, 80, { zIndex: 3, background: '#1d1a22', border: `8px solid ${INK}`, borderRadius: '24px' });
  const brisa = [0, 1, 2].map(i => box(cam, 0, 1800 + i * 90, 300, 40, { zIndex: 3 }, `<svg viewBox="0 0 300 40" width="300" height="40"><path d="M0,20 Q75,0 150,20 T300,20" stroke="#7cc4ea" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`));
  const reloj = box(cam, 740, 1640, 260, 260, { zIndex: 4 }, `<svg viewBox="0 0 260 260" width="260" height="260"><circle cx="130" cy="130" r="118" fill="#fff" stroke="${INK}" stroke-width="10"/><path class="sect" d="M130,130 L130,18 A112,112 0 0,1 130,242 Z" fill="${YEL}"/><circle cx="130" cy="130" r="10" fill="${INK}"/></svg>`);
  const media = chip(cam, 700, 1940, '30 min', { size: 60, bg: YEL, color: INK, z: 5 });
  const enchufe = chip(cam, 160, 2220, 'y luego, a cargar', { size: 54, bg: '#2e9e6b', z: 5 });
  // paso 3 (abajo del todo): lo prohibido
  const n3 = chip(cam, 80, 2440, '3 · NADA de…', { size: 64, bg: RED, z: 5 });
  const prohib = [['secador', T.secador], ['bastoncillos', T.bastoncillos], ['aire a presión', T.presion]].map(([s, tt], i) => [box(cam, 90 + i * 0, 2600 + i * 230, 900, 190, { zIndex: 4, background: '#fff', border: `8px solid ${INK}`, borderRadius: '30px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '70px', lineHeight: '174px', paddingLeft: '220px', boxSizing: 'border-box', color: INK }, `<div style="position:absolute;left:40px;top:28px">${icoX(130)}</div>${s}`), tt]);
  const dia = chip(c, 170, 1260, 'puede tardar hasta 24 h', { size: 60, bg: INK, color: YEL, z: 40 });
  const ok = box(c, 820, 330, 200, 200, { zIndex: 40 }, icoOK(200));
  sp(T.golpes, 'tick', 0.6); sp(T.golpes + 0.3, 'tick', 0.6); sp(T.golpes + 0.6, 'tick', 0.6); sp(T.abajo, 'pop', 0.5);
  sp(T.seco, 'whoosh', 0.5); sp(T.media, 'clockfast', 0.6); sp(T.secador, 'error', 0.45); sp(T.bastoncillos, 'error', 0.45); sp(T.presion, 'error', 0.45); sp(T.undia, 'ding', 0.6);
  return t => {
    // la cámara baja de un paso al siguiente sin volver atrás
    const y1 = 700, y2 = 1900, y3 = 3000;
    let cy = y1; if (t > T.seco - 0.6) cy = lerp(y1, y2, p(t, T.seco - 0.6, 0.9, E.inOutCubic)); if (t > T.secador - 0.8) cy = lerp(y2, y3, p(t, T.secador - 0.8, 0.9, E.inOutCubic));
    const s = 0.95 + 0.08 * clamp((t - L(7)) / (L(10) - L(7))); cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - 540 * s, y: 960 - (cy + Math.sin(t * 0.8) * 20) * s, s });
    [n1, n2, n3].forEach((n, i) => set(n, { r: -3 + Math.sin(t * 2 + i) * 1.5 }));
    const tap = t > T.golpes - 0.1 ? Math.abs(Math.sin((t - T.golpes) * 9)) : 0; set(m1, { r: -12, y: tap * 60 });
    caen.forEach((g, i) => { const k = ((t - T.golpes) * 1.3 + i * 0.33) % 1; set(g, { o: t > T.golpes ? 1 - k : 0, y: 860 + k * 340, x: (i - 1) * 40 * k }); });
    popA(abajo, t, T.abajo - 0.1, { r: -3 });
    brisa.forEach((b, i) => set(b, { x: ((t * 260 + i * 120) % 700) - 100, o: t > T.conaire - 0.2 ? 0.9 : 0 }));
    const sect = cam.querySelector('.sect'); const kr = p(t, T.media, 1.4, E.outCubic); if (sect) { const a = kr * Math.PI * 2 * 0.999, x = 130 + 112 * Math.sin(a), y = 130 - 112 * Math.cos(a); sect.setAttribute('d', `M130,130 L130,18 A112,112 0 ${a > Math.PI ? 1 : 0},1 ${f1(x)},${f1(y)} Z`); }
    popA(media, t, T.media - 0.1, { r: -4 }); popA(enchufe, t, T.media + 0.8, { r: 3 });
    prohib.forEach(([b, tt]) => set(b, { o: t > tt - 0.15 ? 1 : 0, s: pop(t, tt - 0.15, 0.35), r: -2 }));
    set(dia, { o: t > T.undia - 0.2 ? 1 : 0, s: pop(t, T.undia - 0.2, 0.35), r: -3 });
    set(ok, { o: t > T.golpes - 0.2 && t < T.secador - 0.3 ? 1 : 0, s: pop(t, T.golpes - 0.2, 0.35) * (1 + 0.05 * Math.sin(t * 5)) });
  };
});

/* L10 (corte): el arroz… a la paella */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#fff6c8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'radial-gradient(circle at 540px 1050px, #ffe9a6, #fff6c8 60%)' });
  const pae = box(cam, 90, 700, 900, 700, { zIndex: 3 }, `<svg viewBox="0 0 900 700" width="900" height="700"><ellipse cx="450" cy="360" rx="420" ry="300" fill="#3d3a44" stroke="${INK}" stroke-width="12"/>
    <rect x="-10" y="330" width="60" height="40" rx="12" fill="#3d3a44" stroke="${INK}" stroke-width="8"/><rect x="850" y="330" width="60" height="40" rx="12" fill="#3d3a44" stroke="${INK}" stroke-width="8"/>
    <ellipse cx="450" cy="350" rx="380" ry="260" fill="#f2b230"/>${granos(700, 420, 120, 5, '#fbe9a0').replace('<ellipse', '<g transform="translate(100 140)"><ellipse')}</g>
    ${[[260, 260], [560, 230], [640, 420], [330, 440]].map(([x, y]) => `<path d="M${x},${y} q40,-60 90,-10 q-10,40 -50,40" fill="#e8504a" stroke="${INK}" stroke-width="6"/>`).join('')}
    ${[[450, 330], [200, 360]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="40" fill="#f2e24a" stroke="${INK}" stroke-width="6"/>`).join('')}
    ${[[380, 220], [520, 480], [700, 300]].map(([x, y]) => `<rect x="${x}" y="${y}" width="50" height="22" rx="10" fill="#2e9e6b" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const mov = MOVIL(cam, 860, 560, 140, { z: 4 });
  const t1 = texto(c, 220, `el arroz…<br>${hlSpan('para la paella', 'phl2', YEL)}`, { size: 104, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const ok = box(c, 120, 1500, 180, 180, { zIndex: 40 }, icoOK(180));
  sp(T.paella, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(10) - 0.1, L(11) - 0.1, [540, 1050, 0.95], [540, 1050, 1.1]);
    set(pae, { r: Math.sin(t * 1.5) * 2 }); set(mov, { y: Math.sin(t * 2.4) * 12, r: 12 + Math.sin(t * 1.7) * 4 });
    paint(c.querySelector('.phl2'), t, T.paella - 0.2, 0.35); set(t1, { r: wobble(t, 0.5, 0.8) });
    set(ok, { o: t > T.paella ? 1 : 0, s: pop(t, T.paella, 0.35), r: -6 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú también lo has', 'metido en arroz?', { size: 88, draw: c => [['sí, mil veces', YEL], ['funcionó (de suerte)', PINK], ['ahora ya no', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 260 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(109, 'Móvil en arroz', ['MITO', 'desmontado']);

Story.run({
  textura: true,
  ovalo: [[T.paella + 0.2, L(11) - 0.15]],
  vecino: { risa: [[T.paella, L(11) - 0.2]], sorpresa: [[T.secador, T.secador + 1]], golpes: [] },
});
