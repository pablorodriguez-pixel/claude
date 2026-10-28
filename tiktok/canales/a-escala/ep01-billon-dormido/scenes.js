// EP01 — «El billón dormido» (formato escala). 1,1 billones € en depósitos de hogares (BdE, ago 2026) en billetes de 50 €.
// Cada plano empieza en su palabra (W): si cambia la voz, la imagen la sigue.
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
 {const c=document.createElement('canvas');c.width=2048;c.height=1024;const g=c.getContext('2d');g.fillStyle='#04050d';g.fillRect(0,0,2048,1024);
  for(let i=0;i<70;i++){const x=R()*2048,y=200+R()*620,rad=80+R()*320,hue=[230,255,280,210][i%4];const gr=g.createRadialGradient(x,y,0,x,y,rad);gr.addColorStop(0,`hsla(${hue},60%,38%,.16)`);gr.addColorStop(1,`hsla(${hue},60%,30%,0)`);g.fillStyle=gr;g.fillRect(0,0,2048,1024)}
  const nt=new THREE.CanvasTexture(c);nt.colorSpace=THREE.SRGBColorSpace;
  s.add(new THREE.Mesh(new THREE.SphereGeometry(300000,64,32),new THREE.MeshBasicMaterial({map:nt,side:THREE.BackSide,depthWrite:false})))}
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

// ───────── TIEMPO DE LA VOZ ─────────
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]/g,'').toLowerCase();
function vt(w,n=1){let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw new Error('palabra '+w)}
const T0={climb:0,earth:vt('un'),table:vt('imagina'),bundle:vt('un',2),city:vt('ahora'),space:vt('no',2),loss:vt('pero'),remate:vt('asi'),cierre:vt('enviaselo')};
const shots=Object.entries(T0).sort((a,b)=>a[1]-b[1]).map(([k,a],i,arr)=>[k,a,i+1<arr.length?arr[i+1][1]:99]);
const tA=vt('apila');
const HKF=[[tA+.15,.011],[vt('torre')-.4,2],[vt('rascacielos'),260],[vt('nubes'),2200],[vt('everest'),9000],[vt('sigue')+.3,30000],[T0.space,60000]];
function HK(t){if(t<=HKF[0][0])return HKF[0][1];for(let i=1;i<HKF.length;i++){const[a,ha]=HKF[i-1],[b,hb]=HKF[i];if(t<=b)return lerpLog(ha,hb,(t-a)/(b-a))}return HKF.at(-1)[1]}
{const t=vt('everest');const a=lerp(.4,1.1,eio((t-T0.city)/(T0.space-T0.city)));S.ev.position.set(-Math.sin(a)*42000,4424,-Math.cos(a)*42000);S.evTop=V(-Math.sin(a)*42000,8900,-Math.cos(a)*42000)}

const camAt=(c,pos,look)=>{c.position.copy(pos);c.lookAt(look)};
const side=V(0,0,1).cross(UP).normalize(),fwd=UP.clone().cross(side).normalize();
const onEarth=(alt,dSide,dFwd)=>UP.clone().multiplyScalar(RE+alt).add(side.clone().multiplyScalar(dSide)).add(fwd.clone().multiplyScalar(dFwd));
const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
function hideAll(){for(const id of OV)$(id).style.opacity=0}
const pill=(id,x,y,html,k,cls='')=>{const e=$(id);e.className='ov tag '+cls;tag(e,{x,y,on:true},html,k)};

// La torre vista desde fuera, subiendo (hook y cierre: el último plano enlaza con el primero).
function climb(t,t0,t1,rev=false){const c=E.c;c.up.copy(UP);E.chunk.visible=false;E.dust.visible=false;E.tw.userData.mat.emissiveIntensity=.25;
  let k=eio(p(t,t0,t1-t0));if(rev)k=1-k;
  // la cámara baja pegada a la torre, desde su punta hasta España
  const alt=lerpLog(2300,1500,k),d=lerp(260,420,k);
  camAt(c,onEarth(alt,-d,-d*.35),UP.clone().multiplyScalar(RE+alt*lerp(.55,.2,k)));
  E.tw.userData.update(TOWER_KM,d*.012,1000);
  r.render(E.s,c)}

