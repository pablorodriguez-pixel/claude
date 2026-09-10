from ortools.sat.python import cp_model
import json, sys
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ALL=R1+R2+R3+R4
ROT=["Tony","Patricia","Maria","Carlota"]      # rotantes de UCQ: SOLO UCQ
R4ROT=["Maria","Carlota"]; R4NR=["Isabel","Almudena","AnaG","Sandra"]
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
NO_PUENTE=["Almudena"]            # Ana G. queda exenta de esta norma por peticion expresa
WKND={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]
VD=[(13,15),(20,22),(27,29)]; SF=[(7,9)]
DAY2=["Tania","Fabian","Fatima","Miriam"]
m=cp_model.CpModel(); ROLES=["UCQ","MAY","QX"]; CAP={"UCQ":1,"MAY":1,"QX":2}
tx={(p,d):m.NewBoolVar("") for p in R4 for d in DAYS}
x={(p,d,r):m.NewBoolVar("") for p in ALL for d in DAYS for r in ROLES}

# ---------- trasplante ----------
for d in DAYS: m.Add(sum(tx[p,d] for p in R4)==1)
for p in R4:
    for d in DAYS:
        if d in BLOCK[p] or (d in PUENTE and p in NO_PUENTE): m.Add(tx[p,d]==0)
    if p=="Almudena": m.Add(tx[p,3]==0)
    for d in DAYS:                      # tandas: ningun dia suelto, racha maxima 6
        ad=[tx[p,k] for k in (d-1,d+1) if k in DAYS]
        if d!=30 and ad: m.Add(sum(ad)>=1).OnlyEnforceIf(tx[p,d])
        w=[tx[p,k] for k in range(d,d+6) if k in DAYS]
        if len(w)==6: m.Add(sum(w)<=5)
# el bloque viernes-domingo (viernes-lunes en el puente) lo hace UNA SOLA persona.
# La tanda puede venir del jueves o seguir despues: no va cerrada.
for ds in WKND.values():
    for p in R4:
        for k in ds[1:]: m.Add(tx[p,ds[0]]==tx[p,k])
# Ana G. coge la tanda del puente; Carlota, Isabel y Sandra, ninguna tanda de finde
m.Add(tx["AnaG",6]==1)                  # Ana G. coge el puente (excepcion a los 2/3)
m.Add(tx["Sandra",13]==1)               # el 13-15 vuelve a Sandra
for p in ("Carlota","Isabel"):
    for ds in WKND.values(): m.Add(tx[p,ds[0]]==0)
for p in R4: m.Add(sum(tx[p,ds[0]] for ds in WKND.values())<=1)
m.Add(sum(tx["Isabel",d] for d in DAYS)==2)
m.Add(sum(tx["Maria",d] for d in DAYS)<=9)
for p in R4:
    if p!="Maria": m.Add(sum(tx[p,d] for d in DAYS)<=8)

# ---------- puestos ----------
def elig(p,d,r):
    if d in BLOCK[p]: return False
    if d==30 and LEV[p]=="R4": return False
    if d==6 and LEV[p] in ("R1","R2"): return False
    if d==7 and LEV[p]=="R1": return False
    if d in PUENTE and p in NO_PUENTE: return False
    if d==3 and p in DAY2: return False
    if p in ROT: return r=="UCQ"                     # los rotantes SOLO hacen UCQ
    if r=="UCQ": return LEV[p]=="R2"
    if r=="MAY": return LEV[p] in ("R3","R4")
    if r=="QX":
        if d==8: return LEV[p]=="R1"                 # domingo 8: quirofano para R1
        return LEV[p] in ("R1","R2","R4")            # las R4 pueden sumar en quirofano
    return False
for p in ALL:
    for d in DAYS:
        for r in ROLES:
            if not elig(p,d,r): m.Add(x[p,d,r]==0)
for d in DAYS:
    for r in ROLES: m.Add(sum(x[p,d,r] for p in ALL)==CAP[r])
m.Add(sum(x[p,8,"UCQ"] for p in R2)==1)              # domingo 8: UCQ para un R2

n={}
for p in ALL:
    for d in DAYS:
        v=m.NewBoolVar(""); m.Add(v==sum(x[p,d,r] for r in ROLES)); n[p,d]=v
        if p in R4: m.Add(v+tx[p,d]<=1)
for p in ALL:
    for d in DAYS:
        if d+1 in DAYS:
            m.Add(n[p,d]+n[p,d+1]<=1)
            if p in R4: m.Add(n[p,d+1]==0).OnlyEnforceIf(tx[p,d])
m.Add(n["Almudena",3]==0)
PROPIOS={(7,9),(13,15),(20,22),(27,29)}
dobs=[]
for p in ALL:
    for d in DAYS:
        if d+2 in DAYS and (d,d+2) not in PROPIOS:
            b=m.NewBoolVar(f"db_{p}_{d}")
            m.Add(n[p,d] + n[p,d+2] - 1 <= b)
            dobs.append(b)
