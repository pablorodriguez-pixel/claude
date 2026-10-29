/* Ep. 86 · Por qué decimos «¡Jesús!» al que estornuda (Roma, 590, el papa Gregorio y la peste) — FORMATO CUENTO: una calle de Roma que la cámara recorre;
   la peste es un personaje (una nube verde con mala cara) que va de casa en casa y huye a base de bendiciones. */
Story.prepara();
const T = {
  jesus0: Q('jesús'), conjuro0: Q('un conjuro'),
  vida: Q('toda la vida'), sinsaber: Q('sin saberlo'),
  roma: Q('roma'), m590: Q('quinientos noventa'), peste2: Q('la peste'), casa: Q('casa por casa'),
  nota: Q('nota algo'), enfermos: Q('caer enfermos'), estornudan: Q('estornudan'),
  estornudo4: Q('un estornudo ya no'), senal: Q('mala señal'), muy: Q('muy mala'),
  papa: Q('el papa gregorio'), ordena: Q('ordena'), bendice: Q('se le bendice'), momento: Q('al momento'),
  llena: Q('se llena de gente'), gritos: Q('a gritos'), a1: Q('achís'), j1: Q('jesús'), a2: Q('achís'), dios: Q('dios te bendiga'),
  paso: Q('la peste pasó'), costumbre: Q('la costumbre'), siempre: Q('para siempre'),
  aqui: Q('aquí se quedó'), inglaterra: Q('en inglaterra'), bless: Q('bless you'), alemania: Q('en alemania'), salud9: Q('salud'),
  tres: Q('tres veces'), remata: Q('que remata'), jmj: Q('maría y josé'),
  ojo: Q('ojo'), romanos: Q('los romanos'), salud11: Q('salud'), sagrado: Q('lo hizo sagrado'),
  osea: Q('o sea'), estornudes: Q('que estornudes'), nadie: Q('nadie te diga nada'), solo: Q('solo ante la peste'),
};
const SUELO = 1500, VERDE_P = '#8fbf4a';
/* la peste: nube verde con cara de pillo (vb 0 0 300 220) */
const PESTE = (c, w = 300, z = 20) => { const d = box(c, 0, 0, w, w * 220 / 300, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 300 220" width="${w}" height="${w * 220 / 300}" style="overflow:visible"><path d="M60,190 C10,190 0,130 40,110 C20,60 80,30 110,60 C120,10 200,10 210,60 C250,30 300,80 270,120 C310,150 280,200 240,190 Z" fill="${VERDE_P}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M95,100 l40,16 M205,100 l-40,16" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="120" cy="128" r="11" fill="${INK}"/><circle cx="180" cy="128" r="11" fill="${INK}"/><path class="bo" d="M110,160 Q150,190 190,160" stroke="${INK}" stroke-width="8" fill="#5a2a20"/></svg>`); return d; };
const ACHIS = (c, z = 40) => box(c, 0, 0, 420, 200, { zIndex: z, transformOrigin: '20% 60%' }, `<svg viewBox="0 0 420 200" width="420" height="200" style="overflow:visible"><path d="M10,100 L60,60 M10,100 L70,100 M10,100 L60,140" stroke="#bfe4ff" stroke-width="12" stroke-linecap="round"/><text x="80" y="128" font-family="Rye" font-size="96" fill="#fff" stroke="${INK}" stroke-width="10" paint-order="stroke">¡ACHÍS!</text></svg>`);
const BASILICA = `<svg viewBox="0 0 700 1000" width="700" height="1000"><path d="M0,1000 V300 L350,60 L700,300 V1000 Z" fill="#efe4cc" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M350,0 V70 M320,30 H380" stroke="${INK}" stroke-width="12"/>${[0, 1, 2, 3].map(i => `<rect x="${70 + i * 160}" y="560" width="50" height="440" fill="#e0d2b0" stroke="${INK}" stroke-width="6"/>`).join('')}<path d="M270,1000 V820 C270,740 430,740 430,820 V1000 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><rect x="200" y="420" width="300" height="40" fill="#c9a86a" stroke="${INK}" stroke-width="6"/><circle cx="350" cy="250" r="60" fill="#c8102e" stroke="${INK}" stroke-width="7"/></svg>`;
const TOGAS = ['#c87a3a', '#7a5aa8', '#2b8ad6', '#4c8a3a', '#e8507a', '#8a5a32'];

function roma(c) {
  const M = MUNDO(c, 3000, 2600);
  M.far.innerHTML = `<svg viewBox="0 0 3000 2600" width="3000" height="2600"><path d="M0,1250 C500,1120 1000,1200 1500,1130 C2000,1060 2500,1180 3000,1120 V2600 H0 Z" fill="#a7a48a" stroke="${INK}" stroke-width="6"/>${[...Array(7)].map((_, i) => `<path d="M${180 + i * 420},1180 C${150 + i * 420},1080 ${210 + i * 420},1000 ${180 + i * 420},960 C${150 + i * 420},1000 ${210 + i * 420},1080 ${180 + i * 420},1180" fill="#4c6a45" stroke="${INK}" stroke-width="5"/>`).join('')}<path d="M2300,1150 C2300,980 2560,980 2560,1150 Z" fill="#cbbf9e" stroke="${INK}" stroke-width="6"/></svg>`;
  const casas = [[40, 280, 420, '#c87a3a'], [340, 240, 360, '#b5523a'], [600, 300, 440, '#a8452e'], [920, 260, 380, '#c87a3a'], [1200, 300, 420, '#9a3f2a'], [1520, 260, 360, '#b5523a'], [1800, 300, 440, '#a8452e']].map(([x, w, h, tc]) => box(M.w, x, SUELO - h, w, h, { zIndex: 3 }, CASA(w, h, tc)));
  const basi = box(M.w, 2200, SUELO - 1000, 700, 1000, { zIndex: 3 }, BASILICA);
  const suelo = box(M.w, 0, SUELO, 3000, 1100, { zIndex: 4, background: '#b8a07a', borderTop: `10px solid ${INK}`, backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.12) 3px, transparent 3px), linear-gradient(rgba(0,0,0,.12) 3px, transparent 3px)', backgroundSize: '120px 60px' });
  const gente = [[420, 0], [760, 1], [1100, 2], [1420, 3], [1740, 4], [2060, 5]].map(([x, i]) => [PERSm(M.w, 220, { ropa: TOGAS[i], pelo: ['corto', 'largo', 'calvo', 'moño', 'corto', 'largo'][i], pcol: ['#3a2a1e', '#8a5a32', '#9a9a9a', '#3a2a1e', '#c87a3a', '#1d1a22'][i], barba: i === 2, z: 8 }), x, i]);
  const papa = PERSm(M.w, 230, { ropa: '#f4efe2', gorro: 'mitra', cuello: true, z: 6 });
  const peste = PESTE(M.w, 320, 7);
  const luces = casas.map((h, i) => box(M.w, 0, 0, 1, 1));
  const sol = SOL(c, 1), luna = LUNA(c, 1), est = ESTRELLAS_C(c, 24, 1); [sol, luna, ...est].forEach(e => M.vp.appendChild(e));
  return { M, casas, basi, gente, papa, peste, sol, luna, est };
}
const CIELO = () => [[-1, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.peste2 - 0.2, '#8fc3e8', '#f3e2b8', '#ffffff', 0], [T.casa + 0.5, '#6d7a6a', '#b8c49a', '#7a9a5a', 0.35],
  [T.senal, '#4a5a4a', '#8a9a72', '#5a7a4a', 0.45], [T.papa, '#6d7a6a', '#b8c49a', '#7a9a5a', 0.3], [T.paso - 0.2, '#6d7a6a', '#b8c49a', '#7a9a5a', 0.3], [T.paso + 0.8, '#9fd0ee', '#f6ecd0', '#ffffff', 0], [999, '#9fd0ee', '#f6ecd0', '#ffffff', 0]];
const pintaRoma = (W, t) => { cielo(W.M, t, CIELO()); set(W.sol, { x: 760, y: 220, o: 1 }); set(W.luna, { o: 0 }); brillan(W.est, t, 0); };
/* la peste flota de casa en casa (x en el mundo) */
const pesteX = t => t < T.peste2 ? -500 : t < T.nota ? lerp(-200, 1250, p(t, T.peste2, T.nota - T.peste2, E.inOutCubic)) : 1250;

/* L0 · PORTADA (fotograma 0 completo, amarilla): ¡ACHÍS! — «¡Jesús!» — y la nube de la peste sale despedida */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 190, 'Decir «¡Jesús!» es…', { size: 92 });
  const t2 = texto(c, 300, '…un ' + hlSpan('CONJURO', 'phl'), { size: 112, italic: true });
  const a = PERS(c, 90, 560, 450, { ropa: '#2b8ad6', pelo: 'corto' }), b = PERS(c, 600, 620, 400, { ropa: '#e8507a', pelo: 'moño', pcol: '#3a2a1e' });
  const ac = ACHIS(c); set(ac, { x: 300, y: 600 });
  const je = BOCADILLO(c, 660, 560, '¡Jesús!', { size: 64 });
  const pe = PESTE(c, 260, 15); const bs = estrellas(c, 5);
  sfx('swoosh_up', 0.05, 0.6); sp(T.jesus0, 'sparkle', 0.8); sp(T.conjuro0, 'stamp', 0.8);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    pFace(a, t, { feliz: 0, closed: true, ceja: 16, jaw: 0.9 }); pFace(b, t, { feliz: 1, ceja: 10, look: [-14, 0], jaw: 0.5, seed: 1 });
    set(ac, { x: 160, y: 450, s: 1 + 0.05 * Math.sin(t * 12), r: -4 }); set(je, { r: 5, s: 1 + 0.04 * Math.sin(t * 9) });
    set(pe, { x: 720 + Math.sin(t * 2) * 30, y: 1160 + Math.cos(t * 3) * 14, r: 10 + Math.sin(t * 4) * 8 }); orb(bs, t, 800, 1120, 200, 110);
  };
}, { sfx: false });
shakeAt(T.conjuro0, 0.3, 12);

