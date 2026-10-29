// Uso: node render.js <episodio>/build sheet t1 t2 ...   |   node render.js <episodio>/build video <dur>
//      node render.js <episodio>/build seg <f0> <f1> <out.mp4>   (tramo de fotogramas, para render.sh reanudable)   (WebGL por SwiftShader)
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
(async()=>{
 const dir=path.resolve(process.argv[2]),mode=process.argv[3];
 const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files','--ignore-gpu-blocklist']});
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.log('ERR',e.message));pg.on('console',m=>m.type()=='error'&&console.log('CON',m.text()));await pg.goto('file://'+dir+'/video.html'+(process.env.Q||'')); await pg.waitForFunction(()=>window.ready===true&&(window.edited===true||typeof EDIT==='undefined'),null,{timeout:60000}); await pg.waitForTimeout(500);
 if(process.env.HIDE) await pg.evaluate(()=>['subs','veil','firma','lab1','lab2','lab3','cnt','big','br1','br2','frase','velo','cap','pista'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none'}));
 if(mode==='pngs'){  // capa transparente para Blender: node render.js <ep>/build pngs f0 f1 <dir>  (con Q=?3d)
   const fs=require('fs');const [a,b,od]=[+process.argv[4],+process.argv[5],process.argv[6]];fs.mkdirSync(od,{recursive:true});
   for(let i=a;i<b;i++){await pg.evaluate(t=>render(t),i/30);await pg.screenshot({path:path.join(od,`o_${String(i).padStart(5,'0')}.png`),omitBackground:true});if(i%150==0)console.log(i,'/',b)}
 } else if(mode==='sheet'){
   for(const t of process.argv.slice(4).map(Number)){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:path.join(dir,`shot_${t.toFixed(2)}.jpg`),type:'jpeg',quality:80});}
 } else {
   const FPS=30,seg=mode==='seg',A=seg?+process.argv[4]:0,N=seg?+process.argv[5]:Math.ceil(parseFloat(process.argv[4])*FPS);
   const out=seg?path.resolve(process.argv[6]):path.join(dir,'video_noaudio.mp4');
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
   for(let i=A;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%150==0) console.log(i,'/',N);}
   ff.stdin.end(); await new Promise(r=>ff.on('close',r));
 }
 await b.close();
})();
