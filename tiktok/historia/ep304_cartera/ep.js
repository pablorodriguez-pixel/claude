/* Ep. 304 · «Si devuelves una cartera, el dueño te tiene que pagar» — Código Civil (1889, vigente), arts. 615-616.
   Hallazgo entregado (dueño desconocido → ayuntamiento/objetos perdidos): si aparece el dueño, premio de la décima parte hasta 2.000 pesetas (12,02 €)
   y la vigésima en lo que exceda. 500 € → 1,20 + 24,40 ≈ 25,60 €. Si en 2 años nadie lo reclama, es para quien lo encontró. Quedárselo = delito.
   Portada amarilla del canal; objeto-metáfora por dato: cartera con cara y etiqueta PREMIO, libro CÓDIGO CIVIL con lupa, mostrador de objetos perdidos,
   artículo con «2.000 pesetas» pintado, peseta que se encoge a 12 €, ficha de cálculo, calendario de 24 hojas, esposas tachadas, medalla pagada en pesetas. */
Story.prepara();
const T = {
  encuentras: Q('encuentras'), devuelves: Q('devuelves'), pagar: Q('pagar'), digo: Q('no lo digo'), ley: Q('ley'),
  buscado: Q('buscado'), codigo: Q('código civil'), mejor: Q('mejor'),
  tres: Q('tres pasos'),
  algo: Q('te encuentras algo'), nosabes: Q('no sabes'), llevas: Q('lo llevas'), objetos: Q('objetos perdidos'), ayto: Q('ayuntamiento'),
  aparece: Q('aparece el dueño'), obliga: Q('la ley le obliga'), premio4: Q('premio'), diez4: Q('diez por ciento'),
  articulo: Q('el artículo'), mil: Q('mil ochocientos'), hoy: Q('todavía hoy'), escrito: Q('escrito'), pesetas5: Q('pesetas'),
  diez6: Q('diez por ciento'), dosmil: Q('dos mil pesetas'), doce: Q('doce euros'), arriba: Q('para arriba'), cinco: Q('el cinco'),
  osea6: Q('o sea'), quin: Q('quinientos euros'), tocan: Q('te tocan'), veinti: Q('veinticinco'),
  anos: Q('dos años'), nadie: Q('nadie'), reclama: Q('reclama'), encontraste: Q('encontraste'), parati: Q('para ti'),
  ojo: Q('ojo'), quedar: Q('quedártelo'), delito: Q('delito'), premio8: Q('el premio'), devuelves8: Q('devuelves'),
  espana: Q('españa'), honrado: Q('honrado'), premio9: Q('premio'), pesetas9: Q('pesetas'),
};
const NAR = '#F2983E', VERDE = '#2e9e6b', CUERO = '#9a5a2e', CUERO2 = '#7a4220', EURO = '#8fc7a0', PTA = '#7a9cc9', PLATA = '#c9c4b6';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));

/* cartera con cara (vb 0 0 400 280): .bill = billete que asoma; cara CARAC (conFace) */
const carteraInner = () => `<g class="bill"><rect x="70" y="-10" width="250" height="110" rx="6" fill="${EURO}" stroke="${INK}" stroke-width="6" transform="rotate(-6 195 45)"/><text x="190" y="52" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="46" fill="${INK}" transform="rotate(-6 195 45)">50 €</text></g>
  ${cut('<rect x="20" y="40" width="360" height="230" rx="34"/>', 8, 10)}<rect x="20" y="40" width="360" height="230" rx="34" fill="${CUERO}" stroke="${INK}" stroke-width="8"/>
  <rect x="36" y="56" width="328" height="198" rx="24" fill="none" stroke="#e9c79a" stroke-width="4" stroke-dasharray="12 9"/>
  <path d="M250,40 L380,40 L380,150 Q380,170 360,170 L250,170 Z" fill="${CUERO2}" stroke="${INK}" stroke-width="7"/><circle cx="350" cy="120" r="14" fill="${GOLD}" stroke="${INK}" stroke-width="5"/>
  <g transform="translate(-30,-30) scale(1.3)">${CARAC}</g>`;
const CARTERA = (c, x, y, w, z = 8) => figura(c, x, y, w, w * 0.7, carteraInner(), '0 -20 400 300', { z, origin: '50% 50%' });
/* etiqueta colgante «PREMIO» (vb 0 0 260 200), origen en el cordel */
const TAG = (c, txt = 'PREMIO', z = 12) => figura(c, 0, 0, 330, 254, `<path d="M20,10 C40,40 60,50 80,60" stroke="${INK}" stroke-width="5" fill="none"/>${cut('<path d="M70,50 L230,50 L250,125 L230,195 L70,195 Z"/>', 6, 8)}<path d="M70,50 L230,50 L250,125 L230,195 L70,195 Z" fill="${YEL}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><circle cx="95" cy="80" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/><text x="162" y="140" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="${txt.length > 7 ? 28 : 38}" fill="${RED}">${txt}</text>`, '0 0 260 200', { z, origin: '8% 5%' });
const COIN = (c, w, txt = '€', z = 14) => figura(c, 0, 0, w, w, coinBigInner(txt), '0 0 200 200', { z, origin: '50% 50%' });
/* peseta (vb 0 0 200 200) y billete de 1.000 pesetas (vb 0 0 420 210) */
const PESETA = (c, w, z = 14) => figura(c, 0, 0, w, w, `${cut('<circle cx="100" cy="100" r="92"/>', 5, 7)}<circle cx="100" cy="100" r="92" fill="${PLATA}" stroke="${INK}" stroke-width="7"/><circle cx="100" cy="100" r="74" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="3 7"/><text x="100" y="104" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">100</text><text x="100" y="146" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="${INK}">PTAS</text><path d="M70,50 L80,36 L92,48 L100,32 L108,48 L120,36 L130,50 Z" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>`, '0 0 200 200', { z, origin: '50% 50%' });
const BILLETE = (c, w, z = 12) => figura(c, 0, 0, w, w / 2, `${FIGP('M0,0 L420,0 L420,210 L0,210 Z', PTA, 7, .25)}<rect x="16" y="16" width="388" height="178" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="8 6"/><circle cx="110" cy="105" r="62" fill="#dfe8f2" stroke="${INK}" stroke-width="5"/><path d="M80,140 Q80,100 110,96 Q140,100 140,140 M110,96 a22,22 0 1,1 0.1,0" stroke="${INK}" stroke-width="5" fill="#b9c9dc"/><text x="290" y="96" text-anchor="middle" font-family="Rye" font-size="62" fill="${INK}">1000</text><text x="290" y="150" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="36" fill="${INK}">PESETAS</text>`, '0 0 420 210', { z, origin: '50% 50%' });
/* mano que señala a la izquierda (vb 0 0 300 170) */
const MANO = (c, z = 16) => figura(c, 0, 0, 330, 187, `<path d="M8,62 Q8,42 28,42 L160,42 L160,86 L28,86 Q8,86 8,62 Z" fill="#f1c29a" stroke="${INK}" stroke-width="7"/><path d="M140,22 Q210,4 300,24 L300,156 Q210,172 140,146 Q120,120 150,104 Q118,96 140,70 Z" fill="#f1c29a" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M160,104 h60 M160,128 h56" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`, '0 0 300 170', { z, origin: '50% 50%' });
/* lupa (div redondo con mango) */
const LUPA = (c, d, z = 30) => { const l = box(c, 0, 0, d, d, { zIndex: z, transformOrigin: '50% 50%' });
  box(l, d * 0.78, d * 0.78, d * 0.5, d * 0.16, { background: CUERO2, border: `8px solid ${INK}`, borderRadius: '20px', transform: 'rotate(45deg)', transformOrigin: '0 50%' });
  box(l, 0, 0, d, d, { borderRadius: '50%', border: `16px solid ${INK}`, background: 'rgba(255,255,255,.25)', boxSizing: 'border-box', boxShadow: `inset 0 0 0 6px ${GOLD}` }); return l; };
