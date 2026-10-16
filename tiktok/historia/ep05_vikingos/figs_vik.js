/* Ep. 5 — Vikingos: figuras nuevas en estilo grabado (vikingo, cascos, cantantes, Doepler, objetos pop) */
const IRON = '#b3ad9f', BRONZE = '#d4ab55', HORN = '#efe3c4', CURT = '#9e1b22';

/* ---------- cuerno suelto (coordenadas del busto vikingo, lado izquierdo) ---------- */
const HORN_D = 'M138,196 C100,192 62,170 48,116 C42,90 50,62 62,44 C66,86 88,124 142,152 Z';
function hornG(cls, mirror) {
  let s = cut(P(HORN_D), 5, 7) + D(HORN_D, HORN, 3.5) + clipG(uid('hn'), HORN_D, `<path d="M40,40 L150,40 L150,200 L100,200 Z" fill="url(#hA)"/>`);
  s += `<path d="M126,150 q-10,18 -4,40 M104,134 q-14,16 -12,36 M84,114 q-16,10 -18,30 M70,90 q-14,4 -20,18" stroke="${INK}" stroke-width="2.6" fill="none"/>`;
  s += `<path d="M58,60 Q56,96 76,124" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/>`;
  return `<g class="${cls}">${mirror ? `<g transform="translate(420,0) scale(-1,1)">${s}</g>` : s}</g>`;
}

