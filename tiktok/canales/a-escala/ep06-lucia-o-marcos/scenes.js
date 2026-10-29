// EP06 — formato CONTRASTE «¿Lucía o Marcos?»: mismo sueldo y mismos 200 €/mes; una lo deja en el banco y el otro
// lo invierte. Pantalla partida (frío/rojo contra oro), contador de edad 25→65, final en el primer fotograma.
// 2D en el DOM (sin three.js): mismo render(t) determinista, misma capa de edición (edit.js).
const $=id=>document.getElementById(id);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),eo=x=>1-Math.pow(1-cl(x),3),eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const p=(t,a,d)=>cl((t-a)/d),lerp=(a,b,k)=>a+(b-a)*k;
const fmt=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]/g,'').toLowerCase();
function vt(w,n=1){let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw new Error('palabra '+w)}
await document.fonts.ready;

// ───────── datos: 200 €/mes desde los 25; banco 0 %, fondo ≈8 %/año (capitalización mensual); inflación 2 %
const r=.08/12,banco=a=>200*12*Math.max(0,a-25),fondo=a=>{const m=Math.max(0,a-25)*12;return 200*((1+r)**m-1)/r};
const MAX=fondo(65),HMAX=780,BASE=1215;           // la torre de Marcos a los 65 = 470 px

// ───────── tiempos (palabras de la voz)
const T={lucia:vt('lucia'),marcos:vt('marcos'),siete:vt('siete'),lucia2:vt('lucia',2),banco:vt('banco'),marcos2:vt('marcos',2),
  indexado:vt('indexado'),a35:vt('treinta'),c35:vt('cinco'),pequena:vt('pequena'),a45:vt('cuarenta'),c45:vt('cinco',2),doble:vt('doble'),
  a65:vt('sesenta'),c65:vt('cinco',3),noventa:vt('noventa'),setecientos:vt('setecientos'),inflacion:vt('inflacion'),
  cuarenta2:vt('cuarenta',2),pusieron:vt('pusieron'),donde:vt('donde'),tu:vt('tu'),lucia4:vt('lucia',4),marcos4:vt('marcos',4),
  guardalo:vt('guardalo'),sigueme:vt('sigueme')};
// edad: 25 en el rebobinado; sube en cada «… y cinco»
function edad(t){if(t<T.a35-.1)return 25;if(t<T.c35+.3)return lerp(25,35,eio(p(t,T.a35-.1,T.c35+.3-(T.a35-.1))));
  if(t<T.a45-.1)return 35;if(t<T.c45+.3)return lerp(35,45,eio(p(t,T.a45-.1,T.c45+.3-(T.a45-.1))));
  if(t<T.a65-.1)return 45;return lerp(45,65,eio(p(t,T.a65-.1,T.c65+.5-(T.a65-.1))))}

