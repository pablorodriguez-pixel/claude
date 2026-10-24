/* Ep. 94 · «Cenas a las diez por culpa de Hitler» — FORMATO NUEVO (cuento continuo). Tres mundos: la cocina (gancho y remate, el mismo sitio para cerrar el bucle),
   la Europa de 1940 (cuatro torres con reloj que la cámara recorre sin cortar) y la noche del salto. Cortes duros solo en la noche, el presente y Galicia. */
Story.prepara();
const T = {
  diez0: Q('diez'), hitler0: Q('hitler'),
  broma: Q('no es broma'), reloj1: Q('tu reloj'), ochenta: Q('ochenta años'), mintiendote: Q('mintiéndote'),
  marzo: Q('marzo'), londres: Q('londres'), portugal2: Q('portugal'), sol2: Q('por el sol'),
  franco: Q('pero franco'), hitler3: Q('a hitler'), ordena: Q('ordena'), todos: Q('todos los relojes'), berlin: Q('berlín'),
  noche4: Q('esa noche'), once: Q('las once'), saltan: Q('saltan'), doce: Q('las doce'),
  guerra: Q('la guerra acaba'), nadie: Q('nadie vuelve'), portugal5: Q('y portugal'), suhora: Q('su hora'),
  hoy: Q('así que hoy'), marca: Q('marca las diez'), nueve: Q('casi las nueve'), verano: Q('en verano'), ocho: Q('casi las ocho'),
  galicia: Q('galicia'), junio: Q('junio'), dia7: Q('es de día'),
  osea: Q('o sea'), tarde: Q('no cenas tarde'), tuhora: Q('a tu hora'), otro: Q('otro país'),
  noche9: Q('esta noche'), cenar9: Q('cenar a las diez'), culpa: Q('la culpa'),
};
const SUELO = 1700, TX = { lon: 520, lis: 1380, mad: 2280, ber: 3380 }, RY = 800;
const hh = h => `${String(Math.floor(h) % 24).padStart(2, '0')}:${String(Math.floor((h % 1) * 60 + 1e-6)).padStart(2, '0')}`;

