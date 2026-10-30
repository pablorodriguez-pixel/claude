/* Ep. 308 · «¿Qué ahorra más: subir de 40 a 50 o de 80 a 130?» — tiempo por km = 3600 / v (s).
   40→90 s, 50→72 s (−18); 80→45 s, 130→27,7 s (−17). 50 km: a 100 = 30 min, a 120 = 25 min → 5 min.
   Sesgo del ahorro de tiempo (time-saving bias), Ola Svenson (psicólogo sueco).
   Frenada (1 s de reacción, 7 m/s²): a 100 paras en 82,9 m; a 120 llegas a ese punto a 73,5 km/h («unos setenta»); distancia de frenado ×1,44.
   HISTORIA con tu cuñado: domingo, 50 km hasta casa de tu madre; tú a 100, él a 120. Objetos-metáfora: tarjetas del quiz, cronómetro
   con cuenta atrás, hipérbola que se aplana, tira de 1 km con cronos, sello ¡GANA!, cerebro con «correr compensa» tachado,
   frenada cenital con física real, balanza «5 minutos» vs «todo lo demás». */
Story.prepara();
const T = {
  c40: Q('cuarenta'), c50: Q('cincuenta'), c80: Q('ochenta'), c130: Q('ciento treinta'),
  piensa: Q('piénsalo'), casi1: Q('casi todo'), falla: Q('falla'), resp: Q('respuesta'), olvidar: Q('olvidar'),
  cuento: Q('te lo cuento'), cun3: Q('cuñado'), domingo: Q('domingo'), km50: Q('cincuenta kilómetros'), casa: Q('casa de tu madre'),
  tu3: Q('tú vas'), cien: Q('cien'), el3: Q('él'), c120: Q('ciento veinte'), adel: Q('adelantando'),
  cuanto4: Q('cuánto llega'), cinco4: Q('cinco minutos'), tarda: Q('lo que tarda'), aparcar: Q('aparcar'),
  porque: Q('porque'), cada: Q('cada kilómetro'), menos5: Q('menos tiempo'), anterior: Q('anterior'), miralo: Q('míralo'), unkm: Q('un solo kilómetro'),
  a40: Q('a cuarenta'), n90: Q('noventa'), a50: Q('a cincuenta'), s72: Q('setenta y dos'), ahorrado: Q('ahorrado'), d18: Q('dieciocho'),
  a80: Q('a ochenta'), c45: Q('cuarenta y cinco'), a130: Q('ciento treinta'), d28: Q('veintiocho'), d17: Q('diecisiete'), menos7: Q('menos que'), c4050: Q('cuarenta a cincuenta'),
  psico: Q('psicólogo'), ola: Q('ola'), demostro: Q('demostró'), casi8: Q('casi todos'), hoy: Q('hoy'), sesgo: Q('sesgo'), cerebro: Q('cerebro'), correr: Q('correr'), compensa: Q('compensa'),
  ojo: Q('ojo'), peor: Q('peor'), ahorro9: Q('el ahorro'), aplana: Q('aplana'), frenada: Q('frenada'), no9: Q('no'), si9: Q('si tú'), obras: Q('obras'), paras: Q('te paras'), justo: Q('justo'),
  el9: Q('y él'), conos: Q('conos'), s70: Q('setenta'),
  osea: Q('o sea'), cun10: Q('cuñado'), gana: Q('gana'), cinco10: Q('cinco minutos'), juega: Q('se juega'), todo10: Q('todo lo demás'),
};
const ASF = '#6d6a72', AZUL = '#2b6fd6', VERDE = '#2e9e6b', NAR = '#F2983E', HIERBA = '#8fb46a', CRE = '#fbf6ea', CUN = '#d8402f', PIEL = '#e7b48c';
const OUT = `6px 6px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}`;
const deriva = (cam, t, t0, t1, a, b) => { const k = clamp((t - t0) / (t1 - t0)), e = k * k * (3 - 2 * k) * 0.5 + k * 0.5; const cx = lerp(a[0], b[0], e), cy = lerp(a[1], b[1], e), s = lerp(a[2], b[2], e);
  cam.style.transformOrigin = '0 0'; set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); return [cx, cy, s]; };
const vis = (e, t, t0, t1 = 1e9, o = {}) => set(e, Object.assign({ o: t > t0 && t < t1 ? 1 : 0, s: pop(t, t0, 0.35) }, o));
const golpeS = (e, t, t0, r = -5) => set(e, { o: t > t0 ? 1 : 0, s: t < t0 ? 0 : lerp(2, 1, E.outCubic(clamp((t - t0) / 0.22))), r });
const COLS = [NAR, AZUL, PINK, VERDE, YEL, '#8a4fd0'];

