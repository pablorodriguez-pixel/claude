/* Ep. 68 · Las pirámides no las construyeron esclavos — edición estilo ep07 OK / ep64 kétchup */
Story.prepara();
const T = {
  esclavos0: Q('esclavos'),
  sabemos: Q('lo sabemos'), tumbas: Q('sus tumbas'), diario1: Q('el diario'),
  guiza: Q('de guiza'), pueblo: Q('un pueblo de obreros'), casas: Q('casas'), panad: Q('panaderías'), cerv: Q('y cervecerías'),
  cobraba: Q('cobraba en comida'), pan3: Q('pan'), litros: Q('cuatro litros'), cerv3: Q('de cerveza'), dia: Q('al día'),
  enterraban: Q('los enterraban'), faraon: Q('del faraón'), honores: Q('con honores'), esclavo4: Q('a un esclavo'), rey: Q('junto al rey'),
  medicos: Q('tenían médicos'), esqueletos: Q('esqueletos'), rotos: Q('huesos rotos'), curaron: Q('se curaron'), ferulas: Q('con férulas'),
  m2013: Q('dos mil trece'), papiros: Q('los papiros'), egipto7: Q('de egipto'), capataz: Q('un capataz'), merer: Q('merer'),
  cuenta: Q('cuenta cómo'), bloques: Q('bloques de piedra'), barca: Q('en barca'), gran: Q('la gran pirámide'),
  dedonde: Q('de dónde sale'), griego: Q('un historiador griego'), despues: Q('dos mil años después'), hollywood: Q('hollywood'),
  pintadas: Q('hay pintadas'), cuadrillas: Q('las cuadrillas'), amigos: Q('los amigos de keops'),
  ojo: Q('ojo'), cifra: Q('la cifra'), estudio: Q('según el estudio'),
  currantes: Q('currantes'), pagados: Q('pagados en pan'),
};
const CREMA = '#FBF6EA', ARENA = '#e8cf95', ADOBE = '#c9925a', NILO = '#3f7fb5', VERDE = '#4c8a3a';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
/* ---------- figuras ---------- */
const PIRAMIDE = (c, x, y, w, z = 3) => figura(c, x, y, w, w * 0.62, `<path d="M0,310 L250,0 L500,310 Z" fill="#d9b56c" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M250,0 L290,310 L500,310 Z" fill="#b8924a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${[...Array(6)].map((_, i) => `<path d="M${42 + i * 34},${258 - i * 42} H${458 - i * 34}" stroke="${INK}" stroke-width="2.5" opacity=".35"/>`).join('')}`, '0 0 500 310', { z, origin: '50% 100%' });
const SOL = (c, x, y, w) => box(c, x, y, w, w, { zIndex: 2, borderRadius: '50%', background: YEL, border: `7px solid ${INK}`, boxShadow: `0 0 0 18px rgba(255,230,0,.35)` });
const DESIERTO = c => { box(c, 0, 0, 1080, 1920, { zIndex: 0, background: 'linear-gradient(#f6dca0 0 55%, #e8cf95 55%)' }); return box(c, -100, 1250, 1300, 700, { zIndex: 4, background: '#d9b56c', borderTop: `8px solid ${INK}`, borderRadius: '50% 50% 0 0 / 60px 60px 0 0' }); };
const BLOQUE = (c, x, y, w, z = 8) => figura(c, x, y, w, w * 0.6, `${FIGP('M6,6 L294,6 L294,174 L6,174 Z', '#cdb27a', 6, .35)}<path d="M40,60 L90,60 M200,120 L260,120 M120,140 L160,140" stroke="${INK}" stroke-width="3" opacity=".4"/>`, '0 0 300 180', { z, origin: '50% 100%' });
const TRINEO = (c, x, y, w) => figura(c, x, y, w, w * 0.2, `<path d="M10,30 H290 Q310,30 300,10" stroke="#8a5a32" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M10,30 H290 Q310,30 300,10" stroke="${INK}" stroke-width="4" fill="none"/>`, '0 0 300 60', { z: 7 });
const jarraInner = () => `${FIGP('M60,60 C20,80 20,260 70,300 L230,300 C280,260 280,80 240,60 Z', '#c27a3a', 7, .35)}<rect x="70" y="30" width="160" height="40" rx="12" fill="#a8632b" stroke="${INK}" stroke-width="6"/><path d="M80,30 C70,0 110,-10 120,10 C130,-14 170,-14 180,8 C196,-8 236,6 222,32 Z" fill="#fff8e0" stroke="${INK}" stroke-width="5"/><path d="M60,250 Q150,270 240,250" stroke="${INK}" stroke-width="4" fill="none" opacity=".4"/>
  <g transform="translate(0 20)">${CARAC}</g>`;
