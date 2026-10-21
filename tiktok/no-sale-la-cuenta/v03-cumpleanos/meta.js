// Vídeo 03 · Paradoja del cumpleaños — "23 personas, 50 %"
exports.out='nsc-03-cumpleanos.mp4';exports.ep='CUENTA #03';
const Y='#FFE14D',R='#FF2D55',G='#7BE38B';
exports.scenes=(at,dur)=>[
 {type:'field',start:0,title:'En un campo<br>de <span style="color:#FFE14D">fútbol</span>…',pA:at('veintidos'),pD:.045,rA:at('arbitro'),tag:'Cuenta #03',glow:'rgba(123,227,139,.08)',sfx:[[at('veintidos'),'tick',.5],[at('arbitro'),'pop',.8],[at('veintitres')+.1,'hit',.7]]},
 {type:'gauge',start:at('Y es mas probable'),label:'mismo cumpleaños',steps:[{n:23,pct:50.7,a:at('Y es mas probable')+.2,d:1.8}],
  stamp:{t:'Más que no',x:210,y:960,s:92,a:at('que no'),c:G},sfx:[[at('que no'),'hit',.8]]},
 {type:'title',start:at('Ya se lo que'),top:320,lines:[
   {t:'365<br>días',a:at('Ya se lo que'),s:200,c:Y,out:at('veintitres',1)},
   {t:'23<br>personas',a:at('veintitres',1),s:200,c:'#F4F1EA'}],
  stamp:{t:'¿Imposible?',x:150,y:900,s:130,a:at('Imposible'),r:-6},sfx:[[at('Imposible'),'buzzer',.6]]},
 {type:'pairs',start:at('Pero tu cerebro'),m1:at('compara a cada'),m1d:1.4,a2:at('se compara'),a2d:3.0,cA:at('doscientas cincuenta y tres',0)-.2,cD:1.6,oppA:at('oportunidades'),glow:'rgba(255,225,77,.08)',
   sfx:[[at('se compara'),'riser',.5],[at('doscientas cincuenta y tres',0),'hit',.8]]},
 {type:'gauge',start:at('Con treinta'),label:'mismo cumpleaños',steps:[{n:30,pct:70.6,a:at('Con treinta')+.1,d:1.4},{n:57,pct:99,a:at('Con cincuenta y siete'),d:1.3}],
  stamp:{t:'Casi seguro',x:190,y:960,s:100,a:at('noventa y nueve'),c:G},sfx:[[at('noventa y nueve'),'ding',.8]]},
 {type:'whatsapp',start:at('Mira ahora'),members:23,qA:at('coinciden'),q:'¿COINCIDEN?',
   msgs:[{who:'Tía Marta',c:'#E26AB6',t:'¡Felicidades, Lucía! 14 de marzo',a:at('grupo de whatsapp')},{who:'Primo Dani',c:'#53BDEB',t:'¡Felicidades, Pedro! 14 de marzo',a:at('de tu familia')},{who:'Tú',me:true,c:'#8696A0',t:'…espera, ¿otra vez?',a:at('A que hay')}],
   sfx:[[at('grupo de whatsapp'),'pop',.7],[at('de tu familia'),'pop',.7],[at('coinciden'),'hit',.8]]},
 {type:'cta',start:at('Compruebalo'),title:'Compruébalo y cuéntame',hs:118,a:at('Compruebalo'),typeA:at('cuantos erais')-.2,typeD:1.3,text:'Éramos 31. Coincidían 2',subA:at('erais'),sub:'↓ ¿Cuántos erais?',by:800,sfx:[[at('cuantos erais'),'pop',.7]]},
 {type:'field',start:at('veintitres',3),title:'23 personas.<br><span style="color:#FFE14D">¿Sí o no?</span>',pA:at('veintitres',3),pD:.02,rA:at('veintitres',3)+.5,glow:'rgba(123,227,139,.08)',tag:'Cuenta #03'}
];

{const base=exports.scenes;
 const X=[{bgfx:'bokeh',fx:'rgba(123,227,139,.12)'},{bgfx:'rays'},{bgfx:'dots'},{bgfx:'bokeh'},{bgfx:'rays',fx:'rgba(123,227,139,.11)'},{bgfx:'bokeh'},{bgfx:'bokeh'},{bgfx:'bokeh',fx:'rgba(123,227,139,.12)'}];
 exports.scenes=(at,dur)=>{const sc=base(at,dur);sc.forEach((s,i)=>Object.assign(s,X[i]||{}));return sc};
 exports.inserts=at=>[
  {a:at('futbol'),d:.7,t:'FÚTBOL',c:'#7BE38B',s:210,emoji:'⚽'},
  {a:at('arbitro'),d:.8,t:'+ UN ÁRBITRO',c:'#FF2D55',s:150,emoji:'🟥'},
  {a:at('todos con todos'),d:.95,t:'TODOS<br>CON TODOS',c:'#FFE14D',s:190},
  {a:at('whatsapp'),d:.8,t:'WHATSAPP',c:'#25D366',s:190,emoji:'💬'},
  {a:at('Compruebalo'),d:.85,t:'¡COMPRUÉBALO!',c:'#FFE14D',s:140,man:'smile'}]}

{const b2=exports.scenes;exports.scenes=(at,dur)=>{const sc=b2(at,dur);
 sc[1].macro=[{a:at('Y es mas probable')+.8,d:1.6,fx:540,fy:800}];sc[3].macro=[{a:at('doscientas cincuenta y tres',0)-.2,d:1.5,fx:540,fy:700}];return sc}}
