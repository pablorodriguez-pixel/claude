// EP02 v2 — «Cuentas remuneradas» (TRUCO #1). Una idea por frase: un objeto claro, grande y con su etiqueta,
// sobre un estudio limpio. La cámara viaja entre «estaciones» sin cortes: A (tú y el banco), B (las casas),
// C (los dos tarros), D (el calendario). Todo sale de la voz (vt).
import {THREE,W,H,cl,eio,eo,p,lerp,R,C,billTexture,proj,tag} from '../build/lib.js';
const $=id=>document.getElementById(id);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const r=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
r.setSize(W,H);r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.2;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;
$('gl').appendChild(r.domElement);
// acabado: más contraste y color, y una viñeta que oscurece los bordes
$('gl').style.filter='contrast(1.22) saturate(1.3) brightness(1.02)';
{const v=document.createElement('div');v.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 75% 60% at 50% 48%,rgba(0,0,0,0) 55%,rgba(0,0,0,.72) 100%)';$('gl').after(v)}
await document.fonts.ready;

// ───────── voz y cámara ─────────
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]/g,'').toLowerCase();
function vt(w,n=1){let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw new Error('palabra '+w)}
const cam=new THREE.PerspectiveCamera(64,W/H,.02,200);
function ruta(t,keys){let i=0;while(i<keys.length-1&&t>=keys[i+1][0])i++;
  const [ta,a]=keys[i],[tb,b]=keys[Math.min(i+1,keys.length-1)];const u=tb>ta?eio(cl((t-ta)/(tb-ta))):0;
  cam.position.copy(V(...a[0]).lerp(V(...a[0]===b[0]?a[0]:b[0]),u));cam.lookAt(V(...a[1]).lerp(V(...b[1]),u));cam.updateMatrixWorld()}

// ───────── materiales y texturas ─────────
const S=new THREE.Scene();
const tex=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t};
function plate(txt,sub,col='#ffffff',bg='rgba(12,15,30,.92)',w=1.1){const t=tex(1024,sub?360:240,(g,W_,H_)=>{g.fillStyle=bg;const r_=60;g.beginPath();g.roundRect(8,8,W_-16,H_-16,r_);g.fill();
  g.strokeStyle='rgba(255,255,255,.12)';g.lineWidth=6;g.stroke();g.fillStyle=col;g.font='800 120px Figtree, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,W_/2,sub?130:H_/2+6);
  if(sub){g.fillStyle='rgba(255,255,255,.75)';g.font='700 70px Figtree, sans-serif';g.fillText(sub,W_/2,260)}});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w*(sub?360:240)/1024),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));m.renderOrder=5;return m}
