import os, sys, json, base64, requests, subprocess, wave, numpy as np
key = os.environ["API_KEY_ELEVENLABS"]
def gen(tag, voice, model, text, stability, out="build/vtest"):
    body = {"text": text, "model_id": model, "language_code": "es", "voice_settings": {"stability": stability, "similarity_boost": 0.8}}
    r = requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128", headers={"xi-api-key": key}, json=body, timeout=120)
    if r.status_code != 200: print(tag, "ERROR", r.status_code, r.text[:200]); return
    d = r.json(); mp3 = f"{out}/{tag}.mp3"; open(mp3, "wb").write(base64.b64decode(d["audio_base64"])); json.dump(d["alignment"], open(f"{out}/{tag}.json", "w"))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ac", "1", "-ar", "16000", f"{out}/{tag}.wav"])
    w = wave.open(f"{out}/{tag}.wav"); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768; sr = w.getframerate(); x = x / (abs(x).max() + 1e-9) * .9
    n = int(.04 * sr); hop = int(.01 * sr); f = []
    for i in range(0, len(x) - n, hop):
        s = x[i:i + n]
        if (s ** 2).mean() ** .5 < .03: f.append(np.nan); continue
        s = s - s.mean(); ac = np.correlate(s, s, 'full')[n - 1:]; lo = int(sr / 330); hi = int(sr / 70); k = np.argmax(ac[lo:hi]) + lo
        f.append(sr / k if ac[k] / ac[0] > .35 else np.nan)
    v = np.array(f); v = v[~np.isnan(v)]; st = 12 * np.log2(v / np.median(v))
    print(f"{tag}: {len(text)} car · {len(x)/sr:.1f}s · mediana {np.median(v):.0f} Hz · desv {st.std():.2f} st · rango {np.percentile(st,90)-np.percentile(st,10):.1f} st")
TEXT = "Mañana das la fiesta del año. Mil botellas de vino… y UNA está envenenada. Un solo sorbo, y en una hora estás muerto. Tienes un día para encontrarla. ¿Cuántos catadores necesitas?"
if __name__ == "__main__":
    GABO = "o0SveC0zgHFuCsEO3vHR"
    gen("gabo_v3_s0", GABO, "eleven_v3", TEXT, 0.0)
    gen("gabo_v3_s5", GABO, "eleven_v3", TEXT, 0.5)
    gen("gabo_v4", GABO, "eleven_v4", TEXT, 0.4)
