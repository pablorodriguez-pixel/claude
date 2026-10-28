// A ESCALA — librería 3D del canal: texturas procedurales, piezas y utilidades de cámara/overlay.
import * as THREE from './vendor/three.module.min.js';
export {THREE};

export const W=1080,H=1920;
export const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
export const eo=x=>1-Math.pow(1-cl(x),3);
export const p=(t,a,d)=>cl((t-a)/d);
export const lerp=(a,b,k)=>a+(b-a)*k;
export const lerpLog=(a,b,k)=>Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*k);
export const fmtES=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let x=Math.imul(s^s>>>15,1|s);x=x+Math.imul(x^x>>>7,61|x)^x;return((x^x>>>14)>>>0)/4294967296}}
export const R=rng(42);

export const C={night:'#0B1026',gold:'#F5B841',euro50:'#E8833A',loss:'#FF4B3E',paper:'#EDE3CF'};

function canvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t}

// Billete de 50 € estilizado (no reproduce el diseño oficial).
export function billTexture(){return canvas(1024,563,(g,w,h)=>{
  const gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#F6B27A');gr.addColorStop(.5,'#E8833A');gr.addColorStop(1,'#C9652B');g.fillStyle=gr;g.fillRect(0,0,w,h);
  g.globalAlpha=.18;for(let i=0;i<60;i++){g.strokeStyle=i%2?'#fff':'#7a3510';g.beginPath();g.ellipse(w*.62,h*.5,40+i*9,20+i*5,0,0,Math.PI*2);g.stroke()}g.globalAlpha=1;
  // ventana/arco estilizado
  g.fillStyle='rgba(255,240,220,.35)';g.beginPath();g.moveTo(560,470);g.lineTo(560,230);g.arc(680,230,120,Math.PI,0);g.lineTo(800,470);g.closePath();g.fill();
  g.fillStyle='#FCE9D6';g.fillRect(40,40,250,h-80);
  g.fillStyle='#7a3510';g.font='900 210px Unbounded, sans-serif';g.fillText('50',60,300);
  g.font='800 46px Unbounded, sans-serif';g.fillText('EURO',70,380);
  g.fillStyle='#fff';g.font='900 120px Unbounded, sans-serif';g.fillText('50',820,500);
  g.strokeStyle='#F5D24B';g.lineWidth=6;for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.beginPath();g.arc(165+Math.cos(a)*70,470+Math.sin(a)*30,6,0,7);g.stroke()}
  g.fillStyle='rgba(122,53,16,.6)';g.font='600 26px JBMono, monospace';g.fillText('BCE ECB EZB EKT EKP 2026',320,60);
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=4;g.strokeRect(6,6,w-12,h-12)})}

// Canto de un fajo: líneas de papel.
export function edgeTexture(){return canvas(64,512,(g,w,h)=>{const r=rng(7);for(let y=0;y<h;y++){const v=215+r()*35;g.fillStyle=`rgb(${v},${v-25},${v-55})`;g.fillRect(0,y,w,1)}})}
export function bandTexture(txt){return canvas(512,256,(g,w,h)=>{g.fillStyle=C.gold;g.fillRect(0,0,w,h);g.fillStyle='#3d2a05';g.font='800 64px Unbounded, sans-serif';g.textAlign='center';g.fillText(txt,w/2,h/2+24)})}
// Madera de mesa.
export function woodTexture(){const t=canvas(1024,1024,(g,w,h)=>{const r=rng(3);g.fillStyle='#5a3418';g.fillRect(0,0,w,h);
  for(let i=0;i<260;i++){const y=r()*h,a=.04+r()*.08;g.strokeStyle=r()<.5?`rgba(30,14,4,${a})`:`rgba(160,100,50,${a})`;g.lineWidth=1+r()*5;g.beginPath();g.moveTo(0,y);for(let x=0;x<=w;x+=32)g.lineTo(x,y+Math.sin(x*.006+i)*14+Math.sin(x*.03+i*3)*3);g.stroke()}});t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
// Fachada con ventanas encendidas.
export function windowsTexture(){const t=canvas(256,512,(g,w,h)=>{const r=rng(11);g.fillStyle='#0d1022';g.fillRect(0,0,w,h);
  for(let y=8;y<h;y+=24)for(let x=8;x<w;x+=20){const on=r()<.42;g.fillStyle=on?`hsl(${38+r()*12},90%,${55+r()*20}%)`:'#161a33';g.fillRect(x,y,12,14)}});t.wrapS=t.wrapT=THREE.RepeatWrapping;return t}
export function cloudTexture(seed){return canvas(256,256,(g,w,h)=>{const r=rng(seed);for(let i=0;i<40;i++){const x=w/2+(r()-.5)*w*.55,y=h/2+(r()-.5)*h*.3,rad=20+r()*50;const gr=g.createRadialGradient(x,y,0,x,y,rad);gr.addColorStop(0,'rgba(200,205,235,.35)');gr.addColorStop(1,'rgba(200,205,235,0)');g.fillStyle=gr;g.fillRect(0,0,w,h)}})}
export function glowTexture(color='#F5B841'){return canvas(128,128,(g,w,h)=>{const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,color);gr.addColorStop(.25,color+'88');gr.addColorStop(1,color+'00');g.fillStyle=gr;g.fillRect(0,0,w,h)})}