const coinTex=tex(256,256,(g)=>{const gr=g.createRadialGradient(110,100,10,128,128,128);gr.addColorStop(0,'#fff1b0');gr.addColorStop(.5,'#f2b93b');gr.addColorStop(1,'#a8701a');g.fillStyle=gr;g.fillRect(0,0,256,256);
  g.strokeStyle='rgba(120,70,10,.7)';g.lineWidth=12;g.beginPath();g.arc(128,128,106,0,7);g.stroke();g.fillStyle='rgba(110,64,8,.9)';g.font='900 150px Figtree, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('€',128,136)});
const gold=new THREE.MeshStandardMaterial({color:'#e2ab3c',metalness:.85,roughness:.28,emissive:'#3a2405'});
const coinMat=[gold,new THREE.MeshStandardMaterial({map:coinTex,metalness:.55,roughness:.35,emissive:'#2a1a04'}),new THREE.MeshStandardMaterial({map:coinTex,metalness:.55,roughness:.35,emissive:'#2a1a04'})];
const redCoinMat=new THREE.MeshStandardMaterial({color:C.loss,emissive:'#5a0d08',metalness:.4,roughness:.4});
const CR=.075,CH=.022,coinGeo=new THREE.CylinderGeometry(CR,CR,CH,36);
const BT=billTexture(),billGeo=new THREE.PlaneGeometry(.42,.23);
const billMat=new THREE.MeshStandardMaterial({map:BT,side:THREE.DoubleSide,roughness:.7});

// ───────── estudio ─────────
{const bg=tex(16,512,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#010103');gr.addColorStop(.5,'#06071a');gr.addColorStop(.78,'#1a1238');gr.addColorStop(1,'#040309');g.fillStyle=gr;g.fillRect(0,0,w,h)});
 S.add(new THREE.Mesh(new THREE.SphereGeometry(90,48,24),new THREE.MeshBasicMaterial({map:bg,side:THREE.BackSide,depthWrite:false})));
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#0b0c13',roughness:.55,metalness:.25}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;S.add(fl);
 S.add(new THREE.HemisphereLight('#6070d0','#100804',.42));
 const key=new THREE.DirectionalLight('#fff0dc',1.1);key.position.set(-6,12,9);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-14,right:22,top:14,bottom:-14,far:60});S.add(key);
 const rim=new THREE.DirectionalLight('#7f8cff',2.4);rim.position.set(6,5,-8);S.add(rim);
 // halos de luz en el suelo bajo cada estación
 const halo=tex(256,256,(g)=>{const gr=g.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(255,200,120,.55)');gr.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)});
 for(const[x,z,s]of[[.9,0,5],[.6,-5.8,7],[11.1,0,4.5],[10,4.4,6]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(s,s),new THREE.MeshBasicMaterial({map:halo,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));m.rotation.x=-Math.PI/2;m.position.set(x,.005,z);S.add(m)}}

// focos que recortan cada objeto: oro donde el dinero crece, frío donde se queda quieto
function foco(x,z,col,int,ang=.42,h=5.5){const l=new THREE.SpotLight(col,int,14,ang,.55,1.6);l.position.set(x+.6,h,z+2.2);l.target.position.set(x,.4,z);l.castShadow=true;l.shadow.mapSize.set(1024,1024);l.shadow.bias=-.0004;S.add(l,l.target);return l}
foco(.85,-.2,'#ffc56a',120);foco(-1.1,0,'#9fb6ff',70,.3);foco(2.15,-1,'#ffcf6a',160,.3,6.5);
foco(.6,-5.8,'#ffd7a0',130,.5);foco(8.9,0,'#8fa6ff',55,.28);foco(11.1,0,'#ffbf55',300,.3);foco(10,4.4,'#ffe2b8',80,.5);
const glowTex=tex(256,256,(g)=>{const gr=g.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(255,190,80,.9)');gr.addColorStop(.35,'rgba(255,160,40,.35)');gr.addColorStop(1,'rgba(255,140,30,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)});
function glow(x,y,z,s,a=1){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:a}));m.position.set(x,y,z);m.scale.set(s,s,1);S.add(m);return m}

// ───────── piezas ─────────
// Tarro de cristal con monedas dentro (n = cuántas). 7 monedas por capa.
const coldCoin=new THREE.MeshStandardMaterial({color:'#7d8494',metalness:.7,roughness:.45});
function jar(x,z,label,sub,labelCol,cold=false){const g=new THREE.Group();g.position.set(x,0,z);
  const glass=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,1.1,48,1,true),new THREE.MeshStandardMaterial({color:cold?'#8ea6c8':'#bfe3ff',transparent:true,opacity:.18,roughness:.05,metalness:.1,side:THREE.DoubleSide,depthWrite:false}));glass.position.y=.55;
  const rimT=new THREE.Mesh(new THREE.TorusGeometry(.42,.025,12,64),gold);rimT.rotation.x=Math.PI/2;rimT.position.y=1.1;
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.04,48),new THREE.MeshStandardMaterial({color:'#9fc6e0',transparent:true,opacity:.4}));base.position.y=.02;
  const edge=new THREE.Mesh(new THREE.CylinderGeometry(.425,.425,1.1,48,1,true),new THREE.MeshBasicMaterial({color:'#dff2ff',transparent:true,opacity:.08,side:THREE.BackSide,depthWrite:false}));edge.position.y=.55;
  g.add(glass,edge,rimT,base);
  const N=120,im=new THREE.InstancedMesh(coinGeo,cold?[coldCoin,coldCoin,coldCoin]:coinMat,N);im.castShadow=true;g.add(im);
  const pl=plate(label,sub,labelCol);pl.position.set(0,1.45,.0);g.add(pl);
  g.userData={im,N,pl,glass,fill(n){const M=new THREE.Matrix4(),q=new THREE.Quaternion();let k=0;
    for(let i=0;i<N;i++){const layer=Math.floor(i/7),j=i%7;const a=j===0?0:(j-1)/6*Math.PI*2+layer*.6,rr=j===0?0:.2;
      const s=i<n?1:0;q.setFromEuler(new THREE.Euler(.06*Math.sin(i),i,.06*Math.cos(i*1.3)));M.compose(V(Math.cos(a)*rr,.05+layer*CH*1.05,Math.sin(a)*rr),q,V(s,s,s));im.setMatrixAt(i,M)}
    im.instanceMatrix.needsUpdate=true}};g.userData.fill(0);S.add(g);return g}
