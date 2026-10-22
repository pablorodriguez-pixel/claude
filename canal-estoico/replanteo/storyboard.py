# Genera los fotogramas de storyboard (HTML 1080x1920) de las 4 propuestas en estilo ilustrado plano.
# Uso: python3 storyboard.py  -> escribe frames/<id>.html ; luego se capturan con shoot.js
import json, os, math

INK = '#1d1f2a'; NIGHT = '#1c2233'; NIGHT2 = '#252c40'; CREAM = '#efe6d2'; PAPER = '#e6d8b8'
BRONZE = '#b8864b'; RED = '#a8402e'; TEAL = '#2f6f6a'; SKIN = '#e9b48e'; SKIN2 = '#d9a07a'
STONE = '#d8cfbd'; DAY = '#c9cbc2'; MOUNT = '#9aa3a6'
SW = 'stroke="%s" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"' % INK

# ---------- piezas de personaje (coordenadas relativas a los pies en 0,0; altura ~520) ----------
def eyes(kind='normal', y=-438):
    w = '<circle cx="-24" cy="%d" r="15" fill="#fff" %s/><circle cx="24" cy="%d" r="15" fill="#fff" %s/>' % (y, SW, y, SW)
    if kind == 'closed':
        return '<path d="M-36 %d q12 8 24 0M12 %d q12 8 24 0" fill="none" %s/>' % (y, y, SW)
    py = {'normal': 0, 'down': 6, 'up': -5, 'side': 0}[kind if kind in ('normal', 'down', 'up', 'side') else 'normal']
    px = 5 if kind == 'side' else 0
    return w + '<circle cx="%d" cy="%d" r="6" fill="%s"/><circle cx="%d" cy="%d" r="6" fill="%s"/>' % (-24 + px, y + py, INK, 24 + px, y + py, INK)

def brows(kind, y=-462):
    if kind == 'worried': return '<path d="M-40 %d l26 -8M14 %d l26 8" fill="none" %s/>' % (y + 2, y - 6, SW)
    if kind == 'determined': return '<path d="M-40 %d l26 8M14 %d l26 -8" fill="none" %s/>' % (y - 6, y + 2, SW)
    if kind == 'calm': return '<path d="M-38 %d q12 -6 24 0M14 %d q12 -6 24 0" fill="none" %s/>' % (y, y, SW)
    return ''

def mouth(kind, y=-398):
    return {'flat': '<path d="M-14 %d h28" %s/>' % (y, SW),
            'smile': '<path d="M-16 %d q16 12 32 0" fill="none" %s/>' % (y - 4, SW),
            'sad': '<path d="M-16 %d q16 -12 32 0" fill="none" %s/>' % (y + 4, SW),
            'open': '<ellipse cx="0" cy="%d" rx="11" ry="9" fill="%s"/>' % (y, INK),
            'none': ''}[kind]

