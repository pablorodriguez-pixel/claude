/* Ep. 307 · «¿Cuántos agujeros tiene una pajita?» — topología: estirar, aplastar y doblar sí; cortar y pegar, no.
   Pajita aplastada desde arriba → donut → 1 agujero (género 1). Los del «cero» olvidan que la lámina enrollada se PEGÓ: pegar crea el agujero.
   Truco: bocas − 1 = agujeros (vaso 0, pajita 1, pantalones 2). La camiseta (4 bocas → 3) NO se resuelve en pantalla: es la pregunta final.
   Objetos-metáfora: pajita con cara que se aplasta hasta ser donut, plastilina que se estira/aplasta/dobla, tira que se enrolla y se pega,
   carteles de los tres bandos, fórmula con iconos que cuentan bocas. Cero emojis: todo dibujado. */
Story.prepara();
const T = {
  solo0: Q('solo'), casi0: Q('casi todo'), dos0: Q('tiene dos'),
  peleas: Q('peleas'), internet: Q('internet'), parte: Q('una parte'), mates: Q('matemáticas'), resuelve: Q('resuelve'),
  bandos: Q('hay tres bandos'), del2: Q('los del dos'), arriba3: Q('arriba'), abajo3: Q('abajo'), del1: Q('los del uno'), tunel3: Q('túnel'), punta3: Q('punta a punta'),
  del0: Q('los del cero'), plastico3: Q('plástico'), nadie3: Q('nadie'), pinchado: Q('pinchado'),
  decidir: Q('para decidir'), gana: Q('gana'), matematicos: Q('los matemáticos'), topo4: Q('topología'), regla: Q('y tiene una sola regla'),
  estirar: Q('estirar'), aplastar: Q('aplastar'), doblar: Q('doblar'), pero: Q('pero nunca'), cortar: Q('cortar'), pegar4: Q('pegar'),
  coge: Q('coge la pajita'), aplastala: Q('aplástala'), desde: Q('desde arriba'), bajita: Q('bajita'), gordita: Q('gordita'), queda: Q('qué te queda'), donut5: Q('un donut'),
  donut6: Q('y un donut'), agujero6: Q('un agujero'), uno6: Q('uno solo'), bocas6: Q('las dos bocas'), entrada: Q('la entrada'), salida: Q('la salida'), tunel6: Q('mismo túnel'),
  cero7: Q('y los del cero'), olvidan: Q('se olvidan'), detalle: Q('detalle'), hacer7: Q('para hacer'), enrollaron: Q('enrollaron'), plastico7: Q('plástico'),
  pegaron: Q('pegaron'), bordes: Q('bordes'), pegar7: Q('y pegar'), justo7: Q('justo'), crea: Q('crea'), agujero7: Q('agujero'),
  ojo: Q('ojo'), truco: Q('truco'), cualquier: Q('cualquier cosa'), cuenta8: Q('cuenta las bocas'), restale: Q('réstale'),
  vaso: Q('un vaso'), unaboca: Q('una boca'), cero8: Q('cero agujeros'), pantalones: Q('unos pantalones'), tres: Q('tres bocas'), dos8: Q('dos agujeros'),
  osea: Q('o sea'), del1_9: Q('los del uno'), razon: Q('razón'), demas: Q('los demás'), estudiar: Q('a estudiar'), topo9: Q('topología'),
};
const ROSA_P = '#ff4f8b', MENTA = '#7fd8b6', MASA = '#e2a565', MASA2 = '#b8743e', GLASA = '#ff8fc8', HUECO = '#3a2530', AZUL = '#2b6fd6', VERDE = '#2e9e6b', CRE = '#FBF6EA', NAR = '#F2983E';
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));
const slam = (e, t, t0, r = -4, base = 1) => set(e, { o: t > t0 ? 1 : 0, s: t < t0 ? 0 : lerp(2, 1, E.outCubic(clamp((t - t0) / 0.22))) * base, r });
let UID7 = 0;
const OKS = `<svg viewBox="0 0 100 100" width="1em" height="1em" style="vertical-align:-0.12em;overflow:visible"><path d="M18,54 L42,76 L84,24" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18,54 L42,76 L84,24" stroke="${VERDE}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const KOS = `<svg viewBox="0 0 100 100" width="1em" height="1em" style="vertical-align:-0.12em;overflow:visible"><path d="M20,20 L80,80 M80,20 L20,80" stroke="${INK}" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M20,20 L80,80 M80,20 L20,80" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round"/></svg>`;

/* ---------- PAJITA con cara (vb -500 -500 1000 1000, centrada). geo(w,h,ry,hk) la estira/aplasta; sface(d,t,{feliz,jaw,look,ceja,sq}) ---------- */
const TUBE = (c, sz, o = {}) => { const id = 'st' + (UID7++);
  const d = box(c, 0, 0, sz, sz, { zIndex: o.z || 10, transformOrigin: '50% 50%' }, `<svg viewBox="-500 -500 1000 1000" width="${sz}" height="${sz}" style="overflow:visible">
   <defs><pattern id="${id}" width="96" height="96" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><rect width="96" height="96" fill="#fff"/><rect width="44" height="96" fill="${o.col || ROSA_P}"/><rect x="62" width="14" height="96" fill="${MENTA}"/></pattern></defs>
   <ellipse class="sh" fill="${SH}"/>
   <path class="body" fill="url(#${id})" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
   <path class="gl" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="16" stroke-linecap="round"/>
   <ellipse class="top" fill="#ffd6e4" stroke="${INK}" stroke-width="12"/><ellipse class="hole" fill="${HUECO}" stroke="${INK}" stroke-width="6"/>
   <g class="face"><g class="eyes"><ellipse cx="-38" cy="0" rx="24" ry="28" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="38" cy="0" rx="24" ry="28" fill="#fff" stroke="${INK}" stroke-width="6"/><g class="pup"><circle cx="-35" cy="4" r="11" fill="${INK}"/><circle cx="41" cy="4" r="11" fill="${INK}"/></g></g>
     <path class="brow" d="M-62,-42 q24,-12 46,0 M16,-42 q24,-12 46,0" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>
     <path class="mouth" fill="#7a2a20" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/></g></svg>`);
  ['sh', 'body', 'gl', 'top', 'hole', 'face', 'mouth', 'pup', 'brow', 'eyes'].forEach(k => d[k] = d.querySelector('.' + k));
  const at = (e, a) => Object.entries(a).forEach(([k, v]) => e.setAttribute(k, typeof v === 'number' ? f1(v) : v));
  d.geo = (w, h, ry, hk = 0.72) => { const x = w / 2, y0 = -h / 2, y1 = h / 2;
    d.body.setAttribute('d', `M${f1(-x)},${f1(y0)} L${f1(-x)},${f1(y1)} A${f1(x)},${f1(ry)} 0 0 0 ${f1(x)},${f1(y1)} L${f1(x)},${f1(y0)} Z`);
    d.gl.setAttribute('d', `M${f1(-x * 0.64)},${f1(y0 + ry + 24)} L${f1(-x * 0.64)},${f1(Math.max(y0 + ry + 26, y1 - 16))}`);
    at(d.top, { cx: 0, cy: y0, rx: x, ry }); at(d.hole, { cx: 0, cy: y0, rx: x * hk, ry: ry * hk }); at(d.sh, { cx: 24, cy: y1 + 14, rx: x * 1.15, ry: Math.max(ry, 22) });
    d.fy = y0 + ry + (h - ry) * 0.42; d.fs = clamp(w / 210, 0.55, 1.2); d.h = h; };
  d.geo(o.w || 200, o.h || 700, o.ry || 30); return d; };
const sface = (d, t, o = {}) => { const fz = o.feliz == null ? 0.6 : o.feliz, j = o.jaw || 0, sq = o.sq || 1;
  d.face.setAttribute('transform', `translate(0 ${f1(d.fy)}) scale(${f1(d.fs / Math.sqrt(sq))} ${f1(d.fs * sq)})`);
  d.mouth.setAttribute('d', `M-34,56 Q0,${f1(56 + 28 * fz + j * 34)} 34,56 Q0,${f1(56 - 6 * fz + j * 8)} -34,56 Z`);
  const lk = o.look || [0, 0]; d.pup.setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`);
  const bl = ((t + (o.seed || 0)) % 3.1) < 0.12; d.eyes.setAttribute('transform', bl || o.closed ? 'translate(0 2) scale(1 0.12)' : '');
  d.brow.setAttribute('transform', `translate(0 ${f1(-(o.ceja || 0))})`); };

/* ---------- DONUT (vb -500 -500 1000 1000) con glaseado rosa, virutas y cara ---------- */
const glasaD = (() => { let s = ''; for (let i = 0; i <= 72; i++) { const a = i / 72 * Math.PI * 2, r = 1 + 0.05 * Math.sin(a * 7) + (Math.sin(a) > 0 ? 0.09 * Math.max(0, Math.sin(a * 9)) : 0);
  s += (i ? 'L' : 'M') + f1(Math.cos(a) * 292 * r) + ',' + f1(Math.sin(a) * 166 * r - 8); } return s + 'Z M-128,-8 A128,74 0 1 0 128,-8 A128,74 0 1 0 -128,-8 Z'; })();
const VIRUTAS = [...Array(22)].map((_, i) => { const a = i * 2.39, rr = 0.62 + 0.3 * ((i * 37) % 10) / 10, x = Math.cos(a) * 250 * rr, y = Math.sin(a) * 140 * rr - 8;
  return `<rect x="${f1(x - 14)}" y="${f1(y - 5)}" width="28" height="10" rx="5" fill="${[YEL, MENTA, '#fff', '#6aa8ff'][i % 4]}" stroke="${INK}" stroke-width="3" transform="rotate(${(i * 47) % 180} ${f1(x)} ${f1(y)})"/>`; }).join('');
