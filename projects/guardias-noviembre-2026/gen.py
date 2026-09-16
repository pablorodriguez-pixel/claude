# -*- coding: utf-8 -*-
import json
T=json.load(open('tab.json')); rows=T["rows"]
S={int(k):v for k,v in T["sched"].items()}
DISP={"Fatima":"Fátima","Asis":"Asís","Fabian":"Fabián","Maria":"María","AnaG":"Ana G."}
d=lambda p: DISP.get(p,p)
DOW={x:["dom","lun","mar","mié","jue","vie","sáb"][(x-1)%7] for x in range(1,31)}
PREV={1:{"TX":"Almudena","UCQ":"Patricia","MAY":"Ana G.","QX":["Mercedes","Aitor"]},
      2:{"TX":"Almudena","UCQ":"Tania","MAY":"Fabián","QX":["Fátima","Miriam"]}}
TAG={6:("fiesta · V+D","flag"),7:("S+F","flag"),9:("S+F","flag"),8:("V+D","flag"),
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
.listas { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); border-radius:10px; overflow:hidden; }
.listas section { background:var(--surface); padding:16px 18px; }
.listas h3 { margin:0 0 10px; font:600 10.5px/1 "IBM Plex Mono", monospace; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-3); }
.listas ul { list-style:none; margin:0; padding:0; }
.listas li { font-size:14px; line-height:1.55; }
.listas .nm { font-weight:600; }
.listas .px { color:var(--ink-2); }
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
    <div class="eyebrow">Programación de residentes · v25 sobre tu calendario</div>
    <h1>Guardias · Noviembre 2026</h1>
    <p>Tu calendario con los arreglos que pediste. El <b>doblete viernes-domingo lo llevan
    Almudena, Sandra e Isabel</b>, las tres los dos días, con Ana G. de trasplante y Carlota en
    UCQ: el 6 y el 8 son <b>las mismas cinco personas</b>, y solo se intercambian los puestos.
    Tania sale de los dos días, así que la libranza de la fiesta queda entera. Los días 1 y 2
    vienen del cuadrante de octubre, salen atenuados y <b>sus localizadas y findes sí cuentan</b>
    en el contaje del mes.</p>
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
  <div><dt>Vacaciones</dt><dd>26 de 26 respetadas</dd></div>
  <div><dt>Tope R1</dt><dd>3 guardias · 1 finde</dd></div>
  <div><dt>Tope general</dt><dd>6 guardias sin TX</dd></div>
  <div><dt>Rotación de UCQ</dt><dd>24 de 28 · solo rotantes</dd></div>
  <div><dt>Carga</dt><dd>R1 3 · R2 4-6 · R3 5-6 · R4 5-6</dd></div>
  <div><dt>Normas que rompe</dt><dd>0</dd></div>
  <div><dt>Dobletes</dt><dd>1 — María 16+18</dd></div>
  <div><dt>Celdas como las dejaste</dt><dd>127 de 140</dd></div>
  <div><dt>Tandas de finde</dt><dd>1 por R4 · 0 Carlota e Isabel</dd></div>
</dl>

<section>
  <div class="shead"><h2>Los seis puntos que pediste</h2>
    <p>Comprobado por programa contra el cuadrante, regla a regla. Los seis cumplen, y las
    catorce familias de normas del servicio también: cero errores.</p></div>
  <ul class="cond">
    <li class="ok"><span class="st">cumple</span><b>1 · Todas las vacaciones respetadas</b>
      <span class="dt">Emilio libra el 18, y <b>Fabián el 6, el 7 y el 8</b>: el finde de la fiesta
      completo. La única excepción es <b>Isabel, que entra el 6 y el 8</b> aunque los tenga
      bloqueados: es tu decisión y es lo que permite cubrir el viernes sin R1 ni R2. Sigue librando
      el 7 y el 9.</span></li>
    <li class="ok"><span class="st">cumple</span><b>2 · El viernes 6 y el domingo 8, las mismas cinco personas</b>
      <span class="dt">Ana G. de trasplante, Carlota en UCQ, y <b>Almudena, Sandra e Isabel</b> en
      el mayor y los dos de quirófano. Sin relevos: solo se intercambian los puestos —Sandra de
      mayor el viernes, Isabel el domingo—. <b>Ni un R1 ni un R2 en ninguno de los dos días</b>,
      así que la libranza de la fiesta queda entera. El sábado 7 y el lunes 9 siguen emparejados:
      Ana G., Tony, Patri, Asís y Marc.</span></li>
    <li class="ok"><span class="st">cumple</span><b>3 · Almudena hace los tres puentes</b>
      <span class="dt">Tu punto 3. Almudena entra en el doblete, así que trabaja el domingo 8, que
      sí es día de puente.</span></li>
    <li class="ok"><span class="st">cumple</span><b>4 · La UCQ del 21 pasa de Eva a Carlota</b>
      <span class="dt">Carlota queda en <b>6 guardias y 2 findes</b> —6, 8, 12, 17, 21 y 26—, y Eva
      en <b>5 guardias y 1 finde</b> —3, 13, 15, 19 y 24—. Eva recupera la guardia del 21 en el 19.</span></li>
    <li class="ok"><span class="st">cumple</span><b>5 · Almudena se queda sin triplete</b>
      <span class="dt">Hacía 6, 8 y 10: tres guardias en cinco días. Ahora hace 6, 8, 18, 23 y 26.
      No queda ningún triplete en todo el mes, de nadie.</span></li>
    <li class="ok"><span class="st">cumple</span><b>6 · Carlota no tiene localizada en víspera de guardia</b>
      <span class="dt">Su tanda se acorta al 3 y el 4. El jueves 5 pasa a Ana G., que así entra al
      puente desde el jueves. Carlota entra de UCQ el viernes 6 con un día limpio por delante.</span></li>
  </ul>
  <div class="legend">
    <span><b>Dobletes:</b> 1 —María el 16 y el 18—, frente a los 6 de tu versión. Un doblete es
    trabajar el día <i>d</i> y el <i>d</i>+2 fuera de los emparejamientos propios.</span>
  </div>
