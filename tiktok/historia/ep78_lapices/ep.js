/* Ep. 78 · ¿Por qué los lápices son amarillos? (Borrowdale → China → Koh-i-Noor) — edición estilo ep64/ep67: escenarios llenos, objetos con cara, Vecino fijo */
Story.prepara();
const T = {
  amar0: Q('amarillos'), emp0: Q('un emperador'),
  tormenta1: Q('una tormenta'), mina1: Q('una mina'), soldados: Q('soldados'),
  inglaterra: Q('inglaterra'), s16: Q('siglo dieciséis'), arbol: Q('arranca un árbol'), negro: Q('negro y brillante'), grafito2: Q('grafito'), puro: Q('el más puro'),
  pastores: Q('los pastores'), ovejas: Q('marcar ovejas'), vale: Q('vale tanto'), corona: Q('la corona'), guardias: Q('guardias armados'),
  robar: Q('robar grafito'), carcel: Q('cárcel'), abre: Q('solo se abre'), semanas: Q('unas semanas'), precio: Q('no baje el precio'),
  siglos5: Q('durante siglos'), ingles: Q('es inglés'), hasta: Q('hasta que'), s19: Q('siglo diecinueve'), bueno5: Q('grafito buenísimo'), china5: Q('en china'),
  fabric: Q('los fabricantes'), presumir: Q('presumir'), como: Q('cómo dices'), delbueno: Q('del bueno'), sinesc: Q('sin escribirlo'),
  color8: Q('con un color'), amar8: Q('el amarillo'), china8: Q('en china'), emp8: Q('el color del emperador'), realeza: Q('la realeza'),
  bohemia: Q('en bohemia'), presenta: Q('presenta su lápiz'), expo: Q('exposición de parís'), arrasa: Q('y arrasa'),
  todos: Q('todos los demás'), copian: Q('lo copian'), eeuu: Q('estados unidos'), mayoria: Q('la mayoría'), amar10: Q('amarillos'),
  ojo: Q('ojo'), lujo: Q('solo por lujo'),
  osea: Q('o sea'), mordias: Q('mordías un lápiz'), colorEmp: Q('el color de un emperador'),
};
const AMA = '#f6c616', CREMA = '#FBF6EA', VERDE = '#4c8a3a', GRAF = '#3b3f45', CIELOL = '#bcd3ea';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };

/* ---------- figuras ---------- */
/* lápiz vertical con cara (vb 0 0 160 700): o.col color del cuerpo, o.mordido marcas de dientes, o.corona */
const lapizInner = (o = {}) => `<path d="M20,560 L80,690 L140,560 Z" fill="#e8c79a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M62,650 L80,690 L98,650 Z" fill="${GRAF}" stroke="${INK}" stroke-width="4"/>
  ${cut('<rect x="20" y="130" width="120" height="432"/>', 7, 9)}<rect x="20" y="130" width="120" height="432" fill="${o.col || AMA}" stroke="${INK}" stroke-width="6"/><rect x="20" y="130" width="40" height="432" fill="#fff" opacity=".22"/><rect x="100" y="130" width="40" height="432" fill="#000" opacity=".10"/><path d="M60,130 V562 M100,130 V562" stroke="${INK}" stroke-width="2.5" opacity=".5"/>
  <rect x="16" y="80" width="128" height="56" fill="#b8bec5" stroke="${INK}" stroke-width="6"/><path d="M16,96 H144 M16,120 H144" stroke="${INK}" stroke-width="3"/>
  <path d="M20,84 V30 C20,8 140,8 140,30 V84 Z" fill="#f29ab0" stroke="${INK}" stroke-width="6"/>
  ${o.mordido ? `<path d="M20,150 l10,14 l10,-14 l10,14 l10,-14 l10,14 l10,-14 l10,14 l10,-14 l10,14 l10,-14 l10,14 l10,-14" stroke="${INK}" stroke-width="4" fill="none"/>` : ''}
  ${o.texto ? `<text x="80" y="520" text-anchor="middle" font-family="Rye" font-size="22" fill="${INK}" transform="rotate(-90 80 520)">${o.texto}</text>` : ''}
  <g class="lc"><path d="M34,226 q14,-9 28,0 M98,226 q14,-9 28,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="le"><ellipse cx="50" cy="256" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="110" cy="256" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="lp"><circle cx="52" cy="259" r="7" fill="${INK}"/><circle cx="112" cy="259" r="7" fill="${INK}"/></g><path class="lm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${o.corona ? `<g transform="translate(20,-62)"><path d="M0,70 L10,10 L36,44 L60,0 L84,44 L110,10 L120,70 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="60" cy="50" r="8" fill="${RED}" stroke="${INK}" stroke-width="3"/></g>` : ''}`;
const LAPIZ = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 700 / 160, lapizInner(o), (o.corona ? '0 -70 160 770' : '0 0 160 700'), Object.assign({ z: 9, origin: '50% 50%' }, o));
const lapFace = (f, t, o = {}) => caraF(f, t, o, 256, [80, 300, 18, '.lm', '.lp', '.le', '.lc']);
/* emperador chino: gorro, bigote largo y túnica amarilla con dragón (vb 0 0 300 380) */
const EMPERADOR = (c, x, y, w) => figura(c, x, y, w, w * 380 / 300, `<path d="M30,380 C30,290 80,250 150,250 C220,250 270,290 270,380 Z" fill="${AMA}" stroke="${INK}" stroke-width="7"/><path d="M90,330 q30,-40 60,-10 q30,30 60,-10" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M150,250 V380" stroke="${INK}" stroke-width="5"/>
  <circle cx="150" cy="170" r="92" fill="#f2c9a0" stroke="${INK}" stroke-width="7"/>
  <path d="M50,110 C60,40 240,40 250,110 Z" fill="${INK}"/><path d="M40,112 H260" stroke="${GOLD}" stroke-width="16" stroke-linecap="round"/><circle cx="150" cy="40" r="20" fill="${RED}" stroke="${INK}" stroke-width="5"/><path d="M150,18 V0" stroke="${INK}" stroke-width="6"/>
  <path d="M128,212 C100,214 80,240 70,290 M172,212 C200,214 220,240 230,290" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g class="ec"><path d="M98,144 q16,-6 32,4 M170,148 q16,-10 32,-4" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g><g class="ee"><ellipse cx="116" cy="170" rx="13" ry="12" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="184" cy="170" rx="13" ry="12" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="ep"><circle cx="117" cy="172" r="6" fill="${INK}"/><circle cx="185" cy="172" r="6" fill="${INK}"/></g><path class="em" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`, '0 0 300 380', { z: 8, origin: '50% 100%' });