// Un tramo de 44 km que se tiñe de rojo y se deshace en polvo.
function melt(t,tRed,tGo,H_,w){const red=p(t,tRed,.5),go=p(t,tGo,1.6),seg=44,g=eo(go);
  E.chunk.visible=red>0&&go<1;E.chunk.material.opacity=1;E.chunk.scale.set(w,seg*(1-g)+.01,w*.6);E.chunk.position.y=H_+seg*(1-g)/2+g*30;
  E.dust.visible=go>0&&go<1;if(E.dust.visible){const sd=E.dust.userData.seed,ar=E.dust.geometry.attributes.position.array;
    for(let i=0;i<900;i++){const a=sd[i*4],b=sd[i*4+1],cc=sd[i*4+2],d=sd[i*4+3];const q=g*(.4+d);ar[i*3]=a*w*2+a*160*q;ar[i*3+1]=H_+b*seg*(1-g)+(d+.2)*90*q;ar[i*3+2]=cc*w+cc*160*q}
    E.dust.geometry.attributes.position.needsUpdate=true;E.dust.material.opacity=1-go}
  return red}

function earthShot(t,mode,a,b){
  const c=E.c;c.up.copy(UP);let H_=TOWER_KM;E.chunk.visible=false;E.dust.visible=false;
  if(mode==='earth'){const k=eio(p(t,a,b-a));const push=eio(p(t,vt('ves')-.2,b-vt('ves')+.2));
    const dist=lerp(lerp(19000,15500,k),9000,push),ang=lerp(.5,.3,k);
    camAt(c,UP.clone().multiplyScalar(dist*Math.cos(ang)).add(side.clone().multiplyScalar(dist*Math.sin(ang))).add(fwd.clone().multiplyScalar(-dist*.18)),UP.clone().multiplyScalar(lerp(RE*.55+TOWER_KM*.6,RE+400,push)));
    pill('cnt',540,470,'<b>1.100.000.000.000 €</b><small>en el banco</small>',p(t,vt('billon')-.05,.25)*(1-p(t,vt('ves')-.3,.3)),'big')}
  if(mode==='space'){H_=Math.min(TOWER_KM,lerpLog(60,TOWER_KM,eo(p(t,a,vt('kilometros')-a))));
    const k=eio(p(t,a,vt('kilometros')-a+.6));const dist=lerpLog(1400,11000,k);
    const iss=eio(p(t,vt('cinco',2)-.2,vt('espacial')-vt('cinco',2)+.6));
    camAt(c,onEarth(lerp(250,1800,k),-lerp(dist,1500,iss),-lerp(dist*.25,300,iss)),UP.clone().multiplyScalar(RE+lerp(lerp(400,1100,k),420,iss)));
    const ip=UP.clone().multiplyScalar(RE+408).add(side.clone().multiplyScalar(70));
    tag($('lab1'),proj(ip,c),'Estación Espacial · <b>400 km</b>',p(t,vt('estacion')-.1,.25),0,-90);
    bracket($('br1'),proj(UP.clone().multiplyScalar(RE),c),proj(UP.clone().multiplyScalar(RE+H_),c),'2.200 km',p(t,vt('kilometros')-.1,.5)*(1-p(t,vt('mas',2)-.2,.3)))}
  if(mode==='loss'){const top=UP.clone().multiplyScalar(RE+TOWER_KM),k=eio(p(t,a,b-a));
    camAt(c,top.clone().add(side.clone().multiplyScalar(-lerp(820,640,k))).add(UP.clone().multiplyScalar(lerp(420,330,k))).add(fwd.clone().multiplyScalar(-200)),top.clone().add(UP.clone().multiplyScalar(-160)));
    const tR=vt('desaparecieran'),tG=vt('cuarenta');H_=TOWER_KM-(t>=tR?44:0);
    const w=Math.max(BILL.w/1000,c.position.distanceTo(UP.clone().multiplyScalar(RE+H_*.5))*.016)*1.05;
    const red=melt(t,tR,tG,H_,w);
    // los precios suben: la torre entera pierde brillo
    E.tw.userData.mat.emissiveIntensity=.25-.15*p(t,vt('inflacion'),.8);
    pill('lab2',540,800,'precios <b>+2 % / año</b>',p(t,vt('precios')-.05,.25)*(1-p(t,tR-.2,.3)),'red');
    bracket($('br2'),proj(UP.clone().multiplyScalar(RE+H_+44),c),proj(UP.clone().multiplyScalar(RE+H_),c),'−44 km / año',p(t,vt('cuarenta')-.1,.3));
    pill('big',540,800,'<b>= 5 Everest</b> cada año',p(t,vt('cinco',3)-.05,.25),'red')}
  if(mode==='remate'){const k=eio(p(t,a,b-a));const dist=lerp(11000,16000,k);H_=TOWER_KM-44;
    camAt(c,UP.clone().multiplyScalar(dist*.92).add(side.clone().multiplyScalar(-dist*.38)).add(fwd.clone().multiplyScalar(-dist*.12)),UP.clone().multiplyScalar(RE*.6+TOWER_KM*.5));
    const tR=vt('derrite')-.15;H_-=t>=tR?44:0;const w=c.position.distanceTo(UP.clone().multiplyScalar(RE+H_*.5))*.0045;melt(t,tR,tR+.4,H_,w)}
  if(mode!=='loss')E.tw.userData.mat.emissiveIntensity=.25;
  E.tw.userData.update(H_,c.position.distanceTo(UP.clone().multiplyScalar(RE+H_*.5))*(mode==='loss'?.016:.0045),1000);
  r.render(E.s,c)}

