// EP04 — «Interés compuesto»: 500 € al mes al 10 % ≈ un millón en 30 años; lo que más importa es cuándo empiezas.
// Una idea por frase, oro (lo que crece) contra frío (lo que pones o lo que pierdes). Estaciones a lo largo de x.
import {THREE,W,H,cl,eio,eo,p,lerp,R,C,proj,tag} from '../build/lib.js';
const $=id=>document.getElementById(id);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const r=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
r.setSize(W,H);r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.2;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;
$('gl').appendChild(r.domElement);
$('gl').style.filter='contrast(1.22) saturate(1.3) brightness(1.02)';
{const v=document.createElement('div');v.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 75% 60% at 50% 48%,rgba(0,0,0,0) 55%,rgba(0,0,0,.72) 100%)';$('gl').after(v)}
await document.fonts.ready;

// ───────── voz y cámara ─────────
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]/g,'').toLowerCase();
function vt(w,n=1){let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw new Error('palabra '+w)}
const cam=new THREE.PerspectiveCamera(60,W/H,.02,300);
// claves [t, [pos], [mira]]; dos claves seguidas con el mismo t = corte
function ruta(t,K){let i=0;while(i<K.length-1&&t>=K[i+1][0])i++;const a=K[i],b=K[Math.min(i+1,K.length-1)];
  const u=b[0]>a[0]?eio(cl((t-a[0])/(b[0]-a[0]))):0;cam.position.copy(V(...a[1]).lerp(V(...b[1]),u));cam.lookAt(V(...a[2]).lerp(V(...b[2]),u));cam.updateMatrixWorld()}

// ───────── materiales ─────────
const S=new THREE.Scene();
const tex=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t};
function plate(txt,sub,col='#ffffff',w=1.1,bg='rgba(12,15,30,.92)'){const t=tex(1024,sub?360:240,(g,W_,H_)=>{g.fillStyle=bg;g.beginPath();g.roundRect(8,8,W_-16,H_-16,60);g.fill();
  g.strokeStyle='rgba(255,255,255,.14)';g.lineWidth=6;g.stroke();g.fillStyle=col;let fs=120;g.font=`800 ${fs}px Figtree, sans-serif`;while(g.measureText(txt).width>W_-90){fs-=6;g.font=`800 ${fs}px Figtree, sans-serif`}g.textAlign='center';g.textBaseline='middle';g.fillText(txt,W_/2,sub?130:H_/2+6);
  if(sub){g.fillStyle='rgba(255,255,255,.78)';g.font='700 72px Figtree, sans-serif';g.fillText(sub,W_/2,262)}});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w*(sub?360:240)/1024),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));m.renderOrder=5;S.add(m);return m}
const coinTex=tex(256,256,(g)=>{const gr=g.createRadialGradient(110,100,10,128,128,128);gr.addColorStop(0,'#fff1b0');gr.addColorStop(.5,'#f2b93b');gr.addColorStop(1,'#a8701a');g.fillStyle=gr;g.fillRect(0,0,256,256);
  g.strokeStyle='rgba(120,70,10,.7)';g.lineWidth=12;g.beginPath();g.arc(128,128,106,0,7);g.stroke();g.fillStyle='rgba(110,64,8,.9)';g.font='900 150px Figtree, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('€',128,136)});
const gold=new THREE.MeshStandardMaterial({color:'#e2ab3c',metalness:.85,roughness:.28,emissive:'#3a2405'});
const coinMat=[gold,new THREE.MeshStandardMaterial({map:coinTex,metalness:.55,roughness:.35,emissive:'#2a1a04'}),new THREE.MeshStandardMaterial({map:coinTex,metalness:.55,roughness:.35,emissive:'#2a1a04'})];
const coldCoin=new THREE.MeshStandardMaterial({color:'#7d8494',metalness:.7,roughness:.45});
const CR=.075,CH=.022,coinGeo=new THREE.CylinderGeometry(CR,CR,CH,32);
const glowTex=tex(256,256,(g)=>{const gr=g.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(255,190,80,.9)');gr.addColorStop(.35,'rgba(255,160,40,.35)');gr.addColorStop(1,'rgba(255,140,30,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)});
function glow(x,y,z,s,a=1){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:a}));m.position.set(x,y,z);m.scale.set(s,s,1);S.add(m);return m}
function foco(x,z,col,int,ang=.42,h=5.5){const l=new THREE.SpotLight(col,int,16,ang,.55,1.6);l.position.set(x+.6,h,z+2.2);l.target.position.set(x,.4,z);l.castShadow=true;l.shadow.mapSize.set(1024,1024);l.shadow.bias=-.0004;S.add(l,l.target);return l}

