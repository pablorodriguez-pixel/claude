/* Ep. 65 · El test de embarazo de hace 3.000 años (y el conejo) — edición estilo ep04 Napoleón, cero emojis */
Story.prepara();
const T = {
  tresmil: Q('tres mil años'), test0: Q('test de embarazo'),
  despues: Q('mucho después'), peor: Q('bastante peor'), conejo1: Q('un conejo'),
  egipto: Q('egipto'), papiro: Q('un papiro'), orina: Q('la mujer orina'), sacos: Q('dos saquitos'), trigo2: Q('de trigo'), cebada2: Q('de cebada'),
  brotan: Q('si las semillas brotan'), emb3: Q('está embarazada'), nada: Q('no brota nada'), noEsta: Q('no lo está'),
  promete: Q('prometía más'), bCeb: Q('brota la cebada'), nino: Q('niño'), bTri: Q('brota el trigo'), nina: Q('niña'),
  espera: Q('pero espera'), m1963: Q('mil novecientos sesenta y tres'), prueban: Q('lo prueban'), siete: Q('siete de cada diez'),
  porque: Q('por qué funciona'), cree: Q('se cree'), hormonas: Q('hormonas'), germinar: Q('germinar'),
  delConejo: Q('lo del conejo'), m1931: Q('mil novecientos treinta y uno'), inyecta: Q('se inyecta'), coneja: Q('a una coneja'),
  ovarios: Q('los ovarios'), siempre: Q('moría siempre'), positivo: Q('positivo'), negativo: Q('o negativo'),
  frase: Q('la frase americana'), murio: Q('el conejo murió'), estas: Q('estás embarazada'), igual: Q('moría igual'),
  ojo: Q('ojo'), ninoNina: Q('niño o niña'), grano: Q('qué grano'),
  egipcio: Q('el test egipcio'), pis: Q('trigo y pis'), amable: Q('más amable'), cien: Q('hace cien años'),
};
const ARENA = '#e8cf95', PAPIRO = '#e9d9a6', VERDE = '#4c8a3a', AZUL = '#5a8fd6', ROSA2 = '#ee7fb0', CREMA = '#FBF6EA';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
/* ---------- figuras ---------- */
const brotes = n => [...Array(n)].map((_, i) => { const x = 60 + i * (100 / Math.max(1, n - 1)) + (i % 2) * 6; return `<g class="br" style="transform-origin:${x}px 70px"><path d="M${x},70 C${x - 6},40 ${x + 8},24 ${x},4" stroke="${VERDE}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${x},34 q-22,-8 -28,-24 q18,2 28,24 M${x},22 q20,-8 26,-22 q-16,2 -26,22" fill="#7ab35a" stroke="${INK}" stroke-width="3"/></g>`; }).join('');
const sacoInner = (lbl, n = 4) => `<g transform="translate(0 0)">${brotes(n)}</g>${FIGP('M40,80 C30,60 190,60 180,80 L200,240 C200,258 20,258 20,240 Z', '#d8b878', 6, .35)}<path d="M50,84 Q110,100 170,84" stroke="${INK}" stroke-width="5" fill="none"/>
  <rect x="50" y="140" width="120" height="56" rx="8" fill="${CREMA}" stroke="${INK}" stroke-width="4"/><text x="110" y="180" text-anchor="middle" font-family="Rye" font-size="${lbl.length > 5 ? 24 : 30}" fill="${INK}">${lbl}</text>`;
const SACO = (c, x, y, w, lbl, n) => { const f = figura(c, x, y, w, w * 260 / 220, sacoInner(lbl, n), '0 -10 220 270', { z: 8, origin: '50% 100%' }); f.br = [...f.querySelectorAll('.br')]; return f; };
const crece = (f, k) => f.br.forEach((b, i) => { const kk = clamp(k * 1.4 - i * 0.12); b.style.transform = `scaleY(${f1(kk * 1000) / 1000})`; b.style.opacity = kk > 0.02 ? 1 : 0; });
const glifos = ['M0,40 L20,0 L40,40 Z', 'M20,0 a20,20 0 1 0 0.1,0', 'M0,20 Q20,-10 40,20 Q20,50 0,20', 'M10,0 V40 M0,10 H20', 'M0,30 C10,0 30,0 40,30', 'M0,0 H40 V40 H0 Z'];
const papiroInner = () => `${FIGP('M30,20 L670,20 L670,440 L30,440 Z', PAPIRO, 6, .25)}<rect x="0" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/><rect x="650" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/>
  ${[...Array(4)].map((_, r) => [...Array(9)].map((_, k) => `<path class="gl" d="${glifos[(r * 9 + k) % 6]}" transform="translate(${90 + k * 62} ${60 + r * 95}) scale(.9)" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>`).join('')).join('')}`;
