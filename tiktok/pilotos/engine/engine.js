/* Motor mínimo de animación determinista para vídeos verticales 1080x1920.
   Cada página define window.frame(t) y llama a Engine.start({...}).
   render.js llama a window.render(t) por fotograma y lee window.SFX. */
(function () {
  const W = window.WORDS || [];
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const E = {
    linear: k => k,
    outCubic: k => 1 - Math.pow(1 - k, 3),
    inCubic: k => k * k * k,
    inOutCubic: k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
    outQuint: k => 1 - Math.pow(1 - k, 5),
    outBack: k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    outBackBig: k => { const c1 = 3, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    outElastic: k => (k === 0 || k === 1 ? k : Math.pow(2, -10 * k) * Math.sin((k * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
    outBounce: k => { const n1 = 7.5625, d1 = 2.75; if (k < 1 / d1) return n1 * k * k; if (k < 2 / d1) return n1 * (k -= 1.5 / d1) * k + 0.75; if (k < 2.5 / d1) return n1 * (k -= 2.25 / d1) * k + 0.9375; return n1 * (k -= 2.625 / d1) * k + 0.984375; },
  };
  // progreso 0..1 entre t0 y t0+d, con easing opcional
  const p = (t, t0, d = 0.4, ease = E.outCubic) => ease(clamp((t - t0) / d));
  // entra en t0 y sale en t1 (opacidad/escala combinables)
  const inOut = (t, t0, t1, din = 0.3, dout = 0.25) => Math.min(p(t, t0, din), 1 - p(t, t1 - dout, dout, E.inCubic));
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ%]/g, '');
  // tiempo de inicio de la palabra i (o de la primera aparición de la frase desde 'from')
  function w(i) { return typeof i === 'number' ? (W[i] ? W[i].s : 0) : W[find(i)].s; }
  function we(i) { return typeof i === 'number' ? (W[i] ? W[i].e : 0) : W[find(i)].e; }
  function find(phrase, from = 0) {
    const toks = phrase.split(/\s+/).map(norm).filter(Boolean);
    for (let i = from; i < W.length; i++) {
      let ok = true;
      for (let j = 0; j < toks.length; j++) if (!W[i + j] || norm(W[i + j].w) !== toks[j]) { ok = false; break; }
      if (ok) return i;
    }
    console.warn('find: no encontrado', phrase, from);
    return 0;
  }
  // crea un elemento absoluto dentro de parent
  function el(tag, parent, css = {}, html) {
    const e = document.createElement(tag.includes('<') ? 'div' : tag);
    if (tag.includes('<')) e.innerHTML = tag; else if (html != null) e.innerHTML = html;
    e.style.position = 'absolute';
    Object.assign(e.style, css);
    (parent || document.getElementById('stage')).appendChild(e);
    return e;
  }
  // aplica transform: x,y (px), s (escala), sx, sy, r (grados), o (opacidad)
  function set(e, o = {}) {
    const x = o.x || 0, y = o.y || 0, s = o.s == null ? 1 : o.s, sx = (o.sx == null ? 1 : o.sx) * s, sy = (o.sy == null ? 1 : o.sy) * s, r = o.r || 0;
    e.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${sx},${sy})`;
    if (o.o != null) { e.style.opacity = o.o; e.style.visibility = o.o <= 0.001 ? 'hidden' : 'visible'; }
  }
  const show = (e, on) => { e.style.visibility = on ? 'visible' : 'hidden'; };
  const pop = (t, t0, d = 0.45) => (t < t0 ? 0 : E.outBack(clamp((t - t0) / d)));
  const wobble = (t, f = 1.2, a = 2, ph = 0) => Math.sin((t * f + ph) * Math.PI * 2) * a; // respiración/idle
  const shake = (t, t0, d = 0.35, amp = 14) => { if (t < t0 || t > t0 + d) return 0; const k = 1 - (t - t0) / d; return Math.sin((t - t0) * 70) * amp * k; };
  const counter = (t, t0, d, from, to, ease = E.outCubic) => lerp(from, to, p(t, t0, d, ease));
  const fmt = (n, dec = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' });
  const typeText = (s, t, t0, cps = 28) => s.slice(0, Math.max(0, Math.floor((t - t0) * cps)));
  // efecto glitch RGB rápido: devuelve css filter/text-shadow
  const glitch = (t, t0, d = 0.25) => { if (t < t0 || t > t0 + d) return ''; const k = Math.sin((t - t0) * 90) * 8; return `${k}px 0 0 rgba(255,0,80,.7), ${-k}px 0 0 rgba(0,200,255,.7)`; };

  // ---- efectos de sonido: registrados una vez, render.js los exporta ----
  window.SFX = [];
  function sfx(name, t, gain = 1) { window.SFX.push({ name, t: +t.toFixed(3), gain }); }

  // ---- subtítulos karaoke ----
  function Captions(opt = {}) {
    const o = Object.assign({ maxWords: 3, gap: 0.22, y: 1500, font: 'Bricolage', size: 54, weight: 800,
      bg: '#111', color: '#fff', hi: '#ff3d7f', radius: 14, pad: '10px 22px', upper: false, shadow: '', border: '' }, opt);
    const groups = []; let cur = [];
    W.forEach((x, i) => {
      const prev = W[i - 1];
      const brk = cur.length >= o.maxWords || (prev && (x.s - prev.e > o.gap || /[.?!:;…]$/.test(prev.w)));
      if (cur.length && brk) { groups.push(cur); cur = []; }
      cur.push(i);
    });
    if (cur.length) groups.push(cur);
    const box = el('div', null, { left: '0', top: o.y + 'px', width: '1080px', display: 'flex', justifyContent: 'center', zIndex: 900, pointerEvents: 'none' });
    const pill = el('div', box, { position: 'relative', background: o.bg, color: o.color, borderRadius: o.radius + 'px', padding: o.pad,
      fontFamily: o.font, fontSize: o.size + 'px', fontWeight: o.weight, letterSpacing: '0.01em', whiteSpace: 'nowrap',
      textTransform: o.upper ? 'uppercase' : 'none', boxShadow: o.shadow, border: o.border, lineHeight: 1.15 });
    let last = -1; const spans = [];
    return {
      groups,
      update(t) {
        let gi = -1;
        for (let k = 0; k < groups.length; k++) { const g = groups[k]; if (t >= W[g[0]].s - 0.05 && t <= W[g[g.length - 1]].e + 0.35) gi = k; }
        if (gi < 0) { box.style.visibility = 'hidden'; return; }
        box.style.visibility = 'visible';
        if (gi !== last) {
          pill.innerHTML = ''; spans.length = 0;
          groups[gi].forEach((wi, j) => { const sp = document.createElement('span'); sp.textContent = (j ? ' ' : '') + W[wi].w.replace(/[«»"]/g, ''); pill.appendChild(sp); spans.push([sp, wi]); });
          last = gi;
        }
        spans.forEach(([sp, wi]) => { sp.style.color = t >= W[wi].s - 0.03 ? (t <= W[wi].e + 0.08 ? o.hi : o.color) : o.color; sp.style.opacity = t >= W[wi].s - 0.03 ? 1 : 0.55; });
        const g = groups[gi]; const k = p(t, W[g[0]].s - 0.05, 0.18, E.outBack);
        set(box, { y: (1 - k) * 18, s: 0.9 + 0.1 * k, o: 1 });
      },
    };
  }

  // ---- arranque ----
  function start(opt = {}) {
    const cap = opt.captions === false ? null : Captions(opt.captions || {});
    window.DURATION = opt.duration || (W.length ? W[W.length - 1].e + (opt.tail || 3.2) : 10);
    window.render = t => { window.frame(t); if (cap) cap.update(t); };
    document.fonts.ready.then(() => { window.render(0); window.ready = true; });
  }

  Object.assign(window, { E, p, inOut, w, we, find, el, set, show, pop, wobble, shake, counter, fmt, typeText, glitch, sfx, clamp, lerp, Engine: { start, Captions }, W });
})();
