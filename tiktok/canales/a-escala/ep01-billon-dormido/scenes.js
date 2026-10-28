// EP01 — «El billón dormido». 1,1 billones € en depósitos de hogares (BdE, ago 2026) apilados en billetes de 50 €.
import {THREE,W,H,cl,eio,eo,p,lerp,lerpLog,fmtES,R,C,billTexture,edgeTexture,bandTexture,woodTexture,windowsTexture,cloudTexture,glowTexture,stack,tower,proj,bracket,tag,BILL} from '../build/lib.js';
const $=id=>document.getElementById(id);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);

const r=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,logarithmicDepthBuffer:true});
r.setSize(W,H);r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.1;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;
$('gl').appendChild(r.domElement);

await document.fonts.ready;
const BT=billTexture(),ET=edgeTexture();

// ───────── MESA (metros) ─────────
const T={s:new THREE.Scene(),c:new THREE.PerspectiveCamera(32,W/H,.005,50)};
{const s=T.s;s.background=new THREE.Color('#120a05');s.fog=new THREE.Fog('#120a05',.6,2.2);
 const wt=woodTexture();wt.repeat.set(2,2);
 const tb=new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshStandardMaterial({map:wt,color:'#8a7a70',roughness:.55}));tb.rotation.x=-Math.PI/2;tb.receiveShadow=true;s.add(tb);
 const key=new THREE.SpotLight('#ffd7a8',9,3,.6,.6,1);key.position.set(-.35,.9,.25);key.target.position.set(0,0,0);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0002;s.add(key,key.target);
 s.add(new THREE.HemisphereLight('#6d7bd6','#2a1206',.35));
 T.bill=stack(BT,ET);s.add(T.bill);
 T.bundle=stack(BT,ET,{band:bandTexture('5.000 €')});s.add(T.bundle);
 const ph=new THREE.Mesh(new THREE.BoxGeometry(.072,.008,.152),[0,1,2,3,4,5].map(i=>new THREE.MeshStandardMaterial({color:i==2?'#0c0f1c':'#2a2b30',roughness:i==2?.15:.4,metalness:.4})));
 ph.position.set(.125,.004,.01);ph.rotation.y=-.18;ph.castShadow=true;T.phone=ph;s.add(ph);
 // «tu cuenta»: fajo cuyo techo se vuelve rojo y se evapora
 T.mine=stack(BT,ET,{band:bandTexture('TU CUENTA')});s.add(T.mine);
}

