/* Ep. 103 · «La flechita de la gasolina» (Jim Moylan, Ford, 1986) — FORMATO NUEVO (dato práctico con cuento).
   Salpicadero (gancho) → gasolinera bajo la lluvia (la manguera no llega) → la oficina (la nota y el «sí») → todos los coches → remate práctico.
   Cámara siempre en movimiento lento y continuo; cortes solo entre escenas. */
Story.prepara();
const T = {
  flechita: Q('flechita'), deposito0: Q('el depósito'),
  senor: Q('un señor'), mojo: Q('se mojó'),
  detroit: Q('detroit'), moylan: Q('jim moylan'), ford2: Q('de ford'), coche2: Q('un coche'),
  lloviendo: Q('lloviendo'), gasolinera: Q('la gasolinera'), equivocado: Q('lado equivocado'),
  vuelta: Q('dar la vuelta'), empapado: Q('empapado'),
  nota: Q('una nota'), simbolo: Q('un símbolo'), lado5: Q('qué lado'),
  siete: Q('siete meses'), contestan: Q('le contestan'),
  ochentaynueve: Q('ochenta y nueve'), primeros: Q('los primeros'), flechita7: Q('la flechita'),
  hoy: Q('hoy la tienen'), mundo: Q('del mundo'), mojado: Q('señor mojado'),
  alquilado: Q('coche alquilado'), ventanilla: Q('la ventanilla'), mira: Q('mira la flecha'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* indicador de gasolina (vb 0 0 400 260): esfera, aguja, surtidor y la FLECHA (.fl) a la izquierda o derecha */
const MARCADOR = (c, w = 400, lado = 'izq', z = 6) => { const d = box(c, 0, 0, w, w * 0.65, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 400 260" width="${w}" height="${w * 0.65}" style="overflow:visible">
  <rect x="6" y="6" width="388" height="248" rx="40" fill="#1d1a22" stroke="${INK}" stroke-width="8"/>
  <path d="M70,200 A130,130 0 0,1 330,200" fill="none" stroke="#fbf6ea" stroke-width="8"/>${[0, 1, 2, 3, 4].map(i => { const a = (-180 + i * 45) * Math.PI / 180; return `<path d="M${200 + Math.cos(a) * 130},${200 + Math.sin(a) * 130} L${200 + Math.cos(a) * 110},${200 + Math.sin(a) * 110}" stroke="#fbf6ea" stroke-width="7"/>`; }).join('')}
  <text x="70" y="240" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="${RED}">0</text><text x="330" y="240" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="30" fill="#fbf6ea">1/1</text>
  <g class="ag"><path d="M200,200 L200,96" stroke="#ff7a3a" stroke-width="9" stroke-linecap="round"/></g><circle cx="200" cy="200" r="16" fill="#fbf6ea"/>
  <g transform="translate(170 120)"><rect x="0" y="0" width="40" height="50" rx="5" fill="#fbf6ea"/><rect x="7" y="7" width="26" height="14" fill="#1d1a22"/><path d="M40,12 h10 v30 h-6" stroke="#fbf6ea" stroke-width="5" fill="none"/></g>
  <path class="fl" d="${lado === 'izq' ? 'M150,145 L128,132 L150,119 Z' : 'M250,145 L272,132 L250,119 Z'}" fill="#fbf6ea"/></svg>`);
  d.ag = d.querySelector('.ag'); d.fl = d.querySelector('.fl'); return d; };
/* coche de lado (vb 0 0 620 240); el tapón del depósito NO está en este lado */
const COCHE_L = (c, col = '#c8102e', z = 8) => box(c, 0, 0, 620, 240, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 620 240" width="620" height="240" style="overflow:visible">
  <path d="M20,180 L30,120 L150,110 L220,50 L420,50 L500,110 L590,120 L600,180 Z" fill="${col}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M235,62 L410,62 L470,112 L180,112 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/><path d="M320,62 V112" stroke="${INK}" stroke-width="6"/>
  ${[140, 480].map(x => `<circle cx="${x}" cy="190" r="46" fill="#2a2530" stroke="${INK}" stroke-width="7"/><circle cx="${x}" cy="190" r="18" fill="#9a9a9a"/>`).join('')}</svg>`);
const SURTIDOR = (c, z = 5) => box(c, 0, 0, 180, 420, { zIndex: z }, `<svg viewBox="0 0 180 420" width="180" height="420"><rect x="20" y="40" width="140" height="380" rx="14" fill="#e8507a" stroke="${INK}" stroke-width="8"/><rect x="40" y="80" width="100" height="70" rx="6" fill="#bfe3f5" stroke="${INK}" stroke-width="5"/><text x="90" y="128" text-anchor="middle" font-family="SpaceMono" font-weight="700" font-size="30" fill="${INK}">95</text><rect x="10" y="20" width="160" height="40" rx="10" fill="#fbf6ea" stroke="${INK}" stroke-width="6"/></svg>`);

/* PORTADA + L1 (sin cortar): el salpicadero de cerca: la flechita parpadea con un círculo rojo → «un señor se mojó»: empieza a llover sobre el cristal */
plano(-1, L(2) - 0.1, { background: '#2a2530' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#3d3a44, #1d1a22)' });
  const parab = box(cam, -400, -400, 1880, 1100, { zIndex: 1, background: 'linear-gradient(#9fb8cc, #6d8aa0)', borderBottom: `14px solid ${INK}` });
  const gotas = LLUVIA(cam, 50, 2);
  const m = MARCADOR(cam, 900, 'izq'); set(m, { x: 90, y: 760 });
  const circ = box(cam, 0, 0, 200, 200, { zIndex: 9, border: `10px solid ${RED}`, borderRadius: '50%' });
  const t1 = texto(c, 170, '¿VES ESTA ' + hlSpan('FLECHITA', 'phl', RED) + '?', { size: 74, color: '#fff', z: 40, shadow: OUT });
  const t2 = texto(c, 290, 'te dice dónde está el depósito', { size: 60, italic: true, color: YEL, z: 40, shadow: `4px 4px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` });
  const moj = texto(c, 1200, '…y un señor se mojó', { size: 80, color: '#fff', z: 40, shadow: OUT });
  sfx('swoosh_up', 0.05, 0.5); sp(T.flechita, 'ding', 0.8); sp(T.mojo, 'squish', 0.7);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 1000, 1.0], [420, 1060, 1.3]);
    m.ag.setAttribute('transform', `rotate(${f1(-62 + Math.sin(t * 1.5) * 3)} 200 200)`); m.fl.setAttribute('fill', Math.sin(t * 8) > 0 ? YEL : '#fbf6ea');
    set(circ, { x: 90 + 900 * 139 / 400 - 100, y: 760 + 900 * 132 / 400 - 100, s: 1 + 0.08 * Math.sin(t * 6), o: t > 0.15 ? 1 : 0 });
    llueve(gotas, t, t > T.senor ? 1 : 0.25);
    paint(c.querySelector('.phl'), t, 0.2, 0.4); set(t1, { r: -2 + wobble(t, 0.5, 0.8) });
    set(moj, { o: t > T.mojo - 0.2 ? 1 : 0, s: pop(t, T.mojo - 0.2, 0.35), r: -3 });
  };
}, { sfx: false });

