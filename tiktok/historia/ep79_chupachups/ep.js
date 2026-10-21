/* Ep. 79 · El logo de Chupa Chups lo dibujó Dalí — edición estilo ep64/ep77: escenarios llenos, objetos con cara, Vecino fijo */
Story.prepara();
const T = {
  logo0: Q('este logo'), dali0: Q('salvador dalí'),
  cuentan: Q('según cuentan'), hora1: Q('menos de una hora'), papel1: Q('un papel cualquiera'),
  bcn: Q('barcelona'), m1958: Q('mil novecientos cincuenta y ocho'), bernat: Q('enric bernat'), fija: Q('se fija'), ninos: Q('los niños'), sacan: Q('se sacan'), pegaj: Q('manos pegajosas'),
  palo: Q('le pone un palo'), tenedor: Q('con tenedor'), chups: Q('lo llama'), chupa3: Q('y luego'),
  funciona: Q('funciona tanto'), mundo: Q('conquistar el mundo'), necesita: Q('necesita un logo'), idioma: Q('cualquier idioma'),
  ocurre: Q('se le ocurre'), artista: Q('artista más famoso'), dali5: Q('salvador dalí'),
  m1969: Q('mil novecientos sesenta y nueve'), cafe: Q('un café'), mismo: Q('ahí mismo'), garab: Q('garabatear'),
  margarita: Q('una margarita amarilla'), rojo: Q('en rojo'), dicen: Q('dicen'), hora8: Q('menos de una hora'),
  genial: Q('lo genial'), donde: Q('dónde lo pone'), encima: Q('encima del caramelo'), lado: Q('en un lado'), entero: Q('se ve entero'), gires: Q('lo gires como lo gires'),
  logo10: Q('ese logo'), espacio: Q('hasta el espacio'), m1995: Q('mil novecientos noventa y cinco'), mir: Q('estación mir'),
  ojo: Q('ojo'), cuente: Q('quién lo cuente'),
  osea: Q('o sea'), comias: Q('te comías'), boca: Q('un dalí en la boca'),
};
const ROJO = '#d7262b', AMA = '#f6c616', CREMA = '#FBF6EA', CIELOC = '#bcd3ea', NOCHE = '#1f2a44';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };

/* ---------- figuras ---------- */
/* logo-margarita (vb 0 0 300 300) */
const margarita = (k = 1) => `<g>${[...Array(10)].map((_, i) => `<ellipse cx="150" cy="62" rx="34" ry="62" fill="${AMA}" stroke="${INK}" stroke-width="5" transform="rotate(${i * 36} 150 150)" opacity="${i / 10 < k ? 1 : 0}"/>`).join('')}<circle cx="150" cy="150" r="78" fill="${AMA}" stroke="${INK}" stroke-width="5" opacity="${k > 0.5 ? 1 : 0}"/>
  <text x="150" y="142" text-anchor="middle" font-family="Rye" font-size="44" fill="${ROJO}" stroke="${INK}" stroke-width="1.5" opacity="${k > 0.8 ? 1 : 0}">Chupa</text><text x="150" y="190" text-anchor="middle" font-family="Rye" font-size="44" fill="${ROJO}" stroke="${INK}" stroke-width="1.5" opacity="${k > 0.8 ? 1 : 0}">Chups</text></g>`;
const LOGO = (c, x, y, w, z = 9) => figura(c, x, y, w, w, margarita(1), '0 0 300 300', { z, origin: '50% 50%' });
/* el caramelo con palo y cara (vb 0 0 300 640): o.logo 'top' | 'lado' | null */
const chupaInner = (o = {}) => `<rect x="138" y="270" width="24" height="360" rx="12" fill="#fff" stroke="${INK}" stroke-width="6"/>
  <path d="M118,268 L96,300 L150,282 L204,300 L182,268 Z" fill="${o.col || '#e8507a'}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  ${cut('<circle cx="150" cy="150" r="128"/>', 8, 10)}<circle cx="150" cy="150" r="128" fill="${o.col || '#e8507a'}" stroke="${INK}" stroke-width="7"/><path d="M40,90 C90,140 210,140 260,90 M30,170 C90,220 210,220 270,170" stroke="#fff" stroke-width="10" fill="none" opacity=".35"/><ellipse cx="100" cy="90" rx="30" ry="18" fill="#fff" opacity=".45" transform="rotate(-30 100 90)"/>
  ${o.logo === 'top' ? `<g transform="translate(70,22) scale(.53)">${margarita(1)}</g>` : ''}${o.logo === 'lado' ? `<g class="lado" transform="translate(196,110) scale(.26)">${margarita(1)}</g>` : ''}
  <g class="kc"><path d="M88,${o.logo === 'top' ? 186 : 120} q16,-9 32,0 M180,${o.logo === 'top' ? 186 : 120} q16,-9 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="ke"><ellipse cx="108" cy="${o.logo === 'top' ? 210 : 150}" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="192" cy="${o.logo === 'top' ? 210 : 150}" rx="16" ry="18" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="kp"><circle cx="110" cy="${o.logo === 'top' ? 213 : 153}" r="7.5" fill="${INK}"/><circle cx="194" cy="${o.logo === 'top' ? 213 : 153}" r="7.5" fill="${INK}"/></g><path class="km" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${o.bigote ? `<path class="big" d="M150,${o.logo === 'top' ? 238 : 186} C120,${o.logo === 'top' ? 250 : 198} 80,${o.logo === 'top' ? 230 : 178} 70,${o.logo === 'top' ? 170 : 118} M150,${o.logo === 'top' ? 238 : 186} C180,${o.logo === 'top' ? 250 : 198} 220,${o.logo === 'top' ? 230 : 178} 230,${o.logo === 'top' ? 170 : 118}" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/>` : ''}`;
