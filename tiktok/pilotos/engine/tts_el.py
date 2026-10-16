import os,json,urllib.request,urllib.error,sys,base64,re
k=os.environ['API_KEY_ELEVENLABS']
d,vid,stab=sys.argv[1],sys.argv[2],float(sys.argv[3])
txt=open(d+"/script_v3.txt").read().strip()
body={"text":txt,"model_id":"eleven_v3","language_code":"es","voice_settings":{"stability":stab,"similarity_boost":0.8,"use_speaker_boost":True}}
r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}/with-timestamps?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={'xi-api-key':k,'Content-Type':'application/json'})
try: res=json.loads(urllib.request.urlopen(r,timeout=300).read())
except urllib.error.HTTPError as e: print(d,e.code,e.read()[:400]); sys.exit(1)
open(d+"/voice.mp3","wb").write(base64.b64decode(res["audio_base64"]))
al=res.get("normalized_alignment") or res["alignment"]
ch,st,en=al["characters"],al["character_start_times_seconds"],al["character_end_times_seconds"]
s="".join(ch)
# remove bracket tags
words=[];cur="";cs=None;ce=None;intag=False
for c,a,b in zip(ch,st,en):
    if c=="[": intag=True; continue
    if intag:
        if c=="]": intag=False
        continue
    if c.isspace():
        if cur.strip(): words.append({"w":cur.strip(),"s":cs,"e":ce})
        cur="";cs=None
    else:
        if cs is None: cs=a
        cur+=c; ce=b
if cur.strip(): words.append({"w":cur.strip(),"s":cs,"e":ce})
json.dump(words,open(d+"/voice.words.json","w"),ensure_ascii=False)
print(d.split('/')[-1],len(words),"words",round(words[-1]["e"],1),"s")
