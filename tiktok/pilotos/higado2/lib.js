// ================= PALETA CLAY =================
const C={liver:['#EE9AA6','#D46A7C','#A93F55'],liverD:['#DB7483','#B5455A','#88293F'],kid:['#B8668A','#8C3B5E','#5E223C'],
 lemon:['#FFF4AE','#F6D33C','#D2A512'],green:['#C3EAA2','#7DBE5A','#4F8A33'],white:['#FFFFFF','#F6EFF0','#D9CBD0'],
 beer:['#FFE699','#F5B83A','#C77F15'],tea:['#F2C688','#C98A3A','#8F5A1C'],red:['#F27985','#D8405A','#9E2238'],
 violet:['#BBA2DE','#8A68B8','#5A3E8A'],metal:['#F1EEF2','#C9C2CB','#918895'],brown:['#DDA982','#B07650','#7A4C2E'],
 pink:['#EEC0F8','#D08EEB','#A35FC2'],blue:['#D4F1FC','#8FD3F4','#55A8D2'],mint:['#D5F0E9','#9FD3C7','#6CAA9B'],
 sky:['#D7E9FF','#8DB8F0','#5A86C4'],cape:['#8C80E6','#5045C8','#2F2976'],dark:['#6D5864','#4A3A43','#2C2027'],brain:['#FFD0DE','#F49AB8','#C9628A'],skin:['#FFE2CF','#F4BC9A','#C98868'],teal:['#9FF0E4','#2FC4B2','#16857A'],gold:['#FFF0B8','#FFC94A','#D98F12'],gray:['#E2DCDE','#B9AEB2','#7E7176'],nacho:['#FFE7A0','#F6B93B','#C97F12'],night:['#5B4FA8','#3A2E7E','#1F1650'],cream:['#FFFFFF','#FFF4E6','#E8D2BC']};
let defs='';
for(const k in C){const c=C[k];defs+=`<radialGradient id="g_${k}" cx="38%" cy="30%" r="78%" fx="34%" fy="24%"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`;}
defs+=`<radialGradient id="gIn" cx="50%" cy="44%" r="62%"><stop offset=".68" stop-color="#3a0012" stop-opacity="0"/><stop offset="1" stop-color="#3a0012" stop-opacity=".26"/></radialGradient>
<radialGradient id="gShine"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<radialGradient id="g_eye" cx="42%" cy="35%" r="70%"><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#E9DCE0"/></radialGradient>
<linearGradient id="g_glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".45" stop-color="#E4F5F8" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".85"/></linearGradient>
<linearGradient id="g_water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7CC" stop-opacity=".9"/><stop offset="1" stop-color="#F7E07E" stop-opacity=".85"/></linearGradient>
<linearGradient id="g_cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6C8" stop-opacity=".95"/><stop offset="1" stop-color="#FFF6C8" stop-opacity=".15"/></linearGradient>`;
document.getElementById('gdefs').innerHTML=defs;