/* ACTO 1 (L2 → L5): la gasolinera bajo la lluvia (corte): Moylan para… la manguera no llega → se baja, se empapa → da la vuelta */
plano(L(2) - 0.1, L(5) - 0.1, { background: '#6d8aa0' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#6d8aa0, #9fb8cc)' });
  const techo = box(cam, -200, 300, 1480, 120, { zIndex: 2, background: '#fbf6ea', border: `8px solid ${INK}` }, `<div style="font-family:Rye;font-size:70px;text-align:center;line-height:104px;color:${RED}">GAS</div>`);
  [80, 900].forEach(x => box(cam, x, 420, 60, 1000, { zIndex: 2, background: '#d8d2c4', border: `6px solid ${INK}` }));
  box(cam, -400, 1420, 1880, 1000, { zIndex: 3, background: '#5e5a62', borderTop: `10px solid ${INK}` });
  const sur = SURTIDOR(cam, 4); set(sur, { x: 160, y: 1000 });
  const coche = COCHE_L(cam, '#2b8ad6', 6);
  const mang = box(cam, 0, 0, 10, 10, { zIndex: 7, pointerEvents: 'none' }, `<svg width="1080" height="1920" style="position:absolute;left:0;top:0;overflow:visible"><path class="mg" d="" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`); const mg = mang.querySelector('.mg');
  const jim = PERS(cam, 0, 0, 260, { ropa: '#5e6a7a', pelo: 'corto', pcol: '#6b4a2a', bigote: true, piernas: true, calzas: '#2a2530', z: 9 }); jim.style.zIndex = 9;
  const gotas = LLUVIA(c, 70, 50);
  const nollega = BOCADILLO(cam, 0, 0, '¡no llega!', { size: 50 });
  const chorro = [0, 1, 2, 3].map(() => box(cam, 0, 0, 16, 40, { zIndex: 12, background: 'rgba(120,180,230,.9)', borderRadius: '8px' }));
  const eJ = ETIQUETA(c, 'JIM MOYLAN', 'diseñador de Ford'), ch = chip(c, 380, 450, 'Detroit · 1986', { size: 56, bg: '#2b3550' });
  sp(T.detroit, 'whoosh', 0.4); sp(T.gasolinera, 'click', 0.5); sp(T.equivocado, 'error', 0.6); sp(T.vuelta, 'whoosh', 0.6); sp(T.empapado, 'squish', 0.8);
  return t => {
    const cm = deriva(cam, t, L(2) - 0.1, L(5) - 0.1, [540, 1100, 0.9], [520, 1150, 1.05]);
    llueve(gotas, t, 1); rotuloA(ch, t, T.detroit, T.lloviendo);
    // el coche llega (de la derecha) y para con el depósito al otro lado; tras «dar la vuelta» se va hacia la izquierda
    const kl = p(t, T.gasolinera - 1.2, 1.2, E.outCubic), kv = p(t, T.vuelta, 1.6, E.inCubic);
    const cx = lerp(1300, 380, kl) - kv * 1400; set(coche, { x: cx, y: 1210 });
    const fuera = t > T.equivocado - 0.2 && t < T.vuelta + 0.2;
    jim.style.visibility = fuera ? 'visible' : 'hidden'; set(jim, { x: 760, y: 960, r: Math.sin(t * 10) * (t > T.empapado - 1 ? 3 : 0) });
    pFace(jim, t, { feliz: -0.8, ceja: 20, jaw: t > T.equivocado && t < T.equivocado + 0.8 ? 0.8 : 0, look: [-14, -6], seed: 1 });
    // la manguera: del surtidor por encima del coche… y no llega
    const tens = fuera ? p(t, T.equivocado - 0.2, 0.5) : 0; mg.setAttribute('d', tens > 0 ? `M260,1100 Q${f1(lerp(300, 560, tens))},${f1(lerp(1300, 1060, tens))} ${f1(lerp(300, 840, tens))},${f1(lerp(1300, 1180, tens))}` : 'M260,1100 Q250,1250 280,1300');
    set(nollega, { o: fuera && t > T.equivocado ? 1 : 0, x: 600, y: 760, s: pop(t, T.equivocado, 0.3), r: 4 });
    chorro.forEach((g, i) => { const k = ((t * 2 + i / 4) % 1); set(g, { o: fuera && t > T.vuelta - 0.6 ? 1 - k : 0, x: 590 + i * 60, y: 880 + k * 120 }); });
    etiquetaA(eJ, t, T.moylan, T.lloviendo, cm, 900, 1200, -380);
  };
});