def person(x, y, s=1.0, flip=False, skin=SKIN, top='#555', legs='#333', hair='', beard='', extra='', front='',
           expr=('normal', '', 'flat'), sit=False, arms='down', robe=False):
    e, b, m = expr
    f = -1 if flip else 1
    g = []
    # piernas
    if sit:
        g.append('<path d="M-40 -150 h120 v38 h-120z" fill="%s" %s/>' % (legs, SW))
        g.append('<path d="M60 -112 v100 h30" fill="none" stroke="%s" stroke-width="34" stroke-linecap="round"/>' % legs)
        g.append('<path d="M60 -112 v100 h30" fill="none" %s/>' % SW.replace('stroke-width="5"', 'stroke-width="0"'))
        body_y = -140
    elif robe:
        body_y = 0
    else:
        g.append('<rect x="-44" y="-150" width="36" height="140" rx="10" fill="%s" %s/>' % (legs, SW))
        g.append('<rect x="8" y="-150" width="36" height="140" rx="10" fill="%s" %s/>' % (legs, SW))
        g.append('<path d="M-50 -12 h44 v12 h-48z M6 -12 h44 v12 h-44z" fill="%s" %s/>' % (INK, SW))
        body_y = -140
    # cuerpo
    if robe:
        g.append('<path d="M-70 -360 Q-92 -180 -86 0 H86 Q92 -180 70 -360 Z" fill="%s" %s/>' % (top, SW))
    else:
        g.append('<rect x="-66" y="-370" width="132" height="%d" rx="34" fill="%s" %s/>' % (370 + body_y + 40, top, SW))
    # brazos
    if arms == 'down':
        g.append('<path d="M-62 -330 q-26 90 -12 170M62 -330 q26 90 12 170" fill="none" stroke="%s" stroke-width="30" stroke-linecap="round"/>' % top)
        g.append('<path d="M-62 -330 q-26 90 -12 170M62 -330 q26 90 12 170" fill="none" %s/>' % SW)
        g.append('<circle cx="-74" cy="-158" r="15" fill="%s" %s/><circle cx="74" cy="-158" r="15" fill="%s" %s/>' % (skin, SW, skin, SW))
    elif arms == 'point':
        g.append('<path d="M-62 -330 q-26 90 -12 170" fill="none" stroke="%s" stroke-width="30" stroke-linecap="round"/><path d="M-62 -330 q-26 90 -12 170" fill="none" %s/>' % (top, SW))
        g.append('<path d="M60 -320 l120 -50" fill="none" stroke="%s" stroke-width="30" stroke-linecap="round"/><path d="M60 -320 l120 -50" fill="none" %s/>' % (top, SW))
        g.append('<circle cx="-74" cy="-158" r="15" fill="%s" %s/><circle cx="186" cy="-372" r="15" fill="%s" %s/>' % (skin, SW, skin, SW))
    elif arms == 'hold':
        g.append('<path d="M-62 -330 q-10 80 50 110M62 -330 q10 80 -40 110" fill="none" stroke="%s" stroke-width="30" stroke-linecap="round"/><path d="M-62 -330 q-10 80 50 110M62 -330 q10 80 -40 110" fill="none" %s/>' % (top, top and SW))
    # cuello y cabeza
    g.append('<rect x="-20" y="-388" width="40" height="30" fill="%s" %s/>' % (SKIN2 if skin == SKIN else skin, SW))
    g.append('<ellipse cx="0" cy="-440" rx="66" ry="70" fill="%s" %s/>' % (skin, SW))
    g.append(hair)
    g.append(beard)
    g.append(eyes(e)); g.append(brows(b)); g.append(mouth(m))
    g.append(front)
    return '<g transform="translate(%s,%s) scale(%s,%s)">%s%s</g>' % (x, y, s * f, s, ''.join(g), extra)

HAIR_ALEX = '<path d="M-68 -440 Q-76 -520 0 -514 Q76 -520 68 -440 Q56 -490 22 -482 Q2 -500 -22 -480 Q-48 -494 -68 -440Z" fill="#3a2a22" %s/>' % SW
HAIR_MARCO = ('<g fill="#8a7a63" %s>' % SW) + ''.join('<circle cx="%d" cy="%d" r="24"/>' % (x, y) for x, y in [(-58, -486), (-26, -506), (8, -510), (40, -500), (62, -476), (-70, -452), (72, -446)]) + '</g>' + \
    ''.join('<ellipse cx="%d" cy="%d" rx="18" ry="7" fill="#7f9a52" transform="rotate(%d %d %d)" %s/>' % (x, y, r, x, y, SW) for x, y, r in [(-56, -502, -35), (-28, -518, -15), (4, -522, 0), (34, -516, 15), (60, -500, 35)])
BEARD_MARCO = '<path d="M-64 -432 Q-66 -352 0 -346 Q66 -352 64 -432 Q48 -396 0 -392 Q-48 -396 -64 -432Z" fill="#8a7a63" %s/>' % SW
HAIR_SENECA = '<path d="M-66 -430 q-4 -40 14 -58M66 -430 q4 -40 -14 -58" fill="none" stroke="#b9b2a5" stroke-width="18" stroke-linecap="round"/>'
BEARD_SENECA = '<path d="M-54 -420 Q-50 -360 0 -356 Q50 -360 54 -420 Q36 -392 0 -390 Q-36 -392 -54 -420Z" fill="#b9b2a5" %s/>' % SW
HAIR_EPI = ('<g fill="#2e2620" %s>' % SW) + ''.join('<circle cx="%d" cy="%d" r="22"/>' % (x, y) for x, y in [(-56, -484), (-24, -504), (10, -508), (42, -496), (64, -470)]) + '</g>'
BEARD_EPI = '<path d="M-66 -436 Q-70 -340 0 -332 Q70 -340 66 -436 Q50 -394 0 -390 Q-50 -394 -66 -436Z" fill="#2e2620" %s/>' % SW
HAIR_STOCK = '<path d="M-66 -448 Q-60 -512 0 -510 Q60 -512 66 -448 Q40 -486 0 -484 Q-40 -486 -66 -448Z" fill="#6b5a46" %s/>' % SW
HELMET = '<path d="M-74 -440 Q-78 -530 0 -530 Q78 -530 74 -440 L74 -420 L56 -420 Q50 -480 0 -480 Q-50 -480 -56 -420 L-74 -420Z" fill="#e9e6dc" %s/><rect x="-46" y="-500" width="92" height="20" rx="8" fill="%s" %s/>' % (SW, '#3d6fa8', SW)
TOGA_STRIPE = '<path d="M-40 -360 Q10 -200 60 0" fill="none" stroke="#6a2f50" stroke-width="16"/>'