/* fachada del ayuntamiento (vb 0 0 600 440) */
const AYTO = (c, x, y, w, z = 3) => figura(c, x, y, w, w * 440 / 600, `${FIGP('M40,150 L560,150 L560,440 L40,440 Z', '#efe3c6', 6, .25)}${FIGP('M20,150 L300,40 L580,150 Z', '#e2d2ac', 6, .3)}
  <circle cx="300" cy="112" r="28" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M300,112 V94 M300,112 L312,120" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  ${[90, 190, 390, 490].map(x => `<rect x="${x}" y="190" width="28" height="250" fill="#fff" stroke="${INK}" stroke-width="5"/>`).join('')}
  <path d="M250,440 L250,300 Q300,250 350,300 L350,440 Z" fill="${CUERO2}" stroke="${INK}" stroke-width="6"/>
  <rect x="120" y="156" width="360" height="38" fill="#fff" stroke="${INK}" stroke-width="4"/><text x="300" y="186" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="${INK}">AYUNTAMIENTO</text>
  <path d="M300,40 V-40" stroke="${INK}" stroke-width="6"/><g class="flag"><path d="M300,-40 L380,-40 L380,10 L300,10 Z" fill="${YEL}" stroke="${INK}" stroke-width="5"/><path d="M300,-40 L380,-40 L380,-26 L300,-26 Z M300,-4 L380,-4 L380,10 L300,10 Z" fill="${RED}"/></g>`, '0 -50 600 490', { z, origin: '50% 100%' });
/* esposas (vb 0 0 360 200) */
const ESPOSAS = (c, w, z = 14) => figura(c, 0, 0, w, w * 200 / 360, `<g class="l"><circle cx="90" cy="110" r="66" fill="none" stroke="${INK}" stroke-width="30"/><circle cx="90" cy="110" r="66" fill="none" stroke="${PLATA}" stroke-width="18"/></g>
  <path d="M150,96 q15,-20 30,0 q15,20 30,0" stroke="${INK}" stroke-width="12" fill="none"/><path d="M150,96 q15,-20 30,0 q15,20 30,0" stroke="${PLATA}" stroke-width="5" fill="none"/>
  <g class="r"><circle cx="270" cy="110" r="66" fill="none" stroke="${INK}" stroke-width="30"/><circle cx="270" cy="110" r="66" fill="none" stroke="${PLATA}" stroke-width="18"/></g>`, '0 0 360 200', { z, origin: '50% 50%' });
/* medalla (vb 0 0 300 420): .txt dentro */
const MEDALLA = (c, w, z = 10) => figura(c, 0, 0, w, w * 1.4, `<path d="M90,0 L150,150 L210,0 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><path d="M40,0 L120,170 L160,150 L90,0 Z" fill="${PINK}" stroke="${INK}" stroke-width="6"/><path d="M260,0 L180,170 L140,150 L210,0 Z" fill="${PINK}" stroke="${INK}" stroke-width="6"/>
  ${cut('<circle cx="150" cy="280" r="128"/>', 8, 10)}<circle cx="150" cy="280" r="128" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="280" r="102" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="6 8"/>
  <text class="txt" x="150" y="300" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">HONRADO</text>`, '0 0 300 420', { z, origin: '50% 0%' });
/* ficha de papel (div) */
const FICHA = (c, x, y, w, h, z = 10) => box(c, x, y, w, h, { zIndex: z, background: '#fbf6ea', border: `7px solid ${INK}`, borderRadius: '24px', boxShadow: `12px 14px 0 ${SH}`, transformOrigin: '50% 50%', boxSizing: 'border-box' });
const TXT = (pa, x, y, w, html, o = {}) => el('div', pa, { left: px(x), top: px(y), width: px(w), textAlign: o.align || 'center', fontFamily: o.font || 'Bricolage', fontWeight: o.weight || 800, fontStyle: o.italic ? 'italic' : 'normal', fontSize: px(o.size || 56), lineHeight: o.lh || 1.1, color: o.color || INK, zIndex: o.z || 3 }, html);
const persona = (c, ropa, pelo, z = 8) => PERS(c, 0, 0, 290, { ropa, pelo, pcol: '#3a2a1e', piernas: true, z });

