/* Ep. 117 · «Fueron 80 a la guerra… y volvieron 81» (Liechtenstein, 1866). Versión nueva del ep60 para Instagram (≤ 60 s).
   Guerra austro-prusiana: Liechtenstein manda 80 soldados a vigilar un paso alpino frente a Italia; no combaten; vuelven 81 (versiones: un oficial austriaco
   de enlace o un italiano que se unió). En 1868 disuelve su ejército; desde entonces no lo tiene y no ha sido invadido.
   ESTRATEGIA §8-12: imagen-idea en el fotograma 0 (soldados marchando y el contador saltando de 80 a 81), todo en movimiento, zonas seguras. */
Story.prepara();
const T = {
  fueron: Q('fueron ochenta'), volvieron: Q('volvieron ochenta y uno'), noequiv: Q('no se equivocaron'),
  anio: Q('mil ochocientos sesenta y seis'), lie: Q('liechtenstein'), diminuto: Q('un país diminuto'), suiza: Q('entre suiza'), guerra: Q('entra en guerra'),
  manda: Q('manda a todo'), ochenta: Q('ochenta hombres'), mision: Q('la misión'), alpes: Q('de los alpes'), italia: Q('frente a italia'),
  arriba: Q('allí arriba'), nadie: Q('no aparece nadie'), disparo: Q('ni un disparo'),
  acaba: Q('acaba la guerra'), casa: Q('bajan a casa'), contar: Q('al contarlos'), ochuno: Q('ochenta y uno'),
  unido: Q('se les había unido'), austriaco: Q('un oficial austriaco'), italiano: Q('un italiano'),
  dos: Q('dos años después'), casi: Q('casi ningún país'), elimina: Q('elimina su ejército'),
  cientocin: Q('ciento cincuenta años'), invadido: Q('nadie lo ha invadido'),
};
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const AZL = '#1f3fa0', ROJL = '#c8102e', NIEVE = '#f4f7fb';
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
/* soldadito (icono) con piernas que se mueven: .pi y .pd */
const SOLD = (col = AZL) => `<svg viewBox="0 0 60 120" width="100%" height="100%" style="overflow:visible"><g class="pi"><rect x="18" y="80" width="10" height="36" fill="${INK}"/></g><g class="pd"><rect x="32" y="80" width="10" height="36" fill="${INK}"/></g><rect x="12" y="36" width="36" height="48" rx="6" fill="${col}" stroke="${INK}" stroke-width="4"/><circle cx="30" cy="22" r="14" fill="#f2c9a0" stroke="${INK}" stroke-width="4"/><rect x="16" y="4" width="28" height="10" rx="3" fill="${INK}"/><rect x="44" y="30" width="6" height="56" fill="#6b4a2a" stroke="${INK}" stroke-width="2"/></svg>`;
function tropa(c, n, x0, y0, cols, dx, dy, w, z = 6, col) { return [...Array(n)].map((_, i) => { const e = box(c, x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy, w, w * 2, { zIndex: z, transformOrigin: '50% 100%' }, SOLD(col)); e.pi = e.querySelector('.pi'); e.pd = e.querySelector('.pd'); return e; }); }
const anda = (s, t, i, v = 1) => { const a = Math.sin(t * 10 * v + i) * 6; if (s.pi) s.pi.setAttribute('transform', `translate(0 ${f1(Math.max(0, a))})`); if (s.pd) s.pd.setAttribute('transform', `translate(0 ${f1(Math.max(0, -a))})`); };
const CONTADOR = (c, x, y, w, z = 30) => box(c, x, y, w, w * 0.62, { zIndex: z, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '24px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(w * 0.46), color: '#fff', textAlign: 'center', lineHeight: px(w * 0.6), boxShadow: '0 20px 40px rgba(0,0,0,.35)', transformOrigin: '50% 50%' }, '80');
const ponT = (e, s) => { if (e.textContent !== s) e.textContent = s; };
const rayos = c => box(c, -800, -600, 2680, 3120, { zIndex: 0, background: 'repeating-conic-gradient(from 0deg at 540px 1100px, #f6e7a8 0 7deg, #efe1c6 7deg 14deg)' });

/* PORTADA + L0-L1: rayos amarillos; tres filas de soldaditos desfilando; el contador marca 80… y salta a 81 en rojo */
plano(-1, L(2) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); rayos(cam);
  const filas = [0, 1, 2].map(f => tropa(cam, 14, 0, 0, 14, 120, 0, 84, 5 + f));
  const cont = CONTADOR(cam, 300, 560, 480, 20);
  const t1 = texto(c, 285, 'FUERON A LA GUERRA…', { size: 70, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const t2 = texto(c, 1475, '…y volvieron MÁS', { size: 96, color: ROJL, z: 40, shadow: '4px 4px 0 #fff' });
  const no = chip(c, 230, 1475, '¿error de cuentas? NO', { size: 62, bg: INK, color: YEL, z: 41 });
  sfx('drumroll', 0.05, 0.35); sp(T.volvieron + 0.6, 'tada', 0.7); sp(T.noequiv, 'error', 0.4);
  return t => {
    deriva(cam, t, -0.2, L(2), [540, 980, 1.0], [540, 1000, 1.08]);
    filas.forEach((fila, f) => fila.forEach((s, i) => { const x = ((i * 120 + t * (90 + f * 15) + f * 40) % 1680) - 300; set(s, { x, y: 1000 + f * 170 }); anda(s, t, i + f); }));
    const k81 = t > T.volvieron + 0.6; ponT(cont, k81 ? '81' : '80'); cont.style.color = k81 ? '#ff4a4a' : '#fff';
    set(cont, { s: k81 ? lerp(1.35, 1, p(t, T.volvieron + 0.6, 0.3, E.outBack)) : 1 + 0.02 * Math.sin(t * 4), r: k81 ? -4 + Math.sin(t * 9) * 2 : Math.sin(t * 2) });
    set(t1, { r: -2 + wobble(t, 0.5, 0.6) });
    set(t2, { o: t > T.volvieron - 0.1 && t < L(1) - 0.1 ? 1 : 0, s: pop(t, T.volvieron - 0.1, 0.3), r: -3 });
    set(no, { o: t > T.noequiv - 0.1 ? 1 : 0, s: pop(t, T.noequiv - 0.1, 0.3), r: -3 });
  };
}, { sfx: false });

/* L2 (corte): el mapa: Suiza, Austria e Italia; entre las dos, un puntito: la lupa lo encuentra «Liechtenstein»; «1866» */
plano(L(2) - 0.1, L(3) - 0.1, { background: '#9fd0ee' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#9fd0ee' });
  const mapa = box(cam, -100, 420, 1300, 1100, { zIndex: 1 }, `<svg viewBox="0 0 1300 1100" width="1300" height="1100"><path d="M0,200 L360,160 L520,230 L560,420 L480,560 L200,600 L0,560Z" fill="#e8507a" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M600,180 L1300,120 L1300,520 L900,560 L640,500 L600,420Z" fill="#fbf6ea" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M200,600 L480,560 L640,500 L900,560 L1000,1100 L300,1100Z" fill="#2e9e6b" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <text x="260" y="400" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="72" fill="#fff">SUIZA</text><text x="980" y="360" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="72" fill="rgba(43,33,24,.55)">AUSTRIA</text><text x="620" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="72" fill="#fff">ITALIA</text>
    <circle class="lie" cx="578" cy="300" r="10" fill="${AZL}" stroke="${INK}" stroke-width="4"/></svg>`);
  const lupa = box(cam, 0, 0, 340, 340, { zIndex: 6, borderRadius: '50%', border: `14px solid ${INK}`, overflow: 'hidden', boxSizing: 'border-box', background: '#fbf6ea' }, `<div style="position:absolute;left:0;top:0;width:150px;height:340px;background:#e8507a"></div><div class="flag" style="position:absolute;left:110px;top:90px;width:120px;height:140px;border:7px solid ${INK};box-sizing:border-box;background:linear-gradient(${AZL} 0 50%, ${ROJL} 50%)"></div>`);
  const mango = box(cam, 0, 0, 56, 200, { zIndex: 5, background: '#6b4a2a', border: `9px solid ${INK}`, borderRadius: '20px', transformOrigin: '50% 0%' });
  const nom = texto(c, 285, 'Liechtenstein', { size: 104, color: '#fff', z: 40, shadow: OUT });
  const ano = chip(c, 380, 420, '1866', { size: 70, bg: INK, color: YEL, z: 40 });
  const tam = chip(c, 210, 1475, 'más pequeño que Madrid capital', { size: 50, bg: AZL, z: 40 });
  sp(T.anio, 'stamp', 0.5); sp(T.diminuto, 'pop', 0.5);
  return t => {
    deriva(cam, t, L(2) - 0.1, L(3) - 0.1, [560, 960, 0.85], [480, 800, 1.2]);
    const k = p(t, L(2), 1.4, E.inOutCubic); const lx = lerp(200, -100 + 578, k), ly = lerp(1400, 420 + 300, k);
    set(lupa, { x: lx - 170 + Math.sin(t * 2) * 6, y: ly - 170 - 160 * k }); set(mango, { x: lx + 70, y: ly - 40 - 160 * k, r: -35 });
    const lc = mapa.querySelector('.lie'); if (lc) lc.setAttribute('r', f1(10 + 3 * Math.sin(t * 6)));
    set(nom, { o: t > T.lie - 0.1 ? 1 : 0, s: pop(t, T.lie - 0.1, 0.3), r: -2 + wobble(t, 0.5, 0.6) });
    set(ano, { o: t > T.anio - 0.1 && t < T.lie - 0.1 ? 1 : 0, s: pop(t, T.anio - 0.1, 0.3), r: -3 });
    set(tam, { o: t > T.diminuto - 0.1 ? 1 : 0, s: pop(t, T.diminuto - 0.1, 0.3), r: -3 });
  };
});

/* L3 (corte): «todo el ejército»: los 80 en formación (8×10) con el contador; luego suben en fila por una ladera hacia un paso nevado */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#bfe3f5, #efe1c6)' });
  const monte = box(cam, -400, 300, 1900, 1400, { zIndex: 1 }, `<svg viewBox="0 0 1900 1400" width="1900" height="1400"><path d="M0,1400 L500,500 L760,200 L1000,520 L1300,300 L1900,1400Z" fill="#8a9aa8" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M640,360 L760,200 L880,360 L820,330 L760,380 L700,330Z M1220,420 L1300,300 L1400,460 L1340,440 L1300,480 L1260,440Z" fill="${NIEVE}" stroke="${INK}" stroke-width="6"/></svg>`);
  const ej = tropa(cam, 80, 150, 800, 10, 80, 92, 44, 5);
  const cont = CONTADOR(cam, 360, 480, 360, 8);
  const todo = chip(c, 220, 1475, 'TODO su ejército', { size: 66, bg: AZL, z: 40 });
  const mis = chip(c, 140, 1475, 'misión: vigilar un paso alpino', { size: 52, bg: INK, color: YEL, z: 40 });
  sp(T.ochenta, 'thud', 0.6); sp(T.mision, 'click', 0.4); sp(T.italia, 'swoosh_up', 0.4);
  return t => {
    const sube = t > T.mision - 0.2;
    deriva(cam, t, L(3) - 0.1, L(4) - 0.1, [540, 1000, 0.95], [700, 700, 0.9]);
    const n = Math.min(80, Math.floor(p(t, T.manda - 0.2, T.ochenta - T.manda + 0.6) * 80)); ponT(cont, String(n)); set(cont, { s: t > T.ochenta ? 1 + 0.04 * Math.sin(t * 8) : 1 });
    ej.forEach((s, i) => {
      if (!sube) { set(s, { o: i < n ? 1 : 0, s: pop(t, T.manda - 0.2 + i * 0.012, 0.25) }); anda(s, t, i, 0.3); }
      else { const k = clamp(((t - T.mision + 0.2) * 0.25) - i * 0.006); const bx = 150 + (i % 10) * 80, by = 800 + Math.floor(i / 10) * 92; set(s, { o: k < 0.98 ? 1 : 0, x: lerp(0, 760 - bx, k) + Math.sin(i) * 20 * k, y: lerp(0, 230 - by, k), s: lerp(1, 0.35, k) }); anda(s, t, i); }
    });
    set(cont, { o: sube ? 1 - p(t, T.mision, 0.4) : 1 });
    set(todo, { o: t > T.manda - 0.1 && t < T.mision - 0.2 ? 1 : 0, s: pop(t, T.manda - 0.1, 0.3), r: -3 });
    set(mis, { o: sube ? 1 : 0, s: pop(t, T.mision - 0.2, 0.3), r: -3 });
  };
});

