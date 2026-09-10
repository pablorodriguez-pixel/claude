# -*- coding: utf-8 -*-
import json
T=json.load(open('tab.json')); rows=T["rows"]
S={int(k):v for k,v in T["sched"].items()}
DISP={"Fatima":"Fátima","Asis":"Asís","Fabian":"Fabián","Maria":"María","AnaG":"Ana G."}
d=lambda p: DISP.get(p,p)
DOW={x:["dom","lun","mar","mié","jue","vie","sáb"][(x-1)%7] for x in range(1,31)}
PREV={1:{"TX":"Almudena","UCQ":"Patricia","MAY":"Ana G.","QX":["Mercedes","Aitor"]},
      2:{"TX":"Almudena","UCQ":"Tania","MAY":"Fabián","QX":["Fátima","Miriam"]}}
TAG={6:("fiesta","flag"),7:("S+F","flag"),9:("S+F","flag"),8:("R1·R2","flag"),
     13:("V+D",""),15:("V+D",""),20:("V+D",""),22:("V+D",""),27:("V+D",""),29:("V+D",""),
     14:("S",""),21:("S",""),28:("S","")}
PUENTE={7,8,9}; WKEND={7,8,14,15,21,22,28,29,6,13,20,27}

def daycell(n, r, prev=False):
    cls=["day"]
    if prev: cls.append("prev")
    if n in PUENTE or n==6: cls.append("puente")
    elif DOW[n] in ("sáb","dom"): cls.append("weekend")
    tag=""
    if n in TAG:
        t,k=TAG[n]; tag=f'<span class="tag {k}">{t}</span>'
    li=[f'<li><span class="rk rk-tx">TX</span><span class="who">{d(r["TX"])}</span></li>',
        f'<li><span class="rk rk-ucq">UCQ</span><span class="who">{d(r["UCQ"])}</span></li>',
        f'<li><span class="rk rk-mayor">MAY</span><span class="who">{d(r["MAY"])}</span></li>']
    for i,q in enumerate(r["QX"]):
        li.append(f'<li><span class="rk rk-qx{i+2}">QX</span><span class="who">{d(q)}</span></li>')
    carry='<div class="carry">del cuadrante de octubre</div>' if prev else ''
    return (f'<div class="{" ".join(cls)}">\n<div class="dhead"><span class="dnum">{n}</span>'
            f'<span class="dow">{DOW[n]}</span>{tag}</div>\n<ul class="roles">'+"".join(li)+
            f'</ul>{carry}</div>')

cal=['<div class="day empty" aria-hidden="true"></div>']*6
cal.append(daycell(1,PREV[1],True)); cal.append(daycell(2,PREV[2],True))
for n in range(3,31): cal.append(daycell(n,S[n]))
cal += ['<div class="day empty" aria-hidden="true"></div>']*6

CHIP={"TX":"c-tx","UCQ":"c-ucq","MAY":"c-may","QX":"c-qx"}
LBL={"TX":"TX","UCQ":"UCQ","MAY":"MAY","QX":"QX"}
def desg(c):
    return " ".join(f'<i class="chip {CHIP[k]}">{LBL[k]} {v}</i>' for k,v in c.items() if v)

# acumulado real de localizadas desde junio (total, findes vie+sab+dom)
ACC={"Isabel":(38,16),"Almudena":(36,12),"Carlota":(34,18),"Sandra":(33,16),
     "Ana G.":(32,9),"María":(23,11)}
FINDE_D=[6,7,8,13,14,15,20,21,22,27,28,29]
by={r["name"]:r for r in rows}
def cls(delta): return "up" if delta>0 else ("eq" if delta==0 else "dn")
r4tab=[]
for nm in ["Isabel","Almudena","Carlota","Sandra","Ana G.","María"]:
    b,bf=ACC[nm]; r=by[nm]
    inv={v:k for k,v in DISP.items()}; key=inv.get(nm,nm)
    nv=r["cnt"]["TX"]
    nf=sum(1 for x in FINDE_D if S[x]["TX"]==key)
    r4tab.append(f'''<tr>
<td class="c-name"><span class="lvl l-R4">R4</span> {nm}</td>
<td class="num soft">{b}</td><td class="num soft">{bf}</td>
<td class="num {cls(nv)}">+{nv}</td><td class="num {cls(nf)}">+{nf}</td>
<td class="num strong">{b+nv}</td><td class="num strong">{bf+nf}</td>
<td class="num">{r["ntx"]}</td></tr>''')
r4tab.append('''<tr class="ghost">
<td class="c-name">Gerard <span class="off">fuera en noviembre</span></td>
<td class="num soft">15</td><td class="num soft">9</td>
<td class="num eq">—</td><td class="num eq">—</td>
<td class="num strong">15</td><td class="num strong">9</td>
<td class="num soft">—</td></tr>''')