/* L1 · hoy: alguien estornuda en el metro y TRES desconocidos dicen «¡Jesús!» sin pensar */
plano(L(1) - 0.1, L(2) - 0.1, { background: '#d9dde2', backgroundImage: 'linear-gradient(#d9dde2 0 66%, #9aa4ad 66%)' }, c => {
  const ven = [0, 1, 2].map(i => box(c, 340 + i * 250, 400, 200, 260, { zIndex: 1, background: '#2b3550', border: `8px solid ${INK}`, borderRadius: '24px' }));
  const gs = [[330, '#7a5aa8', 'largo'], [560, '#2b8ad6', 'corto'], [790, '#4c8a3a', 'calvo']].map(([x, col, pe], i) => PERS(c, x, 760, 260, { ropa: col, pelo: pe, pcol: '#3a2a1e' }));
  const bb = gs.map((g, i) => BOCADILLO(c, 300 + i * 230, 620 - (i % 2) * 70, '¡Jesús!', { size: 46 }));
  const r = ROTULO(c, 620, 380, 'HOY', 'en el metro', { w: 300 });
  sp(L(1) + 0.15, 'burst', 0.6); bb.forEach((_, i) => sp(T.vida + i * 0.3, 'pop', 0.5));
  return t => { rotuloA(r, t, L(1)); gs.forEach((g, i) => pFace(g, t, { feliz: 0.4, look: [-10 + i * 10, 0], jaw: t > T.vida + i * 0.3 && t < T.vida + i * 0.3 + 0.4 ? 0.6 : 0, closed: t > T.sinsaber, seed: i })); bb.forEach((x, i) => popA(x, t, T.vida + i * 0.3, { r: i % 2 ? 5 : -5 })); };
});

