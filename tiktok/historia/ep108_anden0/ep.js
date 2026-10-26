/* Ep. 108 · «Andén 0: la estación donde el tren nunca para» (Chamberí, línea 1 del Metro de Madrid). Abierta en 1919, cerrada en 1966 (en curva, no se podían
   alargar los andenes para trenes más largos), museo desde 2008; la línea 1 pasa sin parar entre Iglesia y Bilbao.
   Un mismo andén (azulejos, anuncios, taquilla) que cambia de época; cámara siempre en movimiento lento; cortes solo entre escenas. */
Story.prepara();
const T = {
  linea0: Q('la línea 1'), nunca: Q('nunca para'),
  sesenta: Q('sesenta años'), talcual1: Q('tal cual'),
  diecinueve: Q('diecinueve'), inaugura: Q('se inaugura'), chamberi2: Q('es chamberí'),
  cuarentaysiete: Q('cuarenta y siete'), crece: Q('madrid crece'), pequenos: Q('se quedan pequeños'),
  alargarlos: Q('alargarlos'), andenes: Q('los andenes'),
  curva: Q('en una curva'), estirar: Q('no se puede estirar'),
  sesentayseis: Q('sesenta y seis'), cierran: Q('la cierran'), largo: Q('de largo'),
  oscuras: Q('a oscuras'), azulejos: Q('sus azulejos'), anuncios: Q('sus anuncios'), taquillas: Q('sus taquillas'),
  dosmilocho: Q('dos mil ocho'), museo: Q('como museo'), anden: Q('andén cero'),
  bajarte: Q('sin bajarte'), iglesia: Q('entre iglesia y bilbao'),
  proxima: Q('la próxima vez'), movil: Q('el móvil'), ventana: Q('por la ventana'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* el andén de Chamberí (de lado): bóveda de azulejo blanco, cartel con el nombre, anuncios de azulejo, taquilla, andén y vía */
function anden(cam) {
  box(cam, -800, -400, 2680, 2720, { zIndex: 0, background: '#2a2530' });
  box(cam, -800, 280, 2680, 1050, { zIndex: 1, background: '#f4efe2', backgroundImage: 'linear-gradient(rgba(43,33,24,.12) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.12) 2px, transparent 2px)', backgroundSize: '60px 34px', borderRadius: '50% 50% 0 0 / 30% 30% 0 0', border: `10px solid ${INK}` });
  box(cam, -800, 1180, 2680, 30, { zIndex: 2, background: '#1f4fa0' });
  const nombre = box(cam, 280, 520, 520, 130, { zIndex: 3, background: '#fbf6ea', border: `8px solid #1f4fa0`, outline: `4px solid ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '84px', textAlign: 'center', lineHeight: '114px', color: '#1f4fa0' }, 'CHAMBERÍ');
  const ads = [[-560, '#c8102e', 'JABÓN<br>LA TOJA'], [-120, '#2e6b3a', 'CAFÉ<br>EXPRÉS'], [880, '#e9a23a', 'PIDA<br>GASEOSA'], [1320, '#7a5aa8', 'PÍLDORAS<br>DEL DR.']].map(([x, col, s]) => box(cam, x, 720, 360, 380, { zIndex: 3, background: col, border: `10px solid #e9c75c`, outline: `5px solid ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', paddingTop: '110px', boxSizing: 'border-box', color: '#fff6c8', lineHeight: 1.2 }, s));
  const taq = box(cam, 320, 860, 440, 330, { zIndex: 4, background: '#8a5a32', border: `8px solid ${INK}`, borderRadius: '20px 20px 0 0' }, `<div style="margin:24px 40px;height:130px;background:#bfe3f5;border:6px solid ${INK}"></div><div style="font-family:Rye;font-size:42px;text-align:center;color:#fff6c8">TAQUILLA</div>`);
  box(cam, -800, 1320, 2680, 200, { zIndex: 5, background: '#9a948a', borderTop: `10px solid ${INK}` }); box(cam, -800, 1320, 2680, 26, { zIndex: 6, background: '#f2c230' });
  box(cam, -800, 1520, 2680, 900, { zIndex: 5, background: '#1d1a22' });
  return { nombre, ads, taq };
}
/* tren de 1919 (rojo, coches de 300) y tren moderno (blanco y azul) — de lado */
const TREN = (c, n, moderno, z = 8) => box(c, 0, 0, n * 420, 330, { zIndex: z }, `<svg viewBox="0 0 ${n * 420} 330" width="${n * 420}" height="330">${[...Array(n)].map((_, i) => `<g transform="translate(${i * 420} 0)"><rect x="8" y="20" width="404" height="260" rx="${moderno ? 40 : 18}" fill="${moderno ? '#f4efe2' : '#b5523a'}" stroke="${INK}" stroke-width="8"/>${moderno ? `<rect x="8" y="190" width="404" height="34" fill="#1f4fa0"/>` : ''}${[0, 1, 2].map(j => `<rect x="${40 + j * 125}" y="70" width="95" height="90" rx="10" fill="#ffe9a6" stroke="${INK}" stroke-width="6"/>`).join('')}${[70, 340].map(x => `<circle cx="${x}" cy="300" r="26" fill="#3d3a44" stroke="${INK}" stroke-width="6"/>`).join('')}</g>`).join('')}</svg>`);

/* PORTADA + L1 (sin cortar): el andén a oscuras, el cartel «CHAMBERÍ»… un tren moderno pasa a toda velocidad sin parar */
plano(-1, L(2) - 0.1, { background: '#1d1a22' }, c => {
  const cam = CAM(c); const A = anden(cam);
  const tren = TREN(cam, 4, true, 9);
  const oscuro = box(cam, -800, -400, 2680, 2720, { zIndex: 7, background: 'radial-gradient(circle at 540px 600px, rgba(10,8,16,.15), rgba(10,8,16,.8) 60%)' });
  const t1 = texto(c, 170, 'AQUÍ EL TREN', { size: 108, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 290, hlSpan('NUNCA PARA', 'phl', RED), { size: 118, color: '#fff', z: 40, shadow: OUT });
  const anos = chip(c, 330, 1150, 'cerrada desde hace 60 años', { size: 54, bg: INK, color: YEL, z: 41 });
  sfx('whoosh', 0.3, 0.8); sp(T.nunca, 'thud', 0.6); sp(T.sesenta, 'pop', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 900, 0.9], [560, 880, 1.05]);
    set(tren, { x: 1500 - ((t * 1900) % 4200), y: 1050 });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
    set(anos, { o: t > T.sesenta - 0.1 ? 1 : 0, s: pop(t, T.sesenta - 0.1, 0.3), r: -3 });
  };
}, { sfx: false });

/* 1919 (L2 → L4, corte): el mismo andén con luz; llega el tren rojo y para; pasan los años y los trenes «se quedan pequeños»: la gente no cabe */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#f4efe2' }, c => {
  const cam = CAM(c); const A = anden(cam);
  const tren = TREN(cam, 2, false, 9);
  const gente = [...Array(6)].map((_, i) => PERS(cam, 0, 0, 170, { ropa: ['#6b4a2a', '#2b3550', '#7a5aa8', '#5e5a52', '#8a3a3a', '#3d5a4a'][i], gorro: i % 2 ? 'gorra' : undefined, gcol: '#3d3a44', pelo: i % 3 ? 'corto' : 'moño', pcol: '#3a2a1e' }));
  const ch = chip(c, 420, 420, '1919', { size: 72, bg: '#b5523a', z: 40 }), ch2 = chip(c, 330, 420, 'Madrid crece…', { size: 62, bg: '#2b3550', z: 40 });
  sp(T.diecinueve, 'whoosh', 0.5); sp(T.inaugura, 'tada', 0.7); sp(T.chamberi2, 'ding', 0.6); sp(T.crece, 'pop', 0.5);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [560, 960, 0.95], [520, 980, 1.1]);
    rotuloA(ch, t, T.diecinueve, T.cuarentaysiete); rotuloA(ch2, t, T.crece - 0.2, L(4));
    const kt = p(t, T.inaugura - 0.6, 1.6, E.outCubic); set(tren, { x: lerp(1500, 140, kt), y: 1000 });
    const mas = t > T.crece; gente.forEach((g, i) => { const n = mas ? 6 : 3; g.style.opacity = i < n ? 1 : 0; set(g, { x: -80 + i * 190, y: 1100 - (mas && i >= 3 ? 40 : 0) + Math.sin(t * 3 + i) * 4 }); pFace(g, t, { feliz: mas ? -0.3 : 0.6, ceja: mas ? 14 : 2, look: [10, 0], seed: i }); });
  };
});