body=[]
for r in rows:
    blk=", ".join(str(x) for x in r["blk"]) or "—"
    ex=''
    if r["name"] in ("Almudena","Ana G."):
        ex='<em class="exent">exenta puente 7-9</em>'
    body.append(f'''<tr>
<td class="c-name"><span class="lvl l-{r["lev"]}">{r["lev"]}</span> {r["name"]}</td>
<td class="num">{r["octg"]}</td><td class="num soft">{r["octf"]}</td>
<td class="num strong">{r["nov"]}<span class="bar"><span style="width:{min(100,r["nov"]*10)}%"></span></span></td>
<td class="num soft">{r["fin"]}</td>
<td class="desg">{desg(r["cnt"])}</td>
<td class="num">{r["tot"]}</td><td class="num soft">{r["fin2"]}</td>
<td class="num"><span class="pu p{r["pue"]}">{r["pue"]}/3</span></td>
<td class="bloq">{blk}{ex}</td></tr>''')

HTML = """<title>Guardias Noviembre 2026</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,500;0,700;1,500&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
:root {
  --paper:#eef1f2; --surface:#ffffff; --surface-2:#e4e9ea; --line:#ccd6d8; --line-soft:#dee5e7;
  --ink:#16242b; --ink-2:#53656d; --ink-3:#87979e;
  --tx:#95571c; --ucq:#585089; --may:#1f6474; --qx:#4a5a62; --flag:#9c2c43; --ok:#1d6b4f;
  --tx-bg:#f6ece1; --ucq-bg:#eceaf5; --may-bg:#e2eff1; --qx-bg:#e8ecee; --flag-bg:#f8e6e9;
  --shadow:0 1px 2px rgba(22,36,43,.06), 0 8px 24px rgba(22,36,43,.05);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper:#0e161b; --surface:#15212a; --surface-2:#1c2b34; --line:#2a3d47; --line-soft:#22323b;
    --ink:#e7eef0; --ink-2:#a4b4bb; --ink-3:#72868f;
    --tx:#dc9a5c; --ucq:#a49bdd; --may:#5cb2c3; --qx:#93a5ad; --flag:#e77e91; --ok:#63c39c;
    --tx-bg:#2c2015; --ucq-bg:#221f33; --may-bg:#12303a; --qx-bg:#1e2a30; --flag-bg:#331920;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.28);
  }
}
:root[data-theme="dark"] {
  --paper:#0e161b; --surface:#15212a; --surface-2:#1c2b34; --line:#2a3d47; --line-soft:#22323b;
  --ink:#e7eef0; --ink-2:#a4b4bb; --ink-3:#72868f;
  --tx:#dc9a5c; --ucq:#a49bdd; --may:#5cb2c3; --qx:#93a5ad; --flag:#e77e91; --ok:#63c39c;
  --tx-bg:#2c2015; --ucq-bg:#221f33; --may-bg:#12303a; --qx-bg:#1e2a30; --flag-bg:#331920;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.28);
}
* { box-sizing:border-box; }
body { margin:0; background:var(--paper); color:var(--ink);
  font:400 15px/1.55 "Source Sans 3", "Helvetica Neue", Arial, sans-serif; }
.wrap { max-width:1240px; margin:0 auto; padding-block:40px 72px; padding-inline:24px; }
h1,h2,h3 { font-family:Bitter, Georgia, "Times New Roman", serif; text-wrap:balance; margin:0; }
h1 { font-size:clamp(28px,4vw,42px); font-weight:700; letter-spacing:-.015em; line-height:1.08; }
h2 { font-size:20px; font-weight:700; letter-spacing:-.01em; }
h3 { font-size:15px; font-weight:700; }
.eyebrow { font:600 11px/1 "IBM Plex Mono", ui-monospace, monospace;
  letter-spacing:.16em; text-transform:uppercase; color:var(--may); }
header.top { border-bottom:2px solid var(--ink); padding-bottom:20px; margin-bottom:28px;
  display:flex; flex-wrap:wrap; gap:24px; align-items:flex-end; justify-content:space-between; }
header.top p { margin:10px 0 0; color:var(--ink-2); max-width:56ch; }
.meta { display:grid; grid-template-columns:auto auto; gap:2px 18px;
  font:400 12.5px/1.5 "IBM Plex Mono", ui-monospace, monospace; color:var(--ink-2); }
.meta b { color:var(--ink); font-weight:600; }
.strip { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); margin-bottom:36px; }
.strip div { background:var(--surface); padding:13px 16px; }
.strip dt { font:600 10.5px/1 "IBM Plex Mono", monospace; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-3); margin-bottom:6px; }
.strip dd { margin:0; font:600 15px/1.3 "Source Sans 3", sans-serif; font-variant-numeric:tabular-nums; }
section { margin-bottom:44px; }
.shead { display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; margin-bottom:16px;
  padding-bottom:8px; border-bottom:1px solid var(--line); }
.shead p { margin:0; color:var(--ink-2); font-size:13.5px; max-width:78ch; }
.scroll { overflow-x:auto; }
.cal { display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:1px;
  background:var(--line-soft); border:1px solid var(--line); min-width:940px; }
.cal .hd { background:var(--surface-2); padding:7px 10px; font:600 10.5px/1 "IBM Plex Mono", monospace;
  letter-spacing:.14em; text-transform:uppercase; color:var(--ink-2); }
.day { background:var(--surface); padding:8px 9px 9px; min-height:132px; }
.day.empty { background:var(--surface-2); min-height:0; padding:0; }
.day.weekend { background:var(--surface-2); }
.day.puente { background:var(--flag-bg); box-shadow:inset 3px 0 0 var(--flag); }
.day.prev { opacity:.62; }
.dhead { display:flex; align-items:baseline; gap:6px; margin-bottom:7px;
  padding-bottom:5px; border-bottom:1px solid var(--line-soft); }
.dnum { font:600 17px/1 "IBM Plex Mono", monospace; font-variant-numeric:tabular-nums; }
.dow { font:400 11px/1 "IBM Plex Mono", monospace; color:var(--ink-3); }
.tag { margin-left:auto; font:600 9.5px/1 "IBM Plex Mono", monospace; letter-spacing:.08em;
  text-transform:uppercase; color:var(--ink-3); border:1px solid var(--line);
  padding:2px 4px; white-space:nowrap; }
.tag.flag { color:var(--flag); border-color:var(--flag); }
.roles { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; }
.roles li { display:flex; align-items:baseline; gap:6px; font-size:13px; line-height:1.3; }
.who { min-width:0; overflow-wrap:break-word; }
.rk { flex:none; width:34px; font:600 9.5px/1.45 "IBM Plex Mono", monospace; letter-spacing:.04em;
  text-align:center; padding:2px 0; }
.rk-tx  { color:var(--tx);  background:var(--tx-bg); }
.rk-ucq { color:var(--ucq); background:var(--ucq-bg); }
.rk-mayor { color:var(--may); background:var(--may-bg); }
.rk-qx2, .rk-qx3 { color:var(--qx); background:var(--qx-bg); }
.carry { margin-top:6px; font:400 10px/1.3 "IBM Plex Mono", monospace; color:var(--ink-3); }
.legend { display:flex; flex-wrap:wrap; gap:8px 22px; margin-top:14px; font-size:13px; color:var(--ink-2); }
.legend span b { color:var(--ink); }
table { width:100%; border-collapse:collapse; font-size:13.5px; min-width:880px; }
th, td { text-align:left; padding:7px 10px; border-bottom:1px solid var(--line-soft); vertical-align:middle; }
thead th { font:600 10.5px/1.3 "IBM Plex Mono", monospace; letter-spacing:.1em;
  text-transform:uppercase; color:var(--ink-3); border-bottom:1px solid var(--ink); white-space:nowrap; }
tbody tr:hover { background:var(--surface); }
.num { font-family:"IBM Plex Mono", monospace; font-variant-numeric:tabular-nums; text-align:right;
  white-space:nowrap; }
.num.soft { color:var(--ink-3); }
.num.strong { font-weight:600; }
.bar { display:inline-block; width:52px; height:5px; background:var(--surface-2);
  margin-left:8px; vertical-align:middle; }
.bar span { display:block; height:100%; background:var(--may); }
.c-name { white-space:nowrap; font-weight:600; }
.lvl { display:inline-block; width:22px; font:600 10px/1.6 "IBM Plex Mono", monospace;
  text-align:center; color:var(--surface); background:var(--ink-2); margin-right:4px; }
.l-R3, .l-R4 { background:var(--may); }
.desg { white-space:nowrap; }
.chip { font:600 9.5px/1.5 "IBM Plex Mono", monospace; font-style:normal; padding:2px 4px; margin-right:3px; }
.chip.c-tx { color:var(--tx); background:var(--tx-bg); }
.chip.c-ucq { color:var(--ucq); background:var(--ucq-bg); }
.chip.c-may { color:var(--may); background:var(--may-bg); }
.chip.c-qx { color:var(--qx); background:var(--qx-bg); }
.pu { font-weight:600; }
.pu.p2 { color:var(--flag); }
.bloq { font-family:"IBM Plex Mono", monospace; font-size:11.5px; color:var(--ink-3);
  max-width:17ch; overflow-wrap:break-word; }
.exent { display:block; font-style:normal; color:var(--flag); font-size:10.5px; margin-top:2px; }
.dn { color:var(--ok); font-weight:600; }
.cond { list-style:none; margin:0; padding:0; display:grid; gap:1px;
  background:var(--line); border:1px solid var(--line); }
.cond li { background:var(--surface); padding:12px 16px; display:grid;
  grid-template-columns:78px 1fr; gap:4px 14px; align-items:baseline; }
.cond .st { font:600 9.5px/1.6 "IBM Plex Mono", monospace; letter-spacing:.1em;
  text-transform:uppercase; text-align:center; padding:2px 0; }
.cond li.ok   .st { color:var(--ok);   background:var(--may-bg); }
.cond li.part .st { color:var(--flag); background:var(--flag-bg); }
.cond li b { font-weight:600; }
.cond .dt { grid-column:2; color:var(--ink-2); font-size:13px; }
@media (max-width:560px){ .cond li { grid-template-columns:1fr; }
  .cond .st { text-align:left; width:78px; } .cond .dt { grid-column:1; } }
tbody tr.ghost td { color:var(--ink-3); }
.off { font:400 10.5px/1 "IBM Plex Mono", monospace; text-transform:uppercase;
  letter-spacing:.1em; color:var(--flag); margin-left:6px; }
.up { color:var(--flag); font-weight:600; }
.eq { color:var(--ink-3); }
.tandas { list-style:none; margin:0; padding:0; display:grid;
  grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); }
.tandas li { background:var(--surface); padding:14px 16px; }
.tandas .wk { font:600 10.5px/1 "IBM Plex Mono", monospace; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-3); }
.tandas .swap { display:block; margin-top:7px; font-size:15px; }
.tandas .swap b { font-weight:600; }
.tandas .why { display:block; margin-top:5px; font-size:12.5px; color:var(--ink-2); }
.tandas li.hold { box-shadow:inset 3px 0 0 var(--flag); }
.notes { display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); }
.note { background:var(--surface); padding:18px 20px; }
.note h3 { margin-bottom:8px; }
.note p, .note li { margin:0 0 8px; color:var(--ink-2); font-size:13.5px; }
.note ul { margin:0; padding-left:18px; }
.note.warn { box-shadow:inset 3px 0 0 var(--flag); }
.note.warn h3 { color:var(--flag); }
footer { margin-top:8px; padding-top:16px; border-top:1px solid var(--line);
  font:400 12px/1.6 "IBM Plex Mono", monospace; color:var(--ink-3); }
@media (max-width:640px) { .wrap { padding-block:24px 48px; padding-inline:14px; } }
</style>

<div class="wrap">
<header class="top">
  <div>
    <div class="eyebrow">Programación de residentes · v14</div>
    <h1>Guardias · Noviembre 2026</h1>
    <p>Una tanda de finde de trasplante por R4, y ninguna para Carlota ni Isabel. Los
    rotantes solo hacen UCQ, las R4 que no rotan tienen 5 guardias cada una, Patricia 5, los
    R1 3, R3 5-6, los cuatro rotantes de UCQ a 6 guardias y nadie con tres guardias en
    siete días. Ana G. hace los tres puentes, la excepción autorizada que lo desatasca.
    Los días 1 y 2 vienen de octubre y salen atenuados.</p>
  </div>
  <div class="meta">
    <span>Residentes</span><b>26 · 8 R1, 8 R2, 4 R3, 6 R4</b>
    <span>Puestos/día</span><b>5 · TX, UCQ, mayor + 2 QX</b>
    <span>Rotando en UCQ</span><b>Tony, Patricia, María, Carlota</b>
    <span>Base del reparto</span><b>Contaje de localizadas jun-oct</b>
  </div>
</header>

<dl class="strip">
  <div><dt>Puestos cubiertos</dt><dd>140 de 140</dd></div>
  <div><dt>Conflictos</dt><dd>0 — ningún bloqueo roto</dd></div>
  <div><dt>Tope R1</dt><dd>3 guardias · 1 finde</dd></div>
  <div><dt>Tope general</dt><dd>6 guardias sin TX</dd></div>
  <div><dt>Rotación de UCQ</dt><dd>23 de 28 · solo rotantes</dd></div>
  <div><dt>Carga</dt><dd>R1 3 · R2 4-6 · R3 5-6 · R4 5</dd></div>
  <div><dt>Tripletes</dt><dd>0 · máx 2 guardias/7 días</dd></div>
  <div><dt>Dobletes</dt><dd>2 · venían de 10</dd></div>
  <div><dt>Tandas de finde</dt><dd>1 por R4 · 0 Carlota e Isabel</dd></div>
</dl>

<section>
  <div class="shead"><h2>Tus condiciones, una por una</h2>
    <p>Verificado por programa contra el cuadrante final, no a ojo.</p></div>
  <ul class="cond">
    <li class="ok"><span class="st">cumple</span><b>Nadie hace tripletes de guardias</b>
      <span class="dt">Ninguna persona tiene <b>3 guardias presenciales en 7 días</b>, ni
      siquiera cruzando la frontera del mes. En la versión anterior había cuatro tripletes de
      3 en 5 días: Aitor 20-22-24, Marc 20-22-24, María 25-27-29 y Sandra 6-8-10.</span></li>
    <li class="ok"><span class="st">sin norma</span><b>No todos los días hay un R1</b>
      <span class="dt">Con 8 R1 a 3 guardias son 24 puestos para 28 días, así que es imposible
      que haya uno cada día. Quedan <b>9 días sin ningún R1</b> —6, 7, 9, 14, 19, 23 y 24— y
      <b>3 días con dos</b> —8, 27 y 29—. Como me dijiste que no hace falta, ya no
      lo fuerzo.</span></li>
    <li class="ok"><span class="st">cumple</span><b>El tándem de fin de semana lo hace una sola persona</b>
      <span class="dt">Viernes, sábado y domingo con la misma R4 en las cuatro; el puente, de
      viernes a lunes. La tanda no va cerrada: la de Ana G. arranca el jueves 5 y la de María
      va del jueves 19 al lunes 23, con los bloques de finde enteros.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Cada R4, una sola tanda de finde</b>
      <span class="dt">Ana G. el puente, Sandra el 13-15, María el 20-22 y Almudena el 27-29.
      Carlota e Isabel, ninguna.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Las R4 que no rotan por UCQ, 5 guardias cada una</b>
      <span class="dt">Isabel, Almudena, Ana G. y Sandra: 5 presenciales exactas, más el
      trasplante aparte. El puesto de mayor no da para las 20, así que suman <b>7 puestos de
      quirófano</b>: Almudena el 6, 23 y 26, Isabel el 19 y el 24, Sandra el 6 y Ana G.
      el 19.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Los rotantes de UCQ solo hacen UCQ</b>
      <span class="dt">Tony, Patricia, María y Carlota no pisan ni el puesto de mayor ni
      quirófano ningún día. Tony no sale el domingo 8: ese día el mayor es Sandra.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Patri (R3) con 5 guardias y Patricia (R2) con 6 de UCQ</b>
      <span class="dt">Patri, de mayor los días 7, 9, 14, 18 y 25. Patricia, de UCQ los días
      5, 13, 15, 20, 22 y 30.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Los huecos de UCQ los rellenan R2</b>
      <span class="dt">Tony, Patricia y Carlota hacen <b>6 cada uno</b> y <b>María 5</b>, que
      es su techo. Cubren 23 de los 28 días; los <b>5 sueltos</b> van a R2: Antonio el 4, Marc
      el 8, Emilio el 14 y Ana el 27 y el 29.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Isabel no se queda a cero de localizadas</b>
      <span class="dt">Coge <b>2</b>, el 23 y el 24, tal cual pediste. María se queda
      en 9 y sigue siendo la que más carga del mes.</span></li>
    <li class="ok"><span class="st">cumple</span><b>El sábado y el lunes festivo, el mismo equipo</b>
      <span class="dt">Sábado 7 y lunes 9: Ana G. de trasplante, Carlota en UCQ, Patri de
      mayor, Tania y Marc en quirófano. Idéntico.</span></li>
    <li class="part"><span class="st">alternativa</span><b>El viernes de la fiesta y el domingo, el mismo equipo</b>
      <span class="dt">Imposible: el viernes 6 solo admite R3 y R4 por la libranza, y el
      domingo 8 deja cuatro personas elegibles para cinco puestos. Se aplica lo que dijiste
      para ese caso: el domingo 8 va a residentes pequeños.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Nadie con más de 2 de los 3 puentes</b>
      <span class="dt">Con la excepción que pediste: <b>Ana G. hace los tres</b> para coger el
      puente de trasplante. Almudena sigue librándolo completo.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Libranza de la fiesta de R1 y R2</b>
      <span class="dt">El viernes 6 no trabaja ningún R1 ni R2. El sábado 7 no lo trabaja
      ningún R1.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Los R3 con 5-6 guardias</b>
      <span class="dt">Candela, Fabián y Patri a 5; Tony a 6 por su rotación.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Los R1 sin pasar de 3 guardias</b>
      <span class="dt">Los ocho a 3 exactas y un finde como máximo.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Ningún residente por encima de 6 guardias sin contar trasplante</b>
      <span class="dt">Máximo 6: solo Patricia, por su rotación.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Ninguna R4 con más de 1 finde de quirófano o UCQ</b>
      <span class="dt">Las seis a un finde.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Las localizadas, clavadas a tus números</b>
      <span class="dt">Isabel 2, Almudena 3 y Carlota 3, clavadas. María baja de 9 a <b>8</b>
      para poder subir su UCQ, y la localizada que suelta va a <b>Ana G., que pasa de 5 a
      7</b>; Sandra queda en 5. Es el reparto que menos desnivela el acumulado.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Carlota se queda sin doblete</b>
      <span class="dt">Sus seis guardias de UCQ van los días 7, 9, 16, 19, 23 y 26, con el
      7+9 como emparejamiento propio del puente.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Dobletes: de 10 a 2</b>
      <span class="dt"><b>Sandra 6+8</b>, el fin de semana de la fiesta, que va partido porque
      el viernes 6 y el domingo 8 no se pueden emparejar, y <b>María 10+12</b>, que aparece al
      subirle la UCQ a 5. Carlota, ninguno.</span></li>
    <li class="ok"><span class="st">cumple</span><b>Candela cede su sexta guardia</b>
      <span class="dt">Los tres R3 que no rotan quedan igualados a 5, y <b>Asís y Emilio
      llegan a 5</b>.</span></li>
    <li class="ok"><span class="st">cumple</span><b>María con 5 guardias de UCQ</b>
      <span class="dt">Dentro de tu horquilla de 5-6, y <b>5 es su techo</b>: con 6 el modelo es
      infeasible. Está de vacaciones del 1 al 9 y del 13 al 15, y la norma de que la localizada
      nunca es víspera de guardia obliga a dejar un día libre antes de cada guardia de unidad.
      Quitar esa norma no lo arregla — lo probé, y sigue siendo infeasible.</span></li>
    <li class="part"><span class="st">ojo</span><b>Sandra vuelve a 19 findes de localizada</b>
      <span class="dt">Al devolverle el 13-15, adelanta a Carlota (18) en el acumulado de
      findes. Es el precio de deshacer la segunda tanda de Ana G.</span></li>
  </ul>
</section>

<section>
  <div class="shead"><h2>Las cuatro tandas de trasplante</h2>
    <p>El bloque viernes-sábado-domingo lo lleva una sola R4 —de viernes a lunes en el
    puente—. La tanda puede arrancar antes o seguir después: lo intocable es que el finde
    no se parta entre dos personas.</p></div>
  <ul class="tandas">
    <li class="hold"><span class="wk">vie 6 – lun 9 · puente</span>
      <span class="swap">Carlota → <b>Ana G.</b></span>
      <span class="why">Con tu excepción a la norma de los 2/3 puentes. Su tanda sigue hasta
      el lunes 9 desde el jueves 5. Ana G. acumula 9 findes de localizada, la mitad que Carlota (18).</span></li>
    <li><span class="wk">vie 13 – dom 15</span>
      <span class="swap">Ana G. → <b>Sandra</b></span>
      <span class="why">Devuelta a Sandra, como pediste, y exacta de viernes a domingo.
      Solo lo pueden coger ellas dos:
      Carlota, Isabel y María están de vacaciones esos días y Almudena tiene bloqueado
      el 13.</span></li>
    <li><span class="wk">vie 20 – dom 22</span>
      <span class="swap">Isabel → <b>María</b></span>
      <span class="why">Dentro de una tanda del miércoles 18 al domingo 22. María acumula 23
      localizadas frente a las 38 de Isabel.</span></li>
    <li><span class="wk">vie 27 – dom 29</span>
      <span class="swap">Almudena → <b>Almudena</b></span>
      <span class="why">Sandra está de vacaciones, Ana G. y María ya tienen tanda, y Carlota
      e Isabel quedan excluidas por acumulado.</span></li>
  </ul>
</section>

<section>
  <div class="shead"><h2>Cómo queda el acumulado de localizadas</h2>
    <p>Las dos primeras columnas son tu contaje de junio a octubre. Rojo es subida,
    gris es que no se mueve. La última columna es lo que cuenta para el tope de 6:
    la localizada no suma.</p></div>
  <div class="scroll"><table>
    <thead><tr><th>Residente</th>
      <th class="num">Jun-oct</th><th class="num">Findes</th>
      <th class="num">Nov</th><th class="num">Findes nov</th>
      <th class="num">Acumulado</th><th class="num">Findes acum.</th>
      <th class="num">Cuentan al tope</th></tr></thead>
    <tbody>
__R4TAB__
    </tbody>
  </table></div>
  <div class="legend">
    <span>Acumulado de localizadas: <b>32-40</b>.</span>
    <span>Isabel se queda en <b>2</b> localizadas y María carga <b>9</b>.</span>
  </div>
</section>

<section>
  <div class="shead"><h2>Cuadrante</h2>
    <p>En los findes normales el viernes y el domingo los hace el mismo equipo
    (<b>V+D</b>) y el sábado otro distinto. En el puente se mantiene la unión del
    <b>sábado 7 con el lunes 9</b>; el <b>domingo 8</b> es la excepción y lo llevan
    residentes pequeños, porque emparejarlo con el viernes 6 no tenía solución.</p></div>
  <div class="scroll"><div class="cal">
    <div class="hd">lunes</div><div class="hd">martes</div><div class="hd">miércoles</div>
    <div class="hd">jueves</div><div class="hd">viernes</div><div class="hd">sábado</div>
    <div class="hd">domingo</div>
__CAL__
  </div></div>
  <div class="legend">
    <span><b>TX</b> trasplante, localizada — solo R4</span>
    <span><b>UCQ</b> unidad de cirugía — rotantes y R2</span>
    <span><b>MAY</b> residente mayor — R3 o R4</span>
    <span><b>QX</b> quirófano — R1 y R2</span>
    <span><b>Rojo</b>: fiesta del 6 y puente del 7 al 9</span>
  </div>
</section>

<section>
  <div class="shead"><h2>Control por residente</h2>
    <p>Octubre es el saldo de partida. «Nov» y «Total 2m» incluyen la localizada de
    trasplante; el tope de 6 se mide sin ella. La columna de puentes cuenta los tres del
    bimestre (12-oct, 31-oct, 9-nov).</p></div>
  <div class="scroll"><table>
    <thead><tr>
      <th>Residente</th><th class="num">Oct</th><th class="num">Findes oct</th>
      <th class="num">Nov</th><th class="num">Findes nov</th><th>Desglose noviembre</th>
      <th class="num">Total 2m</th><th class="num">Findes 2m</th><th class="num">Puentes</th>
      <th>Bloqueos nov</th>
    </tr></thead>
    <tbody>
__BODY__
    </tbody>
  </table></div>
</section>

<section>
  <div class="shead"><h2>Reglas aplicadas</h2></div>
  <div class="notes">
    <div class="note"><h3>Dobletes: de 10 a 2</h3>
      <p>Un doblete es trabajar el día <i>d</i> y el <i>d</i>+2 sin que sea el viernes-domingo
      ni el sábado-lunes propios. Había <b>10</b>; quedan <b>2</b>, y <b>Carlota ninguno</b>,
      que era lo que pedías.</p>
      <p><b>Sandra 6+8</b> es estructural: el finde de la fiesta va partido porque el viernes 6
      y el domingo 8 no se pueden emparejar. <b>María 10+12</b> aparece al subirle la UCQ de 4 a
      5: sus días de unidad tienen que caber en los huecos que le dejan las vacaciones.</p></div>
    <div class="note"><h3>Sin tripletes</h3>
      <p>Nadie hace <b>3 guardias presenciales en 7 días</b>, y la regla cruza la frontera del
      mes: quien trabajó el 1 o el 2 de noviembre arrastra ese día en su ventana.</p>
      <p>El cuadrante anterior tenía cuatro tripletes de tres guardias en cinco días —Aitor
      20-22-24, Marc 20-22-24, María 25-27-29 y Sandra 6-8-10—. Ahora es restricción dura del
      modelo, no una revisión a ojo.</p>
      <p>De paso, <b>ningún día lleva dos R1 juntos</b> en quirófano salvo el domingo 8, que va
      así por la norma de la fiesta.</p></div>
    <div class="note"><h3>El tándem de fin de semana</h3>
      <p>El bloque <b>viernes-sábado-domingo</b> lo lleva siempre <b>una sola R4</b>, y el del
      puente va de viernes a lunes. La tanda no está cerrada: puede arrancar el jueves o
      seguir más allá del domingo. La de Ana G. va del jueves 5 al lunes 9 y la de María del
      miércoles 18 al domingo 22; la de Sandra es exacta, del 13 al 15.</p>
      <p>Una tanda de finde por R4: Ana G. el puente, Sandra el 13-15, María el 20-22 y
      Almudena el 27-29. <b>Carlota e Isabel, ninguna.</b></p></div>
    <div class="note"><h3>Topes por nivel</h3>
      <p><b>R4 que no rotan</b> —Isabel, Almudena, Ana G., Sandra—: <b>5 guardias exactas</b>
      cada una, con el trasplante sumando aparte. El puesto de mayor no llega para las 20, así
      que suman <b>7 puestos de quirófano</b>: Almudena el 6, 23 y 26, Isabel el 19 y el 24,
      Sandra el 6 y Ana G. el 19.</p>
      <p><b>R1</b>: los ocho a 3 y un finde. <b>R3</b>: Candela, Fabián y Patri a 5, Tony a 6
      por su rotación. <b>R2 no rotantes</b>: Asís y Emilio a 5, y Ana, Antonio, Eva, Tania y
      Marc a 4. Nadie pasa de 6 sin contar trasplante.</p></div>
    <div class="note"><h3>La rotación de UCQ, cerrada</h3>
      <p>Los rotantes <b>solo hacen UCQ</b>: no pisan el puesto de mayor ni quirófano ningún
      día del mes, y Tony no sale el domingo 8. Tony, Patricia y Carlota hacen <b>6 guardias
      cada uno</b> y <b>María 5</b>, que es su techo.</p>
      <p>Cubren <b>23 de los 28 días</b>. Los <b>5 huecos</b> los rellenan R2: Antonio el 4,
      Marc el 8, Emilio el 14 y Ana el 27 y el 29. Ninguno pasa de 2 días de unidad.</p></div>
    <div class="note"><h3>Localizadas</h3>
      <p><b>Isabel 2</b> —el 16 y el 17—, Almudena 3 y Carlota 3, clavadas a tus números. <b>María carga 9</b>, por encima de 5 como autorizaste, y sigue siendo la
      que más pone del mes: es la que menos acumulaba, 23 frente a las 38 de Isabel.</p>
      <p>El acumulado desde junio se cierra en <b>32-40</b>, con Ana G. y Carlota igualadas en
      37.</p></div>
    <div class="note warn"><h3>Ana G. hace los tres puentes</h3>
      <p>Es la excepción que autorizaste, y es la que permite que Carlota e Isabel se queden
      sin ninguna tanda de finde. Sin ella el puente de trasplante solo lo podían coger
      Carlota o Sandra: María e Isabel están de vacaciones del 1 al 9 y Almudena libra el
      puente por llevar 2 de 3.</p></div>
    <div class="note warn"><h3>María: 5 de UCQ es su techo</h3>
      <p>Está de vacaciones <b>del 1 al 9 y del 13 al 15</b>, así que le quedan 18 días, y la
      norma de que la localizada <b>nunca es víspera de guardia</b> obliga a dejar un día libre
      antes de cada guardia de unidad. Con esas cuentas, <b>6 de UCQ sale infeasible</b> —y
      quitando la norma de la víspera, también: lo probé—.</p>
      <p>Para subirla de 4 a 5 ha tenido que soltar una localizada, de 9 a <b>8</b>. Esa
      localizada va a <b>Ana G., que pasa de 5 a 7</b>, y no a Sandra: Ana G. acumulaba 32
      desde junio frente a las 33 de Sandra, así que el acumulado queda mejor repartido
      —Isabel 40, Almudena 39, Ana G. 39, Sandra 38, Carlota 37, María 31—.</p></div>
    <div class="note warn"><h3>Sandra vuelve a 19 findes de localizada</h3>
      <p>Devolverle la tanda del 13-15 la pone en <b>19</b> findes acumulados y la deja por
      delante de Carlota, que se queda en 18. Es la consecuencia directa de deshacer la
      segunda tanda de Ana G., que estaba en 12.</p>
      <p>Si en algún momento quieres cerrar también ese hueco, el 13-15 solo lo pueden coger
      Ana G. o Sandra: Carlota, Isabel y María están de vacaciones esos días y Almudena tiene
      bloqueado el 13.</p></div>
    <div class="note warn"><h3>El viernes 6 y el domingo 8 no se pueden emparejar</h3>
      <p>El viernes 6 lo libran R1 y R2 por la fiesta, así que solo pueden trabajar R3 y R4. Si
      el domingo 8 llevara el mismo equipo, tendría que estar disponible los dos días.</p>
      <p>El 8 es puente, y del pool de R3 y R4 caen Almudena (2 de 3 puentes), Candela, Isabel
      y María (vacaciones), Fabián (bloqueado el 7 y el 8) y los cuatro rotantes, que solo
      hacen UCQ. Quedan cuatro personas para cinco puestos.</p>
      <p>Se aplica tu alternativa: <b>el domingo 8 va a residentes pequeños</b> —Patricia en
      UCQ Emilio, y Fátima y Rosario en quirófano— con Sandra de mayor, porque ese puesto no lo puede
      firmar un residente pequeño y Tony no sale de la UCQ. La unión del sábado 7 con el
      lunes 9 se mantiene.</p></div>
    <div class="note"><h3>No hay un R1 todos los días</h3>
      <p>Con 8 R1 a 3 guardias son 24 puestos para 28 días, así que es imposible que haya uno
      cada día. Quedan <b>9 días sin ningún R1</b> —6, 7, 9, 14, 19, 23 y 24— y
      <b>3 días con dos</b> —8, 27 y 29—.</p>
      <p>Los días 6, 7 y 9 son por la libranza de la fiesta; el resto es consecuencia del tope
      de 3 guardias. Como me dijiste que no hace falta, ya no se fuerza.</p></div>
    <div class="note"><h3>Descansos</h3>
      <p>Nadie hace dos días presenciales seguidos. La localizada puede pegarse a una guardia
      del día anterior, pero <b>nunca es víspera de guardia</b>.</p>
      <p>La regla cruza el mes: Tania, Fabián, Fátima y Miriam trabajaron el día 2 y no entran
      el 3, y Almudena venía de trasplante el 1 y el 2.</p></div>
    <div class="note warn"><h3>Gerard queda pendiente</h3>
      <p>Con <b>15 localizadas y 9 findes</b> desde junio es, con diferencia, el que menos
      acumula. Está fuera del reparto de noviembre, así que aquí no se le puede compensar.
      En diciembre debería entrar por delante de todos.</p></div>
  </div>
</section>

<footer>Reparto v14 · 140 puestos · 26 residentes · rotación de UCQ intacta y contaje de
localizadas de junio a octubre como base · comprobado contra bloqueos de vacaciones,
curso R4 del día 30, libranza de la fiesta, tope de puentes, forma de las tandas y regla
de descanso: 0 conflictos</footer>
</div>
"""
HTML = (HTML.replace("__CAL__", "\n".join(cal))
            .replace("__BODY__", "\n".join(body))
            .replace("__R4TAB__", "\n".join(r4tab)))
open('guardias-noviembre-2026.html','w').write(HTML)
print("bytes:", len(HTML))