window.render=function(t){
  hideAll();
  const [sh,a,b]=shots.find(([,a,b])=>t>=a&&t<b);
  if(sh==='climb')climb(t,0,b+.6);
  if(sh==='cierre')climb(t,a,DUR,true);
  if(sh==='earth'||sh==='space'||sh==='loss'||sh==='remate')earthShot(t,sh,a,b);
  if(sh==='table'||sh==='bundle'){const c=T.c;
    T.bill.visible=sh==='table';T.bundle.visible=sh==='bundle';T.phone.visible=false;
    if(T.bill.visible){const tl=vt('billetes');const k=eo(p(t,tl-.5,.9));T.bill.position.set(0,.25*(1-k),0);T.bill.rotation.set(.5*(1-k)*Math.sin(t*6),.6*(1-k),.3*(1-k)*Math.cos(t*5));
      const z=eio(p(t,a,b-a));camAt(c,V(lerp(.05,.02,z),lerp(.42,.24,z),lerp(.36,.22,z)),V(0,0,0))}
    if(T.bundle.visible){const n=Math.round(lerp(1,100,eio(p(t,vt('fajo'),vt('cinco')-vt('fajo')))));T.bundle.userData.set(n);T.bundle.userData.band.visible=t>vt('cinco')-.05;
      const z=eio(p(t,a,b-a));camAt(c,V(lerp(-.03,.03,z),lerp(.24,.17,z),lerp(.52,.5,z)),V(0,.004,0));
      bracket($('br1'),proj(V(-.07,.0102,.0385),c),proj(V(-.07,0,.0385),c),'1 cm',p(t,vt('mide')-.05,.4))}
    r.render(T.s,c)}
  if(sh==='city'){const c=S.c,k=p(t,a,b-a);
    const h=HK(t);const look=Math.max(.008,h*.5),dist=Math.max(.32,h*.45),alt=Math.max(.06,h*.42);
    const an=lerp(.4,1.1,eio(k));camAt(c,V(Math.sin(an)*dist,alt,Math.cos(an)*dist),V(0,look,0));
    S.tw.userData.update(h,c.position.length()*.006);
    S.s.fog.density=.0012*Math.max(.02,1-alt/12000);S.s.background.set(new THREE.Color('#1b1f44').lerp(new THREE.Color('#05060f'),cl(alt/30000)));S.s.fog.color.copy(S.s.background);
    tag($('lab2'),proj(S.evTop,c),'Everest · <b>8.849 m</b>',p(t,vt('everest')-.05,.25)*(1-p(t,b-.4,.3)),0,-60);
    pill('lab3',540,470,'<b>'+(h<1?fmtES(h*100)+' cm':h<10000?fmtES(h)+' m':(h/1000).toFixed(0)+' km')+'</b>',p(t,tA,.25));
    r.render(S.s,c)}
  // subtítulo «palabra»: una sola palabra, la clave en oro y algo más grande
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
const CLAVES=['banco','ves','cincuenta','centimetro','sigue','espacial','come','desaparecieran','derrite','corriente'];
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:CLAVES.includes(norm(w.t))}));
window.ready=true;
