// EP05 — «Las reglas del juego»: con 15 años en el índice mundial nunca se ha perdido (1970-2023); Bogle: todo el mercado,
// pocas comisiones y aguantar; y cada euro a su vehículo para no tener que vender en una caída.
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

const greenM=new THREE.MeshStandardMaterial({color:'#4fd18b',emissive:'#0d3a20',metalness:.3,roughness:.4});
const redBox=new THREE.MeshStandardMaterial({color:'#ff4b3e',emissive:'#5a0d08',metalness:.3,roughness:.4});
const goldBox=new THREE.MeshStandardMaterial({color:'#e2ab3c',emissive:'#3a2405',metalness:.6,roughness:.3});

// A · el índice mundial 1970-2023 como una cordillera de barras doradas (aproximado: tendencia ≈ 8 %/año con sus caídas)
const CAIDAS={1973:-.15,1974:-.25,1987:-.05,1990:-.17,2000:-.13,2001:-.17,2002:-.2,2008:-.40,2011:-.05,2018:-.09,2022:-.18};
const LV=[];{let v=1;for(let y=1970;y<=2023;y++){v*=1+(CAIDAS[y]??.115);LV.push(v)}}
const lmax=Math.log(LV.reduce((a,b)=>Math.max(a,b)));
const BARS=LV.map((v,i)=>{const h=.3+5.2*Math.log(1+v*(Math.E-1))/Math.log(1+Math.exp(lmax)*(Math.E-1));const m=new THREE.Mesh(new THREE.BoxGeometry(.32,1,.6),goldBox.clone());m.scale.y=h;m.position.set(i*.38,h/2,0);m.castShadow=true;S.add(m);m.userData.h=h;return m});
const yearX=y=>(y-1970)*.38;
const FRAME=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#ffd77a',transparent:true,opacity:.18,depthWrite:false}));S.add(FRAME);
const FRAME_E=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:'#ffd77a'}));S.add(FRAME_E);
const FR_PL=plate('15 AÑOS','✓ ganando','#7dffa1',1.6),FR5=plate('5 AÑOS','✗ perdiendo','#ff8a7a',1.6);FR5.visible=false;
foco(10,0,'#ffd7a0',300,.9,12);foco(4,2,'#fff1dc',120,.8,9);

// C · ventanas de 5, 10 y 15 años: casillas, en rojo las que perdieron (MSCI World 1970-2023)
const ROWS=[[50,6,'5 AÑOS','6 de 50 pierden'],[45,1,'10 AÑOS','1 de 45 pierde'],[40,0,'15 AÑOS','0 de 40 pierden']].map(([n,bad,a,b_],r_)=>{
  const tiles=[...Array(n)].map((_,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.17,.17,.06),i%Math.floor(n/Math.max(bad,1))===3&&bad>0&&Math.floor(i/Math.floor(n/bad))<bad?redBox:greenM);m.position.set(30+(i%10)*.2-.9,3.4-r_*1.25-Math.floor(i/10)*.2,0);S.add(m);return m});
  const pl=plate(a,b_,r_==2?'#7dffa1':'#ffffff',1.05);pl.position.set(28.2,3.0-r_*1.25,0);return {tiles,pl}});
foco(30,0,'#fff1dc',160,.6,8);

// D · el libro de Bogle y sus tres reglas
const BOOK=new THREE.Mesh(new THREE.BoxGeometry(1.5,2.1,.3),[0,1,2,3,4,5].map(i=>i===4?new THREE.MeshStandardMaterial({map:tex(512,720,(g)=>{g.fillStyle='#14306b';g.fillRect(0,0,512,720);g.fillStyle='#f5b841';g.fillRect(0,250,512,8);g.fillStyle='#fff';g.font='800 46px Figtree';g.textAlign='center';
  ['EL PEQUEÑO LIBRO','PARA INVERTIR CON','SENTIDO COMÚN'].forEach((l,k)=>g.fillText(l,256,320+k*56));g.font='700 40px Figtree';g.fillStyle='#ffd77a';g.fillText('John C. Bogle',256,620)}),roughness:.6}):new THREE.MeshStandardMaterial({color:i===0?'#f4efe6':'#102656'})));