def alex(x, y, s=1, expr=('normal', '', 'flat'), sit=False, flip=False, arms='down', phone=False):
    front = ''
    if phone:
        front = '<g transform="translate(40,-210) rotate(-12)"><rect x="-22" y="-40" width="44" height="78" rx="9" fill="%s" %s/><rect x="-15" y="-32" width="30" height="58" rx="5" fill="#8ec6ff"/></g><ellipse cx="40" cy="-230" rx="90" ry="70" fill="#8ec6ff" opacity=".22"/>' % (INK, SW)
    return person(x, y, s, flip, top=TEAL, legs='#2b3550', hair=HAIR_ALEX, expr=expr, sit=sit, arms='hold' if phone else arms, front=front)

def marco(x, y, s=1, expr=('normal', 'calm', 'flat'), flip=False, arms='down'):
    return person(x, y, s, flip, top='#efe6d2', hair=HAIR_MARCO, beard=BEARD_MARCO, expr=expr, robe=True, arms=arms, front=TOGA_STRIPE)

def seneca(x, y, s=1, expr=('normal', 'calm', 'flat'), flip=False, arms='down'):
    return person(x, y, s, flip, top='#d9cdb0', hair=HAIR_SENECA, beard=BEARD_SENECA, expr=expr, robe=True, arms=arms)

def epicteto(x, y, s=1, expr=('normal', 'calm', 'flat'), flip=False):
    crutch = '<path d="M100 0 V-260 M80 -262 h40" fill="none" stroke="#6b4a2b" stroke-width="12" stroke-linecap="round"/>'
    return person(x, y, s, flip, top='#8b6a45', hair=HAIR_EPI, beard=BEARD_EPI, expr=expr, robe=True, extra=crutch)

def stockdale(x, y, s=1, expr=('normal', '', 'flat'), helmet=True, sit=False, flip=False):
    return person(x, y, s, flip, top='#6b7350', legs='#5c6345', hair=HELMET if helmet else HAIR_STOCK, expr=expr, sit=sit)

def generic(x, y, s=1, top='#7a5a4a', expr=('normal', '', 'flat'), flip=False, arms='down', hair_c='#2e2620'):
    hair = '<path d="M-66 -446 Q-62 -514 0 -512 Q62 -514 66 -446 Q36 -480 0 -478 Q-36 -480 -66 -446Z" fill="%s" %s/>' % (hair_c, SW)
    return person(x, y, s, flip, top=top, legs='#2d2f3a', hair=hair, expr=expr, arms=arms)