const CHUPA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 640 / 300, chupaInner(o), '0 0 300 640', Object.assign({ z: 9, origin: '50% 30%' }, o));
const chFace = (f, t, o = {}, top) => caraF(f, t, o, top ? 210 : 150, [150, top ? 252 : 196, 18, '.km', '.kp', '.ke', '.kc']);
/* Dalí: pelo engominado, ojos saltones y bigote de puntas (vb 0 0 300 380); daliFace mueve el bigote */
const DALI = (c, x, y, w) => figura(c, x, y, w, w * 380 / 300, `<path d="M40,380 C40,290 90,256 150,256 C210,256 260,290 260,380 Z" fill="#2b2b33" stroke="${INK}" stroke-width="7"/><path d="M110,262 L150,330 L190,262" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path d="M130,300 L150,340 L170,300 L150,320 Z" fill="${ROJO}" stroke="${INK}" stroke-width="4"/>
  <ellipse cx="150" cy="160" rx="92" ry="108" fill="#e9c29a" stroke="${INK}" stroke-width="7"/>
  <path d="M58,140 C56,60 110,40 160,44 C220,48 250,90 244,140 C230,96 196,80 150,84 C110,86 76,100 58,140 Z" fill="#1d1a17" stroke="${INK}" stroke-width="5"/>
  <g class="dc"><path d="M88,126 q22,-22 46,-6 M166,120 q24,-16 46,6" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
  <g class="de"><circle cx="112" cy="156" r="24" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="188" cy="156" r="24" fill="#fff" stroke="${INK}" stroke-width="5"/></g><g class="dp"><circle cx="114" cy="158" r="9" fill="${INK}"/><circle cx="190" cy="158" r="9" fill="${INK}"/></g>
  <path d="M150,170 L140,206 L158,208" stroke="${INK}" stroke-width="5" fill="none" stroke-linejoin="round"/>
  <g class="bi"><path d="M150,222 C120,232 96,222 82,180 C78,166 70,150 62,138 M150,222 C180,232 204,222 218,180 C222,166 230,150 238,138" stroke="${INK}" stroke-width="9" fill="none" stroke-linecap="round"/></g>
  <path class="dm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`, '0 0 300 380', { z: 8, origin: '50% 100%' });
