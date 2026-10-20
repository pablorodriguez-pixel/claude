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
const BOT = 'M80,20 L120,20 L122,150 C122,190 172,210 172,262 L172,490 C172,505 160,512 146,512 L54,512 C40,512 28,505 28,490 L28,262 C28,210 78,190 78,150 Z';
const botellaInner = (o = {}) => `${cut(P(BOT), 7, 9)}<path d="${BOT}" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><path d="${BOT}" fill="url(#hA)" opacity=".35"/>
  <path d="M60,250 C50,320 50,420 58,480" stroke="#fff" stroke-width="12" opacity=".45" fill="none" stroke-linecap="round"/>
  <rect x="72" y="0" width="56" height="30" rx="6" fill="#f3efe6" stroke="${INK}" stroke-width="5"/>
  <rect x="40" y="300" width="120" height="120" rx="12" fill="${CREMA}" stroke="${INK}" stroke-width="4"/><circle cx="100" cy="340" r="20" fill="${ROJO}" stroke="${INK}" stroke-width="3"/><path d="M92,322 q8,-10 16,0" stroke="${VERDE}" stroke-width="5" fill="none"/>
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

/* L0 · PORTADA + gancho: la botella de kétchup en la estantería de la farmacia */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 270, 'El kétchup se vendía…', { size: 84 });
  const t2 = texto(c, 370, 'en la ' + hlSpan('FARMACIA', 'phl'), { size: 124, italic: true });
  const est = box(c, 80, 1160, 920, 34, { zIndex: 6, background: WOOD, border: `6px solid ${INK}`, borderRadius: '8px', boxShadow: `8px 8px 0 ${INK}` });
  const fr = [0, 1].map(i => figura(c, i ? 760 : 120, 840, 190, 259, `${FIGP('M30,60 L170,60 L180,250 L20,250 Z', '#cfe3e8', 6, .2)}<rect x="40" y="20" width="120" height="44" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="5"/><rect x="40" y="130" width="120" height="70" rx="6" fill="${CREMA}" stroke="${INK}" stroke-width="3"/><path d="M100,140 V190 M76,165 H124" stroke="${VERDE}" stroke-width="10"/>`, '0 0 200 270', { z: 7 }));
  const b = BOTELLA(c, 410, 560, 260, { cruz: true, label: 'KETCHUP' });
  const cruz = box(c, 860, 520, 150, 150, { zIndex: 5 }, `<svg viewBox="0 0 150 150" width="150" height="150"><path d="M50,0 H100 V50 H150 V100 H100 V150 H50 V100 H0 V50 H50 Z" fill="${VERDE}" stroke="${INK}" stroke-width="6"/></svg>`);
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(b, { r: Math.sin(t * 3) * 3, sy: 1 + 0.02 * Math.sin(t * 6) }); set(cruz, { s: 1 + 0.08 * Math.sin(t * 5), r: 8 }); fr.forEach((f, i) => set(f, { r: wobble(t, 0.5, 1.5, i) })); };
}, { sfx: false });

/* L1a · «como medicina»: la botella se pone bata (cruz) y una receta la envuelve */
headline(L(1) - 0.1, T.final1 - 0.1, 'Como *medicina*', { size: 92, hlT: T.medicina1 + 0.2 });
plano(L(1) - 0.1, T.final1 - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  const b = BOTELLA(cam, 420, 560, 240, { cruz: true });
  const rec = figura(cam, 600, 760, 360, 440, `${FIGP('M0,0 L360,0 L360,440 L0,440 Z', CREMA, 6, .12)}<text x="40" y="90" font-family="Playfair" font-style="italic" font-weight="900" font-size="80" fill="${INK}">Rp/</text>${[...Array(5)].map((_, k) => `<path d="M40,${150 + k * 50} H320" stroke="${INK}" stroke-width="4" opacity=".35"/>`).join('')}<text x="180" y="400" text-anchor="middle" font-family="Rye" font-size="34" fill="${ROJO}">KETCHUP</text>`, '0 0 360 440', { z: 9, origin: '0% 100%' });
  return t => { zoom(cam, t, L(1), 3); set(b, { s: pop(t, L(1), 0.4), r: Math.sin(t * 4) * 4 }); set(rec, { r: lerp(-60, -8, p(t, T.medicina1, 0.5, E.outBack)), o: t > T.medicina1 - 0.05 ? 1 : 0 }); };
});
/* L1b · «el final… lo tienes en tu nevera»: la nevera se cierra con un candado de intriga */
plano(T.final1 - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const f = box(c, 290, 420, 500, 900, { zIndex: 6, background: '#f4f7fb', border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 14px 0 ${INK}`, transformOrigin: '0 50%' });
  box(f, 0, 300, 484, 8, { background: INK }); box(f, 410, 120, 20, 120, { background: INK, borderRadius: '10px' }); box(f, 410, 380, 20, 160, { background: INK, borderRadius: '10px' });
  const q = texto(c, 760, '?', { size: 300, color: ROJO, x: 290, w: 500, z: 8 });
  const tag = chip(c, 330, 1340 - 60, 'el final está aquí', { size: 56, bg: YEL, color: INK });
  return t => { set(f, { sx: 1 - 0.15 * Math.abs(Math.sin(Math.min(t - T.nevera1, 0.6) * 10)) * (t > T.nevera1 ? 1 : 0) }); set(q, { s: pop(t, T.nevera1, 0.4), o: t > T.nevera1 ? 1 : 0, r: Math.sin(t * 5) * 8 }); popA(tag, t, T.nevera1 + 0.4, { r: -3 }); };
});

