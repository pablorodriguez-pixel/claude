# Escenarios 3D: jet, cámara acorazada, sucursales, despacho y terraza.
import math
from lib3d import *
from lib3d import _finish

def seat(loc, rotz=0.0, s=1.0):
    x, y, z = loc
    root = empty('seat', loc); root.rotation_euler = (0, 0, rotz); root.scale = (s, s, s)
    lea = mat('leather', '#e9dcc0', 0.38, coat=0.2); dark = mat('leatherD', '#cdbb98', 0.45)
    box((0, 0, 0.2), (0.8, 0.78, 0.36), dark, bevel=0.06, parent=root)
    box((0, -0.04, 0.44), (0.66, 0.7, 0.16), lea, bevel=0.07, parent=root)
    box((0, 0.33, 0.95), (0.74, 0.22, 1.1), lea, bevel=0.1, parent=root)
    box((0, 0.27, 1.3), (0.5, 0.12, 0.3), dark, bevel=0.06, parent=root)
    for sx in (-1, 1):
        box((0.39 * sx, -0.02, 0.62), (0.16, 0.74, 0.22), lea, bevel=0.07, parent=root)
    return root

def piggy(loc, s=1.0, parent=None):
    root = empty('piggy', loc, parent); root.scale = (s, s, s)
    pk = mat('pig', '#f5a9bd', 0.4, sss=0.2, coat=0.3); dk = mat('pigD', '#e88aa3', 0.45)
    sphere((0, 0, 0), 0.17, pk, scale=(1.25, 1, 0.95), parent=root)
    cyl((0, -0.2, -0.0), 0.06, 0.06, dk, rot=(math.pi / 2, 0, 0), parent=root)
    for sx in (-1, 1):
        sphere((0.02 * sx, -0.232, 0.0), 0.012, mat('pigN', '#9c4560', 0.4), parent=root, seg=12)
        cone((0.09 * sx, -0.05, 0.15), 0.05, 0.08, dk, rot=(0.3, 0.3 * sx, 0), parent=root)
        sphere((0.07 * sx, -0.15, 0.06), 0.018, mat('eyeK', '#121212', 0.1, coat=1), parent=root, seg=12)
        for sy in (-1, 1): cyl((0.12 * sx, 0.07 * sy, -0.15), 0.035, 0.08, dk, parent=root)
    box((0, 0.0, 0.16), (0.1, 0.02, 0.01), mat('eyeK', '#121212'), bevel=0.004, parent=root)
    text('20.000 €', (0, -0.172, -0.07), 0.055, mat('pigT', '#8c2a47', 0.5), parent=root)
    return root

def fire(loc, s, parent=None):
    """Llamas: conos emisivos (se animan escalando)."""
    root = empty('fire', loc, parent); root.scale = (s, s, s)
    f1 = mat('fire1', '#ff5a1f', 0.5, emit=12); f2 = mat('fire2', '#ffb12b', 0.5, emit=18); f3 = mat('fire3', '#fff1a0', 0.5, emit=25)
    flames = []
    for i, (x, h, m) in enumerate([(-0.1, 0.32, f1), (0.08, 0.38, f1), (0.0, 0.46, f1), (-0.05, 0.3, f2), (0.06, 0.32, f2), (0.0, 0.2, f3)]):
        c = cone((x, -0.02 * i, h / 2), 0.08 if m != f3 else 0.06, h, m, parent=root)
        flames.append(c)
    point((0, -0.2, 0.25), 60, 0.2, (1, 0.55, 0.2)).parent = root
    return root, flames

