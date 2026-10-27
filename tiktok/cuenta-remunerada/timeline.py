# Une las líneas en voice.wav y genera build/subs.json (palabras + escenas)
import json,subprocess
s=json.load(open('script.json')); GAP=0.18
t=0; words=[]; scenes=[]; parts=[]
for i,l in enumerate(s):
  v=json.load(open(f'voice/{i:02d}.json')); lw=v['words']
  s0=max(0,lw[0]['s']-0.05); s1=min(v['dur'],lw[-1]['e']+0.12); dur=s1-s0
  parts.append((i,s0,dur))
  for w in lw: words.append({"w":w['w'],"s":round(t+w['s']-s0,3),"e":round(t+w['e']-s0,3),"who":l['who']})
  scenes.append({"scene":l['scene'],"who":l['who'],"s":round(t,3),"e":round(t+dur,3)})
  t+=dur+GAP
cmd=['ffmpeg','-y','-loglevel','error']
for i,s0,d in parts: cmd+=['-ss',str(s0),'-t',str(d),'-i',f'voice/{i:02d}.wav']
f=''.join(f'[{k}:a]aresample=44100,apad=whole_dur={parts[k][2]+GAP:.4f}[a{k}];' for k in range(len(parts)))
f+=''.join(f'[a{k}]' for k in range(len(parts)))+f'concat=n={len(parts)}:v=0:a=1[o]'
subprocess.run(cmd+['-filter_complex',f,'-map','[o]','-ac','1','voice.wav'],check=True)
json.dump({"duration":round(t,3),"words":words,"scenes":scenes},open('build/subs.json','w'),ensure_ascii=False)
print('dur',round(t,2))
for sc in scenes: print(sc)
