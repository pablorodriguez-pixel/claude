# Voces 100 % locales con Piper (modelo es_ES-davefx-medium) + alineado de palabras con faster-whisper.
# Uso: python3 tts.py /ruta/a/es_ES-davefx-medium.onnx
import json,os,sys,subprocess,re,wave,difflib
import numpy as np
MODEL=sys.argv[1]
# tono (factor de pitch) y velocidad (length_scale de Piper) por personaje
VOICE={"R":{"pitch":0.90,"ls":0.95},"D":{"pitch":1.13,"ls":0.88}}
os.makedirs('voice',exist_ok=True)
from faster_whisper import WhisperModel
wm=WhisperModel('small',device='cpu',compute_type='int8')
norm=lambda w:re.sub(r'[^a-záéíóúüñ0-9]','',w.lower())
def load(f):
  w=wave.open(f);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
  return a,sr
for i,l in enumerate(json.load(open('script.json'))):
  v=VOICE[l['who']]; raw=f'voice/{i:02d}_raw.wav'; out=f'voice/{i:02d}.wav'
  subprocess.run([sys.executable,'-m','piper','-m',MODEL,'-f',raw,'--length-scale',str(v['ls'])],input=l['text'].encode(),check=True,capture_output=True)
  sr=22050;p=v['pitch']
  subprocess.run(['ffmpeg','-v','error','-y','-i',raw,'-af',f'asetrate={sr*p:.0f},aresample={sr},atempo={1/p:.4f}',out],check=True)
  os.remove(raw)
  a,sr=load(out); b=a[np.arange(0,len(a),sr/16000).astype(int)]
  ww=[w for s in wm.transcribe(b,language='es',word_timestamps=True,initial_prompt=l['text'])[0] for w in s.words]
  sw=l['text'].split()
  # alinear palabras del guion con las de whisper; las no emparejadas se interpolan por longitud
  sm=difflib.SequenceMatcher(a=[norm(x) for x in sw],b=[norm(w.word) for w in ww],autojunk=False)
  t=[None]*len(sw)
  for blk in sm.get_matching_blocks():
    for k in range(blk.size): w=ww[blk.b+k]; t[blk.a+k]=(w.start,w.end)
  s0=ww[0].start if ww else 0; s1=ww[-1].end if ww else len(a)/sr
  if t[0] is None: t[0]=(s0,None)
  if t[-1] is None: t[-1]=(None,s1)
  i0=0
  while i0<len(sw):
    if t[i0] is not None and t[i0][0] is not None and t[i0][1] is not None: i0+=1; continue
    j=i0
    while j<len(sw) and not (t[j] and t[j][0] is not None and t[j][1] is not None): j+=1
    st=t[i0][0] if t[i0] and t[i0][0] is not None else (t[i0-1][1] if i0>0 else s0)
    en=t[j][0] if j<len(sw) else s1
    if t[j-1] and t[j-1][1] is not None and j-1>=i0: en=t[j-1][1]
    L=[len(sw[k]) for k in range(i0,j)];tot=sum(L);c=st
    for k in range(i0,j): d=(en-st)*L[k-i0]/tot; t[k]=(c,c+d); c+=d
    i0=j
  json.dump({"dur":len(a)/sr,"words":[{"w":w,"s":round(x[0],3),"e":round(x[1],3)} for w,x in zip(sw,t)]},open(f'voice/{i:02d}.json','w'),ensure_ascii=False)
  print(i,l['who'],round(len(a)/sr,2),'|',' '.join(w.word.strip() for w in ww))
