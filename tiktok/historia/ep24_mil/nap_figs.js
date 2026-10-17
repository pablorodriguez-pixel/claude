/* Ep. 4 · Napoleón — figuras nuevas en estilo grabado (reutiliza helpers del kit) */
const COAT = '#3a2f26', BOOT = '#231a13', BRASS2 = '#C9A24A';

/* ---------- figura de cuerpo entero: viewBox 0 0 320 820, cabeza arriba en y=92, pies en y=810 ---------- */
function manInner(o = {}) {
  const id = uid('mn'), hat = o.hat || 'bicorne', pose = o.pose || 'tuck', coat = o.coat || COAT, lap = o.lapel || FIG;
  const tailL = 'M104,420 Q90,520 98,612 L134,616 Q142,520 152,444 Z';
  const tailR = 'M216,420 Q230,520 222,612 L186,616 Q178,520 168,444 Z';
  const breech = 'M110,436 L210,436 L206,590 L164,590 L160,486 L156,590 L114,590 Z';
  const bootL = 'M114,568 L156,568 L154,788 Q154,806 138,806 L98,806 Q84,806 90,794 Q98,784 116,780 Z';
  const bootR = 'M164,568 L206,568 L204,780 Q222,784 230,794 Q236,806 222,806 L182,806 Q166,806 166,788 Z';
  const cuffL = 'M110,558 L160,558 L158,598 L112,598 Z', cuffR = 'M160,558 L210,558 L208,598 L162,598 Z';
  const torso = 'M84,264 Q90,232 136,222 L184,222 Q230,232 236,264 L228,344 Q222,404 216,448 L104,448 Q98,404 92,344 Z';
  const vest = 'M138,224 L182,224 L192,444 Q160,456 128,444 Z';
  const lapL = 'M134,224 L152,240 L134,446 L112,446 Q116,334 122,238 Z', lapR = 'M186,224 L168,240 L186,446 L208,446 Q204,334 198,238 Z';
  const collar = 'M120,200 Q160,226 200,200 L202,236 Q160,250 118,236 Z';
  const crav = 'M140,196 L180,196 L186,228 Q160,240 134,228 Z';
  const neck = 'M146,180 L174,180 L176,206 L144,206 Z';
  const head = 'M116,146 C116,108 136,92 160,92 C184,92 204,108 204,146 C204,178 186,200 160,200 C134,200 116,178 116,146 Z';
  // brazos
  let aR = [], aL = [], hands = [], musket = '';
  if (pose === 'tuck') {
    aR = [limb(98, 266, 82, 364, 21, 17), limb(82, 364, 150, 326, 17, 14)];
    aL = [limb(222, 266, 238, 364, 21, 17), limb(238, 364, 230, 456, 17, 14)]; hands = [[230, 468]];
  } else if (pose === 'musket') {
    aR = [limb(98, 266, 84, 364, 21, 17), limb(84, 364, 92, 456, 17, 14)]; hands = [[92, 468]];
    aL = [limb(222, 266, 242, 360, 21, 17), limb(242, 360, 258, 424, 17, 14)]; hands.push([260, 430]);
    const stock = 'M244,640 L270,640 L276,806 L240,806 Z', barrel = limb(256, 120, 254, 650, 6, 7);
    musket = cut(P(stock) + P(barrel), 5, 6) + D(barrel, '#8a6a4a') + D(stock, WOOD) + HF(stock, 'hD') + `<path d="M256,120 L258,40" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M256,120 L258,40" stroke="#ddd" stroke-width="2"/><rect x="246" y="300" width="20" height="10" fill="${BRASS2}" stroke="${INK}" stroke-width="2"/><rect x="246" y="520" width="20" height="10" fill="${BRASS2}" stroke="${INK}" stroke-width="2"/>`;
  } else {
    aR = [limb(98, 266, 84, 364, 21, 17), limb(84, 364, 92, 456, 17, 14)]; hands = [[92, 468]];
    aL = [limb(222, 266, 236, 364, 21, 17), limb(236, 364, 228, 456, 17, 14)]; hands.push([228, 468]);
  }
  // sombrero
  let hs = '', hatS = '';
  if (hat === 'bicorne') {
    const b = 'M44,120 C50,60 100,34 160,32 C220,34 270,60 276,120 C240,100 200,96 160,98 C120,96 80,100 44,120 Z';
    hs = P(b);
    hatS = D(b, '#2a1f17') + clipG(id + 'hb', b, `<rect x="40" y="30" width="240" height="100" fill="url(#hD)" opacity=".7"/>`) + `<path d="M56,112 C70,70 110,48 160,46 C210,48 250,70 264,112" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/>`;
    hatS += `<circle cx="214" cy="72" r="15" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="214" cy="72" r="9.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/><circle cx="214" cy="72" r="5" fill="${INK}"/><path d="M214,56 L214,88" stroke="${BRASS2}" stroke-width="3"/>`;
  } else if (hat === 'bearskin') {
    const b = 'M104,132 C92,60 104,-34 160,-46 C216,-34 228,60 216,132 Q160,120 104,132 Z';
    const plume = 'M100,48 C82,6 92,-48 110,-72 C120,-30 118,12 112,52 Z';
    hs = P(b) + P(plume);
    const r = rng(o.seed || 9); let fur = ''; for (let k = 0; k < 110; k++) { const x = 106 + r() * 108, y = -40 + r() * 166; fur += `M${f1(x)},${f1(y)}q${f1(r() * 4 - 2)},5 ${f1(r() * 6 - 3)},${f1(9 + r() * 6)}`; }
    hatS = D(b, '#1a1410') + `<path d="${fur}" stroke="#6b5a4a" stroke-width="1.8" fill="none" stroke-linecap="round"/>` + D(plume, RED) + `<path d="M98,40 Q100,-10 108,-60" stroke="${INK}" stroke-width="1.5" fill="none"/>`;
    hatS += `<path d="M112,96 Q160,120 208,92" stroke="#fff" stroke-width="4" fill="none" stroke-dasharray="6 5"/><path d="M140,112 L180,112 L176,130 L144,130 Z" fill="${BRASS2}" stroke="${INK}" stroke-width="2.5"/>`;
  } else if (hat === 'top') {
    const c = 'M120,108 L124,22 L196,22 L200,108 Z';
    hs = P(c) + '<ellipse cx="160" cy="108" rx="66" ry="11"/>';
    hatS = D(c, '#2a1f17') + HF(c, 'hD') + `<rect x="121" y="90" width="78" height="12" fill="${o.band || RED}" stroke="${INK}" stroke-width="2"/><ellipse cx="160" cy="108" rx="66" ry="11" fill="#2a1f17" stroke="${INK}" stroke-width="3"/>`;
  } else if (hat === 'tricorne') {
    const c = 'M66,118 Q86,62 160,58 Q234,62 254,118 Q206,100 160,106 Q114,100 66,118 Z';
    hs = P(c);
    hatS = D(c, '#2a1f17') + HF(c, 'hD') + `<path d="M76,112 Q160,84 244,112" stroke="#d9c7a6" stroke-width="3" fill="none"/>`;
  } else if (hat === 'cap') {
    const c = 'M112,124 C104,74 148,62 184,70 C220,78 222,112 210,124 Q160,112 112,124 Z';
    hs = P(c);
    hatS = D(c, o.capC || '#8a3a2a') + HF(c, 'hA') + `<path d="M112,124 Q160,112 210,124" stroke="${INK}" stroke-width="4" fill="none"/>`;
  } else {
    const hr = 'M114,146 C108,100 132,82 160,82 C190,82 212,100 206,146 C198,118 182,108 160,110 C138,108 122,118 114,146 Z';
    hs = P(hr);
    hatS = D(hr, o.hairC || '#6b5a4a') + HF(hr, 'hA');
  }
  // silueta
  const sil = [tailL, tailR, breech, bootL, bootR, torso, collar, neck, head, ...aR, ...aL].map(P).join('') + hands.map(h => `<circle cx="${h[0]}" cy="${h[1]}" r="15"/>`).join('') + '<ellipse cx="116" cy="150" rx="9" ry="14"/><ellipse cx="204" cy="150" rx="9" ry="14"/>' + hs;
  let s = musket ? '' : '';
  s += cut(sil);
  s += musket;
  s += D(tailL, coat) + HF(tailL, 'hD') + D(tailR, coat) + HF(tailR, 'hD');
  s += D(breech, o.pants || '#F7F0E0') + clipG(id + 'br', breech, `<rect x="170" y="430" width="50" height="170" fill="url(#hA)" opacity=".7"/>`) + `<path d="M160,486 L160,436" stroke="${INK}" stroke-width="2"/>`;
  s += D(bootL, BOOT) + D(bootR, BOOT) + `<path d="M120,620 Q124,720 120,770 M196,620 Q194,720 198,770" stroke="#fff" stroke-width="3" opacity=".3" fill="none"/>`;
  if (!o.gaiters) s += D(cuffL, '#5a4030') + D(cuffR, '#5a4030') + HF(cuffL, 'hA') + HF(cuffR, 'hA');
  else s += `<path d="M116,610 v160 M204,610 v160" stroke="#fff" stroke-width="3" stroke-dasharray="3 10"/>`;
  s += D(torso, coat) + clipG(id + 't', torso, `<rect x="182" y="220" width="70" height="240" fill="url(#hD)" opacity=".8"/><rect x="80" y="220" width="40" height="240" fill="url(#hA)" opacity=".5"/>`);
  s += D(vest, '#F7F0E0') + clipG(id + 'v', vest, `<rect x="170" y="220" width="30" height="240" fill="url(#hA)" opacity=".6"/>`);
  let vb = ''; for (let y = 262; y < 430; y += 32) vb += `<circle cx="160" cy="${y}" r="3.6" fill="${INK}"/>`; s += vb;
  s += D(lapL, lap) + D(lapR, lap);
  let lb = ''; for (let k = 0; k < 6; k++) { const q = k / 5; lb += `<circle cx="${f1(140 - q * 16)}" cy="${f1(258 + q * 170)}" r="5" fill="${BRASS2}" stroke="${INK}" stroke-width="1.8"/><circle cx="${f1(180 + q * 16)}" cy="${f1(258 + q * 170)}" r="5" fill="${BRASS2}" stroke="${INK}" stroke-width="1.8"/>`; }
  s += lb;
  if (o.belts) { const b1 = limb(100, 252, 206, 444, 9, 9), b2 = limb(220, 252, 114, 444, 9, 9); s += D(b1, '#fff', 2.5) + D(b2, '#fff', 2.5) + `<circle cx="160" cy="352" r="9" fill="${BRASS2}" stroke="${INK}" stroke-width="2.5"/>`; }
  if (o.epaul) s += `<ellipse cx="98" cy="252" rx="26" ry="12" fill="${RED}" stroke="${INK}" stroke-width="3"/><ellipse cx="222" cy="252" rx="26" ry="12" fill="${RED}" stroke="${INK}" stroke-width="3"/><path d="M76,262 l-2,14 M84,264 l-1,15 M92,265 l0,15 M100,265 l1,15 M108,264 l2,14 M212,264 l-2,14 M220,265 l-1,15 M228,265 l0,15 M236,264 l1,15 M244,262 l2,14" stroke="${RED}" stroke-width="3.5" stroke-linecap="round"/>`;
  s += D(neck) + HF('M164,180 L174,180 L176,206 L164,206 Z', 'hF');
  s += D(collar, coat) + HF(collar, 'hD') + D(crav, '#fff');
  // brazos
  const arm = (pts, cls) => `<g class="${cls}">${pts.map(d => D(d, coat) + HF(d, 'hD')).join('')}</g>`;
  s += arm(aR, 'armR');
  if (pose === 'tuck') s += `<path d="M128,322 L148,318" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M128,322 L148,318" stroke="${INK}" stroke-width="2" stroke-dasharray="2 4"/>` + `<path d="M146,302 L176,300 L180,344 L148,348 Z" fill="#F7F0E0"/><path d="M146,302 L148,348" stroke="${INK}" stroke-width="2.6"/><circle cx="162" cy="326" r="3.6" fill="${INK}"/>`;
  s += arm(aL, 'armL');
  hands.forEach(h => s += `<circle cx="${h[0]}" cy="${h[1]}" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M${h[0] - 8},${h[1] + 2} q8,6 16,0" stroke="${INK}" stroke-width="1.6" fill="none"/>`);
  // cabeza
  s += `<ellipse cx="116" cy="150" rx="9" ry="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/><ellipse cx="204" cy="150" rx="9" ry="14" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += D(head) + clipG(id + 'h', head, `<ellipse cx="200" cy="162" rx="26" ry="52" fill="url(#hA)"/><ellipse cx="160" cy="204" rx="40" ry="12" fill="url(#hB)"/>`);
  if (hat === 'bicorne') s += `<path d="M118,128 Q114,150 122,160 L126,132 Z M202,128 Q206,150 198,160 L194,132 Z" fill="#4a3a2c" stroke="${INK}" stroke-width="2"/><path d="M152,104 q-10,12 2,24 q2,-8 -2,-12 M162,104 q-4,10 4,18" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<ellipse cx="146" cy="146" rx="8.5" ry="6.5" fill="#fff" stroke="${INK}" stroke-width="2.2"/><ellipse cx="174" cy="146" rx="8.5" ry="6.5" fill="#fff" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<g class="pup"><circle cx="146" cy="146.5" r="4" fill="${INK}"/><circle cx="174" cy="146.5" r="4" fill="${INK}"/></g>`;
  s += `<g class="lidC" style="opacity:0"><ellipse cx="146" cy="146" rx="9.5" ry="7.5" fill="${FIG}" stroke="${INK}" stroke-width="2.2"/><ellipse cx="174" cy="146" rx="9.5" ry="7.5" fill="${FIG}" stroke="${INK}" stroke-width="2.2"/><path d="M138,148 q8,4 16,0 M166,148 q8,4 16,0" stroke="${INK}" stroke-width="2.2" fill="none"/></g>`;
  s += `<path class="browL" d="M134,133 Q146,126 156,132" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/><path class="browR" d="M164,132 Q174,126 186,133" stroke="${INK}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  s += `<path d="M160,146 C158,158 152,166 156,170 C160,173 166,171 168,166" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  if (o.moustache) s += `<path d="M140,178 Q150,168 160,175 Q170,168 180,178 Q170,184 160,180 Q150,184 140,178 Z" fill="${INK}"/>`;
  s += `<path class="mN" d="M148,184 Q160,188 172,184" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `<path class="mS" style="opacity:0" d="M145,181 Q160,194 175,181" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  s += `<path class="mW" style="opacity:0" d="M146,187 q7,-5 14,0 q7,5 14,0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s += `<g class="mA" style="opacity:0"><path d="M143,176 Q160,169 177,176 Q175,200 160,202 Q145,200 143,176 Z" fill="#160f0a" stroke="${INK}" stroke-width="2"/><path d="M148,177 Q160,173 172,177 L171,182 Q160,179 149,182 Z" fill="#fff"/></g>`;
  s += `<g class="sweat" style="opacity:0"><path d="M212,108 Q202,126 212,134 Q222,126 212,108 Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/></g>`;
  s += hatS;
  return s;
}

