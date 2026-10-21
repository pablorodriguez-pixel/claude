import json
d=json.load(open('data.json'))
h=open('template.html').read().replace('__SUBS__',json.dumps(d['subs'],ensure_ascii=False)).replace('__T__',json.dumps(d['T']))
open('video.html','w').write(h)
