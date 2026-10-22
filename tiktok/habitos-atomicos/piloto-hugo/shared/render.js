// uso: node render.js <dir-con-index.html> sheet t1 t2 ... | video <dur>
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
(async()=>{
 const dir=path.resolve(process.argv[2]),mode=process.argv[3];
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.error('PAGEERR',e.message));
 await pg.goto('file://'+dir+'/index.html');await pg.evaluate(()=>window.ready);await pg.waitForTimeout(300);
 if(mode==='sheet'){for(const t of process.argv.slice(4).map(Number)){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`${dir}/shot_${t.toFixed(2)}.jpg`,type:'jpeg',quality:82})}}
 else{const D=parseFloat(process.argv[4]),FPS=30,N=Math.ceil(D*FPS);
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',dir+'/video_noaudio.mp4'],{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%300==0)console.log(i,'/',N)}
  ff.stdin.end();await new Promise(r=>ff.on('close',r))}
 await b.close();
})();
