/* Ep. 76 · Salem 1692: no quemaron a ninguna bruja — edición estilo ep07/ep64 (escenarios llenos, caras, Vecino fijo). Blanco: sin violencia gráfica */
Story.prepara();
const T = {
  quemaron0: Q('no quemaron'), bruja0: Q('ninguna bruja'),
  distinto: Q('fue distinto'), uno1: Q('a uno'), peor1: Q('bastante peor'),
  mass: Q('massachusetts'), m1692: Q('mil seiscientos noventa y dos'), ninas: Q('unas niñas'), ataques: Q('tener ataques'), gritos: Q('gritos'), conv: Q('convulsiones'), senalan: Q('señalan a sus vecinas'),
  meses: Q('en pocos meses'), dosc: Q('más de doscientas'), acusadas: Q('acusadas de brujería'),
  diecinueve: Q('diecinueve'), horca4: Q('en la horca'), ahorc: Q('ahorcadas'), noQuem: Q('no quemadas'), ley: Q('la ley inglesa'), castig: Q('se castigaba así'),
  granjero: Q('un granjero'), ochenta: Q('más de ochenta años'), giles: Q('giles corey'), algo: Q('algo peor'), aplastan: Q('lo aplastan'), piedras5: Q('con piedras'), hable: Q('para que hable'),
  noDice: Q('no dice nada'), leyenda: Q('según la leyenda'), ultimas: Q('sus últimas palabras'), peso: Q('más peso'),
  hogueras: Q('las hogueras'), europa: Q('de europa'), alli: Q('allí sí se quemaba'), mezclo: Q('se mezcló todo'),
  derrumba: Q('se derrumba'), gobernador: Q('el gobernador'), para9: Q('lo para'), acusan: Q('cuando acusan'), mujer: Q('a su propia mujer'),
  anos: Q('años después'), juez: Q('un juez'), perdon: Q('pide perdón'), indem: Q('se indemniza'), familias: Q('a las familias'),
  ojo: Q('ojo'), causa: Q('la causa'), discute: Q('se discute'),
  hoguera12: Q('en la hoguera'), horca12: Q('en la horca'),
};
const ROJO = '#c8102e', VERDE = '#2e7a4a', CREMA = '#FBF6EA', CIELO = '#c9d3e6';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const MANO = (c, x, y, rot = -40, s = 1.3) => { const h = box(c, x, y, 180, 180, { zIndex: 30 }); h.innerHTML = `<svg viewBox="-60 -70 120 120" width="180" height="180" style="overflow:visible">${gloveHand(0, 0, rot, s)}</svg>`; return h; };

