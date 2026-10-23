/* Ep. 89 · Las cadenas de Navarra (Navas de Tolosa, 1212) — RÉPLICA del formato «Les quatre barres» (leyendas animadas):
   título dentro de la escena · cartel con mapa · etiquetas de personaje · transición guiada por un objeto (un pájaro) · atardecer sin cortar ·
   cortinilla de lona hacia la tienda · el escudo se pinta y crece hasta llenar la pantalla → bandera · folio → «la verdad» con línea de tiempo ·
   cierre poético con la bandera ondeando. Estilo leyenda + música de cuento. */
Story.prepara();
const T = {
  gigante0: Q('un gigante'),
  bueno: Q('bueno'), califa1: Q('un califa con prisa'), cadenas1: Q('unas cadenas'),
  ochocientos: Q('ochocientos años'), almohade: Q('el ejército almohade'), comerse: Q('comerse los reinos'),
  tres: Q('tres reyes'), sancho3: Q('uno era sancho'),
  fuerte: Q('el fuerte'), caracter: Q('el carácter'), metros: Q('dos metros'),
  navas: Q('las navas de tolosa'), tienda: Q('la tienda del califa'), guardias: Q('de guardias'), cadenas5: Q('y de cadenas'),
  banco: Q('caja fuerte'),
  llego: Q('hasta que llegó sancho'), maza: Q('con su maza'),
  rompio: Q('rompió las cadenas'), mazazos: Q('a mazazos'), corriendo: Q('salió corriendo'), atras: Q('la puerta de atrás'),
  nochel: Q('esa noche'), victoria: Q('la victoria'), otra: Q('otra cosa'),
  todos: Q('todos los reyes'), senal: Q('su señal'), mia: Q('la mía'), ganar: Q('acabo de ganar'),
  puso: Q('y puso las cadenas'), oro: Q('de oro'), rojo: Q('fondo rojo'), esmeralda: Q('una esmeralda'),
  nacer: Q('acababa de nacer'),
  verdad: Q('la verdad'), sello: Q('su sello'), aguila: Q('un águila'),
  hierro: Q('refuerzos de hierro'), siglos: Q('siglos después'),
  rompen: Q('se rompen'), ondeando: Q('siguen ondeando'), destripe: Q('destripe'),
};
const SUELO = 1500, TX = 3000, OROC = '#e0b33a', ROJO_N = '#b3202a', VERDE_E = '#2f9a5a', TINTA = '#2b2118';
const tx = (c, y, txt, size, o = {}) => { const e = texto(c, y, txt, Object.assign({ size, color: '#f4efe2', shadow: `5px 5px 0 rgba(0,0,0,.6), 0 0 20px rgba(0,0,0,.35)` }, o)); e.style.fontFamily = 'Patrick'; e.style.fontWeight = 400; return e; };
/* escudo de Navarra (vb 0 0 300 360): campo rojo, cadenas de oro (orla, cruz y aspa) y esmeralda; .ca = cadenas (se «pintan» con dashoffset) */
const cadena = d => `<path class="ca" d="${d}" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="0"/><path class="ca" d="${d}" stroke="${OROC}" stroke-width="14" fill="none" stroke-dasharray="1400" stroke-dashoffset="0"/><path class="cl" d="${d}" stroke="${INK}" stroke-width="5" fill="none" stroke-dasharray="10 14"/>`;
const ESCUDO_SVG = `<svg viewBox="0 0 300 360" width="100%" height="100%"><path class="fondo" d="M10,10 H290 V200 C290,300 200,345 150,355 C100,345 10,300 10,200 Z" fill="${ROJO_N}" stroke="${INK}" stroke-width="9"/>
  ${cadena('M40,40 H260 V200 C260,280 190,318 150,326 C110,318 40,280 40,200 Z')}${cadena('M150,40 V326')}${cadena('M40,180 H260')}${cadena('M55,55 L245,290')}${cadena('M245,55 L55,290')}
  <circle class="es" cx="150" cy="180" r="26" fill="${VERDE_E}" stroke="${INK}" stroke-width="6"/><circle cx="142" cy="172" r="7" fill="#bff0cf"/></svg>`;
const pintaEscudo = (e, t, tOro, tRojo, tEs) => { e.querySelector('.fondo').style.fill = t > tRojo ? ROJO_N : '#cdbb98';
  e.querySelectorAll('.ca').forEach(c => c.setAttribute('stroke-dashoffset', f1(1400 * (1 - p(t, tOro, 1.2, E.inOutCubic))))); e.querySelectorAll('.cl').forEach(c => c.style.opacity = t > tOro + 1.0 ? 1 : 0);
  const k = pop(t, tEs, 0.35); e.querySelector('.es').setAttribute('transform', `translate(150 180) scale(${f1(k)}) translate(-150 -180)`); };
