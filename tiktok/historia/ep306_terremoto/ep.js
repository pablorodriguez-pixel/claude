/* Ep. 306 · «¿Una máquina de terremotos?» — el sismoscopio de Zhang Heng (dinastía Han, año 132).
   Jarrón de bronce (~2 m) con 8 dragones, cada uno con una bola en la boca, y 8 sapos debajo con la boca abierta.
   Un terremoto lejano hacía que un dragón soltara su bola en el sapo («clonc») y señalaba la dirección.
   Un día cayó una bola sin temblor en Luoyang; sus enemigos se burlaron hasta que un mensajero trajo la noticia de un terremoto
   a unos 400–500 km al noroeste (Gansu). El original se perdió; el mecanismo interior no se conoce; las réplicas modernas usan un péndulo.
   NO se muestra nada inventado (ni palacio destruido ni inventor expulsado).
   Objetos-metáfora: el jarrón con dragones/sapos (bolas que caen), la rosa de los vientos, la taza de té quieta, el mapa con la flecha
   que coincide con la del dragón, el corte con «?» que se convierte en péndulo, el móvil con alerta frente al jarrón. */
Story.prepara();
const T = {
  hace0: Q('hace casi'), chino: Q('chino'), maquina: Q('máquina'), terremotos0: Q('terremotos'),
  funciono: Q('funcionó'), nadie1: Q('nadie le creyó'), historia: Q('historia real'),
  llamaba: Q('se llamaba'), zhang: Q('zhang'), astronomo: Q('astrónomo'), emperador: Q('emperador'), ano: Q('año'), c132: Q('ciento treinta y dos'),
  presento: Q('presentó'), corte: Q('corte'), jarron3: Q('jarrón'), enorme: Q('enorme'),
  alrededor: Q('alrededor'), ocho: Q('ocho'), dragones: Q('dragones'), cada: Q('cada uno mirando'), lado: Q('lado'), cadaD: Q('cada dragón'), bola4: Q('bola'), bronce4: Q('bronce'), boca4: Q('boca'),
  debajo: Q('debajo'), sapo: Q('sapo'), boca4b: Q('boca abierta'), abierta: Q('abierta'),
  idea: Q('la idea'), tierra: Q('tierra'), lejos: Q('lejos'), dragon5: Q('dragón'), soltaba: Q('soltaba'), bola5: Q('bola'), sapo5: Q('sapo'), tragaba: Q('tragaba'), clonc: Q('clonc'),
  ese: Q('ese dragón'), senalaba: Q('señalaba'), donde: Q('dónde'), terremoto5: Q('terremoto'),
  undia: Q('un día'), paso: Q('pasó'), bola6: Q('una bola'), cayo: Q('cayó'), pero: Q('pero'), capital: Q('capital'), nadie6: Q('nadie'), nada: Q('nada'), ni: Q('ni un temblor'), temblor: Q('temblor'),
  enemigos: Q('enemigos'), frotaban: Q('frotaban'), manos: Q('manos'), famoso: Q('famoso'), jarron7: Q('jarrón'), no7: Q('no funcionaba'),
  hasta: Q('hasta que'), mensajero: Q('mensajero'), caballo: Q('caballo'), habia: Q('había habido'), terremoto8: Q('terremoto'), km: Q('quinientos'), justo: Q('justo'), senalaba8: Q('señalaba'), dragon8: Q('dragón'),
  ojo: Q('ojo'), original: Q('original'), perdio: Q('perdió'), nadie9: Q('nadie sabe'), dentro: Q('dentro'), replicas: Q('réplicas'), pendulo: Q('péndulo'),
  osea: Q('o sea'), hace10: Q('hace dos mil'), china10: Q('china'), terremoto10: Q('terremoto'), antes: Q('antes'), noticia: Q('noticia'),
};
const BR = '#b5813f', BR2 = '#8a5a2b', BRL = '#e3b469', PAT = '#6f9c80', LACA = '#1d1a22', ROJOC = '#b3261e', CRE = '#fbf6ea', TIERRA = '#c9a26a', VERDE = '#2e9e6b', AZUL = '#2b6fd6';
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));
const sello2 = (e, t, t0, r = -6) => set(e, { o: t > t0 ? 1 : 0, s: t < t0 ? 0 : lerp(2.2, 1, E.outCubic(clamp((t - t0) / 0.22))), r });
const SELLO = (c, x, y, w, txt, col = RED, z = 60, fs = 92) => box(c, x, y, w, fs * 1.5, { zIndex: z, border: `12px solid ${col}`, color: col, borderRadius: '20px', fontFamily: 'Rye', fontSize: px(fs), lineHeight: px(fs * 1.38), textAlign: 'center', background: 'rgba(255,255,255,.82)', transformOrigin: '50% 50%', boxSizing: 'border-box', whiteSpace: 'nowrap' }, txt);
const addSvg = (f, html) => { f.querySelector('svg').insertAdjacentHTML('beforeend', html); return f; };

/* ---------- EL JARRÓN (vb -60 0 720 780): 5 dragones visibles (de 8) con bola, 5 sapos debajo. drop(V, i, caída 0..1, mandíbula 0..1) ---------- */
const DRG = [[95, 262, 1.3, -1], [196, 300, 1, -1], [334, 318, 1, -1], [404, 300, 1, 1], [505, 262, 1.3, 1]];
const MOUTH = DRG.map(([ax, ay, k, fl]) => [ax + fl * k * 104, ay + k * 58]);
const TOADY = 684;
const dragonG = (i, [ax, ay, k, fl]) => `<g transform="translate(${ax},${ay}) scale(${fl * k},${k})">
  <path d="M-14,-8 C26,-34 74,-6 58,34" stroke="${INK}" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M-14,-8 C26,-34 74,-6 58,34" stroke="${BR}" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M6,-26 l6,-20 l8,16 l8,-20 l8,18 l10,-14 l4,20" fill="${PAT}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <g class="j${i}"><path d="M46,54 L82,58 L114,62 C104,80 72,84 50,70 Z" fill="${BR2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></g>
  <path d="M38,22 C58,4 96,14 114,40 L120,54 L82,54 C68,54 54,58 44,50 Z" fill="${BR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M52,18 L36,-12 L66,12 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><circle cx="82" cy="30" r="8" fill="#fff6c8" stroke="${INK}" stroke-width="3"/><circle cx="84" cy="30" r="4" fill="${INK}"/>
  <path d="M114,42 C132,36 142,24 156,32 M112,50 C130,52 138,62 150,58" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M90,46 h16" stroke="${INK}" stroke-width="3"/></g>`;
const ballG = i => { const [mx, my] = MOUTH[i], r = DRG[i][2] * 13 + 2; return `<g class="b${i}"><circle cx="${mx}" cy="${my}" r="${r}" fill="${BRL}" stroke="${INK}" stroke-width="4"/><circle cx="${mx - r / 3}" cy="${my - r / 3}" r="${r / 3}" fill="#fff7d0"/></g>`; };
const toadG = i => { const x = MOUTH[i][0], k = DRG[i][2] > 1 ? 1.15 : 1; return `<g class="t${i}" transform="translate(${f1(x)},${TOADY}) scale(${k})">
  <ellipse cx="-50" cy="52" rx="28" ry="18" fill="${BR2}" stroke="${INK}" stroke-width="5"/><ellipse cx="50" cy="52" rx="28" ry="18" fill="${BR2}" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="0" cy="40" rx="58" ry="38" fill="${BR}" stroke="${INK}" stroke-width="6"/><circle cx="-22" cy="48" r="5" fill="${PAT}"/><circle cx="18" cy="58" r="6" fill="${PAT}"/><circle cx="30" cy="38" r="4" fill="${PAT}"/>
  <circle cx="-32" cy="-2" r="14" fill="${BR}" stroke="${INK}" stroke-width="5"/><circle cx="32" cy="-2" r="14" fill="${BR}" stroke="${INK}" stroke-width="5"/><circle class="te${i}" cx="-32" cy="-4" r="5" fill="${INK}"/><circle cx="32" cy="-4" r="5" fill="${INK}"/>
  <ellipse class="tm${i}" cx="0" cy="12" rx="30" ry="13" fill="#2a1a12" stroke="${INK}" stroke-width="5"/><circle class="tb${i}" cx="0" cy="10" r="12" fill="${BRL}" stroke="${INK}" stroke-width="4" opacity="0"/>
  <path d="M-30,70 l-14,8 M30,70 l14,8" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>`; };
