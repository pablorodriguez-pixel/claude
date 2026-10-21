/* Ep. 80 · Los secretos más oscuros de la Inquisición (y «colgar el sambenito») — edición estilo ep64/ep79: escenarios llenos, personajes con cara, Vecino fijo · sin violencia gráfica */
Story.prepara();
const T = {
  colgar0: Q('colgar el sambenito'), inq0: Q('la inquisición'),
  solo1: Q('solo uno'), oscuros: Q('más oscuros'),
  m1478: Q('mil cuatrocientos setenta y ocho'), reyes: Q('los reyes católicos'), tribunal: Q('un tribunal'), poder: Q('poder enorme'), cualquiera: Q('a cualquiera'), nobles: Q('nobles'), curas: Q('curas'), obispos: Q('obispos'),
  funcionaba: Q('funcionaba así'), detenian: Q('te detenían'), quien: Q('quién te había denunciado'), principio: Q('al principio'), deque: Q('de qué te acusaban'),
  bienes: Q('tus bienes'), dinero: Q('ese dinero'), cobraban: Q('te cobraban'), celda: Q('tu propia celda'),
  condenaban: Q('si te condenaban'), sambe5: Q('el sambenito'), saco: Q('un saco amarillo'), calle: Q('por la calle'),
  peor: Q('lo peor'), iglesia: Q('en la iglesia'), nombre: Q('con tu nombre'), siempre: Q('para siempre'), nietos: Q('tus nietos'), domingo: Q('cada domingo'),
  deahi: Q('de ahí'), culpa: Q('una culpa'), noquita: Q('ya no se quita'),
  tortura: Q('la tortura existía'), normas: Q('con normas'), medico: Q('un médico delante'), repetir: Q('repetirlo al día siguiente'), sin9: Q('sin tortura'),
  duro: Q('duró muchísimo'), m350: Q('trescientos cincuenta años'), m1834: Q('mil ochocientos treinta y cuatro'),
  ojo: Q('ojo'), cifras: Q('las cifras de muertos'), menores: Q('menores de lo que se cree'),
  osea: Q('o sea'), dices: Q('cuando dices'), hablando: Q('hablando como la inquisición'),
};
const AMA = '#f2c230', CREMA = '#FBF6EA', VERDEI = '#2e6b3a', PIEDRA = '#8f877a', OSCURO = '#1d1a22', VELA = '#ffd977';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };

/* ---------- figuras ---------- */
/* persona genérica con cara (vb 0 0 300 380). o: ropa, pelo ('corto'|'largo'|'calvo'), barba, gorro ('corona'|'mitra'|'birrete'|'coroza'|'capucha'), sambenito */
let PID = 0;
const persInner = (o = {}) => { const id = PID++; const piel = o.piel || '#f2c9a0';
  const cuerpo = o.sambenito ? `<path d="M40,380 C40,290 90,256 150,256 C210,256 260,290 260,380 Z" fill="${AMA}" stroke="${INK}" stroke-width="7"/><path d="M90,290 L210,370 M210,290 L90,370" stroke="${RED}" stroke-width="16" stroke-linecap="round"/>`
    : `<path d="M40,380 C40,290 90,256 150,256 C210,256 260,290 260,380 Z" fill="${o.ropa || '#6b4a2a'}" stroke="${INK}" stroke-width="7"/>${o.cruzVerde ? `<path d="M150,290 V360 M120,318 H180" stroke="${VERDEI}" stroke-width="16"/>` : ''}${o.cuello ? `<path d="M100,262 Q150,300 200,262" stroke="#fff" stroke-width="16" fill="none"/>` : ''}`;
  const pelo = o.pelo === 'largo' ? `<path d="M56,180 C40,60 260,60 244,180 C250,250 230,290 220,300 L220,170 C200,110 100,110 80,170 L80,300 C70,290 50,250 56,180 Z" fill="${o.pcol || '#6b4a2a'}" stroke="${INK}" stroke-width="5"/>`
    : o.pelo === 'calvo' ? `<path d="M60,170 C60,140 70,130 80,128 M240,170 C240,140 230,130 220,128" stroke="${o.pcol || '#9a9a9a'}" stroke-width="16" fill="none"/>`
      : `<path d="M58,160 C56,80 110,60 150,60 C200,60 246,80 242,160 C226,120 190,104 150,104 C110,104 74,120 58,160 Z" fill="${o.pcol || '#3a2a1e'}" stroke="${INK}" stroke-width="5"/>`;
  const gorro = o.gorro === 'corona' ? `<path d="M84,86 L96,26 L124,66 L150,16 L176,66 L204,26 L216,86 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="150" cy="56" r="9" fill="${RED}" stroke="${INK}" stroke-width="3"/>`
    : o.gorro === 'mitra' ? `<path d="M96,92 C96,40 130,6 150,0 C170,6 204,40 204,92 Z" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><path d="M150,4 V92 M122,48 H178" stroke="${GOLD}" stroke-width="10"/>`
      : o.gorro === 'birrete' ? `<path d="M70,96 C70,40 230,40 230,96 Z" fill="${INK}" stroke="${INK}" stroke-width="6"/><path d="M150,40 V20" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="16" r="10" fill="${INK}"/>`
        : o.gorro === 'coroza' ? `<path d="M100,96 L150,-110 L200,96 Z" fill="${AMA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M128,0 L172,60 M172,0 L128,60" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>`
          : o.gorro === 'casco' ? `<path d="M56,120 C56,40 244,40 244,120 Z" fill="#b8bec5" stroke="${INK}" stroke-width="6"/><path d="M30,124 C80,104 220,104 270,124" stroke="${INK}" stroke-width="10" fill="none"/><path d="M150,48 C130,20 170,0 150,-20" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round"/>`
          : o.gorro === 'capucha' ? `<path d="M40,380 C30,200 50,40 150,30 C250,40 270,200 260,380 L230,380 C240,240 230,120 150,110 C70,120 60,240 70,380 Z" fill="${OSCURO}" stroke="${INK}" stroke-width="7"/>` : '';
  return `${cuerpo}<circle cx="150" cy="176" r="96" fill="${piel}" stroke="${INK}" stroke-width="7"/>${pelo}
  ${o.barba ? `<path d="M70,200 C80,300 220,300 230,200 C210,250 90,250 70,200 Z" fill="${o.pcol || '#3a2a1e'}" stroke="${INK}" stroke-width="5"/>` : ''}
  <g class="pc${id}"><path d="M96,${o.severo ? 142 : 138} q18,${o.severo ? 8 : -10} 36,${o.severo ? 6 : 0} M168,${o.severo ? 148 : 138} q18,${o.severo ? -6 : -10} 36,${o.severo ? -8 : 0}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <g class="pe${id}"><ellipse cx="114" cy="168" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="186" cy="168" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="pp${id}"><circle cx="116" cy="171" r="7" fill="${INK}"/><circle cx="188" cy="171" r="7" fill="${INK}"/></g>
  <path class="pm${id}" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>${gorro}`; };
