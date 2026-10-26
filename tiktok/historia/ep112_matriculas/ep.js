/* Ep. 112 · «Tu matrícula no tiene ni una vocal». Sistema de 4 cifras + 3 consonantes desde septiembre de 2000 (Real Decreto 2822/1998): sin vocales para
   evitar «palabras malsonantes» o acrósticos; sin Ñ ni Q por confusión (N, O/0). Las letras avanzan en orden desde BBB (2000); en 2026 ya van por la N.
   Estilo de la lección del reel (ESTRATEGIA §9): fondo oscuro, primer plano, todo se mueve desde el fotograma 0 y la imagen enseña lo que dice la voz. */
Story.prepara();
const T = {
  vocal0: Q('ni una vocal'), casual: Q('casualidad'), todas: Q('todas las matrículas'),
  fijate: Q('fíjate'), cuatro: Q('cuatro números'), tres: Q('tres letras'), nA: Q('ni a'), nE: Q('ni e'), nI: Q('ni i'), nO: Q('ni o'), nU: Q('ni u'),
  dosmil: Q('dos mil'), decreto: Q('el decreto'), quitaron: Q('quitaron las vocales'), malson: Q('palabras malsonantes'),
  azar: Q('al azar'), ano: Q('ano'), pis: Q('pis'), peores: Q('cosas peores'),
  puesta: Q('llevarla puesta'), espana: Q('toda españa'), anos: Q('durante años'),
  tampoco: Q('tampoco hay'), lejos: Q('de lejos'), ene: Q('con la n'), cuo: Q('la q con la o'),
  truco: Q('el truco'), orden: Q('en orden'), bbb: Q('empezaron'), dosmil2: Q('dos mil'),
  avanzando: Q('avanzando'), nueva: Q('llevan la n'),
  primera: Q('primera letra'), lejosB: Q('más lejos'), nuevo: Q('más nuevo'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const OSC = '#11131a', AZUE = '#1f3fa0', VERDE = '#2e9e6b';
const CONS = 'BCDFGHJKLMNPRSTVWXYZ';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const fondo = (cam, col = OSC) => box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: `radial-gradient(circle at 540px 900px, #262a38, ${col} 60%)` });
/* placa europea española: franja azul con estrellas y «E»; .num y .let para cambiar el texto */
function PLACA(c, x, y, w, num = '1234', let_ = 'BCD', z = 10) {
  const h = w * 0.21, k = w / 900;
  const p = box(c, x, y, w, h, { zIndex: z, background: '#fbfbf6', border: `${f1(9 * k)}px solid ${INK}`, borderRadius: px(20 * k), boxSizing: 'border-box', overflow: 'hidden', transformOrigin: '50% 50%', boxShadow: `0 ${f1(14 * k)}px ${f1(30 * k)}px rgba(0,0,0,.45)` });
  box(p, 0, 0, 110 * k, h, { background: AZUE }, `<svg viewBox="0 0 110 190" width="${f1(110 * k)}" height="${f1(h)}">${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<circle cx="${f1(55 + Math.cos(a) * 30)}" cy="${f1(62 + Math.sin(a) * 30)}" r="5" fill="#f2c230"/>`; }).join('')}<text x="55" y="160" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="52" fill="#fff">E</text></svg>`);
  const txt = box(p, 120 * k, 0, w - 140 * k, h, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(150 * k), lineHeight: px(h - 18 * k), textAlign: 'center', color: INK, letterSpacing: px(6 * k), whiteSpace: 'nowrap' }, `<span class="num">${num}</span> <span class="let">${let_}</span>`);
  p.num = txt.querySelector('.num'); p.let = txt.querySelector('.let');
  return p;
}
const ponTexto = (e, s) => { if (e && e.textContent !== s) e.textContent = s; };
/* rodillo: letras que giran como una tragaperras (devuelve 3 consonantes que cambian con t) */
const rodillo = (t, seed = 0, vel = 14) => [0, 1, 2].map(i => CONS[Math.floor(t * vel * (1 + i * 0.23) + seed * 7 + i * 5) % CONS.length]).join('');
/* coche visto desde atrás (SVG) con un hueco para la placa */
const TRASERA = (c, x, y, w, col = '#e8507a', z = 6) => box(c, x, y, w, w * 0.62, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 1000 620" width="${w}" height="${f1(w * 0.62)}">
  <rect x="60" y="520" width="150" height="100" rx="20" fill="#1d1a22"/><rect x="790" y="520" width="150" height="100" rx="20" fill="#1d1a22"/>
  <path d="M60,300 Q60,240 120,230 L200,90 Q220,50 270,50 L730,50 Q780,50 800,90 L880,230 Q940,240 940,300 L940,520 Q940,560 900,560 L100,560 Q60,560 60,520Z" fill="${col}" stroke="${INK}" stroke-width="14"/>
  <path d="M240,100 L760,100 L830,230 L170,230Z" fill="#9fc6dc" stroke="${INK}" stroke-width="10"/>
  <rect x="90" y="270" width="170" height="80" rx="16" fill="#d8202a" stroke="${INK}" stroke-width="9"/><rect x="740" y="270" width="170" height="80" rx="16" fill="#d8202a" stroke="${INK}" stroke-width="9"/>
  <rect x="70" y="470" width="860" height="70" rx="20" fill="#3d3a44" stroke="${INK}" stroke-width="10"/></svg>`);

