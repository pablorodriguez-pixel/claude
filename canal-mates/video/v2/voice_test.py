import asyncio, os, sys, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts
TEXT = "Tienes mil botellas de vino para la fiesta de mañana. Y exactamente una está envenenada. ¿Cuántos catadores necesitas para encontrarla?"
VOICES = ["es-ES-AlvaroNeural","es-MX-JorgeNeural","es-US-AlonsoNeural","en-US-AndrewMultilingualNeural","en-US-BrianMultilingualNeural","fr-FR-RemyMultilingualNeural","de-DE-FlorianMultilingualNeural","it-IT-GiuseppeMultilingualNeural","pt-BR-ThalitaMultilingualNeural","en-US-AvaMultilingualNeural"]
async def one(v):
    c = edge_tts.Communicate(TEXT, v, boundary="WordBoundary", proxy=os.environ.get("HTTPS_PROXY"))
    n = 0; nb = 0
    with open(f"samples/{v}.mp3","wb") as f:
        async for ch in c.stream():
            if ch["type"]=="audio": f.write(ch["data"]); nb += len(ch["data"])
            elif ch["type"]=="WordBoundary": n += 1
    print(v, "palabras:", n, "bytes:", nb)
async def main():
    for v in VOICES:
        try: await one(v)
        except Exception as e: print(v, "ERROR", str(e)[:80])
asyncio.run(main())
