"""Logo de MISMO SUELDO: un «=» (mismo sueldo) cuya raya de abajo se escapa hacia arriba (distinto final).
python3 marca/logo.py → marca/avatar.png (1080×1080), marca/logo.png (horizontal), marca/logo-vertical.png"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os
D = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(D, '..', 'fuentes', 'Fredoka-variable.ttf')
TINTA, AMARILLO, CORAL, VERDE, CREMA = '#1D1B2F', '#FFC93C', '#FF6B57', '#19C37D', '#FFF4E6'
def fuente(s, peso=700):
    f = ImageFont.truetype(F, s); f.set_variation_by_axes([peso, 100]); return f
def marca(S, fondo=AMARILLO):
    """El símbolo en un lienzo SxS (supermuestreado ×4)."""
    k = 4; W = S * k; im = Image.new('RGBA', (W, W), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    if fondo: d.rounded_rectangle((0, 0, W - 1, W - 1), radius=int(W * .23), fill=fondo)
    g = int(W * .11)                                   # grosor de las rayas
    x0, x1 = int(W * .17), int(W * .56)
    y1, y2 = int(W * .42), int(W * .66)
    d.rounded_rectangle((x0, y1 - g // 2, x1, y1 + g // 2), radius=g // 2, fill=CORAL)        # raya de arriba: se queda igual
    # raya de abajo: recta y, a mitad, sube en diagonal con punta de flecha
    xm = int(W * .6); xa, ya = int(W * .8), int(W * .22)
    d.line((x0 + g // 2, y2, xm, y2), fill=VERDE, width=g); d.ellipse((x0, y2 - g // 2, x0 + g, y2 + g // 2), fill=VERDE)
    d.line((xm, y2, xa, ya + int(g * .9)), fill=VERDE, width=g, joint='curve')
    d.ellipse((xm - g // 2, y2 - g // 2, xm + g // 2, y2 + g // 2), fill=VERDE)
    ang = math.atan2(ya - y2, xa - xm); L = g * 2.1
    pt = (xa + math.cos(ang) * g * .6, ya + math.sin(ang) * g * .6)
    izq = (pt[0] - L * math.cos(ang - .55), pt[1] - L * math.sin(ang - .55)); der = (pt[0] - L * math.cos(ang + .55), pt[1] - L * math.sin(ang + .55))
    d.polygon([pt, izq, der], fill=VERDE)
    return im.resize((S, S), Image.LANCZOS)
# avatar (el círculo de TikTok recorta las esquinas: el símbolo va centrado y con aire)
av = Image.new('RGB', (1080, 1080), AMARILLO); m = marca(940, None); av.paste(m, (70, 80), m); av.save(os.path.join(D, 'avatar.png'))
# logo horizontal
lo = Image.new('RGBA', (2200, 600), (0, 0, 0, 0)); m = marca(520); lo.paste(m, (40, 40), m); d = ImageDraw.Draw(lo)
d.text((620, 70), 'MISMO', font=fuente(230), fill=TINTA); d.text((620, 300), 'SUELDO', font=fuente(230), fill=TINTA)
lo = lo.crop(lo.getbbox()); lo.save(os.path.join(D, 'logo.png'))
fondo = Image.new('RGB', (lo.width + 160, lo.height + 160), CREMA); fondo.paste(lo, (80, 80), lo); fondo.save(os.path.join(D, 'logo-sobre-crema.png'))
# vertical
ve = Image.new('RGBA', (1200, 1400), (0, 0, 0, 0)); m = marca(640); ve.paste(m, (280, 40), m); d = ImageDraw.Draw(ve)
for i, t in enumerate(('MISMO', 'SUELDO')):
    f = fuente(220); w = d.textlength(t, font=f); d.text(((1200 - w) / 2, 720 + i * 230), t, font=f, fill=TINTA)
ve = ve.crop(ve.getbbox()); ve.save(os.path.join(D, 'logo-vertical.png'))
print('ok')