/* L4 (corte): arriba, en la nieve: los soldaditos esperan con prismáticos; la cámara barre el horizonte vacío; copos; «0 enemigos · 0 disparos» */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#bfe3f5' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: 'linear-gradient(#9fc6dc, #e6f1f8)' });
  const picos = box(cam, -800, 500, 2680, 700, { zIndex: 1 }, `<svg viewBox="0 0 2680 700" width="2680" height="700"><path d="M0,700 L300,300 L520,460 L820,140 L1100,420 L1400,200 L1700,460 L2000,160 L2300,420 L2680,260 L2680,700Z" fill="#a8b6c2" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/></svg>`);
  box(cam, -800, 1100, 2680, 1600, { zIndex: 2, background: NIEVE, borderTop: `10px solid ${INK}` });
  const grupo = tropa(cam, 7, 120, 960, 7, 130, 0, 70, 4);
  const pris = box(cam, 520, 930, 70, 30, { zIndex: 5, background: INK, borderRadius: '10px' });
  const copos = [...Array(26)].map((_, i) => box(cam, 0, 0, 14, 14, { zIndex: 6, borderRadius: '50%', background: '#fff', opacity: 0.9 }));
  const cero = chip(c, 200, 1475, '0 enemigos · 0 disparos', { size: 60, bg: INK, color: '#fff', z: 40 });
  const nadie = texto(c, 285, 'NADIE', { size: 150, color: '#fff', z: 40, shadow: OUT });
  sp(T.nadie, 'mus_baja', 0.4); sp(T.disparo, 'tick', 0.4);
  return t => {
    deriva(cam, t, L(4) - 0.1, L(5) - 0.1, [300, 900, 0.95], [900, 900, 1.0]);
    grupo.forEach((s, i) => { set(s, { y: Math.sin(t * 1.5 + i) * 3 }); anda(s, t, i, 0.15); });
    set(pris, { x: Math.sin(t * 0.8) * 30 });
    copos.forEach((f, i) => { const k = ((t * 0.25) + i * 0.137) % 1; set(f, { x: ((i * 173) % 1800) - 300 + Math.sin(t + i) * 30, y: lerp(300, 1300, k) }); });
    set(nadie, { o: t > T.nadie - 0.1 ? 1 : 0, s: pop(t, T.nadie - 0.1, 0.35), r: -3 + wobble(t, 0.5, 0.8) });
    set(cero, { o: t > T.disparo - 0.4 ? 1 : 0, s: pop(t, T.disparo - 0.4, 0.3), r: -3 });
  };
});