const JARRA = (c, x, y, w, z = 9) => figura(c, x, y, w, w * 1.05, jarraInner(), '0 -20 300 330', { z, origin: '50% 100%' });
const jFace = (f, t, o) => conFace(f, t, o);
const PAN = (c, x, y, w) => figura(c, x, y, w, w * 0.6, `<path d="M10,90 C10,20 190,20 190,90 Z" fill="#d99a4e" stroke="${INK}" stroke-width="6"/><path d="M60,40 q10,20 0,40 M100,32 q10,24 0,48 M140,40 q10,20 0,40" stroke="${INK}" stroke-width="4" fill="none" opacity=".5"/>`, '0 0 200 100', { z: 10, origin: '50% 100%' });
const CASA = (c, x, y, w, z = 5) => figura(c, x, y, w, w * 0.8, `${FIGP('M10,60 L230,60 L230,190 L10,190 Z', ADOBE, 6, .3)}<rect x="0" y="44" width="240" height="22" fill="#b57a42" stroke="${INK}" stroke-width="5"/><rect x="96" y="110" width="50" height="80" fill="#5a3a20" stroke="${INK}" stroke-width="4"/><rect x="30" y="90" width="36" height="30" fill="#5a3a20" stroke="${INK}" stroke-width="4"/><rect x="176" y="90" width="36" height="30" fill="#5a3a20" stroke="${INK}" stroke-width="4"/>`, '0 0 240 192', { z, origin: '50% 100%' });
const HORNO = (c, x, y, w) => figura(c, x, y, w, w * 0.8, `${FIGP('M20,200 L20,100 C20,20 230,20 230,100 L230,200 Z', '#9a6a3a', 6, .3)}<path d="M80,200 V140 C80,100 170,100 170,140 V200 Z" fill="#2b1810" stroke="${INK}" stroke-width="5"/><path class="fl" d="M100,200 C100,170 125,150 125,130 C135,155 150,170 150,200 Z" fill="#f28c28" stroke="${INK}" stroke-width="3"/>`, '0 0 250 200', { z: 6, origin: '50% 100%' });
const HUESO = (c, x, y, w) => figura(c, x, y, w, w * 0.4, `<path d="M60,40 C20,0 -10,50 30,60 C-10,70 20,120 60,80 L240,80 C280,120 310,70 270,60 C310,50 280,0 240,40 Z" fill="#f4efe2" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path class="raja" d="M150,40 L140,58 L160,66 L148,82" stroke="${INK}" stroke-width="6" fill="none"/><g class="fer" style="opacity:0">${[118, 140, 162, 184].map(x => `<rect x="${x - 9}" y="28" width="18" height="64" rx="4" fill="#e8d7a8" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M100,40 L200,40 M100,80 L200,80" stroke="#8a5a32" stroke-width="10"/></g><g transform="translate(-0 -86) scale(1)">${CARAC.replace(/cy="140"/g, 'cy="140"')}</g>`, '0 -20 300 140', { z: 9, origin: '50% 50%' });
const papInner = (n = 4) => `${FIGP('M30,20 L670,20 L670,440 L30,440 Z', '#e9d9a6', 6, .25)}<rect x="0" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/><rect x="650" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/>${[...Array(n)].map((_, r) => [...Array(9)].map((_, k) => `<path class="gl" d="${['M0,40 L20,0 L40,40 Z', 'M20,0 a20,20 0 1 0 0.1,0', 'M0,20 Q20,-10 40,20 Q20,50 0,20', 'M10,0 V40 M0,10 H20', 'M0,30 C10,0 30,0 40,30', 'M0,0 H40 V40 H0 Z'][(r * 9 + k) % 6]}" transform="translate(${90 + k * 62} ${60 + r * 95}) scale(.9)" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>`).join('')).join('')}`;
const PAPIRO = (c, x, y, w) => { const f = figura(c, x, y, w, w * 460 / 700, papInner(), '0 0 700 460', { z: 8, origin: '50% 50%' }); f.gl = [...f.querySelectorAll('.gl')]; return f; };
const BARCA = (c, x, y, w) => figura(c, x, y, w, w * 0.62, `<path d="M20,240 Q300,330 580,240 L540,300 Q300,360 60,300 Z" fill="#8a5a32" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M300,250 V20" stroke="${INK}" stroke-width="10"/><path d="M304,30 L470,220 L304,220 Z" fill="${CREMA}" stroke="${INK}" stroke-width="6"/>`, '0 0 600 370', { z: 7, origin: '50% 100%' });
const CLAQUETA = (c, x, y, w) => { const d = figura(c, x, y, w, w * 0.85, `<rect x="10" y="90" width="380" height="240" rx="10" fill="#2b2118" stroke="${INK}" stroke-width="6"/><text x="200" y="190" text-anchor="middle" font-family="Rye" font-size="44" fill="#fff">HOLLYWOOD</text><text x="200" y="260" text-anchor="middle" font-family="SpecialElite" font-size="32" fill="#fff">ESCENA 1 · TOMA 1</text><g class="tapa" style="transform-origin:14px 88px"><rect x="10" y="40" width="380" height="50" fill="#fff" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${30 + i * 76},40 L${80 + i * 76},90 L${110 + i * 76},90 L${60 + i * 76},40 Z" fill="#2b2118"/>`).join('')}</g>`, '0 0 400 340', { z: 12, origin: '50% 50%' }); d.tapa = d.querySelector('.tapa'); return d; };
const CADENA = (c, x, y, w) => box(c, x, y, w, 60, { zIndex: 11 }, `<svg viewBox="0 0 ${w} 60" width="${w}" height="60">${[...Array(Math.floor(w / 50))].map((_, i) => `<ellipse cx="${30 + i * 50}" cy="30" rx="28" ry="16" fill="none" stroke="#7d8790" stroke-width="10"/><ellipse cx="${30 + i * 50}" cy="30" rx="28" ry="16" fill="none" stroke="${INK}" stroke-width="3"/>`).join('')}</svg>`);
const VASO = (c, x, y) => { const d = box(c, x, y, 220, 380, { zIndex: 9, border: `8px solid ${INK}`, borderTop: 'none', borderRadius: '0 0 40px 40px', background: 'rgba(220,240,250,.6)', overflow: 'hidden' }); d.liq = box(d, 0, 380, 220, 380, { background: '#e0a52a', borderTop: `10px solid #fff8e0` }); return d; };
/* obreros con cara */
const OBR = (c, x, y, w, o = {}) => PJ(c, x, y, w, Object.assign({}, EGIPCIO, o));
const habla = (f, t, o = {}) => conFace(f, t, Object.assign({ jaw: talkW(t, 'VECINO') * 0.8, feliz: 1 }, o));

/* L0 · PORTADA — pirámide, obreros con cara tirando de un bloque, la jarra de cerveza brinda; sello «¡CON SUELDO!» */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 240, 'Las pirámides NO', { size: 96 });
  const t2 = texto(c, 345, 'las hicieron ' + hlSpan('esclavos', 'phl'), { size: 100, italic: true });
  const sol = SOL(c, 820, 500, 150);
  const pi = PIRAMIDE(c, 110, 600, 860, 3);
  box(c, 0, 1150, 1080, 900, { zIndex: 4, background: '#d9b56c', borderTop: `8px solid ${INK}` });
  const bl = BLOQUE(c, 600, 930, 380, 8); const tr = TRINEO(c, 590, 1150, 400);
  const ob = [[40, 0], [290, 1]].map(([x, i]) => OBR(c, x, 830, 300, { seed: i }));
  const cuerda = box(c, 330, 1030, 300, 8, { zIndex: 7, background: '#8a5a32', border: `2px solid ${INK}`, transformOrigin: '0 50%' });
  const ja = JARRA(c, 400, 1200, 280, 12);
  const st = stamp(c, 300, 470, '¡CON SUELDO!', { size: 84, col: VERDE, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6); sp(T.esclavos0 + 0.3, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(sol, { r: t * 20, s: 1 + 0.04 * Math.sin(t * 4) });
    const tir = Math.sin(t * 6); ob.forEach((o, i) => { set(o, { r: -10 + tir * 4, x: tir * 6 }); conFace(o, t, { jaw: i ? 0.3 + 0.3 * Math.abs(tir) : talkW(t, 'VECINO'), feliz: 1, look: [-6, 0], ceja: 6, seed: i }); });
    set(bl, { x: Math.sin(t * 6) * 8 }); set(tr, { x: Math.sin(t * 6) * 8 }); set(cuerda, { r: -4 + tir });
    const hop = Math.abs(Math.sin(t * 5)); set(ja, { y: -hop * 26, r: Math.sin(t * 5) * 6 }); jFace(ja, t, { feliz: 1, jaw: 0.4 + 0.4 * hop, closed: t > T.esclavos0 && t < T.esclavos0 + 0.4, seed: 0.7 });
    stampA(st, t, T.esclavos0 + 0.3, -6);
  };
}, { sfx: false });

