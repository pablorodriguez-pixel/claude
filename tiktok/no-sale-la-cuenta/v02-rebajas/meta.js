// Vídeo 02 · −50 % y +50 % — "Subir lo que bajaste no te devuelve al principio"
exports.out='nsc-02-rebajas.mp4';exports.ep='CUENTA #02';
const Y='#FFE14D',R='#FF2D55',G='#7BE38B';
exports.scenes=(at,dur)=>[
 {type:'title',start:0,top:300,gap:0,tag:'Cuenta #02',lines:[
   {t:'−50 %',a:.05,s:230,c:R},{t:'+50 %',a:at('luego te lo suben'),s:230,c:G},
   {t:'¿Vuelves al precio<br>de antes?',a:at('Vuelves'),s:100,css:'margin-top:20px'}],
  stamp:{t:'No',x:400,y:960,s:230,a:at('No'),r:-8},sfx:[[at('No'),'hit',.9],[at('luego te lo suben'),'pop',.7]]},
 {type:'levels',start:at('Un movil'),title:'Un móvil de <span style="color:#FFE14D">1.000 €</span>',max:1000,suf:' €',ghostLabel:'1.000 €',
   steps:[{v:1000,a:at('Un movil'),c:'#F4F1EA'},{v:500,a:at('rebajado'),d:.7,c:R,chip:'−50 %'},{v:750,a:at('Subido'),d:.8,c:G,chip:'+50 %'}],
   gap:{a:at('doscientos cincuenta',0),t:'−250 €'},
   stamp:{t:'Robo: 0 €',x:90,y:800,s:96,a:at('nadie te ha robado'),c:G,r:-5},
   sfx:[[at('rebajado'),'pop',.8],[at('Subido'),'pop',.8],[at('doscientos cincuenta',0),'hit',.8],[at('nadie te ha robado'),'ding',.6]]},
 {type:'compare',start:at('Porque el cincuenta'),title:'¿Es el mismo 50 %?',neq:'≠',neqAt:at('de mil',1),
   cards:[{l1:'50 % de 500 €',l2:'= 250 €',c:R,a:at('de quinientos')},{l1:'50 % de 1.000 €',l2:'= 500 €',c:G,a:at('no es el')}],glow:'rgba(255,45,85,.1)',
   sfx:[[at('de mil',1),'hit',.8]]},
 {type:'levels',start:at('Para volver'),title:'Para volver a <span style="color:#7BE38B">1.000 €</span>',max:1000,suf:' €',ghostLabel:'1.000 €',
   steps:[{v:500,a:at('Para volver'),c:R},{v:1000,a:at('subirlo'),d:1.1,c:G,chip:'+100 %'}],
   stamp:{t:'Doble',x:130,y:820,s:140,a:at('cien por cien'),c:G,r:-6},sfx:[[at('cien por cien'),'hit',.8]]},
 {type:'levels',start:at('Y con tu dinero'),title:'Tu inversión',max:100,suf:' €',ghostLabel:'100 €',
   steps:[{v:100,a:at('Y con tu dinero'),c:'#F4F1EA'},{v:50,a:at('cae'),d:.7,c:R,chip:'−50 %'},{v:100,a:at('ganar un cien'),d:1.1,c:G,chip:'+100 %'}],
   stamp:{t:'Empate',x:130,y:820,s:140,a:at('empatar'),c:Y,r:-6},sfx:[[at('cae'),'pop',.8],[at('empatar'),'ding',.7]]},
 {type:'quiz',start:at('Pruebalo'),q:'Te bajan el sueldo<br>un <span style="color:#FFE14D">20 %</span>. ¿Cuánto<br>debe subir?',cA:at('Piensalo')-.2,cD:1.3,ansAt:at('Veinticinco'),ans:'25 %',wrong:'20 %',wrongAt:at('no veinte'),explain:'80 € + 25 % = 100 €',
   sfx:[[at('Piensalo')-.2,'tick',.6],[at('Piensalo')+.4,'tick',.6],[at('Piensalo')+1.0,'tick',.6],[at('Veinticinco'),'ding',.9],[at('no veinte'),'buzzer',.5]]},
 {type:'table',start:at('Cuanto mas caes'),title:'Cuanto más caes,<br><span style="color:#FF2D55">más tienes que subir</span>',
   rows:[{f:10,u:11,a:at('Cuanto mas caes')+.3},{f:20,u:25,a:at('Cuanto mas caes')+.7},{f:50,u:100,a:at('mas caes')+1.1},{f:80,u:400,a:at('mas caes')+1.5},{f:90,u:900,a:at('mas caes')+1.9}],glow:'rgba(255,45,85,.12)',
   sfx:[[at('mas caes')+1.9,'hit',.9]]},
 {type:'cta',start:at('Comenta tu'),title:'Comenta tu respuesta',hs:128,a:at('Comenta tu'),typeA:at('quiero ver'),typeD:1.1,text:'20 %. Fijo.',subA:at('falla'),sub:'↓ ¿Cuánta gente falla?',by:800,sfx:[[at('quiero ver'),'pop',.7]]},
 {type:'title',start:at('Porque si'),top:300,gap:0,lines:[
   {t:'−50 %',a:at('Porque si'),s:230,c:R},{t:'+50 %',a:at('suben',1),s:230,c:G},{t:'¿Vuelves al precio<br>de antes?',a:at('suben',1)+.5,s:100,css:'margin-top:20px'}],
  stamp:{t:'No',x:400,y:960,s:230,a:at('vuelves',1),r:-8},sfx:[[at('vuelves',1),'hit',.9]]}
];