for p in ALL:
    for d in DAYS:
        w=[n[p,k] for k in range(d,d+7) if k in DAYS]
        if len(w)==7: m.Add(sum(w)<=2)
# la ventana cruza la frontera de mes: dia 1 y dia 2 del cuadrante de octubre
for p in ("Patricia","AnaG","Mercedes","Aitor"):          # trabajaron el dia 1
    m.Add(sum(n[p,d] for d in (3,4,5,6,7))<=1)
for p in ("Tania","Fabian","Fatima","Miriam"):            # trabajaron el dia 2
    m.Add(sum(n[p,d] for d in (4,5,6,7,8))<=1)
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
for p in R1:   m.Add(load[p]==3); m.Add(fin[p]<=1)
for p in R3NR: m.Add(load[p]==5)   # Candela cede su sexta guardia a un R2
for p in ROT: m.Add(ucq[p]==6)                      # los cuatro rotantes, 6 guardias
m.Add(load["Patri"]==5)                            # Patri R3: 5 guardias
for p in R4NR: m.Add(load[p]==5)                     # TOPE: 5 guardias, trasplante aparte
for p in R4:   m.Add(fin[p]<=1)                      # 1 finde de qx/ucq como maximo

for p in R2NR:
    m.Add(fin[p]<=2)
    m.Add(ucq[p]<=2)                                  # como maximo 2 dias de UCQ
    m.Add(sum(x[p,d,"QX"] for d in DAYS) >= ucq[p])   # siempre mas quirofano que UCQ
m.Add(fin["Tony"]<=2); m.Add(fin["Patricia"]<=2)
for p in R3NR: m.Add(fin[p]<=2)

maxr2=m.NewIntVar(0,7,"maxr2")
for q in R2NR: m.Add(maxr2>=load[q])
dev=[]; mxc=m.NewIntVar(0,60,"mxc")
for p in R4:
    c=m.NewIntVar(0,60,""); m.Add(c==BASE[p]+sum(tx[p,d] for d in DAYS))
    m.Add(mxc>=c)
    a=m.NewIntVar(0,60,""); m.AddAbsEquality(a,c-37); dev.append(a)
    e=m.NewIntVar(0,60,""); m.AddMaxEquality(e,[c-38,m.NewConstant(0)]); dev.append(e); dev.append(e)
dobles=[]
for d in DAYS:
    if d==8: continue
    b=m.NewBoolVar(f"dob_{d}")
    m.Add(sum(x[p,d,"QX"] for p in R1) >= 2).OnlyEnforceIf(b)
    m.Add(sum(x[p,d,"QX"] for p in R1) <= 1).OnlyEnforceIf(b.Not())
    dobles.append(b)
mx1=m.NewIntVar(0,3,"mx1b"); mn1=m.NewIntVar(0,3,"mn1b")
for p in R1: m.Add(mx1>=load[p]); m.Add(mn1<=load[p])
mx2=m.NewIntVar(0,6,"mx2"); mn2=m.NewIntVar(0,6,"mn2")
for p in R2NR: m.Add(mx2>=load[p]); m.Add(mn2<=load[p])
mx3=m.NewIntVar(0,6,"mx3"); mn3=m.NewIntVar(0,6,"mn3")
for p in R3NR: m.Add(mx3>=load[p]); m.Add(mn3<=load[p])
carga3=sum(tx[p,d] for p in ("Almudena","Carlota") for d in DAYS)

m.Minimize(400*sum(dobs) + 200*mxc + 10*sum(dev) + 6*carga3 - 80*maxr2 + 30*sum(dobles) + 30*(mx1-mn1) + 60*(mx2-mn2) + 30*(mx3-mn3))
s=cp_model.CpSolver(); s.parameters.max_time_in_seconds=240; s.parameters.num_workers=8
st=s.Solve(m); print("status:",s.StatusName(st));print("dobletes:",sum(s.Value(b) for b in dobs))
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
print("\nrotantes UCQ:", {p:s.Value(ucq[p]) for p in ROT}, "| dias de UCQ a R2:", sum(s.Value(ucq[p]) for p in R2NR))
print("\n           jun-oct  nov  ->  acum | findesTX | presencial findes")
for p in R4:
    t=sum(1 for d in DAYS if sched[d]["TX"]==p); ft=sum(1 for w in WKND.values() if sched[w[0]]["TX"]==p)
    print(f"{p:10s} {BASE[p]:6d} {t:4d}  -> {BASE[p]+t:4d} |    {ft}     | {s.Value(load[p])}   {s.Value(fin[p])}")
print()
for g,nm in ((R1,"R1"),(R2,"R2"),(R3,"R3")):
    print(nm, {p:(s.Value(load[p]),s.Value(fin[p])) for p in g})
