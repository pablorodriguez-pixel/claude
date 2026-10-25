/* v2 — figuras nuevas: La Vecina, emú frontal, mano gigante, silla, humillómetro, ministro, medallas, libro */
const LIP = '#B23A48', BRASS = '#C9A24A', WOOD = '#B9874F', ROUGE = 'rgba(255,62,165,.28)';

/* ---------------- EL VECINO (busto s. XIX) viewBox 0 0 420 520 ---------------- */
function gloveHand(cx, cy, rot = 0, sc = 1) {
  const palm = 'M-26,-8 C-30,18 -18,34 0,36 C20,34 30,18 26,-8 Z';
  const fing = [[-22, -8, -26, -46], [-8, -10, -9, -56], [6, -10, 8, -54], [19, -6, 22, -40]];
  let sil = P(palm), det = '';
  fing.forEach(f => { const d = limb(f[0], f[1], f[2], f[3], 8, 7); sil += P(d) + `<circle cx="${f[2]}" cy="${f[3]}" r="7"/>`; det += D(d, '#fff', 3) + `<circle cx="${f[2]}" cy="${f[3]}" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/>`; });
  const th = limb(-22, 14, -46, -4, 9, 7); sil += P(th);
  det = D(th, '#fff', 3) + det + D(palm, '#fff', 3) + `<path d="M-14,4 q14,8 28,0 M-10,16 q10,6 20,0" stroke="${INK}" stroke-width="1.6" fill="none"/><path d="M-26,24 h52" stroke="${INK}" stroke-width="2" stroke-dasharray="3 4"/>`;
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${sc})">${cut(sil, 4, 6)}${det}</g>`;
}
function vecinaInner(o = {}) {
  const id = uid('v'), r = rng(o.seed || 19);
  const torso = 'M24,520 C30,446 92,398 168,390 L252,390 C328,398 390,446 396,520 Z';
  const collar = 'M166,312 L254,312 L260,398 L160,398 Z';
  const upper = 'M132,270 C124,196 156,150 210,148 C264,150 296,196 288,270 Z';
  const jaw = 'M140,262 L280,262 C278,306 250,336 210,336 C170,336 142,306 140,262 Z';
  const hairF = 'M122,244 C108,168 150,122 210,120 C270,122 312,168 298,244 C292,208 274,186 248,176 C234,192 222,194 210,182 C198,194 186,192 172,176 C146,186 128,208 122,244 Z';
  const sil = P(torso) + P(collar) + P(upper) + P(jaw) + P(hairF) + '<ellipse cx="80" cy="452" rx="66" ry="58"/><ellipse cx="340" cy="452" rx="66" ry="58"/><ellipse cx="210" cy="138" rx="122" ry="22"/><path d="M140,140 C136,60 170,34 210,34 C250,34 284,60 280,140 Z"/><ellipse cx="128" cy="238" rx="12" ry="17"/><ellipse cx="292" cy="238" rx="12" ry="17"/>';
  let s = cut(sil);
  // cuerpo / vestido
  s += D(torso, '#d9c7a6') + clipG(id + 't', torso, `<rect x="0" y="380" width="420" height="140" fill="url(#hA)"/><rect x="250" y="380" width="170" height="140" fill="url(#hD)"/><path d="M60,520 Q120,440 170,400 M360,520 Q300,440 250,400" stroke="${INK}" stroke-width="2.5" fill="none"/>`);
  // mangas abullonadas
  [[80, 452], [340, 452]].forEach(([x, y], i) => {
    s += `<ellipse cx="${x}" cy="${y}" rx="66" ry="58" fill="#d9c7a6" stroke="${INK}" stroke-width="3"/>` + clipG(id + 'm' + i, `M${x - 66},${y}a66,58 0 1,0 132,0a66,58 0 1,0 -132,0`, `<rect x="${x - 70}" y="${y - 60}" width="140" height="120" fill="url(#hB)"/><rect x="${x - 10 + (i ? 10 : -40)}" y="${y - 60}" width="70" height="120" fill="url(#hD)"/>`);
    s += `<path d="M${x - 40},${y - 40} Q${x},${y - 10} ${x - 30},${y + 40} M${x},${y - 56} Q${x + 20},${y} ${x},${y + 56} M${x + 40},${y - 40} Q${x + 10},${y + 10} ${x + 34},${y + 40}" stroke="${INK}" stroke-width="2" fill="none"/>`;
  });
  // pajarita
  s += `<path d="M210,404 L172,386 L176,424 Z M210,404 L248,386 L244,424 Z" fill="${INK}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M180,394 l20,8 M240,394 l-20,8" stroke="#fff" stroke-width="1.5" opacity=".5"/><rect x="200" y="394" width="20" height="20" rx="4" fill="${INK}" stroke="#fff" stroke-width="1.5"/>`;
  // botones del chaleco
  s += `<circle cx="210" cy="450" r="6" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/><circle cx="210" cy="486" r="6" fill="${BRASS}" stroke="${INK}" stroke-width="2.5"/>`;
  // cuello alto de encaje
  s += D(collar, '#fff');
  let pl = ''; for (let x = 172; x < 256; x += 9) pl += `M${x},318 L${x - 1 + (x - 210) * 0.06},396`;
  s += `<path d="${pl}" stroke="${INK}" stroke-width="1.3" opacity=".7"/>`;
  let sca = 'M166,314'; for (let x = 166; x < 254; x += 11) sca += ` q5.5,-9 11,0`;
  s += `<path d="${sca}" stroke="${INK}" stroke-width="2.4" fill="#fff"/>`;
  s += `<path d="M162,396 L258,396" stroke="${INK}" stroke-width="3"/>`;
  // boca (hueco) + dientes
  s += `<rect x="158" y="258" width="104" height="58" fill="#160f0a"/><rect x="178" y="264" width="64" height="9" fill="#fff" stroke="${INK}" stroke-width="1.5"/><ellipse cx="210" cy="300" rx="22" ry="9" fill="#7a1e2a"/>`;
  // mandíbula
  let jg = cut(P(jaw), 3, 5) + D(jaw) + clipG(id + 'j', jaw, `<ellipse cx="270" cy="300" rx="44" ry="52" fill="url(#hA)"/>`);
  jg += `<path d="M186,272 Q210,288 234,272 Q210,280 186,272 Z" fill="#c98a74" stroke="${INK}" stroke-width="2"/><path d="M196,318 q14,6 28,0" stroke="${INK}" stroke-width="2.2" fill="none"/>`;
  s += `<g class="jaw">${jg}</g>`;
  // cabeza superior
  let ug = '';
  // orejas
  ug += `<ellipse cx="128" cy="238" rx="12" ry="17" fill="${FIG}" stroke="${INK}" stroke-width="3"/><ellipse cx="292" cy="238" rx="12" ry="17" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  ug += D(upper) + clipG(id + 'u', upper, `<ellipse cx="282" cy="226" rx="34" ry="80" fill="url(#hA)"/>`);
  // colorete + lunar
  
  // ojos
  ug += `<ellipse cx="180" cy="222" rx="15" ry="11.5" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="240" cy="222" rx="15" ry="11.5" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  ug += `<g class="pup"><circle cx="180" cy="223" r="6.5" fill="${INK}"/><circle cx="240" cy="223" r="6.5" fill="${INK}"/><circle cx="178" cy="221" r="2" fill="#fff"/><circle cx="238" cy="221" r="2" fill="#fff"/></g>`;
  
  ug += `<g class="lidH" style="opacity:0"><path d="M164,222 A16,12 0 0,1 196,222 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M224,222 A16,12 0 0,1 256,222 Z" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/></g>`;
  ug += `<g class="lidC" style="opacity:0"><ellipse cx="180" cy="222" rx="16" ry="12.5" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><ellipse cx="240" cy="222" rx="16" ry="12.5" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M166,224 q14,7 28,0 M226,224 q14,7 28,0" stroke="${INK}" stroke-width="2.6" fill="none"/></g>`;
  ug += `<path class="browL" d="M160,198 q20,-12 38,-2" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/><path class="browR" d="M222,196 q20,-10 38,2" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  ug += `<path d="M212,214 C208,232 200,242 204,248 C210,252 218,251 222,246" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  ug += `<path d="M210,252 C196,246 176,250 162,262 C150,272 142,268 140,258 C142,276 160,282 178,274 C192,268 202,262 210,262 C218,262 228,268 242,274 C260,282 278,276 280,258 C278,268 270,272 258,262 C244,250 224,246 210,252 Z" fill="${INK}" stroke="${INK}" stroke-width="2"/><path d="M170,262 q12,-6 30,-4 M250,262 q-12,-6 -30,-4" stroke="#fff" stroke-width="1.6" opacity=".45" fill="none"/>`;
  // pelo delantero (raya al medio)
  ug += D(hairF) + clipG(id + 'hf', hairF, `<rect x="100" y="110" width="220" height="140" fill="url(#hD)"/>`);
  ug += `<path d="M210,124 L210,182 M150,160 Q170,140 200,130 M270,160 Q250,140 220,130 M134,210 Q146,178 172,164 M286,210 Q274,178 248,164" stroke="${FIG}" stroke-width="2.6" fill="none" opacity=".8"/>`;
  // bombín
  const crown = 'M140,140 C136,60 170,34 210,34 C250,34 284,60 280,140 Z';
  ug += D(crown, '#3a2f26') + clipG(id + 'hat', crown, `<rect x="130" y="30" width="160" height="112" fill="url(#hD)"/>`) + `<path d="M142,124 Q210,112 278,124 L280,140 Q210,128 140,140 Z" fill="${PINK}" stroke="${INK}" stroke-width="3"/>`;
  ug += `<ellipse cx="210" cy="140" rx="122" ry="22" fill="#3a2f26" stroke="${INK}" stroke-width="3"/><path d="M98,140 Q210,170 322,140" stroke="#fff" stroke-width="2" opacity=".35" fill="none"/><path d="M172,52 Q200,40 236,48" stroke="#fff" stroke-width="3" opacity=".35" fill="none"/>`;
  // patillas
  ug += `<path d="M126,206 C124,232 128,250 136,262 L144,250 C138,236 138,220 140,206 Z M294,206 C296,232 292,250 284,262 L276,250 C282,236 282,220 280,206 Z" fill="#6b5a4a" stroke="${INK}" stroke-width="2.4"/>`;
  s += `<g class="headg">${ug}</g>`;
  // taza de té (mano izquierda del espectador)
  const cupD = 'M-38,-30 L38,-30 C36,4 22,20 0,20 C-22,20 -36,4 -38,-30 Z';
  let cg = `<ellipse cx="0" cy="24" rx="56" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M38,-20 c22,-4 24,24 2,22" stroke="${INK}" stroke-width="5" fill="none"/><path d="M38,-20 c22,-4 24,24 2,22" stroke="#fff" stroke-width="2" fill="none"/>`;
  cg += D(cupD, '#fff') + `<path d="M-34,-18 H34" stroke="${PINK}" stroke-width="5"/><path d="M-30,-8 q8,6 16,0 q8,-6 16,0 q8,6 16,0" stroke="${INK}" stroke-width="1.5" fill="none"/><ellipse cx="0" cy="-30" rx="38" ry="7" fill="#8a5a30" stroke="${INK}" stroke-width="3"/>`;
  cg += `<g class="steam"><path d="M-12,-44 q-10,-14 0,-28 q10,-14 0,-28 M12,-44 q-10,-14 0,-28 q10,-14 0,-28" stroke="${INK}" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/></g>`;
  cg += gloveHand(-6, 44, 180, 0.8);
  s += `<g class="cup" transform="translate(96,468)">${cut('<ellipse cx="0" cy="24" rx="56" ry="12"/>' + P(cupD), 4, 6)}${cg}</g>`;
  // abanico (mano derecha del espectador) — pivote 340,480
  const R = 150, a0 = -128, a1 = -42, N = 9, px = 340, py = 480; const rad = Math.PI / 180;
  let fanSil = `M${px},${py}`; let pleats = '', ribs = '', edge = '';
  for (let k = 0; k <= N; k++) { const a = (a0 + (a1 - a0) * k / N) * rad; fanSil += `L${f1(px + Math.cos(a) * R)},${f1(py + Math.sin(a) * R)}`; }
  fanSil += 'Z';
  for (let k = 0; k < N; k++) {
    const aa = (a0 + (a1 - a0) * k / N) * rad, ab = (a0 + (a1 - a0) * (k + 1) / N) * rad;
    pleats += `<path d="M${px},${py} L${f1(px + Math.cos(aa) * R)},${f1(py + Math.sin(aa) * R)} L${f1(px + Math.cos(ab) * R)},${f1(py + Math.sin(ab) * R)} Z" fill="${k % 2 ? '#FFC2DF' : FIG}" stroke="${INK}" stroke-width="2"/>`;
    ribs += `M${px},${py}L${f1(px + Math.cos(aa) * (R - 4))},${f1(py + Math.sin(aa) * (R - 4))}`;
    const am = (aa + ab) / 2; edge += `<circle cx="${f1(px + Math.cos(am) * R)}" cy="${f1(py + Math.sin(am) * R)}" r="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  }
  let fan = cut(P(fanSil), 5, 7) + edge + pleats + `<path d="${ribs}" stroke="${INK}" stroke-width="1.5"/>`;
  fan += `<path d="M${px},${py} m${f1(Math.cos(-85 * rad) * 70)},${f1(Math.sin(-85 * rad) * 70)}" />`;
  fan += `<path d="M${f1(px + Math.cos(a0 * rad) * 80)},${f1(py + Math.sin(a0 * rad) * 80)} A80,80 0 0,1 ${f1(px + Math.cos(a1 * rad) * 80)},${f1(py + Math.sin(a1 * rad) * 80)}" stroke="${PINK}" stroke-width="7" fill="none"/>`;
  fan += gloveHand(px, py + 8, 10, 0.85);
  s += `<g class="fan">${fan}</g>`;
  // mano en la boca (risa)
  s += `<g class="hMouth" style="opacity:0">${gloveHand(206, 318, 0, 1.05)}</g>`;
  // manos en los ojos (vergüenza ajena)
  s += `<g class="hEyes" style="opacity:0">${gloveHand(172, 262, -8, 1.15)}${gloveHand(250, 262, 8, 1.15)}</g>`;
  return s;
}

/* ---------------- EMÚ FRONTAL (mirada a cámara) viewBox 0 0 400 600 ---------------- */
function emuFrontInner() {
  const r = rng(808), id = uid('ef');
  const neck = 'M156,300 C148,400 138,500 124,620 L276,620 C262,500 252,400 244,300 Z';
  const pts = []; const N = 48;
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, rr = 1 + (r() - .5) * .08 + (i % 2 ? 0.03 : 0); pts.push([200 + Math.cos(a) * 118 * rr, 222 + Math.sin(a) * 104 * rr]); }
  const head = smooth(pts);
  const beak = 'M150,270 Q200,246 250,270 Q248,296 200,306 Q152,296 150,270 Z';
  const jaw = 'M158,292 Q200,312 242,292 Q236,322 200,330 Q164,322 158,292 Z';
  let s = cut(P(neck) + P(head) + P(beak) + P(jaw));
  s += D(neck) + clipG(id + 'n', neck, `<rect x="200" y="290" width="100" height="340" fill="url(#hF)"/><rect x="110" y="300" width="60" height="320" fill="url(#hA)"/>`);
  let tf = ''; for (let k = 0; k < 40; k++) { const y = 320 + r() * 280, x = 150 + r() * 100; tf += `M${f1(x)},${f1(y)}q2,7 ${f1(3 + r() * 4)},${f1(10 + r() * 6)}`; }
  s += `<path d="${tf}" stroke="${INK}" stroke-width="1.8" fill="none"/>`;
  s += D(head) + clipG(id + 'h', head, `<ellipse cx="290" cy="270" rx="70" ry="90" fill="url(#hA)"/><ellipse cx="110" cy="290" rx="50" ry="60" fill="url(#hB)"/>`);
  let fz = ''; for (let k = 0; k < 70; k++) { const a = r() * 6.28, d = r() * 0.95; const x = 200 + Math.cos(a) * 110 * d, y = 222 + Math.sin(a) * 96 * d; if (y > 180 && y < 250 && Math.abs(x - 200) < 90) continue; fz += `M${f1(x)},${f1(y)}q1,6 ${f1(2 + r() * 3)},${f1(8 + r() * 5)}`; }
  s += `<path d="${fz}" stroke="${INK}" stroke-width="1.7" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M150,124 l-8,-20 M168,116 l-4,-22 M186,112 l-1,-24 M204,112 l2,-24 M222,114 l5,-22 M240,120 l8,-20 M256,128 l11,-16" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  // ojos
  s += `<circle cx="152" cy="214" r="31" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="248" cy="214" r="31" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`;
  s += `<g class="pup"><circle cx="154" cy="218" r="14" fill="${INK}"/><circle cx="246" cy="218" r="14" fill="${INK}"/><circle cx="149" cy="212" r="4.5" fill="#fff"/><circle cx="241" cy="212" r="4.5" fill="#fff"/></g>`;
  s += `<g class="lidH"><path d="M120,212 A32,32 0 0,1 184,212 Z" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><path d="M216,212 A32,32 0 0,1 280,212 Z" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><path d="M124,206 h56 M220,206 h56" stroke="${INK}" stroke-width="1.5" opacity=".5"/></g>`;
  s += `<g class="lidC" style="opacity:0"><circle cx="152" cy="214" r="32" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><circle cx="248" cy="214" r="32" fill="${FIG}" stroke="${INK}" stroke-width="3.5"/><path d="M124,218 q28,12 56,0 M220,218 q28,12 56,0" stroke="${INK}" stroke-width="3.5" fill="none"/></g>`;
  s += `<path class="browL" d="M118,172 q34,-8 66,4" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/><path class="browR" d="M216,174 q34,-14 66,-4" stroke="${INK}" stroke-width="8" stroke-linecap="round" fill="none"/>`;
  // pico frontal + mandíbula
  s += `<path d="M160,292 Q200,330 240,292 Z" fill="#160f0a"/>`;
  s += `<g class="jaw">${D(jaw)}<path d="M176,308 q24,10 48,0" stroke="${INK}" stroke-width="1.6" fill="none"/></g>`;
  s += D(beak) + `<path d="M200,252 L200,300" stroke="${INK}" stroke-width="2"/><ellipse cx="186" cy="272" rx="4" ry="2.5" fill="${INK}"/><ellipse cx="214" cy="272" rx="4" ry="2.5" fill="${INK}"/><path d="M160,284 Q200,298 240,284" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  return s;
}

/* ---------------- MANO GIGANTE (Monty Python) viewBox 0 0 400 900 ---------------- */
function handInner() {
  const sleeve = 'M118,-400 L282,-400 L292,560 L108,560 Z', cuff = 'M100,540 L300,540 L306,610 L94,610 Z';
  const palm = 'M110,606 C96,690 118,760 160,800 L250,806 C292,770 304,700 290,606 Z';
  const idx = limb(214, 790, 206, 888, 19, 15), th = limb(160, 760, 188, 880, 20, 15);
  const f2 = 'M226,800 C250,820 262,846 248,866 C236,872 228,860 224,840 Z', f3 = 'M246,786 C272,804 284,830 272,850 C260,856 252,844 248,826 Z';
  let s = cut([sleeve, cuff, palm, idx, th, f2, f3].map(P).join('') + '<circle cx="206" cy="888" r="15"/><circle cx="188" cy="880" r="15"/>');
  s += D(sleeve, '#3a2a1e') + clipG(uid('sl'), sleeve, `<rect x="100" y="-400" width="200" height="960" fill="url(#hW)" opacity=".4"/><rect x="230" y="-400" width="70" height="960" fill="url(#hD)"/>`);
  s += `<path d="M120,520 h170" stroke="${BRASS}" stroke-width="5"/>`;
  s += D(cuff, '#fff') + `<circle cx="270" cy="576" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M100,560 H302" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 5"/>`;
  s += D(f3) + D(f2) + D(palm) + clipG(uid('pl'), palm, `<ellipse cx="270" cy="710" rx="40" ry="110" fill="url(#hA)"/>`);
  s += `<path d="M150,700 q40,26 90,10 M160,740 q30,16 60,6" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += D(th) + `<circle cx="188" cy="880" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/>` + D(idx) + `<circle cx="206" cy="888" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += `<path d="M196,830 q10,4 20,0 M178,820 q8,6 18,2" stroke="${INK}" stroke-width="2" fill="none"/>`;
  return s;
}

/* ---------------- SILLA VICTORIANA viewBox 0 0 300 400 ---------------- */
function chairInner() {
  const back = 'M70,20 C70,-6 230,-6 230,20 L240,200 L60,200 Z', seat = 'M30,196 L270,196 L282,250 L18,250 Z', apr = 'M24,250 L276,250 L270,282 L30,282 Z';
  const l1 = 'M40,280 Q30,340 44,392 L60,392 Q54,340 62,280 Z', l2 = 'M260,280 Q270,340 256,392 L240,392 Q246,340 238,280 Z';
  const a1 = 'M30,200 C10,160 30,120 70,120 L70,140 C44,144 40,170 50,200 Z', a2 = 'M270,200 C290,160 270,120 230,120 L230,140 C256,144 260,170 250,200 Z';
  let s = cut([back, seat, apr, l1, l2, a1, a2].map(P).join(''));
  s += D(l1, WOOD) + HF(l1, 'hD') + D(l2, WOOD) + HF(l2, 'hD');
  s += D(back, '#E7A3C4') + clipG(uid('cb'), back, `<rect x="40" y="-20" width="220" height="240" fill="url(#hA)" opacity=".5"/>`);
  let tufts = ''; for (let y = 40; y < 190; y += 44) for (let x = 100; x < 210; x += 50) tufts += `<circle cx="${x + ((y / 44) % 2 ? 25 : 0)}" cy="${y}" r="5" fill="${INK}"/>`;
  s += tufts + `<path d="M76,26 C76,4 224,4 224,26" stroke="${BRASS}" stroke-width="6" fill="none"/>`;
  s += D(a1, WOOD) + HF(a1, 'hB') + D(a2, WOOD) + HF(a2, 'hB');
  s += D(seat, '#E7A3C4') + HF(seat, 'hB') + D(apr, WOOD) + HF(apr, 'hA');
  s += `<path d="M40,266 Q150,240 260,266" stroke="${BRASS}" stroke-width="4" fill="none"/>`;
  return s;
}

/* ---------------- HUMILLÓMETRO viewBox 0 0 320 860 ---------------- */
const HUM_LV = [{ y: 720, t: 'Leve' }, { y: 590, t: 'Bochorno' }, { y: 460, t: 'Ridículo' }, { y: 330, t: 'Vergüenza|ajena' }, { y: 196, t: 'HUMILLACIÓN|NACIONAL' }];
function meterInner() {
  const board = 'M24,120 Q24,86 58,86 L262,86 Q296,86 296,120 L296,812 Q296,846 262,846 L58,846 Q24,846 24,812 Z';
  let s = cut(P(board) + '<rect x="-6" y="0" width="332" height="92" rx="16"/>');
  s += D(board, WOOD) + clipG(uid('wd'), board, `<rect x="0" y="80" width="320" height="780" fill="url(#hW)" opacity=".35"/><path d="M40,90 Q60,400 44,846 M120,90 Q100,460 128,846 M210,90 Q230,500 206,846 M270,90 Q256,420 276,846" stroke="${INK}" stroke-width="2" fill="none" opacity=".45"/>`);
  s += `<rect x="38" y="100" width="244" height="732" rx="18" fill="none" stroke="${BRASS}" stroke-width="5"/>`;
  // placa título
  s += `<rect x="-6" y="0" width="332" height="92" rx="16" fill="${INK}" stroke="${INK}" stroke-width="4"/><rect x="4" y="10" width="312" height="72" rx="10" fill="none" stroke="${BRASS}" stroke-width="3"/><text x="160" y="58" text-anchor="middle" font-family="Rye" font-size="31" fill="${YEL}">HUMILLÓMETRO</text>`;
  // campana
  s += `<g class="bell"><path d="M40,150 Q40,112 70,112 Q100,112 100,150 L106,166 L34,166 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><path d="M50,150 Q52,124 70,122" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><circle cx="70" cy="172" r="7" fill="${INK}"/><path d="M70,108 v-8" stroke="${INK}" stroke-width="4"/></g>`;
  // tubo
  s += `<rect x="54" y="180" width="32" height="600" rx="16" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/>`;
  s += `<clipPath id="liqC"><rect x="58" y="184" width="24" height="600" rx="12"/></clipPath><g clip-path="url(#liqC)"><rect class="liq" x="58" y="700" width="24" height="200" fill="${RED}"/><rect class="liq2" x="62" y="700" width="6" height="200" fill="#ff8a9a"/></g>`;
  s += `<circle cx="70" cy="796" r="34" fill="${RED}" stroke="${INK}" stroke-width="4"/><circle cx="60" cy="786" r="9" fill="#ff8a9a"/>`;
  // escala
  HUM_LV.forEach((l, i) => {
    const two = l.t.includes('|'), [a, b] = l.t.split('|'), big = i === 4;
    s += `<rect class="lvhl" x="100" y="${l.y - 38}" width="${big ? 196 : 180}" height="${two ? 74 : 50}" rx="8" fill="${YEL}" stroke="${INK}" stroke-width="3" style="opacity:0"/>`;
    s += `<path d="M86,${l.y} h18" stroke="${INK}" stroke-width="5"/>`;
    for (let k = 1; k < 4 && i < 4; k++) s += `<path d="M86,${l.y - k * 32} h9" stroke="${INK}" stroke-width="2.5"/>`;
    const fs = big ? 22 : (two ? 27 : 30), ff = big ? 'Rye' : 'Playfair', fw = big ? 400 : 800, col = big ? RED : INK;
    s += `<text x="112" y="${l.y - (two ? 8 : -2)}" font-family="${ff}" font-weight="${fw}" font-size="${fs}" fill="${col}">${a}</text>`;
    if (two) s += `<text x="112" y="${l.y + 24}" font-family="${ff}" font-weight="${fw}" font-size="${fs}" fill="${col}">${b}</text>`;
  });
  // puntero
  s += `<g class="ptr"><path d="M88,0 L112,-14 L112,14 Z" fill="${PINK}" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}

/* ---------------- MINISTRO (chistera + monóculo) ---------------- */
function ministerInner() {
  let s = bustInner({ uniform: 'farmer', moustache: true, seed: 17 });
  // traje oscuro encima del torso
  const coat = 'M28,460 C32,384 80,338 140,328 L220,328 C280,338 328,384 332,460 Z';
  s += `<path d="${coat}" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/><path d="M150,330 L180,420 L210,330 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M160,338 l20,10 l20,-10 l0,18 l-20,-8 l-20,8 Z" fill="${INK}"/><path d="M150,330 L120,460 M210,330 L240,460" stroke="${FIG}" stroke-width="2" opacity=".5"/>`;
  // chistera
  const crown = 'M128,48 L232,48 L238,150 L122,150 Z', brim = 'M88,150 Q180,132 272,150 Q180,176 88,150 Z';
  s += cut(P(crown) + P(brim)) + D(crown, '#2a1f17') + `<rect x="124" y="126" width="112" height="18" fill="${RED}" stroke="${INK}" stroke-width="2"/><path d="M140,60 L142,120" stroke="#fff" stroke-width="5" opacity=".35"/>` + D(brim, '#2a1f17');
  // monóculo
  s += `<circle cx="204" cy="204" r="20" fill="rgba(255,255,255,.25)" stroke="${BRASS}" stroke-width="5"/><path d="M222,212 Q250,260 236,330" stroke="${BRASS}" stroke-width="2.5" fill="none"/>`;
  return s;
}
/* medallas para Meredith */
function medalsSvg() {
  let s = '';
  [[118, 372, RED], [150, 378, YEL], [86, 380, PINK]].forEach(([x, y, c], i) => {
    s += `<g class="medal" data-c="${x},${y}"><path d="M${x - 10},${y} L${x + 10},${y} L${x + 8},${y + 34} L${x - 8},${y + 34} Z" fill="${c}" stroke="${INK}" stroke-width="2.5"/><path d="M${x - 3},${y} V${y + 34}" stroke="${INK}" stroke-width="1.5"/><circle cx="${x}" cy="${y + 50}" r="16" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M${x},${y + 40} l3,7 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1 Z" fill="${INK}"/></g>`;
  });
  return s;
}
