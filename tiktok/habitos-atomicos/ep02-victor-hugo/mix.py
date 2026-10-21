import json,subprocess,sys
T=json.load(open('build/data.json'))['T']; D=T['end']
cues=[]  # (time, sfx, vol)
def c(t,s,v=.7): cues.append((max(0,t),s,v))
TIN={'s2':'zoom','s3':'whip','s4':'wipe','s5':'glitch','s6':'zoom','s7':'whip','s8':'whip','s8b':'wipe','s9':'zoom','s10':'glitch','s11':'whip','s12':'wipe'}
for k,ty in TIN.items():
    if ty=='glitch': c(T[k]-.03,'hit',.45)
    else: c(T[k]-.1,'whoosh',.55)
c(T['c_ropa0']-.1,'hit',.9)
c(T['s2']+.05,'paper',.6)
c(T['s3']+.2,'pop',.8);c(T['c_invitados']-.2+.25,'pop',.8);c(T['c_proyectos']-.2+.25,'pop',.8);c(T['c_escribir']-.2,'pop',.9)
c(T['s4']+.3,'tick',.45);c(T['c_febrero']-.05,'stamp',.9)
c(T['s5']+.05,'hit',1.0)
c(T['s6']+.15,'cloth',.7);c(T['s6']+.8,'cloth',.6);c(T['c_llave']-.42,'lock',.95)
c(T['s7']+.15,'cloth',.5);c(T['s7']+.75,'pop',.8)
c(T['c_salir']-.3,'hit',.85)
c(T['s8b']+.15,'quill',.8)
c(T['s9']-1.7,'riser',.55);c(T['s9']+1.6,'stamp',.95)
c(T['s10']+.1,'pop',.8);c(T['c_hoy']+.5,'pop',.7);c(T['c_hoy']+1.1,'pop',.8)
c(T['c_movil']-.5,'pop',.8);c(T['c_dulces']-.5,'pop',.8)
c(T['c_imposible']-.1,'hit',.7)
c(T['s13']-0.0 if 's13' in T else D-.95,'whoosh',.6)
ins=['-i','voice.mp3','-i','sfx/music.mp3']
fc=[]
for i,(t,s,v) in enumerate(cues):
    ins+=['-i',f'sfx/{s}.mp3']
    fc.append(f'[{i+2}:a]volume={v},adelay={int(t*1000)}|{int(t*1000)},apad=whole_dur={D}[x{i}]')
n=len(cues)
fc.append(f'[0:a]apad=whole_dur={D},asplit=2[vo][vsc]')
fc.append(f'[1:a]volume=0.55,afade=t=in:d=1,afade=t=out:st={D-2.2}:d=2.2,atrim=0:{D},apad=whole_dur={D}[mu]')
fc.append('[mu][vsc]sidechaincompress=threshold=0.03:ratio=9:attack=15:release=350[md]')
fc.append(''.join(f'[x{i}]' for i in range(n))+f'amix=inputs={n}:normalize=0:duration=longest[sf]')
fc.append(f'[vo][md][sf]amix=inputs=3:normalize=0:duration=longest,atrim=0:{D},loudnorm=I=-14:TP=-1.5:LRA=9[out]')
open('mix_filter.txt','w').write(';\n'.join(fc))
cmd=['ffmpeg','-y','-loglevel','error']+ins+['-filter_complex_script','mix_filter.txt','-map','[out]','-c:a','aac','-b:a','192k','mix.m4a']
subprocess.run(cmd,check=True)
print('mix ok',len(cues),'cues')
