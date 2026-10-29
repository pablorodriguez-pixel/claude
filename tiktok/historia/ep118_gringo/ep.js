/* Ep. 118 · «Gringo NO viene de "Green, go home"» (versión nueva del ep50, ≤ 60 s). Los soldados de EE. UU. en la guerra con México (1846-48) vestían de azul.
   Terreros y Pando (1787): «Gringos llaman en Málaga a los extranjeros que tienen cierta especie de acento…; y en Madrid… a los irlandeses». De «griego».
   «Guiri»: de «guiristino» (cristino), los soldados de la reina regente María Cristina en las guerras carlistas; luego el guardia civil y el turista.
   ESTRATEGIA §8-12: imagen-idea en el fotograma 0 (el soldado de verde gritando «Green, go!» y el sello FALSO), todo en movimiento, zonas seguras. */
Story.prepara();
const T = {
  gringo0: Q('gringo'), green0: Q('green go home'), prueba: Q('tengo la prueba'), dicc: Q('un diccionario'), sesenta: Q('sesenta años antes'),
  mito: Q('el mito dice'), mexico: Q('entre méxico'), gritan: Q('les gritan'), verde: Q('de verde'), greengo: Q('green go'),
  problema: Q('pequeño problema'), azul: Q('de azul'),
  prueba2: Q('y la prueba'), anio: Q('mil setecientos ochenta y siete'), dicc2: Q('un diccionario español'), malaga: Q('en málaga'), acento: Q('acento raro'),
  griego: Q('viene de griego'), suena: Q('me suena a griego'),
  guiri: Q('y guiri'), nuestro: Q('también es nuestro'), carlistas: Q('guerras carlistas'),
  guiristinos: Q('guiristinos'), reina: Q('la reina'), guardia: Q('el guardia civil'), turista: Q('el turista'),
  osea: Q('o sea'), inventamos: Q('los inventamos'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const VERDE = '#5d7a4a', AZUL = '#2b4f9a', ROSA_R = 'repeating-conic-gradient(from 0deg at 540px 1000px, #f4c6cf 0 7deg, #efe1c6 7deg 14deg)';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const fondoR = cam => box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: ROSA_R });