/* L4 → L6 (corte): visto desde arriba: el andén en curva; el tren nuevo, más largo, es recto: los últimos coches se quedan fuera del andén → «no se puede estirar» */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#2a2530' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#2a2530' });
  const curva = box(cam, -200, 300, 1480, 1500, { zIndex: 1 }, `<svg viewBox="0 0 1480 1500" width="1480" height="1500"><path d="M-50,1300 Q740,200 1530,1300" stroke="#1d1a22" stroke-width="240" fill="none"/><path d="M-50,1300 Q740,200 1530,1300" stroke="#9a948a" stroke-width="16" stroke-dasharray="30 20" fill="none"/>
    <path class="and" d="M340,740 Q740,420 1140,740" stroke="#f2c230" stroke-width="70" fill="none" stroke-linecap="round"/><text x="740" y="520" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="56" fill="#fff">andén</text></svg>`);
  const tren = box(cam, 0, 0, 1100, 110, { zIndex: 3, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 1100 110" width="1100" height="110">${[0, 1, 2, 3, 4].map(i => `<rect x="${i * 220 + 4}" y="6" width="210" height="98" rx="14" fill="#f4efe2" stroke="${INK}" stroke-width="7"/>`).join('')}</svg>`);
  const fuera = [0, 1].map(() => box(cam, 0, 0, 230, 120, { zIndex: 4, border: `8px dashed ${RED}`, borderRadius: '16px' }));
  const no = texto(c, 1150, '¡no cabe!', { size: 120, color: RED, z: 40, shadow: `5px 5px 0 #fff` });
  const largo = chip(c, 300, 420, 'trenes más largos', { size: 62, bg: '#1f4fa0', z: 40 });
  sp(T.alargarlos, 'swoosh_up', 0.6); sp(T.curva, 'boing', 0.6); sp(T.estirar, 'error', 0.6);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 900, 1.0], [540, 900, 1.12]);
    set(largo, { o: t > T.alargarlos - 0.2 && t < T.curva ? 1 : 0, s: pop(t, T.alargarlos - 0.2, 0.3), r: -3 });
    const kt = p(t, T.alargarlos, 1.5, E.outCubic); set(tren, { x: lerp(1300, -10, kt), y: 760, s: 1, o: t > T.alargarlos - 0.2 ? 1 : 0 });
    fuera.forEach((f, i) => set(f, { o: t > T.curva + 0.3 ? 1 : 0, x: i ? 870 : -20, y: 750, s: 1 + 0.05 * Math.sin(t * 8) }));
    set(no, { o: t > T.estirar - 0.2 ? 1 : 0, s: pop(t, T.estirar - 0.2, 0.3), r: -5 });
  };
});

