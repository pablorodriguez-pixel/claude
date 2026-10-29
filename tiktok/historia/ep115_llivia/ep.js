/* Ep. 115 · «Este pueblo es español… y está dentro de Francia» (Llívia). Tratado de los Pirineos (1659): España cede 33 «aldeas» de la Cerdaña y comarcas vecinas;
   Llívia tenía título de villa (Carlos I/V) y se quedó en España (Tratado de Llívia, 1660). ~1.500 habitantes; la N-154 cruza territorio francés.
   El tratado se firmó en la isla de los Faisanes (Bidasoa, entre Irún y Hendaya), que es española de febrero a julio y francesa de agosto a enero.
   En 1660 Velázquez preparó allí el encuentro de Felipe IV y Luis XIV; volvió agotado a Madrid y murió el 6 de agosto de 1660.
   ESTRATEGIA §8-10: imagen-idea en el fotograma 0 (un punto de España dentro de Francia bajo la lupa), todo en movimiento, la imagen enseña lo que dice la voz. */
Story.prepara();
const T = {
  pueblo0: Q('este pueblo'), francia0: Q('dentro de francia'), palabra: Q('una sola palabra'),
  anio: Q('mil seiscientos cincuenta y nueve'), pierde: Q('pierde la guerra'), treinta: Q('treinta y tres'), pirineos: Q('de los pirineos'),
  decia: Q('el tratado decía'), aldeas: Q('aldeas'), noera: Q('no era una aldea'), villa: Q('una villa'), carlos: Q('carlos quinto'),
  sequedo: Q('se quedó en españa'), rodeada: Q('rodeada de francia'), hoy: Q('hasta hoy'), personas: Q('mil quinientas personas'), carretera: Q('su carretera'), cruza: Q('territorio francés'),
  raro: Q('lo más raro'), isla: Q('una isla'), bidasoa: Q('bidasoa'), cambia: Q('cambia de país'),
  febrero: Q('de febrero a julio'), agosto: Q('de agosto a enero'), siglo: Q('más de un siglo'),
  misma: Q('esa misma isla'), pintor: Q('el pintor'), reyes: Q('los dos reyes'), velazquez: Q('velázquez'),
  agotado: Q('agotado'), murio: Q('murió'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const C_ES = '#f2c230', C_FR = '#5b8fd6', C_MAR = '#9fd0ee', C_PERG = '#f4e4c0';
const SPAIN = 'M90,120 L200,80 L320,86 L420,92 L560,112 L640,150 L720,170 L800,180 L900,200 L880,280 L800,380 L740,450 L760,540 L700,620 L640,700 L520,730 L400,742 L300,760 L230,700 L200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L60,170 Z';
const FRANCE = 'M520,108 L560,112 L640,150 L720,170 L800,180 L860,120 L900,-40 L820,-200 L640,-330 L420,-360 L300,-280 L340,-160 L240,-110 L300,-20 L420,40 Z';
const OX = 40, OY = 760, LX = 700, LY = 150;   // Llívia en (740, 910) de la cámara; la frontera pasa justo debajo
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* el mapa: España (amarilla) y Francia (azul) con los Pirineos; Llívia como una mancha amarilla dentro de Francia */
function mapa(cam, o = {}) {
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: C_MAR, backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0 3px, transparent 3px 60px)' });
  const m = box(cam, OX, OY, 1000, 800, { zIndex: 2 }, `<svg viewBox="0 -400 1000 1200" width="1000" height="1200" style="position:absolute;top:-400px;overflow:visible">
    <path d="${FRANCE}" fill="${C_FR}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="${SPAIN}" fill="${C_ES}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M560,112 L600,122 L640,150 L680,160 L720,170 L760,172 L800,180" stroke="#7a5a3a" stroke-width="22" fill="none" stroke-dasharray="6 18" stroke-linecap="round" opacity=".6"/>
    <text x="430" y="420" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="80" fill="rgba(43,33,24,.45)">ESPAÑA</text><text x="600" y="-120" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="80" fill="rgba(255,255,255,.7)">FRANCIA</text>
    <circle class="lliv" cx="${LX}" cy="${LY - 24}" r="9" fill="${C_ES}" stroke="${INK}" stroke-width="4"/></svg>`);
  return m;
}
const casita = (col, w = 70) => `<svg viewBox="0 0 70 70" width="${w}" height="${w}"><path d="M8,32 L35,8 L62,32 L62,64 L8,64Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="28" y="42" width="14" height="22" fill="#6b4a2a" stroke="${INK}" stroke-width="3"/></svg>`;
const PERGAMINO = (c, x, y, w, h, html, z = 10) => box(c, x, y, w, h, { zIndex: z, background: C_PERG, border: `10px solid ${INK}`, borderRadius: '14px', boxShadow: `14px 14px 0 ${INK}`, padding: '44px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, transformOrigin: '50% 50%' }, html);

/* PORTADA + L0-L1: el mapa de España y Francia; la lupa baja hasta un puntito amarillo dentro de Francia: «LLÍVIA (España)»; «ESTE PUEBLO ES ESPAÑOL… Y ESTÁ EN FRANCIA» */
plano(-1, L(2) - 0.1, { background: C_MAR }, c => {
  const cam = CAM(c); const m = mapa(cam);
  // la lupa: un círculo con el interior ampliado (Francia azul con la mancha amarilla de Llívia)
  const lupa = box(cam, 0, 0, 380, 380, { zIndex: 8, borderRadius: '50%', border: `16px solid ${INK}`, overflow: 'hidden', boxSizing: 'border-box', background: C_FR, boxShadow: '0 20px 40px rgba(0,0,0,.35)' },
    `<div style="position:absolute;left:0;right:0;bottom:0;height:70px;background:${C_ES};border-top:8px solid ${INK}"></div><div class="mancha" style="position:absolute;left:110px;top:90px;width:140px;height:110px;border-radius:50% 46% 52% 44%;background:${C_ES};border:8px solid ${INK};box-sizing:border-box"></div>
     <div style="position:absolute;left:0;right:0;top:220px;text-align:center;font-family:Bricolage;font-weight:800;font-size:40px;color:#fff;text-shadow:3px 3px 0 ${INK}">Llívia</div>`);
  const mango = box(cam, 0, 0, 60, 220, { zIndex: 7, background: '#6b4a2a', border: `10px solid ${INK}`, borderRadius: '20px', transformOrigin: '50% 0%' });
  const t1 = texto(c, 290, 'ESTE PUEBLO ES ESPAÑOL', { size: 62, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 375, `…y está en ${hlSpan('FRANCIA', 'phl', '#5b8fd6')}`, { size: 104, color: '#fff', z: 40, shadow: OUT });
  const pal = chip(c, 260, 1475, 'por UNA sola palabra', { size: 62, bg: RED, z: 41 });
  sfx('swoosh_up', 0.05, 0.4); sp(T.francia0, 'ding', 0.6); sp(T.palabra, 'stamp', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(2), [620, 900, 0.95], [700, 900, 1.15]);
    // la lupa viaja desde el sur de España hasta Llívia y se queda encima, temblando un poco
    const k = p(t, 0.0, 1.6, E.inOutCubic); const lx = lerp(360, OX + LX, k) + Math.sin(t * 2.2) * 8, ly = lerp(1300, OY + LY - 24, k) + Math.cos(t * 1.8) * 8;
    set(lupa, { x: lx - 190, y: ly - 190 - 220 * k, s: lerp(0.6, 1, k) }); set(mango, { x: lx + 80, y: ly - 60 - 220 * k, r: -35, s: lerp(0.6, 1, k) });
    const mn = lupa.querySelector('.mancha'); if (mn) mn.style.transform = `scale(${f1((1 + 0.06 * Math.sin(t * 5)) * 100) / 100})`;
    const ll = m.querySelector('.lliv'); if (ll) ll.setAttribute('r', f1(9 + 3 * Math.sin(t * 5)));
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
    popA(pal, t, T.palabra - 0.1, { r: -3 });
  };
}, { sfx: false });

/* L2 (corte): 1659: el pergamino del tratado; 33 casitas amarillas de los Pirineos cruzan la frontera y se vuelven azules */
plano(L(2) - 0.1, L(3) - 0.1, { background: C_MAR }, c => {
  const cam = CAM(c); mapa(cam);
  const per = PERGAMINO(c, 140, 300, 800, 340, `<div style="font-family:Bricolage;font-weight:800;font-size:44px;text-align:center">TRATADO DE LOS PIRINEOS</div><div style="font-size:120px;font-weight:900;text-align:center;line-height:1.1">1659</div>`, 40);
  const casas = [...Array(33)].map((_, i) => box(cam, 0, 0, 46, 46, { zIndex: 6 }, casita(C_ES, 46)));
  const cont = chip(c, 330, 1475, '33 pueblos para Francia', { size: 58, bg: C_FR, z: 41 });
  sp(T.anio, 'stamp', 0.5); sp(T.pierde, 'thud', 0.5); sp(T.treinta, 'swoosh_up', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [640, 1000, 1.0], [680, 920, 1.25]);
    set(per, { o: t < T.treinta - 0.3 ? 1 : 0, s: pop(t, L(2) - 0.1, 0.35), r: -2 + Math.sin(t * 1.2) * 1.2 });
    casas.forEach((h, i) => {
      const bx = OX + 560 + (i % 11) * 22, by = OY + 200 + Math.floor(i / 11) * 40, ex = OX + 520 + (i % 11) * 34, ey = OY + 60 - Math.floor(i / 11) * 52;
      const k = p(t, T.treinta - 0.2 + i * 0.05, 0.6, E.inOutCubic);
      set(h, { o: t > T.anio ? 1 : 0, x: lerp(bx, ex, k), y: lerp(by, ey, k) + Math.sin(t * 4 + i) * 2 });
      const svgp = h.querySelector('path'); if (svgp) svgp.setAttribute('fill', k > 0.5 ? C_FR : C_ES);
    });
    set(cont, { o: t > T.treinta - 0.1 ? 1 : 0, s: pop(t, T.treinta - 0.1, 0.3), r: -3 });
  };
});

/* L3 (corte): el texto del tratado: «…33 ALDEAS…» subrayado; Llívia con su cartel de «VILLA» y el sello de Carlos V; la casa se queda amarilla */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.06) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.06) 2px, transparent 2px)', backgroundSize: '80px 80px' });
  const per = PERGAMINO(cam, 110, 320, 860, 520, `<div style="font-size:40px;opacity:.6">…y el Rey de España cederá…</div><div style="font-size:84px;font-weight:900;margin-top:24px;line-height:1.1">33 <span style="position:relative;display:inline-block;z-index:0"><span class="sub" style="position:absolute;left:-8px;right:-8px;bottom:6%;height:40%;background:${YEL};z-index:-1;transform-origin:0 50%;transform:scaleX(0)"></span>ALDEAS</span></div><div style="font-size:40px;opacity:.6;margin-top:24px">de la Cerdaña…</div>`, 3);
  const casa = box(cam, 340, 980, 400, 400, { zIndex: 4, transformOrigin: '50% 100%' }, casita(C_ES, 400));
  const cartel = box(cam, 300, 1380, 480, 140, { zIndex: 5, background: '#fbf6ea', border: `9px solid ${INK}`, borderRadius: '18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '96px', textAlign: 'center', lineHeight: '122px', color: RED, transformOrigin: '50% 50%' }, 'VILLA');
  const sello = box(cam, 720, 1250, 240, 240, { zIndex: 6, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 240 240" width="240" height="240"><circle cx="120" cy="120" r="104" fill="#b5523a" stroke="${INK}" stroke-width="8"/><circle cx="120" cy="120" r="80" fill="none" stroke="#f4e4c0" stroke-width="5" stroke-dasharray="8 6"/><path d="M80,110 L92,80 L106,102 L120,72 L134,102 L148,80 L160,110Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><text x="120" y="160" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="38" fill="#f4e4c0">Carlos V</text></svg>`);
  const no = chip(c, 260, 1475, 'Llívia NO era una aldea', { size: 58, bg: INK, color: YEL, z: 40 });
  sp(T.aldeas, 'pop', 0.5); sp(T.noera, 'error', 0.4); sp(T.villa, 'tada', 0.6); sp(T.carlos, 'stamp', 0.8);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [540, 700, 1.0], [540, 1180, 0.98]);
    const sb = per.querySelector('.sub'); if (sb) sb.style.transform = `scaleX(${f1(p(t, T.aldeas - 0.1, 0.4) * 1000) / 1000})`;
    set(per, { r: -2 + Math.sin(t * 1.1) * 1 });
    set(casa, { o: t > T.noera - 0.3 ? 1 : 0, s: pop(t, T.noera - 0.3, 0.4), r: Math.sin(t * 1.6) * 1.5 });
    set(cartel, { o: t > T.villa - 0.1 ? 1 : 0, s: pop(t, T.villa - 0.1, 0.35), r: -4 + Math.sin(t * 2) * 2 });
    set(sello, { o: t > T.carlos - 0.1 ? 1 : 0, s: t > T.carlos - 0.1 ? lerp(1.8, 1, p(t, T.carlos - 0.1, 0.2)) : 0, r: -14 });
    set(no, { o: t > T.noera - 0.1 && t < T.villa + 0.6 ? 1 : 0, s: pop(t, T.noera - 0.1, 0.3), r: -3 });
  };
});