// ───────── estudio ─────────
{const bg=tex(16,512,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#010103');gr.addColorStop(.5,'#06071a');gr.addColorStop(.78,'#1a1238');gr.addColorStop(1,'#040309');g.fillStyle=gr;g.fillRect(0,0,w,h)});
 S.add(new THREE.Mesh(new THREE.SphereGeometry(150,48,24),new THREE.MeshBasicMaterial({map:bg,side:THREE.BackSide,depthWrite:false})));
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshStandardMaterial({color:'#0b0c13',roughness:.55,metalness:.25}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;S.add(fl);
 S.add(new THREE.HemisphereLight('#6070d0','#100804',.42));
 const key=new THREE.DirectionalLight('#fff0dc',1.0);key.position.set(-6,14,10);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-20,right:80,top:30,bottom:-80,far:90});S.add(key);
 const rim=new THREE.DirectionalLight('#7f8cff',2.2);rim.position.set(6,5,-8);S.add(rim)}


// ───────── piezas ─────────
function jar(x,z,label,sub,labelCol,cold=false,big=1){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(big);
  const glass=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,1.1,48,1,true),new THREE.MeshStandardMaterial({color:cold?'#8ea6c8':'#ffe2a0',transparent:true,opacity:cold?.18:.28,roughness:.05,metalness:.1,side:THREE.DoubleSide,depthWrite:false}));glass.position.y=.55;
  const rimT=new THREE.Mesh(new THREE.TorusGeometry(.42,.025,12,64),gold);rimT.rotation.x=Math.PI/2;rimT.position.y=1.1;
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.04,48),new THREE.MeshStandardMaterial({color:'#9fc6e0',transparent:true,opacity:.4}));base.position.y=.02;
  g.add(glass,rimT,base);const N=140,im=new THREE.InstancedMesh(coinGeo,cold?[coldCoin,coldCoin,coldCoin]:coinMat,N);im.castShadow=true;g.add(im);
  const pl=plate(label,sub,labelCol);pl.position.set(x,1.45*big,z);
  g.userData={pl,fill(n){const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<N;i++){const layer=Math.floor(i/7),j=i%7;const a=j===0?0:(j-1)/6*Math.PI*2+layer*.6,rr=j===0?0:.2;const s=i<n?1:0;
    q.setFromEuler(new THREE.Euler(.06*Math.sin(i),i,.06*Math.cos(i*1.3)));M.compose(V(Math.cos(a)*rr,.05+layer*CH*1.05,Math.sin(a)*rr),q,V(s,s,s));im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}};
  g.userData.fill(0);S.add(g);return g}
const redMat=new THREE.MeshStandardMaterial({color:'#ff4b3e',emissive:'#5a0d08',metalness:.4,roughness:.4});
const blueCoin=new THREE.MeshStandardMaterial({color:'#4a66c9',metalness:.6,roughness:.4,emissive:'#0b1640'});
// una pila de monedas instanciada (n monedas, escala s); color opcional
function pila(x,z,s,mat=coinMat,N=200,w=1){const im=new THREE.InstancedMesh(coinGeo,mat,N);im.position.set(x,0,z);im.scale.set(s*w,s,s*w);im.castShadow=true;S.add(im);im.frustumCulled=false;
  im.userData.set=(n,from=0)=>{const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<N;i++){const s_=i>=from&&i<n?1:0;q.setFromEuler(new THREE.Euler(0,i*.7,0));M.compose(V(Math.sin(i*2.1)*.004,.011+i*CH*1.02,0),q,V(s_,s_,s_));im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true};im.userData.set(0);return im}