def jet():
    world('#1a120c', 0.15)
    cream = mat('cabin', '#e8dcc6', 0.55); wood = mat('wood', '#6b4429', 0.35, coat=0.5)
    carpet = mat('carpet', '#3a281d', 0.95); runner = mat('runner', '#6a4a36', 0.9)
    # casco
    c = cyl((0, 5, 1.15), 1.65, 18, cream, rot=(math.pi / 2, 0, 0), verts=96)
    box((0, 5, -0.05), (3.4, 18, 0.1), carpet, bevel=0)
    box((0, 5, 0.006), (0.7, 18, 0.01), runner, bevel=0)
    for sx in (-1, 1):
        box((1.42 * sx, 5, 0.38), (0.2, 18, 0.76), wood, bevel=0.02)
        box((1.12 * sx, 5, 2.25), (0.6, 18, 0.42), mat('bins', '#d9cbb0', 0.5), bevel=0.04)
        box((0.86 * sx, 5, 2.04), (0.08, 18, 0.04), mat('strip', '#ffe2a8', 0.5, emit=6), bevel=0.01)
    box((0, 12.0, 1.3), (3.4, 0.2, 2.6), wood, bevel=0.02)
    box((0, 11.88, 1.0), (0.8, 0.06, 1.9), mat('door', '#2b1d14', 0.4), bevel=0.03)
    # ventanillas
    glow = mat('window', '#ffad55', 0.3, emit=7)
    frame = mat('wframe', '#d7c6a6', 0.4)
    for y in [-1.6, -0.6, 0.4, 1.4, 2.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4]:
        for sx in (-1, 1):
            o = cyl((1.45 * sx, y, 1.62), 0.13, 0.04, glow, rot=(0, math.pi / 2, 0), scale=(1.5, 1, 1))
            torus((1.43 * sx, y, 1.62), 0.13, 0.03, frame, rot=(0, math.pi / 2, 0), scale=(1.55, 1, 1))
    # luces de techo
    for y in (-1, 1.5, 4, 7, 10):
        point((0, y, 2.35), 35, 0.3, (1, 0.85, 0.65))
    area((0, -3.5, 2.4), 260, 2.5, (1, 0.92, 0.82), target=(0, 0.5, 1.0))
    area((-1.2, -1.0, 1.6), 60, 1.0, (1, 0.7, 0.45), target=(0.5, 0.3, 1.0))
    # asientos de fondo
    for y in (2.6, 4.6, 6.6):
        for sx in (-1, 1): seat((0.75 * sx, y, 0), 0)
    # mesitas
    for sx in (-1, 1):
        cyl((1.22 * sx, -0.2, 0.62), 0.22, 0.05, wood)
        cyl((1.22 * sx, -0.2, 0.3), 0.04, 0.6, wood)
    cup = mat('china', '#ffffff', 0.15, coat=0.6)
    cyl((-1.2, -0.25, 0.71), 0.05, 0.11, cup); torus((-1.2, -0.25, 0.65), 0.07, 0.012, cup)
    gl = mat('whisky', '#d38a2c', 0.05, coat=1)
    cyl((1.2, -0.25, 0.7), 0.045, 0.1, gl)
    # asientos delanteros
    seat((-0.75, 0.15, 0)); seat((0.75, 0.15, 0))


# ------------------------------------------------------------------ props
def cash_stack(loc, h=0.12, parent=None):
    g = mat('bill', '#86c595', 0.6); band = mat('band', '#d9b25c', 0.4)
    root = empty('stack', loc, parent)
    box((0, 0, h / 2), (0.32, 0.15, h), g, bevel=0.01, parent=root)
    box((0, 0, h / 2), (0.06, 0.155, h * 1.01), band, bevel=0.003, parent=root)
    return root

def paper(loc, rot, w, h, lines, parent=None):
    """Hoja con líneas de texto: [(texto, tamaño, color, z)]"""
    root = empty('paper', loc, parent); root.rotation_euler = rot
    box((0, 0, 0), (w, 0.006, h), mat('paperW', '#fffdf5', 0.6), bevel=0.003, parent=root)
    objs = []
    for s, size, col, z in lines:
        objs.append(text(s, (0, -0.005, z), size, mat('ink' + col, col, 0.5), parent=root))
    return root, objs

def screen(loc, w, h, parent=None):
    root = empty('screen', loc, parent)
    box((0, 0, 0), (w + 0.08, 0.06, h + 0.08), mat('bezel', '#111111', 0.3, coat=1), bevel=0.02, parent=root)
    box((0, -0.032, 0), (w, 0.005, h), mat('scr', '#13203d', 0.4, emit=1.2), bevel=0.0, parent=root)
    return root

def sign(loc, w, h, color, parent=None, emit=0.0):
    root = empty('sign', loc, parent)
    box((0, 0, 0), (w, 0.05, h), mat('sign' + color, color, 0.5, emit=emit), bevel=0.03, parent=root)
    return root