/* L2 · China: pez → tarro que fermenta → cuenco de «kê-tsiap»; tomate tachado */
headline(L(2) - 0.1, L(3) - 0.1, 'Empieza en *China*', { size: 90, hlT: T.china + 0.1 });
plano(L(2) - 0.1, T.ferm - 0.05, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const pz = [0, 1, 2].map(i => PEZ(cam, -320, 520 + i * 170, 300));
  const tarro = figura(cam, 600, 640, 320, 450, `${FIGP('M30,80 L290,80 L280,430 L40,430 Z', 'rgba(190,225,235,.6)', 6, .15)}<rect x="20" y="40" width="280" height="50" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="6"/><rect class="liq" x="44" y="200" width="232" height="226" fill="#7a5a32" opacity=".75"/>`, '0 0 320 450', { z: 8 });
  return t => { zoom(cam, t, L(2), 4); pz.forEach((f, i) => { const k = p(t, T.salsa - 0.4 + i * 0.2, 0.7, E.inOutCubic); set(f, { x: k * 900, y: -Math.sin(k * Math.PI) * 140 + k * 120, r: k * 160, s: 1 - 0.6 * k, o: k < 0.98 ? 1 : 0 }); }); set(tarro, { r: t > T.pescado ? Math.sin(t * 20) * 2 : 0 }); };
});
plano(T.ferm - 0.05, L(3) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const cu = CUENCO(cam, 240, 700, 600);
  const bb = burbujas(cam, 420, 640);
  const nom = texto(cam, 1130, '«kê-tsiap»', { size: 120, italic: true, color: '#6b4a2a' });
  const tm = TOMATE(cam, 760, 400, 220);
  const x = box(cam, 740, 390, 260, 260, { zIndex: 20 }, XSVG);
  return t => { zoom(cam, t, T.ferm, 2.5); bb.forEach((b, i) => set(b, { y: -((t * 120 + i * 50) % 200), o: 0.9, s: 0.6 + 0.4 * Math.sin(t * 4 + i) })); set(nom, { s: pop(t, T.ferm + 0.1, 0.4), o: t > T.ferm + 0.1 ? 1 : 0 }); set(tm, { o: t > T.sinTom - 0.3 ? 1 : 0, s: pop(t, T.sinTom - 0.3, 0.35) }); tomFace(tm, t, [-6, 4]); set(x, { o: t > T.sinTom + 0.4 ? 1 : 0, s: pop(t, T.sinTom + 0.4, 0.3) }); };
});