/* ACTO 2 (L5 → L7): la oficina (corte): Moylan con la toalla en la cabeza escribe la nota → boceto del coche con el depósito → la flecha → 7 meses → «SÍ» */
plano(L(5) - 0.1, L(7) - 0.1, { background: '#e9e2cf' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: '#e9e2cf', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 80px, transparent 80px 160px)' });
  const jim = PERS(cam, 60, 900, 300, { ropa: '#5e6a7a', pelo: 'corto', pcol: '#6b4a2a', bigote: true });
  const toalla = box(cam, 90, 880, 240, 90, { zIndex: 10, background: 'repeating-linear-gradient(90deg, #fbf6ea 0 30px, #9fd3c0 30px 60px)', border: `6px solid ${INK}`, borderRadius: '40px 40px 10px 10px' });
  box(cam, -200, 1300, 1480, 200, { zIndex: 11, background: '#8a6a3a', borderTop: `10px solid ${INK}` });
  const memo = box(cam, 400, 430, 620, 820, { zIndex: 8, background: '#fbf6ea', border: `7px solid ${INK}`, boxShadow: '12px 12px 0 rgba(0,0,0,.2)', transformOrigin: '50% 100%' },
    `<div style="font-family:SpecialElite;font-size:34px;margin:30px;color:${INK}">MEMO · 17-4-1986</div>
     <div style="font-family:SpecialElite;font-size:30px;margin:0 30px;line-height:1.35;color:${INK}">Propongo un símbolo junto al indicador de gasolina que diga de qué lado está el depósito.</div>
     <svg class="bo" viewBox="0 0 400 260" width="440" height="286" style="margin:20px 60px 0"><rect x="80" y="40" width="240" height="180" rx="60" fill="none" stroke="${INK}" stroke-width="7"/><rect x="40" y="110" width="40" height="40" fill="${RED}" stroke="${INK}" stroke-width="5"/><path class="fl2" d="M30,190 L-10,210 L30,230 Z" fill="${RED}" opacity="0"/></svg>`);
  const fl2 = memo.querySelector('.fl2');
  const cal = box(cam, 680, 1350, 300, 160, { zIndex: 13, background: '#fbf6ea', border: `6px solid ${INK}`, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '44px', textAlign: 'center', lineHeight: '148px', color: INK }, 'abril');
  const si = texto(cam, 700, 'APROBADO', { size: 110, color: '#2e6b3a', x: 380, w: 660, z: 20, shadow: `5px 5px 0 #fff` });
  sp(T.nota, 'paper', 0.8); sp(T.simbolo, 'click', 0.6); sp(T.siete, 'clockfast', 0.6); sp(T.contestan + 0.6, 'stamp', 1);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(7) - 0.1, [540, 1000, 0.95], [640, 900, 1.12]);
    pFace(jim, t, { feliz: t > T.contestan + 0.6 ? 1 : 0.2, ceja: t > T.contestan ? 14 : -4, look: [14, -4], seed: 1 });
    set(memo, { o: t > T.nota - 0.2 ? 1 : 0, s: p(t, T.nota - 0.2, 0.4, E.outBack), r: 3 });
    fl2.setAttribute('opacity', t > T.lado5 ? 1 : 0);
    const meses = ['abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre']; const km = clamp((t - T.siete) / 1.6);
    cal.textContent = meses[Math.min(7, Math.floor(km * 7.99))]; set(cal, { o: t > T.siete - 0.2 ? 1 : 0, r: km > 0 && km < 1 ? Math.sin(t * 30) * 3 : -4 });
    set(si, { o: t > T.contestan + 0.6 ? 1 : 0, s: t > T.contestan + 0.6 ? lerp(1.8, 1, p(t, T.contestan + 0.6, 0.2)) : 0, r: -10 });
  };
});
shakeAt(T.contestan + 0.65, 0.3, 14);