/* L1 · lo sabemos: excavación → aparece una tumba… y un diario */
headline(L(1) - 0.1, L(2) - 0.1, 'Hay *pruebas*', { size: 92, hlT: T.sabemos + 0.2 });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#f6dca0' }, c => {
  const cam = CAM(c);
  const capas = box(cam, 0, 700, 1080, 1300, { zIndex: 2, background: 'repeating-linear-gradient(0deg, #d9b56c 0 90px, #c9a05a 90px 180px)', borderTop: `8px solid ${INK}` });
  const pi = PIRAMIDE(cam, 600, 420, 440, 1);
  const arq = PJ(cam, 40, 400, 320, { piel: '#e8b48a', ropa: '#b8a070', tocado: 'banda', gcol: '#c9a05a', pelo: '#6b4a2a' });
  const deco = [HUESO(cam, 80, 1180, 220), JARRA(cam, 820, 1150, 150, 4)]; deco.forEach(d => d.style.opacity = 0.55);
  const pala = box(cam, 330, 520, 40, 240, { zIndex: 10, background: '#8a5a32', border: `4px solid ${INK}`, transformOrigin: '50% 0%' });
  const puerta = figura(cam, 360, 900, 360, 400, `${FIGP('M20,400 L20,80 L340,80 L340,400 Z', '#8a6a3a', 7, .3)}<rect x="0" y="40" width="360" height="50" fill="#b8924a" stroke="${INK}" stroke-width="6"/><path d="M110,400 V180 H250 V400" fill="#1d1410" stroke="${INK}" stroke-width="6"/>${['M0,40 L20,0 L40,40 Z', 'M20,0 a20,20 0 1 0 0.1,0', 'M0,20 Q20,-10 40,20 Q20,50 0,20'].map((d, i) => `<path d="${d}" transform="translate(${130 + i * 40} 110) scale(.7)" stroke="${INK}" stroke-width="5" fill="none"/>`).join('')}`, '0 0 360 400', { z: 6 });
  const polvo = [0, 1, 2, 3, 4].map(i => box(cam, 400 + i * 60, 880, 50, 50, { zIndex: 8, borderRadius: '50%', background: 'rgba(217,181,108,.9)', border: `3px solid ${INK}` }));
  const pap = PAPIRO(cam, 560, 1000, 420); const brs = [0, 1, 2, 3].map(() => ESTRELLA(cam, 60, GOLD));
  const oh = BOCADILLO(cam, 90, 380, '¡OOOH!', { size: 56 });
  sp(T.tumbas, 'thud', 0.9); sp(T.tumbas + 0.1, 'sparkle', 0.6); sp(T.diario1, 'paper', 0.8); sp(T.diario1 + 0.2, 'ding', 0.7);
  return t => {
    zoom(cam, t, L(1), 4.6, 0.08);
    set(pala, { r: Math.sin(t * 9) * 25 }); conFace(arq, t, { look: [8, 6], jaw: t > T.tumbas ? 0.6 : 0, ceja: t > T.tumbas ? 14 : 0, feliz: 1 });
    set(puerta, { y: (1 - p(t, T.tumbas - 0.2, 0.6, E.outBack)) * 500, o: t > T.tumbas - 0.2 ? 1 : 0 });
    polvo.forEach((d, i) => { const k = p(t, T.tumbas, 0.8); set(d, { o: k > 0 && k < 1 ? 1 - k : 0, x: (i - 2) * 80 * k, y: -120 * k, s: 0.5 + k }); });
    set(pap, { o: t > T.diario1 ? 1 : 0, s: pop(t, T.diario1, 0.45), r: -6 + Math.sin(t * 3) * 3 }); pap.gl.forEach((g, i) => g.style.opacity = t > T.diario1 + 0.2 + i * 0.02 ? 1 : 0);
    brs.forEach((b, i) => { const a = t * 2 + i * 1.57; set(b, { x: 770 + Math.cos(a) * 260, y: 1130 + Math.sin(a) * 170, o: t > T.diario1 ? 1 : 0, s: 0.7 + 0.4 * Math.sin(t * 8 + i) }); });
    popA(oh, t, T.diario1 + 0.3, { r: -5 });
  };
});

