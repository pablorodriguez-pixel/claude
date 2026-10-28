/* Ep. 119 · «El bolsillo enano de tus vaqueros no es para monedas» (versión nueva del ep47, ≤ 60 s). Jacob Davis, sastre, refuerza con remaches de cobre los
   pantalones de los mineros; para patentarlo (1873) se asocia con Levi Strauss, su proveedor de tela. El bolsillo pequeño era para el reloj de bolsillo.
   El remache de la entrepierna desapareció (leyenda: el jefe de Levi's se quemó junto a una hoguera).
   ESTRATEGIA §8-12: imagen-idea en el fotograma 0 (unas monedas rebotan en el bolsillo enano), todo en movimiento, zonas seguras. */
Story.prepara();
const T = {
  enano: Q('el bolsillo enano'), monedas: Q('para monedas'), cientocin: Q('ciento cincuenta años'), otra: Q('otra cosa'),
  oeste: Q('oeste americano'), mineros: Q('los mineros'), rompen: Q('se les rompen'), bolsillos: Q('por los bolsillos'),
  sastre: Q('un sastre'), davis: Q('jacob davis'), remaches: Q('remaches de cobre'), patentar: Q('para patentarlo'), levi: Q('levi strauss'),
  anio: Q('mil ochocientos setenta y tres'), nacen: Q('nacen los vaqueros'), llevaba: Q('qué llevaba'), reloj: Q('un reloj de bolsillo'),
  casa: Q('era su casa'), tamano: Q('ese tamaño'),
  mira: Q('mira los tuyos'), esquinas: Q('las esquinas'), siguen: Q('siguen los remaches'),
  desaparecio: Q('desapareció'), entrepierna: Q('la entrepierna'), leyenda: Q('cuenta la leyenda'), hoguera: Q('una hoguera'),
  osea: Q('o sea'), nadie: Q('ya no lleva nadie'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const DENIM = '#2f5a9a', COBRE = '#d98a3a', ROSA_R = 'repeating-conic-gradient(from 0deg at 540px 1000px, #f4c6cf 0 7deg, #efe1c6 7deg 14deg)';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const fondoR = cam => box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: ROSA_R });
/* los vaqueros de frente (600×800); el bolsillo del reloj está en (420..520, 110..200); remaches .rv y el de la entrepierna .cr */
const VAQ = (c, x, y, w, z = 5) => box(c, x, y, w, w * 1.333, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 600 800" width="${w}" height="${f1(w * 1.333)}" style="overflow:visible">
  <path d="M40,40 L560,40 L580,800 L330,800 L300,330 L270,800 L20,800Z" fill="${DENIM}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><rect x="40" y="40" width="520" height="60" fill="#25487e" stroke="${INK}" stroke-width="8"/>
  <rect x="285" y="50" width="30" height="40" rx="5" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M300,100 L300,320" stroke="#e9b04a" stroke-width="5" stroke-dasharray="12 8"/>
  <path d="M60,110 Q170,120 200,230" fill="none" stroke="#e9b04a" stroke-width="5" stroke-dasharray="12 8"/><path d="M540,110 Q430,120 400,230" fill="none" stroke="#e9b04a" stroke-width="5" stroke-dasharray="12 8"/>
  <path class="wp" d="M420,112 L520,112 L515,200 L425,200Z" fill="#3a68ad" stroke="${INK}" stroke-width="6"/><path d="M425,124 L515,124" stroke="#e9b04a" stroke-width="4" stroke-dasharray="8 6"/>
  ${[[422, 114], [518, 114], [200, 230], [400, 230]].map(([a, b]) => `<circle class="rv" cx="${a}" cy="${b}" r="11" fill="${COBRE}" stroke="${INK}" stroke-width="4"/>`).join('')}<circle class="cr" cx="300" cy="330" r="13" fill="${COBRE}" stroke="${INK}" stroke-width="4"/></svg>`);
const MONEDA = (c, w = 90, z = 8) => box(c, 0, 0, w, w, { zIndex: z, borderRadius: '50%', background: '#e9c75c', border: `6px solid ${INK}`, boxSizing: 'border-box', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(w * 0.45), textAlign: 'center', lineHeight: px(w * 0.8), color: '#8a6a2a' }, '€');
const RELOJ = (c, w = 120, z = 8) => box(c, 0, 0, w, w * 1.3, { zIndex: z, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 100 130" width="${w}" height="${f1(w * 1.3)}"><rect x="44" y="0" width="12" height="16" rx="3" fill="${GOLD}" stroke="${INK}" stroke-width="3"/><circle cx="50" cy="70" r="46" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="70" r="36" fill="#fbf6ea" stroke="${INK}" stroke-width="3"/><path class="ag" d="M50,70 L50,44 M50,70 L66,78" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></svg>`);