def plant(loc, s=1.0):
    root = empty('plant', loc); root.scale = (s, s, s)
    cyl((0, 0, 0.18), 0.17, 0.36, mat('pot', '#c26b3c', 0.6), parent=root, bevel=0.0)
    lf = mat('leaf', '#4f9e5e', 0.5)
    for i in range(7):
        a = i * 2 * math.pi / 7
        cone((0.12 * math.cos(a), 0.12 * math.sin(a), 0.62), 0.07, 0.6, lf, rot=(0.45 * math.sin(a), -0.45 * math.cos(a), 0), parent=root)
    return root

# ------------------------------------------------------------------ cámara acorazada
def vault():
    world('#20180f', 0.2)
    wall = mat('vwall', '#e6d6b8', 0.7); marble = mat('marble', '#efece6', 0.18, coat=0.4)
    box((0, 1, -0.05), (9, 9, 0.1), marble, bevel=0)
    box((0, 3.1, 1.9), (9, 0.2, 3.8), wall, bevel=0)
    box((-3.0, 0, 1.9), (0.2, 7, 3.8), wall, bevel=0)
    box((0, 1, 3.85), (9, 9, 0.1), mat('vceil', '#2b2420', 0.8), bevel=0)
    box((0, 3.0, 0.15), (9, 0.05, 0.3), mat('skirt', '#6b4429', 0.4), bevel=0.01)
    # cajas de seguridad (izquierda)
    steel = mat('steel', '#b4bac1', 0.35, metal=0.5)
    for r in range(6):
        for c in range(4):
            box((-2.6 + c * 0.32, 3.0, 0.6 + r * 0.38), (0.29, 0.06, 0.34), steel, bevel=0.015)
            sphere((-2.6 + c * 0.32, 2.96, 0.6 + r * 0.38), 0.02, mat('knob', '#555555', 0.3, metal=1), seg=12)
    # puerta de la cámara
    door = empty('vdoor', (1.75, 2.95, 1.6))
    cyl((0, 0, 0), 1.35, 0.3, mat('vring', '#9aa1a8', 0.38, metal=0.45), rot=(math.pi / 2, 0, 0), parent=door, verts=96)
    cyl((0, -0.12, 0), 1.12, 0.12, mat('vface', '#c9ced4', 0.32, metal=0.5), rot=(math.pi / 2, 0, 0), parent=door, verts=96)
    for i in range(12):
        a = i * math.pi / 6
        sphere((math.cos(a) * 1.22, -0.17, math.sin(a) * 1.22), 0.05, steel, parent=door, seg=16)
    wheel = empty('wheel', (0, -0.25, 0), door)
    torus((0, 0, 0), 0.42, 0.04, steel, rot=(math.pi / 2, 0, 0), parent=wheel)
    for a in (0, 60, 120):
        box((0, 0, 0), (1.0, 0.05, 0.06), steel, bevel=0.02, rot=(0, math.radians(a), 0), parent=wheel)
    cyl((0, 0, 0), 0.12, 0.1, steel, rot=(math.pi / 2, 0, 0), parent=wheel)
    # pantalla y calendario
    scr = screen((0.0, 2.97, 2.75), 1.7, 0.95)
    cal = empty('cal', (-1.55, 2.98, 2.7)); cal.rotation_euler = (0, 0.05, 0)
    box((0, 0, 0), (0.6, 0.03, 0.7), mat('calW', '#ffffff', 0.5), bevel=0.02, parent=cal)
    box((0, -0.01, 0.27), (0.6, 0.035, 0.16), mat('calR', '#c0262d', 0.5), bevel=0.02, parent=cal)
    # mesa
    tm = mat('tablem', '#cfd3d8', 0.3, metal=0.7)
    box((-0.3, 0.9, 0.8), (1.8, 0.8, 0.06), tm, bevel=0.02)
    for sx in (-1, 1):
        for sy in (-1, 1): box((-0.3 + 0.8 * sx, 0.9 + 0.32 * sy, 0.4), (0.05, 0.05, 0.8), tm, bevel=0.01)
    # luces
    for x in (-2, 0, 2):
        cyl((x, 1.2, 3.79), 0.2, 0.02, mat('vlamp', '#fff3cf', 0.5, emit=8))
        d = bpy.data.lights.new('s', 'SPOT'); d.energy = 260; d.spot_size = 1.3; d.spot_blend = 0.6; d.color = (1, 0.88, 0.7); d.shadow_soft_size = 0.4
        o = bpy.data.objects.new('s', d); bpy.context.collection.objects.link(o); o.location = (x, 1.2, 3.7)
    area((0, -3.5, 2.5), 300, 3, (1, 0.93, 0.85), target=(0, 1.5, 1.4))
    area((0.5, -0.5, 2.8), 120, 1.5, (1, 0.95, 0.9), target=(1.75, 2.95, 1.6))
    return dict(screen=scr, cal=cal, wheel=wheel)

