/* Ep. 88 · El café lo descubrieron unas cabras (leyenda de Kaldi, Etiopía) — FORMATO CUENTO: un monte con cafetos y un monasterio al fondo;
   cámara de cine (un movimiento por frase, CORTES entre sitios), el cielo de tarde → noche → amanecer. Rótulos dentro de la escena. */
Story.prepara();
const T = {
  cabras0: Q('unas cabras'), bailar1: Q('a bailar'),
  etiopia: Q('etiopía'), pastor: Q('un pastor'), kaldi: Q('kaldi'), monte: Q('al monte'),
  tarde: Q('esa tarde'), bayas: Q('bayas rojas'), locas: Q('se vuelven locas'),
  saltan: Q('saltan'), noche: Q('toda la noche'), bailando: Q('bailando'),
  prueba: Q('kaldi prueba'), tambien: Q('él también'), baila5: Q('a bailar'),
  monje: Q('un monje'), serio: Q('muy serio'), diablo: Q('cosa del diablo'), fuego: Q('al fuego'),
  olor: Q('un olor'), buenisimo: Q('buenísimo'),
  sacan: Q('las sacan'), tuestan: Q('las tuestan'), agua: Q('agua caliente'), beben: Q('se lo beben'),
  primera: Q('por primera vez'), rezan: Q('rezan'), amanecer: Q('hasta el amanecer'), dormirse: Q('sin dormirse'),
  ojo: Q('ojo'), leyenda: Q('es leyenda'), etiopia11: Q('de etiopía'),
  osea: Q('o sea'), persona: Q('no seas persona'), cafe12: Q('primer café'), cabra: Q('una cabra más'),
};
const SUELO = 1500, PIEL_K = '#8a5a3a', ROJO_B = '#d4202a';
/* cabra de perfil mirando a la derecha (vb 0 0 300 260); patas (.pa) y ojos (.oj) animables */
const CABRA = (c, w = 260, col = '#f4efe2', z = 8) => { const d = box(c, 0, 0, w, w * 260 / 300, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 300 260" width="${w}" height="${w * 260 / 300}" style="overflow:visible">
  ${[[80, 0], [110, 1], [190, 2], [220, 3]].map(([x, i]) => `<g class="pa" data-x="${x}"><path d="M${x},150 V240" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M${x},150 V236" stroke="${col}" stroke-width="10" stroke-linecap="round"/></g>`).join('')}
  <path d="M40,110 C20,90 26,70 40,80" stroke="${INK}" stroke-width="12" fill="none" stroke-linecap="round"/>
  <ellipse cx="150" cy="130" rx="110" ry="50" fill="${col}" stroke="${INK}" stroke-width="7"/>
  <path d="M230,110 C240,70 250,50 270,40 L296,74 C290,90 274,96 262,100 C256,112 250,124 246,134 Z" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M262,44 C250,10 230,4 214,14 M272,40 C270,10 256,-2 240,2" stroke="#9a8a6a" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M286,82 C290,100 284,116 276,124" stroke="${INK}" stroke-width="7" fill="none"/>
  <g class="oj"><circle cx="270" cy="62" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="272" cy="62" r="5" fill="${INK}"/></g></svg>`);
  d.pas = [...d.querySelectorAll('.pa')]; d.oj = d.querySelector('.oj'); return d; };
const brinca = (g, t, on, i = 0) => { g.pas.forEach((q, j) => { const x = +q.dataset.x, a = on ? Math.sin(t * 16 + j * 1.7 + i) * 30 : 0; q.setAttribute('transform', `rotate(${f1(a)} ${x} 150)`); });
  g.oj.setAttribute('transform', on ? `rotate(${f1(t * 600 + i * 90)} 270 62)` : ''); };
const NOTAS = (c, n = 4, z = 30) => [...Array(n)].map((_, i) => texto(c, 0, i % 2 ? '♫' : '♪', { size: 80, color: INK, x: 0, w: 90, z }));
const notasA = (ns, t, on, cx, cy) => ns.forEach((e, i) => { const k = ((t * 0.7 + i / ns.length) % 1); set(e, { o: on ? 1 - k : 0, x: cx + (i - 1.5) * 90 + Math.sin(t * 3 + i) * 20, y: cy - k * 220, r: Math.sin(t * 4 + i) * 15 }); });
const CAFETO = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 C-90,-20 -110,-120 -40,-170 C-20,-240 60,-240 80,-170 C150,-130 120,-20 0,0 Z" fill="#3f6a3a" stroke="${INK}" stroke-width="7"/>${[[-50, -80], [-20, -130], [30, -100], [60, -60], [10, -40], [-60, -140], [50, -150]].map(([a, b]) => `<circle class="baya" cx="${a}" cy="${b}" r="13" fill="${ROJO_B}" stroke="${INK}" stroke-width="4"/>`).join('')}</g>`;
const OLOR = (c, n = 3, z = 20) => [...Array(n)].map(() => box(c, 0, 0, 60, 260, { zIndex: z }, `<svg viewBox="0 0 60 260" width="60" height="260"><path d="M30,260 C0,220 60,190 30,150 C0,110 60,80 30,40 C10,20 30,0 30,0" stroke="#8a5a32" stroke-width="10" fill="none" stroke-linecap="round" opacity=".75"/></svg>`));
const olorA = (os, t, on, cx, cy) => os.forEach((o, i) => { const k = ((t * 0.5 + i / os.length) % 1); set(o, { o: on ? Math.sin(k * Math.PI) : 0, x: cx + (i - 1) * 90, y: cy - k * 200 }); });

function monte(c) {
  const M = MUNDO(c, 3200, 2600);
  M.far.innerHTML = `<svg viewBox="0 0 3200 2600" width="3200" height="2600"><path d="M0,1150 C300,900 600,1000 900,880 C1200,760 1500,940 1800,860 C2200,760 2600,920 3200,840 V2600 H0 Z" fill="#7a8f5a" stroke="${INK}" stroke-width="6"/><path d="M0,1300 C500,1180 1000,1260 1600,1190 C2200,1120 2700,1230 3200,1180 V2600 H0 Z" fill="#94a86a" stroke="${INK}" stroke-width="6"/></svg>`;
  const matas = box(M.w, 0, 0, 3200, 2600, { zIndex: 3 }, `<svg viewBox="0 0 3200 2600" width="3200" height="2600" style="overflow:visible">${CAFETO(420, 1500, 1.4)}${CAFETO(760, 1500, 1.15)}${CAFETO(1180, 1500, 1.3)}${CAFETO(1550, 1500, 1.0)}</svg>`);
  const bayas = [...matas.querySelectorAll('.baya')];
  // monasterio redondo (iglesia etíope) con patio y hoguera
  const mon = box(M.w, 2200, 840, 700, 660, { zIndex: 3 }, `<svg viewBox="0 0 700 660" width="700" height="660"><path d="M60,660 V300 H640 V660 Z" fill="#e9dcc2" stroke="${INK}" stroke-width="8"/><path d="M20,310 L350,60 L680,310 Z" fill="#8a5a32" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M350,0 V70 M322,28 H378" stroke="${GOLD}" stroke-width="12"/><path d="M290,660 V500 C290,440 410,440 410,500 V660 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><rect x="130" y="400" width="90" height="90" fill="#3d3a44" stroke="${INK}" stroke-width="6"/><rect x="480" y="400" width="90" height="90" fill="#3d3a44" stroke="${INK}" stroke-width="6"/></svg>`);
  const suelo = box(M.w, 0, SUELO, 3200, 1100, { zIndex: 4, background: '#a8845a', borderTop: `10px solid #6f8a42` });
  const hog = box(M.w, 2150, 1360, 220, 150, { zIndex: 6 }, `<svg viewBox="0 0 220 150" width="220" height="150"><path d="M20,140 L200,110 M30,110 L190,140" stroke="#6b4a2a" stroke-width="18" stroke-linecap="round"/><path class="ll" d="M110,0 C160,50 170,90 150,120 C130,140 90,140 70,120 C50,90 60,50 110,0 Z" fill="#ff8a2a" stroke="${INK}" stroke-width="6"/><path d="M110,50 C130,80 132,100 120,118 C108,128 96,124 92,110 C86,92 96,74 110,50 Z" fill="#ffe27a"/></svg>`);
  const olla = box(M.w, 2180, 1260, 160, 120, { zIndex: 7 }, `<svg viewBox="0 0 160 120" width="160" height="120"><path d="M10,20 H150 C150,90 120,116 80,116 C40,116 10,90 10,20 Z" fill="#3d3a44" stroke="${INK}" stroke-width="7"/><ellipse cx="80" cy="20" rx="70" ry="14" fill="#6b3a1e" stroke="${INK}" stroke-width="6"/></svg>`);
  const kaldi = PERSm(M.w, 240, { ropa: '#f4efe2', pelo: 'corto', pcol: '#1d1a22', piel: PIEL_K, z: 9 });
  const cabras = [0, 1, 2, 3].map(i => CABRA(M.w, [240, 210, 230, 200][i], ['#f4efe2', '#c87a3a', '#3d3a44', '#e6d3b0'][i], 8));
  const monjes = [0, 1, 2].map(i => PERSm(M.w, [250, 210, 210][i], { ropa: ['#c8a050', '#8a5a32', '#8a5a32'][i], pelo: 'calvo', barba: true, pcol: '#1d1a22', piel: PIEL_K, cuello: i === 0, z: 8 }));
  const sol = SOL(c, 1), luna = LUNA(c, 1), est = ESTRELLAS_C(c, 26, 1); [sol, luna, ...est].forEach(e => M.vp.appendChild(e));
  return { M, bayas, hog, olla, kaldi, cabras, monjes, sol, luna, est };
}
const CIELO = () => [[-1, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.tarde - 0.2, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.tarde + 1.2, '#e89a5a', '#f6d08a', '#ffb070', 0.12],
  [T.saltan, '#0f1730', '#2b3a66', '#3a4a8a', 0.45], [T.prueba + 0.3, '#121a38', '#33427a', '#3a4a8a', 0.45], [L(7) - 0.2, '#121a38', '#33427a', '#3a4a8a', 0.45], [L(7), '#8fc3e8', '#f3e2b8', '#ffffff', 0],
  [T.beben + 0.3, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.primera + 0.6, '#0f1730', '#2b3a66', '#3a4a8a', 0.45], [T.amanecer, '#121a38', '#33427a', '#3a4a8a', 0.4], [T.dormirse + 0.6, '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [999, '#f4a46a', '#ffe0a0', '#ffb070', 0.1]];
const pintaM = (W, t) => { cielo(W.M, t, CIELO()); const n = (t > T.saltan - 0.3 && t < L(7)) || (t > T.primera + 0.3 && t < T.dormirse) ? 1 : 0;
  set(W.luna, { x: 820, y: 240, o: n }); brillan(W.est, t, n); set(W.sol, { x: 140, y: t > T.dormirse - 0.4 ? lerp(1100, 320, p(t, T.dormirse - 0.4, 1.6, E.outCubic)) : 300, o: n ? 0 : 1 });
  W.hog.querySelector('.ll').setAttribute('transform', `translate(110 140) scale(${f1(1 + 0.1 * Math.sin(t * 13))} ${f1(1 + 0.15 * Math.sin(t * 9))}) translate(-110 -140)`); };
/* coloca una cabra con las patas en el suelo (x centro) y un salto opcional */
const cabraEn = (g, w, x, salto = 0, r = 0) => set(g, { x: x - w / 2, y: SUELO - w * 240 / 300 - salto, r });

/* L0 · PORTADA (fotograma 0 completo, amarilla): una cabra bailando a dos patas con una taza de café, notas musicales y bayas rojas */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 190, 'El café lo descubrieron…', { size: 80 });
  const t2 = texto(c, 290, '…unas ' + hlSpan('CABRAS', 'phl'), { size: 116, italic: true });
  const g = CABRA(c, 520, '#f4efe2', 8);
  const taza = box(c, 640, 640, 170, 150, { zIndex: 12 }, `<svg viewBox="0 0 170 150" width="170" height="150"><path d="M10,20 H130 L118,140 H22 Z" fill="#fff" stroke="${INK}" stroke-width="8"/><ellipse cx="70" cy="22" rx="60" ry="12" fill="#6b3a1e" stroke="${INK}" stroke-width="6"/><path d="M130,50 C170,50 170,100 124,104" stroke="${INK}" stroke-width="10" fill="none"/></svg>`);
  const ns = NOTAS(c, 4); const bs = [...Array(5)].map((_, i) => box(c, 0, 0, 40, 40, { zIndex: 9, background: ROJO_B, border: `5px solid ${INK}`, borderRadius: '50%' }));
  sfx('swoosh_up', 0.05, 0.6); sp(T.cabras0, 'boing', 0.9); sp(T.cabras0 + 0.2, 'tada', 0.5);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(g, { x: 230, y: 640 - Math.abs(Math.sin(t * 6)) * 40, r: -62 + Math.sin(t * 6) * 8 }); brinca(g, t, true);
    set(taza, { y: -Math.abs(Math.sin(t * 6)) * 40, r: Math.sin(t * 6) * 10 }); notasA(ns, t, true, 520, 640);
    bs.forEach((b, i) => set(b, { x: 220 + i * 160, y: 1240 + Math.sin(t * 4 + i) * 14 }));
  };
}, { sfx: false });

