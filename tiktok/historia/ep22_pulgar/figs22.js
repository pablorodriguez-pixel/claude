/* Ep. 22 · figuras nuevas: mano del Vecino señalando a cámara, móvil con pulgar, botón de like, historiadores */

/* ---- MANO ENGUANTADA QUE SEÑALA A CÁMARA (estilo «I want YOU») viewBox -220 -220 440 440 ----
   la manga entra por abajo-derecha; el índice apunta al espectador (yema grande en primer plano) */
function pointInner(o = {}) {
  const sleeveC = o.sleeve || '#d9c7a6';
  const sleeve = limb(250, 330, 90, 120, 96, 78);
  const cuff = 'M30,90 C60,50 140,70 154,120 C164,160 130,190 92,190 C50,188 16,140 30,90 Z';
  const fist = 'M-50,20 C-60,-30 -10,-50 40,-46 C100,-42 140,0 136,60 C132,120 90,150 40,150 C-20,150 -44,90 -50,20 Z';
  // dedo índice en escorzo: se ensancha hacia el espectador
  const fin = 'M-30,10 C-40,-30 -70,-80 -110,-110 L-20,-150 C10,-110 30,-60 40,-20 Z';
  const tip = 'M-148,-112 a84,76 0 1,0 168,0 a84,76 0 1,0 -168,0';
  const nail = 'M-104,-150 C-96,-178 -40,-182 -28,-156 C-22,-136 -50,-124 -70,-124 C-92,-124 -108,-134 -104,-150 Z';
  let s = cut(P(sleeve) + P(cuff) + P(fist) + P(fin) + P(tip), 10, 12);
  s += D(sleeve, sleeveC, 4) + clipG(uid('ps'), sleeve, `<rect x="0" y="0" width="360" height="400" fill="url(#hA)" opacity=".8"/><rect x="150" y="100" width="200" height="400" fill="url(#hD)"/>`);
  s += D(cuff, '#fff', 4) + `<path d="M44,100 C70,74 130,86 146,124" stroke="${INK}" stroke-width="2" stroke-dasharray="5 6" fill="none"/><circle cx="120" cy="170" r="8" fill="${BRASS}" stroke="${INK}" stroke-width="3"/>`;
  s += D(fist, '#fff', 4) + clipG(uid('pf'), fist, `<ellipse cx="120" cy="80" rx="40" ry="90" fill="url(#hA)" opacity=".7"/>`);
  // dedos doblados (vistos de frente, como el puño de grabado)
  [[0, 40], [10, 80], [24, 118]].forEach(([dx, y]) => { const d = `M${-30 + dx},${y} Q${-30 + dx},${y - 18} ${-12 + dx},${y - 18} L${100 - dx / 2},${y - 18} Q${118 - dx / 2},${y - 18} ${118 - dx / 2},${y} Q${118 - dx / 2},${y + 18} ${100 - dx / 2},${y + 18} L${-12 + dx},${y + 18} Q${-30 + dx},${y + 18} ${-30 + dx},${y} Z`; s += D(d, '#fff', 3.5) + `<path d="M${88 - dx / 2},${y - 16} q12,8 0,32" stroke="${INK}" stroke-width="2" fill="none"/>`; });
  s += D(fin, '#fff', 4) + clipG(uid('pi'), fin, `<rect x="-40" y="-150" width="90" height="170" fill="url(#hA)" opacity=".6"/>`) + `<path d="M-14,-40 q-20,8 -40,2 M-32,-80 q-22,10 -46,2" stroke="${INK}" stroke-width="2.4" fill="none"/>`;
  // yema gigante en primer plano + uña
  s += D(tip, '#fff', 6) + clipG(uid('pt'), tip, `<ellipse cx="-10" cy="-80" rx="50" ry="60" fill="url(#hA)" opacity=".7"/><ellipse cx="-70" cy="-40" rx="80" ry="20" fill="url(#hB)" opacity=".45"/>`);
  s += D(nail, '#fff', 3.5) + `<path d="M-94,-150 q30,-16 56,-2" stroke="${INK}" stroke-width="1.8" fill="none"/><ellipse cx="-80" cy="-160" rx="12" ry="5" fill="#fff" stroke="none"/>`;
  s += `<path d="M-120,-96 q30,14 64,10 M-118,-76 q34,14 70,8" stroke="${INK}" stroke-width="2.2" fill="none" opacity=".6"/>`;
  return s;
}
const pointSvg = (sz) => `<svg viewBox="-220 -220 440 440" width="${sz}" height="${sz}" style="overflow:visible;display:block">${pointInner()}</svg>`;

