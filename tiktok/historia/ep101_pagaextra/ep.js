/* Ep. 101 · «Tu paga extra de verano te la puso Franco» — FORMATO NUEVO (cuento continuo). Gancho de dos golpes (Franco → «un día muy concreto»: el calendario corre hasta el 18).
   Cada escena con la cámara en movimiento lento y continuo; cortes solo entre escenas. */
Story.prepara();
const T = {
  franco0: Q('franco'),
  casualidad: Q('por casualidad'), concreto: Q('muy concreto'),
  cuarenta2: Q('años cuarenta'), posguerra: Q('posguerra'), comer: Q('para comer'),
  navidad: Q('la navidad'), regalo: Q('de regalo'), semana3: Q('una semana'), fiestas: Q('las fiestas'),
  siete: Q('cuarenta y siete'), otra: Q('llega otra'), fecha: Q('la fecha'), dieciocho: Q('dieciocho de julio'),
  aniversario: Q('el aniversario'), golpe: Q('golpe de estado'), oficialmente: Q('oficialmente'), fiesta5: Q('fiesta de exaltación'),
  antes: Q('el día antes'), cobra: Q('toda españa cobra'), celebrarlo: Q('celebrarlo'),
  anos7: Q('con los años'), mes: Q('un mes'),
  democracia: Q('la democracia'), nombres: Q('los nombres'), queda: Q('se queda'), hoy: Q('hasta hoy'),
  llegue: Q('te llegue'), viene: Q('de dónde viene'), prorrateada: Q('prorrateada'), ente: Q('ni se entera'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const VERDE = '#2e6b3a';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const FRANCO = (c, x, y, w) => PERS(c, x, y, w, { ropa: '#5d6b4a', gorro: 'gorra', gcol: '#5d6b4a', bigote: true, pelo: 'corto', pcol: '#2a2118' });
/* nómina (vb 0 0 600 760) con la fila «PAGA EXTRA» resaltada (.fila) */
const NOMINA = (c, w = 600) => box(c, 0, 0, w, w * 760 / 600, { zIndex: 6, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 600 760" width="${w}" height="${w * 760 / 600}"><rect x="6" y="6" width="588" height="748" rx="10" fill="#fbf6ea" stroke="${INK}" stroke-width="8"/>
  <text x="300" y="90" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="${INK}">NÓMINA</text><path d="M50,120 H550" stroke="${INK}" stroke-width="5"/>
  ${[0, 1, 2].map(i => `<path d="M60,${190 + i * 70} H340" stroke="${INK}" stroke-width="6" opacity=".35"/><path d="M420,${190 + i * 70} H540" stroke="${INK}" stroke-width="6" opacity=".35"/>`).join('')}
  <rect class="fila" x="30" y="400" width="540" height="110" rx="12" fill="${YEL}" stroke="${INK}" stroke-width="6"/><text x="60" y="473" font-family="Bricolage" font-weight="800" font-size="50" fill="${INK}">PAGA EXTRA</text><text x="540" y="473" text-anchor="end" font-family="Bricolage" font-weight="800" font-size="50" fill="${VERDE}">+1 mes</text>
  <path d="M60,600 H540" stroke="${INK}" stroke-width="6" opacity=".35"/><text x="300" y="700" text-anchor="middle" font-family="SpecialElite" font-size="40" fill="${INK}">JULIO</text></svg>`);
/* hoja de calendario: mes arriba y número grande (se cambia con .mes y .dia) */
const CALEN = (c, w = 340) => { const d = box(c, 0, 0, w, w * 1.15, { zIndex: 7, transformOrigin: '50% 0', background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '18px', boxShadow: `10px 10px 0 rgba(0,0,0,.25)`, overflow: 'hidden', textAlign: 'center' },
  `<div class="mes" style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:${w * 0.16}px;line-height:${w * 0.26}px;border-bottom:6px solid ${INK}">JULIO</div><div class="dia" style="font-family:Playfair;font-weight:900;font-size:${w * 0.52}px;line-height:${w * 0.8}px;color:${INK}">?</div>`);
  d.mes = d.querySelector('.mes'); d.dia = d.querySelector('.dia'); return d; };
const SOBRE = (c, w = 420, txt = '') => { const d = box(c, 0, 0, w, w * 0.62, { zIndex: 9, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 420 260" width="${w}" height="${w * 0.62}" style="overflow:visible"><rect x="6" y="6" width="408" height="248" rx="12" fill="#f4e6b0" stroke="${INK}" stroke-width="8"/><path d="M6,14 L210,140 L414,14" fill="none" stroke="${INK}" stroke-width="7"/><rect x="60" y="160" width="300" height="70" rx="10" fill="#fbf6ea" stroke="${INK}" stroke-width="5"/><text class="tx" x="210" y="210" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">${txt}</text></svg>`);
  d.tx = d.querySelector('.tx'); return d; };
const BILLETE = (c, z = 20) => box(c, 0, 0, 150, 76, { zIndex: z, background: '#9fd3a0', border: `5px solid ${INK}`, borderRadius: '8px', fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', lineHeight: '66px', color: INK, transformOrigin: '50% 50%' }, '€');

/* PORTADA + L1 (sin cortar): la nómina con «PAGA EXTRA» brillando, el calendario en «JULIO ?» y Franco asomando → «un día muy concreto»: el calendario corre hasta el 18 */
plano(-1, L(2) - 0.1, { background: YEL }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: YEL, backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.25) 0 9deg, transparent 9deg 18deg)' });
  const nom = NOMINA(cam, 560); const fila = nom.querySelector('.fila');
  const cal = CALEN(cam, 330);
  const fr = FRANCO(cam, 70, 1080, 330);
  const bil = [...Array(8)].map(() => BILLETE(cam, 5));
  const t1 = texto(c, 170, 'TU PAGA EXTRA DE VERANO', { size: 62, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 255, 'TE LA PUSO ' + hlSpan('FRANCO', 'phl', RED), { size: 86, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.franco0, 'stamp', 0.9); sp(T.casualidad, 'tick', 0.5); sp(T.concreto - 0.9, 'clockfast', 0.7); sp(T.concreto + 0.1, 'ding', 0.8);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 1.0], [560, 960, 1.12]);
    set(nom, { x: 120, y: 520, r: -5 + Math.sin(t * 1.2) * 2 }); fila.setAttribute('fill', Math.sin(t * 6) > 0 ? YEL : '#ffe98a');
    // calendario: «?» hasta que corre del 1 al 18 justo antes de «muy concreto»
    const k = clamp((t - (T.concreto - 0.9)) / 0.9), dia = k <= 0 ? '?' : String(Math.max(1, Math.round(k * 18)));
    cal.dia.textContent = dia; cal.dia.style.color = k >= 1 ? RED : INK;
    set(cal, { x: 690, y: 470, r: 6 + (k > 0 && k < 1 ? Math.sin(t * 40) * 3 : 0), s: k >= 1 ? 1 + 0.15 * (1 - p(t, T.concreto, 0.3)) : 1 });
    pFace(fr, t, { feliz: 0.8, ceja: -6, look: [10, -8], seed: 1 }); set(fr, { y: (1 - p(t, 0, 0.5, E.outBack)) * 100 + Math.sin(t * 2) * 6, r: 6 });
    bil.forEach((b, i) => { const kk = ((t * 0.3 + i / 8) % 1); set(b, { x: 40 + (i * 131) % 1000, y: 300 + kk * 1300, r: t * 120 + i * 40, o: 0.9 }); });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L4): posguerra (corte): mesa casi vacía, la cartilla de racionamiento → Navidad de 1944: llega un sobre con «1 semana» */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#b8b0a0' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#c9bfae', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 70px, transparent 70px 140px)' });
  const fam = [[80, 760, 300, { ropa: '#5e5a52', pelo: 'calvo', bigote: true, pcol: '#3a2a1e' }], [380, 790, 280, { ropa: '#7a5aa8', pelo: 'moño', pcol: '#3a2a1e' }], [680, 860, 220, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' }]].map(([x, y, w, o]) => PERS(cam, x, y, w, o));
  const mesa = box(cam, 20, 1200, 1040, 260, { zIndex: 12, background: '#8a6a3a', borderTop: `10px solid ${INK}` });
  const plato = box(cam, 400, 1150, 280, 80, { zIndex: 13, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}` });
  const cartilla = box(cam, 80, 1240, 300, 190, { zIndex: 14, background: '#e9dcc2', border: `6px solid ${INK}`, transform: 'rotate(-6deg)', fontFamily: 'SpecialElite', fontSize: '30px', textAlign: 'center', paddingTop: '30px', boxSizing: 'border-box', color: INK }, 'CARTILLA DE<br>RACIONAMIENTO');
  const guir = box(cam, 0, 420, 1080, 120, { zIndex: 3 }, `<svg viewBox="0 0 1080 120" width="1080" height="120"><path d="M0,20 Q135,110 270,20 Q405,110 540,20 Q675,110 810,20 Q945,110 1080,20" stroke="${VERDE}" stroke-width="24" fill="none"/>${[135, 405, 675, 945].map(x => `<circle cx="${x}" cy="72" r="18" fill="${RED}" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const sobre = SOBRE(cam, 420, '1 SEMANA');
  const ch = chip(c, 330, 420, 'Posguerra · años 40', { size: 52, bg: '#5e5a52' }), nav = chip(c, 380, 420, 'Navidad · 1944', { size: 56, bg: VERDE });
  sp(T.posguerra, 'sad', 0.5); sp(T.navidad, 'harpa', 0.7); sp(T.semana3, 'pop', 0.7); sp(T.fiestas, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 1000, 1.0], [540, 980, 1.14]);
    const nv = t > T.navidad - 0.2;
    rotuloA(ch, t, T.cuarenta2, T.navidad - 0.2); rotuloA(nav, t, T.navidad, L(4));
    fam.forEach((f, i) => pFace(f, t, { feliz: t > T.semana3 ? 1 : -0.6, ceja: t > T.semana3 ? -4 : 14, look: t > T.semana3 ? [0, 8] : [0, 10], closed: t > T.fiestas && i === 2, seed: i }));
    set(guir, { o: nv ? 1 : 0, y: (1 - p(t, T.navidad - 0.2, 0.4, E.outBack)) * -200 });
    const ks = p(t, T.regalo - 0.2, 0.6, E.outBack); set(sobre, { o: t > T.regalo - 0.2 ? 1 : 0, x: 600, y: lerp(-300, 1010, ks), r: (1 - ks) * 30 - 4 });
  };
});

/* ACTO 2 (L4 → L6): el calendario de julio de 1947 (corte): el 18 se marca en rojo → susurro: debajo asoma el 18 de julio de 1936 → «Fiesta de Exaltación del Trabajo» */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#efe1c6' });
  const cal = box(cam, 120, 440, 840, 900, { zIndex: 3, background: '#fbf6ea', border: `10px solid ${INK}`, borderRadius: '24px', boxShadow: `14px 14px 0 rgba(0,0,0,.2)`, overflow: 'hidden' },
    `<div style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:84px;text-align:center;line-height:140px;border-bottom:8px solid ${INK}">JULIO <span class="an">1947</span></div>
     <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;padding:30px">${[...Array(31)].map((_, i) => `<div class="d${i + 1}" style="font-family:Playfair;font-weight:900;font-size:52px;text-align:center;line-height:96px;color:${INK};border-radius:50%">${i + 1}</div>`).join('')}</div>`);
  const d18 = cal.querySelector('.d18'), an = cal.querySelector('.an');
  const circ = box(cam, 0, 0, 150, 130, { zIndex: 5, border: `9px solid ${RED}`, borderRadius: '50%', transform: 'rotate(-8deg)' });
  const fant = texto(cam, 290, '18 · VII · 1936', { size: 110, color: '#2a2530', z: 6, shadow: `4px 4px 0 #fff` });
  const golpe = chip(c, 210, 1180, 'aniversario del golpe de Estado', { size: 46, bg: '#2a2530', z: 40 });
  const cinta = box(cam, -60, 650, 1200, 170, { zIndex: 8, background: '#c8102e', border: `8px solid ${INK}`, transformOrigin: '50% 50%', fontFamily: 'Rye', fontSize: '40px', color: YEL, textAlign: 'center', lineHeight: '150px', whiteSpace: 'nowrap' }, 'FIESTA DE EXALTACIÓN DEL TRABAJO');
  sp(T.siete, 'paper', 0.6); sp(T.dieciocho, 'stamp', 0.9); sp(T.aniversario - 0.2, 'mus_baja', 1); sp(T.golpe, 'thud', 0.7); sp(T.fiesta5, 'swoosh_up', 0.7);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 960, 0.95], [560, 1080, 1.1]);
    const r = d18.getBoundingClientRect ? null : null;
    // el 18: fila 3, columna 4 de la rejilla (7 columnas, empezando en 1)
    const col = (18 - 1) % 7, fila = Math.floor((18 - 1) / 7);
    set(circ, { o: t > T.dieciocho ? 1 : 0, x: 120 + 30 + col * ((840 - 60) / 7) - 22 + 8, y: 440 + 150 + 30 + fila * 104 - 18, s: pop(t, T.dieciocho, 0.35), r: -8 });
    d18.style.color = t > T.dieciocho ? RED : INK;
    set(fant, { o: t > T.golpe - 0.3 ? 0.85 : 0, s: pop(t, T.golpe - 0.3, 0.4), r: -3 }); set(golpe, { o: t > T.golpe ? 1 : 0, s: pop(t, T.golpe, 0.3), r: 2 });
    set(cinta, { o: t > T.fiesta5 - 0.1 ? 1 : 0, s: t > T.fiesta5 - 0.1 ? lerp(1.4, 1, p(t, T.fiesta5 - 0.1, 0.3)) : 0, r: -8 });
  };
});

/* ACTO 3 (L6 → L7): la ventanilla de pago (corte): cola de trabajadores; cada uno sale con su sobre */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#d8cdb8' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#d8cdb8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 80px, transparent 80px 160px)' });
  box(cam, -400, 1400, 1880, 1000, { zIndex: 1, background: '#8a7a5a', borderTop: `10px solid ${INK}` });
  const caja = box(cam, 640, 520, 420, 900, { zIndex: 2, background: '#6b4a2a', border: `8px solid ${INK}` }, `<div style="margin:40px 50px;background:#fbf6ea;border:6px solid ${INK};font-family:Rye;font-size:64px;text-align:center;line-height:110px;color:${INK}">CAJA</div><div style="margin:20px 70px;height:260px;background:#3d3a44;border:6px solid ${INK};border-radius:16px 16px 0 0"></div>`);
  const cola = [...Array(4)].map((_, i) => PERS(cam, 0, 0, 260, { ropa: ['#5e5a52', '#2b3550', '#6b4a2a', '#3d5a4a'][i], gorro: i % 2 ? 'gorra' : undefined, gcol: '#5e5a52', pelo: 'corto', pcol: '#3a2a1e', piernas: true, calzas: '#3d3a44' }));
  const sobres = cola.map(() => SOBRE(cam, 150, ''));
  const ext = chip(c, 330, 420, '+ 1 semana de sueldo', { size: 56, bg: VERDE, z: 40 });
  sp(T.cobra, 'pop', 0.6); sp(T.cobra + 0.6, 'pop', 0.6); sp(T.celebrarlo, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [460, 960, 1.0], [520, 980, 1.1]);
    cola.forEach((f, i) => { const ki = p(t, T.antes + i * 0.6, 0.8, E.inOutCubic); const x = lerp(-80 + i * 0, 0, 0) + 420 - i * 200 + ki * 120; set(f, { x, y: 820, r: 0 }); pFace(f, t, { feliz: t > T.cobra + i * 0.6 ? 1 : 0.1, look: [14, 0], seed: i }); });
    sobres.forEach((s, i) => { const t0 = T.cobra + i * 0.6; set(s, { o: t > t0 ? 1 : 0, x: 560 - i * 200 + 120 * p(t, T.antes + i * 0.6, 0.8), y: 1060, s: pop(t, t0, 0.3), r: -10 }); });
    set(ext, { o: t > T.cobra ? 1 : 0, s: pop(t, T.cobra, 0.35), r: -3 });
  };
});

/* ACTO 4 (L7 → L9): el sobre crece de «1 SEMANA» a «1 MES» → los años pasan en el calendario (1947 → 1977 → HOY) y el sobre se queda: «PAGA EXTRA» */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#9fd3c0' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#9fd3c0', backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 55%, rgba(255,255,255,.18) 0 9deg, transparent 9deg 18deg)' });
  const sobre = SOBRE(cam, 520, '1 SEMANA'); set(sobre, { x: 280, y: 820 });
  const cal = CALEN(cam, 300);
  const dem = chip(c, 380, 420, 'democracia', { size: 60, bg: '#1f4fa0', z: 40 });
  sp(T.mes, 'boing', 0.7); sp(T.democracia, 'whoosh', 0.6); sp(T.nombres, 'click', 0.5); sp(T.queda, 'stamp', 0.8); sp(T.hoy, 'ding', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [540, 1000, 0.95], [540, 960, 1.1]);
    const km = p(t, T.mes, 0.5, E.outBack); sobre.tx.textContent = t > T.nombres ? 'PAGA EXTRA' : t > T.mes ? '1 MES' : '1 SEMANA';
    set(sobre, { x: 280, y: 820, s: 1 + 0.35 * km - 0.1 * p(t, T.democracia, 0.5), r: -4 + Math.sin(t * 2) * 2 });
    const ka = clamp((t - T.democracia + 0.3) / (T.hoy - T.democracia + 0.3)), ano = t < T.democracia - 0.3 ? 1947 : Math.round(lerp(1947, 2026, ka));
    cal.mes.textContent = t > T.hoy ? 'HOY' : String(ano); cal.dia.textContent = '18'; cal.dia.style.color = RED;
    set(cal, { x: 700, y: 400, r: 6 + (ka > 0 && ka < 1 ? Math.sin(t * 30) * 3 : 0) });
    set(dem, { o: t > T.democracia ? 1 : 0, s: pop(t, T.democracia, 0.3), r: -3 });
  };
});

