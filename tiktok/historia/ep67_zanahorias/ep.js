/* Ep. 67 · Las zanahorias no te hacen ver mejor (propaganda del radar) — edición estilo ep07 OK / ep64 kétchup */
Story.prepara();
const T = {
  abuela0: Q('tu abuela'), mintio: Q('te mintió'), zana0: Q('zanahorias'),
  ejercito: Q('no fue culpa suya'), esconder: Q('la engañó'), arma: Q('servicio secreto'),
  guerra2: Q('mil novecientos cuarenta'), noche2: Q('cada noche'), aviones: Q('llegan los'), bomb: Q('bombarderos alemanes'), apaga: Q('apaga todas las luces'),
  pilotos3: Q('un piloto inglés'), derribar: Q('derribarlos'), oscuras: Q('a oscuras'), uno: Q('se llama'), john: Q('john cunningham'),
  u1: Q('uno'), u2: Q('dos'), u5: Q('cinco'), veinte: Q('veinte'), periodicos: Q('los periódicos'), mote: Q('un mote'), gato: Q('ojos de gato'),
  como5: Q('cómo puede'), gobierno: Q('el gobierno'), otra: Q('la explicación'), comen: Q('come'), muchisimas: Q('muchísimas zanahorias'),
  creen: Q('el país entero'), casa7: Q('a por zanahorias'), carteles: Q('carteles'), recetas: Q('recetas'), personaje: Q('un personaje'), doctor: Q('doctor zanahoria'),
  secreto: Q('el secreto de verdad'), montado: Q('en el avión'), radar: Q('un radar diminuto'), enemigo: Q('veía en la oscuridad'), saberlo: Q('por él'),
  alemanes9: Q('si los alemanes'), copiaban: Q('lo copiaban'), dar: Q('había que darles'), naranja: Q('naranja'),
  ahi9: Q('el bulo funcionó'), abuela1: Q('ochenta años'), abuela2: Q('te lo seguía'), ati: Q('diciendo tu abuela'),
  ojo: Q('ojo'), engano: Q('engañó a los alemanes'),
  osea: Q('o sea'), pequeno: Q('para ver mejor'), propaganda: Q('propaganda de guerra'),
};
T.mejor0 = T.mintio; T.tumba = T.u1;
const NARANJA = '#f28c28', VERDE = '#4c8a3a', CREMA = '#FBF6EA', NOCHE = '#1f2a44', RAF = '#6b7a4a', LUFT = '#7d8790', HIERRO = '#9aa4ad';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });

/* ---------- figuras ---------- */
const ZB = 'M40,100 C40,64 160,64 160,100 L110,404 C106,418 94,418 90,404 Z';
const zanaInner = (o = {}) => `<path d="M100,72 C80,30 50,20 30,26 C60,40 80,56 92,74 M100,72 C100,30 110,6 128,0 C116,30 108,52 104,74 M100,72 C130,36 160,34 178,44 C148,48 124,60 108,78" fill="#7ab35a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  ${cut(P(ZB), 7, 9)}<path d="${ZB}" fill="${NARANJA}" stroke="${INK}" stroke-width="6"/><path d="${ZB}" fill="url(#hA)" opacity=".35"/>
  <path d="M60,220 q20,6 34,0 M118,280 q16,6 26,0 M80,330 q14,6 24,0" stroke="${INK}" stroke-width="4" fill="none" opacity=".55"/>
  <g class="zc"><path d="M62,114 q16,-10 32,0 M106,114 q16,-10 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <g class="ze"><ellipse cx="78" cy="140" rx="${o.buho ? 26 : 16}" ry="${o.buho ? 28 : 18}" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="122" cy="140" rx="${o.buho ? 26 : 16}" ry="${o.buho ? 28 : 18}" fill="#fff" stroke="${INK}" stroke-width="4"/></g>
  <g class="zp"><circle cx="80" cy="143" r="${o.buho ? 12 : 7}" fill="${INK}"/><circle cx="124" cy="143" r="${o.buho ? 12 : 7}" fill="${INK}"/></g>
  <path class="zm" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  ${o.chistera ? `<g><rect x="50" y="-40" width="100" height="90" rx="6" fill="${INK}"/><rect x="30" y="44" width="140" height="18" rx="8" fill="${INK}"/><rect x="50" y="20" width="100" height="14" fill="${PINK}"/></g>` : ''}
  ${o.gafas ? `<path d="M52,140 a26,26 0 1 0 52,0 a26,26 0 1 0 -52,0 M96,140 a26,26 0 1 0 52,0 a26,26 0 1 0 -52,0" stroke="${INK}" stroke-width="5" fill="none"/>` : ''}`;
/* abuela con moño y gafas (caraF: ojos .ae, pupilas .ap, boca .am, cejas .ac) */
const ABUELA = (c, x, y, w) => figura(c, x, y, w, w * 1.2, `<path d="M40,360 C40,280 90,250 150,250 C210,250 260,280 260,360 Z" fill="#c86a8a" stroke="${INK}" stroke-width="7"/><path d="M110,262 L150,320 L190,262" fill="#f4efe2" stroke="${INK}" stroke-width="5"/>
  <circle cx="150" cy="58" r="42" fill="#d9d9d9" stroke="${INK}" stroke-width="6"/><circle cx="150" cy="170" r="100" fill="#f2c9a0" stroke="${INK}" stroke-width="7"/>
  <path d="M52,160 C50,90 100,64 150,64 C200,64 250,90 248,160 C230,120 190,104 150,104 C110,104 70,120 52,160 Z" fill="#d9d9d9" stroke="${INK}" stroke-width="6"/>
  <circle cx="92" cy="200" r="16" fill="#f29a9a" opacity=".6"/><circle cx="208" cy="200" r="16" fill="#f29a9a" opacity=".6"/>
  <g class="ac"><path d="M96,132 q18,-10 36,0 M168,132 q18,-10 36,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <g class="ae"><ellipse cx="114" cy="162" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="186" cy="162" rx="14" ry="16" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="ap"><circle cx="116" cy="165" r="7" fill="${INK}"/><circle cx="188" cy="165" r="7" fill="${INK}"/></g>
  <path d="M84,162 a30,30 0 1 0 60,0 a30,30 0 1 0 -60,0 M156,162 a30,30 0 1 0 60,0 a30,30 0 1 0 -60,0 M144,160 H156" stroke="${INK}" stroke-width="5" fill="rgba(255,255,255,.15)"/>
  <path class="am" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`, '0 0 300 360', { z: 8, origin: '50% 100%' });