/* PLANO A (L1 → CTA): cabras bailando (avance) → CORTE: Etiopía, Kaldi y su rebaño en el monte → CORTE: comen bayas rojas… y se vuelven locas →
   CORTE: de noche, saltan sin parar; Kaldi no pega ojo → prueba las bayas… y se pone a bailar con ellas */
plano(L(1) - 0.1, L(6) - 0.1, { background: '#8fc3e8' }, c => {
  const W = monte(c);
  const r1 = ROTULO(c, 560, 380, 'ETIOPÍA', 'hace siglos', { w: 420 }), reloj = ROTULO(c, 680, 380, '03:00', 'y siguen', { w: 300, size: 70 });
  const ns = NOTAS(W.M.w, 4), zz = [0, 1, 2].map(i => texto(W.M.w, 0, 'z', { size: 60 + i * 12, italic: true, color: '#f4efe2', x: 0, w: 80, z: 12, shadow: `3px 3px 0 ${INK}` }));
  const XS = [700, 1020, 1260, 1480];
  sp(L(1) + 0.4, 'boing', 0.6); sp(L(2) - 0.1, 'whoosh', 0.5); sp(T.monte, 'pop', 0.4); sp(T.bayas, 'squish', 0.6); sp(T.bayas + 0.4, 'squish', 0.5); sp(T.locas, 'boing', 0.9); sp(T.locas + 0.2, 'glitch', 0.5);
  [0, 1, 2, 3, 4].forEach(i => sp(T.saltan + i * 0.4, 'pop2', 0.35)); sp(T.prueba, 'squish', 0.7); sp(T.baila5, 'tada', 0.7);
  return t => {
    camara(W.M, t, [[L(1) - 0.1, 1000, 1220, 1.0], [L(2) - 0.15, 1020, 1210, 1.08],
      [L(2) - 0.1, 900, 1150, 0.72, 'corte'], [L(3) - 0.15, 1000, 1220, 0.85],
      [L(3) - 0.1, 900, 1300, 1.25, 'corte'], [L(4) - 0.15, 900, 1280, 1.45],
      [L(4) - 0.1, 1000, 1220, 0.85, 'corte'], [L(5) - 0.15, 1000, 1220, 0.92],
      [L(5) - 0.1, 860, 1180, 1.45, 'corte'], [T.tambien, 900, 1200, 1.4], [L(6), 1000, 1230, 1.05]]);
    pintaM(W, t); rotuloA(r1, t, T.etiopia, L(3) - 0.1);
    const avance = t < L(2) - 0.1, locas = avance || t > T.locas, noche = t > T.saltan - 0.3;
    // bayas: desaparecen cuando se las comen
    W.bayas.forEach((b, i) => b.style.opacity = t > T.bayas + i * 0.06 && !avance ? 0.15 : 1);
    W.cabras.forEach((g, i) => { const w = [240, 210, 230, 200][i], x = XS[i] + (t > T.monte && t < T.tarde && !avance ? Math.sin(t * 0.8 + i) * 30 : 0);
      const salto = locas ? Math.abs(Math.sin(t * 6 + i * 1.3)) * 120 : 0, come = !avance && t > T.bayas - 0.3 && t < T.locas;
      cabraEn(g, w, x, salto, locas ? Math.sin(t * 6 + i) * 18 : (come ? 18 : 0)); brinca(g, t, locas, i); });
    // Kaldi: pastorea → mira alucinado → muerto de sueño de noche → prueba una baya → baila
    const baila = t > T.baila5 - 0.2;
    pies(W.kaldi, 240, 830, SUELO - (baila ? Math.abs(Math.sin(t * 6)) * 60 : 0), { r: baila ? Math.sin(t * 6) * 10 : 0 });
    pFace(W.kaldi, t, { feliz: baila ? 1 : (t > T.locas ? -0.4 : 0.6), ceja: t > T.locas && !baila ? 18 : 6, closed: (t > T.noche && t < T.prueba) || baila, jaw: t > T.locas && t < T.saltan ? 0.6 : 0, look: [14, 0] });
    W.kaldi.style.visibility = avance ? 'hidden' : 'visible';
    zz.forEach((z, i) => { const k = ((t - T.noche) * 0.6 + i / 3) % 1; set(z, { o: t > T.noche && t < T.prueba ? 1 - k : 0, x: 870 + i * 40, y: SUELO - 360 - k * 160 }); });
    notasA(ns, t, avance || (t > T.saltan && t < T.prueba) || baila, 900, SUELO - 420);
    const h = Math.round(lerp(22, 27, p(t, T.saltan, T.bailando - T.saltan + 0.6, E.linear))) % 24; reloj.querySelector('div').textContent = `${String(h).padStart(2, '0')}:00`; rotuloA(reloj, t, T.saltan + 0.2, L(5) - 0.1);
  };
});
shakeAt(T.locas, 0.25, 10);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* PLANO B (L7 → L10): CORTE al monasterio: Kaldi enseña las bayas → el monje, muy serio: «cosa del diablo» → CORTE a la hoguera: las tira al fuego →
   sale un olor buenísimo (todos olfatean) → tostar, agua caliente, beber (los ojos como platos) → de noche, los monjes rezan despiertos hasta que sale el sol */
