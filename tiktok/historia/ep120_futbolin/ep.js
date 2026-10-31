/* Ep. 120 · «El inventor del futbolín secuestró un avión con un jabón». Alejandro Finisterre (1919-2007): sepultado en un bombardeo de Madrid (nov. 1936),
   lo llevan a un hospital de Montserrat con niños heridos que no pueden jugar al fútbol → idea del futbolín; un carpintero (Altuna) fabrica el primero; patente
   en Barcelona, enero de 1937. Al acabar la guerra cruza los Pirineos a Francia y pierde la patente. Tras el golpe de 1954 en Guatemala, agentes españoles lo
   embarcan rumbo a España; en el lavabo envuelve una pastilla de jabón en papel de aluminio, amenaza con que es una bomba y el avión se desvía a Panamá.
   Fuentes: es.wikipedia.org/wiki/Alejandro_Finisterre y en.wikipedia.org/wiki/Alejandro_Finisterre.
   ESTRATEGIA §8-12: fotograma 0 = futbolín + avión con un jabón (dos cosas que no pegan), todo en movimiento, zonas seguras. */
Story.prepara();
const T = {
  inventor: Q('el inventor'), futbolin: Q('futbolín'), secuestro: Q('secuestró'), avion: Q('un avión'), jabon: Q('un jabón'),
  madrid: Q('madrid'), anio36: Q('mil novecientos treinta y seis'), alejandro: Q('alejandro'), diecisiete: Q('diecisiete años'), sepultado: Q('sepultado'), bombardeo: Q('bombardeo'),
  hospital: Q('un hospital'), montserrat: Q('montserrat'), ninos: Q('niños heridos'), jugar: Q('jugar al fútbol'),
  ocurre: Q('se le ocurre'), correr: Q('no pueden correr'), corran: Q('que corran'), munecos: Q('los muñecos'),
  carpintero: Q('un carpintero'), primero: Q('el primero'), treinta7: Q('treinta y siete'), patenta: Q('lo patenta'),
  guerra: Q('acaba la guerra'), francia: Q('francia'), pirineos: Q('los pirineos'), pierde: Q('pierde la patente'),
  anios: Q('años después'), guatemala: Q('guatemala'), agentes: Q('unos agentes'), rumbo: Q('rumbo a españa'),
  bano: Q('en el baño'), envuelve: Q('envuelve'), plata: Q('papel de plata'), amenaza: Q('amenaza'), bomba: Q('es una bomba'),
  aterriza: Q('aterriza'), panama: Q('panamá'), libre: Q('libre'),
  primeros: Q('uno de los primeros'), secuestros: Q('secuestros aéreos'), historia: Q('de la historia'),
};
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const VERDE_F = '#3f9a4e', MADERA = '#9a6334', AZUL_F = '#2f6fd0', ROJO_F = '#d8392b';
const RAYAS = (c1, c2) => `repeating-conic-gradient(from 0deg at 540px 900px, ${c1} 0 7deg, ${c2} 7deg 14deg)`;
const fondoR = (cam, c1 = '#cfe6d2', c2 = '#efe1c6') => box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: RAYAS(c1, c2) });

/* El futbolín visto desde arriba (600×900). Barras horizontales .bar (8: alternan rojo/azul) con muñecos; la pelota .bal. */
const BARS = [[150, ROJO_F, 1], [235, AZUL_F, 2], [330, ROJO_F, 3], [420, AZUL_F, 5], [480, ROJO_F, 5], [570, AZUL_F, 3], [665, ROJO_F, 2], [750, AZUL_F, 1]];
const FUT = (c, x, y, w, z = 5) => box(c, x, y, w, w * 1.5, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 600 900" width="${w}" height="${f1(w * 1.5)}" style="overflow:visible">
  <rect x="0" y="0" width="600" height="900" rx="34" fill="${MADERA}" stroke="${INK}" stroke-width="12"/>
  <rect x="50" y="50" width="500" height="800" rx="10" fill="${VERDE_F}" stroke="${INK}" stroke-width="8"/>
  <path d="M50,450 H550 M300,50 V60 M300,840 V850" stroke="#fff" stroke-width="7"/><circle cx="300" cy="450" r="70" fill="none" stroke="#fff" stroke-width="7"/>
  <rect x="200" y="50" width="200" height="90" fill="none" stroke="#fff" stroke-width="7"/><rect x="200" y="760" width="200" height="90" fill="none" stroke="#fff" stroke-width="7"/>
  <rect x="235" y="20" width="130" height="34" rx="6" fill="${INK}"/><rect x="235" y="846" width="130" height="34" rx="6" fill="${INK}"/>
  <circle class="bal" cx="300" cy="450" r="17" fill="#fff" stroke="${INK}" stroke-width="5"/>
  ${BARS.map(([yy, col, n], i) => `<g class="bar" data-i="${i}"><rect x="-70" y="${yy - 7}" width="740" height="14" rx="7" fill="#c9ced6" stroke="${INK}" stroke-width="4"/>
    <rect x="${i % 2 ? 640 : -110}" y="${yy - 20}" width="70" height="40" rx="18" fill="${INK}"/>
    ${Array.from({ length: n }, (_, k) => { const cx = 300 + (k - (n - 1) / 2) * (n > 3 ? 95 : 150); return `<g><rect x="${cx - 20}" y="${yy - 30}" width="40" height="60" rx="12" fill="${col}" stroke="${INK}" stroke-width="5"/><circle cx="${cx}" cy="${yy}" r="13" fill="#f2c9a0" stroke="${INK}" stroke-width="4"/></g>`; }).join('')}</g>`).join('')}
</svg>`);
/* mueve barras (deslizan a izquierda/derecha) y la pelota */
const juega = (f, t, vel = 1) => { f.querySelectorAll('.bar').forEach((b, i) => b.setAttribute('transform', `translate(${f1(Math.sin(t * 3.2 * vel + i * 1.3) * 34)},0)`));
  const bl = f.querySelector('.bal'); if (bl) { bl.setAttribute('cx', f1(300 + Math.sin(t * 2.3 * vel) * 190)); bl.setAttribute('cy', f1(450 + Math.sin(t * 1.7 * vel + 1) * 320)); } };

/* avión de lado (400×160), morro a la derecha */
const AVION = (c, w = 400, z = 9, col = '#f4efe2') => box(c, 0, 0, w, w * 0.4, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 400 160" width="${w}" height="${f1(w * 0.4)}" style="overflow:visible">
  <path d="M20,40 L60,40 L95,78 L330,78 C380,78 395,95 395,105 C395,118 375,125 330,125 L60,125 C35,125 22,112 22,100 Z" fill="${col}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M170,100 L250,100 L200,155 L160,155Z" fill="#c9ced6" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M60,92 H330" stroke="${AZUL_F}" stroke-width="8"/>
  ${[120, 160, 200, 240, 280].map(a => `<circle cx="${a}" cy="98" r="0" fill="${INK}"/><rect x="${a - 9}" y="86" width="18" height="16" rx="5" fill="#9fd3e8" stroke="${INK}" stroke-width="3"/>`).join('')}
  <path d="M350,84 C362,84 375,92 380,100 L350,100Z" fill="#9fd3e8" stroke="${INK}" stroke-width="4"/></svg>`);