// Fajo (100 billetes) o pila de n billetes. Medidas reales en metros: 140×77 mm, 0,1 mm/billete.
export const BILL={w:.140,d:.077,t:.0001};
export function stack(bt,et,{band=null}={}){
  const g=new THREE.Group();
  const side=new THREE.MeshStandardMaterial({map:et,roughness:.9});
  const top=new THREE.MeshStandardMaterial({map:bt,roughness:.7});
  const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),[side,side,top,side,side,side]);m.castShadow=m.receiveShadow=true;g.add(m);g.userData.body=m;
  if(band){const bm=new THREE.MeshStandardMaterial({color:C.gold,roughness:.6,metalness:.1});
    const bandTop=new THREE.MeshStandardMaterial({map:band,roughness:.6});
    const b=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),[bm,bm,bandTop,bm,bm,bm]);b.castShadow=true;g.add(b);g.userData.band=b}
  g.userData.set=(n)=>{const h=Math.max(BILL.t,n*BILL.t);m.scale.set(BILL.w,h,BILL.d);m.position.y=h/2;
    if(g.userData.band){const b=g.userData.band;b.scale.set(.045,h+.0012,BILL.d+.0012);b.position.y=h/2}};
  g.userData.set(1);return g}

// Torre de billetes con anchura mínima en píxeles (como una línea dorada cuando está lejos).
export function tower(et){
  const t=et.clone();t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const mat=new THREE.MeshStandardMaterial({map:t,emissive:new THREE.Color(C.gold),emissiveIntensity:.25,roughness:.8});
  const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mat);
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:C.gold}));
  const g=new THREE.Group();g.add(m,stripe);
  g.userData.update=(h,minW,unit=1)=>{const w=Math.max(BILL.w/unit,minW),d=Math.max(BILL.d/unit,minW*.55);
    m.scale.set(w,h,d);m.position.y=h/2;stripe.scale.set(w*.3,h,d*1.02);stripe.position.y=h/2;t.repeat.set(1,Math.max(1,h*unit/0.2))};
  g.userData.mat=mat;return g}

// Overlay HTML: proyección de puntos 3D a píxeles.
export function proj(v,cam){const q=v.clone().project(cam);return {x:(q.x+1)/2*W,y:(1-q.y)/2*H,on:q.z<1}}
// Corchete de medida (firma visual del canal): línea vertical dorada con topes y cota.
export function bracket(el,a,b,label,k=1){
  if(k<=0||!a.on||!b.on){el.style.opacity=0;return}
  const x=Math.max(a.x,b.x)+40,y1=Math.min(a.y,b.y),y2=Math.max(a.y,b.y),hh=(y2-y1)*eo(k);
  el.style.opacity=cl(k*3);el.style.left=x+'px';el.style.top=(y2-hh)+'px';el.style.height=hh+'px';el.querySelector('span').textContent=label}
export function tag(el,pt,text,k=1,dx=0,dy=0){if(!pt.on||k<=0)return;el.style.opacity=cl(k*2.5);el.style.left=(pt.x+dx)+'px';el.style.top=(pt.y+dy)+'px';if(text!=null)el.innerHTML=text;el.style.transform=`translate(-50%,-50%) scale(${.8+.2*eo(k)})`}