const DONUT = (c, sz, z = 12) => { const d = box(c, 0, 0, sz, sz, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="-500 -500 1000 1000" width="${sz}" height="${sz}" style="overflow:visible">
  <ellipse cx="26" cy="190" rx="360" ry="90" fill="${SH}"/><ellipse cx="0" cy="62" rx="334" ry="192" fill="${MASA2}" stroke="${INK}" stroke-width="12"/>
  <ellipse cx="0" cy="0" rx="334" ry="192" fill="${MASA}" stroke="${INK}" stroke-width="12"/>
  <path d="${glasaD}" fill="${GLASA}" fill-rule="evenodd" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>${VIRUTAS}
  <ellipse cx="0" cy="-8" rx="110" ry="62" fill="${HUECO}" stroke="${INK}" stroke-width="10"/><path d="M-106,-12 A110,62 0 0 1 106,-12 Q0,26 -106,-12 Z" fill="${MASA2}"/>
  <g class="face" transform="translate(0 112)"><g class="eyes"><ellipse cx="-50" cy="0" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="50" cy="0" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="6"/><g class="pup"><circle cx="-47" cy="4" r="9" fill="${INK}"/><circle cx="53" cy="4" r="9" fill="${INK}"/></g></g>
  <path class="mouth" d="M-26,36 Q0,62 26,36 Q0,44 -26,36 Z" fill="#7a2a20" stroke="${INK}" stroke-width="5"/></g></svg>`);
  d.eyes = d.querySelector('.eyes'); d.pup = d.querySelector('.pup'); return d; };
const dface = (d, t, look = [0, 0]) => { d.pup.setAttribute('transform', `translate(${look[0]} ${look[1]})`); d.eyes.setAttribute('transform', ((t + 0.7) % 2.9) < 0.12 ? 'translate(0 2) scale(1 0.12)' : ''); };

/* ---------- objetos sueltos ---------- */
const svgB = (c, x, y, w, h, vb, inner, z = 12) => box(c, x, y, w, h, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="${vb}" width="${w}" height="${h}" style="overflow:visible">${inner}</svg>`);
const VASO = `<path d="M-110,-120 L-80,150 Q-78,168 -58,168 L58,168 Q78,168 80,150 L110,-120 Z" fill="#cfeaf5" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M-96,0 L-84,140 Q-82,156 -62,156 L62,156 Q82,156 84,140 L96,0 Z" fill="#ffb347" opacity=".8"/><path d="M-70,-90 L-50,130" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".8"/><ellipse cx="0" cy="-120" rx="110" ry="26" fill="#9fd0e6" stroke="${INK}" stroke-width="10"/>`;
const PANTS = `<path d="M-120,-150 L120,-150 L136,170 L36,170 L0,-30 L-36,170 L-136,170 Z" fill="${AZUL}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M-120,-118 H120" stroke="${INK}" stroke-width="7"/><path d="M0,-118 V-40" stroke="#16407e" stroke-width="6"/><circle cx="0" cy="-134" r="8" fill="${GOLD}" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="0" cy="-150" rx="120" ry="20" fill="${HUECO}" stroke="${INK}" stroke-width="8"/><ellipse cx="-86" cy="170" rx="50" ry="14" fill="${HUECO}" stroke="${INK}" stroke-width="7"/><ellipse cx="86" cy="170" rx="50" ry="14" fill="${HUECO}" stroke="${INK}" stroke-width="7"/>`;
const CAMI = `<path d="M-90,-170 Q0,-120 90,-170 L210,-110 L170,-10 L120,-36 L120,190 L-120,190 L-120,-36 L-170,-10 L-210,-110 Z" fill="${YEL}" stroke="${INK}" stroke-width="11" stroke-linejoin="round"/><path d="M-90,-170 Q0,-110 90,-170" stroke="${INK}" stroke-width="8" fill="none"/><path d="M-100,150 H100" stroke="#d8b800" stroke-width="8"/>
  <text x="0" y="90" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="190" fill="${INK}">¿?</text>`;
const TIJERA = (c, z = 30) => { const d = svgB(c, 0, 0, 300, 300, '-150 -150 300 300', `<g class="a"><path d="M-6,10 L120,-120" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M-6,10 L120,-120" stroke="#dcdde3" stroke-width="16" stroke-linecap="round"/><circle cx="-56" cy="66" r="38" fill="none" stroke="${INK}" stroke-width="26"/><circle cx="-56" cy="66" r="38" fill="none" stroke="${RED}" stroke-width="14"/><path d="M-6,10 L-34,40" stroke="${RED}" stroke-width="20" stroke-linecap="round"/></g>
  <g class="b"><path d="M6,10 L-120,-120" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M6,10 L-120,-120" stroke="#eef0f4" stroke-width="16" stroke-linecap="round"/><circle cx="56" cy="66" r="38" fill="none" stroke="${INK}" stroke-width="26"/><circle cx="56" cy="66" r="38" fill="none" stroke="${RED}" stroke-width="14"/><path d="M6,10 L34,40" stroke="${RED}" stroke-width="20" stroke-linecap="round"/></g><circle cx="0" cy="10" r="10" fill="${INK}"/>`, z);
  d.a = d.querySelector('.a'); d.b = d.querySelector('.b'); return d; };
const corta = (d, k) => { d.a.setAttribute('transform', `rotate(${f1(k * 22)} 0 10)`); d.b.setAttribute('transform', `rotate(${f1(-k * 22)} 0 10)`); };
const COLA = (c, z = 30) => svgB(c, 0, 0, 220, 330, '-110 -170 220 330', `<path d="M-30,-60 L0,-160 L30,-60 Z" fill="${NAR}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/><path d="M-70,-60 L70,-60 L70,130 Q70,150 50,150 L-50,150 Q-70,150 -70,130 Z" fill="#fff" stroke="${INK}" stroke-width="10"/>
  <rect x="-70" y="-10" width="140" height="78" fill="${YEL}" stroke="${INK}" stroke-width="7"/><text x="0" y="46" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="46" fill="${INK}">COLA</text>`, z);
const GOTA = (c, z = 31) => svgB(c, 0, 0, 70, 90, '-35 -45 70 90', `<path d="M0,-40 C22,-6 26,18 0,40 C-26,18 -22,-6 0,-40 Z" fill="#f4f8ff" stroke="${INK}" stroke-width="6"/><path d="M-8,4 q-4,12 4,22" stroke="#9fc4ff" stroke-width="6" fill="none" stroke-linecap="round"/>`, z);
const TROFEO = (c, z = 20) => svgB(c, 0, 0, 220, 260, '-110 -130 220 260', `<path d="M-70,-110 H70 V-40 Q70,30 0,40 Q-70,30 -70,-40 Z" fill="${GOLD}" stroke="${INK}" stroke-width="9"/><path d="M-70,-90 Q-120,-90 -110,-40 Q-100,0 -60,6 M70,-90 Q120,-90 110,-40 Q100,0 60,6" stroke="${INK}" stroke-width="10" fill="none"/>
  <rect x="-16" y="38" width="32" height="44" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="-60" y="80" width="120" height="40" rx="6" fill="#6b4a2a" stroke="${INK}" stroke-width="8"/><text x="0" y="-22" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="90" fill="${INK}">1</text>`, z);
const LIBRO = (c, z = 20, w = 260) => box(c, 0, 0, w, w * 0.72, { zIndex: z, background: '#8a2a2a', border: `7px solid ${INK}`, borderRadius: '10px 18px 18px 10px', boxShadow: `inset 22px 0 0 #5e1b1b, 8px 8px 0 ${SH}`, color: GOLD, fontFamily: 'Playfair', fontWeight: 900, fontSize: px(w * 0.13), lineHeight: px(w * 0.72 - 14), textAlign: 'center', paddingLeft: '18px', boxSizing: 'border-box', transformOrigin: '50% 50%' }, 'TOPOLOGÍA');
const LUPA = (c, z = 40) => svgB(c, 0, 0, 300, 300, '-150 -150 300 300', `<path d="M60,60 L130,130" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path d="M64,64 L126,126" stroke="#6b4a2a" stroke-width="24" stroke-linecap="round"/><circle cx="-10" cy="-10" r="96" fill="rgba(255,255,255,.35)" stroke="${INK}" stroke-width="22"/><circle cx="-10" cy="-10" r="96" fill="none" stroke="#c9c4b6" stroke-width="10"/><path d="M-60,-50 q20,-34 56,-40" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>`, z);
const BADGE = (c, txt, col = YEL, sz = 90, z = 30) => box(c, 0, 0, sz, sz, { zIndex: z, borderRadius: '50%', background: col, border: `6px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(sz * 0.62), lineHeight: px(sz - 12), textAlign: 'center', color: INK, transformOrigin: '50% 50%', boxSizing: 'border-box' }, txt);
/* cara enfadada dibujada (avatar de comentarios) */
const ENFADO = (c, col, z = 22) => svgB(c, 0, 0, 120, 120, '-60 -60 120 120', `<circle r="54" fill="${col}" stroke="${INK}" stroke-width="7"/><path d="M-34,-20 L-10,-8 M34,-20 L10,-8" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="-18" cy="4" r="7" fill="${INK}"/><circle cx="18" cy="4" r="7" fill="${INK}"/><path d="M-22,34 Q0,18 22,34" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M40,-56 l8,-14 M52,-46 l14,-8" stroke="${RED}" stroke-width="6" stroke-linecap="round"/>`, z);
const RAYO = (c, z = 25) => svgB(c, 0, 0, 120, 180, '0 0 120 180', `<path d="M70,0 L10,100 L56,100 L34,180 L112,66 L64,66 L90,0 Z" fill="${YEL}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`, z);

/* ---------- cartel de bando (280×360): número + dibujo de la pajita «a su manera» ---------- */
const PAJ_H = (id, x = 30, y = 58, w = 180, h = 44) => `<defs><pattern id="${id}" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><rect width="30" height="30" fill="#fff"/><rect width="14" height="30" fill="${ROSA_P}"/></pattern></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})" stroke="${INK}" stroke-width="5"/><ellipse cx="${x}" cy="${y + h / 2}" rx="10" ry="${h / 2}" fill="${HUECO}" stroke="${INK}" stroke-width="4"/><ellipse cx="${x + w}" cy="${y + h / 2}" rx="10" ry="${h / 2}" fill="#ffd6e4" stroke="${INK}" stroke-width="4"/>`;
const DIBU = {
  2: id => PAJ_H(id) + `<g class="dz"><circle cx="30" cy="80" r="36" fill="none" stroke="${RED}" stroke-width="8"/><circle cx="210" cy="80" r="36" fill="none" stroke="${RED}" stroke-width="8"/></g>`,
  1: id => PAJ_H(id) + `<path class="dz" d="M-10,80 H250" stroke="${AZUL}" stroke-width="10" stroke-dasharray="20 14" fill="none"/><path d="M236,62 L262,80 L236,98 Z" fill="${AZUL}" stroke="${INK}" stroke-width="4"/>`,
  0: id => `<defs><pattern id="${id}" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><rect width="30" height="30" fill="#fff"/><rect width="14" height="30" fill="${ROSA_P}"/></pattern></defs><g class="dz"><path d="M40,110 L80,40 L220,40 L180,110 Z" fill="url(#${id})" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g>`,
};
const CARTEL = (c, n, col, z = 14) => { const id = 'cp' + (UID7++);
  const d = box(c, 0, 0, 280, 520, { zIndex: z, transformOrigin: '50% 100%' }, `<div style="position:absolute;left:128px;top:340px;width:24px;height:180px;background:#a2723f;border:5px solid ${INK};box-sizing:border-box"></div>
   <div class="fr" style="position:absolute;left:0;top:0;width:280px;height:350px;background:${CRE};border:8px solid ${INK};border-radius:24px;box-shadow:10px 12px 0 ${SH};box-sizing:border-box;text-align:center;transform-origin:50% 50%">
   <div style="font-family:Bricolage;font-weight:800;font-size:170px;line-height:180px;color:${col};text-shadow:${OUT}">${n}</div>
   <svg viewBox="0 0 240 150" width="240" height="150" style="overflow:visible">${DIBU[n](id)}</svg></div>
   <div class="bk" style="position:absolute;left:0;top:0;width:280px;height:350px;background:${col};border:8px solid ${INK};border-radius:24px;box-sizing:border-box;text-align:center;font-family:Playfair;font-weight:900;font-size:200px;line-height:330px;color:#fff;text-shadow:${OUT};transform-origin:50% 50%">?</div>`);
  d.fr = d.querySelector('.fr'); d.bk = d.querySelector('.bk'); d.dz = d.querySelector('.dz'); return d; };
const gira = (d, t, t0) => { const k = p(t, t0 - 0.15, 0.4, E.inOutCubic); set(d.bk, { sx: k < 0.5 ? 1 - k * 2 : 0.001, o: k < 0.5 ? 1 : 0 }); set(d.fr, { sx: k >= 0.5 ? k * 2 - 1 : 0.001, o: k >= 0.5 ? 1 : 0 }); return k; };
const COLB = { 2: NAR, 1: PINK, 0: AZUL };

/* ===================== PORTADA + L0 · pajita con cara, «¿CUÁNTOS AGUJEROS TIENE?», 2 · 1 · 0 → sello ¡UNO! ===================== */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t1 = texto(c, 262, '¿CUÁNTOS', { size: 132, z: 30 });
  const t2 = texto(c, 398, hlSpan('AGUJEROS', 'phl') + ' TIENE?', { size: 84, italic: true, z: 30 });
  const nums = [2, 1, 0].map((n, i) => { const b = BADGE(c, String(n), [NAR, PINK, '#7fb2ff'][i], 150, 25); return b; });
  const dots = [0, 1].map(i => box(c, 0, 0, 26, 26, { zIndex: 25, borderRadius: '50%', background: INK }));
  const paj = TUBE(c, 820, { w: 230, h: 760, ry: 34, z: 12 });
  const ring = box(c, 0, 0, 230, 230, { zIndex: 13, borderRadius: '50%', border: `14px solid ${RED}`, boxSizing: 'border-box', transformOrigin: '50% 50%' });
  const bubs = [['¡DOS!', 110, 980, -6], ['dos, claro', 640, 1060, 5], ['¡¡DOS!!', 120, 1200, 4]].map(([s, x, y, r]) => { const b = BOCADILLO(c, x, y, s, { size: 52, z: 35 }); b.r = r; return b; });
  sello(c, 840, '¡UNO!', T.solo0, { size: 150, r: -8 });
  sfx('swoosh_up', 0.05, 0.5); sp(T.casi0, 'msg_in', 0.5); sp(T.dos0, 'msg_in', 0.5); sp(T.dos0 + 0.3, 'msg_out', 0.5);
  return t => {
    set(ry, { r: t * 6 });
    set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 1.5 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.025 * Math.sin(t * 3) }); paint(c.querySelector('.phl'), t, 0.0, 0.3);
    nums.forEach((b, i) => { const win = i === 1 && t > T.solo0; set(b, { x: 230 + i * 230, y: 530 + Math.sin(t * 3 + i * 2) * 10, r: Math.sin(t * 2 + i) * 6, s: win ? 1.25 + 0.05 * Math.sin(t * 9) : 1, o: !win && t > T.solo0 + 0.2 ? 0.45 : 1 }); });
    dots.forEach((d, i) => set(d, { x: 407 + i * 230, y: 592 + Math.sin(t * 3 + i) * 6 }));
    const sq = 1 + 0.03 * Math.sin(t * 5);
    set(paj, { x: 130, y: 610 + Math.sin(t * 2.2) * 8, r: wobble(t, 0.5, 2.5), sy: sq, sx: 2 - sq });
    sface(paj, t, { feliz: t > T.dos0 ? -0.6 : t > T.solo0 ? 1 : 0.4, jaw: t > T.solo0 && t < T.solo0 + 0.6 ? 0.6 : 0, look: t > T.dos0 ? [-8, 4] : [6, -4], ceja: t > T.solo0 && t < T.dos0 ? 12 : 0, seed: 0.4 });
    set(ring, { x: 425, y: 594, sy: 0.32, s: pop(t, T.solo0 - 0.1, 0.3), o: t > T.solo0 - 0.1 && t < T.casi0 ? 1 : 0 });
    bubs.forEach((b, i) => { const t0 = T.casi0 + 0.3 + i * 0.35; set(b, { s: pop(t, t0, 0.3), o: t > t0 ? 1 : 0, r: b.r + wobble(t, 0.8, 1.5, i) }); });
  };
}, { sfx: false });

