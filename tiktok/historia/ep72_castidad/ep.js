/* Ep. 72 · El cinturón de castidad medieval: casi seguro un bulo — edición estilo ep07/ep64 (escenarios llenos, objetos con cara, Vecino fijo) */
Story.prepara();
const T = {
  cint0: Q('el cinturón'), bulo0: Q('un bulo'),
  museos1: Q('los museos'), secreto: Q('un secreto'), vergon: Q('vergonzoso'),
  historia2: Q('la historia que te cuentan'), caballero: Q('el caballero'), cruzadas2: Q('a las cruzadas'), candado2: Q('un candado'), mujer: Q('a su mujer'),
  cronicas: Q('las crónicas'), ninguno: Q('ni uno'),
  primera: Q('la primera mención'), m1405: Q('mil cuatrocientos cinco'), dibujo: Q('un dibujo'), libro: Q('un libro de inventos'), broma: Q('de broma'),
  meme: Q('un meme'), chistes: Q('chistes'), satiras: Q('sátiras'), maridos: Q('maridos celosos'),
  museos7: Q('los de los museos'), fabricaron: Q('se fabricaron'), siglos: Q('dieciocho y diecinueve'), colecc: Q('para coleccionistas'), peculiares: Q('peculiares'),
  britanico: Q('museo británico'), ficha: Q('en su ficha'), probable: Q('probablemente'), epoca: Q('esa época'), otros: Q('otros museos'), retirado: Q('los han retirado'),
  hierro: Q('llevar hierro'), dia: Q('día y noche'), heridas: Q('heridas'), infecc: Q('infecciones graves'),
  edad10: Q('esa edad media oscura'), salvaje: Q('salvaje'), invento10: Q('se inventó'), despues: Q('mucho después'),
  ojo: Q('ojo'), aislado: Q('caso aislado'), costumbre: Q('como costumbre'),
  osea: Q('o sea'), moderno: Q('un invento moderno'),
};
const ROJO = '#c8102e', VERDE = '#2e7a4a', CREMA = '#FBF6EA', ORO = '#d9a520', HIERRO = '#7d8790';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const STAR = (c, x, y, sz) => { const e = ESTRELLA(c, sz, GOLD); e.style.left = px(x); e.style.top = px(y); return e; };

/* ---------- figuras ---------- */
/* candado con cara (el «cinturón»): vb 0 0 300 360 · cara con caraF */
const candadoInner = (o = {}) => `${cut('<path d="M30,150 L270,150 L270,330 L30,330 Z"/>', 7, 9)}<path d="M85,152 V95 a65,65 0 0 1 130,0 V152" stroke="${INK}" stroke-width="34" fill="none"/><path d="M85,152 V95 a65,65 0 0 1 130,0 V152" stroke="${HIERRO}" stroke-width="22" fill="none"/>
  <rect x="30" y="140" width="240" height="200" rx="34" fill="${o.oxido ? '#9a6a3a' : ORO}" stroke="${INK}" stroke-width="7"/><rect x="30" y="140" width="240" height="200" rx="34" fill="url(#hA)" opacity=".35"/>
  <g class="ox" style="opacity:0">${[[70, 300, 22], [220, 170, 18], [240, 300, 26], [60, 190, 14], [150, 320, 16]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8a4a1c" opacity=".8"/>`).join('')}</g>
  <path d="M150,282 a12,12 0 1 0 0.1,0 M144,294 L140,322 L160,322 L156,294" fill="${INK}"/>
  <g class="mej" style="opacity:0"><ellipse cx="78" cy="242" rx="20" ry="11" fill="${PINK}" opacity=".8"/><ellipse cx="222" cy="242" rx="20" ry="11" fill="${PINK}" opacity=".8"/></g>
  <g class="kc"><path d="M84,182 q22,-12 44,0 M172,182 q22,-12 44,0" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g><g class="ke"><ellipse cx="106" cy="212" rx="20" ry="22" fill="#fff" stroke="${INK}" stroke-width="5"/><ellipse cx="194" cy="212" rx="20" ry="22" fill="#fff" stroke="${INK}" stroke-width="5"/></g><g class="kp"><circle cx="108" cy="216" r="9" fill="${INK}"/><circle cx="196" cy="216" r="9" fill="${INK}"/></g><path class="km" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
const CANDADO = (c, x, y, w, o = {}) => figura(c, x, y, w, w * 1.2, candadoInner(o), '0 0 300 360', Object.assign({ z: 10, origin: '50% 0%' }, o));
const canFace = (f, t, o = {}) => { caraF(f, t, o, 212, [150, 256, 22, '.km', '.kp', '.ke', '.kc']); f.querySelector('.mej').style.opacity = o.mej ? 1 : 0; f.querySelector('.ox').style.opacity = o.ox || 0; };
/* caballero: yelmo abierto con cara, penacho y sobreveste con cruz (vb 0 0 300 460) */
const caballeroInner = () => `${FIGP('M40,300 L260,300 L280,460 L20,460 Z', '#f4efe2', 6, .2)}<path d="M150,310 V450 M90,370 H210" stroke="${ROJO}" stroke-width="26"/>
  ${FIGP('M60,200 C50,80 250,80 240,200 L240,300 L60,300 Z', HIERRO, 7, .35)}<path class="pen" d="M150,90 C120,20 200,0 230,40 C200,40 180,60 170,90 Z" fill="${ROJO}" stroke="${INK}" stroke-width="5"/>
  <path d="M95,140 C95,120 205,120 205,140 L205,250 C205,280 95,280 95,250 Z" fill="#f2c9a0" stroke="${INK}" stroke-width="5"/>
  <g class="yc"><path d="M108,160 q16,-9 32,0 M160,160 q16,-9 32,0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g><g class="ye"><ellipse cx="124" cy="182" rx="13" ry="15" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="176" cy="182" rx="13" ry="15" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="yp"><circle cx="125" cy="185" r="6" fill="${INK}"/><circle cx="177" cy="185" r="6" fill="${INK}"/></g>
  <path d="M118,222 q32,-12 64,0" stroke="#6b4a2a" stroke-width="12" fill="none" stroke-linecap="round"/><path class="ym" d="" fill="#7a2a20" stroke="${INK}" stroke-width="3.5"/>
  <path class="brazo" d="M250,330 L300,250" stroke="${HIERRO}" stroke-width="30" stroke-linecap="round"/><circle class="mano" cx="300" cy="245" r="22" fill="${HIERRO}" stroke="${INK}" stroke-width="5"/>`;
