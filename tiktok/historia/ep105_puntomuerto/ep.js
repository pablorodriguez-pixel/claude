/* Ep. 105 · «Bajar en punto muerto gasta MÁS» — mito con historia: con carburador (años 70) tu padre tenía razón; con inyección (desde los 90) es al revés.
   Un puerto de montaña visto de lado; el coche baja y la cámara lo sigue en UNA dirección. Arriba, un panel fijo: palanca (N / 3ª), cuentavueltas y la gasolina que entra.
   Cortes solo al cambiar de época (70 → 90) y al remate. */
Story.prepara();
const T = {
  muerto0: Q('punto muerto'), gasta: Q('gasta más'),
  padre1: Q('tu padre'), cuarenta: Q('cuarenta años'), razon: Q('tenía razón'),
  setenta: Q('años setenta'), seiscientos: Q('el seiscientos'), carburador2: Q('llevan carburador'),
  tonto: Q('es tonto'), pie: Q('levantes el pie'), echando: Q('echando gasolina'),
  bajada4: Q('en una bajada'), revolucionado: Q('revolucionado'), chupando: Q('chupando'),
  ponia: Q('ponía punto muerto'), ralenti: Q('ralentí'), ahorraba: Q('y ahorraba'),
  noventa: Q('los noventa'), inyeccion: Q('inyección electrónica'), cerebro: Q('un cerebro'),
  marcha7: Q('la marcha metida'), corta: Q('corta la gasolina'), cero: Q('cero'),
  ruedas: Q('las ruedas'), gratis: Q('gratis'),
  encambio: Q('en cambio'), solo9: Q('encendido solo'), calarse: Q('no calarse'),
  osea: Q('o sea'), contrario: Q('lo contrario'), freno: Q('freno motor'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const VERDE = '#2e6b3a', PEND = 0.3, ANG = Math.atan(PEND) * 180 / Math.PI;
const yR = x => 900 + PEND * x;
/* SEAT 600 de lado (vb 0 0 420 220) y coche moderno (vb 0 0 460 200) */
const SEIS = (c, z = 8) => box(c, 0, 0, 420, 220, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 420 220" width="420" height="220" style="overflow:visible">
  <path d="M20,170 C20,120 40,100 90,92 C110,40 150,20 220,20 C300,20 330,50 350,92 C390,100 404,130 404,170 Z" fill="#f4efe2" stroke="${INK}" stroke-width="8"/>
  <path d="M125,92 C140,50 170,38 210,38 L210,92 Z M230,38 C280,38 310,55 325,92 L230,92 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/><path d="M20,140 H404" stroke="#c8102e" stroke-width="8"/>
  ${[100, 320].map(x => `<circle cx="${x}" cy="176" r="40" fill="#2a2530" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="176" r="16" fill="#d8d2c4"/>`).join('')}</svg>`);
const MODERNO = (c, z = 8) => box(c, 0, 0, 460, 200, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 460 200" width="460" height="200" style="overflow:visible">
  <path d="M14,150 L24,110 L130,90 L200,40 L340,40 L410,95 L446,110 L450,150 Z" fill="#c8102e" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M215,52 L330,52 L385,95 L160,95 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/>${[110, 360].map(x => `<circle cx="${x}" cy="156" r="40" fill="#2a2530" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="156" r="16" fill="#d8d2c4"/>`).join('')}</svg>`);
/* el puerto: monte de lado con la carretera en bajada */
function puerto(c, tarde) {
  const M = MUNDO(c, 7000, 4200);
  M.far.innerHTML = `<svg viewBox="0 0 7000 4200" width="7000" height="4200"><path d="M0,900 L600,300 L1200,800 L1900,200 L2600,900 L3300,350 L4100,1000 L4800,500 L5600,1100 L6300,600 L7000,1100 V4200 H0 Z" fill="${tarde ? '#8a7aa0' : '#8a96a8'}" stroke="${INK}" stroke-width="6"/></svg>`;
  box(M.w, 0, 0, 7000, 4200, { zIndex: 1, background: '#7d9a62', clipPath: `polygon(0 ${f1(900 / 42 + 2)}%, 100% ${f1((900 + PEND * 7000) / 42 + 2)}%, 100% 100%, 0 100%)` });
  const carr = box(M.w, 0, 0, 7000, 4200, { zIndex: 2 }, `<svg width="7000" height="4200"><path d="M0,${900} L7000,${900 + PEND * 7000}" stroke="${INK}" stroke-width="70"/><path d="M0,${900} L7000,${900 + PEND * 7000}" stroke="#6d6a72" stroke-width="56"/><path d="M0,${900} L7000,${900 + PEND * 7000}" stroke="#f4efe2" stroke-width="5" stroke-dasharray="60 60"/></svg>`);
  for (let i = 0; i < 14; i++) { const x = 250 + i * 500; box(M.w, x, yR(x) + 60, 70, 150, { zIndex: 3, background: '#4f7a3a', border: `6px solid ${INK}`, borderRadius: '50% 50% 10px 10px' }); }
  return { M };
}
const ponCoche = (car, x, w, h) => set(car, { x: x - w / 2, y: yR(x) - h - 22, r: ANG });
/* panel fijo arriba: palanca, cuentavueltas, gasolina (gotas) y lectura de consumo */
function panel(c) {
  const p_ = box(c, 40, 400, 1000, 400, { zIndex: 45, background: 'rgba(29,26,34,.92)', border: `8px solid ${INK}`, borderRadius: '40px' });
  const pal = box(p_, 30, 40, 280, 300, {}, `<svg viewBox="0 0 280 300" width="280" height="300"><rect x="120" y="150" width="40" height="140" fill="#3d3a44" stroke="#000" stroke-width="5"/><circle cx="140" cy="110" r="100" fill="#3d3a44" stroke="#fbf6ea" stroke-width="8"/><text class="mt" x="140" y="152" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="120" fill="#fbf6ea">N</text></svg>`);
  const taco = box(p_, 330, 30, 340, 260, {}, `<svg viewBox="0 0 340 260" width="340" height="260"><path d="M40,220 A130,130 0 0,1 300,220" fill="none" stroke="#fbf6ea" stroke-width="8"/><path d="M235,120 A130,130 0 0,1 300,220" fill="none" stroke="${RED}" stroke-width="14"/>${[0, 1, 2, 3, 4, 5, 6].map(i => { const a = (-180 + i * 30) * Math.PI / 180; return `<text x="${f1(170 + Math.cos(a) * 100)}" y="${f1(230 + Math.sin(a) * 100)}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="#fbf6ea">${i}</text>`; }).join('')}<g class="ag"><path d="M170,220 L170,100" stroke="#ff7a3a" stroke-width="9" stroke-linecap="round"/></g><circle cx="170" cy="220" r="14" fill="#fbf6ea"/><text x="170" y="255" text-anchor="middle" font-family="Bricolage" font-size="24" fill="#fbf6ea">x1000 rpm</text></svg>`);
  const surt = box(p_, 700, 30, 260, 230, {}, `<svg viewBox="0 0 260 230" width="260" height="230"><rect x="80" y="10" width="100" height="60" rx="10" fill="#ffb020" stroke="#000" stroke-width="5"/><text x="130" y="52" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="${INK}">GAS</text><path d="M120,70 V90 H140 V70" fill="#ffb020"/></svg>`);
  const gotas = [...Array(8)].map(() => box(p_, 0, 0, 22, 32, { background: '#ffb020', border: `3px solid #000`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }));
  const lect = box(p_, 330, 300, 640, 80, { fontFamily: 'SpaceMono', fontWeight: 700, fontSize: '56px', textAlign: 'center', lineHeight: '80px', color: '#ffb020', background: '#000', borderRadius: '14px' }, '');
  return { p_, mt: pal.querySelector('.mt'), ag: taco.querySelector('.ag'), gotas, lect };
}
const ponPanel = (P, t, o) => { P.mt.textContent = o.m; P.mt.setAttribute('fill', o.m === 'N' ? YEL : '#fbf6ea'); const rpm = o.rpm + Math.sin(t * 9) * 80;
  P.ag.setAttribute('transform', `rotate(${f1(-90 + clamp(rpm / 6000) * 180)} 170 220)`);
  P.gotas.forEach((g, i) => { const k = ((t * (0.6 + o.gas * 1.6) + i / 8) % 1), on = i < Math.round(o.gas * 8); set(g, { o: on ? 1 - k * 0.6 : 0, x: 815 + (i % 3 - 1) * 26, y: 125 + k * 110 }); });
  P.lect.textContent = o.l || ''; P.lect.style.color = o.lc || '#ffb020'; P.lect.style.opacity = o.l ? 1 : 0; };

/* PORTADA + L1 (sin cortar): el 600 baja el puerto; la palanca en «N» y «GASTA MÁS» → tu padre: «¡en punto muerto, que ahorras!» · hace 40 años */
plano(-1, L(2) - 0.1, { background: '#9fd0ee' }, c => {
  const W = puerto(c); const car = SEIS(W.M.w);
  const pad = PERS(W.M.w, 0, 0, 120, { ropa: '#6b4a2a', pelo: 'corto', bigote: true, pcol: '#2a2118' }); pad.style.zIndex = 7;
  const pal = box(c, 330, 420, 420, 420, { zIndex: 40, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 280 300" width="420" height="450"><rect x="120" y="150" width="40" height="140" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><circle cx="140" cy="110" r="100" fill="#3d3a44" stroke="${INK}" stroke-width="10"/><text x="140" y="152" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="120" fill="${YEL}">N</text></svg>`);
  const t1 = texto(c, 170, 'BAJAR EN PUNTO MUERTO', { size: 70, color: '#fff', z: 41, shadow: OUT });
  const t2 = texto(c, 270, hlSpan('GASTA MÁS', 'phl', RED), { size: 130, color: '#fff', z: 41, shadow: OUT });
  const bo = BOCADILLO(W.M.w, 0, 0, '¡En punto muerto,<br>que ahorras!', { size: 50 });
  const ch = chip(c, 380, 1120, 'hace 40 años', { size: 60, bg: '#2b3550', z: 42 });
  sfx('swoosh_up', 0.05, 0.5); sp(T.gasta, 'stamp', 0.9); sp(T.padre1, 'pop', 0.5); sp(T.razon, 'ding', 0.7);
  const xc = t => 900 + (t + 1) * 160;
  return t => {
    const x = xc(t); camara(W.M, t, [[-1, xc(-1) + 150, yR(xc(-1)) - 300, 0.62], [L(2), xc(L(2)) + 150, yR(xc(L(2))) - 300, 0.7]]);
    cielo(W.M, t, [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]]);
    ponCoche(car, x, 420, 220); set(pad, { x: x + 10, y: yR(x) - 255, r: ANG }); pFace(pad, t, { feliz: 1, look: [10, 0], seed: 1 });
    const fuera = p(t, T.padre1 - 0.3, 0.4); set(pal, { o: 1 - fuera, s: 1 + 0.05 * Math.sin(t * 6), r: -8 }); set(t1, { o: 1 - fuera }); set(t2, { o: 1 - fuera, r: -3 }); paint(c.querySelector('.phl'), t, 0.2, 0.4);
    set(bo, { o: t > T.padre1 ? 1 : 0, x: x - 200, y: yR(x) - 620, s: pop(t, T.padre1, 0.3), r: -3 });
    set(ch, { o: t > T.cuarenta - 0.1 ? 1 : 0, s: pop(t, T.cuarenta - 0.1, 0.35), r: -4 });
  };
}, { sfx: false });

/* AÑOS 70 (L2 → L6): sigue bajando el 600 (otro tramo, misma dirección). Panel: con marcha → el carburador sigue echando y el motor chupa; en N → ralentí, poco gasto ✓ */
plano(L(2) - 0.1, L(6) - 0.1, { background: '#e9c79a' }, c => {
  const W = puerto(c); const car = SEIS(W.M.w); const P = panel(c);
  const ch = chip(c, 380, 300, 'Años 70 · carburador', { size: 54, bg: '#6b4a2a', z: 50 });
  const tonto = texto(c, 1180, 'sigue echando gasolina', { size: 70, color: '#fff', z: 50, shadow: OUT });
  const ok = texto(c, 1180, '✓ ahorraba', { size: 96, color: YEL, z: 50, shadow: OUT });
  sp(T.setenta, 'whoosh', 0.4); sp(T.echando, 'squish', 0.6); sp(T.revolucionado, 'clockfast', 0.6); sp(T.ponia, 'click', 0.7); sp(T.ahorraba, 'ding', 0.8);
  const xc = t => 2200 + (t - L(2)) * 120;
  return t => {
    const x = xc(t); camara(W.M, t, [[L(2) - 0.1, xc(L(2)) + 100, yR(xc(L(2))) - 220, 0.78], [L(6), xc(L(6)) + 100, yR(xc(L(6))) - 220, 0.82]]);
    cielo(W.M, t, [[-1, '#f6c98a', '#fbe6c0', '#c87a3a', 0.12], [999, '#f6c98a', '#fbe6c0', '#c87a3a', 0.12]]);
    ponCoche(car, x, 420, 220); set(ch, { o: 1, s: pop(t, L(2), 0.3), r: -3 });
    const enN = t > T.ponia - 0.1;
    ponPanel(P, t, enN ? { m: 'N', rpm: 900, gas: 0.25, l: t > T.ralenti ? 'ralentí: lo mínimo' : '' } : t > T.bajada4 - 0.2 ? { m: '3ª', rpm: 4300, gas: 1, l: 'gastando…', lc: RED } : { m: '3ª', rpm: 2500, gas: t > T.pie ? 0.8 : 0.5 });
    set(tonto, { o: t > T.echando - 0.2 && t < T.bajada4 ? 1 : 0, s: pop(t, T.echando - 0.2, 0.3), r: -2 });
    set(ok, { o: t > T.ahorraba - 0.1 ? 1 : 0, s: pop(t, T.ahorraba - 0.1, 0.35), r: -3 });
  };
}, { sfx: false });

/* AÑOS 90 → HOY (L6 → L10, corte): el coche moderno baja el mismo puerto. La centralita («un cerebro»): con marcha y sin acelerar → 0,0 L; en N → quema para no calarse */
plano(L(6) - 0.1, L(10) - 0.1, { background: '#9fd0ee' }, c => {
  const W = puerto(c); const car = MODERNO(W.M.w); const P = panel(c);
  const ch = chip(c, 180, 300, 'Años 90 · inyección electrónica', { size: 50, bg: '#1f4fa0', z: 50 });
  const ecu = box(c, 720, 840, 320, 240, { zIndex: 50, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 320 240" width="320" height="240"><rect x="10" y="40" width="300" height="190" rx="20" fill="#3d3a44" stroke="${INK}" stroke-width="8"/>${[...Array(7)].map((_, i) => `<path d="M${40 + i * 40},40 V10 M${40 + i * 40},230 V240" stroke="${INK}" stroke-width="8"/>`).join('')}<path d="M100,140 C80,90 140,70 160,100 C170,60 240,70 220,120 C250,140 220,190 180,170 C170,200 110,200 110,170 C80,180 70,150 100,140 Z" fill="#f4b8c8" stroke="${INK}" stroke-width="6"/><path d="M160,100 C150,130 170,150 160,175" stroke="${INK}" stroke-width="5" fill="none"/></svg>`);
  const flechas = texto(c, 1180, 'las ruedas mueven el motor', { size: 62, color: '#fff', z: 50, shadow: OUT });
  const gratis = texto(c, 900, 'GRATIS', { size: 150, color: YEL, z: 51, shadow: OUT });
  sp(T.noventa, 'whoosh', 0.5); sp(T.cerebro, 'sparkle', 0.8); sp(T.corta, 'click', 0.7); sp(T.cero, 'ding', 1); sp(T.gratis, 'tada', 0.7); sp(T.encambio, 'click', 0.6); sp(T.calarse, 'error', 0.5);
  const xc = t => 3000 + (t - L(6)) * 100;
  return t => {
    const x = xc(t); camara(W.M, t, [[L(6) - 0.1, xc(L(6)) + 100, yR(xc(L(6))) - 220, 0.78], [L(10), xc(L(10)) + 100, yR(xc(L(10))) - 220, 0.82]]);
    cielo(W.M, t, [[-1, '#9fd0ee', '#eaf2f6', '#ffffff', 0], [999, '#9fd0ee', '#eaf2f6', '#ffffff', 0]]);
    ponCoche(car, x, 460, 200); set(ch, { o: 1, s: pop(t, L(6), 0.3), r: -3 });
    const enN = t > T.encambio;
    ponPanel(P, t, enN ? { m: 'N', rpm: 850, gas: 0.35, l: t > T.solo9 ? '0,8 L cada hora' : '', lc: RED } : t > T.marcha7 - 0.2 ? { m: '3ª', rpm: 2600, gas: t > T.corta ? 0 : 0.6, l: t > T.cero - 0.1 ? '0,0 L' : '', lc: '#5fd36a' } : { m: '3ª', rpm: 2600, gas: 0.6 });
    set(ecu, { o: t > T.cerebro - 0.2 && t < T.ruedas ? 1 : 0, s: pop(t, T.cerebro - 0.2, 0.4) * (1 + 0.05 * Math.sin(t * 6)) });
    set(flechas, { o: t > T.ruedas - 0.1 && t < T.encambio ? 1 : 0, s: pop(t, T.ruedas - 0.1, 0.3) }); set(gratis, { o: t > T.gratis - 0.1 && t < T.encambio ? 1 : 0, s: pop(t, T.gratis - 0.1, 0.35), r: -5 });
  };
}, { sfx: false });
shakeAt(T.cero, 0.25, 10);

/* REMATE (L10, corte): tu padre en el coche nuevo, en N, tan feliz… y los frenos al rojo («sin freno motor») */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'repeating-conic-gradient(from 0deg at 50% 50%, #efe1c6 0 9deg, #f6ead4 9deg 18deg)' });
  const pad = PERS(cam, 120, 640, 400, { ropa: '#6b4a2a', pelo: 'calvo', bigote: true, pcol: '#6b6a74' });
  const pal = box(cam, 600, 720, 300, 320, {}, `<svg viewBox="0 0 280 300" width="300" height="320"><rect x="120" y="150" width="40" height="140" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><circle cx="140" cy="110" r="100" fill="#3d3a44" stroke="${INK}" stroke-width="10"/><text x="140" y="152" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="120" fill="${YEL}">N</text></svg>`);
  const disco = box(cam, 600, 1080, 260, 260, { zIndex: 5, borderRadius: '50%', border: `10px solid ${INK}`, background: 'radial-gradient(#3d3a44 25%, #9a9a9a 26%)' });
  const al = texto(cam, 1360, 'sin freno motor', { size: 76, color: RED, x: 360, w: 700, z: 8, shadow: `4px 4px 0 #fff` });
  const x = texto(cam, 420, 'AL REVÉS', { size: 130, color: RED, z: 8, shadow: `6px 6px 0 #fff, 9px 9px 0 ${INK}` });
  sp(T.contrario, 'stamp', 0.9); sp(T.freno, 'error', 0.6);
  return t => {
    zoom(cam, t, L(10) - 0.1, L(11) - L(10), 0.1);
    pFace(pad, t, { feliz: t > T.freno ? -0.6 : 1, ceja: t > T.freno ? 20 : 2, jaw: t > T.freno ? 0.6 : 0, look: [10, 6], seed: 1 });
    set(x, { o: t > T.contrario - 0.1 ? 1 : 0, s: t > T.contrario - 0.1 ? lerp(1.8, 1, p(t, T.contrario - 0.1, 0.2)) : 0, r: -6 });
    const kf = p(t, T.freno - 0.3, 0.8); disco.style.background = `radial-gradient(#3d3a44 25%, ${mixC('#9a9a9a', '#ff4a1a', kf)} 26%)`; disco.style.boxShadow = `0 0 ${f1(kf * 80)}px ${f1(kf * 30)}px rgba(255,80,20,.6)`;
    set(al, { o: t > T.freno - 0.1 ? 1 : 0, s: pop(t, T.freno - 0.1, 0.3), r: -3 });
  };
});
shakeAt(T.contrario, 0.3, 12);

/* L11 · pregunta final (+ «Os leo») */
preguntaFinal('¿En tu casa quién sigue', 'bajando en punto muerto?', { size: 76, draw: c => [['mi padre', YEL], ['mi suegro', PINK], ['yo, no te voy a mentir', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 52, bg: col, color: INK }), L(11) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L12 · cierre */
cierre(105, 'El punto muerto', ['COCHES', 'y mitos']);

Story.run({
  textura: true,
  ovalo: [[T.contrario + 0.3, L(11) - 0.15]],
  vecino: { risa: [[T.freno, T.freno + 1.2]], sorpresa: [], golpes: [] },
});