# ---------- decorados ----------
def sky(c1, c2): return '<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk)"/>' % (c1, c2)
def moon(x, y, r=46): return '<circle cx="%d" cy="%d" r="%d" fill="#f1e7c9" opacity=".95"/><circle cx="%d" cy="%d" r="%d" fill="#f1e7c9" opacity=".12"/>' % (x, y, r, x, y, r * 2.2)
def mountains(y, c=MOUNT, op=1): return '<path d="M0 %d L180 %d L330 %d L520 %d L700 %d L880 %d L1080 %d V1920 H0Z" fill="%s" opacity="%s"/>' % (y, y - 160, y - 40, y - 220, y - 60, y - 190, y - 30, c, op)
def ground(y, c='#3a3326'): return '<rect x="0" y="%d" width="1080" height="%d" fill="%s"/>' % (y, 1920 - y, c)
def window(x, y, w, h, glow='#f2b56b'): return '<rect x="%d" y="%d" width="%d" height="%d" rx="8" fill="%s" %s/><path d="M%d %dv%dM%d %dh%d" %s/>' % (x, y, w, h, glow, SW, x + w / 2, y, h, x, y + h / 2, w, SW)
def rain(op=.25): return '<g stroke="#c9d4e6" stroke-width="2" opacity="%s">%s</g>' % (op, ''.join('<path d="M%d %d l-8 34"/>' % ((i * 137) % 1080, (i * 311) % 1900) for i in range(110)))
def bed(x, y): return '<rect x="%d" y="%d" width="520" height="150" rx="22" fill="#3b4a6b" %s/><rect x="%d" y="%d" width="520" height="60" rx="22" fill="#e3dccb" %s/><rect x="%d" y="%d" width="150" height="70" rx="28" fill="#f1ece0" %s/>' % (x, y, SW, x, y - 30, SW, x + 10, y - 70, SW)
def column(x, y, h=600, w=70): return '<rect x="%d" y="%d" width="%d" height="%d" fill="%s" %s/><rect x="%d" y="%d" width="%d" height="30" fill="%s" %s/><rect x="%d" y="%d" width="%d" height="30" fill="%s" %s/>' % (x, y, w, h, STONE, SW, x - 12, y - 30, w + 24, STONE, SW, x - 12, y + h, w + 24, STONE, SW)
def sign(x, y, title, sub='', rot=-3, w=520): return '<div class="sign" style="left:%dpx;top:%dpx;width:%dpx;transform:rotate(%ddeg)"><b>%s</b><span>%s</span></div>' % (x, y, w, rot, title, sub)
def Z(px, py): return (540 + (px - 540) * 1.18, 1250 + (py - 1250) * 1.18)
def label(x, y, name, sub, lx, ly):
    lx, ly = Z(lx, ly)
    return ('<div class="lab" style="left:%dpx;top:%dpx"><b>%s</b><span>%s</span></div><svg class="ln"><path d="M%d %d L%d %d" stroke="%s" stroke-width="3"/></svg>' % (x, y, name, sub, x + 10, y + 60, lx, ly, CREAM))
def bubble(x, y, text, w=380, dark=False, think=False): return '<div class="bub%s%s" style="left:%dpx;top:%dpx;width:%dpx">%s</div>' % (' dark' if dark else '', ' think' if think else '', x, y, w, text)

# ---------- fotogramas ----------
F = {}
def frame(fid, svg, html='', banner='', hi=None, tone='night', zoom=True):
    F[fid] = dict(svg=svg, html=html, banner=banner, hi=hi or [], tone=tone, zoom=zoom)

# A · LA FORJA (serie con protagonista)
frame('A1', sky('#141a2a', '#232b40') + moon(820, 300) + '<rect x="0" y="0" width="1080" height="1920" fill="#20283a"/>' + window(600, 360, 340, 420, '#2c3a5a') + moon(770, 520, 30) + ground(1330, '#151923') + bed(80, 1180) + alex(330, 1240, 1.05, ('down', 'worried', 'flat'), sit=True, phone=True),
      sign(90, 160, 'LA FORJA', 'Episodio 1 · La voz que dice «mañana»', -2) + bubble(600, 880, '«Mañana empiezo…»', 360, think=True),
      'Esta es la historia de Álex. Y probablemente, también la tuya.', ['tuya'])
frame('A2', sky('#3b2f2a', '#1f1a17') + '<rect x="0" y="0" width="1080" height="1920" fill="#2b2420"/>' + column(90, 380, 860) + column(890, 380, 860) + window(420, 420, 240, 340, '#f2b56b') + ground(1300, '#1d1814') + '<rect x="230" y="1150" width="620" height="140" rx="16" fill="#6a2f50" %s/>' % SW + marco(540, 1320, 1.0, ('down', 'worried', 'flat')),
      label(70, 1400, 'MARCO AURELIO', 'emperador de Roma · 170 d.C.', 470, 1100) + bubble(620, 560, '«Cinco minutos más…»', 340, think=True),
      'El hombre más poderoso de Roma oía la misma voz cada mañana.', ['misma'])
frame('A3', sky('#2a2420', '#141210') + '<circle cx="540" cy="900" r="420" fill="#3a2d22"/>' + marco(540, 1360, 1.15, ('normal', 'determined', 'flat'), arms='point'),
      bubble(150, 300, '«¿Naciste para estar cómodo… o para actuar?»', 780, dark=True) + label(90, 1460, 'MEDITACIONES', 'Libro V · sus notas privadas', 300, 1440),
      'Y se respondía así.', ['así'])
