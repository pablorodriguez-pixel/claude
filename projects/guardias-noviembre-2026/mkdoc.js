const {Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
       AlignmentType, ShadingType, BorderStyle, PageOrientation, VerticalAlign,
       HeadingLevel, PageBreak} = require('docx');
const fs = require('fs');
const D = JSON.parse(fs.readFileSync('docdata.json','utf8'));

const INK='16242B', SOFT='53656D', LINE='CCD6D8';
const CW=2199, TW=CW*7;
const b=(sz)=>({style:BorderStyle.SINGLE,size:sz,color:LINE});
const cellBorders={top:b(4),bottom:b(4),left:b(4),right:b(4)};

function hdr(t){return new TableCell({width:{size:CW,type:WidthType.DXA},borders:cellBorders,
  shading:{type:ShadingType.CLEAR,fill:'E4E9EA'},margins:{top:60,bottom:60,left:80,right:80},
  children:[new Paragraph({alignment:AlignmentType.CENTER,children:[
    new TextRun({text:t.toUpperCase(),bold:true,size:15,color:SOFT,characterSpacing:20})]})]});}

function roleRun(k,who,prev){
  const col={TX:'95571C',UCQ:'585089',MAY:'1F6474',QX:'4A5A62'}[k];
  return new Paragraph({spacing:{before:8,after:0},children:[
    new TextRun({text:k.padEnd(4,' '),bold:true,size:13,color:col,font:'Consolas'}),
    new TextRun({text:' '+who,size:16,color:prev?SOFT:INK,italics:!!prev})]});}

function dayCell(c){
  let fill='FFFFFF';
  if(c.n>=6&&c.n<=9) fill='F8E6E9';
  else if(c.dow==='sáb'||c.dow==='dom') fill='F1F4F5';
  if(c.prev) fill='EDEFF0';
  const head=[new TextRun({text:String(c.n),bold:true,size:20,color:INK}),
              new TextRun({text:'  '+c.dow,size:13,color:SOFT})];
  if(c.tag) head.push(new TextRun({text:'   '+c.tag,size:11,bold:true,
    color:(c.n>=6&&c.n<=9)?'9C2C43':SOFT}));
  const kids=[new Paragraph({spacing:{after:30},children:head})];
  c.roles.forEach(r=>kids.push(roleRun(r[0],r[1],c.prev)));
  if(c.prev) kids.push(new Paragraph({spacing:{before:40},children:[
    new TextRun({text:'de octubre',size:11,italics:true,color:SOFT})]}));
  return new TableCell({width:{size:CW,type:WidthType.DXA},borders:cellBorders,
    shading:{type:ShadingType.CLEAR,fill},margins:{top:70,bottom:70,left:90,right:90},
    verticalAlign:VerticalAlign.TOP,children:kids});}

function blank(){return new TableCell({width:{size:CW,type:WidthType.DXA},borders:cellBorders,
  shading:{type:ShadingType.CLEAR,fill:'F1F4F5'},children:[new Paragraph('')]});}

// rejilla: 1-nov-2026 es domingo -> la primera fila lleva 6 huecos
const grid=[]; let row=[]; for(let i=0;i<6;i++) row.push(blank());
D.cells.forEach(c=>{row.push(dayCell(c)); if(row.length===7){grid.push(new TableRow({children:row})); row=[];}});
while(row.length&&row.length<7) row.push(blank());
if(row.length) grid.push(new TableRow({children:row}));

const cal=new Table({width:{size:TW,type:WidthType.DXA},columnWidths:Array(7).fill(CW),
  rows:[new TableRow({tableHeader:true,children:['lunes','martes','miércoles','jueves','viernes','sábado','domingo'].map(hdr)}),...grid]});

