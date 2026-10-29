/* Ep. 97 · «El logo del Chupa Chups lo dibujó Dalí» — FORMATO NUEVO (cuento continuo, dato para hacerse el listo).
   Cada escena con cámara en movimiento lento y continuo (sin paradas ni idas y venidas); cortes solo entre escenas. */
Story.prepara();
const T = {
  logo0: Q('el logo'), dali0: Q('dalí'),
  relojes: Q('relojes derretidos'), hora1: Q('una hora'),
  barcelona: Q('barcelona'), bernat: Q('enric bernat'), ninos: Q('los niños'), boca: Q('la boca'), pegajosas: Q('pegajosas'),
  palo: Q('un palo'), vende: Q('lo vende'),
  sesenta: Q('sesenta y nueve'), mas4: Q('quiere más'), mundo: Q('todo el mundo'),
  cafe: Q('un café'), amigo: Q('un amigo'), dali5: Q('salvador dalí'),
  papel: Q('un papel'), hora6: Q('una hora'), margarita: Q('margarita amarilla'), rojo: Q('en rojo'),
  truco: Q('el truco'), arriba: Q('arriba'), lado: Q('en un lado'), entero: Q('siempre entero'),
  desde: Q('desde entonces'), cambiado: Q('no ha cambiado'),
  proxima: Q('la próxima vez'), coma: Q('se coma'), sueltale: Q('suéltale'), esundali: Q('es un dalí'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AMAR = '#f2c230', ROJO = '#d8232a';
/* el logo: margarita amarilla + nombre en rojo (vb 0 0 300 220). Pétalos con clase .pe (para dibujarlos uno a uno) */
const LOGO = (w = 300) => `<svg viewBox="0 0 300 220" width="${w}" height="${w * 220 / 300}" style="overflow:visible">
  ${[...Array(12)].map((_, i) => `<ellipse class="pe" cx="150" cy="40" rx="34" ry="62" fill="${AMAR}" stroke="${INK}" stroke-width="5" transform="rotate(${i * 30} 150 110) scale(1 1)"/>`).join('')}
  <ellipse cx="150" cy="110" rx="118" ry="70" fill="${AMAR}" stroke="${INK}" stroke-width="5"/>
  <g class="tx"><text x="150" y="102" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="58" fill="${ROJO}" stroke="#fff" stroke-width="3" paint-order="stroke">Chupa</text>
  <text x="150" y="156" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="58" fill="${ROJO}" stroke="#fff" stroke-width="3" paint-order="stroke">Chups</text></g></svg>`;
/* piruleta de frente (vb 0 0 300 640): bola envuelta con el logo encima + palo */
const PIRU = (c, w = 300, o = {}) => box(c, 0, 0, w, w * 640 / 300, { zIndex: o.z || 8, transformOrigin: '50% 30%' }, `<svg viewBox="0 0 300 640" width="${w}" height="${w * 640 / 300}" style="overflow:visible">
  <rect x="136" y="250" width="28" height="380" rx="12" fill="#fbf6ea" stroke="${INK}" stroke-width="6"/>
  <path d="M110,262 L150,236 L190,262 L176,286 L124,286 Z" fill="${o.col || '#e8507a'}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="150" cy="140" r="130" fill="${o.col || '#e8507a'}" stroke="${INK}" stroke-width="8"/><path d="M40,90 Q150,40 260,90 M30,160 Q150,120 270,160" stroke="rgba(255,255,255,.45)" stroke-width="16" fill="none"/>
  ${o.logo === false ? '' : `<g transform="translate(40 60) scale(.74)">${LOGO(300).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`}</svg>`);
/* reloj blando de Dalí (vb 0 0 300 260) */
const BLANDO = (w = 300) => `<svg viewBox="0 0 300 260" width="${w}" height="${w * 260 / 300}" style="overflow:visible"><path d="M20,60 C20,10 250,0 270,50 C290,100 250,120 230,150 C210,190 220,250 190,250 C160,250 170,180 140,170 C90,160 20,130 20,60 Z" fill="#f4e6b0" stroke="${INK}" stroke-width="8"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${60 + i * 34}" cy="${50 + Math.sin(i) * 10}" r="5" fill="${INK}"/>`).join('')}<path d="M140,80 L120,40 M140,80 L190,70" stroke="${INK}" stroke-width="8" stroke-linecap="round"/></svg>`;
const DALI = (c, x, y, w) => PERS(c, x, y, w, { ropa: '#2b3550', pelo: 'corto', pcol: INK, bigote: 'dali', cuello: true });
const BERNAT = (c, x, y, w) => PERS(c, x, y, w, { ropa: '#8a6a3a', pelo: 'calvo', pcol: '#6b4a2a', cuello: true });
const rayos = (c, z = 0) => box(c, -400, -200, 1880, 2320, { zIndex: z, background: 'repeating-conic-gradient(from 0deg at 50% 45%, rgba(255,255,255,.22) 0 9deg, transparent 9deg 18deg)', transformOrigin: '50% 45%' });
/* empuje lento y continuo de la cámara de una escena: de (cx0,cy0,s0) a (cx1,cy1,s1) entre t0 y t1 */
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };

/* PORTADA + L1 (sin cortar): la piruleta gira despacio con su logo; «LO DIBUJÓ DALÍ» → un reloj blando se derrite → «1 HORA» */
plano(-1, L(2) - 0.1, { background: AMAR }, c => {
  const cam = CAM(c); const ry = rayos(cam);
  const piru = PIRU(cam, 520); set(piru, { x: 280, y: 470 });
  const t1 = texto(c, 190, 'EL LOGO DEL CHUPA CHUPS', { size: 58, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 275, 'LO DIBUJÓ ' + hlSpan('DALÍ', 'phl', '#e8507a'), { size: 120, color: '#fff', z: 40, shadow: OUT });
  const bl = box(cam, 0, 0, 300, 260, { zIndex: 12, transformOrigin: '50% 0' }, BLANDO());
  const hora = chip(c, 640, 1140, '1 HORA', { size: 72, bg: INK, color: AMAR, z: 41 });
  sfx('swoosh_up', 0.05, 0.5); sp(T.dali0, 'thud', 0.8); sp(T.relojes, 'squish', 0.6); sp(T.hora1, 'tick', 0.7);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1000, 1.0], [540, 940, 1.18]); set(ry, { r: t * 6 });
    set(piru, { x: 280, y: 470, r: Math.sin(t * 1.4) * 8 });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
    const kb = p(t, T.relojes - 0.2, 0.6, E.outBack); set(bl, { o: t > T.relojes - 0.2 ? 1 : 0, x: lerp(-320, 60, kb), y: 960, s: 1.5, sy: 1.5 * (1 + 0.12 * Math.sin(t * 2.2)), r: -6 });
    set(hora, { o: t > T.hora1 - 0.1 ? 1 : 0, s: pop(t, T.hora1 - 0.1, 0.35), r: -5 });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L4): Barcelona, años 50 (corte): un niño se saca el caramelo de la boca y se pringa las manos; Bernat mira… y le pone un palo → piruletas por toda España */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#f3d9c4' }, c => {
  const cam = CAM(c);
  box(cam, -200, -200, 1480, 2320, { zIndex: 0, background: '#f3d9c4', backgroundImage: 'repeating-linear-gradient(90deg, #f3d9c4 0 70px, #f7e4d3 70px 140px)' });
  box(cam, -200, 1380, 1480, 700, { zIndex: 1, background: '#c9b48a', borderTop: `10px solid ${INK}` });
  const kiosco = box(cam, 640, 520, 400, 860, { zIndex: 2, background: '#2e6b3a', border: `8px solid ${INK}`, borderRadius: '20px 20px 0 0' },
    `<div style="background:#fbf6ea;margin:30px;height:120px;border:5px solid ${INK};font-family:Rye;font-size:52px;text-align:center;line-height:110px;color:${ROJO}">DULCES</div>`);
  const nino = PERS(cam, 120, 820, 300, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e', piernas: true, calzas: '#3d3a44' });
  const caram = box(cam, 0, 0, 70, 70, { zIndex: 12, borderRadius: '50%', background: '#e8507a', border: `5px solid ${INK}` });
  const palo = box(cam, 0, 0, 16, 120, { zIndex: 11, background: '#fbf6ea', border: `4px solid ${INK}`, borderRadius: '8px' });
  const gotas = [0, 1, 2].map(() => box(cam, 0, 0, 22, 34, { zIndex: 13, background: '#e8507a', border: `3px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }));
  const puaj = BOCADILLO(cam, 0, 0, '¡puaj!', { size: 50 });
  const ber = BERNAT(cam, 700, 760, 300);
  const eB = ETIQUETA(c, 'ENRIC BERNAT', 'fabricante de dulces');
  const idea = texto(cam, 620, '!', { size: 180, color: AMAR, x: 700, w: 160, z: 20, shadow: `6px 6px 0 ${INK}` });
  const chip_ = chip(c, 330, 420, 'Barcelona · años 50', { size: 52, bg: '#2b3550' });
  const mapa = box(c, 140, 520, 800, 700, { zIndex: 30, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `12px 12px 0 rgba(0,0,0,.25)` }, `<div style="font-family:Rye;font-size:62px;text-align:center;margin-top:24px;color:${INK}">TODA ESPAÑA</div>`);
  const pirus = [...Array(9)].map((_, i) => PIRU(mapa, 120, { col: ['#e8507a', '#f2c230', '#2b8ad6'][i % 3], logo: false, z: 2 }));
  sp(T.barcelona, 'whoosh', 0.4); sp(T.boca, 'pop', 0.5); sp(T.pegajosas, 'squish', 0.8); sp(T.palo - 0.1, 'stamp', 0.8); pirus.forEach((_, i) => sp(T.vende + 0.2 + i * 0.12, 'pop2', 0.35));
  return t => {
    const cm = deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [480, 980, 1.05], [560, 960, 1.18]);
    rotuloA(chip_, t, T.barcelona, T.ninos);
    // el caramelo: en la boca → fuera (mano pringada) → con palo
    const fuera = p(t, T.boca, 0.5, E.outCubic), conPalo = t > T.palo - 0.1;
    const cx = lerp(280, 330, fuera), cy = lerp(1010, 1120, fuera) + Math.sin(t * 3) * 6;
    set(caram, { x: cx - 35, y: cy - 35 }); set(palo, { o: conPalo ? 1 : 0, x: cx - 8, y: cy + 20, sy: pop(t, T.palo - 0.1, 0.3) }); palo.style.transformOrigin = '50% 0';
    gotas.forEach((g, i) => { const kk = ((t * 0.9 + i / 3) % 1); set(g, { o: t > T.pegajosas - 0.3 && !conPalo ? 1 - kk : 0, x: cx - 30 + i * 22, y: cy + 30 + kk * 160 }); });
    set(puaj, { o: t > T.pegajosas - 0.2 && t < T.palo ? 1 : 0, x: 20, y: 660, s: pop(t, T.pegajosas - 0.2, 0.3), r: -6 });
    pFace(nino, t, { feliz: conPalo ? 1 : (t > T.pegajosas ? -0.7 : 0.6), ceja: t > T.pegajosas && !conPalo ? 16 : 2, jaw: t < T.boca ? 0.4 : 0, look: [10, 6], seed: 1 });
    pFace(ber, t, { feliz: t > T.palo ? 1 : 0.2, ceja: t > T.ninos ? 10 : 2, look: [-14, 4], seed: 2 });
    etiquetaA(eB, t, T.bernat, T.ninos + 0.8, cm, 850, 900, -230);
    set(idea, { o: t > T.pegajosas + 0.2 && t < T.palo + 0.6 ? 1 : 0, s: pop(t, T.pegajosas + 0.2, 0.3), r: 8 });
    const km = p(t, T.vende - 0.1, 0.4, E.outBack); set(mapa, { o: t > T.vende - 0.1 ? 1 : 0, s: km, r: -2 });
    pirus.forEach((q, i) => set(q, { x: 60 + (i % 3) * 240, y: 120 + Math.floor(i / 3) * 140 - 60, s: pop(t, T.vende + 0.2 + i * 0.12, 0.3) * 0.55, r: Math.sin(t * 3 + i) * 10 }));
  };
});