/* L5 (corte): bajan a casa; el contador cuenta deprisa 1…80… y salta a 81: el último soldadito brilla con un interrogante */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); rayos(cam);
  const fila = tropa(cam, 81, 0, 0, 81, 0, 0, 70, 5);
  const cont = CONTADOR(cam, 300, 420, 480, 20);
  const extra = box(cam, 0, 0, 160, 160, { zIndex: 7, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,230,0,.9), rgba(255,230,0,0) 70%)' }, `<div style="position:absolute;left:0;right:0;top:-80px;text-align:center;font-family:Bricolage;font-weight:800;font-size:110px;color:${ROJL};text-shadow:4px 4px 0 #fff">?</div>`);
  sp(T.contar, 'drumroll', 0.4); sp(T.ochuno + 0.4, 'tada', 0.8);
  return t => {
    deriva(cam, t, L(5) - 0.1, L(6) - 0.1, [540, 980, 1.0], [600, 1020, 1.1]);
    const kc = p(t, T.contar - 0.1, T.ochuno - T.contar + 0.5, E.inCubic); const n = t > T.ochuno + 0.4 ? 81 : Math.min(80, Math.floor(kc * 80)); ponT(cont, String(n)); cont.style.color = n === 81 ? '#ff4a4a' : '#fff';
    set(cont, { s: n === 81 ? lerp(1.4, 1, p(t, T.ochuno + 0.4, 0.3, E.outBack)) : 1, r: n === 81 ? -4 : 0 });
    // desfile: cada uno se coloca en una cuadrícula de 9 columnas según se cuenta
    fila.forEach((s, i) => { const vis = i < n; const col = i % 9, row = Math.floor(i / 9); set(s, { o: vis ? 1 : 0, x: 80 + col * 96, y: 700 + row * 82, s: i === 80 ? 0.8 : 0.6 }); anda(s, t, i, 0.4); });
    set(extra, { o: n === 81 ? 1 : 0, x: 80 + 8 * 96 - 45, y: 700 + 8 * 82 - 10, s: 1 + 0.1 * Math.sin(t * 6) });
  };
});