/* ---------- figuras ---------- */
const HEBILLA = `<rect x="158" y="118" width="44" height="32" fill="none" stroke="${GOLD}" stroke-width="8"/>`;
const PURITANO = (c, b, seed, o = {}) => { const f = mk(c, b, bustInner(Object.assign({ moustache: seed % 2 === 0, beard: seed % 3 === 0, seed }, o)) + TOPHAT('#1e1a17') + HEBILLA, '0 0 360 460', 'bust'); return f; };
const COFIA = `<path d="M96,300 C70,150 120,96 182,96 C244,96 294,150 268,300 L252,300 C262,190 230,150 182,150 C134,150 102,190 112,300 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M120,300 L100,360 M244,300 L264,360" stroke="${INK}" stroke-width="5"/><path d="M150,420 L182,450 L214,420 Z" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
const NINA = (c, b, seed) => mk(c, b, bustInner({ uniform: 'farmer', seed }) + COFIA, '0 0 360 460', 'bust');
const rayitos = (c, x, y, w) => box(c, x, y, w, w, { zIndex: 12 }, `<svg viewBox="0 0 200 200" width="${w}" height="${w}" style="overflow:visible">${[0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * Math.PI * 2; const x0 = 100 + Math.cos(a) * 70, y0 = 100 + Math.sin(a) * 70; return `<path d="M${f1(x0)},${f1(y0)} l${f1(Math.cos(a) * 18 - Math.sin(a) * 10)},${f1(Math.sin(a) * 18 + Math.cos(a) * 10)} l${f1(Math.cos(a) * 18 + Math.sin(a) * 10)},${f1(Math.sin(a) * 18 - Math.cos(a) * 10)}" stroke="${GOLD}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }).join('')}</svg>`);
const casasSvg = () => [[0, 230, '#8a5a32'], [230, 260, '#a0522d'], [490, 220, '#7a5a3a'], [710, 250, '#8a6a42'], [960, 200, '#a0522d']].map(([x, w, col]) => `<path d="M${x + 10},420 V200 L${x + w / 2},90 L${x + w - 10},200 V420 Z" fill="${col}" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3].map(k => `<path d="M${x + 12},${230 + k * 45} H${x + w - 12}" stroke="${INK}" stroke-width="2" opacity=".35"/>`).join('')}<rect x="${x + w / 2 - 28}" y="300" width="56" height="120" fill="#4a3320" stroke="${INK}" stroke-width="5"/><rect x="${x + 30}" y="220" width="46" height="46" fill="#f3d27a" stroke="${INK}" stroke-width="5"/><rect x="${x + w - 30}" y="40" width="30" height="${100 + (x % 3) * 10}" fill="#6b4a2a" stroke="${INK}" stroke-width="5" transform="translate(-30 60)"/>`).join('');
const PUEBLO = (c, y, z = 3) => { const d = box(c, -40, y, 1200, 420, { zIndex: z }); d.innerHTML = `<svg viewBox="0 0 1160 420" width="1160" height="420">${casasSvg()}</svg>`; return d; };
const HOGUERA = (c, x, y, w, z = 8) => figura(c, x, y, w, w * 1.3, `<path d="M100,10 V200" stroke="#6b4a2a" stroke-width="20"/><path d="M20,250 L180,210 M20,210 L180,250 M40,260 L160,190" stroke="#8a5a32" stroke-width="18" stroke-linecap="round"/><path class="fl" d="M40,220 C30,160 70,150 70,110 C90,150 100,120 100,80 C130,130 150,140 140,200 C170,170 170,230 150,240 Z" fill="#f28c28" stroke="${INK}" stroke-width="6"/><path d="M80,225 C75,190 95,180 100,150 C115,185 125,190 120,225 Z" fill="${GOLD}"/>`, '0 0 200 260', { z, origin: '50% 100%' });
const SOGA = (c, x, y, w, z = 8) => figura(c, x, y, w, w * 1.3, `<path d="M20,250 V20 H170 M20,60 L60,20" stroke="#4a3320" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M150,20 V110" stroke="#c9a86a" stroke-width="9"/><ellipse cx="150" cy="135" rx="22" ry="28" fill="none" stroke="#c9a86a" stroke-width="9"/>`, '0 0 200 260', { z, origin: '50% 100%' });
const PIEDRA = (c, w) => box(c, 0, 0, w, w * 0.62, { zIndex: 12, background: '#9aa0a6', border: `6px solid ${INK}`, borderRadius: '46% 54% 40% 60% / 60% 50% 50% 40%', boxShadow: `inset -10px -10px 0 rgba(0,0,0,.18)` });
const tachar = (c, x, y, w) => box(c, x, y, w, w, { zIndex: 20 }, XSVG);

/* L0 · PORTADA (fotograma 0 completo): pueblo puritano; la hoguera se tacha y queda la soga; niñas con ataques que señalan */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'En Salem no quemaron…', { size: 74 });
  const t2 = texto(c, 345, 'a ' + hlSpan('NINGUNA', 'phl') + ' bruja', { size: 100, italic: true });
  PUEBLO(c, 560, 2);
  const ho = HOGUERA(c, 380, 640, 320, 6);
  const x = tachar(c, 360, 680, 360);
  const n = [NINA(c, [60, 820, 300, 371], 4), NINA(c, [760, 830, 280, 347], 7)]; n.forEach(e => e.d.style.zIndex = 9);
  const rz = [rayitos(c, 40, 760, 300), rayitos(c, 740, 770, 300)];
  const ma = [MANO(c, 300, 900, 10, 1.1), MANO(c, 640, 910, 170, 1.1)];
  const st = stamp(c, 330, 1180, 'NI UNA', { size: 96, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.bruja0, 'stamp', 1); sp(T.quemaron0, 'scratch', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    ho.querySelector('.fl').setAttribute('transform', `translate(100 240) scale(${f1(1 + 0.08 * Math.sin(t * 14))} ${f1(1 + 0.12 * Math.sin(t * 11))}) translate(-100 -240)`);
    set(x, { s: 1 + 0.06 * Math.sin(t * 6), r: 4 });
    n.forEach((e, i) => { set(e.d, { x: Math.sin(t * 30 + i) * 6, r: Math.sin(t * 18 + i) * 4 }); face(e, t, { closed: Math.sin(t * 7 + i) > 0, jaw: talkW(t, 'VECINO') * (i ? 0.5 : 1), bL: 14, bR: 14, seed: i }); });
    rz.forEach((r, i) => set(r, { r: t * 120 * (i ? -1 : 1), o: 0.6 + 0.4 * Math.sin(t * 20 + i) }));
    ma.forEach((m, i) => set(m, { x: Math.sin(t * 8 + i) * 12 }));
    stampA(st, t, T.bruja0, -8);
  };
}, { sfx: false });

