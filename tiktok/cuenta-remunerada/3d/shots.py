# Construye y renderiza un plano del vídeo en Blender.
#   blender -b -P shots.py -- <n_plano>            -> frames/f_####.png de ese plano
#   blender -b -P shots.py -- <n_plano> still <t>  -> stills/s<n>_<t>.png
import sys, os, json, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import bpy
from mathutils import Vector
from lib3d import *
from sets import *

FPS = 12
D = json.load(open(os.path.join(HERE, '..', 'build', 'subs.json')))
W, SC = D['words'], D['scenes']
L = lambda i: SC[i]['s']
LE = lambda i: SC[i]['e']
norm = lambda w: ''.join(c for c in w.lower() if c.isalnum() or c in 'áéíóúüñ')
def T(word, after=0.0):
    for w in W:
        if w['s'] >= after - 0.01 and norm(w['w']).startswith(word): return w['s']
    return after
cl = lambda x: max(0.0, min(1.0, x))
eo = lambda x: 1 - (1 - cl(x)) ** 3
def eio(x):
    x = cl(x); return 4 * x ** 3 if x < .5 else 1 - (-2 * x + 2) ** 3 / 2
def eback(x):
    x = cl(x); c = 1.7; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2
fmt = lambda n: f"{int(round(n)):,}".replace(',', '.')
def talking(who, t): return any(w['who'] == who and w['s'] - 0.03 <= t <= w['e'] + 0.03 for w in W)

ANIM = []   # funciones f(t) que se ejecutan en cada fotograma

# ------------------------------------------------------------------ cámaras
JW = ((0, -4.1, 1.45), (0, 1.5, 1.0), 20)
JW2 = ((0, -3.7, 1.43), (0, 1.5, 1.0), 20)
CU_R = ((0.8, -1.95, 1.5), (0.75, 0, 1.33), 50)
CU_R2 = ((0.8, -1.78, 1.48), (0.75, 0, 1.33), 50)
CU_D = ((-0.7, -1.95, 1.5), (-0.75, 0, 1.33), 50)
CU_D2 = ((-0.7, -1.78, 1.48), (-0.75, 0, 1.33), 50)

def shots():
    s = [
     dict(t=L(0), set='jet', cam=(JW, JW2), dexpr='proud'),
     dict(t=L(1), set='jet', cam=(CU_R, CU_R2), dexpr='proud'),
     dict(t=T('quemando', L(1)) - 0.1, set='jet', cam=(((-0.7, -1.3, 1.08), (-0.75, -0.33, 0.8), 42), ((-0.7, -1.12, 1.05), (-0.75, -0.33, 0.8), 42)), dexpr='shock'),
     dict(t=L(2), set='jet', cam=(CU_D, CU_D2), dexpr='confused'),
     dict(t=L(3), set='banks', v=1, cam=(((0, -3.7, 1.5), (0, 1.3, 1.55), 14), ((0, -3.4, 1.5), (0, 1.3, 1.55), 14))),
     dict(t=L(4), set='jet', cam=(JW2, ((0, -3.35, 1.4), (0, 1.5, 1.0), 20))),
     dict(t=L(5), set='vault', v='monthly', cam=(((0, -3.6, 1.7), (0.2, 2.5, 1.75), 20), ((0.15, -3.1, 1.75), (0.2, 2.5, 1.85), 20))),
     dict(t=L(6), set='jet', cam=(CU_D, CU_D2), dexpr='worry'),
     dict(t=L(7), set='vault', v='fgd', cam=(((-0.2, -1.2, 2.2), (0, 3, 2.15), 26), ((-0.2, -0.95, 2.2), (0, 3, 2.15), 26))),
     dict(t=L(8), set='jet', cam=(JW, JW2), dexpr='normal'),
     dict(t=L(9), set='banks', v=2, cam=(((0, -3.7, 1.5), (0, 1.3, 1.55), 14), ((0, -3.4, 1.5), (0, 1.3, 1.55), 14))),
     dict(t=L(10), set='vault', v='years', cam=(((0.2, -3.0, 1.75), (0.2, 2.5, 1.85), 20), ((0, -3.5, 1.7), (0.1, 2.5, 1.75), 20))),
     dict(t=L(11), set='jet', cam=(((-0.7, -2.6, 1.5), (-0.75, 0, 1.33), 50), CU_D2), fast=True, dexpr='shock'),
     dict(t=L(12), set='office', v='fee', cam=(((0, -3.3, 1.6), (0, 0.8, 1.3), 20), ((0.1, -2.95, 1.6), (0.1, 0.8, 1.3), 20))),
     dict(t=L(13), set='office', v='phone', cam=(((-0.35, -2.4, 1.6), (-0.5, -0.55, 1.45), 38), ((-0.35, -2.25, 1.58), (-0.5, -0.55, 1.45), 38)), dexpr='shock'),
     dict(t=L(14), set='office', v='cake', cam=(((0.05, -3.1, 1.6), (0.05, 0.8, 1.3), 20), ((0.15, -2.8, 1.58), (0.15, 0.8, 1.3), 20)), dexpr='worry'),
     dict(t=L(15), set='jet', v='paper', cam=(((0.5, -2.7, 1.4), (0.6, 0, 1.2), 40), ((0.5, -2.45, 1.38), (0.6, 0, 1.2), 40)), dexpr='normal'),
     dict(t=L(16), set='terrace', cam=(((0, -3.9, 1.5), (0, 1.0, 1.05), 20), ((0, -3.5, 1.48), (0, 1.0, 1.05), 20))),
    ]
    for i, x in enumerate(s):
        x['e'] = s[i + 1]['t'] if i + 1 < len(s) else D['duration'] + 0.1
    return s

