// Uso: node render.js <episodio>/build sheet t1 t2 ...   |   node render.js <episodio>/build video <dur>
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
(async()=>{
 const dir=path.resolve(process.argv[2]),mode=process.argv[3];
 const b=await chromium.launch();
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 await pg.goto('file://'+dir+'/video.html'); await pg.evaluate(()=>window.ready); await pg.waitForTimeout(500);
 if(mode==='sheet'){
   for(const t of process.argv.slice(4).map(Number)){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:path.join(dir,`shot_${t.toFixed(2)}.jpg`),type:'jpeg',quality:80});}
 } else {
   const D=parseFloat(process.argv[4]),FPS=30,N=Math.ceil(D*FPS);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',path.join(dir,'video_noaudio.mp4')],{stdio:['pipe','inherit','inherit']});
   for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%150==0) console.log(i,'/',N);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r));
 }
 await b.close();
})();