/* L1 · lo que les hicieron fue distinto… y a uno, bastante peor: telón con signo de interrogación y un tablón con piedras tapado */
headline(L(1) - 0.1, L(2) - 0.1, 'Fue *distinto*…', { size: 92, hlT: T.distinto });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#6b2a2a', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 30px, transparent 30px 90px)' }, c => {
  const cam = CAM(c);
  const foco = box(cam, 190, 380, 700, 1000, { zIndex: 2, background: 'radial-gradient(ellipse at 50% 30%, rgba(255,240,180,.75), transparent 70%)' });
  const lona = box(cam, 290, 560, 500, 520, { zIndex: 6, background: '#d8c3a0', border: `8px solid ${INK}`, borderRadius: '30px 30px 10px 10px', boxShadow: `14px 14px 0 ${INK}` }, `<div style="font-family:Rye;font-size:260px;text-align:center;line-height:500px;color:${ROJO}">?</div>`);
  const pi = [0, 1, 2].map(i => PIEDRA(cam, 150));
  const cand = texto(cam, 1130, 'para uno…', { size: 96, italic: true, color: '#fff', x: 300, w: 740, shadow: `5px 5px 0 ${INK}` });
  sp(T.distinto, 'whoosh', 0.6); sp(T.uno1, 'drumroll', 0.7); sp(T.peor1, 'thud', 1);
  return t => {
    zoom(cam, t, L(1), 4, 0.1); set(foco, { o: 0.7 + 0.3 * Math.sin(t * 3) });
    set(lona, { s: pop(t, L(1), 0.4), r: Math.sin(t * 2) * 2, y: t > T.peor1 ? Math.sin(t * 30) * 4 : 0 });
    pi.forEach((s, i) => { const k = p(t, T.peor1 - 0.1 + i * 0.12, 0.35, E.inCubic); set(s, { x: 340 + i * 160, y: lerp(-300, 1000 - i * 0, k), o: t > T.peor1 - 0.1 + i * 0.12 ? 1 : 0, r: i * 20 }); });
    set(cand, { o: t > T.uno1 ? 1 : 0, s: pop(t, T.uno1, 0.35) });
  };
});
shakeAt(T.peor1 + 0.25, 0.35, 16);

/* L2 · Massachusetts 1692: pueblo puritano; unas niñas con ataques (rayitos, gritos) señalan a las vecinas */
headline(L(2) - 0.1, L(3) - 0.1, 'Salem, *1692*', { size: 96, hlT: T.m1692 });
plano(L(2) - 0.1, T.senalan - 0.1, { background: CIELO }, c => {
  const cam = CAM(c);
  const nubes = [[80, 420], [620, 480]].map(([x, y]) => box(cam, x, y, 260, 90, { zIndex: 1, background: '#eef0f4', border: `6px solid ${INK}`, borderRadius: '60px' }));
  PUEBLO(cam, 640, 2);
  box(cam, 0, 1060, 1080, 900, { zIndex: 3, background: '#9aa860', borderTop: `8px solid ${INK}` });
  const mapa = chip(cam, 340, 420, 'Massachusetts', { size: 58, bg: '#fff', color: INK });
  const ns = [[300, 860, 1], [530, 850, 5], [760, 870, 8]].map(([x, y, s]) => NINA(cam, [x, y, 230, 285], s)); ns.forEach(e => e.d.style.zIndex = 8);
  const rz = ns.map((e, i) => rayitos(cam, [280, 510, 740][i], 840, 270));
  const gr = ['¡AAAH!', '¡AY!', '¡IIIH!'].map((s, i) => texto(cam, 760 - i * 30, s, { size: 64, color: ROJO, x: [260, 520, 760][i], w: 260, z: 25, shadow: `3px 3px 0 ${INK}` }));
  sp(T.mass, 'pop', 0.5); sp(T.ninas, 'pop2', 0.6); sp(T.ataques, 'glitch', 0.7); sp(T.gritos, 'boing', 0.6); sp(T.conv, 'glitch', 0.8);
  return t => {
    zoom(cam, t, L(2), 6, 0.05); nubes.forEach((n, i) => set(n, { x: ((t * 22 + i * 420) % 1300) - 260 }));
    popA(mapa, t, T.mass, { r: -3 });
    const crazy = t > T.ataques;
    ns.forEach((e, i) => { set(e.d, { o: t > T.ninas + i * 0.15 ? 1 : 0, s: pop(t, T.ninas + i * 0.15, 0.35), x: crazy ? Math.sin(t * 35 + i) * 8 : 0, r: t > T.conv ? Math.sin(t * 22 + i * 2) * 8 : 0 }); face(e, t, { closed: crazy && Math.sin(t * 9 + i) > 0, jaw: t > T.gritos ? 0.8 : 0, bL: crazy ? 16 : 0, bR: crazy ? 16 : 0, look: [0, -8], seed: i }); });
    rz.forEach((r, i) => set(r, { o: crazy ? 0.5 + 0.5 * Math.sin(t * 20 + i) : 0, r: t * 140 * (i % 2 ? -1 : 1) }));
    gr.forEach((g, i) => set(g, { o: t > T.gritos + i * 0.15 ? 1 : 0, s: pop(t, T.gritos + i * 0.15, 0.25), y: Math.sin(t * 16 + i) * 8, r: (i - 1) * 10 }));
  };
});
plano(T.senalan - 0.1, L(3) - 0.1, { background: CIELO }, c => {
  const cam = CAM(c);
  PUEBLO(cam, 640, 2);
  box(cam, 0, 1060, 1080, 900, { zIndex: 3, background: '#9aa860', borderTop: `8px solid ${INK}` });
  const nina = NINA(cam, [320, 760, 300, 371], 5); nina.d.style.zIndex = 8;
  const ma = MANO(cam, 560, 820, 0, 1.4);
  const vec = [PURITANO(cam, [720, 640, 260, 333], 3), PURITANO(cam, [760, 900, 240, 307], 6)];
  const yo = BOCADILLO(cam, 640, 470, '¿¡YO!?', { size: 60 });
  sp(T.senalan, 'stamp', 0.9); sp(T.senalan + 0.4, 'boing', 0.7);
  return t => {
    zoom(cam, t, T.senalan, 2, 0.1);
    set(nina.d, { x: Math.sin(t * 30) * 5 }); face(nina, t, { look: [10, -2], bL: 16, bR: 4, jaw: 0.5, seed: 0.3 });
    set(ma, { x: Math.sin(t * 10) * 12, s: pop(t, T.senalan, 0.3) });
    vec.forEach((v, i) => { set(v.d, { o: 1, y: t > T.senalan + 0.3 ? -Math.abs(Math.sin(t * 20 + i)) * 10 : 0 }); face(v, t, { look: [-10, 0], bL: t > T.senalan + 0.2 ? 18 : 0, bR: t > T.senalan + 0.2 ? 18 : 0, jaw: t > T.senalan + 0.3 ? 0.7 : 0, seed: i }); });
    popA(yo, t, T.senalan + 0.4, { r: 4 });
  };
});
shakeAt(T.senalan, 0.3, 12);

