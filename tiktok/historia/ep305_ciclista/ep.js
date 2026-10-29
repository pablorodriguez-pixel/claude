/* Ep. 305 · «Para adelantar a un ciclista, ahora hay que FRENAR» — RGC art. 85.4 (RD 518/2026, BOE-A-2026-13889, en vigor 01/10/2026).
   Antes: turismos y motos podían rebasar en 20 km/h el límite para adelantar en vía convencional (suprimido por Ley 18/2021, en vigor 21/03/2022).
   Ahora, fuera de poblado: adelantar a ciclistas al menos 20 km/h POR DEBAJO del límite, con 1,5 m de separación o cambiando de carril entero si hay dos;
   un grupo de ciclistas cuenta como una única unidad. Es una HISTORIA: domingo por la mañana, carretera de 90, un pelotón y tu padre que los pasaba a 110.
   Objetos-metáfora: velocímetro cuya aguja baja, tarjeta +20 que gira a −20, BOE, sello 2022, calendario 1 OCT, cinta métrica de 1,5 m,
   el pelotón envuelto como un solo bloque, pantalla partida padre 110 ✗ / hoy 70 ✓. Tono neutro entre conductores y ciclistas. */
Story.prepara();
const T = {
  adelantar0: Q('para adelantar'), ciclista0: Q('ciclista'), frenar: Q('frenar'),
  hasta: Q('hasta hace nada'), dejaba1: Q('te dejaba'), contrario: Q('lo contrario'), boe: Q('el boe'), cambio: Q('el cambio'), mes: Q('mismo mes'),
  imagina: Q('imagínate'), domingo: Q('domingo'), manana: Q('mañana'), carretera3: Q('carretera de noventa'), noventa3: Q('noventa'), delante: Q('delante de ti'), grupo3: Q('un grupo'), ciclistas3: Q('ciclistas'),
  padre: Q('tu padre'), clarisimo: Q('clarísimo'), pisaba: Q('pisaba'), fondo: Q('a fondo'), pasaba: Q('los pasaba'), c110: Q('ciento diez'),
  legal: Q('era legal'), ley4: Q('la ley'), coches: Q('coches'), motos: Q('motos'), pasarse: Q('pasarse'), v20: Q('veinte'), adel4: Q('para adelantar'),
  y2022: Q('dos mil veintidós'), acabo: Q('se acabó'), oct: Q('uno de octubre'), norma: Q('la norma'), vuelta: Q('la vuelta'),
  fuera: Q('fuera de poblado'), bici6: Q('bici'), minimo: Q('mínimo'), m20: Q('veinte por debajo'), debajo: Q('debajo'), limite: Q('límite'),
  esa: Q('en esa carretera'), n90: Q('noventa'), s70: Q('setenta'), mucho: Q('mucho'),
  dejandole: Q('dejándole'), metro: Q('metro y medio'), dos7: Q('dos carriles'), cambiandote: Q('cambiándote'), entero: Q('entero'), otro: Q('al otro'),
  ojo: Q('ojo'), grupo8: Q('en grupo'), cuenta: Q('los cuenta'), uno: Q('uno solo'), adelantas8: Q('los adelantas'), todos: Q('a todos'), ninguno: Q('ninguno'),
  osea: Q('o sea'), padre9: Q('tu padre'), hoy: Q('hoy'), justo: Q('justo'), no9: Q('no tienes'), hacer9: Q('que hacer'),
};
const ASF = '#6d6a72', AZUL = '#2b6fd6', VERDE = '#2e9e6b', NAR = '#F2983E', RETRO = '#c8742a', HIERBA = '#8fb46a', CRE = '#fbf6ea';
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));

