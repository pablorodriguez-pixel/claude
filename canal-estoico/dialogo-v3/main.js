const T=/*TIMING*/null; const D=T.D;
const $=id=>document.getElementById(id);
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const eout=x=>1-Math.pow(1-x,3);
const back=x=>{const c=1.6;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const win=(t,a,b,f=.3)=>clamp((t-a)/f)*clamp((b-t)/f);
const lerp=(a,b,k)=>a+(b-a)*k;
const SW='stroke="#1d1f2a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
const KEY=/^(mañana|empiezo|emperador|problema|tres|pasos|cama|cómodo|actuar|ganas|error|después|antes|uno|dos|pequeño|minutos|alarma|ahora|suelo|negociar|negoció|deciden|tú|forjar|carácter|demás)$/i;
// tiempos clave
const S=id=>T.seg.find(s=>s.id===id);
const blinkAt=(t,seed)=>{const ph=(t+seed)%3.9;return ph<.06?ph/.06:ph<.13?1-(ph-.06)/.07:0;};
function talk(t,who){const s=T.seg.find(s=>s.who===who&&t>=s.s&&t<=s.e);if(!s)return 0;const i=Math.floor((t-s.s)*30);const v=s.env[Math.min(i,s.env.length-1)]||0;const p=s.env[Math.max(0,i-1)]||0;return (v*.7+p*.3);}
const speaking=(t,who)=>T.seg.some(s=>s.who===who&&t>=s.s-0.05&&t<=s.e+0.05);
let sparks=[];
window.ready=document.fonts.ready.then(()=>{
  $('cam').innerHTML=roomSVG(); $('rcam').innerHTML=romeSVG();
  $('insetsvg').innerHTML=DEFS+'<g id="insetg"></g>';
  const SP=$('sparks'); for(let i=0;i<40;i++){const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('r',3+((i*7)%5));c.setAttribute('fill','#ffd59a');SP.appendChild(c);
    const r=k=>{const x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)};sparks.push({el:c,a:r(1)*6.28,d:120+r(2)*260,sp:.4+r(3),ph:r(4)*6.28,y0:r(5)});}
  $('hk1').innerHTML='¿Siempre dices <em>«mañana empiezo»</em>?'.split(' ').map(w=>`<span>${w}</span>`).join(' ');
  $('hk2').textContent='Un emperador romano tenía tu mismo problema.';
});
// cámara: [t, cx, cy, zoom] — al llegar a t empieza a moverse desde el punto anterior (1,3 s)
const CAM=[[0,470,980,1.3],[8.4,520,960,1.28],[11.5,760,860,1.06],[15.0,760,860,1.1],[23.0,760,860,1.1],[30.6,600,940,1.22],[34.4,740,860,1.0],[42.6,700,900,1.12],[45.2,760,840,1.0],
 [60.9,640,920,1.2],[62.4,560,960,1.3],[67.6,560,960,1.3],[69.9,760,920,1.1],[72.9,800,880,1.08]];
function camAt(t){let i=0;while(i<CAM.length-1&&CAM[i+1][0]<=t)i++;const b=CAM[i],a=CAM[Math.max(0,i-1)];if(i===0)return b.slice(1);
  const k=ease(clamp((t-b[0])/1.3));return [lerp(a[1],b[1],k),lerp(a[2],b[2],k),lerp(a[3],b[3],k)];}
