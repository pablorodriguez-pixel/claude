# Convierte la transcripción de ElevenLabs (stt.json) en palabras y trozos de subtítulo (timing.json).
import json,re,sys
d=json.load(open(sys.argv[1]));W=[x for x in d['words'] if x['type']=='word']
words=[{'t':re.sub(r'[^\wÁÉÍÓÚÜÑáéíóúüñ¿?¡!]','',x['text']),'s':round(x['start'],2),'e':round(x['end'],2)} for x in W]
subs=[];cur=[]
for x,raw in zip(words,W):
    cur.append(x)
    if len(cur)==3 or re.search(r'[.,:?!"…]$',raw['text']):
        subs.append({'s':cur[0]['s'],'e':cur[-1]['e'],'w':cur}); cur=[]
if cur: subs.append({'s':cur[0]['s'],'e':cur[-1]['e'],'w':cur})
for i in range(len(subs)-1): subs[i]['e']=min(subs[i+1]['s'],subs[i]['e']+0.6)
if subs: subs[-1]['e']+=0.8
json.dump({'words':words,'subs':subs},open(sys.argv[2],'w'),ensure_ascii=False)
line=[];st=None
for x,raw in zip(words,W):
    if st is None: st=x['s']
    line.append(raw['text'])
    if re.search(r'[.?:!"…,]$',raw['text']): print(f"{st:6.2f}-{x['e']:6.2f}",' '.join(line)); line=[];st=None
if line: print(f"{st:6.2f}",' '.join(line),words[-1]['e'])