// PRNG con semilla
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const clay=(tag,attrs,col,sw=2.5)=>`<${tag} ${attrs} fill="url(#g_${col})" stroke="${C[col][2]}" stroke-opacity=".45" stroke-width="${sw}"/><${tag} ${attrs} fill="url(#gIn)"/>`;
const shine=(cx,cy,rx,ry,rot=-25,o=.85)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="url(#gShine)" opacity="${o}"/>`;
function spots(seed,n,x0,y0,x1,y1,col,r0=3,r1=7){const R=rng(seed);let s='';for(let i=0;i<n;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),r=r0+R()*(r1-r0);s+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r*.6).toFixed(1)}" transform="rotate(${(R()*180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${i%2?C[col][2]:'#fff'}" opacity="${i%2?.13:.18}"/>`;}return s;}
const cap=(x,y,w,h,col)=>clay('rect',`x="${x}" y="${y}" width="${w}" height="${h}" rx="${w/2}"`,col);
let UID=0;
const $=(e,s)=>e.querySelector(s), $$=(e,s)=>[...e.querySelectorAll(s)];
const A=(n,v)=>n&&n.setAttribute('transform',v);
function box(w,h,z,html,parent,css={}){const e=el('div',parent||null,Object.assign({left:'0px',top:'0px',width:w+'px',height:h+'px',zIndex:z},css),html);e._w=w;e._h=h;return e;}
function put(e,cx,cy,o={}){if(o.o!=null&&o.o<=0.001){e.style.visibility='hidden';return;}set(e,Object.assign({o:1},o,{x:cx-e._w/2,y:cy-e._h/2}));if(e.parentNode.id!=='stage')e.style.visibility='inherit';}
const hide=e=>{e.style.visibility='hidden'};
const blinkF=(t,ph=0,per=3.3)=>{const k=((t+ph)%per+per)%per;return k<0.17?Math.sin(k/0.17*Math.PI):0;};
const bump=(t,t0,d)=>(t<t0||t>t0+d)?0:Math.sin((t-t0)/d*Math.PI);
function mouthAmt(t,who='HIGADO'){let lo=0,hi=W.length-1;while(lo<=hi){const m=(lo+hi)>>1;if(W[m].e<t)lo=m+1;else if(W[m].s>t)hi=m-1;else{const x=W[m];if(x.who&&x.who!==who)return 0;return .35+.65*Math.abs(Math.sin((t-x.s)*Math.PI*6.2));}}return 0;}
function track(keys,t){const v=Object.assign({},keys[0][1]);for(let i=1;i<keys.length;i++){const [kt,kv,d=.45,ez=E.inOutCubic]=keys[i];if(t<kt)break;const k=ez(clamp((t-kt)/d));for(const n in kv)v[n]=lerp(v[n]==null?kv[n]:v[n],kv[n],k);}return v;}
function pp(e,t,a,b,cx,cy,o={}){if(t<a-0.001||t>b){hide(e);return 0;}const k=pop(t,a,o.d||.45);const x=1-p(t,b-.2,.2,E.inCubic);
 put(e,cx+(o.dx||0)*(1-k),cy+(o.dy||0)*(1-k)-(1-x)*24,{s:(o.s||1)*k*(.75+.25*x),r:(o.r||0),o:Math.min(x,clamp((t-a)/.07))});return k;}
// ================= PERSONAJES =================
const BODY='M60 150 C40 80 120 40 210 48 C290 54 370 50 392 92 C410 128 360 160 300 190 C240 222 190 262 130 262 C80 262 64 210 60 150Z';
function armSvg(cls,px,py,fan){return `<g class="${cls}" transform="translate(${px} ${py})">${cap(-12,-8,24,64,'liver')}<g class="fore" transform="translate(0 48)">${cap(-11,-6,22,54,'liver')}${clay('circle','cx="0" cy="52" r="17"','liver')}${shine(-5,46,6,4,0,.7)}
 ${fan?`<g class="fan" opacity="0" transform="translate(0 52)"><path d="M0 0 L-56 66 A86 86 0 0 0 56 66 Z" fill="url(#g_pink)" stroke="#A35FC2" stroke-width="3"/>${[-40,-20,0,20,40].map(a=>`<line x1="0" y1="0" x2="${Math.sin(a*Math.PI/180)*84}" y2="${Math.cos(a*Math.PI/180)*84}" stroke="#A35FC2" stroke-width="3" opacity=".7"/>`).join('')}<circle r="7" fill="#7A3B92"/></g>`:''}</g></g>`;}
