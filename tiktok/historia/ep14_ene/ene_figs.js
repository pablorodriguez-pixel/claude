/* Ep. 14 · La Ñ nació para ahorrar — tiempos clave + figuras nuevas (grabado recortado de la serie) */

/* ---------- tiempos clave (todo por texto con find, nunca absolutos) ---------- */
const ws = i => W[i].s, wE = i => W[i].e;
const K = {};
{
  const i0 = find('la ene nacio'.replace('ene', 'eñe')); K.la0 = ws(i0); K.ene0 = ws(i0 + 1); K.nacio = ws(i0 + 2);
  const im = find('unos monjes querian ahorrar'); K.monjes = ws(im + 1); K.querian = ws(im + 2); K.ahorrar0 = ws(im + 3); K.L0e = wE(im + 3);
  const i1 = find('y en los noventa'); K.L1 = ws(i1); K.noventa = ws(i1 + 3);
  const ie = find('europa casi la saca', i1); K.europa1 = ws(ie); K.casi = ws(ie + 1); K.saca = ws(ie + 3);
  const it = find('de tu teclado', ie); K.tu = ws(it + 1); K.teclado1 = ws(it + 2); K.L1e = wE(it + 2);
  const i2 = find('edad media'); K.L2 = ws(i2); K.media = ws(i2 + 1);
  const il = find('los libros se copiaban a mano'); K.los = ws(il); K.libros = ws(il + 1); K.copiaban = ws(il + 3); K.mano = ws(il + 5);
  const ip = find('el pergamino era carisimo'); K.pergamino = ws(ip + 1); K.carisimo = ws(ip + 3); K.carisimoE = wE(ip + 3);
  const ia = find('asi que los copistas abreviaban'); K.asi = ws(ia); K.copistas = ws(ia + 3); K.abreviaban = ws(ia + 4);
  const itd = find('todo lo que podian', ia); K.todo = ws(itd); K.podian = ws(itd + 3); K.L2e = wE(itd + 3);
  const i3 = find('si una letra iba doble'); K.L3 = ws(i3); K.letra = ws(i3 + 2); K.doble1 = ws(i3 + 4);
  const isu = find('escribian solo una'); K.escribian = ws(isu); K.solo = ws(isu + 1); K.una = ws(isu + 2);
  const ir = find('con una rayita encima'); K.con = ws(ir); K.rayita = ws(ir + 2); K.encima = ws(ir + 3); K.encimaE = wE(ir + 3);
  const id = find('y la doble ene acabo'); K.y3 = ws(id); K.doble2 = ws(id + 2); K.ene2 = ws(id + 3); K.acabo = ws(id + 4);
  const iu = find('siendo una ene con sombrero', id); K.siendo = ws(iu); K.una2 = ws(iu + 1); K.ene3 = ws(iu + 2); K.con2 = ws(iu + 3); K.sombrero = ws(iu + 4);
  const iq = find('la eñe', iu); K.la3 = ws(iq); K.ene4 = ws(iq + 1); K.L3e = wE(iq + 1);
  const i4 = find('por eso ano'.replace('ano', 'año')); K.L4 = ws(i4); K.ano = ws(i4 + 2); K.viene = ws(i4 + 3); K.latin = ws(i4 + 5); K.annus = ws(i4 + 6);
  const icd = find('con dos enes'); K.con4 = ws(icd); K.dos = ws(icd + 1); K.enes = ws(icd + 2); K.L4e = wE(icd + 2);
  const i5 = find('y en mil novecientos'); K.L5 = ws(i5); K.mil = ws(i5 + 2); K.uno = ws(i5 + 6);
  const ide = find('desde europa se pidio'); K.desde = ws(ide); K.europa2 = ws(ide + 1); K.pidio = ws(ide + 3);
  const ies = find('en españa se pudieran'); K.espana1 = ws(ies + 1); K.vender = ws(ies + 4); K.teclados2 = ws(ies + 5); K.sin = ws(ies + 6); K.ene5 = ws(ies + 7); K.ene5e = wE(ies + 7);
  const isc = find('se monto un escandalo nacional'); K.se5 = ws(isc); K.monto = ws(isc + 1); K.escandalo = ws(isc + 3); K.nacional = ws(isc + 4); K.L5e = wE(isc + 4);
  const i6 = find('al final una norma obligo'); K.L6 = ws(i6); K.final = ws(i6 + 1); K.norma = ws(i6 + 3); K.obligo = ws(i6 + 4);
  const i6b = find('los teclados que se venden', i6); K.teclados3 = ws(i6b + 1); K.venden = ws(i6b + 4);
  const i6c = find('en españa la lleven', i6b); K.espana2 = ws(i6c + 1); K.lleven = ws(i6c + 3);
  const ih = find('hasta hoy'); K.hasta = ws(ih); K.hoy = ws(ih + 1); K.L6e = wE(ih + 1);
  const i7 = find('ojo esa rayita'); K.ojo = ws(i7); K.esa = ws(i7 + 1); K.rayita2 = ws(i7 + 2);
  const i7b = find('la usaban los copistas con muchas letras'); K.usaban = ws(i7b + 1); K.copistas2 = ws(i7b + 3); K.muchas = ws(i7b + 5); K.letras = ws(i7b + 6);
  const i7c = find('pero en castellano se quedo como letra propia'); K.pero = ws(i7c); K.castellano = ws(i7c + 2); K.quedo = ws(i7c + 4); K.letra7 = ws(i7c + 6); K.propia = ws(i7c + 7); K.L7e = wE(i7c + 7);
  const i8 = find('o sea la letra mas espanola'.replace('espanola', 'española')); K.L8 = ws(i8); K.sea = ws(i8 + 1); K.la8 = ws(i8 + 2); K.letra8 = ws(i8 + 3); K.mas = ws(i8 + 4); K.espanola = ws(i8 + 5);
  const iab = find('del abecedario', i8); K.abecedario = ws(iab + 1);
  const itr = find('es un truco para ahorrar tinta'); K.es = ws(itr); K.truco = ws(itr + 2); K.para = ws(itr + 3); K.ahorrar8 = ws(itr + 4); K.tinta = ws(itr + 5); K.tintaE = wE(itr + 5);
  const isb = find('lo sabias'); K.lo = ws(isb); K.sabias = ws(isb + 1);
  const isi = find('si o no', isb); K.si = ws(isi); K.noB = ws(isi + 2); K.L8e = wE(isi + 2);
  const is = find('soy tu vecino'); K.soy = ws(is); K.vecino = ws(is + 2); K.isoy = is;
  const iye = find('y esto no venia en el libro', is); K.iye = iye; K.L9b = ws(iye); K.esto = ws(iye + 1); K.noV = ws(iye + 2); K.enL = ws(iye + 4); K.libro = ws(iye + 6); K.END = wE(iye + 6);
}
const mid = (a, b) => (a + b) / 2;
/* cortes de escena */
const S = {
  A: [-1, mid(K.L0e, K.L1)], B: [mid(K.L0e, K.L1), mid(K.L1e, K.L2)],
  C: [mid(K.L1e, K.L2), K.asi - 0.03], C2: [K.asi - 0.03, mid(K.L2e, K.L3)],
  D1: [mid(K.L2e, K.L3), mid(K.encimaE, K.y3)], D2: [mid(K.encimaE, K.y3), mid(K.L3e, K.L4)],
  E: [mid(K.L3e, K.L4), mid(K.L4e, K.L5)], F1: [mid(K.L4e, K.L5), K.se5 - 0.12], F2: [K.se5 - 0.12, mid(K.L5e, K.L6)],
  G1: [mid(K.L5e, K.L6), K.hasta - 0.1], G2: [K.hasta - 0.1, K.ojo - 0.1], H: [K.ojo - 0.1, K.L8 - 0.1],
  I: [K.L8 - 0.1, K.soy - 0.1], C9: [K.soy - 0.1, K.enL - 0.04], L9: [K.enL - 0.04, 999],
};
const DUR = K.END + 0.6, LOOP = DUR - 0.4;