/* L3 · en pocos meses, más de 200 acusados: contador que sube y una avalancha de sombreros puritanos */
headline(L(3) - 0.1, L(4) - 0.1, 'Acusados de *brujería*', { size: 86, hlT: T.acusadas });
plano(L(3) - 0.1, L(4) - 0.1, { background: '#e6dcc6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 4px, transparent 4px 70px)' }, c => {
  const cam = CAM(c);
  const cal = box(cam, 120, 380, 300, 200, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '70px', textAlign: 'center', lineHeight: '190px', color: INK }, 'FEBRERO');
  const n = texto(cam, 380, '0', { size: 200, color: ROJO, x: 440, w: 600 });
  const R = rng(76); const gente = [...Array(28)].map((_, i) => PURITANO(cam, [300 + (i % 7) * 105, 640 + Math.floor(i / 7) * 120, 140, 179], 10 + i));
  const sb = stamp(cam, 300, 1170, '+200', { size: 110, z: 30 });
  const meses = ['FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO'];
  sp(T.meses, 'paper', 0.6); [...Array(8)].forEach((_, i) => sp(T.meses + 0.3 + i * 0.25, 'tick', 0.4)); sp(T.dosc, 'stamp', 1);
  return t => {
    zoom(cam, t, L(3), 3.5, 0.06);
    const k = clamp(p(t, T.meses, T.dosc + 0.4 - T.meses)); cal.textContent = meses[Math.min(5, Math.floor(k * 6))]; set(cal, { r: Math.sin(t * 18) * (k < 1 ? 2 : 0) });
    n.textContent = t > T.dosc ? '+200' : String(Math.round(k * 190));
    gente.forEach((g, i) => { const t0 = T.meses + i * 0.08; set(g.d, { o: t > t0 ? 1 : 0, y: (1 - p(t, t0, 0.3, E.outBack)) * -300 }); face(g, t, { look: [0, -6], bL: 10, bR: 10, seed: i }); });
    stampA(sb, t, T.dosc, -8);
  };
});
shakeAt(T.dosc, 0.3, 14);

/* L4 · 19 en la horca (silueta lejana), no quemadas: la hoguera se tacha en vivo; sello «LEY INGLESA» */
headline(L(4) - 0.1, L(5) - 0.1, 'Ahorcadas, *no quemadas*', { size: 84, hlT: T.noQuem });
plano(L(4) - 0.1, L(5) - 0.1, { background: '#d9b88a', backgroundImage: 'linear-gradient(180deg, #e9a070 0%, #d9b88a 60%)' }, c => {
  const cam = CAM(c);
  const colina = box(cam, -100, 860, 1300, 1100, { zIndex: 2, background: '#7a8a50', border: `8px solid ${INK}`, borderRadius: '50% 50% 0 0 / 160px 160px 0 0' });
  const silu = SOGA(cam, 780, 620, 200, 3); silu.style.filter = 'brightness(0)';
  const n19 = texto(cam, 400, '19', { size: 220, color: INK, x: 80, w: 500 });
  const ho = HOGUERA(cam, 150, 760, 320, 6);
  const so = SOGA(cam, 560, 760, 320, 6);
  const x = tachar(cam, 130, 790, 360);
  const ley = stamp(cam, 260, 1180, 'LEY INGLESA', { size: 84, z: 30, col: '#2b4a8c' });
  const fl = box(cam, 0, 0, 1080, 1920, { zIndex: 1 });
  sp(T.diecinueve, 'thud', 0.8); sp(T.ahorc, 'pop2', 0.6); sp(T.noQuem, 'scratch', 0.9); sp(T.ley, 'stamp', 1); sp(T.castig, 'bell', 0.6);
  return t => {
    zoom(cam, t, L(4), 7, 0.05);
    set(n19, { o: t > T.diecinueve ? 1 : 0, s: pop(t, T.diecinueve, 0.35), r: -4 }); set(silu, { o: 0.85 });
    set(ho, { o: t > T.ahorc - 0.3 ? 1 : 0, s: pop(t, T.ahorc - 0.3, 0.35) }); ho.querySelector('.fl').setAttribute('transform', `translate(100 240) scale(${f1(1 + 0.08 * Math.sin(t * 14))} ${f1(1 + 0.12 * Math.sin(t * 11))}) translate(-100 -240)`);
    set(so, { o: t > T.ahorc ? 1 : 0, s: pop(t, T.ahorc, 0.35), r: Math.sin(t * 2) * 2 });
    set(x, { o: t > T.noQuem ? 1 : 0, s: pop(t, T.noQuem, 0.3) });
    stampA(ley, t, T.ley, -6);
  };
});
shakeAt(T.noQuem, 0.3, 14);

