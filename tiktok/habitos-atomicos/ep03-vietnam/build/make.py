import json,sys
v=sys.argv[1]
d=json.load(open(f'data_{v}.json'))
h=open('template.html').read().replace('__SUBS__',json.dumps(d['subs'],ensure_ascii=False)).replace('__T__',json.dumps(d['T'])).replace('__V__',v)
open('video.html','w').write(h)
