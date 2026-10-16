const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1080,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+__dirname+'/logo.html');await p.waitForFunction(()=>window.ready);await p.waitForTimeout(300);
for(const id of ['A','A2','B','C']){await (await p.$('#'+id)).screenshot({path:__dirname+`/logo_${id}.png`,omitBackground:true});}
console.log(errs.join('\n')||'ok');await b.close();})();
