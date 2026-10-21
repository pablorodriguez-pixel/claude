import os,sys,subprocess,json
# uso: python3 stt.py <carpeta>  -> voice.mp3 (acelerada 1.08x) + stt.json (palabras con tiempos)
d=sys.argv[1]
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{d}/voice_raw.mp3','-filter:a','atempo=1.08,loudnorm=I=-14:TP=-1.5:LRA=7','-ar','44100','-b:a','192k',f'{d}/voice.mp3'],check=True)
out=subprocess.run(['curl','-sS','https://api.elevenlabs.io/v1/speech-to-text','-H','xi-api-key: '+os.environ['API_KEY_ELEVENLABS'],
 '-F','model_id=scribe_v1','-F','language_code=spa','-F','timestamps_granularity=word','-F',f'file=@{d}/voice.mp3'],capture_output=True,text=True).stdout
j=json.loads(out); json.dump(j,open(f'{d}/stt.json','w'),ensure_ascii=False)
ws=[w for w in j['words'] if w['type']=='word']
print(d,'dur',ws[-1]['end'],'words',len(ws))
print(' '.join(f"{w['text']}@{w['start']:.2f}" for w in ws))
