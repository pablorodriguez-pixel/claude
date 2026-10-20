/* Ep. 71 · «Salvado por la campana» no viene de enterrados vivos — edición estilo ep07 OK / ep64 (Vecino fijo, escenarios llenos, caras, cero emojis) */
Story.prepara();
const T = {
  salvado0: Q('salvado por la campana'), enterrados: Q('enterrados vivos'),
  ataudes: Q('los ataúdes'), campanita: Q('con campanita'), existe: Q('existe'), miedo: Q('bastante miedo'),
  siglo: Q('siglo diecinueve'), panico: Q('hay pánico'), vivo: Q('entierren vivo'), europa: Q('en europa'), america: Q('en américa'),
  patentan: Q('se patentan'), tubo: Q('un tubo'), cuerda: Q('una cuerda'), mano: Q('a la mano'), suena: Q('hace sonar'), fuera: Q('campana fuera'),
  decenas: Q('decenas de inventos'), banderita: Q('una banderita'), levantaba: Q('se levantaba'),
  bulo5: Q('dice el bulo'), expresion: Q('la expresión'), tocaba: Q('tocaba la campana'), salvaba: Q('se salvaba'),
  ni: Q('ni un solo caso'), documentado: Q('documentado'), esas: Q('esas campanas'),
  boxeo: Q('del boxeo'), boxeador: Q('el boxeador'), caer: Q('a punto de caer'), suena8: Q('suena la campana'), asalto: Q('del asalto'), salva8: Q('y se salva'),
  prensa: Q('la prensa deportiva'), finales: Q('a finales'), calle: Q('a la calle'),
  bulo10: Q('el bulo'), famoso: Q('lo hizo famoso'), correo: Q('un correo en cadena'), noventa: Q('años noventa'),
  ojo: Q('ojo'), antes: Q('la ve antes'), contextos: Q('otros contextos'),
  ring12: Q('la del ring'),
};
const ROJO = '#c8102e', AZULR = '#2b4a8c', CREMA = '#FBF6EA', PIEL = '#f6d7c3', ORO = '#e2b33c', NOCHE = '#2f3d5c', TIERRA = '#7a5230';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });

/* ---------- cara genérica ---------- */
const CARA = (k, cx, cy, s = 1, lab = '#7a2a20') => `<g class="${k}c"><path d="M${cx - 36 * s},${cy - 24 * s} q${14 * s},${-9 * s} ${28 * s},0 M${cx + 8 * s},${cy - 24 * s} q${14 * s},${-9 * s} ${28 * s},0" stroke="${INK}" stroke-width="${4 * s}" fill="none" stroke-linecap="round"/></g>
  <g class="${k}e"><ellipse cx="${cx - 21 * s}" cy="${cy}" rx="${13 * s}" ry="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${3.5 * s}"/><ellipse cx="${cx + 21 * s}" cy="${cy}" rx="${13 * s}" ry="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${3.5 * s}"/></g>
  <g class="${k}p"><circle cx="${cx - 20 * s}" cy="${cy + 2 * s}" r="${6 * s}" fill="${INK}"/><circle cx="${cx + 22 * s}" cy="${cy + 2 * s}" r="${6 * s}" fill="${INK}"/></g>
  <path class="${k}m" d="" fill="${lab}" stroke="${INK}" stroke-width="${3.5 * s}" stroke-linejoin="round"/>`;
const caraK = (f, t, o, k, cx, cy, s = 1) => caraF(f, t, o, cy, [cx, cy + 38 * s, 15 * s, '.' + k + 'm', '.' + k + 'p', '.' + k + 'e', '.' + k + 'c']);

/* ---------- figuras ---------- */
/* campana con cara (vb 0 0 200 230), cuelga desde (100,0) */
const campanaInner = () => `<path d="M100,0 V24" stroke="${INK}" stroke-width="8"/><path d="M30,190 C30,90 50,30 100,30 C150,30 170,90 170,190 L186,206 L14,206 Z" fill="${ORO}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M56,70 C48,100 46,140 48,170" stroke="#fff" stroke-width="10" opacity=".45" fill="none" stroke-linecap="round"/><circle class="badajo" cx="100" cy="214" r="16" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/>${CARA('k', 100, 118, 0.85)}`;
const CAMPANA = (c, x, y, w, z = 12) => figura(c, x, y, w, w * 1.15, campanaInner(), '0 0 200 230', { z, origin: '50% 0%' });
const campana = (f, t, o) => caraK(f, t, o, 'k', 100, 118, 0.85);
const tilin = (f, t, t0, dur = 1.2, a = 26) => { const k = t > t0 && t < t0 + dur ? Math.sin((t - t0) * 22) * a * (1 - (t - t0) / dur) : Math.sin(t * 2) * 3; set(f, { r: k }); return Math.abs(k) > 4; };
/* lápida con cara (vb 0 0 200 260) */
const lapidaInner = (txt = 'R.I.P.') => `${FIGP('M20,260 L20,90 C20,20 180,20 180,90 L180,260 Z', '#a9a9a0', 6, .35)}<text x="100" y="92" text-anchor="middle" font-family="Rye" font-size="30" fill="${INK}">${txt}</text>${CARA('l', 100, 160, 0.8)}`;
const LAPIDA = (c, x, y, w, txt) => figura(c, x, y, w, w * 1.3, lapidaInner(txt), '0 0 200 260', { z: 6, origin: '50% 100%' });
const lapida = (f, t, o) => caraK(f, t, o, 'l', 100, 160, 0.8);
/* ataúd en corte con su ocupante (vb 0 0 620 220): cabeza en (110,110) */
const ataudInner = () => `<path d="M10,60 L80,10 L560,10 L610,60 L610,160 L560,210 L80,210 L10,160 Z" fill="#6b3f1e" stroke="${INK}" stroke-width="7"/><path d="M40,64 L92,32 L548,32 L586,64 L586,156 L548,188 L92,188 L40,156 Z" fill="#e9d7b0" stroke="${INK}" stroke-width="4"/>
  <path d="M170,80 C260,60 420,60 540,90 L540,150 C420,170 260,160 170,140 Z" fill="#5c7fae" stroke="${INK}" stroke-width="5"/><circle cx="110" cy="110" r="58" fill="${PIEL}" stroke="${INK}" stroke-width="5"/><path d="M56,96 C60,44 160,44 166,96 C140,70 90,70 56,96 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="4"/>${CARA('a', 110, 104, 0.75)}`;
