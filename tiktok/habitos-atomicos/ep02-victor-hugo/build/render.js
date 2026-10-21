const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{
 const mode=process.argv[2]; // 'sheet' or 'video'
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 await pg.goto('file://'+__dirname+'/video.html'); await pg.evaluate(()=>window.ready); await pg.waitForTimeout(500);
 if(mode==='sheet'){
   const ts=process.argv.slice(3).map(Number);
   for(const t of ts){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`shot_${t.toFixed(2)}.jpg`,type:'jpeg',quality:80});}
 } else {
   const D=parseFloat(process.argv[3]),FPS=30,N=Math.ceil(D*FPS);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','video_noaudio.mp4'],{stdio:['pipe','inherit','inherit']});
   for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%150==0) console.log(i,'/',N);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r));
 }
 await b.close();
})();
