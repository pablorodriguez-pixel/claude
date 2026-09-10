from ortools.sat.python import cp_model
import json, sys

R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ALL=R1+R2+R3+R4; ROT=["Tony","Patricia","Maria","Carlota"]
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
# localizadas acumuladas desde junio (total, findes vie+sab+dom)
BASE={"Isabel":38,"Almudena":36,"Carlota":34,"Sandra":33,"AnaG":32,"Maria":23}
DAYS=list(range(3,31)); PUENTE=[7,8,9]; NO_PUENTE=["Almudena","AnaG"]
WKND={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]   # dias vie/sab/dom (el 9 es lunes festivo)
VD=[(13,15),(20,22),(27,29)]; SF=[(7,9)]
DAY2_NONTX=["Tania","Fabian","Fatima","Miriam"]
TXCAP=9

m=cp_model.CpModel(); ROLES=["UCQ","MAY","QX"]; CAP={"UCQ":1,"MAY":1,"QX":2}
tx={(p,d):m.NewBoolVar(f"tx_{p}_{d}") for p in R4 for d in DAYS}
x={(p,d,r):m.NewBoolVar(f"x_{p}_{d}_{r}") for p in ALL for d in DAYS for r in ROLES}

# ---- trasplante ----
for d in DAYS: m.Add(sum(tx[p,d] for p in R4)==1)
for p in R4:
    for d in DAYS:
        if d in BLOCK[p] or (d in PUENTE and p in NO_PUENTE): m.Add(tx[p,d]==0)
    m.Add(tx[p,3]==0) if p=="Almudena" else None          # su tanda de octubre cerro el dia 2
    m.Add(sum(tx[p,d] for d in DAYS)<=TXCAP)
    # tandas: nada de dias sueltos, y como maximo 4 seguidos
    for d in DAYS:
        prv=[tx[p,d-1]] if d-1 in DAYS else []
        nxt=[tx[p,d+1]] if d+1 in DAYS else []
        if d!=30 and (prv or nxt): m.Add(sum(prv+nxt)>=1).OnlyEnforceIf(tx[p,d])
    for d in DAYS:
        w=[tx[p,k] for k in range(d,d+5) if k in DAYS]
        if len(w)==5: m.Add(sum(w)<=4)
# tandas de finde enteras, y ninguna para Carlota ni Isabel
for ds in WKND.values():
    for p in R4:
        for k in ds[1:]: m.Add(tx[p,ds[0]]==tx[p,k])
    for p in ("Carlota","Isabel"): m.Add(tx[p,ds[0]]==0)
# una sola tanda de finde de trasplante por R4
for p in R4: m.Add(sum(tx[p,ds[0]] for ds in WKND.values())<=1)

def elig(p,d,r):
    if d in BLOCK[p]: return False
    if r=="UCQ" and not (p in ROT or LEV[p]=="R2"): return False
    if r=="MAY" and LEV[p] not in ("R3","R4"): return False
    if r=="QX" and d!=6 and LEV[p] not in ("R1","R2"): return False
    if d==30 and LEV[p]=="R4": return False
    if d==6 and LEV[p] in ("R1","R2"): return False
    if d==7 and LEV[p]=="R1": return False
    if d in PUENTE and p in NO_PUENTE: return False
    if d==3 and p in DAY2_NONTX: return False
    if d==8 and LEV[p] in ("R3","R4") and p!="Tony": return False
    return True
for p in ALL:
    for d in DAYS:
        for r in ROLES:
            if not elig(p,d,r): m.Add(x[p,d,r]==0)
for d in DAYS:
    for r in ROLES: m.Add(sum(x[p,d,r] for p in ALL)==CAP[r])

n={}
for p in ALL:
    for d in DAYS:
        v=m.NewBoolVar(f"n_{p}_{d}"); m.Add(v==sum(x[p,d,r] for r in ROLES)); n[p,d]=v
        if p in R4: m.Add(v+tx[p,d]<=1)                   # no TX y puesto el mismo dia
# descanso + la TX nunca es vispera de guardia
for p in ALL:
    for d in DAYS:
        if d+1 in DAYS:
            m.Add(n[p,d]+n[p,d+1]<=1)
            if p in R4: m.Add(n[p,d+1]==0).OnlyEnforceIf(tx[p,d])
m.Add(n["Almudena",3]==0)                                 # TX el 2 -> vispera del 3
for a,b in VD+SF:
    for p in ALL:
        for r in ROLES: m.Add(x[p,a,r]==x[p,b,r])
