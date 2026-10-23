/* Ep. 84 · El acueducto de Segovia lo hizo el diablo (leyenda de la aguadora) — FORMATO CUENTO: un solo mundo que la cámara recorre,
   el cielo pasa de noche (presente) → día (hace siglos) → noche (el trato) → amanecer (el gallo) → día (la verdad). Rótulos dentro de la escena. */
Story.prepara();
const T = {
  diablo0: Q('el diablo'),
  noche: Q('una sola noche'), bien: Q('del todo bien'),
  siglos: Q('hace siglos'), aguadora: Q('la aguadora'), cuesta: Q('la cuesta'), harta: Q('está harta'),
  esa: Q('esa noche'), suspira: Q('suspira'), fuera: Q('lo que fuera'),
  sombras: Q('las sombras'), caballero: Q('un caballero'), cuernos: Q('unos cuernos'), sospe: Q('sospechosos'),
  traigo: Q('te traigo'), gallo5: Q('cante el gallo'), alma: Q('de tu alma'),
  acepta: Q('ella acepta'), loco: Q('como un loco'), piedra7: Q('piedra sobre piedra'), arco: Q('arco tras arco'),
  miedo: Q('el miedo'), rezar: Q('a rezar'), amanezca: Q('amanezca antes'),
  falta: Q('le falta'), sola: Q('una sola piedra'), quiqui: Q('quiquiriquí'), canta: Q('canta el gallo'),
  sinalma: Q('sin alma'), humo: Q('echando humo'), ahi: Q('se queda ahí'),
  verdad: Q('lo de verdad'), romanos: Q('los romanos'), dosmil: Q('dos mil años'), granito: Q('bloques de granito'), argamasa: Q('sin nada de argamasa'),
  ojo: Q('ojo'), dedos: Q('sus dedos'), gruas: Q('las grúas'),
  osea: Q('o sea'), cuenta: Q('cuenta las piedras'), menos: Q('alguna de menos'),
};
const PIEDRA_C = '#cdbb98', PIEDRA_O = '#a8946e', TIERRA = '#8a6a44', HIERBA = '#7d9a52';
const NSEG = 10, SX0 = 1000, SW = 190, TOPY = 380, GAP = 5;            // acueducto: 10 tramos, el 5 es el del hueco
const groundY = x => x < 1000 ? 1250 : x < 1900 ? 1250 + (x - 1000) * 310 / 900 : 1560;
const RUTA = [[2560, 1560], [1900, 1560], [1000, 1250], [860, 1250]];   // de la fuente a la puerta de la aguadora
/* tramo de acueducto (vb 0 0 190 1400): pilares, arco grande abajo, arco pequeño arriba, sillares marcados */
const tramo = i => `<svg viewBox="0 0 190 1400" width="190" height="1400"><path d="M0,0 H190 V1400 H150 V620 C150,520 40,520 40,620 V1400 H0 Z" fill="${PIEDRA_C}" stroke="${INK}" stroke-width="6"/>
  <path d="M40,330 C40,250 150,250 150,330 V470 H40 Z" fill="#3d3a44" stroke="${INK}" stroke-width="6" opacity=".9"/><path d="M0,160 H190 M0,500 H190" stroke="${INK}" stroke-width="5"/>
  ${[...Array(26)].map((_, j) => `<path d="M0,${40 + j * 52} H${j % 2 ? 40 : 190}" stroke="${PIEDRA_O}" stroke-width="4"/>`).join('')}${[...Array(26)].map((_, j) => `<path d="M150,${40 + j * 52} H190" stroke="${PIEDRA_O}" stroke-width="4"/>`).join('')}
  ${i === GAP ? `<rect x="70" y="0" width="56" height="44" fill="#1d1a22" stroke="${INK}" stroke-width="5"/>` : `<rect x="70" y="0" width="56" height="44" fill="${PIEDRA_C}" stroke="${INK}" stroke-width="4"/>`}</svg>`;