// El banco: escalinata, columnas, frontón; sus piezas pueden caer.
function bank(x,z){const g=new THREE.Group();g.position.set(x,0,z);const stone=new THREE.MeshStandardMaterial({color:'#d8d2c6',roughness:.5});const parts=[];
  const add=(m,px,py,pz)=>{m.position.set(px,py,pz);m.castShadow=m.receiveShadow=true;g.add(m);parts.push({m,p0:m.position.clone(),r0:m.rotation.clone()});return m};
  add(new THREE.Mesh(new THREE.BoxGeometry(2.1,.12,1.3),stone),0,.06,0);add(new THREE.Mesh(new THREE.BoxGeometry(1.9,.12,1.15),stone),0,.18,0);
  add(new THREE.Mesh(new THREE.BoxGeometry(1.7,1.0,.7),new THREE.MeshStandardMaterial({color:'#8d877c',roughness:.7})),0,.74,-.15);
  add(new THREE.Mesh(new THREE.BoxGeometry(.42,.62,.04),new THREE.MeshStandardMaterial({color:'#ffd38a',emissive:'#ffb347',emissiveIntensity:1.6})),0,.55,.22);
  for(let i=0;i<4;i++)add(new THREE.Mesh(new THREE.CylinderGeometry(.075,.085,1.0,20),stone),-.66+i*.44,.74,.36);
  add(new THREE.Mesh(new THREE.BoxGeometry(1.9,.16,1.05),stone),0,1.32,.05);
  const sh=new THREE.Shape();sh.moveTo(-.98,0);sh.lineTo(.98,0);sh.lineTo(0,.42);sh.closePath();add(new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:1.0,bevelEnabled:false}),stone),0,1.4,-.45);
  const sign=plate('BANCO',null,'#ffd77a','rgba(0,0,0,0)',1.0);sign.position.set(0,1.32,.585);g.add(sign);parts.push({m:sign,p0:sign.position.clone(),r0:sign.rotation.clone()});
  g.userData={parts};S.add(g);return g}
// Una casa con su etiqueta
function house(x,z,label,col){const g=new THREE.Group();g.position.set(x,0,z);
  const b=new THREE.Mesh(new THREE.BoxGeometry(.9,.7,.8),new THREE.MeshStandardMaterial({color:col,roughness:.6}));b.position.y=.35;b.castShadow=true;
  const rf=new THREE.Mesh(new THREE.ConeGeometry(.75,.5,4),new THREE.MeshStandardMaterial({color:'#b5543a',roughness:.7}));rf.position.y=.95;rf.rotation.y=Math.PI/4;rf.castShadow=true;
  const w=new THREE.Mesh(new THREE.PlaneGeometry(.22,.22),new THREE.MeshStandardMaterial({color:'#ffd38a',emissive:'#ffb347',emissiveIntensity:1.4}));w.position.set(0,.4,.405);
  const pl=plate(label,null,'#ffffff',undefined,.95);pl.position.set(0,1.55,0);g.add(b,rf,w,pl);g.userData={pl};S.add(g);return g}
// Flecha dorada de A a B (se dibuja con u = 0..1) y su curva para lo que viaja por ella
function arrow(A,B,h,col='#f5b841'){const mid=A.clone().lerp(B,.5);mid.y+=h;const cv=new THREE.QuadraticBezierCurve3(A,mid,B);
  const tube=new THREE.Mesh(new THREE.TubeGeometry(cv,80,.03,10,false),new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:1.8}));
  const head=new THREE.Mesh(new THREE.ConeGeometry(.09,.22,20),new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:1.8}));
  const g=new THREE.Group();g.add(tube,head);S.add(g);
  g.userData={cv,set(u){const n=tube.geometry.index.count;tube.geometry.setDrawRange(0,Math.floor(n*cl(u)/6)*6);g.visible=u>0;
    const P=cv.getPoint(cl(u)),T=cv.getTangent(cl(u));head.position.copy(P);head.quaternion.setFromUnitVectors(V(0,1,0),T)}};g.userData.set(0);return g}