/* reloj de pared (vb 0 0 300 300); o.cara = ojos y nariz de Pinocho; pon(r, horas, segundos) */
const RELOJ = (c, w = 300, o = {}) => { const d = box(c, 0, 0, w, w, { zIndex: o.z || 8, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 300" width="${w}" height="${w}" style="overflow:visible">
  <circle cx="150" cy="150" r="140" fill="${o.fondo || '#fbf6ea'}" stroke="${INK}" stroke-width="12"/>
  ${[...Array(12)].map((_, i) => `<path d="M150,22 V${i % 3 ? 38 : 50}" stroke="${INK}" stroke-width="${i % 3 ? 5 : 10}" transform="rotate(${i * 30} 150 150)"/>`).join('')}
  ${o.cara ? `<ellipse cx="112" cy="200" rx="17" ry="19" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="188" cy="200" rx="17" ry="19" fill="#fff" stroke="${INK}" stroke-width="4"/><g class="pu"><circle cx="114" cy="203" r="8" fill="${INK}"/><circle cx="190" cy="203" r="8" fill="${INK}"/></g><path class="bo" d="M128,252 Q150,262 172,252" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}
  <path class="hh" d="M150,150 V84" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path class="mm" d="M150,150 V44" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
  ${o.seg === false ? '' : `<path class="ss" d="M150,172 V40" stroke="${RED}" stroke-width="4"/>`}<circle cx="150" cy="150" r="12" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`);
  d.hh = d.querySelector('.hh'); d.mm = d.querySelector('.mm'); d.ss = d.querySelector('.ss'); d.pu = d.querySelector('.pu');
  if (o.cara) d.nz = box(d, w * 0.5 - w * 0.03, w * 0.7, 0, w * 0.075, { zIndex: 2, background: '#e8a070', border: `4px solid ${INK}`, borderRadius: '0 40px 40px 0' });
  return d; };
const pon = (r, h, s) => { r.hh.setAttribute('transform', `rotate(${f1((h % 12) * 30)} 150 150)`); r.mm.setAttribute('transform', `rotate(${f1((h % 1) * 360)} 150 150)`); if (r.ss) r.ss.setAttribute('transform', `rotate(${(Math.floor(s || 0) * 6) % 360} 150 150)`); };
const nariz = (r, k) => { if (r.nz) r.nz.style.width = px(Math.round(k * 190)); };

/* torre con reloj (vb 0 0 w h) */
const TORRE = (w, h, col, techo, aguja) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible">
  ${aguja ? `<path d="M${w * 0.15},${h * 0.18} L${w / 2},-${h * 0.12} L${w * 0.85},${h * 0.18} Z" fill="${techo}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>` : `<path d="M-20,${h * 0.18} L${w / 2},${h * 0.02} L${w + 20},${h * 0.18} Z" fill="${techo}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`}
  <rect x="0" y="${h * 0.18}" width="${w}" height="${h * 0.82}" fill="${col}" stroke="${INK}" stroke-width="8"/>
  ${[0.55, 0.72].map(f => [0.2, 0.6].map(g => `<rect x="${w * g}" y="${h * f}" width="${w * 0.2}" height="${h * 0.1}" fill="#3d3a44" stroke="${INK}" stroke-width="6"/>`).join('')).join('')}
  <path d="M${w * 0.35},${h} V${h * 0.88} C${w * 0.35},${h * 0.83} ${w * 0.65},${h * 0.83} ${w * 0.65},${h * 0.88} V${h} Z" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/></svg>`;

function europa(c) {
  const M = MUNDO(c, 3900, 4600);
  M.far.innerHTML = `<svg viewBox="0 0 3900 2400" width="3900" height="2400"><path d="M0,1500 C500,1380 900,1460 1400,1400 C1900,1340 2400,1440 2900,1390 C3300,1350 3600,1420 3900,1400 V2400 H0 Z" fill="#a9b48e" stroke="${INK}" stroke-width="6"/></svg>`;
  const mar = box(M.w, 860, SUELO - 10, 120, 2900, { zIndex: 2, background: '#5aa7d6', borderTop: `8px solid ${INK}` });
  const torres = {}, relojes = {}, horas = {};
  [['lon', 300, 1060, '#c9b48a', '#6b6a74', true, 'LONDRES'], ['lis', 320, 900, '#f4efe2', '#b5523a', false, 'LISBOA'], ['mad', 440, 940, '#e9c79a', '#3d3a44', false, 'MADRID'], ['ber', 320, 980, '#b5523a', '#3d3a44', true, 'BERLÍN']].forEach(([k, w, h, col, te, ag, nom]) => {
    torres[k] = box(M.w, TX[k] - w / 2, SUELO - h, w, h, { zIndex: 3 }, TORRE(w, h, col, te, ag));
    relojes[k] = RELOJ(M.w, 220, { z: 5 }); set(relojes[k], { x: TX[k] - 110, y: SUELO - h + h * 0.18 + 30 });
    ROTULO(M.w, TX[k] - 150, SUELO - h * 0.4, nom, '', { w: 300, size: 54, z: 6 });
    horas[k] = texto(M.w, SUELO - h - 190, '12:00', { size: 120, color: '#fff', x: TX[k] - 250, w: 500, z: 9, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  });
  const frontera = box(M.w, 1800, SUELO - 300, 10, 300, { zIndex: 4, borderLeft: `10px dashed ${INK}`, opacity: 0.5 });
  const suelo = box(M.w, 0, SUELO, 3900, 2900, { zIndex: 4, background: '#b8a07a', borderTop: `10px solid ${INK}` });
  const franco = PERSm(M.w, 230, { ropa: '#5d6b4a', gorro: 'gorra', bigote: true, pelo: 'corto', pcol: '#2a2118', z: 8, piernas: true, calzas: '#3d3a44' });
  const hitler = PERSm(M.w, 230, { ropa: '#9a8458', gorro: 'gorra', gcol: '#9a8458', bigote: 'corto', pelo: 'corto', pcol: '#2a2118', z: 8, piernas: true, calzas: '#3d3a44' });
  const luso = PERSm(M.w, 220, { ropa: '#2e6b3a', pelo: 'corto', pcol: '#3a2a1e', bigote: true, z: 8, piernas: true, calzas: '#3d3a44' });
  const sol = SOL(c, 1); M.vp.appendChild(sol);
  return { M, relojes, horas, franco, hitler, luso, sol };
}
const DIA = () => [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]];
const ponHoras = (W, t, h, cm) => Object.keys(h).forEach(k => { pon(W.relojes[k], h[k], t); W.horas[k].innerHTML = hh(h[k]); W.horas[k].style.transformOrigin = '50% 100%'; set(W.horas[k], { s: cm ? Math.max(1, 0.55 / cm[2]) : 1 }); });

/* la cocina de hoy (gancho y remate): ventana con luz de día, el reloj de pared con cara y la cena */
function cocina(c) {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#f3d9c4', backgroundImage: 'repeating-linear-gradient(90deg, #f3d9c4 0 60px, #f7e4d3 60px 120px)' });
  const ven = box(cam, 70, 560, 340, 420, { zIndex: 1, background: 'linear-gradient(#f6b46a, #ffe3a6)', border: `12px solid #f4efe2`, outline: `6px solid ${INK}`, overflow: 'hidden' });
  const solV = box(ven, 150, 230, 110, 110, { borderRadius: '50%', background: '#ffd04a', boxShadow: '0 0 60px 20px rgba(255,200,80,.7)' });
  box(ven, 0, 300, 340, 140, { background: '#7d9a62', borderTop: `5px solid ${INK}` }); box(ven, 160, 0, 12, 420, { background: '#f4efe2' }); box(ven, 0, 200, 340, 12, { background: '#f4efe2' });
  const reloj = RELOJ(cam, 330, { cara: true, z: 4 }); set(reloj, { x: 680, y: 520 });
  const tu = PERS(cam, 360, 860, 360, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  const mesa = box(cam, 40, 1190, 1000, 330, { zIndex: 12, background: '#f4efe2', backgroundImage: `repeating-linear-gradient(45deg, rgba(200,16,46,.5) 0 30px, transparent 30px 60px), repeating-linear-gradient(-45deg, rgba(200,16,46,.5) 0 30px, transparent 30px 60px)`, border: `8px solid ${INK}`, borderRadius: '16px' });
  const plato = box(cam, 360, 1140, 360, 110, { zIndex: 13, borderRadius: '50%', background: '#fff', border: `7px solid ${INK}` });
  box(plato, 90, 22, 170, 50, { borderRadius: '50%', background: '#e8b04a', border: `5px solid ${INK}` });
  const humo = [0, 1, 2].map(i => box(cam, 0, 0, 30, 90, { zIndex: 13, borderLeft: `7px solid rgba(255,255,255,.9)`, borderRadius: '50%' }));
  return { cam, reloj, tu, humo };
}
const vaporA = (K, t) => K.humo.forEach((h, i) => { const k = (t * 0.7 + i / 3) % 1; set(h, { x: 470 + i * 60 + Math.sin(t * 3 + i) * 14, y: 1060 - k * 120, o: Math.sin(k * Math.PI) }); });

/* PORTADA + L1 (cocina, sin cortar): son las 22:00 y fuera aún hay luz; título → la cámara entra en el reloj → «MINTIÉNDOTE»: le crece la nariz */
plano(-1, L(2) - 0.1, { background: '#f3d9c4' }, c => {
  const K = cocina(c);
  const t1 = texto(c, 200, 'CENAS A LAS ' + hlSpan('10', 'phl'), { size: 116, color: '#fff', z: 40, shadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  const t2 = texto(c, 345, '…por culpa de HITLER', { size: 78, italic: true, color: GOLD, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` });
  const mien = texto(c, 1180, '¡MENTIROSO!', { size: 120, color: RED, z: 45, shadow: `5px 5px 0 ${INK}` });
  sfx('swoosh_up', 0.05, 0.5); sp(T.hitler0, 'thud', 0.8); sp(T.reloj1, 'tick', 0.6); sp(T.mintiendote, 'boing', 0.9);
  return t => {
    const kz = p(t, T.reloj1 - 0.2, T.ochenta - T.reloj1 + 0.4, E.inOutCubic); K.cam.style.transformOrigin = '845px 685px'; set(K.cam, { s: 1 + kz * 0.9, x: kz * (540 - 845), y: kz * (760 - 685) });
    set(t1, { r: -1 + wobble(t, 0.5, 0.6), o: 1 - p(t, T.broma, 0.3) }); set(t2, { o: 1 - p(t, T.broma, 0.3) }); paint(c.querySelector('.phl'), t, 0.2, 0.4);
    pon(K.reloj, 22 + t / 3600, t); nariz(K.reloj, p(t, T.mintiendote, 0.6, E.outBack)); set(K.reloj.pu, { x: Math.sin(t * 1.3) * 4 });
    set(K.reloj, { x: 680, y: 520, r: t > T.mintiendote ? Math.sin(t * 9) * 3 : 0 });
    set(mien, { o: t > T.mintiendote + 0.3 ? 1 : 0, s: pop(t, T.mintiendote + 0.3, 0.35), r: -6 });
    pFace(K.tu, t, { feliz: 0.5, jaw: Math.abs(Math.sin(t * 6)) * 0.5, look: [10, -6], ceja: t > T.broma ? 16 : 4 });
    vaporA(K, t);
  };
}, { sfx: false });

/* ACTO 1 (L2 → L4): Europa 1940 sin cortar. Madrid → Londres → Lisboa: todos a las 12 con el sol arriba → Franco mira a Berlín (las 13) → el reloj de Madrid salta a las 13 */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#9fd0ee' }, c => {
  const W = europa(c);
  const chip_ = chip(c, 400, 420, 'Marzo · 1940', { size: 56, bg: '#2b3550' });
  const cor = box(W.M.w, 0, 0, 80, 72, { zIndex: 20 }, `<svg viewBox="0 0 240 220" width="80" height="72"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="12"/></svg>`);
  const eF = ETIQUETA(c, 'FRANCO', 'España'), eH = ETIQUETA(c, 'HITLER', 'Alemania');
  const mas = texto(W.M.w, SUELO - 1380, '+1 h', { size: 150, color: RED, x: TX.mad - 250, w: 500, z: 12, shadow: `5px 5px 0 #fff` });
  sp(T.marzo, 'whoosh', 0.4); sp(T.londres, 'bell', 0.5); sp(T.portugal2, 'whoosh', 0.4); sp(T.sol2, 'harpa', 0.5);
  sp(T.franco, 'thud', 0.6); sp(T.hitler3 + 0.2, 'pop', 0.5); sp(T.ordena, 'stamp', 0.7); sp(T.todos, 'clockfast', 0.8); sp(T.berlin, 'ding', 0.7);
  return t => {
    const cm = camara(W.M, t, [
      [L(2) - 0.1, TX.mad, 1150, 0.8], [T.londres - 0.1, TX.mad - 300, 1150, 0.7], [T.londres + 0.6, TX.lon, 1150, 0.8], [T.portugal2 + 0.5, TX.lis, 1150, 0.8],
      [T.sol2 + 0.4, 1900, 1060, 0.3], [L(3) - 0.1, 1900, 1060, 0.3],
      [T.franco + 0.4, TX.mad + 200, 1400, 1.05], [T.hitler3 - 0.1, TX.mad + 300, 1400, 0.95], [T.hitler3 + 0.7, TX.ber - 120, 1400, 1.0], [T.ordena + 0.2, TX.ber - 120, 1400, 0.9],
      [T.ordena + 0.8, TX.mad, 1250, 0.75], [T.todos + 0.9, TX.mad, 1150, 0.85], [T.berlin + 0.3, 1900, 1060, 0.3], [L(4), 1900, 1060, 0.3]]);
    cielo(W.M, t, DIA()); set(W.sol, { x: 540 + Math.sin(t * 0.2) * 20, y: 230 });
    const km = p(t, T.todos, 0.9, E.inOutCubic);
    ponHoras(W, t, { lon: 12 + t / 3600, lis: 12 + t / 3600, mad: 12 + km + t / 3600, ber: 13 + t / 3600 }, cm);
    rotuloA(chip_, t, T.marzo, T.sol2);
    pies(W.franco, 230, TX.mad + 260, SUELO); pFace(W.franco, t, { feliz: t > T.hitler3 ? 0.8 : 0.2, ceja: 6, look: [t > T.hitler3 && t < T.ordena ? 14 : -6, -4], jaw: 0, seed: 1 });
    pies(W.hitler, 230, TX.ber - 240, SUELO); pFace(W.hitler, t, { feliz: 0.4, ceja: -8, look: [-14, 0], seed: 2 });
    pies(W.luso, 220, TX.lis + 250, SUELO); pFace(W.luso, t, { feliz: 0.6, look: [-8, -4], seed: 3 });
    set(cor, { o: t > T.hitler3 && t < T.ordena + 0.5 ? 1 : 0, x: TX.mad + 300 + p(t, T.hitler3, 1.4) * 500, y: SUELO - 520 - Math.sin(p(t, T.hitler3, 1.4) * Math.PI) * 160, s: pop(t, T.hitler3, 0.3) });
    etiquetaA(eF, t, T.franco, T.hitler3 + 0.2, cm, TX.franco || TX.mad + 260, SUELO - 400);
    etiquetaA(eH, t, T.hitler3 + 0.5, T.ordena + 0.3, cm, TX.ber - 240, SUELO - 400);
    set(mas, { o: t > T.todos + 0.3 && t < L(4) ? 1 : 0, y: -Math.max(0, 0.55 / cm[2] - 1) * 140, s: pop(t, T.todos + 0.3, 0.35) * Math.max(1, 0.55 / cm[2]) });
  };
}, { sfx: false });

/* ACTO 1b · LA NOCHE DEL SALTO (corte): Madrid de noche, todos durmiendo; 23:00… silencio… ¡CLAC! las 00:00 */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#1d2440' }, c => {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(#141a33, #2b3560)' });
  const est = ESTRELLAS_C(cam, 26, 1);
  const edif = box(cam, 60, 980, 960, 940, { zIndex: 2 }, CASA(960, 940, '#3d3a44'));
  const ven = [0, 1, 2, 3].map(i => box(cam, 150 + i * 220, 1180, 120, 140, { zIndex: 3, background: '#ffd977', border: `6px solid ${INK}` }));
  const zz = [0, 1].map(i => texto(cam, 0, 'Zzz', { size: 64, italic: true, color: '#fff', x: 0, w: 200, z: 5 }));
  const reloj = RELOJ(cam, 470, { z: 6 }); set(reloj, { x: 305, y: 440 });
  const hora = texto(cam, 300, '23:00', { size: 120, color: '#fff', z: 8, shadow: `5px 5px 0 ${INK}` });
  const clac = texto(cam, 930, '¡CLAC!', { size: 150, color: YEL, z: 9, shadow: `6px 6px 0 ${INK}` });
  sp(L(4), 'mus_baja', 1); [0, 1, 2].forEach(i => sp(T.once + 0.3 + i * 0.5, 'tick', 0.6)); sp(T.saltan - 0.35, 'mus_silencio', 1); sp(T.saltan, 'clockfast', 0.9); sp(T.doce, 'bell', 0.9); sp(T.doce + 0.6, 'mus_sube', 1);
  return t => {
    zoom(cam, t, L(4), 5, 0.1); brillan(est, t, 1);
    const k = p(t, T.saltan, 0.5, E.outBack), h = 23 + 0.98 * (t > T.once ? p(t, T.once, T.saltan - T.once, E.linear) * 0.02 : 0) + k * 0.98;
    pon(reloj, h, t); hora.innerHTML = t > T.saltan + 0.3 ? '00:00' : '23:00'; set(hora, { s: t > T.saltan + 0.3 ? pop(t, T.saltan + 0.3, 0.3) : 1 });
    set(reloj, { x: 305, y: 440, r: t > T.saltan && t < T.saltan + 0.5 ? Math.sin(t * 40) * 4 : 0 });
    set(clac, { o: t > T.saltan + 0.1 && t < L(5) - 0.3 ? 1 : 0, s: pop(t, T.saltan + 0.1, 0.3), r: -6 });
    zz.forEach((z, i) => { const kk = (t * 0.4 + i / 2) % 1; set(z, { x: 240 + i * 440, y: 1120 - kk * 120, o: Math.sin(kk * Math.PI) }); });
  };
});
shakeAt(T.saltan + 0.1, 0.35, 16);

/* ACTO 2 (L5 → L6): de vuelta a la Europa de día, sin cortar: Madrid sigue a las 13 → la cámara cruza la frontera: Portugal, a las 12, saluda */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#9fd0ee' }, c => {
  const W = europa(c);
  const fin = chip(c, 400, 420, '1945 · fin de la guerra', { size: 52, bg: '#2e6b3a' });
  const bo = BOCADILLO(W.M.w, 0, 0, '¡Nosotros no!', { size: 54 });
  sp(T.guerra, 'tada', 0.5); sp(T.nadie, 'click', 0.5); sp(T.portugal5, 'whoosh', 0.5); sp(T.suhora, 'pop', 0.6);
  return t => {
    camara(W.M, t, [[L(5) - 0.1, TX.mad, 1150, 0.8], [T.nadie + 0.6, TX.mad, 1100, 0.9], [T.portugal5 + 0.7, TX.lis + 120, 1250, 0.85], [L(6), TX.lis + 120, 1250, 0.9]]);
    cielo(W.M, t, DIA()); set(W.sol, { x: 560, y: 230 });
    ponHoras(W, t, { lon: 12 + t / 3600, lis: 12 + t / 3600, mad: 13 + t / 3600, ber: 13 + t / 3600 });
    rotuloA(fin, t, T.guerra, T.portugal5);
    pies(W.franco, 230, TX.mad + 260, SUELO); pFace(W.franco, t, { feliz: 0.3, seed: 1 }); W.hitler.style.visibility = 'hidden';
    pies(W.luso, 220, TX.lis + 250, SUELO - (t > T.suhora ? Math.abs(Math.sin(t * 6)) * 30 : 0)); pFace(W.luso, t, { feliz: 1, look: [6, -8], closed: t > T.suhora, seed: 3 });
    set(bo, { o: t > T.suhora - 0.2 ? 1 : 0, x: TX.lis + 60, y: SUELO - 720, s: pop(t, T.suhora - 0.2, 0.3), r: -4 });
  };
}, { sfx: false });

/* ACTO 3 · EL GIRO (corte al presente): tu reloj marca las 22:00; el reloj del SOL, las 21:00 casi… y en verano, las 20:00 casi */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#cfe0ee' }, c => {
  const fondo = box(c, 0, 0, 1080, 1920, { zIndex: 0, background: '#cfe0ee' });
  const r1 = RELOJ(c, 400, { z: 4 }), r2 = RELOJ(c, 400, { z: 4, fondo: '#ffe27a' }); set(r1, { x: 80, y: 560 }); set(r2, { x: 600, y: 560 });
  const rayos = box(c, 560, 520, 480, 480, { zIndex: 3, borderRadius: '50%', background: 'repeating-conic-gradient(rgba(255,200,40,.6) 0 10deg, transparent 10deg 20deg)' });
  const l1 = texto(c, 1000, 'TU RELOJ', { size: 60, color: INK, x: 30, w: 500, z: 5 }), l2 = texto(c, 1000, 'EL SOL', { size: 60, color: INK, x: 550, w: 500, z: 5 });
  const h1 = texto(c, 420, '22:00', { size: 100, color: '#fff', x: 30, w: 500, z: 6, shadow: `5px 5px 0 ${INK}` }), h2 = texto(c, 420, '22:00', { size: 100, color: '#fff', x: 550, w: 500, z: 6, shadow: `5px 5px 0 ${INK}` });
  const est = chip(c, 340, 1150, 'INVIERNO', { size: 64, bg: '#2b3550' });
  sp(T.marca, 'tick', 0.6); sp(T.nueve, 'clockfast', 0.7); sp(T.verano, 'swoosh_up', 0.6); sp(T.ocho, 'clockfast', 0.8); sp(T.ocho + 0.5, 'ding', 0.6);
  return t => {
    const kv = p(t, T.verano, 0.5, E.outCubic); fondo.style.background = mixC('#cfe0ee', '#ffd9a0', kv);
    const hs = 22 - p(t, T.nueve - 0.2, 0.8, E.inOutCubic) * 1.25 - p(t, T.ocho - 0.2, 0.8, E.inOutCubic) * 1.0;
    pon(r1, 22 + t / 3600, t); pon(r2, hs, t); h2.innerHTML = hh(hs); set(rayos, { r: t * 20 });
    est.innerHTML = t > T.verano ? 'VERANO' : 'INVIERNO'; est.style.background = t > T.verano ? RED : '#2b3550'; set(est, { s: t > T.verano ? pop(t, T.verano, 0.3) : pop(t, L(6), 0.3), r: -3 });
    set(r2, { x: 600, y: 560, r: t > T.ocho && t < T.ocho + 0.6 ? Math.sin(t * 30) * 4 : 0 });
  };
});
shakeAt(T.ocho + 0.2, 0.3, 12);

