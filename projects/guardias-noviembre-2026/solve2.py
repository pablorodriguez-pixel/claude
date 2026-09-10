from ortools.sat.python import cp_model
import json, sys

# ---------------- datos ----------------
R1 = ["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2 = ["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3 = ["Candela","Fabian","Patri","Tony"]
R4 = ["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV = {p:"R1" for p in R1} | {p:"R2" for p in R2} | {p:"R3" for p in R3} | {p:"R4" for p in R4}
ALL = R1+R2+R3+R4
ROT = ["Tony","Patricia","Maria","Carlota"]          # rotantes UCQ

BLOCK = {
 "Aitor":[26,27,28,29,30], "Arturo":[], "Cristina":[13,14,15,26,27,28,29,30],
 "David":[], "Fatima":[13,14,15,27,28,29], "Mercedes":[26,27,28,29,30],
 "Rosario":[13,14,15,20,21,22], "Miriam":[6,7,8,9,20,21,22],
 "Patricia":[], "Ana":[6,7,8,20,21], "Antonio":[6,7,8,9], "Asis":[12,20,21,22],
 "Emilio":[4,18], "Eva":[6,7,8,9,10,28,29], "Tania":[18,19,20,21,22,23], "Marc":[27,28,29],
 "Candela":[6,7,8,9,17,18,26,27,28,29], "Fabian":[7,8], "Patri":[20,21,22,26,27,28,29],
 "Tony":[27,28,29],
 "Carlota":[13,14,15], "Isabel":[6,7,8,9,14,15], "Maria":[1,2,3,4,5,6,7,8,9,13,14,15],
 "Almudena":[11,12,13,20,21,22], "AnaG":[], "Sandra":[27,28,29],
}
DAYS = list(range(3,31))
DOW = {d:["dom","lun","mar","mie","jue","vie","sab"][(d-1)%7] for d in range(1,31)}
PUENTE = [7,8,9]                  # el viernes 6 NO es puente
NO_PUENTE = ["Almudena","AnaG"]   # ya llevan 2/3 de octubre
WKND = {"W1":[6,7,8,9], "W2":[13,14,15], "W3":[20,21,22], "W4":[27,28,29]}
VD = [(13,15),(20,22),(27,29)]    # viernes == domingo
SF = [(7,9)]                      # sabado == lunes festivo
DAY2_NONTX = ["Tania","Fabian","Fatima","Miriam"]   # trabajaron el 2 (no TX)
DAY2_TX    = ["Almudena"]                           # TX el 1 y 2 -> no guardia el 3

# tandas TX fijadas (equilibrio de localizadas + tandas de finde viernes->domingo/lunes)
TX = {}
for d in (3,4,5):        TX[d]="Carlota"
for d in (6,7,8,9):      TX[d]="Sandra"
for d in (10,11,12):     TX[d]="Maria"
for d in (13,14,15):     TX[d]="AnaG"
for d in (16,17):        TX[d]="Sandra"
for d in (18,19):        TX[d]="Isabel"
for d in (20,21,22):     TX[d]="Maria"
for d in (23,24):        TX[d]="Carlota"
for d in (25,26):        TX[d]="AnaG"
for d in (27,28,29,30):  TX[d]="Almudena"

# W1 fijado a mano (unica cuadratura posible)
FIX = {
 6:{"UCQ":"Tony","MAY":"Fabian","QX":["Almudena","AnaG"]},
 7:{"UCQ":"Patricia","MAY":"Patri","QX":["Asis","Emilio"]},
 9:{"UCQ":"Patricia","MAY":"Patri","QX":["Asis","Emilio"]},
 8:{"MAY":"Tony"},
}

m = cp_model.CpModel()
ROLES = ["UCQ","MAY","QX"]
CAP = {"UCQ":1,"MAY":1,"QX":2}
x = {(p,d,r): m.NewBoolVar(f"x_{p}_{d}_{r}") for p in ALL for d in DAYS for r in ROLES}
tx = {(p,d): (1 if TX[d]==p else 0) for p in ALL for d in DAYS}

def elig(p,d,r):
    if d in BLOCK[p]: return False
    if TX[d]==p: return False                       # ese dia hace TX
    if r=="UCQ" and not (p in ROT or LEV[p]=="R2"): return False
    if r=="MAY" and LEV[p] not in ("R3","R4"): return False
    if r=="QX":
        if d==6: pass                               # el 6 solo hay R3/R4 disponibles
        elif LEV[p] not in ("R1","R2"): return False
    if d==30 and LEV[p]=="R4": return False         # curso R4 del dia 30
    if d==6 and LEV[p] in ("R1","R2"): return False # fiesta: libran R1 y R2
    if d==7 and LEV[p]=="R1": return False          # resaca fiesta: libran R1
    if d in PUENTE and p in NO_PUENTE: return False # tope 2/3 puentes
    if d==3 and (p in DAY2_NONTX or p in DAY2_TX): return False
    if d==8 and LEV[p] in ("R3","R4") and p!="Tony": return False  # domingo 8 = resis pequenos
    return True

for p in ALL:
    for d in DAYS:
        for r in ROLES:
            if not elig(p,d,r): m.Add(x[p,d,r]==0)

for d in DAYS:
    for r in ROLES:
        m.Add(sum(x[p,d,r] for p in ALL) == CAP[r])

# un solo puesto por persona y dia
n = {}   # trabajo NO-TX
for p in ALL:
    for d in DAYS:
        v = m.NewBoolVar(f"n_{p}_{d}")
        m.Add(v == sum(x[p,d,r] for r in ROLES))
        n[p,d] = v

# descanso: no dos dias seguidos de guardia presencial;
# y la TX no puede ser vispera de guardia
for p in ALL:
    for d in DAYS:
        if d+1 in DAYS:
            m.Add(n[p,d] + n[p,d+1] <= 1)
            if tx[p,d]: m.Add(n[p,d+1] == 0)

# emparejamientos viernes-domingo y sabado-lunes festivo
for a,b in VD+SF:
    for p in ALL:
        for r in ROLES:
            m.Add(x[p,a,r] == x[p,b,r])

# W1 fijado
for d,spec in FIX.items():
    for r,who in spec.items():
        if r=="QX":
            for w in who: m.Add(x[w,d,"QX"]==1)
        else:
            m.Add(x[who,d,r]==1)

# domingo 8: los dos QX son R1 y la UCQ un R2 ("resis pequenos")
m.Add(sum(x[p,8,"QX"] for p in R1) == 2)
m.Add(sum(x[p,8,"UCQ"] for p in R2) == 1)

# cargas
load, fin = {}, {}
for p in ALL:
    tot = m.NewIntVar(0,28,f"L_{p}")
    m.Add(tot == sum(n[p,d] for d in DAYS))
    load[p]=tot
    fs=[]
    for w,ds in WKND.items():
        b = m.NewBoolVar(f"f_{p}_{w}")
        m.AddMaxEquality(b,[n[p,d] for d in ds if d in DAYS])
        fs.append(b)
    f = m.NewIntVar(0,4,f"F_{p}")
    m.Add(f == sum(fs)); fin[p]=f

for p in R1: m.Add(load[p] <= 3); m.Add(fin[p] <= 1)
for p in R2: m.Add(load[p] <= 6); m.Add(fin[p] <= 3)
for p in R3: m.Add(load[p] == 6); m.Add(fin[p] <= 2)
for p in R4: m.Add(load[p] <= 6); m.Add(fin[p] <= 1)   # max 1 finde de qx/ucq/mayor

# equilibrio
maxR2 = m.NewIntVar(0,6,"maxR2"); minR2 = m.NewIntVar(0,6,"minR2")
for p in R2: m.Add(maxR2>=load[p]); m.Add(minR2<=load[p])
maxR1 = m.NewIntVar(0,3,"maxR1"); minR1 = m.NewIntVar(0,3,"minR1")
for p in R1: m.Add(maxR1>=load[p]); m.Add(minR1<=load[p])
r4x = m.NewIntVar(0,6,"maxR4"); r4n = m.NewIntVar(0,6,"minR4")
for p in R4: m.Add(r4x>=load[p]); m.Add(r4n<=load[p])
rotucq = m.NewIntVar(0,28,"rotucq")
m.Add(rotucq == sum(x[p,d,"UCQ"] for p in ROT for d in DAYS))
t4x = m.NewIntVar(0,20,"t4x"); t4n = m.NewIntVar(0,20,"t4n")
for p in R4:
    tt = sum(1 for d in DAYS if TX[d]==p)
    m.Add(t4x >= load[p]+tt); m.Add(t4n <= load[p]+tt)
m.Minimize(20*(maxR2-minR2) + 20*(maxR1-minR1) + 6*(r4x-r4n) + 4*(t4x-t4n) - 5*rotucq)

s = cp_model.CpSolver(); s.parameters.max_time_in_seconds=180; s.parameters.num_workers=8
st = s.Solve(m)
print("status:", s.StatusName(st))
if st not in (cp_model.OPTIMAL, cp_model.FEASIBLE): sys.exit(1)

sched={}
for d in DAYS:
    row={"TX":TX[d]}
    for r in ROLES:
        who=[p for p in ALL if s.Value(x[p,d,r])]
        row[r]= who[0] if r!="QX" else who
    sched[d]=row
out={"sched":sched,
     "load":{p:s.Value(load[p]) for p in ALL},
     "fin":{p:s.Value(fin[p]) for p in ALL},
     "tx":{p:sum(1 for d in DAYS if TX[d]==p) for p in R4}}
open("/tmp/claude-0/-home-user/1dc01004-de40-55ac-a8da-a2a127f3161f/scratchpad/sol.json","w").write(json.dumps(out,indent=1))
for d in DAYS:
    r=sched[d]
    print(f"{d:2d} {DOW[d]}  TX {r['TX']:9s} UCQ {r['UCQ']:9s} MAY {r['MAY']:9s} QX {r['QX'][0]:9s} {r['QX'][1]:9s}")
print()
for grp,name in ((R1,"R1"),(R2,"R2"),(R3,"R3"),(R4,"R4")):
    for p in grp:
        t=out["tx"].get(p,0)
        print(f"{name} {p:10s} noTX {s.Value(load[p]):2d}  findes(noTX) {s.Value(fin[p])}  TX {t:2d}  total {s.Value(load[p])+t:2d}")
