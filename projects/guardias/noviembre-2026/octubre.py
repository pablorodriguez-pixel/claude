# -*- coding: utf-8 -*-
"""Cuadrante real de OCTUBRE 2026 transcrito de la imagen.
Cada dia: (TX/trasplante, UCQ, QX1, QX2, QX3)
Incluye 1 y 2 de noviembre, que ya venian asignados en el cuadrante de octubre.
"""
CANON = {
 "ALMU":"Almudena","Almu":"Almudena","SANDRA":"Sandra","Sandra":"Sandra",
 "ANA GAUDIOSO":"Ana G","Ana Gaudioso":"Ana G","ISA":"Isabel","Isa":"Isabel","isa":"Isabel",
 "CARLOTA":"Carlota","Carlota":"Carlota","Patri R3":"Patri","Candela":"Candela",
 "Fabian":"Fabian","Tony R3":"Tony","Patricia R2":"Patricia","Ana R2":"Ana R2",
 "Antonio R2":"Antonio","Asis":"Asis","Marc":"Marc","Eva":"Eva","Emilio":"Emilio",
 "Tania":"Tania","Miriam R1":"Miriam","Miri R1":"Miriam","Rosario R1":"Rosario",
 "David R1":"David","Fatima R1":"Fatima","Arturo R1":"Arturo","Cristina R1":"Cristina",
 "Mercedes R1":"Mercedes","Aitor R1":"Aitor",
}
OCT = {
 1:("SANDRA","Patricia R2","Almu","Marc","Rosario R1"),
 2:("SANDRA","Tania","Patri R3","Miriam R1","David R1"),
 3:("SANDRA","Tony R3","Candela","Arturo R1","Fatima R1"),
 4:("SANDRA","Tania","Patri R3","Miriam R1","David R1"),
 5:("ANA GAUDIOSO","Tony R3","Isa","Marc","Aitor R1"),
 6:("ALMU","Antonio R2","Sandra","Candela","Emilio"),
 7:("ISA","Fabian","Carlota","Asis","Miriam R1"),
 8:("CARLOTA","Tania","Almu","Marc","Fatima R1"),
 9:("CARLOTA","Emilio","isa","Antonio R2","Rosario R1"),
10:("CARLOTA","Eva","Sandra","Ana R2","Cristina R1"),
11:("ANA GAUDIOSO","Emilio","isa","Antonio R2","Rosario R1"),
12:("ALMU","Eva","Sandra","Ana R2","Cristina R1"),
13:("ISA","Marc","Carlota","Asis","Fatima R1"),
14:("SANDRA","Fabian","Almu","Patri R3","Emilio"),
15:("SANDRA","Asis","Ana Gaudioso","Ana R2","Arturo R1"),
16:("CARLOTA","Fabian","Candela","Cristina R1","Mercedes R1"),
17:("CARLOTA","Asis","Patri R3","Rosario R1","David R1"),
18:("CARLOTA","Fabian","Candela","Cristina R1","Mercedes R1"),
19:("ANA GAUDIOSO","Ana R2","Isa","Miriam R1","Antonio R2"),
20:("SANDRA","Tony R3","Patri R3","Asis","David R1"),
21:("ISA","Fabian","Carlota","Candela","Eva"),
22:("ANA GAUDIOSO","Patricia R2","Sandra","Ana R2","Aitor R1"),
23:("ISA","Tony R3","Almu","Eva","Antonio R2"),
24:("ISA","Patricia R2","Carlota","Emilio","Marc"),
25:("ISA","Tony R3","Almu","Eva","Antonio R2"),
26:("ANA GAUDIOSO","Tania","Sandra","Miri R1","Arturo R1"),
27:("CARLOTA","Patricia R2","Candela","Emilio","Aitor R1"),
28:("ALMU","Marc","Patri R3","Eva","Asis"),
29:("ALMU","Tony R3","Carlota","Isa","Arturo R1"),
30:("ALMU","Patricia R2","Ana Gaudioso","Mercedes R1","Aitor R1"),
31:("ALMU","Tania","Fabian","Fatima R1","Miriam R1"),
}
NOV_YA = {   # dias de noviembre ya cubiertos por el cuadrante de octubre
 1:("ALMU","Patricia R2","Ana Gaudioso","Mercedes R1","Aitor R1"),
 2:("ALMU","Tania","Fabian","Fatima R1","Miriam R1"),
}
PUENTES_OCT = {"12-oct": [10,11,12], "31-oct": [(10,31),(11,1),(11,2)]}