/* ---------- velocímetro (de ep305) ---------- */
const pt = (a, r) => [Math.sin(a * Math.PI / 180) * r, -Math.cos(a * Math.PI / 180) * r];
const vAng = v => -120 + clamp(v / 140) * 240;
const arcD = (r, a0, a1) => { const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r); return `M${f1(x0)},${f1(y0)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)}`; };
const SPEEDO = (c, w, z = 20) => { let tk = '';
  for (let v = 0; v <= 140; v += 10) { const a = vAng(v), [x0, y0] = pt(a, 174), [x1, y1] = pt(a, v % 20 ? 158 : 144);
    tk += `<path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${INK}" stroke-width="${v % 20 ? 4 : 8}" stroke-linecap="round"/>`;
    if (v % 20 === 0) { const [lx, ly] = pt(a, 114); tk += `<text x="${f1(lx)}" y="${f1(ly + 12)}" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">${v}</text>`; } }
  const d = box(c, 0, 0, w, w, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="-210 -210 420 420" width="${w}" height="${w}" style="overflow:visible">
   <circle cx="12" cy="14" r="202" fill="${SH}"/><circle r="202" fill="#2a2630" stroke="${INK}" stroke-width="10"/><circle class="cara" r="186" fill="${CRE}"/>
   <path d="${arcD(166, vAng(0), vAng(100))}" stroke="${VERDE}" stroke-width="18" fill="none" opacity=".55"/><path d="${arcD(166, vAng(100), vAng(140))}" stroke="${RED}" stroke-width="18" fill="none"/>
   ${tk}<rect x="-90" y="58" width="180" height="78" rx="14" fill="#1d1a22"/><text class="num" x="0" y="116" text-anchor="middle" font-family="PlexMono" font-weight="700" font-size="60" fill="${YEL}">0</text>
   <text x="0" y="170" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="28" fill="${INK}">km/h</text>
   <g class="ag"><path d="M0,24 L-13,0 L0,-164 L13,0 Z" fill="${RED}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g><circle r="22" fill="${INK}"/><circle r="8" fill="${GOLD}"/></svg>`);
  d.ag = d.querySelector('.ag'); d.num = d.querySelector('.num'); d.cara = d.querySelector('.cara'); return d; };
const setV = (s, v, txt) => { s.ag.setAttribute('transform', `rotate(${f1(vAng(v))})`); s.num.textContent = txt || Math.round(v); };

/* ---------- cronómetro (vb -130 -160 260 286): aguja .ag, anillo de cuenta atrás .rg, número .num ---------- */
const CRONO = (c, w, z = 20) => { let tk = ''; for (let i = 0; i < 12; i++) { const [x0, y0] = pt(i * 30, 100), [x1, y1] = pt(i * 30, i % 3 ? 90 : 80); tk += `<path d="M${f1(x0)},${f1(y0)} L${f1(x1)},${f1(y1)}" stroke="${INK}" stroke-width="${i % 3 ? 4 : 8}" stroke-linecap="round"/>`; }
  const d = box(c, 0, 0, w, w * 1.1, { zIndex: z, transformOrigin: '50% 55%' }, `<svg viewBox="-130 -160 260 286" width="${w}" height="${f1(w * 1.1)}" style="overflow:visible">
   <path d="M70,-94 l24,-24" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><rect x="-24" y="-156" width="48" height="32" rx="9" fill="${GOLD}" stroke="${INK}" stroke-width="7"/><rect x="-11" y="-128" width="22" height="20" fill="${INK}"/>
   <circle cx="9" cy="11" r="120" fill="${SH}"/><circle r="120" fill="#2a2630" stroke="${INK}" stroke-width="8"/><circle r="104" fill="${CRE}"/>${tk}
   <circle class="rg" r="112" fill="none" stroke="${YEL}" stroke-width="18" pathLength="1" stroke-dasharray="1 1" transform="rotate(-90)" opacity="0"/>
   <g class="ag"><path d="M0,16 L0,-88" stroke="${RED}" stroke-width="9" stroke-linecap="round"/></g><circle r="13" fill="${INK}"/>
   <text class="num" x="0" y="38" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="120" fill="${INK}" opacity="0"></text></svg>`);
  d.ag = d.querySelector('.ag'); d.rg = d.querySelector('.rg'); d.num = d.querySelector('.num'); return d; };
const aguja = (cr, a) => cr.ag.setAttribute('transform', `rotate(${f1(a)})`);

/* ---------- coche de perfil (vb 0 0 600 300) con conductor: tú o tu cuñado (gafas de sol, tupé, palillo y brazo por la ventanilla) ---------- */
const CAB_TU = `<g class="cab" transform="translate(392,124)"><circle r="28" fill="${PIEL}" stroke="${INK}" stroke-width="5"/>
  <path d="M-30,-4 C-32,-30 30,-34 30,-6 C20,-18 -18,-20 -30,-4 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="3"/>
  <circle cx="-8" cy="0" r="4" fill="${INK}"/><circle cx="12" cy="0" r="4" fill="${INK}"/><path class="boca" d="M-6,14 q8,4 16,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
const CAB_CUN = `<g class="cab" transform="translate(392,124)"><circle r="28" fill="${PIEL}" stroke="${INK}" stroke-width="5"/>
  <path d="M-30,-4 C-34,-28 -12,-38 2,-33 L12,-48 L17,-33 L30,-40 L28,-20 C32,-14 32,-8 30,-4 C20,-16 -18,-18 -30,-4 Z" fill="#241710" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-27,-9 H30 V0 Q24,11 13,10 Q4,9 2,0 H-4 Q-8,10 -16,10 Q-27,10 -27,0 Z" fill="#111" stroke="${INK}" stroke-width="3"/>
  <path class="glint" d="M-20,-5 l7,7 M10,-5 l7,7" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <path class="boca" d="M-8,15 Q6,21 19,9" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M15,13 L36,6" stroke="#d9b98a" stroke-width="4" stroke-linecap="round"/></g>`;
const BRAZO = `<g class="brazo"><path d="M364,148 L452,148" stroke="${INK}" stroke-width="32" stroke-linecap="round"/><path d="M364,148 L452,148" stroke="${PIEL}" stroke-width="21" stroke-linecap="round"/>
  <path d="M352,148 L392,148" stroke="${INK}" stroke-width="36"/><path d="M354,148 L390,148" stroke="#fff" stroke-width="25"/>
  <g class="mano"><path d="M452,148 L470,182" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M452,148 L470,182" stroke="${PIEL}" stroke-width="17" stroke-linecap="round"/></g></g>`;
const cocheInner = (col, cun) => `
  <path d="M30,232 L30,176 Q30,152 62,150 L176,142 L222,84 Q230,72 248,72 L418,72 Q436,72 446,86 L492,142 L556,150 Q588,156 588,184 L588,232 Z" fill="${col}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>
  <path d="M196,142 L236,92 L318,92 L318,142 Z M336,142 L336,92 L428,92 L470,142 Z" fill="#bfe3f5"/>
  ${cun ? CAB_CUN : CAB_TU}
  <rect x="186" y="139" width="292" height="15" fill="${col}"/>
  <path d="M196,142 L236,92 L318,92 L318,142 Z M336,142 L336,92 L428,92 L470,142 Z" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M40,196 H578" stroke="rgba(255,255,255,.6)" stroke-width="6"/>
  <path d="M327,150 V228" stroke="${INK}" stroke-width="5"/><path d="M296,170 h22" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  <rect x="558" y="160" width="28" height="22" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/>
  <rect class="freno" x="24" y="160" width="20" height="26" rx="5" fill="#7a1010" stroke="${INK}" stroke-width="4"/>
  <rect x="576" y="206" width="24" height="22" rx="6" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/><rect x="14" y="206" width="24" height="22" rx="6" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/>
  ${cun ? BRAZO : ''}
  ${[150, 470].map((x, i) => `<g class="w${i}"><circle cx="${x}" cy="234" r="48" fill="#24212a" stroke="${INK}" stroke-width="8"/><circle cx="${x}" cy="234" r="24" fill="#c9c4b6" stroke="${INK}" stroke-width="5"/><path d="M${x - 24},234 H${x + 24} M${x},210 V258" stroke="${INK}" stroke-width="5"/></g>`).join('')}`;
const COCHE = (c, w, col, cun, z = 10) => { const d = box(c, 0, 0, w, w / 2, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 600 300" width="${w}" height="${w / 2}" style="overflow:visible">${cocheInner(col, cun)}</svg>`);
  d.ws = [d.querySelector('.w0'), d.querySelector('.w1')]; d.freno = d.querySelector('.freno'); d.glint = d.querySelector('.glint'); d.boca = d.querySelector('.boca'); d.mano = d.querySelector('.mano'); return d; };
const rueda = (d, t, v = 1) => d.ws.forEach((g, i) => g.setAttribute('transform', `rotate(${f1((t * v * 500) % 360)} ${i ? 470 : 150} 234)`));
const frena = (d, on) => d.freno.setAttribute('fill', on ? '#ff3030' : '#7a1010');
const saluda = (d, t) => d.mano && d.mano.setAttribute('transform', `rotate(${f1(Math.sin(t * 7) * 14)} 452 148)`);
const pisa = (w, yb) => yb - w / 2 * 282 / 300;
/* coche visto desde arriba (vb 0 0 170 300, morro arriba): luces de freno .fr; el del cuñado saca el brazo */
const COCHE_T = (c, col, cun, z = 12) => { const d = figura(c, 0, 0, 170, 300, `<rect x="16" y="18" width="150" height="280" rx="44" fill="${SH}"/>
  ${cun ? `<path d="M30,150 L-8,160 L-10,178" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M30,150 L-8,160 L-10,178" stroke="${PIEL}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
  <rect x="10" y="10" width="150" height="280" rx="44" fill="${col}" stroke="${INK}" stroke-width="8"/><path d="M28,92 Q85,64 142,92 L134,128 Q85,114 36,128 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/>
  <path d="M36,226 Q85,240 134,226 L140,256 Q85,272 30,256 Z" fill="#bfe3f5" stroke="${INK}" stroke-width="6"/><rect x="40" y="136" width="90" height="84" rx="16" fill="rgba(255,255,255,.18)" stroke="${INK}" stroke-width="5"/>
  <rect x="24" y="14" width="30" height="16" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/><rect x="116" y="14" width="30" height="16" rx="6" fill="#fff6b0" stroke="${INK}" stroke-width="4"/>
  <g class="fr" opacity=".25"><rect x="20" y="272" width="36" height="16" rx="6" fill="#ff2a2a" stroke="${INK}" stroke-width="4"/><rect x="114" y="272" width="36" height="16" rx="6" fill="#ff2a2a" stroke="${INK}" stroke-width="4"/></g>`, '0 0 170 300', { z, origin: '50% 50%' });
  d.fr = d.querySelector('.fr'); return d; };

/* ---------- carretera de perfil (de ep305) ---------- */
function carretera(cam, o = {}) {
  const y = o.y || 1060;
  box(cam, -500, -700, 2080, y + 700, { zIndex: 0, background: 'linear-gradient(#a9d8f2 0%, #dff0f2 55%, #ffe1aa 100%)' });
  const sol = box(cam, o.solX || 720, o.solY || 420, 210, 210, { zIndex: 1, borderRadius: '50%', background: '#ffd23a', border: `8px solid ${INK}`, boxShadow: '0 0 0 34px rgba(255,210,58,.28), 0 0 0 70px rgba(255,210,58,.14)' });
  const nubes = [0, 1, 2].map(i => box(cam, 0, 0, 260, 90, { zIndex: 1, background: '#fff', border: `6px solid ${INK}`, borderRadius: '60px', opacity: 0.95 }));
  box(cam, -500, y - 250, 2080, 270, { zIndex: 2 }, `<svg width="2080" height="270" viewBox="0 0 2080 270" preserveAspectRatio="none"><path d="M0,270 L0,140 Q220,20 460,120 T940,90 T1420,130 T2080,70 L2080,270 Z" fill="#a8cf86" stroke="${INK}" stroke-width="6"/><path d="M0,270 L0,200 Q280,120 560,200 T1200,180 T2080,170 L2080,270 Z" fill="#86b665" stroke="${INK}" stroke-width="6"/></svg>`);
  box(cam, -500, y, 2080, o.h || 250, { zIndex: 3, background: ASF, borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}` });
  const lin = box(cam, -500, y + (o.h || 250) / 2 - 8, 2080, 14, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 80px, transparent 80px 160px)' });
  box(cam, -500, y + (o.h || 250) + 8, 2080, 1600, { zIndex: 1, background: HIERBA, backgroundImage: 'repeating-linear-gradient(100deg, rgba(43,33,24,.08) 0 6px, transparent 6px 60px)' });
  return { sol, lin, nubes, y };
}
const avanza = (R, t, v = 1) => { R.lin.style.backgroundPosition = `${f1(-(t * 900 * v) % 160)}px 0`; R.nubes.forEach((n, i) => set(n, { x: ((i * 520 - t * 30 * (1 + i * 0.3)) % 1600 + 1600) % 1600 - 300, y: 120 + i * 140 })); };
const VEL = (c, n = 5, z = 8) => [...Array(n)].map(() => box(c, 0, 0, 220, 12, { zIndex: z, background: '#fff', border: `3px solid ${INK}`, borderRadius: '8px' }));
const viento = (ls, t, x, y, on) => ls.forEach((l, i) => { const k = ((t * 3 + i / ls.length) % 1); set(l, { x: x - 60 - k * 360, y: y + i * 34, sx: 1 - k * 0.6, o: on ? 1 - k : 0 }); });

/* ---------- tarjetas del quiz, «¿?», caritas, sello en caja, cerebro, cono ---------- */
const CARTA = (c, x, y, txt, col, sav = '', z = 12) => box(c, x, y, 420, sav ? 420 : 330, { zIndex: z, background: col, border: `10px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 16px 0 ${SH}`, color: '#fff', textAlign: 'center', transformOrigin: '50% 50%', boxSizing: 'border-box' },
  `<div style="font-family:Bricolage;font-weight:800;font-size:44px;line-height:64px;margin-top:16px;text-shadow:3px 3px 0 ${INK}">subir de</div><div style="font-family:Bricolage;font-weight:800;font-size:100px;line-height:124px;text-shadow:${OUT};white-space:nowrap">${txt}</div>
   <div style="font-family:Bricolage;font-weight:800;font-size:44px;line-height:56px;text-shadow:3px 3px 0 ${INK}">km/h</div>${sav ? `<div style="display:inline-block;margin-top:12px;background:#fff;color:${INK};border:6px solid ${INK};border-radius:60px;font-family:Bricolage;font-weight:800;font-size:58px;line-height:72px;padding:0 26px">ahorras <span style="color:${col}">${sav}</span></div>` : ''}`);
const DUDA = (c, z = 16) => box(c, 0, 0, 160, 160, { zIndex: z, borderRadius: '50%', background: YEL, border: `9px solid ${INK}`, boxShadow: `8px 9px 0 ${SH}`, textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '92px', lineHeight: '138px', color: INK, transformOrigin: '50% 50%', boxSizing: 'border-box' }, '¿?');
const SKIN = ['#f2c9a0', PIEL, '#c98d63', '#8d5a3b'], PELO = ['#3a2a1e', '#6b4a2a', '#111', '#c46a2a', '#9a9a9a'];
const CARITA = (c, i, w = 120, z = 14) => { const d = box(c, 0, 0, w, w * 1.25, { zIndex: z, transformOrigin: '50% 100%' }, `<svg viewBox="0 0 120 150" width="${w}" height="${f1(w * 1.25)}" style="overflow:visible">
  <path d="M14,150 Q14,98 60,98 Q106,98 106,150 Z" fill="${COLS[i % COLS.length]}" stroke="${INK}" stroke-width="6"/><circle cx="60" cy="60" r="38" fill="${SKIN[i % 4]}" stroke="${INK}" stroke-width="6"/>
  <path d="M24,52 Q26,18 60,20 Q94,18 96,52 Q80,34 60,36 Q40,34 24,52 Z" fill="${PELO[i % 5]}" stroke="${INK}" stroke-width="4"/><circle cx="46" cy="62" r="5" fill="${INK}"/><circle cx="74" cy="62" r="5" fill="${INK}"/>
  <path class="m" d="M48,80 Q60,88 72,80" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/><g class="x" opacity="0"><path d="M18,22 L102,106 M102,22 L18,106" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M18,22 L102,106 M102,22 L18,106" stroke="${RED}" stroke-width="13" stroke-linecap="round"/></g></svg>`);
  d.m = d.querySelector('.m'); d.x = d.querySelector('.x'); return d; };
const SELLO = (c, x, y, w, txt, col, z = 30, fs = 92) => box(c, x, y, w, fs * 1.6, { zIndex: z, border: `12px solid ${col}`, color: col, borderRadius: '20px', fontFamily: 'Rye', fontSize: `${fs}px`, lineHeight: `${f1(fs * 1.38)}px`, textAlign: 'center', background: 'rgba(255,255,255,.85)', transformOrigin: '50% 50%', boxSizing: 'border-box', whiteSpace: 'nowrap' }, txt);
const TACHA = (c, x, y, w, z = 25) => box(c, x, y, w, 30, { zIndex: z, background: RED, border: `5px solid ${INK}`, borderRadius: '15px', transformOrigin: '0 50%' });
const CEREBRO = (c, w, z = 12) => figura(c, 0, 0, w, w * 220 / 300, `<path d="M150,30 C100,8 40,28 30,90 C12,122 20,172 62,192 C92,214 130,206 150,190 Z" fill="#f2a7b8" stroke="${INK}" stroke-width="8"/>
  <path d="M150,30 C200,8 260,28 270,90 C288,122 280,172 238,192 C208,214 170,206 150,190 Z" fill="#f2a7b8" stroke="${INK}" stroke-width="8"/><path d="M150,32 V190" stroke="${INK}" stroke-width="6"/>
  <path d="M60,70 q20,-14 40,0 t40,0 M50,110 q24,-18 48,0 t44,-4 M64,150 q20,-14 40,0 t36,0 M160,70 q20,-14 40,0 t40,0 M158,110 q24,-18 48,0 t44,4 M164,150 q20,-14 40,0 t36,0" stroke="#b5677a" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="110" cy="128" r="9" fill="${INK}"/><circle cx="190" cy="128" r="9" fill="${INK}"/><path d="M128,162 Q150,176 172,162" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`, '0 0 300 220', { z, origin: '50% 50%' });
const CONO = (c, w = 90, z = 10) => figura(c, 0, 0, w, w * 1.2, `<path d="M8,108 H92" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M50,4 L84,104 H16 Z" fill="${NAR}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M37,44 H63 M28,72 H72" stroke="#fff" stroke-width="12"/>`, '0 0 100 120', { z, origin: '50% 100%' });

/* ===================== PORTADA (fotograma 0) + L0 · el quiz ===================== */
function quiz(c) {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const A = CARTA(c, 50, 560, '40→50', AZUL), B = CARTA(c, 510, 560, '80→130', RED);
  const du = DUDA(c); const cr = CRONO(c, 300, 18);
  return { ry, A, B, du, cr };
}
const quizT = (Z, t, tA, tB) => {
  set(Z.ry, { r: t * 6 });
  const pa = t > tA && t < tA + 1.2 ? 0.07 * Math.sin((t - tA) * 9) : 0, pb = t > tB && t < tB + 1.2 ? 0.07 * Math.sin((t - tB) * 9) : 0;
  set(Z.A, { r: -3 + wobble(t, 0.5, 1), s: 1 + Math.abs(pa) }); set(Z.B, { r: 3 + wobble(t, 0.45, 1, 1), s: 1 + Math.abs(pb) });
  set(Z.du, { x: 400, y: 640 + Math.sin(t * 4) * 12, r: Math.sin(t * 3) * 10, s: 1 + 0.05 * Math.sin(t * 6) });
};
plano(-1, L(1) - 0.1, PAPEL, c => {
  const t1 = texto(c, 268, '¿CUÁL', { size: 124, z: 30 }), t2 = texto(c, 396, 'AHORRA ' + hlSpan('MÁS?', 'phl'), { size: 124, z: 30 });
  const Z = quiz(c);
  sfx('swoosh_up', 0.05, 0.6); sp(T.c40, 'pop', 0.6); sp(T.c80, 'pop2', 0.6); sp(T.c130 + 0.4, 'tick', 0.5);
  return t => {
    quizT(Z, t, T.c40, T.c80);
    set(t1, { r: -2 + wobble(t, 0.5, 0.8) }); set(t2, { r: 2 + wobble(t, 0.45, 0.8, 1), s: 1 + 0.03 * Math.sin(t * 3) });
    paint(c.querySelector('.phl'), t, 0.2, 0.4);
    set(Z.cr, { x: 390, y: 950 + Math.sin(t * 5) * 6, r: wobble(t, 0.4, 3) }); aguja(Z.cr, t * 240);
  };
}, { sfx: false });

/* ===================== L1 · cuenta atrás 3-2-1 · «casi todo el mundo falla» · la respuesta se queda ===================== */
plano(L(1) - 0.1, L(2) - 0.08, PAPEL, c => {
  const Z = quiz(c);
  const t1 = texto(c, 268, '¿CUÁL', { size: 124, z: 30 }), t2 = texto(c, 396, 'AHORRA ' + hlSpan('MÁS?', 'ph2'), { size: 124, z: 30 });
  const tf = texto(c, 300, 'casi todos ' + hlSpan('FALLAN', 'fhl', '#ffb3b3'), { size: 110, z: 30 });
  const tr = texto(c, 300, 'y no se te ' + hlSpan('olvida', 'ohl'), { size: 110, z: 30 });
  const gente = [0, 1, 2, 3, 4, 5].map(i => CARITA(c, i + 1, 120, 20));
  const qs = gente.map((g, i) => qMark(c, 0, 0, 70, i % 2 ? PINK : YEL));
  const bulbo = figura(c, 0, 0, 170, 230, `<circle cx="85" cy="80" r="70" fill="#fff36b" stroke="${INK}" stroke-width="8"/><path d="M60,140 H110 V180 H60 Z" fill="#c9c4b6" stroke="${INK}" stroke-width="7"/><path d="M60,158 H110" stroke="${INK}" stroke-width="5"/><path d="M68,100 L85,70 L102,100" stroke="${NAR}" stroke-width="7" fill="none" stroke-linecap="round"/>`, '0 0 170 230', { z: 26, origin: '50% 50%' });
  [0, 1, 2].forEach(i => sp(T.piensa + i * 0.5, 'tick', 0.7)); sp(T.piensa + 1.5, 'ding', 0.6); sp(T.casi1, 'pop', 0.5); sp(T.falla, 'error', 0.6); sp(T.resp, 'sparkle', 0.6);
  shakeAt(T.falla, 0.3, 10);
  return t => {
    quizT(Z, t, -9, -9);
    const head = t < T.casi1 - 0.1;
    set(t1, { o: head ? 1 : 0, r: -2 }); set(t2, { o: head ? 1 : 0, r: 2 }); paint(c.querySelector('.ph2'), t, 0, 0.1);
    set(tf, { o: t >= T.casi1 - 0.1 && t < T.resp - 0.1 ? 1 : 0, s: pop(t, T.casi1 - 0.1, 0.3), r: -2 }); paint(c.querySelector('.fhl'), t, T.falla, 0.35);
    set(tr, { o: t >= T.resp - 0.1 ? 1 : 0, s: pop(t, T.resp - 0.1, 0.3), r: 2 }); paint(c.querySelector('.ohl'), t, T.olvidar, 0.35);
    // cronómetro → anillo 3-2-1 durante «Piénsalo un segundo», luego se aparta
    const kc = p(t, T.piensa, 1.5, E.linear), out = p(t, T.casi1 - 0.2, 0.4, E.inCubic);
    Z.rg = Z.cr.rg; Z.rg.setAttribute('opacity', t > T.piensa - 0.1 ? 1 : 0); Z.rg.setAttribute('stroke-dashoffset', f1(kc * 1000) / 1000);
    const n = t < T.piensa ? '' : t < T.piensa + 0.5 ? '3' : t < T.piensa + 1 ? '2' : t < T.piensa + 1.5 ? '1' : '¡YA!';
    Z.cr.num.textContent = n; Z.cr.num.setAttribute('opacity', n ? 1 : 0); Z.cr.num.setAttribute('font-size', n.length > 1 ? 66 : 120);
    aguja(Z.cr, t * 300); Z.cr.ag.setAttribute('opacity', n ? 0 : 1);
    const beat = t > T.piensa ? 1 + 0.06 * Math.abs(Math.sin((t - T.piensa) * Math.PI * 2)) : 1;
    set(Z.cr, { x: 390 + out * 700, y: 950, s: beat, r: out * 40 });
    gente.forEach((g, i) => { const k = p(t, T.casi1 + i * 0.08, 0.4, E.outBack), row = i % 2;
      set(g, { x: 380 + i * 80, y: 1040 + row * 70 - (1 - clamp(k)) * 300, o: t > T.casi1 + i * 0.08 ? 1 : 0, r: t > T.falla ? Math.sin(t * 6 + i) * 8 : 0 });
      g.m.setAttribute('d', t > T.falla ? 'M48,84 Q60,74 72,84' : 'M48,80 Q60,88 72,80');
      set(qs[i], { x: 405 + i * 80, y: 960 + row * 70 + Math.sin(t * 5 + i) * 8, o: t > T.casi1 + 0.3 + i * 0.08 && t < T.resp ? 1 : 0, s: pop(t, T.casi1 + 0.3 + i * 0.08, 0.3) }); });
    set(bulbo, { x: 560, y: 760 + Math.sin(t * 4) * 8, o: t > T.resp ? 1 : 0, s: pop(t, T.resp, 0.4) * (1 + 0.05 * Math.sin(t * 9)), r: wobble(t, 0.5, 4) });
  };
});

/* L2 · marca en el balcón */
marca(2);

/* ===================== L3a · «tu cuñado»: primer plano (gafas, tupé, palillo, brazo por la ventanilla) ===================== */
plano(L(3) - 0.1, T.domingo - 0.05, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1180, solX: 120, solY: 330 });
  const car = COCHE(cam, 1100, CUN, true, 10);
  const tag = chip(c, 470, 950, 'tu cuñado', { size: 80, bg: PINK, z: 40 });
  const est = [0, 1].map(i => ESTRELLA(cam, 90, i ? YEL : '#fff'));
  sp(T.cun3, 'pop', 0.6); sp(T.cun3 + 0.2, 'sparkle', 0.6);
  return t => {
    zoom(cam, t, L(3) - 0.1, T.domingo - L(3), 0.08); avanza(R, t, 0.4);
    set(car, { x: -110, y: pisa(1100, 1440) + Math.sin(t * 30) * 2.5 }); rueda(car, t, 0.4); saluda(car, t);
    car.glint.style.opacity = t > T.cun3 && t < T.cun3 + 0.5 ? 1 : 0.15;
    vis(tag, t, T.cun3 - 0.1, 99, { r: -4 });
    est.forEach((e, i) => set(e, { x: [700, 860][i], y: [700, 820][i], s: t > T.cun3 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + i)) : 0, r: t * 120 }));
  };
});