BOOK.position.set(39.4,1.4,0);BOOK.castShadow=true;S.add(BOOK);
const RULES=['COMPRA TODO EL MERCADO','PAGA POCAS COMISIONES','AGUANTA'].map((t_,i)=>{const p_=plate(t_,null,i==2?'#ffd77a':'#ffffff',1.9);p_.position.set(41.5,2.4-i*.62,0);return p_});
foco(41,0,'#ffe2b8',220,.6,7);

// E · romper las reglas: vender en la caída
const SELLJ=jar(52,0,'VENDER EN LA CAÍDA','= convertir la caída en pérdida','#ff8a7a');SELLJ.userData.fill(70);
const SPILL=[...Array(18)].map(()=>{const c=new THREE.Mesh(coinGeo,redMat);c.scale.setScalar(1.6);S.add(c);c.visible=false;return c});
foco(52,0,'#ff8a6a',160,.4,7);

// F · cada euro a su vehículo
const V1=jar(61.6,0,'REMUNERADA','para lo de pronto','#c9d3e6',true),V2=jar(63.4,0,'MONETARIO','para lo de pronto','#c9d3e6',true),V3=jar(65.6,0,'INDEXADO','15+ años','#ffd77a',false,1.35);
V1.userData.fill(42);V2.userData.fill(42);V3.userData.fill(90);
foco(62.5,0,'#9fb6ff',90,.5,7);foco(65.6,0,'#ffbf55',300,.32,7.5);const GV=glow(65.6,.9,-.5,3.2,.8);
const DOME=new THREE.Mesh(new THREE.SphereGeometry(1.15,64,32,0,Math.PI*2,0,Math.PI/2),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vp=mv.xyz;wp=position;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){float f=pow(1.-abs(dot(normalize(-vp),n)),2.);float hex=step(.9,fract(wp.y*5.))+step(.94,fract(atan(wp.z,wp.x)*4.));gl_FragColor=vec4(1.,.76,.3,1.)*(f*1.4+hex*.35+.08);}'}));
DOME.position.set(65.6,0,0);S.add(DOME);
const WAVE=new THREE.Mesh(new THREE.BoxGeometry(.5,2.2,4),new THREE.MeshBasicMaterial({color:'#ff3b2e',transparent:true,opacity:.35,depthWrite:false}));S.add(WAVE);
const OUT=[...Array(8)].map(()=>{const c=new THREE.Mesh(coinGeo,coldCoin);c.scale.setScalar(1.6);S.add(c);c.visible=false;return c});
const GASTOS=plate('GASTOS','sin vender nada','#c9d3e6',1.3);GASTOS.position.set(59.8,1.2,1.2);

// G · cierre: torre hacia el millón
const TA=pila(76,0,3,coinMat,140,2.2);const PLA=plate('1.000.000 €','tu primer millón','#ffd77a',3.0);PLA.position.set(76,9.2,0);
foco(76,0,'#ffbf55',300,.5,9);glow(76,9,-.5,6,.8);

S.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false});

// ───────── tiempos ─────────
const T={sab:0,quince:vt('quince'),en:vt('en',2),cuarenta:vt('40 %'),y:vt('y'),cinco:vt('cinco'),pierdes:vt('pierdes'),pero:vt('pero'),diez:vt('diez'),quince2:vt('quince',2),
  lo:vt('lo'),bogle:vt('bogle'),compra:vt('compra'),paga:vt('paga'),aguanta:vt('aguanta'),esas:vt('esas'),rompen:vt('rompen'),venden:vt('venden'),por:vt('por'),pronto:vt('pronto'),
  remunerada:vt('remunerada'),monetario:vt('monetario'),y2:vt('y',4),tocar:vt('tocar'),indexado:vt('indexado'),asi:vt('asi'),vender:vt('vender'),favor:vt('favor'),sig:vt('sigueme'),millon:vt('millon')};
