/* =================== CHAT «OPERACIÓN EMÚ 🐦» (de época) =================== */
const NAMES = { MEREDITH: 'Mayor Meredith', MINISTRO: 'Ministro de Defensa' };
function mkChat(parent, x, y, w, rows, o = {}) {
  const wrap = box(parent, x, y, w, o.h || 520, { zIndex: 60 });
  // carcasa de madera y latón
  box(wrap, 0, 0, w, o.h || 520, { background: WOOD, border: `6px solid ${INK}`, borderRadius: '30px', boxShadow: `10px 12px 0 ${SH}`, backgroundImage: 'repeating-linear-gradient(92deg, rgba(43,33,24,.18) 0 2px, transparent 2px 13px)' });
  [[18, 18], [w - 34, 18], [18, (o.h || 520) - 34], [w - 34, (o.h || 520) - 34]].forEach(q => box(wrap, q[0], q[1], 16, 16, { borderRadius: '50%', background: BRASS, border: `3px solid ${INK}` }));
  const hd = box(wrap, 30, 22, w - 60, 92, { background: INK, borderRadius: '16px', border: `3px solid ${BRASS}` });
  const gav = box(hd, 12, 10, 70, 70, { borderRadius: '50%', overflow: 'hidden', background: YEL, border: `3px solid ${BRASS}` }); gav.innerHTML = cropUse('emuS', '50 30 150 110');
  el('div', hd, { left: '96px', top: '6px', fontFamily: 'Rye', fontSize: '36px', color: YEL, whiteSpace: 'nowrap' }, 'OPERACIÓN EMÚ 🐦');
  el('div', hd, { left: '98px', top: '50px', fontFamily: 'SpecialElite', fontSize: '24px', color: PAPER, whiteSpace: 'nowrap' }, 'Meredith, Ministro y 2 soldados');
  const body = box(wrap, 30, 126, w - 60, (o.h || 520) - 152, { background: '#F2E3B3', borderRadius: '14px', border: `3px solid ${INK}`, overflow: 'hidden', backgroundImage: `repeating-linear-gradient(0deg, rgba(43,33,24,.08) 0 2px, transparent 2px 34px)` });
  const R = [];
  let yy = 18;
  rows.forEach(r => {
    const rw = box(body, 0, yy, w - 60, r.h || 110);
    const mine = false;
    avatar(rw, 14, 4, 76, r.who, { bw: 3 });
    el('div', rw, { left: '104px', top: '0px', fontFamily: 'Bricolage', fontWeight: 800, fontSize: '22px', color: r.who === 'MINISTRO' ? RED : '#5a3d22', whiteSpace: 'nowrap' }, NAMES[r.who]);
    const bub = box(rw, 100, 28, 0, 0, { width: 'auto', height: 'auto', maxWidth: px(w - 190), background: '#fff', border: `3px solid ${INK}`, borderRadius: '6px 26px 26px 26px', padding: '10px 22px 12px', fontFamily: 'SpecialElite', fontSize: px(r.fs || 40), lineHeight: 1.15, color: INK, boxShadow: `4px 4px 0 ${SH}` });
    const ty = box(rw, 100, 28, 230, 62, { background: '#fff', border: `3px solid ${INK}`, borderRadius: '6px 26px 26px 26px', fontFamily: 'SpecialElite', fontSize: '26px', color: '#7a6a58', boxShadow: `4px 4px 0 ${SH}` });
    ty.innerHTML = `<span style="position:absolute;left:18px;top:14px;white-space:nowrap">escribiendo</span>` + [0, 1, 2].map(k => `<span class="dot" style="position:absolute;left:${168 + k * 16}px;top:30px;width:10px;height:10px;border-radius:50%;background:${INK}"></span>`).join('');
    const dots = [...ty.querySelectorAll('.dot')];
    const ws = [];
    if (r.words) { for (let i = r.words[0]; i <= r.words[1]; i++) { const sp = document.createElement('span'); sp.textContent = (i > r.words[0] ? ' ' : '') + W[i].w; bub.appendChild(sp); ws.push({ sp, t: W[i].s }); } }
    else bub.textContent = r.text;
    if (r.emoji) { const sp = document.createElement('span'); sp.textContent = ' ' + r.emoji; bub.appendChild(sp); ws.push({ sp, t: r.emojiT || (W[r.words[1]].e) }); }
    R.push({ rw, bub, ty, dots, ws, r });
    yy += (r.h || 110) + 8;
  });
  const ch = chip(wrap, w - 330, -30, 'recreación con humor', { size: 26, bg: PINK, z: 80 }); ch.style.transform = 'rotate(3deg)';
  return {
    wrap, update(t, tin, tout) {
      const k = p(t, tin, 0.35, E.outBack), ko = p(t, tout - 0.25, 0.25, E.inCubic);
      set(wrap, { y: (1 - k) * 900 - ko * 1100, r: -1 + ko * -6, o: t < tin || t > tout ? 0 : 1 });
      set(ch, { r: 3 + wobble(t, 0.8, 2), s: 1 });
      R.forEach(m => {
        const r = m.r, typing = r.ty != null && t >= r.ty && t < r.t;
        m.ty.style.visibility = typing ? 'visible' : 'hidden';
        m.dots.forEach((d, i) => set(d, { y: -Math.max(0, Math.sin(t * 14 - i * 0.9)) * 9 }));
        if (typing) set(m.ty, { s: pop(t, r.ty, 0.3), o: 1 });
        const on = r.old || t >= r.t; m.bub.style.visibility = on ? 'visible' : 'hidden';
        m.rw.querySelector('div').style.visibility = (on || typing) ? 'visible' : 'hidden';
        m.rw.children[1].style.visibility = (on || typing) ? 'visible' : 'hidden';
        if (on && !r.old) set(m.bub, { s: pop(t, r.t, 0.35), o: 1 });
        m.rw.style.opacity = r.old ? 0.55 : 1;
        m.ws.forEach(q => q.sp.style.opacity = (r.old || t >= q.t - 0.05) ? 1 : 0.15);
      });
    },
  };
}