/* ---- VECINO EN PRIMER PLANO: busto grande + mano que señala + líneas de impacto ---- */
function vecCloseUp(c, o = {}) {
  sceneBg(c, { background: `repeating-linear-gradient(90deg, #F4CFDA 0 46px, #F9E3EA 46px 92px)` });
  const ry = rays(c, -420, 120, 1920, 30, 'rgba(255,62,165,.22)', 'transparent', 1);
  box(c, 0, 0, 1080, 1920, { background: 'radial-gradient(circle at 42% 40%, rgba(255,255,255,.55), rgba(120,40,60,.28) 85%)', zIndex: 2 });
  const cam = box(c, 0, 0, 1080, 1920, { transformOrigin: '400px 700px', zIndex: 3 });
  const VS = 1100 / 420, VX = -110, VY = 40;
  const v = mkVec(cam, [VX, VY, 1100, 1362]);
  box(cam, VX + 22 * VS, VY + 510 * VS, 376 * VS, 1920, { zIndex: 4, background: '#d9c7a6', backgroundImage: 'repeating-linear-gradient(-52deg, rgba(43,33,24,.75) 0 1.6px, transparent 1.6px 6px)' });
  [0, 1].forEach(k => box(cam, VX + 202 * VS, VY + 548 * VS + k * 36 * VS, 14 * VS, 14 * VS, { zIndex: 5, borderRadius: '50%', background: BRASS, border: `5px solid ${INK}` }));
  box(cam, VX + 205 * VS, VY + 504 * VS, 10 * VS, 1920, { zIndex: 4, background: 'repeating-linear-gradient(0deg, transparent 0 60px, rgba(0,0,0,0) 60px 100px)', borderLeft: `4px solid ${INK}` });
  const hand = box(cam, 440, 760, 600, 600, { zIndex: 6, transformOrigin: '213px 147px' }); hand.innerHTML = pointSvg(600);
  // líneas de velocidad alrededor de la yema
  const zl = box(cam, 0, 0, 1080, 1920, { zIndex: 5 });
  { let l = ''; for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + 0.2, r0 = 150, r1 = 240 + (k % 3) * 40; l += `<path d="M${f1(652 + Math.cos(a) * r0)},${f1(907 + Math.sin(a) * r0 * 0.9)} L${f1(652 + Math.cos(a) * r1)},${f1(907 + Math.sin(a) * r1 * 0.9)}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`; } zl.innerHTML = `<svg width="1080" height="1920" style="overflow:visible">${l}</svg>`; }
  return { cam, v, hand, zl, ry };
}

