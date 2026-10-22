const DEFS=`<defs>
 <radialGradient id="aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd59a" stop-opacity=".55"/><stop offset=".55" stop-color="#e8b062" stop-opacity=".18"/><stop offset="1" stop-color="#e8b062" stop-opacity="0"/></radialGradient>
 <radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf8a" stop-opacity=".5"/><stop offset="1" stop-color="#ffcf8a" stop-opacity="0"/></radialGradient>
 <linearGradient id="nightsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1322"/><stop offset="1" stop-color="#25304a"/></linearGradient>
 <linearGradient id="dawnsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6c27a"/><stop offset=".6" stop-color="#e88a5a"/><stop offset="1" stop-color="#8a5a7a"/></linearGradient>
 <clipPath id="winclip"><rect x="1000" y="320" width="380" height="500" rx="10"/></clipPath>
 <clipPath id="rwinclip"><path d="M700 300 a170 170 0 0 1 340 0 v520 h-340z"/></clipPath>
</defs>`;
function roomSVG(){
  let rain=''; for(let i=0;i<70;i++) rain+=`<path class="rd" d="M${1000+((i*53)%380)} ${320+((i*97)%500)} l-6 26" stroke="#9fb3d6" stroke-width="2"/>`;
  let city=''; for(let i=0;i<9;i++){const x=1000+i*44,h=120+((i*37)%140);city+=`<rect x="${x}" y="${820-h}" width="40" height="${h}" fill="#1a2236"/>`;for(let j=0;j<6;j++) if((i*7+j*3)%4) city+=`<rect x="${x+8+((j%2)*16)}" y="${820-h+16+Math.floor(j/2)*30}" width="8" height="10" fill="#f6c27a" opacity=".8"/>`;}
  return DEFS+`
  <rect x="-400" y="0" width="2400" height="1920" fill="#252c40"/>
  <rect id="dawnwall" x="-400" y="0" width="2400" height="1920" fill="#c98a62" opacity="0"/>
  <!-- ventana -->
  <g clip-path="url(#winclip)"><rect x="1000" y="320" width="380" height="500" fill="url(#nightsky)"/><rect id="dawnwin" x="1000" y="320" width="380" height="500" fill="url(#dawnsky)" opacity="0"/>
    <circle cx="1290" cy="420" r="34" fill="#f1e7c9" id="moon"/><circle id="sun" cx="1200" cy="760" r="70" fill="#ffe2a8" opacity="0"/>${city}<g id="rain">${rain}</g></g>
  <rect x="990" y="310" width="400" height="520" rx="14" fill="none" stroke="#3a4258" stroke-width="22"/><path d="M1190 320 v500 M1000 570 h380" stroke="#3a4258" stroke-width="14"/>
  <rect x="975" y="830" width="430" height="26" rx="6" fill="#3a4258" ${SW}/>
  <!-- póster y notas -->
  <g transform="translate(130,330) rotate(-3)"><rect width="260" height="330" fill="#d9cfb8" ${SW}/><path d="M20 290 L100 150 L150 220 L190 170 L240 290Z" fill="#7a8a8e" ${SW}/><circle cx="190" cy="90" r="30" fill="#e0a64d" ${SW}/></g>
  ${['ENTRENAR','LEER','PROYECTO'].map((n,i)=>`<g transform="translate(${1440+i*0},${380+i*120}) rotate(${[-4,3,-2][i]})"><rect width="230" height="96" fill="${['#f2d16b','#9fd3b8','#f2a68b'][i]}" ${SW}/><text x="115" y="62" text-anchor="middle" font-family="Patrick Hand SC" font-size="42" fill="${INK}">${n}</text><path id="x${i}" d="M14 50 h202" stroke="#a8402e" stroke-width="7" opacity="0"/></g>`).join('')}
  <!-- escritorio -->
  <rect x="1300" y="1150" width="440" height="34" rx="6" fill="#6b4f3a" ${SW}/><rect x="1330" y="1184" width="26" height="230" fill="#5a4231" ${SW}/><rect x="1690" y="1184" width="26" height="230" fill="#5a4231" ${SW}/>
  <path d="M1400 1150 l30 -150 h170 l-20 150z" fill="#3a4258" ${SW}/><rect x="1620" y="1080" width="90" height="70" fill="#a8402e" ${SW}/><rect x="1630" y="1040" width="80" height="40" fill="#2f6f6a" ${SW}/>
  <!-- suelo -->
  <rect x="-400" y="1400" width="2400" height="520" fill="#181c28"/>
  <ellipse cx="760" cy="1560" rx="520" ry="80" fill="#2a2f42"/>
  <!-- mesilla y lámpara -->
  <rect x="-60" y="1180" width="150" height="220" fill="#5a4231" ${SW}/><path d="M-20 1180 l20 -90 h40 l20 90z" fill="#e3c27a" ${SW}/><circle cx="20" cy="1100" r="160" fill="url(#lamp)" id="lampglow"/>
  <g id="nsphone" transform="translate(40,1170)"><rect x="-26" y="-14" width="52" height="16" rx="5" fill="#11131a" ${SW}/></g>
  <!-- cama -->
  <rect x="100" y="1240" width="700" height="170" rx="24" fill="#3b4a6b" ${SW}/><rect x="100" y="1205" width="700" height="70" rx="24" fill="#e3dccb" ${SW}/><rect x="110" y="1150" width="190" height="80" rx="34" fill="#f1ece0" ${SW}/>
  <path d="M380 1215 Q560 1180 790 1220 V1290 H380Z" fill="#4c5f86" ${SW}/>
  <g id="sparks"></g>
  ${alexSVG('ax')}
  ${marcoSVG('mx')}`;
}
function romeSVG(){
  return DEFS+`
  <rect x="0" y="0" width="1080" height="1920" fill="#3b2f28"/>
  <g clip-path="url(#rwinclip)"><rect x="700" y="130" width="340" height="700" fill="url(#dawnsky)"/><circle cx="870" cy="700" r="80" fill="#ffe2a8"/><path d="M700 720 Q800 660 900 700 T1040 690 V830 H700Z" fill="#6b5a6e"/></g>
  <path d="M700 300 a170 170 0 0 1 340 0 v520 h-340z" fill="none" stroke="#d8cfbd" stroke-width="22"/>
  ${[40,560].map(x=>`<rect x="${x}" y="260" width="80" height="1100" fill="#d8cfbd" ${SW}/><rect x="${x-14}" y="230" width="108" height="34" fill="#d8cfbd" ${SW}/><rect x="${x-14}" y="1356" width="108" height="34" fill="#d8cfbd" ${SW}/>`).join('')}
  <rect x="0" y="1390" width="1080" height="530" fill="#2a211c"/>
  <path d="M0 1390 h1080" stroke="#1d1f2a" stroke-width="5"/>
  <rect x="140" y="1220" width="640" height="180" rx="22" fill="#6a2f50" ${SW}/><rect x="140" y="1190" width="640" height="60" rx="22" fill="#e8dcc0" ${SW}/>
  <rect x="820" y="1180" width="200" height="30" fill="#6b4f3a" ${SW}/><rect x="840" y="1210" width="22" height="190" fill="#5a4231" ${SW}/><rect x="980" y="1210" width="22" height="190" fill="#5a4231" ${SW}/>
  <circle cx="930" cy="1150" r="16" fill="#ffcf8a"/><circle cx="930" cy="1150" r="120" fill="url(#lamp)"/>
  ${marcoSVG('mr',true,'#e8dcc0')}
  <g id="tablet"><rect x="-70" y="-50" width="140" height="100" rx="6" fill="#8a6a45" ${SW}/><rect x="-58" y="-38" width="116" height="76" fill="#3d2f22"/><path id="scrib" d="M-48 -20 h96 M-48 0 h80 M-48 20 h60" stroke="#e3c27a" stroke-width="4" stroke-dasharray="300" stroke-dashoffset="300"/></g>`;
}
