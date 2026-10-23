/* Ep. 85 · El cruasán es una burla a los turcos (leyenda de Viena, 1683) — FORMATO CUENTO: un corte de la ciudad (panadería · muralla · campamento turco)
   con el túnel por debajo; la cámara baja, sube y barre por el mismo mundo. Rótulos dentro de la escena. */
Story.prepara();
const T = {
  burla0: Q('una burla'),
  mojas: Q('lo mojas'), cafe: Q('en el café'), simbolo1: Q('el símbolo del enemigo'),
  viena2: Q('viena'), m1683: Q('mil seiscientos ochenta y tres'), ejercito: Q('ejército turco'), rodea: Q('rodea la ciudad'),
  arriba: Q('por arriba'), denoche: Q('de noche'), cavar: Q('cavar un túnel'), muralla: Q('la muralla'),
  duerme: Q('toda viena duerme'), bueno: Q('bueno'), toda: Q('toda no'), panaderos: Q('los panaderos'), madrugada: Q('de madrugada'),
  masa: Q('entre masa'), oye: Q('oye algo'), suelo: Q('bajo el suelo'), tac: Q('tac'),
  picando: Q('están picando'), alarma: Q('la alarma'), soldados: Q('los soldados'), tunel7: Q('al túnel'), pillan: Q('pillan a los turcos'), pala: Q('la pala'),
  ayuda: Q('llega ayuda'), asedio: Q('el asedio se rompe'), salva: Q('viena se salva'),
  celebrar: Q('para celebrarlo'), pan: Q('un pan'), forma: Q('la forma'), luna: Q('la media luna'),
  desayuno: Q('el desayuno'), literal: Q('literalmente'),
  ojo: Q('ojo'), leyenda: Q('es leyenda'), paris: Q('a parís'),
  osea: Q('o sea'), muerdas: Q('muerdas la punta'), porviena: Q('por viena'),
};
const SUELO_Y = 1500, TIERRA_C = '#6b4a2a', TIERRA_O = '#5a3d22', TUN_Y = 1820, TUN_X1 = 2380, TUN_X0 = 1060;
const ORO = '#e0a043';
/* cruasán (vb 0 0 300 200) y bandera de la media luna (vb 0 0 300 200) */
const CRUASAN_SVG = `<svg viewBox="0 0 300 200" width="100%" height="100%" style="overflow:visible"><path d="M20,150 C0,90 60,30 150,30 C240,30 300,90 280,150 C250,120 210,110 190,130 C175,95 125,95 110,130 C90,110 50,120 20,150 Z" fill="${ORO}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M110,130 C120,80 180,80 190,130 M70,60 C80,90 100,110 110,130 M230,60 C220,90 200,110 190,130" stroke="#b5762a" stroke-width="7" fill="none"/><path d="M90,58 C120,46 180,46 210,58" stroke="#f6c97a" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
const BANDERA_SVG = `<svg viewBox="0 0 300 200" width="100%" height="100%"><rect x="4" y="4" width="292" height="192" fill="${RED}" stroke="${INK}" stroke-width="8"/><circle cx="130" cy="100" r="62" fill="#fff"/><circle cx="152" cy="100" r="52" fill="${RED}"/><path d="M215,100 l-26,9 16,-22 0,26 -16,-22 Z" fill="#fff"/></svg>`;
const CRUASAN = (c, x, y, w, z = 10) => box(c, x, y, w, w * 2 / 3, { zIndex: z, transformOrigin: '50% 50%' }, CRUASAN_SVG);
const BANDERA = (c, x, y, w, z = 5) => box(c, x, y, w, w * 1.6, { zIndex: z, transformOrigin: '0 0' }, `<svg viewBox="0 0 300 480" width="${w}" height="${w * 1.6}"><path d="M10,0 V480" stroke="${INK}" stroke-width="12"/></svg><div style="position:absolute;left:${w * 0.05}px;top:0;width:${w * 0.95}px;height:${w * 0.63}px">${BANDERA_SVG}</div>`);
const TIENDA = (w, col) => `<svg viewBox="0 0 300 260" width="${w}" height="${w * 260 / 300}"><path d="M0,260 L150,10 L300,260 Z" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M150,10 L150,260" stroke="${INK}" stroke-width="5"/><path d="M120,260 L150,140 L180,260 Z" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><path d="M40,200 H260" stroke="${GOLD}" stroke-width="8"/></svg>`;
const PICO = (c, z = 9) => box(c, 0, 0, 130, 130, { zIndex: z, transformOrigin: '20% 80%' }, `<svg viewBox="0 0 130 130" width="130" height="130"><path d="M20,120 L100,30" stroke="#6b4a2a" stroke-width="12" stroke-linecap="round"/><path d="M60,10 C90,10 120,30 125,50 C110,40 90,34 70,36 Z" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/></svg>`);
const CAMPANA = c => box(c, 0, 0, 120, 120, { zIndex: 7, transformOrigin: '50% 0' }, `<svg viewBox="0 0 120 120" width="120" height="120"><path d="M60,0 V14 M20,96 C20,40 36,18 60,18 C84,18 100,40 100,96 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><path d="M10,96 H110" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="60" cy="108" r="10" fill="${INK}"/></svg>`);

