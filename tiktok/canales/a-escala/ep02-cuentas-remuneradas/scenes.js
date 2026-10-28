// EP02 — «Cuentas remuneradas». Formato pregunta/mito: el banco gana con tus ahorros; una remunerada te paga ~3 %.
// Ritmo de la referencia: la cámara no para (rutas continuas entre palabras), objetos grandes, pocos cortes.
import {THREE,W,H,cl,eio,eo,p,lerp,fmtES,R,C,billTexture,edgeTexture,bandTexture,woodTexture,windowsTexture,glowTexture,stack,proj,tag,BILL} from '../build/lib.js';
const $=id=>document.getElementById(id);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const r=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
r.setSize(W,H);r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.15;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;
$('gl').appendChild(r.domElement);
await document.fonts.ready;
const BT=billTexture(),ET=edgeTexture();
const RED=new THREE.Color(C.loss),WHITE=new THREE.Color('#ffffff');

// ───────── tiempo de la voz ─────────
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]/g,'').toLowerCase();
function vt(w,n=1){let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw new Error('palabra '+w)}

// ───────── cámara: rutas por claves (cada movimiento arranca y frena en su palabra) ─────────
function ruta(c,t,keys){let f=keys[0][1].f||50;for(const k of keys){if(k[1].f)f=k[1].f;else k[1].f=f}let i=0;while(i<keys.length-1&&t>=keys[i+1][0])i++;
  const [ta,a]=keys[i],[tb,b]=keys[Math.min(i+1,keys.length-1)];const u=tb>ta?eio(cl((t-ta)/(tb-ta))):0;
  const P=V(...a.p).lerp(V(...b.p),u),L=V(...a.l).lerp(V(...b.l),u);c.position.copy(P);c.lookAt(L);
  c.fov=lerp(a.f,b.f,u);c.updateProjectionMatrix()}

// ───────── piezas ─────────
const coinTex=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
  const gr=g.createRadialGradient(110,100,10,128,128,128);gr.addColorStop(0,'#fff1b0');gr.addColorStop(.5,'#f2b93b');gr.addColorStop(1,'#a8701a');g.fillStyle=gr;g.fillRect(0,0,256,256);
  g.strokeStyle='rgba(120,70,10,.7)';g.lineWidth=10;g.beginPath();g.arc(128,128,108,0,7);g.stroke();
  g.fillStyle='rgba(110,64,8,.85)';g.font='900 150px Figtree, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('€',128,136);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t})();
const coinMat=[new THREE.MeshStandardMaterial({color:'#d9a43a',metalness:.9,roughness:.3,emissive:'#3a2405'}),new THREE.MeshStandardMaterial({map:coinTex,metalness:.6,roughness:.35,emissive:'#2a1a04'}),new THREE.MeshStandardMaterial({map:coinTex,metalness:.6,roughness:.35,emissive:'#2a1a04'})];
const coinGeo=new THREE.CylinderGeometry(1,1,.16,40);
function coin(){return new THREE.Mesh(coinGeo,coinMat)}
const billGeo=new THREE.PlaneGeometry(BILL.w,BILL.d);
function billMesh(){const m=new THREE.MeshStandardMaterial({map:BT,side:THREE.DoubleSide,roughness:.7});return new THREE.Mesh(billGeo,m)}
// billete que vuela de A a B en un arco, con aleteo; k=0..1
function fly(m,A,B,k,arc,seed,s=1){const q=eio(k);const P=A.clone().lerp(B,q);P.y+=Math.sin(q*Math.PI)*arc;m.position.copy(P);
  m.rotation.set(-Math.PI/2+Math.sin(k*9+seed)*.9,seed+k*4,Math.cos(k*7+seed)*.7);m.scale.setScalar(s);m.visible=k>0&&k<1}