/* pastilla de jabón (rosa) y su versión envuelta en papel de plata */
const JABON = (c, w = 200, z = 10) => box(c, 0, 0, w, w * 0.62, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 200 124" width="${w}" height="${f1(w * 0.62)}" style="overflow:visible">
  <g class="jb"><rect x="6" y="10" width="188" height="104" rx="40" fill="#f6b3c8" stroke="${INK}" stroke-width="8"/><path d="M40,40 Q70,26 100,34" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
  <text x="100" y="82" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="#c96b8c">JABÓN</text></g>
  <g class="pl" opacity="0"><path d="M2,14 L40,4 L70,16 L104,2 L140,14 L172,4 L198,18 L192,60 L199,104 L160,120 L120,108 L84,122 L46,110 L4,118 L10,70Z" fill="url(#plg)" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M30,30 L60,60 L50,92 M110,20 L120,64 L150,100 M160,30 L140,60" stroke="#8d949e" stroke-width="4" fill="none"/>
  <path d="M40,40 L70,30" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>
  <defs><linearGradient id="plg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".45" stop-color="#b9c0c9"/><stop offset=".6" stop-color="#eef1f4"/><stop offset="1" stop-color="#9aa2ad"/></linearGradient></defs></svg>`);
const envuelto = (j, on) => { const a = j.querySelector('.jb'), b = j.querySelector('.pl'); if (a) a.setAttribute('opacity', on ? 0 : 1); if (b) b.setAttribute('opacity', on ? 1 : 0); };
/* nube de polvo */
const POLVO = (c, x, y, w, z = 7) => box(c, x, y, w, w * 0.6, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 200 120" width="${w}" height="${f1(w * 0.6)}"><path d="M20,100 C0,100 0,70 25,68 C20,40 55,30 70,48 C78,18 125,18 130,46 C150,30 185,45 175,70 C200,72 200,100 178,100Z" fill="#d9cfbf" stroke="${INK}" stroke-width="6"/></svg>`);
const ALEJ = { ropa: '#5d6b8a', pelo: 'corto', pcol: '#2a1e16' };

/* PORTADA + L0: el futbolín jugando solo; un avión pasa por encima con una pastilla de jabón brillando en la ventanilla; título */
plano(-1, L(1) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam);
  const f = FUT(cam, 240, 700, 600, 4);
  const av = AVION(cam, 560, 9);
  const jb = JABON(cam, 240, 11);
  const halo = box(cam, 0, 0, 300, 300, { zIndex: 10, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,170,.95), rgba(255,240,170,0) 68%)' });
  const t1 = texto(c, 285, 'El inventor del futbolín', { size: 82, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const t2 = texto(c, 385, `secuestró un ${hlSpan('avión', 'phl', YEL)}`, { size: 98, italic: true, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const ch = chip(c, 300, 1475, '…con un JABÓN', { size: 70, bg: RED, z: 40 });
  sfx('whoosh', 0.2, 0.35); sp(T.jabon, 'ding', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(1), [540, 1000, 1.0], [560, 900, 1.15]);
    juega(f, t, 1.4);
    // el avión cruza en diagonal por encima del futbolín
    const k = ((t + 1.2) * 0.16) % 1; const ax = lerp(-200, 900, k), ay = lerp(820, 620, k) + Math.sin(t * 3) * 12;
    set(av, { x: ax, y: ay, r: -8 + Math.sin(t * 2) * 2 });
    set(jb, { x: ax + 170, y: ay + 190 + Math.sin(t * 5) * 8, r: Math.sin(t * 3) * 10, s: 1 + 0.06 * Math.sin(t * 8) });
    set(halo, { x: ax + 125, y: ay + 115, s: 1 + 0.12 * Math.sin(t * 6) });
    paint(c.querySelector('.phl'), t, 0.3, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.6) }); set(t2, { r: 1 + wobble(t, 0.45, 0.7, 1) });
    set(ch, { o: t > T.jabon - 0.2 ? 1 : 0, s: pop(t, T.jabon - 0.2, 0.3), r: -4 + Math.sin(t * 7) * 1.5 });
  };
}, { sfx: false });

/* L1 (corte): Madrid 1936: tejados, cae una bomba, polvo; asoma un chaval de 17 años entre escombros */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#b9c4d2' }, c => {
  const cam = CAM(c);
  box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: 'linear-gradient(#8e9cb2, #d9c9b0)' });
  box(cam, -500, 500, 2100, 800, { zIndex: 1 }, `<svg viewBox="0 0 2100 800" width="2100" height="800"><path d="M0,800 L0,320 L160,320 L160,200 L260,140 L360,200 L360,320 L520,320 L520,240 L700,240 L700,160 L780,90 L860,160 L860,320 L1040,320 L1040,220 L1220,220 L1220,300 L1400,300 L1400,180 L1480,120 L1560,180 L1560,320 L1760,320 L1760,240 L1940,240 L1940,320 L2100,320 L2100,800Z" fill="#7a6a5c" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    ${Array.from({ length: 18 }, (_, i) => `<rect x="${60 + i * 112}" y="${380 + (i % 3) * 90}" width="40" height="54" fill="#f2d27a" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const esc = box(cam, 120, 1150, 840, 380, { zIndex: 5 }, `<svg viewBox="0 0 840 380" width="840" height="380"><path d="M0,380 L40,200 L140,240 L200,120 L320,210 L420,100 L540,220 L640,150 L760,230 L840,180 L840,380Z" fill="#a8968a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M150,250 L260,230 M420,180 L520,240 M600,210 L700,200" stroke="${INK}" stroke-width="8"/></svg>`);
  const chico = PERS(cam, 390, 1060, 300, Object.assign({ z: 4 }, ALEJ));
  const bomba = box(cam, 0, 0, 60, 110, { zIndex: 6, borderRadius: '30px 30px 20px 20px', background: '#3a3a3a', border: `6px solid ${INK}` });
  const polvos = [0, 1, 2, 3].map(i => POLVO(cam, 0, 0, 320, 7));
  const mad = chip(c, 330, 285, 'Madrid, 1936', { size: 72, bg: INK, color: YEL, z: 40 });
  const edad = chip(c, 380, 1475, '17 años', { size: 70, bg: '#2e9e6b', z: 40 });
  sp(T.madrid, 'whoosh', 0.4); sp(T.sepultado - 0.5, 'thud', 0.7); sp(T.alejandro, 'pop', 0.4);
  return t => {
    deriva(cam, t, L(1) - 0.1, L(2) - 0.1, [540, 900, 0.85], [540, 1200, 1.15]);
    const tb = T.sepultado - 0.5; const kb = clamp((t - (tb - 0.8)) / 0.8);
    set(bomba, { o: t > tb - 0.8 && t < tb ? 1 : 0, x: 510, y: lerp(-200, 1100, kb * kb), r: 8 });
    polvos.forEach((pz, i) => { const kp = clamp((t - tb) / 1.6); set(pz, { o: t > tb ? 1 - kp * 0.5 : 0, x: 380 + (i - 1.5) * 230 * (0.5 + kp), y: 1100 - kp * 180 - (i % 2) * 60, s: 0.6 + kp * 0.8 + 0.05 * Math.sin(t * 4 + i) }); });
    // antes de la bomba: el chico de pie; después: hundido entre escombros
    const hund = p(t, tb, 0.3, E.outCubic); set(chico, { y: hund * 200 + wobble(t, 0.6, 3), r: hund * -8 });
    pFace(chico, t, { feliz: t > tb ? -0.9 : 0.3, ceja: t > tb ? 18 : 4, jaw: t > tb ? 0.5 : 0, closed: t > T.bombardeo, look: [0, -10], seed: 120 });
    popA(mad, t, T.madrid - 0.1, { r: -3 });
    set(edad, { o: t > T.diecisiete - 0.1 ? 1 : 0, s: pop(t, T.diecisiete - 0.1, 0.3), r: -4 });
  };
});

