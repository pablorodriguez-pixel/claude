/* Ep. 64 · El kétchup se vendía en la farmacia — edición estilo ep04 Napoleón (objetos-metáfora, cambio cada 1–2 s, personajes que actúan, cero emojis) */
Story.prepara();
const T = {
  farmacia0: Q('en la farmacia'),
  medicina1: Q('como medicina'), final1: Q('el final de esta historia'), nevera1: Q('tu nevera'),
  china: Q('en china'), salsa: Q('era una salsa'), pescado: Q('de pescado'), ferm: Q('fermentado'), sinTom: Q('sin un solo tomate'),
  marineros: Q('marineros ingleses'), copian: Q('la copian'), pillan: Q('lo que pillan'), champi: Q('champiñones'), nueces: Q('nueces'), anchoas: Q('anchoas'),
  m1834: Q('mil ochocientos treinta y cuatro'), medico: Q('un médico americano'), tomate4: Q('el tomate'), cura: Q('lo cura todo'),
  diarrea: Q('la diarrea'), indig: Q('la indigestión'), colera: Q('hasta el cólera'), receta: Q('y receta'), ket5: Q('kétchup'),
  huele: Q('huele el negocio'), pastillas: Q('pastillas de tomate'), churros: Q('como churros'),
  copias: Q('salen copias'), partes: Q('por todas partes'), vez: Q('en vez de tomate'), laxante: Q('laxante'),
  m1850: Q('mil ochocientos cincuenta'), muere: Q('la moda muere'), cocina: Q('vuelve a la cocina'), quedarse: Q('para quedarse'),
  nevera10: Q('lo de tu nevera'), heinz: Q('heinz'), noSale: Q('si no sale'), golpe: Q('un golpecito'), n57: Q('cincuenta y siete'), cuello: Q('del cuello'),
  ojo: Q('ojo'), fechas: Q('las fechas'), fuente: Q('según la fuente'),
  patatas: Q('las patatas'), medicina12: Q('como medicina'),
};
const ROJO = '#c8102e', VERDE = '#2e7a4a', CREMA = '#FBF6EA';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
/* ---------- figuras ---------- */
/* cara de la botella (en la etiqueta): botFace(b, t, { jaw, look, closed, ceja, feliz }) */
const CARAB = `<g class="bc"><path d="M58,314 q16,-10 32,0 M110,314 q16,-10 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="be"><ellipse cx="76" cy="336" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="124" cy="336" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="bp"><circle cx="78" cy="339" r="7" fill="${INK}"/><circle cx="126" cy="339" r="7" fill="${INK}"/></g><path class="bm" d="" fill="#7a1020" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
const botFace = (b, t, o = {}) => {
  const q = s => b.querySelector(s); if (!q('.bm')) return;
  const j = o.jaw || 0, f = o.feliz ? 10 : 0;
  q('.bm').setAttribute('d', `M82,362 Q100,${f1(366 + f + j * 22)} 118,362 Q100,${f1(364 + j * 6)} 82,362 Z`);
  q('.bp').setAttribute('transform', `translate(${f1((o.look || [0, 0])[0])} ${f1((o.look || [0, 0])[1])})`);
  const cl = o.closed || (t % 2.9) < 0.12; q('.be').setAttribute('transform', cl ? 'translate(0 336) scale(1 0.1) translate(0 -336)' : ''); q('.bp').style.opacity = cl ? 0 : 1;
  q('.bc').setAttribute('transform', `translate(0 ${f1(-(o.ceja || 0))})`);
};
const BOT = 'M80,20 L120,20 L122,150 C122,190 172,210 172,262 L172,490 C172,505 160,512 146,512 L54,512 C40,512 28,505 28,490 L28,262 C28,210 78,190 78,150 Z';
const botellaInner = (o = {}) => `${cut(P(BOT), 7, 9)}<path d="${BOT}" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><path d="${BOT}" fill="url(#hA)" opacity=".35"/>
  <path d="M60,250 C50,320 50,420 58,480" stroke="#fff" stroke-width="12" opacity=".45" fill="none" stroke-linecap="round"/>
  <rect x="72" y="0" width="56" height="30" rx="6" fill="#f3efe6" stroke="${INK}" stroke-width="5"/>
  <rect x="40" y="300" width="120" height="120" rx="12" fill="${CREMA}" stroke="${INK}" stroke-width="4"/>${o.cara ? CARAB : `<circle cx="100" cy="340" r="20" fill="${ROJO}" stroke="${INK}" stroke-width="3"/><path d="M92,322 q8,-10 16,0" stroke="${VERDE}" stroke-width="5" fill="none"/>`}
  <text x="100" y="398" text-anchor="middle" font-family="Rye" font-size="22" fill="${INK}">${o.label || 'KETCHUP'}</text>
  ${o.cruz ? `<rect x="66" y="210" width="68" height="68" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M100,220 V268 M76,244 H124" stroke="${VERDE}" stroke-width="14"/>` : ''}
  <g class="n57" style="opacity:${o.n57 ? 1 : 0}"><rect x="76" y="110" width="48" height="34" rx="6" fill="${CREMA}" stroke="${INK}" stroke-width="3"/><text x="100" y="136" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="24" fill="${INK}">57</text></g>`;
const BOTELLA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 520 / 200, botellaInner(o), '0 0 200 520', Object.assign({ z: 8, origin: '50% 100%' }, o));
const tomateInner = () => `${cut('<circle cx="150" cy="165" r="125"/>', 7, 9)}<circle cx="150" cy="165" r="125" fill="#e0322f" stroke="${INK}" stroke-width="7"/><circle cx="150" cy="165" r="125" fill="url(#hA)" opacity=".35"/><ellipse cx="100" cy="110" rx="30" ry="18" fill="#fff" opacity=".45" transform="rotate(-30 100 110)"/>
  <path d="M150,48 L120,22 L146,40 L150,8 L156,40 L184,22 L158,50 Z" fill="#4c8a3a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <g class="tf"><g class="eyeO"><circle cx="112" cy="160" r="20" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="188" cy="160" r="20" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="pupT"><circle cx="116" cy="162" r="9" fill="${INK}"/><circle cx="192" cy="162" r="9" fill="${INK}"/></g><path class="boca" d="M118,210 Q150,238 182,210" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