function textTex(txt,w=1024,h=200,col='#3b2a06',bg=null,font='800 130px Figtree'){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');if(bg){g.fillStyle=bg;g.fillRect(0,0,w,h)}
  g.fillStyle=col;g.font=font+', sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,w/2,h/2+6);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
// cúpula de garantía: brillo de borde dorado
const domeMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,uniforms:{a:{value:0}},
  vertexShader:'varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);vp=mv.xyz;wp=position;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform float a;varying vec3 n;varying vec3 vp;varying vec3 wp;void main(){float f=pow(1.-abs(dot(normalize(-vp),n)),2.2);float hex=step(.93,fract(wp.y*6.))+step(.96,fract(atan(wp.z,wp.x)*6.));gl_FragColor=vec4(1.,.75,.25,1.)*(f*1.3+hex*.25+.06)*a;}'});

// ───────── MESA (metros) ─────────
const T={s:new THREE.Scene(),c:new THREE.PerspectiveCamera(38,W/H,.005,40)};
{const s=T.s;s.background=new THREE.Color('#0d0805');s.fog=new THREE.Fog('#0d0805',.7,2.4);
 const wt=woodTexture();wt.repeat.set(2,2);
 const tb=new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshStandardMaterial({map:wt,color:'#8a7a70',roughness:.5}));tb.rotation.x=-Math.PI/2;tb.receiveShadow=true;s.add(tb);
 const key=new THREE.SpotLight('#ffd7a8',10,3,.7,.6,1);key.position.set(-.35,.9,.35);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0002;s.add(key,key.target);
 const rim=new THREE.PointLight('#7d8cff',1.2,2);rim.position.set(.4,.25,-.4);s.add(rim);
 s.add(new THREE.HemisphereLight('#6d7bd6','#2a1206',.35));
 T.a=stack(BT,ET,{band:bandTexture('5.000 €')});T.b=stack(BT,ET,{band:bandTexture('5.000 €')});s.add(T.a,T.b);
 T.a.userData.set(100);T.b.userData.set(100);T.a.userData.bandOrig=T.a.userData.band.material[2].map;
 T.goldBand=bandTexture('3 % / año');
 T.coins=[];for(let i=0;i<40;i++){const c=coin();c.scale.set(.0125,.0125,.0125);c.castShadow=true;s.add(c);T.coins.push(c)}
 T.bills=[];for(let i=0;i<12;i++){const b=billMesh();b.castShadow=true;s.add(b);T.bills.push(b)}
 T.dome=new THREE.Mesh(new THREE.SphereGeometry(.2,64,32,0,Math.PI*2,0,Math.PI/2),domeMat);s.add(T.dome);
}