/* PLANO A (L2 → CTA): Roma, 590 → la peste (nube) va de casa en casa → la gente nota algo → ¡ACHÍS! (todos se apartan) →
   mala señal: la nube sonríe detrás → barrido al balcón de la basílica: el papa Gregorio ordena bendecir */
plano(L(2) - 0.1, L(6) - 0.1, { background: '#8fc3e8' }, c => {
  const W = roma(c);
  const r1 = ROTULO(c, 560, 380, 'ROMA · AÑO 590', 'la peste', { w: 460, size: 54 });
  const ac = ACHIS(W.M.w); const ed = ROTULO(c, 500, 1020, 'EDICTO', 'al que estornude: ¡bendición!', { w: 500, size: 64 });
  const vent = W.casas.map(() => 0);
  sp(T.roma, 'whoosh', 0.6); sp(T.m590, 'stamp', 0.6); sp(T.peste2, 'glitch', 0.6); [0, 1, 2, 3].forEach(i => sp(T.casa + i * 0.3, 'thud', 0.4));
  sp(T.nota, 'pop', 0.5); sp(T.estornudan, 'burst', 0.9); sp(T.estornudan + 0.1, 'boing', 0.6); sp(T.senal, 'thud', 0.7); sp(T.muy, 'glitch', 0.7);
  sp(T.papa - 0.2, 'whoosh', 0.9); sp(T.papa, 'bell', 0.6); sp(T.ordena, 'paper', 0.8); sp(T.momento, 'stamp', 0.9);
  return t => {
    const px_ = pesteX(t);
    camara(W.M, t, [[L(2) - 0.1, 1300, 1150, 0.78], [T.m590 + 0.4, 1300, 1260, 0.8], [T.peste2 + 0.3, 600, 1250, 0.95], [T.casa + 1.2, 1150, 1250, 0.95],
      [T.nota + 0.2, 1100, 1250, 0.95], [T.estornudan - 0.1, 1100, 1220, 1.25], [T.estornudo4 + 0.3, 1100, 1200, 1.35], [T.muy + 0.4, 1150, 1050, 1.6],
      [T.papa - 0.25, 1150, 1050, 1.5], [T.papa + 0.25, 2550, 950, 1.15], [T.momento + 0.4, 2550, 980, 1.2], [L(6), 2550, 980, 1.25]]);
    pintaRoma(W, t); rotuloA(r1, t, T.m590, T.nota);
    // la peste: de casa en casa (las casas por las que pasa se apagan un poco)
    const crece = t > T.estornudo4 ? 1 + 0.5 * p(t, T.estornudo4, 1.5) : 1;
    set(W.peste, { x: px_ + Math.sin(t * 3) * 30, y: (t < T.nota ? 900 : 1000) + Math.cos(t * 4) * 16 - (t > T.estornudo4 ? 120 : 0), s: crece, r: Math.sin(t * 2) * 6 });
    W.casas.forEach((h, i) => { h.style.filter = px_ > 40 + i * 290 ? 'saturate(.4) brightness(.8)' : ''; });
    // gente: el del centro estornuda; los demás se apartan y le miran
    W.gente.forEach(([g, x, i]) => { const sn = i === 2, huye = t > T.estornudan + 0.1 && !sn ? (x < 1100 ? -1 : 1) * 140 * p(t, T.estornudan + 0.1, 0.4, E.outBack) : 0;
      pies(g, 220, x + huye, SUELO, { s: sn && t > T.estornudan - 0.4 && t < T.estornudan ? 1.05 : 1 });
      pFace(g, t, { feliz: sn ? (t > T.estornudan ? -0.6 : 0) : (t > T.estornudan ? -1 : 0.3), ceja: t > T.estornudan ? 18 : 6, closed: sn && t > T.estornudan - 0.5 && t < T.estornudan + 0.3, jaw: sn && t > T.estornudan - 0.1 && t < T.estornudan + 0.4 ? 0.9 : 0, look: sn ? [0, 4] : [x < 1100 ? 14 : -14, 0], seed: i }); });
    set(ac, { x: 1180, y: 1060, o: t > T.estornudan && t < T.estornudan + 0.9 ? 1 : 0, s: pop(t, T.estornudan, 0.25) });
    // el papa en el balcón
    pies(W.papa, 230, 2550, 1080); W.papa.style.visibility = t > T.papa - 0.3 ? 'visible' : 'hidden';
    pFace(W.papa, t, { feliz: t > T.bendice ? 0.6 : -0.6, ceja: 14, look: [-10, 8], jaw: t > T.ordena && t < T.momento + 0.4 ? talkW(t, 'VECINO') * 0.6 : 0, seed: 3 });
    rotuloA(ed, t, T.ordena + 0.2, 99);
  };
});
shakeAt(T.estornudan, 0.3, 12); shakeAt(T.momento, 0.25, 10);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* PLANO B (L7 → L8): la calle entera: ¡achís! ¡Jesús! ¡achís! ¡Dios te bendiga! (la cámara barre de uno a otro y la nube va encogiendo) →
   la peste se va → sale el sol → la costumbre se queda: el año corre de 590 a hoy */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#8fc3e8' }, c => {
  const W = roma(c);
  const burbujas = [['¡achís!', T.a1, 1], ['¡Jesús!', T.j1, 0], ['¡achís!', T.a2, 3], ['¡Dios te bendiga!', T.dios, 4], ['¡achís!', T.llena + 0.3, 5], ['¡Jesús!', T.gritos, 2]].map(([s, t0, i]) => [BOCADILLO(W.M.w, 0, 0, s, { size: 50 }), t0, i]);
  const anio = ROTULO(c, 620, 380, '590', 'y desde entonces…', { w: 330, size: 74 });
  const bs = estrellas(W.M.w, 6);
  burbujas.forEach(([, t0]) => sp(t0, 'pop2', 0.6)); sp(T.a1, 'burst', 0.4); sp(T.a2, 'burst', 0.4); sp(T.paso, 'swoosh_up', 0.8); sp(T.siempre, 'tada', 0.6);
  [...Array(10)].forEach((_, i) => sp(T.costumbre + i * 0.1, 'tick', 0.3));
  return t => {
    const xs = W.gente.map(g => g[1]);
    camara(W.M, t, [[L(7) - 0.1, 600, 1200, 1.0], [T.a1, 760, 1200, 1.05], [T.j1, 1100, 1200, 1.05], [T.a2, 1420, 1200, 1.05], [T.dios, 1760, 1200, 1.0], [T.dios + 0.8, 1400, 1150, 0.75],
      [T.paso + 0.2, 1400, 1100, 0.75], [T.siempre + 0.6, 1400, 1250, 0.78], [L(9), 1400, 1250, 0.8]]);
    pintaRoma(W, t);
    const enc = p(t, T.llena, T.paso - T.llena, E.linear);
    set(W.peste, { x: lerp(1250, 1500, enc) + Math.sin(t * 6) * 40 * (1 - enc), y: t > T.paso ? lerp(900, -700, p(t, T.paso, 1.0, E.inCubic)) : 900 + Math.cos(t * 5) * 20, s: lerp(1.2, 0.55, enc), r: Math.sin(t * 9) * 10 });
    W.peste.querySelector('.bo').setAttribute('d', t > T.gritos ? 'M110,175 Q150,150 190,175' : 'M110,160 Q150,190 190,160');
    W.gente.forEach(([g, x, i]) => { const habla = burbujas.find(b => b[2] === i && t > b[1] && t < b[1] + 0.7); pies(g, 220, x, SUELO - (habla ? 16 : 0)); pFace(g, t, { feliz: t > T.paso ? 1 : 0.4, closed: !!habla && i % 2 === 1, jaw: habla ? 0.8 : 0, ceja: 8, look: [Math.sin(t + i) * 10, 0], seed: i }); });
    burbujas.forEach(([b, t0, i]) => set(b, { o: t > t0 && t < t0 + 1.6 ? 1 : 0, x: xs[i] - 120, y: SUELO - 520 - (i % 2) * 60, s: pop(t, t0, 0.3), r: i % 2 ? 4 : -4 }));
    W.casas.forEach(h => { h.style.filter = t < T.paso ? 'saturate(.5) brightness(.85)' : ''; });
    orb(bs, t, 1400, 1100, 600, 120); bs.forEach(b => b.style.opacity = t > T.paso + 0.3 ? b.style.opacity : 0);
    anio.querySelector('div').textContent = String(Math.round(lerp(590, 2025, p(t, T.costumbre, 1.2, E.inOutCubic)))); rotuloA(anio, t, T.costumbre - 0.2);
  };
});