/* L5 · Giles Corey, granjero de más de 80 años: tablón con piedras apiladas; solo se le ve la cara terca */
headline(L(5) - 0.1, L(6) - 0.1, '*Giles Corey*, 80 años', { size: 88, hlT: T.giles });
const GILES = c => { const g = mkBust(c, [60, 520, 340, 435], { hat: 'brodie', beard: true, moustache: true, seed: 80 }); g.d.style.zIndex = 9; return g; };
const tablon = (c, z = 10) => box(c, 40, 800, 1000, 200, { zIndex: z, background: WOOD, border: `7px solid ${INK}`, borderRadius: '10px', boxShadow: `8px 8px 0 ${INK}` });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#efe1c6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 5px, transparent 5px 140px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1000, 1080, 920, { zIndex: 3, background: '#9a7a52', borderTop: `8px solid ${INK}` });
  const g = GILES(cam);
  const tb = tablon(cam);
  const pi = [...Array(6)].map(() => PIEDRA(cam, 170));
  const jz = PURITANO(cam, [740, 420, 240, 307], 21);
  const ha = BOCADILLO(cam, 420, 420, '¡HABLA!', { size: 54 });
  const oc = chip(cam, 80, 560, '+80 años', { size: 52, bg: '#fff', color: INK });
  sp(T.granjero, 'pop', 0.6); sp(T.ochenta, 'pop2', 0.6); [...Array(6)].forEach((_, i) => sp(T.piedras5 + i * 0.28, 'thud', 0.7)); sp(T.hable, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(5), 6, 0.06);
    set(g.d, { s: pop(t, T.granjero - 0.1, 0.4), o: t > T.granjero - 0.1 ? 1 : 0 }); face(g, t, { look: [8, -4], bL: t > T.aplastan ? -6 : 0, bR: t > T.aplastan ? -6 : 0, jaw: 0, closed: false, seed: 0.2 });
    popA(oc, t, T.ochenta, { r: -4 });
    set(tb, { o: t > T.aplastan ? 1 : 0, y: (1 - p(t, T.aplastan, 0.4, E.outBack)) * 900 });
    pi.forEach((s, i) => { const t0 = T.piedras5 + i * 0.28, k = p(t, t0, 0.3, E.inCubic); set(s, { x: 340 + (i % 3) * 210 + (i > 2 ? 100 : 0), y: lerp(-300, 696 - (i > 2 ? 100 : 0), k), o: t > t0 ? 1 : 0, r: (i * 37) % 30 - 15 }); });
    set(jz.d, { o: t > T.hable - 0.6 ? 1 : 0 }); face(jz, t, { look: [-10, 4], bL: -6, bR: -6, jaw: t > T.hable && t < T.hable + 0.8 ? 0.6 : 0, seed: 0.5 }); popA(ha, t, T.hable, { r: -4 });
  };
});
[0, 1, 2, 3, 4, 5].forEach(i => shakeAt(T.piedras5 + i * 0.28 + 0.3, 0.15, 6 + i * 1.5));

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · no dice nada; según la leyenda, sus últimas palabras: «MÁS PESO» (cara terca) */
headline(L(7) - 0.1, L(8) - 0.1, 'Sus últimas *palabras*', { size: 88, hlT: T.ultimas });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#efe1c6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 5px, transparent 5px 140px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1000, 1080, 920, { zIndex: 3, background: '#9a7a52', borderTop: `8px solid ${INK}` });
  const g = GILES(cam); const tb = tablon(cam);
  const pi = [...Array(6)].map((_, i) => { const s = PIEDRA(cam, 170); set(s, { x: 340 + (i % 3) * 210 + (i > 2 ? 100 : 0), y: 696 - (i > 2 ? 100 : 0), r: (i * 37) % 30 - 15 }); return s; });
  const mas = [...Array(3)].map(() => PIEDRA(cam, 150));
  const sil = box(cam, 420, 420, 500, 160, { zIndex: 20, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '100px', color: '#6b4a2a', textAlign: 'center' }, '…');
  const mp = BOCADILLO(cam, 380, 470, '«MÁS PESO»', { size: 76 });
  const ter = stamp(cam, 330, 1130, 'TERCO', { size: 100, z: 30 });
  sp(T.noDice, 'tick', 0.6); sp(T.leyenda, 'paper', 0.6); sp(T.peso, 'stamp', 1); sp(T.peso + 0.5, 'thud', 0.9);
  return t => {
    zoom(cam, t, L(7), 6, 0.08);
    face(g, t, { look: t > T.peso ? [10, -6] : [6, 0], bL: -8, bR: -8, jaw: t > T.peso && t < T.peso + 0.7 ? 0.5 : 0, seed: 0.2 }); set(g.d, { y: t > T.peso ? 0 : Math.sin(t * 2) * 2 });
    set(sil, { o: t > T.noDice && t < T.peso ? (Math.sin(t * 5) > 0 ? 1 : 0.4) : 0 });
    mas.forEach((s, i) => { const k = p(t, T.peso + 0.4 + i * 0.2, 0.3, E.inCubic); set(s, { x: 450 + i * 180, y: lerp(-300, 500, k), o: t > T.peso + 0.4 + i * 0.2 ? 1 : 0, r: i * 12 }); });
    popA(mp, t, T.peso, { r: -4 }); stampA(ter, t, T.peso + 0.9, -8);
  };
});
shakeAt(T.peso + 0.5, 0.35, 14);
emu(T.peso + 1.4);