/* PORTADA + L0-L1: la placa en primer plano, con las letras girando como una tragaperras; arriba las vocales tachadas; luego desfilan muchas placas */
plano(-1, L(2) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const luz = box(cam, -800, 500, 2680, 900, { zIndex: 1, background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,.10) 45%, transparent 60%)' });
  const pl = PLACA(cam, 110, 980, 860, '4821', 'BCD', 10);
  const voc = [...'AEIOU'].map((v, i) => box(cam, 120 + i * 175, 720, 150, 170, { zIndex: 9, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '150px', textAlign: 'center', lineHeight: '170px', color: '#fff', transformOrigin: '50% 50%' }, `${v}<div class="raya" style="position:absolute;left:-6px;right:-6px;top:78px;height:20px;background:${RED};transform-origin:0 50%;transform:scaleX(0);border-radius:10px"></div>`));
  const flujo = [0, 1, 2, 3].map(i => PLACA(cam, 0, 0, 520, String(1000 + i * 2357).slice(0, 4), 'KLM', 4));
  const t1 = texto(c, 140, 'TU MATRÍCULA', { size: 110, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 265, `NO TIENE<br>${hlSpan('NI UNA VOCAL', 'phl', YEL)}`, { size: 96, color: '#fff', z: 40, shadow: OUT });
  sfx('clockfast', 0.05, 0.35); sp(T.vocal0, 'error', 0.5); sp(T.casual, 'pop', 0.4); sp(T.todas, 'whoosh', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 1.0], [540, 1040, 1.12]);
    set(luz, { x: ((t * 500) % 2600) - 1300 });
    // las letras giran hasta «ni una vocal» y frenan en BCD; luego vuelven a girar despacio
    const vel = t < T.vocal0 ? 16 : 3; ponTexto(pl.let, rodillo(t, 1, vel));
    set(pl, { r: -3 + Math.sin(t * 1.3) * 1.5, y: Math.sin(t * 1.7) * 8, s: 1 + 0.02 * Math.sin(t * 2.2) });
    voc.forEach((v, i) => { const k = p(t, T.vocal0 + 0.1 + i * 0.1, 0.25); const r = v.querySelector('.raya'); if (r) r.style.transform = `scaleX(${f1(k * 1000) / 1000})`; set(v, { o: t > T.vocal0 - 0.2 ? 1 - 0.5 * k : 0, y: Math.sin(t * 3 + i) * 6 + k * 20, r: k * (i % 2 ? 8 : -8) }); });
    const fl = t > T.todas - 0.4; flujo.forEach((f, i) => { const kk = ((t - T.todas + 0.4) * 0.55 + i * 0.25) % 1; ponTexto(f.let, rodillo(t + i, i, 6)); set(f, { o: fl ? 1 : 0, x: lerp(1200, -700, kk), y: 1280 + i * 70 + Math.sin(t * 2 + i) * 6, r: -4 }); });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1) });
  };
}, { sfx: false });