/* =================== LA VECINA en su marco ovalado =================== */
const OV = { x: 40, y: 962, w: 330, h: 362 };
const ovalW = box(world, OV.x, OV.y, OV.w, OV.h, { zIndex: 850 });
const ovIn = box(ovalW, 16, 16, OV.w - 32, OV.h - 32, { borderRadius: '50%', overflow: 'hidden', background: `repeating-linear-gradient(90deg, #F4CFDA 0 16px, #F9E3EA 16px 32px)` });
box(ovIn, 0, 0, OV.w - 32, OV.h - 32, { background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.5), rgba(120,40,60,.25) 90%)' });
const vecO = mkVec(ovIn, [-48, -18, 396, 490]);
const ovFrame = box(ovalW, -20, -36, OV.w + 40, OV.h + 80);
{
  const cx = (OV.w + 40) / 2, cy = 36 + OV.h / 2, rx = OV.w / 2 - 4, ry = OV.h / 2 - 4;
  let beads = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; beads += `<circle cx="${f1(cx + Math.cos(a) * (rx + 2))}" cy="${f1(cy + Math.sin(a) * (ry + 2))}" r="4.5" fill="#f3d27a" stroke="${INK}" stroke-width="1.5"/>`; }
  ovFrame.innerHTML = `<svg width="${OV.w + 40}" height="${OV.h + 80}" style="overflow:visible">
  <ellipse cx="${cx + 8}" cy="${cy + 10}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="${SH}" stroke-width="26"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 14}" ry="${ry + 14}" fill="none" stroke="#fff" stroke-width="34"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${INK}" stroke-width="24"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="${BRASS}" stroke-width="17"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx + 2}" ry="${ry + 2}" fill="none" stroke="url(#hA)" stroke-width="17" opacity=".6"/>${beads}
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="none" stroke="${INK}" stroke-width="3"/>
  <g transform="translate(${cx},24)"><path d="M-46,22 C-40,-6 -14,-12 0,-24 C14,-12 40,-6 46,22 Z" fill="${BRASS}" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="3"/><path d="M-30,16 q30,-14 60,0" stroke="${INK}" stroke-width="2" fill="none"/></g>
  <g transform="translate(${cx},${OV.h + 60})"><rect x="-104" y="-26" width="208" height="46" rx="10" fill="${INK}" stroke="${BRASS}" stroke-width="4"/><text x="0" y="8" text-anchor="middle" font-family="Rye" font-size="25" fill="${YEL}">EL VECINO</text></g></svg>`;
}