/* L2 (corte): Montserrat: montaña de rocas; hospital con niños vendados en camas; un balón quieto, tachado */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#d6e6ef' }, c => {
  const cam = CAM(c);
  box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: 'linear-gradient(#a9d3ea, #e9f0e6)' });
  const mont = box(cam, -300, 200, 1700, 700, { zIndex: 1 }, `<svg viewBox="0 0 1700 700" width="1700" height="700"><path d="M0,700 L0,420 ${Array.from({ length: 16 }, (_, i) => `C${100 + i * 100},${120 + (i % 3) * 60} ${150 + i * 100},${120 + (i % 3) * 60} ${150 + i * 100},${380 + (i % 2) * 40}`).join(' ')} L1700,420 L1700,700Z" fill="#c9a98a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`);
  box(cam, -600, 880, 2280, 1600, { zIndex: 2, background: '#f4efe2', borderTop: `10px solid ${INK}` });
  const camas = [0, 1, 2].map(i => { const g = box(cam, 40 + i * 340, 1180, 300, 160, { zIndex: 3, background: '#fff', border: `8px solid ${INK}`, borderRadius: '20px' }); return g; });
  const ninos = [0, 1, 2].map(i => PERS(cam, 80 + i * 340, 1020, 220, { ropa: ['#e8a33a', '#7ab0d8', '#d87a9a'][i], pelo: i === 1 ? 'largo' : 'corto', pcol: ['#3a2a1e', '#6b4a2a', '#2a1e16'][i], z: 3 }));
  const vendas = [0, 1, 2].map(i => box(cam, 105 + i * 340, 925, 170, 34, { zIndex: 4, background: '#fff', border: `5px solid ${INK}`, borderRadius: '12px' }));
  const balon = box(cam, 840, 1420, 140, 140, { zIndex: 6, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #fff 0 40%, #ddd 70%)', border: `8px solid ${INK}` });
  const tacha = box(cam, 810, 1390, 200, 200, { zIndex: 7 }, `<svg viewBox="0 0 200 200" width="200" height="200"><path d="M20,20 L180,180 M180,20 L20,180" stroke="${RED}" stroke-width="22" stroke-linecap="round"/></svg>`);
  const mon = chip(c, 330, 285, 'Montserrat', { size: 72, bg: '#8a5a32', z: 40 });
  const nop = chip(c, 180, 1475, 'ya no pueden jugar', { size: 64, bg: INK, color: '#fff', z: 40 });
  sp(T.montserrat, 'whoosh', 0.35); sp(T.jugar, 'error', 0.45);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [540, 1000, 0.95], [700, 1250, 1.15]);
    ninos.forEach((n, i) => { set(n, { y: Math.sin(t * 1.5 + i) * 4 }); pFace(n, t, { feliz: -0.6, ceja: 10, look: [i === 2 ? -14 : 14, 10], seed: 130 + i }); });
    set(balon, { r: Math.sin(t * 1.2) * 6, y: Math.sin(t * 2) * 3 });
    set(tacha, { o: t > T.jugar - 0.1 ? 1 : 0, s: pop(t, T.jugar - 0.1, 0.3) });
    popA(mon, t, T.montserrat - 0.2, { r: -3 });
    set(nop, { o: t > T.ninos ? 1 : 0, s: pop(t, T.ninos, 0.3), r: -3 });
  };
});