/* L2 (corte): el coche por detrás, la cámara baja a la placa: se iluminan los números y luego las letras; el abecedario y las vocales se caen una a una */
plano(L(2) - 0.1, L(3) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const carr = box(cam, -800, 1180, 2680, 1400, { zIndex: 1, background: '#2a2d36' });
  const rayas = box(cam, 520, 1180, 40, 1400, { zIndex: 2, background: 'repeating-linear-gradient(#f4efe2 0 90px, transparent 90px 200px)' });
  const coche = TRASERA(cam, 140, 540, 800, '#e8507a', 6);
  const pl = PLACA(cam, 330, 880, 420, '4821', 'BCD', 8);
  const marcoN = box(cam, 380, 872, 150, 104, { zIndex: 9, border: `8px solid ${YEL}`, borderRadius: '16px', boxSizing: 'border-box' });
  const marcoL = box(cam, 560, 872, 175, 104, { zIndex: 9, border: `8px solid ${VERDE}`, borderRadius: '16px', boxSizing: 'border-box' });
  const cN = chip(c, 140, 330, '4 números', { size: 62, bg: YEL, color: INK, z: 40 }), cL = chip(c, 520, 330, '3 letras', { size: 62, bg: VERDE, z: 40 });
  // abecedario (aparece al «ni A»): las vocales se caen
  const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const abc = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: 'rgba(17,19,26,.92)' });
  const celdas = [...ABC].map((l, i) => { const col = i % 6, fil = Math.floor(i / 6); return [box(abc, 90 + col * 155, 420 + fil * 170, 135, 150, { background: '#fbfbf6', border: `7px solid ${INK}`, borderRadius: '18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '96px', textAlign: 'center', lineHeight: '138px', color: INK, transformOrigin: '50% 50%' }, l), l]; });
  const tVoc = { A: T.nA, E: T.nE, I: T.nI, O: T.nO, U: T.nU };
  sp(T.cuatro, 'click', 0.5); sp(T.tres, 'click', 0.5); Object.values(tVoc).forEach(tt => sp(tt + 0.15, 'error', 0.35));
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 820, 0.95], [540, 930, 1.5]);
    set(rayas, { y: (t * 600) % 200 }); set(coche, { y: Math.sin(t * 8) * 3 }); set(pl, { y: Math.sin(t * 8) * 3 }); ponTexto(pl.let, rodillo(t, 2, 2));
    set(marcoN, { o: t > T.cuatro - 0.1 && t < T.nA - 0.3 ? 1 : 0, y: Math.sin(t * 8) * 3, s: 1 + 0.05 * Math.sin(t * 6) });
    set(marcoL, { o: t > T.tres - 0.1 && t < T.nA - 0.3 ? 1 : 0, y: Math.sin(t * 8) * 3, s: 1 + 0.05 * Math.sin(t * 6) });
    set(cN, { o: t > T.cuatro - 0.1 && t < T.nA - 0.3 ? 1 : 0, s: pop(t, T.cuatro - 0.1, 0.3), r: -3 }); set(cL, { o: t > T.tres - 0.1 && t < T.nA - 0.3 ? 1 : 0, s: pop(t, T.tres - 0.1, 0.3), r: 3 });
    const kA = p(t, T.nA - 0.4, 0.3, E.outCubic); set(abc, { o: t > T.nA - 0.4 ? kA : 0 });
    celdas.forEach(([e, l], i) => {
      if (tVoc[l]) { const k = clamp((t - tVoc[l] - 0.1) / 0.7); e.style.background = k > 0 ? '#f6c5c5' : '#fbfbf6'; e.style.borderColor = k > 0 ? RED : INK; set(e, { y: k * k * 900, r: k * (i % 2 ? 40 : -40), o: 1 - k * 0.3 }); }
      else set(e, { y: Math.sin(t * 2 + i) * 3 });
    });
  };
});

