// render reanudable: node myrender.js <dir>  -> <dir>/frames/f_00000.jpg … (salta los ya hechos)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const dir=process.argv[2], out=dir+'/frames'; fs.mkdirSync(out,{recursive:true});
(async()=>{
 for(let attempt=0;attempt<40;attempt++){
  let b;
  try{
   b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
   const pg=await b.newPage({viewport:{width:1080,height:1920}});
   pg.setDefaultTimeout(180000);
   await pg.goto('file://'+dir+'/index.html'); await pg.waitForFunction(()=>window.ready===true,{timeout:180000}); await pg.waitForTimeout(300);
   const D=await pg.evaluate(()=>window.DURATION); fs.writeFileSync(dir+'/sfx.json',JSON.stringify(await pg.evaluate(()=>window.SFX)));
   const N=Math.ceil(D*30); let done=0;
   for(let i=0;i<N;i++){const f=`${out}/f_${String(i).padStart(5,'0')}.jpg`; if(fs.existsSync(f)){done++;continue;}
     await pg.evaluate(t=>render(t),i/30); const buf=await pg.screenshot({type:'jpeg',quality:92}); fs.writeFileSync(f+'.tmp',buf); fs.renameSync(f+'.tmp',f);
     if(i%300==0) console.log('frame',i,'/',N);}
   console.log('ALL',N); await b.close(); fs.writeFileSync(dir+'/frames_N.txt',String(N)); return;
  }catch(e){console.log('retry',attempt,String(e).slice(0,120)); try{await b.close()}catch(_){} }
 }
 process.exit(1);
})();