const CABALLERO = (c, x, y, w) => figura(c, x, y, w, w * 460 / 300, caballeroInner(), '0 0 300 460', { z: 9, origin: '50% 100%' });
const cabFace = (f, t, o = {}) => caraF(f, t, o, 182, [150, 244, 18, '.ym', '.yp', '.ye', '.yc']);
const saluda = (f, t, on) => { const a = on ? Math.sin(t * 12) * 18 : 0; f.querySelector('.brazo').setAttribute('transform', `rotate(${f1(a)} 250 330)`); f.querySelector('.mano').setAttribute('transform', `rotate(${f1(a)} 250 330)`); };
/* castillo (vb 0 0 900 700) */
const castilloSvg = () => `${FIGP('M100,700 L100,260 L800,260 L800,700 Z', '#c9b48a', 7, .3)}${[100, 260, 420, 580, 740].map(x => `<rect x="${x}" y="220" width="60" height="50" fill="#c9b48a" stroke="${INK}" stroke-width="6"/>`).join('')}
  ${FIGP('M20,700 L20,140 L200,140 L200,700 Z', '#bfa77a', 7, .3)}${FIGP('M700,700 L700,140 L880,140 L880,700 Z', '#bfa77a', 7, .3)}<path d="M10,140 L110,30 L210,140 Z M690,140 L790,30 L890,140 Z" fill="${ROJO}" stroke="${INK}" stroke-width="6"/>
  <path d="M360,700 V520 a90,90 0 0 1 180,0 V700 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="6"/><rect x="80" y="260" width="60" height="90" rx="30" fill="#2b2118"/><rect x="760" y="260" width="60" height="90" rx="30" fill="#2b2118"/>`;
const CASTILLO = (c, x, y, w, z = 3) => figura(c, x, y, w, w * 700 / 900, castilloSvg(), '0 0 900 700', { z });
/* vitrina de museo con gancho; devuelve {v, ficha} */
const VITRINA = (c, x, y, w, h, z = 6) => { const v = box(c, x, y, w, h, { zIndex: z, background: 'rgba(200,230,240,.35)', border: `8px solid ${INK}`, borderRadius: '10px', boxShadow: `inset 0 0 0 6px rgba(255,255,255,.5), 12px 12px 0 ${INK}` });
  box(c, x - 30, y + h, w + 60, 90, { zIndex: z, background: WOOD, border: `7px solid ${INK}`, borderRadius: '8px' });
  box(v, w / 2 - 6, 0, 12, 60, { background: INK }); box(v, 30, 30, 26, h - 60, { background: 'rgba(255,255,255,.5)', borderRadius: '13px' }); return v; };
const FICHA = (c, x, y, html, z = 20) => box(c, x, y, 420, 150, { zIndex: z, background: CREMA, border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '34px', color: INK, padding: '18px 22px', boxSizing: 'border-box', lineHeight: 1.25 }, html);
const COLUMNAS = (c, z = 2) => [40, 880].map(x => box(c, x, 500, 160, 900, { zIndex: z, background: 'repeating-linear-gradient(90deg, #ece4d2 0 26px, #d9cfb8 26px 34px)', border: `7px solid ${INK}` }));
const VISITA = (c, x, y, w, i) => mkBust(c, [x, y, w, w * 1.28], { hat: ['brodie', 'slouch', 'cap'][i % 3], moustache: i % 2 === 0, beard: i === 1, seed: 30 + i });

/* L0 · PORTADA — vitrina de museo: el candado-cinturón habla, se balancea; sello «¿BULO?» */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 250, 'El cinturón de castidad…', { size: 82 });
  const t2 = texto(c, 345, 'casi seguro un ' + hlSpan('BULO', 'phl'), { size: 96, italic: true });
  COLUMNAS(c, 3);
  const v = VITRINA(c, 270, 520, 540, 660, 5);
  const k = CANDADO(c, 365, 590, 350); k.style.zIndex = 7;
  const fi = FICHA(c, 330, 1220, 'Cinturón «medieval»<br><b>s. XII</b>', 9);
  const ja = [0, 1].map(i => texto(c, 560 + i * 140, '¡ja!', { size: 70, italic: true, color: ROJO, x: i ? 820 : 40, w: 220, z: 25 }));
  const st = [STAR(c, 300, 600, 56), STAR(c, 740, 700, 44), STAR(c, 700, 1040, 50)];
  const sb = stamp(c, 560, 1180, '¿BULO?', { size: 80, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.bulo0 + 0.3, 'stamp', 1); sp(T.bulo0, 'ding', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(k, { r: Math.sin(t * 2.6) * 7, y: -Math.abs(Math.sin(t * 5.2)) * 10 }); canFace(k, t, { jaw: talkW(t, 'VECINO'), look: [Math.sin(t * 2) * 5, -2], feliz: 1, ceja: t > T.bulo0 ? 12 : 0, closed: t > T.bulo0 + 0.2 && t < T.bulo0 + 0.5 });
    st.forEach((s, i) => set(s, { s: 0.6 + 0.5 * Math.abs(Math.sin(t * 4 + i)), r: t * 90 }));
    ja.forEach((e, i) => set(e, { o: t > T.bulo0 + 0.15 * i ? 1 : 0, s: pop(t, T.bulo0 + 0.15 * i, 0.3), r: i ? 10 : -10, y: Math.sin(t * 14 + i) * 6 }));
    set(fi, { r: -2 + Math.sin(t * 3) }); stampA(sb, t, T.bulo0 + 0.3, -10);
  };
}, { sfx: false });