/* L3-L4 (corte): «año 2000» y el decreto: la frase «palabras malsonantes» se subraya con fosforito */
plano(L(3) - 0.1, L(5) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const ano = box(cam, 140, 360, 800, 240, { zIndex: 4, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '230px', textAlign: 'center', lineHeight: '240px', color: '#fff', textShadow: OUT }, '2000');
  const doc = box(cam, 120, 700, 840, 1000, { zIndex: 5, background: '#fbf6ea', border: `10px solid ${INK}`, borderRadius: '18px', boxShadow: '0 30px 60px rgba(0,0,0,.5)', padding: '50px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, transformOrigin: '50% 0%' },
    `<div style="font-family:Bricolage;font-weight:800;font-size:44px">BOE</div><div style="font-size:42px;font-weight:900;margin-top:12px">Real Decreto 2822/1998</div>
     ${[90, 70, 85].map(w => `<div style="height:16px;background:#e3dccb;border-radius:8px;margin-top:26px;width:${w}%"></div>`).join('')}
     <div style="font-size:52px;line-height:1.25;margin-top:40px">Las letras de las matrículas nuevas no llevarán vocales. Motivo: evitar <span style="position:relative;display:inline-block;z-index:0"><span class="fos" style="position:absolute;left:-6px;right:-6px;top:10%;bottom:4%;background:${YEL};z-index:-1;transform-origin:0 50%;transform:scaleX(0)"></span>palabras malsonantes</span>.</div>
     ${[80, 60].map(w => `<div style="height:16px;background:#e3dccb;border-radius:8px;margin-top:26px;width:${w}%"></div>`).join('')}`);
  sp(T.dosmil, 'stamp', 0.6); sp(T.decreto, 'paper', 0.6); sp(T.malson, 'swoosh_up', 0.6);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(5) - 0.1, [540, 800, 0.95], [540, 1180, 1.12]);
    set(ano, { o: t > T.dosmil - 0.2 ? 1 : 0, s: t > T.dosmil - 0.2 ? lerp(1.6, 1, p(t, T.dosmil - 0.2, 0.25)) : 0, r: -3 + wobble(t, 0.5, 0.8) });
    const kd = p(t, T.decreto - 0.3, 0.6, E.outCubic); set(doc, { o: t > T.decreto - 0.3 ? 1 : 0, y: (1 - kd) * 900, r: -2 + Math.sin(t * 1.1) * 1 });
    const f = doc.querySelector('.fos'); if (f) f.style.transform = `scaleX(${f1(p(t, T.malson - 0.1, 0.6, E.inOutCubic) * 1000) / 1000})`;
  };
});

