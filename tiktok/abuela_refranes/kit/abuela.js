/* abuela.js — LA ABUELA REMEDIOS en punto de cruz (busto 48x56 celdas).
   Requiere stitch.js. Global: window.Abuela
   Estado: { wink:bool (guiño, ojo derecho), mouth:'closed'|'half'|'open'|'smile'|'laugh'|'o', chain:bool, blink:bool, brows:'normal'|'up'|'skeptic',
             glassesDown:bool, hand:null|'finger'|'thread', look:-1|0|1 } */
(function () {
  'use strict';
  const W = 48, H = 56;
  const PAL = {
    k: '#1E1A18', w: '#FFFFFF',
    s: '#F4CBA9', S: '#E2A583', T: '#C67E60', p: '#F2A1B5', P: '#E47D98',
    h: '#D3D6DA', g: '#A9AEB4', G: '#7C8288', q: '#5E6268', i: '#D9DCE0', j: '#AEB3B9', J: '#80868C',
    r: '#7A1F2B', R: '#93303C', D: '#561520',
    c: '#FFFFFF', C: '#EDE8DF',
    y: '#E0A526', Y: '#A8761A', b: '#6B4A2F', e: '#F6F1E8', E: '#CBC1B1',
    m: '#C8102E', M: '#4A1018', L: '#E03A3E', n: '#22356B',
  };
  // grupos para el contorno en pespunte (null = sin contorno)
  const GROUPS = { h: 'hair', g: 'hair', G: 'hair', i: 'bun', j: 'bun', J: 'bun', s: 'skin', S: 'skin', T: 'skin', p: 'skin', P: 'skin',
    r: 'card', R: 'card', D: 'card', c: 'lace', C: 'lace', e: 'pearl', E: 'pearl',
    k: null, w: null, q: null, y: null, Y: null, b: null, m: null, M: null, L: null, n: null };

  function grid() {
    const m = Array.from({ length: H }, () => new Array(W).fill('.'));
    const api = {
      m,
      px(x, y, ch) { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H && ch) m[y][x] = ch; },
      get(x, y) { return x >= 0 && y >= 0 && x < W && y < H ? m[y][x] : '.'; },
      // elipse: f(x,y,nx,ny) decide el carácter (nx,ny normalizados -1..1)
      ell(cx, cy, rx, ry, f) {
        for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++)
          for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
            const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
            if (nx * nx + ny * ny <= 1) { const ch = typeof f === 'function' ? f(x, y, nx, ny) : f; api.px(x, y, ch); }
          }
      },
      ring(cx, cy, R, ch, wdt = 0.55) {
        for (let y = Math.floor(cy - R - 2); y <= cy + R + 2; y++) for (let x = Math.floor(cx - R - 2); x <= cx + R + 2; x++) {
          const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (Math.abs(d - R) < wdt) api.px(x, y, ch);
        }
      },
      stamp(x0, y0, rows) { rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== ' ' && ch !== '_') api.px(x0 + x, y0 + y, ch === '.' ? '.' : ch); })); },
      line(x0, y0, x1, y1, wdt, f) {
        const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3);
        for (let i = 0; i <= n; i++) { const t = i / n; api.ell(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, wdt / 2, wdt / 2, f); }
      },
    };
    return api;
  }

  function build(st = {}) {
    const g = grid();
    const CX = 24; // eje de simetría (entre columnas 23 y 24)
    const gd = !!st.glassesDown;
    // ---------------- pelo (masa trasera)
    const hairCh = (x, y, nx, ny) => {
      const a = Math.atan2(y + 0.5 - 4, x + 0.5 - CX), d = Math.hypot(x + 0.5 - CX, y + 0.5 - 4);
      const band = Math.floor(a * 7 + d * 0.32 + (x < CX ? 0.5 : 0));
      if (nx * nx + ny * ny > 0.78 && (ny > 0.15 || Math.abs(nx) > 0.82)) return 'G';
      if (band % 3 === 0) return 'h';
      if (ny < -0.55 && nx < 0.1 && band % 3 === 1) return 'h';
      return 'g';
    };
    // moño (grupo propio 'bun' para que el pespunte lo separe del pelo)
    g.ell(CX, 6.2, 6.4, 5.4, (x, y, nx, ny) => {
      const a = Math.atan2(ny, nx), r = Math.hypot(nx, ny);
      if (r > 0.8 && (ny > -0.2 || nx > 0.45)) return 'J';
      const sp = ((a / (Math.PI * 2) + r * 1.2) % 1 + 1) % 1; return sp < 0.3 ? 'i' : 'j';
    });
    g.ell(CX, 21, 13.8, 11.8, (x, y, nx, ny) => (y > 25 - Math.max(0, Math.abs(nx) - 0.9) * 10 && y > 24 ? null : hairCh(x, y, nx, ny)));
    // horquilla y florecita en el moño (detalle de encanto)
    g.stamp(28, 3, [' p ', 'pyp', ' p ']);
    // cuello (antes de la cara)
    for (let y = 31; y <= 38; y++) for (let x = 20; x <= 27; x++) g.px(x, y, y < 35 ? 'S' : 's');
    // orejas
    for (const [ex, sd] of [[11, -1], [36, 1]]) {
      g.ell(ex + 0.5, 23.5, 1.7, 2.6, (x, y) => (x === ex + (sd < 0 ? 0 : 0) ? 's' : 'S'));
      g.px(ex, 23, 'S'); g.px(ex + (sd < 0 ? 1 : 0), 24, 'T');
    }
    // pendientes de perla
    for (const ex of [11, 36]) { g.stamp(ex - 0.5 + (ex < 24 ? 0 : 0), 26, ['we', 'eE']); }
    // ---------------- cara
    for (let y = 10; y <= 36; y++) for (let x = 11; x <= 36; x++) {
      const nx = (x + 0.5 - CX) / 11.2, ny = (y + 0.5 - 23.4) / 11.4;
      const e = ny < 0 ? 2 : 2.7; // mandíbula redondeada (superelipse)
      const v = Math.pow(Math.abs(nx), e) + Math.pow(Math.abs(ny), e);
      if (v > 1) continue;
      g.px(x, y, (v > 0.8 && ny > 0.35) || Math.abs(nx) > 0.92 ? 'S' : 's');
    }
    // ---------------- pelo delantero (línea del pelo con raya y ondas)
    for (let x = 12; x <= 35; x++) {
      const u = (x + 0.5 - CX) / 11;
      const hl = 13.2 + 3.6 * u * u + (Math.abs(u) > 0.75 ? 3.5 * (Math.abs(u) - 0.75) * 6 : 0);
      for (let y = 6; y < hl; y++) {
        if (!'sS'.includes(g.get(x, y))) continue;
        const a = Math.atan2(y + 0.5 - 4, x + 0.5 - CX), d = Math.hypot(x + 0.5 - CX, y + 0.5 - 4);
        const band = Math.floor(a * 7 + d * 0.32 + (x < CX ? 0.5 : 0));
        g.px(x, y, y >= hl - 1 ? 'G' : band % 3 === 0 ? 'h' : 'g');
      }
    }
    // raya central
    for (let y = 8; y <= 13; y++) g.px(y < 11 ? 24 : 23, y, 'G');
    // ondas de los lados (sobre las sienes)
    g.stamp(12, 17, ['G', 'g', 'G']); g.stamp(35, 17, ['G', 'g', 'G']);
    // ---------------- cejas
    const browY = st.brows === 'up' ? 15 : 17;
    const bL = st.brows === 'skeptic' ? 15 : browY, bR = st.brows === 'skeptic' ? 17 : browY;
    // izquierda (arqueada)
    [[16, 1], [17, 0], [18, 0], [19, 0], [20, 0], [21, 1]].forEach(([x, dy]) => g.px(x, bL + dy, 'q'));
    [[26, 1], [27, 0], [28, 0], [29, 0], [30, 0], [31, 1]].forEach(([x, dy]) => g.px(x, bR + dy + (st.brows === 'skeptic' ? (x < 28 ? 0 : 0) : 0), 'q'));
    if (st.brows === 'skeptic') { g.px(26, 18, 'q'); }
    // ---------------- ojos
    const eyeY = gd ? 19 : 21 + (st.brows === 'up' ? -0.0 : 0);
    const look = st.look || 0;
    for (const ex of [18, 28]) {
      const x0 = ex + (look > 0 ? 1 : look < 0 ? -0 : 0) + (look < 0 ? -1 : 0) + 0;
      if (st.blink || (st.wink && ex > 24)) {
        // ojos cerrados felices (arco)
        g.px(x0 - 1, eyeY + 2, 'k'); g.px(x0, eyeY + 1, 'k'); g.px(x0 + 1, eyeY + 1, 'k'); g.px(x0 + 2, eyeY + 2, 'k');
      } else if (st.brows === 'up') {
        // sorpresa: ojos más grandes
        g.stamp(x0, eyeY - 1, ['kk', 'wk', 'kk', 'kk']);
      } else {
        g.stamp(x0, eyeY, ['wk', 'kk', 'kk']);
      }
      // pestañas exteriores (coquetería)
      if (!st.blink && !(st.wink && ex > 24)) { if (ex < 24) g.px(x0 - 1, eyeY, 'k'); else g.px(x0 + 2, eyeY, 'k'); }
    }
    // ---------------- nariz
    g.stamp(22, 24 + 0, ['_SS_', 'S__S', '_TT_']);
    g.px(23, 24, 's');
    // ---------------- mofletes
    for (const cx of [17, 30]) { g.stamp(cx - 2, 26, ['_ppp_', 'pPPPp', '_ppp_'].map(r => r.replace(/_/g, ' '))); }
    // patas de gallo
    g.px(12, 21, 'S'); g.px(12, 23, 'S'); g.px(35, 21, 'S'); g.px(35, 23, 'S');
    // arrugas de la sonrisa
    g.px(19, 29, 'S'); g.px(28, 29, 'S'); g.px(19, 30, 'S'); g.px(28, 30, 'S');
    // ---------------- boca
    const MY = 30;
    const mouth = st.mouth || 'closed';
    if (mouth === 'closed') {
      g.stamp(20, MY - 1, ['m______m', '_mmmmmm_'].map(r => r.replace(/_/g, ' ')));
      g.px(23, MY + 1, 'S'); g.px(24, MY + 1, 'S');
    } else if (mouth === 'smile') {
      g.stamp(20, MY - 1, ['m______m', 'mMMMMMMm', '_mwwwwm_', '__mLLm__'].map(r => r.replace(/_/g, ' ')));
      g.stamp(20, MY - 1, ['m______m', 'mmMMMMmm', '_mMMMMm_', '__mmmm__'].map(r => r.replace(/_/g, ' ')));
      g.stamp(21, MY, ['_wwww_'.replace(/_/g, ' ')]);
    } else if (mouth === 'half') {
      g.stamp(20, MY - 1, ['m______m', '_mMMMMm_', '__mLLm__'].map(r => r.replace(/_/g, ' ')));
    } else if (mouth === 'open') {
      g.stamp(20, MY - 1, ['_mmmmmm_', 'mwwwwwwm', 'mMMMMMMm', '_MMppMM_', '__mmmm__'].map(r => r.replace(/_/g, ' ')));
    } else if (mouth === 'o') {
      g.stamp(22, MY - 1, ['_mm_', 'mMMm', 'mMMm', '_mm_'].map(r => r.replace(/_/g, ' ')));
    } else if (mouth === 'laugh') {
      g.stamp(19, MY - 1, ['m________m', 'mmwwwwwwmm', '_mMMMMMMm_', '_mMMppMMm_', '__mmmmmm__'].map(r => r.replace(/_/g, ' ')));
    }
    // ---------------- rebeca de punto granate
    for (let y = 36; y < H; y++) {
      const k = Math.min(1, (y - 35) / 12);
      const hw = 9 + 15 * Math.sin(k * Math.PI / 2);
      for (let x = 0; x < W; x++) {
        const dx = x + 0.5 - CX; if (Math.abs(dx) > hw) continue;
        let ch = (x % 2 === 0) ? 'r' : 'R';
        if (Math.abs(dx) > hw - 1.2) ch = 'D';
        // costura de las mangas
        if (y > 44 && (x === 6 || x === 41)) ch = 'D';
        // tira de botones
        if (x === 22 || x === 25) ch = 'D'; else if (x === 23 || x === 24) ch = 'R';
        g.px(x, y, ch);
      }
    }
    // sombra bajo el cuello de puntilla
    for (let x = 14; x <= 33; x++) { if (g.get(x, 41) === 'r' || g.get(x, 41) === 'R') g.px(x, 41, 'D'); }
    // botones
    for (const by of [44, 49, 54]) g.stamp(23, by, ['yy', 'yY']);
    for (const by of [44, 49, 54]) g.px(23, by, 'w');
    // broche de florecita
    g.stamp(14, 44, [' p ', 'pyp', ' p ']); g.px(16, 46, 'n');
    // ---------------- cuello de puntilla blanco (Peter Pan festoneado)
    const lace = (x, y, nx, ny) => {
      const r = nx * nx + ny * ny;
      if (r > 0.62 && ny > 0) return (x % 2 === 0) ? 'c' : 'C';
      if ((x + 2 * y) % 5 === 0 && r < 0.45) return 'C';
      return 'c';
    };
    g.ell(19.0, 38.6, 6.2, 3.4, lace);
    g.ell(29.0, 38.6, 6.2, 3.4, lace);
    // festón (picos) bajo el cuello
    for (let x = 13; x <= 34; x += 2) { if (g.get(x, 41) !== '.' && Math.abs(x + 0.5 - 24) > 1.5) { const yy = 41 + (Math.abs(x - 19) < 5 || Math.abs(x - 29) < 5 ? 1 : 0); if (g.get(x, yy) !== 'c') g.px(x, yy, 'c'); } }
    // escote en V entre las solapas
    g.px(23, 36, 's'); g.px(24, 36, 's'); g.px(23, 37, 'S'); g.px(24, 37, 'S');
    // ---------------- gafas (después de la cara: montura marrón)
    const gy = gd ? 24.6 : 22.5;
    g.ring(19, gy, 3.75, 'b', 0.52);
    g.ring(29, gy, 3.75, 'b', 0.52);
    g.px(23, Math.floor(gy) - 1, 'b'); g.px(24, Math.floor(gy) - 1, 'b');
    // patillas hacia las orejas
    g.px(14, Math.floor(gy) - 1, 'b'); g.px(13, Math.floor(gy) - 1, 'b'); g.px(12, Math.floor(gy) - 1, 'b');
    g.px(33, Math.floor(gy) - 1, 'b'); g.px(34, Math.floor(gy) - 1, 'b'); g.px(35, Math.floor(gy) - 1, 'b');
    // brillo del cristal
    g.px(21, Math.floor(gy) - 2, 'w'); g.px(31, Math.floor(gy) - 2, 'w');
    if (!gd) { g.px(21, Math.floor(gy) - 1, 'w'); }
    // cadenita de las gafas (perlitas que cuelgan hasta el cuello)
    if (st.chain) {
      const cy0 = Math.floor(gy) + 1;
      [[15, cy0 + 2], [14, cy0 + 4], [14, cy0 + 6], [15, cy0 + 8]].forEach(([x, y], i) => { if (y < 36) g.px(x, y, i % 2 ? 'y' : 'e'); });
      [[33, cy0 + 2], [34, cy0 + 4], [34, cy0 + 6], [33, cy0 + 8]].forEach(([x, y], i) => { if (y < 36) g.px(x, y, i % 2 ? 'y' : 'e'); });
    }
    // ---------------- manos
    if (st.hand === 'finger' || st.hand === 'thread') {
      const thr = st.hand === 'thread';
      // manga levantada (punto de la rebeca) + puño de puntilla
      const wx = thr ? 41.5 : 40, wy = thr ? 27 : 31;
      g.line(45, 55, wx + 0.5, wy + 1.5, 6.6, (x, y) => ((x + y) % 2 ? 'r' : 'R'));
      g.line(46, 55, wx + 2.6, wy + 2.5, 1.1, 'D');
      for (let x = Math.round(wx) - 3; x <= Math.round(wx) + 3; x++) g.px(x, Math.round(wy), x % 2 ? 'c' : 'C');
      if (!thr) {
        // índice levantado («¡ojo!»), resto del puño cerrado y el pulgar por delante
        g.stamp(36, 16, [
          '___ps____',
          '___sS____',
          '___sS____',
          '___sS____',
          '___sS____',
          '___sS____',
          '___sS____',
          '_sSsSsSs_',
          'sssssssSs',
          'sTsssTsSs',
          'TTTTssssS',
          'sssTssssS',
          'SsssssssS',
          '_ssssssS_',
          '__sssSS__',
        ].map(r => r.replace(/_/g, ' ')));
      } else {
        // puño que sujeta el cabo del hilo (nudillos de frente, pulgar por encima)
        g.stamp(37, 16, [
          '__ssss___',
          '_sSSSss__',
          'sTTTTTsS_',
          'sssssssS_',
          'TTTTTTsSS',
          'sssssssSS',
          'TTTTTTsS_',
          'sssssssS_',
          '_TTTTTSS_',
          '__ssssS__',
        ].map(r => r.replace(/_/g, ' ')));
      }
    }
    return g.m.map(r => r.join(''));
  }

  const ROWS = new Map(), SPR = new Map();
  const keyOf = st => [st.mouth || 'closed', st.blink ? 1 : 0, st.brows || 'normal', st.glassesDown ? 1 : 0, st.hand || '-', st.look || 0, st.chain ? 1 : 0, st.wink ? 1 : 0].join('|');
  function rows(st = {}) { const k = keyOf(st); if (!ROWS.has(k)) ROWS.set(k, build(st)); return ROWS.get(k); }
  function sprite(st = {}, cell = 18) {
    const k = keyOf(st) + '@' + cell;
    if (!SPR.has(k)) SPR.set(k, new Stitch.Sprite(rows(st), PAL, { cell, seed: 1946, outline: 'all', groups: GROUPS, outlineColor: '#3B2A22', tails: 3 }));
    return SPR.get(k);
  }
  /* draw(ctx, x, y, state, o) — o: {cell=18, scale, rot, anchor, alpha} (como Sprite.draw)
     Si o.stitchIn (0..1) o o.unravel (0..1) se pasan, anima la abuela entera. */
  function draw(g, x, y, st = {}, o = {}) {
    const sp = sprite(st, o.cell || 18);
    if (o.stitchIn != null && o.stitchIn < 1) return sp.stitchIn(g, x, y, o.stitchIn, Object.assign({ order: { type: 'radial', from: [24, 22] } }, o));
    if (o.unravel != null && o.unravel > 0) return sp.unravel(g, x, y, o.unravel, o);
    sp.draw(g, x, y, o);
    return sp;
  }
  // punto (en mundo) donde la mano pellizca el hilo (estado hand:'thread')
  function grip(x, y, o = {}) {
    const cell = o.cell || 18;
    const sp = sprite({ hand: 'thread' }, cell);
    return sp.toWorld(40.5 * cell, 16.6 * cell, x, y, o);
  }
  // ---- ayudas de animación deterministas
  // boca hablando: alterna closed/half/open con ritmo de sílabas (t en s). level 0..1 = intensidad.
  function talk(t, seed = 3, level = 1) {
    if (level <= 0) return 'closed';
    const syl = 7.5; // sílabas por segundo aprox.
    const i = Math.floor(t * syl), f = t * syl - i;
    const r = Stitch.hash(i, 7, seed);
    if (r < 0.14) return 'closed';
    const peak = f > 0.2 && f < 0.75;
    if (!peak) return 'half';
    return r * level > 0.55 ? 'open' : 'half';
  }
  // parpadeo: true durante ~0,12 s cada ~3 s (sembrado)
  function blink(t, seed = 5) {
    const per = 2.9, i = Math.floor(t / per), off = 0.4 + Stitch.hash(i, 1, seed) * (per - 0.8);
    const f = t - i * per - off; return f >= 0 && f < 0.13;
  }

  /* lipsync(t, words=window.WORDS): boca según las palabras de la locución.
     Dentro de una palabra alterna 'open'/'half' (≈8 golpes por segundo, empieza abierta);
     palabras muy cortas → 'half'; fuera de palabra → 'closed' (o 'smile' si opt.rest='smile'). */
  function lipsync(t, words, opt = {}) {
    const Wd = words || window.WORDS || [];
    let lo = 0, hi = Wd.length - 1, i = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (Wd[m].s <= t) { i = m; lo = m + 1; } else hi = m - 1; }
    const wd = i >= 0 ? Wd[i] : null;
    if (!wd || t > wd.e + 0.02) return opt.rest || 'closed';
    const d = wd.e - wd.s;
    if (d < 0.12) return 'half';
    const beat = Math.floor((t - wd.s) * (opt.rate || 8));
    if (t > wd.e - 0.05) return 'half';
    return (beat + i) % 2 === 0 ? 'open' : 'half';
  }
  window.Abuela = { W, H, PAL, GROUPS, rows, build, sprite, draw, grip, talk, blink, lipsync };
})();
