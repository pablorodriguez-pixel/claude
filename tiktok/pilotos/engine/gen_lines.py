"""Genera una locución multi-voz línea a línea con ElevenLabs v3 y la concatena.
uso: python3 gen_lines.py <dir>   (lee <dir>/lines_in.json: {"voices":{who:[voice_id,stab,tempo]}, "gap":0.3, "lines":[{"who","text","gap_after"?}]})
salida: voice_final.wav, words.json (i,w,s,e,line,who), lines.json, words.js, words_table.txt"""
import os,sys,json,base64,subprocess,urllib.request,urllib.error,time,wave,re
import numpy as np
from concurrent.futures import ThreadPoolExecutor
k=os.environ['API_KEY_ELEVENLABS']; d=sys.argv[1]; cfg=json.load(open(d+"/lines_in.json")); SR=44100
os.makedirs(d+"/clips",exist_ok=True)
def gen(args):
    n,L=args; vid,stab,tempo=cfg["voices"][L["who"]]
    out=f"{d}/clips/{n:02d}.json"
    if os.path.exists(out): return
    body={"text":L["text"],"model_id":"eleven_v3","language_code":"es","voice_settings":{"stability":stab,"similarity_boost":0.8,"use_speaker_boost":True}}
    for t in range(6):
        r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={'xi-api-key':k,'Content-Type':'application/json'})
        try: res=json.loads(urllib.request.urlopen(r,timeout=300).read()); break
        except urllib.error.HTTPError as e:
            if e.code==429: time.sleep(4); continue
            raise SystemExit(f"{n} {e.code} {e.read()[:300]}")
    open(f"{d}/clips/{n:02d}.mp3","wb").write(base64.b64decode(res["audio_base64"]))
    json.dump(res.get("normalized_alignment") or res["alignment"],open(out,"w"))
with ThreadPoolExecutor(3) as ex: list(ex.map(gen,enumerate(cfg["lines"])))
def words_of(al):
    ch,st,en=al["characters"],al["character_start_times_seconds"],al["character_end_times_seconds"]
    ws=[];cur="";cs=None;ce=None;intag=False
    for c,a,b in zip(ch,st,en):
        if c=="[": intag=True; continue
        if intag:
            if c=="]": intag=False
            continue
        if c.isspace():
            if cur.strip(): ws.append([cur.strip(),cs,ce])
            cur="";cs=None
        else:
            if cs is None: cs=a
            cur+=c; ce=b
    if cur.strip(): ws.append([cur.strip(),cs,ce])
    return ws
audio=[];t=0.12;W=[];LN=[];audio.append(np.zeros(int(0.12*SR)))
for n,L in enumerate(cfg["lines"]):
    vid,stab,tempo=cfg["voices"][L["who"]]
    al=json.load(open(f"{d}/clips/{n:02d}.json")); ws=words_of(al)
    a0=max(0,ws[0][1]-0.04); a1=ws[-1][2]+0.1
    subprocess.run(["ffmpeg","-v","error","-y","-i",f"{d}/clips/{n:02d}.mp3","-ss",str(a0),"-to",str(a1),"-af",f"atempo={tempo}","-ac","1","-ar",str(SR),f"{d}/clips/{n:02d}.wav"],check=True)
    w=wave.open(f"{d}/clips/{n:02d}.wav"); x=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
    # compactar silencios internos largos (>0.45s) no es necesario en frases cortas
    ls=t
    for (txt,s,e) in ws:
        W.append({"i":len(W),"w":txt,"s":round(t+(s-a0)/tempo,3),"e":round(t+(e-a0)/tempo,3),"line":n,"who":L["who"]})
    t+=len(x)/SR; audio.append(x)
    clean=re.sub(r"\[[^\]]*\]\s*","",L["text"]).strip()
    LN.append({"line":n,"who":L["who"],"text":clean,"s":round(ls,3),"e":round(t,3)})
    g=L.get("gap_after",cfg.get("gap",0.3)); audio.append(np.zeros(int(g*SR))); t+=g
out=np.concatenate(audio)
o=wave.open(d+"/voice_final.wav","wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR); o.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes()); o.close()
json.dump(W,open(d+"/words.json","w"),ensure_ascii=False); json.dump(LN,open(d+"/lines.json","w"),ensure_ascii=False,indent=1)
open(d+"/words.js","w").write("window.WORDS="+json.dumps(W,ensure_ascii=False)+";\nwindow.LINES="+json.dumps(LN,ensure_ascii=False)+";")
tab=[]
for L in LN:
    tab.append(f"--- LÍNEA {L['line']}  [{L['who']}]  {L['s']:.2f}-{L['e']:.2f}  «{L['text']}»")
    tab+= [f"{x['i']:4d}  {x['s']:6.2f}-{x['e']:6.2f}  {x['w']}" for x in W if x['line']==L['line']]
open(d+"/words_table.txt","w").write("\n".join(tab))
open(d+"/script.txt","w").write("\n".join(f"{L['who']}: {L['text']}" for L in LN))
print(d.split('/')[-1],"dur",round(t,2),"palabras",len(W),"wpm",round(len(W)/t*60))