const ATAUD = (c, x, y, w) => figura(c, x, y, w, w * 220 / 620, ataudInner(), '0 0 620 220', { z: 8, origin: '50% 50%' });
const muerto = (f, t, o) => caraK(f, t, o, 'a', 110, 104, 0.75);
const MANO = (c, x, y, rot = -40, s = 1.1) => { const h = box(c, x, y, 160, 160, { zIndex: 9 }); h.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, rot, s)}</svg>`; return h; };
/* suelo en corte: hierba arriba (y0) y tierra con piedras */
const SUELO = (c, y0, z = 3) => box(c, 0, y0, 1080, 1920 - y0, { zIndex: z, background: TIERRA, borderTop: `14px solid #4c8a3a`, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,.18) 0 14px, transparent 15px), radial-gradient(circle at 70% 60%, rgba(0,0,0,.15) 0 10px, transparent 11px), radial-gradient(circle at 45% 80%, rgba(255,255,255,.10) 0 18px, transparent 19px)', backgroundSize: '240px 200px' });
const linea = (c, x, y, w, h, col, z = 7) => box(c, x, y, w, h, { zIndex: z, background: col, border: `4px solid ${INK}`, transformOrigin: '50% 100%' });
const MURC = (c, x, y) => box(c, x, y, 140, 70, { zIndex: 6 }, `<svg viewBox="0 0 140 70" width="140" height="70"><path class="ala" d="" fill="${INK}"/><circle cx="70" cy="36" r="12" fill="${INK}"/><circle cx="66" cy="34" r="3" fill="#fff"/><circle cx="74" cy="34" r="3" fill="#fff"/></svg>`);
const aleteo = (m, t, i) => { const a = f1(10 + 22 * Math.sin(t * 14 + i)); m.querySelector('.ala').setAttribute('d', `M70,36 Q40,${a} 4,30 Q30,40 40,52 Q56,42 70,46 Q84,42 100,52 Q110,40 136,30 Q100,${a} 70,36 Z`); };
const ciudadano = (c, x, y, w, i) => mkBust(c, [x, y, w, w * 1.28], { uniform: 'farmer', hat: ['cap', 'slouch', 'brodie'][i % 3], moustache: i % 2 === 0, beard: i % 3 === 1, seed: 140 + i });
const DIARIO = (c, x, y, tit, l1, l2) => box(c, x, y, 760, 520, { zIndex: 30, background: '#f4efe2', border: `7px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` }, `<div style="font-family:Rye;font-size:54px;text-align:center;border-bottom:6px double ${INK};padding:14px 0 8px;color:${INK}">${tit}</div><div style="font-family:Playfair;font-weight:900;font-size:76px;line-height:1;text-align:center;color:${INK};padding:24px 20px 10px">${l1}</div><div style="font-family:Playfair;font-style:italic;font-weight:800;font-size:46px;text-align:center;color:${ROJO}">${l2}</div><div style="margin:18px 40px;height:80px;background:repeating-linear-gradient(0deg,rgba(43,33,24,.35) 0 4px,transparent 4px 18px)"></div>`);
const giraD = (e, t, t0) => { const k = p(t, t0, 0.55, E.outCubic); set(e, { o: t > t0 ? 1 : 0, s: lerp(0.05, 1, k), r: lerp(720, -4, k) }); };
const PATENTE = (c, x, y, w, n) => box(c, x, y, w, w * 1.25, { zIndex: 9, background: '#e8eef6', border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, backgroundImage: 'linear-gradient(rgba(43,74,140,.15) 2px, transparent 2px), linear-gradient(90deg, rgba(43,74,140,.15) 2px, transparent 2px)', backgroundSize: '30px 30px' },
  `<div style="font-family:Rye;font-size:${f1(w * 0.09)}px;text-align:center;color:${AZULR};padding-top:${f1(w * 0.05)}px">PATENTE</div><div style="font-family:SpecialElite;font-size:${f1(w * 0.06)}px;text-align:center;color:${INK}">Nº ${n}</div><svg viewBox="0 0 300 200" width="${w}" height="${f1(w * 0.66)}"><path d="M20,140 L60,110 L260,110 L280,140 L260,170 L60,170 Z" fill="none" stroke="${AZULR}" stroke-width="5"/><path d="M240,110 V30 M150,110 V40 H190" stroke="${AZULR}" stroke-width="5" fill="none"/><path d="M180,30 q10,-24 20,0 Z" fill="none" stroke="${AZULR}" stroke-width="5"/><path d="M0,90 H300" stroke="${AZULR}" stroke-width="3" stroke-dasharray="10 8"/></svg>`);
const BOXEADOR = (k, shorts) => `<path d="M60,460 L90,300 L210,300 L240,460 Z" fill="${shorts}" stroke="${INK}" stroke-width="6"/><path d="M80,330 H220" stroke="#fff" stroke-width="10"/><path d="M90,300 C80,220 110,190 150,190 C190,190 220,220 210,300 Z" fill="${PIEL}" stroke="${INK}" stroke-width="6"/>
  <circle cx="150" cy="110" r="84" fill="${PIEL}" stroke="${INK}" stroke-width="6"/><path d="M70,100 C70,30 230,30 230,100 C200,60 110,60 70,100 Z" fill="#3a2a1a" stroke="${INK}" stroke-width="5"/><ellipse cx="64" cy="118" rx="14" ry="22" fill="${PIEL}" stroke="${INK}" stroke-width="5"/><ellipse cx="236" cy="118" rx="14" ry="22" fill="${PIEL}" stroke="${INK}" stroke-width="5"/>
  <g class="gl"><circle cx="40" cy="250" r="50" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><circle cx="260" cy="230" r="50" fill="${ROJO}" stroke="${INK}" stroke-width="6"/><ellipse cx="26" cy="232" rx="16" ry="10" fill="#fff" opacity=".4"/></g>${CARA(k, 150, 110, 1.05)}`;
const BOX = (c, x, y, w, k, shorts) => figura(c, x, y, w, w * 460 / 300, BOXEADOR(k, shorts), '0 0 300 460', { z: 9, origin: '50% 100%' });
const boxF = (f, t, o, k) => caraK(f, t, o, k, 150, 110, 1.05);
const ding = (c, x, y) => texto(c, y, '¡DING!', { size: 96, italic: true, color: ROJO, x, w: 420, z: 40, shadow: `5px 5px 0 ${INK}` });