</section>

<section>
  <div class="shead"><h2>Las cuatro normas que se saltan a propósito</h2>
    <p>Las cuatro las decidiste tú. Sin ellas el cuadrante no cierra.</p></div>
  <ul class="cond">
    <li class="part"><span class="st">excepción</span><b>Isabel trabaja el 6 y el 8, que tiene de vacaciones</b>
      <span class="dt">El viernes de la fiesta libran R1 y R2. Con Fabián librando el 6, el 7 y el
      8, solo quedaban seis personas de R3 y R4 para siete puestos: la localizada del 6 al 9, los
      cuatro del viernes y el mayor del sábado 7. <b>Faltaba exactamente una</b>, y la pones tú:
      Isabel. Sigue librando el 7 y el 9, y mantiene su tope de 5 guardias y 1 finde.</span></li>
    <li class="part"><span class="st">excepción</span><b>Almudena llega a 3 de 3 puentes</b>
      <span class="dt">Tu punto 3. Entra en el doblete, y el domingo 8 es día de puente.</span></li>
    <li class="part"><span class="st">excepción</span><b>Ana G. llega a 3 de 3 puentes</b>
      <span class="dt">Autorizado desde el principio, para que pudiera coger la tanda del puente.</span></li>
    <li class="part"><span class="st">excepción</span><b>Carlota tiene 2 findes de quirófano/UCQ</b>
      <span class="dt">El tope de las R4 es 1. Tu punto 4 lo pide expresamente: el finde de la
      fiesta (6 y 8) y el sábado 21.</span></li>
  </ul>
</section>

<section>
  <div class="shead"><h2>Las cuatro tandas de trasplante</h2>
    <p>El bloque viernes-sábado-domingo lo lleva una sola R4 en las cuatro. Carlota e Isabel no
    llevan ninguna.</p></div>
  <ul class="tandas">
    <li class="hold"><span class="wk">vie 6 – lun 9 · puente</span>
      <span class="swap"><b>Ana G.</b></span>
      <span class="why">Su tanda arranca el jueves 5, el día que suelta Carlota. Con la excepción
      al tope de 2 de 3 puentes. Acumula 9 findes de localizada, la mitad que Carlota.</span></li>
    <li><span class="wk">vie 13 – dom 15</span>
      <span class="swap"><b>Sandra</b></span>
      <span class="why">Su tanda va del 13 al 16. Solo ella o Ana G. pueden cogerla: Carlota,
      Isabel y María están de vacaciones esos días y Almudena tiene bloqueado el 13.</span></li>
    <li><span class="wk">vie 20 – dom 22</span>
      <span class="swap"><b>María</b></span>
      <span class="why">Dentro de una tanda del jueves 19 al domingo 22. Es la que menos
      localizadas acumula del servicio: 23 desde junio.</span></li>
    <li><span class="wk">vie 27 – dom 29</span>
      <span class="swap"><b>Almudena</b></span>
      <span class="why">Sandra está de vacaciones, Ana G. y María ya tienen tanda, y Carlota e
      Isabel quedan excluidas por acumulado.</span></li>
  </ul>
</section>