/* ACTO 3 (L7 → L9): 1989 → todos los coches (corte): una rejilla de indicadores, cada uno con su flecha a un lado; la cámara se aleja despacio */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#1d1a22' }, c => {
  const cam = CAM(c);
  box(cam, -1400, -1600, 3880, 5120, { zIndex: 0, background: '#2a2530', backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 3px, transparent 4px)', backgroundSize: '60px 60px' });
  const grid = []; for (let r = -3; r <= 5; r++) for (let q = -2; q <= 4; q++) { const m = MARCADOR(cam, 300, (r + q) % 2 ? 'der' : 'izq', 3); set(m, { x: q * 330 - 30, y: 420 + r * 230 }); grid.push([m, r, q]); }
  const ano = chip(c, 420, 420, '1989', { size: 72, bg: '#2e6b3a', z: 40 });
  const casi = texto(c, 1150, 'casi todos los coches', { size: 80, color: '#fff', z: 40, shadow: OUT });
  sp(T.ochentaynueve, 'whoosh', 0.5); sp(T.flechita7, 'ding', 0.7); sp(T.hoy, 'swoosh_up', 0.6); sp(T.mojado, 'squish', 0.6);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(9) - 0.1, [450, 520, 1.7], [480, 900, 0.55]);
    grid.forEach(([m, r, q], i) => { const vis = (r === 0 && q === 1) || t > T.hoy - 0.2 + ((i * 37) % 10) * 0.08; m.style.opacity = vis ? 1 : 0;
      m.ag.setAttribute('transform', `rotate(${f1(-70 + ((i * 53) % 120))} 200 200)`); m.fl.setAttribute('fill', Math.sin(t * 6 + i) > 0 ? YEL : '#fbf6ea'); });
    rotuloA(ano, t, T.ochentaynueve, T.hoy); set(casi, { o: t > T.mundo - 0.2 ? 1 : 0, s: pop(t, T.mundo - 0.2, 0.35), r: -3 });
  };
});

