/* Ep. 111 · «El muerto que engañó a Hitler» (Operación Mincemeat). 30-IV-1943: un pescador de Punta Umbría encuentra el cadáver del «comandante William Martin»
   con un maletín encadenado; los espías alemanes copian las cartas (invasión de Grecia y Cerdeña). Era Glyndwr Michael, un vagabundo galés muerto en Londres,
   soltado desde el submarino HMS Seraph. Los aliados desembarcan en Sicilia (julio). Tumba en el cementerio de la Soledad (Huelva); desde 1998 con su nombre.
   Cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  muerto0: Q('estando muerto'), huelva0: Q('en huelva'),
  treinta: Q('treinta de abril'), pescador: Q('un pescador'), flotando: Q('flotando'),
  oficial: Q('oficial británico'), muerto2: Q('muerto'), maletin: Q('un maletín'), cadena: Q('una cadena'),
  espana: Q('españa no'), espias: Q('espías alemanes'), manos: Q('sus manos'),
  abren: Q('abren las cartas'), copian: Q('las copian'), berlin: Q('a berlín'), plan: Q('el plan'), grecia: Q('atacar grecia'),
  bolsillos: Q('los bolsillos'), foto: Q('la foto'), cartas: Q('cartas de amor'), entradas: Q('entradas de teatro'), banco: Q('carta del banco'),
  nada: Q('nada era verdad'), martin: Q('william martin'), noexistia: Q('no existía'),
  vagabundo: Q('un vagabundo'), glyn: Q('glyndwr'), londres: Q('en londres'), envenenado: Q('envenenado'), inventaron: Q('le inventaron'), soltaron: Q('lo soltaron'), submarino: Q('un submarino'),
  cree: Q('se lo cree'), tropasG: Q('a grecia'), cerdena: Q('cerdeña'), julio: Q('en julio'), sicilia: Q('en sicilia'),
  churchill: Q('a churchill'), tragado: Q('se lo han tragado'),
  tumba: Q('su tumba'), cementerio: Q('el cementerio'), falso: Q('nombre falso'), anos: Q('mil novecientos noventa y ocho'), suyo: Q('con el suyo'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const MAR = '#1f4f7a', NOCHE = '#141a2e', CAQUI = '#5d6b4a', PAPC = '#fbf6ea';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const selloF = (c, x, y, txt, size = 96, col = RED) => box(c, x, y, 900, size * 1.5, { zIndex: 45, transformOrigin: '50% 50%', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(size), color: col, textAlign: 'center', lineHeight: px(size * 1.4), border: `10px solid ${col}`, borderRadius: '20px', background: 'rgba(255,255,255,.85)' }, txt);
const selloA = (e, t, t0, t1 = 1e9, r = -10) => set(e, { o: t > t0 && t < t1 ? 1 : 0, s: t > t0 ? lerp(1.9, 1, p(t, t0, 0.18)) : 0, r });
/* la ficha del «comandante William Martin» (foto de carné + datos) */
function ficha(c, x, y, z = 10) {
  const f = box(c, x, y, 640, 820, { zIndex: z, background: PAPC, border: `10px solid ${INK}`, borderRadius: '24px', boxShadow: `14px 14px 0 ${INK}`, transformOrigin: '50% 50%' });
  box(f, 0, 0, 620, 90, { background: '#2b3550', borderRadius: '14px 14px 0 0', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', color: '#fff', textAlign: 'center', lineHeight: '90px' }, 'ROYAL MARINES');
  const marco = box(f, 150, 130, 320, 380, { background: '#d8ccb0', border: `8px solid ${INK}`, overflow: 'hidden' });
  const p = PERS(marco, 10, 40, 300, { ropa: CAQUI, gorro: 'gorra', gcol: CAQUI, pelo: 'corto', pcol: '#3a2a1e' });
  box(f, 0, 540, 620, 80, { fontFamily: 'Playfair', fontWeight: 900, fontSize: '58px', textAlign: 'center', color: INK }, 'William Martin');
  box(f, 0, 630, 620, 60, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', textAlign: 'center', color: '#6b5a40' }, 'Comandante');
  return { f, p };
}
/* el mar (de lado) con olas que se mueven */
function mar(cam, y = 1100, cielo = 'linear-gradient(#f7b267, #f4d6a0 60%)') {
  box(cam, -800, -400, 2680, y + 400, { zIndex: 0, background: cielo });
  box(cam, -800, y, 2680, 1600, { zIndex: 2, background: MAR });
  const olas = [0, 1, 2].map(i => box(cam, -800, y - 30 + i * 140, 4000, 60, { zIndex: 3 + i * 2 }, `<svg viewBox="0 0 4000 60" width="4000" height="60"><path d="${[...Array(41)].map((_, k) => `${k ? 'Q' + (k * 100 - 50) + ',' + (k % 2 ? 0 : 60) + ' ' : 'M'}${k * 100},30`).join(' ')}" stroke="#7cc4ea" stroke-width="10" fill="none" opacity="${0.9 - i * 0.2}"/></svg>`));
  return t => olas.forEach((o, i) => set(o, { x: -((t * (60 + i * 30)) % 200), y: Math.sin(t * 1.5 + i) * 8 }));
}
const MALETIN = (c, x, y, w, z = 9) => box(c, x, y, w, w * 0.75, { zIndex: z, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 200 150" width="${w}" height="${w * 0.75}"><path d="M70,30 Q70,6 100,6 Q130,6 130,30" stroke="${INK}" stroke-width="10" fill="none"/><rect x="10" y="28" width="180" height="116" rx="16" fill="#6b4a2a" stroke="${INK}" stroke-width="8"/><rect x="88" y="52" width="24" height="18" rx="4" fill="${GOLD}" stroke="${INK}" stroke-width="4"/></svg>`);
const CADENA = (c, x, y, w, z = 9) => box(c, x, y, w, 40, { zIndex: z, transformOrigin: '0 50%' }, `<svg viewBox="0 0 ${w} 40" width="${w}" height="40">${[...Array(Math.ceil(w / 40))].map((_, i) => `<ellipse cx="${20 + i * 40}" cy="20" rx="22" ry="12" fill="none" stroke="#9a948a" stroke-width="8"/>`).join('')}</svg>`);
const CARTA = (c, x, y, w, html, o = {}) => box(c, x, y, w, w * 1.3, { zIndex: o.z || 10, background: PAPC, border: `8px solid ${INK}`, borderRadius: '10px', padding: '30px', boxSizing: 'border-box', fontFamily: o.font || 'Playfair', fontSize: px(o.size || 40), color: INK, lineHeight: 1.25, transformOrigin: '50% 50%' }, html);

/* PORTADA + L0-L1 (lección del récord de las autovías: la idea entera en una imagen, dos cosas que no pegan): el mapa de España con una LÁPIDA en Huelva,
   y de la lápida sale una carta «GRECIA» volando hasta Hitler, que la lee encantado. Título afirmativo: «ENGAÑÓ A HITLER / estando MUERTO» */
const SPAIN = 'M90,120 L200,80 L320,86 L420,92 L560,112 L640,150 L720,170 L800,180 L900,200 L880,280 L800,380 L740,450 L760,540 L700,620 L640,700 L520,730 L400,742 L300,760 L230,700 L200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L60,170 Z';
plano(-1, L(2) - 0.1, { background: '#9fd3e8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'radial-gradient(circle at 540px 1100px, #bfe3f5, #7fbfe0 70%)' });
  const mapa = box(cam, 40, 620, 1000, 850, { zIndex: 2 }, `<svg viewBox="0 0 1000 850" width="1000" height="850"><path d="${SPAIN}" fill="#f4e4c0" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
    <path d="M300,760 L330,800" stroke="${INK}" stroke-width="0"/><text x="560" y="420" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="rgba(43,33,24,.35)">ESPAÑA</text></svg>`);
  // la lápida, plantada sobre Huelva (≈ x 250, y 690 del mapa)
  const lap = box(cam, 40 + 250 - 90, 620 + 690 - 210, 180, 210, { zIndex: 5, transformOrigin: '50% 100%', background: '#c9c4bc', border: `9px solid ${INK}`, borderRadius: '90px 90px 8px 8px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '30px', textAlign: 'center', paddingTop: '60px', boxSizing: 'border-box', color: INK, lineHeight: 1.1 }, 'R.I.P.');
  const hue = chip(cam, 40 + 250 - 130, 620 + 720, 'HUELVA', { size: 52, bg: '#2e6b3a', z: 6 });
  // Hitler arriba a la derecha, leyendo
  const hit = PERS(cam, 740, 500, 280, { ropa: '#9a8458', gorro: 'gorra', gcol: '#9a8458', bigote: 'corto', pelo: 'corto', pcol: '#2a2118', z: 7 });
  const carta = CARTA(cam, 0, 0, 170, `<div style="font-family:Bricolage;font-weight:800;font-size:22px;color:${RED}">SECRETO</div><div style="font-family:Bricolage;font-weight:800;font-size:30px;margin-top:8px">GRECIA</div>`, { z: 8, size: 26 });
  const traza = box(cam, 0, 0, 1080, 1920, { zIndex: 4 }, `<svg viewBox="0 0 1080 1920" width="1080" height="1920"><path class="tr" d="M290,1290 Q420,820 820,780" stroke="${RED}" stroke-width="12" fill="none" stroke-dasharray="26 18" stroke-linecap="round"/></svg>`);
  const t1 = texto(c, 140, `ENGAÑÓ A ${hlSpan('HITLER', 'phl', RED)}`, { size: 104, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 270, 'estando MUERTO', { size: 112, color: YEL, z: 40, shadow: OUT });
  sp(T.muerto0, 'thud', 0.7); sp(T.huelva0, 'ding', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1000, 0.95], [520, 1060, 1.06]);
    // la carta viaja en bucle de la lápida a Hitler
    const k = ((t + 0.6) % 2.2) / 2.2, e = E.inOutCubic(clamp(k * 1.25)); const a = 1 - e;
    set(carta, { x: a * a * 290 + 2 * a * e * 420 + e * e * 820 - 85, y: a * a * 1290 + 2 * a * e * 820 + e * e * 780 - 110, r: lerp(-20, 10, e), s: 0.7 + 0.3 * e });
    const tr = traza.querySelector('.tr'); if (tr) tr.setAttribute('stroke-dashoffset', f1(-t * 80));
    set(lap, { r: Math.sin(t * 1.3) * 2 }); set(hue, { r: -3 });
    pFace(hit, t, { feliz: 1, ceja: 4, look: [-14, 12], seed: 9 }); set(hit, { y: wobble(t, 0.6, 5) });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
  };
}, { sfx: false });

/* L2-L3 (corte): amanecer en Punta Umbría; la barca del pescador; algo flota a lo lejos → de cerca: uniforme, chaleco y el maletín con su cadena */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#f7b267' }, c => {
  const cam = CAM(c); const olas = mar(cam, 1100);
  const sol = box(cam, 640, 860, 300, 300, { zIndex: 1, borderRadius: '50%', background: '#ffb02e', border: `8px solid ${INK}` });
  const barca = box(cam, -40, 860, 560, 300, { zIndex: 6 }, `<svg viewBox="0 0 560 300" width="560" height="300"><path d="M20,170 L540,170 Q500,290 260,290 Q80,290 20,170Z" fill="#c8102e" stroke="${INK}" stroke-width="10"/><path d="M40,200 L520,200" stroke="#fff" stroke-width="10"/><path d="M300,170 L300,10" stroke="${INK}" stroke-width="10"/><path d="M300,20 L420,150 L300,150Z" fill="${PAPC}" stroke="${INK}" stroke-width="7"/></svg>`);
  const pesc = PERS(cam, 60, 760, 240, { ropa: '#3d5a4a', gorro: 'gorro', pelo: 'corto', pcol: '#4a4a4a', z: 5 });
  // lo que flota: chaleco amarillo y uniforme, boca abajo (sin cara)
  const cuerpo = box(cam, 0, 0, 380, 120, { zIndex: 7, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 380 120" width="380" height="120"><rect x="20" y="40" width="300" height="60" rx="30" fill="${CAQUI}" stroke="${INK}" stroke-width="8"/><rect x="90" y="30" width="140" height="78" rx="20" fill="#f2c230" stroke="${INK}" stroke-width="8"/><circle cx="330" cy="66" r="34" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/></svg>`);
  const mal = MALETIN(cam, 0, 0, 170, 8), cad = CADENA(cam, 0, 0, 160, 8);
  const fecha = chip(c, 300, 300, '30 de abril de 1943', { size: 64, bg: INK, color: YEL, z: 40 });
  const lugar = chip(c, 360, 420, 'Punta Umbría', { size: 58, bg: '#2e6b3a', z: 40 });
  const ofi = chip(c, 260, 300, 'un oficial británico', { size: 62, bg: '#2b3550', z: 40 });
  const cadT = chip(c, 300, 1560, 'atado con una cadena', { size: 58, bg: RED, z: 40 });
  sp(T.treinta, 'whoosh', 0.4); sp(T.flotando, 'boing', 0.4); sp(T.oficial, 'thud', 0.6); sp(T.cadena, 'click', 0.7);
  return t => {
    const cerca = t > T.oficial - 0.4;
    // de lejos, la cámara se acerca hacia lo que flota; al «oficial británico» se queda encima (un solo sentido)
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [480, 1000, 0.95], [880, 1130, 1.6]);
    olas(t); set(sol, { y: -clamp((t - L(2)) / 6) * 60 });
    set(barca, { y: Math.sin(t * 1.6) * 10, r: Math.sin(t * 1.3) * 2 }); set(pesc, { y: Math.sin(t * 1.6) * 10 });
    pFace(pesc, t, { feliz: t > T.flotando ? -0.3 : 0.4, ceja: t > T.flotando ? 14 : 2, look: t > T.flotando ? [16, 4] : [6, 0], jaw: t > T.oficial ? 0.6 : 0, seed: 4 });
    const fy = 1110 + Math.sin(t * 1.4) * 8; set(cuerpo, { x: 720, y: fy, r: Math.sin(t * 1.1) * 2 });
    set(mal, { x: 900, y: fy + 70, r: Math.sin(t * 1.4 + 1) * 6 }); set(cad, { x: 800, y: fy + 80, r: 10 + Math.sin(t * 1.4) * 4, o: t > T.maletin ? 1 : 0.4 });
    set(fecha, { o: t > T.treinta - 0.1 && !cerca ? 1 : 0, s: pop(t, T.treinta - 0.1, 0.35), r: -3 });
    set(lugar, { o: t > T.pescador && !cerca ? 1 : 0, s: pop(t, T.pescador, 0.35), r: 3 });
    set(ofi, { o: cerca ? 1 : 0, s: pop(t, T.oficial - 0.4, 0.35), r: -3 });
    set(cadT, { o: t > T.cadena - 0.1 ? 1 : 0, s: pop(t, T.cadena - 0.1, 0.35), r: -4 });
  };
});

/* L4-L5 (corte): un despacho a media luz: dos espías alemanes con sombrero; abren la carta con pinzas, fogonazo de la cámara, y la copia vuela a «BERLÍN»; «GRECIA» subrayado */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#2a2530' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#2a2530' });
  const luz = box(cam, -200, 200, 1480, 1700, { zIndex: 1, background: 'radial-gradient(ellipse at 540px 700px, rgba(255,233,166,.55), rgba(255,233,166,0) 60%)' });
  const lampara = box(cam, 420, 120, 240, 200, { zIndex: 3 }, `<svg viewBox="0 0 240 200" width="240" height="200"><path d="M120,0 V60" stroke="${INK}" stroke-width="8"/><path d="M30,150 Q120,40 210,150Z" fill="#2e6b3a" stroke="${INK}" stroke-width="8"/><ellipse cx="120" cy="160" rx="40" ry="20" fill="#ffe9a6"/></svg>`);
  box(cam, -200, 1250, 1480, 700, { zIndex: 4, background: '#6b4a2a', borderTop: `12px solid ${INK}` });
  const e1 = PERS(cam, -40, 620, 380, { ropa: '#3d3a44', gorro: 'chistera', pelo: 'corto', pcol: '#2a2118', z: 3 });
  const e2 = PERS(cam, 720, 640, 360, { ropa: '#5e5a52', gorro: 'gorra', gcol: '#3d3a44', pelo: 'corto', pcol: '#2a2118', z: 3 });
  const carta = CARTA(cam, 330, 820, 420, `<div style="font-size:30px;opacity:.6">SECRETO</div><div style="margin-top:20px">Querido Alex:</div><div style="margin-top:16px">…atacaremos <b class="gre" style="position:relative">GRECIA<span class="sub" style="position:absolute;left:-6px;right:-6px;bottom:-6px;height:12px;background:${RED};transform-origin:0 50%"></span></b>…</div>`, { z: 6, size: 46 });
  const pinza = box(cam, 640, 760, 260, 60, { zIndex: 7, transformOrigin: '0 50%' }, `<svg viewBox="0 0 260 60" width="260" height="60"><path d="M0,24 L250,6 M0,36 L250,54" stroke="#c9c4bc" stroke-width="12" stroke-linecap="round"/></svg>`);
  const flash = box(c, 0, 0, 1080, 1920, { zIndex: 35, background: '#fff' });
  const copia = CARTA(c, 380, 900, 320, '<div style="font-size:34px">copia</div>', { z: 36, size: 34 });
  const ber = chip(c, 360, 300, 'BERLÍN', { size: 80, bg: RED, z: 40 });
  const neutral = chip(c, 140, 300, 'España: fuera de la guerra', { size: 58, bg: '#2e6b3a', z: 40 });
  const esp = chip(c, 200, 420, '…llena de espías', { size: 58, bg: INK, color: YEL, z: 40 });
  sp(T.espias, 'drumroll', 0.4); sp(T.abren, 'paper', 0.6); sp(T.copian, 'click', 0.8); sp(T.berlin, 'whoosh', 0.7); sp(T.grecia, 'stamp', 0.7);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 1000, 0.95], [540, 1020, 1.18]);
    set(luz, { o: 0.85 + 0.15 * Math.sin(t * 7) * Math.sin(t * 3) });
    set(lampara, { r: Math.sin(t * 1.1) * 2 });
    pFace(e1, t, { feliz: 0.3, ceja: 12, look: [14, 10], seed: 5 }); pFace(e2, t, { feliz: 0.5, ceja: 10, look: [-14, 10], seed: 6 });
    set(e1, { y: wobble(t, 0.5, 4) }); set(e2, { y: wobble(t, 0.55, 4, 1) });
    set(carta, { o: t > T.manos - 0.3 ? 1 : 0, s: pop(t, T.manos - 0.3, 0.4), r: -2 + Math.sin(t) * 1 });
    set(pinza, { o: t > T.abren - 0.2 && t < T.copian ? 1 : 0, x: -lerp(0, 120, p(t, T.abren - 0.2, 0.8)), r: -8 });
    flash.style.opacity = f1(t > T.copian ? Math.max(0, 1 - (t - T.copian) / 0.25) : 0);
    const kc = p(t, T.berlin - 0.3, 0.7, E.inCubic); set(copia, { o: t > T.copian && t < T.berlin + 0.5 ? 1 : 0, x: kc * 500, y: -kc * 700, r: kc * 30, s: 1 - kc * 0.5 });
    set(ber, { o: t > T.berlin - 0.1 && t < T.plan ? 1 : 0, s: pop(t, T.berlin - 0.1, 0.35), r: -4 });
    set(neutral, { o: t > T.espana - 0.1 && t < T.espias ? 1 : 0, s: pop(t, T.espana - 0.1, 0.35), r: -3 });
    set(esp, { o: t > T.espias - 0.1 && t < T.manos + 0.4 ? 1 : 0, s: pop(t, T.espias - 0.1, 0.35), r: 3 });
    const sub = carta.querySelector('.sub'); if (sub) sub.style.transform = `scaleX(${f1(p(t, T.grecia - 0.1, 0.4) * 1000) / 1000})`;
  };
});

/* L6 (corte): sobre la mesa, lo que llevaba en los bolsillos: foto de la novia, cartas de amor, entradas de teatro y la carta del banco */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#6b4a2a' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#6b4a2a', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 6px, transparent 6px 60px)' });
  const foto = box(cam, 80, 420, 420, 520, { zIndex: 3, background: '#fff', border: `6px solid ${INK}`, padding: '24px', boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const fin = box(foto, 0, 0, 360, 400, { background: '#d8ccb0', overflow: 'hidden' }); const novia = PERS(fin, 30, 60, 300, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  box(foto, 0, 410, 360, 60, { fontFamily: 'Playfair', fontStyle: 'italic', fontSize: '40px', textAlign: 'center', color: INK }, 'Pam');
  const amor = CARTA(cam, 560, 380, 400, `<div style="font-style:italic">Querido Bill:</div><div style="margin-top:16px;font-style:italic">te echo tanto de menos…</div><svg viewBox="0 0 100 90" width="120" height="108" style="display:block;margin:10px auto 0"><path d="M50,85 C10,55 0,35 15,18 C30,2 48,12 50,25 C52,12 70,2 85,18 C100,35 90,55 50,85Z" fill="${RED}" stroke="${INK}" stroke-width="5"/></svg>`, { z: 4, size: 40 });
  const entr = [0, 1].map(i => box(cam, 120 + i * 60, 1060 + i * 40, 380, 160, { zIndex: 5 + i, background: '#f2c230', border: `6px dashed ${INK}`, borderRadius: '14px', fontFamily: 'Rye', fontSize: '44px', textAlign: 'center', lineHeight: '148px', color: INK, transformOrigin: '50% 50%' }, 'TEATRO'));
  const banco = CARTA(cam, 580, 1000, 400, `<div style="font-family:Bricolage;font-weight:800;font-size:40px">BANCO</div><div style="margin-top:14px">Le rogamos que pague lo que nos debe.</div><div style="font-family:Bricolage;font-weight:800;color:${RED};font-size:48px;margin-top:10px">DEBE DINERO</div>`, { z: 5, size: 36 });
  const cuadra = texto(c, 220, 'todo cuadra', { size: 104, color: '#fff', z: 40, shadow: OUT });
  const items = [[foto, T.foto, -8], [amor, T.cartas, 6], [entr[0], T.entradas, -10], [entr[1], T.entradas + 0.25, 8], [banco, T.banco, 4]];
  items.forEach(([e, tt]) => sp(tt, 'paper', 0.5));
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 900, 0.95], [540, 1000, 1.08]);
    items.forEach(([e, tt, r]) => set(e, { o: t > tt - 0.15 ? 1 : 0, s: t > tt - 0.15 ? lerp(1.5, 1, p(t, tt - 0.15, 0.3, E.outCubic)) : 0, r: r + Math.sin(t * 1.2 + r) * 1 }));
    pFace(novia, t, { feliz: 1, look: [0, 0], seed: 7 });
    set(cuadra, { o: t > T.bolsillos ? 1 : 0, s: pop(t, T.bolsillos, 0.35), r: -3 + wobble(t, 0.5, 0.8) });
  };
});

