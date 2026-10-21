import json,re,unicodedata,sys
d=json.load(open('stt.json'))
W=[w for w in d['words'] if w['type']=='word']
norm=lambda s:''.join(c for c in unicodedata.normalize('NFD',s.lower()) if c.isalnum())
toks=[norm(w['text']) for w in W]
# subtitle chunks: 2-3 words, break at punctuation
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
# scene anchors (token sequences), searched sequentially
A=[('s2',['pero','en','un','ano']),('s3',['y','empeorar']),('s4',['eso','es','habitos']),
('s5',['olvida','las','metas']),('s6',['una','meta','es']),('s7',['segundo']),('s7b',['no','es','quiero']),
('s8',['y','para','construirlo']),('s9',['truco']),('s9b',['una','pagina']),('s10',['y','apila']),('s11',['asi','que','dime']),('s12',['cuentamelo'])]
pos=0;T={'s1':0.0};
for k,seq in A:
    for i in range(pos,len(toks)-len(seq)+1):
        if toks[i:i+len(seq)]==seq: T[k]=round(W[i]['start']-0.05,2);pos=i;break
    else: sys.exit('anchor missing '+k)
# law cues
laws={}
for k,seq in [('l1',['uno','hazlo']),('l2',['dos','hazlo']),('l3',['tres','hazlo']),('l4',['cuatro','hazlo'])]:
    for i in range(0,len(toks)-1):
        if W[i]['start']>T['s8'] and toks[i:i+2]==seq: laws[k]=round(W[i]['start'],2);break
T.update(laws);T['end']=round(W[-1]['end']+0.6,2)
json.dump({"subs":subs,"T":T},open('build/data.json','w'),ensure_ascii=False)
print(T)
