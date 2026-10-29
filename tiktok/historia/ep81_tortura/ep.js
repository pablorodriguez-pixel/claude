/* Ep. 81 · 1252: un Papa legaliza la tortura — la «teletienda» de la Inquisición (réplica del formato viral: humor negro, personajes a pantalla completa) · sin nada gráfico */
Story.prepara();
const T = {
  papa0: Q('un papa'), legal0: Q('la tortura'),
  m1252: Q('mil doscientos cincuenta y dos'), despues: Q('lo que vino después'), teletienda: Q('teletienda'),
  problema: Q('un problema'), gente: Q('cada vez más gente'), cuenta: Q('por su cuenta'), herejia: Q('herejía'),
  inocencio: Q('inocencio cuarto'), poco: Q('tenía poco'), firma: Q('firma un documento'), herejes: Q('a los herejes'), torturar: Q('torturar'),
  condic: Q('con condiciones'), cortar: Q('sin cortar nada'), matar: Q('sin matar'), detalle: Q('qué detalle'),
  artesanos: Q('los artesanos'), negocio: Q('el negocio'), uno: Q('número uno'), potro: Q('el potro'), estiraban: Q('te estiraban'), confesabas: Q('hasta que confesabas'),
  dos: Q('número dos'), garrucha: Q('la garrucha'), munecas: Q('de las muñecas'), arriba: Q('arriba y abajo'), ascensor: Q('como un ascensor'), peor: Q('pero peor'),
  tres: Q('número tres'), toca: Q('la toca'), trapo: Q('un trapo'), agua: Q('y agua'), mucha: Q('mucha agua'),
  medico: Q('un médico'), curarte: Q('para curarte'), aguantaras: Q('para que aguantaras'), sesion: Q('la siguiente sesión'),
  espana: Q('en españa'), m1811: Q('mil ochocientos once'), siglos: Q('seis siglos'), tele10: Q('teletienda'),
  ojo: Q('ojo'), falsos: Q('son falsos'),
  osea: Q('o sea'), noticias: Q('las noticias'), veinte: Q('veinte años'), inq12: Q('la inquisición'),
};
const AMA = '#f2c230', CREMA = '#FBF6EA', VERDEI = '#2e6b3a', OSCURO = '#1d1a22', VELA = '#ffd977', PIEDRA = '#8f877a';
const CAM = c => box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 960px' });
const zoom = (cam, t, t0, d, a = 0.06) => set(cam, { s: 1.02 + a * p(t, t0, d, E.linear) });
const BL = { color: '#f4efe2', shadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` };
/* ---------- figuras ---------- */
/* persona genérica con cara (vb 0 0 300 380). o: ropa, pelo ('corto'|'largo'|'calvo'), barba, gorro ('corona'|'mitra'|'birrete'|'coroza'|'capucha'), sambenito */
let PID = 0;
const persInner = (o = {}) => { const id = PID++; const piel = o.piel || '#f2c9a0';
  const cuerpo = o.sambenito ? `<path d="M40,380 C40,290 90,256 150,256 C210,256 260,290 260,380 Z" fill="${AMA}" stroke="${INK}" stroke-width="7"/><path d="M90,290 L210,370 M210,290 L90,370" stroke="${RED}" stroke-width="16" stroke-linecap="round"/>`
    : `<path d="M40,380 C40,290 90,256 150,256 C210,256 260,290 260,380 Z" fill="${o.ropa || '#6b4a2a'}" stroke="${INK}" stroke-width="7"/>${o.cruzVerde ? `<path d="M150,290 V360 M120,318 H180" stroke="${VERDEI}" stroke-width="16"/>` : ''}${o.cuello ? `<path d="M100,262 Q150,300 200,262" stroke="#fff" stroke-width="16" fill="none"/>` : ''}`;
  const pelo = o.pelo === 'largo' ? `<path d="M56,180 C40,60 260,60 244,180 C250,250 230,290 220,300 L220,170 C200,110 100,110 80,170 L80,300 C70,290 50,250 56,180 Z" fill="${o.pcol || '#6b4a2a'}" stroke="${INK}" stroke-width="5"/>`
    : o.pelo === 'calvo' ? `<path d="M60,170 C60,140 70,130 80,128 M240,170 C240,140 230,130 220,128" stroke="${o.pcol || '#9a9a9a'}" stroke-width="16" fill="none"/>`
      : `<path d="M58,160 C56,80 110,60 150,60 C200,60 246,80 242,160 C226,120 190,104 150,104 C110,104 74,120 58,160 Z" fill="${o.pcol || '#3a2a1e'}" stroke="${INK}" stroke-width="5"/>`;
  const gorro = o.gorro === 'corona' ? `<path d="M84,86 L96,26 L124,66 L150,16 L176,66 L204,26 L216,86 Z" fill="${GOLD}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="150" cy="56" r="9" fill="${RED}" stroke="${INK}" stroke-width="3"/>`
    : o.gorro === 'mitra' ? `<path d="M96,92 C96,40 130,6 150,0 C170,6 204,40 204,92 Z" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><path d="M150,4 V92 M122,48 H178" stroke="${GOLD}" stroke-width="10"/>`
      : o.gorro === 'birrete' ? `<path d="M70,96 C70,40 230,40 230,96 Z" fill="${INK}" stroke="${INK}" stroke-width="6"/><path d="M150,40 V20" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="16" r="10" fill="${INK}"/>`
        : o.gorro === 'coroza' ? `<path d="M100,96 L150,-110 L200,96 Z" fill="${AMA}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/><path d="M128,0 L172,60 M172,0 L128,60" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>`
          : o.gorro === 'casco' ? `<path d="M56,120 C56,40 244,40 244,120 Z" fill="#b8bec5" stroke="${INK}" stroke-width="6"/><path d="M30,124 C80,104 220,104 270,124" stroke="${INK}" stroke-width="10" fill="none"/><path d="M150,48 C130,20 170,0 150,-20" stroke="${RED}" stroke-width="14" fill="none" stroke-linecap="round"/>`
          : o.gorro === 'capucha' ? `<path d="M40,380 C30,200 50,40 150,30 C250,40 270,200 260,380 L230,380 C240,240 230,120 150,110 C70,120 60,240 70,380 Z" fill="${OSCURO}" stroke="${INK}" stroke-width="7"/>` : '';
  return `${cuerpo}<circle cx="150" cy="176" r="96" fill="${piel}" stroke="${INK}" stroke-width="7"/>${pelo}
  ${o.barba ? `<path d="M70,200 C80,300 220,300 230,200 C210,250 90,250 70,200 Z" fill="${o.pcol || '#3a2a1e'}" stroke="${INK}" stroke-width="5"/>` : ''}
  <g class="pc${id}"><path d="M96,${o.severo ? 142 : 138} q18,${o.severo ? 8 : -10} 36,${o.severo ? 6 : 0} M168,${o.severo ? 148 : 138} q18,${o.severo ? -6 : -10} 36,${o.severo ? -8 : 0}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
  <g class="pe${id}"><ellipse cx="114" cy="168" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/><ellipse cx="186" cy="168" rx="15" ry="17" fill="#fff" stroke="${INK}" stroke-width="4"/></g><g class="pp${id}"><circle cx="116" cy="171" r="7" fill="${INK}"/><circle cx="188" cy="171" r="7" fill="${INK}"/></g>
  <path class="pm${id}" d="" fill="#7a2a20" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>${gorro}`; };