/* ACTO 2 (L4 → L6): el café (corte): Bernat quiere un logo para todo el mundo; se lo cuenta a su amigo… Salvador Dalí */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#7a2e2e' }, c => {
  const cam = CAM(c);
  box(cam, -200, -200, 1480, 2320, { zIndex: 0, background: '#8a3a3a', backgroundImage: 'repeating-linear-gradient(90deg, #8a3a3a 0 80px, #7a2e2e 80px 160px)' });
  const ber = BERNAT(cam, 90, 760, 340), dali = DALI(cam, 660, 760, 340);
  const mesa = box(cam, 40, 1180, 1000, 220, { zIndex: 12, background: '#fbf6ea', borderTop: `10px solid ${INK}`, borderRadius: '20px 20px 0 0' });
  const tazas = [300, 720].map(x => box(cam, x, 1100, 110, 90, { zIndex: 13, background: '#fff', border: `6px solid ${INK}`, borderRadius: '0 0 40px 40px' }));
  const humo = [0, 1, 2, 3].map(() => box(cam, 0, 0, 26, 80, { zIndex: 13, borderLeft: `7px solid rgba(255,255,255,.85)`, borderRadius: '50%' }));
  const bo = BOCADILLO(cam, 0, 0, 'Quiero un logo<br>para TODO el mundo', { size: 44 });
  const eD = ETIQUETA(c, 'SALVADOR DALÍ', 'pintor'), chip_ = chip(c, 420, 420, '1969', { size: 64, bg: '#2b3550' });
  sp(T.sesenta, 'whoosh', 0.4); sp(T.mundo, 'pop', 0.5); sp(T.cafe, 'click', 0.5); sp(T.dali5, 'harpa', 0.8);
  return t => {
    const cm = deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [400, 960, 1.05], [720, 980, 1.22]);
    rotuloA(chip_, t, T.sesenta, T.cafe);
    humo.forEach((h, i) => { const k = (t * 0.6 + i / 4) % 1; set(h, { x: [330, 380, 750, 800][i] + Math.sin(t * 3 + i) * 10, y: 1060 - k * 140, o: Math.sin(k * Math.PI) }); });
    pFace(ber, t, { feliz: 0.4, jaw: t > L(4) && t < LE(4) ? Math.abs(Math.sin(t * 9)) * 0.6 : 0, look: [14, 0], seed: 1 });
    const dv = t > T.dali5 - 0.2; set(dali, { o: t > T.amigo - 0.3 ? 1 : 0, y: (1 - p(t, T.amigo - 0.3, 0.5, E.outBack)) * 200 });
    pFace(dali, t, { feliz: dv ? 1 : 0.3, ceja: dv ? 20 : 4, look: dv ? [0, -4] : [-14, 0], seed: 3 });
    set(bo, { o: t > T.mas4 && t < T.cafe ? 1 : 0, x: 60, y: 560, s: pop(t, T.mas4, 0.3), r: -3 });
    etiquetaA(eD, t, T.dali5 - 0.1, L(6), cm, 830, 940, -280);
  };
});