/* L8 · ¿de dónde salen las hogueras? Europa (hogueras) vs América (soga) → se mezcló todo (batidora) */
headline(L(8) - 0.1, L(9) - 0.1, '¿Y las *hogueras*?', { size: 92, hlT: T.hogueras });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  const pE = box(cam, 40, 420, 480, 660, { zIndex: 4, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '60px', textAlign: 'center', paddingTop: '20px', boxSizing: 'border-box', color: INK }, 'EUROPA');
  const pA = box(cam, 560, 420, 480, 660, { zIndex: 4, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '60px', textAlign: 'center', paddingTop: '20px', boxSizing: 'border-box', color: INK }, 'SALEM');
  const hs = [[80, 560], [280, 560], [180, 800]].map(([x, y]) => HOGUERA(cam, x, y, 170, 6));
  const so = SOGA(cam, 700, 600, 220, 6);
  const rem = box(cam, 290, 1100, 500, 240, { zIndex: 12, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 500 240" width="500" height="240"><path d="M60,40 H440 L400,220 H100 Z" fill="#cfe3e8" stroke="${INK}" stroke-width="8"/><path class="sw" d="M150,130 q100,-60 200,0 t-200,0" stroke="${ROJO}" stroke-width="10" fill="none"/></svg>`);
  const mz = texto(cam, 1100, '¡SE MEZCLA TODO!', { size: 74, color: ROJO, x: 60, w: 960, z: 30, shadow: `4px 4px 0 ${INK}` });
  sp(T.europa, 'whoosh', 0.6); sp(T.alli, 'burst', 0.6); sp(T.mezclo, 'scratch', 0.8); sp(T.mezclo + 0.2, 'glitch', 0.7);
  return t => {
    zoom(cam, t, L(8), 6, 0.05);
    const mix = p(t, T.mezclo - 0.1, 0.6, E.inCubic);
    set(pE, { s: pop(t, T.europa - 0.2, 0.4), x: mix * 260, r: mix * 180 }); set(pA, { s: pop(t, L(8) + 0.3, 0.4), x: -mix * 260, r: -mix * 180 });
    hs.forEach((h, i) => { set(h, { o: t > T.alli + i * 0.15 ? 1 : 0, s: pop(t, T.alli + i * 0.15, 0.3) * (1 - mix), x: mix * 260 }); h.querySelector('.fl').setAttribute('transform', `translate(100 240) scale(${f1(1 + 0.08 * Math.sin(t * 14 + i))} ${f1(1 + 0.12 * Math.sin(t * 11 + i))}) translate(-100 -240)`); });
    set(so, { s: 1 - mix, x: -mix * 260 });
    set(rem, { o: mix > 0.5 ? 1 : 0, r: mix > 0.5 ? Math.sin(t * 40) * 6 : 0, s: pop(t, T.mezclo + 0.3, 0.3) }); set(mz, { o: t > T.mezclo + 0.3 ? 1 : 0, s: pop(t, T.mezclo + 0.3, 0.3), r: -3, y: -60 });
  };
});
shakeAt(T.mezclo + 0.2, 0.4, 16);