/* L5-L6 (corte): la tragaperras con vocales: la placa gira y cae en «ANO» (zumbido), luego «PIS», luego una censurada; el coche se va por la carretera y la gente se ríe */
plano(L(5) - 0.1, L(7) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const pl = PLACA(cam, 110, 780, 860, '2741', 'BCD', 10);
  const X = box(cam, 760, 560, 240, 240, { zIndex: 12, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="240" height="240"><circle cx="50" cy="50" r="44" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M32,32 L68,68 M68,32 L32,68" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>`);
  const censura = box(cam, 600, 790, 380, 150, { zIndex: 11, background: INK, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', color: '#fff', textAlign: 'center', lineHeight: '150px' }, '¡CENSURADO!');
  // L6: carretera vista desde detrás; el coche con «ANO» se aleja y la gente lo señala
  const calle = box(c, 0, 0, 1080, 1920, { zIndex: 20, background: '#7fbfe8' });
  box(calle, 0, 900, 1080, 1020, { background: '#8fb46a' });
  box(calle, 0, 900, 1080, 1020, { background: '#55525c', clipPath: 'polygon(46% 0, 54% 0, 100% 100%, 0 100%)' });
  const cocheC = box(calle, 0, 0, 600, 372, { transformOrigin: '50% 100%' }); const tr = TRASERA(cocheC, 0, 0, 600, '#2b8ad6', 1); const plC = PLACA(cocheC, 160, 268, 280, '2741', 'ANO', 2);
  const gente = [[30, 1120, '#f2c230'], [800, 1150, '#e8507a']].map(([x, y, col], i) => PERS(calle, x, y, 260, { ropa: col, pelo: i ? 'largo' : 'corto', pcol: '#3a2a1e', z: 3 }));
  const jaja = [[80, 1040], [860, 1060]].map(([x, y]) => chip(calle, x, y, 'JAJAJA', { size: 44, bg: YEL, color: INK, z: 4 }));
  const anos = chip(c, 380, 330, 'durante años', { size: 62, bg: INK, color: '#fff', z: 41 });
  const caer = [[T.ano, 'ANO'], [T.pis, 'PIS'], [T.peores, '']];
  sp(T.azar, 'clockfast', 0.4); sp(T.ano + 0.1, 'error', 0.6); sp(T.pis + 0.1, 'error', 0.6); sp(T.peores + 0.1, 'stamp', 0.6); sp(T.puesta, 'whoosh', 0.6); sp(T.espana, 'pop', 0.4); sp(T.anos, 'tick', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 860, 1.0], [540, 860, 1.12]);
    // tragaperras: gira (con vocales) y se para en cada palabra
    let fijo = null; caer.forEach(([tt, s]) => { if (t > tt - 0.15) fijo = s; });
    const parado = fijo !== null && (fijo === '' ? t > T.peores - 0.15 : true) && [T.ano, T.pis, T.peores].some(tt => t > tt - 0.15 && t < tt + 0.9);
    const ALL = 'ABCDEFGHIJKLMNOPRSTUVXYZ';
    ponTexto(pl.let, parado ? (fijo || '***') : [0, 1, 2].map(i => ALL[Math.floor(t * 15 * (1 + i * 0.3) + i * 7) % ALL.length]).join(''));
    set(pl, { r: -2 + Math.sin(t * 1.3) * 1.5, s: parado ? 1.04 : 1 });
    const enX = [T.ano, T.pis].some(tt => t > tt && t < tt + 0.9); set(X, { o: enX ? 1 : 0, s: enX ? 1 + 0.1 * Math.sin(t * 20) : 0, r: 10 });
    set(censura, { o: t > T.peores - 0.1 && t < T.peores + 1.2 ? 1 : 0, r: -4 });
    // L6
    const enC = t > L(6) - 0.2; set(calle, { o: enC ? 1 : 0 });
    const kc = clamp((t - L(6) + 0.2) / (L(7) - L(6))); set(cocheC, { x: 240, y: lerp(1300, 820, kc), s: lerp(1.1, 0.45, kc) });
    gente.forEach((g, i) => { pFace(g, t, { feliz: 1, jaw: 0.5 + 0.4 * Math.abs(Math.sin(t * 10 + i)), look: [i ? -14 : 14, -6], seed: 20 + i }); set(g, { y: Math.sin(t * 9 + i) * 6 }); });
    jaja.forEach((j, i) => set(j, { o: t > T.espana - 0.3 ? 1 : 0, s: pop(t, T.espana - 0.3 + i * 0.15, 0.3), r: (i ? 6 : -6) + Math.sin(t * 6 + i) * 3 }));
    set(anos, { o: t > T.anos - 0.1 ? 1 : 0, s: pop(t, T.anos - 0.1, 0.3), r: -3 });
  };
});

/* L7 (corte): Ñ y N, Q y O: al alejarse (desenfoque y tamaño) se vuelven iguales */
plano(L(7) - 0.1, L(8) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const par = (y, a, b) => [a, b].map((l, i) => box(cam, 170 + i * 420, y, 320, 360, { zIndex: 5, background: '#fbfbf6', border: `9px solid ${INK}`, borderRadius: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '260px', textAlign: 'center', lineHeight: '340px', color: INK, transformOrigin: '50% 50%' }, l));
  const p1 = par(420, 'Ñ', 'N'), p2 = par(900, 'Q', 'O');
  const igual = [[p1, 520], [p2, 1000]].map(([, y]) => box(cam, 490, y + 60, 100, 120, { zIndex: 6, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '120px', color: '#fff', textAlign: 'center' }, '='));
  const lej = chip(c, 380, 300, 'de lejos…', { size: 62, bg: '#2b3550', z: 40 });
  sp(T.lejos, 'swoosh_up', 0.5); sp(T.ene, 'ding', 0.5); sp(T.cuo, 'ding', 0.5);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(8) - 0.1, [540, 900, 1.0], [540, 900, 1.1]);
    const k1 = p(t, T.ene - 0.5, 0.9, E.inOutCubic), k2 = p(t, T.cuo - 0.5, 0.9, E.inOutCubic);
    p1.forEach((e, i) => { e.style.filter = `blur(${f1(k1 * 9)}px)`; set(e, { s: 1 - k1 * 0.35, r: Math.sin(t * 1.5 + i) * 2 }); });
    p2.forEach((e, i) => { e.style.filter = `blur(${f1(k2 * 9)}px)`; set(e, { s: 1 - k2 * 0.35, r: Math.sin(t * 1.5 + i + 2) * 2 }); });
    set(igual[0], { o: k1 > 0.6 ? 1 : 0, s: pop(t, T.ene + 0.2, 0.3) }); set(igual[1], { o: k2 > 0.6 ? 1 : 0, s: pop(t, T.cuo + 0.2, 0.3) });
    set(lej, { o: t > T.lejos - 0.1 ? 1 : 0, s: pop(t, T.lejos - 0.1, 0.3), r: -3 });
  };
});