/* ACTO 3 (L6): el papel (corte): Dalí dibuja la margarita pétalo a pétalo y escribe el nombre en rojo. La cámara baja despacio sobre el papel */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#d8cdb8' }, c => {
  const cam = CAM(c);
  box(cam, -200, -200, 1480, 2320, { zIndex: 0, background: '#b8a07a', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.06) 0 6px, transparent 6px 40px)' });
  const papel = box(cam, 110, 470, 860, 900, { zIndex: 2, background: '#fbf6ea', border: `6px solid ${INK}`, boxShadow: `14px 14px 0 rgba(0,0,0,.25)`, transform: 'rotate(-2deg)' });
  const lg = box(cam, 190, 640, 700, 513, { zIndex: 3 }, LOGO(700)); const pes = [...lg.querySelectorAll('.pe')], cuerpo = lg.querySelector('svg > ellipse:not(.pe)'), tx = lg.querySelector('.tx');
  const pincel = box(cam, 0, 0, 60, 300, { zIndex: 10, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 60 300" width="60" height="300"><rect x="20" y="0" width="20" height="220" rx="8" fill="#8a5a32" stroke="${INK}" stroke-width="5"/><path d="M18,220 H42 L36,290 Q30,300 24,290 Z" fill="${AMAR}" stroke="${INK}" stroke-width="5"/></svg>`);
  const n1 = chip(c, 640, 420, 'en 1 hora', { size: 56, bg: INK, color: AMAR, z: 40 });
  sp(T.papel, 'paper', 0.8); pes.forEach((_, i) => sp(T.margarita - 0.4 + i * 0.12, 'pop', 0.25)); sp(T.rojo, 'sparkle', 0.8);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 900, 1.0], [540, 920, 1.2]);
    const t0 = T.margarita - 0.4;
    pes.forEach((e, i) => e.setAttribute('opacity', t > t0 + i * 0.12 ? 1 : 0)); cuerpo.setAttribute('opacity', t > t0 + 1.4 ? 1 : 0);
    tx.setAttribute('opacity', t > T.rojo - 0.2 ? 1 : 0);
    const i = clamp(Math.floor((t - t0) / 0.12), 0, 11), a = i * 30 * Math.PI / 180;
    const px_ = t < T.rojo - 0.2 ? 540 + Math.sin(a) * 200 : 540 + Math.sin(t * 6) * 120, py_ = t < T.rojo - 0.2 ? 900 - Math.cos(a) * 200 : 900;
    set(pincel, { o: t > T.papel ? 1 : 0, x: px_ - 30, y: py_ - 300, r: 20 + Math.sin(t * 8) * 6 });
    set(n1, { o: t > T.hora6 - 0.1 ? 1 : 0, s: pop(t, T.hora6 - 0.1, 0.3), r: -5 });
  };
});

