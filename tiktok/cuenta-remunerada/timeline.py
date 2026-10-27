# Une las líneas en voice.wav y genera build/subs.json (palabras + escenas)
import json,subprocess,re
s=json.load(open('script.json')); GAP=0.12; SPEED=1.15
t=0; words=[]; scenes=[]; parts=[]
for i,l in enumerate(s):
  a=json.load(open(f'voice/{i:02d}.json'))
  ch,st,en=a['characters'],a['character_start_times_seconds'],a['character_end_times_seconds']
  # palabras, quitando etiquetas [tono]
  cur='';ws=None;we=0;intag=False;lw=[]
  for c,a0,a1 in zip(ch,st,en):
    if c=='[': intag=True; continue
    if c==']': intag=False; continue
    if intag: continue
    if c.isspace():
      if cur: lw.append((cur,ws,we)); cur=''
      continue
    if not cur: ws=a0
    cur+=c; we=a1
  if cur: lw.append((cur,ws,we))
  s0=max(0,lw[0][1]-0.05); s1=lw[-1][2]+0.1
  dur=s1-s0
  parts.append((i,s0,dur))
  for w,a0,a1 in lw: words.append({"w":w,"s":round(t+a0-s0,3),"e":round(t+a1-s0,3),"who":l['who']})
  scenes.append({"scene":l['scene'],"who":l['who'],"s":round(t,3),"e":round(t+dur,3)})
  t+=dur+GAP
# audio
cmd=['ffmpeg','-y','-loglevel','error']
for i,s0,d in parts: cmd+=['-ss',str(s0),'-t',str(d),'-i',f'voice/{i:02d}.mp3']
f=''.join(f'[{k}:a]aresample=44100,apad=whole_dur={parts[k][2]+GAP:.4f}[a{k}];' for k in range(len(parts)))
f+=''.join(f'[a{k}]' for k in range(len(parts)))+f'concat=n={len(parts)}:v=0:a=1,atempo={SPEED}[o]'
subprocess.run(cmd+['-filter_complex',f,'-map','[o]','-ac','1','voice.wav'],check=True)
for w in words: w['s']=round(w['s']/SPEED,3); w['e']=round(w['e']/SPEED,3)
for sc in scenes: sc['s']=round(sc['s']/SPEED,3); sc['e']=round(sc['e']/SPEED,3)
t=t/SPEED
json.dump({"duration":round(t,3),"words":words,"scenes":scenes},open('build/subs.json','w'),ensure_ascii=False)
print('dur',round(t,2))
for sc in scenes: print(sc)