// ───────── CIUDAD Y BANCO (metros) ─────────
const S={s:new THREE.Scene(),c:new THREE.PerspectiveCamera(50,W/H,.05,6000)};
{const s=S.s;s.background=new THREE.Color('#0b0f26');s.fog=new THREE.FogExp2('#0b0f26',.0045);
 const gnd=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.MeshStandardMaterial({color:'#1a1b22',roughness:.6,metalness:.2}));gnd.rotation.x=-Math.PI/2;gnd.receiveShadow=true;s.add(gnd);
 const stars=new THREE.BufferGeometry(),sp=[];for(let i=0;i<2500;i++){const a=R()*Math.PI*2,e=.15+R()*1.3,d=3000;sp.push(Math.cos(a)*Math.cos(e)*d,Math.sin(e)*d,Math.sin(a)*Math.cos(e)*d)}
 stars.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));s.add(new THREE.Points(stars,new THREE.PointsMaterial({color:'#dfe4ff',size:1.6,sizeAttenuation:false,fog:false})));
 s.add(new THREE.HemisphereLight('#6f7cff','#22140a',.9));const moon=new THREE.DirectionalLight('#aab6ff',.9);moon.position.set(-30,60,40);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);
 Object.assign(moon.shadow.camera,{left:-60,right:60,top:60,bottom:-60,far:200});s.add(moon);
 // el banco: escalinata, columnas, frontón y su letrero
 const stone=new THREE.MeshStandardMaterial({color:'#9d968a',roughness:.6});
 S.bank=new THREE.Group();S.parts=[];const add=(m,x,y,z)=>{m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;S.bank.add(m);S.parts.push({m,p0:m.position.clone(),r0:m.rotation.clone()});return m};
 for(let i=0;i<3;i++)add(new THREE.Mesh(new THREE.BoxGeometry(34-i*2,.6,10-i*1.4),stone),0,.3+i*.6,6-i*.7);
 add(new THREE.Mesh(new THREE.BoxGeometry(30,14,12),new THREE.MeshStandardMaterial({color:'#6f695f',roughness:.75})),0,8.8,-2);
 const door=add(new THREE.Mesh(new THREE.BoxGeometry(5,8,.4),new THREE.MeshStandardMaterial({color:'#ffcf80',emissive:'#ffb347',emissiveIntensity:2.2})),0,5.8,4.05);S.door=door;
 for(let i=0;i<6;i++)add(new THREE.Mesh(new THREE.CylinderGeometry(.75,.85,12,24),stone),-12.5+i*5,7.8,5.2);
 add(new THREE.Mesh(new THREE.BoxGeometry(32,1.8,12.5),stone),0,14.7,1.2);
 const sign=add(new THREE.Mesh(new THREE.PlaneGeometry(18,1.6),new THREE.MeshBasicMaterial({map:textTex('BANCO',1024,100,'#ffd77a',null,'900 88px Figtree'),transparent:true})),0,14.7,7.47);
 const ped=new THREE.Shape();ped.moveTo(-16,0);ped.lineTo(16,0);ped.lineTo(0,5);ped.closePath();
 add(new THREE.Mesh(new THREE.ExtrudeGeometry(ped,{depth:12,bevelEnabled:false}),stone),0,15.6,-4.8);
 s.add(S.bank);
 for(const[x,z,c]of[[-14,12,'#ffd08a'],[14,12,'#ffd08a'],[0,16,'#ffb85c']]){const l=new THREE.PointLight(c,40,40,1.6);l.position.set(x,3,z);s.add(l)}
 const up=new THREE.SpotLight('#ffe2b0',700,80,.5,.6,1.5);up.position.set(0,1,30);up.target.position.set(0,12,0);s.add(up,up.target);
 // casas con hipoteca, detrás del banco
 const wt=windowsTexture();S.houses=[];
 for(let i=0;i<9;i++){const g=new THREE.Group(),x=-40+i*10,z=-46-(i%2)*8;
   const b=new THREE.Mesh(new THREE.BoxGeometry(8,6,8),new THREE.MeshStandardMaterial({map:wt,emissiveMap:wt,emissive:'#ffffff',emissiveIntensity:.35,color:'#c9b9a6'}));b.position.y=3;
   const rf=new THREE.Mesh(new THREE.ConeGeometry(6.4,4,4),new THREE.MeshStandardMaterial({color:'#b5543a',roughness:.8,emissive:'#3a120a'}));rf.position.y=8;rf.rotation.y=Math.PI/4;
   g.add(b,rf);g.position.set(x,0,z);s.add(g);S.houses.push({g,b,x,z})}
 // la pila de monedas del banco (los intereses), a su lado
 S.pile=[];for(let i=0;i<60;i++){const c=coin();c.scale.set(2.2,2.2,2.2);c.position.set(22,.18+i*.36,0);c.rotation.y=i*.7;c.castShadow=true;s.add(c);S.pile.push(c)}
 S.flyBills=[];for(let i=0;i<40;i++){const b=billMesh();s.add(b);S.flyBills.push(b)}
 S.flyCoins=[];for(let i=0;i<24;i++){const c=coin();c.scale.set(.9,.9,.9);s.add(c);S.flyCoins.push(c)}
 // tus ahorros, a escala de cuento, dentro de su cúpula delante del banco
 S.mine=stack(BT,ET,{band:bandTexture('TUS AHORROS')});S.mine.userData.set(100);S.mine.scale.setScalar(55);S.mine.position.set(0,0,24);s.add(S.mine);
 S.dome=new THREE.Mesh(new THREE.SphereGeometry(7,64,32,0,Math.PI*2,0,Math.PI/2),domeMat.clone());S.dome.position.set(0,0,24);s.add(S.dome);
 S.dust=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:'#cfc6b4',size:5,sizeAttenuation:false,transparent:true,opacity:.6}));
 {const a=[];for(let i=0;i<700;i++)a.push((R()-.5)*34,R()*16,(R()-.5)*14,R());S.dust.userData.seed=a;S.dust.geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Array(2100).fill(0),3))}s.add(S.dust);
}

