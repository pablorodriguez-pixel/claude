/* Ep. 83 · Los botones placebo: el del semáforo, el del ascensor y el termostato de la oficina — no hacen nada… salvo calmarte · pícaro y cercano */
Story.prepara();
const T = {
  nada0: Q('no hace nada'),
  venga: Q('venga a darle'), unico: Q('no eres el único'), proposito: Q('a propósito'),
  ny: Q('nueva york'), setenta: Q('años setenta'), ponen: Q('ponen botones'), peatones: Q('los peatones'), paso: Q('pidan paso'),
  ochenta: Q('en los ochenta'), ordenadores: Q('los ordenadores'), solos: Q('cambiar solos'),
  botones4: Q('y los botones'), dineral: Q('un dineral'), dejaron: Q('los dejaron ahí'), descon: Q('desconectados'),
  m2004: Q('dos mil cuatro'), nyt: Q('new york times'), tres: Q('tres mil doscientos'), dosmil: Q('dos mil quinientos'), nada5: Q('no hacían nada'),
  eeuu: Q('estados unidos'), cerrar: Q('cerrar puertas'), tampoco: Q('tampoco suele ir'), desact: Q('lo desactivan'), silla: Q('silla de ruedas'),
  oficinas: Q('muchas oficinas'), termostato: Q('el termostato'), pega: Q('de pega'), conectado: Q('conectado a nada'),
  quitan: Q('no los quitan'), funcionan: Q('sí funcionan'), semaforo9: Q('con el semáforo'), contigo: Q('contigo'), calma: Q('te calma'), rojo: Q('en rojo'),
  ojo: Q('ojo'), cruce: Q('del cruce'),
  osea: Q('o sea'), vida: Q('toda la vida'), pulsando: Q('pulsando un botón'), nervioso: Q('no te pongas nervioso'),
};
const AMA_B = '#f6c915', VERDE_S = '#3fbf5a', ROJO_S = '#e8402a', ACERO = '#b9c2cb';
/* botonera de semáforo (vb 0 0 200 300): «PULSE» + botón gordo + «ESPERE VERDE» */
const BOTONERA = (c, x, y, w, z = 10) => { const d = box(c, x, y, w, w * 1.5, { zIndex: z }, `<svg viewBox="0 0 200 300" width="${w}" height="${w * 1.5}"><rect x="8" y="8" width="184" height="284" rx="26" fill="${AMA_B}" stroke="${INK}" stroke-width="10"/><text x="100" y="66" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">PULSE</text>
  <g class="bb"><circle cx="100" cy="150" r="56" fill="#2a2a2e" stroke="${INK}" stroke-width="8"/><circle cx="100" cy="150" r="40" fill="${ACERO}" stroke="${INK}" stroke-width="6"/><circle cx="88" cy="136" r="10" fill="#fff" opacity=".7"/></g>
  <circle class="lz" cx="100" cy="232" r="12" fill="#5a4a1a" stroke="${INK}" stroke-width="4"/><text x="100" y="276" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="24" fill="${INK}">ESPERE VERDE</text></svg>`);
  d.bb = d.querySelector('.bb'); d.lz = d.querySelector('.lz'); return d; };
const pulsa = (b, t, on, f = 7) => { const k = on ? Math.max(0, Math.sin(t * f)) : 0; b.bb.setAttribute('transform', `translate(100 150) scale(${f1(1 - 0.18 * k)}) translate(-100 -150)`); return k; };
/* semáforo de peatones (vb 0 0 160 560): muñeco rojo / verde (clases .r .v) */
const MUNECO = (cx, cy, col) => `<circle cx="${cx}" cy="${cy - 40}" r="14" fill="${col}"/><path d="M${cx},${cy - 24} V${cy + 16} M${cx - 22},${cy - 6} H${cx + 22} M${cx},${cy + 16} L${cx - 16},${cy + 48} M${cx},${cy + 16} L${cx + 16},${cy + 48}" stroke="${col}" stroke-width="12" stroke-linecap="round"/>`;
const SEMAFORO = (c, x, y, h = 760, z = 6) => { const d = box(c, x, y, 160, h, { zIndex: z }, `<svg viewBox="0 0 160 ${h}" width="160" height="${h}"><rect x="66" y="300" width="28" height="${h - 300}" fill="#5d636b" stroke="${INK}" stroke-width="6"/><rect x="10" y="10" width="140" height="290" rx="20" fill="#2a2a2e" stroke="${INK}" stroke-width="8"/>
  <circle cx="80" cy="85" r="56" fill="#3a1a1a" stroke="${INK}" stroke-width="5"/><g class="r">${MUNECO(80, 92, ROJO_S)}</g><circle cx="80" cy="220" r="56" fill="#1a3a1a" stroke="${INK}" stroke-width="5"/><g class="v">${MUNECO(80, 227, VERDE_S)}</g></svg>`);
  d.r = d.querySelector('.r'); d.v = d.querySelector('.v'); return d; };
