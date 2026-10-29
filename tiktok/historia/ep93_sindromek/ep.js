/* Ep. 93 · El síndrome K (Roma, 1943) — FORMATO NUEVO (cuento continuo, sin nada gráfico): acto 1 en un solo mundo (calle de Roma → río → isla del hospital)
   que la cámara recorre siguiendo a los personajes; corte duro solo al entrar en el hospital y en el giro (la tos tras la puerta). Poco texto. */
Story.prepara();
const T = {
  noexiste: Q('no existe'), salvo0: Q('salvó vidas'),
  medicos1: Q('unos médicos'), narices: Q('las narices'),
  roma: Q('roma'), soldados: Q('los soldados alemanes'), casa: Q('casa por casa'),
  escapan: Q('algunos escapan'), hospital3: Q('un hospital'), rio: Q('del río'), esconden: Q('los esconden'), pacientes: Q('como pacientes'),
  undia: Q('un día'), llegan4: Q('llegan al hospital'), todos: Q('todos los enfermos'),
  inventan: Q('se inventan una enfermedad'), sk5: Q('el síndrome k'), mortal: Q('mortal'), contagiosa: Q('muy contagiosa'),
  burla: Q('una burla'), inicial: Q('la inicial'),
  sala: Q('la sala del síndrome k'), dentro: Q('desde dentro'), tose: Q('alguien tose'),
  noentran: Q('no entran'), vuelta: Q('se dan la vuelta'), prisa: Q('a toda prisa'),
  salvaron: Q('se salvaron'), decenas: Q('decenas de personas'), nadie: Q('no tenía nadie'),
};
const SUELO = 1600, RIO0 = 1250, RIO1 = 1850, HX = 2350, VERDE_S = '#5d6b4a';
const BATA = { ropa: '#f4efe2', cuello: true };
const soldado = (c, w = 210) => PERSm(c, w, { ropa: VERDE_S, gorro: 'casco', z: 8, piernas: true, calzas: '#3d3a44' });
const HOSPITAL = (w = 760) => `<svg viewBox="0 0 760 720" width="${w}" height="${w * 720 / 760}"><rect x="20" y="200" width="720" height="520" fill="#e9dcc2" stroke="${INK}" stroke-width="8"/><path d="M0,210 L380,40 L760,210 Z" fill="#b5523a" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <rect x="345" y="70" width="70" height="110" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M380,90 V160 M350,125 H410" stroke="${RED}" stroke-width="16"/>
  ${[0, 1, 2, 3].map(i => `<rect x="${70 + i * 170}" y="270" width="90" height="110" fill="#3d3a44" stroke="${INK}" stroke-width="6"/>`).join('')}${[0, 3].map(i => `<rect x="${70 + i * 170}" y="450" width="90" height="110" fill="#3d3a44" stroke="${INK}" stroke-width="6"/>`).join('')}
  <path d="M310,720 V520 C310,450 450,450 450,520 V720 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><text x="380" y="245" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">OSPEDALE</text></svg>`;
