# Utilidades de Blender para el vídeo 3D: materiales, primitivas redondeadas y personajes.
import bpy, math, os
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, '..', 'build', 'poppins-bold.ttf')

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)

_mats = {}
def mat(name, color, rough=0.5, sss=0.0, emit=0.0, metal=0.0, coat=0.0):
    if name in _mats and _mats[name].name in bpy.data.materials:
        return _mats[name]
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    c = tuple(int(color[i:i+2], 16) / 255 for i in (1, 3, 5))
    lin = tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)
    p.inputs['Base Color'].default_value = (*lin, 1)
    p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metal
    p.inputs['Coat Weight'].default_value = coat
    if sss:
        p.inputs['Subsurface Weight'].default_value = sss
        p.inputs['Subsurface Radius'].default_value = (0.5, 0.25, 0.15)
        p.inputs['Subsurface Scale'].default_value = 0.03
    if emit:
        p.inputs['Emission Color'].default_value = (*lin, 1)
        p.inputs['Emission Strength'].default_value = emit
    _mats[name] = m
    return m

def _finish(o, m, smooth=True, bevel=0.0, parent=None):
    if m: o.data.materials.append(m)
    if smooth:
        for poly in o.data.polygons: poly.use_smooth = True
    if bevel:
        b = o.modifiers.new('bv', 'BEVEL'); b.width = bevel; b.segments = 4; b.limit_method = 'NONE'
        o.modifiers.new('ws', 'WEIGHTED_NORMAL')
    if parent: o.parent = parent
    return o

def sphere(loc, r, m, scale=(1, 1, 1), parent=None, seg=40):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=seg, ring_count=seg // 2)
    o = bpy.context.object; o.scale = scale
    return _finish(o, m, parent=parent)

