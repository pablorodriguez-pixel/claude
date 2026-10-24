/* Ep. 10 — estrellas del congelador: ilustraciones nuevas */
A.star5 = (fill = '#FFD66B', stroke = INK, sw = 6) => `<svg viewBox="-60 -60 120 120" width="120" height="120" style="overflow:visible"><path d="M0 -50 L14.7 -17.8 L49.5 -15.4 L22.8 7.2 L31 41 L0 22.5 L-31 41 L-22.8 7.2 L-49.5 -15.4 L-14.7 -17.8 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
A.starsRow = (n, total = 4, sz = 52) => Array.from({ length: total }, (_, i) => `<span style="display:inline-block;width:${sz}px;height:${sz}px">${sz && A.star5(i < n ? '#FFD66B' : 'rgba(255,255,255,.25)', i < n ? INK : '#8aa3c8', 7).replace(/width="120" height="120"/, `width="${sz}" height="${sz}"`)}</span>`).join('');
A.icecube = () => `<svg viewBox="0 0 440 440" width="440" height="440" style="overflow:visible">
<path d="M70 60 L370 60 Q410 60 410 100 L410 380 L70 380 Z" fill="none"/>
<rect x="30" y="40" width="380" height="380" rx="60" fill="rgba(196,229,255,.92)" stroke="${INK}" stroke-width="8"/>
<path d="M66 110 Q60 200 70 290" stroke="#fff" stroke-width="16" opacity=".8" fill="none" stroke-linecap="round"/>
<path d="M120 76 H260" stroke="#fff" stroke-width="14" opacity=".7" stroke-linecap="round"/></svg>`;