/* ---------- caricatura británica: cabezón diminuto con rabieta (viewBox 0 0 320 440) ---------- */
function cariInner() {
  const id = uid('ca');
  const head = 'M84,172 C84,112 118,84 160,84 C202,84 236,112 236,172 C236,224 204,254 160,254 C116,254 84,224 84,172 Z';
  const hat = 'M0,128 C10,36 90,-6 160,-10 C230,-6 310,36 320,128 C262,104 212,98 160,100 C108,98 58,104 0,128 Z';
  const torso = 'M114,250 Q160,236 206,250 L210,352 L110,352 Z', tails = 'M110,330 L100,380 L124,384 L134,350 Z M210,330 L220,380 L196,384 L186,350 Z';
  const br = 'M118,348 L202,348 L200,384 L162,384 L160,366 L158,384 L120,384 Z';
  const bL = 'M120,380 L156,380 L154,428 L106,428 Q100,420 112,414 Z', bR = 'M164,380 L200,380 L208,414 Q220,420 214,428 L166,428 Z';
  const aL = limb(120, 262, 72, 206, 11, 9), aR = limb(200, 262, 248, 206, 11, 9);
  const sil = [head, hat, torso, tails, br, bL, bR, aL, aR].map(P).join('') + '<circle cx="66" cy="198" r="15"/><circle cx="254" cy="198" r="15"/><ellipse cx="84" cy="176" rx="12" ry="18"/><ellipse cx="236" cy="176" rx="12" ry="18"/>';
  let s = cut(sil);
  s += D(tails, COAT) + D(br, '#F7F0E0') + HF(br, 'hA') + D(bL, BOOT) + D(bR, BOOT);
  s += D(torso, COAT) + clipG(id + 't', torso, `<rect x="170" y="230" width="50" height="130" fill="url(#hD)"/>`) + D('M148,250 L172,250 L176,350 L144,350 Z', '#F7F0E0') + `<circle cx="160" cy="276" r="3" fill="${INK}"/><circle cx="160" cy="300" r="3" fill="${INK}"/><circle cx="160" cy="324" r="3" fill="${INK}"/>`;
  s += `<g class="armL">${D(aL, COAT)}<circle cx="66" cy="198" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M58,192 h14 M58,200 h14" stroke="${INK}" stroke-width="2"/></g>`;
  s += `<g class="armR">${D(aR, COAT)}<circle cx="254" cy="198" r="15" fill="${FIG}" stroke="${INK}" stroke-width="3"/><path d="M248,192 h14 M248,200 h14" stroke="${INK}" stroke-width="2"/></g>`;
  s += `<ellipse cx="84" cy="176" rx="12" ry="18" fill="${FIG}" stroke="${INK}" stroke-width="3"/><ellipse cx="236" cy="176" rx="12" ry="18" fill="${FIG}" stroke="${INK}" stroke-width="3"/>`;
  s += D(head, '#F2D2C2') + clipG(id + 'h', head, `<ellipse cx="226" cy="186" rx="36" ry="78" fill="url(#hA)"/><ellipse cx="160" cy="256" rx="60" ry="16" fill="url(#hB)"/>`);
  s += `<ellipse cx="114" cy="196" rx="14" ry="9" fill="${PINK}" opacity=".45"/><ellipse cx="206" cy="196" rx="14" ry="9" fill="${PINK}" opacity=".45"/>`;
  // ojos furiosos
  s += `<circle cx="134" cy="160" r="13" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="186" cy="160" r="13" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="137" cy="163" r="6" fill="${INK}"/><circle cx="183" cy="163" r="6" fill="${INK}"/>`;
  s += `<path d="M110,132 L156,150 M210,132 L164,150" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
  s += `<path d="M160,166 C156,182 150,190 156,196 C162,198 168,196 170,190" stroke="${INK}" stroke-width="3" fill="none"/>`;
  s += `<g class="mouth"><path d="M128,210 Q160,198 192,210 Q188,240 160,244 Q132,240 128,210 Z" fill="#160f0a" stroke="${INK}" stroke-width="3"/><path d="M134,212 Q160,204 186,212 L184,220 Q160,214 136,220 Z" fill="#fff"/><ellipse cx="160" cy="234" rx="16" ry="6" fill="#7a1e2a"/></g>`;
  s += `<path d="M150,104 q-10,14 4,26 M164,102 q-4,12 6,20" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += D(hat, '#2a1f17') + clipG(id + 'ht', hat, `<rect x="0" y="-10" width="320" height="140" fill="url(#hD)" opacity=".7"/>`) + `<circle cx="236" cy="62" r="20" fill="${RED}" stroke="${INK}" stroke-width="3"/><circle cx="236" cy="62" r="12" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="236" cy="62" r="6" fill="${INK}"/>`;
  return s;
}

