/* Ep. 302 · «Ese dibujito de tu champú es una fecha de caducidad» — el símbolo del tarro abierto (PAO, «período tras la apertura»).
   Reglamento (CE) 1223/2009, art. 19.1.c: duración mínima ≤ 30 meses → fecha («utilícese preferentemente antes del final de» o reloj de arena);
   > 30 meses → tarro abierto con los meses de uso tras abrirlo (12M = 12 meses).
   Portada amarilla del canal; un objeto-metáfora por dato: 12 → calendario de 12 hojas, bote que se abre y le entra de todo, bandera UE con dos fichas, crema solar con sello. */
Story.prepara();
const T = {
  cad: Q('fecha de caducidad'),
  deco: Q('decoración'), bote: Q('un bote abierto'), numero: Q('un número'), eme: Q('una m'),
  signif: Q('qué significa'), tres: Q('tres pasos'),
  m1: Q('la m es'), meses: Q('meses'), doce: Q('doce m'), abierto4: Q('una vez abierto'), dura: Q('dura doce meses'),
  abres: Q('lo abres'), aire: Q('aire'), agua: Q('agua'), bact: Q('bacterias'), dedos: Q('dedos'), estrop: Q('estropeando'), parezca: Q('no lo parezca'),
  europa: Q('en europa'), oblig: Q('obligatorio'), mas30: Q('más de treinta meses'), dibujo: Q('este dibujo'), menos: Q('duran menos'), fecha: Q('una fecha normal'),
  ojo: Q('ojo'), dano: Q('hacer daño'), garant: Q('no te garantizan'), igual: Q('funcione igual'),
  crema: Q('crema solar'), verano: Q('verano pasado'), proteja: Q('no proteja'), bote8: Q('en el bote'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const TEAL = '#7fc4d8', NAR = '#F2983E', AZUE = '#003399', ORO = '#FFCC00', VERDE = '#2e9e6b';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };

/* símbolo del tarro abierto (vb 0 0 200 200); .lid = tapa, .n12 y .mm = el número y la M */
const paoInner = (num = '12') => `<path d="M38,80 L162,80 L153,186 Q152,194 144,194 L56,194 Q48,194 47,186 Z" fill="#fff" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <g class="lid" transform="rotate(-26 34 66)"><rect x="30" y="54" width="140" height="24" rx="6" fill="#fff" stroke="${INK}" stroke-width="9"/></g>
  <text x="100" y="158" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="56" fill="${INK}"><tspan class="n12">${num}</tspan><tspan class="mm">M</tspan></text>`;
const PAO = (c, x, y, w, z = 8) => figura(c, x, y, w, w, paoInner(), '0 0 200 200', { z, origin: '50% 50%' });
const lidA = (f, a) => f.querySelector('.lid').setAttribute('transform', `rotate(${f1(a)} 34 66)`);
/* bote con cara (vb 0 0 300 600): .tapa (bisagra 202,102), .cuerpo, .lab; cara CARAC (conFace) */
const boteInner = (col, lab) => `<ellipse cx="150" cy="99" rx="30" ry="9" fill="${INK}"/>
  <rect x="114" y="98" width="72" height="40" fill="#fff" stroke="${INK}" stroke-width="7"/>
  <path class="cuerpo" d="M62,172 Q62,140 104,134 L196,134 Q238,140 238,172 L250,556 Q250,592 216,592 L84,592 Q50,592 50,556 Z" fill="${col}" stroke="${INK}" stroke-width="8"/>
  <path d="M80,190 Q74,330 84,520" stroke="#fff" stroke-width="12" fill="none" opacity=".45" stroke-linecap="round"/>
  <g transform="translate(0,46)">${CARAC}</g>
  <rect x="72" y="262" width="156" height="236" rx="16" fill="${CREMA_E}" stroke="${INK}" stroke-width="6"/>
  <text class="lab" x="150" y="302" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="32" fill="${INK}">${lab}</text>
  <g transform="translate(86,318) scale(0.64)">${paoInner()}</g>
  <g class="tapa"><rect x="98" y="44" width="104" height="58" rx="14" fill="#fff" stroke="${INK}" stroke-width="7"/><rect x="104" y="26" width="92" height="24" rx="10" fill="#fff" stroke="${INK}" stroke-width="7"/></g>`;
const BOTE = (c, x, y, w, col = TEAL, lab = 'CHAMPÚ', z = 8) => figura(c, x, y, w, w * 2, boteInner(col, lab), '0 0 300 600', { z });
const tapaA = (f, a) => f.querySelector('.tapa').setAttribute('transform', `rotate(${f1(a)} 202 102)`);
/* bacteria con cara (vb 0 0 220 220, cara CARAS → sacoFace) */
const BACT = (c, sz, col = '#8fd16a', z = 14) => figura(c, 0, 0, sz, sz, `${[...Array(9)].map((_, i) => { const a = i / 9 * Math.PI * 2; return `<path d="M${f1(110 + Math.cos(a) * 74)},${f1(118 + Math.sin(a) * 74)} L${f1(110 + Math.cos(a) * 100)},${f1(118 + Math.sin(a) * 100)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`; }).join('')}
  <path d="M110,40 C170,38 192,90 188,124 C184,170 150,196 108,194 C62,192 30,164 32,118 C34,72 62,42 110,40 Z" fill="${col}" stroke="${INK}" stroke-width="7"/><circle cx="70" cy="160" r="9" fill="${INK}" opacity=".18"/><circle cx="160" cy="80" r="7" fill="${INK}" opacity=".18"/>${CARAS}`, '0 0 220 220', { z, origin: '50% 50%' });
/* mano con el dedo índice apuntando a la izquierda (vb 0 0 300 170) */
const MANO = (c, z = 16) => figura(c, 0, 0, 330, 187, `<path d="M8,62 Q8,42 28,42 L160,42 L160,86 L28,86 Q8,86 8,62 Z" fill="#f1c29a" stroke="${INK}" stroke-width="7"/><path d="M140,22 Q210,4 300,24 L300,156 Q210,172 140,146 Q120,120 150,104 Q118,96 140,70 Z" fill="#f1c29a" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M160,104 h60 M160,128 h56" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M30,48 q-10,14 0,30" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/>`, '0 0 300 170', { z, origin: '50% 50%' });
/* calendario de pared con 12 hojas (ENE…DIC); .hojas[i] se arrancan una a una */
const MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
function CAL(c, x, y, w, z = 8) {
  const h = w * 1.05, d = box(c, x, y, w, h + 40, { zIndex: z, transformOrigin: '50% 50%' });
  box(d, 18, 58, w - 10, h - 30, { background: '#d9cdb4', border: `6px solid ${INK}`, borderRadius: '18px', boxShadow: `12px 14px 0 ${SH}` });
  const hojas = MES.map((m, i) => box(d, 6, 40, w - 20, h - 20, { zIndex: 12 - i, background: '#fbf6ea', border: `6px solid ${INK}`, borderRadius: '18px', overflow: 'hidden', transformOrigin: '50% 0%', boxSizing: 'border-box' },
    `<div style="background:${RED};color:#fff;font-family:Bricolage;font-weight:800;font-size:${f1(w * 0.15)}px;text-align:center;line-height:${f1(w * 0.24)}px;border-bottom:6px solid ${INK}">${m}</div>
     <div style="font-family:Bricolage;font-weight:800;font-size:${f1(w * 0.42)}px;text-align:center;line-height:${f1(w * 0.5)}px;color:${INK}">${i + 1}</div>
     <div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:${f1(w * 0.09)}px;text-align:center;color:${INK}">${i ? 'meses' : 'mes'}</div>`));
  box(d, 0, 0, w, 70, { zIndex: 20 }, `<svg viewBox="0 0 ${w} 70" width="${w}" height="70">${[0.2, 0.4, 0.6, 0.8].map(k => `<rect x="${f1(w * k - 10)}" y="6" width="20" height="58" rx="10" fill="#8E8A80" stroke="${INK}" stroke-width="5"/>`).join('')}</svg>`);
  d.hojas = hojas; return d;
}
/* bandera de la UE (vb 0 0 300 200); .est = corona de estrellas */
const UE = (c, x, y, w, z = 6) => figura(c, x, y, w, w * 2 / 3, `<rect x="0" y="0" width="300" height="200" rx="10" fill="${AZUE}" stroke="${INK}" stroke-width="8"/><g class="est">${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path transform="translate(${f1(150 + Math.cos(a) * 62)} ${f1(100 + Math.sin(a) * 62)})" d="M0,-11 L3,-3 L11,-3 L5,2 L7,10 L0,5 L-7,10 L-5,2 L-11,-3 L-3,-3 Z" fill="${ORO}"/>`; }).join('')}</g>`, '0 0 300 200', { z, origin: '0% 50%' });
const RELOJ_ARENA = `<path d="M10,6 H70 M10,94 H70 M16,6 Q16,40 40,50 Q16,60 16,94 M64,6 Q64,40 40,50 Q64,60 64,94" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M26,24 Q40,40 54,24 Z M24,88 Q40,66 56,88 Z" fill="${NAR}"/>`;