function coinMesh(m=coinMat){const c=new THREE.Mesh(coinGeo,m);c.castShadow=true;S.add(c);c.visible=false;return c}
function billMesh(){const b=new THREE.Mesh(billGeo,billMat.clone());b.castShadow=true;S.add(b);b.visible=false;return b}
// cúpula de garantía
function dome(x,z,rad){const m=new THREE.Mesh(new THREE.SphereGeometry(rad,64,32,0,Math.PI*2,0,Math.PI/2),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{a:{value:1}},
  vertexShader:'varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vp=mv.xyz;wp=position;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform float a;varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){float f=pow(1.-abs(dot(normalize(-vp),n)),2.);float hex=step(.9,fract(wp.y*5.))+step(.94,fract(atan(wp.z,wp.x)*4.));gl_FragColor=vec4(1.,.76,.3,1.)*(f*1.4+hex*.35+.08)*a;}'}));
  m.position.set(x,0,z);S.add(m);return m}

// ───────── el mundo ─────────
const A_JAR=jar(-1.1,0,'TUS AHORROS',null,'#ffffff',true);
const BANK=bank(.85,-.2);
const TOWER=new THREE.InstancedMesh(coinGeo,coinMat,160);TOWER.position.set(2.15,0,-1.0);TOWER.castShadow=true;S.add(TOWER);
const TOWER_PL=plate('GANANCIAS','del banco','#ffd77a',undefined,1.1);S.add(TOWER_PL);
function towerN(n){const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<160;i++){const s=i<n?1:0;q.setFromEuler(new THREE.Euler(0,i*.7,0));M.compose(V(Math.sin(i*2.1)*.02,.033+i*CH*3*1.02,0),q,V(3*s,3*s,3*s));TOWER.setMatrixAt(i,M)}
  TOWER.instanceMatrix.needsUpdate=true;TOWER_PL.position.set(2.15,.25+n*CH*3*1.02+.3,.2)}
const AR1=arrow(V(-1.1,1.15,0),V(.6,.8,.45),.8);
const H1=house(-.6,-5.6,'HIPOTECA','#d9c3a5'),H2=house(1.8,-5.9,'PRÉSTAMO','#c9d4e6');
const AR2=arrow(V(.6,1.7,-.6),V(-.6,1.2,-5.4),1.2),AR3=arrow(V(.9,1.7,-.6),V(1.8,1.2,-5.6),1.0);
const AR4=arrow(V(.2,1.1,-5.2),V(2.0,1.6,-1.1),1.6,'#ffd76a');
const J0=jar(8.9,0,'CUENTA NORMAL','paga 0 %','#c9d3e6',true),J3=jar(11.1,0,'REMUNERADA','paga ≈ 3 %','#ffd77a');
const G3=glow(11.1,.7,-.4,2.6,.0),GB=glow(2.15,1.2,-1.4,2.4,.55),GBANK=glow(.85,.9,-.6,3.2,.5);
const D1=dome(-1.1,0,.85),D2=dome(11.1,0,.85);
// calendario: 12 meses en 4 × 3, delante de los tarros
const MESES=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
const CAL=new THREE.Group();CAL.position.set(10,0,4.4);S.add(CAL);
MESES.forEach((m,i)=>{const t=new THREE.Mesh(new THREE.BoxGeometry(.62,.06,.5),[0,1,2,3,4,5].map(k=>k===2?new THREE.MeshStandardMaterial({map:tex(256,200,(g)=>{g.fillStyle='#f4efe6';g.fillRect(0,0,256,200);g.fillStyle='#c0392b';g.fillRect(0,0,256,46);g.fillStyle='#fff';g.font='800 34px Figtree';g.textAlign='center';g.fillText('2026',128,34);g.fillStyle='#1b1b22';g.font='900 86px Figtree';g.fillText(m,128,150)}),roughness:.8}):new THREE.MeshStandardMaterial({color:'#e8e2d6'})));
  t.position.set(-1.05+(i%4)*.7,.03,-.6+Math.floor(i/4)*.6);t.castShadow=t.receiveShadow=true;CAL.add(t)});
