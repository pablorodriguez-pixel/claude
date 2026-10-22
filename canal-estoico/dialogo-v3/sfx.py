# Efectos y ambiente en pistas separadas (rain.wav = lluvia, fx.wav = acentos), para mezclarlos a niveles medidos.
import numpy as np, wave, sys
SR=44100; D=85.3; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(5)
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s=(1-a)*v+a*s; y[i]=s
    return y
def put(buf,at,sig,g=1.0):
    i=int(at*SR); e=min(N,i+len(sig)); buf[i:e]+=sig[:e-i]*g
def env(a,b,f=.8): return np.clip(np.minimum((t-a)/f,(b-t)/f),0,1)
def save(name,x):
    x=x/max(1e-9,np.max(np.abs(x)))*.9; st=np.stack([x,np.roll(x,int(.012*SR))*.95],1)
    w=wave.open(name,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype('<i2').tobytes());w.close()
# lluvia suave (solo de noche)
rain=lp(rng.standard_normal(N),1800)*.4
save('rain.wav',rain*env(0,66.6,1.2))
fx=np.zeros(N)
def shimmer(L=1.8):
    n=int(L*SR); tt=np.arange(n)/SR; s=np.zeros(n)
    for j,f in enumerate([523,659,784,1047,1319,1568]):
        st=j*.12; m=tt>=st; s[m]+=np.sin(2*np.pi*f*(tt[m]-st))*np.exp(-(tt[m]-st)*2.2)*.35
    return s
put(fx,11.2,shimmer()); put(fx,72.6,shimmer(),.8); put(fx,65.9,shimmer(1.2)[::-1],.6)
def whoosh(L=.6):
    n=int(L*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n); e=np.sin(np.pi*tt/L)**2
    a=np.exp(-2*np.pi*(500+3500*tt/L)/SR); y=np.empty(n); s=0.0
    for i in range(n): s=(1-a[i])*x[i]+a[i]*s; y[i]=s
    return y*e*.6
for w in [2.9,22.8,30.4,66.2,75.7]: put(fx,w,whoosh())
def chirp():
    n=int(.12*SR); tt=np.arange(n)/SR; f=2600+1800*np.sin(np.pi*tt/.12)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*tt/.12)**2*.2
for k in np.concatenate([rng.uniform(23.2,30.3,14),rng.uniform(68,85,24)]): put(fx,k,chirp(),rng.uniform(.4,.9))
def tick():
    n=int(.07*SR); tt=np.arange(n)/SR; return np.sin(2*np.pi*1300*tt)*np.exp(-tt*70)*.6
for k in [6.2,6.55,6.9,36.5,37.6,39.1,40.1,40.4,41.4,41.9,46.8,50.5,56.9,63.2]: put(fx,k,tick())
for k in np.arange(67.6,69.6,.5):
    n=int(.16*SR); tt=np.arange(n)/SR; b=np.sign(np.sin(2*np.pi*1046*tt))*.12+np.sin(2*np.pi*2093*tt)*.08
    put(fx,k,b*np.minimum(1,np.minimum(tt/.01,(.16-tt)/.02)))
n=int(3*SR); tt=np.arange(n)/SR; bell=sum(np.sin(2*np.pi*f*tt)*a*np.exp(-tt*d) for f,a,d in [(523,.5,1.2),(1046,.25,1.8),(1568,.15,2.5)])
put(fx,76.0,bell*.8)
save('fx.wav',fx); print('ok')