const abFace = (f, t, o = {}) => caraF(f, t, o, 162, [150, 222, 22, '.am', '.ap', '.ae', '.ac']);
const ZANA = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 2.1, zanaInner(o), '0 -40 200 460', Object.assign({ z: 9, origin: '50% 60%' }, o));
const zFace = (f, t, o = {}) => caraF(f, t, o, 140, [100, 178, 18, '.zm', '.zp', '.ze', '.zc']);
/* avión de perfil (mira a la derecha); cruz = alemán */
const avionInner = (col, cruz, radar) => `<path d="M30,120 C40,90 120,82 300,84 C360,86 400,100 410,118 C400,136 360,148 300,150 C120,152 40,146 30,120 Z" fill="${col}" stroke="${INK}" stroke-width="7"/><path d="M30,120 C40,90 120,82 300,84 C360,86 400,100 410,118" fill="none" stroke="#fff" stroke-width="6" opacity=".35"/>
  <path d="M40,110 L10,50 L70,52 L100,104 Z" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M160,120 L120,214 L210,214 L250,120 Z" fill="${col}" stroke="${INK}" stroke-width="6"/>
  <path d="M290,90 C300,70 340,70 350,92 Z" fill="#c8e6f5" stroke="${INK}" stroke-width="5"/>
  ${cruz ? `<path d="M170,104 H210 M190,84 V124" stroke="${INK}" stroke-width="16"/><path d="M170,104 H210 M190,84 V124" stroke="#fff" stroke-width="6"/>` : `<circle cx="190" cy="118" r="22" fill="#2b4a8c" stroke="${INK}" stroke-width="4"/><circle cx="190" cy="118" r="13" fill="#fff"/><circle cx="190" cy="118" r="6" fill="${RED}"/>`}
  <g class="helice"><path d="M412,70 V170" stroke="${INK}" stroke-width="10" stroke-linecap="round"/></g><circle cx="412" cy="118" r="12" fill="${INK}"/>
  ${radar ? `<path d="M405,104 L470,90 M405,132 L470,146 M440,96 V140" stroke="${INK}" stroke-width="5"/>` : ''}`;
const AVION = (c, x, y, w, col, cruz, radar) => { const f = figura(c, x, y, w, w * 230 / 480, avionInner(col, cruz, radar), '0 0 480 230', { z: 9, origin: '50% 50%' }); f.hel = f.querySelector('.helice'); return f; };
const gira = (f, t) => f.hel && f.hel.setAttribute('transform', `translate(412 118) scale(1 ${f1(Math.cos(t * 50))}) translate(-412 -118)`);
const ciudad = (c, z = 3) => { const d = box(c, 0, 900, 1080, 1100, { zIndex: z }); let s = '', w = ''; const R = rng(44);
  [[0, 300, 160], [150, 220, 130], [270, 360, 150], [410, 260, 120], [520, 140, 90], [600, 320, 170], [760, 240, 150], [900, 340, 180]].forEach(([x, h, ww]) => { s += `<rect x="${x}" y="${600 - h}" width="${ww}" height="${h + 600}" fill="#2b3550" stroke="${INK}" stroke-width="5"/>`; for (let yy = 620 - h; yy < 560; yy += 50) for (let xx = x + 18; xx < x + ww - 24; xx += 36) w += `<rect class="win" x="${xx}" y="${yy}" width="18" height="26" fill="${R() > 0.25 ? '#ffe680' : '#3a4566'}"/>`; });
  s += `<rect x="520" y="140" width="90" height="460" fill="#3a4566" stroke="${INK}" stroke-width="5"/><path d="M510,140 L565,40 L620,140 Z" fill="#3a4566" stroke="${INK}" stroke-width="5"/><circle cx="565" cy="210" r="34" fill="#ffe680" stroke="${INK}" stroke-width="5"/><path d="M565,210 V186 M565,210 H582" stroke="${INK}" stroke-width="4"/>`;
  d.innerHTML = `<svg width="1080" height="1100" style="overflow:visible">${s}${w}</svg>`; d.wins = [...d.querySelectorAll('.win')]; return d; };
const BUHO = (c, x, y, w) => figura(c, x, y, w, w * 1.15, `<path d="M40,80 L60,10 L100,60 L160,60 L200,10 L220,80 C250,160 230,280 130,290 C30,280 10,160 40,80 Z" fill="#8a5a32" stroke="${INK}" stroke-width="7"/><path d="M80,200 q50,40 100,0" stroke="${INK}" stroke-width="4" fill="none" opacity=".5"/><circle cx="90" cy="120" r="44" fill="#fff6c8" stroke="${INK}" stroke-width="6"/><circle cx="170" cy="120" r="44" fill="#fff6c8" stroke="${INK}" stroke-width="6"/><g class="bp"><circle cx="92" cy="122" r="20" fill="${INK}"/><circle cx="172" cy="122" r="20" fill="${INK}"/><circle cx="98" cy="114" r="6" fill="#fff"/><circle cx="178" cy="114" r="6" fill="#fff"/></g><path d="M120,150 L130,180 L140,150 Z" fill="${GOLD}" stroke="${INK}" stroke-width="4"/>`, '0 0 260 300', { z: 8, origin: '50% 100%' });
const ondas = (c, x, y) => [0, 1, 2, 3].map(i => box(c, x, y, 40, 40, { zIndex: 8, borderRadius: '50%', border: `8px solid #7ef0a0`, borderLeftColor: 'transparent', borderBottomColor: 'transparent' }));
const mueveOndas = (os, t, x, y, on) => os.forEach((o, i) => { const k = ((t * 1.2) + i / os.length) % 1; const r = 30 + k * 260; set(o, { o: on ? 1 - k : 0 }); o.style.left = px(x - r); o.style.top = px(y - r); o.style.width = px(2 * r); o.style.height = px(2 * r); o.style.transform = 'rotate(45deg)'; });