/* L2 · Guiza: el pueblo de obreros — casas, panaderías… y CERVECERÍAS */
headline(L(2) - 0.1, L(3) - 0.1, 'Un *pueblo* de obreros', { size: 88, hlT: T.pueblo + 0.2 });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#f6dca0' }, c => {
  const cam = CAM(c);
  const sol = SOL(cam, 840, 380, 140);
  const ps = [[60, 470, 460, 1], [440, 400, 600, 1]].map(([x, y, w, z]) => PIRAMIDE(cam, x, y, w, z));
  box(cam, 0, 1000, 1080, 1000, { zIndex: 3, background: '#e0c080', borderTop: `8px solid ${INK}` });
  const casas = [60, 300, 540, 780].map((x, i) => CASA(cam, x, 830 + (i % 2) * 30, 230, 4));
  const horno = HORNO(cam, 330, 1050, 260); const panes = [0, 1, 2].map(i => PAN(cam, 590 + i * 80, 1180, 110));
  const ja = [0, 1, 2].map(i => JARRA(cam, 560 + i * 150, 1050, 150, 9));
  const lbs = [['casas', T.casas, 380], ['panaderías', T.panad, 330], ['¡cervecerías!', T.cerv, 560]].map(([s, t0, x]) => [chip(cam, x, 960, s, { size: 50, bg: '#fff', color: INK }), t0]);
  const pin = box(cam, 540, 600, 60, 80, { zIndex: 12 }, `<svg viewBox="0 0 60 80" width="60" height="80"><path d="M30,78 C10,50 0,36 0,28 A30,28 0 0 1 60,28 C60,36 50,50 30,78 Z" fill="#c8102e" stroke="${INK}" stroke-width="5"/><circle cx="30" cy="28" r="10" fill="#fff"/></svg>`);
  const gz = chip(cam, 610, 610, 'Guiza', { size: 46, bg: PINK });
  casas.forEach((h, i) => sp(T.casas + i * 0.1, 'pop', 0.4)); sp(T.panad, 'pop2', 0.6); sp(T.cerv, 'boing', 0.8); sp(T.cerv + 0.3, 'gulp', 0.7); sp(T.guiza, 'pop', 0.6);
  return t => {
    zoom(cam, t, L(2), 6.5, 0.07); set(sol, { r: t * 20 });
    set(pin, { o: t > T.guiza ? 1 : 0, y: -(1 - p(t, T.guiza, 0.4, E.outBack)) * 300 }); popA(gz, t, T.guiza + 0.1, { r: -3 });
    casas.forEach((h, i) => set(h, { s: pop(t, T.casas + i * 0.1, 0.35), o: t > T.casas + i * 0.1 ? 1 : 0 }));
    set(horno, { o: t > T.panad ? 1 : 0, s: pop(t, T.panad, 0.35) }); horno.querySelector('.fl').setAttribute('transform', `translate(125 200) scale(1 ${f1(0.8 + 0.3 * Math.sin(t * 16))}) translate(-125 -200)`);
    panes.forEach((b, i) => set(b, { o: t > T.panad + 0.3 + i * 0.12 ? 1 : 0, y: -(1 - p(t, T.panad + 0.3 + i * 0.12, 0.35, E.outBack)) * 200 }));
    ja.forEach((j, i) => { set(j, { o: t > T.cerv + i * 0.1 ? 1 : 0, s: pop(t, T.cerv + i * 0.1, 0.4), y: -Math.abs(Math.sin(t * 6 + i)) * 20, r: Math.sin(t * 6 + i) * 6 }); jFace(j, t, { feliz: 1, jaw: 0.6, ceja: 8, seed: i }); });
    set(panes[0], {}); set(horno, { x: t > T.cerv ? -170 * p(t, T.cerv, 0.3) : 0 }); panes.forEach((b, i) => { if (t > T.cerv) set(b, { x: -240 * p(t, T.cerv, 0.3), y: 0 }); });
    lbs.forEach(([e, t0], i) => popA(e, t, t0, { r: i % 2 ? 3 : -3, o: t < (lbs[i + 1] ? lbs[i + 1][1] : 99) ? 1 : 0 }));
  };
});

/* L3 · el sueldo: pan… y CUATRO LITROS de cerveza al día (el vaso se llena) */
headline(L(3) - 0.1, L(4) - 0.1, 'El *sueldo*', { size: 96, hlT: T.cobraba + 0.2 });
plano(L(3) - 0.1, L(4) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const ob = OBR(cam, 130, 560, 400);
  const panes = [0, 1, 2, 3].map(i => PAN(cam, 120 + (i % 2) * 180, 1050 + Math.floor(i / 2) * 70, 170));
  const vaso = VASO(cam, 640, 600);
  const marcas = [1, 2, 3, 4].map(n => texto(cam, 980 - n * 95, `${n} L`, { size: 46, x: 880, w: 140, color: INK, z: 12 }));
  const cnt = texto(cam, 1020, '0 L', { size: 130, color: '#c27a3a', x: 560, w: 400, shadow: `4px 4px 0 ${INK}` });
  const dia = stamp(cam, 600, 470, 'AL DÍA', { size: 70, z: 30 });
  [0, 1, 2, 3].forEach(i => sp(T.pan3 + i * 0.12, 'pop', 0.4)); sp(T.litros, 'gulp', 0.8); sp(T.litros + 0.5, 'gulp', 0.8); sp(T.dia, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(3), 4.6, 0.06); set(ry, { r: t * 8 });
    conFace(ob, t, { look: t > T.litros ? [10, 0] : [4, 6], feliz: 1, jaw: t > T.cerv3 ? 0.9 : t > T.pan3 ? 0.4 : 0, ceja: t > T.litros ? 14 : 0 }); set(ob, { y: t > T.cerv3 ? -Math.abs(Math.sin(t * 8)) * 20 : 0 });
    panes.forEach((b, i) => set(b, { o: t > T.pan3 + i * 0.12 ? 1 : 0, y: -(1 - p(t, T.pan3 + i * 0.12, 0.35, E.outBack)) * 400 }));
    const k = p(t, T.litros - 0.1, 1.4, E.inOutCubic); set(vaso.liq, { y: -380 * k * 0.95 }); cnt.textContent = Math.round(k * 4) + ' L';
    set(cnt, { s: t > T.cerv3 ? 1 + 0.15 * (1 - p(t, T.cerv3, 0.4)) : 1 });
    stampA(dia, t, T.dia, -8);
  };
});
shakeAt(T.dia, 0.3, 12);

