"""EP06 «¿Lucía o Marcos?» en Blender: la escena 3D (torres de monedas, figuras, luces y cámara) sincronizada con la voz.
Los textos (cifras, nombres, subtítulos) van en la capa HTML encima; este script guarda por fotograma dónde caen en
pantalla las cosas a las que van pegados (pos.json).

Uso (Mac, con la GPU):  blender -b -P ep06_lucia_marcos.py -- ../../ep06-lucia-o-marcos [--stills 0.3,17.5] [cycles] [--escala 0.5]
Salida: <ep>/build/blender/f_00001.png … y <ep>/build/blender/pos.json
Todo sale de una función del tiempo, escena(t), como el render(t) de las escenas web: nada de keyframes."""
import bpy, json, math, os, sys, unicodedata, re
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
EP = os.path.abspath(args[0]); OUT = os.path.join(EP, 'build', 'blender'); os.makedirs(OUT, exist_ok=True)
STILLS = [float(x) for x in args[args.index('--stills') + 1].split(',')] if '--stills' in args else None
CYCLES = 'cycles' in args
ESCALA = float(args[args.index('--escala') + 1]) if '--escala' in args else 1.0
FPS = 30

# ───────── voz
SUBS = json.load(open(os.path.join(EP, 'build', 'subs.json')))
norm = lambda s: re.sub(r'[^\w]', '', unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode()).lower()
def vt(w, n=1):
    k = 0
    for x in SUBS:
        if norm(x['t']) == norm(w):
            k += 1
            if k == n: return x['s']
    raise KeyError(w)
DUR = SUBS[-1]['e'] + 1.6
cl = lambda x, a=0, b=1: max(a, min(b, x))
eo = lambda x: 1 - (1 - cl(x)) ** 3
def eio(x):
    x = cl(x); return 4 * x ** 3 if x < .5 else 1 - (-2 * x + 2) ** 3 / 2
p = lambda t, a, d: cl((t - a) / d)
lerp = lambda a, b, k: a + (b - a) * k
T = dict(lucia=vt('lucia'), marcos=vt('marcos'), siete=vt('siete'), lucia2=vt('lucia', 2), banco=vt('banco'),
         indexado=vt('indexado'), a35=vt('treinta'), c35=vt('cinco'), a45=vt('cuarenta'), c45=vt('cinco', 2), doble=vt('doble'),
         a65=vt('sesenta'), c65=vt('cinco', 3), noventa=vt('noventa'), setecientos=vt('setecientos'), inflacion=vt('inflacion'),
         cuarenta2=vt('cuarenta', 2), pusieron=vt('pusieron'), donde=vt('donde'), tu=vt('tu'), lucia4=vt('lucia', 4),
         marcos4=vt('marcos', 4), guardalo=vt('guardalo'))

# ───────── datos (los mismos que la versión 2D)
r = .08 / 12
banco = lambda a: 200 * 12 * max(0, a - 25)
fondo = lambda a: 200 * ((1 + r) ** (max(0, a - 25) * 12) - 1) / r
MAX = fondo(65); REAL = banco(65) / 1.02 ** 40
def edad(t):
    if t < T['a35'] - .1: return 25
    if t < T['c35'] + .3: return lerp(25, 35, eio(p(t, T['a35'] - .1, T['c35'] + .4 - T['a35'])))
    if t < T['a45'] - .1: return 35
    if t < T['c45'] + .3: return lerp(35, 45, eio(p(t, T['a45'] - .1, T['c45'] + .4 - T['a45'])))
    if t < T['a65'] - .1: return 45
    return lerp(45, 65, eio(p(t, T['a65'] - .1, T['c65'] + .6 - T['a65'])))
def valores(t):
    """Lo que hay en cada torre (euros) y cuánto se ha vuelto rojo lo de Lucía (0..1)."""
    rew = p(t, T['lucia2'] - .25, .45)
    if t < T['lucia2'] - .25: vL, vR = banco(65) * eo(p(t, .05, .5)), fondo(65) * eo(p(t, .6, .6))
    elif rew < 1: vL, vR = banco(65) * (1 - eio(rew)), fondo(65) * (1 - eio(rew))
    else: e = edad(t); vL, vR = banco(e), fondo(e)
    if t >= T['inflacion']: vL = lerp(banco(65), REAL, eio(p(t, T['cuarenta2'] - .1, .6)))
    return vL, vR, p(t, T['inflacion'], .5)

