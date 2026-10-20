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
const CARAS = `<g class="sc"><path d="M68,92 q14,-8 28,0 M124,92 q14,-8 28,0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></g><g class="se"><ellipse cx="84" cy="110" rx="12" ry="13" fill="#fff" stroke="${INK}" stroke-width="3.5"/><ellipse cx="136" cy="110" rx="12" ry="13" fill="#fff" stroke="${INK}" stroke-width="3.5"/></g><g class="sp"><circle cx="85" cy="112" r="5.5" fill="${INK}"/><circle cx="137" cy="112" r="5.5" fill="${INK}"/></g><path class="sm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
const SACO = (c, x, y, w, lbl, n) => { const f = figura(c, x, y, w, w * 260 / 220, sacoInner(lbl, n) + CARAS, '0 -10 220 270', { z: 8, origin: '50% 100%' }); f.br = [...f.querySelectorAll('.br')]; return f; };
/* cara: { jaw, look, feliz (1 sonríe / -1 triste), ceja, closed } */
const caraF = (f, t, o, cy, ms) => { const q = k => f.querySelector(k), j = o.jaw || 0, fz = o.feliz == null ? 0.5 : o.feliz; const [mx, my, mw] = ms;
  q(ms[3]).setAttribute('d', `M${mx - mw},${my} Q${mx},${f1(my + 10 * fz + j * 18)} ${mx + mw},${my} Q${mx},${f1(my - 3 * fz + j * 4)} ${mx - mw},${my} Z`);
  const lk = o.look || [0, 0]; q(ms[4]).setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`);
  const cl = o.closed || ((t + (o.seed || 0)) % 2.8) < 0.12; q(ms[5]).setAttribute('transform', cl ? `translate(0 ${cy}) scale(1 0.1) translate(0 -${cy})` : ''); q(ms[4]).style.opacity = cl ? 0 : 1;
  q(ms[6]).setAttribute('transform', `translate(0 ${f1(-(o.ceja || 0))})`); };
const sacoFace = (f, t, o = {}) => caraF(f, t, o, 110, [110, 128, 14, '.sm', '.sp', '.se', '.sc']);
const CARAC = `<g class="cc"><path d="M116,118 q14,-8 28,0 M156,118 q14,-8 28,0" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/></g><g class="ce"><ellipse cx="130" cy="140" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="170" cy="140" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="cp"><circle cx="131" cy="143" r="7" fill="${INK}"/><circle cx="171" cy="143" r="7" fill="${INK}"/></g><path class="cm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
const conFace = (f, t, o = {}) => caraF(f, t, o, 140, [150, 180, 12, '.cm', '.cp', '.ce', '.cc']);
const sudor = (c, x, y) => box(c, x, y, 30, 42, { zIndex: 14, background: '#7cc4ea', border: `4px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' });
const sp = (t0, n = 'pop', g = 0.45) => sfx(n, t0, g);
const BOCADILLO = (c, x, y, html, o = {}) => el('div', c, { left: px(x), top: px(y), zIndex: o.z || 30, background: '#fff', border: `6px solid ${INK}`, borderRadius: '40px', padding: '14px 30px', fontFamily: 'Rye', fontSize: px(o.size || 50), color: INK, boxShadow: `8px 8px 0 ${INK}`, whiteSpace: 'nowrap' }, html);
const crece = (f, k) => f.br.forEach((b, i) => { const kk = clamp(k * 1.4 - i * 0.12); b.style.transform = `scaleY(${f1(kk * 1000) / 1000})`; b.style.opacity = kk > 0.02 ? 1 : 0; });
const glifos = ['M0,40 L20,0 L40,40 Z', 'M20,0 a20,20 0 1 0 0.1,0', 'M0,20 Q20,-10 40,20 Q20,50 0,20', 'M10,0 V40 M0,10 H20', 'M0,30 C10,0 30,0 40,30', 'M0,0 H40 V40 H0 Z'];
const papiroInner = () => `${FIGP('M30,20 L670,20 L670,440 L30,440 Z', PAPIRO, 6, .25)}<rect x="0" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/><rect x="650" y="0" width="50" height="460" rx="20" fill="#c9a86a" stroke="${INK}" stroke-width="6"/>
  ${[...Array(4)].map((_, r) => [...Array(9)].map((_, k) => `<path class="gl" d="${glifos[(r * 9 + k) % 6]}" transform="translate(${90 + k * 62} ${60 + r * 95}) scale(.9)" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>`).join('')).join('')}`;