const STEP=CH*1.02;   // altura de una moneda (sin escalar)
const r10=Math.pow(1.1,1/12)-1,fv=y=>{let b=0;for(let i=0;i<Math.round(y*12);i++)b=b*(1+r10)+500;return b};

// A · la torre del millón (hook y cierre)
const TA=pila(0,0,3,coinMat,190,2.2);const PLA=plate('1.000.000 €','¿cuántos años?','#ffd77a',3.0);PLA.position.set(0,9.2,0);
foco(0,0,'#ffbf55',300,.5,9);const GA=glow(0,9,-.5,6,.8);
const BILL=[...Array(8)].map(()=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.88),new THREE.MeshStandardMaterial({map:tex(512,280,(g)=>{const gr=g.createLinearGradient(0,0,512,280);gr.addColorStop(0,'#c7a3e8');gr.addColorStop(1,'#8b5fc4');g.fillStyle=gr;g.fillRect(0,0,512,280);g.fillStyle='#fff';g.font='900 120px Figtree';g.fillText('500',30,150);g.font='800 46px Figtree';g.fillText('EURO',40,230)}),side:THREE.DoubleSide}));S.add(m);m.visible=false;return m});

// B · treinta años, una pila por año
const YB=[...Array(30)].map((_,i)=>pila(10+i*.36,0,1.5,i<10?coinMat:coinMat,190));foco(15,0,'#ffd7a0',260,.7,9);
const YMAX=190,ySc=n=>Math.max(1,Math.round(fv(n)/1e6*YMAX));

// C · el millón partido en dos: lo que pones tú (frío) y los intereses (oro)
const CB=pila(28,0,3.5,[blueCoin,blueCoin,blueCoin],60,2.4),CG=pila(28,0,3.5,coinMat,190,2.4);
const PLC1=plate('TÚ PUSISTE','180.000 €','#c9d3e6',2.1),PLC2=plate('INTERESES','820.000 €','#ffd77a',2.1);
foco(28,0,'#ffbf55',300,.45,10);foco(28,0,'#8fa6ff',60,.5,4);

// D · el dinero que gana dinero: 1 → 2 → 4 → 8 → 16
const GEN=[];for(let g_=0;g_<5;g_++){const n=1<<g_;for(let i=0;i<n;i++){const m=new THREE.Mesh(coinGeo,coinMat);m.scale.setScalar(2.4);m.rotation.x=Math.PI/2;m.position.set(40+(i-(n-1)/2)*(.42),.5+g_*.62,0);m.castShadow=true;S.add(m);m.visible=false;GEN.push({m,g:g_})}}
foco(40,0,'#ffbf55',220,.6,8);

// E · la bola de nieve: rueda cuesta abajo y crece
const SLOPE=new THREE.Mesh(new THREE.BoxGeometry(4,.2,26),new THREE.MeshStandardMaterial({color:'#e8edf6',roughness:.9}));SLOPE.rotation.x=.32;SLOPE.position.set(52,4.3,-10);SLOPE.material.emissive=new THREE.Color('#1c2232');SLOPE.receiveShadow=true;S.add(SLOPE);
const BALL=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),new THREE.MeshStandardMaterial({map:coinTex,color:'#ffd06a',metalness:.7,roughness:.3,emissive:'#3a2405'}));BALL.castShadow=true;S.add(BALL);
const SIGNS=[['10 AÑOS','100.000 €'],['20 AÑOS','360.000 €'],['30 AÑOS','1.000.000 €']].map(([a,b],i)=>{const p_=plate(a,b,i==2?'#ffd77a':'#ffffff',1.6);p_.position.set(54.6,0,0);return p_});
foco(52,-4,'#ffe2b8',200,.8,14);
const surf=z=>4.3+.1/Math.cos(.32)-(z+10)*Math.tan(.32);   // altura de la cuesta en z (baja hacia +z)