/* L1 · en los museos… esconden un secreto vergonzoso: visitantes, el candado se sonroja y se tapa con la ficha */
headline(L(1) - 0.1, L(2) - 0.1, 'Los de los *museos*…', { size: 90, hlT: T.museos1 });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#e6dcc6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 4px, transparent 4px 90px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1300, 1080, 620, { zIndex: 2, background: 'repeating-linear-gradient(45deg, #b98c5a 0 60px, #a67a4a 60px 120px)', borderTop: `8px solid ${INK}` });
  [[90, 420], [800, 400]].forEach(([x, y], i) => box(cam, x, y, 190, 230, { zIndex: 2, background: CREMA, border: `14px solid ${GOLD}`, boxShadow: `0 0 0 5px ${INK}` }, `<svg viewBox="0 0 160 200" width="162" height="202"><path d="M0,200 L60,90 L100,150 L130,110 L160,200 Z" fill="${i ? '#7ab35a' : '#5a8fd6'}"/><circle cx="${i ? 50 : 110}" cy="50" r="22" fill="${GOLD}"/></svg>`));
  const v = VITRINA(cam, 330, 440, 420, 520, 5);
  const k = CANDADO(cam, 405, 500, 270); k.style.zIndex = 7;
  const vis = [[330, 1000, 0], [560, 980, 1], [790, 1010, 2]].map(([x, y, i]) => VISITA(cam, x, y, 230, i));
  const sec = stamp(cam, 380, 760, 'SECRETO', { size: 86, z: 30 });
  const q = texto(cam, 470, '?', { size: 160, color: ROJO, x: 760, w: 160, z: 20 });
  sp(T.museos1, 'pop', 0.5); sp(T.secreto, 'scratch', 0.7); sp(T.vergon, 'boing', 0.8); sp(T.vergon + 0.3, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(1), 4, 0.08);
    const shy = t > T.vergon; set(k, { r: shy ? Math.sin(t * 30) * 3 : Math.sin(t * 2.6) * 5, x: shy ? -20 : 0 }); canFace(k, t, { look: shy ? [-10, 6] : [0, 4], feliz: shy ? -0.6 : 0.5, mej: t > T.secreto, ceja: t > T.secreto ? 10 : 0, jaw: shy ? 0.2 : 0 });
    vis.forEach((b, i) => { set(b.d, { y: (1 - p(t, L(1) + i * 0.2, 0.4, E.outBack)) * 400, o: t > L(1) + i * 0.2 ? 1 : 0 }); face(b, t, { look: [i === 2 ? -8 : 6, -8], bL: t > T.secreto ? 12 : 0, bR: t > T.secreto ? 12 : 0, jaw: t > T.vergon ? 0.5 : 0, seed: i }); });
    stampA(sec, t, T.vergon + 0.3, -8); set(q, { o: t > T.secreto ? 1 : 0, s: pop(t, T.secreto, 0.3), r: Math.sin(t * 6) * 10 });
  };
});

/* L2 · la leyenda: castillo; el caballero se despide rumbo a las Cruzadas; ¡CLIC! candado */
headline(L(2) - 0.1, L(3) - 0.1, 'La *leyenda*', { size: 92, hlT: T.historia2 + 0.2 });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const sol = box(cam, 820, 360, 160, 160, { zIndex: 1, background: GOLD, border: `7px solid ${INK}`, borderRadius: '50%' });
  const nubes = [[100, 420], [600, 500]].map(([x, y]) => box(cam, x, y, 240, 80, { zIndex: 1, background: '#fff', border: `6px solid ${INK}`, borderRadius: '60px' }));
  CASTILLO(cam, 90, 560, 900);
  box(cam, 0, 1250, 1080, 700, { zIndex: 4, background: '#7a9a52', borderTop: `8px solid ${INK}` });
  const dama = mk(cam, [118, 640, 120, 149], vecinaInner({ seed: 4 }), '0 0 420 520', 'vec'); dama.d.style.zIndex = 4;
  const cab = CABALLERO(cam, 520, 820, 300);
  const band = box(cam, 0, 0, 120, 300, { zIndex: 8 }, `<svg viewBox="0 0 120 300" width="120" height="300"><path d="M10,0 V300" stroke="${INK}" stroke-width="10"/><path d="M14,10 L110,40 L14,80 Z" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M40,30 V62 M26,46 H58" stroke="${ROJO}" stroke-width="8"/></svg>`);
  const k = CANDADO(cam, 380, 1000, 200); k.style.zIndex = 12;
  const clic = texto(cam, 980, '¡CLIC!', { size: 90, color: ROJO, x: 590, w: 400, z: 30 });
  const hm = BOCADILLO(cam, 260, 540, '¿perdona?', { size: 46 });
  sp(T.caballero, 'pop', 0.6); sp(T.cruzadas2, 'whoosh', 0.8); sp(T.candado2 + 0.35, 'click', 1); sp(T.candado2 + 0.4, 'stamp', 0.7); sp(T.mujer + 0.3, 'boing', 0.6);
  return t => {
    zoom(cam, t, L(2), 5, 0.05); set(sol, { r: t * 15 }); nubes.forEach((n, i) => set(n, { x: ((t * 25 + i * 400) % 1300) - 260 }));
    const vete = p(t, T.cruzadas2, 1.2, E.inCubic) * (1 - (t > T.candado2 - 0.3 ? 1 : 0)), back = t > T.candado2 - 0.3;
    set(cab, { s: pop(t, T.caballero - 0.1, 0.4), x: back ? 0 : vete * 600, y: -Math.abs(Math.sin(t * 8)) * (t > T.cruzadas2 && !back ? 20 : 6) }); cabFace(cab, t, { look: [-6, -2], feliz: 1, jaw: t > T.candado2 && t < T.candado2 + 0.7 ? 0.6 : 0, ceja: back ? 8 : 0 }); saluda(cab, t, t > T.historia2 && t < T.cruzadas2 + 0.6);
    set(band, { x: 780 + (back ? 0 : vete * 600), y: 600 + Math.sin(t * 6) * 6, o: t > T.caballero ? 1 : 0 });
    const kk = p(t, T.candado2 - 0.1, 0.45, E.outBack); set(k, { o: t > T.candado2 - 0.1 ? 1 : 0, y: (1 - kk) * -400, s: kk, r: Math.sin(t * 3) * 5 }); canFace(k, t, { look: [0, -4], feliz: t > T.candado2 + 0.4 ? 1 : 0, ceja: 8 });
    set(clic, { o: t > T.candado2 + 0.35 && t < T.candado2 + 1.3 ? 1 : 0, s: pop(t, T.candado2 + 0.35, 0.25), r: -8 });
    face(dama, t, { look: [8, 6], bL: t > T.mujer ? 16 : 0, bR: t > T.mujer ? 16 : 0, seed: 0.2 }); popA(hm, t, T.mujer + 0.3, { r: -4 });
  };
});
shakeAt(T.candado2 + 0.35, 0.3, 14);