/* L0 · PORTADA (fotograma 0 completo): cementerio en corte — el enterrado tira de la cuerda, la campana con cara suena */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 300, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 220, '«Salvado por la', { size: 86 });
  const t2 = texto(c, 310, hlSpan('campana', 'phl') + '»', { size: 140, italic: true });
  const luna = box(c, 840, 520, 150, 150, { zIndex: 2, background: '#f4efe2', border: `6px solid ${INK}`, borderRadius: '50%' });
  const lps = [[60, 760, 170, 'R.I.P.'], [820, 790, 160, '1850']].map(([x, y, w, s]) => LAPIDA(c, x, y, w, s));
  const poste = box(c, 520, 560, 18, 440, { zIndex: 5, background: '#6b4a2a', border: `4px solid ${INK}` }); box(c, 520, 560, 200, 18, { zIndex: 5, background: '#6b4a2a', border: `4px solid ${INK}` });
  const cp = CAMPANA(c, 590, 578, 190);
  SUELO(c, 1000);
  const cue = box(c, 682, 800, 8, 430, { zIndex: 7, background: '#d9b56c', border: `2px solid ${INK}` });
  const tubo = box(c, 330, 940, 40, 210, { zIndex: 7, background: '#9aa4ad', border: `5px solid ${INK}` });
  const at = ATAUD(c, 210, 1140, 620);
  const mn = MANO(c, 610, 1150, -90, 1.0);
  const bulo = stamp(c, 300, 560, '¡BULO!', { size: 120, z: 50, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const dg = ding(c, 600, 430);
  sfx('swoosh_up', 0.05, 0.6); sp(0.5, 'bell', 0.5); sp(T.enterrados + 0.25, 'stamp', 1);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const sw = tilin(cp, t, 0.4, 1.6, 24); campana(cp, t, { jaw: talkW(t, 'VECINO'), feliz: 1, look: [-6, 4], ceja: sw ? 10 : 2 });
    set(dg, { o: t > 0.4 && t < 1.8 ? 1 : 0, r: -8, s: 1 + 0.1 * Math.sin(t * 20) });
    const tir = Math.abs(Math.sin(t * 7)); set(cue, { y: tir * 16 }); set(mn, { y: tir * 16 });
    muerto(at, t, { look: [8, -6], feliz: -1, ceja: 14, jaw: 0.6 });
    lps.forEach((l, i) => { set(l, { x: Math.sin(t * 30 + i) * 2, r: Math.sin(t * 3 + i) * 3 }); lapida(l, t, { look: [i ? -8 : 8, 6], feliz: -1, ceja: 12, jaw: 0.3, seed: i }); });
    set(luna, { s: 1 + 0.03 * Math.sin(t * 2) });
    stampA(bulo, t, T.enterrados + 0.25, -10);
  };
}, { sfx: false });
shakeAt(T.enterrados + 0.3, 0.3, 14);

/* L1 · aunque los ataúdes con campanita existen… y dan miedo: cementerio de noche, murciélagos, lápidas que tiemblan */
headline(L(1) - 0.1, L(2) - 0.1, 'Ataúdes con *campanita*', { size: 84, hlT: T.campanita, color: '#fff' });
plano(L(1) - 0.1, L(2) - 0.1, { background: NOCHE }, c => {
  const cam = CAM(c);
  const luna = box(cam, 760, 380, 200, 200, { zIndex: 2, background: '#f4efe2', border: `7px solid ${INK}`, borderRadius: '50%', boxShadow: '0 0 80px rgba(255,255,220,.6)' });
  const est = [...Array(10)].map((_, i) => { const e = ESTRELLA(cam, 30, '#f4efe2'); e.style.left = px(60 + (i * 173) % 900); e.style.top = px(380 + (i * 97) % 380); e.style.zIndex = 2; return e; });
  const ms = [0, 1, 2].map(i => MURC(cam, 0, 0));
  box(cam, 0, 1150, 1080, 800, { zIndex: 3, background: '#3e5a34', borderTop: `8px solid ${INK}` });
  const lps = [[90, 820, 220, 'R.I.P.'], [420, 860, 240, 'AQUÍ YACE'], [760, 820, 220, '1850']].map(([x, y, w, s]) => LAPIDA(cam, x, y, w, s));
  const cps = [[230, 700], [620, 720], [930, 700]].map(([x, y]) => { box(cam, x, y, 10, 470, { zIndex: 5, background: '#6b4a2a', border: `3px solid ${INK}` }); return CAMPANA(cam, x - 40, y - 20, 90, 6); });
  const nie = [0, 1].map(i => box(cam, -300, 1080 + i * 90, 900, 70, { zIndex: 9, background: 'rgba(255,255,255,.35)', borderRadius: '40px' }));
  const ex = stamp(cam, 320, 560, 'EXISTEN', { size: 100, col: '#7ab35a', z: 40, bg: 'rgba(30,40,60,.85)', blend: 'normal' });
  sp(T.ataudes, 'whoosh', 0.6); [0, 1, 2].forEach(i => sp(T.campanita + i * 0.15, 'bell', 0.35)); sp(T.existe, 'stamp', 0.9); sp(T.miedo, 'glitch', 0.7); sp(T.miedo + 0.2, 'scratch', 0.6);
  return t => {
    zoom(cam, t, L(1), 5, 0.08);
    est.forEach((e, i) => set(e, { o: 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i)) }));
    ms.forEach((m, i) => { set(m, { x: ((t * (160 + i * 40) + i * 400) % 1400) - 200, y: 560 + i * 120 + Math.sin(t * 3 + i) * 50 }); aleteo(m, t, i); });
    const miedo = t > T.miedo;
    lps.forEach((l, i) => { set(l, { x: Math.sin(t * (miedo ? 50 : 4) + i) * (miedo ? 5 : 1), y: -Math.abs(Math.sin(t * 2 + i)) * 6 }); lapida(l, t, { look: [Math.sin(t * 2 + i) * 6, 2], feliz: miedo ? -1 : 0, ceja: miedo ? 16 : 4, jaw: miedo ? 0.7 : 0, seed: i }); });
    cps.forEach((cp, i) => { tilin(cp, t, T.campanita + i * 0.15, 1.2, 22); campana(cp, t, { feliz: 1, look: [0, 4], seed: i }); });
    nie.forEach((n, i) => set(n, { x: ((t * (60 + i * 30)) % 900) - 200 + i * 300 }));
    stampA(ex, t, T.existe, -6); set(luna, { s: 1 + 0.03 * Math.sin(t * 2) });
  };
});
shakeAt(T.miedo, 0.4, 12);