const daliFace = (f, t, o = {}) => { caraF(f, t, o, 156, [150, 244, 16, '.dm', '.dp', '.de', '.dc']); const b = f.querySelector('.bi'); b.setAttribute('transform', `rotate(${f1((o.bigote || 0) + Math.sin(t * 6) * 3)} 150 222)`); };
const NUBE = (c, x, y, w, z = 3, col = '#fff') => box(c, x, y, w, w * 0.36, { zIndex: z, background: col, border: `6px solid ${INK}`, borderRadius: '999px' });
const RELOJ = (c, x, y, w, z = 10) => { const d = box(c, x, y, w, w, { zIndex: z }, `<svg viewBox="0 0 200 200" width="${w}" height="${w}"><circle cx="100" cy="100" r="90" fill="${CREMA}" stroke="${INK}" stroke-width="9"/>${[...Array(12)].map((_, i) => `<path d="M100,18 V34" stroke="${INK}" stroke-width="6" transform="rotate(${i * 30} 100 100)"/>`).join('')}<path class="mh" d="M100,100 V36" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path class="hh" d="M100,100 V56" stroke="${ROJO}" stroke-width="10" stroke-linecap="round"/><circle cx="100" cy="100" r="9" fill="${INK}"/></svg>`); d.mh = d.querySelector('.mh'); d.hh = d.querySelector('.hh'); return d; };
const giraReloj = (r, t, v = 1) => { r.mh.setAttribute('transform', `rotate(${f1(t * 360 * v)} 100 100)`); r.hh.setAttribute('transform', `rotate(${f1(t * 30 * v)} 100 100)`); };
/* reloj blando à la Dalí (vb 0 0 300 260) */
const RELOJBLANDO = (c, x, y, w, z = 8) => box(c, x, y, w, w * 0.86, { zIndex: z }, `<svg viewBox="0 0 300 260" width="${w}" height="${w * 0.86}"><path d="M20,60 C40,10 220,0 260,50 C290,90 250,120 240,170 C232,220 210,250 196,250 C180,250 186,200 160,170 C120,140 30,150 20,60 Z" fill="${GOLD}" stroke="${INK}" stroke-width="8"/><path d="M40,70 C60,30 210,24 240,60 C260,90 224,110 214,150 C206,190 196,214 190,214 C178,212 180,180 150,156 C110,130 50,140 40,70 Z" fill="${CREMA}" stroke="${INK}" stroke-width="5"/><path d="M140,90 L120,60 M140,90 L190,110" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></svg>`);
const NINO = (c, x, y, w) => figura(c, x, y, w, w * 1.2, `<path d="M50,360 C50,280 100,250 150,250 C200,250 250,280 250,360 Z" fill="#2b8ad6" stroke="${INK}" stroke-width="7"/><path d="M60,300 H240" stroke="#fff" stroke-width="14" opacity=".6"/>
  <circle cx="150" cy="160" r="98" fill="#f2c9a0" stroke="${INK}" stroke-width="7"/><path d="M66,120 C80,50 220,50 234,120 C210,90 190,96 170,70 C160,100 120,80 100,100 C90,110 76,112 66,120 Z" fill="#8a5a32" stroke="${INK}" stroke-width="5"/>
  ${[[100, 200], [118, 212], [200, 200], [182, 212]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#c87a4a"/>`).join('')}
  <g class="nc"><path d="M96,124 q16,-9 32,0 M172,124 q16,-9 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="ne"><ellipse cx="114" cy="152" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="186" cy="152" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="np"><circle cx="116" cy="155" r="7" fill="${INK}"/><circle cx="188" cy="155" r="7" fill="${INK}"/></g><path class="nm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`, '0 0 300 360', { z: 8, origin: '50% 100%' });
const ninoFace = (f, t, o = {}) => caraF(f, t, o, 152, [150, 214, 20, '.nm', '.np', '.ne', '.nc']);
const flecha = (c, x, y, w, h, d, col = RED, wd = 10) => box(c, x, y, w, h, { zIndex: 14 }, arrowSvg(d, col, wd));

/* L0 · PORTADA (fotograma 0 completo): «¿Quién dibujó este LOGO?» — el Chupa Chups gigante con cara habla; el bigote de Dalí asoma; en «Dalí» cae el sello */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 230, '¿Quién dibujó…', { size: 92 });
  const t2 = texto(c, 330, '…este ' + hlSpan('LOGO?', 'phl'), { size: 130, italic: true });
  const ch = CHUPA(c, 330, 520, 420, { logo: 'top' });
  const mini = [[60, 900, '#f28c28'], [880, 880, '#7ab35a'], [90, 1180, '#9b6bd6'], [850, 1170, '#2b8ad6']].map(([x, y, col]) => CHUPA(c, x, y, 140, { col }));
  const dl = DALI(c, 700, 640, 360); dl.style.zIndex = 7;
  const sel = stamp(c, 330, 1230, '¡DALÍ!', { size: 120, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.dali0, 'ding', 0.8); sp(T.dali0 + 0.25, 'stamp', 1);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const hop = Math.abs(Math.sin(t * 4.5)); set(ch, { y: -hop * 24, r: Math.sin(t * 2.4) * 5 }); chFace(ch, t, { jaw: talkW(t, 'VECINO'), feliz: 1, look: [Math.sin(t * 2) * 4, -2], ceja: t > T.dali0 ? 10 : 0 }, true);
    mini.forEach((m, i) => { set(m, { y: -Math.abs(Math.sin(t * 5 + i * 1.3)) * 20, r: Math.sin(t * 3 + i) * 12 }); chFace(m, t, { feliz: 1, look: [i % 2 ? -6 : 6, -4], jaw: 0.3, seed: i }); });
    set(dl, { x: t > T.dali0 ? -80 * p(t, T.dali0, 0.4, E.outBack) : 0, r: -8 + Math.sin(t * 2) * 3 }); daliFace(dl, t, { feliz: 1, look: [-10, 0], ceja: 12, bigote: t > T.dali0 ? Math.sin(t * 14) * 8 : 0 });
    stampA(sel, t, T.dali0 + 0.25, -8);
  };
}, { sfx: false });
shakeAt(T.dali0 + 0.25, 0.3, 12);

/* L1 · según cuentan, menos de una hora… en un papel cualquiera (reloj que vuela + servilleta con garabato) */
headline(L(1) - 0.1, L(2) - 0.1, 'Menos de *una hora*', { size: 96, hlT: T.hora1 });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const mesa = box(cam, 0, 1180, 1080, 740, { zIndex: 2, background: '#8a5a32', borderTop: `8px solid ${INK}` });
  const rel = RELOJ(cam, 330, 440, 420);
  const serv = box(cam, 260, 940, 560, 360, { zIndex: 9, background: '#fff', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, transform: 'rotate(-4deg)', backgroundImage: 'radial-gradient(circle, rgba(43,33,24,.12) 3px, transparent 4px)', backgroundSize: '26px 26px' });
  const gar = box(serv, 40, 20, 480, 320, { zIndex: 2 }, `<svg viewBox="0 0 480 320" width="480" height="320"><path class="gp" d="M60,200 C80,60 200,40 240,150 C280,40 420,60 400,200 C380,300 120,300 100,220 C90,160 200,120 260,200" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="1400"/></svg>`);
  const cro = stamp(cam, 600, 420, '< 1 h', { size: 90, z: 30 });
  sp(T.cuentan, 'whoosh', 0.6); sp(T.hora1, 'tick', 0.8); sp(T.hora1 + 0.3, 'tick', 0.8); sp(T.hora1 + 0.6, 'stamp', 0.9); sp(T.papel1, 'paper', 0.9);
  return t => {
    zoom(cam, t, L(1), 4, 0.07);
    giraReloj(rel, t, t > T.hora1 ? 3 : 0.3); set(rel, { s: pop(t, L(1) - 0.1, 0.4), r: Math.sin(t * 3) * 4 });
    stampA(cro, t, T.hora1 + 0.6, -10);
    set(serv, { o: t > T.papel1 - 0.2 ? 1 : 0, y: (1 - p(t, T.papel1 - 0.2, 0.4, E.outBack)) * 500 }); gar.querySelector('.gp').setAttribute('stroke-dashoffset', f1(1400 * (1 - p(t, T.papel1, 1.0, E.linear))));
  };
});

/* L2 · Barcelona 1958 (Sagrada Familia) → Enric Bernat se fija → los niños se sacan el caramelo… manos pegajosas */
headline(L(2) - 0.1, T.ninos - 0.1, 'Barcelona, *1958*', { size: 96, hlT: T.m1958 + 0.2 });
headline(T.ninos - 0.1, L(3) - 0.1, 'Manos *pegajosas*', { size: 96, hlT: T.pegaj });
plano(L(2) - 0.1, T.ninos - 0.1, { background: CIELOC }, c => {
  const cam = CAM(c);
  const ns = [[60, 420, 260], [700, 470, 240]].map(([x, y, w]) => NUBE(cam, x, y, w));
  const sf = box(cam, 600, 520, 460, 820, { zIndex: 3 }, `<svg viewBox="0 0 460 820" width="460" height="820">${[[60, 140, 760], [160, 40, 820], [260, 60, 800], [360, 160, 740]].map(([x, top, h]) => `<path d="M${x},820 V${top + 120} L${x + 40},${top} L${x + 80},${top + 120} V820 Z" fill="#c9a882" stroke="${INK}" stroke-width="6"/><circle cx="${x + 40}" cy="${top + 10}" r="12" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`).join('')}${[...Array(10)].map((_, i) => `<rect x="${70 + (i % 4) * 100}" y="${400 + Math.floor(i / 4) * 120}" width="22" height="60" rx="11" fill="${INK}" opacity=".6"/>`).join('')}</svg>`);
  box(cam, 0, 1330, 1080, 600, { zIndex: 4, background: '#b98c5a', borderTop: `8px solid ${INK}` });
  const ber = mkBust(cam, [160, 620, 440, 563], { moustache: true, seed: 201 });
  const nom = chip(cam, 330, 1210, 'Enric Bernat', { size: 58, bg: '#fff', color: INK });
  const bomb = box(cam, 420, 600, 160, 160, { zIndex: 12, fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', color: RED, textAlign: 'center' }, '!');
  sp(T.bcn, 'whoosh', 0.6); sp(T.bernat, 'pop', 0.7); sp(T.fija, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(2), 4, 0.06); ns.forEach((n, i) => set(n, { x: Math.sin(t * 0.6 + i) * 50 }));
    set(sf, { s: pop(t, L(2) - 0.1, 0.4) });
    set(ber.d, { o: t > T.bernat - 0.2 ? 1 : 0, y: (1 - p(t, T.bernat - 0.2, 0.4, E.outBack)) * 400 }); face(ber, t, { look: [10, -2], bL: t > T.fija ? 12 : 4, bR: t > T.fija ? 12 : 4, jaw: t > T.fija && t < T.fija + 0.5 ? 0.4 : 0, seed: 0.3 });
    popA(nom, t, T.bernat + 0.2, { r: -3 }); set(bomb, { o: t > T.fija ? 1 : 0, s: pop(t, T.fija, 0.3), r: Math.sin(t * 6) * 10 });
  };
});
plano(T.ninos - 0.1, L(3) - 0.1, { background: '#f4efe2', backgroundImage: `linear-gradient(45deg, rgba(43,74,140,.14) 25%, transparent 25%, transparent 75%, rgba(43,74,140,.14) 75%), linear-gradient(45deg, rgba(43,74,140,.14) 25%, transparent 25%, transparent 75%, rgba(43,74,140,.14) 75%)`, backgroundSize: '120px 120px', backgroundPosition: '0 0, 60px 60px' }, c => {
  const cam = CAM(c);
  const nin = NINO(cam, 300, 620, 480);
  const car = box(cam, 600, 620, 150, 150, { zIndex: 12, borderRadius: '50%', background: '#e8507a', border: `7px solid ${INK}` });
  const manos = [0, 1].map(i => box(cam, i ? 700 : 190, 1050, 200, 200, { zIndex: 13 }, `<svg viewBox="-60 -70 120 120" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, i ? 20 : -20, 1.4)}</svg>`));
  const gotas = [...Array(6)].map((_, i) => box(cam, 0, 0, 28, 40, { zIndex: 14, background: '#e8507a', border: `4px solid ${INK}`, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }));
  const puaj = BOCADILLO(cam, 560, 480, '¡puaj!', { size: 66 });
  sp(T.sacan, 'pop2', 0.7); sp(T.pegaj, 'gulp', 0.9); sp(T.pegaj + 0.3, 'boing', 0.6);
  return t => {
    zoom(cam, t, T.ninos, 3, 0.07);
    set(nin, { s: pop(t, T.ninos - 0.1, 0.4) }); ninoFace(nin, t, { look: [8, -2], jaw: t < T.sacan ? Math.abs(Math.sin(t * 9)) * 0.4 : 0.5, feliz: t > T.pegaj ? -1 : 1, ceja: t > T.pegaj ? 14 : 0 });
    const ks = p(t, T.sacan, 0.5, E.outCubic); set(car, { x: ks * 120, y: ks * 360, r: ks * 60 });
    manos.forEach((m, i) => set(m, { o: t > T.sacan + 0.3 ? 1 : 0, y: Math.sin(t * 4 + i) * 10, r: Math.sin(t * 3 + i) * 6 }));
    gotas.forEach((g, i) => { const k = ((t * 0.9) + i / 6) % 1; set(g, { o: t > T.pegaj ? 1 - k : 0, x: (i % 2 ? 780 : 270) + (i % 3) * 20, y: 1180 + k * 140 }); });
    popA(puaj, t, T.pegaj + 0.3, { r: 5 });
  };
});

/* L3 · le pone un palo (el palo entra en el caramelo) → como con tenedor (comparación) → «Chups»… y luego «CHUPA CHUPS» */
headline(L(3) - 0.1, L(4) - 0.1, 'Un caramelo *con palo*', { size: 92, hlT: T.palo + 0.2 });
plano(L(3) - 0.1, L(4) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const bola = box(cam, 270, 480, 300, 300, { zIndex: 9, borderRadius: '50%', background: '#e8507a', border: `8px solid ${INK}` });
  const palo = box(cam, 404, 780, 34, 420, { zIndex: 8, background: '#fff', border: `6px solid ${INK}`, borderRadius: '16px' });
  const ten = box(cam, 640, 470, 200, 640, { zIndex: 8 }, `<svg viewBox="0 0 200 640" width="200" height="640"><path d="M40,0 V160 M80,0 V160 M120,0 V160 M160,0 V160" stroke="#b8bec5" stroke-width="18" stroke-linecap="round"/><path d="M30,150 H170 C170,230 130,250 110,260 V640 H90 V260 C70,250 30,230 30,150 Z" fill="#b8bec5" stroke="${INK}" stroke-width="7"/><circle cx="100" cy="80" r="62" fill="#e8507a" stroke="${INK}" stroke-width="7"/></svg>`);
  const ig = texto(cam, 760, '≈', { size: 160, x: 520, w: 140, z: 12 });
  const n1 = stamp(cam, 280, 1220, 'CHUPS', { size: 100, col: ROJO, z: 30 });
  const n2 = stamp(cam, 200, 1220, 'CHUPA CHUPS', { size: 100, col: ROJO, z: 31, bg: 'rgba(255,255,255,.95)', blend: 'normal' });
  sp(T.palo + 0.3, 'pop2', 0.9); sp(T.tenedor, 'ding', 0.7); sp(T.chups + 0.3, 'stamp', 0.8); sp(T.chupa3 + 0.4, 'stamp', 1); sp(T.chupa3 + 0.5, 'tada', 0.6);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(3), 4, 0.06);
    set(bola, { y: -Math.abs(Math.sin(t * 4)) * 16, s: pop(t, L(3) - 0.1, 0.4) });
    set(palo, { y: (1 - p(t, T.palo + 0.1, 0.35, E.outBack)) * 700 - Math.abs(Math.sin(t * 4)) * 16, o: t > T.palo ? 1 : 0 });
    set(ten, { o: t > T.tenedor - 0.15 ? 1 : 0, s: pop(t, T.tenedor - 0.15, 0.35), r: 8 }); set(ig, { o: t > T.tenedor ? 1 : 0 });
    stampA(n1, t, T.chups + 0.3, -6); set(n1, { o: t > T.chups + 0.3 && t < T.chupa3 + 0.35 ? 1 : 0 }); stampA(n2, t, T.chupa3 + 0.4, -6);
  };
});
shakeAt(T.chupa3 + 0.4, 0.3, 12);

/* L4 · funciona tanto que quiere conquistar el mundo (globo con banderitas de chupa chups) → necesita un logo que se entienda en cualquier idioma */
headline(L(4) - 0.1, L(5) - 0.1, 'A conquistar *el mundo*', Object.assign({ size: 90, hlT: T.mundo + 0.2 }, BL));
plano(L(4) - 0.1, L(5) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const est = [...Array(14)].map((_, i) => { const e = ESTRELLA(cam, 30, '#f4efe2'); e.style.left = px(40 + (i * 173) % 1000); e.style.top = px(360 + (i * 97) % 1100); e.style.zIndex = 1; return e; });
  const globo = box(cam, 240, 520, 600, 600, { zIndex: 5, borderRadius: '50%', background: '#5c87b5', border: `9px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, overflow: 'hidden' });
  const cont = box(globo, 0, 0, 1200, 600, { zIndex: 1 }, `<svg viewBox="0 0 1200 600" width="1200" height="600"><path d="M80,120 C180,60 260,140 240,240 C220,320 140,300 120,380 C100,460 60,420 40,320 Z M360,80 C460,40 560,100 540,200 C520,280 420,260 400,340 C380,420 460,480 420,540 C340,520 300,400 320,300 C330,200 300,140 360,80 Z M680,120 C820,80 900,160 880,260 C860,360 760,340 720,280 Z" fill="#7a9a52" stroke="${INK}" stroke-width="6"/><use href="#x"/><path d="M680,120 C820,80 900,160 880,260 C860,360 760,340 720,280 Z" transform="translate(600,0)" fill="#7a9a52" stroke="${INK}" stroke-width="6"/><path d="M80,120 C180,60 260,140 240,240 C220,320 140,300 120,380 C100,460 60,420 40,320 Z M360,80 C460,40 560,100 540,200 C520,280 420,260 400,340 C380,420 460,480 420,540 C340,520 300,400 320,300 C330,200 300,140 360,80 Z" transform="translate(600,0)" fill="#7a9a52" stroke="${INK}" stroke-width="6"/></svg>`);
  const ban = [0, 1, 2, 3].map(i => CHUPA(cam, 0, 0, 90, { col: ['#e8507a', '#f28c28', '#7ab35a', '#9b6bd6'][i] }));
  const bocs = [['¿Qué?', 60, 1180], ['What?', 720, 1180], ['Quoi ?', 80, 420], ['Was?', 760, 440]].map(([s, x, y]) => BOCADILLO(cam, x, y, s, { size: 50 }));
  sp(T.funciona, 'cash', 0.7); sp(T.mundo, 'whoosh', 0.8); bocs.forEach((_, i) => sp(T.idioma - 0.6 + i * 0.25, 'pop', 0.5));
  return t => {
    zoom(cam, t, L(4), 5, 0.06); est.forEach((e, i) => set(e, { o: 0.5 + 0.5 * Math.sin(t * 4 + i) }));
    set(globo, { s: pop(t, L(4) - 0.1, 0.45) }); set(cont, { x: -((t * 120) % 600) });
    ban.forEach((b, i) => { const a = t * 1.2 + i * 1.57; set(b, { o: t > T.mundo + i * 0.15 ? 1 : 0, x: 540 + Math.cos(a) * 360 - 45, y: 820 + Math.sin(a) * 360 - 96, r: Math.cos(a) * 30 }); chFace(b, t, { feliz: 1, seed: i }); });
    bocs.forEach((b, i) => popA(b, t, T.idioma - 0.6 + i * 0.25, { r: (i % 2 ? 4 : -4) }));
  };
});