def box(loc, size, m, bevel=0.03, rot=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    return _finish(o, m, smooth=False, bevel=bevel, parent=parent)

def cyl(loc, r, depth, m, rot=(0, 0, 0), parent=None, verts=48, bevel=0.0, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object; o.scale = scale
    if bevel: bpy.ops.object.transform_apply(scale=True)
    return _finish(o, m, smooth=True, bevel=bevel, parent=parent)

def torus(loc, R, r, m, rot=(0, 0, 0), parent=None, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, location=loc, rotation=rot, major_segments=48, minor_segments=12)
    o = bpy.context.object; o.scale = scale
    return _finish(o, m, parent=parent)

def cone(loc, r1, depth, m, rot=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_cone_add(radius1=r1, radius2=0, depth=depth, location=loc, rotation=rot, vertices=24)
    return _finish(bpy.context.object, m, parent=parent)

def tube(points, r, m, parent=None):
    """Extremidad redondeada que pasa por los puntos (con esferas en las articulaciones)."""
    cu = bpy.data.curves.new('tube', 'CURVE'); cu.dimensions = '3D'
    cu.bevel_depth = r; cu.bevel_resolution = 6; cu.use_fill_caps = True
    sp = cu.splines.new('POLY'); sp.points.add(len(points) - 1)
    for i, p in enumerate(points): sp.points[i].co = (*p, 1)
    o = bpy.data.objects.new('tube', cu); bpy.context.collection.objects.link(o)
    o.data.materials.append(m)
    if parent: o.parent = parent
    for p in points: sphere(p, r * 1.0, m, parent=parent, seg=24)
    return o

def text(s, loc, size, m, rot=(math.pi / 2, 0, 0), align='CENTER', parent=None, extrude=0.0):
    cu = bpy.data.curves.new('txt', 'FONT'); cu.body = s; cu.size = size
    cu.align_x = align; cu.align_y = 'CENTER'; cu.extrude = extrude
    try: cu.font = bpy.data.fonts.load(FONT, check_existing=True)
    except Exception: pass
    o = bpy.data.objects.new('txt', cu); bpy.context.collection.objects.link(o)
    o.location = loc; o.rotation_euler = rot
    o.data.materials.append(m)
    if parent: o.parent = parent
    return o

def empty(name, loc=(0, 0, 0), parent=None):
    o = bpy.data.objects.new(name, None); bpy.context.collection.objects.link(o)
    o.location = loc
    if parent: o.parent = parent
    return o

def area(loc, energy, size, color=(1, 0.9, 0.8), target=(0, 0, 1)):
    d = bpy.data.lights.new('a', 'AREA'); d.energy = energy; d.size = size; d.color = color
    o = bpy.data.objects.new('a', d); bpy.context.collection.objects.link(o); o.location = loc
    look(o, target)
    return o

def point(loc, energy, radius=0.1, color=(1, 0.85, 0.6)):
    d = bpy.data.lights.new('p', 'POINT'); d.energy = energy; d.shadow_soft_size = radius; d.color = color
    o = bpy.data.objects.new('p', d); bpy.context.collection.objects.link(o); o.location = loc
    return o

def look(o, target):
    dirv = Vector(target) - o.location
    o.rotation_euler = dirv.to_track_quat('-Z', 'Y').to_euler()

def world(color, strength=0.3):
    w = bpy.data.worlds.new('w'); bpy.context.scene.world = w; w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    c = tuple(int(color[i:i+2], 16) / 255 for i in (1, 3, 5))
    bg.inputs['Color'].default_value = (*c, 1); bg.inputs['Strength'].default_value = strength

# ------------------------------------------------------------------ personajes
SKIN_R, SKIN_D, SKIN_B = '#f1c3a0', '#f6d0b0', '#eebd98'

def person(who, loc, pose='stand', arms='down', rotz=0.0, summer=False, sun=False, scale=1.0):
    """Personaje de juguete (cabeza grande). Mira hacia -Y. Devuelve dict con raíz y piezas animables."""
    root = empty(f'{who}_root', loc); root.rotation_euler = (0, 0, rotz); root.scale = (scale,) * 3
    skin = mat('skin' + who, {'R': SKIN_R, 'D': SKIN_D, 'B': SKIN_B}[who], rough=0.55, sss=0.25)
    if who == 'R':
        top = mat('suitW' if summer else 'suit', '#f2f1ec' if summer else '#1f2c57', rough=0.6)
        pants = mat('pantsW' if summer else 'pantsR', '#e6dcc5' if summer else '#1b2549', rough=0.6)
        shoe = mat('shoeR', '#151515', rough=0.25, coat=0.6)
    elif who == 'D':
        top = mat('hoodie', '#3c5244', rough=0.85); pants = mat('jeans', '#3c5d92', rough=0.8)
        shoe = mat('sneaker', '#f3f3f3', rough=0.5)
    else:
        top = mat('suitB', '#5c636d', rough=0.6); pants = mat('pantsB', '#4a5058', rough=0.6)
        shoe = mat('shoeB', '#5a3920', rough=0.3, coat=0.5)
    sit = pose == 'sit'
    hip = 0.52 if sit else 0.82
    # piernas
    for sx in (-1, 1):
        x = 0.11 * sx
        if sit:
            tube([(x, 0.02, hip), (x * 1.05, -0.40, hip + 0.02), (x * 1.05, -0.44, 0.10)], 0.085, pants, root)
            box((x * 1.05, -0.50, 0.05), (0.15, 0.27, 0.1), shoe, bevel=0.04, parent=root)
        else:
            tube([(x, 0, hip), (x, -0.01, 0.42), (x, 0, 0.1)], 0.085, pants, root)
            box((x, -0.06, 0.05), (0.15, 0.27, 0.1), shoe, bevel=0.04, parent=root)
    # torso
    tz = hip + 0.29
    belly = who == 'B'
    torso = box((0, 0, tz), (0.56 if belly else 0.48, 0.34 if belly else 0.28, 0.6), top, bevel=0.12, parent=root)
    if belly: sphere((0, -0.12, tz - 0.06), 0.26, top, scale=(1.05, 0.8, 0.95), parent=root)
    if who == 'R' and not summer:
        box((0, -0.141, tz + 0.12), (0.12, 0.01, 0.3), mat('shirt', '#ffffff', 0.4), bevel=0.004, parent=root)
        box((0, -0.15, tz + 0.08), (0.05, 0.012, 0.3), mat('tie', '#b5121b', 0.35), bevel=0.006, parent=root)
        for sx in (-1, 1):
            box((0.085 * sx, -0.143, tz + 0.1), (0.07, 0.012, 0.32), mat('lapel', '#16204a', 0.5), bevel=0.01, rot=(0, -0.35 * sx, 0), parent=root)
        for z in (tz - 0.1, tz - 0.2):
            sphere((0, -0.146, z), 0.014, mat('btn', '#0c0c0c', 0.3), parent=root, seg=12)
    if who == 'R' and summer:
        box((0, -0.141, tz + 0.2), (0.1, 0.01, 0.1), skin, bevel=0.004, parent=root)
    if who == 'D':
        torus((0, 0.0, tz + 0.29), 0.17, 0.06, mat('hood', '#2f4236', 0.85), parent=root, scale=(1, 0.75, 1))
        box((0, -0.143, tz - 0.17), (0.3, 0.02, 0.13), mat('pocket', '#344a3d', 0.85), bevel=0.02, parent=root)
        lan = mat('lanyard', '#2f6fd6', 0.5)
        for sx in (-1, 1):
            tube([(0.09 * sx, -0.12, tz + 0.27), (0.03 * sx, -0.15, tz + 0.0)], 0.008, lan, root)
        box((0, -0.16, tz - 0.03), (0.15, 0.012, 0.09), mat('badge', '#ffffff', 0.4), bevel=0.008, parent=root)
        text('BECARIO', (0, -0.168, tz - 0.03), 0.032, mat('ink', '#141414', 0.5), parent=root)
    if who == 'B':
        box((0, -0.18, tz + 0.12), (0.1, 0.01, 0.2), mat('shirt', '#ffffff', 0.4), bevel=0.004, parent=root)
        box((0, -0.19, tz + 0.2), (0.07, 0.015, 0.035), mat('bow', '#2b4a7a', 0.4), bevel=0.008, parent=root)
    # cuello y cabeza
    sphere((0, 0, tz + 0.33), 0.075, skin, scale=(1, 1, 1.2), parent=root)
    hz = tz + 0.56
    head = empty(f'{who}_head', (0, 0, hz), root)
    sphere((0, 0, 0), 0.23, skin, scale=(1, 0.95, 1.08 if who != 'B' else 1.12), parent=head)
    for sx in (-1, 1): sphere((0.225 * sx, 0, 0), 0.05, skin, scale=(0.6, 1, 1.2), parent=head)
    sphere((0, -0.225, -0.02), 0.04, skin, scale=(1, 1, 1.15), parent=head)  # nariz
    white = mat('eyeW', '#ffffff', 0.15); black = mat('eyeK', '#121212', 0.1, coat=1)
    er = 0.062 if who == 'D' else 0.05
    eyes = []
    for sx in (-1, 1):
        e = sphere((0.085 * sx, -0.19, 0.06), er, white, scale=(1, 0.6, 1.1 if who == 'D' else 0.85), parent=head)
        sphere((0.085 * sx + 0.004 * sx, -0.222, 0.055), er * 0.45, black, parent=head, seg=16)
        lid = sphere((0.085 * sx, -0.19, 0.06), er * 1.06, skin, scale=(1.05, 0.66, 0.05), parent=head)
        eyes.append(lid)
    if who == 'R' and not sun:
        rim = mat('glass', '#1a1a1a', 0.2, metal=0.6)
        for sx in (-1, 1): torus((0.085 * sx, -0.215, 0.06), 0.066, 0.008, rim, rot=(math.pi / 2, 0, 0), parent=head, scale=(1.15, 1, 0.85))
        cyl((0, -0.22, 0.065), 0.006, 0.04, rim, rot=(0, math.pi / 2, 0), parent=head)
    if sun:
        sg = mat('sunglass', '#0b0b0b', 0.05, coat=1)
        for sx in (-1, 1): sphere((0.085 * sx, -0.215, 0.06), 0.07, sg, scale=(1.2, 0.3, 0.8), parent=head)
        box((0, -0.222, 0.08), (0.06, 0.01, 0.015), sg, bevel=0.004, parent=head)
    browc = {'R': '#3b2416', 'D': '#b48a2e', 'B': '#9a9a9a'}[who]
    brows = []
    for sx in (-1, 1):
        b = box((0.088 * sx, -0.2, 0.13), (0.09, 0.02, 0.022), mat('brow' + who, browc, 0.8), bevel=0.009, rot=(0, 0.12 * sx, 0), parent=head)
        brows.append(b)
    mouth = sphere((0, -0.208, -0.11), 0.06, mat('mouth', '#4a1414', 0.4), scale=(1.1, 0.35, 0.12), parent=head)
    if who == 'B':
        sphere((0, -0.225, -0.075), 0.05, mat('stache', '#8f8f8f', 0.9), scale=(1.7, 0.5, 0.45), parent=head)
    # pelo
    if who == 'R':
        hair = mat('hairR', '#4a2e1c', 0.45, coat=0.3)
        sphere((0, 0.05, 0.13), 0.24, hair, scale=(1.03, 0.98, 0.66), parent=head)
        sphere((0.03, -0.06, 0.22), 0.16, hair, scale=(1.25, 0.8, 0.42), parent=head)
    elif who == 'D':
        hair = mat('hairD', '#e2b64a', 0.55)
        sphere((0, 0.04, 0.13), 0.235, hair, scale=(1.03, 1.0, 0.64), parent=head)
        for i, (x, y, z, rx, ry) in enumerate([(-0.12, -0.08, 0.2, 0.5, -0.4), (0, -0.1, 0.24, 0.6, 0), (0.12, -0.08, 0.2, 0.5, 0.4), (-0.06, 0.04, 0.27, -0.2, -0.2), (0.07, 0.04, 0.27, -0.2, 0.3), (0, 0.12, 0.22, -0.7, 0)]):
            cone((x, y, z), 0.07, 0.17, hair, rot=(-rx, ry, 0), parent=head)
    else:
        hb = mat('hairB', '#cfcfcf', 0.8)
        for sx in (-1, 1): sphere((0.2 * sx, 0.04, 0.0), 0.08, hb, scale=(0.6, 1.2, 0.9), parent=head)
    # brazos
    sz = tz + 0.22; sx0 = 0.29 if belly else 0.26
    A = {
        'down':  [[(-sx0, 0, sz), (-sx0 - 0.04, 0, sz - 0.27), (-sx0 - 0.02, -0.04, sz - 0.52)], [(sx0, 0, sz), (sx0 + 0.04, 0, sz - 0.27), (sx0 + 0.02, -0.04, sz - 0.52)]],
        'rest':  [[(-sx0, 0, sz), (-sx0 - 0.06, -0.05, sz - 0.27), (-sx0 - 0.08, -0.3, sz - 0.33)], [(sx0, 0, sz), (sx0 + 0.06, -0.05, sz - 0.27), (sx0 + 0.08, -0.3, sz - 0.33)]],
        'lap':   [[(-sx0, 0, sz), (-sx0 - 0.03, -0.08, sz - 0.27), (-0.08, -0.33, sz - 0.33)], [(sx0, 0, sz), (sx0 + 0.03, -0.08, sz - 0.27), (0.08, -0.33, sz - 0.33)]],
        'holdR': [[(-sx0, 0, sz), (-sx0 - 0.06, -0.05, sz - 0.27), (-sx0 - 0.08, -0.3, sz - 0.33)], [(sx0, 0, sz), (sx0 + 0.06, -0.1, sz - 0.26), (sx0 - 0.02, -0.34, sz - 0.08)]],
        'holdL': [[(-sx0, 0, sz), (-sx0 - 0.06, -0.1, sz - 0.26), (-sx0 + 0.02, -0.34, sz - 0.08)], [(sx0, 0, sz), (sx0 + 0.06, -0.05, sz - 0.27), (sx0 + 0.08, -0.3, sz - 0.33)]],
        'pointL':[[(-sx0, 0, sz), (-sx0 - 0.22, -0.12, sz - 0.05), (-sx0 - 0.46, -0.2, sz + 0.06)], [(sx0, 0, sz), (sx0 + 0.04, 0, sz - 0.27), (sx0 + 0.02, -0.04, sz - 0.52)]],
        'point': [[(-sx0, 0, sz), (-sx0 - 0.06, -0.05, sz - 0.27), (-sx0 - 0.08, -0.3, sz - 0.33)], [(sx0, 0, sz), (sx0 + 0.12, -0.22, sz - 0.02), (sx0 + 0.16, -0.48, sz + 0.06)]],
        'eat':   [[(-sx0, 0, sz), (-sx0 - 0.04, -0.12, sz - 0.27), (-0.1, -0.4, sz - 0.3)], [(sx0, 0, sz), (sx0 + 0.06, -0.2, sz - 0.18), (0.06, -0.3, sz + 0.2)]],
        'stamp': [[(-sx0, 0, sz), (-sx0 - 0.04, -0.12, sz - 0.27), (-0.1, -0.4, sz - 0.3)], [(sx0, 0, sz), (sx0 + 0.1, -0.2, sz - 0.12), (sx0 + 0.05, -0.45, sz - 0.25)]],
    }[arms]
    hands = []
    before = set(bpy.data.objects)
    for arm in A:
        tube(arm, 0.07, top, root)
        h = sphere(arm[-1], 0.07, skin, scale=(1, 1, 1.1), parent=root)
        hands.append(h)
    arm_objs = [o for o in bpy.data.objects if o not in before]
    return dict(arm_objs=arm_objs, top=top, skin=skin, sz=sz, sx0=sx0, root=root, head=head, mouth=mouth, lids=eyes, brows=brows, hands=hands, hz=hz, tz=tz)

def lipsync(p, words, who, fps, frame0=1, t0=0.0, t1=999):
    """Anima la boca (abre/cierra) con las palabras de ese personaje, y parpadeos."""
    m = p['mouth']; base = m.scale.copy()
    f_start = int(t0 * fps); f_end = int(min(t1, 999) * fps)
    def talking(t):
        return any(w['who'] == who and w['s'] - 0.02 <= t <= w['e'] + 0.02 for w in words)
    for f in range(f_start, f_end + 1):
        t = f / fps
        o = (0.5 + 0.5 * abs(math.sin(t * 15))) if talking(t) else 0.0
        m.scale = (base[0] * (1 - 0.15 * o), base[1], base[2] * (1 + 4.5 * o))
        m.keyframe_insert('scale', frame=f - f_start + frame0)
        blink = (t % 4.1) < 0.12 if who != 'D' else ((t + 1.7) % 3.7) < 0.12
        for lid in p['lids']:
            lid.scale[2] = 1.0 if blink else 0.05
            lid.location[2] = 0.06 if blink else 0.06 + 0.055
            lid.keyframe_insert('scale', frame=f - f_start + frame0)
            lid.keyframe_insert('location', frame=f - f_start + frame0)
        # pequeño balanceo de cabeza al hablar
        h = p['head']; h.rotation_euler = (0.04 * math.sin(t * 3) * (1 if talking(t) else 0.3), 0, 0.05 * math.sin(t * 1.7))
        h.keyframe_insert('rotation_euler', frame=f - f_start + frame0)
    for fc in (m.animation_data.action.fcurves if m.animation_data else []):
        for k in fc.keyframe_points: k.interpolation = 'CONSTANT'

def expression(p, kind):
    """Cejas/ojos según emoción."""
    b0, b1 = p['brows']
    if kind == 'worry':
        b0.rotation_euler[1] = -0.35; b1.rotation_euler[1] = 0.35
    elif kind == 'shock':
        b0.location[2] += 0.04; b1.location[2] += 0.04
        p['mouth'].scale = (0.75, 0.35, 0.55)
    elif kind == 'confused':
        b0.location[2] += 0.03; b1.rotation_euler[1] = 0.3
    elif kind == 'smug':
        b0.rotation_euler[1] = 0.2; b1.rotation_euler[1] = -0.05
