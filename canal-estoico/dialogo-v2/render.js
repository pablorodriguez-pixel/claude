// Renderiza template.html fotograma a fotograma con Chromium y lo codifica con ffmpeg.
// Uso: node render.js sheet t1 t2 ...   |   node render.js video DURACION
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
(async()=>{
 const tpl=fs.readFileSync(__dirname+'/'+(process.env.TPL||'template.html'),'utf8').replace('/*TIMING*/null',fs.readFileSync(__dirname+'/'+(process.env.TIM||'timing.json'),'utf8'));
 fs.writeFileSync(__dirname+'/_'+(process.env.TPL||'t').replace(/\W/g,'_')+'.html',tpl);
 const mode=process.argv[2];
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--allow-file-access-from-files']});
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto('file://'+__dirname+'/_'+(process.env.TPL||'t').replace(/\W/g,'_')+'.html'); await pg.evaluate(()=>window.ready); await pg.waitForTimeout(300);
 if(mode==='sheet'){
   for(const t of process.argv.slice(3).map(Number)){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`shot_${t.toFixed(2)}.jpg`,type:'jpeg',quality:80});}
 } else {
   const D=parseFloat(process.argv[3]),FPS=30,N=Math.ceil(D*FPS);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','video_noaudio.mp4'],{stdio:['pipe','inherit','inherit']});
   for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%150==0) console.log(i,'/',N);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r));
 }
 await b.close();
})();