const PAPIRO_F = (c, x, y, w) => { const f = figura(c, x, y, w, w * 460 / 700, papiroInner(), '0 0 700 460', { z: 6, origin: '50% 50%' }); f.gl = [...f.querySelectorAll('.gl')]; return f; };
const testModInner = () => `${FIGP('M20,30 L380,30 C400,30 400,90 380,90 L20,90 Z', '#f3f3f3', 6, .12)}<rect x="250" y="44" width="90" height="32" rx="6" fill="#e6eef5" stroke="${INK}" stroke-width="3"/><path d="M276,46 V74 M310,46 V74" stroke="${ROSA2}" stroke-width="8"/>`;
const CONEJO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 340 / 300, conejoInner(1, o.col), '0 0 300 340', Object.assign({ z: 8, origin: '50% 100%' }, o));
const halo = (c, x, y, w) => box(c, x, y, w, w * 0.3, { zIndex: 12, borderRadius: '50%', border: `10px solid ${GOLD}`, boxShadow: `0 0 0 4px ${INK}` });
const jeringaInner = () => `${FIGP('M60,40 L300,40 L300,80 L60,80 Z', 'rgba(220,235,240,.85)', 5, .1)}<rect x="62" y="44" width="160" height="32" fill="#f2d65c" opacity=".8"/><rect x="20" y="30" width="44" height="60" rx="6" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/><path d="M0,60 H20" stroke="${INK}" stroke-width="10"/><path d="M300,60 H390" stroke="${INK}" stroke-width="5"/>${[100, 140, 180, 220, 260].map(x => `<path d="M${x},40 V52" stroke="${INK}" stroke-width="3"/>`).join('')}`;
const JERINGA = (c, x, y, w) => figura(c, x, y, w, w * 120 / 400, jeringaInner(), '0 0 400 120', { z: 10, origin: '100% 50%' });
const macetaInner = brota => `${brota ? `<g class="br" style="transform-origin:60px 60px"><path d="M60,60 C54,36 66,20 60,0" stroke="${VERDE}" stroke-width="7" fill="none"/><path d="M60,26 q-18,-8 -22,-20 q14,2 22,20 M60,16 q16,-6 22,-18 q-12,2 -22,18" fill="#7ab35a" stroke="${INK}" stroke-width="3"/></g>` : `<circle cx="60" cy="56" r="6" fill="#8a6a4a"/>`}${FIGP('M20,60 L100,60 L90,130 L30,130 Z', '#c1663a', 5, .3)}`;
const MACETA = (c, x, y, w, brota) => { const f = figura(c, x, y, w, w * 140 / 120, macetaInner(brota), '0 -10 120 150', { z: 8, origin: '50% 100%' }); f.br = [...f.querySelectorAll('.br')]; return f; };
const gota = (c, x, y) => box(c, x, y, 34, 46, { zIndex: 11 }, `<svg viewBox="0 0 34 46" width="34" height="46"><path d="M17,0 C30,20 34,28 34,32 A17,14 0 0 1 0,32 C0,28 4,20 17,0 Z" fill="#f2d65c" stroke="${INK}" stroke-width="3"/></svg>`);
const lazo = (c, x, y, txt, col) => chip(c, x, y, txt, { size: 70, bg: col, color: '#fff' });