// ───────── CIUDAD → CIELO (metros) ─────────
const S={s:new THREE.Scene(),c:new THREE.PerspectiveCamera(50,W/H,.01,400000)};
{const s=S.s;s.background=new THREE.Color('#1b1f44');s.fog=new THREE.FogExp2('#1b1f44',.0012);
 const gnd=new THREE.Mesh(new THREE.PlaneGeometry(400000,400000),new THREE.MeshStandardMaterial({color:'#121218',roughness:.95}));gnd.rotation.x=-Math.PI/2;s.add(gnd);
 // halos de farolas en el suelo
 const wt=windowsTexture();const bm=new THREE.MeshStandardMaterial({map:wt,emissiveMap:wt,emissive:'#ffffff',emissiveIntensity:1.1,color:'#888'});
 const N=420,box=new THREE.BoxGeometry(1,1,1),im=new THREE.InstancedMesh(box,bm,N);const M=new THREE.Matrix4();
 for(let i=0;i<N;i++){let x,z;do{x=(R()-.5)*1600;z=(R()-.5)*1600}while(Math.hypot(x,z)<30);const h=12+Math.pow(R(),2.2)*110,w=14+R()*26;
   M.compose(V(x,h/2,z),new THREE.Quaternion(),V(w,h,w*(.7+R()*.6)));im.setMatrixAt(i,M)}s.add(im);
 S.tc=new THREE.Mesh(new THREE.BoxGeometry(50,249,46),new THREE.MeshStandardMaterial({map:wt,emissiveMap:wt,emissive:'#aab8ff',emissiveIntensity:.7,color:'#8892c0',roughness:.2,metalness:.6}));
 wt.repeat.set(1,1);S.tc.position.set(-150,124.5,-260);s.add(S.tc);
 const mv=new THREE.HemisphereLight('#7e8cff','#20120a',1.2);s.add(mv);const dl=new THREE.DirectionalLight('#ffb37a',1.4);dl.position.set(1,.3,-1);s.add(dl);
 // nubes
 S.clouds=new THREE.Group();for(let i=0;i<220;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:cloudTexture(i%8+1),transparent:true,depthWrite:false,opacity:.5,fog:false}));
   const a=R()*Math.PI*2,d=150+Math.pow(R(),1.6)*14000;sp.position.set(Math.cos(a)*d,1700+R()*900,Math.sin(a)*d);const sc=900+R()*2200;sp.material.color.set('#e8ebff');sp.scale.set(sc,sc*.5,1);S.clouds.add(sp)}s.add(S.clouds);
 // Everest (ilustrativo: un pico de 8.849 m en el horizonte)
 const cg=new THREE.ConeGeometry(11000,8849,96,32,false);const pos=cg.attributes.position;
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),y=pos.getY(i),k=(y+4424)/8849,th=Math.atan2(z,x);const f=1+(.16*Math.sin(3*th+1)+.09*Math.sin(7*th+k*6)+.05*Math.sin(13*th-k*9))*(1-k*.6);pos.setX(i,x*f);pos.setZ(i,z*f);pos.setY(i,y+(f-1)*1800*(1-k))}cg.computeVertexNormals();
 S.ev=new THREE.Mesh(cg,new THREE.MeshStandardMaterial({color:'#dfe3f5',emissive:'#3a4270',roughness:.9,flatShading:true,fog:false}));S.ev.position.set(-9000,4424,-38000);s.add(S.ev);
 S.tw=tower(ET);s.add(S.tw);
 {const pl=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.4),new THREE.MeshBasicMaterial({map:glowTexture('#F5B841'),transparent:true,opacity:.22,depthWrite:false}));pl.rotation.x=-Math.PI/2;pl.position.y=.001;s.add(pl);
  const lamp=new THREE.PointLight('#ffc070',6,6,1.5);lamp.position.set(.4,1.6,.3);s.add(lamp)}
}

// ───────── ESPACIO (km) ─────────
const E={s:new THREE.Scene(),c:new THREE.PerspectiveCamera(40,W/H,.01,500000)};const RE=6371;
const LAT=40.4*Math.PI/180,LON=-3.7,PHI=(LON+180)*Math.PI/180;
const UP=V(-Math.cos(PHI)*Math.cos(LAT),Math.sin(LAT),Math.sin(PHI)*Math.cos(LAT)).normalize(); // Madrid
{const s=E.s;s.background=new THREE.Color('#05060f');
 const tl=new THREE.TextureLoader();const ld=u=>new Promise(res=>tl.load(u,t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;res(t)}));
 const [day,night]=await Promise.all([ld('../../build/tex/day.jpg'),ld('../../build/tex/night.jpg')]);
 E.earth=new THREE.Mesh(new THREE.SphereGeometry(RE,192,96),new THREE.MeshStandardMaterial({map:day,color:'#3a4a7a',emissiveMap:night,emissive:'#ffcf7a',emissiveIntensity:2.2,roughness:1}));s.add(E.earth);
 const atm=new THREE.Mesh(new THREE.SphereGeometry(RE*1.025,128,64),new THREE.ShaderMaterial({transparent:true,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false,
   vertexShader:'varying vec3 n;varying vec3 vp;void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vp=mv.xyz;gl_Position=projectionMatrix*mv;}',
   fragmentShader:'varying vec3 n;varying vec3 vp;void main(){float f=pow(1.-abs(dot(normalize(-vp),n)),3.);gl_FragColor=vec4(.35,.55,1.,1.)*f*.9;}'}));s.add(atm);
 const sg=new THREE.BufferGeometry(),sp=[];for(let i=0;i<5000;i++){const v=V(R()-.5,R()-.5,R()-.5).normalize().multiplyScalar(200000);sp.push(v.x,v.y,v.z)}
 sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));s.add(new THREE.Points(sg,new THREE.PointsMaterial({color:'#cfd6ff',size:1.6,sizeAttenuation:false})));
 const sun=new THREE.DirectionalLight('#ffffff',1.2);sun.position.copy(UP.clone().applyAxisAngle(V(0,1,0),1.4).multiplyScalar(10));s.add(sun);s.add(new THREE.AmbientLight('#5566aa',.5));
 E.tw=tower(ET);E.tw.position.copy(UP.clone().multiplyScalar(RE));E.tw.quaternion.setFromUnitVectors(V(0,1,0),UP);s.add(E.tw);
 // trozo que se pierde por inflación
 E.chunk=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:C.loss}));E.tw.add(E.chunk);
 E.dust=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:C.loss,size:3,sizeAttenuation:false,transparent:true}));
 {const a=[];for(let i=0;i<900;i++)a.push(R()-.5,R(),R()-.5,R());E.dust.userData.seed=a;E.dust.geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Array(900*3).fill(0),3))}E.tw.add(E.dust);
 // Estación Espacial (exagerada para que se vea) a 400 km
 const iss=new THREE.Group(),pm=new THREE.MeshStandardMaterial({color:'#c08a2e',emissive:'#6b4a12',metalness:.6,roughness:.3});
 iss.add(new THREE.Mesh(new THREE.BoxGeometry(14,2,2),new THREE.MeshStandardMaterial({color:'#ddd',emissive:'#444'})));
 for(const x of[-6,-3,3,6]){const pnl=new THREE.Mesh(new THREE.BoxGeometry(2,.2,9),pm);pnl.position.set(x,0,0);iss.add(pnl)}
 E.iss=iss;iss.position.copy(UP.clone().multiplyScalar(RE+408)).add(V(0,0,1).cross(UP).normalize().multiplyScalar(70));iss.lookAt(0,0,0);s.add(iss);
}
const TOWER_KM=2200;

