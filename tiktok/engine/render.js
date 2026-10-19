// uso: node render.js <dir> sheet t1 t2 ...   |  node render.js <dir> video [desde] [hasta]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {spawn}=require('child_process');const fs=require('fs');
(async()=>{
 const dir=process.argv[2], mode=process.argv[3];
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 const errs=[]; pg.on('pageerror',e=>errs.push(String(e)));pg.on('requestfailed',r=>errs.push('NO ENCONTRADO '+r.url().split('/').slice(-3).join('/'))); pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.text())});
 await pg.goto('file://'+dir+'/index.html'); await pg.waitForFunction(()=>window.ready===true,{timeout:20000}).catch(e=>{console.log('ERRORES PAGINA (no arranca):',errs.slice(0,5).join('\n'));process.exit(1);}); await pg.waitForTimeout(300);
 if(errs.length) console.log('ERRORES PAGINA:',errs.slice(0,10).join('\n'));
 const D=await pg.evaluate(()=>window.DURATION);
 fs.writeFileSync(dir+'/sfx.json',JSON.stringify(await pg.evaluate(()=>window.SFX)));
 if(mode==='sheet'){
   const ts=process.argv.slice(4).map(Number); fs.mkdirSync(dir+'/shots',{recursive:true});
   for(const t of ts){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`${dir}/shots/s_${t.toFixed(2).padStart(6,'0')}.jpg`,type:'jpeg',quality:70});}
 } else {
   const FPS=30,N=Math.ceil((process.env.MAXT?Math.min(D,+process.env.MAXT):D)*FPS);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',dir+'/video_noaudio.mp4'],{stdio:['pipe','inherit','inherit']});
   for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%300==0) console.log(dir.split('/').pop(),i,'/',N);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r));
 }
 if(errs.length) console.log('ERRORES:',errs.slice(0,10).join('\n'));
 console.log('duracion',D); await b.close();
})();