/* ===================== L3b · domingo: cartel «Casa de mamá 50 km» ===================== */
plano(T.domingo - 0.05, T.tu3 - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1100, solX: 760, solY: 520 });
  const panel = box(cam, 0, 0, 640, 560, { zIndex: 6, transformOrigin: '50% 100%' }, `<div style="position:absolute;left:110px;top:260px;width:24px;height:300px;background:#a9a6ae;border:4px solid ${INK};box-sizing:border-box"></div><div style="position:absolute;left:506px;top:260px;width:24px;height:300px;background:#a9a6ae;border:4px solid ${INK};box-sizing:border-box"></div>
   <div style="position:absolute;left:0;top:0;width:640px;height:290px;background:#1f5fbf;border:10px solid #fff;outline:7px solid ${INK};border-radius:22px;box-shadow:14px 16px 0 ${SH};box-sizing:border-box;color:#fff;text-align:center;font-family:Bricolage;font-weight:800">
   <div style="font-size:74px;line-height:120px;margin-top:10px">Casa de mamá</div><div style="font-size:110px;line-height:120px">50 km</div></div>`);
  const dom = chip(c, 70, 300, 'domingo', { size: 70, bg: INK, z: 40 });
  const tu = COCHE(cam, 300, AZUL, false, 12), cu = COCHE(cam, 300, CUN, true, 11);
  sp(T.domingo, 'bell', 0.5); sp(T.km50 - 0.1, 'whoosh', 0.6); sp(T.km50 + 0.2, 'ding', 0.6); sp(T.casa, 'pop2', 0.5);
  return t => {
    deriva(cam, t, T.domingo - 0.05, T.tu3 - 0.1, [540, 980, 1.0], [540, 900, 1.1]); avanza(R, t, 0.7);
    vis(dom, t, T.domingo - 0.1, 99, { r: -4 });
    const kp = p(t, T.km50 - 0.3, 0.5, E.outBack);
    set(panel, { x: 220, y: 460, sy: kp, o: t > T.km50 - 0.3 ? 1 : 0, r: Math.sin(t * 2) * 1 });
    set(tu, { x: 40 + Math.sin(t * 1.3) * 10, y: pisa(300, 1330) + Math.sin(t * 26) }); rueda(tu, t, 1);
    set(cu, { x: 560 + Math.sin(t * 1.1) * 14, y: pisa(300, 1230) + Math.sin(t * 28) }); rueda(cu, t, 1.2); saluda(cu, t);
  };
});