/* L0 · PORTADA: papiro + saquitos con brotes + test moderno */
plano(-1, L(1) - 0.1, PAPEL, c => {
  rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  texto(c, 270, 'Test de embarazo…', { size: 92 });
  const t2 = texto(c, 370, 'hace ' + hlSpan('3.000 años', 'phl'), { size: 120, italic: true });
  const pa = PAPIRO_F(c, 90, 520, 900);
  const a = SACO(c, 170, 780, 330, 'TRIGO', 4), b = SACO(c, 580, 780, 330, 'CEBADA', 4);
  crece(a, 1); crece(b, 1);
  const tm = figura(c, 560, 1180, 440, 132, testModInner(), '0 0 400 120', { z: 9, origin: '50% 50%' });
  const x = box(c, 670, 1130, 230, 230, { zIndex: 12 }, XSVG);
  sfx('swoosh_up', 0.05, 0.6);
  return t => { set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); [a, b].forEach((s, i) => s.br.forEach((br, j) => br.style.transform = `scaleY(1) rotate(${f1(Math.sin(t * 3 + i + j) * 6)}deg)`)); set(tm, { r: -8 }); set(x, { s: 1 + 0.05 * Math.sin(t * 6) }); };
}, { sfx: false });

/* L1 · el que llegó después fue peor… sobre todo para un conejo */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const cam = CAM(c);
  const tm = figura(cam, 340, 520, 400, 120, testModInner(), '0 0 400 120', { z: 9, origin: '50% 50%' });
  const cj = CONEJO(cam, 340, 760, 400);
  const gt = box(cam, 690, 760, 50, 70, { zIndex: 12 }, `<svg viewBox="0 0 34 46" width="50" height="70"><path d="M17,0 C30,20 34,28 34,32 A17,14 0 0 1 0,32 C0,28 4,20 17,0 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`);
  const q = texto(cam, 640, '?', { size: 200, x: 760, w: 200, color: RED });
  return t => { zoom(cam, t, L(1), 5, 0.12); set(tm, { s: pop(t, L(1) + 0.1, 0.35), o: t > L(1) + 0.1 ? 1 : 0, r: Math.sin(t * 3) * 4 }); set(cj, { o: t > L(1) + 0.9 ? 1 : 0, s: pop(t, L(1) + 0.9, 0.4), x: t > T.conejo1 ? Math.sin(t * 40) * 4 : 0 }); set(gt, { o: t > T.conejo1 + 0.3 ? 1 : 0, y: ((t * 80) % 80) }); set(q, { o: t > T.peor ? 1 : 0, s: pop(t, T.peor, 0.3), r: Math.sin(t * 5) * 10 }); };
});

/* L2 · Egipto: el papiro se desenrolla; dos saquitos; gotas */
headline(L(2) - 0.1, L(3) - 0.1, 'Un papiro de *Egipto*', { size: 88, hlT: T.egipto });
plano(L(2) - 0.1, T.sacos - 0.1, { background: ARENA }, c => {
  const cam = CAM(c);
  const sol = box(cam, 760, 380, 220, 220, { zIndex: 3, borderRadius: '50%', background: YEL, border: `7px solid ${INK}` });
  const pir = box(cam, 60, 1000, 960, 400, { zIndex: 3 }, `<svg viewBox="0 0 960 400" width="960" height="400"><path d="M40,400 L260,120 L480,400 Z M380,400 L640,60 L900,400 Z" fill="#d9b56c" stroke="${INK}" stroke-width="6"/><path d="M260,120 L300,400 M640,60 L680,400" stroke="${INK}" stroke-width="3" opacity=".5"/></svg>`);
  const pa = PAPIRO_F(cam, 140, 560, 800);
  return t => { zoom(cam, t, L(2), 4); set(sol, { r: t * 20 }); const k = p(t, T.papiro - 0.2, 0.6, E.outCubic); set(pa, { sx: Math.max(0.05, k), o: t > T.papiro - 0.2 ? 1 : 0 }); pa.gl.forEach((g, i) => g.style.opacity = t > T.papiro + 0.4 + i * 0.025 ? 1 : 0); };
});
plano(T.sacos - 0.1, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 760, 340, 'TRIGO', 4), b = SACO(cam, 590, 760, 340, 'CEBADA', 4); crece(a, 0); crece(b, 0);
  const gs = [...Array(6)].map((_, i) => gota(cam, (i % 2 ? 740 : 300) + (i % 3) * 20, 400));
  return t => { zoom(cam, t, T.sacos, 3); set(a, { s: pop(t, T.trigo2 - 0.2, 0.4), o: t > T.trigo2 - 0.2 ? 1 : 0 }); set(b, { s: pop(t, T.cebada2 - 0.2, 0.4), o: t > T.cebada2 - 0.2 ? 1 : 0 }); gs.forEach((g, i) => { const tt = (t - T.cebada2 - 0.2 - i * 0.12); set(g, { o: tt > 0 && tt < 0.6 ? 1 : 0, y: clamp(tt / 0.6) * 380 }); }); };
});