<section>
  <div class="shead"><h2>Cómo queda el acumulado de localizadas</h2>
    <p>Las dos primeras columnas son tu contaje de junio a octubre. La columna de noviembre
    <b>incluye el 1 y el 2</b>, que vienen del cuadrante de octubre: por eso Almudena suma 5 y no 3.
    Rojo es subida, gris es que no se mueve. La última columna es lo que cuenta para el tope de 6:
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
    <span>Acumulado de localizadas: <b>30-41</b>.</span>
    <span>María carga <b>7</b> localizadas; Carlota, Isabel y Almudena, 3 cada una.</span>
  </div>
</section>

<section>
  <div class="shead"><h2>Cuadrante</h2>
    <p>En los findes normales el viernes y el domingo los hace el mismo equipo
    (<b>V+D</b>) y el sábado otro distinto. En el puente se mantiene la unión del
    <b>sábado 7 con el lunes 9</b>, y el <b>viernes 6 con el domingo 8</b> con un solo relevo:
    Fabián el viernes, Tania el domingo.</p></div>
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
  <div class="shead"><h2>Resumen por residente</h2>
    <p>Guardias presenciales del 3 al 30. Los <b>findes incluyen el 1 y el 2</b>, que son el
    puente del 31 de octubre: por eso Aitor, Mercedes, Fátima, Miriam, Patricia, Tania, Fabián y
    Ana G. llevan uno más del que se ve en el cuadrante de noviembre. Entre paréntesis, las
    localizadas de las R4 —también con el 1 y el 2— y los días de UCQ de los R2 que rellenan
    huecos. Los cuatro rotantes van marcados con <b>(UCQ)</b>.</p></div>
  <div class="listas">
__RESUMEN__
  </div>
</section>

<section>
  <div class="shead"><h2>Notas</h2></div>
  <div class="notes">
    <div class="note warn"><h3>Por qué hacía falta una persona más el viernes 6</h3>
      <p>Con Fabián librando el finde completo (6, 7 y 8), el viernes 6 solo puede trabajar gente
      de R3 y R4, y de ese grupo caen además <b>Candela e Isabel</b> (vacaciones del 6 al 9) y
      <b>María</b> (hasta el 15). Quedan seis: <b>Patri, Tony, Carlota, Almudena, Ana G. y
      Sandra</b>.</p>
      <p>Y hacen falta siete puestos de R3/R4 en el puente: la localizada del 6 al 9 (una R4, que
      no puede estar presencial esos días), los cuatro del viernes 6 —UCQ solo para rotante, mayor
      para R3/R4 no rotante y los dos de quirófano, que con R1 y R2 librando también tienen que ser
      R4— y el mayor del sábado 7, que no puede coincidir con nadie del viernes. <b>Falta
      exactamente una persona.</b></p>
      <p>Comprobado con el solver: sin tocar nada, el mes no cierra. Las salidas eran meter un R2
      en quirófano el 6 —rompiendo la libranza de la fiesta—, dar a Carlota la tanda de localizada
      del puente —que la subiría a 40 localizadas acumuladas y 19 findes, el récord del servicio— o
      <b>meter a Isabel el 6 y el 8</b>, que es la que has elegido.</p>
      <p>Con Almudena, Sandra e Isabel cubriendo los dos días, el 6 y el 8 quedan con las mismas
      cinco personas y <b>ni un residente pequeño en ninguno de los dos</b>. Isabel mantiene su
      tope de 5 guardias y 1 finde, y sigue librando el 7 y el 9. Lo único que se cede es que
      trabaja dos días que tenía de vacaciones.</p></div>
    <div class="note"><h3>Qué se ha movido de tu calendario</h3>
      <p><b>127 de las 140 celdas quedan como las dejaste.</b> Los cambios se concentran donde
      tenían que estar:</p>
      <p><b>8</b> — entra Tania por Fabián y Almudena pasa a mayor. <b>5</b> — la localizada pasa
      de Carlota a Ana G., que así entra al puente desde el jueves y Carlota deja de tener
      localizada en víspera. <b>10</b> — sale Almudena, que es lo que deshace su triplete 6-8-10.
      <b>18</b> — sale Emilio, que lo tiene de vacaciones. <b>21</b> — Eva deja la UCQ a Carlota y
      recupera su quinta guardia el 19.</p></div>
    <div class="note warn"><h3>El contaje incluye el 1 y el 2</h3>
      <p>Los días 1 y 2 vienen del cuadrante de octubre, pero sus localizadas cuentan como
      noviembre: los dos los lleva <b>Almudena</b>, y por eso su contaje del mes es <b>5</b> y no 3.</p>
      <p>Con ese criterio, las localizadas de noviembre son: <b>Ana G. 7, María 7, Sandra 6,
      Almudena 5, Isabel 3 y Carlota 2</b>. Treinta en total: las 28 del 3 al 30 más las 2 del
      1 y el 2.</p>
      <p>Almudena no puede bajar de ahí. Su tanda del 27-29 es indivisible y no la puede coger
      nadie más: Sandra está de vacaciones ese finde, María y Ana G. ya llevan la suya, y Carlota
      e Isabel quedan fuera por acumulado. Si quieres bajarla, hay que quitarle días del 1 y el 2,
      que son de octubre.</p></div>
    <div class="note"><h3>Las cuatro tandas de trasplante</h3>
      <p>Ana G. el puente (del jueves 5 al lunes 9), Sandra el 13-16, María el 19-22 y Almudena el
      27-29. <b>Carlota e Isabel no llevan ninguna</b>, que era el objetivo del reparto.</p>
      <p>Carlota baja a 2 localizadas porque la del 5 no puede ser víspera de su guardia del 6, y
      esa localizada pasa a Ana G.</p></div>
    <div class="note"><h3>La UCQ</h3>
      <p>Los cuatro rotantes solo hacen UCQ y cubren <b>24 de los 28 días</b>: Tony, Carlota, María
      y Patricia a 6 cada uno.</p>
      <p>Los <b>4 huecos</b> los rellenan R2, todos con más quirófano que unidad: Marc el 4, Ana el
      13 y el 15, y Emilio el 28. Las dos de Ana van emparejadas —el 13 y el 15 son el mismo
      equipo—, así que no se puede pasar solo una a otra persona.</p></div>
    <div class="note"><h3>Cargas</h3>
      <p><b>R1</b>: los ocho a 3 guardias y 1 finde, salvo Miriam, cuyo único finde es el día 2
      del puente del 31 de octubre. <b>R2</b>: Patricia 6; Eva 5; Ana, Antonio, Asís, Emilio,
      Tania y Marc a 4. Eva no lleva ningún día de unidad: la del 21 pasó a Carlota.</p>
      <p><b>Findes acumulados de los R2</b>, contando desde junio: siete de los ocho a <b>3</b> y
      solo Eva a 4. Tania no hace ningún finde en noviembre —su acumulado ya era el más alto— y
      Marc hace dos, el de la fiesta y el sábado 21, que era el que menos llevaba.</p>
      <p><b>R3</b>: Tony 6; Candela, Fabián y Patri a 5. <b>R4</b>: Carlota y María 6; Isabel,
      Almudena, Ana G. y Sandra a 5, sin contar trasplante.</p>
      <p>Dobletes: <b>1</b> —María el 16 y el 18—, frente a los 6 de tu versión.</p></div>
    <div class="note warn"><h3>Gerard sigue pendiente</h3>
      <p>Con <b>15 localizadas y 9 findes</b> desde junio es, con diferencia, el que menos acumula.
      Está fuera del reparto de noviembre, así que en diciembre debería entrar por delante de todos.</p></div>
  </div>