/* ===================== L3c · autovía: TÚ 100 · TU CUÑADO 120 adelantando a todo el mundo ===================== */
plano(T.tu3 - 0.1, L(4) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 960, h: 420, solX: 800, solY: 200 });
  const otros = ['#9a9a9a', '#e8c13a', '#6aa9a0'].map((col, i) => COCHE(cam, 260, col, false, 9));
  const tu = COCHE(cam, 340, AZUL, false, 12), cu = COCHE(cam, 340, CUN, true, 10);
  const vl = VEL(cam, 5, 9);
  const ctu = chip(c, 0, 0, 'TÚ · 100', { size: 58, bg: AZUL, z: 40 }), ccu = chip(c, 0, 0, 'TU CUÑADO · 120', { size: 58, bg: CUN, z: 40 });
  const t50 = chip(c, 70, 300, '50 km', { size: 60, bg: INK, z: 40 });
  sp(T.tu3, 'pop', 0.6); sp(T.cien, 'ding', 0.5); sp(T.el3, 'swoosh_up', 0.7); sp(T.c120, 'pop2', 0.6); sp(T.adel, 'whoosh', 0.8); sp(T.adel + 0.6, 'whoosh', 0.6);
  return t => {
    deriva(cam, t, T.tu3 - 0.1, L(4) - 0.1, [540, 1000, 1.06], [540, 960, 1.0]); avanza(R, t, 1.1);
    vis(t50, t, T.tu3 - 0.1, 99, { r: -3 });
    const tx = 120 + Math.sin(t * 1.4) * 8;
    set(tu, { x: tx, y: pisa(340, 1330) + Math.sin(t * 26) }); rueda(tu, t, 1.2);
    set(ctu, { x: tx + 30, y: 1020, o: t > T.tu3 - 0.05 ? 1 : 0, s: pop(t, T.tu3 - 0.05, 0.3), r: -3 });
    const kc = p(t, T.el3 - 0.3, 0.9, E.outCubic), ka = p(t, T.adel - 0.1, 1.6, E.inOutCubic);
    const cx = lerp(-480, 40, kc) + ka * 520;
    set(cu, { x: cx, y: pisa(340, 1150) + Math.sin(t * 30) * 1.5, r: ka > 0 && ka < 1 ? -1.5 : 0, o: t > T.el3 - 0.3 ? 1 : 0 }); rueda(cu, t, 1.8); saluda(cu, t);
    cu.glint.style.opacity = Math.sin(t * 4) > 0.5 ? 1 : 0.2;
    set(ccu, { x: Math.max(40, Math.min(cx + 10, 370)), y: 840, o: t > T.c120 - 0.1 ? 1 : 0, s: pop(t, T.c120 - 0.1, 0.3), r: 3 });
    viento(vl, t, cx, 1010, ka > 0.05 && ka < 0.98);
    otros.forEach((o, i) => { const ox = 700 + i * 360 - (t - T.tu3) * 120 - ka * 900; set(o, { x: ox, y: pisa(260, 1150) }); rueda(o, t, 0.8); });
  };
});

/* ===================== L4 · llegada: el cuñado aparca (y aparca, y aparca…) · +5 min · llegas tú ===================== */
plano(L(4) - 0.1, L(5) - 0.1, { background: '#a9d8f2' }, c => {
  const cam = CAM(c);
  const R = carretera(cam, { y: 1180, h: 200, solX: 120, solY: 260 });
  const casa = box(cam, 470, 640, 460, 420, { zIndex: 4, transformOrigin: '50% 100%' }, CASA(460, 420, '#b5523a'));
  const cart = chip(cam, 600, 720, 'casa de mamá', { size: 44, bg: PINK, z: 6 });
  const cu = COCHE(cam, 330, CUN, true, 12), tu = COCHE(cam, 330, AZUL, false, 13);
  const plus = box(c, 120, 330, 400, 200, { zIndex: 40, background: CUN, border: `10px solid ${INK}`, borderRadius: '40px', boxShadow: `12px 14px 0 ${SH}`, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '120px', lineHeight: '180px', textAlign: 'center', textShadow: OUT, transformOrigin: '50% 50%', boxSizing: 'border-box' }, '+5 min');
  const cr = CRONO(c, 190, 41);
  const apar = chip(c, 60, 570, 'lo que tarda en aparcar', { size: 54, bg: INK, z: 42 });
  sp(T.cuanto4, 'whoosh', 0.6); sp(T.cinco4, 'ding', 0.8); sp(T.cinco4 + 0.1, 'pop2', 0.6); sp(T.tarda, 'scratch', 0.5); sp(T.tarda + 0.4, 'boing', 0.5); sp(T.aparcar, 'whoosh', 0.6);
  shakeAt(T.cinco4, 0.3, 10);
  return t => {
    zoom(cam, t, L(4) - 0.1, L(5) - L(4), 0.05);
    // el cuñado llega y hace maniobras (adelante-atrás) hasta que llegas tú
    const kl = p(t, L(4) - 0.1, 0.8, E.outCubic), man = t > T.cuanto4 + 0.6 ? Math.sin((t - T.cuanto4 - 0.6) * 4.2) * 50 * (t < T.aparcar + 0.6 ? 1 : 0) : 0;
    set(cu, { x: lerp(-400, 470, kl) + man, y: pisa(330, 1290), r: man ? Math.sin((t - T.cuanto4) * 4.2) * 1.2 : 0 }); rueda(cu, t, man ? 1 : kl < 1 ? 1 : 0); saluda(cu, t);
    frena(cu, man > 0 && Math.cos((t - T.cuanto4 - 0.6) * 4.2) < 0);
    const kt = p(t, T.tarda - 0.2, 1.1, E.outCubic);
    set(tu, { x: lerp(-420, 90, kt), y: pisa(330, 1300), o: t > T.tarda - 0.2 ? 1 : 0 }); rueda(tu, t, kt < 1 ? 1 : 0); frena(tu, kt > 0.7 && kt < 1);
    set(plus, { o: t > T.cinco4 - 0.05 ? 1 : 0, s: t < T.cinco4 - 0.05 ? 0 : lerp(2, 1, E.outCubic(clamp((t - T.cinco4 + 0.05) / 0.22))) * (1 + 0.03 * Math.sin(t * 7)), r: -4 });
    set(cr, { x: 540, y: 300 + Math.sin(t * 5) * 6, o: t > T.cinco4 ? 1 : 0, s: pop(t, T.cinco4, 0.35), r: wobble(t, 0.5, 4) }); aguja(cr, (t - T.cinco4) * 300);
    vis(apar, t, T.tarda - 0.05, 99, { r: 3 });
    set(casa, { sy: 1 + 0.01 * Math.sin(t * 3) }); set(cart, { r: Math.sin(t * 2) * 3 });
  };
});