plano(L(7) - 0.1, L(11) - 0.1, { background: '#8fc3e8' }, c => {
  const W = monte(c);
  const os = OLOR(W.M.w, 3), vap = OLOR(W.M.w, 3);
  const bol = box(W.M.w, 0, 0, 120, 70, { zIndex: 10 }, `<svg viewBox="0 0 120 70" width="120" height="70"><path d="M10,10 H110 C110,50 90,66 60,66 C30,66 10,50 10,10 Z" fill="#c87a3a" stroke="${INK}" stroke-width="6"/>${[30, 55, 80].map(x => `<circle cx="${x}" cy="14" r="11" fill="${ROJO_B}" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`);
  const vuelan = [0, 1, 2, 3].map(() => box(W.M.w, 0, 0, 34, 34, { zIndex: 11, background: ROJO_B, border: `4px solid ${INK}`, borderRadius: '50%' }));
  const diab = BOCADILLO(W.M.w, 0, 0, '¡cosa del diablo!', { size: 50 }), mmm = BOCADILLO(W.M.w, 0, 0, 'mmmm…', { size: 54 });
  const tazas = [0, 1, 2].map(() => box(W.M.w, 0, 0, 70, 60, { zIndex: 12 }, `<svg viewBox="0 0 70 60" width="70" height="60"><path d="M4,6 H56 L50,56 H10 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M56,20 C70,20 70,42 52,42" stroke="${INK}" stroke-width="5" fill="none"/></svg>`));
  const pasos = ROTULO(c, 560, 380, '1 · sacar', '', { w: 440, size: 46 }), reloj = ROTULO(c, 680, 380, '23:00', 'y despiertos', { w: 300, size: 70 });
  const pp = ['1 · sacar', '2 · tostar', '3 · agua caliente', '4 · ¡a beber!'], tp = [T.sacan, T.tuestan, T.agua, T.beben];
  sp(T.monje, 'pop', 0.5); sp(T.serio, 'thud', 0.6); sp(T.diablo, 'glitch', 0.8); sp(T.fuego, 'whoosh', 0.8); sp(T.fuego + 0.4, 'burst', 0.6);
  sp(T.olor, 'sparkle', 0.7); sp(T.buenisimo, 'ding', 0.6); tp.forEach(x => sp(x, 'pop2', 0.5)); sp(T.beben + 0.3, 'gulp', 0.8); sp(T.beben + 0.7, 'boing', 0.7); sp(T.dormirse, 'tada', 0.6);
  return t => {
    camara(W.M, t, [[L(7) - 0.1, 2200, 1200, 0.95], [T.serio, 2350, 1150, 1.25], [T.diablo + 0.4, 2480, 1130, 1.5],
      [T.fuego - 0.1, 2180, 1300, 1.3, 'corte'], [L(8) - 0.15, 2170, 1290, 1.4], [T.buenisimo + 0.6, 2280, 1220, 1.1], [T.tuestan, 2230, 1280, 1.35], [T.beben + 0.8, 2330, 1180, 1.25],
      [L(10) - 0.1, 2400, 1150, 0.9, 'corte'], [L(11), 2420, 1140, 1.0]]);
    pintaM(W, t);
    W.bayas.forEach(b => b.style.opacity = 0.2); W.cabras.forEach((g, i) => { cabraEn(g, [240, 210, 230, 200][i], 1800 + i * 110, Math.abs(Math.sin(t * 6 + i)) * 50); brinca(g, t, true, i); });
    // Kaldi con el cuenco de bayas
    pies(W.kaldi, 240, 2020, SUELO); pFace(W.kaldi, t, { feliz: t > T.beben ? 1 : 0.4, ceja: t > T.diablo ? 16 : 4, look: [14, -4], jaw: t > L(7) && t < T.monje + 0.6 ? 0.5 : 0 });
    set(bol, { x: 2080, y: SUELO - 230, o: t < T.fuego ? 1 : 0 });
    // monjes
    const XM = [2540, 2420, 2680], despiertos = t > T.beben + 0.3;
    W.monjes.forEach((m, i) => { const vis = i === 0 || t > T.olor - 0.3; m.style.visibility = vis ? 'visible' : 'hidden'; pies(m, i ? 210 : 250, XM[i], SUELO);
      pFace(m, t, { feliz: t > T.olor ? 1 : -0.8, ceja: despiertos ? 26 : (t > T.olor ? 4 : 16), closed: t > T.olor && t < T.sacan, look: [-12, 0], jaw: i === 0 && t > T.diablo - 0.2 && t < T.fuego ? 0.6 : 0, seed: i });
      if (despiertos) m.querySelectorAll(`.pe${m.pid} ellipse`).forEach(e => { e.setAttribute('rx', 22); e.setAttribute('ry', 24); }); });
    set(diab, { x: 2380, y: 820, o: t > T.diablo - 0.2 && t < T.fuego + 0.4 ? 1 : 0, s: pop(t, T.diablo - 0.2, 0.3), r: -3 });
    vuelan.forEach((v, i) => { const k = p(t, T.fuego + i * 0.08, 0.5, E.inCubic); set(v, { o: t > T.fuego && k < 1 ? 1 : 0, x: lerp(2500, 2240 + i * 20, k), y: lerp(1150, 1380, k) - Math.sin(k * Math.PI) * 200 }); });
    olorA(os, t, t > T.olor - 0.2 && t < L(10), 2250, 1150); olorA(vap, t, t > T.agua, 2250, 1080);
    set(mmm, { x: 2440, y: 860, o: t > T.buenisimo && t < T.sacan + 0.3 ? 1 : 0, s: pop(t, T.buenisimo, 0.3), r: 4 });
    set(W.olla, { o: t > T.agua - 0.3 ? 1 : 0 });
    tazas.forEach((z, i) => set(z, { o: t > T.beben ? 1 : 0, x: XM[i] + 50, y: SUELO - (i ? 260 : 300) - (t > T.beben && t < T.beben + 0.6 ? 20 : 0), r: t > T.beben && t < T.beben + 0.6 ? -40 : 0 }));
    const n = tp.filter(x => t > x).length; pasos.querySelector('div').innerHTML = pp.slice(0, Math.max(1, n)).join('<br>'); pasos.style.height = px(40 + 56 * Math.max(1, n)); pasos.querySelector('div').style.lineHeight = '56px'; rotuloA(pasos, t, T.sacan, L(10) - 0.1);
    const h = Math.round(lerp(23, 30, p(t, T.rezan, T.dormirse - T.rezan + 0.4, E.linear))) % 24; reloj.querySelector('div').textContent = `${String(h).padStart(2, '0')}:00`; rotuloA(reloj, t, T.rezan, 99);
  };
});
shakeAt(T.diablo, 0.25, 10); shakeAt(T.beben + 0.7, 0.25, 10);

/* L11 · OJO: lo de las cabras es leyenda; lo cierto es que el café viene de Etiopía (rama de cafeto + rótulo) */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const le = chip(c, 380, 520, 'LEYENDA', { size: 70, bg: '#1d1a22' });
  const rama = box(c, 300, 640, 500, 460, { zIndex: 6 }, `<svg viewBox="-260 -300 520 480" width="500" height="460" style="overflow:visible">${CAFETO(0, 150, 1.6)}</svg>`);
  const r = ROTULO(c, 600, 1120, 'ETIOPÍA', 'su cuna, de verdad', { w: 360 });
  return t => { popA(le, t, T.leyenda, { r: -5 }); set(rama, { r: Math.sin(t * 2) * 3, s: pop(t, L(11), 0.4) }); rotuloA(r, t, T.etiopia11 - 0.3); };
});
sp(T.leyenda, 'stamp', 0.7); sp(T.etiopia11, 'pop2', 0.6);

/* L12 · O sea: mañana, zombi hasta el primer café… sorbo → te salen cuernos de cabra y bailas */
plano(L(12) - 0.1, L(13) - 0.1, { background: '#f3e2c4', backgroundImage: 'repeating-linear-gradient(90deg, rgba(168,69,46,.12) 0 60px, transparent 60px 120px)' }, c => {
  box(c, 0, 1250, 1080, 670, { zIndex: 1, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const tu = PERS(c, 330, 600, 420, { ropa: '#7a5aa8', pelo: 'corto', pcol: '#3a2a1e' });
  const cu = box(tu, 70, 40, 280, 140, { zIndex: 1 }, `<svg viewBox="0 0 280 140" width="280" height="140"><path d="M90,140 C60,80 40,40 10,20 M190,140 C220,80 240,40 270,20" stroke="#9a8a6a" stroke-width="22" fill="none" stroke-linecap="round"/></svg>`);
  const taza = box(c, 700, 1000, 170, 150, { zIndex: 12 }, `<svg viewBox="0 0 170 150" width="170" height="150"><path d="M10,20 H130 L118,140 H22 Z" fill="#fff" stroke="${INK}" stroke-width="8"/><ellipse cx="70" cy="22" rx="60" ry="12" fill="#6b3a1e" stroke="${INK}" stroke-width="6"/><path d="M130,50 C170,50 170,100 124,104" stroke="${INK}" stroke-width="10" fill="none"/></svg>`);
  const ns = NOTAS(c, 4), mee = BOCADILLO(c, 620, 520, '¡meeeh!', { size: 60 });
  sp(T.persona, 'sad', 0.4); sp(T.cafe12, 'gulp', 0.8); sp(T.cabra, 'boing', 0.9); sp(T.cabra + 0.2, 'tada', 0.6);
  return t => {
    const cabra = t > T.cabra - 0.2; pFace(tu, t, { feliz: cabra ? 1 : -0.6, closed: !cabra && t < T.cafe12 + 0.3, ceja: cabra ? 20 : 2, jaw: cabra ? 0.6 : 0.2, look: [10, 0] });
    set(tu, { y: cabra ? -Math.abs(Math.sin(t * 6)) * 50 : 0, r: cabra ? Math.sin(t * 6) * 8 : (t < T.cafe12 ? Math.sin(t * 1.5) * 3 : 0) }); set(cu, { o: cabra ? 1 : 0, s: pop(t, T.cabra - 0.2, 0.35) });
    set(taza, { y: t > T.cafe12 && t < T.cafe12 + 0.8 ? -160 : 0, x: t > T.cafe12 && t < T.cafe12 + 0.8 ? -120 : 0, r: t > T.cafe12 && t < T.cafe12 + 0.8 ? -40 : 0 });
    notasA(ns, t, cabra, 540, 600); popA(mee, t, T.cabra + 0.1, { r: 5 });
  };
});
shakeAt(T.cabra, 0.25, 10);

/* L13 · pregunta final (pícara) */
preguntaFinal('¿Cuántos cafés necesitas', 'para ser persona?', { size: 80, draw: c => [['uno, y ya soy gente', YEL], ['tres, como mínimo', PINK], ['ninguno: soy cabra de serie', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(13) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(88, 'Las cabras del café', ['CAFÉ', 'y cabras']);

/* transiciones de cuento y música que sigue la tensión */
transTela(L(7) - 0.1, { pat: 'repeating-linear-gradient(90deg, #2e6b3a 0 50px, #f2c230 50px 100px, #c8102e 100px 150px)' }); transPapel(L(11) - 0.1);
sfx('harpa', L(2) - 0.15, 0.6); sfx('mus_baja', L(5) - 0.3); sfx('mus_sube', T.baila5); sfx('harpa', T.baila5, 0.6);
sfx('harpa', T.olor, 0.5); sfx('mus_baja', L(10) - 0.2); sfx('mus_sube', T.dormirse); sfx('harpa', T.dormirse + 0.2, 0.5);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.baila5, T.baila5 + 1.0], [T.beben + 0.5, T.beben + 1.5], [T.cabra, T.cabra + 1.0]], sorpresa: [[T.locas, T.locas + 0.8], [T.diablo, T.diablo + 0.8]], golpes: [T.locas, T.diablo, T.beben + 0.7, T.cabra] },
});