// ───────── escena
const G=$('gl');G.innerHTML=`<style>
#esc{position:absolute;inset:0;overflow:hidden;font-family:Figtree,sans-serif;color:#fff}
.mitad{position:absolute;top:0;bottom:0;width:540px}
#izq{left:0;background:radial-gradient(ellipse 120% 60% at 50% 55%,#1b2740 0%,#0c1222 60%,#05070e 100%)}
#der{right:0;background:radial-gradient(ellipse 120% 60% at 50% 55%,#4a3008 0%,#1c1205 60%,#070502 100%)}
#raya{position:absolute;left:537px;top:420px;width:6px;height:800px;background:linear-gradient(#fff0,#ffffffb0 20%,#ffffffb0 80%,#fff0)}
#vs{position:absolute;left:540px;top:760px;transform:translate(-50%,-50%);width:120px;height:120px;border-radius:50%;background:#0b0d16;border:5px solid #fff;
  display:flex;align-items:center;justify-content:center;font-weight:800;font-size:52px;box-shadow:0 0 50px #000}
.av{position:absolute;top:425px;width:250px;height:250px;z-index:3;transform:translateX(-50%)}
.nom{position:absolute;top:675px;z-index:3;transform:translateX(-50%);font-weight:800;font-size:54px;letter-spacing:.04em;text-shadow:0 4px 16px #000}
.chip{position:absolute;top:750px;z-index:3;transform:translateX(-50%);font-weight:800;font-size:32px;padding:10px 22px;border-radius:999px;white-space:nowrap}
.torre{position:absolute;bottom:${1920-BASE}px;width:250px;z-index:1;transform:translateX(-50%);border-radius:18px 18px 8px 8px}
#tL{background:repeating-linear-gradient(#8fa3c4 0 9px,#5d6f8f 9px 12px);box-shadow:0 0 30px #5d6f8f55}
#tR{background:repeating-linear-gradient(#ffd56a 0 9px,#c98a1c 9px 12px);box-shadow:0 0 70px #f5b84199}
.cifra{position:absolute;z-index:4;padding:6px 22px;border-radius:24px;background:#0b0d16d0;transform:translate(-50%,-100%);font-weight:800;white-space:nowrap;text-shadow:0 4px 18px #000}
#hL{color:#dfe7f5;font-size:64px}#hR{color:#f5b841;font-size:64px}
.suelo{position:absolute;top:${BASE}px;width:300px;height:6px;border-radius:6px;transform:translateX(-50%);background:#ffffff40}
#cab{position:absolute;left:540px;top:330px;transform:translate(-50%,-50%);font-weight:800;font-size:54px;padding:14px 34px;border-radius:999px;
  background:#0b0d16e6;border:3px solid #f5b84188;white-space:nowrap}
#cab b{color:#f5b841}
#aviso{position:absolute;left:540px;top:392px;transform:translateX(-50%);font-weight:700;font-size:24px;color:#ffffffa0;white-space:nowrap}
.sello{position:absolute;z-index:5;transform:translate(-50%,-50%);font-weight:800;white-space:nowrap;text-shadow:0 6px 30px #000}
#puso{position:absolute;height:0;border-top:5px dashed #fff;width:470px;left:300px}
#pusoT{position:absolute;font-weight:800;font-size:30px;white-space:nowrap;color:#fff;text-shadow:0 2px 10px #000}
#gran{position:absolute;z-index:6;left:540px;top:820px;transform:translate(-50%,-50%);text-align:center;font-weight:800;font-size:96px;line-height:1.05;
  padding:30px 44px;border-radius:40px;background:#0b0d16f0;border:4px solid #f5b841;box-shadow:0 20px 80px #000}
#gran small{display:block;font-size:44px;color:#f5b841;margin-top:12px}
</style><div id="esc">
<div id="izq" class="mitad"></div><div id="der" class="mitad"></div><div id="raya"></div>
<div class="suelo" style="left:270px"></div><div class="suelo" style="left:810px"></div>
<div id="tL" class="torre" style="left:270px"></div><div id="tR" class="torre" style="left:810px"></div>
<div id="puso"></div><div id="pusoT"></div>
<div id="hL" class="cifra"></div><div id="hR" class="cifra"></div>
<div id="vs">VS</div>
<svg id="aL" class="av" viewBox="0 0 200 200" style="left:270px"></svg><svg id="aR" class="av" viewBox="0 0 200 200" style="left:810px"></svg>
<div id="nL" class="nom" style="left:270px">LUCÍA</div><div id="nR" class="nom" style="left:810px">MARCOS</div>
<div id="cL" class="chip" style="left:270px;background:#2a3550;color:#c9d3e6;border:2px solid #8fa3c4">BANCO · 0 %</div>
<div id="cR" class="chip" style="left:810px;background:#3a2606;color:#ffd77a;border:2px solid #f5b841">FONDO INDEXADO · ≈8 %</div>
<div id="cab"></div><div id="aviso">ejemplo: 200 €/mes · ≈8 %/año (media histórica, no garantizada) · inflación 2 %</div>
<div id="s1" class="sello"></div><div id="s2" class="sello"></div><div id="gran"></div>
</div>`;
// caras: pelo, piel, camiseta; boca según el ánimo (-1 triste … 1 contento)
function cara(el,{pelo,piel,ropa,largo},animo,brillo=1){
  const m=animo*14,ojo=animo<-.3?'M70 92 q8 5 16 0 M114 92 q8 5 16 0':'M78 92 a7 7 0 1 0 .1 0 M122 92 a7 7 0 1 0 .1 0';
  el.innerHTML=`<defs><clipPath id="c${el.id}"><circle cx="100" cy="100" r="96"/></clipPath></defs>
  <circle cx="100" cy="100" r="98" fill="${brillo>1?'#f5b841':'#ffffff'}" opacity="${brillo>1?1:.25}"/>
  <g clip-path="url(#c${el.id})" style="filter:saturate(${brillo})"><rect width="200" height="200" fill="#10131f"/>
  ${largo?`<path d="M38 100 q0 -70 62 -70 q62 0 62 70 v90 h-124z" fill="${pelo}"/>`:''}
  <path d="M30 210 q0 -52 70 -52 q70 0 70 52z" fill="${ropa}"/><rect x="86" y="128" width="28" height="34" fill="${piel}"/>
  <ellipse cx="100" cy="96" rx="44" ry="50" fill="${piel}"/>
  ${largo?`<path d="M56 86 q4 -46 46 -46 q40 0 42 46 q-30 -22 -88 0z" fill="${pelo}"/>`:`<path d="M54 84 q2 -44 48 -44 q44 0 44 44 q-10 -16 -46 -18 q-36 2 -46 18z" fill="${pelo}"/>`}
  <path d="${ojo}" stroke="#1a1410" stroke-width="7" fill="#1a1410" stroke-linecap="round"/>
  <path d="M80 ${122-m*.3} q20 ${m} 40 0" stroke="#1a1410" stroke-width="6" fill="none" stroke-linecap="round"/></g>`}