frame('A4', sky('#efe6d2', '#e2d5b6') + '<g font-family="Patrick Hand" font-size="64" fill="%s">' % INK + '<text x="540" y="300" text-anchor="middle" font-size="80">EL MÉTODO</text></g>' +
      ''.join('<g transform="translate(150,%d)"><circle r="70" fill="%s" %s/><text y="24" text-anchor="middle" font-family="Patrick Hand" font-size="80" fill="#fff">%d</text></g>' % (520 + i * 330, [TEAL, BRONZE, RED][i], SW, i + 1) for i in range(3)),
      ''.join('<div class="step" style="top:%dpx"><b>%s</b><span>%s</span></div>' % (450 + i * 330, t, d) for i, (t, d) in enumerate([('Recuerda para qué', 'Tu porqué pesa más que tu pereza.'), ('Hazlo ridículo de pequeño', 'Cinco minutos. Una página. Una flexión.'), ('Decide antes', '«Cuando suene la alarma: pies al suelo.»')])),
      'Los estoicos tenían un método de tres pasos.', ['tres'], tone='day', zoom=False)
frame('A5', sky('#f2b56b', '#e07c4f') + '<rect x="0" y="0" width="1080" height="1920" fill="#3a3a52" opacity=".55"/>' + window(600, 360, 340, 420, '#f6c27a') + ground(1330, '#2a2533') + bed(80, 1180) + alex(560, 1340, 1.08, ('normal', 'determined', 'smile')) + '<rect x="0" y="0" width="1080" height="1920" fill="#f6b56b" opacity=".12"/>',
      bubble(150, 520, '«Pies al suelo.»', 360) + sign(520, 1440, 'Las ganas no deciden.', 'Decides tú.', 2, 480),
      'Esa mañana, Álex no obedeció a la voz.', ['no'])

# B · FRÁGIL vs FORJADA (comparativa)
def split(left, right, top_txt=('MENTE FRÁGIL', 'MENTE FORJADA')):
    return ('<rect x="0" y="0" width="540" height="1920" fill="#4a4d57"/><rect x="540" y="0" width="540" height="1920" fill="#2a2216"/>'
            '<path d="M540 0 V1920" stroke="%s" stroke-width="8"/>' % CREAM + left + right)
frame('B1', sky('#d8d2c4', '#bdb5a3') + '<rect x="120" y="1100" width="840" height="60" rx="10" fill="#7a5a3a" %s/>' % SW +
      generic(260, 1320, .95, '#7a5a4a', ('normal', 'determined', 'open'), arms='point') + alex(760, 1320, .95, ('up', 'worried', 'sad')) + generic(520, 1240, .75, '#5a6a7a', ('side', '', 'flat')),
      sign(90, 160, 'FRÁGIL vs FORJADA', 'Caso 7 · Te critican delante de todos', -2) + bubble(110, 560, '«Esto está fatal. ¿Quién lo ha hecho?»', 420, dark=True),
      'Te critican delante de todos. Mira cómo responden dos mentes.', ['dos mentes'], tone='day')
frame('B2', split(alex(270, 1340, .9, ('down', 'worried', 'sad')) + '<path d="M270 760 l-30 60 l30 40 l-20 70" fill="none" stroke="%s" stroke-width="6"/>' % CREAM,
                  alex(810, 1340, .9, ('normal', 'calm', 'flat')) + '<circle cx="810" cy="900" r="300" fill="%s" opacity=".12"/>' % BRONZE),
      '<div class="half l">MENTE FRÁGIL</div><div class="half r">MENTE FORJADA</div>' + bubble(40, 380, '«Me odian. Soy un desastre. Tengo que defenderme.»', 440, think=True) + bubble(590, 380, '«Duele. Ahora, pienso.»', 420, think=True),
      'El golpe duele igual. La diferencia está en lo que piensas después.', ['después'])
frame('B3', sky('#efe6d2', '#e2d5b6') + '<text x="540" y="300" text-anchor="middle" font-family="Patrick Hand" font-size="78" fill="%s">LAS 3 PREGUNTAS</text>' % INK +
      ''.join('<g transform="translate(150,%d)"><rect x="-60" y="-60" width="120" height="120" rx="22" fill="%s" %s/><path d="M-30 0 l20 22 l40 -44" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>' % (540 + i * 330, [TEAL, BRONZE, RED][i], SW) for i in range(3)),
      ''.join('<div class="step" style="top:%dpx"><b>%s</b><span>%s</span></div>' % (450 + i * 330, t, d) for i, (t, d) in enumerate([('¿Es cierto?', 'Si lo es: acabas de aprender gratis.'), ('¿Quién lo dice?', '¿Le pedirías consejo a esa persona?'), ('¿Depende de mí?', 'Su opinión, no. Tu respuesta, sí.')])),
      'La mente forjada se hace tres preguntas.', ['tres'], tone='day', zoom=False)