/* PORTADA + L0-L1: los vaqueros grandes; un círculo rosa late sobre el bolsillo enano; las monedas intentan entrar y rebotan; «NO ES PARA MONEDAS» */
plano(-1, L(2) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const v = VAQ(cam, 210, 560, 660, 5);
  const aro = box(cam, 0, 0, 200, 200, { zIndex: 7, borderRadius: '50%', border: `14px solid #e8507a`, boxSizing: 'border-box' });
  const mon = [0, 1, 2].map(i => MONEDA(cam, 80, 8));
  const t1 = texto(c, 285, 'Este bolsillo', { size: 96, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const t2 = texto(c, 390, `NO es para ${hlSpan('monedas', 'phl', YEL)}`, { size: 96, italic: true, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const ans = chip(c, 220, 1475, '150 años esperando OTRA cosa', { size: 54, bg: INK, color: YEL, z: 40 });
  sfx('pop', 0.3, 0.4); sp(T.monedas, 'error', 0.5); sp(T.otra, 'ding', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 860, 1.05], [600, 740, 1.4]);
    // bolsillo del reloj en la cámara: (210 + 470*1.1, 560 + 156*1.1) ≈ (727, 731)
    const px0 = 210 + 470 * 1.1, py0 = 560 + 156 * 1.1;
    set(aro, { x: px0 - 100, y: py0 - 100, s: 1 + 0.08 * Math.sin(t * 6) });
    mon.forEach((m, i) => { const k = ((t * 0.9) + i * 0.33) % 1; const up = k < 0.5 ? k * 2 : (1 - k) * 2; set(m, { x: px0 - 40 + (i - 1) * 70 + (k > 0.5 ? (i - 1) * 120 * (k - 0.5) : 0), y: py0 - 360 + up * 300, r: k * 360 * (i % 2 ? 1 : -1), o: 1 }); });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 1 + wobble(t, 0.45, 0.7, 1) });
    set(ans, { o: t > T.cientocin - 0.1 ? 1 : 0, s: pop(t, T.cientocin - 0.1, 0.3), r: -3 });
  };
}, { sfx: false });

/* L2 (corte): el Oeste: un minero con el pico; el pantalón se raja justo por el bolsillo (desgarro) */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#f2c27a' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#f7b267, #f2d6a0)' });
  const mesas = box(cam, -400, 600, 1900, 700, { zIndex: 1 }, `<svg viewBox="0 0 1900 700" width="1900" height="700"><path d="M0,700 L0,300 L260,300 L300,180 L560,180 L600,300 L900,300 L900,700Z M1100,700 L1100,240 L1300,240 L1340,120 L1600,120 L1640,240 L1900,240 L1900,700Z" fill="#c8693a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`);
  box(cam, -800, 1250, 2680, 1400, { zIndex: 2, background: '#e9b97a', borderTop: `10px solid ${INK}` });
  const min = PERS(cam, 280, 700, 520, { ropa: '#8a5a32', gorro: 'gorra', gcol: '#6b4a2a', pelo: 'corto', pcol: '#3a2a1e', barba: true, z: 4, piernas: true, calzas: DENIM });
  const rajo = box(cam, 600, 1180, 140, 120, { zIndex: 6, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 140 120" width="140" height="120"><path d="M10,60 L40,20 L60,70 L85,15 L105,75 L130,30" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><path d="M10,60 L40,20 L60,70 L85,15 L105,75 L130,30" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></svg>`);
  const oeste = chip(c, 300, 285, 'Oeste americano', { size: 66, bg: '#8a5a32', z: 40 });
  const ras = chip(c, 260, 1475, '¡RAAAS!', { size: 80, bg: RED, z: 40 });
  sp(T.oeste, 'whoosh', 0.4); sp(T.rompen, 'tela', 0.7); sp(T.bolsillos, 'error', 0.4);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 960, 0.85], [600, 1150, 1.2]);
    pFace(min, t, { feliz: t > T.rompen ? -0.8 : 0.4, ceja: t > T.rompen ? 18 : 4, jaw: t > T.rompen ? 0.6 : 0, look: [10, 14], seed: 101 }); set(min, { y: wobble(t, 0.6, 4) });
    set(rajo, { o: t > T.rompen ? 1 : 0, s: pop(t, T.rompen, 0.3), r: Math.sin(t * 6) * 4 });
    popA(oeste, t, T.oeste - 0.1, { r: -3 }); set(ras, { o: t > T.rompen && t < T.bolsillos + 0.8 ? 1 : 0, s: pop(t, T.rompen, 0.3), r: -6 });
  };
});