/* ---------------- VIKINGO (busto) viewBox 0 0 420 560 ---------------- */
function vikingInner(o = {}) {
  const id = uid('vk'), r = rng(o.seed || 31);
  const torso = 'M24,560 C30,476 96,430 166,420 L254,420 C324,430 390,476 396,560 Z';
  const fp = []; for (let i = 0; i < 40; i++) { const a = Math.PI + i / 39 * Math.PI; const rr = 1 + (i % 2 ? 0.1 : -0.02) + (r() - .5) * .06; fp.push([210 + Math.cos(a) * 196 * rr, 470 + Math.sin(a) * 66 * rr]); }
  for (let i = 0; i < 14; i++) { const x = 400 - i * 29; fp.push([x, 500 + (i % 2 ? 22 : 6)]); }
  const fur = smooth(fp);
  const upper = 'M138,300 C128,214 160,160 210,158 C260,160 292,214 282,300 Z';
  const beard = 'M128,284 L292,284 C304,356 278,442 210,492 C142,442 116,356 128,284 Z';
  const dome = 'M122,222 C120,128 162,92 210,92 C258,92 300,128 298,222 Z';
  const band = 'M114,204 L306,204 Q309,220 306,236 L114,236 Q111,220 114,204 Z';
  const nasal = 'M201,226 L219,226 L217,290 L203,290 Z';
  const axeH = limb(374, 560, 334, 238, 10, 9);
  const axeB = 'M300,226 C318,184 376,186 398,224 C382,262 340,276 312,258 Z';
  let sil = P(torso) + P(fur) + P(upper) + P(beard) + P(dome) + P(band) + '<circle cx="132" cy="262" r="15"/><circle cx="288" cy="262" r="15"/>';
  if (o.axe !== false) sil += P(axeH) + P(axeB);
  let s = cut(sil);
  // cuerpo: túnica + capa de piel
  s += D(torso, '#cdb894') + clipG(id + 't', torso, `<rect x="0" y="420" width="420" height="140" fill="url(#hA)"/><rect x="250" y="420" width="170" height="140" fill="url(#hD)"/>`);
  s += `<path d="M150,560 L170,470 M270,560 L250,470" stroke="${INK}" stroke-width="3"/>`;
  s += D(fur, '#a07a4c') + clipG(id + 'f', fur, `<rect x="0" y="390" width="420" height="140" fill="url(#hD)" opacity=".8"/>`);
  let fs = ''; for (let k = 0; k < 70; k++) { const a = Math.PI + r() * Math.PI, d = 0.55 + r() * 0.4; const x = 210 + Math.cos(a) * 190 * d, y = 474 + Math.sin(a) * 60 * d; fs += `M${f1(x)},${f1(y)}q${f1(r() * 6 - 3)},6 ${f1(r() * 8 - 4)},${f1(10 + r() * 8)}`; }
  s += `<path d="${fs}" stroke="${FIG}" stroke-width="2" fill="none" opacity=".7"/>`;
  // broche
  s += `<circle cx="300" cy="470" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M290,470 h20 M300,460 v20" stroke="${INK}" stroke-width="2"/>`;
  // hacha
  if (o.axe !== false) {
    s += D(axeH, WOOD) + HF(axeH, 'hD') + `<path d="M366,520 l-14,-4 M360,494 l-14,-4" stroke="${INK}" stroke-width="3"/>`;
    s += D(axeB, IRON) + clipG(id + 'ax', axeB, `<rect x="290" y="180" width="120" height="100" fill="url(#hA)"/>`) + `<path d="M306,232 C326,196 370,196 392,226" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>`;
    s += `<g transform="translate(346,410)">${cut('<ellipse cx="0" cy="0" rx="30" ry="26"/>', 4, 5)}<ellipse cx="0" cy="0" rx="30" ry="26" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M-22,-8 h44 M-24,4 h46 M-20,15 h38" stroke="${INK}" stroke-width="2.4"/><ellipse cx="6" cy="6" rx="22" ry="18" fill="url(#hA)"/></g>`;
  }
  // boca (hueco)
  s += `<rect x="156" y="286" width="108" height="50" fill="#160f0a"/><rect x="176" y="290" width="68" height="9" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
  // mandíbula = barba
  let jg = cut(P(beard), 3, 5) + D(beard, '#c49a62') + clipG(id + 'b', beard, `<rect x="110" y="280" width="200" height="220" fill="url(#hD)" opacity=".75"/><ellipse cx="262" cy="380" rx="44" ry="110" fill="url(#hA)"/>`);
  let st = ''; for (let k = 0; k < 34; k++) { const x0 = 140 + r() * 140, y0 = 300 + r() * 120; st += `M${f1(x0)},${f1(y0)}q${f1((210 - x0) * 0.1)},30 ${f1((210 - x0) * 0.18)},${f1(40 + r() * 30)}`; }
  jg += `<path d="${st}" stroke="${INK}" stroke-width="2" fill="none"/><path d="M184,306 q26,12 52,0" stroke="${INK}" stroke-width="3" fill="#7a1e2a"/>`;
  [194, 226].forEach(x => { let b = ''; for (let k = 0; k < 4; k++) b += `<ellipse cx="${x}" cy="${476 + k * 18}" rx="9" ry="11" fill="#c49a62" stroke="${INK}" stroke-width="2.5"/>`; jg += b + `<rect x="${x - 7}" y="${544}" width="14" height="8" fill="${BRASS}" stroke="${INK}" stroke-width="2"/>`; });
  s += `<g class="jaw">${jg}</g>`;
  // cabeza superior
  let ug = `<circle cx="132" cy="262" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="288" cy="262" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  ug += D(upper) + clipG(id + 'u', upper, `<ellipse cx="282" cy="250" rx="36" ry="80" fill="url(#hA)"/>`);
  ug += `<ellipse cx="180" cy="258" rx="15" ry="11" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="240" cy="258" rx="15" ry="11" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  ug += `<g class="pup"><circle cx="180" cy="259" r="6.5" fill="${INK}"/><circle cx="240" cy="259" r="6.5" fill="${INK}"/><circle cx="178" cy="257" r="2" fill="#fff"/><circle cx="238" cy="257" r="2" fill="#fff"/></g>`;
  ug += `<g class="lidH" style="opacity:0"><path d="M164,258 A16,12 0 0,1 196,258 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M224,258 A16,12 0 0,1 256,258 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/></g>`;
  ug += `<g class="lidC" style="opacity:0"><ellipse cx="180" cy="258" rx="16" ry="12" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><ellipse cx="240" cy="258" rx="16" ry="12" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M166,260 q14,7 28,0 M226,260 q14,7 28,0" stroke="${INK}" stroke-width="2.6" fill="none"/></g>`;
  ug += `<path class="browL" d="M154,236 Q178,236 200,248" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/><path class="browR" d="M266,236 Q242,236 220,248" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/>`;
  ug += `<path d="M210,250 C204,270 192,282 198,292 C206,298 218,298 226,290" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const mL = 'M210,284 C196,272 172,272 156,286 C146,296 134,302 124,294 C130,320 158,322 178,312 C192,304 202,300 210,302 Z';
  ug += `<path d="${mL}" fill="#c49a62" stroke="${INK}" stroke-width="2.5"/><path d="${mL}" fill="#c49a62" stroke="${INK}" stroke-width="2.5" transform="translate(420,0) scale(-1,1)"/><path d="M150,296 q20,-12 50,-8 M270,296 q-20,-12 -50,-8" stroke="${INK}" stroke-width="2" fill="none"/>`;
  // casco
  let hg = '';
  if (o.horns && !o.hornsSep) hg += hornG('hornL') + hornG('hornR', true);
  hg += cut(P(dome) + P(band), 5, 6) + D(dome, IRON) + clipG(id + 'h', dome, `<ellipse cx="270" cy="170" rx="50" ry="90" fill="url(#hA)"/><ellipse cx="160" cy="150" rx="30" ry="50" fill="url(#hF)" opacity=".5"/>`);
  hg += `<path d="M150,190 C150,140 176,112 200,104" stroke="#fff" stroke-width="5" fill="none" opacity=".55"/>`;
  hg += D('M202,94 L218,94 L220,206 L200,206 Z', '#9a9384') + D(band, '#9a9384') + HF(band, 'hD');
  let rv = ''; for (let x = 128; x < 300; x += 22) rv += `<circle cx="${x}" cy="220" r="4.5" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  for (let y = 112; y < 200; y += 24) rv += `<circle cx="210" cy="${y}" r="4" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  hg += rv + D(nasal, '#9a9384');
  ug += hg;
  s += `<g class="headg">${ug}</g>`;
  if (o.horns && o.hornsSep) s += hornG('hornL') + hornG('hornR', true);
  return s;
}

/* ---------------- CASCO DE GJERMUNDBU viewBox 0 0 400 340 ---------------- */
function gjermInner(o = {}) {
  const id = uid('gj');
  const dome = 'M66,236 C62,96 128,40 200,40 C272,40 338,96 334,236 Z';
  const band = 'M58,212 L342,212 L342,244 L58,244 Z';
  const spec = 'M96,240 L304,240 L300,274 C296,314 262,328 234,316 L212,304 L200,326 L188,304 L166,316 C138,328 104,314 100,274 Z';
  const holes = 'M122,272 a36,24 0 1,0 72,0 a36,24 0 1,0 -72,0 Z M206,272 a36,24 0 1,0 72,0 a36,24 0 1,0 -72,0 Z';
  let s = cut(P(dome) + P(band) + P(spec) + '<path d="M190,44 L200,14 L210,44 Z"/>');
  s += D(dome, IRON) + clipG(id + 'd', dome, `<ellipse cx="280" cy="170" rx="70" ry="140" fill="url(#hA)"/><ellipse cx="120" cy="120" rx="40" ry="60" fill="url(#hF)" opacity=".5"/><ellipse cx="150" cy="90" rx="30" ry="14" fill="rgba(120,60,20,.25)"/><ellipse cx="250" cy="180" rx="22" ry="12" fill="rgba(120,60,20,.25)"/><ellipse cx="110" cy="190" rx="18" ry="10" fill="rgba(120,60,20,.2)"/>`);
  s += `<path d="M96,180 C96,110 140,66 186,58" stroke="#fff" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/>`;
  s += D('M190,44 L200,14 L210,44 Z', '#9a9384') + D('M190,42 L210,42 L214,214 L186,214 Z', '#9a9384') + HF('M200,42 L210,42 L214,214 L200,214 Z', 'hD');
  s += D('M70,150 Q200,128 330,150 L332,166 Q200,144 68,166 Z', '#9a9384');
  s += D(band, '#9a9384') + HF(band, 'hD');
  let rv = ''; for (let x = 74; x < 340; x += 26) rv += `<circle cx="${x}" cy="228" r="5" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`; for (let y = 60; y < 210; y += 28) rv += `<circle cx="200" cy="${y}" r="4.5" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`;
  s += rv;
  // interior oscuro + ojos que asoman (opcional)
  s += `<path d="${holes}" fill="#160f0a"/>`;
  s += `<g class="peep" style="opacity:0"><ellipse cx="158" cy="274" rx="14" ry="10" fill="#fff" stroke="${INK}" stroke-width="2"/><ellipse cx="242" cy="274" rx="14" ry="10" fill="#fff" stroke="${INK}" stroke-width="2"/><g class="pup"><circle cx="160" cy="275" r="6" fill="${INK}"/><circle cx="244" cy="275" r="6" fill="${INK}"/></g></g>`;
  s += `<path d="${spec} ${holes}" fill="#9a9384" fill-rule="evenodd" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
  s += `<path d="${holes}" fill="none" stroke="${INK}" stroke-width="3"/><path d="M110,262 q10,-14 30,-18 M296,262 q-10,-14 -30,-18" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>`;
  return s;
}