frame('B4', sky('#3b2f2a', '#1f1a17') + column(120, 420, 820) + column(860, 420, 820) + ground(1300, '#1d1814') + epicteto(540, 1330, 1.05, ('normal', 'calm', 'smile')),
      label(300, 1440, 'EPICTETO', 'esclavo y maestro · siglo I', 520, 1150) + bubble(130, 300, '«Si hablan mal de ti, di: no conocen mis otros defectos, o habrían dicho más.»', 820, dark=True),
      'Epicteto, que fue esclavo, respondía a las críticas con una sonrisa.', ['sonrisa'])
frame('B5', split(alex(270, 1340, .9, ('down', 'worried', 'sad')), alex(810, 1340, .9, ('normal', 'determined', 'smile'))),
      '<div class="half l">MENTE FRÁGIL</div><div class="half r">MENTE FORJADA</div>' + sign(160, 380, 'No eres lo que dicen de ti.', 'Eres lo que haces después.', -2, 760),
      '¿Cuál de las dos tienes hoy? Sígueme y forjamos la segunda.', ['segunda'])

# C · CARTAS (Séneca te escribe)
frame('C1', sky('#2a221c', '#15110e') + '<rect x="140" y="300" width="800" height="1060" rx="20" fill="%s" %s/>' % (PAPER, SW) + '<circle cx="540" cy="1330" r="70" fill="%s" %s/><text x="540" y="1352" text-anchor="middle" font-family="Patrick Hand" font-size="60" fill="#f1e2c4">S</text>' % (RED, SW),
      '<div class="letter" style="top:420px"><i>Carta I</i><b>Para quien siente que va tarde</b><span>Querido amigo:<br>Me dices que vas tarde. Que otros, a tu edad, ya tienen más…</span></div>',
      'Querido amigo: me dices que vas tarde.', ['tarde'])
frame('C2', sky('#2b2420', '#141210') + '<rect x="0" y="1180" width="1080" height="740" fill="#3b2a1e"/>' + '<rect x="160" y="1150" width="760" height="40" rx="8" fill="#5b3f2a" %s/>' % SW + seneca(420, 1150, 1.0, ('down', 'calm', 'flat')) + '<path d="M600 1140 l40 -120" stroke="%s" stroke-width="6"/><circle cx="780" cy="1080" r="18" fill="#f6c27a"/><circle cx="780" cy="1080" r="140" fill="#f6c27a" opacity=".15"/>' % CREAM,
      label(600, 400, 'SÉNECA', 'filósofo · desterrado en Córcega', 460, 700),
      'Yo he sido rico, y he sido desterrado.', ['desterrado'])
frame('C3', sky('#6f7d8c', '#2d3a48') + mountains(1180, '#3b4a55') + '<path d="M0 1300 Q540 1240 1080 1300 V1920 H0Z" fill="#24323e"/>' + seneca(540, 1290, .55, ('closed', 'calm', 'flat')) + rain(.15),
      sign(100, 200, 'La vida no es corta.', 'La hacemos corta, malgastándola.', -2, 760),
      'Y he aprendido que no vas tarde. Vas distraído.', ['distraído'])
frame('C4', sky('#efe6d2', '#e2d5b6') + '<text x="540" y="300" text-anchor="middle" font-family="Patrick Hand" font-size="70" fill="%s">CADA NOCHE, 3 PREGUNTAS</text>' % INK +
      ''.join('<g transform="translate(150,%d)"><circle r="70" fill="%s" %s/><text y="24" text-anchor="middle" font-family="Patrick Hand" font-size="80" fill="#fff">%d</text></g>' % (520 + i * 330, [TEAL, BRONZE, RED][i], SW, i + 1) for i in range(3)),
      ''.join('<div class="step" style="top:%dpx"><b>%s</b><span>%s</span></div>' % (450 + i * 330, t, d) for i, (t, d) in enumerate([('¿Qué hice bien?', 'Reconócelo. También cuenta.'), ('¿En qué fallé?', 'Como un juez justo, no un verdugo.'), ('¿Qué haré mejor?', 'Una sola cosa. Mañana.')])),
      'Haz esto antes de dormir, como hacía yo cada noche.', ['cada'], tone='day', zoom=False)
