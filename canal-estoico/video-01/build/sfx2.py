# Efectos de sonido sincronizados con el montaje v2: truenos, golpes, whooshes en cortes, olas y riser.
import numpy as np, wave, sys
SR=44100; D=57.5; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(11)
def lp(x,fc):
    a=np.broadcast_to(np.exp(-2*np.pi*np.asarray(fc,float)/SR),x.shape); y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s=(1-a[i])*v+a[i]*s; y[i]=s
    return y
def place(buf,at,sig):
    i=int(at*SR); e=min(N,i+len(sig)); buf[i:e]+=sig[:e-i]
def boom(g=1.0,f0=55):
    L=int(2.2*SR); tt=np.arange(L)/SR; f=f0*np.exp(-tt*2.5)+28
    return (np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*2.2)+lp(rng.standard_normal(L),600)*np.exp(-tt*18)*.8)*g
def thunder(g=1.0):
    L=int(3.5*SR); tt=np.arange(L)/SR
    crack=lp(rng.standard_normal(L),4000)*np.exp(-tt*14)*.9
    rumble=lp(lp(rng.standard_normal(L),180),120)*6*np.exp(-tt*1.1)*(1+.5*np.sin(tt*9))
    return (crack+rumble)*g
def whoosh(g=.5,L=.45):
    n=int(L*SR); tt=np.arange(n)/SR; x=rng.standard_normal(n)
    env=np.sin(np.pi*tt/L)**2
    lo=lp(x,800+3000*tt/L); return (x*.15+lo)*env*g
out=np.zeros(N)
for b in [0.55,3.4,9.24,9.62,18.3]: place(out,b-0.02,thunder(.9 if b in (9.24,0.55) else .55))
for h,g in [(0.05,1.2),(9.24,1.3),(19.18,1.0),(37.62,1.5),(41.2,1.2),(51.7,1.0)]: place(out,h,boom(g))
cuts=[2.82,5.42,7.10,10.75,12.01,14.00,16.39,18.15,22.26,24.60,28.10,29.85,31.55,33.65,37.45,43.90,51.65]
for c in cuts: place(out,c-0.3,whoosh(.45))
waves=lp(lp(rng.standard_normal(N),700),400)*(1+.6*np.sin(2*np.pi*t*.18))*1.4
wenv=np.clip(np.minimum((12.2-t)/.8,1),0,1)*(t<12.2)+np.clip(np.minimum((t-18.1)/.5,(22.4-t)/.5),0,1)*.6
out+=waves*wenv
riser=lp(rng.standard_normal(N),3000)*np.clip((t-32.5)/5.0,0,1)**2*(t<37.5)*.45
out+=riser
out/=np.max(np.abs(out))*1.05
st=np.stack([out,np.roll(out,int(.01*SR))*.95],1)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype('<i2').tobytes());w.close();print('ok')
