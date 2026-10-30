// Vuelca los t0 y la entrada de cada plano (para los efectos de sonido). Uso: node planos.js <ep>/build
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.argv[2]+'/video.html');await p.waitForFunction(()=>window.ready===true);
require('fs').writeFileSync(process.argv[2]+'/planos.json',await p.evaluate(()=>JSON.stringify(PLANOS.map(P=>[P.t0,P.entrada||'corte']))));await b.close()})();