const luz = (s, verde) => { s.r.style.opacity = verde ? 0.15 : 1; s.v.style.opacity = verde ? 1 : 0.15; };
const MANO = (c, x, y, sz = 170, rot = -40, z = 18) => box(c, x, y, sz, sz, { zIndex: z }, `<svg viewBox="-60 -70 120 120" width="${sz}" height="${sz}" style="overflow:visible">${gloveHand(0, 0, rot, 1.1)}</svg>`);
const CLIC = (c, n = 3) => [...Array(n)].map(() => texto(c, 0, '¡clic!', { size: 58, italic: true, color: RED, x: 0, w: 220, z: 22, shadow: `3px 3px 0 ${INK}` }));
const clics = (cs, t, t0, cx, cy, on = true) => cs.forEach((e, i) => { const k = ((t - t0) * 1.6 + i / cs.length) % 1; set(e, { o: on && t > t0 ? 1 - k : 0, x: cx + (i - 1) * 140, y: cy - k * 160, r: (i - 1) * 10 }); });
const CABLE = (c, x, y, z = 9) => box(c, x, y, 360, 300, { zIndex: z }, `<svg viewBox="0 0 360 300" width="360" height="300" style="overflow:visible"><path class="cb" d="M20,0 C20,120 140,140 160,220" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round"/><g class="en" transform="translate(160 220)"><rect x="-22" y="0" width="44" height="54" rx="8" fill="#5d636b" stroke="${INK}" stroke-width="6"/><path d="M-10,54 V80 M10,54 V80" stroke="${INK}" stroke-width="8"/></g><g class="ch" transform="translate(240 240)"><rect x="-40" y="-30" width="80" height="80" rx="12" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="-14" cy="10" r="7" fill="${INK}"/><circle cx="14" cy="10" r="7" fill="${INK}"/></g></svg>`);
const desenchufa = (cb, t, t0) => { const k = p(t, t0, 0.4, E.outBack); cb.querySelector('.en').setAttribute('transform', `translate(${f1(lerp(240, 150, k))} ${f1(lerp(200, 150, k))}) rotate(${f1(-30 * k)})`); };
const CIUDAD = c => box(c, 0, 900, 1080, 1020, { zIndex: 1 }, `<svg viewBox="0 0 1080 1020" width="1080" height="1020">${[[0, 260, 160], [150, 120, 140], [280, 320, 120], [390, 60, 170], [550, 220, 150], [690, 0, 120], [800, 180, 140], [930, 300, 150]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${1020 - y}" fill="#1d2440" stroke="${INK}" stroke-width="5"/>${[...Array(8)].map((_, j) => `<rect x="${x + 22 + (j % 2) * (w / 2 - 10)}" y="${y + 30 + Math.floor(j / 2) * 70}" width="30" height="36" fill="${(j + x) % 3 ? '#f6d36a' : '#33406a'}"/>`).join('')}`).join('')}<rect x="0" y="520" width="1080" height="500" fill="#4a4f58" stroke="${INK}" stroke-width="6"/>${[...Array(6)].map((_, i) => `<rect x="${60 + i * 170}" y="700" width="110" height="26" fill="#fff"/>`).join('')}</svg>`);
const CALLE = { background: '#9fd0ea', backgroundImage: 'linear-gradient(#9fd0ea 0 62%, #8a8f98 62%)' };
const NOCHE = { background: '#2b3550', backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(255,230,150,.25), transparent 50%)' };

/* L0 · PORTADA (fotograma 0 completo): botonera de semáforo con una mano aporreándola, el cable suelto y el sello NO HACE NADA */
plano(-1, L(1) - 0.1, PAPEL, c => {
  const ry = rays(c, -160, 420, 1400, 24, 'rgba(255,230,0,.34)', 'rgba(0,0,0,0)', 0);
  texto(c, 210, '¿Por qué pulsas…', { size: 92 });
  const t2 = texto(c, 320, '…un botón ' + hlSpan('FALSO', 'phl') + '?', { size: 96, italic: true });
  const bo = BOTONERA(c, 340, 470, 400);
  const ma = MANO(c, 560, 700, 240, -50);
  const cb = CABLE(c, 420, 1150);
  const cs = CLIC(c);
  const sel = stamp(c, 230, 1190, 'NO HACE NADA', { size: 92, z: 30 });
  sfx('swoosh_up', 0.05, 0.6); [0.3, 0.75, 1.2, 1.65].forEach(x => sp(x, 'click', 0.7)); sp(T.nada0, 'stamp', 1); sp(T.nada0 + 0.1, 'error', 0.5);
  return t => {
    set(ry, { r: t * 6 }); set(t2, { r: -2 + wobble(t, 0.5, 1) }); paint(c.querySelector('.phl'), t, 0.25, 0.4);
    const k = pulsa(bo, t, true, 14); set(ma, { x: -k * 40, y: -k * 30 }); set(bo, { r: Math.sin(t * 2) * 2 });
    desenchufa(cb, t, -1); clics(cs, t, 0, 420, 900); stampA(sel, t, t < T.nada0 ? -1 : T.nada0, -6);
  };
}, { sfx: false });
shakeAt(T.nada0, 0.3, 12);

/* L1 · y tú, venga a darle (contador de pulsaciones) → no eres el único (más gente) → TE LO HICIERON A PROPÓSITO */
headline(L(1) - 0.1, L(2) - 0.1, 'A *propósito*', { size: 104, hlT: T.proposito });
plano(L(1) - 0.1, L(2) - 0.1, CALLE, c => {
  const cam = CAM(c);
  const se = SEMAFORO(cam, 820, 380, 900);
  const bo = BOTONERA(cam, 700, 760, 160, 9);
  const tu = PERS(cam, 330, 620, 400, { ropa: '#2b8ad6', pelo: 'corto' });
  const ma = MANO(cam, 640, 860, 150, -60);
  const cnt = chip(cam, 360, 430, '×1', { size: 70, bg: RED });
  const otros = [[560, 1040, '#e8507a', 'largo'], [330, 1060, '#4c8a3a', 'calvo']].map(([x, y, col, pe], i) => PERS(cam, x, y, 220, { ropa: col, pelo: pe, pcol: '#8a5a32', z: 12 }));
  const pro = stamp(cam, 320, 1180, '¡A PROPÓSITO!', { size: 68, z: 30 });
  sp(T.venga, 'click', 0.7); [...Array(8)].forEach((_, i) => sp(T.venga + 0.25 + i * 0.22, 'click', 0.5)); sp(T.unico, 'pop2', 0.7); sp(T.proposito, 'stamp', 1);
  return t => {
    zoom(cam, t, L(1), 4, 0.07); luz(se, false);
    const k = pulsa(bo, t, t > T.venga, 14); set(ma, { x: -k * 30, y: -k * 20 });
    pFace(tu, t, { feliz: t > T.proposito ? -1 : 0.2, ceja: t > T.proposito ? 18 : 10, look: [14, 4], jaw: t > T.proposito ? 0.8 : 0.1 });
    cnt.textContent = '×' + Math.max(1, Math.floor((t - T.venga) * 4.5)); set(cnt, { o: t > T.venga ? 1 : 0, r: -6, s: 1 + 0.06 * Math.sin(t * 20) });
    otros.forEach((o, i) => { set(o, { o: t > T.unico + i * 0.2 ? 1 : 0, s: pop(t, T.unico + i * 0.2, 0.35) }); pFace(o, t, { feliz: 0, ceja: 12, look: [12, -4], seed: i }); });
    stampA(pro, t, T.proposito, -6);
  };
});
shakeAt(T.proposito, 0.3, 12);

/* L2 · Nueva York, años 70: ciudad de noche, ponen botones en los semáforos, los peatones piden paso → verde */
headline(L(2) - 0.1, L(3) - 0.1, 'Nueva York, *años 70*', Object.assign({ size: 96, hlT: T.setenta }, BL));
plano(L(2) - 0.1, L(3) - 0.1, NOCHE, c => {
  const cam = CAM(c); CIUDAD(cam);
  const fe = chip(cam, 380, 470, '1970', { size: 80, bg: AMA_B, color: INK });
  const se = SEMAFORO(cam, 780, 520, 900, 6);
  const bo = BOTONERA(cam, 640, 900, 170, 9);
  const pe = PERS(cam, 330, 820, 340, { ropa: '#c87a3a', pelo: 'largo', pcol: '#3a2a1e' });
  const ma = MANO(cam, 590, 1000, 130, -60);
  const ok = box(cam, 520, 620, 160, 160, { zIndex: 20 }, CHECK);
  sp(T.ny, 'whoosh', 0.6); sp(T.setenta, 'tada', 0.6); sp(T.ponen, 'pop2', 0.7); sp(T.paso, 'click', 0.8); sp(T.paso + 0.3, 'ding', 0.8);
  return t => {
    zoom(cam, t, L(2), 5, 0.06); popA(fe, t, T.setenta, { r: -5 });
    set(bo, { o: t > T.ponen ? 1 : 0, s: pop(t, T.ponen, 0.35) }); pulsa(bo, t, t > T.paso && t < T.paso + 0.3, 20);
    set(pe, { o: t > T.peatones - 0.2 ? 1 : 0, x: (1 - p(t, T.peatones - 0.2, 0.5, E.outCubic)) * -500 }); pFace(pe, t, { feliz: 1, look: [14, 0], seed: 1 });
    set(ma, { o: t > T.paso - 0.1 ? 1 : 0 }); luz(se, t > T.paso + 0.3); stampA(ok, t, T.paso + 0.3, -8);
  };
});

/* L3 · en los ochenta llegan los ordenadores → los semáforos cambian solos (pantalla verde «AUTO», luces que alternan) */
headline(L(3) - 0.1, L(4) - 0.1, 'Llegan los *ordenadores*', { size: 88, hlT: T.ordenadores });
plano(L(3) - 0.1, L(4) - 0.1, { background: '#d8d0bf', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 4px, transparent 4px 80px)' }, c => {
  const cam = CAM(c);
  const fe = chip(cam, 380, 380, '1980', { size: 80, bg: '#9fd3c0', color: INK });
  const pc = box(cam, 300, 500, 520, 500, { zIndex: 8, background: '#e6dcc4', border: `9px solid ${INK}`, borderRadius: '30px', boxShadow: `14px 14px 0 ${INK}` });
  const scr = box(pc, 40, 40, 420, 300, { background: '#0e2a14', border: `7px solid ${INK}`, borderRadius: '24px', fontFamily: 'SpecialElite', fontSize: '38px', color: '#5dff7a', padding: '24px', boxSizing: 'border-box', lineHeight: 1.35 }, '');
  box(pc, 60, 380, 380, 50, { background: '#bdb39a', border: `5px solid ${INK}`, borderRadius: '10px' });
  const se = SEMAFORO(cam, 860, 560, 700, 6);
  const au = stamp(cam, 330, 1100, 'MODO AUTOMÁTICO', { size: 64, col: VERDEI, z: 30, bg: 'rgba(255,255,255,.92)', blend: 'normal' });
  const txt = '> SEMÁFOROS\n> HORARIO: ON\n> BOTONES: …';
  sp(T.ochenta, 'pop', 0.6); sp(T.ordenadores, 'ping', 0.7); [...Array(14)].forEach((_, i) => sp(T.ordenadores + 0.2 + i * 0.07, 'type', 0.35)); sp(T.solos, 'stamp', 0.9);
  return t => {
    zoom(cam, t, L(3), 4, 0.06); popA(fe, t, T.ochenta, { r: 5 }); set(pc, { s: pop(t, L(3) - 0.1, 0.4) });
    const n = Math.floor(clamp((t - T.ordenadores - 0.2) / 1.0) * txt.length); scr.innerHTML = txt.slice(0, n).replace(/\n/g, '<br>') + (Math.floor(t * 3) % 2 ? '▌' : '');
    luz(se, t > T.solos ? Math.floor(t * 2.5) % 2 === 0 : false); stampA(au, t, T.solos, -5);
  };
});

/* L4 · ¿y los botones? quitarlos = un dineral → los dejaron ahí… DESCONECTADOS (el enchufe se sale, chispa) */
headline(L(4) - 0.1, L(5) - 0.1, '¿Y los *botones*?', { size: 104, hlT: T.botones4 });
plano(L(4) - 0.1, L(5) - 0.1, CALLE, c => {
  const cam = CAM(c);
  const bo = BOTONERA(cam, 340, 420, 380, 9);
  const cb = CABLE(cam, 420, 960, 8);
  const pr = PRECIO(cam, 700, 460, 'quitarlos:<br>$$$$');
  const din = [0, 1, 2, 3].map(() => texto(cam, 0, '$', { size: 100, color: '#2e7a4a', x: 0, w: 100, z: 14, shadow: `4px 4px 0 ${INK}` }));
  const chis = estrellas(cam, 4);
  const de = stamp(cam, 310, 1190, 'DESCONECTADO', { size: 80, z: 30 });
  const zz = texto(cam, 470, 'zzz', { size: 80, italic: true, color: '#2b3550', x: 720, w: 260, z: 14 });
  sp(T.botones4, 'boing', 0.6); sp(T.dineral, 'cash', 0.9); sp(T.dejaron, 'thud', 0.6); sp(T.descon, 'burst', 0.6); sp(T.descon + 0.4, 'stamp', 1);
  return t => {
    zoom(cam, t, L(4), 4, 0.07); set(bo, { r: Math.sin(t * 2) * 2 });
    set(pr, { o: t > T.dineral && t < T.dejaron ? 1 : 0, s: pop(t, T.dineral, 0.35), r: 8 + Math.sin(t * 4) * 6 });
    din.forEach((d, i) => { const k = ((t - T.dineral) * 0.9 + i * 0.25) % 1; set(d, { o: t > T.dineral && t < T.dejaron ? 1 - k : 0, x: 700 + (i % 2) * 160, y: 800 - k * 300 }); });
    desenchufa(cb, t, T.descon); orb(chis, t, 720, 1180, 80, 60); chis.forEach(b => { b.style.opacity = t > T.descon && t < T.descon + 0.6 ? 1 : 0; });
    bo.lz.setAttribute('fill', t > T.descon ? '#5a4a1a' : (Math.floor(t * 4) % 2 ? '#ffd94a' : '#5a4a1a'));
    stampA(de, t, T.descon + 0.4, -6); set(zz, { o: t > T.descon + 0.8 ? 0.6 + 0.4 * Math.sin(t * 4) : 0 });
  };
});
shakeAt(T.descon + 0.4, 0.3, 12);

/* L5a · 2004: el New York Times lo destapa (portada que entra girando) */
headline(L(5) - 0.1, T.tres - 0.1, 'Lo destapó la *prensa*', Object.assign({ size: 92, hlT: T.nyt }, BL));
plano(L(5) - 0.1, T.tres - 0.1, { background: '#1f2a44', backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0 20px, transparent 20px 40px)' }, c => {
  const cam = CAM(c);
  const fe = chip(cam, 380, 380, '2004', { size: 80, bg: AMA_B, color: INK });
  const per = box(cam, 300, 520, 720, 560, { zIndex: 30, background: '#f4efe2', border: `7px solid ${INK}`, boxShadow: `14px 14px 0 ${INK}` }, `<div style="font-family:Rye;font-size:50px;text-align:center;border-bottom:6px double ${INK};padding:16px 0 8px;color:${INK}">The New York Times</div><div style="font-family:SpecialElite;font-size:26px;text-align:center;color:${INK};padding:6px">Nueva York · 2004</div><div style="font-family:Playfair;font-weight:900;font-size:72px;line-height:1.02;text-align:center;color:${INK};padding:16px 24px">Los botones<br>de los semáforos<br><span style="color:${RED}">no hacen nada</span></div>`);
  sp(T.m2004, 'pop2', 0.6); sp(L(5) - 0.05, 'whoosh', 0.8); sp(T.nyt + 0.3, 'paper', 0.8);
  return t => { zoom(cam, t, L(5), 3, 0.06); popA(fe, t, T.m2004, { r: -5 }); giraPeriodico(per, t, L(5) - 0.05); };
});
shakeAt(T.nyt + 0.3, 0.3, 10);

/* L5b · de 3.250 botones (rejilla de botoneras), más de 2.500 no hacían nada (se apagan con una X) */
headline(T.tres - 0.1, L(6) - 0.1, '*2.500* de pega', { size: 104, hlT: T.dosmil });
plano(T.tres - 0.1, L(6) - 0.1, PAPEL, c => {
  const cam = CAM(c);
  const N = 25, malos = new Set([0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 22, 23]);
  const bs = [...Array(N)].map((_, i) => { const b = BOTONERA(cam, 320 + (i % 5) * 140, 400 + Math.floor(i / 5) * 150, 90, 6); const x = el('div', b, { left: '0', top: '10px', width: '90px', textAlign: 'center', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '100px', color: RED, lineHeight: '110px', textShadow: `3px 3px 0 ${INK}` }, '✗'); return [b, x, i]; });
  const cn = texto(cam, 1170, '3.250', { size: 80, x: 320, w: 700, z: 20 });
  sp(T.tres, 'tada', 0.6); [...Array(10)].forEach((_, i) => sp(T.dosmil + i * 0.09, 'error', 0.25)); sp(T.nada5, 'stamp', 0.9);
  return t => {
    zoom(cam, t, T.tres, 4, 0.05);
    bs.forEach(([b, x, i]) => { const tb = T.tres + i * 0.03, tm = T.dosmil + [...malos].indexOf(i) * 0.05; set(b, { s: pop(t, tb, 0.3), o: t > tb ? 1 : 0 }); const m = malos.has(i) && t > tm; b.style.filter = m ? 'grayscale(1) brightness(.75)' : ''; set(x, { o: m ? 1 : 0 }); });
    const k = p(t, T.dosmil, 1, E.inOutCubic); cn.innerHTML = t < T.dosmil ? '3.250 botones' : `<span style="color:${RED}">${(Math.round(lerp(0, 2500, k) / 10) * 10).toLocaleString('es-ES')}</span> mudos`;
  };
});
shakeAt(T.nada5, 0.3, 12);

/* L6 · CTA (clip reutilizado) */
sigueme(6, 'En clase…', '¡no te lo cuentan!', 'sígueme');

/* L7 · el botón de cerrar puertas del ascensor tampoco suele ir: lo aporreas y las puertas ni se inmutan → es para dar tiempo a la silla de ruedas */
headline(L(7) - 0.1, L(8) - 0.1, 'El del *ascensor*', { size: 104, hlT: T.cerrar });
plano(L(7) - 0.1, L(8) - 0.1, { background: '#8a939c', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 4px, transparent 4px 26px)' }, c => {
  const cam = CAM(c);
  const pan = box(cam, 640, 420, 340, 640, { zIndex: 8, background: ACERO, border: `8px solid ${INK}`, borderRadius: '24px', boxShadow: `12px 12px 0 ${INK}` });
  [...Array(6)].forEach((_, i) => box(pan, 50 + (i % 2) * 130, 50 + Math.floor(i / 2) * 120, 100, 100, { background: '#e9edf1', border: `6px solid ${INK}`, borderRadius: '50%', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '52px', textAlign: 'center', lineHeight: '88px', color: INK }, String(6 - i)));
  const cer = box(pan, 50, 430, 230, 120, { background: '#fff', border: `7px solid ${INK}`, borderRadius: '60px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '64px', textAlign: 'center', lineHeight: '106px', color: INK }, '▶◀');
  const tu = PERS(cam, 300, 600, 380, { ropa: '#2b8ad6', pelo: 'corto' });
  const ma = MANO(cam, 700, 820, 160, -70);
  const cs = CLIC(cam);
  const ra = stamp(cam, 340, 1150, 'NO VA', { size: 100, z: 30 });
  const si = box(cam, 300, 760, 340, 300, { zIndex: 14 }, `<svg viewBox="0 0 340 300" width="340" height="300"><circle cx="130" cy="210" r="80" fill="none" stroke="${INK}" stroke-width="16"/><circle cx="130" cy="210" r="12" fill="${INK}"/><path d="M90,40 V150 H230 L260,260" stroke="${INK}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="270" cy="270" r="16" fill="${INK}"/></svg>`);
  const ok = chip(cam, 360, 1180, 'tiempo para entrar', { size: 52, bg: VERDEI });
  sp(T.eeuu, 'pop', 0.5); [...Array(6)].forEach((_, i) => sp(T.cerrar + i * 0.25, 'click', 0.55)); sp(T.tampoco, 'error', 0.6); sp(T.tampoco + 0.3, 'stamp', 0.9); sp(T.silla, 'ding', 0.8);
  return t => {
    zoom(cam, t, L(7), 4, 0.06);
    const on = t > T.cerrar && t < T.desact, k = on ? Math.max(0, Math.sin(t * 16)) : 0; set(ma, { x: -k * 30, y: -k * 20, o: t < T.desact ? 1 : 0 }); set(cer, { s: 1 - 0.1 * k });
    clics(cs, t, T.cerrar, 520, 760, on); set(tu, { o: t < T.desact ? 1 : 0 }); pFace(tu, t, { feliz: -0.6, ceja: 16, look: [14, 4], jaw: t > T.tampoco ? 0.7 : 0.1 });
    if (t < T.desact) stampA(ra, t, T.tampoco + 0.3, -8); else set(ra, { o: 0 });
    set(si, { o: t > T.desact ? 1 : 0, x: (1 - p(t, T.desact, 0.6, E.outCubic)) * -600 }); popA(ok, t, T.silla + 0.3, { r: -4 });
  };
});
shakeAt(T.tampoco + 0.3, 0.3, 12);

