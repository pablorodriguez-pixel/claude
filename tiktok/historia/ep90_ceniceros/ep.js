/* Ep. 90 · ¿Por qué los aviones tienen ceniceros si no se puede fumar? — formato del canal (Vecino, portada amarilla, pícaro) */
Story.prepara();
const T = {
  ceni0: Q('ceniceros'),
  veinte: Q('más de veinte años'), puerta: Q('la puerta del baño'),
  antes: Q('antes se fumaba'), bar: Q('en un bar'), nofum: Q('la zona de no fumadores'), fila: Q('una fila más atrás'),
  prohibieron: Q('lo prohibieron'), quitaron: Q('quitaron los ceniceros'),
  bueno: Q('aquí viene lo bueno'), normativa: Q('la normativa obliga'), banos: Q('en los baños'),
  porque: Q('porque siempre hay alguien'), escondidas: Q('a escondidas'),
  apagarlo: Q('dónde apagarlo'), papelera: Q('la papelera'), papel: Q('llena de papel'),
  m1973: Q('mil novecientos setenta y tres'), paris: Q('cerca de parís'), fuego: Q('un fuego'), bano8: Q('en un baño'),
  pillado: Q('el fumador pillado'), apague: Q('lo apague bien'),
  ojo: Q('ojo'), multa: Q('miles de euros'),
  osea: Q('o sea'), fumes: Q('para que fumes'), lias: Q('la lías'),
};
const GRIS_A = '#d9dde2', AZUL_A = '#2b4a8a', ACERO = '#9aa4ad';
const CENICERO = (c, x, y, w, z = 12) => box(c, x, y, w, w * 0.6, { zIndex: z, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 200 120" width="${w}" height="${w * 0.6}"><rect x="6" y="6" width="188" height="108" rx="18" fill="${ACERO}" stroke="${INK}" stroke-width="8"/><rect x="30" y="34" width="140" height="52" rx="10" fill="#3d3a44" stroke="${INK}" stroke-width="6"/><path d="M40,60 H160" stroke="#c9ced4" stroke-width="6" stroke-dasharray="10 8"/></svg>`);
const CIGARRO = (c, w = 200, z = 14) => { const d = box(c, 0, 0, w, w * 0.9, { zIndex: z, transformOrigin: '20% 80%' }, `<svg viewBox="0 0 200 180" width="${w}" height="${w * 0.9}" style="overflow:visible"><rect x="10" y="140" width="150" height="24" rx="6" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="10" y="140" width="44" height="24" rx="6" fill="#e0a043" stroke="${INK}" stroke-width="6"/><rect x="152" y="140" width="22" height="24" rx="6" fill="#ff6a2a" stroke="${INK}" stroke-width="6"/><path class="hu" d="M168,130 C150,100 190,80 168,50 C150,25 180,10 170,-10" stroke="#9aa4ad" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></svg>`); d.hu = d.querySelector('.hu'); return d; };
const humea = (cg, t) => cg.hu.setAttribute('transform', `translate(${f1(Math.sin(t * 3) * 8)} ${f1(-((t * 30) % 20))})`);
const NOFUMAR = (c, x, y, w, z = 12) => box(c, x, y, w, w, { zIndex: z }, `<svg viewBox="0 0 200 200" width="${w}" height="${w}"><circle cx="100" cy="100" r="88" fill="#fff" stroke="${RED}" stroke-width="18"/><rect x="36" y="92" width="110" height="22" rx="4" fill="${INK}"/><rect x="146" y="92" width="18" height="22" fill="#ff6a2a" stroke="${INK}" stroke-width="3"/><path d="M42,42 L158,158" stroke="${RED}" stroke-width="18" stroke-linecap="round"/></svg>`);
const PUERTA = (c, x, y, w, z = 5) => { const d = box(c, x, y, w, w * 1.8, { zIndex: z, background: GRIS_A, border: `9px solid ${INK}`, borderRadius: '30px', boxShadow: `14px 14px 0 ${INK}` });
  box(d, w * 0.08, w * 0.08, w * 0.84, w * 0.3, { background: '#fff', border: `6px solid ${INK}`, borderRadius: '16px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(w * 0.18), textAlign: 'center', lineHeight: px(w * 0.27), color: INK }, 'WC');
  NOFUMAR(d, w * 0.3, w * 0.48, w * 0.34, 3); box(d, w * 0.8, w * 0.85, w * 0.08, w * 0.3, { background: ACERO, border: `5px solid ${INK}`, borderRadius: '10px' }); return d; };
const ASIENTOS = (c, x, y, w, col = AZUL_A, z = 4) => box(c, x, y, w, w * 0.55, { zIndex: z }, `<svg viewBox="0 0 400 220" width="${w}" height="${w * 0.55}">${[0, 1, 2].map(i => `<rect x="${10 + i * 130}" y="10" width="120" height="170" rx="26" fill="${col}" stroke="${INK}" stroke-width="7"/><rect x="${18 + i * 130}" y="16" width="104" height="36" rx="12" fill="#f4efe2" stroke="${INK}" stroke-width="5"/><rect x="${10 + i * 130}" y="150" width="120" height="60" rx="14" fill="${col}" stroke="${INK}" stroke-width="7"/>`).join('')}</svg>`);
const VENTANILLAS = c => box(c, 0, 380, 1080, 300, { zIndex: 1, background: '#e9edf1', borderBottom: `8px solid ${INK}` }, `<svg viewBox="0 0 1080 300" width="1080" height="300">${[0, 1, 2, 3, 4].map(i => `<rect x="${40 + i * 210}" y="70" width="120" height="160" rx="60" fill="#9fd0ee" stroke="${INK}" stroke-width="7"/><path d="M${60 + i * 210},120 h50" stroke="#fff" stroke-width="10" opacity=".6"/>`).join('')}</svg>`);
const CABINA = { background: '#cfd5dc', backgroundImage: 'linear-gradient(#cfd5dc 0 62%, #8a93a0 62%)' };
const humo = (c, n = 5, z = 16) => [...Array(n)].map(() => box(c, 0, 0, 140, 100, { zIndex: z, borderRadius: '50%', background: 'rgba(200,205,212,.85)', border: `4px solid ${INK}` }));
const humoA = (hs, t, cx, cy, on = true) => hs.forEach((h, i) => { const k = ((t * 0.35 + i / hs.length) % 1); set(h, { o: on ? 0.9 * Math.sin(k * Math.PI) : 0, x: cx + Math.sin(t + i * 2) * 120 + (i - 2) * 60, y: cy - k * 360, s: 0.6 + k }); });
const MANO = (c, x, y, sz = 170, rot = -40, z = 18) => box(c, x, y, sz, sz, { zIndex: z }, `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.1)}</svg>`);

/* L0 · PORTADA (fotograma 0 completo, amarilla): la puerta del baño del avión: «PROHIBIDO FUMAR»… y justo debajo, ¡un cenicero! (con un cigarro humeando) */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 200, '¿Por qué el avión…', { size: 96 });
  const t2 = texto(c, 310, '…tiene ' + hlSpan('CENICERO', 'phl') + '?', { size: 96, italic: true });
  const pu = PUERTA(c, 330, 600, 420);
  const ce = CENICERO(c, 380, 1000, 320, 14); const cg = CIGARRO(c, 220, 16); set(cg, { x: 460, y: 880 });
  const fl = box(c, 700, 860, 260, 200, { zIndex: 20 }, `<svg viewBox="0 0 260 200" width="260" height="200"><path d="M240,20 C160,0 90,40 60,140" stroke="${RED}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M30,110 L60,150 L96,112" stroke="${RED}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
  const qq = texto(c, 760, '??', { size: 150, color: RED, x: 760, w: 260, z: 20, shadow: `5px 5px 0 ${INK}` });
  sfx('swoosh_up', 0.05, 0.6); sp(T.ceni0, 'boing', 0.9); sp(T.ceni0 + 0.2, 'stamp', 0.5);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    set(pu, { r: -2 + Math.sin(t * 2) * 1 }); set(ce, { s: 1 + 0.06 * Math.sin(t * 6), r: -3 }); humea(cg, t); set(cg, { x: 460, y: 880, r: -8 });
    set(fl, { r: Math.sin(t * 3) * 4 }); set(qq, { r: Math.sin(t * 4) * 8, s: 1 + 0.06 * Math.sin(t * 7) });
  };
}, { sfx: false });
shakeAt(T.ceni0, 0.3, 12);

/* L1 · «desde hace más de veinte años» (contador) → fíjate en la puerta del baño (zoom al cenicero) */
headline(L(1) - 0.1, L(2) - 0.1, 'Fíjate en *la puerta*', { size: 96, hlT: T.puerta });
plano(L(1) - 0.1, L(2) - 0.1, CABINA, c => {
  const cam = CAM(c); VENTANILLAS(cam);
  const as = [ASIENTOS(cam, 40, 760, 440), ASIENTOS(cam, 600, 760, 440)];
  const pu = PUERTA(cam, 620, 560, 280, 6); const ce = CENICERO(cam, 700, 990, 140, 9);
  const nf = NOFUMAR(cam, 330, 420, 200, 10); const cnt = chip(cam, 330, 1180, 'sin fumar: 20+ años', { size: 50, bg: RED });
  const lupa = box(cam, 640, 900, 260, 260, { zIndex: 20 }, `<svg viewBox="0 0 200 200" width="260" height="260"><circle cx="80" cy="80" r="62" fill="rgba(200,230,255,.3)" stroke="${INK}" stroke-width="14"/><path d="M126,126 L190,190" stroke="${INK}" stroke-width="22" stroke-linecap="round"/></svg>`);
  sp(T.veinte, 'stamp', 0.6); sp(T.puerta, 'whoosh', 0.6); sp(T.puerta + 0.4, 'ding', 0.7);
  return t => {
    const kz = p(t, T.puerta, 0.8, E.inOutCubic); cam.style.transformOrigin = '770px 1030px'; set(cam, { s: 1 + kz * 1.1 });
    set(nf, { s: pop(t, L(1), 0.35), r: -6, o: 1 - kz }); popA(cnt, t, T.veinte, { r: -4 }); set(cnt, { o: 1 - kz }); set(lupa, { o: t > T.puerta + 0.3 ? 1 : 0, s: pop(t, T.puerta + 0.3, 0.35), x: Math.sin(t * 2) * 10 });
    set(ce, { s: 1 + 0.08 * Math.sin(t * 8) * kz });
  };
});

/* L2 · antes se fumaba como en un bar (cabina de humo, años 70) y la zona de no fumadores… una fila más atrás (tosiendo) */
headline(L(2) - 0.1, L(3) - 0.1, 'Como en *un bar*', { size: 104, hlT: T.bar });
plano(L(2) - 0.1, L(3) - 0.1, { background: '#d8c3a0', backgroundImage: 'linear-gradient(#d8c3a0 0 62%, #8a6a44 62%)' }, c => {
  const cam = CAM(c); VENTANILLAS(cam).style.filter = 'sepia(.6)';
  const fe = chip(cam, 360, 410, 'AÑOS 70', { size: 64, bg: '#e8507a' });
  const fum = [[330, '#c87a3a', 'largo'], [560, '#4c8a3a', 'corto'], [790, '#7a5aa8', 'calvo']].map(([x, col, pe], i) => [PERS(cam, x, 700, 220, { ropa: col, pelo: pe, pcol: '#3a2a1e', barba: i === 1 }), i]);
  const cigs = fum.map(([f, i]) => { const cg = CIGARRO(cam, 110, 12); return cg; });
  const hs = humo(cam, 6);
  const nf = PERS(cam, 520, 1000, 240, { ropa: '#2b8ad6', pelo: 'corto' }); const sig = chip(cam, 340, 1260, 'NO FUMADORES', { size: 46, bg: '#2e6b3a' });
  const tos = texto(cam, 0, 'cof, cof', { size: 60, italic: true, color: INK, x: 0, w: 300, z: 20 });
  sp(T.antes, 'swoosh_up', 0.5); sp(T.bar, 'cash', 0.4); sp(T.nofum, 'pop2', 0.6); sp(T.fila, 'boing', 0.8); sp(T.fila + 0.4, 'burst', 0.4);
  return t => {
    zoom(cam, t, L(2), 5, 0.06); popA(fe, t, L(2) + 0.2, { r: -5 });
    fum.forEach(([f, i]) => pFace(f, t, { feliz: 1, closed: true, ceja: 6, seed: i })); cigs.forEach((cg, i) => { humea(cg, t + i); set(cg, { x: 380 + i * 230, y: 860, r: -20 }); });
    humoA(hs, t, 520, 900);
    set(nf, { o: t > T.nofum - 0.2 ? 1 : 0, s: pop(t, T.nofum - 0.2, 0.35) }); pFace(nf, t, { feliz: -1, ceja: 18, closed: t > T.fila, jaw: t > T.fila ? 0.6 : 0, seed: 4 }); popA(sig, t, T.nofum, { r: 4 });
    set(tos, { o: t > T.fila + 0.3 ? 1 : 0, x: 700 + Math.sin(t * 12) * 6, y: 1000 });
  };
});
shakeAt(T.fila + 0.3, 0.25, 10);

/* L3 · lo prohibieron (sello) y quitaron los ceniceros de los asientos (salen volando) */
headline(L(3) - 0.1, L(4) - 0.1, '*Prohibido*', { size: 112, hlT: T.prohibieron });
plano(L(3) - 0.1, L(4) - 0.1, CABINA, c => {
  const cam = CAM(c); VENTANILLAS(cam);
  const as = ASIENTOS(cam, 120, 760, 840);
  const ces = [0, 1, 2].map(i => CENICERO(cam, 230 + i * 280, 1000, 130, 9));
  const nf = NOFUMAR(cam, 380, 600, 320, 12);
  sp(T.prohibieron, 'stamp', 1); [0, 1, 2].forEach(i => sp(T.quitaron + 0.2 + i * 0.2, 'pop2', 0.6));
  return t => {
    zoom(cam, t, L(3), 4, 0.06); set(nf, { s: t > T.prohibieron ? lerp(2.2, 1, p(t, T.prohibieron, 0.2)) : 0, r: -8, o: t > T.prohibieron ? 1 : 0 });
    ces.forEach((e, i) => { const k = p(t, T.quitaron + 0.2 + i * 0.2, 0.7, E.inCubic); set(e, { x: k * (i - 1) * 300, y: -k * 900, r: k * 500 * (i % 2 ? 1 : -1), o: 1 - k * 0.3 }); });
  };
});
shakeAt(T.prohibieron, 0.3, 12);

/* L4 · aquí viene lo bueno: la NORMATIVA obliga a que siga habiendo ceniceros en los baños (documento + sello OBLIGATORIO) */
headline(L(4) - 0.1, L(5) - 0.1, 'Es *obligatorio*', { size: 104, hlT: T.normativa });
plano(L(4) - 0.1, L(5) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const ry = rays(cam, -160, 420, 1400, 24, 'rgba(255,230,0,.28)', 'rgba(0,0,0,0)', 0);
  const doc = box(cam, 300, 420, 560, 640, { zIndex: 8, background: CREMA, border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '38px', color: INK, padding: '34px', boxSizing: 'border-box', lineHeight: 1.45 }, '<b style="font-family:Rye;font-size:52px">NORMATIVA</b><br>Aviación civil<br><br>Art. 1: prohibido fumar.<br>Art. 2: cenicero en el baño.');
  const ok = stamp(cam, 330, 1100, 'OBLIGATORIO', { size: 96, z: 30, col: VERDEI, bg: 'rgba(255,255,255,.9)', blend: 'normal' });
  const ce = CENICERO(cam, 660, 900, 220, 12); const tu = PERS(cam, 760, 1090, 220, { ropa: '#2b8ad6', pelo: 'corto' });
  sp(T.bueno, 'drumroll', 0.5); sp(T.normativa, 'paper', 0.8); sp(T.banos, 'stamp', 1);
  return t => {
    zoom(cam, t, L(4), 4, 0.06); set(ry, { r: t * 8 }); set(doc, { s: pop(t, T.normativa - 0.2, 0.4), r: -3 });
    set(ce, { o: t > T.banos - 0.2 ? 1 : 0, s: pop(t, T.banos - 0.2, 0.35), r: 8 }); stampA(ok, t, T.banos, -6);
    pFace(tu, t, { feliz: t > T.banos ? -0.6 : 0, ceja: t > T.banos ? 20 : 8, jaw: t > T.banos ? 0.7 : 0, look: [-14, -6] }); set(tu, { o: t > T.bueno ? 1 : 0 });
  };
});
shakeAt(T.banos, 0.3, 12);

/* L5 · ¿por qué? porque siempre hay alguien que fuma a escondidas en el baño (dentro del baño, el pillo con el cigarro, sudando) */
headline(L(5) - 0.1, L(6) - 0.1, 'A *escondidas*', Object.assign({ size: 104, hlT: T.escondidas }, BL));
plano(L(5) - 0.1, L(6) - 0.1, { background: '#3d4250', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 40px, transparent 40px 80px)' }, c => {
  const cam = CAM(c);
  const esp = box(cam, 560, 420, 400, 420, { zIndex: 2, background: 'linear-gradient(135deg,#dff1fb,#9cc6dc)', border: `10px solid ${ACERO}`, outline: `6px solid ${INK}`, borderRadius: '20px' });
  const lav = box(cam, 520, 1080, 480, 160, { zIndex: 3, background: GRIS_A, border: `8px solid ${INK}`, borderRadius: '30px 30px 60px 60px' });
  const pi = PERS(cam, 300, 640, 420, { ropa: '#c87a3a', pelo: 'corto', barba: true, pcol: '#3a2a1e' }); const cg = CIGARRO(cam, 160, 14);
  const su = [sudor(cam, 0, 0), sudor(cam, 0, 0)]; const hs = humo(cam, 4);
  const det = box(cam, 760, 300, 140, 90, { zIndex: 6, background: '#fff', border: `6px solid ${INK}`, borderRadius: '50% 50% 20px 20px' });
  const led = box(det, 54, 26, 24, 24, { background: RED, borderRadius: '50%' });
  sp(T.porque, 'click', 0.5); sp(T.escondidas, 'boing', 0.7);
  return t => {
    zoom(cam, t, L(5), 3, 0.08);
    pFace(pi, t, { feliz: 0.6, ceja: 14, look: [Math.sin(t * 3) * 14, 0], closed: false, seed: 1 }); set(pi, { x: Math.sin(t * 2) * 8 });
    humea(cg, t); set(cg, { x: 600, y: 920, r: -20 }); humoA(hs, t, 640, 860);
    su.forEach((s, i) => { const k = ((t + i * 0.5) * 1.1) % 1; set(s, { o: 1 - k, x: 380 + i * 220, y: 700 + k * 100 }); });
    set(led, { o: 0.4 + 0.6 * (Math.floor(t * 3) % 2) });
  };
});

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · si no tiene dónde apagarlo… lo tira a la papelera, llena de papel (el cigarro cae dentro: humo y llamitas) */
headline(L(7) - 0.1, L(8) - 0.1, 'A *la papelera*', { size: 104, hlT: T.papelera });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#cfd5dc' }, c => {
  const cam = CAM(c);
  const pap = box(cam, 330, 760, 420, 460, { zIndex: 6 }, `<svg viewBox="0 0 420 460" width="420" height="460"><path d="M40,80 H380 L350,450 H70 Z" fill="${ACERO}" stroke="${INK}" stroke-width="9"/><path d="M90,80 C110,20 160,40 170,80 M180,80 C200,10 260,30 260,80 M270,80 C290,30 340,40 330,80" fill="#f4efe2" stroke="${INK}" stroke-width="6"/><path d="M110,140 V400 M210,140 V400 M310,140 V400" stroke="#7d8790" stroke-width="8"/></svg>`);
  const cg = CIGARRO(cam, 140, 8); const hs = humo(cam, 5, 7);
  const llamas = [0, 1, 2].map(i => box(cam, 0, 0, 90, 120, { zIndex: 7 }, `<svg viewBox="0 0 90 120" width="90" height="120"><path d="M45,0 C80,40 90,80 70,108 C55,124 35,124 20,108 C0,80 10,40 45,0 Z" fill="#ff8a2a" stroke="${INK}" stroke-width="5"/><path d="M45,46 C60,66 62,84 54,98 C48,106 40,104 36,96 C30,82 36,66 45,46 Z" fill="#ffe27a"/></svg>`));
  const uy = BOCADILLO(cam, 640, 520, '¡uy!', { size: 60 });
  sp(T.apagarlo, 'click', 0.5); sp(T.papelera, 'whoosh', 0.7); sp(T.papel, 'paper', 0.7); sp(T.papel + 0.4, 'burst', 0.5);
  return t => {
    zoom(cam, t, L(7), 4, 0.07);
    const kc = p(t, T.papelera - 0.2, 0.6, E.inCubic); set(cg, { x: 470, y: lerp(380, 780, kc), r: kc * 260, o: kc < 1 ? 1 : 0 }); humea(cg, t);
    humoA(hs, t, 480, 760, t > T.papel); llamas.forEach((l, i) => set(l, { o: t > T.papel + 0.3 ? 1 : 0, x: 400 + i * 90, y: 760 + Math.sin(t * 12 + i) * 8, s: pop(t, T.papel + 0.3 + i * 0.1, 0.3) * (1 + 0.15 * Math.sin(t * 14 + i)) }));
    popA(uy, t, T.papel + 0.4, { r: 6 });
  };
});

/* L8 · [susurro] 1973: un avión acabó estrellándose cerca de París por un fuego que empezó en un baño (recorte de prensa, sin nada gráfico) */
headline(L(8) - 0.1, L(9) - 0.1, 'París, *1973*', Object.assign({ size: 104, hlT: T.m1973 }, BL));
plano(L(8) - 0.1, L(9) - 0.1, { background: '#1f2a44' }, c => {
  const cam = CAM(c);
  const per = box(cam, 220, 460, 640, 520, { zIndex: 10, background: '#f4efe2', border: `7px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}`, fontFamily: 'Playfair', color: INK, padding: '30px', boxSizing: 'border-box', textAlign: 'center' }, `<div style="font-family:Rye;font-size:52px;border-bottom:6px double ${INK};padding-bottom:10px">LA PRENSA · 1973</div><div style="font-weight:900;font-size:70px;line-height:1.05;margin-top:30px">Un incendio<br>en el baño</div><div style="font-family:SpecialElite;font-size:32px;margin-top:24px">cerca de París</div>`);
  const av = box(cam, 300, 1060, 480, 160, { zIndex: 9 }, `<svg viewBox="0 0 480 160" width="480" height="160"><path d="M20,90 C20,60 60,50 120,50 H400 C440,50 470,70 470,90 C470,110 440,120 400,120 H120 C60,120 20,110 20,90 Z" fill="#f4efe2" stroke="${INK}" stroke-width="7"/><path d="M200,60 L260,0 H300 L260,60 Z M200,110 L260,160 H300 L260,110 Z" fill="${ACERO}" stroke="${INK}" stroke-width="6"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${150 + i * 50}" cy="82" r="10" fill="#9fd0ee" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`);
  const hs = humo(cam, 4, 8);
  sp(T.m1973, 'paper', 0.7); sp(T.paris, 'pop', 0.4); sp(T.bano8, 'thud', 0.6);
  return t => { zoom(cam, t, L(8), 5, 0.06); set(per, { s: pop(t, L(8), 0.4), r: -3 }); set(av, { x: Math.sin(t * 1.5) * 20, y: Math.sin(t * 2) * 8 }); humoA(hs, t, 700, 1080, t > T.fuego); };
});

/* L9 · así que prefieren que el fumador pillado… por lo menos lo apague bien (la azafata, brazos cruzados, señala el cenicero) */
headline(L(9) - 0.1, L(10) - 0.1, 'Por lo menos, *apágalo*', { size: 92, hlT: T.apague });
plano(L(9) - 0.1, L(10) - 0.1, CABINA, c => {
  const cam = CAM(c); VENTANILLAS(cam);
  const az = PERS(cam, 600, 640, 380, { ropa: AZUL_A, pelo: 'moño', pcol: '#3a2a1e', cuello: true, severo: true });
  const pi = PERS(cam, 300, 760, 300, { ropa: '#c87a3a', pelo: 'corto', barba: true, pcol: '#3a2a1e' });
  const ce = CENICERO(cam, 340, 1150, 180, 14); const cg = CIGARRO(cam, 110, 15); const ma = MANO(cam, 560, 980, 160, 160);
  const bo = BOCADILLO(cam, 560, 480, 'al menos, aquí', { size: 50 });
  sp(T.pillado, 'ding', 0.6); sp(T.apague, 'squish', 0.8);
  return t => {
    zoom(cam, t, L(9), 4, 0.06);
    pFace(az, t, { feliz: -0.4, ceja: 10, look: [-14, 6], seed: 2 }); pFace(pi, t, { feliz: -0.8, ceja: 18, look: [10, 6], closed: t > T.apague, seed: 1 });
    const ka = p(t, T.apague, 0.4); humea(cg, t); set(cg, { x: 390, y: lerp(1000, 1080, ka), r: lerp(-20, 20, ka), o: t < T.apague + 0.6 ? 1 : 0 });
    set(ma, { x: Math.sin(t * 6) * 6 }); popA(bo, t, T.pillado + 0.3, { r: 4 });
  };
});

/* L10 · OJO: fumar en un avión te puede costar miles de euros de multa (multa con €€€) */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const mu = box(c, 300, 560, 480, 560, { zIndex: 6, background: '#fff', border: `8px solid ${INK}`, boxShadow: `12px 12px 0 ${INK}`, fontFamily: 'SpecialElite', fontSize: '40px', color: INK, padding: '30px', boxSizing: 'border-box', lineHeight: 1.5 }, '<b style="font-family:Rye;font-size:58px;color:#c8102e">MULTA</b><br>Motivo: fumar<br>Lugar: el avión<br>Importe:');
  const im = texto(c, 960, '€€€€', { size: 110, color: '#2e7a4a', x: 300, w: 480, z: 10, shadow: `4px 4px 0 ${INK}` });
  return t => { set(mu, { r: -3 + Math.sin(t * 2), s: pop(t, L(10), 0.4) }); set(im, { o: t > T.multa ? 1 : 0, s: pop(t, T.multa, 0.3) }); };
});
sp(T.multa, 'cash', 0.9);

