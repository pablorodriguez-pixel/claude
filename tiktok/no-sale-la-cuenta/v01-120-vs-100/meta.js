// Vídeo 01 · 120 vs 100 — protagonizado por PRISA (amarillo), CALMA (azul), PACO (verde) y PALITOS (presentador)
const {host,actor}=require('../engine/cast');
const Y='#FFE14D',R='#FF2D55',G='#7BE38B',P='#F4F1EA';
exports.out='nsc-01-120-vs-100.mp4';exports.ep='CUENTA #01';
const cond=(t,s,c,css='')=>`<div class="cond" style="font-size:${s}px;color:${c};text-align:center;${css}">${t}</div>`;
const lane=(y)=>({html:`<div style="width:1080px;height:250px;background:#14151a;border-top:3px solid #2a2b33;border-bottom:3px solid #2a2b33"><div style="margin-top:118px;height:9px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 60px,transparent 60px 130px)"></div></div>`,x:540,y,a:0,z:1});
const raceScene=(start,t0,tGap,sfx)=>({type:'diorama',start,ground:1160,tag:'Cuenta #01',glow:'rgba(255,225,77,.1)',bgfx:'road',
  props:[
   {html:cond(`<span style="color:${Y}">120</span> <span style="font-size:80px;color:#9a9aa5">vs</span> 100`,200,P),x:540,y:420,a:start},
   {html:cond('km/h · viaje de <span style="color:'+Y+'">30 km</span>',60,'#cfcfd6'),x:540,y:575,a:start},
   lane(740),lane(1020),
   {e:'🏁',size:150,x:985,y:740,a:start,z:2},{e:'🏁',size:150,x:985,y:1020,a:start,z:2},
   {car:{color:Y,label:'120',driver:{look:'prisa',acts:[{a:start,b:'drive',face:'angry'},{a:tGap,b:'drive',face:'shock'}]}},s:2.1,x:150,y:735,a:start,vib:[t0,t0+3.7],lights:[[t0+3.5,t0+4]],tracks:[{a:t0,d:3.7,x:790,e:'out'}]},
   {car:{color:P,label:'100',driver:{look:'calma',acts:[{a:start,b:'drive',face:'smile'}]}},s:2.1,x:150,y:1015,a:start,vib:[t0,t0+4.6],tracks:[{a:t0,d:4.6,x:790,e:'out'}]},
   {html:cond('+3 MIN',170,Y,'text-shadow:0 0 50px rgba(255,225,77,.5)'),x:540,y:1170,a:tGap,k:'slam',z:6}],
  macro:[{a:tGap,d:1.3,fx:540,fy:1170}],sfx});