const PERS = (c, x, y, w, o = {}) => { const f = figura(c, x, y, w, w * 380 / 300, persInner(o), '0 -120 300 500', Object.assign({ z: 8, origin: '50% 100%' }, o)); f.pid = PID - 1; f.style.height = px(w * 500 / 300); f.style.top = px(y - w * 120 / 300); return f; };
const pFace = (f, t, o = {}) => caraF(f, t, o, 168, [150, 230, 20, `.pm${f.pid}`, `.pp${f.pid}`, `.pe${f.pid}`, `.pc${f.pid}`]);
/* cruz verde de la Inquisición (vb 0 0 200 260) */
const CRUZV = (c, x, y, w, z = 6) => box(c, x, y, w, w * 1.3, { zIndex: z }, `<svg viewBox="0 0 200 260" width="${w}" height="${w * 1.3}"><path d="M80,0 H120 V70 H190 V110 H120 V260 H80 V110 H10 V70 H80 Z" fill="${VERDEI}" stroke="${INK}" stroke-width="8"/><path d="M92,20 V240" stroke="#5a9a5a" stroke-width="6" opacity=".7"/></svg>`);
const VELA_F = (c, x, y, h = 160, z = 6) => { const d = box(c, x, y, 60, h + 70, { zIndex: z }, `<svg viewBox="0 0 60 ${h + 70}" width="60" height="${h + 70}"><rect x="14" y="70" width="32" height="${h}" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path class="ll" d="M30,10 C46,34 46,54 30,66 C14,54 14,34 30,10 Z" fill="${VELA}" stroke="${INK}" stroke-width="4"/></svg>`); d.ll = d.querySelector('.ll'); return d; };
const llama = (v, t, i = 0) => v.ll.setAttribute('transform', `translate(30 66) scale(${f1(1 + 0.12 * Math.sin(t * 13 + i))} ${f1(1 + 0.18 * Math.sin(t * 9 + i))}) translate(-30 -66)`);
const SAMBE = (c, x, y, w, nombre, z = 7) => box(c, x, y, w, w * 1.3, { zIndex: z, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 200 260" width="${w}" height="${w * 1.3}"><path d="M100,0 V20" stroke="${INK}" stroke-width="5"/><path d="M30,20 H170 L180,250 H20 Z" fill="${AMA}" stroke="${INK}" stroke-width="7"/><path d="M50,50 L150,170 M150,50 L50,170" stroke="${RED}" stroke-width="16" stroke-linecap="round"/><text x="100" y="225" text-anchor="middle" font-family="SpecialElite" font-size="22" fill="${INK}">${nombre}</text></svg>`);
const PIEDRAS = (c, z = 0) => box(c, 0, 0, 1080, 1920, { zIndex: z, background: '#5d5a63', backgroundImage: 'linear-gradient(rgba(0,0,0,.25) 4px, transparent 4px), linear-gradient(90deg, rgba(0,0,0,.25) 4px, transparent 4px)', backgroundSize: '180px 90px' });

/* L0 · PORTADA (fotograma 0 completo): sala con cruz verde y velas; el inquisidor habla; el reo con sambenito tiembla; sello «SAMBENITO» */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 220, 'Los secretos más oscuros', { size: 74 });
  texto(c, 305, 'de la…', { size: 74 });
  const t2 = texto(c, 385, hlSpan('INQUISICIÓN', 'phl'), { size: 118, italic: true });
  const cz = CRUZV(c, 470, 560, 140, 4);
  const vs = [120, 900].map((x, i) => VELA_F(c, x, 760, 200, 5));
  const inq = PERS(c, 50, 700, 480, { ropa: '#f4efe2', gorro: 'birrete', cruzVerde: true, severo: true, cuello: true });
  const reo = PERS(c, 560, 760, 440, { sambenito: true, gorro: 'coroza', pelo: 'calvo' });
  const sel = stamp(c, 300, 1250, 'SAMBENITO', { size: 100, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.colgar0, 'ding', 0.6); sp(T.inq0, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    vs.forEach((v, i) => llama(v, t, i)); set(cz, { s: 1 + 0.03 * Math.sin(t * 3) });
    set(inq, { r: Math.sin(t * 1.6) * 2 }); pFace(inq, t, { jaw: talkW(t, 'VECINO'), look: [10, 0], feliz: -0.3 });
    set(reo, { x: Math.sin(t * 30) * 3, y: -Math.abs(Math.sin(t * 2)) * 6 }); pFace(reo, t, { feliz: -1, ceja: 14, look: [-10, -4], jaw: 0.3, seed: 1 });
    stampA(sel, t, T.inq0, -8);
  };
}, { sfx: false });
shakeAt(T.inq0, 0.3, 12);