/* L7 · Galicia, junio, 22:00: el sol aún sobre el mar y la gente en la playa (corte) */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#ffcf8a' }, c => {
  const cam = CAM(c);
  box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(#8fc3e8, #ffd99a 60%)' });
  const sol = box(cam, 640, 640, 220, 220, { zIndex: 1, borderRadius: '50%', background: '#ffd04a', boxShadow: '0 0 100px 50px rgba(255,190,70,.6)' });
  box(cam, 0, 980, 1080, 300, { zIndex: 2, background: '#3a86c0', borderTop: `8px solid ${INK}` });
  box(cam, 0, 1240, 1080, 700, { zIndex: 3, background: '#f0d49a', borderTop: `8px solid ${INK}` });
  const faro = box(cam, 70, 560, 150, 440, { zIndex: 4, background: 'repeating-linear-gradient(#f4efe2 0 80px, #c8102e 80px 160px)', border: `7px solid ${INK}`, borderRadius: '30px 30px 0 0' });
  const ba = PERS(cam, 420, 900, 300, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' });
  const toalla = box(cam, 300, 1250, 520, 90, { zIndex: 12, background: 'repeating-linear-gradient(90deg, #e8507a 0 50px, #fff 50px 100px)', border: `6px solid ${INK}`, borderRadius: '12px' });
  const rot = ROTULO(cam, 560, 300, 'GALICIA', '22:00 · junio', { w: 380, size: 70 });
  sp(T.galicia, 'whoosh', 0.5); sp(T.dia7, 'sparkle', 0.7);
  return t => {
    zoom(cam, t, L(7), 4, 0.08); set(sol, { y: Math.sin(t * 0.5) * 6 }); rotuloA(rot, t, T.galicia + 0.1);
    set(ba, { y: -Math.abs(Math.sin(t * 4)) * 20 }); pFace(ba, t, { feliz: 1, closed: t > T.dia7, look: [8, -6] });
  };
});

