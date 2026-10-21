// Vídeo 01 · 120 vs 100 — "¿Cuánto tiempo ganas de verdad?"
const P='rgba(244,241,234,1)';
exports.out='nsc-01-120-vs-100.mp4';exports.ep='CUENTA #01';
exports.scenes=(at,dur)=>[
 {type:'race',start:0,t0:.2,dist:30,dur:[4.7,3.92],gapAt:at('tres minutos'),gapText:'+3 MIN',lanes:[{v:100,color:'#F4F1EA'},{v:120,color:'#FFE14D'}],tag:'Cuenta #01',sfx:[[at('tres minutos'),'hit',.9],[.15,'riser',.35]]},
 {type:'netflix',start:at('tres menos'),a:6.4,d:2.5,tag:'3 minutos son…',sfx:[[6.5,'tick',.5],[7.1,'tick',.5],[7.7,'tick',.5],[8.3,'tick',.5]]},
 {type:'brake',start:at('Ahora'),v:100,color:'#F4F1EA',D:83,tA:12.4,warp:1.35,tag:'Frenada de emergencia',src:'Asfalto seco · 1 s de reacción · frenada 7 m/s²',sfx:[[16.1,'ding',.7]]},
 {type:'brake',start:at('El de 120'),v:120,color:'#FFE14D',D:83,tA:17.05,warp:1.666,glow:'rgba(255,45,85,.14)',red:true,tag:'Misma frenada',src:'Asfalto seco · 1 s de reacción · frenada 7 m/s²',sfx:[[18.76,'crash',1]]},
 {type:'tower',start:at('Es como'),fallAt:at('tirarte')+.05,goAt:at('ganar tres'),glow:'rgba(255,45,85,.12)',tag:'Equivale a…',src:'73 km/h ≈ caída libre desde 21 m',sfx:[[at('tirarte')+.05,'scream',.8],[at('tirarte')+1.1,'hit',.9]]},
 {type:'title',start:at('Y no es una excepcion'),top:340,lines:[
   {t:'No es una<br>excepción',a:at('Y no es una excepcion'),s:130,out:at('cuanto mas')},
   {t:'Es matemática',a:at('es matematica'),s:130,c:'#FFE14D',out:at('cuanto mas')},
   {t:'Cuanto más<br>rápido vas…',a:at('cuanto mas'),s:130,css:'margin-top:-300px'},
   {t:'menos ganas',a:at('menos ganas'),s:190,c:'#FF2D55'}],sfx:[[at('es matematica'),'pop',.8]]},
 {type:'bars',start:at('En 100 kilometros'),title:'Viaje de 100 km<br><span style="color:#FFE14D">minutos que ahorras</span>',ts:70,
   bars:[{l:'de 100<br>a 120 km/h',v:10,h:.85,c:'#7BE38B',a:at('pasar de'),pre:'−',suf:' min',fs:110},{l:'de 120<br>a 140 km/h',v:7,h:.6,c:'#FF7A4D',a:at('120 a 140'),pre:'−',suf:' min',fs:110}]},
 {type:'bars',start:at('Y la energia'),title:'Energía del golpe<br><span style="color:#FF2D55">(100 km/h = 100 %)</span>',ts:70,glow:'rgba(255,45,85,.14)',
   bars:[{l:'100<br>km/h',v:100,h:.44,c:'#F4F1EA',a:at('Y la energia')+.1,suf:' %',fs:76},{l:'120<br>km/h',v:144,h:.64,c:'#FF7A4D',a:at('Y la energia')+.45,suf:' %',fs:76},{l:'140<br>km/h',v:196,h:.86,c:'#FF2D55',a:at('Y la energia')+.8,suf:' %',fs:76}],
   stamp:{t:'×2',x:660,y:380,s:200,a:at('casi se duplica'),c:'#FF2D55'},sfx:[[at('casi se duplica'),'hit',.8]]},
 {type:'title',start:at('Cada vez'),top:420,lines:[
   {t:'Ganas menos <span style="color:#7BE38B">↓</span>',a:at('Cada vez'),s:130,c:'#F4F1EA'},
   {t:'Arriesgas más <span style="color:#FF2D55">↑</span>',a:at('arriesgas'),s:130,c:'#FFE14D'}],sfx:[[at('arriesgas'),'pop',.8]]},
 {type:'cta',start:at('Asi que dime'),title:'¿Cuántos minutos valen tu vida?',hs:112,a:at('Asi que dime'),typeA:at('Te leo'),typeD:1.3,text:'Ninguno. ¿Y tú?',subA:at('comentarios'),sub:'↓ Te leo en comentarios',by:820,sfx:[[at('Te leo'),'pop',.7]]},
 {type:'race',start:at('Porque ir'),t0:at('Porque ir')+.2,dist:30,dur:[2.4,2.0],gapAt:at('tres minutos',2),gapText:'+3 MIN',lanes:[{v:100,color:'#F4F1EA'},{v:120,color:'#FFE14D'}],tag:'Cuenta #01',sfx:[[at('tres minutos',2),'hit',.9]]}
];