/* ---------- velocímetro (vb -210 -210 420 420): aguja .ag y lectura .num; setV(s, km/h) ---------- */
const pt = (a, r) => [Math.sin(a * Math.PI / 180) * r, -Math.cos(a * Math.PI / 180) * r];
const vAng = v => -120 + clamp(v / 140) * 240;
const arcD = (r, a0, a1) => { const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r); return `M${f1(x0)},${f1(y0)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)}`; };
const SPEEDO = (c, w, z = 20) => { let tk = '';
  for (let v = 0; v <= 140; v += 10) { const a = vAng(v), [x0, y0] = pt(a, 174), [x1, y1] = pt(a, v % 20 ? 158 : 144);
    tk += `<path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${INK}" stroke-width="${v % 20 ? 4 : 8}" stroke-linecap="round"/>`;
    if (v % 20 === 0) { const [lx, ly] = pt(a, 114); tk += `<text x="${f1(lx)}" y="${f1(ly + 12)}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">${v}</text>`; } }
  const d = box(c, 0, 0, w, w, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="-210 -210 420 420" width="${w}" height="${w}" style="overflow:visible">
   <circle cx="12" cy="14" r="202" fill="${SH}"/><circle r="202" fill="#2a2630" stroke="${INK}" stroke-width="10"/><circle r="186" fill="${CRE}"/>
   <path d="${arcD(166, vAng(0), vAng(90))}" stroke="${VERDE}" stroke-width="18" fill="none" opacity=".55"/><path d="${arcD(166, vAng(90), vAng(140))}" stroke="${RED}" stroke-width="18" fill="none"/>
   ${tk}<rect x="-80" y="58" width="160" height="78" rx="14" fill="#1d1a22"/><text class="num" x="0" y="116" text-anchor="middle" font-family="PlexMono" font-weight="700" font-size="60" fill="${YEL}">0</text>
   <text x="0" y="170" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="28" fill="${INK}">km/h</text>
   <g class="ag"><path d="M0,24 L-13,0 L0,-164 L13,0 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g><circle r="22" fill="${INK}"/><circle r="8" fill="${GOLD}"/></svg>`);
  d.ag = d.querySelector('.ag'); d.num = d.querySelector('.num'); return d; };
const setV = (s, v) => { s.ag.setAttribute('transform', `rotate(${f1(vAng(v))})`); s.num.textContent = Math.round(v); };

/* ---------- coche de perfil hacia la derecha (vb 0 0 600 300). padre: bigote + gafas de sol ochenteras; tu: conductor de hoy ---------- */
const CAB_PADRE = `<g class="cab" transform="translate(392,124)"><circle r="28" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/>
  <path d="M-31,-2 C-36,-30 -10,-34 0,-31 C16,-34 36,-28 31,-4 C22,-16 10,-19 0,-17 C-10,-19 -22,-14 -31,-2 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>
  <path d="M-24,-8 h20 q1,13 -10,14 q-11,-1 -10,-14 Z M4,-8 h20 q1,13 -10,14 q-11,-1 -10,-14 Z" fill="#141218" stroke="${INK}" stroke-width="3"/><path d="M-4,-6 h8 M24,-6 h6" stroke="${INK}" stroke-width="3"/>
  <path class="glint" d="M-20,-5 l7,7 M8,-5 l7,7" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <path class="bigote" d="M-15,9 q8,-7 15,-2 q7,-5 15,2 q-7,8 -15,2 q-8,6 -15,-2 Z" fill="#3a2a1e" stroke="${INK}" stroke-width="2"/>
  <path class="boca" d="M-8,17 q8,6 16,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
const CAB_TU = `<g class="cab" transform="translate(392,124)"><circle r="28" fill="#e7b48c" stroke="${INK}" stroke-width="5"/>
  <path d="M-30,-4 C-32,-30 30,-34 30,-6 C20,-18 -18,-20 -30,-4 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="3"/>
  <circle cx="-8" cy="0" r="4" fill="${INK}"/><circle cx="12" cy="0" r="4" fill="${INK}"/><path class="boca" d="M-6,14 q8,4 16,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
const cocheInner = (col, o = {}) => `
  <path d="M30,232 L30,176 Q30,152 62,150 L176,142 L222,84 Q230,72 248,72 L418,72 Q436,72 446,86 L492,142 L556,150 Q588,156 588,184 L588,232 Z" fill="${col}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M196,142 L236,92 L318,92 L318,142 Z M336,142 L336,92 L428,92 L470,142 Z" fill="#bfe3f5"/>
  ${o.padre ? CAB_PADRE : o.tu ? CAB_TU : ''}
  <rect x="186" y="139" width="292" height="15" fill="${col}"/>
  <path d="M196,142 L236,92 L318,92 L318,142 Z M336,142 L336,92 L428,92 L470,142 Z" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  ${o.padre ? `<path d="M40,194 H578" stroke="#f2c230" stroke-width="10"/><path d="M40,206 H578" stroke="${INK}" stroke-width="3"/>` : `<path d="M40,196 H578" stroke="rgba(255,255,255,.6)" stroke-width="6"/>`}
  <path d="M327,150 V228" stroke="${INK}" stroke-width="5"/><path d="M296,170 h22" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <rect x="558" y="160" width="28" height="22" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/>
  <rect class="freno" x="24" y="160" width="20" height="26" rx="5" fill="#7a1010" stroke="${INK}" stroke-width="4"/>
  <rect x="576" y="206" width="24" height="22" rx="6" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/><rect x="14" y="206" width="24" height="22" rx="6" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/>
  ${[150, 470].map((x, i) => `<g class="w${i}"><circle cx="${x}" cy="234" r="48" fill="#24212a" stroke="${INK}" stroke-width="8"/><circle cx="${x}" cy="234" r="24" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/><path d="M${x - 24},234 H${x + 24} M${x},210 V258" stroke="${INK}" stroke-width="5"/></g>`).join('')}`;
const COCHE = (c, w, col, o = {}) => { const d = box(c, 0, 0, w, w / 2, { zIndex: o.z || 10, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 600 300" width="${w}" height="${w / 2}" style="overflow:visible">${cocheInner(col, o)}</svg>`);
  d.ws = [d.querySelector('.w0'), d.querySelector('.w1')]; d.freno = d.querySelector('.freno'); d.glint = d.querySelector('.glint'); d.boca = d.querySelector('.boca'); d.big = d.querySelector('.bigote'); return d; };
const rueda = (d, t, v = 1) => d.ws.forEach((g, i) => g.setAttribute('transform', `rotate(${f1((t * v * 500) % 360)} ${i ? 470 : 150} 234)`));
const frena = (d, on) => d.freno.setAttribute('fill', on ? '#ff3030' : '#7a1010');
/* y de la parte de arriba para que las ruedas pisen en yb */
const pisa = (w, yb) => yb - w / 2 * 282 / 300;

/* ---------- ciclista de perfil hacia la derecha (vb 0 0 300 280); pedalea(d, t) mueve piernas y ruedas ---------- */
const CICL = (c, w, col, z = 9) => { const h = w * 280 / 300, FR = 'M70,214 L132,214 L196,140 L112,140 Z M112,140 L132,214 M196,140 L236,214 M196,140 L202,116';
  const d = box(c, 0, 0, w, h, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 280" width="${w}" height="${f1(h)}" style="overflow:visible">
  ${[70, 236].map((x, i) => `<g class="r${i}"><circle cx="${x}" cy="214" r="56" fill="none" stroke="${INK}" stroke-width="9"/><path d="M${x - 50},214 H${x + 50} M${x},164 V264 M${x - 35},179 L${x + 35},249 M${x + 35},179 L${x - 35},249" stroke="#8a8790" stroke-width="3"/></g>`).join('')}
  <path class="lgB" d="" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path class="lgB2" d="" stroke="#2a2630" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${FR}" stroke="${INK}" stroke-width="13" fill="none" stroke-linejoin="round"/><path d="${FR}" stroke="${col}" stroke-width="6" fill="none" stroke-linejoin="round"/>
  <path d="M90,120 H130" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M200,116 q22,-4 22,18" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M108,116 L176,72" stroke="${INK}" stroke-width="42" stroke-linecap="round"/><path d="M108,116 L176,72" stroke="${col}" stroke-width="31" stroke-linecap="round"/>
  <path d="M176,74 L216,128" stroke="${INK}" stroke-width="19" stroke-linecap="round"/><path d="M176,74 L216,128" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="198" cy="48" r="22" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/><path d="M172,48 C170,16 226,12 226,44 Z" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M182,30 L208,26" stroke="#fff" stroke-width="4"/><circle cx="210" cy="52" r="3.5" fill="${INK}"/>
  <path class="lgF" d="" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path class="lgF2" d="" stroke="#2a2630" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  ['lgB', 'lgB2', 'lgF', 'lgF2', 'r0', 'r1'].forEach(k => d[k] = d.querySelector('.' + k)); return d; };
const pierna = (H, P, L = 64) => { const dx = P[0] - H[0], dy = P[1] - H[1], dd = Math.hypot(dx, dy), m = [(H[0] + P[0]) / 2, (H[1] + P[1]) / 2], h = Math.sqrt(Math.max(0, L * L - dd * dd / 4));
  let nx = -dy / dd, ny = dx / dd; if (nx < 0) { nx = -nx; ny = -ny; } return `M${f1(H[0])},${f1(H[1])} L${f1(m[0] + nx * h)},${f1(m[1] + ny * h)} L${f1(P[0])},${f1(P[1])}`; };
const pedalea = (d, t, v = 1, ph = 0) => { const a = t * 7 * v + ph, H = [110, 116], C = [132, 214];
  const P1 = [C[0] + Math.cos(a) * 24, C[1] + Math.sin(a) * 24], P2 = [C[0] - Math.cos(a) * 24, C[1] - Math.sin(a) * 24];
  const f = pierna(H, P1), b = pierna(H, P2); d.lgF.setAttribute('d', f); d.lgF2.setAttribute('d', f); d.lgB.setAttribute('d', b); d.lgB2.setAttribute('d', b);
  [d.r0, d.r1].forEach((g, i) => g.setAttribute('transform', `rotate(${f1((a * 57) % 360)} ${i ? 236 : 70} 214)`)); };
const pisaB = (w, yb) => yb - w * 280 / 300 * 270 / 280;
const COLS = [NAR, AZUL, PINK, VERDE, YEL, '#8a4fd0'];

/* ---------- señales y papeles ---------- */
const SENAL = (c, n, d = 200, z = 6) => box(c, 0, 0, d, d + 260, { zIndex: z, transformOrigin: '50% 100%' }, `<div style="position:absolute;left:${d / 2 - 11}px;top:${d / 2}px;width:22px;height:${260 + d / 2}px;background:#a9a6ae;border:4px solid ${INK};box-sizing:border-box"></div><div style="position:absolute;left:0;top:0;width:${d}px;height:${d}px;border-radius:50%;background:#fff;border:${f1(d * 0.11)}px solid ${RED};box-shadow:0 0 0 5px ${INK},10px 12px 0 5px ${SH};box-sizing:border-box;text-align:center;font-family:Bricolage;font-weight:800;font-size:${f1(d * 0.44)}px;line-height:${f1(d * 0.76)}px;color:${INK}">${n}</div>`);
const FINPOB = (c, z = 6) => box(c, 0, 0, 380, 520, { zIndex: z, transformOrigin: '50% 100%' }, `<div style="position:absolute;left:60px;top:150px;width:22px;height:370px;background:#a9a6ae;border:4px solid ${INK};box-sizing:border-box"></div><div style="position:absolute;left:298px;top:150px;width:22px;height:370px;background:#a9a6ae;border:4px solid ${INK};box-sizing:border-box"></div>
  <div style="position:absolute;left:0;top:0;width:380px;height:190px;background:#fff;border:8px solid ${INK};border-radius:16px;box-shadow:10px 12px 0 ${SH};box-sizing:border-box;overflow:hidden">
  <div style="position:absolute;left:0;top:44px;width:100%;text-align:center;font-family:Bricolage;font-weight:800;font-size:58px;color:${INK}">VILLARRIBA</div>
  <svg width="380" height="190" style="position:absolute;left:0;top:0"><path d="M10,180 L370,10" stroke="${RED}" stroke-width="26"/></svg></div>`);
const NUMC = (c, txt, col, z = 12) => box(c, 0, 0, 520, 360, { zIndex: z, background: col, border: `10px solid ${INK}`, borderRadius: '44px', boxShadow: `14px 16px 0 ${SH}`, color: '#fff', textAlign: 'center', transformOrigin: '50% 50%', boxSizing: 'border-box' },
  `<div style="font-family:Bricolage;font-weight:800;font-size:220px;line-height:250px;text-shadow:${OUT}">${txt}</div><div style="font-family:Bricolage;font-weight:800;font-size:42px;line-height:40px;color:#fff;text-shadow:3px 3px 0 ${INK}">km/h para adelantar</div>`);
const FLECHA = (c, z = 13) => { const d = box(c, 0, 0, 200, 380, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 200 380" width="200" height="380" style="overflow:visible"><path class="f" d="M100,10 L190,140 L132,140 L132,370 L68,370 L68,140 L10,140 Z" fill="${VERDE}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></svg>`); d.f = d.querySelector('.f'); return d; };
const BOE = (c, z = 20) => box(c, 0, 0, 720, 640, { zIndex: z, background: CRE, border: `8px solid ${INK}`, boxShadow: `14px 16px 0 ${SH}`, padding: '30px 40px', boxSizing: 'border-box', color: INK, transformOrigin: '50% 50%' },
  `<div style="display:flex;align-items:center;gap:22px;border-bottom:5px solid ${INK};padding-bottom:14px"><div style="font-family:Playfair;font-weight:900;font-size:104px;line-height:1">BOE</div><div style="font-family:SpecialElite;font-size:28px;line-height:1.2">BOLETÍN OFICIAL<br>DEL ESTADO</div></div>
  <div style="font-family:Bricolage;font-weight:800;font-size:42px;margin:22px 0 10px">Real Decreto 518/2026</div>
  <div style="font-family:SpecialElite;font-size:31px;line-height:1.45">Art. 85.4 · Adelantamiento a ciclistas fuera de poblado: <b>reducir la velocidad</b> respecto al límite en al menos 20 km/h…</div>
  <div style="margin-top:26px;font-family:Bricolage;font-weight:800;font-size:48px">En vigor: <span class="hl" style="background:linear-gradient(${YEL},${YEL}) no-repeat 0 100% / 0% 70%;padding:0 8px">1 oct 2026</span></div>`);
const CALEN = (c, z = 14) => box(c, 0, 0, 320, 360, { zIndex: z, background: CRE, border: `8px solid ${INK}`, borderRadius: '24px', boxShadow: `12px 14px 0 ${SH}`, overflow: 'hidden', transformOrigin: '50% 0%', boxSizing: 'border-box' },
  `<div style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:54px;text-align:center;line-height:92px;border-bottom:7px solid ${INK}">OCT 2026</div><div style="font-family:Playfair;font-weight:900;font-size:200px;line-height:250px;text-align:center;color:${INK}">1</div>`);
const SELLO = (c, x, y, w, txt, col, z = 30) => box(c, x, y, w, 150, { zIndex: z, border: `12px solid ${col}`, color: col, borderRadius: '20px', fontFamily: 'Rye', fontSize: '92px', lineHeight: '128px', textAlign: 'center', background: 'rgba(255,255,255,.8)', transformOrigin: '50% 50%', boxSizing: 'border-box', whiteSpace: 'nowrap' }, txt);
const FICHA = (c, x, y, w, h, z = 20) => box(c, x, y, w, h, { zIndex: z, background: CRE, border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `12px 14px 0 ${SH}`, transformOrigin: '50% 50%', boxSizing: 'border-box', textAlign: 'center', color: INK });
const MOTO = (c, w, z = 12) => box(c, 0, 0, w, w * 2 / 3, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 200" width="${w}" height="${f1(w * 2 / 3)}" style="overflow:visible">
  <circle cx="62" cy="150" r="42" fill="#24212a" stroke="${INK}" stroke-width="8"/><circle cx="238" cy="150" r="42" fill="#24212a" stroke="${INK}" stroke-width="8"/><circle cx="62" cy="150" r="14" fill="#c9c4b6"/><circle cx="238" cy="150" r="14" fill="#c9c4b6"/>
  <path d="M62,150 L120,104 L196,104 L238,150" stroke="${INK}" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M104,104 Q150,58 206,86 L196,114 L118,114 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/>
  <path d="M200,88 L224,54 L254,58" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M60,104 Q90,92 116,100" stroke="${INK}" stroke-width="12" stroke-linecap="round" fill="none"/></svg>`);
/* vista cenital: coche (vb 0 0 170 300, morro arriba) y bici con ciclista (vb 0 0 90 220) */
const COCHE_TOP = (c, col, z = 12) => figura(c, 0, 0, 170, 300, `<rect x="16" y="18" width="150" height="280" rx="44" fill="${SH}"/><rect x="10" y="10" width="150" height="280" rx="44" fill="${col}" stroke="${INK}" stroke-width="8"/><path d="M28,92 Q85,64 142,92 L134,128 Q85,114 36,128 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/><path d="M36,226 Q85,240 134,226 L140,256 Q85,272 30,256 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/><rect x="40" y="136" width="90" height="84" rx="16" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="5"/><rect x="24" y="14" width="30" height="16" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/><rect x="116" y="14" width="30" height="16" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/>`, '0 0 170 300', { z, origin: '50% 50%' });
const BICI_TOP = (c, col, z = 12) => figura(c, 0, 0, 90, 220, `<rect x="38" y="0" width="14" height="70" rx="7" fill="${INK}"/><rect x="38" y="150" width="14" height="70" rx="7" fill="${INK}"/><path d="M45,40 V180" stroke="${INK}" stroke-width="8"/><path d="M12,60 H78" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><ellipse cx="45" cy="116" rx="40" ry="26" fill="${col}" stroke="${INK}" stroke-width="6"/><circle cx="45" cy="94" r="21" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M45,76 V112" stroke="#fff" stroke-width="4"/>`, '0 0 90 220', { z, origin: '50% 50%' });

/* ---------- carretera de perfil (cielo de mañana, colinas, asfalto con raya que corre) ---------- */
function carretera(cam, o = {}) {
  const y = o.y || 1060;
  box(cam, -500, -700, 2080, y + 700, { zIndex: 0, background: 'linear-gradient(#a9d8f2 0%, #dff0f2 55%, #ffe1aa 100%)' });
  const sol = box(cam, o.solX || 720, o.solY || 420, 210, 210, { zIndex: 1, borderRadius: '50%', background: '#ffd23a', border: `8px solid ${INK}`, boxShadow: '0 0 0 34px rgba(255,210,58,.28), 0 0 0 70px rgba(255,210,58,.14)' });
  const nubes = [0, 1, 2].map(i => box(cam, 0, 0, 260, 90, { zIndex: 1, background: '#fff', border: `6px solid ${INK}`, borderRadius: '60px', opacity: 0.95 }));
  box(cam, -500, y - 250, 2080, 270, { zIndex: 2 }, `<svg width="2080" height="270" viewBox="0 0 2080 270" preserveAspectRatio="none"><path d="M0,270 L0,140 Q220,20 460,120 T940,90 T1420,130 T2080,70 L2080,270 Z" fill="#a8cf86" stroke="${INK}" stroke-width="6"/><path d="M0,270 L0,200 Q280,120 560,200 T1200,180 T2080,170 L2080,270 Z" fill="#86b665" stroke="${INK}" stroke-width="6"/></svg>`);
  box(cam, -500, y, 2080, 250, { zIndex: 3, background: ASF, borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` });
  const lin = box(cam, -500, y + 116, 2080, 14, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 80px, transparent 80px 160px)' });
  box(cam, -500, y + 258, 2080, 1600, { zIndex: 1, background: HIERBA, backgroundImage: 'repeating-linear-gradient(100deg, rgba(43,33,24,.08) 0 6px, transparent 6px 60px)' });
  return { sol, lin, nubes, y };
}
const avanza = (R, t, v = 1) => { R.lin.style.backgroundPosition = `${f1(-(t * 900 * v) % 160)}px 0`; R.nubes.forEach((n, i) => set(n, { x: ((i * 520 - t * 30 * (1 + i * 0.3)) % 1600 + 1600) % 1600 - 300, y: 120 + i * 140 })); };
/* líneas de velocidad */
const VEL = (c, n = 5, z = 8) => [...Array(n)].map(() => box(c, 0, 0, 220, 12, { zIndex: z, background: '#fff', border: `3px solid ${INK}`, borderRadius: '8px' }));
const viento = (ls, t, x, y, on) => ls.forEach((l, i) => { const k = ((t * 3 + i / ls.length) % 1); set(l, { x: x - 60 - k * 360, y: y + i * 34, sx: 1 - k * 0.6, o: on ? 1 - k : 0 }); });

/* ===================== PORTADA + L0 ===================== */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t1 = texto(c, 262, '¿ACELERAR', { size: 130, z: 30 });
  const t2 = texto(c, 398, 'o ' + hlSpan('FRENAR?', 'phl'), { size: 142, italic: true, z: 30 });
  box(c, -40, 1150, 1160, 230, { zIndex: 2, background: ASF, borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` });
  const lin = box(c, -40, 1258, 1160, 14, { zIndex: 3, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 80px, transparent 80px 160px)' });
  const car = COCHE(c, 440, RETRO, { padre: true, z: 10 });
  const bike = CICL(c, 230, NAR, 12);
  const vel = SPEEDO(c, 440, 20);
  const chev = [0, 1, 2].map(i => box(c, 800, 0, 110, 70, { zIndex: 21 }, `<svg viewBox="0 0 110 70" width="110" height="70"><path d="M10,10 L55,55 L100,10" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M10,10 L55,55 L100,10" stroke="${RED}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`));
  sello(c, 1000, '¡FRENA!', T.frenar, { size: 120, r: -6 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.ciclista0, 'ding', 0.5); sp(T.frenar - 0.35, 'scratch', 0.7);
  return t => {
    set(ry, { r: t * 6 });
    set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3) });
    paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const v = lerp(110, 70, p(t, 0.15, T.frenar + 0.1, E.inOutCubic)) + Math.sin(t * 23) * 0.8;
    setV(vel, v); set(vel, { x: 320, y: 545, s: 1 + 0.03 * Math.sin(t * 4), r: wobble(t, 0.4, 1.5) });
    chev.forEach((e, i) => { const k = ((t * 1.6 + i / 3) % 1); set(e, { y: 610 + k * 240, o: Math.sin(k * Math.PI) }); });
    const kb = p(t, 0, T.frenar + 0.3, E.outCubic);
    set(car, { x: lerp(-30, 150, kb), y: pisa(440, 1365) + Math.sin(t * 28) * 1.5, r: t > T.frenar - 0.3 && t < T.frenar + 0.4 ? -1.5 : 0 });
    rueda(car, t, v / 110); frena(car, t > T.frenar - 0.35 && Math.sin(t * 14) > -0.6);
    set(bike, { x: 660 + Math.sin(t * 1.3) * 8, y: pisaB(230, 1365) }); pedalea(bike, t, 1.2);
    lin.style.backgroundPosition = `${f1(-(t * 420 * v / 90) % 160)}px 0`;
  };
}, { sfx: false });

/* ===================== L1 · «+20» que gira a «−20» → el BOE con «1 oct 2026» y sello ESTE MES ===================== */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 300, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const ta = texto(c, 272, 'hasta hace nada…', { size: 84, italic: true, z: 30 });
  const tb = texto(c, 272, 'justo ' + hlSpan('lo contrario', 'chl'), { size: 84, z: 30 });
  const plus = NUMC(cam, '+20', VERDE, 12), minus = NUMC(cam, '−20', RED, 12);
  const fl = FLECHA(cam, 13);
  const boe = BOE(cam, 20); const hl = boe.querySelector('.hl');
  const mes = SELLO(cam, 470, 860, 440, 'ESTE MES', RED, 30);
  sp(T.hasta, 'pop', 0.5); sp(T.contrario - 0.1, 'whoosh', 0.7); sp(T.contrario + 0.25, 'ding', 0.6); sp(T.boe - 0.15, 'paper', 0.8); sp(T.boe + 0.6, 'sparkle', 0.5); sp(T.cambio, 'stamp', 0.9);
  shakeAt(T.cambio, 0.3, 12);
  return t => {
    deriva(cam, t, L(1) - 0.1, L(2) - 0.08, [540, 900, 1.0], [540, 940, 1.06]); set(ry, { r: -t * 5 });
    set(ta, { o: t < T.contrario ? 1 : 0, r: -2 + wobble(t, 0.5, 0.6) }); set(tb, { o: t >= T.contrario && t < T.boe - 0.15 ? 1 : 0, r: 2, s: pop(t, T.contrario, 0.3) }); paint(c.querySelector('.chl'), t, T.contrario + 0.1, 0.35);
    const kf = p(t, T.contrario - 0.05, 0.5, E.inOutCubic), kc = p(t, T.boe - 0.2, 0.5, E.inOutCubic);
    const cx = lerp(150, 440, kc), cy = lerp(450, 950, kc), cs = lerp(1, 0.45, kc) * pop(t, T.hasta - 0.1, 0.4);
    set(plus, { x: cx, y: cy, s: cs, sx: kf < 0.5 ? 1 - kf * 2 : 0.001, r: -3 + wobble(t, 0.5, 1.5), o: kf < 0.5 ? 1 : 0 });
    set(minus, { x: cx, y: cy, s: cs, sx: kf >= 0.5 ? kf * 2 - 1 : 0.001, r: 3 + wobble(t, 0.5, 1.5), o: kf >= 0.5 ? 1 : 0 });
    fl.f.setAttribute('fill', kf < 0.5 ? VERDE : RED);
    set(fl, { x: 700, y: 440 + Math.sin(t * 5) * 14, r: lerp(0, 180, kf), s: pop(t, T.dejaba1 - 0.2, 0.4) * (1 - kc), o: t < T.boe ? 1 : 0 });
    const kb = p(t, T.boe - 0.15, 0.55, E.outCubic);
    set(boe, { x: 180, y: 330, o: t > T.boe - 0.15 ? 1 : 0, s: lerp(0.05, 1, kb), r: lerp(540, -2, kb) + wobble(t, 0.4, 0.6) });
    hl.style.backgroundSize = `${f1(p(t, T.boe + 0.55, 0.6) * 100)}% 70%`;
    set(mes, { o: t > T.cambio ? 1 : 0, s: t < T.cambio ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.cambio) / 0.22))), r: -8 });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* ===================== L3 · domingo por la mañana, carretera de 90 y un pelotón delante ===================== */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1060, solX: 700, solY: 640 });
  const s90 = SENAL(cam, 90, 190, 5);
  const pel = COLS.slice(0, 5).map((col, i) => CICL(cam, 168, col, 9 + (i % 2) * 2));
  const car = COCHE(cam, 380, RETRO, { padre: true, z: 14 });
  const dom = chip(c, 260, 300, 'domingo · 9:00', { size: 66, bg: INK, z: 40 });
  const n90 = chip(c, 300, 420, 'carretera de 90', { size: 56, bg: RED, z: 40 });
  sp(T.domingo, 'bell', 0.5); sp(T.manana, 'morning', 0.5); sp(T.noventa3 - 0.1, 'pop', 0.6); sp(T.delante, 'swoosh_up', 0.5); sp(T.ciclistas3, 'whoosh', 0.6); sp(T.ciclistas3 + 0.4, 'ding', 0.4);
  return t => {
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [540, 760, 1.12], [520, 960, 1.0]);
    avanza(R, t, 0.5);
    set(R.sol, { y: lerp(330, -60, p(t, T.imagina, T.carretera3 - T.imagina + 0.5, E.outCubic)), s: 1 + 0.04 * Math.sin(t * 3), r: t * 20 });
    vis(dom, t, T.domingo - 0.1, 99, { r: -3 }); vis(n90, t, T.noventa3 - 0.1, 99, { r: 2 });
    const k9 = p(t, T.noventa3 - 0.25, 0.45, E.outBack);
    set(s90, { x: 780 - (t - T.noventa3) * 26, y: 1062 - 450, sy: k9, o: t > T.noventa3 - 0.25 ? 1 : 0, r: Math.sin(t * 2) * 1.5 });
    pel.forEach((b, i) => { const kp = p(t, T.grupo3 - 0.6 + i * 0.12, 1.2, E.outCubic), row = i % 2;
      set(b, { x: lerp(1300 + i * 120, 400 + i * 88, kp) + Math.sin(t * 1.7 + i) * 6, y: pisaB(168, row ? 1240 : 1290) }); pedalea(b, t, 1, i * 1.3); });
    const kc = p(t, T.delante - 0.3, 0.9, E.outCubic);
    set(car, { x: lerp(-520, -40, kc), y: pisa(380, 1295) + Math.sin(t * 26) * 1.2, o: t > T.delante - 0.3 ? 1 : 0 }); rueda(car, t, 0.6);
  };
});