const BANDERA_N = (c, w = 300, z = 6) => { const d = box(c, 0, 0, w, w * 1.9, { zIndex: z, transformOrigin: '0 100%' }, `<svg viewBox="0 0 300 570" width="${w}" height="${w * 1.9}"><path d="M10,0 V570" stroke="${INK}" stroke-width="12"/><circle cx="10" cy="6" r="12" fill="${OROC}" stroke="${INK}" stroke-width="5"/></svg>`);
  const tela = box(d, w * 0.05, w * 0.06, w * 0.9, w * 0.62, { background: ROJO_N, border: `5px solid ${INK}`, transformOrigin: '0 50%' }); box(tela, w * 0.24, w * 0.04, w * 0.42, w * 0.5, {}, ESCUDO_SVG); d.tela = tela; return d; };
const ondea = (b, t) => set(b.tela, { sx: 1 + 0.04 * Math.sin(t * 5), sy: 1 + 0.03 * Math.sin(t * 5 + 1), r: Math.sin(t * 3) * 2 });
const ESTANDARTE = (c, w, svg, z = 5) => box(c, 0, 0, w, w * 2.2, { zIndex: z, transformOrigin: '0 100%' }, `<svg viewBox="0 0 200 440" width="${w}" height="${w * 2.2}"><path d="M10,0 V440" stroke="${INK}" stroke-width="10"/>${svg}</svg>`);
const CASTILLA = `<rect x="14" y="10" width="170" height="130" fill="#b3202a" stroke="${INK}" stroke-width="6"/><path d="M60,120 V70 H75 V55 H90 V70 H110 V55 H125 V70 H140 V120 Z" fill="${OROC}" stroke="${INK}" stroke-width="5"/>`;
const ARAGON = `<rect x="14" y="10" width="170" height="130" fill="${OROC}" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3].map(i => `<rect x="${32 + i * 40}" y="10" width="18" height="130" fill="#b3202a"/>`).join('')}<rect x="14" y="10" width="170" height="130" fill="none" stroke="${INK}" stroke-width="6"/>`;
const AGUILA = `<rect x="14" y="10" width="170" height="130" fill="${OROC}" stroke="${INK}" stroke-width="6"/><path d="M100,40 C90,40 86,50 92,58 L60,52 L76,70 L56,78 L84,84 L90,110 L100,96 L110,110 L116,84 L144,78 L124,70 L140,52 L108,58 C114,50 110,40 100,40 Z" fill="${INK}"/>`;
const TIENDA_C = (w, c1, c2) => `<svg viewBox="0 0 300 260" width="${w}" height="${w * 260 / 300}"><path d="M0,260 L150,10 L300,260 Z" fill="${c1}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>${[60, 120, 180, 240].map(x => `<path d="M150,10 L${x},260" stroke="${c2}" stroke-width="16"/>`).join('')}<path d="M150,10 L0,260 L300,260 Z" fill="none" stroke="${INK}" stroke-width="7"/><path d="M120,260 L150,150 L180,260 Z" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><path d="M150,10 V-30" stroke="${INK}" stroke-width="6"/></svg>`;
const MAZA = (c, z = 12) => box(c, 0, 0, 90, 300, { zIndex: z, transformOrigin: '50% 90%' }, `<svg viewBox="0 0 90 300" width="90" height="300"><rect x="38" y="90" width="16" height="210" fill="#6b4a2a" stroke="${INK}" stroke-width="5"/><circle cx="46" cy="60" r="44" fill="#7d8790" stroke="${INK}" stroke-width="6"/>${[[46, 6], [94, 60], [46, 114], [-2, 60], [80, 22], [12, 22], [80, 98], [12, 98]].map(([x, y]) => `<path d="M46,60 L${x},${y}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`).join('')}<circle cx="46" cy="60" r="34" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/></svg>`);
const PAJARO = c => box(c, 0, 0, 140, 70, { zIndex: 30 }, `<svg viewBox="0 0 140 70" width="140" height="70"><path class="al" d="M10,35 Q40,0 70,35 Q100,0 130,35" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>`);

function navas(c) {
  const M = MUNDO(c, 3800, 2600);
  M.far.innerHTML = `<svg viewBox="0 0 3800 2600" width="3800" height="2600"><path d="M0,1180 C400,1020 800,1120 1300,1040 C1800,960 2300,1100 2800,1010 C3200,950 3500,1060 3800,1020 V2600 H0 Z" fill="#8a8a62" stroke="${INK}" stroke-width="6"/><path d="M0,1300 C600,1200 1300,1270 2000,1210 C2700,1150 3300,1250 3800,1220 V2600 H0 Z" fill="#a39a6a" stroke="${INK}" stroke-width="6"/>${[...Array(10)].map((_, i) => `<circle cx="${180 + i * 370}" cy="${1230 - (i % 3) * 30}" r="${36 + (i % 2) * 14}" fill="#5f6e45" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`;
  // campamento cristiano: tiendas y estandartes de Castilla, Aragón y Navarra (el águila de Sancho)
  [[120, 260, '#f4efe2', '#2b3550'], [420, 220, '#f4efe2', '#b3202a'], [1080, 240, '#f4efe2', '#c8a050']].forEach(([x, w, a, b]) => box(M.w, x, SUELO - w * 0.87, w, w * 0.87, { zIndex: 3 }, TIENDA_C(w, a, b)));
  const est = [[560, CASTILLA], [780, ARAGON], [1000, AGUILA]].map(([x, svg]) => { const e = ESTANDARTE(M.w, 120, svg, 4); set(e, { x, y: SUELO - 264 }); return [e, x]; });
  // campamento almohade: tiendas, la gran tienda roja del califa, postes y cadenas
  [[2450, 240, '#2e6b3a', '#f4efe2'], [3450, 260, '#f4efe2', '#2e6b3a']].forEach(([x, w, a, b]) => box(M.w, x, SUELO - w * 0.87, w, w * 0.87, { zIndex: 3 }, TIENDA_C(w, a, b)));
  const tienda = box(M.w, TX - 280, SUELO - 487, 560, 487, { zIndex: 3 }, TIENDA_C(560, '#b3202a', OROC));
  const postes = [-380, -190, 0, 190, 380].map(dx => box(M.w, TX + dx - 14, SUELO - 210, 28, 210, { zIndex: 7, background: '#6b4a2a', border: `5px solid ${INK}`, borderRadius: '8px' }));
  const cads = [-380, -190, 0, 190].map(dx => box(M.w, TX + dx, SUELO - 200, 190, 90, { zIndex: 7, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 190 90" width="190" height="90" style="overflow:visible"><path d="M0,10 Q95,90 190,10" stroke="${INK}" stroke-width="20" fill="none"/><path d="M0,10 Q95,90 190,10" stroke="#9aa4ad" stroke-width="12" fill="none"/><path d="M0,10 Q95,90 190,10" stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="9 12"/></svg>`));
  const candado = box(M.w, TX - 40, SUELO - 170, 80, 100, { zIndex: 8, transformOrigin: '50% 0' }, `<svg viewBox="0 0 80 100" width="80" height="100"><path d="M20,44 V28 C20,4 60,4 60,28 V44" stroke="${INK}" stroke-width="10" fill="none"/><rect x="8" y="40" width="64" height="56" rx="10" fill="${OROC}" stroke="${INK}" stroke-width="6"/><circle cx="40" cy="66" r="7" fill="${INK}"/></svg>`);
  const guardias = [[TX - 470, 0], [TX - 280, 1], [TX + 280, 2], [TX + 470, 3]].map(([x, i]) => [PERSm(M.w, 210, { ropa: ['#2e6b3a', '#f4efe2', '#2e6b3a', '#f4efe2'][i], gorro: 'turbante', barba: i % 2 === 0, z: 6, piernas: true, calzas: '#3d3a44' }), x, i]);
  const califa = PERSm(M.w, 230, { ropa: '#f4efe2', gorro: 'turbante', barba: true, pcol: '#1d1a22', z: 6, piernas: true, calzas: '#2e6b3a' });
  const suelo = box(M.w, 0, SUELO, 3800, 1100, { zIndex: 5, background: '#b49a6c', borderTop: `10px solid #7d8a4a` });
  // reyes (Sancho, el gigante, con su maza)
  const alfonso = PERSm(M.w, 220, { ropa: '#7a1f3a', gorro: 'corona', barba: true, pcol: '#6b4a2a', z: 8, piernas: true, calzas: '#3d3a44' });
  const pedro = PERSm(M.w, 220, { ropa: '#c8a050', gorro: 'corona', barba: true, pcol: '#3a2a1e', z: 8, piernas: true, calzas: '#7a1f3a' });
  const sancho = PERSm(M.w, 330, { ropa: ROJO_N, gorro: 'corona', barba: true, pcol: '#8a5a32', z: 9, piernas: true, calzas: '#3d3a44' });
  const maza = MAZA(M.w);
  const trozos = [...Array(8)].map(() => box(M.w, 0, 0, 40, 30, { zIndex: 9, border: `6px solid ${INK}`, background: '#9aa4ad', borderRadius: '50%' }));
  const sol = SOL(c, 1), luna = LUNA(c, 1), estr = ESTRELLAS_C(c, 22, 1); [sol, luna, ...estr].forEach(e => M.vp.appendChild(e));
  return { M, est, tienda, postes, cads, candado, guardias, califa, alfonso, pedro, sancho, maza, trozos, sol, luna, estr };
}
const CIELO = () => [[-1, '#9fc6de', '#efe2bf', '#ffffff', 0], [T.victoria - 0.6, '#9fc6de', '#efe2bf', '#ffffff', 0], [T.otra, '#e08a52', '#f6c98a', '#ff9a50', 0.18],
  [L(10), '#2b2f52', '#6a5a7a', '#3a4a8a', 0.4], [L(12) - 0.2, '#2b2f52', '#6a5a7a', '#3a4a8a', 0.4], [L(12), '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [L(13), '#9fc6de', '#efe2bf', '#ffffff', 0], [L(15) - 0.2, '#9fc6de', '#efe2bf', '#ffffff', 0], [L(15), '#e08a52', '#f6c98a', '#ff9a50', 0.15], [999, '#e08a52', '#f6c98a', '#ff9a50', 0.15]];
const pintaN = (W, t) => { cielo(W.M, t, CIELO()); const n = t > L(10) - 0.2 && t < L(12) ? 1 : 0; set(W.luna, { x: 820, y: 240, o: n }); brillan(W.estr, t, n);
  const dusk = t > T.victoria - 0.6 && t < L(10); set(W.sol, { x: 760, y: dusk ? lerp(260, 900, p(t, T.victoria - 0.6, L(10) - T.victoria + 0.4, E.inOutCubic)) : (t > L(15) - 0.2 ? 700 : 260), o: n ? 0 : 1 });
  W.est.forEach(([e, x], i) => set(e, { x, y: SUELO - 264, r: Math.sin(t * 2 + i) * 2 })); };
/* reyes en el campamento cristiano */
const reyes = (W, t, sx = 900) => { pies(W.alfonso, 220, 560, SUELO); pies(W.pedro, 220, 760, SUELO); pies(W.sancho, 330, sx, SUELO);
  pFace(W.alfonso, t, { feliz: 0.4, look: [10, -6], seed: 1 }); pFace(W.pedro, t, { feliz: 0.4, look: [10, -6], seed: 2 }); };
/* Sancho con la maza al hombro (x en el mundo) */
const sanchoEn = (W, t, x, o = {}) => { const run = o.run, y = SUELO - (run ? Math.abs(Math.sin(t * 9)) * 26 : 0);
  pies(W.sancho, 330, x, y, { r: run ? Math.sin(t * 9) * 3 : 0 }); pFace(W.sancho, t, Object.assign({ feliz: 0.6, look: [14, 0], seed: 3 }, o.cara || {}));
  set(W.maza, { x: x + 90, y: y - 520 + (o.golpe ? 120 * o.golpe : 0), r: o.golpe != null ? lerp(-30, 110, o.golpe) : -20 }); };
const guardiasEn = (W, t, susto = false, huye = 0) => W.guardias.forEach(([g, x, i]) => { pies(g, 210, x + huye * (i < 2 ? -900 : 900), SUELO - (huye ? Math.abs(Math.sin(t * 12 + i)) * 20 : 0)); pFace(g, t, { feliz: susto ? -1 : 0.2, ceja: susto ? 22 : 4, jaw: susto ? 0.8 : 0, look: [-14, 0], seed: 5 + i }); });

/* L0 · PORTADA (fotograma 0 completo): Sancho, gigante, con la maza ante las cadenas del califa; título dentro de la escena */
plano(-1, L(1) - 0.1, { background: '#9fc6de' }, c => {
  const W = navas(c);
  tx(c, 190, 'LAS CADENAS', 150); tx(c, 340, 'DE NAVARRA', 150); tx(c, 500, 'una leyenda de las Navas de Tolosa', 46);
  sfx('harpa', 0.05, 0.6); sp(T.gigante0, 'thud', 0.8);
  return t => {
    camara(W.M, t, [[-1, TX - 180, 1240, 1.0], [L(1), TX - 170, 1235, 1.04]]); pintaN(W, -1);
    sanchoEn(W, t, TX - 640, { cara: { feliz: 1, ceja: -4, look: [14, 0] } }); guardiasEn(W, t, true); W.califa.style.visibility = 'hidden';
    W.trozos.forEach(q => set(q, { o: 0 }));
  };
}, { sfx: false });

/* PLANO 1 (L1 → L10): un gigante · un califa con prisa · unas cadenas (tres planos) → mapa: Navas de Tolosa → tres reyes, Sancho (etiqueta) → mide más de 2 m (regla) →
   un pájaro lleva la cámara al campamento almohade → tienda, guardias, cadenas, candado → «hasta que llegó Sancho» → carga (la cámara le sigue) → ¡mazazo! → el califa huye →
   el sol se pone sin cortar */
plano(L(1) - 0.1, L(10) - 0.15, { background: '#9fc6de' }, c => {
  const W = navas(c);
  const mapa = box(c, 60, 300, 300, 330, { zIndex: 60, background: '#f4ecd8', border: `5px solid ${INK}`, boxShadow: '6px 6px 0 rgba(0,0,0,.3)', transformOrigin: '50% 0' }, `<svg viewBox="0 0 300 330" width="290" height="320"><path d="M40,90 L90,60 L170,58 L240,70 L262,110 L250,170 L270,210 L230,250 L180,270 L110,262 L70,240 L52,200 L30,160 Z" fill="#e3d6b4" stroke="${INK}" stroke-width="5"/><circle cx="150" cy="215" r="11" fill="${ROJO_N}" stroke="${INK}" stroke-width="4"/><text x="150" y="300" text-anchor="middle" font-family="Patrick" font-size="30" fill="${INK}">Navas de Tolosa · 1212</text></svg>`);
  const eS = ETIQUETA(c, 'SANCHO VII', 'rey de Navarra'), eC = ETIQUETA(c, 'LA TIENDA DEL CALIFA', 'al-Nasir'), eCa = ETIQUETA(c, 'EL CALIFA', 'con prisa');
  const regla = box(W.M.w, 1120, SUELO - 640, 70, 640, { zIndex: 9 }, `<svg viewBox="0 0 70 640" width="70" height="640"><rect x="10" y="0" width="50" height="640" fill="#f4ecd8" stroke="${INK}" stroke-width="5"/>${[...Array(9)].map((_, i) => `<path d="M10,${i * 80} H${i % 2 ? 35 : 50}" stroke="${INK}" stroke-width="5"/>`).join('')}<text x="35" y="60" text-anchor="middle" font-family="Patrick" font-size="34" fill="${ROJO_N}" transform="rotate(-90 35 60)">2 m</text></svg>`);
  const paj = PAJARO(W.M.w), polvo = NUBES(W.M.w, 6, '#d9cfbf', 8);
  sp(T.califa1, 'whoosh', 0.5); sp(T.cadenas1, 'click', 0.6); sp(T.ochocientos, 'paper', 0.6); sp(T.almohade, 'drumroll', 0.5); sp(T.sancho3, 'pop2', 0.5); sp(T.metros, 'boing', 0.7);
  sp(T.navas - 0.3, 'swoosh_up', 0.5); sp(T.cadenas5, 'click', 0.7); sp(T.banco, 'ding', 0.5); sp(T.maza, 'thud', 0.7); sp(T.rompio - 0.5, 'drumroll', 0.6); sp(T.mazazos, 'stamp', 1); sp(T.mazazos + 0.3, 'burst', 0.7); sp(T.corriendo, 'whoosh', 0.7);
  return t => {
    const kc = p(t, T.rompio - 0.4, T.mazazos - T.rompio + 0.4, E.inCubic), sx = t < T.llego ? 900 : (t < T.rompio - 0.4 ? lerp(1500, 2200, p(t, T.llego, T.rompio - 0.4 - T.llego, E.linear)) : lerp(2200, TX - 470, kc));
    const kb = p(t, T.navas - 0.4, T.tienda - T.navas + 0.2, E.inOutCubic), bx = lerp(1000, 2900, kb), by = 900 - Math.sin(kb * Math.PI) * 200;
    const cam = camara(W.M, t, [
      [L(1) - 0.1, 950, 1080, 1.6], [T.califa1 - 0.05, 960, 1080, 1.65], [T.califa1, TX + 560, 1250, 1.3, 'corte'], [T.cadenas1 - 0.05, TX + 600, 1250, 1.35], [T.cadenas1, TX - 100, 1330, 1.5, 'corte'], [L(2) - 0.15, TX - 100, 1330, 1.6],
      [L(2) - 0.1, 2700, 1220, 0.8, 'corte'], [L(3) - 0.15, 2550, 1230, 0.86],
      [L(3) - 0.1, 780, 1230, 1.0, 'corte'], [T.sancho3 + 0.6, 860, 1180, 1.25], [T.metros + 0.6, 960, 1160, 1.15],
      [T.navas - 0.4, 1000, 1150, 1.0], [T.tienda, 2900, 1220, 0.95], [T.cadenas5 + 0.4, TX, 1300, 1.25], [L(6) + 0.2, TX, 1340, 1.6], [L(7) - 0.15, TX, 1345, 1.7],
      [L(7) - 0.1, 1800, 1230, 0.9, 'corte'], [T.rompio - 0.4, 2400, 1240, 1.0], [T.mazazos, TX - 300, 1260, 1.15], [T.corriendo + 0.2, TX + 300, 1250, 1.0], [T.atras + 0.6, TX + 500, 1240, 0.95],
      [L(9) - 0.1, 2200, 1220, 0.8, 'corte'], [L(10) - 0.15, 2150, 1210, 0.85]]);
    pintaN(W, t);
    reyes(W, t, sx); W.alfonso.style.visibility = W.pedro.style.visibility = t < L(7) ? 'visible' : 'hidden';
    const cargando = t > T.rompio - 0.4 && t < T.mazazos, golpe = t > T.mazazos - 0.25 && t < T.mazazos + 0.4 ? p(t, T.mazazos - 0.25, 0.25) : null;
    sanchoEn(W, t, sx, { run: (t > T.llego && t < T.mazazos), golpe, cara: { feliz: t > T.corriendo ? 1 : 0.5, ceja: cargando ? 16 : 2, jaw: cargando ? 0.6 : (t > T.caracter && t < T.metros + 0.5 ? 0.4 : 0), look: [14, 0] } });
    nubeA(polvo, t, t > T.llego && t < T.mazazos ? T.llego + Math.floor((t - T.llego) * 3) / 3 : -9, sx - 120, SUELO - 20, 90, 0.5);
    set(regla, { o: t > T.metros - 0.3 && t < T.navas ? 1 : 0, s: pop(t, T.metros - 0.3, 0.35) });
    // cadenas: se rompen con el mazazo (los eslabones salen volando) y el candado cae
    const roto = t > T.mazazos; W.cads.forEach((d, i) => set(d, { o: roto ? 0 : 1, r: Math.sin(t * 2 + i) * 2 }));
    W.trozos.forEach((q, i) => { const k = p(t, T.mazazos, 0.9, E.outCubic), a = -2.6 + i * 0.35; set(q, { o: roto && k < 1 ? 1 : 0, x: TX - 200 + Math.cos(a) * 520 * k, y: SUELO - 160 + Math.sin(a) * 380 * k + 500 * k * k, r: k * 600 }); });
    set(W.candado, { y: roto ? p(t, T.mazazos, 0.5, E.inCubic) * 160 : 0, r: roto ? 70 : Math.sin(t * 3) * 10 });
    guardiasEn(W, t, t > T.rompio - 0.4, p(t, T.mazazos + 0.1, 1.0, E.inCubic));
    // el califa: con prisa (avance en L1) y huyendo por detrás tras el mazazo
    const kf = p(t, T.corriendo - 0.1, 1.6, E.inCubic), avance = t > T.califa1 && t < T.cadenas1;
    W.califa.style.visibility = avance || (t > T.corriendo - 0.1 && t < L(9)) ? 'visible' : 'hidden';
    pies(W.califa, 230, avance ? TX + 420 + (t - T.califa1) * 300 : TX + 200 + kf * 900, SUELO - Math.abs(Math.sin(t * 12)) * 22, { r: Math.sin(t * 12) * 4 });
    pFace(W.califa, t, { feliz: -1, ceja: 22, jaw: 0.8, look: [14, 0], seed: 9 });
    // el pájaro guía la cámara de un campamento al otro
    set(paj, { o: t > T.navas - 0.4 && t < T.tienda + 0.2 ? 1 : 0, x: bx, y: by }); paj.querySelector('.al').setAttribute('transform', `translate(70 35) scale(1 ${f1(Math.sin(t * 16))}) translate(-70 -35)`);
    rotuloA(mapa, t, T.ochocientos - 0.2, L(3) - 0.1);
    etiquetaA(eS, t, T.sancho3, T.fuerte + 0.6, cam, 900, 1060, -230); etiquetaA(eC, t, T.tienda, T.guardias + 0.6, cam, TX, 1020, -150); etiquetaA(eCa, t, T.califa1 + 0.2, T.cadenas1, cam, TX + 420 + (t - T.califa1) * 300, 1200, -160);
  };
});
shakeAt(T.mazazos, 0.4, 16); shakeAt(T.metros, 0.2, 6);

/* cortinilla de lona hacia la tienda de Sancho */
transTela(L(10) - 0.15, { c1: '#f4efe2', c2: '#c8a050' });

/* PLANO 2 (L10 → L12): dentro de la tienda, de noche, a la luz de la vela: «todos los reyes llevan su señal… la mía me la acabo de ganar» →
   pone las cadenas de oro sobre el rojo y la esmeralda (el escudo se pinta) → la cámara entra en el escudo hasta llenar la pantalla */
plano(L(10) - 0.15, L(12) - 0.1, { background: '#3a2a22', backgroundImage: 'repeating-linear-gradient(90deg, rgba(244,239,226,.10) 0 70px, rgba(200,160,80,.10) 70px 140px)' }, c => {
  const cam = CAM(c);
  const mesa = box(cam, 120, 1240, 840, 40, { zIndex: 4, background: '#6b4a2a', border: `6px solid ${INK}` });
  const vela = box(cam, 180, 1080, 60, 170, { zIndex: 5 }, `<svg viewBox="0 0 60 170" width="60" height="170"><rect x="14" y="60" width="32" height="110" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path class="ll" d="M30,6 C46,30 46,48 30,60 C14,48 14,30 30,6 Z" fill="#ffd977" stroke="${INK}" stroke-width="4"/></svg>`);
  const luz = box(cam, -200, 600, 900, 900, { zIndex: 3, background: 'radial-gradient(circle, rgba(255,210,120,.35), transparent 60%)' });
  const al = PERS(cam, 120, 760, 230, { ropa: '#7a1f3a', gorro: 'corona', barba: true, pcol: '#6b4a2a' }), pe = PERS(cam, 330, 780, 220, { ropa: '#c8a050', gorro: 'corona', barba: true, pcol: '#3a2a1e' });
  const sa = PERS(cam, 600, 560, 360, { ropa: ROJO_N, gorro: 'corona', barba: true, pcol: '#8a5a32' });
  const esc = box(cam, 470, 960, 230, 276, { zIndex: 8, transformOrigin: '50% 50%' }, ESCUDO_SVG);
  const cad = box(cam, 760, 1040, 220, 90, { zIndex: 9 }, `<svg viewBox="0 0 190 90" width="220" height="90"><path d="M0,10 Q95,90 190,10" stroke="${INK}" stroke-width="20" fill="none"/><path d="M0,10 Q95,90 190,10" stroke="${OROC}" stroke-width="12" fill="none"/><path d="M0,10 Q95,90 190,10" stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="9 12"/></svg>`);
  sp(T.todos, 'pop', 0.3); sp(T.ganar, 'harpa', 0.6); sp(T.oro, 'sparkle', 0.7); sp(T.rojo, 'paper', 0.5); sp(T.esmeralda, 'ding', 0.7); sp(L(12) - 0.6, 'swoosh_up', 0.6);
  return t => {
    const kz = p(t, L(12) - 0.9, 0.8, E.inCubic); cam.style.transformOrigin = '585px 1098px'; set(cam, { s: lerp(1.0, 1.06, p(t, L(10), 3, E.linear)) + kz * 6 });
    vela.querySelector('.ll').setAttribute('transform', `translate(30 60) scale(${f1(1 + 0.12 * Math.sin(t * 13))} ${f1(1 + 0.18 * Math.sin(t * 9))}) translate(-30 -60)`); set(luz, { o: 0.8 + 0.2 * Math.sin(t * 7) });
    pFace(al, t, { feliz: 0.4, look: [14, 0], seed: 1 }); pFace(pe, t, { feliz: 0.4, look: [14, 0], seed: 2 }); pFace(sa, t, { feliz: t > T.ganar ? 1 : 0.2, ceja: 4, look: [-10, 8], jaw: t > T.todos && t < T.ganar + 0.3 ? talkW(t, 'VECINO') * 0.5 : 0, seed: 3 });
    set(cad, { o: t < T.puso + 0.5 ? 1 : 0, x: t > T.puso ? -p(t, T.puso, 0.5) * 250 : 0, y: t > T.puso ? -p(t, T.puso, 0.5) * 40 : 0 });
    pintaEscudo(esc, t, T.oro - 0.2, T.rojo, T.esmeralda);
  };
});

/* PLANO 3 (L12): «acababa de nacer el escudo de Navarra»: del escudo a pantalla completa se abre a la bandera ondeando sobre el campamento, al amanecer */
plano(L(12) - 0.1, L(13) - 0.1, { background: '#f4a46a' }, c => {
  const W = navas(c); const ba = BANDERA_N(W.M.w, 320, 6); W.califa.style.visibility = 'hidden';
  const full = box(c, -60, 300, 1200, 1440, { zIndex: 70, transformOrigin: '50% 50%' }, ESCUDO_SVG);
  sp(L(12), 'tada', 0.6);
  return t => {
    camara(W.M, t, [[L(12) - 0.1, 900, 1080, 1.4], [L(13), 900, 1120, 1.0]]); pintaN(W, t);
    set(ba, { x: 820, y: SUELO - 608 }); ondea(ba, t); reyes(W, t, 1060); pFace(W.sancho, t, { feliz: 1, look: [-10, -10], seed: 3 }); set(W.maza, { x: 1150, y: SUELO - 520, r: -20 });
    guardiasEn(W, t); W.trozos.forEach(q => set(q, { o: 0 }));
    const k = p(t, L(12) - 0.1, 0.7, E.inOutCubic); set(full, { o: 1 - k, s: lerp(1, 0.15, k), x: lerp(0, -40, k), y: lerp(0, -420, k) });
  };
});

/* folio de papel → «la verdad» */
transPapel(L(13) - 0.1);

/* PLANO 4 (L13 → L14): LA VERDAD — papel, línea de tiempo con fechas y dibujos; un eslabón la recorre (como la flecha del original) */
plano(L(13) - 0.1, L(15) - 0.1, { background: '#e9dfc8' }, c => {
  const t1 = texto(c, 330, 'La verdad:', { size: 100, color: TINTA }); t1.style.fontFamily = 'Patrick'; t1.style.fontWeight = 400;
  const lin = box(c, 80, 1080, 920, 6, { zIndex: 4, background: TINTA, transformOrigin: '0 50%' });
  const H = [[210, '1212', 'su sello: un águila', T.aguila - 0.3, `<svg viewBox="0 0 200 150" width="200" height="150"><circle cx="100" cy="75" r="68" fill="#b3202a" stroke="${TINTA}" stroke-width="5"/><g transform="translate(0 4)">${AGUILA.replace(/fill="#e0b33a"/, 'fill="none"').replace('<rect x="14" y="10" width="170" height="130" fill="none" stroke="#2b2118" stroke-width="6"/>', '')}</g></svg>`],
    [540, 'refuerzo', 'de hierro del escudo', T.hierro, `<svg viewBox="0 0 200 200" width="170" height="170"><path d="M20,20 H180 V110 C180,160 130,185 100,192 C70,185 20,160 20,110 Z" fill="#cdbb98" stroke="${TINTA}" stroke-width="6"/><path d="M100,20 V192 M20,95 H180 M30,30 L170,170 M170,30 L30,170" stroke="#5d636b" stroke-width="12"/><circle cx="100" cy="95" r="14" fill="#5d636b" stroke="${TINTA}" stroke-width="4"/></svg>`],
    [860, 's. XV', 'nace la leyenda', T.siglos - 0.3, `<svg viewBox="0 0 200 150" width="190" height="140"><path d="M100,30 C70,10 30,10 10,20 V140 C30,130 70,130 100,145 C130,130 170,130 190,140 V20 C170,10 130,10 100,30 Z" fill="#f4ecd8" stroke="${TINTA}" stroke-width="5"/><path d="M100,30 V145" stroke="${TINTA}" stroke-width="4"/></svg>`]
  ].map(([x, a, b, t0, svg]) => { const d = box(c, x - 160, 860, 320, 200, { zIndex: 5, textAlign: 'center', fontFamily: 'Patrick', color: TINTA }, `<div style="font-size:30px;opacity:.85">${b}</div><div style="font-size:${a.length > 5 ? 62 : 80}px;line-height:86px">${a}</div>`);
    const tk = box(c, x - 3, 1060, 6, 46, { zIndex: 5, background: TINTA }); const ic = box(c, x - 100, 1150, 200, 200, { zIndex: 5, textAlign: 'center' }, svg); return [d, tk, ic, t0]; });
  const es = box(c, 0, 0, 60, 34, { zIndex: 6, border: `8px solid ${TINTA}`, borderRadius: '50%', background: 'transparent' });
  return t => {
    set(lin, { sx: p(t, L(13), 0.8, E.outCubic) });
    H.forEach(([d, tk, ic, t0]) => { const v = t > t0; set(d, { o: v ? 1 : 0, y: (1 - p(t, t0, 0.4, E.outBack)) * 40 }); set(tk, { o: v ? 1 : 0 }); set(ic, { o: v ? 1 : 0, s: pop(t, t0, 0.35) }); });
    const ke = p(t, L(13) + 0.2, L(15) - L(13) - 0.6, E.inOutCubic); set(es, { x: lerp(40, 990, ke), y: 1060 - Math.abs(Math.sin(ke * 14)) * 30, r: ke * 720, o: ke > 0 && ke < 1 ? 1 : 0 });
  };
});
H_SFX: { sp(T.aguila - 0.3, 'pop', 0.5); sp(T.hierro, 'pop', 0.5); sp(T.siglos - 0.3, 'pop', 0.5); sp(L(13) + 0.2, 'whoosh', 0.4); }

/* PLANO 5 (L15): «Las cadenas se rompen. Estas siguen ondeando»: la bandera de Navarra sobre el campo, al atardecer */
plano(L(15) - 0.1, L(16) - 0.1, { background: '#e08a52' }, c => {
  const W = navas(c); const ba = BANDERA_N(W.M.w, 360, 6); W.califa.style.visibility = 'hidden';
  sp(T.ondeando, 'harpa', 0.6);
  return t => {
    camara(W.M, t, [[L(15) - 0.1, 1200, 1100, 0.9], [L(16), 1050, 1060, 1.15]]); pintaN(W, t);
    set(ba, { x: 900, y: SUELO - 684 }); ondea(ba, t); reyes(W, t, 1300); pFace(W.sancho, t, { feliz: 1, closed: true, seed: 3 }); set(W.maza, { x: 1390, y: SUELO - 520, r: -20 });
    guardiasEn(W, t); W.trozos.forEach(q => set(q, { o: 0 })); W.cads.forEach(d => set(d, { o: 0 }));
  };
});

/* PLANO 6 (L16 → fin): título final dentro de la escena, como el original */
plano(L(16) - 0.1, LOOP, { background: '#e08a52' }, c => {
  const W = navas(c); const ba = BANDERA_N(W.M.w, 360, 6); W.califa.style.visibility = 'hidden';
  tx(c, 230, 'ESTO NO VENÍA', 130); tx(c, 370, 'EN EL LIBRO', 130); tx(c, 520, 'sígueme para más leyendas', 46);
  return t => {
    camara(W.M, t, [[L(16) - 0.1, 1050, 1060, 1.15], [LOOP, 1040, 1050, 1.18]]); pintaN(W, L(15) + 1);
    set(ba, { x: 900, y: SUELO - 684 }); ondea(ba, t); reyes(W, t, 1300); set(W.maza, { x: 1390, y: SUELO - 520, r: -20 });
    guardiasEn(W, t); W.trozos.forEach(q => set(q, { o: 0 })); W.cads.forEach(d => set(d, { o: 0 }));
  };
});

/* música que sigue la tensión */
sfx('mus_baja', T.rompio - 1.2); sfx('mus_sube', T.mazazos); sfx('mus_baja', L(10) - 0.2); sfx('mus_sube', T.oro);

Story.run({ leyenda: true, ovalo: [] });
