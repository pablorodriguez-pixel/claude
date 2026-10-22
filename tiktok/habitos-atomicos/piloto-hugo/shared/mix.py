import json,re,subprocess,sys
fmt=sys.argv[1]
src=open('shared/data.js').read()
B=json.loads(re.search(r'const B=(\{.*?\});',src).group(1)); D=B['end']
C=[]
def c(t,s,v=.7): C.append((max(0,t),s,v))
if fmt=='f1':
    c(0,'swoosh',.5);c(.05,'plof',.8);c(1.4,'pop',.7)
    c(B['noeres']-.02,'hit',.5);c(B['noeres']+.3,'pop',.6);c(B['noeres']+1.0,'hit',.75);c(B['noeres']+1.25,'marker',.6)
    c(B['yomanana']-.05,'swoosh',.6);c(B['bubble']-.15,'hmm',.95);c(B['bubble']-.1,'plof',.7)
    c(B['hugo']-.05,'whoosh',.5);c(B['hugo']+.05,'drop',.7);c(B['hugo']+.9,'marker',.5)
    for i in range(6): c(B['ano']-.2+i*.24,'flip',.45)
    c(B['fiestas'],'horn',.7);c(B['invitados']-.05,'pop',.7);c(B['proyectos']-.05,'pop',.7);c(B['escribir']-.5,'pop',.6);c(B['escribir']-.15,'stamp',.9)
    c(B['ultima']-.05,'swoosh',.6);c(B['ultima'],'paper',.6);c(B['ultima']+.4,'tick',.35);c(B['febrero']-.05,'stamp',.85);c(B['y1831']-.05,'hit',.6);c(B['y1831']+.3,'marker',.6)
    c(B['absurdo']-.02,'boom',.9);c(B['absurdo']+.15,'gasp',.7)
    c(B['metio']+.1,'cloth',.6);c(B['metio']+.6,'cloth',.5);c(B['baul']+.1,'lock',.9);c(B['chal']-.25,'boing',.7);c(B['chal']+.4,'plof',.7)
    c(B['sinropa'],'snow',.5);c(B['escribio']-.05,'swoosh',.6);c(B['escribio']+.2,'quill',.7);c(B['otono']-.1,'pop',.7);c(B['invierno']-.1,'pop',.7)
    c(B['libro']-.02,'kobell',.9);c(B['libro']+.1,'stamp',.8);c(B['libro']+1.9,'pop',.7)
    c(B['nombre']-.05,'whoosh',.5);c(B['mecanismo']-.2,'hit',.6)
    c(B['decision']-.05,'swoosh',.6);c(B['hoy']-.15,'pop',.7);c(B['hoy']+.35,'stamp',.6);c(B['manana']-.15,'pop',.7);c(B['fallar'],'boing',.6)
    c(B['tu']-.02,'hit',.7);c(B['tu']+.8,'marker',.7)
    c(B['noche']-.05,'swoosh',.6);c(B['movil']-.1,'boing',.6);c(B['habitacion']+.1,'bonk',.9);c(B['habitacion']+.35,'plof',.6)
    c(B['que']-.05,'whoosh',.5);c(B['que']+.8,'whistle',.8);c(B['leo']-.1,'pop',.7);c(D-1.0,'hmm',.8)
    music='m1'
elif fmt=='f2':
    h=open('f2/index.html').read()
    ts=sorted(float(x) for x in re.findall(r'class="(?:mk w|dr[^"]*)"[^>]*data-t="([\d.]+)"',h)+re.findall(r'data-t="([\d.]+)"[^>]*class="dr',h))
    last=-9
    for t in ts:
        if t-last>.28: c(t,'marker',.38);last=t
    for t in [B['noeres'],B['hugo'],B['fiestas'],B['ultima'],B['absurdo'],B['sinropa'],B['libro'],B['nombre'],B['tu'],B['que']]: c(t-.4,'flip',.55)
    c(39.4,'stamp',.9);c(55.5,'stamp',.85);c(B['y1831'],'hit',.45);c(B['absurdo2'],'hit',.55);c(33.1,'hit',.45);c(51.6,'pop',.7)
    for i in range(12): c(B['ano']+i*.1,'pop',.25)
    music='m2'
else:
    MS=[(B['noeres'],'in'),(B['yomanana']+.1,'in'),(B['bubble'],'me'),(B['hugo'],'in'),(B['hugo']+.6,'in'),(B['y1830'],'in'),(B['fiestas'],'in'),(B['invitados'],'in'),(B['proyectos'],'in'),(B['menos'],'in'),
        (B['ultima']+.3,'in'),(B['absurdo'],'in'),(B['absurdo2']+.4,'me'),(B['metio'],'in'),(B['chal'],'in'),(B['chal']+.75,'me'),(B['sinropa'],'in'),(B['escribio'],'in'),(B['otono'],'in'),(B['invierno'],'in'),(B['libro'],'in')]
    c(.05,'ping',.7)
    for i in range(3): c(.15+i*.25,'recv',.35)
    c(2.55,'tap',.8);c(B['noeres']-.25,'swoosh',.6)
    for t,s in MS:
        if s=='me': c(t-.9,'keys',.45);c(t,'sent',.75)
        else: c(t,'recv',.6)
    c(B['ultima']+.3,'hit',.4);c(B['libro'],'pop',.6)
    c(B['nombre']-.05,'swoosh',.6);c(B['mecanismo']-.1,'pop',.6);c(B['hoy']-.1,'pop',.6);c(B['fallar']-.1,'pop',.6)
    c(B['tu']-.05,'whoosh',.5)
    for t in [B['noche'],B['movil'],B['habitacion']-.1,B['habitacion']+.25]: c(t,'toggle',.85)
    c(B['habitacion']+.5,'lockc',.9);c(B['que']-.05,'whoosh',.5);c(B['leo'],'keys',.5)
    music='m3'
ins=['-i','voice.mp3','-i',f'sfx/{music}.mp3']
fc=[]
for i,(t,s,v) in enumerate(C):
    ins+=['-i',f'sfx/{s}.mp3'];ms=int(t*1000)
    fc.append(f'[{i+2}:a]volume={v},adelay={ms}|{ms},apad=whole_dur={D}[x{i}]')
n=len(C)
fc.append(f'[0:a]apad=whole_dur={D},asplit=2[vo][vsc]')
fc.append(f'[1:a]volume=0.55,afade=t=in:d=0.4,afade=t=out:st={D-1.5}:d=1.5,atrim=0:{D},apad=whole_dur={D}[mu]')
fc.append('[mu][vsc]sidechaincompress=threshold=0.035:ratio=7:attack=12:release=280[md]')
fc.append(''.join(f'[x{i}]' for i in range(n))+f'amix=inputs={n}:normalize=0:duration=longest[sf]')
fc.append(f'[vo][md][sf]amix=inputs=3:normalize=0:duration=longest,atrim=0:{D},loudnorm=I=-14:TP=-1.5:LRA=9[out]')
open(f'{fmt}/mix_filter.txt','w').write(';\n'.join(fc))
subprocess.run(['ffmpeg','-y','-loglevel','error']+ins+['-filter_complex_script',f'{fmt}/mix_filter.txt','-map','[out]','-ar','48000','-c:a','aac','-b:a','192k',f'{fmt}/mix.m4a'],check=True)
print(fmt,'ok',n)