/* L9 · todo se derrumba: el gobernador lo para cuando acusan… a su propia mujer */
headline(L(9) - 0.1, L(10) - 0.1, 'Todo se *derrumba*', { size: 92, hlT: T.derrumba });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#e6dcc6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 4px, transparent 4px 90px)' }, c => {
  const cam = CAM(c);
  const cas = [...Array(6)].map((_, i) => box(cam, 360 + (i % 3) * 200, 700 - Math.floor(i / 3) * 140, 190, 130, { zIndex: 4, background: '#f4efe2', border: `6px solid ${INK}`, borderRadius: '6px', fontFamily: 'Rye', fontSize: '28px', textAlign: 'center', lineHeight: '120px', color: INK }, 'ACUSACIÓN'));
  const gob = PURITANO(cam, [60, 560, 360, 461], 2, { uniform: 'officer' });
  const muj = NINA(cam, [700, 820, 300, 371], 9); muj.d.style.zIndex = 8;
  const nina = NINA(cam, [340, 900, 240, 297], 5); nina.d.style.zIndex = 8;
  const ma = MANO(cam, 560, 960, 0, 1.2);
  const bo = BOCADILLO(cam, 300, 420, '¿¡MI MUJER!?', { size: 60 });
  const stop = stamp(cam, 330, 1180, '¡SE ACABÓ!', { size: 96, z: 30 });
  sp(T.derrumba, 'thud', 0.9); sp(T.gobernador, 'pop2', 0.6); sp(T.acusan, 'drumroll', 0.6); sp(T.mujer, 'stamp', 0.9); sp(T.mujer + 0.3, 'glitch', 0.7); sp(T.mujer + 1.2, 'stamp', 1);
  return t => {
    zoom(cam, t, L(9), 8, 0.05);
    cas.forEach((e, i) => { const k = p(t, T.derrumba + i * 0.06, 0.5, E.inCubic); set(e, { y: k * 900, r: k * (i % 2 ? 60 : -40), o: 1 - k }); });
    set(gob.d, { o: t > T.gobernador - 0.2 ? 1 : 0, s: pop(t, T.gobernador - 0.2, 0.4) }); face(gob, t, { look: t > T.mujer ? [10, 4] : [4, 0], bL: t > T.mujer ? 20 : 0, bR: t > T.mujer ? 20 : 0, jaw: t > T.mujer + 0.2 ? 0.9 : talkW(t, 'VECINO') * 0.3, seed: 0.3 });
    set(muj.d, { o: t > T.acusan ? 1 : 0, s: pop(t, T.acusan, 0.35) }); face(muj, t, { look: [-8, 0], bL: t > T.mujer ? 14 : 0, bR: t > T.mujer ? 14 : 0, jaw: t > T.mujer + 0.3 ? 0.5 : 0, seed: 0.6 });
    set(nina.d, { o: t > T.acusan ? 1 : 0, x: Math.sin(t * 30) * 4 }); face(nina, t, { look: [10, 0], bL: 16, bR: 6, jaw: 0.4, seed: 0.1 });
    set(ma, { o: t > T.acusan + 0.3 ? 1 : 0, x: Math.sin(t * 10) * 10 });
    popA(bo, t, T.mujer + 0.3, { r: -4 }); stampA(stop, t, T.mujer + 1.2, -8);
  };
});
shakeAt(T.mujer + 0.3, 0.35, 16);

/* L10 · años después, un juez pide perdón en público (cartel) y se indemniza a las familias (bolsas de monedas) */
headline(L(10) - 0.1, L(11) - 0.1, 'Años *después*', { size: 92, hlT: T.anos });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#d8c3a0', backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255,240,180,.6), transparent 60%)' }, c => {
  const cam = CAM(c);
  const igl = box(cam, 140, 400, 800, 520, { zIndex: 2 }, `<svg viewBox="0 0 800 520" width="800" height="520"><path d="M60,520 V200 L400,40 L740,200 V520 Z" fill="#f4efe2" stroke="${INK}" stroke-width="7"/><path d="M400,40 V-60 M370,-30 H430" stroke="${INK}" stroke-width="10"/><rect x="340" y="340" width="120" height="180" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/></svg>`);
  const jz = PURITANO(cam, [360, 700, 360, 461], 33);
  const cart = box(cam, 300, 520, 480, 170, { zIndex: 12, background: CREMA, border: `7px solid ${INK}`, borderRadius: '10px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '86px', textAlign: 'center', lineHeight: '160px', color: ROJO }, 'PERDÓN');
  const bolsas = [0, 1, 2].map(i => box(cam, 0, 0, 150, 170, { zIndex: 13 }, `<svg viewBox="0 0 150 170" width="150" height="170"><path d="M50,40 C20,70 10,160 75,165 C140,160 130,70 100,40 Z" fill="#c9a86a" stroke="${INK}" stroke-width="6"/><path d="M50,40 L100,40 M60,20 L90,20 L100,40 L50,40 Z" fill="#a8874c" stroke="${INK}" stroke-width="5"/><text x="75" y="125" text-anchor="middle" font-family="Rye" font-size="50" fill="${INK}">$</text></svg>`));
  const fam = [[700, 1030, 40], [880, 1050, 41]].map(([x, y, s]) => PURITANO(cam, [x, y, 180, 230], s));
  sp(T.juez, 'pop2', 0.6); sp(T.perdon, 'bell', 0.9); sp(T.perdon + 0.2, 'stamp', 0.8); sp(T.indem, 'cash', 0.9); sp(T.familias, 'cash', 0.7);
  return t => {
    zoom(cam, t, L(10), 4, 0.06);
    set(jz.d, { o: t > T.juez - 0.2 ? 1 : 0, s: pop(t, T.juez - 0.2, 0.4), r: t > T.perdon ? 8 : 0, y: t > T.perdon ? 30 : 0 }); face(jz, t, { look: [0, 8], closed: t > T.perdon, bL: -4, bR: -4, jaw: talkW(t, 'VECINO') * 0.4, seed: 0.4 });
    set(cart, { o: t > T.perdon ? 1 : 0, y: (1 - p(t, T.perdon, 0.4, E.outBack)) * -500, r: Math.sin(t * 3) * 3 });
    bolsas.forEach((b, i) => { const k = p(t, T.indem + i * 0.2, 0.6, E.inOutCubic); set(b, { x: lerp(480, 640 + i * 110, k), y: lerp(900, 1000 - Math.sin(k * Math.PI) * 200, k), o: t > T.indem + i * 0.2 ? 1 : 0 }); });
    fam.forEach((f, i) => { set(f.d, { o: t > T.indem - 0.3 ? 1 : 0 }); face(f, t, { look: [-8, -4], jaw: t > T.familias ? 0.4 : 0, bL: 6, bR: 6, seed: i }); });
  };
});

