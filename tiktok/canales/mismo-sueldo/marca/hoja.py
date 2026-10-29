"""Hoja de marca de MISMO SUELDO (1920×1080): logo, lema, elenco y paleta. python3 marca/hoja.py → marca/hoja-de-marca.png"""
from PIL import Image, ImageDraw, ImageFont
import os
D = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(D, '..', 'fuentes')
def fr(s, p=700):
    f = ImageFont.truetype(os.path.join(F, 'Fredoka-variable.ttf'), s); f.set_variation_by_axes([p, 100]); return f
fig = lambda s: ImageFont.truetype(os.path.join(F, 'figtree-bold.ttf'), s)
H = Image.new('RGB', (1920, 1080), '#FFF4E6'); d = ImageDraw.Draw(H)
el = Image.open(os.path.join(D, 'elenco.png')).convert('RGB').resize((1152, 648)); H.paste(el, (720, 60))
lo = Image.open(os.path.join(D, 'logo.png')); lo = lo.resize((600, int(lo.height * 600 / lo.width))); H.paste(lo, (70, 80), lo)
d.text((70, 300), 'Mismo sueldo.', font=fr(64), fill='#1D1B2F'); d.text((70, 375), 'Distinto final.', font=fr(64), fill='#19C37D')
d.text((70, 480), 'Historias de dinero con personajes:', font=fig(30), fill='#1D1B2F')
d.text((70, 520), 'dos caminos, números reales y una pregunta:', font=fig(30), fill='#1D1B2F')
d.text((70, 560), '«¿tú quién eres?»', font=fig(30), fill='#1D1B2F')
nombres = [('CARMEN', 'la abuela', '#8E7CC3', 870), ('LUCÍA', 'lo de siempre', '#FF6B57', 1120), ('MARCOS', 'la otra decisión', '#19C37D', 1450), ('TONI', 'el cuñado', '#2F80ED', 1690)]
for n, s, c, x in nombres:
    w = d.textlength(n, font=fr(40)); d.text((x - w / 2, 720), n, font=fr(40), fill=c)
    w = d.textlength(s, font=fig(24)); d.text((x - w / 2, 768), s, font=fig(24), fill='#1D1B2F')
pal = [('#FFF4E6', 'crema'), ('#FFC93C', 'amarillo'), ('#1D1B2F', 'tinta'), ('#FF6B57', 'coral · se pierde'), ('#19C37D', 'verde · se gana'), ('#8E7CC3', 'lila'), ('#2F80ED', 'azul')]
for i, (c, n) in enumerate(pal):
    x = 70 + i * 260; d.rounded_rectangle((x, 860, x + 230, 950), radius=24, fill=c, outline='#1D1B2F' if c == '#FFF4E6' else None, width=2)
    d.text((x, 960), c, font=fig(24), fill='#1D1B2F'); d.text((x, 992), n, font=fig(22), fill='#5a5870')
d.text((1460, 1030), 'Fredoka · Figtree · voz: Jaime', font=fig(22), fill='#5a5870')
H.save(os.path.join(D, 'hoja-de-marca.png')); print('ok')
