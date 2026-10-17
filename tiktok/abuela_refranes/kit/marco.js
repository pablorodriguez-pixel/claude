/* marco.js — BASTIDOR, PARCHES, MERCERÍA, TELAS y LOGO de «Ya lo decía la abuela».
   Requiere stitch.js (y abuela.js para abuelaHoop / logo / endCard). Global: window.Marco
   Todo determinista; lo estático se cachea en canvas offscreen. Ver KIT.md. */
(function () {
  'use strict';
  const S = window.Stitch, PI = Math.PI;
  const { mk, rng, hash, shade, mix, rgba, clamp, lerp, smooth, THREADS } = S;
  const E = {
    outBack: k => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    outCubic: k => 1 - Math.pow(1 - k, 3), inCubic: k => k * k * k,
    inOut: k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
  };
  const seg = (k, a, b) => clamp((k - a) / (b - a));
  const CACHE = new Map();
  const cached = (key, fn) => { if (!CACHE.has(key)) CACHE.set(key, fn()); return CACHE.get(key); };

  // ================================================================== MADERA
  function woodFill(g, cx, cy, r0, r1, seed, base) {
    const r = rng(seed);
    const ring = new Path2D(); ring.arc(cx, cy, r1, 0, PI * 2); ring.arc(cx, cy, r0, 0, PI * 2, true);
    g.save(); g.clip(ring, 'evenodd');
    // volumen: el aro es redondeado (claro arriba, oscuro abajo, canto)
    const rad = g.createRadialGradient(cx, cy, r0, cx, cy, r1);
    rad.addColorStop(0, shade(base, -0.35)); rad.addColorStop(0.25, shade(base, 0.12)); rad.addColorStop(0.55, shade(base, 0.22));
    rad.addColorStop(0.85, base); rad.addColorStop(1, shade(base, -0.4));
    g.fillStyle = rad; g.fillRect(cx - r1, cy - r1, r1 * 2, r1 * 2);
    // veta: arcos concéntricos irregulares
    for (let i = 0; i < 70; i++) {
      const rr = lerp(r0, r1, r()), a0 = r() * PI * 2, len = 0.3 + r() * 1.6;
      g.strokeStyle = r() < 0.7 ? `rgba(90,50,20,${0.08 + r() * 0.16})` : `rgba(255,230,190,${0.1 + r() * 0.12})`;
      g.lineWidth = 0.6 + r() * 1.8;
      g.beginPath(); g.arc(cx, cy, rr, a0, a0 + len); g.stroke();
    }
    // nudos
    for (let i = 0; i < 3; i++) {
      const a = r() * PI * 2, rr = lerp(r0, r1, 0.3 + r() * 0.4), x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      g.fillStyle = 'rgba(90,50,20,.25)'; g.beginPath(); g.ellipse(x, y, (r1 - r0) * 0.18, (r1 - r0) * 0.08, a + PI / 2, 0, PI * 2); g.fill();
    }
    // luz global (arriba-izquierda) y sombra (abajo-derecha)
    const lg = g.createLinearGradient(cx - r1, cy - r1, cx + r1, cy + r1);
    lg.addColorStop(0, 'rgba(255,240,215,.35)'); lg.addColorStop(0.5, 'rgba(255,255,255,0)'); lg.addColorStop(1, 'rgba(60,30,10,.35)');
    g.fillStyle = lg; g.fillRect(cx - r1, cy - r1, r1 * 2, r1 * 2);
    g.restore();
    // brillo especular (barniz)
    g.save(); g.lineCap = 'round'; g.strokeStyle = 'rgba(255,250,235,.55)'; g.lineWidth = Math.max(1.5, (r1 - r0) * 0.12);
    g.beginPath(); g.arc(cx, cy, lerp(r0, r1, 0.5), PI * 1.05, PI * 1.38); g.stroke();
    g.strokeStyle = 'rgba(255,250,235,.25)'; g.lineWidth = Math.max(1, (r1 - r0) * 0.06);
    g.beginPath(); g.arc(cx, cy, lerp(r0, r1, 0.5), PI * 1.45, PI * 1.6); g.stroke();
    g.restore();
  }
  function brass(g, x0, y0, x1, y1) {
    const gr = g.createLinearGradient(x0, y0, x1, y1);
    gr.addColorStop(0, '#7A5A1C'); gr.addColorStop(0.25, '#F6DB86'); gr.addColorStop(0.45, '#FFF4C8'); gr.addColorStop(0.65, '#C9A043'); gr.addColorStop(1, '#6B4D14');
    return gr;
  }

  // ================================================================== BASTIDOR
  // pieza estática: sombra + aros + tornillo, centrada en (P,P) con P = R*1.3
  function hoopRing(R, o = {}) {
    const wood = o.wood || '#C98F55';
    return cached('ring|' + R + '|' + wood, () => {
      const P = Math.ceil(R * 1.32), c = mk(P * 2, P * 2), g = c.getContext('2d');
      const w = Math.max(14, R * 0.085), wi = w * 0.42;
      // sombra proyectada del aro
      g.save(); g.filter = `blur(${Math.round(R * 0.03)}px)`; g.strokeStyle = 'rgba(40,20,5,.45)'; g.lineWidth = w * 1.2;
      g.beginPath(); g.arc(P + R * 0.02, P + R * 0.045, R + w * 0.55, 0, PI * 2); g.stroke(); g.restore();
      // aro interior (asoma, forrado por la tela tensa)
      woodFill(g, P, P, R - wi * 0.25, R + wi, 11, shade(wood, 0.05));
      g.save(); const tint = new Path2D(); tint.arc(P, P, R + wi, 0, PI * 2); tint.arc(P, P, R - wi * 0.25, 0, PI * 2, true);
      g.fillStyle = 'rgba(243,235,221,.38)'; g.fill(tint, 'evenodd'); g.restore();
      // aro exterior
      const r0 = R + wi * 0.85, r1 = R + w;
      g.save(); g.strokeStyle = 'rgba(50,25,8,.55)'; g.lineWidth = 2.2; g.beginPath(); g.arc(P, P, r0, 0, PI * 2); g.stroke(); g.restore();
      woodFill(g, P, P, r0, r1, 23, wood);
      // tornillo de latón arriba: dos orejetas + tornillo pasante + cabeza moleteada
      const lw = w * 0.75, lh = w * 1.25, gap = w * 0.22, top = P - r1 - lh + w * 0.35;
      for (const sd of [-1, 1]) {
        const x = sd < 0 ? P - gap - lw : P + gap;
        g.save(); g.shadowColor = 'rgba(40,20,5,.4)'; g.shadowBlur = 6; g.shadowOffsetY = 3;
        const lg = g.createLinearGradient(x, 0, x + lw, 0);
        lg.addColorStop(0, shade(wood, -0.25)); lg.addColorStop(0.4, shade(wood, 0.2)); lg.addColorStop(1, shade(wood, -0.3));
        g.fillStyle = lg; g.beginPath(); g.roundRect(x, top, lw, lh + w * 0.6, lw * 0.25); g.fill(); g.restore();
        g.strokeStyle = 'rgba(70,35,10,.35)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + lw * 0.3, top + 4); g.lineTo(x + lw * 0.35, top + lh); g.stroke();
      }
      const sy = top + lh * 0.42, sh = w * 0.34;
      g.fillStyle = brass(g, 0, sy - sh, 0, sy + sh); g.fillRect(P - gap - lw - w * 0.3, sy - sh * 0.5, (gap + lw) * 2 + w * 0.3, sh);
      // tuerca izquierda
      g.fillStyle = brass(g, 0, sy - sh, 0, sy + sh); g.beginPath(); g.roundRect(P - gap - lw - w * 0.42, sy - sh * 0.85, w * 0.22, sh * 1.7, 2); g.fill();
      // cabeza moleteada derecha
      const hx = P + gap + lw + w * 0.08, hw = w * 0.5, hh = w * 1.15;
      g.save(); g.shadowColor = 'rgba(40,20,5,.45)'; g.shadowBlur = 5; g.shadowOffsetY = 3;
      g.fillStyle = brass(g, 0, sy - hh / 2, 0, sy + hh / 2); g.beginPath(); g.roundRect(hx, sy - hh / 2, hw, hh, hw * 0.35); g.fill(); g.restore();
      g.strokeStyle = 'rgba(90,60,10,.6)'; g.lineWidth = 1.2;
      for (let i = 1; i < 7; i++) { const yy = sy - hh / 2 + hh * i / 7; g.beginPath(); g.moveTo(hx + 2, yy); g.lineTo(hx + hw - 2, yy); g.stroke(); }
      g.fillStyle = 'rgba(255,255,230,.6)'; g.fillRect(hx + hw * 0.18, sy - hh * 0.42, hw * 0.16, hh * 0.84);
      return c;
    });
  }
  // sombreado interior de la tela tensa (oscurece el borde, luz en el centro)
  function hoopShade(R) {
    return cached('shade|' + R, () => {
      const c = mk(R * 2, R * 2), g = c.getContext('2d');
      const gr = g.createRadialGradient(R * 0.85, R * 0.8, R * 0.2, R, R, R);
      gr.addColorStop(0, 'rgba(255,255,255,.07)'); gr.addColorStop(0.75, 'rgba(255,255,255,0)'); gr.addColorStop(0.93, 'rgba(70,40,15,.12)'); gr.addColorStop(1, 'rgba(50,25,8,.38)');
      g.fillStyle = gr; g.fillRect(0, 0, R * 2, R * 2);
      return c;
    });
  }
  // tela sobrante alrededor del aro (borde ondulado con pliegues)
  function hoopSkirt(R, color) {
    return cached('skirt|' + R + '|' + color, () => {
      const P = Math.ceil(R * 1.32), c = mk(P * 2, P * 2), g = c.getContext('2d'), r = rng(91);
      const path = new Path2D(); const n = 120;
      const ph = [r() * 6, r() * 6, r() * 6];
      for (let i = 0; i <= n; i++) {
        const a = i / n * PI * 2;
        const rr = R * (1.17 + 0.05 * Math.sin(a * 5 + ph[0]) + 0.025 * Math.sin(a * 11 + ph[1]) + 0.012 * Math.sin(a * 23 + ph[2]));
        const x = P + Math.cos(a) * rr, y = P + Math.sin(a) * rr; i ? path.lineTo(x, y) : path.moveTo(x, y);
      }
      g.save(); g.shadowColor = 'rgba(40,20,5,.35)'; g.shadowBlur = R * 0.05; g.shadowOffsetY = R * 0.02;
      g.fillStyle = S.FAB_COLORS[color] || color; g.fill(path); g.restore();
      g.save(); g.clip(path);
      const f = S.fabric({ w: P * 2, h: P * 2, cell: Math.max(8, Math.round(R / 30)), color });
      g.drawImage(f, 0, 0);
      // pliegues radiales
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * PI * 2 + r() * 0.3;
        const gr = g.createLinearGradient(P + Math.cos(a) * R, P + Math.sin(a) * R, P + Math.cos(a) * R * 1.25, P + Math.sin(a) * R * 1.25);
        gr.addColorStop(0, 'rgba(60,35,10,.22)'); gr.addColorStop(1, 'rgba(60,35,10,0)');
        g.strokeStyle = gr; g.lineWidth = R * (0.03 + r() * 0.05); g.lineCap = 'round';
        g.beginPath(); g.moveTo(P + Math.cos(a) * R, P + Math.sin(a) * R); g.lineTo(P + Math.cos(a + 0.04) * R * 1.22, P + Math.sin(a + 0.04) * R * 1.22); g.stroke();
      }
      g.restore();
      return c;
    });
  }
  /* hoop(g, cx, cy, R, o) — bastidor redondo con la tela tensa.
     o: { content(g) (dibuja en coordenadas de mundo, recortado al círculo), fabric ('crema'), cell (rejilla de la tela),
          ox, oy (origen de la rejilla), skirt (tela sobrante, false), scale, rot, alpha, wood } */
  function hoop(g, cx, cy, R, o = {}) {
    R = Math.round(R);
    g.save();
    if (o.alpha != null) g.globalAlpha *= o.alpha;
    g.translate(cx, cy); if (o.rot) g.rotate(o.rot); if (o.scale != null) g.scale(o.scale, o.scale); g.translate(-cx, -cy);
    const P = Math.ceil(R * 1.32);
    const fab = o.fabric || 'crema';
    if (o.skirt) g.drawImage(hoopSkirt(R, fab), cx - P, cy - P);
    g.save();
    g.beginPath(); g.arc(cx, cy, R + 2, 0, PI * 2); g.clip();
    const cell = o.cell || Math.max(8, Math.round(R / 30));
    S.drawFabric(g, cx - R - 2, cy - R - 2, R * 2 + 4, R * 2 + 4, { cell, color: fab, ox: o.ox == null ? cx : o.ox, oy: o.oy == null ? cy : o.oy });
    if (o.content) o.content(g);
    g.drawImage(hoopShade(R), cx - R, cy - R);
    g.restore();
    g.drawImage(hoopRing(R, o), cx - P, cy - P);
    g.restore();
  }
  // posición/escala de la abuela dentro de un bastidor de radio R
  function abuelaFit(cx, cy, R, o = {}) {
    const cell = o.cell || Math.max(5, Math.round(R / 30 * (o.zoom || 1)));
    const x = Math.round(cx - 24 * cell + (o.dx || 0)), y = Math.round(cy - R * 0.93 + (o.dy || 0));
    return { cell, x, y };
  }
  /* abuelaHoop(g, cx, cy, R, state, o) — la abuela viviendo en su bastidor (ventana).
     o: como hoop() + { zoom, dx, dy, bob (respiración, px), t, stitchIn, unravel } → devuelve {cell,x,y,grip:[x,y]} */
  function abuelaHoop(g, cx, cy, R, st = {}, o = {}) {
    const f = abuelaFit(cx, cy, R, o);
    const bob = o.t != null ? Math.sin(o.t * 2.3) * (o.bob == null ? R * 0.006 : o.bob) : 0;
    hoop(g, cx, cy, R, Object.assign({}, o, {
      cell: f.cell, ox: f.x, oy: f.y,
      content: gg => { Abuela.draw(gg, f.x, f.y + Math.round(bob), st, { cell: f.cell, stitchIn: o.stitchIn, t: o.t }); if (o.content) o.content(gg); },
    }));
    // mano que sujeta el hilo, en mundo (respetando escala/rotación del bastidor)
    let gp = Abuela.grip(f.x, f.y + Math.round(bob), { cell: f.cell });
    if (o.scale != null || o.rot) {
      const s = o.scale == null ? 1 : o.scale, c = Math.cos(o.rot || 0), sn = Math.sin(o.rot || 0);
      const dx = (gp[0] - cx) * s, dy = (gp[1] - cy) * s; gp = [cx + dx * c - dy * sn, cy + dx * sn + dy * c];
    }
    return Object.assign(f, { grip: gp });
  }

  // ================================================================== PARCHE BORDADO (borde satén festoneado)
  function shapePoly(shape, w, h, rad) {
    const pts = [];
    if (shape === 'circle') { const R = Math.max(w, h) / 2; for (let i = 0; i <= 200; i++) { const a = -PI / 2 + i / 200 * PI * 2; pts.push([Math.cos(a) * R, Math.sin(a) * R]); } return pts; }
    const x0 = -w / 2, y0 = -h / 2, r = Math.min(rad, w / 2, h / 2);
    const arc = (cx, cy, a0) => { for (let i = 0; i <= 12; i++) { const a = a0 + i / 12 * PI / 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
    pts.push([0, y0]);
    arc(x0 + w - r, y0 + r, -PI / 2); arc(x0 + w - r, y0 + h - r, 0); arc(x0 + r, y0 + h - r, PI / 2); arc(x0 + r, y0 + r, PI);
    pts.push([0, y0]);
    return pts;
  }
  function resample(poly, step) {
    const out = []; let acc = 0;
    const L = []; let tot = 0;
    for (let i = 1; i < poly.length; i++) { const l = Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]); L.push(l); tot += l; }
    const n = Math.max(8, Math.round(tot / step)); const st = tot / n;
    let i = 0, d = 0;
    for (let k = 0; k < n; k++) {
      const target = k * st;
      while (i < L.length - 1 && acc + L[i] < target) { acc += L[i]; i++; }
      const u = L[i] ? (target - acc) / L[i] : 0;
      const a = poly[i], b = poly[i + 1];
      const x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u);
      const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
      out.push({ x, y, nx: ty / tl, ny: -tx / tl, s: target });
      d = target;
    }
    return { pts: out, len: tot };
  }
  function satinStroke(g, x0, y0, x1, y1, w, col, light) {
    g.strokeStyle = shade(col, -0.45); g.lineWidth = w; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    g.strokeStyle = col; g.lineWidth = w * 0.72; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    g.strokeStyle = light; g.lineWidth = w * 0.26; g.beginPath(); g.moveTo(lerp(x0, x1, 0.2), lerp(y0, y1, 0.2)); g.lineTo(lerp(x0, x1, 0.62), lerp(y0, y1, 0.62)); g.stroke();
  }
  /* patch(g, cx, cy, text, o) — parche bordado con borde satén festoneado y texto en punto de cruz.
     o: { k (0..1 progreso de coserse; 1 = terminado), color (tela del parche, '#E0A526'), border ('#7A1F2B'),
          textColor ('#FFFFFF'), shadowColor (sombra del texto), cell (celda del texto, 12), pad (celdas, 2), bold (letra gruesa),
          shape: 'rect'|'circle', radius, rot, scale, t, needle (true) }
     Fases de k: 0–0,18 aparece (rebote) · 0,12–0,6 se cose el festón · 0,5–1 se borda el texto. */
  function patchGeom(text, o) {
    if (!o.textColor) o = Object.assign({}, o, { textColor: S.lum(o.color || THREADS.mostaza) > 0.6 ? THREADS.granate : '#FFFFFF' });
    const cell = o.cell || 12, pad = o.pad == null ? 2 : o.pad;
    const key = [text, cell, o.textColor, o.shadowColor, o.color, o.bold ? 1 : 0].join('|');
    const spr = cached('ptxt|' + key, () => S.textSprite(text, { cell, bold: !!o.bold, color: o.textColor || '#FFFFFF', shadowColor: o.shadowColor === undefined ? shade(o.color || THREADS.mostaza, -0.35) : o.shadowColor, tails: 0, seed: S.strHash(text) % 1000 }));
    const bw = Math.max(10, cell * 1.05);
    let w = spr.pw + (pad * 2) * cell + bw * 2, h = spr.ph + (pad * 2) * cell + bw * 2;
    if (o.shape === 'circle') { const d = Math.max(w, h) * 1.05; w = d; h = d; }
    w = o.w || w; h = o.h || h;
    const rad = o.radius == null ? Math.min(w, h) * 0.22 : o.radius;
    const poly = shapePoly(o.shape, w, h, rad);
    const edge = resample(poly, bw * 0.3);
    return { spr, cell, bw, w, h, rad, poly, edge };
  }
  function patchBody(g, G, o, kText, t, kBorder) {
    const col = o.color || THREADS.mostaza, bcol = o.border || THREADS.granate;
    const { spr, bw, w, h, poly, edge } = G;
    const path = new Path2D(); poly.forEach((p, i) => (i ? path.lineTo(p[0], p[1]) : path.moveTo(p[0], p[1]))); path.closePath();
    // sombra + tela del parche (acolchado)
    g.save(); g.shadowColor = 'rgba(40,20,5,.42)'; g.shadowBlur = bw * 1.2; g.shadowOffsetX = bw * 0.2; g.shadowOffsetY = bw * 0.45;
    g.fillStyle = col; g.fill(path); g.restore();
    g.save(); g.clip(path);
    const sx = -spr.pw / 2, sy = -spr.ph / 2;
    S.drawFabric(g, -w / 2, -h / 2, w, h, { cell: spr.cell, color: col, ox: sx, oy: sy });
    const pg = g.createRadialGradient(-w * 0.15, -h * 0.25, 0, 0, 0, Math.max(w, h) * 0.7);
    pg.addColorStop(0, 'rgba(255,255,255,.18)'); pg.addColorStop(0.7, 'rgba(255,255,255,0)'); pg.addColorStop(1, 'rgba(60,30,10,.22)');
    g.fillStyle = pg; g.fillRect(-w / 2, -h / 2, w, h);
    g.restore();
    // texto
    if (kText >= 1) spr.draw(g, sx, sy);
    else if (kText > 0) spr.stitchIn(g, sx, sy, kText, { order: 'cols', needle: o.needle !== false, t, threadColor: o.textColor || '#FFFFFF' });
    // festón satén
    const n = edge.pts.length, upto = Math.floor(kBorder * n);
    const light = shade(bcol, 0.45);
    g.save(); g.lineCap = 'round';
    const sc = Math.max(4, Math.round(n / Math.max(12, Math.round(edge.len / (bw * 2.2)))));
    for (let i = 0; i < upto; i++) {
      const p = edge.pts[i];
      const bump = Math.pow(Math.abs(Math.sin(PI * i / sc)), 0.6);
      const outR = bw * (0.25 + 0.45 * bump), inR = bw * 0.62;
      const jit = (hash(i, 3, 9) - 0.5) * bw * 0.08;
      const sl = 0.22; // satén ligeramente sesgado
      const tx = -p.ny, ty = p.nx;
      satinStroke(g, p.x - p.nx * inR + tx * bw * sl, p.y - p.ny * inR + ty * bw * sl, p.x + p.nx * (outR + jit) - tx * bw * sl * 0.4, p.y + p.ny * (outR + jit) - ty * bw * sl * 0.4,
        bw * 0.42, bcol, light);
    }
    // pespunte interior en hilo claro
    if (kBorder > 0) {
      g.setLineDash([bw * 0.55, bw * 0.4]); g.strokeStyle = rgba(shade(col, 0.6), 0.85); g.lineWidth = Math.max(1.5, bw * 0.13);
      g.beginPath();
      const m = Math.floor(kBorder * n);
      for (let i = 0; i < m; i++) { const p = edge.pts[i]; const x = p.x - p.nx * bw * 1.05, y = p.y - p.ny * bw * 1.05; i ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke(); g.setLineDash([]);
    }
    g.restore();
    // aguja cosiendo el festón
    if (kBorder > 0 && kBorder < 1 && o.needle !== false) {
      const p = edge.pts[Math.min(n - 1, upto)];
      const a = Math.atan2(p.ny, p.nx) - 0.6 + Math.sin(t * 10) * 0.15;
      S.needle(g, p.x + p.nx * bw * 0.3, p.y + p.ny * bw * 0.3, a, bw * 4, bcol, [[p.x + Math.cos(a) * bw * 6, p.y + Math.sin(a) * bw * 6 + bw], [p.x + Math.cos(a) * bw * 8, p.y + Math.sin(a) * bw * 8 + bw * 3]]);
    }
  }
  function patch(g, cx, cy, text, o = {}) {
    if (!o.textColor) o = Object.assign({}, o, { textColor: S.lum(o.color || THREADS.mostaza) > 0.6 ? THREADS.granate : '#FFFFFF' });
    const k = o.k == null ? 1 : clamp(o.k), t = o.t || 0;
    if (k <= 0) return null;
    const G = patchGeom(text, o);
    const pop = E.outBack(seg(k, 0, 0.18));
    const kB = seg(k, 0.12, 0.6), kT = seg(k, 0.5, 1);
    g.save(); g.translate(cx, cy); if (o.rot) g.rotate(o.rot);
    const s = (o.scale == null ? 1 : o.scale) * (0.55 + 0.45 * pop);
    g.scale(s, s);
    if (k >= 1) {
      const key = 'patch|' + text + '|' + JSON.stringify([o.color, o.border, o.textColor, o.shadowColor, o.cell, o.pad, o.shape, o.w, o.h, o.radius, o.bold]);
      const P = Math.ceil(G.bw * 4);
      const c = cached(key, () => { const c = mk(G.w + P * 2, G.h + P * 2), gg = c.getContext('2d'); gg.translate(c.width / 2, c.height / 2); patchBody(gg, G, Object.assign({}, o, { needle: false }), 1, 0, 1); return c; });
      g.drawImage(c, -c.width / 2, -c.height / 2);
    } else patchBody(g, G, o, kT, t, kB);
    g.restore();
    return { w: G.w, h: G.h };
  }
  const patchSize = (text, o = {}) => { const G = patchGeom(text, o); return { w: G.w, h: G.h }; };

  // ================================================================== MERCERÍA
  /* scissors(g, x, y, o) — tijeras de bordar (hojas de acero, ojos dorados). (x,y) = eje/tornillo.
     o: { ang (rad, hacia donde apuntan las hojas), open (0..1), size (largo total, 260) } */
  function scissors(g, x, y, o = {}) {
    const L = o.size || 260, open = clamp(o.open == null ? 0.5 : o.open), a = open * 0.42;
    g.save(); g.translate(x, y); g.rotate(o.ang || 0);
    const bl = L * 0.55, hl = L * 0.45;
    // sombra
    g.save(); g.translate(L * 0.03, L * 0.06); g.globalAlpha *= 0.3; g.filter = `blur(${Math.round(L * 0.02)}px)`;
    drawHalf(g, -a, bl, hl, L, true); drawHalf(g, a, bl, hl, L, true); g.restore();
    drawHalf(g, a, bl, hl, L, false, 1);
    drawHalf(g, -a, bl, hl, L, false, -1);
    // tornillo
    g.fillStyle = brass(g, 0, -L * 0.03, 0, L * 0.03); g.beginPath(); g.arc(0, 0, L * 0.028, 0, PI * 2); g.fill();
    g.strokeStyle = 'rgba(80,50,10,.8)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-L * 0.018, 0); g.lineTo(L * 0.018, 0); g.stroke();
    g.restore();
  }
  function drawHalf(g, a, bl, hl, L, sh, side) {
    g.save(); g.rotate(a);
    const bw = L * 0.045;
    // hoja
    const sd = side || 1;
    g.beginPath(); g.moveTo(-L * 0.02, -bw * sd * 0.2); g.lineTo(bl * 0.9, -bw * 0.15 * sd); g.quadraticCurveTo(bl, 0, bl * 0.98, bw * 0.12 * sd);
    g.quadraticCurveTo(bl * 0.4, bw * 1.05 * sd, -L * 0.02, bw * 0.9 * sd); g.closePath();
    if (sh) { g.fillStyle = '#000'; g.fill(); }
    else {
      const gr = g.createLinearGradient(0, -bw, 0, bw); gr.addColorStop(0, '#FBFCFD'); gr.addColorStop(0.45, '#C9CED6'); gr.addColorStop(0.7, '#8B929C'); gr.addColorStop(1, '#5A616B');
      g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(40,45,55,.6)'; g.lineWidth = 1.2; g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(L * 0.02, -bw * 0.05 * sd); g.lineTo(bl * 0.85, -bw * 0.08 * sd); g.stroke();
    }
    // mango + ojo (aro dorado, lado opuesto al de la hoja)
    const ex = -hl * 0.72, ey = -sd * L * 0.075, er = L * 0.085;
    g.lineCap = 'round';
    g.strokeStyle = sh ? '#000' : brass(g, ex - er, ey - er, ex + er, ey + er); g.lineWidth = L * 0.03;
    g.beginPath(); g.moveTo(-L * 0.01, 0); g.quadraticCurveTo(-hl * 0.3, ey * 0.3, ex + er * 0.6, ey + er * 0.4 * sd); g.stroke();
    g.beginPath(); g.ellipse(ex, ey, er, er * 0.82, 0.3 * sd, 0, PI * 2); g.stroke();
    if (!sh) {
      g.strokeStyle = 'rgba(255,250,210,.8)'; g.lineWidth = L * 0.008;
      g.beginPath(); g.ellipse(ex, ey, er, er * 0.82, 0.3 * sd, PI * 1.05, PI * 1.6); g.stroke();
      // rizo decorativo (tijeras de abuela)
      g.strokeStyle = brass(g, ex - er, ey - er, ex + er, ey + er); g.lineWidth = L * 0.012;
      g.beginPath(); g.arc(ex - er * 1.05, ey + sd * er * 0.15, er * 0.28, 0, PI * 1.6); g.stroke();
    }
    g.restore();
  }
  /* snip(g, k, o) — unas tijeras entran, cortan un hilo y los dos cabos caen rizándose.
     o: { a:[x,y], b:[x,y] (extremos del hilo), at (0..1 punto de corte, 0.5), color, width, t, size, from:[x,y] (de dónde vienen las tijeras) }
     Fases: 0–0,45 entran abiertas · 0,45–0,55 ¡zas! · 0,55–1 cabos que caen y tijeras que se van. Corte en k=0,5. */
  function snip(g, k, o = {}) {
    k = clamp(k);
    const A = o.a, B = o.b, at = o.at == null ? 0.5 : o.at, t = o.t || 0;
    const col = o.color || THREADS.rojo, W = o.width || 8;
    const C = [lerp(A[0], B[0], at), lerp(A[1], B[1], at)];
    const ang = Math.atan2(B[1] - A[1], B[0] - A[0]);
    const D = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const cut = k >= 0.5, fall = E.outCubic(seg(k, 0.5, 1));
    const sag = o.sag == null ? D * 0.06 : o.sag;
    if (!cut) {
      // hilo tenso con una pequeña catenaria
      const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([lerp(A[0], B[0], u), lerp(A[1], B[1], u) + Math.sin(u * PI) * sag * (1 - seg(k, 0.35, 0.5) * 0.7)]); }
      S.drawThread(g, pts, { color: col, width: W });
    } else {
      // dos cabos: cada uno cae desde el corte hacia abajo y se riza
      for (const [P0, sd] of [[A, -1], [B, 1]]) {
        const pts = [];
        const len = Math.hypot(C[0] - P0[0], C[1] - P0[1]);
        for (let i = 0; i <= 12; i++) {
          const u = i / 12;
          const bx = lerp(P0[0], C[0], u), by = lerp(P0[1], C[1], u);
          const drop = fall * u * u * len * 0.55, rec = fall * u * u * len * 0.18;
          const curl = Math.sin(u * PI * 3 + t * 4) * u * fall * W * 2.2;
          pts.push([bx - sd * rec * Math.cos(ang) + curl, by + drop - sd * rec * Math.sin(ang)]);
        }
        S.drawThread(g, pts, { color: col, width: W });
      }
      // chispa de corte
      if (k < 0.62) {
        const q = seg(k, 0.5, 0.62);
        g.save(); g.strokeStyle = `rgba(255,255,255,${1 - q})`; g.lineWidth = 4; g.lineCap = 'round';
        for (let i = 0; i < 6; i++) { const a = i / 6 * PI * 2 + 0.3; g.beginPath(); g.moveTo(C[0] + Math.cos(a) * (14 + q * 30), C[1] + Math.sin(a) * (14 + q * 30)); g.lineTo(C[0] + Math.cos(a) * (26 + q * 50), C[1] + Math.sin(a) * (26 + q * 50)); g.stroke(); }
        g.restore();
      }
    }
    // tijeras: perpendiculares al hilo, el corte cae en 1/3 de la hoja
    const size = o.size || 260;
    const perp = ang + PI / 2;
    const from = o.from || [C[0] - Math.cos(perp) * 700, C[1] - Math.sin(perp) * 700];
    const inK = E.outCubic(seg(k, 0, 0.42)), outK = E.inCubic(seg(k, 0.68, 1));
    const reach = size * 0.33;
    const tx = C[0] - Math.cos(perp) * reach, ty = C[1] - Math.sin(perp) * reach;
    let sx = lerp(from[0], tx, inK), sy = lerp(from[1], ty, inK);
    sx = lerp(sx, from[0], outK); sy = lerp(sy, from[1], outK);
    const open = k < 0.45 ? 0.95 - Math.sin(k * 30) * 0.05 * (1 - inK) : k < 0.52 ? 0.95 * (1 - seg(k, 0.45, 0.52)) : 0.05 + 0.4 * seg(k, 0.6, 0.8);
    if (outK < 1) scissors(g, sx, sy, { ang: perp, open, size });
    return { cut, at: C };
  }
  // dedal (s = alto en px). o.metal: 'plata'|'oro'
  function thimble(g, x, y, s = 90, o = {}) {
    const gold = o.metal === 'oro';
    g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot);
    const w0 = s * 0.42, w1 = s * 0.34, h = s;
    g.save(); g.filter = `blur(${Math.round(s * 0.05)}px)`; g.fillStyle = 'rgba(40,20,5,.35)'; g.beginPath(); g.ellipse(s * 0.06, h * 0.52, w0 * 1.1, s * 0.12, 0, 0, PI * 2); g.fill(); g.restore();
    const gr = g.createLinearGradient(-w0, 0, w0, 0);
    if (gold) { gr.addColorStop(0, '#6B4D14'); gr.addColorStop(0.3, '#F6DB86'); gr.addColorStop(0.5, '#FFF4C8'); gr.addColorStop(0.75, '#C9A043'); gr.addColorStop(1, '#5A400F'); }
    else { gr.addColorStop(0, '#5A616B'); gr.addColorStop(0.3, '#E7EBF0'); gr.addColorStop(0.45, '#FFFFFF'); gr.addColorStop(0.75, '#9AA1AB'); gr.addColorStop(1, '#4A5059'); }
    const body = new Path2D();
    body.moveTo(-w0, h * 0.45); body.lineTo(-w1, -h * 0.3); body.quadraticCurveTo(-w1 * 0.95, -h * 0.5, 0, -h * 0.52); body.quadraticCurveTo(w1 * 0.95, -h * 0.5, w1, -h * 0.3); body.lineTo(w0, h * 0.45); body.closePath();
    g.fillStyle = gr; g.fill(body);
    g.save(); g.clip(body);
    // hoyuelos
    for (let j = 0; j < 9; j++) for (let i = -6; i <= 6; i++) {
      const yy = -h * 0.42 + j * h * 0.085, ww = lerp(w1, w0, (yy + h * 0.3) / (h * 0.75));
      const xx = i * s * 0.06 + (j % 2) * s * 0.03; if (Math.abs(xx) > ww * 0.92) continue;
      const sh = 1 - Math.abs(xx) / ww;
      g.fillStyle = `rgba(30,30,35,${0.25 * sh + 0.1})`; g.beginPath(); g.ellipse(xx, yy, s * 0.016 * (0.4 + sh * 0.6), s * 0.016, 0, 0, PI * 2); g.fill();
      g.fillStyle = `rgba(255,255,255,${0.35 * sh})`; g.beginPath(); g.ellipse(xx + s * 0.006, yy + s * 0.008, s * 0.008, s * 0.006, 0, 0, PI * 2); g.fill();
    }
    g.restore();
    // borde inferior grueso
    g.fillStyle = gr; g.beginPath(); g.roundRect(-w0 * 1.04, h * 0.33, w0 * 2.08, h * 0.15, s * 0.04); g.fill();
    g.strokeStyle = 'rgba(30,30,40,.35)'; g.lineWidth = 1; g.stroke();
    g.restore();
  }
  // acerico tomate con alfileres (s = diámetro)
  function pincushion(g, x, y, s = 160, o = {}) {
    g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot);
    const r = s / 2;
    g.save(); g.filter = `blur(${Math.round(s * 0.04)}px)`; g.fillStyle = 'rgba(40,20,5,.35)'; g.beginPath(); g.ellipse(s * 0.04, r * 0.75, r * 1.02, r * 0.28, 0, 0, PI * 2); g.fill(); g.restore();
    // tomate: cuerpo achatado + gajos marcados por el cordón
    const base = o.color || THREADS.rojo;
    const body = g.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.05, 0, 0, r * 1.05);
    body.addColorStop(0, shade(base, 0.45)); body.addColorStop(0.45, base); body.addColorStop(1, shade(base, -0.5));
    g.fillStyle = body; g.beginPath(); g.ellipse(0, 0, r, r * 0.74, 0, 0, PI * 2); g.fill();
    g.save(); g.beginPath(); g.ellipse(0, 0, r, r * 0.74, 0, 0, PI * 2); g.clip();
    for (let i = -3; i <= 3; i++) {
      const x0 = i * r * 0.3;
      const gr = g.createLinearGradient(x0 - r * 0.15, 0, x0 + r * 0.15, 0);
      gr.addColorStop(0, 'rgba(60,0,10,.28)'); gr.addColorStop(0.5, 'rgba(255,200,200,.12)'); gr.addColorStop(1, 'rgba(60,0,10,.28)');
      g.fillStyle = gr; g.beginPath(); g.ellipse(x0, 0, r * 0.15, r * 0.8, 0, 0, PI * 2); g.fill();
    }
    g.restore();
    g.strokeStyle = shade(base, -0.55); g.lineWidth = s * 0.012;
    for (let i = -2; i <= 2; i++) { const xe = i * r * 0.45; g.beginPath(); g.moveTo(0, -r * 0.72); g.quadraticCurveTo(xe * 1.25, -r * 0.2, xe * 0.95, r * 0.68 * Math.cos(i * 0.3)); g.stroke(); }
    // hojas
    g.fillStyle = THREADS.verde;
    for (let i = 0; i < 5; i++) { const a = -PI / 2 + (i - 2) * 0.55; g.save(); g.translate(0, -r * 0.75); g.rotate(a + PI / 2); g.beginPath(); g.ellipse(0, -r * 0.14, r * 0.07, r * 0.2, 0, 0, PI * 2); g.fill(); g.restore(); }
    g.fillStyle = shade(THREADS.verde, -0.3); g.fillRect(-r * 0.04, -r * 1.02, r * 0.08, r * 0.24);
    // alfileres
    const pins = o.pins || [[-0.45, -0.35, -0.5, THREADS.mostaza], [0.1, -0.55, 0.15, THREADS.azul], [0.5, -0.2, 0.6, '#FFFFFF'], [-0.1, -0.1, -0.15, THREADS.verde], [0.3, 0.2, 0.9, THREADS.rosa]];
    for (const [px, py, a, c] of pins) {
      const bx = px * r, by = py * r, L = r * 0.55, ex = bx + Math.sin(a) * L, ey = by - Math.cos(a) * L;
      g.strokeStyle = '#C9CED6'; g.lineWidth = s * 0.012; g.beginPath(); g.moveTo(bx, by); g.lineTo(ex, ey); g.stroke();
      const gr = g.createRadialGradient(ex - s * 0.012, ey - s * 0.012, 1, ex, ey, s * 0.045);
      gr.addColorStop(0, shade(c, 0.7)); gr.addColorStop(0.5, c); gr.addColorStop(1, shade(c, -0.4));
      g.fillStyle = gr; g.beginPath(); g.arc(ex, ey, s * 0.042, 0, PI * 2); g.fill();
    }
    g.restore();
  }
  // ovillo de lana/algodón (r = radio). o: { color, end: [[x,y],...] cabo suelto (mundo), seed, rot }
  function yarn(g, x, y, r = 90, o = {}) {
    const col = o.color || THREADS.rojo;
    const key = 'yarn|' + r + '|' + col + '|' + (o.seed || 1);
    const c = cached(key, () => {
      const P = Math.ceil(r * 1.3), c = mk(P * 2, P * 2), gg = c.getContext('2d'), rr = rng(o.seed || 1);
      gg.translate(P, P);
      gg.save(); gg.filter = `blur(${Math.round(r * 0.08)}px)`; gg.fillStyle = 'rgba(40,20,5,.4)'; gg.beginPath(); gg.ellipse(r * 0.1, r * 0.85, r * 0.95, r * 0.25, 0, 0, PI * 2); gg.fill(); gg.restore();
      const gr = gg.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
      gr.addColorStop(0, shade(col, 0.25)); gr.addColorStop(0.7, col); gr.addColorStop(1, shade(col, -0.5));
      gg.fillStyle = gr; gg.beginPath(); gg.arc(0, 0, r, 0, PI * 2); gg.fill();
      gg.save(); gg.beginPath(); gg.arc(0, 0, r, 0, PI * 2); gg.clip();
      // capas de hebras enrolladas en distintas direcciones
      for (let layer = 0; layer < 7; layer++) {
        const a = rr() * PI, off = (rr() - 0.5) * r * 0.6;
        gg.save(); gg.rotate(a);
        for (let i = -10; i <= 10; i++) {
          const yy = off + i * r * 0.085;
          if (Math.abs(yy) > r) continue;
          const xx = Math.sqrt(r * r - yy * yy);
          gg.strokeStyle = rgba(shade(col, -0.5), 0.35); gg.lineWidth = r * 0.05;
          gg.beginPath(); gg.moveTo(-xx, yy); gg.quadraticCurveTo(0, yy + r * 0.12, xx, yy); gg.stroke();
          gg.strokeStyle = rgba(shade(col, 0.4), 0.45); gg.lineWidth = r * 0.022;
          gg.beginPath(); gg.moveTo(-xx, yy - r * 0.01); gg.quadraticCurveTo(0, yy + r * 0.1, xx, yy - r * 0.01); gg.stroke();
        }
        gg.restore();
      }
      const sh = gg.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r * 1.02);
      sh.addColorStop(0, 'rgba(255,255,255,.18)'); sh.addColorStop(0.6, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(30,10,5,.45)');
      gg.fillStyle = sh; gg.fillRect(-r, -r, r * 2, r * 2);
      gg.restore();
      return c;
    });
    g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); g.drawImage(c, -c.width / 2, -c.height / 2); g.restore();
    if (o.end) S.drawThread(g, [[x + r * 0.6, y + r * 0.55]].concat(o.end), { color: col, width: Math.max(4, r * 0.07) });
  }
  // aguja enhebrada (atajo a Stitch.needle). tail: puntos del hilo desde el ojo.
  const needle = (g, x, y, ang, len, color, tail) => S.needle(g, x, y, ang, len, color, tail);

  // ================================================================== TELAS DE FONDO
  /* bg(kind, w, h, o) → canvas cacheado. kind: 'vichy' | 'floral' | 'pana' | 'aida' | 'lino'
     o: { color (principal), base (fondo), size (tamaño del cuadro/flor/canal), seed } */
  function bg(kind, w = 1080, h = 1920, o = {}) {
    const key = ['bg', kind, w, h, o.color, o.base, o.size, o.seed].join('|');
    return cached(key, () => {
      const c = mk(w, h), g = c.getContext('2d'), r = rng(o.seed || 5);
      if (kind === 'vichy') {
        const col = o.color || THREADS.rojo, base = o.base || '#FBF6EE', sz = o.size || 64;
        g.fillStyle = base; g.fillRect(0, 0, w, h);
        g.globalAlpha = 0.5; g.fillStyle = col;
        for (let x = 0; x < w; x += sz * 2) g.fillRect(x, 0, sz, h);
        for (let y = 0; y < h; y += sz * 2) g.fillRect(0, y, w, sz);
        g.globalAlpha = 1;
        // sarga: diagonales finas que delatan el tejido
        g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1;
        for (let d = -h; d < w; d += 5) { g.beginPath(); g.moveTo(d, 0); g.lineTo(d + h, h); g.stroke(); }
      } else if (kind === 'pana') {
        const col = o.color || THREADS.mostaza, sz = o.size || 18;
        g.fillStyle = col; g.fillRect(0, 0, w, h);
        for (let x = 0; x < w; x += sz) {
          const gr = g.createLinearGradient(x, 0, x + sz, 0);
          gr.addColorStop(0, shade(col, -0.38)); gr.addColorStop(0.18, shade(col, -0.1)); gr.addColorStop(0.45, shade(col, 0.2)); gr.addColorStop(0.75, col); gr.addColorStop(1, shade(col, -0.38));
          g.fillStyle = gr; g.fillRect(x, 0, sz, h);
        }
        // pelo de la pana (brillo irregular)
        for (let i = 0; i < w * h / 250; i++) { const x = r() * w, y = r() * h; g.fillStyle = r() < 0.5 ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)'; g.fillRect(x, y, 1.5, 3 + r() * 8); }
      } else if (kind === 'floral') {
        const base = o.base || THREADS.azul, sz = o.size || 120;
        g.fillStyle = base; g.fillRect(0, 0, w, h);
        const cols = o.colors || ['#FFFFFF', THREADS.rosa, THREADS.mostaza, '#F7E3C8'];
        for (let j = -1; j < h / sz + 1; j++) for (let i = -1; i < w / sz + 1; i++) {
          const cx = (i + (j % 2) * 0.5) * sz + (r() - 0.5) * sz * 0.3, cy = j * sz * 0.86 + (r() - 0.5) * sz * 0.3;
          const fr = sz * (0.16 + r() * 0.08), rot = r() * PI;
          // hojitas
          g.fillStyle = shade(THREADS.verde, 0.1);
          for (let l = 0; l < 2; l++) { g.save(); g.translate(cx, cy); g.rotate(rot + l * PI + 0.6); g.beginPath(); g.ellipse(fr * 1.5, 0, fr * 0.7, fr * 0.28, 0, 0, PI * 2); g.fill(); g.restore(); }
          const pc = cols[Math.floor(r() * cols.length)];
          g.fillStyle = pc;
          for (let p = 0; p < 5; p++) { const a = rot + p / 5 * PI * 2; g.beginPath(); g.arc(cx + Math.cos(a) * fr * 0.62, cy + Math.sin(a) * fr * 0.62, fr * 0.48, 0, PI * 2); g.fill(); }
          g.fillStyle = pc === THREADS.mostaza ? THREADS.granate : THREADS.mostaza; g.beginPath(); g.arc(cx, cy, fr * 0.3, 0, PI * 2); g.fill();
          // puntitos
          g.fillStyle = 'rgba(255,255,255,.6)'; g.beginPath(); g.arc(cx + sz * 0.42, cy + sz * 0.3, sz * 0.025, 0, PI * 2); g.fill();
        }
      } else {
        g.drawImage(S.fabric({ w, h, cell: o.size || 20, color: o.color || 'crema', kind: kind === 'lino' ? 'lino' : 'aida', seed: o.seed || 7 }), 0, 0);
        return c;
      }
      // trama de tela encima de todo (overlay)
      const weave = S.fabric({ w, h, cell: 6, color: '#8a8a8a', kind: 'lino', seed: 3 });
      g.globalCompositeOperation = 'overlay'; g.globalAlpha = 0.45; g.drawImage(weave, 0, 0);
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      // viñeta suave
      const vg = g.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(30,10,0,.28)');
      g.fillStyle = vg; g.fillRect(0, 0, w, h);
      return c;
    });
  }
  function drawBg(g, kind, x = 0, y = 0, w = 1080, h = 1920, o = {}) { g.drawImage(bg(kind, w, h, o), x, y); }

  // ================================================================== LOGO y TARJETA FINAL
  /* logo(g, cx, cy, size, o) — LOGO «ya lo decía la abuela»: la abuela en su bastidor + cinta bordada.
     size = diámetro aprox. del conjunto. o: { state (estado de la abuela), k (0..1 entrada), t, fabric } */
  function logo(g, cx, cy, size, o = {}) {
    const k = o.k == null ? 1 : clamp(o.k), t = o.t || 0;
    const R = Math.round(size * 0.4);
    const pop = E.outBack(seg(k, 0, 0.35));
    const st = Object.assign({ mouth: 'smile' }, o.state || {});
    if (k > 0) abuelaHoop(g, cx, cy - size * 0.04, R, st, { t, scale: 0.3 + 0.7 * pop, rot: (1 - pop) * -0.3, fabric: o.fabric || 'crema', skirt: o.skirt !== false });
    const cell = Math.max(4, Math.round(size / 92));
    patch(g, cx, cy + size * 0.33, 'ya lo decía\nla abuela', { k: seg(k, 0.25, 1), t, cell, pad: 1, color: o.ribbon || THREADS.rojo, border: o.ribbonBorder || '#FFFFFF', textColor: '#FFFFFF', shadowColor: THREADS.granate, rot: -0.04, radius: cell * 2.5 });
  }
  function logoCanvas(px = 1080, o = {}) {
    const c = mk(px, px), g = c.getContext('2d');
    drawBg(g, o.bg || 'vichy', 0, 0, px, px, { size: Math.round(px / 17) });
    logo(g, px / 2, px * 0.475, px * 0.9, Object.assign({ state: { mouth: 'smile', wink: true } }, o));
    return c;
  }
  /* endCard(g, k, o) — TARJETA FINAL vertical 1080x1920.
     o: { title ('QUIEN SE FUE\nA SEVILLA'), date ('16/10/2026'), bg ('vichy'), t, state (abuela), extra (línea pequeña) } */
  function endCard(g, k, o = {}) {
    const t = o.t || 0;
    drawBg(g, o.bg || 'vichy', 0, 0, 1080, 1920, o.bgOpt || {});
    // mercería decorativa
    yarn(g, 150, 1560, 120, { color: THREADS.rojo, rot: 0.3, end: [[300, 1650], [520, 1600], [700, 1700]] });
    pincushion(g, 890, 1580, 200, {});
    thimble(g, 820, 210, 110, { rot: 0.25 });
    logo(g, 540, 640, 860, { k: seg(k, 0, 0.55), t, state: o.state });
    const title = o.title || 'QUIEN SE FUE\nA SEVILLA';
    patch(g, 540, 1180, title, { k: seg(k, 0.35, 0.9), t, cell: 12, color: '#FBF6EE', border: THREADS.marino, textColor: THREADS.rojo, shadowColor: THREADS.granate, rot: 0.03 });
    const date = o.date || '16/10/2026';
    patch(g, 540, 1355, date, { k: seg(k, 0.55, 1), t, cell: 6, pad: 1, color: THREADS.marino, border: THREADS.mostaza, textColor: '#FFFFFF', shadowColor: null, rot: -0.02 });
  }

  window.Marco = { hoop, hoopRing, abuelaHoop, abuelaFit, patch, patchSize, scissors, snip, thimble, pincushion, yarn, needle, bg, drawBg, logo, logoCanvas, endCard, E };
})();