/* L3 · los marineros ingleses la copian con lo que pillan: champiñones, nueces, anchoas → a la olla */
headline(L(3) - 0.1, L(4) - 0.1, 'Copia *inglesa*', { size: 90, hlT: T.copian });
plano(L(3) - 0.1, T.champi - 0.15, { background: '#C9D3E6' }, c => {
  const mar = box(c, 0, 1100, 1080, 820, { zIndex: 4, background: '#5c87b5', borderTop: `8px solid ${INK}` });
  const br = BARCO(c, -560, 620, 560);
  return t => { set(br, { x: lerp(300, 1500, p(t, L(3), T.champi - L(3) + 0.3, E.inOutCubic)), y: Math.sin(t * 3) * 14, r: Math.sin(t * 2.4) * 4 }); };
});
plano(T.champi - 0.15, L(4) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const o = OLLA(cam, 300, 960, 480);
  const ings = [['seta', T.champi, 160], ['nuez', T.nueces, 440], ['anchoa', T.anchoas, 720]].map(([k, t0, x]) => [ING(cam, x, 480, 220, k), t0, x]);
  const lbs = [['champiñones', T.champi, 110], ['nueces', T.nueces, 420], ['anchoas', T.anchoas, 700]].map(([s, t0, x]) => [chip(cam, x, 760, s, { size: 46, bg: '#fff', color: INK }), t0]);
  return t => { zoom(cam, t, T.champi, 3); ings.forEach(([e, t0, x]) => { const kin = p(t, t0 - 0.1, 0.35, E.outBack), kfall = p(t, t0 + 0.9, 0.4, E.inCubic); set(e, { s: kin * (1 - 0.5 * kfall), o: t > t0 - 0.1 && kfall < 1 ? 1 : 0, x: (540 - 110 - x) * kfall, y: 520 * kfall, r: kfall * 200 }); }); lbs.forEach(([e, t0]) => popA(e, t, t0, { r: -3, o: 1 - p(t, t0 + 0.9, 0.2) })); set(o, { r: Math.sin(t * 18) * (t > T.champi + 0.9 ? 1.5 : 0) }); };
});

/* L4 · 1834: un médico americano anuncia que el tomate lo cura todo */
headline(L(4) - 0.1, L(5) - 0.1, '*1834*: el tomate milagro', { size: 84, hlT: T.m1834 });
plano(L(4) - 0.1, L(5) - 0.1, { background: '#E9D7B0' }, c => {
  const cam = CAM(c);
  const doc = mkBust(cam, [80, 600, 420, 537], { hat: 'brodie', moustache: true, beard: true, seed: 34 });
  aparece(chip(cam, 90, 1150, 'médico americano', { size: 50, bg: '#fff', color: INK }), T.medico);
  const bs = rays(cam, 300, 360, 900, 16, 'rgba(255,230,0,.55)', 'rgba(0,0,0,0)', 4);
  const tm = TOMATE(cam, 560, 560, 400);
  const cr = sello(c, 1180, '¡LO CURA TODO!', T.cura, { size: 100, r: -6 });
  return t => { zoom(cam, t, L(4), 5); face(doc, t, { look: t > T.tomate4 ? [8, -2] : [0, 0], bL: t > T.cura ? 10 : 0, bR: t > T.cura ? 10 : 0, jaw: talkW(t, 'VECINO') * 0.6, seed: 0.2 }); set(tm, { o: t > T.tomate4 - 0.2 ? 1 : 0, s: pop(t, T.tomate4 - 0.2, 0.5) * (1 + 0.04 * Math.sin(t * 6)), y: -Math.abs(Math.sin(t * 3)) * 20 }); tomFace(tm, t, [-8, -2]); const sp = tm.querySelector('.boca'); sp.setAttribute('d', t > T.cura ? 'M110,205 Q150,250 190,205' : 'M118,210 Q150,238 182,210'); };
});

