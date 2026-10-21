// uso: node build.js <carpeta-video> sheet t1 t2 ...   |   node build.js <carpeta-video> video
const fs=require('fs'),path=require('path'),{spawn,execSync}=require('child_process');
const dir=path.resolve(process.argv[2]),mode=process.argv[3]||'video';
const meta=require(dir+'/meta.js');
const stt=JSON.parse(fs.readFileSync(dir+'/stt.json'));
const W=stt.words.filter(w=>w.type==='word').map(w=>({t:w.text,s:w.start,e:w.end,n:w.text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'')}));
const dur=W[W.length-1].e+.9;
const at=(phrase,nth=0)=>{const k=phrase.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').split(/\s+/).map(x=>x.replace(/[^a-z0-9]/g,'')).filter(Boolean);let c=0;
  for(let i=0;i<=W.length-k.length;i++){if(k.every((x,j)=>W[i+j].n===x)){if(c++===nth)return W[i].s}}throw new Error('anchor no encontrado: '+phrase+' #'+nth)};
const scenes=meta.scenes(at,dur);scenes.forEach((s,i)=>{s.end=i<scenes.length-1?scenes[i+1].start:dur});
// subtítulos por trozos
const subs=[];let cur=[];const flush=()=>{if(cur.length){subs.push({s:cur[0].s,e:cur[cur.length-1].e,w:cur.map(w=>({t:w.t.replace(/[.,;:¿¡"…]/g,'').toUpperCase(),s:w.s,e:w.e}))});cur=[]}};
W.forEach((w,i)=>{cur.push(w);const end=/[.,;:?!…]$/.test(w.t);if(cur.length>=3||cur.map(x=>x.t).join(' ').length>16||end)flush()});flush();
subs.forEach((c,i)=>{const n=subs[i+1];if(n&&n.s-c.e<.35)c.e=n.s});
const ins=(meta.inserts?meta.inserts(at):[]).sort((x,y)=>x.a-y.a);
const data={dur,ep:meta.ep,scenes,subs,ins};
let html=fs.readFileSync(__dirname+'/player.html','utf8').replace('/*DATA*/null',JSON.stringify(data));
const HF=__dirname+'/video_'+path.basename(dir)+'.html';fs.writeFileSync(HF,html);
(async()=>{
 const {chromium}=require('playwright');
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
 const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.log('PAGEERR',e.message));pg.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
 await pg.goto('file://'+HF);await pg.evaluate(()=>window.ready);await pg.waitForTimeout(400);
 if(mode==='sheet'){fs.mkdirSync(dir+'/shots',{recursive:true});
   for(const t of process.argv.slice(4).map(Number)){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`${dir}/shots/s_${t.toFixed(2)}.jpg`,type:'jpeg',quality:80});}
 }else{
   const FPS=30,N=Math.ceil(dur*FPS);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',dir+'/video_noaudio.mp4'],{stdio:['pipe','inherit','inherit']});
   for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/FPS);const buf=await pg.screenshot({type:'jpeg',quality:92});
     if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%150===0)console.log(i,'/',N)}
   ff.stdin.end();await new Promise(r=>ff.on('close',r));
   // mezcla de audio: voz + música (ducking) + SFX
   const sx=[];scenes.forEach((s,i)=>{if(i>0)sx.push([s.start-.05,'whoosh',.55]);(s.sfx||[]).forEach(x=>sx.push(x))});ins.forEach((x,i)=>sx.push([x.a,x.sfx||(i%2?'pop':'hit'),.75]));
   const sd=__dirname+'/sfx/';const ins=['-i',dir+'/voice.mp3','-i',sd+'music.mp3'];sx.forEach(x=>ins.push('-i',sd+x[1]+'.mp3'));
   let fc=`[0:a]asplit=2[v][vs];[1:a]atrim=0:${dur},volume=0.42,afade=t=in:d=.8,afade=t=out:st=${dur-1.2}:d=1.2[m];[m][vs]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=350[md];`;
   sx.forEach((x,i)=>{const ms=Math.max(0,Math.round(x[0]*1000));fc+=`[${i+2}:a]adelay=${ms}|${ms},volume=${x[2]}[s${i}];`});
   fc+=`[v][md]${sx.map((_,i)=>`[s${i}]`).join('')}amix=inputs=${2+sx.length}:normalize=0:duration=longest,atrim=0:${dur},alimiter=limit=0.95[a]`;
   execSync(['ffmpeg','-y','-loglevel','error',...ins.map(x=>`"${x}"`),'-filter_complex',`"${fc}"`,'-map','"[a]"','-c:a','aac','-b:a','192k',`"${dir}/mix.m4a"`].join(' '),{stdio:'inherit'});
   execSync(`ffmpeg -y -loglevel error -i "${dir}/video_noaudio.mp4" -i "${dir}/mix.m4a" -c:v copy -c:a copy -shortest -movflags +faststart "${dir}/${meta.out}"`,{stdio:'inherit'});
   console.log('OK',meta.out,dur.toFixed(1)+'s');
 }
 await b.close();
})();
