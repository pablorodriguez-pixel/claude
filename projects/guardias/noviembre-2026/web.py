# -*- coding: utf-8 -*-
import json, datetime
D = json.load(open('datos_web.json'))
CUA, PER, NOV_YA = D['cuadrante'], D['personas'], D['nov_ya']
PAREJAS = [tuple(x) for x in D['parejas']]
FEST = set(D['festivos'])
DISP = {"Fatima":"Fátima","Fabian":"Fabián","Asis":"Asís","Maria":"María","Ana R2":"Ana",
        "Ana G":"Ana G.","Almudena":"Almudena","Patricia":"Patricia"}
def nm(p): return DISP.get(p, p)
DOW = ["lun","mar","mié","jue","vie","sáb","dom"]
def dow(d): return datetime.date(2026,11,d).weekday()
def finde(d): return dow(d) >= 5 or d in FEST
PUENTE = {6,7,8,9}
par_de = {}
for a,b in PAREJAS:
    par_de[a] = par_de[b] = ("S+F" if a==7 else "V+D")
ROLES = [("TX","TX"),("UCQ","UCQ"),("MAYOR","MAY"),("QX2","QX"),("QX3","QX")]

# ---------- rejilla del mes ----------
celdas = []
for _ in range(6): celdas.append('<div class="day empty" aria-hidden="true"></div>')
for d in range(1, 31):
    k = str(d)
    cls = ["day"]
    if d in PUENTE: cls.append("puente")
    elif finde(d): cls.append("weekend")
    if d <= 2: cls.append("prev")
    tag = par_de.get(d) or ("S" if dow(d)==5 else "")
    eyebrow = '<span class="tag flag">fiesta</span>' if d == 6 else (
              '<span class="tag flag">puente</span>' if d in PUENTE else (
              f'<span class="tag">{tag}</span>' if tag else ''))
    if d <= 2:
        filas = "".join(f'<li><span class="rk rk-{r.lower()}">{lab}</span>'
                        f'<span class="who">{nm(p)}</span></li>'
                        for (r,lab),p in zip(ROLES, NOV_YA[k]))
        nota = '<div class="carry">del cuadrante de octubre</div>'
    else:
        filas = "".join(f'<li><span class="rk rk-{r.lower()}">{lab}</span>'
                        f'<span class="who">{nm(CUA[k][r])}</span></li>'
                        for r,lab in ROLES if r in CUA[k])
        n = len(CUA[k])
        nota = ('<div class="carry">quirófano: solo el mayor</div>' if n == 3 else
                '<div class="carry">quirófano con mayor + 1</div>' if n == 4 else "")
    celdas.append(f'''<div class="{' '.join(cls)}">
<div class="dhead"><span class="dnum">{d}</span><span class="dow">{DOW[dow(d)]}</span>{eyebrow}</div>
<ul class="roles">{filas}</ul>{nota}</div>''')
celdas.append('<div class="day empty" aria-hidden="true"></div>'*6)
GRID = "\n".join(celdas)

# ---------- tabla de control ----------
ORDEN = sorted(PER, key=lambda p: (PER[p]['nivel'], -PER[p]['nov'], p))
MAXN = max(v['nov'] for v in PER.values())
filas = []
for p in ORDEN:
    v = PER[p]
    desg = " ".join(f'<i class="chip c-{k}">{k.upper()} {v[k]}</i>'
                    for k in ("tx","ucq","may","qx") if v[k])
    prop = [x for x in v['bloq'] if not (p in ("Almudena","Ana G") and x in (6,7,8,9))]
    bloq = ", ".join(str(x) for x in prop) or "—"
    if p in ("Almudena","Ana G"):
        bloq += '<em class="exent">exenta puente 6-9</em>'
    pu = v['pu']
    filas.append(f'''<tr>
<td class="c-name"><span class="lvl l-{v['nivel']}">{v['nivel']}</span> {nm(p)}</td>
<td class="num">{v['oct']}</td><td class="num soft">{v['octfin']}</td>
<td class="num strong">{v['nov']}<span class="bar"><span style="width:{100*v['nov']/MAXN:.0f}%"></span></span></td>
<td class="num soft">{v['fin']}</td>
<td class="desg">{desg}</td>
<td class="num">{v['dos']}</td><td class="num soft">{v['dosfin']}</td>
<td class="num"><span class="pu p{pu}">{pu}/3</span></td>
<td class="bloq">{bloq}</td></tr>''')
TABLA = "\n".join(filas)