// F · empezar hoy o dentro de diez años
const FH=pila(62.8,0,2.6,coinMat,190,2.4),FL=pila(65.4,0,2.6,[coldCoin,coldCoin,coldCoin],190,2.4);
const PF1=plate('EMPIEZAS HOY','1.000.000 €','#ffd77a',1.7),PF2=plate('10 AÑOS TARDE','360.000 €','#c9d3e6',1.7);
foco(63,0,'#ffbf55',300,.35,9);foco(65.2,0,'#8fa6ff',70,.3,7);

// G · cada día que esperas: el calendario pierde hojas que se van en rojo
const CAL=new THREE.Group();CAL.position.set(76,0,0);S.add(CAL);
const calTex=d=>tex(512,512,(g)=>{g.fillStyle='#f4efe6';g.fillRect(0,0,512,512);g.fillStyle='#c0392b';g.fillRect(0,0,512,120);g.fillStyle='#fff';g.font='800 70px Figtree';g.textAlign='center';g.fillText('ESPERAR',256,88);g.fillStyle='#1b1b22';g.font='900 260px Figtree';g.fillText(String(d),256,400)});
const PAGES=[...Array(8)].map((_,i)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.2),new THREE.MeshStandardMaterial({map:calTex(i+1),side:THREE.DoubleSide}));m.position.set(0,1.6,.02*(8-i));CAL.add(m);return m});
const CALB=new THREE.Mesh(new THREE.BoxGeometry(2.3,2.3,.3),new THREE.MeshStandardMaterial({color:'#2a2d3d'}));CALB.position.set(0,1.6,-.18);CAL.add(CALB);
const REDC=[...Array(16)].map(()=>{const c=new THREE.Mesh(coinGeo,redMat);c.scale.setScalar(2);S.add(c);c.visible=false;return c});
foco(76,0,'#ffe2b8',200,.5,8);

// H · tus vehículos: la remunerada para mañana, el indexado para dentro de 30 años
const VJ1=jar(87.9,0,'REMUNERADA','para mañana','#ffd77a'),VJ2=jar(90.1,0,'INDEXADO','para dentro de 30 años','#ffd77a',false,1.25);
VJ1.userData.fill(40);VJ2.userData.fill(80);foco(87.9,0,'#ffbf55',200,.3);foco(90.1,0,'#ffbf55',260,.32);glow(90.1,.8,-.4,3,.8);glow(87.9,.7,-.4,2.4,.6);

S.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false});

// ───────── tiempos ─────────
const T={mes:vt('mes'),si:vt('si',2),diez:vt('10 %'),treinta:vt('treinta'),y:vt('y'),puesto:vt('puesto'),ciento:vt('ciento'),resto:vt('resto'),compuesto:vt('compuesto'),tu:vt('tu',2),
  gana:vt('gana'),gana2:vt('gana',2),bola:vt('bola'),diez2:vt('diez'),cien:vt('cien'),veinte:vt('veinte'),dispara:vt('dispara'),millon3:vt('millon',3),por:vt('por'),cuando:vt('cuando'),
  si3:vt('si',3),tarde:vt('tarde'),millon4:vt('millon',4),cada:vt('cada'),doscientos:vt('doscientos'),por2:vt('por',2),mover:vt('mover'),remunerada:vt('remunerada'),fondo:vt('fondo'),
  sig:vt('sigueme'),hoy:vt('hoy')};
