"""Portadas seguras para TikTok e Instagram: todo lo importante dentro del 4:5 central (y 300-1620) y del 3:4 (y 240-1680).
Uso: python3 portada.py <imagen_fondo.png> <salida.jpg> "LÍNEA 1|LÍNEA 2|*LÍNEA EN ORO*" "PASTILLA" [desplazamiento_fondo]"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out, titulo, pastilla = sys.argv[1:5]; dy = int(sys.argv[5]) if len(sys.argv) > 5 else 0
F = lambda s: ImageFont.truetype(__file__.rsplit('/', 1)[0] + '/figtree-extrabold.ttf', s)
im = Image.open(src).convert('RGB'); W, H = im.size
bg = Image.new('RGB', (W, H), im.getpixel((5, 5))); bg.paste(im, (0, dy))
# velo oscuro detrás del titular para que se lea sobre cualquier fondo
velo = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dv = ImageDraw.Draw(velo)
for y in range(300, 900): dv.line([(0, y), (W, y)], fill=(8, 8, 14, int(170 * min(1, (900 - y) / 250, (y - 300) / 80 + .6))))
bg.paste(velo, (0, 0), velo); d = ImageDraw.Draw(bg)
y = 340
for ln in titulo.split('|'):
    oro = ln.startswith('*'); ln = ln.strip('*'); s = 132 if oro else 112
    while d.textlength(ln, font=F(s)) > W - 110: s -= 4
    w = d.textlength(ln, font=F(s)); d.text(((W - w) / 2, y), ln, font=F(s), fill='#ffd75e' if oro else '#ffffff', stroke_width=10, stroke_fill='#111'); y += int(s * 1.1)
f = F(60); w = d.textlength(pastilla, font=f)
d.rounded_rectangle(((W - w) / 2 - 40, 1470, (W + w) / 2 + 40, 1585), radius=60, fill='#ffd75e', outline='#111', width=6); d.text(((W - w) / 2, 1484), pastilla, font=f, fill='#111')
bg.save(out, quality=92)
# comprobación: recortes de Instagram (4:5) y TikTok (3:4)
prev = Image.new('RGB', (W // 3 * 3 + 40, H // 3), 'white')
for i, (h, x) in enumerate(((H, 0), (1350, 1), (1440, 2))):
    c = bg.crop((0, (H - h) // 2, W, (H + h) // 2)).resize((W // 3, h // 3)); prev.paste(c, (x * (W // 3 + 20), (H - h) // 6))
prev.save(out.rsplit('.', 1)[0] + '-recortes.jpg', quality=80); print('ok', out)