frame('C5', sky('#2a221c', '#15110e') + '<rect x="140" y="300" width="800" height="1060" rx="20" fill="%s" %s/>' % (PAPER, SW),
      '<div class="letter" style="top:470px"><b>Compárate solo con quien eras ayer.</b><span>Ahí está tu único rival.<br><br>Cuídate.<br><em>Tu amigo, Séneca</em></span></div>',
      'Ahí está tu único rival.', ['único'])

# D · HISTORIAS QUE FORJAN (historias reales)
frame('D1', sky('#3c4a5e', '#1a2232') + mountains(1500, '#26301f') + '<path d="M0 1560 H1080 V1920 H0Z" fill="#1b2416"/>' +
      '<g transform="translate(700,520) rotate(18)"><path d="M-160 0 L160 -20 L180 0 L160 20 Z" fill="#7d8a94" %s/><path d="M-40 -10 L40 -120 L70 -110 L20 0Z M-40 10 L40 120 L70 110 L20 0Z" fill="#6c7983" %s/><path d="M-170 0 l-60 -30 v60z" fill="#e07c4f" opacity=".9"/></g>' % (SW, SW) +
      '<path d="M380 760 Q300 650 220 760 Q300 720 380 760Z" fill="#efe6d2" %s/><path d="M228 760 L300 900 M372 760 L300 900" stroke="%s" stroke-width="3"/>' % (SW, INK) + stockdale(300, 1080, .42, ('up', 'worried', 'open')),
      sign(90, 160, '1965 · VIETNAM', 'Historias que forjan · nº 1', -2),
      'Septiembre de 1965. Un piloto es derribado sobre Vietnam.', ['derribado'])
frame('D2', sky('#2b2c2e', '#121314') + '<rect x="0" y="0" width="1080" height="1920" fill="#2f3033"/>' + ''.join('<rect x="%d" y="380" width="22" height="900" fill="#55575c" %s/>' % (x, SW) for x in range(170, 950, 110)) + ground(1280, '#1e1f21') + stockdale(540, 1300, 1.0, ('down', 'determined', 'flat'), helmet=False, sit=False),
      label(70, 300, 'JAMES STOCKDALE', 'prisionero más de 7 años · 4 aislado', 500, 840),
      'Pasaría más de siete años prisionero. Cuatro de ellos, aislado.', ['siete'])
frame('D3', sky('#2b2c2e', '#121314') + '<rect x="0" y="0" width="1080" height="1920" fill="#2f3033"/>' + '<g transform="translate(540,960)"><circle r="320" fill="#f6c27a" opacity=".12"/><rect x="-170" y="-220" width="340" height="440" rx="14" fill="%s" %s/><path d="M0 -220 V220" %s/><text x="-85" y="-60" text-anchor="middle" font-family="Patrick Hand" font-size="44" fill="%s">EPICTETO</text><text x="85" y="-60" text-anchor="middle" font-family="Patrick Hand" font-size="36" fill="%s">Enquiridión</text></g>' % (PAPER, SW, SW, INK, INK),
      bubble(140, 300, '«Dejo el mundo de la tecnología. Entro en el mundo de Epicteto.»', 800, dark=True),
      'Lo que le salvó fue un librito escrito por un esclavo griego.', ['librito'])
frame('D4', sky('#efe6d2', '#e2d5b6') + '<circle cx="540" cy="900" r="420" fill="#e3d3ae" %s/><circle cx="540" cy="900" r="200" fill="%s" %s/>' % (SW, BRONZE, SW) +
      '<text x="540" y="890" text-anchor="middle" font-family="Patrick Hand" font-size="52" fill="#fff">TU</text><text x="540" y="950" text-anchor="middle" font-family="Patrick Hand" font-size="52" fill="#fff">RESPUESTA</text>' +
      ''.join('<text x="%d" y="%d" text-anchor="middle" font-family="Patrick Hand" font-size="44" fill="%s">%s</text>' % (x, y, INK, t) for x, y, t in [(540, 600, 'la celda'), (300, 820, 'el dolor'), (790, 820, 'el tiempo'), (330, 1130, 'los guardias'), (760, 1130, 'el final')]),
      sign(140, 1420, 'Lo que depende de ti', 'y lo que no.', -2, 800),
      'No controlaba nada… excepto una cosa: su respuesta.', ['respuesta'], tone='day', zoom=False)