const PAPIRO_F = (c, x, y, w) => { const f = figura(c, x, y, w, w * 460 / 700, papiroInner(), '0 0 700 460', { z: 6, origin: '50% 50%' }); f.gl = [...f.querySelectorAll('.gl')]; return f; };
const testModInner = () => `${FIGP('M20,30 L380,30 C400,30 400,90 380,90 L20,90 Z', '#f3f3f3', 6, .12)}<rect x="250" y="44" width="90" height="32" rx="6" fill="#e6eef5" stroke="${INK}" stroke-width="3"/><path d="M276,46 V74 M310,46 V74" stroke="${ROSA2}" stroke-width="8"/>`;
const CONEJO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 340 / 300, conejoInner(1, o.col) + CARAC, '0 0 300 340', Object.assign({ z: 8, origin: '50% 100%' }, o));
const halo = (c, x, y, w) => box(c, x, y, w, w * 0.3, { zIndex: 12, borderRadius: '50%', border: `10px solid ${GOLD}`, boxShadow: `0 0 0 4px ${INK}` });
const jeringaInner = () => `${FIGP('M60,40 L300,40 L300,80 L60,80 Z', 'rgba(220,235,240,.85)', 5, .1)}<rect x="62" y="44" width="160" height="32" fill="#f2d65c" opacity=".8"/><rect x="20" y="30" width="44" height="60" rx="6" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/><path d="M0,60 H20" stroke="${INK}" stroke-width="10"/><path d="M300,60 H390" stroke="${INK}" stroke-width="5"/>${[100, 140, 180, 220, 260].map(x => `<path d="M${x},40 V52" stroke="${INK}" stroke-width="3"/>`).join('')}`;
const JERINGA = (c, x, y, w) => figura(c, x, y, w, w * 120 / 400, jeringaInner(), '0 0 400 120', { z: 10, origin: '100% 50%' });
const macetaInner = brota => `${brota ? `<g class="br" style="transform-origin:60px 60px"><path d="M60,60 C54,36 66,20 60,0" stroke="${VERDE}" stroke-width="7" fill="none"/><path d="M60,26 q-18,-8 -22,-20 q14,2 22,20 M60,16 q16,-6 22,-18 q-12,2 -22,18" fill="#7ab35a" stroke="${INK}" stroke-width="3"/></g>` : `<circle cx="60" cy="56" r="6" fill="#8a6a4a"/>`}${FIGP('M20,60 L100,60 L90,130 L30,130 Z', '#c1663a', 5, .3)}`;
const MACETA = (c, x, y, w, brota) => { const f = figura(c, x, y, w, w * 140 / 120, macetaInner(brota), '0 -10 120 150', { z: 8, origin: '50% 100%' }); f.br = [...f.querySelectorAll('.br')]; return f; };
const gota = (c, x, y) => box(c, x, y, 34, 46, { zIndex: 11 }, `<svg viewBox="0 0 34 46" width="34" height="46"><path d="M17,0 C30,20 34,28 34,32 A17,14 0 0 1 0,32 C0,28 4,20 17,0 Z" fill="#f2d65c" stroke="${INK}" stroke-width="3"/></svg>`);
const lazo = (c, x, y, txt, col) => chip(c, x, y, txt, { size: 70, bg: col, color: '#fff' });

/* L0 · PORTADA (fotograma 0 completo) — los saquitos con cara hablan y botan, el papiro brilla, el conejo se asoma temblando */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.32)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'Test de embarazo…', { size: 92 });
  const t2 = texto(c, 350, 'hace ' + hlSpan('3.000 años', 'phl'), { size: 120, italic: true });
  const pa = PAPIRO_F(c, 90, 520, 900);
  const a = SACO(c, 150, 760, 360, 'TRIGO', 4), b = SACO(c, 570, 760, 360, 'CEBADA', 4);
  crece(a, 1); crece(b, 1);
  const cj = CONEJO(c, 40, 1180, 260); cj.style.zIndex = 5;
  const gt = sudor(c, 250, 1240);
  const tm = figura(c, 560, 1200, 440, 132, testModInner(), '0 0 400 120', { z: 9, origin: '50% 50%' });
  const x = box(c, 670, 1150, 230, 230, { zIndex: 12 }, XSVG);
  const pos = stamp(c, 330, 1040, '¡POSITIVO!', { size: 84, col: VERDE, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6); sp(T.test0 + 0.3, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    [a, b].forEach((sc, i) => { const hop = Math.abs(Math.sin(t * 5 + i * 1.6)); set(sc, { y: -hop * 24, sy: 1 - 0.05 * (1 - hop), r: Math.sin(t * 3 + i) * 3 }); sc.br.forEach((br, j) => br.style.transform = `scaleY(1) rotate(${f1(Math.sin(t * 4 + i + j) * 9)}deg)`); sacoFace(sc, t, { jaw: talkW(t, 'VECINO') * (i ? 0.5 : 1), look: i ? [-5, -2] : [5, -2], feliz: 1, ceja: t > T.test0 ? 8 : 0, seed: i }); });
    pa.gl.forEach((g, i) => g.style.opacity = 0.55 + 0.45 * Math.sin(t * 4 + i * 0.7));
    set(cj, { y: 40 - Math.abs(Math.sin(t * 1.5)) * 40, x: Math.sin(t * 40) * 2 }); conFace(cj, t, { look: [8, -4], feliz: -1, ceja: 10, seed: 0.4 });
    set(gt, { y: (t * 120) % 100, o: 1 });
    set(tm, { r: -8 + Math.sin(t * 6) * 2 }); set(x, { s: 1 + 0.05 * Math.sin(t * 6) });
    stampA(pos, t, T.test0 + 0.3, -6);
  };
}, { sfx: false });