/* L9 · aquí «¡Jesús!», en Inglaterra «bless you», en Alemania «Gesundheit» (= salud): tres vecinos de Europa, misma reacción */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.26)', 'rgba(0,0,0,0)', 0);
  const P = [['ESPAÑA', '¡Jesús!', T.aqui, 'linear-gradient(#c8102e 0 25%, #f2c230 25% 75%, #c8102e 75%)', '#c8102e'], ['INGLATERRA', 'Bless you!', T.bless, 'linear-gradient(90deg, transparent 42%, #c8102e 42% 58%, transparent 58%), linear-gradient(transparent 36%, #c8102e 36% 64%, transparent 64%), #fff', '#2b3550'], ['ALEMANIA', 'Gesundheit!', T.alemania + 0.3, 'linear-gradient(#1d1a22 0 33%, #c8102e 33% 66%, #f2c230 66%)', '#5d636b']].map(([pais, dice, t0, bg, ropa], i) => {
    const y = 420 + i * 300; const f = box(c, 330, y + 20, 120, 80, { zIndex: 5, background: bg, border: `5px solid ${INK}` });
    const g = PERS(c, 470, y - 20, 200, { ropa, pelo: ['corto', 'largo', 'calvo'][i], pcol: '#8a5a32' });
    const b = BOCADILLO(c, 680, y + 40, dice, { size: 48 }); const l = chip(c, 310, y + 120, pais, { size: 34, bg: INK }); return [f, g, b, l, t0, i]; });
  const sa = chip(c, 640, 1290, '= «salud»', { size: 50, bg: VERDEI });
  P.forEach(([, , , , t0]) => sp(t0, 'pop2', 0.6)); sp(T.salud9, 'ding', 0.6);
  return t => { set(ry, { r: t * 6 }); P.forEach(([f, g, b, l, t0, i]) => { set(f, { o: t > t0 - 0.2 ? 1 : 0, s: pop(t, t0 - 0.2, 0.3) }); set(g, { o: t > t0 - 0.2 ? 1 : 0, s: pop(t, t0 - 0.2, 0.3) }); pFace(g, t, { feliz: 1, jaw: t > t0 && t < t0 + 0.5 ? 0.7 : 0, look: [10, 0], seed: i }); popA(b, t, t0, { r: i % 2 ? 4 : -4 }); set(l, { o: t > t0 - 0.2 ? 1 : 0 }); }); popA(sa, t, T.salud9, { r: -4 }); };
});