const K=[
  [0,[3,2.6,9.4],[4,1.8,0]],[T.quince,[7,3.6,11],[7,2.4,0]],[T.en-.05,[12,4.4,12],[12,2.8,0]],
  [T.en,[yearX(2008)+1.6,3.2,5.6],[yearX(2008),2.6,0]],[T.y,[yearX(2003)+2.6,3.6,7.6],[yearX(2003),2.6,0]],[T.pero-.05,[yearX(2004)+2.6,3.6,7.8],[yearX(2004),2.6,0]],
  [T.pero,[29.5,1.2,6.0],[29.5,1.25,0]],[T.lo-.05,[29.5,1.2,6.4],[29.5,1.25,0]],
  [T.lo,[40.4,1.7,5.4],[40.4,1.6,0]],[T.esas-.05,[40.5,1.8,5.8],[40.5,1.6,0]],
  [T.esas,[52,1.8,4.2],[52,1.2,0]],[T.por-.05,[52.4,1.9,4.6],[52,1.1,0]],
  [T.por,[63.6,2.4,8.2],[63.6,1.2,0]],[T.tocar,[64.6,2.3,7.4],[64.4,1.2,0]],[T.asi-.05,[64.6,2.4,7.6],[64.4,1.2,0]],
  [T.asi,[63.6,2.8,9.6],[63.6,1.2,0]],[T.sig-.05,[63.6,3,10],[63.6,1.3,0]],
  [T.sig,[79.4,1.0,8.4],[76,4.6,0]],[DUR,[79,1.8,7.6],[76,6.6,0]]];

const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
const pill=(id,y,html,k,cls='')=>{if(k<=0)return;const e=$(id);e.className='ov tag '+cls;tag(e,{x:540,y,on:true},html,k)};
function frameAt(y0,yrs,col){const i0=y0-1970,i1=Math.min(53,i0+yrs);const x0=yearX(y0)-.2,x1=yearX(1970+i1)+.2;const h=Math.max(BARS[i0].userData.h,BARS[i1].userData.h)+.6;
  FRAME.position.set((x0+x1)/2,h/2,0);FRAME.scale.set(x1-x0,h,.9);FRAME_E.position.copy(FRAME.position);FRAME_E.scale.copy(FRAME.scale);FRAME.material.color.set(col);FRAME_E.material.color.set(col);return {x:(x0+x1)/2,h,up:BARS[i1].userData.h>BARS[i0].userData.h}}