const BODY = 'M190,150 C186,196 122,214 86,280 C40,370 60,520 150,600 L172,640 L428,640 L450,600 C540,520 560,370 514,280 C478,214 414,196 410,150 Z';
const VASIJA = (c, w, z = 10, suelo = false) => { const h = w * 780 / 720;
  const d = box(c, 0, 0, w, h, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="-60 0 720 780" width="${w}" height="${f1(h)}" style="overflow:visible">
  <ellipse cx="300" cy="752" rx="350" ry="34" fill="rgba(43,33,24,.28)"/>
  ${cut(P(BODY), 8, 10)}<path d="${BODY}" fill="${BR}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>${HATCH(BODY, 0.3)}
  <path d="M300,170 C430,200 520,330 500,470 C490,540 460,590 428,640 L300,640 Z" fill="rgba(43,33,24,.18)"/>
  <path d="M78,330 Q300,372 522,330" stroke="${PAT}" stroke-width="22" fill="none"/><path d="M78,330 Q300,372 522,330" stroke="${INK}" stroke-width="4" fill="none" stroke-dasharray="18 12"/>
  <path d="M70,470 Q300,512 530,470" stroke="${INK}" stroke-width="5" fill="none"/><path d="M84,500 ${[...Array(14)].map((_, k) => `l16,-18 l16,18`).join(' ')}" stroke="${BR2}" stroke-width="6" fill="none"/>
  <path d="M84,280 Q300,250 516,280" stroke="${INK}" stroke-width="5" fill="none"/>
  <rect x="148" y="636" width="304" height="40" rx="10" fill="${BR2}" stroke="${INK}" stroke-width="7"/>
  <path d="M176,152 C196,62 404,62 424,152 Z" fill="${BR}" stroke="${INK}" stroke-width="8"/><rect x="166" y="140" width="268" height="22" rx="8" fill="${BR2}" stroke="${INK}" stroke-width="6"/>
  <circle cx="300" cy="72" r="24" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><path d="M220,120 Q300,96 380,120" stroke="${PAT}" stroke-width="10" fill="none"/>
  ${DRG.map((g, i) => dragonG(i, g)).join('')}${DRG.map((g, i) => ballG(i)).join('')}${DRG.map((g, i) => toadG(i)).join('')}</svg>`);
  if (suelo) box(d, -3000, f1(744 * w / 720), 7000, 3000, { zIndex: -1, background: TIERRA, borderTop: `9px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(100deg, rgba(43,33,24,.1) 0 6px, transparent 6px 70px)' });
  d.q = s => d.querySelector(s); return d; };
const drop = (V, i, f, jaw = 0) => { V.q(`.j${i}`).setAttribute('transform', `rotate(${f1(jaw * 30)} 48 54)`);
  const my = MOUTH[i][1], fy = f <= 0 ? 0 : (TOADY + 10 - my) * Math.min(1, f * f);
  V.q(`.b${i}`).setAttribute('transform', `translate(0 ${f1(fy)})`); V.q(`.b${i}`).style.opacity = f >= 1 ? 0 : 1; V.q(`.tb${i}`).setAttribute('opacity', f >= 1 ? 1 : 0); };
const toadGulp = (V, i, t, t0) => { const k = t > t0 && t < t0 + 0.5 ? Math.sin((t - t0) / 0.5 * Math.PI) : 0; V.q(`.t${i}`).style.transform = ''; V.q(`.tm${i}`).setAttribute('ry', f1(13 + k * 10)); };
/* posición en pantalla de un punto (vb) del jarrón colocado en (x, y) con ancho w */
const vpt = (x, y, w, px_, py_) => [x + (px_ + 60) * w / 720, y + py_ * w / 720];

/* ---------- vista desde arriba (vb -320 -320 640 640): 8 dragones + rosa de los vientos. .td{a} dragón, .tl{a} letra ---------- */
const RUMBOS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
const TOPV = (c, w, z = 10) => { const d = box(c, 0, 0, w, w, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="-320 -320 640 640" width="${w}" height="${w}" style="overflow:visible">
  <circle cx="10" cy="14" r="150" fill="${SH}"/><circle r="150" fill="${BR}" stroke="${INK}" stroke-width="9"/><circle r="104" fill="${BR2}" stroke="${INK}" stroke-width="5"/><circle r="30" fill="${GOLD}" stroke="${INK}" stroke-width="6"/>
  ${[...Array(8)].map((_, a) => `<g class="td${a}" transform="rotate(${a * 45})"><path class="tf${a}" d="M-26,-140 L-20,-200 C-18,-228 18,-228 20,-200 L26,-140 Z" fill="${BR}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-12,-176 l-14,-12 M12,-176 l14,-12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle class="tbl${a}" cx="0" cy="-226" r="15" fill="${BRL}" stroke="${INK}" stroke-width="4"/></g>`).join('')}
  ${RUMBOS.map((r, a) => { const an = a * Math.PI / 4, x = Math.sin(an) * 282, y = -Math.cos(an) * 282 + 15; return `<text class="tl${a}" x="${f1(x)}" y="${f1(y)}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="${r.length > 1 ? 40 : 52}" fill="${a === 0 ? RED : INK}" stroke="#fff" stroke-width="8" paint-order="stroke">${r}</text>`; }).join('')}
  <path class="flN" d="M0,-150 V-310" stroke="${RED}" stroke-width="0" fill="none"/></svg>`);
  d.q = s => d.querySelector(s); return d; };

/* ---------- personas Han: sombrero de letrado (jinxian guan) y corona del emperador (mianguan); brazos para encogerse o frotarse las manos ---------- */
const GORRO_LETRADO = (col = LACA) => `<path d="M98,104 L202,104 L198,62 L120,20 L108,30 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M92,106 H208" stroke="${col}" stroke-width="14" stroke-linecap="round"/><path d="M196,64 L216,40" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`;
const CORONA_HAN = `<path d="M112,104 L188,104 L184,52 L116,52 Z" fill="${LACA}" stroke="${INK}" stroke-width="5"/><rect x="62" y="32" width="176" height="22" rx="4" fill="${LACA}" stroke="${INK}" stroke-width="5"/>
  ${[76, 96, 116, 184, 204, 224].map(x => `<path d="M${x},54 V96" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="72" r="5" fill="${GOLD}" stroke="${INK}" stroke-width="2"/><circle cx="${x}" cy="92" r="5" fill="${RED}" stroke="${INK}" stroke-width="2"/>`).join('')}`;
const CUELLO_HAN = (col = CRE) => `<path d="M112,262 L150,330 L188,262" stroke="${col}" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="M112,262 L150,330 L188,262" stroke="${INK}" stroke-width="3" fill="none"/><path d="M70,340 H230" stroke="${GOLD}" stroke-width="12"/>`;
const BRAZOS = `<g class="brz"><g class="aL"><path d="M74,300 C40,300 20,270 22,240" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="22" cy="232" r="20" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/></g>
  <g class="aR"><path d="M226,300 C260,300 280,270 278,240" stroke="${INK}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="278" cy="232" r="20" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/></g></g>`;
const MANOS = `<g class="mL"><circle cx="132" cy="318" r="22" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/></g><g class="mR"><circle cx="168" cy="318" r="22" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/></g>`;
const HAN = (c, w, o = {}) => { const f = PERS(c, 0, 0, w, Object.assign({ pelo: 'moño', pcol: '#2a2018', z: o.z || 8 }, o));
  addSvg(f, CUELLO_HAN(o.cuelloCol) + (o.emperador ? CORONA_HAN : GORRO_LETRADO(o.gorroCol)) + (o.brazos ? BRAZOS : '') + (o.manos ? MANOS : '')); return f; };
const encoge = (f, k) => { const a = f.querySelector('.aL'), b = f.querySelector('.aR'); if (a) { a.setAttribute('transform', `translate(0 ${f1(-k * 26)})`); b.setAttribute('transform', `translate(0 ${f1(-k * 26)})`); } };
const frota = (f, t, on) => { const a = f.querySelector('.mL'), b = f.querySelector('.mR'); if (!a) return; const d = on ? Math.sin(t * 22) * 12 : 0; a.setAttribute('transform', `translate(${f1(d)} 0)`); b.setAttribute('transform', `translate(${f1(-d)} 0)`); };
const ZHANG = (c, w, z = 9) => HAN(c, w, { ropa: '#2b4a8a', barba: true, bigote: true, z });
const EMPERADOR = (c, w, z = 9) => HAN(c, w, { ropa: '#8a1a14', barba: true, bigote: true, emperador: true, cuelloCol: GOLD, z });

/* ---------- palacio Han: muro, columnas rojas, alero de tejas, linternas, suelo ---------- */
function palacio(cam, o = {}) {
  box(cam, -300, -400, 1680, 2800, { zIndex: 0, background: '#ead2a2', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 6px, transparent 6px 90px)' });
  box(cam, -300, 1230, 1680, 1200, { zIndex: 1, background: '#7a4a2a', borderTop: `10px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.2) 0 5px, transparent 5px 160px), repeating-linear-gradient(0deg, rgba(0,0,0,.2) 0 5px, transparent 5px 90px)' });
  box(cam, 140, 1150, 800, 90, { zIndex: 1, background: '#a8452e', border: `8px solid ${INK}`, borderRadius: '10px' });
  [-40, 230, 780, 1050].forEach(x => { box(cam, x, 260, 76, 990, { zIndex: 2, background: `linear-gradient(90deg, ${ROJOC}, #d4473a 40%, #8a1a14)`, border: `7px solid ${INK}` }); box(cam, x - 20, 1210, 116, 40, { zIndex: 2, background: '#8f877a', border: `6px solid ${INK}` }); });
  box(cam, -300, 160, 1680, 140, { zIndex: 3 }, `<svg width="1680" height="140" viewBox="0 0 1680 140"><path d="M0,30 Q840,90 1680,30 L1680,120 Q840,150 0,120 Z" fill="#2f5d4a" stroke="${INK}" stroke-width="8"/>${[...Array(42)].map((_, k) => `<path d="M${k * 40 + 20},${44 + Math.sin(k / 41 * Math.PI) * 26} v70" stroke="${INK}" stroke-width="4" opacity=".6"/>`).join('')}<path d="M0,120 Q840,150 1680,120" stroke="${GOLD}" stroke-width="8" fill="none"/></svg>`);
  const lint = o.lint === false ? [] : [[130, 420], [870, 420]].map(([x, y]) => LINTERNA(cam, x, y, 110));
  return { lint };
}
const balancea = (ls, t) => ls.forEach((l, i) => set(l, { r: Math.sin(t * 2 + i) * 4 }));

/* ---------- grieta, ondas, mapa, móvil, corte, caballo, taza ---------- */
const GRIETA = (c, w, z = 6) => { const d = box(c, 0, 0, w, 200, { zIndex: z }, `<svg viewBox="0 0 1000 200" width="${w}" height="${f1(w / 5)}" style="overflow:visible"><path class="gr" pathLength="1" d="M0,100 L120,80 L180,130 L280,70 L360,120 L440,60 L520,140 L600,90 L700,130 L780,70 L880,110 L1000,90" stroke="${INK}" stroke-width="22" fill="none" stroke-linejoin="round" stroke-dasharray="1 1"/><path class="gr2" pathLength="1" d="M280,70 L300,30 M520,140 L540,190 M780,70 L760,20" stroke="${INK}" stroke-width="12" fill="none" stroke-dasharray="1 1"/></svg>`);
  d.set = k => { d.querySelector('.gr').setAttribute('stroke-dashoffset', f1(1 - k)); d.querySelector('.gr2').setAttribute('stroke-dashoffset', f1(1 - clamp(k * 2 - 1))); }; d.set(0); return d; };
const ONDAS = (c, n = 3, col = RED, z = 6) => [...Array(n)].map(() => box(c, 0, 0, 200, 200, { zIndex: z, borderRadius: '50%', border: `10px solid ${col}`, boxSizing: 'border-box', transformOrigin: '50% 50%' }));
const ondas = (os, t, cx, cy, on, sz = 1) => os.forEach((e, i) => { const k = (t * 1.2 + i / os.length) % 1; set(e, { x: cx - 100, y: cy - 100, s: (0.3 + k * 2.2) * sz, o: on ? (1 - k) * 0.9 : 0 }); });
const CHINA = 'M70,262 L160,180 L250,160 L322,96 L420,74 L520,40 L604,18 L706,42 L764,120 L724,172 L684,190 L704,252 L652,302 L642,362 L602,432 L560,500 L500,558 L420,592 L340,582 L280,540 L218,520 L150,470 L118,400 L58,350 Z';
const LUO = [560, 360], GANSU = [418, 262];
const MAPA = (c, w, z = 10) => { const d = box(c, 0, 0, w, w * 0.8, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 800 640" width="${w}" height="${f1(w * 0.8)}" style="overflow:visible">
  ${cut(P(CHINA), 10, 12)}<path d="${CHINA}" fill="#e8d29a" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>${HATCH(CHINA, 0.25)}
  <path d="M300,240 C360,200 420,180 460,230 C500,280 520,300 560,330 C600,350 640,330 690,300" stroke="#5aa0c8" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M260,420 C340,440 420,400 500,430 C560,450 620,420 680,430" stroke="#5aa0c8" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path class="ar" pathLength="1" d="M${LUO[0]},${LUO[1]} L${GANSU[0] + 18},${GANSU[1] + 14}" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  <g class="ep" transform="translate(${GANSU[0]},${GANSU[1]})"><path d="M0,-34 L10,-10 L34,-8 L14,8 L22,34 L0,18 L-22,34 L-14,8 L-34,-8 L-10,-10 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/></g>
  <circle cx="${LUO[0]}" cy="${LUO[1]}" r="18" fill="${RED}" stroke="${INK}" stroke-width="6"/><circle cx="${LUO[0]}" cy="${LUO[1]}" r="6" fill="#fff"/>
  <g transform="translate(90,560)"><path d="M0,0 H170" stroke="${INK}" stroke-width="10"/><path d="M0,-14 V14 M170,-14 V14" stroke="${INK}" stroke-width="8"/><text x="85" y="-20" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">500 km</text></g>
  <g transform="translate(720,520)"><path d="M0,-50 L12,0 L0,50 L-12,0 Z" fill="${INK}"/><path d="M0,-50 L12,0 L-12,0 Z" fill="${RED}"/><text x="0" y="-60" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">N</text></g></svg>`);
  d.q = s => d.querySelector(s); return d; };
const MOVIL = (c, w, z = 12) => box(c, 0, 0, w, w * 1.9, { zIndex: z, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: px(w * 0.14), boxShadow: `14px 16px 0 ${SH}`, transformOrigin: '50% 50%', boxSizing: 'border-box', overflow: 'hidden' },
  `<div style="position:absolute;left:6%;top:4%;width:88%;height:92%;background:#f4efe2;border-radius:${f1(w * 0.08)}px;overflow:hidden">
   <div class="al" style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:${f1(w * 0.12)}px;line-height:1.05;padding:${f1(w * 0.06)}px ${f1(w * 0.05)}px;text-align:center">ALERTA<br>SÍSMICA</div>
   <svg viewBox="0 0 200 80" width="100%" style="margin-top:${f1(w * 0.08)}px"><path class="sw" d="M0,40 L30,40 L40,10 L52,70 L64,4 L76,76 L88,24 L100,56 L110,40 L200,40" stroke="${INK}" stroke-width="6" fill="none" stroke-linejoin="round"/></svg>
   <div style="font-family:SpecialElite;font-size:${f1(w * 0.075)}px;text-align:center;color:${INK};padding:0 6px">Terremoto detectado.<br>Protégete.</div></div>`);
const CORTE = (c, w, z = 10) => { const d = box(c, 0, 0, w, w * 780 / 720, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="-60 0 720 780" width="${w}" height="${f1(w * 780 / 720)}" style="overflow:visible">
  <path d="${BODY}" fill="#3a2a1e" stroke="${INK}" stroke-width="10"/><path d="${BODY}" fill="none" stroke="${BRL}" stroke-width="22" stroke-dasharray="40 20" opacity=".9"/>
  <path d="M176,152 C196,62 404,62 424,152 Z" fill="${BR}" stroke="${INK}" stroke-width="8"/>
  <text class="qq" x="300" y="520" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="320" fill="${YEL}" stroke="${INK}" stroke-width="10" paint-order="stroke">?</text>
  <g class="pend"><path d="M300,170 V470" stroke="#f4efe2" stroke-width="10"/><circle cx="300" cy="500" r="52" fill="${BRL}" stroke="${INK}" stroke-width="8"/></g>
  <circle cx="300" cy="170" r="12" fill="${GOLD}" stroke="${INK}" stroke-width="5"/></svg>`); d.q = s => d.querySelector(s); return d; };
const CABALLO = (c, w = 440, z = 8) => { const d = box(c, 0, 0, w, w * 330 / 440, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 440 330" width="${w}" height="${w * 330 / 440}" style="overflow:visible">
  ${[[110, 0], [150, 1], [290, 2], [330, 3]].map(([x, i]) => `<g class="pa" data-x="${x}"><path d="M${x},190 V310" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M${x},190 V306" stroke="#8a5a34" stroke-width="18" stroke-linecap="round"/></g>`).join('')}
  <path d="M60,120 C40,170 60,130 20,210" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M60,120 C40,170 60,130 20,210" stroke="#3a2a1e" stroke-width="12" fill="none" stroke-linecap="round"/>
  <ellipse cx="220" cy="160" rx="170" ry="70" fill="#8a5a34" stroke="${INK}" stroke-width="8"/>
  <path d="M330,130 C350,70 360,40 380,20 L430,60 C420,80 400,90 380,96 C370,120 360,140 350,170 Z" fill="#8a5a34" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M340,120 C350,70 360,46 376,26" stroke="#3a2a1e" stroke-width="14" fill="none"/><circle cx="398" cy="46" r="7" fill="${INK}"/><path d="M380,22 L372,0 L392,16" fill="#8a5a34" stroke="${INK}" stroke-width="6"/>
  <path d="M190,96 C180,40 200,0 236,-10 L262,60 L250,100 Z" fill="${ROJOC}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><circle cx="244" cy="-36" r="28" fill="#f2c9a0" stroke="${INK}" stroke-width="6"/>
  <path d="M214,-52 L274,-52 L262,-78 L226,-78 Z" fill="${LACA}" stroke="${INK}" stroke-width="5"/><circle cx="256" cy="-36" r="4" fill="${INK}"/><path d="M246,-22 q8,4 16,-2" stroke="${INK}" stroke-width="4" fill="none"/>
  <path d="M236,20 L300,40" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
  <g class="band"><path d="M150,60 V-120" stroke="${INK}" stroke-width="8"/><path class="bf" d="M150,-120 L80,-100 L150,-76 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/></g>
  <rect x="150" y="80" width="150" height="60" rx="16" fill="${GOLD}" stroke="${INK}" stroke-width="6"/></svg>`); d.pas = [...d.querySelectorAll('.pa')]; return d; };
const galopa = (h, t, on) => h.pas.forEach((g, i) => { const x = +g.dataset.x, a = on ? Math.sin(t * 14 + i * 1.6) * 28 : 0; g.setAttribute('transform', `rotate(${f1(a)} ${x} 190)`); });
const TAZA = (c, w, z = 12) => box(c, 0, 0, w, w * 0.8, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 500 400" width="${w}" height="${f1(w * 0.8)}" style="overflow:visible">
  <ellipse cx="250" cy="372" rx="230" ry="26" fill="${SH}"/><ellipse cx="250" cy="352" rx="220" ry="34" fill="#f4efe2" stroke="${INK}" stroke-width="7"/>
  <path d="M80,120 C80,280 150,340 250,340 C350,340 420,280 420,120 Z" fill="#f4efe2" stroke="${INK}" stroke-width="8"/><path d="M110,180 C140,240 180,260 250,262 M390,180 C360,240 320,260 250,262" stroke="#5aa0c8" stroke-width="10" fill="none"/>
  <path d="M420,150 C490,150 490,250 410,250" stroke="${INK}" stroke-width="18" fill="none"/>
  <ellipse cx="250" cy="120" rx="170" ry="36" fill="#a8743a" stroke="${INK}" stroke-width="7"/><ellipse cx="210" cy="112" rx="40" ry="8" fill="rgba(255,255,255,.45)"/>
  <path class="ola" d="M110,120 H390" stroke="#7a4f22" stroke-width="5" fill="none"/></svg>`);

/* ===================== PORTADA + L0 · el jarrón con 8 dragones, una bola cayendo, el suelo que se agrieta ===================== */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t0a = texto(c, 262, 'HACE 2.000 AÑOS…', { size: 66, italic: true, z: 30 });
  const t1 = texto(c, 340, '¿UNA MÁQUINA', { size: 112, z: 30 });
  const t2 = texto(c, 462, 'de ' + hlSpan('TERREMOTOS?', 'phl'), { size: 112, z: 30 });
  box(cam, -100, 1340, 1280, 800, { zIndex: 1, background: TIERRA, borderTop: `9px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(100deg, rgba(43,33,24,.1) 0 6px, transparent 6px 70px)' });
  const gr = GRIETA(cam, 1000, 3); set(gr, { x: 40, y: 1350 });
  const V = VASIJA(cam, 720, 10);
  const ch = chip(c, 620, 1210, 'China · año 132', { size: 50, bg: INK, z: 40 });
  sfx('swoosh_up', 0.05, 0.6); sp(0.42, 'thud', 0.7); sp(0.45, 'ding', 0.5); sp(T.chino - 0.05, 'pop', 0.6); sp(T.maquina, 'sparkle', 0.5); sp(T.terremotos0, 'scratch', 0.8); sp(T.terremotos0 + 0.05, 'thud', 1.0);
  shakeAt(T.terremotos0, 0.6, 16);
  return t => {
    zoom(cam, t, 0, L(1), 0.05); set(ry, { r: t * 6 });
    set(t0a, { r: -2 }); set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.2, 0.4);
    const sh = t > T.terremotos0 ? Math.sin(t * 50) * 5 * (1 - p(t, T.terremotos0, 1.0)) : 0;
    set(V, { x: 180 + sh, y: 590, r: wobble(t, 0.4, 0.6) });
    /* fotograma 0: la bola del dragón izquierdo ya va cayendo; luego cae la de la derecha con «terremotos» */
    const f0 = clamp(0.45 + t / 0.5), f4 = p(t, T.terremotos0 + 0.1, 0.5, E.linear);
    drop(V, 0, f0, t < 0.6 ? 1 : 0.4); drop(V, 4, f4, t > T.terremotos0 - 0.1 ? 1 : 0); toadGulp(V, 0, t, 0.42); toadGulp(V, 4, t, T.terremotos0 + 0.6);
    gr.set(lerp(0.35, 1, p(t, T.terremotos0, 0.5, E.outCubic))); set(gr, { x: 40, y: 1350 });
    vis(ch, t, T.chino - 0.1, 99, { r: -4 });
  };
}, { sfx: false });
sp(T.terremotos0 + 0.62, 'ding', 0.6);

/* ===================== L1a · «Y el día que funcionó…» la bola cae → ¡FUNCIONÓ! ===================== */
plano(L(1) - 0.1, T.nadie1 - 0.12, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const V = VASIJA(cam, 620, 10);
  const ok = SELLO(c, 230, 330, 620, '¡FUNCIONÓ!', VERDE, 60, 96);
  sp(T.funciono - 0.3, 'swoosh_up', 0.5); sp(T.funciono + 0.35, 'thud', 0.8); sp(T.funciono + 0.38, 'ding', 0.7); sp(T.funciono + 0.45, 'stamp', 0.8);
  return t => {
    deriva(cam, t, L(1) - 0.1, T.nadie1, [540, 1000, 1.0], [520, 1040, 1.1]); balancea(P_.lint, t);
    set(V, { x: 230, y: 560 });
    drop(V, 3, p(t, T.funciono - 0.15, 0.5, E.linear), t > T.funciono - 0.3 ? 1 : 0); toadGulp(V, 3, t, T.funciono + 0.35);
    sello2(ok, t, T.funciono + 0.45, -6);
  };
});

/* ===================== L1b · NADIE LE CREYÓ: cortesanos que se encogen de hombros + chip HISTORIA REAL ===================== */
plano(T.nadie1 - 0.12, L(2) - 0.08, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const cs = [['#5a3a6a', 0], ['#3a5a3a', 1], ['#6a4a2a', 2]].map(([col]) => HAN(cam, 330, { ropa: col, brazos: true, bigote: true, z: 9 }));
  const st = SELLO(c, 130, 300, 820, 'NADIE LE CREYÓ', RED, 60, 84);
  const hr = chip(c, 300, 1150, 'HISTORIA REAL', { size: 66, bg: INK, color: YEL, z: 50 });
  sp(T.nadie1, 'stamp', 1.0); sp(T.nadie1 + 0.2, 'boing', 0.4); sp(T.historia - 0.1, 'pop2', 0.7); shakeAt(T.nadie1, 0.3, 12);
  return t => {
    deriva(cam, t, T.nadie1 - 0.12, L(2), [540, 1000, 1.06], [540, 980, 1.0]); balancea(P_.lint, t);
    cs.forEach((f, i) => { const k = Math.abs(Math.sin((t - T.nadie1) * 3 + i)) * (t > T.nadie1 - 0.1 ? 1 : 0);
      set(f, { x: 30 + i * 330, y: 640 + (i === 1 ? -30 : 0) - k * 8, s: pop(t, T.nadie1 - 0.12 + i * 0.08, 0.35) }); encoge(f, k);
      pFace(f, t, { jaw: 0.1, look: [i === 1 ? 0 : (i ? -6 : 6), -2], feliz: -0.6, ceja: 10 * k, seed: i }); });
    sello2(st, t, T.nadie1, -5);
    vis(hr, t, T.historia - 0.05, 99, { r: -3, s: pop(t, T.historia - 0.05, 0.35) * (1 + 0.04 * Math.sin(t * 6)) });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* ===================== L3a · «Se llamaba Zhang Heng»: retrato + cartela con el nombre ===================== */
plano(L(3) - 0.1, T.astronomo - 0.25, { background: '#e9c6be' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 300, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const z = ZHANG(cam, 520, 10);
  const cart = box(c, 200, 1080, 680, 170, { zIndex: 40, background: CRE, border: `8px solid ${INK}`, borderRadius: '18px', boxShadow: `10px 12px 0 ${SH}`, textAlign: 'center', transformOrigin: '50% 0%' },
    `<div style="font-family:Playfair;font-weight:900;font-size:96px;line-height:150px;color:${INK}">Zhang Heng</div>`);
  const pron = chip(c, 560, 300, 'se dice «Chang Jeng»', { size: 44, bg: PINK, z: 40 });
  sp(T.llamaba, 'swoosh_up', 0.5); sp(T.zhang - 0.05, 'paper', 0.8); sp(T.zhang + 0.4, 'ding', 0.5);
  return t => {
    zoom(cam, t, L(3) - 0.1, 2, 0.06); set(ry, { r: t * 5 });
    set(z, { x: 280, y: 380 + (1 - p(t, L(3) - 0.1, 0.4, E.outBack)) * 400 + wobble(t, 0.5, 4) }); pFace(z, t, { jaw: talkW(t, 'VECINO') * 0.15, look: [0, 2], feliz: 0.8, seed: 0.5 });
    set(cart, { o: t > T.zhang - 0.1 ? 1 : 0, sy: p(t, T.zhang - 0.1, 0.35, E.outBack), r: -2 });
    vis(pron, t, T.zhang + 0.5, 99, { r: 3 });
  };
});

/* ===================== L3b · astrónomo del emperador: mapa de estrellas + el emperador entra ===================== */
plano(T.astronomo - 0.25, T.ano - 0.25, { background: '#1f2440' }, c => {
  const cam = CAM(c);
  const est = [...Array(16)].map((_, i) => { const e = ESTRELLA(cam, 36 + (i % 3) * 14, i % 4 ? '#fff6c8' : YEL); return e; });
  const lin = box(cam, 0, 0, 1080, 1920, { zIndex: 11 }, `<svg width="1080" height="1920"><path class="cons" pathLength="1" d="M180,420 L330,360 L470,430 L620,330 L760,400 L900,350" stroke="#fff6c8" stroke-width="6" fill="none" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`);
  const z = ZHANG(cam, 420, 14), em = EMPERADOR(cam, 460, 13);
  const ca = chip(c, 70, 300, 'astrónomo', { size: 66, bg: YEL, color: INK, z: 40 });
  const ce = chip(c, 560, 640, 'del emperador', { size: 56, bg: RED, z: 40 });
  sp(T.astronomo, 'sparkle', 0.8); sp(T.emperador - 0.1, 'bell', 0.6); sp(T.emperador + 0.1, 'pop2', 0.6);
  return t => {
    zoom(cam, t, T.astronomo - 0.25, 2, 0.05);
    est.forEach((e, i) => set(e, { x: 80 + (i * 197) % 920, y: 330 + (i * 131) % 560, s: 0.6 + 0.4 * Math.abs(Math.sin(t * 3 + i)), r: t * 40 + i * 20 }));
    lin.querySelector('.cons').setAttribute('stroke-dashoffset', f1(1 - p(t, T.astronomo, 0.8)));
    set(z, { x: 60, y: 820 + wobble(t, 0.5, 4) }); pFace(z, t, { look: [-4, -8], feliz: 1, seed: 0.2 });
    const ke = p(t, T.emperador - 0.2, 0.45, E.outBack);
    set(em, { x: lerp(1200, 560, ke), y: 800 + wobble(t, 0.45, 3) }); pFace(em, t, { look: [-6, 0], feliz: 0.3, ceja: 4, seed: 0.9 });
    vis(ca, t, T.astronomo - 0.1, 99, { r: -4 }); vis(ce, t, T.emperador, 99, { r: 3 });
  };
});

/* ===================== L3c · año 132: en la corte presenta el jarrón (enorme: ~2 m) ===================== */
plano(T.ano - 0.25, L(4) - 0.1, { background: '#ead2a2' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const z = ZHANG(cam, 330, 14), em = EMPERADOR(cam, 340, 12);
  const trono = box(cam, 720, 760, 330, 520, { zIndex: 11, background: GOLD, border: `8px solid ${INK}`, borderRadius: '30px 30px 10px 10px', boxShadow: `10px 10px 0 ${SH}` });
  const V = VASIJA(cam, 470, 13);
  const ano = SELLO(c, 250, 300, 580, 'año 132', INK, 60, 96);
  const reg = box(cam, 0, 0, 60, 510, { zIndex: 15, borderLeft: `8px solid ${INK}`, borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}`, width: '40px', transformOrigin: '50% 100%' });
  const dm = chip(c, 40, 760, '≈ 2 metros', { size: 60, bg: RED, z: 40 });
  const brillo = [0, 1, 2].map(i => ESTRELLA(cam, 70, i ? YEL : '#fff'));
  sp(T.c132, 'stamp', 0.8); sp(T.presento, 'swoosh_up', 0.6); sp(T.corte, 'bell', 0.4); sp(T.jarron3 - 0.1, 'whoosh', 0.7); sp(T.jarron3 + 0.3, 'tada', 0.6); sp(T.enorme, 'thud', 0.9);
  shakeAt(T.enorme, 0.3, 10);
  return t => {
    deriva(cam, t, T.ano - 0.25, L(4), [540, 980, 1.0], [520, 1000, 1.06]); balancea(P_.lint, t);
    set(em, { x: 720, y: 600 + wobble(t, 0.4, 2) }); pFace(em, t, { look: [-8, 2], feliz: t > T.enorme ? 1 : 0.3, ceja: t > T.jarron3 ? 10 : 0, seed: 0.4 });
    set(z, { x: 40, y: 740 + wobble(t, 0.5, 3) }); pFace(z, t, { look: [8, 0], feliz: 1, seed: 0.1 });
    const kv = p(t, T.jarron3 - 0.15, 0.5, E.outBack);
    set(V, { x: 300, y: 700 + (1 - clamp(kv)) * 700, o: t > T.jarron3 - 0.15 ? 1 : 0, s: lerp(0.7, 1, clamp(kv)) * (t > T.enorme ? 1 + 0.04 * p(t, T.enorme, 0.3) : 1) });
    drop(V, 0, 0, 0); drop(V, 4, 0, 0);
    set(reg, { x: 250, y: 700, o: t > T.enorme - 0.1 ? 1 : 0, sy: p(t, T.enorme - 0.1, 0.35, E.outBack) });
    vis(dm, t, T.enorme, 99, { r: -5 });
    brillo.forEach((b, i) => set(b, { x: 360 + i * 150, y: 760 + (i % 2) * 120, s: t > T.jarron3 + 0.2 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 5 + i)) : 0, r: t * 150 }));
    sello2(ano, t, T.c132, -4); set(ano, { o: t > T.c132 && t < T.jarron3 - 0.2 ? 1 : 0, s: t < T.c132 ? 0 : lerp(2.2, 1, E.outCubic(clamp((t - T.c132) / 0.22))), r: -4 });
    if (t > T.jarron3 - 0.2) set(ano, { o: 1, x: 330, y: -10, s: 0.55, r: -4 });
  };
});

/* ===================== L4a · ocho dragones mirando cada uno a un lado: vista desde arriba + rosa de los vientos ===================== */
plano(L(4) - 0.1, T.cadaD - 0.12, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const V = VASIJA(cam, 760, 10);
  const TV = TOPV(cam, 860, 12);
  const n8 = texto(c, 280, '<span style="color:' + RED + '">8</span> dragones', { size: 110, z: 40, shadow: '' });
  const vt = chip(c, 600, 430, 'visto desde arriba', { size: 46, bg: INK, z: 40 });
  const ln = chip(c, 70, 430, 'uno por rumbo', { size: 50, bg: RED, z: 40 });
  sp(T.alrededor, 'whoosh', 0.5); sp(T.ocho, 'pop2', 0.7); sp(T.dragones, 'tada', 0.5); sp(T.cada - 0.2, 'cloth_whoosh', 0.7);
  RUMBOS.forEach((r, a) => sp(T.cada + 0.1 + a * 0.13, 'tick', 0.5));
  return t => {
    zoom(cam, t, L(4) - 0.1, 4, 0.05); set(ry, { r: t * 5 });
    const kt = p(t, T.cada - 0.25, 0.6, E.inOutCubic);
    set(V, { x: 160, y: 560, o: 1 - kt, s: 1 - kt * 0.2 }); [0, 1, 2, 3, 4].forEach(i => drop(V, i, 0, 0));
    set(TV, { x: 110, y: 560, o: kt, s: lerp(0.6, 1, kt), r: lerp(-60, 0, kt) + (kt >= 1 ? wobble(t, 0.3, 2) : 0) });
    for (let a = 0; a < 8; a++) { const ka = pop(t, T.cada + 0.1 + a * 0.13, 0.3); TV.q(`.tl${a}`).setAttribute('opacity', t > T.cada + 0.1 + a * 0.13 ? 1 : 0); TV.q(`.td${a}`).setAttribute('transform', `rotate(${a * 45}) scale(${f1(lerp(0.85, 1, clamp(ka)))})`); }
    set(n8, { o: t > T.ocho - 0.1 ? 1 : 0, s: pop(t, T.ocho - 0.1, 0.35), r: -2 + wobble(t, 0.5, 0.5) });
    vis(vt, t, T.cada - 0.1, 99, { r: 3 }); vis(ln, t, T.lado, 99, { r: -3 });
  };
});

/* ===================== L4b · primer plano de un dragón con su bola de bronce en la boca ===================== */
plano(T.cadaD - 0.12, T.debajo - 0.15, { background: '#e9c6be' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const V = VASIJA(cam, 1500, 10, true);
  const lb = chip(c, 560, 1080, 'bola de bronce', { size: 56, bg: INK, color: YEL, z: 40 });
  const fl = box(c, 600, 900, 260, 200, { zIndex: 41 }, arrowSvg('M200,180 Q140,60 30,20', YEL, 12));
  const dd = chip(c, 70, 300, 'cada dragón…', { size: 64, bg: RED, z: 40 });
  const est = ESTRELLA(cam, 90, '#fff');
  sp(T.cadaD, 'whoosh', 0.6); sp(T.bola4, 'ding', 0.7); sp(T.bronce4, 'sparkle', 0.6);
  return t => {
    set(V, { x: -758 + Math.sin(t * 0.8) * 10, y: 181 + wobble(t, 0.4, 4) });
    drop(V, 4, 0, t > T.boca4 - 0.2 ? 0.25 + 0.1 * Math.sin(t * 6) : 0);
    vis(dd, t, T.cadaD - 0.05, 99, { r: -4 }); vis(lb, t, T.bola4, 99, { r: 2 }); set(fl, { o: t > T.bola4 ? 1 : 0, s: pop(t, T.bola4, 0.35) });
    set(est, { x: 640, y: 560, s: t > T.bronce4 ? 0.6 + 0.5 * Math.abs(Math.sin(t * 6)) : 0, r: t * 160 });
  };
});

/* ===================== L4c · debajo, un sapo con la boca abierta → los 8 sapos ===================== */
plano(T.debajo - 0.15, L(5) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const V = VASIJA(cam, 1500, 10, true);
  const ls = chip(c, 600, 330, 'un sapo', { size: 66, bg: VERDE, z: 40 });
  const lb = chip(c, 380, 450, 'boca abierta', { size: 56, bg: INK, color: YEL, z: 40 });
  const s8 = chip(c, 380, 330, '8 sapos, 8 dragones', { size: 56, bg: RED, z: 40 });
  sp(T.debajo, 'swoosh_up', 0.6); sp(T.sapo, 'boing', 0.6); sp(T.abierta, 'pop2', 0.7); sp(T.abierta + 0.6, 'whoosh', 0.5);
  const tz = T.abierta + 0.25;
  return t => {
    /* bajamos desde el dragón al sapo y después nos alejamos para ver el jarrón entero */
    const kd = p(t, T.debajo - 0.1, 0.8, E.inOutCubic), ko = p(t, tz, 0.7, E.inOutCubic);
    set(V, { x: lerp(-758, -798, kd) + ko * 30, y: lerp(181, -550, kd) + ko * 20, s: 1 - ko * 0.04 });
    [0, 1, 2, 3, 4].forEach(i => drop(V, i, 0, 0)); V.q('.tm4').setAttribute('ry', f1(13 + 8 * p(t, T.boca4b, 0.4, E.outBack)));
    vis(ls, t, T.sapo - 0.05, tz, { r: -4 }); vis(lb, t, T.boca4b, tz, { r: 3 }); vis(s8, t, tz + 0.2, 99, { r: -3 });
  };
});

/* ===================== L5a · la tierra tiembla lejos: ondas que viajan hacia el jarrón ===================== */
plano(L(5) - 0.1, T.dragon5 - 0.2, { background: '#cfe3ea' }, c => {
  const cam = CAM(c);
  const tierra = box(cam, -200, 1000, 1480, 1000, { zIndex: 1, background: TIERRA, borderTop: `9px solid ${INK}` });
  const mont = box(cam, -200, 760, 1480, 260, { zIndex: 2 }, `<svg width="1480" height="260" viewBox="0 0 1480 260"><path d="M0,260 L120,120 L220,180 L360,40 L480,170 L600,90 L760,200 L900,260 Z" fill="#9fb48a" stroke="${INK}" stroke-width="7"/></svg>`);
  const casas = [0, 1, 2].map(i => box(cam, 120 + i * 120, 880, 110, 120, { zIndex: 3, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 110 120" width="110" height="120"><path d="M10,50 L55,10 L100,50 Z" fill="#2f5d4a" stroke="${INK}" stroke-width="6"/><rect x="20" y="50" width="70" height="66" fill="#ead2a2" stroke="${INK}" stroke-width="6"/></svg>`));
  const V = VASIJA(cam, 380, 10);
  const os = ONDAS(cam, 4, RED, 4);
  const lj = chip(c, 70, 330, 'muy lejos…', { size: 64, bg: RED, z: 40 });
  const ie = texto(c, 280, 'la ' + hlSpan('idea', 'idl'), { size: 90, z: 40 });
  sp(T.idea, 'pop', 0.6); sp(T.tierra, 'thud', 0.7); sp(T.lejos, 'whoosh', 0.6);
  return t => {
    deriva(cam, t, L(5) - 0.1, T.dragon5, [540, 980, 1.0], [600, 980, 1.04]);
    const on = t > T.tierra - 0.05;
    casas.forEach((h, i) => set(h, { r: on ? Math.sin(t * 30 + i) * 6 : 0 })); set(mont, { x: on ? Math.sin(t * 40) * 4 : 0 });
    ondas(os, t, 300, 1010, on, 1.4);
    set(V, { x: 640, y: 640 }); [0, 1, 2, 3, 4].forEach(i => drop(V, i, 0, 0));
    set(ie, { o: t < T.tierra ? 1 : 0, r: -2 }); paint(c.querySelector('.idl'), t, T.idea + 0.1, 0.3);
    vis(lj, t, T.lejos - 0.05, 99, { r: -4 });
  };
});

/* ===================== L5b · el dragón suelta la bola → el sapo se la traga: ¡CLONC! ===================== */
plano(T.dragon5 - 0.2, T.ese - 0.1, { background: '#e9c6be' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const V = VASIJA(cam, 1400, 10, true);
  const cl = texto(c, 760, '¡CLONC!', { size: 190, color: YEL, z: 50, shadow: OUT });
  const so = chip(c, 70, 300, 'suelta la bola', { size: 60, bg: INK, z: 40 });
  const tr = chip(c, 560, 300, 'y se la traga', { size: 60, bg: VERDE, z: 40 });
  sp(T.soltaba, 'click', 0.7); sp(T.bola5 + 0.05, 'whoosh', 0.5); sp(T.tragaba - 0.05, 'gulp', 0.9); sp(T.clonc - 0.02, 'thud', 1.2); sp(T.clonc, 'ding', 0.9); sp(T.clonc + 0.05, 'burst', 0.5);
  shakeAt(T.clonc, 0.45, 20);
  const tf = T.tragaba - 0.55;
  return t => {
    const kc = p(t, T.dragon5 - 0.2, 0.8, E.outCubic);
    set(V, { x: -665 - kc * 30, y: lerp(-84, -303, p(t, tf, 0.6, E.inOutCubic)) + wobble(t, 0.4, 3) });
    [0, 1, 2, 3].forEach(i => drop(V, i, 0, 0));
    drop(V, 4, p(t, tf, 0.55, E.linear), t > T.soltaba - 0.1 ? 1 : 0); toadGulp(V, 4, t, T.tragaba);
    set(cl, { o: t > T.clonc - 0.05 ? 1 : 0, s: t < T.clonc - 0.05 ? 0 : lerp(2.4, 1, E.outCubic(clamp((t - T.clonc + 0.05) / 0.22))) * (1 + 0.04 * Math.sin(t * 9)), r: -6 + (t < T.clonc + 0.3 ? Math.sin(t * 60) * 3 : 0) });
    vis(so, t, T.soltaba - 0.05, 99, { r: -3 }); vis(tr, t, T.tragaba - 0.05, 99, { r: 3 });
  };
});

/* ===================== L5c · ese dragón te señala de dónde viene el terremoto (rosa de los vientos, NO) ===================== */
plano(T.ese - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const TV = TOPV(cam, 700, 12);
  const fl = box(cam, 0, 0, 1080, 1920, { zIndex: 14 }, `<svg width="1080" height="1920" style="overflow:visible"><path class="fa" pathLength="1" d="M365,825 L130,590" stroke="${INK}" stroke-width="40" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/><path class="fb" pathLength="1" d="M365,825 L130,590" stroke="${RED}" stroke-width="24" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></svg>`);
  const ep = ESTRELLA(cam, 150, YEL);
  const os = ONDAS(cam, 3, RED, 13);
  const de = texto(c, 280, '¿de ' + hlSpan('dónde', 'ddl') + ' viene?', { size: 90, z: 40 });
  const no = chip(c, 600, 1180, '→ noroeste', { size: 60, bg: RED, z: 40 });
  sp(T.ese, 'ding', 0.6); sp(T.senalaba - 0.05, 'swoosh_up', 0.7); sp(T.terremoto5, 'thud', 0.9); sp(T.terremoto5 + 0.05, 'tada', 0.5);
  shakeAt(T.terremoto5, 0.35, 12);
  return t => {
    zoom(cam, t, T.ese - 0.1, 3, 0.05); set(ry, { r: -t * 5 });
    set(TV, { x: 190, y: 650, r: wobble(t, 0.3, 1) });
    for (let a = 0; a < 8; a++) { TV.q(`.tl${a}`).setAttribute('opacity', 1); TV.q(`.tf${a}`).setAttribute('fill', a === 7 && t > T.ese ? (Math.sin(t * 12) > 0 ? YEL : BR) : BR); TV.q(`.tbl${a}`).setAttribute('opacity', a === 7 && t > T.ese ? 0 : 1); }
    const ka = p(t, T.senalaba - 0.05, 0.9, E.outCubic);
    fl.querySelector('.fa').setAttribute('stroke-dashoffset', f1(1 - ka)); fl.querySelector('.fb').setAttribute('stroke-dashoffset', f1(1 - ka));
    set(ep, { x: 55, y: 515, s: t > T.terremoto5 - 0.1 ? pop(t, T.terremoto5 - 0.1, 0.35) * (1 + 0.1 * Math.sin(t * 10)) : 0, r: t * 60 });
    ondas(os, t, 130, 590, t > T.terremoto5, 0.9);
    set(de, { o: t > T.donde - 0.3 ? 1 : 0, s: pop(t, T.donde - 0.3, 0.3), r: -2 }); paint(c.querySelector('.ddl'), t, T.donde, 0.3);
    vis(no, t, T.terremoto5 + 0.1, 99, { r: -3 });
  };
});

/* ===================== L6a · «Y un día, pasó: una bola cayó» (en la corte) ===================== */
plano(L(6) - 0.1, T.pero - 0.1, { background: '#ead2a2' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const V = VASIJA(cam, 640, 12);
  const ud = texto(c, 280, 'un día…', { size: 110, italic: true, z: 40 });
  sp(T.undia, 'bell', 0.5); sp(T.bola6 + 0.4, 'click', 0.6); sp(T.cayo + 0.15, 'thud', 1.0); sp(T.cayo + 0.18, 'ding', 0.8);
  shakeAt(T.cayo + 0.15, 0.3, 10);
  return t => {
    deriva(cam, t, L(6) - 0.1, T.pero, [540, 1000, 1.0], [560, 1080, 1.18]); balancea(P_.lint, t);
    set(V, { x: 220, y: 560 });
    [0, 1, 2, 3].forEach(i => drop(V, i, 0, 0));
    drop(V, 4, p(t, T.cayo - 0.3, 0.45, E.linear), t > T.bola6 + 0.3 ? 1 : 0); toadGulp(V, 4, t, T.cayo + 0.15);
    set(ud, { o: t > T.undia - 0.1 ? 1 : 0, s: pop(t, T.undia - 0.1, 0.35), r: -3 + wobble(t, 0.5, 0.6) });
  };
});

/* ===================== L6b · en la capital nadie notó nada: cortesanos tranquilos, «?» ===================== */
plano(T.pero - 0.1, T.ni - 0.15, { background: '#ead2a2' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const cs = ['#5a3a6a', '#3a5a3a', '#2b4a8a'].map(col => HAN(cam, 300, { ropa: col, bigote: true, z: 9 }));
  const qs = [0, 1, 2].map(i => qMark(cam, 0, 0, 110, i % 2 ? PINK : YEL));
  const lc = chip(c, 70, 300, 'Luoyang · la capital', { size: 58, bg: INK, z: 40 });
  const nn = texto(c, 420, 'nadie notó ' + hlSpan('nada', 'nnl'), { size: 84, z: 40 });
  sp(T.capital - 0.1, 'pop', 0.6); sp(T.nadie6, 'boing', 0.5); sp(T.nada, 'pop2', 0.6);
  return t => {
    deriva(cam, t, T.pero - 0.1, T.ni, [540, 1000, 1.05], [540, 980, 1.0]); balancea(P_.lint, t);
    cs.forEach((f, i) => { set(f, { x: 120 + i * 270, y: 720 + wobble(t, 0.4, 3, i) }); pFace(f, t, { look: [Math.sin(t * 2 + i) * 8, -4], feliz: 0.2, ceja: t > T.nadie6 ? 8 : 0, seed: i * 0.7 }); });
    qs.forEach((q, i) => set(q, { x: 200 + i * 270, y: 600 + Math.sin(t * 4 + i) * 10, o: t > T.nadie6 + i * 0.12 ? 1 : 0, s: pop(t, T.nadie6 + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 10 }));
    vis(lc, t, T.capital - 0.1, 99, { r: -3 });
    set(nn, { o: t > T.nada - 0.25 ? 1 : 0, s: pop(t, T.nada - 0.25, 0.3), r: -2 }); paint(c.querySelector('.nnl'), t, T.nada, 0.3);
  };
});

/* ===================== L6c · ni un temblor: taza de té quieta y aguja plana ===================== */
plano(T.ni - 0.15, L(7) - 0.1, { background: '#e9c6be' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  box(cam, -200, 1130, 1480, 900, { zIndex: 1, background: '#7a4a2a', borderTop: `9px solid ${INK}` });
  const tz = TAZA(cam, 620, 10);
  const papel = box(cam, 140, 330, 800, 220, { zIndex: 12, background: CRE, border: `7px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 ${SH}`, overflow: 'hidden' },
    `<svg width="800" height="220"><path d="M0,110 H800" stroke="${INK}" stroke-width="6"/><path class="pl" d="M0,110 H800" stroke="${RED}" stroke-width="3" stroke-dasharray="14 10"/></svg>`);
  const cero = chip(c, 640, 560, '0 ondas', { size: 60, bg: INK, color: YEL, z: 40 });
  const nt = texto(c, 1170, 'ni un ' + hlSpan('temblor', 'ntl', RED), { size: 104, z: 40, color: '#fff', shadow: OUT });
  const lt = chip(c, 160, 300, 'temblores en Luoyang:', { size: 40, bg: INK, z: 40 });
  const vap = [0, 1, 2].map(i => box(cam, 0, 0, 30, 160, { zIndex: 9 }, `<svg viewBox="0 0 30 160" width="30" height="160"><path d="M15,160 C0,120 30,80 15,40 C5,20 20,10 15,0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/></svg>`));
  sp(T.ni, 'tick', 0.6); sp(T.temblor, 'ding', 0.6);
  return t => {
    zoom(cam, t, T.ni - 0.15, 2, 0.06); set(ry, { r: t * 4 });
    set(tz, { x: 230, y: 640 }); vis(lt, t, T.ni - 0.1, 99, { r: -2 });
    vap.forEach((v, i) => { const k = (t * 0.6 + i / 3) % 1; set(v, { x: 470 + i * 50, y: 560 - k * 120, o: Math.sin(k * Math.PI) * 0.9 }); });
    set(papel, { s: pop(t, T.ni - 0.15, 0.3), r: -1.5 });
    vis(cero, t, T.ni + 0.3, 99, { r: 4 });
    set(nt, { o: t > T.temblor - 0.2 ? 1 : 0, s: pop(t, T.temblor - 0.2, 0.3), r: -2 }); paint(c.querySelector('.ntl'), t, T.temblor + 0.1, 0.3);
  };
});

/* ===================== L7a · sus enemigos en la corte se frotan las manos ===================== */
plano(L(7) - 0.1, T.famoso - 0.15, { background: '#3a2a3a' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam, { lint: true });
  const sombra = box(cam, -300, -400, 1680, 2800, { zIndex: 4, background: 'rgba(20,10,30,.45)' });
  const es = [['#4a1f3a', 380], ['#1f3a2a', 650], ['#3a2a14', 920]].map(([col]) => HAN(cam, 290, { ropa: col, bigote: 'dali', manos: true, severo: true, gorroCol: '#2a1010', z: 9 }));
  const se = chip(c, 380, 300, 'sus enemigos', { size: 66, bg: RED, z: 40 });
  const ji = [0, 1].map(i => BOCADILLO(c, 420 + i * 300, 560 + i * 60, i ? '¡je!' : 'je, je…', { size: 50, z: 40 }));
  sp(T.enemigos, 'scratch', 0.6); sp(T.frotaban, 'squish', 0.7); sp(T.frotaban + 0.3, 'squish', 0.6); sp(T.manos + 0.2, 'pop', 0.5);
  return t => {
    deriva(cam, t, L(7) - 0.1, T.famoso, [620, 1000, 1.0], [640, 960, 1.08]); balancea(P_.lint, t);
    const on = t > T.frotaban - 0.1;
    es.forEach((f, i) => { set(f, { x: 220 + i * 250, y: 700 + wobble(t, 0.5, 3, i) + (i === 1 ? -30 : 0), s: pop(t, L(7) - 0.05 + i * 0.12, 0.35) }); frota(f, t + i, on); pFace(f, t, { look: [-6, 2], feliz: 1, ceja: on ? 6 + 4 * Math.sin(t * 6 + i) : 0, seed: i * 0.4 }); });
    vis(se, t, T.enemigos - 0.05, 99, { r: -3 });
    ji.forEach((b, i) => set(b, { o: t > T.manos + i * 0.3 ? 1 : 0, s: pop(t, T.manos + i * 0.3, 0.3), r: i ? 5 : -4 }));
  };
});

/* ===================== L7b · «el famoso jarrón… no funcionaba»: le señalan, Zhang suda, sello NO FUNCIONA ===================== */
plano(T.famoso - 0.15, L(8) - 0.1, { background: '#ead2a2' }, c => {
  const cam = CAM(c);
  const P_ = palacio(cam);
  const V = VASIJA(cam, 500, 10);
  const en = HAN(cam, 300, { ropa: '#4a1f3a', bigote: 'dali', severo: true, gorroCol: '#2a1010', brazos: true, z: 13 });
  const z = ZHANG(cam, 300, 13);
  const sd = [sudor(cam, 0, 0), sudor(cam, 0, 0)];
  const fam = chip(c, 400, 300, '«el famoso jarrón»', { size: 56, bg: INK, z: 40 });
  const nf = SELLO(c, 160, 420, 760, 'NO FUNCIONA', RED, 60, 92);
  sp(T.famoso, 'pop', 0.5); sp(T.jarron7, 'boing', 0.5); sp(T.no7, 'stamp', 1.0); shakeAt(T.no7, 0.3, 12);
  return t => {
    deriva(cam, t, T.famoso - 0.15, L(8), [540, 1000, 1.0], [540, 1000, 1.06]); balancea(P_.lint, t);
    set(V, { x: 290, y: 640 }); [0, 1, 2, 3].forEach(i => drop(V, i, 0, 0)); drop(V, 4, 1, 0.4);
    set(en, { x: 700, y: 760 + Math.abs(Math.sin(t * 9)) * -10 }); encoge(en, 0.6 + 0.4 * Math.sin(t * 9)); pFace(en, t, { jaw: 0.6 * Math.abs(Math.sin(t * 9)), look: [-8, 0], feliz: 1, closed: true });
    set(z, { x: 40, y: 780 }); pFace(z, t, { look: [6, 2], feliz: -0.8, ceja: 10, seed: 0.3 });
    sd.forEach((s, i) => set(s, { x: 180 + i * 90, y: 820 + ((t * 120 + i * 40) % 90), o: t > T.jarron7 ? 1 : 0 }));
    vis(fam, t, T.famoso - 0.1, 99, { r: 3 });
    sello2(nf, t, T.no7, -6);
  };
});

/* ===================== L8a · un mensajero a caballo ===================== */
plano(L(8) - 0.1, T.habia - 0.15, { background: '#cfe3ea' }, c => {
  const cam = CAM(c);
  box(cam, -400, 1080, 1880, 900, { zIndex: 1, background: TIERRA, borderTop: `9px solid ${INK}` });
  const mont = box(cam, -400, 820, 1880, 280, { zIndex: 1 }, `<svg width="1880" height="280" viewBox="0 0 1880 280"><path d="M0,280 L200,90 L360,200 L560,40 L760,190 L960,80 L1180,210 L1400,60 L1620,180 L1880,100 L1880,280 Z" fill="#9fb48a" stroke="${INK}" stroke-width="7"/></svg>`);
  const cab = CABALLO(cam, 560, 10);
  const polvo = [0, 1, 2, 3].map(() => box(cam, 0, 0, 90, 90, { zIndex: 9, borderRadius: '50%', background: '#e2cfa8', border: `5px solid ${INK}` }));
  const mj = chip(c, 70, 300, 'un mensajero', { size: 66, bg: RED, z: 40 });
  const ur = chip(c, 560, 420, '¡URGENTE!', { size: 56, bg: YEL, color: INK, z: 40 });
  sp(L(8), 'drumroll', 0.4); sp(T.mensajero, 'whoosh', 0.7); sp(T.caballo, 'pop2', 0.6);
  return t => {
    deriva(cam, t, L(8) - 0.1, T.habia, [540, 980, 1.0], [560, 1000, 1.06]);
    set(mont, { x: -((t * 120) % 400) });
    const kx = p(t, L(8) - 0.1, T.habia - L(8), E.outCubic);
    set(cab, { x: lerp(-620, 300, kx), y: 1090 - 420 + Math.abs(Math.sin(t * 7)) * -26, r: Math.sin(t * 7) * 3 }); galopa(cab, t, true);
    cab.querySelector('.bf').setAttribute('transform', `skewY(${f1(Math.sin(t * 12) * 10)})`);
    polvo.forEach((d, i) => { const k = (t * 2 + i / 4) % 1; set(d, { x: lerp(-620, 300, kx) - 40 - k * 240, y: 1040 - k * 80, s: 0.4 + k, o: 1 - k }); });
    vis(mj, t, T.mensajero - 0.05, 99, { r: -4 }); vis(ur, t, T.caballo, 99, { r: 4 });
  };
});

/* ===================== L8b · mapa: Luoyang → terremoto a ~500 km al noroeste (Gansu) ===================== */
plano(T.habia - 0.15, T.justo - 0.15, { background: '#cfe3ea' }, c => {
  const cam = CAM(c);
  const M = MAPA(cam, 980, 10);
  const os = ONDAS(cam, 3, RED, 12);
  const lu = chip(c, 600, 1070, 'Luoyang (capital)', { size: 46, bg: INK, z: 40 });
  const ga = chip(c, 180, 650, 'terremoto (Gansu)', { size: 46, bg: RED, z: 40 });
  const km = texto(c, 1180, '≈ ' + hlSpan('500 km', 'kml'), { size: 110, z: 40 });
  const hh = texto(c, 280, '¡HABÍA HABIDO UNO!', { size: 76, z: 40 });
  sp(T.habia, 'paper', 0.7); sp(T.terremoto8, 'thud', 1.0); sp(T.km - 0.1, 'swoosh_up', 0.7); sp(T.km + 0.4, 'ding', 0.7);
  shakeAt(T.terremoto8, 0.4, 14);
  return t => {
    zoom(cam, t, T.habia - 0.15, 4, 0.05);
    set(M, { x: 50, y: 470, r: -1 + wobble(t, 0.3, 0.5), s: pop(t, T.habia - 0.15, 0.4) });
    const sc = 980 / 800, gx = 50 + GANSU[0] * sc, gy = 470 + GANSU[1] * sc;
    M.q('.ep').setAttribute('transform', `translate(${GANSU[0]},${GANSU[1]}) scale(${f1(t > T.terremoto8 - 0.1 ? pop(t, T.terremoto8 - 0.1, 0.35) * (1 + 0.12 * Math.sin(t * 10)) : 0.001)})`);
    ondas(os, t, gx, gy, t > T.terremoto8, 0.8);
    M.q('.ar').setAttribute('stroke-dashoffset', f1(1 - p(t, T.km - 0.1, 0.9, E.outCubic)));
    vis(lu, t, T.habia, 99, { r: 3 }); vis(ga, t, T.terremoto8 + 0.1, 99, { r: -3 });
    set(km, { o: t > T.km + 0.2 ? 1 : 0, s: pop(t, T.km + 0.2, 0.3), r: -2 }); paint(c.querySelector('.kml'), t, T.km + 0.4, 0.35);
    set(hh, { o: t > T.terremoto8 - 0.15 ? 1 : 0, s: pop(t, T.terremoto8 - 0.15, 0.3), r: -2 + wobble(t, 0.5, 0.6) });
  };
});

/* ===================== L8c · la flecha del mapa coincide con la del dragón → ¡TENÍA RAZÓN! ===================== */
plano(T.justo - 0.15, L(9) - 0.1, { background: '#cfe3ea' }, c => {
  const cam = CAM(c);
  const M = MAPA(cam, 980, 10);
  const TV = TOPV(cam, 330, 14);
  const fd = box(cam, 0, 0, 1080, 1920, { zIndex: 15 }, `<svg width="1080" height="1920" style="overflow:visible"><path class="fd" pathLength="1" d="M736,911 L582,768" stroke="${YEL}" stroke-width="22" fill="none" stroke-linecap="round" stroke-dasharray="1 1"/></svg>`);
  const ok = SELLO(c, 150, 300, 780, '¡TENÍA RAZÓN!', VERDE, 60, 88);
  const zz = ZHANG(cam, 280, 16);
  const ig = chip(c, 600, 1130, 'misma dirección', { size: 50, bg: INK, color: YEL, z: 40 });
  sp(T.justo, 'swoosh_up', 0.6); sp(T.senalaba8, 'click', 0.6); sp(T.dragon8 + 0.05, 'tada', 0.8); sp(T.dragon8 + 0.1, 'stamp', 1.0);
  shakeAt(T.dragon8 + 0.1, 0.4, 16);
  return t => {
    zoom(cam, t, T.justo - 0.15, 3, 0.06);
    set(M, { x: 50, y: 470, r: -1 });
    M.q('.ep').setAttribute('transform', `translate(${GANSU[0]},${GANSU[1]}) scale(${f1(1 + 0.12 * Math.sin(t * 10))})`); M.q('.ar').setAttribute('stroke-dashoffset', 0);
    /* el jarrón visto desde arriba encima de Luoyang, girando hasta que su dragón NO apunta por la flecha */
    const sc = 980 / 800, lx = 50 + LUO[0] * sc, ly = 470 + LUO[1] * sc, kj = p(t, T.justo - 0.1, 0.5, E.outBack);
    set(TV, { x: lx - 165, y: ly - 165, s: kj, r: lerp(90, 0, p(t, T.justo, 1.0, E.inOutCubic)) });
    for (let a = 0; a < 8; a++) { TV.q(`.tl${a}`).setAttribute('opacity', 0); TV.q(`.tf${a}`).setAttribute('fill', a === 7 && t > T.senalaba8 ? YEL : BR); TV.q(`.tbl${a}`).setAttribute('opacity', a === 7 ? 0 : 1); }
    fd.querySelector('.fd').setAttribute('stroke-dashoffset', f1(1 - p(t, T.senalaba8, 0.5)));
    sello2(ok, t, T.dragon8 + 0.1, -5);
    set(zz, { x: 60, y: 1180 - p(t, T.dragon8, 0.4, E.outBack) * 260, o: t > T.dragon8 ? 1 : 0 }); pFace(zz, t, { feliz: 1, jaw: 0.4, look: [-6, -4], seed: 0.2 });
    vis(ig, t, T.senalaba8 + 0.3, T.dragon8 + 0.1, { r: 3 });
  };
});

/* ===================== L9 · OJO: el original se perdió → corte con «?» → réplicas modernas: un péndulo ===================== */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  sello(c, 270, '¡OJO!', T.ojo, { size: 120, r: -6 });
  const V = VASIJA(cam, 600, 10);
  const CO = CORTE(cam, 600, 11);
  const pd = chip(c, 560, 1180, 'original: perdido', { size: 52, bg: RED, z: 40 });
  const dn = texto(c, 430, '¿cómo era por ' + hlSpan('dentro', 'dnl') + '?', { size: 80, z: 40 });
  const rm = chip(c, 380, 1190, 'réplicas modernas', { size: 58, bg: INK, color: YEL, z: 40 });
  const pe = chip(c, 640, 560, 'péndulo', { size: 60, bg: VERDE, z: 40 });
  sp(T.original, 'pop', 0.5); sp(T.perdio, 'cloth_whoosh', 0.8); sp(T.nadie9 - 0.1, 'whoosh', 0.6); sp(T.nadie9 + 0.2, 'boing', 0.6); sp(T.replicas - 0.1, 'swoosh_up', 0.6); sp(T.pendulo, 'tick', 0.7); sp(T.pendulo + 0.5, 'tick', 0.6);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10), [540, 980, 1.0], [540, 960, 1.06]); set(ry, { r: t * 5 });
    /* el original se desvanece (perdido) y queda el contorno en corte */
    const kp = p(t, T.perdio - 0.1, 0.6, E.inOutCubic), kc = p(t, T.nadie9 - 0.2, 0.4, E.outCubic);
    set(V, { x: 230, y: 560 + kp * 30, o: (1 - kp) * (1 - kc) + 0.0, r: kp * 4 }); [0, 1, 2, 3, 4].forEach(i => drop(V, i, 0, 0));
    V.style.filter = `grayscale(${f1(kp)})`;
    set(CO, { x: 230, y: 560, o: kc, s: lerp(0.9, 1, kc) });
    const kq = p(t, T.replicas - 0.2, 0.4, E.inOutCubic);
    CO.q('.qq').setAttribute('opacity', f1(1 - kq)); CO.q('.qq').setAttribute('transform', `translate(300 400) scale(${f1(1 + 0.05 * Math.sin(t * 6))}) translate(-300 -400)`);
    CO.q('.pend').setAttribute('opacity', f1(kq)); CO.q('.pend').setAttribute('transform', `rotate(${f1(Math.sin(t * 3.2) * 16 * kq)} 300 170)`);
    vis(pd, t, T.perdio, T.nadie9 - 0.1, { r: 3 });
    set(dn, { o: t > T.nadie9 - 0.1 && t < T.replicas - 0.2 ? 1 : 0, s: pop(t, T.nadie9 - 0.1, 0.3), r: -2 }); paint(c.querySelector('.dnl'), t, T.dentro, 0.3);
    vis(rm, t, T.replicas, 99, { r: -3 }); vis(pe, t, T.pendulo - 0.05, 99, { r: 4 });
  };
});