/* L1 · el que llegó después fue peor… sobre todo para un conejo */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#C9D3E6' }, c => {
  const cam = CAM(c);
  const tm = figura(cam, 340, 520, 400, 120, testModInner(), '0 0 400 120', { z: 9, origin: '50% 50%' });
  const cj = CONEJO(cam, 340, 760, 400);
  const gt = box(cam, 690, 760, 50, 70, { zIndex: 12 }, `<svg viewBox="0 0 34 46" width="50" height="70"><path d="M17,0 C30,20 34,28 34,32 A17,14 0 0 1 0,32 C0,28 4,20 17,0 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></svg>`);
  const q = texto(cam, 640, '?', { size: 200, x: 760, w: 200, color: RED });
  const c1 = chip(cam, 120, 380, 'hace 3.000 años', { size: 46, bg: '#e9d9a6', color: INK }), c2 = chip(cam, 720, 380, '1931', { size: 46, bg: '#fff', color: INK });
  const peor = stamp(cam, 560, 470, 'PEOR', { size: 80, z: 30 });
  const yo = BOCADILLO(cam, 640, 740, '¿YO?', { size: 60 }); const sd = sudor(cam, 690, 830);
  sp(T.despues, 'whoosh', 0.6); sp(T.peor, 'stamp', 0.9); sp(T.conejo1, 'boing', 0.8); sp(T.conejo1 + 0.4, 'pop', 0.6);
  return t => { zoom(cam, t, L(1), 5, 0.12); set(tm, { s: pop(t, L(1) + 0.1, 0.35), o: t > L(1) + 0.1 ? 1 : 0, r: Math.sin(t * 3) * 4 }); set(cj, { o: t > L(1) + 0.9 ? 1 : 0, s: pop(t, L(1) + 0.9, 0.4), x: t > T.conejo1 ? Math.sin(t * 40) * 4 : 0 }); set(gt, { o: t > T.conejo1 + 0.3 ? 1 : 0, y: ((t * 80) % 80) }); popA(c1, t, T.despues - 0.3, { r: -3 }); popA(c2, t, T.despues + 0.2, { r: 3 }); stampA(peor, t, T.peor, -8); conFace(cj, t, { look: t > T.conejo1 ? [6, -6] : [0, 0], feliz: t > T.conejo1 ? -1 : 0.6, ceja: t > T.conejo1 ? 14 : 0, jaw: t > T.conejo1 + 0.2 ? 0.6 : 0 }); popA(yo, t, T.conejo1 + 0.4, { r: 4 }); set(sd, { o: t > T.conejo1 ? 1 : 0, y: ((t * 140) % 120) }); set(q, { o: t > T.peor ? 1 : 0, s: pop(t, T.peor, 0.3), r: Math.sin(t * 5) * 10 }); };
});

