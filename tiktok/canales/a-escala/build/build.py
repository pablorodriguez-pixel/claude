"""Ensambla <episodio>/build/video.html: overlay del canal + escena 3D del episodio + palabras.
Uso: python3 build.py ../ep01-billon-dormido"""
import json,os,subprocess,sys
ep=os.path.abspath(sys.argv[1]); out=os.path.join(ep,'build'); os.makedirs(out,exist_ok=True)
d=json.load(open(os.path.join(ep,'stt.json')))
words=[{'t':w['text'].strip(',.:;…'),'s':w['start'],'e':w['end']} for w in d['words'] if w['type']=='word']
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(ep,'voice_raw.mp3')]))+1.2
json.dump(words,open(os.path.join(out,'subs.json'),'w'),ensure_ascii=False)
html=f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../build/base.css"></head><body>
<div id="gl"></div>
<div id="cnt" class="ov tag big"></div><div id="big" class="ov tag"></div>
<div id="lab1" class="ov tag"></div><div id="lab2" class="ov tag"></div><div id="lab3" class="ov tag"></div>
<div id="br1" class="ov br"><span></span></div><div id="br2" class="ov br red"><span></span></div>
<div id="veil"></div><div id="subs"></div><div id="firma">A ESCALA</div>
<script>const SUBS={json.dumps(words,ensure_ascii=False)};const DUR={dur:.3f};</script>
<script type="module" src="../scenes.js"></script></body></html>'''
open(os.path.join(out,'video.html'),'w').write(html); print('video.html',round(dur,2),'s',len(words),'palabras')
