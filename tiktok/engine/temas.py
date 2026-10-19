"""Banco de temas con demanda real: lo que la gente pregunta a Google en español («por qué se dice…», «de dónde viene…»).
uso: python3 -I temas.py [semillas extra...]  -> historia/director/TEMAS_GOOGLE.txt (una pregunta por línea, sin repetidos)"""
import urllib.request, urllib.parse, json, sys, os
SEM = ["por qué se dice", "por qué decimos", "de dónde viene la expresión", "de dónde viene la palabra", "por qué se llama",
       "por qué la letra", "por qué el símbolo", "por qué en españa", "por qué los españoles", "por qué se celebra", "por qué se pone",
       "por qué la", "por qué el", "por qué los", "por qué las", "de dónde viene"] + sys.argv[1:]
vistos = {}
for s in SEM:
    for suf in [""] + [" " + c for c in "abcdefghilmnoprstv"]:
        u = "https://suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=es&q=" + urllib.parse.quote(s + suf)
        try: r = json.loads(urllib.request.urlopen(u, timeout=10).read().decode("utf-8", "replace"))
        except Exception: continue
        for x in r[1]: vistos.setdefault(x.strip(), 1)
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "historia", "director", "TEMAS_GOOGLE.txt")
open(out, "w").write("\n".join(vistos))
print(len(vistos), "preguntas →", os.path.normpath(out))