# ------------------------------------------------------------------ utilidades de animación
def descendants(o):
    out = [o]
    for c in o.children: out += descendants(c)
    return out

def visible_between(root, t0, t1):
    objs = descendants(root)
    def f(t):
        h = not (t0 <= t < t1)
        for o in objs: o.hide_render = h
    ANIM.append(f)

def emis_text(s, loc, size, color, parent=None, strength=2.0, align='CENTER'):
    return text(s, loc, size, mat('et' + color, color, 0.5, emit=strength), parent=parent, align=align)

def dyn_text(obj, fn):
    def f(t): obj.data.body = fn(t)
    ANIM.append(f)

def animate_person(p, who):
    m = p['mouth']; base = tuple(m.scale)
    lid0 = [tuple(l.location) for l in p['lids']]
    def f(t):
        o = (0.45 + 0.55 * abs(math.sin(t * 13))) if talking(who, t) else 0.0
        m.scale = (base[0] * (1 - 0.1 * o), base[1], base[2] + 0.5 * o * (1 if base[2] < 0.3 else 0.3))
        blink = ((t % 4.1) < 0.12) if who != 'D' else (((t + 1.7) % 3.7) < 0.12)
        for l, l0 in zip(p['lids'], lid0):
            l.scale[2] = 1.0 if blink else 0.05
            l.location = (l0[0], l0[1], l0[2] if blink else l0[2] + 0.052)
        h = p['head']
        h.rotation_euler = (0.05 * math.sin(t * 3.1) * (1 if talking(who, t) else 0.3), 0, 0.06 * math.sin(t * 1.7 + (1 if who == 'D' else 0)))
        p['root'].location[2] = p['z0'] + 0.006 * math.sin(t * 2.2)
    ANIM.append(f)

def mk(who, loc, **kw):
    expr = kw.pop('expr', None)
    p = person(who, loc, **kw); p['z0'] = loc[2]
    if expr: expression(p, expr)
    animate_person(p, who)
    return p

def camera(sh):
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); bpy.context.collection.objects.link(cam)
    bpy.context.scene.camera = cam; cam.data.sensor_fit = 'VERTICAL'
    (l0, t0, f0), (l1, t1, f1) = sh['cam']
    cam.data.dof.use_dof = True
    def f(t):
        k = eo((t - sh['t']) / 0.6) if sh.get('fast') else eio((t - sh['t']) / max(0.1, sh['e'] - sh['t']))
        loc = Vector(l0).lerp(Vector(l1), k); tgt = Vector(t0).lerp(Vector(t1), k)
        cam.location = loc; look(cam, tgt)
        cam.data.lens = f0 + (f1 - f0) * k
        cam.data.dof.focus_distance = (tgt - loc).length
        cam.data.dof.aperture_fstop = 2.2 if cam.data.lens >= 40 else 4.5
    ANIM.append(f)