const PERS = (c, x, y, w, o = {}) => { const f = figura(c, x, y, w, w * 380 / 300, persInner(o), '0 -120 300 500', Object.assign({ z: 8, origin: '50% 100%' }, o)); f.pid = PID - 1; f.style.height = px(w * 500 / 300); f.style.top = px(y - w * 120 / 300); return f; };
const pFace = (f, t, o = {}) => caraF(f, t, o, 168, [150, 230, 20, `.pm${f.pid}`, `.pp${f.pid}`, `.pe${f.pid}`, `.pc${f.pid}`]);
/* cruz verde de la Inquisición (vb 0 0 200 260) */
const CRUZV = (c, x, y, w, z = 6) => box(c, x, y, w, w * 1.3, { zIndex: z }, `<svg viewBox="0 0 200 260" width="${w}" height="${w * 1.3}"><path d="M80,0 H120 V70 H190 V110 H120 V260 H80 V110 H10 V70 H80 Z" fill="${VERDEI}" stroke="${INK}" stroke-width="8"/><path d="M92,20 V240" stroke="#5a9a5a" stroke-width="6" opacity=".7"/></svg>`);
const VELA_F = (c, x, y, h = 160, z = 6) => { const d = box(c, x, y, 60, h + 70, { zIndex: z }, `<svg viewBox="0 0 60 ${h + 70}" width="60" height="${h + 70}"><rect x="14" y="70" width="32" height="${h}" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><path class="ll" d="M30,10 C46,34 46,54 30,66 C14,54 14,34 30,10 Z" fill="${VELA}" stroke="${INK}" stroke-width="4"/></svg>`); d.ll = d.querySelector('.ll'); return d; };
const llama = (v, t, i = 0) => v.ll.setAttribute('transform', `translate(30 66) scale(${f1(1 + 0.12 * Math.sin(t * 13 + i))} ${f1(1 + 0.18 * Math.sin(t * 9 + i))}) translate(-30 -66)`);
const SAMBE = (c, x, y, w, nombre, z = 7) => box(c, x, y, w, w * 1.3, { zIndex: z, transformOrigin: '50% 0%' }, `<svg viewBox="0 0 200 260" width="${w}" height="${w * 1.3}"><path d="M100,0 V20" stroke="${INK}" stroke-width="5"/><path d="M30,20 H170 L180,250 H20 Z" fill="${AMA}" stroke="${INK}" stroke-width="7"/><path d="M50,50 L150,170 M150,50 L50,170" stroke="${RED}" stroke-width="16" stroke-linecap="round"/><text x="100" y="225" text-anchor="middle" font-family="SpecialElite" font-size="22" fill="${INK}">${nombre}</text></svg>`);
const PIEDRAS = (c, z = 0) => box(c, 0, 0, 1080, 1920, { zIndex: z, background: '#5d5a63', backgroundImage: 'linear-gradient(rgba(0,0,0,.25) 4px, transparent 4px), linear-gradient(90deg, rgba(0,0,0,.25) 4px, transparent 4px)', backgroundSize: '180px 90px' });

/* tele de teletienda: carcasa con pantalla, rótulo y cinta «¡LLAME YA!» (la escena va dentro de .pant) */
const TELE = (c, rot = 'TELETIENDA 1252') => { const d = box(c, 40, 420, 1000, 900, { zIndex: 5, background: '#6b4a2a', border: `10px solid ${INK}`, borderRadius: '50px', boxShadow: `16px 16px 0 ${INK}` });
  const pant = box(d, 40, 40, 760, 640, { background: '#2b3550', border: `8px solid ${INK}`, borderRadius: '40px', overflow: 'hidden' });
  [0, 1].forEach(i => box(d, 840, 80 + i * 150, 90, 90, { background: '#c9a86a', border: `6px solid ${INK}`, borderRadius: '50%' }));
  const rot_ = box(d, 40, 720, 900, 120, { background: RED, border: `6px solid ${INK}`, borderRadius: '20px', fontFamily: 'Rye', fontSize: '58px', color: '#fff', textAlign: 'center', lineHeight: '106px', overflow: 'hidden', whiteSpace: 'nowrap' }, `<span class="cin">★ ${rot} ★ ¡LLAME YA! ★ ${rot} ★ ¡LLAME YA! ★</span>`);
  d.pant = pant; d.cin = rot_.querySelector('.cin'); return d; };