FIX={6:{"UCQ":"Tony","MAY":"Fabian","QX":["Almudena","AnaG"]},8:{"MAY":"Tony"}}
for d,sp in FIX.items():
    for r,who in sp.items():
        for w in ([who] if r!="QX" else who): m.Add(x[w,d,r]==1)
m.Add(sum(x[p,8,"QX"] for p in R1)==2); m.Add(sum(x[p,8,"UCQ"] for p in R2)==1)

load,fin={},{}
for p in ALL:
    L=m.NewIntVar(0,28,f"L_{p}"); m.Add(L==sum(n[p,d] for d in DAYS)); load[p]=L
    fs=[]
    for w,ds in WKND.items():
        b=m.NewBoolVar(f"f_{p}_{w}"); m.AddMaxEquality(b,[n[p,d] for d in ds]); fs.append(b)
    F=m.NewIntVar(0,4,f"F_{p}"); m.Add(F==sum(fs)); fin[p]=F
for p in R1: m.Add(load[p]<=3); m.Add(fin[p]<=1)
for p in R2: m.Add(load[p]<=6); m.Add(fin[p]<=3)
for p in R3: m.Add(load[p]==6); m.Add(fin[p]<=2)
for p in R4: m.Add(load[p]<=6); m.Add(fin[p]<=1)
# Sandra y Maria: su unico finde es la tanda de trasplante
for p in ("Sandra","Maria"): m.Add(fin[p]==0)

# equidad de localizadas acumuladas: acercar cada R4 a la media (37)
dev=[]
for p in R4:
    c=m.NewIntVar(0,60,f"c_{p}"); m.Add(c==BASE[p]+sum(tx[p,d] for d in DAYS))
    m.Add(c<=39)          # nadie por encima de 39 localizadas acumuladas
    a=m.NewIntVar(0,60,f"a_{p}"); m.AddAbsEquality(a,c-37); dev.append(a)
sanda=sum(tx["Sandra",d] for d in DAYS)   # Sandra ya carga el finde del puente
mx2=m.NewIntVar(0,6,"mx2"); mn2=m.NewIntVar(0,6,"mn2")
for p in R2: m.Add(mx2>=load[p]); m.Add(mn2<=load[p])
mx1=m.NewIntVar(0,3,"mx1"); mn1=m.NewIntVar(0,3,"mn1")
for p in R1: m.Add(mx1>=load[p]); m.Add(mn1<=load[p])
rot=m.NewIntVar(0,28,"rot"); m.Add(rot==sum(x[p,d,"UCQ"] for p in ROT for d in DAYS))
m.Minimize(30*sum(dev) + 20*(mx2-mn2) + 20*(mx1-mn1) - 4*rot + 8*sanda)

s=cp_model.CpSolver(); s.parameters.max_time_in_seconds=300; s.parameters.num_workers=8
st=s.Solve(m); print("status:",s.StatusName(st))
if st not in (cp_model.OPTIMAL,cp_model.FEASIBLE): sys.exit(1)
sched={}
for d in DAYS:
    row={"TX":[p for p in R4 if s.Value(tx[p,d])][0]}
    for r in ROLES:
        w=[p for p in ALL if s.Value(x[p,d,r])]; row[r]=w[0] if r!="QX" else w
    sched[d]=row
json.dump({"sched":sched},open("sol.json","w"),indent=1)
DOW={d:["dom","lun","mar","mie","jue","vie","sab"][(d-1)%7] for d in range(1,31)}
for d in DAYS:
    r=sched[d]; print(f"{d:2d} {DOW[d]}  TX {r['TX']:9s} UCQ {r['UCQ']:9s} MAY {r['MAY']:9s} QX {r['QX'][0]:9s} {r['QX'][1]:9s}")
print("\n            base  nov   ->   findes base/nov/despues")
for p in R4:
    t=sum(1 for d in DAYS if sched[d]["TX"]==p)
    ft=sum(1 for d in FINDE_D if sched[d]["TX"]==p)
    print(f"{p:10s} {BASE[p]:5d} {t:4d}  -> {BASE[p]+t:3d}   findes TX +{ft}  |  findes noTX {s.Value(fin[p])}  noTX {s.Value(load[p])}")
print()
for g,nm in ((R1,"R1"),(R2,"R2"),(R3,"R3")):
    print(nm, {p:(s.Value(load[p]),s.Value(fin[p])) for p in g})