/* L2 · Egipto: el papiro se desenrolla; dos saquitos; gotas */
headline(L(2) - 0.1, L(3) - 0.1, 'Un papiro de *Egipto*', { size: 88, hlT: T.egipto });
plano(L(2) - 0.1, T.sacos - 0.1, { background: ARENA }, c => {
  const cam = CAM(c);
  const sol = box(cam, 760, 380, 220, 220, { zIndex: 3, borderRadius: '50%', background: YEL, border: `7px solid ${INK}` });
  const pir = box(cam, 60, 1000, 960, 400, { zIndex: 3 }, `<svg viewBox="0 0 960 400" width="960" height="400"><path d="M40,400 L260,120 L480,400 Z M380,400 L640,60 L900,400 Z" fill="#d9b56c" stroke="${INK}" stroke-width="6"/><path d="M260,120 L300,400 M640,60 L680,400" stroke="${INK}" stroke-width="3" opacity=".5"/></svg>`);
  const dun = box(cam, -100, 1300, 1300, 700, { zIndex: 4, background: '#d9b56c', borderTop: `8px solid ${INK}`, borderRadius: '50% 50% 0 0 / 60px 60px 0 0' });
  const palmas = [80, 900].map(x => box(cam, x, 980, 140, 340, { zIndex: 4 }, `<svg viewBox="0 0 140 340" width="140" height="340" style="overflow:visible"><path d="M70,340 C60,240 80,140 70,60" stroke="#8a5a32" stroke-width="18" fill="none"/><path class="hj" d="M70,60 q-60,-10 -80,40 M70,60 q60,-10 80,40 M70,60 q-30,-50 -70,-50 M70,60 q30,-50 70,-50" stroke="${VERDE}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`));
  const vi = [0, 1, 2, 3].map(i => box(cam, 0, 700 + i * 160, 180, 8, { zIndex: 5, background: 'rgba(255,255,255,.7)', borderRadius: '8px' }));
  const pa = PAPIRO_F(cam, 140, 560, 800);
  sp(T.papiro - 0.2, 'paper', 0.8); sp(T.papiro + 0.4, 'sparkle', 0.6);
  return t => { zoom(cam, t, L(2), 4); set(sol, { r: t * 20 }); palmas.forEach((pm, i) => set(pm, { r: Math.sin(t * 2 + i) * 3 })); vi.forEach((v, i) => set(v, { x: ((t * 500 + i * 300) % 1400) - 200, o: 0.8 })); const k = p(t, T.papiro - 0.2, 0.6, E.outCubic); set(pa, { sx: Math.max(0.05, k), o: t > T.papiro - 0.2 ? 1 : 0 }); pa.gl.forEach((g, i) => g.style.opacity = t > T.papiro + 0.4 + i * 0.025 ? 1 : 0); };
});
plano(T.sacos - 0.1, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 760, 340, 'TRIGO', 4), b = SACO(cam, 590, 760, 340, 'CEBADA', 4); crece(a, 0); crece(b, 0);
  const gs = [...Array(6)].map((_, i) => gota(cam, (i % 2 ? 740 : 300) + (i % 3) * 20, 400));
  const ag = BOCADILLO(cam, 380, 560, '¿¡pis!?', { size: 60 });
  sp(T.trigo2 - 0.2, 'pop', 0.6); sp(T.cebada2 - 0.2, 'pop', 0.6); [0, 1, 2].forEach(i => sp(T.cebada2 + 0.5 + i * 0.25, 'gulp', 0.5));
  return t => { zoom(cam, t, T.sacos, 3); set(a, { s: pop(t, T.trigo2 - 0.2, 0.4), o: t > T.trigo2 - 0.2 ? 1 : 0 }); set(b, { s: pop(t, T.cebada2 - 0.2, 0.4), o: t > T.cebada2 - 0.2 ? 1 : 0 }); const wet = t > T.cebada2 + 0.4; [a, b].forEach((sc, i) => { sacoFace(sc, t, { look: wet ? [0, -6] : [i ? -6 : 6, 0], closed: wet && t < T.cebada2 + 1.6, feliz: wet ? -1 : 0.6, ceja: wet ? 12 : 0, jaw: wet ? 0.5 : 0, seed: i }); if (wet) set(sc, { x: Math.sin(t * 40 + i) * 3 }); }); popA(ag, t, T.cebada2 + 0.6, { r: -4 }); gs.forEach((g, i) => { const tt = (t - T.cebada2 - 0.2 - i * 0.12); set(g, { o: tt > 0 && tt < 0.6 ? 1 : 0, y: clamp(tt / 0.6) * 380 }); }); };
});

