"""Hook de prueba (~3 s) delante del vídeo: voz nueva, titular grande desde el fotograma 0 y montaje rápido
de los mejores planos del episodio (adelanto del final). Uso: python3 hook.py ../<episodio>   (lee <ep>/hook.json)
hook.json: {"voz": "[excited] …", "tempo": 1.08, "lineas": [["TEXTO", "#fff"], …], "planos": [t1, t2, …]}"""
import json,os,re,subprocess,sys,urllib.request
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ep=os.path.abspath(sys.argv[1]);name=os.path.basename(ep);here=os.path.dirname(os.path.abspath(__file__))
cfg=json.load(open(os.path.join(ep,'hook.json')));hd=os.path.join(ep,'build','hook');os.makedirs(hd,exist_ok=True)
run=lambda *a:subprocess.run(a,check=True)
dur=lambda f:float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
pico=lambda f:float(re.search(r'max_volume: ([-\d.]+)',subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr).group(1))
# 1. voz (se guarda por texto: cambiar la frase regenera)
raw=os.path.join(hd,'voz_raw.mp3');txtf=os.path.join(hd,'voz.txt')
if not(os.path.exists(raw) and open(txtf).read()==cfg['voz']):
    body={"text":cfg['voz'],"model_id":"eleven_v3","language_code":"es","voice_settings":{"stability":0.5,"similarity_boost":0.8,"style":0.3,"use_speaker_boost":True}}
    r=urllib.request.Request("https://api.elevenlabs.io/v1/text-to-speech/43h7ymOnaaYdWr3dRbsS?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={'xi-api-key':os.environ['API_KEY_ELEVENLABS'],'Content-Type':'application/json'})
    open(raw,'wb').write(urllib.request.urlopen(r,timeout=300).read());open(txtf,'w').write(cfg['voz'])
voz=os.path.join(hd,'voz.wav')
run('ffmpeg','-y','-loglevel','error','-i',raw,'-af',f"silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo={cfg.get('tempo',1.08)}",'-ar','44100','-ac','2',voz)
D=round(dur(voz)+.3,3);P=cfg['planos'];d=D/len(P)
# 2. planos sin subtítulos
clips=[]
for i,t in enumerate(P):
    f=os.path.join(hd,f'plano{i}_{t}_{d:.3f}.mp4');a=int(round(t*30));b=a+int(round(d*30))
    if not os.path.exists(f):
        subprocess.run(['node',os.path.join(here,'render.js'),os.path.join(ep,'build'),'seg',str(a),str(b),f],env={**os.environ,'HIDE':'1'},check=True)
    clips.append(f)
# 3. titular
W,H=1080,1920;F=lambda s:ImageFont.truetype(os.path.join(here,'figtree-extrabold.ttf'),s)
img=Image.new('RGBA',(W,H),(0,0,0,0));sh=Image.new('RGBA',(W,H),(0,0,0,0));d1=ImageDraw.Draw(img);d2=ImageDraw.Draw(sh)
# velo oscuro arriba para que el titular se lea sobre cualquier plano
for y in range(0,1000):d2.line([(0,y),(W,y)],fill=(5,6,13,int(235*min(1,(1000-y)/280))))
y=330
for ln in cfg['lineas']:
    txt,col=ln[:2];s=ln[2] if len(ln)>2 else 118
    while d1.textlength(txt,font=F(s))>W-120:s-=4
    f=F(s);w=d1.textlength(txt,font=f);d2.text(((W-w)/2,y+10),txt,font=f,fill=(0,0,0,220));d1.text(((W-w)/2,y),txt,font=f,fill=col,stroke_width=5,stroke_fill='#07080e');y+=int(s*1.12)
sh=sh.filter(ImageFilter.GaussianBlur(10));tit=os.path.join(hd,'titular.png');Image.alpha_composite(sh,img).save(tit)
# 4. vídeo del hook: planos seguidos + titular (entra con un pequeño zoom)
lst=os.path.join(hd,'planos.txt');open(lst,'w').write(''.join(f"file '{c}'\n" for c in clips))
fx=[('golpe-hondo',0,-8)]+[('aire',max(0,i*d-.12),-11) for i in range(1,len(P))]+[('aire',D-.15,-12)]
pv=pico(voz);ins=['-i',voz];fil=[];lab=['[2:a]']  # entradas: 0 planos, 1 titular, 2 voz, 3… efectos
for i,(n,t,db) in enumerate(fx,1):
    s=next(os.path.join(here,'sonidos',x) for x in os.listdir(os.path.join(here,'sonidos')) if x.rsplit('.',1)[0]==n)
    ins+=['-i',s];fil.append(f"[{i+2}:a]aformat=channel_layouts=stereo,volume={pv-pico(s)+db:.1f}dB,adelay={int(t*1000)}|{int(t*1000)}[e{i}]");lab.append(f'[e{i}]')
fil.append(''.join(lab)+f"amix=inputs={len(lab)}:normalize=0:duration=longest,apad,atrim=0:{D},alimiter=limit=0.95[a]")
hv=os.path.join(hd,'hook.mp4')
run('ffmpeg','-y','-loglevel','error','-f','concat','-safe','0','-i',lst,'-loop','1','-i',tit,*ins,'-filter_complex',
    f"[1:v]scale=w='{W}*(1+0.12*max(0,1-t/0.18))':h=-1:eval=frame,crop={W}:{H}[t];[0:v][t]overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuv420p,trim=0:{D},setpts=PTS-STARTPTS[v];"
    +';'.join(fil),
    '-map','[v]','-map','[a]','-c:v','libx264','-crf','18','-r','30','-c:a','aac','-b:a','192k','-ar','44100',hv)
# 5. hook + episodio (y versión con la portada como primer fotograma, si existe)
def une(partes,out):
    n=len(partes);ins=sum((['-i',x] for x in partes),[])
    run('ffmpeg','-y','-loglevel','error',*ins,'-filter_complex',''.join(f'[{i}:v][{i}:a]' for i in range(n))+f'concat=n={n}:v=1:a=1[v][a]',
        '-map','[v]','-map','[a]','-c:v','libx264','-crf','21','-preset','medium','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','192k','-ar','44100','-movflags','+faststart',out)
    print(out,round(dur(out),2),'s')
une([hv,os.path.join(ep,name+'.mp4')],os.path.join(ep,name+'-hook.mp4'))
cov=os.path.join(ep,'build','cover1.mp4')
if os.path.exists(cov):une([cov,hv,os.path.join(ep,name+'.mp4')],os.path.join(ep,name+'-hook-con-portada.mp4'))
