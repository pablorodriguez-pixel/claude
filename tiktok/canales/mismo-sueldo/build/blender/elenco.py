"""Foto de familia del elenco de MISMO SUELDO (estudio claro, color de marca).
Uso: blender -b -P elenco.py -- [cycles] [--muestras 64]   → ../../marca/elenco.png (1920×1080)"""
import bpy, sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from personajes import personaje, mat, animo
args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'marca')

bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
S.view_settings.view_transform = 'AgX'; S.view_settings.look = 'AgX - Punchy'
if 'cycles' in args:
    S.render.engine = 'CYCLES'; S.cycles.samples = int(args[args.index('--muestras') + 1]) if '--muestras' in args else 64; S.cycles.use_denoising = True
else:
    S.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items.keys() else 'BLENDER_EEVEE'
W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True; W.node_tree.nodes['Background'].inputs['Color'].default_value = (1, .93, .82, 1)
W.node_tree.nodes['Background'].inputs['Strength'].default_value = .6

# estudio: suelo y fondo curvo de una pieza (ciclorama) en crema
bpy.ops.mesh.primitive_plane_add(size=40); bpy.context.object.data.materials.append(mat('#FFF4E6', .8))
bpy.ops.mesh.primitive_cylinder_add(vertices=160, radius=12, depth=30, location=(0, 15, 0), rotation=(0, math.pi / 2, 0))
bpy.context.object.data.materials.append(mat('#FFE3B3', .9))
# tarima amarilla
bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=3.1, depth=.12, location=(0, .4, .06)); bpy.ops.object.shade_smooth()
bpy.context.object.data.materials.append(mat('#FFC93C', .45))

gente = [('carmen', -2.1, .5, .25), ('lucia', -.75, 0, .1), ('marcos', .75, 0, -.1), ('toni', 2.1, .5, -.25)]
P = {n: personaje(n, x, y, g) for n, x, y, g in gente}
for p in P.values(): p['raiz'].location.z = .12
for n in P: animo(P[n], 1)
P['marcos']['brazoD'].rotation_euler = (0, -2.5, 0)          # Marcos saluda
P['toni']['brazoI'].rotation_euler = (0, 2.2, 0)            # Toni: «¡esto no falla!»
P['carmen']['cabeza'].rotation_euler = (0, 0, .25)

def luz(loc, e, color=(1, 1, 1), size=4):
    bpy.ops.object.light_add(type='AREA', location=loc); l = bpy.context.object; l.data.energy = e; l.data.size = size; l.data.color = color
    import mathutils; l.rotation_euler = (mathutils.Vector((0, 0, 1)) - mathutils.Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
luz((-4, -5, 6), 1600, (1, .95, .9), 6); luz((5, -4, 4), 700, (.9, .95, 1), 5); luz((0, 4, 5), 900, (1, .85, .6), 6)

cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); S.collection.objects.link(cam); S.camera = cam
def toma(nombre, rx, ry, loc, rot, lens):
    S.render.resolution_x, S.render.resolution_y = rx, ry; cam.location = loc; cam.rotation_euler = rot; cam.data.lens = lens
    S.render.filepath = os.path.join(OUT, nombre); bpy.ops.render.render(write_still=True)
toma('elenco.png', 1920, 1080, (0, -8.5, 1.9), (math.radians(85), 0, 0), 50)
print('ok')