/* =================== HUMILLÓMETRO =================== */
const MW = 224, MH = MW * 860 / 320;
const meterW = box(world, 708, 400, MW, MH, { zIndex: 720 });
meterW.innerHTML = svgW(meterInner(), '0 0 320 860');
const mLiq = meterW.querySelector('.liq'), mLiq2 = meterW.querySelector('.liq2'), mPtr = meterW.querySelector('.ptr'), mBell = meterW.querySelector('.bell'), mHL = [...meterW.querySelectorAll('.lvhl')];
const FAILS = [43.45, 52.5, 61.75, 72.4];
const LV_LBL = ['¡BOCHORNO!', '¡RIDÍCULO!', '¡VERGÜENZA AJENA!'];
const lvLbl = LV_LBL.map((s, i) => stamp(world, [330, 330, 70][i], 610, s, { size: 54, bw: 8, z: 721, bg: 'rgba(255,255,255,.85)', blend: 'normal' }));
const meterBoom = box(world, 0, 0, 1080, 1920, { zIndex: 719 });
const mbRays = rays(meterBoom, -180, 180, 1440, 28, YEL, PINK, 0);
const mbStamp = stamp(world, 120, 600, 'HUMILLACIÓN<br>NACIONAL', { size: 100, bw: 12, z: 760, bg: 'rgba(255,255,255,.92)', blend: 'normal' }); mbStamp.style.textAlign = 'center'; mbStamp.style.lineHeight = '1';

/* =================== EL EMÚ QUE MIRA A CÁMARA =================== */
const LOOKS = [[43.8, 0.68], [52.78, 0.66], [62.04, 0.66], [92.82, 0.95, 'yawn']];
const lookW = box(world, 0, 0, 1080, 1920, { zIndex: 800, overflow: 'hidden' });
sceneBg(lookW, { background: PAPER });
box(lookW, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 50% 42%, rgba(255,240,200,.0) 25%, rgba(60,35,10,.55) 80%)', zIndex: 5 });
const lookCam = box(lookW, 0, 0, 1080, 1920, { zIndex: 2, transformOrigin: '540px 560px' });
const lookProf = mkEmu(lookCam, [70, 250, 1300, 1950], { seed: 91 });
const lookFront = mkEmuF(lookCam, [140, 300, 800, 1200]);
const lookTag = el('div', lookW, { left: '70px', top: '1210px', fontFamily: 'SpecialElite', fontSize: '34px', color: PAPER, background: INK, padding: '6px 18px', zIndex: 6, whiteSpace: 'nowrap' }, '● REC');
const lookZz = el('div', lookCam, { left: '640px', top: '330px', fontFamily: 'Playfair', fontStyle: 'italic', fontWeight: 900, fontSize: '90px', color: INK, zIndex: 3, whiteSpace: 'nowrap' }, 'aaaaah…');
function updLook(t) {
  let cur = null; LOOKS.forEach(L => { if (t >= L[0] && t < L[0] + L[1]) cur = L; });
  lookW.style.display = cur ? '' : 'none'; if (!cur) return false;
  const k = t - cur[0];
  const turn = clamp((k - 0.1) / 0.14);
  set(lookProf.d, { sx: Math.max(0.001, 1 - turn * 2), o: turn < 0.5 ? 1 : 0, x: 0 });
  set(lookFront.d, { sx: Math.max(0.001, (turn - 0.5) * 2), o: turn >= 0.5 ? 1 : 0 });
  face(lookProf, t, { half: true, look: [-2, 1], blink: false });
  const yawn = cur[2] ? Math.sin(clamp((k - 0.3) / 0.6) * Math.PI) : 0;
  face(lookFront, t, { half: !yawn || yawn < 0.4, closed: yawn > 0.4, blink: false, bR: k > 0.32 ? 22 * p(t, cur[0] + 0.32, 0.12, E.outBack) : 0, bL: yawn * 10, jaw: yawn * 1.6 });
  set(lookCam, { s: 1 + 0.12 * p(t, cur[0] + 0.24, 0.5, E.outCubic) });
  lookZz.style.visibility = yawn > 0.3 ? 'visible' : 'hidden'; set(lookZz, { y: -yawn * 30, s: 0.8 + yawn * 0.3 });
  lookTag.style.opacity = Math.sin(t * 9) > 0 ? 1 : 0.4;
  return true;
}
