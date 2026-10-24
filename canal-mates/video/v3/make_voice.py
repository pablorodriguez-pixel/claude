"""Narración por escenas con tiempos por palabra.
Uso: make_voice.py <script.json> <build_dir> [edge:<voz> | eleven:<voice_id>[:<modelo>]]
ElevenLabs: cachea cada frase por hash y se niega a superar el cupo restante de la cuenta."""
import asyncio, base64, hashlib, json, os, subprocess, sys, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"

SCRIPT, OUT = sys.argv[1], sys.argv[2]
PROV = sys.argv[3] if len(sys.argv) > 3 else "edge:es-MX-JorgeNeural"
SCENES = json.load(open(SCRIPT))
os.makedirs(OUT, exist_ok=True)


def dur(path):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).decode())


async def edge_one(name, text, voice):
    import edge_tts
    mp3 = os.path.join(OUT, f"{name}.mp3")
    comm = edge_tts.Communicate(text, voice, boundary="WordBoundary", proxy=os.environ.get("HTTPS_PROXY"))
    words = []
    with open(mp3, "wb") as f:
        async for ch in comm.stream():
            if ch["type"] == "audio": f.write(ch["data"])
            elif ch["type"] == "WordBoundary": words.append({"w": ch["text"], "t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    return {"name": name, "text": text, "words": words, "dur": dur(mp3)}


TEMPO = float(os.environ.get("VOICE_TEMPO", "1.10"))   # más ritmo sin cambiar el tono (atempo)
STAB = float(os.environ.get("VOICE_STABILITY", "0.4"))


def speed_up(mp3, words):
    if abs(TEMPO - 1.0) < 1e-3: return words
    tmp = mp3 + ".t.mp3"
    subprocess.check_call(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-filter:a", f"atempo={TEMPO}", "-b:a", "128k", tmp]); os.replace(tmp, mp3)
    return [{"w": w["w"], "t": w["t"] / TEMPO, "d": w["d"] / TEMPO} for w in words]


def eleven_one(name, text, voice_id, model):
    import requests
    key = os.environ["API_KEY_ELEVENLABS"]
    cache = os.path.join(OUT, "eleven_cache"); os.makedirs(cache, exist_ok=True)
    h = hashlib.sha1(f"{voice_id}|{model}|{text}".encode()).hexdigest()[:16]
    cj = os.path.join(cache, h + ".json")
    if not os.path.exists(cj):
        r = requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128",
                          headers={"xi-api-key": key, "Content-Type": "application/json"},
                          json={"text": text, "model_id": model, "language_code": "es",
                                "voice_settings": {"stability": STAB, "similarity_boost": 0.8}}, timeout=120)
        if r.status_code != 200:
            sys.exit(f"ElevenLabs {r.status_code}: {r.text[:300]}")
        open(cj, "w").write(r.text)
    d = json.load(open(cj))
    mp3 = os.path.join(OUT, f"{name}.mp3")
    open(mp3, "wb").write(base64.b64decode(d["audio_base64"]))
    al = d["alignment"]; ch, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    words, i = [], 0
    while i < len(ch):
        if ch[i].isspace(): i += 1; continue
        j = i
        while j < len(ch) and not ch[j].isspace(): j += 1
        words.append({"w": "".join(ch[i:j]), "t": st[i], "d": en[j - 1] - st[i]}); i = j
    words = [w for w in words if not (w["w"].startswith("[") and w["w"].endswith("]"))]
    words = speed_up(mp3, words)
    return {"name": name, "text": text, "words": words, "dur": dur(mp3)}


def check_budget(model):
    import requests
    s = requests.get("https://api.elevenlabs.io/v1/user/subscription", headers={"xi-api-key": os.environ["API_KEY_ELEVENLABS"]}, timeout=30).json()
    left = s["character_limit"] - s["character_count"]
    cache = os.path.join(OUT, "eleven_cache")
    need = 0
    for _, text in SCENES:
        h = hashlib.sha1(f"{VOICE_ID}|{model}|{text}".encode()).hexdigest()[:16]
        if not os.path.exists(os.path.join(cache, h + ".json")): need += len(text)
    cost = need * 0.25   # coste real medido ≈ 0.11-0.25 créditos/carácter
    print(f"créditos restantes: {left} · esta ejecución gastará ≈ {cost:.0f} ({need} caracteres nuevos, modelo {model})")
    if cost > left:
        sys.exit("ABORTADO: no hay créditos suficientes en la cuenta de ElevenLabs")


async def main():
    kind, _, rest = PROV.partition(":")
    if kind == "edge":
        res = await asyncio.gather(*[edge_one(n, t, rest) for n, t in SCENES])
    else:
        global VOICE_ID
        VOICE_ID, _, model = rest.partition(":"); model = model or "eleven_v4"
        check_budget(model)
        res = [eleven_one(n, t, VOICE_ID, model) for n, t in SCENES]
    json.dump(res, open(os.path.join(OUT, "voice.json"), "w"), ensure_ascii=False, indent=1)
    for r in res: print(r["name"], round(r["dur"], 2), len(r["words"]), "palabras")

VOICE_ID = None
asyncio.run(main())