/* L3 · pero en las crónicas de las Cruzadas… lupa: «0» — ni uno */
headline(L(3) - 0.1, L(4) - 0.1, 'Las *crónicas*', { size: 92, hlT: T.cronicas });
plano(L(3) - 0.1, L(4) - 0.1, { background: '#efe1c6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 5px, transparent 5px 140px)' }, c => {
  const cam = CAM(c);
  ESTANTE(cam, 700, 2); ESTANTE(cam, 1000, 2);
  const lom = [...Array(14)].map((_, i) => box(cam, 70 + (i % 7) * 135, i < 7 ? 470 : 770, 110, 230, { zIndex: 3, background: [ROJO, '#2b4a8c', VERDE, '#6b4a2a', GOLD][i % 5], border: `5px solid ${INK}`, borderRadius: '6px', backgroundImage: 'linear-gradient(transparent 30px, rgba(255,255,255,.35) 30px 40px, transparent 40px 180px, rgba(255,255,255,.35) 180px 190px, transparent 190px)' }));
  const lib = figura(cam, 160, 620, 760, 490, libroViejoInner('CRÓNICAS', ['Cruzadas', '1096–1291']), '0 0 760 490', { z: 8, origin: '50% 50%' });
  const lupa = box(cam, 0, 0, 300, 380, { zIndex: 14 }, `<svg viewBox="0 0 300 380" width="300" height="380"><path d="M200,230 L280,360" stroke="#8a5a32" stroke-width="34" stroke-linecap="round"/><circle cx="130" cy="140" r="115" fill="rgba(200,235,250,.45)" stroke="${INK}" stroke-width="14"/><circle cx="130" cy="140" r="115" fill="none" stroke="${GOLD}" stroke-width="7"/></svg>`);
  const cero = texto(cam, 1130, 'candados: 0', { size: 110, color: ROJO, x: 300, w: 760 });
  const nu = stamp(cam, 380, 880, 'NI UNO', { size: 110, z: 30 });
  sp(T.cronicas, 'paper', 0.8); sp(T.cronicas + 0.6, 'tick', 0.5); sp(T.cronicas + 1.1, 'tick', 0.5); sp(T.ninguno, 'stamp', 1);
  return t => {
    zoom(cam, t, L(3), 3.5, 0.08);
    lom.forEach((l, i) => set(l, { y: t > L(3) + 0.1 + i * 0.03 ? 0 : -60, o: 1 }));
    const kl = p(t, T.cronicas - 0.2, 0.45, E.outBack); set(lib, { s: kl, o: t > T.cronicas - 0.2 ? 1 : 0, r: -2 });
    set(lupa, { x: 300 + Math.sin(t * 3) * 230, y: 600 + Math.cos(t * 2.3) * 110, o: t > T.cronicas + 0.3 ? 1 : 0, r: Math.sin(t * 2) * 8 });
    set(cero, { o: t > T.ninguno - 0.4 ? 1 : 0, s: pop(t, T.ninguno - 0.4, 0.35) }); stampA(nu, t, T.ninguno, -8);
  };
});
shakeAt(T.ninguno, 0.3, 14);

/* L4 · 1405: primera mención — el libro de inventos militares Bellifortis; el dibujo… seguramente de broma */
headline(L(4) - 0.1, L(5) - 0.1, 'La primera *mención*', { size: 88, hlT: T.primera + 0.3 });
plano(L(4) - 0.1, L(5) - 0.1, { background: '#d8c3a0', backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,240,180,.7), transparent 60%)' }, c => {
  const cam = CAM(c);
  sello(c, 380, '1405', T.m1405, { size: 130, r: -4, col: INK });
  const kon = mkBust(cam, [700, 820, 340, 435], { hat: 'slouch', beard: true, moustache: true, seed: 14 });
  const lib = figura(cam, 70, 560, 760, 490, libroViejoInner('BELLIFORTIS', []), '0 0 760 490', { z: 8, origin: '50% 50%' });
  const dib = [
    figura(cam, 470, 640, 300, 200, `<path d="M20,180 L280,180 M60,180 L150,60 L240,180 M150,60 L90,20" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="90" cy="20" r="16" fill="${INK}"/>`, '0 0 300 200', { z: 9, origin: '50% 50%' }),
    figura(cam, 480, 860, 160, 130, `<path d="M20,120 L140,120 M30,120 V40 H130 V120 M50,40 L80,10 L110,40" stroke="${INK}" stroke-width="7" fill="none"/>`, '0 0 160 130', { z: 9, origin: '50% 50%' }),
  ];
  const kd = CANDADO(cam, 600, 640, 180); kd.style.filter = 'sepia(1) contrast(1.3)';
  const ja = [0, 1, 2].map(i => texto(cam, 520 + i * 160, '¡JA!', { size: 90, color: ROJO, x: [130, 700, 330][i], w: 260, z: 25, shadow: `4px 4px 0 ${INK}` }));
  const br = stamp(cam, 160, 1180, 'BROMA', { size: 100, z: 30 });
  sp(T.libro, 'paper', 0.8); sp(T.dibujo, 'pop2', 0.6); [0, 1, 2].forEach(i => sp(T.broma + i * 0.15, 'pop', 0.5)); sp(T.broma + 0.5, 'stamp', 1);
  return t => {
    zoom(cam, t, L(4), 7, 0.06);
    const kl = p(t, T.primera - 0.2, 0.5, E.outBack); set(lib, { s: kl, o: t > T.primera - 0.2 ? 1 : 0, r: -2 });
    dib.forEach((d, i) => set(d, { o: t > T.libro + i * 0.3 ? 1 : 0, s: pop(t, T.libro + i * 0.3, 0.35), r: i ? 4 : -3 }));
    set(kd, { o: t > T.dibujo ? 1 : 0, s: pop(t, T.dibujo, 0.4), r: Math.sin(t * 3) * 4 }); canFace(kd, t, { look: [-6, 0], feliz: t > T.broma ? 1 : 0, jaw: t > T.broma ? 0.7 : 0, closed: t > T.broma && t < T.broma + 1 });
    face(kon, t, { look: [-10, 0], jaw: t > T.broma ? Math.abs(Math.sin(t * 14)) * 0.6 : 0, closed: t > T.broma, bL: 8, bR: 8, seed: 0.4 }); set(kon.d, { o: t > T.libro - 0.3 ? 1 : 0, y: t > T.broma ? Math.sin(t * 30) * 4 : 0 });
    ja.forEach((e, i) => set(e, { o: t > T.broma + i * 0.15 ? 1 : 0, s: pop(t, T.broma + i * 0.15, 0.3), r: [-12, 10, -4][i], y: Math.sin(t * 12 + i) * 8 }));
    stampA(br, t, T.broma + 0.5, -8);
  };
});
shakeAt(T.broma + 0.5, 0.3, 14);