// ---- tablas resumen ----
function simple(head,rows,widths,total){
  const hc=head.map((t,i)=>new TableCell({width:{size:widths[i],type:WidthType.DXA},borders:cellBorders,
    shading:{type:ShadingType.CLEAR,fill:'E4E9EA'},margins:{top:60,bottom:60,left:100,right:100},
    children:[new Paragraph({alignment:i?AlignmentType.CENTER:AlignmentType.LEFT,children:[
      new TextRun({text:t.toUpperCase(),bold:true,size:15,color:SOFT})]})]}));
  const rr=rows.map(r=>new TableRow({children:r.map((v,i)=>new TableCell({
    width:{size:widths[i],type:WidthType.DXA},borders:cellBorders,
    margins:{top:50,bottom:50,left:100,right:100},
    children:[new Paragraph({alignment:i?AlignmentType.CENTER:AlignmentType.LEFT,children:[
      new TextRun({text:String(v),size:18,bold:i===1&&r.length===6})]})]}))}));
  return new Table({width:{size:total,type:WidthType.DXA},columnWidths:widths,
    rows:[new TableRow({tableHeader:true,children:hc}),...rr]});}

const RW=[900,2600,1600,1400,1900,2200], RT=RW.reduce((a,c)=>a+c,0);
const AW=[2000,1600,1100,1700,1600,1100,1700], AT=AW.reduce((a,c)=>a+c,0);

const doc=new Document({sections:[{
  properties:{page:{size:{width:11906,height:16838,orientation:PageOrientation.LANDSCAPE},
                    margin:{top:720,bottom:720,left:720,right:720}}},
  children:[
    new Paragraph({spacing:{after:60},children:[new TextRun({text:'PROGRAMACIÓN DE RESIDENTES',
      bold:true,size:16,color:'1F6474',characterSpacing:40})]}),
    new Paragraph({spacing:{after:100},children:[new TextRun({text:'Guardias · Noviembre 2026',
      bold:true,size:40,color:INK})]}),
    new Paragraph({spacing:{after:240},border:{bottom:{style:BorderStyle.SINGLE,size:12,color:INK}},
      children:[new TextRun({text:'26 residentes · 5 puestos al día · 140 puestos · 0 conflictos.  '+
      'TX trasplante (localizada, solo R4) · UCQ unidad de cirugía (rotantes y R2) · '+
      'MAY residente mayor (R3 o R4) · QX quirófano.',size:17,color:SOFT})]}),
    cal,
    new Paragraph({spacing:{before:160},children:[new TextRun({size:16,color:SOFT,
      text:'Rojo: fiesta del 6 y puente del 7 al 9.  V+D: el viernes y el domingo los hace el mismo equipo.  '+
           'S: el sábado, equipo distinto; el 7 repite el lunes 9 festivo.  '+
           'Los días 1 y 2 vienen del cuadrante de octubre.'})]}),
    new Paragraph({children:[new PageBreak()]}),
    new Paragraph({spacing:{after:120},children:[new TextRun({text:'Resumen por residente',bold:true,size:30,color:INK})]}),
    new Paragraph({spacing:{after:180},children:[new TextRun({size:17,color:SOFT,
      text:'«Findes» es el número de fines de semana con guardia presencial. Los findes de localizada se cuentan en días de viernes, sábado o domingo.'})]}),
    simple(['','Residente','Guardias','Findes','Localizadas','Findes localiz.'],D.resumen,RW,RT),
    new Paragraph({spacing:{before:340,after:120},children:[new TextRun({text:'Acumulado de localizadas desde junio',bold:true,size:30,color:INK})]}),
    simple(['R4','Jun-oct','Nov','Total','Findes jun-oct','Nov','Findes total'],D.acum,AW,AT),
    new Paragraph({spacing:{before:200},children:[new TextRun({size:17,color:SOFT,
      text:'El abanico de localizadas se cierra de 23-38 a 30-40, y el de findes de 9-18 a 12-19. '+
           'Gerard queda fuera del reparto de noviembre y sigue siendo el que menos acumula.'})]}),
  ]}]});

Packer.toBuffer(doc).then(buf=>{fs.writeFileSync('Guardias_Noviembre_2026.docx',buf);
  console.log('ok', buf.length, 'bytes');});