/* L1 · solo uno de sus secretos más oscuros: puerta de mazmorra que chirría y se abre; carpetas «SECRETO» con vela */
headline(L(1) - 0.1, L(2) - 0.1, 'Sus secretos *más oscuros*', Object.assign({ size: 88, hlT: T.oscuros }, BL));
plano(L(1) - 0.1, L(2) - 0.1, { background: OSCURO }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const marco = box(cam, 240, 460, 600, 880, { zIndex: 3, background: '#0b0a0d', border: `10px solid ${INK}`, borderRadius: '300px 300px 0 0' });
  const luz = box(cam, 240, 460, 600, 880, { zIndex: 3, background: 'radial-gradient(circle at 50% 70%, rgba(255,217,119,.75), rgba(255,217,119,0) 70%)', borderRadius: '300px 300px 0 0' });
  const puerta = box(cam, 250, 470, 580, 870, { zIndex: 5, background: '#5a3a1e', border: `8px solid ${INK}`, borderRadius: '290px 290px 0 0', transformOrigin: '0% 50%', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 6px, transparent 6px 96px)' });
  box(puerta, 0, 220, 564, 26, { background: '#3a3a40', border: `4px solid ${INK}` }); box(puerta, 0, 600, 564, 26, { background: '#3a3a40', border: `4px solid ${INK}` }); box(puerta, 470, 400, 40, 70, { background: '#3a3a40', border: `4px solid ${INK}`, borderRadius: '10px' });
  const carpetas = [0, 1, 2].map(i => box(cam, 330 + i * 70, 820 + i * 50, 320, 230, { zIndex: 4, background: '#d8c3a0', border: `6px solid ${INK}`, borderRadius: '6px 30px 6px 6px', fontFamily: 'Rye', fontSize: '42px', textAlign: 'center', lineHeight: '220px', color: RED, transform: `rotate(${(i - 1) * 6}deg)` }, 'SECRETO'));
  const v = VELA_F(cam, 790, 1100, 140, 6);
  sp(T.solo1, 'scratch', 0.8); sp(T.oscuros, 'thud', 0.8); sp(T.oscuros + 0.3, 'sparkle', 0.5);
  return t => {
    zoom(cam, t, L(1), 3, 0.08); llama(v, t);
    const k = p(t, T.solo1, 1.2, E.inOutCubic); set(puerta, { sx: 1 - 0.75 * k }); set(luz, { o: k });
    carpetas.forEach((cp, i) => set(cp, { o: k > 0.4 ? 1 : 0, y: (1 - p(t, T.oscuros + i * 0.15, 0.35, E.outBack)) * 80 }));
  };
});

