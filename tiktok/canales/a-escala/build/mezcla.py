"""Pista de efectos + voz → audio final. Cada efecto se iguala al pico de la voz y se pone a su db (guia/sonido.md).
Uso: python3 mezcla.py ../ep01-billon-dormido   (necesita <ep>/sonidos.py y build/subs.json)"""
import json,os,re,subprocess,sys,unicodedata,importlib.util
ep=os.path.abspath(sys.argv[1]);here=os.path.dirname(os.path.abspath(__file__))
subs=json.load(open(os.path.join(ep,'build','subs.json')))
norm=lambda s:re.sub(r'\W','',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode()).lower()
def vt(w,n=1):
    k=0
    for x in subs:
        if norm(x['t'])==norm(w):
            k+=1
            if k==n:return x['s']
    raise KeyError(w)
voz=os.path.join(ep,'voice_raw.mp3')
pico=lambda f:float(re.search(r'max_volume: ([-\d.]+)',subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr).group(1))
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',voz]))+1.2
spec=importlib.util.spec_from_file_location('s',os.path.join(ep,'sonidos.py'));m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
ef=sorted(m.efectos(vt,dur),key=lambda x:x['t']);pv=pico(voz)
ins=['-i',voz];fil=[];lab=['[0:a]']
for i,x in enumerate(ef,1):
    f=next(os.path.join(here,'sonidos',n) for n in os.listdir(os.path.join(here,'sonidos')) if n.rsplit('.',1)[0]==x['sonido'])
    ins+=['-i',f];g=pv-pico(f)+x['db'];ch=[]
    if x.get('vel',1)!=1:ch.append(f"asetrate=44100*{x['vel']},aresample=44100")
    if x.get('lp'):ch.append(f"lowpass=f={x['lp']}")
    # t es el pico del sonido salvo con ancla «empieza»: se adelanta un poco
    t0=max(0,x['t']-(0 if x.get('ancla')=='empieza' else .05))
    ch+= [f"volume={g:.1f}dB",f"adelay={int(t0*1000)}|{int(t0*1000)}"]
    fil.append(f"[{i}:a]aformat=channel_layouts=stereo,{','.join(ch)}[e{i}]");lab.append(f'[e{i}]')
fil.append(f"[0:a]aformat=channel_layouts=stereo,apad=whole_dur={dur}[v]");lab[0]='[v]'
fil.append(''.join(lab)+f"amix=inputs={len(lab)}:normalize=0:duration=first,alimiter=limit=0.95[out]")
out=os.path.join(ep,'build','mezcla.wav')
subprocess.run(['ffmpeg','-y','-loglevel','error',*ins,'-filter_complex',';'.join(fil),'-map','[out]','-t',str(dur),out],check=True)
ts=[x['t'] for x in ef];huecos=[(round(a,1),round(b,1)) for a,b in zip([0]+ts,ts+[dur]) if b-a>2.2]
print(len(ef),'efectos ·',out,'· huecos >2,2 s:',huecos or 'ninguno')
