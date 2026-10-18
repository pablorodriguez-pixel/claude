/* Ep. 35 · subtítulos por cláusula (5–8 palabras, ≥ 1,5 s en pantalla, hasta 2 líneas) — sustituye a los del motor */
{
  const G = []; let cur = [];
  W.forEach((x, i) => {
    const prev = W[i - 1];
    const brk = prev && (cur.length >= 9 || x.line !== prev.line || x.s - prev.e > 0.38 || /[.?!…]$/.test(prev.w) || /[:;,]$/.test(prev.w) && cur.length >= 3);
    if (cur.length && brk) { G.push(cur); cur = []; }
    cur.push(i);
  });
  if (cur.length) G.push(cur);
  // fusiona trozos cortos (< 1,5 s o < 3 palabras) con el siguiente si no pasan de 10 palabras y no cruzan de línea de guion
  for (let k = 0; k < G.length - 1; k++) {
    const g = G[k], n = G[k + 1], d = W[g[g.length - 1]].e - W[g[0]].s;
    if ((d < 1.5 || g.length < 3) && g.length + n.length <= (d < 1.0 ? 13 : 12) && W[g[0]].line === W[n[0]].line) { G[k] = g.concat(n); G.splice(k + 1, 1); k--; }
  }
  for (let k = G.length - 1; k > 0; k--) {
    const g = G[k], q = G[k - 1], d = W[g[g.length - 1]].e - W[g[0]].s;
    if ((d < 1.2 || g.length < 2) && g.length + q.length <= 13 && W[g[0]].line === W[q[0]].line) { G[k - 1] = q.concat(g); G.splice(k, 1); }
  }
  const boxC = el('div', null, { left: '90px', top: '1352px', width: '900px', display: 'flex', justifyContent: 'center', zIndex: 900, pointerEvents: 'none' });
  const pill = el('div', boxC, { position: 'relative', background: '#111', color: '#fff', borderRadius: '30px', padding: '10px 28px 12px', fontFamily: 'Bricolage', fontSize: '44px', fontWeight: 800, lineHeight: 1.15, textAlign: 'center', maxWidth: '860px' });
  let last = -1; const spans = [];
  const f0 = window.frame;
  window.frame = t => {
    f0(t);
    let gi = -1;
    for (let k = 0; k < G.length; k++) {
      const g = G[k], nx = G[k + 1];
      const end = Math.max(W[g[g.length - 1]].e + 0.35, W[g[0]].s + 1.5);
      const lim = nx ? W[nx[0]].s - 0.05 : 1e9;
      if (t >= W[g[0]].s - 0.05 && t < Math.min(end, lim)) gi = k;
    }
    if (gi < 0 || t >= LOOP) { boxC.style.visibility = 'hidden'; return; }
    boxC.style.visibility = 'visible';
    if (gi !== last) {
      pill.innerHTML = ''; spans.length = 0;
      G[gi].forEach((wi, j) => { const sp = document.createElement('span'); sp.textContent = (j ? ' ' : '') + W[wi].w.replace(/[«»"]/g, ''); pill.appendChild(sp); spans.push([sp, wi]); });
      last = gi;
    }
    spans.forEach(([sp, wi]) => { sp.style.color = t >= W[wi].s - 0.03 && t <= W[wi].e + 0.08 ? '#FFE600' : '#fff'; });
    const g = G[gi]; const k = p(t, W[g[0]].s - 0.05, 0.18, E.outBack);
    set(boxC, { y: (1 - k) * 14, s: 0.94 + 0.06 * k, o: 1 });
  };
  window.CAPG = G;
}