/* L2 · siglo XIX: el periódico entra girando «¡ENTERRADO VIVO!»; la gente grita; Europa y América */
headline(L(2) - 0.1, L(3) - 0.1, 'Siglo *XIX*', { size: 100, hlT: T.siglo });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#e9d7b0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.10) 0 4px, transparent 4px 100px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1260, 1080, 700, { zIndex: 2, background: '#8a5a32', borderTop: `8px solid ${INK}` });
  const dia = DIARIO(cam, 160, 400, 'EL ECO', '¡ENTERRADO<br>VIVO!', 'el miedo del siglo');
  const gente = [0, 1, 2].map(i => ciudadano(cam, 310 + i * 250, 940, 260, i));
  const sd = gente.map((_, i) => sudor(cam, 360 + i * 250, 960));
  const eu = stamp(cam, 330, 820, 'EUROPA', { size: 70, col: AZULR, z: 40 }), am = stamp(cam, 600, 880, 'AMÉRICA', { size: 70, col: ROJO, z: 40 });
  sp(T.siglo, 'whoosh', 0.8); sp(T.siglo + 0.5, 'stamp', 0.9); sp(T.panico, 'scratch', 0.8); sp(T.europa, 'pop2', 0.7); sp(T.america, 'pop2', 0.7);
  return t => {
    zoom(cam, t, L(2), 4.5); giraD(dia, t, T.siglo - 0.05);
    gente.forEach((g, i) => { const k = p(t, T.panico + i * 0.1, 0.35, E.outBack); set(g.d, { o: t > T.panico + i * 0.1 ? 1 : 0, y: (1 - k) * 400 + Math.sin(t * 40 + i) * (t > T.vivo ? 4 : 0) }); face(g, t, { look: [0, -8], bL: 16, bR: 16, jaw: t > T.vivo ? 0.9 : 0.4, seed: i }); set(sd[i], { o: t > T.vivo ? 1 : 0, y: (t * 150 + i * 40) % 110 }); });
    stampA(eu, t, T.europa, -6); stampA(am, t, T.america, 5);
  };
});
shakeAt(T.siglo + 0.5, 0.3, 12); shakeAt(T.vivo, 0.35, 10);

/* L3a · se patentan ataúdes de seguridad: la patente cae, sello PATENTADO */
headline(L(3) - 0.1, L(4) - 0.1, 'Ataúd de *seguridad*', { size: 88, hlT: T.patentan + 0.3 });
plano(L(3) - 0.1, T.tubo - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 400, 1400, 20, 'rgba(255,230,0,.3)', 'rgba(0,0,0,0)', 1);
  const pt = PATENTE(cam, 310, 420, 460, '81.437');
  const st = stamp(cam, 360, 860, 'PATENTADO', { size: 82, col: AZULR, z: 40, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const inv = mkBust(cam, [700, 820, 320, 410], { uniform: 'farmer', hat: 'brodie', moustache: true, beard: true, seed: 33 });
  sp(T.patentan, 'paper', 0.8); sp(T.patentan + 0.5, 'stamp', 1);
  return t => {
    zoom(cam, t, L(3), 2); set(ry, { r: t * 6 });
    set(pt, { y: (1 - p(t, L(3), 0.45, E.outBack)) * -900, r: -3 + Math.sin(t * 2) * 1.5 });
    stampA(st, t, T.patentan + 0.5, -10);
    face(inv, t, { look: [-8, -4], bL: 10, bR: 10, jaw: t > T.patentan + 0.5 ? 0.5 : 0, seed: 0.2 }); set(inv.d, { y: -Math.abs(Math.sin(t * 6)) * 12 });
  };
});
shakeAt(T.patentan + 0.5, 0.3, 12);
/* L3b · corte del ataúd: aparece el tubo (con aire), la cuerda desde la mano… y la campana suena fuera */
const montaCorte = (cam, conTubo = true) => {
  SUELO(cam, 900);
  const poste = box(cam, 720, 420, 18, 480, { zIndex: 5, background: '#6b4a2a', border: `4px solid ${INK}` }); box(cam, 720, 420, 220, 18, { zIndex: 5, background: '#6b4a2a', border: `4px solid ${INK}` });
  const cp = CAMPANA(cam, 820, 438, 170);
  const tubo = linea(cam, 450, 780, 46, 250, '#9aa4ad', 7); const boca = box(cam, 432, 760, 82, 40, { zIndex: 8, background: '#9aa4ad', border: `5px solid ${INK}`, borderRadius: '12px' });
  const cue = linea(cam, 900, 690, 10, 380, '#d9b56c', 7);
  const at = ATAUD(cam, 340, 1010, 700);
  const mn = MANO(cam, 820, 1030, -90, 1.1);
  const aire = [0, 1, 2].map(i => box(cam, 450, 700, 50, 50, { zIndex: 9, borderRadius: '50%', border: `5px solid ${INK}`, background: '#fff' }));
  return { cp, tubo, boca, cue, at, mn, aire };
};
plano(T.tubo - 0.1, L(4) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const K = montaCorte(cam);
  const lbs = [['tubo para respirar', T.tubo, 120, 640], ['cuerda a la mano', T.cuerda, 520, 830], ['¡campana fuera!', T.fuera, 600, 360]].map(([s, t0, x, y]) => [chip(cam, x, y, s, { size: 46, bg: '#fff', color: INK }), t0]);
  const dg = ding(cam, 420, 520);
  sp(T.tubo, 'pop2', 0.7); sp(T.cuerda, 'whoosh', 0.6); sp(T.mano, 'pop', 0.6); sp(T.suena, 'bell', 1); sp(T.suena + 0.4, 'bell', 0.7);
  return t => {
    zoom(cam, t, T.tubo, 6, 0.05);
    const kt = p(t, T.tubo - 0.1, 0.5, E.outBack); set(K.tubo, { sy: kt, o: kt > 0.02 ? 1 : 0 }); set(K.boca, { o: kt > 0.9 ? 1 : 0 });
    K.aire.forEach((a, i) => { const k = ((t - T.tubo) * 0.9 + i * 0.33) % 1; set(a, { o: t > T.tubo + 0.4 ? 1 - k : 0, y: -k * 220, x: Math.sin(t * 4 + i) * 20, s: 0.5 + 0.6 * k }); });
    const kc = p(t, T.cuerda, 0.5, E.outCubic); set(K.cue, { sy: kc, o: kc > 0.02 ? 1 : 0 });
    const pull = t > T.mano ? Math.abs(Math.sin((t - T.mano) * 8)) : 0; set(K.mn, { o: t > T.cuerda ? 1 : 0, y: -pull * 30 }); set(K.cue, { y: -pull * 30 });
    muerto(K.at, t, { look: t > T.mano ? [10, -6] : [0, -4], feliz: t > T.suena ? 1 : -1, ceja: t > T.mano ? 14 : 6, jaw: t > T.mano ? 0.6 : 0, closed: t < T.cuerda - 0.3 });
    const sw = tilin(K.cp, t, T.suena, 2, 28); campana(K.cp, t, { feliz: 1, jaw: sw ? 0.8 : 0, ceja: sw ? 12 : 0, look: [-8, 6] });
    set(dg, { o: t > T.suena && t < T.suena + 1.6 ? 1 : 0, s: 1 + 0.12 * Math.sin(t * 22), r: -6 });
    lbs.forEach(([e, t0]) => popA(e, t, t0, { r: -3 }));
  };
});
shakeAt(T.suena, 0.35, 16);