const SELLO = (c, x, y, txt, size = 130, col = RED) => box(c, x, y, 920, size * 1.4, { zIndex: 45, transformOrigin: '50% 50%', fontFamily: 'Rye', fontSize: px(size), color: col, textAlign: 'center', lineHeight: px(size * 1.3), border: `12px solid ${col}`, borderRadius: '14px', background: 'rgba(255,255,255,.8)' }, txt);
const golpeS = (e, t, t0, r = -8) => set(e, { o: t > t0 ? 1 : 0, s: t > t0 ? lerp(1.9, 1, p(t, t0, 0.18)) : 0, r });
const BOCA = (c, x, y, txt, size = 64, z = 30) => box(c, x, y, 10, 10, { zIndex: z, transformOrigin: '0 100%' }, `<div style="position:absolute;left:0;bottom:0;white-space:nowrap;background:#fff;border:8px solid ${INK};border-radius:40px;padding:14px 36px;font-family:Bricolage;font-weight:800;font-size:${size}px;color:${INK}">${txt}</div>`);
const LIBRO = (c, x, y, w, html, z = 6) => box(c, x, y, w, w * 1.15, { zIndex: z, background: '#f4e4c0', border: `10px solid ${INK}`, borderLeft: `40px solid #7a3a2a`, borderRadius: '10px 20px 20px 10px', boxShadow: `14px 14px 0 ${INK}`, padding: '40px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, transformOrigin: '50% 50%' }, html);

/* PORTADA + L0-L1: el soldado de verde gritando «¡Green, go!»; título «"Gringo" NO viene de "Green, go"»; sello ¡FALSO!; luego el diccionario viejo con «1787» */
plano(-1, L(2) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const sol = PERS(cam, 290, 760, 500, { ropa: VERDE, pelo: 'calvo', pcol: '#3a2a1e', bigote: true, z: 5 });
  const bocadillo = BOCA(cam, 520, 700, '«¡Green, go!»', 66, 7);
  const t1 = texto(c, 285, '«Gringo» NO viene de', { size: 84, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const t2 = texto(c, 385, `${hlSpan('«Green, go»', 'phl', YEL)}`, { size: 120, italic: true, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const falso = SELLO(c, 80, 1180, '¡FALSO!', 140);
  const lib = LIBRO(c, 260, 640, 560, `<div style="font-family:Bricolage;font-weight:800;font-size:42px;opacity:.7">DICCIONARIO</div><div style="font-size:140px;font-weight:900;margin-top:30px">1787</div>`, 42);
  const ses = chip(c, 260, 1475, '60 años ANTES de esa guerra', { size: 54, bg: INK, color: YEL, z: 46 });
  sfx('boing', 0.1, 0.4); sp(T.green0 + 0.5, 'stamp', 0.9); sp(T.dicc, 'paper', 0.6); sp(T.sesenta, 'ding', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 1.0], [540, 1000, 1.08]);
    pFace(sol, t, { feliz: 0.4, ceja: 10, jaw: 0.4 + 0.4 * Math.abs(Math.sin(t * 9)), look: [16, -8], seed: 91 }); set(sol, { y: wobble(t, 0.7, 6), r: Math.sin(t * 2) * 2 });
    set(bocadillo, { s: 1 + 0.05 * Math.sin(t * 7), r: -3 + Math.sin(t * 3) * 2 });
    paint(c.querySelector('.phl'), t, 0.25, 0.35); set(t1, { r: -1 + wobble(t, 0.5, 0.5) }); set(t2, { r: -2 + wobble(t, 0.45, 0.7, 1) });
    golpeS(falso, t, T.green0 + 0.5, -7);
    const kl = p(t, T.dicc - 0.3, 0.4, E.outBack); set(lib, { o: t > T.dicc - 0.3 ? 1 : 0, s: kl, r: -4 + Math.sin(t * 1.5) * 2 });
    set(ses, { o: t > T.sesenta - 0.1 ? 1 : 0, s: pop(t, T.sesenta - 0.1, 0.3), r: -3 });
  };
}, { sfx: false });

/* L2-L3 (corte): el mito: mapa México / Estados Unidos; un mexicano grita «¡Green, go!» a soldados de verde… que se vuelven AZULES: «iban de azul» */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#e9d6a6' });
  const mapa = box(cam, -100, 300, 1300, 700, { zIndex: 1 }, `<svg viewBox="0 0 1300 700" width="1300" height="700"><path d="M0,0 L1300,0 L1300,330 L900,360 L700,300 L500,380 L300,330 L0,360Z" fill="#9fc6dc" stroke="${INK}" stroke-width="10"/><path d="M0,360 L300,330 L500,380 L700,300 L900,360 L1300,330 L1300,700 L0,700Z" fill="#e8b27a" stroke="${INK}" stroke-width="10"/>
    <text x="650" y="200" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="80" fill="rgba(43,33,24,.55)">ESTADOS UNIDOS</text><text x="650" y="560" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="80" fill="rgba(43,33,24,.55)">MÉXICO</text></svg>`);
  const ano = chip(c, 330, 285, '1846-1848', { size: 70, bg: INK, color: YEL, z: 40 });
  const mex = PERS(cam, -40, 1050, 380, { ropa: '#e8507a', gorro: 'gorro', pelo: 'corto', pcol: '#2a2118', bigote: true, z: 5 });
  const sold = [0, 1, 2].map(i => PERS(cam, 470 + i * 200, 1080, 300, { ropa: VERDE, gorro: 'gorra', gcol: VERDE, pelo: 'corto', pcol: '#3a2a1e', z: 4 + i }));
  const grito = BOCA(cam, 120, 1000, '«¡Green, go!»', 60, 8);
  const azulS = SELLO(c, 80, 1170, 'iban de AZUL', 110, AZUL);
  sp(T.mito, 'pop', 0.4); sp(T.greengo, 'boing', 0.5); sp(T.problema, 'error', 0.5); sp(T.azul, 'stamp', 0.9);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 900, 0.9], [560, 1180, 1.05]);
    set(ano, { o: t > T.mexico - 0.1 ? 1 : 0, s: pop(t, T.mexico - 0.1, 0.3), r: -3 });
    pFace(mex, t, { feliz: -0.3, ceja: 16, jaw: t > T.greengo - 0.2 && t < T.problema ? 0.8 : 0.1, look: [16, 0], seed: 92 }); set(mex, { y: wobble(t, 0.6, 4) });
    set(grito, { o: t > T.greengo - 0.3 && t < T.problema ? 1 : 0, s: pop(t, T.greengo - 0.3, 0.3), r: -4 });
    const kz = p(t, T.azul - 0.3, 0.5); sold.forEach((s, i) => { s.querySelectorAll('path, rect').forEach(e => { if (e.getAttribute('fill') === VERDE || e.dataset.v) { e.dataset.v = 1; e.setAttribute('fill', kz > 0.5 ? AZUL : VERDE); } }); pFace(s, t, { feliz: 0.1, ceja: 6, look: [-14, 0], seed: 93 + i }); set(s, { y: wobble(t, 0.5, 3, i) }); });
    golpeS(azulS, t, T.azul, -6);
  };
});