/* L3 (corte): la idea: bombilla sobre Alejandro; el balón quieto… y en «que corran los muñecos» aparece el futbolín jugando a toda velocidad */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam, '#f6e7a8', '#efe1c6');
  const ale = PERS(cam, 330, 760, 420, Object.assign({ z: 5 }, ALEJ));
  const bomb = box(cam, 470, 380, 160, 220, { zIndex: 6, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 160 220" width="160" height="220"><circle cx="80" cy="80" r="70" fill="#ffe36b" stroke="${INK}" stroke-width="8"/><rect x="50" y="145" width="60" height="50" rx="8" fill="#9aa2ad" stroke="${INK}" stroke-width="6"/><path d="M60,90 Q80,60 100,90" stroke="${INK}" stroke-width="6" fill="none"/></svg>`);
  const f = FUT(c, 240, 620, 600, 20);
  const corran = texto(c, 285, `que corran los ${hlSpan('MUÑECOS', 'phl3', YEL)}`, { size: 88, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const nopc = texto(c, 285, 'si ellos no pueden correr…', { size: 76, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  sp(T.ocurre, 'ding', 0.6); sp(T.corran - 0.15, 'whoosh', 0.5); sp(T.munecos, 'tada', 0.45);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [540, 960, 1.0], [540, 900, 1.15]);
    pFace(ale, t, { feliz: t > T.ocurre ? 0.8 : -0.2, ceja: t > T.ocurre ? 2 : 10, jaw: t > T.ocurre && t < T.ocurre + 0.6 ? 0.5 : 0, look: [0, -16], seed: 140 });
    set(ale, { y: wobble(t, 0.6, 4) });
    set(bomb, { o: t > T.ocurre - 0.1 && t < T.corran - 0.2 ? 1 : 0, s: pop(t, T.ocurre - 0.1, 0.35) * (1 + 0.06 * Math.sin(t * 9)), r: Math.sin(t * 4) * 5 });
    const kf = p(t, T.corran - 0.2, 0.45, E.outBack); set(f, { o: t > T.corran - 0.2 ? 1 : 0, s: kf, r: (1 - kf) * -20 }); juega(f, t, 2.2);
    set(nopc, { o: t > T.correr - 0.3 && t < T.corran - 0.2 ? 1 : 0, s: pop(t, T.correr - 0.3, 0.3), r: -2 });
    set(corran, { o: t > T.corran - 0.2 ? 1 : 0, s: pop(t, T.corran - 0.2, 0.3), r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.phl3'), t, T.munecos - 0.1, 0.4);
  };
});

/* L4 (corte): el carpintero cepilla madera → el primer futbolín; luego la patente de 1937 con un sello */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam, '#e6c9a0', '#efe1c6');
  const carp = PERS(cam, 120, 820, 380, { ropa: '#6b8a5a', pelo: 'calvo', pcol: '#9a9a9a', bigote: true, z: 5 });
  const tabla = box(cam, 470, 1000, 480, 90, { zIndex: 4, background: `repeating-linear-gradient(90deg, ${MADERA} 0 40px, #a87040 40px 80px)`, border: `8px solid ${INK}`, borderRadius: '10px' });
  const cepillo = box(cam, 0, 0, 160, 70, { zIndex: 6, background: '#8a5a32', border: `6px solid ${INK}`, borderRadius: '12px 30px 8px 8px' });
  const virutas = [0, 1, 2, 3, 4].map(i => box(cam, 0, 0, 40, 40, { zIndex: 7, border: `6px solid #d9a066`, borderRadius: '50%', borderBottomColor: 'transparent' }));
  const f = FUT(cam, 520, 600, 380, 4);
  const pat = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: RAYAS('#cfe6d2', '#efe1c6') });
  const doc = box(pat, 150, 420, 780, 900, { background: '#f4e4c0', border: `10px solid ${INK}`, borderRadius: '14px', boxShadow: `14px 14px 0 ${INK}`, padding: '44px', boxSizing: 'border-box', fontFamily: 'Playfair', color: INK, textAlign: 'center', transformOrigin: '50% 50%' },
    `<div style="font-family:Bricolage;font-weight:800;font-size:56px">PATENTE</div><div style="font-size:48px;margin-top:10px">«fútbol de mesa»</div><div style="font-size:120px;font-weight:900;margin-top:40px">1937</div><div style="font-style:italic;font-size:52px;margin-top:60px">A. Finisterre</div>`);
  const sel = box(pat, 600, 1060, 260, 260, { zIndex: 3, borderRadius: '50%', border: `12px solid ${RED}`, color: RED, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', textAlign: 'center', lineHeight: '236px', boxSizing: 'border-box', transformOrigin: '50% 50%' }, 'BARCELONA');
  const carpC = chip(c, 300, 285, 'un carpintero', { size: 70, bg: '#8a5a32', z: 40 });
  sp(T.carpintero, 'click', 0.4); sp(T.carpintero + 0.4, 'click', 0.4); sp(T.primero, 'tada', 0.4); sp(T.patenta - 0.5, 'paper', 0.5); sp(T.patenta, 'stamp', 0.7);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(5) - 0.1, [540, 980, 1.0], [620, 900, 1.12]);
    const k = Math.sin(t * 7); set(cepillo, { x: 560 + k * 140, y: 945, r: k * 3 });
    virutas.forEach((v, i) => { const kv = ((t * 1.3) + i * 0.2) % 1; set(v, { o: t < T.primero ? 1 - kv : 0, x: 640 + i * 40 + kv * 80, y: 930 - kv * 260, r: kv * 400 }); });
    pFace(carp, t, { feliz: 0.6, ceja: 4, look: [16, 10], seed: 150 }); set(carp, { r: k * 2 });
    const kf = p(t, T.primero - 0.2, 0.4, E.outBack); set(f, { o: t > T.primero - 0.2 ? 1 : 0, s: kf }); set(tabla, { o: t > T.primero - 0.2 ? 0 : 1 }); juega(f, t, 1.2);
    popA(carpC, t, T.carpintero - 0.1, { r: -3 });
    const kp = p(t, T.treinta7 - 0.4, 0.4, E.outCubic); set(pat, { o: t > T.treinta7 - 0.4 ? 1 : 0, x: (1 - kp) * 1080 });
    set(doc, { r: -2 + Math.sin(t * 1.6) * 2.5, y: Math.sin(t * 2) * 10 });
    set(sel, { o: t > T.patenta ? 1 : 0, s: t > T.patenta ? lerp(2.2, 1, p(t, T.patenta, 0.2, E.outCubic)) : 2.2, r: -14 });
  };
});