/* L0 · PORTADA (fotograma 0 completo): zanahoria con cara y gafas de culo de vaso que habla con la voz; ¡FALSO! */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'Tu abuela te mintió…', { size: 84 });
  const t2 = texto(c, 345, 'con las ' + hlSpan('ZANAHORIAS', 'phl'), { size: 88, italic: true });
  const ab = ABUELA(c, 40, 540, 470);
  const z = ZANA(c, 520, 560, 260, { gafas: true });
  const hs = [[820, 900, 0], [900, 1140, 1], [500, 1150, 2], [730, 1190, 3]].map(([x, y, i]) => ZANA(c, x, y, 150, {}));
  const cartel = box(c, 780, 560, 260, 120, { zIndex: 12, background: CREMA, border: `6px solid ${INK}`, borderRadius: '14px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '46px', textAlign: 'center', lineHeight: '108px', color: INK }, 'E F P T');
  const fal = stamp(c, 330, 1060, '¡BULO!', { size: 120, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sfx('swoosh_up', 0.05, 0.6); sp(T.mejor0 + 0.3, 'stamp', 1);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const hop = Math.abs(Math.sin(t * 5)); set(z, { y: -hop * 26, sy: 1 - 0.05 * (1 - hop), r: Math.sin(t * 2.5) * 4 });
    zFace(z, t, { jaw: 0.2, look: [-8, -2], feliz: t > T.mejor0 ? -1 : 1, ceja: t > T.mejor0 ? 14 : 0 }); abFace(ab, t, { jaw: talkW(t, 'VECINO'), look: [6, -2], feliz: 1, closed: t > T.mejor0 + 0.3 && t < T.mejor0 + 0.6 }); set(ab, { r: Math.sin(t * 2) * 2, y: -Math.abs(Math.sin(t * 3)) * 8 });
    hs.forEach((h, i) => { set(h, { y: -Math.abs(Math.sin(t * 5 + i * 1.3)) * 22, r: Math.sin(t * 4 + i) * 8 }); zFace(h, t, { feliz: 1, look: [i % 2 ? -6 : 6, -4], jaw: 0.3 + 0.3 * Math.sin(t * 8 + i), seed: i }); });
    set(cartel, { r: -6 + Math.sin(t * 2) * 2 });
    stampA(fal, t, T.mejor0 + 0.3, -8);
  };
}, { sfx: false });
shakeAt(T.mejor0 + 0.3, 0.3, 12);

/* L1 · «ese bulo lo inventó un ejército… para esconder un arma secreta»: archivador TOP SECRET que se cierra con candado */
headline(L(1) - 0.1, L(2) - 0.1, 'Un *engaño* de espías', { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, size: 96, hlT: T.esconder + 0.1 });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#6b7a4a', backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,.10) 0 30px, transparent 30px 60px)' }, c => {
  const cam = CAM(c);
  const gen = mkBust(cam, [60, 560, 420, 537], { hat: 'cap', uniform: 'officer', moustache: true, seed: 3 });
  const car = box(cam, 520, 520, 460, 600, { zIndex: 8, background: '#d8c3a0', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, borderRadius: '6px 30px 6px 6px' });
  el('div', car, { left: '30px', top: '30px', fontFamily: 'SpecialElite', fontSize: '40px', color: INK }, 'EXPEDIENTE Nº 1940');
  const caja = box(car, 80, 140, 290, 300, { background: CREMA, border: `6px solid ${INK}`, borderRadius: '16px' }, `<svg viewBox="0 0 290 300" width="290" height="300"><path d="M145,40 V120 M95,100 L145,140 L195,100" stroke="${INK}" stroke-width="10" fill="none"/><text x="145" y="230" text-anchor="middle" font-family="Rye" font-size="56" fill="${INK}">¿ ? ?</text></svg>`);
  const ts = stamp(cam, 520, 820, 'TOP SECRET', { size: 84, z: 30 });
  const cad = box(cam, 690, 960, 130, 150, { zIndex: 31 }, `<svg viewBox="0 0 130 150" width="130" height="150"><path d="M30,70 V40 a35,35 0 0 1 70,0 V70" stroke="${INK}" stroke-width="16" fill="none"/><rect x="10" y="66" width="110" height="80" rx="14" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="65" cy="104" r="10" fill="${INK}"/></svg>`);
  const sh = BOCADILLO(cam, 130, 440, '¡CHSSS!', { size: 70 });
  sp(T.ejercito, 'thud', 0.8); sp(T.esconder, 'paper', 0.7); sp(T.arma, 'stamp', 1); sp(T.arma + 0.4, 'click', 0.8);
  return t => {
    zoom(cam, t, L(1), 4, 0.08);
    face(gen, t, { look: [8, -2], jaw: t > T.esconder && t < T.arma ? 0.3 : 0, bL: t > T.arma ? 4 : 10, bR: 12, closed: t > T.arma + 0.4 && t < T.arma + 0.7, seed: 0.3 });
    set(gen.d, { s: pop(t, T.ejercito - 0.2, 0.4) });
    set(car, { s: pop(t, T.esconder - 0.2, 0.4), r: 2 + Math.sin(t * 2) });
    stampA(ts, t, T.arma, -10); set(cad, { o: t > T.arma + 0.4 ? 1 : 0, s: lerp(1.6, 1, p(t, T.arma + 0.4, 0.25, E.outCubic)) });
    popA(sh, t, T.arma + 0.2, { r: -5 });
  };
});
shakeAt(T.arma, 0.3, 14);

