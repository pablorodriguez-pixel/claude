/* Ep. 77 · ¿Por qué las ventanas de los aviones son redondas? (el Comet, 1954) — edición estilo ep64/ep67: escenarios llenos, objetos con cara, Vecino fijo */
Story.prepara();
const T = {
  cuad0: Q('cuadradas'),
  cambiaron: Q('las cambiaron'), serio: Q('bastante serio'), partian: Q('se partían'),
  m1952: Q('mil novecientos cincuenta y dos'), ingleses: Q('los ingleses'), primer: Q('primer avión'), comet: Q('el comet'), ventCuad: Q('ventanas cuadradas'), casa: Q('de tu casa'),
  joya: Q('la joya'), reina: Q('la reina madre'), vuelta: Q('una vuelta'),
  m1954: Q('mil novecientos cincuenta y cuatro'), dos4: Q('dos comet'), desint: Q('se desintegran'), meses: Q('pocos meses'), tormenta: Q('sin tormenta'), explic: Q('sin explicación'),
  ingenieros: Q('los ingenieros'), pelicula: Q('de película'), meten: Q('meten un comet'), piscina: Q('piscina gigante'), inflan: Q('lo inflan'), miles: Q('miles de veces'),
  simulan: Q('así simulan'), subir: Q('subir y bajar'), undia: Q('y un día'), crac: Q('crac'), raja: Q('se raja'), donde: Q('por dónde'), esquina7: Q('la esquina'),
  esquina8: Q('en una esquina'), fuerza8: Q('toda la fuerza'), punto: Q('un punto'), cansa: Q('se cansa'), rompe: Q('se rompe'),
  curva: Q('en una curva'), reparte: Q('se reparte'), borde: Q('todo el borde'), desde: Q('desde entonces'), redondeadas: Q('redondeadas'),
  agujero: Q('el agujerito'), fallo: Q('un fallo'), iguala: Q('iguala la presión'), cristales: Q('los dos cristales'),
  ojo: Q('ojo'), otros: Q('otros fallos'),
  osea: Q('o sea'), miras: Q('miras en cada vuelo'), leccion: Q('una lección'), accidentes: Q('dos accidentes'),
};
const CIELOC = '#bcd3ea', AZULC = '#2b4a8c', CREMA = '#FBF6EA', AGUAC = '#5c9ad6', METALC = '#dfe3e8';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };

/* ---------- figuras ---------- */
/* el Comet de perfil (morro a la derecha) con cara en el morro; o.redondas: ventanas redondeadas · vb 0 0 900 260 */
const FUS = 'M40,130 C40,96 110,84 200,84 L760,84 C840,84 892,112 892,132 C892,152 840,180 760,180 L200,180 C110,180 40,166 40,130 Z';
const cometInner = (o = {}) => `<path d="M70,112 L26,20 L118,20 L170,96 Z" fill="${o.col || METALC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><rect x="40" y="22" width="70" height="20" fill="${AZULC}"/>
  ${cut(P(FUS), 8, 10)}<path d="${FUS}" fill="${o.col || METALC}" stroke="${INK}" stroke-width="7"/><path d="${FUS}" fill="url(#hA)" opacity=".25"/><rect x="160" y="146" width="680" height="14" fill="${AZULC}"/>
  ${[...Array(10)].map((_, i) => `<rect class="win" x="${250 + i * 50}" y="104" width="30" height="30" rx="${o.redondas ? 13 : 2}" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/>`).join('')}
  <path d="M836,104 C852,104 868,112 876,124 L836,124 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="4"/>
  <path d="M380,170 L300,252 L480,252 L530,170 Z" fill="${o.col || METALC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><rect x="405" y="196" width="80" height="24" rx="10" fill="#9aa4ad" stroke="${INK}" stroke-width="4"/>
  <g class="cc"><path d="M772,96 q10,-7 20,0 M800,96 q10,-7 20,0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></g><g class="ce"><ellipse cx="782" cy="112" rx="9" ry="10" fill="#fff" stroke="${INK}" stroke-width="3"/><ellipse cx="810" cy="112" rx="9" ry="10" fill="#fff" stroke="${INK}" stroke-width="3"/></g><g class="cp"><circle cx="783" cy="114" r="4.5" fill="${INK}"/><circle cx="811" cy="114" r="4.5" fill="${INK}"/></g><path class="cm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
const COMET = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 260 / 900, cometInner(o), '0 0 900 260', Object.assign({ z: 9, origin: '50% 50%' }, o));
const cometFace = (f, t, o = {}) => caraF(f, t, o, 112, [796, 140, 12, '.cm', '.cp', '.ce', '.cc']);
/* ventanilla con cara (cuadrada o redonda), cielo con nubes que pasan y grieta opcional · vb 0 0 300 400 */
let VID = 0;
const ventInner = (red, id) => `<defs><clipPath id="vc${id}"><rect x="46" y="46" width="208" height="308" rx="${red ? 100 : 6}"/></clipPath></defs>
  <rect x="10" y="10" width="280" height="380" rx="${red ? 135 : 18}" fill="#eceff2" stroke="${INK}" stroke-width="8"/><rect x="24" y="24" width="252" height="352" rx="${red ? 122 : 12}" fill="none" stroke="#c4cad1" stroke-width="6"/>
  <g clip-path="url(#vc${id})"><rect x="40" y="40" width="220" height="320" fill="#8fc6ef"/><rect x="40" y="250" width="220" height="110" fill="#f4f7fb" opacity=".8"/>
  <g class="nub">${[[60, 110], [190, 190], [90, 290]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="48" ry="20" fill="#fff" stroke="${INK}" stroke-width="3"/>`).join('')}</g></g>
  <rect x="46" y="46" width="208" height="308" rx="${red ? 100 : 6}" fill="none" stroke="${INK}" stroke-width="6"/>
  <g class="vc"><path d="M98,140 q16,-10 32,0 M170,140 q16,-10 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="ve"><ellipse cx="115" cy="170" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="185" cy="170" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="vp"><circle cx="117" cy="173" r="7.5" fill="${INK}"/><circle cx="187" cy="173" r="7.5" fill="${INK}"/></g><path class="vm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path class="grieta" d="M48,48 L80,78 L70,96 L104,118 L96,140 L126,150" stroke="${INK}" stroke-width="6" fill="none" stroke-linejoin="round" opacity="0"/>
  <circle class="agu" cx="150" cy="330" r="7" fill="${INK}" opacity="0"/>`;
const VENT = (c, x, y, w, red, o = {}) => { const f = figura(c, x, y, w, w * 400 / 300, ventInner(red, VID++), '0 0 300 400', Object.assign({ z: 9, origin: '50% 50%' }, o)); f.nub = f.querySelector('.nub'); f.gr = f.querySelector('.grieta'); return f; };
const ventFace = (f, t, o = {}) => { caraF(f, t, o, 170, [150, 236, 20, '.vm', '.vp', '.ve', '.vc']); f.nub.setAttribute('transform', `translate(${f1(-((t * 60) % 260) + 130)} 0)`); };
/* la reina madre: la abuela del ep67 con corona */
const REINA = (c, x, y, w) => figura(c, x, y, w, w * 1.2, `<path d="M40,360 C40,280 90,250 150,250 C210,250 260,280 260,360 Z" fill="#7a5aa8" stroke="${INK}" stroke-width="7"/><path d="M90,262 Q150,300 210,262" stroke="#fff" stroke-width="12" fill="none" stroke-dasharray="2 14" stroke-linecap="round"/>
  <circle cx="150" cy="170" r="100" fill="#f2c9a0" stroke="${INK}" stroke-width="7"/><path d="M52,160 C50,90 100,64 150,64 C200,64 250,90 248,160 C230,120 190,104 150,104 C110,104 70,120 52,160 Z" fill="#e9e9e9" stroke="${INK}" stroke-width="6"/>
  <path d="M84,70 L96,10 L124,50 L150,0 L176,50 L204,10 L216,70 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="150" cy="40" r="9" fill="${RED}" stroke="${INK}" stroke-width="3"/>
  <circle cx="92" cy="200" r="16" fill="#f29a9a" opacity=".6"/><circle cx="208" cy="200" r="16" fill="#f29a9a" opacity=".6"/>
  <g class="ac"><path d="M96,132 q18,-10 36,0 M168,132 q18,-10 36,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <g class="ae"><ellipse cx="114" cy="162" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="186" cy="162" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="ap"><circle cx="116" cy="165" r="7" fill="${INK}"/><circle cx="188" cy="165" r="7" fill="${INK}"/></g>
  <path class="am" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`, '0 0 300 360', { z: 8, origin: '50% 100%' });
const reinaFace = (f, t, o = {}) => caraF(f, t, o, 162, [150, 222, 22, '.am', '.ap', '.ae', '.ac']);
const NUBE = (c, x, y, w, z = 3) => box(c, x, y, w, w * 0.36, { zIndex: z, background: '#fff', border: `6px solid ${INK}`, borderRadius: '999px' });
const pista = c => { box(c, 0, 1240, 1080, 700, { zIndex: 2, background: '#6f7a83', borderTop: `8px solid ${INK}` }); return [...Array(6)].map((_, i) => box(c, i * 220, 1330, 120, 18, { zIndex: 3, background: '#fff', border: `3px solid ${INK}` })); };
const flecha = (c, x, y, w, h, d, col = RED, wd = 10) => box(c, x, y, w, h, { zIndex: 14 }, arrowSvg(d, col, wd));

/* L0 · PORTADA (fotograma 0 completo): la ventanilla redonda con cara mira por encima del hombro a la cuadrada, que tiembla y se agrieta */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 230, '¿Por qué las ventanas', { size: 80 });
  texto(c, 320, 'del avión son…', { size: 80 });
  const t2 = texto(c, 410, hlSpan('REDONDAS?', 'phl'), { size: 130, italic: true });
  const r = VENT(c, 420, 600, 420, true);
  const q = VENT(c, 70, 800, 300, false); q.style.zIndex = 8;
  const av = COMET(c, 520, 1210, 500, { redondas: true }); av.style.zIndex = 12;
  const x = box(c, 60, 860, 320, 320, { zIndex: 13 }, XSVG);
  const ant = stamp(c, 90, 1190, 'ANTES', { size: 70, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.cuad0, 'glitch', 0.7); sp(T.cuad0 + 0.25, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const hop = Math.abs(Math.sin(t * 4)); set(r, { y: -hop * 18, r: Math.sin(t * 2) * 3 }); ventFace(r, t, { jaw: talkW(t, 'VECINO'), look: [-8, 4], feliz: 1, ceja: t > T.cuad0 ? 10 : 0 });
    set(q, { x: t > T.cuad0 ? Math.sin(t * 40) * 4 : 0, r: -6 }); ventFace(q, t, { feliz: -1, ceja: 14, look: [8, -4], jaw: 0.3, seed: 1 }); q.gr.setAttribute('opacity', t > T.cuad0 ? 1 : 0);
    set(x, { o: t > T.cuad0 + 0.1 ? 1 : 0.85, s: 1 + 0.05 * Math.sin(t * 6) });
    set(av, { y: Math.sin(t * 3) * 10, r: -4 }); cometFace(av, t, { feliz: 1, look: [4, -2] });
    stampA(ant, t, T.cuad0 + 0.25, -8);
  };
}, { sfx: false });
shakeAt(T.cuad0 + 0.25, 0.3, 12);