/* L3 · si brotan: EMBARAZADA; si no brota nada: NO */
headline(L(3) - 0.1, L(4) - 0.1, '¿Brota o *no brota*?', { size: 88, hlT: T.nada });
plano(L(3) - 0.1, T.nada - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 700, 340, 'TRIGO', 5), b = SACO(cam, 590, 700, 340, 'CEBADA', 5);
  sp(T.brotan + 0.3, 'sparkle', 0.7); sp(T.emb3, 'stamp', 0.9); sp(T.emb3 + 0.2, 'tada', 0.6);
  const st = stamp(cam, 300, 1110, 'EMBARAZADA', { size: 78, col: VERDE, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  return t => { zoom(cam, t, L(3), 3, 0.08); const k = p(t, T.brotan + 0.3, 1.2, E.outBack); crece(a, k); crece(b, k); stampA(st, t, T.emb3, -6); [a, b].forEach((sc, i) => { sacoFace(sc, t, { look: [0, -6], feliz: 1, jaw: k > 0.5 ? 0.6 : 0, ceja: k > 0.5 ? 10 : 0, seed: i }); set(sc, { y: k > 0.5 ? -Math.abs(Math.sin(t * 7 + i)) * 30 : 0 }); }); };
});
plano(T.nada - 0.1, L(4) - 0.1, { background: '#E9D7B0' }, c => {
  const a = SACO(c, 150, 700, 340, 'TRIGO', 5), b = SACO(c, 590, 700, 340, 'CEBADA', 5); crece(a, 0); crece(b, 0);
  const st = stamp(c, 300, 1110, 'NO LO ESTÁ', { size: 84, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const grillo = texto(c, 540, 'cri… cri…', { size: 90, italic: true, color: '#6b4a2a' });
  const rod = box(c, -300, 1150, 200, 200, { zIndex: 9 }, `<svg viewBox="0 0 200 200" width="200" height="200">${[...Array(7)].map((_, i) => `<ellipse cx="100" cy="100" rx="${90 - i * 6}" ry="${60 + i * 5}" transform="rotate(${i * 26} 100 100)" fill="none" stroke="#8a6a3a" stroke-width="6"/>`).join('')}</svg>`);
  sp(T.nada, 'sad', 0.7); sp(T.noEsta, 'stamp', 0.9);
  return t => { stampA(st, t, T.noEsta, -6); set(grillo, { o: Math.sin(t * 6) > 0 ? 1 : 0.3, r: -3 }); [a, b].forEach((s, i) => { set(s, { r: Math.sin(t * 2 + i) * 2 }); sacoFace(s, t, { look: [0, 6], feliz: -1, ceja: -3, seed: i }); }); const k = p(t, T.nada - 0.1, 2.6, E.linear); set(rod, { x: k * 1600, r: k * 720, y: -Math.abs(Math.sin(k * 14)) * 60 }); };
});

/* L4 · y encima prometía más: cebada = niño, trigo = niña */
headline(L(4) - 0.1, L(5) - 0.1, 'Y además… *¿niño o niña?*', { size: 82, hlT: T.promete + 0.3 });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = SACO(cam, 150, 700, 340, 'TRIGO', 5), b = SACO(cam, 590, 700, 340, 'CEBADA', 5);
  const ln = lazo(cam, 650, 560, 'NIÑO', AZUL), la = lazo(cam, 210, 560, 'NIÑA', ROSA2); sp(T.bCeb + 0.2, 'sparkle', 0.6); sp(T.nino, 'pop2', 0.7); sp(T.bTri + 0.2, 'sparkle', 0.6); sp(T.nina, 'pop2', 0.7);
  return t => { zoom(cam, t, L(4), 5); crece(b, p(t, T.bCeb + 0.2, 0.8, E.outBack)); crece(a, p(t, T.bTri + 0.2, 0.8, E.outBack)); popA(ln, t, T.nino, { r: 6 }); popA(la, t, T.nina, { r: -6 }); set(a, { o: t > T.bTri - 0.3 ? 1 : 0.35 }); set(b, { o: t > T.bTri - 0.3 && t < T.bTri ? 0.35 : 1 }); sacoFace(b, t, { feliz: 1, jaw: t > T.nino && t < T.nino + 0.6 ? 0.7 : 0, look: [-4, -2], ceja: t > T.nino ? 8 : 0, seed: 1 }); sacoFace(a, t, { feliz: t > T.bTri ? 1 : 0, jaw: t > T.nina && t < T.nina + 0.6 ? 0.7 : 0, look: [4, -2], ceja: t > T.nina ? 8 : 0 }); };
});