/* L8-L9 (corte): el truco — una regla de letras B…Z; el marcador va de BBB (2000) a la N (este año) y la placa y el año cuentan a la vez */
plano(L(8) - 0.1, L(10) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  const X0 = 90, W = 900, xL = i => X0 + (i + 0.5) * W / CONS.length;
  const regla = box(cam, X0, 1080, W, 120, { zIndex: 3, background: '#fbfbf6', border: `8px solid ${INK}`, borderRadius: '20px', boxSizing: 'border-box', overflow: 'hidden' }, `<div class="rel" style="position:absolute;left:0;top:0;bottom:0;width:0;background:${VERDE};opacity:.35"></div>${[...CONS].map((l, i) => `<div style="position:absolute;left:${f1((i + 0.5) * W / CONS.length - 22)}px;top:24px;width:44px;text-align:center;font-family:Bricolage;font-weight:800;font-size:44px;color:${INK}">${l}</div>`).join('')}`);
  const marca = box(cam, 0, 980, 60, 90, { zIndex: 5 }, `<svg viewBox="0 0 60 90" width="60" height="90"><path d="M6,6 L54,6 L54,50 L30,84 L6,50Z" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`);
  const pl = PLACA(cam, 140, 520, 800, '0000', 'BBB', 6);
  const anio = box(cam, 140, 300, 800, 200, { zIndex: 6, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '170px', textAlign: 'center', color: '#fff', textShadow: OUT }, '2000');
  const ord = chip(c, 300, 300, 'van en orden', { size: 62, bg: VERDE, z: 40 });
  const nueva = chip(c, 260, 1560, 'los coches de este año: N', { size: 56, bg: RED, z: 40 });
  sp(T.truco, 'ding', 0.5); sp(T.bbb, 'pop', 0.5); sp(T.avanzando, 'clockfast', 0.5); sp(T.nueva, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(10) - 0.1, [540, 1000, 1.05], [540, 880, 1.0]);
    // avance de B a N mientras dice «han ido avanzando… la N»
    const k = p(t, T.avanzando - 0.3, T.nueva - T.avanzando + 0.5, E.inOutCubic); const iN = CONS.indexOf('N'); const fi = k * iN, i0 = Math.floor(fi);
    set(marca, { x: lerp(xL(0), xL(iN), k) - 30, y: Math.sin(t * 5) * 14 }); set(regla, { r: Math.sin(t * 1.4) * 1.5, y: Math.sin(t * 1.1) * 8 });
    const rel = regla.querySelector('.rel'); if (rel) rel.style.width = f1(lerp(xL(0), xL(iN), k) - X0) + 'px';
    const L1 = CONS[Math.min(i0, iN)], L2 = CONS[Math.floor((fi * 7) % CONS.length)], L3 = CONS[Math.floor((fi * 13) % CONS.length)];
    ponTexto(pl.let, t < T.bbb - 0.1 ? rodillo(t, 4, 12) : k <= 0 ? 'BBB' : k >= 1 ? 'NLB' : L1 + L2 + L3); ponTexto(pl.num, t < T.bbb - 0.1 ? String(1000 + Math.floor(t * 23) % 9000) : k <= 0 ? '0000' : String(1000 + Math.floor(t * 731) % 9000));
    ponTexto(anio, String(Math.round(2000 + 26 * k))); set(anio, { o: t > T.bbb - 0.2 ? 1 : 0, r: -2 + wobble(t, 0.5, 0.6) });
    set(pl, { o: 1, s: t > T.bbb - 0.1 && t < T.bbb + 0.3 ? 1.08 : 1, r: -2 + Math.sin(t * 1.3) * 1.2 });
    set(ord, { o: t > T.orden - 0.1 && t < T.bbb - 0.3 ? 1 : 0, s: pop(t, T.orden - 0.1, 0.3), r: -3 });
    set(nueva, { o: t > T.nueva - 0.1 ? 1 : 0, s: pop(t, T.nueva - 0.1, 0.3), r: -3 });
  };
});