const LU={pelo:'#3b2416',piel:'#e8b896',ropa:'#7a5cc4',largo:true},MA={pelo:'#1c1410',piel:'#c98f68',ropa:'#2fa58f',largo:false};

window.render=function(t){
  const e=edad(t),rew=p(t,T.lucia2-.25,.45);                 // rebobinado tras el hook
  // hook: torres finales con «¿?»; luego bajan a cero y crecen con la edad
  let vL,vR,hook=t<T.lucia2-.25;
  if(hook){vL=banco(65)*eo(p(t,.05,.5));vR=fondo(65)*eo(p(t,.6,.6))}
  else if(rew<1){vL=banco(65)*(1-eio(rew));vR=fondo(65)*(1-eio(rew))}
  else{vL=banco(e);vR=fondo(e)}
  // inflación: la torre de Lucía se queda en lo que vale de verdad (96.000 / 1,02^40)
  const inf=p(t,T.inflacion,.5),real=banco(65)/1.02**40,fin=t>=T.inflacion;
  const vLshow=fin?lerp(banco(65),real,eio(p(t,T.cuarenta2-.1,.6))):vL;
  const h=v=>Math.max(4,v/MAX*HMAX),hl=h(vLshow),hr=h(vR);
  $('tL').style.height=hl+'px';$('tR').style.height=hr+'px';
  
  $('tL').style.background=fin&&inf>.5?'repeating-linear-gradient(#ff7a6e 0 9px,#b5291f 9px 12px)':'';
  $('tR').style.boxShadow=`0 0 ${70+80*p(t,T.c65,.5)*(1-p(t,T.inflacion,.5))}px #f5b841aa`;
  // cifras encima de cada torre
  const qq=hook&&t<T.siete-.05;
  $('hL').style.left='270px';$('hL').style.top=Math.min(BASE-hl-14,960)+'px';$('hR').style.left='810px';$('hR').style.top=Math.max(Math.min(BASE-hr-14,960),905)+'px';
  $('hL').textContent=qq?'¿?':fmt(vLshow)+' €';$('hR').textContent=qq?'¿?':fmt(vR)+' €';
  $('hL').style.color=fin&&inf>.5?'#ff6a5c':'#dfe7f5';
  const pop=k=>`translate(-50%,-100%) scale(${1+.35*(1-eo(k))*(k>0?1:0)})`;
  $('hL').style.transform=pop(p(t,T.noventa,.4));$('hR').style.transform=pop(p(t,T.setecientos,.4));
  $('hL').style.fontSize=(t>T.c65?78:64)+'px';$('hR').style.fontSize=(t>T.c65?78:64)+'px';
  $('hL').style.opacity=$('hR').style.opacity=rew>0&&rew<1?0:1;
  // caras y nombres (se iluminan al nombrarlos)
  const lit=(a,b)=>t>=a&&t<b;
  const animoL=t>T.inflacion?-1:t>T.c65?-.4:0,animoR=t>T.c65?1:t>T.doble?.6:0;
  cara($('aL'),LU,animoL,lit(T.tu,T.marcos4-.05)||lit(T.lucia,T.marcos-.05)?1.4:t>T.inflacion?.4:.8);
  cara($('aR'),MA,animoR,lit(T.marcos4-.05,T.guardalo)||lit(T.marcos,T.cobran??99)?1.4:1.1);
  const pa=k=>`translateX(-50%) scale(${.6+.4*eo(k)})`;
  $('aL').style.transform=pa(p(t,.02,.25));$('aR').style.transform=pa(p(t,T.marcos-.05,.25));
  $('aL').style.opacity=cl(p(t,.02,.15));$('aR').style.opacity=cl(p(t,T.marcos-.05,.15));
  $('nL').style.opacity=$('aL').style.opacity;$('nR').style.opacity=$('aR').style.opacity;
  $('cL').style.opacity=p(t,T.banco-.1,.2);$('cR').style.opacity=p(t,T.indexado-.1,.2);
  $('cL').style.transform=`translateX(-50%) scale(${1.25-.25*eo(p(t,T.banco-.1,.25))})`;$('cR').style.transform=`translateX(-50%) scale(${1.25-.25*eo(p(t,T.indexado-.1,.25))})`;
  // cabecera: primero la premisa, luego la edad
  const cab=$('cab');
  if(t<T.a35-.2)cab.innerHTML='MISMO SUELDO · <b>200 €/MES</b>';
  else cab.innerHTML=`EDAD <b>${Math.floor(e+.001)}</b> AÑOS`;
  cab.style.transform=`translate(-50%,-50%) scale(${1+.12*(1-eo(p(t,T.a35-.2,.25)))*(t>T.a35-.2?1:0)})`;
  $('aviso').style.opacity=p(t,T.banco,.3)*(1-p(t,T.tu-.3,.3));
  // sellos: ×7 en el hook, ×2,5 a los 45, +602.000 € de interés al final
  const s1=$('s1'),s2=$('s2');s1.style.opacity=0;s2.style.opacity=0;
  const sello=(el,x,y,html,size,col,a,b)=>{if(t<a||t>=b)return;const k=p(t,a,.25);el.style.opacity=cl(k*3)*(1-p(t,b-.2,.2));el.style.left=x+'px';el.style.top=y+'px';
    el.style.fontSize=size+'px';el.style.color=col;el.innerHTML=html;el.style.transform=`translate(-50%,-50%) rotate(-6deg) scale(${1.6-.6*eo(k)})`};
  sello(s1,810,1060,'×7',230,'#f5b841',T.siete,T.lucia2-.25);
  sello(s1,810,1000,'×2,5',150,'#f5b841',T.doble,T.a65);
  sello(s2,270,1075,'−52.000 €<br><span style="font-size:36px">de valor real</span>',76,'#ff5a4a',T.cuarenta2+.3,T.pusieron);
  // «los dos pusieron lo mismo»: raya a 96.000 € en las dos torres
  const kp=p(t,T.pusieron-.1,.3)*(1-p(t,T.tu-.2,.2)),yP=BASE-h(banco(65));
  $('puso').style.opacity=kp;$('puso').style.top=yP+'px';$('puso').style.width=(470*eo(kp))+'px';$('puso').style.left='35px';
  $('puso').style.width=(1010*eo(kp))+'px';
  $('pusoT').style.opacity=kp;$('pusoT').style.left='40px';$('pusoT').style.top=(yP-46)+'px';$('pusoT').textContent='los dos pusieron 96.000 €';
  if(kp>0){s2.style.opacity=kp*p(t,T.donde-.1,.2);s2.style.left='810px';s2.style.top=(BASE-hr*.55)+'px';s2.style.fontSize='64px';s2.style.color='#fff';
    s2.innerHTML='+602.000 €<br><span style="font-size:34px;color:#ffd77a">de intereses</span>';s2.style.transform='translate(-50%,-50%) rotate(-6deg)'}
  // cierre: pregunta y guardar
  const gr=$('gran'),kg=p(t,T.tu-.1,.25);
  if(t<T.tu-.1)gr.style.opacity=0;else{gr.style.opacity=cl(kg*3);gr.style.transform=`translate(-50%,-50%) scale(${1.25-.25*eo(kg)})`;
    gr.innerHTML=t<T.guardalo-.1?'¿TÚ ERES<br><span style="color:#8fa3c4">LUCÍA</span> O <span style="color:#f5b841">MARCOS</span>?'
      :'GUÁRDALO<small>y sígueme para ser Marcos</small>'}
};
T.cobran=vt('cobran');
window.setCam=()=>{};
const CLAVES=[['siete',1],['banco',1],['indexado',1],['doble',1],['setecientos',1],['inflacion',1],['donde',1],['guardalo',1]];
const KEYT=new Set(CLAVES.map(([w,n])=>vt(w,n)));window.KEYT=KEYT;
window.ready=true;