/* L11 · OJO: la causa de los ataques aún se discute (hongo misterioso con «?») */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const ho = figura(c, 380, 540, 320, 320, `<path d="M60,160 C60,40 260,40 260,160 Z" fill="#b07a45" stroke="${INK}" stroke-width="7"/>${[[110, 110], [170, 90], [210, 130]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14" fill="#f3efe6" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M130,160 L120,300 L200,300 L190,160 Z" fill="#f3efe6" stroke="${INK}" stroke-width="6"/><ellipse cx="140" cy="220" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/><ellipse cx="180" cy="220" rx="11" ry="13" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="142" cy="223" r="5" fill="${INK}"/><circle cx="182" cy="223" r="5" fill="${INK}"/><path d="M148,260 q12,8 24,0" stroke="${INK}" stroke-width="4" fill="none"/>`, '0 0 320 320', { z: 8, origin: '50% 100%' });
  const qs = [0, 1, 2].map(i => texto(c, 520 + i * 90, '?', { size: 130, color: [ROJO, VERDE, '#2b4a8c'][i], x: [260, 720, 760][i], w: 160 }));
  aparece(chip(c, 360, 960, '¿un hongo? ¿histeria?', { size: 56, bg: YEL, color: INK }), T.causa);
  const di = stamp(c, 330, 1110, 'SE DISCUTE', { size: 80, z: 30 });
  sp(T.discute, 'stamp', 0.9);
  return t => { set(ho, { r: Math.sin(t * 3) * 6, sy: 1 + 0.04 * Math.sin(t * 6) }); qs.forEach((q, i) => set(q, { r: Math.sin(t * 5 + i) * 14, y: Math.sin(t * 3 + i) * 14 })); stampA(di, t, T.discute, -6); };
});

/* L12 · O sea: no en la hoguera (tachada)… sino en la horca */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 300, 'No en la hoguera…', { size: 104 });
  const b = texto(c, 440, '…sino en la horca', { size: 104, italic: true, color: ROJO });
  const ho = HOGUERA(c, 330, 640, 260, 8), so = SOGA(c, 650, 640, 260, 8);
  const x = tachar(c, 310, 650, 300);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.horca12 - 0.3 ? 1 : 0, s: pop(t, T.horca12 - 0.3, 0.35) }); set(x, { o: t > T.hoguera12 ? 1 : 0, s: pop(t, T.hoguera12, 0.3) }); set(so, { o: t > T.horca12 - 0.3 ? 1 : 0, s: pop(t, T.horca12 - 0.3, 0.35) }); ho.querySelector('.fl').setAttribute('transform', `translate(100 240) scale(${f1(1 + 0.08 * Math.sin(t * 14))} 1) translate(-100 -240)`); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.hoguera12, 'scratch', 0.8);

/* L13 · pregunta final */
preguntaFinal('¿Por qué crees que todo', 'un pueblo se lo creyó?', { size: 82, draw: c => [['por miedo', YEL], ['por envidias', PINK], ['¿otra razón?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 330 + i * 40, 620 + i * 160, s, { size: 62, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(76, 'Las brujas de Salem', ['SALEM', '1692']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.mujer + 0.3, T.mujer + 1.2]], sorpresa: [[T.dosc, T.dosc + 0.8], [T.noQuem, T.noQuem + 0.8], [T.peso, T.peso + 1.0]], golpes: [T.peor1 + 0.25, T.senalan, T.dosc, T.noQuem, T.peso, T.mezclo + 0.2, T.mujer + 0.3] },
});
