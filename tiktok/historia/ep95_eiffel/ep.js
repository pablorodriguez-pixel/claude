/* Ep. 95 · «Este hombre vendió la Torre Eiffel» (Victor Lustig, 1925) — FORMATO NUEVO (cuento continuo). Dos mundos: París con la torre (gancho, el plan,
   la huida y el remate: la cámara lo recorre sin cortar) y el salón del hotel (la «subasta» y la confesión). Cortes duros solo al entrar en el hotel y en el giro. */
Story.prepara();
const T = {
  vendio: Q('vendió'), eiffel0: Q('eiffel'), nosuya: Q('no era suya'),
  compro: Q('se la compró'), encima: Q('encima'), soborno1: Q('soborno'),
  paris: Q('parís'), lustig2: Q('victor lustig'), estafador: Q('estafador'), periodico: Q('el periódico'), oxidada: Q('oxidada'), fortuna: Q('una fortuna'),
  pasar: Q('se hace pasar'), cargo: Q('alto cargo'), hotel: Q('un hotel de lujo'), cinco: Q('cinco chatarreros'),
  secreto: Q('es secreto'), desmontar: Q('desmontar la torre'), vendo: Q('se la vendo'), mas: Q('pague más'),
  uno: Q('uno de ellos'), poisson5: Q('andré poisson'), muere: Q('se muere'), mujer: Q('su mujer'), sospecha: Q('sospecha'),
  aparte: Q('aparte'), confiesa: Q('le confiesa'), corrupto: Q('funcionario corrupto'), soborno6: Q('un soborno'),
  convence: Q('convence'), deverdad: Q('de verdad'), paga: Q('así que paga'), latorre7: Q('y la torre'),
  huye: Q('huye'), maleta: Q('una maleta'), ypoisson: Q('y poisson'), nolo: Q('no lo denuncia'), verguenza: Q('vergüenza'),
  vuelve: Q('vuelve a parís'), otravez: Q('otra vez'), denuncian: Q('le denuncian'), escapa: Q('pero escapa'),
  enpie: Q('sigue en pie'), comprarla: Q('comprarla'),
};
const SUELO = 2000, EX = 2500, HX = 800;
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const LUSTIG = { ropa: '#2a2530', gorro: 'chistera', bigote: true, pelo: 'corto', pcol: '#2a2118', cuello: true };
const POISSON = { ropa: '#8a6a3a', pelo: 'calvo', bigote: true, pcol: '#6b4a2a' };
/* la torre (vb 0 0 600 1500) con manchas de óxido que aparecen */
const EIFFEL = (w = 600) => `<svg viewBox="0 0 600 1500" width="${w}" height="${w * 2.5}" style="overflow:visible">
  <path d="M40,1500 L235,560 L365,560 L560,1500 L460,1500 C430,1290 170,1290 140,1500 Z" fill="#8a6a4a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M110,1400 L490,1400 M150,1220 L450,1220 M190,1040 L410,1040 M215,880 L385,880 M232,720 L368,720" stroke="${INK}" stroke-width="5" opacity=".6"/>
  <path d="M90,1500 L300,980 L510,1500 M140,1300 L300,700 L460,1300" stroke="${INK}" stroke-width="4" opacity=".35" fill="none"/>
  <rect x="140" y="960" width="320" height="44" fill="#a07a52" stroke="${INK}" stroke-width="8"/>
  <path d="M245,560 L275,150 L325,150 L355,560 Z" fill="#8a6a4a" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/><path d="M262,400 L338,400 M270,270 L330,270" stroke="${INK}" stroke-width="4" opacity=".6"/>
  <rect x="215" y="530" width="170" height="36" fill="#a07a52" stroke="${INK}" stroke-width="8"/><rect x="262" y="118" width="76" height="40" fill="#a07a52" stroke="${INK}" stroke-width="7"/>
  <path d="M300,118 V0" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  <g class="oxi">${[[200, 1180, 40], [400, 1300, 52], [300, 820, 34], [250, 1420, 30], [330, 420, 24], [460, 1440, 36]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#c0602a" stroke="${INK}" stroke-width="4"/>`).join('')}</g></svg>`;
const BILLETE = (c, z = 30) => box(c, 0, 0, 150, 76, { zIndex: z, background: '#9fd3a0', border: `5px solid ${INK}`, borderRadius: '8px', fontFamily: 'Rye', fontSize: '34px', textAlign: 'center', lineHeight: '66px', color: INK, transformOrigin: '50% 50%' }, '1000 F');
const MALETA = (c, z = 12) => box(c, 0, 0, 200, 140, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 200 140" width="200" height="140"><path d="M70,30 V10 H130 V30" stroke="${INK}" stroke-width="10" fill="none"/><rect x="6" y="30" width="188" height="106" rx="12" fill="#8a5a32" stroke="${INK}" stroke-width="7"/><path d="M6,70 H194" stroke="${INK}" stroke-width="5"/><rect x="88" y="60" width="24" height="20" fill="${GOLD}" stroke="${INK}" stroke-width="4"/></svg>`);