function render(t){
  $('bar').style.width=(t/D*1080)+'px';
  const [cx,cy,z]=camAt(t); const drift=Math.sin(t*.35)*5;
  $('cam').setAttribute('transform',`translate(${540-cx*z+drift},${900-cy*z}) scale(${z})`);
  // ambiente
  const dawn=clamp((t-67.4)/1.0);
  $('dawnwall').setAttribute('opacity',.55*dawn); $('dawnwin').setAttribute('opacity',dawn); $('moon').setAttribute('opacity',1-dawn); $('sun').setAttribute('opacity',dawn);
  $('rain').style.opacity=.7*(1-dawn); document.querySelectorAll('.rd').forEach((r,i)=>r.setAttribute('transform',`translate(0,${((t*620+i*71)%500)-250})`));
  $('lampglow').setAttribute('opacity',(1-dawn)*(.85+.15*Math.sin(t*3)));
  [0,1,2].forEach(i=>$('x'+i).setAttribute('opacity',t<67.4?clamp((t-(9.0+i*.5))/.25):0));
  // ---------- ÁLEX ----------
  const aTalk=talk(t,'alex'), mTalk=talk(t,'marco');
  let A={x:470,y:1400,s:1,sit:true,look:[3,0],blink:blinkAt(t,.3),mouth:aTalk,emo:'n',brow:'n',tilt:0,nod:0,armL:-8,armR:8,elbowR:0};
  const a2=S('a2'), a4=S('a4'), n2=S('n2');
  if(t<a2.s){A.phone=true;A.armR=30;A.elbowR=-110;A.look=[0,6];A.brow='sad';A.emo='sad';A.tilt=-5+Math.sin(t*.9)*2;}
  if(t>=8.5&&t<11.3){A.brow='sad';A.emo=aTalk>.05?'n':'sad';A.look=[2,3];}
  if(t>=11.5&&t<a2.s){A.look=[8,-2];A.brow='up';A.phone=true;}
  // se levanta del susto y retrocede
  if(t>=a2.s&&t<a4.s-.2){A.sit=false;const k=eout(clamp((t-a2.s)/.35));A.x=lerp(470,420,k);A.y=1400-Math.sin(clamp((t-a2.s)/.35)*Math.PI)*40;A.brow=t<a2.e+.6?'up':'n';A.look=[8,-3];A.armL=-20;A.armR=t<a2.e?-40:10;A.elbowR=t<a2.e?-50:0;A.emo=t<a2.e+.4?'surprise':'n';A.tilt=speaking(t,'marco')?4:0;}
  // vuelve a sentarse: "no tengo ganas"
  if(t>=a4.s-.2&&t<n2.s-1.5){A.sit=true;A.x=470;A.look=[8,-2];A.tilt=speaking(t,'marco')?3:0;}
  if(t>=a4.s-.2&&t<a4.e+.6){A.brow='sad';A.emo=aTalk>.05?'n':'sad';A.look=[3,4];A.tilt=-6;A.armL=-12;A.armR=12;}
  if(t>=S('a5').s-.1&&t<S('a5').e+.4){A.brow='up';A.look=[8,-3];}
  if(t>=S('m5').s&&t<S('m5').e){A.look=[8,-3];A.nod=Math.sin(t*2)*2;}
  if(t>=S('a6').s-.1&&t<S('m6').s+.3){A.brow='up';}
  if(t>=S('m6').s+.6&&t<66.6){A.phone=true;A.armR=30;A.elbowR=-110;A.look=[3,6];A.emo='smile';A.brow='down';}
  // mañana: dormido → alarma → se levanta y camina a la ventana
  if(t>=66.6){A.sit=true;A.x=470;A.sleepy=t<69.6?.6:0;A.brow=t<69.6?'n':'down';A.look=[0,1];A.emo='n';A.armL=-8;A.armR=8;A.tilt=t<69.6?-6:0;}
  if(t>=70.0){A.sit=false;const k=clamp((t-70.4)/2.0);A.walk=k>0&&k<1?1:0;A.phase=(t-70.4)*7;A.x=lerp(470,860,ease(k));A.look=[7,-2];A.emo='smile';A.sleepy=0;A.armL=A.walk?Math.sin(A.phase)*18:-8;A.armR=A.walk?-Math.sin(A.phase)*18:8;}
  if(t>=72.6){A.walk=0;A.x=860;A.armL=-150;A.armR=150;A.elbowL=-20;A.elbowR=20;A.look=[5,-5];A.emo='smile';A.brow='soft';}
  if(t>=73.0){A.armL=-8;A.armR=8;A.elbowL=0;A.elbowR=0;A.look=[-7,-2];}
  A.bob=0;
  // ---------- MARCO ----------
  const mIn=clamp((t-11.3)/0.9), mOut=1-clamp((t-66.3)/.5), mBack=win(t,72.8,75.9,.5);
  const mop=Math.max(Math.min(mIn,mOut),mBack);
  let M={x:1020,y:1400,s:1,op:mop*.97,blink:blinkAt(t,1.7),mouth:mTalk,brow:'n',look:[-7,0],tilt:Math.sin(t*.7)*1.5+(mTalk?Math.sin(t*5)*1.5:0),armL:-6,armR:6,emo:'n',aura:.8+.2*Math.sin(t*1.7),float:Math.sin(t*1.2)*8};
  const m2=S('m2'); const wk=clamp((t-m2.s-.3)/1.6);
  if(t>=m2.s){M.x=lerp(1020,860,ease(wk));}
  if(t>=m2.s+.3&&t<m2.s+1.9){M.float+=Math.abs(Math.sin((t-m2.s)*7))*-10;}
  if(t>=m2.s&&t<m2.s+2.5){M.armR=-30;M.elbowR=-60;M.emo='smile';}
  const m4=S('m4'); if(t>=m4.s&&t<m4.e){M.brow='down';M.armL=-40;M.elbowL=-50;}
  const m5=S('m5'); if(t>=m5.s&&t<m5.e){M.brow='down';const g=[46.8,50.5,56.9].some(x=>t>=x&&t<x+2.2);M.armR=g?-100:-30;M.elbowR=g?-40:-70;}
  const m6=S('m6'); if(t>=m6.s&&t<m6.e+.5){M.brow='down';M.armR=-60;M.elbowR=-30;}
  if(t>=72.8){M.x=1110;M.emo='smile';M.brow='soft';M.look=[-8,-1];}
  if(speaking(t,'marco')&&M.brow==='n') M.brow='soft';
  $('MX').innerHTML=drawMarco(M); $('AX').innerHTML=drawAlex(A); $('BEDF').style.display=A.sit?'':'none';
  // chispas
  const mxx=M.x;
  sparks.forEach(s=>{const app=clamp((t-11.0)/1.4);const conv=1-eout(app);const life=(t>11&&t<13.4)||(t>72.6&&t<74.2)||(t>65.9&&t<67);
    const ang=s.a+t*s.sp, r=s.d*(t<13.4?conv+.15:.6+.4*Math.sin(t+s.ph));
    s.el.setAttribute('cx',mxx+Math.cos(ang)*r);s.el.setAttribute('cy',1000+Math.sin(ang)*r*1.4-((t*40+s.y0*400)%400));
    s.el.setAttribute('opacity',life?(.4+.6*Math.abs(Math.sin(t*3+s.ph))):(mop>.5?.22*Math.abs(Math.sin(t*2+s.ph)):0));});
  // ---------- GANCHO (0–8.6) ----------
  const hk=win(t,0.05,8.4,.25); $('hook').style.opacity=hk;
  const hw=T.words.filter(w=>w.seg==='h0').slice(0,4);
  [...document.querySelectorAll('#hk1 span')].forEach((s,i)=>{const w=hw[Math.min(i<2?i:i<4?2:3,hw.length-1)];const k=clamp((t-w.s+0.05)/.18);s.style.opacity=k;s.style.transform=`scale(${k?back(k):.6})`;});
  $('hk2').style.opacity=clamp((t-3.05)/.3); $('hk2').style.transform=`translateY(${(1-eout(clamp((t-3.05)/.4)))*20}px)`;
  // recuadro con Marco en Roma, bostezando
  const ins=win(t,3.1,6.15,.3); $('inset').style.opacity=ins; $('inset').style.transform=`scale(${.7+.3*eout(clamp((t-3.1)/.4))})`;
  if(ins>0) $('insetg').innerHTML=`<rect width="420" height="420" fill="#3b2f28"/><rect x="260" y="40" width="130" height="200" rx="60" fill="url(#dawnsky)"/><rect x="20" y="300" width="380" height="120" rx="20" fill="#6a2f50" ${SW}/>`+
      `<g transform="translate(210,700) scale(.62)">${drawMarco({x:0,y:0,s:1,sleepy:.65,brow:'sad',mouth:.35+.35*Math.abs(Math.sin(t*1.6)),emo:'n',armR:-150,elbowR:-40,tilt:-6,look:[0,2]})}</g>`;
  // 1 2 3
  const nm=win(t,6.15,8.45,.2); $('nums').style.opacity=nm;
  [...document.querySelectorAll('#nums b')].forEach((b,i)=>{const k=clamp((t-(6.2+i*.35))/.25);b.style.transform=`scale(${k?back(k):0})`;});
  // ---------- FLASHBACK ROMA ----------
  const m3=S('m3'); const r0=m3.s-.1, r1=m3.e+.1;
  const rin=clamp((t-r0)/.6), rout=clamp((t-r1)/.5); const rr=(t<r1?eout(rin):1-eout(rout))*1500;
  $('rome').style.opacity=(t>r0&&t<r1+.6)?1:0; $('rome').style.clipPath=`circle(${rr}px at 540px 820px)`;
  const rz=1.0+.08*clamp((t-r0)/7.5); $('rcam').setAttribute('transform',`translate(${540-470*rz},${900-1000*rz}) scale(${rz})`);
  const wr=t>25.2;
  if(t>r0-.1&&t<r1+.7) $('MR').innerHTML=drawMarco({x:470,y:1400,s:1,laurel:true,sleepy:t<25?.55:0,blink:wr?blinkAt(t,.9):0,mouth:t<24.6?.3+.3*Math.abs(Math.sin(t*1.8)):0,brow:t<25?'sad':'down',look:wr?[4,7]:[0,2],tilt:t<25?-7+Math.sin(t*2)*2:-4,nod:wr?8:0,armR:wr?-40+Math.sin(t*12)*5:-150,elbowR:wr?-70:-40,armL:wr?-25:-6,tablet:wr,write:clamp((t-25.6)/4)});
  $('romesign').style.opacity=win(t,r0+.3,r1-.3,.3);
  $('quote').style.opacity=win(t,26.5,r1,.25); $('quote').style.transform=`rotate(1.5deg) translateY(${(1-eout(clamp((t-26.5)/.4)))*30}px)`;
  // rótulos
  $('title').style.opacity=win(t,7.4,10.8,.35); $('title').style.transform=`rotate(-2deg) scale(${.92+.08*eout(clamp((t-7.4)/.4))})`;
  const toS=(x,y)=>[540-cx*z+drift+x*z,900-cy*z+y*z];
  const la=win(t,8.8,11.3,.3); $('labA').style.opacity=la; $('labA').style.left='620px'; $('labA').style.top='420px';
  const lm=win(t,15.3,21.8,.3); $('labM').style.opacity=lm; $('labM').style.left='90px'; $('labM').style.top='300px';
  const ha=toS(A.x,A.y-(A.sit?700:820)), hm=toS(M.x,M.y-840);
  $('lnA').setAttribute('d',`M640 495 L${ha[0]+50} ${ha[1]+30}`); $('lnA').style.opacity=la;
  $('lnM').setAttribute('d',`M200 380 L${hm[0]-60} ${hm[1]+20}`); $('lnM').style.opacity=lm;
  // mente frágil vs forjada
  const mind=win(t,m4.s+.2,m4.e+.5,.35); $('mind').style.opacity=mind; $('mind').style.transform=`translateY(${(1-eout(clamp((t-m4.s-.2)/.5)))*40}px)`;
  const tf=[['f1',36.5],['fa1',37.6],['f2',39.1],['fa2',39.7],['f3',40.1],['g1',40.4],['ga1',40.9],['g2',41.4],['ga2',41.7],['g3',41.9]];
  tf.forEach(([id,a])=>{const k=clamp((t-a)/.25);$(id).style.opacity=k;$(id).style.transform=`scale(${k?back(k):.8})`;});
  // método
  const cIn=[46.8,50.5,56.9]; ['c1','c2','c3'].forEach((id,i)=>{const k=clamp((t-cIn[i])/.35);const o=k*clamp((m5.e+.6-t)/.4);$(id).style.opacity=o;$(id).style.transform=`translateX(${(1-eout(k))*-120}px) rotate(${[-1.5,1,-1][i]}deg)`;});
  // móvil con alarma
  const ph=win(t,63.2,66.4,.3); $('phone').style.opacity=ph; $('phone').style.transform=`scale(${.85+.15*eout(clamp((t-63.2)/.4))}) rotate(-3deg)`;
  // salto temporal
  $('black').style.opacity=win(t,66.4,67.6,.35)*.95;
  $('seven').style.opacity=win(t,66.7,69.4,.25);
  const ring=t>67.6&&t<69.6; $('nsphone').setAttribute('transform',`translate(${40+(ring?Math.sin(t*80)*6:0)},1170)`);
  // final
  $('end').style.opacity=clamp((t-75.95)/.5);
  // subtítulos (no durante el gancho: ya está en pantalla)
  const sub=T.subs.find(s=>t>=s.s-0.06&&t<s.e);
  const segw=sub?T.seg.find(s=>s.id===sub.seg):null;
  $('ban').style.opacity=(t>75.9||!sub||(sub&&sub.seg==='h0'&&t<8.3))?0:1;
  if(sub){const who=segw.who;$('who').textContent={narrador:'NARRADOR',alex:'ÁLEX',marco:'MARCO AURELIO'}[who];
    $('who').style.background={narrador:'#5a4f3e',alex:'#2f6f6a',marco:'#b8864b'}[who];
    $('txt').innerHTML=sub.w.map(w=>{const on=t>=w.s-0.04;const k=on&&KEY.test(w.t.replace(/[^\wáéíóúñü]/gi,''));return `<span class="${on?'on':''}${k?' k':''}">${w.t}</span>`;}).join(' ');}
}
