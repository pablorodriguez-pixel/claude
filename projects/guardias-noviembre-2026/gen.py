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

# antes / ahora para las R4
OLD={"Carlota":dict(tx=4,ftx=1,fnd=5,tot=10),"Isabel":dict(tx=6,ftx=1,fnd=2,tot=9),
     "María":dict(tx=3,ftx=0,fnd=2,tot=9),"Almudena":dict(tx=5,ftx=1,fnd=2,tot=8),
     "Ana G.":dict(tx=5,ftx=1,fnd=3,tot=8),"Sandra":dict(tx=5,ftx=0,fnd=2,tot=8)}
by={r["name"]:r for r in rows}
def arrow(a,b,good_down=True):
    if a==b: return f'<span class="eq">{a} → {b}</span>'
    better = (b<a) if good_down else (b>a)
    return f'<span class="{"dn" if better else "up"}">{a} → {b}</span>'

r4tab=[]
for nm in ["Isabel","Almudena","Carlota","Sandra","Ana G.","María"]:
    o=OLD[nm]; r=by[nm]
    r4tab.append(f'''<tr>
<td class="c-name"><span class="lvl l-R4">R4</span> {nm}</td>
<td class="num">{arrow(o["tx"],r["cnt"]["TX"])}</td>
<td class="num">{arrow(o["ftx"],r["fint"])}</td>
<td class="num">{arrow(o["fnd"],r["fin"])}</td>
<td class="num">{arrow(o["tot"],r["nov"])}</td>
<td class="num strong">{r["ntx"]}</td></tr>''')

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
    <div class="eyebrow">Programación de residentes · v2</div>
    <h1>Guardias · Noviembre 2026</h1>
    <p>Reparto rehecho con los topes nuevos: R1 a 3 guardias, R3 a 6, nadie por encima
    de 6 sin contar trasplante, y una sola tanda de finde por R4. Los días 1 y 2 vienen
    del cuadrante de octubre y se muestran atenuados.</p>
  </div>
  <div class="meta">
    <span>Residentes</span><b>26 · 8 R1, 8 R2, 4 R3, 6 R4</b>
    <span>Puestos/día</span><b>5 · TX, UCQ, mayor + 2 QX</b>
    <span>Rotando en UCQ</span><b>Tony, Patricia, María, Carlota</b>
    <span>Base del reparto</span><b>Localizadas y findes acumulados</b>
  </div>
</header>

<dl class="strip">
  <div><dt>Puestos cubiertos</dt><dd>140 de 140</dd></div>
  <div><dt>Conflictos</dt><dd>0 — ningún bloqueo roto</dd></div>
  <div><dt>Tope R1</dt><dd>3 guardias · 1 finde</dd></div>
  <div><dt>Tope general</dt><dd>6 guardias sin TX</dd></div>
  <div><dt>Findes por R4</dt><dd>1 de guardia + 1 de TX</dd></div>
</dl>

<section>
  <div class="shead"><h2>Las cuatro tandas de trasplante</h2>
    <p>Cada tanda coge el finde entero de una tirada —viernes a domingo, y viernes a
    lunes en el puente—, así que mover una tanda mueve tres o cuatro días a la vez.
    Isabel y Carlota se quedan sin ninguna.</p></div>
  <ul class="tandas">
    <li class="hold"><span class="wk">vie 6 – lun 9 · puente</span>
      <span class="swap">Carlota → <b>Sandra</b></span>
      <span class="why">No hay salida limpia: María e Isabel están de vacaciones y
      Almudena y Ana G. libran el puente por llevar ya 2 de 3. Solo quedaban Carlota
      y Sandra, y Sandra es la que menos localizadas acumula de las dos.</span></li>
    <li><span class="wk">vie 13 – dom 15</span>
      <span class="swap">Ana G. → <b>Ana G.</b></span>
      <span class="why">Se mantiene: es una de las dos que menos localizadas llevan.
      Carlota, Isabel y María tienen esos días bloqueados de todas formas.</span></li>
    <li><span class="wk">vie 20 – dom 22</span>
      <span class="swap">Isabel → <b>María</b></span>
      <span class="why">María es la que menos localizadas acumula del servicio y es
      su primer finde de trasplante del bimestre.</span></li>
    <li><span class="wk">vie 27 – dom 29</span>
      <span class="swap">Almudena → <b>Almudena</b></span>
      <span class="why">Sandra está de vacaciones, Ana G. y María ya tienen tanda, y
      Carlota e Isabel quedaban excluidas por acumulado. Almudena era la única.</span></li>
  </ul>
</section>

<section>
  <div class="shead"><h2>Qué cambia para cada R4</h2>
    <p>Verde es bajada, rojo subida. La última columna es lo que cuenta para el tope de
    6: la localizada de trasplante no suma.</p></div>
  <div class="scroll"><table>
    <thead><tr><th>Residente</th><th class="num">Localizadas</th><th class="num">Findes de TX</th>
      <th class="num">Findes totales</th><th class="num">Guardias nov</th>
      <th class="num">Cuentan al tope</th></tr></thead>
    <tbody>
