# -*- coding: utf-8 -*-
"""Reparto de guardias NOVIEMBRE 2026 (dias 3-30).
Convencion de la casa: V+D los hace el mismo equipo; S repite el lunes festivo.
Puestos/dia: TX (trasplante), UCQ, MAYOR, QX2, QX3.
"""
import datetime, random, math
from collections import defaultdict

random.seed(7)
DIAS = list(range(3, 31))
def dow(d): return datetime.date(2026, 11, d).weekday()
NOM = {0:'L',1:'M',2:'X',3:'J',4:'V',5:'S',6:'D'}
FESTIVOS = {9}                       # Almudena (lunes) - puente
def es_finde(d): return dow(d) >= 5 or d in FESTIVOS

NIVEL = {}
for n in "Rosario Cristina Miriam David Mercedes Arturo Aitor Fatima".split(): NIVEL[n]="R1"
for n in ["Ana R2","Asis","Antonio","Patricia","Eva","Marc","Tania","Emilio"]:  NIVEL[n]="R2"
for n in ["Patri","Candela","Tony","Fabian"]:                                   NIVEL[n]="R3"
for n in ["Isabel","Ana G","Sandra","Almudena","Maria","Carlota"]:              NIVEL[n]="R4"

BLOQ = {
 "Rosario":{13,14,15,20,21,22}, "Cristina":{13,14,15,26,27,28,29,30},
 "Miriam":{6,7,8,9,20,21,22}, "David":set(), "Mercedes":{26,27,28,29,30},
 "Arturo":set(), "Aitor":{26,27,28,29,30}, "Fatima":{13,14,15,27,28,29},
 "Ana R2":{6,7,8,20,21}, "Asis":{12,20,21,22}, "Antonio":{6,7,8,9},
 "Patricia":set(), "Eva":{6,7,8,9,28,29}, "Marc":{27,28,29},
 "Tania":{18,19,20,21,22,23}, "Emilio":{4,18},
 "Patri":{20,21,22,26,27,28,29}, "Candela":{6,7,8,9,17,18,26,27,28,29},
 "Tony":{27,28,29}, "Fabian":{7,8},
 "Isabel":{6,7,8,9,14,15}, "Ana G":set(), "Sandra":{27,28,29},
 "Almudena":{11,12,13,20,21,22}, "Maria":{1,2,3,4,5,6,7,8,9,13,14,15}, "Carlota":{13,14,15},
}
# Exencion del puente del 9: hicieron los dos puentes de octubre
for p in ("Almudena","Ana G"): BLOQ[p] |= {6,7,8,9}
CURSO_R4 = 30                       # ese dia ninguna R4 salvo trasplante

# Guardias del 1 y 2 de noviembre, ya adjudicadas en el cuadrante de octubre.
# Cuentan para el descanso: quien hizo el dia 2 (salvo trasplante) no entra el dia 3.
PREV = {"Almudena":{1:"TX",2:"TX"}, "Patricia":{1:"UCQ"}, "Ana G":{1:"QX"},
        "Mercedes":{1:"QX"}, "Aitor":{1:"QX"}, "Tania":{2:"UCQ"}, "Fabian":{2:"MAYOR"},
        "Fatima":{2:"QX"}, "Miriam":{2:"QX"}}

UCQ_ROT = {"Tony","Patricia","Maria","Carlota"}
R4 = [p for p in NIVEL if NIVEL[p]=="R4"]
MAYORES  = [p for p in NIVEL if NIVEL[p] in ("R3","R4") and p not in UCQ_ROT]
JUNIORS  = [p for p in NIVEL if NIVEL[p] in ("R1","R2") and p not in UCQ_ROT]
R2_LIBRE = [p for p in JUNIORS if NIVEL[p]=="R2"]

# --- Arrastre de octubre (incluye 1 y 2 nov, ya asignados alli) ---
OCT_TOT = {"Miriam":7,"Aitor":5,"Fatima":5,"Arturo":4,"Cristina":4,"David":4,"Mercedes":4,"Rosario":4,
 "Antonio":6,"Asis":6,"Emilio":6,"Eva":6,"Marc":6,"Patricia":6,"Tania":6,"Ana R2":5,
 "Fabian":7,"Candela":6,"Patri":6,"Tony":6,
 "Almudena":13,"Carlota":12,"Sandra":12,"Isabel":11,"Ana G":8,"Maria":0}