# ───────── escena
bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
S.render.fps = FPS; S.render.resolution_x = int(1080 * ESCALA); S.render.resolution_y = int(1920 * ESCALA)
S.render.image_settings.file_format = 'PNG'
S.view_settings.view_transform = 'AgX'; S.view_settings.look = 'AgX - Punchy'
if CYCLES:
    S.render.engine = 'CYCLES'; S.cycles.samples = int(args[args.index('--muestras') + 1]) if '--muestras' in args else 24; S.cycles.use_denoising = True
else:
    S.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items.keys() else 'BLENDER_EEVEE'
    try:
        S.eevee.taa_render_samples = 32; S.eevee.use_raytracing = True; S.eevee.use_shadows = True
    except Exception: pass

def mat(nombre, color, metal=0., rough=.5, emis=None, fuerza=0.):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Metallic'].default_value = metal; b.inputs['Roughness'].default_value = rough
    if emis: b.inputs['Emission Color'].default_value = (*emis, 1); b.inputs['Emission Strength'].default_value = fuerza
    return m
ORO = mat('oro', (1, .62, .16), 1, .22, (1, .55, .1), 0)
ACERO = mat('acero', (.42, .5, .66), 1, .3, (1, .1, .06), 0)
SUELO = mat('suelo', (.006, .007, .012), 0, .32)
def hex3(h): h = h.lstrip('#'); return tuple((int(h[i:i + 2], 16) / 255) ** 2.2 for i in (0, 2, 4))

# mundo: casi negro; la luz la ponen los focos
W = bpy.data.worlds.new('mundo'); S.world = W; W.use_nodes = True
W.node_tree.nodes['Background'].inputs['Color'].default_value = (.004, .005, .012, 1)

bpy.ops.mesh.primitive_plane_add(size=60); bpy.context.object.data.materials.append(SUELO)
for x, col in ((-6, (.05, .12, .35)), (6, (.4, .2, .03))):  # x*2,5 = mitad izquierda / derecha, sin hueco   # fondo: frío detrás de Lucía, cálido detrás de Marcos
    bpy.ops.mesh.primitive_plane_add(size=30, location=(x * 2.5, 7, 12), rotation=(math.pi / 2, 0, 0))
    bpy.context.object.data.materials.append(mat('fondo', (0, 0, 0), 0, 1, col, .45))
# raya central (separa los dos mundos)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 1.5, 2)); raya = bpy.context.object; raya.scale = (.012, .012, 4)
raya.data.materials.append(mat('raya', (1, 1, 1), 0, .5, (1, 1, 1), 3))

# una moneda y una torre = la moneda con un Array (la cuenta la cambia escena(t))
MON = .045
def torre(x, m):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=.42, depth=MON * .92, location=(x, 0, MON / 2))
    o = bpy.context.object; o.data.materials.append(m)
    bpy.ops.object.shade_smooth()
    bev = o.modifiers.new('bisel', 'BEVEL'); bev.width = .008; bev.segments = 2
    a = o.modifiers.new('pila', 'ARRAY'); a.use_relative_offset = False; a.use_constant_offset = True
    a.constant_offset_displace = (0, 0, MON); a.count = 1
    return o, a
XT, XF = .62, 1.45                              # x de las torres y de las figuras
tL, aL = torre(-XT, ACERO); tR, aR = torre(XT, ORO)
NMAX = 150                                     # monedas de la torre de Marcos a los 65 (≈6,7 m)
monedas = lambda v: max(1, round(v / MAX * NMAX))

# figuras «de juguete»: cabeza, pelo, cuerpo, ojos y boca (la boca gira: sonrisa ↔ tristeza)
def figura(x, piel, pelo, ropa, largo):
    g = bpy.data.objects.new('fig', None); S.collection.objects.link(g); g.location = (x, -.7, 0)
    def add(o): o.parent = g; return o
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=.28, depth=.6, location=(0, 0, .3)); c = add(bpy.context.object)
    c.data.materials.append(mat('ropa', hex3(ropa), 0, .55)); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.28, location=(0, 0, .6)); add(bpy.context.object).data.materials.append(mat('hombros', hex3(ropa), 0, .55)); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.44, location=(0, 0, 1.28)); cab = add(bpy.context.object)
    cab.data.materials.append(mat('piel', hex3(piel), 0, .45)); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.465, location=(0, .06, 1.38)); pe = add(bpy.context.object)
    pe.scale = (1.02, 1, .8 if not largo else 1.0); pe.data.materials.append(mat('pelo', hex3(pelo), 0, .6)); bpy.ops.object.shade_smooth()
    if largo:
        bpy.ops.mesh.primitive_cylinder_add(radius=.45, depth=.62, location=(0, .12, 1.08)); add(bpy.context.object).data.materials.append(pe.data.materials[0])
    negro = mat('ojo', (.01, .01, .01), 0, .3)
    for dx in (-.12, .12):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.055, location=(dx * 1.2, -.41, 1.32)); add(bpy.context.object).data.materials.append(negro)
    bpy.ops.mesh.primitive_torus_add(major_radius=.11, minor_radius=.022, location=(0, -.42, 1.15), rotation=(math.pi / 2, 0, 0))
    boca = add(bpy.context.object); boca.data.materials.append(negro)
    # media rosquilla = sonrisa (girada 180° = tristeza)
    import bmesh
    bm = bmesh.new(); bm.from_mesh(boca.data); bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.y > 0.005], context='VERTS'); bm.to_mesh(boca.data); bm.free()
    return g, boca