/* L5 · la diarrea, la indigestión… ¡hasta el cólera! Y receta… kétchup */
headline(L(5) - 0.1, L(6) - 0.1, 'Según él, cura…', { size: 84 });
plano(L(5) - 0.1, T.receta - 0.1, PAPEL, c => {
  const items = [['la diarrea', T.diarrea], ['la indigestión', T.indig], ['¡el cólera!', T.colera]].map(([s, t0], i) => {
    const row = box(c, 140, 520 + i * 230, 800, 170, { zIndex: 8, background: CREMA, border: `6px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}` });
    el('div', row, { left: '40px', top: '30px', fontFamily: 'Playfair', fontWeight: 900, fontStyle: 'italic', fontSize: '84px', color: INK }, s);
    const ck = box(c, 820, 520 + i * 230 - 10, 170, 170, { zIndex: 9 }, CHECK); return [row, ck, t0];
  });
  return t => items.forEach(([r, ck, t0], i) => { set(r, { x: (1 - p(t, t0 - 0.15, 0.35, E.outBack)) * -1100, r: i % 2 ? 1.5 : -1.5 }); stampA(ck, t, t0 + 0.35, -8); });
});
plano(T.receta - 0.1, L(6) - 0.1, { background: YEL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const rec = figura(c, 220, 420, 640, 780, `${FIGP('M0,0 L640,0 L640,780 L0,780 Z', CREMA, 7, .12)}<text x="60" y="140" font-family="Playfair" font-style="italic" font-weight="900" font-size="130" fill="${INK}">Rp/</text>${[...Array(4)].map((_, k) => `<path d="M60,${240 + k * 70} H580" stroke="${INK}" stroke-width="5" opacity=".3"/>`).join('')}`, '0 0 640 780', { z: 6, origin: '50% 50%' });
  const b = BOTELLA(c, 430, 700, 220);
  return t => { set(rec, { s: pop(t, T.receta - 0.1, 0.4), r: -3 }); set(b, { o: t > T.ket5 - 0.1 ? 1 : 0, y: (1 - p(t, T.ket5 - 0.1, 0.45, E.outBack)) * -900, r: Math.sin(t * 5) * 3 }); };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · alguien huele el negocio: píldoras de tomate que se venden como churros */
headline(L(7) - 0.1, L(8) - 0.1, 'Píldoras de *tomate*', { size: 90, hlT: T.pastillas });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#E9C6BE' }, c => {
  const cam = CAM(c);
  const nariz = box(cam, 400, 420, 280, 200, { zIndex: 9 }, `<svg viewBox="0 0 280 200" width="280" height="200" style="overflow:visible"><path d="M40,120 C80,40 200,40 240,120" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/><text x="140" y="190" text-anchor="middle" font-family="Rye" font-size="60" fill="${VERDE}">$ $ $</text></svg>`);
  const cj = CAJAP(cam, 330, 620, 420, 'Dr. Miles', ROJO);
  const pil = box(cam, 0, 0, 1080, 1920, { zIndex: 11 }); let s = ''; const R = rng(7); for (let i = 0; i < 40; i++) s += `<g class="pl">${pildora(f1(80 + R() * 920), f1(1000 + R() * 300), f1(R() * 180))}</g>`; pil.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${s}</svg>`; const pls = [...pil.querySelectorAll('.pl')];
  const stack = [...Array(8)].map((_, i) => CAJAP(cam, 60 + (i % 4) * 250, 1140 - Math.floor(i / 4) * 150, 220, '', i % 2 ? '#2b4a8c' : ROJO));
  return t => { zoom(cam, t, L(7), 5); set(nariz, { o: t < T.pastillas ? 1 : 0, y: Math.sin(t * 8) * 8 }); set(cj, { s: pop(t, T.pastillas, 0.45), o: t > T.pastillas ? 1 : 0, r: Math.sin(t * 3) * 2 }); pls.forEach((g, i) => g.style.opacity = t > T.pastillas + 0.3 + i * 0.03 && t < T.churros ? 1 : 0); stack.forEach((e, i) => set(e, { o: t > T.churros + i * 0.08 ? 1 : 0, y: (1 - p(t, T.churros + i * 0.08, 0.3, E.outBack)) * -500 })); };
});

/* L8 · salen copias por todas partes… y algunas llevaban LAXANTE */
headline(L(8) - 0.1, T.vez - 0.1, 'Copias por *todas partes*', { size: 82, hlT: T.partes });
plano(L(8) - 0.1, T.vez - 0.1, PAPEL, c => {
  const nombres = ['Dr. Miles', 'Dr. Phelps', 'Dr. Holcombe', 'Dr. Nadie', '¿Dr.?', 'Dr. Prisas'];
  const cs = nombres.map((n, i) => CAJAP(c, 60 + (i % 3) * 330, 520 + Math.floor(i / 3) * 330, 300, n, ['#2b4a8c', ROJO, VERDE][i % 3]));
  return t => cs.forEach((e, i) => set(e, { s: pop(t, T.copias + i * 0.18, 0.35), o: t > T.copias + i * 0.18 ? 1 : 0, r: Math.sin(t * 4 + i) * 4 }));
});
plano(T.vez - 0.1, L(9) - 0.1, { background: '#E9D7B0' }, c => {
  const cj = CAJAP(c, 330, 420, 420, 'Dr. Prisas', ROJO);
  const lx = stamp(c, 300, 600, 'LAXANTE', { size: 110, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const hombre = mkBust(c, [80, 800, 380, 486], { hat: 'cap', moustache: true, seed: 52 });
  const grr = texto(c, 1130, 'grrrr…', { size: 90, italic: true, x: 40, w: 440, color: '#6b4a2a' });
  const wc = figura(c, 620, 760, 340, 560, `${FIGP('M20,20 L320,20 L320,560 L20,560 Z', WOOD, 7, .3)}<rect x="90" y="70" width="160" height="90" rx="10" fill="${CREMA}" stroke="${INK}" stroke-width="5"/><text x="170" y="135" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">WC</text><circle cx="270" cy="320" r="16" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`, '0 0 340 580', { z: 7, origin: '0% 50%' });
  return t => { stampA(lx, t, T.laxante, -10); face(hombre, t, { look: t > T.laxante + 0.3 ? [10, 0] : [0, 0], bL: t > T.laxante ? 12 : 0, bR: t > T.laxante ? 12 : 0, seed: 0.5 }); set(hombre.d, { x: t > T.laxante + 0.9 ? p(t, T.laxante + 0.9, 0.4, E.inCubic) * 700 : Math.sin(t * 30) * (t > T.laxante ? 4 : 0), o: t > T.laxante + 1.25 ? 0 : 1 }); set(grr, { o: t > T.laxante + 0.2 && t < T.laxante + 1.0 ? 1 : 0, x: Math.sin(t * 40) * 6 }); set(wc, { sx: t > T.laxante + 1.25 ? 1 : 1 - 0.5 * p(t, T.laxante + 0.8, 0.3) }); };
});
shakeAt(T.laxante + 1.25, 0.3, 14); sfx('thud', T.laxante + 1.25, 1.0);
emu(L(9) - 1.0);

