/* Ep. 102 · «El DNI número 1 lo tuvo Franco» — FORMATO NUEVO. Un solo mundo: una pared con los DNI del 1 al 16 en fila; la cámara la recorre en UNA dirección
   (Franco y familia → el hueco del 4 al 9 → la familia real) y al final se aleja para verla entera. Cortes solo en la portada, la oficina de 1944 y el remate. */
Story.prepara();
const T = {
  uno0: Q('uno'), franco0: Q('franco'),
  cuatro1: Q('del cuatro al nueve'), nadie1: Q('no los tiene nadie'),
  cuarentaycuatro: Q('cuarenta y cuatro'), crea: Q('franco crea'), documento: Q('documento nacional'),
  siete: Q('siete años'), primero: Q('el primero'), numuno: Q('el número uno'),
  dos: Q('el dos'), polo: Q('carmen polo'), tres: Q('el tres'), hija: Q('su hija'),
  hueco: Q('un hueco'), del4: Q('del cuatro al nueve'), nadie5: Q('nadie'), hoy5: Q('hasta hoy'),
  diez6: Q('a partir del diez'), real: Q('familia real'),
  diez7: Q('el diez'), juancarlos: Q('juan carlos'), quince: Q('el quince'), felipe: Q('felipe'), dieciseis: Q('el dieciséis'), leonor: Q('leonor'),
  bajos: Q('más bajos'), despues: Q('después de los franco'),
  proxima: Q('la próxima vez'), acuerdate: Q('acuérdate'), numuno9: Q('el número uno'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const CARAS_DNI = {
  1: { ropa: '#5d6b4a', pelo: 'corto', bigote: true, pcol: '#2a2118' },
  2: { ropa: '#2a2530', pelo: 'moño', pcol: '#2a2118' },
  3: { ropa: '#7a5aa8', pelo: 'largo', pcol: '#3a2a1e' },
  10: { ropa: '#1f2a50', pelo: 'corto', pcol: '#6b4a2a' },
  15: { ropa: '#1f2a50', pelo: 'corto', barba: true, pcol: '#6b6a74' },
  16: { ropa: '#c8102e', pelo: 'largo', pcol: '#d8b060' },
};
const NOMBRE_DNI = { 1: 'FRANCO', 2: 'CARMEN POLO', 3: 'CARMEN FRANCO', 10: 'JUAN CARLOS', 15: 'FELIPE VI', 16: 'LEONOR' };
/* un DNI antiguo (420 × 270): foto con cara, número grande; vacío = hueco punteado con «?» */
function DNI(c, n, o = {}) {
  const vacio = !CARAS_DNI[n] && n < 10, real = n >= 10;
  const d = box(c, 0, 0, 420, 270, { zIndex: o.z || 5, transformOrigin: '50% 50%', background: vacio ? 'transparent' : real ? '#e9e2cf' : '#cfe0c8', border: vacio ? `7px dashed rgba(43,33,24,.45)` : `7px solid ${INK}`, borderRadius: '22px', boxShadow: vacio ? 'none' : '10px 10px 0 rgba(0,0,0,.22)', overflow: 'hidden' },
    vacio ? `<div style="font-family:Playfair;font-weight:900;font-size:150px;text-align:center;line-height:256px;color:rgba(43,33,24,.35)">${n}</div>`
      : `<div style="background:${real ? '#7a2a2a' : '#2e6b3a'};color:#fff;font-family:Bricolage;font-weight:800;font-size:19px;line-height:44px;text-align:center;white-space:nowrap">DOCUMENTO NACIONAL DE IDENTIDAD</div>
         <div class="foto" style="position:absolute;left:24px;top:62px;width:140px;height:180px;background:#fbf6ea;border:5px solid ${INK};overflow:hidden"></div>
         <div style="position:absolute;left:180px;top:62px;font-family:Bricolage;font-weight:800;font-size:28px;color:${INK}">Nº</div>
         <div style="position:absolute;left:176px;top:70px;width:230px;text-align:center;font-family:Playfair;font-weight:900;font-size:${n > 9 ? 120 : 140}px;line-height:150px;color:${RED}">${n}</div>
         <div style="position:absolute;left:180px;top:216px;width:225px;text-align:center;font-family:SpecialElite;font-size:${(NOMBRE_DNI[n] || '').length > 11 ? 22 : 28}px;color:${INK}">${NOMBRE_DNI[n] || ''}</div>`);
  if (!vacio && CARAS_DNI[n]) { const f = d.querySelector('.foto'); d.cara = PERS(f, -10, 30, 160, CARAS_DNI[n]); }
  if (!vacio && !CARAS_DNI[n]) d.style.opacity = 0.55;
  if (real && CARAS_DNI[n]) d.corona = box(c, 0, 0, 120, 80, { zIndex: (o.z || 5) + 1 }, `<svg viewBox="0 0 120 80" width="120" height="80"><path d="M8,72 L16,18 L40,46 L60,8 L80,46 L104,18 L112,72 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></svg>`);
  return d;
}
/* la pared con los 16 DNI en fila (x de cada uno) */
const XN = n => 300 + (n - 1) * 520;
function pared(c) {
  const M = MUNDO(c, 8800, 2400); M.sky.style.background = '#e9dcc2';
  box(M.w, 0, 0, 8800, 2400, { zIndex: 1, background: '#e9dcc2', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.06) 0 6px, transparent 6px 120px)' });
  box(M.w, 0, 1500, 8800, 900, { zIndex: 1, background: '#b8a07a', borderTop: `10px solid ${INK}` });
  const d = {}; for (let n = 1; n <= 16; n++) { d[n] = DNI(M.w, n); set(d[n], { x: XN(n) - 210, y: 900 }); if (d[n].corona) set(d[n].corona, { x: XN(n) - 60, y: 800 }); }
  const marco = box(M.w, XN(4) - 260, 860, XN(9) - XN(4) + 520, 360, { zIndex: 2, border: `8px dashed ${RED}`, borderRadius: '30px', opacity: 0 });
  const vacio = texto(M.w, 1260, 'NADIE', { size: 160, color: RED, x: XN(4) - 260, w: XN(9) - XN(4) + 520, z: 3, shadow: `5px 5px 0 #fff` });
  const grupos = [['LOS FRANCO', 1, 3, '#2e6b3a'], ['NADIE', 4, 9, RED], ['FAMILIA REAL', 10, 16, '#7a2a2a']].map(([s, a, b, col]) => texto(M.w, 420, s, { size: 210, color: col, x: XN(a) - 260, w: XN(b) - XN(a) + 520, z: 4, shadow: `10px 10px 0 #fff` }));
  return { M, d, marco, vacio, grupos };
}

/* PORTADA + L1 (sin cortar): el DNI n.º 1 de Franco, enorme → «del 4 al 9, nadie»: la fila 1-16 con el hueco */
plano(-1, L(2) - 0.1, { background: '#2e6b3a' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#2e6b3a', backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.12) 0 9deg, transparent 9deg 18deg)' });
  const g = DNI(cam, 1, { z: 6 }); set(g, { x: 330, y: 700, s: 1.9 });
  const fila = [...Array(16)].map((_, i) => { const q = DNI(cam, i + 1, { z: 7 }); return q; });
  const t1 = texto(c, 180, 'EL DNI ' + hlSpan('NÚMERO 1', 'phl', RED), { size: 100, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 310, '…lo tuvo FRANCO', { size: 86, italic: true, color: YEL, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` });
  const nad = texto(c, 1180, 'del 4 al 9: NADIE', { size: 96, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.franco0, 'stamp', 0.9); sp(T.cuatro1, 'whoosh', 0.6); sp(T.nadie1, 'error', 0.5);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 960, 1.0], [540, 960, 1.08]);
    const kf = p(t, T.cuatro1 - 0.3, 0.6, E.inOutCubic);
    set(g, { x: 330, y: 700, s: lerp(1.9, 0.6, kf), r: -4 + Math.sin(t * 1.3) * 2, o: 1 - kf }); if (g.cara) pFace(g.cara, t, { feliz: 0.3, ceja: -6, seed: 1 });
    fila.forEach((q, i) => { const n = i + 1, fx = 80 + (i % 4) * 240, fy = 560 + Math.floor(i / 4) * 170; const k = p(t, T.cuatro1 - 0.2 + i * 0.04, 0.4, E.outBack);
      set(q, { o: t > T.cuatro1 - 0.2 ? 1 : 0, x: fx - 105, y: fy - 70, s: 0.5 * k, r: n >= 4 && n <= 9 && t > T.nadie1 ? Math.sin(t * 8 + i) * 4 : 0 }); if (q.corona) set(q.corona, { o: 0 }); });
    paint(c.querySelector('.phl'), t, 0.25, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) });
    set(nad, { o: t > T.nadie1 - 0.1 ? 1 : 0, s: pop(t, T.nadie1 - 0.1, 0.35), r: -3 });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L3): la oficina de 1944 (corte): la máquina de escribir, el sello «D.N.I.» → 7 años después, el n.º 1 en manos de Franco */
plano(L(2) - 0.1, L(4) - 0.1, { background: '#c9bfae' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#c9bfae', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 70px, transparent 70px 140px)' });
  const mesa = box(cam, -100, 1180, 1280, 300, { zIndex: 8, background: '#6b4a2a', borderTop: `10px solid ${INK}` });
  const maq = box(cam, 140, 960, 380, 240, { zIndex: 9 }, `<svg viewBox="0 0 380 240" width="380" height="240"><rect x="40" y="90" width="300" height="140" rx="20" fill="#2a2530" stroke="${INK}" stroke-width="7"/><rect x="70" y="20" width="240" height="90" fill="#fbf6ea" stroke="${INK}" stroke-width="6"/>${[0, 1, 2].map(r => [...Array(8)].map((_, i) => `<circle cx="${80 + i * 32}" cy="${140 + r * 28}" r="11" fill="#e9dcc2" stroke="${INK}" stroke-width="3"/>`).join('')).join('')}</svg>`);
  const sello = texto(cam, 760, 'D.N.I.', { size: 150, color: RED, x: 520, w: 520, z: 10, shadow: `5px 5px 0 ${INK}` });
  const fr = PERS(cam, 600, 620, 360, { ropa: '#5d6b4a', gorro: 'gorra', gcol: '#5d6b4a', bigote: true, pelo: 'corto', pcol: '#2a2118' });
  const carta = DNI(cam, 1, { z: 12 });
  const ch = chip(c, 420, 420, '1944', { size: 72, bg: '#2b3550' }), ch2 = chip(c, 420, 420, '1951', { size: 72, bg: '#2e6b3a' });
  sp(T.cuarentaycuatro, 'whoosh', 0.4); sp(T.documento, 'stamp', 0.9); sp(T.siete, 'clockfast', 0.6); sp(T.numuno, 'tada', 0.8);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(4) - 0.1, [540, 1000, 1.0], [620, 960, 1.15]);
    rotuloA(ch, t, T.cuarentaycuatro, T.siete); rotuloA(ch2, t, T.siete, L(4));
    set(sello, { o: t > T.documento - 0.1 && t < T.siete ? 1 : 0, s: t > T.documento - 0.1 ? lerp(1.8, 1, p(t, T.documento - 0.1, 0.2)) : 0, r: -10 });
    const vf = t > T.primero - 0.4; set(fr, { o: vf ? 1 : 0, y: (1 - p(t, T.primero - 0.4, 0.5, E.outBack)) * 300 }); pFace(fr, t, { feliz: t > T.numuno ? 1 : 0.2, ceja: -6, look: [-10, 8], seed: 1 });
    const kc = p(t, T.numuno - 0.3, 0.6, E.outBack); set(carta, { o: t > T.numuno - 0.3 ? 1 : 0, x: 560, y: lerp(1500, 1050, kc), s: 0.9, r: -8 }); if (carta.cara) pFace(carta.cara, t, { feliz: 0.6, seed: 1 });
  };
});

/* ACTOS 2-4 (L4 → L9), sin cortar: la pared de los DNI; la cámara avanza siempre a la derecha: 2 y 3 → el hueco del 4 al 9 → 10, 15 y 16 con corona → se aleja y se ve la fila entera */
plano(L(4) - 0.1, L(9) - 0.1, { background: '#e9dcc2' }, c => {
  const W = pared(c);
  const ch = chip(c, 300, 420, 'familia real: del 10 en adelante', { size: 46, bg: '#7a2a2a', z: 40 });
  const bajos = texto(c, 1160, 'los más bajos', { size: 96, color: '#fff', z: 40, shadow: OUT });
  sp(T.dos, 'pop', 0.5); sp(T.tres, 'pop', 0.5); sp(T.hueco - 0.2, 'mus_silencio', 1); sp(T.nadie5, 'error', 0.5); sp(T.hoy5 + 0.4, 'mus_sube', 1);
  sp(T.diez7, 'ding', 0.5); sp(T.quince, 'ding', 0.5); sp(T.dieciseis, 'tada', 0.7); sp(T.bajos, 'whoosh', 0.5);
  return t => {
    const cm = camara(W.M, t, [[L(4) - 0.1, XN(1) + 300, 1040, 1.0], [T.hija + 0.6, XN(3), 1040, 1.0], [T.del4, XN(5), 1060, 0.62], [T.hoy5 + 0.3, XN(8), 1060, 0.62], [T.diez6, XN(10), 1040, 0.95],
      [T.felipe, XN(14), 1040, 0.95], [T.leonor + 0.5, XN(16) - 150, 1040, 1.0], [T.bajos, XN(8.5), 900, 0.12], [L(9) - 0.1, XN(8.5) + 250, 920, 0.15]]);
    for (let n = 1; n <= 16; n++) { const q = W.d[n]; if (q.cara) pFace(q.cara, t, { feliz: 0.4, look: [0, 4], seed: n }); set(q, { x: XN(n) - 210, y: 900, s: 1, r: n >= 4 && n <= 9 && t > T.nadie5 && t < T.diez6 ? Math.sin(t * 8 + n) * 3 : 0 });
      if (q.corona) set(q.corona, { x: XN(n) - 60, y: 800 - (t > T.diez7 ? Math.abs(Math.sin(t * 3 + n)) * 10 : 0), o: t > T.real - 0.2 ? 1 : 0 }); }
    W.marco.style.opacity = t > T.hueco ? 1 : 0; set(W.vacio, { o: t > T.nadie5 - 0.1 ? 1 : 0, s: pop(t, T.nadie5 - 0.1, 0.35) });
    set(ch, { o: t > T.real - 0.2 && t < T.bajos ? 1 : 0, s: pop(t, T.real - 0.2, 0.3), r: -2 });
    set(bajos, { o: t > T.bajos ? 1 : 0, s: pop(t, T.bajos, 0.35), r: -3 }); W.grupos.forEach((g, i) => set(g, { o: t > T.bajos - 0.3 + i * 0.3 ? 1 : 0, s: pop(t, T.bajos - 0.3 + i * 0.3, 0.35) }));
  };
}, { sfx: false });

/* REMATE (L9, corte al presente): «¿me deja el DNI?»: tu mano saca el tuyo → al fondo, el n.º 1 se ilumina */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#9fd3c0' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#9fd3c0' });
  const tu = PERS(cam, 120, 780, 360, { ropa: '#2b8ad6', pelo: 'corto', pcol: '#3a2a1e' });
  const poli = PERS(cam, 600, 760, 360, { ropa: '#2b3550', gorro: 'gorra', gcol: '#2b3550', pelo: 'corto', pcol: '#3a2a1e' });
  const bo = BOCADILLO(cam, 0, 0, '¿Me deja el DNI?', { size: 50 });
  const tuyo = box(cam, 0, 0, 420, 270, { zIndex: 10, transformOrigin: '50% 50%', background: '#cfe0f0', border: `7px solid ${INK}`, borderRadius: '22px', boxShadow: '10px 10px 0 rgba(0,0,0,.22)', fontFamily: 'Bricolage', fontWeight: 800, color: INK, textAlign: 'center' },
    `<div style="background:#1f4fa0;color:#fff;font-size:24px;line-height:46px">DNI</div><div style="font-size:64px;margin-top:40px;letter-spacing:4px">12345678 Z</div>`);
  const uno = DNI(cam, 1, { z: 4 });
  sp(T.proxima, 'pop', 0.5); sp(T.acuerdate, 'sparkle', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 980, 1.0], [540, 940, 1.12]);
    set(bo, { o: t > T.proxima ? 1 : 0, x: 500, y: 560, s: pop(t, T.proxima, 0.3), r: 3 });
    const kt = p(t, T.proxima + 0.5, 0.5, E.outBack); set(tuyo, { o: t > T.proxima + 0.5 ? 1 : 0, x: 280, y: lerp(1600, 1150, kt), r: -6 });
    set(uno, { o: t > T.acuerdate ? 0.9 : 0, x: 330, y: 300, s: pop(t, T.acuerdate, 0.4) * 0.8, r: 6 }); if (uno.cara) pFace(uno.cara, t, { feliz: 1, closed: t > T.numuno9, seed: 1 });
    pFace(tu, t, { feliz: 0.6, look: [14, 0], seed: 2 }); pFace(poli, t, { feliz: 0.2, look: [-14, 0], seed: 3 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tu DNI', 'empieza por cero?', { size: 92, draw: c => [['sí, por 0', YEL], ['no', PINK], ['ni lo sé', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(102, 'El DNI número 1', ['DNI', 'con historia']);

Story.run({
  textura: true,
  ovalo: [[T.acuerdate, L(10) - 0.15]],
  vecino: { risa: [[T.numuno9, T.numuno9 + 1.2]], sorpresa: [], golpes: [] },
});