fL, bocaL = figura(-XF, '#e8b896', '#3b2416', '#7a5cc4', True)
fR, bocaR = figura(XF, '#c98f68', '#1c1410', '#2fa58f', False)

# luces: una fría para Lucía, una cálida para Marcos, un contraluz; el oro brilla más a los 65
def foco(nombre, loc, color, e, size=2.5):
    bpy.ops.object.light_add(type='AREA', location=loc); l = bpy.context.object; l.name = nombre
    l.data.color = color; l.data.energy = e; l.data.size = size
    l.rotation_euler = (Vector((0, 0, 1.5)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler(); return l
lF = foco('fria', (-3, -3.5, 3.5), (.55, .7, 1), 700)
lC = foco('calida', (3, -3.5, 3.5), (1, .72, .4), 900)
foco('contra', (0, 4, 6), (1, 1, 1), 600, 6)

cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); S.collection.objects.link(cam); S.camera = cam
cam.data.lens = 26; cam.data.sensor_fit = 'VERTICAL'; cam.data.sensor_height = 36; cam.data.dof.use_dof = True; cam.data.dof.aperture_fstop = 4
foc = bpy.data.objects.new('foco', None); S.collection.objects.link(foc); cam.data.dof.focus_object = foc
trk = cam.constraints.new('TRACK_TO'); trk.target = foc; trk.track_axis = 'TRACK_NEGATIVE_Z'; trk.up_axis = 'UP_Y'

# cámara: claves (t, posición, a dónde mira); suaviza entre claves
K = [(0, (0, -6.2, 1.5), (0, 0, 1.05)),                 # el punto al que mira cae en el centro: las figuras quedan
     (T['siete'] - .2, (0, -7.4, 2.4), (.3, 0, 2.2)),        # entre y≈800 y y≈1220, por encima de los subtítulos
     (T['lucia2'], (0, -5.6, 1.3), (0, 0, 1.0)),
     (T['a35'], (0, -6.0, 1.4), (0, 0, 1.05)),
     (T['a65'], (0, -6.6, 1.7), (0, 0, 1.3)),
     (T['c65'] + .6, (1.0, -8.8, 3.4), (.5, 0, 3.0)),
     (T['inflacion'], (-.5, -6.2, 1.4), (-.6, 0, 1.0)),
     (T['pusieron'], (0, -8.8, 2.8), (0, 0, 2.4)),
     (T['tu'], (0, -8.2, 2.8), (0, 0, 2.3)),
     (DUR, (0, -8.8, 3.0), (0, 0, 2.5))]
def ruta(t):
    i = 0
    while i < len(K) - 1 and t >= K[i + 1][0]: i += 1
    a, b = K[i], K[min(i + 1, len(K) - 1)]
    u = eio((t - a[0]) / (b[0] - a[0])) if b[0] > a[0] else 0
    return Vector(a[1]).lerp(Vector(b[1]), u), Vector(a[2]).lerp(Vector(b[2]), u)

def escena(t):
    vL, vR, inf = valores(t)
    aL.count = monedas(vL); aR.count = monedas(vR)
    # Lucía: acero → rojo con la inflación
    b = ACERO.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*[lerp(c0, c1, inf) for c0, c1 in zip((.42, .5, .66), (.9, .12, .08))], 1)
    b.inputs['Emission Strength'].default_value = .6 * inf
    ORO.node_tree.nodes['Principled BSDF'].inputs['Emission Strength'].default_value = .15 + 1.2 * p(t, T['c65'], .5) * (1 - .6 * p(t, T['inflacion'], .5))
    lC.data.energy = 900 + 900 * p(t, T['c65'], .4); lF.data.energy = 700 * (1 - .5 * inf)
    # ánimo: la boca se da la vuelta (sonrisa ↔ tristeza) y la cabeza baja un poco
    triste = 1 if t > T['inflacion'] else .5 if t > T['c65'] else 0
    contento = 1 if t > T['c65'] else .6 if t > T['doble'] else 0
    bocaL.rotation_euler = (math.pi / 2, math.pi * (1 if triste > .4 else 0), 0); bocaR.rotation_euler = (math.pi / 2, 0, 0)
    bocaL.location.z = 1.15 - (.06 if triste > .4 else 0)
    fL.rotation_euler = (-.12 * triste, 0, .15); fR.rotation_euler = (.04 * contento, 0, -.15)
    fR.location.z = .06 * abs(math.sin(t * 9)) * p(t, T['c65'], .2) * (1 - p(t, T['inflacion'], .2))   # Marcos da saltitos
    # aparecen en el hook
    sL, sR = eo(p(t, .02, .3)), eo(p(t, T['marcos'] - .05, .3))
    fL.scale = (sL,) * 3; fR.scale = (sR,) * 3
    pos, mira = ruta(t); cam.location = pos; foc.location = mira

