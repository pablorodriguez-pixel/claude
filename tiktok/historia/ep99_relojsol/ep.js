/* Ep. 99 · «El reloj de las uvas lo regaló un pastor» (José Rodríguez Losada) — FORMATO NUEVO (cuento continuo).
   Sol de noche (gancho) → León (el pastor huye; la cámara lo sigue en UNA dirección) → Londres (de barrendero a relojero) → Madrid 1866 → Nochevieja hoy. */
Story.prepara();
const T = {
  uvas0: Q('las uvas'), pastor0: Q('un pastor'),
  escapo1: Q('se escapó'), ternera1: Q('una ternera'),
  leon: Q('león'), chaval: Q('un chaval'), losada: Q('josé rodríguez losada'), vacas: Q('las vacas'),
  muere: Q('se le muere'), miedo: Q('por miedo'), paliza: Q('la paliza'), escapa3: Q('se escapa'),
  londres: Q('en londres'), duro: Q('sin un duro'), relojeria: Q('una relojería'), barriendo: Q('barriendo'),
  aprende: Q('aprende'), famosos: Q('más famosos'),
  rico: Q('ya rico'), madrid6: Q('de madrid'), regala: Q('le regala'), puerta6: Q('puerta del sol'),
  inaugura: Q('lo inaugura'), reina: Q('la reina'), ochocientos: Q('mil ochocientos'),
  mismo: Q('el mismo reloj'), campanadas: Q('las campanadas'),
  uvas9: Q('te comas las uvas'), regalo: Q('el regalo'), pastor9: Q('un pastor'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* esfera de reloj con agujas (vb 0 0 300 300); ponR(r, horas) */
const ESFERA = (c, w, o = {}) => { const d = box(c, 0, 0, w, w, { zIndex: o.z || 6, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 300" width="${w}" height="${w}"><circle cx="150" cy="150" r="138" fill="${o.fondo || '#fbf6ea'}" stroke="${INK}" stroke-width="12"/>
  ${[...Array(12)].map((_, i) => `<path d="M150,22 V${i % 3 ? 38 : 52}" stroke="${INK}" stroke-width="${i % 3 ? 5 : 10}" transform="rotate(${i * 30} 150 150)"/>`).join('')}
  <path class="hh" d="M150,150 V86" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path class="mm" d="M150,150 V46" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="150" cy="150" r="12" fill="${RED}" stroke="${INK}" stroke-width="4"/></svg>`);
  d.hh = d.querySelector('.hh'); d.mm = d.querySelector('.mm'); return d; };
const ponR = (r, h) => { r.hh.setAttribute('transform', `rotate(${f1((h % 12) * 30)} 150 150)`); r.mm.setAttribute('transform', `rotate(${f1((h % 1) * 360)} 150 150)`); };
/* la Casa de Correos con su torre (vb 0 0 760 1000); el hueco de la esfera en (380, 300) */
const CORREOS = (noche) => `<svg viewBox="0 0 760 1000" width="760" height="1000" style="overflow:visible">
  <path d="M380,0 V70" stroke="${INK}" stroke-width="8"/><circle cx="380" cy="60" r="34" fill="${GOLD}" stroke="${INK}" stroke-width="6"/>
  <rect x="250" y="120" width="260" height="330" fill="#e9c79a" stroke="${INK}" stroke-width="8"/><path d="M230,130 L380,90 L530,130 Z" fill="#3d3a44" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <rect x="0" y="440" width="760" height="560" fill="#e9c79a" stroke="${INK}" stroke-width="8"/><rect x="0" y="440" width="760" height="40" fill="#c87a3a" stroke="${INK}" stroke-width="6"/>
  ${[0, 1, 2, 3, 4].map(i => [560, 760].map(y => `<rect x="${50 + i * 140}" y="${y}" width="80" height="140" rx="6" fill="${noche ? '#ffd977' : '#3d3a44'}" stroke="${INK}" stroke-width="6"/>`).join('')).join('')}</svg>`;
const VACA = (c, w = 260, o = {}) => { const d = box(c, 0, 0, w, w * 0.8, { zIndex: o.z || 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 240" width="${w}" height="${w * 0.8}" style="overflow:visible">
  ${[80, 110, 190, 220].map(x => `<path d="M${x},150 V228" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M${x},150 V224" stroke="#fbf6ea" stroke-width="10" stroke-linecap="round"/>`).join('')}
  <ellipse cx="150" cy="130" rx="115" ry="58" fill="#fbf6ea" stroke="${INK}" stroke-width="7"/><path d="M90,100 q20,-20 40,0 q10,30 -20,30 q-30,-5 -20,-30 Z M170,140 q30,-10 40,10 q-10,20 -35,10 Z" fill="${INK}"/>
  <path d="M236,100 C246,70 280,60 296,90 C304,110 290,140 264,140 C248,140 238,124 236,100 Z" fill="#fbf6ea" stroke="${INK}" stroke-width="7"/><ellipse cx="282" cy="124" rx="16" ry="12" fill="#f2b8a8" stroke="${INK}" stroke-width="4"/>
  <path d="M250,76 L240,52 M276,72 L290,50" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><g class="oj"><circle cx="270" cy="94" r="7" fill="${INK}"/></g><path class="ojx" d="M262,86 L278,102 M278,86 L262,102" stroke="${INK}" stroke-width="5" opacity="0"/></svg>`);
  d.oj = d.querySelector('.oj'); d.ojx = d.querySelector('.ojx'); return d; };
const UVAS = (c) => box(c, 0, 0, 220, 240, { zIndex: 20 }, `<svg viewBox="0 0 220 240" width="220" height="240"><path d="M110,10 V40" stroke="#6b4a2a" stroke-width="10"/>${[[70, 60], [110, 60], [150, 60], [50, 100], [90, 100], [130, 100], [170, 100], [70, 140], [110, 140], [150, 140], [90, 180], [130, 180]].map(([x, y], i) => `<circle class="uv" cx="${x}" cy="${y}" r="24" fill="#9fd36a" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
const JOSE = (c, x, y, w, o = {}) => PERS(c, x, y, w, Object.assign({ ropa: '#8a6a3a', pelo: 'corto', pcol: '#3a2a1e' }, o));

/* PORTADA + L1 (sin cortar): la Puerta del Sol de noche, el reloj a punto de las 12, uvas y confeti → «un pastor… por una ternera» */
plano(-1, L(2) - 0.1, { background: '#1d2440' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#141a33, #2b3560)' });
  const est = ESTRELLAS_C(cam, 22, 1);
  const ed = box(cam, 160, 560, 760, 1000, { zIndex: 2 }, CORREOS(true)); const esf = ESFERA(cam, 210, { z: 4 }); set(esf, { x: 435, y: 755 });
  const conf = [...Array(18)].map((_, i) => box(cam, 0, 0, 18, 30, { zIndex: 10, background: [YEL, PINK, '#9fd3c0', '#fff'][i % 4], border: `3px solid ${INK}` }));
  const uv = UVAS(cam); set(uv, { x: 800, y: 1250 });
  const t1 = texto(c, 180, 'EL RELOJ DE LAS UVAS', { size: 76, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 280, 'LO REGALÓ UN ' + hlSpan('PASTOR', 'phl'), { size: 80, color: '#fff', z: 40, shadow: OUT });
  const vaca = VACA(cam, 300, { z: 25 }); const q = chip(c, 560, 1150, '¿una ternera?', { size: 56, bg: PINK, color: INK, z: 41 });
  sfx('swoosh_up', 0.05, 0.5); sp(T.pastor0, 'bell', 0.7); sp(T.ternera1, 'boing', 0.6);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1000, 1.0], [540, 880, 1.25]); brillan(est, t, 1);
    ponR(esf, 11.98 + t / 3600);
    conf.forEach((f, i) => { const k = ((t * 0.25 + i * 0.137) % 1); set(f, { x: (i * 137) % 1080, y: 300 + k * 1500, r: t * 200 + i * 40 }); });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t2, { r: -2 + wobble(t, 0.5, 0.8) });
    set(vaca, { o: t > T.ternera1 - 0.2 ? 1 : 0, x: 120, y: 1200 - p(t, T.ternera1 - 0.2, 0.4, E.outBack) * 120 });
    set(q, { o: t > T.ternera1 ? 1 : 0, s: pop(t, T.ternera1, 0.3), r: -4 });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L4): León (corte), un solo mundo y una sola dirección: el chaval con las vacas → la ternera se muere → el padre, a lo lejos, con el palo → el chaval huye hacia la derecha y la cámara lo sigue */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#9fd0ee' }, c => {
  const M = MUNDO(c, 4200, 2400); const SUELO = 1700;
  M.far.innerHTML = `<svg viewBox="0 0 4200 2400" width="4200" height="2400"><path d="M0,1500 L400,900 L700,1250 L1100,800 L1500,1200 L1900,850 L2300,1250 L2800,900 L3300,1300 L3800,950 L4200,1250 V2400 H0 Z" fill="#8a96a8" stroke="${INK}" stroke-width="6"/></svg>`;
  box(M.w, 0, SUELO, 4200, 900, { zIndex: 4, background: '#7d9a62', borderTop: `10px solid ${INK}` });
  const camino_ = box(M.w, 0, SUELO + 40, 4200, 60, { zIndex: 5, background: '#c9b48a', borderTop: `4px solid ${INK}`, borderBottom: `4px solid ${INK}` });
  const vacas = [0, 1, 2].map(i => VACA(M.w, 260, { z: 6 })), ter = VACA(M.w, 170, { z: 7 });
  const jose = PERSm(M.w, 210, { ropa: '#8a6a3a', pelo: 'corto', pcol: '#3a2a1e', z: 8, piernas: true, calzas: '#4a3b2e' });
  const nube = box(c, 560, 470, 440, 440, { zIndex: 30, background: '#fbf6ea', border: `8px solid ${INK}`, borderRadius: '50%', overflow: 'hidden', transformOrigin: '20% 100%' });
  const padre = PERS(nube, 90, 110, 260, { ropa: '#5e5a52', pelo: 'calvo', barba: true, pcol: '#6b6a74', severo: true });
  const palo = box(nube, 320, 90, 18, 240, { zIndex: 9, background: '#8a5a32', border: `4px solid ${INK}`, borderRadius: '8px', transformOrigin: '50% 100%' });
  const bolas = [0, 1].map(i => box(c, 520 - i * 50, 930 + i * 50, 50 - i * 16, 50 - i * 16, { zIndex: 30, background: '#fbf6ea', border: `6px solid ${INK}`, borderRadius: '50%' }));
  const eJ = ETIQUETA(c, 'JOSÉ RODRÍGUEZ LOSADA', 'pastor'), chip_ = chip(c, 300, 420, 'León · principios del s. XIX', { size: 48, bg: '#2b3550' });
  const sol = SOL(c, 1); M.vp.appendChild(sol);
  sp(T.leon, 'whoosh', 0.4); sp(T.muere, 'sad', 0.6); sp(T.paliza, 'thud', 0.7); sp(T.escapa3, 'swoosh_up', 0.7);
  const XJ = 1400, xj = t => XJ + p(t, T.escapa3 - 0.1, L(4) - T.escapa3 + 0.2, E.inCubic) * 1700;
  return t => {
    const cm = camara(M, t, [[L(2) - 0.1, 1150, 1480, 0.82], [T.muere, 1450, 1520, 1.05], [T.escapa3, 1520, 1510, 1.02], [L(4) - 0.1, xj(L(4) - 0.1) + 150, 1500, 1.0]]);
    cielo(M, t, [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]]); set(sol, { x: 860, y: 280 });
    rotuloA(chip_, t, T.leon, T.vacas);
    vacas.forEach((v, i) => set(v, { x: 700 + i * 420, y: SUELO - 208 + Math.sin(t + i) * 2 }));
    const muerta = t > T.muere; ter.style.transformOrigin = '50% 50%'; set(ter, { x: 1650, y: SUELO - 136 + (muerta ? 30 : 0), sy: muerta ? lerp(1, -1, p(t, T.muere, 0.5, E.inOutCubic)) : 1, r: muerta ? 0 : Math.sin(t * 3) * 2 }); ter.oj.setAttribute('opacity', muerta ? 0 : 1); ter.ojx.setAttribute('opacity', muerta ? 1 : 0);
    const corre = t > T.escapa3; pies(jose, 210, xj(t), SUELO - (corre ? Math.abs(Math.sin(t * 11)) * 24 : 0), { r: corre ? 6 : 0 });
    pFace(jose, t, { feliz: muerta ? -1 : 0.6, ceja: muerta ? 22 : 2, jaw: muerta && t < T.escapa3 ? 0.7 : 0, look: corre ? [14, 0] : muerta && t > T.paliza ? [-14, 0] : [10, 4], seed: 1 });
    const vn = t > T.miedo - 0.2 && t < T.escapa3 + 0.3; set(nube, { o: vn ? 1 : 0, s: pop(t, T.miedo - 0.2, 0.4) }); bolas.forEach((b, i) => set(b, { o: vn ? 1 : 0, s: pop(t, T.miedo - 0.3 - i * 0.1, 0.3) }));
    pFace(padre, t, { feliz: -1, ceja: -18, jaw: t > T.paliza && t < T.paliza + 0.8 ? 0.8 : 0, look: [14, 0], seed: 2 }); set(palo, { r: 20 + Math.sin(t * 9) * 18 });
    etiquetaA(eJ, t, T.losada - 0.1, T.muere, cm, XJ, SUELO - 330, -200);
  };
}, { sfx: false });

/* ACTO 2 (L4 → L6): Londres (corte): la relojería llena de relojes; el chaval barre → aprende → maestro relojero con su lupa */
plano(L(4) - 0.1, L(6) - 0.1, { background: '#5e6a7a' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#4a3b2e', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 6px, transparent 6px 90px)' });
  box(cam, -400, 1380, 1880, 1000, { zIndex: 1, background: '#8a6a3a', borderTop: `10px solid ${INK}` });
  const rel = [[80, 420, 220], [360, 380, 170], [580, 440, 230], [860, 400, 160], [180, 720, 160], [760, 700, 200]].map(([x, y, w]) => { const r = ESFERA(cam, w, { z: 3, fondo: ['#fbf6ea', '#f4e6b0', '#e9e2cf'][x % 3] }); set(r, { x, y }); r.h0 = (x * 7 % 12); return r; });
  const jose = JOSE(cam, 380, 900, 320);
  const escoba = box(cam, 0, 0, 60, 420, { zIndex: 9, transformOrigin: '50% 10%' }, `<svg viewBox="0 0 60 420" width="60" height="420"><rect x="24" y="0" width="12" height="320" fill="#8a5a32" stroke="${INK}" stroke-width="4"/><path d="M4,320 H56 L60,420 H0 Z" fill="#e9c75c" stroke="${INK}" stroke-width="5"/></svg>`);
  const mesa = box(cam, 120, 1240, 840, 60, { zIndex: 12, background: '#6b4a2a', border: `6px solid ${INK}` });
  const lupa = box(cam, 0, 0, 120, 120, { zIndex: 14, borderRadius: '50%', border: `12px solid ${INK}`, background: 'rgba(191,227,245,.5)' });
  const polvo = [0, 1, 2].map(() => box(cam, 0, 0, 50, 50, { zIndex: 13, borderRadius: '50%', background: 'rgba(200,190,170,.7)' }));
  const fama = chip(c, 300, 420, 'relojero famoso', { size: 60, bg: GOLD, color: INK, z: 40 }), lon = chip(c, 360, 420, 'Londres', { size: 60, bg: '#2b3550', z: 40 });
  sp(T.londres, 'whoosh', 0.4); sp(T.barriendo, 'paper', 0.6); sp(T.aprende, 'tick', 0.6); sp(T.famosos, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(6) - 0.1, [540, 1000, 1.0], [540, 940, 1.15]);
    const maestro = t > T.aprende;
    rel.forEach((r, i) => ponR(r, maestro ? 10.17 + t / 3600 : r.h0 + t * 0.3 * (i % 2 ? 1 : -1)));
    set(escoba, { o: maestro ? 0 : 1, x: 560 + Math.sin(t * 6) * 60, y: 960, r: Math.sin(t * 6) * 20 });
    polvo.forEach((q, i) => { const k = ((t * 1.2 + i / 3) % 1); set(q, { o: !maestro && t > T.relojeria ? 1 - k : 0, x: 560 + Math.sin(t * 6) * 60 + i * 30, y: 1330 - k * 80, s: 0.5 + k }); });
    set(lupa, { o: maestro ? 1 : 0, x: 600, y: 1080 + Math.sin(t * 2) * 8 });
    pFace(jose, t, { feliz: maestro ? 1 : 0.2, ceja: maestro ? -6 : 6, look: maestro ? [14, 10] : [10, 14], seed: 1 });
    rotuloA(lon, t, T.londres, T.aprende); set(fama, { o: t > T.famosos - 0.1 ? 1 : 0, s: pop(t, T.famosos - 0.1, 0.35), r: -3 });
  };
});

/* ACTO 3 (L6 → L8): Madrid, 1866 (corte): la torre sin reloj → llega el regalo → la reina Isabel II lo inaugura */
plano(L(6) - 0.1, L(8) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#9fd0ee, #eaf2f6)' });
  box(cam, -400, 1560, 1880, 900, { zIndex: 1, background: '#c9b48a', borderTop: `10px solid ${INK}` });
  const ed = box(cam, 160, 560, 760, 1000, { zIndex: 2 }, CORREOS(false));
  const hueco = box(cam, 435, 755, 210, 210, { zIndex: 3, borderRadius: '50%', background: '#3d3a44', border: `8px solid ${INK}` });
  const esf = ESFERA(cam, 210, { z: 4 });
  const reina = PERS(cam, 600, 1160, 300, { ropa: '#c8102e', gorro: 'corona', pelo: 'moño', pcol: '#3a2a1e' });
  const cinta = box(cam, 140, 1420, 800, 20, { zIndex: 12, background: RED, border: `3px solid ${INK}`, transformOrigin: '50% 50%' });
  const ano = chip(c, 420, 420, '1866', { size: 72, bg: '#2b3550', z: 40 }), eR = ETIQUETA(c, 'ISABEL II', 'reina');
  sp(T.regala, 'swoosh_up', 0.7); sp(T.puerta6, 'bell', 0.8); sp(T.inaugura, 'tada', 0.7);
  return t => {
    const cm = deriva(cam, t, L(6) - 0.1, L(8) - 0.1, [540, 900, 0.9], [560, 980, 1.08]);
    const kr = p(t, T.regala, 0.8, E.outBack); set(esf, { o: t > T.regala ? 1 : 0, x: 435, y: lerp(-300, 755, kr), r: (1 - kr) * 90 }); ponR(esf, 12 + t / 3600);
    const vr = t > T.inaugura - 0.3; set(reina, { o: vr ? 1 : 0, y: (1 - p(t, T.inaugura - 0.3, 0.5, E.outBack)) * 300 }); pFace(reina, t, { feliz: 1, look: [-10, -10], seed: 5 });
    set(cinta, { o: 1, sx: t > T.ochocientos ? 1 - p(t, T.ochocientos, 0.5) : 1 });
    set(ano, { o: t > T.ochocientos - 0.1 ? 1 : 0, s: pop(t, T.ochocientos - 0.1, 0.35), r: -4 });
    etiquetaA(eR, t, T.reina, L(8), cm, 750, 1250, -260);
  };
});

/* ACTO 4 · REMATE (L8 → L10): Nochevieja hoy (corte): la gente, las campanadas y las uvas → arriba del reloj asoma el pastorcillo con su ternera */
plano(L(8) - 0.1, L(10) - 0.1, { background: '#1d2440' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#141a33, #2b3560)' });
  const est = ESTRELLAS_C(cam, 22, 1);
  const ed = box(cam, 160, 560, 760, 1000, { zIndex: 2 }, CORREOS(true)); const esf = ESFERA(cam, 210, { z: 4 }); set(esf, { x: 435, y: 755 });
  const gente = [...Array(9)].map((_, i) => box(cam, -60 + i * 140, 1440 + (i % 2) * 40, 180, 300, { zIndex: 8, background: ['#2b8ad6', '#e8507a', '#2e6b3a', '#7a5aa8'][i % 4], border: `6px solid ${INK}`, borderRadius: '90px 90px 20px 20px' }));
  const uv = UVAS(cam); set(uv, { x: 780, y: 1180 }); const uvs = [...uv.querySelectorAll('.uv')];
  const din = texto(cam, 470, '¡DONG!', { size: 110, color: YEL, x: 600, w: 420, z: 20, shadow: `5px 5px 0 ${INK}` });
  const jose = JOSE(cam, 470, 450, 150), ter = VACA(cam, 120, { z: 9 });
  sp(T.mismo, 'pop', 0.4); [0, 1, 2].forEach(i => sp(T.campanadas + i * 0.6, 'bell', 0.7)); sp(T.pastor9, 'sparkle', 0.8);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(10) - 0.1, [540, 1000, 0.95], [540, 880, 1.15]); brillan(est, t, 1);
    ponR(esf, 11.995 + t / 3600);
    const nd = clamp(Math.floor((t - T.campanadas) / 0.6) + 1, 0, 12); uvs.forEach((u, i) => u.setAttribute('opacity', i < 12 - nd ? 1 : 0.15));
    set(din, { o: t > T.campanadas && t < T.uvas9 ? (Math.floor((t - T.campanadas) / 0.6) % 2 ? 0.6 : 1) : 0, s: 1 + 0.08 * Math.sin(t * 10), r: -6 });
    const kj = p(t, T.pastor9 - 0.3, 0.5, E.outBack); set(jose, { o: t > T.pastor9 - 0.3 ? 1 : 0, y: (1 - kj) * 120 }); pFace(jose, t, { feliz: 1, closed: t > T.pastor9 + 0.6, look: [0, 4], seed: 1 });
    set(ter, { o: t > T.pastor9 - 0.3 ? 1 : 0, x: 610, y: 560 + (1 - kj) * 120 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Dónde te comes', 'tú las uvas?', { size: 88, draw: c => [['en casa', YEL], ['en la Puerta del Sol', PINK], ['en el pueblo', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(99, 'El reloj del pastor', ['RELOJES', 'y uvas']);

Story.run({
  textura: true,
  ovalo: [[T.regalo, L(10) - 0.15]],
  vecino: { risa: [[T.pastor9 + 0.3, T.pastor9 + 1.4]], sorpresa: [], golpes: [] },
});