</section>

<footer>140 puestos · 26 residentes · rotación de UCQ intacta y contaje de
localizadas de junio a octubre como base · comprobado contra bloqueos de vacaciones,
curso R4 del día 30, libranza de la fiesta, tope de puentes, forma de las tandas y regla
de descanso: 0 conflictos</footer>
</div>
"""
ROTS={"Tony","Patricia","María","Carlota"}
def linea(r):
    g=r["ntx"]; f=r["finn12"]
    nm=r["name"].upper()+(' <span class="px">(UCQ)</span>' if r["name"] in ROTS else "")
    ex=""
    if r["lev"]=="R4":
        ex=f' <span class="px">({r["cnt"]["TX"]} Tx)</span>'
    elif r["lev"]=="R2" and r["name"] not in ROTS and r["cnt"]["UCQ"]:
        ex=f' <span class="px">({r["cnt"]["UCQ"]} UCQ)</span>'
    fw="finde" if f==1 else "findes"
    return f'<li><span class="nm">{nm}</span> {g} guardias, {f} {fw}{ex}</li>'
bloques=[]
for lv in ("R4","R3","R2","R1"):
    ls=sorted([r for r in rows if r["lev"]==lv], key=lambda r:(-r["ntx"], r["name"]))
    bloques.append(f'<section><h3>{lv}</h3><ul>'+"".join(linea(r) for r in ls)+'</ul></section>')

HTML = (HTML.replace("__RESUMEN__", "\n".join(bloques))
            .replace("__CAL__", "\n".join(cal))
            .replace("__BODY__", "\n".join(body))
            .replace("__R4TAB__", "\n".join(r4tab)))
open('guardias-noviembre-2026.html','w').write(HTML)
print("bytes:", len(HTML))