/* PORTADA + L0 · fondo papel con rayos amarillos, «¿QUÉ SIGNIFICA ESTE DIBUJO?», bote de champú con cara y lupa enorme con el tarro y «12M» */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t1 = texto(c, 270, '¿QUÉ SIGNIFICA', { size: 104, z: 30 });
  const t2 = texto(c, 385, hlSpan('ESTE DIBUJO?', 'phl'), { size: 122, italic: true, z: 30 });
  const bo = BOTE(c, 70, 640, 340, TEAL, 'CHAMPÚ', 8);
  const lazo = box(c, 300, 960, 260, 200, { zIndex: 7 }, `<svg width="260" height="200" style="overflow:visible"><path d="M10,120 L230,10 M10,150 L240,190" stroke="${INK}" stroke-width="6" stroke-dasharray="14 10"/></svg>`);
  const lupa = box(c, 450, 600, 560, 560, { zIndex: 9, borderRadius: '50%', background: '#fff', border: `16px solid ${INK}`, boxShadow: `14px 16px 0 ${SH}`, boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const pz = PAO(lupa, 40, 30, 450, 10);
  const burb = [...Array(6)].map((_, i) => box(c, 0, 0, 40 + i * 8, 40 + i * 8, { zIndex: 5, borderRadius: '50%', border: `5px solid ${INK}`, background: 'rgba(255,255,255,.6)' }));
  sello(c, 1190, '¡CADUCIDAD!', T.cad + 0.15, { size: 112, r: -7 });
  sfx('swoosh_up', 0.05, 0.6);
  return t => {
    set(ry, { r: t * 6 });
    set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3) });
    paint(c.querySelector('.phl'), t, 0.2, 0.4);
    set(bo, { r: wobble(t, 0.6, 3), s: 1 + 0.02 * Math.sin(t * 4) }); tapaA(bo, 0);
    conFace(bo, t, { jaw: 0, look: [10, -4], feliz: t > T.cad ? -0.6 : 0.8, ceja: t > T.cad ? 8 : 0, seed: 0.4 });
    set(lupa, { r: wobble(t, 0.4, 2.5), s: 1 + 0.025 * Math.sin(t * 2.6) });
    lidA(pz, -26 + Math.sin(t * 3) * 5);
    burb.forEach((b, i) => { const k = ((t * 0.35 + i / 6) % 1); set(b, { x: 60 + i * 60 + Math.sin(t * 2 + i) * 30, y: 1300 - k * 700, o: 1 - k }); });
  };
}, { sfx: false });