// ───────── momentos (todos salen de la voz) ─────────
const M={
  pero:vt('pero'),mejores:vt('mejores'),con:vt('con',2),es:vt('es',2),aunque:vt('aunque'),asi:vt('asi'),
};
M.cierre=vt('este');M.quiebre=vt('quiebre');
const shots=[['bank',0,M.pero],['table',M.pero,M.es-.95],['tableSafe',M.es-.95,M.aunque],['bank2',M.aunque,M.cierre-.1],['tableEnd',M.cierre-.1,99]];

function cityShot(t,mode){const c=S.c,s=S.s;
  // estado base
  for(const b of S.flyBills)b.visible=false;for(const k of S.flyCoins)k.visible=false;
  S.mine.visible=false;S.dome.visible=false;S.dust.visible=false;
  for(const q of S.parts){q.m.position.copy(q.p0);q.m.rotation.copy(q.r0)}
  const BANKDOOR=V(0,5,4.5);
  if(mode==='bank'){
    // hook: corriente de billetes hacia la puerta; la cámara vuela con ellos y se aleja para ver el banco
    ruta(c,t,[[0,{p:[1.2,2.2,47],l:[0,3,34],f:62}],[1.6,{p:[5,4,32],l:[0,6,4]}],[vt('ti')-.1,{p:[18,9,46],l:[0,8,0],f:50}],[vt('lo'),{p:[22,11,50],l:[4,9,0]}],
      [vt('presta')-.2,{p:[8,30,22],l:[0,8,-24]}],[vt('hipotecas')+.3,{p:[2,16,-18],l:[0,5,-48]}],[vt('queda')-.1,{p:[-4,14,-24],l:[0,5,-48]}],[vt('intereses')+.2,{p:[34,18,22],l:[18,10,0]}],[M.pero,{p:[38,22,26],l:[18,13,0]}]]);
    for(let i=0;i<26;i++){const t0=-.4+i*.14;const k=(t-t0)/1.7;if(k>0&&k<1&&t<vt('lo')+.6)fly(S.flyBills[i],V((i%5-2)*1.4,1+(i%3)*.8,44),BANKDOOR,k,3,i,30)}
    // presta: billetes del banco a las casas
    const tp=vt('presta');for(let i=0;i<S.houses.length;i++){const h=S.houses[i],t0=tp+.05+i*.11,k=(t-t0)/1.3;
      if(k>0&&k<1)fly(S.flyBills[26+i%14],V(0,14,-4),V(h.x,7,h.z),k,10,i,40);
      h.b.material.emissiveIntensity=.35+1.2*eo(p(t,t0+1.2,.3))}
    // intereses: monedas de las casas al banco, que llenan su pila
    const ti=vt('queda')-.2;for(let i=0;i<S.flyCoins.length;i++){const h=S.houses[i%9],t0=ti+i*.07,k=(t-t0)/1.2;
      if(k>0&&k<1){const m=S.flyCoins[i];fly(m,V(h.x,8,h.z),V(22,12,0),k,16,i,1);m.rotation.set(t*6+i,0,1.2)}}
    const nPile=Math.round(lerp(8,60,eo(p(t,ti+.9,2))));S.pile.forEach((m,i)=>m.visible=i<nPile);
    S.door.material.emissiveIntensity=2.2+1.2*Math.sin(t*6)*(t<vt('lo')?1:0);
    tag($('lab1'),{x:540,y:600,on:true},'a ti: <b>0 €</b>',p(t,vt('paga')-.05,.2)*(1-p(t,vt('lo')-.2,.2)),0,0);$('lab1').className='ov tag red';
    tag($('lab2'),{x:540,y:560,on:true},'<b>intereses</b> para el banco',p(t,vt('intereses')-.05,.25)*(1-p(t,M.pero-.2,.15)),0,-40);
  }
  if(mode==='bank2'){
    // quiebra: el banco se derrumba, tus ahorros siguen en su cúpula
    S.mine.visible=true;S.dome.visible=true;S.dome.material.uniforms.a.value=1;S.pile.forEach(m=>m.visible=false);
    ruta(c,t,[[M.aunque,{p:[30,9,58],l:[0,6,18],f:52}],[M.quiebre+.6,{p:[22,7,52],l:[0,7,10]}],[vt('devuelven')-.1,{p:[6,5,40],l:[0,4,24]}],[vt('devuelven')+.6,{p:[3,4.5,36],l:[0,3,24]}],
      [M.asi,{p:[-16,10,56],l:[0,8,8]}],[vt('presta',2)-.2,{p:[-6,6,44],l:[0,7,4]}],[M.cierre,{p:[0,5,40],l:[0,6,4]}]]);
    const tq=M.quiebre-.1;S.parts.forEach((q,i)=>{const d=t-(tq+(i%5)*.05);if(d>0){const g=9.8*d*d*.5;const hx=q.p0.x;q.m.position.y=Math.max(q.p0.y*0.15,q.p0.y-g*(1+i%3*.2));
      q.m.position.x=hx+Math.sign(hx||1)*d*1.5;q.m.rotation.z=q.r0.z+d*(i%2?.6:-.6)*(i%4?1:.3)}});
    S.dust.visible=t>tq;if(S.dust.visible){const sd=S.dust.userData.seed,ar=S.dust.geometry.attributes.position.array,d=t-tq;
      for(let i=0;i<700;i++){ar[i*3]=sd[i*4]*(1+d*.35);ar[i*3+1]=Math.max(.2,sd[i*4+1]*(1.2-d*.3)+d*1.5*sd[i*4+3]);ar[i*3+2]=sd[i*4+2]*(1+d*.35)}
      S.dust.geometry.attributes.position.needsUpdate=true;S.dust.material.opacity=.7*(1-p(t,tq+2.5,1))}
    // remate: tus billetes vuelven a entrar gratis en el banco (ya en pie otra vez)
    if(t>M.asi){for(const q of S.parts){q.m.position.copy(q.p0);q.m.rotation.copy(q.r0)}S.dust.visible=false;S.mine.visible=false;S.dome.visible=false;
      for(let i=0;i<26;i++){const t0=M.asi+.2+i*.13;const k=(t-t0)/1.6;if(k>0&&k<1)fly(S.flyBills[i],V((i%5-2)*1.2,1.2+(i%3)*.7,36),BANKDOOR,k,2.5,i,22)}
      tag($('lab2'),{x:540,y:560,on:true},'interés para ti: <b>0 %</b>',p(t,vt('presta',2)-.1,.25)*(1-p(t,M.cierre-.3,.2)),0,-60);$('lab2').className='ov tag red'}
    else tag($('lab1'),{x:540,y:560,on:true},'garantizado: <b>100.000 €</b>',p(t,M.aunque+.1,.25)*(1-p(t,M.asi-.3,.2)),0,-40);
  }
  r.render(s,c)}