/* L7 (corte): la ficha otra vez… selloF «NO EXISTÍA» */
plano(L(7) - 0.1, L(8) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: `radial-gradient(circle at 540px 1000px, #2f3a5e, ${NOCHE} 65%)` });
  const F = ficha(cam, 220, 560);
  const nada = texto(c, 220, 'nada era verdad', { size: 100, color: '#fff', z: 40, shadow: OUT });
  const s = selloF(c, 90, 1500, 'NO EXISTÍA', 110);
  sp(T.nada, 'mus_baja', 0.6); sp(T.noexistia, 'stamp', 1);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(8) - 0.1, [540, 970, 1.0], [540, 940, 1.15]);
    set(F.f, { r: -3 + Math.sin(t * 1.2) * 1.5 }); pFace(F.p, t, { feliz: 0, look: [0, 0], seed: 3 });
    set(nada, { o: t > T.nada - 0.1 ? 1 : 0, s: pop(t, T.nada - 0.1, 0.35), r: -2 });
    selloA(s, t, T.noexistia, 1e9, -8);
  };
});

/* L8a (corte): Londres con niebla: Glyndwr Michael, vagabundo galés */
plano(L(8) - 0.1, T.inventaron - 0.1, { background: '#9a948a' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: 'linear-gradient(#b9b3a8, #8a847a)' });
  const big = box(cam, 660, 200, 260, 1100, { zIndex: 1 }, `<svg viewBox="0 0 260 1100" width="260" height="1100"><rect x="30" y="260" width="200" height="840" fill="#6b6258" stroke="${INK}" stroke-width="8"/><path d="M20,260 L130,60 L240,260Z" fill="#6b6258" stroke="${INK}" stroke-width="8"/><path d="M130,60 V0" stroke="${INK}" stroke-width="8"/><circle cx="130" cy="380" r="80" fill="#f4efe2" stroke="${INK}" stroke-width="8"/><path d="M130,380 V330 M130,380 L165,395" stroke="${INK}" stroke-width="8"/></svg>`);
  const casas = box(cam, -300, 900, 1000, 500, { zIndex: 1, background: '#7a7268', border: `8px solid ${INK}` });
  box(cam, -600, 1380, 2280, 900, { zIndex: 2, background: '#5e5a52', borderTop: `10px solid ${INK}` });
  const vag = PERS(cam, 180, 900, 440, { ropa: '#6b5a40', pelo: 'corto', pcol: '#4a3a2a', barba: true, z: 5 });
  const niebla = [0, 1, 2].map(i => box(cam, -600, 600 + i * 300, 2600, 220, { zIndex: 6, background: 'radial-gradient(ellipse at center, rgba(240,236,228,.6), rgba(240,236,228,0) 70%)' }));
  const nom = box(c, 120, 260, 840, 220, { zIndex: 40, background: PAPC, border: `8px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '76px', color: INK, paddingTop: '20px', boxSizing: 'border-box', lineHeight: 1.1 }, 'Glyndwr Michael<div style="font-family:Bricolage;font-weight:800;font-size:44px;color:#6b5a40">vagabundo galés</div>');
  const lon = chip(c, 360, 520, 'Londres, 1943', { size: 56, bg: INK, color: '#fff', z: 40 });
  const ven = chip(c, 240, 1560, 'muerto envenenado', { size: 58, bg: '#2e6b3a', z: 40 });
  sp(T.vagabundo, 'whoosh', 0.5); sp(T.glyn, 'ding', 0.6); sp(T.envenenado, 'mus_baja', 0.5);
  return t => {
    deriva(cam, t, L(8) - 0.1, T.inventaron - 0.1, [480, 1050, 0.95], [520, 1080, 1.1]);
    niebla.forEach((n, i) => set(n, { x: ((t * (40 + i * 20)) % 600) - 300 }));
    pFace(vag, t, { feliz: -0.6, ceja: 8, look: [0, 12], seed: 8 }); set(vag, { y: wobble(t, 0.4, 4) });
    set(nom, { o: t > T.glyn - 0.2 ? 1 : 0, s: pop(t, T.glyn - 0.2, 0.4), r: -2 });
    popA(lon, t, T.londres - 0.1, { r: 3 }); popA(ven, t, T.envenenado - 0.1, { r: -3 });
  };
});

/* L8b (corte): le inventan una vida — la ficha se rellena con la foto, las cartas, las entradas */
plano(T.inventaron - 0.1, T.soltaron - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.08) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.08) 2px, transparent 2px)', backgroundSize: '80px 80px' });
  const F = ficha(cam, 220, 600);
  const vuela = [['foto de Pam', PINK], ['cartas de amor', '#c8102e'], ['entradas', '#f2c230'], ['deudas', INK]].map(([s, col], i) => chip(cam, 0, 0, s, { size: 50, bg: col, color: col === '#f2c230' ? INK : '#fff', z: 12 }));
  const vida = texto(c, 220, 'una vida inventada', { size: 96, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  vuela.forEach((v, i) => sp(T.inventaron + 0.3 + i * 0.35, 'pop', 0.4));
  return t => {
    deriva(cam, t, T.inventaron - 0.1, T.soltaron - 0.1, [540, 1000, 1.05], [540, 1000, 0.92]);
    set(F.f, { r: -2 + Math.sin(t * 1.4) * 1.5 }); pFace(F.p, t, { feliz: 0.3, seed: 3 });
    const des = [[-200, 300], [1100, 500], [-200, 1500], [1100, 1700]], hasta = [[80, 560], [700, 700], [60, 1450], [680, 1500]];
    vuela.forEach((v, i) => { const k = p(t, T.inventaron + 0.3 + i * 0.35, 0.5, E.outBack); set(v, { o: k > 0 ? 1 : 0, x: lerp(des[i][0], hasta[i][0], k), y: lerp(des[i][1], hasta[i][1], k), r: Math.sin(t * 2 + i) * 4 }); });
    set(vida, { s: pop(t, T.inventaron - 0.1, 0.35), r: -2 + wobble(t, 0.5, 0.8) });
  };
});

/* L8c (corte): de noche, el submarino sale a la superficie frente a Huelva y deja el bote en el agua */
plano(T.soltaron - 0.1, L(9) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c); const olas = mar(cam, 1150, `linear-gradient(${NOCHE}, #2f3a5e)`);
  const luna = box(cam, 720, 260, 180, 180, { zIndex: 1, borderRadius: '50%', background: '#f4efe2', boxShadow: '0 0 80px rgba(244,239,226,.6)' });
  const sub = box(cam, 0, 0, 900, 260, { zIndex: 4 }, `<svg viewBox="0 0 900 260" width="900" height="260"><path d="M20,180 Q20,120 140,120 L780,120 Q880,120 880,180 Q880,230 780,230 L140,230 Q20,230 20,180Z" fill="#7a7882" stroke="${INK}" stroke-width="10"/><rect x="380" y="40" width="160" height="90" rx="14" fill="#7a7882" stroke="${INK}" stroke-width="10"/><path d="M460,40 V0" stroke="${INK}" stroke-width="10"/></svg>`);
  const bulto = box(cam, 0, 0, 220, 70, { zIndex: 6 }, `<svg viewBox="0 0 220 70" width="220" height="70"><rect x="10" y="20" width="160" height="40" rx="20" fill="${CAQUI}" stroke="${INK}" stroke-width="6"/><rect x="60" y="14" width="60" height="50" rx="12" fill="#f2c230" stroke="${INK}" stroke-width="6"/></svg>`);
  const ch = chip(c, 280, 300, 'desde un submarino', { size: 62, bg: '#2b3550', z: 40 });
  sp(T.submarino - 0.3, 'swoosh_up', 0.6); sp(T.submarino + 0.6, 'squish', 0.5);
  return t => {
    deriva(cam, t, T.soltaron - 0.1, L(9) - 0.1, [540, 1100, 0.95], [620, 1150, 1.1]);
    olas(t);
    const ks = p(t, T.soltaron, 1.2, E.outCubic); set(sub, { x: 80, y: lerp(1260, 1000, ks) + Math.sin(t * 1.2) * 6 });
    const kb = p(t, T.submarino + 0.2, 0.8, E.inOutCubic); set(bulto, { x: lerp(560, 760, kb), y: lerp(1020, 1160, kb) + Math.sin(t * 1.5) * 6, o: t > T.submarino ? 1 : 0 });
    set(luna, { s: 1 + 0.02 * Math.sin(t * 2) });
    popA(ch, t, T.submarino - 0.2, { r: -3 });
  };
});

/* L9-L10 (corte): el mapa del Mediterráneo: flechas alemanas a Grecia y Cerdeña… y los barcos aliados llegan a Sicilia; telegrama a Churchill */
plano(L(9) - 0.1, L(11) - 0.1, { background: '#bfe3f5' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 2720, { zIndex: 0, background: '#9fd3e8' });
  const mapa = box(cam, -60, 380, 1200, 1200, { zIndex: 2 }, `<svg viewBox="0 0 1200 1200" width="1200" height="1200">
    <path d="M0,0 L1200,0 L1200,260 Q900,300 820,360 Q700,330 620,250 Q520,200 420,240 Q300,300 160,260 Q60,240 0,280Z" fill="#e8d8a8" stroke="${INK}" stroke-width="8"/>
    <path d="M520,230 Q560,330 620,420 Q680,520 760,600 Q800,640 780,690 Q740,680 700,620 Q620,520 560,450 Q500,360 470,250Z" fill="#e8d8a8" stroke="${INK}" stroke-width="8"/>
    <path d="M600,720 L760,700 L700,800Z" fill="#e8d8a8" stroke="${INK}" stroke-width="8" class="sic"/>
    <ellipse cx="380" cy="520" rx="60" ry="120" fill="#e8d8a8" stroke="${INK}" stroke-width="8"/>
    <path d="M930,380 Q1000,420 980,520 Q1040,600 1000,700 Q950,760 900,700 Q880,620 900,560 Q860,480 930,380Z" fill="#e8d8a8" stroke="${INK}" stroke-width="8"/>
    <path d="M0,1000 Q400,940 800,980 Q1000,1000 1200,960 L1200,1200 L0,1200Z" fill="#e8d8a8" stroke="${INK}" stroke-width="8"/>
    <text x="380" y="680" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">Cerdeña</text>
    <text x="960" y="800" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">Grecia</text>
    <text x="680" y="860" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">Sicilia</text>
    <text x="560" y="120" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="44" fill="${INK}">Alemania</text><text x="640" y="560" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}" transform="rotate(50 640 560)">Italia</text><text x="300" y="1100" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">África</text></svg>`);
  const fl = (x1, y1, x2, y2) => { const L2 = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; return box(cam, x1, y1 - 25, L2, 50, { zIndex: 5, transformOrigin: '0 50%', transform: `rotate(${f1(a)}deg)` }, `<svg viewBox="0 0 ${f1(L2)} 50" width="${f1(L2)}" height="50" preserveAspectRatio="none"><rect x="0" y="16" width="${f1(L2 - 40)}" height="18" fill="${RED}" stroke="${INK}" stroke-width="4"/><path d="M${f1(L2 - 50)},0 L${f1(L2)},25 L${f1(L2 - 50)},50Z" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`); };
  const fG = fl(600, 480, 880, 780), fC = fl(480, 480, 380, 780);
  const flechas = [[fG, T.tropasG], [fC, T.cerdena]];
  const barcos = [0, 1, 2].map(i => box(cam, 0, 0, 120, 70, { zIndex: 6 }, `<svg viewBox="0 0 120 70" width="120" height="70"><path d="M5,30 L115,30 Q100,66 60,66 Q20,66 5,30Z" fill="#2b3550" stroke="${INK}" stroke-width="6"/><rect x="40" y="6" width="40" height="26" fill="#2b3550" stroke="${INK}" stroke-width="6"/></svg>`));
  const hit = PERS(c, 780, 110, 240, { ropa: '#9a8458', gorro: 'gorra', gcol: '#9a8458', bigote: 'corto', pelo: 'corto', pcol: '#2a2118', z: 38 });
  const cree = chip(c, 80, 330, 'Hitler se lo cree', { size: 58, bg: INK, color: '#fff', z: 40 });
  const jul = chip(c, 380, 300, 'julio de 1943', { size: 60, bg: '#2b3550', z: 40 });
  const tele = box(c, 120, 340, 840, 420, { zIndex: 41, background: '#f4efe2', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: '44px', color: INK, padding: '36px', boxSizing: 'border-box', lineHeight: 1.3 }, `<div style="font-size:36px;opacity:.6">TELEGRAMA · PARA: CHURCHILL</div><div class="tt" style="margin-top:24px"></div>`);
  const MSG = 'SE LO HAN TRAGADO ENTERO.';
  sp(T.cree, 'boing', 0.5); sp(T.tropasG, 'swoosh_up', 0.5); sp(T.cerdena, 'swoosh_up', 0.5); sp(T.sicilia, 'tada', 0.8); sp(T.churchill, 'ding', 0.6); sp(T.tragado, 'stamp', 0.6);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(11) - 0.1, [560, 980, 0.95], [660, 1100, 1.16]);
    flechas.forEach(([f, tt]) => { const k = p(t, tt - 0.2, 0.6, E.outCubic); f.style.clipPath = `inset(0 ${f1((1 - k) * 100)}% 0 0)`; f.style.opacity = t > tt - 0.2 ? 1 : 0; });
    barcos.forEach((b, i) => { const k = p(t, T.julio + i * 0.25, 1.4, E.inOutCubic); set(b, { o: t > T.julio ? 1 : 0, x: lerp(480 + i * 110, 560 + i * 70, k), y: lerp(1120, 800 + (i % 2) * 30, k) + Math.sin(t * 3 + i) * 4 }); });
    const sic = mapa.querySelector('.sic'); if (sic) sic.setAttribute('fill', t > T.sicilia ? '#9fd3c0' : '#e8d8a8');
    pFace(hit, t, { feliz: t > T.sicilia ? -1 : 0.6, ceja: t > T.sicilia ? 18 : 4, jaw: t > T.sicilia ? 0.8 : 0, look: [16, -6], seed: 9 }); set(hit, { o: t < T.churchill - 0.3 ? 1 : 0, y: t > T.sicilia ? Math.sin(t * 25) * 4 : wobble(t, 0.6, 4) });
    set(cree, { o: t > T.cree - 0.1 && t < T.julio ? 1 : 0, s: pop(t, T.cree - 0.1, 0.35), r: -3 });
    set(jul, { o: t > T.julio - 0.1 && t < T.churchill - 0.3 ? 1 : 0, s: pop(t, T.julio - 0.1, 0.35), r: -3 });
    const kt = t > T.churchill - 0.3; set(tele, { o: kt ? 1 : 0, s: pop(t, T.churchill - 0.3, 0.35) * (1 + 0.04 * clamp((t - T.churchill) / 3)), r: -2 + Math.sin(t * 1.2) * 1 });
    const tt = tele.querySelector('.tt'); if (tt) tt.textContent = MSG.slice(0, Math.floor(clamp((t - T.tragado + 0.1) / 1.2) * MSG.length));
  };
});