# ------------------------------------------------------------------ dos sucursales (pantalla partida en 3D)
def banks():
    world('#1d1d1d', 0.25)
    # izquierda: sucursal gris
    gw = mat('dullwall', '#a9b09c', 0.85); gf = mat('dullfloor', '#77756b', 0.7)
    box((-1.6, 1, -0.05), (3.2, 8, 0.1), gf, bevel=0)
    box((-1.6, 2.6, 1.9), (3.2, 0.2, 3.8), gw, bevel=0)
    box((-1.6, 1.6, 0.55), (2.6, 0.6, 1.1), mat('counter', '#8c7e64', 0.6), bevel=0.04)
    box((-1.6, 1.85, 1.45), (2.4, 0.04, 0.7), mat('glassdull', '#cfdcdf', 0.1), bevel=0.01)
    box((-1.6, 1.4, 3.3), (1.6, 0.1, 0.06), mat('tube', '#f1f6e2', 0.5, emit=4), bevel=0.01)
    area((-1.6, -2.5, 2.6), 160, 2.5, (0.85, 0.95, 0.9), target=(-1.6, 1.5, 1.2))
    # derecha: sucursal luminosa
    ww = mat('warmwall', '#f6ecdc', 0.7); wf = mat('warmfloor', '#d9b48a', 0.35, coat=0.3)
    box((1.6, 1, -0.05), (3.2, 8, 0.1), wf, bevel=0)
    box((1.6, 2.6, 1.9), (3.2, 0.2, 3.8), ww, bevel=0)
    box((1.6, 2.48, 1.55), (2.0, 0.04, 1.4), mat('sky', '#9fd6f2', 0.5, emit=2.5), bevel=0.02)
    box((1.6, 2.45, 1.55), (0.06, 0.06, 1.4), mat('mull', '#ffffff', 0.4), bevel=0.01)
    plant((2.0, 1.6, 0))
    area((1.6, -2.5, 2.6), 320, 2.5, (1, 0.93, 0.82), target=(1.6, 1.5, 1.2))
    # pared divisoria
    box((0, 0.6, 1.9), (0.12, 4.4, 3.8), mat('divider', '#ffffff', 0.5), bevel=0.02)
    box((-1.6, 1, 3.4), (3.2, 8, 0.1), mat('dullceil', '#8a907f', 0.9), bevel=0)
    box((1.6, 1, 3.4), (3.2, 8, 0.1), mat('warmceil', '#fbf3e6', 0.8), bevel=0)
    s1 = sign((-1.1, 2.45, 2.45), 1.7, 0.95, '#ecebe2')
    s2 = sign((1.1, 2.38, 2.85), 1.7, 0.95, '#A3D9C5')
    return dict(s1=s1, s2=s2)

# ------------------------------------------------------------------ despacho del banco
def office():
    world('#140d08', 0.15)
    wood = mat('owood', '#5c3a26', 0.45, coat=0.3); panel = mat('opanel', '#6b4630', 0.5)
    box((0, 1, -0.05), (8, 8, 0.1), mat('ofloor', '#3a271c', 0.8), bevel=0)
    box((0, 2.8, 1.9), (8, 0.2, 3.8), wood, bevel=0)
    for x in (-2.4, -1.2, 1.2, 2.4):
        box((x, 2.68, 1.4), (1.0, 0.04, 2.2), panel, bevel=0.03)
    # ventana con persiana
    box((0, 2.69, 2.0), (1.5, 0.02, 1.2), mat('osky', '#bfe3f5', 0.5, emit=3), bevel=0)
    for i in range(11):
        box((0, 2.64, 1.45 + i * 0.105), (1.52, 0.04, 0.05), mat('blind', '#efe6d2', 0.6), bevel=0.01)
    s = sign((0, 2.62, 3.2), 1.3, 0.38, '#1f3a6b')
    text('BANCO', (0, 2.59, 3.2), 0.24, mat('white', '#ffffff', 0.4, emit=0.5))
    # mesa
    box((0.3, 0.75, 0.78), (2.2, 1.0, 0.08), mat('desktop', '#7a4a2c', 0.25, coat=0.6), bevel=0.03)
    box((0.3, 0.3, 0.4), (2.1, 0.08, 0.74), wood, bevel=0.03)
    for sx in (-1, 1): box((0.3 + 1.02 * sx, 0.75, 0.4), (0.1, 0.9, 0.74), wood, bevel=0.02)
    point((0.3, 0.2, 2.6), 120, 0.5, (1, 0.85, 0.65))
    area((0, -3.2, 2.4), 260, 2.6, (1, 0.9, 0.8), target=(0, 1, 1.2))
    area((2.5, -0.5, 2.0), 80, 1.0, (0.7, 0.8, 1.0), target=(0, 1, 1.2))