const CAL_BILLS=[...Array(6)].map(()=>billMesh());
// lo que viaja
const FLY=[...Array(40)].map(()=>coinMesh()),RED=[...Array(14)].map(()=>coinMesh(redCoinMat)),BILLS=[...Array(10)].map(()=>billMesh());

// ───────── tiempos ─────────
const T={paga:vt('paga'),lo:vt('lo'),gratis:vt('gratis'),presta:vt('presta'),hip:vt('hipotecas'),pres:vt('prestamos'),int:vt('intereses'),pero:vt('pero'),pagan:vt('pagan'),
  remu:vt('remuneradas'),tres:vt('tres'),con:vt('con',2),diez:vt('diez'),tres00:vt('trescientos'),billete:vt('billete'),cada:vt('cada'),hace:vt('hace',2),precios:vt('precios'),
  pierde:vt('pierde'),quin:vt('quinientos'),es:vt('es',2),seguro:vt('seguro'),gar:vt('garantizados'),cien:vt('cien'),aunque:vt('aunque'),quiebre:vt('quiebre'),dev:vt('devuelven'),
  asi:vt('asi'),presta2:vt('presta',2),este:vt('este'),primer:vt('primer'),trab:vt('trabajar'),sig:vt('sigueme')};
const CAM=[
  [0,[[-.9,1.3,2.3],[-1.1,.9,0]]],[1.4,[[-.1,1.8,5.4],[.1,.9,0]]],[T.paga+.3,[[.1,1.9,5.6],[.4,1.0,0]]],
  [T.lo+.3,[[.2,2.6,6.2],[.4,1.1,-.6]]],[T.presta-.1,[[3.4,3.4,2.6],[.6,.8,-3.2]]],[T.int-.1,[[3.9,3.6,2.2],[.9,.9,-2.8]]],[T.int+.9,[[4.2,2.8,4.2],[1.6,1.2,-.6]]],
  [T.pero+.2,[[7.4,2.0,4.6],[9.6,.9,0]]],[T.pagan+.3,[[10,2.1,4.4],[10,1.0,0]]],[T.remu+.4,[[10.0,2.0,4.8],[10.2,1.0,0]]],[T.tres+.6,[[11.4,1.6,2.6],[11.1,.9,0]]],
  [T.con+.1,[[10.0,3.2,7.8],[10,.2,4.4]]],[T.billete+.2,[[10.0,3.4,7.2],[10,.1,4.4]]],[T.cada+.8,[[10.0,3.0,7.0],[10,.1,4.2]]],
  [T.hace+.2,[[10.0,2.4,5.2],[10,1.0,0]]],[T.pierde+.2,[[10.0,2.0,5.0],[10,1.5,0]]],[T.es-.2,[[10.0,2.4,5.2],[10,1.1,0]]],
  [T.seguro+.4,[[11.9,1.7,3.0],[11.1,.9,0]]],[T.gar+.5,[[11.1,2.0,3.4],[11.1,.9,0]]],[T.aunque-.2,[[11.1,2.1,3.6],[11.1,1.0,0]]],
  [T.aunque+.25,[[-.2,2.0,5.4],[.4,1.0,0]]],[T.dev+.6,[[-1.1,1.5,3.2],[-1.3,.8,0]]],
  [T.asi+.3,[[.1,1.9,5.6],[.4,1.0,0]]],[T.presta2+.4,[[.1,1.8,5.0],[.2,1.0,0]]],
  [T.este,[[11.6,1.5,2.6],[11.1,.9,0]]],[T.trab,[[11.1,2.6,2.8],[11.1,.9,0]]],[DUR,[[11.1,4.2,2.2],[11.1,.8,0]]]];
// los saltos largos de estación se hacen en ~0,7 s y luego la cámara sigue con la voz
const KEYS=[];CAM.forEach(([t,v],i)=>{KEYS.push([t,v])});

const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
const pill=(id,y,html,k,cls='')=>{if(k<=0)return;const e=$(id);e.className='ov tag '+cls;tag(e,{x:540,y,on:true},html,k)};
const fly=(m,cv,k)=>{m.visible=k>0&&k<1;if(!m.visible)return;const P=cv.getPoint(eio(k));m.position.copy(P);m.rotation.set(k*9,k*4,Math.PI/2)};