function paris(c) {
  const M = MUNDO(c, 3600, 4200);
  M.far.innerHTML = `<svg viewBox="0 0 3600 2400" width="3600" height="2400"><path d="M0,1780 ${[...Array(18)].map((_, i) => `L${i * 200},${1600 + (i % 3) * 60} L${i * 200 + 120},${1600 + (i % 3) * 60} L${i * 200 + 140},${1700}`).join(' ')} L3600,1700 V2400 H0 Z" fill="#b8b0c8" stroke="${INK}" stroke-width="5"/></svg>`;
  const torre = box(M.w, EX - 360, SUELO - 1800, 720, 1800, { zIndex: 3 }, EIFFEL(720));
  const hotel = box(M.w, HX - 450, SUELO - 900, 900, 900, { zIndex: 3 }, `<svg viewBox="0 0 900 900" width="900" height="900"><rect x="0" y="160" width="900" height="740" fill="#e9dcc2" stroke="${INK}" stroke-width="8"/><path d="M-20,170 L900,170 L860,80 L40,80 Z" fill="#5e6a7a" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${60 + i * 170}" y="250" width="100" height="150" rx="40" fill="#3d3a44" stroke="${INK}" stroke-width="6"/><rect x="${60 + i * 170}" y="480" width="100" height="150" rx="40" fill="#3d3a44" stroke="${INK}" stroke-width="6"/>`).join('')}
    <path d="M370,900 V740 C370,680 530,680 530,740 V900 Z" fill="#6b1a1a" stroke="${INK}" stroke-width="7"/><rect x="250" y="190" width="400" height="56" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><text x="450" y="232" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">HÔTEL DE LUXE</text></svg>`);
  const rio = box(M.w, 1500, SUELO - 10, 500, 2200, { zIndex: 2, background: '#5aa7d6', borderTop: `8px solid ${INK}` });
  const suelo1 = box(M.w, 0, SUELO, 1500, 2200, { zIndex: 4, background: '#c9b48a', borderTop: `10px solid ${INK}` });
  const suelo2 = box(M.w, 2000, SUELO, 1600, 2200, { zIndex: 4, background: '#c9b48a', borderTop: `10px solid ${INK}` });
  const puente = box(M.w, 1460, SUELO - 60, 580, 80, { zIndex: 5 }, `<svg viewBox="0 0 580 80" width="580" height="80" preserveAspectRatio="none"><path d="M0,16 H580 V80 H500 C500,30 380,30 380,80 H200 C200,30 80,30 80,80 H0 Z" fill="#cdbb98" stroke="${INK}" stroke-width="7"/></svg>`);
  const lus = PERSm(M.w, 240, Object.assign({ z: 8, piernas: true, calzas: '#2a2530' }, LUSTIG));
  const poi = PERSm(M.w, 250, Object.assign({ z: 8, piernas: true, calzas: '#4a3b2e' }, POISSON));
  const mal = MALETA(M.w); const bil = [0, 1, 2, 3, 4, 5].map(() => BILLETE(M.w, 12));
  const poli = [0, 1].map(() => PERSm(M.w, 230, { ropa: '#2b3550', gorro: 'gorra', gcol: '#2b3550', pelo: 'corto', bigote: true, z: 8, piernas: true, calzas: '#2b3550' }));
  const sol = SOL(c, 1); M.vp.appendChild(sol);
  const oxi = torre.querySelector('.oxi'); oxi.style.opacity = 0; return { M, torre, lus, poi, mal, bil, poli, sol, oxi };
}
const DIA = () => [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]];
const TARDE = () => [[-1, '#f6a96a', '#ffe1a6', '#ffffff', 0], [999, '#f6a96a', '#ffe1a6', '#ffffff', 0]];
const ocultaP = W => { [W.lus, W.poi, ...W.poli].forEach(f => f.style.visibility = 'hidden'); set(W.mal, { o: 0 }); W.bil.forEach(b => set(b, { o: 0 })); };
const vis = f => f.style.visibility = 'visible';

