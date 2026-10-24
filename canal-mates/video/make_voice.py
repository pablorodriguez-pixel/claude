"""Genera la narración por escenas con tiempos por palabra (para subtítulos karaoke)."""
import asyncio, json, os, subprocess, sys, certifi

certifi.where = lambda: "/root/.ccr/ca-bundle.crt"  # CA del proxy del entorno
import edge_tts

OUT = sys.argv[1]
VOICE = "es-ES-AlvaroNeural"
RATE = "+4%"

SCENES = [
    ("hook",    "Mil botellas de vino. Una está envenenada. Y el veneno tarda una hora en matar."),
    ("reto",    "Solo tienes una hora. ¿Cuántos catadores necesitas para encontrar la botella mala?"),
    ("giro",    "Casi todos responden: quinientos. O cien. Pero la respuesta es... diez."),
    ("binario", "El truco es el binario. Numera las botellas del uno al mil, y escribe cada número en binario."),
    ("reparto", "Cada catador vigila un dígito. Y bebe solo de las botellas que tienen un uno en esa posición."),
    ("lectura", "Pasada la hora, mira quién ha muerto. Si caen los catadores uno, tres y cuatro, sale uno, uno, cero, uno. Es decir, la botella trece."),
    ("cierre",  "Con diez dígitos puedes escribir mil veinticuatro números. Más que suficiente."),
    ("cta",     "¿Te ha volado la cabeza? Sigue Cero y Uno, y resuelve el siguiente acertijo."),
]


async def one(name, text):
    mp3 = os.path.join(OUT, f"{name}.mp3")
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary",
                                proxy=os.environ.get("HTTPS_PROXY"))
    words = []
    with open(mp3, "wb") as f:
        async for ch in comm.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"w": ch["text"], "t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    dur = float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3]).decode())
    return {"name": name, "text": text, "words": words, "dur": dur}


async def main():
    os.makedirs(OUT, exist_ok=True)
    res = await asyncio.gather(*[one(n, t) for n, t in SCENES])
    json.dump(res, open(os.path.join(OUT, "voice.json"), "w"), ensure_ascii=False, indent=1)
    for r in res:
        print(r["name"], round(r["dur"], 2), len(r["words"]), "palabras")

asyncio.run(main())
