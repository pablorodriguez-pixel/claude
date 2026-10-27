# Render de prueba: jet con Ricardo y Dani.  blender -b -P test_still.py -- out.png [cu]
import sys, os, time, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
from lib3d import *
from sets import *

out = sys.argv[sys.argv.index('--') + 1]
cu = 'cu' in sys.argv
reset()
jet()
d = person('D', (-0.75, 0.05, 0.0), pose='sit', arms='lap')
r = person('R', (0.75, 0.05, 0.0), pose='sit', arms='rest')
expression(r, 'smug')
piggy((-0.75, -0.33, 0.73), 1.0)
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); bpy.context.collection.objects.link(cam)
bpy.context.scene.camera = cam
cam.data.sensor_fit = 'VERTICAL'
if cu:
    cam.location = (0.75, -1.9, 1.45); cam.data.lens = 50; look(cam, (0.75, 0, 1.3))
    cam.data.dof.use_dof = True; cam.data.dof.focus_distance = 2.0; cam.data.dof.aperture_fstop = 2.0
else:
    cam.location = (0, -3.6, 1.35); cam.data.lens = 26; look(cam, (0, 1.5, 1.0))
    cam.data.dof.use_dof = True; cam.data.dof.focus_distance = 3.7; cam.data.dof.aperture_fstop = 4
s = bpy.context.scene
s.render.engine = 'CYCLES'; s.cycles.device = 'CPU'; s.cycles.samples = 24; s.cycles.use_denoising = True
s.cycles.max_bounces = 4; s.cycles.diffuse_bounces = 2; s.cycles.glossy_bounces = 2; s.cycles.transparent_max_bounces = 2
s.render.resolution_x = 540; s.render.resolution_y = 960
s.view_settings.view_transform = 'AgX'; s.view_settings.look = 'AgX - Punchy'
s.render.filepath = out
t = time.time(); bpy.ops.render.render(write_still=True); print('RENDER_OK', round(time.time() - t, 1))