const STONE = '#D6C9AE', HABIT = '#6B4A32', HABIT2 = '#53382A', HAIRB = '#7A5A3A', EUB = '#2C4A9A', PIGC = '#F2B9C9';

/* ---------- TIPO / LETRA GIGANTE con cara + TILDE separable + CORONA (viewBox 0 0 300 470) ---------- */
const TILDE_D = 'M78,-58 C102,-104 136,-102 162,-80 C188,-58 214,-52 240,-98';
function tildeSvg(d = TILDE_D, w = 30) {
  return `<path d="${d}" stroke="${SH}" stroke-width="${w + 22}" fill="none" stroke-linecap="round" transform="translate(7,9)"/><path d="${d}" stroke="#fff" stroke-width="${w + 22}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${INK}" stroke-width="${w + 10}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#E8E2D4" stroke-width="${w - 4}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="url(#hA)" stroke-width="${w - 4}" fill="none" stroke-linecap="round" opacity=".55"/>`;
}
function crownSvg() { // viewBox 0 0 240 170 (centro x=120)
  const c = 'M20,150 L10,40 L66,96 L120,14 L174,96 L230,40 L220,150 Z';
  return cut(P(c), 5, 7) + D(c, '#F1C94A', 5) + HF(c, 'hA') + `<rect x="18" y="128" width="204" height="30" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="5"/><circle cx="120" cy="143" r="11" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="66" cy="143" r="8" fill="${PINK}" stroke="${INK}" stroke-width="3"/><circle cx="174" cy="143" r="8" fill="${PINK}" stroke="${INK}" stroke-width="3"/><circle cx="10" cy="36" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="120" cy="12" r="11" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="230" cy="36" r="10" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
}
function eneInner(ch = 'N', o = {}) {
  const id = uid('en');
  const front = 'M40,160 L250,160 L250,450 L40,450 Z', side = 'M250,160 L284,132 L284,422 L250,450 Z', top = 'M40,160 L74,132 L284,132 L250,160 Z';
  const fs = o.fs || 250;
  const glyph = a => `<text x="162" y="146" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="${fs}" ${a || ''}>${ch}</text>`;
  const armL = limb(46, 262, 2, 336, 12, 9), armR = limb(246, 262, 290, 336, 12, 9);
  let s = '';
  s += `<g class="armL">${cut(P(armL), 4, 6)}${D(armL, METAL2, 3.5)}${gloveHand(2, 342, 200, 0.62)}</g>`;
  s += `<g class="armR">${cut(P(armR), 4, 6)}${D(armR, METAL2, 3.5)}${gloveHand(290, 342, 160, 0.62)}</g>`;
  s += cut(P(front) + P(side) + P(top) + '<ellipse cx="100" cy="456" rx="40" ry="15"/><ellipse cx="196" cy="456" rx="40" ry="15"/>');
  s += `<ellipse cx="100" cy="456" rx="40" ry="15" fill="${INK}"/><ellipse cx="196" cy="456" rx="40" ry="15" fill="${INK}"/>`;
  s += D(side, METAL2, 4) + HF(side, 'hD') + D(top, METAL3, 4) + D(front, o.col || METAL, 4);
  s += clipG(id + 'f', front, `<rect x="196" y="150" width="70" height="310" fill="url(#hB)"/><rect x="30" y="398" width="240" height="60" fill="url(#hA)"/>`);
  s += `<path d="M40,404 H250 M40,418 H250" stroke="${INK}" stroke-width="3"/><path d="M58,178 V388" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>`;
  s += `<g transform="translate(7,9)" fill="${SH}">${glyph()}</g><g fill="#fff" stroke="#fff" stroke-width="18" stroke-linejoin="round">${glyph()}</g>`;
  s += glyph(`fill="${METAL3}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"`) + glyph(`fill="url(#hA)" opacity=".55"`);
  // tilde (sombrero) separable
  s += `<g class="tl">${tildeSvg()}</g>`;
  // corona
  s += `<g class="crown" style="opacity:0"><g transform="translate(70,-250) scale(0.75)">${crownSvg()}</g></g>`;
  // cara
  s += `<ellipse cx="112" cy="262" rx="21" ry="25" fill="#fff" stroke="${INK}" stroke-width="3.5"/><ellipse cx="182" cy="262" rx="21" ry="25" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
  s += `<g class="pup"><circle cx="114" cy="266" r="10" fill="${INK}"/><circle cx="180" cy="266" r="10" fill="${INK}"/><circle cx="110" cy="261" r="3.2" fill="#fff"/><circle cx="176" cy="261" r="3.2" fill="#fff"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="112" cy="262" rx="22" ry="26" fill="${METAL}" stroke="${INK}" stroke-width="3.5"/><ellipse cx="182" cy="262" rx="22" ry="26" fill="${METAL}" stroke="${INK}" stroke-width="3.5"/><path d="M92,264 q20,12 40,0 M162,264 q20,12 40,0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/></g>`;
  s += `<path class="browL" d="M88,222 q24,-14 46,-2" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/><path class="browR" d="M160,220 q24,-12 46,2" stroke="${INK}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  s += `<ellipse cx="80" cy="306" rx="16" ry="9" fill="${PINK}" opacity=".4"/><ellipse cx="214" cy="306" rx="16" ry="9" fill="${PINK}" opacity=".4"/>`;
  s += `<path class="smile" d="M118,314 Q147,340 176,314" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += `<g class="mOpen" style="opacity:0"><path d="M112,312 Q147,306 182,312 Q178,358 147,360 Q116,358 112,312 Z" fill="#160f0a" stroke="${INK}" stroke-width="4"/><ellipse cx="147" cy="347" rx="17" ry="7" fill="#7a1e2a"/><path d="M120,313 h54 v8 h-54 Z" fill="#fff"/></g>`;
  s += `<g class="sweat" style="opacity:0"><path d="M232,196 Q218,222 232,232 Q246,222 232,196 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
function mkEne(pa, b, ch = 'N', o = {}) {
  const f = mk(pa, b, eneInner(ch, o), '0 0 300 470', 'sort'); const q = s => f.d.querySelector(s);
  f.smile = q('.smile'); f.mOpen = q('.mOpen'); f.armL = q('.armL'); f.armR = q('.armR'); f.tl = q('.tl'); f.crown = q('.crown'); f.sweat = q('.sweat');
  if (o.noTilde) f.tl.style.opacity = 0;
  return f;
}
function eneFace(f, t, o = {}) {
  face(f, t, o);
  const k = clamp(o.open || 0);
  f.mOpen.style.opacity = k > 0.05 ? 1 : 0; f.smile.style.opacity = k > 0.05 ? 0 : 1;
  f.mOpen.setAttribute('transform', `translate(0,312) scale(1,${f1(Math.max(0.1, k) * 100) / 100}) translate(0,-312)`);
  f.armL.setAttribute('transform', `rotate(${f1(o.aL || 0)} 46 262)`); f.armR.setAttribute('transform', `rotate(${f1(-(o.aR || 0))} 246 262)`);
  f.sweat.style.opacity = o.sweat ? 1 : 0;
  // tilde: tl = {x,y,r,s,o}
  const tl = o.tl || {};
  f.tl.setAttribute('transform', `translate(${f1(tl.x || 0)} ${f1(tl.y || 0)}) rotate(${f1(tl.r || 0)} 160 -78) translate(160 -78) scale(${f1((tl.s == null ? 1 : tl.s) * 100) / 100}) translate(-160 78)`);
  if (tl.o != null) f.tl.style.opacity = tl.o;
  const cr = o.crown; f.crown.style.opacity = cr ? 1 : 0;
  if (cr) f.crown.setAttribute('transform', `translate(0 ${f1(cr.y || 0)}) rotate(${f1(cr.r || 0)} 160 -160)`);
}

/* ---------- MONJE COPISTA (busto con hábito y tonsura, viewBox 0 0 360 460) ---------- */
function monkInner(o = {}) {
  let s = bustInner({ uniform: 'farmer', seed: o.seed || 14 });
  const hoodB = 'M54,460 C40,360 76,300 128,300 L232,300 C284,300 320,360 306,460 Z';
  s = cut(P(hoodB)) + D(hoodB, HABIT2, 4) + HF(hoodB, 'hD') + s;
  const robe = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  const cowl = 'M104,318 C120,372 240,372 256,318 C286,334 300,372 276,404 C226,426 134,426 84,404 C60,372 74,334 104,318 Z';
  const robeS = D(robe, HABIT, 4) + `<path d="${robe}" fill="url(#hA)" opacity=".55"/><path d="M180,410 V460 M120,400 Q110,430 112,460 M240,400 Q250,430 248,460" stroke="${INK}" stroke-width="3" fill="none"/>` +
    D(cowl, '#7C5A3E', 4) + `<path d="${cowl}" fill="url(#hB)" opacity=".5"/><path d="M110,340 C140,390 220,390 250,340" stroke="${INK}" stroke-width="3" fill="none"/>` +
    `<path d="M150,420 q8,22 -4,40 M210,420 q-8,22 4,40" stroke="#E0C48A" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M150,420 q8,22 -4,40 M210,420 q-8,22 4,40" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="4 4"/>`;
  s = s.replace('<g class="jaw">', robeS + '<g class="jaw">');
  // tonsura: corona calva + flequillo-anillo
  const ring = 'M118,196 C112,166 132,148 180,148 C228,148 248,166 242,196 C232,178 210,170 180,170 C150,170 128,178 118,196 Z';
  let hairs = ''; for (let k = 0; k < 18; k++) { const x = 126 + k * 6.2; hairs += `M${f1(x)},${f1(158 + Math.abs(x - 180) * 0.12)}l2,${f1(10 - Math.abs(x - 180) * 0.05)}`; }
  const ton = D(ring, HAIRB, 3) + HF(ring, 'hA') + `<path d="${hairs}" stroke="${INK}" stroke-width="1.6"/><ellipse cx="166" cy="146" rx="22" ry="7" fill="#fff" opacity=".55"/><path d="M112,206 q-8,-4 -6,8 M248,206 q8,-4 6,8" stroke="${HAIRB}" stroke-width="10" stroke-linecap="round"/>`;
  s = s.replace('<path class="brow"', ton + '<path class="brow"');
  // gota de sudor
  s += `<g class="sweat" style="opacity:0"><path d="M252,150 Q238,174 252,184 Q266,174 252,150 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
function mkMonk(pa, b, o = {}) { const f = mk(pa, b, monkInner(o), '0 0 360 460', 'bust'); f.sweat = f.d.querySelector('.sweat'); return f; }
function monkFace(f, t, o = {}) { face(f, t, o); f.sweat.style.opacity = o.sweat ? 1 : 0; }

/* ---------- PLUMA (viewBox 0 0 120 360, punta abajo en 60,350) ---------- */
function quillSvg() {
  const v = 'M60,350 C40,250 20,120 70,10 C96,110 92,240 66,350 Z';
  let barbs = ''; for (let k = 0; k < 12; k++) { const y = 40 + k * 22; barbs += `M${f1(62 - k * 0.6)},${y + 18} L${f1(34 + k * 1.2)},${y} M${f1(64 - k * 0.6)},${y + 18} L${f1(86 - k * 1.8)},${y - 4}`; }
  return `<svg viewBox="0 0 120 360" width="100%" height="100%" style="overflow:visible">${cut(P(v), 4, 5)}${D(v, '#FBF6EA', 3)}<path d="${barbs}" stroke="${INK}" stroke-width="1.6"/><path d="M63,40 L60,350" stroke="${INK}" stroke-width="3"/><path d="M56,300 L60,352 L66,300 Z" fill="${INK}"/></svg>`;
}

/* ---------- TECLADO (HTML) — fila central termina en Ñ ---------- */
function mkKeyboard(pa, x, y, o = {}) {
  const k = o.k || 110, g = o.g || 14, pad = o.pad || 26;
  const rows = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM'], off = [0, 0.32, 0.86];
  const W0 = 10 * (k + g) - g + 0.32 * k + pad * 2 + (o.extra || 0), H0 = 3 * (k + g) - g + pad * 2 + 8;
  const wrap = box(pa, x, y, W0, H0, { zIndex: o.z || 6 });
  box(wrap, 0, 0, W0, H0, { background: '#3a2f28', border: `7px solid ${INK}`, borderRadius: '34px', boxShadow: `12px 14px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 3px, transparent 3px 11px)' });
  const keys = {}; let enie = null, slot = null;
  rows.forEach((r, ri) => [...r].forEach((ch, ci) => {
    const kx = pad + off[ri] * k + ci * (k + g), ky = pad + ri * (k + g);
    const isN = ch === 'Ñ';
    if (isN) slot = box(wrap, kx, ky, k, k, { background: '#120c08', borderRadius: '16px', boxShadow: `inset 0 6px 0 rgba(0,0,0,.6)`, border: `3px solid ${INK}` });
    const key = box(wrap, kx, ky - 6, k, k, { background: isN && o.hiN ? YEL : '#F4ECDB', border: `5px solid ${INK}`, borderRadius: '16px', boxShadow: `0 ${f1(k * 0.08)}px 0 ${INK}`, zIndex: isN ? 5 : 2,
      backgroundImage: 'linear-gradient(180deg, transparent 70%, rgba(43,33,24,.16) 70%)', fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(Math.round(k * (isN ? 0.56 : 0.46))), lineHeight: px(k - 14), textAlign: 'center', color: INK }, ch);
    keys[ch] = key; if (isN) enie = key;
  }));
  // cara de la tecla Ñ (aparece cuando sale volando)
  const kf = box(enie, k * 0.18, k * 0.62, k * 0.6, k * 0.3, { opacity: 0 });
  kf.innerHTML = `<svg viewBox="0 0 60 30" width="100%" height="100%" style="overflow:visible"><circle cx="16" cy="10" r="6" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="44" cy="10" r="6" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="16" cy="11" r="3" fill="${INK}"/><circle cx="44" cy="11" r="3" fill="${INK}"/><ellipse cx="30" cy="25" rx="6" ry="5" fill="#160f0a"/></svg>`;
  return { wrap, keys, enie, slot, kf, W: W0, H: H0, k, g, pad };
}