/* PORTADA + L1 (París, sin cortar): bajo la torre, Lustig y Poisson se dan la mano; la maleta cambia de manos → «encima, un SOBORNO»: más billetes */
plano(-1, L(2) - 0.1, { background: '#9fd0ee' }, c => {
  const W = paris(c);
  const t1 = texto(c, 190, hlSpan('VENDIÓ', 'phl') + ' LA', { size: 120, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 320, 'TORRE EIFFEL', { size: 120, color: '#fff', z: 40, shadow: OUT });
  const t3 = texto(c, 470, '…y no era suya', { size: 76, italic: true, color: GOLD, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` });
  const sob = texto(c, 420, '+ SOBORNO', { size: 130, color: RED, z: 41, shadow: `6px 6px 0 #fff, 9px 9px 0 ${INK}` });
  sfx('swoosh_up', 0.05, 0.5); sp(T.nosuya, 'thud', 0.8); sp(T.encima, 'pop', 0.5); sp(T.soborno1, 'stamp', 0.9);
  return t => {
    camara(W.M, t, [[-1, EX, 1500, 0.78], [T.encima, EX - 60, 1620, 0.92], [L(2), EX - 80, 1660, 1.0]]);
    cielo(W.M, t, DIA()); set(W.sol, { x: 860, y: 640 }); ocultaP(W); vis(W.lus); vis(W.poi);
    set(t1, { r: -2 + wobble(t, 0.5, 0.8), o: 1 - p(t, T.encima, 0.3) }); set(t2, { o: 1 - p(t, T.encima, 0.3) }); set(t3, { o: 1 - p(t, T.encima, 0.3) }); paint(c.querySelector('.phl'), t, 0.2, 0.4);
    pies(W.lus, 240, EX - 210, SUELO); pFace(W.lus, t, { feliz: 1, ceja: -6, look: [14, -4], seed: 1 });
    pies(W.poi, 250, EX + 190, SUELO); pFace(W.poi, t, { feliz: 1, closed: t > T.soborno1, look: [-14, -4], seed: 2 });
    // la maleta pasa de Poisson a Lustig, y luego vuelan billetes
    const km = p(t, 0.1, 1.6, E.inOutCubic); set(W.mal, { o: 1, x: lerp(EX + 60, EX - 220, km), y: SUELO - 260 - Math.sin(km * Math.PI) * 60 });
    W.bil.forEach((b, i) => { const t0 = T.encima + 0.2 + i * 0.18, k = p(t, t0, 0.8, E.outCubic); set(b, { o: t > t0 ? 1 : 0, x: lerp(EX + 60, EX - 230 + (i % 3) * 30, k), y: SUELO - 360 - Math.sin(k * Math.PI) * 240 - i * 8, r: (1 - k) * 200 + i * 9 }); });
    set(sob, { o: t > T.soborno1 - 0.1 ? 1 : 0, s: t > T.soborno1 - 0.1 ? lerp(2, 1, p(t, T.soborno1 - 0.1, 0.2)) : 0, r: -6 });
  };
}, { sfx: false });
shakeAt(T.soborno1, 0.3, 14);

/* ACTO 1 (L2 → L3): París 1925, sin cortar: Lustig lee el periódico junto al río → «oxidada»: le salen manchas a la torre → la cámara sube por la torre */
plano(L(2) - 0.1, L(3) + 0.9, { background: '#9fd0ee' }, c => {
  const W = paris(c);
  const chip_ = chip(c, 400, 420, 'París · 1925', { size: 56, bg: '#2b3550' });
  const eL = ETIQUETA(c, 'VICTOR LUSTIG', 'estafador');
  const peri = box(c, 160, 560, 760, 640, { zIndex: 40, background: '#f4efe2', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 rgba(0,0,0,.3)`, transformOrigin: '50% 100%' },
    `<div style="font-family:Playfair;font-weight:900;font-size:64px;text-align:center;border-bottom:5px solid ${INK};margin:20px 30px 0;color:${INK}">LE MATIN</div>
     <div style="font-family:Rye;font-size:62px;line-height:1.1;text-align:center;margin:26px 24px;color:${INK}">LA TORRE EIFFEL, <span style="color:#c0602a">OXIDADA</span></div>
     <div style="font-family:SpecialElite;font-size:40px;text-align:center;margin:0 30px;color:${INK}">Arreglarla costaría <b>una fortuna</b></div>
     <div style="margin:30px 60px 0;height:150px;background:repeating-linear-gradient(#f4efe2 0 18px, rgba(43,33,24,.35) 18px 24px)"></div>`);
  const idea = texto(c, 0, '!', { size: 200, color: YEL, x: 0, w: 200, z: 45, shadow: `6px 6px 0 ${INK}` });
  sp(T.paris, 'whoosh', 0.4); sp(T.periodico, 'paper', 0.8); sp(T.oxidada, 'squish', 0.6); sp(T.fortuna, 'ding', 0.6); sp(T.pasar, 'sparkle', 0.7);
  return t => {
    const cm = camara(W.M, t, [[L(2) - 0.1, 1200, 1500, 0.7], [T.lustig2, 1150, 1700, 1.15], [T.periodico + 0.2, 1150, 1720, 1.2], [T.oxidada - 0.3, EX, 1300, 0.75], [T.fortuna + 0.4, EX, 1100, 0.85], [L(3), 1250, 1650, 1.1], [L(3) + 0.9, 1250, 1640, 1.15]]);
    cielo(W.M, t, DIA()); set(W.sol, { x: 860, y: 300 }); ocultaP(W); vis(W.lus);
    W.oxi.style.opacity = f1(p(t, T.oxidada, 0.8));
    rotuloA(chip_, t, T.paris, T.lustig2 - 0.1);
    const disfraz = t > T.pasar;
    pies(W.lus, 240, 1250, SUELO); pFace(W.lus, t, { feliz: disfraz ? 1 : 0.3, ceja: t > T.fortuna ? -10 : 4, look: t > T.oxidada && t < L(3) ? [14, -14] : [0, 4], seed: 1 });
    etiquetaA(eL, t, T.lustig2, T.periodico - 0.1, cm, 1250, SUELO - 420);
    const enP = t > T.periodico && t < T.oxidada - 0.3; set(peri, { o: enP ? 1 : 0, y: enP ? (1 - p(t, T.periodico, 0.35, E.outBack)) * 800 : 800, r: -2 });
    set(idea, { o: t > T.fortuna + 0.5 && t < L(3) + 0.9 ? 1 : 0, x: 600, y: 860, s: pop(t, T.fortuna + 0.5, 0.3), r: 8 });
  };
}, { sfx: false });

/* ACTO 2 (L3 → L7): el salón del hotel (corte): cinco chatarreros a la mesa; Lustig, de «alto cargo», cuenta el secreto → pujan → la cámara va a Poisson → su mujer sospecha */
plano(L(3) + 0.9, L(8) - 0.1, { background: '#7a2a2a' }, c => {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#8a3a3a', backgroundImage: 'repeating-linear-gradient(90deg, #8a3a3a 0 70px, #7a2e2e 70px 140px)' });
  const lampara = box(cam, 390, 170, 300, 200, { zIndex: 1 }, `<svg viewBox="0 0 300 200" width="300" height="200"><path d="M150,0 V60" stroke="${INK}" stroke-width="6"/><path d="M40,90 Q150,180 260,90" stroke="${GOLD}" stroke-width="14" fill="none"/>${[40, 95, 150, 205, 260].map(x => `<rect x="${x - 9}" y="60" width="18" height="40" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="52" r="10" fill="#ffd977"/>`).join('')}</svg>`);
  const lus = PERS(cam, 380, 600, 320, LUSTIG);
  const cols = ['#5e6a7a', '#6b4a2a', POISSON.ropa, '#3d5a4a', '#7a5aa8'];
  const chat = cols.map((col, i) => PERS(cam, 20 + i * 210, 960, 200, i === 2 ? POISSON : { ropa: col, gorro: i % 2 ? 'gorra' : undefined, gcol: '#5e5a52', pelo: i === 4 ? 'calvo' : 'corto', pcol: '#3a2a1e', bigote: i === 1 }));
  const mesa = box(cam, 0, 1190, 1080, 200, { zIndex: 12, background: '#f4efe2', borderTop: `10px solid ${INK}`, boxShadow: `0 -6px 0 ${GOLD} inset` });
  const mujer = PERS(cam, 760, 760, 300, { ropa: '#7a5aa8', pelo: 'moño', pcol: '#3a2a1e' });
  const doc = box(cam, 230, 1190, 620, 130, { zIndex: 14, whiteSpace: 'nowrap', background: '#fbf6ea', border: `6px solid ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', lineHeight: '118px', color: RED, transformOrigin: '50% 50%' }, 'SECRETO DE ESTADO');
  const pujas = ['¡Yo!', '¡Yo más!', '¡Y yo!'].map(s => BOCADILLO(cam, 0, 0, s, { size: 48, z: 30 }));
  const eP = ETIQUETA(c, 'ANDRÉ POISSON', 'chatarrero'), eLc = ETIQUETA(c, 'LUSTIG', '«alto cargo»');
  const ojos = [0, 1].map(() => box(cam, 0, 0, 50, 46, { zIndex: 20 }, `<svg viewBox="0 0 240 220" width="50" height="46"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="14"/></svg>`));
  const susu = BOCADILLO(cam, 0, 0, '«Soy un funcionario corrupto…<br>necesito un soborno»', { size: 40, z: 30 });
  const bil = [0, 1, 2, 3, 4].map(() => BILLETE(cam, 25));
  sp(L(3) + 0.9, 'whoosh', 0.5); sp(T.cinco, 'pop', 0.4); sp(T.secreto - 0.2, 'mus_baja', 1); sp(T.desmontar, 'stamp', 0.7); pujas.forEach((_, i) => sp(T.mas + 0.2 + i * 0.3, 'pop2', 0.5));
  sp(T.poisson5, 'ding', 0.5); sp(T.muere, 'sparkle', 0.6); sp(T.mujer, 'mus_silencio', 1); sp(T.sospecha, 'boing', 0.6); sp(T.confiesa, 'mus_baja', 1); sp(T.convence, 'mus_sube', 1); sp(T.convence, 'tada', 0.6);
  bil.forEach((_, i) => sp(T.paga + 0.2 + i * 0.25, 'pop', 0.4)); sp(T.latorre7, 'thud', 0.7);
  return t => {
    // cámara: plano general → empuje a Lustig (secreto) → general (pujas) → Poisson → Poisson + mujer → Lustig y Poisson aparte
    const keys = [[L(3) + 0.9, 540, 960, 1.0], [T.secreto, 540, 900, 1.0], [T.secreto + 0.6, 540, 760, 1.35], [T.vendo, 540, 800, 1.3], [T.mas + 0.2, 540, 1000, 1.0],
      [T.poisson5, 540, 1000, 1.0], [T.poisson5 + 0.5, 540, 1130, 1.6], [T.mujer - 0.2, 560, 1120, 1.55], [T.mujer + 0.4, 760, 1000, 1.25], [T.aparte, 760, 1000, 1.2],
      [T.aparte + 0.8, 600, 1000, 1.25], [T.convence, 600, 1000, 1.3], [T.paga, 560, 1040, 1.2], [L(8), 560, 1040, 1.25]];
    const [cx, cy, s] = camVal(keys, t); cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s });
    const cmv = [cx, cy, s];
    const aparte = t > T.aparte + 0.2;
    set(lus, { x: aparte ? lerp(0, 160, p(t, T.aparte, 0.8, E.inOutCubic)) : 0, y: aparte ? 60 : 0, s: 1, r: t > T.secreto && t < T.mas ? 6 : 0 }); pFace(lus, t, { feliz: t > T.confiesa ? 0.6 : 1, ceja: t > T.secreto && t < T.mas ? 16 : -4, look: aparte ? [-14, 6] : [0, 8], seed: 1 });
    chat.forEach((f, i) => { const yo = t > T.mas + 0.2 + (i % 3) * 0.3 && t < T.uno; set(f, { y: yo ? -30 : 0 }); pFace(f, t, { feliz: i === 2 && t > T.muere ? 1 : 0.2, ceja: t > T.desmontar ? 14 : 2, jaw: t > T.desmontar && t < T.vendo ? 0.7 : 0, look: i === 2 && t > T.mujer ? [14, -4] : [(2 - i) * 6, -10], seed: i }); });
    pujas.forEach((b, i) => { const t0 = T.mas + 0.2 + i * 0.3; set(b, { o: t > t0 && t < T.uno ? 1 : 0, x: [20, 420, 820][i], y: 850 - (i % 2) * 70, s: pop(t, t0, 0.3), r: i % 2 ? 5 : -5 }); });
    set(doc, { o: t > T.secreto && t < T.mas ? 1 : 0, s: t > T.desmontar ? lerp(1.6, 1, p(t, T.desmontar, 0.2)) : 0.6, r: -6 });
    ojos.forEach((o, i) => set(o, { o: t > T.muere && t < T.mujer + 0.3 ? 1 : 0, x: 470 + i * 64, y: 1080 + Math.sin(t * 8) * 4, s: 1 + 0.15 * Math.sin(t * 9) }));
    set(mujer, { o: t > T.mujer - 0.3 ? 1 : 0, y: (1 - p(t, T.mujer - 0.3, 0.4, E.outBack)) * 300 }); pFace(mujer, t, { feliz: -0.6, ceja: -14, look: [-14, 4], seed: 7 });
    set(susu, { o: t > T.confiesa && t < T.convence ? 1 : 0, x: 200, y: 330, s: pop(t, T.confiesa, 0.3), r: -2 });
    bil.forEach((b, i) => { const t0 = T.paga + 0.2 + i * 0.25, k = p(t, t0, 0.6, E.outCubic); set(b, { o: t > t0 ? 1 : 0, x: lerp(470, 640 + (i % 2) * 40, k), y: lerp(1100, 860 - i * 30, k) - Math.sin(k * Math.PI) * 120, r: (1 - k) * 180 + i * 7 }); });
    etiquetaA(eP, t, T.poisson5, T.mujer, cmv, 540, 1100, 200);
    etiquetaA(eLc, t, T.cargo + 0.5 > L(3) + 1 ? L(3) + 1 : T.cargo, T.secreto, cmv, 540, 560, -120);
  };
});

/* golpe de color (el giro de la lógica): SI PIDE SOBORNOS… ES DE VERDAD */
colorHit(T.deverdad - 0.35, T.paga - 0.15, YEL, c => { const a = texto(c, 640, 'SI PIDE SOBORNOS…', { size: 96, color: INK }), b = texto(c, 820, '¡ES DE VERDAD!', { size: 124, color: RED, shadow: `5px 5px 0 ${INK}` }); return t => { set(a, { r: -3 }); set(b, { s: 1 + 0.05 * Math.sin(t * 9), r: -4 }); }; });
shakeAt(T.deverdad - 0.3, 0.25, 12);

/* ACTO 3 (L8 → L10): París otra vez, sin cortar: Lustig huye por el puente con la maleta (billetes al viento) → Poisson, rojo de vergüenza, se tapa la cara →
   «OTRA VEZ»: Lustig vuelve… llegan los gendarmes… y se escapa corriendo */
plano(L(8) - 0.1, L(10) - 0.1, { background: '#9fd0ee' }, c => {
  const W = paris(c);
  const otra = texto(c, 300, 'OTRA VEZ', { size: 150, color: '#fff', z: 40, shadow: OUT });
  const roj = box(W.M.w, 0, 0, 140, 60, { zIndex: 10, borderRadius: '50%', background: 'rgba(232,80,122,.55)' });
  const silb = BOCADILLO(W.M.w, 0, 0, '¡PRIIII!', { size: 54 });
  const humo = [0, 1, 2].map(() => box(W.M.w, 0, 0, 90, 90, { zIndex: 7, borderRadius: '50%', background: '#e6e0d2', border: `5px solid ${INK}` }));
  sp(T.huye, 'whoosh', 0.6); sp(T.ypoisson - 0.2, 'mus_baja', 1); sp(T.verguenza, 'sad', 0.5); sp(T.vuelve - 0.2, 'mus_sube', 1); sp(T.otravez, 'stamp', 0.9); sp(T.denuncian, 'error', 0.4); sp(T.escapa, 'swoosh_up', 0.7);
  return t => {
    camara(W.M, t, [[L(8) - 0.1, 1150, 1700, 0.95], [T.maleta + 0.8, 1750, 1700, 0.95], [T.ypoisson - 0.2, 1900, 1700, 0.9],
      [T.ypoisson + 0.1, HX, 1700, 1.15, 'corte'], [T.verguenza + 0.6, HX, 1680, 1.3],
      [T.vuelve - 0.1, EX, 1350, 0.7, 'corte'], [T.otravez + 0.5, EX - 100, 1550, 0.9], [T.denuncian + 0.6, EX - 300, 1650, 0.95], [L(10), EX - 600, 1650, 0.95]]);
    cielo(W.M, t, DIA()); set(W.sol, { x: 860, y: 300 }); ocultaP(W); W.oxi.style.opacity = 1;
    const huida = t < T.ypoisson;
    if (huida) { vis(W.lus); const k = p(t, L(8) - 0.1, T.ypoisson - L(8), E.linear), x = lerp(1000, 2300, k); const yb = x > 1460 && x < 2040 ? 60 : 0;
      pies(W.lus, 240, x, SUELO - yb - Math.abs(Math.sin(t * 10)) * 20, { r: 6 }); pFace(W.lus, t, { feliz: 1, look: [14, 0], seed: 1 });
      set(W.mal, { o: 1, x: x - 40, y: SUELO - yb - 240 - Math.abs(Math.sin(t * 10)) * 20 });
      W.bil.forEach((b, i) => { const kk = (t * 0.8 + i / 6) % 1; set(b, { o: t > T.maleta ? 1 - kk : 0, x: x - 120 - kk * 300 - i * 20, y: SUELO - 300 - kk * 260 + Math.sin(t * 5 + i) * 30, r: t * 200 + i * 40 }); });
    } else if (t < T.vuelve) { vis(W.poi); pies(W.poi, 250, HX, SUELO); pFace(W.poi, t, { feliz: -0.8, ceja: 20, closed: t > T.nolo, look: [0, 10], seed: 2 }); }
    set(roj, { o: !huida && t < T.vuelve && t > T.verguenza - 0.4 ? 1 : 0, x: HX - 70, y: SUELO - 300 });
    // vuelve, los gendarmes y la fuga
    if (t > T.vuelve) { vis(W.lus); const kf = p(t, T.escapa, 1.6, E.inCubic), x = EX - 150 - kf * 900;
      pies(W.lus, 240, x, SUELO - (t > T.escapa ? Math.abs(Math.sin(t * 12)) * 26 : 0), { r: t > T.escapa ? -8 : 0 }); pFace(W.lus, t, { feliz: t > T.denuncian ? -0.5 : 1, ceja: t > T.denuncian ? 20 : -4, jaw: t > T.denuncian && t < T.escapa + 0.4 ? 0.8 : 0, look: t > T.denuncian ? [14, 0] : [-6, -4], seed: 1 });
      W.poli.forEach((g, i) => { g.style.visibility = t > T.denuncian - 0.2 ? 'visible' : 'hidden'; const kp = p(t, T.denuncian - 0.2, 2.6, E.linear); pies(g, 230, EX + 420 + i * 170 - kp * 900, SUELO - Math.abs(Math.sin(t * 12 + i)) * 20); pFace(g, t, { feliz: -0.5, ceja: -12, look: [-14, 0], seed: 4 + i }); });
      set(silb, { o: t > T.denuncian && t < L(10) - 0.2 ? 1 : 0, x: EX + 300 - p(t, T.denuncian - 0.2, 2.6, E.linear) * 900, y: SUELO - 700, s: pop(t, T.denuncian, 0.3), r: 5 });
      humo.forEach((h, i) => { const kh = p(t, T.escapa + 0.1 + i * 0.12, 0.6); set(h, { o: t > T.escapa + 0.1 + i * 0.12 ? 1 - kh : 0, x: x + 80 + i * 50, y: SUELO - 100 - kh * 60, s: 0.5 + kh }); });
    }
    set(otra, { o: t > T.otravez - 0.1 && t < T.denuncian ? 1 : 0, s: t > T.otravez - 0.1 ? lerp(2, 1, p(t, T.otravez - 0.1, 0.2)) : 0, r: -5 });
  };
}, { sfx: false });
shakeAt(T.otravez, 0.3, 14);

/* REMATE (L10): la torre al atardecer, con el cartel «SE VENDE» columpiándose (el Vecino, asomado, se ríe) */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#f6a96a' }, c => {
  const W = paris(c);
  const se = box(W.M.w, EX - 190, SUELO - 1150, 380, 120, { zIndex: 6, whiteSpace: 'nowrap', background: '#fbf6ea', border: `7px solid ${INK}`, fontFamily: 'Rye', fontSize: '58px', textAlign: 'center', lineHeight: '106px', color: RED, transformOrigin: '50% 0' }, 'SE VENDE');
  sp(T.enpie, 'harpa', 0.6); sp(T.comprarla, 'pop', 0.6);
  return t => {
    camara(W.M, t, [[L(10) - 0.1, EX, 1250, 0.62], [L(11), EX, 1350, 0.72]]); cielo(W.M, t, TARDE()); set(W.sol, { x: 760, y: 1000 }); ocultaP(W); W.oxi.style.opacity = 1;
    set(se, { o: t > T.comprarla - 0.3 ? 1 : 0, r: Math.sin(t * 3) * 8, s: pop(t, T.comprarla - 0.3, 0.4) });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué es lo más raro', 'que te han intentado vender?', { size: 74, draw: c => [['un piso que no existía', YEL], ['un iPhone de 50 €', PINK], ['un sobrino «príncipe»', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 260 + i * 30, 640 + i * 160, s, { size: 48, bg: col, color: INK }), L(11) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(95, 'La torre vendida', ['ESTAFAS', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[L(10) + 0.2, L(11) - 0.15]],
  vecino: { risa: [[T.comprarla, T.comprarla + 1.2]], sorpresa: [], golpes: [] },
});