const empFace = (f, t, o = {}) => caraF(f, t, o, 170, [150, 228, 18, '.em', '.ep', '.ee', '.ec']);
const OVEJA = (c, x, y, w, marca) => figura(c, x, y, w, w * 0.75, `<path d="M50,110 C20,110 20,60 50,56 C50,20 100,14 116,40 C140,10 190,20 186,56 C220,56 222,110 190,112 C190,140 60,140 50,110 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="44" cy="80" rx="30" ry="24" fill="${INK}"/><circle cx="36" cy="74" r="5" fill="#fff"/><path d="M80,130 V160 M160,130 V160" stroke="${INK}" stroke-width="10"/>${marca ? `<path class="mk" d="M110,60 L150,100 M150,60 L110,100" stroke="${GRAF}" stroke-width="12" stroke-linecap="round"/>` : ''}`, '0 0 240 180', { z: 8, origin: '50% 100%' });
const NUBE = (c, x, y, w, z = 3, col = '#fff') => box(c, x, y, w, w * 0.36, { zIndex: z, background: col, border: `6px solid ${INK}`, borderRadius: '999px' });
const colinas = (c, z = 2) => box(c, 0, 1000, 1080, 920, { zIndex: z }, `<svg viewBox="0 0 1080 920" width="1080" height="920"><path d="M0,200 C200,40 400,60 560,180 C720,60 900,40 1080,170 V920 H0 Z" fill="#7a9a52" stroke="${INK}" stroke-width="8"/><path d="M0,360 C260,240 520,300 1080,330 V920 H0 Z" fill="#6a8a46" stroke="${INK}" stroke-width="6"/></svg>`);
const MINA = (c, x, y, w) => box(c, x, y, w, w * 0.8, { zIndex: 5 }, `<svg viewBox="0 0 400 320" width="${w}" height="${w * 0.8}"><path d="M0,320 C20,80 380,80 400,320 Z" fill="#8a7a62" stroke="${INK}" stroke-width="8"/><path d="M110,320 V170 C110,120 290,120 290,170 V320 Z" fill="#1d1a17" stroke="${INK}" stroke-width="7"/><path d="M96,320 V160 M304,320 V160 M86,160 H314" stroke="#8a5a32" stroke-width="22"/><path d="M96,320 V160 M304,320 V160 M86,160 H314" stroke="${INK}" stroke-width="4" fill="none"/></svg>`);
const LANZA = (c, x, y) => box(c, x, y, 40, 520, { zIndex: 10 }, `<svg viewBox="0 0 40 520" width="40" height="520"><path d="M20,40 V520" stroke="#8a5a32" stroke-width="12"/><path d="M20,0 L36,50 L4,50 Z" fill="#b8bec5" stroke="${INK}" stroke-width="5"/></svg>`);
const ROCA = (c, x, y, w) => box(c, x, y, w, w * 0.6, { zIndex: 6 }, `<svg viewBox="0 0 300 180" width="${w}" height="${w * 0.6}"><path d="M20,170 L40,70 L110,20 L200,30 L270,80 L285,170 Z" fill="${GRAF}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M110,20 L130,90 L40,70 M130,90 L200,30 M130,90 L270,80" stroke="#6b7078" stroke-width="5" fill="none"/><path d="M70,80 L100,60" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/></svg>`);
const brillos = (c, n, cx, cy, rx, ry) => [...Array(n)].map(() => ESTRELLA(c, 52, '#fff6c8'));
const orbita = (bs, t, cx, cy, rx, ry, on) => bs.forEach((b, i) => { const a = t * 1.6 + i * (6.28 / bs.length); set(b, { x: cx + Math.cos(a) * rx - 26, y: cy + Math.sin(a) * ry - 26, o: on ? 1 : 0, s: 0.6 + 0.4 * Math.sin(t * 8 + i) }); });

/* L0 · PORTADA (fotograma 0 completo): el lápiz amarillo con cara habla; a su lado lápices grises; en «emperador» le cae la corona */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 230, '¿Por qué los lápices', { size: 84 });
  const t2 = texto(c, 330, 'son ' + hlSpan('AMARILLOS?', 'phl'), { size: 118, italic: true });
  const grises = [[80, 760, '#8f9aa6'], [260, 820, '#c8102e'], [740, 820, '#2b4a8c'], [900, 760, '#4c8a3a']].map(([x, y, col], i) => LAPIZ(c, x, y, 110, { col }));
  const lp = LAPIZ(c, 430, 560, 220, { corona: true });
  const cor = lp.querySelector('g[transform="translate(20,-62)"]');
  const sello0 = stamp(c, 300, 1250, '¡POR UN EMPERADOR!', { size: 64, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.emp0, 'ding', 0.8); sp(T.emp0 + 0.3, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const hop = Math.abs(Math.sin(t * 4.5)); set(lp, { y: -hop * 24, r: Math.sin(t * 2.4) * 4 }); lapFace(lp, t, { jaw: talkW(t, 'VECINO'), feliz: 1, look: [Math.sin(t * 2) * 4, -2], ceja: t > T.emp0 ? 10 : 0 });
    cor.setAttribute('opacity', 1); cor.style.transform = `translateY(${f1(t < T.emp0 ? 0 : 0)}px)`;
    grises.forEach((g, i) => { set(g, { y: -Math.abs(Math.sin(t * 4 + i * 1.4)) * 16, r: (i < 2 ? 1 : -1) * (8 + Math.sin(t * 3 + i) * 3) }); lapFace(g, t, { feliz: -0.5, look: [i < 2 ? 8 : -8, -4], ceja: 8, seed: i }); });
    stampA(sello0, t, T.emp0 + 0.3, -6);
  };
}, { sfx: false });
shakeAt(T.emp0 + 0.3, 0.3, 12);