/* L8 · y el termostato de la oficina… de pega (le das la vuelta: detrás no hay ni un cable) */
headline(L(8) - 0.1, L(9) - 0.1, 'Termostato *de pega*', { size: 96, hlT: T.pega });
plano(L(8) - 0.1, L(9) - 0.1, { background: '#dfe7d8', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 2px, transparent 2px 120px)' }, c => {
  const cam = CAM(c);
  const te = box(cam, 600, 440, 360, 300, { zIndex: 8, background: '#f4f4f0', border: `9px solid ${INK}`, borderRadius: '30px', boxShadow: `12px 12px 0 ${INK}`, transformOrigin: '50% 50%' });
  const dis = box(te, 40, 40, 262, 120, { background: '#9fd3c0', border: `6px solid ${INK}`, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '84px', textAlign: 'center', lineHeight: '110px', color: INK }, '21°');
  const fl = [0, 1].map(i => box(te, 60 + i * 140, 190, 100, 70, { background: '#e9edf1', border: `5px solid ${INK}`, borderRadius: '14px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '50px', textAlign: 'center', lineHeight: '58px', color: INK }, i ? '+' : '−'));
  const back = box(te, 0, 0, 342, 282, { background: '#cfc6b0', borderRadius: '22px', fontFamily: 'Rye', fontSize: '60px', textAlign: 'center', lineHeight: '282px', color: INK, opacity: 0 }, 'vacío');
  const of = PERS(cam, 300, 620, 380, { ropa: '#7a5aa8', pelo: 'largo', pcol: '#c87a3a' });
  const ma = MANO(cam, 760, 640, 150, -80);
  const su = [sudor(cam, 340, 520), sudor(cam, 620, 560)];
  const pe = stamp(cam, 330, 1150, 'DE PEGA', { size: 110, z: 30 });
  sp(T.oficinas, 'pop', 0.5); sp(T.termostato, 'click', 0.7); sp(T.termostato + 0.4, 'click', 0.6); sp(T.pega, 'stamp', 1); sp(T.conectado, 'whoosh', 0.7);
  return t => {
    zoom(cam, t, L(8), 4, 0.07);
    const n = Math.floor(clamp((t - T.termostato) / 1.4) * 4); dis.textContent = (21 - n) + '°';
    const kf = p(t, T.conectado, 0.5, E.inOutCubic); set(te, { sx: Math.abs(Math.cos(kf * Math.PI)) }); const vuelta = kf > 0.5; back.style.opacity = vuelta ? 1 : 0; dis.style.visibility = vuelta ? 'hidden' : 'visible'; fl.forEach(f => f.style.visibility = vuelta ? 'hidden' : 'visible');
    set(ma, { o: t > T.termostato - 0.1 && t < T.conectado ? 1 : 0, y: Math.sin(t * 10) * 14 });
    pFace(of, t, { feliz: t > T.termostato + 0.3 && t < T.pega ? 1 : -0.6, ceja: t > T.pega ? 18 : 6, look: [14, -4], jaw: t > T.pega ? 0.8 : 0.1, closed: t > T.termostato + 0.3 && t < T.pega });
    su.forEach((s, i) => { const k = ((t + i * 0.5) * 0.9) % 1; set(s, { o: t < T.termostato ? 1 - k : 0, y: k * 120 }); });
    stampA(pe, t, T.pega, -8);
  };
});
shakeAt(T.pega, 0.3, 12);

/* L9 · [susurro] ¿por qué no los quitan? porque sí funcionan… contigo: el pulso se calma y esperas sin cruzar en rojo */
headline(L(9) - 0.1, L(10) - 0.1, 'Funcionan… *contigo*', Object.assign({ size: 96, hlT: T.contigo }, BL));
plano(L(9) - 0.1, L(10) - 0.1, NOCHE, c => {
  const cam = CAM(c);
  const se = SEMAFORO(cam, 860, 420, 820, 6);
  const tu = PERS(cam, 330, 560, 420, { ropa: '#2b8ad6', pelo: 'corto' });
  const bo = BOTONERA(cam, 720, 820, 150, 9);
  const ma = MANO(cam, 660, 900, 130, -60);
  const ecg = box(cam, 320, 1060, 520, 160, { zIndex: 12, background: '#0e2a14', border: `6px solid ${INK}`, borderRadius: '20px', overflow: 'hidden' }, `<svg viewBox="0 0 520 160" width="520" height="160"><path class="ln" d="" stroke="#5dff7a" stroke-width="6" fill="none"/></svg>`);
  const ln = ecg.querySelector('.ln');
  const ca = chip(cam, 360, 940, 'calma', { size: 56, bg: VERDEI });
  const ok = box(cam, 560, 420, 150, 150, { zIndex: 20 }, CHECK);
  const ri = texto(cam, 420, '?', { size: 220, color: '#f4efe2', x: 500, w: 200, z: 14, shadow: `6px 6px 0 ${INK}` });
  sp(T.quitan, 'boing', 0.5); sp(T.funcionan, 'ding', 0.7); sp(T.contigo, 'sparkle', 0.7); sp(T.calma, 'heart', 0.8); sp(T.rojo, 'stamp', 0.8);
  return t => {
    zoom(cam, t, L(9), 6, 0.08); luz(se, false);
    set(ri, { o: t < T.funcionan ? 1 : 0, r: Math.sin(t * 4) * 10 });
    const kc = p(t, T.calma, 1.2, E.inOutCubic); let d = 'M0,80'; for (let x = 0; x <= 520; x += 10) { const a = lerp(55, 12, kc); d += ` L${x},${f1(80 + Math.sin(x * 0.12 + t * 10) * a * (x % 60 < 20 ? 1 : 0.3))}`; } ln.setAttribute('d', d);
    set(ecg, { o: t > T.contigo ? 1 : 0 }); popA(ca, t, T.calma + 0.2, { r: -5 });
    const k = pulsa(bo, t, t > T.contigo && t < T.contigo + 0.6, 20); set(ma, { x: -k * 20, o: t > T.semaforo9 ? 1 : 0 });
    pFace(tu, t, { feliz: t > T.calma ? 1 : -0.3, closed: t > T.calma + 0.3, ceja: t > T.calma ? 4 : 12, look: [12, -4] });
    stampA(ok, t, T.rojo, -8);
  };
});

/* L10 · OJO: en muchas ciudades sí funcionan; depende del cruce (dos botoneras: ✔ y ✗) */
plano(L(10) - 0.1, L(11) - 0.1, PAPEL, c => {
  sello(c, 300, '¡OJO!', T.ojo, { size: 140 });
  const a = BOTONERA(c, 320, 560, 240), b = BOTONERA(c, 680, 560, 240);
  const si = box(c, 360, 960, 160, 160, { zIndex: 20 }, CHECK);
  const no = texto(c, 930, '✗', { size: 200, color: RED, x: 680, w: 240, z: 20, shadow: `5px 5px 0 ${INK}` });
  const de = chip(c, 380, 1200, 'depende del cruce', { size: 56, bg: '#2b3550' });
  return t => { pulsa(a, t, true, 9); pulsa(b, t, true, 9); set(si, { o: 1, s: 1 + 0.08 * Math.sin(t * 6) }); set(no, { r: Math.sin(t * 3) * 6 }); popA(de, t, T.cruce - 0.2, { r: -4 }); };
});
sp(T.cruce - 0.2, 'pop', 0.6);

/* L11 · O sea: toda la vida pulsando… un botón PLACEBO (la pastilla), solo para que no te pongas nervioso */
colorHit(L(11) - 0.1, L(12) - 0.1, YEL, c => {
  const tu = PERS(c, 300, 600, 400, { ropa: '#2b8ad6', pelo: 'corto' });
  const pi = box(c, 620, 520, 380, 190, { zIndex: 10, transformOrigin: '50% 50%' }, `<svg viewBox="0 0 380 190" width="380" height="190"><rect x="10" y="10" width="360" height="170" rx="85" fill="#fff" stroke="${INK}" stroke-width="10"/><path d="M190,10 V180" stroke="${INK}" stroke-width="8"/><path d="M185,10 H285 A85,85 0 0 1 285,180 H185 Z" fill="${RED}" stroke="${INK}" stroke-width="10"/><text x="100" y="112" text-anchor="middle" font-family="Bricolage" font-weight="800" font-size="40" fill="${INK}">BOTÓN</text></svg>`);
  const bo = BOCADILLO(c, 80, 380, '¡toda la vida<br>pulsando!', { size: 52 });
  const pl = stamp(c, 330, 1150, 'PLACEBO', { size: 120, z: 30 });
  const ma = MANO(c, 770, 640, 170, -40);
  return t => {
    const fr = t < T.nervioso; const k = fr ? Math.max(0, Math.sin(t * 16)) : 0; set(ma, { x: -k * 30, y: -k * 24 }); set(pi, { r: Math.sin(t * 3) * 8, s: 1 - 0.08 * k });
    pFace(tu, t, { feliz: fr ? -0.5 : 1, ceja: fr ? 16 : 2, look: [14, 0], jaw: fr ? 0.4 : 0, closed: !fr });
    popA(bo, t, T.vida, { r: -4 }); stampA(pl, t, T.nervioso, -6);
  };
});
sfx('swoosh_up', L(11), 0.6); [...Array(6)].forEach((_, i) => sp(T.pulsando + i * 0.2, 'click', 0.45)); sp(T.nervioso, 'stamp', 1); shakeAt(T.nervioso, 0.3, 12);

/* L12 · pregunta final (pícara) */
preguntaFinal('¿Cuántas veces le das', 'al botón, por si acaso?', { size: 78, draw: c => [['una, como la gente normal', YEL], ['diez, por si acaso', PINK], ['hasta que se pone verde', '#9fd3c0']].map(([s, col], i) => aparece(chip(c, 280 + i * 30, 640 + i * 160, s, { size: 46, bg: col, color: INK }), L(12) + 0.6 + i * 0.4, { sfx: 'pop' })) });

/* L13 · cierre */
cierre(83, 'Los botones de pega', ['BOTONES', 'de pega']);

Story.run({
  textura: true,
  ovalo: [[L(1) - 0.05, L(6) - 0.15], [L(7), L(12) - 0.15]],
  vecino: { risa: [[T.proposito, T.proposito + 1.0], [T.pega, T.pega + 1.0], [T.nervioso, T.nervioso + 1.0]], sorpresa: [[T.descon, T.descon + 0.8], [T.dosmil, T.dosmil + 0.8], [T.conectado, T.conectado + 0.8]], golpes: [T.nada0, T.proposito, T.descon + 0.4, T.nyt + 0.3, T.nada5, T.tampoco + 0.3, T.pega, T.nervioso] },
});