/* L4 · decenas de inventos (patentes llueven y se apilan) → uno con banderita que sube */
headline(L(4) - 0.1, L(5) - 0.1, '*Decenas* de inventos', { size: 88, hlT: T.decenas });
plano(L(4) - 0.1, T.banderita - 0.15, PAPEL, c => {
  const cam = CAM(c);
  const ps = [...Array(12)].map((_, i) => PATENTE(cam, 40 + (i % 4) * 250, 0, 230, String(80000 + i * 1371)));
  const cnt = texto(cam, 400, '', { size: 160, color: AZULR, z: 40, shadow: `5px 5px 0 ${INK}` });
  const inv = [0, 1, 2].map(i => mkBust(cam, [330 + i * 250, 1000, 260, 333], { uniform: 'farmer', hat: ['brodie', 'slouch', 'cap'][i], moustache: i !== 1, beard: i === 1, seed: 160 + i }));
  ps.forEach((_, i) => sp(T.decenas - 0.2 + i * 0.12, 'paper', 0.35));
  return t => {
    let n = 0; ps.forEach((e, i) => { const t0 = T.decenas - 0.2 + i * 0.12, k = p(t, t0, 0.35, E.outBack); if (t > t0) n++; set(e, { o: t > t0 ? 1 : 0, y: lerp(-500, 700 + Math.floor(i / 4) * -120 + (i % 2) * 20, Math.min(k, 1)), r: ((i * 37) % 20) - 10 }); });
    cnt.innerHTML = n ? '×' + n * 3 : ''; inv.forEach((b, i) => { set(b.d, { o: t > T.decenas + i * 0.2 ? 1 : 0, y: (1 - p(t, T.decenas + i * 0.2, 0.35, E.outBack)) * 400 - Math.abs(Math.sin(t * 7 + i)) * 14 }); face(b, t, { look: [0, -8], bL: 10, bR: 10, jaw: Math.abs(Math.sin(t * 8 + i)) * 0.5, seed: i }); }); set(cnt, { s: 1 + 0.05 * Math.sin(t * 10) });
  };
});
plano(T.banderita - 0.15, L(5) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  SUELO(cam, 960);
  const lp = LAPIDA(cam, 120, 700, 220, 'R.I.P.');
  const asta = linea(cam, 640, 470, 14, 540, '#9aa4ad', 6);
  const band = box(cam, 658, 470, 260, 150, { zIndex: 7, background: ROJO, border: `5px solid ${INK}`, fontFamily: 'Rye', fontSize: '48px', color: '#fff', textAlign: 'center', lineHeight: '140px', transformOrigin: '0% 50%' }, '¡AQUÍ!');
  const at = ATAUD(cam, 340, 1000, 680);
  const mn = MANO(cam, 600, 1010, -60, 1.0);
  const cuervo = MURC(cam, 820, 880);
  sp(T.banderita, 'pop2', 0.7); sp(T.levantaba, 'swoosh_up', 0.9); sp(T.levantaba + 0.5, 'tada', 0.6);
  return t => {
    zoom(cam, t, T.banderita, 3);
    const k = p(t, T.levantaba - 0.1, 0.6, E.outBack); set(asta, { sy: 0.15 + 0.85 * k }); set(band, { y: (1 - k) * 425, sx: 0.85 + 0.15 * Math.sin(t * 8), r: Math.sin(t * 6) * 4 });
    const wv = Math.sin(t * 10); set(mn, { r: wv * 20, y: -Math.abs(wv) * 10 });
    muerto(at, t, { feliz: t > T.levantaba ? 1 : 0, look: [8, -6], jaw: t > T.levantaba ? 0.6 : 0.2, ceja: t > T.levantaba ? 10 : 0 });
    lapida(lp, t, { look: [8, 0], feliz: t > T.levantaba ? -1 : 0.5, ceja: t > T.levantaba ? 16 : 0, jaw: t > T.levantaba ? 0.6 : 0 }); set(lp, { r: t > T.levantaba ? -6 : 0 });
    set(cuervo, { x: t > T.levantaba ? (t - T.levantaba) * 600 : 0, y: t > T.levantaba ? -(t - T.levantaba) * 300 : 0 }); aleteo(cuervo, t, 0);
  };
});