/* ACTO 4 · REMATE (L8 → L10): vuelta a la cocina del principio (cierra el bucle); el reloj «de otro país» y la mirada de culpa */
plano(L(8) - 0.1, L(10) - 0.1, { background: '#f3d9c4' }, c => {
  const K = cocina(c);
  const etq = chip(c, 640, 870, 'hora de Berlín', { size: 44, bg: INK, color: YEL, z: 40 });
  const t1 = texto(c, 220, 'No cenas tarde', { size: 96, color: '#fff', z: 40, shadow: `5px 5px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}` });
  const t2 = texto(c, 340, '…es el reloj', { size: 84, italic: true, color: GOLD, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}` });
  sp(T.tarde, 'pop', 0.5); sp(T.otro, 'stamp', 0.8); sp(T.culpa, 'boing', 0.7);
  return t => {
    const kz = p(t, T.noche9, 1.2, E.inOutCubic); K.cam.style.transformOrigin = '540px 1000px'; set(K.cam, { s: 1.05 + kz * 0.12 });
    set(t1, { o: t > T.tarde - 0.1 && t < T.noche9 ? 1 : 0, s: pop(t, T.tarde - 0.1, 0.35), r: -2 }); set(t2, { o: t > T.tuhora && t < T.noche9 ? 1 : 0, s: pop(t, T.tuhora, 0.35) });
    pon(K.reloj, 22 + t / 3600, t); nariz(K.reloj, t > T.otro ? 0.6 : 0); set(K.reloj.pu, { x: t > T.culpa ? -8 : 0 });
    set(etq, { o: t > T.otro ? 1 : 0, s: pop(t, T.otro, 0.3), r: -6 });
    const sosp = t > T.culpa - 0.3; pFace(K.tu, t, { feliz: sosp ? -0.2 : 0.6, ceja: sosp ? -10 : 4, look: sosp ? [16, -10] : [0, -4], jaw: sosp ? 0 : Math.abs(Math.sin(t * 6)) * 0.5 });
    vaporA(K, t);
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿A qué hora', 'cenáis en tu casa?', { size: 84, draw: c => [['a las 9', YEL], ['a las 10', PINK], ['a las 11, ¿y qué?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(94, 'La hora de Hitler', ['RELOJES', 'y Hitler']);

Story.run({
  textura: true,
  ovalo: [[L(9) + 0.2, L(10) - 0.15]],
  vecino: { risa: [[T.culpa, T.culpa + 1.2]], sorpresa: [], golpes: [] },
});