/* L5 (corte): los Pirineos bajo la lluvia; Alejandro camina; el papel de la patente se le escapa volando */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#9aa9b8' }, c => {
  const cam = CAM(c);
  box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: 'linear-gradient(#6f7f92, #c4ccd2)' });
  box(cam, -500, 300, 2100, 1100, { zIndex: 1 }, `<svg viewBox="0 0 2100 1100" width="2100" height="1100"><path d="M0,1100 L0,600 L300,200 L520,520 L760,120 L1020,560 L1260,240 L1520,600 L1760,280 L2100,700 L2100,1100Z" fill="#7d8a7a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M300,200 L360,290 L250,270Z M760,120 L830,230 L700,220Z M1260,240 L1320,330 L1200,320Z M1760,280 L1820,370 L1700,360Z" fill="#fff" stroke="${INK}" stroke-width="6"/></svg>`);
  box(cam, -600, 1300, 2280, 1400, { zIndex: 2, background: '#8d7a62', borderTop: `10px solid ${INK}` });
  const ale = PERS(cam, 0, 1080, 300, Object.assign({ z: 5, piernas: true, calzas: '#3a3a4a' }, ALEJ));
  const papel = box(cam, 0, 0, 150, 190, { zIndex: 8, background: '#f4e4c0', border: `6px solid ${INK}`, borderRadius: '6px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '26px', textAlign: 'center', paddingTop: '20px', boxSizing: 'border-box', color: INK }, 'PATENTE<br>1937');
  const lluvia = box(c, 0, 0, 1080, 1920, { zIndex: 12, background: 'repeating-linear-gradient(105deg, rgba(255,255,255,.0) 0 26px, rgba(255,255,255,.35) 26px 29px)', backgroundSize: '200px 200px' });
  const fr = chip(c, 330, 285, 'rumbo a Francia', { size: 66, bg: AZUL_F, z: 40 });
  const pierde = chip(c, 230, 1475, 'pierde la patente', { size: 64, bg: RED, z: 40 });
  sp(T.guerra, 'thud', 0.35); sp(T.pirineos, 'whoosh', 0.35); sp(T.pierde, 'sad', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 960, 0.9], [640, 1050, 1.1]);
    const kw = clamp((t - (L(5) - 0.1)) / (L(6) - L(5))); set(ale, { x: lerp(120, 620, kw), y: Math.abs(Math.sin(t * 6)) * -12 });
    pFace(ale, t, { feliz: t > T.pierde ? -0.9 : -0.3, ceja: t > T.pierde ? 18 : 8, jaw: t > T.pierde ? 0.5 : 0, look: [t > T.pierde ? -16 : 16, t > T.pierde ? -16 : 0], seed: 160 });
    const kp = clamp((t - T.pierde + 0.3) / 1.6); const ax0 = lerp(120, 620, kw) + 210;
    set(papel, { x: ax0 - kp * 700 + Math.sin(t * 5) * 30 * kp, y: 1200 - kp * 900, r: kp * 540 + Math.sin(t * 3) * 6, s: 1 - kp * 0.3, o: kp < 1 ? 1 : 0 });
    lluvia.style.backgroundPosition = `${f1(-t * 160)}px ${f1(t * 900)}px`;
    popA(fr, t, T.francia - 0.2, { r: -3 });
    set(pierde, { o: t > T.pierde - 0.1 ? 1 : 0, s: pop(t, T.pierde - 0.1, 0.3), r: -4 });
  };
});