/* L9 · hacia 1850 la moda muere (lápida) y el kétchup vuelve a la cocina para quedarse */
headline(L(9) - 0.1, L(10) - 0.1, 'Hacia *1850*', { size: 92, hlT: T.m1850 });
plano(L(9) - 0.1, T.cocina - 0.1, { background: '#C9D3E6' }, c => {
  const suelo = box(c, 0, 1160, 1080, 760, { zIndex: 3, background: '#7a9a52', borderTop: `8px solid ${INK}` });
  const tb = figura(c, 340, 1240, 400, 480, tumbaInner(), '0 0 300 360', { z: 6, origin: '50% 100%' });
  return t => set(tb, { y: -480 * p(t, T.muere - 0.2, 0.5, E.outBack), r: -2 });
});
plano(T.cocina - 0.1, L(10) - 0.1, { background: YEL }, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,255,255,.35)', 'rgba(0,0,0,0)', 0);
  const b = BOTELLA(c, 230, 520, 230);
  const pt = PATATAS(c, 540, 820, 420);
  sello(c, 1220 - 40, 'PARA QUEDARSE', T.quedarse, { size: 96, r: -5 });
  return t => { set(b, { s: pop(t, T.cocina, 0.4), r: lerp(0, 110, p(t, T.cocina + 0.5, 0.5, E.inOutCubic)), x: 140 * p(t, T.cocina + 0.5, 0.5) }); set(pt, { s: pop(t, T.cocina + 0.2, 0.4) }); };
});

