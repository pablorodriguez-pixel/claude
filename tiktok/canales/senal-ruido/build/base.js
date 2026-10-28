// SEÑAL/RUIDO — motor base: escenas, transición de "cambio de canal", grano, subtítulos.
// El episodio define SC=[[id,inicio,fin],...] y una función scene(t) que anima sus piezas.
const $=id=>document.getElementById(id);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eo=x=>1-Math.pow(1-cl(x),3);
const eback=x=>{x=cl(x);const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const p=(t,a,d=.35)=>cl((t-a)/d);
function pop(el,t,a,dur=.35,from=.6){const k=p(t,a,dur);el.style.opacity=cl(k*2);el.style.transform=`scale(${from+(1-from)*eback(k)})`}
function rise(el,t,a,dur=.4,dist=70){const k=eo(p(t,a,dur));el.style.opacity=k;el.style.transform=`translateY(${(1-k)*dist}px)`}
function stamp(el,t,a,rot=-6){const k=p(t,a,.22);el.style.opacity=k>0?1:0;const s=k<1?2.4-1.4*eo(k):1;el.style.transform=`rotate(${rot}deg) scale(${s})`}
function fmtES(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}

// Estática determinista: misma t → mismo grano (render reproducible).
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let x=Math.imul(seed^seed>>>15,1|seed);x=x+Math.imul(x^x>>>7,61|x)^x;return((x^x>>>14)>>>0)/4294967296}}
function paintNoise(cv,t,amount=1){
  const c=cv.getContext('2d'),w=cv.width,h=cv.height,img=c.createImageData(w,h),d=img.data,r=rng(Math.floor(t*30)*7919+w);
  for(let i=0;i<d.length;i+=4){const v=255-r()*170*amount;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255}
  // bandas horizontales tipo señal perdida
  for(let k=0;k<3;k++){const y=Math.floor(r()*h),bh=1+Math.floor(r()*3);for(let yy=y;yy<Math.min(h,y+bh);yy++)for(let x=0;x<w;x++){const i=(yy*w+x)*4;d[i]=d[i+1]=d[i+2]=255-120*amount}}
  c.putImageData(img,0,0)}
function makeNoisy(el,w=180,h=120){const cv=document.createElement('canvas');cv.width=w;cv.height=h;el.classList.add('noisy');el.appendChild(cv);return cv}

const TR=.16; // medio tiempo de la transición "cambio de canal"
window.render=function(t){
  $('bar').style.width=(100*cl(t/DUR))+'%';
  let grain=0,shake=0;
  for(const [id,a,b] of SC){
    const el=$(id),on=t>=a-TR&&t<b+TR; el.style.display=on?'block':'none'; if(!on) continue;
    let o=1,sy=1,sk=0;
    if(a>0&&t<a+TR){const k=cl((t-(a-TR))/(2*TR));o=k;sy=.04+.96*eo(k);grain=Math.max(grain,1-k)}
    if(t>b-TR){const k=cl((t-(b-TR))/(2*TR));o=1-k;sy=1-.96*eo(k);grain=Math.max(grain,k)}
    el.style.opacity=o; el.style.transform=`scaleY(${sy})`;
  }
  $('grid').style.transform=`translate(${(t*8)%40}px,${(t*12)%40}px)`;
  const g=$('grain'); g.style.opacity=grain*.9; if(grain>0) paintNoise(g,t,1);
  shake=scene(t)||0;
  $('cam').style.transform=`translate(${shake?Math.sin(t*140)*shake:0}px,0)`;
  // subtítulos: palabra activa en naranja (sello de señal)
  const sub=$('subs');let html='';
  for(const c of SUBS){if(t>=c.s-.02&&t<c.e){const k=p(t,c.s-.02,.12);
    html=c.w.map(w=>{const act=t>=w.s-.03,now=act&&t<w.e+.05;return `<span class="${now?'on':''}" style="opacity:${act?1:.25}">${w.t}</span>`}).join('');
    sub.style.transform=`translateY(${(1-eo(k))*20}px)`;break}}
  sub.innerHTML=html;
  sub.style.opacity=(window.HIDE_SUBS&&HIDE_SUBS(t))?0:1;
};
window.ready=document.fonts.ready.then(()=>true);