/* ACTO 5 · REMATE (L9, corte al presente): el móvil: «+ PAGA EXTRA» en julio → prorrateada: 12 trocitos… y Franco asoma sin entender nada */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#f3d9c4' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#f3d9c4', backgroundImage: 'repeating-linear-gradient(90deg, #f3d9c4 0 70px, #f7e4d3 70px 140px)' });
  const movil = box(cam, 290, 420, 500, 960, { zIndex: 5, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '60px' });
  const pant = box(movil, 26, 80, 428, 780, { background: '#fbf6ea', borderRadius: '20px', overflow: 'hidden', fontFamily: 'Bricolage', fontWeight: 800, color: INK, textAlign: 'center' },
    `<div style="background:#1f4fa0;color:#fff;font-size:44px;line-height:100px">Mi banco</div><div style="font-size:40px;margin-top:40px">JULIO</div><div class="ing" style="font-size:66px;color:${VERDE};margin-top:20px">+ PAGA EXTRA</div>
     <div class="tro" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:50px 30px 0;opacity:0">${[...Array(12)].map(() => `<div style="height:80px;background:${YEL};border:4px solid ${INK};border-radius:10px;font-size:26px;line-height:72px">1/12</div>`).join('')}</div>`);
  const ing = pant.querySelector('.ing'), tro = pant.querySelector('.tro');
  const fr = FRANCO(cam, 760, 980, 300); const q = texto(cam, 860, '¿?', { size: 120, color: RED, x: 820, w: 200, z: 20, shadow: `5px 5px 0 ${INK}` });
  sp(T.llegue, 'msg_in', 0.7); sp(T.prorrateada, 'click', 0.7); sp(T.ente, 'boing', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 960, 1.0], [600, 980, 1.12]);
    const pr = t > T.prorrateada - 0.1; ing.style.opacity = pr ? 0.25 : 1; tro.style.opacity = pr ? 1 : 0;
    set(ing, { s: t > T.llegue ? pop(t, T.llegue, 0.35) : 0 });
    const kf = p(t, T.ente - 0.4, 0.5, E.outBack); set(fr, { o: t > T.ente - 0.4 ? 1 : 0, x: lerp(300, 0, kf), r: -8 }); pFace(fr, t, { feliz: -0.3, ceja: 22, jaw: 0.4, look: [-14, -6], seed: 1 });
    set(q, { o: t > T.ente ? 1 : 0, s: pop(t, T.ente, 0.3), r: 8 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú la cobras en julio', 'o prorrateada?', { size: 80, draw: c => [['en julio', YEL], ['prorrateada', PINK], ['¿qué paga extra?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(101, 'La paga de Franco', ['NÓMINAS', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.ente + 0.3, L(10) - 0.15]],
  vecino: { risa: [[T.ente + 0.3, T.ente + 1.5]], sorpresa: [], golpes: [] },
});