/* ===================== L5 · la curva: tiempo por km frente a velocidad (hipérbola que se aplana) ===================== */
const GX = v => 170 + (v - 20) / 120 * 700, GY = s => 1180 - s / 180 * 700;
let CURVA = ''; for (let v = 20; v <= 140; v += 2) CURVA += (v === 20 ? 'M' : 'L') + f1(GX(v)) + ',' + f1(GY(3600 / v)) + ' ';
const EJES = (extra = '') => `<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible">
  <rect x="120" y="430" width="800" height="800" rx="20" fill="${CRE}" stroke="${INK}" stroke-width="7"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M170,${1180 - i * 140} H880" stroke="rgba(43,33,24,.12)" stroke-width="3"/>`).join('')}
  <path d="M170,470 V1180 H890" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M890,1166 l22,14 l-22,14 Z M156,470 l14,-22 l14,22 Z" fill="${INK}"/>
  ${[40, 80, 120].map(v => `<text x="${GX(v)}" y="1220" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">${v}</text>`).join('')}
  <text x="900" y="1270" text-anchor="end" font-family="Bricolage" font-weight="800" font-size="30" fill="${INK}">km/h</text>
  <text x="200" y="490" font-family="Bricolage" font-weight="800" font-size="34" fill="${INK}">segundos por km</text>${extra}</svg>`;
plano(L(5) - 0.1, T.miralo - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const tit = texto(c, 280, 'cada km/h ahorra ' + hlSpan('menos', 'mhl'), { size: 84, z: 30 });
  let esc = ''; for (let v = 30; v < 130; v += 10) esc += `<path class="esc" d="M${f1(GX(v))},${f1(GY(3600 / v))} H${f1(GX(v + 10))} V${f1(GY(3600 / (v + 10)))}" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>`;
  const g = box(cam, 0, 0, 1080, 1920, { zIndex: 5 }, EJES(`${esc}<path class="cv" d="${CURVA}" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/><path class="cv2" d="${CURVA}" stroke="${AZUL}" stroke-width="8" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>`));
  const cv = [g.querySelector('.cv'), g.querySelector('.cv2')], es = [...g.querySelectorAll('.esc')];
  const car = COCHE(cam, 130, CUN, true, 8);
  const cpl = chip(c, 520, 700, 'se aplana', { size: 56, bg: AZUL, z: 40 });
  sp(T.porque, 'swoosh_up', 0.5); sp(T.cada, 'paper', 0.5); sp(T.menos5, 'pop', 0.6); sp(T.anterior, 'boing', 0.5);
  return t => {
    deriva(cam, t, L(5) - 0.1, T.miralo - 0.1, [540, 900, 1.02], [560, 880, 1.08]);
    set(tit, { r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.mhl'), t, T.menos5, 0.35);
    const k = p(t, T.porque, 2.2, E.inOutCubic); cv.forEach(e => e.setAttribute('stroke-dashoffset', f1((1 - k) * 1000) / 1000));
    es.forEach((e, i) => e.setAttribute('opacity', t > T.menos5 + i * 0.12 ? 1 : 0));
    const v = lerp(22, 138, k), x = GX(v), y = GY(3600 / v), sl = -3600 / (v * v) / 180 * 700 / (700 / 120);
    set(car, { x: x - 65, y: y - 62, r: Math.atan(2400 / (v * v)) * 57.3, o: k > 0.02 ? 1 : 0 }); rueda(car, t, 1);
    vis(cpl, t, T.anterior, 99, { r: -4 });
  };
});

/* ===================== L6 / L7a · tira de 1 km con cronómetro: 40→90 s, 50→72 s (−18) · 80→45 s, 130→28 s (−17) ===================== */
function tira(t0, t1, va, vb, sa, sb, ka, kb, tSave, save, intro) {
  plano(t0, t1, PAPEL, c => {
    const cam = CAM(c);
    const tit = texto(c, 282, 'en ' + hlSpan('1 km', 'khl'), { size: 100, x: 40, w: 640, z: 30 });
    const cr = CRONO(c, 170, 30);
    const cinta = box(cam, 230, 470, 650, 56, { zIndex: 6, background: YEL, border: `6px solid ${INK}`, borderRadius: '10px', backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 4px, transparent 4px 65px)`, backgroundSize: '100% 45%', backgroundRepeat: 'repeat-x', boxSizing: 'border-box', transformOrigin: '0 50%' });
    const e0 = chip(cam, 190, 400, '0', { size: 40, bg: INK, z: 8 }), e1 = chip(cam, 780, 400, '1 km', { size: 40, bg: INK, z: 8 });
    const lane = (y, v, col, sec) => {
      box(cam, 230, y, 650, 130, { zIndex: 3, background: ASF, border: `7px solid ${INK}`, borderRadius: '12px', boxSizing: 'border-box' });
      box(cam, 240, y + 58, 630, 10, { zIndex: 4, backgroundImage: 'repeating-linear-gradient(90deg, #f4efe2 0 40px, transparent 40px 80px)' });
      box(cam, 830, y + 6, 40, 118, { zIndex: 5, backgroundImage: `repeating-conic-gradient(${INK} 0 25%, #fff 0 50%)`, backgroundSize: '20px 20px' });
      const bd = box(cam, 40, y + 18, 180, 96, { zIndex: 6, background: col, border: `7px solid ${INK}`, borderRadius: '50px', color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '60px', lineHeight: '82px', textAlign: 'center', textShadow: `3px 3px 0 ${INK}`, boxSizing: 'border-box', transformOrigin: '50% 50%' }, `${v}`);
      box(cam, 70, y + 116, 130, 30, { zIndex: 6, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '28px', color: INK, textAlign: 'center' }, 'km/h');
      const car = COCHE(cam, 180, col, false, 7);
      const rd = box(cam, 420, y + 150, 300, 104, { zIndex: 8, background: '#1d1a22', border: `7px solid ${INK}`, borderRadius: '18px', color: YEL, fontFamily: 'PlexMono', fontWeight: 700, fontSize: '70px', lineHeight: '90px', textAlign: 'center', boxSizing: 'border-box', transformOrigin: '50% 50%' }, '0 s');
      return { bd, car, rd, y, sec };
    };
    const A = lane(600, va, AZUL, sa), B = lane(880, vb, RED, sb);
    const sv = box(c, 560, 1170, 340, 150, { zIndex: 40, background: VERDE, border: `10px solid ${INK}`, borderRadius: '40px', boxShadow: `12px 14px 0 ${SH}`, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '110px', lineHeight: '130px', textAlign: 'center', textShadow: OUT, transformOrigin: '50% 50%', boxSizing: 'border-box' }, save);
    const br = box(cam, 728, 720, 70, 330, { zIndex: 9, borderRight: `10px solid ${INK}`, borderTop: `10px solid ${INK}`, borderBottom: `10px solid ${INK}`, borderRadius: '0 30px 30px 0', boxSizing: 'border-box' });
    if (intro != null) { sp(intro, 'swoosh_up', 0.6); sp(T.unkm, 'ding', 0.6); }
    [[A, ka], [B, kb]].forEach(([Ln, k]) => { sp(k[0], 'whoosh', 0.6); sp(k[1], 'ding', 0.7); });
    sp(tSave, 'stamp', 0.9); shakeAt(tSave, 0.3, 12);
    return t => {
      deriva(cam, t, t0, t1, [540, 900, 1.0], [540, 920, 1.04]);
      set(tit, { r: -2 + wobble(t, 0.5, 0.6) }); paint(c.querySelector('.khl'), t, intro != null ? T.unkm : t0, 0.35);
      const kc = intro != null ? p(t, intro, 0.9, E.outCubic) : 1;
      set(cinta, { sx: kc }); set(e0, { o: kc > 0 ? 1 : 0 }); set(e1, { o: kc >= 1 ? 1 : 0, s: intro != null ? pop(t, T.unkm, 0.35) : 1 });
      let run = false;
      [[A, ka], [B, kb]].forEach(([Ln, k]) => {
        const kk = p(t, k[0], k[1] - k[0], E.linear); run = run || (kk > 0 && kk < 1);
        set(Ln.car, { x: lerp(232, 650, kk), y: Ln.y + 128 - 90 * 282 / 300 + Math.sin(t * 30) * 1.2 }); rueda(Ln.car, t, kk > 0 && kk < 1 ? 2 : 0);
        Ln.rd.textContent = `${Math.round(kk * Ln.sec)} s`;
        set(Ln.rd, { s: kk >= 1 ? 1 + 0.08 * Math.max(0, 1 - (t - k[1]) * 3) : 1, o: t > k[0] - 0.3 ? 1 : 0.35 });
        set(Ln.bd, { s: kk > 0 && kk < 1 ? 1.08 : 1, r: wobble(t, 0.5, 2) });
      });
      set(cr, { x: 730, y: 278 + Math.sin(t * 5) * 4, r: wobble(t, 0.4, 3) }); aguja(cr, run ? t * 600 : 0);
      set(sv, { o: t > tSave ? 1 : 0, s: t < tSave ? 0 : lerp(2, 1, E.outCubic(clamp((t - tSave) / 0.22))) * (1 + 0.03 * Math.sin(t * 7)), r: -5 });
      set(br, { o: t > tSave - 0.2 ? 1 : 0, sy: p(t, tSave - 0.2, 0.3, E.outCubic) });
    };
  });
}
tira(T.miralo - 0.1, L(7) - 0.1, 40, 50, 90, 72, [T.a40 + 0.05, T.n90 + 0.45], [T.a50 + 0.05, T.s72 + 0.35], T.ahorrado, '−18 s', T.miralo);
tira(L(7) - 0.1, T.menos7 - 0.45, 80, 130, 45, 28, [T.a80 + 0.05, T.c45 + 0.3], [T.a130 + 0.05, T.d28 + 0.4], T.d17, '−17 s', null);