/* ---------------- CASCO DE LA EDAD DEL BRONCE (tipo Veksø) viewBox 0 0 400 420 ---------------- */
function veksoInner(o = {}) {
  const id = uid('vx');
  const cap = 'M108,334 C104,222 150,172 200,172 C250,172 296,222 292,334 Z';
  const rim = 'M100,320 L300,320 L302,346 L98,346 Z';
  const hL = 'M142,240 C96,240 50,216 46,160 C42,110 68,68 102,36 C92,86 84,126 100,160 C110,182 128,192 152,198 Z';
  let horns = '';
  [false, true].forEach(m => {
    let h = D(hL, '#c99a3e') + clipG(uid('vh'), hL, `<rect x="40" y="30" width="130" height="220" fill="url(#hA)"/>`) + `<path d="M120,226 q-6,-24 6,-36 M90,212 q0,-24 14,-34 M64,186 q4,-22 22,-30 M54,150 q10,-18 28,-20 M62,110 q12,-12 28,-10" stroke="${INK}" stroke-width="2.4" fill="none"/><circle cx="102" cy="36" r="10" fill="${BRONZE}" stroke="${INK}" stroke-width="3"/>`;
    horns += m ? `<g transform="translate(400,0) scale(-1,1)">${h}</g>` : h;
  });
  let s = cut(P(cap) + P(rim) + P(hL) + `<path d="${hL}" transform="translate(400,0) scale(-1,1)"/><circle cx="102" cy="36" r="10"/><circle cx="298" cy="36" r="10"/>`);
  s += horns;
  s += D(cap, BRONZE) + clipG(id + 'c', cap, `<ellipse cx="270" cy="270" rx="60" ry="110" fill="url(#hA)"/>`) + `<path d="M132,280 C132,226 160,196 190,188" stroke="#fff" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/>`;
  s += D('M192,174 L208,174 L212,322 L188,322 Z', '#c99a3e');
  // cara ceremonial: ojos y pico
  s += `<circle cx="164" cy="268" r="20" fill="${BRONZE}" stroke="${INK}" stroke-width="3"/><circle cx="164" cy="268" r="9" fill="${INK}"/><circle cx="236" cy="268" r="20" fill="${BRONZE}" stroke="${INK}" stroke-width="3"/><circle cx="236" cy="268" r="9" fill="${INK}"/>`;
  s += D('M200,252 L186,292 L200,312 L214,292 Z', '#c99a3e');
  s += D(rim, '#c99a3e'); let rv = ''; for (let x = 112; x < 296; x += 22) rv += `<circle cx="${x}" cy="333" r="4" fill="${FIG}" stroke="${INK}" stroke-width="2"/>`; s += rv;
  return s;
}