/* ---- MÓVIL (viewBox 0 0 500 960) ---- */
function phoneBodySvg() {
  const body = 'M60,0 H440 Q500,0 500,60 V900 Q500,960 440,960 H60 Q0,960 0,900 V60 Q0,0 60,0 Z';
  return `<svg viewBox="0 0 500 960" width="100%" height="100%" style="overflow:visible;position:absolute;left:0;top:0">${cut(P(body), 12, 14)}<path d="${body}" fill="#1d1712" stroke="${INK}" stroke-width="6"/><path d="${body}" fill="url(#hW)" opacity=".18"/>
  <rect x="190" y="26" width="120" height="22" rx="11" fill="#000"/><circle cx="330" cy="37" r="7" fill="#333"/><path d="M500,220 v90 M500,340 v60" stroke="${INK}" stroke-width="10"/></svg>`;
}
/* mano de grabado que sujeta el móvil; el pulgar (.thumb, pivote 470,900) queda SOBRE la pantalla */
function holdHandInner() {
  const sleeve = 'M380,1060 L640,900 L760,1140 L470,1300 Z';
  const palm = 'M300,1010 C290,900 360,820 470,800 C560,790 620,860 610,960 C600,1060 520,1120 420,1120 C350,1120 306,1080 300,1010 Z';
  const fings = [[-20, 430, 40], [-26, 540, 42], [-24, 650, 40], [-14, 752, 36]];
  let fs = '', fsil = '';
  fings.forEach(([x, y, w]) => { const d = `M${x + 50},${y - w / 2} C${x + 8},${y - w / 2 - 6} ${x - 10},${y - 10} ${x},${y + 4} C${x + 4},${y + w / 2 + 6} ${x + 30},${y + w / 2 + 4} ${x + 50},${y + w / 2} Z`; fsil += P(d); fs += D(d, FIG, 3.5) + `<path d="M${x + 6},${y - 6} q8,6 4,16" stroke="${INK}" stroke-width="2" fill="none"/>`; });
  const th = 'M440,900 C400,860 330,780 286,700 C270,670 292,646 318,656 C352,670 420,760 500,850 Z';
  const nail = 'M290,676 C286,662 300,652 312,660 C322,668 316,684 304,686 Z';
  let s = cut(P(sleeve) + P(palm) + fsil, 8, 10);
  s += D(sleeve, '#3a2a1e', 4) + clipG(uid('hs'), sleeve, `<rect x="360" y="880" width="420" height="440" fill="url(#hW)" opacity=".4"/>`) + `<path d="M400,1050 L640,910" stroke="#fff" stroke-width="16"/><path d="M400,1050 L640,910" stroke="${INK}" stroke-width="3"/>`;
  s += fs;
  s += D(palm, FIG, 4) + clipG(uid('hp'), palm, `<ellipse cx="560" cy="980" rx="70" ry="140" fill="url(#hA)"/><ellipse cx="420" cy="1100" rx="140" ry="40" fill="url(#hB)" opacity=".6"/>`);
  s += `<path d="M360,960 q60,30 140,10 M380,1010 q50,20 110,6" stroke="${INK}" stroke-width="2.5" fill="none"/>`;
  s += `<g class="thumb">${cut(P(th), 6, 8)}${D(th, FIG, 4)}${clipG(uid('ht'), th, `<rect x="380" y="700" width="140" height="220" fill="url(#hA)"/>`)}${D(nail, '#f7e9e0', 2.5)}<path d="M350,770 q14,-4 22,8 M380,806 q14,-4 22,8" stroke="${INK}" stroke-width="2.2" fill="none"/></g>`;
  return s;
}

/* ---- BOTÓN DE LIKE (pulgar arriba de grabado en un círculo) ---- */
const likeSvg = (sz, bg = '#fff') => `<svg viewBox="-130 -130 260 260" width="${sz}" height="${sz}" style="overflow:visible;display:block"><circle cx="10" cy="12" r="118" fill="${SH}"/><circle cx="0" cy="0" r="118" fill="${bg}" stroke="${INK}" stroke-width="9"/><circle cx="0" cy="0" r="100" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="6 7"/><g transform="translate(0,22) rotate(180) scale(0.62)">${fistInner()}</g></svg>`;
/* puño suelto rotado (pulgar arriba si r=180) */
const fistRot = (sz, r) => `<svg viewBox="-170 -170 340 340" width="${sz}" height="${sz}" style="overflow:visible;display:block"><g transform="rotate(${r}) translate(0,-40)">${fistInner()}</g></svg>`;

/* ---- gafas redondas de historiador (sobre bustInner, viewBox 0 0 360 460) ---- */
const specs = `<g><circle cx="156" cy="204" r="22" fill="rgba(255,255,255,.25)" stroke="${INK}" stroke-width="5"/><circle cx="204" cy="204" r="22" fill="rgba(255,255,255,.25)" stroke="${INK}" stroke-width="5"/><path d="M178,202 h4 M134,200 L116,196 M226,200 L244,196" stroke="${INK}" stroke-width="5"/></g>`;