# ───────── render: fotograma a fotograma, y dónde caen las cosas en pantalla para la capa HTML
def pantalla(v):
    c = world_to_camera_view(S, cam, Vector(v)); return [round(c.x * 1080, 1), round((1 - c.y) * 1920, 1)]
def foto(i, t, render=True):
    escena(t); bpy.context.view_layer.update()
    if render: S.render.filepath = os.path.join(OUT, f'f_{i:05d}.png'); bpy.ops.render.render(write_still=True)
    return {'t': round(t, 4), 'topL': pantalla((-XT, 0, aL.count * MON)), 'topR': pantalla((XT, 0, aR.count * MON)),
            'cabL': pantalla((-XF, -.7, 1.95)), 'cabR': pantalla((XF, -.7, 1.95)),
            'baseL': pantalla((-XT, 0, 0)), 'baseR': pantalla((XT, 0, 0)),
            'y96': pantalla((0, 0, monedas(banco(65)) * MON))}
pos = []
if STILLS:
    for i, t in enumerate(STILLS): pos.append(foto(i, t))
else:
    N = math.ceil(DUR * FPS)
    A = int(args[args.index('--desde') + 1]) if '--desde' in args else 0
    B = int(args[args.index('--hasta') + 1]) if '--hasta' in args else N
    for i in range(N):
        if not (A <= i < B): pos.append(foto(i, i / FPS, render=False)); continue
        if 'pos' in args or (os.path.exists(os.path.join(OUT, f'f_{i:05d}.png')) and 'rehacer' not in args):
            pos.append(foto(i, i / FPS, render=False)); continue
        pos.append(foto(i, i / FPS))
json.dump(pos, open(os.path.join(OUT, 'pos.json' if not STILLS else 'pos_stills.json'), 'w'))
print('listo', len(pos), 'fotogramas →', OUT)

# ───────── «video»: une los fotogramas en <ep>/build/blender/3d.mp4 con el FFmpeg que trae Blender (no hace falta nada más)
if 'video' in args and not STILLS:
    V = bpy.data.scenes.new('video'); V.render.fps = FPS
    V.render.resolution_x, V.render.resolution_y = S.render.resolution_x, S.render.resolution_y
    se = V.sequence_editor_create()
    fr = sorted(f for f in os.listdir(OUT) if f.startswith('f_') and f.endswith('.png'))
    strips = se.strips if hasattr(se, 'strips') else se.sequences
    st = strips.new_image('f', os.path.join(OUT, fr[0]), 1, 1)
    for f in fr[1:]: st.elements.append(f)
    V.frame_start, V.frame_end = 1, len(fr)
    if hasattr(V.render.image_settings, 'media_type'): V.render.image_settings.media_type = 'VIDEO'   # Blender 5
    V.render.image_settings.file_format = 'FFMPEG'; V.render.ffmpeg.format = 'MPEG4'; V.render.ffmpeg.codec = 'H264'
    V.render.ffmpeg.constant_rate_factor = 'HIGH'; V.render.filepath = os.path.join(OUT, '3d.mp4')
    bpy.context.window_manager.windows and None
    bpy.ops.render.render(animation=True, scene=V.name)
    print('vídeo 3D →', os.path.join(OUT, '3d.mp4'))
