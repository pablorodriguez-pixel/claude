import json
S={int(k):v for k,v in json.load(open('sol.json'))['sched'].items()}
PREV={1:{"TX":"Almudena","UCQ":"Patricia","MAY":"AnaG","QX":["Mercedes","Aitor"]},
      2:{"TX":"Almudena","UCQ":"Tania","MAY":"Fabian","QX":["Fatima","Miriam"]}}
ALLD={**PREV,**S}
R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
TODOS=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam",
"Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc",
"Candela","Fabian","Patri","Tony"]+R4
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[6,7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
EXC={("Isabel",6),("Isabel",8)}   # autorizado expresamente por el usuario
D=sorted(S)
PRES=lambda p,d: ALLD[d]["UCQ"]==p or ALLD[d]["MAY"]==p or p in ALLD[d]["QX"]
TX  =lambda p,d: ALLD[d]["TX"]==p

print("="*66)
print("1 · BLOQUEOS DE VACACIONES")
print("="*66)
mal=[]; aut=[]
for p in TODOS:
    for d in sorted(set(BLOCK[p]) & set(range(1,31))):
        if d not in ALLD: continue
        if PRES(p,d) or TX(p,d):
            que = "TX" if TX(p,d) else "presencial"
            (aut if (p,d) in EXC else mal).append(f"{p} el dia {d} ({que})")
print(f"  26 residentes, {len(D)} dias, {sum(len(set(BLOCK[p])&set(D)) for p in TODOS)} dias bloqueados en total")
print(f"  violaciones NO autorizadas: {len(mal)}")
for x in mal: print("    -",x)
print(f"  autorizadas por ti: {len(aut)}")
for x in aut: print("    ·",x, "(Isabel en el doblete viernes-domingo)")

print()
print("="*66)
print("2 · NINGUNA R4 CON TRASPLANTE LA VISPERA DE UNA GUARDIA")
print("="*66)
mal2=[]
for p in R4:
    for d in D:
        if TX(p,d) and (d+1) in ALLD and PRES(p,d+1):
            mal2.append(f"{p}: localizada el {d} y guardia el {d+1}")
    # tambien la frontera con octubre: TX el 2 -> guardia el 3
    if TX(p,2) and PRES(p,3): mal2.append(f"{p}: localizada el 2 y guardia el 3")
for p in R4:
    ds=[d for d in D if TX(p,d)]
    sig=[d for d in ds if d+1 in ALLD and PRES(p,d+1)]
    print(f"  {p:9s} localizadas {str(ds):<26s} guardia al dia siguiente: {sig or 'ninguna'}")
print(f"  violaciones: {len(mal2)}")
for x in mal2: print("    -",x)

print()
print("="*66)
print("3 · TRIPLETES (3 guardias presenciales en cualquier ventana de 5 dias)")
print("="*66)
mal3=[]
for p in TODOS:
    ds=[d for d in sorted(ALLD) if PRES(p,d)]
    for i in range(len(ds)):
        v=[d for d in ds if ds[i]<=d<=ds[i]+4]
        if len(v)>=3: mal3.append(f"{p}: {v}")
peor=[]
for p in TODOS:
    ds=[d for d in sorted(ALLD) if PRES(p,d)]
    m=max((len([d for d in ds if a<=d<=a+4]) for a in ds), default=0)
    peor.append((m,p,ds))
peor.sort(reverse=True)
print("  maximo de guardias en 5 dias, por residente (los 6 mas cargados):")
for m,p,ds in peor[:6]: print(f"    {p:9s} {m} en 5 dias   {ds}")
print(f"  tripletes: {len(mal3)}")
for x in mal3: print("    -",x)

print()
print("="*66)
print(f"RESULTADO  ·  bloqueos rotos: {len(mal)}  ·  visperas: {len(mal2)}  ·  tripletes: {len(mal3)}")
print("="*66)