/* ---------- MÓVIL actual (HTML) ---------- */
function mkPhone(pa, x, y, w, h, o = {}) {
  const wrap = box(pa, x, y, w, h, { zIndex: o.z || 6 });
  box(wrap, 0, 0, w, h, { background: INK, borderRadius: '64px', border: `6px solid #fff`, boxShadow: `0 0 0 6px ${INK}, 14px 16px 0 ${SH}` });
  const scr = box(wrap, 22, 22, w - 44, h - 44, { background: '#F4ECDB', borderRadius: '46px', overflow: 'hidden' });
  box(scr, (w - 44) / 2 - 60, 14, 120, 30, { background: INK, borderRadius: '20px' });
  const field = box(scr, 26, 120, w - 96, 120, { background: '#fff', border: `5px solid ${INK}`, borderRadius: '30px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '76px', lineHeight: '106px', paddingLeft: '28px', color: INK, whiteSpace: 'nowrap' });
  const caret = el('span', null, {}); void caret;
  const kb = box(scr, 0, h - 44 - 360, w - 44, 360, { background: '#E2D6BC', borderTop: `5px solid ${INK}` });
  const rows = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM'], off = [0, 0.5, 1.5];
  const kw = (w - 44 - 20) / 10, keys = {};
  rows.forEach((r, ri) => [...r].forEach((ch, ci) => {
    const isN = ch === 'Ñ';
    keys[ch] = box(kb, 10 + (off[ri] * kw) + ci * kw + 3, 24 + ri * 100, kw - 6, 84, { background: isN ? YEL : '#FBF6EA', border: `3px solid ${INK}`, borderRadius: '12px', boxShadow: `0 4px 0 ${INK}`, fontFamily: 'Bricolage', fontWeight: 800, fontSize: px(isN ? 46 : 36), lineHeight: '78px', textAlign: 'center', color: INK, zIndex: isN ? 3 : 1 }, ch);
  }));
  return { wrap, scr, field, keys };
}

/* ---------- BANDERA EUROPEA de grabado (viewBox 0 0 420 330) ---------- */
function starPath(cx, cy, R, r = R * 0.42) { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); } return d + 'Z'; }
function euFlagInner() {
  const fl = 'M40,30 C150,10 250,50 400,26 L404,250 C260,276 150,232 40,256 Z';
  let st = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; st += `<path d="${starPath(222 + Math.cos(a) * 78, 140 + Math.sin(a) * 78, 17)}" fill="${YEL}" stroke="${INK}" stroke-width="2.5"/>`; }
  return cut(P(fl) + '<rect x="18" y="10" width="22" height="320"/>') + `<rect x="18" y="10" width="22" height="320" rx="6" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><circle cx="29" cy="8" r="14" fill="${BRASS}" stroke="${INK}" stroke-width="4"/>` +
    D(fl, EUB, 5) + `<path d="${fl}" fill="url(#hB)" opacity=".35"/><path d="M40,30 C150,10 250,50 400,26 L404,90 C260,110 150,70 40,96 Z" fill="#fff" opacity=".10"/>` + st;
}

