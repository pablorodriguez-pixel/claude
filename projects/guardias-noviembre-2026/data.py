import json
S=json.load(open('sol.json'))['sched']; S={int(k):v for k,v in S.items()}
R1=["Aitor","Arturo","Cristina","David","Fatima","Mercedes","Rosario","Miriam"]
R2=["Patricia","Ana","Antonio","Asis","Emilio","Eva","Tania","Marc"]
R3=["Candela","Fabian","Patri","Tony"]; R4=["Carlota","Isabel","Maria","Almudena","AnaG","Sandra"]
LEV={p:"R1" for p in R1}|{p:"R2" for p in R2}|{p:"R3" for p in R3}|{p:"R4" for p in R4}
OCT={"Aitor":(5,1),"Arturo":(4,1),"Cristina":(4,3),"David":(4,2),"Fatima":(5,3),"Mercedes":(4,2),
"Rosario":(4,2),"Miriam":(7,3),"Patricia":(6,2),"Ana":(5,2),"Antonio":(6,2),"Asis":(6,1),
"Emilio":(6,2),"Eva":(6,3),"Tania":(6,3),"Marc":(6,1),"Candela":(6,2),"Fabian":(7,3),
"Patri":(6,2),"Tony":(6,2),"Carlota":(12,4),"Isabel":(11,3),"Maria":(0,0),"Almudena":(13,5),
"AnaG":(8,2),"Sandra":(12,4)}
OCTP={"Aitor":1,"Arturo":0,"Cristina":1,"David":0,"Fatima":1,"Mercedes":1,"Rosario":1,"Miriam":1,
"Patricia":1,"Ana":1,"Antonio":1,"Asis":0,"Emilio":1,"Eva":1,"Tania":1,"Marc":0,"Candela":0,
"Fabian":1,"Patri":0,"Tony":0,"Carlota":1,"Isabel":1,"Maria":0,"Almudena":2,"AnaG":2,"Sandra":1}
BLOCK={"Aitor":[26,27,28,29,30],"Arturo":[],"Cristina":[13,14,15,26,27,28,29,30],"David":[],
"Fatima":[13,14,15,27,28,29],"Mercedes":[26,27,28,29,30],"Rosario":[13,14,15,20,21,22],
"Miriam":[6,7,8,9,20,21,22],"Patricia":[],"Ana":[6,7,8,20,21],"Antonio":[6,7,8,9],
"Asis":[12,20,21,22],"Emilio":[4,18],"Eva":[6,7,8,9,10,28,29],"Tania":[18,19,20,21,22,23],
"Marc":[27,28,29],"Candela":[6,7,8,9,17,18,26,27,28,29],"Fabian":[7,8],
"Patri":[20,21,22,26,27,28,29],"Tony":[27,28,29],"Carlota":[13,14,15],
"Isabel":[6,7,8,9,14,15],"Maria":[1,2,3,4,5,6,7,8,9,13,14,15],"Almudena":[11,12,13,20,21,22],
"AnaG":[],"Sandra":[27,28,29]}
DISP={"Fatima":"Fátima","Asis":"Asís","Fabian":"Fabián","Maria":"María","AnaG":"Ana G."}
W={"W1":[6,7,8,9],"W2":[13,14,15],"W3":[20,21,22],"W4":[27,28,29]}
D=range(3,31)
def roles(p,d):
    r=S[d]; out=[]
    if r["TX"]==p: out.append("TX")
    if r["UCQ"]==p: out.append("UCQ")
    if r["MAY"]==p: out.append("MAY")
    if p in r["QX"]: out.append("QX")
    return out
rows=[]
for p in R1+R2+R3+R4:
    cnt={"TX":0,"UCQ":0,"MAY":0,"QX":0}
    for d in D:
        for r in roles(p,d): cnt[r]+=1
    nov=sum(cnt.values()); ntx=nov-cnt["TX"]
    fin=sum(1 for w in W.values() if any(roles(p,d) for d in w))
    finn=sum(1 for w in W.values() if any([r for r in roles(p,d) if r!="TX"] for d in w))
    fint=sum(1 for w in W.values() if any(S[d]["TX"]==p for d in w))
    pue=OCTP[p]+(1 if any(roles(p,d) for d in (7,8,9)) else 0)
    rows.append(dict(name=DISP.get(p,p),lev=LEV[p],octg=OCT[p][0],octf=OCT[p][1],nov=nov,ntx=ntx,
      fin=fin,finn=finn,fint=fint,cnt=cnt,tot=OCT[p][0]+nov,fin2=OCT[p][1]+fin,pue=pue,
      blk=BLOCK[p]))
json.dump({"rows":rows,"sched":{str(d):{k:(v if k!="QX" else v) for k,v in S[d].items()} for d in D},
           "disp":DISP},open('tab.json','w'),ensure_ascii=False,indent=1)
print(f"{'':12s} noTX nov fnd fTX pue")
for r in rows:
    print(f"{r['lev']} {r['name']:10s} {r['ntx']:3d} {r['nov']:3d} {r['finn']:3d} {r['fint']:3d} {r['pue']}/3   {r['cnt']}")
print("\ntotales:", sum(r['nov'] for r in rows))