/* L2 · Segunda Guerra Mundial: los bombarderos alemanes sobre Londres de noche → ¡APAGÓN! la ciudad apaga todas las luces */
headline(L(2) - 0.1, L(3) - 0.1, 'Londres, *1940*', { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, size: 100, hlT: T.guerra2 + 0.3 });
plano(L(2) - 0.1, L(3) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const luna = box(cam, 780, 380, 180, 180, { zIndex: 2, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '50%', boxShadow: '0 0 80px rgba(255,255,220,.5)' });
  const focos = [180, 880].map((x, i) => box(cam, x - 60, 500, 120, 1100, { zIndex: 2, background: 'linear-gradient(0deg, rgba(255,250,200,.55), rgba(255,250,200,0))', transformOrigin: '50% 100%', clipPath: 'polygon(40% 100%, 60% 100%, 100% 0, 0 0)' }));
  const ci = ciudad(cam, 4);
  const bs = [0, 1, 2].map(i => AVION(cam, -500, 480 + i * 130, 340 - i * 40, LUFT, true));
  const bombas = [0, 1, 2, 3].map(i => box(cam, 0, 0, 26, 50, { zIndex: 7, background: INK, borderRadius: '50% 50% 40% 40%' }));
  const ap = stamp(cam, 300, 1140, '¡APAGÓN!', { size: 110, col: GOLD, z: 30, bg: 'rgba(31,42,68,.9)', blend: 'normal' });
  const sirena = texto(cam, 470, 'uuuuuuh…', { size: 70, italic: true, color: '#fff', x: 80, w: 500, z: 12 });
  sp(L(2), 'whoosh', 0.7); sp(T.aviones, 'drumroll', 0.6); [0, 1, 2, 3].forEach(i => sp(T.bomb + 0.4 + i * 0.35, 'thud', 0.6)); sp(T.apaga, 'click', 0.9); sp(T.apaga + 0.4, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(2), 6, 0.07);
    focos.forEach((f, i) => set(f, { r: Math.sin(t * 1.4 + i * 2) * 22 }));
    bs.forEach((b, i) => { const k = p(t, T.aviones - 0.3 + i * 0.25, 3.2, E.linear); set(b, { x: lerp(-500, 1500, k), y: Math.sin(t * 3 + i) * 10, r: -3 }); gira(b, t); });
    bombas.forEach((bb, i) => { const t0 = T.bomb + 0.4 + i * 0.35, k = p(t, t0, 0.5, E.inCubic); set(bb, { o: t > t0 && k < 1 ? 1 : 0, x: 200 + i * 200 + k * 40, y: 560 + k * 600 }); });
    const off = t > T.apaga; ci.wins.forEach((w, i) => { const lit = w.getAttribute('fill') !== '#3a4566'; w.style.opacity = off ? (t < T.apaga + 0.15 + (i % 7) * 0.05 ? 1 : 0.05) : (lit ? 1 : 0.4); });
    set(sirena, { o: t > T.noche2 && t < T.apaga ? 0.6 + 0.4 * Math.sin(t * 8) : 0, r: -4 });
    stampA(ap, t, T.apaga + 0.4, -6);
  };
});
shakeAt(T.bomb + 0.75, 0.3, 10); shakeAt(T.apaga + 0.4, 0.3, 12);

/* L3 · los cazas británicos los derriban a oscuras → John Cunningham, con marcador de derribos */
headline(L(3) - 0.1, L(4) - 0.1, 'Derribos *a oscuras*', { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, size: 96, hlT: T.oscuras });
plano(L(3) - 0.1, T.uno - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const ci = ciudad(cam, 3); ci.wins.forEach(w => w.style.opacity = 0.05);
  const caza = AVION(cam, -500, 640, 360, RAF, false);
  const enem = [0, 1].map(i => AVION(cam, 600 - i * 380, 470 + i * 230, 300, LUFT, true));
  const bum = [0, 1].map(i => box(cam, 0, 0, 260, 260, { zIndex: 12 }, `<svg viewBox="0 0 260 260" width="260" height="260"><path d="M130,10 L160,90 L250,70 L180,130 L240,210 L150,170 L120,250 L100,170 L20,200 L70,130 L10,70 L100,90 Z" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><path d="M130,60 L145,110 L195,105 L155,135 L180,185 L130,160 L105,195 L100,150 L60,150 L95,125 Z" fill="${RED}"/></svg>`));
  const humo = [0, 1].map(i => box(cam, 0, 0, 80, 80, { zIndex: 10, borderRadius: '50%', background: 'rgba(80,80,80,.7)', border: `5px solid ${INK}` }));
  sp(T.pilotos3, 'whoosh', 0.8); sp(T.derribar + 0.2, 'burst', 1); sp(T.oscuras + 0.3, 'burst', 0.9);
  return t => {
    zoom(cam, t, L(3), 3, 0.07);
    const kc = p(t, T.pilotos3 - 0.2, 2.6, E.inOutCubic); set(caza, { x: lerp(-500, 1200, kc), y: Math.sin(t * 3) * 14 - kc * 60 }); gira(caza, t);
    enem.forEach((e, i) => { const tb = (i ? T.oscuras : T.derribar) + 0.3, kf = p(t, tb, 0.8, E.inCubic); set(e, { x: -kf * 100, y: kf * 600 + Math.sin(t * 2 + i) * 8, r: kf * 50, o: kf < 0.98 ? 1 : 0, sx: -1 }); gira(e, t); set(bum[i], { o: t > tb && t < tb + 0.35 ? 1 : 0, s: pop(t, tb, 0.2), x: 640 - i * 380, y: 420 + i * 230 }); set(humo[i], { o: t > tb ? 1 - p(t, tb + 0.4, 0.8) : 0, x: 720 - i * 380 - kf * 100, y: 500 + i * 230 + kf * 500, s: 1 + kf }); });
  };
});
plano(T.uno - 0.1, T.periodicos - 0.1, { background: '#2b3550', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 60px, transparent 60px 120px)' }, c => {
  const cam = CAM(c);
  const pil = mkBust(cam, [80, 520, 480, 614], { hat: 'cap', uniform: 'officer', moustache: true, seed: 7 });
  const nom = chip(cam, 300, 1230, 'John Cunningham', { size: 58, bg: '#fff', color: INK });
  const pan = box(cam, 620, 520, 380, 520, { zIndex: 8, background: '#5a4632', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, borderRadius: '12px' });
  el('div', pan, { left: 0, top: '20px', width: '364px', textAlign: 'center', fontFamily: 'Rye', fontSize: '40px', color: '#fff' }, 'DERRIBOS');
  const marcas = [...Array(20)].map((_, i) => box(pan, 30 + (i % 4) * 82, 100 + Math.floor(i / 4) * 78, 60, 50, { background: 'transparent' }, `<svg viewBox="0 0 60 50" width="60" height="50"><path d="M20,25 H40 M30,15 V35" stroke="#fff" stroke-width="10"/><path d="M20,25 H40 M30,15 V35" stroke="${INK}" stroke-width="4"/></svg>`));
  const cnt = texto(cam, 1080, '', { size: 120, color: GOLD, x: 620, w: 380, z: 20, shadow: `5px 5px 0 ${INK}` });
  sp(T.john, 'ding', 0.7); [T.u1, T.u2, T.u5].forEach(x => sp(x, 'tick', 0.7)); [...Array(15)].forEach((_, i) => sp(T.veinte + i * 0.04, 'tick', 0.3)); sp(T.veinte + 0.7, 'tada', 0.8);
  return t => {
    zoom(cam, t, T.uno, 3, 0.08);
    face(pil, t, { look: [8, -2], jaw: t > T.tumba ? 0.4 : 0, bL: t > T.tumba ? 12 : 4, bR: 12, seed: 0.6 }); set(pil.d, { s: pop(t, T.uno - 0.1, 0.4) });
    popA(nom, t, T.john, { r: -3 });
    let n = 0; marcas.forEach((m, i) => { const ti = i < 1 ? T.u1 : i < 2 ? T.u2 : i < 5 ? T.u5 + (i - 2) * 0.08 : T.veinte + (i - 5) * 0.04; set(m, { o: t > ti ? 1 : 0, s: pop(t, ti, 0.2) }); if (t > ti) n++; }); cnt.textContent = n ? `×${n}` : '';
  };
});
shakeAt(T.derribar + 0.2, 0.3, 14);

