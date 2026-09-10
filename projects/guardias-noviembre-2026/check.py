import json
S={int(k):v for k,v in json.load(open('sol.json'))['sched'].items()}
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ROT=["Tony","Patricia","Maria","Carlota"]; R4NR=["Isabel","Almudena","AnaG","Sandra"]
R2NR=[p for p in R2 if p not in ROT]; R3NR=[p for p in R3 if p not in ROT]
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
OCTP={"Aitor":1,"Arturo":0,"Cristina":1,"David":0,"Fatima":1,"Mercedes":1,"Rosario":1,"Miriam":1,
"Patricia":1,"Ana":1,"Antonio":1,"Asis":0,"Emilio":1,"Eva":1,"Tania":1,"Marc":0,"Candela":0,
"Fabian":1,"Patri":0,"Tony":0,"Carlota":1,"Isabel":1,"Maria":0,"Almudena":2,"AnaG":2,"Sandra":1}
BASE={"Isabel":38,"Almudena":36,"Carlota":34,"Sandra":33,"AnaG":32,"Maria":23}
W={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]
D=range(3,31); err=[]
nontx=lambda p,d: S[d]["UCQ"]==p or S[d]["MAY"]==p or p in S[d]["QX"]
anyw =lambda p,d: nontx(p,d) or S[d]["TX"]==p

for d in D:
    pe=[S[d]["TX"],S[d]["UCQ"],S[d]["MAY"]]+S[d]["QX"]
    if len(pe)!=5 or len(set(pe))!=5: err.append(f"d{d}: puestos mal {pe}")
    if LEV[S[d]["TX"]]!="R4": err.append(f"d{d}: TX no es R4")
    if not (S[d]["UCQ"] in ROT or LEV[S[d]["UCQ"]]=="R2"): err.append(f"d{d}: UCQ {S[d]['UCQ']}")
    if LEV[S[d]["MAY"]] not in ("R3","R4"): err.append(f"d{d}: mayor {S[d]['MAY']}")
    for q in S[d]["QX"]:
        if LEV[q] not in ("R1","R2","R4"): err.append(f"d{d}: quirofano {q}")
# LOS ROTANTES SOLO HACEN UCQ (Tony incluido el domingo 8)
for p in ROT:
    fuera=[d for d in D if S[d]["MAY"]==p or p in S[d]["QX"]]
    if fuera: err.append(f"{p} rotante: sale de la UCQ los dias {fuera}")
# bloqueos
for p in LEV:
    for d in D:
        if d in BLOCK[p] and anyw(p,d): err.append(f"{p}: trabaja el {d} bloqueado")
# descanso y vispera
for p in LEV:
    for d in D:
        if d+1 in D:
            if nontx(p,d) and nontx(p,d+1): err.append(f"{p}: {d}+{d+1} seguidos")
            if S[d]["TX"]==p and nontx(p,d+1): err.append(f"{p}: TX el {d}, vispera del {d+1}")
for p in ["Tania","Fabian","Fatima","Miriam"]:
    if nontx(p,3): err.append(f"{p}: guardia el 2 y el 3")
if nontx("Almudena",3): err.append("Almudena: TX el 2, vispera del 3")
# emparejamientos
for a,b in [(13,15),(20,22),(27,29),(7,9)]:
    if S[a]!=S[b]: err.append(f"equipos {a} y {b} distintos")
# fiesta
for p in [S[6]["TX"],S[6]["UCQ"],S[6]["MAY"]]+S[6]["QX"]:
    if LEV[p] in ("R1","R2"): err.append(f"viernes 6: {p} es {LEV[p]}")
for p in [S[7]["TX"],S[7]["UCQ"],S[7]["MAY"]]+S[7]["QX"]:
    if LEV[p]=="R1": err.append(f"sabado 7: {p} es R1")
# domingo 8 a resis pequenos (UCQ y quirofano)
if LEV[S[8]["UCQ"]]!="R2": err.append("domingo 8: la UCQ no la lleva un R2")
for q in S[8]["QX"]:
    if LEV[q]!="R1": err.append(f"domingo 8: {q} en quirofano no es R1")
# puentes: 2 de 3, con Ana G. exenta por peticion expresa
for p in LEV:
    n=OCTP[p]+(1 if any(anyw(p,d) for d in (7,8,9)) else 0)
    if n>2 and p!="AnaG": err.append(f"{p}: {n}/3 puentes")
# curso R4 del dia 30
for p in [S[30]["UCQ"],S[30]["MAY"]]+S[30]["QX"]:
    if LEV[p]=="R4": err.append(f"dia 30: {p} R4 presencial")
# EL BLOQUE VIERNES-DOMINGO, UNA SOLA PERSONA (la tanda puede venir de antes o seguir despues)
for w,ds in W.items():
    if len({S[d]["TX"] for d in ds})!=1: err.append(f"{w} {ds}: el bloque no es de una sola persona")
