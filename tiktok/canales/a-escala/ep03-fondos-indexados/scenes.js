// EP03 — «Fondos indexados»: no hace falta adivinar el caballo ganador; compra la carrera entera.
// Una idea por frase, objetos claros con su etiqueta, contraste oro (lo que crece) contra frío (lo quieto).
// Estaciones: A carrera (x 0) · B tarro del fondo (x 20) · C podio (x 32) · D años (x 44) · E dos tarros (x 56) · F torre (x 68).
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

// ───────── A: la carrera ─────────
// caballo de ajedrez: perfil extruido con su peana
const kShape=new THREE.Shape();[[-.28,0],[.28,0],[.24,.12],[.2,.35],[.26,.55],[.3,.72],[.22,.88],[.08,.98],[-.05,1],[-.15,.95],[-.3,.78],[-.44,.66],[-.42,.57],[-.27,.6],[-.13,.62],[-.18,.45],[-.22,.25],[-.24,.12]].forEach(([x,y],i)=>i?kShape.lineTo(x,y):kShape.moveTo(x,y));
const kGeo=new THREE.ExtrudeGeometry(kShape,{depth:.2,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:3});kGeo.translate(0,.12,-.1);
const baseGeo=new THREE.CylinderGeometry(.3,.34,.14,32);
const LANE=.95,NK=10,COLS=['#e8553f','#3f8fe8','#4fc27a','#c05ae8','#e8a43f','#3fd0e8','#e85fa0','#8fe83f','#e8e13f','#5f6fe8'];
const knights=[...Array(NK)].map((_,i)=>{const g=new THREE.Group();const mat=new THREE.MeshStandardMaterial({color:COLS[i],roughness:.35,metalness:.2,emissive:COLS[i],emissiveIntensity:.15});
  const k=new THREE.Mesh(kGeo,mat),b=new THREE.Mesh(baseGeo,mat);b.position.y=.07;k.castShadow=b.castShadow=true;g.add(k,b);g.rotation.y=-Math.PI/2;g.scale.setScalar(1.1);S.add(g);g.userData={mat,col:new THREE.Color(COLS[i])};return g});
// pista: carriles
{const m=new THREE.MeshStandardMaterial({color:'#2a2d3d',emissive:'#1a1c2a'});for(let i=0;i<=NK;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.03,.01,200),m);l.position.set((i-NK/2)*LANE,.006,-90);S.add(l)}
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(NK*LANE,200),new THREE.MeshStandardMaterial({color:'#12141f',roughness:.8}));fl.rotation.x=-Math.PI/2;fl.position.set(0,.003,-90);fl.receiveShadow=true;S.add(fl)}
// la carrera entera: una barrera dorada que avanza a paso firme con todos dentro
const GATE=new THREE.Mesh(new THREE.BoxGeometry(NK*LANE+.4,1.5,.35),new THREE.MeshStandardMaterial({color:'#f5b841',emissive:'#f5a020',emissiveIntensity:.9,transparent:true,opacity:.55,depthWrite:false}));S.add(GATE);
const GATE_PL=plate('LA CARRERA ENTERA',null,'#ffd77a',3.4);
const lightRace=foco(0,-4,'#ffd7a0',160,.7,8);

// ───────── B: el fondo indexado (tarro con 1.300 empresas) ─────────
function jar(x,z,label,sub,labelCol,cold=false,big=1){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(big);
  const glass=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,1.1,48,1,true),new THREE.MeshStandardMaterial({color:cold?'#8ea6c8':'#ffe2a0',transparent:true,opacity:cold?.18:.28,roughness:.05,metalness:.1,side:THREE.DoubleSide,depthWrite:false}));glass.position.y=.55;
  const rimT=new THREE.Mesh(new THREE.TorusGeometry(.42,.025,12,64),gold);rimT.rotation.x=Math.PI/2;rimT.position.y=1.1;
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.04,48),new THREE.MeshStandardMaterial({color:'#9fc6e0',transparent:true,opacity:.4}));base.position.y=.02;
  g.add(glass,rimT,base);const N=140,im=new THREE.InstancedMesh(coinGeo,cold?[coldCoin,coldCoin,coldCoin]:coinMat,N);im.castShadow=true;g.add(im);
  const pl=plate(label,sub,labelCol);pl.position.set(x,1.45*big,z);
  g.userData={pl,fill(n){const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<N;i++){const layer=Math.floor(i/7),j=i%7;const a=j===0?0:(j-1)/6*Math.PI*2+layer*.6,rr=j===0?0:.2;const s=i<n?1:0;
    q.setFromEuler(new THREE.Euler(.06*Math.sin(i),i,.06*Math.cos(i*1.3)));M.compose(V(Math.cos(a)*rr,.05+layer*CH*1.05,Math.sin(a)*rr),q,V(s,s,s));im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}};
  g.userData.fill(0);S.add(g);return g}