/* L5 · y de ahí, dice el bulo, sale la expresión: «el que tocaba la campana se salvaba» (con sello BULO) */
headline(L(5) - 0.1, L(6) - 0.1, '¿De ahí la *expresión*?', { size: 86, hlT: T.expresion });
plano(L(5) - 0.1, L(6) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const K = montaCorte(cam); set(K.tubo, { o: 1 }); set(K.cue, { o: 1 });
  const cartel = box(cam, 60, 400, 780, 150, { zIndex: 30, background: CREMA, border: `7px solid ${INK}`, borderRadius: '18px', boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '50px', textAlign: 'center', lineHeight: '136px', whiteSpace: 'nowrap', color: INK }, '«¡salvado por la campana!»');
  const bulo = stamp(cam, 340, 560, 'BULO', { size: 120, z: 45, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const qs = [0, 1, 2].map(i => texto(cam, 0, '?', { size: 110, color: ROJO, x: 0, w: 120, z: 35, shadow: `4px 4px 0 ${INK}` }));
  sp(T.bulo5, 'stamp', 1); sp(T.expresion, 'pop2', 0.7); sp(T.tocaba, 'bell', 0.9); sp(T.salvaba, 'tada', 0.6);
  return t => {
    zoom(cam, t, L(5), 6, 0.05);
    stampA(bulo, t, T.bulo5, -10); popA(cartel, t, T.expresion, { r: -3 });
    const sw = tilin(K.cp, t, T.tocaba, 1.6, 26); campana(K.cp, t, { feliz: 1, jaw: sw ? 0.7 : 0, look: [-8, 4] });
    const pull = t > T.tocaba - 0.3 && t < T.tocaba + 1 ? Math.abs(Math.sin(t * 8)) : 0; set(K.mn, { o: 1, y: -pull * 30 }); set(K.cue, { y: -pull * 30 });
    muerto(K.at, t, { feliz: t > T.salvaba ? 1 : 0, look: [10, -6], jaw: t > T.salvaba ? 0.7 : 0.2, ceja: 10 });
    qs.forEach((q, i) => { const a = t * 1.6 + i * 2.1; set(q, { o: t > T.salvaba ? 1 : 0, x: 600 + Math.cos(a) * 300, y: 700 + Math.sin(a) * 120, r: Math.sin(t * 5 + i) * 15 }); });
  };
});
shakeAt(T.bulo5 + 0.05, 0.3, 14);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · ni un solo caso documentado: archivo con cajones vacíos (polillas), contador a 0 */
headline(L(7) - 0.1, L(8) - 0.1, 'Casos *documentados*', { size: 86, hlT: T.documentado });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1300, 1080, 700, { zIndex: 2, background: '#7a4a24', borderTop: `8px solid ${INK}` });
  const arm = box(cam, 330, 520, 420, 780, { zIndex: 5, background: '#8a5a32', border: `8px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` });
  const caj = [0, 1, 2, 3].map(i => box(cam, 360, 545 + i * 185, 360, 170, { zIndex: 7, background: '#a86a3a', border: `6px solid ${INK}`, borderRadius: '8px' }, `<div style="position:absolute;left:130px;top:70px;width:100px;height:24px;background:${ORO};border:4px solid ${INK};border-radius:8px"></div>`));
  const pol = [0, 1, 2, 3, 4].map(i => box(cam, 0, 0, 60, 40, { zIndex: 12 }, `<svg viewBox="0 0 60 40" width="60" height="40"><path class="ala" d="M30,20 Q10,0 2,16 Q12,30 30,22 Q48,30 58,16 Q50,0 30,20 Z" fill="#d9cdb8" stroke="${INK}" stroke-width="3"/></svg>`));
  const cero = box(cam, 140, 390, 800, 110, { zIndex: 30, background: CREMA, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '60px', textAlign: 'center', lineHeight: '98px', color: INK });
  const lupa = box(cam, 0, 0, 260, 330, { zIndex: 25 }, `<svg viewBox="0 0 300 380" width="260" height="330"><path d="M200,230 L280,360" stroke="#8a5a32" stroke-width="34" stroke-linecap="round"/><circle cx="130" cy="140" r="115" fill="rgba(200,235,250,.45)" stroke="${INK}" stroke-width="14"/><circle cx="130" cy="140" r="115" fill="none" stroke="${GOLD}" stroke-width="7"/></svg>`);
  [0, 1, 2, 3].forEach(i => sp(T.ni - 0.6 + i * 0.25, 'click', 0.5)); sp(T.ni + 0.4, 'stamp', 1); sp(T.esas, 'sad', 0.6);
  return t => {
    zoom(cam, t, L(7), 4.5);
    caj.forEach((d, i) => { const t0 = L(7) + 0.2 + i * 0.35; set(d, { x: p(t, t0, 0.3, E.outBack) * 300 * (i % 2 ? -1 : 1) * 0 + p(t, t0, 0.3, E.outBack) * 120, s: 1 + 0.05 * p(t, t0, 0.3) }); });
    pol.forEach((m, i) => { const k = ((t - L(7)) * 0.5 + i * 0.2) % 1; set(m, { o: t > L(7) + 0.4 ? 1 - k : 0, x: 520 + Math.sin(t * 3 + i) * 200, y: 900 - k * 500, r: Math.sin(t * 20 + i) * 20 }); });
    const n = Math.max(0, Math.round(lerp(99, 0, p(t, L(7), T.ni + 0.4 - L(7), E.inOutCubic)))); cero.innerHTML = `CASOS: ${n}`; set(cero, { s: t > T.ni + 0.4 ? 1 + 0.1 * (1 - p(t, T.ni + 0.4, 0.3)) : 1, r: -2 });
    set(lupa, { x: 420 + Math.sin(t * 2.2) * 200, y: 700 + Math.cos(t * 1.7) * 220, r: Math.sin(t * 2) * 8 });
  };
});
shakeAt(T.ni + 0.4, 0.35, 16);