/* L3 · si brotan: EMBARAZADA; si no brota nada: NO */
headline(L(3) - 0.1, L(4) - 0.1, '¿Brota o *no brota*?', { size: 88, hlT: T.nada });
plano(L(3) - 0.1, T.nada - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 700, 340, 'TRIGO', 5), b = SACO(cam, 590, 700, 340, 'CEBADA', 5);
  const st = stamp(cam, 230, 1140, 'EMBARAZADA', { size: 100, col: VERDE, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  return t => { zoom(cam, t, L(3), 3, 0.08); const k = p(t, T.brotan + 0.3, 1.2, E.outBack); crece(a, k); crece(b, k); stampA(st, t, T.emb3, -6); };
});
plano(T.nada - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  const a = SACO(c, 150, 700, 340, 'TRIGO', 5), b = SACO(c, 590, 700, 340, 'CEBADA', 5); crece(a, 0); crece(b, 0);
  const st = stamp(c, 300, 1140, 'NO LO ESTÁ', { size: 100, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const grillo = texto(c, 560, '…', { size: 200 });
  return t => { stampA(st, t, T.noEsta, -6); set(grillo, { o: Math.sin(t * 6) > 0 ? 1 : 0.3 }); [a, b].forEach((s, i) => set(s, { r: Math.sin(t * 2 + i) * 2 })); };
});

/* L4 · y encima prometía más: cebada = niño, trigo = niña */
headline(L(4) - 0.1, L(5) - 0.1, 'Y además… *¿niño o niña?*', { size: 82, hlT: T.promete + 0.3 });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 700, 340, 'TRIGO', 5), b = SACO(cam, 590, 700, 340, 'CEBADA', 5);
  const ln = lazo(cam, 650, 560, 'NIÑO', AZUL), la = lazo(cam, 210, 560, 'NIÑA', ROSA2);
  return t => { zoom(cam, t, L(4), 5); crece(b, p(t, T.bCeb + 0.2, 0.8, E.outBack)); crece(a, p(t, T.bTri + 0.2, 0.8, E.outBack)); popA(ln, t, T.nino, { r: 6 }); popA(la, t, T.nina, { r: -6 }); set(a, { o: t > T.bTri - 0.3 ? 1 : 0.35 }); set(b, { o: t > T.bTri - 0.3 && t < T.bTri ? 0.35 : 1 }); };
});

/* L5 · pero espera: 1963, lo prueban… 7 de cada 10 */
headline(L(5) - 0.1, L(6) - 0.1, 'En *1963* lo prueban', { size: 90, hlT: T.m1963 });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  const ms = [...Array(10)].map((_, i) => MACETA(cam, 80 + (i % 5) * 190, 560 + Math.floor(i / 5) * 280, 150, i !== 2 && i !== 6 && i !== 9));
  const n = texto(cam, 1160, '0 / 10', { size: 150, color: VERDE });
  return t => { zoom(cam, t, L(5), 6, 0.05); let cnt = 0; ms.forEach((m, i) => { const t0 = T.prueban + 0.2 + i * 0.22; set(m, { s: pop(t, t0, 0.3), o: t > t0 ? 1 : 0 }); const k = p(t, t0 + 0.2, 0.4, E.outBack); m.br.forEach(b => b.style.transform = `scaleY(${f1(k * 1000) / 1000})`); if (m.br.length && k > 0.5) cnt++; }); n.textContent = (t > T.siete ? 7 : cnt) + ' / 10'; set(n, { s: t > T.siete ? 1 + 0.12 * (1 - p(t, T.siete, 0.4)) : 1 }); };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · por qué funciona: hormonas → semilla que germina */
