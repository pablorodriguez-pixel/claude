// Motor común de animación para los 3 formatos (render fotograma a fotograma).
const $ = id => document.getElementById(id);
const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const eo = x => 1 - Math.pow(1 - cl(x), 3);
const eio = x => { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2 };
const eback = x => { x = cl(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) };
const eel = x => { x = cl(x); if (x === 0 || x === 1) return x; return Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * (2 * Math.PI / 3)) + 1 };
const p = (t, a, d = .35) => cl((t - a) / d);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) };

const FX = { sx: 0, sy: 0, flash: 0, zoom: 1 };
function shake(t, a, d = .25, amp = 16) { if (t > a && t < a + d) { const k = 1 - (t - a) / d; FX.sx += Math.sin(t * 150) * amp * k; FX.sy += Math.cos(t * 120) * amp * .7 * k } }
function flashAt(t, a, amt = .4, d = .08) { if (t >= a && t < a + d) FX.flash = Math.max(FX.flash, amt * (1 - (t - a) / d)) }
function punch(t, a, amt = .05, d = .3) { if (t >= a && t < a + d) FX.zoom *= 1 + amt * (1 - eo((t - a) / d)) }

// --- primitivas de animación (base = transform estático opcional en data-base)
function base(el) { return el.dataset.base || '' }
function show(el, on) { el.style.opacity = on ? 1 : 0 }
function pop(el, t, a, d = .32, from = .4) { const k = p(t, a, d); el.style.opacity = cl(k * 2.5); el.style.transform = base(el) + ` scale(${from + (1 - from) * eback(k)})` }
function popEl(el, t, a, d = .5) { const k = p(t, a, d); el.style.opacity = cl(k * 3); el.style.transform = base(el) + ` scale(${eel(k)})` }
function rise(el, t, a, d = .35, dist = 70) { const k = eo(p(t, a, d)); el.style.opacity = k; el.style.transform = base(el) + ` translateY(${(1 - k) * dist}px)` }
function slideX(el, t, a, d = .35, dist = 300) { const k = eo(p(t, a, d)); el.style.opacity = cl(k * 2); el.style.transform = base(el) + ` translateX(${(1 - k) * dist}px)` }
function slam(el, t, a, rot = 0, d = .18) { const k = p(t, a, d); el.style.opacity = k > 0 ? 1 : 0; const s = k < 1 ? 2.3 - 1.3 * eo(k) : 1; el.style.transform = base(el) + ` rotate(${rot}deg) scale(${s})` }
function fadeOut(el, t, a, d = .2) { el.style.opacity = Math.min(+el.style.opacity || 1, 1 - p(t, a, d)) }
function drawPath(id, k) { const e = typeof id === 'string' ? $(id) : id; if (!e.__L) { e.__L = e.getTotalLength(); e.style.strokeDasharray = e.__L } e.style.strokeDashoffset = e.__L * (1 - cl(k)) }
function typeText(el, txt, t, a, cps = 24, caret = true) { const n = Math.floor(cl((t - a) * cps, 0, txt.length)); el.innerHTML = txt.slice(0, n).replace(/\n/g, '<br>') + (caret && n < txt.length && t >= a ? '<span class="caret">|</span>' : '') }
function countUp(el, t, a, d, from, to, fmt = v => Math.round(v)) { el.textContent = fmt(from + (to - from) * eo(p(t, a, d))) }
function wiggle(t, amp = 2, sp = 3) { return Math.sin(t * sp) * amp }

// --- motor de escenas
// SC: [[id, start, transitionIn]], R: {id: (lt, d, t) => {}}
function makeRender(SC, R, opts = {}) {
  const endOf = i => i + 1 < SC.length ? SC[i + 1][1] : 999;
  return function (t) {
    FX.sx = 0; FX.sy = 0; FX.flash = 0; FX.zoom = 1;
    let ai = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i][1]) ai = i;
    SC.forEach(([id]) => { const e = $(id); e.style.display = 'none'; e.style.zIndex = 1 });
    const [id, st, tr] = SC[ai]; const lt = t - st; const el = $(id);
    el.style.display = 'block'; el.style.transform = 'none'; el.style.filter = 'none'; el.style.opacity = 1; el.style.clipPath = 'none'; el.style.zIndex = 3;
    R[id] && R[id](lt, endOf(ai) - st, t);
    if (ai > 0) {
      const prevId = SC[ai - 1][0], pe = $(prevId);
      const showPrev = () => { pe.style.display = 'block'; pe.style.zIndex = 2; R[prevId] && R[prevId](t - SC[ai - 1][1], st - SC[ai - 1][1], t) };
      const D = opts.td || .3;
      if (tr === 'cut') { punch(lt, 0, .05, .28) }
      if (tr === 'whip' && lt < D) { const k = eo(lt / D); showPrev(); el.style.transform = `translateX(${(1 - k) * 1080}px)`; pe.style.transform = `translateX(${-k * 1080}px)`; pe.style.filter = `blur(${k * 10}px)`; el.style.filter = `blur(${(1 - k) * 10}px)` }
      if (tr === 'up' && lt < D) { const k = eo(lt / D); showPrev(); el.style.transform = `translateY(${(1 - k) * 1920}px)`; pe.style.transform = `translateY(${-k * 600}px)`; pe.style.opacity = 1 - k * .6 }
      if (tr === 'zoom' && lt < D) { const k = eo(lt / D); el.style.transform = `scale(${1.5 - .5 * k})`; el.style.opacity = k; el.style.filter = `blur(${(1 - k) * 12}px)` }
      if (tr === 'circle' && lt < D * 1.4) { const k = eio(lt / (D * 1.4)); showPrev(); el.style.clipPath = `circle(${k * 130}% at 50% 45%)` }
      if (tr === 'wipe' && lt < D) { const k = eio(lt / D); showPrev(); el.style.clipPath = `inset(0 0 0 ${(1 - k) * 100}%)` }
      if (tr === 'flash') { flashAt(lt, 0, .8, .14); punch(lt, 0, .08, .3) }
    }
    if (opts.after) opts.after(t, id, lt);
    const cam = $('cam'); if (cam) cam.style.transform = `scale(${FX.zoom}) translate(${FX.sx}px,${FX.sy}px)`;
    const fl = $('flash'); if (fl) fl.style.opacity = FX.flash;
    const bar = $('bar'); if (bar) bar.style.width = (100 * cl(t / DUR)) + '%';
    if (opts.caps !== false) captions(t, opts.hideCaps ? opts.hideCaps(t, id) : false, opts.capFmt);
  };
}

// subtítulos palabra a palabra (2–3 palabras), palabra activa con clase .on
function captions(t, hide, fmt) {
  const cap = $('caps'); if (!cap) return; let html = '';
  if (!hide) for (const c of SUBS) {
    if (t >= c.s - .02 && t < c.e) {
      const k = p(t, c.s - .02, .1);
      html = c.w.map(w => { const act = t >= w.s - .03; const on = act && t < w.e + .06; return `<span class="${on ? 'on' : ''}" style="opacity:${act ? 1 : 0}">${fmt ? fmt(w.t) : w.t}</span>` }).join(' ');
      cap.style.transform = `scale(${.88 + .12 * eback(k)})`; break
    }
  }
  cap.innerHTML = html;
}
function readyAll() {
  return document.fonts.ready.then(() => new Promise(r => {
    const urls = [...document.querySelectorAll('[data-img]')].map(e => e.dataset.img);
    let n = urls.length; if (!n) return r(true);
    urls.forEach(u => { const i = new Image(); i.onload = i.onerror = () => { if (--n == 0) r(true) }; i.src = u });
  }));
}