/* L4 · uno, dos, cinco… ¡veinte! y los periódicos le ponen mote: «OJOS DE GATO» (ojos de gato gigantes en la noche) */
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };
headline(L(4) - 0.1, T.periodicos - 0.1, 'Uno, dos… *¡veinte!*', Object.assign({ size: 96, hlT: T.veinte }, BL));
headline(T.periodicos - 0.1, L(5) - 0.1, '«Ojos de *Gato*»', Object.assign({ size: 100, hlT: T.gato }, BL));
plano(T.periodicos - 0.1, L(5) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const ci = ciudad(cam, 3); ci.wins.forEach(w => w.style.opacity = 0.05);
  const luna = box(cam, 780, 380, 160, 160, { zIndex: 2, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '50%' });
  const per = PERIODICO(c, 160, 470, '«OJOS DE GATO»', '¡el as de la noche!'); per.querySelector('div:nth-child(2)').textContent = 'Londres · 1941';
  const ojos = box(cam, 140, 620, 800, 300, { zIndex: 9 }, `<svg viewBox="0 0 800 300" width="800" height="300"><g class="og">${[200, 600].map(x => `<path d="M${x - 170},150 Q${x},0 ${x + 170},150 Q${x},300 ${x - 170},150 Z" fill="#ffd400" stroke="${INK}" stroke-width="10"/><path class="pu" d="M${x},60 Q${x + 34},150 ${x},240 Q${x - 34},150 ${x},60 Z" fill="${INK}"/><circle cx="${x - 50}" cy="110" r="16" fill="#fff"/>`).join('')}</g></svg>`);
  const pil = mkBust(cam, [380, 980, 320, 410], { hat: 'cap', uniform: 'officer', moustache: true, seed: 7 });
  const miau = BOCADILLO(cam, 640, 980, '¡miau!', { size: 66 });
  sp(T.periodicos - 0.1, 'whoosh', 0.8); sp(T.periodicos + 0.45, 'stamp', 0.9); sp(T.gato, 'sparkle', 0.9); sp(T.gato + 0.5, 'boing', 0.7);
  return t => {
    zoom(cam, t, T.periodicos, 3, 0.08);
    giraPeriodico(per, t, T.periodicos - 0.1); set(per, { o: t > T.periodicos - 0.1 && t < T.gato - 0.05 ? 1 : 0 });
    const ko = p(t, T.gato - 0.05, 0.35, E.outBack); set(ojos, { o: t > T.gato - 0.05 ? 1 : 0, s: ko, sy: ((t * 0.7) % 1) < 0.08 ? 0.1 : 1 });
    ojos.querySelectorAll('.pu').forEach((q, i) => q.setAttribute('transform', `translate(${f1(Math.sin(t * 2) * 60)} 0)`));
    set(pil.d, { o: t > T.gato + 0.2 ? 1 : 0, s: pop(t, T.gato + 0.2, 0.35) }); face(pil, t, { look: [Math.sin(t * 2) * 8, -2], bL: 12, bR: 12, jaw: 0.3, seed: 0.6 });
    popA(miau, t, T.gato + 0.5, { r: 5 });
  };
});
shakeAt(T.gato, 0.3, 12);

