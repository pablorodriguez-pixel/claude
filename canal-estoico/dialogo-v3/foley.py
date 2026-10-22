# Capas de foley y ambiente sincronizadas con la animación (pasos, cama, ropa, móvil, sala, ciudad, golpe del gancho).
import numpy as np, wave, json
SR=44100; D=85.3; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(9)
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    for i,v in enumerate(x): s=(1-a)*v+a*s; y[i]=s
    return y
def hp(x,fc): return x-lp(x,fc)
def put(buf,at,sig,g=1.0):
    i=int(at*SR); e=min(N,i+len(sig)); buf[i:e]+=sig[:e-i]*g
def burst(L,fc,dec): n=int(L*SR); tt=np.arange(n)/SR; return lp(rng.standard_normal(n),fc)*np.exp(-tt*dec)
def save(name,x):
    x=x/max(1e-9,np.max(np.abs(x)))*.9; st=np.stack([x,np.roll(x,int(.009*SR))*.96],1)
    w=wave.open(name,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype('<i2').tobytes());w.close()
S={s['id']:s for s in json.load(open('timing.json'))['seg']}
fol=np.zeros(N)
# golpe grave en el gancho (sub + cuerpo)
n=int(1.6*SR); tt=np.arange(n)/SR; f=55*np.exp(-tt*3)+32
put(fol,0.02,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*2.6)*1.0+burst(1.6,500,20)*.4)
put(fol,6.15,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*3)*.6)
# pasos al caminar (70.4–72.4, fase*7 → un paso cada ~0,45 s)
for k in np.arange(70.45,72.45,0.449): put(fol,k,burst(.12,900,45)*.9+np.sin(2*np.pi*90*np.arange(int(.12*SR))/SR)*np.exp(-np.arange(int(.12*SR))/SR*40)*.6)
# cama: crujido al levantarse y al sentarse
def creak(L=.5):
    n=int(L*SR); tt=np.arange(n)/SR; fq=180+60*np.sin(2*np.pi*3*tt)
    return np.sin(2*np.pi*np.cumsum(fq)/SR)*np.sign(np.sin(2*np.pi*23*tt))*.15*np.sin(np.pi*tt/L)+burst(L,1200,6)*.3
for k in [S['a2']['s']-.05, S['a4']['s']-.25, 66.6, 70.0]: put(fol,k,creak(),.8)
# roce de ropa en los gestos
def rustle(L=.35): n=int(L*SR); tt=np.arange(n)/SR; return hp(rng.standard_normal(n),2500)*np.sin(np.pi*tt/L)**2*.35
for k in [S['m2']['s']+.1, 34.6, 46.8, 50.5, 56.9, S['m6']['s']+.1, 72.6, 73.0, S['a2']['s']+.1]: put(fol,k,rustle())
# toques en el móvil
for k in [62.9,63.15,63.45,63.8]: put(fol,k,burst(.03,4000,200)*.7)
save('foley.wav',fol)
# ambiente: tono de sala + ciudad lejana (noche) y mañana tranquila
room=lp(lp(rng.standard_normal(N),250),180)*1.5
city=lp(rng.standard_normal(N),400)*(1+.3*np.sin(2*np.pi*t*.05))*.6
night=np.clip(np.minimum(t/1.0,(66.6-t)/1.0),0,1); day=np.clip((t-67.4)/1.0,0,1)
rome=np.clip(np.minimum((t-22.9)/.5,(30.6-t)/.5),0,1)
amb=room*(1-rome)+city*night*(1-rome)+lp(rng.standard_normal(N),900)*.3*rome+lp(rng.standard_normal(N),700)*.25*day
save('amb.wav',amb); print('ok')