/* 1966 (L6 → L8, corte): «CERRADA»; se apagan las luces; el tren pasa de largo. A oscuras, una linterna recorre los azulejos, los anuncios y la taquilla */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#1d1a22' }, c => {
  const cam = CAM(c); const A = anden(cam);
  const tren = TREN(cam, 4, true, 9);
  const sello = texto(cam, 760, 'CERRADA · 1966', { size: 110, color: RED, x: 40, w: 1000, z: 12, shadow: `6px 6px 0 #fff` });
  const negro = box(cam, -800, -400, 2680, 2720, { zIndex: 10, background: 'rgba(10,8,16,.92)' });
  sp(T.cierran, 'stamp', 0.9); sp(T.largo - 0.2, 'whoosh', 0.8); sp(T.oscuras, 'mus_baja', 1); sp(T.azulejos, 'click', 0.4); sp(T.anuncios, 'click', 0.4); sp(T.taquillas, 'click', 0.4);
  return t => {
    const cm = deriva(cam, t, L(6) - 0.1, L(8) - 0.1, [600, 940, 1.0], [480, 960, 1.15]);
    set(sello, { o: t > T.cierran - 0.1 && t < T.oscuras ? 1 : 0, s: t > T.cierran - 0.1 ? lerp(1.8, 1, p(t, T.cierran - 0.1, 0.2)) : 0, r: -8 });
    const kp = p(t, T.largo - 0.3, 1.0, E.inOutCubic); set(tren, { o: t > T.largo - 0.3 && t < T.largo + 0.8 ? 1 : 0, x: lerp(1500, -1800, kp), y: 1050 });
    // la linterna: el círculo de luz va del cartel a los azulejos, a los anuncios y a la taquilla
    const osc = t > T.oscuras - 0.2;
    const objetivos = [[540, 590], [-380, 900], [700, 900], [1060, 900], [540, 1000]]; const tt = [T.oscuras, T.azulejos, T.anuncios, T.anuncios + 0.6, T.taquillas];
    let fx = 540, fy = 590; for (let i = 1; i < tt.length; i++) if (t > tt[i] - 0.4) { const k = p(t, tt[i] - 0.4, 0.5, E.inOutCubic); fx = lerp(objetivos[i - 1][0], objetivos[i][0], k); fy = lerp(objetivos[i - 1][1], objetivos[i][1], k); }
    negro.style.background = osc ? `radial-gradient(circle at ${f1(fx + 800)}px ${f1(fy + 400)}px, rgba(255,240,200,0) 0, rgba(255,240,200,0) 190px, rgba(10,8,16,.94) 260px)` : `rgba(10,8,16,${f1(0.2 * p(t, T.cierran, 1))})`;
  };
});