# ------------------------------------------------------------------ escenarios con su contenido
def build_jet(sh, i):
    jet()
    pig_on = sh['t'] < L(3)
    paper_on = sh.get('v') == 'paper'
    d = mk('D', (-0.75, 0.05, 0.0), pose='sit', arms='lap' if pig_on else 'rest', expr=sh.get('dexpr'))
    r = mk('R', (0.75, 0.05, 0.0), pose='sit', arms='holdL' if paper_on else 'rest', expr='smug')
    if pig_on:
        pg = piggy((-0.75, -0.36, 0.72), 1.0)
        tq = T('quemando', L(1)) - 0.1
        fr, flames = fire((-0.75, -0.36, 0.86), 0.9)
        base = [tuple(f.scale) for f in flames]
        def ff(t):
            on = cl((t - tq) / 0.25)
            fr.scale = (0.9 * on + 1e-4,) * 3
            for j, fl in enumerate(flames):
                k = 1 + 0.18 * math.sin(t * 17 + j * 1.7)
                fl.scale = (base[j][0] * (2 - k), base[j][1] * (2 - k), base[j][2] * k)
        ANIM.append(ff)
    if paper_on:
        pr, _ = paper((0.47, -0.36, 1.2), (0, 0, 0.12), 0.42, 0.56, [
            ('CONTRATO', 0.05, '#1d1a17', 0.2), ('¿Comisión pactada? NO', 0.032, '#c0262d', 0.09),
            ('¿Aviso 2 meses? NO', 0.032, '#c0262d', 0.02), ('RECLAMA', 0.06, '#1f7a4d', -0.1),
            ('al banco → Banco de España', 0.022, '#555555', -0.19)])
        def pf(t):
            k = eback((t - L(15)) / 0.5); pr.scale = (k + 1e-4,) * 3
        ANIM.append(pf)

def build_vault(sh, i):
    v = vault()
    wheel = v['wheel']
    ANIM.append(lambda t: setattr(wheel, 'rotation_euler', (0, t * 0.6, 0)))
    sc = v['screen'].location; cal = v['cal'].location
    top = emis_text('', (sc[0], sc[1] - 0.05, sc[2] + 0.3), 0.13, '#9fb6d9', strength=3)
    big = emis_text('', (sc[0], sc[1] - 0.05, sc[2] + 0.02), 0.3, '#ffffff', strength=4)
    sub = emis_text('', (sc[0], sc[1] - 0.05, sc[2] - 0.3), 0.13, '#7fe0a8', strength=3)
    ctop = text('MES', (cal[0], cal[1] - 0.04, cal[2] + 0.27), 0.12, mat('white', '#ffffff', 0.4))
    cbig = text('1', (cal[0], cal[1] - 0.04, cal[2] - 0.08), 0.46, mat('ink#1d1a17', '#1d1a17', 0.5))
    v_ = sh['v']
    if v_ == 'monthly':
        mk('R', (1.0, 0.35, 0), pose='stand', arms='pointL', rotz=0.25, expr='smug')
        st = [T('metes', L(5)), T('sacas', L(5)), T('intereses', L(5))]
        month = lambda t: 1 if t < st[2] else 1 + min(3, int((t - st[2]) / 0.7) + 1)
        stacks = [cash_stack((-0.85 + 0.38 * j, 0.9, 0.83)) for j in range(4)]
        def mf(t):
            out = st[1] <= t < st[2]
            for j, s_ in enumerate(stacks):
                s_.scale = (1, 1, 0.0001 if (out and j >= 2) else 1)
        ANIM.append(mf)
        dyn_text(top, lambda t: 'Cuenta remunerada')
        dyn_text(big, lambda t: fmt(20000 + 50 * (month(t) - 1)) + ' €')
        dyn_text(sub, lambda t: '+50 € al mes' if month(t) > 1 else ('Lo sacas cuando quieras' if t > st[1] else 'Disponible'))
        dyn_text(cbig, lambda t: str(month(t)))
    if v_ == 'fgd':
        mk('R', (1.0, 0.35, 0), pose='stand', arms='pointL', rotz=0.25, expr='smug')
        mk('D', (-1.0, 0.5, 0), pose='stand', arms='down', rotz=-0.15, expr='worry')
        for j in range(4): cash_stack((-0.85 + 0.38 * j, 0.9, 0.83))
        pl = empty('plaque', (0, 2.9, 1.72))
        box((0, 0, 0), (1.55, 0.06, 0.62), mat('gold', '#d4a94a', 0.3, metal=0.8), bevel=0.03, parent=pl)
        box((-0.55, -0.04, 0), (0.28, 0.03, 0.34), mat('shield', '#50519E', 0.4), bevel=0.06, parent=pl)
        text('€', (-0.55, -0.06, -0.01), 0.22, mat('white', '#ffffff', 0.4), parent=pl)
        for s_, size, z in [('FONDO DE GARANTÍA', 0.075, 0.2), ('100.000 €', 0.2, 0.0), ('por persona y banco', 0.07, -0.2)]:
            text(s_, (0.15, -0.04, z), size, mat('ink#3d2a07', '#3d2a07', 0.5), parent=pl)
        f = T('fondo', L(7))
        ANIM.append(lambda t: setattr(pl, 'scale', (eback((t - f + 0.25) / 0.45) + 1e-4,) * 3))
        dyn_text(top, lambda t: 'Tu dinero'); dyn_text(big, lambda t: 'Protegido'); dyn_text(sub, lambda t: 'hasta 100.000 €')
    if v_ == 'years':
        mk('R', (1.0, 0.35, 0), pose='stand', arms='pointL', rotz=0.25, expr='smug')
        stacks = [cash_stack((-0.85 + 0.38 * j, 0.9, 0.83)) for j in range(4)]
        k2 = lambda t: eio((t - L(10) - 0.2) / (LE(10) - L(10) - 0.3))
        yr = lambda t: 1 + round(9 * k2(t))
        def yf(t):
            for j, s_ in enumerate(stacks): s_.scale = (1, 1, 1 + k2(t) * (2 + j * 1.3))
        ANIM.append(yf)
        dyn_text(ctop, lambda t: 'AÑO'); dyn_text(cbig, lambda t: str(yr(t)))
        dyn_text(top, lambda t: f'Al 3 % · año {yr(t)}')
        dyn_text(big, lambda t: fmt(20000 * 1.03 ** yr(t)) + ' €')
        dyn_text(sub, lambda t: 'En tu banco: ' + fmt(20000 * 1.0016 ** yr(t)) + ' €')
        sub.data.materials[0] = mat('etred', '#ff9c8f', 0.5, emit=3)