/* L1 · empieza con una tormenta… y una mina vigilada por soldados */
headline(L(1) - 0.1, L(2) - 0.1, 'Una tormenta… y *una mina*', Object.assign({ size: 84, hlT: T.mina1 }, BL));
plano(L(1) - 0.1, L(2) - 0.1, { background: '#3a4566' }, c => {
  const cam = CAM(c);
  const nubes = [[40, 420, 420], [520, 380, 480], [260, 520, 380]].map(([x, y, w]) => NUBE(cam, x, y, w, 4, '#5a5f6b'));
  const rayo = box(cam, 470, 560, 200, 420, { zIndex: 3 }, `<svg viewBox="0 0 200 420" width="200" height="420"><path d="M120,0 L40,200 L110,200 L60,420 L180,160 L110,160 L160,0 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/></svg>`);
  colinas(cam);
  const mina = MINA(cam, 300, 960, 480);
  const sol = [0, 1].map(i => mkBust(cam, [i ? 760 : 40, 900, 300, 384], { hat: 'brodie', moustache: true, seed: 140 + i }));
  const lan = [0, 1].map(i => LANZA(cam, i ? 1010 : 30, 820));
  const flash = box(cam, 0, 0, 1080, 1920, { zIndex: 20, background: '#fff' });
  const lluvia = [...Array(14)].map((_, i) => box(cam, 0, 0, 6, 60, { zIndex: 7, background: 'rgba(200,220,255,.8)', transform: 'rotate(15deg)' }));
  sp(T.tormenta1, 'thud', 0.8); sp(T.tormenta1 + 0.1, 'glitch', 0.6); sp(T.mina1, 'whoosh', 0.6); sp(T.soldados, 'stamp', 0.8);
  return t => {
    zoom(cam, t, L(1), 4, 0.07);
    const fl = t > T.tormenta1 && (Math.sin(t * 7) > 0.85); set(rayo, { o: t > T.tormenta1 && Math.sin(t * 7) > 0.3 ? 1 : 0, x: Math.sin(Math.floor(t * 7 / 6.28) * 3) * 250 }); set(flash, { o: fl ? 0.35 : 0 });
    nubes.forEach((n, i) => set(n, { x: Math.sin(t * 0.8 + i) * 40 }));
    lluvia.forEach((l, i) => { const k = ((t * 1.6) + i / 14) % 1; set(l, { x: (i * 83) % 1080, y: 400 + k * 1200 }); });
    set(mina, { o: t > T.mina1 - 0.2 ? 1 : 0, s: pop(t, T.mina1 - 0.2, 0.4) });
    sol.forEach((b, i) => { set(b.d, { o: t > T.soldados - 0.1 + i * 0.15 ? 1 : 0, y: (1 - p(t, T.soldados - 0.1 + i * 0.15, 0.4, E.outBack)) * 300 }); face(b, t, { look: [i ? -8 : 8, 0], bL: 0, bR: 0, seed: i }); });
    lan.forEach((l, i) => set(l, { o: t > T.soldados + i * 0.15 ? 1 : 0, r: (i ? -1 : 1) * 4 }));
  };
});
shakeAt(T.tormenta1 + 0.1, 0.3, 12);