const GALLO = c => box(c, 0, 0, 150, 150, { zIndex: 9, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 150 150" width="150" height="150"><path d="M30,110 C10,70 30,40 60,50 C70,20 100,20 110,40 C130,40 140,60 120,80 C130,110 100,130 70,128 Z" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><path d="M20,70 C0,40 10,10 40,30 C30,50 40,70 30,90 Z" fill="#2e6b3a" stroke="${INK}" stroke-width="5"/><g class="cab"><path d="M96,22 C100,6 112,6 112,18 C118,6 128,12 120,26 Z" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="112" cy="40" r="5" fill="${INK}"/><path class="pico" d="M124,42 L144,48 L124,54 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/></g><path d="M64,128 V146 M84,128 V146" stroke="${GOLD}" stroke-width="7"/></svg>`);
const CANTARO = c => box(c, 0, 0, 90, 110, { zIndex: 9 }, `<svg viewBox="0 0 90 110" width="90" height="110"><path d="M30,8 H60 V22 C86,30 92,70 74,96 C64,108 26,108 16,96 C-2,70 4,30 30,22 Z" fill="#c87a3a" stroke="${INK}" stroke-width="6"/><path d="M20,50 H70" stroke="#e9a868" stroke-width="6"/></svg>`);
const SOMBRERO = c => box(c, 0, 0, 160, 140, { zIndex: 12 }, `<svg viewBox="0 0 160 140" width="160" height="140"><rect x="30" y="0" width="100" height="110" fill="${INK}" stroke="${INK}" stroke-width="4"/><rect x="30" y="80" width="100" height="18" fill="${RED}"/><rect x="0" y="104" width="160" height="22" rx="10" fill="${INK}"/></svg>`);
const CONTRATO = c => box(c, 0, 0, 400, 470, { zIndex: 30, background: '#f4ecd8', border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `10px 10px 0 rgba(0,0,0,.4)`, fontFamily: 'SpecialElite', fontSize: '34px', color: INK, padding: '26px', boxSizing: 'border-box', lineHeight: 1.35, transformOrigin: '50% 100%' },
  `<div style="font-family:Rye;font-size:46px;text-align:center">CONTRATO</div>Agua en tu puerta<br>antes del <b>gallo</b>.<br><br>Precio:<div class="pr" style="font-family:Rye;font-size:62px;color:${RED};text-align:center;margin-top:8px">TU ALMA</div>`);

/* el mundo entero (se construye igual en cada plano: la continuidad la da la cámara) */
function segovia(c) {
  const M = MUNDO(c, 3000, 2600);
  M.far.innerHTML = `<svg viewBox="0 0 3000 2600" width="3000" height="2600"><path d="M0,1180 C300,1000 600,1060 900,980 C1200,900 1500,1040 1800,960 C2100,880 2500,1020 3000,940 V2600 H0 Z" fill="#6f7f7a" stroke="${INK}" stroke-width="6"/>${[...Array(9)].map((_, i) => `<path d="M${200 + i * 320},1000 C${185 + i * 320},930 ${215 + i * 320},860 ${200 + i * 320},820 C${185 + i * 320},860 ${215 + i * 320},930 ${200 + i * 320},1000" fill="#3f5a45" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`;
  const segs = [...Array(NSEG)].map((_, i) => box(M.w, SX0 + i * SW, TOPY, SW, 1400, { zIndex: 3 }, tramo(i)));
  const suelo = box(M.w, 0, 0, 3000, 2600, { zIndex: 6 }, `<svg viewBox="0 0 3000 2600" width="3000" height="2600"><path d="M-10,1250 H1000 L1900,1560 H3010 V2600 H-10 Z" fill="${TIERRA}" stroke="${INK}" stroke-width="7"/><path d="M-10,1250 H1000 L1900,1560 H3010" stroke="${HIERBA}" stroke-width="22" fill="none"/><path d="M860,1262 H1000 L1900,1572 H2560" stroke="#c9a86a" stroke-width="10" stroke-dasharray="26 18" fill="none"/><ellipse cx="2650" cy="1600" rx="260" ry="46" fill="#5aa7d6" stroke="${INK}" stroke-width="6"/><path d="M2560,1560 V1480 H2600 V1560" fill="#8f877a" stroke="${INK}" stroke-width="6"/></svg>`);
  const casas = [[60, 900, 260, 360, '#a8452e'], [330, 960, 240, 300, '#b5523a'], [580, 880, 330, 380, '#9a3f2a']].map(([x, y, w, h, tc]) => box(M.w, x, y - 10, w, h, { zIndex: 4 }, CASA(w, h, tc)));
  const puerta = box(M.w, 790, 1130, 80, 120, { zIndex: 5, background: '#6b4a2a', border: `5px solid ${INK}`, borderRadius: '40px 40px 0 0' });
  const ventana = box(M.w, 640, 1040, 110, 90, { zIndex: 5, background: '#f6d36a', border: `6px solid ${INK}` });
  const gallo = GALLO(M.w); set(gallo, { x: 375, y: 820 });
  const ag = PERSm(M.w, 200, { ropa: '#4c7a5a', pelo: 'moño', pcol: '#5a3a1e', z: 8 }); const can = CANTARO(ag); set(can, { x: 150, y: 250 });
  const di = PERSm(M.w, 240, { ropa: '#1d1a22', gorro: 'cuernos', cuello: true, piel: '#f0c6b0', barba: true, pcol: '#1d1a22', z: 9 }); const som = SOMBRERO(di);
  const piedra = box(M.w, 0, 0, 56, 44, { zIndex: 11, background: PIEDRA_C, border: `4px solid ${INK}` });
  const polvo = NUBES(M.w, 6), humo = NUBES(M.w, 8, '#6a6470'), roca = NUBES(M.w, 5);
  const niebla = box(M.w, 760, 900, 700, 500, { zIndex: 7, background: 'radial-gradient(ellipse, rgba(40,30,60,.85), transparent 70%)' });
  const luna = LUNA(c, 2), sol = SOL(c, 2), est = ESTRELLAS_C(c, 26, 1);
  M.vp.appendChild(luna); M.vp.appendChild(sol); est.forEach(e => M.vp.appendChild(e)); luna.style.zIndex = sol.style.zIndex = 1;
  return { M, segs, suelo, gallo, ag, can, di, som, piedra, polvo, humo, roca, niebla, luna, sol, est, ventana };
}
/* cuánto está construido cada tramo (0..1): presente → «rebobinado» en «hace siglos» → se construye en la noche del trato → presente */
const hecho = (i, t) => {
  if (t < T.siglos - 0.1) return 1;
  if (t < T.siglos + 1.0) return 1 - p(t, T.siglos - 0.1 + (NSEG - 1 - i) * 0.08, 0.25);
  if (t < T.loco) return 0;
  const d = (T.falta - T.loco - 0.4) / NSEG; return p(t, T.loco + i * d, d * 1.4, E.outCubic);
};
const pintaTramos = (W, t) => W.segs.forEach((s, i) => { const k = hecho(i, t); s.style.clipPath = `inset(${f1((1 - k) * 100)}% 0 0 0)`; s.style.visibility = k > 0.001 ? 'visible' : 'hidden'; });
/* cielo: [t, arriba, abajo, tinte, opacidad del tinte] */
const CIELO = () => [
  [-1, '#0f1730', '#2b3a66', '#3a4a8a', 0.45], [T.siglos - 0.1, '#0f1730', '#2b3a66', '#3a4a8a', 0.45], [T.siglos + 0.6, '#8fc3e8', '#f3e2b8', '#ffffff', 0],
  [T.esa - 0.2, '#e89a5a', '#f6d08a', '#ffb070', 0.15], [T.esa + 0.8, '#0f1730', '#2b3a66', '#3a4a8a', 0.5], [T.amanezca, '#121a38', '#33427a', '#3a4a8a', 0.45],
  [T.canta + 0.2, '#f4a46a', '#ffe0a0', '#ffb070', 0.12], [T.verdad, '#9fd0ee', '#f6ecd0', '#ffffff', 0], [999, '#9fd0ee', '#f6ecd0', '#ffffff', 0]];
const astros = (W, t) => { const noche = (t < T.siglos || (t > T.esa + 0.4 && t < T.canta)) ? 1 : 0;
  const kl = p(t, T.esa, 1.0); set(W.luna, { x: 780, y: t < T.siglos ? 260 : lerp(900, 240, kl), o: noche });
  const ks = p(t, T.canta - 0.2, 1.6, E.outCubic); set(W.sol, { x: 120, y: t > T.canta - 0.2 ? lerp(1200, 300, ks) : 1400, o: t > T.canta - 0.2 && t < T.verdad + 99 ? 1 : 0 }); brillan(W.est, t, noche); };

/* L0 · PORTADA (fotograma 0 completo, noche — portada de color distinto, la de esta tanda): el acueducto a la luz de la luna, el diablo arriba con la piedra que falta */
plano(-1, L(1) - 0.1, { background: '#0f1730' }, c => {
  const W = segovia(c); W.ag.style.display = 'none'; W.niebla.style.display = 'none';
  const t1 = texto(c, 190, 'El acueducto lo hizo…', { size: 88, color: '#f4efe2', shadow: `5px 5px 0 ${INK}` });
  const t2 = texto(c, 290, '…el ' + hlSpan('DIABLO', 'phl'), { size: 150, italic: true, color: '#f4efe2', shadow: `6px 6px 0 ${INK}` });
  const fl = box(c, 540, 720, 200, 200, { zIndex: 70 }, `<svg viewBox="0 0 200 200" width="200" height="200"><circle cx="100" cy="100" r="80" fill="none" stroke="${RED}" stroke-width="12" stroke-dasharray="12 10"/></svg>`);
  sfx('swoosh_up', 0.05, 0.6); sp(T.diablo0, 'thud', 0.9); sp(T.diablo0 + 0.1, 'glitch', 0.5);
  return t => {
    camara(W.M, t, [[-1, 1950, 520, 1.0], [L(1), 1950, 500, 1.05]]); cielo(W.M, -1, CIELO()); pintaTramos(W, -1); astros(W, -1);
    pies(W.di, 240, SX0 + GAP * SW + 98, TOPY, { r: Math.sin(t * 2) * 3 }); pFace(W.di, t, { feliz: 1, ceja: -6, look: [-8, 6], jaw: t > T.diablo0 ? 0.5 : 0.1 }); set(W.som, { x: 40, y: 20, r: -8 });
    set(W.piedra, { x: SX0 + GAP * SW + 150, y: TOPY - 200 + Math.sin(t * 3) * 6, r: 10 });
    set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4); set(fl, { r: t * 30, s: 1 + 0.06 * Math.sin(t * 6) });
  };
}, { sfx: false });
shakeAt(T.diablo0, 0.3, 12);

/* PLANO A (L1 → CTA): «en una sola noche» (empuje al hueco) → «hace siglos» (rebobinado: el acueducto se deshace y se hace de día) → la aguadora sube la cuesta →
   anochece → suspira en su puerta → niebla: aparece el caballero (se quita el sombrero: cuernos) → el contrato */
plano(L(1) - 0.1, L(6) - 0.1, { background: '#0f1730' }, c => {
  const W = segovia(c);
  const r1 = ROTULO(c, 620, 380, '1 NOCHE', 'para hacerlo entero', { w: 360 }), r2 = ROTULO(c, 600, 380, 'SEGOVIA', 'hace siglos', { w: 380 });
  const sud = [sudor(W.M.w, 0, 0), sudor(W.M.w, 0, 0)];
  const ctr = CONTRATO(c); set(ctr, { o: 0 });
  const suspiro = texto(W.M.w, 0, 'aaay…', { size: 60, italic: true, color: '#f4efe2', x: 0, w: 260, z: 12, shadow: `3px 3px 0 ${INK}` });
  const rw = box(c, 0, 0, 1080, 1920, { zIndex: 65, background: 'rgba(240,210,150,.35)', mixBlendMode: 'screen' });
  sp(T.noche, 'tick', 0.6); sp(T.bien, 'boing', 0.7); sp(T.siglos - 0.1, 'swoosh_up', 0.9); [...Array(10)].forEach((_, i) => sp(T.siglos + i * 0.08, 'tick', 0.3));
  sp(T.cuesta, 'squish', 0.4); sp(T.harta, 'thud', 0.7); sp(T.suspira, 'whoosh', 0.5); sp(T.sombras, 'glitch', 0.6); sp(T.caballero, 'ding', 0.5); sp(T.cuernos, 'boing', 0.9); sp(T.traigo, 'paper', 0.7); sp(T.alma, 'stamp', 1);
  return t => {
    const agP = camino(RUTA, p(t, T.aguadora - 0.2, T.esa - T.aguadora - 0.2, E.linear)), [ax, ay] = t < T.esa ? agP : [840, 1250];
    const diX = 1080, diY = 1250, mid = [(ax + diX) / 2, 1060];
    const [cx, cy, s] = camara(W.M, t, [
      [L(1) - 0.1, 1950, 820, 0.66], [T.bien - 0.2, 1980, 560, 1.0], [T.bien + 0.6, 2050, 470, 1.35], [T.siglos - 0.15, 2050, 470, 1.35], [T.siglos + 0.9, 1700, 1050, 0.62],
      [T.aguadora + 0.4, 2350, 1330, 0.95], [T.cuesta + 0.6, camino(RUTA, 0.35)[0], camino(RUTA, 0.35)[1] - 230, 1.0], [T.harta, camino(RUTA, 0.7)[0], camino(RUTA, 0.7)[1] - 250, 1.15], [T.harta + 0.8, camino(RUTA, 0.8)[0], camino(RUTA, 0.8)[1] - 260, 1.45],
      [T.esa + 0.6, 840, 1050, 1.25], [T.fuera + 0.4, 820, 1080, 1.45], [T.sombras + 0.3, 960, 1040, 1.15], [T.cuernos - 0.1, 1080, 900, 1.55], [T.cuernos + 0.4, 1080, 920, 1.7], [T.sospe + 0.5, 1080, 920, 1.7],
      [T.traigo + 0.3, mid[0], mid[1], 1.2], [T.alma - 0.2, mid[0], mid[1], 1.25], [T.alma + 0.3, ax + 10, 1000, 1.7], [L(6), ax + 10, 1000, 1.75]]);
    cielo(W.M, t, CIELO()); pintaTramos(W, t); astros(W, t);
    set(rw, { o: t > T.siglos - 0.1 && t < T.siglos + 1.0 ? 0.8 * Math.sin(p(t, T.siglos - 0.1, 1.1) * Math.PI) : 0 });
    rotuloA(r1, t, T.noche, T.siglos - 0.2); rotuloA(r2, t, T.siglos + 0.5, T.cuesta + 1.2);
    // aguadora
    const andando = t > T.aguadora - 0.2 && t < T.esa, paso = andando ? Math.abs(Math.sin(t * 7)) * 10 : 0;
    W.ag.style.visibility = t > T.siglos + 0.6 ? 'visible' : 'hidden';
    pies(W.ag, 200, ax, ay - paso, { r: andando ? Math.sin(t * 7) * 3 : 0 });
    pFace(W.ag, t, { feliz: t > T.alma ? -1 : (t > T.harta ? -0.8 : 0), ceja: t > T.alma ? 18 : (t > T.harta ? 14 : 4), closed: t > T.suspira && t < T.fuera, look: t > T.sombras ? [12, 0] : [-10, 4], jaw: t > T.alma ? 0.7 : 0, seed: 1 });
    sud.forEach((d, i) => { const k = ((t + i * 0.5) * 1.1) % 1; set(d, { o: t > T.cuesta && t < T.esa ? 1 - k : 0, x: ax - 60 + i * 100, y: ay - 330 + k * 80 }); });
    set(suspiro, { o: t > T.suspira && t < T.fuera + 0.5 ? 1 - p(t, T.suspira, 1.6) * 0.6 : 0, x: ax - 120, y: ay - 420 - p(t, T.suspira, 1.6) * 80 });
    // niebla y diablo
    const kn = p(t, T.sombras - 0.3, 1.0); set(W.niebla, { o: t > T.sombras - 0.3 ? kn * 0.9 : 0, s: 0.8 + 0.3 * kn });
    const kd = p(t, T.caballero - 0.2, 0.8); W.di.style.visibility = t > T.caballero - 0.2 ? 'visible' : 'hidden'; W.di.style.opacity = f1(kd);
    pies(W.di, 240, diX, diY); const kh = p(t, T.cuernos, 0.35, E.outBack); set(W.som, { x: 40 + kh * 60, y: 20 - kh * 150, r: -kh * 25, o: t > T.caballero - 0.2 ? 1 : 0 });
    pFace(W.di, t, { feliz: 1, ceja: t > T.sospe ? 14 : -4, look: [-14, 4], jaw: t > T.traigo && t < T.alma + 0.6 ? talkW(t, 'VECINO') * 0.6 : 0, seed: 2 });
    set(W.piedra, { o: 0 });
    // contrato (en pantalla)
    const kc = p(t, T.traigo, 0.4, E.outBack); set(ctr, { x: 580, y: 900 - kc * 520, o: t > T.traigo && t < T.alma + 0.25 ? 1 : 0, r: 4 + Math.sin(t * 2) * 2, s: 0.6 + 0.4 * kc });
    ctr.querySelector('.pr').style.opacity = t > T.alma - 0.15 ? 1 : 0;
  };
});
shakeAt(T.cuernos, 0.25, 10); shakeAt(T.alma, 0.3, 12);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* PLANO B (L7 → L11): trato cerrado → el diablo construye toda la noche (reloj) → ella reza en la ventana → falta UNA piedra → ¡quiquiriquí! (barrido al gallo) →
   el diablo se esfuma echando humo → amanece → «lo de verdad»: los romanos, +2.000 años, sin argamasa */
plano(L(7) - 0.1, L(12) - 0.1, { background: '#0f1730' }, c => {
  const W = segovia(c);
  const reloj = ROTULO(c, 680, 380, '00:00', 'la noche del trato', { w: 330, size: 70 });
  const quiq = box(c, 120, 520, 840, 200, { zIndex: 70, fontFamily: 'Rye', fontSize: '110px', color: GOLD, textAlign: 'center', textShadow: `6px 6px 0 ${INK}, -3px -3px 0 ${INK}` }, '¡QUIQUIRIQUÍ!');
  const r3 = ROTULO(c, 560, 380, '+2.000 AÑOS', 'obra romana', { w: 440, size: 60 }), r4 = ROTULO(c, 520, 560, 'SIN ARGAMASA', 'piedra encajada, sin pegamento', { w: 480, size: 56 });
  const roms = [0, 1].map(i => PERSm(W.M.w, 260, { ropa: '#a8452e', gorro: 'casco', z: 8 }));
  const manos = [MANO_(W.M.w), MANO_(W.M.w)];
  sp(T.acepta, 'pop2', 0.7); [...Array(NSEG)].forEach((_, i) => sp(T.loco + i * (T.falta - T.loco - 0.4) / NSEG, 'thud', 0.45)); sp(T.loco, 'whoosh', 0.7);
  sp(T.rezar, 'bell', 0.5); sp(T.sola, 'drumroll', 0.6); sp(T.quiqui - 0.2, 'whoosh', 0.9); sp(T.quiqui, 'tada', 0.7); sp(T.canta, 'ding', 0.6);
  sp(T.sinalma, 'thud', 0.8); sp(T.humo, 'burst', 0.8); sp(T.ahi, 'swoosh_up', 0.6); sp(T.romanos, 'pop2', 0.7); sp(T.dosmil, 'stamp', 0.7); sp(T.argamasa, 'stamp', 0.7);
  return t => {
    const gapX = SX0 + GAP * SW + 98;
    const d = (T.falta - T.loco - 0.4) / NSEG, ib = clamp(Math.floor((t - T.loco) / d), 0, NSEG - 1), trabajando = t > T.loco && t < T.falta;
    const dX = t < T.loco ? 1080 : (t < T.falta ? SX0 + ib * SW + 95 : gapX), dY = t < T.loco ? 1250 : TOPY;
    camara(W.M, t, [
      [L(7) - 0.1, 960, 1060, 1.2], [T.acepta + 0.6, 960, 1060, 1.3], [T.loco + 0.3, 1500, 900, 0.7], [T.piedra7, 1700, 900, 0.66], [T.arco + 0.8, 2300, 900, 0.66],
      [T.miedo, 2200, 900, 0.66], [T.miedo + 0.5, 700, 1080, 1.5], [T.amanezca + 0.3, 700, 1080, 1.6],
      [T.falta - 0.1, gapX, 430, 1.4], [T.quiqui - 0.25, gapX, 430, 1.5], [T.quiqui + 0.05, 450, 860, 1.7], [T.canta + 0.6, 450, 860, 1.7],
      [T.sinalma + 0.1, gapX, 430, 1.35], [T.humo + 0.8, gapX, 460, 1.35], [T.ahi + 0.8, 1850, 960, 0.64], [T.verdad + 0.5, 1850, 960, 0.64],
      [T.romanos + 0.6, 1940, 1250, 1.0], [T.granito, 1900, 700, 0.85], [L(12), 2200, 800, 0.8]]);
    cielo(W.M, t, CIELO()); pintaTramos(W, t); astros(W, t);
    // reloj de la noche: 00:00 → 05:59 de «acepta» al gallo
    const mins = Math.round(lerp(0, 359, p(t, T.acepta, T.canta - T.acepta, E.linear))); reloj.querySelector('div').textContent = `0${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`; rotuloA(reloj, t, T.acepta + 0.3, T.canta + 0.5);
    // aguadora: en la puerta (trato) → en la ventana rezando
    const enVentana = t > T.miedo + 0.3; pies(W.ag, 200, enVentana ? 700 : 840, enVentana ? 1200 : 1250, { s: enVentana ? 0.8 : 1 }); W.ag.style.zIndex = enVentana ? 4 : 8;
    pFace(W.ag, t, { feliz: t > T.canta ? 1 : -0.6, closed: t > T.rezar && t < T.quiqui, ceja: t > T.miedo ? 16 : 4, look: [14, -6], seed: 1 });
    manos.forEach((m, i) => { set(m, { o: t > T.rezar && t < T.canta ? 1 : 0, x: 660 + i * 34, y: 1000 + Math.sin(t * 8 + i) * 4, r: i ? 20 : -20 }); });
    // diablo: apretón de manos → construye saltando de tramo en tramo → arriba con la última piedra → se esfuma
    const sale = p(t, T.humo, 0.4); W.di.style.opacity = f1(1 - sale);
    pies(W.di, 240, dX, dY - (trabajando ? Math.abs(Math.sin(t * 9)) * 40 : 0), { r: trabajando ? Math.sin(t * 9) * 6 : (t > T.sinalma ? Math.sin(t * 30) * 4 : 0) });
    set(W.som, { x: 100, y: -130, r: -25 });
    pFace(W.di, t, { feliz: t > T.canta ? -1 : 1, ceja: t > T.canta ? 20 : -2, look: t > T.quiqui ? [-14, 0] : [0, 6], jaw: t > T.sinalma && t < T.humo ? 0.9 : 0.2, seed: 2 });
    W.polvo && nubeA(W.polvo, t, trabajando ? T.loco + ib * d : -9, SX0 + ib * SW + 95, TOPY + 300, 160, 0.6);
    // la piedra que falta: en la mano del diablo; con el gallo se le cae y se rompe abajo
    const kc = p(t, T.sinalma, 0.7, E.inCubic); set(W.piedra, { o: t > T.falta - 0.3 && t < T.sinalma + 0.7 ? 1 : 0, x: gapX + 50, y: lerp(TOPY - 160, 1520, kc), r: kc * 400 });
    nubeA(W.roca, t, T.sinalma + 0.7, gapX + 78, 1540, 120, 0.7); nubeA(W.humo, t, T.humo, gapX, TOPY - 140, 200, 1.0);
    // gallo
    const kg = p(t, T.quiqui - 0.05, 0.25, E.outBack); set(W.gallo, { x: 375, y: 820, s: 1 + 0.2 * kg * (t < T.canta + 0.6 ? 1 : 0), r: t > T.quiqui && t < T.canta + 0.6 ? -10 : 0 });
    set(quiq, { o: t > T.quiqui && t < T.canta + 0.5 ? 1 : 0, s: pop(t, T.quiqui, 0.3), r: -4 + Math.sin(t * 20) * 2 });
    // la verdad: romanos al pie del acueducto, rótulos y la piedra que «brilla»
    roms.forEach((r, i) => { r.style.visibility = t > T.romanos - 0.2 ? 'visible' : 'hidden'; pies(r, 260, 1820 + i * 240, groundY(1820 + i * 240), { s: pop(t, T.romanos - 0.2 + i * 0.15, 0.35) }); pFace(r, t, { feliz: 1, look: [6, -6], seed: 3 + i }); });
    rotuloA(r3, t, T.dosmil, T.granito); rotuloA(r4, t, T.argamasa, 99);
    W.segs.forEach((s, i) => { s.style.filter = t > T.granito ? `brightness(${f1(1 + 0.25 * Math.max(0, Math.sin(t * 6 - i * 0.7)))})` : ''; });
  };
});
shakeAt(T.quiqui, 0.3, 14); shakeAt(T.sinalma + 0.7, 0.3, 12);
function MANO_(c) { return box(c, 0, 0, 70, 90, { zIndex: 9, background: '#f2c9a0', border: `5px solid ${INK}`, borderRadius: '35px 35px 20px 20px' }); }

/* L12 · OJO: los agujeritos no son los dedos del diablo: son de las grúas (la tenaza romana agarra el sillar por los agujeros) */
plano(L(12) - 0.1, L(13) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const bl = box(c, 330, 860, 440, 260, { zIndex: 8, background: PIEDRA_C, border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}` });
  [0, 1].forEach(i => box(bl, 90 + i * 220, 60, 34, 40, { background: '#3d3a44', border: `4px solid ${INK}`, borderRadius: '50%' }));
  const ten = box(c, 360, 420, 380, 520, { zIndex: 9 }, `<svg viewBox="0 0 380 520" width="380" height="520"><path d="M190,0 V200" stroke="#c9a86a" stroke-width="12"/><circle cx="190" cy="220" r="22" fill="#5d636b" stroke="${INK}" stroke-width="6"/><path d="M190,220 L90,470 M190,220 L290,470" stroke="#5d636b" stroke-width="22" stroke-linecap="round"/><path d="M90,470 L120,500 M290,470 L262,500" stroke="#5d636b" stroke-width="16" stroke-linecap="round"/></svg>`);
  const no = chip(c, 330, 1170, 'dedos del diablo ✗', { size: 46, bg: '#1d1a22' }), si = chip(c, 600, 1250, 'grúa romana ✔', { size: 46, bg: VERDEI });
  return t => { const k = p(t, T.gruas - 0.4, 0.8, E.inOutCubic); set(ten, { y: -40 + k * 30 }); set(bl, { y: -k * 60 }); popA(no, t, T.dedos, { r: -5 }); popA(si, t, T.gruas, { r: 4 }); };
});
sp(T.dedos, 'error', 0.5); sp(T.gruas, 'ding', 0.7);

