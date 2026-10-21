import os,sys,json,subprocess,shutil,urllib.request,urllib.error
# uso: python3 splice.py <carpeta> <corte_s>  — conserva la voz hasta <corte_s> y añade el final nuevo (end.txt)
d,cut=sys.argv[1],float(sys.argv[2]);k=os.environ['API_KEY_ELEVENLABS'];vid="y6WtESLj18d0diFRruBs"
if not os.path.exists(f'{d}/voice_old.mp3'):shutil.copy(f'{d}/voice.mp3',f'{d}/voice_old.mp3')
body={"text":open(f'{d}/end.txt').read().strip(),"model_id":"eleven_v3","language_code":"es","voice_settings":{"stability":0.0,"similarity_boost":0.8,"style":0.6,"use_speaker_boost":True}}
if not os.path.exists(f'{d}/end_raw.mp3'):
  r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={'xi-api-key':k,'Content-Type':'application/json'})
  open(f'{d}/end_raw.mp3','wb').write(urllib.request.urlopen(r,timeout=300).read())
f=lambda *a:subprocess.run(['ffmpeg','-y','-loglevel','error',*a],check=True)
f('-i',f'{d}/voice_old.mp3','-t',str(cut),'-af',f'afade=t=out:st={cut-0.08:.2f}:d=0.08','-ar','44100',f'{d}/_head.wav')
f('-i',f'{d}/end_raw.mp3','-af','atempo=1.08,loudnorm=I=-14:TP=-1.5:LRA=7','-ar','44100',f'{d}/_tail.wav')
f('-f','lavfi','-i','anullsrc=r=44100:cl=mono','-t','0.45',f'{d}/_gap.wav')
open(f'{d}/_l.txt','w').write(''.join(f"file '{os.path.abspath(d)}/{n}.wav'\n" for n in ('_head','_gap','_tail')))
f('-f','concat','-safe','0','-i',f'{d}/_l.txt','-ac','1','-b:a','192k',f'{d}/voice.mp3')
out=subprocess.run(['curl','-sS','https://api.elevenlabs.io/v1/speech-to-text','-H','xi-api-key: '+k,'-F','model_id=scribe_v1','-F','language_code=spa','-F','timestamps_granularity=word','-F',f'file=@{d}/voice.mp3'],capture_output=True,text=True).stdout
j=json.loads(out);json.dump(j,open(f'{d}/stt.json','w'),ensure_ascii=False)
ws=[w for w in j['words'] if w['type']=='word'];print(d,'dur',ws[-1]['end']);print(' '.join(f"{w['text']}@{w['start']:.2f}" for w in ws if w['start']>cut-3))