/* ===================== L4a · «Tu padre lo tenía clarísimo» (primer plano: bigote y gafas de los 80) ===================== */
plano(L(4) - 0.1, T.pisaba - 0.05, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1180, solX: 120, solY: 330 });
  const car = COCHE(cam, 1100, RETRO, { padre: true, z: 10 });
  const tag = chip(c, 520, 950, 'tu padre', { size: 76, bg: PINK, z: 40 });
  const tc = texto(c, 285, 'lo tenía ' + hlSpan('clarísimo', 'kl'), { size: 84, z: 40 });
  const est = [[780, 700], [940, 820]].map(([x, y], i) => { const e = ESTRELLA(cam, 90, i ? YEL : '#fff'); set(e, { x, y }); return e; });
  sp(T.padre, 'pop', 0.6); sp(T.clarisimo, 'sparkle', 0.7);
  return t => {
    zoom(cam, t, L(4) - 0.1, T.pisaba - L(4), 0.07); avanza(R, t, 0.4);
    set(car, { x: -110, y: pisa(1100, 1440) + Math.sin(t * 30) * 2.5, r: Math.sin(t * 2) * 0.4 }); rueda(car, t, 0.4);
    vis(tag, t, T.padre - 0.05, 99, { r: -4 });
    set(tc, { o: t > T.clarisimo - 0.25 ? 1 : 0, r: -2 }); paint(c.querySelector('.kl'), t, T.clarisimo, 0.35);
    car.glint.style.opacity = t > T.clarisimo - 0.1 && t < T.clarisimo + 0.5 ? 1 : 0.15;
    car.big.setAttribute('transform', `scale(${f1(1 + 0.12 * Math.abs(Math.sin(t * 9)))} 1)`);
    est.forEach((e, i) => set(e, { x: [700, 860][i], y: [760, 880][i], s: t > T.clarisimo ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)) : 0, r: t * 120 }));
  };
});