window.render=function(t){
  for(const id of OV)$(id).style.opacity=0;
  ruta(t,KEYS);
  [...FLY,...RED,...BILLS].forEach(m=>m.visible=false);
  // A: tus ahorros → banco (0 € para ti); la torre del banco crece
  const kA=cl(t/ (T.lo));A_JAR.userData.fill(Math.round(lerp(84,56,eo(p(t,.3,T.lo-.3)))));
  AR1.userData.set(eo(p(t,.2,.8)));for(let i=0;i<14;i++)fly(FLY[i],AR1.userData.cv,(t-.3-i*.26)/.9);
  const tw=Math.round(lerp(5,16,eo(p(t,.6,T.lo)))+lerp(0,30,eo(p(t,T.int+.2,1.6))));towerN(tw);TOWER_PL.visible=!(t>T.int-.15&&t<T.pero);
  pill('lab1',380,'a ti: <b>0 €</b>',p(t,T.paga-.05,.2)*(1-p(t,T.lo+.2,.2)),'red');
  pill('lab2',380,'préstamo <b>gratis</b> al banco',p(t,T.gratis-.1,.2)*(1-p(t,T.presta-.2,.2)));
  // B: el banco presta (billetes) y cobra intereses (monedas que vuelven)
  AR2.userData.set(eo(p(t,T.presta-.1,.5)));AR3.userData.set(eo(p(t,T.presta+.3,.5)));AR4.userData.set(eo(p(t,T.int-.2,.6)));
  for(let i=0;i<6;i++){fly(BILLS[i],(i%2?AR3:AR2).userData.cv,(t-T.presta-.1-i*.28)/1.0);if(BILLS[i].visible)BILLS[i].rotation.set(-Math.PI/2+Math.sin(t*8+i)*.5,t*2+i,0)}
  for(let i=0;i<16;i++)fly(FLY[14+i],AR4.userData.cv,(t-T.int+.1-i*.09)/1.0);
  H1.userData.pl.material.opacity=eo(p(t,T.hip-.1,.25));H2.userData.pl.material.opacity=eo(p(t,T.pres-.1,.25));
  pill('lab3',380,'<b>+ intereses</b> para el banco',p(t,T.int-.05,.2)*(1-p(t,T.pero-.2,.2)));
  // C: los dos tarros
  const rise=eo(p(t,T.pero-.1,.6));J0.position.y=-1.6*(1-rise);J3.position.y=-1.6*(1-eo(p(t,T.pero+.15,.6)));
  J0.userData.fill(56);J3.userData.fill(Math.round(56+lerp(0,8,eo(p(t,T.pagan,.8)))+lerp(0,10,eo(p(t,T.tres,1.2)))+lerp(0,12,eo(p(t,T.este,4)))));
  J3.userData.glass.material.color.set(t>T.remu?'#ffe2a0':'#bfe3ff');G3.material.opacity=.85*eo(p(t,T.remu-.1,.5));J3.userData.glass.material.opacity=t>T.remu?.3:.18;
  for(let i=0;i<10;i++){const t0=(i<4?T.pagan+.1:T.tres)+i%6*.16;const k=(t-t0)/.45;const m=FLY[30+i];m.visible=k>0&&k<1&&t<T.con;if(m.visible){m.position.set(11.1+Math.sin(i)*.1,1.9-1.2*eo(k),Math.cos(i)*.1);m.rotation.set(k*6,i,0)}}
  for(let i=0;i<10;i++){const t0=T.este+.1+i*.35;const k=(t-t0)/.45;const m=FLY[i];if(t>T.este&&k>0&&k<1){m.visible=true;m.position.set(11.1+Math.sin(i)*.1,1.9-1.2*eo(k),Math.cos(i)*.1);m.rotation.set(k*6,i,0)}}
  pill('cnt',380,'<b>≈ 3 %</b><small>al año</small>',p(t,T.tres-.05,.2)*(1-p(t,T.con-.2,.2)),'big');
  // D: calendario — 10.000 € al 3 % = 300 € = un billete de 50 cada dos meses
  pill('cnt',380,'<b>10.000 € → +300 €</b><small>al año</small>',p(t,T.tres00-.05,.2)*(1-p(t,T.hace-.2,.2)),'big');
  pill('lab1',380,'<b>10.000 €</b> en la cuenta',p(t,T.diez-.05,.2)*(1-p(t,T.tres00-.1,.1)));
  CAL_BILLS.forEach((b,i)=>{const t0=T.billete-.3+i*.34,k=eo(p(t,t0,.4));b.visible=k>0&&t<T.hace+.3;const mi=1+i*2,x=CAL.position.x-1.05+(mi%4)*.7,z=CAL.position.z-.6+Math.floor(mi/4)*.6;
    b.position.set(x,.08+.9*(1-k),z);b.rotation.set(-Math.PI/2,0,(1-k)*2+.1*Math.sin(i))});
  // E: la inflación — el dinero parado pierde 490 €; en la remunerada, mucho menos
  for(let i=0;i<14;i++){const k=(t-T.pierde+.1-i*.08)/1.1;const m=RED[i];m.visible=k>0&&k<1;if(m.visible){const s=i<10?8.9:11.1;m.position.set(s+(i%3-1)*.25*k,1.0+1.8*eo(k),(i%2?.2:-.2)*k);m.rotation.set(k*8,i,k*5)}}
  J0.userData.fill(Math.round(56-14*eo(p(t,T.pierde,1))));
  pill('lab1',380,'precios <b>+4,9 %</b> al año',p(t,T.precios-.05,.2)*(1-p(t,T.es-.25,.2)),'red');
  if(t>T.pierde-.1&&t<T.es){const a=proj(V(8.9,2.0,0),cam),b=proj(V(11.1,2.0,0),cam);
    tag($('lab2'),a,'<b>−490 €</b>',p(t,T.quin-.1,.2),0,0);$('lab2').className='ov tag red';tag($('lab3'),b,'<b>−190 €</b>',p(t,T.quin+.3,.2),0,0);$('lab3').className='ov tag red'}
  // F: garantía — la cúpula cae sobre la remunerada
  const dk=eo(p(t,T.gar-.1,.45));D2.visible=dk>0;D2.position.y=2.4*(1-dk);
  pill('cnt',380,'<b>100.000 €</b><small>por persona y por banco</small>',p(t,T.cien-.05,.25)*(1-p(t,T.aunque-.15,.15)),'big');
  // G: el banco quiebra; tus ahorros, a salvo bajo su cúpula
  D1.visible=t>T.aunque&&t<T.asi;
  const tq=T.quiebre-.05;BANK.userData.parts.forEach((q,i)=>{const d=t-(tq+(i%4)*.06);q.m.position.copy(q.p0);q.m.rotation.copy(q.r0);if(d>0&&t<T.asi){q.m.position.y=Math.max(.05,q.p0.y-4.9*d*d*(1+(i%3)*.2));q.m.position.x=q.p0.x+(q.p0.x>=0?1:-1)*d*.5;q.m.rotation.z=d*(i%2?.9:-.9)}});
  if(t>T.aunque&&t<T.asi){towerN(Math.round(46*(1-eo(p(t,tq+.2,.8)))));A_JAR.userData.fill(84)}
  pill('lab1',380,'tus ahorros: <b>a salvo</b>',p(t,T.dev-.05,.2)*(1-p(t,T.asi-.2,.2)));
  // H: remate — vuelta al principio: tú le prestas gratis
  if(t>=T.asi&&t<T.este){A_JAR.userData.fill(Math.round(lerp(84,60,eo(p(t,T.asi,3)))));towerN(Math.round(lerp(20,46,eo(p(t,T.asi,3)))));AR1.userData.set(1);
    for(let i=0;i<12;i++)fly(FLY[i],AR1.userData.cv,(t-T.asi-.2-i*.25)/.9)}
  pill('lab2',380,'interés para ti: <b>0 %</b>',p(t,T.presta2-.1,.2)*(1-p(t,T.este-.2,.2)),'red');
  // cierre
  pill('cnt',380,'<b>TRUCO #1</b><small>cuentas remuneradas</small>',p(t,T.primer-.05,.25),'big');
  r.render(S,cam);
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
const CLAVES=[['euro',1],['intereses',1],['remuneradas',1],['tres',1],['cincuenta',1],['pierde',1],['garantizados',1],['devuelven',1],['gratis',3],['siguiente',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:KEYT.has(w.s)}));
window.setCam=(p,l)=>{cam.position.set(...p);cam.lookAt(...l);cam.updateMatrixWorld();r.render(S,cam)};
window.ready=true;