{const base=exports.scenes;
 const X=[{bgfx:'rays'},{bgfx:'dots'},{bgfx:'bokeh',fx:'rgba(255,45,85,.12)'},{bgfx:'dots'},{bgfx:'dots'},{bgfx:'rays'},{bgfx:'bokeh',fx:'rgba(255,45,85,.12)'},{bgfx:'bokeh'},{bgfx:'rays'}];
 exports.scenes=(at,dur)=>{const sc=base(at,dur);sc.forEach((s,i)=>Object.assign(s,X[i]||{}));return sc};
 exports.inserts=at=>[
  {a:at('Has perdido'),d:.8,t:'−250 €',c:'#FF2D55',s:300,emoji:'💸'},
  {a:at('nadie'),d:.8,t:'ROBO: 0',c:'#7BE38B',s:230,emoji:'🤷'},
  {a:at('Pruebalo'),d:.7,t:'¡PRUÉBALO!',c:'#FFE14D',s:170,man:'smile'},
  {a:at('quiero ver'),d:.95,t:'¿QUÉ<br>PUSISTE?',c:'#FFE14D',s:180,man:'sweat'}]}

{const b2=exports.scenes;exports.scenes=(at,dur)=>{const sc=b2(at,dur);
 sc[1].macro=[{a:at('doscientos cincuenta',0),d:1.4,fx:780,fy:640}];sc[5].macro=[{a:at('Veinticinco'),d:1.4,fx:540,fy:760}];return sc}}

