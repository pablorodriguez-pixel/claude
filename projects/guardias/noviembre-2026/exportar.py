# -*- coding: utf-8 -*-
"""Volca la solucion de best.pkl a datos_web.json, que consume web.py."""
import sys, os, pickle, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from nov import *
best = pickle.load(open('best.pkl','rb'))
cua = {d: {} for d in DIAS}
for (t,u),p in best.items():
    for d in u: cua[d][t] = p
for d,p in UCQ.items(): cua[d]["UCQ"] = p
dias_de = {}
for d in DIAS:
    for t,p in cua[d].items(): dias_de.setdefault(p, {})[d] = t
OCT_PU = {"Miriam":1,"Aitor":1,"Fatima":1,"Cristina":1,"Mercedes":1,"Rosario":1,"Antonio":1,
 "Emilio":1,"Eva":1,"Patricia":1,"Tania":1,"Ana R2":1,"Fabian":1,"Almudena":2,"Carlota":1,
 "Sandra":1,"Isabel":1,"Ana G":2}
P9 = {7,8,9}
per = {}
for p in NIVEL:
    dd = dias_de.get(p, {})
    cnt = lambda t: sum(1 for x in dd.values() if x == t)
    per[p] = dict(nivel=NIVEL[p], nov=len(dd), fin=sum(1 for d in dd if es_finde(d)),
        tx=cnt("TX"), ucq=cnt("UCQ"), may=cnt("MAYOR"), qx=cnt("QX2")+cnt("QX3"),
        oct=OCT_TOT[p], octfin=OCT_FIN[p], dos=OCT_TOT[p]+len(dd),
        dosfin=OCT_FIN[p]+sum(1 for d in dd if es_finde(d)),
        pu=OCT_PU.get(p,0)+(1 if P9 & set(dd) else 0),
        bloq=sorted(x for x in BLOQ[p] if 1 <= x <= 30), dias=sorted(dd))
json.dump(dict(cuadrante={str(d): cua[d] for d in DIAS}, personas=per,
    parejas=[list(x) for x in PAREJAS], festivos=sorted(FESTIVOS),
    nov_ya={"1":["Almudena","Patricia","Ana G","Mercedes","Aitor"],
            "2":["Almudena","Tania","Fabian","Fatima","Miriam"]}),
    open('datos_web.json','w'), ensure_ascii=False)
print("datos_web.json actualizado")