/* L2 · Inglaterra, s. XVI: la tormenta arranca un árbol → algo negro y brillante → ¡GRAFITO! el más puro */
headline(L(2) - 0.1, L(3) - 0.1, 'Inglaterra, *siglo XVI*', { size: 90, hlT: T.s16 });
plano(L(2) - 0.1, T.grafito2 - 0.15, { background: CIELOL }, c => {
  const cam = CAM(c);
  const ns = [[60, 420, 300], [640, 470, 280]].map(([x, y, w]) => NUBE(cam, x, y, w, 3, '#d8dce2'));
  colinas(cam);
  const ovs = [[120, 1220], [760, 1260]].map(([x, y]) => OVEJA(cam, x, y, 200));
  const roca = ROCA(cam, 380, 1040, 320);
  const arbol = box(cam, 380, 560, 340, 540, { zIndex: 7, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 340 540" width="340" height="540"><path d="M150,540 V300 M190,540 V300" stroke="${INK}" stroke-width="8"/><rect x="150" y="300" width="40" height="240" fill="#8a5a32"/><circle cx="170" cy="190" r="150" fill="#5a8a3a" stroke="${INK}" stroke-width="8"/><circle cx="110" cy="150" r="40" fill="#7ab35a"/><path d="M130,540 q-20,30 -60,30 M210,540 q20,30 60,30 M170,540 v40" stroke="#6b4a2a" stroke-width="12" fill="none" stroke-linecap="round"/></svg>`);
  const bs = brillos(cam, 5);
  sp(T.arbol, 'whoosh', 0.9); sp(T.arbol + 0.5, 'thud', 1); sp(T.negro, 'sparkle', 0.9);
  return t => {
    zoom(cam, t, L(2), 4, 0.07);
    ns.forEach((n, i) => set(n, { x: Math.sin(t * 2 + i) * 60 }));
    const ka = p(t, T.arbol, 0.6, E.inCubic); set(arbol, { r: ka * 88, x: ka * 140 + (t < T.arbol ? Math.sin(t * 30) * 4 : 0) });
    ovs.forEach((o, i) => set(o, { y: -Math.abs(Math.sin(t * 5 + i)) * 14, sx: t > T.arbol + 0.5 ? -1 : 1 }));
    set(roca, { s: 1 + 0.03 * Math.sin(t * 6) }); orbita(bs, t, 540, 1130, 220, 90, t > T.negro);
  };
});
plano(T.grafito2 - 0.15, L(3) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,255,255,.4)', 'rgba(0,0,0,0)', 0);
  const roca = ROCA(cam, 240, 660, 600);
  const bs = brillos(cam, 6);
  const nom = texto(cam, 380, 'GRAFITO', { size: 140, color: GRAF, z: 12, shadow: `5px 5px 0 #fff` });
  const pur = stamp(cam, 330, 1110, '100 % PURO', { size: 76, col: VERDE, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.grafito2, 'tada', 0.7); sp(T.puro + 0.3, 'stamp', 1);
  return t => { set(ry, { r: t * 10 }); zoom(cam, t, T.grafito2, 2, 0.08); set(roca, { s: pop(t, T.grafito2 - 0.15, 0.4), r: Math.sin(t * 2) * 2 }); orbita(bs, t, 540, 840, 340, 220, true); set(nom, { s: pop(t, T.grafito2, 0.4), r: -3 }); stampA(pur, t, T.puro + 0.3, -6); };
});
shakeAt(T.arbol + 0.5, 0.3, 14); shakeAt(T.puro + 0.3, 0.3, 10);

/* L3 · los pastores marcan ovejas con él → vale tanto que la Corona pone guardias armados en la mina */
headline(L(3) - 0.1, T.vale - 0.1, 'Para *marcar ovejas*', { size: 92, hlT: T.ovejas });
headline(T.vale - 0.1, L(4) - 0.1, 'Vale *una fortuna*', { size: 92, hlT: T.corona });
plano(L(3) - 0.1, T.vale - 0.1, { background: CIELOL }, c => {
  const cam = CAM(c);
  colinas(cam);
  const past = mkBust(cam, [60, 520, 380, 486], { hat: 'slouch', beard: true, seed: 150 });
  const tiza = box(cam, 420, 740, 40, 140, { zIndex: 12, background: GRAF, border: `5px solid ${INK}`, borderRadius: '10px', transformOrigin: '50% 100%' });
  const ovs = [[480, 1000], [700, 1130], [480, 1240]].map(([x, y]) => OVEJA(cam, x, y, 260, true));
  sp(T.pastores, 'pop', 0.6); sp(T.ovejas, 'scratch', 0.7); sp(T.ovejas + 0.4, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(3), 3, 0.06); set(past.d, { s: pop(t, T.pastores - 0.1, 0.4) }); face(past, t, { look: [10, 4], jaw: 0.2, seed: 0.4 });
    set(tiza, { r: Math.sin(t * 14) * 25 * (t > T.ovejas - 0.2 ? 1 : 0) });
    ovs.forEach((o, i) => { set(o, { o: t > T.pastores + i * 0.2 ? 1 : 0, y: -Math.abs(Math.sin(t * 5 + i)) * 12 }); o.querySelector('.mk').setAttribute('opacity', t > T.ovejas + i * 0.2 ? 1 : 0); });
  };
});
plano(T.vale - 0.1, L(4) - 0.1, { background: '#3a4566' }, c => {
  const cam = CAM(c);
  colinas(cam);
  const mina = MINA(cam, 300, 900, 480);
  const sol = [0, 1, 2].map(i => mkBust(cam, [[20, 860], [770, 860], [400, 1180]][i].concat([290, 371]), { hat: 'brodie', moustache: true, seed: 160 + i }));
  const lan = [[10, 780], [1030, 780]].map(([x, y]) => LANZA(cam, x, y));
  const cor = box(cam, 320, 420, 440, 314, { zIndex: 14 }, `<svg viewBox="0 0 140 100" width="440" height="314"><path d="M0,100 L10,20 L40,60 L70,0 L100,60 L130,20 L140,100 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="70" cy="70" r="10" fill="${RED}" stroke="${INK}" stroke-width="3"/></svg>`);
  const dol = [0, 1, 2, 3].map(() => texto(cam, 0, '£', { size: 90, color: GOLD, x: 0, w: 90, z: 15, shadow: `4px 4px 0 ${INK}` }));
  sp(T.vale, 'cash', 0.8); sp(T.corona, 'tada', 0.7); sp(T.guardias, 'stamp', 0.8); sp(T.guardias + 0.3, 'thud', 0.6);
  return t => {
    zoom(cam, t, T.vale, 3, 0.07);
    set(cor, { o: t > T.corona - 0.1 ? 1 : 0, y: (1 - p(t, T.corona - 0.1, 0.45, E.outBack)) * -500, r: Math.sin(t * 3) * 5 });
    dol.forEach((d, i) => { const k = ((t - T.vale) * 0.9 + i * 0.25) % 1; set(d, { o: t > T.vale && t < T.corona ? 1 - k : 0, x: 300 + i * 150, y: 800 - k * 300 }); });
    sol.forEach((b, i) => { set(b.d, { o: t > T.guardias - 0.1 + i * 0.12 ? 1 : 0, y: (1 - p(t, T.guardias - 0.1 + i * 0.12, 0.35, E.outBack)) * 300 }); face(b, t, { look: [Math.sin(t * 2 + i) * 10, 0], bL: 0, bR: 0, seed: i }); });
    lan.forEach((l, i) => set(l, { o: t > T.guardias ? 1 : 0 }));
  };
});
shakeAt(T.guardias + 0.3, 0.3, 12);