{const {host,actor}=require('../engine/cast');const b3=exports.scenes;exports.scenes=(at,dur)=>{const sc=b3(at,dur);
 const Y='#FFE14D',R='#FF2D55',G='#7BE38B',P='#F4F1EA';
 const cond=(t,s,c,css='')=>`<div class="cond" style="font-size:${s}px;color:${c};text-align:center;${css}">${t}</div>`;
 const st=sc[1].start,en=sc[1].end,tg=at('rebajado'),ts=at('Subido');
 // 0 · gancho: Palitos presenta
 sc[0].scale=.85;sc[0].actors=[host([{a:.05,b:'present',d:2.2},{a:2.3,b:'shock',d:1.5},{a:at('Vuelves'),b:'think',d:1.7},{a:at('No'),b:'shrug',face:'sweat'}],{x:200,sc:1.75,y:1000})];
 // 1 · tienda: cliente (lila) y tendero (calma)
 sc[1]={type:'diorama',start:st,end:en,ground:1150,bgfx:'dots',tag:'Black Friday',glow:'rgba(255,45,85,.08)',
  props:[{e:'📱',size:330,x:540,y:760,a:st,k:'pop'},
   {html:cond('1.000 €',200,P),x:540,y:470,a:st,k:'pop',texts:[{a:tg+.3,html:cond('500 €',200,R)},{a:ts+.6,html:cond('750 €',200,G)}]},
   {html:cond('−50 %',120,'#fff','background:#FF2D55;padding:0 26px;border-radius:20px'),x:250,y:620,a:tg,out:ts,k:'slam',r:-8},
   {html:cond('+50 %',120,'#0B0C10','background:#7BE38B;padding:0 26px;border-radius:20px'),x:830,y:620,a:ts,k:'slam',r:7},
   {html:cond('−250 €',190,R,'text-shadow:0 8px 40px #000'),x:540,y:1010,a:at('doscientos cincuenta',0),k:'slam',z:7},
   {e:'💸',size:200,x:540,y:760,a:at('doscientos cincuenta',0),out:at('porque el cincuenta'),k:'pop',tracks:[{a:at('doscientos cincuenta',0),d:1.2,x:930,y:430,r:25}],z:6},
   {html:`<div class="stamp" style="position:static;font-size:100px;border-color:${G};color:${G}">Robo: 0 €</div>`,x:540,y:640,a:at('nadie te ha robado'),k:'slam',z:7}],
  actors:[actor('lila',[190,964],[{a:st,b:'idle',face:'smile'},{a:tg,b:'celebrate'},{a:ts,b:'shock',d:1.4},{a:ts+1.6,b:'facepalm'},{a:at('Has perdido'),b:'angry'},{a:at('nadie te ha robado'),b:'shrug',face:'sweat'}],{sc:1.5}),
          actor('calma',[890,964],[{a:st,b:'present',face:'smile'},{a:ts,b:'celebrate'},{a:at('nadie te ha robado'),b:'wave'}],{sc:1.5,flip:-1})],
  macro:[{a:at('doscientos cincuenta',0),d:1.3,fx:540,fy:900}],
  sfx:[[tg,'pop',.8],[ts,'pop',.8],[at('doscientos cincuenta',0),'hit',.8],[at('nadie te ha robado'),'ding',.6]]};
 // 2..8 · Palitos explica
 sc[2].scale=.78;sc[2].actors=[host([{a:sc[2].start,b:'point',ang:120},{a:at('de mil',1),b:'shock'}],{x:170,sc:1.45,y:1050})];
 sc[3].scale=.72;sc[3].actors=[host([{a:sc[3].start,b:'think'},{a:at('subirlo'),b:'point',ang:60,face:'smile'}],{x:170,sc:1.4,y:1050})];
 sc[4].scale=.72;sc[4].actors=[host([{a:sc[4].start,b:'idle'},{a:at('cae'),b:'shock'},{a:at('ganar un cien'),b:'celebrate'}],{x:170,sc:1.4,y:1050})];
 sc[5].scale=.8;sc[5].actors=[host([{a:sc[5].start,b:'point',ang:120},{a:at('Piensalo')-.2,b:'think'},{a:at('Veinticinco'),b:'celebrate'},{a:at('no veinte'),b:'point',ang:50,face:'angry'}],{x:190,sc:1.55,y:1030})];
 sc[6].scale=.72;sc[6].actors=[host([{a:sc[6].start,b:'present'},{a:at('mas caes')+1.9,b:'shock'}],{x:170,sc:1.4,y:1050})];
 sc[7].scale=.8;sc[7].actors=[host([{a:sc[7].start,b:'point',ang:30},{a:at('quiero ver'),b:'hold',face:'smile'}],{x:190,sc:1.6,y:1015})];
 sc[8].scale=.85;sc[8].actors=[host([{a:sc[8].start,b:'present',d:2.2},{a:at('suben',1)+.5,b:'think'},{a:at('vuelves',1),b:'shrug',face:'sweat'}],{x:200,sc:1.75,y:1000})];
 return sc};
 function C0(){return '#0B0C10'}}
