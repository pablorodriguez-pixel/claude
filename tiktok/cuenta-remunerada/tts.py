# Genera una pista por línea con timestamps por carácter (ElevenLabs v3)
import os,json,base64,urllib.request,urllib.error,sys
k=os.environ['API_KEY_ELEVENLABS']
VOICES={"R":"iwNksRcTU0mglXb8PAk5","D":"7QQzpAyzlKTVrRzQJmTE"}  # Lucio Belasco / DANI ESPAÑOL
os.makedirs('voice',exist_ok=True)
for i,l in enumerate(json.load(open('script.json'))):
  out=f'voice/{i:02d}.json'
  if os.path.exists(out) and '--force' not in sys.argv: continue
  body={"text":l['text'],"model_id":"eleven_v3","language_code":"es",
   "voice_settings":{"stability":0.5,"similarity_boost":0.8,"style":0.4,"use_speaker_boost":True}}
  r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICES[l['who']]}/with-timestamps?output_format=mp3_44100_128",
   data=json.dumps(body).encode(),headers={'xi-api-key':k,'Content-Type':'application/json'})
  try: d=json.load(urllib.request.urlopen(r,timeout=300))
  except urllib.error.HTTPError as e: print(i,e.code,e.read()[:400]); sys.exit(1)
  open(f'voice/{i:02d}.mp3','wb').write(base64.b64decode(d['audio_base64']))
  json.dump(d['alignment'],open(out,'w'))
  print(i,'ok')
