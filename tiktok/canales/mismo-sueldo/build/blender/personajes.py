"""MISMO SUELDO — el elenco en Blender (estilo juguete: cabeza grande, cuerpo de cápsula, colores planos y suaves).
Cada personaje se crea con personaje(nombre, x, y) y devuelve un dict con sus piezas para animarlas desde escena(t):
  raiz (mover/escala), cabeza (girar), boca (sonrisa ↔ tristeza: rotation y), brazoI/brazoD (girar en x), ojos.
Ver ../../IDENTIDAD.md (§3 Elenco)."""
import bpy, bmesh, math
from mathutils import Vector

def hex3(h):
    h = h.lstrip('#'); return tuple((int(h[i:i + 2], 16) / 255) ** 2.2 for i in (0, 2, 4))

_mats = {}
def mat(color, rough=.55, metal=0., emis=0.):
    k = (color, rough, metal, emis)
    if k in _mats: return _mats[k]
    m = bpy.data.materials.new(color); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    c = hex3(color) if isinstance(color, str) else color
    b.inputs['Base Color'].default_value = (*c, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if emis: b.inputs['Emission Color'].default_value = (*c, 1); b.inputs['Emission Strength'].default_value = emis
    _mats[k] = m; return m

# ficha de cada personaje (colores de IDENTIDAD.md §3)
ELENCO = {
    'lucia':  dict(piel='#F2C4A0', pelo='#4A2C1D', ropa='#FF6B57', pantalon='#3B4A6B', peinado='melena'),
    'marcos': dict(piel='#C98F68', pelo='#1F1612', ropa='#19C37D', pantalon='#2E3A55', peinado='corto'),
    'carmen': dict(piel='#EBC3A6', pelo='#D9D9DE', ropa='#8E7CC3', pantalon='#5B4E7A', peinado='mono', gafas=True, alto=.9),
    'toni':   dict(piel='#E0A985', pelo='#2B2B2B', ropa='#2F80ED', pantalon='#1D1B2F', peinado='gorra', gafas_sol=True, cadena=True, alto=1.05),
}

def _obj(): return bpy.context.object
def _par(o, p): o.parent = p; return o
def _liso(): bpy.ops.object.shade_smooth()

def personaje(nombre, x=0., y=0., giro=0.):
    f = ELENCO[nombre]; A = f.get('alto', 1.)
    raiz = bpy.data.objects.new(nombre, None); bpy.context.scene.collection.objects.link(raiz)
    raiz.location = (x, y, 0); raiz.rotation_euler = (0, 0, giro); raiz.scale = (A, A, A)
    P = dict(raiz=raiz)
    # piernas y zapatos
    for dx in (-.11, .11):
        bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=.085, depth=.32, location=(dx, 0, .2)); _liso(); _par(_obj(), raiz).data.materials.append(mat(f['pantalon']))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.1, location=(dx, -.03, .05)); o = _par(_obj(), raiz); o.scale = (1, 1.4, .6); _liso(); o.data.materials.append(mat('#FFFFFF', .4))
    # cuerpo (cápsula)
    bpy.ops.mesh.primitive_cylinder_add(vertices=40, radius=.24, depth=.42, location=(0, 0, .55)); _liso(); _par(_obj(), raiz).data.materials.append(mat(f['ropa']))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.24, location=(0, 0, .76)); _liso(); _par(_obj(), raiz).data.materials.append(mat(f['ropa']))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.24, location=(0, 0, .34)); o = _par(_obj(), raiz); o.scale = (1, 1, .5); _liso(); o.data.materials.append(mat(f['ropa']))
    # brazos: pivote en el hombro (gíralos en x para saludar / levantar)
    for lado, dx in (('brazoI', -.27), ('brazoD', .27)):
        piv = bpy.data.objects.new(lado, None); bpy.context.scene.collection.objects.link(piv); piv.parent = raiz; piv.location = (dx, 0, .76)
        bpy.ops.mesh.primitive_cylinder_add(vertices=20, radius=.06, depth=.36, location=(0, 0, -.18)); _liso(); _par(_obj(), piv).data.materials.append(mat(f['ropa']))
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.075, location=(0, 0, -.38)); _liso(); _par(_obj(), piv).data.materials.append(mat(f['piel'], .45))
        piv.rotation_euler = (0, -.18 if dx < 0 else .18, 0); P[lado] = piv
    if f.get('cadena'):
        bpy.ops.mesh.primitive_torus_add(major_radius=.15, minor_radius=.018, location=(0, -.08, .82), rotation=(1.2, 0, 0)); _liso(); _par(_obj(), raiz).data.materials.append(mat('#F5C542', .2, 1))
    # cabeza: pivote en el cuello
    cab = bpy.data.objects.new('cabeza', None); bpy.context.scene.collection.objects.link(cab); cab.parent = raiz; cab.location = (0, 0, .95); P['cabeza'] = cab
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.38, location=(0, 0, .3)); _liso(); _par(_obj(), cab).data.materials.append(mat(f['piel'], .45))
    for dx in (-.37, .37):   # orejas
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.07, location=(dx, 0, .3)); _liso(); _par(_obj(), cab).data.materials.append(mat(f['piel'], .45))
    pelo = mat(f['pelo'], .7); pz = f['peinado']
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=.4, location=(0, .05, .38), rotation=(math.pi / 2, 0, 0)); o = _par(_obj(), cab); _liso(); o.data.materials.append(pelo)   # el polo de la esfera, hacia atrás
    o.scale = (1.02, 1, .78 if pz in ('corto', 'gorra') else .85)
    if pz == 'melena':
        bpy.ops.mesh.primitive_cylinder_add(radius=.37, depth=.6, location=(0, .2, .12)); _liso(); _par(_obj(), cab).data.materials.append(pelo)
    if pz == 'mono':
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.16, location=(0, .2, .72)); _liso(); _par(_obj(), cab).data.materials.append(pelo)
    if pz == 'gorra':
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.415, location=(0, .02, .44)); o = _par(_obj(), cab); o.scale = (1, 1, .72); _liso(); o.data.materials.append(mat('#FFC93C', .5))
        bpy.ops.mesh.primitive_cylinder_add(radius=.24, depth=.03, location=(0, -.42, .55)); o = _par(_obj(), cab); o.scale = (1, .8, 1); o.data.materials.append(mat('#FFC93C', .5))
    # ojos, mejillas y boca
    negro = mat('#151320', .3); P['ojos'] = []
    for dx in (-.13, .13):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.05, location=(dx, -.355, .34)); o = _par(_obj(), cab); o.scale = (1, .5, 1.25); _liso(); o.data.materials.append(negro); P['ojos'].append(o)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=.055, location=(dx * 1.45, -.32, .22)); o = _par(_obj(), cab); o.scale = (1, .4, .7); _liso(); o.data.materials.append(mat('#FF8A80', .6))
    if f.get('gafas'):
        for dx in (-.13, .13):
            bpy.ops.mesh.primitive_torus_add(major_radius=.085, minor_radius=.012, location=(dx, -.38, .34), rotation=(math.pi / 2, 0, 0)); _par(_obj(), cab).data.materials.append(mat('#6B4F2A', .4))
    if f.get('gafas_sol'):
        for dx in (-.13, .13):   # gafas de sol redondas + puente
            bpy.ops.mesh.primitive_cylinder_add(radius=.09, depth=.02, location=(dx, -.385, .34), rotation=(math.pi / 2, 0, 0)); _par(_obj(), cab).data.materials.append(mat('#151320', .1, .5))
        bpy.ops.mesh.primitive_cylinder_add(radius=.012, depth=.08, location=(0, -.39, .36), rotation=(0, math.pi / 2, 0)); _par(_obj(), cab).data.materials.append(mat('#F5C542', .2, 1))
    bpy.ops.mesh.primitive_torus_add(major_radius=.09, minor_radius=.02, location=(0, -.36, .14), rotation=(math.pi / 2, 0, 0))
    boca = _par(_obj(), cab); boca.data.materials.append(negro)
    bm = bmesh.new(); bm.from_mesh(boca.data); bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.y > .005], context='VERTS'); bm.to_mesh(boca.data); bm.free()
    P['boca'] = boca
    return P

def animo(P, v):
    """v: 1 contento … -1 triste (la boca se da la vuelta y la cabeza baja)."""
    P['boca'].rotation_euler = (math.pi / 2, math.pi if v < -.2 else 0, 0)
    P['boca'].location.z = .14 - (.05 if v < -.2 else 0)
    P['cabeza'].rotation_euler.x = -.15 * max(0, -v)