/* ---------- gorro de piel de oso para el emú frontal (coords del emú frontal 400x600) ---------- */
function emuBearskin() {
  const b = 'M98,168 C80,40 122,-92 200,-102 C278,-92 320,40 302,168 Q200,146 98,168 Z', plume = 'M96,90 C70,30 82,-50 104,-86 C118,-30 116,30 108,96 Z';
  const r = rng(55); let fur = ''; for (let k = 0; k < 150; k++) { const x = 104 + r() * 192, y = -90 + r() * 250; fur += `M${f1(x)},${f1(y)}q${f1(r() * 4 - 2)},6 ${f1(r() * 6 - 3)},${f1(10 + r() * 7)}`; }
  return cut(P(b) + P(plume)) + D(b, '#1a1410') + `<path d="${fur}" stroke="#6b5a4a" stroke-width="2" fill="none" stroke-linecap="round"/>` + D(plume, RED) + `<path d="M114,134 Q200,160 286,128" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="7 6"/><path d="M172,124 L228,124 L222,150 L178,150 Z" fill="${BRASS2}" stroke="${INK}" stroke-width="3"/>`;
}

/* ---------- helpers de colocación ---------- */
const H0 = 92, H1 = 810, HU = H1 - H0; // unidades de altura del cuerpo
function mkMan(parent, cx, floorY, hM, M, o = {}) {
  const k = hM * M / HU, w = 320 * k, h = 820 * k;
  const f = mk(parent, [cx - 160 * k, floorY - H1 * k, w, h], manInner(o), '0 0 320 820', 'man');
  f.k = k; f.d.style.transformOrigin = `50% ${(H1 / 820 * 100).toFixed(2)}%`;
  const q = s => f.d.querySelector(s);
  f.m = { N: q('.mN'), S: q('.mS'), W: q('.mW'), A: q('.mA') }; f.sweat = q('.sweat'); f.armL = q('.armL'); f.armR = q('.armR');
  return f;
}
function nface(f, t, o = {}) {
  const lk = o.look || [0, 0]; f.pup.forEach(q => q.setAttribute('transform', `translate(${f1(lk[0])} ${f1(lk[1])})`));
  const bl = o.blink !== false && ((t + (o.seed || 0)) % 3.1) < 0.12; if (f.lidC) f.lidC.style.opacity = (bl || o.closed) ? 1 : 0;
  const a = o.angry || 0, b = o.brow || 0;
  if (f.browL) f.browL.setAttribute('transform', `translate(0 ${f1(-b + a * 4)}) rotate(${f1(a * 16)} 156 132)`);
  if (f.browR) f.browR.setAttribute('transform', `translate(0 ${f1(-b + a * 4)}) rotate(${f1(-a * 16)} 164 132)`);
  const m = o.mouth || 'N'; for (const k in f.m) if (f.m[k]) f.m[k].style.opacity = k === m ? 1 : 0;
  if (f.sweat) { f.sweat.style.opacity = o.sweat ? 1 : 0; if (o.sweat) f.sweat.setAttribute('transform', `translate(0 ${f1((t * 40) % 26)})`); }
}
function mkCari(parent, b) {
  const f = mk(parent, b, cariInner(), '0 0 320 440', 'cari'); const q = s => f.d.querySelector(s);
  f.armL = q('.armL'); f.armR = q('.armR'); f.mouth = q('.mouth'); f.d.style.transformOrigin = '50% 97%';
  return f;
}
function cariAnim(f, t, amt = 1) {
  const a = Math.sin(t * 22) * 28 * amt;
  f.armL.setAttribute('transform', `rotate(${f1(a)} 120 262)`); f.armR.setAttribute('transform', `rotate(${f1(-a)} 200 262)`);
  f.mouth.setAttribute('transform', `translate(160 222) scale(1 ${f1(0.75 + 0.35 * Math.abs(Math.sin(t * 14)))}) translate(-160 -222)`);
}
// vapor de rabieta
function steamPuffs(parent, x, y) {
  const d = box(parent, x, y, 300, 120, { zIndex: 6 });
  d.innerHTML = `<svg viewBox="0 0 300 120" width="300" height="120" style="overflow:visible">${[[40, 80, 26], [70, 50, 30], [230, 50, 30], [260, 80, 26]].map(c => `<circle class="pf" cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#fff" stroke="${INK}" stroke-width="4"/>`).join('')}</svg>`;
  return d;
}