function viena(c) {
  const M = MUNDO(c, 3000, 3800);
  M.far.innerHTML = `<svg viewBox="0 0 3000 3800" width="3000" height="3800"><path d="M0,1300 C400,1180 800,1260 1200,1200 C1600,1140 2000,1260 2400,1180 C2700,1130 2900,1200 3000,1180 V3800 H0 Z" fill="#5d6b72" stroke="${INK}" stroke-width="6"/></svg>`;
  // ciudad: casas, campanario, panadería en corte
  const casas = [[40, 1080, 220, 420, '#9a3f2a'], [250, 1140, 180, 360, '#b5523a'], [1080, 1120, 200, 380, '#a8452e']].map(([x, y, w, h, tc]) => box(M.w, x, y, w, h, { zIndex: 3 }, CASA(w, h, tc)));
  const torre = box(M.w, 140, 640, 180, 860, { zIndex: 2 }, `<svg viewBox="0 0 180 860" width="180" height="860"><path d="M20,860 V200 L90,0 L160,200 V860 Z" fill="#e9dcc2" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M50,330 C50,250 130,250 130,330 V420 H50 Z" fill="#3d3a44" stroke="${INK}" stroke-width="6"/></svg>`);
  const campana = CAMPANA(M.w); set(campana, { x: 170, y: 920 });
  const pana = box(M.w, 440, 1000, 620, 500, { zIndex: 3, background: '#e9dcc2', border: `7px solid ${INK}` });
  box(pana, -40, -110, 700, 120, { background: '#b5523a', border: `7px solid ${INK}`, clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' });
  const horno = box(pana, 340, 180, 240, 290, { background: '#a8452e', border: `7px solid ${INK}`, borderRadius: '120px 120px 0 0' });
  const fuego = box(horno, 50, 120, 130, 150, { background: 'radial-gradient(circle at 50% 80%, #ffe27a, #ff8a2a 55%, #a8452e 80%)', borderRadius: '65px 65px 0 0', border: `5px solid ${INK}` });
  const mesa = box(pana, 30, 330, 300, 30, { background: '#8a5a32', border: `6px solid ${INK}` });
  box(pana, 60, 355, 20, 135, { background: '#6b4a2a', border: `4px solid ${INK}` }); box(pana, 280, 355, 20, 135, { background: '#6b4a2a', border: `4px solid ${INK}` });
  const masa = box(pana, 120, 296, 140, 44, { background: '#f6e4bd', border: `5px solid ${INK}`, borderRadius: '50%' });
  const rot_ = box(pana, 160, 20, 300, 70, { background: '#f4ecd8', border: `5px solid ${INK}`, fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', lineHeight: '60px', color: INK }, 'PANADERÍA');
  // muralla
  const mur = box(M.w, 1300, 760, 200, 760, { zIndex: 5 }, `<svg viewBox="0 0 200 760" width="200" height="760"><path d="M0,760 V60 H40 V0 H80 V60 H120 V0 H160 V60 H200 V760 Z" fill="#a8a294" stroke="${INK}" stroke-width="7"/>${[...Array(14)].map((_, j) => `<path d="M0,${110 + j * 48} H200" stroke="#7d786c" stroke-width="4"/><path d="M${j % 2 ? 60 : 130},${110 + j * 48} V${158 + j * 48}" stroke="#7d786c" stroke-width="4"/>`).join('')}</svg>`);
  // campamento turco
  const tiendas = [[1760, 1290, 260, '#f4efe2'], [2060, 1250, 300, '#c8102e'], [2420, 1290, 260, '#f4efe2'], [2700, 1270, 280, '#2e6b3a']].map(([x, y, w, col]) => box(M.w, x, y, w, w * 260 / 300, { zIndex: 3 }, TIENDA(w, col)));
  const banderas = [[1900, 1000, 150], [2560, 980, 150]].map(([x, y, w]) => BANDERA(M.w, x, y, w));
  const turcos = [[1660, 220], [2000, 230], [2380, 210]].map(([x, w], i) => [PERSm(M.w, w, { ropa: ['#2e6b3a', '#a8452e', '#2b3550'][i], gorro: 'turbante', barba: true, z: 8 }), x, w]);
  // suelo con corte: tierra, túnel y pozo de entrada
  const tierra = box(M.w, 0, SUELO_Y, 3000, 2300, { zIndex: 4, background: TIERRA_C, borderTop: `10px solid #7d9a52`, backgroundImage: `radial-gradient(circle, ${TIERRA_O} 14px, transparent 15px)`, backgroundSize: '160px 120px' });
  const pozo = box(M.w, TUN_X1 - 30, SUELO_Y, 120, TUN_Y - SUELO_Y + 80, { zIndex: 5, background: '#2a1d12', border: `6px solid ${INK}` });
  const tunel = box(M.w, TUN_X1, TUN_Y, 10, 150, { zIndex: 5, background: '#2a1d12', border: `6px solid ${INK}`, borderRadius: '70px 0 0 70px' });
  const vigas = [...Array(6)].map((_, i) => box(M.w, 0, TUN_Y - 6, 22, 162, { zIndex: 6, background: '#8a5a32', border: `4px solid ${INK}` }));
  const zapadores = [0, 1].map(i => [PERSm(M.w, 170, { ropa: ['#a8452e', '#2e6b3a'][i], gorro: 'turbante', z: 7 }), PICO(M.w)]);
  const panadero = PERSm(M.w, 230, { ropa: '#f4efe2', gorro: 'gorro', pelo: 'calvo', barba: true, pcol: '#8a5a32', z: 6 });
  const soldados = [0, 1, 2].map(i => PERSm(M.w, 180, { ropa: '#c8102e', gorro: 'casco', z: 7 }));
  const luna = LUNA(c, 1), sol = SOL(c, 1), est = ESTRELLAS_C(c, 26, 1); [luna, sol, ...est].forEach(e => M.vp.appendChild(e));
  return { M, campana, pana, fuego, masa, tunel, vigas, zapadores, panadero, soldados, turcos, tiendas, banderas, luna, sol, est };
}
/* frente del túnel: avanza de derecha a izquierda bajo la muralla durante la noche */
const frente = t => t < T.cavar ? TUN_X1 : lerp(TUN_X1, TUN_X0, p(t, T.cavar, T.picando - T.cavar, E.linear));
const CIELO = () => [[-1, '#e89a5a', '#f6d08a', '#ffb070', 0.1], [T.denoche - 0.2, '#e89a5a', '#f6d08a', '#ffb070', 0.1], [T.denoche + 0.8, '#0f1730', '#2b3a66', '#3a4a8a', 0.5],
  [T.asedio, '#121a38', '#33427a', '#3a4a8a', 0.45], [T.salva + 0.3, '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [T.celebrar + 0.5, '#9fd0ee', '#f6ecd0', '#ffffff', 0], [999, '#9fd0ee', '#f6ecd0', '#ffffff', 0]];
const noche = t => t > T.denoche + 0.3 && t < T.salva;
const pintaMundo = (W, t) => {
  cielo(W.M, t, CIELO()); const n = noche(t) ? 1 : 0;
  set(W.luna, { x: 820, y: 230, o: n }); brillan(W.est, t, n); const ks = p(t, T.salva - 0.2, 1.4, E.outCubic); set(W.sol, { x: 120, y: lerp(1300, 300, ks), o: t > T.salva - 0.2 ? 1 : 0 });
  const fx = frente(t); W.tunel.style.left = px(fx); W.tunel.style.width = px(TUN_X1 - fx + 40);
  W.vigas.forEach((v, i) => { const vx = TUN_X1 - 120 - i * 220; set(v, { x: vx, o: vx > fx + 40 ? 1 : 0 }); });
  W.fuego.style.filter = `brightness(${f1(1 + 0.2 * Math.sin(t * 9))})`;
};

/* L0 · PORTADA (fotograma 0 completo, amarilla): el cruasán sonríe pícaro delante de la bandera de la media luna; el turco, ofendidísimo */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 200, 'El cruasán es…', { size: 96 });
  const t2 = texto(c, 310, '…una ' + hlSpan('BURLA', 'phl'), { size: 150, italic: true });
  const ba = box(c, 280, 500, 560, 373, { zIndex: 4, transform: 'rotate(-4deg)' }, BANDERA_SVG);
  const cr = CRUASAN(c, 300, 760, 560, 10);
  const cara = box(cr, 210, 120, 140, 90, { zIndex: 2 }, `<svg viewBox="0 0 140 90" width="140" height="90"><circle cx="35" cy="25" r="12" fill="${INK}"/><circle cx="105" cy="25" r="12" fill="${INK}"/><path d="M20,52 Q70,96 120,52" stroke="${INK}" stroke-width="9" fill="#7a2a20"/></svg>`);
  const tu = PERS(c, 650, 1060, 260, { ropa: '#2e6b3a', gorro: 'turbante', barba: true, severo: true });
  const ja = BOCADILLO(c, 820, 980, '¡oye!', { size: 52 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.burla0, 'boing', 0.9); sp(T.burla0 + 0.2, 'stamp', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(cr, { r: -6 + Math.sin(t * 3) * 4, y: -Math.abs(Math.sin(t * 3)) * 16 }); set(ba, { r: -4 + Math.sin(t * 2) * 2 });
    pFace(tu, t, { feliz: -1, ceja: 18, look: [-14, -6], jaw: 0.5 }); set(ja, { r: 6, s: t < T.burla0 ? 1 : 1 + 0.1 * Math.sin(t * 12) });
  };
}, { sfx: false });
shakeAt(T.burla0, 0.3, 12);

/* L1 · hoy: lo mojas en el café… y el cruasán se convierte en la bandera del enemigo */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#f3e2c4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(168,69,46,.12) 0 60px, transparent 60px 120px)' }, c => {
  const mesa = box(c, 0, 1150, 1080, 770, { zIndex: 1, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const taza = box(c, 330, 800, 440, 380, { zIndex: 5 }, `<svg viewBox="0 0 440 380" width="440" height="380"><path d="M30,60 H360 L330,340 C326,366 64,366 60,340 Z" fill="#fff" stroke="${INK}" stroke-width="9"/><ellipse cx="195" cy="62" rx="165" ry="26" fill="#6b3a1e" stroke="${INK}" stroke-width="8"/><path d="M360,110 C440,110 440,230 344,240" stroke="${INK}" stroke-width="16" fill="none"/></svg>`);
  const vap = [0, 1, 2].map(i => box(c, 420 + i * 80, 640, 30, 140, { zIndex: 4, borderLeft: `8px solid rgba(255,255,255,.8)`, borderRadius: '50%' }));
  const cr = CRUASAN(c, 380, 440, 360, 8), ba = box(c, 380, 440, 360, 240, { zIndex: 9 }, BANDERA_SVG);
  const rot_ = ROTULO(c, 600, 380, 'HOY', 'en tu desayuno', { w: 300 });
  sp(T.mojas, 'gulp', 0.8); sp(T.simbolo1, 'glitch', 0.8); sp(T.simbolo1 + 0.3, 'thud', 0.8);
  return t => {
    const km = p(t, T.mojas, 0.5, E.inOutCubic) * (1 - p(t, T.cafe + 0.4, 0.4)); set(cr, { y: km * 330, r: -30 * km });
    vap.forEach((v, i) => set(v, { o: 0.6, y: -((t * 60 + i * 50) % 120), x: Math.sin(t * 3 + i) * 10 }));
    const kb = p(t, T.simbolo1, 0.35); set(cr, { o: 1 - kb, y: km * 330, r: -30 * km, s: 1 + kb * 0.2 }); set(ba, { o: kb, s: lerp(0.4, 1, kb), r: Math.sin(t * 3) * 4 });
    rotuloA(rot_, t, L(1));
  };
});

/* PLANO A (L2 → CTA): Viena 1683 (barrido de la ciudad al campamento) → por arriba no pueden → anochece y cavan → la ciudad duerme →
   la panadería encendida → el panadero amasa… y bajo el suelo: tac, tac, tac */
plano(L(2) - 0.1, L(6) - 0.1, { background: '#0f1730' }, c => {
  const W = viena(c);
  const r1 = ROTULO(c, 560, 380, 'VIENA · 1683', 'asediada', { w: 440, size: 58 });
  const zz = [0, 1, 2].map(i => texto(W.M.w, 0, 'z', { size: 70 + i * 14, italic: true, color: '#f4efe2', x: 0, w: 80, z: 12, shadow: `3px 3px 0 ${INK}` }));
  const tacs = [0, 1, 2].map(i => texto(W.M.w, 0, 'tac', { size: 80, italic: true, color: GOLD, x: 0, w: 200, z: 12, shadow: `4px 4px 0 ${INK}` }));
  const escala = box(W.M.w, 1500, 900, 80, 600, { zIndex: 6, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 80 600" width="80" height="600"><path d="M10,0 V600 M70,0 V600" stroke="#8a5a32" stroke-width="12"/>${[...Array(10)].map((_, j) => `<path d="M10,${30 + j * 60} H70" stroke="#8a5a32" stroke-width="9"/>`).join('')}</svg>`);
  sp(T.viena2, 'whoosh', 0.7); sp(T.m1683, 'stamp', 0.6); sp(T.ejercito, 'drumroll', 0.6); sp(T.arriba + 0.4, 'thud', 0.8); sp(T.cavar, 'swoosh_up', 0.6);
  sp(T.duerme, 'pop', 0.4); sp(T.toda, 'ding', 0.6); sp(T.masa, 'squish', 0.6); sp(T.masa + 0.6, 'squish', 0.5); [0, 1, 2].forEach(i => sp(T.tac + i * 0.55, 'click', 0.9));
  return t => {
    camara(W.M, t, [[L(2) - 0.1, 1500, 800, 0.6], [T.m1683 + 0.4, 1400, 1260, 0.62], [T.ejercito + 0.3, 2250, 1320, 0.85], [T.rodea + 0.6, 1500, 1300, 0.62],
      [T.arriba + 0.2, 1500, 1150, 0.85], [T.cavar - 0.2, 1700, 1300, 0.7], [T.muralla + 0.4, 1750, 1850, 0.85], [T.duerme - 0.1, 1750, 1850, 0.85],
      [T.duerme + 0.6, 650, 1150, 0.8], [T.toda + 0.2, 750, 1250, 1.05], [T.madrugada + 0.2, 720, 1300, 1.45], [T.oye, 720, 1330, 1.5], [T.suelo + 0.2, 1050, 1650, 0.8], [L(6), 1050, 1650, 0.8]]);
    pintaMundo(W, t); rotuloA(r1, t, T.viena2 + 0.2, T.arriba);
    // turcos en el campamento (marchan); uno sube la escala y se cae
    W.turcos.forEach(([f, x, w], i) => pies(f, w, x + Math.sin(t * 2 + i) * 20, SUELO_Y - (t > T.ejercito ? Math.abs(Math.sin(t * 6 + i)) * 12 : 0)));
    W.turcos.forEach(([f], i) => pFace(f, t, { feliz: t > T.arriba + 0.4 && i === 0 ? -1 : 0.3, ceja: 12, look: [-14, 0], seed: i }));
    const kk = p(t, T.arriba + 0.4, 0.5, E.inCubic); set(escala, { o: t > T.arriba - 0.3 && t < T.cavar + 0.5 ? 1 : 0, r: -10 + 70 * kk });
    // zapadores en el frente del túnel
    const fx = frente(t); W.zapadores.forEach(([z, pi], i) => { pies(z, 170, fx + 90 + i * 130, TUN_Y + 150); pFace(z, t, { feliz: 0.2, ceja: 10, look: [-14, 0], seed: 4 + i }); z.style.visibility = t > T.cavar - 0.2 ? 'visible' : 'hidden'; set(pi, { x: fx + 20 + i * 130, y: TUN_Y + 10, r: -40 + Math.max(0, Math.sin(t * 8 + i * 1.5)) * 50, o: t > T.cavar - 0.2 ? 1 : 0 }); });
    // ciudad dormida y panadero
    zz.forEach((z, i) => { const k = ((t - T.duerme) * 0.6 + i / 3) % 1; set(z, { o: t > T.duerme && t < T.bueno + 0.4 ? 1 - k : 0, x: 300 + i * 40, y: 1060 - k * 160 }); });
    pies(W.panadero, 230, 640, 1460); const amasa = t > T.panaderos; set(W.masa, { sx: amasa ? 1 + 0.18 * Math.sin(t * 8) : 1, sy: amasa ? 1 - 0.18 * Math.sin(t * 8) : 1 });
    pFace(W.panadero, t, { feliz: t > T.oye ? -0.4 : 1, ceja: t > T.oye ? 18 : 6, look: t > T.oye ? [0, 14] : [10, 6], jaw: 0, closed: t > T.panaderos && t < T.masa + 0.4 && ((t * 2) % 1) < 0.1, seed: 2 });
    tacs.forEach((x, i) => { const t0 = T.tac + i * 0.55, k = p(t, t0, 0.8); set(x, { o: t > t0 ? 1 - k * 0.7 : 0, x: frente(t) - 120 + i * 90, y: TUN_Y - 40 - k * 220, s: pop(t, t0, 0.25) }); });
  };
});
shakeAt(T.tac, 0.15, 6); shakeAt(T.tac + 0.55, 0.15, 6); shakeAt(T.tac + 1.1, 0.15, 8);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* PLANO B (L7 → L10): ¡están picando! → campana → los soldados bajan al túnel y pillan a los turcos con la pala → amanece, el asedio se rompe →
   el panadero da forma a la media luna… y se la come */
plano(L(7) - 0.1, L(11) - 0.1, { background: '#0f1730' }, c => {
  const W = viena(c);
  const ex = texto(c, 520, '¡!', { size: 220, color: RED, z: 70, shadow: `6px 6px 0 ${INK}` });
  const ding = [0, 1, 2].map(i => texto(W.M.w, 0, '¡DONG!', { size: 70, color: GOLD, x: 0, w: 300, z: 12, shadow: `4px 4px 0 ${INK}` }));
  const pil = [0, 1].map(i => texto(W.M.w, 0, '!', { size: 120, color: RED, x: 0, w: 80, z: 12, shadow: `4px 4px 0 ${INK}` }));
  const r2 = ROTULO(c, 520, 380, '¡VIENA SE SALVA!', '12 de septiembre de 1683', { w: 500, size: 50 });
  const conf = [...Array(18)].map((_, i) => box(c, 0, 0, 24, 14, { zIndex: 66, background: [RED, '#fff', GOLD][i % 3], border: `2px solid ${INK}` }));
  const cr = CRUASAN(W.M.w, 0, 0, 170, 9);
  const mord = box(W.M.w, 0, 0, 60, 60, { zIndex: 10, background: '#e9dcc2', borderRadius: '50%' });
  sp(T.picando, 'stamp', 0.9); sp(T.alarma, 'bell', 0.9); sp(T.alarma + 0.6, 'bell', 0.7); sp(T.soldados, 'whoosh', 0.7); sp(T.pillan, 'boing', 0.9); sp(T.pala, 'ding', 0.6);
  sp(T.ayuda, 'drumroll', 0.6); sp(T.asedio, 'burst', 0.7); sp(T.salva, 'tada', 0.8); sp(T.forma, 'squish', 0.7); sp(T.luna, 'sparkle', 0.8); sp(T.literal, 'squish', 0.9);
  return t => {
    camara(W.M, t, [[L(7) - 0.1, 720, 1300, 1.5], [T.alarma - 0.2, 720, 1300, 1.4], [T.alarma + 0.3, 230, 1050, 1.2], [T.soldados + 0.2, 900, 1600, 0.75], [T.pillan, 1250, 1800, 1.0], [T.pala + 0.4, 1200, 1820, 1.25],
      [T.ayuda + 0.3, 2200, 1300, 0.72], [T.salva + 0.4, 1100, 1250, 0.66], [T.celebrar + 0.2, 720, 1300, 1.3], [T.luna + 0.3, 720, 1310, 1.6], [T.desayuno + 0.3, 720, 1300, 1.85], [L(11), 720, 1300, 1.9]]);
    pintaMundo(W, t);
    set(ex, { o: t > T.picando && t < T.alarma ? 1 : 0, s: pop(t, T.picando, 0.3), r: Math.sin(t * 20) * 4 });
    // campana
    const sw = t > T.alarma && t < T.soldados + 0.8 ? Math.sin(t * 12) * 25 : 0; set(W.campana, { x: 170, y: 920, r: sw });
    ding.forEach((d, i) => { const t0 = T.alarma + i * 0.35, k = p(t, t0, 0.6); set(d, { o: t > t0 && k < 1 ? 1 - k : 0, x: 300 + i * 40, y: 900 - k * 160, s: pop(t, t0, 0.25) }); });
    // panadero
    pies(W.panadero, 230, 640, 1460); pFace(W.panadero, t, { feliz: t > T.salva ? 1 : -0.5, ceja: t > T.salva ? 4 : 18, look: [10, 6], jaw: t > T.picando && t < T.alarma ? 0.9 : (t > T.literal ? 0.6 : 0), closed: t > T.luna && t < T.desayuno, seed: 2 });
    // soldados bajan corriendo al túnel; los turcos congelados con la pala
    const fx = frente(t), ks = p(t, T.soldados, T.pillan - T.soldados, E.inOutCubic);
    W.soldados.forEach((s, i) => { s.style.visibility = t > T.soldados - 0.1 && t < T.ayuda ? 'visible' : 'hidden'; pies(s, 180, lerp(900, fx - 60 - i * 110, ks) - i * 60, lerp(SUELO_Y, TUN_Y + 150, ks), { r: Math.sin(t * 14 + i) * 5 }); pFace(s, t, { feliz: -0.2, ceja: 16, look: [14, 0], seed: 6 + i }); });
    const quietos = t > T.pillan;
    W.zapadores.forEach(([z, pi], i) => { z.style.visibility = t < T.ayuda ? 'visible' : 'hidden'; pies(z, 170, fx + 90 + i * 130, TUN_Y + 150); pFace(z, t, { feliz: quietos ? -1 : 0.2, ceja: quietos ? 20 : 10, look: quietos ? [-14, -4] : [-14, 0], jaw: quietos ? 0.8 : 0, seed: 4 + i }); set(pi, { x: fx + 20 + i * 130, y: TUN_Y + 10, r: quietos ? -70 : -40 + Math.max(0, Math.sin(t * 8 + i * 1.5)) * 50, o: t < T.ayuda ? 1 : 0 }); });
    pil.forEach((x, i) => set(x, { o: quietos && t < T.ayuda ? 1 : 0, x: fx + 110 + i * 130, y: TUN_Y - 190, s: pop(t, T.pillan + i * 0.1, 0.3) }));
    // el asedio se rompe: tiendas y banderas caen
    const ka = p(t, T.asedio, 0.6, E.inCubic); W.tiendas.forEach((d, i) => set(d, { y: ka * 260, r: ka * (i % 2 ? 20 : -20), o: 1 - ka }));
    W.banderas.forEach((b, i) => set(b, { r: ka * 80 * (i ? 1 : -1), o: 1 - ka * 0.8 })); W.turcos.forEach(([f, x, w]) => { f.style.visibility = t < T.asedio + 0.4 ? 'visible' : 'hidden'; pies(f, w, x + ka * 900, SUELO_Y); });
    rotuloA(r2, t, T.salva, T.celebrar); conf.forEach((q, i) => { const k = ((t - T.salva) * 0.5 + i * 0.055) % 1; set(q, { o: t > T.salva && t < T.celebrar + 0.6 ? 1 : 0, x: (i * 61) % 1060, y: -40 + k * 1500, r: t * 300 + i * 40 }); });
    // la masa se vuelve media luna; el panadero le da un bocado
    const kf = p(t, T.forma, 0.6, E.outBack); W.masa.style.opacity = t > T.forma ? 0 : 1;
    set(cr, { x: 560, y: 1300 - p(t, T.desayuno, 0.5) * 70, o: t > T.forma ? 1 : 0, s: kf, r: -8 + Math.sin(t * 3) * 4 }); set(mord, { x: 580, y: 1310 - p(t, T.desayuno, 0.5) * 70, o: t > T.literal + 0.2 ? 1 : 0 });
  };
});
shakeAt(T.picando, 0.3, 12); shakeAt(T.pillan, 0.3, 12); shakeAt(T.asedio, 0.35, 14);

/* L11 · OJO: es leyenda; el cruasán de verdad llegó a París mucho después (rótulo de época de una panadería vienesa en París) */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const le = chip(c, 380, 520, 'LEYENDA', { size: 70, bg: '#1d1a22' });
  const tienda = box(c, 300, 680, 480, 420, { zIndex: 6, background: '#e9dcc2', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}` });
  box(tienda, 20, 20, 424, 90, { background: '#2b3550', color: '#f4efe2', fontFamily: 'Rye', fontSize: '42px', textAlign: 'center', lineHeight: '86px', border: `5px solid ${INK}` }, 'BOULANGERIE');
  const cr = CRUASAN(tienda, 110, 170, 250, 3);
  const r = ROTULO(c, 600, 1120, 'PARÍS', 'siglo XIX', { w: 300 });
  return t => { popA(le, t, T.leyenda, { r: -5 }); set(cr, { r: Math.sin(t * 3) * 6 }); rotuloA(r, t, T.paris - 0.2); set(tienda, { s: pop(t, T.paris - 0.4, 0.4) }); };
});
sp(T.leyenda, 'stamp', 0.7); sp(T.paris - 0.2, 'pop2', 0.7);

/* L12 · O sea: mañana, cuando muerdas la punta… hazlo por Viena (bocado a la punta y banderita de Viena) */
plano(L(12) - 0.1, L(13) - 0.1, { background: '#f3e2c4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(168,69,46,.12) 0 60px, transparent 60px 120px)' }, c => {
  box(c, 0, 1150, 1080, 770, { zIndex: 1, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const cr = CRUASAN(c, 300, 560, 520, 8);
  const mord = box(c, 300, 560, 150, 150, { zIndex: 9, background: '#f3e2c4', borderRadius: '50%', border: `6px solid ${INK}` });
  const ba = box(c, 680, 400, 300, 360, { zIndex: 10, transformOrigin: '0 100%' }, `<svg viewBox="0 0 300 360" width="300" height="360"><path d="M10,0 V360" stroke="${INK}" stroke-width="10"/><rect x="10" y="10" width="270" height="60" fill="${RED}" stroke="${INK}" stroke-width="6"/><rect x="10" y="70" width="270" height="60" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="10" y="130" width="270" height="60" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`);
  const ch = chip(c, 360, 1180, '¡por Viena!', { size: 64, bg: RED });
  sp(T.muerdas, 'squish', 0.9); sp(T.porviena, 'tada', 0.7);
  return t => { set(mord, { o: t > T.muerdas + 0.3 ? 1 : 0, s: pop(t, T.muerdas + 0.3, 0.25) }); set(cr, { r: -6 + Math.sin(t * 3) * 3 }); set(ba, { o: t > T.porviena - 0.3 ? 1 : 0, r: Math.sin(t * 5) * 6, s: pop(t, T.porviena - 0.3, 0.35) }); popA(ch, t, T.porviena, { r: -5 }); };
});
shakeAt(T.muerdas + 0.3, 0.2, 8);

/* L13 · pregunta final (pícara) */
preguntaFinal('¿Tú lo mojas en el café…', '…o lo abres y le metes de todo?', { size: 70, draw: c => [['mojado, siempre', YEL], ['abierto, con jamón', PINK], ['a palo seco', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(13) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(85, 'El cruasán y los turcos', ['CRUASÁN', '1683']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.bueno, T.bueno + 1.0], [T.pala, T.pala + 1.0], [T.literal, T.literal + 1.0]], sorpresa: [[T.tac, T.tac + 0.8], [T.picando, T.picando + 0.8]], golpes: [T.simbolo1 + 0.3, T.arriba + 0.4, T.picando, T.pillan, T.asedio] },
});