function Liver(parent,z=60){
 const u=UID++;const EY=[[160,122],[232,118]];
 const s=`<svg viewBox="0 0 420 380" width="420" height="380" style="overflow:visible">
 <defs><clipPath id="cut${u}"><rect class="cutr" x="-60" y="-400" width="540" height="900"/></clipPath><clipPath id="cutb${u}"><rect class="cutb" x="480" y="-60" width="300" height="500"/></clipPath>${EY.map((q,i)=>`<clipPath id="ec${u}_${i}"><ellipse cx="${q[0]}" cy="${q[1]}" rx="27" ry="31"/></clipPath>`).join('')}</defs>
 <ellipse cx="205" cy="346" rx="150" ry="16" fill="#5a1a2a" opacity=".16"/>
 <g class="cape" opacity="0"><path d="M120 96 C70 160 20 250 0 340 Q50 318 100 346 Q150 318 205 350 Q260 318 310 346 Q360 318 420 336 C390 240 345 150 300 86Z" fill="url(#g_cape)" stroke="#2F2976" stroke-opacity=".5" stroke-width="3"/><path d="M120 96 C70 160 20 250 0 340 Q50 318 100 346 Q150 318 205 350 Q260 318 310 346 Q360 318 420 336 C390 240 345 150 300 86Z" fill="url(#gIn)"/></g>
 <g class="legL" transform="translate(148 232)">${cap(-14,0,28,92,'liverD')}${clay('ellipse','cx="-8" cy="94" rx="32" ry="17"','liverD')}</g>
 <g class="legR" transform="translate(242 214)">${cap(-14,0,28,110,'liverD')}${clay('ellipse','cx="8" cy="112" rx="32" ry="17"','liverD')}</g>
 ${armSvg('armL',88,175,false)}${armSvg('armR',362,128,true)}
 <path class="cutline" clip-path="url(#cutb${u})" d="${BODY}" fill="#fff" fill-opacity=".35" stroke="#B5455A" stroke-width="5" stroke-dasharray="14 12"/><g class="bod" clip-path="url(#cut${u})">${clay('path',`d="${BODY}"`,'liver',3)}${spots(100+u,26,90,70,370,230,'liver',3,8)}<g class="scars" opacity="0">${[[104,206,30,20,-10],[300,104,34,22,15],[346,140,22,15,-20],[92,140,18,26,10],[250,220,32,18,5],[198,88,20,12,0]].map(([x,y,a,b,r])=>`<g transform="rotate(${r} ${x} ${y})"><path d="M${x-a} ${y} C${x-a} ${y-b} ${x-a*.2} ${y-b*1.2} ${x+a*.3} ${y-b} C${x+a} ${y-b*.7} ${x+a*1.1} ${y+b*.5} ${x+a*.4} ${y+b} C${x-a*.3} ${y+b*1.2} ${x-a} ${y+b*.7} ${x-a} ${y}Z" fill="#A79A9F" stroke="#7E7176" stroke-width="3"/><path d="M${x-a*.6} ${y} L${x+a*.6} ${y}" stroke="#6E6266" stroke-width="3"/>${[-.4,0,.4].map(k=>`<path d="M${x+a*k} ${y-6} L${x+a*k} ${y+6}" stroke="#6E6266" stroke-width="2.5"/>`).join("")}</g>`).join("")}</g>
 <path d="M292 60 C282 110 275 150 258 202" stroke="#9A3349" stroke-opacity=".28" stroke-width="7" fill="none" stroke-linecap="round"/>
 ${shine(118,92,48,20,-28)}${shine(336,80,20,9,10,.7)}
 <ellipse cx="118" cy="168" rx="22" ry="13" fill="#F7A0B0" opacity=".75"/><ellipse cx="276" cy="160" rx="20" ry="12" fill="#F7A0B0" opacity=".75"/>
 ${EY.map((q,i)=>`<ellipse cx="${q[0]}" cy="${q[1]}" rx="27" ry="31" fill="url(#g_eye)" stroke="#8A2D42" stroke-opacity=".35" stroke-width="2"/>
  <g class="pup${i}"><circle cx="${q[0]}" cy="${q[1]+3}" r="14" fill="#2A1218"/><circle cx="${q[0]-5}" cy="${q[1]-3}" r="5" fill="#fff"/></g>
  <rect class="lid${i}" clip-path="url(#ec${u}_${i})" x="${q[0]-32}" y="${q[1]-34}" width="64" height="0" fill="#DC7887"/>
  <g stroke="#2A1218" stroke-width="5" stroke-linecap="round">${i==0?`<line x1="${q[0]-20}" y1="${q[1]-22}" x2="${q[0]-33}" y2="${q[1]-33}"/><line x1="${q[0]-26}" y1="${q[1]-10}" x2="${q[0]-41}" y2="${q[1]-17}"/>`:`<line x1="${q[0]+20}" y1="${q[1]-22}" x2="${q[0]+33}" y2="${q[1]-33}"/><line x1="${q[0]+26}" y1="${q[1]-10}" x2="${q[0]+41}" y2="${q[1]-17}"/>`}</g>`).join('')}
 <g class="bags" opacity="0" stroke="#7A3466" stroke-width="6" fill="none" stroke-linecap="round"><path d="M138 160 Q160 172 182 160"/><path d="M212 156 Q234 168 256 156"/></g>
 <g class="browL"><path d="M136 80 Q160 66 186 78" stroke="#5E1A2E" stroke-width="9" fill="none" stroke-linecap="round"/></g>
 <g class="browR"><path d="M208 74 Q232 62 258 72" stroke="#5E1A2E" stroke-width="9" fill="none" stroke-linecap="round"/></g>
 <g class="mo" transform="translate(198 190)"><path class="mc" d="M-26 -4 Q0 16 26 -4" stroke="#5A1626" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g class="mop"><ellipse rx="25" ry="19" fill="#5A1626"/><ellipse cy="9" rx="14" ry="7" fill="#F27C8F"/></g></g>
 <g class="lamp" opacity="0"><path d="M202 40 L120 -150 L290 -150Z" fill="#FFF6C8" opacity=".55"/></g><g class="helmet" opacity="0"><circle cx="202" cy="44" r="13" fill="#fff" stroke="#B88E10" stroke-width="3"/><path d="M132 66 A70 56 0 0 1 272 66 Z" fill="url(#g_lemon)" stroke="#B88E10" stroke-width="3"/><rect x="116" y="58" width="172" height="17" rx="8.5" fill="url(#g_lemon)" stroke="#B88E10" stroke-width="3"/>${shine(170,36,22,8,-15)}</g>
 </g>
 <g class="sweat" opacity="0"><path d="M0 -18 C8 -4 12 4 12 10 A12 12 0 0 1 -12 10 C-12 4 -8 -4 0 -18Z" fill="url(#g_blue)"/><ellipse cx="-4" cy="6" rx="3" ry="5" fill="#fff" opacity=".8"/></g>
 <g class="sweat2" opacity="0"><path d="M0 -18 C8 -4 12 4 12 10 A12 12 0 0 1 -12 10 C-12 4 -8 -4 0 -18Z" fill="url(#g_blue)"/><ellipse cx="-4" cy="6" rx="3" ry="5" fill="#fff" opacity=".8"/></g>
 </svg>`;
 const e=box(420,380,z,s,parent);
 const n={lid:[$(e,'.lid0'),$(e,'.lid1')],pup:[$(e,'.pup0'),$(e,'.pup1')],bl:$(e,'.browL'),br:$(e,'.browR'),mo:$(e,'.mo'),mc:$(e,'.mc'),mop:$(e,'.mop'),
  aL:$(e,'.armL'),aR:$(e,'.armR'),fL:$(e,'.armL .fore'),fR:$(e,'.armR .fore'),fan:$(e,'.fan'),cape:$(e,'.cape'),helmet:$(e,'.helmet'),lamp:$(e,'.lamp'),scars:$(e,'.scars'),cutr:$(e,'.cutr'),cutb:$(e,'.cutb'),cutline:$(e,'.cutline'),bags:$(e,'.bags'),sw:$(e,'.sweat'),sw2:$(e,'.sweat2'),lL:$(e,'.legL'),lR:$(e,'.legR')};
 return {e,upd(t,st){
  put(e,st.x,st.y,{s:st.s==null?1:st.s,sx:st.sx,sy:st.sy,r:st.r||0,o:st.o==null?1:st.o});
  if(st.o!=null&&st.o<=0.001)return;
  const lid=Math.max(st.lid||0,blinkF(t,st.ph||0));n.lid.forEach(l=>l.setAttribute('height',(68*lid).toFixed(1)));
  n.pup.forEach(q=>A(q,`translate(${st.px||0} ${st.py||0})`));
  const ba=st.ba==null?-6:st.ba,bd=st.bd==null?-5:st.bd;A(n.bl,`rotate(${ba} 160 76) translate(0 ${bd})`);A(n.br,`rotate(${-ba} 232 72) translate(0 ${bd})`);
  let k=st.mouth!=null?st.mouth:(st.talk===false?0:mouthAmt(t));
  n.mop.style.display=k>0.08?'':'none';n.mc.style.display=k>0.08?'none':'';A(n.mop,`scale(${1+(st.mw||0)} ${Math.max(.15,k)})`);
  if(st.frown)n.mc.setAttribute('d','M-24 8 Q0 -10 24 8');else n.mc.setAttribute('d','M-26 -4 Q0 16 26 -4');
  const sway=wobble(t,.6,4,st.ph||0);
  A(n.aL,`translate(88 175) rotate(${(st.aL==null?32:st.aL)+sway})`);A(n.fL,`translate(0 48) rotate(${st.fL==null?8:st.fL})`);
  A(n.aR,`translate(362 128) rotate(${(st.aR==null?-32:st.aR)-sway})`);A(n.fR,`translate(0 48) rotate(${st.fR==null?-8:st.fR})`);
  n.fan.setAttribute('opacity',st.fan||0);A(n.fan,`translate(0 52) rotate(${Math.sin(t*16)*22})`);
  n.cape.setAttribute('opacity',st.cape||0);A(n.cape,`translate(205 110) rotate(${wobble(t,1.3,3)}) translate(-205 -110)`);
  n.helmet.setAttribute('opacity',st.helmet||0);n.lamp.setAttribute('opacity',(st.lamp||0)*(.8+.2*Math.sin(t*7)));n.scars.setAttribute('opacity',st.scar||0);{const c=st.cut||0,edge=300+(1-c)*140;n.cutr.setAttribute('width',(edge+60).toFixed(1));n.cutb.setAttribute('x',edge.toFixed(1));n.cutline.style.display=c>0.01?'':'none';}n.bags.setAttribute('opacity',st.bags||0);
  const sw=st.sweat||0;const f1=(t*1.1)%1,f2=(t*1.1+.5)%1;
  n.sw.setAttribute('opacity',sw*(1-f1));A(n.sw,`translate(352 ${50+f1*60})`);n.sw2.setAttribute('opacity',sw*(1-f2));A(n.sw2,`translate(84 ${70+f2*60}) scale(.8)`);
  const wk=st.walk?Math.sin(t*14)*14:0;A(n.lL,`translate(148 232) rotate(${wk})`);A(n.lR,`translate(242 214) rotate(${-wk})`);
 }};
}
function star(x,y,r,c){return `<path d="M${x} ${y-r} Q${x+r*.18} ${y-r*.18} ${x+r} ${y} Q${x+r*.18} ${y+r*.18} ${x} ${y+r} Q${x-r*.18} ${y+r*.18} ${x-r} ${y} Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z" fill="${c}"/>`;}
function Cana(parent,z=56,seed=1){
 const s=`<svg viewBox="0 0 180 320" width="180" height="320" style="overflow:visible"><ellipse cx="90" cy="310" rx="64" ry="9" fill="#5a1a2a" opacity=".15"/>
 <path d="M28 80 L152 80 L142 290 Q140 306 124 306 L56 306 Q40 306 38 290 Z" fill="url(#g_beer)" stroke="#C9A06A" stroke-width="4"/>
 <path d="M28 80 L152 80 L142 290 Q140 306 124 306 L56 306 Q40 306 38 290 Z" fill="url(#gIn)"/>
 <rect x="46" y="100" width="12" height="180" rx="6" fill="#fff" opacity=".55"/>
 ${[[110,270,4],[120,230,3],[64,250,3],[100,150,3]].map(b=>`<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="#FFF3C4" opacity=".9"/>`).join('')}
 ${[[44,80,22],[74,68,27],[106,66,28],[136,74,24],[154,90,15],[28,94,14],[92,90,22]].map(c=>clay('circle',`cx="${c[0]}" cy="${c[1]}" r="${c[2]}"`,'white',2)).join('')}
 <path d="M140 92 Q146 120 140 130 Q134 120 136 96Z" fill="#fff"/>${shine(70,58,16,7,-20)}
 <ellipse cx="66" cy="214" rx="11" ry="7" fill="#F28A7A" opacity=".7"/><ellipse cx="118" cy="214" rx="11" ry="7" fill="#F28A7A" opacity=".7"/>
 <ellipse cx="74" cy="186" rx="9" ry="12" fill="#2A1218"/><ellipse cx="110" cy="186" rx="9" ry="12" fill="#2A1218"/><circle cx="71" cy="181" r="3.5" fill="#fff"/><circle cx="107" cy="181" r="3.5" fill="#fff"/>
 <path d="M70 218 Q92 238 114 218" stroke="#2A1218" stroke-width="5" fill="#7A2236" stroke-linecap="round"/></svg>`;
 const e=box(180,320,z,s,parent);return {e,upd(t,st){put(e,st.x,st.y,{s:st.s,sx:st.sx,sy:st.sy,r:st.r||0,o:st.o==null?1:st.o});}};
}

const SOFA_SVG=(`<svg width="660" height="360" style="overflow:visible"><ellipse cx="330" cy="344" rx="300" ry="16" fill="#5a1a2a" opacity=".18"/>
 ${[90,570].map(x=>`<rect x="${x-12}" y="300" width="24" height="44" rx="8" fill="#7A4C2E"/>`).join('')}
 ${clay('rect','x="70" y="20" width="520" height="210" rx="70"','violet',3)}${clay('rect','x="40" y="180" width="580" height="130" rx="50"','violet',3)}
 ${clay('rect','x="0" y="120" width="110" height="200" rx="50"','violet',3)}${clay('rect','x="550" y="120" width="110" height="200" rx="50"','violet',3)}
 ${shine(170,60,70,18,-6,.6)}${spots(77,18,60,40,600,300,'violet',4,9)}${clay('rect','x="440" y="120" width="110" height="80" rx="30"','lemon')}</svg>`);
