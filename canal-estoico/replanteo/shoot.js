// Captura cada frames/<id>.html a frames/<id>.png
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 const ids=process.argv.slice(2).length?process.argv.slice(2):fs.readdirSync(__dirname+'/frames').filter(f=>f.endsWith('.html')).map(f=>f.slice(0,-5));
 for(const id of ids){await pg.goto('file://'+__dirname+'/frames/'+id+'.html');await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(150);
   await pg.screenshot({path:__dirname+'/frames/'+id+'.png'});}
 await b.close();})();
