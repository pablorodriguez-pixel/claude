from ortools.sat.python import cp_model
import json, sys
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ALL=R1+R2+R3+R4
ROT=["Tony","Patricia","Maria","Carlota"]        # rotando en UCQ: 6 guardias de UCQ cada uno
R4ROT=["Maria","Carlota"]; R4MAY=["Isabel","Almudena","AnaG","Sandra"]
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
BASE={"Isabel":38,"Almudena":36,"Carlota":34,"Sandra":33,"AnaG":32,"Maria":23}  # jun-oct
DAYS=list(range(3,31)); PUENTE=[7,8,9]; NO_PUENTE=["Almudena","AnaG"]
WKND={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]
VD=[(13,15),(20,22),(27,29)]; SF=[(7,9)]
DAY2=["Tania","Fabian","Fatima","Miriam"]
m=cp_model.CpModel(); ROLES=["UCQ","MAY","QX"]; CAP={"UCQ":1,"MAY":1,"QX":2}
tx={(p,d):m.NewBoolVar("") for p in R4 for d in DAYS}
x={(p,d,r):m.NewBoolVar("") for p in ALL for d in DAYS for r in ROLES}

# ---------- trasplante: tandas ----------
for d in DAYS: m.Add(sum(tx[p,d] for p in R4)==1)
for p in R4:
    for d in DAYS:
        if d in BLOCK[p] or (d in PUENTE and p in NO_PUENTE): m.Add(tx[p,d]==0)
    if p=="Almudena": m.Add(tx[p,3]==0)
    m.Add(sum(tx[p,d] for d in DAYS)<=6)
    for d in DAYS:
        ad=[tx[p,k] for k in (d-1,d+1) if k in DAYS]
        if d!=30 and ad: m.Add(sum(ad)>=1).OnlyEnforceIf(tx[p,d])
        w=[tx[p,k] for k in range(d,d+5) if k in DAYS]
        if len(w)==5: m.Add(sum(w)<=4)
for ds in WKND.values():
    for p in R4:
        for k in ds[1:]: m.Add(tx[p,ds[0]]==tx[p,k])
    for p in ("Carlota","Isabel"): m.Add(tx[p,ds[0]]==0)
for p in R4: m.Add(sum(tx[p,ds[0]] for ds in WKND.values())<=1)
# LA TANDA DE FINDE ES EXACTAMENTE VIERNES->DOMINGO (viernes->lunes en el puente):
# cerrada por los dos lados, no arranca el jueves ni se prolonga al dia siguiente
for ds in WKND.values():
    for p in R4:
        if ds[0]-1 in DAYS:  m.Add(tx[p,ds[0]-1] + tx[p,ds[0]]  <= 1)
        if ds[-1]+1 in DAYS: m.Add(tx[p,ds[-1]] + tx[p,ds[-1]+1] <= 1)

# ---------- elegibilidad por puesto (estructura de la rotacion) ----------
def elig(p,d,r):
    if d in BLOCK[p]: return False
    if d==30 and LEV[p]=="R4": return False          # curso R4
    if d==6 and LEV[p] in ("R1","R2"): return False  # fiesta
    if d==7 and LEV[p]=="R1": return False
    if d in PUENTE and p in NO_PUENTE: return False
    if d==3 and p in DAY2: return False
    if d==8 and LEV[p] in ("R3","R4") and r!="MAY": return False   # domingo 8: resis pequenos
    if r=="UCQ": return p in ROT or LEV[p]=="R2"
    if r=="MAY": return LEV[p] in ("R3","R4")
    if r=="QX":
        if d==6: return True                          # el 6 solo hay R3/R4
        return LEV[p] in ("R1","R2")
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
for p in ALL:
    for d in DAYS:
        if d+1 in DAYS:
            m.Add(n[p,d]+n[p,d+1]<=1)
            if p in R4: m.Add(n[p,d+1]==0).OnlyEnforceIf(tx[p,d])
m.Add(n["Almudena",3]==0)
for a,b in VD+SF:
    for p in ALL:
        for r in ROLES: m.Add(x[p,a,r]==x[p,b,r])
m.Add(sum(x[p,8,"QX"] for p in R1)==2); m.Add(sum(x[p,8,"UCQ"] for p in R2)==1)

load,fin,ucq={},{},{}
for p in ALL:
    L=m.NewIntVar(0,28,""); m.Add(L==sum(n[p,d] for d in DAYS)); load[p]=L
    U=m.NewIntVar(0,28,""); m.Add(U==sum(x[p,d,"UCQ"] for d in DAYS)); ucq[p]=U
    fs=[]
    for w,ds in WKND.items():
        b=m.NewBoolVar(""); m.AddMaxEquality(b,[n[p,d] for d in ds]); fs.append(b)
    F=m.NewIntVar(0,4,""); m.Add(F==sum(fs)); fin[p]=F
for p in ALL:   m.Add(load[p]<=6)                  # tope general sin contar TX
for p in R1:    m.Add(load[p]==3); m.Add(fin[p]<=1)
for p in R2:    m.Add(fin[p]<=2)
for p in R3:    m.Add(load[p]>=5); m.Add(fin[p]<=2)
for p in R4:    m.Add(fin[p]<=1)                   # un solo finde de qx/ucq/mayor
# la rotacion de UCQ: cada rotante hace 5-6 guardias de UCQ y practicamente nada mas
for p in ROT:   m.Add(ucq[p]>=5); m.Add(load[p]-ucq[p]<=1)
for p in R4ROT: m.Add(sum(tx[p,d] for d in DAYS)<=6)   # ya cargan la UCQ entera

dev=[]; mxc=m.NewIntVar(0,60,"mxc")
for p in R4:
    c=m.NewIntVar(0,60,""); m.Add(c==BASE[p]+sum(tx[p,d] for d in DAYS))
    m.Add(mxc>=c)
    m.Add(c<=40)
    a=m.NewIntVar(0,60,""); m.AddAbsEquality(a,c-37); dev.append(a)
mx2=m.NewIntVar(0,6,""); mn2=m.NewIntVar(0,6,"")
for p in R2: m.Add(mx2>=load[p]); m.Add(mn2<=load[p])
rot=sum(ucq[p] for p in ROT)
m.Minimize(200*mxc + 8*sum(dev) + 40*(mx2-mn2) - 15*rot + 10*sum(tx["Sandra",d] for d in DAYS))
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
print("\nrotantes UCQ:", {p:s.Value(ucq[p]) for p in ROT}, "| R2 en UCQ:", sum(s.Value(ucq[p]) for p in R2 if p!="Patricia"))
print("\n            jun-oct  nov  ->  acum | findesTX | noTX findes")
for p in R4:
    t=sum(1 for d in DAYS if sched[d]["TX"]==p); ft=sum(1 for d in FINDE_D if sched[d]["TX"]==p)
    print(f"{p:10s} {BASE[p]:7d} {t:4d}  -> {BASE[p]+t:4d} |    {ft}     | {s.Value(load[p])}    {s.Value(fin[p])}")
print()
for g,nm in ((R1,"R1"),(R2,"R2"),(R3,"R3")):
    print(nm, {p:(s.Value(load[p]),s.Value(fin[p])) for p in g})