/* L6 (corte): «años después, en Guatemala»: dos agentes con sombrero lo meten en el avión; mapa con flecha a España */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); fondoR(cam, '#f2c9a8', '#efe1c6');
  box(cam, -600, 1250, 2280, 1400, { zIndex: 1, background: '#9aa2ad', borderTop: `10px solid ${INK}` });
  const av = AVION(cam, 1000, 2); set(av, { x: 40, y: 760 });
  const esc = box(cam, 620, 1000, 160, 260, { zIndex: 3 }, `<svg viewBox="0 0 160 260" width="160" height="260"><path d="M0,260 L120,0 L160,0 L40,260Z" fill="#c9ced6" stroke="${INK}" stroke-width="8"/>${[40, 90, 140, 190].map(y => `<path d="M${120 - y * 0.46},${y} h40" stroke="${INK}" stroke-width="6"/>`).join('')}</svg>`);
  const ag1 = PERS(cam, 200, 1000, 300, { ropa: '#2a2530', gorro: 'chistera', gcol: INK, pelo: 'corto', bigote: 'corto', severo: true, z: 5 });
  const ag2 = PERS(cam, 560, 1000, 300, { ropa: '#2a2530', gorro: 'chistera', gcol: INK, pelo: 'corto', severo: true, z: 5 });
  const ale = PERS(cam, 380, 1010, 290, Object.assign({ z: 6 }, ALEJ));
  const gua = chip(c, 330, 285, 'Guatemala', { size: 74, bg: '#2e9e6b', z: 40 });
  const rumbo = chip(c, 240, 1475, 'rumbo a ESPAÑA ✈️', { size: 66, bg: INK, color: YEL, z: 40 });
  sp(T.guatemala, 'whoosh', 0.35); sp(T.agentes, 'thud', 0.5); sp(T.rumbo, 'error', 0.4);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 1000, 0.85], [600, 1080, 1.05]);
    const ks = p(t, T.agentes, 1.6, E.inOutCubic);
    [ag1, ale, ag2].forEach((g, i) => set(g, { x: ks * (220 + i * 10), y: -ks * 140 + Math.abs(Math.sin(t * 6 + i)) * -8, s: 1 - ks * 0.12 }));
    pFace(ale, t, { feliz: -0.7, ceja: 14, look: [16, 0], seed: 170 }); pFace(ag1, t, { feliz: -0.2, ceja: 6, look: [12, 0], seed: 171 }); pFace(ag2, t, { feliz: -0.2, ceja: 6, look: [-12, 0], seed: 172 });
    set(av, { y: 760 + Math.sin(t * 2) * 4 });
    popA(gua, t, T.guatemala - 0.2, { r: -3 });
    set(rumbo, { o: t > T.rumbo - 0.1 ? 1 : 0, s: pop(t, T.rumbo - 0.1, 0.3), r: -3 });
  };
});