/* PORTADA + L0 · rayos amarillos, «¿TE TIENEN QUE PAGAR?», cartera enorme con cara y etiqueta PREMIO; la mano la devuelve al dueño → moneda → «¡LO DICE LA LEY!» */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t1 = texto(c, 270, '¿TE TIENEN QUE', { size: 104, z: 30 });
  const t2 = texto(c, 385, hlSpan('PAGAR?', 'phl'), { size: 150, italic: true, z: 30 });
  box(c, -40, 1260, 1160, 400, { zIndex: 2, background: '#b8ab92', borderTop: `8px solid ${INK}`, backgroundImage: 'linear-gradient(90deg, rgba(43,33,24,.25) 4px, transparent 4px)', backgroundSize: '160px 100%' });
  const ca = CARTERA(c, 150, 640, 620, 8);
  const tag = TAG(c, 'PREMIO', 12);
  const due = persona(c, '#1f3fa0', 'corto', 6);
  const mano = MANO(c, 16);
  const coins = [0, 1, 2].map(i => COIN(c, 150, '€', 20 + i));
  const est = [[90, 640], [860, 600], [120, 1120], [800, 1180]].map(([x, y], i) => { const e = ESTRELLA(c, 90, i % 2 ? PINK : YEL); set(e, { x, y }); return e; });
  const cD = chip(c, 80, 1150, 'y no lo digo yo…', { size: 56, bg: INK, z: 40 });
  sello(c, 1180, '¡LO DICE LA LEY!', T.ley, { size: 100, r: -6 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.devuelves, 'whoosh', 0.6); sp(T.pagar, 'cash', 0.8); sp(T.pagar + 0.2, 'ping', 0.5); sp(T.digo, 'pop', 0.5);
  return t => {
    set(ry, { r: t * 6 });
    set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3) });
    paint(c.querySelector('.phl'), t, 0.2, 0.4);
    const kg = p(t, T.devuelves, 0.7, E.inOutCubic);
    const cx = lerp(0, -120, kg), cs = lerp(1, 0.72, kg);
    set(ca, { x: cx, y: lerp(0, 60, kg) + Math.sin(t * 3) * 6, s: cs * (1 + 0.02 * Math.sin(t * 4)), r: wobble(t, 0.6, 3) });
    ca.querySelector('.bill').setAttribute('transform', `translate(0,${f1(Math.sin(t * 5) * 6)})`);
    conFace(ca, t, { jaw: t > T.pagar && t < T.pagar + 0.6 ? 0.6 : 0, look: t > T.devuelves ? [12, -4] : [-6, -6], feliz: 0.9, ceja: t > T.ley ? 8 : 0, seed: 0.3 });
    set(tag, { x: lerp(540, 400, kg), y: lerp(1010, 960, kg), r: Math.sin(t * 2.6) * 14, s: t > T.pagar ? 1 + 0.12 * Math.abs(Math.sin((t - T.pagar) * 7)) : 1 });
    const kd = p(t, T.devuelves - 0.1, 0.6, E.outBack);
    set(due, { x: lerp(1150, 640, kd), y: 820, o: t > T.devuelves - 0.1 ? 1 : 0 });
    pFace(due, t, { look: [-14, 0], feliz: t > T.pagar ? 1 : 0.3, jaw: t > T.devuelves && t < T.pagar ? 0.4 : 0.1, ceja: t > T.devuelves && t < T.pagar ? 8 : 0, seed: 2 });
    const km = p(t, T.devuelves, 0.5, E.outBack);
    set(mano, { x: lerp(-400, 0, km) + Math.sin(t * 5) * 6, y: 990, r: 180, o: t > T.devuelves && t < T.digo ? 1 : 0 });
    coins.forEach((co, i) => { const t0 = T.pagar + i * 0.15, k = clamp((t - t0) / 0.55); set(co, { x: lerp(760, 140 + i * 120, k), y: lerp(940, 1000, k) - Math.sin(k * Math.PI) * 300, r: t * 200, o: t > t0 && t < T.ley - 0.1 ? 1 : 0 }); });
    est.forEach((e, i) => set(e, { s: 0.8 + 0.25 * Math.sin(t * 6 + i), r: t * 80 * (i % 2 ? 1 : -1) }));
    set(cD, { o: t > T.digo && t < T.ley ? 1 : 0, s: pop(t, T.digo, 0.3), r: -3 });
  };
}, { sfx: false });