/* ===================== L4b · pisa a fondo y pasa al pelotón a 110 ===================== */
plano(T.pisaba - 0.05, T.legal - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1000, solX: 820, solY: 300 });
  const s90 = SENAL(cam, 90, 150, 5);
  const pel = COLS.slice(0, 5).map((col, i) => CICL(cam, 150, col, 9));
  const car = COCHE(cam, 420, RETRO, { padre: true, z: 7 });
  const vl = VEL(cam, 5, 6);
  const vel = SPEEDO(c, 300, 30);
  const f = chip(c, 70, 300, '¡a fondo!', { size: 64, bg: RED, z: 40 });
  const humo = [0, 1, 2].map(() => box(cam, 0, 0, 70, 70, { zIndex: 6, borderRadius: '50%', background: '#d9d4cc', border: `5px solid ${INK}` }));
  sp(T.pisaba, 'swoosh_up', 0.8); sp(T.pasaba, 'whoosh', 0.9); sp(T.c110, 'ding', 0.7); shakeAt(T.fondo, 0.4, 10);
  return t => {
    deriva(cam, t, T.pisaba - 0.05, T.legal - 0.1, [540, 960, 1.04], [560, 960, 1.0]);
    avanza(R, t, 1.4);
    set(s90, { x: 200 - (t - T.pisaba) * 200, y: 1002 - 410 });
    pel.forEach((b, i) => { set(b, { x: 360 + i * 84 + Math.sin(t * 2 + i) * 5, y: pisaB(150, i % 2 ? 1210 : 1240) }); pedalea(b, t, 1, i); });
    const kc = p(t, T.pisaba, T.c110 + 0.6 - T.pisaba, E.inCubic), cx = lerp(-460, 1180, kc);
    set(car, { x: cx, y: pisa(420, 1122) + Math.sin(t * 40) * 2, r: -1.5 }); rueda(car, t, 3);
    viento(vl, t, cx, 880, t > T.pisaba && kc < 1);
    humo.forEach((h, i) => { const k = ((t * 2 + i / 3) % 1); set(h, { x: cx - 40 - k * 200, y: 1060 - k * 60, s: 0.4 + k, o: kc < 1 && t > T.pisaba ? 1 - k : 0 }); });
    const v = lerp(90, 110, p(t, T.pisaba, T.c110 + 0.3 - T.pisaba, E.inOutCubic)) + Math.sin(t * 30) * 0.6;
    setV(vel, v); set(vel, { x: 620, y: 290, s: pop(t, T.pisaba - 0.05, 0.35) * (t > T.c110 ? 1 + 0.06 * Math.abs(Math.sin((t - T.c110) * 8)) : 1) });
    vis(f, t, T.fondo - 0.1, 99, { r: -5 });
  };
});