/* L2 · 1478: los Reyes Católicos crean el tribunal (firma) → poder enorme (cruz verde que crece) → juzga a cualquiera: nobles, curas… ¡hasta obispos! */
headline(L(2) - 0.1, T.cualquiera - 0.1, '*1478*: nace el tribunal', Object.assign({ size: 90, hlT: T.m1478 + 0.3 }, BL));
headline(T.cualquiera - 0.1, L(3) - 0.1, 'Juzga a *cualquiera*', Object.assign({ size: 96, hlT: T.cualquiera }, BL));
plano(L(2) - 0.1, T.poder - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 30px, transparent 30px 60px)' }, c => {
  const cam = CAM(c);
  const rey = PERS(cam, 90, 600, 380, { ropa: '#7a5aa8', gorro: 'corona', barba: true });
  const reina = PERS(cam, 610, 600, 380, { ropa: '#2b4a8c', gorro: 'corona', pelo: 'largo', pcol: '#c87a3a' });
  const mesa = box(cam, 0, 1150, 1080, 770, { zIndex: 9, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const pergamino = box(cam, 330, 1050, 420, 260, { zIndex: 10, background: CREMA, border: `6px solid ${INK}`, fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', paddingTop: '40px', boxSizing: 'border-box', color: INK }, 'TRIBUNAL<br><span style="font-size:30px">del Santo Oficio</span>');
  const firma = box(pergamino, 60, 180, 300, 60, { zIndex: 2 }, `<svg viewBox="0 0 300 60" width="300" height="60"><path class="fi" d="M10,40 C40,0 60,60 90,30 C120,0 140,50 170,30 C200,10 230,50 290,20" stroke="${INK}" stroke-width="5" fill="none" stroke-dasharray="400" stroke-dashoffset="400"/></svg>`);
  sp(L(2), 'tada', 0.5); sp(T.reyes, 'pop2', 0.7); sp(T.tribunal, 'scratch', 0.7);
  return t => {
    zoom(cam, t, L(2), 4, 0.06);
    [rey, reina].forEach((r, i) => { set(r, { s: pop(t, T.reyes - 0.1 + i * 0.15, 0.4) }); pFace(r, t, { feliz: 0.6, look: [i ? -8 : 8, 6], ceja: 4, jaw: t > T.tribunal && t < T.tribunal + 0.5 ? 0.3 : 0, seed: i }); });
    set(pergamino, { o: t > T.tribunal - 0.2 ? 1 : 0, y: (1 - p(t, T.tribunal - 0.2, 0.4, E.outBack)) * 300 }); firma.querySelector('.fi').setAttribute('stroke-dashoffset', f1(400 * (1 - p(t, T.tribunal + 0.2, 0.8))));
  };
});
plano(T.poder - 0.1, L(3) - 0.1, { background: OSCURO }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const cz = CRUZV(cam, 390, 420, 300, 3);
  const rays2 = rays(cam, -160, 340, 1400, 20, 'rgba(46,107,58,.35)', 'rgba(0,0,0,0)', 1);
  const fila = [[{ ropa: '#7a5aa8', barba: true }, 'noble', T.nobles], [{ ropa: '#2b2b33', pelo: 'calvo', cuello: true }, 'cura', T.curas], [{ ropa: '#c8102e', gorro: 'mitra' }, '¡obispo!', T.obispos]].map(([o, s, t0], i) => [PERS(cam, 300 + i * 260, 900, 250, o), chip(cam, 320 + i * 260, 1250, s, { size: 50, bg: i === 2 ? YEL : '#fff', color: INK }), t0]);
  const sel = stamp(cam, 560, 820, 'JUZGADO', { size: 66, z: 30 });
  sp(T.poder, 'thud', 0.8); fila.forEach(([, , t0]) => sp(t0, 'stamp', 0.6)); sp(T.obispos + 0.2, 'glitch', 0.7);
  return t => {
    zoom(cam, t, T.poder, 4, 0.07); set(rays2, { r: t * 10 }); set(cz, { s: lerp(0.5, 1.1, p(t, T.poder - 0.1, 0.6, E.outBack)) });
    fila.forEach(([f, ch, t0], i) => { set(f, { o: t > t0 - 0.15 ? 1 : 0, y: (1 - p(t, t0 - 0.15, 0.35, E.outBack)) * 400 }); pFace(f, t, { feliz: -1, ceja: 14, look: [0, -6], jaw: t > t0 ? 0.5 : 0, seed: i }); popA(ch, t, t0 + 0.1, { r: -3 }); });
    stampA(sel, t, T.obispos + 0.2, -10);
  };
});
shakeAt(T.obispos + 0.2, 0.35, 14);

/* L3 · funcionaba así: ¡toc toc! te detenían… y no te decían quién te había denunciado (silueta anónima con «?») ni de qué te acusaban (expediente «???») */
headline(L(3) - 0.1, L(4) - 0.1, '¿Quién *te denunció*?', Object.assign({ size: 96, hlT: T.quien }, BL));
plano(L(3) - 0.1, L(4) - 0.1, { background: '#2b3550' }, c => {
  const cam = CAM(c);
  const casa = box(cam, 0, 420, 1080, 1100, { zIndex: 1, background: '#c9b48e', borderTop: `8px solid ${INK}`, backgroundImage: 'linear-gradient(rgba(43,33,24,.15) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.15) 4px, transparent 4px)', backgroundSize: '160px 80px' });
  const puerta = box(cam, 360, 560, 360, 640, { zIndex: 3, background: '#5a3a1e', border: `8px solid ${INK}`, borderRadius: '180px 180px 0 0' });
  const toc = texto(cam, 500, '¡toc, toc!', { size: 96, italic: true, color: '#fff', x: 300, w: 480, z: 12, shadow: `4px 4px 0 ${INK}` });
  const vec = PERS(cam, 380, 760, 320, { ropa: '#9a8a6a' });
  const guard = [0, 1].map(i => PERS(cam, i ? 760 : 20, 780, 300, { ropa: '#3a3a40', gorro: 'casco', barba: true }));
  const sil = box(cam, 40, 470, 260, 380, { zIndex: 10 }, `<svg viewBox="0 0 260 380" width="260" height="380"><circle cx="130" cy="110" r="80" fill="${OSCURO}"/><path d="M20,380 C20,250 70,200 130,200 C190,200 240,250 240,380 Z" fill="${OSCURO}"/><text x="130" y="140" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="120" fill="#fff">?</text></svg>`);
  const exp = box(cam, 600, 470, 380, 280, { zIndex: 11, background: '#d8c3a0', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '40px', padding: '30px', boxSizing: 'border-box', color: INK }, 'ACUSACIÓN:<br><b style="font-size:90px;color:#c8102e">¿¿??</b>');
  sp(L(3) + 0.1, 'click', 0.8); sp(L(3) + 0.4, 'click', 0.8); sp(T.detenian, 'thud', 0.9); sp(T.quien, 'glitch', 0.7); sp(T.deque, 'paper', 0.8);
  return t => {
    zoom(cam, t, L(3), 4, 0.06);
    set(puerta, { x: t < T.detenian && t > L(3) ? Math.sin(t * 40) * 4 : 0, o: t < T.detenian ? 1 : 0 }); set(toc, { o: t < T.detenian ? 1 : 0, r: -4 });
    set(vec, { o: t > T.detenian - 0.1 ? 1 : 0 }); pFace(vec, t, { feliz: -1, ceja: 14, look: [Math.sin(t * 3) * 10, 0], jaw: 0.5 });
    guard.forEach((g, i) => { set(g, { o: t > T.detenian ? 1 : 0, x: (1 - p(t, T.detenian, 0.4, E.outBack)) * (i ? 400 : -400) }); pFace(g, t, { feliz: -0.5, look: [i ? -10 : 10, 0], seed: i }); });
    set(sil, { o: t > T.quien - 0.1 ? 1 : 0, s: pop(t, T.quien - 0.1, 0.35), x: Math.sin(t * 2) * 10 });
    set(exp, { o: t > T.deque - 0.2 ? 1 : 0, s: pop(t, T.deque - 0.2, 0.35), r: 3 });
  };
});

/* L4 · te quitaban tus bienes (casa, monedas, muebles vuelan al cofre) → y con ese dinero te cobraban la comida de tu propia celda (factura) */
headline(L(4) - 0.1, T.cobraban - 0.1, 'Te quitaban *todo*', { size: 96, hlT: T.bienes });
headline(T.cobraban - 0.1, L(5) - 0.1, 'Y encima… *¡la factura!*', Object.assign({ size: 90, hlT: T.celda }, BL));
plano(L(4) - 0.1, T.cobraban - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const cofre = box(cam, 300, 1000, 480, 300, { zIndex: 8 }, `<svg viewBox="0 0 480 300" width="480" height="300"><path d="M20,100 C20,20 460,20 460,100 Z" fill="#8a5a32" stroke="${INK}" stroke-width="8"/><rect x="20" y="100" width="440" height="190" fill="#a06a3a" stroke="${INK}" stroke-width="8"/><path d="M240,30 V290" stroke="${GOLD}" stroke-width="18"/><rect x="215" y="130" width="50" height="60" rx="8" fill="${GOLD}" stroke="${INK}" stroke-width="5"/></svg>`);
  const cz = CRUZV(cam, 480, 1060, 80, 9);
  const cosas = [['casa', 60, 480], ['$', 820, 470], ['silla', 80, 760], ['$', 830, 760], ['vaca', 450, 420]].map(([k, x, y], i) => [box(cam, x, y, 180, 160, { zIndex: 10 }, k === 'casa' ? `<svg viewBox="0 0 180 160" width="180" height="160"><path d="M10,70 L90,10 L170,70 Z" fill="${RED}" stroke="${INK}" stroke-width="6"/><rect x="25" y="70" width="130" height="85" fill="#f2dcb4" stroke="${INK}" stroke-width="6"/></svg>` : k === 'silla' ? `<svg viewBox="0 0 180 160" width="180" height="160"><path d="M50,10 V150 M50,80 H140 V150 M140,80 V60" stroke="#8a5a32" stroke-width="16"/></svg>` : k === 'vaca' ? `<svg viewBox="0 0 180 160" width="180" height="160"><ellipse cx="90" cy="80" rx="70" ry="44" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="70" r="14" fill="${INK}"/><circle cx="120" cy="90" r="10" fill="${INK}"/><path d="M50,120 V150 M130,120 V150" stroke="${INK}" stroke-width="10"/></svg>` : `<svg viewBox="0 0 180 160" width="180" height="160"><circle cx="90" cy="80" r="64" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><text x="90" y="104" text-anchor="middle" font-family="Rye" font-size="70" fill="${INK}">$</text></svg>`), x, y, i]);
  cosas.forEach(([, , , i]) => sp(T.bienes + i * 0.12, 'whoosh', 0.4)); sp(T.dinero, 'cash', 0.8);
  return t => {
    zoom(cam, t, L(4), 2, 0.07); set(ry, { r: t * 6 });
    cosas.forEach(([e, x, y, i]) => { const k = p(t, T.bienes + i * 0.12, 0.6, E.inCubic); set(e, { x: (540 - 90 - x) * k, y: (1080 - y) * k, s: 1 - 0.7 * k, r: k * 300, o: k < 0.97 ? 1 : 0 }); });
    set(cofre, { y: t > T.bienes ? -Math.abs(Math.sin(t * 12)) * 8 : 0 });
  };
});
plano(T.cobraban - 0.1, L(5) - 0.1, { background: OSCURO }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const reo = PERS(cam, 330, 640, 420, { pelo: 'calvo', ropa: '#9a8a6a' });
  const plato = box(cam, 120, 1130, 300, 120, { zIndex: 9 }, `<svg viewBox="0 0 300 120" width="300" height="120"><ellipse cx="150" cy="70" rx="140" ry="40" fill="#e9e9e9" stroke="${INK}" stroke-width="6"/><ellipse cx="150" cy="60" rx="70" ry="18" fill="#c9a86a" stroke="${INK}" stroke-width="4"/></svg>`);
  const fact = box(cam, 560, 980, 420, 360, { zIndex: 10, background: '#fff', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '34px', padding: '24px', boxSizing: 'border-box', color: INK, lineHeight: 1.3, transformOrigin: '50% 0%' }, '<b style="font-family:Rye;font-size:44px">FACTURA</b><br>Pan duro .... 2<br>Sopa ........ 3<br>Celda ...... 5<br><b>A pagar con<br>tus bienes</b>');
  const barras = box(cam, 0, 420, 1080, 1100, { zIndex: 12 }, `<svg viewBox="0 0 1080 1100" width="1080" height="1100">${[...Array(7)].map((_, i) => `<rect x="${40 + i * 160}" y="0" width="30" height="1100" fill="#3a3a40" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  sp(T.cobraban, 'paper', 0.8); sp(T.celda, 'cash', 0.9); sp(T.celda + 0.2, 'boing', 0.6);
  return t => {
    zoom(cam, t, T.cobraban, 2, 0.08);
    pFace(reo, t, { feliz: t > T.celda ? -1 : 0, ceja: t > T.celda ? 16 : 6, look: t > T.cobraban ? [10, 6] : [0, 0], jaw: t > T.celda ? 0.7 : 0 });
    set(fact, { o: t > T.cobraban ? 1 : 0, sy: p(t, T.cobraban, 0.6, E.outCubic), r: 3 });
    set(barras, { y: (1 - p(t, T.cobraban - 0.1, 0.3, E.outBack)) * -1100 });
  };
});
shakeAt(T.celda, 0.3, 12);