/* L8 · la frase viene del boxeo: ring, el boxeador a punto de caer (estrellas)… ¡DING! y se salva */
headline(L(8) - 0.1, L(9) - 0.1, 'Viene del *boxeo*', { size: 92, hlT: T.boxeo, color: '#fff' });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#2a2238' }, c => {
  const cam = CAM(c);
  const focos = [0, 1].map(i => box(cam, i ? 560 : -40, 300, 560, 1100, { zIndex: 2, background: 'linear-gradient(180deg, rgba(255,240,170,.35), rgba(255,240,170,0))', clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)', transformOrigin: '50% 0%' }));
  const pub = box(cam, 0, 760, 1080, 300, { zIndex: 3 }, `<svg viewBox="0 0 1080 300" width="1080" height="300">${[...Array(14)].map((_, i) => `<circle cx="${40 + i * 78}" cy="${120 + (i % 2) * 30}" r="44" fill="#151020" stroke="#000" stroke-width="3"/><rect x="${0 + i * 78}" y="${150 + (i % 2) * 30}" width="80" height="200" rx="30" fill="#151020"/>`).join('')}</svg>`);
  box(cam, 0, 1180, 1080, 800, { zIndex: 4, background: '#5c87b5', borderTop: `10px solid ${INK}` });
  [0, 1, 2].forEach(i => box(cam, 0, 880 + i * 90, 1080, 14, { zIndex: 11, background: ROJO, border: `3px solid ${INK}` }));
  [30, 1030].forEach(x => box(cam, x, 840, 26, 360, { zIndex: 12, background: '#9aa4ad', border: `4px solid ${INK}` }));
  const cp = CAMPANA(cam, 900, 600, 150, 13); box(cam, 960, 560, 10, 60, { zIndex: 12, background: INK });
  const yo = BOX(cam, 300, 660, 340, 'x', ROJO), el2 = BOX(cam, 640, 690, 320, 'y', AZULR); el2.style.transform = 'scaleX(-1)';
  const est = [0, 1, 2, 3].map(i => ESTRELLA(cam, 60, ORO));
  const dg = ding(cam, 560, 420);
  const salv = stamp(cam, 320, 1040, '¡SALVADO!', { size: 96, col: '#7ab35a', z: 40, bg: 'rgba(30,30,40,.85)', blend: 'normal' });
  sp(T.boxeo, 'whoosh', 0.6); sp(T.boxeador, 'thud', 0.9); sp(T.boxeador + 0.4, 'thud', 0.8); sp(T.caer, 'boing', 0.8); sp(T.suena8, 'bell', 1.1); sp(T.suena8 + 0.35, 'bell', 0.8); sp(T.salva8, 'stamp', 1); sp(T.salva8 + 0.2, 'tada', 0.7);
  return t => {
    zoom(cam, t, L(8), 6, 0.05);
    focos.forEach((f, i) => set(f, { r: Math.sin(t * 1.4 + i * 2) * 14 }));
    set(pub, { y: Math.abs(Math.sin(t * 6)) * -10 });
    const hits = [T.boxeador, T.boxeador + 0.4], punch = hits.reduce((m, t0) => Math.max(m, t > t0 - 0.15 && t < t0 + 0.2 ? 1 - Math.abs(t - t0) / 0.2 : 0), 0);
    const wob = p(t, T.caer - 0.2, 0.5, E.outCubic) * (1 - p(t, T.suena8 + 0.4, 0.5, E.inOutCubic));
    set(el2, { x: -punch * 120, sx: -1, r: punch * 6 });
    set(yo, { r: -punch * 8 - wob * (22 + Math.sin(t * 6) * 6), x: -wob * 40 });
    boxF(yo, t, { closed: punch > 0.3, feliz: wob > 0.3 ? -1 : 0, ceja: wob > 0.3 ? 14 : 4, jaw: wob > 0.3 ? 0.6 : 0, look: [Math.sin(t * 9) * 8 * wob, 0] }, 'x');
    boxF(el2, t, { feliz: 1, ceja: -4, look: [6, 0], jaw: punch * 0.5 }, 'y');
    est.forEach((e, i) => { const a = t * 6 + i * 1.57; set(e, { o: wob > 0.3 ? 1 : 0, x: 430 + Math.cos(a) * 140, y: 680 + Math.sin(a) * 40 }); });
    const sw = tilin(cp, t, T.suena8, 1.8, 30); campana(cp, t, { feliz: 1, jaw: sw ? 0.8 : 0, ceja: sw ? 12 : 0, look: [-8, 4] });
    set(dg, { o: t > T.suena8 && t < T.suena8 + 1.5 ? 1 : 0, s: 1 + 0.12 * Math.sin(t * 22), r: -6 });
    stampA(salv, t, T.salva8, -8);
  };
});
shakeAt(T.boxeador, 0.2, 12); shakeAt(T.boxeador + 0.4, 0.2, 12); shakeAt(T.suena8, 0.4, 18);