/* ---------------- CANTANTE DE ÓPERA (figura entera) viewBox 0 0 300 640 ---------------- */
function singerInner(o = {}) {
  const id = uid('sg'), r = rng(o.seed || 61);
  const cape = 'M86,240 L214,240 L292,630 L8,630 Z';
  const robe = 'M104,250 L196,250 L250,630 L50,630 Z';
  const head = 'M104,180 C104,128 124,110 150,110 C176,110 196,128 196,180 C196,214 176,232 150,232 C124,232 104,214 104,180 Z';
  const beard = 'M108,192 L192,192 C196,240 178,282 150,298 C122,282 104,240 108,192 Z';
  const armL = limb(112, 270, 56, o.raise ? 150 : 330, 17, 13), armR = limb(188, 270, 244, 340, 17, 13);
  const dome = 'M98,150 C98,96 124,74 150,74 C176,74 202,96 202,150 Z';
  let sil = P(cape) + P(robe) + P(head) + P(armL) + P(armR) + P(dome) + (o.beard !== false ? P(beard) : '');
  let extra = '';
  // arma
  if (o.weapon === 'spear') { const sp = limb(56, 20, 56, 630, 6, 6); sil += P(sp) + '<path d="M40,40 L56,-16 L72,40 Z"/>'; extra += D(sp, WOOD) + D('M40,40 L56,-16 L72,40 Z', IRON); }
  if (o.weapon === 'sword') { const sw = limb(250, 340, 270, 120, 9, 6); sil += P(sw); extra += D(sw, IRON) + `<path d="M252,332 L268,130" stroke="#fff" stroke-width="2" opacity=".7"/><rect x="226" y="330" width="50" height="12" rx="4" fill="${BRASS}" stroke="${INK}" stroke-width="3" transform="rotate(5 250 336)"/>`; }
  // alas / cuernos
  const wingL = 'M104,128 C70,100 40,70 26,30 C56,46 72,60 84,72 C70,50 66,34 66,18 C90,44 104,80 112,112 Z';
  let hw = '';
  if (o.wings) { sil += P(wingL) + `<path d="${wingL}" transform="translate(300,0) scale(-1,1)"/>`; [0, 1].forEach(m => { const w0 = D(wingL, '#fff') + `<path d="M98,112 Q70,80 40,40 M104,100 Q84,70 70,34" stroke="${INK}" stroke-width="2" fill="none"/>`; hw += m ? `<g transform="translate(300,0) scale(-1,1)">${w0}</g>` : w0; }); }
  const hornS = 'M108,124 C84,120 62,104 56,74 C54,60 58,46 64,38 C66,64 80,88 112,104 Z';
  if (o.horns) { sil += P(hornS) + `<path d="${hornS}" transform="translate(300,0) scale(-1,1)"/>`; [0, 1].forEach(m => { const h0 = D(hornS, HORN) + `<path d="M98,110 q-6,10 -2,22 M80,96 q-10,8 -10,20" stroke="${INK}" stroke-width="2" fill="none"/>`; hw += m ? `<g transform="translate(300,0) scale(-1,1)">${h0}</g>` : h0; }); }
  let s = cut(sil);
  s += D(cape, o.capeCol || '#7a2a20') + HF(cape, 'hD');
  s += extra;
  s += D(robe, o.robeCol || '#d9c7a6') + clipG(id + 'r', robe, `<rect x="40" y="240" width="220" height="400" fill="url(#hA)" opacity=".8"/><rect x="160" y="240" width="100" height="400" fill="url(#hD)"/>`);
  s += `<path d="M110,330 H190" stroke="${INK}" stroke-width="12"/><path d="M110,330 H190" stroke="${BRASS}" stroke-width="6"/>`;
  s += D(armL, o.robeCol || '#d9c7a6') + HF(armL, 'hA') + D(armR, o.robeCol || '#d9c7a6') + HF(armR, 'hA');
  s += `<circle cx="${56}" cy="${o.raise ? 150 : 330}" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="244" cy="340" r="16" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  if (o.shield) s += `<g>${cut('<circle cx="250" cy="420" r="62"/>', 5, 6)}<circle cx="250" cy="420" r="62" fill="${WOOD}" stroke="${INK}" stroke-width="4"/><circle cx="250" cy="420" r="62" fill="url(#hW)" opacity=".5"/><circle cx="250" cy="420" r="18" fill="${IRON}" stroke="${INK}" stroke-width="3"/></g>`;
  s += D(head) + clipG(id + 'h', head, `<ellipse cx="190" cy="190" rx="22" ry="50" fill="url(#hA)"/>`);
  if (o.beard !== false) { s += D(beard, o.beardCol || '#d9d2c2') + clipG(id + 'b', beard, `<rect x="100" y="190" width="100" height="110" fill="url(#hD)" opacity=".6"/>`); }
  else s += `<path d="M112,180 C100,240 110,300 96,330 M188,180 C200,240 190,300 204,330" stroke="#c49a62" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse class="mouth" cx="150" cy="212" rx="12" ry="14" fill="#160f0a" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M124,172 q10,6 20,0 M156,172 q10,6 20,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M122,158 q12,-8 22,-2 M156,156 q12,-6 22,2" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M150,176 c-4,10 -8,14 -4,18 c4,2 8,2 10,-2" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  s += hw + D(dome, o.helmCol || IRON) + HF(dome, 'hA') + `<path d="M96,148 H204" stroke="${INK}" stroke-width="10"/><path d="M96,148 H204" stroke="${BRASS}" stroke-width="5"/>`;
  return s;
}