/* ===================== L7b · el resultado: gana 40→50 (−18 s); 80→130 (−17 s), la respuesta de casi todos, tachada ===================== */
plano(T.menos7 - 0.45, L(8) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const t1 = texto(c, 268, '¿CUÁL', { size: 124, z: 30 }), t2 = texto(c, 396, 'AHORRA ' + hlSpan('MÁS?', 'rhl'), { size: 124, z: 30 });
  const A = CARTA(c, 50, 560, '40→50', AZUL, '18 s'), B = CARTA(c, 510, 560, '80→130', RED, '17 s');
  const gana = SELLO(c, 40, 1000, 440, '¡GANA!', VERDE, 40, 100);
  const x1 = box(c, 520, 600, 470, 30, { zIndex: 30, background: RED, border: `5px solid ${INK}`, borderRadius: '15px', transformOrigin: '0 50%' });
  const tus = chip(c, 600, 1010, 'la trampa', { size: 50, bg: INK, z: 40 });
  const cmp = texto(c, 1160, '18 <span style="color:' + VERDE + '">&gt;</span> 17', { size: 130, z: 30 });
  sp(T.menos7 - 0.3, 'drumroll', 0.4); sp(T.menos7, 'stamp', 1.0); sp(T.menos7 + 0.25, 'tada', 0.7); sp(T.c4050, 'scratch', 0.7);
  shakeAt(T.menos7, 0.35, 16);
  return t => {
    set(ry, { r: t * 6 });
    set(t1, { r: -2 }); set(t2, { r: 2 }); paint(c.querySelector('.rhl'), t, T.menos7 - 0.4, 0.3);
    set(A, { r: -3 + wobble(t, 0.5, 1), s: t > T.menos7 ? 1.05 + 0.03 * Math.sin(t * 6) : 1 }); set(B, { r: 3, s: t > T.c4050 ? 0.94 : 1 });
    golpeS(gana, t, T.menos7, -8);
    set(x1, { y: 0, sx: p(t, T.c4050 - 0.05, 0.3), r: 38, o: t > T.c4050 - 0.05 ? 1 : 0 });
    vis(tus, t, T.c4050 + 0.15, 99, { r: 3 });
    set(cmp, { o: t > T.menos7 + 0.2 ? 1 : 0, s: pop(t, T.menos7 + 0.2, 0.35), r: -2 });
  };
});

/* ===================== L8a · Ola Svenson, psicólogo sueco: casi todos fallamos ===================== */
plano(L(8) - 0.1, T.hoy - 0.1, { background: '#dfe8f2' }, c => {
  const cam = CAM(c);
  const ficha = box(cam, 110, 300, 820, 400, { zIndex: 10, background: CRE, border: `9px solid ${INK}`, borderRadius: '34px', boxShadow: `14px 16px 0 ${SH}`, boxSizing: 'border-box', transformOrigin: '50% 50%', overflow: 'hidden' },
    `<div style="position:absolute;left:0;top:0;width:100%;height:70px;background:#1f5fbf"><div style="position:absolute;left:120px;top:0;width:26px;height:70px;background:#f5c518"></div><div style="position:absolute;left:0;top:24px;width:100%;height:22px;background:#f5c518"></div></div>
     <svg viewBox="0 0 220 260" width="230" height="270" style="position:absolute;left:40px;top:100px"><rect x="10" y="10" width="200" height="240" rx="24" fill="#cfe0ee" stroke="${INK}" stroke-width="7"/><path d="M40,250 Q40,180 110,176 Q180,180 180,250 Z" fill="#4a5a6e" stroke="${INK}" stroke-width="7"/><circle cx="110" cy="112" r="52" fill="#f2c9a0" stroke="${INK}" stroke-width="7"/><path d="M60,100 Q66,52 110,54 Q156,52 160,100 Q140,74 110,76 Q80,74 60,100 Z" fill="#c9b48a" stroke="${INK}" stroke-width="5"/><circle cx="90" cy="114" r="16" fill="none" stroke="${INK}" stroke-width="6"/><circle cx="130" cy="114" r="16" fill="none" stroke="${INK}" stroke-width="6"/><path d="M106,114 H114" stroke="${INK}" stroke-width="6"/><path d="M96,140 Q110,148 124,140" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>
     <div style="position:absolute;left:300px;top:110px;font-family:Playfair;font-weight:900;font-size:76px;line-height:1;color:${INK}">Ola Svenson</div>
     <div style="position:absolute;left:300px;top:210px;font-family:Bricolage;font-weight:800;font-size:48px;color:${INK}">psicólogo · Suecia</div>
     <div class="hl" style="position:absolute;left:300px;top:290px;font-family:SpecialElite;font-size:36px;color:${INK};background:linear-gradient(${YEL},${YEL}) no-repeat 0 100% / 0% 70%;padding:0 8px">estudia cómo decidimos</div>`);
  const hl = ficha.querySelector('.hl');
  const gente = [...Array(10)].map((_, i) => CARITA(cam, i, 130, 14));
  const fallo = chip(c, 180, 1250, 'casi todos fallamos', { size: 64, bg: RED, z: 40 });
  sp(T.psico, 'paper', 0.7); sp(T.ola, 'pop', 0.6); sp(T.demostro, 'swoosh_up', 0.5); [...Array(8)].forEach((_, i) => sp(T.casi8 + i * 0.09, 'pop2', 0.35)); sp(T.casi8 + 0.8, 'error', 0.6);
  return t => {
    deriva(cam, t, L(8) - 0.1, T.hoy - 0.1, [540, 880, 1.04], [540, 940, 1.0]);
    const kf = p(t, L(8) - 0.12, 0.45, E.outBack); set(ficha, { s: kf, r: lerp(-12, -1.5, clamp(kf)) + wobble(t, 0.4, 0.6) });
    hl.style.backgroundSize = `${f1(p(t, T.ola + 0.3, 0.6) * 100)}% 70%`;
    gente.forEach((g, i) => { const row = Math.floor(i / 5), k = p(t, T.demostro - 0.1 + i * 0.06, 0.4, E.outBack);
      set(g, { x: 110 + (i % 5) * 155 + row * 30, y: 800 + row * 190, s: k, o: t > T.demostro - 0.1 + i * 0.06 ? 1 : 0, r: Math.sin(t * 3 + i) * 4 });
      const mal = i !== 3 && i !== 7 && t > T.casi8 + [0, 1, 2, 9, 3, 4, 5, 9, 6, 7][i] * 0.09;
      g.x.setAttribute('opacity', mal ? 1 : 0); g.m.setAttribute('d', mal ? 'M48,84 Q60,74 72,84' : 'M48,80 Q60,88 72,80'); });
    vis(fallo, t, T.casi8 + 0.3, 99, { r: -3 });
  };
});