/* L7 (corte): el baño del avión: el jabón; el papel de plata lo envuelve (brilla); sale con la «bomba» en alto; la tripulación, con las manos arriba */
plano(L(7) - 0.1, L(8) - 0.1, { background: '#dfe7ee' }, c => {
  const cam = CAM(c);
  box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: 'repeating-linear-gradient(0deg, #e9eef2 0 118px, #c9d3dc 118px 124px), #e9eef2' });
  const lav = box(cam, 300, 1100, 480, 200, { zIndex: 2, background: '#fff', border: `10px solid ${INK}`, borderRadius: '20px 20px 120px 120px' });
  const espejo = box(cam, 340, 560, 400, 380, { zIndex: 1, background: 'linear-gradient(135deg, #bfe3f2, #e9f6fb)', border: `10px solid ${INK}`, borderRadius: '20px' });
  const jb = JABON(cam, 260, 6);
  const rollo = box(cam, 0, 0, 380, 150, { zIndex: 7, background: 'linear-gradient(90deg, #f4f6f8, #b9c0c9, #eef1f4, #9aa2ad)', border: `7px solid ${INK}`, borderRadius: '10px', transformOrigin: '0 50%' });
  const brillo = box(cam, 0, 0, 300, 300, { zIndex: 8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.95), rgba(255,255,255,0) 65%)' });
  const ale = PERS(c, 330, 860, 420, Object.assign({ z: 22 }, ALEJ));
  const bombaJ = JABON(c, 240, 24); envuelto(bombaJ, true);
  const crew = [0, 1].map(i => PERS(c, i ? 760 : -60, 1000, 330, { ropa: '#2f4f8a', gorro: 'gorra', gcol: '#2f4f8a', pelo: i ? 'moño' : 'corto', pcol: '#3a2a1e', z: 21 }));
  const bomTxt = texto(c, 285, '¡ES UNA BOMBA!', { size: 120, color: RED, z: 40, shadow: '6px 6px 0 #fff' });
  const banoC = chip(c, 330, 285, 'en el baño', { size: 70, bg: AZUL_F, z: 40 });
  const plC = chip(c, 230, 1475, 'papel de plata', { size: 66, bg: '#7d8794', z: 40 });
  const sale = T.amenaza - 0.3;
  sp(T.bano, 'click', 0.5); sp(T.envuelve, 'papel_w', 0.6); sp(T.plata, 'sparkle', 0.6); sp(T.bomba, 'drumroll', 0.35); sp(T.bomba + 0.4, 'burst', 0.4);
  return t => {
    deriva(cam, t, L(7) - 0.1, sale, [540, 1000, 1.0], [540, 1040, 1.5]);
    set(jb, { x: 410, y: 960 + Math.sin(t * 2) * 6, r: Math.sin(t * 1.5) * 4 });
    const kw = p(t, T.envuelve, 0.9, E.inOutCubic); envuelto(jb, kw > 0.6);
    set(rollo, { o: t > T.envuelve - 0.2 && kw < 0.95 ? 1 : 0, x: 400 + kw * 40, y: 930, r: -10 + kw * 30, s: 1 - kw * 0.6 });
    set(brillo, { o: t > T.plata ? 0.5 + 0.5 * Math.sin(t * 9) : 0, x: 390, y: 860, s: 1 + 0.15 * Math.sin(t * 6) });
    popA(banoC, t, T.bano - 0.2, { r: -3 }); set(banoC, { o: t > T.bano - 0.2 && t < sale ? 1 : 0 });
    set(plC, { o: t > T.plata - 0.1 && t < sale ? 1 : 0, s: pop(t, T.plata - 0.1, 0.3), r: -3 });
    // segunda parte: sale del baño con la «bomba» en alto; tripulación con las manos arriba
    const on = t > sale; const ke = p(t, sale, 0.35, E.outBack);
    [ale, bombaJ, bomTxt, ...crew].forEach(e => set(e, { o: on ? 1 : 0 }));
    set(ale, { y: (1 - ke) * 300 + wobble(t, 0.6, 4) }); pFace(ale, t, { feliz: -0.3, ceja: 16, jaw: 0.4 + 0.3 * Math.sin(t * 8), look: [0, 0], seed: 180 });
    set(bombaJ, { x: 420 + Math.sin(t * 10) * 10, y: 620 + (1 - ke) * 300, r: Math.sin(t * 7) * 8, s: 1.1 });
    crew.forEach((g, i) => { set(g, { y: Math.sin(t * 14 + i) * 6, r: (i ? -1 : 1) * 4 }); pFace(g, t, { feliz: -0.9, ceja: 20, jaw: 0.7, look: [i ? -14 : 14, -6], seed: 181 + i }); });
    set(bomTxt, { s: on ? pop(t, T.bomba - 0.1, 0.3) * (t > T.bomba - 0.1 ? 1 : 0) : 0, r: -4 + Math.sin(t * 20) * 1.5 });
  };
});

