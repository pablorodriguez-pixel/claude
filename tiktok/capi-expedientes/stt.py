import os,json,subprocess
k=os.environ['API_KEY_ELEVENLABS']
out=subprocess.run(['curl','-sS','-X','POST','https://api.elevenlabs.io/v1/speech-to-text','-H','xi-api-key: '+k,
 '-F','model_id=scribe_v1','-F','language_code=es','-F','file=@voice_raw.mp3'],capture_output=True,text=True).stdout
open('stt.json','w').write(out)
d=json.loads(out); print(d.get('text','')[:300]); print(len(d.get('words',[])),'tokens')