/* L4 (corte): la entrada del diccionario de 1787 (Terreros): «Gringos llaman en Málaga…» con fosforito en Málaga y en irlandeses; el mapa de Málaga */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const lib = LIBRO(cam, 110, 420, 860, `<div style="font-family:Bricolage;font-weight:800;font-size:40px;opacity:.65">Diccionario castellano · Terreros · 1787</div>
    <div style="font-size:52px;line-height:1.3;margin-top:30px"><b>GRINGOS</b> llaman en <span class="m1" style="position:relative;display:inline-block;z-index:0"><span class="f1" style="position:absolute;left:-6px;right:-6px;top:15%;bottom:5%;background:${YEL};z-index:-1;transform-origin:0 50%;transform:scaleX(0)"></span>Málaga</span> a los extranjeros que tienen cierta especie de <span style="position:relative;display:inline-block;z-index:0"><span class="f2" style="position:absolute;left:-6px;right:-6px;top:15%;bottom:5%;background:${YEL};z-index:-1;transform-origin:0 50%;transform:scaleX(0)"></span>acento</span>…</div>
    <div style="font-size:44px;line-height:1.3;margin-top:24px;opacity:.85">…y en Madrid, a los <span style="position:relative;display:inline-block;z-index:0"><span class="f3" style="position:absolute;left:-6px;right:-6px;top:15%;bottom:5%;background:#9fd3c0;z-index:-1;transform-origin:0 50%;transform:scaleX(0)"></span>irlandeses</span>.</div>`, 3);
  const ano = chip(c, 380, 285, '1787', { size: 80, bg: INK, color: YEL, z: 40 });
  sp(T.anio, 'stamp', 0.5); sp(T.malaga, 'swoosh_up', 0.5); sp(T.acento, 'ding', 0.5);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(5) - 0.1, [540, 960, 0.92], [540, 1000, 1.06]);
    set(lib, { r: -2 + Math.sin(t * 1.1) * 1 });
    [[T.malaga, '.f1'], [T.acento, '.f2'], [T.acento + 0.9, '.f3']].forEach(([tt, q]) => { const e = lib.querySelector(q); if (e) e.style.transform = `scaleX(${f1(p(t, tt - 0.1, 0.4) * 1000) / 1000})`; });
    popA(ano, t, T.anio - 0.2, { r: -3 });
  };
});