def build_banks(sh, i):
    b = banks()
    s1, s2 = b['s1'].location, b['s2'].location
    ink = lambda c: mat('ink' + c, c, 0.5)
    if sh['v'] == 1:
        mk('D', (-1.05, -0.3, 0), pose='stand', arms='down', expr='worry')
        mk('R', (1.05, -0.3, 0), pose='stand', arms='down', expr='smug')
        text('TU CUENTA', (s1[0], s1[1] - 0.04, s1[2] + 0.28), 0.13, ink('#555555'))
        text('0,16 %', (s1[0], s1[1] - 0.04, s1[2] - 0.1), 0.4, ink('#931219'))
        text('REMUNERADA', (0, -0.04, 0.24), 0.13, ink('#1f5a40'), parent=b['s2'])
        text('3 %', (0, -0.04, -0.1), 0.4, ink('#14402d'), parent=b['s2'])
        tr = T('tres', L(3)) - 0.15
        ANIM.append(lambda t: setattr(b['s2'], 'scale', (eback((t - tr) / 0.45) + 1e-4,) * 3))
    else:
        d = mk('D', (-1.05, -0.3, 0), pose='stand', arms='holdR', expr='worry')
        r = mk('R', (1.05, -0.3, 0), pose='stand', arms='holdR', expr='smug')
        hr = d['hands'][1].location
        rc, _ = paper((hr[0], hr[1] - 0.02, hr[2] + 0.13), (0, 0, 0), 0.16, 0.22, [('32 €', 0.05, '#931219', 0.0)], parent=d['root'])
        hr2 = r['hands'][1].location
        for j in range(3): cash_stack((hr2[0], hr2[1] - 0.05, hr2[2] + 0.04 + j * 0.0), 0.08, parent=r['root']).rotation_euler = (0, 0, 0.3 * (j - 1))
        a, bb = T('cuatrocientos', L(9)), T('treinta', L(9))
        text('Tu cuenta, al año', (s1[0], s1[1] - 0.04, s1[2] + 0.28), 0.11, ink('#555555'))
        n1 = text('+0 €', (s1[0], s1[1] - 0.04, s1[2] - 0.1), 0.34, ink('#931219'))
        text('Remunerada, al año', (0, -0.04, 0.24), 0.1, ink('#1f5a40'), parent=b['s2'])
        n2 = text('+0 €', (0, -0.04, -0.1), 0.26, ink('#14402d'), parent=b['s2'])
        dyn_text(n1, lambda t: '+' + fmt(32 * eo((t - bb) / 0.6)) + ' €')
        dyn_text(n2, lambda t: ('+' + fmt(400 * eo((t - a) / 1.2)) + ' €') if t < a + 1.2 else '+400–600 €')