const K=[
  [0,[3.4,1.0,8.4],[0,4.6,0]],[T.mes+.3,[3,1.4,7.4],[0,5,0]],[T.si-.05,[2.6,2,6.6],[0,5.6,0]],
  [T.si,[11,1.6,6.4],[11.5,.8,0]],[T.treinta-.6,[18,4.2,9.6],[18,2.4,0]],[T.y-.05,[19.5,5.6,11.6],[18.5,3.6,0]],
  [T.y,[31,3,9],[28,2.2,0]],[T.ciento+.6,[31.6,3.2,10],[28,2.4,0]],[T.resto+.8,[32.6,7,20],[28,7.4,0]],[T.tu-.05,[32.6,7.2,20],[28,7.6,0]],
  [T.tu,[40,2.2,7.2],[40,2.0,0]],[T.bola-.05,[40,2.8,8.6],[40,2.5,0]],
  [T.bola,[58,7,8],[52,4,-6]],[T.dispara+.4,[59,3.8,8],[52,2.4,0]],[T.por-.05,[59,4,9],[52,2.6,1]],
  [T.por,[64.1,4,12],[64.1,3.5,0]],[T.tarde+.6,[64.1,5.4,15],[64.1,5,0]],[T.cada-.05,[64.1,5.6,15.4],[64.1,5.2,0]],
  [T.cada,[76,2.2,7.4],[76,1.8,0]],[T.por2-.05,[76.6,2.6,8.4],[76,2.0,0]],
  [T.por2,[89,2.0,5.6],[89,1.1,0]],[T.fondo+.6,[89.4,2.1,5.6],[89.4,1.2,0]],[T.sig-.05,[89,2.2,6],[89,1.2,0]],
  [T.sig,[3.4,1.0,8.4],[0,4.6,0]],[DUR,[3,1.8,7.6],[0,6.6,0]]];

const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
const pill=(id,y,html,k,cls='')=>{if(k<=0)return;const e=$(id);e.className='ov tag '+cls;tag(e,{x:540,y,on:true},html,k)};

