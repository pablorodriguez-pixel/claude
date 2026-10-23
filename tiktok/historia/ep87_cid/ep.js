/* Ep. 87 · El Cid ganó una batalla… muerto (leyenda de Babieca y Jimena, Valencia) — FORMATO CUENTO: un solo mundo (alcoba · patio · muralla · llanura con el
   ejército enemigo). Cámara de cine: un movimiento por frase y CORTES para cambiar de sitio (nada de barridos a lo loco). Rótulos dentro de la escena. */
Story.prepara();
const T = {
  muerto0: Q('muerto'),
  forma: Q('una forma de hablar'), iba: Q('iba muerto'), caballo1: Q('su caballo'),
  valencia: Q('valencia'), novecientos: Q('novecientos años'), conquistado: Q('la ha conquistado'), ejercito: Q('un ejército enorme'), quitarsela: Q('quitársela'),
  enfermo: Q('está enfermo'), orden: Q('una orden'), rara: Q('muy rara'),
  nadie: Q('que nadie se entere'), muerto4: Q('he muerto'), momento: Q('el momento'), babieca: Q('babieca'),
  muere: Q('el cid muere'), jimena: Q('jimena'), plan: Q('el plan'), letra: Q('de la letra'),
  embalsaman: Q('lo embalsaman'), armadura: Q('la armadura'), atan: Q('lo atan'), tieso: Q('bien tieso'), espada: Q('la espada'),
  amanecer: Q('al amanecer'), puertas: Q('las puertas'), sale: Q('y sale el cid'), cabalgando: Q('cabalgando'), todos: Q('delante de todos'),
  ve: Q('el enemigo lo ve'), panico: Q('el pánico'), vivo: Q('está vivo'), corriendo: Q('salen corriendo'),
  dedo: Q('ni un dedo'), respirar: Q('sin respirar'),
  ojo: Q('ojo'), leyenda: Q('es leyenda'), m1099: Q('mil noventa y nueve'),
  osea: Q('o sea'), victorias: Q('más victorias'), padel: Q('el pádel'),
};
const SUELO = 1500, MURO_X = 1250, PIEL_MUERTO = '#e6dccb';
/* Babieca: caballo blanco de perfil mirando a la derecha (vb 0 0 440 330); las patas (.pa) se animan al galope */
const CABALLO = (c, w = 440, z = 8) => { const d = box(c, 0, 0, w, w * 330 / 440, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 440 330" width="${w}" height="${w * 330 / 440}" style="overflow:visible">
  ${[[110, 0], [150, 1], [290, 2], [330, 3]].map(([x, i]) => `<g class="pa" data-x="${x}"><path d="M${x},190 V310" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M${x},190 V306" stroke="#f4efe2" stroke-width="18" stroke-linecap="round"/></g>`).join('')}
  <path d="M60,120 C40,170 60,130 20,210" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M60,120 C40,170 60,130 20,210" stroke="#d9cfbf" stroke-width="12" fill="none" stroke-linecap="round"/>
  <ellipse cx="220" cy="160" rx="170" ry="70" fill="#f4efe2" stroke="${INK}" stroke-width="8"/>
  <path d="M330,130 C350,70 360,40 380,20 L430,60 C420,80 400,90 380,96 C370,120 360,140 350,170 Z" fill="#f4efe2" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M340,120 C350,70 360,46 376,26" stroke="#9a8a6a" stroke-width="14" fill="none"/><circle cx="398" cy="46" r="7" fill="${INK}"/><path d="M380,22 L372,0 L392,16" fill="#f4efe2" stroke="${INK}" stroke-width="6"/>
  <rect x="150" y="80" width="150" height="60" rx="16" fill="${RED}" stroke="${INK}" stroke-width="6"/></svg>`); d.pas = [...d.querySelectorAll('.pa')]; return d; };
const galopa = (h, t, on) => h.pas.forEach((g, i) => { const x = +g.dataset.x, a = on ? Math.sin(t * 14 + i * 1.6) * 28 : 0; g.setAttribute('transform', `rotate(${f1(a)} ${x} 190)`); });
const ESPADA = (c, h = 300, z = 12) => box(c, 0, 0, 46, h, { zIndex: z, transformOrigin: '50% 85%' }, `<svg viewBox="0 0 80 520" width="46" height="${h}"><path d="M40,0 L54,30 V400 H26 V30 Z" fill="#dfe6ec" stroke="${INK}" stroke-width="8"/><rect x="0" y="400" width="80" height="24" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="30" y="424" width="20" height="70" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/></svg>`);
/* ojos en X (muerto) encima de una PERS de ancho w */
const OJOSX = (f, w) => { const k = w / 300; return box(f, 90 * k, 290 * k, 120 * k, 50 * k, { zIndex: 20 }, `<svg viewBox="0 0 120 50" width="${120 * k}" height="${50 * k}"><path d="M10,8 L38,40 M38,8 L10,40 M82,8 L110,40 M110,8 L82,40" stroke="${INK}" stroke-width="9" stroke-linecap="round"/></svg>`); };
const CUERDA = (c, w, z = 14) => box(c, 0, 0, w, 60, { zIndex: z }, `<svg viewBox="0 0 ${w} 60" width="${w}" height="60"><path d="M0,10 C${w / 3},50 ${w * 2 / 3},50 ${w},10 M0,40 C${w / 3},60 ${w * 2 / 3},60 ${w},40" stroke="#c9a86a" stroke-width="10" fill="none"/></svg>`);
const VELAC = (c, z = 6) => { const d = box(c, 0, 0, 60, 230, { zIndex: z }, `<svg viewBox="0 0 60 230" width="60" height="230"><rect x="14" y="70" width="32" height="160" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path class="ll" d="M30,10 C46,34 46,54 30,66 C14,54 14,34 30,10 Z" fill="#ffd977" stroke="${INK}" stroke-width="4"/></svg>`); d.ll = d.querySelector('.ll'); return d; };

function valencia(c) {
  const M = MUNDO(c, 3400, 2600);
  M.far.innerHTML = `<svg viewBox="0 0 3400 2600" width="3400" height="2600"><path d="M0,1260 C500,1150 900,1230 1400,1160 C1900,1090 2400,1210 2900,1140 C3200,1100 3300,1160 3400,1150 V2600 H0 Z" fill="#c9b27a" stroke="${INK}" stroke-width="6"/>${[...Array(8)].map((_, i) => `<path d="M${260 + i * 420},1180 C${230 + i * 420},1080 ${290 + i * 420},1000 ${260 + i * 420},960" stroke="#4c6a45" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="${260 + i * 420}" cy="950" r="50" fill="#4c6a45" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`;
  // alcoba en corte (paredes, cama, ventana, vela)
  const alcoba = box(M.w, 100, 860, 900, 640, { zIndex: 3, background: '#e9dcc2', border: `8px solid ${INK}` });
  box(alcoba, -50, -120, 1000, 130, { background: '#b5523a', border: `8px solid ${INK}`, clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' });
  const ventana = box(alcoba, 580, 120, 220, 200, { background: '#9fd0ee', border: `8px solid ${INK}`, borderRadius: '110px 110px 0 0', overflow: 'hidden' });
  const cama = box(M.w, 330, 1310, 520, 190, { zIndex: 5 }, `<svg viewBox="0 0 520 190" width="520" height="190"><rect x="0" y="40" width="40" height="150" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/><rect x="480" y="80" width="40" height="110" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/><rect x="20" y="90" width="480" height="60" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><rect x="200" y="70" width="300" height="60" rx="20" fill="#7a1f3a" stroke="${INK}" stroke-width="6"/></svg>`);
  const vela = VELAC(M.w); set(vela, { x: 140, y: 1270 });
  // patio con la mesa
  const mesa = box(M.w, 940, 1380, 280, 120, { zIndex: 4 }, `<svg viewBox="0 0 280 120" width="280" height="120"><rect x="0" y="0" width="280" height="30" fill="#8a5a32" stroke="${INK}" stroke-width="6"/><path d="M30,30 V120 M250,30 V120" stroke="${INK}" stroke-width="14"/></svg>`);
  // muralla con puerta (las hojas se abren)
  const muro = box(M.w, MURO_X, 700, 220, 800, { zIndex: 6 }, `<svg viewBox="0 0 220 800" width="220" height="800"><path d="M0,800 V60 H40 V0 H90 V60 H130 V0 H180 V60 H220 V800 H170 V520 C170,430 50,430 50,520 V800 Z" fill="#cdbb98" stroke="${INK}" stroke-width="7"/>${[...Array(12)].map((_, j) => `<path d="M0,${110 + j * 52} H${j > 7 ? 50 : 220}" stroke="#a8946e" stroke-width="4"/>`).join('')}</svg>`);
  const hojas = [0, 1].map(i => box(M.w, MURO_X + 50 + i * 60, 1130, 60, 370, { zIndex: 7, background: '#6b4a2a', border: `6px solid ${INK}`, transformOrigin: i ? '100% 50%' : '0 50%' }));
  // llanura: campamento enemigo
  const tiendas = [[2700, 260, '#f4efe2'], [2960, 300, '#2e6b3a'], [3200, 240, '#f4efe2']].map(([x, w, col]) => box(M.w, x, SUELO - w * 0.87, w, w * 0.87, { zIndex: 3 }, `<svg viewBox="0 0 300 260" width="${w}" height="${w * 0.87}"><path d="M0,260 L150,10 L300,260 Z" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M120,260 L150,140 L180,260 Z" fill="#3d3a44" stroke="${INK}" stroke-width="5"/></svg>`));
  const suelo = box(M.w, 0, SUELO, 3400, 1100, { zIndex: 5, background: '#b8a07a', borderTop: `10px solid #7d9a52` });
  const enemigos = [...Array(6)].map((_, i) => [PERSm(M.w, 210, { ropa: ['#2e6b3a', '#a8452e', '#2b3550', '#6b4a2a', '#2e6b3a', '#a8452e'][i], gorro: 'turbante', barba: i % 2 === 0, z: 8 }), 2300 + (i % 3) * 260 + Math.floor(i / 3) * 120, i]);
  const cid = PERSm(M.w, 230, { ropa: '#7a1f3a', pelo: 'largo', pcol: '#e6e0d0', barba: true, z: 9, piel: '#f2c9a0' });
  const cidC = PERSm(M.w, 230, { ropa: '#9aa4ad', gorro: 'casco', barba: true, pcol: '#e6e0d0', z: 11, piel: PIEL_MUERTO });
  const ox = OJOSX(cidC, 230), ox2 = OJOSX(cid, 230);
  const jim = PERSm(M.w, 220, { ropa: '#2b3550', pelo: 'moño', pcol: '#3a2a1e', z: 9 });
  const bab = CABALLO(M.w, 460, 10), espada = ESPADA(M.w, 300, 12), cuerda = CUERDA(M.w, 200, 13);
  const cabezaB = box(M.w, 0, 0, 200, 200, { zIndex: 4 }, `<svg viewBox="300 0 140 200" width="200" height="200"><path d="M330,200 C350,70 360,40 380,20 L430,60 C420,80 400,90 380,96 C370,120 360,140 350,200 Z" fill="#f4efe2" stroke="${INK}" stroke-width="8"/><circle cx="398" cy="46" r="7" fill="${INK}"/><path d="M380,22 L372,0 L392,16" fill="#f4efe2" stroke="${INK}" stroke-width="6"/></svg>`);
  const sol = SOL(c, 1), luna = LUNA(c, 1), est = ESTRELLAS_C(c, 22, 1); [sol, luna, ...est].forEach(e => M.vp.appendChild(e));
  return { M, vela, hojas, enemigos, cid, cidC, ox, ox2, jim, bab, espada, cuerda, cabezaB, tiendas, sol, luna, est, alcoba };
}
const CIELO = () => [[-1, '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [L(2) - 0.2, '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [L(2), '#8fc3e8', '#f3e2b8', '#ffffff', 0],
  [T.muere - 0.3, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.muere + 1.0, '#2b2f52', '#6a5a7a', '#3a4a8a', 0.4], [T.amanecer - 0.3, '#121a38', '#33427a', '#3a4a8a', 0.45],
  [T.amanecer + 0.9, '#f4a46a', '#ffe0a0', '#ffb070', 0.1], [T.corriendo, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [999, '#8fc3e8', '#f3e2b8', '#ffffff', 0]];
const pintaV = (W, t) => { cielo(W.M, t, CIELO()); const n = t > T.muere + 0.5 && t < T.amanecer + 0.3 ? 1 : 0; set(W.luna, { x: 820, y: 240, o: n }); brillan(W.est, t, n);
  set(W.sol, { x: 120, y: t > T.amanecer - 0.3 && t < T.amanecer + 2.5 ? lerp(1100, 300, p(t, T.amanecer - 0.3, 2.0, E.outCubic)) : 300, o: n ? 0 : 1 });
  W.vela.ll.setAttribute('transform', `translate(30 66) scale(${f1(1 + 0.12 * Math.sin(t * 13))} ${f1(1 + 0.18 * Math.sin(t * 9))}) translate(-30 -66)`); };
/* el Cid muerto a caballo: Babieca en (x, SUELO); el Cid sentado encima, atado, con la espada */
const montado = (W, t, x, corre) => {
  const by = SUELO - (corre ? Math.abs(Math.sin(t * 7)) * 14 : 0);
  set(W.bab, { x: x - 230, y: by - 345, r: corre ? Math.sin(t * 7) * 2 : 0 }); galopa(W.bab, t, corre);
  pies(W.cidC, 230, x - 10, by - 175, { r: corre ? Math.sin(t * 7 + 1) * 3 : 0 }); W.cidC.style.visibility = 'visible';
  pFace(W.cidC, t, { feliz: 0, closed: true, ceja: 0, jaw: 0 }); W.ox.style.visibility = 'visible';
  set(W.espada, { x: x + 80, y: by - 560, r: 20 + (corre ? Math.sin(t * 7) * 4 : 0) }); set(W.cuerda, { x: x - 110, y: by - 260 });
};

/* L0 · PORTADA (fotograma 0 completo, amarilla): el Cid con ojos en X, tieso sobre Babieca al galope; el enemigo huye */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 190, 'El Cid ganó una batalla…', { size: 80 });
  const t2 = texto(c, 290, '…' + hlSpan('MUERTO', 'phl'), { size: 160, italic: true });
  const W = { bab: CABALLO(c, 600, 8), cidC: PERS(c, 0, 0, 300, { ropa: '#9aa4ad', gorro: 'casco', barba: true, pcol: '#e6e0d0', z: 10, piel: PIEL_MUERTO }), espada: ESPADA(c, 400, 12), cuerda: CUERDA(c, 260, 13) };
  W.cidC._x0 = 0; W.cidC._y0 = 0; W.ox = OJOSX(W.cidC, 300);
  const en = PERS(c, 760, 1120, 200, { ropa: '#2e6b3a', gorro: 'turbante', barba: true });
  const bo = BOCADILLO(c, 700, 1000, '¡socorro!', { size: 44 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.muerto0, 'thud', 1); sp(T.muerto0 + 0.1, 'boing', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const by = 1280 - Math.abs(Math.sin(t * 7)) * 18; set(W.bab, { x: 140, y: by - 450, r: Math.sin(t * 7) * 2 }); galopa(W.bab, t, true);
    pies(W.cidC, 300, 420, by - 230, { r: Math.sin(t * 7 + 1) * 3 }); pFace(W.cidC, t, { feliz: 0, closed: true, ceja: 0 });
    set(W.espada, { x: 560, y: by - 860, r: 20 }); set(W.cuerda, { x: 290, y: by - 340 });
    pFace(en, t, { feliz: -1, ceja: 20, look: [-14, -4], jaw: 0.8 }); set(en, { x: Math.sin(t * 9) * 8 }); set(bo, { r: 5 });
  };
}, { sfx: false });
shakeAt(T.muerto0, 0.3, 12);

/* PLANO A (L1 → CTA): (avance) el Cid tieso a caballo ante la puerta → CORTE: Valencia, de día → el ejército enemigo llega por la llanura →
   CORTE: la alcoba, el Cid enfermo en la cama → su orden en susurro (Babieca asoma por la ventana) → muere: la vela se apaga, anochece; Jimena, decidida */
plano(L(1) - 0.1, L(6) - 0.1, { background: '#8fc3e8' }, c => {
  const W = valencia(c);
  const r1 = ROTULO(c, 580, 380, 'VALENCIA', 'hace 900 años', { w: 400 }), r2 = ROTULO(c, 560, 380, 'EL PLAN', 'que nadie se entere', { w: 420 });
  const lag = lagrima(W.M.w, 0, 0);
  sp(T.iba, 'thud', 0.8); sp(L(2) - 0.1, 'whoosh', 0.6); sp(T.ejercito, 'drumroll', 0.7); sp(L(3) - 0.1, 'whoosh', 0.5); sp(T.rara, 'boing', 0.6);
  sp(T.babieca, 'pop2', 0.8); sp(T.babieca + 0.3, 'boing', 0.6); sp(T.muere, 'sad', 0.6); sp(T.plan, 'paper', 0.7);
  return t => {
    camara(W.M, t, [[L(1) - 0.1, 1560, 1180, 1.3], [L(2) - 0.15, 1580, 1170, 1.4], [L(2) - 0.1, 1150, 1200, 0.72, 'corte'], [T.ejercito, 1350, 1250, 0.78], [T.quitarsela + 0.6, 2550, 1300, 0.85],
      [L(3) - 0.1, 620, 1230, 1.15, 'corte'], [T.rara + 0.5, 600, 1250, 1.35], [T.momento, 590, 1220, 1.6], [T.babieca + 0.7, 700, 1150, 1.35], [L(6), 680, 1230, 1.3]]);
    pintaV(W, t); rotuloA(r1, t, T.valencia, T.enfermo); rotuloA(r2, t, T.plan, 99);
    const avance = t < L(2) - 0.1;
    if (avance) { montado(W, t, 1580, false); W.cid.style.visibility = W.ox2.style.visibility = W.jim.style.visibility = 'hidden'; set(W.hojas[0], { sx: 0.05 }); set(W.hojas[1], { sx: 0.05 }); }
    else {
      W.cidC.style.visibility = W.ox.style.visibility = 'hidden'; set(W.espada, { o: 0 }); set(W.cuerda, { o: 0 }); set(W.bab, { o: 0 }); set(W.hojas[0], {}); set(W.hojas[1], {});
      // el Cid en la cama (tumbado: la PERS girada)
      W.cid.style.visibility = 'visible'; pies(W.cid, 230, 580, 1420, { r: -78 });
      const vivo = t < T.muere + 0.2; W.ox2.style.visibility = vivo ? 'hidden' : 'visible';
      pFace(W.cid, t, { feliz: -0.6, closed: !vivo || (t > T.nadie && t < T.babieca && ((t * 1.5) % 1) < 0.2), ceja: 10, jaw: t > T.nadie && t < T.babieca + 0.3 ? talkW(t, 'VECINO') * 0.5 : 0, look: [10, -6] });
      W.jim.style.visibility = t > L(3) + 0.5 ? 'visible' : 'hidden'; pies(W.jim, 220, 900, SUELO);
      pFace(W.jim, t, { feliz: t > T.letra ? 0.3 : -0.6, ceja: t > T.plan ? -6 : 14, look: [-14, 4], seed: 1 });
      set(lag, { o: t > T.muere + 0.3 && t < T.plan ? 1 : 0, x: 880, y: SUELO - 220 + ((t * 0.8) % 1) * 60 });
    }
    // Babieca asoma por la ventana al oír su nombre
    const kb = p(t, T.babieca, 0.4, E.outBack); set(W.cabezaB, { x: 700, y: 1010 + (1 - kb) * 200, o: t > T.babieca && t < L(6) ? 1 : 0 });
    // el ejército enemigo llega
    W.enemigos.forEach(([f, x, i]) => { const k = p(t, T.ejercito - 0.2 + i * 0.12, 1.2, E.outCubic); pies(f, 210, x + (1 - k) * 700, SUELO - (k < 1 ? Math.abs(Math.sin(t * 8 + i)) * 14 : 0)); pFace(f, t, { feliz: 0.6, ceja: -6, look: [-14, 0], seed: i }); });
    W.vela.style.opacity = t > T.muere ? 0.4 : 1; W.vela.ll.style.opacity = t > T.muere ? 0 : 1;
  };
});
shakeAt(T.iba, 0.25, 8);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* PLANO B (L7 → L10): en el patio, de noche: embalsamar ✔ armadura ✔ atarlo tieso ✔ espada ✔ → CORTE: al amanecer se abren las puertas y sale el Cid al galope →
   CORTE: el enemigo lo ve… ¡está vivo! y sale corriendo → CORTE: el Cid, solo en el campo, ganador sin respirar */
plano(L(7) - 0.1, L(11) - 0.1, { background: '#2b2f52' }, c => {
  const W = valencia(c);
  const lista = ROTULO(c, 560, 380, '✔ embalsamar', '', { w: 440, size: 46 });
  const it = ['✔ embalsamar', '✔ armadura', '✔ atado, tieso', '✔ la espada'], tt = [T.embalsaman, T.armadura, T.tieso, T.espada];
  const vi = BOCADILLO(W.M.w, 0, 0, '¡está vivo!', { size: 56 });
  const ex = [...Array(3)].map(() => texto(W.M.w, 0, '!', { size: 110, color: RED, x: 0, w: 70, z: 14, shadow: `4px 4px 0 ${INK}` }));
  const polvo = NUBES(W.M.w, 6, '#d9cfbf', 7), rotV = ROTULO(c, 580, 380, 'VICTORIA', 'sin respirar', { w: 400 });
  tt.forEach(x => sp(x, 'ding', 0.5)); sp(T.puertas, 'squish', 0.7); sp(T.sale, 'whoosh', 0.8); sp(T.cabalgando, 'drumroll', 0.6); sp(T.panico, 'boing', 0.9); sp(T.vivo, 'stamp', 0.8); sp(T.corriendo, 'whoosh', 0.8); sp(T.dedo, 'tada', 0.7);
  return t => {
    camara(W.M, t, [[L(7) - 0.1, 1060, 1230, 1.15], [T.espada + 0.5, 1080, 1200, 1.3],
      [L(8) - 0.1, 1700, 1250, 0.85, 'corte'], [T.cabalgando + 1.2, 2050, 1260, 0.9],
      [L(9) - 0.1, 2650, 1230, 1.15, 'corte'], [T.corriendo + 0.8, 2900, 1280, 0.9],
      [L(10) - 0.1, 2400, 1200, 1.2, 'corte'], [L(11), 2420, 1150, 1.55]]);
    pintaV(W, t);
    // checklist del plan
    const n = tt.filter(x => t > x).length; lista.querySelector('div').innerHTML = it.slice(0, Math.max(1, n)).join('<br>'); lista.style.height = px(40 + 62 * Math.max(1, n)); lista.querySelector('div').style.lineHeight = '62px';
    rotuloA(lista, t, T.embalsaman, L(8) - 0.1);
    // posición del Cid: patio → sale por la puerta → llanura
    const kx = p(t, T.sale - 0.2, T.todos - T.sale + 1.6, E.inOutCubic), x = t < L(8) - 0.1 ? 1080 : lerp(1200, 2350, kx), corre = t > T.sale - 0.2 && t < L(10) - 0.2;
    montado(W, t, x, corre); set(W.bab, { o: t > T.atan - 0.2 ? 1 : 0, x: x - 230, y: SUELO - 345 - (corre ? Math.abs(Math.sin(t * 7)) * 14 : 0) });
    W.cidC.querySelector('svg').style.opacity = 1; W.ox.style.visibility = 'visible';
    const armado = t > T.armadura; W.cidC.style.filter = armado ? '' : 'saturate(0) brightness(1.2)';
    set(W.espada, { o: t > T.espada ? 1 : 0, x: x + 80, y: SUELO - 560 - (corre ? Math.abs(Math.sin(t * 7)) * 14 : 0), r: 20 }); set(W.cuerda, { o: t > T.tieso ? 1 : 0, x: x - 110, y: SUELO - 260 });
    W.cid.style.visibility = 'hidden'; W.ox2.style.visibility = 'hidden';
    W.jim.style.visibility = t < L(8) ? 'visible' : 'hidden'; pies(W.jim, 220, 860, SUELO); pFace(W.jim, t, { feliz: 0.2, ceja: -4, look: [14, 0], seed: 1 });
    // puertas
    const kp = p(t, T.puertas, 0.6, E.outCubic); set(W.hojas[0], { sx: 1 - 0.9 * kp }); set(W.hojas[1], { sx: 1 - 0.9 * kp });
    nubeA(polvo, t, corre ? T.sale + Math.floor((t - T.sale) * 3) / 3 : -9, x - 220, SUELO - 20, 90, 0.5);
    // el enemigo: lo ve → pánico → huye
    const kh = p(t, T.corriendo, 1.6, E.inCubic);
    W.enemigos.forEach(([f, ex0, i]) => { pies(f, 210, ex0 + kh * 1200, SUELO - (t > T.corriendo ? Math.abs(Math.sin(t * 12 + i)) * 24 : 0), { r: t > T.panico ? Math.sin(t * 20 + i) * 3 : 0 }); f.style.visibility = 'visible';
      pFace(f, t, { feliz: t > T.panico ? -1 : 0.4, ceja: t > T.panico ? 22 : -6, look: t > T.corriendo ? [14, 0] : [-14, 0], jaw: t > T.panico ? 0.9 : 0, seed: i }); });
    set(vi, { o: t > T.vivo - 0.2 && t < T.corriendo + 0.6 ? 1 : 0, x: 2420, y: 1020, s: pop(t, T.vivo - 0.2, 0.3), r: -4 });
    ex.forEach((e, i) => set(e, { o: t > T.panico && t < T.corriendo + 0.4 ? 1 : 0, x: 2330 + i * 260, y: 1080, s: pop(t, T.panico + i * 0.08, 0.3) }));
    W.tiendas.forEach((d, i) => set(d, { o: 1 - p(t, T.corriendo + 0.6, 0.6) * 0.6 }));
    rotuloA(rotV, t, T.dedo, 99);
  };
});
shakeAt(T.vivo, 0.3, 12); shakeAt(T.puertas + 0.2, 0.2, 8);

/* L11 · OJO: es leyenda (lo cuentan las crónicas); el Cid sí murió en Valencia, en 1099 */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const le = chip(c, 380, 520, 'LEYENDA', { size: 70, bg: '#1d1a22' });
  const cr = box(c, 320, 680, 460, 380, { zIndex: 6, background: '#f4ecd8', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '34px', color: INK, padding: '30px', boxSizing: 'border-box', lineHeight: 1.4 }, '<b style="font-family:Rye;font-size:46px">CRÓNICA</b><br>…e el Çid, muerto, sobre Bavieca…');
  const r = ROTULO(c, 600, 1110, 'VALENCIA', 'muere en 1099', { w: 340 });
  return t => { popA(le, t, T.leyenda, { r: -5 }); set(cr, { r: -3 + Math.sin(t * 2) * 1.5, s: pop(t, L(11), 0.4) }); rotuloA(r, t, T.m1099 - 0.2); };
});
sp(T.leyenda, 'stamp', 0.7); sp(T.m1099, 'pop2', 0.6);

/* L12 · O sea: el Cid tiene más victorias muerto… que tú vivo en el pádel (marcador 0-6 y el Cid con la copa) */
plano(L(12) - 0.1, L(13) - 0.1, { background: '#2b8ad6', backgroundImage: 'linear-gradient(90deg, transparent 49.6%, #fff 49.6% 50.4%, transparent 50.4%), linear-gradient(transparent 70%, rgba(255,255,255,.9) 70% 70.6%, transparent 70.6%)' }, c => {
  const marc = box(c, 330, 380, 420, 160, { zIndex: 8, background: INK, border: `6px solid #fff`, borderRadius: '16px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '80px', color: '#5dff7a', textAlign: 'center', lineHeight: '148px' }, 'TÚ 0 · 6');
  const tu = PERS(c, 330, 700, 330, { ropa: '#f6e08a', pelo: 'corto' });
  const raq = box(c, 560, 900, 130, 220, { zIndex: 12 }, `<svg viewBox="0 0 130 220" width="130" height="220"><ellipse cx="65" cy="70" rx="58" ry="66" fill="#1d1a22" stroke="#fff" stroke-width="6"/><rect x="54" y="130" width="22" height="86" fill="#1d1a22" stroke="#fff" stroke-width="5"/></svg>`);
  const cid = PERS(c, 690, 700, 280, { ropa: '#9aa4ad', gorro: 'casco', barba: true, pcol: '#e6e0d0', piel: PIEL_MUERTO }); const ox = OJOSX(cid, 280);
  const copa = box(c, 860, 960, 150, 170, { zIndex: 12 }, `<svg viewBox="0 0 150 170" width="150" height="170"><path d="M30,10 H120 C120,80 100,100 75,104 C50,100 30,80 30,10 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="62" y="104" width="26" height="36" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><rect x="36" y="140" width="78" height="22" fill="#8a5a32" stroke="${INK}" stroke-width="6"/></svg>`);
  sp(T.victorias, 'tada', 0.6); sp(T.padel, 'boing', 0.9);
  return t => { set(marc, { s: pop(t, L(12), 0.35) }); pFace(tu, t, { feliz: t > T.padel ? -1 : 0, ceja: t > T.padel ? 20 : 8, look: [12, 0], jaw: t > T.padel ? 0.5 : 0 }); set(raq, { r: -20 + Math.sin(t * 3) * 6 }); pFace(cid, t, { feliz: 0, closed: true }); set(copa, { o: t > T.victorias ? 1 : 0, s: pop(t, T.victorias, 0.35), r: Math.sin(t * 4) * 6 }); };
});
shakeAt(T.padel, 0.25, 10);

/* L13 · pregunta final (pícara) */
preguntaFinal('¿Quién gana discusiones', 'sin abrir la boca?', { size: 80, draw: c => [['mi madre, con la mirada', YEL], ['mi pareja, siempre', PINK], ['el gato', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 52, bg: col, color: INK }), L(13) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(87, 'El Cid, muerto y ganando', ['EL CID', '1099']);

/* transiciones de cuento y música que sigue la tensión */
transTela(L(3) - 0.1, { c1: '#7a1f3a', c2: '#5a1530' }); transPapel(L(11) - 0.1);
sfx('harpa', L(2) - 0.15, 0.6); sfx('mus_baja', L(4) - 0.3); sfx('mus_silencio', T.muere); sfx('mus_sube', T.jimena);
sfx('riser', T.puertas - 1.1, 0.6); sfx('harpa', T.sale, 0.7); sfx('harpa', T.dedo, 0.5);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.babieca, T.babieca + 1.0], [T.respirar, T.respirar + 1.0], [T.padel, T.padel + 1.0]], sorpresa: [[T.iba, T.iba + 0.8], [T.vivo, T.vivo + 0.8]], golpes: [T.iba, T.puertas + 0.2, T.vivo, T.padel] },
});