/* ===================== L8b · «sesgo del ahorro de tiempo»: el cerebro cree que correr compensa → tachado ===================== */
plano(T.hoy - 0.1, L(9) - 0.1, { background: '#f2e2d0' }, c => {
  const ry = rays(c, -160, 500, 1400, 24, 'rgba(255,230,0,.25)', 'rgba(0,0,0,0)', 0);
  const placa = box(c, 120, 300, 840, 270, { zIndex: 20, background: '#3b2a1e', border: `9px solid ${GOLD}`, outline: `6px solid ${INK}`, borderRadius: '24px', boxShadow: `14px 16px 0 ${SH}`, color: '#f6e7b8', textAlign: 'center', transformOrigin: '50% 50%', boxSizing: 'border-box' },
    `<div style="font-family:SpecialElite;font-size:40px;line-height:70px;margin-top:14px">se llama</div><div style="font-family:Playfair;font-weight:900;font-size:66px;line-height:1.05">sesgo del ahorro<br>de tiempo</div>`);
  const cer = CEREBRO(c, 400, 12);
  const bur = box(c, 330, 650, 600, 190, { zIndex: 18, background: '#fff', border: `8px solid ${INK}`, borderRadius: '90px', boxShadow: `10px 12px 0 ${SH}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '70px', lineHeight: '174px', textAlign: 'center', color: INK, transformOrigin: '70% 100%', boxSizing: 'border-box' }, 'correr compensa');
  const pts = [0, 1].map(i => box(c, 0, 0, 40 - i * 14, 40 - i * 14, { zIndex: 18, borderRadius: '50%', background: '#fff', border: `6px solid ${INK}` }));
  const tch = TACHA(c, 370, 735, 540, 25);
  const no = SELLO(c, 560, 1100, 280, '¡NO!', RED, 30, 96);
  const vls = [0, 1, 2].map(() => box(c, 0, 0, 120, 12, { zIndex: 11, background: INK, borderRadius: '6px' }));
  sp(T.sesgo - 0.1, 'stamp', 0.7); sp(T.cerebro, 'pop', 0.6); sp(T.correr, 'swoosh_up', 0.5); sp(T.compensa + 0.15, 'scratch', 0.8); sp(T.compensa + 0.35, 'stamp', 0.9);
  shakeAt(T.compensa + 0.35, 0.35, 14);
  return t => {
    set(ry, { r: t * 5 });
    const kp = p(t, T.sesgo - 0.15, 0.4, E.outBack); set(placa, { o: t > T.sesgo - 0.15 ? 1 : 0, s: lerp(1.8, 1, clamp(kp)) * (t > T.sesgo - 0.15 ? 1 : 0), r: -2 + wobble(t, 0.4, 0.6) });
    const kc = p(t, T.cerebro - 0.15, 0.45, E.outBack);
    set(cer, { x: 500, y: 880 + Math.sin(t * 5) * 8, s: kc * (1 + 0.04 * Math.sin(t * 9)), o: t > T.cerebro - 0.15 ? 1 : 0, r: t > T.compensa + 0.35 ? Math.sin(t * 20) * 3 : wobble(t, 0.5, 3) });
    vls.forEach((l, i) => { const k = (t * 2.5 + i / 3) % 1; set(l, { x: 470 - k * 160, y: 960 + i * 50, o: t > T.correr && t < T.compensa + 0.3 ? 1 - k : 0 }); });
    set(bur, { o: t > T.correr - 0.15 ? 1 : 0, s: pop(t, T.correr - 0.15, 0.35), r: -2 });
    pts.forEach((d, i) => set(d, { x: 700 + i * 30, y: 860 + i * 30, o: t > T.correr - 0.15 ? 1 : 0 }));
    set(tch, { sx: p(t, T.compensa + 0.15, 0.25), r: -6, o: t > T.compensa + 0.15 ? 1 : 0 });
    golpeS(no, t, T.compensa + 0.35, 8);
  };
});

/* ===================== L9a · ¡OJO! falta lo peor (señal de obras) ===================== */
plano(L(9) - 0.1, T.ahorro9 - 0.1, PAPEL, c => {
  sello(c, 280, '¡OJO!', T.ojo, { size: 120, r: -6 });
  const tp = texto(c, 470, 'falta lo ' + hlSpan('peor', 'phl9', '#ffb3b3'), { size: 100, z: 30 });
  const sen = figura(c, 0, 0, 460, 420, `<path d="M230,20 L440,390 H20 Z" fill="#fff" stroke="${RED}" stroke-width="34" stroke-linejoin="round"/><path d="M230,20 L440,390 H20 Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="205" cy="170" r="22" fill="${INK}"/><path d="M200,200 L180,290 M200,200 L250,250 L270,300 M180,290 L150,340 M180,290 L220,340" stroke="${INK}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M250,250 L300,200 M290,195 L320,230" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M270,340 Q300,300 330,340 Z" fill="${INK}"/>`, '0 0 460 420', { z: 12, origin: '50% 100%' });
  const conos = [0, 1, 2, 3].map(() => CONO(c, 110, 13));
  sp(T.peor, 'thud', 0.8); sp(T.ojo + 0.4, 'swoosh_up', 0.5);
  return t => {
    set(tp, { o: t > T.peor - 0.2 ? 1 : 0, s: pop(t, T.peor - 0.2, 0.3), r: -2 }); paint(c.querySelector('.phl9'), t, T.peor + 0.1, 0.35);
    const ks = p(t, L(9) + 0.2, 0.5, E.outBack); set(sen, { x: 300, y: 660, sy: ks, r: Math.sin(t * 3) * 3 });
    conos.forEach((k, i) => set(k, { x: 160 + i * 200, y: 1120, s: pop(t, L(9) + 0.4 + i * 0.1, 0.35), r: Math.sin(t * 5 + i) * 4 }));
  };
});

/* ===================== L9b · el ahorro se aplana… pero la frenada no (distancia de frenado ∝ v², ×1,44 de 100 a 120) ===================== */
const FR_Y = d => 1180 - d / 120 * 700; let FREN = ''; for (let v = 20; v <= 140; v += 2) { const ms = v / 3.6; FREN += (v === 20 ? 'M' : 'L') + f1(GX(v)) + ',' + f1(FR_Y(ms * ms / 14)) + ' '; }
plano(T.ahorro9 - 0.1, T.si9 - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ta = texto(c, 280, 'el ahorro se ' + hlSpan('aplana', 'ahl'), { size: 84, z: 30 }), tb = texto(c, 280, 'la frenada ' + hlSpan('NO', 'fhl9', '#ffb3b3'), { size: 96, z: 30 });
  const g = box(cam, 0, 0, 1080, 1920, { zIndex: 5 }, EJES(`<path d="${CURVA}" stroke="#9a96a0" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path class="fr" d="${FREN}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/><path class="fr2" d="${FREN}" stroke="${RED}" stroke-width="10" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1"/>
    <circle class="p1" cx="${f1(GX(100))}" cy="${f1(FR_Y(55.1))}" r="16" fill="${AZUL}" stroke="${INK}" stroke-width="6" opacity="0"/><circle class="p2" cx="${f1(GX(120))}" cy="${f1(FR_Y(79.4))}" r="16" fill="${CUN}" stroke="${INK}" stroke-width="6" opacity="0"/>`));
  g.querySelector('text:last-of-type').textContent = 'tiempo · frenada';
  const fr = [g.querySelector('.fr'), g.querySelector('.fr2')], p1 = g.querySelector('.p1'), p2 = g.querySelector('.p2');
  const lab1 = chip(cam, 330, 1000, 'ahorro', { size: 46, bg: '#77737c', z: 8 }), lab2 = chip(cam, 360, 640, 'frenada', { size: 46, bg: RED, z: 8 });
  const x144 = box(c, 140, 1260, 560, 110, { zIndex: 40, background: RED, border: `8px solid ${INK}`, borderRadius: '60px', boxShadow: `8px 8px 0 ${INK}`, color: '#fff', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '58px', lineHeight: '94px', textAlign: 'center', transformOrigin: '50% 50%', whiteSpace: 'nowrap', boxSizing: 'border-box' }, 'de 100 a 120: ×1,44');
  sp(T.aplana, 'boing', 0.4); sp(T.frenada - 0.1, 'swoosh_up', 0.7); sp(T.no9, 'stamp', 0.8);
  shakeAt(T.no9, 0.3, 12);
  return t => {
    deriva(cam, t, T.ahorro9 - 0.1, T.si9 - 0.1, [540, 880, 1.0], [600, 840, 1.08]);
    set(ta, { o: t < T.frenada - 0.15 ? 1 : 0, r: -2 }); paint(c.querySelector('.ahl'), t, T.aplana, 0.35);
    set(tb, { o: t >= T.frenada - 0.15 ? 1 : 0, s: pop(t, T.frenada - 0.15, 0.3), r: 2 }); paint(c.querySelector('.fhl9'), t, T.no9, 0.3);
    const k = p(t, T.frenada - 0.1, 0.9, E.inOutCubic); fr.forEach(e => e.setAttribute('stroke-dashoffset', f1((1 - k) * 1000) / 1000));
    p1.setAttribute('opacity', k > 0.7 ? 1 : 0); p2.setAttribute('opacity', k > 0.85 ? 1 : 0);
    vis(lab1, t, T.ahorro9, 99, { r: -3 }); vis(lab2, t, T.frenada + 0.3, 99, { r: 3 });
    set(x144, { o: t > T.no9 ? 1 : 0, s: t < T.no9 ? 0 : lerp(1.8, 1, E.outCubic(clamp((t - T.no9) / 0.22))), r: -3 });
  };
});

/* ===================== L9c · vista cenital: ven las obras en el mismo punto. 1 s de reacción + 7 m/s².
   Tú (100) paras en 82,9 m, justo antes de los conos; tu cuñado (120) llega a ellos a ~73 km/h («unos setenta»). Sin choque. ===================== */
const KMH = 3.6, DEC = 7, PARO = 100 / KMH + (100 / KMH) ** 2 / (2 * DEC);   // 82,9 m
const fis = (v0k, r) => { const v0 = v0k / KMH; if (r <= 0) return [0, v0k]; if (r <= 1) return [v0 * r, v0k];
  const tb = Math.min(r - 1, v0 / DEC); return [v0 + v0 * tb - DEC / 2 * tb * tb, (v0 - DEC * tb) * KMH]; };
plano(T.si9 - 0.1, L(10) - 0.1, { background: HIERBA }, c => {
  const cam = CAM(c);
  box(cam, -400, -600, 1880, 3200, { zIndex: 0, background: HIERBA, backgroundImage: 'repeating-linear-gradient(10deg, rgba(43,33,24,.07) 0 8px, transparent 8px 70px)' });
  box(cam, 170, -600, 640, 3200, { zIndex: 1, background: ASF, borderLeft: `10px solid ${INK}`, borderRight: `10px solid ${INK}` });
  [190, 778].forEach(x => box(cam, x, -600, 12, 3200, { zIndex: 2, background: '#f4efe2' }));
  const mid = box(cam, 484, -600, 12, 3200, { zIndex: 2, backgroundImage: 'repeating-linear-gradient(0deg, #f4efe2 0 90px, transparent 90px 180px)' });
  const YL = 1290, YC = 690, PXM = (YL - YC) / PARO;
  const conos = [0, 1, 2, 3, 4, 5].map(() => CONO(cam, 92, 6));
  const obras = box(cam, 380, 400, 220, 110, { zIndex: 7, background: YEL, border: `8px solid ${INK}`, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '56px', lineHeight: '92px', textAlign: 'center', color: INK, transformOrigin: '50% 100%', boxSizing: 'border-box' }, 'OBRAS');
  const linea = box(cam, 180, YL - 6, 620, 12, { zIndex: 5, backgroundImage: `repeating-linear-gradient(90deg, #fff 0 30px, transparent 30px 50px)`, transformOrigin: '0 50%' });
  const tu = COCHE_T(cam, AZUL, false, 12), cu = COCHE_T(cam, CUN, true, 12);
  const vT = SPEEDO(c, 210, 30), vC = SPEEDO(c, 210, 30);
  const lT = chip(c, 90, 478, 'TÚ', { size: 46, bg: AZUL, z: 35 }), lC = chip(c, 620, 478, 'CUÑADO', { size: 46, bg: CUN, z: 35 });
  const reac = chip(c, 40, 1150, '1 s de reacción', { size: 50, bg: INK, z: 40 });
  const ok = chip(c, 30, 1010, '¡justo!', { size: 56, bg: VERDE, z: 40 });
  const alarma = box(c, 0, 0, 1080, 1920, { zIndex: 60, pointerEvents: 'none', boxShadow: `inset 0 0 0 40px ${RED}`, opacity: 0 });
  const s70 = SELLO(c, 160, 1150, 720, '¡70 KM/H!', RED, 70, 100);
  const TS = T.obras, TSTOP = T.justo + 0.45, K = (TSTOP - TS) / (PARO / (100 / KMH) + 0); // segundos de pantalla por segundo real
  const rStop = 1 + (100 / KMH) / DEC, kAnim = (TSTOP - TS) / rStop;
  const rCun = (() => { let r = 1; while (fis(120, r)[0] < PARO) r += 0.001; return r; })(), tCun = TS + rCun * kAnim;
  sp(T.obras - 0.15, 'pop', 0.6); sp(TS + kAnim, 'scratch', 0.8); sp(TSTOP, 'ding', 0.7); sp(tCun, 'error', 0.6); sp(T.el9, 'swoosh_up', 0.6);
  [0, 1, 2, 3].forEach(i => sp(T.conos + i * 0.45, 'tick', 0.8)); sp(T.s70, 'stamp', 1.0);
  shakeAt(T.s70, 0.4, 16);
  return t => {
    const foco = p(t, T.el9 - 0.1, 0.6, E.inOutCubic);
    deriva(cam, t, T.si9 - 0.1, L(10) - 0.1, [490, 960, 1.0], [490, 940, 1.02]);
    if (foco > 0) { cam.style.transformOrigin = '0 0'; const cx = lerp(490, 630, foco), cy = lerp(950, 800, foco), s = lerp(1.0, 1.25, foco); set(cam, { x: 540 - cx * s, y: 960 - cy * s, s }); }
    const r = (t - TS) / kAnim;
    const [dT, vt] = fis(100, r), [dC0, vc0] = fis(120, Math.min(r, rCun));
    const fT = YL - dT * PXM, fC = YL - Math.min(dC0, PARO) * PXM;
    const pre = t < TS; mid.style.backgroundPosition = `0 ${f1(pre ? (t * 900) % 180 : (TS * 900) % 180)}px`;
    set(tu, { x: 330 - 85, y: fT + Math.sin(t * 30) * (vt > 1 ? 1 : 0) }); set(cu, { x: 640 - 85, y: fC + Math.sin(t * 34) * (vc0 > 1 && r < rCun ? 1 : 0) });
    tu.fr.setAttribute('opacity', r > 1 && vt > 0.5 ? 1 : 0.25); cu.fr.setAttribute('opacity', r > 1 ? 1 : 0.25);
    conos.forEach((k, i) => set(k, { x: 200 + i * 104, y: YC - 115, o: t > T.obras - 0.25 ? 1 : 0, s: pop(t, T.obras - 0.25 + i * 0.05, 0.3), r: (t > tCun && i >= 3) ? Math.sin(t * 18 + i) * 8 : 0 }));
    set(obras, { o: t > T.obras - 0.25 ? 1 : 0, sy: pop(t, T.obras - 0.25, 0.35) });
    set(linea, { o: t > TS - 0.05 ? 1 : 0, sx: p(t, TS - 0.05, 0.3) });
    setV(vT, vt); set(vT, { x: 60, y: 290, r: wobble(t, 0.4, 1.5) });
    const congelado = t >= tCun; setV(vC, vc0, congelado ? '≈70' : null);
    vC.cara.setAttribute('fill', congelado && Math.sin(t * 18) > 0 ? '#ffb3b3' : CRE);
    set(vC, { x: 620, y: 290, r: wobble(t, 0.4, 1.5), s: congelado ? 1 + 0.05 * Math.abs(Math.sin(t * 9)) : 1 });
    set(lT, { o: 1, r: -4 }); set(lC, { o: 1, r: 4 });
    vis(reac, t, TS + 0.05, TS + kAnim + 0.5, { r: -2 });
    vis(ok, t, TSTOP - 0.05, 99, { r: -5 });
    set(alarma, { o: t > T.el9 ? 0.25 + 0.55 * Math.abs(Math.sin(t * 7)) : 0 });
    golpeS(s70, t, T.s70, -6);
  };
});

/* ===================== L10 · O SEA: balanza — «5 minutos» frente a «todo lo demás» ===================== */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 500, 1400, 24, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 0);
  const ta = texto(c, 280, 'gana ' + hlSpan('5 minutos', 'g5'), { size: 96, z: 30 }), tb = texto(c, 280, 'y se juega ' + hlSpan('todo lo demás', 'tld', '#ffb3b3'), { size: 80, z: 30 });
  const pie = figura(c, 380, 760, 200, 480, `<path d="M100,20 L130,440 H70 Z" fill="#8a6a44" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><rect x="10" y="430" width="180" height="40" rx="12" fill="#6b4f30" stroke="${INK}" stroke-width="8"/><circle cx="100" cy="24" r="22" fill="${GOLD}" stroke="${INK}" stroke-width="7"/>`, '0 0 200 480', { z: 8, origin: '50% 0%' });
  const viga = box(c, 160, 774, 640, 24, { zIndex: 9, background: '#8a6a44', border: `7px solid ${INK}`, borderRadius: '12px', transformOrigin: '50% 50%', boxSizing: 'border-box' });
  const plato = () => figura(c, 0, 0, 280, 220, `<path d="M140,0 L30,150 M140,0 L250,150" stroke="${INK}" stroke-width="6"/><path d="M10,150 H270 Q250,210 140,210 Q30,210 10,150 Z" fill="${GOLD}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`, '0 0 280 220', { z: 10, origin: '50% 0%' });
  const PL = plato(), PR = plato();
  const reloj = CRONO(c, 140, 12);
  const r5 = chip(c, 0, 0, '5 min', { size: 46, bg: AZUL, z: 14 });
  const pesa = figura(c, 0, 0, 300, 250, `<path d="M95,70 C95,10 205,10 205,70" stroke="${INK}" stroke-width="22" fill="none"/><path d="M95,70 C95,10 205,10 205,70" stroke="#55585f" stroke-width="10" fill="none"/>
    <path d="M40,64 L260,64 L292,240 L8,240 Z" fill="#33353b" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><text x="150" y="150" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="62" fill="#fff">TODO LO</text><text x="150" y="214" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="62" fill="#fff">DEMÁS</text>`, '0 0 300 250', { z: 13, origin: '50% 100%' });
  const cun = figura(c, 0, 0, 200, 220, `<circle cx="100" cy="110" r="80" fill="${PIEL}" stroke="${INK}" stroke-width="8"/><path d="M20,100 C14,40 70,20 104,32 L130,0 L134,34 L170,20 L164,62 C184,80 184,96 180,110 C150,70 60,60 20,100 Z" fill="#241710" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M30,96 H172 V114 Q160,140 134,136 Q112,134 108,116 H94 Q88,136 64,136 Q34,136 30,114 Z" fill="#111" stroke="${INK}" stroke-width="5"/><path class="bc" d="M70,164 Q104,180 140,152" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path class="sd" d="M172,60 q12,20 0,30 q-12,-10 0,-30 Z" fill="#8fd3ff" stroke="${INK}" stroke-width="4" opacity="0"/>`, '0 0 200 220', { z: 20, origin: '50% 100%' });
  const bc = cun.querySelector('.bc'), sd = cun.querySelector('.sd');
  sp(T.gana, 'cash', 0.6); sp(T.cinco10, 'pop', 0.6); sp(T.juega, 'whoosh', 0.7); sp(T.todo10 - 0.05, 'thud', 1.3); sp(T.todo10 + 0.2, 'boing', 0.5);
  shakeAt(T.todo10 - 0.05, 0.5, 22);
  return t => {
    set(ry, { r: t * 5 });
    const ph2 = t >= T.juega - 0.1;
    set(ta, { o: ph2 ? 0 : 1, r: -2 }); paint(c.querySelector('.g5'), t, T.cinco10, 0.35);
    set(tb, { o: ph2 ? 1 : 0, s: pop(t, T.juega - 0.1, 0.3), r: 2 }); paint(c.querySelector('.tld'), t, T.todo10, 0.35);
    const kd = p(t, T.juega, T.todo10 - T.juega - 0.05, E.inCubic), imp = t > T.todo10 - 0.05;
    const ang = (t > T.cinco10 ? -9 * p(t, T.cinco10, 0.5, E.outBack) : 0) * (imp ? 0 : 1) + (imp ? 16 + 6 * Math.exp(-(t - T.todo10) * 5) * Math.sin((t - T.todo10) * 22) : 0);
    set(viga, { r: ang });
    const rad = ang * Math.PI / 180, cx = 480, cy = 786, ex = Math.cos(rad) * 300, ey = Math.sin(rad) * 300;
    set(PL, { x: cx - ex - 140, y: cy - ey }); set(PR, { x: cx + ex - 140, y: cy + ey });
    set(reloj, { x: cx - ex - 70, y: cy - ey + 6 - 0, o: t > T.cinco10 - 0.1 ? 1 : 0, s: pop(t, T.cinco10 - 0.1, 0.35) }); aguja(reloj, t * 200);
    set(r5, { x: cx - ex - 85, y: cy - ey + 230, o: t > T.cinco10 ? 1 : 0, r: -4 });
    set(pesa, { x: cx + ex - 150, y: imp ? cy + ey + 150 - 250 + 0 : lerp(-300, cy + ey - 100, kd), o: t > T.juega ? 1 : 0, r: imp ? 0 : Math.sin(t * 12) * 4 });
    set(cun, { x: 40, y: 1110 + (imp ? Math.sin(t * 30) * 4 : 0), s: pop(t, T.osea, 0.35), r: wobble(t, 0.5, 3) });
    bc.setAttribute('d', imp ? 'M66,170 Q104,148 142,170' : 'M70,164 Q104,180 140,152'); sd.setAttribute('opacity', imp ? 1 : 0);
  };
});

/* L11 · CTA de seguir */
sigueme(11, 'Esto en clase…', '…no te lo cuentan', 'sígueme');

/* L12 · pregunta final (+ «Os leo») */
preguntaFinal('¿A cuánto vas tú', 'por la autovía?', { size: 86, draw: c => [['a 120 clavado', YEL], ['a 100, lo juro', '#9fd3c0'], ['yo soy el cuñado', PINK]].map(([s, col], i) => aparece(chip(c, 210 + i * 40, 640 + i * 160, s, { size: 54, bg: col, color: INK }), L(12) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(308, '¿Correr compensa?', ['CARRETERAS', 'con truco']);

Story.run({
  textura: true,
  ovalo: [[L(1) + 2.0, L(2) - 0.15], [T.hoy, L(9) - 0.15]],
  vecino: { sorpresa: [[T.falla, T.falla + 0.9]], risa: [[T.correr, T.correr + 0.9]], golpes: [T.compensa + 0.35] },
});