const cinta = (tv, t) => { tv.cin.style.display = 'inline-block'; tv.cin.style.transform = `translateX(${f1(-((t * 160) % 700))}px)`; };
const PRECIO = (c, x, y, txt, z = 20) => box(c, x, y, 300, 170, { zIndex: z, background: AMA, border: `7px solid ${INK}`, borderRadius: '50%', fontFamily: 'Rye', fontSize: '38px', textAlign: 'center', paddingTop: '34px', boxSizing: 'border-box', color: INK, boxShadow: `8px 8px 0 ${INK}` }, txt);
const estrellas = (c, n, z = 18) => [...Array(n)].map(() => ESTRELLA(c, 54, '#fff6c8'));
const orb = (bs, t, cx, cy, rx, ry) => bs.forEach((b, i) => { const a = t * 1.8 + i * (6.28 / bs.length); set(b, { x: cx + Math.cos(a) * rx - 27, y: cy + Math.sin(a) * ry - 27, s: 0.6 + 0.4 * Math.sin(t * 8 + i) }); });

/* L0 · PORTADA (fotograma 0 completo): el Papa sonríe con su papel «TORTURA ✓ LEGAL»; estrellitas de teletienda; sello */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 230, 'Un Papa legalizó…', { size: 92 });
  const t2 = texto(c, 330, '…la ' + hlSpan('TORTURA', 'phl'), { size: 130, italic: true });
  const papa = PERS(c, 200, 640, 560, { ropa: '#f4efe2', gorro: 'mitra', cuello: true });
  const doc = box(c, 640, 860, 330, 380, { zIndex: 14, background: CREMA, border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '50px', textAlign: 'center', paddingTop: '40px', boxSizing: 'border-box', color: INK, transform: 'rotate(6deg)' }, `TORTURA<br><span style="color:#2e6b3a;font-size:110px">✔</span><br>LEGAL`);
  const bs = estrellas(c, 6);
  const sel = stamp(c, 300, 1290, '¡AÑO 1252!', { size: 84, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); sp(T.legal0, 'stamp', 0.9); sp(T.legal0 + 0.2, 'sparkle', 0.6);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(papa, { y: -Math.abs(Math.sin(t * 3)) * 10, r: Math.sin(t * 2) * 2 }); pFace(papa, t, { jaw: talkW(t, 'VECINO'), feliz: 1, look: [10, 4], ceja: t > T.legal0 ? 12 : 4 });
    set(doc, { r: 6 + Math.sin(t * 4) * 3 }); orb(bs, t, 540, 1000, 440, 360);
    stampA(sel, t, T.legal0 + 0.2, -6);
  };
}, { sfx: false });
shakeAt(T.legal0 + 0.2, 0.3, 12);

