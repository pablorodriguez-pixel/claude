"""Ensambla <ep>/build/video.html para el motor 2D. Uso: python3 build.py ../ep01-el-conserje"""
import json, os, subprocess, sys
ep = os.path.abspath(sys.argv[1]); out = os.path.join(ep, 'build'); os.makedirs(out, exist_ok=True)
d = json.load(open(os.path.join(ep, 'stt.json'))); words = []
for w in (w for w in d['words'] if w['type'] == 'word'):
    raw = w['text'].strip('«»"'); t = raw.strip(',.:;…?¿!¡')
    words.append({'t': t, 's': w['start'], 'e': w['end'], 'raw': raw})
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(ep, 'voice_raw.mp3')])) + 1.0
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Figtree;src:url(../../build2d/figtree-extrabold.ttf);font-weight:800}}
*{{margin:0;padding:0;box-sizing:border-box}} html,body{{width:1080px;height:1920px;overflow:hidden;background:#000}}
#escena,.plano,.capa{{position:absolute;inset:0}} .capa svg{{display:block}}
#sub{{position:absolute;left:540px;top:1260px;transform:translate(-50%,-50%);font:800 58px Figtree,sans-serif;color:#fff;white-space:nowrap;
  -webkit-text-stroke:10px #111;paint-order:stroke fill;text-shadow:0 4px 14px rgba(0,0,0,.45);letter-spacing:.01em}}
#viñeta{{position:absolute;inset:0;background:radial-gradient(ellipse 85% 70% at 50% 50%,transparent 60%,rgba(0,0,0,.35));pointer-events:none}}
</style></head><body><div id="escena"></div><div id="viñeta"></div><div id="sub"></div>
<script>const SUBS={json.dumps(words, ensure_ascii=False)};const DUR={dur:.3f};</script>
<script src="../../build2d/motor.js"></script><script src="../../build2d/dibujos.js"></script><script src="../escenas.js"></script>
<script>document.fonts.ready.then(()=>{{montar();render(0);window.ready=true}})</script></body></html>'''
open(os.path.join(out, 'video.html'), 'w').write(html); print('video.html', round(dur, 2), 's')