/* L5 (corte): «GRIEGO» → «GRINGO»: la E se cae y entra una N; bocadillo «me suena a griego» con letras griegas */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const letras = [...'GRIEGO'].map((l, i) => box(cam, 120 + i * 140, 760, 130, 190, { zIndex: 4, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '130px', textAlign: 'center', lineHeight: '176px', color: INK, transformOrigin: '50% 50%' }, l));
  const n = box(cam, 120 + 3 * 140, 760, 130, 190, { zIndex: 5, background: YEL, border: `8px solid ${INK}`, borderRadius: '18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '130px', textAlign: 'center', lineHeight: '176px', color: INK, transformOrigin: '50% 50%' }, 'N');
  const greek = box(cam, 140, 1080, 800, 160, { zIndex: 4, fontFamily: 'Playfair', fontSize: '90px', color: '#2b4f9a', textAlign: 'center' }, 'αβγ δεζ ηθλ');
  const bub = BOCA(cam, 200, 1060, '«me suena a griego»', 60, 6);
  sp(T.griego + 0.5, 'error', 0.4); sp(T.griego + 1.0, 'pop', 0.6); sp(T.suena, 'boing', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 900, 0.95], [540, 960, 1.06]);
    const ke = clamp((t - T.griego - 0.5) / 0.6); letras.forEach((e, i) => set(e, i === 3 ? { y: ke * ke * 900, r: ke * 50, o: 1 - ke } : { y: Math.sin(t * 3 + i) * 6, r: Math.sin(t * 2 + i) * 3 }));
    const kn = p(t, T.griego + 1.0, 0.4, E.outBack); set(n, { o: t > T.griego + 1.0 ? 1 : 0, y: (1 - kn) * -600, r: Math.sin(t * 3) * 3 });
    set(greek, { o: t > T.suena - 0.2 ? 0.8 : 0, x: Math.sin(t * 2) * 20 });
    set(bub, { o: t > T.suena - 0.2 ? 1 : 0, s: pop(t, T.suena - 0.2, 0.3), r: -3 });
  };
});

/* L6-L7 (corte): las guerras carlistas: un carlista con boina roja grita «¡guiristinos!» a un soldado de la reina; la palabra se encoge a «GUIRI»;
   luego un guardia civil con tricornio y al final un turista con cámara y sandalias */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const carl = PERS(cam, -40, 900, 400, { ropa: '#3d3a44', gorro: 'gorra', gcol: '#c8102e', pelo: 'corto', pcol: '#2a2118', barba: true, z: 4 });
  const cris = PERS(cam, 640, 920, 380, { ropa: '#2b4f9a', gorro: 'gorra', gcol: '#2b4f9a', pelo: 'corto', pcol: '#3a2a1e', bigote: 'corto', z: 4 });
  const grito = BOCA(cam, 140, 860, '«¡guiristinos!»', 60, 8);
  const pal = texto(c, 285, 'GUIRISTINO', { size: 110, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const carlChip = chip(c, 250, 420, 'guerras carlistas', { size: 58, bg: '#c8102e', z: 40 });
  const etapas = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: ROSA_R });
  const gc = PERS(etapas, 60, 820, 380, { ropa: '#3d5a4a', gorro: 'tricornio', pelo: 'corto', pcol: '#2a2118', bigote: true, z: 2 });
  const tur = PERS(etapas, 600, 820, 380, { ropa: '#f2c230', pelo: 'corto', pcol: '#e9c75c', piel: '#f2a08a', z: 2 });
  const cam2 = box(etapas, 760, 1120, 110, 80, { zIndex: 3, background: '#1d1a22', border: `6px solid ${INK}`, borderRadius: '14px' }, `<div style="margin:14px auto;width:40px;height:40px;border-radius:50%;background:#7cc4ea;border:5px solid ${INK}"></div>`);
  const l1 = chip(etapas, 90, 1260, '1.º el guardia civil', { size: 50, bg: '#3d5a4a', z: 4 }), l2 = chip(etapas, 610, 1260, '2.º el turista', { size: 50, bg: '#e8507a', z: 4 });
  const g2 = texto(etapas, 285, 'GUIRI', { size: 150, color: INK, z: 4, shadow: '5px 5px 0 #fff' });
  sp(T.carlistas, 'thud', 0.5); sp(T.guiristinos, 'boing', 0.5); sp(T.guardia, 'pop', 0.5); sp(T.turista, 'tada', 0.6);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 980, 0.95], [540, 1000, 1.08]);
    pFace(carl, t, { feliz: -0.2, ceja: 14, jaw: t > T.guiristinos - 0.2 && t < T.reina + 0.5 ? 0.7 : 0.1, look: [16, 0], seed: 95 }); set(carl, { y: wobble(t, 0.6, 4) });
    pFace(cris, t, { feliz: 0, ceja: 8, look: [-16, 0], seed: 96 }); set(cris, { y: wobble(t, 0.5, 3, 1) });
    set(grito, { o: t > T.guiristinos - 0.3 ? 1 : 0, s: pop(t, T.guiristinos - 0.3, 0.3), r: -4 });
    set(carlChip, { o: t > T.carlistas - 0.1 && t < T.guardia - 0.4 ? 1 : 0, s: pop(t, T.carlistas - 0.1, 0.3), r: -3 });
    // la palabra se encoge: GUIRISTINO → GUIRI justo antes del guardia civil
    const ks = clamp((t - (T.guardia - 1.2)) / 0.8); ponP(pal, ks <= 0 ? 'GUIRISTINO' : 'GUIRISTINO'.slice(0, Math.max(5, 10 - Math.floor(ks * 5)))); set(pal, { o: t > T.guiristinos - 0.2 && t < T.guardia - 0.4 ? 1 : 0, s: pop(t, T.guiristinos - 0.2, 0.35), r: -2 + wobble(t, 0.5, 0.6) });
    const ke = p(t, T.guardia - 0.4, 0.4, E.outCubic); etapas.style.transformOrigin = '540px 1000px'; set(etapas, { o: t > T.guardia - 0.4 ? 1 : 0, x: (1 - ke) * 1080, s: 1 + 0.1 * clamp((t - T.guardia) / 4) });
    pFace(gc, t, { feliz: 0.2, ceja: 8, look: [12, 0], seed: 97 }); set(gc, { y: wobble(t, 0.6, 4) });
    pFace(tur, t, { feliz: 1, look: [-12, -6], seed: 98 }); set(tur, { o: t > T.turista - 0.3 ? 1 : 0, s: pop(t, T.turista - 0.3, 0.35), y: wobble(t, 0.7, 4) }); set(cam2, { o: t > T.turista - 0.3 ? 1 : 0, r: Math.sin(t * 3) * 6 });
    set(l1, { r: -3 }); set(l2, { o: t > T.turista - 0.3 ? 1 : 0, r: 3 });
    set(g2, { r: -2 + wobble(t, 0.5, 0.6) });
  };
});
const ponP = (e, s) => { if (e.textContent !== s) e.textContent = s; };