/* L1 · «no es decoración» (florituras tachadas) → «un bote abierto» (la tapa salta) → «un número» y «una M» (aros rojos) */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 340, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const pz = PAO(cam, 230, 520, 620, 8);
  const est = [[160, 560], [860, 600], [180, 1050], [840, 1080]].map(([x, y], i) => { const e = ESTRELLA(cam, 110, i % 2 ? PINK : YEL); set(e, { x, y }); return [e, x, y]; });
  const deco = chip(c, 300, 1210, '¿decoración?', { size: 62, bg: PINK, z: 40 });
  const tacha = box(c, 280, 1240, 520, 22, { zIndex: 41, background: RED, borderRadius: '11px', transformOrigin: '0 50%' });
  const cB = chip(c, 330, 1210, 'bote abierto', { size: 62, bg: YEL, color: INK, z: 40 });
  const aro12 = box(cam, 351, 863, 230, 170, { zIndex: 12, border: `12px solid ${RED}`, borderRadius: '50%', boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const aroM = box(cam, 560, 863, 170, 170, { zIndex: 12, border: `12px solid ${RED}`, borderRadius: '50%', boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const cN = chip(c, 120, 1210, 'un número', { size: 58, bg: INK, z: 40 }), cM = chip(c, 600, 1210, 'una M', { size: 58, bg: RED, z: 40 });
  sp(T.deco - 0.2, 'sparkle', 0.5); sp(T.deco + 0.35, 'scratch', 0.6); sp(T.bote, 'boing', 0.6); sp(T.numero, 'pop', 0.5); sp(T.eme, 'pop2', 0.5);
  return t => {
    deriva(cam, t, L(1) - 0.1, L(2) - 0.08, [540, 900, 1.0], [540, 960, 1.1]); set(ry, { r: -t * 5 });
    const kd = p(t, T.deco + 0.3, 0.3);
    est.forEach(([e, x, y], i) => set(e, { x, y: y + kd * kd * 900, r: t * 90 * (i % 2 ? 1 : -1), s: 0.9 + 0.15 * Math.sin(t * 6 + i), o: t < T.deco - 0.25 ? 0 : 1 }));
    set(deco, { o: t > T.deco - 0.3 && t < T.bote - 0.15 ? 1 : 0, s: pop(t, T.deco - 0.3, 0.3), r: -3 });
    set(tacha, { o: t > T.deco + 0.3 && t < T.bote - 0.15 ? 1 : 0, sx: p(t, T.deco + 0.3, 0.25), r: -4 });
    lidA(pz, t < T.bote ? 0 : -34 * E.outElastic(clamp((t - T.bote) / 0.7)));
    set(pz, { r: wobble(t, 0.5, 2), s: t > T.bote && t < T.bote + 0.3 ? 1.06 : 1 });
    set(cB, { o: t > T.bote && t < T.numero - 0.1 ? 1 : 0, s: pop(t, T.bote, 0.3), r: 3 });
    const n = pz.querySelector('.n12'), m = pz.querySelector('.mm');
    n.setAttribute('fill', t > T.numero ? RED : INK); m.setAttribute('fill', t > T.eme ? RED : INK);
    set(aro12, { o: t > T.numero ? 1 : 0, s: pop(t, T.numero, 0.35), r: -6 }); set(aroM, { o: t > T.eme ? 1 : 0, s: pop(t, T.eme, 0.35), r: 6 });
    set(cN, { o: t > T.numero ? 1 : 0, s: pop(t, T.numero, 0.3), r: -3 }); set(cM, { o: t > T.eme ? 1 : 0, s: pop(t, T.eme, 0.3), r: 3 });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* L3 · «¿Qué significa? Te lo cuento en tres pasos.» */
plano(L(3) - 0.1, L(4) - 0.12, PAPEL, c => {
  const ry = rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const pz = PAO(c, 330, 380, 420, 8);
  const QM = [[220, 420], [800, 400], [190, 760], [820, 760]].map((q, i) => qMark(c, q[0], q[1], 130, i % 2 ? PINK : YEL));
  const nums = [1, 2, 3].map((n, i) => aparece(box(c, 420 + i * 170, 900, 140, 140, { borderRadius: '50%', background: YEL, border: `8px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '100px', lineHeight: '126px', color: INK, zIndex: 30 }, String(n)), T.tres + i * 0.18));
  return t => {
    set(ry, { r: t * 6 }); lidA(pz, -26 + Math.sin(t * 4) * 8); set(pz, { r: wobble(t, 0.7, 4), s: 1 + 0.04 * Math.sin(t * 5) });
    QM.forEach((q, i) => set(q, { s: pop(t, L(3) + i * 0.12, 0.3), r: Math.sin(t * 5 + i) * 12, o: t < L(3) + i * 0.12 ? 0 : 1 }));
  };
});

/* PASO 1 · la M es de meses; el «12» se convierte en un calendario de 12 hojas que se arrancan */
paso(L(4) - 0.1, L(5) - 0.1, 1, 'La ' + hlSpan('M', 'shl') + ' es de meses', T.m1 + 0.3);
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.2)', 'rgba(0,0,0,0)', 0);
  const pz = PAO(c, 290, 580, 500, 8);
  const meses = texto(c, 1100, 'M = ' + hlSpan('MESES', 'mhl'), { size: 110, z: 20 });
  const doce = box(c, 0, 0, 300, 220, { zIndex: 25, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '200px', lineHeight: '220px', textAlign: 'center', color: RED, textShadow: `5px 5px 0 ${INK}`, transformOrigin: '50% 50%' }, '12');
  const cal = CAL(c, 470, 580, 470, 10);
  const hojas = aparece(chip(c, 80, 1000, '12 hojas', { size: 60, bg: YEL, color: INK, z: 30 }), T.doce + 0.5);
  const tf = i => T.abierto4 + 0.05 + i * (T.dura + 0.9 - T.abierto4) / 11;
  sello(c, 1170, '12 MESES', T.dura + 0.8, { size: 120, r: -6 });
  for (let i = 0; i < 11; i++) sfx('paper', tf(i), 0.35);
  sp(T.meses, 'ding', 0.5); sp(T.doce, 'whoosh', 0.6);
  return t => {
    set(ry, { r: t * 5 });
    const kp = p(t, T.doce - 0.1, 0.5, E.inOutCubic);
    set(pz, { x: lerp(0, -210, kp), y: lerp(0, -40, kp), s: lerp(1, 0.6, kp), r: wobble(t, 0.6, 2.5) });
    lidA(pz, -26 + Math.sin(t * 3) * 5);
    pz.querySelector('.mm').setAttribute('fill', t > T.m1 + 0.2 ? RED : INK);
    set(meses, { o: t > T.meses - 0.15 && t < T.doce - 0.1 ? 1 : 0, s: pop(t, T.meses - 0.15, 0.35), r: -2 });
    paint(meses.querySelector('.mhl'), t, T.meses, 0.35);
    const kv = p(t, T.doce - 0.05, 0.55, E.inOutCubic);
    set(doce, { x: lerp(355, 555, kv), y: lerp(820, 750, kv), s: lerp(1, 0.4, kv), o: t > T.doce - 0.05 && kv < 1 ? 1 : 0 });
    set(cal, { o: t > T.doce + 0.3 ? 1 : 0, s: pop(t, T.doce + 0.3, 0.4), r: 2 + wobble(t, 0.5, 1.2) });
    cal.hojas.forEach((h, i) => { if (i === 11) return; const k = clamp((t - tf(i)) / 0.16); h.style.display = k >= 1 ? 'none' : ''; set(h, { sy: 1 - k, r: k * (i % 2 ? 8 : -8), o: 1 - k * 0.3 }); });
  };
});

/* PASO 2 · el baño: el bote se abre y le entran aire, gotas y bacterias con cara desde tus dedos; se estropea por dentro */
paso(L(5) - 0.1, L(6) - 0.1, 2, 'Al abrirlo, ' + hlSpan('entra de todo', 'shl'), T.aire);
plano(L(5) - 0.1, L(6) - 0.1, { background: '#dff1f5', backgroundImage: 'linear-gradient(90deg, rgba(43,33,24,.16) 4px, transparent 4px), linear-gradient(rgba(43,33,24,.16) 4px, transparent 4px)', backgroundSize: '120px 120px' }, c => {
  const cam = CAM(c);
  ESTANTE(cam, 1330, 4);
  const vaso = TARRO(cam, 70, 1110, 180, PINK, 'GEL');
  const bo = BOTE(cam, 340, 530, 400, TEAL, 'CHAMPÚ', 8);
  const viento = [0, 1, 2].map(i => box(cam, 0, 0, 480, 80, { zIndex: 12 }, `<svg width="480" height="80" style="overflow:visible"><path d="M0,40 Q60,0 120,40 T240,40 T360,40 Q420,70 470,40" stroke="#5bb8de" stroke-width="12" fill="none" stroke-linecap="round"/></svg>`));
  const gotas = [...Array(5)].map(() => lagrima(cam, 0, 0)); gotas.forEach(g => { g.style.transformOrigin = '50% 50%'; });
  const mano = MANO(cam, 16);
  const bichos = [...Array(6)].map((_, i) => BACT(cam, 130, i % 2 ? '#8fd16a' : '#c7e06a', 14));
  const dentro = [[420, 900], [560, 960], [470, 1080], [600, 1120], [430, 1200], [560, 1230]];
  const sud = sudor(cam, 0, 0);
  const cA = chip(c, 70, 600, 'aire', { size: 56, bg: '#5bb8de', z: 40 }), cG = chip(c, 70, 700, 'agua', { size: 56, bg: '#2b7fc4', z: 40 }), cBa = chip(c, 70, 800, 'bacterias', { size: 56, bg: VERDE, z: 40 });
  const cP = chip(c, 560, 1220, 'y no se nota', { size: 54, bg: INK, z: 40 });
  sp(T.abres, 'boing', 0.6); sp(T.aire, 'whoosh', 0.5); sp(T.agua, 'ping', 0.5); sp(T.agua + 0.3, 'ping', 0.4); sp(T.bact, 'squish', 0.6); sp(T.dedos, 'pop2', 0.6); sp(T.estrop, 'sad', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 960, 1.0], [540, 1000, 1.08]);
    set(vaso, { r: wobble(t, 0.6, 2) });
    const ko = p(t, T.abres, 0.6, E.outElastic); tapaA(bo, 115 * ko);
    set(bo, { r: wobble(t, 0.7, 1.5), y: t > T.dedos ? Math.sin(t * 20) * 3 : 0 });
    const asco = clamp((t - T.bact) / 0.4);
    conFace(bo, t, { jaw: t > T.abres && t < T.abres + 0.6 ? 0.6 : 0, look: t > T.dedos ? [12, -6] : [-10, -6], feliz: lerp(0.8, -1, asco), ceja: asco * 10, seed: 0.2 });
    viento.forEach((v, i) => { const k = clamp((t - T.aire + 0.2 - i * 0.18) / 0.9); set(v, { x: lerp(-480, 300, k), y: 560 + i * 50 + Math.sin(t * 6 + i) * 10, o: k > 0 && k < 1 ? 1 - k * 0.5 : 0, sx: 1 - k * 0.4 }); });
    gotas.forEach((g, i) => { const t0 = T.agua - 0.2 + i * 0.16, k = clamp((t - t0) / 0.5); set(g, { x: 500 + (i - 2) * 22, y: lerp(560, 680, k * k), s: 1.8, o: k > 0 && k < 1 ? 1 : 0 }); });
    const km = p(t, T.dedos - 0.8, 0.5, E.outBack); set(mano, { x: lerp(1100, 690, km) + Math.sin(t * 5) * 8, y: 620 + Math.sin(t * 4) * 10, r: -8, o: t > T.dedos - 0.8 ? 1 : 0 });
    bichos.forEach((b, i) => {
      const t0 = T.bact + i * 0.22, k = clamp((t - t0) / 0.55);
      const [dx, dy] = dentro[i];
      let x, y;
      if (k < 1) { x = lerp(700, 540, k); y = lerp(640, 660, k) - Math.sin(k * Math.PI) * 220; }
      else { const kk = clamp((t - t0 - 0.55) / 0.5); x = lerp(540, dx, kk) + Math.sin(t * 3 + i) * 10; y = lerp(660, dy, kk) + Math.cos(t * 4 + i) * 8; }
      set(b, { x: x - 65, y: y - 65, s: k < 1 ? 0.8 : 0.7, r: Math.sin(t * 6 + i) * 15, o: t > t0 ? 1 : 0 });
      sacoFace(b, t, { jaw: 0.3 + 0.3 * Math.abs(Math.sin(t * 8 + i)), feliz: 1, look: [Math.sin(t + i) * 4, 0], seed: i * 0.4 });
    });
    const ke = clamp((t - T.estrop) / 1.4); bo.querySelector('.cuerpo').setAttribute('fill', `rgb(${f1(lerp(127, 150, ke))},${f1(lerp(196, 160, ke))},${f1(lerp(216, 110, ke))})`);
    set(sud, { x: 600, y: 700 + ((t * 120) % 60), s: 1.4, o: t > T.estrop ? 1 : 0 });
    set(cA, { o: t > T.aire - 0.1 ? 1 : 0, s: pop(t, T.aire - 0.1, 0.3), r: -3 }); set(cG, { o: t > T.agua - 0.1 ? 1 : 0, s: pop(t, T.agua - 0.1, 0.3), r: 2 }); set(cBa, { o: t > T.bact - 0.1 ? 1 : 0, s: pop(t, T.bact - 0.1, 0.3), r: -2 });
    set(cP, { o: t > T.parezca - 0.2 ? 1 : 0, s: pop(t, T.parezca - 0.2, 0.3), r: 3 });
  };
});

/* PASO 3 · bandera de la UE + reglamento; dos fichas: «más de 30 meses → este dibujo» y «menos de 30 → fecha» */
paso(L(6) - 0.1, L(7) - 0.1, 3, hlSpan('Obligatorio', 'shl') + ' en Europa', T.oblig);
plano(L(6) - 0.1, L(7) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 300, 1400, 24, 'rgba(0,51,153,.10)', 'rgba(0,0,0,0)', 0);
  const fl = UE(c, 300, 560, 480, 6);
  const mastil = box(c, 282, 540, 20, 560, { zIndex: 5, background: '#8E8A80', border: `5px solid ${INK}`, borderRadius: '10px' });
  const reg = chip(c, 250, 900, 'Reglamento (CE) 1223/2009', { size: 40, bg: AZUE, z: 30 });
  const ficha = (x, w) => box(c, x, 980, w, 380, { zIndex: 10, background: '#fbf6ea', border: `7px solid ${INK}`, borderRadius: '28px', boxShadow: `10px 12px 0 ${SH}`, transformOrigin: '50% 50%' });
  const fA = ficha(50, 430), fB = ficha(510, 420);
  el('div', fA, { left: '0', top: '20px', width: '416px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', lineHeight: 1.05, color: INK }, `MÁS DE<br><span style="font-size:76px;color:${RED}">30 MESES</span>`);
  const pA = PAO(fA, 120, 190, 170, 12);
  el('div', fA, { left: '30px', top: '230px', width: '80px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '80px', color: INK }, '→');
  el('div', fB, { left: '0', top: '20px', width: '406px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', lineHeight: 1.05, color: INK }, `MENOS DE<br><span style="font-size:76px;color:${VERDE}">30 MESES</span>`);
  const fecha = box(fB, 40, 200, 330, 150, { zIndex: 12, background: '#fff', border: `6px solid ${INK}`, borderRadius: '16px', transformOrigin: '50% 50%' }, `<svg viewBox="0 0 80 100" width="70" height="88" style="position:absolute;left:16px;top:26px">${RELOJ_ARENA}</svg><div style="position:absolute;left:92px;top:38px;font-family:Bricolage;font-weight:800;font-size:56px;color:${INK}">05/2027</div>`);
  sp(T.europa, 'swoosh_up', 0.5); sp(T.oblig, 'stamp', 0.6); sp(T.mas30, 'pop', 0.5); sp(T.dibujo, 'ding', 0.6); sp(T.menos, 'pop', 0.5); sp(T.fecha, 'ding', 0.6);
  return t => {
    set(ry, { r: t * 4 });
    set(fl, { o: t > T.europa - 0.3 ? 1 : 0, sx: p(t, T.europa - 0.3, 0.45, E.outBack), sy: 1 + 0.03 * Math.sin(t * 5), r: wobble(t, 0.6, 1.5) });
    fl.querySelector('.est').setAttribute('transform', `rotate(${f1(t * 25)} 150 100)`);
    set(reg, { o: t > T.oblig ? 1 : 0, s: pop(t, T.oblig, 0.3), r: -2 });
    set(fA, { o: t > T.mas30 - 0.2 ? 1 : 0, s: pop(t, T.mas30 - 0.2, 0.4), r: -3 + wobble(t, 0.4, 1) });
    set(pA, { o: t > T.dibujo - 0.1 ? 1 : 0, s: pop(t, T.dibujo - 0.1, 0.4) }); lidA(pA, -26 + Math.sin(t * 4) * 6);
    set(fB, { o: t > T.menos - 0.2 ? 1 : 0, s: pop(t, T.menos - 0.2, 0.4), r: 3 + wobble(t, 0.4, 1, 1) });
    set(fecha, { o: t > T.fecha - 0.1 ? 1 : 0, s: pop(t, T.fecha - 0.1, 0.4), r: -3 });
  };
});

/* L7 · OJO: no es veneno (señal de peligro tachada) / pero ya no te garantizan que funcione (indicador que cae) */
plano(L(7) - 0.1, L(8) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 340, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const pel = figura(c, 110, 490, 380, 342, `<path d="M200,14 L388,340 L12,340 Z" fill="${YEL}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/><rect x="186" y="110" width="28" height="140" rx="12" fill="${INK}"/><circle cx="200" cy="294" r="18" fill="${INK}"/>`, '0 0 400 360', { z: 6, origin: '50% 50%' });
  const xx = box(c, 80, 470, 440, 400, { zIndex: 8 }, `<svg width="440" height="400" style="overflow:visible"><path class="x1" d="M20,20 L420,380" stroke="${RED}" stroke-width="30" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path class="x2" d="M420,20 L20,380" stroke="${RED}" stroke-width="30" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
  const cD = chip(c, 110, 870, 'no te hace daño', { size: 48, bg: VERDE, z: 30 });
  const gauge = figura(c, 560, 540, 440, 300, `<path d="M30,260 A190,190 0 0,1 410,260" fill="none" stroke="${INK}" stroke-width="44"/><path d="M30,260 A190,190 0 0,1 410,260" fill="none" stroke="#e8e0cc" stroke-width="30"/><path d="M38,260 A182,182 0 0,1 120,110" fill="none" stroke="${RED}" stroke-width="28"/><path d="M320,110 A182,182 0 0,1 402,260" fill="none" stroke="${VERDE}" stroke-width="28"/><g class="aguja"><path d="M220,260 L220,90" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g><circle cx="220" cy="260" r="22" fill="${INK}"/><text x="220" y="215" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">FUNCIONA</text>`, '0 0 440 300', { z: 6, origin: '50% 50%' });
  const qq = qMark(c, 880, 460, 120, PINK);
  const cG = chip(c, 580, 870, '¿igual que nuevo?', { size: 46, bg: RED, z: 30 });
  sp(T.dano + 0.2, 'scratch', 0.6); sp(T.garant, 'sad', 0.6); sp(T.igual, 'error', 0.5);
  return t => {
    set(ry, { r: t * 5 });
    set(pel, { o: t > T.ojo + 0.3 ? 1 : 0, s: pop(t, T.ojo + 0.3, 0.35), r: wobble(t, 0.8, 3) });
    const kx = p(t, T.dano + 0.1, 0.3, E.inOutCubic); xx.querySelector('.x1').setAttribute('stroke-dashoffset', f1(1 - clamp(kx * 2)));
    xx.querySelector('.x2').setAttribute('stroke-dashoffset', f1(1 - clamp(kx * 2 - 1)));
    set(cD, { o: t > T.dano + 0.3 ? 1 : 0, s: pop(t, T.dano + 0.3, 0.3), r: -3 });
    set(gauge, { o: t > T.garant - 0.3 ? 1 : 0, s: pop(t, T.garant - 0.3, 0.35) });
    const ang = lerp(70, -35, p(t, T.garant + 0.2, 1.0, E.inOutCubic)) + (t > T.garant + 1.2 ? Math.sin(t * 14) * 6 : 0);
    gauge.querySelector('.aguja').setAttribute('transform', `rotate(${f1(ang)} 220 260)`);
    set(qq, { o: t > T.igual - 0.1 ? 1 : 0, s: pop(t, T.igual - 0.1, 0.3), r: Math.sin(t * 6) * 12 });
    set(cG, { o: t > T.igual - 0.1 ? 1 : 0, s: pop(t, T.igual - 0.1, 0.3), r: 3 });
  };
});

/* L8 · REMATE en la playa: la crema solar del verano pasado; el «50» se emborrona y cae el sello «¿AÚN PROTEGE?» */
plano(L(8) - 0.1, L(9) - 0.1, { background: 'linear-gradient(#7fbfe8, #d8eef8 55%)' }, c => {
  const cam = CAM(c);
  const sol = figura(cam, 680, 300, 320, 320, sunInner(0), '0 0 300 300', { z: 2, origin: '50% 50%' });
  const gav = [GAVIOTA(cam, 120, 420), GAVIOTA(cam, 330, 360)];
  const o1 = OLAS(cam, 880, '#3f8fc4', 3), o2 = OLAS(cam, 950, '#5ba8d8', 4);
  box(cam, -200, 1040, 1480, 1000, { zIndex: 5, background: '#f1d99a', borderTop: `8px solid ${INK}` });
  const toalla = box(cam, 60, 1250, 520, 150, { zIndex: 6, background: `repeating-linear-gradient(90deg, ${PINK} 0 50px, #fff 50px 100px)`, border: `6px solid ${INK}`, borderRadius: '14px', transform: 'skewX(-12deg)' });
  const cr = BOTE(cam, 380, 560, 360, NAR, 'SPF 50', 8);
  const lab = cr.querySelector('.lab');
  const ver = chip(c, 60, 560, 'abierta: verano 2025', { size: 48, bg: YEL, color: INK, z: 30 });
  sello(c, 1180, '¿AÚN PROTEGE?', T.proteja + 0.1, { size: 104, r: -6 });
  sp(T.crema, 'pop', 0.5); sp(T.verano, 'tick', 0.5);
  return t => {
    deriva(cam, t, L(8) - 0.1, L(9) - 0.1, [540, 960, 1.0], [560, 1000, 1.1]);
    sol.firstChild.innerHTML = sunInner(t * 0.6); set(sol, { s: 1 + 0.05 * Math.sin(t * 3) + (t > T.proteja ? 0.15 : 0) });
    gav.forEach((g, i) => { set(g, { x: ((t * 90 + i * 300) % 1300) - 200, y: Math.sin(t * 2 + i) * 30 }); const a = g.querySelector('.ala'); if (a) a.setAttribute('d', `M5,30 Q30,${f1(10 + 20 * Math.abs(Math.sin(t * 6 + i)))} 60,30 Q90,${f1(10 + 20 * Math.abs(Math.sin(t * 6 + i)))} 115,30`); });
    set(o1, { x: Math.sin(t * 1.2) * 40 }); set(o2, { x: -Math.sin(t * 1.4) * 50 });
    set(cr, { r: wobble(t, 0.6, 2) + (t > T.proteja ? Math.sin(t * 22) * 3 : 0), y: t > T.crema - 0.2 ? 0 : 0 });
    conFace(cr, t, { jaw: 0, look: t > T.proteja ? [-12, -8] : [0, -4], feliz: t > T.proteja ? -1 : 0.6, ceja: t > T.proteja ? 12 : 0, seed: 0.8 });
    const kb = p(t, T.proteja, 0.6); lab.textContent = kb > 0.5 ? 'SPF ¿?' : 'SPF 50'; lab.setAttribute('fill', kb > 0.5 ? RED : INK); lab.style.filter = kb > 0 && kb < 1 ? `blur(${f1(Math.sin(kb * Math.PI) * 4)}px)` : '';
    set(ver, { o: t > T.verano - 0.1 ? 1 : 0, s: pop(t, T.verano - 0.1, 0.3), r: -3 });
  };
});

/* L9 · CTA de seguir */
sigueme(9, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L10 · pregunta final (+ «Os leo») */
preguntaFinal('¿Cuántos meses', 'pone tu champú?', { size: 90, draw: c => [['el mío: 12M', YEL], ['6M, ¡en serio!', PINK], ['voy al baño a mirar', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 250 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(10) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L11 · cierre */
cierre(302, 'El dibujo del champú', ['TU BAÑO', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[L(3), L(4) - 0.15], [L(7), L(8) - 0.15]],
  vecino: { risa: [[T.dedos, T.dedos + 1]], sorpresa: [[T.oblig, T.oblig + 1], [T.proteja, T.proteja + 1]], golpes: [T.proteja] },
});
