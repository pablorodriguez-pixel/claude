import json
S=json.load(open('sol.json'))['sched']; S={int(k):v for k,v in S.items()}
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
ROT=["Tony","Patricia","Maria","Carlota"]
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
OCTP={"Aitor":1,"Arturo":0,"Cristina":1,"David":0,"Fatima":1,"Mercedes":1,"Rosario":1,"Miriam":1,
"Patricia":1,"Ana":1,"Antonio":1,"Asis":0,"Emilio":1,"Eva":1,"Tania":1,"Marc":0,
"Candela":0,"Fabian":1,"Patri":0,"Tony":0,"Carlota":1,"Isabel":1,"Maria":0,"Almudena":2,"AnaG":2,"Sandra":1}
D=range(3,31); err=[]
def nontx(p,d):
    r=S[d]; return (r["UCQ"]==p) or (r["MAY"]==p) or (p in r["QX"])
def anyw(p,d): return nontx(p,d) or S[d]["TX"]==p

# 1 cobertura y unicidad de puesto
for d in D:
    r=S[d]; people=[r["TX"],r["UCQ"],r["MAY"]]+r["QX"]
    if len(people)!=5: err.append(f"d{d}: {len(people)} puestos")
    if len(set(people))!=5: err.append(f"d{d}: persona duplicada {people}")
# 2 elegibilidad de puesto
for d in D:
    r=S[d]
    if LEV[r["TX"]]!="R4": err.append(f"d{d}: TX no R4")
    if not (r["UCQ"] in ROT or LEV[r["UCQ"]]=="R2"): err.append(f"d{d}: UCQ {r['UCQ']} no rotante/R2")
    if LEV[r["MAY"]] not in ("R3","R4"): err.append(f"d{d}: MAY {r['MAY']} no R3/R4")
    for q in r["QX"]:
        if LEV[q] not in ("R1","R2") and d!=6: err.append(f"d{d}: QX {q} no R1/R2")
# 3 bloqueos de vacaciones
for p in LEV:
    for d in D:
        if d in BLOCK[p] and anyw(p,d): err.append(f"{p}: trabaja el {d} estando bloqueado")
# 4 descanso: nunca dos dias presenciales seguidos; TX nunca vispera de guardia
for p in LEV:
    for d in D:
        if d+1 in D:
            if nontx(p,d) and nontx(p,d+1): err.append(f"{p}: {d}+{d+1} seguidos")
            if S[d]["TX"]==p and nontx(p,d+1): err.append(f"{p}: TX {d} vispera de guardia {d+1}")
# frontera de mes: dia 2 = Almudena TX, Tania/Fabian/Fatima/Miriam presencial
for p in ["Tania","Fabian","Fatima","Miriam"]:
    if nontx(p,3): err.append(f"{p}: guardia el 2 y el 3")
if nontx("Almudena",3): err.append("Almudena: TX el 2, vispera del 3")
# 5 emparejamientos
for a,b in [(13,15),(20,22),(27,29),(7,9)]:
    if S[a]!=S[b]: err.append(f"equipos {a} y {b} no coinciden")
# 6 fiesta
for p in [S[6]["UCQ"],S[6]["MAY"]]+S[6]["QX"]+[S[6]["TX"]]:
    if LEV[p] in ("R1","R2"): err.append(f"viernes 6: {p} es {LEV[p]}")
for p in [S[7]["UCQ"],S[7]["MAY"]]+S[7]["QX"]+[S[7]["TX"]]:
    if LEV[p]=="R1": err.append(f"sabado 7: {p} es R1")
# 7 puentes <= 2 de 3
for p in LEV:
    n=OCTP[p]+(1 if any(anyw(p,d) for d in (7,8,9)) else 0)
    if n>2: err.append(f"{p}: {n}/3 puentes")
# 8 curso R4 del dia 30
for p in [S[30]["UCQ"],S[30]["MAY"]]+S[30]["QX"]:
    if LEV[p]=="R4": err.append(f"dia 30: {p} R4 presencial")
# 9 topes de carga
W={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
for p in LEV:
    L=sum(1 for d in D if nontx(p,d)); T=sum(1 for d in D if S[d]["TX"]==p)
    F=sum(1 for w in W.values() if any(nontx(p,d) for d in w))
    FT=sum(1 for w in W.values() if any(S[d]["TX"]==p for d in w))
    if L>6: err.append(f"{p}: {L} guardias no-TX (>6)")
    if LEV[p]=="R1" and L>3: err.append(f"{p} R1: {L} guardias (>3)")
    if LEV[p]=="R3" and not 5<=L<=6: err.append(f"{p} R3: {L} guardias")
    if LEV[p]=="R4" and F>1: err.append(f"{p} R4: {F} findes de qx/ucq (>1)")
    if LEV[p]=="R4" and FT>1: err.append(f"{p} R4: {FT} findes de TX (>1)")
# 10 tandas TX: viernes->domingo (viernes->lunes en el puente)
for ds in ([6,7,8,9],[13,14,15],[20,21,22],[27,28,29]):
    if len({S[d]["TX"] for d in ds})!=1: err.append(f"tanda TX {ds} partida")
# 11 tandas TX consecutivas (sin dias sueltos aislados fuera de racha)
runs=[]; 
for d in D:
    p=S[d]["TX"]
    if runs and runs[-1][0]==p and runs[-1][2]==d-1: runs[-1][2]=d
    else: runs.append([p,d,d])
print("tandas TX:", ", ".join(f"{p} {a}-{b}" for p,a,b in runs))
print("findes TX:", {p:sum(1 for w in W.values() if any(S[d]['TX']==p for d in w)) for p in R4})
print()
print("ERRORES:", len(err))
for e in err: print(" -", e)