window.render=function(t){
  for(const id of OV)$(id).style.opacity=0;
  ruta(t,K);
  // A: la cordillera crece y un marco de 15 años la recorre: siempre acaba más arriba
  const grow=eo(p(t,0,1.4));BARS.forEach((m,i)=>{m.scale.y=m.userData.h*Math.max(.02,cl(grow*1.6-i/54*.6));m.position.y=m.scale.y/2;m.material.color.set('#e2ab3c');m.material.emissive.set('#3a2405')});
  let fr=null;if(t<T.en){const y0=Math.round(lerp(1970,2008,eio(p(t,1.2,T.en-1.4))));fr=frameAt(y0,15,'#7dffa1');FR_PL.position.set(fr.x,fr.h+.5,0);FR_PL.visible=true}
  // B: 2008 cae un 40 %; una ventana de 5 años en rojo
  else if(t<T.pero){const k=eo(p(t,T.cuarenta-.4,.6));const b=BARS[2008-1970];b.scale.y=b.userData.h*(1-.4*k);b.position.y=b.scale.y/2;if(k>0){b.material.color.set('#ff4b3e');b.material.emissive.set('#5a0d08')}
    FR_PL.visible=false;if(t>T.cinco-.2){fr=frameAt(2000,5,'#ff4b3e');FR5.position.set(fr.x,fr.h+.5,0)}}
  else FR_PL.visible=false;
  FR5.visible=t>T.cinco-.2&&t<T.pero;
  FRAME.visible=FRAME_E.visible=!!fr;
  pill('cnt',380,'<b>15 años: 0 de 40</b><small>periodos con pérdidas · MSCI World 1970-2023</small>',p(t,T.quince-.05,.25)*(1-p(t,T.en-.2,.2)),'big');
  pill('cnt',380,'<b>−40 %</b><small>en un mal año (2008)</small>',p(t,T.cuarenta-.05,.25)*(1-p(t,T.y-.2,.2)),'big red');
  pill('lab1',380,'5 años: <b>a veces pierdes</b>',p(t,T.cinco-.05,.25)*(1-p(t,T.pero-.2,.2)),'red');
  // C: las tres filas de ventanas
  ROWS.forEach((r_,ri)=>{const t0=[T.pero+.1,T.diez-.1,T.quince2-.1][ri];r_.tiles.forEach((m,i)=>{const k=eo(p(t,t0+i*.012,.3));m.scale.setScalar(Math.max(.001,k))});r_.pl.material.opacity=eo(p(t,t0,.3))});
  // D: Bogle
  BOOK.rotation.y=-.35+.15*Math.sin(t*.8);
  RULES.forEach((pl_,i)=>{const k=eo(p(t,[T.compra,T.paga,T.aguanta][i]-.1,.3));pl_.material.opacity=k;pl_.position.x=41.5+(1-k)*.6});
  // E: vender en la caída — el tarro se vuelca y las monedas se van en rojo
  const kt=eo(p(t,T.venden-.1,.6));SELLJ.rotation.z=-1.2*kt;SELLJ.position.set(52+.5*kt,.0+.3*kt,0);
  SPILL.forEach((c,i)=>{const k=(t-T.venden-.1-i*.08)/1.1;c.visible=k>0&&k<1&&t<T.por+.2;if(c.visible){c.position.set(52.8+k*(1.2+i%4*.3),1-k*.9+Math.sin(k*3)*.2,(i%3-1)*.25*k);c.rotation.set(k*7,i,k*4)}});
  SELLJ.userData.pl.material.opacity=eo(p(t,T.venden,.3));
  // F/G: los vehículos; la ola roja pasa y el indexado sigue intacto
  const kd=eo(p(t,T.indexado-.1,.5));DOME.visible=kd>0;DOME.position.y=2*(1-kd);
  const wx=lerp(70,58,p(t,T.vender-.2,1.6));WAVE.position.set(wx,1.1,0);WAVE.visible=t>T.vender-.2&&t<T.vender+1.5;
  OUT.forEach((c,i)=>{const k=(t-T.vender+.1-i*.12)/.8,src=i%2?63.4:61.6;c.visible=k>0&&k<1;if(c.visible){c.position.set(lerp(src,59.8,eo(k)),1.1+Math.sin(k*Math.PI)*.6,lerp(0,1.2,k));c.rotation.set(k*6,i,0)}});
  GASTOS.visible=t>T.vender-.3&&t<T.sig;GASTOS.material.opacity=eo(p(t,T.vender-.3,.3));
  V3.userData.fill(Math.round(90+lerp(0,30,eo(p(t,T.favor-.4,1.2)))));
  pill('lab2',380,'<b>pronto</b> → seguro y sin sustos',p(t,T.pronto-.05,.25)*(1-p(t,T.y2-.2,.2)));
  pill('lab3',380,'<b>15+ años</b> → que trabaje el tiempo',p(t,T.tocar-.05,.25)*(1-p(t,T.asi-.2,.2)));
  pill('cnt',380,'<b>las reglas, a tu favor</b>',p(t,T.favor-.05,.25)*(1-p(t,T.sig-.2,.2)),'big');
  // cierre
  TA.userData.set(t>=T.sig-.1?Math.round(lerp(40,134,eo(p(t,T.sig,DUR-T.sig)))):0);
  pill('cnt',380,'<b>Sígueme</b><small>aprende las reglas · construye tu primer millón</small>',p(t,T.millon-.3,.25),'big');
  r.render(S,cam);
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
window.setCam=(p_,l)=>{cam.position.set(...p_);cam.lookAt(...l);cam.updateMatrixWorld();r.render(S,cam)};
const CLAVES=[['quince',1],['40 %',1],['pierdes',1],['quince',2],['aguanta',1],['juego',1],['venden',1],['vehiculo',1],['pronto',1],['tiempo',1],['favor',1],['millon',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:KEYT.has(w.s)}));
window.ready=true;