/* 2008 (L8 → L9, corte): se encienden las luces: museo «ANDÉN 0» y visitantes */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#f4efe2' }, c => {
  const cam = CAM(c); const A = anden(cam);
  const cartel = box(cam, 240, 330, 600, 150, { zIndex: 6, background: '#c8102e', border: `8px solid ${INK}`, borderRadius: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '90px', textAlign: 'center', lineHeight: '134px', color: '#fff' }, 'ANDÉN 0');
  const vis = [...Array(4)].map((_, i) => PERS(cam, -60 + i * 300, 1080, 190, { ropa: ['#e8507a', '#2b8ad6', '#f2c230', '#9fd3c0'][i], pelo: i % 2 ? 'largo' : 'corto', pcol: '#3a2a1e' }));
  const luz = box(cam, -800, -400, 2680, 2720, { zIndex: 9, background: '#0a0810' });
  const ch = chip(c, 420, 420, '2008', { size: 72, bg: '#2e6b3a', z: 40 });
  sp(T.dosmilocho, 'click', 0.7); sp(T.museo, 'tada', 0.7); sp(T.anden, 'ding', 0.8);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 900, 1.0], [540, 920, 1.12]);
    luz.style.opacity = f1(1 - p(t, T.dosmilocho, 0.8));
    set(cartel, { o: t > T.anden - 0.3 ? 1 : 0, s: pop(t, T.anden - 0.3, 0.4), r: -2 }); rotuloA(ch, t, T.dosmilocho, L(9));
    vis.forEach((v, i) => { set(v, { y: Math.sin(t * 2 + i) * 6 }); pFace(v, t, { feliz: 1, look: [0, -10], seed: i }); });
  };
});

