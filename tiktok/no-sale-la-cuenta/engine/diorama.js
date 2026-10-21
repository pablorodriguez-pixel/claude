/* ====== DIORAMA: escena de personajes con props animados por pistas (JSON) ====== */
const seed=(n)=>{let s=n*9301+49297;return()=>((s=(s*9301+49297)%233280)/233280)};
function mkProp(p,root){
  let car=null;const html=p.car?'':(p.e?`<span style="font-size:${p.size||200}px;line-height:1;display:block">${p.e}</span>`:(p.html||''));
  const e=mk(root,p.car?'car clear':'',`position:absolute;left:0;top:0;z-index:${p.z||3};white-space:nowrap;opacity:0;${p.css||''}`,p.car?'<div class="bl"></div><div class="bd"></div><div class="cb"></div><div class="w" style="left:26px"></div><div class="w" style="left:128px"></div>':html);
  let driver=null;
  if(p.car){e.style.setProperty('--c',p.car.color||'#fff');e.style.width='190px';e.style.height='84px';
    if(p.car.driver){const d=makeActor(Object.assign({look:'base',at:[95,70],sc:.42,parent:e,noLegs:true},p.car.driver),e);e.insertBefore(d.el,e.firstChild);driver=d}
    if(p.car.label)mk(e,'cond','position:absolute;left:136px;top:36px;width:50px;text-align:center;font-size:24px;color:#0B0C10;z-index:3',p.car.label);car=e.querySelector('.bl')}
  const base={x:p.x,y:p.y,s:p.s??1,r:p.r??0,o:p.o??1};const tr=(p.tracks||[]).slice().sort((a,b)=>a.a-b.a);
  const T=p.texts||[];
  return t=>{let cur=Object.assign({},base);
    for(const k of tr){if(t<k.a)break;const u=cl((t-k.a)/(k.d||.4));const f=k.e==='q'?1-(1-u)*(1-u):k.e==='out'?eo(u):k.e==='in'?u*u:k.e==='el'?el(u):k.e==='lin'?u:eio(u);
      const nx=Object.assign({},cur);for(const key of ['x','y','s','r','o'])if(k[key]!==undefined)nx[key]=lerp(cur[key],k[key],f);
      if(u<1){cur=nx;break}cur=nx}
    const on=t>=p.a&&(p.out===undefined||t<p.out);const age=t-p.a;
    let es=1,eo2=1,dy=0;if(p.k==='pop'){es=lerp(.2,1,el(cl(age/.5)))}else if(p.k==='slam'){es=lerp(2.2,1,el(cl(age/.4)))}else if(p.k==='rise'){dy=(1-eo(cl(age/.4)))*80;eo2=cl(age/.3)}
    let vib=0;if(p.vib&&t>=p.vib[0]&&t<p.vib[1])vib=Math.sin(t*45)*2;
    e.style.opacity=on?cur.o*eo2:0;
    e.style.transform=`translate(${cur.x}px,${cur.y+dy+vib}px) translate(-50%,-50%) scale(${cur.s*es}) rotate(${cur.r}deg)`;
    for(let i=T.length-1;i>=0;i--){if(t>=T[i].a){if(e.dataset.ti!==String(i)){e.innerHTML=`<span style="font-size:${p.size||200}px;line-height:1;display:block">${T[i].html}</span>`;e.dataset.ti=String(i)}break}}
    if(car){const L=p.lights||[];car.style.opacity=L.some(q=>t>=q[0]&&t<q[1])?1:0}
    if(driver)driver.upd(t)}}
B.diorama=(S,root)=>{chrome(S,root);
  const gy=S.ground??1130,deco=S.deco||'none';
  if(deco==='city'){const r=seed(S.seedv||3);for(let i=0;i<13;i++){const w=70+r()*90,h=160+r()*380,x=i*85-20;
    mk(root,'abs',`left:${x}px;top:${gy-h}px;width:${w}px;height:${h}px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03));background-image:radial-gradient(rgba(255,225,77,.35) 3px,transparent 3.5px);background-size:22px 30px;border-radius:6px 6px 0 0`)}}
  if(deco==='room'){mk(root,'abs',`left:0;right:0;top:300px;height:${gy-300}px;background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.06))`);mk(root,'abs',`left:700px;top:420px;width:260px;height:300px;border:10px solid rgba(255,255,255,.18);border-radius:10px;background:linear-gradient(180deg,#14143a,#2a1a4a)`)}
  if(S.road){mk(root,'abs',`left:0;right:0;top:${gy-S.road[0]}px;height:${S.road[0]+S.road[1]}px;background:#14151a;border-top:3px solid #2a2b33;border-bottom:3px solid #2a2b33`);
    const d=mk(root,'abs',`left:0;right:0;top:${gy-S.road[0]/2}px;height:9px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.4) 0 60px,transparent 60px 130px)`);S._dash=d}
  mk(root,'abs',`left:0;right:0;top:${gy}px;height:${S.road?0:10}px;background:rgba(244,241,234,.55)`);
  if(!S.road)mk(root,'abs',`left:0;right:0;top:${gy+10}px;height:${1920-gy}px;background:linear-gradient(180deg,rgba(255,255,255,.07),transparent)`);
  const props=(S.props||[]).map(p=>mkProp(p,root));
  return t=>{props.forEach(f=>f(t));if(S._dash&&S.scroll)S._dash.style.backgroundPosition=-((t*S.scroll)%130)+'px 0'}};