/* L8 (corte): el mapa de España con las dos palabras clavadas: «GRINGO» en Málaga y «GUIRI» en el norte carlista */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#9fd0ee' });
  const SPAIN = 'M90,120 L200,80 L320,86 L420,92 L560,112 L640,150 L720,170 L800,180 L900,200 L880,280 L800,380 L740,450 L760,540 L700,620 L640,700 L520,730 L400,742 L300,760 L230,700 L200,620 L230,520 L200,420 L220,330 L150,250 L100,230 L60,170 Z';
  box(cam, 40, 640, 1000, 800, { zIndex: 1 }, `<svg viewBox="0 0 1000 800" width="1000" height="800"><path d="${SPAIN}" fill="#f2c230" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`);
  const pinG = chip(cam, 380, 1300, 'GRINGO · Málaga', { size: 54, bg: '#e8507a', z: 4 }), pinU = chip(cam, 250, 760, 'GUIRI · guerras carlistas', { size: 50, bg: '#c8102e', z: 4 });
  const ese = texto(c, 285, 'los inventamos AQUÍ', { size: 92, color: '#fff', z: 40, shadow: OUT });
  sp(T.osea, 'pop', 0.5); sp(T.inventamos, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 1050, 0.95], [540, 1030, 1.06]);
    set(pinG, { o: t > T.osea ? 1 : 0, s: pop(t, T.osea, 0.3), r: -3 + Math.sin(t * 3) * 2 }); set(pinU, { o: t > T.osea + 0.5 ? 1 : 0, s: pop(t, T.osea + 0.5, 0.3), r: 3 + Math.sin(t * 3 + 1) * 2 });
    set(ese, { o: t > T.inventamos - 0.2 ? 1 : 0, s: pop(t, T.inventamos - 0.2, 0.35), r: -2 + wobble(t, 0.5, 0.6) });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Cómo llamáis en tu tierra', 'a los extranjeros?', { size: 80, draw: c => [['guiris, de toda la vida', YEL], ['en mi pueblo, otra cosa', PINK], ['yo soy el guiri', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 220 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(118, 'Gringo y guiri', ['PALABRAS', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.inventamos + 0.3, L(9) - 0.15]],
  vecino: { risa: [[T.problema, T.azul + 0.8]], sorpresa: [[T.sesenta, T.sesenta + 1]], golpes: [] },
});