const TOMATE = (c, x, y, w, o = {}) => figura(c, x, y, w, w, tomateInner(), '0 0 300 300', Object.assign({ z: 9, origin: '50% 50%' }, o));
const tomFace = (f, t, lk = [0, 0], blink = true) => { f.querySelector('.pupT').setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`); f.querySelector('.eyeO').setAttribute('transform', blink && (t % 2.7) < 0.12 ? 'translate(0 160) scale(1 0.1) translate(0 -160)' : ''); };
const pezInner = () => `${FIGP('M30,70 C80,10 200,10 240,70 C200,130 80,130 30,70 Z', '#8fa7b5', 6, .35)}<path d="M240,70 L290,30 L280,70 L290,110 Z" fill="#7a92a0" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="80" cy="60" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="82" cy="61" r="4" fill="${INK}"/>${[120, 150, 180].map(x => `<path d="M${x},40 q12,30 0,60" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/>`).join('')}`;
const PEZ = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 140 / 300, pezInner(), '0 0 300 140', Object.assign({ z: 9, origin: '50% 50%' }, o));
const cuencoInner = () => `${cut('<path d="M20,60 L280,60 C270,150 210,180 150,180 C90,180 30,150 20,60 Z"/>', 6, 8)}<path d="M20,60 L280,60 C270,150 210,180 150,180 C90,180 30,150 20,60 Z" fill="#f3efe6" stroke="${INK}" stroke-width="6"/><ellipse cx="150" cy="60" rx="130" ry="22" fill="#6b4a2a" stroke="${INK}" stroke-width="5"/>${[60, 110, 160, 210].map(x => `<path d="M${x},110 q10,-14 20,0 t20,0" stroke="#2b4a8c" stroke-width="5" fill="none"/>`).join('')}`;
const CUENCO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 190 / 300, cuencoInner(), '0 0 300 190', Object.assign({ z: 8, origin: '50% 100%' }, o));
const ingInner = k => k === 'seta' ? `${FIGP('M20,90 C20,20 200,20 200,90 Z', '#c8a27a', 6, .3)}<path d="M85,90 L80,170 L140,170 L135,90 Z" fill="#f3efe6" stroke="${INK}" stroke-width="5"/>${[[70, 60], [120, 45], [160, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#f3efe6" stroke="${INK}" stroke-width="3"/>`).join('')}`
  : k === 'nuez' ? `${FIGP('M110,20 C170,20 200,70 200,110 C200,160 160,190 110,190 C60,190 20,160 20,110 C20,70 50,20 110,20 Z', '#b07a45', 6, .4)}<path d="M110,24 V186" stroke="${INK}" stroke-width="5"/><path d="M50,80 q30,20 0,40 M170,80 q-30,20 0,40 M70,140 q20,14 0,30 M150,140 q-20,14 0,30" stroke="${INK}" stroke-width="4" fill="none"/>`
    : `${FIGP('M10,100 C60,60 160,60 200,95 C160,130 60,135 10,100 Z', '#9fb0b8', 5, .4)}<path d="M200,95 L220,75 L216,95 L220,115 Z" fill="#9fb0b8" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="94" r="6" fill="${INK}"/>`;
const ING = (c, x, y, w, k) => figura(c, x, y, w, w * 200 / 220, ingInner(k), '0 0 220 200', { z: 10, origin: '50% 50%' });
const ollaInner = () => `${FIGP('M40,120 L360,120 L340,330 C330,360 70,360 60,330 Z', '#7d8790', 6, .3)}<rect x="20" y="100" width="360" height="34" rx="12" fill="#5c656d" stroke="${INK}" stroke-width="6"/><path d="M20,170 H-30 M380,170 H430" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><ellipse cx="200" cy="112" rx="160" ry="16" fill="#6b4a2a" stroke="${INK}" stroke-width="3"/>`;
const OLLA = (c, x, y, w) => figura(c, x, y, w, w * 380 / 400, ollaInner(), '0 0 400 380', { z: 7, origin: '50% 100%' });
const cajaPildInner = (nom, col = ROJO) => `${FIGP('M10,20 L290,20 L290,190 L10,190 Z', CREMA, 6, .15)}<rect x="10" y="20" width="280" height="44" fill="${col}" stroke="${INK}" stroke-width="6"/><text x="150" y="52" text-anchor="middle" font-family="Rye" font-size="26" fill="#fff">PÍLDORAS</text>
  <text x="150" y="110" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="34" fill="${INK}">de Tomate</text><text x="150" y="160" text-anchor="middle" font-family="SpecialElite" font-size="22" fill="${INK}">${nom}</text>`;
const CAJAP = (c, x, y, w, nom, col) => figura(c, x, y, w, w * 210 / 300, cajaPildInner(nom, col), '0 0 300 210', { z: 9, origin: '50% 100%' });
const pildora = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-34" y="-14" width="68" height="28" rx="14" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M0,-14 H20 A14,14 0 0 1 20,14 H0 Z" fill="${ROJO}" stroke="${INK}" stroke-width="4"/></g>`;
const tumbaInner = () => `${FIGP('M40,360 L40,120 C40,40 260,40 260,120 L260,360 Z', '#a9a9a0', 7, .35)}<text x="150" y="150" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">R.I.P.</text><text x="150" y="215" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="30" fill="${INK}">Las píldoras</text><text x="150" y="250" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="900" font-size="30" fill="${INK}">de tomate</text><text x="150" y="310" text-anchor="middle" font-family="SpecialElite" font-size="26" fill="${INK}">h. 1850</text>`;
const patatasInner = () => `${[...Array(9)].map((_, i) => `<rect x="${70 + i * 24}" y="${30 + (i % 3) * 18}" width="20" height="150" rx="6" fill="#f2c14e" stroke="${INK}" stroke-width="3" transform="rotate(${(i - 4) * 4} ${80 + i * 24} 160)"/>`).join('')}${FIGP('M40,120 L320,120 L290,300 L70,300 Z', ROJO, 6, .25)}<text x="180" y="225" text-anchor="middle" font-family="Rye" font-size="40" fill="#fff">FRITAS</text>`;
const PATATAS = (c, x, y, w) => figura(c, x, y, w, w * 300 / 360, patatasInner(), '0 0 360 300', { z: 8, origin: '50% 100%' });
const BARCO = (c, x, y, w) => figura(c, x, y, w, w * 520 / 600, galeonInner(ROJO), '0 0 600 520', { z: 7, origin: '50% 50%' });
const MANO = (c, x, y, rot = -40, s = 1.3) => { const h = box(c, x, y, 180, 180, { zIndex: 30 }); h.innerHTML = `<svg viewBox="-60 -70 120 120" width="180" height="180" style="overflow:visible">${gloveHand(0, 0, rot, s)}</svg>`; return h; };
const burbujas = (c, x, y) => [0, 1, 2, 3, 4].map(i => box(c, x + i * 40, y, 30, 30, { zIndex: 12, borderRadius: '50%', border: `5px solid ${INK}`, background: '#fff' }));

/* ---------- piezas de escenario (estilo ep07: pantallas llenas, nada suelto sobre fondo liso) ---------- */
const ESTRELLA = (c, sz, col) => box(c, 0, 0, sz, sz, { zIndex: 12 }, `<svg viewBox="-50 -50 100 100" width="${sz}" height="${sz}"><path d="M0,-48 L12,-12 L48,0 L12,12 L0,48 L-12,12 L-48,0 L-12,-12 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></svg>`);
const sp = (t0, n = 'pop', g = 0.45) => sfx(n, t0, g);
const TARRO = (c, x, y, w, col, lab) => figura(c, x, y, w, w * 1.25, `${FIGP('M14,40 L146,40 L150,196 L10,196 Z', 'rgba(205,228,235,.85)', 5, .2)}<rect x="22" y="12" width="116" height="34" rx="8" fill="${col}" stroke="${INK}" stroke-width="5"/><rect x="30" y="90" width="100" height="62" rx="6" fill="${CREMA}" stroke="${INK}" stroke-width="3"/><text x="80" y="130" text-anchor="middle" font-family="Rye" font-size="20" fill="${INK}">${lab}</text>`, '0 0 160 200', { z: 5 });
const ESTANTE = (c, y, z = 4) => box(c, 40, y, 1000, 30, { zIndex: z, background: WOOD, border: `6px solid ${INK}`, borderRadius: '8px', boxShadow: `8px 8px 0 ${INK}` });
const LINTERNA = (c, x, y, w) => { const d = figura(c, x, y, w, w * 1.6, `<path d="M${w / 2 * 200 / w},-600 V20" stroke="${INK}" stroke-width="5"/><rect x="70" y="10" width="60" height="22" rx="4" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><ellipse cx="100" cy="150" rx="90" ry="118" fill="#d9262a" stroke="${INK}" stroke-width="6"/><path d="M40,70 Q100,150 40,230 M160,70 Q100,150 160,230 M100,32 V268" stroke="${INK}" stroke-width="3" fill="none" opacity=".5"/><ellipse cx="70" cy="110" rx="18" ry="34" fill="#fff" opacity=".35"/><rect x="70" y="262" width="60" height="22" rx="4" fill="${GOLD}" stroke="${INK}" stroke-width="4"/><path d="M90,284 V330 M100,284 V340 M110,284 V330" stroke="${GOLD}" stroke-width="6"/>`, '0 0 200 330', { z: 6, origin: '50% 0%' }); return d; };
const OLAS = (c, y, col, z) => { const d = box(c, -200, y, 1480, 140, { zIndex: z }); d.innerHTML = `<svg width="1480" height="140" style="overflow:visible"><path d="M0,40 ${[...Array(19)].map((_, i) => `q40,-40 80,0`).join(' ')} V900 H0 Z" fill="${col}" stroke="${INK}" stroke-width="6"/></svg>`; return d; };
const GAVIOTA = (c, x, y) => box(c, x, y, 120, 60, { zIndex: 6 }, `<svg viewBox="0 0 120 60" width="120" height="60"><path class="ala" d="M5,30 Q30,0 60,30 Q90,0 115,30" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`);
const BOCADILLO = (c, x, y, html, o = {}) => el('div', c, { left: px(x), top: px(y), zIndex: o.z || 30, background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', padding: '14px 30px', fontFamily: 'Rye', fontSize: px(o.size || 50), color: INK, boxShadow: `8px 8px 0 ${INK}`, whiteSpace: 'nowrap' }, html);
const PERIODICO = (c, x, y, l1, l2) => box(c, x, y, 760, 560, { zIndex: 30, background: '#f4efe2', border: `7px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` }, `<div style="font-family:Rye;font-size:58px;text-align:center;border-bottom:6px double ${INK};padding:14px 0 8px;color:${INK}">THE DAILY HERALD</div><div style="font-family:SpecialElite;font-size:26px;text-align:center;color:${INK};padding:6px">Ohio · 1834</div><div style="font-family:Playfair;font-weight:900;font-size:82px;line-height:1;text-align:center;color:${INK};padding:14px 20px">${l1}</div><div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:54px;text-align:center;color:${ROJO}">${l2}</div><div style="margin:18px 40px;height:90px;background:repeating-linear-gradient(0deg,rgba(43,33,24,.35) 0 4px,transparent 4px 18px)"></div>`);
const giraPeriodico = (e, t, t0) => { const k = p(t, t0, 0.55, E.outCubic); set(e, { o: t > t0 ? 1 : 0, s: lerp(0.05, 1, k), r: lerp(720, -4, k) }); };
const lagrima = (c, x, y) => box(c, x, y, 26, 36, { zIndex: 12, background: '#7cc4ea', border: `4px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' });

/* L0 · PORTADA (fotograma 0 = portada completa) — la farmacia llena; la botella habla con la voz, guiña, los tarros bailan */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'El kétchup se vendía…', { size: 84 });
  const t2 = texto(c, 350, 'en la ' + hlSpan('FARMACIA', 'phl'), { size: 116, italic: true });
  ESTANTE(c, 900); ESTANTE(c, 1210, 6);
  const jt = [[60, 690, VERDE, 'SAL'], [200, 720, '#2b4a8c', 'ÁRNICA'], [790, 720, ROJO, 'JARABE'], [920, 690, GOLD, 'TÓNICO']].map(([x, y, col, l]) => TARRO(c, x, y - 70, 120, col, l));
  const jb = [[50, 950, '#2b4a8c', 'OPIO'], [800, 950, VERDE, 'LECHE'], [930, 980, ROJO, 'POLVOS']].map(([x, y, col, l]) => TARRO(c, x, y, 150, col, l));
  const b = BOTELLA(c, 400, 560, 270, { cruz: true, cara: true });
  const cruz = box(c, 860, 520, 150, 150, { zIndex: 21 }, `<svg viewBox="0 0 150 150" width="170" height="170"><path d="M50,0 H100 V50 H150 V100 H100 V150 H50 V100 H0 V50 H50 Z" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></svg>`);
  const pl = box(c, 0, 0, 1080, 1920, { zIndex: 9 }); pl.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${[0, 1, 2, 3, 4].map(i => `<g class="pl">${pildora(0, 0, i * 40)}</g>`).join('')}</svg>`; const pls = [...pl.querySelectorAll('.pl')];
  const ja = ['¡ja!', '¡ja!'].map((s, i) => texto(c, 600 + i * 120, s, { size: 70, italic: true, color: ROJO, x: i ? 680 : 170, w: 240, z: 25 }));
  sello(c, 1290, '¡CON RECETA!', T.farmacia0 + 0.35, { size: 96, r: -7 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.farmacia0, 'ding', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const hop = Math.abs(Math.sin(t * 5)); set(b, { y: -hop * 26, sy: 1 - 0.05 * (1 - hop), r: Math.sin(t * 2.5) * 4 });
    botFace(b, t, { jaw: talkW(t, 'VECINO'), look: [Math.sin(t * 2) * 4, -2], ceja: t > T.farmacia0 ? 10 : 0, closed: t > T.farmacia0 + 0.2 && t < T.farmacia0 + 0.6 });
    [...jt, ...jb].forEach((j, i) => set(j, { y: -Math.abs(Math.sin(t * 5 + i * 1.3)) * 18, r: Math.sin(t * 5 + i) * 5 }));
    set(cruz, { s: 1 + 0.1 * Math.abs(Math.sin(t * 5)), r: 8 + t * 20 });
    pls.forEach((g, i) => { const a = t * 2.2 + i * 1.26; g.setAttribute('transform', `translate(${f1(540 + Math.cos(a) * 280)} ${f1(900 + Math.sin(a) * 120)}) rotate(${f1(a * 60)})`); });
    ja.forEach((e, i) => set(e, { o: t > T.farmacia0 + 0.15 * i ? 1 : 0, s: pop(t, T.farmacia0 + 0.15 * i, 0.3), r: i ? 10 : -10, y: Math.sin(t * 14 + i) * 6 }));
  };
}, { sfx: false });

/* L1a · «como medicina»: mostrador de la botica; el boticario le extiende la receta a la botella */
headline(L(1) - 0.1, T.final1 - 0.1, 'Como *medicina*', { size: 92, hlT: T.medicina1 + 0.2 });
plano(L(1) - 0.1, T.final1 - 0.1, { background: '#d9ecef', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 90px)' }, c => {
  const cam = CAM(c);
  ESTANTE(cam, 560, 2); [120, 300, 720, 880].forEach((x, i) => TARRO(cam, x, 400, 110, [VERDE, ROJO, GOLD, '#2b4a8c'][i], ['ÉTER', 'YODO', 'MIEL', 'AZUFRE'][i]));
  const bot = mkBust(cam, [40, 560, 470, 601], { hat: 'brodie', moustache: true, seed: 18 });
  const mos = box(cam, 0, 1050, 1080, 870, { zIndex: 9, background: WOOD, borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 4px, transparent 4px 120px)' });
  const b = BOTELLA(cam, 640, 1050 - 572, 220, { cruz: true, cara: true });
  const rec = figura(cam, 330, 700, 300, 370, `${FIGP('M0,0 L300,0 L300,370 L0,370 Z', CREMA, 6, .12)}<text x="30" y="80" font-family="Playfair" font-style="italic" font-weight="900" font-size="70" fill="${INK}">Rp/</text>${[...Array(4)].map((_, k) => `<path d="M30,${130 + k * 44} H270" stroke="${INK}" stroke-width="4" opacity=".35"/>`).join('')}<text x="150" y="340" text-anchor="middle" font-family="Rye" font-size="30" fill="${ROJO}">KETCHUP</text>`, '0 0 300 370', { z: 12, origin: '0% 100%' });
  sp(T.medicina1, 'paper', 0.7); sp(T.medicina1 + 0.5, 'ding', 0.6);
  return t => {
    zoom(cam, t, L(1), 2.5, 0.08);
    face(bot, t, { look: [8, 0], jaw: t > T.medicina1 && t < T.medicina1 + 0.6 ? 0.4 : 0, bL: t > T.medicina1 ? 6 : 0, bR: 6, seed: 0.3 });
    set(rec, { r: lerp(-70, -6, p(t, T.medicina1, 0.5, E.outBack)), x: 120 * p(t, T.medicina1, 0.5, E.outCubic), o: t > T.medicina1 - 0.05 ? 1 : 0 });
    set(b, { s: pop(t, L(1), 0.4), r: Math.sin(t * 4) * 3 }); botFace(b, t, { look: [-6, 2], ceja: t > T.medicina1 + 0.4 ? 12 : 0, jaw: t > T.medicina1 + 0.4 ? 0.8 : 0 });
  };
});
/* L1b · «el final… lo tienes en tu nevera»: la nevera se entreabre (luz, silueta con ojos), y se cierra de golpe con candado */
plano(T.final1 - 0.1, L(2) - 0.1, { background: '#C9D3E6', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.35) 0 50%, transparent 50%), repeating-linear-gradient(0deg, rgba(43,33,24,.12) 0 4px, transparent 4px 120px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1330, 1080, 600, { zIndex: 2, background: '#b98c5a', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.15) 0 5px, transparent 5px 180px)' });
  const luz = rays(cam, -160, 260, 1400, 20, 'rgba(255,240,150,.7)', 'rgba(0,0,0,0)', 3);
  const cuerpo = box(cam, 290, 420, 500, 920, { zIndex: 5, background: '#fff6c8', border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 14px 0 ${INK}` });
  [300, 560].forEach(y => box(cuerpo, 20, y, 444, 10, { background: '#c9d3e6', border: `3px solid ${INK}` }));
  const sil = BOTELLA(cuerpo, 160, 70, 150, { cara: true }); sil.style.filter = 'brightness(0)';
  const ojos = box(cuerpo, 196, 270, 80, 40, { zIndex: 9 }, `<svg viewBox="0 0 80 40" width="80" height="40"><ellipse cx="18" cy="20" rx="13" ry="15" fill="#fff"/><ellipse cx="62" cy="20" rx="13" ry="15" fill="#fff"/></svg>`);
  const puerta = box(cam, 290, 420, 500, 920, { zIndex: 7, background: '#f4f7fb', border: `8px solid ${INK}`, borderRadius: '40px', transformOrigin: '0% 50%' });
  box(puerta, 0, 300, 484, 8, { background: INK }); box(puerta, 410, 120, 20, 120, { background: INK, borderRadius: '10px' }); box(puerta, 410, 380, 20, 160, { background: INK, borderRadius: '10px' });
  const cad = box(cam, 230, 760, 620, 240, { zIndex: 12 }, `<svg viewBox="0 0 620 240" width="620" height="240" style="overflow:visible"><path d="M0,40 L620,200 M0,200 L620,40" stroke="#7d8790" stroke-width="26" stroke-dasharray="40 10"/><path d="M0,40 L620,200 M0,200 L620,40" stroke="${INK}" stroke-width="4" fill="none"/><path d="M270,110 V70 a40,40 0 0 1 80,0 V110" stroke="${INK}" stroke-width="16" fill="none"/><rect x="250" y="105" width="120" height="100" rx="14" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="310" cy="150" r="12" fill="${INK}"/></svg>`);
  const q = texto(cam, 1380, '¿QUÉ HAY DENTRO?', { size: 76, color: ROJO, z: 20 });
  const tOpen = T.final1 + 0.2, tShut = T.nevera1 - 0.05;
  sp(tOpen, 'scratch', 0.7); sp(tOpen + 0.3, 'sparkle', 0.7); sp(tShut, 'thud', 1.1); sp(tShut + 0.3, 'stamp', 0.9); shakeAt(tShut, 0.35, 18);
  return t => {
    const open = p(t, tOpen, 0.5, E.outBack) * (1 - p(t, tShut - 0.12, 0.12, E.inCubic));
    set(puerta, { sx: 1 - 0.62 * open, x: t > tShut ? Math.sin(t * 50) * 4 * (1 - p(t, tShut, 0.6)) : Math.sin(t * 40) * 1.5 });
    set(luz, { o: open, r: t * 10 });
    set(ojos, { o: open > 0.5 && (t % 1.6) > 0.15 ? 1 : 0, x: Math.sin(t * 3) * 8 });
    set(cad, { o: t > tShut + 0.3 ? 1 : 0, s: lerp(1.6, 1, p(t, tShut + 0.3, 0.25, E.outCubic)) });
    set(q, { o: t > tShut + 0.5 ? 1 : 0, s: pop(t, tShut + 0.5, 0.35), r: Math.sin(t * 6) * 3 });
    zoom(cam, t, T.final1, 3.5, 0.1);
  };
});

/* L2 · China: farolillos, los peces saltan al tarro → cuenco que burbujea «kê-tsiap»; el tomate se asoma… y lo tachan */
headline(L(2) - 0.1, L(3) - 0.1, 'Empieza en *China*', { size: 90, hlT: T.china + 0.1 });
const farolillos = c => [[60, 300, 150], [860, 280, 170], [700, 350, 110], [230, 360, 100]].map(([x, y, w]) => LINTERNA(c, x, y, w));
const meceFar = (fs, t) => fs.forEach((f, i) => set(f, { r: Math.sin(t * 2 + i * 1.7) * 7 }));
plano(L(2) - 0.1, T.ferm - 0.05, { background: '#f2dcb4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(160,40,30,.08) 0 6px, transparent 6px 70px)' }, c => {
  const cam = CAM(c);
  const fs = farolillos(cam);
  box(cam, 0, 1250, 1080, 700, { zIndex: 3, background: '#a0522d', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.15) 0 5px, transparent 5px 150px)' });
  const pz = [0, 1, 2].map(i => PEZ(cam, -320, 640 + i * 150, 280));
  const tarro = figura(cam, 600, 720, 320, 450, `${FIGP('M30,80 L290,80 L280,430 L40,430 Z', 'rgba(190,225,235,.6)', 6, .15)}<rect x="20" y="40" width="280" height="50" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect class="liq" x="44" y="200" width="232" height="226" fill="#7a5a32" opacity=".75"/>`, '0 0 320 450', { z: 8 });
  const sal = [0, 1, 2].map(i => texto(cam, 600, '¡plof!', { size: 56, italic: true, color: '#2b4a8c', x: 560 + i * 60, w: 240, z: 20 }));
  [0, 1, 2].forEach(i => sp(T.salsa - 0.4 + i * 0.2 + 0.7, 'pop2', 0.5));
  return t => {
    zoom(cam, t, L(2), 4); meceFar(fs, t);
    pz.forEach((f, i) => { const t0 = T.salsa - 0.4 + i * 0.2, k = p(t, t0, 0.7, E.inOutCubic); set(f, { x: k * 900, y: -Math.sin(k * Math.PI) * 220 + k * 80, r: k * 160 + Math.sin(t * 12) * 6, s: 1 - 0.6 * k, o: k < 0.98 ? 1 : 0 }); set(sal[i], { o: t > t0 + 0.7 && t < t0 + 1.2 ? 1 : 0, y: -60 * p(t, t0 + 0.7, 0.5) }); });
    set(tarro, { r: t > T.pescado ? Math.sin(t * 20) * 2 : 0, sy: 1 + (t > T.pescado ? 0.03 * Math.sin(t * 14) : 0) });
  };
});
plano(T.ferm - 0.05, L(3) - 0.1, { background: '#f2dcb4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(160,40,30,.08) 0 6px, transparent 6px 70px)' }, c => {
  const cam = CAM(c);
  const fs = farolillos(cam);
  box(cam, 0, 1250, 1080, 700, { zIndex: 3, background: '#a0522d', borderTop: `8px solid ${INK}` });
  const cu = CUENCO(cam, 240, 870, 600);
  const bb = burbujas(cam, 420, 830);
  const hum = [0, 1, 2].map(i => box(cam, 380 + i * 110, 700, 40, 160, { zIndex: 7, borderLeft: `8px solid rgba(43,33,24,.35)`, borderRadius: '50%' }));
  const nom = texto(cam, 390, '«kê-tsiap»', { size: 110, italic: true, color: '#fff', shadow: `5px 5px 0 ${INK}` });
  const tm = TOMATE(cam, 760, 560, 230);
  const x = box(cam, 745, 545, 260, 260, { zIndex: 20 }, XSVG);
  const lg = lagrima(cam, 820, 740);
  sp(T.ferm + 0.1, 'pop', 0.6); sp(T.sinTom - 0.3, 'boing', 0.6); sp(T.sinTom + 0.4, 'stamp', 0.9); sp(T.sinTom + 0.6, 'sad', 0.7);
  return t => {
    zoom(cam, t, T.ferm, 2.5); meceFar(fs, t);
    bb.forEach((b, i) => set(b, { y: -((t * 120 + i * 50) % 200), o: 0.9, s: 0.6 + 0.4 * Math.sin(t * 4 + i) }));
    hum.forEach((h, i) => set(h, { y: -((t * 80 + i * 60) % 120), o: 0.8, x: Math.sin(t * 3 + i) * 12 }));
    set(nom, { s: pop(t, T.ferm + 0.1, 0.4), o: t > T.ferm + 0.1 ? 1 : 0, r: -3 });
    const kin = p(t, T.sinTom - 0.3, 0.4, E.outBack); set(tm, { o: t > T.sinTom - 0.3 ? 1 : 0, y: (1 - kin) * 300 + (t > T.sinTom + 0.4 ? 0 : -Math.abs(Math.sin(t * 7)) * 20) });
    tomFace(tm, t, t > T.sinTom + 0.4 ? [0, 6] : [-8, -4]); tm.querySelector('.boca').setAttribute('d', t > T.sinTom + 0.4 ? 'M118,226 Q150,200 182,226' : 'M110,205 Q150,250 190,205');
    set(x, { o: t > T.sinTom + 0.4 ? 1 : 0, s: pop(t, T.sinTom + 0.4, 0.3) }); set(lg, { o: t > T.sinTom + 0.6 ? 1 : 0, y: ((t - T.sinTom) * 140) % 120 });
  };
});
shakeAt(T.sinTom + 0.4, 0.25, 10);

/* L3 · los marineros ingleses la copian: barco en alta mar con gaviotas → el marinero echa a la olla lo que pilla */
headline(L(3) - 0.1, L(4) - 0.1, 'Copia *inglesa*', { size: 90, hlT: T.copian });
plano(L(3) - 0.1, T.champi - 0.15, { background: '#bcd3ea' }, c => {
  const sol = box(c, 780, 360, 200, 200, { zIndex: 2, background: GOLD, border: `7px solid ${INK}`, borderRadius: '50%' });
  const nubes = [[80, 420], [560, 520]].map(([x, y]) => box(c, x, y, 260, 90, { zIndex: 3, background: '#fff', border: `6px solid ${INK}`, borderRadius: '60px' }));
  const gs = [[200, 600], [380, 540], [700, 640]].map(([x, y]) => GAVIOTA(c, x, y));
  const o1 = OLAS(c, 1060, '#5c87b5', 4), o2 = OLAS(c, 1180, '#3f6d9e', 9);
  box(c, 0, 1300, 1080, 700, { zIndex: 9, background: '#3f6d9e' });
  const br = BARCO(c, -560, 560, 600);
  const mar = mkBust(c, [-400, 690, 220, 281], { hat: 'cap', moustache: true, seed: 61 }); mar.d.style.zIndex = 6;
  const bo = BOCADILLO(c, 380, 1500, '¡A copiarla!', { size: 54 });
  sp(T.copian, 'pop', 0.6); sp(L(3), 'whoosh', 0.6);
  return t => {
    const k = p(t, L(3), T.champi - L(3) + 0.3, E.inOutCubic), bx = lerp(-520, 1100, k), by = Math.sin(t * 3) * 14;
    set(br, { x: bx + 560, y: by, r: Math.sin(t * 2.4) * 4 }); set(mar.d, { x: bx + 760, y: by, r: Math.sin(t * 2.4) * 4 }); face(mar, t, { look: [6, 0], jaw: t > T.copian && t < T.pillan ? 0.5 : 0, seed: 0.7 });
    set(o1, { x: (t * 90) % 80 }); set(o2, { x: -((t * 130) % 80) });
    gs.forEach((g, i) => { set(g, { x: Math.sin(t + i) * 60, y: Math.cos(t * 1.3 + i) * 20 }); g.querySelector('.ala').setAttribute('d', `M5,30 Q30,${f1(10 + 18 * Math.sin(t * 12 + i))} 60,30 Q90,${f1(10 + 18 * Math.sin(t * 12 + i))} 115,30`); });
    nubes.forEach((n, i) => set(n, { x: ((t * 30 + i * 300) % 1400) - 300 })); set(sol, { r: t * 20, s: 1 + 0.04 * Math.sin(t * 4) });
    popA(bo, t, T.copian, { r: -3 });
  };
});
plano(T.champi - 0.15, L(4) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1330, 1080, 600, { zIndex: 2, background: '#8a5a32', borderTop: `8px solid ${INK}` });
  const mar = mkBust(cam, [660, 620, 400, 512], { hat: 'cap', moustache: true, seed: 61 });
  const o = OLLA(cam, 250, 960, 480);
  const fuego = [0, 1, 2, 3].map(i => box(cam, 330 + i * 90, 1400, 70, 110, { zIndex: 6, background: i % 2 ? '#f28c28' : GOLD, border: `5px solid ${INK}`, borderRadius: '50% 50% 40% 40% / 70% 70% 30% 30%' }));
  const hum = [0, 1, 2].map(i => box(cam, 360 + i * 120, 820, 40, 160, { zIndex: 6, borderLeft: `8px solid rgba(255,255,255,.7)`, borderRadius: '50%' }));
  const ings = [['seta', T.champi, 120], ['nuez', T.nueces, 380], ['anchoa', T.anchoas, 640]].map(([k, t0, x]) => [ING(cam, x, 470, 220, k), t0, x]);
  const lbs = [['champiñones', T.champi, 80], ['nueces', T.nueces, 380], ['anchoas', T.anchoas, 620]].map(([s, t0, x]) => [chip(cam, x, 720, s, { size: 46, bg: '#fff', color: INK }), t0]);
  const puaj = BOCADILLO(cam, 640, 470, '¿anchoas?', { size: 46 });
  ings.forEach(([e, t0]) => { sp(t0, 'pop', 0.5); sp(t0 + 1.2, 'gulp', 0.6); });
  return t => {
    zoom(cam, t, T.champi, 3);
    ings.forEach(([e, t0, x]) => { const kin = p(t, t0 - 0.1, 0.35, E.outBack), kfall = p(t, t0 + 0.9, 0.4, E.inCubic); set(e, { s: kin * (1 - 0.5 * kfall), o: t > t0 - 0.1 && kfall < 1 ? 1 : 0, x: (490 - 110 - x) * kfall, y: 520 * kfall, r: kfall * 200 + Math.sin(t * 6) * 6 }); });
    lbs.forEach(([e, t0]) => popA(e, t, t0, { r: -3, o: 1 - p(t, t0 + 0.9, 0.2) }));
    set(o, { r: Math.sin(t * 18) * (t > T.champi + 0.9 ? 1.5 : 0) });
    fuego.forEach((f, i) => set(f, { sy: 1 + 0.25 * Math.sin(t * 14 + i * 2), y: -Math.abs(Math.sin(t * 9 + i)) * 10 }));
    hum.forEach((h, i) => set(h, { y: -((t * 90 + i * 60) % 150), x: Math.sin(t * 3 + i) * 14, o: 0.9 }));
    const lk = t > T.anchoas ? [-10, 4] : t > T.nueces ? [-8, -2] : [-10, -4];
    face(mar, t, { look: lk, bL: t > T.anchoas ? 14 : 0, bR: t > T.anchoas ? 14 : 4, jaw: t > T.anchoas && t < T.anchoas + 0.8 ? 0.6 : 0, seed: 0.7 });
    popA(puaj, t, T.anchoas + 0.2, { r: 4, o: 1 - p(t, T.anchoas + 1.3, 0.2) });
  };
});

/* L4 · 1834: el médico lo anuncia y el periódico entra girando: «¡EL TOMATE LO CURA TODO!» */
headline(L(4) - 0.1, L(5) - 0.1, '*1834*: el tomate milagro', { size: 84, hlT: T.m1834 });
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' }, c => {
  const cam = CAM(c);
  const bs = rays(cam, 300, 360, 900, 16, 'rgba(255,230,0,.55)', 'rgba(0,0,0,0)', 1);
  const doc = mkBust(cam, [60, 640, 440, 563], { hat: 'brodie', moustache: true, beard: true, seed: 34 });
  aparece(chip(cam, 300, 1220, 'un médico americano', { size: 50, bg: '#fff', color: INK }), T.medico);
  const tm = TOMATE(cam, 560, 560, 400);
  const brillos = [0, 1, 2, 3, 4, 5].map(i => ESTRELLA(cam, 64, GOLD));
  const per = PERIODICO(c, 160, 560, '¡EL TOMATE<br>LO CURA TODO!', 'según un médico');
  sp(T.tomate4 - 0.2, 'sparkle', 0.8); sp(T.cura - 0.1, 'whoosh', 0.8); sp(T.cura + 0.45, 'stamp', 1);
  return t => {
    zoom(cam, t, L(4), 5); set(bs, { r: t * 8 });
    face(doc, t, { look: t > T.tomate4 ? [8, -2] : [0, 0], bL: t > T.tomate4 ? 10 : 0, bR: t > T.tomate4 ? 10 : 0, jaw: talkW(t, 'VECINO') * 0.6, seed: 0.2 });
    set(tm, { o: t > T.tomate4 - 0.2 ? 1 : 0, s: pop(t, T.tomate4 - 0.2, 0.5) * (1 + 0.04 * Math.sin(t * 6)), y: -Math.abs(Math.sin(t * 3)) * 20 }); tomFace(tm, t, [-8, -2]); tm.querySelector('.boca').setAttribute('d', 'M110,205 Q150,250 190,205');
    brillos.forEach((b, i) => { const a = t * 1.5 + i * 1.05; set(b, { x: 720 + Math.cos(a) * 260, y: 720 + Math.sin(a) * 240, o: t > T.tomate4 ? 1 : 0, s: 0.7 + 0.4 * Math.sin(t * 8 + i) }); });
    giraPeriodico(per, t, T.cura - 0.1);
  };
});
shakeAt(T.cura + 0.45, 0.35, 16);

/* L5 · cura la diarrea, la indigestión… ¡el cólera! (el tomate-doctor va sellando) → y receta… kétchup */
headline(L(5) - 0.1, L(6) - 0.1, 'Según él, cura…', { size: 84 });
plano(L(5) - 0.1, T.receta - 0.1, PAPEL, c => {
  const items = [['la diarrea', T.diarrea], ['la indigestión', T.indig], ['¡el cólera!', T.colera]].map(([s, t0], i) => {
    const row = box(c, 60, 470 + i * 230, 760, 170, { zIndex: 8, background: CREMA, border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}` });
    el('div', row, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '80px', color: INK }, s);
    const ck = box(c, 690, 470 + i * 230 - 10, 170, 170, { zIndex: 9 }, CHECK); sp(t0 - 0.15, 'whoosh', 0.5); sp(t0 + 0.35, 'stamp', 0.8); return [row, ck, t0];
  });
  const tm = TOMATE(c, 820, 420, 220);
  return t => {
    let ty = 420; items.forEach(([r, ck, t0], i) => { set(r, { x: (1 - p(t, t0 - 0.15, 0.35, E.outBack)) * -1100, r: i % 2 ? 1.5 : -1.5 }); stampA(ck, t, t0 + 0.35, -8); if (t > t0) ty = 420 + i * 230; });
    const hop = Math.abs(Math.sin(t * 7)); set(tm, { y: ty - 420 - hop * 40, r: Math.sin(t * 7) * 8 }); tomFace(tm, t, [-8, 4]); tm.querySelector('.boca').setAttribute('d', 'M110,205 Q150,250 190,205');
  };
});
plano(T.receta - 0.1, L(6) - 0.1, { background: YEL }, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const rec = figura(c, 220, 420, 640, 780, `${FIGP('M0,0 L640,0 L640,780 L0,780 Z', CREMA, 7, .12)}<text x="60" y="140" font-family="Playfair" font-style="italic" font-weight="900" font-size="130" fill="${INK}">Rp/</text>${[...Array(4)].map((_, k) => `<path d="M60,${240 + k * 70} H580" stroke="${INK}" stroke-width="5" opacity=".3"/>`).join('')}<text x="320" y="740" text-anchor="middle" font-family="SpecialElite" font-size="40" fill="${INK}">3 cucharadas al día</text>`, '0 0 640 780', { z: 6, origin: '50% 50%' });
  const b = BOTELLA(c, 430, 640, 220, { cara: true });
  sp(T.receta, 'paper', 0.7); sp(T.ket5 + 0.3, 'boing', 0.8);
  return t => { set(ry, { r: t * 8 }); set(rec, { s: pop(t, T.receta - 0.1, 0.4), r: -3 }); set(b, { o: t > T.ket5 - 0.1 ? 1 : 0, y: (1 - p(t, T.ket5 - 0.1, 0.45, E.outBack)) * -900, r: Math.sin(t * 5) * 3 }); botFace(b, t, { feliz: true, jaw: 0.6, look: [0, -3], ceja: 8, closed: t > T.ket5 + 0.6 && t < T.ket5 + 0.9 }); };
});
shakeAt(T.ket5 + 0.3, 0.3, 12);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · alguien huele el negocio: píldoras de tomate → cola de clientes «¡DEME DOS!» */
headline(L(7) - 0.1, L(8) - 0.1, 'Píldoras de *tomate*', { size: 90, hlT: T.pastillas });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const ven = mkBust(cam, [40, 480, 360, 461], { hat: 'brodie', moustache: true, seed: 77 });
  const nariz = box(cam, 420, 420, 280, 200, { zIndex: 9 }, `<svg viewBox="0 0 280 200" width="280" height="200" style="overflow:visible"><path d="M40,120 C80,40 200,40 240,120" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/><text x="140" y="190" text-anchor="middle" font-family="Rye" font-size="60" fill="${VERDE}">$ $ $</text></svg>`);
  const cj = CAJAP(cam, 420, 600, 420, 'Dr. Miles', ROJO);
  const pil = box(cam, 0, 0, 1080, 1920, { zIndex: 11 }); let s = ''; const R = rng(7); for (let i = 0; i < 30; i++) s += `<g class="pl">${pildora(f1(380 + R() * 640), f1(900 + R() * 120), f1(R() * 180))}</g>`; pil.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; const pls = [...pil.querySelectorAll('.pl')];
  const cli = [[330, 0], [580, 1], [830, 2]].map(([x, i]) => mkBust(cam, [x, 1020, 250, 320], { hat: ['cap', 'slouch', 'brodie'][i], moustache: i !== 1, seed: 90 + i }));
  const bub = BOCADILLO(cam, 380, 960, '¡DEME DOS!', { size: 52 });
  const mon = [0, 1, 2, 3].map(i => texto(cam, 0, '$', { size: 90, color: VERDE, x: 0, w: 90, z: 14, shadow: `3px 3px 0 ${INK}` }));
  sp(T.huele, 'sparkle', 0.6); sp(T.pastillas, 'pop2', 0.7); sp(T.churros, 'cash', 0.9); sp(T.churros + 0.5, 'cash', 0.6);
  return t => {
    zoom(cam, t, L(7), 5);
    face(ven, t, { look: [8, -2], closed: t < T.pastillas, bL: t > T.churros ? 12 : 4, bR: t > T.churros ? 12 : 4, jaw: t > T.churros ? 0.5 : 0, seed: 0.4 });
    set(nariz, { o: t < T.pastillas ? 1 : 0, y: Math.sin(t * 8) * 8 });
    set(cj, { s: pop(t, T.pastillas, 0.45), o: t > T.pastillas ? 1 : 0, r: Math.sin(t * 3) * 2 });
    pls.forEach((g, i) => g.style.opacity = t > T.pastillas + 0.3 + i * 0.03 && t < T.churros ? 1 : 0);
    cli.forEach((b, i) => { set(b.d, { o: t > T.churros + i * 0.12 ? 1 : 0, y: (1 - p(t, T.churros + i * 0.12, 0.35, E.outBack)) * 400 - Math.abs(Math.sin(t * 8 + i)) * 14 }); face(b, t, { look: [-8, -4], jaw: Math.abs(Math.sin(t * 9 + i)) * 0.5, bL: 8, bR: 8, seed: i }); });
    popA(bub, t, T.churros + 0.3, { r: -4 });
    mon.forEach((m, i) => { const k = ((t - T.churros) * 0.9 + i * 0.25) % 1; set(m, { o: t > T.churros ? 1 - k : 0, x: 600 + i * 90 - k * 400, y: 1000 - k * 300 }); });
  };
});