headline(L(7) - 0.1, L(8) - 0.1, '¿Por qué *funciona*?', { size: 90, hlT: T.porque + 0.3 });
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const sem = figura(cam, 390, 760, 300, 220, `${FIGP('M20,110 C20,30 280,30 280,110 C280,190 20,190 20,110 Z', '#c9a86a', 7, .35)}<path class="raja" d="M150,40 L140,90 L160,130 L148,180" stroke="${INK}" stroke-width="6" fill="none" opacity="0"/>`, '0 0 300 220', { z: 8, origin: '50% 50%' });
  const br = box(cam, 520, 520, 60, 260, { zIndex: 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 60 260" width="60" height="260" style="overflow:visible"><path d="M30,260 C20,180 40,100 30,10" stroke="${VERDE}" stroke-width="12" fill="none"/><path d="M30,80 q-50,-20 -60,-60 q40,6 60,60 M30,50 q46,-18 56,-54 q-36,6 -56,54" fill="#7ab35a" stroke="${INK}" stroke-width="4"/></svg>`);
  const hs = [...Array(10)].map((_, i) => box(cam, 0, 0, 44, 44, { zIndex: 9, borderRadius: '50%', background: ROSA2, border: `5px solid ${INK}` }));
  aparece(chip(cam, 330, 1120, 'hormonas del embarazo', { size: 54, bg: ROSA2 }), T.hormonas);
  aparece(chip(cam, 400, 1260 - 30, '(se cree)', { size: 46, bg: '#fff', color: INK }), T.cree, { sfx: false });
  return t => { zoom(cam, t, L(7), 5); hs.forEach((h, i) => { const k = p(t, T.hormonas + i * 0.12, 0.8, E.inOutCubic); const a = i * 0.63; set(h, { x: lerp(540 + Math.cos(a) * 520, 540, k) - 22, y: lerp(870 + Math.sin(a) * 520, 870, k) - 22, o: t > T.hormonas + i * 0.12 && k < 0.98 ? 1 : 0 }); }); sem.querySelector('.raja').setAttribute('opacity', t > T.germinar - 0.3 ? 1 : 0); set(sem, { r: t > T.germinar - 0.3 ? Math.sin(t * 30) * 2 : 0 }); set(br, { sy: p(t, T.germinar, 0.7, E.outBack), o: t > T.germinar ? 1 : 0 }); };
});

/* L8 · lo del conejo: 1931, se inyecta la orina a una coneja */
headline(L(8) - 0.1, L(9) - 0.1, 'Lo del *conejo*', { size: 92, hlT: T.delConejo + 0.2 });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  sello(c, 400, '1931', T.m1931, { size: 140, r: -4, col: INK });
  const cj = CONEJO(cam, 140, 720, 420);
  const jr = JERINGA(cam, 560, 900, 420);
  const ojos = texto(cam, 760, '!', { size: 160, x: 120, w: 200, color: RED });
  return t => { zoom(cam, t, L(8), 6, 0.08); const k = p(t, T.inyecta, 0.6, E.inOutCubic); set(jr, { o: t > T.inyecta - 0.3 ? 1 : 0, x: (1 - k) * 400 - 40 * k, r: -10 }); set(cj, { x: t > T.coneja ? Math.sin(t * 50) * 5 : 0 }); set(ojos, { o: t > T.coneja ? 1 : 0, s: pop(t, T.coneja, 0.3) }); };
});