const FUND=jar(20,0,'FONDO INDEXADO','la carrera entera','#ffd77a',false,1.6);
// empresas: cubitos de colores que caen dentro; tres grandes con nombre
const NC=260,CUBES=new THREE.InstancedMesh(new THREE.BoxGeometry(.11,.11,.11),new THREE.MeshStandardMaterial({roughness:.4,metalness:.2}),NC);S.add(CUBES);
{const c=new THREE.Color();for(let i=0;i<NC;i++){c.setHSL(R(),.65,.55);CUBES.setColorAt(i,c)}}
const CSEED=[...Array(NC)].map(()=>[R()*2-1,R()*2-1,R(),R()]);
const BIG=['Apple','Microsoft','Nvidia'].map((n,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.34,.34,.34),new THREE.MeshStandardMaterial({map:tex(256,256,(g)=>{g.fillStyle=['#e9e9ee','#2f7cf6','#76b900'][i];g.fillRect(0,0,256,256);g.fillStyle=i?'#fff':'#111';g.font='800 46px Figtree';g.textAlign='center';g.textBaseline='middle';g.fillText(n,128,128)}),roughness:.4}));m.castShadow=true;S.add(m);return m});
foco(20,0,'#ffbf55',300,.35,6.5);const GF=glow(20,1.2,-.6,4.2,.8);
// barras de empresas: una cae, las demás suben
const BARS=[...Array(7)].map((_,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.32,1,.32),new THREE.MeshStandardMaterial({color:'#e2ab3c',metalness:.5,roughness:.3,emissive:'#3a2405'}));m.castShadow=true;m.position.set(18.2+i*.6,0,2.6);S.add(m);return m});

// ───────── C: el podio ─────────
const POD=[[32,1.0,'1'],[30.9,.72,'2'],[33.1,.48,'3']].map(([x,h,n])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.05,h,1.0),new THREE.MeshStandardMaterial({color:'#d8d2c6',roughness:.5}));m.position.set(x,h/2,-6);m.castShadow=m.receiveShadow=true;S.add(m);
  const t=plate(n,null,'#1b1b22',.4,'rgba(255,255,255,0)');t.position.set(x,h*.55,-5.49);return {m,h,x}});
const PODK=knights.map(()=>null);const winner=new THREE.Group();{const mat=new THREE.MeshStandardMaterial({color:'#c05ae8',roughness:.35,emissive:'#c05ae8',emissiveIntensity:.15});const k=new THREE.Mesh(kGeo,mat),b=new THREE.Mesh(baseGeo,mat);b.position.y=.07;winner.add(k,b);winner.rotation.y=-Math.PI*.35;winner.position.set(32,1.0,-6);S.add(winner)}
const FUND2=jar(30.9,-6,'TU FONDO','2.º o 3.º','#ffd77a',false,.8);FUND2.position.y=.72;FUND2.userData.pl.position.y=.72+1.45*.8;
const CROWD=[...Array(24)].map((_,i)=>{const m=new THREE.Mesh(kGeo,new THREE.MeshStandardMaterial({color:'#6b7080',roughness:.6}));m.scale.setScalar(.7);m.rotation.y=-Math.PI/2+(R()-.5);m.position.set(29.6+(i%8)*.42+R()*.1,0,-7.6-Math.floor(i/8)*.5);m.castShadow=true;S.add(m);return m});
foco(32,-6,'#ffd7a0',220,.5,7);const GP=glow(30.9,1.6,-6.5,2.6,.7);