exports.scenes=(at,dur)=>{
 const tg=at('tres minutos');
 const brakeScene=(start,hit)=>{
  const car=hit?{color:Y,label:'120',driver:{look:'prisa',acts:[{a:start,b:'drive',face:'angry'},{a:18.2,b:'drive',face:'shock'}]}}:{color:P,label:'100',driver:{look:'calma',acts:[{a:start,b:'drive',face:'smile'},{a:12.3,b:'drive',face:'shock'},{a:15.9,b:'drive',face:'smile'}]}};
  const tr=hit?[{a:16.9,d:1.0,x:330,e:'lin'},{a:17.9,d:.86,x:679,e:'lin'}]:[{a:10.2,d:3.2,x:432,e:'lin'},{a:13.4,d:2.5,x:670,e:'q'}];
  return {type:'diorama',start,ground:1010,road:[170,40],glow:hit?'rgba(255,45,85,.14)':undefined,red:hit,bgfx:'road',tag:hit?'Misma frenada':'Frenada de emergencia',src:'Asfalto seco · 1 s de reacción · frenada 7 m/s²',
   props:[
    {html:cond(hit?'120<span style="font-size:60px"> km/h</span>':'100<span style="font-size:60px"> km/h</span>',170,hit?Y:P,'text-align:left'),x:300,y:360,a:start},
    ...(hit?[{html:cond('73 km/h',230,R,'text-shadow:0 10px 50px #000'),x:540,y:590,a:18.76,k:'slam',z:6},{e:'💥',size:260,x:790,y:900,a:18.76,out:20.3,k:'pop',z:6}]
        :[{html:cond('83 m',220,Y),x:620,y:610,a:10.9,k:'pop',size:220,texts:[{a:15.9,html:'<span style="color:#7BE38B;font-size:250px">0 m</span>'}]}]),
    {car,s:1.7,x:hit?-150:-137,y:915,a:start,lights:hit?[[17.9,18.8]]:[[13.4,15.95]],vib:hit?[16.9,18.76]:[10.2,13.4],tracks:tr}],
   actors:[actor('verde',[1200,hit?790:790],hit
     ?[{a:start,b:'shrug',from:[900,790],to:[900,790],face:'sweat'},{a:18.76,b:'fly',d:1.4,dx:420,h:380,spin:900}]
     :[{a:11.6,b:'walk',from:[1200,790],to:[900,790],d:.75},{a:12.35,b:'shock',d:1.2},{a:13.6,b:'shrug',face:'sweat'},{a:15.9,b:'celebrate'}],{sc:1.4})],
   macro:hit?[{a:18.7,d:1.5,fx:540,fy:560}]:[],
   sfx:hit?[[18.76,'crash',1]]:[[16.1,'ding',.7]]}};
 const tower=(()=>{const fl=7,fh=96,bx=270;const rows=[...Array(fl)].map((_,i)=>`<div style="height:${fh}px;border:3px solid #2c2d36;background:#16171d;position:relative"><span class="cond" style="position:absolute;left:14px;top:22px;font-size:44px;color:rgba(244,241,234,.35)">${fl-i}</span><i style="position:absolute;left:100px;top:22px;width:70px;height:52px;border-radius:8px;background:${(i*3)%4==0?'rgba(255,225,77,.55)':'rgba(255,255,255,.07)'}"></i><i style="position:absolute;left:220px;top:22px;width:70px;height:52px;border-radius:8px;background:rgba(255,255,255,.07)"></i></div>`).join('');
  return {type:'diorama',start:at('Es como'),ground:1130,glow:'rgba(255,45,85,.12)',red:true,bgfx:'dots',tag:'Equivale a…',src:'73 km/h ≈ caída libre desde 21 m',
   props:[{html:`<div style="width:360px">${rows}</div>`,x:bx,y:1130-fl*fh/2,a:at('Es como'),z:2},
    {html:cond('7',420,Y),x:790,y:560,a:at('septimo'),k:'slam'},{html:cond('pisos',90,P),x:790,y:760,a:at('septimo')+.1,k:'rise'},
    {html:`<div class="stamp" style="position:static;font-size:120px">Game over</div>`,x:540,y:1010,a:at('ganar tres'),k:'slam',z:7}],
   actors:[actor('verde',[bx,1130-fl*fh-125*1.15],[{a:at('Es como'),b:'shrug',face:'sweat'},{a:at('tirarte')+.05,b:'fall',d:1.0,from:[bx,1130-fl*fh-145],to:[bx,1130-145],mv:'acc',spin:360},{a:at('tirarte')+1.05,b:'lie',from:[bx+30,1100],to:[bx+30,1100],face:'dead'}],{sc:1.15})],
   sfx:[[at('tirarte')+.05,'scream',.8],[at('tirarte')+1.1,'hit',.9]]}})();
 return [
  raceScene(0,.15,tg,[[tg,'hit',.9],[.15,'riser',.35]]),
  {type:'netflix',start:at('tres menos'),a:6.4,d:2.5,scale:.8,tag:'3 minutos son…',bgfx:'bokeh',fx:'rgba(229,9,20,.12)',
   actors:[actor('verde',[300,1050],[{a:6.3,b:'think',face:'sweat'},{a:7.6,b:'shrug',face:'sweat'},{a:8.9,b:'facepalm'}],{sc:1.5})],sfx:[[6.5,'tick',.5],[7.1,'tick',.5],[7.7,'tick',.5],[8.3,'tick',.5]]},
  brakeScene(at('Ahora'),false),
  brakeScene(at('El de 120'),true),
  tower,
  {type:'title',start:at('Y no es una excepcion'),top:320,scale:.85,bgfx:'rays',lines:[
    {t:'No es una<br>excepción',a:at('Y no es una excepcion'),s:120,out:at('cuanto mas')},
    {t:'Es matemática',a:at('es matematica'),s:120,c:Y,out:at('cuanto mas')},
    {t:'Cuanto más<br>rápido vas…',a:at('cuanto mas'),s:120,css:'margin-top:-270px'},
    {t:'menos ganas',a:at('menos ganas'),s:180,c:R}],
   actors:[host([{a:at('Y no es una excepcion'),b:'present',d:2.2},{a:at('cuanto mas'),b:'point',ang:130},{a:at('menos ganas'),b:'shrug',face:'sweat'}],{x:200,sc:1.75,y:1000})],sfx:[[at('es matematica'),'pop',.8]]},
  {type:'bars',start:at('En 100 kilometros'),scale:.72,bgfx:'dots',title:'Viaje de 100 km<br><span style="color:#FFE14D">minutos que ahorras</span>',ts:70,
   bars:[{l:'de 100<br>a 120 km/h',v:10,h:.85,c:G,a:at('pasar de'),pre:'−',suf:' min',fs:110},{l:'de 120<br>a 140 km/h',v:7,h:.6,c:'#FF7A4D',a:at('120 a 140'),pre:'−',suf:' min',fs:110}],
   actors:[host([{a:at('En 100 kilometros'),b:'idle'},{a:at('pasar de'),b:'point',ang:100,face:'smile'},{a:at('120 a 140'),b:'shrug',face:'sweat'}],{x:150,sc:1.35,y:1048})]},
  {type:'bars',start:at('Y la energia'),scale:.72,bgfx:'rays',fx:'rgba(255,45,85,.12)',glow:'rgba(255,45,85,.14)',title:'Energía del golpe<br><span style="color:#FF2D55">(100 km/h = 100 %)</span>',ts:70,
   bars:[{l:'100<br>km/h',v:100,h:.44,c:P,a:at('Y la energia')+.1,suf:' %',fs:76},{l:'120<br>km/h',v:144,h:.64,c:'#FF7A4D',a:at('Y la energia')+.45,suf:' %',fs:76},{l:'140<br>km/h',v:196,h:.86,c:R,a:at('Y la energia')+.8,suf:' %',fs:76}],
   stamp:{t:'×2',x:660,y:380,s:200,a:at('casi se duplica'),c:R},
   actors:[host([{a:at('Y la energia'),b:'idle'},{a:at('casi se duplica'),b:'shock'}],{x:150,sc:1.35,y:1048})],sfx:[[at('casi se duplica'),'hit',.8]]},
  {type:'title',start:at('Cada vez'),top:330,scale:.85,bgfx:'rays',lines:[
    {t:'Ganas menos <span style="color:#7BE38B">↓</span>',a:at('Cada vez'),s:130},
    {t:'Arriesgas más <span style="color:#FF2D55">↑</span>',a:at('arriesgas'),s:130,c:Y}],
   actors:[host([{a:at('Cada vez'),b:'point',ang:20,face:'smile'},{a:at('arriesgas'),b:'point',ang:160,face:'sweat'}],{x:200,sc:1.75,y:1000})],sfx:[[at('arriesgas'),'pop',.8]]},
  {type:'cta',start:at('Asi que dime'),scale:.8,bgfx:'bokeh',title:'¿Cuántos minutos valen tu vida?',hs:112,a:at('Asi que dime'),typeA:at('Te leo'),typeD:1.3,text:'Ninguno. ¿Y tú?',subA:at('comentarios'),sub:'↓ Te leo en comentarios',by:820,
   actors:[host([{a:at('Asi que dime'),b:'think'},{a:at('Te leo'),b:'hold',face:'smile'}],{x:190,sc:1.6,y:1015})],sfx:[[at('Te leo'),'pop',.7]]},
  {type:'finale',start:at('Estas cuentas'),a0:at('Estas cuentas'),aF:at('Sigue la cuenta'),aT:at('entra en el 1'),pre:'Estas cuentas se te escapan cada día',bgfx:'rays',fx:'rgba(255,225,77,.2)',glow:'rgba(255,225,77,.16)',
   macro:[{a:at('entra en el 1')+1.45,d:1.5,fx:540,fy:830,s:[1.04,1.2]}],
   actors:[host([{a:at('Estas cuentas'),b:'shrug',face:'sweat'},{a:at('Sigue la cuenta'),b:'point',ang:70,face:'smile'},{a:at('entra en el 1')+1.5,b:'celebrate'}],{x:90,sc:.95,y:1118}),
     actor('calma',[185,1118],[{a:at('Sigue la cuenta')+.3,b:'idle',face:'smile'},{a:at('entra en el 1')+1.6,b:'celebrate'}],{sc:.95}),
     actor('lila',[895,1118],[{a:at('Sigue la cuenta')+.3,b:'idle',face:'smile'},{a:at('entra en el 1')+1.6,b:'celebrate'}],{sc:.95,flip:-1}),
     actor('prisa',[990,1118],[{a:at('Sigue la cuenta')+.3,b:'idle',face:'smile'},{a:at('entra en el 1')+1.5,b:'celebrate'}],{sc:.95,flip:-1})],
   sfx:[[at('Sigue la cuenta'),'hit',.9],[at('Sigue la cuenta')+1.15,'ding',.8],[at('entra en el 1')-.4,'riser',.6],[at('entra en el 1')+1.5,'hit',1],[at('entra en el 1')+1.55,'ding',.9]]}
 ];
};
exports.inserts=at=>[
  {a:at('Netflix'),d:.75,t:'NETFLIX',c:'#E50914',s:210,emoji:'🍿'},
  {a:at('algo'),d:.7,t:'¿¿QUÉ??',c:Y,s:200,man:'shock'},
  {a:at('frenais'),d:.6,t:'¡FRENA!',c:R,s:240,emoji:'🛑'},
  {a:at('le pega'),d:.8,t:'¡PUM!',c:R,s:330,emoji:'💥'},
  {a:at('septimo piso'),d:.85,t:'7º PISO',c:R,s:220,emoji:'🏢'},
  {a:at('vida'),d:.8,t:'TU VIDA',c:Y,s:200,emoji:'⏳'}];