/* L4 · robar grafito = cárcel (barrotes que caen) → la mina solo se abre unas semanas al año (calendario) para que no baje el precio (gráfica) */
headline(L(4) - 0.1, T.abre - 0.1, 'Robarlo: *cárcel*', { size: 96, hlT: T.carcel });
headline(T.abre - 0.1, L(5) - 0.1, 'Abierta *unas semanas*', { size: 90, hlT: T.semanas });
plano(L(4) - 0.1, T.abre - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const lad = mkBust(cam, [330, 620, 420, 537], { hat: 'cap', moustache: true, seed: 171 });
  const saco = box(cam, 700, 900, 200, 220, { zIndex: 12 }, `<svg viewBox="0 0 200 220" width="200" height="220"><path d="M60,40 C40,20 160,20 140,40 L180,200 C180,220 20,220 20,200 Z" fill="#c9a86a" stroke="${INK}" stroke-width="7"/><path d="M70,40 H130" stroke="${INK}" stroke-width="8"/><circle cx="100" cy="140" r="34" fill="${GRAF}" stroke="${INK}" stroke-width="5"/></svg>`);
  const barras = box(cam, 290, 560, 500, 640, { zIndex: 13 }, `<svg viewBox="0 0 500 640" width="500" height="640"><rect x="0" y="0" width="500" height="40" fill="#5a5f6b" stroke="${INK}" stroke-width="6"/><rect x="0" y="600" width="500" height="40" fill="#5a5f6b" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${30 + i * 82}" y="40" width="26" height="560" fill="#7d8790" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  sp(T.robar, 'whoosh', 0.6); sp(T.carcel, 'thud', 1.1); sp(T.carcel + 0.1, 'stamp', 0.7);
  return t => {
    zoom(cam, t, L(4), 2, 0.06);
    set(lad.d, { x: t < T.carcel ? Math.sin(t * 8) * 30 : 0 }); face(lad, t, { look: t < T.carcel ? [10, 0] : [0, 0], bL: t > T.carcel ? 16 : 4, bR: t > T.carcel ? 16 : 4, jaw: t > T.carcel ? 0.6 : 0, seed: 0.3 });
    set(saco, { x: t < T.carcel ? Math.sin(t * 8) * 30 : 0, r: Math.sin(t * 8) * 8 });
    set(barras, { o: t > T.carcel - 0.2 ? 1 : 0, y: (1 - p(t, T.carcel - 0.2, 0.25, E.inCubic)) * -900 });
  };
});
plano(T.abre - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const cal = box(cam, 70, 470, 560, 560, { zIndex: 6, background: CREMA, border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, borderRadius: '14px' });
  box(cal, 0, 0, 544, 90, { background: RED, borderBottom: `6px solid ${INK}` });
  el('div', cal, { left: 0, top: '14px', width: '544px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: '#fff' }, 'AÑO 1700');
  const cel = [...Array(48)].map((_, i) => box(cal, 22 + (i % 8) * 64, 110 + Math.floor(i / 8) * 70, 54, 58, { background: '#e9dcc2', border: `3px solid ${INK}`, borderRadius: '6px' }));
  const graf = box(cam, 640, 560, 380, 420, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}` }, `<svg viewBox="0 0 364 404" width="364" height="404"><path d="M30,370 H340 M30,370 V30" stroke="${INK}" stroke-width="6"/><path class="lin" d="M40,330 L110,300 L170,250 L230,170 L300,70" stroke="${VERDE}" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="420"/><text x="250" y="330" font-family="Rye" font-size="70" fill="${VERDE}">£</text></svg>`);
  const cerr = stamp(cam, 110, 1080, 'CERRADO', { size: 76, z: 30 });
  sp(T.abre, 'click', 0.7); sp(T.semanas, 'ding', 0.8); sp(T.precio, 'cash', 0.9); sp(T.precio + 0.3, 'swoosh_up', 0.6);
  return t => {
    zoom(cam, t, T.abre, 3, 0.06); set(cal, { s: pop(t, T.abre - 0.1, 0.4), r: -2 });
    cel.forEach((e, i) => { const op = i >= 20 && i < 26; e.style.background = t > T.semanas ? (op ? '#7ef0a0' : '#c9b9a0') : '#e9dcc2'; });
    stampA(cerr, t, T.semanas + 0.4, -10);
    set(graf, { o: t > T.precio - 0.2 ? 1 : 0, s: pop(t, T.precio - 0.2, 0.35), r: 3 }); graf.querySelector('.lin').setAttribute('stroke-dashoffset', f1(420 * (1 - p(t, T.precio, 0.8, E.outCubic))));
  };
});
shakeAt(T.carcel, 0.35, 16);