/* L5 · un meme de la época: grabado satírico del marido celoso con llave gigante; el pueblo se ríe */
headline(L(5) - 0.1, L(6) - 0.1, 'Un *meme* medieval', { size: 92, hlT: T.meme });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const mar = box(cam, 180, 390, 720, 620, { zIndex: 5, background: '#f4efe2', border: `16px solid ${WOOD}`, boxShadow: `0 0 0 6px ${INK}, 14px 14px 0 6px ${INK}` });
  const mc = mkBust(mar, [190, 120, 300, 384], { hat: 'brodie', moustache: true, seed: 81 }); mc.d.style.filter = 'sepia(.9)';
  const llave = box(mar, 450, 160, 220, 300, { zIndex: 5 }, `<svg viewBox="0 0 220 300" width="220" height="300"><circle cx="110" cy="60" r="50" fill="none" stroke="${INK}" stroke-width="22"/><circle cx="110" cy="60" r="50" fill="none" stroke="${GOLD}" stroke-width="12"/><path d="M110,110 V290 M110,250 H160 M110,210 H150" stroke="${INK}" stroke-width="22"/><path d="M110,110 V290 M110,250 H160 M110,210 H150" stroke="${GOLD}" stroke-width="12"/></svg>`);
  const ttl = el('div', mar, { left: '0', top: '520px', width: '688px', textAlign: 'center', fontFamily: 'Rye', fontSize: '50px', color: INK }, 'EL MARIDO CELOSO');
  const ch = [['chistes', T.chistes, 120, 1060], ['sátiras', T.satiras, 640, 1060]].map(([s, t0, x, y]) => [chip(cam, x, y, s, { size: 60, bg: YEL, color: INK }), t0]);
  const pub = [[330, 1120, 0], [560, 1140, 1], [790, 1120, 2]].map(([x, y, i]) => VISITA(cam, x, y, 200, i + 3));
  const ja = [0, 1, 2].map(i => texto(cam, 1060, 'JA', { size: 64, color: ROJO, x: 360 + i * 230, w: 160, z: 25 }));
  sp(T.meme, 'pop2', 0.7); sp(T.chistes, 'pop', 0.6); sp(T.satiras, 'pop', 0.6); sp(T.maridos, 'boing', 0.7);
  return t => {
    zoom(cam, t, L(5), 4, 0.06);
    set(mar, { s: pop(t, T.meme - 0.2, 0.45), r: -2 + Math.sin(t * 2) });
    face(mc, t, { look: [8, 0], bL: -6, bR: -6, jaw: t > T.maridos ? 0.4 : 0, seed: 0.1 }); set(llave, { r: Math.sin(t * 4) * 10 });
    ch.forEach(([e, t0], i) => popA(e, t, t0, { r: i ? 4 : -4 }));
    const laugh = t > T.maridos - 0.2; pub.forEach((b, i) => { set(b.d, { o: t > T.chistes ? 1 : 0, y: laugh ? Math.sin(t * 24 + i) * 6 : 0 }); face(b, t, { closed: laugh, jaw: laugh ? 0.5 + 0.3 * Math.sin(t * 20 + i) : 0, look: [0, -6], seed: i }); });
    ja.forEach((e, i) => set(e, { o: laugh && Math.sin(t * 10 + i * 2) > -0.3 ? 1 : 0, r: (i - 1) * 12, y: -Math.abs(Math.sin(t * 9 + i)) * 20 }));
  };
});

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · se fabricaron en los siglos XVIII y XIX: herrería con chispas, calendario que corre; el coleccionista de chistera */
headline(L(7) - 0.1, L(8) - 0.1, 'Hechos en el *siglo XIX*', { size: 84, hlT: T.siglos });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#c9a882', backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 5px, transparent 5px 80px)' }, c => {
  const cam = CAM(c);
  const forja = box(cam, 60, 860, 300, 400, { zIndex: 3, background: '#3a2a20', border: `7px solid ${INK}`, borderRadius: '20px 20px 0 0' });
  const fuego = [0, 1, 2].map(i => box(cam, 110 + i * 70, 1100, 70, 120, { zIndex: 4, background: i % 2 ? '#f28c28' : GOLD, border: `5px solid ${INK}`, borderRadius: '50% 50% 40% 40% / 70% 70% 30% 30%' }));
  const yunque = box(cam, 420, 1100, 400, 160, { zIndex: 6 }, `<svg viewBox="0 0 400 160" width="400" height="160"><path d="M20,10 H360 C380,10 390,40 340,50 H280 V110 H330 V160 H70 V110 H120 V50 H40 Z" fill="#4a4f55" stroke="${INK}" stroke-width="7"/></svg>`);
  const k = CANDADO(cam, 520, 830, 220); k.style.zIndex = 7;
  const mart = box(cam, 640, 600, 260, 260, { zIndex: 9, transformOrigin: '90% 90%' }, `<svg viewBox="0 0 260 260" width="260" height="260"><path d="M230,230 L90,90" stroke="#8a5a32" stroke-width="26" stroke-linecap="round"/><rect x="20" y="40" width="130" height="70" rx="10" transform="rotate(45 85 75)" fill="#4a4f55" stroke="${INK}" stroke-width="7"/></svg>`);
  const chis = [...Array(8)].map(() => ESTRELLA(cam, 40, GOLD));
  const cal = box(cam, 380, 380, 320, 200, { zIndex: 8, background: CREMA, border: `7px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '110px', textAlign: 'center', lineHeight: '190px', color: INK }, '1405');
  const col = mk(cam, [700, 860, 340, 435], bustInner({ moustache: true, seed: 66 }) + TOPHAT(), '0 0 360 460', 'bust'); col.d.style.zIndex = 5;
  const pr = chip(cam, 640, 780, '¡lo quiero!', { size: 50, bg: '#fff', color: INK });
  sp(T.fabricaron, 'thud', 0.8); sp(T.fabricaron + 0.45, 'thud', 0.8); sp(T.siglos, 'whoosh', 0.7); sp(T.colecc, 'cash', 0.8); sp(T.peculiares, 'boing', 0.8);
  return t => {
    zoom(cam, t, L(7), 7, 0.05);
    fuego.forEach((f, i) => set(f, { sy: 1 + 0.25 * Math.sin(t * 14 + i * 2), y: -Math.abs(Math.sin(t * 9 + i)) * 10 }));
    const ph = ((t - T.fabricaron) * 2.2) % 1, hit = t > T.fabricaron && t < T.colecc;
    set(mart, { r: hit ? -40 + 40 * Math.abs(Math.sin(ph * Math.PI)) : -30 });
    chis.forEach((s, i) => { const a = i / 8 * Math.PI * 2, kk = hit ? (ph * 3) % 1 : 0; set(s, { x: 610 + Math.cos(a) * 160 * kk, y: 860 + Math.sin(a) * 120 * kk, o: hit && kk < 0.8 ? 1 : 0, s: 1 - kk * 0.6 }); });
    canFace(k, t, { closed: hit && Math.sin(ph * Math.PI) < 0.3, feliz: t > T.colecc ? 1 : -0.4, ceja: t > T.colecc ? 10 : 0 }); set(k, { y: hit ? Math.abs(Math.sin(ph * Math.PI)) * -6 : 0 });
    const yr = t < T.siglos ? 1405 : Math.round(lerp(1405, 1850, p(t, T.siglos, 1.0, E.inOutCubic))); cal.textContent = String(yr); set(cal, { r: Math.sin(t * 20) * (t > T.siglos && t < T.siglos + 1 ? 3 : 0), s: pop(t, L(7), 0.4) });
    set(col.d, { o: t > T.colecc - 0.2 ? 1 : 0, x: (1 - p(t, T.colecc - 0.2, 0.45, E.outBack)) * 500 }); face(col, t, { look: [-10, 2], bL: t > T.peculiares ? 4 : 0, bR: t > T.peculiares ? 18 : 0, jaw: t > T.peculiares && t < T.peculiares + 0.6 ? 0.5 : 0, seed: 0.5 });
    popA(pr, t, T.colecc + 0.4, { r: 4 });
  };
});
emu(T.peculiares + 0.4);

/* L8 · Museo Británico: la ficha se reescribe en vivo «medieval» → «probablemente s. XVIII–XIX»; otros museos lo retiran (operario con caja) */
headline(L(8) - 0.1, L(9) - 0.1, 'El *Museo Británico*', { size: 90, hlT: T.britanico });
plano(L(8) - 0.1, T.otros - 0.1, { background: '#e6dcc6' }, c => {
  const cam = CAM(c);
  const fach = box(cam, 90, 380, 900, 300, { zIndex: 3 }, `<svg viewBox="0 0 900 300" width="900" height="300"><path d="M20,140 L450,10 L880,140 Z" fill="#ece4d2" stroke="${INK}" stroke-width="7"/><rect x="40" y="140" width="820" height="40" fill="#d9cfb8" stroke="${INK}" stroke-width="6"/><text x="450" y="172" text-anchor="middle" font-family="Rye" font-size="34" fill="${INK}">BRITISH MUSEUM</text>${[...Array(8)].map((_, i) => `<rect x="${70 + i * 105}" y="180" width="50" height="120" fill="#ece4d2" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  const v = VITRINA(cam, 140, 720, 380, 460, 5);
  const k = CANDADO(cam, 210, 780, 240); k.style.zIndex = 7;
  const fi = FICHA(cam, 560, 760, '', 20); fi.style.width = '440px'; fi.style.height = '300px'; fi.style.fontSize = '40px';
  sp(T.britanico, 'pop2', 0.6); sp(T.ficha, 'paper', 0.7); sp(T.probable, 'typing', 0.8); sp(T.epoca, 'ding', 0.7);
  return t => {
    zoom(cam, t, L(8), 3, 0.05); set(fach, { s: pop(t, L(8), 0.4) });
    const a = 'Cinturón de castidad', b1 = '<s style="color:#c8102e">Medieval</s>', b2 = 'probablemente<br><b>s. XVIII–XIX</b>';
    const n = Math.round(clamp(p(t, T.probable - 0.1, 1.2)) * 30); fi.innerHTML = `${a}<br>${t > T.probable - 0.2 ? b1 : 'Medieval'}<br>${t > T.probable - 0.1 ? b2.slice(0, Math.max(0, n * 2)).replace(/<[^>]*$/, '') : ''}`;
    set(fi, { s: pop(t, T.ficha - 0.1, 0.35), o: t > T.ficha - 0.1 ? 1 : 0, r: 2 });
    canFace(k, t, { look: [10, 0], feliz: t > T.epoca ? -1 : 0.5, ceja: t > T.probable ? 14 : 0, mej: t > T.epoca, jaw: t > T.epoca ? 0.3 : 0 }); set(k, { r: Math.sin(t * 2.6) * 5 });
  };
});
plano(T.otros - 0.1, L(9) - 0.1, { background: '#e6dcc6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 4px, transparent 4px 90px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1300, 1080, 620, { zIndex: 2, background: 'repeating-linear-gradient(45deg, #b98c5a 0 60px, #a67a4a 60px 120px)', borderTop: `8px solid ${INK}` });
  const vs = [0, 1, 2].map(i => VITRINA(cam, 330 + i * 0, 420, 420, 480, 3)).slice(0, 1);
  const vacia = FICHA(cam, 330, 640, 'RETIRADO', 9); vacia.style.textAlign = 'center'; vacia.style.fontSize = '54px'; vacia.style.lineHeight = '110px';
  const op = mkBust(cam, [380, 900, 320, 410], { hat: 'cap', moustache: true, seed: 52 });
  const caja = box(cam, 0, 0, 280, 200, { zIndex: 12, background: '#c9a86a', border: `7px solid ${INK}`, borderRadius: '6px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '40px', textAlign: 'center', lineHeight: '190px', color: INK }, 'ALMACÉN');
  const k = CANDADO(cam, 0, 0, 160); k.style.zIndex = 11;
  sp(T.otros, 'whoosh', 0.6); sp(T.retirado, 'thud', 0.9); sp(T.retirado + 0.3, 'stamp', 0.8); sp(T.retirado + 0.5, 'sad', 0.6);
  return t => {
    const kk = p(t, T.otros, 1.0, E.inOutCubic), go = p(t, T.retirado + 0.2, 0.6, E.inCubic);
    set(op.d, { x: lerp(780, 280, kk) + go * 700, y: -Math.abs(Math.sin(t * 9)) * 14 }); face(op, t, { look: [-8, 0], jaw: t > T.retirado ? 0.4 : 0, seed: 0.3 });
    set(caja, { x: 380 + lerp(780, 280, kk) + go * 700, y: 1100 - Math.abs(Math.sin(t * 9)) * 14, r: -3 });
    set(k, { x: 440 + lerp(780, 280, kk) + go * 700, y: 970 - Math.abs(Math.sin(t * 9)) * 14, r: Math.sin(t * 6) * 8 }); canFace(k, t, { look: [-10, -6], feliz: -1, ceja: 14, jaw: 0.4 });
    stampA(vacia, t, T.retirado + 0.3, -6);
  };
});
shakeAt(T.retirado, 0.3, 12);

/* L9 · hierro día y noche → heridas e infecciones: sol y luna giran, el candado se oxida y enferma; tiritas y bichos */
headline(L(9) - 0.1, L(10) - 0.1, 'Hierro *día y noche*', { size: 88, hlT: T.dia });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#d9ecef' }, c => {
  const cam = CAM(c);
  const cielo = box(cam, 0, 0, 1080, 1920, { zIndex: 0, background: '#2f3d5c' });
  const ast = box(cam, 340, 380, 400, 400, { zIndex: 2, transformOrigin: '200px 200px' }, `<svg viewBox="0 0 400 400" width="400" height="400" style="overflow:visible"><circle cx="200" cy="-40" r="60" fill="${GOLD}" stroke="${INK}" stroke-width="6"/><circle cx="200" cy="440" r="50" fill="#f4efe2" stroke="${INK}" stroke-width="6"/></svg>`);
  const k = CANDADO(cam, 380, 660, 320); k.style.zIndex = 7;
  const bich = [0, 1, 2, 3].map(i => figura(cam, 0, 0, 120, 120, virusInner(['#9fd3c0', '#c9e27a', '#9fd3c0', '#e2a07a'][i]), '0 0 300 300', { z: 12, origin: '50% 50%' }));
  const tir = [0, 1].map(i => box(cam, 0, 0, 170, 60, { zIndex: 13, background: '#f2c9a0', border: `5px solid ${INK}`, borderRadius: '30px', backgroundImage: `radial-gradient(circle, rgba(43,33,24,.35) 3px, transparent 4px)`, backgroundSize: '22px 22px' }));
  const gr = stamp(cam, 330, 1150, '¡AY!', { size: 110, z: 30 });
  [0, 1, 2, 3].forEach(i => sp(T.infecc + i * 0.2, 'pop', 0.5)); sp(T.heridas, 'scratch', 0.8); sp(T.heridas + 0.2, 'stamp', 0.9);
  return t => {
    const d = p(t, T.dia - 0.1, 1.4, E.inOutCubic); set(ast, { r: d * 360 }); set(cielo, { o: 0.15 + 0.85 * Math.abs(Math.sin(d * Math.PI)) });
    set(k, { r: Math.sin(t * (t > T.infecc ? 18 : 2.6)) * (t > T.infecc ? 3 : 5) });
    canFace(k, t, { look: [0, 4], feliz: t > T.heridas ? -1 : 0, ceja: t > T.heridas ? -4 : 0, closed: t > T.infecc, ox: clamp(p(t, T.hierro, 2.5)), jaw: t > T.heridas ? 0.4 : 0 });
    bich.forEach((b, i) => { const a = t * 1.8 + i * 1.57; set(b, { x: 480 + Math.cos(a) * 300, y: 840 + Math.sin(a) * 260, o: t > T.infecc + i * 0.2 ? 1 : 0, s: pop(t, T.infecc + i * 0.2, 0.3), r: t * 60 }); });
    tir.forEach((e, i) => set(e, { x: [400, 560][i], y: [760, 960][i], r: [30, -25][i], o: t > T.heridas + 0.3 + i * 0.2 ? 1 : 0, s: pop(t, T.heridas + 0.3 + i * 0.2, 0.3) }));
    stampA(gr, t, T.heridas + 0.2, -8);
  };
});
shakeAt(T.heridas + 0.2, 0.3, 14);

/* L10 · la «Edad Media oscura y salvaje»: nubarrón negro con rayos sobre el castillo… que se disipa: «se inventó después» (s. XIX) */
headline(L(10) - 0.1, L(11) - 0.1, 'La Edad Media *«oscura»*', { size: 84, hlT: T.edad10 + 0.4 });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const sol = box(cam, 780, 380, 180, 180, { zIndex: 1, background: GOLD, border: `7px solid ${INK}`, borderRadius: '50%' });
  CASTILLO(cam, 140, 720, 800);
  box(cam, 0, 1330, 1080, 600, { zIndex: 4, background: '#7a9a52', borderTop: `8px solid ${INK}` });
  const nube = box(cam, 40, 360, 1000, 420, { zIndex: 6 }, `<svg viewBox="0 0 1000 420" width="1000" height="420" style="overflow:visible"><path d="M100,320 C20,320 20,200 120,190 C120,90 260,60 320,130 C360,40 520,30 560,130 C620,60 780,80 790,190 C900,180 960,320 860,330 Z" fill="#2b2b33" stroke="${INK}" stroke-width="8"/><path class="rayo" d="M380,320 L330,430 L390,420 L340,540" stroke="${GOLD}" stroke-width="16" fill="none" stroke-linejoin="round"/><path class="rayo" d="M660,320 L610,440 L670,430 L620,560" stroke="${GOLD}" stroke-width="16" fill="none" stroke-linejoin="round"/></svg>`);
  const os = texto(cam, 820, 'OSCURA', { size: 100, color: '#fff', x: 140, w: 800, z: 8, shadow: `5px 5px 0 ${INK}` });
  const inv = stamp(cam, 260, 1100, 'INVENTO DEL S. XIX', { size: 64, z: 30, col: VERDE, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const ra = [...nube.querySelectorAll('.rayo')];
  sp(T.edad10, 'thud', 0.9); sp(T.salvaje, 'glitch', 0.8); sp(T.invento10, 'whoosh', 0.9); sp(T.despues, 'stamp', 1); sp(T.despues + 0.3, 'sparkle', 0.7);
  return t => {
    zoom(cam, t, L(10), 5, 0.06); set(sol, { r: t * 15 });
    const di = p(t, T.invento10, 1.0, E.inCubic); set(nube, { o: 1 - di, s: 1 + di * 0.5, y: -di * 200, x: t < T.invento10 ? Math.sin(t * 20) * 4 : 0 });
    ra.forEach((r, i) => r.style.opacity = t > T.salvaje && t < T.invento10 && Math.sin(t * 17 + i * 3) > 0.3 ? 1 : 0);
    set(os, { o: (t > T.edad10 + 0.3 ? 1 : 0) * (1 - di), s: pop(t, T.edad10 + 0.3, 0.35), r: -3 });
    stampA(inv, t, T.despues, -6);
  };
});
shakeAt(T.salvaje, 0.4, 16);

/* L11 · OJO: algún caso aislado pudo existir; no como costumbre */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const k = CANDADO(c, 420, 560, 240); const q = texto(c, 560, '?', { size: 180, color: ROJO, x: 700, w: 200 });
  aparece(chip(c, 330, 960, 'algún caso aislado', { size: 60, bg: YEL, color: INK }), T.aislado);
  const no = stamp(c, 320, 1110, 'NO COSTUMBRE', { size: 74, z: 30 });
  sp(T.costumbre, 'stamp', 0.9);
  return t => { set(k, { r: Math.sin(t * 2.6) * 6 }); canFace(k, t, { look: [8, -4], ceja: 12, feliz: 0 }); set(q, { r: Math.sin(t * 5) * 12, s: 1 + 0.08 * Math.sin(t * 7) }); stampA(no, t, T.costumbre, -6); };
});

/* L12 · O sea: medieval → no: moderno */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 300, '¿Medieval?…', { size: 110 });
  const b = texto(c, 440, '…más bien <i>moderno</i>', { size: 104, color: ROJO });
  const k = CANDADO(c, 380, 640, 320);
  const cal = box(c, 680, 1000, 300, 180, { zIndex: 12, background: CREMA, border: `7px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '96px', textAlign: 'center', lineHeight: '170px', color: INK }, '1850');
  const x = box(c, 330, 990, 260, 200, { zIndex: 12, background: CREMA, border: `7px solid ${INK}`, borderRadius: '14px', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', textAlign: 'center', lineHeight: '190px', color: INK, textDecoration: 'line-through', textDecorationColor: ROJO, textDecorationThickness: '10px' }, '1200');
  return t => { set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.moderno - 0.2 ? 1 : 0, s: pop(t, T.moderno - 0.2, 0.35) }); set(k, { r: Math.sin(t * 4) * 5 }); canFace(k, t, { feliz: 1, jaw: talkW(t, 'VECINO') * 0.6, ceja: 6 }); set(cal, { o: t > T.moderno ? 1 : 0, s: pop(t, T.moderno, 0.35), r: 4 }); set(x, { r: -4 }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.moderno, 'stamp', 0.8);

/* L13 · pregunta final */
preguntaFinal('¿Qué más de la Edad Media', 'crees que es mentira?', { size: 80, draw: c => [['que no se bañaban', YEL], ['la Tierra plana', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 330 + i * 40, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(72, 'El cinturón de castidad', ['CASTIDAD', 'bulo']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.broma, T.broma + 1.2], [T.peculiares, T.peculiares + 1.0], [T.maridos, T.maridos + 0.8]], sorpresa: [[T.ninguno, T.ninguno + 0.8], [T.probable, T.probable + 0.8], [T.salvaje, T.salvaje + 0.8]], golpes: [T.candado2 + 0.35, T.ninguno, T.broma + 0.5, T.retirado, T.heridas + 0.2, T.despues] },
});