/* L6 (corte): las dos versiones del número 81: un oficial austriaco (con casco de pincho) o un italiano que se hizo su amigo (con un bocadillo) */
plano(L(6) - 0.1, L(7) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -800, -600, 2680, 3120, { zIndex: 0, background: '#efe1c6', backgroundImage: 'linear-gradient(rgba(43,33,24,.06) 2px, transparent 2px), linear-gradient(90deg, rgba(43,33,24,.06) 2px, transparent 2px)', backgroundSize: '80px 80px' });
  const carta = (x, titulo, col) => box(cam, x, 560, 440, 760, { zIndex: 2, background: '#fbf6ea', border: `10px solid ${INK}`, borderRadius: '24px', boxShadow: `12px 12px 0 ${INK}`, transformOrigin: '50% 50%' }, `<div style="position:absolute;left:0;right:0;top:24px;text-align:center;font-family:Bricolage;font-weight:800;font-size:46px;color:${col}">${titulo}</div>`);
  const c1 = carta(70, '¿un oficial<br>austriaco?', '#7a5a3a'), c2 = carta(570, '¿un italiano<br>amigo?', '#2e9e6b');
  const p1 = PERS(c1, 70, 260, 300, { ropa: '#fbf6ea', gorro: 'casco', pelo: 'corto', pcol: '#3a2a1e', bigote: 'corto' }), p2 = PERS(c2, 70, 260, 300, { ropa: '#2e9e6b', pelo: 'corto', pcol: '#2a2118' });
  const num = texto(c, 285, 'el soldado nº 81', { size: 92, color: INK, z: 40, shadow: '4px 4px 0 #fff' });
  const nadie = chip(c, 180, 1475, 'nadie lo sabe seguro', { size: 60, bg: ROJL, z: 40 });
  sp(T.austriaco, 'pop', 0.5); sp(T.italiano, 'pop', 0.5);
  return t => {
    deriva(cam, t, L(6) - 0.1, L(7) - 0.1, [540, 960, 0.95], [540, 960, 1.05]);
    set(c1, { o: t > T.austriaco - 0.2 ? 1 : 0, s: pop(t, T.austriaco - 0.2, 0.35), r: -4 + Math.sin(t * 1.3) * 1.5 }); set(c2, { o: t > T.italiano - 0.2 ? 1 : 0, s: pop(t, T.italiano - 0.2, 0.35), r: 4 + Math.sin(t * 1.3 + 1) * 1.5 });
    pFace(p1, t, { feliz: 0.2, ceja: 8, look: [10, 0], seed: 81 }); pFace(p2, t, { feliz: 1, look: [-10, 0], seed: 82 });
    set(num, { r: -2 + wobble(t, 0.5, 0.6) }); set(nadie, { o: t > T.italiano + 1.2 ? 1 : 0, s: pop(t, T.italiano + 1.2, 0.3), r: -3 });
  };
});