/* L1 · «las cambiaron por algo bastante serio: los aviones se partían en el aire» */
headline(L(1) - 0.1, L(2) - 0.1, 'Algo *bastante serio*', { size: 92, hlT: T.serio });
plano(L(1) - 0.1, L(2) - 0.1, { background: CIELOC }, c => {
  const cam = CAM(c);
  const ns = [[60, 420, 260], [640, 520, 300], [300, 1080, 340], [760, 1160, 220]].map(([x, y, w]) => NUBE(cam, x, y, w));
  box(cam, 0, 1320, 1080, 700, { zIndex: 2, background: '#3f6d9e' }); const mar = OLAS(cam, 1260, '#5c87b5', 3);
  const izq = box(cam, 0, 0, 1080, 1920, { zIndex: 9, clipPath: 'inset(0 50% 0 0)' }), der = box(cam, 0, 0, 1080, 1920, { zIndex: 9, clipPath: 'inset(0 0 0 50%)' });
  const a1 = COMET(izq, 90, 760, 900), a2 = COMET(der, 90, 760, 900);
  const bum = box(cam, 420, 700, 240, 240, { zIndex: 12 }, `<svg viewBox="0 0 260 260" width="240" height="240"><path d="M130,10 L160,90 L250,70 L180,130 L240,210 L150,170 L120,250 L100,170 L20,200 L70,130 L10,70 L100,90 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/></svg>`);
  const piezas = [0, 1, 2, 3, 4].map(i => box(cam, 530, 830, 40, 30, { zIndex: 11, background: METALC, border: `4px solid ${INK}` }));
  const q = texto(cam, 1100, '¿¡?!', { size: 150, color: RED, z: 20 });
  sp(T.cambiaron, 'whoosh', 0.6); sp(T.serio, 'drumroll', 0.6); sp(T.partian, 'burst', 1); sp(T.partian + 0.2, 'glitch', 0.7);
  return t => {
    zoom(cam, t, L(1), 3, 0.08);
    ns.forEach((n, i) => set(n, { x: -((t * (80 + i * 30)) % 1400) + 700 })); set(mar, { x: (t * 90) % 80 });
    const k = p(t, T.partian, 1.2, E.outCubic);
    [a1, a2].forEach((a, i) => { set(a, { x: (i ? 1 : -1) * k * 160, y: k * (i ? 260 : 180) + Math.sin(t * 3) * 8, r: (i ? 1 : -1) * k * 28 }); cometFace(a, t, { feliz: t > T.partian ? -1 : 1, ceja: t > T.serio ? 14 : 0, jaw: t > T.partian ? 0.8 : 0 }); });
    set(bum, { o: t > T.partian && t < T.partian + 0.4 ? 1 : 0, s: pop(t, T.partian, 0.2) });
    piezas.forEach((pz, i) => { const a = i * 1.3; set(pz, { o: t > T.partian ? 1 - p(t, T.partian + 0.8, 0.4) : 0, x: Math.cos(a) * k * 260, y: Math.sin(a) * k * 200 + k * k * 160, r: k * 400 * (i % 2 ? 1 : -1) }); });
    set(q, { o: t > T.partian + 0.5 ? 1 : 0, s: pop(t, T.partian + 0.5, 0.35), r: Math.sin(t * 6) * 6 });
  };
});
shakeAt(T.partian, 0.45, 20);

/* L2 · 1952: el Comet, primer reactor de pasajeros (periódico) → despega → ventanas cuadradas = las de tu casa */
headline(L(2) - 0.1, L(3) - 0.1, '*1952*: el Comet', { size: 96, hlT: T.m1952 + 0.3 });
plano(L(2) - 0.1, T.ventCuad - 0.25, { background: CIELOC }, c => {
  const cam = CAM(c);
  const ns = [[80, 420, 240], [700, 470, 260]].map(([x, y, w]) => NUBE(cam, x, y, w));
  const lin = pista(cam);
  const tor = box(cam, 840, 880, 140, 360, { zIndex: 3 }, `<svg viewBox="0 0 140 360" width="140" height="360"><rect x="40" y="90" width="60" height="270" fill="#d9cfb8" stroke="${INK}" stroke-width="6"/><path d="M10,20 H130 L115,95 H25 Z" fill="#9fd3f0" stroke="${INK}" stroke-width="6"/></svg>`);
  const av = COMET(cam, 60, 1000, 820);
  const per = PERIODICO(c, 160, 480, 'EL COMET', '¡el primer jet de pasajeros!'); per.querySelector('div:nth-child(2)').textContent = 'Londres · 1952';
  const brillos = [0, 1, 2, 3].map(() => ESTRELLA(cam, 56, GOLD));
  sp(T.ingleses, 'whoosh', 0.7); sp(T.comet + 0.45, 'stamp', 0.9); sp(T.comet + 0.9, 'swoosh_up', 0.9); sp(T.comet + 1.0, 'sparkle', 0.6);
  return t => {
    zoom(cam, t, L(2), 4, 0.06);
    ns.forEach((n, i) => set(n, { x: Math.sin(t * 0.5 + i) * 40 }));
    const kd = p(t, T.comet + 0.9, 1.6, E.inCubic);
    set(av, { x: kd * 700, y: -kd * 520 + (kd > 0 ? 0 : -Math.abs(Math.sin(t * 6)) * 4), r: -kd * 14, s: pop(t, L(2), 0.4) }); cometFace(av, t, { feliz: 1, jaw: kd > 0 ? 0.6 : 0.2, look: [6, -4], ceja: 8 });
    lin.forEach((l, i) => set(l, { x: -((t * 400) % 220) }));
    giraPeriodico(per, t, T.primer - 0.1); set(per, { o: t > T.primer - 0.1 && t < T.comet + 0.85 ? 1 : 0 });
    brillos.forEach((b, i) => { const a = t * 2 + i * 1.57; set(b, { x: 470 + Math.cos(a) * 380, y: 1060 + Math.sin(a) * 160, o: t > T.comet + 0.9 ? 1 : 0 }); });
  };
});
plano(T.ventCuad - 0.25, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const v = VENT(cam, 90, 520, 380, false);
  const igual = texto(cam, 760, '=', { size: 200, x: 460, w: 160, z: 12 });
  const casa = box(cam, 620, 560, 380, 520, { zIndex: 8 }, `<svg viewBox="0 0 380 520" width="380" height="520"><path d="M20,170 L190,20 L360,170 Z" fill="${RED}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><rect x="40" y="170" width="300" height="340" fill="#f2dcb4" stroke="${INK}" stroke-width="7"/><rect x="100" y="230" width="180" height="180" fill="#9fd3f0" stroke="${INK}" stroke-width="7"/><path d="M190,230 V410 M100,320 H280" stroke="${INK}" stroke-width="7"/><path d="M84,420 H296" stroke="${INK}" stroke-width="10"/><path d="M110,236 C150,260 160,300 130,330" stroke="${PINK}" stroke-width="10" fill="none"/></svg>`);
  const cuad = stamp(cam, 270, 1140, 'CUADRADAS', { size: 84, z: 30 });
  sp(T.ventCuad - 0.2, 'pop2', 0.7); sp(T.casa - 0.1, 'pop', 0.7); sp(T.casa + 0.3, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, T.ventCuad, 2, 0.08);
    set(v, { s: pop(t, T.ventCuad - 0.25, 0.4), r: -4 }); ventFace(v, t, { feliz: 1, jaw: 0.3, look: [10, 0], ceja: t > T.casa ? 10 : 0 });
    set(igual, { o: t > T.casa - 0.1 ? 1 : 0, s: pop(t, T.casa - 0.1, 0.3) }); set(casa, { o: t > T.casa - 0.1 ? 1 : 0, s: pop(t, T.casa - 0.1, 0.4), r: 3 });
    stampA(cuad, t, T.casa + 0.3, -6);
  };
});
shakeAt(T.casa + 0.3, 0.3, 10);

