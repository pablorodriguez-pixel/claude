from ortools.sat.python import cp_model
import json, sys, os
MODE=os.environ.get("MODE","base")
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ALL=R1+R2+R3+R4
ROT=["Tony","Patricia","Maria","Carlota"]
R4NR=["Isabel","Almudena","AnaG","Sandra"]
R2NR=[p for p in R2 if p not in ROT]; R3NR=[p for p in R3 if p not in ROT]
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
BASE={"Isabel":38,"Almudena":36,"Carlota":34,"Sandra":33,"AnaG":32,"Maria":23}
DAYS=list(range(3,31)); PUENTE=[7,8,9]
NO_PUENTE=[]                       # Almudena y Ana G. exentas por peticion expresa
WKND={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
VD=[(13,15),(20,22),(27,29)]; SF=[(7,9)]
DAY2=["Tania","Fabian","Fatima","Miriam"]
MAN={3:("Carlota","Tony","Isabel","Aitor","Eva"),4:("Carlota","Ana","Patri","Mercedes","Antonio"),
5:("Carlota","Patricia","Candela","Fatima","Tania"),6:("AnaG","Carlota","Fabian","Almudena","Sandra"),
7:("AnaG","Tony","Patri","Asis","Marc"),8:("AnaG","Carlota","Fabian","Sandra","Almudena"),
9:("AnaG","Tony","Patri","Asis","Marc"),10:("Isabel","Maria","Almudena","Miriam","Emilio"),
11:("Maria","Patricia","AnaG","Cristina","Antonio"),12:("Maria","Carlota","Sandra","Rosario","Tania"),
13:("Sandra","Ana","Patri","David","Eva"),14:("Sandra","Patricia","Candela","Aitor","Mercedes"),
15:("Sandra","Ana","Patri","David","Eva"),16:("Sandra","Maria","AnaG","Marc","Miriam"),
17:("Isabel","Carlota","Fabian","Antonio","Tania"),18:("AnaG","Maria","Sandra","Emilio","Ana"),
19:("Maria","Patricia","Isabel","Asis","Marc"),20:("Maria","Tony","AnaG","Arturo","Cristina"),
21:("Maria","Eva","Candela","Emilio","Fatima"),22:("Maria","Tony","AnaG","Arturo","Cristina"),
23:("Sandra","Carlota","Fabian","Almudena","Isabel"),24:("Sandra","Maria","Candela","Eva","Antonio"),
25:("Isabel","Tony","AnaG","Emilio","Marc"),26:("AnaG","Carlota","Almudena","David","Sandra"),
27:("Almudena","Maria","Isabel","Rosario","Asis"),28:("Almudena","Emilio","Fabian","Antonio","Tania"),
29:("Almudena","Maria","Isabel","Rosario","Asis"),30:("Maria","Patricia","Candela","Arturo","Ana")}

SUELTAS=os.environ.get("SUELTAS")=="1"
m=cp_model.CpModel(); ROLES=["UCQ","MAY","QX"]; CAP={"UCQ":1,"MAY":1,"QX":2}
tx={(p,d):m.NewBoolVar("") for p in R4 for d in DAYS}
x={(p,d,r):m.NewBoolVar("") for p in ALL for d in DAYS for r in ROLES}

for d in DAYS: m.Add(sum(tx[p,d] for p in R4)==1)
for p in R4:
    for d in DAYS:
        if d in BLOCK[p] or (d in PUENTE and p in NO_PUENTE): m.Add(tx[p,d]==0)
    if p=="Almudena": m.Add(tx[p,3]==0)
    for d in DAYS:
        ad=[tx[p,k] for k in (d-1,d+1) if k in DAYS]
        if d!=30 and ad and not SUELTAS: m.Add(sum(ad)>=1).OnlyEnforceIf(tx[p,d])
        w=[tx[p,k] for k in range(d,d+6) if k in DAYS]
        if len(w)==6: m.Add(sum(w)<=5)
for ds in WKND.values():
    for p in R4:
        for k in ds[1:]: m.Add(tx[p,ds[0]]==tx[p,k])
for p in R4: m.Add(sum(tx[p,ds[0]] for ds in WKND.values())<=1)
if MODE!="carlota_tanda":
    for p in ("Carlota","Isabel"):
        for ds in WKND.values(): m.Add(tx[p,ds[0]]==0)

def elig(p,d,r):
    if d in BLOCK[p]: return False
    if d==30 and LEV[p]=="R4": return False
    if d==6 and LEV[p] in ("R1","R2"): return False
    if d==7 and LEV[p]=="R1": return False
    if d in PUENTE and p in NO_PUENTE: return False
    if d==3 and p in DAY2: return False
    if p in ROT:
        if MODE=="rot_qx" and p=="Carlota" and r=="QX" and d in (6,8): return True
        return r=="UCQ"
    if r=="UCQ": return LEV[p]=="R2"
    if r=="MAY": return LEV[p] in ("R3","R4")
    if r=="QX": return LEV[p] in ("R1","R2","R4")
    return False
for p in ALL:
    for d in DAYS:
        for r in ROLES:
            if not elig(p,d,r): m.Add(x[p,d,r]==0)
for d in DAYS:
    for r in ROLES: m.Add(sum(x[p,d,r] for p in ALL)==CAP[r])


n={}
for p in ALL:
    for d in DAYS:
        v=m.NewBoolVar(""); m.Add(v==sum(x[p,d,r] for r in ROLES)); n[p,d]=v
        if p in R4: m.Add(v+tx[p,d]<=1)
# el 6 y el 8: como mucho una persona distinta. El viernes lo cubre un mayor suelto
# (R3/R4, por la libranza de la fiesta) y el domingo lo cubre Tania.
a68={}
for p in ALL:
    for d in (6,8):
        v=m.NewBoolVar("")
        if p in R4: m.Add(v==n[p,d]+tx[p,d])
        else: m.Add(v==n[p,d])
        a68[p,d]=v
dif68=[]
for p in ALL:
    b=m.NewBoolVar(f"dif68_{p}")
    m.Add(a68[p,6]-a68[p,8]<=b); m.Add(a68[p,8]-a68[p,6]<=b); dif68.append(b)
m.Add(sum(dif68)<=2)
m.Add(x["Tania",8,"QX"]==1)          # Tania cubre el domingo 8
m.Add(sum(n[p,6] for p in R1+R2)==0) # el viernes 6, ningun residente pequeno
for p in ALL:
    for d in DAYS:
        if d+1 in DAYS:
            m.Add(n[p,d]+n[p,d+1]<=1)
            if p in R4: m.Add(n[p,d+1]==0).OnlyEnforceIf(tx[p,d])
m.Add(n["Almudena",3]==0)
PROPIOS={(6,8),(7,9),(13,15),(20,22),(27,29)}
dobs=[]
for p in ALL:
    for d in DAYS:
        if d+2 in DAYS and (d,d+2) not in PROPIOS:
            b=m.NewBoolVar(f"db_{p}_{d}")
            m.Add(n[p,d] + n[p,d+2] - 1 <= b); dobs.append(b)
# sin tripletes: maximo 2 guardias en cualquier ventana de 5 dias
for p in ALL:
    for d in DAYS:
        w=[n[p,k] for k in range(d,d+5) if k in DAYS]
        if len(w)==5: m.Add(sum(w)<=2)
for p in ("Patricia","AnaG","Mercedes","Aitor"): m.Add(sum(n[p,d] for d in (3,4,5))<=1)
for p in ("Tania","Fabian","Fatima","Miriam"):   m.Add(sum(n[p,d] for d in (4,5,6))<=1)
for a,b in VD+SF:
    for p in ALL:
        for r in ROLES: m.Add(x[p,a,r]==x[p,b,r])

load,fin,ucq={},{},{}
for p in ALL:
    L=m.NewIntVar(0,28,""); m.Add(L==sum(n[p,d] for d in DAYS)); load[p]=L
    U=m.NewIntVar(0,28,""); m.Add(U==sum(x[p,d,"UCQ"] for d in DAYS)); ucq[p]=U
    fs=[]
    for w,ds in WKND.items():
        b=m.NewBoolVar(""); m.AddMaxEquality(b,[n[p,d] for d in ds]); fs.append(b)
    F=m.NewIntVar(0,4,""); m.Add(F==sum(fs)); fin[p]=F
for p in ALL:  m.Add(load[p]<=6)
for p in R1:
    m.Add(load[p]==3)
    m.Add(fin[p]<=1)
    if os.environ.get("R1FIN")=="1": m.Add(fin[p]==1)
for p in R3NR: m.Add(load[p]>=5); m.Add(load[p]<=6)
for p in ROT:  m.Add(ucq[p]==6)
m.Add(load["Patri"]==5)
for p in R4NR: m.Add(load[p]==5)
for p in R4NR: m.Add(fin[p]<=1)
# punto 4: Carlota 6 guardias y 2 findes, con la UCQ del 21
m.Add(x["Carlota",21,"UCQ"]==1); m.Add(load["Carlota"]==6); m.Add(fin["Carlota"]==2)
# punto 4: Eva se queda en 5 guardias y 1 finde
m.Add(load["Eva"]==5); m.Add(fin["Eva"]==1)
TGT=os.environ.get("TGT")
if TGT: m.Add(ucq[TGT]>=1)
if os.environ.get("ANA0")=="1": m.Add(ucq["Ana"]==0)
for p in R2NR:
    m.Add(load[p]>=4)
    if os.environ.get("R2FIN")=="1": m.Add(fin[p]>=1)
    m.Add(fin[p]<=2); m.Add(ucq[p]<=2)
    m.Add(sum(x[p,d,"QX"] for d in DAYS) >= ucq[p])
m.Add(fin["Tony"]<=2); m.Add(fin["Patricia"]<=2)
for p in R3NR: m.Add(fin[p]<=2)

m.Add(tx["Carlota",3]==1); m.Add(tx["Carlota",4]==1)   # Carlota mantiene su tanda del 3-4
# localizadas: como en tu calendario, salvo la del 5 que Carlota pierde por la norma de la vispera
for q,v in {"Carlota":2,"Isabel":3,"Almudena":3,"Sandra":6,"Maria":7,"AnaG":7}.items():
    m.Add(sum(tx[q,d] for d in DAYS)==v)

# objetivo: parecerse lo mas posible al calendario manual
BASE_S={int(k):v for k,v in json.load(open('sol_v19.json'))['sched'].items()}
MAN={d:(v["TX"],v["UCQ"],v["MAY"],v["QX"][0],v["QX"][1]) for d,v in BASE_S.items()}
same=[]; wsame=[]
for d,v in MAN.items():
    same.append(tx[v[0],d]); wsame.append(tx[v[0],d])
    for r,who in (("UCQ",v[1]),("MAY",v[2]),("QX",v[3]),("QX",v[4])):
        same.append(x[who,d,r]); wsame.append(x[who,d,r])
m.Maximize(100*sum(wsame) - 120*sum(dobs))
s=cp_model.CpSolver(); s.parameters.max_time_in_seconds=420; s.parameters.num_workers=8
st=s.Solve(m); print("MODE",MODE,"status:",s.StatusName(st))
if st not in (cp_model.OPTIMAL,cp_model.FEASIBLE): sys.exit(1)
print("coincidencias con tu calendario:",sum(s.Value(b) for b in same),"/140  | dobletes:",sum(s.Value(b) for b in dobs))
sched={}
for d in DAYS:
    row={"TX":[p for p in R4 if s.Value(tx[p,d])][0]}
    for r in ROLES:
        w=[p for p in ALL if s.Value(x[p,d,r])]; row[r]=w[0] if r!="QX" else w
    sched[d]=row
json.dump({"sched":sched},open(f"sol_{MODE}.json","w"),indent=1)
DOW={d:["dom","lun","mar","mie","jue","vie","sab"][(d-1)%7] for d in range(1,31)}
for d in DAYS:
    r=sched[d]; mk="" if [r["TX"],r["UCQ"],r["MAY"]]+sorted(r["QX"])==[MAN[d][0],MAN[d][1],MAN[d][2]]+sorted(MAN[d][3:]) else "  <-- cambia"
    print(f"{d:2d} {DOW[d]}  TX {r['TX']:9s} UCQ {r['UCQ']:9s} MAY {r['MAY']:9s} QX {r['QX'][0]:9s} {r['QX'][1]:9s}{mk}")
print("\nCarlota:",s.Value(load["Carlota"]),"guardias /",s.Value(fin["Carlota"]),"findes | Eva:",s.Value(load["Eva"]),"/",s.Value(fin["Eva"]))
for p in R4:
    t=sum(1 for d in DAYS if sched[d]["TX"]==p); ft=sum(1 for w in WKND.values() if sched[w[0]]["TX"]==p)
    print(f"{p:10s} loc {t}  findesTX {ft}  acum {BASE[p]+t}  presencial {s.Value(load[p])}/{s.Value(fin[p])}")