/* L8 · ¿su secreto? un RADAR montado en el avión (ondas + pantalla verde) · y el enemigo no podía saberlo */
headline(L(8) - 0.1, L(9) - 0.1, 'El *secreto* de verdad', { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, size: 100, hlT: T.secreto + 0.1 });
plano(L(8) - 0.1, L(9) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const caza = AVION(cam, 40, 560, 520, RAF, false, true);
  const os = ondas(cam, 0, 0);
  const pant = box(cam, 560, 860, 440, 440, { zIndex: 9, background: '#0b2a14', border: `10px solid ${INK}`, borderRadius: '50%', boxShadow: `0 0 0 10px ${HIERRO}, 12px 12px 0 10px ${INK}`, overflow: 'hidden' });
  const barr = box(pant, 210, 0, 10, 210, { background: 'linear-gradient(0deg, #7ef0a0, rgba(126,240,160,0))', transformOrigin: '50% 100%' });
  const blip = box(pant, 290, 110, 36, 36, { borderRadius: '50%', background: '#7ef0a0' });
  [100, 200, 300].forEach(r => box(pant, 210 - r / 2, 210 - r / 2, r, r, { borderRadius: '50%', border: '3px solid rgba(126,240,160,.5)' }));
  const lb = chip(cam, 140, 470, 'RADAR', { size: 70, bg: '#7ef0a0', color: INK });
  const mira = box(cam, 0, 0, 1080, 1920, { zIndex: 4 });
  const nosabe = stamp(cam, 300, 760, 'SECRETO', { size: 96, z: 30 });
  const ojos = box(cam, 300, 1130, 240, 90, { zIndex: 12 }, `<svg viewBox="0 0 240 90" width="240" height="90"><circle cx="60" cy="45" r="34" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="180" cy="45" r="34" fill="#fff" stroke="${INK}" stroke-width="5"/><circle class="pq" cx="64" cy="48" r="12" fill="${INK}"/><circle class="pq" cx="184" cy="48" r="12" fill="${INK}"/></svg>`);
  sp(T.secreto, 'boing', 0.6); sp(T.radar, 'sparkle', 0.8); sp(T.radar + 0.3, 'msg_in', 0.7); sp(T.radar + 1.3, 'msg_in', 0.7); sp(T.montado, 'click', 0.6); sp(T.saberlo, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(8), 6, 0.07);
    set(caza, { y: Math.sin(t * 3) * 14, s: pop(t, L(8), 0.4) }); gira(caza, t);
    mueveOndas(os, t, 560, 610 + Math.sin(t * 3) * 14, t > T.radar);
    set(pant, { s: pop(t, T.radar + 0.2, 0.4), o: t > T.radar + 0.2 ? 1 : 0 }); set(barr, { r: t * 180 }); set(blip, { o: ((t * 0.5) % 1) < 0.3 ? 1 : 0.2 });
    popA(lb, t, T.radar, { r: -4 });
    set(ojos, { o: t > T.enemigo && t < T.saberlo + 0.2 ? 1 : 0, x: Math.sin(t * 3) * 30 }); ojos.querySelectorAll('.pq').forEach(q => q.setAttribute('transform', `translate(${f1(Math.sin(t * 6) * 14)} 0)`));
    stampA(nosabe, t, T.saberlo, -8);
  };
});
shakeAt(T.saberlo, 0.3, 12);

