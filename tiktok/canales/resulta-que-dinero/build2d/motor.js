// «Resulta que» del dinero — motor de animación 2D (SVG + cámara + montaje), al estilo de @resultaaquee.
// Cada episodio define PLANOS en ../<ep>/escenas.js con plano({...}). render(t) es determinista (lo usa render.js).
// Capas por plano: fondo (desenfocado: profundidad de campo) + frente nítido; la cámara se mueve SIEMPRE.
window.W = 1080; window.H = 1920;
const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const eo = x => 1 - Math.pow(1 - cl(x), 3), ei = x => cl(x) ** 3;
const eio = x => { x = cl(x); return x < .5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2 };
const p = (t, a, d) => cl((t - a) / d), lerp = (a, b, k) => a + (b - a) * k;
const rebote = x => { x = cl(x); return 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2 };   // ease-out-back
Object.assign(window, { cl, eo, ei, eio, p, lerp, rebote });

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]/g, '').toLowerCase();
window.vt = (w, n = 1) => { let k = 0; for (const x of SUBS) if (norm(x.t) === norm(w) && ++k === n) return x.s; throw Error('palabra ' + w + ' #' + n) };

// ───────── utilidades de dibujo
window.TINTA = '#1b1a1f';
window.OL = `stroke="${TINTA}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;     // contorno de dibujo
let _gid = 0;
window.grad = (c1, c2, ang = 90) => { const key = 'g' + c1 + c2 + ang; if (_cache[key]) return _cache[key]; const id = 'g' + (_gid++); _cache[key] = `url(#${id})`; const r = ang * Math.PI / 180;
  DEFS.push(`<linearGradient id="${id}" x1="${.5 - Math.cos(r) / 2}" y1="${.5 - Math.sin(r) / 2}" x2="${.5 + Math.cos(r) / 2}" y2="${.5 + Math.sin(r) / 2}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`); return `url(#${id})` };
window.radial = (c1, c2, o2 = 1) => { const key = 'r' + c1 + c2 + o2; if (_cache[key]) return _cache[key]; const id = 'r' + (_gid++); _cache[key] = `url(#${id})`;
  DEFS.push(`<radialGradient id="${id}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}" stop-opacity="${o2}"/></radialGradient>`); return `url(#${id})` };
window.DEFS = [];
// un degradado creado después de montar (dentro de anim) se añade al <defs> del documento al momento
const _push = DEFS.push.bind(DEFS); DEFS.push = (x) => { _push(x); if (window._defs) window._defs.insertAdjacentHTML('beforeend', x); return DEFS.length };
const _cache = {};
window.brillo = (x, y, r, c = '#ffd27a', o = .55) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${radial(c, c, 0)}" opacity="${o}"/>`;

