const reasons=[
["💖","Your Beautiful Smile","Your smile can fix my worst day."],
["🌸","Your Lovely Personality","You are sweet, funny and so special."],
["☀️","The Happiness You Bring","Every moment with you feels like sunshine."],
["💗","Your Beautiful Heart","You have the purest heart I know."],
["😊","The Way You Make Me Smile","Just thinking of you makes me smile."],
["🤍","Your Kindness","You are kind to everyone, always."],
["👀","Your Beautiful Eyes","Your eyes are my favorite place to get lost."],
["✨","Every Moment With You","Even small moments feel magical with you."],
["🌹","Your Special Presence","When you are here, everything is better."],
["👑","Simply Because You Are SALMA","No reason needed. You are you, and that's perfect. ❤️"]
];
const grid=document.getElementById('reasonsGrid');
reasons.forEach((r,i)=>{
  const d=document.createElement('div');d.className='reason';
  d.innerHTML=`<div class="num">${r[0]}</div><div class="title">${i+1}. ${r[1]}</div><div class="back">${r[2]}</div>`;
  d.onclick=()=>{d.classList.toggle('flipped');burst(d);};
  grid.appendChild(d);
});
function goTo(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='birthday') startFireworks();
  if(id==='final') setTimeout(()=>burst(document.body),500);
}
function openSurprise(){
  document.getElementById('envelope').classList.add('open');
  playMusic(); burst(document.body);
  setTimeout(()=>goTo('birthday'),1100);
}
// Petals
function createPetal(){
  const p=document.createElement('div');p.className='petal';
  p.textContent=['🌸','🌹','💖','✨'][Math.floor(Math.random()*4)];
  p.style.left=Math.random()*100+'vw';p.style.fontSize=(14+Math.random()*14)+'px';
  p.style.animationDuration=(4+Math.random()*5)+'s';
  document.getElementById('petals').appendChild(p);
  setTimeout(()=>p.remove(),9000);
}
setInterval(createPetal,900);
// Click hearts
document.addEventListener('click',e=>{
  const h=document.createElement('div');h.className='float-heart';h.textContent='❤️';
  h.style.left=e.clientX+'px';h.style.top=e.clientY+'px';
  document.body.appendChild(h);setTimeout(()=>h.remove(),1600);
});
function burst(el){
  for(let i=0;i<14;i++){
    const h=document.createElement('div');h.className='float-heart';
    h.textContent=['❤️','💖','💕','✨'][Math.floor(Math.random()*4)];
    const r=el.getBoundingClientRect();h.style.left=(r.left+r.width/2+ (Math.random()*120-60))+'px';h.style.top=(r.top+80)+'px';
    document.body.appendChild(h);setTimeout(()=>h.remove(),1600);
  }
}
// Fireworks
function startFireworks(){
  const box=document.getElementById('fireworks');box.innerHTML='';
  for(let i=0;i<40;i++){
    const f=document.createElement('div');f.className='firework';
    f.style.left=(Math.random()*100)+'%';f.style.top=(Math.random()*40)+'%';
    f.style.background=['#ff1744','#ffd700','#ff6b9d','#fff'][Math.floor(Math.random()*4)];
    f.style.setProperty('--x',(Math.random()*160-80)+'px');f.style.setProperty('--y',(Math.random()*160-80)+'px');
    box.appendChild(f);
  }
  setTimeout(()=>box.innerHTML='',1200);
}
setInterval(()=>{if(document.getElementById('birthday').classList.contains('active')) startFireworks()},2200);
// Music - gentle piano via Web Audio + file fallback
let audioCtx=null, musicOn=false;
const musicBtn=document.getElementById('musicBtn');const audio=document.getElementById('bgMusic');
function playMusic(){
  if(musicOn) return; musicOn=true; musicBtn.classList.add('playing'); musicBtn.textContent='🎶';
  audio.play().catch(()=>playPiano());
}
function playPiano(){
  try{
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    const notes=[523.25,659.25,783.99,1046.5,783.99,659.25,587.33,659.25];
    let i=0; setInterval(()=>{if(!musicOn)return; const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=notes[i%notes.length];g.gain.setValueAtTime(.12,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+1.2);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+1.2);i++;},900);
  }catch(e){}
}
musicBtn.onclick=()=>{ if(musicOn){musicOn=false;audio.pause();musicBtn.classList.remove('playing');musicBtn.textContent='🎵'; if(audioCtx) audioCtx.suspend();} else playMusic(); };
// Final kiss
function kissExplosion(){
  const heart=document.getElementById('giantHeart');heart.style.transform='scale(1.6)';
  setTimeout(()=>heart.style.transform='scale(1)',400);
  for(let i=0;i<40;i++){setTimeout(()=>createPetal(),i*40); burst(document.body);}
  document.getElementById('loveFinal').classList.add('show');
  const msg=document.createElement('div');msg.className='float-heart';msg.style.fontSize='40px';msg.textContent='💋';msg.style.left='50%';msg.style.top='40%';document.body.appendChild(msg);
}