/* L1 · «Lo he buscado» (buscador del BOE tecleando) → «en el Código Civil» (el libro se abre) → «mejor de lo que parece» (lupa en «Art. 616») */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const bus = FICHA(cam, 90, 520, 900, 150, 20); bus.style.borderRadius = '80px';
  const q = 'artículo 616 código civil';
  const bt = TXT(bus, 110, 38, 760, '', { size: 52, align: 'left', font: 'IBMPlexMono' });
  box(bus, 26, 30, 70, 70, {}, `<svg viewBox="0 0 70 70" width="70" height="70"><circle cx="28" cy="28" r="20" fill="none" stroke="${INK}" stroke-width="7"/><path d="M44,44 L62,62" stroke="${INK}" stroke-width="8" stroke-linecap="round"/></svg>`);
  const libro = figura(cam, 150, 720, 780, 500, libroViejoInner('CÓDIGO CIVIL', ['Art. 616', 'premio', 'pesetas']), '0 0 760 490', { z: 8, origin: '50% 50%' });
  const tapa = box(cam, 540, 720, 390, 500, { zIndex: 9, background: '#7a1f1f', border: `8px solid ${INK}`, borderRadius: '10px 24px 24px 10px', transformOrigin: '0% 50%', boxSizing: 'border-box', boxShadow: `10px 12px 0 ${SH}` },
    `<div style="position:absolute;left:0;top:130px;width:100%;text-align:center;font-family:Rye;font-size:58px;line-height:1.1;color:${GOLD}">CÓDIGO<br>CIVIL</div><div style="position:absolute;left:0;top:340px;width:100%;text-align:center;font-family:Playfair;font-weight:900;font-size:50px;color:${GOLD}">1889</div>`);
  const lupa = LUPA(cam, 300, 30);
  const c616 = chip(c, 560, 1270, 'Art. 616', { size: 64, bg: RED, z: 40 });
  sp(T.buscado - 0.1, 'typing', 0.5); sp(T.codigo, 'thud', 0.6); sp(T.codigo + 0.3, 'paper', 0.6); sp(T.mejor, 'sparkle', 0.6); sp(T.mejor + 0.3, 'ding', 0.5);
  return t => {
    deriva(cam, t, L(1) - 0.1, L(2) - 0.08, [540, 900, 1.0], [560, 960, 1.08]); set(ry, { r: -t * 5 });
    const n = Math.round(clamp((t - T.buscado + 0.2) / 0.9) * q.length); bt.textContent = q.slice(0, n) + (Math.sin(t * 12) > 0 ? '|' : ' ');
    set(bus, { s: pop(t, L(1) - 0.05, 0.3), r: -1 });
    const kl = p(t, T.codigo - 0.25, 0.4, E.outBack); set(libro, { s: kl, r: wobble(t, 0.4, 1) });
    const ko = p(t, T.codigo + 0.3, 0.6, E.inOutCubic);
    set(tapa, { x: lerp(0, -390, ko), sx: ko < 0.5 ? 1 - ko * 2 : 0.001, s: kl, o: ko < 0.5 ? 1 : 0 });
    const kz = p(t, T.mejor - 0.3, 0.5, E.outBack);
    set(lupa, { x: lerp(820, 600, kz) + Math.sin(t * 3) * 10, y: lerp(1100, 700, kz) + Math.cos(t * 3) * 8, o: t > T.mejor - 0.3 ? 1 : 0, s: 1 + 0.04 * Math.sin(t * 5) });
    set(c616, { o: t > T.mejor ? 1 : 0, s: pop(t, T.mejor, 0.3), r: 3 });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* L3 · «Te lo cuento en tres pasos.» */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const ry = rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const ca = CARTERA(c, 310, 420, 460, 8);
  const tag = TAG(c, 'PREMIO', 12);
  const nums = [1, 2, 3].map((n, i) => aparece(box(c, 400 + i * 170, 900, 140, 140, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', lineHeight: '126px', color: INK, zIndex: 30 }, String(n)), T.tres + i * 0.18));
  return t => {
    set(ry, { r: t * 6 }); set(ca, { r: wobble(t, 0.7, 4), s: 1 + 0.04 * Math.sin(t * 5) });
    conFace(ca, t, { jaw: 0, look: [0, 8], feliz: 1, seed: 0.6 });
    set(tag, { x: 690, y: 540, r: Math.sin(t * 3) * 16 });
  };
});

/* PASO 1 (a) · en la calle: la cartera en el suelo, la mano la recoge, «¿de quién es?» entre la gente; te la llevas */
paso(L(4) - 0.1, L(5) - 0.1, 1, 'Llévalo a ' + hlSpan('objetos perdidos', 'shl'), T.objetos);
plano(L(4) - 0.1, T.objetos - 0.1, { background: 'linear-gradient(#bfe3f2, #e8f4f8 60%)' }, c => {
  const cam = CAM(c);
  box(cam, -200, 1150, 1480, 900, { zIndex: 2, background: '#b8ab92', borderTop: `8px solid ${INK}`, backgroundImage: 'linear-gradient(90deg, rgba(43,33,24,.25) 4px, transparent 4px), linear-gradient(rgba(43,33,24,.18) 4px, transparent 4px)', backgroundSize: '160px 100%, 100% 90px' });
  const farola = box(cam, 830, 560, 30, 600, { zIndex: 3, background: '#5E5A52', border: `5px solid ${INK}` });
  const ca = CARTERA(cam, 340, 1040, 300, 8);
  const brillo = [0, 1, 2].map(i => { const e = ESTRELLA(cam, 70, YEL); return e; });
  const mano = MANO(cam, 16);
  const gente = [['#e8507a', 'largo'], ['#2e9e6b', 'corto'], ['#f28c28', 'calvo']].map(([r, pl], i) => persona(cam, r, pl, 5 + i));
  const QM = [0, 1, 2].map(i => qMark(cam, 0, 0, 100, i % 2 ? PINK : YEL));
  const cQ = chip(c, 140, 1240, '¿de quién es?', { size: 62, bg: PINK, z: 40 });
  sp(T.algo, 'sparkle', 0.6); sp(T.algo + 0.5, 'whoosh', 0.5); sp(T.nosabes, 'boing', 0.5); sp(T.llevas, 'swoosh_up', 0.5);
  return t => {
    deriva(cam, t, L(4) - 0.1, T.objetos - 0.1, [540, 960, 1.0], [540, 1000, 1.08]);
    set(farola, { r: 0 });
    const kp = p(t, T.algo + 0.5, 0.5, E.inOutCubic), kv = p(t, T.llevas, 0.8, E.inOutCubic);
    set(ca, { x: lerp(0, 60, kp) + lerp(0, 700, kv), y: lerp(0, -260, kp) + Math.sin(t * 4) * (kp > 0 ? 8 : 0), r: lerp(-8, 4, kp) + wobble(t, 0.5, 2), s: lerp(1, 1.2, kp) });
    conFace(ca, t, { jaw: 0, look: t > T.nosabes ? [Math.sin(t * 3) * 14, -4] : [0, -8], feliz: t > T.nosabes ? -0.2 : 0.6, ceja: t > T.nosabes ? 8 : 0, seed: 0.5 });
    brillo.forEach((b, i) => set(b, { x: 330 + i * 120, y: 980 + Math.sin(t * 5 + i) * 20, s: (0.6 + 0.4 * Math.sin(t * 8 + i)) * (t < T.algo + 0.5 ? 1 : 0), r: t * 120 }));
    set(mano, { x: lerp(-360, 420, p(t, T.algo, 0.5, E.outBack)) + lerp(0, 700, kv), y: lerp(1020, 760, kp), r: -90 + kp * 90, o: t > T.algo ? 1 : 0 });
    gente.forEach((g, i) => { const k = p(t, T.nosabes - 0.3 + i * 0.12, 0.5, E.outBack); set(g, { x: lerp(-300 + i * 0, 60 + i * 260, k) - lerp(0, 900, kv), y: 960 }); pFace(g, t, { look: [Math.sin(t * 2 + i) * 14, 0], ceja: 6, jaw: 0.2, feliz: 0, seed: i }); });
    QM.forEach((q, i) => set(q, { x: 110 + i * 260 - lerp(0, 900, kv), y: 680 + Math.sin(t * 4 + i) * 15, s: pop(t, T.nosabes + i * 0.12, 0.3), o: t > T.nosabes + i * 0.12 ? 1 : 0, r: Math.sin(t * 5 + i) * 12 }));
    set(cQ, { o: t > T.nosabes && t < T.llevas ? 1 : 0, s: pop(t, T.nosabes, 0.3), r: -3 });
  };
});
/* PASO 1 (b) · mostrador de «OBJETOS PERDIDOS» del ayuntamiento → aparece el dueño → la ley le obliga → moneda → «10 %» */
plano(T.objetos - 0.1, L(5) - 0.1, { background: '#e9dcc0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 60px, transparent 60px 120px)' }, c => {
  const cam = CAM(c);
  const ayto = AYTO(cam, 90, 700, 420, 3);
  const cartel = box(cam, 120, 560, 840, 120, { zIndex: 6, background: VERDE, border: `8px solid ${INK}`, borderRadius: '18px', boxShadow: `10px 10px 0 ${SH}`, textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '72px', lineHeight: '104px', color: '#fff', transformOrigin: '50% 0%' }, 'OBJETOS PERDIDOS');
  const func = persona(cam, '#5E5A52', 'calvo', 5);
  const mostr = box(cam, 40, 1170, 880, 300, { zIndex: 9, background: WOOD, border: `8px solid ${INK}`, borderRadius: '14px', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.18) 0 6px, transparent 6px 90px)' });
  const ca = CARTERA(cam, 300, 990, 280, 12);
  const due = persona(cam, '#1f3fa0', 'corto', 7);
  const bub = box(cam, 0, 0, 300, 120, { zIndex: 20, background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '56px', lineHeight: '106px', color: INK, transformOrigin: '20% 100%' }, '¡ES MÍA!');
  const ley = box(cam, 0, 0, 260, 140, { zIndex: 22, background: '#7a1f1f', border: `7px solid ${INK}`, borderRadius: '12px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', lineHeight: '58px', paddingTop: '8px', boxSizing: 'border-box', color: GOLD, transformOrigin: '50% 50%' }, 'CÓDIGO<br>CIVIL');
  const coins = [0, 1, 2].map(i => COIN(cam, 130, '€', 24 + i));
  const cAy = chip(c, 380, 1250, 'ayuntamiento', { size: 56, bg: INK, z: 40 });
  const diez = box(c, 190, 760, 700, 300, { zIndex: 60, whiteSpace: 'nowrap', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '240px', lineHeight: '300px', textAlign: 'center', color: '#fff', textShadow: `8px 8px 0 ${INK}, -4px -4px 0 ${INK}, 4px -4px 0 ${INK}, -4px 4px 0 ${INK}`, transformOrigin: '50% 50%' }, '10 %');
  const rd = box(c, 240, 750, 600, 320, { zIndex: 59, background: RED, borderRadius: '50%', border: `10px solid ${INK}`, transformOrigin: '50% 50%' });
  sp(T.objetos, 'thud', 0.6); sp(T.objetos + 0.4, 'bell', 0.6); sp(T.ayto, 'pop', 0.5); sp(T.aparece, 'swoosh_up', 0.6); sp(T.aparece + 0.4, 'boing', 0.5); sp(T.obliga, 'stamp', 0.7); sp(T.premio4, 'cash', 0.8); sp(T.diez4, 'tada', 0.7);
  shakeAt(T.diez4, 0.35, 16);
  return t => {
    deriva(cam, t, T.objetos - 0.1, L(5) - 0.1, [540, 960, 1.0], [540, 980, 1.08]);
    set(ayto, { o: t > T.ayto - 0.2 ? 1 : 0, sy: p(t, T.ayto - 0.2, 0.45, E.outBack) });
    ayto.querySelector('.flag').setAttribute('transform', `skewY(${f1(Math.sin(t * 6) * 6)})`);
    set(cartel, { s: pop(t, T.objetos - 0.05, 0.4), r: Math.sin(t * 2) * 1.5 });
    set(func, { x: 480, y: 880 }); pFace(func, t, { look: t > T.aparece ? [14, 0] : [-12, 6], feliz: 0.6, jaw: 0.1, ceja: t > T.obliga ? 8 : 0, seed: 1 });
    const kc = p(t, T.objetos, 0.5, E.outBack);
    set(ca, { x: lerp(-500, 0, kc), r: wobble(t, 0.5, 2) });
    conFace(ca, t, { jaw: 0, look: t > T.aparece ? [14, -4] : [0, 0], feliz: t > T.aparece ? 1 : 0.3, seed: 0.9 });
    const kd = p(t, T.aparece - 0.1, 0.6, E.outBack);
    set(due, { x: lerp(1200, 640, kd), y: 880, o: t > T.aparece - 0.1 ? 1 : 0 });
    pFace(due, t, { look: [-14, 4], feliz: 1, jaw: t > T.aparece + 0.3 && t < T.obliga ? 0.6 : 0.1, ceja: t > T.obliga && t < T.premio4 ? 10 : 0, seed: 3 });
    set(bub, { x: 620, y: 600, o: t > T.aparece + 0.3 && t < T.obliga ? 1 : 0, s: pop(t, T.aparece + 0.3, 0.3) });
    set(ley, { x: 420, y: 720, o: t > T.obliga && t < T.diez4 ? 1 : 0, s: pop(t, T.obliga, 0.35), r: Math.sin(t * 8) * 6 });
    coins.forEach((co, i) => { const t0 = T.premio4 + i * 0.15, k = clamp((t - t0) / 0.55); set(co, { x: lerp(860, 300 + i * 90, k), y: lerp(920, 820, k) - Math.sin(k * Math.PI) * 260, r: t * 220, o: t > t0 && t < T.diez4 + 0.2 ? 1 : 0 }); });
    set(cAy, { o: t > T.ayto && t < T.aparece ? 1 : 0, s: pop(t, T.ayto, 0.3), r: 3 });
    set(rd, { o: t > T.diez4 - 0.1 ? 1 : 0, s: pop(t, T.diez4 - 0.1, 0.4), r: t * 20 });
    set(diez, { o: t > T.diez4 ? 1 : 0, s: pop(t, T.diez4, 0.45) * (1 + 0.04 * Math.sin(t * 8)), r: -6 });
  };
});

/* PASO 2 · la ley es de 1889 (sello) y sigue vigente → escrita en PESETAS (peseta y billete que entran girando) */
paso(L(5) - 0.1, L(7) - 0.1, 2, 'Ley de 1889… ' + hlSpan('en pesetas', 'shl'), T.pesetas5);
plano(L(5) - 0.1, L(6) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const libro = figura(cam, 150, 600, 780, 500, libroViejoInner('CÓDIGO CIVIL', ['Art. 616', 'premio', '…pesetas']), '0 0 760 490', { z: 6, origin: '50% 50%' });
  const s1889 = box(cam, 560, 900, 400, 200, { zIndex: 20, border: `12px solid ${RED}`, color: RED, borderRadius: '18px', fontFamily: 'Rye', fontSize: '130px', lineHeight: '170px', textAlign: 'center', background: 'rgba(255,255,255,.7)', transformOrigin: '50% 50%', boxSizing: 'border-box' }, '1889');
  const hoy = chip(c, 80, 1120, 'y en 2026, sigue en vigor', { size: 56, bg: VERDE, z: 40 });
  const pes = PESETA(cam, 300, 24), bil = BILLETE(cam, 460, 22);
  sp(T.articulo, 'paper', 0.6); sp(T.mil + 0.1, 'stamp', 0.9); sp(T.hoy, 'tick', 0.6); sp(T.pesetas5, 'whoosh', 0.6); sp(T.pesetas5 + 0.4, 'cash', 0.7);
  shakeAt(T.mil + 0.1, 0.3, 14);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 960, 1.0], [540, 940, 1.07]); set(ry, { r: t * 5 });
    set(libro, { s: pop(t, L(5), 0.4), r: wobble(t, 0.4, 1.5) });
    const ks = clamp((t - T.mil - 0.1) / 0.25);
    set(s1889, { o: t > T.mil + 0.1 ? 1 : 0, s: t < T.mil + 0.1 ? 0 : lerp(2.2, 1, E.outCubic(ks)), r: -10, x: t > T.escrito ? lerp(0, 120, p(t, T.escrito, 0.4)) : 0, y: t > T.escrito ? lerp(0, -340, p(t, T.escrito, 0.4)) : 0 });
    set(hoy, { o: t > T.hoy - 0.1 && t < T.pesetas5 ? 1 : 0, s: pop(t, T.hoy - 0.1, 0.3), r: -2 });
    const kp = p(t, T.pesetas5 - 0.15, 0.6, E.outBack);
    set(pes, { x: lerp(-400, 120, kp), y: 980 + Math.sin(t * 4) * 10, r: lerp(-360, 0, kp) + Math.sin(t * 3) * 8, o: t > T.pesetas5 - 0.15 ? 1 : 0 });
    const kb = p(t, T.pesetas5 + 0.1, 0.6, E.outBack);
    set(bil, { x: lerp(1200, 470, kb), y: 1060 + Math.cos(t * 3) * 10, r: lerp(40, -6, kb) + Math.sin(t * 2.5) * 4, o: t > T.pesetas5 + 0.1 ? 1 : 0 });
  };
});
/* L6 (a) · el artículo con «2.000 pesetas» pintado → 2.000 pesetas se encogen a 12 € → «y el 5 % del resto» */
plano(L(6) - 0.1, T.osea6 - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const art = FICHA(cam, 70, 560, 940, 500, 8);
  TXT(art, 30, 26, 870, 'Art. 616', { font: 'Rye', size: 60, color: RED });
  TXT(art, 40, 120, 850, `«…la décima parte… Cuando el valor excediese de <span style="position:relative;display:inline-block;z-index:0"><span class="ahl" style="position:absolute;left:-8px;right:-8px;bottom:4%;height:50%;background:${YEL};z-index:-1;transform-origin:left center"></span>2.000 pesetas</span>, el premio se reducirá a la vigésima parte…»`, { font: 'Playfair', italic: true, weight: 700, size: 58, lh: 1.18, align: 'left' });
  const c10 = chip(c, 90, 1100, '10 %', { size: 90, bg: RED, z: 40 });
  const pes = PESETA(cam, 260, 20), eq = TXT(cam, 360, 1150, 160, '=', { size: 160, z: 21 });
  const c12 = box(cam, 560, 1110, 380, 220, { zIndex: 22, background: EURO, border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 10px 0 ${INK}`, textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '130px', lineHeight: '200px', color: INK, transformOrigin: '50% 50%' }, '12 €');
  const lab = TXT(cam, 60, 1350, 340, '2.000 pesetas', { size: 50, z: 21 });
  const c5 = chip(c, 560, 1360, 'y del resto, el 5 %', { size: 56, bg: INK, z: 40 });
  sp(T.diez6, 'pop', 0.5); sp(T.dosmil, 'scratch', 0.5); sp(T.doce, 'error', 0.5); sp(T.doce + 0.2, 'thud', 0.8); sp(T.cinco, 'pop2', 0.6);
  shakeAt(T.doce + 0.2, 0.35, 16);
  return t => {
    deriva(cam, t, L(6) - 0.1, T.osea6 - 0.1, [540, 900, 1.0], [540, 960, 1.04]);
    set(art, { s: pop(t, L(6) - 0.05, 0.35), r: -1.5 + wobble(t, 0.4, 0.8), y: lerp(0, -40, p(t, T.doce - 0.3, 0.4)) });
    paint(art.querySelector('.ahl'), t, T.dosmil, 0.4);
    set(c10, { o: t > T.diez6 && t < T.dosmil + 0.4 ? 1 : 0, s: pop(t, T.diez6, 0.3), r: -4 });
    const kk = p(t, T.dosmil + 0.4, 0.4, E.outBack);
    set(pes, { x: 80, y: 1100, s: kk * (t > T.doce ? lerp(1, 0.85, p(t, T.doce, 0.3)) : 1), r: Math.sin(t * 3) * 8, o: t > T.dosmil + 0.4 ? 1 : 0 });
    set(lab, { o: t > T.dosmil + 0.5 ? 1 : 0 });
    set(eq, { o: t > T.doce - 0.2 ? 1 : 0, s: pop(t, T.doce - 0.2, 0.3) });
    set(c12, { o: t > T.doce ? 1 : 0, s: pop(t, T.doce, 0.4) * (1 + 0.03 * Math.sin(t * 7)), r: 4 + (t > T.doce + 0.2 && t < T.doce + 0.8 ? Math.sin(t * 40) * 3 : 0) });
    set(c5, { o: t > T.cinco - 0.1 ? 1 : 0, s: pop(t, T.cinco - 0.1, 0.3), r: 3 });
  };
});
/* L6 (b) · ficha de cálculo: devuelves 500 € → 1,20 € + 24,40 € → ≈ 25 € */
plano(T.osea6 - 0.1, L(7) - 0.1, { background: '#dff1e4', backgroundImage: 'linear-gradient(90deg, rgba(43,33,24,.10) 3px, transparent 3px), linear-gradient(rgba(43,33,24,.10) 3px, transparent 3px)', backgroundSize: '60px 60px' }, c => {
  const ca = CARTERA(c, 90, 560, 330, 8);
  const bills = [0, 1, 2, 3, 4].map(i => box(c, 0, 0, 200, 100, { zIndex: 9, background: EURO, border: `6px solid ${INK}`, borderRadius: '8px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '48px', lineHeight: '88px', color: INK, transformOrigin: '50% 50%' }, '100 €'));
  const t500 = TXT(c, 460, 600, 460, 'devuelves<br><span style="font-size:130px;color:' + RED + '">500 €</span>', { size: 60, lh: 1.0, z: 10 });
  const fi = FICHA(c, 80, 880, 840, 330, 12);
  const r1 = TXT(fi, 30, 30, 780, '10 % de 12 € = <b>1,20 €</b>', { size: 54, align: 'left', weight: 700 });
  const r2 = TXT(fi, 30, 110, 780, '5 % de 488 € = <b>24,40 €</b>', { size: 54, align: 'left', weight: 700 });
  const rl = box(fi, 30, 196, 780, 8, { background: INK });
  const r3 = TXT(fi, 30, 214, 780, 'premio ≈ <span style="color:' + RED + '">25,60 €</span>', { size: 70, align: 'left' });
  sello(c, 1250, '≈ 25 €', T.veinti, { size: 130, r: -6 });
  sp(T.quin - 0.2, 'whoosh', 0.5); [0, 1, 2, 3, 4].forEach(i => sp(T.quin + i * 0.1, 'paper', 0.3)); sp(T.tocan, 'type', 0.5); sp(T.tocan + 0.4, 'type', 0.5);
  return t => {
    set(ca, { r: wobble(t, 0.6, 3), s: 1 + 0.03 * Math.sin(t * 4) });
    conFace(ca, t, { jaw: 0, look: [14, 0], feliz: t > T.veinti ? 1 : 0.4, ceja: t > T.tocan ? 6 : 0, seed: 1.2 });
    bills.forEach((b, i) => { const k = p(t, T.quin + i * 0.1, 0.4, E.outBack); set(b, { x: 130 + i * 18, y: lerp(640, 470 - i * 22, k), r: -12 + i * 6 + Math.sin(t * 3 + i) * 3, o: t > T.quin + i * 0.1 ? 1 : 0 }); });
    set(t500, { o: 1, s: pop(t, T.osea6 - 0.05, 0.35), r: 2 });
    set(fi, { o: t > T.tocan - 0.3 ? 1 : 0, s: pop(t, T.tocan - 0.3, 0.35), r: -1.5 });
    set(r1, { o: t > T.tocan - 0.1 ? 1 : 0 }); set(r2, { o: t > T.tocan + 0.35 ? 1 : 0 });
    set(rl, { o: t > T.veinti - 0.25 ? 1 : 0, sx: p(t, T.veinti - 0.25, 0.25) }); set(r3, { o: t > T.veinti - 0.1 ? 1 : 0, s: pop(t, T.veinti - 0.1, 0.3) });
  };
});

/* PASO 3 · la cartera en la estantería de objetos perdidos; el calendario arranca 24 hojas (2 años); nadie viene (telaraña); la cartera vuela a ti: «¡TUYA!» */
paso(L(7) - 0.1, L(8) - 0.1, 3, 'En ' + hlSpan('2 años', 'shl') + ', nadie: es tuya', T.anos);
plano(L(7) - 0.1, L(8) - 0.1, { background: '#e9dcc0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 60px, transparent 60px 120px)' }, c => {
  const cam = CAM(c);
  ESTANTE(cam, 1000, 4);
  const ca = CARTERA(cam, 70, 800, 300, 8);
  const telar = box(cam, 40, 760, 200, 200, { zIndex: 12 }, `<svg viewBox="0 0 200 200" width="200" height="200"><path d="M0,0 L200,200 M0,0 L200,60 M0,0 L60,200 M0,0 L140,200 M0,0 L200,130" stroke="#fff" stroke-width="3"/>${[40, 80, 120, 160].map(r => `<path d="M${r},0 Q${r * 0.7},${r * 0.7} 0,${r}" stroke="#fff" stroke-width="3" fill="none"/>`).join('')}</svg>`);
  const MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const w = 360, cal = box(cam, 520, 560, w, 420, { zIndex: 8, transformOrigin: '50% 50%' });
  box(cal, 10, 50, w - 10, 360, { background: '#d9cdb4', border: `6px solid ${INK}`, borderRadius: '18px', boxShadow: `12px 14px 0 ${SH}` });
  const hojas = [...Array(25)].map((_, i) => box(cal, 0, 36, w - 16, 360, { zIndex: 30 - i, background: '#fbf6ea', border: `6px solid ${INK}`, borderRadius: '18px', overflow: 'hidden', transformOrigin: '50% 0%', boxSizing: 'border-box' },
    `<div style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:54px;text-align:center;line-height:84px;border-bottom:6px solid ${INK}">${MES[i % 12]}</div><div style="font-family:Bricolage;font-weight:800;font-size:110px;text-align:center;line-height:170px;color:${INK}">${2026 + Math.floor(i / 12)}</div>`));
  const tf = i => T.anos - 0.1 + i * (T.reclama - T.anos + 0.4) / 24;
  for (let i = 0; i < 24; i += 2) sfx('paper', tf(i), 0.3);
  const c2 = chip(c, 560, 1040, '2 AÑOS', { size: 72, bg: YEL, color: INK, z: 40 });
  const reloj = box(cam, 600, 1150, 0, 0, { zIndex: 6 });
  const mano = MANO(cam, 16);
  sello(c, 1250, '¡PARA TI!', T.parati, { size: 120, r: -6 });
  sp(T.anos, 'clockfast', 0.5); sp(T.nadie, 'sad', 0.5); sp(T.encontraste, 'whoosh', 0.6); sp(T.parati - 0.1, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(8) - 0.1, [540, 960, 1.0], [520, 960, 1.07]);
    set(cal, { s: pop(t, L(7), 0.4), r: 2 + wobble(t, 0.5, 1.2) });
    hojas.forEach((h, i) => { if (i === 24) return; const k = clamp((t - tf(i)) / 0.14); h.style.display = k >= 1 ? 'none' : ''; set(h, { sy: 1 - k, r: k * (i % 2 ? 8 : -8) }); });
    set(c2, { o: t > T.nadie - 0.3 ? 1 : 0, s: pop(t, T.nadie - 0.3, 0.35), r: -4 });
    const kf = p(t, T.encontraste, 0.7, E.inOutCubic);
    set(ca, { x: lerp(0, 240, kf), y: lerp(0, 300, kf) - Math.sin(kf * Math.PI) * 300, r: lerp(0, 360, kf) + wobble(t, 0.4, 2), s: lerp(1, 1.25, kf) });
    conFace(ca, t, { jaw: 0, look: t > T.encontraste ? [8, 6] : [-8, -6], feliz: t > T.encontraste ? 1 : -0.6, ceja: t < T.encontraste ? 8 : 0, closed: t > T.nadie && t < T.encontraste, seed: 0.7 });
    set(telar, { o: t > T.nadie - 0.2 && t < T.encontraste ? p(t, T.nadie - 0.2, 0.4) : 0 });
    set(mano, { x: lerp(-400, 0, p(t, T.encontraste + 0.2, 0.4, E.outBack)), y: 1180, r: 180, o: t > T.encontraste + 0.2 ? 1 : 0 });
  };
});

