import os,json,urllib.request,sys
k=os.environ['API_KEY_ELEVENLABS']; vid="y6WtESLj18d0diFRruBs"
txt=open('script.txt').read().strip()
body={"text":txt,"model_id":"eleven_v3","language_code":"es",
 "voice_settings":{"stability":0.0,"similarity_boost":0.8,"style":0.6,"use_speaker_boost":True}}
r=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}?output_format=mp3_44100_128",
 data=json.dumps(body).encode(),headers={'xi-api-key':k,'Content-Type':'application/json'})
import urllib.error
try:
  open("voice_raw.mp3","wb").write(urllib.request.urlopen(r,timeout=300).read())
except urllib.error.HTTPError as e:
  print(e.code,e.read()[:600]); sys.exit(1)
print('ok')
