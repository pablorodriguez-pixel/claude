/* ======================================================================
   Ep. 8 v2 · TRAMO FINAL (todo clavado por texto: T() y K de globals8.js)
   HIT · «casi INVISIBLE» (golpe rosa citable) → en «¿Te lo creías?» el mismo plano
         se convierte en encuesta SÍ / NO con 2 comentarios
   C   · «Soy tu vecino…» — El Vecino en su balcón (rápido)
   L   · «…y esto no venía en el libro.» — el libro HISTORIA se cierra de golpe → bucle
   ====================================================================== */
const S9 = { HIT: [T(60.5), K.soy - 0.1], C: [K.soy - 0.1, K.y - 0.06], L: [K.y - 0.06, LOOP] };

colorHit(S9.HIT[0], S9.HIT[1], PINK, c => {
  const thr = box(c, 0, 0, 1080, 1920, { zIndex: 2 }); thr.innerHTML = `<svg width="1080" height="1920"><path d="M-20,1150 C200,1080 300,980 470,960 S700,880 820,820 S1000,760 1120,740" stroke="${INK}" stroke-width="3" fill="none" stroke-dasharray="40 26"/></svg>`;
  const grp = box(c, 0, 0, 1080, 1920, { zIndex: 4, transformOrigin: '540px 360px' });
  const t0 = el('div', grp, { left: '0', top: '360px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '130px', lineHeight: 1, color: INK, zIndex: 4 }, 'casi');
  const t1 = el('div', grp, { left: '0', top: '520px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '168px', lineHeight: 1, color: INK, zIndex: 4, letterSpacing: '-0.01em' });
  const L = [...'INVISIBLE'].map(ch => { const s = document.createElement('span'); s.textContent = ch; s.style.display = 'inline-block'; t1.appendChild(s); return s; });
  const lup = box(c, 640, 820, 300, 420, { zIndex: 5 }); lup.innerHTML = lupaFrame();
  // pregunta + botones gigantes (mismo plano)
  const q = el('div', c, { left: '0', top: '470px', width: '1080px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '112px', lineHeight: 1.05, color: INK, zIndex: 8, whiteSpace: 'nowrap' }, `¿Te lo <i>${hlSpan('creías', 'qhl', '#fff')}</i>?`);
  const qhl = q.querySelector('.qhl');
  const btn = (x, txt, bg, col) => el('div', c, { left: px(x), top: '650px', width: '380px', height: '210px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '150px', lineHeight: '196px', color: col, background: bg, border: `8px solid ${INK}`, borderRadius: '40px', boxShadow: `10px 12px 0 ${INK}`, zIndex: 9 }, txt);
  const bS = btn(110, 'SÍ', YEL, INK), bN = btn(590, 'NO', '#fff', RED);
  const hand = box(c, 300, 790, 160, 200, { zIndex: 12 }); hand.innerHTML = `<svg viewBox="-60 -70 120 120" width="160" height="160" style="overflow:visible">${gloveHand(0, 0, 160, 1.2)}</svg>`;
  const CM = [['FAR', '@paco_mapas', '¡Sí! Me lo dijeron en clase', K.creias + 0.2], ['SOL', '@lucia.geo', 'No, ya lo sabía…', K.si + 0.4]].map((m, i) => {
    const e = box(c, 70 + i * 120, 935 + i * 130, 0, 108, { width: 'auto', background: '#fff', border: `4px solid ${INK}`, borderRadius: '54px', boxShadow: `6px 6px 0 ${SH}`, zIndex: 14, padding: '0 40px 0 110px', whiteSpace: 'nowrap' });
    avatar(e, 10, 10, 80, m[0], { bw: 3 });
    e.insertAdjacentHTML('beforeend', `<div style="position:relative;padding-top:8px;font-family:Bricolage;font-weight:600;font-size:25px;color:#7a6a58">${m[1]}</div><div style="position:relative;font-family:Bricolage;font-weight:800;font-size:38px;line-height:1.1;color:${INK}">${m[2]}</div>`);
    return { e, t: m[3] };
  });
  return t => {
    const kq = p(t, K.te - 0.14, 0.3, E.inOutCubic);
    set(grp, { s: lerp(1, 0.6, kq), y: -kq * 150 });
    set(t0, { s: lerp(1.4, 1, p(t, T(60.5), 0.2)), o: 1 }); t0.style.textShadow = glitch(t, T(60.5), 0.25);
    L.forEach((s, i) => { const k = p(t, T(61.12) + i * 0.05, 0.3); s.style.opacity = f1(lerp(1, 0.18 + 0.12 * Math.sin(t * 7 + i), k) * 100) / 100; });
    set(t1, { s: pop(t, T(60.6), 0.4), o: t < T(60.6) ? 0 : 1 });
    set(lup, { x: Math.sin(t * 2.5) * 160 - 120 + kq * 900, y: Math.cos(t * 3) * 40, r: -10, s: 0.9, o: kq < 1 ? 1 : 0 });
    popA(q, t, K.te - 0.06, { rise: 40 }); paint(qhl, t, K.creias, 0.3);
    [[bS, K.si], [bN, K.noB]].forEach(([b, tw], i) => {
      const t0b = K.te + 0.05 + i * 0.12, press = i === 0 && t > K.si + 0.3 && t < K.si + 0.45;
      const puls = t > tw ? 1 + 0.07 * Math.max(0, Math.sin((t - tw) * 10)) * (1 - p(t, tw + 0.6, 0.3)) : 1;
      set(b, { s: pop(t, t0b, 0.4) * (press ? 0.9 : puls), r: [-3, 3][i], o: t < t0b ? 0 : 1 });
    });
    set(hand, { o: t > K.si - 0.05 ? 1 : 0, y: (t > K.si + 0.3 && t < K.si + 0.45 ? 16 : 0) + Math.sin(t * 5) * 6, s: pop(t, K.si - 0.05, 0.3) });
    CM.forEach(m => popA(m.e, t, m.t, { rise: 40 }));
  };
});

/* ======================================================================
   C · «SOY TU VECINO…» — El Vecino en su balcón (~1,5 s)
   ====================================================================== */
{
  const [T0, T1] = S9.C;
  const c = scene(T0, T1, t => {
    const ex = p(t, T1 - 0.24, 0.24, E.inCubic);
    set(cam, { s: lerp(1.04 + 0.05 * p(t, T0, T1 - T0, E.linear), 3.4, ex) });
    const lean = p(t, K.vecino, 0.4, E.inOutCubic);
    set(vec.d, { s: 1 + lean * 0.06, y: wobble(t, 0.5, 3) - lean * 16 });
    const fanFast = t > T0 + 0.1 && t < T0 + 0.7;
    vecFace(vec, t, { jaw: talkW(t, 'VECINO'), look: t > K.vecino + 0.3 ? [-4, 3] : [0, -4], bL: fanFast ? 8 : 4, bR: fanFast ? 8 : 10, fan: fanFast ? Math.sin(t * 22) * 14 : wobble(t, 0.9, 6), seed: 0.3 });
    const ks = p(t, T0 + 0.02, 0.5, E.outElastic); set(sign, { y: (1 - clamp(ks)) * -320, r: Math.sin(t * 2.4) * 1.5 + (1 - ks) * 8, o: t < T0 ? 0 : 1 });
    sw.forEach(q => set(q.e, { o: t >= q.t - 0.05 ? 1 : 0, y: (1 - p(t, q.t - 0.05, 0.2, E.outBack)) * 30 }));
    paint(sHL, t, K.vecino + 0.1, 0.3);
    pots.forEach((pt, i) => set(pt, { r: wobble(t, 0.7, 1.5, i) }));
    set(bk, { s: pop(t, K.vecino + 0.25, 0.4), r: -8 + wobble(t, 1, 3), o: t < K.vecino + 0.25 ? 0 : 1 });
  }, { clip: true, cut: true });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '795px 1095px' });
  sceneBg(cam, { background: '#E9C6BE', backgroundImage: 'repeating-linear-gradient(0deg, rgba(43,33,24,.13) 0 3px, transparent 3px 58px), repeating-linear-gradient(90deg, rgba(43,33,24,.07) 0 3px, transparent 3px 116px)' });
  const win = box(cam, 0, 0, 1080, 1920); {
    const arch = 'M160,1300 L160,640 Q160,450 540,440 Q920,450 920,640 L920,1300 Z';
    let lace = ''; for (let y = 560; y < 1250; y += 26) lace += `<path d="M${f1(176 + Math.sin(y * 0.05) * 6)},${y} q22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/><path d="M${f1(904 - Math.sin(y * 0.05) * 6)},${y} q-22,13 0,26" stroke="${INK}" stroke-width="1.6" fill="none" opacity=".6"/>`;
    win.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">
    <rect x="12" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/><rect x="928" y="520" width="140" height="760" rx="8" fill="${WOOD}" stroke="${INK}" stroke-width="5"/>
    ${[...Array(14)].map((_, k) => `<path d="M24,${560 + k * 50} h116 M940,${560 + k * 50} h116" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="${arch}" fill="#fff" stroke="#fff" stroke-width="40"/><path d="${arch}" fill="#3a2a1e" stroke="${INK}" stroke-width="8"/><path d="${arch}" fill="url(#hW)" opacity=".25"/>
    <path d="M168,600 C230,700 230,1100 200,1290 L168,1290 Z M912,600 C850,700 850,1100 880,1290 L912,1290 Z" fill="#FBF6EA" stroke="${INK}" stroke-width="3"/>${lace}</svg>`;
  }
  const vec = mkVec(cam, [190, 430, 700, 867]);
  const rail = box(cam, 0, 0, 1080, 1920); {
    let bars = ''; for (let x = 140; x <= 940; x += 40) bars += `<path d="M${x},1206 V1330" stroke="${INK}" stroke-width="9"/><circle cx="${x}" cy="1268" r="9" fill="none" stroke="${INK}" stroke-width="4"/>`;
    rail.innerHTML = `<svg width="1080" height="1920" style="overflow:visible"><rect x="110" y="1180" width="860" height="30" rx="8" fill="${INK}"/>${bars}<rect x="110" y="1322" width="860" height="40" fill="${INK}"/><rect x="80" y="1352" width="920" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="5"/></svg>`;
  }
  const pots = [];
  [[130, 1040], [760, 1040]].forEach(q => {
    const d = box(cam, q[0], q[1], 200, 160); let fl = '';
    [[40, 40], [80, 20], [120, 34], [160, 48], [70, 60], [130, 64]].forEach((f, j) => { fl += `<g><path d="M${f[0]},${f[1] + 30} L100,120" stroke="#3c5a2a" stroke-width="5"/><circle cx="${f[0]}" cy="${f[1]}" r="24" fill="${j % 2 ? RED : PINK}" stroke="${INK}" stroke-width="3.5"/><circle cx="${f[0] - 8}" cy="${f[1] - 6}" r="9" fill="#fff" opacity=".45"/><circle cx="${f[0]}" cy="${f[1]}" r="5" fill="${YEL}" stroke="${INK}" stroke-width="2"/></g>`; });
    [[30, 96], [170, 96], [60, 110], [140, 110]].forEach(l => fl += `<ellipse cx="${l[0]}" cy="${l[1]}" rx="30" ry="14" fill="#7a9a52" stroke="${INK}" stroke-width="3" transform="rotate(${l[0] < 100 ? -20 : 20} ${l[0]} ${l[1]})"/>`);
    d.innerHTML = `<svg viewBox="0 0 200 160" width="200" height="160" style="overflow:visible">${fl}${cut('<path d="M30,110 L170,110 L156,160 L44,160 Z"/>', 5, 6)}<path d="M30,110 L170,110 L156,160 L44,160 Z" fill="#C1663A" stroke="${INK}" stroke-width="4"/><path d="M30,110 L170,110 L156,160 L44,160 Z" fill="url(#hA)" opacity=".5"/><rect x="24" y="104" width="152" height="16" rx="4" fill="#C1663A" stroke="${INK}" stroke-width="4"/></svg>`;
    pots.push(d);
  });
  const sign = box(cam, 120, 150, 840, 270, { zIndex: 40 });
  sign.innerHTML = `<svg width="840" height="270" style="position:absolute;left:0;top:0;overflow:visible"><path d="M160,0 L200,40 M680,0 L640,40" stroke="${INK}" stroke-width="5"/>${cut('<rect x="20" y="40" width="800" height="226" rx="22"/>')}<rect x="20" y="40" width="800" height="226" rx="22" fill="#FBF6EA" stroke="${INK}" stroke-width="6"/><rect x="36" y="56" width="768" height="194" rx="14" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
  const sl1 = el('div', sign, { left: '0', top: '62px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 800, fontSize: '76px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sl2 = el('div', sign, { left: '0', top: '146px', width: '840px', textAlign: 'center', fontFamily: 'Playfair', fontWeight: 900, fontSize: '90px', lineHeight: 1, color: INK, whiteSpace: 'nowrap' });
  const sw = [];
  [['Soy', 0, sl1], ['tu', 1, sl1], ['vecino…', 2, sl2]].forEach(([wd, k, ln]) => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.style.margin = '0 0.12em'; s.style.position = 'relative'; s.innerHTML = k === 2 ? hlSpan(wd, 'shl') : wd; ln.appendChild(s); sw.push({ e: s, t: W[K.isoy + k].s }); });
  const sHL = sign.querySelector('.shl');
  const bk = box(cam, 680, 1010, 230, 170, { zIndex: 30 });
  bk.innerHTML = `<svg viewBox="0 0 230 170" width="230" height="170" style="overflow:visible">${cut('<rect x="10" y="20" width="210" height="140" rx="10"/>')}<rect x="10" y="20" width="210" height="140" rx="10" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="24" y="32" width="182" height="116" rx="6" fill="none" stroke="#c9a24a" stroke-width="3"/><text x="115" y="104" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="34" fill="#e9c75c">HISTORIA</text></svg>`;
}

/* ======================================================================
   L · «…Y ESTO NO VENÍA EN EL LIBRO.» — el libro se cierra de golpe
   ====================================================================== */
headline(S9.L[0], LOOP, '…y esto no venía en el *libro.*', { size: 84, hlT: K.libro });
{
  const TC = K.libro - 0.05;
  const c = scene(S9.L[0], S9.L[1], t => {
    const k = p(t, TC, 0.3, E.inCubic); const sx = 1 - 2 * k;
    flap.setAttribute('transform', `matrix(${f1(sx * 1000) / 1000},0,0,1,${f1(540 * (1 - sx))},0)`);
    pageF.style.display = sx > 0 ? '' : 'none'; coverF.style.display = sx <= 0 ? '' : 'none';
    const closed = t > TC + 0.3;
    set(bookW, { s: (1.2 + 0.06 * p(t, S9.L[0], TC - S9.L[0], E.linear)) * pop(t, S9.L[0] + 0.01, 0.3) * (1 + (closed ? 0.07 * (1 - p(t, TC + 0.3, 0.3)) : 0)), o: 1 });
    stampA(mito, t, K.noV, -10, 1); mito.style.display = sx > 0.2 ? '' : 'none';
    dust.forEach((s, i) => { const kd = p(t, TC + 0.3, 0.45, E.outCubic); set(s, { x: (i - 2.5) * 110 * kd, y: -kd * 120 + kd * kd * 60, o: closed ? 1 - kd * 0.6 : 0, s: 0.6 + kd }); });
    popA(epl, t, TC + 0.3, { r: -1 });
  }, { cut: true });
  const bookW = box(c, 0, 0, 1080, 1920, { transformOrigin: '540px 900px' });
  const bs = svgLayer(bookW, 1);
  let lines = ''; for (let i = 0; i < 8; i++) lines += `<path d="M180,${930 + i * 30} H${i % 4 === 3 ? 420 : 500}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  let lines2 = ''; for (let i = 0; i < 14; i++) lines2 += `<path d="M580,${700 + i * 30} H${i % 5 === 4 ? 790 : 900}" stroke="${INK}" stroke-width="5" opacity=".55"/>`;
  bs.innerHTML = `<g>${cut('<rect x="110" y="630" width="440" height="570" rx="14"/>')}<rect x="110" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/></g>
   <rect x="130" y="646" width="410" height="536" fill="#F7F0E0" stroke="${INK}" stroke-width="4"/><rect x="130" y="646" width="410" height="536" fill="url(#hP)" opacity=".5"/>
   <text x="335" y="720" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="44" fill="${INK}">GRANDES</text><text x="335" y="760" text-anchor="middle" font-family="Playfair" font-style="italic" font-weight="700" font-size="36" fill="${INK}">mitos</text>
   <g transform="translate(170,780)"><rect width="330" height="130" fill="#E7D8B6" stroke="${INK}" stroke-width="3"/>${clipG(uid('bm'), 'M0,0 h330 v130 h-330 Z', ridge(111, 120, 50, 6, '#DDC9A0', 330) + wallStroke('M-10,120 Q80,70 160,86 T340,50', 9))}</g>${lines}
   <g class="flap">${cut('<rect x="530" y="630" width="440" height="570" rx="14"/>')}<rect x="530" y="630" width="440" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><g class="pageF"><rect x="540" y="646" width="410" height="536" fill="#FBF6EA" stroke="${INK}" stroke-width="4"/>${lines2}</g>
    <g class="coverF"><rect x="540" y="630" width="430" height="570" rx="14" fill="${LEATHER}" stroke="${INK}" stroke-width="5"/><rect x="566" y="656" width="378" height="518" rx="8" fill="none" stroke="#c9a24a" stroke-width="4"/>
    <g transform="translate(1510,0) scale(-1,1)"><text x="755" y="860" text-anchor="middle" font-family="Playfair" font-weight="900" font-size="64" fill="#e9c75c">HISTORIA</text><text x="755" y="920" text-anchor="middle" font-family="Rye" font-size="30" fill="#e9c75c">Tomo I</text></g></g></g>`;
  const flap = bs.querySelector('.flap'), pageF = bs.querySelector('.pageF'), coverF = bs.querySelector('.coverF');
  const mito = stamp(bookW, 190, 800, 'MITO', { size: 84, bw: 9, z: 4, bg: 'rgba(255,255,255,.85)', blend: 'normal' });
  const dust = []; for (let i = 0; i < 6; i++) { const d = box(bookW, 500, 1130, 80, 60, { zIndex: 3 }); d.innerHTML = `<svg width="80" height="60" style="overflow:visible"><path d="M10,50 q-6,-26 20,-26 q8,-22 30,-8 q20,0 16,34 Z" fill="${PAPER}" stroke="${INK}" stroke-width="3"/></svg>`; dust.push(d); }
  const epl = el('div', c, { left: '0', top: '1240px', width: '1080px', textAlign: 'center', zIndex: 30 }, `<span style="display:inline-block;font-family:Playfair;font-weight:800;font-size:40px;color:#fff;background:${INK};padding:8px 26px 12px;border-radius:12px;box-shadow:5px 5px 0 ${PINK}">Ep. 8 · La muralla invisible</span>`);
}