/* L5 · el gobierno cuenta otra cosa: el piloto se zampa zanahorias, montaña creciente, ¡ÑAM! */
headline(L(5) - 0.1, L(6) - 0.1, 'La *versión oficial*', { size: 92, hlT: T.otra });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#C9D3E6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 3px, transparent 3px 58px)' }, c => {
  const cam = CAM(c);
  const per = PERIODICO(c, 160, 480, 'PILOTOS<br>ZANAHORIA', '¡ven de noche!'); per.querySelector('div:nth-child(2)').textContent = 'Londres · 1940';
  const pil = mkBust(cam, [300, 600, 480, 614], { hat: 'cap', uniform: 'officer', moustache: true, seed: 7 });
  const mont = [...Array(12)].map((_, i) => ZANA(cam, 330 + (i % 6) * 70 - Math.floor(i / 6) * 30, 1180 - Math.floor(i / 6) * 70, 90, {}));
  const bocado = ZANA(cam, 470, 860, 120, {});
  const nam = BOCADILLO(cam, 620, 520, '¡ÑAM!', { size: 76 });
  const como = BOCADILLO(cam, 420, 500, '¿cómo ve de noche?', { size: 50 });
  sp(T.gobierno, 'whoosh', 0.8); sp(T.otra, 'stamp', 0.6); [0, 1, 2].forEach(i => sp(T.comen + i * 0.35, 'gulp', 0.7)); mont.forEach((_, i) => sp(T.muchisimas + i * 0.06, 'pop', 0.3));
  return t => {
    zoom(cam, t, L(5), 5, 0.06);
    giraPeriodico(per, t, T.gobierno - 0.1); set(per, { o: t > T.gobierno - 0.1 && t < T.comen - 0.1 ? 1 : 0 });
    set(pil.d, { o: 1, s: pop(t, L(5) - 0.1, 0.35) }); popA(como, t, L(5) + 0.1, { r: -4, o: t < T.gobierno ? 1 : 0 });
    const chew = t > T.comen ? Math.abs(Math.sin(t * 12)) : 0; face(pil, t, { jaw: chew * 0.8, look: [0, 4], closed: chew > 0.6, bL: 6, bR: 6, seed: 0.2 });
    const kb = ((t - T.comen) * 1.2) % 1; set(bocado, { o: t > T.comen ? 1 - kb : 0, y: -kb * 160, s: 1 - kb * 0.6, r: -40 });
    mont.forEach((m, i) => { const t0 = T.muchisimas + i * 0.06; set(m, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3), r: (i % 3 - 1) * 20 }); zFace(m, t, { feliz: 1, look: [0, -6], seed: i }); });
    popA(nam, t, T.comen + 0.2, { r: 5 });
  };
});
shakeAt(T.muchisimas + 0.5, 0.35, 14);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · se lo creen en casa: carteles, recetas… y el «DOCTOR ZANAHORIA» con chistera */
headline(L(7) - 0.1, L(8) - 0.1, 'Todo el *país*', { size: 100, hlT: T.creen + 0.2 });
plano(L(7) - 0.1, T.personaje - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const cart = [0, 1, 2].map(i => { const d = box(cam, 70 + i * 320, 470 + (i % 2) * 70, 300, 420, { zIndex: 6 + i, background: ['#f4efe2', YEL, '#9fd3c0'][i], border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', color: INK, paddingTop: '20px' }, ['¡COME<br>ZANAHORIA!', 'VE EN EL<br>APAGÓN', 'SANA<br>Y FUERTE'][i]); const z = ZANA(d, 95, 150, 110, {}); d.z = z; return d; });
  const rec = box(cam, 300, 960, 480, 330, { zIndex: 10, background: CREMA, border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, transformOrigin: '50% 100%' });
  el('div', rec, { left: '30px', top: '20px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '56px', color: INK }, 'Receta:');
  el('div', rec, { left: '30px', top: '100px', width: '420px', fontFamily: 'SpecialElite', fontSize: '34px', lineHeight: 1.3, color: INK }, 'mermelada de zanahoria<br>tarta de zanahoria<br>zanahoria con zanahoria');
  sp(L(7) + 0.2, 'paper', 0.7); sp(L(7) + 0.8, 'paper', 0.6); sp(L(7) + 1.4, 'paper', 0.6); sp(T.recetas, 'pop2', 0.7);
  return t => { zoom(cam, t, L(7), 4, 0.06); cart.forEach((d, i) => { const tc = L(7) + 0.2 + i * 0.6; set(d, { s: pop(t, tc, 0.35), o: t > tc ? 1 : 0, r: (i - 1) * 5 + Math.sin(t * 2 + i) }); zFace(d.z, t, { feliz: 1, jaw: 0.3, look: [0, -4], seed: i }); }); set(rec, { o: t > T.recetas - 0.1 ? 1 : 0, s: pop(t, T.recetas - 0.1, 0.35), r: -3 }); };
});
plano(T.personaje - 0.1, L(8) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  const marco = box(cam, 180, 430, 720, 880, { zIndex: 5, background: '#fff6c8', border: `10px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` });
  el('div', marco, { left: 0, top: '20px', width: '700px', textAlign: 'center', fontFamily: 'Rye', fontSize: '66px', color: RED }, 'DOCTOR');
  el('div', marco, { left: 0, top: '730px', width: '700px', textAlign: 'center', fontFamily: 'Rye', fontSize: '66px', color: RED }, 'ZANAHORIA');
  const dz = ZANA(cam, 400, 560, 280, { chistera: true });
  const male = box(cam, 640, 960, 200, 160, { zIndex: 12 }, `<svg viewBox="0 0 200 160" width="200" height="160"><path d="M60,30 a40,30 0 0 1 80,0" stroke="${INK}" stroke-width="12" fill="none"/><rect x="10" y="30" width="180" height="120" rx="20" fill="${WOOD}" stroke="${INK}" stroke-width="7"/><path d="M100,60 V120 M70,90 H130" stroke="#fff" stroke-width="16"/></svg>`);
  sp(T.personaje, 'whoosh', 0.7); sp(T.doctor, 'tada', 0.8); sp(T.doctor + 0.2, 'stamp', 0.7);
  return t => { set(ry, { r: t * 6 }); zoom(cam, t, T.personaje, 2, 0.06); set(marco, { s: pop(t, T.personaje - 0.1, 0.4), r: -2 }); const hop = Math.abs(Math.sin(t * 5)); set(dz, { s: pop(t, T.doctor - 0.1, 0.45), y: -hop * 30, r: Math.sin(t * 3) * 5 }); zFace(dz, t, { feliz: 1, jaw: t > T.doctor ? 0.6 : 0, ceja: 10, look: [4, -2], closed: t > T.doctor + 0.5 && t < T.doctor + 0.75 }); set(male, { o: t > T.doctor + 0.2 ? 1 : 0, s: pop(t, T.doctor + 0.2, 0.35), r: Math.sin(t * 4) * 6 }); };
});
shakeAt(T.doctor + 0.2, 0.3, 12);

/* L9 · si los alemanes se enteraban, lo copiaban → había que darles otra explicación… NARANJA (zanahoria gigante tapa el plano) */
headline(L(9) - 0.1, L(10) - 0.1, 'Una tapadera *naranja*', { size: 90, hlT: T.naranja });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const pl = box(cam, 420, 470, 600, 440, { zIndex: 6, background: '#2b4a8c', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.18) 2px, transparent 2px)', backgroundSize: '40px 40px' });
  el('div', pl, { left: '20px', top: '14px', fontFamily: 'SpecialElite', fontSize: '34px', color: '#fff' }, 'PLANO · RADAR');
  const av = AVION(pl, 60, 120, 460, RAF, false, true); av.style.filter = 'brightness(0) invert(1)';
  const ts = stamp(cam, 520, 820, 'TOP SECRET', { size: 70, z: 20 });
  const esp = mkBust(cam, [40, 640, 400, 512], { hat: 'slouch', moustache: true, seed: 66 });
  const gem = box(cam, 120, 820, 240, 90, { zIndex: 12 }, `<svg viewBox="0 0 240 90" width="240" height="90"><rect x="10" y="10" width="90" height="70" rx="20" fill="${INK}"/><rect x="140" y="10" width="90" height="70" rx="20" fill="${INK}"/><rect x="95" y="30" width="50" height="24" fill="${INK}"/><circle cx="55" cy="45" r="24" fill="#7fb8e0"/><circle cx="185" cy="45" r="24" fill="#7fb8e0"/></svg>`);
  const cp = BOCADILLO(cam, 90, 470, '¡a copiarlo!', { size: 54 });
  const zg = ZANA(cam, 560, 300, 330, {});
  const nar = stamp(cam, 480, 1120, 'TAPADERA', { size: 80, col: NARANJA, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  sp(T.alemanes9, 'whoosh', 0.6); sp(T.copiaban, 'typing', 0.7); sp(T.dar + 0.2, 'whoosh', 0.9); sp(T.dar + 0.7, 'thud', 1.0); sp(T.naranja, 'stamp', 1); sp(T.naranja + 0.3, 'boing', 0.7);
  return t => {
    zoom(cam, t, L(9), 4, 0.07);
    set(pl, { s: pop(t, L(9) - 0.1, 0.4), r: -2 }); stampA(ts, t, L(9) + 0.3, -8);
    const tapa = t > T.dar + 0.7;
    set(esp.d, { s: pop(t, T.alemanes9 - 0.1, 0.4), x: Math.sin(t * 2) * 10 }); face(esp, t, { look: tapa ? [10, -6] : [10, -2], bL: tapa ? 16 : 4, bR: tapa ? 16 : 10, jaw: t > T.copiaban && t < T.copiaban + 0.6 ? 0.5 : tapa ? 0.6 : 0, seed: 0.4 });
    set(gem, { o: t > T.alemanes9 && !tapa ? 1 : 0, y: Math.sin(t * 3) * 6 });
    popA(cp, t, T.copiaban, { r: -4, o: tapa ? 0 : 1 });
    const kz = p(t, T.dar + 0.2, 0.5, E.inCubic); set(zg, { o: t > T.dar + 0.2 ? 1 : 0, y: (1 - kz) * -900, r: tapa ? Math.sin(t * 6) * 3 + 70 : 70 * kz, sx: tapa ? 1 + 0.06 * Math.sin(t * 9) : 1 }); zFace(zg, t, { feliz: 1, jaw: 0.3, look: [-8, 0], ceja: 8 });
    stampA(nar, t, T.naranja, -8);
  };
});
shakeAt(T.dar + 0.7, 0.35, 16);

/* L10 · de ahí a tu abuela… y de tu abuela, a ti: la zanahoria pasa de mano en mano (relevo de generaciones) */
headline(L(10) - 0.1, L(11) - 0.1, '80 años *después*', { size: 92, hlT: T.abuela1 + 0.3 });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const gens = [[50, '1940', 'brodie', true, 0], [375, 'tu abuela', 'slouch', false, 1], [700, 'tú', null, false, 2]].map(([x, s, hat, mo, i]) => { const fr = box(cam, x, 560, 290, 420, { zIndex: 5, background: CREMA, border: `14px solid ${GOLD}`, outline: `5px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}` }); const b = mkBust(fr, [8, 30, 260, 333], { hat, moustache: mo, seed: 90 + i }); const lb = chip(cam, x + 40, 470, s, { size: 50, bg: '#fff', color: INK }); if (i === 0) fr.style.filter = 'sepia(.8)'; return { fr, b, lb, i }; });
  const z = ZANA(cam, 0, 0, 120, {});
  const yo = BOCADILLO(cam, 380, 1100, '¡a mí me lo decían!', { size: 48 });
  sp(T.ahi9, 'pop', 0.6); sp(T.abuela1, 'whoosh', 0.7); sp(T.abuela2, 'pop', 0.6); sp(T.ati, 'whoosh', 0.7); sp(T.ati + 0.3, 'ding', 0.8);
  return t => {
    zoom(cam, t, L(10), 4, 0.07);
    const ts = [L(10), T.abuela1, T.ati];
    gens.forEach(({ fr, b, lb, i }) => { set(fr, { s: pop(t, ts[i] - 0.1, 0.4), o: t > ts[i] - 0.1 ? 1 : 0, r: (i - 1) * 3 }); popA(lb, t, ts[i] + 0.1, { r: -2 }); face(b, t, { look: [i === 2 ? -6 : 6, 0], jaw: t > ts[i] && t < ts[i] + 0.7 ? 0.5 : 0, bL: i === 2 && t > T.ati ? 14 : 4, bR: 8, seed: i }); });
    const seg = t < T.abuela1 ? 0 : t < T.ati ? 1 : 2, t0 = ts[seg], k = p(t, t0, 0.5, E.inOutCubic), xa = 60 + Math.max(0, seg - 1) * 320 + 100, xb = 60 + seg * 320 + 100;
    set(z, { x: seg ? lerp(xa, xb, k) : xb, y: 900 - Math.sin(k * Math.PI) * 300, r: k * 360 }); zFace(z, t, { feliz: 1, look: [6, -4] });
    popA(yo, t, T.ati + 0.3, { r: 4 });
  };
});

/* L11 · OJO: no está claro si el bulo engañó a los alemanes (espía alemán dudando) */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const esp = mkBust(c, [380, 540, 420, 537], { hat: 'slouch', moustache: true, seed: 66 });
  const z = ZANA(c, 820, 640, 130, {});
  const qs = [0, 1, 2].map(i => texto(c, 520 - i * 30, '?', { size: 120 + i * 20, color: [RED, PINK, INK][i], x: 700 + i * 90, w: 120 }));
  aparece(chip(c, 380, 1110, '¿se lo tragaron?', { size: 58, bg: YEL, color: INK }), T.engano);
  sp(T.engano + 0.3, 'pop', 0.6);
  return t => { face(esp, t, { look: [10, -2], bL: 4, bR: 14, seed: 0.4 }); set(z, { r: Math.sin(t * 3) * 10 }); zFace(z, t, { feliz: 0, look: [-6, 0] }); qs.forEach((q, i) => set(q, { o: t > T.engano + i * 0.2 ? 1 : 0, y: Math.sin(t * 4 + i) * 10 })); };
});