/* L3 (corte): primerísimo plano del bolsillo: el martillo clava remaches de cobre en las esquinas; luego la patente con dos firmas: Davis y Strauss */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const v = VAQ(cam, -300, 200, 1500, 3);
  const mart = box(cam, 0, 0, 260, 120, { zIndex: 6, transformOrigin: '90% 50%' }, `<svg viewBox="0 0 260 120" width="260" height="120"><rect x="0" y="50" width="200" height="22" rx="8" fill="#8a5a32" stroke="${INK}" stroke-width="6"/><rect x="190" y="10" width="60" height="100" rx="10" fill="#9a948a" stroke="${INK}" stroke-width="6"/></svg>`);
  const dav = chip(c, 300, 285, 'Jacob Davis, sastre', { size: 62, bg: INK, color: '#fff', z: 40 });
  const pat = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: ROSA_R });
  const doc = box(pat, 150, 420, 780, 900, { background: '#f4e4c0', border: `10px solid ${INK}`, borderRadius: '14px', boxShadow: `14px 14px 0 ${INK}`, padding: '44px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, textAlign: 'center', transformOrigin: '50% 50%' },
    `<div style="font-family:Bricolage;font-weight:800;font-size:56px">PATENTE</div><div style="font-size:44px;margin-top:10px">pantalones con remaches</div><div style="font-size:110px;font-weight:900;margin-top:30px">1873</div>
     <div style="display:flex;justify-content:space-around;margin-top:80px;font-style:italic;font-size:48px"><span class="f1" style="opacity:0">J. Davis</span><span class="f2" style="opacity:0">Levi Strauss</span></div>`);
  const levi = chip(pat, 260, 1475, 'su proveedor de tela', { size: 56, bg: '#c8102e', z: 3 });
  sp(T.remaches, 'click', 0.6); sp(T.remaches + 0.4, 'click', 0.6); sp(T.remaches + 0.8, 'click', 0.6); sp(T.patentar, 'paper', 0.5); sp(T.levi, 'stamp', 0.7);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [800, 560, 0.95], [850, 540, 1.1]);
    // bolsillo en cámara: (-300 + 420*2.5, 200 + 112*2.5) = (750, 480)
    const golpe = t > T.remaches - 0.2 && t < T.patentar - 0.4; const ang = golpe ? -40 + 40 * Math.abs(Math.sin((t - T.remaches) * 7.8)) : -30;
    const tgt = [[750, 480], [1000, 480], [750, 480]][Math.min(2, Math.max(0, Math.floor((t - T.remaches + 0.2) / 0.4)))];
    set(mart, { o: golpe ? 1 : 0, x: tgt[0] - 240, y: tgt[1] - 60, r: ang });
    v.querySelectorAll('.rv').forEach((r, i) => { if (i < 2) r.setAttribute('r', t > T.remaches + i * 0.4 ? f1(11 + 2 * Math.sin(t * 8)) : '0'); });
    popA(dav, t, T.davis - 0.1, { r: -3 });
    const kp = p(t, T.patentar - 0.4, 0.4, E.outCubic); set(pat, { o: t > T.patentar - 0.4 ? 1 : 0, x: (1 - kp) * 1080 });
    set(doc, { r: -2 + Math.sin(t * 1.6) * 2.5, s: 1 + 0.08 * clamp((t - T.patentar) / 3), y: Math.sin(t * 2) * 10 });
    const f1e = doc.querySelector('.f1'), f2e = doc.querySelector('.f2'); if (f1e) f1e.style.opacity = t > T.patentar + 0.4 ? 1 : 0; if (f2e) f2e.style.opacity = t > T.levi ? 1 : 0;
    set(levi, { o: t > T.levi - 0.3 ? 1 : 0, s: pop(t, T.levi - 0.3, 0.3), r: -3 });
  };
});