/* L13 · O sea: si vas a Segovia, cuenta las piedras… (de nuevo el mundo, hoy: un turista cuenta con el dedo y acaba mirando el hueco) */
plano(L(13) - 0.1, L(14) - 0.1, { background: '#9fd0ee' }, c => {
  const W = segovia(c); W.ag.style.display = 'none'; W.di.style.display = 'none'; W.niebla.style.display = 'none';
  const tu = PERSm(W.M.w, 230, { ropa: '#2b8ad6', pelo: 'corto', z: 9 }); const dedo = MANO_(W.M.w);
  const nums = [...Array(6)].map((_, i) => texto(W.M.w, 0, String(i + 1), { size: 80, color: '#f4efe2', x: 0, w: 120, z: 12, shadow: `4px 4px 0 ${INK}` }));
  const q = texto(c, 560, '¿…?', { size: 150, color: RED, z: 70, shadow: `6px 6px 0 ${INK}` });
  sp(T.cuenta, 'tick', 0.6); [...Array(5)].forEach((_, i) => sp(T.cuenta + 0.3 + i * 0.25, 'tick', 0.5)); sp(T.menos, 'boing', 0.9);
  return t => {
    const gapX = SX0 + GAP * SW + 98;
    camara(W.M, t, [[L(13) - 0.1, 1750, 1150, 0.9], [T.cuenta + 1.2, 1800, 950, 0.8], [T.menos - 0.1, gapX, 500, 1.2], [L(14), gapX, 480, 1.35]]);
    cielo(W.M, 999, CIELO()); pintaTramos(W, 999); astros(W, 999);
    pies(tu, 230, 1750, groundY(1750)); pFace(tu, t, { feliz: t > T.menos ? -0.6 : 0.6, ceja: t > T.menos ? 18 : 6, look: [10, -14], seed: 4 });
    set(dedo, { x: 1850, y: groundY(1750) - 360 + Math.sin(t * 6) * 10, r: -30 });
    nums.forEach((n, i) => set(n, { o: t > T.cuenta + 0.3 + i * 0.25 ? 1 : 0, x: SX0 + i * SW + 40, y: TOPY + 520, s: pop(t, T.cuenta + 0.3 + i * 0.25, 0.3) }));
    set(q, { o: t > T.menos ? 1 : 0, s: pop(t, T.menos, 0.35), r: Math.sin(t * 4) * 6 });
  };
});

/* L14 · pregunta final (pícara) */
preguntaFinal('¿Tú qué venderías', 'por no subir una cuesta?', { size: 78, draw: c => [['mi alma, sin dudar', YEL], ['a mi cuñado', PINK], ['nada: subo y punto', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 52, bg: col, color: INK }), L(14) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L15 · cierre */
cierre(84, 'El acueducto del diablo', ['ACUEDUCTO', 'del diablo']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(14) - 0.15]],
  vecino: { risa: [[T.sospe, T.sospe + 1.0], [T.humo, T.humo + 1.0], [T.menos, T.menos + 1.0]], sorpresa: [[T.alma, T.alma + 0.8], [T.quiqui, T.quiqui + 0.8]], golpes: [T.cuernos, T.alma, T.quiqui, T.sinalma + 0.7] },
});