/* ===================== L1 · pelea en internet: móvil con comentarios que se insultan → pizarra TOPOLOGÍA ===================== */
plano(L(1) - 0.1, L(2) - 0.08, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 380, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const head = texto(c, 272, 'peleas en ' + hlSpan('internet', 'ihl'), { size: 88, z: 40 });
  const tel = box(cam, 300, 380, 600, 960, { zIndex: 5, background: '#1d1a22', border: `10px solid ${INK}`, borderRadius: '70px', boxShadow: `16px 18px 0 ${SH}` });
  box(tel, 26, 60, 528, 820, { background: CRE, borderRadius: '30px' }); box(tel, 230, 24, 120, 16, { background: '#444', borderRadius: '8px' });
  const COM = [['¡Son DOS, uno arriba y otro abajo!', NAR], ['¿DOS? Es UNO, genio', PINK], ['CERO. Es plástico. Fin.', '#7fb2ff'], ['te bloqueo', NAR], ['¡¡que es UNO!!', PINK]];
  const rows = COM.map(([s, col], i) => { const r = box(cam, 0, 0, 520, 150, { zIndex: 20, transformOrigin: '0 50%' });
    const av = ENFADO(r, col, 22); set(av, { x: 0, y: 10 });
    el('div', r, { left: '128px', top: '14px', width: '380px', background: '#fff', border: `5px solid ${INK}`, borderRadius: '26px 26px 26px 6px', padding: '12px 18px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '36px', lineHeight: 1.1, color: INK, boxShadow: `5px 5px 0 ${INK}` }, s);
    r.av = av; return r; });
  const rayos = [0, 1, 2].map(() => RAYO(cam, 26));
  const pz = box(c, 150, 720, 780, 230, { zIndex: 45, background: '#2f4a3a', border: `14px solid #a2723f`, borderRadius: '18px', boxShadow: `12px 14px 0 ${SH}`, fontFamily: 'Patrick', fontSize: '150px', lineHeight: '200px', textAlign: 'center', color: '#fff', transformOrigin: '50% 50%', boxSizing: 'border-box' }, 'TOPOLOGÍA');
  const ok = box(c, 790, 640, 150, 150, { zIndex: 46, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 100 100" width="150" height="150" style="overflow:visible"><circle cx="50" cy="50" r="46" fill="#fff" stroke="${INK}" stroke-width="7"/><path d="M24,52 L42,70 L76,30" stroke="${VERDE}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`);
  COM.forEach((_, i) => sp(T.peleas + i * 0.42, i % 2 ? 'msg_out' : 'msg_in', 0.6)); sp(T.mates - 0.05, 'stamp', 0.9); sp(T.resuelve + 0.2, 'ding', 0.7); sp(T.parte, 'scratch', 0.4);
  shakeAt(T.mates, 0.3, 14);
  return t => {
    zoom(cam, t, L(1) - 0.1, L(2) - L(1), 0.06); set(ry, { r: -t * 5 });
    set(head, { r: -2 + wobble(t, 0.5, 0.6), o: t > L(1) ? 1 : 0, s: pop(t, L(1) - 0.05, 0.3) }); paint(c.querySelector('.ihl'), t, T.internet, 0.35);
    const fight = t > T.peleas && t < T.mates;
    set(tel, { r: fight ? Math.sin(t * 30) * 1.2 : wobble(t, 0.4, 1), s: pop(t, L(1) - 0.1, 0.35) });
    rows.forEach((r, i) => { const t0 = L(1) + 0.15 + i * 0.42; const scroll = Math.max(0, i - 3) * 0;
      set(r, { x: 330 + (i % 2) * 40, y: 470 + i * 160 - scroll, s: pop(t, t0, 0.3), o: t > t0 ? 1 : 0, r: fight ? Math.sin(t * 25 + i) * 1.5 : 0 });
      set(r.av, { x: 0, y: 10 + (fight ? Math.abs(Math.sin(t * 14 + i)) * -10 : 0), r: Math.sin(t * 9 + i) * 8 }); });
    rayos.forEach((e, i) => { const on = fight && ((t * 3 + i * 0.33) % 1) < 0.55; set(e, { x: [170, 850, 180][i], y: [560, 820, 860][i], o: on ? 1 : 0, s: 0.8 + 0.2 * Math.sin(t * 20 + i), r: [-15, 12, -8][i] }); });
    slam(pz, t, T.mates - 0.05, -3 + wobble(t, 0.4, 0.6));
    set(ok, { o: t > T.resuelve ? 1 : 0, s: pop(t, T.resuelve, 0.35) * (1 + 0.05 * Math.sin(t * 7)) });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* ===================== L3 · los tres bandos: carteles boca abajo («?») que se giran al nombrarlos ===================== */
plano(L(3) - 0.1, L(4) - 0.1, { background: '#bfe3f0' }, c => {
  const cam = CAM(c);
  box(cam, -200, 1150, 1480, 900, { zIndex: 1, background: '#9fca7a', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(100deg, rgba(43,33,24,.08) 0 6px, transparent 6px 60px)' });
  const nubes = [0, 1, 2].map(i => box(cam, 0, 0, 240, 84, { zIndex: 1, background: '#fff', border: `6px solid ${INK}`, borderRadius: '60px' }));
  const ht = texto(c, 272, 'tres ' + hlSpan('bandos', 'bhl'), { size: 96, z: 40 });
  const X = [185, 490, 795], NS = [2, 1, 0], TT = [T.del2, T.del1, T.del0];
  const carts = NS.map(n => CARTEL(cam, n, COLB[n], 14));
  const gente = NS.map((n, i) => PERS(cam, X[i] - 115, 990, 230, [{ ropa: NAR, pelo: 'corto', pcol: '#3a2a1e' }, { ropa: PINK, pelo: 'moño', pcol: '#6b4a2a', piel: '#c98d5e' }, { ropa: AZUL, pelo: 'largo', pcol: '#d9a441' }][i]));
  const subs = [['uno arriba, otro abajo', T.arriba3], ['un túnel de punta a punta', T.tunel3], ['plástico enrollado', T.plastico3]];
  const chs = subs.map(([s], i) => chip(c, 0, 0, s, { size: 44, bg: COLB[NS[i]], z: 42 }));
  const chinche = svgB(cam, 0, 0, 120, 120, '-60 -60 120 120', `<circle cx="0" cy="-14" r="34" fill="${RED}" stroke="${INK}" stroke-width="7"/><path d="M0,20 L0,58" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`, 30);
  const nox = box(cam, 0, 0, 130, 130, { zIndex: 31, transformOrigin: '50% 50%' }, XSVG);
  sp(T.bandos, 'drumroll', 0.35); TT.forEach(t0 => { sp(t0 - 0.15, 'cloth_whoosh', 0.7); sp(t0 + 0.2, 'ding', 0.5); }); sp(T.pinchado - 0.1, 'boing', 0.6); sp(T.pinchado + 0.2, 'error', 0.4);
  return t => {
    zoom(cam, t, L(3) - 0.1, L(4) - L(3), 0.05);
    nubes.forEach((n, i) => set(n, { x: ((i * 420 - t * 25) % 1500 + 1500) % 1500 - 260, y: 330 + i * 120 }));
    set(ht, { r: -2 + wobble(t, 0.5, 0.6), o: t < T.del2 - 0.1 ? 1 : 0 }); paint(c.querySelector('.bhl'), t, T.bandos + 0.2, 0.35);
    const foc = t < T.del2 - 0.2 ? -1 : t < T.del1 - 0.2 ? 0 : t < T.del0 - 0.2 ? 1 : t < T.nadie3 ? 2 : -1;
    carts.forEach((d, i) => { const t0 = L(3) + i * 0.18, k = gira(d, t, TT[i]), f = foc === i;
      set(d, { x: X[i] - 140, y: 480 + (f ? -20 : 0) + Math.sin(t * 2.4 + i * 2) * 8, s: pop(t, t0, 0.4) * (f ? 1.1 : 1), r: (f ? Math.sin(t * 6) * 4 : Math.sin(t * 1.8 + i) * 2), o: t > t0 ? (foc >= 0 && !f ? 0.55 : 1) : 0 });
      if (d.dz && k >= 1) { if (i === 0) d.dz.style.opacity = t > T.arriba3 ? 0.5 + 0.5 * Math.sin(t * 9) : 0; if (i === 1) d.dz.setAttribute('stroke-dashoffset', f1(-t * 90)); if (i === 2) d.dz.setAttribute('transform', `translate(0 ${f1(Math.sin(t * 5) * 4)})`); } });
    gente.forEach((g, i) => { const t0 = L(3) + i * 0.18, f = foc === i;
      set(g, { x: 0, y: f ? -Math.abs(Math.sin(t * 7)) * 18 : 0, s: pop(t, t0, 0.4), o: t > t0 ? (foc >= 0 && !f ? 0.6 : 1) : 0 });
      pFace(g, t, { jaw: f ? Math.abs(Math.sin(t * 13)) * 0.7 : 0, feliz: t > T.pinchado ? -0.5 : f ? 0.8 : 0.2, look: t > T.pinchado ? [(i - 1) * -6, 0] : [0, 2], ceja: t > T.pinchado ? -6 : f ? 8 : 0, seed: i }); });
    chs.forEach((e, i) => { const t0 = subs[i][1] - 0.1; set(e, { x: [60, 300, 520][i], y: 410, o: t > t0 && foc === i ? 1 : 0, s: pop(t, t0, 0.3), r: [-4, 3, -3][i] }); });
    const kp = p(t, T.nadie3 - 0.2, 0.5, E.outBounce);
    set(chinche, { x: 840, y: lerp(150, 520, kp), o: t > T.nadie3 - 0.2 ? 1 : 0, r: 20 });
    set(nox, { x: 835, y: 520, o: t > T.pinchado ? 1 : 0, s: pop(t, T.pinchado, 0.3) });
  };
});

/* ===================== L4a · ¿quién gana? → el matemático saca el libro TOPOLOGÍA ===================== */
plano(L(4) - 0.1, T.regla - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const hq = texto(c, 272, '¿quién ' + hlSpan('gana', 'ghl') + '?', { size: 100, z: 40 });
  const mini = [2, 1, 0].map((n, i) => BADGE(cam, String(n), [NAR, PINK, '#7fb2ff'][i], 130, 20));
  const prof = PERS(cam, 470, 860, 380, { ropa: '#5a4a6a', pelo: 'calvo', pcol: '#bbbbbb', barba: true, gorro: 'birrete' });
  const gaf = svgB(cam, 0, 0, 200, 70, '0 0 200 70', `<circle cx="50" cy="35" r="30" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="35" r="30" fill="rgba(255,255,255,.3)" stroke="${INK}" stroke-width="8"/><path d="M80,35 H120" stroke="${INK}" stroke-width="8"/>`, 9);
  const lib = LIBRO(cam, 22, 380);
  const tag = chip(c, 470, 760, 'los matemáticos', { size: 54, bg: INK, z: 42 });
  const brillo = rays(cam, 0, 0, 700, 16, 'rgba(255,255,255,.55)', 'rgba(0,0,0,0)', 21);
  sp(T.gana, 'boing', 0.5); sp(T.matematicos - 0.1, 'pop', 0.6); sp(T.topo4 - 0.1, 'paper', 0.8); sp(T.topo4 + 0.15, 'sparkle', 0.7);
  return t => {
    zoom(cam, t, L(4) - 0.1, T.regla - L(4), 0.06); set(ry, { r: t * 5 });
    set(hq, { r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.ghl'), t, T.gana, 0.35);
    mini.forEach((b, i) => set(b, { x: 200 + i * 260, y: 440 + Math.abs(Math.sin(t * 6 + i)) * -30, r: Math.sin(t * 8 + i) * 10, s: pop(t, L(4) + i * 0.1, 0.3) }));
    const kp = p(t, T.matematicos - 0.25, 0.45, E.outBack);
    set(prof, { x: lerp(500, 0, clamp(kp)), y: 0, o: t > T.matematicos - 0.25 ? 1 : 0 });
    pFace(prof, t, { jaw: t > T.matematicos && t < T.regla ? Math.abs(Math.sin(t * 12)) * 0.5 : 0, feliz: 0.6, look: [-6, 4], ceja: t > T.topo4 ? 10 : 0, seed: 0.2 });
    set(gaf, { x: lerp(500, 0, clamp(kp)) + 560, y: 1038, s: 1.2, o: t > T.matematicos - 0.25 ? 1 : 0 });
    vis(tag, t, T.matematicos, T.topo4 - 0.1, { r: -3 });
    const kl = p(t, T.topo4 - 0.15, 0.5, E.outBack);
    set(lib, { x: 330, y: lerp(1500, 1010, kl), r: lerp(30, -6, clamp(kl)) + wobble(t, 0.5, 1.5), o: t > T.topo4 - 0.15 ? 1 : 0 });
    set(brillo, { x: 70, y: 860, r: t * 30, o: t > T.topo4 ? 1 : 0, s: pop(t, T.topo4, 0.4) * 0.8 });
  };
});

/* ===================== L4b · UNA SOLA REGLA: plastilina que se estira, se aplasta y se dobla; tijeras ✗ y cola ✗ ===================== */
plano(T.regla - 0.1, L(5) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  box(cam, -100, 1150, 1280, 900, { zIndex: 1, background: '#c99a64', borderTop: `8px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 4px, transparent 4px 140px)' });
  const card = box(c, 60, 290, 960, 330, { zIndex: 40, background: CRE, border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `12px 14px 0 ${SH}`, textAlign: 'center', boxSizing: 'border-box', transformOrigin: '50% 0%' });
  card.innerHTML = `<div style="font-family:Rye;font-size:58px;color:${RED};margin-top:16px">UNA SOLA REGLA</div>
   <div style="font-family:Bricolage;font-weight:800;font-size:54px;line-height:84px;color:${INK};white-space:nowrap"><span class="i0">estirar ${OKS}</span>&nbsp; <span class="i1">aplastar ${OKS}</span>&nbsp; <span class="i2">doblar ${OKS}</span></div>
   <div style="font-family:Bricolage;font-weight:800;font-size:60px;line-height:84px;color:${RED};white-space:nowrap"><span class="i3">nunca cortar ${KOS}</span>&nbsp;&nbsp; <span class="i4">ni pegar ${KOS}</span></div>`;
  const its = [0, 1, 2, 3, 4].map(i => card.querySelector('.i' + i)), ti = [T.estirar, T.aplastar, T.doblar, T.cortar, T.pegar4];
  its.forEach(e => { e.style.display = 'inline-block'; });
  const pl = svgB(cam, 40, 560, 1000, 760, '-500 -380 1000 760', `<path class="pls" stroke="${SH}" stroke-linecap="round" fill="none" transform="translate(16 18)"/><path class="plo" stroke="${INK}" stroke-linecap="round" fill="none"/><path class="pl" stroke="#4fc3a1" stroke-linecap="round" fill="none"/><path class="plg" stroke="rgba(255,255,255,.55)" stroke-linecap="round" fill="none"/>
    <g class="ojos"><ellipse cx="-36" cy="0" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="36" cy="0" rx="20" ry="24" fill="#fff" stroke="${INK}" stroke-width="6"/><circle class="pu" cx="-34" cy="4" r="9" fill="${INK}"/><circle class="pu" cx="38" cy="4" r="9" fill="${INK}"/><path class="bo" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`, 10);
  const [pls, plo, pll, plg, ojos, bo] = ['.pls', '.plo', '.pl', '.plg', '.ojos', '.bo'].map(k => pl.querySelector(k));
  const tij = TIJERA(c, 50), cola = COLA(c, 50), x1 = box(c, 0, 0, 250, 250, { zIndex: 52, transformOrigin: '50% 50%' }, XSVG), x2 = box(c, 0, 0, 250, 250, { zIndex: 52, transformOrigin: '50% 50%' }, XSVG);
  // formas: [x1,y1,cx,cy,x2,y2,grosor]
  const BOLA = [0, 160, 0, 160, 0.1, 160, 300], LARGA = [0, -150, 0, 60, 0, 270, 170], PLANA = [-300, 250, 0, 250, 300, 250, 130], CURVA = [-240, 230, 0, -120, 240, 230, 150];
  const mix = (a, b, k) => a.map((v, i) => lerp(v, b[i], k));
  ti.forEach((t0, i) => sp(t0, i < 3 ? 'squish' : 'error', 0.6)); sp(T.cortar - 0.3, 'whoosh', 0.6); sp(T.cortar + 0.1, 'click', 0.8); sp(T.pegar4 - 0.3, 'whoosh', 0.6);
  shakeAt(T.cortar + 0.1, 0.25, 10); shakeAt(T.pegar4 + 0.15, 0.25, 10);
  return t => {
    zoom(cam, t, T.regla - 0.1, L(5) - T.regla, 0.04);
    set(card, { sy: p(t, T.regla - 0.05, 0.4, E.outBack), r: wobble(t, 0.4, 0.6) });
    its.forEach((e, i) => set(e, { o: t > ti[i] - 0.1 ? 1 : 0.12, s: t > ti[i] - 0.1 ? pop(t, ti[i] - 0.1, 0.3) : 1 }));
    const kE = p(t, T.estirar - 0.1, 0.45, E.outBack), kA = p(t, T.aplastar - 0.1, 0.45, E.outBack), kD = p(t, T.doblar - 0.1, 0.5, E.outBack), kB = p(t, T.pero - 0.1, 0.4, E.outCubic);
    let g = mix(mix(mix(mix(BOLA, LARGA, kE), PLANA, kA), CURVA, kD), BOLA, kB);
    const jig = 1 + 0.03 * Math.sin(t * 8);
    const d = `M${f1(g[0])},${f1(g[1])} Q${f1(g[2])},${f1(g[3])} ${f1(g[4])},${f1(g[5])}`;
    [[pls, g[6] * jig], [plo, g[6] * jig + 18], [pll, g[6] * jig], [plg, g[6] * 0.2]].forEach(([e, w]) => { e.setAttribute('d', d); e.setAttribute('stroke-width', f1(w)); });
    plg.setAttribute('d', `M${f1(g[0] - 20)},${f1(g[1] - g[6] * 0.25)} Q${f1(g[2] - 20)},${f1(g[3] - g[6] * 0.25)} ${f1(g[4] - 20)},${f1(g[5] - g[6] * 0.25)}`);
    const mx = 0.25 * g[0] + 0.5 * g[2] + 0.25 * g[4], my = 0.25 * g[1] + 0.5 * g[3] + 0.25 * g[5];
    const miedo = t > T.cortar - 0.3;
    ojos.setAttribute('transform', `translate(${f1(mx)} ${f1(my - 10)})${((t + 0.3) % 2.7) < 0.12 ? ' scale(1 0.15)' : ''}`);
    bo.setAttribute('d', miedo ? 'M-22,52 Q0,36 22,52' : 'M-24,40 Q0,62 24,40');
    pl.querySelectorAll('.pu').forEach(e => e.setAttribute('transform', miedo ? `translate(${f1(Math.sin(t * 30) * 3)} -2)` : ''));
    const kt = p(t, T.cortar - 0.35, 0.35, E.outCubic); set(tij, { x: lerp(1100, 640, kt), y: 760, r: -20, o: t > T.cortar - 0.35 ? 1 : 0 }); corta(tij, Math.abs(Math.sin(Math.max(0, t - T.cortar) * 14)));
    slam(x1, t, T.cortar + 0.15, 0, 1); set(x1, { x: 660, y: 790, o: t > T.cortar + 0.15 ? 1 : 0, s: t < T.cortar + 0.15 ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.cortar - 0.15) / 0.22))) });
    const kc = p(t, T.pegar4 - 0.35, 0.35, E.outCubic); set(cola, { x: lerp(-300, 140, kc), y: 740, r: 24 + Math.sin(t * 8) * 4, o: t > T.pegar4 - 0.35 ? 1 : 0 });
    set(x2, { x: 120, y: 790, o: t > T.pegar4 + 0.15 ? 1 : 0, s: t < T.pegar4 + 0.15 ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.pegar4 - 0.15) / 0.22))) });
  };
});

/* ===================== L5 · la pajita se aplasta desde arriba: más bajita y gordita → ¡UN DONUT! ===================== */
plano(L(5) - 0.1, L(6) - 0.1, { background: '#dfeee9', backgroundImage: 'linear-gradient(rgba(43,33,24,.13) 4px, transparent 4px), linear-gradient(90deg, rgba(43,33,24,.13) 4px, transparent 4px)', backgroundSize: '120px 120px' }, c => {
  const cam = CAM(c);
  box(cam, -100, 1180, 1280, 900, { zIndex: 1, background: '#c99a64', borderTop: `10px solid ${INK}`, backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 4px, transparent 4px 140px)' });
  const rg = chip(c, 70, 420, 'aplastar ' + OKS, { size: 58, bg: '#fff', color: INK, z: 42 });
  const paj = TUBE(cam, 1000, { w: 170, h: 700, ry: 26, z: 10 });
  const tabla = box(cam, 0, 0, 760, 70, { zIndex: 14, background: '#a2723f', border: `8px solid ${INK}`, borderRadius: '14px', boxShadow: `10px 10px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.18) 0 3px, transparent 3px 18px)', boxSizing: 'border-box' });
  const manos = [0, 1].map(i => { const h = box(cam, 0, 0, 200, 200, { zIndex: 15 }); h.innerHTML = `<svg viewBox="-70 -70 140 140" width="200" height="200" style="overflow:visible">${gloveHand(0, 0, 180, 1.3)}</svg>`; return h; });
  const flechas = [0, 1].map(() => box(cam, 0, 0, 90, 130, { zIndex: 13 }, `<svg viewBox="0 0 90 130" width="90" height="130" style="overflow:visible"><path d="M45,120 L85,60 L60,60 L60,0 L30,0 L30,60 L5,60 Z" fill="${RED}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></svg>`));
  const qm = [[150, 700], [820, 640], [190, 960], [800, 980]].map((q, i) => qMark(c, q[0], q[1], 110, i % 2 ? PINK : YEL));
  const don = DONUT(cam, 1000, 12);
  const est = [0, 1, 2, 3].map(i => ESTRELLA(cam, 80, i % 2 ? YEL : '#fff'));
  const hd = texto(c, 272, 'bajita y ' + hlSpan('gordita', 'ghl2'), { size: 92, z: 40 });
  sello(c, 450, '¡UN DONUT!', T.donut5, { size: 130, r: -6 });
  sp(T.coge, 'pop', 0.6); sp(T.aplastala - 0.2, 'whoosh', 0.7); sp(T.aplastala + 0.3, 'squish', 0.9); sp(T.bajita, 'squish', 0.7); sp(T.gordita, 'squish', 0.8); sp(T.queda - 0.1, 'swoosh_up', 0.5); sp(T.donut5 + 0.1, 'sparkle', 0.8); sp(T.donut5 + 0.3, 'tada', 0.6);
  const K0 = T.aplastala + 0.15, K1 = T.gordita + 0.5, YB = 1180;
  return t => {
    zoom(cam, t, L(5) - 0.1, L(6) - L(5), 0.05);
    vis(rg, t, T.coge - 0.2, 99, { r: -3 });
    const k = p(t, K0, K1 - K0, E.inOutCubic), bump = t > K0 && t < K1 ? Math.sin(t * 22) * 0.012 : 0;
    const w = lerp(170, 600, k), h = lerp(700, 170, k) * (1 - bump), ryy = lerp(26, 110, k);
    paj.geo(w, h, ryy, lerp(0.7, 0.4, k));
    const morph = p(t, T.donut5 - 0.15, 0.3, E.inOutCubic);
    set(paj, { x: 40, y: YB - h / 2 - 500 - 14 + (1 - p(t, L(5) - 0.1, 0.6, E.outBounce)) * -900, o: 1 - morph, s: 1 - morph * 0.2 });
    sface(paj, t, { feliz: t > T.queda ? 0.9 : t > K0 ? -0.4 : 0.6, jaw: t > K0 && t < K1 ? 0.25 : 0, sq: t > K0 && t < K1 ? 0.75 : 1, look: t < K0 ? [0, -8] : [0, 0], ceja: t > K0 && t < K1 ? -6 : 0, closed: t > K0 && t < K1 && Math.sin(t * 6) > 0, seed: 0.3 });
    const top = YB - h - 14, kd = p(t, T.aplastala - 0.25, 0.4, E.outCubic), up = p(t, T.queda - 0.25, 0.4, E.inCubic);
    const ty = (t < K0 ? lerp(-300, top - 70, kd) : top - 70) - up * 1200;
    set(tabla, { x: 160, y: ty, o: t > T.aplastala - 0.25 ? 1 : 0, r: Math.sin(t * 18) * (t > K0 && t < K1 ? 1 : 0) });
    manos.forEach((m, i) => set(m, { x: [260, 620][i], y: ty - 150 + (t > K0 && t < K1 ? Math.sin(t * 22 + i) * 6 : 0), o: t > T.aplastala - 0.25 ? 1 : 0 }));
    flechas.forEach((f, i) => set(f, { x: [110, 880][i], y: ty - 60 + ((t * 2) % 1) * 60, o: t > K0 && t < K1 ? 1 : 0 }));
    set(hd, { o: t > T.bajita - 0.1 && t < T.donut5 - 0.15 ? 1 : 0, s: pop(t, T.bajita - 0.1, 0.3), r: -2 }); paint(c.querySelector('.ghl2'), t, T.gordita, 0.3);
    qm.forEach((q, i) => { const t0 = T.queda + i * 0.12; set(q, { o: t > t0 && t < T.donut5 - 0.1 ? 1 : 0, s: pop(t, t0, 0.3), r: Math.sin(t * 5 + i) * 12 }); });
    set(don, { x: 40, y: YB - 500 - 140, o: morph, s: lerp(0.6, 1, E.outBack(morph)) * (1 + 0.025 * Math.sin(t * 5)), r: wobble(t, 0.4, 1.5) }); dface(don, t);
    est.forEach((e, i) => { const a = t * 2.5 + i * 1.57; set(e, { x: 500 + Math.cos(a) * 420, y: 1020 + Math.sin(a) * 200, s: t > T.donut5 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)) : 0, r: t * 140 }); });
  };
});

/* ===================== L6a · el donut tiene UN agujero: flecha que entra y sale por el mismo túnel ===================== */
plano(L(6) - 0.1, T.bocas6 - 0.1, { background: '#ffe9f2', backgroundImage: 'repeating-radial-gradient(circle at 540px 900px, rgba(255,62,165,.10) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const don = DONUT(cam, 980, 10);
  const fl = svgB(cam, 50, 300, 980, 980, '-500 -500 1000 1000', `<path class="a1" d="M0,-470 L0,-60" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path class="a1b" d="M0,-470 L0,-60" stroke="${YEL}" stroke-width="22" stroke-dasharray="40 26" stroke-linecap="round"/>
    <path class="a2" d="M0,250 L0,430" stroke="${INK}" stroke-width="40" stroke-linecap="round"/><path class="a2b" d="M0,250 L0,430" stroke="${YEL}" stroke-width="22" stroke-dasharray="40 26" stroke-linecap="round"/><path class="hd" d="M-50,420 L0,490 L50,420 Z" fill="${YEL}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>`, 14);
  const a1b = fl.querySelector('.a1b'), a2b = fl.querySelector('.a2b'), [a1, a2, hdd] = ['.a1', '.a2', '.hd'].map(k => fl.querySelector(k));
  const uno = BADGE(c, '1', YEL, 240, 40);
  const ce = chip(c, 600, 380, 'entra…', { size: 56, bg: INK, z: 42 }), cs = chip(c, 620, 1180, '…y sale', { size: 56, bg: INK, z: 42 });
  const us = box(c, 60, 610, 430, 130, { zIndex: 45, border: `11px solid ${RED}`, color: RED, borderRadius: '18px', fontFamily: 'Rye', fontSize: '80px', lineHeight: '106px', textAlign: 'center', background: 'rgba(255,255,255,.85)', transformOrigin: '50% 50%', boxSizing: 'border-box', whiteSpace: 'nowrap' }, 'UNO SOLO');
  sp(T.uno6, 'stamp', 1.0); shakeAt(T.uno6, 0.3, 12);
  sp(T.agujero6, 'ding', 0.8); sp(T.agujero6 + 0.15, 'pop2', 0.6); sp(T.donut6 + 0.4, 'whoosh', 0.5);
  return t => {
    zoom(cam, t, L(6) - 0.1, T.bocas6 - L(6), 0.06);
    set(don, { x: 50, y: 260 + 40, r: wobble(t, 0.4, 1.2), s: 1 + 0.02 * Math.sin(t * 4) }); dface(don, t, [0, -6]);
    const kf = p(t, T.donut6 + 0.3, 0.7, E.inOutCubic);
    a1.style.opacity = a1b.style.opacity = kf > 0 ? 1 : 0; a2.style.opacity = a2b.style.opacity = hdd.style.opacity = kf >= 1 ? 1 : 0;
    a1b.setAttribute('stroke-dashoffset', f1(-t * 120)); a2b.setAttribute('stroke-dashoffset', f1(-t * 120));
    set(uno, { x: 110, y: 330 + Math.sin(t * 4) * 10, o: t > T.agujero6 ? 1 : 0, s: t < T.agujero6 ? 0 : lerp(2.2, 1, E.outCubic(clamp((t - T.agujero6) / 0.25))) * (1 + 0.05 * Math.sin(t * 6)), r: -8 });
    vis(ce, t, T.donut6 + 0.4, 99, { r: -3 }); vis(cs, t, T.donut6 + 1.0, 99, { r: 3 });
    slam(us, t, T.uno6, -6);
  };
});

/* ===================== L6b · la pajita vuelve a crecer: BOCA de entrada arriba, BOCA de salida abajo, el mismo túnel ===================== */
plano(T.bocas6 - 0.1, L(7) - 0.1, { background: '#dfeee9' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 380, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const paj = TUBE(cam, 1000, { w: 600, h: 170, ry: 110, z: 10 });
  const tun = svgB(cam, 40, 380, 1000, 1000, '-500 -500 1000 1000', `<path class="tu" d="M0,-330 L0,420" stroke="${YEL}" stroke-width="20" stroke-dasharray="36 24" stroke-linecap="round" fill="none"/><path d="M-46,404 L0,470 L46,404 Z" fill="${YEL}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`, 14);
  const tu = tun.querySelector('.tu');
  const ce = chip(c, 600, 430, 'ENTRADA', { size: 62, bg: VERDE, z: 42 }), cs = chip(c, 600, 1220, 'SALIDA', { size: 62, bg: RED, z: 42 });
  const lc = [0, 1].map(() => box(c, 0, 0, 120, 14, { zIndex: 41, background: INK, borderRadius: '7px', transformOrigin: '0 50%' }));
  const hd = texto(c, 272, 'el ' + hlSpan('mismo', 'mhl') + ' túnel', { size: 96, z: 40 });
  const b2 = chip(c, 70, 600, '2 bocas', { size: 60, bg: PINK, z: 42 });
  sp(T.bocas6, 'swoosh_up', 0.7); sp(T.entrada, 'pop', 0.7); sp(T.salida, 'pop2', 0.7); sp(T.tunel6, 'ding', 0.8);
  return t => {
    zoom(cam, t, T.bocas6 - 0.1, L(7) - T.bocas6, 0.04); set(ry, { r: t * 5 });
    const k = p(t, T.bocas6 - 0.05, 0.75, E.outBack);
    const w = lerp(600, 220, k), h = lerp(170, 780, clamp(k)), ryy = lerp(110, 34, clamp(k));
    paj.geo(w, h, ryy, lerp(0.4, 0.72, clamp(k)));
    set(paj, { x: 40, y: 880 - 500, r: wobble(t, 0.4, 1.5) });
    sface(paj, t, { feliz: 0.9, jaw: 0, look: t > T.salida ? [0, 8] : [0, -8], seed: 1.1 });
    set(tun, { o: t > T.entrada - 0.1 ? 1 : 0 }); tu.setAttribute('stroke-dashoffset', f1(-t * 140)); tu.style.opacity = t > T.tunel6 ? 0.6 + 0.4 * Math.sin(t * 12) : 1;
    vis(b2, t, T.bocas6, 99, { r: -4 });
    vis(ce, t, T.entrada - 0.05, 99, { r: -3 }); vis(cs, t, T.salida - 0.05, 99, { r: 3 });
    set(lc[0], { x: 470, y: 470, sx: p(t, T.entrada, 0.3) * 1.1, o: t > T.entrada ? 1 : 0, r: 10 }); set(lc[1], { x: 470, y: 1262, sx: p(t, T.salida, 0.3) * 1.1, o: t > T.salida ? 1 : 0, r: -4 });
    set(hd, { o: t > T.tunel6 - 0.2 ? 1 : 0, s: pop(t, T.tunel6 - 0.2, 0.3), r: -2 }); paint(c.querySelector('.mhl'), t, T.tunel6, 0.3);
  };
});

/* ===================== L7a · ¿y los del cero? se rascan la cabeza; la lupa busca el detalle ===================== */
plano(L(7) - 0.1, T.hacer7 - 0.1, { background: '#bfe3f0' }, c => {
  const cam = CAM(c);
  box(cam, -200, 1250, 1480, 900, { zIndex: 1, background: '#9fca7a', borderTop: `8px solid ${INK}` });
  const car = CARTEL(cam, 0, AZUL, 14); set(car.bk, { o: 0 });
  const per = PERS(cam, 560, 1010, 300, { ropa: AZUL, pelo: 'largo', pcol: '#d9a441' });
  const qs = [[880, 760], [520, 690], [860, 1000]].map((q, i) => qMark(c, q[0], q[1], 120, i % 2 ? PINK : YEL));
  const hd = texto(c, 272, '¿y los del ' + hlSpan('cero', 'chl') + '?', { size: 96, z: 40 });
  const ch = chip(c, 380, 450, 'se olvidan de un detalle…', { size: 54, bg: RED, z: 42 });
  const lupa = LUPA(cam, 40);
  sp(T.cero7, 'boing', 0.6); sp(T.olvidan, 'sad', 0.4); sp(T.detalle - 0.2, 'whoosh', 0.6); sp(T.detalle + 0.2, 'ding', 0.6);
  return t => {
    const kz = p(t, T.detalle - 0.1, 0.6, E.inOutCubic);
    set(cam, { s: lerp(1.02, 1.6, kz), x: lerp(0, 288, kz), y: lerp(0, 112, kz) });
    set(car, { x: 220, y: 520 + Math.sin(t * 2) * 6, r: Math.sin(t * 1.6) * 2, s: pop(t, L(7) - 0.1, 0.35) }); set(car.fr, { o: 1 });
    set(per, { x: 0, y: Math.sin(t * 3) * 4 }); pFace(per, t, { jaw: 0, feliz: -0.3, look: [-8, -4], ceja: 10 + Math.sin(t * 6) * 4, seed: 0.6 });
    qs.forEach((q, i) => set(q, { s: pop(t, L(7) + i * 0.15, 0.3), r: Math.sin(t * 5 + i) * 14, o: t > L(7) + i * 0.15 && kz < 0.3 ? 1 : 0 }));
    set(hd, { r: -2 + wobble(t, 0.5, 0.6), o: kz < 0.3 ? 1 : 0 }); paint(c.querySelector('.chl'), t, T.cero7 + 0.3, 0.35);
    vis(ch, t, T.olvidan, 99, { r: -3 });
    const kl = p(t, T.detalle - 0.25, 0.5, E.outCubic); set(lupa, { x: lerp(1100, 230, kl), y: lerp(1300, 700, kl) + Math.sin(t * 5) * 6, r: -10, o: t > T.detalle - 0.25 ? 1 : 0 });
  };
});

/* ===================== L7b · la lámina se ENROLLA, los bordes se PEGAN (gota de cola) → aparece el agujero ===================== */
plano(T.hacer7 - 0.1, L(8) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 380, 1400, 24, 'rgba(255,230,0,.22)', 'rgba(0,0,0,0)', 0);
  const rg = box(c, 90, 290, 900, 120, { zIndex: 40, background: CRE, border: `8px solid ${INK}`, borderRadius: '60px', boxShadow: `10px 10px 0 ${SH}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '62px', lineHeight: '104px', textAlign: 'center', color: INK, whiteSpace: 'nowrap', boxSizing: 'border-box' },
    `cortar ${KOS} &nbsp;·&nbsp; <span class="pg" style="display:inline-block;padding:0 18px;border-radius:20px;transform-origin:50% 50%">PEGAR ${KOS}</span>`);
  const pg = rg.querySelector('.pg');
  const R = 130, LEN = 2 * Math.PI * R;
  const tira = svgB(cam, 40, 380, 1000, 1000, '-500 -500 1000 1000', `<circle class="hu" cx="0" cy="0" r="${R - 22}" fill="${HUECO}"/><circle class="hg" cx="0" cy="0" r="${R - 22}" fill="none" stroke="${YEL}" stroke-width="14"/>
    <path class="t0" stroke="${SH}" stroke-width="50" fill="none" stroke-linecap="butt" transform="translate(12 14)"/><path class="t1" stroke="${INK}" stroke-width="50" fill="none" stroke-linecap="butt"/><path class="t2" stroke="${ROSA_P}" stroke-width="36" fill="none" stroke-linecap="butt"/><path class="t3" stroke="#fff" stroke-width="36" stroke-dasharray="18 26" fill="none" stroke-linecap="butt"/>
    <circle class="sp" cx="0" cy="${-R}" r="34" fill="${YEL}" stroke="${INK}" stroke-width="6"/>`, 10);
  const [hu, hg, t0p, t1p, t2p, t3p, spl] = ['.hu', '.hg', '.t0', '.t1', '.t2', '.t3', '.sp'].map(k => tira.querySelector(k));
  const cola = COLA(cam, 30), gota = GOTA(cam, 31);
  const ch1 = chip(c, 80, 470, 'enrollar…', { size: 56, bg: AZUL, z: 42 }), ch2 = chip(c, 560, 470, '…y PEGAR', { size: 56, bg: RED, z: 42 });
  sello(c, 1060, '¡AGUJERO!', T.agujero7, { size: 120, r: -6 });
  sp(T.enrollaron - 0.1, 'cloth_whoosh', 0.8); sp(T.plastico7, 'paper', 0.5); sp(T.pegaron - 0.3, 'whoosh', 0.5); sp(T.pegaron + 0.15, 'gulp', 0.9); sp(T.bordes, 'squish', 0.7); sp(T.pegar7, 'error', 0.5); sp(T.crea, 'swoosh_up', 0.6);
  const TG = T.pegaron + 0.15;
  return t => {
    const kz = p(t, T.crea - 0.3, 0.8, E.inOutCubic); set(cam, { s: lerp(1.02, 1.25, kz), y: lerp(0, -60, kz) }); set(ry, { r: t * 5 });
    set(rg, { r: wobble(t, 0.4, 0.6), s: pop(t, T.hacer7 - 0.1, 0.35) });
    const hot = t > T.pegaron - 0.1; pg.style.background = hot ? (Math.sin(t * 10) > -0.3 ? RED : '#ff7a8a') : 'transparent'; pg.style.color = hot ? '#fff' : INK;
    set(pg, { s: t > T.pegar7 && t < T.pegar7 + 0.8 ? 1.15 : 1 });
    const kr = p(t, T.enrollaron - 0.1, T.bordes - T.enrollaron - 0.1, E.inOutCubic), kc = 0.15 + 0.83 * kr + (t > TG ? 0.02 * p(t, TG, 0.2) : 0);
    const kap = kc / R; let d = '';
    for (let i = 0; i <= 80; i++) { const s = -LEN / 2 + LEN * i / 80, th = kap * s; d += (i ? 'L' : 'M') + f1(Math.sin(th) / kap) + ',' + f1(R - (1 - Math.cos(th)) / kap); }
    [t0p, t1p, t2p, t3p].forEach(e => e.setAttribute('d', d));
    t3p.setAttribute('stroke-dashoffset', '0');
    spl.style.opacity = t > TG && t < TG + 0.6 ? 1 - p(t, TG + 0.3, 0.3) : 0; spl.setAttribute('r', f1(20 + 30 * p(t, TG, 0.25)));
    const kh = p(t, T.crea - 0.1, 0.5, E.outCubic); hu.style.opacity = f1(kh); hg.style.opacity = t > T.crea ? f1(0.5 + 0.5 * Math.sin(t * 10)) : 0;
    const kcB = p(t, T.pegaron - 0.6, 0.4, E.outCubic), out = p(t, TG + 0.4, 0.4, E.inCubic);
    set(cola, { x: 430 + out * 500, y: lerp(-400, 320, kcB), r: 160 + Math.sin(t * 9) * 4, o: t > T.pegaron - 0.6 && out < 1 ? 1 : 0 });
    const kg = p(t, T.pegaron - 0.1, 0.25, E.inCubic); set(gota, { x: 505, y: lerp(600, 880 - R - 45, kg), o: t > T.pegaron - 0.1 && t < TG ? 1 : 0 });
    vis(ch1, t, T.enrollaron - 0.05, 99, { r: -3 }); vis(ch2, t, T.pegaron, 99, { r: 3 });
  };
});

/* ===================== L8a · ¡OJO! un truco para contar agujeros en cualquier cosa ===================== */
plano(L(8) - 0.1, T.cuenta8 - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  sello(c, 280, '¡OJO!', T.ojo, { size: 130, r: -6 });
  const tr = chip(c, 330, 480, 'TRUCO', { size: 90, bg: PINK, z: 42 });
  const bomb = svgB(c, 760, 430, 150, 190, '-75 -95 150 190', `<path d="M-50,-10 C-50,-80 50,-80 50,-10 C50,20 26,30 22,56 L-22,56 C-26,30 -50,20 -50,-10 Z" fill="${YEL}" stroke="${INK}" stroke-width="8"/><rect x="-24" y="56" width="48" height="30" rx="6" fill="#c9c4b6" stroke="${INK}" stroke-width="7"/><path d="M0,-92 V-80 M-62,-62 l8,8 M62,-62 l-8,8 M-80,-12 h12 M80,-12 h-12" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`, 42);
  const objs = [VASO, PANTS].map((s, i) => svgB(cam, 0, 0, 300, 360, '-160 -200 320 400', s, 12));
  const don = DONUT(cam, 420, 12), paj = TUBE(cam, 420, { w: 150, h: 600, ry: 26, z: 12 });
  const all = [objs[0], paj, objs[1], don];
  const qs = all.map((_, i) => BADGE(cam, '?', [YEL, PINK, YEL, PINK][i], 90, 20));
  sp(T.truco, 'ding', 0.7); sp(T.cualquier - 0.2, 'whoosh', 0.6);
  return t => {
    zoom(cam, t, L(8) - 0.1, T.cuenta8 - L(8), 0.05); set(ry, { r: t * 6 });
    set(tr, { o: t > T.truco - 0.1 ? 1 : 0, s: pop(t, T.truco - 0.1, 0.35), r: -4 + wobble(t, 0.6, 2) });
    set(bomb, { o: t > T.truco ? 1 : 0, s: pop(t, T.truco, 0.35), r: Math.sin(t * 6) * 8 });
    const P0 = [[40, 820], [260, 780], [470, 820], [640, 820]];
    all.forEach((e, i) => { const t0 = T.cualquier - 0.3 + i * 0.15, k = p(t, t0, 0.45, E.outBack), [x, y] = P0[i];
      const w = e === don ? 420 : e === paj ? 420 : 300, hh = e === don ? 420 : e === paj ? 420 : 360;
      set(e, { x: lerp(1200, x, k) - (w - 300) / 2, y: y - (hh - 360) / 2 + Math.abs(Math.sin(t * 5 + i)) * -16, o: t > t0 ? 1 : 0, r: Math.sin(t * 3 + i) * 4, s: e === don ? 0.75 : 1 }); });
    sface(paj, t, { feliz: 0.6, look: [4, 0], seed: 2 }); dface(don, t);
    qs.forEach((q, i) => { const t0 = T.cualquier + 0.2 + i * 0.15; set(q, { x: P0[i][0] + 110, y: P0[i][1] - 40, s: pop(t, t0, 0.3), o: t > t0 ? 1 : 0, r: Math.sin(t * 6 + i) * 10 }); });
  };
});

/* ===================== L8b · BOCAS − 1 = AGUJEROS: pajita 2−1=1, vaso 1−1=0, pantalones 3−1=2 ===================== */
plano(T.cuenta8 - 0.1, L(9) - 0.1, { background: '#efe1c6' }, c => {
  const cam = CAM(c);
  const fo = box(c, 60, 290, 960, 190, { zIndex: 40, background: '#2f4a3a', border: `12px solid #a2723f`, borderRadius: '24px', boxShadow: `12px 14px 0 ${SH}`, fontFamily: 'Patrick', fontSize: '104px', lineHeight: '166px', textAlign: 'center', color: '#fff', whiteSpace: 'nowrap', transformOrigin: '50% 0%', boxSizing: 'border-box' },
    `<span class="f0">bocas</span> <span class="f1" style="color:${YEL}">− 1</span> <span class="f2">= agujeros</span>`);
  const [f0, f1e, f2] = ['.f0', '.f1', '.f2'].map(k => fo.querySelector(k)); [f0, f1e, f2].forEach(e => e.style.display = 'inline-block');
  const ROWS = [{ y: 520, t0: T.restale + 0.1, a: 2, b: 1, ta: T.restale + 0.4, tb: T.restale + 0.8 }, { y: 785, t0: T.vaso - 0.1, a: 1, b: 0, ta: T.unaboca, tb: T.cero8 }, { y: 1050, t0: T.pantalones - 0.1, a: 3, b: 2, ta: T.tres, tb: T.dos8 }];
  const rows = ROWS.map((R, i) => { const r = box(cam, 60, R.y, 880, 245, { zIndex: 10, background: CRE, border: `7px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 10px 0 ${SH}`, boxSizing: 'border-box', transformOrigin: '50% 50%' });
    el('div', r, { left: '280px', top: '28px', width: '580px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '118px', lineHeight: '180px', color: INK, whiteSpace: 'nowrap' },
      `<span class="a" style="display:inline-block;color:${AZUL}">${R.a}</span> − 1 <span class="b" style="display:inline-block">= <span style="color:${R.b ? VERDE : RED}">${R.b}</span></span>`);
    r.a = r.querySelector('.a'); r.b = r.querySelector('.b'); return r; });
  const icS = TUBE(cam, 330, { w: 150, h: 660, ry: 26, z: 14 }), icV = svgB(cam, 0, 0, 200, 240, '-160 -200 320 400', VASO, 14), icP = svgB(cam, 0, 0, 200, 240, '-160 -200 320 400', PANTS, 14);
  const ICP = [[icS, 70 - 30, 520 - 45], [icV, 90, 785 + 2], [icP, 90, 1050 + 2]];
  // bocas numeradas sobre cada icono: [fila, x, y, t]
  const BOC = [[0, 192, 525, T.restale + 0.2], [0, 192, 750, T.restale + 0.35], [1, 190, 835, T.unaboca], [2, 190, 1082, T.tres], [2, 136, 1270, T.tres + 0.25], [2, 244, 1270, T.tres + 0.5]];
  const bs = BOC.map((b, i) => BADGE(cam, String(i < 2 ? i + 1 : i < 3 ? 1 : i - 2), YEL, 70, 30));
  ROWS.forEach(R => { sp(R.t0, 'pop', 0.6); sp(R.ta, 'tick', 0.7); sp(R.tb, 'ding', 0.7); });
  BOC.forEach(b => sp(b[3], 'pop2', 0.4));
  return t => {
    zoom(cam, t, T.cuenta8 - 0.1, L(9) - T.cuenta8, 0.03);
    set(fo, { sy: p(t, T.cuenta8 - 0.1, 0.4, E.outBack), r: wobble(t, 0.4, 0.5) });
    set(f0, { o: t > T.cuenta8 ? 1 : 0.15, s: pop(t, T.cuenta8, 0.3) }); set(f1e, { o: t > T.restale - 0.1 ? 1 : 0.15, s: pop(t, T.restale - 0.1, 0.3) }); set(f2, { o: t > T.restale + 0.4 ? 1 : 0.15 });
    rows.forEach((r, i) => { const R = ROWS[i]; set(r, { o: t > R.t0 ? 1 : 0, s: pop(t, R.t0, 0.35), r: [-1, 1, -0.6][i] });
      set(r.a, { o: t > R.ta ? 1 : 0.1, s: pop(t, R.ta, 0.3) }); set(r.b, { o: t > R.tb ? 1 : 0.1, s: t > R.tb ? lerp(1.8, 1, E.outCubic(clamp((t - R.tb) / 0.25))) : 1 }); });
    ICP.forEach(([e, x, y], i) => { const R = ROWS[i]; set(e, { x, y: y + Math.sin(t * 3 + i) * 5, o: t > R.t0 ? 1 : 0, s: pop(t, R.t0, 0.35) * (e === icS ? 1 : 1) }); });
    sface(icS, t, { feliz: 0.7, seed: 1.7 });
    bs.forEach((b, i) => { const [, x, y, t0] = BOC[i]; set(b, { x: x - 35 + 0, y: y - 35, o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3) }); });
  };
});

/* ===================== L9 · O SEA: los del 1 levantan el trofeo; los del 2 y el 0, a estudiar TOPOLOGÍA ===================== */
plano(L(9) - 0.1, L(10) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, 40, 300, 1000, 24, 'rgba(255,230,0,.35)', 'rgba(0,0,0,0)', 0);
  const hd = texto(c, 272, 'los del ' + hlSpan('1', 'uhl') + ' tenían razón', { size: 86, z: 40 });
  const podio = box(cam, 340, 980, 400, 260, { zIndex: 5, background: GOLD, border: `8px solid ${INK}`, borderRadius: '14px 14px 0 0', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '150px', lineHeight: '230px', textAlign: 'center', color: INK, boxSizing: 'border-box' }, '1');
  const gan = PERS(cam, 400, 640, 280, { ropa: PINK, pelo: 'moño', pcol: '#6b4a2a', piel: '#c98d5e' });
  const tro = TROFEO(cam, 12);
  const conf = [...Array(18)].map((_, i) => box(cam, 0, 0, 22, 34, { zIndex: 16, background: [YEL, PINK, MENTA, '#6aa8ff'][i % 4], border: `3px solid ${INK}` }));
  const per = [PERS(cam, 700, 1010, 230, { ropa: NAR, pelo: 'corto', pcol: '#3a2a1e' }), PERS(cam, 760, 690, 170, { ropa: AZUL, pelo: 'largo', pcol: '#d9a441' })];
  const libs = [LIBRO(cam, 20, 240), LIBRO(cam, 20, 180)];
  const sud = [sudor(cam, 0, 0), sudor(cam, 0, 0)];
  const dem = chip(c, 600, 520, 'los demás…', { size: 52, bg: INK, z: 42 });
  sello(c, 1420 - 230, 'A ESTUDIAR', T.estudiar, { size: 96, r: -5, z: 60 });
  sp(T.osea, 'pop', 0.5); sp(T.del1_9, 'tada', 0.7); sp(T.razon, 'cash', 0.6); sp(T.demas, 'sad', 0.5); sp(T.topo9, 'paper', 0.8);
  return t => {
    zoom(cam, t, L(9) - 0.1, L(10) - L(9), 0.05); set(ry, { r: t * 8 });
    set(hd, { r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.uhl'), t, T.del1_9 + 0.2, 0.3);
    const jump = Math.abs(Math.sin(t * 6)) * -30;
    set(podio, { s: pop(t, L(9) - 0.05, 0.35) }); set(gan, { x: 0, y: jump, s: pop(t, T.del1_9 - 0.2, 0.35) });
    pFace(gan, t, { jaw: 0.6, feliz: 1, look: [0, -4], ceja: 10, seed: 0.1 });
    set(tro, { x: 650, y: 560 + jump, r: Math.sin(t * 8) * 10, o: t > T.del1_9 ? 1 : 0, s: pop(t, T.del1_9, 0.35) });
    conf.forEach((e, i) => { const k = ((t * 0.5 + i * 0.137) % 1); set(e, { x: 340 + ((i * 97) % 420) + Math.sin(t * 3 + i) * 30, y: 360 + k * 700, r: t * 300 + i * 40, o: t > T.razon ? 1 : 0 }); });
    per.forEach((g, i) => { const t0 = T.demas - 0.1 + i * 0.12; set(g, { x: 0, y: 0, s: pop(t, t0, 0.35), o: t > t0 ? 1 : 0 }); pFace(g, t, { jaw: 0, feliz: -0.7, look: [0, 8], ceja: -4, seed: i }); });
    libs.forEach((b, i) => { const t0 = T.topo9 - 0.1 + i * 0.12; set(b, { x: [690, 760][i], y: [1180, 820][i] + Math.sin(t * 4 + i) * 4, s: pop(t, t0, 0.35), o: t > t0 ? 1 : 0, r: [-6, 5][i] }); });
    sud.forEach((s, i) => set(s, { x: [920, 940][i], y: [1010, 700][i] + ((t * 1.5 + i * 0.5) % 1) * 60, o: t > T.estudiar ? 1 : 0 }));
    vis(dem, t, T.demas, 99, { r: 3 });
  };
});

/* L10 · CTA de seguir */
sigueme(10, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L11 · pregunta final: la camiseta con «¿?» (no se resuelve) */
preguntaFinal('¿Cuántos agujeros', 'tiene tu camiseta?', { size: 84, draw: c => {
  const cam = svgB(c, 330, 500, 420, 380, '-220 -200 440 400', CAMI, 20);
  FX.fns.push(t => { if (t > L(11) - 0.1 && t < L(12)) set(cam, { r: Math.sin(t * 3) * 5, s: pop(t, L(11), 0.4) * (1 + 0.03 * Math.sin(t * 6)), y: Math.abs(Math.sin(t * 4)) * -12 }); });
  [['3', YEL, 220, 900], ['4', PINK, 440, 900], ['me ha explotado la cabeza', '#9fd3c0', 150, 1010]].forEach(([s, col, x, y], i) => aparece(chip(c, x, y, s, { size: i < 2 ? 64 : 48, bg: col, color: INK }), L(11) + 2.0 + i * 0.45, { sfx: 'pop' }));
} });

/* L12 · cierre */
cierre(307, '¿Cuántos agujeros tiene una pajita?', ['MATES', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[L(1) + 0.3, L(2) - 0.15], [T.matematicos - 0.2, T.regla - 0.15], [T.demas - 0.2, L(10) - 0.15]],
  vecino: { sorpresa: [[T.peleas, T.peleas + 1]], risa: [[T.estudiar, T.estudiar + 1.2]], golpes: [T.mates] },
});