/* ---------------- DOEPLER (busto, bigote, pajarita, quevedos) ---------------- */
function doeplerInner() {
  let s = bustInner({ uniform: 'farmer', moustache: true, seed: 41 });
  const coat = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  s += `<path d="${coat}" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="${coat}" fill="url(#hW)" opacity=".25"/><path d="M146,330 L180,430 L214,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="M180,346 L150,330 L152,362 Z M180,346 L210,330 L208,362 Z" fill="${PINK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><rect x="172" y="338" width="16" height="16" rx="4" fill="${PINK}" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<path d="M146,330 L112,460 M214,330 L248,460" stroke="${FIG}" stroke-width="2" opacity=".5"/>`;
  // pelo: calvo arriba, patillas grises
  s += `<path d="M112,232 C104,180 116,150 134,140 C126,170 128,200 136,226 Z M248,232 C256,180 244,150 226,140 C234,170 232,200 224,226 Z" fill="#8a8072" stroke="${INK}" stroke-width="2.5"/>`;
  s += `<path d="M150,150 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`;
  // quevedos
  s += `<circle cx="156" cy="204" r="19" fill="rgba(255,255,255,.22)" stroke="${BRASS}" stroke-width="4.5"/><circle cx="204" cy="204" r="19" fill="rgba(255,255,255,.22)" stroke="${BRASS}" stroke-width="4.5"/><path d="M174,200 q6,-6 12,0" stroke="${BRASS}" stroke-width="4" fill="none"/><path d="M222,212 Q246,250 232,320" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  return s;
}

/* ---------------- CASCO DE FÚTBOL AMERICANO genérico con cuernos viewBox 0 0 440 340 ---------------- */
function fbInner() {
  const shell = 'M50,206 C48,94 140,32 236,32 C330,32 392,100 388,190 C386,236 368,262 334,276 L262,286 L248,246 L176,250 C160,300 112,312 80,294 C60,278 52,246 50,206 Z';
  const hornF = 'M150,90 C120,72 92,44 88,6 C110,26 132,40 164,52 Z';
  let s = cut(P(shell) + P(hornF));
  s += D(hornF, HORN) + `<path d="M140,80 q-12,-6 -16,-20 M120,60 q-10,-6 -14,-18" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += D(shell, RED) + clipG(uid('fb'), shell, `<ellipse cx="300" cy="220" rx="110" ry="110" fill="url(#hA)"/><path d="M60,120 C120,40 250,20 330,60" stroke="${FIG}" stroke-width="26" fill="none"/><path d="M60,120 C120,40 250,20 330,60" stroke="${INK}" stroke-width="2" fill="none" stroke-dasharray="2 10"/>`);
  s += `<path d="M110,140 C120,90 160,62 210,54" stroke="#fff" stroke-width="8" fill="none" opacity=".45" stroke-linecap="round"/>`;
  s += `<circle cx="196" cy="196" r="20" fill="#160f0a" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="M298,176 L426,182 M300,226 L426,232 M298,276 L420,280 M426,180 L420,282 M360,180 L356,280" stroke="${INK}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M298,176 L426,182 M300,226 L426,232 M298,276 L420,280 M426,180 L420,282 M360,180 L356,280" stroke="#e8e0cc" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return s;
}

/* ---------------- MAPA DE NORUEGA ---------------- */
const NOR = [[5.0, 59.3], [5.5, 58.9], [6.2, 58.3], [7.0, 58.0], [8.2, 58.2], [9.4, 58.9], [10.5, 59.3], [10.7, 59.9], [11.0, 59.1], [11.6, 58.9], [12.4, 60.1], [12.6, 61.0], [12.0, 61.8], [12.2, 63.0], [13.9, 64.1], [14.1, 65.1], [14.6, 66.0], [15.8, 66.6], [16.6, 67.5], [18.0, 68.4], [19.9, 68.4], [20.6, 69.0], [21.9, 69.3], [23.0, 68.8], [24.9, 68.6], [26.0, 69.7], [27.8, 70.0], [29.0, 69.8], [30.9, 69.6], [31.0, 70.3], [28.8, 70.9], [26.0, 71.1], [23.5, 70.8], [21.0, 70.3], [18.8, 70.0], [16.0, 69.2], [14.6, 68.4], [13.0, 67.6], [12.4, 66.6], [11.7, 65.6], [10.6, 64.6], [9.8, 63.9], [8.3, 63.4], [6.9, 62.9], [5.3, 62.3], [4.9, 61.6], [5.0, 60.6], [5.2, 59.8]];
const norPj = ([lo, la]) => [f1((lo - 4.5) * 56 * 0.47), f1((71.6 - la) * 56)];
function norwayInner() {
  const d = 'M' + NOR.map(q => norPj(q).join(',')).join('L') + 'Z', id = uid('no');
  let s = cut(P(d)) + D(d, FIG, 4) + clipG(id, d, `<rect x="0" y="0" width="760" height="800" fill="url(#hP)"/><rect x="0" y="0" width="760" height="800" fill="url(#hA)" opacity=".25"/>`);
  s += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  return s;
}

/* ---------------- telón rojo (una hoja) ---------------- */
function curtainHTML(w, h, flip) {
  let folds = ''; for (let x = 0; x < w; x += 46) folds += `<path d="M${x + 20},0 Q${x + (flip ? 40 : 4)},${h * 0.6} ${x + 22},${h}" stroke="rgba(0,0,0,.35)" stroke-width="14" fill="none"/><path d="M${x + 34},0 Q${x + 30},${h * 0.5} ${x + 36},${h}" stroke="rgba(255,255,255,.12)" stroke-width="5" fill="none"/>`;
  let fr = ''; for (let x = 6; x < w; x += 18) fr += `<path d="M${x},${h - 26} v22" stroke="${BRASS}" stroke-width="7"/>`;
  return `<svg width="${w}" height="${h}" style="overflow:visible"><rect width="${w}" height="${h}" fill="${CURT}" stroke="${INK}" stroke-width="6"/><rect width="${w}" height="${h}" fill="url(#hD)" opacity=".35"/>${folds}<rect x="0" y="${h - 34}" width="${w}" height="12" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>${fr}</svg>`;
}
