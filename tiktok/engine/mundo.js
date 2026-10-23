/* Mundo continuo (formato cuento): UN escenario que la cámara recorre con barridos y zooms, con el cielo cambiando de hora
   (día → noche → amanecer), en vez de 15 planos sueltos. Cargar después de story.js.
   MUNDO(c, w, h) → { vp, sky, far, w, tint }   ·   camara(M, t, [[t, cx, cy, escala], …])   ·   cielo(M, t, [[t, arriba, abajo, tinte, opac], …])
   Las claves se interpolan con ease in-out; para «aguantar» un encuadre se repite la clave. Los colores admiten hex (#rrggbb). */
const easeIO = k => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const hex2 = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mixC = (a, b, k) => { const x = hex2(a), y = hex2(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const interp = (keys, t) => {
  if (t <= keys[0][0]) return keys[0].slice(1);
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) {
    const a = keys[i - 1], b = keys[i], k = easeIO((t - a[0]) / ((b[0] - a[0]) || 1));
    return a.slice(1).map((v, j) => typeof v === 'number' ? v + (b[j + 1] - v) * k : (typeof v === 'string' && v[0] === '#' ? mixC(v, b[j + 1], k) : (k < 0.5 ? v : b[j + 1])));
  }
  return keys[keys.length - 1].slice(1);
};
const MUNDO = (c, w, h) => {
  const vp = box(c, 0, 0, 1080, 1920, { overflow: 'hidden', zIndex: 1 });
  const sky = box(vp, 0, 0, 1080, 1920, { zIndex: 0 });
  const far = box(vp, 0, 0, w, h, { zIndex: 1, transformOrigin: '0 0' });
  const wd = box(vp, 0, 0, w, h, { zIndex: 2, transformOrigin: '0 0' });
  const tint = box(vp, 0, 0, 1080, 1920, { zIndex: 60, pointerEvents: 'none', mixBlendMode: 'multiply' });
  return { vp, sky, far, w: wd, tint };
};
/* cámara: (cx, cy) es el punto del mundo que queda en el centro de la pantalla; la capa lejana va a «par» de velocidad (paralaje).
   Si la cámara corre mucho (barrido), el mundo se desenfoca un poco: es la transición. */
const camara = (M, t, keys, par = 0.45) => {
  const [cx, cy, s] = interp(keys, t), [ox, oy] = interp(keys, t - 0.05), v = Math.hypot(cx - ox, cy - oy) / 0.05;
  M.w.style.transform = `translate(${f1(540 - cx * s)}px,${f1(960 - cy * s)}px) scale(${f1(s)})`;
  M.far.style.transform = `translate(${f1(540 - cx * s * par)}px,${f1(960 - cy * s * par - 140)}px) scale(${f1(s)})`;
  const b = v > 700 ? Math.min(6, (v - 700) / 350) : 0; M.w.style.filter = M.far.style.filter = b ? `blur(${f1(b)}px)` : '';
  return [cx, cy, s];
};
const cielo = (M, t, keys) => { const [a, b, ti, o] = interp(keys, t); M.sky.style.background = `linear-gradient(${a}, ${b})`; M.tint.style.background = ti; M.tint.style.opacity = f1(o); };
/* astros y ambiente (en pantalla, no en el mundo) */
const LUNA = (c, z = 1) => box(c, 0, 0, 170, 170, { zIndex: z, borderRadius: '50%', background: '#fff6d6', boxShadow: '0 0 60px 20px rgba(255,246,214,.35)', border: `5px solid ${INK}` });
const SOL = (c, z = 1) => box(c, 0, 0, 200, 200, { zIndex: z, borderRadius: '50%', background: '#ffd04a', boxShadow: '0 0 90px 40px rgba(255,200,80,.45)', border: `5px solid ${INK}` });
const LLUVIA = (c, n = 40, z = 55) => [...Array(n)].map((_, i) => box(c, 0, 0, 4, 60, { zIndex: z, background: 'rgba(220,235,255,.55)', transform: 'rotate(12deg)' }));
const llueve = (ds, t, o) => ds.forEach((d, i) => { const k = ((t * 1.6 + i * 0.137) % 1); d.style.left = px((i * 97) % 1100); d.style.top = px(-80 + k * 2000); d.style.opacity = f1(o); });
const ESTRELLAS_C = (c, n = 24, z = 1) => [...Array(n)].map((_, i) => box(c, (i * 131) % 1040, 120 + (i * 79) % 700, 8, 8, { zIndex: z, background: '#fff', borderRadius: '50%' }));
const brillan = (es, t, o) => es.forEach((e, i) => e.style.opacity = f1(o * (0.5 + 0.5 * Math.sin(t * 3 + i))));
/* polvo / humo: nubecillas que salen de un punto (del mundo o de la pantalla) */
const NUBES = (c, n = 6, col = '#d9cfbf', z = 30) => [...Array(n)].map(() => box(c, 0, 0, 90, 90, { zIndex: z, borderRadius: '50%', background: col, border: `4px solid ${INK}` }));
const nubeA = (ns, t, t0, x, y, r = 140, d = 0.8) => ns.forEach((n, i) => { const k = p(t, t0, d, E.outCubic), a = i * 6.28 / ns.length + 0.4; set(n, { o: t > t0 && k < 1 ? 1 - k : 0, x: x + Math.cos(a) * r * k - 45, y: y + Math.sin(a) * r * 0.6 * k - 45 - 60 * k, s: 0.4 + k }); });
/* rótulo diegético (cartel de cuento: papel con chincheta), sin sellos ni colores chillones */
const ROTULO = (c, x, y, l1, l2 = '', o = {}) => box(c, x, y, o.w || 300, l2 ? 150 : 110, { zIndex: o.z || 40, background: '#f4ecd8', border: `5px solid ${INK}`, boxShadow: `6px 6px 0 rgba(0,0,0,.35)`, textAlign: 'center', fontFamily: 'Rye', color: INK, transformOrigin: '50% 0' },
  `<div style="font-size:${o.size || 56}px;line-height:${l2 ? 86 : 100}px">${l1}</div>${l2 ? `<div style="font-family:SpecialElite;font-size:24px;margin-top:-14px">${l2}</div>` : ''}`);
const rotuloA = (r, t, t0, t1 = 1e9) => { const k = p(t, t0, 0.35, E.outBack); set(r, { o: t > t0 && t < t1 ? 1 : 0, r: lerp(-14, -3, k) + Math.sin(t * 2) * 1.5, s: lerp(0.6, 1, k) }); };
/* posición a lo largo de un camino [[x,y],…] (0..1) */
const camino = (pts, k) => { k = clamp(k); const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])), tot = segs.reduce((a, b) => a + b, 0); let d = k * tot;
  for (let i = 0; i < segs.length; i++) { if (d <= segs[i]) { const u = d / segs[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]; } d -= segs[i]; } return pts[pts.length - 1]; };
/* coloca una PERS de ancho w con los pies en (x, y) del mundo */
const pies = (f, w, x, y, extra = {}) => set(f, Object.assign({ x: x - w / 2 - f._x0, y: y - w * 380 / 300 - f._y0 }, extra));
const PERSm = (c, w, o = {}) => { const f = PERS(c, 0, 0, w, o); f._x0 = 0; f._y0 = 0; return f; };
/* casa de pueblo (tejado, fachada y dos ventanas) */
const CASA = (w, h, techo = '#b5523a') => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible"><path d="M0,${h * 0.32} L${w / 2},0 L${w},${h * 0.32} Z" fill="${techo}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><rect x="${w * 0.06}" y="${h * 0.3}" width="${w * 0.88}" height="${h * 0.7}" fill="#e9dcc2" stroke="${INK}" stroke-width="6"/><rect x="${w * 0.2}" y="${h * 0.45}" width="${w * 0.18}" height="${h * 0.16}" fill="#3d3a44" stroke="${INK}" stroke-width="5"/><rect x="${w * 0.6}" y="${h * 0.45}" width="${w * 0.18}" height="${h * 0.16}" fill="#3d3a44" stroke="${INK}" stroke-width="5"/></svg>`;
