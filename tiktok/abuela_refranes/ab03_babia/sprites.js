/* sprites.js — sprites en punto de cruz propios del episodio «Estar en Babia» (usa la API del kit, no lo modifica). */
(function () {
  const S = Stitch, T = S.THREADS, sh = S.shade;
  // glifos extra para la fuente bordada (solo en memoria de esta página)
  S.FONT['º'] = { rows: ['.##.', '#..#', '.##.', '....', '####', '....', '....'], top: null };
  S.FONT['→'] = { rows: ['......', '...#..', '....#.', '######', '....#.', '...#..', '......'], top: null };

  const PAL = {
    r: T.rojo, o: T.rojo2, R: T.granate, D: '#561520', n: T.marino, a: T.azul, c: sh(T.azul, 0.55),
    v: T.verde, V: sh(T.verde, 0.38), u: sh(T.verde, -0.32), m: T.mostaza, y: '#A8761A', p: T.rosa, P: '#E47D98',
    g: T.gris, h: '#D3D6DA', G: '#7C8288', b: T.marron, B: sh(T.marron, 0.32), k: T.negro, w: T.blanco, e: '#EDE8DF',
    s: '#F4CBA9', S: '#E2A583', T: '#C67E60',
  };

  function Grid(W, H) {
    const m = Array.from({ length: H }, () => new Array(W).fill('.'));
    const A = {
      W, H, m,
      px(x, y, c) { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < W && y < H && c) m[y][x] = typeof c === 'function' ? c(x, y) : c; },
      get(x, y) { return x >= 0 && y >= 0 && x < W && y < H ? m[y][x] : '.'; },
      rect(x, y, w, h, c) { for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) A.px(xx, yy, c); },
      ell(cx, cy, rx, ry, c) {
        for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++)
          for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
            const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
            if (nx * nx + ny * ny <= 1) A.px(x, y, typeof c === 'function' ? c(x, y, nx, ny) : c);
          }
      },
      poly(pts, c) {
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        pts.forEach(p => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
        for (let y = Math.floor(y0); y <= Math.ceil(y1); y++) for (let x = Math.floor(x0); x <= Math.ceil(x1); x++) {
          const px = x + 0.5, py = y + 0.5; let ins = false;
          for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const [xi, yi] = pts[i], [xj, yj] = pts[j];
            if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) ins = !ins;
          }
          if (ins) A.px(x, y, typeof c === 'function' ? c(x, y) : c);
        }
      },
      line(x0, y0, x1, y1, wd, c) {
        const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 3) || 1;
        for (let i = 0; i <= n; i++) {
          const t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
          if (wd <= 1) A.px(Math.floor(x), Math.floor(y), c); else A.ell(x, y, wd / 2, wd / 2, c);
        }
      },
      text(x, y, str, c, o = {}) {
        const tr = S.textRows(str, Object.assign({ ch: '#' }, o));
        tr.rows.forEach((r, yy) => [...r].forEach((ch, xx) => { if (ch === '#') A.px(x + xx, y + yy, c); }));
        return tr;
      },
      stamp(x0, y0, rows) { rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== ' ' && ch !== '.') A.px(x0 + x, y0 + y, ch); })); },
      replace(a, b) { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (m[y][x] === a) m[y][x] = b; },
      rows() { return m.map(r => r.join('')); },
      sprite(o = {}) { return new S.Sprite(A.rows(), PAL, Object.assign({ outline: 'outer', outlineColor: '#3B2A22', tails: 1, legW: 0.46 }, o)); },
    };
    return A;
  }

  // ---------------------------------------------------------------- PERSONAJES
  // o: { tunic, tunic2, hair, crown, beard, cape, hat, eyes:'open'|'closed'|'wide'|'happy', mouth:'smile'|'o'|'flat'|'grin', brows, collar, bald, mustache, tie, arm:'up'|'point'|null, noHead }
  function person(o = {}) {
    const W = 34, H = 58, G = Grid(W, H), cx = 17, hy = 17;
    const tun = o.tunic || 'a';
    // capa (detrás)
    if (o.cape) { G.poly([[4, 28], [30, 28], [34, 58], [0, 58]], o.cape); }
    // brazos
    const arm = (x0, y0, x1, y1, side) => { G.line(x0, y0, x1, y1, 4.2, o.sleeve || tun); G.ell(x1, y1 + 1, 2.2, 2.2, 's'); };
    if (o.arm === 'up') arm(27, 31, 31, 18, 1); else if (o.arm === 'point') arm(27, 31, 33, 30, 1); else if (o.arm !== 'none') arm(27, 31, 30, 45, 1);
    if (o.armL === 'up') arm(7, 31, 3, 18, 0); else if (o.armL !== 'none') arm(7, 31, 4, 45, 0);
    // cuerpo
    G.ell(cx, 31, 11, 4.5, tun);
    G.poly([[6, 30], [28, 30], [30, 58], [4, 58]], tun);
    if (o.tunic2) G.poly([[13, 31], [21, 31], [23, 58], [11, 58]], o.tunic2);
    if (o.tie) { G.poly([[14, 27], [20, 27], [17, 33]], 'w'); G.poly([[16, 29], [18, 29], [18.6, 42], [17, 44], [15.4, 42]], 'r'); }
    if (o.belt !== false && !o.tie) { G.rect(5, 44, 24, 2, 'b'); G.rect(15, 44, 4, 2, 'm'); }
    if (o.buttons) [34, 38].forEach(y => G.px(17, y, 'm'));
    if (o.cape) { // armiño
      G.ell(cx, 28, 12, 3.2, 'w');
      [[8, 28], [13, 29], [21, 29], [26, 28], [17, 27]].forEach(p => G.px(p[0], p[1], 'k'));
    }
    if (o.collar) G.ell(cx, 27.5, 7.5, 2.2, 'w');
    if (o.noHead) return G;
    // cuello y cabeza
    G.rect(14, 23, 6, 3, 'S');
    G.ell(8.6, hy + 1, 1.5, 2.2, 'S'); G.ell(25.4, hy + 1, 1.5, 2.2, 'S');
    G.ell(cx, hy, 8, 8.6, 's');
    // pelo
    if (o.hair && !o.bald) {
      G.ell(cx, hy - 5, 8.4, 4.6, (x, y) => (y <= hy - 4 ? o.hair : G.get(x, y)));
      G.rect(8, hy - 5, 2, 6, o.hair); G.rect(24, hy - 5, 2, 6, o.hair);
    }
    if (o.bald) { G.rect(8, hy - 2, 2, 5, o.hair || 'h'); G.rect(24, hy - 2, 2, 5, o.hair || 'h'); }
    if (o.beard) { G.ell(cx, hy + 4.5, 8.2, 5.6, (x, y) => (y >= hy + 2 ? o.beard : G.get(x, y))); G.rect(13, hy + 4, 8, 1, 's'); }
    // ojos
    const ex = [13, 21], ey = hy;
    if (o.eyes === 'closed') ex.forEach(x => { G.px(x - 1, ey + 1, 'k'); G.px(x, ey + 1, 'k'); G.px(x + 1, ey + 1, 'k'); });
    else if (o.eyes === 'happy') ex.forEach(x => { G.px(x - 1, ey + 1, 'k'); G.px(x, ey, 'k'); G.px(x + 1, ey + 1, 'k'); });
    else if (o.eyes === 'wide') ex.forEach(x => { G.rect(x - 1, ey - 1, 2, 3, 'k'); G.px(x - 1, ey - 1, 'w'); });
    else ex.forEach(x => { G.px(x, ey, 'k'); G.px(x, ey + 1, 'k'); });
    // cejas
    const by = o.brows === 'up' ? ey - 4 : ey - 2;
    if (o.brows !== 'none') ex.forEach((x, i) => { G.px(x - 1, by + (o.brows === 'worried' ? (i ? -1 : 0) * -1 : 0), o.browC || 'b'); G.px(x, by, o.browC || 'b'); G.px(x + 1, by + (o.brows === 'worried' ? (i ? 0 : 1) : 0), o.browC || 'b'); });
    // nariz, mofletes
    G.px(cx, hy + 2, 'S'); G.px(cx, hy + 3, 'S');
    G.px(10, hy + 3, 'P'); G.px(24, hy + 3, 'P');
    // bigote
    if (o.mustache) { G.rect(13, hy + 4, 3, 1, o.mustache); G.rect(18, hy + 4, 3, 1, o.mustache); G.px(16, hy + 4, o.mustache); G.px(17, hy + 4, o.mustache); G.px(12, hy + 5, o.mustache); G.px(21, hy + 5, o.mustache); }
    // boca
    const my = hy + 5;
    if (o.mouth === 'o') { G.ell(cx, my + 1, 1.6, 1.7, 'D'); }
    else if (o.mouth === 'flat') { G.rect(15, my + 1, 4, 1, 'R'); }
    else if (o.mouth === 'grin') { G.rect(14, my, 6, 1, 'R'); G.rect(15, my + 1, 4, 1, 'D'); G.px(15, my, 'w'); G.px(18, my, 'w'); }
    else { G.px(14, my, 'R'); G.rect(15, my + 1, 4, 1, 'R'); G.px(19, my, 'R'); }
    // corona
    if (o.crown) {
      G.rect(10, hy - 9, 14, 3, 'm');
      [[10, 3], [15.5, 4], [21, 3]].forEach(([x, hgt], i) => G.poly([[x - 0.2, hy - 9], [x + (i === 1 ? 3 : 3.2), hy - 9], [x + (i === 1 ? 1.5 : 1.6), hy - 9 - hgt]], 'm'));
      G.px(12, hy - 8, 'r'); G.px(17, hy - 8, 'n'); G.px(22, hy - 8, 'r'); G.rect(10, hy - 7, 14, 1, 'y');
    }
    // sombrero con pluma (cortesano)
    if (o.hat) {
      G.ell(cx - 1, hy - 7, 10, 3.6, o.hat); G.rect(8, hy - 6, 18, 2, o.hat); G.rect(8, hy - 5, 18, 1, 'm');
      G.line(22, hy - 9, 32, hy - 15, 2, 'w'); G.line(23, hy - 10, 31, hy - 15, 1, 'p');
    }
    return G;
  }

  // ---------------------------------------------------------------- OBJETOS
  function pin() {
    const G = Grid(14, 28);
    G.line(7, 12, 7, 27, 1.6, 'G');
    G.ell(7, 7, 6.2, 6.2, 'r'); G.ell(8, 8.2, 4.8, 4.8, (x, y, nx, ny) => (nx + ny > 0.9 ? 'R' : G.get(x, y)));
    G.rect(4, 3, 2, 2, 'w'); G.px(6, 3, 'o'); G.px(4, 5, 'o');
    return G.sprite({ cell: 14, seed: 3 });
  }
  function roadSign() {
    const G = Grid(46, 30);
    G.rect(5, 12, 3, 18, 'b'); G.rect(5, 12, 1, 18, 'B');
    G.poly([[0, 0], [38, 0], [45, 6.5], [38, 13], [0, 13]], 'w');
    G.poly([[1, 1], [37.5, 1], [43.6, 6.5], [37.5, 12], [1, 12]], 'a');
    G.text(3, 3, 'BABIA', 'w');
    G.stamp(34, 2, ['..w...', '..ww..', 'wwwww.', 'wwwwww', 'wwwww.', '..ww..', '..w...']);
    return G.sprite({ cell: 18, seed: 5 });
  }
  function crown() {
    const G = Grid(34, 24);
    G.rect(2, 13, 30, 9, 'm'); G.rect(2, 20, 30, 2, 'y'); G.rect(2, 13, 30, 1, 'y');
    [[2, 8], [10, 10], [17, 12], [24, 10], [32, 8]].forEach(([x, h]) => G.poly([[x - 3.2, 13.5], [x + 3.2, 13.5], [x, 13.5 - h]], 'm'));
    [[2, 8], [10, 10], [17, 12], [24, 10], [32, 8]].forEach(([x, h]) => G.ell(x, 13.5 - h, 1.3, 1.3, 'w'));
    G.ell(9, 17, 1.7, 1.9, 'r'); G.ell(17, 17, 2.1, 2.3, 'n'); G.ell(25, 17, 1.7, 1.9, 'r');
    G.px(16, 16, 'c'); G.px(8, 16, 'p'); G.px(24, 16, 'p');
    return G.sprite({ cell: 14, seed: 9 });
  }
  function hammock() {
    const W = 66, H = 40, G = Grid(W, H);
    const tree = (x) => { G.rect(x - 2, 14, 4, 26, 'b'); G.rect(x - 2, 14, 1, 26, 'B'); G.ell(x, 9, 8, 7, 'v'); G.ell(x - 3, 6, 4.5, 3.5, 'V'); G.ell(x + 3, 12, 5, 3.2, 'u'); };
    tree(6); tree(59);
    const yc = x => 17 + 9 * Math.sin(Math.PI * (x - 9) / 47);
    G.line(8, 15, 14, yc(14), 1, 'B'); G.line(57, 15, 51, yc(51), 1, 'B');
    for (let x = 14; x <= 51; x++) { const y = yc(x); for (let d = -1; d <= 1; d++) G.px(x, y + d, Math.floor((x - 14) / 3) % 2 ? 'w' : 'r'); }
    // rey tumbado
    G.ell(33, yc(33) - 4.5, 13, 3.6, 'r'); G.ell(33, yc(33) - 3.2, 12, 1.4, 'R');
    G.ell(26, yc(26) - 7.8, 6, 1.8, 'w'); [[22, yc(22) - 8], [26, yc(26) - 9], [30, yc(30) - 8]].forEach(p => G.px(p[0], p[1], 'k'));
    G.ell(47, yc(47) - 4, 2, 2.3, 'k'); G.ell(45, yc(45) - 5, 1.8, 2, 'k');
    // cabeza
    const hx = 18, hy = yc(18) - 8;
    G.ell(hx, hy, 4.6, 4.6, 's'); G.ell(hx + 0.5, hy + 3, 4.4, 2.6, (x, y) => (y >= hy + 1.5 ? 'b' : G.get(x, y)));
    G.px(hx - 2, hy, 'k'); G.px(hx - 1, hy, 'k'); G.px(hx + 2, hy, 'k'); G.px(hx + 3, hy, 'k');
    G.px(hx - 3, hy + 2, 'P'); G.px(hx + 4, hy + 2, 'P'); G.rect(hx - 1, hy + 3, 3, 1, 'R');
    G.poly([[hx - 7, hy - 3], [hx - 2, hy - 7], [hx - 1, hy - 3]], 'm'); G.poly([[hx - 6, hy - 4], [hx - 7, hy - 9], [hx - 4, hy - 6]], 'm'); G.poly([[hx - 3, hy - 6], [hx - 1, hy - 11], [hx, hy - 6]], 'm');
    G.px(hx - 4, hy - 4, 'r');
    return G.sprite({ cell: 13, seed: 11 });
  }
  function shield() {
    const G = Grid(22, 26);
    G.poly([[0, 0], [22, 0], [22, 14], [11, 26], [0, 14]], 'm');
    G.poly([[1.5, 1.5], [20.5, 1.5], [20.5, 13.6], [11, 24], [1.5, 13.6]], 'w');
    G.stamp(4, 3, [
      '..m.m.......',
      '..mmm.......',
      '..RRR.......',
      '.RRRRR......',
      'RRkRRR......',
      '.RRRRRR..R..',
      '..RRRRRR.R..',
      '...RRRRRRR..',
      '...RRRRRR...',
      '..RR.RRRR...',
      '.RR..RR.RR..',
      '.R..RR...RR.',
      '...RR.....R.',
      '..RR........',
    ]);
    return G.sprite({ cell: 12, seed: 13 });
  }
  function deer() {
    const G = Grid(36, 32), dy = 6;
    G.line(28, dy + 1, 25, dy - 5, 1, 'y'); G.line(26, dy - 2, 23, dy - 4, 1, 'y'); G.line(30, dy + 1, 32, dy - 5, 1, 'y'); G.line(31, dy - 2, 34, dy - 3, 1, 'y');
    G.line(10, dy + 13, 4, dy + 22, 2, 'b'); G.line(12, dy + 13, 9, dy + 23, 2, 'b');
    G.line(22, dy + 13, 28, dy + 21, 2, 'b'); G.line(20, dy + 13, 24, dy + 23, 2, 'b');
    [[4, dy + 22], [9, dy + 23], [28, dy + 21], [24, dy + 23]].forEach(p => G.px(p[0], p[1], 'k'));
    G.ell(16, dy + 10, 10, 4.6, 'b'); G.ell(16, dy + 12, 8, 2, 'B');
    G.poly([[21, dy + 8], [26, dy + 1], [30, dy + 3], [25, dy + 12]], 'b');
    G.ell(29, dy + 3, 3.4, 2.2, 'b'); G.px(32, dy + 3, 'k'); G.px(29, dy + 2, 'k');
    G.px(27, dy, 'b'); G.px(26, dy - 1, 'b');
    G.ell(6, dy + 7, 1.5, 1.3, 'w');
    [[12, dy + 9], [16, dy + 8], [19, dy + 10]].forEach(p => G.px(p[0], p[1], 'B'));
    return G.sprite({ cell: 13, seed: 17 });
  }
  function dog() {
    const G = Grid(26, 18);
    G.line(5, 9, 1, 4, 1.5, 'w');
    G.line(8, 11, 4, 16, 1.8, 'w'); G.line(10, 11, 9, 17, 1.8, 'w'); G.line(16, 11, 20, 16, 1.8, 'w'); G.line(15, 11, 15, 17, 1.8, 'w');
    G.ell(11, 9, 7, 3.4, 'w'); G.ell(9, 8, 2.6, 2, 'b');
    G.ell(19, 5, 3.6, 3, 'w'); G.ell(22.4, 6, 1.8, 1.4, 'w'); G.px(24, 5, 'k'); G.px(20, 4, 'k');
    G.line(17, 3, 16, 7, 1.6, 'b');
    G.px(22, 7, 'r');
    return G.sprite({ cell: 13, seed: 19 });
  }
  function castle() {
    const G = Grid(32, 34), d = 6;
    G.rect(4, d + 12, 24, 16, 'g'); for (let x = 4; x < 28; x += 3) G.rect(x, d + 10, 2, 2, 'g');
    G.rect(0, d + 6, 8, 22, 'h'); G.rect(24, d + 6, 8, 22, 'h');
    G.poly([[-0.5, d + 6], [8.5, d + 6], [4, d - 3]], 'r'); G.poly([[23.5, d + 6], [32.5, d + 6], [28, d - 3]], 'r');
    G.line(4, d - 3, 4, d - 6, 1, 'k'); G.rect(5, d - 6, 3, 2, 'm');
    G.line(28, d - 3, 28, d - 6, 1, 'k'); G.rect(29, d - 6, 3, 2, 'm');
    G.ell(16, d + 24, 3.5, 4, 'b'); G.rect(12.5, d + 24, 7, 4, 'b');
    G.rect(3, d + 11, 2, 3, 'k'); G.rect(27, d + 11, 2, 3, 'k'); G.rect(10, d + 16, 2, 3, 'k'); G.rect(20, d + 16, 2, 3, 'k');
    for (let y = d + 14; y < d + 28; y += 4) for (let x = 5 + (y % 8 ? 2 : 0); x < 27; x += 5) G.px(x, y, 'G');
    return G.sprite({ cell: 12, seed: 23 });
  }
  function storm() {
    const G = Grid(34, 24);
    G.ell(10, 10, 8, 6, 'G'); G.ell(20, 7, 9, 7, 'G'); G.ell(27, 11, 7, 5, 'G'); G.ell(17, 13, 13, 4.5, 'G');
    G.ell(17, 5, 5, 3, 'g'); G.ell(9, 8, 3.5, 2.2, 'g');
    G.poly([[17, 15], [22, 15], [19, 19], [22, 19], [14, 24], [17, 20], [14, 20]], 'm');
    return G.sprite({ cell: 12, seed: 29, outlineColor: '#2B2B30' });
  }
  function paper(i) {
    const G = Grid(8, 10);
    G.rect(0, 0, 8, 10, 'w'); for (let y = 2; y < 9; y += 2) G.rect(1, y, i % 2 ? 6 : 5, 1, i % 3 ? 'g' : 'k');
    if (i % 2) G.ell(5.5, 8, 1.4, 1.2, 'r');
    return G.sprite({ cell: 10, seed: 31 + i, outlineColor: '#7C8288' });
  }
  function throne() {
    const G = Grid(24, 38);
    G.ell(12, 6, 9, 6, 'm'); G.rect(3, 6, 18, 18, 'm');
    G.ell(12, 7, 6.5, 4.5, 'r'); G.rect(5.5, 7, 13, 15, 'r');
    G.ell(12, 3, 2, 2, 'n'); G.px(11, 2, 'c');
    for (let y = 9; y < 22; y += 3) for (let x = 7 + (y % 2); x < 18; x += 3) G.px(x, y, 'D');
    G.rect(0, 18, 24, 3, 'y'); G.rect(1, 21, 22, 5, 'm'); G.rect(2, 20, 20, 2, 'r');
    G.rect(2, 26, 3, 12, 'y'); G.rect(19, 26, 3, 12, 'y'); G.rect(2, 30, 20, 1, 'y');
    return G.sprite({ cell: 14, seed: 37 });
  }
  function cobweb() {
    const G = Grid(18, 18);
    [0, 0.52, 1.05, 1.5708].forEach(a => G.line(0, 0, Math.cos(a) * 18, Math.sin(a) * 18, 1, 'g'));
    [6, 12].forEach(r => { for (let i = 0; i <= 18; i++) { const a = i / 18 * 1.5708; G.px(Math.cos(a) * r, Math.sin(a) * r * 1.0, 'g'); } });
    return G.sprite({ cell: 14, seed: 41, outline: false });
  }
  function spider() {
    const G = Grid(9, 7);
    G.stamp(0, 0, ['k.......k', '.k.....k.', 'k.kkkkk.k', '..kwkwk..', 'k.kkkkk.k', '.k.....k.', 'k.......k']);
    return G.sprite({ cell: 10, seed: 43, outline: false });
  }
  function cloud(seed = 1) {
    const G = Grid(30, 16);
    G.ell(9, 10, 7, 5, 'w'); G.ell(17, 7, 8, 6.5, 'w'); G.ell(24, 10, 5.5, 4.6, 'w'); G.ell(15, 12, 13, 3.6, 'w');
    G.ell(18, 13, 10, 2, (x, y) => (G.get(x, y) === 'w' ? 'h' : G.get(x, y)));
    return G.sprite({ cell: 14, seed: 47 + seed, outlineColor: '#7C8288' });
  }
  function phone() {
    const G = Grid(18, 30);
    G.ell(9, 2.5, 8.6, 2.6, 'k'); G.ell(9, 27.5, 8.6, 2.6, 'k'); G.rect(0, 2, 18, 26, 'k');
    G.rect(2, 3, 14, 23, 'c');
    G.rect(3, 5, 12, 3, 'w'); G.ell(4.5, 6.5, 1, 1, 'r');
    G.rect(3, 9, 10, 3, 'w'); G.ell(4.5, 10.5, 1, 1, 'v');
    G.rect(3, 13, 12, 3, 'w'); G.ell(4.5, 14.5, 1, 1, 'p');
    G.rect(3, 17, 8, 3, 'w'); G.ell(4.5, 18.5, 1, 1, 'm');
    G.rect(7, 27, 4, 1, 'G'); G.px(9, 1, 'G');
    return G.sprite({ cell: 14, seed: 53 });
  }
  function hourglass() {
    const G = Grid(18, 28);
    G.rect(0, 0, 18, 3, 'b'); G.rect(0, 25, 18, 3, 'b'); G.rect(1, 3, 2, 22, 'B'); G.rect(15, 3, 2, 22, 'B');
    G.poly([[3.5, 3], [14.5, 3], [10, 14], [14.5, 25], [3.5, 25], [8, 14]], 'c');
    G.poly([[5.5, 6], [12.5, 6], [9, 12]], 'm');
    G.line(9, 13, 9, 21, 1, 'm');
    G.poly([[4.5, 25], [13.5, 25], [9, 20]], 'm');
    return G.sprite({ cell: 14, seed: 59 });
  }
  function medal() {
    const G = Grid(22, 30);
    G.poly([[5, 13], [10, 14], [6, 29], [3.5, 25.5], [0, 27]], 'r'); G.poly([[17, 13], [12, 14], [16, 29], [18.5, 25.5], [22, 27]], 'r');
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; G.ell(11 + Math.cos(a) * 8.6, 10 + Math.sin(a) * 8.6, 1.8, 1.8, 'm'); }
    G.ell(11, 10, 8.5, 8.5, 'm'); G.ell(11, 10, 6.2, 6.2, 'y'); G.ell(11, 10, 5.2, 5.2, 'm');
    G.stamp(8, 7, ['......', '.....k', '....k.', 'k..k..', '.kk...', '......']);
    return G.sprite({ cell: 14, seed: 61 });
  }
  function mountains() {
    const W = 66, H = 36, G = Grid(W, H);
    const peak = (cx, top, hw, base) => {
      G.poly([[cx - hw, base], [cx, top], [cx + hw, base]], 'g');
      G.poly([[cx, top], [cx + hw, base], [cx + hw * 0.15, base]], 'G');
      const sn = top + (base - top) * 0.3;
      G.poly([[cx - hw * 0.3 - 0.4, sn + 1], [cx, top - 0.3], [cx + hw * 0.3 + 0.4, sn + 1], [cx + hw * 0.12, sn - 0.5], [cx, sn + 1.5], [cx - hw * 0.15, sn - 0.2]], 'w');
    };
    peak(20, 4, 18, 30); peak(48, 1, 20, 30); peak(34, 10, 13, 30); peak(62, 12, 11, 30);
    G.ell(14, 34, 22, 7, 'v'); G.ell(46, 35, 24, 7, 'V'); G.ell(33, 36, 33, 4, 'v');
    [[6, 27], [10, 29], [56, 29], [60, 27], [25, 30]].forEach(([x, y]) => { G.poly([[x - 2.5, y + 3], [x, y - 3.5], [x + 2.5, y + 3]], 'u'); G.px(x, y + 3, 'b'); });
    return G.sprite({ cell: 14, seed: 67 });
  }
  function landscape() {
    const W = 66, H = 46, G = Grid(W, H);
    const peak = (cx, top, hw, base) => {
      G.poly([[cx - hw, base], [cx, top], [cx + hw, base]], 'g');
      G.poly([[cx, top], [cx + hw, base], [cx + hw * 0.15, base]], 'G');
      const sn = top + (base - top) * 0.32;
      G.poly([[cx - hw * 0.32, sn + 1], [cx, top - 0.3], [cx + hw * 0.32, sn + 1], [cx + hw * 0.1, sn - 0.4], [cx - hw * 0.12, sn]], 'w');
    };
    peak(14, 2, 16, 22); peak(40, 0, 19, 22); peak(60, 6, 13, 22);
    G.ell(20, 26, 30, 8, 'u'); G.ell(52, 27, 26, 8, 'v');
    G.rect(0, 26, W, 20, 'V'); G.ell(10, 30, 22, 6, 'v'); G.ell(58, 36, 18, 6, 'v');
    // río
    for (let y = 22; y < H; y++) { const x = 34 + Math.sin(y * 0.32) * 4 + (y - 22) * 0.45; const wd = 1 + (y - 22) * 0.18; G.rect(Math.round(x - wd), y, Math.round(wd * 2 + 1), 1, 'a'); G.px(Math.round(x), y, (y % 3) ? 'a' : 'c'); }
    [[5, 24], [9, 25], [26, 23], [47, 24], [62, 25]].forEach(([x, y]) => { G.poly([[x - 2.5, y + 3], [x, y - 4], [x + 2.5, y + 3]], 'u'); G.px(x, y + 3, 'b'); });
    // florecitas
    [[6, 40], [14, 35], [22, 43], [48, 40], [56, 44], [60, 33], [27, 37]].forEach(([x, y], i) => G.px(x, y, ['m', 'w', 'p'][i % 3]));
    return G.sprite({ cell: 14, seed: 71 });
  }
  function cow() {
    const G = Grid(20, 14);
    G.rect(4, 9, 2, 5, 'k'); G.rect(13, 9, 2, 5, 'k'); G.rect(6, 9, 2, 4, 'k'); G.rect(11, 9, 2, 4, 'k');
    G.ell(9.5, 7, 7.5, 3.6, 'w'); G.ell(6, 6, 2.4, 1.8, 'k'); G.ell(12, 8, 2, 1.4, 'k');
    G.ell(17, 9, 2.6, 2.8, 'w'); G.ell(18, 11, 1.8, 1.2, 'p'); G.px(17, 8, 'k'); G.px(15, 6, 'k'); G.px(19, 6, 'k');
    G.px(1, 6, 'k'); G.px(2, 5, 'w');
    return G.sprite({ cell: 12, seed: 73 });
  }
  function horse() {
    const G = Grid(22, 16);
    G.rect(5, 9, 2, 7, 'b'); G.rect(8, 9, 2, 6, 'b'); G.rect(14, 9, 2, 7, 'b'); G.rect(17, 9, 2, 6, 'b');
    [5, 8, 14, 17].forEach(x => G.rect(x, 15, 2, 1, 'k'));
    G.ell(11, 7.5, 8, 3.4, 'b');
    G.poly([[16, 7], [19, 1], [21, 2], [20, 9]], 'b'); G.ell(20.4, 2.6, 1.8, 1.6, 'b');
    G.line(17, 7, 19, 0, 1, 'k'); G.line(3, 6, 1, 11, 1.6, 'k'); G.px(20, 2, 'k');
    return G.sprite({ cell: 12, seed: 79 });
  }
  // mapa de España (lon/lat → celdas)
  function spainMap() {
    const W = 64, H = 50, K = 6.2, C = Math.cos(40 * Math.PI / 180);
    const P = (lon, lat) => [(lon + 9.7) * C * K + 1, (43.95 - lat) * K + 1];
    const iberia = [[-9.3, 43.05], [-8.2, 43.75], [-7.0, 43.58], [-5.6, 43.58], [-3.8, 43.48], [-1.8, 43.38], [0.0, 42.75], [1.5, 42.55], [3.2, 42.42], [3.25, 41.9],
      [2.2, 41.38], [0.9, 40.75], [-0.3, 39.5], [0.2, 38.75], [-0.5, 38.3], [-0.7, 37.6], [-2.1, 36.72], [-4.4, 36.68], [-5.6, 36.0], [-6.3, 36.5], [-6.9, 37.15],
      [-7.45, 37.15], [-8.95, 37.0], [-8.8, 38.45], [-9.5, 38.78], [-9.0, 39.65], [-8.7, 40.65], [-8.8, 41.7], [-8.9, 42.4]];
    const portugal = [[-8.87, 41.88], [-8.1, 42.05], [-6.6, 41.95], [-6.2, 41.6], [-6.9, 41.0], [-6.8, 40.3], [-7.0, 39.6], [-7.5, 39.6], [-7.0, 38.9], [-7.3, 38.4],
      [-7.0, 38.0], [-7.5, 37.5], [-7.45, 37.15], [-8.95, 37.0], [-8.8, 38.45], [-9.5, 38.78], [-9.0, 39.65], [-8.7, 40.65], [-8.8, 41.7]];
    const leon = [[-7.07, 42.5], [-6.85, 42.95], [-5.7, 43.05], [-4.75, 43.2], [-4.75, 42.8], [-5.0, 42.3], [-5.6, 42.05], [-6.5, 42.0], [-6.9, 42.2]];
    const G = Grid(W, H);
    G.poly(iberia.map(p => P(...p)), 'v');
    G.poly(portugal.map(p => P(...p)), 'h');
    G.poly(leon.map(p => P(...p)), 'm');
    // Baleares
    G.ell(...P(2.95, 39.62), 2.4, 1.1, 'v'); G.ell(...P(4.1, 39.95), 1, 0.6, 'v'); G.ell(...P(1.4, 38.95), 0.9, 0.7, 'v');
    const babia = P(-6.0, 42.98);
    return { spr: G.sprite({ cell: 14, seed: 83 }), babia, P };
  }
  // dechado: iconos de la colección
  function iconSilla() {
    const G = Grid(12, 14);
    G.rect(2, 0, 2, 14, 'b'); G.rect(8, 7, 2, 7, 'b'); G.rect(2, 6, 9, 2, 'B'); G.rect(4, 1, 1, 5, 'B'); G.rect(4, 1, 0, 0, 'b');
    G.rect(4, 2, 0, 0, 'b'); G.rect(2, 1, 1, 1, 'b'); G.rect(3, 9, 6, 1, 'b');
    return G.sprite({ cell: 9, seed: 89 });
  }
  function iconManga() {
    const G = Grid(14, 14);
    G.poly([[1, 1], [9, 1], [13, 11], [7, 13]], 'v'); G.poly([[7, 13], [13, 11], [13.6, 13], [7.5, 14.4]], 'w');
    G.line(4, 3, 9, 11, 1, 'u');
    return G.sprite({ cell: 9, seed: 97 });
  }
  function iconMontana() {
    const G = Grid(16, 15);
    G.poly([[0, 15], [8, 5], [16, 15]], 'g'); G.poly([[8, 5], [16, 15], [9, 15]], 'G');
    G.poly([[5.4, 8.6], [8, 5], [10.6, 8.6], [9, 8], [8, 9], [7, 8]], 'w');
    G.rect(5, 2, 6, 2, 'm'); G.poly([[4.6, 2.2], [6, 2.2], [5.3, 0]], 'm'); G.poly([[7.3, 2.2], [8.7, 2.2], [8, -0.2]], 'm'); G.poly([[10, 2.2], [11.4, 2.2], [10.7, 0]], 'm');
    G.px(8, 3, 'r');
    return G.sprite({ cell: 9, seed: 101 });
  }
  function heart() {
    const G = Grid(11, 10); G.stamp(0, 0, ['.rrr...rrr.', 'rroor.rrrrr', 'rowrrrrrrrr', 'rrrrrrrrrrr', 'rrrrrrrrrrr', '.rrrrrrrrr.', '..rrrrrrr..', '...rrrrr...', '....rrr....', '.....r.....']);
    return G.sprite({ cell: 14, seed: 103 });
  }
  function teacup() {
    const G = Grid(18, 12);
    G.ell(9, 11, 9, 1.4, 'w'); G.poly([[2, 2], [14, 2], [12, 10], [4, 10]], 'w'); G.rect(2, 2, 12, 1, 'b');
    G.ell(15.5, 5, 2.2, 2.4, 'w'); G.ell(15.5, 5, 1, 1.2, '.');
    G.px(6, 5, 'p'); G.px(9, 6, 'r'); G.px(11, 5, 'p'); G.px(8, 4, 'v');
    return G.sprite({ cell: 14, seed: 107 });
  }
  function notebook() {
    const G = Grid(26, 30);
    G.rect(0, 0, 26, 30, 'R'); G.rect(2, 1, 23, 28, 'e');
    for (let y = 5; y < 28; y += 3) G.rect(4, y, 19, 1, 'c');
    for (let y = 2; y < 29; y += 3) G.px(1, y, 'G');
    return G.sprite({ cell: 14, seed: 109 });
  }
  function chair() {
    const G = Grid(16, 24);
    G.rect(2, 0, 2, 24, 'b'); G.rect(12, 0, 2, 24, 'b'); G.rect(2, 2, 12, 2, 'B'); G.rect(2, 6, 12, 2, 'B');
    G.rect(0, 12, 16, 3, 'B'); G.rect(0, 12, 16, 1, 'b'); G.rect(1, 15, 2, 9, 'b'); G.rect(13, 15, 2, 9, 'b');
    G.rect(2, 13, 12, 1, 'r');
    return G.sprite({ cell: 14, seed: 113 });
  }

  window.BS = {
    PAL, Grid, person, pin, roadSign, crown, hammock, shield, deer, dog, castle, storm, paper, throne, cobweb, spider, cloud, phone,
    hourglass, medal, mountains, landscape, cow, horse, spainMap, iconSilla, iconManga, iconMontana, heart, teacup, notebook, chair,
  };
})();
