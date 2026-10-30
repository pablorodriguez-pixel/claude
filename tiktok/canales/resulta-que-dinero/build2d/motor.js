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

// persona(): ver personaje.js
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
    const lt = t - act.t0, [cx0, cy0, z] = cam(act.cam || [[0, 540, 960, 1.04], [act.t1 - act.t0, 540, 960, 1.12]], lt);
    const cx = cx0 + 5 * Math.sin(t * .83) + 2.5 * Math.sin(t * 2.1 + 1), cy = cy0 + 4 * Math.sin(t * 1.07 + 2) + 2 * Math.sin(t * 2.6);
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
    if (window.vida) vida(t, act.el);
  }
  const gr = document.getElementById('grano'); if (gr) { const r = Math.floor(t * 30) * 7919; gr.style.transform = `translate(${r % 64 - 32}px,${(r >> 3) % 64 - 32}px)` }
  // subtítulo
  const c = FR.find(c => t >= c[0].s - .05 && t < Math.min(c.at(-1).e + .25, (FR[FR.indexOf(c) + 1] || [{ s: 1e9 }])[0].s - .05)), sb = document.getElementById('sub');
  if (c) { sb.textContent = c.map(w => w.t).join(' '); sb.style.opacity = 1; const k = p(t, c[0].s - .05, .1); sb.style.transform = `translate(-50%,-50%) scale(${1.08 - .08 * eo(k)})` }
  else sb.style.opacity = 0;
};