const NUBE_TOS = c => box(c, 0, 0, 260, 170, { zIndex: 30, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 260 170" width="260" height="170"><path d="M50,150 C10,150 0,100 40,88 C30,40 90,20 120,50 C140,10 220,20 220,70 C260,80 260,140 220,150 Z" fill="#e6efe0" stroke="${INK}" stroke-width="7"/><text x="130" y="118" text-anchor="middle" font-family="Rye" font-size="44" fill="${INK}">¡COF!</text></svg>`);
const CARTEL_K = (w = 420) => `<svg viewBox="0 0 420 260" width="${w}" height="${w * 260 / 420}"><rect x="6" y="6" width="408" height="248" rx="14" fill="#fbf6ea" stroke="${INK}" stroke-width="8"/><rect x="20" y="20" width="380" height="220" rx="8" fill="none" stroke="${RED}" stroke-width="6"/><text x="210" y="110" text-anchor="middle" font-family="Rye" font-size="56" fill="${RED}">SÍNDROME K</text><text x="210" y="170" text-anchor="middle" font-family="SpecialElite" font-size="32" fill="${INK}">CONTAGIOSO · NO PASAR</text></svg>`;

function roma(c) {
  const M = MUNDO(c, 3100, 2400);
  M.far.innerHTML = `<svg viewBox="0 0 3100 2400" width="3100" height="2400"><path d="M0,1360 C400,1250 800,1320 1200,1260 C1600,1200 2000,1300 2400,1250 C2700,1210 2900,1260 3100,1240 V2400 H0 Z" fill="#a7a48a" stroke="${INK}" stroke-width="6"/><path d="M500,1260 C500,1120 760,1120 760,1260 Z" fill="#cbbf9e" stroke="${INK}" stroke-width="6"/><path d="M630,1110 V1060" stroke="${INK}" stroke-width="6"/></svg>`;
  const casas = [[40, 280, 460, '#c87a3a'], [330, 260, 400, '#b5523a'], [600, 300, 480, '#a8452e'], [910, 280, 420, '#c87a3a']].map(([x, w, h, tc]) => box(M.w, x, SUELO - h, w, h, { zIndex: 3 }, CASA(w, h, tc)));
  const puertas = casas.map((_, i) => box(M.w, [40, 330, 600, 910][i] + [280, 260, 300, 280][i] / 2 - 35, SUELO - 120, 70, 120, { zIndex: 4, background: '#6b4a2a', border: `5px solid ${INK}`, borderRadius: '30px 30px 0 0' }));
  const rio = box(M.w, RIO0, SUELO - 20, RIO1 - RIO0, 800, { zIndex: 2, background: '#5aa7d6', borderTop: `8px solid ${INK}` });
  const puente = box(M.w, RIO0 - 40, SUELO - 70, RIO1 - RIO0 + 80, 90, { zIndex: 6 }, `<svg viewBox="0 0 680 90" width="${RIO1 - RIO0 + 80}" height="90" preserveAspectRatio="none"><path d="M0,20 H680 V90 H600 C600,40 480,40 480,90 H400 C400,40 280,40 280,90 H200 C200,40 80,40 80,90 H0 Z" fill="#cdbb98" stroke="${INK}" stroke-width="7"/></svg>`);
  const hosp = box(M.w, HX - 380, SUELO - 720, 760, 720, { zIndex: 3 }, HOSPITAL());
  const sueloI = box(M.w, 0, SUELO, RIO0, 900, { zIndex: 5, background: '#b8a07a', borderTop: `10px solid ${INK}` });
  const sueloD = box(M.w, RIO1, SUELO, 3100 - RIO1, 900, { zIndex: 5, background: '#b8a07a', borderTop: `10px solid ${INK}` });
  const sold = [0, 1, 2].map(() => soldado(M.w));
  const refu = [[230, '#7a5aa8', 'moño'], [190, '#2b8ad6', 'corto'], [150, '#e8507a', 'largo']].map(([w, col, pe]) => [PERSm(M.w, w, { ropa: col, pelo: pe, pcol: '#3a2a1e', z: 8, piernas: true, calzas: '#3d3a44' }), w]);
  const medico = PERSm(M.w, 240, Object.assign({ pelo: 'calvo', barba: true, pcol: '#6b4a2a', z: 7, piernas: true, calzas: '#3d3a44' }, BATA));
  const sol = SOL(c, 1); M.vp.appendChild(sol);
  return { M, puertas, sold, refu, medico, sol };
}
const CIELO = () => [[-1, '#b8c8d6', '#efe6d2', '#ffffff', 0], [999, '#b8c8d6', '#efe6d2', '#ffffff', 0]];
const pintaR = (W, t) => { cielo(W.M, t, CIELO()); set(W.sol, { x: 800, y: 240, o: 0.85 }); };

/* L0 · PORTADA (fotograma 0, en marcha): la puerta con el cartel «SÍNDROME K»; un soldado retrocede ante la nube de tos; título */
function salaK(c, o = {}) {
  const pared = box(c, 0, 0, 1080, 1920, { zIndex: 0, background: '#dfe7e0', backgroundImage: 'linear-gradient(#dfe7e0 0 66%, #9aa79a 66%)' });
  const puerta = box(c, 330, 560, 420, 720, { zIndex: 3, background: '#7d8a6a', border: `9px solid ${INK}`, borderRadius: '14px' });
  const cartel = box(c, 330, 600, 420, 260, { zIndex: 4 }, CARTEL_K());
  const sol = PERS(c, 680, 820, 300, { ropa: VERDE_S, gorro: 'casco', piernas: true, calzas: '#3d3a44' });
  const sol2 = PERS(c, 860, 900, 240, { ropa: VERDE_S, gorro: 'casco', piernas: true, calzas: '#3d3a44' });
  const tos = NUBE_TOS(c);
  return { puerta, cartel, sol, sol2, tos };
}
plano(-1, L(1) - 0.1, { background: '#dfe7e0' }, c => {
  const S = salaK(c);
  const t1 = texto(c, 190, 'EL ' + hlSpan('SÍNDROME K', 'phl'), { size: 104, color: INK });
  const t2 = texto(c, 330, '…no existe. Y salvó vidas.', { size: 70, italic: true, color: INK });
  sfx('swoosh_up', 0.05, 0.5); sp(T.noexiste, 'thud', 0.8);
  return t => {
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t1, { r: -1 + wobble(t, 0.5, 0.6) });
    set(S.tos, { x: 360, y: 760, s: 1 + 0.08 * Math.sin(t * 7), r: -6 });
    set(S.sol, { x: 30 * Math.sin(t * 2), r: 6 }); pFace(S.sol, t, { feliz: -1, ceja: 22, jaw: 0.8, look: [-14, -4] }); pFace(S.sol2, t, { feliz: -1, ceja: 20, jaw: 0.6, look: [-14, 0], seed: 2 });
  };
}, { sfx: false });

/* ACTO 1 (L1 → L5): un solo mundo sin cortar: el hospital de la isla y su médico → panorámica a la calle: soldados casa por casa → la cámara sigue a los que huyen
   por el puente hasta el hospital → el médico los mete dentro → «pero un día» los soldados cruzan el mismo puente */
plano(L(1) - 0.1, L(5) - 0.1, { background: '#b8c8d6' }, c => {
  const W = roma(c);
  const chip_ = chip(c, 380, 420, 'Roma · 1943', { size: 56, bg: '#2b3550' });
  const toc = [0, 1, 2].map(() => texto(W.M.w, 0, '¡toc toc!', { size: 54, italic: true, color: INK, x: 0, w: 240, z: 12, shadow: `3px 3px 0 #fff` }));
  sp(T.roma, 'whoosh', 0.4); [0, 1, 2].forEach(i => sp(T.casa + i * 0.4, 'thud', 0.4)); sp(T.escapan, 'swoosh_up', 0.4); sp(T.esconden, 'click', 0.6); sp(T.undia, 'mus_baja', 1); sp(T.llegan4, 'drumroll', 0.5);
  return t => {
    const kr = p(t, T.escapan - 0.2, T.esconden - T.escapan + 0.2, E.inOutCubic), rx = lerp(820, HX - 80, kr);
    const ks = p(t, T.undia, T.todos - T.undia + 0.4, E.inOutCubic), sx = lerp(900, HX - 300, ks);
    camara(W.M, t, [
      [L(1) - 0.1, HX, 1260, 1.05], [L(2) - 0.15, HX - 40, 1250, 1.1],
      [L(2) + 0.2, 640, 1270, 0.95], [T.casa + 0.8, 760, 1290, 1.05],
      [T.escapan + 0.2, 900, 1290, 1.0], [T.esconden, HX - 120, 1290, 1.05], [L(4) - 0.15, HX - 140, 1290, 1.1],
      [L(4) + 0.2, 1100, 1290, 0.95], [T.todos + 0.4, HX - 250, 1280, 1.05], [L(5), HX - 260, 1280, 1.12]]);
    pintaR(W, t); rotuloA(chip_, t, T.roma, L(3) - 0.2);
    // soldados: casa por casa en L2; cruzan el puente en L4
    W.sold.forEach((s, i) => { const enCalle = t < T.undia; const x = enCalle ? 300 + i * 300 + Math.sin(t * 2 + i) * 20 : sx - i * 150;
      pies(s, 210, x, SUELO - (t > T.undia ? Math.abs(Math.sin(t * 8 + i)) * 12 : 0)); s.style.visibility = t > L(2) - 0.2 ? 'visible' : 'hidden'; pFace(s, t, { feliz: -0.3, ceja: -6, look: [14, 0], seed: i }); });
    toc.forEach((x, i) => { const t0 = T.casa + i * 0.4; set(x, { o: t > t0 && t < t0 + 0.7 && t < T.escapan ? 1 : 0, x: 300 + i * 300 - 60, y: SUELO - 420 - p(t, t0, 0.7) * 60 }); });
    // refugiados: corren por el puente hasta el hospital y desaparecen dentro
    W.refu.forEach(([f, w], i) => { const dentro = t > T.esconden + 0.3 + i * 0.15; f.style.visibility = t > T.escapan - 0.3 && !dentro ? 'visible' : 'hidden'; pies(f, w, rx - i * 110, SUELO - 60 * (rx > RIO0 && rx < RIO1 ? 1 : 0) - Math.abs(Math.sin(t * 10 + i)) * 16, { r: Math.sin(t * 10 + i) * 4 }); pFace(f, t, { feliz: -0.6, ceja: 18, look: [14, 0], seed: 3 + i }); });
    // médico: en la puerta del hospital
    pies(W.medico, 240, HX + 120, SUELO); pFace(W.medico, t, { feliz: t > T.esconden ? 0.6 : 0.2, ceja: t > T.todos ? 16 : 4, look: [t > T.undia ? -14 : -8, 0], jaw: 0, seed: 7 });
  };
}, { sfx: false });

/* ACTO 2 (L5 → L7): dentro del hospital (corte): los médicos se inventan la enfermedad en la pizarra: «MORBO K» → mortal → MUY contagiosa → la K, una burla */
plano(L(5) - 0.1, L(7) - 0.1, { background: '#e9e2cf' }, c => {
  const cam = CAM(c);
  const piz = box(cam, 300, 420, 700, 520, { zIndex: 4, background: '#2f4a3a', border: `16px solid #8a5a32`, boxShadow: `10px 10px 0 ${INK}` });
  const esc = el('div', piz, { left: '40px', top: '40px', fontFamily: 'SpecialElite', fontSize: '58px', color: '#f4efe2', lineHeight: 1.35 }, '');
  const k = texto(cam, 520, 'K', { size: 360, color: RED, x: 300, w: 700, z: 8, shadow: `8px 8px 0 ${INK}` });
  const docs = [[320, 960, 300], [640, 1010, 260]].map(([x, y, w], i) => PERS(cam, x, y, w, Object.assign({ pelo: i ? 'corto' : 'calvo', barba: !i, pcol: '#6b4a2a' }, BATA)));
  const tiza = '— Diagnóstico —<br>SÍNDROME K', l2 = '<br>· mortal', l3 = '<br>· MUY contagioso';
  sp(T.inventan, 'paper', 0.6); sp(T.sk5, 'click', 0.7); sp(T.mortal, 'click', 0.6); sp(T.contagiosa, 'stamp', 0.8); sp(T.burla, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(5), 6, 0.08);
    const n = Math.floor(clamp((t - T.inventan) / 1.2) * 34); esc.innerHTML = tiza.slice(0, Math.max(0, n)) + (t > T.mortal ? l2 : '') + (t > T.contagiosa ? l3 : '');
    set(k, { o: t > T.burla - 0.2 ? 1 : 0, s: pop(t, T.burla - 0.2, 0.4), r: -6 + Math.sin(t * 3) * 3 }); set(piz, { o: t > T.burla - 0.2 ? 0.25 : 1 });
    docs.forEach((d, i) => pFace(d, t, { feliz: t > T.burla ? 1 : 0.3, ceja: t > T.burla ? -4 : 6, look: [10, -8], closed: t > T.inicial && i === 1, seed: i }));
  };
});