/* L1 · fue en 1252… y lo que vino después parece un anuncio de teletienda (la tele se enciende con presentador verdugo) */
headline(L(1) - 0.1, L(2) - 0.1, 'La *teletienda* de 1252', { size: 86, hlT: T.teletienda });
plano(L(1) - 0.1, L(2) - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const cal = box(cam, 340, 420, 400, 300, { zIndex: 20, background: CREMA, border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', textAlign: 'center', lineHeight: '290px', color: INK }, '1252');
  const tv = TELE(cam);
  const pres = PERS(tv.pant, 200, 220, 360, { ropa: OSCURO, gorro: 'capucha' });
  const mic = box(tv.pant, 500, 330, 60, 200, { zIndex: 12 }, `<svg viewBox="0 0 60 200" width="60" height="200"><rect x="22" y="60" width="16" height="140" fill="${INK}"/><ellipse cx="30" cy="40" rx="28" ry="36" fill="#9aa4ad" stroke="${INK}" stroke-width="5"/></svg>`);
  const bs = estrellas(tv.pant, 5);
  sp(T.m1252, 'stamp', 0.7); sp(T.despues, 'click', 0.8); sp(T.teletienda, 'tada', 0.9);
  return t => {
    zoom(cam, t, L(1), 4, 0.07); cinta(tv, t);
    set(cal, { o: t < T.despues ? 1 : 0, s: pop(t, T.m1252 - 0.1, 0.35), r: -4 });
    const on = p(t, T.despues, 0.3, E.outCubic); set(tv, { o: 1, s: lerp(0.85, 1, on), y: t < T.despues ? 380 : 0 }); tv.pant.style.filter = `brightness(${f1(0.2 + 0.8 * on)})`;
    pFace(pres, t, { feliz: 1, jaw: t > T.teletienda ? Math.abs(Math.sin(t * 10)) * 0.6 : 0.2, look: [0, 4], ceja: 10 }); set(pres, { y: -Math.abs(Math.sin(t * 5)) * 10 });
    orb(bs, t, 380, 320, 320, 240);
  };
});

/* L2 · la Iglesia tenía un problema: cada vez más gente pensaba por su cuenta (bombillas) → eso se llamaba HEREJÍA */
headline(L(2) - 0.1, L(3) - 0.1, 'Pensar = *herejía*', { size: 100, hlT: T.herejia });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#bcd3ea' }, c => {
  const cam = CAM(c);
  const igl = box(cam, 300, 400, 480, 600, { zIndex: 2 }, `<svg viewBox="0 0 480 600" width="480" height="600"><path d="M240,0 V60 M210,30 H270" stroke="${INK}" stroke-width="12"/><path d="M60,600 V240 L240,80 L420,240 V600 Z" fill="#e9dcc2" stroke="${INK}" stroke-width="8"/><path d="M190,600 V440 C190,380 290,380 290,440 V600 Z" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><circle cx="240" cy="260" r="50" fill="#c8102e" stroke="${INK}" stroke-width="6"/></svg>`);
  box(cam, 0, 1000, 1080, 920, { zIndex: 1, background: '#7a9a52', borderTop: `8px solid ${INK}` });
  const gente = [[300, 940], [520, 980], [760, 940], [330, 1150], [800, 620]].map(([x, y], i) => [PERS(cam, x, y, 220, { ropa: ['#7a5aa8', '#2b8ad6', '#e8507a', '#c87a3a', '#4c8a3a'][i], pelo: i % 2 ? 'largo' : 'corto', pcol: ['#3a2a1e', '#c87a3a', '#8a5a32'][i % 3] }), box(cam, x + 120, y - 160, 110, 110, { zIndex: 12 }, `<svg viewBox="0 0 240 240" width="110" height="110"><path d="M120,20 C60,20 30,70 40,110 C50,150 90,160 90,190 H150 C150,160 190,150 200,110 C210,70 180,20 120,20 Z" fill="${GOLD}" stroke="${INK}" stroke-width="12"/><rect x="88" y="190" width="64" height="36" fill="#9aa4ad" stroke="${INK}" stroke-width="10"/></svg>`), i]);
  const papa = PERS(cam, 30, 460, 260, { ropa: '#f4efe2', gorro: 'mitra', cuello: true }); papa.style.zIndex = 9;
  const her = stamp(cam, 280, 1250, '¡HEREJÍA!', { size: 110, z: 30 });
  gente.forEach(([, , i]) => sp(T.gente + 0.2 + i * 0.25, 'ding', 0.5)); sp(T.herejia, 'stamp', 1); sp(T.herejia + 0.1, 'glitch', 0.6);
  return t => {
    zoom(cam, t, L(2), 4, 0.06);
    gente.forEach(([g, b, i]) => { const t0 = T.gente + 0.2 + i * 0.25; set(g, { o: t > T.gente - 0.3 ? 1 : 0, s: pop(t, T.gente - 0.3 + i * 0.08, 0.35) }); pFace(g, t, { feliz: 1, look: [0, -10], ceja: t > t0 ? 12 : 0, seed: i }); set(b, { o: t > t0 ? 1 : 0, s: pop(t, t0, 0.3) * (1 + 0.08 * Math.sin(t * 9 + i)) }); });
    set(papa, { o: t > T.problema - 0.1 ? 1 : 0, s: pop(t, T.problema - 0.1, 0.35) }); pFace(papa, t, { feliz: -1, ceja: 16, look: [Math.sin(t * 3) * 10, 4], jaw: t > T.herejia ? 0.8 : 0.2 });
    stampA(her, t, T.herejia, -8);
  };
});
shakeAt(T.herejia, 0.35, 16);

/* L3 · el papa Inocencio IV («INOCENTE» tachado → «poco») firma: a los herejes se les puede torturar */
headline(L(3) - 0.1, L(4) - 0.1, 'Inocencio IV', Object.assign({ size: 100 }, BL));
plano(L(3) - 0.1, L(4) - 0.1, { background: '#7a1f1f', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 30px, transparent 30px 60px)' }, c => {
  const cam = CAM(c);
  const papa = PERS(cam, 60, 600, 520, { ropa: '#f4efe2', gorro: 'mitra', cuello: true });
  const ino = box(cam, 560, 470, 460, 130, { zIndex: 12, background: '#fff', border: `6px solid ${INK}`, boxShadow: `8px 8px 0 ${INK}`, fontFamily: 'Rye', fontSize: '64px', textAlign: 'center', lineHeight: '118px', color: INK }, 'INOCENTE');
  const tach = box(cam, 560, 520, 460, 30, { zIndex: 13, background: RED, border: `4px solid ${INK}`, transformOrigin: '0 50%', transform: 'rotate(-4deg)' });
  const poco = texto(cam, 610, '…poco', { size: 90, italic: true, color: GOLD, x: 600, w: 420, z: 13, shadow: `4px 4px 0 ${INK}` });
  const mesa = box(cam, 0, 1180, 1080, 740, { zIndex: 9, background: '#8a5a32', borderTop: `10px solid ${INK}` });
  const doc = box(cam, 470, 860, 520, 420, { zIndex: 10, background: CREMA, border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '40px', padding: '30px', boxSizing: 'border-box', color: INK, lineHeight: 1.3 }, '<b style="font-family:Rye;font-size:52px">AD EXTIRPANDA</b><br>A los herejes<br>se les puede<br><b style="color:#c8102e">TORTURAR</b>');
  const firma = box(doc, 220, 330, 260, 60, { zIndex: 2 }, `<svg viewBox="0 0 260 60" width="260" height="60"><path class="fi" d="M10,40 C40,0 60,60 90,30 C120,0 140,50 170,30 C200,10 230,50 250,20" stroke="${INK}" stroke-width="5" fill="none" stroke-dasharray="400" stroke-dashoffset="400"/></svg>`);
  sp(T.inocencio, 'pop2', 0.7); sp(T.poco - 0.2, 'scratch', 0.8); sp(T.firma, 'paper', 0.8); sp(T.torturar, 'stamp', 1);
  return t => {
    zoom(cam, t, L(3), 4, 0.07);
    pFace(papa, t, { feliz: t > T.poco ? 1 : 0.4, look: [10, t > T.firma ? 8 : 0], ceja: t > T.poco ? -4 : 6, jaw: talkW(t, 'VECINO') * 0.4 });
    popA(ino, t, T.inocencio, { r: -3 }); tach.style.transform = `rotate(-4deg) scaleX(${f1(p(t, T.poco - 0.3, 0.3))})`; set(poco, { o: t > T.poco ? 1 : 0, s: pop(t, T.poco, 0.3), r: -6 });
    set(doc, { o: t > T.firma - 0.2 ? 1 : 0, y: (1 - p(t, T.firma - 0.2, 0.4, E.outBack)) * 500, r: 3 }); firma.querySelector('.fi').setAttribute('stroke-dashoffset', f1(400 * (1 - p(t, T.firma + 0.2, 0.8))));
  };
});
shakeAt(T.torturar, 0.35, 14);