/* L8-L9 (corte): mapa: el avión iba a España y gira hacia Panamá; aterriza; «LIBRE»; sello «uno de los primeros secuestros aéreos de la historia» */
plano(L(8) - 0.1, L(10) - 0.1, { background: '#bfe0ef' }, c => {
  const cam = CAM(c);
  box(cam, -900, -700, 2880, 3320, { zIndex: 0, background: 'repeating-linear-gradient(0deg, #a9d6ea 0 60px, #b6dcee 60px 120px)' });
  /* Centroamérica muy esquemática: Guatemala arriba a la izquierda, Panamá abajo a la derecha */
  box(cam, 0, 300, 1080, 1400, { zIndex: 1 }, `<svg viewBox="0 0 1080 1400" width="1080" height="1400"><path d="M0,0 L420,0 C460,120 380,220 300,260 C380,330 470,420 520,520 C600,640 640,760 760,880 C840,960 960,980 1080,1000 L1080,1180 C960,1160 860,1100 780,1060 C690,1010 600,900 540,800 C470,700 380,600 290,520 C200,440 80,380 0,360Z" fill="#d9c58f" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`);
  const pG = box(cam, 140, 520, 34, 34, { zIndex: 3, borderRadius: '50%', background: RED, border: `6px solid ${INK}` });
  const pP = box(cam, 900, 1330, 40, 40, { zIndex: 3, borderRadius: '50%', background: '#2e9e6b', border: `6px solid ${INK}` });
  const lG = chip(cam, 40, 440, 'Guatemala', { size: 46, bg: INK, color: '#fff', z: 4 });
  const lP = chip(cam, 700, 1400, 'PANAMÁ', { size: 58, bg: '#2e9e6b', z: 4 });
  const lE = chip(cam, 640, 200, 'España →', { size: 50, bg: '#7d8794', z: 4 });
  const av = AVION(cam, 260, 6);
  const ruta = box(cam, 0, 0, 10, 10, { zIndex: 5 }, `<svg viewBox="0 0 1080 1400" width="1080" height="1400" style="position:absolute;left:0;top:0;overflow:visible"><path class="rt" d="M157,537 C400,450 700,300 900,250" fill="none" stroke="${INK}" stroke-width="8" stroke-dasharray="20 14" opacity=".35"/><path class="rp" d="M157,537 C500,600 700,900 920,1350" fill="none" stroke="${RED}" stroke-width="10" stroke-dasharray="22 14"/></svg>`);
  const libre = texto(c, 285, '¡LIBRE!', { size: 150, color: '#2e9e6b', z: 40, shadow: '6px 6px 0 #fff' });
  const selloH = box(c, 140, 700, 800, 420, { zIndex: 45, border: `14px solid ${RED}`, borderRadius: '30px', color: RED, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '68px', textAlign: 'center', lineHeight: 1.1, padding: '40px 30px', boxSizing: 'border-box', background: 'rgba(255,255,255,.85)', transformOrigin: '50% 50%' }, 'UNO DE LOS PRIMEROS<br>SECUESTROS AÉREOS<br>DE LA HISTORIA');
  const conJ = chip(c, 330, 1475, '…con un jabón 🧼', { size: 64, bg: INK, color: YEL, z: 46 });
  const rp = ruta.querySelector('.rp'); const LEN = 1200; if (rp) { rp.style.strokeDasharray = `${LEN}`; }
  sp(T.aterriza - 0.3, 'whoosh', 0.45); sp(T.libre, 'tada', 0.55); sp(T.primeros, 'stamp', 0.7);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(10) - 0.1, [540, 900, 0.85], [760, 1150, 1.05]);
    const kr = p(t, L(8) - 0.1, T.libre - L(8), E.inOutCubic);
    if (rp) rp.style.strokeDashoffset = f1(LEN * (1 - kr));
    // posición del avión sobre la curva (aprox. bezier cúbica)
    const B = (a, b, c2, d, u) => { const v = 1 - u; return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c2 + u * u * u * d; };
    const bx = B(157, 500, 700, 920, kr), by = B(537, 600, 900, 1350, kr), bx2 = B(157, 500, 700, 920, Math.min(1, kr + 0.02)), by2 = B(537, 600, 900, 1350, Math.min(1, kr + 0.02));
    set(av, { x: bx - 130, y: by - 52, r: Math.atan2(by2 - by, bx2 - bx) * 180 / Math.PI, s: 1 - 0.3 * clamp((t - T.aterriza) / 1) });
    set(pP, { s: 1 + 0.25 * Math.sin(t * 7) }); set(pG, { s: 1 + 0.1 * Math.sin(t * 5) });
    set(lP, { s: t > T.panama - 0.2 ? pop(t, T.panama - 0.2, 0.3) : 1, r: -3 });
    set(libre, { o: t > T.libre - 0.1 && t < T.primeros - 0.3 ? 1 : 0, s: pop(t, T.libre - 0.1, 0.3), r: -4 + wobble(t, 0.5, 0.6) });
    const on = t > T.primeros - 0.1; set(selloH, { o: on ? 1 : 0, s: on ? lerp(2, 1, p(t, T.primeros - 0.1, 0.22, E.outCubic)) + 0.02 * Math.sin(t * 5) : 2, r: -8 });
    set(conJ, { o: t > T.historia + 0.2 ? 1 : 0, s: pop(t, T.historia + 0.2, 0.3), r: -4 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú sabías quién', 'inventó el futbolín?', { size: 88, draw: c => [['ni idea 😳', YEL], ['¡un gallego!', PINK], ['lo del jabón NO', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 240 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(120, 'El futbolín y el jabón', ['INVENTOS', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.libre + 0.3, T.primeros - 0.4]],
  vecino: { risa: [[T.libre, T.libre + 1]], sorpresa: [[T.bomba, T.bomba + 1]], golpes: [] },
});