/* L10 · si estornudas tres veces seguidas… la abuela remata: «¡Jesús, María y José!» */
plano(L(10) - 0.1, L(11) - 0.1, { background: '#f6d6c8', backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,.5), transparent 60%)' }, c => {
  const tu = PERS(c, 300, 640, 380, { ropa: '#2b8ad6', pelo: 'corto' });
  const ab = PERS(c, 680, 700, 320, { ropa: '#7a5aa8', pelo: 'moño', pcol: '#c9c9c9' });
  const cnt = ROTULO(c, 340, 380, '×1', 'estornudos', { w: 260, size: 80 });
  const ac = ACHIS(c); const jmj = BOCADILLO(c, 420, 1160, '¡Jesús, María y José!', { size: 52 });
  const tt = [T.tres - 0.3, T.tres + 0.4, T.remata - 0.2];
  tt.forEach(x => sp(x, 'burst', 0.5)); sp(T.jmj - 0.3, 'tada', 0.8);
  return t => {
    const n = tt.filter(x => t > x).length; cnt.querySelector('div').textContent = '×' + Math.max(1, n); rotuloA(cnt, t, T.tres - 0.3);
    const ult = tt.filter(x => t > x).pop() || -9, ks = t - ult < 0.5;
    pFace(tu, t, { feliz: 0, closed: ks, ceja: 16, jaw: ks ? 0.9 : 0, look: [10, 0] }); set(tu, { y: ks ? 10 : 0 });
    set(ac, { x: 330, y: 560, o: ks && n ? 1 : 0, s: pop(t, ult, 0.25) * (0.8 + n * 0.15) });
    pFace(ab, t, { feliz: t > T.jmj ? 1 : -0.4, ceja: 18, look: [-14, 0], jaw: t > T.jmj - 0.3 && t < L(11) - 0.3 ? 0.6 : 0, seed: 1 }); popA(jmj, t, T.jmj - 0.3, { r: -3 });
  };
});