/* ---------- MEDIDOR DE ALTURA de época ---------- */
function mkRuler(parent, x, floorY, M, o = {}) {
  const top = o.top || 1.9, H = top * M, W_ = 120;
  const d = box(parent, x, floorY - H - 46, W_ + 60, H + 70, { zIndex: o.z || 3 });
  let tk = '';
  const y0 = H + 46;
  for (let c = 0; c <= Math.round(top * 100); c += 2) {
    const y = f1(y0 - c / 100 * M), big = c % 10 === 0, mid = c % 10 === 5;
    if (c < 100 && !big && !mid) continue;
    tk += `<path d="M30,${y} h${big ? 46 : mid ? 30 : 16}" stroke="${INK}" stroke-width="${big ? 4 : 2.4}"/>`;
    if (big && c >= 50 && c < top * 100) tk += `<text x="${W_ + 22}" y="${f1(+y + 8)}" text-anchor="end" font-family="SpecialElite" font-size="${c >= 100 ? 24 : 20}" fill="${INK}">${(c / 100).toFixed(1).replace('.', ',')}</text>`;
  }
  d.innerHTML = `<svg width="${W_ + 60}" height="${H + 70}" style="overflow:visible">
   ${cut(`<rect x="28" y="30" width="${W_}" height="${H + 18}" rx="10"/>`)}
   <rect x="28" y="30" width="${W_}" height="${H + 18}" rx="10" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
   <rect x="28" y="30" width="${W_}" height="${H + 18}" fill="url(#hW)" opacity=".28"/>
   <path d="M60,40 Q70,${H / 2} 56,${H + 40} M118,40 Q108,${H / 2} 124,${H + 40}" stroke="${INK}" stroke-width="1.8" fill="none" opacity=".4"/>
   ${tk}
   <rect x="18" y="12" width="${W_ + 20}" height="30" rx="8" fill="${BRASS2}" stroke="${INK}" stroke-width="4"/>
   <rect x="0" y="${H + 40}" width="${W_ + 56}" height="26" rx="6" fill="#5a3d22" stroke="${INK}" stroke-width="4"/></svg>`;
  // brazo deslizante (sale hacia la derecha) + etiqueta al final del brazo
  const arm = o.arm || 300, bx = x + 28 + W_ - 14;
  const sl = box(parent, bx, 0, arm, 30, { zIndex: o.slZ || (o.z || 3) + 1 });
  sl.innerHTML = `<svg width="${arm}" height="40" style="overflow:visible"><rect x="0" y="0" width="${arm}" height="22" rx="6" fill="${BRASS2}" stroke="${INK}" stroke-width="4"/><path d="M8,8 H${arm - 8}" stroke="#fff" stroke-width="2" opacity=".5"/></svg>`;
  const tag = el('div', parent, { left: px(bx + arm + 6), top: '0px', fontFamily: 'Playfair', fontWeight: 900, fontSize: px(o.tagSize || 52), color: INK, background: YEL, border: `5px solid ${INK}`, borderRadius: '14px', padding: '0 16px 4px', whiteSpace: 'nowrap', boxShadow: `6px 6px 0 ${SH}`, zIndex: (o.z || 3) + 6, lineHeight: 1.25 });
  return {
    d, sl, tag, floorY, M,
    setH(h) { const y = floorY - h * M; sl.style.top = px(y - 11); tag.style.top = px(y - 38); },
  };
}

/* símbolos reutilizables */
defsSvg.innerHTML += `<defs>
<symbol id="napS" viewBox="0 0 320 820" overflow="visible">${manInner({ seed: 1 })}</symbol>
<symbol id="cariS" viewBox="0 0 320 440" overflow="visible">${cariInner()}</symbol>
<symbol id="grenS" viewBox="0 0 320 820" overflow="visible">${manInner({ hat: 'bearskin', pose: 'musket', moustache: true, belts: true, epaul: true, lapel: '#fff', gaiters: true, seed: 4 })}</symbol>
</defs>`;