/* L4 (corte): hoy: Llívia (casitas amarillas) en medio de campos azules franceses; ~1.500 vecinos; su carretera a España atraviesa una franja francesa */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#7fbfe8' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: C_FR, backgroundImage: 'repeating-linear-gradient(35deg, rgba(255,255,255,.12) 0 30px, transparent 30px 70px)' });
  box(cam, -800, 1480, 2680, 1400, { zIndex: 1, background: C_ES, borderTop: `12px dashed ${INK}` });
  const isla = box(cam, 220, 520, 640, 520, { zIndex: 2, borderRadius: '48% 52% 46% 54%', background: C_ES, border: `12px solid ${INK}`, transformOrigin: '50% 50%' });
  const casas = [[300, 640], [420, 600], [540, 650], [660, 620], [360, 780], [500, 800], [630, 780], [440, 900]].map(([x, y], i) => box(cam, x, y, 90, 90, { zIndex: 3 }, casita(i % 3 ? '#fbf6ea' : '#e9c79a', 90)));
  const carr = box(cam, 520, 1020, 60, 480, { zIndex: 2, background: '#55525c', border: `6px solid ${INK}` });
  const coche = box(cam, 520, 0, 60, 100, { zIndex: 4, background: RED, border: `6px solid ${INK}`, borderRadius: '16px' });
  const fr = ['FRANCIA', 'FRANCIA', 'FRANCIA', 'FRANCIA'].map((s, i) => box(cam, [[-60, 380], [880, 420], [-40, 1180], [860, 1200]][i][0], [[-60, 380], [880, 420], [-40, 1180], [860, 1200]][i][1], 300, 80, { zIndex: 2, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '52px', color: '#fff', textShadow: `3px 3px 0 ${INK}` }, s));
  const esp = box(cam, 340, 1560, 400, 90, { zIndex: 2, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '64px', color: INK, textAlign: 'center' }, 'ESPAÑA');
  const nombre = texto(c, 280, 'Llívia', { size: 120, color: '#fff', z: 40, shadow: OUT });
  const vec = chip(c, 320, 430, '≈ 1.500 vecinos', { size: 62, bg: INK, color: YEL, z: 40 });
  const cruza = chip(c, 220, 1475, 'la carretera cruza Francia', { size: 58, bg: RED, z: 40 });
  sp(T.rodeada, 'whoosh', 0.5); sp(T.personas, 'pop', 0.5); sp(T.carretera, 'swoosh_up', 0.5);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(5) - 0.1, [540, 800, 0.95], [540, 1100, 0.9]);
    set(isla, { s: 1 + 0.02 * Math.sin(t * 2) }); casas.forEach((h, i) => set(h, { y: Math.sin(t * 3 + i) * 3 }));
    fr.forEach((f, i) => set(f, { o: t > T.rodeada - 0.2 + i * 0.12 ? 1 : 0, s: pop(t, T.rodeada - 0.2 + i * 0.12, 0.3), r: (i % 2 ? 6 : -6) + Math.sin(t * 2 + i) * 2 }));
    const kc = ((t - T.carretera) * 0.45) % 1; set(coche, { o: t > T.carretera - 0.2 ? 1 : 0, y: lerp(1000, 1560, t > T.carretera ? kc : 0) });
    set(nombre, { r: -2 + wobble(t, 0.5, 0.6) }); set(vec, { o: t > T.personas - 0.1 ? 1 : 0, s: pop(t, T.personas - 0.1, 0.3), r: -3 });
    set(cruza, { o: t > T.cruza - 0.4 ? 1 : 0, s: pop(t, T.cruza - 0.4, 0.3), r: -3 });
  };
});