const HKF=[[19.1,.011],[20.5,2],[21.4,260],[22.6,2200],[23.4,9500],[25.65,60000]];
function HK(t){if(t<=HKF[0][0])return HKF[0][1];for(let i=1;i<HKF.length;i++){const[a,ha]=HKF[i-1],[b,hb]=HKF[i];if(t<=b)return lerpLog(ha,hb,(t-a)/(b-a))}return HKF.at(-1)[1]}
{const a=lerp(.4,1.1,eio((23.3-18.6)/7.05));S.ev.position.set(-Math.sin(a)*42000,4424,-Math.cos(a)*42000);S.evTop=V(-Math.sin(a)*42000,8900,-Math.cos(a)*42000);
 S.tc.position.set(-Math.sin(.75)*260+60,124.5,-Math.cos(.75)*260)}
// ───────── PLANOS ─────────
const shots=[['earth',0,9.95],['table',9.95,18.6],['city',18.6,25.65],['space',25.65,32.1],['loss',32.1,43.6],['mine',43.6,99]];
const camAt=(c,pos,look)=>{c.position.copy(pos);c.lookAt(look)};
const side=V(0,0,1).cross(UP).normalize(),fwd=UP.clone().cross(side).normalize();
const onEarth=(alt,dSide,dFwd)=>UP.clone().multiplyScalar(RE+alt).add(side.clone().multiplyScalar(dSide)).add(fwd.clone().multiplyScalar(dFwd));
function hideAll(){for(const id of['lab1','lab2','lab3','br1','big','cnt','cap','end'])$(id).style.opacity=0}