/* ===================== L4c · «y era legal»: velocímetro 110, señal 90, sello +20 LEGAL, coches y motos, 90 + 20 = 110 ===================== */
plano(T.legal - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 300, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const tl = texto(c, 272, 'y era ' + hlSpan('LEGAL', 'lgl', '#9fe0b8'), { size: 96, z: 30 });
  const vel = SPEEDO(cam, 380, 10);
  const s90 = SENAL(cam, 90, 230, 8);
  const leg = SELLO(cam, 250, 900, 580, '+20 LEGAL', VERDE, 30);
  const coche = COCHE(cam, 330, '#e8507a', { z: 12 }), moto = MOTO(cam, 250, 12);
  const calc = FICHA(cam, 120, 470, 800, 380, 25);
  calc.innerHTML = `<div style="font-family:SpecialElite;font-size:40px;margin-top:26px">para adelantar (hasta 2022)</div><div style="font-family:Bricolage;font-weight:800;font-size:126px;line-height:170px;margin-top:10px;white-space:nowrap">90 <span style="color:${VERDE}">+ 20</span> = <span style="color:${RED}">110</span></div><div style="font-family:Bricolage;font-weight:800;font-size:46px;color:${VERDE}">permitido</div>`;
  sp(T.legal, 'stamp', 0.9); sp(T.ley4, 'paper', 0.5); sp(T.coches, 'pop', 0.6); sp(T.motos, 'pop2', 0.6); sp(T.v20 - 0.1, 'whoosh', 0.6); sp(T.v20 + 0.4, 'ding', 0.6);
  shakeAt(T.legal, 0.3, 12);
  return t => {
    deriva(cam, t, T.legal - 0.1, L(5) - 0.1, [540, 900, 1.0], [540, 940, 1.06]); set(ry, { r: t * 5 });
    set(tl, { r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.lgl'), t, T.legal + 0.1, 0.35);
    setV(vel, 110 + Math.sin(t * 25) * 0.7); set(vel, { x: 70, y: 480, r: wobble(t, 0.4, 2), s: pop(t, T.legal - 0.1, 0.35) });
    set(s90, { x: 640, y: 450, r: Math.sin(t * 2.2) * 2, sy: pop(t, T.legal - 0.05, 0.4) });
    set(leg, { o: t > T.legal ? 1 : 0, s: t < T.legal ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.legal) / 0.22))), r: -5 });
    set(coche, { x: 120, y: 1080 + Math.sin(t * 5) * 6, s: pop(t, T.coches - 0.05, 0.35), o: t > T.coches - 0.05 ? 1 : 0 }); rueda(coche, t, 0.6);
    set(moto, { x: 560, y: 1070 + Math.sin(t * 5 + 1) * 6, s: pop(t, T.motos - 0.05, 0.35), o: t > T.motos - 0.05 ? 1 : 0, r: wobble(t, 0.6, 3) });
    const kk = p(t, T.v20 - 0.15, 0.45, E.outBack); set(calc, { o: t > T.v20 - 0.15 ? 1 : 0, s: kk, r: -2 + wobble(t, 0.4, 0.8) });
  };
});