/* L5 · si te condenaban: el sambenito (saco amarillo con aspas) cae sobre el reo → y tenías que llevarlo por la calle (vecinos señalando) */
headline(L(5) - 0.1, L(6) - 0.1, 'El *sambenito*', { size: 100, hlT: T.sambe5 });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#d8c3a0', backgroundImage: 'linear-gradient(rgba(43,33,24,.12) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.12) 4px, transparent 4px)', backgroundSize: '160px 80px' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1300, 1080, 620, { zIndex: 1, background: '#a08a6a', borderTop: `8px solid ${INK}` });
  const reo0 = PERS(cam, 360, 640, 380, { pelo: 'calvo', ropa: '#9a8a6a' });
  const reo1 = PERS(cam, 360, 640, 380, { pelo: 'calvo', sambenito: true, gorro: 'coroza' });
  const vec = [[30, 820, '#7a5aa8'], [760, 820, '#2b4a8c']].map(([x, y, ropa], i) => PERS(cam, x, y, 290, { ropa, pelo: i ? 'largo' : 'corto', pcol: i ? '#c87a3a' : '#3a2a1e' }));
  const dedos = [0, 1].map(i => box(cam, i ? 640 : 300, 960, 150, 150, { zIndex: 12 }, `<svg viewBox="-60 -70 120 120" width="150" height="150" style="overflow:visible">${gloveHand(0, 0, i ? -100 : 80, 1.2)}</svg>`));
  const cuchi = [BOCADILLO(cam, 20, 640, '¡mira, ese!', { size: 44 }), BOCADILLO(cam, 700, 640, 'pss, pss…', { size: 44 })];
  sp(T.condenaban, 'thud', 0.8); sp(T.sambe5, 'whoosh', 0.9); sp(T.saco, 'stamp', 0.9); sp(T.calle, 'pop', 0.6);
  return t => {
    zoom(cam, t, L(5), 4, 0.06);
    const k = p(t, T.sambe5 - 0.1, 0.45, E.outBack); set(reo1, { o: t > T.sambe5 - 0.1 ? 1 : 0, y: (1 - k) * -700 }); set(reo0, { o: t > T.sambe5 + 0.3 ? 0 : 1 });
    [reo0, reo1].forEach(r => pFace(r, t, { feliz: -1, ceja: 14, look: [Math.sin(t * 3) * 10, 4], jaw: 0.3 }));
    vec.forEach((v, i) => { set(v, { o: t > T.calle - 0.3 ? 1 : 0, s: pop(t, T.calle - 0.3 + i * 0.15, 0.35) }); pFace(v, t, { feliz: 0.5, look: [i ? -10 : 10, 0], jaw: 0.4, seed: i }); });
    dedos.forEach((d, i) => set(d, { o: t > T.calle ? 1 : 0, x: Math.sin(t * 8 + i) * 8 }));
    cuchi.forEach((b, i) => popA(b, t, T.calle + 0.2 + i * 0.25, { r: i ? 4 : -4 }));
  };
});
shakeAt(T.saco, 0.3, 10);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · lo peor: el sambenito se colgaba en la iglesia con tu nombre, para siempre → tus nietos lo veían cada domingo (campana, calendario) */
headline(L(7) - 0.1, L(8) - 0.1, 'Colgado *para siempre*', Object.assign({ size: 92, hlT: T.siempre }, BL));
plano(L(7) - 0.1, L(8) - 0.1, { background: '#3a3440' }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const vit = box(cam, 390, 380, 300, 420, { zIndex: 1, borderRadius: '150px 150px 0 0', border: `10px solid ${INK}`, background: 'conic-gradient(#c8102e 0 25%, #2b4a8c 0 50%, #f2c230 0 75%, #2e6b3a 0)', opacity: 0.85 });
  const filas = ['Juan Pérez · 1592', 'María Ruiz · 1601', 'Pedro Gil · 1588', 'Ana Díaz · 1610', 'Luis Mora · 1595', 'Inés Sanz · 1599'];
  const sbs = filas.map((n, i) => SAMBE(cam, 50 + (i % 3) * 340, 820 + Math.floor(i / 3) * 300, 210, n, 5));
  const nietos = [0, 1].map(i => PERS(cam, 420 + i * 240, 1160, 230, { ropa: i ? '#2b4a8c' : '#7a5aa8', pelo: i ? 'largo' : 'corto', pcol: i ? '#c87a3a' : '#3a2a1e' }));
  const dom = box(cam, 830, 420, 200, 200, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '12px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '38px', textAlign: 'center', lineHeight: '186px', color: RED }, 'DOMINGO');
  const ding = texto(cam, 420, '¡dong!', { size: 80, italic: true, color: GOLD, x: 40, w: 320, z: 12, shadow: `4px 4px 0 ${INK}` });
  sbs.forEach((_, i) => sp(T.iglesia + i * 0.15, 'pop', 0.4)); sp(T.nombre, 'scratch', 0.6); sp(T.siempre, 'stamp', 0.8); sp(T.domingo, 'bell', 0.9); sp(T.domingo + 0.6, 'bell', 0.7);
  return t => {
    zoom(cam, t, L(7), 5, 0.07);
    sbs.forEach((s, i) => set(s, { o: t > T.iglesia + i * 0.15 ? 1 : 0, y: (1 - p(t, T.iglesia + i * 0.15, 0.4, E.outBack)) * -400, r: Math.sin(t * 2 + i) * 4 }));
    nietos.forEach((n, i) => { set(n, { o: t > T.nietos - 0.1 ? 1 : 0, y: (1 - p(t, T.nietos - 0.1 + i * 0.15, 0.35, E.outBack)) * 400 }); pFace(n, t, { look: [0, -10], feliz: -1, ceja: 12, seed: i }); });
    set(dom, { o: t > T.domingo - 0.1 ? 1 : 0, s: pop(t, T.domingo - 0.1, 0.35), r: 4 }); set(ding, { o: t > T.domingo && t < T.domingo + 1.2 ? 1 : 0, r: Math.sin(t * 10) * 8 });
  };
});