/* L3 · la joya del momento: hasta la reina madre se da una vuelta (saluda desde la ventanilla) */
headline(L(3) - 0.1, L(4) - 0.1, 'La *joya* del momento', { size: 92, hlT: T.joya });
plano(L(3) - 0.1, L(4) - 0.1, { background: CIELOC }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 300, 1400, 20, 'rgba(255,255,255,.4)', 'rgba(0,0,0,0)', 1);
  const ns = [[60, 1200, 300], [700, 1300, 260], [300, 450, 200]].map(([x, y, w]) => NUBE(cam, x, y, w));
  const marco = box(cam, 300, 520, 480, 620, { zIndex: 6, background: '#eceff2', border: `10px solid ${INK}`, borderRadius: '200px', boxShadow: `14px 14px 0 ${INK}`, overflow: 'hidden' });
  box(marco, 30, 30, 400, 540, { background: '#ffe9a8', borderRadius: '170px', border: `6px solid ${INK}` });
  const rn = REINA(marco, 60, 120, 340);
  const mano = box(marco, 300, 230, 120, 120, { zIndex: 3 }, `<svg viewBox="-60 -70 120 120" width="120" height="120" style="overflow:visible">${gloveHand(0, 0, -20, 1.1)}</svg>`);
  const tiara = [0, 1, 2, 3, 4].map(() => ESTRELLA(cam, 48, GOLD));
  const vip = stamp(cam, 330, 1180, 'VIP', { size: 110, col: GOLD, z: 30, bg: 'rgba(43,33,24,.85)', blend: 'normal' });
  sp(T.joya, 'sparkle', 0.8); sp(T.reina, 'tada', 0.7); sp(T.vuelta, 'stamp', 0.8);
  return t => {
    set(ry, { r: t * 10 }); zoom(cam, t, L(3), 3, 0.08);
    ns.forEach((n, i) => set(n, { x: -((t * (100 + i * 40)) % 1400) + 700 }));
    set(marco, { s: pop(t, L(3) - 0.1, 0.4), y: Math.sin(t * 3) * 8 });
    set(rn, { o: t > T.reina - 0.2 ? 1 : 0, y: (1 - p(t, T.reina - 0.2, 0.45, E.outBack)) * 300 }); reinaFace(rn, t, { feliz: 1, jaw: t > T.reina && t < T.vuelta + 0.6 ? 0.4 : 0, look: [0, 0], ceja: 6 });
    set(mano, { o: t > T.reina + 0.2 ? 1 : 0, r: Math.sin(t * 9) * 25 });
    tiara.forEach((s, i) => { const a = t * 1.5 + i * 1.26; set(s, { x: 540 + Math.cos(a) * 330 - 24, y: 830 + Math.sin(a) * 390, o: t > T.joya ? 1 : 0, s: 0.7 + 0.3 * Math.sin(t * 8 + i) }); });
    stampA(vip, t, T.vuelta, -8);
  };
});

/* L4 · 1954: dos Comet se desintegran en pocos meses — mapa del Mediterráneo con dos marcas; sin tormenta (sol), sin explicación */
headline(L(4) - 0.1, L(5) - 0.1, '*1954*: sin explicación', Object.assign({ size: 90, hlT: T.m1954 + 0.2 }, BL));
plano(L(4) - 0.1, L(5) - 0.1, { background: '#2b3550' }, c => {
  const cam = CAM(c);
  const mapa = box(cam, 70, 470, 940, 640, { zIndex: 4, background: '#5c87b5', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, borderRadius: '16px' }, `<svg viewBox="0 0 940 640" width="940" height="640"><path d="M0,0 H940 V180 C800,200 700,160 620,230 C580,270 640,360 600,420 C560,470 520,400 470,380 L430,300 C380,240 300,250 240,200 C170,150 80,190 0,160 Z" fill="#d8c3a0" stroke="${INK}" stroke-width="6"/><path d="M0,640 V560 C200,520 400,560 600,540 C760,520 860,560 940,540 V640 Z" fill="#d8c3a0" stroke="${INK}" stroke-width="6"/><text x="520" y="120" font-family="Rye" font-size="44" fill="${INK}">ITALIA</text><ellipse cx="300" cy="330" rx="34" ry="16" fill="#d8c3a0" stroke="${INK}" stroke-width="5"/><text x="210" y="390" font-family="SpecialElite" font-size="32" fill="${INK}">Elba</text><text x="610" y="470" font-family="SpecialElite" font-size="32" fill="${INK}">Nápoles</text></svg>`);
  const xs = [[300, 790], [600, 880]].map(([x, y]) => box(cam, x - 70, y - 70, 140, 140, { zIndex: 10 }, XSVG));
  const cnt = texto(cam, 1130, '', { size: 140, color: RED, x: 640, w: 380, z: 20, shadow: `5px 5px 0 ${INK}` });
  const sol = box(cam, 180, 1130, 200, 200, { zIndex: 12 }, `<svg viewBox="0 0 200 200" width="200" height="200"><g stroke="${INK}" stroke-width="8">${[...Array(8)].map((_, i) => `<path d="M100,100 L${f1(100 + Math.cos(i * 0.785) * 96)},${f1(100 + Math.sin(i * 0.785) * 96)}"/>`).join('')}</g><circle cx="100" cy="100" r="60" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><path d="M60,88 h34 v14 h-34 Z M106,88 h34 v14 h-34 Z M94,94 h12" fill="${INK}" stroke="${INK}" stroke-width="5"/><path d="M76,124 q24,16 48,0" stroke="${INK}" stroke-width="6" fill="none"/></svg>`);
  const qs = [0, 1, 2].map(i => texto(cam, 1140 - i * 20, '?', { size: 120 + i * 30, color: ['#fff', GOLD, PINK][i], x: 640 + i * 110, w: 120, z: 18 }));
  sp(T.m1954, 'whoosh', 0.6); sp(T.desint, 'burst', 0.9); sp(T.desint + 0.6, 'burst', 0.8); sp(T.tormenta, 'pop2', 0.7); sp(T.explic, 'glitch', 0.8);
  return t => {
    zoom(cam, t, L(4), 5, 0.07); set(mapa, { s: pop(t, L(4) - 0.1, 0.4), r: -1 });
    let n = 0; xs.forEach((x, i) => { const t0 = T.desint + i * 0.6; set(x, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3) }); if (t > t0) n++; });
    cnt.textContent = n ? `×${n}` : ''; set(cnt, { o: t < T.tormenta ? 1 : 0 });
    set(sol, { o: t > T.tormenta - 0.1 ? 1 : 0, s: pop(t, T.tormenta - 0.1, 0.35), r: t * 30 });
    qs.forEach((q, i) => set(q, { o: t > T.explic + i * 0.12 ? 1 : 0, y: Math.sin(t * 5 + i) * 12, r: Math.sin(t * 3 + i) * 10 }));
  };
});
shakeAt(T.desint, 0.3, 14); shakeAt(T.desint + 0.6, 0.3, 14);

