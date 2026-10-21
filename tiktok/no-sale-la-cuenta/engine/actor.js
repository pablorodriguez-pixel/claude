/* ====== ACTORES: muñecos de palo con articulaciones, accesorios, caras y comportamientos ====== */
const SP=(DATA.words||[]);
const talkAmt=t=>{for(const w of SP){if(t>=w.s&&t<w.e)return .35+.65*Math.abs(Math.sin(t*25+w.s*7))}return 0};
const R2=Math.PI/180,sn=a=>Math.sin(a*R2),cs=a=>Math.cos(a*R2);
const NS='http://www.w3.org/2000/svg';
const sv=(p,tag,at)=>{const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);p.appendChild(e);return e};
const LOOK={ // personajes del canal
  host:{color:'#F4F1EA',cap:'#FFE14D'},
  prisa:{color:'#FFE14D',sun:true,hair:true},
  calma:{color:'#7FC8FF',glasses:true},
  rojo:{color:'#FF6B81',hair:true},
  verde:{color:'#7BE38B',beanie:'#FF7A4D'},
  lila:{color:'#C9A6FF',glasses:true,hair:true},
  base:{color:'#F4F1EA'}};
function Actor(parent,cfg){
  const look=Object.assign({},LOOK[cfg.look]||LOOK.base,typeof cfg.look==='object'?cfg.look:{});const col=look.color||'#F4F1EA',W=look.w||9;
  const host=mk(parent,'abs','left:0;top:0;width:0;height:0;z-index:'+(cfg.z||5));
  const svg=sv(host,'svg',{width:1,height:1,style:'overflow:visible;position:absolute;left:0;top:0'});
  const g=sv(svg,'g',{});
  const ln=()=>sv(g,'polyline',{fill:'none',stroke:col,'stroke-width':W,'stroke-linecap':'round','stroke-linejoin':'round'});
  const armB=ln(),legB=ln(),torso=ln(),legF=ln(),armF=ln();if(cfg.noLegs){legB.style.display='none';legF.style.display='none'}
  const tie=look.tie?sv(g,'polygon',{fill:look.tie}):null;
  const hg=sv(g,'g',{});
  sv(hg,'circle',{cx:0,cy:0,r:30,fill:'#0B0C10',stroke:col,'stroke-width':W});
  const F={};const fa=(n,fn)=>{F[n]=sv(hg,'g',{});fn(F[n])};
  const eye=(p,x,y,r=4.5,f=col)=>sv(p,'circle',{cx:x,cy:y,r,fill:f});
  fa('n',p=>{eye(p,-10,-5);eye(p,10,-5);sv(p,'path',{d:'M-9 12 Q0 16 9 12',stroke:col,'stroke-width':4,fill:'none','stroke-linecap':'round'})});
  fa('smile',p=>{eye(p,-10,-5);eye(p,10,-5);sv(p,'path',{d:'M-14 8 Q0 26 14 8Z',fill:col,stroke:col,'stroke-width':3,'stroke-linejoin':'round'})});
  fa('shock',p=>{eye(p,-10,-6,8,'#fff');eye(p,10,-6,8,'#fff');eye(p,-10,-6,3,'#0B0C10');eye(p,10,-6,3,'#0B0C10');sv(p,'ellipse',{cx:0,cy:16,rx:7,ry:9,fill:'#0B0C10',stroke:col,'stroke-width':4})});
  fa('angry',p=>{eye(p,-10,-3);eye(p,10,-3);sv(p,'path',{d:'M-18 -16 L-4 -9 M18 -16 L4 -9',stroke:col,'stroke-width':5,'stroke-linecap':'round'});sv(p,'path',{d:'M-9 16 Q0 8 9 16',stroke:col,'stroke-width':4,fill:'none','stroke-linecap':'round'})});
  fa('sweat',p=>{eye(p,-10,-5,5);eye(p,10,-5,5);sv(p,'path',{d:'M-9 14 Q-3 9 0 13 Q4 17 9 12',stroke:col,'stroke-width':4,fill:'none','stroke-linecap':'round'});sv(p,'path',{d:'M26 -22 Q36 -4 26 4 Q16 -4 26 -22Z',fill:'#7BD0FF'})});
  fa('dead',p=>{sv(p,'path',{d:'M-17 -12 L-5 0 M-5 -12 L-17 0 M5 -12 L17 0 M17 -12 L5 0',stroke:col,'stroke-width':4.5,'stroke-linecap':'round'});sv(p,'path',{d:'M-9 16 Q0 8 9 16',stroke:col,'stroke-width':4,fill:'none'})});
  fa('think',p=>{eye(p,-10,-5);eye(p,10,-5);sv(p,'path',{d:'M-8 14 L8 11',stroke:col,'stroke-width':4,'stroke-linecap':'round'});sv(p,'path',{d:'M-18 -17 L-5 -13',stroke:col,'stroke-width':4,'stroke-linecap':'round'})});
  const mouth=sv(hg,'ellipse',{cx:0,cy:14,rx:9,ry:1,fill:'#0B0C10',stroke:col,'stroke-width':4,style:'display:none'});
  if(look.hair)sv(hg,'path',{d:'M-24 -18 L-20 -42 L-10 -26 L-4 -46 L4 -26 L14 -44 L16 -24 L26 -34 L24 -14',stroke:col,'stroke-width':6,fill:'none','stroke-linejoin':'round','stroke-linecap':'round'});
  if(look.cap){sv(hg,'path',{d:'M-31 -6 A31 31 0 0 1 31 -6 Z',fill:look.cap,stroke:'#0B0C10','stroke-width':3});sv(hg,'rect',{x:10,y:-12,width:36,height:9,rx:4,fill:look.cap,stroke:'#0B0C10','stroke-width':3})}
  if(look.beanie){sv(hg,'path',{d:'M-30 -8 A30 30 0 0 1 30 -8 Z',fill:look.beanie,stroke:'#0B0C10','stroke-width':3});sv(hg,'circle',{cx:0,cy:-38,r:7,fill:look.beanie})}
  if(look.glasses){sv(hg,'circle',{cx:-11,cy:-5,r:10,fill:'rgba(127,200,255,.25)',stroke:col,'stroke-width':3});sv(hg,'circle',{cx:11,cy:-5,r:10,fill:'rgba(127,200,255,.25)',stroke:col,'stroke-width':3});sv(hg,'line',{x1:-1,y1:-5,x2:1,y2:-5,stroke:col,'stroke-width':3})}
  if(look.sun)sv(hg,'path',{d:'M-24 -12 L24 -12 L20 2 Q10 6 4 2 L-4 2 Q-10 6 -20 2Z',fill:'#05060a',stroke:col,'stroke-width':2});
  const P=(a)=>a.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' ');
  const DEF={x:0,y:0,sc:1,rot:0,flip:1,tors:0,hd:0,aL:[10,6],aR:[-10,6],lL:[4,0],lR:[-4,0],face:'n',mouth:0,op:1};
  function set(o){const q=Object.assign({},DEF,o);
    const tn=q.tors,hx=0,hy=0,nx=hx+84*sn(tn),ny=hy-84*cs(tn),sx=hx+72*sn(tn),sy=hy-72*cs(tn);
    const arm=(a)=>{const e=[sx+44*sn(a[0]),sy+44*cs(a[0])];return[[sx,sy],e,[e[0]+42*sn(a[0]+a[1]),e[1]+42*cs(a[0]+a[1])]]};
    const leg=(a)=>{const k=[hx+60*sn(a[0]),hy+60*cs(a[0])];const f=[k[0]+58*sn(a[0]+a[1]),k[1]+58*cs(a[0]+a[1])];return[[hx,hy],k,f,[f[0]+16,f[1]]]};
    armB.setAttribute('points',P(arm(q.aR)));legB.setAttribute('points',P(leg(q.lR)));
    torso.setAttribute('points',P([[hx,hy],[nx,ny]]));legF.setAttribute('points',P(leg(q.lL)));armF.setAttribute('points',P(arm(q.aL)));
    if(tie)tie.setAttribute('points',P([[sx-6,sy+2],[sx+6,sy+2],[sx+3,sy+28],[sx,sy+34],[sx-3,sy+28]]));
    const hd=tn+q.hd;hg.setAttribute('transform',`translate(${nx+34*sn(hd)},${ny-34*cs(hd)}) rotate(${hd})`);
    for(const k in F)F[k].style.display=k===q.face?'':'none';
    const m=q.mouth||0;if(m>0.02&&(q.face==='n'||q.face==='smile')){mouth.style.display='';mouth.setAttribute('ry',2+m*10);F[q.face].style.display='';mouth.setAttribute('cy',14)}else mouth.style.display='none';
    g.setAttribute('transform',`translate(${q.x},${q.y}) rotate(${q.rot}) scale(${q.sc*q.flip},${q.sc})`);host.style.opacity=q.op}
  return{el:host,set}}
