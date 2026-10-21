# Banda sonora sintetizada para la lección 1: drone grave, pulso, golpes y crescendo hacia la frase ancla.
import numpy as np, wave, sys
SR=44100; D=59.5; N=int(SR*D); t=np.arange(N)/SR
rng=np.random.default_rng(7)
def env(a,b,c,d):  # trapezoide: sube a..b, mantiene, baja c..d
    e=np.zeros(N); e+=np.clip((t-a)/max(b-a,1e-3),0,1); e*=np.clip((d-t)/max(d-c,1e-3),0,1); return e
def lp(x,fc):  # paso bajo de un polo
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    for i in range(0,len(x),4096):
        blk=x[i:i+4096]; o=np.empty_like(blk)
        for j,v in enumerate(blk): s=(1-a)*v+a*s; o[j]=s
        y[i:i+4096]=o
    return y
def saw(f,det=0.0):
    ph=np.cumsum(np.full(N,f*(1+det))/SR); return 2*(ph%1)-1
# Pad de cuerdas en re menor (D2 A2 D3 F3 A3), desafinado y filtrado
pad=np.zeros(N)
for f in [73.42,110.0,146.83,174.61,220.0]:
    for d in (-0.004,0.0,0.005): pad+=saw(f,d)
pad=lp(lp(pad,900),1400)/15
pad_env=0.35*env(0,3,36.6,37.7)+0.55*env(31.9,37.5,37.6,37.75)+0.45*env(38.0,39,52.8,54)+0.6*env(53.2,54,57.5,59.4)
pad*=pad_env
# Sub drone
sub=np.sin(2*np.pi*36.71*t)*0.25*(env(0,2,37.5,37.75)+env(38,40,58,59.4))
# Golpe grave (boom)
def boom(at,g=1.0,f0=55):
    x=np.zeros(N); i=int(at*SR); L=int(2.2*SR); tt=np.arange(L)/SR
    f=f0*np.exp(-tt*2.5)+28; ph=2*np.pi*np.cumsum(f)/SR
    b=np.sin(ph)*np.exp(-tt*2.2)
    nz=lp(rng.standard_normal(L),600)*np.exp(-tt*18)*0.8
    s=(b+nz)*g; e=min(N,i+L); x[i:e]=s[:e-i]; return x
# Pulso tipo taiko durante la historia, acelerando
pulse=np.zeros(N); tp=6.4
while tp<37.4:
    k=(tp-6.4)/31.0; pulse+=boom(tp,0.22+0.35*k,70)
    tp+=0.92-0.35*k
# Viento del naufragio
wind=lp(lp(rng.standard_normal(N),500),300)*env(5.5,8,12.5,15)*1.6
# Golpes en momentos clave
hits=boom(0.05,1.2)+boom(11.3,1.4)+boom(19.5,0.9)+boom(37.9,1.5)+boom(41.65,1.2)+boom(53.2,1.1)
# Riser (ruido que sube) antes de la frase ancla
riser=lp(rng.standard_normal(N),3000)*np.clip((t-33)/4.6,0,1)**2*(t<37.7)*0.35
mix=pad+sub+pulse*0.8+wind+hits*0.9+riser
if len(sys.argv)>2 and sys.argv[2]=='sfx': mix=wind+hits*0.9+riser
mix/=np.max(np.abs(mix))*1.05
st=np.stack([mix,np.roll(mix,int(0.012*SR))*0.96],1)  # ligero ensanchado estéreo
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st*32767).astype('<i2').tobytes()); w.close(); print('ok')