function tableShot(t,mode){const c=T.c;
  T.coins.forEach(m=>m.visible=false);T.bills.forEach(m=>m.visible=false);T.dome.visible=false;
  const A=T.a,B=T.b;A.position.set(0,0,0);B.position.set(0,0,0);A.visible=true;B.visible=false;
  const band=A.userData.band.material[2];
  const remu=t>=vt('remuneradas');band.map=remu?T.goldBand:A.userData.bandOrig;
  if(mode==='table'){
    ruta(c,t,[[M.pero,{p:[-.06,.1,.32],l:[.02,.01,0],f:40}],[vt('pagan'),{p:[.16,.14,.3],l:[.03,.01,0]}],[vt('remuneradas')+.3,{p:[.06,.26,.26],l:[.03,.006,0]}],
      [M.mejores,{p:[-.12,.14,.24],l:[0,.02,0]}],[vt('tres')+.4,{p:[-.02,.09,.3],l:[.02,.025,0]}],[M.con,{p:[-.02,.24,.42],l:[-.02,.01,0]}],[vt('trescientos'),{p:[.06,.34,.44],l:[.04,.0,.04]}],
      [vt('cincuenta')+.6,{p:[.14,.42,.4],l:[.1,0,.06]}],[vt('hace',2),{p:[.02,.2,.36],l:[0,.02,0]}],[vt('pierde')-.1,{p:[-.04,.12,.34],l:[0,.05,0]}],[vt('quinientos')+.6,{p:[.0,.14,.46],l:[0,.08,0]}],[M.es-.95,{p:[.02,.16,.48],l:[0,.06,0]}]]);
    // monedas que te paga la cuenta: caen sobre el fajo
    const tc=vt('pagan')-.05;for(let i=0;i<14;i++){const t0=tc+i*.16+(i>4?(vt('tres')-tc-.8):0),k=p(t,t0,.45),m=T.coins[i];
      if(k>0){m.visible=true;const x=.09+(i%4)*.028-.01,z=-.02+Math.floor(i/4)*.028,y=.0013+(i%3)*.0026;m.position.set(x,y+.3*(1-eo(k)),z);m.rotation.set(Math.PI/2*(1-eo(k))*(i%2?1:-1),i,0)}}
    // diez mil: el segundo fajo llega al lado
    if(t>=M.con){B.visible=true;const k=eo(p(t,vt('diez')-.05,.45));B.position.set(-.16,.12*(1-k),0);B.rotation.y=.3*(1-k)}
    // seis billetes de 50: uno cada dos meses
    const tb=vt('trescientos');for(let i=0;i<6;i++){const t0=tb+.15+i*.42,k=p(t,t0,.5),m=T.bills[i];if(k>0&&t<vt('hace',2)){m.visible=true;m.material.color.copy(WHITE);
      const P=V(.12+i*.035,.0005+i*.0004,.12+i*.01);m.position.set(P.x,P.y+.25*(1-eo(k)),P.z);m.rotation.set(-Math.PI/2,0,.4-i*.12+(1-eo(k))*2)}}
    // inflación: diez billetes se ponen rojos y se van volando
    const tf=vt('pierde')-.1;if(t>=vt('hace',2)){for(let i=0;i<10;i++){const t0=tf+i*.09,k=p(t,t0,1.4),m=T.bills[i];m.visible=k<1;
      m.material.color.copy(WHITE).lerp(RED,p(t,vt('precios'),.6));const sx=(i%2?1:-1)*(.04+i*.015);
      m.position.set(sx*eo(k),.0102+i*.0002+.5*eo(k)*(1+i*.05),-.02+.15*eo(k)*(i%3-1));m.rotation.set(-Math.PI/2+k*6*(i%2?1:-1),k*3,k*4)}
      A.userData.set(100-10*eo(p(t,tf,.6)));B.userData.set(100)}
    else{A.userData.set(100);B.userData.set(100)}
    tag($('cnt'),{x:540,y:560,on:true},'<b>≈ 3 %</b><small>al año</small>',p(t,vt('tres')-.05,.2)*(1-p(t,M.con-.2,.2)));
    tag($('cnt'),{x:540,y:560,on:true},'<b>+300 €</b><small>al año con 10.000 €</small>',p(t,vt('trescientos')-.05,.2)*(1-p(t,vt('hace',2)-.2,.2)));
    tag($('lab3'),{x:540,y:560,on:true},'precios <b>+4,9 %</b>',p(t,vt('precios')-.05,.2)*(1-p(t,M.es-1.2,.2)));$('lab3').className='ov tag red';
    tag($('big'),{x:540,y:700,on:true},'<b>−490 €</b> al año',p(t,vt('quinientos')-.05,.2)*(1-p(t,M.es-1.2,.2)));$('big').className='ov tag red';
  }
  if(mode==='tableSafe'){B.visible=true;B.position.set(-.16,0,0);A.userData.set(100);
    ruta(c,t,[[M.es-.95,{p:[.04,.16,.46],l:[-.08,.01,0],f:40}],[vt('seguro')+.3,{p:[.16,.14,.4],l:[-.08,.01,0]}],[vt('garantizados'),{p:[.02,.34,.6],l:[-.08,.06,0]}],[vt('cien')+.3,{p:[-.08,.3,.66],l:[-.08,.08,0]}],[M.aunque,{p:[-.08,.32,.7],l:[-.08,.08,0]}]]);
    const k=eo(p(t,vt('garantizados')-.1,.5));T.dome.visible=k>0;T.dome.position.set(-.08,.4*(1-k),0);T.dome.scale.set(1,1,.8);domeMat.uniforms.a.value=1;
    tag($('cnt'),{x:540,y:560,on:true},'<b>100.000 €</b><small>por persona y por banco</small>',p(t,vt('cien')-.05,.25));$('cnt').className='ov tag big'}
  if(mode==='tableEnd'){B.visible=true;B.position.set(-.16,0,0);A.userData.set(100);
    ruta(c,t,[[M.cierre-.1,{p:[-.06,.06,.22],l:[-.06,.012,0],f:40}],[vt('trabajar'),{p:[.1,.16,.26],l:[-.06,.01,0]}],[DUR,{p:[-.06,.5,.12],l:[-.06,0,0],f:44}]]);
    for(let i=0;i<30;i++){const t0=M.cierre+i*.15,k=p(t,t0,.4),m=T.coins[i];if(k>0){m.visible=true;const ang=i*2.39,rad=.11+.02*Math.sqrt(i);m.position.set(-.06+Math.cos(ang)*rad,.0013+(i%3)*.0026+.3*(1-eo(k)),Math.sin(ang)*rad*.8);m.rotation.set(Math.PI/2*(1-eo(k)),i,0)}}
    tag($('cnt'),{x:540,y:520,on:true},'<b>TRUCO #1</b><small>cuentas remuneradas</small>',p(t,vt('primer')-.05,.25),0,0);$('cnt').className='ov tag big'}
  r.render(T.s,c)}