frame('D5', sky('#20283a', '#141a2a') + '<rect x="0" y="0" width="1080" height="1920" fill="#20283a"/>' + window(140, 380, 300, 380, '#2c3a5a') + '<rect x="560" y="1050" width="420" height="40" rx="8" fill="#5b4a3a" %s/>' % SW + alex(700, 1340, 1.0, ('down', 'determined', 'flat')),
      bubble(80, 560, '«¿Qué parte de esto depende de mí?»', 520, think=True) + sign(140, 1440, 'Tú también tienes tu celda.', 'Ahí empieza tu fuerza.', -2, 800),
      'Tú también tienes tu celda: un trabajo, una pérdida, un mal año.', ['celda'])

CSS = '''
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{position:relative;font-family:"Patrick Hand",sans-serif;color:%(ink)s}
svg.bg{position:absolute;left:0;top:0}
.tex{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.35}
.vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50%% 45%%,transparent 55%%,rgba(0,0,0,.45))}
.sign{position:absolute;background:%(cream)s;border:5px solid %(ink)s;padding:18px 26px;box-shadow:8px 10px 0 rgba(0,0,0,.25);text-align:center}
.sign b{display:block;font-family:"Patrick Hand SC","Patrick Hand";font-size:72px;line-height:1;color:%(red)s}
.sign span{display:block;font-size:36px;margin-top:6px}
.lab{position:absolute;color:%(cream)s}
.lab b{display:block;font-family:"Patrick Hand SC";font-size:44px;letter-spacing:.04em}
.lab span{display:block;font-size:28px;opacity:.85}
.day .lab{color:%(ink)s}
svg.ln{position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none}
.day svg.ln path{stroke:%(ink)s}
.bub{position:absolute;background:#fbf6ea;border:5px solid %(ink)s;border-radius:40px;padding:22px 30px;font-size:46px;line-height:1.1;text-align:center;box-shadow:6px 8px 0 rgba(0,0,0,.25)}
.bub.dark{background:%(ink)s;color:%(cream)s;border-color:%(cream)s}
.bub.think{border-style:dashed}
.step{position:absolute;left:260px;right:60px}
.step b{display:block;font-size:66px;line-height:1}
.step span{display:block;font-size:42px;color:#5a4f3e;margin-top:8px}
.half{position:absolute;top:200px;width:540px;text-align:center;font-family:"Patrick Hand SC";font-size:58px;color:%(cream)s}
.half.l{left:0}.half.r{left:540px;color:#e8c690}
.letter{position:absolute;left:200px;right:200px;text-align:left}
.letter i{display:block;font-size:40px;color:%(red)s}
.letter b{display:block;font-size:76px;line-height:1.02;margin:10px 0 30px}
.letter span{display:block;font-size:50px;line-height:1.2}
.letter em{color:%(red)s}
.banner{position:absolute;left:50px;right:50px;top:1660px;background:%(cream)s;padding:26px 40px;text-align:center;font-size:54px;line-height:1.1;
  clip-path:polygon(0 8%%,3%% 0,97%% 4%%,100%% 0,99%% 92%%,96%% 100%%,4%% 96%%,1%% 100%%);box-shadow:0 10px 0 rgba(0,0,0,.2)}
.banner em{font-style:normal;color:%(red)s}
.brand{position:absolute;right:46px;top:60px;font-family:"Patrick Hand SC";font-size:30px;letter-spacing:.12em;color:%(cream)s;opacity:.7}
.day .brand{color:%(ink)s}
''' % dict(ink=INK, cream=CREAM, red=RED)

TEX = '<svg class="tex" width="1080" height="1920"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 .9 0"/></filter><rect width="1080" height="1920" filter="url(#p)"/></svg>'

os.makedirs('frames', exist_ok=True)
for fid, d in F.items():
    ban = d['banner']
    for w in d['hi']: ban = ban.replace(w, '<em>%s</em>' % w, 1)
    html = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../fonts.css"><style>%s</style></head><body class="%s"><svg class="bg" width="1080" height="1920" viewBox="0 0 1080 1920">%s</svg>%s<div class="brand">CARÁCTER ESTOICO</div>%s<div class="banner">%s</div><div class="vig"></div></body></html>' % (CSS, d['tone'], d['svg'] if not d['zoom'] else '<g transform="translate(540,1250) scale(1.18) translate(-540,-1250)">%s</g>' % d['svg'], d['html'], TEX, ban)
    open('frames/%s.html' % fid, 'w').write(html)
print(len(F), 'fotogramas')
