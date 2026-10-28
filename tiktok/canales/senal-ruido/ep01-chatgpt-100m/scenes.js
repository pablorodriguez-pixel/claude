// EP01 — «ChatGPT: 100 millones en 2 meses». Tiempos sacados de stt.json.
const SC=[['s1',0,4.5],['s2',4.5,6.3],['s3',6.3,12.95],['s4',12.95,19.3],['s5',19.3,22.4],['s6',22.4,29.65],['s7',29.65,38.7],['s8',38.7,41.4],['s9',41.4,44.35],['s10',44.35,99]];
const NZ={};
(function(){
  NZ.s1=makeNoisy($('s1c'),220,160);
  NZ.s2=makeNoisy($('s2c'),200,60);
  NZ.s5=makeNoisy($('s5a'),200,52);
  NZ.s6=makeNoisy($('s6c'),220,96);
  NZ.s7=makeNoisy($('s7c'),220,176);
  NZ.s10=makeNoisy($('s10r'),120,40);
  const B=$('s4bars');
  [['ChatGPT',2,'var(--azul)',13.3],['TikTok',9,'var(--tinta)',15.1],['Instagram',30,'var(--tinta)',17.1]].forEach(([n,m,c,a],i)=>{
    const r=document.createElement('div');r.style.cssText='margin-bottom:46px';r.dataset.m=m;r.dataset.a=a;
    r.innerHTML=`<div class="h" style="font-size:72px">${n}</div><div style="display:flex;align-items:center;gap:24px;margin-top:12px"><div class="bar" style="height:84px;width:0;border-radius:10px;background:${c}"></div><div class="h num" style="font-size:84px"></div></div>`;
    B.appendChild(r)});
})();
function scene(t){
  let shake=0;
  // S1: el post viral vibra bajo la estática
  {const c=$('s1c');const k=eo(p(t,.1,.5));c.style.opacity=k;c.style.transform=`translateY(${(1-k)*120}px) rotate(${-1.5+Math.sin(t*2)*.4}deg)`;
   if(t<4.7){paintNoise(NZ.s1,t,.45+.15*Math.sin(t*9))}}
  // S2
  if(t>4.3&&t<6.6){pop($('s2a'),t,4.65,.3);rise($('s2b'),t,5.3,.25);pop($('s2c'),t,5.5,.3);paintNoise(NZ.s2,t,.9)}
  // S3: OpenAI tachado → nota UBS → sello ESTIMACIÓN
  if(t>6.1&&t<13.2){rise($('s3o'),t,6.4);$('s3x').style.width=(620*eo(p(t,7.2,.35)))+'px';
   const c=$('s3c');const k=eo(p(t,8.3,.45));c.style.opacity=k;c.style.transform=`translateY(${(1-k)*160}px)`;
   const d=$('s3d');d.style.color=t>12?'var(--tinta)':'';stamp($('s3st'),t,10.75,-6);if(t>10.75&&t<10.95)shake=10}
  // S4: barras
  if(t>12.8&&t<19.6){[...$('s4bars').children].forEach(r=>{const m=+r.dataset.m,a=+r.dataset.a,k=eo(p(t,a,m>9?1.1:.6));
    r.style.opacity=cl(p(t,a-.15,.2));r.querySelector('.bar').style.width=(20+460*m/30*k)+'px';
    r.querySelector('.num').innerHTML=m===30&&k>.98?'30 <span style="font-size:44px">(2,5 años)</span>':Math.round(m*k)})}
  // S5
  if(t>19.1&&t<22.6){pop($('s5a'),t,20.1,.3);paintNoise(NZ.s5,t,1);pop($('s5b'),t,20.95,.25,.2);pop($('s5c'),t,21.5,.3);if(t>20.95&&t<21.1)shake=8}
  // S6: registros vs. uso diario que se desploma
  if(t>22.2&&t<29.9){const k=cl((t-23.55)/.9);$('s6n').textContent=Math.max(1,Math.round(100*eo(k)))+' M';pop($('s6n'),t,23.5);rise($('s6l'),t,24.9);
   const c=$('s6c');const kc=eo(p(t,25.9,.4));c.style.opacity=kc;c.style.transform=`translateY(${(1-kc)*120}px)`;
   const P=$('s6p'),L=P.getTotalLength();P.style.strokeDasharray=L;P.style.strokeDashoffset=L*(1-cl((t-26.1)/2.6));paintNoise(NZ.s6,t,.35)}
  // S7: la estática se disuelve → dato limpio
  if(t>29.4&&t<38.9){const c=$('s7c');pop(c,t,29.7,.4,.85);
   const n=cl(1-(t-31.9)/2.2);NZ.s7.style.opacity=n;if(n>0)paintNoise(NZ.s7,t,.6);
   pop($('s7n'),t,35.5,.35,.5);rise($('s7a'),t,36.65);pop($('s7b'),t,37.6,.3,.6);if(t>35.5&&t<35.7)shake=8;
   if(t<35.5)$('s7n').style.opacity=0;
   const ko=$('s7o');ko.style.opacity=eo(p(t,33.9,.3))*(1-p(t,35.4,.15));ko.style.transform=`translateY(${(1-eo(p(t,33.9,.3)))*40}px)`}
  // S8
  if(t>38.5&&t<41.6){rise($('s8v'),t,38.85);stamp($('s8st'),t,39.7,-6);rise($('s8f'),t,40.5);if(t>39.7&&t<39.92)shake=14}
  // S9
  if(t>41.2&&t<44.6){pop($('si'),t,43.62,.3,.3);pop($('no'),t,43.95,.3,.3);
   const pl=t>44.1?.04*Math.sin(t*9):0;if(t>44.1){$('si').style.transform=`scale(${1+pl})`;$('no').style.transform=`scale(${1-pl})`}}
  // S10: RUIDO con estática que se apaga
  if(t>44.1){pop($('s10l'),t,44.5,.35,.8);paintNoise(NZ.s10,t,cl(1.2-(t-45)/1.2));NZ.s10.style.opacity=cl(1.2-(t-45)/1.2);rise($('s10t'),t,45.9)}
  return shake;
}
// En el cierre la marca grande ya dice el texto: sin subtítulos.
window.HIDE_SUBS=t=>t>44.35;