/* L5 · durante siglos, el mejor lápiz es inglés (trofeo) → a finales del s. XIX aparece otro grafito buenísimo… en China (farolillos + pin en el mapa) */
headline(L(5) - 0.1, T.hasta - 0.1, 'El campeón: *inglés*', { size: 90, hlT: T.ingles });
headline(T.hasta - 0.1, L(6) - 0.1, 'Un rival… *en China*', Object.assign({ size: 92, hlT: T.china5 }, BL));
plano(L(5) - 0.1, T.hasta - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  const pod = box(cam, 290, 1120, 500, 200, { zIndex: 5, background: GOLD, border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '110px', textAlign: 'center', lineHeight: '190px', color: INK }, '1');
  const lp = LAPIZ(cam, 440, 520, 190, { col: '#c8102e', corona: true });
  const band = box(cam, 300, 760, 480, 90, { zIndex: 12, background: '#2b4a8c', border: `6px solid ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', lineHeight: '78px', color: '#fff', transform: 'rotate(-6deg)' }, 'HECHO EN INGLATERRA');
  sp(T.siglos5, 'tada', 0.7); sp(T.ingles, 'stamp', 0.8);
  return t => { set(ry, { r: t * 8 }); set(lp, { y: -Math.abs(Math.sin(t * 3)) * 16 }); lapFace(lp, t, { feliz: 1, ceja: 8, look: [0, -4], jaw: 0.3 }); set(band, { o: t > T.ingles - 0.1 ? 1 : 0, s: pop(t, T.ingles - 0.1, 0.35) }); };
});
plano(T.hasta - 0.1, L(6) - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 6px, transparent 6px 70px)' }, c => {
  const cam = CAM(c);
  const fs = [[50, 300, 150], [880, 280, 160], [720, 360, 110], [250, 360, 100]].map(([x, y, w]) => LINTERNA(cam, x, y, w));
  const mapa = box(cam, 90, 560, 900, 560, { zIndex: 5, background: '#d8c3a0', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, borderRadius: '16px' }, `<svg viewBox="0 0 900 560" width="900" height="560"><path d="M60,120 C200,60 420,80 560,140 C700,180 820,160 860,260 C880,360 760,460 620,470 C480,480 420,400 300,420 C180,440 80,380 60,280 Z" fill="#e9b86a" stroke="${INK}" stroke-width="6"/><text x="380" y="300" font-family="Rye" font-size="70" fill="${INK}">CHINA</text></svg>`);
  const pin = box(cam, 600, 600, 100, 140, { zIndex: 10 }, `<svg viewBox="0 0 100 140" width="100" height="140"><path d="M50,140 C20,90 6,70 6,46 A44,44 0 0 1 94,46 C94,70 80,90 50,140 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="46" r="16" fill="#fff" stroke="${INK}" stroke-width="4"/></svg>`);
  const roca = ROCA(cam, 380, 1000, 300); const bs = brillos(cam, 5);
  sp(T.hasta, 'drumroll', 0.5); sp(T.bueno5, 'sparkle', 0.8); sp(T.china5, 'pop2', 0.8); sp(T.china5 + 0.2, 'stamp', 0.6);
  return t => {
    zoom(cam, t, T.hasta, 3, 0.07); fs.forEach((f, i) => set(f, { r: Math.sin(t * 2 + i * 1.7) * 7 }));
    set(mapa, { s: pop(t, T.hasta - 0.1, 0.4), r: -1 });
    set(roca, { o: t > T.bueno5 - 0.1 ? 1 : 0, s: pop(t, T.bueno5 - 0.1, 0.4) }); orbita(bs, t, 530, 1090, 220, 80, t > T.bueno5);
    set(pin, { o: t > T.china5 ? 1 : 0, y: (1 - p(t, T.china5, 0.35, E.outBack)) * -400 });
  };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · los fabricantes quieren presumir: ¿cómo dices «grafito chino del bueno»… sin escribirlo? (etiqueta larguísima tachada) */
headline(L(7) - 0.1, L(8) - 0.1, '¿Cómo *presumir*?', { size: 96, hlT: T.presumir });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const fab = mkBust(cam, [60, 640, 420, 537], { moustache: true, beard: true, seed: 181 });
  const chis = box(cam, -999, 560, 300, 160, { zIndex: 9, display: 'none' }, `<svg viewBox="0 0 300 160" width="300" height="160"><rect x="70" y="0" width="160" height="130" fill="${INK}"/><rect x="20" y="120" width="260" height="28" rx="10" fill="${INK}"/></svg>`);
  const lp = LAPIZ(cam, 640, 470, 160, { col: '#e9dcc2' });
  const eti = box(cam, 470, 1100, 560, 150, { zIndex: 12, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '30px', padding: '12px', boxSizing: 'border-box', color: INK, lineHeight: 1.2 }, 'ESTE LÁPIZ LLEVA GRAFITO CHINO DEL BUENO, DE VERDAD, PALABRA, NO COMO LOS OTROS…');
  const x = box(cam, 560, 1060, 360, 240, { zIndex: 14 }, XSVG);
  const pens = box(cam, 300, 470, 120, 120, { zIndex: 12, fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', color: RED, textAlign: 'center' }, '?');
  sp(T.fabric, 'pop', 0.6); sp(T.como, 'typing', 0.8); sp(T.sinesc, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(7), 4, 0.06);
    face(fab, t, { look: [10, -4], jaw: t > T.presumir && t < T.presumir + 0.6 ? 0.5 : 0, bL: t > T.como ? 12 : 4, bR: t > T.como ? 4 : 12, seed: 0.6 });
    set(lp, { s: pop(t, T.presumir - 0.1, 0.4), r: Math.sin(t * 3) * 5 }); lapFace(lp, t, { feliz: t > T.sinesc ? -1 : 0.5, ceja: t > T.como ? 12 : 0, look: [-6, 4] });
    const n = Math.round(clamp(p(t, T.como, T.sinesc - T.como, E.linear)) * 80); set(eti, { o: t > T.como ? 1 : 0 }); eti.firstChild && (eti.style.clipPath = `inset(0 ${f1(100 - Math.min(100, n * 1.3))}% 0 0)`);
    set(x, { o: t > T.sinesc ? 1 : 0, s: pop(t, T.sinesc, 0.3) });
    set(pens, { o: t > T.como ? 1 : 0, y: Math.sin(t * 4) * 10, r: Math.sin(t * 3) * 10 });
  };
});
shakeAt(T.sinesc, 0.3, 12);

/* L8 · con un color: ¡el AMARILLO! (cubo de pintura que baña el lápiz) → en China, el color del emperador, de la realeza (trono) */
headline(L(8) - 0.1, L(9) - 0.1, 'El color *del emperador*', { size: 88, hlT: T.emp8 });
plano(L(8) - 0.1, T.china8 - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  const lp = LAPIZ(cam, 460, 620, 170, { col: '#e9dcc2' }); const lpA = LAPIZ(cam, 460, 620, 170, {}); lpA.style.zIndex = 10;
  const cubo = box(cam, 560, 360, 300, 300, { zIndex: 14, transformOrigin: '30% 80%' }, `<svg viewBox="0 0 300 300" width="300" height="300"><path d="M40,60 L260,60 L230,280 L70,280 Z" fill="#b8bec5" stroke="${INK}" stroke-width="8"/><ellipse cx="150" cy="60" rx="110" ry="24" fill="${AMA}" stroke="${INK}" stroke-width="6"/><path d="M60,60 C60,-20 240,-20 240,60" stroke="${INK}" stroke-width="7" fill="none"/></svg>`);
  const chorro = box(cam, 540, 600, 60, 10, { zIndex: 13, background: AMA, border: `6px solid ${INK}`, borderRadius: '30px' });
  const salp = [0, 1, 2, 3, 4, 5].map(() => box(cam, 0, 0, 40, 40, { zIndex: 12, borderRadius: '50%', background: AMA, border: `5px solid ${INK}` }));
  sp(T.color8, 'whoosh', 0.7); sp(T.amar8, 'gulp', 1); sp(T.amar8 + 0.2, 'tada', 0.7);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(8), 2, 0.08);
    const kc = p(t, T.color8 + 0.2, 0.4, E.outCubic); set(cubo, { r: -110 * kc });
    const kp = p(t, T.amar8 - 0.1, 0.5, E.outCubic); chorro.style.height = px(10 + 280 * kc * (1 - p(t, T.amar8 + 0.6, 0.3))); set(chorro, { o: kc > 0.1 && t < T.amar8 + 0.9 ? 1 : 0 });
    lpA.style.clipPath = `inset(0 0 ${f1(100 - kp * 100)}% 0)`;
    [lp, lpA].forEach(f => { set(f, { y: -Math.abs(Math.sin(t * 4)) * 14 }); lapFace(f, t, { feliz: t > T.amar8 ? 1 : 0, closed: t > T.amar8 - 0.2 && t < T.amar8 + 0.4, ceja: t > T.amar8 + 0.4 ? 12 : 0, jaw: t > T.amar8 + 0.4 ? 0.6 : 0 }); });
    salp.forEach((s, i) => { const a = i * 1.05, k = p(t, T.amar8, 0.7, E.outCubic); set(s, { o: t > T.amar8 && k < 0.98 ? 1 : 0, x: 545 + Math.cos(a) * 300 * k, y: 1000 + Math.sin(a) * 200 * k - 100 * k }); });
  };
});
plano(T.china8 - 0.1, L(9) - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 8px, transparent 8px 90px)' }, c => {
  const cam = CAM(c);
  const fs = [[40, 300, 140], [900, 300, 140]].map(([x, y, w]) => LINTERNA(cam, x, y, w));
  const trono = box(cam, 200, 560, 680, 780, { zIndex: 4 }, `<svg viewBox="0 0 680 780" width="680" height="780"><path d="M60,780 V200 C60,60 620,60 620,200 V780 Z" fill="${AMA}" stroke="${INK}" stroke-width="10"/><path d="M120,780 V240 C120,140 560,140 560,240 V780" fill="none" stroke="${RED}" stroke-width="16"/><path d="M200,120 q60,-60 140,0 q80,-60 140,0" stroke="${RED}" stroke-width="14" fill="none"/></svg>`);
  const em = EMPERADOR(cam, 300, 690, 480);
  const lp = LAPIZ(cam, 760, 820, 110, {}); lp.style.zIndex = 12;
  const real = stamp(cam, 260, 1240, 'REALEZA', { size: 96, col: GOLD, z: 30, bg: 'rgba(43,33,24,.85)', blend: 'normal' });
  sp(T.china8, 'pop2', 0.7); sp(T.emp8, 'tada', 0.8); sp(T.realeza, 'stamp', 1);
  return t => {
    zoom(cam, t, T.china8, 3, 0.07); fs.forEach((f, i) => set(f, { r: Math.sin(t * 2 + i) * 7 }));
    set(em, { s: pop(t, T.china8 - 0.1, 0.45) }); empFace(em, t, { feliz: t > T.emp8 ? 1 : 0, jaw: t > T.emp8 && t < T.realeza + 0.6 ? 0.4 : 0, look: [10, 4], ceja: t > T.emp8 ? 6 : 0 });
    set(lp, { o: t > T.emp8 ? 1 : 0, r: -20 + Math.sin(t * 4) * 8, s: pop(t, T.emp8, 0.35) }); lapFace(lp, t, { feliz: 1, look: [-8, -4], ceja: 10 });
    stampA(real, t, T.realeza, -6);
  };
});

