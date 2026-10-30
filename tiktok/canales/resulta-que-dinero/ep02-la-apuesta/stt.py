import os,json,uuid,urllib.request
k=os.environ['API_KEY_ELEVENLABS']; b=uuid.uuid4().hex
data=open('voice_raw.mp3','rb').read()
body=(f'--{b}\r\nContent-Disposition: form-data; name="model_id"\r\n\r\nscribe_v1\r\n'
      f'--{b}\r\nContent-Disposition: form-data; name="language_code"\r\n\r\nspa\r\n'
      f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="v.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n').encode()+data+f'\r\n--{b}--\r\n'.encode()
r=urllib.request.Request('https://api.elevenlabs.io/v1/speech-to-text',data=body,headers={'xi-api-key':k,'Content-Type':f'multipart/form-data; boundary={b}'})
open('stt.json','w').write(urllib.request.urlopen(r,timeout=300).read().decode()); print('ok')
