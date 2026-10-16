import sys, json, subprocess, numpy as np, wave
d=sys.argv[1]; cap=float(sys.argv[2]); long_cap=float(sys.argv[3])
script=open(d+"/script.txt").read()
subprocess.run(["ffmpeg","-v","error","-y","-i",d+"/voice.mp3","-ac","1","-ar","44100",d+"/raw.wav"],check=True)
w=wave.open(d+"/raw.wav"); sr=w.getframerate(); a=np.frombuffer(w.readframes(w.getnframes()),np.int16)
words=json.load(open(d+"/voice.words.json"))
# find which words are followed by "..." in script for longer dramatic pauses
dramatic={i for i,x in enumerate(words) if x["w"].endswith("...") or x["w"].endswith("…")}
tempo=float(sys.argv[4]) if len(sys.argv)>4 else 1.0
cuts=[] # (start,end) samples to remove
lead=words[0]["s"]
if lead>0.12: cuts.append((0,int((lead-0.12)*sr)))
for i in range(len(words)-1):
    g=words[i+1]["s"]-words[i]["e"]; c=long_cap if i in dramatic else cap
    if g>c:
        mid=(words[i]["e"]+words[i+1]["s"])/2; rem=g-c
        cuts.append((int((mid-rem/2)*sr),int((mid+rem/2)*sr)))
tail_end=words[-1]["e"]+0.6
cuts.append((int(tail_end*sr),len(a)))
keep=[];prev=0
for s,e in cuts:
    keep.append(a[prev:s]); prev=e
keep.append(a[prev:])
out=np.concatenate(keep)
def remap(t):
    sh=0
    for s,e in cuts:
        if t*sr>=e: sh+=(e-s)
        elif t*sr>s: sh+=(t*sr-s)
    return t-sh/sr
nw=[{"i":i,"w":x["w"],"s":round(remap(x["s"])/tempo,3),"e":round(remap(x["e"])/tempo,3)} for i,x in enumerate(words)]
json.dump(nw,open(d+"/words.json","w"),ensure_ascii=False,indent=0)
o=wave.open(d+"/voice_tight.wav","wb"); o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr); o.writeframes(out.tobytes()); o.close()
subprocess.run(["ffmpeg","-v","error","-y","-i",d+"/voice_tight.wav","-af",f"atempo={tempo}",d+"/voice_final.wav"],check=True)
print(d.split("/")[-1], "dur", round(len(out)/sr/tempo,2), "dramatic", sorted(dramatic), "wpm", round(len(words)/(len(out)/sr/tempo)*60))