# Isabel con 2 localizadas, Patricia con 5 guardias, racha maxima de 5 dias
if sum(1 for d in D if S[d]["TX"]=="Isabel")!=2: err.append("Isabel: no tiene 2 localizadas")
if sum(1 for d in D if S[d]["UCQ"]=="Patricia")!=6: err.append("Patricia R2: no tiene 6 de UCQ")
if sum(1 for d in D if nontx("Patri",d))!=5: err.append("Patri R3: no tiene 5 guardias")
for p in R4:
    ds=[d for d in D if S[d]["TX"]==p]; run=1
    for i in range(1,len(ds)):
        run = run+1 if ds[i]==ds[i-1]+1 else 1
        if run>5: err.append(f"{p}: racha de TX de {run} dias hasta el {ds[i]}")
# tandas sin dias sueltos
for p in R4:
    ds=[d for d in D if S[d]["TX"]==p]
    for dd in ds:
        if dd!=30 and dd-1 not in ds and dd+1 not in ds: err.append(f"{p}: TX suelta el {dd}")
# tandas de finde: ninguna para Carlota ni Isabel; una como maximo cada R4
for p in R4:
    k=sum(1 for ds in W.values() if S[ds[0]]["TX"]==p)
    if k>1: err.append(f"{p}: {k} tandas de finde de TX")
for p in ("Carlota","Isabel"):
    k=[w for w,ds in W.items() if S[ds[0]]["TX"]==p]
    if k: err.append(f"{p}: tiene tanda de finde {k}")
# topes de carga
for p in LEV:
    L=sum(1 for d in D if nontx(p,d))
    F=sum(1 for ds in W.values() if any(nontx(p,d) for d in ds))
    if L>6: err.append(f"{p}: {L} guardias presenciales (>6)")
    if LEV[p]=="R1" and L!=3: err.append(f"{p} R1: {L} guardias")
    if LEV[p]=="R1" and F>1: err.append(f"{p} R1: {F} findes")
    if p in R3NR and not 5<=L<=6: err.append(f"{p} R3: {L} guardias")
    if p in R4NR and L!=5: err.append(f"{p} R4 no rotante: {L} guardias (deben ser 5)")
    if LEV[p]=="R4" and F>1: err.append(f"{p} R4: {F} findes de qx/ucq (>1)")
# composicion de los R2 que rellenan huecos de UCQ: como maximo 2 de UCQ y mas QX que UCQ
for p in R2NR:
    u=sum(1 for d in D if S[d]["UCQ"]==p); q=sum(1 for d in D if p in S[d]["QX"])
    if u>2: err.append(f"{p} R2: {u} dias de UCQ (>2)")
    if q<u:  err.append(f"{p} R2: {q} de quirofano y {u} de UCQ (mas UCQ que quirofano)")
print("R2 que rellenan UCQ:", {p:f"{sum(1 for d in D if p in S[d]['QX'])}QX+{sum(1 for d in D if S[d]['UCQ']==p)}UCQ"
      for p in R2NR if any(S[d]["UCQ"]==p for d in D)})
ucq={p:sum(1 for d in D if S[d]["UCQ"]==p) for p in ROT}
print("rotantes UCQ:", ucq, "| dias a R2:", sum(1 for d in D if S[d]["UCQ"] not in ROT))
print("R2 no rotantes:", {p:sum(1 for d in D if nontx(p,d)) for p in R2NR})
runs=[]
for d in D:
    p=S[d]["TX"]
    if runs and runs[-1][0]==p and runs[-1][2]==d-1: runs[-1][2]=d
    else: runs.append([p,d,d])
DOW={d:["dom","lun","mar","mié","jue","vie","sáb"][(d-1)%7] for d in range(1,31)}
print("\ntandas TX:")
for p,a,b in runs:
    wk=[w for w,ds in W.items() if a<=ds[0]<=b]
    print(f"  {p:9s} {a:2d} {DOW[a]} -> {b:2d} {DOW[b]} ({b-a+1}d)" + (f"  incluye {wk[0]}" if wk else ""))
print("\nlocalizadas acumuladas / findes de localizada:")
for p in R4:
    t=sum(1 for d in D if S[d]["TX"]==p); ft=sum(1 for d in FINDE_D if S[d]["TX"]==p)
    bf={"Isabel":16,"Almudena":12,"Carlota":18,"Sandra":16,"AnaG":9,"Maria":11}[p]
    print(f"  {p:9s} {BASE[p]}+{t} = {BASE[p]+t:3d}   findes {bf}+{ft} = {bf+ft}")
print("\nERRORES:", len(err))
for e in err: print(" -", e)
