# -*- coding: utf-8 -*-
import sys, pickle, datetime
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from nov import *
best = pickle.load(open('best.pkl','rb'))

cua = {d: {} for d in DIAS}
for (t,u),p in best.items():
    for d in u: cua[d][t] = p
for d,p in UCQ.items(): cua[d]["UCQ"] = p

# ---------- validaciones duras ----------
err = []
dias_de = {}
for d in DIAS:
    vistos = {}
    for t,p in cua[d].items():
        if d in BLOQ[p]: err.append(f"dia {d}: {p} esta bloqueado ({t})")
        if p in vistos: err.append(f"dia {d}: {p} duplicado ({t} y {vistos[p]})")
        vistos[p] = t
        dias_de.setdefault(p, {})[d] = t
    esperados = 3 if (d,) in QUIROFANO_MINIMO else (4 if (d,) in QUIROFANO_CORTO else 5)
    if len(cua[d]) != esperados:
        err.append(f"dia {d}: {len(cua[d])} puestos, se esperaban {esperados}")
    for t,p in cua[d].items():
        if NIVEL[p] in VETO_NIVEL.get(d, set()):
            err.append(f"dia {d}: {p} es {NIVEL[p]} y ese dia esta vetado ({t})")
    if d == CURSO_R4:
        for t,p in cua[d].items():
            if NIVEL[p]=="R4" and t!="TX": err.append(f"dia 30: R4 {p} en {t} (curso R4)")
    if NIVEL[cua[d]["MAYOR"]] not in ("R3","R4"): err.append(f"dia {d}: mayor no es R3/R4")
for p,dd in dias_de.items():
    for d in dd:
        if d+1 in dd and dd[d]!="TX" and dd[d+1]!="TX":
            err.append(f"{p}: guardias consecutivas {d} y {d+1} ({dd[d]}/{dd[d+1]})")
for p,dd in dias_de.items():                          # localizada de trasplante
    if NIVEL[p] != "R4": continue
    for d,t in dd.items():
        if t != "TX": continue
        if d+1 in BLOQ_VAC[p]:
            err.append(f"{p}: TX el {d}, vispera de su bloqueo de vacaciones")
        sig = dd.get(d+1)
        if sig and sig != "TX":
            err.append(f"{p}: TX el {d}, vispera de guardia ({sig} el {d+1})")
for p,dd in dias_de.items():                          # frontera con el 1-2 de nov
    ant = PREV.get(p, {})
    if 2 in ant and 3 in dd and ant[2] != "TX" and dd[3] != "TX":
        err.append(f"{p}: dia 2 ({ant[2]}) y dia 3 ({dd[3]}) seguidos")
for t,u in PLAZAS:                                    # emparejamiento V+D y S+festivo
    if len(u)==2 and cua[u[0]][t] != cua[u[1]][t]: err.append(f"pareja {u} rota en {t}")
PUENTE9 = {6,7,8,9}
for p in ("Almudena","Ana G"):
    if PUENTE9 & set(dias_de.get(p,{})): err.append(f"{p} trabaja el puente del 9")
print("VALIDACION:", f"{len(err)} errores" if err else "OK - sin errores")
for e in err[:15]: print("  !", e)

# ---------- tabla por residente ----------
OCT_PU = {"Miriam":1,"Aitor":1,"Fatima":1,"Cristina":1,"Mercedes":1,"Rosario":1,"Antonio":1,
 "Emilio":1,"Eva":1,"Patricia":1,"Tania":1,"Ana R2":1,"Fabian":1,"Almudena":2,"Carlota":1,
 "Sandra":1,"Isabel":1,"Ana G":2}
print(f"\n{'Niv':4}{'Residente':11}{'Nov':>4}{'Fin':>4}{'TX':>4}{'UCQ':>4}{'May':>4}{'QX':>4}{'2m':>5}{'Fin2m':>6}{'Pnt':>5}")
tot2 = {}
for p in sorted(NIVEL, key=lambda x:(NIVEL[x], x)):
    dd = dias_de.get(p, {})
    n  = len(dd); f = sum(1 for d in dd if es_finde(d))
    cnt = lambda t: sum(1 for x in dd.values() if x==t)
    pu = OCT_PU.get(p,0) + (1 if PUENTE9 & set(dd) else 0)
    t2 = OCT_TOT[p]+n; tot2[p]=t2
    print(f"{NIVEL[p]:4}{p:11}{n:4}{f:4}{cnt('TX'):4}{cnt('UCQ'):4}{cnt('MAYOR'):4}"
          f"{cnt('QX2')+cnt('QX3'):4}{t2:5}{OCT_FIN[p]+f:6}{pu:5}")
for lv in ("R1","R2","R3","R4"):
    g=[p for p in NIVEL if NIVEL[p]==lv]
    print(f"  {lv}: nov medio {sum(len(dias_de.get(p,{})) for p in g)/len(g):.1f}"
          f"   2 meses medio {sum(tot2[p] for p in g)/len(g):.1f}"
          f"   rango 2m {min(tot2[p] for p in g)}-{max(tot2[p] for p in g)}")
print("\nMax puentes de 3:", max(OCT_PU.get(p,0)+(1 if PUENTE9 & set(dias_de.get(p,{})) else 0) for p in NIVEL))

# ---------- calendario ----------
print("\n" + "="*96)
for d in DIAS:
    c = cua[d]
    marca = " *PUENTE*" if d in PUENTE9 else (" *finde*" if es_finde(d) else "")
    print(f"{d:2d} {NOM[dow(d)]}  TX:{c['TX']:10} UCQ:{c['UCQ']:10} MAY:{c['MAYOR']:10} "
          f"QX:{c.get('QX2','—'):10} {c.get('QX3','—'):10}{marca}")
import json
json.dump({str(d):cua[d] for d in DIAS}, open('cuadrante_nov.json','w'), ensure_ascii=False, indent=1)
