# Reconstruye words.json/words.js/words_table.txt de un episodio a partir de lines.json + audio de final.mp4 (whisper).
import sys,json,re,unicodedata,difflib,subprocess,numpy as np
from faster_whisper import WhisperModel
d=sys.argv[1]; out=sys.argv[2] if len(sys.argv)>2 else d
LN=json.load(open(d+"/lines.json"))
def norm(s): s=unicodedata.normalize('NFD',s.lower()); return re.sub(r'[^a-z0-9ñ]','',''.join(c for c in s if unicodedata.category(c)!='Mn'))
a=np.frombuffer(subprocess.run(["ffmpeg","-v","error","-i",d+"/final.mp4","-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout,np.int16).astype(np.float32)/32768
m=WhisperModel("small",device="cpu",compute_type="int8")
segs,_=m.transcribe(a,language="es",word_timestamps=True)
WH=[(norm(x.word),x.start,x.end) for s in segs for x in s.words]
W=[];i=0
for L in LN:
    toks=L['text'].split(); nt=[norm(t) for t in toks]
    cand=[x for x in WH if L['s']-0.3<=(x[1]+x[2])/2<=L['e']+0.3]
    sm=difflib.SequenceMatcher(None,nt,[c[0] for c in cand],autojunk=False)
    T=[None]*len(toks)
    for b in sm.get_matching_blocks():
        for k in range(b.size): T[b.a+k]=[cand[b.b+k][1],cand[b.b+k][2]]
    # anclas de línea + interpolación por longitud para lo no emparejado
    if T[0] is None: T[0]=[L['s'],None]
    T[0][0]=max(L['s'],min(T[0][0],L['s']+0.4)) if T[0][0] is not None else L['s']
    if T[-1] is None: T[-1]=[None,L['e']]
    T[-1][1]=L['e']
    j=0
    while j<len(toks):
        if T[j] is not None and None not in T[j]: j+=1; continue
        k=j
        while k<len(toks) and (T[k] is None or None in T[k]): k+=1
        t0=T[j-1][1] if j>0 else L['s']; t1=T[k][0] if k<len(toks) else L['e']
        if j<len(toks) and T[j] is not None and T[j][0] is not None: t0=T[j][0]
        if k-1>=0 and T[k-1] is not None and T[k-1][1] is not None: t1=T[k-1][1]
        ln=[max(1,len(nt[q])) for q in range(j,k)]; tot=sum(ln); c=t0
        for q,l in zip(range(j,k),ln):
            e=c+(t1-c if q==k-1 else (t1-t0)*l/tot); T[q]=[c,e]; c=e
        j=k
    for t,(s,e) in zip(toks,T):
        W.append({"i":i,"w":t,"s":round(s,3),"e":round(max(e,s+0.05),3),"line":L['line'],"who":L['who']}); i+=1
json.dump(W,open(out+"/words.json","w"),ensure_ascii=False)
open(out+"/words.js","w").write("window.WORDS="+json.dumps(W,ensure_ascii=False)+";\nwindow.LINES="+json.dumps(LN,ensure_ascii=False)+";")
tab=[]
for L in LN:
    tab.append(f"--- LÍNEA {L['line']}  [{L['who']}]  {L['s']:.2f}-{L['e']:.2f}  «{L['text']}»")
    tab+=[f"{x['i']:4d}  {x['s']:6.2f}-{x['e']:6.2f}  {x['w']}" for x in W if x['line']==L['line']]
open(out+"/words_table.txt","w").write("\n".join(tab))
print("palabras",len(W))
