import json,re,unicodedata,sys
d=json.load(open('../stt.json'))
W=[w for w in d['words'] if w['type']=='word']
norm=lambda s:''.join(c for c in unicodedata.normalize('NFD',s.lower()) if c.isalnum())
toks=[norm(w['text']) for w in W]
chunks=[];cur=[]
for w in W:
    cur.append({"t":re.sub(r'[,.:;¿?¡!"]','',w['text']).upper(),"s":round(w['start'],2),"e":round(w['end'],2)})
    if len(cur)>=3 or re.search(r'[.,:;?!]$',w['text']):
        chunks.append(cur);cur=[]
if cur:chunks.append(cur)
subs=[]
for i,c in enumerate(chunks):
    e=chunks[i+1][0]['s'] if i+1<len(chunks) else c[-1]['e']+.3
    subs.append({"s":c[0]['s'],"e":round(min(e,c[-1]['e']+.45),2),"w":c})
A=[('s2',['en','1830']),('s3',['fiestas']),('s4',['su','editor']),('s5',['y','hugo','hizo']),('s6',['pidio','que']),('s7',['se','quedo','solo']),
('s8',['sin','ropa','no']),('s8b',['todo','el','otono']),('s9',['entrego']),('s10',['a','eso','se']),('s11',['no','hace','falta']),('s12',['que','harias'])]
T={'s1':0.0};pos=0
for k,seq in A:
    for i in range(pos,len(toks)-len(seq)+1):
        if toks[i:i+len(seq)]==seq: T[k]=round(W[i]['start']-0.05,2);pos=i;break
    else: sys.exit('anchor missing '+k)
def first(seq,after=0):
    for i in range(len(toks)-len(seq)+1):
        if toks[i:i+len(seq)]==seq and W[i]['start']>=after: return round(W[i]['start'],2)
    sys.exit('cue missing '+str(seq))
C=[('victor',['victor'],0),('ropa0',['ropa'],0),('un_ano',['ano'],T['s2']),('invitados',['invitados'],T['s3']),('proyectos',['proyectos'],T['s3']),('escribir',['escribir'],T['s3']),
('febrero',['febrero'],T['s4']),('absurdo',['absurdo'],T['s5']),('llave',['llave'],T['s6']),('chal',['chal'],T['s7']),('salir',['salir'],T['s8']),('escribio',['escribio'],T['s8']),
('otono',['otono'],T['s8b']),('invierno',['invierno'],T['s8b']),('semanas',['semanas'],T['s9']),('compromiso',['compromiso'],T['s10']),('hoy',['hoy'],T['s10']),('manana',['manana'],T['s10']),
('movil',['movil'],T['s11']),('dulces',['dulces'],T['s11']),('imposible',['imposible'],T['s12'])]
for k,seq,a in C: T['c_'+k]=first(seq,a)
T['end']=round(W[-1]['end']+0.8,2)
json.dump({"subs":subs,"T":T},open('data.json','w'),ensure_ascii=False)
print(json.dumps(T))