// Personaje al estilo de la referencia: cuerpo de cápsula alto, cabeza redonda clara con contorno, cara muy expresiva.
// o: {x,y (pies), s, ropa, ropa2, pelo, gorra, canas, cara:'normal|feliz|triste|sorpresa|cansado|serio|sonrisa', mira:-1..1, id, brazo}
window.persona = (o) => {
  const s = (o.s || 1) * 1.35, ropa = o.ropa || '#4f6bd8', ropa2 = o.ropa2 || shade(ropa, -25), piel = o.piel || '#fbf3ec', mira = o.mira || 0;
  const cara = o.cara || 'normal', ex = mira * 10;
  const ojos = {
    normal: `<ellipse cx="${-22 + ex}" cy="-8" rx="7" ry="10" fill="${TINTA}"/><ellipse cx="${22 + ex}" cy="-8" rx="7" ry="10" fill="${TINTA}"/>`,
    feliz: `<path d="M${-32 + ex} -6 q10 -14 20 0 M${12 + ex} -6 q10 -14 20 0" ${OL} fill="none"/>`,
    sonrisa: `<ellipse cx="${-22 + ex}" cy="-8" rx="7" ry="9" fill="${TINTA}"/><ellipse cx="${22 + ex}" cy="-8" rx="7" ry="9" fill="${TINTA}"/>`,
    triste: `<ellipse cx="${-22 + ex}" cy="-4" rx="6" ry="8" fill="${TINTA}"/><ellipse cx="${22 + ex}" cy="-4" rx="6" ry="8" fill="${TINTA}"/><path d="M${-36 + ex} -26 l22 8 M${36 + ex} -26 l-22 8" ${OL}/>`,
    sorpresa: `<circle cx="${-24 + ex}" cy="-10" r="17" fill="#fff" ${OL}/><circle cx="${24 + ex}" cy="-10" r="17" fill="#fff" ${OL}/><circle cx="${-24 + ex}" cy="-10" r="6" fill="${TINTA}"/><circle cx="${24 + ex}" cy="-10" r="6" fill="${TINTA}"/>`,
    cansado: `<path d="M${-32 + ex} -6 h20 M${12 + ex} -6 h20" ${OL}/><path d="M${-32 + ex} 2 q10 6 20 0 M${12 + ex} 2 q10 6 20 0" stroke="${TINTA}" stroke-width="3" fill="none" opacity=".5"/>`,
    serio: `<path d="M${-34 + ex} -22 l22 4 M${34 + ex} -22 l-22 4" ${OL}/><ellipse cx="${-22 + ex}" cy="-6" rx="6" ry="8" fill="${TINTA}"/><ellipse cx="${22 + ex}" cy="-6" rx="6" ry="8" fill="${TINTA}"/>`,
  }[cara];
  const boca = {
    normal: `<path d="M${-12 + ex} 30 h24" ${OL}/>`, serio: `<path d="M${-14 + ex} 32 h28" ${OL}/>`,
    feliz: `<path d="M${-22 + ex} 22 q22 30 44 0 z" fill="#7a2a2a" ${OL}/>`, sonrisa: `<path d="M${-18 + ex} 24 q18 18 36 0" ${OL} fill="none"/>`,
    triste: `<path d="M${-16 + ex} 36 q16 -14 32 0" ${OL} fill="none"/>`, sorpresa: `<ellipse cx="${ex}" cy="34" rx="12" ry="16" fill="#7a2a2a" ${OL}/>`,
    cansado: `<path d="M${-12 + ex} 32 q12 -6 24 0" ${OL} fill="none"/>`,
  }[cara];
  const pelo = o.canas ? `<path d="M-62 -30 q-14 30 4 50 M62 -30 q14 30 -4 50" stroke="${o.canas}" stroke-width="16" stroke-linecap="round" fill="none"/>` : '';
  const pelo2 = o.pelo ? `<path d="M-64 -20 q-4 -66 64 -70 q68 4 64 70 q-30 -34 -64 -30 q-34 -4 -64 30z" fill="${o.pelo}" ${OL}/>` : '';
  const gorra = o.gorra ? `<path d="M-66 -30 q6 -62 66 -64 q60 2 66 64 z" fill="${o.gorra}" ${OL}/><path d="M-70 -30 q40 -14 110 -4 q24 4 40 16 q-60 -2 -150 -12z" fill="${shade(o.gorra, -30)}" ${OL}/>` : '';
  const sombra = `<ellipse cx="0" cy="0" rx="${70}" ry="14" fill="#000" opacity=".22"/>`;
  const brazoD = o.brazo === 'arriba' ? `<path d="M48 -300 q40 -40 30 -120" stroke="${ropa}" stroke-width="34" stroke-linecap="round" fill="none"/><path d="M48 -300 q40 -40 30 -120" stroke="${TINTA}" stroke-width="44" stroke-linecap="round" fill="none" style="mix-blend-mode:multiply" opacity="0"/>`
    : o.brazo === 'delante' ? `<path d="M50 -300 q60 30 90 10" stroke="${TINTA}" stroke-width="44" stroke-linecap="round" fill="none"/><path d="M50 -300 q60 30 90 10" stroke="${ropa}" stroke-width="32" stroke-linecap="round" fill="none"/><circle cx="146" cy="-292" r="20" fill="${piel}" ${OL}/>`
    : `<path d="M58 -300 q16 70 4 140" stroke="${TINTA}" stroke-width="44" stroke-linecap="round" fill="none"/><path d="M58 -300 q16 70 4 140" stroke="${ropa}" stroke-width="32" stroke-linecap="round" fill="none"/>`;
  const extra = o.extra || '';
  return `<g ${o.id ? `id="${o.id}"` : ''} transform="translate(${o.x},${o.y}) scale(${s})">${sombra}
    <rect x="-62" y="-380" width="124" height="380" rx="52" fill="${grad(ropa, ropa2, 0)}" ${OL}/>
    <path d="M-62 -40 h124" stroke="${shade(ropa, -40)}" stroke-width="10"/>
    ${o.cuerpo || ''}
    <path d="M-58 -300 q-16 70 -4 140" stroke="${TINTA}" stroke-width="44" stroke-linecap="round" fill="none"/><path d="M-58 -300 q-16 70 -4 140" stroke="${ropa}" stroke-width="32" stroke-linecap="round" fill="none"/>
    ${brazoD}
    <g transform="translate(0,-450)"><circle r="78" fill="${piel}" ${OL}/>${pelo}${pelo2}${gorra}
      <g class="cara">${ojos}${boca}</g>${o.gafas ? `<circle cx="${-24 + ex}" cy="-8" r="22" fill="none" ${OL}/><circle cx="${24 + ex}" cy="-8" r="22" fill="none" ${OL}/><path d="M${-2 + ex} -8 h4" ${OL}/>` : ''}
      <ellipse cx="-46" cy="16" rx="12" ry="7" fill="#f4a0a0" opacity=".55"/><ellipse cx="46" cy="16" rx="12" ry="7" fill="#f4a0a0" opacity=".55"/></g>
    ${extra}</g>`;
};
window.shade = (hex, amt) => { const n = parseInt(hex.slice(1), 16); const f = c => Math.max(0, Math.min(255, c + amt));
  return '#' + [f(n >> 16), f(n >> 8 & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('') };

// ───────── planos
window.PLANOS = [];
// plano({t0, t1, fondo:svg, frente:svg, cam:[[t, x, y, s], ...] (centro de cámara y zoom), desenfoque:px, anim:(lt, q)=>{}, entrada:'barrido'|'corte'|'zoom'})
window.plano = (o) => PLANOS.push(o);

window.montar = () => {
  const esc = document.getElementById('escena');
  // todos los degradados en un solo <defs> (los url(#id) valen entre SVG del mismo documento)
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); g.setAttribute('width', 0); g.setAttribute('height', 0); g.style.position = 'absolute';
  g.innerHTML = `<defs>${DEFS.join('')}</defs>`; document.body.appendChild(g); window._defs = g.querySelector('defs');
  PLANOS.sort((a, b) => a.t0 - b.t0);
  PLANOS.forEach((P, i) => {
    if (P.t1 == null) P.t1 = PLANOS[i + 1] ? PLANOS[i + 1].t0 : DUR;
    const d = document.createElement('div'); d.className = 'plano'; d.style.display = 'none';
    d.innerHTML = `<div class="capa fondo"><svg viewBox="0 0 1080 1920" width="1080" height="1920">${P.fondo || ''}</svg></div>
                   <div class="capa frente"><svg viewBox="0 0 1080 1920" width="1080" height="1920">${P.frente || ''}</svg></div>`;
    esc.appendChild(d); P.el = d; P.q = id => d.querySelector('#' + id);
  });
};
window.cam = (K, lt) => {   // K: [[t, cx, cy, zoom], ...] en tiempo local del plano
  let i = 0; while (i < K.length - 1 && lt >= K[i + 1][0]) i++;
  const a = K[i], b = K[Math.min(i + 1, K.length - 1)], u = b[0] > a[0] ? eio((lt - a[0]) / (b[0] - a[0])) : 0;
  return [lerp(a[1], b[1], u), lerp(a[2], b[2], u), lerp(a[3], b[3], u)];
};

// subtítulos al estilo de la referencia: 1-3 palabras, blancas, pequeñas, a media altura
const FR = []; { let c = []; SUBS.forEach((w, i) => { c.push(w); const n = c.reduce((a, x) => a + x.t.length + 1, 0);
  if (/[,.:;?!]$/.test(w.raw || '') || c.length >= 3 || n >= 14 || i == SUBS.length - 1) { FR.push(c); c = [] } }) }

window.render = (t) => {
  let act = null;
  for (const P of PLANOS) { const on = t >= P.t0 && t < P.t1; P.el.style.display = on ? 'block' : 'none'; if (on) act = P }
  if (act) {
    const lt = t - act.t0, [cx, cy, z] = cam(act.cam || [[0, 540, 960, 1.04], [act.t1 - act.t0, 540, 960, 1.12]], lt);
    // entrada: barrido con desenfoque de movimiento (como la referencia) o golpe de zoom
    let dx = 0, blur = 0, zz = 1;
    const ent = act.entrada || 'corte', ke = p(lt, 0, .22);
    if (ent === 'barrido' && ke < 1) { dx = (1 - eo(ke)) * 900 * (act.dir || 1); blur = (1 - ke) * 26 }
    if (ent === 'zoom' && ke < 1) zz = 1 + .25 * (1 - eo(ke));
    // el punto (cx,cy) queda en el centro de la pantalla; el fondo se mueve menos (paralaje)
    const tr = (par) => { const Z = Math.max(1.02, 1 + (z * zz - 1) * par);
      // que el dibujo cubra siempre la pantalla (sin bandas negras)
      const X = cl(lerp(540, cx, par), 540 / Z, 1080 - 540 / Z), Y = cl(lerp(960, cy, par), 960 / Z, 1920 - 960 / Z);
      return `translate(${(540 - X) * Z + dx * par}px,${(960 - Y) * Z}px) scale(${Z})` };
    const f = act.el.querySelector('.fondo'), fr = act.el.querySelector('.frente');
    f.style.transformOrigin = fr.style.transformOrigin = `${540}px ${960}px`;
    f.style.transform = tr(act.paralaje ?? .75); fr.style.transform = tr(1);
    f.style.filter = `blur(${(act.desenfoque || 0) + blur}px)`; fr.style.filter = blur ? `blur(${blur}px)` : '';
    if (act.anim) act.anim(lt, act.q, t);
  }
  // subtítulo
  const c = FR.find(c => t >= c[0].s - .05 && t < Math.min(c.at(-1).e + .25, (FR[FR.indexOf(c) + 1] || [{ s: 1e9 }])[0].s - .05)), sb = document.getElementById('sub');
  if (c) { sb.textContent = c.map(w => w.t).join(' '); sb.style.opacity = 1; const k = p(t, c[0].s - .05, .1); sb.style.transform = `translate(-50%,-50%) scale(${1.08 - .08 * eo(k)})` }
  else sb.style.opacity = 0;
};
