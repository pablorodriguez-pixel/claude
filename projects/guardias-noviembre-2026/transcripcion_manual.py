# Transcripcion v2: el dia 21 lleva TX de MARIA (no Sandra) -> el bloque 20-21-22 queda
# de una sola persona, y cuadran los totales de tu lista (Maria 7 Tx, Sandra 6 Tx).
M = {
 3:("Carlota","Tony","Isabel","Aitor","Eva"),
 4:("Carlota","Ana","Patri","Mercedes","Antonio"),
 5:("Carlota","Patricia","Candela","Fatima","Tania"),
 6:("AnaG","Carlota","Fabian","Almudena","Sandra"),
 7:("AnaG","Tony","Patri","Asis","Marc"),
 8:("AnaG","Carlota","Fabian","Sandra","Almudena"),
 9:("AnaG","Tony","Patri","Asis","Marc"),
10:("Isabel","Maria","Almudena","Miriam","Emilio"),
11:("Maria","Patricia","AnaG","Cristina","Antonio"),
12:("Maria","Carlota","Sandra","Rosario","Tania"),
13:("Sandra","Ana","Patri","David","Eva"),
14:("Sandra","Patricia","Candela","Aitor","Mercedes"),
15:("Sandra","Ana","Patri","David","Eva"),
16:("Sandra","Maria","AnaG","Marc","Miriam"),
17:("Isabel","Carlota","Fabian","Antonio","Tania"),
18:("AnaG","Maria","Sandra","Emilio","Ana"),
19:("Maria","Patricia","Isabel","Asis","Marc"),
20:("Maria","Tony","AnaG","Arturo","Cristina"),
21:("Maria","Eva","Candela","Emilio","Fatima"),
22:("Maria","Tony","AnaG","Arturo","Cristina"),
23:("Sandra","Carlota","Fabian","Almudena","Isabel"),
24:("Sandra","Maria","Candela","Eva","Antonio"),
25:("Isabel","Tony","AnaG","Emilio","Marc"),
26:("AnaG","Carlota","Almudena","David","Sandra"),
27:("Almudena","Maria","Isabel","Rosario","Asis"),
28:("Almudena","Emilio","Fabian","Antonio","Tania"),
29:("Almudena","Maria","Isabel","Rosario","Asis"),
30:("Maria","Patricia","Candela","Arturo","Ana"),
}
S={d:{"TX":v[0],"UCQ":v[1],"MAY":v[2],"QX":[v[3],v[4]]} for d,v in M.items()}
D=range(3,31)
pres=lambda p,d: S[d]["UCQ"]==p or S[d]["MAY"]==p or p in S[d]["QX"]
W={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
# lo que dice TU lista resumen
TU={"Carlota":(6,1,3),"Maria":(6,1,7),"Isabel":(5,1,3),"Sandra":(5,1,6),"Almudena":(5,1,3),"AnaG":(5,1,6),
    "Tony":(6,2,None),"Patri":(5,2,None),"Candela":(5,2,None),"Fabian":(5,2,None),
    "Patricia":(6,2,None),"Tania":(5,1,None),"Asis":(5,1,None),"Marc":(5,1,None),"Antonio":(5,1,None),
    "Eva":(5,2,None),"Ana":(5,1,None),"Emilio":(4,2,None),
    "Aitor":(3,2,None),"Mercedes":(3,2,None),"Miriam":(3,1,None),"Fatima":(3,1,None),
    "Cristina":(3,1,None),"Rosario":(3,1,None),"David":(3,1,None),"Arturo":(3,1,None)}
UCQTU={"Patricia":6,"Tania":1,"Eva":1,"Ana":2,"Emilio":1,"Tony":6,"Maria":6,"Carlota":6}
print("=== donde mi lectura del calendario y tu lista NO coinciden ===")
mal=0
for p,(g,f,tx) in TU.items():
    mg=sum(1 for d in D if pres(p,d)); mf=sum(1 for ds in W.values() if any(pres(p,d) for d in ds))
    mtx=sum(1 for d in D if S[d]["TX"]==p)
    d=[]
    if mg!=g:  d.append(f"guardias calendario {mg} / lista {g}")
    if mf!=f:  d.append(f"findes calendario {mf} / lista {f}")
    if tx is not None and mtx!=tx: d.append(f"Tx calendario {mtx} / lista {tx}")
    if d: mal+=1; print(f"  {p:10s} " + " · ".join(d))
print(f"  -> {mal} personas descuadran")
print("\n=== dias de UCQ ===")
for p,v in UCQTU.items():
    m=sum(1 for d in D if S[d]["UCQ"]==p)
    print(f"  {p:10s} calendario {m} / lista {v}" + ("   <-- descuadra" if m!=v else ""))
print("  suma calendario:", sum(1 for d in D if True), "dias |",
      "suma lista:", sum(UCQTU.values()), "(deberia ser 28)")
print("\n=== sumas de control de tu lista ===")
print("  total Tx de la lista:", sum(v[2] for v in TU.values() if v[2]), "(deberia ser 28)")
print("  total guardias de la lista:", sum(v[0] for v in TU.values()), "(deberia ser 112)")
print("  total guardias de mi calendario:", sum(sum(1 for d in D if pres(p,d)) for p in TU))