/* L5 · se le ocurre pedírselo al artista más famoso de España (foco, reloj blando) → ¡SALVADOR DALÍ! (bigote en movimiento) */
headline(L(5) - 0.1, L(6) - 0.1, 'El más famoso: *Dalí*', { size: 96, hlT: T.dali5 });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 30px, transparent 30px 60px)' }, c => {
  const cam = CAM(c);
  const foco = box(cam, 290, 300, 500, 1300, { zIndex: 2, background: 'linear-gradient(180deg, rgba(255,250,200,.55), rgba(255,250,200,.05))', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' });
  const ber = mkBust(cam, [40, 760, 340, 435], { moustache: true, seed: 201 });
  const idea = box(cam, 120, 560, 160, 160, { zIndex: 14 }, `<svg viewBox="0 0 240 240" width="160" height="160"><path d="M120,20 C60,20 30,70 40,110 C50,150 90,160 90,190 H150 C150,160 190,150 200,110 C210,70 180,20 120,20 Z" fill="${GOLD}" stroke="${INK}" stroke-width="10"/><rect x="88" y="190" width="64" height="36" rx="8" fill="#9aa4ad" stroke="${INK}" stroke-width="8"/></svg>`);
  const dl = DALI(cam, 380, 640, 460);
  const rb = RELOJBLANDO(cam, 720, 1050, 300, 12);
  const cort = [0, 1].map(i => box(cam, i ? 560 : 300, 520, 260, 860, { zIndex: 20, background: '#b0303a', border: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 24px, transparent 24px 60px)' }));
  sp(T.ocurre, 'pop', 0.6); sp(T.artista, 'drumroll', 0.7); sp(T.dali5, 'tada', 0.9); sp(T.dali5 + 0.3, 'stamp', 0.6);
  return t => {
    zoom(cam, t, L(5), 4, 0.07);
    face(ber, t, { look: [10, -4], bL: 10, bR: 10, jaw: t > T.ocurre && t < T.artista ? 0.3 : 0, seed: 0.3 }); set(idea, { o: t > T.ocurre ? 1 : 0, s: pop(t, T.ocurre, 0.3) * (1 + 0.06 * Math.sin(t * 10)) });
    const ka = p(t, T.dali5 - 0.25, 0.5, E.inOutCubic); cort.forEach((k, i) => set(k, { x: (i ? 1 : -1) * ka * 300, o: 1 - ka }));
    set(dl, { y: -Math.abs(Math.sin(t * 3)) * 10 }); daliFace(dl, t, { feliz: 1, ceja: 14, look: [0, -2], jaw: t > T.dali5 ? 0.5 : 0, bigote: t > T.dali5 ? Math.sin(t * 16) * 12 : 0 });
    set(rb, { r: Math.sin(t * 2) * 6, o: t > T.dali5 + 0.3 ? 1 : 0, s: pop(t, T.dali5 + 0.3, 0.4) });
  };
});
shakeAt(T.dali5 + 0.3, 0.3, 12);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · 1969, un café: Dalí y Bernat en la mesa; tazas humeantes; Dalí se pone a garabatear (lápiz que corre) */
headline(L(7) - 0.1, L(8) - 0.1, '*1969*: un café', { size: 100, hlT: T.m1969 + 0.3 });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const ven = box(cam, 320, 380, 440, 380, { zIndex: 2, background: CIELOC, border: `10px solid ${INK}` }, `<svg viewBox="0 0 420 360" width="420" height="360"><path d="M210,0 V360 M0,180 H420" stroke="${INK}" stroke-width="8"/><path d="M40,300 C120,240 300,260 380,300" stroke="#5c87b5" stroke-width="14" fill="none"/></svg>`);
  const ber = mkBust(cam, [250, 700, 360, 461], { moustache: true, seed: 201 });
  const dl = DALI(cam, 660, 660, 380);
  const mesa = box(cam, 0, 1150, 1080, 770, { zIndex: 9, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const tazas = [0, 1].map(i => box(cam, i ? 760 : 200, 1060, 140, 110, { zIndex: 10 }, `<svg viewBox="0 0 140 110" width="140" height="110"><path d="M10,10 H110 V70 C110,100 10,100 10,70 Z" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M110,30 C140,30 140,70 110,66" stroke="${INK}" stroke-width="6" fill="none"/><ellipse cx="60" cy="14" rx="46" ry="8" fill="#6b4a2a"/></svg>`));
  const hum = [0, 1, 2, 3].map(i => box(cam, (i < 2 ? 230 : 790) + (i % 2) * 40, 900, 30, 140, { zIndex: 10, borderLeft: `7px solid rgba(255,255,255,.8)`, borderRadius: '50%' }));
  const serv = box(cam, 380, 1180, 380, 260, { zIndex: 11, background: '#fff', border: `6px solid ${INK}`, transform: 'rotate(4deg)' });
  const gar = box(serv, 20, 20, 340, 220, { zIndex: 2 }, `<svg viewBox="0 0 340 220" width="340" height="220"><path class="gp" d="M30,150 C50,40 150,30 170,110 C190,30 300,40 300,150 C290,210 60,210 70,160 Z M120,110 C150,90 190,90 220,110" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="1100" stroke-dashoffset="1100"/></svg>`);
  const lap = box(cam, 0, 0, 60, 240, { zIndex: 13, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 60 240" width="60" height="240"><rect x="10" y="0" width="40" height="200" fill="${AMA}" stroke="${INK}" stroke-width="5"/><path d="M10,200 L30,240 L50,200 Z" fill="#e8c79a" stroke="${INK}" stroke-width="5"/></svg>`);
  sp(T.m1969, 'whoosh', 0.6); sp(T.cafe, 'pop2', 0.7); sp(T.mismo, 'paper', 0.7); sp(T.garab, 'scratch', 0.9); sp(T.garab + 0.4, 'scratch', 0.7);
  return t => {
    zoom(cam, t, L(7), 4, 0.06);
    face(ber, t, { look: [10, 4], bL: 6, bR: 6, jaw: t > T.cafe && t < T.cafe + 0.5 ? 0.3 : 0, seed: 0.3 }); daliFace(dl, t, { feliz: 1, look: [-6, 8], ceja: t > T.mismo ? 12 : 4, bigote: Math.sin(t * 5) * 6 });
    tazas.forEach((d, i) => set(d, { s: pop(t, T.cafe - 0.1 + i * 0.15, 0.35) })); hum.forEach((h, i) => set(h, { y: -((t * 70 + i * 40) % 100), x: Math.sin(t * 3 + i) * 10, o: t > T.cafe ? 0.9 : 0 }));
    set(serv, { o: t > T.mismo - 0.1 ? 1 : 0, s: pop(t, T.mismo - 0.1, 0.35) }); const kg = p(t, T.garab - 0.2, 1.6, E.linear); gar.querySelector('.gp').setAttribute('stroke-dashoffset', f1(1100 * (1 - kg)));
    set(lap, { o: t > T.garab - 0.2 && kg < 1 ? 1 : 0, x: 430 + Math.sin(t * 12) * 120, y: 1000 + Math.cos(t * 9) * 60, r: 20 });
  };
});

/* L8 · una margarita amarilla (pétalos que se dibujan uno a uno), el nombre en rojo… y, dicen, en menos de una hora (reloj rápido) */
headline(L(8) - 0.1, L(9) - 0.1, 'Una *margarita*', { size: 100, hlT: T.margarita + 0.3 });
plano(L(8) - 0.1, L(9) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const lg = box(cam, 240, 440, 600, 600, { zIndex: 9 });
  const rel = RELOJ(cam, 720, 1080, 260, 12);
  const dl = DALI(cam, 40, 1040, 280); dl.style.zIndex = 11;
  const hr = stamp(cam, 330, 1180, '< 1 HORA', { size: 80, z: 30 });
  [...Array(10)].forEach((_, i) => sp(T.margarita + 0.2 + i * 0.09, 'pop', 0.3)); sp(T.rojo, 'stamp', 0.7); sp(T.hora8, 'tick', 0.7); sp(T.hora8 + 0.4, 'stamp', 0.9);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(8), 3, 0.07);
    const k = clamp(p(t, T.margarita + 0.2, 0.9, E.linear) * 0.79 + (t > T.rojo ? 0.21 : 0)); lg.innerHTML = `<svg viewBox="0 0 300 300" width="600" height="600">${margarita(k)}</svg>`; set(lg, { r: Math.sin(t * 2) * 4 });
    set(rel, { o: t > T.dicen - 0.1 ? 1 : 0, s: pop(t, T.dicen - 0.1, 0.35) }); giraReloj(rel, t, 4);
    daliFace(dl, t, { feliz: 1, look: [10, -6], ceja: 10, bigote: Math.sin(t * 10) * 8 }); set(dl, { x: -40 + Math.sin(t * 2) * 10 });
    stampA(hr, t, T.hora8 + 0.4, -8);
  };
});

/* L9 · [susurro] lo genial es DÓNDE lo pone: encima, no en un lado → dos caramelos girando: el del lado desaparece, el de encima se ve siempre */
headline(L(9) - 0.1, T.encima - 0.1, 'Lo genial *no es el dibujo*', Object.assign({ size: 84, hlT: T.genial + 0.3 }, BL));
headline(T.encima - 0.1, L(10) - 0.1, 'Arriba *se ve siempre*', { size: 92, hlT: T.entero });
plano(L(9) - 0.1, T.encima - 0.1, { background: '#2b3550' }, c => {
  const cam = CAM(c);
  const foco = box(cam, 240, 300, 600, 1300, { zIndex: 2, background: 'linear-gradient(180deg, rgba(255,250,200,.5), rgba(255,250,200,0))', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' });
  const ch = CHUPA(cam, 360, 560, 360, { logo: 'top' });
  const lupa = box(cam, 0, 0, 300, 380, { zIndex: 15 }, `<svg viewBox="0 0 300 380" width="300" height="380"><path d="M200,230 L280,360" stroke="#8a5a32" stroke-width="34" stroke-linecap="round"/><circle cx="130" cy="140" r="115" fill="rgba(200,235,250,.35)" stroke="${INK}" stroke-width="14"/></svg>`);
  const chs = texto(cam, 1180, 'chsss…', { size: 90, italic: true, color: '#f4efe2', x: 500, w: 500, z: 12 });
  sp(T.genial, 'sparkle', 0.6); sp(T.donde, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(9), 3, 0.08); set(ch, { r: Math.sin(t * 2) * 4 }); chFace(ch, t, { feliz: 1, look: [0, -8], ceja: 10 }, true);
    set(lupa, { x: lerp(800, 380, p(t, T.donde - 0.3, 0.6, E.inOutCubic)), y: lerp(1100, 470, p(t, T.donde - 0.3, 0.6, E.inOutCubic)), r: Math.sin(t * 2) * 5 });
    set(chs, { o: t < T.donde ? 0.6 + 0.4 * Math.sin(t * 6) : 0, r: -4 });
  };
});
plano(T.encima - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const a = CHUPA(cam, 110, 520, 330, { logo: 'lado' }), b = CHUPA(cam, 640, 520, 330, { logo: 'top' });
  const la = chip(cam, 150, 460, 'en un lado', { size: 52, bg: '#fff', color: INK }), lb = chip(cam, 690, 460, 'encima', { size: 52, bg: YEL, color: INK });
  const x = box(cam, 120, 560, 300, 300, { zIndex: 14 }, XSVG), ok = box(cam, 760, 470, 220, 220, { zIndex: 14 }, CHECK);
  const flechas = box(cam, 600, 1240, 420, 120, { zIndex: 12 }, `<svg viewBox="0 0 420 120" width="420" height="120"><path d="M40,60 C120,10 300,10 380,60" stroke="${INK}" stroke-width="10" fill="none"/><path d="M380,60 L350,30 M380,60 L340,76" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></svg>`);
  sp(T.encima, 'pop2', 0.7); sp(T.lado, 'pop2', 0.7); sp(T.entero, 'ding', 0.8); sp(T.gires, 'whoosh', 0.7); sp(T.gires + 0.4, 'stamp', 0.8);
  return t => {
    zoom(cam, t, T.encima, 3, 0.05);
    const gira = t > T.entero ? Math.cos((t - T.entero) * 5) : 1; set(a, { sx: gira, r: Math.sin(t * 3) * 3 }); set(b, { r: Math.sin(t * 3 + 1) * 3 });
    a.querySelector('.lado').setAttribute('opacity', gira > 0 ? 1 : 0); chFace(a, t, { feliz: gira > 0 ? 0 : -1, ceja: 12, look: [8, 0] }); chFace(b, t, { feliz: 1, jaw: 0.4, ceja: 8, look: [-6, -2] }, true);
    popA(la, t, T.lado, { r: -3 }); popA(lb, t, T.encima, { r: 3 });
    set(x, { o: t > T.entero + 0.6 ? 1 : 0, s: pop(t, T.entero + 0.6, 0.3) }); stampA(ok, t, T.gires + 0.4, -8);
    set(flechas, { o: t > T.entero ? 1 : 0, r: Math.sin(t * 5) * 6 });
  };
});
shakeAt(T.gires + 0.4, 0.3, 12);

/* L10 · [risa] ese logo llegó hasta el espacio: 1995, unos Chupa Chups suben a la estación Mir (flotando, cosmonauta) */
headline(L(10) - 0.1, L(11) - 0.1, 'Hasta *el espacio*', Object.assign({ size: 100, hlT: T.espacio }, BL));
plano(L(10) - 0.1, L(11) - 0.1, { background: '#0f1526' }, c => {
  const cam = CAM(c);
  const est = [...Array(22)].map((_, i) => { const e = ESTRELLA(cam, 26 + (i % 3) * 10, '#f4efe2'); e.style.left = px(30 + (i * 137) % 1020); e.style.top = px(340 + (i * 89) % 1300); e.style.zIndex = 1; return e; });
  const tierra = box(cam, -200, 1300, 1480, 900, { zIndex: 2, borderRadius: '50%', background: '#5c87b5', border: `10px solid ${INK}`, backgroundImage: 'radial-gradient(circle at 30% 20%, #7a9a52 0 120px, transparent 121px), radial-gradient(circle at 70% 30%, #7a9a52 0 90px, transparent 91px)' });
  const mir = box(cam, 120, 520, 840, 340, { zIndex: 5 }, `<svg viewBox="0 0 840 340" width="840" height="340"><rect x="300" y="130" width="260" height="90" rx="40" fill="#dfe3e8" stroke="${INK}" stroke-width="7"/><rect x="560" y="145" width="140" height="60" rx="26" fill="#cfd5dc" stroke="${INK}" stroke-width="6"/><rect x="200" y="148" width="110" height="54" rx="24" fill="#cfd5dc" stroke="${INK}" stroke-width="6"/><g fill="#2b4a8c" stroke="${INK}" stroke-width="5"><rect x="20" y="40" width="170" height="80"/><rect x="20" y="230" width="170" height="80"/><rect x="700" y="40" width="130" height="80"/><rect x="700" y="230" width="130" height="80"/></g><path d="M105,120 V230 M765,120 V230 M190,175 H200 M700,175 H690" stroke="${INK}" stroke-width="7"/><text x="430" y="188" text-anchor="middle" font-family="Rye" font-size="40" fill="${INK}">MIR</text></svg>`);
  const fl = [0, 1, 2].map(i => CHUPA(cam, 0, 0, 140, { logo: 'top', col: ['#e8507a', '#f28c28', '#7ab35a'][i] }));
  const anio = stamp(cam, 360, 1000, '1995', { size: 110, col: GOLD, z: 30, bg: 'rgba(15,21,38,.85)', blend: 'normal' });
  sp(T.espacio, 'swoosh_up', 0.9); sp(T.m1995, 'stamp', 0.8); sp(T.mir, 'sparkle', 0.8);
  return t => {
    zoom(cam, t, L(10), 5, 0.06); est.forEach((e, i) => set(e, { o: 0.4 + 0.6 * Math.abs(Math.sin(t * 2 + i)) }));
    set(tierra, { r: t * 3 }); set(mir, { s: pop(t, T.mir - 0.4, 0.5), o: t > T.mir - 0.4 ? 1 : 0, y: Math.sin(t * 1.5) * 12, r: Math.sin(t) * 2 });
    fl.forEach((f, i) => { const k = p(t, T.espacio - 0.2 + i * 0.2, 1.8, E.outCubic); set(f, { x: lerp(470, [160, 470, 800][i], k), y: lerp(1500, [880, 1100, 900][i], k) + Math.sin(t * 2 + i) * 20, r: t * 60 * (i % 2 ? 1 : -1), o: t > T.espacio - 0.2 + i * 0.2 ? 1 : 0 }); chFace(f, t, { feliz: 1, jaw: 0.5, ceja: 10, seed: i }, true); });
    stampA(anio, t, T.m1995, -6);
  };
});

/* L11 · OJO: lo del papel y la hora exacta cambia según quién lo cuente (servilleta vs periódico, reloj con «?») */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const sv = box(c, 120, 560, 380, 300, { zIndex: 6, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '44px', textAlign: 'center', lineHeight: '290px', color: INK, transform: 'rotate(-5deg)' }, 'servilleta');
  const pe = box(c, 580, 560, 380, 300, { zIndex: 6, background: '#f4efe2', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', lineHeight: '290px', color: INK, transform: 'rotate(4deg)', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.2) 0 4px, transparent 4px 22px)' }, 'periódico');
  const q = texto(c, 600, '¿?', { size: 150, color: RED, x: 420, w: 240, z: 12 });
  aparece(chip(c, 330, 960, 'según quién lo cuente', { size: 56, bg: YEL, color: INK }), T.cuente);
  return t => { set(sv, { r: -5 + Math.sin(t * 2) * 3 }); set(pe, { r: 4 - Math.sin(t * 2) * 3 }); set(q, { s: 1 + 0.08 * Math.sin(t * 7), r: Math.sin(t * 4) * 10 }); };
});