/* L10 (corte): dos coches por detrás: «C…» (gris, antiguo) y «N…» (nuevo, brillante); la cámara pasa del uno al otro */
plano(L(10) - 0.1, L(11) - 0.1, { background: OSC }, c => {
  const cam = CAM(c); fondo(cam);
  box(cam, -800, 1180, 2680, 1400, { zIndex: 1, background: '#2a2d36' });
  const vie = TRASERA(cam, 40, 640, 480, '#8a8680', 4), nue = TRASERA(cam, 560, 640, 480, '#e8507a', 4);
  const pv = PLACA(cam, 150, 836, 260, '3518', 'CFG', 6), pn = PLACA(cam, 670, 836, 260, '8264', 'NLB', 6);
  const brillo = box(cam, 560, 640, 480, 300, { zIndex: 5, background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%)', backgroundSize: '300% 100%' });
  const cv = chip(c, 80, 420, 'más viejo', { size: 58, bg: '#5e5a52', z: 40 }), cn = chip(c, 640, 420, 'más nuevo', { size: 58, bg: VERDE, z: 40 });
  const prim = texto(c, 200, 'mira la PRIMERA letra', { size: 80, color: '#fff', z: 40, shadow: OUT });
  sp(T.primera, 'click', 0.5); sp(T.nuevo, 'sparkle', 0.7);
  return t => {
    deriva(cam, t, L(10) - 0.1, L(11) - 0.1, [480, 880, 1.0], [600, 900, 1.08]);
    brillo.style.backgroundPosition = `${f1(100 - ((t * 60) % 200))}% 0`;
    [vie, pv].forEach(e => set(e, { y: Math.sin(t * 5) * 3 })); [nue, pn].forEach(e => set(e, { y: Math.sin(t * 5 + 1) * 3 }));
    set(prim, { o: t > T.primera - 0.2 ? 1 : 0, s: pop(t, T.primera - 0.2, 0.3), r: -2 });
    set(cv, { o: t > T.lejosB - 0.1 ? 1 : 0, s: pop(t, T.lejosB - 0.1, 0.3), r: -3 }); set(cn, { o: t > T.nuevo - 0.1 ? 1 : 0, s: pop(t, T.nuevo - 0.1, 0.3), r: 3 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿La matrícula más', 'graciosa que has visto?', { size: 84, draw: c => [['una con KK', YEL], ['la de mi padre', PINK], ['voy a mirar la mía', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 250 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(112, 'Sin vocales', ['MATRÍCULAS', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[T.nuevo + 0.3, L(11) - 0.15]],
  vecino: { risa: [[T.ano, T.ano + 1], [T.espana, T.anos + 0.5]], sorpresa: [[T.nueva, T.nueva + 1]], golpes: [] },
});
