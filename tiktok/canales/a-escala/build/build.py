"""Ensambla <episodio>/build/video.html: overlay del canal + escena 3D del episodio + palabras.
Uso: python3 build.py ../ep01-billon-dormido"""
import json,os,subprocess,sys
ep=os.path.abspath(sys.argv[1]); out=os.path.join(ep,'build'); os.makedirs(out,exist_ok=True)
d=json.load(open(os.path.join(ep,'stt.json')))
words=[]
for w in (w for w in d['words'] if w['type']=='word'):
    raw=w['text'].strip('«»"');t=raw.strip(',.:;…?¿!¡')
    punct=raw.rstrip()[-1:] in ',.:;…?!'
    # «%» suelto se pega a su número («8 %»)
    if t=='%' and words: words[-1]['t']+=' %'; words[-1]['e']=w['end']; words[-1]['p']=punct; continue
    words.append({'t':t,'s':w['start'],'e':w['end'],'p':punct})
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(ep,'voice_raw.mp3')]))+1.2
ef=os.path.join(ep,'edicion.json');edit=json.load(open(ef)) if os.path.exists(ef) else {}
json.dump(words,open(os.path.join(out,'subs.json'),'w'),ensure_ascii=False)
html=f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../build/base.css"></head><body>
<div id="gl"></div>
<div id="cnt" class="ov tag big"></div><div id="big" class="ov tag"></div>
<div id="lab1" class="ov tag"></div><div id="lab2" class="ov tag"></div><div id="lab3" class="ov tag"></div>
<div id="br1" class="ov br"><span></span></div><div id="br2" class="ov br red"><span></span></div>
<div id="veil"></div><div id="subs"></div><div id="firma">A ESCALA</div>
<div id="velo"></div><div id="frase"></div><div id="cap"></div><div id="pista"><div id="barra"></div></div>
<script>const SUBS={json.dumps(words,ensure_ascii=False)};const DUR={dur:.3f};const EDIT={json.dumps(edit,ensure_ascii=False)};</script>
<script type="module" src="../scenes.js"></script><script type="module" src="../../build/edit.js"></script></body></html>'''
open(os.path.join(out,'video.html'),'w').write(html); print('video.html',round(dur,2),'s',len(words),'palabras')