/* L12 · O sea: cada vez que te comías un Chupa Chups… tenías un Dalí en la boca (caramelo con bigote de Dalí) */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Cada Chupa Chups…', { size: 96 });
  const b = texto(c, 400, '…era un Dalí en la boca', { size: 82, italic: true, color: ROJO });
  const ch = CHUPA(c, 360, 560, 360, { logo: 'top', bigote: true });
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.boca - 0.2 ? 1 : 0, s: pop(t, T.boca - 0.2, 0.35) }); set(ch, { r: Math.sin(t * 4) * 5 }); chFace(ch, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.6, ceja: 12 }, true); ch.querySelector('.big').setAttribute('transform', `rotate(${f1(Math.sin(t * 10) * 6)} 150 238)`); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.boca, 'stamp', 0.8);

/* L13 · pregunta final (confesión pícara) */
preguntaFinal('¿Lo chupabas hasta el final…', '…o lo mordías?', { size: 76, draw: c => [['hasta el palo', YEL], ['a mordiscos', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 40, 620 + i * 160, s, { size: 58, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(79, 'El logo de Chupa Chups', ['CHUPA CHUPS', 'y Dalí']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.pegaj + 0.3, T.pegaj + 1.1], [T.espacio, T.espacio + 1.0], [T.boca, T.boca + 1.0]], sorpresa: [[T.dali5, T.dali5 + 0.8], [T.hora8, T.hora8 + 0.8], [T.mir, T.mir + 0.8]], golpes: [T.hora1 + 0.6, T.chupa3 + 0.4, T.dali5 + 0.3, T.garab, T.gires + 0.4, T.m1995] },
});