/* L11 · O sea: el cenicero no es para que fumes… es para cuando la lías */
colorHit(L(11) - 0.1, L(12) - 0.1, YEL, c => {
  const ce = CENICERO(c, 300, 520, 480, 10);
  const et = box(c, 220, 860, 640, 160, { zIndex: 12, background: '#fff', border: `7px solid ${INK}`, boxShadow: `10px 10px 0 ${INK}`, fontFamily: 'Rye', fontSize: '42px', textAlign: 'center', lineHeight: '146px', whiteSpace: 'nowrap', color: INK, transformOrigin: '50% 0' }, 'PARA CUANDO LA LÍAS');
  const no = chip(c, 360, 420, 'NO es para fumar', { size: 56, bg: RED });
  return t => { set(ce, { r: Math.sin(t * 3) * 4, s: 1 + 0.04 * Math.sin(t * 6) }); popA(no, t, T.fumes, { r: -4 }); set(et, { o: t > T.lias - 0.3 ? 1 : 0, r: Math.sin(t * 3) * 3, s: pop(t, T.lias - 0.3, 0.35) }); };
});
sfx('swoosh_up', L(11), 0.6); sp(T.lias - 0.3, 'stamp', 0.9); shakeAt(T.lias - 0.2, 0.3, 12);

/* L12 · pregunta final (pícara) */
preguntaFinal('¿Conoces a alguien capaz', 'de fumar en el baño del avión?', { size: 62, draw: c => [['mi tío, seguro', YEL], ['yo no… o sí', PINK], ['mi cuñado, fijo', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 320 + i * 30, 640 + i * 160, s, { size: 56, bg: col, color: INK }), L(12) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(90, 'El cenicero del avión', ['AVIÓN', 'cenicero']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(12) - 0.15]],
  vecino: { risa: [[T.fila, T.fila + 1.0], [T.apague, T.apague + 1.0], [T.lias, T.lias + 1.0]], sorpresa: [[T.banos, T.banos + 0.8], [T.papel, T.papel + 0.8]], golpes: [T.prohibieron, T.banos, T.papel + 0.3, T.lias - 0.2] },
});