__R4TAB__
    </tbody>
  </table></div>
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
    <div class="note"><h3>Topes por nivel</h3>
      <p>Los <b>R1</b> bajan a <b>3 guardias</b> y un solo finde cada uno. Los
      <b>R3</b> suben a <b>6</b> los cuatro, incluido Tony, que sigue cubriendo la UCQ.
      Ningún residente pasa de <b>6 guardias sin contar trasplante</b>.</p>
      <p>Las R4 quedan entre 5 y 8 guardias totales, pero solo 2 o 3 cuentan para el
      tope: el resto es localizada.</p></div>
    <div class="note"><h3>Un solo finde por R4</h3>
      <p>Ninguna R4 hace más de <b>un finde de quirófano, UCQ o mayor</b>. Sandra, Ana G.,
      María y Almudena suman además su tanda de trasplante, así que van a dos findes;
      <b>Carlota e Isabel se quedan en uno solo</b>, que es lo que pedía el reparto.</p>
      <p>Carlota pasa de 5 findes en noviembre a 1. Es la corrección más grande del mes.</p></div>
    <div class="note"><h3>Tandas de trasplante</h3>
      <p>El trasplante va siempre en tandas consecutivas y las de finde cogen el bloque
      entero: <b>viernes a domingo</b>, o <b>viernes a lunes</b> en el puente. Las tandas
      de laborables reparten el resto en bloques de dos y tres días.</p>
      <p>Isabel baja de 6 localizadas a 2 y María sube de 3 a 6, que es la dirección que
      corrige el acumulado.</p></div>
    <div class="note warn"><h3>El viernes 6 y el domingo 8 no se pueden emparejar</h3>
      <p>El viernes 6 lo libran R1 y R2 por la fiesta, así que ese día solo pueden
      trabajar R3 y R4. Si el domingo 8 tuviera que llevar el mismo equipo, ese equipo
      tendría que estar disponible los dos días.</p>
      <p>El 8 es puente, y del pool de R3 y R4 caen Almudena y Ana G. (2 de 3 puentes),
      Candela, Isabel y María (vacaciones) y Fabián (bloqueado el 7 y el 8). Quedan
      cuatro personas para cinco puestos, y una de ellas —Sandra— ya está de
      trasplante toda la tanda.</p>
      <p>Se aplica por tanto tu alternativa: <b>el domingo 8 va a residentes
      pequeños</b> —Marc en UCQ, Fátima y Rosario en quirófano— con Tony de mayor,
      porque ese puesto solo lo puede firmar un R3 o una R4. La unión del sábado 7 con
      el lunes 9 se mantiene intacta.</p></div>
    <div class="note warn"><h3>El puente de trasplante no salía del trío</h3>
      <p>Pediste quitar las tandas de finde a Carlota, Isabel y Sandra. Tres de las
      cuatro salen: la del 13 y la del 27 ya estaban fuera y la del 20 pasa a María.</p>
      <p>La del puente no. El trasplante solo lo firma una R4, y de las seis, María e
      Isabel están de vacaciones del 1 al 9 y Almudena y Ana G. libran el puente por
      acumulado. Quedaban Carlota y Sandra. Va a <b>Sandra</b>, que de las dos es la
      que menos localizadas lleva y la que menos findes acumula.</p></div>
    <div class="note"><h3>Fiesta de bienvenida</h3>
      <p>El <b>viernes 6</b> no trabaja ningún R1 ni R2: lo cubren Sandra en trasplante,
      Tony en UCQ, Fabián de mayor y Almudena y Ana G. en quirófano.</p>
      <p>El <b>sábado 7</b> no lo trabaja ningún R1, y como va emparejado con el lunes
      festivo, el 9 lleva el mismo equipo: Patricia, Patri, Asís y Emilio.</p></div>
    <div class="note"><h3>Puentes y descansos</h3>
      <p>Nadie supera <b>2 de 3 puentes</b>. Almudena y Ana G. libran el del 9 completo
      —el viernes 6 no es puente, así que sí lo trabajan— y Carlota sale del puente por
      primera vez del bimestre.</p>
      <p>Nadie hace dos días presenciales seguidos. La localizada de trasplante puede
      pegarse a una guardia del día anterior, pero <b>nunca es víspera de guardia</b>.
      La regla cruza la frontera de mes: Tania, Fabián, Fátima y Miriam trabajaron el
      día 2 y no entran el 3.</p></div>
    <div class="note warn"><h3>Lo que cuesta bajar los R1 a 3</h3>
      <p>Los 112 puestos que no son trasplante tienen que caber en algún sitio. Con los
      R1 a 3 (24 puestos) y los R3 a 6 (24), y con las R4 limitadas a un finde y con la
      localizada por delante, <b>los R2 acaban los ocho a 6 guardias</b>: pasan de 4 a 6.</p>
      <p>Ese es el precio del reparto que has pedido. Si prefieres bajarles a 5, hay que
      subir a los R1 a 4 o dejar que alguna R4 haga un segundo finde.</p>
      <p>Por lo mismo, la <b>UCQ</b> deja de ser cosa de rotantes: Tony pone 5 y Patricia
      6, pero Carlota se queda en 3 y María en 2 porque el tope de las R4 se les va en
      trasplante. Los 12 días que sobran los cubren R2.</p></div>
  </div>
</section>

<footer>Reparto v2 · 140 puestos · 26 residentes · comprobado contra bloqueos de
vacaciones, curso R4 del día 30, libranza de la fiesta, tope de puentes y regla de
descanso: 0 conflictos</footer>
</div>
"""
HTML = (HTML.replace("__CAL__", "\n".join(cal))
            .replace("__BODY__", "\n".join(body))
            .replace("__R4TAB__", "\n".join(r4tab)))
open('guardias-noviembre-2026.html','w').write(HTML)
print("bytes:", len(HTML))