function earthShot(t,mode){
  const c=E.c;c.up.copy(UP);let H_=TOWER_KM;
  E.chunk.visible=false;E.dust.visible=false;
  if(mode==='earth'){const k=eio(p(t,0,9.95));const a=lerp(.55,.2,k),dist=lerp(19000,13500,k);
    const pos=UP.clone().multiplyScalar(dist*Math.cos(a)).add(side.clone().multiplyScalar(dist*Math.sin(a))).add(fwd.clone().multiplyScalar(-dist*.18));
    camAt(c,pos,UP.clone().multiplyScalar(RE*.55+TOWER_KM*.6));
    const n=cl((t-1.7)/1.9);tag($('cnt'),{x:540,y:430,on:true},fmtES(1.1e12*eo(n))+' €',p(t,1.7,.3));
    tag($('cap'),{x:540,y:510,on:true},'depósitos de los hogares españoles',p(t,3.6,.4));
    if(t>5.7){const f=1-p(t,6.4,.6);$('cnt').style.opacity=f;$('cap').style.opacity=f}}
  if(mode==='space'){H_=Math.min(TOWER_KM,lerpLog(60,TOWER_KM,eo(p(t,25.65,3.3))));
    const k=eio(p(t,25.65,6.3));const dist=lerpLog(1400,11000,k);
    camAt(c,onEarth(lerp(250,1800,k),-dist,-dist*.25),UP.clone().multiplyScalar(RE+lerp(400,1100,k)));
    const a=proj(UP.clone().multiplyScalar(RE+408).add(side.clone().multiplyScalar(70)),c);tag($('lab1'),a,'Estación Espacial · 400 km',p(t,27.2,.3)*(1-p(t,29.3,.4)),0,-70);
    bracket($('br1'),proj(UP.clone().multiplyScalar(RE),c),proj(UP.clone().multiplyScalar(RE+H_),c),'2.200 km',p(t,29.5,.6))}
  if(mode==='loss'){const top=UP.clone().multiplyScalar(RE+TOWER_KM);
    const k=eio(p(t,32.1,11.5));camAt(c,top.clone().add(side.clone().multiplyScalar(-lerp(900,760,k))).add(UP.clone().multiplyScalar(-lerp(260,220,k))).add(fwd.clone().multiplyScalar(-200)),top.clone().add(UP.clone().multiplyScalar(-70)));
    // dos tramos de 44 km se tiñen y se deshacen (37,3 s y 41,9 s)
    let lost=0;const cut=(a)=>{const red=p(t,a,.6),go=p(t,a+.9,1.6);return {red,go}};
    const c1=cut(37.1),c2=cut(41.6);const seg=44;lost=seg*((c1.red>0)+(c2.red>0));H_=TOWER_KM-lost;
    const cur=c1.go>=1?c2:c1;E.chunk.visible=cur.red>0&&cur.go<1;
    const w=Math.max(BILL.w/1000,c.position.distanceTo(UP.clone().multiplyScalar(RE+H_*.5))*.009)*1.05;
    const g=eo(cur.go);E.chunk.scale.set(w,seg*(1-g)+.01,w*.6);E.chunk.position.y=H_+seg*(1-g)/2+g*30;
    E.dust.visible=cur.go>0&&cur.go<1;if(E.dust.visible){const sd=E.dust.userData.seed,ar=E.dust.geometry.attributes.position.array;
      for(let i=0;i<900;i++){const[a,b,cc,d]=sd.slice(i*4,i*4+4);const q=g*(.4+d);ar[i*3]=a*w*2+a*160*q;ar[i*3+1]=H_+b*seg*(1-g)+(d+.2)*90*q;ar[i*3+2]=cc*w+cc*160*q}
      E.dust.geometry.attributes.position.needsUpdate=true;E.dust.material.opacity=1-cur.go}
    bracket($('br1'),proj(UP.clone().multiplyScalar(RE+H_+seg),c),proj(UP.clone().multiplyScalar(RE+H_),c),'−44 km / año',cur.red*(1-p(t,cur===c1?38.6:43.2,.3)));
    tag($('lab2'),{x:540,y:1300,on:true},'inflación 2 % → −2 % de poder de compra',p(t,35.8,.4)*(1-p(t,40.5,.3)));
    tag($('big'),{x:540,y:520,on:true},'≈ 5 × <span class="mtn">▲▲▲▲▲</span> Everest',p(t,40.7,.35)*(1-p(t,43.3,.3)))}
  E.tw.userData.update(H_,c.position.distanceTo(UP.clone().multiplyScalar(RE+H_*.5))*(mode==='loss'?.009:.0045),1000);
  r.render(E.s,c)}