/* L4 · con condiciones: sin cortar nada… y sin matar. «Qué detalle» (lista con tics y un corazoncito irónico) */
headline(L(4) - 0.1, L(5) - 0.1, 'Con *condiciones*', { size: 96, hlT: T.condic });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const lista = box(cam, 180, 440, 720, 560, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,74,140,.18) 0 3px, transparent 3px 70px)' });
  const it = [['sin cortar nada', T.cortar], ['sin matar', T.matar]].map(([s, t0], i) => [el('div', lista, { left: '40px', top: px(100 + i * 200), fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '70px', color: INK }, s), box(lista, 530, 60 + i * 200, 150, 150, {}, CHECK), t0]);
  const cor = box(cam, 420, 1060, 240, 220, { zIndex: 12 }, `<svg viewBox="0 0 240 220" width="240" height="220"><path d="M120,210 C20,140 0,90 20,50 C40,10 100,10 120,60 C140,10 200,10 220,50 C240,90 220,140 120,210 Z" fill="${PINK}" stroke="${INK}" stroke-width="8"/></svg>`);
  const ir = BOCADILLO(cam, 560, 1000, '¡qué detalle!', { size: 50 });
  it.forEach(([, , t0]) => sp(t0 + 0.2, 'stamp', 0.7)); sp(T.detalle, 'sparkle', 0.8); sp(T.detalle + 0.3, 'boing', 0.6);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(4), 3, 0.06); set(lista, { s: pop(t, L(4) - 0.1, 0.4), r: -2 });
    it.forEach(([tx, ck, t0]) => { set(tx, { o: t > t0 ? 1 : 0.15 }); stampA(ck, t, t0 + 0.2, -8); });
    set(cor, { o: t > T.detalle ? 1 : 0, s: pop(t, T.detalle, 0.35) * (1 + 0.1 * Math.abs(Math.sin(t * 8))) }); popA(ir, t, T.detalle + 0.2, { r: 5 });
  };
});