/* L8 · de ahí «colgar el sambenito»: hoy, en la oficina, alguien le cuelga a otro la culpa (cartel «FUISTE TÚ») que ya no se quita */
headline(L(8) - 0.1, L(9) - 0.1, '«Colgar *el sambenito*»', { size: 96, hlT: T.deahi + 0.3 });
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const a = PERS(cam, 60, 640, 380, { ropa: '#2b8ad6', pelo: 'corto' }), b = PERS(cam, 600, 640, 380, { ropa: '#e8507a', pelo: 'largo', pcol: '#8a5a32' });
  const dedo = box(cam, 380, 820, 180, 180, { zIndex: 12 }, `<svg viewBox="-60 -70 120 120" width="180" height="180" style="overflow:visible">${gloveHand(0, 0, 90, 1.3)}</svg>`);
  const cartel = SAMBE(cam, 680, 1000, 220, '¡FUISTE TÚ!', 14);
  const lg = lagrima(cam, 820, 780);
  sp(T.deahi, 'pop', 0.6); sp(T.culpa, 'whoosh', 0.9); sp(T.culpa + 0.35, 'stamp', 0.9); sp(T.noquita, 'boing', 0.7);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(8), 3, 0.07);
    pFace(a, t, { feliz: 1, look: [10, 0], jaw: t > T.culpa && t < T.culpa + 0.6 ? 0.6 : 0.1, ceja: 4 }); pFace(b, t, { feliz: t > T.culpa + 0.3 ? -1 : 0.4, ceja: t > T.culpa + 0.3 ? 16 : 0, look: [-10, 4], seed: 1 });
    set(dedo, { o: t > T.culpa - 0.2 ? 1 : 0, x: Math.sin(t * 6) * 10 });
    set(cartel, { o: t > T.culpa ? 1 : 0, y: (1 - p(t, T.culpa, 0.4, E.outBack)) * -700, r: Math.sin(t * 3) * 5 });
    set(b, { x: t > T.noquita ? Math.sin(t * 30) * 5 : 0 }); set(lg, { o: t > T.noquita ? 1 : 0, y: ((t * 140) % 120) });
  };
});