/* L4 · enterrados al lado del faraón, con honores — a un esclavo no lo entierras junto al rey */
headline(L(4) - 0.1, L(5) - 0.1, 'Junto al *rey*', { size: 96, hlT: T.faraon });
plano(L(4) - 0.1, T.esclavo4 - 0.1, { background: '#f6dca0' }, c => {
  const cam = CAM(c);
  const pi = PIRAMIDE(cam, 300, 420, 700, 2);
  box(cam, 0, 850, 1080, 1100, { zIndex: 3, background: '#e0c080', borderTop: `8px solid ${INK}` });
  const tumbas = [0, 1, 2, 3, 4].map(i => figura(cam, 40 + i * 200, 1120, 170, 150, `${FIGP('M10,140 L10,50 C10,10 160,10 160,50 L160,140 Z', '#b8924a', 6, .3)}<path d="M60,60 H110 M85,40 V90" stroke="${INK}" stroke-width="6"/>`, '0 0 170 150', { z: 5 }));
  const far = PJ(cam, 640, 740, 360, { piel: '#b0703f', ropa: '#f3efe6', tocado: 'nemes', nemes: true, collar: GOLD });
  const ob = OBR(cam, 320, 780, 320);
  const meds = [0, 1].map(i => box(cam, 390 + i * 70, 1010, 70, 90, { zIndex: 14 }, `<svg viewBox="0 0 70 90" width="70" height="90"><path d="M20,0 L35,30 L50,0" stroke="#2b4a8c" stroke-width="10" fill="none"/><circle cx="35" cy="56" r="28" fill="${GOLD}" stroke="${INK}" stroke-width="5"/></svg>`));
  const fl = [0, 1, 2, 3, 4, 5].map(i => ESTRELLA(cam, 50, '#fff'));
  sp(T.enterraban, 'thud', 0.6); sp(T.faraon, 'ding', 0.7); sp(T.honores, 'tada', 0.7);
  return t => {
    zoom(cam, t, L(4), 4, 0.06);
    tumbas.forEach((tb, i) => set(tb, { s: pop(t, T.enterraban + i * 0.12, 0.35), o: t > T.enterraban + i * 0.12 ? 1 : 0 }));
    set(far, { o: t > T.faraon - 0.1 ? 1 : 0, s: pop(t, T.faraon - 0.1, 0.4) }); conFace(far, t, { look: [-8, 2], feliz: 1, jaw: t > T.honores ? 0.4 : 0, ceja: 6 });
    conFace(ob, t, { look: [8, -4], feliz: 1, jaw: t > T.honores ? 0.7 : 0, ceja: t > T.honores ? 12 : 0 }); set(ob, { y: t > T.honores ? -Math.abs(Math.sin(t * 7)) * 24 : 0 });
    meds.forEach((m, i) => set(m, { o: t > T.honores + i * 0.15 ? 1 : 0, s: pop(t, T.honores + i * 0.15, 0.3), r: Math.sin(t * 5 + i) * 10 }));
    fl.forEach((f, i) => { const a = t * 2 + i; set(f, { x: 470 + Math.cos(a) * 220, y: 900 + Math.sin(a * 1.3) * 120, o: t > T.honores ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 9 + i) }); });
  };
});
plano(T.esclavo4 - 0.1, L(5) - 0.1, { background: '#3a2e28' }, c => {
  const foco = box(c, 190, 420, 700, 900, { zIndex: 1, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,180,.55), transparent 65%)' });
  const sil = PJ(c, 340, 600, 400, { piel: '#5a4a40', ropa: '#5a4a40', pelo: '#2b2118' }); sil.style.filter = 'grayscale(1) brightness(0.7)';
  const cad = CADENA(c, 300, 1000, 480);
  const x = box(c, 300, 560, 480, 480, { zIndex: 20 }, XSVG);
  const no = sello(c, 380, '¡NI DE BROMA!', T.rey, { size: 96, r: -6 });
  sp(T.esclavo4, 'scratch', 0.8); sp(T.rey - 0.1, 'stamp', 1);
  return t => { set(sil, { x: Math.sin(t * 2) * 6 }); set(cad, { x: Math.sin(t * 3) * 5 }); set(x, { o: t > T.rey - 0.1 ? 1 : 0, s: pop(t, T.rey - 0.1, 0.3) }); set(foco, { o: 0.7 + 0.3 * Math.sin(t * 7) }); };
});
shakeAt(T.rey - 0.1, 0.35, 16);

/* L5 · médicos: el hueso roto con cara se cura con una férula */
headline(L(5) - 0.1, L(6) - 0.1, '*Médicos* en la obra', { size: 88, hlT: T.medicos });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#d9ecef', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 4px, transparent 4px 120px)' }, c => {
  const cam = CAM(c);
  const doc = OBR(cam, 60, 520, 330, { ropa: '#fff', collar: '#c8102e', tocado: 'banda', gcol: '#fff' });
  const mesa = box(cam, 340, 980, 700, 40, { zIndex: 6, background: WOOD, border: `6px solid ${INK}`, borderRadius: '10px' });
  const hu = HUESO(cam, 420, 760, 560);
  const ay = BOCADILLO(cam, 600, 560, '¡AY!', { size: 64 });
  const cur = stamp(cam, 520, 1120, 'CURADO', { size: 90, col: VERDE, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const lg = sudor(cam, 900, 760);
  sp(T.rotos, 'glitch', 0.7); sp(T.rotos + 0.1, 'boing', 0.6); sp(T.ferulas, 'paper', 0.7); sp(T.curaron, 'stamp', 0.9); sp(T.curaron + 0.2, 'tada', 0.6);
  return t => {
    zoom(cam, t, L(5), 4.7, 0.07);
    conFace(doc, t, { look: [10, 4], jaw: talkW(t, 'VECINO') * 0.5, feliz: 1, ceja: t > T.curaron ? 10 : 0 });
    set(hu, { o: t > T.esqueletos - 0.2 ? 1 : 0, s: pop(t, T.esqueletos - 0.2, 0.4), x: t > T.rotos && t < T.curaron ? Math.sin(t * 40) * 5 : 0 });
    hu.querySelector('.raja').style.opacity = t > T.rotos ? 1 : 0; hu.querySelector('.fer').style.opacity = t > T.ferulas - 0.4 || t > T.curaron ? 1 : 0;
    conFace(hu, t, t > T.curaron ? { feliz: 1, jaw: 0.5, ceja: 8 } : t > T.rotos ? { feliz: -1, closed: true, jaw: 0.6, ceja: -4 } : { feliz: 0.5, look: [-4, 0] });
    popA(ay, t, T.rotos + 0.1, { r: 6, o: t < T.curaron ? 1 : 0 }); stampA(cur, t, T.curaron, -6); set(lg, { o: t > T.rotos && t < T.curaron ? 1 : 0, y: (t * 140) % 100 });
  };
});
shakeAt(T.rotos + 0.1, 0.25, 10);