/* ===================== L10a · O SEA: móvil con alerta sísmica vs el jarrón de bronce de hace 2.000 años ===================== */
plano(L(10) - 0.1, T.terremoto10 - 0.2, PAPEL, c => {
  const L_ = box(c, 0, 0, 540, 1920, { zIndex: 1, background: '#f2d3c4' }), R_ = box(c, 540, 0, 540, 1920, { zIndex: 1, background: '#d3e3ea' });
  box(c, 530, 260, 20, 1100, { zIndex: 3, background: INK, borderRadius: '10px' });
  const h1 = texto(c, 280, 'hace 2.000 años', { size: 58, x: 20, w: 500, z: 20 }), h2 = texto(c, 280, 'hoy', { size: 76, x: 560, w: 380, z: 20 });
  const V = VASIJA(c, 470, 10);
  const mv = MOVIL(c, 300, 12);
  sp(T.osea, 'pop', 0.5); sp(T.hace10, 'swoosh_up', 0.6); sp(T.china10, 'pop2', 0.5); sp(T.hace10 + 0.6, 'msg_in', 0.6);
  return t => {
    const k1 = p(t, T.hace10 - 0.15, 0.45, E.outBack), k2 = p(t, L(10) - 0.05, 0.45, E.outBack);
    set(h1, { o: t > T.hace10 - 0.15 ? 1 : 0, s: k1, r: -3 }); set(h2, { o: k2 > 0 ? 1 : 0, s: k2, r: 3 });
    set(V, { x: 30, y: 640, s: k1, o: t > T.hace10 - 0.15 ? 1 : 0 }); [0, 1, 2, 3].forEach(i => drop(V, i, 0, 0)); drop(V, 4, 0, 0);
    set(mv, { x: 630, y: 480 + (t > T.hace10 + 0.6 ? Math.sin(t * 50) * 4 : 0), s: k2, r: 4 + (t > T.hace10 + 0.6 ? Math.sin(t * 40) * 2 : 0) });
  };
});

