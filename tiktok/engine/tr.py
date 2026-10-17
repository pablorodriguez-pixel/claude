import sys
from faster_whisper import WhisperModel
m=WhisperModel("small",device="cpu",compute_type="int8")
import numpy as np,subprocess;a=np.frombuffer(subprocess.run(["ffmpeg","-v","error","-i",sys.argv[1],"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout,np.int16).astype(np.float32)/32768
segs,info=m.transcribe(a,language="es",word_timestamps=True)
n=0
for s in segs:
    w=len(s.words); n+=w
    print(f"[{s.start:5.1f}-{s.end:5.1f}] {s.text.strip()}")
print("words",n)