/* L5 · pero espera: 1963, lo prueban… 7 de cada 10 */
headline(L(5) - 0.1, L(6) - 0.1, 'En *1963* lo prueban', { size: 90, hlT: T.m1963 });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#d9ecef', backgroundImage: 'linear-gradient(rgba(43,33,24,.10) 3px, transparent 3px), linear-gradient(90deg, rgba(43,33,24,.10) 3px, transparent 3px)', backgroundSize: '90px 90px' }, c => {
  const cam = CAM(c);
  const ac = stamp(c, 330, 390, '¡ACIERTA!', { size: 80, col: VERDE, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  [...Array(10)].forEach((_, i) => sp(T.prueban + 0.2 + i * 0.22, 'tick', 0.4)); sp(T.siete, 'ding', 0.8); sp(T.siete + 0.5, 'stamp', 0.9);
  FX.fns.push(t => { if (t > L(5) - 0.1 && t < L(6)) stampA(ac, t, T.siete + 0.5, -6); });
  const ms = [...Array(10)].map((_, i) => MACETA(cam, 80 + (i % 5) * 190, 560 + Math.floor(i / 5) * 280, 150, i !== 2 && i !== 6 && i !== 9));
  const cie = [0, 1].map(i => mkBust(cam, [i ? 560 : 180, 560, 340, 435], { hat: i ? 'brodie' : 'slouch', moustache: !i, beard: !!i, seed: 70 + i }));
  const n = texto(cam, 1180, '0 / 10', { size: 150, color: VERDE });
  return t => { zoom(cam, t, L(5), 6, 0.05); cie.forEach((b, i) => { set(b.d, { o: t < T.prueban + 0.2 ? 1 : 0, s: pop(t, T.m1963 - 0.3 + i * 0.2, 0.4) }); face(b, t, { look: [i ? -8 : 8, 0], jaw: t > T.prueban - 0.5 ? 0.4 : 0, bL: t > T.espera ? 10 : 0, bR: 10, seed: i }); }); let cnt = 0; ms.forEach((m, i) => { const t0 = T.prueban + 0.2 + i * 0.22; set(m, { s: pop(t, t0, 0.3), o: t > t0 ? 1 : 0 }); const k = p(t, t0 + 0.2, 0.4, E.outBack); m.br.forEach(b => b.style.transform = `scaleY(${f1(k * 1000) / 1000})`); if (m.br.length && k > 0.5) cnt++; }); n.textContent = (t > T.siete ? 7 : cnt) + ' / 10'; set(n, { s: t > T.siete ? 1 + 0.12 * (1 - p(t, T.siete, 0.4)) : 1 }); };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · por qué funciona: hormonas → semilla que germina */
headline(L(7) - 0.1, L(8) - 0.1, '¿Por qué *funciona*?', { size: 90, hlT: T.porque + 0.3 });
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const qs = [0, 1, 2, 3, 4].map(i => texto(cam, 0, '?', { size: 110, color: [RED, VERDE, ROSA2, AZUL, INK][i], x: 0, w: 120, z: 12 }));
  const sem = figura(cam, 330, 720, 420, 308, `${FIGP('M20,110 C20,30 280,30 280,110 C280,190 20,190 20,110 Z', '#c9a86a', 7, .35)}<path class="raja" d="M150,40 L140,90 L160,130 L148,180" stroke="${INK}" stroke-width="6" fill="none" opacity="0"/><g class="sojo"><ellipse cx="110" cy="100" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="190" cy="100" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="112" cy="104" r="7" fill="${INK}"/><circle cx="192" cy="104" r="7" fill="${INK}"/></g><path class="sbo" d="M130,140 Q150,150 170,140" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`, '0 0 300 220', { z: 8, origin: '50% 50%' });
  const br = box(cam, 520, 520, 60, 260, { zIndex: 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 60 260" width="60" height="260" style="overflow:visible"><path d="M30,260 C20,180 40,100 30,10" stroke="${VERDE}" stroke-width="12" fill="none"/><path d="M30,80 q-50,-20 -60,-60 q40,6 60,60 M30,50 q46,-18 56,-54 q-36,6 -56,54" fill="#7ab35a" stroke="${INK}" stroke-width="4"/></svg>`);
  const hs = [...Array(10)].map((_, i) => box(cam, 0, 0, 44, 44, { zIndex: 9, borderRadius: '50%', background: ROSA2, border: `5px solid ${INK}` }));
  sp(T.hormonas + 0.6, 'boing', 0.6); sp(T.germinar, 'sparkle', 0.8);
  aparece(chip(cam, 330, 1120, 'hormonas del embarazo', { size: 54, bg: ROSA2 }), T.hormonas);
  aparece(chip(cam, 400, 1260 - 30, '(se cree)', { size: 46, bg: '#fff', color: INK }), T.cree, { sfx: false });
  return t => { zoom(cam, t, L(7), 5); qs.forEach((q, i) => { const a = t * 1.6 + i * 1.26; set(q, { x: 480 + Math.cos(a) * 360, y: 760 + Math.sin(a) * 240 - 160, o: t < T.hormonas ? 1 : 0, r: Math.sin(t * 5 + i) * 15 }); }); hs.forEach((h, i) => { const k = p(t, T.hormonas + i * 0.12, 0.8, E.inOutCubic); const a = i * 0.63; set(h, { x: lerp(540 + Math.cos(a) * 520, 540, k) - 22, y: lerp(870 + Math.sin(a) * 520, 870, k) - 22, o: t > T.hormonas + i * 0.12 && k < 0.98 ? 1 : 0 }); }); sem.querySelector('.raja').setAttribute('opacity', t > T.germinar - 0.3 ? 1 : 0); sem.querySelector('.sbo').setAttribute('d', t > T.hormonas + 0.6 ? 'M125,135 Q150,175 175,135 Z' : 'M130,140 Q150,150 170,140'); sem.querySelector('.sojo').setAttribute('transform', t > T.hormonas + 0.6 ? 'translate(150 100) scale(1.25) translate(-150 -100)' : ''); set(sem, { r: t > T.germinar - 0.3 ? Math.sin(t * 30) * 2 : 0 }); set(br, { sy: p(t, T.germinar, 0.7, E.outBack), o: t > T.germinar ? 1 : 0 }); };
});

/* L8 · lo del conejo: 1931, se inyecta la orina a una coneja */
headline(L(8) - 0.1, L(9) - 0.1, 'Lo del *conejo*', { size: 92, hlT: T.delConejo + 0.2 });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  sello(c, 400, '1931', T.m1931, { size: 140, r: -4, col: INK });
  const cj = CONEJO(cam, 140, 720, 420);
  const doc = mkBust(cam, [620, 600, 420, 537], { hat: 'slouch', moustache: true, seed: 44 });
  const jr = JERINGA(cam, 560, 900, 420);
  const sd = [sudor(cam, 470, 800), sudor(cam, 160, 840)];
  sp(T.inyecta, 'whoosh', 0.7); sp(T.coneja, 'glitch', 0.7); sp(T.coneja + 0.1, 'boing', 0.8);
  const ojos = texto(cam, 760, '!', { size: 160, x: 120, w: 200, color: RED });
  return t => { zoom(cam, t, L(8), 6, 0.08); const k = p(t, T.inyecta, 0.6, E.inOutCubic); set(jr, { o: t > T.inyecta - 0.3 ? 1 : 0, x: (1 - k) * 400 - 40 * k, r: -10 }); set(cj, { x: t > T.coneja ? Math.sin(t * 50) * 5 : 0 }); conFace(cj, t, { look: t > T.inyecta ? [10, 2] : [4, -4], feliz: t > T.inyecta ? -1 : 0.4, ceja: t > T.inyecta ? 14 : 0, jaw: t > T.coneja ? 0.8 : 0 }); face(doc, t, { look: [-8, 2], bL: 4, bR: 10, seed: 0.3 }); sd.forEach((d, i) => set(d, { o: t > T.inyecta + i * 0.3 ? 1 : 0, y: ((t * 150 + i * 50) % 120) })); set(ojos, { o: t > T.coneja ? 1 : 0, s: pop(t, T.coneja, 0.3) }); };
});