/* ACTO 3 · EL GIRO (L7 → L9): el pasillo y la puerta del SÍNDROME K; los soldados se acercan… silencio… ¡COF! desde dentro → se dan la vuelta y huyen */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#dfe7e0' }, c => {
  const cam = CAM(c);
  const pared = box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#dfe7e0', backgroundImage: 'linear-gradient(#dfe7e0 0 66%, #9aa79a 66%)' });
  const puerta = box(cam, 300, 560, 420, 720, { zIndex: 3, background: '#7d8a6a', border: `9px solid ${INK}`, borderRadius: '14px' });
  const cartel = box(cam, 300, 600, 420, 260, { zIndex: 4 }, CARTEL_K());
  const sol = [0, 1].map(i => PERS(cam, 0, 760 + i * 80, 300 - i * 50, { ropa: VERDE_S, gorro: 'casco', piernas: true, calzas: '#3d3a44' }));
  const tos = NUBE_TOS(cam);
  const ex = texto(cam, 0, '!!', { size: 150, color: RED, x: 0, w: 200, z: 20, shadow: `5px 5px 0 ${INK}` });
  sp(L(7), 'mus_silencio', 1); [0, 1, 2, 3].forEach(i => sp(T.sala + i * 0.45, 'thud', 0.35)); sp(T.tose + 0.2, 'burst', 0.6); sp(T.noentran, 'boing', 0.8); sp(T.vuelta, 'whoosh', 0.7); sp(T.prisa + 0.3, 'mus_sube', 1);
  return t => {
    const kz = p(t, T.sala, T.dentro - T.sala + 0.4, E.inOutCubic); cam.style.transformOrigin = '540px 900px'; set(cam, { s: 1 + kz * 0.25 - p(t, T.vuelta, 0.6) * 0.25 });
    const ka = p(t, T.sala - 0.2, 1.6, E.outCubic), kh = p(t, T.vuelta, 1.2, E.inCubic);
    sol.forEach((s, i) => { set(s, { x: lerp(1100, 640 + i * 180, ka) + kh * 900, y: (t > T.vuelta ? -Math.abs(Math.sin(t * 12 + i)) * 20 : 0), r: t > T.vuelta ? 8 : 0 }); pFace(s, t, { feliz: t > T.tose ? -1 : -0.2, ceja: t > T.tose ? 24 : -4, jaw: t > T.tose ? 0.9 : 0, look: t > T.vuelta ? [14, 0] : [-14, 0], seed: i }); });
    set(tos, { o: t > T.tose && t < T.prisa + 0.5 ? 1 : 0, x: 380, y: 700, s: pop(t, T.tose, 0.3) * (1 + 0.06 * Math.sin(t * 9)), r: -6 });
    set(ex, { o: t > T.tose + 0.2 && t < T.prisa ? 1 : 0, x: 760, y: 560, s: pop(t, T.tose + 0.2, 0.3) });
  };
}, { sfx: false });
shakeAt(T.tose + 0.2, 0.35, 16);