/* L8 · copias por todas partes (los «doctores» brotan) → y algunas… llevaban LAXANTE (carrera al WC) */
headline(L(8) - 0.1, T.vez - 0.1, 'Copias por *todas partes*', { size: 82, hlT: T.partes });
plano(L(8) - 0.1, T.vez - 0.1, PAPEL, c => {
  const nombres = ['Dr. Miles', 'Dr. Phelps', 'Dr. Holcombe', 'Dr. Nadie', '¿Dr.?', 'Dr. Prisas'];
  const cs = nombres.map((n, i) => { const t0 = T.copias + i * 0.18; sp(t0, 'pop', 0.45); return [CAJAP(c, 60 + (i % 3) * 330, 480 + Math.floor(i / 3) * 330, 300, n, ['#2b4a8c', ROJO, VERDE][i % 3]), t0]; });
  const cnt = texto(c, 1180, '', { size: 110, color: ROJO, x: 360, w: 680 });
  const ori = stamp(c, 440, 1020, '¿ORIGINAL?', { size: 72, z: 30 });
  return t => { let n = 0; cs.forEach(([e, t0], i) => { if (t > t0) n++; set(e, { s: pop(t, t0, 0.35), o: t > t0 ? 1 : 0, r: Math.sin(t * 4 + i) * 4, y: -Math.abs(Math.sin(t * 6 + i)) * 10 }); }); cnt.innerHTML = n ? `×${n * 7}` : ''; stampA(ori, t, T.partes + 0.4, -8); };
});
plano(T.vez - 0.1, L(9) - 0.1, { background: '#E9D7B0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 100px)' }, c => {
  box(c, 0, 1330, 1080, 600, { zIndex: 2, background: '#b98c5a', borderTop: `8px solid ${INK}` });
  const cj = CAJAP(c, 330, 380, 420, 'Dr. Prisas', ROJO);
  const lx = stamp(c, 300, 560, 'LAXANTE', { size: 110, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const hombre = mkBust(c, [300, 800, 380, 486], { hat: 'cap', moustache: true, seed: 52 });
  const grr = texto(c, 760, 'grrrr…', { size: 90, italic: true, x: 260, w: 460, color: '#6b4a2a' });
  const wc = figura(c, 690, 760, 340, 580, `${FIGP('M20,20 L320,20 L320,560 L20,560 Z', WOOD, 7, .3)}<rect x="90" y="70" width="160" height="90" rx="10" fill="${CREMA}" stroke="${INK}" stroke-width="5"/><text x="170" y="135" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">WC</text><circle cx="270" cy="320" r="16" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`, '0 0 340 580', { z: 7, origin: '0% 50%' });
  const pol = [0, 1, 2, 3].map(i => box(c, 300, 1250, 60, 40, { zIndex: 6, background: '#d8c3a0', border: `4px solid ${INK}`, borderRadius: '50%' }));
  sp(T.laxante, 'stamp', 1); sp(T.laxante + 0.2, 'glitch', 0.6); sp(T.laxante + 0.9, 'whoosh', 0.9);
  return t => {
    stampA(lx, t, T.laxante, -10);
    face(hombre, t, { look: t > T.laxante + 0.3 ? [10, 0] : [0, 0], bL: t > T.laxante ? 14 : 0, bR: t > T.laxante ? 14 : 0, jaw: t > T.laxante ? 0.5 : 0, seed: 0.5 });
    const run = p(t, T.laxante + 0.9, 0.4, E.inCubic);
    set(hombre.d, { x: t > T.laxante + 0.9 ? run * 450 : Math.sin(t * 30) * (t > T.laxante ? 5 : 0), o: t > T.laxante + 1.25 ? 0 : 1 });
    pol.forEach((d, i) => set(d, { o: t > T.laxante + 0.9 + i * 0.08 && t < T.laxante + 2 ? 1 - p(t, T.laxante + 1.4, 0.6) : 0, x: run * 450 * (i / 4), s: 0.6 + i * 0.2 }));
    set(grr, { o: t > T.laxante + 0.2 && t < T.laxante + 1.0 ? 1 : 0, x: Math.sin(t * 40) * 6 });
    set(wc, { sx: t > T.laxante + 1.25 ? 1 : 1 - 0.5 * p(t, T.laxante + 0.8, 0.3), x: t > T.laxante + 1.25 ? Math.sin(t * 40) * 3 : 0 });
  };
});
shakeAt(T.laxante + 1.25, 0.3, 14); sfx('thud', T.laxante + 1.25, 1.0);

/* L9 · hacia 1850 la moda muere (entierro nocturno, el tomate llora) → el kétchup vuelve a la cocina para quedarse */
headline(L(9) - 0.1, L(10) - 0.1, 'Hacia *1850*', { size: 92, hlT: T.m1850 });
plano(L(9) - 0.1, T.cocina - 0.1, { background: '#2f3d5c' }, c => {
  const luna = box(c, 760, 380, 200, 200, { zIndex: 2, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '50%', boxShadow: '0 0 80px rgba(255,255,220,.6)' });
  const est = [...Array(12)].map((_, i) => (() => { const e = ESTRELLA(c, 34, '#f4efe2'); e.style.left = px(60 + (i * 173) % 900); e.style.top = px(330 + (i * 97) % 450); e.style.zIndex = 2; return e; })());
  box(c, 0, 1160, 1080, 760, { zIndex: 3, background: '#4a6a3a', borderTop: `8px solid ${INK}` });
  const tb = figura(c, 340, 1240, 400, 480, tumbaInner(), '0 0 300 360', { z: 6, origin: '50% 100%' });
  const cajas = [0, 1, 2].map(i => CAJAP(c, 380 + i * 60, 1000, 200, '', ROJO));
  const tm = TOMATE(c, 780, 980, 220); const lg = [lagrima(c, 840, 1080), lagrima(c, 900, 1080)];
  sp(T.muere - 0.2, 'thud', 0.9); sp(T.muere + 0.3, 'sad', 0.8);
  return t => {
    set(luna, { s: 1 + 0.03 * Math.sin(t * 2) }); est.forEach((e, i) => set(e, { o: 0.5 + 0.5 * Math.sin(t * 4 + i) }));
    cajas.forEach((e, i) => { const k = p(t, L(9) + 0.3 + i * 0.35, 0.5, E.inCubic); set(e, { y: k * 400, r: k * 90 * (i - 1), o: k < 0.95 ? 1 : 0 }); });
    set(tb, { y: -480 * p(t, T.muere - 0.2, 0.5, E.outBack), r: -2 });
    set(tm, { o: t > T.muere ? 1 : 0, s: pop(t, T.muere, 0.4), r: Math.sin(t * 9) * 3 }); tomFace(tm, t, [-6, 6], false); tm.querySelector('.boca').setAttribute('d', 'M118,226 Q150,200 182,226');
    lg.forEach((l, i) => set(l, { o: t > T.muere + 0.3 ? 1 : 0, y: ((t * 160 + i * 60) % 140) }));
  };
});
plano(T.cocina - 0.1, L(10) - 0.1, { background: '#f4efe2', backgroundImage: `linear-gradient(45deg, rgba(200,16,46,.18) 25%, transparent 25%, transparent 75%, rgba(200,16,46,.18) 75%), linear-gradient(45deg, rgba(200,16,46,.18) 25%, transparent 25%, transparent 75%, rgba(200,16,46,.18) 75%)`, backgroundSize: '120px 120px', backgroundPosition: '0 0, 60px 60px' }, c => {
  box(c, 0, 1200, 1080, 720, { zIndex: 2, background: WOOD, borderTop: `8px solid ${INK}` });
  const b = BOTELLA(c, 405, 341, 230, { cara: true, origin: '50% 50%' });
  const pt = PATATAS(c, 540, 900, 420);
  const chorro = box(c, 700, 830, 34, 10, { zIndex: 7, background: ROJO, border: `5px solid ${INK}`, borderRadius: '20px' });
  sello(c, 1290, 'PARA QUEDARSE', T.quedarse, { size: 96, r: -5 });
  sp(T.cocina, 'swoosh_up', 0.7); sp(T.cocina + 0.6, 'gulp', 0.7); sp(T.quedarse - 0.2, 'tada', 0.7);
  return t => {
    const kt = p(t, T.cocina + 0.5, 0.5, E.inOutCubic);
    set(b, { s: pop(t, T.cocina, 0.4), r: lerp(0, 135, kt) + Math.sin(t * 6) * 3 * kt }); botFace(b, t, { feliz: true, jaw: talkW(t, 'VECINO') * 0.7, ceja: 6 });
    set(pt, { s: pop(t, T.cocina + 0.2, 0.4), r: Math.sin(t * 5) * 2 });
    const kc = p(t, T.cocina + 0.9, 0.5, E.outCubic); chorro.style.height = px(10 + 120 * kc); set(chorro, { o: kc > 0 ? 1 : 0 });
  };
});

/* L10 · PAGO DEL GANCHO: lo de tu nevera — la nevera se abre de verdad, botella del revés, golpecito en el 57 */
headline(L(10) - 0.1, T.noSale - 0.25, 'El truco del *57*', { size: 92, hlT: T.n57 });
plano(L(10) - 0.1, T.noSale - 0.25, { background: '#C9D3E6' }, c => {
  const luz = rays(c, -160, 260, 1400, 20, 'rgba(255,240,150,.7)', 'rgba(0,0,0,0)', 3);
  const cuerpo = box(c, 290, 420, 500, 920, { zIndex: 5, background: '#fff6c8', border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 14px 0 ${INK}` });
  [300, 560].forEach(y => box(cuerpo, 20, y, 444, 10, { background: '#c9d3e6', border: `3px solid ${INK}` }));
  const b = BOTELLA(cuerpo, 160, 70, 150, { cara: true, n57: true });
  const puerta = box(c, 290, 420, 500, 920, { zIndex: 7, background: '#f4f7fb', border: `8px solid ${INK}`, borderRadius: '40px', transformOrigin: '0% 50%' });
  const cad = box(c, 230, 760, 620, 240, { zIndex: 12 }, `<svg viewBox="0 0 620 240" width="620" height="240" style="overflow:visible"><path d="M0,40 L620,200 M0,200 L620,40" stroke="#7d8790" stroke-width="26" stroke-dasharray="40 10"/><rect x="250" y="105" width="120" height="100" rx="14" fill="${GOLD}" stroke="${INK}" stroke-width="6"/></svg>`);
  sp(L(10), 'click', 0.8); sp(L(10) + 0.3, 'sparkle', 0.8); sp(T.heinz, 'ding', 0.6);
  return t => { const k = p(t, L(10) + 0.25, 0.5, E.outBack); set(cad, { o: 1 - p(t, L(10), 0.25), y: p(t, L(10), 0.25) * 300 }); set(puerta, { sx: 1 - 0.85 * k }); set(luz, { o: k, r: t * 10 }); botFace(b, t, { feliz: true, jaw: 0.4, ceja: 8 }); set(b, { y: -Math.abs(Math.sin(t * 6)) * 14 }); };
});
plano(T.noSale - 0.25, L(11) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c); cam.style.transformOrigin = '540px 807px';
  const b = BOTELLA(cam, 410, 300, 260, { n57: true, cara: true, origin: '50% 50%' });
  const ring = box(cam, 485, 752, 110, 110, { zIndex: 12, borderRadius: '50%', border: `10px solid ${PINK}` });
  const h = MANO(cam, 600, 700, -150, 1.2);
  const chorro = box(cam, 520, 976, 40, 10, { zIndex: 7, background: ROJO, border: `5px solid ${INK}`, borderRadius: '20px' });
  const pt = PATATAS(cam, 350, 1060, 380);
  const toc = texto(cam, 640, '¡toc!', { size: 70, italic: true, color: ROJO, x: 640, w: 300, z: 30 });
  return t => {
    set(b, { r: 180 * p(t, T.noSale - 0.2, 0.6, E.inOutCubic), x: Math.sin(t * 30) * (t > T.golpe ? 3 : 0) });
    botFace(b, t, { closed: t < T.cuello + 0.3, jaw: t > T.cuello + 0.3 ? 0.8 : 0.1, feliz: t > T.cuello + 0.3, ceja: t > T.cuello + 0.3 ? 12 : -4 });
    const kz = p(t, T.n57 - 0.3, 0.5, E.inOutCubic) * (1 - p(t, T.cuello + 0.6, 0.5, E.inOutCubic)); set(cam, { s: 1 + 0.5 * kz });
    set(ring, { o: t > T.n57 ? 1 : 0, s: 1 + 0.1 * Math.sin(t * 9) });
    const tap = t > T.golpe ? Math.abs(Math.sin((t - T.golpe) * 14)) : 0; set(h, { o: t > T.golpe - 0.2 ? 1 : 0, x: -tap * 30, y: tap * 24 });
    set(toc, { o: t > T.golpe && t < T.cuello + 0.3 && tap > 0.6 ? 1 : 0, r: -8 });
    const kc = p(t, T.cuello + 0.3, 0.6, E.outCubic); chorro.style.height = px(10 + 110 * kc); set(chorro, { o: kc > 0 ? 1 : 0 });
  };
});
sfx('pop2', T.golpe, 0.6); sfx('pop2', T.golpe + 0.22, 0.6); sfx('boing', T.cuello + 0.3, 0.6); sfx('tada', T.cuello + 0.5, 0.6);

/* L11 · OJO: las fechas cambian según la fuente */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const hojas = ['1835', '1837', '1840'].map((y, i) => { sp(T.fechas + i * 0.3, 'paper', 0.6); return box(c, 360 + i * 30, 540 + i * 30, 420, 320, { zIndex: 6 + i, background: CREMA, border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', textAlign: 'center', lineHeight: '320px', color: INK }, y); });
  aparece(chip(c, 400, 1000, 'según la fuente', { size: 56, bg: YEL, color: INK }), T.fuente);
  return t => hojas.forEach((h, i) => set(h, { r: Math.sin(t * 3 + i) * 6 + (i - 1) * 6, y: t > T.fechas + i * 0.3 ? 0 : -900 }));
});

/* L12 · O sea: lo que echas a las patatas… antes era medicina */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 300, 'Hoy, a las patatas…', { size: 104 });
  const b = texto(c, 440, '…antes, medicina', { size: 104, italic: true, color: ROJO });
  const bo = BOTELLA(c, 300, 560, 230, { cara: true }), bo2 = BOTELLA(c, 600, 560, 230, { cruz: true, cara: true });
  const pt = PATATAS(c, 420, 1160, 240);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.medicina12 - 0.2 ? 1 : 0, s: pop(t, T.medicina12 - 0.2, 0.35) }); set(bo, { r: Math.sin(t * 4) * 4 }); botFace(bo, t, { feliz: true, jaw: 0.3, look: [4, 0] }); set(bo2, { o: t > T.medicina12 - 0.2 ? 1 : 0, s: pop(t, T.medicina12 - 0.2, 0.4), r: -Math.sin(t * 4) * 4 }); botFace(bo2, t, { look: [-6, 0], ceja: 10 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.medicina12 - 0.2, 'stamp', 0.8);

/* L13 · pregunta final */
preguntaFinal('¿A qué le echas kétchup', 'que nadie entiende?', { size: 82, draw: c => [['a la tortilla', YEL], ['a la paella', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 360 + i * 40, 620 + i * 160, s, { size: 62, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(64, 'El kétchup', ['KETCHUP', 'farmacia']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.laxante + 0.9, T.laxante + 1.9], [T.copias + 0.6, T.copias + 1.3]], sorpresa: [[T.colera, T.colera + 0.8], [T.cuello + 0.3, T.cuello + 1.1]], golpes: [T.nevera1, T.sinTom + 0.4, T.cura + 0.45, T.ket5 + 0.3, T.laxante, T.n57] },
});