def build_office(sh, i):
    office()
    v = sh['v']
    if v in ('fee', 'phone'):
        bk = mk('B', (0.45, 1.2, 0), pose='sit', arms='stamp', expr=None)
        c = T('comisión', L(12))
        hand = bk['hands'][1]
        stamp = empty('stamp', tuple(hand.location), bk['root'])
        cyl((0, 0, -0.08), 0.06, 0.05, mat('stampR', '#9b1c1c', 0.5), parent=stamp)
        cyl((0, 0, 0.0), 0.025, 0.12, mat('stampW', '#7a4a2c', 0.4), parent=stamp)
        sphere((0, 0, 0.07), 0.04, mat('stampW', '#7a4a2c', 0.4), parent=stamp)
        h0 = tuple(hand.location)
        arm = [o for o in bk['arm_objs']]
        def sf(t):
            dz = -0.12 * math.sin(cl((t - c + 0.35) / 0.6) * math.pi)
            stamp.location = (h0[0], h0[1], h0[2] + dz); hand.location = (h0[0], h0[1], h0[2] + dz)
        ANIM.append(sf)
        pr, objs = paper((0.65, 0.55, 0.83), (-1.25, 0, 0.12), 0.42, 0.3, [
            ('AVISO DE CARGO', 0.035, '#333333', 0.1), ('Comisión de mantenimiento', 0.028, '#931219', 0.02), ('−15,00 €', 0.07, '#931219', -0.08)])
        for o in objs[1:]:
            ANIM.append(lambda t, o=o: setattr(o, 'scale', ((1.0 if t >= c else 0.0001),) * 3))
        if v == 'fee':
            mk('D', (-0.75, -0.55, 0), pose='stand', arms='down', rotz=0.45, expr='normal')
        else:
            d = mk('D', (-0.75, -0.55, 0), pose='stand', arms='holdR', rotz=0.2, expr='shock')
            hp = d['hands'][1].location
            ph = empty('phone', (hp[0] - 0.02, hp[1] - 0.05, hp[2] + 0.12), d['root'])
            ph.scale = (1.7, 1.7, 1.7)
            box((0, 0, 0), (0.1, 0.012, 0.2), mat('phoneB', '#151515', 0.2, coat=1), bevel=0.012, parent=ph)
            box((0, -0.007, 0), (0.086, 0.002, 0.18), mat('phoneS', '#ffffff', 0.3, emit=1.5), bevel=0, parent=ph)
            text('Comisión', (0, -0.01, 0.03), 0.018, mat('etr', '#931219', 0.5, emit=0.6), parent=ph)
            text('−15 €', (0, -0.01, -0.02), 0.03, mat('etr', '#931219', 0.5, emit=0.6), parent=ph)
    else:
        bk = mk('B', (0.45, 1.2, 0), pose='sit', arms='eat')
        hand = bk['hands'][1]; hp = hand.location
        fk = mat('fork', '#c9c9c9', 0.2, metal=1)
        cyl((hp[0], hp[1] - 0.02, hp[2] + 0.1), 0.008, 0.18, fk, parent=bk['root'])
        cake = empty('cake', (0.7, 0.6, 0.82))
        cyl((0, 0, 0.12), 0.26, 0.24, mat('sponge', '#7a4a2a', 0.6), parent=cake)
        cyl((0, 0, 0.245), 0.265, 0.03, mat('icing', '#fbe1ec', 0.4, coat=0.5), parent=cake)
        cyl((0, 0, 0.0), 0.33, 0.02, mat('china', '#ffffff', 0.15, coat=0.6), parent=cake)
        text('TU DINERO', (0, -0.27, 0.12), 0.06, mat('white', '#ffffff', 0.4), parent=cake)
        ANIM.append(lambda t: setattr(cake, 'scale', (1, 1, 1 - 0.55 * cl((t - L(14)) / (LE(14) - L(14))))))
        d = mk('D', (-0.75, -0.55, 0), pose='stand', arms='lap', rotz=0.45, expr='worry')
        plate = cyl((0, -0.38, 1.02), 0.16, 0.015, mat('china', '#ffffff', 0.15, coat=0.6), parent=d['root'])
        m = T('migajas', L(14))
        crumbs = [sphere((0, 0, 0), 0.012 + 0.006 * (j % 3), mat('sponge', '#7a4a2a', 0.6), seg=10) for j in range(10)]
        dp = d['root'].matrix_world
        def cf(t):
            for j, cr in enumerate(crumbs):
                ph = cl((t - m + 0.9 - j * 0.07) / 0.7)
                start = Vector((0.5 + 0.03 * j, 0.25, 0.9)); end = Vector((-1.0 + 0.3 * math.sin(0.45) - 0.04 + 0.02 * (j % 4), -0.4 - 0.35 * math.cos(0.45) + 0.02 * (j % 3), 1.05))
                p = start.lerp(end, ph); p.z += 0.25 * math.sin(ph * math.pi)
                cr.location = p if ph > 0 else Vector((0, 0, -5))
        ANIM.append(cf)

