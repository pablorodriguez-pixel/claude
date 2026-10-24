"""Une las escenas de voz en una línea de tiempo (timeline.js) y mezcla la voz en un único WAV."""
import json, subprocess, sys, os

B = sys.argv[1]
GAP = 0.32   # pausa entre escenas: ritmo más pausado
LEAD = 0.4

voice = json.load(open(os.path.join(B, "voice.json")))
t = LEAD
scenes = []
for v in voice:
    scenes.append({"name": v["name"], "start": round(t, 3), "dur": round(v["dur"], 3), "end": round(t + v["dur"], 3), "words": v["words"]})
    t += v["dur"] + GAP
total = round(t - GAP + 0.6, 3)  # cola final tras el CTA
open(os.path.join(B, "timeline.js"), "w").write("const TL = " + json.dumps({"scenes": scenes, "total": total}, ensure_ascii=False) + ";")

# pista de voz: cada escena en su instante exacto
cmd = ["ffmpeg", "-y", "-v", "error"]
for v in voice:
    cmd += ["-i", os.path.join(B, v["name"] + ".mp3")]
flt = []
for i, s in enumerate(scenes):
    flt.append(f"[{i}:a]aresample=44100,aformat=channel_layouts=mono,adelay={int(s['start']*1000)}:all=1[a{i}]")
flt.append("".join(f"[a{i}]" for i in range(len(scenes))) + f"amix=inputs={len(scenes)}:normalize=0,apad=whole_dur={total}[v]")
cmd += ["-filter_complex", ";".join(flt), "-map", "[v]", "-t", str(total), os.path.join(B, "voice.wav")]
subprocess.check_call(cmd)
print("duración total", total)
for s in scenes:
    print(s["name"], s["start"], "→", s["end"])