OCT_FIN = {"Miriam":3,"Aitor":1,"Fatima":3,"Arturo":1,"Cristina":3,"David":2,"Mercedes":2,"Rosario":2,
 "Antonio":2,"Asis":1,"Emilio":2,"Eva":3,"Marc":1,"Patricia":2,"Tania":3,"Ana R2":2,
 "Fabian":3,"Candela":2,"Patri":2,"Tony":2,
 "Almudena":5,"Carlota":4,"Sandra":4,"Isabel":3,"Ana G":2,"Maria":0}

# --- UCQ: rota fijada a mano (6 por rotante, 1 finde V+D y otro de S) ---
UCQ = {}
for p, ds in {"Patricia":[6,8,14,3,18,25], "Tony":[7,9,13,15,4,19],
              "Carlota":[21,27,29,5,12,24], "Maria":[20,22,28,10,16,26]}.items():
    for d in ds: UCQ[d] = p
UCQ_R2_DIAS = [d for d in DIAS if d not in UCQ]        # 11,17,23,30 -> R2

# --- Unidades de asignacion (V+D juntos, S+festivo juntos) ---
PAREJAS = [(6,8),(7,9),(13,15),(20,22),(27,29)]
en_pareja = {d for p in PAREJAS for d in p}
UNIDADES = PAREJAS + [(d,) for d in DIAS if d not in en_pareja]

def libre(p, dias, tipo):
    if any(d in BLOQ[p] for d in dias): return False
    if tipo != "TX" and CURSO_R4 in dias and NIVEL[p] == "R4": return False
    return True

PLAZAS = ([("MAYOR", u) for u in UNIDADES] + [("QX2", u) for u in UNIDADES] +
          [("QX3", u) for u in UNIDADES] + [("TX", (d,)) for d in DIAS] +
          [("UCQ", (d,)) for d in UCQ_R2_DIAS])

def pool(tipo, dias):
    base = MAYORES if tipo=="MAYOR" else (R4 if tipo=="TX" else
           (R2_LIBRE if tipo=="UCQ" else JUNIORS))
    return [p for p in base if libre(p, dias, tipo)]

POOL = {(t,u): pool(t,u) for t,u in PLAZAS}
vacias = [k for k,v in POOL.items() if not v]
if vacias: print("SIN CANDIDATOS:", vacias)

# ---------------- Objetivos de equidad ----------------
SENIOR = [p for p in NIVEL if NIVEL[p] in ("R3","R4")]
JUNIOR = [p for p in NIVEL if NIVEL[p] in ("R1","R2")]
FIJOS  = {"Tony": 6, "Patricia": 6}          # solo hacen UCQ: cupo cerrado
GS = [p for p in SENIOR if p not in FIJOS]   # 9 mayores repartibles
GJ = [p for p in JUNIOR if p not in FIJOS]   # 15 juniors
FIN_NOV = [d for d in DIAS if es_finde(d)]

NOV_S, NOV_J = 28 + 28 + 12, 28 + 28 + 4     # (TX+MAYOR+UCQ rot) / (QX2+QX3+UCQ-R2)
OBJ_T = {p: NOV_S/len(GS) for p in GS};  OBJ_T.update({p: NOV_J/len(GJ) for p in GJ})
FS = (2*len(FIN_NOV) + 9)/len(GS)            # findes de TX+MAYOR+UCQ(Maria,Carlota)
FJ = 2*len(FIN_NOV)/len(GJ)
OBJ_F = {p: FS for p in GS};  OBJ_F.update({p: FJ for p in GJ})
# cupos por tipo de puesto
OBJ_TIPO = {"TX": 28/len(R4), "MAYOR": 28/len(MAYORES)}
TOPE = {p: (9 if p in GS else 6) for p in list(GS)+list(GJ)}
TOPE_TIPO = {"TX": 6, "MAYOR": 6}
# arrastre de octubre: desempate (pesa poco en total, mas en findes)
OBJ_T2 = {p: (sum(OCT_TOT[q] for q in GS)+NOV_S)/len(GS) for p in GS}
OBJ_T2.update({p: (sum(OCT_TOT[q] for q in GJ)+NOV_J)/len(GJ) for p in GJ})
OBJ_F2 = {p: (sum(OCT_FIN[q] for q in GS)+2*len(FIN_NOV)+9)/len(GS) for p in GS}
OBJ_F2.update({p: (sum(OCT_FIN[q] for q in GJ)+2*len(FIN_NOV))/len(GJ) for p in GJ})

