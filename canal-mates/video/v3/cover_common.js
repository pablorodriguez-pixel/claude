// Portadas 1080x1920. La cuadrícula del perfil de TikTok recorta al centro (3:4, y≈240-1680): todo lo importante va ahí.
function brand(y = 1600) {
  ctx.save(); ctx.translate(410, y); ctx.scale(.22, .22); ctx.translate(-170, -170);
  rrect(0, 0, 340, 340, 84); ctx.fillStyle = 'rgba(5,32,42,.95)'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.line; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(124, 170, 58, 84, 0, 0, Math.PI * 2); ctx.lineWidth = 30; ctx.strokeStyle = C.accent; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(232, 112); ctx.lineTo(262, 90); ctx.lineTo(262, 250); ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.line; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.font = `800 52px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = C.line; ctx.fillText('cero', 470, y + 2); const w = ctx.measureText('cero').width; ctx.fillStyle = C.accent; ctx.fillText('uno', 470 + w, y + 2); ctx.restore();
}
function shout(s, y, size, color) { txt(s, 540, y, size, color, { weight: 800, ls: 1 }); }