/* ACTO 4 · EL TRUCO (L7 → L9, corte): logo EN UN LADO (el envoltorio lo arruga) vs ARRIBA (se ve entero, lo gires como lo gires) → «casi no ha cambiado» */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#9fd3c0' }, c => {
  const cam = CAM(c); box(cam, -200, -200, 1480, 2320, { zIndex: 0, background: '#9fd3c0' });
  const izq = PIRU(cam, 300, { col: '#e8507a', logo: false }), der = PIRU(cam, 300, { col: '#e8507a' });
  set(izq, { x: 80, y: 640 }); set(der, { x: 700, y: 640 });
  const lado = box(izq, 150, 100, 160, 120, { zIndex: 3, transformOrigin: '0 50%' }, `<div style="transform:scaleX(.35) skewY(-14deg);transform-origin:0 50%">${LOGO(300)}</div>`);
  const l1 = texto(cam, 520, 'EN UN LADO', { size: 60, color: INK, x: 30, w: 500, z: 5 }), l2 = texto(cam, 520, 'ARRIBA', { size: 60, color: INK, x: 550, w: 500, z: 5 });
  const mal = texto(cam, 1260, '✗', { size: 200, color: ROJO, x: 130, w: 300, z: 6, shadow: `5px 5px 0 ${INK}` }), bien = texto(cam, 1260, '✓', { size: 200, color: '#2e6b3a', x: 700, w: 300, z: 6, shadow: `5px 5px 0 ${INK}` });
  const anos = chip(cam, 360, 1500, '1969 → HOY', { size: 64, bg: INK, color: AMAR, z: 8 });
  sp(T.truco, 'pop', 0.5); sp(T.arriba, 'stamp', 0.8); sp(T.lado, 'error', 0.4); sp(T.entero, 'ding', 0.7); sp(T.cambiado, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [540, 960, 1.0], [560, 1040, 1.12]);
    set(der, { x: 700, y: 640, r: t > T.entero - 0.3 ? (t - T.entero + 0.3) * 120 : Math.sin(t * 1.5) * 6 });
    set(izq, { x: 80, y: 640, r: Math.sin(t * 1.5 + 1) * 6 });
    set(l1, { o: t > T.lado - 0.2 ? 1 : 0 }); set(l2, { o: t > T.arriba - 0.2 ? 1 : 0, s: pop(t, T.arriba - 0.2, 0.3) });
    set(mal, { o: t > T.lado + 0.3 ? 1 : 0, s: pop(t, T.lado + 0.3, 0.3) }); set(bien, { o: t > T.entero ? 1 : 0, s: pop(t, T.entero, 0.3) });
    set(anos, { o: t > T.desde - 0.1 ? 1 : 0, s: pop(t, T.desde - 0.1, 0.35), r: -3 });
  };
});