/* L9 · para mirarle los ovarios… la coneja moría siempre: positivo o negativo */
headline(L(9) - 0.1, L(10) - 0.1, 'Positivo o negativo…', { size: 88 });
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = box(cam, 90, 470, 420, 160, { zIndex: 8, background: VERDE, border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '64px', color: '#fff', textAlign: 'center', lineHeight: '146px' }, 'POSITIVO');
  const b = box(cam, 570, 470, 420, 160, { zIndex: 8, background: RED, border: `7px solid ${INK}`, borderRadius: '20px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '64px', color: '#fff', textAlign: 'center', lineHeight: '146px' }, 'NEGATIVO');
  sp(T.positivo, 'pop2', 0.7); sp(T.negativo, 'pop2', 0.7); sp(T.siempre, 'sad', 0.8);
  const fl = [0, 1].map(i => box(cam, i ? 690 : 210, 650, 180, 180, { zIndex: 7 }, arrowSvg(i ? 'M150,10 Q120,100 40,160' : 'M30,10 Q60,100 140,160', INK, 10)));
  const cj = CONEJO(cam, 340, 820, 400);
  const h = halo(cam, 400, 800, 280);
  const lupa = box(cam, 0, 0, 300, 380, { zIndex: 14 }, `<svg viewBox="0 0 300 380" width="300" height="380"><path d="M200,230 L280,360" stroke="#8a5a32" stroke-width="34" stroke-linecap="round"/><path d="M200,230 L280,360" stroke="${INK}" stroke-width="5" fill="none"/><circle cx="130" cy="140" r="115" fill="rgba(200,235,250,.45)" stroke="${INK}" stroke-width="14"/><circle cx="130" cy="140" r="115" fill="none" stroke="${GOLD}" stroke-width="7"/><path d="M70,90 q30,-30 70,-30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`);
  sp(L(9) + 0.2, 'whoosh', 0.6); sp(T.ovarios, 'tick', 0.6);
  return t => { zoom(cam, t, L(9), 6); { const k = p(t, L(9), 0.4, E.outBack), out = p(t, T.siempre - 0.3, 0.3, E.inCubic); set(lupa, { x: 420 + Math.sin(t * 2.2) * 120 + out * 900, y: 760 + Math.cos(t * 1.7) * 80, s: k, r: Math.sin(t * 2) * 6 }); } conFace(cj, t, t < T.siempre - 0.1 ? { look: [Math.sin(t * 2.2) * 8, 4], feliz: -1, ceja: 14 } : { closed: true, feliz: 0.6 }); popA(a, t, T.positivo, { r: -3 }); popA(b, t, T.negativo, { r: 3 }); fl.forEach((f, i) => set(f, { o: t > (i ? T.negativo : T.positivo) + 0.2 ? 1 : 0 })); const k = p(t, T.siempre - 0.1, 1.2, E.inOutCubic); set(cj, { o: 1 - 0.5 * k, y: -120 * k, r: Math.sin(t * 2) * 4 * k }); set(h, { o: k > 0.1 ? 1 : 0, y: -120 * k, s: 1 + 0.05 * Math.sin(t * 5) });  };
});