/* L9 · la prensa deportiva (periódico girando) → y de ahí salta a la calle (bocadillos) */
headline(L(9) - 0.1, L(10) - 0.1, 'Prensa *deportiva*', { size: 88, hlT: T.prensa });
plano(L(9) - 0.1, L(10) - 0.1, { background: '#e9d7b0', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.10) 0 3px, transparent 3px 58px)' }, c => {
  const cam = CAM(c);
  const casas = box(cam, 0, 900, 1080, 500, { zIndex: 2 }, `<svg viewBox="0 0 1080 500" width="1080" height="500"><path d="M0,500 V180 L110,90 L220,180 V140 H330 V60 L400,20 L470,60 V200 H560 V110 L660,40 L760,110 V170 H860 V80 H960 V150 H1080 V500 Z" fill="#c9a06a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>${[[60, 240], [260, 200], [360, 120], [600, 170], [700, 200], [880, 140], [980, 210]].map(([x, y]) => `<rect x="${x}" y="${y}" width="44" height="60" fill="#8fb3de" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`);
  box(cam, 0, 1330, 1080, 700, { zIndex: 3, background: '#9a9a90', borderTop: `8px solid ${INK}` });
  const dia = DIARIO(cam, 160, 380, 'LA GACETA DEL RING', '«¡SALVADO POR<br>LA CAMPANA!»', 'finales del siglo XIX');
  const gente = [0, 1, 2].map(i => ciudadano(cam, 300 + i * 250, 1000, 240, i + 2));
  const bubs = gente.map((_, i) => BOCADILLO(cam, [300, 540, 760][i] - 60, [880, 940, 880][i], '¡salvado por la campana!', { size: 30 }));
  sp(T.prensa - 0.1, 'whoosh', 0.8); sp(T.prensa + 0.45, 'stamp', 0.9); gente.forEach((_, i) => sp(T.calle + i * 0.25, 'msg_in', 0.6));
  return t => {
    zoom(cam, t, L(9), 4);
    const out = p(t, T.calle - 0.3, 0.4, E.inCubic); giraD(dia, t, T.prensa - 0.1); if (out > 0) set(dia, { o: 1, s: 1 - 0.6 * out, y: -out * 260, r: -4 });
    gente.forEach((g, i) => { const t0 = T.calle - 0.2 + i * 0.2; set(g.d, { o: t > t0 ? 1 : 0, y: (1 - p(t, t0, 0.35, E.outBack)) * 400 - Math.abs(Math.sin(t * 7 + i)) * 12 }); face(g, t, { look: [0, -6], bL: 10, bR: 10, jaw: Math.abs(Math.sin(t * 9 + i)) * 0.6, seed: i }); popA(bubs[i], t, t0 + 0.25, { r: i % 2 ? 4 : -4 }); });
  };
});
shakeAt(T.prensa + 0.45, 0.3, 12);

/* L10 · el bulo lo hizo famoso un correo en cadena de los 90: ordenador viejo con FW: FW: FW: */
headline(L(10) - 0.1, L(11) - 0.1, 'Un correo en *cadena*', { size: 88, hlT: T.correo + 0.3 });
plano(L(10) - 0.1, L(11) - 0.1, { background: '#c9d3e6', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.08) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  box(cam, 0, 1240, 1080, 700, { zIndex: 2, background: '#8a5a32', borderTop: `8px solid ${INK}` });
  const pc = box(cam, 170, 400, 740, 640, { zIndex: 5, background: '#e6dcc4', border: `8px solid ${INK}`, borderRadius: '30px', boxShadow: `14px 14px 0 ${INK}` });
  const scr = box(pc, 50, 46, 624, 450, { background: '#0f2a1a', border: `6px solid ${INK}`, borderRadius: '20px', overflow: 'hidden' });
  const ls = ['FW: FW: FW: ¡Curiosidades!', 'FW: FW: Léelo, es verdad', 'FW: ¡Salvado por la campana!', 'FW: FW: FW: FW: Reenvíalo', 'FW: Reenvíalo a 10 amigos'].map((s, i) => el('div', scr, { left: '20px', top: px(20 + i * 84), fontFamily: 'SpecialElite', fontSize: '34px', color: '#7dff9a', whiteSpace: 'nowrap' }, s));
  box(pc, 290, 520, 150, 30, { background: '#b9ad92', border: `4px solid ${INK}`, borderRadius: '6px' });
  box(cam, 380, 1040, 320, 100, { zIndex: 4, background: '#d8ccb0', border: `6px solid ${INK}` });
  const raton = box(cam, 760, 1120, 110, 150, { zIndex: 6, background: '#e6dcc4', border: `6px solid ${INK}`, borderRadius: '50px 50px 40px 40px' });
  const sob = [...Array(8)].map(i => box(cam, 0, 0, 120, 80, { zIndex: 20 }, `<svg viewBox="0 0 120 80" width="120" height="80"><rect x="4" y="4" width="112" height="72" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M4,4 L60,46 L116,4" stroke="${INK}" stroke-width="5" fill="none"/></svg>`));
  const n90 = stamp(cam, 360, 1160, 'AÑOS 90', { size: 80, col: AZULR, z: 40, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  ls.forEach((_, i) => sp(T.correo - 0.2 + i * 0.3, 'msg_in', 0.5)); sp(T.noventa, 'stamp', 0.9); sp(T.famoso, 'click', 0.7);
  return t => {
    zoom(cam, t, L(10), 5);
    ls.forEach((l, i) => set(l, { o: t > T.correo - 0.2 + i * 0.3 ? 1 : 0, x: (1 - p(t, T.correo - 0.2 + i * 0.3, 0.25, E.outCubic)) * 300 }));
    set(raton, { y: t > T.famoso && t < T.famoso + 0.15 ? 8 : 0, r: Math.sin(t * 3) * 3 });
    sob.forEach((s, i) => { const k = ((t - T.correo) * 0.7 + i * 0.125) % 1, a = i * 0.785; set(s, { o: t > T.correo ? 1 - k : 0, x: 480 + Math.cos(a) * k * 600, y: 700 + Math.sin(a) * k * 600, r: k * 180 }); });
    stampA(n90, t, T.noventa, -6);
  };
});

/* L11 · OJO: hay quien la ve antes, en otros contextos */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const libros = [0, 1, 2].map(i => box(c, 340 + i * 30, 900 - i * 110, 440 - i * 30, 100, { zIndex: 6 + i, background: [ROJO, AZULR, '#4c8a3a'][i], border: `6px solid ${INK}`, borderRadius: '8px', boxShadow: `6px 6px 0 ${INK}` }));
  const cp = CAMPANA(c, 450, 520, 180, 12);
  const qs = [0, 1, 2].map(i => texto(c, 500 + i * 90, '?', { size: 110, color: ROJO, x: 760, w: 120, z: 20 }));
  aparece(chip(c, 380, 1110, '¿antes?', { size: 60, bg: YEL, color: INK }), T.antes);
  aparece(chip(c, 420, 1240, 'otros contextos', { size: 56, bg: PINK }), T.contextos);
  return t => { libros.forEach((b, i) => set(b, { r: Math.sin(t * 2 + i) * 2 })); tilin(cp, t, T.ojo, 1, 14); campana(cp, t, { look: [8, -4], feliz: 0, ceja: 12 }); qs.forEach((q, i) => set(q, { o: t > T.antes + i * 0.15 ? 1 : 0, r: Math.sin(t * 5 + i) * 12, y: Math.sin(t * 4 + i) * 10 })); };
});

/* L12 · O sea: la campana que te salvaba… era la del ring */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const a = texto(c, 280, 'La campana que te salvaba…', { size: 72 });
  const b = texto(c, 400, '…era la del <span style="color:' + ROJO + '">ring</span>', { size: 110, italic: true });
  const cp = CAMPANA(c, 320, 600, 200, 12), bx = BOX(c, 580, 640, 280, 'z', ROJO);
  const xx = box(c, 300, 600, 250, 250, { zIndex: 20 }, XSVG); const ata = ATAUD(c, 440, 1090, 480);
  return t => {
    set(a, { s: pop(t, L(12), 0.35) }); set(b, { o: t > T.ring12 - 0.3 ? 1 : 0, s: pop(t, T.ring12 - 0.3, 0.35) });
    tilin(cp, t, T.ring12, 1.5, 26); campana(cp, t, { feliz: 1, jaw: 0.4, look: [6, 0] });
    set(bx, { o: t > T.ring12 - 0.3 ? 1 : 0, s: pop(t, T.ring12 - 0.3, 0.4), y: -Math.abs(Math.sin(t * 6)) * 14 }); boxF(bx, t, { feliz: 1, jaw: 0.5, look: [-6, -2], ceja: 8 }, 'z');
    muerto(ata, t, { closed: true, feliz: 0.6 }); set(xx, { o: 0 });
  };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.ring12, 'bell', 0.9);

/* L13 · pregunta final */
preguntaFinal('¿Qué expresión usas tú', 'sin saber de dónde viene?', { size: 82, draw: c => [['«estar en Babia»', YEL], ['«en un pispás»', PINK], ['¿y tú?', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 330 + i * 40, 620 + i * 160, s, { size: 60, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre (clip reutilizado del ep55) */
cierre(71, 'Salvado por la campana', ['CAMPANA', 'ring']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.levantaba + 0.3, T.levantaba + 1.3], [T.caer, T.caer + 0.9], [T.noventa, T.noventa + 1.0]], sorpresa: [[T.miedo, T.miedo + 0.8], [T.suena, T.suena + 0.8], [T.ni, T.ni + 0.8]], golpes: [T.existe, T.siglo + 0.5, T.patentan + 0.5, T.bulo5, T.ni + 0.4, T.suena8, T.salva8] },
});