/* L8 · OJO: quedártela = DELITO (esposas que se cierran) → tachado y «¡DEVUÉLVELO!» con la cartera volviendo al dueño */
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const ca = CARTERA(c, 420, 560, 360, 8);
  const esp = ESPOSAS(c, 400, 14);
  const del = box(c, 360, 960, 560, 170, { zIndex: 20, border: `12px solid ${RED}`, color: RED, borderRadius: '18px', fontFamily: 'Rye', fontSize: '110px', lineHeight: '140px', textAlign: 'center', background: 'rgba(255,255,255,.75)', transformOrigin: '50% 50%', boxSizing: 'border-box' }, 'DELITO');
  const tacha = box(c, 340, 1035, 600, 26, { zIndex: 22, background: INK, borderRadius: '13px', transformOrigin: '0 50%' });
  const dev = box(c, 380, 1150, 540, 130, { zIndex: 24, background: VERDE, border: `8px solid ${INK}`, borderRadius: '24px', boxShadow: `8px 8px 0 ${INK}`, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '80px', lineHeight: '114px', textAlign: 'center', transformOrigin: '50% 50%' }, '¡DEVUÉLVELO!');
  sp(T.quedar, 'gulp', 0.5); sp(T.delito - 0.15, 'click', 0.8); sp(T.delito, 'stamp', 0.9); sp(T.premio8, 'scratch', 0.6); sp(T.devuelves8, 'tada', 0.7);
  shakeAt(T.delito, 0.3, 14);
  return t => {
    set(ry, { r: t * 5 });
    const kc = p(t, T.delito - 0.4, 0.3, E.outBack);
    set(ca, { r: wobble(t, 0.6, 3) + (t > T.delito && t < T.premio8 ? Math.sin(t * 25) * 4 : 0), x: lerp(0, 120, p(t, T.devuelves8, 0.5, E.inOutCubic)) });
    conFace(ca, t, { jaw: t > T.delito && t < T.premio8 ? 0.6 : 0, look: [0, -6], feliz: t > T.premio8 ? 1 : (t > T.quedar ? -1 : 0.4), ceja: t > T.quedar && t < T.premio8 ? 12 : 0, seed: 0.1 });
    set(esp, { x: lerp(1100, 380, kc), y: 640, r: lerp(40, -10, kc), o: t > T.delito - 0.4 && t < T.premio8 + 0.2 ? 1 : 0 });
    set(del, { o: t > T.delito ? 1 : 0, s: t < T.delito ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.delito) / 0.25))), r: -6 });
    set(tacha, { o: t > T.premio8 ? 1 : 0, sx: p(t, T.premio8, 0.3), r: -6 });
    set(dev, { o: t > T.devuelves8 - 0.2 ? 1 : 0, s: pop(t, T.devuelves8 - 0.2, 0.4) * (1 + 0.04 * Math.sin(t * 8)), r: 3 });
  };
});