/* ===================== L5 · 2022: se acabó el +20 → 1 OCT 2026: la flecha da la vuelta y +20 pasa a −20 ===================== */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 300, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  sello(c, 280, '2022', T.y2022, { size: 130, r: -5 });
  const plus = NUMC(cam, '+20', VERDE, 12), minus = NUMC(cam, '−20', RED, 12);
  const tacha = box(cam, 90, 620, 600, 30, { zIndex: 16, background: RED, border: `5px solid ${INK}`, borderRadius: '15px', transformOrigin: '0 50%' });
  const acabo = chip(c, 140, 850, 'se acabó', { size: 64, bg: INK, z: 40 });
  const fl = FLECHA(cam, 13);
  const cal = CALEN(cam, 14);
  const dv = chip(c, 380, 1210, 'la norma, del revés', { size: 56, bg: RED, z: 40 });
  sp(T.acabo, 'scratch', 0.8); sp(T.oct - 0.1, 'paper', 0.7); sp(T.oct + 0.3, 'thud', 0.6); sp(T.vuelta - 0.1, 'whoosh', 0.8); sp(T.vuelta + 0.4, 'tada', 0.6);
  shakeAt(T.vuelta + 0.4, 0.35, 14);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 900, 1.0], [540, 920, 1.05]); set(ry, { r: t * 5 });
    const kf = p(t, T.vuelta - 0.05, 0.6, E.inOutCubic), w = wobble(t, 0.5, 1.5);
    set(plus, { x: 120, y: 450, sx: kf < 0.5 ? 1 - kf * 2 : 0.001, r: -3 + w, o: kf < 0.5 ? 1 : 0, s: t > T.acabo && t < T.acabo + 0.3 ? 1 + Math.sin(t * 40) * 0.03 : 1 });
    set(minus, { x: 120, y: 450, sx: kf >= 0.5 ? kf * 2 - 1 : 0.001, r: 3 + w, o: kf >= 0.5 ? 1 : 0, s: kf >= 1 ? 1 + 0.04 * Math.sin(t * 6) : 1 });
    set(tacha, { sx: p(t, T.acabo - 0.05, 0.3), r: -14, o: t > T.acabo - 0.05 && kf < 0.5 ? 1 : 0 });
    vis(acabo, t, T.acabo, T.vuelta - 0.1, { r: -4 });
    fl.f.setAttribute('fill', kf < 0.5 ? VERDE : RED);
    set(fl, { x: 720, y: 420 + Math.sin(t * 5) * 12, r: lerp(0, 180, kf), s: 0.9 });
    const kc = p(t, T.oct - 0.15, 0.6, E.outBack);
    set(cal, { x: 600, y: 830, o: t > T.oct - 0.15 ? 1 : 0, sy: kc, r: lerp(-30, 4, kc) + wobble(t, 0.5, 1) });
    vis(dv, t, T.vuelta + 0.3, 99, { r: 3 });
  };
});

/* ===================== L6 · fuera de poblado: −20 por debajo del límite → 90 − 20 = 70 máx. (aguja a 70) ===================== */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1060, solX: 120, solY: 160 });
  const casas = [0, 1, 2].map(i => box(cam, 0, 0, 260, 230, { zIndex: 2, transformOrigin: '50% 100%' }, CASA(260, 230, ['#b5523a', '#c87a3a', '#a8452e'][i])));
  const fp = FINPOB(cam, 5);
  const fpc = chip(c, 560, 300, 'fuera de poblado', { size: 56, bg: INK, z: 40 });
  const yo = COCHE(cam, 380, AZUL, { tu: true, z: 12 });
  const bike = CICL(cam, 190, NAR, 13);
  const m20 = texto(c, 280, '−20', { size: 250, color: RED, z: 40, shadow: OUT, weight: 900 });
  m20.style.fontFamily = 'Bricolage'; m20.style.fontWeight = 800;
  const m20b = texto(c, 545, 'por debajo del ' + hlSpan('límite', 'lim'), { size: 60, z: 40 });
  const calc = FICHA(c, 90, 290, 900, 300, 45);
  calc.innerHTML = `<div style="font-family:Bricolage;font-weight:800;font-size:150px;line-height:200px;margin-top:20px"><span class="a">90</span> <span class="b" style="color:${RED}">− 20</span> <span class="c">= <span style="color:${VERDE}">70</span></span></div>`;
  const [ca, cb, cc] = ['.a', '.b', '.c'].map(k => calc.querySelector(k));
  const max = chip(c, 640, 560, 'máx.', { size: 70, bg: VERDE, z: 50 });
  const vel = SPEEDO(c, 300, 30);
  sp(T.fuera, 'pop', 0.6); sp(T.bici6, 'ding', 0.4); sp(T.m20 - 0.3, 'swoosh_up', 0.7); sp(T.m20, 'stamp', 0.9); sp(T.esa, 'whoosh', 0.6); sp(T.n90, 'pop', 0.5); sp(T.s70, 'ding', 0.8); sp(T.mucho, 'pop2', 0.6);
  shakeAt(T.m20, 0.35, 14);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 960, 1.04], [540, 990, 1.0]);
    const v = t < T.esa ? 88 : lerp(90, 70, p(t, T.s70 - 0.4, 0.8, E.inOutCubic));
    avanza(R, t, 0.5 * v / 90);
    const sx = (t - L(6)) * 120;
    casas.forEach((h, i) => set(h, { x: -60 + i * 250 - sx, y: 1062 - 230 }));
    set(fp, { x: 640 - sx * 0.9 - p(t, T.m20 - 0.6, 0.5, E.inCubic) * 700, y: 1062 - 520, sy: pop(t, T.fuera - 0.25, 0.4), o: t > T.fuera - 0.25 && t < T.m20 - 0.1 ? 1 : 0 });
    vis(fpc, t, T.fuera, T.m20 - 0.35, { r: 3 });
    set(yo, { x: 60 + Math.sin(t * 0.8) * 10, y: pisa(380, 1300) + Math.sin(t * 26) * 1.2 }); rueda(yo, t, v / 110); frena(yo, t > T.m20 - 0.3 && t < T.m20 + 0.6 || (t > T.s70 - 0.3 && t < T.s70 + 0.6));
    const kb = p(t, T.bici6 - 0.6, 0.8, E.outCubic);
    set(bike, { x: lerp(1200, 620, kb), y: pisaB(190, 1300), o: t > T.bici6 - 0.6 ? 1 : 0 }); pedalea(bike, t, 1);
    const on20 = t > T.m20 - 0.3 && t < T.esa - 0.05;
    set(m20, { o: on20 ? 1 : 0, s: t < T.m20 - 0.3 ? 0 : lerp(2.2, 1, E.outCubic(clamp((t - T.m20 + 0.3) / 0.25))) * (1 + 0.03 * Math.sin(t * 7)), r: -3 });
    set(m20b, { o: t > T.debajo - 0.1 && t < T.esa - 0.05 ? 1 : 0, s: pop(t, T.debajo - 0.1, 0.3) }); paint(c.querySelector('.lim'), t, T.limite, 0.35);
    set(calc, { o: t > T.esa - 0.1 ? 1 : 0, s: pop(t, T.esa - 0.1, 0.4), r: -1.5 + wobble(t, 0.4, 0.6) });
    set(ca, { o: t > T.n90 - 0.1 ? 1 : 0.15 }); set(cb, { o: 1 }); set(cc, { o: t > T.s70 - 0.1 ? 1 : 0, s: pop(t, T.s70 - 0.1, 0.35) });
    vis(max, t, T.mucho - 0.1, 99, { r: -6 });
    setV(vel, v + Math.sin(t * 25) * 0.5); set(vel, { x: 620, y: 650, o: t > T.esa - 0.1 ? 1 : 0, s: pop(t, T.esa, 0.35) });
  };
});