/* L11 (corte): el cementerio de la Soledad (Huelva): la lápida con «William Martin»… y la línea de 1998 con su nombre de verdad */
plano(L(11) - 0.1, L(12) - 0.1, { background: '#d8eef8' }, c => {
  const cam = CAM(c);
  box(cam, -600, -400, 2280, 1800, { zIndex: 0, background: 'linear-gradient(#9fd3e8, #f4efe2)' });
  box(cam, -600, 1300, 2280, 1200, { zIndex: 1, background: '#a7b97a', borderTop: `10px solid ${INK}` });
  const cipreses = box(cam, -400, 500, 2000, 820, { zIndex: 1 }, `<svg viewBox="0 0 2000 820" width="2000" height="820">${[0, 260, 1500, 1760].map(x => `<path d="M${x + 60},820 Q${x},400 ${x + 60},20 Q${x + 120},400 ${x + 60},820Z" fill="#2e6b3a" stroke="${INK}" stroke-width="7"/>`).join('')}</svg>`);
  const lap = box(cam, 190, 640, 700, 900, { zIndex: 3, background: '#e9e5dc', border: `12px solid ${INK}`, borderRadius: '30px 30px 10px 10px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, paddingTop: '90px', boxSizing: 'border-box' },
    `<div style="font-size:54px">WILLIAM MARTIN</div><div style="font-size:36px;margin-top:12px">Royal Marines</div><div class="lin98" style="margin:70px 40px 0;padding-top:30px;border-top:6px solid ${INK};font-size:44px;line-height:1.2">GLYNDWR MICHAEL<div style="font-size:32px;font-weight:700;font-style:italic">sirvió como el comandante William Martin</div></div>`);
  const flores = box(cam, 300, 1450, 480, 160, { zIndex: 4 }, `<svg viewBox="0 0 480 160" width="480" height="160">${[40, 120, 200, 280, 360, 440].map((x, i) => `<path d="M${x},160 V70" stroke="#2e6b3a" stroke-width="8"/><circle cx="${x}" cy="60" r="28" fill="${['#e8507a', '#f2c230', '#fff'][i % 3]}" stroke="${INK}" stroke-width="6"/>`).join('')}</svg>`);
  const lug = chip(c, 140, 300, 'Cementerio de la Soledad · Huelva', { size: 50, bg: '#2e6b3a', z: 40 });
  const falso = chip(c, 300, 420, 'el nombre falso', { size: 58, bg: RED, z: 40 });
  const ano = chip(c, 380, 1560, 'desde 1998', { size: 62, bg: INK, color: YEL, z: 40 });
  sp(T.tumba, 'harpa', 0.5); sp(T.falso, 'pop', 0.5); sp(T.suyo, 'sparkle', 0.8);
  return t => {
    // primero la lápida entera; luego baja hacia la línea de 1998 (un solo sentido)
    deriva(cam, t, L(11) - 0.1, L(12) - 0.1, [540, 1000, 0.92], [540, 1260, 1.25]);
    const l98 = lap.querySelector('.lin98'); if (l98) { l98.style.opacity = f1(p(t, T.anos, 0.6)); l98.style.background = t > T.suyo ? `rgba(242,194,48,${f1(0.5 * p(t, T.suyo, 0.4))})` : 'transparent'; }
    set(flores, { r: Math.sin(t * 1.5) * 1.5 });
    popA(lug, t, T.cementerio - 0.1, { r: -2 });
    set(falso, { o: t > T.falso - 0.1 && t < T.anos ? 1 : 0, s: pop(t, T.falso - 0.1, 0.35), r: 3 });
    popA(ano, t, T.anos - 0.1, { r: -3 });
  };
});

/* L12 · pregunta final (+ «Os leo») */
preguntaFinal('¿Sabías que esto', 'pasó en Huelva?', { size: 88, draw: c => [['¡ni idea!', YEL], ['soy de Huelva', PINK], ['vi la peli', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 260 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(12) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(111, 'El muerto de Huelva', ['HISTORIA', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[T.sicilia + 0.3, T.churchill - 0.4]],
  vecino: { risa: [], sorpresa: [[T.noexistia, T.noexistia + 1.2], [T.sicilia, T.sicilia + 1]], golpes: [] },
});