/* ---------- HUCHA de cerdito (viewBox 0 0 420 330) ---------- */
function piggyInner() {
  const body = 'M60,190 C50,110 130,60 220,62 C320,64 372,120 370,190 C368,262 300,292 216,292 C120,292 68,262 60,190 Z';
  const snout = 'M352,160 C392,156 404,186 400,206 C396,232 362,236 350,222 Z';
  const ear = 'M142,92 L128,40 L188,74 Z', ear2 = 'M246,74 L292,36 L290,96 Z';
  const legs = [[110, 270], [160, 280], [260, 280], [310, 270]].map(([x, y]) => `M${x - 22},${y - 20} h44 v46 h-44 Z`).join(' ');
  let s = cut(P(body) + P(snout) + P(ear) + P(ear2) + `<path d="${legs}"/>` + '<path d="M62,180 q-40,-10 -30,-40 q10,-20 26,0"/>');
  s += `<path d="${legs}" fill="${PIGC}" stroke="${INK}" stroke-width="4"/><path d="M62,180 q-40,-10 -30,-40 q10,-20 26,0" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  s += D(ear, PIGC, 4) + D(ear2, PIGC, 4) + D(body, PIGC, 4) + clipG(uid('pg'), body, `<ellipse cx="300" cy="250" rx="120" ry="80" fill="url(#hA)" opacity=".7"/><ellipse cx="140" cy="270" rx="120" ry="40" fill="url(#hB)" opacity=".5"/>`);
  s += D(snout, '#F7CAD6', 4) + `<ellipse cx="372" cy="186" rx="5" ry="8" fill="${INK}"/><ellipse cx="388" cy="196" rx="5" ry="8" fill="${INK}"/>`;
  s += `<rect x="180" y="58" width="90" height="16" rx="8" fill="#160f0a" stroke="${INK}" stroke-width="3"/>`;
  s += `<circle cx="300" cy="142" r="15" fill="#fff" stroke="${INK}" stroke-width="3.5"/><g class="pup"><circle cx="304" cy="144" r="7" fill="${INK}"/></g><path d="M296,212 q16,14 34,4" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/><ellipse cx="318" cy="186" rx="16" ry="9" fill="${PINK}" opacity=".45"/>`;
  return s;
}
/* moneda medieval (viewBox 0 0 100 100) */
const coinSvg = () => `<svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible"><circle cx="54" cy="56" r="46" fill="${SH}"/><circle cx="50" cy="50" r="46" fill="#F1C94A" stroke="${INK}" stroke-width="5"/><circle cx="50" cy="50" r="46" fill="url(#hA)" opacity=".35"/><circle cx="50" cy="50" r="34" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="3 4"/><path d="M50,26 V74 M26,50 H74" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="36" cy="36" r="4" fill="${INK}"/><circle cx="64" cy="36" r="4" fill="${INK}"/><circle cx="36" cy="64" r="4" fill="${INK}"/><circle cx="64" cy="64" r="4" fill="${INK}"/><path d="M22,30 q8,-12 20,-14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/></svg>`;

/* ---------- TINTERO (viewBox 0 0 220 240) ---------- */
function inkwellInner() {
  const pot = 'M40,120 C30,180 50,226 110,228 C170,226 190,180 180,120 Z', neck = 'M74,96 H146 V124 H74 Z', lip = 'M60,84 H160 V100 H60 Z';
  return cut(P(pot) + P(neck) + P(lip)) + D(pot, '#3a2f28', 4) + HF(pot, 'hW') + `<path d="M58,150 q16,-20 34,-24" stroke="#fff" stroke-width="7" fill="none" opacity=".35" stroke-linecap="round"/>` + D(neck, '#3a2f28', 4) + D(lip, INK, 3) + `<ellipse cx="110" cy="86" rx="40" ry="8" fill="#0d0907"/>`;
}

/* ---------- PERGAMINO enrollado (viewBox 0 0 640 300) ---------- */
function scrollInner() {
  const sh = 'M70,40 H570 V260 H70 Z';
  let ln = ''; for (let y = 78; y < 236; y += 26) ln += `M100,${y}H${y % 52 ? 520 : 470}`;
  return cut(P(sh) + '<rect x="30" y="20" width="60" height="260" rx="30"/><rect x="550" y="20" width="60" height="260" rx="30"/>') +
    D(sh, '#F4E6C4', 4) + `<path d="${sh}" fill="url(#hP)" opacity=".5"/><path d="${ln}" stroke="${INK}" stroke-width="5" opacity=".35" stroke-linecap="round"/>` +
    `<rect x="30" y="20" width="60" height="260" rx="30" fill="#E8D3A6" stroke="${INK}" stroke-width="4"/><rect x="62" y="20" width="28" height="260" fill="url(#hA)" opacity=".6"/><rect x="550" y="20" width="60" height="260" rx="30" fill="#E8D3A6" stroke="${INK}" stroke-width="4"/><rect x="582" y="20" width="28" height="260" fill="url(#hA)" opacity=".6"/>`;
}
/* etiqueta de precio colgante (HTML) */
function priceTag(pa, x, y, txt, o = {}) {
  const d = box(pa, x, y, o.w || 420, o.h || 170, { zIndex: o.z || 30, transformOrigin: '0 50%' });
  d.innerHTML = `<svg width="${o.w || 420}" height="${o.h || 170}" style="overflow:visible"><path d="M-80,-30 Q-30,10 24,${(o.h || 170) / 2}" stroke="${INK}" stroke-width="4" fill="none"/>${cut(`<path d="M10,${(o.h || 170) / 2} L70,8 H${(o.w || 420) - 8} V${(o.h || 170) - 8} H70 Z"/>`)}<path d="M10,${(o.h || 170) / 2} L70,8 H${(o.w || 420) - 8} V${(o.h || 170) - 8} H70 Z" fill="${o.bg || '#FBF6EA'}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><circle cx="54" cy="${(o.h || 170) / 2}" r="12" fill="#fff" stroke="${INK}" stroke-width="5"/></svg>`;
  el('div', d, { left: '80px', top: '0', width: px((o.w || 420) - 96), height: px(o.h || 170), textAlign: 'center', fontFamily: 'Rye', fontSize: px(o.size || 60), lineHeight: px(o.h || 170), color: o.color || RED, whiteSpace: 'nowrap' }, txt);
  return d;
}

/* ---------- FONDO: scriptorium (piedra + ventana gótica) ---------- */
function scriptoriumBg(c) {
  sceneBg(c, { background: STONE, backgroundImage: `repeating-linear-gradient(0deg, rgba(43,33,24,.22) 0 3px, transparent 3px 96px), repeating-linear-gradient(90deg, rgba(43,33,24,.0) 0 0px, transparent 0 1080px)` });
  const L = box(c, 0, 0, 1080, 1920, { zIndex: 0 });
  let bl = ''; for (let r = 0; r < 20; r++) { const y = r * 96; for (let x = (r % 2) * 90 - 90; x < 1100; x += 180) bl += `M${x},${y}V${y + 96}`; }
  const arch = 'M360,980 V600 Q360,430 540,370 Q720,430 720,600 V980 Z';
  L.innerHTML = `<svg width="1080" height="1920" style="overflow:visible;position:absolute;left:0;top:0"><path d="${bl}" stroke="rgba(43,33,24,.22)" stroke-width="3"/>
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="34"/><path d="${arch}" fill="#F7E7A8" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hF)" opacity=".18"/>
    <path d="M540,380 V980 M360,700 H720" stroke="${INK}" stroke-width="12"/><circle cx="540" cy="540" r="70" fill="none" stroke="${INK}" stroke-width="10"/><path d="M470,540 H610 M540,470 V610" stroke="${INK}" stroke-width="6"/>
    <path d="M440,700 Q440,600 540,560 M640,700 Q640,600 540,560" stroke="${INK}" stroke-width="6" fill="none"/>
    <path d="M330,990 H750 V1020 H330 Z" fill="${FIG}" stroke="${INK}" stroke-width="5"/></svg>`;
  const beam = box(c, 0, 0, 1080, 1920, { zIndex: 1, background: 'linear-gradient(170deg, rgba(255,230,120,0) 30%, rgba(255,230,120,.22) 45%, rgba(255,230,120,0) 70%)' });
  return { L, beam };
}
/* atril / mesa con libro abierto (HTML+SVG) */
function deskSvg(w = 780) {
  const top = `M0,40 L${w},0 L${w},70 L0,110 Z`;
  return `<svg width="${w}" height="420" style="overflow:visible">${cut(P(top) + `<path d="M60,100 V420 H110 V100 Z M${w - 110},70 V420 H${w - 60} V70 Z"/>`)}<path d="M60,100 V420 H110 V100 Z M${w - 110},70 V420 H${w - 60} V70 Z" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>${D(top, WOOD, 5)}<path d="${top}" fill="url(#hW)" opacity=".35"/></svg>`;
}
/* periódico «escándalo» (HTML) */
function newsPaper(pa, x, y, w, h, seed, o = {}) {
  const pp = paperPiece(pa, x, y, w, h, { seed, bg: '#F4ECDA' });
  const iw = w - 18;
  el('div', pp.inner, { left: '0', top: px(h * 0.03), width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(h * 0.1), color: INK, whiteSpace: 'nowrap' }, o.title || 'EL DIARIO');
  box(pp.inner, iw * 0.05, h * 0.16, iw * 0.9, 4, { background: INK });
  el('div', pp.inner, { left: '0', top: px(h * 0.19), width: px(iw), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(h * 0.15), lineHeight: 1.0, color: INK }, o.head || 'LA Ñ, EN PELIGRO');
  let ln = ''; for (let yy = h * 0.58; yy < h - 30; yy += h * 0.05) ln += `<path d="M${f1(iw * 0.06)},${f1(yy)} H${f1(iw * (yy % 3 > 1.5 ? 0.9 : 0.75))}" stroke="${INK}" stroke-width="${f1(h * 0.016)}" opacity=".35"/>`;
  box(pp.inner, 0, 0, iw, h - 18).innerHTML = `<svg width="${iw}" height="${h - 18}">${ln}</svg>`;
  return pp;
}
/* signos */
const qMark2 = (pa, x, y, sz = 120, col = PINK, txt = '?') => el('div', pa, { left: px(x), top: px(y), fontFamily: 'Playfair', fontWeight: 900, fontSize: px(sz), color: col, textShadow: `5px 5px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`, zIndex: 40, whiteSpace: 'nowrap' }, txt);
const BIGT = (pa, x, y, w, html, css = {}) => el('div', pa, Object.assign({ left: px(x), top: px(y), width: px(w), textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, color: INK, lineHeight: 1, zIndex: 20 }, css), html);
const outl = (c = INK, w = 4, sh = 10) => `${sh}px ${sh}px 0 ${c}, -${w}px -${w}px 0 ${c}, ${w}px -${w}px 0 ${c}, -${w}px ${w}px 0 ${c}, ${w}px ${w}px 0 ${c}`;