/* L10 · PAGO DEL GANCHO: lo de tu nevera — golpecito en el 57 del cuello */
headline(L(10) - 0.1, T.n57 - 0.3, 'El truco del *57*', { size: 92, hlT: T.n57 });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c); cam.style.transformOrigin = '540px 807px';
  const b = BOTELLA(cam, 410, 300, 260, { n57: true, origin: '50% 50%' });
  const ring = box(cam, 485, 752, 110, 110, { zIndex: 12, borderRadius: '50%', border: `10px solid ${PINK}` });
  const h = MANO(cam, 600, 700, -150, 1.2);
  const chorro = box(cam, 520, 976, 40, 10, { zIndex: 7, background: ROJO, border: `5px solid ${INK}`, borderRadius: '20px' });
  const pt = PATATAS(cam, 350, 1060, 380);
  return t => {
    set(b, { r: 180 * p(t, T.noSale - 0.2, 0.6, E.inOutCubic), x: Math.sin(t * 30) * (t > T.golpe ? 3 : 0) });
    const kz = p(t, T.n57 - 0.3, 0.5, E.inOutCubic) * (1 - p(t, T.cuello + 0.6, 0.5, E.inOutCubic)); set(cam, { s: 1 + 0.5 * kz });
    set(ring, { o: t > T.n57 ? 1 : 0, s: 1 + 0.1 * Math.sin(t * 9) });
    const tap = t > T.golpe ? Math.abs(Math.sin((t - T.golpe) * 14)) : 0; set(h, { o: t > T.golpe - 0.2 ? 1 : 0, x: -tap * 30, y: tap * 24 });
    const kc = p(t, T.cuello + 0.3, 0.6, E.outCubic); chorro.style.height = px(10 + 110 * kc); set(chorro, { o: kc > 0 ? 1 : 0 });
  };
});
sfx('pop2', T.golpe, 0.6); sfx('pop2', T.golpe + 0.22, 0.6); sfx('boing', T.cuello + 0.3, 0.6);

/* L11 · OJO: las fechas cambian según la fuente */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const hojas = ['1835', '1837', '1840'].map((y, i) => { const h = box(c, 360 + i * 30, 540 + i * 30, 420, 320, { zIndex: 6 + i, background: CREMA, border: `6px solid ${INK}`, borderRadius: '16px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '130px', textAlign: 'center', lineHeight: '320px', color: INK }, y); return h; });
  aparece(chip(c, 400, 1000, 'según la fuente', { size: 56, bg: YEL, color: INK }), T.fuente);
  return t => hojas.forEach((h, i) => set(h, { r: Math.sin(t * 3 + i) * 6 + (i - 1) * 6, y: t > T.fechas + i * 0.3 ? 0 : -900 }));
});

/* L12 · O sea: lo que echas a las patatas… antes era medicina */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 300, 'Hoy, a las patatas…', { size: 104 });
  const b = texto(c, 440, '…antes, medicina', { size: 104, italic: true, color: ROJO });
  const bo = BOTELLA(c, 260, 640, 230), bo2 = BOTELLA(c, 600, 640, 230, { cruz: true });
  const pt = PATATAS(c, 140, 1060, 300);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.medicina12 - 0.2 ? 1 : 0, s: pop(t, T.medicina12 - 0.2, 0.35) }); set(bo, { r: Math.sin(t * 4) * 4 }); set(bo2, { o: t > T.medicina12 - 0.2 ? 1 : 0, s: pop(t, T.medicina12 - 0.2, 0.4), r: -Math.sin(t * 4) * 4 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14);

/* L13 · pregunta final */
preguntaFinal('¿A qué le echas kétchup', 'que nadie entiende?', { size: 82, draw: c => [['a la tortilla', YEL], ['a la paella', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 160 + i * 60, 620 + i * 160, s, { size: 62, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(64, 'El kétchup', ['KETCHUP', 'farmacia']);

Story.run({ ovalo: [[L(11), L(12) - 0.15]] });
