// uso: node rchunk.js <dir> <desde> <hasta>  -> <dir>/rev/frames/f_00000.jpg ... (salta los ya hechos)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const dir=process.argv[2],a=+process.argv[3],b=+process.argv[4];
 const b0=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const pg=await b0.newPage({viewport:{width:1080,height:1920}});
 await pg.goto('file://'+dir+'/index.html');await pg.waitForFunction(()=>window.ready===true,{timeout:60000});await pg.waitForTimeout(300);
 fs.writeFileSync(dir+'/sfx.json',JSON.stringify(await pg.evaluate(()=>window.SFX)));
 const D=await pg.evaluate(()=>window.DURATION),N=Math.ceil(D*30);fs.mkdirSync(dir+'/rev/frames',{recursive:true});
 for(let i=a;i<Math.min(b,N);i++){const f=`${dir}/rev/frames/f_${String(i).padStart(5,'0')}.jpg`;if(fs.existsSync(f))continue;
  await pg.evaluate(t=>render(t),i/30);await pg.screenshot({path:f+'.tmp',type:'jpeg',quality:92});fs.renameSync(f+'.tmp',f);}
 console.log('N',N);await b0.close();})();