/* L5 · los ingenieros: idea de película → grúa mete el Comet en una piscina gigante → bomba que lo infla y desinfla miles de veces */
headline(L(5) - 0.1, L(6) - 0.1, 'Un experimento *de película*', { size: 84, hlT: T.pelicula });
plano(L(5) - 0.1, T.piscina - 0.15, { background: '#d9ecef', backgroundImage: 'linear-gradient(rgba(43,33,24,.10) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.10) 3px, transparent 3px)', backgroundSize: '90px 90px' }, c => {
  const cam = CAM(c);
  const ing = [0, 1, 2].map(i => mkBust(cam, [60 + i * 330, 640, 330, 422], { hat: ['slouch', 'brodie', 'cap'][i], moustache: i !== 1, beard: i === 1, seed: 120 + i }));
  const bomb = box(cam, 420, 420, 240, 240, { zIndex: 14 }, `<svg viewBox="0 0 240 240" width="240" height="240"><path d="M120,20 C60,20 30,70 40,110 C50,150 90,160 90,190 H150 C150,160 190,150 200,110 C210,70 180,20 120,20 Z" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><rect x="88" y="190" width="64" height="36" rx="8" fill="#9aa4ad" stroke="${INK}" stroke-width="6"/><path d="M120,0 V-20 M30,40 L10,24 M210,40 L230,24" stroke="${INK}" stroke-width="8"/></svg>`);
  const plan = box(cam, 230, 1080, 620, 200, { zIndex: 13, background: '#2b4a8c', border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.18) 2px, transparent 2px)', backgroundSize: '30px 30px' });
  const mini = COMET(plan, 40, 30, 540); mini.style.filter = 'brightness(0) invert(1)';
  sp(T.ingenieros, 'pop', 0.6); sp(T.pelicula, 'ding', 0.8); sp(T.meten, 'paper', 0.7);
  return t => {
    zoom(cam, t, L(5), 3, 0.06);
    ing.forEach((b, i) => { set(b.d, { s: pop(t, T.ingenieros - 0.1 + i * 0.15, 0.35) }); face(b, t, { look: [i === 1 ? 0 : (i ? -8 : 8), -6], bL: t > T.pelicula ? 14 : 4, bR: t > T.pelicula ? 14 : 4, jaw: t > T.pelicula && t < T.pelicula + 0.6 ? 0.5 : 0, seed: i }); });
    set(bomb, { o: t > T.pelicula - 0.1 ? 1 : 0, s: pop(t, T.pelicula - 0.1, 0.35) * (1 + 0.06 * Math.sin(t * 10)) });
    set(plan, { o: t > T.meten - 0.1 ? 1 : 0, y: (1 - p(t, T.meten - 0.1, 0.4, E.outBack)) * 300, r: -2 });
  };
});
plano(T.piscina - 0.15, L(6) - 0.1, { background: '#c9d3e6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 6px, transparent 6px 120px)' }, c => {
  const cam = CAM(c);
  const grua = box(cam, 0, 380, 1080, 300, { zIndex: 4 }, `<svg viewBox="0 0 1080 300" width="1080" height="300"><path d="M60,300 V20 H1000" stroke="${GOLD}" stroke-width="34" fill="none"/><path d="M60,300 V20 H1000" stroke="${INK}" stroke-width="6" fill="none"/><path d="M60,80 L180,20" stroke="${INK}" stroke-width="10"/></svg>`);
  const cable = box(cam, 538, 400, 6, 300, { zIndex: 5, background: INK });
  const tanque = box(cam, 60, 940, 960, 460, { zIndex: 6, background: 'rgba(92,154,214,.55)', border: `10px solid ${INK}`, borderTop: '0', boxShadow: `14px 14px 0 ${INK}` });
  const olas = OLAS(cam, 930, 'rgba(92,154,214,.85)', 11);
  const av = COMET(cam, 120, 0, 840); av.style.zIndex = 8;
  const burb = [...Array(8)].map((_, i) => box(cam, 0, 0, 30, 30, { zIndex: 12, borderRadius: '50%', border: `4px solid ${INK}`, background: 'rgba(255,255,255,.7)' }));
  const tubo = box(cam, 880, 800, 160, 500, { zIndex: 13 }, `<svg viewBox="0 0 160 500" width="160" height="500"><path d="M80,0 V400" stroke="${INK}" stroke-width="22"/><path d="M80,0 V400" stroke="#9aa4ad" stroke-width="12"/><rect x="20" y="380" width="120" height="110" rx="14" fill="${RED}" stroke="${INK}" stroke-width="7"/><circle cx="80" cy="435" r="26" fill="#fff" stroke="${INK}" stroke-width="5"/><path class="aguja" d="M80,435 L80,415" stroke="${INK}" stroke-width="6"/></svg>`);
  const cnt = texto(cam, 1180, '', { size: 120, color: '#fff', x: 300, w: 520, z: 20, shadow: `5px 5px 0 ${INK}` });
  sp(T.piscina, 'whoosh', 0.8); sp(T.piscina + 0.8, 'gulp', 1); sp(T.inflan, 'swoosh_up', 0.7); [...Array(6)].forEach((_, i) => sp(T.inflan + 0.6 + i * 0.35, 'tick', 0.4)); sp(T.miles + 0.4, 'tada', 0.6);
  return t => {
    zoom(cam, t, T.piscina, 3, 0.06);
    const kb = p(t, T.piscina - 0.1, 0.9, E.inOutCubic); set(av, { y: lerp(560, 1010, kb), r: Math.sin(t * 2) * 1.5 }); cable.style.height = px(170 + kb * 450);
    const inf = t > T.inflan ? Math.sin((t - T.inflan) * 9) : 0; set(av, { sy: 1 + 0.12 * Math.max(0, inf), sx: 1 + 0.03 * Math.max(0, inf) }); cometFace(av, t, { feliz: inf > 0 ? -1 : 0.4, ceja: inf > 0 ? 14 : 4, jaw: inf > 0 ? 0.6 : 0, closed: inf > 0.7 });
    tubo.querySelector('.aguja').setAttribute('transform', `rotate(${f1(inf * 80)} 80 435)`);
    burb.forEach((b, i) => { const k = ((t * 0.8) + i / 8) % 1; set(b, { o: t > T.piscina + 0.6 ? 1 - k : 0, x: 200 + i * 90, y: 1350 - k * 380, s: 0.6 + k * 0.6 }); });
    set(olas, { x: (t * 80) % 80 });
    const n = t < T.inflan ? 0 : Math.round(lerp(1, 3000, Math.pow(p(t, T.inflan, T.miles + 0.6 - T.inflan, E.linear), 2))); cnt.textContent = n ? `×${n.toLocaleString('es-ES')}` : '';
  };
});
shakeAt(T.piscina + 0.8, 0.3, 12);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · simulan cada vuelo (altímetro sube y baja) → un día ¡CRAC! → ¿por dónde? por la ESQUINA de una ventana */
headline(L(7) - 0.1, T.donde - 0.1, 'Vuelo, tras vuelo, *tras vuelo*…', { size: 78, hlT: T.subir });
headline(T.donde - 0.1, L(8) - 0.1, '¿Por *dónde*?', { size: 100, hlT: T.donde + 0.1 });
plano(L(7) - 0.1, T.donde - 0.1, { background: '#c9d3e6' }, c => {
  const cam = CAM(c);
  const alt = box(cam, 90, 470, 400, 400, { zIndex: 6, background: '#1f2a44', border: `10px solid ${INK}`, borderRadius: '50%', boxShadow: `0 0 0 10px #9aa4ad, 12px 12px 0 10px ${INK}` }, `<svg viewBox="0 0 380 380" width="380" height="380">${[...Array(10)].map((_, i) => `<path d="M190,30 V60" stroke="#fff" stroke-width="6" transform="rotate(${i * 36} 190 190)"/>`).join('')}<text x="190" y="270" text-anchor="middle" font-family="Rye" font-size="34" fill="#fff">ALT</text><path class="ag" d="M190,190 L190,60" stroke="${GOLD}" stroke-width="12" stroke-linecap="round"/><circle cx="190" cy="190" r="16" fill="${GOLD}"/></svg>`);
  const panel = box(cam, 540, 470, 460, 760, { zIndex: 6, background: METALC, border: `10px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, backgroundImage: 'radial-gradient(circle, #8a929b 6px, transparent 7px)', backgroundSize: '60px 60px' });
  const grieta = box(panel, 0, 0, 440, 740, { zIndex: 4 }, `<svg viewBox="0 0 440 740" width="440" height="740"><path class="gr" d="M220,0 L200,90 L250,170 L190,260 L240,350 L180,450 L230,560 L200,740" stroke="${INK}" stroke-width="12" fill="none" stroke-linejoin="round" stroke-dasharray="900" stroke-dashoffset="900"/></svg>`);
  const crac = texto(cam, 1240, '¡CRAC!', { size: 150, color: RED, z: 25, shadow: `6px 6px 0 ${INK}` });
  sp(T.simulan, 'whoosh', 0.6); [0, 1, 2, 3].forEach(i => sp(T.subir + i * 0.4, i % 2 ? 'swoosh_up' : 'whoosh', 0.4)); sp(T.undia, 'drumroll', 0.6); sp(T.crac, 'glitch', 1); sp(T.crac + 0.05, 'burst', 1);
  return t => {
    zoom(cam, t, L(7), 4, 0.06);
    alt.querySelector('.ag').setAttribute('transform', `rotate(${f1(Math.sin(t * 5) * 150)} 190 190)`);
    const kg = p(t, T.crac, 0.5, E.outCubic); grieta.querySelector('.gr').setAttribute('stroke-dashoffset', f1(900 * (1 - kg)));
    set(panel, { x: t > T.crac && t < T.crac + 0.5 ? Math.sin(t * 60) * 8 : 0 });
    set(crac, { o: t > T.crac ? 1 : 0, s: pop(t, T.crac, 0.3), r: -6 });
  };
});
plano(T.donde - 0.1, L(8) - 0.1, PAPEL, c => {
  const cam = CAM(c); cam.style.transformOrigin = '300px 700px';
  const v = VENT(cam, 260, 520, 460, false);
  const ring = box(cam, 230, 500, 160, 160, { zIndex: 14, borderRadius: '50%', border: `12px solid ${RED}` });
  const lupa = box(cam, 0, 0, 260, 330, { zIndex: 15 }, `<svg viewBox="0 0 300 380" width="260" height="330"><path d="M200,230 L280,360" stroke="#8a5a32" stroke-width="34" stroke-linecap="round"/><circle cx="130" cy="140" r="115" fill="rgba(200,235,250,.45)" stroke="${INK}" stroke-width="14"/></svg>`);
  sp(T.donde, 'boing', 0.6); sp(T.esquina7, 'stamp', 0.9);
  return t => {
    const kz = p(t, T.esquina7, 0.5, E.inOutCubic); set(cam, { s: 1 + 0.5 * kz });
    set(v, { s: pop(t, T.donde - 0.1, 0.35), x: t > T.esquina7 ? Math.sin(t * 40) * 2 : 0 }); ventFace(v, t, { feliz: t > T.esquina7 ? -1 : 0.3, ceja: t > T.esquina7 ? 14 : 6, look: [-8, -8], jaw: t > T.esquina7 ? 0.5 : 0 }); v.gr.setAttribute('opacity', t > T.esquina7 ? 1 : 0);
    set(ring, { o: t > T.esquina7 ? 1 : 0, s: 1 + 0.1 * Math.sin(t * 9) });
    set(lupa, { x: lerp(700, 250, p(t, T.donde, 0.8, E.inOutCubic)), y: lerp(1100, 470, p(t, T.donde, 0.8, E.inOutCubic)), o: t < T.esquina7 ? 1 : 0 });
  };
});
shakeAt(T.crac, 0.4, 18); shakeAt(T.esquina7, 0.3, 12);

/* L8 · en una esquina la fuerza se concentra en UN punto (flechas que convergen, punto rojo al rojo vivo); el metal se cansa (bosteza, suda)… y se rompe */
headline(L(8) - 0.1, L(9) - 0.1, 'Esquina = *peligro*', { size: 96, hlT: T.punto });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.08) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.08) 3px, transparent 3px)', backgroundSize: '90px 90px' }, c => {
  const cam = CAM(c);
  const v = VENT(cam, 300, 560, 480, false);
  const fl = [0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 - 0.9 + i * 0.45, x0 = 320 + Math.cos(a) * 420, y0 = 590 + Math.sin(a) * 420; return box(cam, 0, 0, 1080, 1920, { zIndex: 13 }, `<svg width="1080" height="1920" style="overflow:visible"><path class="fp" d="M${f1(x0 + 1.4 * Math.cos(a + Math.PI) * -60)},${f1(y0)} L330,600" stroke="${RED}" stroke-width="16" stroke-linecap="round" stroke-dasharray="20 18"/></svg>`); });
  const punto = box(cam, 290, 560, 80, 80, { zIndex: 14, borderRadius: '50%', background: RED, border: `6px solid ${INK}`, boxShadow: '0 0 40px 10px rgba(255,80,40,.7)' });
  const zz = texto(cam, 1140, 'uaaah…', { size: 90, italic: true, color: '#6b4a2a', x: 560, w: 460 });
  const sd = sudor(cam, 760, 640);
  const rot = stamp(cam, 330, 1250, '¡SE ROMPE!', { size: 88, z: 30 });
  sp(T.fuerza8, 'whoosh', 0.7); sp(T.punto, 'ding', 0.8); sp(T.cansa, 'sad', 0.7); sp(T.rompe, 'glitch', 0.9); sp(T.rompe + 0.1, 'stamp', 1);
  return t => {
    zoom(cam, t, L(8), 4, 0.07);
    fl.forEach((f, i) => { set(f, { o: t > T.fuerza8 + i * 0.08 ? 1 : 0 }); f.querySelector('.fp').setAttribute('stroke-dashoffset', f1(-t * 120)); });
    set(punto, { o: t > T.punto ? 1 : 0, s: 1 + 0.25 * Math.abs(Math.sin(t * 8)) });
    ventFace(v, t, { closed: t > T.cansa && t < T.rompe, jaw: t > T.cansa && t < T.rompe ? 0.9 : t > T.rompe ? 0.6 : 0.2, feliz: t > T.rompe ? -1 : 0, ceja: t > T.rompe ? 14 : 0 }); v.gr.setAttribute('opacity', t > T.rompe ? 1 : 0); set(v, { x: t > T.rompe && t < T.rompe + 0.5 ? Math.sin(t * 50) * 6 : 0 });
    set(zz, { o: t > T.cansa && t < T.rompe ? 1 : 0, r: -4 }); set(sd, { o: t > T.cansa ? 1 : 0, y: (t * 140) % 120 });
    stampA(rot, t, T.rompe + 0.1, -6);
  };
});
shakeAt(T.rompe + 0.1, 0.35, 16);

/* L9 · en una curva la fuerza se reparte por todo el borde (flechas que fluyen alrededor) → desde entonces, todas REDONDEADAS */
headline(L(9) - 0.1, L(10) - 0.1, 'Curva = *se reparte*', { size: 96, hlT: T.reparte });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#d9ecef', backgroundImage: 'linear-gradient(rgba(43,33,24,.08) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.08) 3px, transparent 3px)', backgroundSize: '90px 90px' }, c => {
  const cam = CAM(c);
  const v = VENT(cam, 300, 520, 480, true);
  const flujo = box(cam, 280, 500, 520, 680, { zIndex: 13 }, `<svg viewBox="0 0 520 680" width="520" height="680" style="overflow:visible"><rect class="fx" x="10" y="10" width="500" height="660" rx="245" fill="none" stroke="#2e9e5a" stroke-width="14" stroke-dasharray="40 30"/></svg>`);
  const ok = box(cam, 760, 470, 220, 220, { zIndex: 14 }, CHECK);
  const fila = [0, 1, 2, 3, 4].map(i => VENT(cam, 70 + i * 190, 1150, 150, true));
  const red = stamp(cam, 230, 1340 - 80, 'REDONDEADAS', { size: 80, col: '#2e7a4a', z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.curva, 'swoosh_up', 0.7); sp(T.reparte, 'sparkle', 0.8); sp(T.borde, 'ding', 0.7); fila.forEach((_, i) => sp(T.desde + 0.2 + i * 0.15, 'pop', 0.4)); sp(T.redondeadas, 'stamp', 1);
  return t => {
    zoom(cam, t, L(9), 4, 0.06);
    set(v, { s: pop(t, L(9) - 0.1, 0.4), y: -Math.abs(Math.sin(t * 4)) * 14 }); ventFace(v, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.6, ceja: 6, look: [6, -2] });
    set(flujo, { o: t > T.reparte - 0.1 ? 1 : 0 }); flujo.querySelector('.fx').setAttribute('stroke-dashoffset', f1(-t * 200));
    stampA(ok, t, T.borde, -8);
    fila.forEach((f, i) => { const t0 = T.desde + 0.2 + i * 0.15; set(f, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3), y: -Math.abs(Math.sin(t * 6 + i)) * 12 }); ventFace(f, t, { feliz: 1, seed: i, look: [0, -4] }); });
    stampA(red, t, T.redondeadas, -6);
  };
});
shakeAt(T.redondeadas, 0.3, 12);

/* L10 · el agujerito de abajo no es un fallo: iguala la presión entre los dos cristales (corte con dos cristales y aire que pasa) */
headline(L(10) - 0.1, L(11) - 0.1, 'Y el *agujerito*…', { size: 100, hlT: T.agujero + 0.2 });
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const cam = CAM(c); cam.style.transformOrigin = '540px 1100px';
  const v = VENT(cam, 330, 480, 420, true); v.querySelector('.agu').setAttribute('opacity', 1);
  const ring = box(cam, 470, 1000, 140, 140, { zIndex: 14, borderRadius: '50%', border: `12px solid ${PINK}` });
  const corte = box(cam, 120, 1110, 840, 160, { zIndex: 16 }, `<svg viewBox="0 0 840 160" width="840" height="160"><rect x="20" y="20" width="800" height="36" rx="10" fill="#bfe3f7" stroke="${INK}" stroke-width="6"/><rect x="20" y="104" width="800" height="36" rx="10" fill="#bfe3f7" stroke="${INK}" stroke-width="6"/><circle cx="420" cy="38" r="12" fill="${INK}"/><text x="40" y="48" font-family="Bricolage" font-weight="800" font-size="24" fill="${INK}">DENTRO</text><text x="40" y="132" font-family="Bricolage" font-weight="800" font-size="24" fill="${INK}">FUERA (aguanta)</text><g class="aire">${[0, 1, 2].map(i => `<circle cx="${400 + i * 20}" cy="80" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/>`).join('')}</g></svg>`);
  const nof = stamp(cam, 330, 1300, '¡NO ES UN FALLO!', { size: 50, col: '#2e7a4a', z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.agujero, 'pop', 0.7); sp(T.fallo, 'stamp', 0.9); sp(T.iguala, 'whoosh', 0.7); sp(T.cristales, 'ding', 0.7);
  return t => {
    const kz = p(t, T.agujero, 0.5, E.inOutCubic) * (1 - p(t, T.iguala, 0.4, E.inOutCubic)); set(cam, { s: 1 + 0.3 * kz });
    set(v, { s: pop(t, L(10) - 0.1, 0.4) }); ventFace(v, t, { feliz: 1, look: [0, 8], ceja: t > T.fallo ? 10 : 0, jaw: 0.2 });
    set(ring, { o: t > T.agujero + 0.2 ? 1 : 0, s: 1 + 0.12 * Math.sin(t * 9) });
    stampA(nof, t, T.fallo, -6);
    set(corte, { o: t > T.iguala - 0.1 ? 1 : 0, y: (1 - p(t, T.iguala - 0.1, 0.4, E.outBack)) * 300 }); corte.querySelector('.aire').setAttribute('transform', `translate(0 ${f1(Math.sin(t * 6) * 18)})`);
  };
});

/* L11 · OJO: en esos accidentes también influyeron otros fallos */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const av = COMET(c, 140, 600, 800, { redondas: false });
  const qs = [0, 1, 2].map(i => texto(c, 520 - i * 30, '?', { size: 110 + i * 20, color: [RED, PINK, INK][i], x: 700 + i * 90, w: 120 }));
  aparece(chip(c, 360, 940, 'y otros fallos', { size: 60, bg: YEL, color: INK }), T.otros);
  return t => { set(av, { r: Math.sin(t * 2) * 3, y: Math.sin(t * 3) * 10 }); cometFace(av, t, { feliz: 0, ceja: 10, look: [-6, -4] }); qs.forEach((q, i) => set(q, { o: t > T.otros + i * 0.15 ? 1 : 0, y: Math.sin(t * 4 + i) * 10 })); };
});

/* L12 · O sea: la ventanita que miras en cada vuelo… una lección que costó dos accidentes */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Esa ventanita redonda…', { size: 80 });
  const b = texto(c, 400, '…costó dos accidentes', { size: 80, italic: true, color: RED });
  const v = VENT(c, 330, 600, 420, true);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.leccion - 0.2 ? 1 : 0, s: pop(t, T.leccion - 0.2, 0.35) }); set(v, { r: Math.sin(t * 3) * 4 }); ventFace(v, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.6, look: [0, -4] }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.accidentes, 'stamp', 0.8);

/* L13 · pregunta final (confesión pícara) */
preguntaFinal('Confiesa: ¿lo más raro', 'que has hecho en un avión?', { size: 70, draw: c => [['aplaudir al aterrizar', YEL], ['dormirme en un desconocido', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 40, 620 + i * 160, s, { size: 54, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(77, 'Las ventanas del avión', ['VENTANAS', 'redondas']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.vuelta, T.vuelta + 1.0], [T.cansa, T.cansa + 0.8]], sorpresa: [[T.partian, T.partian + 0.8], [T.explic, T.explic + 0.8], [T.esquina7, T.esquina7 + 0.8]], golpes: [T.partian, T.casa + 0.3, T.desint, T.piscina + 0.8, T.crac, T.rompe + 0.1, T.redondeadas] },
});