def build_terrace(sh, i):
    terrace()
    d = mk('D', (-0.6, -0.15, 0), pose='sit', arms='lap', rotz=0.3, expr='normal')
    ph = empty('phone', (0, -0.36, 0.95), d['root']); ph.rotation_euler = (-0.6, 0, 0)
    box((0, 0, 0), (0.1, 0.012, 0.2), mat('phoneB', '#151515', 0.2, coat=1), bevel=0.012, parent=ph)
    box((0, -0.007, 0), (0.086, 0.002, 0.18), mat('phoneS', '#ffffff', 0.3, emit=1.5), bevel=0, parent=ph)
    text('0,00 %', (0, -0.01, 0), 0.025, mat('etr', '#931219', 0.5, emit=0.6), parent=ph)
    sg = T('sígueme', L(16))
    r1 = mk('R', (0.8, -0.15, 0), pose='sit', arms='rest', rotz=-0.3, summer=True, sun=True)
    r2 = mk('R', (0.8, -0.15, 0), pose='sit', arms='point', rotz=-0.3, summer=True, sun=True)
    visible_between(r1['root'], -1, sg); visible_between(r2['root'], sg, 999)

BUILD = dict(jet=build_jet, vault=build_vault, banks=build_banks, office=build_office, terrace=build_terrace)

def setup_render():
    s = bpy.context.scene
    s.render.engine = 'CYCLES'; s.cycles.device = 'CPU'
    s.cycles.samples = 10; s.cycles.use_adaptive_sampling = True; s.cycles.adaptive_threshold = 0.05
    s.cycles.use_denoising = True; s.cycles.denoiser = 'OPENIMAGEDENOISE'
    s.cycles.max_bounces = 3; s.cycles.diffuse_bounces = 2; s.cycles.glossy_bounces = 1; s.cycles.transmission_bounces = 1
    s.render.use_persistent_data = False
    s.render.resolution_x = 540; s.render.resolution_y = 960
    s.view_settings.view_transform = 'AgX'; s.view_settings.look = 'AgX - Punchy'
    s.render.fps = FPS
    s.render.image_settings.file_format = 'PNG'

def main():
    args = sys.argv[sys.argv.index('--') + 1:]
    n = int(args[0]); S = shots(); sh = S[n]
    reset(); ANIM.clear()
    BUILD[sh['set']](sh, n)
    camera(sh)
    setup_render()
    sc = bpy.context.scene
    def handler(scene, *a):
        t = scene.frame_current / FPS
        for f in ANIM: f(t)
    bpy.app.handlers.frame_change_pre.append(handler)
    if len(args) > 1 and args[1] == 'still':
        t = float(args[2]); f = int(round(t * FPS)); sc.frame_start = sc.frame_end = f
        sc.frame_set(f); handler(sc)
        os.makedirs(os.path.join(HERE, 'stills'), exist_ok=True)
        sc.render.filepath = os.path.join(HERE, 'stills', f's{n:02d}_{t:.2f}.png')
        bpy.ops.render.render(write_still=True)
    else:
        g0 = math.ceil(sh['t'] * FPS); g1 = math.ceil(sh['e'] * FPS) - 1
        sc.frame_start, sc.frame_end = g0, g1
        sc.render.filepath = os.path.join(HERE, 'frames', 'f_')
        bpy.ops.render.render(animation=True)
    print('SHOT_DONE', n)

main()