/* L11 · OJO: los romanos ya decían «¡salve!» (= «¡salud!») siglos antes; Gregorio solo lo hizo sagrado */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const ro = PERS(c, 330, 640, 340, { ropa: '#f4efe2', pelo: 'corto', cuello: true });
  const b = BOCADILLO(c, 600, 600, '¡Salve!', { size: 60 }); const s = chip(c, 620, 760, '= «¡salud!»', { size: 46, bg: VERDEI });
  const sag = chip(c, 380, 1170, '+ Gregorio: lo hace sagrado', { size: 42, bg: '#2b3550' });
  return t => { pFace(ro, t, { feliz: 1, jaw: t > T.romanos && t < T.salud11 + 0.4 ? 0.6 : 0, look: [10, 0] }); popA(b, t, T.romanos + 0.3, { r: 4 }); popA(s, t, T.salud11, { r: -4 }); popA(sag, t, T.sagrado, { r: -3 }); };
});
sp(T.romanos + 0.3, 'pop2', 0.6); sp(T.sagrado, 'bell', 0.6);

/* L12 · O sea: estornudas en la oficina y nadie te dice nada… y detrás de ti, la nube vuelve, encantada */
plano(L(12) - 0.1, L(13) - 0.1, { background: '#dfe7d8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 2px, transparent 2px 120px)' }, c => {
  const tu = PERS(c, 330, 640, 380, { ropa: '#2b8ad6', pelo: 'corto' });
  const cs = [[680, '#7a5aa8'], [860, '#4c8a3a']].map(([x, col], i) => PERS(c, x, 760, 200, { ropa: col, pelo: i ? 'calvo' : 'largo', pcol: '#3a2a1e' }));
  const grillo = texto(c, 560, 'cri, cri…', { size: 64, italic: true, color: '#5d636b', x: 560, w: 460, z: 12 });
  const pe = PESTE(c, 300, 4); const ac = ACHIS(c);
  sp(T.estornudes, 'burst', 0.7); sp(T.nadie + 0.3, 'tick', 0.4); sp(T.solo, 'glitch', 0.7); sp(T.solo + 0.2, 'boing', 0.7);
  return t => {
    const ks = t > T.estornudes && t < T.estornudes + 0.5; pFace(tu, t, { feliz: t > T.solo ? -1 : 0, ceja: t > T.solo ? 20 : 10, closed: ks, jaw: ks ? 0.9 : 0, look: t > T.nadie ? [12, 0] : [0, 0] });
    set(ac, { x: 360, y: 560, o: ks ? 1 : 0, s: pop(t, T.estornudes, 0.25) });
    cs.forEach((g, i) => pFace(g, t, { feliz: 0, closed: true, look: [0, 10], seed: i })); set(grillo, { o: t > T.nadie + 0.3 && t < T.solo ? 1 : 0 });
    const kp = p(t, T.solo - 0.3, 0.5, E.outBack); set(pe, { x: 60 + Math.sin(t * 3) * 20, y: lerp(-300, 420, kp), o: t > T.solo - 0.3 ? 1 : 0, r: Math.sin(t * 4) * 8 });
  };
});
shakeAt(T.solo, 0.3, 12);

/* L13 · pregunta final (pícara) */
preguntaFinal('¿«¡Jesús!», «¡salud!»…', '…o como si no lo oyeras?', { size: 72, draw: c => [['¡Jesús!, de toda la vida', YEL], ['¡salud!, que es más fino', PINK], ['yo no he oído nada', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(13) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(86, '¡Jesús! y la peste', ['¡JESÚS!', 'año 590']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.dios, T.dios + 1.0], [T.jmj, T.jmj + 1.0], [T.solo, T.solo + 1.0]], sorpresa: [[T.estornudan, T.estornudan + 0.8], [T.muy, T.muy + 0.8]], golpes: [T.estornudan, T.momento, T.jmj - 0.3, T.solo] },
});
