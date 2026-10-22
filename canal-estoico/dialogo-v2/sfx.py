# Diseño sonoro del episodio: lluvia, aparición, transiciones, pájaros, alarma, tarjetas y campana final.
import numpy as np, wave, sys
SR=44100; D=91.5; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(5)
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s=(1-a)*v+a*s; y[i]=s
    return y
def put(buf,at,sig,g=1.0):
    i=int(at*SR); e=min(N,i+len(sig)); buf[i:e]+=sig[:e-i]*g
def env(a,b,f=.5): return np.clip(np.minimum((t-a)/f,(b-t)/f),0,1)
out=np.zeros(N)
# lluvia (ruido filtrado + gotas)
rain=lp(rng.standard_normal(N),2500)*.25+lp(rng.standard_normal(N),600)*.5
drops=np.zeros(N)
for k in rng.uniform(0,72,900): put(drops,k,np.exp(-np.arange(400)/60)*rng.uniform(.2,.6)*np.sin(np.arange(400)*rng.uniform(.3,.8)))
out+=(rain+drops*.6)*env(0,72.2,1.0)*.55
# aparición de Marco: arpegio brillante
def shimmer(L=1.8):
    n=int(L*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for j,f in enumerate([523,659,784,1047,1319,1568]):
        st=j*.12; m=tt>=st; s[m]+=np.sin(2*np.pi*f*(tt[m]-st))*np.exp(-(tt[m]-st)*2.2)*.35
    s+=lp(rng.standard_normal(n),6000)*np.exp(-tt*2)*.08*np.sin(np.pi*tt/L)
    return s
put(out,13.8,shimmer(),1.0); put(out,78.1,shimmer(),.8); put(out,71.2,shimmer(1.2)[::-1],.6)
# whooshes
def whoosh(L=.7,g=1.0):
    n=int(L*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n); e=np.sin(np.pi*tt/L)**2
    a=np.exp(-2*np.pi*(500+3500*tt/L)/SR); y=np.empty(n); s=0.0
    for i in range(n): s=(1-a[i])*x[i]+a[i]*s; y[i]=s
    return y*e*g
for w in [27.25,34.85,71.5,5.0,14.4,38.7,81.7]: put(out,w,whoosh(),.9)
# pájaros (Roma y amanecer)
def chirp():
    n=int(.12*SR); tt=np.arange(n)/SR; f=2600+1800*np.sin(np.pi*tt/.12)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*tt/.12)**2*.25
for k in np.concatenate([rng.uniform(28,35,22),rng.uniform(74.2,91,40)]): put(out,k,chirp(),rng.uniform(.4,1))
# ticks de tarjetas y pasos
def tick():
    n=int(.08*SR); tt=np.arange(n)/SR; return (np.sin(2*np.pi*1400*tt)*np.exp(-tt*60)+lp(rng.standard_normal(n),3000)*np.exp(-tt*80)*.5)
for k in [41.0,42.2,43.7,44.5,44.9,45.8,46.1,46.5,51.5,55.2,61.6,68.3]: put(out,k,tick(),.8)
# alarma
for k in np.arange(72.4,74.3,.5):
    n=int(.18*SR); tt=np.arange(n)/SR; b=np.sign(np.sin(2*np.pi*1046*tt))*.18+np.sin(2*np.pi*2093*tt)*.1
    put(out,k,b*np.minimum(1,np.minimum(tt/.01,(.18-tt)/.02)))
# campana final
n=int(3*SR); tt=np.arange(n)/SR; bell=sum(np.sin(2*np.pi*f*tt)*a*np.exp(-tt*d) for f,a,d in [(523,.5,1.2),(1046,.25,1.8),(1568,.15,2.5),(2093,.08,3)])
put(out,82.0,bell,.9)
out/=np.max(np.abs(out))*1.05
st=np.stack([out,np.roll(out,int(.012*SR))*.95],1)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype('<i2').tobytes());w.close();print('ok')
