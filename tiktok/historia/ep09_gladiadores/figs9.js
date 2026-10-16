/* Ep. 9 — figuras nuevas en estilo grabado: gladiadores, mano-pulgar, coliseo, busto romano, cámara, claqueta… */
const SAND = '#E3D2AE', STONE = '#D9C39A', MARBLE = '#EFE8D8', BRONZE = '#D29A55';

/* ---------------- GLADIADOR viewBox 0 0 300 560 ----------------
   o.type: 'murm' (casco con cresta + escudo + espada) | 'ret' (red + tridente)
   o.pose: 'stand' | 'kneel'      o.arm: 'sword' | 'finger' | 'net'   o.medals */
function gladInner(o = {}) {
  const id = uid('g'), murm = o.type !== 'ret', kneel = o.pose === 'kneel', dy = kneel ? 70 : 0, r = rng(o.seed || 7);
  let s = '';
  // piernas
  let parts;
  if (!kneel) parts = [limb(132, 345, 124, 494, 21, 13), limb(170, 345, 180, 494, 21, 13), 'M100,490 L140,490 L144,512 L96,512 Z', 'M164,490 L204,490 L208,512 L160,512 Z'];
  else parts = [limb(130, 415, 124, 498, 22, 15), limb(124, 498, 50, 504, 14, 10), 'M24,496 L54,492 L58,512 L22,512 Z', limb(170, 415, 228, 440, 22, 16), limb(228, 440, 224, 498, 15, 12), 'M206,494 L246,494 L250,512 L202,512 Z'];
  s += cut(parts.map(P).join(''), 6, 8);
  parts.forEach((d, i) => { const foot = (!kneel && i >= 2) || (kneel && (i === 2 || i === 5)); s += D(d, foot ? LEATHER : FIG) + (foot ? '' : HF(d, i % 2 ? 'hB' : 'hA').replace('/>', ' opacity=".55"/>')); });
  // greba (espinillera) en una pierna
  if (!kneel) s += D('M164,410 L194,410 L192,488 L168,488 Z', BRONZE) + HF('M164,410 L194,410 L192,488 L168,488 Z', 'hD') + `<path d="M170,420 h20 M170,440 h20 M170,460 h20" stroke="${INK}" stroke-width="2"/>`;
  else s += D('M214,452 L238,452 L234,494 L212,494 Z', BRONZE) + HF('M214,452 L238,452 L234,494 L212,494 Z', 'hD');
  // cuerpo superior
  let u = '';
  const torso = 'M96,172 C96,160 120,152 150,152 C180,152 204,160 204,172 L190,300 L110,300 Z';
  const neck = 'M136,126 L164,126 L166,160 L134,160 Z';
  const belt = 'M104,292 L196,292 L198,318 L102,318 Z';
  const cloth = 'M102,318 L198,318 L190,364 Q150,378 110,364 Z';
  const head = 'M116,104 C116,72 132,62 150,62 C168,62 184,72 184,104 C184,128 168,142 150,142 C132,142 116,128 116,104 Z';
  // brazo izquierdo del gladiador (lado derecho del espectador) — detrás del torso si es escudo
  let armL = '';
  if (murm) {
    const a1 = limb(198, 176, 214, 236, 16, 12), a2 = limb(214, 236, 206, 286, 12, 10);
    const sh = 'M168,166 Q222,152 276,166 L272,388 Q222,402 172,388 Z';
    armL += cut(P(a1) + P(a2) + P(sh), 6, 8) + D(a1) + D(a2);
    armL += D(sh, BRONZE, 4) + clipG(id + 'sh', sh, `<rect x="230" y="150" width="60" height="260" fill="url(#hA)"/><rect x="160" y="150" width="130" height="260" fill="url(#hP)"/>`);
    armL += `<path d="M180,178 Q222,166 264,178 L261,378 Q222,390 183,378 Z" fill="none" stroke="${RED}" stroke-width="7"/>`;
    armL += `<path d="M196,262 q26,-20 52,0 M196,290 q26,20 52,0" stroke="${INK}" stroke-width="3" fill="none"/><circle cx="222" cy="276" r="22" fill="${BRASS}" stroke="${INK}" stroke-width="4"/><circle cx="222" cy="276" r="22" fill="url(#hD)" opacity=".5"/><circle cx="215" cy="269" r="6" fill="#fff" opacity=".6"/>`;
  } else {
    const a1 = limb(198, 176, 216, 236, 16, 12), a2 = limb(216, 236, 222, 290, 12, 10), pole = limb(230, 30, 230, 520, 5, 5);
    const prong = 'M206,82 L254,82 L254,90 L206,90 Z M206,86 L206,44 L212,44 L212,86 Z M227,86 L227,22 L233,22 L233,86 Z M248,86 L248,44 L254,44 L254,86 Z';
    armL += cut(P(a1) + P(a2) + P(pole) + P(prong) + '<circle cx="222" cy="294" r="14"/>', 5, 7);
    armL += D(pole, WOOD, 2.5) + HF(pole, 'hD') + D(prong, '#cfc3a8', 2.5) + `<path d="M209,44 l-6,-12 l12,0 Z M230,22 l-6,-14 l12,0 Z M251,44 l-6,-12 l12,0 Z" fill="#cfc3a8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    armL += D(a1) + HF(a1, 'hA') + D(a2) + `<path d="M210,250 l14,0 M211,262 l14,0 M213,274 l13,0" stroke="${INK}" stroke-width="2.5"/>` + `<circle cx="222" cy="294" r="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  }
  u += `<g class="armL">${armL}</g>`;
  u += cut(P(torso) + P(neck) + P(belt) + P(cloth) + P(head) + '<circle cx="116" cy="106" r="9"/><circle cx="184" cy="106" r="9"/>', 6, 8);
  u += D(cloth, '#F2E6CC') + `<path d="M120,322 L126,366 M140,320 L142,372 M160,320 L158,372 M180,322 L174,366" stroke="${INK}" stroke-width="2" fill="none"/>` + HF(cloth, 'hB').replace('/>', ' opacity=".4"/>');
  u += D(torso) + clipG(id + 't', torso, `<ellipse cx="200" cy="230" rx="40" ry="110" fill="url(#hA)"/><rect x="90" y="270" width="130" height="40" fill="url(#hB)" opacity=".6"/>`);
  u += `<path d="M114,198 q36,18 72,0 M150,204 v80 M132,236 h36 M134,262 h32" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="128" cy="210" r="2.5" fill="${INK}"/><circle cx="172" cy="210" r="2.5" fill="${INK}"/>`;
  u += D(belt, BRASS) + HF(belt, 'hD').replace('/>', ' opacity=".5"/>') + `<path d="M108,300 H194 M108,310 H194" stroke="${INK}" stroke-width="1.6"/>`;
  if (!murm) u += D('M180,148 L232,116 L248,182 L204,194 Z', BRASS) + HF('M180,148 L232,116 L248,182 L204,194 Z', 'hA') + `<path d="M194,150 L236,128" stroke="${INK}" stroke-width="2"/>`;
  else u += `<path d="M96,180 L84,188 L80,206 L96,214" fill="${BRONZE}" stroke="${INK}" stroke-width="3"/>`;
  u += D(neck) + HF('M152,126 L164,126 L166,160 L152,160 Z', 'hF');
  if (o.medals) [[118, 182, RED], [150, 186, YEL], [182, 182, PINK]].forEach(([x, y, c]) => { u += `<g class="medal"><path d="M${x - 9},${y} L${x + 9},${y} L${x + 7},${y + 30} L${x - 7},${y + 30} Z" fill="${c}" stroke="${INK}" stroke-width="2.5"/><circle cx="${x}" cy="${y + 44}" r="15" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M${x},${y + 35} l3,6 6,1 -4,5 1,6 -6,-3 -6,3 1,-6 -4,-5 6,-1 Z" fill="${INK}"/></g>`; });
  // cabeza
  let h = `<circle cx="116" cy="106" r="9" fill="${FIG}" stroke="${INK}" stroke-width="3"/><circle cx="184" cy="106" r="9" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  h += D(head) + clipG(id + 'h', head, `<ellipse cx="180" cy="110" rx="20" ry="50" fill="url(#hA)"/>`);
  if (!murm) { let dd = ''; for (let k = 0; k < 40; k++) { const x = 124 + r() * 52, y = 118 + r() * 22; if (((x - 150) / 30) ** 2 + ((y - 124) / 20) ** 2 < 1 && Math.abs(x - 150) > 12) dd += `M${f1(x)},${f1(y)}l1,1.6`; } h += `<path d="${dd}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`; }
  h += `<ellipse cx="136" cy="104" rx="9.5" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="164" cy="104" rx="9.5" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  h += `<g class="pup"><circle cx="136" cy="105" r="4.4" fill="${INK}"/><circle cx="164" cy="105" r="4.4" fill="${INK}"/></g>`;
  h += `<g class="lidC" style="opacity:0"><ellipse cx="136" cy="104" rx="10.5" ry="9" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><ellipse cx="164" cy="104" rx="10.5" ry="9" fill="${FIG}" stroke="${INK}" stroke-width="2.6"/><path d="M127,106 q9,5 18,0 M155,106 q9,5 18,0" stroke="${INK}" stroke-width="2.4" fill="none"/></g>`;
  h += `<path class="brow" d="M125,90 q11,-6 21,-1 M154,89 q11,-5 21,1" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" fill="none"/>`;
  h += `<path d="M151,104 C149,114 144,118 147,121 C150,123 154,122 156,120" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  h += `<path class="mC" d="M139,130 q11,6 22,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><g class="mO" style="opacity:0"><ellipse cx="150" cy="131" rx="7.5" ry="9" fill="#160f0a" stroke="${INK}" stroke-width="2"/></g>`;
  if (murm) {
    const dome = 'M110,94 C106,36 194,36 190,94 C176,80 124,80 110,94 Z', brim = 'M96,96 Q150,80 204,96 L200,106 Q150,92 100,106 Z';
    const ck1 = 'M112,94 L102,132 Q108,144 122,140 L124,100 Z', ck2 = 'M188,94 L198,132 Q192,144 178,140 L176,100 Z';
    const crest = 'M118,58 C108,6 188,-10 204,34 C192,34 184,40 178,50 C160,40 136,44 118,58 Z';
    h += cut(P(dome) + P(brim) + P(ck1) + P(ck2) + P(crest), 5, 7);
    h += D(crest, RED) + clipG(id + 'cr', crest, `<rect x="100" y="-10" width="120" height="70" fill="url(#hD)" opacity=".55"/>`) + `<path d="M126,50 C124,24 150,8 176,10 M136,48 C138,30 158,20 186,22 M148,46 C152,36 170,30 194,34" stroke="${INK}" stroke-width="2" fill="none"/>`;
    h += D(dome, BRONZE) + HF(dome, 'hA') + `<path d="M128,52 Q150,44 172,52" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>`;
    h += D(brim, BRONZE) + HF(brim, 'hD').replace('/>', ' opacity=".6"/>') + D(ck1, BRONZE) + HF(ck1, 'hB') + D(ck2, BRONZE) + HF(ck2, 'hA');
  } else {
    const hair = 'M114,98 C106,52 194,52 186,98 C180,78 168,74 150,76 C132,74 120,78 114,98 Z';
    h += D(hair, '#4a3626') + HF(hair, 'hD') + `<path d="M118,88 Q150,70 182,88" stroke="${PAPER}" stroke-width="5" fill="none"/><path d="M118,88 Q150,70 182,88" stroke="${INK}" stroke-width="1.6" fill="none"/>`;
  }
  h += `<g class="sweat" style="opacity:0"><path d="M196,70 C201,82 206,88 206,94 A10,10 0 0,1 186,94 C186,88 191,82 196,70 Z" fill="#cfe9ff" stroke="${INK}" stroke-width="2.5"/></g>`;
  u += `<g class="headg">${h}</g>`;
  // brazo derecho (lado izquierdo del espectador)
  let armR = '';
  const arm = o.arm || (murm ? 'sword' : 'net');
  if (arm === 'finger') {
    const a1 = limb(102, 176, 66, 128, 16, 12), a2 = limb(66, 128, 74, 62, 12, 10), fg = limb(76, 52, 78, 14, 6, 5);
    armR += cut(P(a1) + P(a2) + P(fg) + '<circle cx="74" cy="60" r="15"/><circle cx="78" cy="14" r="5"/>', 5, 7) + D(a1) + HF(a1, 'hA') + D(a2) + D(fg) + `<circle cx="78" cy="14" r="5.5" fill="${FIG}" stroke="${INK}" stroke-width="2.5"/><circle cx="74" cy="60" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M64,58 h18 M64,66 h18" stroke="${INK}" stroke-width="1.8"/>`;
  } else {
    const a1 = limb(102, 176, 82, 240, 16, 12), a2 = limb(82, 240, 90, 296, 12, 10);
    let extra = '', exSil = '';
    if (arm === 'sword') {
      const blade = 'M83,312 L97,312 L96,404 L90,420 L84,404 Z', guard = 'M72,304 L108,304 L108,314 L72,314 Z';
      exSil = P(blade) + P(guard); extra = D(blade, '#e8e4dc', 2.5) + `<path d="M90,316 V408" stroke="${INK}" stroke-width="1.6"/><path d="M86,318 V396" stroke="#fff" stroke-width="2" opacity=".8"/>` + D(guard, BRASS, 2.5);
    } else if (arm === 'net') {
      const net = 'M90,300 C60,340 30,400 24,470 Q90,492 156,470 C150,400 120,340 90,300 Z';
      exSil = P(net); let ln = ''; for (let k = 0; k < 9; k++) { const x = 20 + k * 18; ln += `M90,300 L${x},480 `; } for (let y = 330; y < 490; y += 22) ln += `M${f1(90 - (y - 300) * 0.42)},${y} Q90,${y + 12} ${f1(90 + (y - 300) * 0.42)},${y} `;
      extra = `<path d="${net}" fill="rgba(244,236,219,.55)" stroke="none"/>` + clipG(id + 'n', net, `<path d="${ln}" stroke="${INK}" stroke-width="2.4" fill="none"/>`) + `<path d="${net}" fill="none" stroke="${INK}" stroke-width="3"/>`;
      for (let k = 0; k < 6; k++) extra += `<circle cx="${f1(30 + k * 24)}" cy="${f1(476 + Math.sin(k) * 6)}" r="5" fill="${INK}"/>`;
    }
    armR += cut(P(a1) + P(a2) + exSil + '<circle cx="90" cy="300" r="15"/>', 5, 7) + extra + D(a1) + HF(a1, 'hA') + D(a2);
    if (murm) armR += `<path d="M80,252 l18,0 M80,264 l18,0 M82,276 l17,0 M84,288 l15,0" stroke="${INK}" stroke-width="2.6"/>`;
    armR += `<circle cx="90" cy="300" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M80,296 h20 M80,304 h20" stroke="${INK}" stroke-width="1.8"/>`;
  }
  u += `<g class="armR">${armR}</g>`;
  s += `<g class="upper" transform="translate(0,${dy})">${u}</g>`;
  return s;
}
const mkGlad = (pa, b, o = {}) => { const f = mk(pa, b, gladInner(o), '0 0 300 560', 'glad'); const q = s => f.d.querySelector(s); Object.assign(f, { armR: q('.armR'), armL: q('.armL'), mO: q('.mO'), mC: q('.mC'), sweat: q('.sweat'), headg: q('.headg'), upper: q('.upper'), dy: o.pose === 'kneel' ? 70 : 0 }); return f; };
// expresión del gladiador
function gface(g, t, o = {}) {
  face(g, t, o);
  g.mO.style.opacity = o.oh ? 1 : 0; g.mC.style.opacity = o.oh ? 0 : 1;
  g.sweat.style.opacity = o.sweat ? 1 : 0; if (o.sweat) g.sweat.setAttribute('transform', `translate(0 ${f1(((t * 40) % 24))})`);
  g.armR.setAttribute('transform', `rotate(${f1(o.aR || 0)} 102 176)`);
  g.armL.setAttribute('transform', `rotate(${f1(o.aL || 0)} 198 176)`);
  g.headg.setAttribute('transform', `rotate(${f1(o.hr || 0)} 150 140)`);
}

/* ---------------- PUÑO CON PULGAR (centro 0,0; pulgar hacia +y) ---------------- */
function fistInner() {
  const fist = 'M-78,-96 C-94,-40 -94,40 -72,76 L72,76 C94,40 94,-40 78,-96 Z';
  const th = limb(-34, 40, -30, 170, 26, 21);
  let s = cut(P(fist) + P(th) + '<circle cx="-30" cy="170" r="21"/>', 7, 9);
  s += D(th, FIG, 4) + `<circle cx="-30" cy="170" r="21" fill="${FIG}" stroke="${INK}" stroke-width="4"/><path d="M-42,176 q12,10 24,0" stroke="${INK}" stroke-width="2.4" fill="none"/><path d="M-44,120 q14,6 28,0" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  s += `<path d="M-30,186 q0,-14 -10,-18 L-20,164 Z" fill="#fff" opacity=".0"/>`;
  s += D(fist, FIG, 4) + clipG(uid('fs'), fist, `<rect x="30" y="-110" width="80" height="200" fill="url(#hA)"/>`);
  [-62, -22, 18].forEach((y, i) => { const d = `M-66,${y} Q-66,${y - 18} -48,${y - 18} L52,${y - 18} Q70,${y - 18} 70,${y} Q70,${y + 18} 52,${y + 18} L-48,${y + 18} Q-66,${y + 18} -66,${y} Z`; s += D(d, FIG, 3) + `<path d="M40,${y - 16} q12,8 0,32" stroke="${INK}" stroke-width="2" fill="none"/>`; });
  s += `<path d="M-64,56 Q0,70 66,52" stroke="${INK}" stroke-width="3" fill="none"/>`;
  return s;
}
const fistSvg = sz => `<svg viewBox="-110 -120 220 320" width="${f1(sz * 220 / 320)}" height="${sz}" style="overflow:visible;display:block">${fistInner()}</svg>`;
/* mano gigante con manga (viewBox 0 0 400 900); el puño está en .fist (pivote 200,690) */
function thumbHandInner() {
  const sleeve = 'M120,-500 L280,-500 L290,600 L110,600 Z', cuff = 'M100,580 L300,580 L306,640 L94,640 Z';
  let s = cut(P(sleeve) + P(cuff), 8, 10);
  s += D(sleeve, '#3a2a1e') + clipG(uid('sl'), sleeve, `<rect x="100" y="-500" width="200" height="1100" fill="url(#hW)" opacity=".4"/><rect x="232" y="-500" width="70" height="1100" fill="url(#hD)"/>`);
  s += `<path d="M120,560 h170" stroke="${BRASS}" stroke-width="5"/>`;
  s += D(cuff, '#fff') + `<circle cx="270" cy="612" r="9" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><path d="M100,600 H302" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 5"/>`;
  s += `<g class="fist"><g transform="translate(200,730)">${fistInner()}</g></g>`;
  return s;
}

/* ---------------- COLISEO (gradas + arena) para una capa 1080x1920 ---------------- */
function coliseumSvg(o = {}) {
  const r = rng(o.seed || 9);
  const top = o.top || 380;
  let s = `<rect x="0" y="0" width="1080" height="${top + 40}" fill="${o.sky || '#F3E7CC'}"/><rect x="0" y="0" width="1080" height="${top + 40}" fill="url(#hP)" opacity=".6"/>`;
  // toldo (velarium)
  for (let k = 0; k < 9; k++) s += `<path d="M${k * 135 - 40},0 Q${k * 135 + 30},${top - 120} ${k * 135 + 100},${top - 20}" stroke="${INK}" stroke-width="2" fill="none" opacity=".35"/>`;
  const tiers = [[top, 130, 64, 84], [top + 130, 150, 74, 100], [top + 280, 170, 86, 118]];
  tiers.forEach(([y0, hh, aw, st], ti) => {
    s += `<rect x="-10" y="${y0}" width="1100" height="${hh}" fill="${STONE}" stroke="${INK}" stroke-width="4"/><rect x="-10" y="${y0}" width="1100" height="${hh}" fill="url(#hA)" opacity=".35"/>`;
    s += `<rect x="-10" y="${y0}" width="1100" height="14" fill="#cbb185" stroke="${INK}" stroke-width="3"/>`;
    const off = (ti % 2) * st / 2 - 20;
    for (let x = off; x < 1100; x += st) {
      const ax = x + (st - aw) / 2, ay = y0 + 30, ah = hh - 40;
      s += `<path d="M${f1(ax)},${y0 + hh} V${ay + aw / 2} A${aw / 2},${aw / 2} 0 0,1 ${f1(ax + aw)},${ay + aw / 2} V${y0 + hh} Z" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>`;
      // público
      const n = 2 + Math.floor(r() * 2);
      for (let k = 0; k < n; k++) {
        const hx = ax + aw * (k + 0.5) / n + (r() - .5) * 6, hy = y0 + hh - 22 - r() * 10, hr = aw / n * 0.3 + 4;
        s += `<path d="M${f1(hx - hr * 1.4)},${y0 + hh} Q${f1(hx)},${f1(hy + hr * 0.4)} ${f1(hx + hr * 1.4)},${y0 + hh} Z" fill="${['#b9874f', '#8a5a30', FIG, '#c98a74'][Math.floor(r() * 4)]}" stroke="${INK}" stroke-width="2"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(hr)}" fill="${FIG}" stroke="${INK}" stroke-width="2.2"/><circle cx="${f1(hx - hr * 0.35)}" cy="${f1(hy - 1)}" r="1.6" fill="${INK}"/><circle cx="${f1(hx + hr * 0.35)}" cy="${f1(hy - 1)}" r="1.6" fill="${INK}"/>`;
      }
      s += `<rect x="${f1(x - 6)}" y="${y0 + 14}" width="12" height="${hh - 14}" fill="#cbb185" stroke="${INK}" stroke-width="2.5"/>`;
    }
  });
  const wy = top + 450;
  s += `<rect x="-10" y="${wy}" width="1100" height="70" fill="#b9874f" stroke="${INK}" stroke-width="5"/><rect x="-10" y="${wy}" width="1100" height="70" fill="url(#hB)" opacity=".5"/>`;
  for (let x = 30; x < 1080; x += 180) s += `<rect x="${x}" y="${wy + 14}" width="120" height="42" fill="${STONE}" stroke="${INK}" stroke-width="3"/><path d="M${x + 14},${wy + 35} h92" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>`;
  s += `<rect x="-10" y="${wy + 70}" width="1100" height="${1920 - wy}" fill="${SAND}"/><rect x="-10" y="${wy + 70}" width="1100" height="${1920 - wy}" fill="url(#hP)"/>`;
  let mk2 = ''; for (let k = 0; k < 120; k++) { const x = r() * 1080, y = wy + 90 + r() * 900; mk2 += `M${f1(x)},${f1(y)}q6,-3 12,0`; }
  s += `<path d="${mk2}" stroke="${INK}" stroke-width="2" opacity=".35" fill="none"/><path d="M-10,${wy + 72} H1090" stroke="${INK}" stroke-width="5"/>`;
  return s;
}

/* ---------------- BUSTO ROMANO (Augusto / editor) viewBox 0 0 360 460 ---------------- */
function romanInner(o = {}) {
  const id = uid('r'), col = o.col || MARBLE;
  const torso = 'M28,460 C34,384 84,340 140,332 L220,332 C276,340 326,384 332,460 Z';
  const neck = 'M150,262 L210,262 L214,342 L146,342 Z';
  const head = 'M118,200 C112,140 136,100 180,100 C224,100 248,140 242,200 C242,262 214,312 180,312 C146,312 118,262 118,200 Z';
  const hair = 'M116,186 C108,118 140,90 180,90 C220,90 252,118 244,186 C236,152 222,138 206,136 C198,146 186,148 178,138 C168,148 156,146 150,136 C134,140 122,156 116,186 Z';
  let s = cut(P(torso) + P(neck) + P(head) + P(hair) + '<ellipse cx="118" cy="208" rx="13" ry="20"/><ellipse cx="242" cy="208" rx="13" ry="20"/>');
  s += D(torso, col) + clipG(id + 't', torso, `<rect x="230" y="320" width="130" height="150" fill="url(#hA)"/><path d="M60,460 Q120,380 220,336 M110,460 Q170,400 260,346 M170,460 Q220,410 300,380 M40,420 Q100,370 150,340" stroke="${INK}" stroke-width="3" fill="none"/>`);
  if (o.purple) s += `<path d="M60,460 Q120,380 220,336 L240,344 Q150,400 96,460 Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>`;
  s += D(neck, col) + HF('M188,262 L210,262 L214,342 L190,342 Z', 'hF');
  let h = `<ellipse cx="118" cy="208" rx="13" ry="20" fill="${col}" stroke="${INK}" stroke-width="3"/><ellipse cx="242" cy="208" rx="13" ry="20" fill="${col}" stroke="${INK}" stroke-width="3"/>`;
  h += D(head, col) + clipG(id + 'h', head, `<ellipse cx="238" cy="220" rx="30" ry="90" fill="url(#hA)"/><ellipse cx="180" cy="310" rx="60" ry="20" fill="url(#hB)"/>`);
  h += D(hair, o.hairCol || col) + clipG(id + 'hr', hair, `<rect x="100" y="80" width="160" height="120" fill="url(#hD)" opacity=".7"/>`) + `<path d="M140,140 q6,10 0,20 M160,138 q6,12 0,22 M196,138 q-6,12 0,22 M216,140 q-6,10 0,20" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  h += `<ellipse cx="156" cy="206" rx="13" ry="9.5" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="204" cy="206" rx="13" ry="9.5" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  h += `<g class="pup"><circle cx="156" cy="207" r="5.4" fill="${INK}"/><circle cx="204" cy="207" r="5.4" fill="${INK}"/></g>`;
  h += `<g class="lidC" style="opacity:0"><ellipse cx="156" cy="206" rx="14" ry="10.5" fill="${col}" stroke="${INK}" stroke-width="2.6"/><ellipse cx="204" cy="206" rx="14" ry="10.5" fill="${col}" stroke="${INK}" stroke-width="2.6"/></g>`;
  h += `<path class="brow" d="M138,186 q18,-8 34,0 M188,186 q18,-8 34,0" stroke="${INK}" stroke-width="5.5" stroke-linecap="round" fill="none"/>`;
  h += `<path d="M182,202 C178,224 166,236 172,242 C178,246 188,246 194,240" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  h += `<path class="mC" d="M160,272 q20,${o.smile ? 10 : 2} 40,0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  // corona de laurel
  let lf = ''; for (let k = 0; k < 9; k++) { const a = Math.PI * (1.05 + k * 0.1), x = 180 + Math.cos(a) * 74, y = 168 + Math.sin(a) * 60; lf += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="16" ry="7" transform="rotate(${f1(a * 180 / Math.PI + 60)} ${f1(x)} ${f1(y)})" fill="${o.laurel || '#7a9a52'}" stroke="${INK}" stroke-width="2.4"/>`; const x2 = 360 - x; lf += `<ellipse cx="${f1(x2)}" cy="${f1(y)}" rx="16" ry="7" transform="rotate(${f1(-(a * 180 / Math.PI + 60))} ${f1(x2)} ${f1(y)})" fill="${o.laurel || '#7a9a52'}" stroke="${INK}" stroke-width="2.4"/>`; }
  h += `<path d="M110,176 Q180,126 250,176" stroke="${INK}" stroke-width="3" fill="none"/>` + lf;
  s += `<g class="headg">${h}</g>`;
  return s;
}

/* ---------------- CÁMARA DE CINE ANTIGUA viewBox 0 0 460 540 ---------------- */
function cameraInner() {
  const body = 'M60,200 L330,200 L330,380 L60,380 Z', lens = 'M330,248 L410,222 L410,358 L330,332 Z';
  const legs = [limb(195, 380, 90, 530, 8, 6), limb(195, 380, 195, 534, 8, 6), limb(195, 380, 300, 530, 8, 6)];
  let s = cut(P(body) + P(lens) + legs.map(P).join('') + '<circle cx="130" cy="130" r="72"/><circle cx="268" cy="130" r="72"/>', 8, 10);
  s += legs.map(l => D(l, WOOD) + HF(l, 'hD')).join('');
  s += `<path d="M130,200 L130,150 M268,200 L268,150" stroke="${INK}" stroke-width="10"/>`;
  [[130, 130, 'reelA'], [268, 130, 'reelB']].forEach(([x, y, c]) => {
    s += `<g class="${c}"><circle cx="${x}" cy="${y}" r="72" fill="#3a2a1e" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="72" fill="url(#hW)" opacity=".4"/><circle cx="${x}" cy="${y}" r="60" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
    for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; s += `<circle cx="${f1(x + Math.cos(a) * 34)}" cy="${f1(y + Math.sin(a) * 34)}" r="15" fill="#3a2a1e" stroke="${INK}" stroke-width="3"/>`; }
    s += `<circle cx="${x}" cy="${y}" r="10" fill="${INK}"/></g>`;
  });
  s += D(body, '#4a3626', 4) + clipG(uid('cb'), body, `<rect x="60" y="200" width="270" height="180" fill="url(#hW)" opacity=".35"/><rect x="250" y="200" width="90" height="180" fill="url(#hD)"/>`);
  s += `<rect x="86" y="226" width="150" height="58" rx="6" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><text x="161" y="266" text-anchor="middle" font-family="Rye" font-size="30" fill="${INK}">CINE</text>`;
  s += D(lens, '#2a1f17') + `<ellipse cx="412" cy="290" rx="22" ry="70" fill="${FIG}" stroke="${INK}" stroke-width="4"/><ellipse cx="412" cy="290" rx="12" ry="44" fill="#3a2a1e"/><ellipse cx="408" cy="272" rx="4" ry="14" fill="#fff" opacity=".7"/>`;
  s += `<g class="crank"><path d="M60,300 L18,300" stroke="${INK}" stroke-width="8"/><path d="M18,300 L18,340" stroke="${INK}" stroke-width="8"/><circle cx="18" cy="344" r="10" fill="${BRASS}" stroke="${INK}" stroke-width="3"/></g>`;
  return s;
}
/* claqueta viewBox 0 0 320 260 */
function clapInner(lbl = 'TOMA 1') {
  const board = 'M10,80 L310,80 L310,250 L10,250 Z';
  let st = ''; for (let k = 0; k < 6; k++) st += `<path d="M${14 + k * 52},${k % 2 ? 80 : 80} l26,0 l-20,34 l-26,0 Z" fill="#fff"/>`;
  let s = cut(P(board) + '<rect x="10" y="40" width="300" height="40"/>', 6, 8);
  s += D(board, '#2a1f17', 4) + `<path d="M10,114 H310" stroke="#fff" stroke-width="3"/><path d="M10,114 L310,114 L310,80 L10,80 Z" fill="#2a1f17"/>` + `<g>${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${16 + k * 52},80 l28,0 l-16,34 l-28,0 Z" fill="#fff"/>`).join('')}</g>`;
  s += `<path d="M10,170 H310 M160,114 V250" stroke="#fff" stroke-width="2.5"/><text x="85" y="152" text-anchor="middle" font-family="SpecialElite" font-size="24" fill="#fff">ESCENA</text><text x="235" y="152" text-anchor="middle" font-family="SpecialElite" font-size="24" fill="#fff">${lbl}</text><text x="160" y="222" text-anchor="middle" font-family="Rye" font-size="38" fill="${YEL}">ROMA</text>`;
  s += `<g class="clap"><rect x="10" y="44" width="300" height="34" fill="#2a1f17" stroke="${INK}" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${26 + k * 52},44 l26,0 l-16,34 l-26,0 Z" fill="#fff"/>`).join('')}<circle cx="18" cy="78" r="7" fill="${BRASS}" stroke="${INK}" stroke-width="2"/></g>`;
  return s;
}
/* moneda (svg suelto) */
const coinSvg = (sz = 90, col = '#e9c75c') => `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}" style="overflow:visible;display:block"><circle cx="54" cy="56" r="44" fill="${SH}"/><circle cx="50" cy="50" r="44" fill="${col}" stroke="${INK}" stroke-width="5"/><circle cx="50" cy="50" r="33" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 5"/><path d="M50,30 l6,13 14,1 -11,9 4,14 -13,-8 -13,8 4,-14 -11,-9 14,-1 Z" fill="${INK}"/></svg>`;
/* marco dorado de cuadro: dibuja un marco cuyo HUECO es (x,y,w,h) dentro de un svg de tamaño total */
function goldFrame(w, h, b = 46) {
  const W2 = w + b * 2, H2 = h + b * 2;
  let orn = ''; [[b / 2, b / 2], [W2 - b / 2, b / 2], [b / 2, H2 - b / 2], [W2 - b / 2, H2 - b / 2]].forEach(([x, y]) => orn += `<circle cx="${x}" cy="${y}" r="${b * 0.42}" fill="${BRASS}" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${b * 0.2}" fill="${YEL}" stroke="${INK}" stroke-width="2"/>`);
  let beads = ''; for (let x = b + 20; x < W2 - b - 10; x += 26) beads += `<circle cx="${x}" cy="${b * 0.5}" r="4" fill="#f3d27a" stroke="${INK}" stroke-width="1.4"/><circle cx="${x}" cy="${H2 - b * 0.5}" r="4" fill="#f3d27a" stroke="${INK}" stroke-width="1.4"/>`;
  for (let y = b + 20; y < H2 - b - 10; y += 26) beads += `<circle cx="${b * 0.5}" cy="${y}" r="4" fill="#f3d27a" stroke="${INK}" stroke-width="1.4"/><circle cx="${W2 - b * 0.5}" cy="${y}" r="4" fill="#f3d27a" stroke="${INK}" stroke-width="1.4"/>`;
  return `<svg width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" style="overflow:visible;position:absolute;left:0;top:0">
   <path d="M12,14 H${W2 + 12} V${H2 + 14} H12 Z M${b + 12},${b + 14} V${h + b + 14} H${w + b + 12} V${b + 14} Z" fill="${SH}" fill-rule="evenodd"/>
   <path d="M0,0 H${W2} V${H2} H0 Z M${b},${b} V${h + b} H${w + b} V${b} Z" fill="${BRASS}" stroke="${INK}" stroke-width="5" fill-rule="evenodd"/>
   <path d="M0,0 H${W2} V${H2} H0 Z M${b},${b} V${h + b} H${w + b} V${b} Z" fill="url(#hA)" opacity=".45" fill-rule="evenodd"/>
   <rect x="${b * 0.22}" y="${b * 0.22}" width="${W2 - b * 0.44}" height="${H2 - b * 0.44}" fill="none" stroke="${INK}" stroke-width="2.5"/>
   <rect x="${b - 8}" y="${b - 8}" width="${w + 16}" height="${h + 16}" fill="none" stroke="${INK}" stroke-width="4"/>
   <rect x="${b - 4}" y="${b - 4}" width="${w + 8}" height="${h + 8}" fill="none" stroke="#f3d27a" stroke-width="3"/>${beads}${orn}</svg>`;
}