/* L9 → L11 (corte): el plano de la línea 1: Iglesia · (Chamberí, fantasma) · Bilbao; el tren pasa → dentro del vagón: uno mira el móvil, otro la ventana… y ve la estación */
plano(L(9) - 0.1, L(11) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#efe1c6' });
  const linea = box(cam, -100, 700, 1280, 40, { zIndex: 2, background: '#38a3dc', border: `6px solid ${INK}`, borderRadius: '20px' });
  const est = [[120, 'Iglesia', 1], [540, 'Chamberí', 0], [960, 'Bilbao', 1]].map(([x, n, ok]) => { const d = box(cam, x - 50, 670, 100, 100, { zIndex: 3, borderRadius: '50%', background: ok ? '#fff' : '#1d1a22', border: `8px ${ok ? 'solid' : 'dashed'} ${INK}` }); texto(cam, 800, n, { size: ok ? 58 : 64, color: ok ? INK : RED, x: x - 200, w: 400, z: 3 }); return d; });
  const fant = texto(cam, 560, 'fantasma', { size: 60, italic: true, color: RED, x: 340, w: 400, z: 4 });
  const bola = box(cam, 0, 0, 70, 70, { zIndex: 5, borderRadius: '50%', background: '#e8507a', border: `6px solid ${INK}` });
  const vag = box(c, 0, 1000, 1080, 380, { zIndex: 20, background: '#f4efe2', borderTop: `10px solid ${INK}` });
  const ven = box(vag, 560, 30, 460, 300, { background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '30px', overflow: 'hidden' });
  const vista = box(ven, 0, 0, 1400, 300, { background: 'repeating-linear-gradient(90deg, #f4efe2 0 60px, #e6dcc8 60px 120px)' }, `<div style="position:absolute;left:500px;top:40px;width:400px;height:90px;background:#fbf6ea;border:6px solid #1f4fa0;font-family:Playfair;font-weight:900;font-size:56px;text-align:center;line-height:80px;color:#1f4fa0">CHAMBERÍ</div>`);
  const pas = PERS(vag, 60, 60, 300, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' }); const movil = box(vag, 240, 250, 70, 110, { zIndex: 12, background: '#1d1a22', border: `5px solid ${INK}`, borderRadius: '12px' });
  sp(T.bajarte, 'pop', 0.5); sp(T.iglesia, 'whoosh', 0.6); sp(T.movil, 'error', 0.4); sp(T.ventana, 'sparkle', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(11) - 0.1, [540, 760, 1.0], [540, 780, 1.08]);
    const kb = clamp((t - T.iglesia + 0.3) / 2.6); set(bola, { x: lerp(120, 960, kb) - 35, y: 685 });
    set(fant, { o: t > T.iglesia ? 1 : 0, r: -4 + Math.sin(t * 3) * 2 });
    const dentro = t > T.proxima - 0.3; set(vag, { o: dentro ? 1 : 0, y: dentro ? (1 - p(t, T.proxima - 0.3, 0.4, E.outCubic)) * 400 : 400 });
    const mira = t > T.ventana - 0.3; set(vista, { x: mira ? lerp(200, -900, p(t, T.ventana - 0.3, 2.0)) : 200 - ((t * 400) % 120) });
    pFace(pas, t, { feliz: mira ? 1 : 0, ceja: mira ? 16 : 0, look: mira ? [14, -6] : [6, 14], jaw: mira ? 0.5 : 0, seed: 1 }); set(movil, { o: mira ? 0 : 1 });
  };
});

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Conoces alguna otra', 'estación fantasma?', { size: 84, draw: c => [['la de mi ciudad', YEL], ['ni idea', PINK], ['voy a mirar en la línea 1', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 260 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(108, 'Andén 0', ['METRO', 'fantasma']);

Story.run({
  textura: true,
  ovalo: [[T.ventana + 0.3, L(11) - 0.15]],
  vecino: { risa: [], sorpresa: [[T.ventana + 0.3, T.ventana + 1.3]], golpes: [] },
});