/* L6 · CTA */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · 2013: aparece el papiro más antiguo de Egipto, el diario de Merer */
headline(L(7) - 0.1, L(8) - 0.1, 'El diario de *Merer*', { size: 90, hlT: T.merer });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#c9a05a', backgroundImage: 'radial-gradient(ellipse at 50% 55%, #f6dca0 0 38%, #8a6a3a 70%)' }, c => {
  const cam = CAM(c);
  sello(c, 380, '2013', T.m2013, { size: 130, r: -4, col: INK });
  const pap = PAPIRO(cam, 140, 560, 800);
  const brs = [0, 1, 2, 3, 4].map(() => ESTRELLA(cam, 60, GOLD));
  const mer = OBR(cam, 620, 900, 330, { tocado: 'banda', gcol: '#2e8a8a' });
  const vara = box(cam, 600, 880, 18, 360, { zIndex: 8, background: '#8a5a32', border: `4px solid ${INK}`, borderRadius: '8px', transformOrigin: '50% 100%' });
  const tag = chip(cam, 640, 1290, 'Merer, capataz', { size: 50, bg: YEL, color: INK });
  const ant = chip(cam, 160, 1000, 'el más antiguo', { size: 50, bg: '#fff', color: INK });
  sp(T.papiros, 'paper', 0.9); sp(T.papiros + 0.3, 'sparkle', 0.8); sp(T.merer, 'pop2', 0.8); sp(T.capataz, 'whoosh', 0.6);
  return t => {
    zoom(cam, t, L(7), 5.6, 0.06);
    const k = p(t, T.papiros - 0.2, 0.6, E.outCubic); set(pap, { sx: Math.max(0.05, k), o: t > T.papiros - 0.2 ? 1 : 0 }); pap.gl.forEach((g, i) => g.style.opacity = t > T.papiros + 0.3 + i * 0.02 ? 0.6 + 0.4 * Math.sin(t * 5 + i) : 0);
    brs.forEach((b, i) => { const a = t * 1.6 + i * 1.26; set(b, { x: 510 + Math.cos(a) * 470, y: 760 + Math.sin(a) * 260, o: t > T.papiros ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 8 + i) }); });
    popA(ant, t, T.egipto7, { r: -4 });
    set(mer, { o: t > T.capataz ? 1 : 0, y: (1 - p(t, T.capataz, 0.45, E.outBack)) * 500 }); set(vara, { o: t > T.capataz ? 1 : 0, y: (1 - p(t, T.capataz, 0.45, E.outBack)) * 500, r: Math.sin(t * 3) * 4 });
    conFace(mer, t, { look: [-8, -2], feliz: 1, jaw: t > T.merer ? 0.5 : 0, ceja: t > T.merer ? 10 : 0 }); popA(tag, t, T.merer, { r: 3 });
  };
});

/* L8 · bloques de piedra en barca por el Nilo… hasta la Gran Pirámide */
headline(L(8) - 0.1, L(9) - 0.1, 'En *barca* por el Nilo', { size: 88, hlT: T.barca });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#f6dca0' }, c => {
  const sol = SOL(c, 120, 380, 140);
  const pi = PIRAMIDE(c, 600, 560, 440, 2);
  const palmas = [60, 860].map(x => box(c, x, 700, 140, 340, { zIndex: 3 }, `<svg viewBox="0 0 140 340" width="140" height="340" style="overflow:visible"><path d="M70,340 C60,240 80,140 70,60" stroke="#8a5a32" stroke-width="18" fill="none"/><path d="M70,60 q-60,-10 -80,40 M70,60 q60,-10 80,40 M70,60 q-30,-50 -70,-50 M70,60 q30,-50 70,-50" stroke="${VERDE}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`));
  box(c, 0, 1000, 1080, 1000, { zIndex: 3, background: NILO });
  const o1 = OLAS(c, 980, '#5c9fd6', 4), o2 = OLAS(c, 1200, NILO, 9);
  box(c, 0, 1320, 1080, 700, { zIndex: 9, background: NILO });
  const gs = [[300, 520], [480, 460]].map(([x, y]) => GAVIOTA(c, x, y));
  const br = BARCA(c, 0, 800, 520);
  const bl = BLOQUE(c, 0, 900, 200, 8);
  const rem = [0, 1].map(i => OBR(c, 0, 860, 150, { seed: i }));
  const gran = chip(c, 660, 500, 'la Gran Pirámide', { size: 48, bg: PINK });
  sp(L(8), 'whoosh', 0.6); sp(T.bloques, 'thud', 0.7); sp(T.barca, 'pop2', 0.6); sp(T.gran, 'ding', 0.8);
  return t => {
    const k = p(t, L(8), L(9) - L(8), E.inOutCubic), bx = lerp(-180, 560, k), by = Math.sin(t * 3) * 10;
    set(br, { x: bx, y: by, r: Math.sin(t * 2.4) * 3 }); set(bl, { x: bx + 280, y: by, o: t > T.bloques - 0.2 ? 1 : 0, s: t > T.bloques - 0.2 ? pop(t, T.bloques - 0.2, 0.35) : 0 });
    rem.forEach((r, i) => { set(r, { x: bx + 70 + i * 120, y: by - 40 + Math.sin(t * 8 + i) * 6, r: Math.sin(t * 8 + i) * 8 }); conFace(r, t, { feliz: 1, jaw: Math.abs(Math.sin(t * 8 + i)) * 0.5, look: [6, 0], seed: i }); });
    set(o1, { x: (t * 90) % 80 }); set(o2, { x: -((t * 130) % 80) }); set(sol, { r: t * 20 });
    gs.forEach((g, i) => { set(g, { x: Math.sin(t + i) * 60 }); g.querySelector('.ala').setAttribute('d', `M5,30 Q30,${f1(10 + 18 * Math.sin(t * 12 + i))} 60,30 Q90,${f1(10 + 18 * Math.sin(t * 12 + i))} 115,30`); });
    palmas.forEach((pm, i) => set(pm, { r: Math.sin(t * 2 + i) * 3 }));
    set(pi, { s: 1 + 0.08 * (t > T.gran ? 1 - p(t, T.gran, 0.5) : 0) }); popA(gran, t, T.gran, { r: -3 });
  };
});