/* L9 · para mirarle los ovarios… la coneja moría siempre: positivo o negativo */
headline(L(9) - 0.1, L(10) - 0.1, 'Positivo o negativo…', { size: 88 });
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = box(cam, 90, 470, 420, 160, { zIndex: 8, background: VERDE, border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '64px', color: '#fff', textAlign: 'center', lineHeight: '146px' }, 'POSITIVO');
  const b = box(cam, 570, 470, 420, 160, { zIndex: 8, background: RED, border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '64px', color: '#fff', textAlign: 'center', lineHeight: '146px' }, 'NEGATIVO');
  const fl = [0, 1].map(i => box(cam, i ? 690 : 210, 650, 180, 180, { zIndex: 7 }, arrowSvg(i ? 'M150,10 Q120,100 40,160' : 'M30,10 Q60,100 140,160', INK, 10)));
  const cj = CONEJO(cam, 340, 820, 400);
  const h = halo(cam, 400, 800, 280);
  return t => { zoom(cam, t, L(9), 6); popA(a, t, T.positivo, { r: -3 }); popA(b, t, T.negativo, { r: 3 }); fl.forEach((f, i) => set(f, { o: t > (i ? T.negativo : T.positivo) + 0.2 ? 1 : 0 })); const k = p(t, T.siempre - 0.1, 1.2, E.inOutCubic); set(cj, { o: 1 - 0.5 * k, y: -120 * k, r: Math.sin(t * 2) * 4 * k }); set(h, { o: k > 0.1 ? 1 : 0, y: -120 * k, s: 1 + 0.05 * Math.sin(t * 5) }); };
});

/* L10 · «el conejo murió» = «estás embarazada»… aunque moría igual */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#E9C6BE' }, c => {
  const cam = CAM(c);
  const card = box(cam, 120, 380, 840, 300, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `12px 12px 0 ${INK}` });
  el('div', card, { left: '0', top: '50px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK }, '«The rabbit died»');
  const tr = el('div', card, { left: '0', top: '180px', width: '840px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', color: ROSA2 }, '= «estás embarazada»');
  const cj = CONEJO(cam, 360, 820, 360), h = halo(cam, 410, 790, 260);
  const st = stamp(cam, 170, 1180, 'MORÍA IGUAL', { size: 86, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  return t => { zoom(cam, t, L(10), 6); set(card, { s: pop(t, T.murio - 0.1, 0.4), r: -2 }); set(tr, { o: t > T.estas ? 1 : 0 }); set(cj, { y: -Math.abs(Math.sin(t * 2)) * 30, o: 0.6 }); set(h, { y: -Math.abs(Math.sin(t * 2)) * 30 }); stampA(st, t, T.igual, -6); };
});
emu(L(8) - 1.0);

/* L11 · OJO: niño o niña no funcionaba; qué grano era cuál se discute */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const a = SACO(c, 380, 520, 240, 'TRIGO', 3), b = SACO(c, 680, 520, 240, 'CEBADA', 3); crece(a, 1); crece(b, 1);
  const la = lazo(c, 390, 860, '¿NIÑA?', ROSA2), ln = lazo(c, 690, 860, '¿NIÑO?', AZUL);
  return t => { const k = (Math.sin((t - T.grano) * 5) + 1) / 2 * (t > T.grano ? 1 : 0); set(a, { x: k * 300 }); set(b, { x: -k * 300 }); popA(la, t, T.ninoNina, { r: -4 }); popA(ln, t, T.ninoNina + 0.2, { r: 4 }); };
});

/* L12 · O sea: el test egipcio era más amable que el de hace cien años */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Trigo y pis…', { size: 120 });
  const b = texto(c, 420, '…más amable que<br>el de hace 100 años', { size: 84, italic: true });
  const s = SACO(c, 140, 760, 300, 'TRIGO', 5); crece(s, 1);
  const cj = CONEJO(c, 600, 800, 320), h = halo(c, 650, 770, 220);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.amable - 0.2 ? 1 : 0, s: pop(t, T.amable - 0.2, 0.35) }); s.br.forEach((br, j) => br.style.transform = `scaleY(1) rotate(${f1(Math.sin(t * 4 + j) * 8)}deg)`); set(cj, { y: -Math.abs(Math.sin(t * 2)) * 20, o: 0.7 }); set(h, { y: -Math.abs(Math.sin(t * 2)) * 20 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14);

/* L13 · pregunta final */
preguntaFinal('¿Cómo se enteró tu madre', 'de que venías tú?', { size: 82, draw: c => [['test de farmacia', '#9fd3c0'], ['análisis', YEL], ['¿otra forma?', PINK]].map(([s, col], i) => aparece(chip(c, 160 + i * 60, 620 + i * 160, s, { size: 62, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(65, 'El test de embarazo', ['EMBARAZO', 'hace 3.000 años']);

Story.run({ ovalo: [[L(11), L(12) - 0.15]] });