/* L9 · en Bohemia, Koh-i-Noor presenta su lápiz amarillo de lujo en la Exposición de París (torre Eiffel, foco, pedestal)… ¡Y ARRASA! */
headline(L(9) - 0.1, L(10) - 0.1, 'París, *1889*', Object.assign({ size: 96, hlT: T.expo }, BL));
plano(L(9) - 0.1, L(10) - 0.1, { background: '#2b3550' }, c => {
  const cam = CAM(c);
  const torre = box(cam, 700, 420, 320, 860, { zIndex: 2 }, `<svg viewBox="0 0 320 860" width="320" height="860"><path d="M160,0 L190,300 L300,860 H220 C200,720 120,720 100,860 H20 L130,300 Z" fill="#8a6a4a" stroke="${INK}" stroke-width="8"/><path d="M110,420 H210 M70,640 H250" stroke="${INK}" stroke-width="12"/></svg>`);
  const foco = [0, 1].map(i => box(cam, i ? 640 : 120, 400, 160, 1000, { zIndex: 3, background: 'linear-gradient(180deg, rgba(255,250,200,.6), rgba(255,250,200,0))', transformOrigin: '50% 0%', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' }));
  const ped = box(cam, 340, 1080, 400, 260, { zIndex: 6, background: '#efe6d2', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', lineHeight: '110px', color: INK }, 'KOH-I-NOOR');
  const lp = LAPIZ(cam, 450, 400, 180, { corona: true, texto: 'KOH-I-NOOR' });
  const pub = [0, 1, 2].map(i => mkBust(cam, [[20, 1140], [760, 1180], [560, 1300]][i].concat([240, 307]), { hat: ['brodie', 'slouch', 'cap'][i], moustache: true, seed: 190 + i }));
  const medal = box(cam, 720, 760, 180, 220, { zIndex: 14 }, `<svg viewBox="0 0 180 220" width="180" height="220"><path d="M50,0 L90,90 L130,0" stroke="${RED}" stroke-width="30" fill="none"/><circle cx="90" cy="140" r="70" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><text x="90" y="160" text-anchor="middle" font-family="Rye" font-size="60" fill="${INK}">1</text></svg>`);
  const ar = stamp(cam, 240, 900, '¡ARRASA!', { size: 110, col: GOLD, z: 30, bg: 'rgba(43,33,24,.85)', blend: 'normal' });
  sp(T.bohemia, 'whoosh', 0.6); sp(T.presenta, 'sparkle', 0.8); sp(T.expo, 'tada', 0.7); sp(T.arrasa, 'stamp', 1); sp(T.arrasa + 0.2, 'cash', 0.7);
  return t => {
    zoom(cam, t, L(9), 5, 0.07);
    foco.forEach((f, i) => set(f, { r: (i ? -1 : 1) * (14 + Math.sin(t * 1.5 + i) * 10) }));
    set(lp, { o: t > T.presenta - 0.1 ? 1 : 0, y: (1 - p(t, T.presenta - 0.1, 0.5, E.outBack)) * 600 - Math.abs(Math.sin(t * 3)) * 14 }); lapFace(lp, t, { feliz: 1, ceja: 10, jaw: 0.3, look: [0, 4] });
    pub.forEach((b, i) => { set(b.d, { o: t > T.expo + i * 0.15 ? 1 : 0, y: -Math.abs(Math.sin(t * 7 + i)) * (t > T.arrasa ? 26 : 6) }); face(b, t, { look: [i ? -6 : 8, -8], bL: 14, bR: 14, jaw: t > T.arrasa ? 0.7 : 0.2, seed: i }); });
    set(medal, { o: t > T.arrasa + 0.2 ? 1 : 0, s: pop(t, T.arrasa + 0.2, 0.35), r: Math.sin(t * 5) * 8 });
    stampA(ar, t, T.arrasa, -8);
  };
});
shakeAt(T.arrasa, 0.35, 16);

/* L10 · todos lo copian (fila de lápices que se vuelven amarillos uno a uno) → hoy, en EE. UU., la mayoría siguen siendo amarillos (tarta) */
headline(L(10) - 0.1, L(11) - 0.1, 'Todos *lo copian*', { size: 96, hlT: T.copian });
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const cols = ['#c8102e', '#2b4a8c', '#4c8a3a', '#8f9aa6', '#7a5aa8', '#e9dcc2'];
  const fila = cols.map((col, i) => [LAPIZ(cam, 60 + i * 162, 460, 120, { col }), LAPIZ(cam, 60 + i * 162, 460, 120, {})]);
  const tarta = box(cam, 300, 1040, 300, 300, { zIndex: 8, borderRadius: '50%', border: `8px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}` });
  const usa = chip(cam, 640, 1120, 'EE. UU.', { size: 64, bg: '#fff', color: INK });
  const may = texto(cam, 1230, 'la mayoría', { size: 80, italic: true, x: 600, w: 440, z: 12 });
  fila.forEach((_, i) => sp(T.copian + i * 0.15, 'pop', 0.4)); sp(T.eeuu, 'whoosh', 0.6); sp(T.mayoria, 'ding', 0.8);
  return t => {
    zoom(cam, t, L(10), 4, 0.06);
    fila.forEach(([a, b], i) => { const t0 = T.copian + i * 0.15; b.style.clipPath = `inset(0 0 ${f1(100 - p(t, t0, 0.3) * 100)}% 0)`; [a, b].forEach(f => { set(f, { y: -Math.abs(Math.sin(t * 5 + i)) * 14, r: Math.sin(t * 3 + i) * 4 }); lapFace(f, t, { feliz: t > t0 ? 1 : 0, seed: i, look: [0, -4] }); }); });
    const k = p(t, T.mayoria - 0.2, 0.8, E.outCubic) * 270; tarta.style.background = `conic-gradient(${AMA} 0 ${f1(k)}deg, #8f9aa6 ${f1(k)}deg 360deg)`; set(tarta, { o: t > T.eeuu - 0.1 ? 1 : 0, s: pop(t, T.eeuu - 0.1, 0.4) });
    popA(usa, t, T.eeuu, { r: -4 }); set(may, { o: t > T.mayoria + 0.3 ? 1 : 0, s: pop(t, T.mayoria + 0.3, 0.35) });
  };
});

/* L11 · OJO: hay quien dice que el amarillo era solo por lujo, no por China */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const lp = LAPIZ(c, 470, 520, 140, { corona: true });
  const qs = [0, 1, 2].map(i => texto(c, 560 - i * 30, '?', { size: 110 + i * 20, color: [RED, PINK, INK][i], x: 680 + i * 90, w: 120 }));
  aparece(chip(c, 330, 1160, '¿solo por lujo?', { size: 60, bg: YEL, color: INK }), T.lujo);
  return t => { set(lp, { r: Math.sin(t * 2.5) * 6 }); lapFace(lp, t, { feliz: 0, ceja: 12, look: [8, -4] }); qs.forEach((q, i) => set(q, { o: t > T.lujo + i * 0.15 ? 1 : 0, y: Math.sin(t * 4 + i) * 10 })); };
});

/* L12 · O sea: cada vez que mordías un lápiz en clase… mordías el color de un emperador */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Cada lápiz que mordías…', { size: 74 });
  const b = texto(c, 390, '…era color de emperador', { size: 70, italic: true, color: RED });
  const lp = LAPIZ(c, 470, 560, 160, { mordido: true, corona: true });
  const nam = BOCADILLO(c, 640, 640, '¡ñam!', { size: 66 });
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.colorEmp - 0.2 ? 1 : 0, s: pop(t, T.colorEmp - 0.2, 0.35) }); set(lp, { r: Math.sin(t * 4) * 5 }); lapFace(lp, t, { feliz: -1, ceja: 14, jaw: 0.5, look: [6, -4] }); popA(nam, t, T.mordias, { r: 5 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.mordias, 'gulp', 0.8); sp(T.colorEmp, 'stamp', 0.8);

/* L13 · pregunta final (confesión pícara) */
preguntaFinal('¿Mordías los lápices…', '…o te comías la goma?', { size: 76, draw: c => [['yo, el lápiz', YEL], ['yo, la goma', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 40, 620 + i * 160, s, { size: 58, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(78, 'Los lápices amarillos', ['LÁPICES', 'amarillos']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.ovejas + 0.4, T.ovejas + 1.2], [T.sinesc, T.sinesc + 0.9], [T.mordias, T.mordias + 0.9]], sorpresa: [[T.puro, T.puro + 0.8], [T.carcel, T.carcel + 0.8], [T.china5, T.china5 + 0.8]], golpes: [T.arbol + 0.5, T.guardias + 0.3, T.carcel, T.amar8, T.realeza, T.arrasa] },
});