/* REMATE (L9): la puerta del hospital se abre al sol; salen los escondidos, a salvo (el Vecino, asomado, cómplice) */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#b8c8d6' }, c => {
  const W = roma(c);
  const cnt = texto(c, 420, 'decenas', { size: 110, italic: true, color: '#2e6b3a', z: 40, shadow: `4px 4px 0 #fff` });
  sp(T.decenas, 'harpa', 0.6); sp(T.nadie, 'ding', 0.6);
  return t => {
    camara(W.M, t, [[L(9) - 0.1, HX, 1300, 1.0], [L(10), HX, 1250, 0.9]]); pintaR(W, t);
    W.sold.forEach(s => s.style.visibility = 'hidden');
    W.refu.forEach(([f, w], i) => { const k = p(t, T.salvaron + i * 0.3, 1.4, E.outCubic); f.style.visibility = t > T.salvaron + i * 0.3 ? 'visible' : 'hidden'; pies(f, w, HX - 20 - k * (200 + i * 120), SUELO); pFace(f, t, { feliz: 1, ceja: 4, look: [-10, -6], seed: 3 + i }); });
    pies(W.medico, 240, HX + 140, SUELO); pFace(W.medico, t, { feliz: 1, closed: t > T.nadie, ceja: 6, seed: 7 });
    set(cnt, { o: t > T.decenas ? 1 : 0, s: pop(t, T.decenas, 0.35), r: -4 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué historia de héroes', 'que nadie conoce cuento?', { size: 76, draw: c => [['la de tu abuelo', YEL], ['una de médicos', PINK], ['una de España', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(93, 'El síndrome K', ['SÍNDROME K', '1943']);

Story.run({
  textura: true,
  ovalo: [[L(9) + 0.3, L(10) - 0.15]],
  vecino: { risa: [], sorpresa: [[T.nadie, T.nadie + 1.0]], golpes: [] },
});