/* L12 · O sea: lo que te decían de pequeño… era PROPAGANDA DE GUERRA */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'Cada zanahoria «para ver mejor»…', { size: 76 });
  const b = texto(c, 480, '…era propaganda', { size: 104, italic: true, color: RED });
  const z = ZANA(c, 400, 620, 260, { chistera: true });
  const meg = box(c, 650, 640, 300, 240, { zIndex: 12 }, `<svg viewBox="0 0 300 240" width="300" height="240"><path d="M40,90 L180,30 V210 L40,150 Z" fill="${RED}" stroke="${INK}" stroke-width="7"/><rect x="10" y="80" width="40" height="80" fill="${HIERRO}" stroke="${INK}" stroke-width="6"/><path d="M220,80 q30,40 0,80 M250,60 q46,60 0,120" stroke="${INK}" stroke-width="8" fill="none"/></svg>`);
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.propaganda - 0.2 ? 1 : 0, s: pop(t, T.propaganda - 0.2, 0.35) }); zFace(z, t, { feliz: 1, jaw: 0.4, look: [6, -4], ceja: 8 }); set(z, { r: Math.sin(t * 4) * 5 }); set(meg, { o: t > T.propaganda ? 1 : 0, s: pop(t, T.propaganda, 0.35), r: Math.sin(t * 8) * 4 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.propaganda, 'stamp', 0.9);

/* L13 · pregunta final */
preguntaFinal('¿Qué te decían en casa', 'que resultó ser mentira?', { size: 84, draw: c => [['no te bañes tras comer', YEL], ['te quedarás bizco', PINK], ['¿y a ti?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 40, 620 + i * 160, s, { size: 56, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(67, 'Las zanahorias', ['ZANAHORIAS', 'y el radar']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.comen + 0.2, T.comen + 1.2], [T.naranja + 0.3, T.naranja + 1.3], [T.ati + 0.3, T.ati + 1.1]], sorpresa: [[T.radar, T.radar + 0.8], [T.veinte, T.veinte + 0.8], [T.gato, T.gato + 0.8]], golpes: [T.arma, T.apaga + 0.4, T.derribar + 0.2, T.veinte + 0.7, T.gato, T.muchisimas + 0.5, T.doctor + 0.2, T.saberlo, T.naranja] },
});