HTML = f'''<title>Guardias Noviembre 2026</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,500;0,700;1,500&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
:root {{
  --paper:#eef1f2; --surface:#ffffff; --surface-2:#e4e9ea; --line:#ccd6d8; --line-soft:#dee5e7;
  --ink:#16242b; --ink-2:#53656d; --ink-3:#87979e;
  --tx:#95571c; --ucq:#585089; --may:#1f6474; --qx:#4a5a62; --flag:#9c2c43;
  --tx-bg:#f6ece1; --ucq-bg:#eceaf5; --may-bg:#e2eff1; --qx-bg:#e8ecee; --flag-bg:#f8e6e9;
  --shadow:0 1px 2px rgba(22,36,43,.06), 0 8px 24px rgba(22,36,43,.05);
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --paper:#0e161b; --surface:#15212a; --surface-2:#1c2b34; --line:#2a3d47; --line-soft:#22323b;
    --ink:#e7eef0; --ink-2:#a4b4bb; --ink-3:#72868f;
    --tx:#dc9a5c; --ucq:#a49bdd; --may:#5cb2c3; --qx:#93a5ad; --flag:#e77e91;
    --tx-bg:#2c2015; --ucq-bg:#221f33; --may-bg:#12303a; --qx-bg:#1e2a30; --flag-bg:#331920;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.28);
  }}
}}
:root[data-theme="dark"] {{
  --paper:#0e161b; --surface:#15212a; --surface-2:#1c2b34; --line:#2a3d47; --line-soft:#22323b;
  --ink:#e7eef0; --ink-2:#a4b4bb; --ink-3:#72868f;
  --tx:#dc9a5c; --ucq:#a49bdd; --may:#5cb2c3; --qx:#93a5ad; --flag:#e77e91;
  --tx-bg:#2c2015; --ucq-bg:#221f33; --may-bg:#12303a; --qx-bg:#1e2a30; --flag-bg:#331920;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.28);
}}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--paper); color:var(--ink);
  font:400 15px/1.55 "Source Sans 3", "Helvetica Neue", Arial, sans-serif; }}
.wrap {{ max-width:1240px; margin:0 auto; padding:40px 24px 72px; }}
h1,h2,h3 {{ font-family:Bitter, Georgia, "Times New Roman", serif; text-wrap:balance; margin:0; }}
h1 {{ font-size:clamp(28px,4vw,42px); font-weight:700; letter-spacing:-.015em; line-height:1.08; }}
h2 {{ font-size:20px; font-weight:700; letter-spacing:-.01em; }}
h3 {{ font-size:15px; font-weight:700; }}
.eyebrow {{ font:600 11px/1 "IBM Plex Mono", ui-monospace, monospace;
  letter-spacing:.16em; text-transform:uppercase; color:var(--may); }}
header.top {{ border-bottom:2px solid var(--ink); padding-bottom:20px; margin-bottom:28px;
  display:flex; flex-wrap:wrap; gap:24px; align-items:flex-end; justify-content:space-between; }}
header.top p {{ margin:10px 0 0; color:var(--ink-2); max-width:56ch; }}
.meta {{ display:grid; grid-template-columns:auto auto; gap:2px 18px;
  font:400 12.5px/1.5 "IBM Plex Mono", ui-monospace, monospace; color:var(--ink-2); }}
.meta b {{ color:var(--ink); font-weight:600; }}
.strip {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); margin-bottom:36px; }}
.strip div {{ background:var(--surface); padding:13px 16px; }}
.strip dt {{ font:600 10.5px/1 "IBM Plex Mono", monospace; letter-spacing:.12em;
  text-transform:uppercase; color:var(--ink-3); margin-bottom:6px; }}
.strip dd {{ margin:0; font:600 15px/1.3 "Source Sans 3", sans-serif; font-variant-numeric:tabular-nums; }}
section {{ margin-bottom:44px; }}
.shead {{ display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; margin-bottom:16px;
  padding-bottom:8px; border-bottom:1px solid var(--line); }}
.shead p {{ margin:0; color:var(--ink-2); font-size:13.5px; }}
.scroll {{ overflow-x:auto; }}
.cal {{ display:grid; grid-template-columns:repeat(7,minmax(0,1fr)); gap:1px;
  background:var(--line-soft); border:1px solid var(--line); min-width:940px; }}
.cal .hd {{ background:var(--surface-2); padding:7px 10px; font:600 10.5px/1 "IBM Plex Mono", monospace;
  letter-spacing:.14em; text-transform:uppercase; color:var(--ink-2); }}
.day {{ background:var(--surface); padding:8px 9px 9px; min-height:132px; }}
.day.empty {{ background:var(--surface-2); min-height:0; padding:0; }}
.day.weekend {{ background:var(--surface-2); }}
.day.puente {{ background:var(--flag-bg); box-shadow:inset 3px 0 0 var(--flag); }}
.day.prev {{ opacity:.62; }}
.dhead {{ display:flex; align-items:baseline; gap:6px; margin-bottom:7px;
  padding-bottom:5px; border-bottom:1px solid var(--line-soft); }}
.dnum {{ font:600 17px/1 "IBM Plex Mono", monospace; font-variant-numeric:tabular-nums; }}
.dow {{ font:400 11px/1 "IBM Plex Mono", monospace; color:var(--ink-3); }}
.tag {{ margin-left:auto; font:600 9.5px/1 "IBM Plex Mono", monospace; letter-spacing:.08em;
  text-transform:uppercase; color:var(--ink-3); border:1px solid var(--line);
  padding:2px 4px; white-space:nowrap; }}
.tag.flag {{ color:var(--flag); border-color:var(--flag); }}
.roles {{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:2px; }}
.roles li {{ display:flex; align-items:baseline; gap:6px; font-size:13px; line-height:1.3; }}
.who {{ min-width:0; overflow-wrap:break-word; }}
.rk {{ flex:none; width:34px; font:600 9.5px/1.45 "IBM Plex Mono", monospace; letter-spacing:.04em;
  text-align:center; padding:2px 0; }}
.rk-tx  {{ color:var(--tx);  background:var(--tx-bg); }}
.rk-ucq {{ color:var(--ucq); background:var(--ucq-bg); }}
.rk-mayor {{ color:var(--may); background:var(--may-bg); }}
.rk-qx2, .rk-qx3 {{ color:var(--qx); background:var(--qx-bg); }}
.carry {{ margin-top:6px; font:400 10px/1.3 "IBM Plex Mono", monospace; color:var(--ink-3); }}
.legend {{ display:flex; flex-wrap:wrap; gap:8px 22px; margin-top:14px; font-size:13px; color:var(--ink-2); }}
.legend span b {{ color:var(--ink); }}
table {{ width:100%; border-collapse:collapse; font-size:13.5px; min-width:880px; }}
th, td {{ text-align:left; padding:7px 10px; border-bottom:1px solid var(--line-soft); vertical-align:middle; }}
thead th {{ font:600 10.5px/1.3 "IBM Plex Mono", monospace; letter-spacing:.1em;
  text-transform:uppercase; color:var(--ink-3); border-bottom:1px solid var(--ink); white-space:nowrap; }}
tbody tr:hover {{ background:var(--surface); }}
.num {{ font-family:"IBM Plex Mono", monospace; font-variant-numeric:tabular-nums; text-align:right;
  white-space:nowrap; }}
.num.soft {{ color:var(--ink-3); }}
.num.strong {{ font-weight:600; }}
.bar {{ display:inline-block; width:52px; height:5px; background:var(--surface-2);
  margin-left:8px; vertical-align:middle; }}
.bar span {{ display:block; height:100%; background:var(--may); }}
.c-name {{ white-space:nowrap; font-weight:600; }}
.lvl {{ display:inline-block; width:22px; font:600 10px/1.6 "IBM Plex Mono", monospace;
  text-align:center; color:var(--surface); background:var(--ink-2); margin-right:4px; }}
.l-R3, .l-R4 {{ background:var(--may); }}
.desg {{ white-space:nowrap; }}
.chip {{ font:600 9.5px/1.5 "IBM Plex Mono", monospace; font-style:normal; padding:2px 4px; margin-right:3px; }}
.chip.c-tx {{ color:var(--tx); background:var(--tx-bg); }}
.chip.c-ucq {{ color:var(--ucq); background:var(--ucq-bg); }}
.chip.c-may {{ color:var(--may); background:var(--may-bg); }}
.chip.c-qx {{ color:var(--qx); background:var(--qx-bg); }}
.pu {{ font-weight:600; }}
.pu.p2 {{ color:var(--flag); }}
.bloq {{ font-family:"IBM Plex Mono", monospace; font-size:11.5px; color:var(--ink-3);
  max-width:17ch; overflow-wrap:break-word; }}
.exent {{ display:block; font-style:normal; color:var(--flag); font-size:10.5px; margin-top:2px; }}
.notes {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(290px,1fr)); gap:1px;
  background:var(--line); border:1px solid var(--line); }}
.note {{ background:var(--surface); padding:18px 20px; }}
.note h3 {{ margin-bottom:8px; }}
.note p, .note li {{ margin:0 0 8px; color:var(--ink-2); font-size:13.5px; }}
.note ul {{ margin:0; padding-left:18px; }}
.note.warn {{ box-shadow:inset 3px 0 0 var(--flag); }}
.note.warn h3 {{ color:var(--flag); }}
footer {{ margin-top:8px; padding-top:16px; border-top:1px solid var(--line);
  font:400 12px/1.6 "IBM Plex Mono", monospace; color:var(--ink-3); }}
@media (max-width:640px) {{ .wrap {{ padding:24px 14px 48px; }} }}
</style>

<div class="wrap">
<header class="top">
  <div>
    <div class="eyebrow">Programación de residentes</div>
    <h1>Guardias · Noviembre 2026</h1>
    <p>Cuadrante del 3 al 30. Los días 1 y 2 ya venían asignados en el cuadrante de
    octubre (cola del puente del 31), y se muestran atenuados para referencia.</p>
  </div>
  <div class="meta">
    <span>Residentes</span><b>26 · 8 R1, 8 R2, 4 R3, 6 R4</b>
    <span>Puestos/día</span><b>5 · TX, UCQ, mayor + 2 QX</b>
    <span>Excepciones</span><b>Fiesta: viernes 6 mayor + 1, domingo 8 solo mayor</b>
    <span>Rotando en UCQ</span><b>Tony, Patricia, María, Carlota</b>
    <span>Base del reparto</span><b>Carga y findes de octubre</b>
  </div>
</header>

<dl class="strip">
  <div><dt>Puestos cubiertos</dt><dd>137 de 137</dd></div>
  <div><dt>Conflictos</dt><dd>0 — ningún bloqueo roto</dd></div>
  <div><dt>Puentes por persona</dt><dd>Máximo 2 de 3</dd></div>
  <div><dt>Guardias en noviembre</dt><dd>R1 3-4 · R2 3-4 · R3 6-7 · R4 7-10</dd></div>
</dl>

<section>
  <div class="shead"><h2>Cuadrante</h2>
    <p>El viernes y el domingo los hace el mismo equipo (<b>V+D</b>); el sábado, otro
    distinto, que repite el lunes festivo (<b>S+F</b>). Es la convención de vuestro
    octubre. El 6 y el 8 son la excepción: la fiesta de bienvenida rompe ese
    emparejamiento.</p></div>
  <div class="scroll"><div class="cal">
    <div class="hd">lunes</div><div class="hd">martes</div><div class="hd">miércoles</div>
    <div class="hd">jueves</div><div class="hd">viernes</div><div class="hd">sábado</div>
    <div class="hd">domingo</div>
{GRID}
  </div></div>
  <div class="legend">
    <span><b>TX</b> trasplante — solo R4</span>
    <span><b>UCQ</b> unidad de cirugía — rotantes y R2</span>
    <span><b>MAY</b> residente mayor — R3 o R4</span>
    <span><b>QX</b> quirófano — R1 y R2</span>
    <span><b>Puente</b> del 9 (Almudena) resaltado en rojo</span>
  </div>
</section>

<section>
  <div class="shead"><h2>Control por residente</h2>
    <p>Octubre es el saldo de partida: quien más cargó el mes pasado entra con menos
    findes este. La columna de puentes cuenta los tres del bimestre (12-oct, 31-oct, 9-nov).</p></div>
  <div class="scroll"><table>
    <thead><tr>
      <th>Residente</th><th class="num">Oct</th><th class="num">Findes oct</th>
      <th class="num">Nov</th><th class="num">Findes nov</th><th>Desglose noviembre</th>
      <th class="num">Total 2m</th><th class="num">Findes 2m</th><th class="num">Puentes</th>
      <th>Bloqueos nov</th>
    </tr></thead>
    <tbody>
{TABLA}
    </tbody>
  </table></div>
</section>

<section>
  <div class="shead"><h2>Reglas aplicadas</h2></div>
  <div class="notes">
    <div class="note"><h3>Puentes</h3>
      <p><b>Almudena</b> y <b>Ana G.</b> fueron las dos únicas personas que trabajaron
      los dos puentes de octubre, así que libran el del 9 completo — el viernes 6
      incluido, porque va emparejado con el domingo 8.</p>
      <p>Nadie más llegaba a dos, de modo que el techo de 2 de 3 se cumple sin excepciones.</p></div>
    <div class="note"><h3>Equidad</h3>
      <p>Se ha igualado primero <i>dentro</i> de noviembre (todos los R1 y R2 a 4
      guardias, R3 a 6, R4 a 8-9) y después se ha usado octubre para decidir quién
      cae en el extremo alto o bajo de cada banda, con más peso en los findes que en
      el total.</p>
      <p>Miriam, que venía de 7 guardias y 3 findes en octubre, no hace ningún finde
      en noviembre.</p></div>
    <div class="note"><h3>Descansos</h3>
      <p>Nadie hace dos días seguidos, salvo cuando uno de ellos es de trasplante:
      vuestro octubre lo permite (Carlota hizo quirófano el 7 y trasplante el 8, 9
      y 10 seguidos), así que el trasplante va en tandas y está exento.</p>
      <p>La regla cruza la frontera del mes: quien hizo guardia el <b>día 2</b> no entra
      el día 3. Por eso Tania, Fabián, Fátima y Miriam arrancan más tarde.</p></div>
    <div class="note"><h3>Fiesta de bienvenida</h3>
      <p>El <b>viernes 6</b> no trabaja ningún R1 ni R2. El <b>sábado 7</b> no lo
      trabaja ningún R1, y como va emparejado con el lunes festivo, tampoco el 9.</p>
      <p>El domingo 8 también queda sin R1 ni R2. Solo hay cuatro personas elegibles y
      una está siempre comprometida con el sábado, así que ese día el quirófano va
      <b>solo con el mayor</b>, sin residentes acompañantes.</p></div>
    <div class="note"><h3>Localizada de trasplante</h3>
      <p>Ninguna R4 tiene el trasplante la víspera de una guardia ni la víspera de un
      bloqueo de vacaciones. El trasplante sigue yendo en tandas, y una tanda puede
      pegarse a una guardia del día anterior, pero nunca a la del día siguiente.</p></div>
    <div class="note"><h3>UCQ</h3>
      <p>Los cuatro rotantes hacen 6 guardias cada uno: un finde de V+D, otro de
      sábado y el resto laborables. Los 4 días que sobran (18, 23, 26 y 30) los
      cubren R2.</p>
      <p>El 6 y el 8 los lleva Tony y no Patricia: la fiesta veta a los R2 el viernes,
      y Patricia lo es.</p></div>
    <div class="note warn"><h3>Lo que cuesta la fiesta</h3>
      <p>El viernes 6, sin R1 ni R2, solo quedan <b>cinco</b> personas elegibles —
      Carlota, Fabián, Patri, Sandra y Tony— y son justo las cinco que hacen falta.
      Pero quien trabaja el viernes no puede trabajar el sábado, y esas cinco agotan
      también el pool de mayores del 7.</p>
      <p>El domingo 8 es peor: solo quedan <b>cuatro</b> elegibles, y una de ellas está
      siempre comprometida con el sábado y su lunes festivo.</p>
      <p>Por eso el quirófano se recorta: <b>mayor + 1 el viernes</b> y <b>solo el mayor
      el domingo</b>. El mes queda en 137 puestos en vez de 140. Es el único ajuste que
      no incumple otra norma; las alternativas eran levantar la exención del puente a
      Almudena o Ana G. —irían a 3 de 3 puentes— o dejar que un R2 entrase esos días.</p></div>
    <div class="note warn"><h3>Dos desequilibrios que no se pueden cerrar</h3>
      <p><b>María</b> no tiene ninguna guardia en octubre, así que su acumulado del
      bimestre (9) queda por debajo del resto de R4 (16-21) por mucho que se le
      cargue noviembre. Compensarlo de golpe exigiría ponerle 16 guardias en un mes.</p>
      <p><b>Carlota</b> acaba con 10 guardias y 5 findes porque el trasplante del
      puente solo lo podía hacer ella: Sandra es el mayor del sábado y la norma nueva
      le prohíbe la localizada la víspera. Bajar el tope a 9 deja el puente sin
      solución.</p>
      <p>Y los <b>75 puestos que solo pueden hacer R3 o R4</b> entre 10 personas dan
      7,5 de media frente a 3,9 de un R1. Es estructural: no se arregla repartiendo
      mejor, solo cambiando quién puede cubrir trasplante o el puesto de mayor.</p></div>
  </div>
</section>

<footer>Generado el 2 de septiembre de 2026 · 137 puestos · 26 residentes ·
bloqueos de vacaciones y curso R4 del día 30 respetados al 100 %</footer>
</div>
'''
open('guardias-nov-2026.html','w').write(HTML)
print("escrito", len(HTML), "bytes")