/* ===================== L7 · vista cenital: 1,5 m de cinta métrica → con dos carriles, al otro entero ===================== */
plano(L(7) - 0.1, L(8) - 0.1, { background: HIERBA }, c => {
  const cam = CAM(c);
  box(cam, -400, -600, 1880, 3200, { zIndex: 0, background: HIERBA, backgroundImage: 'repeating-linear-gradient(10deg, rgba(43,33,24,.07) 0 8px, transparent 8px 70px)' });
  const mk = dos => { const r = box(cam, 0, 0, 1080, 1920, { zIndex: 1 });
    box(r, 200, -600, 680, 3200, { background: ASF, borderLeft: `10px solid ${INK}`, borderRight: `10px solid ${INK}` });
    [222, 846].forEach(x => box(r, x, -600, 12, 3200, { background: '#f4efe2' }));
    r.mid = box(r, 534, -600, 12, 3200, { backgroundImage: `repeating-linear-gradient(0deg, ${dos ? '#f4efe2' : '#f4efe2'} 0 90px, transparent 90px 180px)` });
    if (dos) r.fl = [370, 700].map(x => box(r, x - 40, 0, 80, 160, {}, `<svg viewBox="0 0 80 160" width="80" height="160"><path d="M40,0 L78,60 L54,60 L54,160 L26,160 L26,60 L2,60 Z" fill="#f4efe2" stroke="${INK}" stroke-width="3"/></svg>`));
    return r; };
  const A = mk(false), B = mk(true);
  const bike = BICI_TOP(cam, NAR, 12), car = COCHE_TOP(cam, AZUL, 14);
  const cinta = box(cam, 0, 0, 10, 70, { zIndex: 16, background: YEL, border: `5px solid ${INK}`, borderRadius: '8px', backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 3px, transparent 3px 20px)`, backgroundSize: '100% 40%', backgroundRepeat: 'repeat-x', boxSizing: 'border-box', transformOrigin: '0 50%' });
  const etq = box(cam, 0, 0, 180, 80, { zIndex: 18, background: '#fff', border: `6px solid ${INK}`, borderRadius: '20px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '52px', lineHeight: '68px', textAlign: 'center', color: INK, boxShadow: `6px 6px 0 ${INK}`, transformOrigin: '50% 50%' }, '1,5 m');
  const c1 = chip(c, 70, 300, 'deja 1,5 m', { size: 64, bg: INK, z: 40 });
  const c2 = chip(c, 70, 420, 'o al otro carril, entero', { size: 60, bg: RED, z: 40 });
  const dc = chip(c, 560, 300, '2 carriles', { size: 56, bg: AZUL, z: 40 });
  const tx = (t0, t1, a, b, t, e = E.inOutCubic) => lerp(a, b, p(t, t0, t1 - t0, e));
  sp(T.dejandole, 'whoosh', 0.6); sp(T.metro, 'click', 0.7); sp(T.metro + 0.25, 'ding', 0.6); sp(T.dos7 - 0.35, 'swoosh_up', 0.6); sp(T.cambiandote, 'whoosh', 0.7); sp(T.entero, 'tada', 0.6);
  return t => {
    zoom(cam, t, L(7) - 0.1, L(8) - L(7), 0.04);
    const kB = p(t, T.dos7 - 0.35, 0.35, E.inOutCubic), seg = t < T.dos7 - 0.2;
    set(A, { o: 1 - kB }); set(B, { o: kB });
    [A, B].forEach(r => { r.mid.style.backgroundPosition = `0 ${f1((t * 700) % 180)}px`; if (r.fl) r.fl.forEach(f => set(f, { y: ((t * 700) % 900) - 200 })); });
    set(bike, { x: 760, y: 760 + Math.sin(t * 3) * 6, r: Math.sin(t * 4) * 2 });
    let cx, cy;
    if (seg) { cx = tx(T.dejandole - 0.1, T.metro - 0.15, 690, 520, t); cy = tx(L(7) - 0.1, T.metro - 0.1, 1250, 760, t, E.outCubic); }
    else { cx = tx(T.cambiandote - 0.2, T.entero, 690, 370, t); cy = tx(T.dos7 - 0.2, T.cambiandote, 1350, 1150, t, E.outCubic) - p(t, T.entero, 1.2, E.inOutCubic) * 700; }
    set(car, { x: cx - 85, y: cy - 150, r: seg ? (t > T.dejandole - 0.1 && t < T.metro - 0.15 ? -8 : 0) : (t > T.cambiandote - 0.2 && t < T.entero ? -10 : 0) });
    const xL = cx + 85, xR = 766, on = seg && t > T.metro - 0.15 && t < T.dos7 - 0.35;
    set(cinta, { x: xL, y: 760 + 75, sx: on ? p(t, T.metro - 0.15, 0.35) * (xR - xL) / 10 : 0, o: on ? 1 : 0 });
    set(etq, { x: (xL + xR) / 2 - 90, y: 900, o: on ? 1 : 0, s: pop(t, T.metro, 0.35) });
    vis(c1, t, T.metro, 99, { r: -3 }); vis(c2, t, T.cambiandote, 99, { r: 2 }); vis(dc, t, T.dos7 - 0.1, 99, { r: 4 });
  };
});

/* ===================== L8 · OJO: el pelotón entero = 1 solo vehículo; ¿a todos o a ninguno? ===================== */
plano(L(8) - 0.1, L(9) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 880, solX: 860, solY: 140 });
  sello(c, 280, '¡OJO!', T.ojo, { size: 120, r: -6 });
  const pel = COLS.map((col, i) => CICL(cam, 150, col, 9 + (i % 2)));
  const cuerda = box(cam, 320, 830, 620, 300, { zIndex: 12, border: `12px dashed ${RED}`, borderRadius: '50px', background: 'rgba(255,255,255,.18)', boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const uno = box(cam, 300, 690, 660, 110, { zIndex: 20, background: RED, border: `8px solid ${INK}`, borderRadius: '60px', boxShadow: `8px 8px 0 ${INK}`, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '62px', lineHeight: '94px', textAlign: 'center', transformOrigin: '50% 50%', whiteSpace: 'nowrap' }, '= 1 solo vehículo');
  const car = COCHE(cam, 330, AZUL, { tu: true, z: 8 });
  const fant = [0, 1, 2].map(() => { const g = COCHE(cam, 330, AZUL, { z: 7 }); g.style.opacity = 0.3; return g; });
  const q = texto(c, 470, '¿a ' + hlSpan('todos', 'qa', '#9fe0b8') + ' o a ' + hlSpan('ninguno', 'qn', '#ffb3b3') + '?', { size: 84, z: 40 });
  sp(T.grupo8, 'whoosh', 0.5); sp(T.cuenta, 'cloth_whoosh', 0.7); sp(T.uno, 'stamp', 0.8); sp(T.adelantas8, 'swoosh_up', 0.5); sp(T.todos, 'whoosh', 0.8); sp(T.ninguno - 0.3, 'boing', 0.6);
  shakeAt(T.uno, 0.3, 12);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [560, 960, 1.04], [580, 960, 0.96]);
    avanza(R, t, 0.5);
    const kg = p(t, T.grupo8 - 0.2, 0.8, E.inOutCubic);
    pel.forEach((b, i) => { const row = i % 2, sx0 = 180 + i * 150, sx1 = 350 + Math.floor(i / 2) * 170 + row * 70;
      set(b, { x: lerp(sx0, sx1, kg) + Math.sin(t * 1.6 + i) * 5, y: pisaB(150, row ? 1060 : 1100) }); pedalea(b, t, 1, i * 1.1); });
    const kw = p(t, T.cuenta - 0.1, 0.45, E.outBack);
    set(cuerda, { o: t > T.cuenta - 0.1 ? 1 : 0, s: lerp(1.6, 1, clamp(kw)) * (1 + 0.015 * Math.sin(t * 6)), r: wobble(t, 0.4, 0.6) });
    set(uno, { o: t > T.uno - 0.05 ? 1 : 0, s: t < T.uno - 0.05 ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.uno + 0.05) / 0.22))), r: -3 });
    const ke = p(t, T.adelantas8 - 0.3, 0.5, E.outCubic), kt = p(t, T.todos, 1.0, E.inOutCubic), kn = p(t, T.ninguno - 0.35, 0.5, E.inOutCubic);
    const cx = t < T.ninguno - 0.35 ? lerp(-520, -60, ke) + kt * 1060 : lerp(1000, -60, kn);
    const far = t > T.todos - 0.1 && t < T.ninguno + 0.2;
    set(car, { x: cx, y: pisa(330, far ? 985 : 1110), o: t > T.adelantas8 - 0.3 ? 1 : 0, r: far ? -1 : 0 }); rueda(car, t, kt > 0 && kt < 1 ? 2 : 0.6);
    fant.forEach((g, i) => set(g, { x: cx - (i + 1) * 120, y: pisa(330, 985), o: (kt > 0.05 && kt < 0.95) || (kn > 0.05 && kn < 0.95) ? 0.25 - i * 0.07 : 0 }));
    set(q, { o: t > T.todos - 0.3 ? 1 : 0, s: pop(t, T.todos - 0.3, 0.35), r: -2 + wobble(t, 0.5, 0.5) });
    paint(c.querySelector('.qa'), t, T.todos, 0.3); paint(c.querySelector('.qn'), t, T.ninguno, 0.3);
  };
});

/* ===================== L9 · O SEA: pantalla partida — tu padre 110 ✗ / hoy 70 ✓ ===================== */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const L_ = box(c, 0, 0, 540, 1920, { zIndex: 1, background: '#f2d3c4' }), R_ = box(c, 540, 0, 540, 1920, { zIndex: 1, background: '#d3ead8' });
  box(c, 530, 260, 20, 1100, { zIndex: 3, background: INK, borderRadius: '10px' });
  const hp = texto(c, 280, 'tu padre', { size: 76, x: 20, w: 500, z: 20 }), hh = texto(c, 280, 'hoy', { size: 86, x: 560, w: 380, z: 20 });
  const v1 = SPEEDO(c, 360, 10), v2 = SPEEDO(c, 330, 10);
  const c1 = COCHE(c, 420, RETRO, { padre: true, z: 12 }), c2 = COCHE(c, 340, AZUL, { tu: true, z: 12 });
  const n1 = texto(c, 1090, '110', { size: 150, x: 20, w: 500, color: RED, z: 20, shadow: `5px 5px 0 ${INK}` }), n2 = texto(c, 1090, '70', { size: 150, x: 560, w: 220, color: VERDE, z: 20, shadow: `5px 5px 0 ${INK}` });
  const X = box(c, 60, 470, 420, 420, { zIndex: 30, transformOrigin: '50% 50%' }, XSVG), OK = box(c, 740, 1095, 170, 170, { zIndex: 30, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="170" height="170" style="overflow:visible"><circle cx="50" cy="50" r="46" fill="#fff" stroke="${INK}" stroke-width="7"/><path d="M24,52 L42,70 L76,30" stroke="${VERDE}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`);
  sp(T.osea, 'pop', 0.5); sp(T.padre9, 'swoosh_up', 0.6); sp(T.hoy, 'ding', 0.7); sp(T.no9, 'stamp', 0.9); sp(T.hacer9 + 0.1, 'tada', 0.5);
  shakeAt(T.no9, 0.35, 16);
  return t => {
    set(L_, { o: 1 }); set(R_, { o: 1 });
    const k1 = p(t, T.padre9 - 0.15, 0.45, E.outBack), k2 = p(t, T.hoy - 0.15, 0.45, E.outBack);
    set(hp, { o: t > T.padre9 - 0.15 ? 1 : 0, s: k1, r: -3 }); set(hh, { o: t > T.hoy - 0.15 ? 1 : 0, s: k2, r: 3 });
    setV(v1, lerp(60, 110, p(t, T.padre9, 0.7, E.outCubic)) + Math.sin(t * 25) * 0.8); set(v1, { x: 90, y: 420, s: k1, o: t > T.padre9 - 0.15 ? 1 : 0 });
    setV(v2, lerp(110, 70, p(t, T.hoy, 0.7, E.outCubic))); set(v2, { x: 590, y: 430, s: k2, o: t > T.hoy - 0.15 ? 1 : 0 });
    set(c1, { x: 60 + Math.sin(t * 30) * 2, y: pisa(420, 1040), s: k1, o: t > T.padre9 - 0.15 ? 1 : 0 }); rueda(c1, t, 2.5); c1.glint.style.opacity = Math.sin(t * 4) > 0.6 ? 1 : 0.2;
    set(c2, { x: 580, y: pisa(340, 1040) + Math.sin(t * 20) * 1, s: k2, o: t > T.hoy - 0.15 ? 1 : 0 }); rueda(c2, t, 1);
    set(n1, { o: t > T.padre9 + 0.2 ? 1 : 0, s: pop(t, T.padre9 + 0.2, 0.3), r: -4 }); set(n2, { o: t > T.hoy + 0.2 ? 1 : 0, s: pop(t, T.hoy + 0.2, 0.3), r: 4 });
    set(X, { o: t > T.no9 ? 1 : 0, s: t < T.no9 ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.no9) / 0.22))), r: -6 });
    set(OK, { o: t > T.no9 + 0.15 ? 1 : 0, s: pop(t, T.no9 + 0.15, 0.4) * (1 + 0.05 * Math.sin(t * 7)) });
  };
});

/* L10 · CTA de seguir */
sigueme(10, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿A cuánto adelantas', 'tú a una bici?', { size: 86, draw: c => [['a 70, lo juro', YEL], ['¿a cuánto?', PINK], ['yo voy en bici', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 230 + i * 40, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(11) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(305, 'Adelantar a un ciclista', ['CARRETERAS', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[L(1) + 0.3, L(2) - 0.15], [L(5), L(6) - 0.15]],
  vecino: { risa: [[T.acabo, T.acabo + 0.9]], sorpresa: [[T.contrario, T.contrario + 1]], golpes: [T.vuelta + 0.4] },
});