window.render=function(t){
  hideAll();
  const sh=shots.find(([,a,b])=>t>=a&&t<b)[0];
  if(sh==='earth'||sh==='space'||sh==='loss') earthShot(t,sh);
  if(sh==='table'||sh==='mine'){const c=T.c;
    T.bill.visible=sh==='table'&&t<13.9;T.bundle.visible=sh==='table'&&t>=13.9;T.phone.visible=T.bundle.visible&&t>16.3;T.mine.visible=sh==='mine';
    if(T.bill.visible){const k=eo(p(t,9.95,.9));T.bill.position.set(0,.25*(1-k),0);T.bill.rotation.set(.5*(1-k)*Math.sin(t*6),.6*(1-k),.3*(1-k)*Math.cos(t*5));
      const z=eio(p(t,9.95,3.9));camAt(c,V(lerp(.05,.02,z),lerp(.42,.24,z),lerp(.36,.22,z)),V(0,0,0));
      tag($('lab1'),proj(V(0,0,-.05),c),'1 billete · 50 €',p(t,11,.3),0,-60)}
    if(T.bundle.visible){const n=Math.round(lerp(1,100,eio(p(t,14,1.4))));T.bundle.userData.set(n);T.bundle.userData.band.visible=t>15.4;
      T.phone.position.y=.004+.15*(1-eo(p(t,16.3,.5)));
      const z=eio(p(t,13.9,4.7));camAt(c,V(lerp(-.04,.1,z),lerp(.2,.1,z),lerp(.36,.34,z)),V(.025,.004,0));
      tag($('lab1'),proj(V(0,.012,-.06),c),n<100?n+' billetes':'100 billetes · 5.000 €',p(t,14.1,.3),0,-60);
      bracket($('br1'),proj(V(-.07,.0102,.0385),c),proj(V(-.07,0,.0385),c),'≈ 1 cm',p(t,16.6,.4))}
    if(T.mine.visible){T.mine.userData.set(100);T.mine.position.set(0,0,0);T.mine.userData.band.visible=true;
      const z=eio(p(t,43.6,7));camAt(c,V(lerp(.08,.0,z),lerp(.18,.24,z),lerp(.34,.3,z)),V(0,.005,0));
      const top=T.mine.userData.body.material[2];const lk=p(t,47.9,1.4);top.color.set(new THREE.Color('#ffffff').lerp(new THREE.Color(C.loss),lk));
      T.mine.userData.set(100-2*eo(p(t,48.4,1.2)));
      tag($('lab1'),proj(V(0,.012,-.06),c),'tu cuenta',p(t,43.8,.3)*(1-p(t,50.5,.3)),0,-150);
      tag($('lab2'),proj(V(0,.012,.05),c),'−2 % / año',p(t,48.4,.3)*(1-p(t,50.5,.3)),0,-240);
      const e=p(t,50.7,.5);$('end').style.opacity=e;$('end').style.transform=`translateY(${(1-eo(e))*40}px)`}
    r.render(T.s,c)}
  if(sh==='city'){const c=S.c,k=p(t,18.6,7.05);
    const h=HK(t);
    const look=Math.max(.008,h*.5),dist=Math.max(.32,h*.45),alt=Math.max(.06,h*.42);
    const a=lerp(.4,1.1,eio(k));camAt(c,V(Math.sin(a)*dist,alt,Math.cos(a)*dist),V(0,look,0));
    S.tw.userData.update(h,c.position.length()*.006);
    S.s.fog.density=.0012*Math.max(.02,1-alt/12000);S.s.background.set(new THREE.Color('#1b1f44').lerp(new THREE.Color('#05060f'),cl(alt/30000)));S.s.fog.color.copy(S.s.background);
    tag($('lab1'),proj(S.tc.position.clone().setY(262),c),'Torre de Cristal · 249 m',p(t,21.3,.3)*(1-p(t,22.5,.3)),0,-40);
    tag($('lab2'),proj(S.evTop,c),'Everest · 8.849 m',p(t,23.3,.3)*(1-p(t,25.2,.3)),0,-40);
    tag($('lab3'),{x:540,y:430,on:true},fmtES(h<1?h*100:h)+(h<1?' cm':' m'),p(t,18.7,.3));
    r.render(S.s,c)}
  // subtítulos: una palabra cada vez
  const w=WORDS.find(x=>t>=x.s-.03&&t<x.e2);const sb=$('subs');
  if(w&&!(t>50.6)){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.n?'n':'';const k=p(t,w.s-.03,.1);sb.style.transform=`translate(-50%,-50%) scale(${.88+.12*eo(k)})`}else sb.style.opacity=0;
  $('bar').style.width=(100*cl(t/DUR))+'%';
};
const NUM=/^(billón|cien|mil|millones|cincuenta|cinco|centímetro|dos|doscientos|kilómetros|cuarenta|cuatro|ciento|Everest)$/i;
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.5),n:NUM.test(w.t)}));
window.ready=true;