/* L9 · [susurro] la tortura existía, pero con normas: un médico delante, y lo confesado había que repetirlo al día siguiente sin tortura (reglamento, sin escenas gráficas) */
headline(L(9) - 0.1, L(10) - 0.1, 'Con *normas*', Object.assign({ size: 100, hlT: T.normas }, BL));
plano(L(9) - 0.1, L(10) - 0.1, { background: OSCURO }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const v = [VELA_F(cam, 60, 520, 180, 3), VELA_F(cam, 960, 520, 180, 3)];
  const reg = box(cam, 220, 420, 640, 720, { zIndex: 6, background: CREMA, border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', paddingTop: '30px', boxSizing: 'border-box', color: INK }, 'REGLAMENTO');
  const items = [['un médico delante', T.medico], ['repetirlo al día siguiente', T.repetir], ['sin tortura', T.sin9]].map(([s, t0], i) => [el('div', reg, { left: '40px', top: px(150 + i * 170), width: '420px', fontFamily: 'SpecialElite', fontSize: '40px', textAlign: 'left', color: INK, lineHeight: 1.15 }, s), box(reg, 480, 120 + i * 170, 130, 130, {}, CHECK), t0]);
  const med = PERS(cam, 640, 1080, 300, { ropa: '#f4efe2', pelo: 'calvo', barba: true, pcol: '#9a9a9a' });
  const reloj = box(cam, 60, 1100, 220, 220, { zIndex: 10 }, `<svg viewBox="0 0 200 200" width="220" height="220"><circle cx="100" cy="100" r="90" fill="${CREMA}" stroke="${INK}" stroke-width="9"/><text x="100" y="122" text-anchor="middle" font-family="Rye" font-size="56" fill="${RED}">24 h</text></svg>`);
  const chs = texto(cam, 1280, 'chsss…', { size: 80, italic: true, color: '#f4efe2', x: 380, w: 400, z: 12 });
  items.forEach(([, , t0]) => sp(t0 + 0.2, 'stamp', 0.6)); sp(T.medico, 'pop', 0.6); sp(T.repetir, 'tick', 0.8);
  return t => {
    zoom(cam, t, L(9), 5, 0.06); v.forEach((x, i) => llama(x, t, i));
    set(reg, { s: pop(t, L(9) - 0.1, 0.4), r: -2 });
    items.forEach(([tx, ck, t0]) => { set(tx, { o: t > t0 ? 1 : 0.15 }); stampA(ck, t, t0 + 0.2, -8); });
    set(med, { o: t > T.medico - 0.1 ? 1 : 0, s: pop(t, T.medico - 0.1, 0.35) }); pFace(med, t, { look: [-10, -4], feliz: 0, ceja: 6 });
    set(reloj, { o: t > T.repetir - 0.1 ? 1 : 0, s: pop(t, T.repetir - 0.1, 0.35), r: Math.sin(t * 4) * 6 });
    set(chs, { o: t < T.medico ? 0.6 + 0.4 * Math.sin(t * 6) : 0 });
  };
});

/* L10 · duró muchísimo: más de 350 años (línea temporal con contador que corre) → hasta 1834 (sello «FIN») */
headline(L(10) - 0.1, L(11) - 0.1, '*356* años', { size: 110, hlT: T.m350 });
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const linea = box(cam, 80, 900, 920, 40, { zIndex: 5, background: '#d8c3a0', border: `6px solid ${INK}`, borderRadius: '20px' });
  const barra = box(cam, 86, 906, 10, 28, { zIndex: 6, background: VERDEI, borderRadius: '14px' });
  const a = chip(cam, 60, 980, '1478', { size: 60, bg: '#fff', color: INK }), b = chip(cam, 840, 980, '1834', { size: 60, bg: YEL, color: INK });
  const cnt = texto(cam, 560, '1478', { size: 220, color: INK, z: 10 });
  const inq = PERS(cam, 380, 1080, 300, { ropa: '#f4efe2', gorro: 'birrete', cruzVerde: true, severo: true, cuello: true });
  const fin = stamp(cam, 340, 1240 - 120, 'FIN', { size: 120, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.duro, 'whoosh', 0.7); [...Array(8)].forEach((_, i) => sp(T.m350 + i * 0.12, 'tick', 0.4)); sp(T.m1834 + 0.3, 'stamp', 1);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(10), 4, 0.06);
    const k = p(t, T.duro, T.m1834 - T.duro + 0.2, E.inOutCubic); barra.style.width = px(10 + 896 * k); cnt.textContent = String(Math.round(lerp(1478, 1834, k)));
    popA(a, t, L(10), { r: -3 }); popA(b, t, T.m1834, { r: 3 });
    pFace(inq, t, { look: [0, -8], feliz: t > T.m1834 + 0.3 ? -1 : -0.3, ceja: t > T.m1834 + 0.3 ? 14 : 0, jaw: t > T.m1834 + 0.3 ? 0.6 : 0 }); set(inq, { y: t > T.m1834 + 0.3 ? p(t, T.m1834 + 0.6, 0.6, E.inCubic) * 600 : 0 });
    stampA(fin, t, T.m1834 + 0.3, -8);
  };
});
shakeAt(T.m1834 + 0.3, 0.35, 14);