/* comportamientos: (t, p, u, act) → pose parcial */
const lpA=(a,b,k)=>a.map((v,i)=>lerp(v,b[i],k));
const BEH={
  idle:(t)=>({y:Math.sin(t*3)*2,aL:[8+Math.sin(t*2)*3,8],aR:[-8-Math.sin(t*2.2)*3,8],tors:Math.sin(t*1.5)*1.2}),
  walk:(t,p)=>{const s=Math.sin(t*(p.f||9)),c=Math.cos(t*(p.f||9));return{y:-Math.abs(c)*6,lL:[s*32,Math.max(0,-s)*42],lR:[-s*32,Math.max(0,s)*42],aL:[-s*30,14],aR:[s*30,14],tors:3}},
  run:(t,p)=>{const s=Math.sin(t*(p.f||14)),c=Math.cos(t*(p.f||14));return{y:-Math.abs(c)*14,lL:[s*58,Math.max(0,-s)*80],lR:[-s*58,Math.max(0,s)*80],aL:[-s*60,70],aR:[s*60,70],tors:14}},
  present:(t)=>({aL:[40+Math.sin(t*3)*8,30],aR:[-40-Math.sin(t*3.4)*8,30],y:Math.sin(t*3)*2,face:'smile'}),
  point:(t,p)=>({aL:[p.ang??115,p.ang2??8],aR:[-8,10],tors:p.tors??4,y:Math.sin(t*3)*2,face:p.face||'smile'}),
  shock:(t,p,u)=>({y:-Math.max(0,Math.sin(Math.min(u*3,1)*Math.PI))*30,aL:[150,10],aR:[-150,10],lL:[10,0],lR:[-10,0],face:'shock',tors:-3}),
  shrug:(t)=>({aL:[70,95],aR:[-70,95],y:Math.sin(t*5)*2,face:'sweat',hd:Math.sin(t*3)*6}),
  celebrate:(t)=>({y:-Math.abs(Math.sin(t*9))*38,aL:[160+Math.sin(t*18)*14,10],aR:[-160-Math.sin(t*18)*14,10],lL:[18,10],lR:[-18,10],face:'smile'}),
  sit:(t,p)=>({y:p.dy??40,aL:[20,50],aR:[-5,50],lL:[88,-86],lR:[84,-86],tors:p.tors??-3,face:p.face||'n'}),
  hold:(t,p)=>({aL:[70,95+Math.sin(t*20)*3],aR:[-45,100],face:p.face||'n',y:Math.sin(t*3)*2,hd:12}),
  think:(t)=>({aL:[80,120],aR:[-10,10],face:'think',hd:-6,tors:2}),
  facepalm:(t)=>({aL:[150,140],aR:[-10,8],face:'sweat',tors:5}),
  angry:(t)=>({aL:[30,100],aR:[-30,100],face:'angry',y:Math.sin(t*20)*2.5}),
  fall:(t,p,u)=>({y:u*u*(p.h||600),rot:u*(p.spin||540),aL:[150,0],aR:[-150,0],face:'shock'}),
  lie:(t,p)=>({rot:90,y:-30,x:p.dx||0,aL:[10,0],aR:[-10,0],lL:[0,0],lR:[0,0],face:p.face||'dead'}),
  fly:(t,p,u)=>({x:u*(p.dx||500),y:-Math.sin(Math.min(u,1)*Math.PI)*(p.h||260)+u*70,rot:u*(p.spin||720),aL:[150,0],aR:[-150,0],lL:[40,0],lR:[-40,0],face:'shock'}),
  drive:(t,p)=>({aL:[55,70],aR:[40,70],tors:-2,face:p.face||'n',y:Math.sin(t*30)*(p.shake||1)}),
  wave:(t)=>({aL:[165+Math.sin(t*12)*22,0],aR:[-8,8],face:'smile',y:Math.sin(t*3)*2}),
  tap:(t)=>({lL:[Math.abs(Math.sin(t*8))*14,0],aL:[40,110],aR:[-40,110],face:'angry'}),
  crouch:(t)=>({y:50,lL:[60,-110],lR:[40,-100],aL:[30,40],aR:[-30,40]}),
};
function makeActor(cfg,parent){
  const A=Actor(parent,cfg);const acts=cfg.acts||[];let pos=cfg.at||[0,0];
  acts.forEach(a=>{a.from=a.from||pos.slice();a.to=a.to||a.from.slice();pos=a.to});
  const pose=(a,t)=>{const u=a.d?cl((t-a.a)/a.d):0;const mv=a.mv==='ease'?eio(u):a.mv==='acc'?u*u:a.mv==='out'?eo(u):u;
    const b=(BEH[a.b]||BEH.idle)(t,a,u,a);const o=Object.assign({},b);
    o.x=lerp(a.from[0],a.to[0],mv)+(b.x||0);o.y=lerp(a.from[1],a.to[1],mv)+(b.y||0);
    if(a.face)o.face=a.face;o.flip=a.flip??cfg.flip??1;o.sc=a.sc??cfg.sc??1;return o};
  const bl=(P,Q,k)=>{const R={};for(const key in Q){const q=Q[key],p=P[key];R[key]=(typeof q==='number'&&typeof p==='number')?lerp(p,q,k):(Array.isArray(q)&&Array.isArray(p))?lpA(p,q,k):(k>.5?q:(p!==undefined?p:q))}return R};
  return{upd(t){let i=-1;for(let k=0;k<acts.length;k++)if(t>=acts[k].a)i=k;
    if(i<0){A.set({op:0});return}
    const a=acts[i];let P=pose(a,t);
    if(i>0&&t-a.a<.22){const Q=pose(acts[i-1],t);P=bl(Q,P,eio((t-a.a)/.22))}
    const age=t-acts[0].a;if(age<.35){P.sc=(P.sc||1)*lerp(.3,1,el(age/.35))}
    if(cfg.talk)P.mouth=talkAmt(t);
    A.set(P)},el:A.el}}
/* capas de actores por escena */
function actorsFor(S,root){if(!S.actors)return null;const L=S.actors.map(c=>makeActor(c,c.parent?c.parent:root));return t=>L.forEach(a=>a.upd(t))}
