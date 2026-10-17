/* stitch.js — motor de PUNTO DE CRUZ sobre <canvas> para «Por algo se dice».
   JS puro, sin dependencias, determinista (todo sembrado). Ver KIT.md.
   Globales: window.Stitch = { Sprite, textSprite, textRows, FONT, fabric, drawFabric, drawThread,
             rng, hash, mix, shade, wiggle, bounce, THREADS, needle } */
(function () {
  'use strict';
  const PI = Math.PI;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const smooth = k => { k = clamp(k); return k * k * (3 - 2 * k); };

  // ------------------------------------------------------------------ azar sembrado
  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(x, y, s = 0) {
    let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  const strHash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

  // ------------------------------------------------------------------ color
  function rgb(hex) {
    if (hex[0] !== '#') return [128, 128, 128];
    let h = hex.slice(1); if (h.length === 3) h = h.split('').map(c => c + c).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function mix(a, b, k) {
    const A = rgb(a), B = rgb(b);
    const r = A.map((v, i) => Math.round(lerp(v, B[i], k)));
    return '#' + r.map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const shade = (hex, k) => (k >= 0 ? mix(hex, '#ffffff', k) : mix(hex, '#140c08', -k));
  const lum = hex => { const [r, g, b] = rgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
  const rgba = (hex, a) => { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; };

  // Paleta oficial de hilos de la serie
  const THREADS = {
    rojo: '#C8102E', rojo2: '#E03A3E', granate: '#7A1F2B', marino: '#22356B', azul: '#3E6FB0',
    verde: '#3F8F5A', mostaza: '#E0A526', rosa: '#F2A1B5', gris: '#9AA0A6', marron: '#6B4A2F',
    negro: '#1E1A18', blanco: '#FFFFFF',
  };

  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };

  // ------------------------------------------------------------------ STAMPS (puntadas pre-renderizadas)
  // Un "trazo" de hilo (2 hebras de algodón retorcidas) de longitud L, grosor W, con sombra.
  function threadStrokeOn(g, L, W, color, r, opt = {}) {
    const light = lum(color) > 0.85 ? shade(color, 0) : shade(color, 0.42);
    const dark = lum(color) > 0.85 ? mix(color, '#9c8a70', 0.55) : shade(color, -0.45);
    const mid = color;
    const strands = opt.strands || 2;
    for (let sI = 0; sI < strands; sI++) {
      const side = strands === 1 ? 0 : (sI === 0 ? -1 : 1);
      const th = (W / (strands === 1 ? 2 : 3.6)) * (1 + (r() - 0.5) * 0.14);
      const o = side * W * 0.24 + (r() - 0.5) * W * 0.06;
      const bow = (r() - 0.5) * W * 0.18; // leve curvatura (hecho a mano)
      const x0 = -L / 2, x1 = L / 2, e = 0.58;
      const path = new Path2D();
      path.moveTo(x0, o - th * e);
      path.quadraticCurveTo(0, o + bow - th * 1.42, x1, o - th * e);
      path.arc(x1, o, th * e, -PI / 2, PI / 2);
      path.quadraticCurveTo(0, o + bow + th * 1.42, x0, o + th * e);
      path.arc(x0, o, th * e, PI / 2, PI * 1.5);
      path.closePath();
      const gr = g.createLinearGradient(0, o - th, 0, o + th);
      gr.addColorStop(0, dark); gr.addColorStop(0.28, light); gr.addColorStop(0.5, mid); gr.addColorStop(0.82, shade(mid, -0.18)); gr.addColorStop(1, dark);
      g.fillStyle = gr; g.fill(path);
      g.save(); g.clip(path);
      // torsión del hilo: rayas sesgadas claras/oscuras
      const step = th * 1.05, ph = r() * step;
      g.lineCap = 'round';
      for (let x = x0 - th * 2 + ph; x < x1 + th * 2; x += step) {
        g.strokeStyle = rgba(light, 0.55); g.lineWidth = Math.max(0.6, th * 0.32);
        g.beginPath(); g.moveTo(x - th * 0.9, o - th * 1.3); g.quadraticCurveTo(x, o, x + th * 0.9, o + th * 1.3); g.stroke();
        g.strokeStyle = rgba(dark, 0.32); g.lineWidth = Math.max(0.5, th * 0.22);
        g.beginPath(); g.moveTo(x - th * 0.9 + step * 0.45, o - th * 1.3); g.quadraticCurveTo(x + step * 0.45, o, x + th * 0.9 + step * 0.45, o + th * 1.3); g.stroke();
      }
      // extremos que se hunden en los agujeros de la tela
      const ge = g.createLinearGradient(x0 - th, 0, x1 + th, 0);
      ge.addColorStop(0, 'rgba(20,10,5,.55)'); ge.addColorStop(0.16, 'rgba(20,10,5,0)');
      ge.addColorStop(0.84, 'rgba(20,10,5,0)'); ge.addColorStop(1, 'rgba(20,10,5,.55)');
      g.fillStyle = ge; g.fillRect(x0 - th * 2, o - th * 2, L + th * 4, th * 4);
      g.restore();
      // pelusa de algodón
      g.lineWidth = 0.7;
      const nf = 1 + Math.floor(r() * 3);
      for (let f = 0; f < nf; f++) {
        const fx = lerp(x0 * 0.7, x1 * 0.7, r()), sd = r() < 0.5 ? -1 : 1;
        g.strokeStyle = rgba(light, 0.55);
        g.beginPath(); g.moveTo(fx, o + sd * th * 0.8);
        g.quadraticCurveTo(fx + (r() - 0.5) * th * 2, o + sd * th * 1.6, fx + (r() - 0.5) * th * 2.4, o + sd * th * (1.5 + r()));
        g.stroke();
      }
    }
  }
  // stamp de una pierna de la cruz. dir 1 = '/', -1 = '\'
  function legStamp(color, s, dir, seed, opt = {}) {
    const r = rng(seed);
    const S = Math.ceil(s * 2.1), c = mk(S, S), g = c.getContext('2d');
    const inset = s * 0.075, half = s / 2 - inset;
    const ang = (dir > 0 ? -PI / 4 : PI / 4) + (r() - 0.5) * 0.08;
    const L = Math.SQRT2 * 2 * half * (1 + (r() - 0.5) * 0.05);
    const W = s * (opt.w || 0.44) * (1 + (r() - 0.5) * 0.12);
    const jx = (r() - 0.5) * s * 0.05, jy = (r() - 0.5) * s * 0.05;
    g.translate(S / 2 + jx, S / 2 + jy);
    // sombra proyectada sobre la tela / la otra pierna
    g.save(); g.translate(s * 0.05, s * 0.085); g.rotate(ang);
    g.filter = `blur(${Math.max(0.6, s * 0.055)}px)`; g.fillStyle = dir > 0 ? 'rgba(60,35,15,.38)' : 'rgba(50,28,10,.5)';
    g.beginPath(); g.ellipse(0, 0, L / 2 + s * 0.03, W * 0.48, 0, 0, PI * 2); g.fill(); g.restore();
    g.rotate(ang);
    threadStrokeOn(g, L, W, color, r, opt);
    return c;
  }
  // tramo recto (pespunte / backstitch) de longitud len en celdas, ángulo a
  function segStamp(color, s, ang, lenCells, seed) {
    const r = rng(seed);
    const L = s * lenCells * 0.93, W = s * 0.24;
    const S = Math.ceil(L + s * 0.9), c = mk(S, S), g = c.getContext('2d');
    g.translate(S / 2, S / 2);
    g.save(); g.translate(s * 0.03, s * 0.06); g.rotate(ang); g.filter = `blur(${Math.max(0.5, s * 0.04)}px)`;
    g.fillStyle = 'rgba(40,22,10,.4)'; g.beginPath(); g.ellipse(0, 0, L / 2, W * 0.5, 0, 0, PI * 2); g.fill(); g.restore();
    g.rotate(ang + (r() - 0.5) * 0.05);
    threadStrokeOn(g, L, W, color, r, { strands: 1 });
    return c;
  }
  const STAMPS = new Map();
  const NVAR = 6;
  function stampsFor(color, s, legW) {
    const key = color + '|' + s + '|' + (legW || 0.44);
    let st = STAMPS.get(key);
    if (!st) {
      const base = strHash(key);
      st = { a: [], b: [], S: Math.ceil(s * 2.1) };
      for (let i = 0; i < NVAR; i++) { st.a.push(legStamp(color, s, 1, base + i * 7 + 1, { w: legW })); st.b.push(legStamp(color, s, -1, base + i * 13 + 5, { w: legW })); }
      STAMPS.set(key, st);
    }
    return st;
  }
  const SEGS = new Map();
  function segsFor(color, s) {
    const key = color + '|' + s;
    let st = SEGS.get(key);
    if (!st) {
      const base = strHash(key);
      st = { h: [], v: [], d1: [], d2: [] };
      for (let i = 0; i < 3; i++) {
        st.h.push(segStamp(color, s, 0, 1, base + i));
        st.v.push(segStamp(color, s, PI / 2, 1, base + i + 11));
        st.d1.push(segStamp(color, s, -PI / 4, Math.SQRT2, base + i + 23));
        st.d2.push(segStamp(color, s, PI / 4, Math.SQRT2, base + i + 37));
      }
      SEGS.set(key, st);
    }
    return st;
  }
  // "marca" que deja una puntada deshecha (la tela recuerda)
  const GHOSTS = new Map();
  function ghostStamp(s) {
    if (GHOSTS.has(s)) return GHOSTS.get(s);
    const S = Math.ceil(s * 2.1), c = mk(S, S), g = c.getContext('2d');
    g.translate(S / 2, S / 2); g.lineCap = 'round';
    // la tela queda un pelín aplastada donde hubo puntada y los agujeros, agrandados
    g.fillStyle = 'rgba(120,90,55,.035)'; g.fillRect(-s * 0.42, -s * 0.42, s * 0.84, s * 0.84);
    g.strokeStyle = 'rgba(110,80,50,.035)'; g.lineWidth = s * 0.14;
    const h = s * 0.36;
    g.beginPath(); g.moveTo(-h, h); g.lineTo(h, -h); g.moveTo(-h, -h); g.lineTo(h, h); g.stroke();
    g.fillStyle = 'rgba(70,45,20,.18)';
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { g.beginPath(); g.arc(a * s / 2, b * s / 2, s * 0.09, 0, PI * 2); g.fill(); });
    GHOSTS.set(s, c); return c;
  }

  // ------------------------------------------------------------------ HILO suelto (curva)
  function catmull(pts, seg = 6) {
    if (pts.length < 3) return pts.slice();
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let k = 0; k < seg; k++) {
        const t = k / seg, t2 = t * t, t3 = t2 * t;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
  function polyPath(g, pts) { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); }
  // Dibuja un hilo de algodón por una lista de puntos (se suaviza). opt: color, width, shadow, smooth
  function drawThread(g, pts, opt = {}) {
    if (!pts || pts.length < 2) return;
    const color = opt.color || THREADS.rojo, W = opt.width || 7;
    const P = opt.smooth === false ? pts : catmull(pts, opt.seg || 6);
    g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
    if (opt.shadow !== false) {
      g.save(); g.translate(W * 0.35, W * (opt.shadowDy || 0.9));
      g.strokeStyle = `rgba(40,20,8,${opt.shadowA || 0.28})`; g.lineWidth = W * 1.05; polyPath(g, P); g.stroke(); g.restore();
    }
    g.strokeStyle = shade(color, -0.42); g.lineWidth = W; polyPath(g, P); g.stroke();
    g.strokeStyle = color; g.lineWidth = W * 0.74; polyPath(g, P); g.stroke();
    // torsión
    g.setLineDash([W * 0.42, W * 0.55]); g.lineDashOffset = opt.dashOffset || 0;
    g.strokeStyle = rgba(shade(color, -0.5), 0.45); g.lineWidth = W * 0.7; polyPath(g, P); g.stroke();
    g.setLineDash([]);
    g.save(); g.translate(-W * 0.12, -W * 0.16);
    g.strokeStyle = rgba(shade(color, 0.5), 0.75); g.lineWidth = W * 0.22; polyPath(g, P); g.stroke(); g.restore();
    g.restore();
    return P;
  }

  // ------------------------------------------------------------------ AGUJA
  function needle(g, x, y, ang, len = 90, threadColor = THREADS.rojo, tail) {
    g.save(); g.translate(x, y); g.rotate(ang);
    // punta en (0,0), ojo hacia +x
    const w = len * 0.055;
    g.fillStyle = 'rgba(30,20,10,.28)';
    g.beginPath(); g.ellipse(len * 0.5 + 4, 9, len * 0.52, w * 0.9, 0, 0, PI * 2); g.fill();
    const gr = g.createLinearGradient(0, -w, 0, w);
    gr.addColorStop(0, '#f6f7f9'); gr.addColorStop(0.35, '#ffffff'); gr.addColorStop(0.6, '#a9afb7'); gr.addColorStop(1, '#5f656d');
    g.fillStyle = gr;
    g.beginPath(); g.moveTo(0, 0); g.lineTo(len * 0.8, -w); g.quadraticCurveTo(len + w * 1.4, -w * 1.1, len + w * 1.2, 0);
    g.quadraticCurveTo(len + w * 1.4, w * 1.1, len * 0.8, w); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(40,40,50,.5)'; g.lineWidth = 1; g.stroke();
    g.fillStyle = '#3a3f46'; g.beginPath(); g.ellipse(len * 0.93, 0, len * 0.06, w * 0.38, 0, 0, PI * 2); g.fill();
    g.restore();
    const ex = x + Math.cos(ang) * len * 0.93, ey = y + Math.sin(ang) * len * 0.93;
    if (tail) drawThread(g, [[ex, ey]].concat(tail), { color: threadColor, width: len * 0.07 });
    return [ex, ey];
  }

  // ------------------------------------------------------------------ TELA
  const FABRICS = new Map();
  const FAB_COLORS = { crema: '#F3EBDD', lino: '#CFC9BE', gris: '#B9B8B3', azul: '#BFD0E2', blanco: '#FBF8F1', rosa: '#F5DCD8', negro: '#2A2726' };
  function fabric(o = {}) {
    const w = Math.ceil(o.w || 1080), h = Math.ceil(o.h || 1920), cell = o.cell || 20;
    const color = FAB_COLORS[o.color] || o.color || FAB_COLORS.crema, kind = o.kind || 'aida', seed = o.seed || 7;
    const key = [w, h, cell, color, kind, seed].join('|');
    if (FABRICS.has(key)) return FABRICS.get(key);
    const c = mk(w, h), g = c.getContext('2d'), r = rng(seed);
    const dk = lum(color) < 0.4;
    g.fillStyle = color; g.fillRect(0, 0, w, h);
    // manchas suaves de baja frecuencia
    for (let i = 0; i < 26; i++) {
      const x = r() * w, y = r() * h, R = 120 + r() * 380;
      const gr = g.createRadialGradient(x, y, 0, x, y, R);
      const a = 0.025 + r() * 0.035;
      gr.addColorStop(0, r() < 0.5 ? `rgba(255,255,255,${a})` : `rgba(120,90,50,${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x - R, y - R, R * 2, R * 2);
    }
    if (kind === 'aida') {
      const hi = shade(color, dk ? 0.12 : 0.35), lo = shade(color, dk ? -0.4 : -0.22);
      const nx = Math.ceil(w / cell) + 1, ny = Math.ceil(h / cell) + 1;
      const ins = cell * 0.13, bw = cell - ins * 2, rad = cell * 0.22;
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const x = i * cell, y = j * cell, n = hash(i, j, seed);
        // bloque tejido (sobresale)
        g.fillStyle = rgba(hi, 0.22 + n * 0.22);
        g.beginPath(); g.roundRect ? g.roundRect(x + ins, y + ins, bw, bw, rad) : g.rect(x + ins, y + ins, bw, bw); g.fill();
        if (cell >= 9) {
          // hilos de la trama dentro del bloque
          g.strokeStyle = rgba(lo, 0.1 + n * 0.06); g.lineWidth = Math.max(0.5, cell * 0.04);
          g.beginPath();
          for (let k = 1; k < 4; k++) { const q = ins + bw * k / 4; g.moveTo(x + q, y + ins + 1); g.lineTo(x + q, y + ins + bw - 1); }
          g.stroke();
          g.strokeStyle = rgba(hi, 0.18); g.beginPath();
          for (let k = 1; k < 4; k++) { const q = ins + bw * k / 4 + 0.5; g.moveTo(x + ins + 1, y + q); g.lineTo(x + ins + bw - 1, y + q); }
          g.stroke();
        }
      }
      // agujeros en las intersecciones
      const hr = Math.max(0.8, cell * 0.12);
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const x = i * cell, y = j * cell, n = hash(i + 91, j + 17, seed);
        g.fillStyle = rgba(shade(color, dk ? -0.7 : -0.55), 0.38 + n * 0.18);
        g.beginPath(); g.arc(x + (n - 0.5) * cell * 0.04, y, hr * (0.85 + n * 0.3), 0, PI * 2); g.fill();
        g.fillStyle = rgba(hi, 0.35);
        g.beginPath(); g.arc(x + hr * 0.7, y + hr * 0.9, hr * 0.45, 0, PI * 2); g.fill();
      }
    } else {
      // lino / tela lisa: hilos finos con irregularidades (slubs)
      const lo = shade(color, -0.25), hi = shade(color, 0.3);
      for (let y = 0; y < h; y += 2.2) {
        g.strokeStyle = rgba(r() < 0.5 ? lo : hi, 0.06 + r() * 0.12); g.lineWidth = 0.6 + r() * 1.4;
        g.beginPath(); g.moveTo(0, y + r()); g.lineTo(w, y + r()); g.stroke();
      }
      for (let x = 0; x < w; x += 2.2) {
        g.strokeStyle = rgba(r() < 0.5 ? lo : hi, 0.05 + r() * 0.1); g.lineWidth = 0.6 + r() * 1.2;
        g.beginPath(); g.moveTo(x + r(), 0); g.lineTo(x + r(), h); g.stroke();
      }
      for (let i = 0; i < w * h / 900; i++) { // slubs
        const x = r() * w, y = r() * h, l = 6 + r() * 26;
        g.strokeStyle = rgba(r() < 0.5 ? lo : hi, 0.25); g.lineWidth = 1 + r() * 1.5;
        g.beginPath(); if (r() < 0.5) { g.moveTo(x, y); g.lineTo(x + l, y); } else { g.moveTo(x, y); g.lineTo(x, y + l); } g.stroke();
      }
    }
    // fibras sueltas
    for (let i = 0; i < w * h / 6000; i++) {
      const x = r() * w, y = r() * h;
      g.strokeStyle = r() < 0.5 ? 'rgba(255,255,255,.25)' : 'rgba(90,60,30,.12)'; g.lineWidth = 0.6;
      g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + (r() - 0.5) * 14, y + (r() - 0.5) * 14, x + (r() - 0.5) * 20, y + (r() - 0.5) * 20); g.stroke();
    }
    FABRICS.set(key, c);
    return c;
  }
  // dibuja tela en un rectángulo, alineando la rejilla con (ox,oy) (p. ej. el origen de un sprite)
  function drawFabric(g, x, y, w, h, o = {}) {
    const cell = o.cell || 20;
    const f = fabric(Object.assign({}, o, { w: Math.ceil(w + cell * 2), h: Math.ceil(h + cell * 2), cell }));
    const ox = o.ox == null ? x : o.ox, oy = o.oy == null ? y : o.oy;
    const dx = ((x - ox) % cell + cell) % cell, dy = ((y - oy) % cell + cell) % cell;
    g.drawImage(f, dx, dy, w, h, x, y, w, h);
  }

  // ------------------------------------------------------------------ SPRITE
  class Sprite {
    /* rows: array de strings (cada carácter = color de la paleta; '.' o ' ' = vacío)
       palette: {char:'#hex'}
       o: { cell=18, seed=1, outline:false|'outer'|'all', outlineColor, groups:{char:grupo|null},
            legW (grosor relativo del hilo 0.44), tails (nº de hilos sueltos) } */
    constructor(rows, palette, o = {}) {
      this.rows = rows; this.pal = palette; this.o = o;
      this.cell = o.cell || 18; this.seed = o.seed || 1;
      this.h = rows.length; this.w = Math.max(...rows.map(r => r.length));
      this.M = Math.ceil(this.cell * 1.3);
      this.pw = this.w * this.cell; this.ph = this.h * this.cell;
      this.cells = []; this.grid = new Int32Array(this.w * this.h).fill(-1);
      for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
        const ch = rows[y][x];
        if (!ch || ch === '.' || ch === ' ' || !palette[ch]) continue;
        this.grid[y * this.w + x] = this.cells.length;
        this.cells.push({ x, y, ch, col: palette[ch], i: this.cells.length });
      }
      this.segs = this._outline();
      this._orders = new Map();
      this._full = null;
    }
    at(x, y) { return x < 0 || y < 0 || x >= this.w || y >= this.h ? -1 : this.grid[y * this.w + x]; }
    _outline() {
      const o = this.o, mode = o.outline; if (!mode) return [];
      const groups = o.groups || {};
      const grp = ch => (ch in groups ? groups[ch] : (mode === 'outer' ? 'x' : ch));
      const segs = [];
      for (const c of this.cells) {
        const gA = grp(c.ch); if (gA == null) continue;
        const nb = [[0, -1, 'h', 0, 0], [0, 1, 'h', 0, 1], [-1, 0, 'v', 0, 0], [1, 0, 'v', 1, 0]];
        for (const [dx, dy, d, ex, ey] of nb) {
          const j = this.at(c.x + dx, c.y + dy);
          if (j < 0) { segs.push({ x: c.x + ex, y: c.y + ey, d, owner: c.i }); continue; }
          const gB = grp(this.cells[j].ch);
          if (gB == null || gB === gA) continue;
          if (j > c.i) segs.push({ x: c.x + ex, y: c.y + ey, d, owner: Math.max(c.i, j) });
        }
      }
      return segs;
    }
    // ---------------- órdenes de bordado
    order(spec = 'rows') {
      const key = typeof spec === 'string' ? spec : JSON.stringify(spec);
      if (this._orders.has(key)) return this._orders.get(key);
      const type = typeof spec === 'string' ? spec : spec.type;
      const C = this.cells; let ord;
      const r = rng(this.seed * 31 + 7);
      if (type === 'rows') ord = C.map(c => c.i).sort((a, b) => { const A = C[a], B = C[b]; return A.y - B.y || (A.y % 2 ? B.x - A.x : A.x - B.x); });
      else if (type === 'cols') ord = C.map(c => c.i).sort((a, b) => { const A = C[a], B = C[b]; return A.x - B.x || (A.x % 2 ? B.y - A.y : A.y - B.y); });
      else if (type === 'random') { ord = C.map(c => c.i); for (let i = ord.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ord[i], ord[j]] = [ord[j], ord[i]]; } }
      else if (type === 'radial') {
        const f = spec.from || [this.w / 2, this.h / 2];
        const k = C.map(c => Math.hypot(c.x + 0.5 - f[0], c.y + 0.5 - f[1]) + r() * (spec.jitter == null ? 1.5 : spec.jitter));
        ord = C.map(c => c.i).sort((a, b) => k[a] - k[b]);
      } else if (type === 'color') {
        const cols = [...new Set(C.map(c => c.col))];
        ord = C.map(c => c.i).sort((a, b) => { const A = C[a], B = C[b]; return cols.indexOf(A.col) - cols.indexOf(B.col) || A.y - B.y || (A.y % 2 ? B.x - A.x : A.x - B.x); });
      } else if (type === 'path') {
        // cadena "vecino más cercano": como iría el hilo de puntada en puntada
        const f = spec.from || [0, 0];
        const left = new Set(C.map(c => c.i)); ord = [];
        let cx = f[0], cy = f[1];
        // rejilla espacial para que sea rápido
        while (left.size) {
          let best = -1, bd = 1e9;
          for (const i of left) { const c = C[i]; const d = (c.x - cx) * (c.x - cx) * 1.0 + (c.y - cy) * (c.y - cy) * (spec.vy || 1.15); if (d < bd) { bd = d; best = i; if (d <= 1) break; } }
          ord.push(best); left.delete(best); cx = C[best].x; cy = C[best].y;
        }
      } else if (type === 'custom') ord = spec.order.slice();
      else ord = C.map(c => c.i);
      if (typeof spec === 'object' && spec.reverse) ord = ord.slice().reverse();
      this._orders.set(key, ord);
      return ord;
    }
    // ---------------- dibujo de bajo nivel (coordenadas locales del sprite, sin margen)
    _cx(c) { return (c.x + 0.5) * this.cell; }
    _cy(c) { return (c.y + 0.5) * this.cell; }
    _leg(g, c, which, sc = 1, a = 1, dx = 0, dy = 0, rot = 0, sy = 1) {
      const st = stampsFor(c.col, this.cell, this.o.legW);
      const v = Math.floor(hash(c.x, c.y, this.seed + (which ? 101 : 0)) * NVAR);
      const img = which ? st.b[v] : st.a[v];
      if (rot || sy !== 1) {
        g.save(); g.translate(this._cx(c) + dx, this._cy(c) + dy); g.rotate(rot); g.scale(sc, sc * sy);
        if (a < 1) g.globalAlpha *= a;
        g.drawImage(img, -st.S / 2, -st.S / 2); g.restore(); return;
      }
      const S = st.S * sc, x = this._cx(c) - S / 2 + dx, y = this._cy(c) - S / 2 + dy;
      if (a < 1) { const ga = g.globalAlpha; g.globalAlpha = ga * a; g.drawImage(img, x, y, S, S); g.globalAlpha = ga; }
      else if (sc === 1) g.drawImage(img, x, y); else g.drawImage(img, x, y, S, S);
    }
    _seg(g, s) {
      const col = this.o.outlineColor || '#2B1D16';
      const st = segsFor(col, this.cell), v = Math.floor(hash(s.x, s.y + (s.d === 'h' ? 0 : 999), this.seed) * 3);
      const img = s.d === 'h' ? st.h[v] : st.v[v];
      const cx = (s.x + (s.d === 'h' ? 0.5 : 0)) * this.cell, cy = (s.y + (s.d === 'v' ? 0.5 : 0)) * this.cell;
      g.drawImage(img, cx - img.width / 2, cy - img.height / 2);
    }
    _tails(g) {
      const n = this.o.tails == null ? 2 : this.o.tails; if (!n || !this.cells.length) return;
      const r = rng(this.seed * 7 + 3);
      for (let k = 0; k < n; k++) {
        const c = this.cells[Math.floor(r() * this.cells.length)];
        const x = c.x * this.cell + (r() < 0.5 ? 0 : this.cell), y = c.y * this.cell + (r() < 0.5 ? 0 : this.cell);
        const a = r() * PI * 2, L = this.cell * (0.7 + r() * 0.9);
        const pts = [[x, y], [x + Math.cos(a) * L * 0.5 + (r() - 0.5) * L * 0.4, y + Math.sin(a) * L * 0.5 + (r() - 0.5) * L * 0.4], [x + Math.cos(a + 0.6) * L, y + Math.sin(a + 0.6) * L]];
        drawThread(g, pts, { color: c.col, width: this.cell * 0.13, shadowA: 0.18, shadowDy: 0.6 });
      }
    }
    // canvas con el sprite completo (cacheado)
    full() {
      if (this._full) return this._full;
      const c = mk(this.pw + this.M * 2, this.ph + this.M * 2), g = c.getContext('2d');
      g.translate(this.M, this.M);
      const ord = this.order('rows');
      for (const i of ord) { this._leg(g, this.cells[i], 0); this._leg(g, this.cells[i], 1); }
      for (const s of this.segs) this._seg(g, s);
      this._tails(g);
      this._full = c; return c;
    }
    // ---------------- transformaciones
    // o: {scale, sx, sy, rot (rad), alpha, anchor:[ax,ay] (0..1, por defecto 0,0 = esquina sup. izq.)}
    _begin(g, x, y, o = {}) {
      g.save();
      const s = o.scale == null ? 1 : o.scale, ax = o.anchor ? o.anchor[0] : 0, ay = o.anchor ? o.anchor[1] : 0;
      g.translate(x, y); if (o.rot) g.rotate(o.rot); g.scale(s * (o.sx || 1), s * (o.sy || 1));
      g.translate(-ax * this.pw, -ay * this.ph);
      if (o.alpha != null) g.globalAlpha *= o.alpha;
      return g;
    }
    toWorld(lx, ly, x, y, o = {}) {
      const s = o.scale == null ? 1 : o.scale, ax = o.anchor ? o.anchor[0] : 0, ay = o.anchor ? o.anchor[1] : 0;
      let px = (lx - ax * this.pw) * s * (o.sx || 1), py = (ly - ay * this.ph) * s * (o.sy || 1);
      if (o.rot) { const c = Math.cos(o.rot), sn = Math.sin(o.rot); [px, py] = [px * c - py * sn, px * sn + py * c]; }
      return [x + px, y + py];
    }
    toLocal(wx, wy, x, y, o = {}) {
      const s = o.scale == null ? 1 : o.scale, ax = o.anchor ? o.anchor[0] : 0, ay = o.anchor ? o.anchor[1] : 0;
      let px = wx - x, py = wy - y;
      if (o.rot) { const c = Math.cos(-o.rot), sn = Math.sin(-o.rot); [px, py] = [px * c - py * sn, px * sn + py * c]; }
      return [px / (s * (o.sx || 1)) + ax * this.pw, py / (s * (o.sy || 1)) + ay * this.ph];
    }
    // dibuja completo
    draw(g, x, y, o = {}) {
      this._begin(g, x, y, o);
      g.drawImage(this.full(), -this.M, -this.M);
      g.restore();
    }
    /* a) BORDAR: las puntadas aparecen en 2 tiempos (primero '/', luego '\').
       o.order: 'rows' | 'cols' | 'random' | 'color' | {type:'radial',from:[cx,cy]} | {type:'path',from:[cx,cy]}
       o.lag: nº de puntadas "en vuelo" simultáneas; o.needle: dibuja aguja en el frente.
       Devuelve {x,y} (mundo) de la última puntada. */
    stitchIn(g, x, y, k, o = {}) {
      if (k >= 1 && !o.needle) { this.draw(g, x, y, o); return null; }
      const ord = this.order(o.order || 'rows'), N = ord.length;
      const lag = o.lag || Math.max(2, N * 0.025);
      const f = clamp(k) * (N + lag);
      const done = new Uint8Array(this.cells.length);
      this._begin(g, x, y, o);
      let front = -1;
      for (let j = 0; j < N; j++) {
        const u = (f - j) / lag; if (u <= 0) break;
        const c = this.cells[ord[j]]; front = ord[j];
        const u1 = clamp(u / 0.5), u2 = clamp((u - 0.5) / 0.5);
        this._leg(g, c, 0, u1 < 1 ? 1 + 0.5 * (1 - E2(u1)) : 1, u1 < 1 ? clamp(u1 * 3) : 1);
        if (u2 > 0) this._leg(g, c, 1, u2 < 1 ? 1 + 0.5 * (1 - E2(u2)) : 1, u2 < 1 ? clamp(u2 * 3) : 1);
        if (u >= 1) done[c.i] = 1;
      }
      for (const s of this.segs) if (done[s.owner]) this._seg(g, s);
      if (k >= 1) this._tails(g);
      g.restore();
      if (front >= 0) {
        const c = this.cells[front];
        const w = this.toWorld(this._cx(c), this._cy(c), x, y, o);
        if (o.needle && k < 1) {
          const t = o.t || 0, s = (o.scale || 1) * this.cell;
          const ang = -0.9 + Math.sin(t * 9) * 0.12;
          const tx = w[0] + Math.cos(ang) * s * 5.5, ty = w[1] + Math.sin(ang) * s * 5.5;
          needle(g, w[0] + s * 0.3, w[1] - s * 0.3, ang, s * 4.6, o.threadColor || c.col,
            [[tx + s * 1.5, ty - s * 0.5 + Math.sin(t * 5) * s], [tx + s * 3.5, ty + s * 1.5], [tx + s * 6, ty + s * 4]]);
        }
        return { x: w[0], y: w[1] };
      }
      return null;
    }
    /* b) TIRAR DEL HILO: las puntadas se deshacen siguiendo el camino del hilo; UN hilo suelto
       (rojo por defecto) sale del frente, conserva los rizos de las cruces que tenía y serpentea
       hasta o.to = [x,y] (mundo; la mano de la abuela o fuera de cuadro).
       o: { t (s, da vida), to, thread (color), width, order, lag, slack (1), memory (8),
            tail (px de hilo que cuelga más allá de 'to'), ghost (true), fluff (true) }
       Devuelve {front:[x,y], pts:[...curva], end:[x,y]} o null si no hay hilo visible. */
    unravel(g, x, y, k, o = {}) {
      const to = o.to || [x + this.pw * 1.4, y - 400];
      let ord;
      if (o.order) ord = this.order(o.order);
      else {
        const L = this.toLocal(to[0], to[1], x, y, o);
        ord = this.order({ type: 'path', from: [Math.round(L[0] / this.cell), Math.round(L[1] / this.cell)] });
      }
      const N = ord.length; if (!N) return null;
      const lag = o.lag || Math.max(3, N * 0.018);
      const f = clamp(k) * (N + lag);
      const t = o.t || 0, s = this.cell, sc = (o.scale || 1), sw = s * sc;
      const pos = new Float32Array(this.cells.length).fill(-1);
      for (let j = 0; j < N; j++) pos[ord[j]] = j;
      // el frente: la puntada de la que se está tirando ahora mismo
      const jf = Math.min(N - 1, Math.max(0, Math.floor(f - lag * 0.4)));
      const fc = this.cells[ord[jf]];
      const fcx = this._cx(fc), fcy = this._cy(fc);
      const Lt = this.toLocal(to[0], to[1], x, y, o);
      let dxp = Lt[0] - fcx, dyp = Lt[1] - fcy; const dl = Math.hypot(dxp, dyp) || 1; dxp /= dl; dyp /= dl;
      const pullAng = Math.atan2(dyp, dxp);
      this._begin(g, x, y, o);
      const gh = o.ghost !== false ? ghostStamp(s) : null;
      const rows = this.order('rows');
      const st = [];
      for (const i of rows) {
        const j = pos[i], u = (f - j) / lag, c = this.cells[i];
        if (u >= 1) { if (gh) g.drawImage(gh, this._cx(c) - gh.width / 2, this._cy(c) - gh.height / 2); continue; }
        if (u <= 0) { this._leg(g, c, 0); this._leg(g, c, 1); continue; }
        st.push([c, u]);
      }
      for (const s2 of this.segs) { const j = pos[s2.owner]; if ((f - j) / lag <= 0.05) this._seg(g, s2); }
      // puntadas que se sueltan: primero sale la pierna de arriba ('\'), luego '/'.
      // Cada pierna se tensa, se alinea con el tirón y resbala hacia el agujero por donde sale el hilo.
      for (const [c, u] of st) {
        const cx = this._cx(c), cy = this._cy(c);
        const legs = [[0, clamp((u - 0.4) / 0.6)], [1, clamp(u / 0.6)]];
        for (const [which, v] of legs) {
          if (v >= 1) continue;
          if (v <= 0) { this._leg(g, c, which); continue; }
          const e = E2(v);
          let d = pullAng - (which ? PI / 4 : -PI / 4);
          d = ((d + PI / 2) % PI + PI) % PI - PI / 2;
          const mx = (fcx - cx) * e * 0.75 + dxp * s * 0.9 * e, my = (fcy - cy) * e * 0.75 + dyp * s * 0.9 * e - Math.sin(v * PI) * s * 0.35;
          const a = 1 - smooth((v - 0.65) / 0.35);
          this._leg(g, c, which, 1 - 0.45 * e, a, mx, my, d * e * 0.9);
        }
      }
      // agujero tensado donde está el frente
      if (k > 0 && k < 1) {
        g.fillStyle = 'rgba(40,20,8,.35)';
        g.beginPath(); g.ellipse(fcx + dxp * s * 0.25, fcy + dyp * s * 0.25, s * 0.22, s * 0.14, pullAng, 0, PI * 2); g.fill();
      }
      g.restore();
      if (k <= 0 && !o.showAt0) return null;
      if (f >= N + lag - 0.001 && !o.keepThread) return null;
      // ---- el hilo suelto
      const front = this.toWorld(fcx, fcy, x, y, o);
      const pts = [front];
      const m = Math.min(jf, o.memory || 8);
      let prev = front;
      const ttx = to[0], tty = to[1];
      for (let q = 1; q <= m; q++) {
        const c = this.cells[ord[jf - q]];
        const wpt = this.toWorld(this._cx(c), this._cy(c), x, y, o);
        const age = q / (m + 1);
        const pull = smooth(age * 1.15);
        const lx = lerp(front[0], ttx, age * 0.42), ly = lerp(front[1], tty, age * 0.42);
        const px = lerp(wpt[0], lx, pull), py = lerp(wpt[1], ly, pull) - sw * 0.8 * Math.sin(age * PI);
        if (Math.hypot(px - prev[0], py - prev[1]) > sw * 0.9) { pts.push([px, py]); prev = [px, py]; }
      }
      // tramo libre hasta 'to': serpentea con holgura
      const n2 = 10, sx0 = prev[0], sy0 = prev[1];
      const dx = ttx - sx0, dy = tty - sy0, D = Math.hypot(dx, dy) || 1, nx = -dy / D, ny = dx / D;
      const slack = o.slack == null ? 1 : o.slack;
      for (let q = 1; q <= n2; q++) {
        const a = q / n2;
        const amp = slack * Math.min(D * 0.13, sw * 6) * Math.sin(a * PI) * (1 - a * 0.3);
        const wv = Math.sin(a * PI * 2.1 - t * 6.2) * amp + Math.sin(a * PI * 4.6 + t * 3.3) * amp * 0.28;
        pts.push([sx0 + dx * a + nx * wv, sy0 + dy * a + ny * wv + Math.sin(a * PI) * D * 0.07 * slack]);
      }
      // cola que cuelga más allá de la mano
      if (o.tail) {
        const TL = o.tail, n3 = 6;
        for (let q = 1; q <= n3; q++) {
          const a = q / n3;
          pts.push([ttx + Math.sin(a * 2.4 + t * 2.1) * TL * 0.16 * a + TL * 0.12 * a, tty + TL * a]);
        }
      }
      const P = catmull(pts, 5);
      // rizos: el hilo deshecho recuerda las cruces (zigzag que se va alisando)
      let acc = 0;
      const crimpL = sw * 16;
      for (let i = 1; i < P.length - 1; i++) {
        const a = P[i - 1], b = P[i + 1]; const tx2 = b[0] - a[0], ty2 = b[1] - a[1], tl = Math.hypot(tx2, ty2) || 1;
        acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
        const sn = Math.sin(acc / (sw * 0.42));
        const crimp = Math.exp(-acc / crimpL) * sw * 0.32 * Math.sign(sn) * Math.pow(Math.abs(sn), 0.55);
        P[i] = [P[i][0] - ty2 / tl * crimp, P[i][1] + tx2 / tl * crimp];
      }
      const col = o.thread || THREADS.rojo, TW = o.width || Math.max(6, sw * 0.4);
      drawThread(g, P, { color: col, width: TW, smooth: false, dashOffset: -t * 40 });
      // pelusas de algodón que se escapan del frente
      if (o.fluff !== false) {
        g.save(); g.lineCap = 'round';
        for (let i = 0; i < 5; i++) {
          const ph = ((t * 1.1 + i * 0.217 + hash(i, 3, 77)) % 1 + 1) % 1;
          const side = hash(i, 9, 5) - 0.5;
          const px = front[0] + dxp * ph * sw * 2.5 - dyp * side * sw * 2.2;
          const py = front[1] + dyp * ph * sw * 2.5 + dxp * side * sw * 2.2 - ph * sw * 1.8;
          g.globalAlpha = (1 - ph) * 0.85; g.strokeStyle = shade(col, 0.35); g.lineWidth = Math.max(1, sw * 0.06);
          g.beginPath(); g.moveTo(px, py);
          g.quadraticCurveTo(px + sw * 0.3, py - sw * 0.25, px + sw * 0.15 * Math.cos(t * 5 + i), py + sw * 0.35);
          g.stroke();
        }
        g.restore();
      }
      return { front, pts: P, end: P[P.length - 1] };
    }
  }
  const E2 = k => 1 - Math.pow(1 - clamp(k), 3);

  // ------------------------------------------------------------------ c) vida: wiggle / bounce
  // devuelve {rot, scale} pequeños para pasar a draw()
  function wiggle(t, amt = 1, f = 1.1, ph = 0) {
    return { rot: Math.sin((t * f + ph) * PI * 2) * 0.025 * amt, scale: 1 + Math.sin((t * f * 2 + ph) * PI * 2) * 0.012 * amt };
  }
  // rebote de entrada (0→1 con sobrepaso) para escalar
  function bounce(k) { k = clamp(k); const c1 = 2.2, c3 = c1 + 1; return k <= 0 ? 0 : 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); }
  // squash & stretch al aterrizar: devuelve {sx, sy}
  function squash(t, t0, d = 0.35, amt = 0.12) { const k = clamp((t - t0) / d); if (k <= 0 || k >= 1) return { sx: 1, sy: 1 }; const v = Math.sin(k * PI * 2) * (1 - k) * amt; return { sx: 1 + v, sy: 1 - v }; }

  // ------------------------------------------------------------------ FUENTE DE PUNTO DE CRUZ (5x7 + acentos y descendentes)
  // Cada glifo: filas de 7 (cuerpo) + 2 opcionales (descendente). '#' = puntada.
  const G = {
    A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
    C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
    D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
    E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
    F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
    G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
    H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    I: ['###', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
    J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
    K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
    L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
    M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
    N: ['#...#', '##..#', '#.#.#', '#.#.#', '#..##', '#...#', '#...#'],
    O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
    R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
    T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    V: ['#...#', '#...#', '#...#', '#...#', '.#.#.', '.#.#.', '..#..'],
    W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
    X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
    Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
    Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
    a: ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'],
    b: ['#....', '#....', '####.', '#...#', '#...#', '#...#', '####.'],
    c: ['.....', '.....', '.###.', '#....', '#....', '#...#', '.###.'],
    d: ['....#', '....#', '.####', '#...#', '#...#', '#...#', '.####'],
    e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.###.'],
    f: ['..##', '.#..', '###.', '.#..', '.#..', '.#..', '.#..'],
    g: ['.....', '.....', '.####', '#...#', '#...#', '#...#', '.####', '....#', '.###.'],
    h: ['#....', '#....', '####.', '#...#', '#...#', '#...#', '#...#'],
    i: ['.#.', '...', '##.', '.#.', '.#.', '.#.', '###'],
    j: ['...#', '....', '..##', '...#', '...#', '...#', '...#', '#..#', '.##.'],
    k: ['#...', '#...', '#..#', '#.#.', '##..', '#.#.', '#..#'],
    l: ['##.', '.#.', '.#.', '.#.', '.#.', '.#.', '###'],
    m: ['.....', '.....', '##.#.', '#.#.#', '#.#.#', '#.#.#', '#.#.#'],
    n: ['.....', '.....', '####.', '#...#', '#...#', '#...#', '#...#'],
    o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
    p: ['.....', '.....', '####.', '#...#', '#...#', '#...#', '####.', '#....', '#....'],
    q: ['.....', '.....', '.####', '#...#', '#...#', '#...#', '.####', '....#', '....#'],
    r: ['....', '....', '#.##', '##..', '#...', '#...', '#...'],
    s: ['.....', '.....', '.####', '#....', '.###.', '....#', '####.'],
    t: ['.#..', '.#..', '###.', '.#..', '.#..', '.#.#', '..#.'],
    u: ['.....', '.....', '#...#', '#...#', '#...#', '#..##', '.##.#'],
    v: ['.....', '.....', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
    w: ['.....', '.....', '#...#', '#...#', '#.#.#', '#.#.#', '.#.#.'],
    x: ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
    y: ['.....', '.....', '#...#', '#...#', '#...#', '#...#', '.####', '....#', '.###.'],
    z: ['.....', '.....', '#####', '...#.', '..#..', '.#...', '#####'],
    0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
    1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
    3: ['#####', '...#.', '..#..', '...#.', '....#', '#...#', '.###.'],
    4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
    6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
    7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
    8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
    9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
    '!': ['#', '#', '#', '#', '#', '.', '#'],
    '¡': ['#', '.', '#', '#', '#', '#', '#'],
    '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
    '¿': ['..#..', '.....', '..#..', '.#...', '#....', '#...#', '.###.'],
    '.': ['.', '.', '.', '.', '.', '.', '#'],
    ',': ['..', '..', '..', '..', '..', '.#', '.#', '#.'],
    ':': ['.', '.', '#', '.', '.', '.', '#'],
    ';': ['..', '..', '.#', '..', '..', '.#', '.#', '#.'],
    '-': ['...', '...', '...', '###', '...', '...', '...'],
    '«': ['......', '......', '..#..#', '.#..#.', '#..#..', '.#..#.', '..#..#'],
    '»': ['......', '......', '#..#..', '.#..#.', '..#..#', '.#..#.', '#..#..'],
    '"': ['#.#', '#.#', '...', '...', '...', '...', '...'],
    "'": ['#', '#', '.', '.', '.', '.', '.'],
    '(': ['.#', '#.', '#.', '#.', '#.', '#.', '.#'],
    ')': ['#.', '.#', '.#', '.#', '.#', '.#', '#.'],
    '/': ['....#', '...#.', '...#.', '..#..', '.#...', '.#...', '#....'],
    '%': ['##..#', '##.#.', '...#.', '..#..', '.#...', '.#.##', '#..##'],
    '€': ['..###', '.#...', '####.', '.#...', '####.', '.#...', '..###'],
    '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
    '=': ['....', '....', '####', '....', '####', '....', '....'],
    '…': ['.....', '.....', '.....', '.....', '.....', '.....', '#.#.#'],
    '♥': ['.....', '##.##', '#####', '#####', '.###.', '..#..', '.....'],
    '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
    ' ': ['...', '...', '...', '...', '...', '...', '...'],
  };
  // marcas diacríticas: 'top' = 2 filas sobre el cuerpo (mayúsculas); en minúsculas van en filas 0-1
  const ACUTE = ['...#.', '..#..'], DIER = ['.....', '.#.#.'], TILDE = ['.##.#', '#..#.'];
  const accented = { 'Á': ['A', ACUTE], 'É': ['E', ACUTE], 'Í': ['I', ['..#', '.#.']], 'Ó': ['O', ACUTE], 'Ú': ['U', ACUTE], 'Ü': ['U', DIER], 'Ñ': ['N', TILDE],
    'á': ['a', ACUTE], 'é': ['e', ACUTE], 'í': ['i', ['..#', '.#.']], 'ó': ['o', ACUTE], 'ú': ['u', ACUTE], 'ü': ['u', DIER], 'ñ': ['n', TILDE] };
  const FONT = {};
  for (const k in G) FONT[k] = { rows: G[k], top: null };
  for (const k in accented) {
    const [base, mark] = accented[k]; const b = G[base].slice(); const w = b[0].length;
    const m = mark.map(r => (r + '.....').slice(0, w));
    if (base === base.toUpperCase()) FONT[k] = { rows: b, top: m };
    else { b[0] = m[0]; b[1] = m[1]; FONT[k] = { rows: b, top: null }; }
  }
  function glyph(ch) { return FONT[ch] || FONT[ch.toUpperCase()] || FONT['?']; }
  /* textRows(str, o) → {rows, w, h}
     o: { px=1 (escala entera del glifo: 2 = cada píxel son 2x2 puntadas), ch='x' (carácter de color), spacing=1, lineGap=1, align='center', bold=false, shadow:null|'s' (carácter sombra),
          shadowOff:[1,1], pad=0 }  — admite '\n' para varias líneas */
  function textRows(str, o = {}) {
    const ch = o.ch || 'x', sp = o.spacing == null ? 1 : o.spacing, gap = o.lineGap == null ? 1 : o.lineGap;
    const lines = String(str).split('\n');
    const built = lines.map(line => {
      const gl = [...line].map(c => glyph(c));
      const top = gl.some(gg => gg.top) ? 2 : 0;
      const desc = gl.some(gg => gg.rows.length > 7) ? 2 : 0;
      const H = top + 7 + desc;
      let W = 0; gl.forEach((gg, i) => { W += gg.rows[0].length + (o.bold ? 1 : 0) + (i < gl.length - 1 ? sp : 0); });
      const m = Array.from({ length: H }, () => new Array(Math.max(W, 0)).fill('.'));
      let x = 0;
      gl.forEach(gg => {
        const gw = gg.rows[0].length;
        const put = (rr, y0) => rr.forEach((row, yy) => [...row].forEach((c, xx) => { if (c === '#') { m[y0 + yy][x + xx] = ch; if (o.bold) m[y0 + yy][x + xx + 1] = ch; } }));
        if (gg.top) put(gg.top, 0);
        put(gg.rows, top);
        x += gw + (o.bold ? 1 : 0) + sp;
      });
      return { m, W, H, top };
    });
    const W0 = Math.max(...built.map(b => b.W));
    const sh = o.shadow ? 1 : 0, pad = o.pad || 0;
    let rows = [];
    const W1 = W0;
    built.forEach((b, li) => {
      const off = o.align === 'left' ? 0 : o.align === 'right' ? W1 - b.W : Math.floor((W1 - b.W) / 2);
      b.m.forEach(r => rows.push('.'.repeat(off) + r.join('') + '.'.repeat(W1 - b.W - off)));
      if (li < built.length - 1) for (let k = 0; k < gap; k++) rows.push('.'.repeat(W1));
    });
    // o.px: cada píxel del glifo = px×px puntadas (letra grande con trama fina, como los dechados)
    const PX = Math.max(1, Math.round(o.px || 1));
    if (PX > 1) rows = rows.flatMap(r => { const e = [...r].map(c => c.repeat(PX)).join(''); return Array(PX).fill(e); });
    const W = W1 * PX;
    let out = rows.map(r => r + '.'.repeat(sh));
    if (sh) {
      out.push('.'.repeat(W + 1));
      const [ox, oy] = o.shadowOff || [1, 1];
      const g2 = out.map(r => r.split(''));
      for (let y = 0; y < rows.length; y++) for (let x = 0; x < W; x++) if (rows[y][x] === ch && g2[y + oy] && g2[y + oy][x + ox] === '.') g2[y + oy][x + ox] = o.shadow;
      out = g2.map(r => r.join(''));
    }
    if (pad) { const PW = out[0].length + pad * 2; const e = '.'.repeat(PW); out = Array(pad).fill(e).concat(out.map(r => '.'.repeat(pad) + r + '.'.repeat(pad)), Array(pad).fill(e)); }
    return { rows: out, w: out[0].length, h: out.length };
  }
  /* textSprite(str, o) → Sprite. o: color, shadowColor, cell, + opciones de textRows y de Sprite.
     o.colors: array de colores por línea (opcional). */
  function textSprite(str, o = {}) {
    const color = o.color || THREADS.rojo;
    if (o.colors) {
      const lines = String(str).split('\n'); const chars = 'abcdefghijklmn';
      const parts = lines.map((l, i) => textRows(l, Object.assign({}, o, { ch: chars[i], shadow: o.shadowColor ? 'z' : null })));
      const W = Math.max(...parts.map(p => p.w)); const rows = [];
      parts.forEach((p, i) => { const off = Math.floor((W - p.w) / 2); p.rows.forEach(r => rows.push('.'.repeat(off) + r + '.'.repeat(W - p.w - off))); if (i < parts.length - 1) for (let k = 0; k < (o.lineGap == null ? 1 : o.lineGap); k++) rows.push('.'.repeat(W)); });
      const pal = {}; lines.forEach((l, i) => { pal[chars[i]] = o.colors[i % o.colors.length]; }); if (o.shadowColor) pal.z = o.shadowColor;
      return new Sprite(rows, pal, Object.assign({ tails: 1 }, o));
    }
    const tr = textRows(str, Object.assign({}, o, { ch: 'x', shadow: o.shadowColor ? 's' : null }));
    const pal = { x: color }; if (o.shadowColor) pal.s = o.shadowColor;
    return new Sprite(tr.rows, pal, Object.assign({ tails: 1 }, o));
  }
  // ancho en celdas de un texto (para elegir tamaño de celda)
  function textWidth(str, o = {}) { return textRows(str, o).w; }

  window.Stitch = { Sprite, textSprite, textRows, textWidth, FONT, fabric, drawFabric, drawThread, needle, catmull,
    rng, hash, strHash, mix, shade, rgba, lum, wiggle, bounce, squash, THREADS, FAB_COLORS, clamp, lerp, smooth, mk, stampsFor };
})();