/* L4-L5 (corte): 1873: un caballero con chaleco saca su reloj de cadena, que se balancea… y cae justo dentro del bolsillo enano: encaja al milímetro */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const v = VAQ(cam, 210, 620, 660, 4);
  const rel = RELOJ(cam, 120, 8);
  const cad = box(cam, 0, 0, 10, 10, { zIndex: 7, transformOrigin: '0 50%', background: `repeating-linear-gradient(90deg, ${GOLD} 0 14px, ${INK} 14px 18px)` });
  const ano = chip(c, 380, 285, '1873', { size: 80, bg: INK, color: YEL, z: 40 });
  const q = texto(c, 285, '¿qué llevaba un hombre?', { size: 76, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const casa = texto(c, 285, 'su casa', { size: 120, color: INK, z: 40, shadow: '5px 5px 0 #fff' });
  const medida = chip(c, 300, 1475, 'justo su tamaño', { size: 62, bg: '#2e9e6b', z: 40 });
  sp(T.reloj, 'tick', 0.6); sp(T.casa - 0.2, 'pop', 0.6); sp(T.tamano, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 900, 0.95], [700, 780, 1.45]);
    const px0 = 210 + 470 * 1.1, py0 = 620 + 156 * 1.1;
    // el reloj cuelga y se balancea; al «era su casa» baja y entra en el bolsillo
    const ent = p(t, T.casa - 0.5, 0.8, E.inOutCubic); const sw = Math.sin(t * 2.6) * 30 * (1 - ent);
    const ax = px0 + 80, ay = py0 - 420; const rx = lerp(ax + Math.sin(sw * Math.PI / 180) * 300, px0 - 60, ent), ry = lerp(ay + 240, py0 - 70, ent);
    set(rel, { o: t > T.reloj - 0.4 ? 1 : 0, x: rx, y: ry, r: sw * (1 - ent), s: lerp(1, 0.75, ent) });
    const dl = Math.hypot(rx + 60 - ax, ry - ay); cad.style.width = f1(dl) + 'px'; set(cad, { o: t > T.reloj - 0.4 ? 1 : 0, x: ax, y: ay, r: Math.atan2(ry - ay, rx + 60 - ax) * 180 / Math.PI });
    const ag = rel.querySelector('.ag'); if (ag) ag.setAttribute('transform', `rotate(${f1((t * 60) % 360)} 50 70)`);
    set(ano, { o: t > T.anio - 0.1 && t < T.llevaba - 0.2 ? 1 : 0, s: pop(t, T.anio - 0.1, 0.3), r: -3 });
    set(q, { o: t > T.llevaba - 0.2 && t < T.casa - 0.3 ? 1 : 0, s: pop(t, T.llevaba - 0.2, 0.3), r: -2 });
    set(casa, { o: t > T.casa - 0.3 ? 1 : 0, s: pop(t, T.casa - 0.3, 0.35), r: -3 + wobble(t, 0.5, 0.6) });
    set(medida, { o: t > T.tamano - 0.2 ? 1 : 0, s: pop(t, T.tamano - 0.2, 0.3), r: -3 });
  };
});