window.render=function(t){
  for(const id of OV)$(id).style.opacity=0;
  ruta(t,K);
  // A: 500 € al mes caen sobre la torre; arriba, el millón
  const inA=t<T.si||t>=T.sig;
  TA.userData.set(inA?Math.round(t<T.si?lerp(16,46,eo(p(t,.2,T.si))):lerp(46,134,eo(p(t,T.sig,DUR-T.sig)))):0);PLA.visible=inA;
  BILL.forEach((m,i)=>{const t0=(t<T.si?.3:T.sig+.2)+i*.55,k=p(t,t0,.6);m.visible=inA&&k>0&&k<1;const top=(t<T.si?lerp(16,46,eo(p(t0+.6,.2,T.si))):lerp(46,134,eo(p(t0+.6,T.sig,DUR-T.sig))))*STEP*3;m.position.set(Math.sin(i)*.3,lerp(top+4,top+.05,eo(k)),Math.cos(i)*.25);m.rotation.set(-Math.PI/2+Math.sin(t*6+i)*.4,i,(1-k)*2)});
  pill('cnt',700,'<b>500 €</b><small>al mes</small>',p(t,vt('quinientos')-.05,.25)*(1-p(t,T.si-.2,.2)),'big');
  // B: treinta pilas, una por año; crecen cada vez más deprisa
  const kB=p(t,T.si+.2,T.treinta-T.si+.3);YB.forEach((im,i)=>im.userData.set(t>=T.si-.1&&t<T.y+.5?Math.round(ySc(i+1)*eo(cl(kB*30-i))):0));
  pill('cnt',380,'<b>≈ 30 años</b><small>al 10 % anual (supuesto, no garantizado)</small>',p(t,T.treinta-.05,.25)*(1-p(t,T.y-.2,.2)),'big');
  // C: el millón partido en dos
  const inC=t>=T.y-.1&&t<T.tu+.4,nb=Math.round(190*.18);CB.userData.set(inC?nb:0);CG.userData.set(inC?Math.round(lerp(nb,190,eo(p(t,T.resto,1.4)))):0,nb);
  CG.visible=t>=T.resto-.1;PLC1.visible=PLC2.visible=inC;PLC1.position.set(30.2,nb*STEP*3.5*.5,0);PLC2.position.set(30.2,(nb+(190-nb)*.6)*STEP*3.5,0);PLC1.material.opacity=eo(p(t,T.puesto,.3));PLC2.material.opacity=eo(p(t,T.compuesto-.2,.3));
  pill('cnt',380,'<b>interés compuesto</b>',p(t,T.compuesto-.05,.25)*(1-p(t,T.tu-.2,.2)),'big');
  // D: monedas que fabrican monedas
  const gTimes=[T.tu+.1,T.gana,T.gana+.6,T.gana2,T.gana2+.5];GEN.forEach(({m,g})=>{const k=eo(p(t,gTimes[g],.35));m.visible=k>0&&t<T.bola+.3;m.scale.setScalar(2.4*k)});
  // E: la bola de nieve
  const zb=lerp(-20,2,eio(p(t,T.bola,T.dispara+.5-T.bola))),rb=lerp(.25,1.35,Math.pow(p(t,T.bola,T.dispara+.6-T.bola),1.8));
  BALL.position.set(52,Math.max(rb,surf(zb)+rb),zb);BALL.scale.setScalar(rb);BALL.rotation.x=-zb/rb*.8;BALL.visible=t>=T.bola-.1&&t<T.por;
  [T.cien,T.veinte+.4,T.dispara+.3].forEach((t0,i)=>{const s_=SIGNS[i],z=[-12,-5,1.5][i];s_.position.set(54.4,surf(z)+1.5,z);s_.material.opacity=eo(p(t,t0-.1,.3));s_.visible=t>=T.bola&&t<T.por});
  // la cámara sigue a la bola de nieve mientras rueda
  if(t>=T.bola&&t<T.por){const b=BALL.position;cam.position.set(b.x+6.5+rb,b.y+2.4+rb,b.z+5.5+rb*1.5);cam.lookAt(b.x+.4,b.y+.6,b.z-1.2);cam.updateMatrixWorld()}
  // F: dos torres — empezar hoy o diez años tarde
  const kF=eo(p(t,T.por+.2,1.6));FH.userData.set(t>=T.por-.1&&t<T.cada+.3?Math.round(186*kF):0);FL.userData.set(t>=T.por-.1&&t<T.cada+.3?Math.round(67*eo(p(t,T.tarde-.2,1.2))):0);
  PF1.position.set(62.8,186*kF*STEP*2.6+.9,0);PF2.position.set(65.4,67*eo(p(t,T.tarde-.2,1.2))*STEP*2.6+.9,0);PF1.visible=PF2.visible=t>=T.por&&t<T.cada;PF2.material.opacity=eo(p(t,T.tarde-.3,.3));
  pill('big',380,'<b>−640.000 €</b> por esperar 10 años',p(t,T.millon4-.1,.25)*(1-p(t,T.cada-.2,.2)),'red');
  // G: se arrancan días del calendario; cada uno, −270 € en rojo
  PAGES.forEach((m,i)=>{const t0=T.cada+.2+i*.42,k=eo(p(t,t0,.7));m.position.set(k*(i%2?2.5:-2.5),1.6+k*3,.02*(8-i)+k*1.5);m.rotation.set(k*1.2,k*(i%2?1:-1)*2,k*.8);m.visible=k<1});
  REDC.forEach((c,i)=>{const t0=T.cada+.35+i*.2,k=(t-t0)/.9;c.visible=k>0&&k<1&&t<T.por2+.2;if(c.visible){c.position.set(76+Math.sin(i*1.7)*1.4*k,1.8+k*2.6,1+k*1.2);c.rotation.set(k*8,i,k*5)}});
  pill('cnt',380,'<b>−270 €</b><small>por cada día que esperas</small>',p(t,T.doscientos-.05,.25)*(1-p(t,T.por2-.2,.2)),'big red');
  // H: tus vehículos
  pill('lab1',380,'<b>cada euro</b>, a su vehículo',p(t,T.mover-.05,.25)*(1-p(t,T.sig-.2,.2)));
  // cierre
  PLA.userData.sub=1;
  pill('cnt',380,'<b>Empieza hoy</b><small>sígueme para construir tu primer millón</small>',p(t,T.hoy-.3,.25),'big');
  r.render(S,cam);
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
window.setCam=(p_,l)=>{cam.position.set(...p_);cam.lookAt(...l);cam.updateMatrixWorld();r.render(S,cam)};
const CLAVES=[['millon',1],['treinta',1],['ochenta',1],['compuesto',1],['nieve',1],['dispara',1],['cuando',1],['tarde',1],['setenta',1],['mover',1],['hoy',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:KEYT.has(w.s)}));
window.ready=true;