/* L5-L7 (corte): el río Bidasoa con la isla en medio, Irún a la izquierda y Hendaya a la derecha; los meses pasan y la isla cambia de color: feb-jul España, ago-ene Francia */
plano(L(5) - 0.1, L(8) - 0.1, { background: '#8fb46a' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#8fb46a' });
  const rio = box(cam, 300, -600, 480, 3120, { zIndex: 1, background: '#4a8fc8', borderLeft: `10px solid ${INK}`, borderRight: `10px solid ${INK}` });
  const ondas = box(cam, 300, -600, 480, 3120, { zIndex: 2, backgroundImage: 'repeating-linear-gradient(transparent 0 60px, rgba(255,255,255,.25) 60px 66px)' });
  const isla = box(cam, 380, 820, 320, 420, { zIndex: 3, borderRadius: '50% 46% 52% 48%', border: `10px solid ${INK}`, background: '#6fae5a', transformOrigin: '50% 50%' }, `<svg viewBox="0 0 320 420" width="300" height="400"><circle cx="120" cy="140" r="40" fill="#2e6b3a" stroke="${INK}" stroke-width="5"/><circle cx="200" cy="230" r="46" fill="#2e6b3a" stroke="${INK}" stroke-width="5"/><circle cx="120" cy="300" r="36" fill="#2e6b3a" stroke="${INK}" stroke-width="5"/></svg>`);
  const capa = box(cam, 380, 820, 320, 420, { zIndex: 4, borderRadius: '50% 46% 52% 48%', opacity: 0.7 });
  const irun = box(cam, -40, 600, 320, 90, { zIndex: 4, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', color: INK, textAlign: 'center' }, 'Irún'), hend = box(cam, 800, 600, 320, 90, { zIndex: 4, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', color: INK, textAlign: 'center' }, 'Hendaya');
  const ie = box(cam, -40, 690, 320, 60, { zIndex: 4, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: '#b5523a', textAlign: 'center' }, 'España'), hf = box(cam, 800, 690, 320, 60, { zIndex: 4, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: '#1f4fa0', textAlign: 'center' }, 'Francia');
  const MES = ['ENE', 'FEB', 'C_MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const cal = box(c, 380, 440, 320, 200, { zIndex: 40, background: '#fff', border: `9px solid ${INK}`, borderRadius: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '110px', textAlign: 'center', lineHeight: '180px', color: INK }, 'FEB');
  const pais = texto(c, 280, 'ESPAÑOLA', { size: 110, color: '#fff', z: 40, shadow: OUT });
  const seis = chip(c, 240, 1475, 'cambia de país cada 6 meses', { size: 56, bg: INK, color: YEL, z: 40 });
  const nom = chip(c, 300, 1475, 'isla de los Faisanes', { size: 56, bg: '#2e6b3a', z: 40 });
  sp(T.isla, 'whoosh', 0.5); sp(T.cambia, 'boing', 0.5); sp(T.febrero, 'ding', 0.5); sp(T.agosto, 'ding', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(8) - 0.1, [540, 700, 0.9], [540, 1000, 1.05]);
    set(ondas, { y: (t * 80) % 66 }); set(isla, { r: Math.sin(t * 1.2) * 2 });
    // los meses: antes de «febrero» van despacio; durante L7 dan vueltas (2 meses por segundo) y la isla sigue el calendario
    const m = t < T.febrero - 0.2 ? 1 : Math.floor(1 + (t - T.febrero + 0.2) * 2.2) % 12;
    const esp = m >= 1 && m <= 6;
    const enCal = t > T.cambia - 0.3; ponTxt(cal, MES[m]); set(cal, { o: enCal ? 1 : 0, s: pop(t, T.cambia - 0.3, 0.3), r: -3 + Math.sin(t * 3) * 2 });
    capa.style.background = esp ? 'repeating-linear-gradient(#c8102e 0 33%, #f2c230 33% 66%, #c8102e 66%)' : 'linear-gradient(90deg, #1f4fa0 0 33%, #fff 33% 66%, #c8102e 66%)';
    set(capa, { o: enCal ? 0.75 : 0, r: Math.sin(t * 1.2) * 2 });
    ponTxt(pais, esp ? 'ESPAÑOLA' : 'FRANCESA'); set(pais, { o: enCal ? 1 : 0, r: -2 + wobble(t, 0.5, 0.6) });
    set(seis, { o: t > T.cambia - 0.1 && t < T.febrero - 0.2 ? 1 : 0, s: pop(t, T.cambia - 0.1, 0.3), r: -3 });
    set(nom, { o: t > T.bidasoa - 0.1 && (t < T.cambia - 0.1 || t > T.febrero - 0.2) ? 1 : 0, s: pop(t, T.bidasoa - 0.1, 0.3), r: -2 });
  };
});
const ponTxt = (e, s) => { if (e.textContent !== s) e.textContent = s; };