/* L5 · los artesanos huelen el negocio ($$$) → producto estrella nº 1: EL POTRO (en la tele, con precio); el muñeco se estira… «¡CONFIESO!» */
headline(L(5) - 0.1, T.uno - 0.1, 'Huele a *negocio*', { size: 96, hlT: T.negocio });
headline(T.uno - 0.1, L(6) - 0.1, 'Nº 1: *el potro*', Object.assign({ size: 100, hlT: T.potro }, BL));
plano(L(5) - 0.1, T.uno - 0.1, { background: '#d8c3a0', backgroundImage: 'repeating-linear-gradient(90deg, rgba(43,33,24,.12) 0 6px, transparent 6px 110px)' }, c => {
  const cam = CAM(c);
  const art = [0, 1, 2].map(i => PERS(cam, 260 + i * 270, 700, 280, { ropa: ['#6b4a2a', '#8a5a32', '#5a3a1e'][i], barba: i !== 1, pelo: i === 2 ? 'calvo' : 'corto' }));
  const din = [0, 1, 2, 3, 4].map(() => texto(cam, 0, '$', { size: 100, color: '#2e7a4a', x: 0, w: 100, z: 14, shadow: `4px 4px 0 ${INK}` }));
  sp(T.artesanos, 'pop', 0.6); sp(T.negocio, 'cash', 0.9);
  return t => {
    zoom(cam, t, L(5), 2, 0.08);
    art.forEach((a, i) => { set(a, { s: pop(t, T.artesanos - 0.1 + i * 0.12, 0.35), y: t > T.negocio ? -Math.abs(Math.sin(t * 6 + i)) * 16 : 0 }); pFace(a, t, { feliz: 1, look: [0, -10], closed: t > T.negocio, ceja: t > T.negocio ? 10 : 0, jaw: t > T.negocio ? 0.4 : 0, seed: i }); });
    din.forEach((d, i) => { const k = ((t - T.negocio) * 0.8 + i * 0.2) % 1; set(d, { o: t > T.negocio ? 1 - k : 0, x: 100 + i * 200, y: 760 - k * 300 }); });
  };
});
plano(T.uno - 0.1, L(6) - 0.1, { background: '#1f2a44' }, c => {
  const cam = CAM(c);
  const tv = TELE(cam, 'PRODUCTO ESTRELLA Nº 1');
  const potro = box(tv.pant, 60, 300, 640, 220, { zIndex: 3 }, `<svg viewBox="0 0 640 220" width="640" height="220"><rect x="20" y="80" width="600" height="60" fill="#8a5a32" stroke="${INK}" stroke-width="7"/><path d="M60,140 V220 M580,140 V220" stroke="${INK}" stroke-width="18"/><circle cx="40" cy="110" r="38" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><circle cx="600" cy="110" r="38" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><path d="M600,110 L640,60" stroke="${INK}" stroke-width="12"/></svg>`);
  const mun = box(tv.pant, 200, 250, 360, 110, { zIndex: 4, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 360 110" width="360" height="110"><rect x="40" y="30" width="280" height="60" rx="30" fill="#f2c9a0" stroke="${INK}" stroke-width="6"/><circle cx="330" cy="55" r="44" fill="#f2c9a0" stroke="${INK}" stroke-width="6"/><circle cx="318" cy="46" r="8" fill="${INK}"/><circle cx="344" cy="46" r="8" fill="${INK}"/><ellipse cx="332" cy="74" rx="12" ry="9" fill="#7a2a20"/><path d="M40,60 H0 M320,60 H360" stroke="${INK}" stroke-width="8"/></svg>`);
  const conf = BOCADILLO(cam, 520, 470, '¡CONFIESO!', { size: 60 });
  const pr = PRECIO(cam, 690, 900, '¡OFERTA!<br>3 herejes');
  const bs = estrellas(tv.pant, 4);
  sp(T.uno, 'tada', 0.8); sp(T.potro, 'stamp', 0.8); sp(T.estiraban, 'scratch', 0.9); sp(T.estiraban + 0.6, 'boing', 0.8); sp(T.confesabas + 0.2, 'ding', 0.8);
  return t => {
    zoom(cam, t, T.uno, 3, 0.06); cinta(tv, t); orb(bs, t, 380, 160, 300, 100);
    set(potro, { s: pop(t, T.uno - 0.1, 0.4) });
    const ks = p(t, T.estiraban, 1.2, E.inOutCubic); set(mun, { sx: 1 + 0.6 * ks + (ks > 0 ? 0.04 * Math.sin(t * 20) : 0), o: t > T.potro ? 1 : 0 });
    popA(conf, t, T.confesabas + 0.2, { r: -5 }); set(pr, { o: t > T.potro + 0.2 ? 1 : 0, s: pop(t, T.potro + 0.2, 0.35), r: Math.sin(t * 4) * 8 });
  };
});
shakeAt(T.confesabas + 0.2, 0.3, 12);

/* L6 · CTA (clip reutilizado del ep55) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · nº 2: la garrucha — el muñeco sube y baja con indicador de planta de ascensor («como un ascensor, pero peor») */
headline(L(7) - 0.1, L(8) - 0.1, 'Nº 2: *la garrucha*', Object.assign({ size: 100, hlT: T.garrucha }, BL));
plano(L(7) - 0.1, L(8) - 0.1, { background: '#1f2a44' }, c => {
  const cam = CAM(c);
  const tv = TELE(cam, 'PRODUCTO Nº 2');
  const polea = box(tv.pant, 300, 20, 160, 160, { zIndex: 3 }, `<svg viewBox="0 0 160 160" width="160" height="160"><path d="M0,30 H160" stroke="#8a5a32" stroke-width="22"/><circle cx="80" cy="80" r="46" fill="#9aa4ad" stroke="${INK}" stroke-width="7"/><circle cx="80" cy="80" r="10" fill="${INK}"/></svg>`);
  const cuerda = box(tv.pant, 377, 120, 6, 200, { zIndex: 2, background: '#c9a86a', border: `2px solid ${INK}` });
  const mun = PERS(tv.pant, 230, 300, 300, { ropa: '#9a8a6a', pelo: 'calvo' });
  const piso = box(cam, 700, 470, 260, 160, { zIndex: 14, background: '#1a1a1a', border: `8px solid #c9a86a`, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '96px', color: '#ff5a3a', textAlign: 'center', lineHeight: '144px' }, '1');
  const asc = BOCADILLO(cam, 80, 1180, '¡ding! 3ª planta', { size: 46 });
  sp(T.dos, 'tada', 0.7); sp(T.garrucha, 'stamp', 0.8); sp(T.arriba, 'swoosh_up', 0.8); sp(T.arriba + 0.6, 'whoosh', 0.8); sp(T.ascensor, 'ding', 0.9); sp(T.peor, 'thud', 0.8);
  return t => {
    zoom(cam, t, L(7), 4, 0.06); cinta(tv, t);
    const ud = t > T.arriba ? (Math.sin((t - T.arriba) * 4) + 1) / 2 : 0; set(mun, { y: -ud * 220, s: pop(t, T.garrucha - 0.1, 0.35) }); cuerda.style.height = px(200 - ud * 200 + 20);
    pFace(mun, t, { feliz: -1, ceja: 16, look: [0, ud > 0.5 ? 8 : -8], jaw: ud > 0.5 ? 0.8 : 0.3 });
    piso.textContent = String(1 + Math.round(ud * 3)); set(piso, { o: t > T.arriba ? 1 : 0 });
    popA(asc, t, T.ascensor, { r: -4 });
  };
});
shakeAt(T.peor, 0.3, 12);

/* L8 · nº 3: la toca — jarra con cara que vierte agua sobre un trapo; «glu, glu, glu» */
headline(L(8) - 0.1, L(9) - 0.1, 'Nº 3: *la toca*', Object.assign({ size: 100, hlT: T.toca }, BL));
plano(L(8) - 0.1, L(9) - 0.1, { background: '#1f2a44' }, c => {
  const cam = CAM(c);
  const tv = TELE(cam, 'PRODUCTO Nº 3');
  const jarra = box(tv.pant, 380, 30, 260, 300, { zIndex: 4, transformOrigin: '30% 80%' }, `<svg viewBox="0 0 260 300" width="260" height="300"><path d="M40,40 H200 L220,280 H20 Z" fill="#c9a86a" stroke="${INK}" stroke-width="8"/><path d="M200,80 C260,80 260,180 210,180" stroke="${INK}" stroke-width="10" fill="none"/><path d="M40,40 L0,20" stroke="${INK}" stroke-width="10"/><circle cx="90" cy="140" r="14" fill="${INK}"/><circle cx="150" cy="140" r="14" fill="${INK}"/><path d="M90,200 Q120,230 150,200" stroke="${INK}" stroke-width="8" fill="none"/></svg>`);
  const chorro = box(tv.pant, 380, 200, 26, 10, { zIndex: 3, background: '#7cc4ea', border: `4px solid ${INK}`, borderRadius: '13px' });
  const mun = PERS(tv.pant, 120, 330, 280, { ropa: '#9a8a6a', pelo: 'calvo' });
  const trapo = box(tv.pant, 200, 470, 120, 60, { zIndex: 6, background: '#f4efe2', border: `5px solid ${INK}`, borderRadius: '10px' });
  const glu = [0, 1, 2].map(i => texto(cam, 0, 'glu', { size: 70, italic: true, color: '#7cc4ea', x: 0, w: 160, z: 16, shadow: `3px 3px 0 ${INK}` }));
  sp(T.tres, 'tada', 0.7); sp(T.toca, 'stamp', 0.8); sp(T.trapo, 'paper', 0.6); sp(T.agua, 'gulp', 0.9); sp(T.mucha, 'gulp', 0.9); sp(T.mucha + 0.4, 'gulp', 0.8);
  return t => {
    zoom(cam, t, L(8), 3, 0.07); cinta(tv, t);
    const kj = p(t, T.agua - 0.2, 0.4, E.outCubic); set(jarra, { r: -50 * kj }); chorro.style.height = px(10 + 260 * kj); set(chorro, { o: kj > 0.1 ? 1 : 0, x: -60 * kj });
    set(trapo, { o: t > T.trapo ? 1 : 0 }); pFace(mun, t, { feliz: -1, ceja: 16, closed: t > T.agua, jaw: 0.2 });
    glu.forEach((g, i) => { const k = ((t - T.agua) * 1.2 + i * 0.33) % 1; set(g, { o: t > T.agua ? 1 - k : 0, x: 180 + i * 120, y: 980 - k * 200 }); });
  };
});

/* L9 · [susurro] había un médico delante… no para curarte, sino para que aguantaras la siguiente sesión (ficha «APTO») */
headline(L(9) - 0.1, L(10) - 0.1, 'El *médico*', Object.assign({ size: 100, hlT: T.medico }, BL));
plano(L(9) - 0.1, L(10) - 0.1, { background: OSCURO }, c => {
  const cam = CAM(c); PIEDRAS(cam, 0);
  const v = [VELA_F(cam, 60, 520, 180, 3), VELA_F(cam, 960, 520, 180, 3)];
  const med = PERS(cam, 120, 640, 480, { ropa: '#f4efe2', pelo: 'calvo', barba: true, pcol: '#9a9a9a' });
  const ficha = box(cam, 600, 600, 400, 520, { zIndex: 10, background: CREMA, border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '38px', padding: '30px', boxSizing: 'border-box', color: INK, lineHeight: 1.4 }, '<b style="font-family:Rye;font-size:46px">INFORME</b><br>Pulso: ok<br>Respira: sí<br>¿Curar?: no');
  const apto = stamp(cam, 620, 980, 'APTO PARA OTRA', { size: 50, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const chs = texto(cam, 1260, 'chsss…', { size: 80, italic: true, color: '#f4efe2', x: 380, w: 400, z: 12 });
  sp(T.medico, 'pop', 0.7); sp(T.curarte, 'boing', 0.6); sp(T.sesion, 'stamp', 1);
  return t => {
    zoom(cam, t, L(9), 5, 0.07); v.forEach((x, i) => llama(x, t, i));
    set(med, { s: pop(t, T.medico - 0.1, 0.4) }); pFace(med, t, { feliz: t > T.aguantaras ? 1 : 0, look: [10, 4], ceja: t > T.curarte ? -4 : 6, jaw: t > T.curarte && t < T.aguantaras ? 0.4 : 0 });
    set(ficha, { o: t > T.curarte - 0.1 ? 1 : 0, s: pop(t, T.curarte - 0.1, 0.35), r: 3 }); stampA(apto, t, T.sesion, -10);
    set(chs, { o: t < T.medico ? 0.6 + 0.4 * Math.sin(t * 6) : 0 });
  };
});
shakeAt(T.sesion, 0.3, 12);

/* L10 · en España no se prohibió hasta 1811 (Cortes de Cádiz: «PROHIBIDA») — casi seis siglos de teletienda (contador; la tele se apaga) */
headline(L(10) - 0.1, L(11) - 0.1, 'Prohibida en *1811*', { size: 96, hlT: T.m1811 });
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.30)', 'rgba(0,0,0,0)', 0);
  const cnt = texto(cam, 440, '1252', { size: 200, z: 10 });
  const cad = box(cam, 200, 720, 680, 420, { zIndex: 8, background: CREMA, border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'Rye', fontSize: '54px', textAlign: 'center', paddingTop: '50px', boxSizing: 'border-box', color: INK }, 'CORTES DE CÁDIZ<br><span style="font-family:SpecialElite;font-size:40px">Queda abolida la tortura</span>');
  const proh = stamp(cam, 280, 1060, 'PROHIBIDA', { size: 100, z: 30 });
  const tvp = box(cam, 760, 1180, 240, 200, { zIndex: 12, background: '#6b4a2a', border: `7px solid ${INK}`, borderRadius: '24px' });
  const scr = box(tvp, 20, 20, 186, 140, { background: '#2b3550', border: `5px solid ${INK}`, borderRadius: '18px' });
  const lin = box(scr, 0, 64, 176, 6, { background: '#fff' });
  sp(T.espana, 'whoosh', 0.6); [...Array(8)].forEach((_, i) => sp(T.espana + 0.3 + i * 0.12, 'tick', 0.4)); sp(T.m1811 + 0.3, 'stamp', 1); sp(T.tele10, 'click', 0.9);
  return t => {
    set(ry, { r: t * 8 }); zoom(cam, t, L(10), 4, 0.06);
    const k = p(t, T.espana, T.m1811 - T.espana + 0.3, E.inOutCubic); cnt.textContent = String(Math.round(lerp(1252, 1811, k)));
    set(cad, { o: t > T.m1811 - 0.2 ? 1 : 0, s: pop(t, T.m1811 - 0.2, 0.4), r: -2 }); stampA(proh, t, T.m1811 + 0.3, -8);
    const off = p(t, T.tele10, 0.3, E.inCubic); set(lin, { sx: 1 - off * 0.95, o: t > T.tele10 + 0.3 ? 0 : 1 }); set(tvp, { o: t > T.siglos - 0.3 ? 1 : 0, s: pop(t, T.siglos - 0.3, 0.35) });
  };
});
shakeAt(T.m1811 + 0.3, 0.35, 14);

/* L11 · OJO: muchos aparatos de los museos de tortura son falsos (etiqueta «auténtico» que se despega: «hecho en 1950») */
plano(L(11) - 0.1, L(12) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const vit = box(c, 260, 520, 560, 520, { zIndex: 5, background: 'rgba(200,230,240,.5)', border: `8px solid ${INK}`, borderRadius: '10px' });
  const obj = box(c, 380, 640, 320, 280, { zIndex: 6 }, `<svg viewBox="0 0 320 280" width="320" height="280"><rect x="20" y="100" width="280" height="50" fill="#8a5a32" stroke="${INK}" stroke-width="7"/><circle cx="40" cy="125" r="34" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><circle cx="280" cy="125" r="34" fill="#6b4a2a" stroke="${INK}" stroke-width="7"/><path d="M60,150 V260 M260,150 V260" stroke="${INK}" stroke-width="16"/></svg>`);
  const eti = box(c, 330, 1060, 420, 120, { zIndex: 10, background: '#fff', border: `6px solid ${INK}`, fontFamily: 'SpecialElite', fontSize: '40px', textAlign: 'center', lineHeight: '108px', color: INK }, 'AUTÉNTICO s. XV');
  const fal = stamp(c, 300, 1050, 'hecho en 1950', { size: 64, z: 30 });
  return t => { set(obj, { y: Math.sin(t * 2) * 6 }); set(eti, { r: Math.sin(t * 3) * 3 }); stampA(fal, t, T.falsos, -8); };
});
sp(T.falsos, 'stamp', 0.9);