/* L6-L7 (corte): «mira los tuyos»: los remaches de las esquinas brillan; luego baja al de la entrepierna; hoguera; el remache se pone al rojo, «¡AY!», y salta */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const v = VAQ(cam, 210, 560, 660, 4);
  const brillos = [[422, 114], [518, 114]].map(([a, b]) => box(cam, 210 + a * 1.1 - 40, 560 + b * 1.1 - 40, 80, 80, { zIndex: 6, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,120,.95), rgba(255,210,120,0) 70%)' }));
  const crB = box(cam, 210 + 300 * 1.1 - 60, 560 + 330 * 1.1 - 60, 120, 120, { zIndex: 6, borderRadius: '50%', border: `10px solid ${RED}`, boxSizing: 'border-box' });
  const fuego = box(cam, 340, 1180, 400, 360, { zIndex: 7 }, `<svg viewBox="0 0 400 360" width="400" height="360"><path class="ll" d="M200,20 Q290,140 250,220 Q320,180 300,280 Q260,340 200,340 Q140,340 100,280 Q80,180 150,220 Q110,140 200,20Z" fill="#ff8a2a" stroke="${INK}" stroke-width="8"/><path d="M200,140 Q250,220 220,300 Q200,320 180,300 Q150,220 200,140Z" fill="#ffd24a"/><rect x="60" y="320" width="280" height="30" rx="12" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/></svg>`);
  const ay = texto(c, 285, '¡AY!', { size: 170, color: RED, z: 40, shadow: '6px 6px 0 #fff' });
  const ley = chip(c, 330, 1475, 'cuenta la leyenda…', { size: 60, bg: INK, color: YEL, z: 40 });
  const salta = box(cam, 210 + 300 * 1.1 - 14, 560 + 330 * 1.1 - 14, 28, 28, { zIndex: 8, borderRadius: '50%', background: COBRE, border: `4px solid ${INK}` });
  sp(T.esquinas, 'sparkle', 0.6); sp(T.entrepierna, 'pop', 0.5); sp(T.hoguera, 'burst', 0.5); sp(T.hoguera + 0.6, 'boing', 0.6);
  return t => {
    const baja = t > T.desaparecio - 0.3;
    deriva(cam, t, L(6) - 0.1, L(8) - 0.1, [740, 720, 1.4], [540, 1000, 1.0]);
    brillos.forEach((b, i) => set(b, { o: t > T.esquinas - 0.1 && !baja ? 0.6 + 0.4 * Math.sin(t * 8 + i) : 0, s: 1 + 0.2 * Math.sin(t * 6 + i) }));
    set(crB, { o: t > T.entrepierna - 0.1 ? 1 : 0, s: 1 + 0.08 * Math.sin(t * 8) });
    const kf = p(t, T.hoguera - 0.4, 0.4); set(fuego, { o: t > T.hoguera - 0.4 ? 1 : 0, s: kf, y: Math.sin(t * 10) * 4 });
    const cr = v.querySelector('.cr'); if (cr) { const rojo = t > T.hoguera; cr.setAttribute('fill', rojo ? '#ff3a1a' : COBRE); cr.setAttribute('r', t > T.hoguera + 0.6 ? '0' : '13'); }
    const ks = clamp((t - T.hoguera - 0.6) / 0.9); set(salta, { o: ks > 0 && ks < 1 ? 1 : 0, x: ks * 300, y: -ks * 500 + ks * ks * 400, r: ks * 720 });
    set(ay, { o: t > T.hoguera + 0.5 ? 1 : 0, s: pop(t, T.hoguera + 0.5, 0.3), r: -6 + Math.sin(t * 20) * 2 });
    set(ley, { o: t > T.leyenda - 0.1 ? 1 : 0, s: pop(t, T.leyenda - 0.1, 0.3), r: -3 });
  };
});

/* L8 (corte): hoy: un móvil intenta entrar en el bolsillo enano y no cabe; el reloj, en gris, como un fantasma; «ya no lo lleva nadie» */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const v = VAQ(cam, 210, 560, 660, 4);
  const movil = box(cam, 0, 0, 150, 280, { zIndex: 7, background: '#1d1a22', border: `8px solid ${INK}`, borderRadius: '26px', transformOrigin: '50% 100%' }, `<div style="margin:14px;height:228px;border-radius:14px;background:#3d6fb0"></div>`);
  const fant = RELOJ(cam, 110, 6); fant.style.filter = 'grayscale(1)';
  const nad = texto(c, 285, 'ya no lo lleva NADIE', { size: 84, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  sp(T.osea, 'boing', 0.5); sp(T.nadie, 'sad', 0.5);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [700, 800, 1.3], [620, 860, 1.15]);
    const px0 = 210 + 470 * 1.1, py0 = 560 + 156 * 1.1;
    const k = (t * 1.4) % 1; set(movil, { x: px0 - 75, y: py0 - 300 + Math.abs(Math.sin(k * Math.PI)) * 60, r: Math.sin(t * 5) * 8 });
    set(fant, { o: 0.35 + 0.15 * Math.sin(t * 3), x: px0 + 120, y: py0 - 260 + Math.sin(t * 2) * 10 });
    set(nad, { o: t > T.nadie - 0.3 ? 1 : 0, s: pop(t, T.nadie - 0.3, 0.3), r: -2 + wobble(t, 0.5, 0.6) });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Y tú qué guardas', 'en ese bolsillo?', { size: 88, draw: c => [['monedas, obvio', YEL], ['el mechero', PINK], ['¡nada, no cabe nada!', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 240 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(119, 'El bolsillo enano', ['OBJETOS', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.nadie + 0.3, L(9) - 0.15]],
  vecino: { risa: [[T.hoguera + 0.5, T.hoguera + 1.6]], sorpresa: [[T.casa, T.casa + 1]], golpes: [] },
});
