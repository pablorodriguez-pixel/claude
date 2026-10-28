// A ESCALA — capa de edición común (va después de scenes.js): subtítulos por frases, capítulos, barra de progreso
// y golpe de zoom en las palabras clave. Lee EDIT (de <episodio>/edicion.json) y SUBS.
const $=id=>document.getElementById(id);
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w %]/g,'').toLowerCase();
const vt=(w,n=1)=>{let k=0;for(const x of SUBS)if(norm(x.t)===norm(w)&&++k===n)return x.s;throw Error('edicion.json: no está «'+w+'» #'+n)};
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),eo=x=>1-Math.pow(1-cl(x),3);
// frases: cortan en puntuación, a las 3 palabras o a los ~16 caracteres
const FR=[];{let c=[];SUBS.forEach((w,i)=>{c.push(i);const len=c.reduce((a,j)=>a+SUBS[j].t.length+1,0);
  if(w.p||c.length>=3||len>=15||i==SUBS.length-1){FR.push(c);c=[]}})}
const fin=c=>Math.min(SUBS[c.at(-1)+1]?SUBS[c.at(-1)+1].s:DUR,SUBS[c.at(-1)].e+.5);
const CAPS=(EDIT.capitulos||[]).map(([w,n,tit,sub])=>({t:vt(w,n)-.15,tit,sub}));
let KEY=new Set();
const POS=['lab1','lab2','lab3','cnt','big','br1','br2'];
function post(t){
  // subtítulos de la escena → frase entera; lo dicho en blanco, lo que viene más tenue, las claves en oro
  const sb=$('subs');sb.style.visibility='hidden';$('veil').style.opacity=0;
  const c=FR.find(c=>t>=SUBS[c[0]].s-.05&&t<fin(c)),f=$('frase');
  if(c){f.style.opacity=1;f.innerHTML=c.map(j=>{const w=SUBS[j],on=t>=w.s-.05;return `<span class="${on?'on':''} ${KEY.has(w.s)?'k':''}">${w.t}</span>`}).join(' ');
    const k=eo((t-SUBS[c[0]].s+.05)/.12);f.style.transform=`translate(-50%,-50%) scale(${1.06-.06*k})`;$('velo').style.opacity=1}
  else{f.style.opacity=0;$('velo').style.opacity=0}
  // capítulo arriba: número + título + idea en una línea
  const ci=CAPS.findLastIndex(x=>t>=x.t),cap=$('cap');
  if(ci>=0){const C=CAPS[ci],k=eo((t-C.t)/.3);cap.style.opacity=k;cap.style.transform=`translateX(-50%) translateY(${(1-k)*-30}px)`;
    cap.innerHTML=`<i>${ci+1}/${CAPS.length}</i><b>${C.tit}</b><span>${C.sub}</span>`}else cap.style.opacity=0;
  $('barra').style.width=(cl(t/DUR)*100)+'%';
  // pastillas fijas, por debajo del capítulo
  for(const id of POS){const e=$(id);if(e.style.top==='380px')e.style.top='560px';else if(e.style.top==='520px')e.style.top='690px'}
  // golpe de zoom en cada palabra clave (la imagen y lo que va pegado a ella)
  let z=1;for(const s of KEY){const d=t-s;if(d>=-.02&&d<.45)z=Math.max(z,1+.05*(1-eo(d/.45)))}
  $('gl').style.transform=`scale(${z})`;
  for(const id of POS){const e=$(id);if(!e.style.left)continue;
    if(e.dataset.w!==e.style.left+'|'+e.style.top){e.dataset.bx=parseFloat(e.style.left);e.dataset.by=parseFloat(e.style.top)}
    e.style.left=(540+(e.dataset.bx-540)*z)+'px';e.style.top=(960+(e.dataset.by-960)*z)+'px';e.dataset.w=e.style.left+'|'+e.style.top}
}
(function wrap(){if(!window.ready||!window.render)return setTimeout(wrap,20);
  KEY=window.KEYT||KEY;const orig=window.render;window.render=t=>{orig(t);post(t)};window.edited=true})();