class Estado:
    def __init__(self):
        self.asig = {}
        self.dias = defaultdict(set)
        self.tipo = defaultdict(dict)
        for d, p in UCQ.items():                     # UCQ rotantes: fijo
            self.dias[p].add(d); self.tipo[p][d] = "UCQ"
    def cabe(self, p, tipo, u):
        if p in TOPE and len(self.dias[p]) + len(u) > TOPE[p]: return False
        if tipo in TOPE_TIPO:
            n = sum(1 for x in self.tipo[p].values() if x == tipo)
            if n + len(u) > TOPE_TIPO[tipo]: return False
        for d in u:
            ant = PREV.get(p, {}).get(d-1)
            if ant and tipo != "TX" and ant != "TX": return False
            if d in self.dias[p]: return False
            for v in (d-1, d+1):
                if v in self.dias[p] and tipo != "TX" and self.tipo[p][v] != "TX":
                    return False
        return True
    def poner(self, k, p):
        t, u = k; self.asig[k] = p
        for d in u: self.dias[p].add(d); self.tipo[p][d] = t
    def quitar(self, k):
        t, u = k; p = self.asig.pop(k)
        for d in u: self.dias[p].discard(d); self.tipo[p].pop(d, None)
        return p
    def coste(self):
        c = 0.0
        for p in OBJ_T:
            n   = len(self.dias[p])
            fin = sum(1 for d in self.dias[p] if es_finde(d))
            c += 12*(n - OBJ_T[p])**2 + 6*(fin - OBJ_F[p])**2          # equidad en noviembre
            c += 1.0*(OCT_TOT[p] + n - OBJ_T2[p])**2                   # arrastre: carga
            c += 2.5*(OCT_FIN[p] + fin - OBJ_F2[p])**2                 # arrastre: findes
        for tipo, obj in OBJ_TIPO.items():                             # cupo por tipo de puesto
            base = R4 if tipo == "TX" else MAYORES
            for p in base:
                c += 5*(sum(1 for x in self.tipo[p].values() if x == tipo) - obj)**2
        for p in self.dias:
            for d in self.dias[p]:
                if self.tipo[p].get(d) != "TX": continue
                vec = (self.tipo[p].get(d-1)=="TX") + (self.tipo[p].get(d+1)=="TX")
                c += 9.0 if vec == 0 else -6.0        # tandas de trasplante, no dias sueltos
            ds = sorted(self.dias[p])
            for a, b in zip(ds, ds[1:]):
                if b-a == 1: c += 3.0
                elif b-a == 2: c += 1.0
        for d in DIAS:
            trio = [self.asig.get(k) for k in self.asig if k[0] in ("QX2","QX3") and d in k[1]]
            if sum(1 for x in trio if x and NIVEL[x]=="R1") == 2: c += 0.8
        return c

def inicial():
    for _ in range(4000):
        e = Estado(); ok = True
        for k in sorted(PLAZAS, key=lambda k: len(POOL[k])):
            cand = [p for p in POOL[k] if e.cabe(p, k[0], k[1])]
            if not cand: ok = False; break
            cand.sort(key=lambda p: (len(e.dias[p]) - OBJ_T.get(p, 6), OCT_TOT[p]/6, random.random()))
            e.poner(k, cand[0])
        if ok: return e
    raise SystemExit("sin solucion inicial")

def recocido(e, iters=400000):
    cur = e.coste(); best, bestc = dict(e.asig), cur
    for i in range(iters):
        T = 3.0 * (1 - i/iters) + 0.01
        k = random.choice(PLAZAS); old = e.asig[k]
        cands = [p for p in POOL[k] if p != old]
        if not cands: continue
        new = random.choice(cands)
        e.quitar(k)
        if not e.cabe(new, k[0], k[1]): e.poner(k, old); continue
        e.poner(k, new); c = e.coste()
        if c <= cur or random.random() < math.exp((cur-c)/T):
            cur = c
            if c < bestc: bestc, best = c, dict(e.asig)
        else:
            e.quitar(k); e.poner(k, old)
    return best, bestc
