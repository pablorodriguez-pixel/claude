import json,re,unicodedata,sys
v=sys.argv[1]
d=json.load(open(f'stt_{v}.json'))
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
A=[('s3',['se','esperaba']),('s4',['pero','el','investigador']),('s5',['solo','cinco']),('s5b',['nueve','de','cada','diez']),
('s6',['la','razon']),('s7',['en','vietnam','todo']),('s7b',['en','casa','esas']),('s8',['tu','habito']),('s9',['esconde']),('s10',['que','es','lo','que'])]
if v=='v3': A.insert(0,('s2',['en','1971']))
T={'s1':0.0} if v=='v3' else {'s2':0.0}
pos=0
for k,seq in A:
    for i in range(pos,len(toks)-len(seq)+1):
        if toks[i:i+len(seq)]==seq: T[k]=round(W[i]['start']-0.05,2);pos=i;break
    else: sys.exit('anchor missing '+k)
def first(seq,after=0):
    for i in range(len(toks)-len(seq)+1):
        if toks[i:i+len(seq)]==seq and W[i]['start']>=after: return round(W[i]['start'],2)
T['c5']=first(['cinco']);T['n9a']=first(['nueve'])
for k,seq in [('t1',['facil']),('t2',['estres']),('t3',['amigos']),('k1',['movil']),('k2',['dulces']),('k3',['camino'])]:
    T[k]=first(seq,T['s7'] if k[0]=='t' else T['s9'])
T['end']=round(W[-1]['end']+0.7,2)
json.dump({"subs":subs,"T":T,"v":v},open(f'build/data_{v}.json','w'),ensure_ascii=False)
print(v,T)
