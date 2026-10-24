"""Narración por escenas con tiempos por palabra. Uso: make_voice.py <build> [voz]"""
import asyncio, json, os, subprocess, sys, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"  # CA del proxy del entorno
import edge_tts

OUT = sys.argv[1]
VOICE = sys.argv[2] if len(sys.argv) > 2 else "es-MX-JorgeNeural"
RATE = "+0%"

SCENES = [
    ("hook",     "Tienes mil botellas de vino para la fiesta de mañana. Y exactamente una está envenenada."),
    ("plazo",    "El veneno tarda una hora en hacer efecto. Y la fiesta empieza dentro de veinticuatro horas."),
    ("reto",     "Puedes contratar catadores, pero solo tienes una ronda de pruebas. ¿Cuántos necesitas?"),
    ("obvio",    "La respuesta obvia son cientos. Pero hay un truco que lo resuelve con solo diez."),
    ("mini",     "Empecemos por algo pequeño. Cuatro botellas, y dos catadores: Ana y Beto."),
    ("reglas",   "Ana bebe de la dos y de la cuatro. Beto bebe de la tres y de la cuatro."),
    ("lecturas", "Si no enferma nadie, es la uno. Si enferma solo Ana, la dos. Solo Beto, la tres. Y si enferman los dos, la cuatro."),
    ("dobla",    "Es el sistema binario: cada catador nuevo duplica las botellas que puedes comprobar. Con tres, ocho. Con cuatro, dieciséis."),
    ("diez",     "Con diez catadores, llegas a mil veinticuatro botellas. Cada uno prueba unas quinientas, y en una sola ronda sabes cuál es la mala."),
    ("veinte",   "Con veinte catadores, podrías analizar más de un millón de botellas."),
    ("cta",      "Eso es el binario. Sigue Cero y Uno para el próximo acertijo."),
]

async def one(name, text):
    mp3 = os.path.join(OUT, f"{name}.mp3")
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary", proxy=os.environ.get("HTTPS_PROXY"))
    words = []
    with open(mp3, "wb") as f:
        async for ch in comm.stream():
            if ch["type"] == "audio": f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"w": ch["text"], "t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3]).decode())
    return {"name": name, "text": text, "words": words, "dur": dur}

async def main():
    os.makedirs(OUT, exist_ok=True)
    res = await asyncio.gather(*[one(n, t) for n, t in SCENES])
    json.dump(res, open(os.path.join(OUT, "voice.json"), "w"), ensure_ascii=False, indent=1)
    for r in res: print(r["name"], round(r["dur"], 2), len(r["words"]), "palabras")
asyncio.run(main())
