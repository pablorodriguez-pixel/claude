import json
d=json.load(open('../../build/data.json'))
h=open('template.html').read().replace('__SUBS__',json.dumps(d['subs'],ensure_ascii=False)).replace('__DUR__',str(d['T']['end']))
open('video.html','w').write(h)