/* ACTO 5 · REMATE (L9, corte al presente): un banco; tu amigo con su Chupa Chups; tú, dedo arriba: «¿Sabías que eso es un Dalí?» → cara de asombro */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -200, -200, 1480, 2320, { zIndex: 0, background: 'linear-gradient(#9fd0ee, #eaf2f6)' });
  box(cam, -200, 1300, 1480, 800, { zIndex: 1, background: '#8fb46a', borderTop: `10px solid ${INK}` });
  const banco = box(cam, 80, 1120, 920, 70, { zIndex: 9, background: '#8a5a32', border: `7px solid ${INK}`, borderRadius: '12px' });
  const amigo = PERS(cam, 560, 700, 360, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  const tu = PERS(cam, 100, 700, 360, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' });
  const piru = PIRU(cam, 120); const bo = BOCADILLO(cam, 0, 0, '«¿Sabías que eso<br>es un Dalí?»', { size: 46 });
  const ex = texto(cam, 520, '!!', { size: 130, color: ROJO, x: 760, w: 200, z: 20, shadow: `5px 5px 0 ${INK}` });
  sp(T.coma, 'pop', 0.5); sp(T.sueltale, 'swoosh_up', 0.5); sp(T.esundali + 0.4, 'boing', 0.7);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 980, 1.05], [560, 960, 1.18]);
    set(piru, { x: 820, y: 860 - (t > T.esundali + 0.4 ? p(t, T.esundali + 0.4, 0.3, E.outBack) * 120 : 0), r: -20 + Math.sin(t * 3) * 4 });
    pFace(amigo, t, { feliz: t > T.esundali + 0.3 ? -0.2 : 0.8, ceja: t > T.esundali + 0.3 ? 24 : 2, jaw: t > T.esundali + 0.3 ? 0.9 : 0, look: [-14, 0], seed: 2 });
    pFace(tu, t, { feliz: 1, ceja: t > T.sueltale ? -10 : 4, look: [14, -2], jaw: t > T.sueltale && t < LE(9) ? Math.abs(Math.sin(t * 9)) * 0.5 : 0, seed: 1 });
    set(bo, { o: t > T.sueltale ? 1 : 0, x: 60, y: 420, s: pop(t, T.sueltale, 0.3), r: -3 });
    set(ex, { o: t > T.esundali + 0.4 ? 1 : 0, s: pop(t, T.esundali + 0.4, 0.3), r: 8 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Qué otro logo crees', 'que esconde una historia?', { size: 76, draw: c => [['el de Apple', YEL], ['el de Nike', PINK], ['el de Coca-Cola', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(97, 'El logo de Dalí', ['LOGOS', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.esundali + 0.3, L(10) - 0.15]],
  vecino: { risa: [[T.esundali + 0.4, T.esundali + 1.6]], sorpresa: [], golpes: [] },
});
