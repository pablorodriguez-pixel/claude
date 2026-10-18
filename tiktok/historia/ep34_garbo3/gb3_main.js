/* Ep. 34 · Garbo v3 — titulares de paso, subtítulos legibles, Vecino en su óvalo, frame, temblores, efectos y bucle */

/* ---------- TITULAR DE PASO: grande, numerado, aguanta todo el paso ---------- */
const BANNERS = STEPS.map(st => {
  const b = el('div', world, { left: '60px', top: '172px', width: '880px', height: '160px', zIndex: 520, transformOrigin: '80px 80px' });
  box(b, 8, 10, 880, 150, { background: SH, borderRadius: '30px' });
  const pap = box(b, 0, 0, 880, 150, { background: st.red ? YEL : '#FBF6EA', border: `6px solid ${INK}`, borderRadius: '30px' });
  const bd = el('div', b, { left: '-6px', top: '-14px', width: '178px', height: '178px', borderRadius: '50%', background: st.red ? RED : (st.badge === '★' ? INK : RED), border: `7px solid ${INK}`, boxShadow: `6px 6px 0 ${SH}`, textAlign: 'center', lineHeight: '160px', fontFamily: 'Playfair', fontWeight: 900, fontSize: st.badge === '★' ? '96px' : '132px', color: st.badge === '★' ? YEL : '#fff', zIndex: 3 }, st.badge);
  const tw = el('div', b, { left: '186px', top: '0', width: '670px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 800, fontSize: px(st.size || 80), lineHeight: 1, color: INK, zIndex: 2, whiteSpace: 'nowrap' });
  const hl = [];
  tw.innerHTML = '<span class="bt" style="display:inline-block;white-space:nowrap;transform-origin:center">' + st.title.replace(/\*([^*]+)\*/g, (m, s) => `<span style="position:relative;display:inline-block;font-style:italic;z-index:0"><span class="bhl" style="position:absolute;left:-8px;right:-8px;bottom:6%;height:42%;background:${st.red ? PINK : YEL};z-index:-1;transform-origin:left center;border-radius:4px 12px 6px 14px"></span>${s}</span>`) + '</span>';
  tw.querySelectorAll('.bhl').forEach(e => hl.push(e));
  void pap;
  return Object.assign({ b, bd, hl, bt: tw.firstChild }, st);
});
function updBanners(t) {
  BANNERS.forEach((B, i) => {
    const vis = t >= B.t0 - 0.02 && t < B.t1; B.b.style.display = vis ? '' : 'none'; if (!vis) return;
    if (!B.fit) { const w0 = B.bt.offsetWidth; if (w0 > 0) { B.fit = Math.min(1, 640 / w0); B.bt.style.transform = `scale(${f1(B.fit * 100) / 100})`; } }
    const prev = BANNERS[i - 1], chain = prev && Math.abs(prev.t1 - B.t0) < 0.05;
    const k = p(t, B.t0, chain ? 0.22 : 0.32, E.outBack);
    const nxt = BANNERS[i + 1], chainOut = nxt && Math.abs(nxt.t0 - B.t1) < 0.05;
    set(B.b, { x: chain ? 0 : (1 - k) * -1000, s: chain ? 0.96 + 0.04 * k : 1, r: -1.2 + wobble(t, 0.35, 0.4), o: chainOut ? 1 : 1 - p(t, B.t1 - 0.1, 0.1) });
    set(B.bd, { s: lerp(1.8, 1, p(t, B.t0 + 0.05, 0.22, E.outCubic)), r: -8 + Math.sin(t * 2) * 3 });
    B.hl.forEach(e => { e.style.transform = `scaleX(${f1(p(t, B.t0 + 0.25, 0.4, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
}

/* ---------- SUBTÍTULOS LEGIBLES: frases de 2 líneas como mucho, cada una ≥ 1,5 s en pantalla ---------- */
const CAP = (() => {
  const MAXT = 50;
  const len = g => g.reduce((a, i) => a + W[i].w.length + 1, 0) - 1;
  const dur = g => W[g[g.length - 1]].e - W[g[0]].s;
  // 1) frases: cortes en punto, interrogación, dos puntos, puntos suspensivos y cambio de línea
  let phrases = []; let cur = [];
  // cortes forzados a mano (frases largas que el reparto automático partiría mal)
  const FORCE = new Set([find('normandia era solo una distraccion'), find('y de que el ataque de verdad')]);
  W.forEach((x, i) => { const prev = W[i - 1]; if (cur.length && (prev.line !== x.line || /[.?!:…]$/.test(prev.w) || FORCE.has(i))) { phrases.push(cur); cur = []; } cur.push(i); });
  if (cur.length) phrases.push(cur);
  // 2) frases largas: primero por comas, luego en trozos equilibrados
  const split = g => {
    if (len(g) <= MAXT) return [g];
    // corte que deja los dos trozos lo más largos posible EN TIEMPO (las comas puntúan extra)
    let best = 1, bv = -1e9;
    for (let j = 1; j < g.length; j++) {
      const L = g.slice(0, j), R = g.slice(j);
      const v = Math.min(dur(L), dur(R)) + (/[,;]$/.test(W[g[j - 1]].w) ? 0.35 : 0) - (len(L) > MAXT + 8 || len(R) > MAXT + 8 ? 5 : 0) - (len(L) < 14 || len(R) < 14 ? 2 : 0) - (/^(un|una|el|la|los|las|de|del|que|a|y|en|con|por|para|le|les|se|su|lo)$/i.test(W[g[j - 1]].w) ? 1.2 : 0);
      if (v > bv) { bv = v; best = j; }
    }
    return [...split(g.slice(0, best)), ...split(g.slice(best))];
  };
  let groups = []; phrases.forEach(g => groups.push(...split(g)));
  // 3) los que durarían < 1,2 s se funden con el vecino (misma línea de guion)
  const show = k => (groups[k + 1] ? W[groups[k + 1][0]].s : W[groups[k][groups[k].length - 1]].e + 0.6) - W[groups[k][0]].s;
  const ends = g => /[.?!…]$/.test(W[g[g.length - 1]].w);
  for (let k = 0; k < groups.length; k++) {
    const g = groups[k]; if (show(k) >= 1.5) continue;
    const n = groups[k + 1], pv = groups[k - 1];
    const okN = n && W[n[0]].line === W[g[0]].line && len(g) + len(n) + 1 <= MAXT + 10;
    const okP = pv && W[pv[0]].line === W[g[0]].line && len(g) + len(pv) + 1 <= MAXT + 10;
    const prefP = okP && (!okN || ends(g) || !ends(pv));
    if (prefP) { groups.splice(k - 1, 2, pv.concat(g)); k -= 2; }
    else if (okN) { groups.splice(k, 2, g.concat(n)); k--; }
  }
  const boxC = el('div', null, { left: '0', top: '1338px', width: '1080px', display: 'flex', justifyContent: 'center', zIndex: 900, pointerEvents: 'none' });
  const pill = el('div', boxC, { position: 'relative', maxWidth: '800px', background: '#111', color: '#fff', borderRadius: '30px', padding: '10px 28px 14px', fontFamily: 'Bricolage', fontSize: '50px', fontWeight: 800, letterSpacing: '0.01em', lineHeight: 1.12, textAlign: 'center', boxShadow: `6px 6px 0 rgba(0,0,0,.25)` });
  // cada grupo aguanta hasta que empieza el siguiente (como mucho 0,6 s de cola tras su última palabra)
  const span = groups.map((g, k) => { const s0 = W[g[0]].s - 0.06; const nx = groups[k + 1] ? W[groups[k + 1][0]].s - 0.06 : 1e9; return [s0, Math.min(nx, W[g[g.length - 1]].e + 0.6)]; });
  let last = -1; const spans = [];
  return {
    groups, span,
    update(t) {
      let gi = -1; for (let k = 0; k < groups.length; k++) if (t >= span[k][0] && t < span[k][1]) gi = k;
      if (gi < 0 || t > LOOP) { boxC.style.visibility = 'hidden'; return; }
      boxC.style.visibility = 'visible';
      if (gi !== last) {
        pill.innerHTML = ''; spans.length = 0;
        groups[gi].forEach((wi, j) => { const sp = document.createElement('span'); sp.textContent = (j ? ' ' : '') + W[wi].w.replace(/[«»"]/g, ''); pill.appendChild(sp); spans.push([sp, wi]); });
        last = gi;
      }
      spans.forEach(([sp, wi]) => { sp.style.color = t >= W[wi].s - 0.03 && t <= W[wi].e + 0.08 ? YEL : '#fff'; });
      const k = p(t, span[gi][0], 0.16, E.outBack);
      set(boxC, { y: (1 - k) * 16, s: 0.94 + 0.06 * k, o: 1 });
    },
  };
})();

/* ---------- El Vecino en su óvalo (abajo-izquierda) ---------- */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}
const CX = -41, CY = 45, CS = 0.75;
const OV_VIS = [[S.P2c[0], S.P2c[1]], [K.y8b - 0.05, S.T2[1]], [S.O2[0], S.O2[1]], [S.Q2[0], S.Q2[1]]];
function ovalState(t) {
  for (const [a, b] of OV_VIS) if (t >= a && t < b) {
    const kin = pop(t, a, 0.4), kout = p(t, b - 0.14, 0.14, E.inCubic);
    return { x: CX - kout * 300, y: CY, s: CS * kin };
  }
  return null;
}
const IN = (t, a, b) => t > a && t < b;
function updOval(t) {
  const st = ovalState(t);
  if (!st) { ovalW.style.visibility = 'hidden'; return; }
  ovalW.style.visibility = 'visible';
  const laugh = IN(t, K.mapa + 0.05, K.mapa + 0.7) || IN(t, K.venezuela + 0.1, K.venezuela + 0.9);
  const shk = laugh ? Math.sin(t * 40) * 5 : 0;
  set(ovalW, { x: st.x, y: st.y + shk + wobble(t, 0.5, 2), s: st.s, r: laugh ? Math.sin(t * 20) * 2 : 0 });
  const o = { jaw: talkW(t, 'VECINO'), look: [5, -2], bL: 0, bR: 0, fan: wobble(t, 0.8, 5), seed: 1.3 };
  if (IN(t, K.guia - 0.1, K.turismo + 0.6)) { o.bL = 4; o.bR = 14; o.look = [6, -3]; }
  if (IN(t, K.creyo - 0.05, S.T2[1])) { o.fan = Math.sin(t * 24) * 20 - 10; o.bL = 16; o.bR = 16; o.look = [6, -4]; }
  if (IN(t, K.tu - 0.1, K.algo + 0.4)) { o.look = [0, 0]; o.bL = 10; o.bR = 4; }
  if (IN(t, K.os - 0.05, K.leo + 0.4)) { o.bL = 10; o.bR = 10; o.look = [0, 0]; }
  if (laugh) { o.hm = true; o.closed = true; o.bL = 10; o.bR = 10; o.jaw = 0.3; }
  vecFace(vecO, t, o);
}

/* ---------- precarga de fuentes (invisible: hidden + opacidad 0 + fuera de cuadro) ---------- */
{
  const pre = el('div', null, { left: '-3000px', top: '-500px', zIndex: 0, whiteSpace: 'nowrap', visibility: 'hidden', opacity: 0 });
  pre.innerHTML = ['Playfair;font-weight:900', 'Playfair;font-weight:800;font-style:italic', 'Playfair;font-weight:900;font-style:italic', 'Playfair;font-weight:800', 'Playfair;font-weight:700;font-style:italic', 'Rye', 'SpecialElite', 'Bricolage;font-weight:800', 'Bricolage;font-weight:600'].map(f => `<span style="font-family:${f}">ÁÉÍÓÚÑÜ¿¡ «» ✓ ✗ ✝ ♥ ✦ ★ º 👇 🤞 💧 … CALAIS 1944</span>`).join('');
  ['900 40px Playfair', 'italic 800 40px Playfair', 'italic 900 40px Playfair', '800 40px Playfair', 'italic 700 40px Playfair', '40px Rye', '40px SpecialElite', '800 40px Bricolage', '600 40px Bricolage'].forEach(f => { try { document.fonts.load(f); } catch (e) { } });
}

/* ---------- titulares sueltos: nunca dos a la vez ---------- */
HLS.forEach(h => { const nx = HLS.filter(q => q !== h && q.t0 > h.t0 - 0.001 && q.t0 < h.t1 + 0.3).map(q => q.t0 - 0.04); h.end = Math.min(h.t1, ...nx.filter(x => x > h.t0)); });
/* ---------- frame ---------- */
window.frame = t => {
  SC.forEach(s => {
    const vis = t >= s.t0 && t < s.t1 + (s.t1 < 900 && !s.cut ? 0.25 : 0); s.c.style.display = vis ? '' : 'none'; if (!vis) return;
    if (s.cut) set(s.c, { o: 1 });
    else { const kin = p(t, s.t0, 0.22, E.outCubic); set(s.c, { x: (1 - kin) * 160 * s.dir, o: clamp(kin * 1.8) }); }
    if (s.fn) s.fn(t);
  });
  HLS.forEach(h => {
    const vis = t >= h.t0 - 0.02 && t < h.end; h.b.style.display = vis ? '' : 'none'; if (!vis) return;
    h.b.style.opacity = 1 - p(t, h.end - 0.12, 0.12, E.inCubic);
    h.spans.forEach(s => { const k = p(t, s.t - 0.14, 0.26, E.outBack); set(s.e, { y: (1 - k) * 42, o: clamp(k * 1.5) }); });
    h.hls.forEach(s => { s.e.style.transform = `scaleX(${f1(p(t, s.t, 0.36, E.outCubic) * 1000) / 1000}) rotate(-1.2deg)`; });
  });
  updBanners(t);
  updOval(t);
  CAP.update(t);
  let sh = 0; SHAKES.forEach(s => sh += shake(t, s[0], s[1], s[2]));
  set(world, { x: sh, y: sh * 0.6 });
};

/* ---------- temblores ---------- */
[[K.engano0 - 0.05, .3, 14], [K.nunca1, .25, 10], [K.no4 + 0.02, .3, 14], [K.espia4, .25, 10], [K.londres, .25, 8], [K.lisboa, .25, 8],
 [K.v27, .35, 16], [K.existia, .3, 12], [K.ficharon, .3, 12], [K.calais, .3, 12], [K.nunca8 - 0.05, .3, 12], [K.fingio, .3, 12],
 [K.cruz, .25, 10], [K.medalla, .25, 10], [K.mismo - 0.05, .4, 20], [S.O0[0] + 0.02, .3, 14], [K.libro + 0.25, .5, 22]].forEach(s => shakeAt(s[0], s[1], s[2]));
/* ---------- efectos de sonido ---------- */
[
  [0.03, 'whoosh', .6], [K.hitler0 + 0.05, 'swoosh_up', .5], [K.medalla0, 'sparkle', .6], [K.espanol0, 'pop', .6], [K.engano0 - 0.05, 'stamp', 1.1],
  [S.B[0], 'whoosh', .5], [K.pujol1, 'pop', .5], [K.barcelona, 'pop2', .5], [S.C[0], 'paper', .5], [K.nunca1, 'stamp', 1.0],
  [S.BAL[0] + 0.05, 'whoosh', .7], [K.soy, 'swoosh_up', .6], [K.vecino, 'pop', .6],
  [S.Q[0], 'whoosh', .5], [K.senor, 'boing', .5], [K.espia3, 'pop', .4], [S.T3[0], 'whoosh', .5], [K.en3 + 0.05, 'pop', .6], [K.tres3, 'pop', .6], [K.pasos, 'pop2', .6],
  [S.P1a[0], 'swoosh_up', .7], [S.P1a[0] + 0.06, 'stamp', .7], [K.quiso, 'pop', .5], [K.ingleses4 + 0.4, 'click', .5], [K.ingleses4 + 0.6, 'click', .5],
  [S.P1b[0], 'whoosh', .4], [K.no4 - 0.05, 'thud', 1.0], [K.no4 + 0.02, 'stamp', 1.0], [K.no4 + 0.3, 'sad', .4],
  [S.P1c[0], 'paper', .6], [K.espia4, 'stamp', 1.0], [S.P1d[0], 'burst', .6], [K.ingleses4b - 0.06, 'whoosh', .5], [K.fin4, 'heart', .5], [K.fin4 - 0.1, 'sparkle', .5],
  [S.P2a[0], 'swoosh_up', .7], [S.P2a[0] + 0.06, 'stamp', .7], [K.mandaron - 0.05, 'paper', .5], [K.londres, 'stamp', .8], [K.quedo, 'boing', .5], [K.lisboa, 'pop2', .7],
  [S.P2c[0], 'whoosh', .5], [S.P2c[0] + 0.1, 'typing', .5], [K.guia - 0.1, 'pop', .6], [K.mapa - 0.1, 'pop', .6], [K.mapa + 0.3, 'swoosh_up', .4],
  [S.P3a[0], 'swoosh_up', .7], [S.P3a[0] + 0.06, 'stamp', .7], [S.P3a[0] + 0.4, 'paper', .5], [S.P3a[0] + 1.2, 'paper', .5], [K.tanto - 0.05, 'stamp', .7],
  [S.P3b[0], 'whoosh', .5], [K.otros, 'msg_in', .5], [K.espias6, 'msg_in', .5], [K.trabajaban, 'msg_in', .5],
  [K.ninguno - 0.06, 'glitch', .4], [K.existia, 'stamp', 1.0], [K.pagaban - 0.1, 'whoosh', .5], [K.sueldo, 'cash', .8],
  [S.F1[0], 'swoosh_up', .6], [K.ingleses7 - 0.1, 'paper', .5], [S.F1b[0], 'whoosh', .5], [K.bueno, 'boing', .4], [K.ficharon, 'stamp', 1.0],
  [S.R27[0], 'swoosh_up', .6], [K.juntos, 'pop', .5], [K.inflaron, 'msg_in', .5], [K.red7, 'msg_in', .5], [K.v27, 'stamp', 1.1], [T_EMU - 0.1, 'emu', .9], [K.inventados7, 'stamp', .8],
  [S.F2[0], 'whoosh', .5], [K.dia - 0.05, 'pop', .6], [K.desembarco - 0.1, 'swoosh_up', .5], [K.normandia, 'ding', .5],
  [S.T1[0], 'whoosh', .5], [K.aviso, 'typing', .7], [S.T2[0], 'whoosh', .5], [K.ataque - 0.05, 'swoosh_up', .6], [K.calais, 'stamp', 1.0], [K.hitler8b - 0.08, 'pop', .5], [K.creyo, 'ding', .6],
  [S.T3b[0], 'paper', .5], [K.dejo, 'pop', .4], [K.esperando - 0.04, 'whoosh', .5], [K.nunca8 - 0.05, 'stamp', 1.0],
  [S.O0[0], 'stamp', 1.0], [K.mas9 - 0.05, 'boing', .6], [S.O1[0], 'whoosh', .5], [K.africa - 0.05, 'pop', .5], [K.fingio - 0.1, 'sad', .5], [K.fingio, 'stamp', 1.0], [S.O2[0], 'whoosh', .6], [K.venezuela, 'pop2', .7], [K.tranquilo, 'stamp', .8],
  [S.M[0], 'drumroll', .4], [K.nazis - 0.05, 'pop', .5], [K.cruz + 0.12, 'thud', .8], [K.cruz + 0.15, 'sparkle', .5], [K.ingleses10 - 0.05, 'bell', .6], [K.medalla + 0.12, 'thud', .8], [K.medalla + 0.15, 'tada', .5],
  [K.por - 0.05, 'pop', .5], [K.mismo - 0.05, 'stamp', 1.2], [K.engano, 'pop2', .5],
  [S.Q2[0], 'whoosh', .6], [K.gordo - 0.05, 'click', .5], [K.inventado - 0.05, 'click', .5], [K.tu - 0.1, 'click', .5], [K.algo, 'pop2', .5], [K.os, 'ding', .7],
  [S.BK[0], 'whoosh', .5], [K.libro + 0.25, 'thud', 1.4], [LOOP, 'whoosh', .6],
].forEach(s => sfx(s[1], s[0], s[2]));

/* ---------- bucle: los últimos 0,4 s enlazan con la portada (fotograma 0) ---------- */
{
  const f0 = window.frame;
  window.frame = t => {
    if (t < LOOP) return f0(t);
    f0(0);
    const k = p(t, LOOP, 0.22, E.outCubic);
    set(world, { x: (1 - k) * 1080 });
  };
}