/* L9 · ¿de dónde sale lo de los esclavos? Heródoto, 2.000 años después → y Hollywood */
headline(L(9) - 0.1, L(10) - 0.1, '¿Y lo de los *esclavos*?', { size: 86, hlT: T.dedonde + 0.2 });
plano(L(9) - 0.1, T.hollywood - 0.15, { background: '#dfe6f0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 30px, transparent 30px 150px)' }, c => {
  const cam = CAM(c);
  [100, 860].forEach(x => box(cam, x, 400, 110, 940, { zIndex: 2, background: '#f4efe2', border: `6px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 6px, transparent 6px 22px)' }));
  const her = PJ(cam, 300, 560, 440, { piel: '#e8b48a', ropa: '#f4efe2', toga: true, pelo: '#d8d8d8', barba: '#d8d8d8', tocado: 'laurel' });
  const tag = chip(cam, 340, 1080, 'Heródoto, griego', { size: 50, bg: '#fff', color: INK });
  const pluma = box(cam, 700, 820, 40, 200, { zIndex: 12 }, `<svg viewBox="0 0 40 200" width="40" height="200"><path d="M20,200 L20,40 C0,30 0,0 20,0 C40,0 40,30 20,40" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`);
  const tl = box(cam, 120, 470, 840, 14, { zIndex: 11, background: INK, borderRadius: '8px', transformOrigin: '0 50%' });
  const a1 = chip(cam, 100, 400, 'pirámides', { size: 42, bg: '#e9d9a6', color: INK }), a2 = chip(cam, 720, 400, '+2.000 años', { size: 42, bg: PINK });
  const x = box(cam, 340, 560, 380, 380, { zIndex: 20 }, XSVG);
  const cad = CADENA(cam, 300, 900, 480); const qs = [0, 1, 2].map(i => texto(cam, 0, '?', { size: 170, color: [RED, '#2b4a8c', INK][i], x: 280 + i * 190, w: 160, z: 12 }));
  sp(L(9), 'scratch', 0.6); sp(L(9) + 0.3, 'boing', 0.6); sp(T.griego, 'pop', 0.6); sp(T.despues, 'whoosh', 0.7); sp(T.despues + 0.8, 'stamp', 0.8);
  return t => {
    zoom(cam, t, L(9), 3, 0.06); const pre = t < T.griego - 0.1; set(cad, { o: pre ? 1 : 0, x: Math.sin(t * 4) * 10, s: pop(t, L(9), 0.4) }); qs.forEach((q, i) => set(q, { o: pre && t > L(9) + 0.2 + i * 0.2 ? 1 : 0, y: 640 - Math.abs(Math.sin(t * 5 + i)) * 50, r: Math.sin(t * 4 + i) * 12 }));
    set(her, { o: t > T.griego - 0.1 ? 1 : 0, s: pop(t, T.griego - 0.1, 0.4) }); conFace(her, t, { look: [6, 4], jaw: t > T.griego ? Math.abs(Math.sin(t * 9)) * 0.4 : 0, feliz: 0.6, ceja: 4 });
    popA(tag, t, T.griego, { r: -3 }); set(pluma, { o: t > T.griego ? 1 : 0, r: Math.sin(t * 10) * 12, x: Math.sin(t * 5) * 20 });
    set(tl, { sx: p(t, T.despues - 0.1, 0.6, E.outCubic), o: t > T.despues - 0.1 ? 1 : 0 }); popA(a1, t, T.despues - 0.1, { r: -3 }); popA(a2, t, T.despues + 0.4, { r: 3 });
    set(x, { o: t > T.despues + 0.8 ? 1 : 0, s: pop(t, T.despues + 0.8, 0.3) });
  };
});
plano(T.hollywood - 0.15, L(10) - 0.1, { background: '#2b2118' }, c => {
  const focos = [0, 1].map(i => box(c, i ? 560 : -60, 300, 580, 1300, { zIndex: 1, background: 'linear-gradient(rgba(255,240,180,.55), transparent)', clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0 100%)', transformOrigin: '50% 0%' }));
  const cl = CLAQUETA(c, 290, 520, 500);
  const fic = sello(c, 1060, 'FICCIÓN', T.hollywood + 0.6, { size: 120, r: -6 });
  const bob = [0, 1, 2].map(i => ESTRELLA(c, 70, GOLD));
  sp(T.hollywood + 0.2, 'click', 1); sp(T.hollywood + 0.6, 'stamp', 1);
  return t => { focos.forEach((f, i) => set(f, { r: Math.sin(t * 1.5 + i * 2) * 14 })); const k = p(t, T.hollywood + 0.05, 0.15, E.inCubic); cl.tapa.style.transform = `rotate(${f1(-25 + 25 * k)}deg)`; set(cl, { s: pop(t, T.hollywood - 0.15, 0.35), r: -4 }); bob.forEach((b, i) => set(b, { x: 200 + i * 300, y: 420 + Math.sin(t * 4 + i) * 30, o: 0.9, r: t * 60 })); };
});
shakeAt(T.hollywood + 0.6, 0.35, 16);

/* L10 · pintadas de las cuadrillas: «LOS AMIGOS DE KEOPS» (como una peña de fútbol) */
headline(L(10) - 0.1, L(11) - 0.1, 'Pintadas de *cuadrilla*', { size: 88, hlT: T.cuadrillas });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#cdb27a', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.25) 0 5px, transparent 5px 150px), repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 5px, transparent 5px 240px)' }, c => {
  const cam = CAM(c);
  const car = box(cam, 120, 450, 840, 300, { zIndex: 5, border: `10px solid #b3262a`, borderRadius: '150px', overflow: 'hidden' });
  const txt = el('div', car, { left: '0', top: '60px', width: '840px', textAlign: 'center', fontFamily: 'Rye', fontSize: '72px', lineHeight: 1.05, color: '#b3262a' }, 'LOS AMIGOS<br>DE KEOPS');
  const veil = box(car, 0, 0, 840, 300, { background: '#cdb27a', transformOrigin: '100% 50%' });
  const pincel = box(cam, 0, 0, 60, 220, { zIndex: 12 }, `<svg viewBox="0 0 60 220" width="60" height="220"><rect x="22" y="60" width="16" height="160" fill="#8a5a32" stroke="${INK}" stroke-width="4"/><path d="M14,60 L46,60 L36,0 L24,0 Z" fill="#b3262a" stroke="${INK}" stroke-width="4"/></svg>`);
  const fans = [[300, 0], [520, 1], [740, 2]].map(([x, i]) => OBR(cam, x, 860, 230, { seed: i }));
  const banda = [0, 1, 2].map(i => box(cam, 300 + i * 220, 1100, 200, 34, { zIndex: 12, background: 'repeating-linear-gradient(90deg, #b3262a 0 30px, #fff 30px 60px)', border: `4px solid ${INK}`, borderRadius: '8px' }));
  const eh = BOCADILLO(cam, 380, 790, '¡OÉ, OÉ!', { size: 56 });
  sp(T.pintadas, 'paper', 0.7); sp(T.amigos, 'tada', 0.8); sp(T.amigos + 0.5, 'burst', 0.7);
  return t => {
    zoom(cam, t, L(10), 4.5, 0.06);
    const k = p(t, T.pintadas, T.amigos + 0.6 - T.pintadas, E.linear); set(veil, { sx: 1 - k }); set(pincel, { x: 120 + 840 * k - 30, y: 520 + Math.sin(t * 20) * 40, o: k > 0 && k < 1 ? 1 : 0, r: 20 });
    fans.forEach((f, i) => { const on = t > T.amigos; set(f, { o: t > T.cuadrillas + i * 0.12 ? 1 : 0, s: pop(t, T.cuadrillas + i * 0.12, 0.35), y: on ? -Math.abs(Math.sin(t * 9 + i)) * 40 : 0 }); conFace(f, t, { feliz: 1, jaw: on ? 0.9 : 0.2, ceja: on ? 14 : 0, look: [0, -6], seed: i }); });
    banda.forEach((b, i) => set(b, { o: t > T.amigos ? 1 : 0, r: Math.sin(t * 9 + i) * 10 })); popA(eh, t, T.amigos + 0.4, { r: -4 });
  };
});

/* L11 · OJO: la cifra de cerveza cambia según el estudio */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const ja = JARRA(c, 380, 560, 320);
  const tags = ['3 L', '4 L', '5 L'].map((s, i) => chip(c, 330 + i * 160, 1000, s, { size: 64, bg: [YEL, PINK, '#9fd3c0'][i], color: INK }));
  const q = texto(c, 520, '?', { size: 180, color: RED, x: 760, w: 200 });
  tags.forEach((e, i) => sp(T.cifra + i * 0.25, 'pop', 0.5));
  return t => { conFace(ja, t, { look: [Math.sin(t * 3) * 10, 0], feliz: 0, ceja: 12 }); set(ja, { r: Math.sin(t * 3) * 6 }); tags.forEach((e, i) => popA(e, t, T.cifra + i * 0.25, { r: Math.sin(t * 4 + i) * 8 })); set(q, { o: t > T.estudio ? 1 : 0, s: pop(t, T.estudio, 0.3), r: Math.sin(t * 6) * 10 }); };
});

/* L12 · O sea: currantes pagados en pan y cerveza */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Las hicieron currantes…', { size: 92 });
  const b = texto(c, 410, '…pagados en pan y cerveza', { size: 80, italic: true, color: '#8a2a2a' });
  const ob = OBR(c, 340, 620, 400);
  const ja = JARRA(c, 720, 860, 220), pn = PAN(c, 120, 1040, 220);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.pagados - 0.2 ? 1 : 0, s: pop(t, T.pagados - 0.2, 0.35) }); conFace(ob, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.7, ceja: 8 }); set(ob, { y: -Math.abs(Math.sin(t * 5)) * 20 }); set(ja, { o: t > T.pagados ? 1 : 0, s: pop(t, T.pagados, 0.4), r: Math.sin(t * 5) * 6 }); jFace(ja, t, { feliz: 1, jaw: 0.5 }); set(pn, { o: t > T.pagados - 0.2 ? 1 : 0, s: pop(t, T.pagados - 0.2, 0.4) }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.pagados, 'gulp', 0.7);

/* L13 · pregunta final */
preguntaFinal('¿Tú trabajarías', 'por pan y cerveza?', { size: 92, draw: c => [['por la cerveza, sí', YEL], ['ni de broma', PINK], ['depende del pan', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 340 + i * 30, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(68, 'Las pirámides', ['PIRÁMIDES', 'sin esclavos']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.cerv, T.cerv + 1.0], [T.amigos, T.amigos + 1.2]], sorpresa: [[T.litros, T.litros + 0.8], [T.m2013, T.m2013 + 0.8]], golpes: [T.diario1, T.dia, T.rey - 0.1, T.curaron, T.hollywood + 0.6, T.amigos] },
});