/* L10 · «el conejo murió» = «estás embarazada»… aunque moría igual */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#E9C6BE' }, c => {
  const cam = CAM(c);
  const card = box(cam, 120, 380, 840, 300, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '26px', boxShadow: `12px 12px 0 ${INK}` });
  el('div', card, { left: '0', top: '50px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '96px', color: INK }, '«The rabbit died»');
  const tr = el('div', card, { left: '0', top: '180px', width: '840px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', color: ROSA2 }, '= «estás embarazada»');
  const cj = CONEJO(cam, 360, 820, 360), h = halo(cam, 410, 790, 260);
  sp(T.murio - 0.1, 'whoosh', 0.7); sp(T.estas, 'ding', 0.7); sp(T.igual, 'stamp', 1);
  const st = stamp(cam, 300, 1180, 'MORÍA IGUAL', { size: 78, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  return t => { zoom(cam, t, L(10), 6); set(card, { s: pop(t, T.murio - 0.1, 0.4), r: -2 }); set(tr, { o: t > T.estas ? 1 : 0 }); set(cj, { y: -Math.abs(Math.sin(t * 2)) * 30, o: 0.75, r: t > T.igual ? Math.sin(t * 6) * 6 : 0 }); set(h, { y: -Math.abs(Math.sin(t * 2)) * 30 }); stampA(st, t, T.igual, -6); conFace(cj, t, { closed: true, feliz: t > T.igual ? -1 : 0.6 }); };
});
emu(L(8) - 1.0);

/* L11 · OJO: niño o niña no funcionaba; qué grano era cuál se discute */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const a = SACO(c, 380, 520, 240, 'TRIGO', 3), b = SACO(c, 680, 520, 240, 'CEBADA', 3); crece(a, 1); crece(b, 1);
  const la = lazo(c, 390, 860, '¿NIÑA?', ROSA2), ln = lazo(c, 690, 860, '¿NIÑO?', AZUL);
  return t => { const k = (Math.sin((t - T.grano) * 5) + 1) / 2 * (t > T.grano ? 1 : 0); set(a, { x: k * 300 }); set(b, { x: -k * 300 }); sacoFace(a, t, { look: [8, 0], feliz: 0, ceja: 10 }); sacoFace(b, t, { look: [-8, 0], feliz: 0, ceja: 10, seed: 1 }); popA(la, t, T.ninoNina, { r: -4 }); popA(ln, t, T.ninoNina + 0.2, { r: 4 }); };
});

/* L12 · O sea: el test egipcio era más amable que el de hace cien años */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Trigo y pis…', { size: 120 });
  const b = texto(c, 420, '…más amable que<br>el de hace 100 años', { size: 84, italic: true });
  const s = SACO(c, 140, 760, 300, 'TRIGO', 5); crece(s, 1);
  const cj = CONEJO(c, 600, 800, 320), h = halo(c, 650, 770, 220);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.amable - 0.2 ? 1 : 0, s: pop(t, T.amable - 0.2, 0.35) }); s.br.forEach((br, j) => br.style.transform = `scaleY(1) rotate(${f1(Math.sin(t * 4 + j) * 8)}deg)`); sacoFace(s, t, { feliz: 1, jaw: 0.4, look: [6, -2] }); conFace(cj, t, { closed: true, feliz: -1 }); set(cj, { y: -Math.abs(Math.sin(t * 2)) * 20, o: 0.75 }); set(h, { y: -Math.abs(Math.sin(t * 2)) * 20 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14);

/* L13 · pregunta final */
preguntaFinal('¿Cómo se enteró tu madre', 'de que venías tú?', { size: 82, draw: c => [['test de farmacia', '#9fd3c0'], ['análisis', YEL], ['¿otra forma?', PINK]].map(([s, col], i) => aparece(chip(c, 340 + i * 40, 620 + i * 160, s, { size: 62, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(65, 'El test de embarazo', ['EMBARAZO', 'hace 3.000 años']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.cebada2 + 0.6, T.cebada2 + 1.5], [T.murio, T.murio + 1.0], [T.igual, T.igual + 1.2]], sorpresa: [[T.espera, T.espera + 0.8], [T.siete, T.siete + 0.8], [T.coneja, T.coneja + 0.8]], golpes: [T.peor, T.emb3, T.noEsta, T.siete + 0.5, T.coneja, T.siempre, T.igual] },
});
