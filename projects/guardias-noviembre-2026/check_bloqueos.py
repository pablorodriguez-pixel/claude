# Comprueba que la tabla de bloqueos de NORMAS.md coincide con la que usa solve.py.
import re, sys
code=eval("{"+re.search(r'BLOCK=\{(.*?)\}\n', open('solve.py').read(), re.S).group(1)+"}")
txt=open('NORMAS.md').read()
sec=txt[txt.index("## Bloqueos de noviembre"):txt.index("### Tres avisos sobre esta tabla")]
DISP={"Fátima":"Fatima","Asís":"Asis","Fabián":"Fabian","María":"Maria","Ana G.":"AnaG"}
EXC={"Isabel":[6,8]}   # dias que el solver le quita a proposito, autorizados por el usuario
def rango(txt):
    if txt.strip()=="—": return []
    ds=[]
    for r in re.findall(r'\d{1,2}-\d{1,2}|\d{1,2}', txt):
        if '-' in r: a,b=map(int,r.split('-')); ds+=range(a,b+1)
        else: ds.append(int(r))
    return sorted(set(ds))
doc={}
for m in re.finditer(r'^\| R[1-4] \| \*{0,2}([^|*]+?)\*{0,2} \| ([^|]+?) \|$', sec, re.M):
    doc[DISP.get(m.group(1).strip(), m.group(1).strip())]=rango(m.group(2))
err=[]
if set(doc)!=set(code): err.append(f"residentes distintos: {set(doc)^set(code)}")
for p in sorted(set(doc)&set(code)):
    esp=sorted(set(doc[p])-set(EXC.get(p,[])))
    real=sorted(d for d in code[p] if 1<=d<=30)
    if esp!=real: err.append(f"{p}: NORMAS.md dice {doc[p]} (esperado en codigo {esp}), codigo tiene {real}")
print(f"{len(doc)} residentes comprobados | excepciones autorizadas: {EXC}")
print("ERRORES:", len(err))
for e in err: print(" -", e)
sys.exit(1 if err else 0)