// ───────── D: año a año (≈8 % de media, con años malos) ─────────
const YEARS=[1,1.08,1.17,.98,1.12,1.25,1.36,1.18,1.33,1.47,1.6,1.74];const YS=YEARS.map((v,i)=>{const im=new THREE.InstancedMesh(coinGeo,v<YEARS[i-1]?[redM(),redM(),redM()]:coinMat,40);im.position.set(41.2+i*.52,0,0);im.scale.setScalar(2.1);im.castShadow=true;S.add(im);return im});
function redM(){return new THREE.MeshStandardMaterial({color:'#ff4b3e',emissive:'#5a0d08',metalness:.4,roughness:.4})}
function stackN(im,n){const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<40;i++){const s=i<n?1:0;q.setFromEuler(new THREE.Euler(0,i*.7,0));M.compose(V(Math.sin(i*2.1)*.004,.011+i*CH*1.02,0),q,V(s,s,s));im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}
foco(44,0,'#ffd7a0',180,.6,7);

// ───────── E: invertido contra parado ─────────
const INV=jar(57.1,0,'INVERTIDO','fondo indexado','#ffd77a'),IDLE=jar(54.9,0,'PARADO','en el banco','#c9d3e6',true);
foco(57.1,0,'#ffbf55',300,.3);foco(54.9,0,'#8fa6ff',55,.28);const GI=glow(57.1,.7,-.4,2.6,.8);
const RAIN=[...Array(24)].map(()=>{const c=new THREE.Mesh(coinGeo,coinMat);c.castShadow=true;S.add(c);c.visible=false;return c});
const GHOST=[...Array(12)].map(()=>{const c=new THREE.Mesh(coinGeo,new THREE.MeshStandardMaterial({color:'#ff4b3e',emissive:'#ff2a1a',emissiveIntensity:.6,transparent:true,opacity:.6}));S.add(c);c.visible=false;return c});

// ───────── F: rumbo al millón ─────────
const TOWER=new THREE.InstancedMesh(coinGeo,coinMat,220);TOWER.position.set(68,0,0);TOWER.scale.setScalar(6);TOWER.castShadow=true;S.add(TOWER);
const MILLON=plate('1.000.000 €','tu primer millón','#ffd77a',3.2);MILLON.position.set(68,28,0);
foco(68,0,'#ffbf55',260,.5,9);const GT=glow(68,27.6,-.5,8,.7);

// las mallas instanciadas cambian de sitio cada fotograma: que three.js no las recorte por su caja inicial
S.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false});

// ───────── tiempos ─────────
const T={carrera:vt('carrera'),prof:vt('profesionales'),nueve:vt('nueve'),detras:vt('detras'),y2:vt('y',2),comprar:vt('comprar'),indexado:vt('indexado'),con:vt('con'),trocito:vt('trocito'),
  trescientas:vt('trescientas'),si:vt('si'),mal:vt('mal'),tiran:vt('tiran'),no2:vt('no',2),ganador:vt('ganador'),delante:vt('delante'),segundo:vt('segundo'),nada:vt('nada'),
  y3:vt('y',3),ocho:vt('8 %'),malos:vt('malos'),este:vt('este'),quince:vt('15 %'),con2:vt('con',3),quin:vt('quinientos'),si2:vt('si',2),parados:vt('parados'),dejado:vt('dejado'),
  asi:vt('asi'),comprar2:vt('comprar',2),esperar:vt('esperar'),sig:vt('sigueme'),millon:vt('millon')};
const raceZ=t=>-2.2*t;   // la barrera avanza 2,2 m/s
const K=[
  [0,[3.2,1.4,2.8],[-.5,.6,-3]],[2.8,[3.4,1.6,-2],[0,.6,-8.5]],[T.prof,[5.4,3.2,-6.4],[0,.4,-14]],[T.nueve+.6,[4.6,4.4,-12],[0,.3,-21.5]],
  [T.y2,[3.6,4.0,-21],[0,.6,-26]],[T.indexado-.4,[3.2,3.4,-25],[0,.8,-31]],
  [T.indexado-.35,[20,2.6,5.6],[20,1.3,0]],[T.trocito+.6,[20.8,2.5,4.4],[20,1.3,0]],[T.si,[21,2.2,6.4],[20.3,.9,1.6]],[T.no2-.05,[20.8,2.0,6.2],[20.3,.8,2]],
  [T.no2,[29.6,2.4,.2],[32,1.0,-6]],[T.segundo+.5,[30.8,2.3,-.6],[31.6,1.1,-6]],[T.y3-.05,[32,2.6,.4],[32,1.0,-6]],
  [T.y3,[44,2.2,6.2],[44,1.0,0]],[T.este-.05,[45.2,2.6,5.4],[44.4,1.2,0]],
  [T.este,[57.1,1.8,3.2],[57.1,.9,0]],[T.con2,[57.1,1.9,3.4],[57.1,.9,0]],[T.si2,[56,2.0,4.6],[56,.95,0]],[T.asi-.05,[56,2.1,4.8],[56,.95,0]],
  [T.asi,[5,4.5,-104],[0,.5,-112]],[T.esperar+.4,[8,10,-108],[0,.5,-124]],[T.sig-.05,[9,12,-110],[0,.5,-128]],
  [T.sig,[74,4,14],[68,6,0]],[DUR,[74,31,15],[68,26.5,0]]];