const OV=['lab1','lab2','lab3','br1','br2','big','cnt'];
window.render=function(t){
  for(const id of OV){$(id).style.opacity=0;$(id).className=id==='cnt'?'ov tag big':id.startsWith('br')?$(id).className:'ov tag'}
  const [sh]=shots.find(([,a,b])=>t>=a&&t<b);
  if(sh==='bank'||sh==='bank2')cityShot(t,sh);else tableShot(t,sh);
  const w=WORDS.find(x=>t>=x.s-.04&&t<x.e2);const sb=$('subs');
  if(w){sb.style.opacity=1;sb.textContent=w.t;sb.className=w.k?'k':'';const k=p(t,w.s-.04,.09);sb.style.transform=`translate(-50%,-50%) scale(${1.12-.12*eo(k)})`;$('veil').style.opacity=1}else{sb.style.opacity=0;$('veil').style.opacity=0}
};
const CLAVES=[['euro',1],['intereses',1],['remuneradas',1],['tres',1],['cincuenta',1],['pierde',1],['garantizados',1],['devuelven',1],['gratis',3],['siguiente',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));
const WORDS=SUBS.map((w,i)=>({t:w.t,s:w.s,e2:Math.min(SUBS[i+1]?SUBS[i+1].s:DUR,w.e+.6),k:KEYT.has(w.s)}));
window.ready=true;
