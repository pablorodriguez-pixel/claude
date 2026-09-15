import json
t=json.load(open('tab.json')); S={int(k):v for k,v in t['sched'].items()}
rows=t['rows']; DISP=t['disp']
d=lambda p: DISP.get(p,p)
DOW={x:["dom","lun","mar","mié","jue","vie","sáb"][(x-1)%7] for x in range(1,31)}
TAG={6:"fiesta · V+D",7:"S+F",8:"V+D",9:"S+F",13:"V+D",15:"V+D",20:"V+D",22:"V+D",
     27:"V+D",29:"V+D",14:"S",21:"S",28:"S"}
PREV={1:{"TX":"Almudena","UCQ":"Patricia","MAY":"Ana G.","QX":["Mercedes","Aitor"]},
      2:{"TX":"Almudena","UCQ":"Tania","MAY":"Fabián","QX":["Fátima","Miriam"]}}
def roles(r):
    return [["TX",d(r["TX"])],["UCQ",d(r["UCQ"])],["MAY",d(r["MAY"])]]+[["QX",d(q)] for q in r["QX"]]
cells=[{"n":n,"dow":DOW[n],"prev":True,"tag":"","roles":roles(PREV[n])} for n in (1,2)]
cells+=[{"n":n,"dow":DOW[n],"prev":False,"tag":TAG.get(n,""),"roles":roles(S[n])} for n in range(3,31)]

FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]
inv={v:k for k,v in DISP.items()}
resumen=[]
for r in rows:
    nm=r["name"]; k=inv.get(nm,nm)
    ntx=r["cnt"]["TX"]
    nf=sum(1 for x in FINDE_D if S[x]["TX"]==k) if ntx else 0
    resumen.append([r["lev"],nm,r["ntx"],r["fin"] if False else r["finn"],
                    ntx if ntx else "—", (nf if nf else "—") if ntx else "—"])
ACC={"Isabel":(38,16),"Almudena":(36,12),"Ana G.":(32,9),"Sandra":(33,16),
     "Carlota":(34,18),"María":(23,11)}
by={r["name"]:r for r in rows}
acum=[]
for nm in ["Isabel","Almudena","Ana G.","Sandra","Carlota","María"]:
    b,bf=ACC[nm]; r=by[nm]; k=inv.get(nm,nm)
    nv=r["cnt"]["TX"]; nf=sum(1 for x in FINDE_D if S[x]["TX"]==k)
    acum.append([nm,b,f"+{nv}",b+nv,bf,f"+{nf}",bf+nf])
acum.append(["Gerard",15,"fuera",15,9,"fuera",9])
json.dump({"cells":cells,"resumen":resumen,"acum":acum},open('docdata.json','w'),ensure_ascii=False)
print("cells",len(cells),"resumen",len(resumen))
print(resumen[:3]); print(acum)
