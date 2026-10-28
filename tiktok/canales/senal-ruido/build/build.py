"""Ensambla <episodio>/build/video.html: base del canal + escenas del episodio + subtítulos.
Uso: python3 build.py ../ep01-chatgpt-100m"""
import json,os,re,subprocess,sys
ep=os.path.abspath(sys.argv[1]); out=os.path.join(ep,'build'); os.makedirs(out,exist_ok=True)
here=os.path.relpath(os.path.dirname(os.path.abspath(__file__)),out)
d=json.load(open(os.path.join(ep,'stt.json')))
words=[w for w in d['words'] if w['type']=='word']
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',os.path.join(ep,'voice_raw.mp3')]))
# Bloques de 1-3 palabras: corta en puntuación, pausa >0.35 s o >18 caracteres.
subs,cur=[],[]
for i,w in enumerate(words):
  cur.append(w); txt=' '.join(x['text'] for x in cur)
  nxt=words[i+1] if i+1<len(words) else None
  if (re.search(r'[.,:;?!]$',w['text']) or len(cur)==3 or len(txt)>18 or not nxt or nxt['start']-w['end']>.35):
    subs.append({'s':cur[0]['start'],'e':nxt['start'] if nxt else dur,
      'w':[{'t':x['text'].rstrip(',.:;'),'s':x['start'],'e':x['end']} for x in cur]}); cur=[]
json.dump(subs,open(os.path.join(out,'subs.json'),'w'),ensure_ascii=False)
scenes=open(os.path.join(ep,'scenes.html')).read()
html=f'''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="{here}/base.css"></head>
<body><div id="stage"><div id="cam"><div class="grid" id="grid"></div>
{scenes}
</div><canvas id="grain" width="270" height="480"></canvas>
<div id="subs"></div><div id="brand">SEÑAL<b>/</b>RUIDO</div><div id="top"><div id="bar"></div></div></div>
<script>const SUBS={json.dumps(subs,ensure_ascii=False)};const DUR={dur:.3f};</script>
<script src="{here}/base.js"></script><script src="../scenes.js"></script></body></html>'''
open(os.path.join(out,'video.html'),'w').write(html); print('video.html',round(dur,2),'s',len(subs),'bloques')