/* L9 · REMATE: medalla «HONRADO» → se le cuelga el precio… en pesetas; lluvia de pesetas */
plano(L(9) - 0.1, L(10) - 0.1, { background: 'linear-gradient(#ffe98a, #fff6cf 60%)' }, c => {
  const ry = rays(c, -160, 300, 1400, 24, 'rgba(255,255,255,.55)', 'rgba(0,0,0,0)', 0);
  const flag = box(c, 120, 560, 300, 200, { zIndex: 5, transformOrigin: '0 50%' }, `<svg viewBox="0 0 300 200" width="300" height="200"><rect width="300" height="200" fill="${RED}" stroke="${INK}" stroke-width="8"/><rect y="50" width="300" height="100" fill="${YEL}"/><rect width="300" height="200" fill="none" stroke="${INK}" stroke-width="8"/></svg>`);
  const med = MEDALLA(c, 380, 10);
  const tag = TAG(c, '2.000 PTAS', 14);
  const lluvia = [...Array(8)].map((_, i) => PESETA(c, 120, 6));
  const cEs = chip(c, 100, 800, 'en España', { size: 56, bg: RED, z: 40 });
  sello(c, 1250, '¡EN PESETAS!', T.pesetas9, { size: 110, r: -6 });
  sp(T.espana, 'swoosh_up', 0.5); sp(T.honrado, 'bell', 0.7); sp(T.premio9, 'tada', 0.6); sp(T.pesetas9 + 0.3, 'cash', 0.6);
  return t => {
    set(ry, { r: t * 6 });
    set(flag, { o: t > T.espana - 0.1 && t < T.honrado ? 1 : 0, sx: p(t, T.espana - 0.1, 0.3) * (1 + 0.04 * Math.sin(t * 6)), r: Math.sin(t * 4) * 3 });
    set(cEs, { o: t > T.espana && t < T.honrado ? 1 : 0, s: pop(t, T.espana, 0.3), r: -3 });
    set(med, { x: 350, y: 470, o: t > T.honrado - 0.2 ? 1 : 0, s: pop(t, T.honrado - 0.2, 0.45), r: Math.sin(t * 2.5) * 6 });
    set(tag, { x: 600, y: 780, o: t > T.premio9 ? 1 : 0, s: pop(t, T.premio9, 0.35), r: Math.sin(t * 3) * 14 });
    lluvia.forEach((m, i) => { const k = ((t - T.pesetas9) * 0.8 + i / 8) % 1; set(m, { x: 60 + i * 105, y: lerp(260, 1350, k), r: t * 160 + i * 40, o: t > T.pesetas9 ? 1 : 0 }); });
  };
});

/* L10 · CTA de seguir */
sigueme(10, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿Devolviste algo', 'y te dieron algo?', { size: 88, draw: c => [['ni las gracias', PINK], ['me dieron 5 €', YEL], ['un café y un abrazo', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(11) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(304, 'La cartera y la ley', ['EL CÓDIGO', 'civil']);

Story.run({
  textura: true,
  ovalo: [[L(3), L(4) - 0.15], [L(8), L(9) - 0.15]],
  vecino: { risa: [[T.pesetas5, T.pesetas5 + 1], [T.pesetas9, T.pesetas9 + 1]], sorpresa: [[T.doce, T.doce + 1], [T.delito, T.delito + 1]], golpes: [T.doce + 0.2] },
});
