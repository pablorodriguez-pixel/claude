import sys,json,urllib.request,urllib.parse,time,re
UA={'User-Agent':'NoSaleLaCuentaBot/1.0 (educational video project; contact: pablo.rodriguezrim@gmail.com)'}
def api(**p):
    p['format']='json'; u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(p)
    for i in range(4):
        try: return json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30))
        except Exception as e: time.sleep(4*(i+1)); err=e
    raise err
# uso: fetchimg.py nombre "consulta" -> img/nombre.jpg + línea en img/CREDITS.txt
name,q=sys.argv[1],sys.argv[2]
r=api(action='query',generator='search',gsrsearch=q+' filetype:bitmap',gsrnamespace=6,gsrlimit=12,prop='imageinfo',iiprop='url|extmetadata|size',iiurlwidth=1400)
best=None
for pg in sorted(r.get('query',{}).get('pages',{}).values(),key=lambda x:x['index']):
    ii=pg['imageinfo'][0];md=ii['extmetadata'];lic=md.get('LicenseShortName',{}).get('value','')
    if ii['width']<1200 or not re.search(r'CC|Public|PD',lic) or 'NC' in lic: continue
    best=(pg['title'],ii,md,lic);break
if not best: print('NADA',q);sys.exit(1)
t,ii,md,lic=best
data=urllib.request.urlopen(urllib.request.Request(ii['thumburl'],headers=UA),timeout=60).read()
open(f'img/{name}.jpg','wb').write(data)
art=re.sub('<[^>]+>','',md.get('Artist',{}).get('value','?'))
open('img/CREDITS.txt','a').write(f"{name}: {t} — {art} — {lic}\n")
print('ok',name,t,lic,len(data))
time.sleep(3)