/* ACTO 4 · REMATE (L9, corte al presente): coche de alquiler; tú, en vez de asomarte, miras la flecha → paras en el lado bueno ✓ */
plano(L(9) - 0.1, L(10) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -400, -400, 1880, 2720, { zIndex: 0, background: 'linear-gradient(#9fd0ee, #eaf2f6)' });
  box(cam, -400, 1420, 1880, 1000, { zIndex: 3, background: '#6d6a72', borderTop: `10px solid ${INK}` });
  const sur = SURTIDOR(cam, 4); set(sur, { x: 120, y: 1000 });
  const coche = COCHE_L(cam, '#f2c230', 6);
  const tu = PERS(cam, 0, 0, 200, { ropa: '#e8507a', pelo: 'largo', pcol: '#3a2a1e' });
  const m = MARCADOR(cam, 380, 'izq', 20);
  const asoma = texto(cam, 660, '✗ asomarte', { size: 70, color: RED, x: 140, w: 800, z: 21, shadow: `4px 4px 0 #fff` }), bien = texto(cam, 660, '✓ mira la flecha', { size: 70, color: YEL, x: 140, w: 800, z: 21, shadow: OUT });
  const alq = chip(c, 360, 420, 'coche de alquiler', { size: 56, bg: '#2b3550', z: 40 });
  sp(T.alquilado, 'pop', 0.5); sp(T.ventanilla, 'error', 0.4); sp(T.mira, 'ding', 0.8);
  return t => {
    deriva(cam, t, L(9) - 0.1, L(10) - 0.1, [540, 1100, 0.95], [500, 1080, 1.08]);
    rotuloA(alq, t, T.alquilado - 0.2, T.mira);
    const kl = p(t, L(9), T.ventanilla - L(9) + 0.4, E.outCubic); set(coche, { x: lerp(1300, 330, kl), y: 1210 });
    set(tu, { x: lerp(1300, 330, kl) + 300, y: 1000, o: 1 }); pFace(tu, t, { feliz: t > T.mira ? 1 : 0.2, look: t > T.mira ? [0, 10] : [-14, 0], seed: 2 });
    set(m, { o: t > T.mira - 0.3 ? 1 : 0, x: 350, y: 380, s: pop(t, T.mira - 0.3, 0.35) }); m.ag.setAttribute('transform', 'rotate(-60 200 200)'); m.fl.setAttribute('fill', Math.sin(t * 8) > 0 ? YEL : '#fbf6ea');
    set(asoma, { o: t > T.ventanilla && t < T.mira ? 1 : 0, s: pop(t, T.ventanilla, 0.3), r: -3 }); set(bien, { o: t > T.mira ? 1 : 0, s: pop(t, T.mira, 0.3), r: -3 });
  };
});

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tú lo sabías', 'o te enteras ahora?', { size: 88, draw: c => [['lo sabía', YEL], ['me entero ahora', PINK], ['voy a mirar mi coche', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 300 + i * 30, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(103, 'La flechita', ['COCHES', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[T.mira + 0.3, L(10) - 0.15]],
  vecino: { risa: [[T.mira + 0.3, T.mira + 1.4]], sorpresa: [], golpes: [] },
});