/* ===================== L10b · el jarrón lo sabía antes de que llegara la noticia (carrera: ¡clonc! primero, mensajero después) ===================== */
plano(T.terremoto10 - 0.2, L(11) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  box(cam, -400, 1200, 1880, 900, { zIndex: 1, background: TIERRA, borderTop: `9px solid ${INK}` });
  const V = VASIJA(cam, 470, 10);
  const cab = CABALLO(cam, 340, 11);
  const c1 = chip(c, 60, 300, '1.º el jarrón', { size: 60, bg: VERDE, z: 40 });
  const c2 = chip(c, 560, 420, '2.º la noticia', { size: 56, bg: INK, z: 40 });
  const cl = texto(c, 560, '¡clonc!', { size: 120, color: YEL, z: 40, shadow: OUT, x: 0, w: 640 });
  sp(T.terremoto10 + 0.1, 'thud', 0.9); sp(T.terremoto10 + 0.12, 'ding', 0.8); sp(T.antes, 'whoosh', 0.6); sp(T.noticia, 'pop2', 0.6);
  return t => {
    zoom(cam, t, T.terremoto10 - 0.2, 3, 0.05); set(ry, { r: t * 5 });
    set(V, { x: 60, y: 760 }); [0, 1, 2, 3].forEach(i => drop(V, i, 0, 0)); drop(V, 4, p(t, T.terremoto10 - 0.2, 0.35, E.linear), 1); toadGulp(V, 4, t, T.terremoto10 + 0.15);
    set(cl, { o: t > T.terremoto10 + 0.1 ? 1 : 0, s: pop(t, T.terremoto10 + 0.1, 0.3), r: -6 });
    const kx = p(t, T.antes - 0.3, 1.2, E.outCubic);
    set(cab, { x: lerp(1000, 560, kx), o: t > T.antes - 0.3 ? 1 : 0, y: 1200 - 255 + Math.abs(Math.sin(t * 7)) * -14 }); cab.style.transform += ' scaleX(-1)'; galopa(cab, t, true);
    vis(c1, t, T.terremoto10 + 0.2, 99, { r: -4 }); vis(c2, t, T.noticia - 0.05, 99, { r: 3 });
  };
});

/* L11 · CTA de seguir */
sigueme(11, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L12 · pregunta final (+ «Os leo») */
preguntaFinal('¿Has sentido alguna vez', 'un terremoto?', { size: 84, draw: c => [['en Granada', YEL], ['nunca', PINK], ['en México, uf', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 40, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(12) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(306, 'La máquina de terremotos', ['HISTORIA', 'de China']);

Story.run({
  textura: true,
  ovalo: [[L(7) + 0.2, T.famoso - 0.2], [L(9) + 0.3, T.replicas - 0.3]],
  vecino: { risa: [[T.frotaban, T.frotaban + 0.9]], sorpresa: [[T.perdio, T.perdio + 0.9]], golpes: [] },
});