/* L11 · OJO: las cifras de muertos se discuten, y son menores de lo que se cree */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const libros = [0, 1, 2].map(i => box(c, 300 + i * 160, 600 - i * 20, 150, 360, { zIndex: 6, background: ['#7a1f1f', '#2b4a8c', VERDEI][i], border: `6px solid ${INK}`, borderRadius: '6px', transform: `rotate(${(i - 1) * 5}deg)`, fontFamily: 'Rye', fontSize: '60px', textAlign: 'center', lineHeight: '340px', color: '#fff' }, ['?', '¿?', '?'][i]));
  aparece(chip(c, 300, 1040, 'menos de lo que se cree', { size: 56, bg: YEL, color: INK }), T.menores);
  return t => libros.forEach((l, i) => set(l, { y: Math.sin(t * 3 + i) * 10, r: (i - 1) * 5 + Math.sin(t * 2 + i) * 3 }));
});

/* L12 · O sea: cuando dices «le han colgado el sambenito»… hablas como la Inquisición (el inquisidor asiente) */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, '«Le han colgado el sambenito»', { size: 58 });
  const b = texto(c, 370, '…hablas como la Inquisición', { size: 62, italic: true, color: RED });
  const inq = PERS(c, 140, 640, 360, { ropa: '#f4efe2', gorro: 'birrete', cruzVerde: true, severo: true, cuello: true });
  const sb = SAMBE(c, 620, 700, 260, '¿TÚ?', 9);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.hablando - 0.2 ? 1 : 0, s: pop(t, T.hablando - 0.2, 0.35) }); pFace(inq, t, { jaw: talkW(t, 'VECINO') * 0.7, feliz: t > T.hablando ? 1 : 0, look: [10, 0], closed: t > T.hablando + 0.4 && t < T.hablando + 0.7 }); set(inq, { y: t > T.hablando ? Math.abs(Math.sin(t * 8)) * -10 : 0 }); set(sb, { r: Math.sin(t * 3) * 6 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.hablando, 'stamp', 0.8);

/* L13 · pregunta final (confesión pícara) */
preguntaFinal('¿A quién le colgarías', 'el sambenito en tu casa?', { size: 80, draw: c => [['a mi hermano', YEL], ['a mi pareja', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 40, 620 + i * 160, s, { size: 58, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(80, 'La Inquisición', ['INQUISICIÓN', 'sambenito']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.celda + 0.2, T.celda + 1.2], [T.culpa + 0.4, T.culpa + 1.3]], sorpresa: [[T.obispos, T.obispos + 0.8], [T.quien, T.quien + 0.8], [T.siempre, T.siempre + 0.8]], golpes: [T.obispos + 0.2, T.detenian, T.celda, T.saco, T.siempre, T.culpa + 0.35, T.m1834 + 0.3] },
});