/* L8-L9 (corte): 1660: el pabellón en la isla, dos reyes con corona frente a frente y Velázquez (bigote, de negro) organizándolo todo; luego, en Madrid, la vela se apaga */
plano(L(8) - 0.1, L(10) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#f7d6a0, #efe1c6)' });
  const pab = box(cam, 120, 380, 840, 600, { zIndex: 1 }, `<svg viewBox="0 0 840 600" width="840" height="600"><path d="M40,200 L420,30 L800,200Z" fill="#c8102e" stroke="${INK}" stroke-width="10"/><rect x="80" y="200" width="680" height="400" fill="#fbf6ea" stroke="${INK}" stroke-width="10"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${120 + i * 130}" y="200" width="30" height="400" fill="#e9c75c" stroke="${INK}" stroke-width="5"/>`).join('')}<path d="M80,200 Q420,280 760,200" stroke="${GOLD}" stroke-width="10" fill="none"/></svg>`);
  const rey1 = PERS(cam, 120, 760, 300, { ropa: '#3d3a44', gorro: 'corona', pelo: 'largo', pcol: '#c9a45c', bigote: 'corto', z: 4 }), rey2 = PERS(cam, 660, 760, 300, { ropa: '#1f4fa0', gorro: 'corona', pelo: 'largo', pcol: '#3a2a1e', z: 4 });
  const vel = PERS(cam, 360, 860, 360, { ropa: '#1d1a22', pelo: 'largo', pcol: '#2a2118', bigote: 'dali', z: 5 });
  const paleta = box(cam, 640, 1100, 140, 100, { zIndex: 6 }, `<svg viewBox="0 0 140 100" width="140" height="100"><path d="M70,6 Q136,10 130,60 Q120,96 70,92 Q60,70 40,80 Q4,90 10,50 Q16,8 70,6Z" fill="#d9b48a" stroke="${INK}" stroke-width="6"/>${[[40, 34, RED], [70, 26, '#2b8ad6'], [100, 36, YEL], [108, 64, '#2e9e6b']].map(([x, y, col]) => `<circle cx="${x}" cy="${y}" r="10" fill="${col}" stroke="${INK}" stroke-width="3"/>`).join('')}</svg>`);
  const ano = chip(c, 380, 300, '1660', { size: 80, bg: INK, color: YEL, z: 40 });
  const nom = texto(c, 280, 'VELÁZQUEZ', { size: 120, color: '#fff', z: 40, shadow: OUT });
  // L9: Madrid, de noche: Velázquez cansado y una vela que se apaga
  const noche = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: '#1d1a2e' });
  const vel2 = PERS(noche, 300, 700, 460, { ropa: '#1d1a22', pelo: 'largo', pcol: '#2a2118', bigote: 'dali', z: 2 });
  const vela = box(noche, 820, 1100, 80, 260, { zIndex: 3 }, `<svg viewBox="0 0 80 260" width="80" height="260"><rect x="20" y="80" width="40" height="180" fill="#fbf6ea" stroke="${INK}" stroke-width="5"/><path class="llama" d="M40,10 Q62,50 40,76 Q18,50 40,10Z" fill="#ffb02e" stroke="${INK}" stroke-width="4"/></svg>`);
  const luz = box(noche, 0, 0, 1080, 1920, { zIndex: 1, background: 'radial-gradient(circle at 860px 1130px, rgba(255,200,100,.35), transparent 45%)' });
  const humo = [0, 1, 2].map(i => box(noche, 830, 1080, 60, 60, { zIndex: 3, borderRadius: '50%', background: 'rgba(220,220,230,.55)' }));
  const mad = chip(noche, 360, 330, 'Madrid, agosto de 1660', { size: 54, bg: '#3d3a52', color: '#fff', z: 4 });
  sp(T.misma, 'whoosh', 0.4); sp(T.reyes, 'tada', 0.5); sp(T.velazquez, 'stamp', 0.8); sp(T.agotado, 'mus_baja', 0.6); sp(T.murio + 0.3, 'harpa', 0.4);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 860, 0.95], [520, 1000, 1.1]);
    pFace(rey1, t, { feliz: 0.6, look: [16, 0], seed: 51 }); pFace(rey2, t, { feliz: 0.6, look: [-16, 0], seed: 52 });
    set(rey1, { y: wobble(t, 0.5, 3), o: t > T.reyes - 0.3 ? 1 : 0 }); set(rey2, { y: wobble(t, 0.55, 3, 1), o: t > T.reyes - 0.3 ? 1 : 0 });
    pFace(vel, t, { feliz: 0.5, ceja: 6, look: [0, -8], seed: 53 }); set(vel, { o: t > T.pintor - 0.3 ? 1 : 0, s: pop(t, T.pintor - 0.3, 0.4), y: wobble(t, 0.7, 4) }); set(paleta, { o: t > T.pintor - 0.3 ? 1 : 0, r: Math.sin(t * 2) * 6 });
    set(ano, { o: t > T.misma - 0.1 && t < T.velazquez - 0.1 ? 1 : 0, s: pop(t, T.misma - 0.1, 0.3), r: -3 });
    set(nom, { o: t > T.velazquez - 0.1 && t < L(9) - 0.3 ? 1 : 0, s: pop(t, T.velazquez - 0.1, 0.35), r: -3 + wobble(t, 0.5, 0.8) });
    const kn = p(t, L(9) - 0.3, 0.5, E.outCubic); noche.style.transformOrigin = '540px 1100px'; set(noche, { o: t > L(9) - 0.3 ? kn : 0, s: 1 + 0.16 * clamp((t - L(9) + 0.3) / 4.5) });
    pFace(vel2, t, { feliz: -0.6, ceja: 4, look: [10, 14], seed: 54 }); set(vel2, { y: wobble(t, 0.4, 3) + clamp((t - T.agotado) / 2) * 30 });
    const ll = vela.querySelector('.llama'); const apagada = t > T.murio + 0.3; if (ll) { ll.style.opacity = apagada ? 0 : 1; ll.setAttribute('transform', `scale(1 ${f1(0.9 + 0.1 * Math.sin(t * 12))})`); }
    luz.style.opacity = apagada ? Math.max(0, 1 - (t - T.murio - 0.3) / 0.4) : f1(0.8 + 0.2 * Math.sin(t * 9) * Math.sin(t * 4));
    humo.forEach((h, i) => { const k = ((t - T.murio - 0.3) * 0.7 + i * 0.33) % 1; set(h, { o: apagada ? 1 - k : 0, y: -k * 420, x: Math.sin(t * 2 + i) * 30, s: 0.6 + k * 1.6 }); });
    set(mad, { o: t > L(9) - 0.1 ? 1 : 0, s: pop(t, L(9) - 0.1, 0.3), r: -2 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Conocías Llívia?', '¿O un pueblo así de raro?', { size: 84, draw: c => [['¡he estado!', YEL], ['ni idea', PINK], ['el mío es más raro', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 260 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(115, 'Llívia', ['FRONTERAS', 'raras']);

Story.run({
  textura: true,
  ovalo: [[T.velazquez + 0.4, L(9) - 0.4]],
  vecino: { risa: [], sorpresa: [[T.cambia, T.cambia + 1]], golpes: [] },
});