const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
const pill=(id,y,html,k,cls='')=>{if(k<=0)return;const e=$(id);e.className='ov tag '+cls;tag(e,{x:540,y,on:true},html,k)};
const grey=new THREE.Color('#5a5f6e');

window.render=function(t){
  for(const id of OV)$(id).style.opacity=0;
  ruta(t,K);
  // A: carrera — caballos que galopan; a partir de «nueve», 9 quedan detrás de la barrera
  const gz=raceZ(t);GATE.position.set(0,.75,gz);GATE_PL.position.set(0,1.85,gz);GATE.visible=GATE_PL.visible=t>T.prof-.2;GATE.material.opacity=.55*eo(p(t,T.prof-.2,.5));GATE_PL.material.opacity=eo(p(t,T.prof,.4));
  lightRace.position.set(.6,8,gz+2.2);lightRace.target.position.set(0,.4,gz-1);
  const behind=eo(p(t,T.nueve-.1,1.2));
  knights.forEach((k,i)=>{const lead=Math.sin(i*1.7)*1.6+Math.sin(t*1.3+i)*.5;const back=i===4?-1.8:2.2+(i%5)*.55+(i>4?.6:0);
    const z=gz+lerp(lead,back,behind);k.position.set((i-NK/2+.5)*LANE,Math.abs(Math.sin(t*9+i))*.18,z);k.rotation.z=Math.sin(t*9+i)*.08;
    k.userData.mat.color.copy(k.userData.col).lerp(grey,i===4?0:behind*.85);k.userData.mat.emissiveIntensity=i===4?.25:.15*(1-behind)});
  pill('lab1',380,'¿qué caballo <b>gana</b>?',p(t,1.5,.25)*(1-p(t,T.prof-.3,.2)));
  pill('cnt',380,'<b>9 de cada 10</b><small>fondos de profesionales, por detrás (10 años)</small>',p(t,T.nueve-.05,.25)*(1-p(t,T.y2-.2,.2)),'big');
  // B: el fondo — la carrera entera se compra
  const nFill=Math.round(lerp(0,70,eo(p(t,T.indexado,1.2))));FUND.userData.fill(nFill);
  const M=new THREE.Matrix4(),q=new THREE.Quaternion();for(let i=0;i<NC;i++){const [a,b,c,d]=CSEED[i];const t0=T.trocito-.3+c*1.6,k=eo(p(t,t0,.6));const s=k>0?1.2:0;
    const P=V(20+a*.42,lerp(4.5,.2+d*1.3,k),b*.42);q.setFromEuler(new THREE.Euler(a*3+k*4,b*3,c*3));M.compose(P,q,V(s,s,s));CUBES.setMatrixAt(i,M)}
  CUBES.instanceMatrix.needsUpdate=true;
  BIG.forEach((m,i)=>{const k=eo(p(t,T.trescientas+.2+i*.25,.5));m.visible=k>0;m.position.set(19.5+i*.5,lerp(4.5,2.0+(i%2)*.2,k),.9);m.rotation.set(.3,.5+i*.4,0)});
  pill('cnt',380,'<b>+1.300 empresas</b><small>en un solo fondo</small>',p(t,T.trescientas-.05,.25)*(1-p(t,T.si-.2,.2)),'big');
  // barras: una cae en rojo, las demás tiran hacia arriba
  BARS.forEach((m,i)=>{const bad=i===2,k=p(t,T.mal-.1,.8),u=p(t,T.tiran-.1,1);const h=bad?lerp(1.1,.25,eo(k)):lerp(.7+(i%3)*.15,1.25+(i%3)*.2,eo(u));m.scale.y=h;m.position.y=h/2;
    m.material.color.set(bad&&k>0?'#ff4b3e':'#e2ab3c');m.material.emissive.set(bad&&k>0?'#5a0d08':'#3a2405');m.visible=t>T.si-.3&&t<T.no2});
  pill('lab2',380,'una cae, <b>las demás tiran</b>',p(t,T.tiran-.05,.25)*(1-p(t,T.no2-.2,.2)));
  // C: el podio — tu fondo sube al 2.º puesto; los demás, detrás
  const kf=eo(p(t,T.segundo-.4,.6));FUND2.position.y=.72+3*(1-kf);FUND2.userData.pl.position.y=FUND2.position.y+1.45*.8;FUND2.userData.fill(46);FUND2.visible=kf>0;FUND2.userData.pl.visible=kf>0;
  pill('cnt',380,'<b>por delante de 9 de cada 10</b>',p(t,T.delante-.05,.25)*(1-p(t,T.y3-.2,.2)),'big');
  // D: año a año
  YS.forEach((im,i)=>{const k=eo(p(t,T.y3+.3+i*.12,.5));stackN(im,Math.round(YEARS[i]*14*k))});
  pill('cnt',380,'<b>≈ 8 %</b><small>al año de media (desde 1970)</small>',p(t,T.ocho-.05,.25)*(1-p(t,T.este-.2,.2)),'big');
  pill('lab3',520,'años malos: <b>en rojo</b>',p(t,T.malos-.05,.25)*(1-p(t,T.este-.2,.2)),'red');
  // E: este año — invertido gana, parado no
  INV.userData.fill(Math.round(56+lerp(0,28,eo(p(t,T.quince,2.5)))));IDLE.userData.fill(56);
  RAIN.forEach((m,i)=>{const t0=T.quince-.2+i*.13,k=(t-t0)/.5;m.visible=k>0&&k<1&&t<T.asi;if(m.visible){m.position.set(57.1+Math.sin(i)*.12,2.1-1.4*eo(k),Math.cos(i)*.12);m.rotation.set(k*7,i,0)}});
  GHOST.forEach((m,i)=>{const k=eo(p(t,T.dejado-.3+i*.05,.8));m.visible=k>0&&t<T.asi;m.position.set(54.9+Math.sin(i*2)*.25,1.1+k*(.6+i*.12),Math.cos(i*2)*.2);m.rotation.set(i,k*4,0);m.material.opacity=.7*(1-p(t,T.dejado+1.2,.6))});
  pill('cnt',380,'<b>+14,8 %</b><small>este año (índice mundial)</small>',p(t,T.quince-.05,.25)*(1-p(t,T.con2-.2,.2)),'big');
  if(t>T.con2&&t<T.asi){tag($('lab1'),proj(V(57.1,1.95,0),cam),'<b>+1.500 €</b>',p(t,T.quin-.1,.25),0,-40);$('lab1').className='ov tag';
    tag($('lab2'),proj(V(54.9,1.95,0),cam),'<b>0 €</b>',p(t,T.parados-.1,.25),0,-40);$('lab2').className='ov tag red'}
  pill('big',380,'<b>−1.500 €</b> que no ganaste',p(t,T.dejado-.05,.25)*(1-p(t,T.asi-.2,.2)),'red');
  // F: la torre rumbo al millón
  const nT=Math.round(lerp(10,200,eo(p(t,T.sig,DUR-T.sig))));{const M2=new THREE.Matrix4(),q2=new THREE.Quaternion();for(let i=0;i<220;i++){const s=i<nT?1:0;q2.setFromEuler(new THREE.Euler(0,i*.7,0));M2.compose(V(Math.sin(i*2.1)*.004,.011+i*CH*1.02,0),q2,V(s,s,s));TOWER.setMatrixAt(i,M2)}TOWER.instanceMatrix.needsUpdate=true}
  pill('cnt',380,'<b>Sígueme</b><small>y construye tu primer millón</small>',p(t,T.millon-.3,.25),'big');
  r.render(S,cam);
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
window.setCam=(p_,l)=>{cam.position.set(...p_);cam.lookAt(...l);cam.updateMatrixWorld();r.render(S,cam)};
const CLAVES=[['caballo',1],['detras',1],['indexado',1],['tiran',1],['segundo',1],['8 %',1],['15 %',1],['ganar',2],['esperar',1],['millon',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:KEYT.has(w.s)}));
window.ready=true;