/* L12 · O sea: lo del agua volvió a las noticias hace veinte años… y ya lo usaba la Inquisición (tele de noticias + el inquisidor reclamando «¡eso es mío!») */
colorHit(L(12) - 0.1, L(13) - 0.1, YEL, c => {
  const tv = box(c, 140, 300, 800, 560, { zIndex: 6, background: '#3a3a40', border: `10px solid ${INK}`, borderRadius: '40px', boxShadow: `14px 14px 0 ${INK}` });
  const scr = box(tv, 30, 30, 720, 400, { background: '#2b3550', border: `6px solid ${INK}`, borderRadius: '30px', fontFamily: 'Rye', fontSize: '64px', color: '#fff', textAlign: 'center', paddingTop: '120px', boxSizing: 'border-box' }, 'ÚLTIMA HORA');
  box(tv, 30, 450, 720, 70, { background: RED, border: `5px solid ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: '40px', color: '#fff', textAlign: 'center', lineHeight: '60px' }, 'NOTICIAS · HACE 20 AÑOS');
  const inq = PERS(c, 380, 900, 380, { ropa: '#f4efe2', gorro: 'birrete', cruzVerde: true, cuello: true });
  const mio = BOCADILLO(c, 640, 900, '¡eso es mío!', { size: 56 });
  return t => { pFace(inq, t, { feliz: -1, ceja: 16, look: [-6, -10], jaw: t > T.inq12 ? 0.7 : 0.2 }); set(inq, { o: t > T.inq12 - 0.4 ? 1 : 0, y: (1 - p(t, T.inq12 - 0.4, 0.4, E.outBack)) * 500 }); popA(mio, t, T.inq12 + 0.2, { r: 5 }); set(scr, { o: 0.85 + 0.15 * Math.sin(t * 30) }); };
});
sfx('swoosh_up', L(12), 0.6); shakeAt(L(12) + 0.05, 0.3, 14); sp(T.inq12 + 0.2, 'boing', 0.8);

/* L13 · pregunta final (confesión pícara) */
preguntaFinal('¿Qué confesarías tú', 'nada más ver el potro?', { size: 80, draw: c => [['que me comí el jamón', YEL], ['que fui yo', PINK], ['¡TODO!', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 40, 620 + i * 160, s, { size: 58, bg: col, color: INK }), L(13) + 0.5 + i * 0.4, { sfx: 'pop' })) });

/* L14 · cierre */
cierre(81, 'La teletienda de la tortura', ['TORTURA', '1252']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(13) - 0.15]],
  vecino: { risa: [[T.poco, T.poco + 1.0], [T.detalle, T.detalle + 1.0], [T.ascensor, T.ascensor + 1.0]], sorpresa: [[T.torturar, T.torturar + 0.8], [T.sesion, T.sesion + 0.8], [T.inq12, T.inq12 + 0.8]], golpes: [T.herejia, T.torturar, T.confesabas + 0.2, T.peor, T.sesion, T.m1811 + 0.3] },
});