# ------------------------------------------------------------------ terraza
def terrace():
    w = bpy.data.worlds.new('w'); bpy.context.scene.world = w; w.use_nodes = True
    nt = w.node_tree; sky = nt.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_elevation = 0.5; sky.sun_rotation = 2.6
    nt.links.new(sky.outputs['Color'], nt.nodes['Background'].inputs['Color']); nt.nodes['Background'].inputs['Strength'].default_value = 0.35
    d = bpy.data.lights.new('sun', 'SUN'); d.energy = 3.5; d.angle = 0.1; d.color = (1, 0.93, 0.82)
    o = bpy.data.objects.new('sun', d); bpy.context.collection.objects.link(o); o.rotation_euler = (0.9, 0.2, 2.6)
    box((0, 0, -0.05), (8, 6, 0.1), mat('terracotta', '#d58a5c', 0.6), bevel=0)
    box((0, 60, -0.6), (300, 110, 0.1), mat('sea', '#2a86b0', 0.08, coat=1), bevel=0)
    cream = mat('stone', '#f2e8d6', 0.6)
    box((0, 2.6, 1.02), (8, 0.3, 0.1), cream, bevel=0.03)
    box((0, 2.6, 0.06), (8, 0.3, 0.12), cream, bevel=0.03)
    for i in range(29):
        x = -3.9 + i * 0.28
        sphere((x, 2.6, 0.55), 0.09, cream, scale=(1, 1, 2.4), parent=None, seg=20)
    # pueblo en la colina
    sphere((-22, 70, -6), 18, mat('hill', '#8db26b', 0.9), scale=(1.4, 1, 0.75))
    cols = ['#f2c38f', '#e98b6d', '#f6e3b8', '#d97a5b', '#f0d29a', '#c96f52']
    import random; random.seed(4)
    for i in range(26):
        x = -36 + i * 1.3 + random.uniform(-0.4, 0.4); z = 2 + 5 * math.exp(-((x + 22) / 10) ** 2) + random.uniform(0, 1.5)
        box((x, 60 + random.uniform(0, 4), z), (1.1, 1.0, 1.4 + random.uniform(0, 1.2)), mat('h' + cols[i % 6], cols[i % 6], 0.8), bevel=0.05)
    # yate
    box((14, 45, -0.3), (5, 1.6, 0.8), mat('yacht', '#ffffff', 0.3), bevel=0.3)
    box((13.5, 45, 0.4), (2.4, 1.2, 0.7), mat('yacht', '#ffffff', 0.3), bevel=0.2)
    # sombrilla y mesa
    cyl((0.1, 0.7, 1.6), 0.03, 3.2, mat('pole', '#7a5236', 0.5))
    bpy.ops.mesh.primitive_cone_add(radius1=1.5, radius2=0.05, depth=0.45, location=(0.1, 0.7, 3.25), vertices=32)
    _finish(bpy.context.object, mat('parasol', '#f7f1e3', 0.7))
    cyl((0.1, 0.0, 0.74), 0.55, 0.04, mat('tabletop', '#fafafa', 0.3), bevel=0.0)
    cyl((0.1, 0.0, 0.37), 0.05, 0.74, mat('pole', '#7a5236', 0.5))
    gl = mat('whisky', '#d38a2c', 0.05, coat=1)
    for x in (-0.15, 0.32): cyl((x, -0.1, 0.81), 0.045, 0.1, gl)