/* L7-L8 (corte): 1868: los soldaditos desaparecen uno a uno y queda un uniforme en una percha; luego el castillo de Vaduz en paz con el contador de años sin ejército */
plano(L(7) - 0.1, L(9) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c); rayos(cam);
  const ej = tropa(cam, 30, 130, 820, 10, 84, 150, 52, 5);
  const percha = box(cam, 380, 760, 320, 420, { zIndex: 6 }, `<svg viewBox="0 0 320 420" width="320" height="420"><path d="M160,10 Q190,10 190,40 Q190,60 160,70 L20,140 L300,140Z" fill="none" stroke="${INK}" stroke-width="10"/><rect x="60" y="140" width="200" height="260" rx="20" fill="${AZL}" stroke="${INK}" stroke-width="8"/>${[0, 1, 2].map(i => `<circle cx="160" cy="${200 + i * 60}" r="10" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>`).join('')}</svg>`);
  const ano = chip(c, 380, 420, '1868', { size: 70, bg: INK, color: YEL, z: 40 });
  const elim = texto(c, 285, 'ADIÓS, EJÉRCITO', { size: 92, color: ROJL, z: 40, shadow: '4px 4px 0 #fff' });
  // L8: el castillo y el contador de años
  const paz = box(c, 0, 0, 1080, 1920, { zIndex: 30, background: 'linear-gradient(#9fd3e8, #dff3ea)' });
  const valle = box(paz, -100, 900, 1280, 1100, { background: '#8fb46a', borderTop: `10px solid ${INK}`, borderRadius: '50% 50% 0 0 / 20% 20% 0 0' });
  const castillo = box(paz, 300, 560, 480, 420, {}, `<svg viewBox="0 0 480 420" width="480" height="420"><path d="M0,420 L60,300 L420,300 L480,420Z" fill="#7a8a6a" stroke="${INK}" stroke-width="8"/><rect x="100" y="140" width="280" height="170" fill="#e9e5dc" stroke="${INK}" stroke-width="8"/><rect x="190" y="40" width="100" height="120" fill="#e9e5dc" stroke="${INK}" stroke-width="8"/><path d="M180,40 L240,0 L300,40Z" fill="#c8102e" stroke="${INK}" stroke-width="6"/>${[130, 230, 330].map(x => `<rect x="${x}" y="190" width="30" height="40" fill="#3d3a44"/>`).join('')}<rect x="236" y="-40" width="8" height="40" fill="${INK}"/><rect x="244" y="-40" width="50" height="34" fill="url(#ban)" stroke="${INK}" stroke-width="3"/><defs><linearGradient id="ban" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="${AZL}"/><stop offset=".5" stop-color="${ROJL}"/></linearGradient></defs></svg>`);
  const anos = box(paz, 140, 285, 800, 220, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '150px', color: '#fff', textAlign: 'center', textShadow: OUT }, '0');
  const sub = box(paz, 140, 470, 800, 80, { fontFamily: 'Bricolage', fontWeight: 800, fontSize: '54px', color: INK, textAlign: 'center' }, 'años sin ejército');
  const nubesP = [0, 1, 2].map(i => box(paz, 0, 640 + i * 90, 300, 80, { borderRadius: '50px', background: 'rgba(255,255,255,.8)', border: `5px solid ${INK}` }));
  const inv = chip(paz, 260, 1475, '0 invasiones', { size: 70, bg: '#2e9e6b', z: 2 });
  sp(T.dos, 'stamp', 0.5); sp(T.elimina, 'squish', 0.6); sp(T.cientocin, 'clockfast', 0.5); sp(T.invadido, 'tada', 0.7);
  return t => {
    deriva(cam, t, L(7) - 0.1, L(8) - 0.1, [540, 960, 1.0], [540, 960, 1.1]);
    ej.forEach((s, i) => { const k = p(t, T.elimina - 0.1 + i * 0.04, 0.25); set(s, { o: 1 - k, s: 1 - k * 0.6, y: -k * 40 }); anda(s, t, i, 0.3); });
    set(percha, { o: t > T.elimina + 1.0 ? 1 : 0, s: pop(t, T.elimina + 1.0, 0.4), r: Math.sin(t * 2) * 4 });
    set(ano, { o: t > T.dos - 0.1 && t < L(8) - 0.3 ? 1 : 0, s: pop(t, T.dos - 0.1, 0.3), r: -3 });
    set(elim, { o: t > T.elimina - 0.1 && t < L(8) - 0.3 ? 1 : 0, s: pop(t, T.elimina - 0.1, 0.3), r: -3 + wobble(t, 0.5, 0.6) });
    const kp = p(t, L(8) - 0.3, 0.5, E.outCubic);
    paz.style.transformOrigin = '540px 900px'; set(paz, { o: t > L(8) - 0.3 ? 1 : 0, y: (1 - kp) * 1920, s: 1 + 0.12 * clamp((t - L(8)) / 5) }); set(castillo, { y: Math.sin(t * 1.5) * 6 });
    nubesP.forEach((n, i) => set(n, { x: 1200 - ((t * (70 + i * 30) + i * 500) % 1700) }));
    ponT(anos, String(Math.round(150 * p(t, T.cientocin - 0.3, 1.2, E.outCubic))) + (t > T.cientocin + 0.9 ? '+' : ''));
    set(inv, { o: t > T.invadido - 0.1 ? 1 : 0, s: pop(t, T.invadido - 0.1, 0.3), r: -3 });
  };
});

/* L9 · pregunta final (+ «Os leo») */
preguntaFinal('¿Tu país se atrevería', 'a hacer lo mismo?', { size: 84, draw: c => [['ni de broma', YEL], ['yo lo haría', PINK], ['¿quién era el 81?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 250 + i * 30, 640 + i * 160, s, { size: 50, bg: col, color: INK }), L(9) + 0.5 + i * 0.35, { sfx: 'pop' })) });

/* L10 · cierre */
cierre(117, 'Los 81 de Liechtenstein', ['HISTORIA', 'de verdad']);

Story.run({
  textura: true,
  ovalo: [[T.ochuno + 0.6, L(6) - 0.2]],
  vecino: { risa: [[T.italiano, T.italiano + 1.2]], sorpresa: [[T.ochuno + 0.4, T.ochuno + 1.4]], golpes: [] },
});
