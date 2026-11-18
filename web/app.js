'use strict';
/* FastTrack engine: state, plans, schedule, calculations, backup */
const VER='1.1',KEY='fasttrack.v1',H1=36e5,D1=864e5;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);
const pad=n=>String(n).padStart(2,'0');
const dkey=(d=new Date())=>{d=new Date(d);return`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`};
const dparse=k=>{const[y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d)};
const addDays=(k,n)=>{const d=dparse(k);d.setDate(d.getDate()+n);return dkey(d)};
const hmMin=s=>{const[h,m]=String(s||'12:00').split(':').map(Number);return(h||0)*60+(m||0)};
const minHM=m=>{m=((Math.round(m)%1440)+1440)%1440;return`${pad(Math.floor(m/60))}:${pad(m%60)}`};
const atTime=(k,hm)=>{const d=dparse(k);d.setMinutes(hmMin(hm));return d.getTime()};
const fT=ts=>new Date(ts).toLocaleTimeString([],{hour:'numeric',minute:'2-digit',hour12:(typeof S!=='undefined'&&S&&S.set&&S.set.h24)?false:undefined});
const fTs=ts=>{const d=new Date(ts);return d.getMinutes()===0&&!(S.set&&S.set.h24)?d.toLocaleTimeString([],{hour:'numeric'}):fT(ts)};
const fD=ts=>new Date(ts).toLocaleDateString([],{weekday:'short',day:'numeric',month:'short'});
const fDL=ts=>new Date(ts).toLocaleDateString([],{day:'numeric',month:'short',year:'numeric'});
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],DOWL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const hh=ms=>{const m=Math.max(0,Math.floor(ms/6e4));return`${Math.floor(m/60)}h ${pad(m%60)}m`};
const clock=ms=>{const s=Math.max(0,Math.floor(ms/1000));return`${pad(Math.floor(s/3600))}:${pad(Math.floor(s%3600/60))}:${pad(s%60)}`};
const r1=n=>Math.round(n*10)/10;

/* ---------- sanitiser (applies to loaded and restored data) ---------- */
const SAFEK=new Set(['id','p','sex','goal','exp','mode','theme','base','target','src','a','u','accent','r','mt']);
function clean(v,key,d){if(d>8)return null;
 if(typeof v==='string'){v=v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u2028\u2029]/g,'').slice(0,400);if(SAFEK.has(key)&&!/^[#\w.\-:]{0,40}$/.test(v))return'';return v}
 if(typeof v==='number')return Number.isFinite(v)?v:0;if(typeof v==='boolean'||v===null)return v;
 if(Array.isArray(v))return v.slice(0,50000).map(x=>clean(x,key,d+1));
 if(typeof v==='object'){const o={};for(const k of Object.keys(v)){if(k==='__proto__'||k==='constructor'||k==='prototype'||k.length>60)continue;o[k]=clean(v[k],k,d+1)}return o}
 return null}
function defState(){return{v:1,prof:{done:false,units:{w:'kg',h:'cm'},sex:'x',age:30,hcm:170,wkg:70,gw:0,act:1.375,goal:'health',exp:'new',wake:'07:00',sleep:'23:00',flags:[],name:''},
 plan:{mode:'single',base:'16-8',eat:'12:00',ramp:[],rampStart:dkey(),target:'16-8',r52:[1,4],longDays:[2],adfStart:dkey(),cf:16,ov:{},week:{},pause:null},
 tgt:{kcal:2000,p:90,water:2400,bmr:1500,tdee:2000},fasts:[],meals:[],favs:[],water:{},weights:[],checks:{},set:{theme:'auto',accent:'ember',h24:false,hap:true,bottle:250,carb:40,fat:30,ms:true,workout:'',lastBackup:0,bkN:0}}}
function merge(a,b){for(const k of Object.keys(b)){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object'&&!Array.isArray(a[k]))merge(a[k],b[k]);else a[k]=b[k]}return a}
function norm(raw){const j=clean(raw,'',0);if(!j||typeof j!=='object')throw new Error('bad');const s=merge(defState(),j);
 ['fasts','meals','weights','favs'].forEach(k=>{if(!Array.isArray(s[k]))s[k]=[]});
 s.favs=s.favs.filter(m=>m&&m.n).slice(0,200).map(m=>({id:m.id||uid(),n:String(m.n).slice(0,120),k:Math.max(0,+m.k||0),p:Math.max(0,+m.p||0),c:Math.max(0,+m.c||0),f:Math.max(0,+m.f||0)}));
 if(!['ember','ocean','forest','violet'].includes(s.set.accent))s.set.accent='ember';s.set.carb=Math.min(70,Math.max(10,+s.set.carb||40));s.set.fat=Math.min(60,Math.max(10,+s.set.fat||30));s.set.bottle=Math.min(2000,Math.max(100,+s.set.bottle||250));
 if(s.plan.pause&&!(s.plan.pause.f&&s.plan.pause.t))s.plan.pause=null;
 ['water','checks'].forEach(k=>{if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))s[k]={}});
 s.fasts=s.fasts.filter(f=>f&&typeof f.s==='number'&&f.s>0).map(f=>({id:f.id||uid(),s:f.s,e:f.e&&f.e>f.s?f.e:null,g:Math.min(72,Math.max(1,+f.g||16)),p:f.p||'',n:String(f.n||'').slice(0,200),r:String(f.r||'').slice(0,20)}));
 s.meals=s.meals.filter(m=>m&&typeof m.t==='number').map(m=>({id:m.id||uid(),t:m.t,n:String(m.n||'Meal').slice(0,120),k:Math.max(0,+m.k||0),p:Math.max(0,+m.p||0),c:Math.max(0,+m.c||0),f:Math.max(0,+m.f||0),mt:m.mt||'s',src:m.src||''}));
 s.weights=s.weights.filter(w=>w&&w.kg>20&&w.kg<400).map(w=>({id:w.id||uid(),t:w.t||Date.now(),kg:+w.kg,wc:+w.wc||0}));
 const ap=s.plan.base;if(!PL[ap])s.plan.base='16-8';if(!['single','week','ramp'].includes(s.plan.mode))s.plan.mode='single';
 return s}
let S;try{S=norm(JSON.parse(localStorage.getItem(KEY)))}catch(e){S=defState()}
let LASTSAVE=0,TMR=0;
function save(){clearTimeout(TMR);TMR=setTimeout(()=>{try{localStorage.setItem(KEY,JSON.stringify(S));LASTSAVE=Date.now();takeSnap();if(typeof afKick==='function')afKick()}catch(e){toast('Could not save. Storage may be full.')}},120)}
window.addEventListener('pagehide',()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}});

/* ---------- units and body maths ---------- */
const KG=2.20462,toLb=k=>k*KG,toKg=l=>l/KG;
const wDisp=kg=>S.prof.units.w==='lb'?r1(toLb(kg)):r1(kg);
const wUnit=()=>S.prof.units.w;
const wIn=v=>S.prof.units.w==='lb'?toKg(+v):+v;
const hDisp=cm=>{if(S.prof.units.h==='ft'){const t=Math.round(cm/2.54);return`${Math.floor(t/12)}'${t%12}"`}return Math.round(cm)+' cm'};
const bmi=(kg,cm)=>kg/Math.pow(cm/100,2);
const bmiLabel=b=>b<18.5?'Underweight':b<25?'Healthy range':b<30?'Overweight':'Obese range';
function calc(p=S.prof){const{wkg,hcm,age,sex,act,goal}=p;
 const base=10*wkg+6.25*hcm-5*age;const bmr=sex==='m'?base+5:sex==='f'?base-161:base-78;
 const tdee=bmr*act,risk=(p.flags&&p.flags.length)||age<18||bmi(wkg,hcm)<18.5;let kcal=goal==='lose'&&!risk?tdee*.85:tdee;const floor=sex==='m'?1500:1200;kcal=Math.max(floor,kcal);
 const refW=goal==='lose'&&p.gw>0?Math.min(p.gw,wkg)+(wkg-Math.min(p.gw,wkg))*.3:wkg;
 const prot=Math.round(refW*(goal==='lose'&&!risk?1.6:goal==='keep'?1.3:1.2));
 return{bmr:Math.round(bmr),tdee:Math.round(tdee/10)*10,kcal:Math.round(kcal/10)*10,p:prot,water:Math.round(wkg*35/50)*50,bmi:bmi(wkg,hcm)}}
function recalc(){const c=calc();S.tgt={kcal:c.kcal,p:c.p,water:c.water,bmr:c.bmr,tdee:c.tdee}}

/* ---------- plan recommendation ---------- */
function recommend(p=S.prof){const c=calc(p),b=c.bmi,fl=p.flags||[];
 const risky=fl.length>0||b<18.5||p.age<18||p.age>=75;
 let target,start,why=[];
 if(risky){target='14-10';start='12-12';why.push('We kept this gentle because of what you told us. Please check with a doctor before changing how you eat.')}
 else if(p.exp==='new'){target=p.goal==='keep'?'14-10':'16-8';start='12-12';why.push('You are new to fasting, so you ease in one step a week instead of jumping straight to the target.')}
 else if(p.exp==='some'){target=p.goal==='lose'?'18-6':'16-8';start=target==='18-6'?'16-8':'14-10';why.push('You have tried fasting before, so you start close to your target and step up after a week.')}
 else{target=p.goal==='lose'?'18-6':'16-8';start=target;why.push('You fast regularly, so you can start at your target straight away.')}
 if(p.goal==='lose'&&!risky)why.push(`Your goal is weight loss. Around ${c.kcal} calories a day with ${c.p} g of protein keeps muscle while you lose.`);
 if(p.goal==='energy')why.push('Steady, early eating windows tend to work best for energy, so the window is placed in your daytime.');
 if(p.goal==='health')why.push('A daily 14 to 16 hour overnight break is the best studied and easiest to keep.');
 if(p.goal==='keep')why.push('For maintenance, a mild daily window is enough and easy to keep forever.');
 if(b<18.5)why.push('Your BMI is below 18.5. Fasting to lose weight is not advised.');
 const steps=LADDER.slice(Math.max(0,LADDER.indexOf(start)),LADDER.indexOf(target)+1);
 const idx=LADDER.indexOf(target),cap=risky?1:5;
 const easier=idx>0?LADDER[idx-1]:null,harder=LADDER[idx+1]&&PL[LADDER[idx+1]].lvl<=cap?LADDER[idx+1]:null;
 return{target,start,steps,why,risky,easier,harder,calc:c,alt:risky?['12-12']:[easier,harder,'5-2'].filter(Boolean)}}
function suggestEat(id,wake=S.prof.wake,sleep=S.prof.sleep){const P=PL[id]||PL['16-8'];const eatH=id==='custom'?24-S.plan.cf:(P.eat||8);
 const w=P.kind==='long'?8:Math.max(1,eatH);let end=hmMin(sleep)-180,start=end-w*60;const wk=hmMin(wake)+60;if(start<wk)start=wk;if(start<0)start+=1440;
 return minHM(Math.round(start/30)*30)}

/* ---------- schedule ---------- */
function planId(k){const P=S.plan,o=P.ov[k];if(P.pause&&k>=P.pause.f&&k<=P.pause.t)return'free';if(o&&(PL[o]||o==='free'))return o;
 const dow=dparse(k).getDay();
 if(P.mode==='week'){const w=P.week[dow];return w&&(PL[w]||w==='free')?w:'free'}
 if(P.mode==='ramp'&&P.ramp.length){const days=Math.floor((dparse(k)-dparse(P.rampStart))/D1);const i=Math.max(0,Math.min(P.ramp.length-1,Math.floor(days/7)));return P.ramp[i]}
 return P.base}
function dayInfo(k){const id=planId(k),d=dparse(k),dow=d.getDay();
 if(id==='free')return{id,k:'free',fastH:0,eatH:24,name:'Free day',short:'Free',kcal:S.tgt.kcal};
 const P=PL[id];
 if(P.kind==='days'){let low;if(id==='5-2')low=S.plan.r52.includes(dow);else low=Math.floor((d-dparse(S.plan.adfStart))/D1)%2===0;
  const lk=id==='5-2'?(S.prof.sex==='m'?600:500):Math.round(S.tgt.tdee*.25/10)*10;
  return low?{id,k:'low',fastH:0,eatH:24,name:P.name+' low day',short:'Low '+lk,kcal:lk}:{id,k:'free',fastH:0,eatH:24,name:P.name+' normal day',short:'Normal',kcal:S.tgt.kcal}}
 if(P.kind==='long'){const on=S.plan.longDays.includes(dow);return on?{id,k:'long',fastH:P.fast,eatH:0,name:P.name,short:P.fast+'h fast',kcal:S.tgt.kcal}:{id,k:'free',fastH:0,eatH:24,name:P.name+' eating day',short:'Eat',kcal:S.tgt.kcal}}
 const f=id==='custom'?S.plan.cf:P.fast;return{id,k:'win',fastH:f,eatH:24-f,name:id==='custom'?f+':'+(24-f):P.name,short:id==='custom'?f+':'+(24-f):P.name,kcal:S.tgt.kcal}}
function refEatH(){const P=S.plan,id=P.mode==='ramp'&&P.target?P.target:P.base,pl=PL[id];if(id==='custom')return 24-P.cf;return pl&&pl.kind==='window'?pl.eat:8}
function winOf(k){const i=dayInfo(k);if(i.k!=='win')return null;const e=atTime(k,S.plan.eat)+refEatH()*H1;return{s:e-i.eatH*H1,e}}
function schedFast(k){const i=dayInfo(k);if(i.k==='win'){const w=winOf(k);return{s:w.e,e:w.e+i.fastH*H1,g:i.fastH}}
 if(i.k==='long'){const s=atTime(k,S.plan.eat)+refEatH()*H1;return{s,e:s+i.fastH*H1,g:i.fastH}}return null}
function goalFor(ts){const k=dkey(ts),i=dayInfo(k);if(i.fastH)return i.fastH;const n=dayInfo(addDays(k,1));return n.fastH||(PL[S.plan.base]&&PL[S.plan.base].kind==='window'?PL[S.plan.base].fast:14)}

/* ---------- fasting state ---------- */
const sortedFasts=()=>[...S.fasts].sort((a,b)=>a.s-b.s);
const activeFast=()=>S.fasts.find(f=>!f.e)||null;
const doneFasts=()=>sortedFasts().filter(f=>f.e);
const fh=f=>((f.e||Date.now())-f.s)/H1;
function phase(now=Date.now()){const a=activeFast();if(a)return{k:'fast',since:a.s,goal:a.g,act:a};
 const done=doneFasts(),last=done[done.length-1],today=dkey(new Date(now)),i=dayInfo(today);
 if(last&&now-last.e<D1){const li=dayInfo(dkey(last.e));const eh=li.k==='win'?li.eatH:(li.k==='long'?8:24);const end=last.e+eh*H1;
  if(now<end)return{k:'eat',since:last.e,end,left:end-now,total:end-last.e};if(now-end>3*H1){const nx=nextOpen(now);if(nx)return{k:'pre',opens:nx,left:nx-now}}return{k:'due',since:last.e,end,over:now-end}}
 if(i.k==='free'||i.k==='low')return{k:i.k==='low'?'low':'free'};
 const w=winOf(today);
 if(w){if(now>=w.s&&now<w.e)return{k:'eat',since:w.s,end:w.e,left:w.e-now,total:w.e-w.s};if(now<w.s)return{k:'pre',opens:w.s,left:w.s-now};return{k:'due',since:w.e,end:w.e,over:now-w.e}}
 const sf=schedFast(today);if(sf){if(now<sf.s)return{k:'pre',opens:sf.s,left:sf.s-now,long:true};return{k:'due',since:sf.s,end:sf.s,over:now-sf.s}}
 return{k:'free'}}
function nextOpen(now){for(let i=0;i<3;i++){const w=winOf(addDays(dkey(new Date(now)),i));if(w&&w.s>now)return w.s}return null}
function startFast(ts=Date.now(),g){const a=activeFast();if(a)return a;const f={id:uid(),s:ts,e:null,g:Math.max(1,Math.min(72,g||goalFor(ts))),p:planId(dkey(ts)),n:''};S.fasts.push(f);save();return f}
function endFast(ts=Date.now()){const a=activeFast();if(!a)return null;a.e=Math.max(a.s+6e4,ts);save();return a}
const fastOk=f=>f.e&&fh(f)>=f.g*.9;
function fastDay(f){return dkey(f.e)}

/* ---------- aggregates ---------- */
const mealsOn=k=>S.meals.filter(m=>dkey(m.t)===k).sort((a,b)=>a.t-b.t);
const sumM=l=>l.reduce((a,m)=>({k:a.k+m.k,p:a.p+m.p,c:a.c+m.c,f:a.f+m.f}),{k:0,p:0,c:0,f:0});
const waterOn=k=>S.water[k]||0;
function streak(){let n=0,best=0,run=0;const today=dkey();const ok=new Set(doneFasts().filter(fastOk).map(fastDay));
 let k=today;for(let i=0;i<400;i++){const inf=dayInfo(k);if(inf.fastH){if(ok.has(k))n++;else if(k!==today)break}k=addDays(k,-1)}
 const keys=[...ok].sort();run=0;let prev=null;for(const x of keys){run=prev&&addDays(prev,1)===x?run+1:1;best=Math.max(best,run);prev=x}
 return{cur:n,best:Math.max(best,n)}}
function stats(){const d=doneFasts(),hrs=d.map(fh);const tot=hrs.reduce((a,b)=>a+b,0);return{n:d.length,tot,avg:d.length?tot/d.length:0,max:hrs.length?Math.max(...hrs):0,ok:d.filter(fastOk).length}}
function weekHours(){const out=[];for(let i=6;i>=0;i--){const k=addDays(dkey(),-i);const h=doneFasts().filter(f=>fastDay(f)===k).reduce((a,f)=>Math.max(a,fh(f)),0);out.push({k,h,g:dayInfo(k).fastH})}return out}
function weightTrend(){const w=[...S.weights].sort((a,b)=>a.t-b.t);return w}
const ACH=[
{id:'f1',ic:'flame',n:'First fast',d:'Complete a fast',ok:()=>stats().n>=1},
{id:'h12',ic:'moon',n:'Twelve hours',d:'Fast for 12 hours',ok:()=>stats().max>=12},
{id:'h16',ic:'bolt',n:'Sixteen hours',d:'Fast for 16 hours',ok:()=>stats().max>=16},
{id:'h18',ic:'target',n:'Eighteen hours',d:'Fast for 18 hours',ok:()=>stats().max>=18},
{id:'h24',ic:'sun',n:'A full day',d:'Fast for 24 hours',ok:()=>stats().max>=24},
{id:'s3',ic:'check',n:'Three in a row',d:'3 day streak',ok:()=>streak().best>=3},
{id:'s7',ic:'cal',n:'One week',d:'7 day streak',ok:()=>streak().best>=7},
{id:'s30',ic:'trophy',n:'One month',d:'30 day streak',ok:()=>streak().best>=30},
{id:'t100',ic:'clock',n:'100 hours',d:'100 hours fasted in total',ok:()=>stats().tot>=100},
{id:'t500',ic:'star',n:'500 hours',d:'500 hours fasted in total',ok:()=>stats().tot>=500},
{id:'m1',ic:'fork',n:'Meal logger',d:'Log your first meal',ok:()=>S.meals.length>=1},
{id:'w7',ic:'drop',n:'Hydrated',d:'Hit your water goal 7 days',ok:()=>Object.values(S.water).filter(v=>v>=S.tgt.water).length>=7},
{id:'wt',ic:'scale',n:'Down a kilo',d:'Lose 1 kg from your first weigh in',ok:()=>{const w=weightTrend();return w.length>1&&w[0].kg-w[w.length-1].kg>=1}},
{id:'c7',ic:'heart',n:'Self aware',d:'Check in 7 times',ok:()=>Object.keys(S.checks).length>=7}];

/* ---------- backup and export ---------- */
function exportJSON(){return JSON.stringify({app:'FastTrack',exported:new Date().toISOString(),data:S},null,1)}
function restoreText(t){let j;try{j=JSON.parse(t)}catch(e){throw new Error('That file is not a FastTrack backup.')}
 const raw=j&&j.data?j.data:j;if(!raw||!Array.isArray(raw.fasts)&&!raw.prof)throw new Error('That file is not a FastTrack backup.');const s=norm(raw);S=s;recalc();save();return s}
const csvq=v=>{v=String(v??'');if(/^[=+\-@\t\r]/.test(v)&&!/^-?\d+(\.\d+)?$/.test(v))v="'"+v;return'"'+v.replace(/"/g,'""')+'"'};
function exportCSV(){const L=['type,start,end,hours,goal_hours,note'];sortedFasts().forEach(f=>L.push(['fast',new Date(f.s).toISOString(),f.e?new Date(f.e).toISOString():'',f.e?r1(fh(f)):'',f.g,f.n].map(csvq).join(',')));
 L.push('');L.push('type,time,name,kcal,protein_g,carbs_g,fat_g');S.meals.forEach(m=>L.push(['meal',new Date(m.t).toISOString(),m.n,m.k,m.p,m.c,m.f].map(csvq).join(',')));
 L.push('');L.push('type,time,weight_kg,waist_cm');S.weights.forEach(w=>L.push(['weight',new Date(w.t).toISOString(),w.kg,w.wc||''].map(csvq).join(',')));return L.join('\n')}
function icsText(days=14){const out=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//FastTrack//EN','CALSCALE:GREGORIAN'];const z=t=>new Date(t).toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
 for(let i=0;i<days;i++){const k=addDays(dkey(),i),f=schedFast(k);if(!f||f.e<Date.now())continue;
  const w=winOf(k);if(w&&w.s>Date.now())out.push('BEGIN:VEVENT','UID:ft-open-'+k+'@fasttrack','DTSTAMP:'+z(Date.now()),'DTSTART:'+z(w.s),'DTEND:'+z(w.s+36e5),'SUMMARY:Eating window opens','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Eating window opens','TRIGGER:-PT0M','END:VALARM','END:VEVENT');
  if(f.s>Date.now())out.push('BEGIN:VEVENT','UID:ft-start-'+k+'@fasttrack','DTSTAMP:'+z(Date.now()),'DTSTART:'+z(f.s),'DTEND:'+z(f.s+36e5),'SUMMARY:Start your '+f.g+'h fast','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Time to start your fast','TRIGGER:-PT10M','END:VALARM','END:VEVENT')}
 out.push('END:VCALENDAR');return out.join('\r\n')}
async function shareFile(name,text,type){const f=new File([text],name,{type});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return true}}catch(e){if(e&&e.name==='AbortError')return false}
 const u=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);return true}

/* ---------- v1.1 engine: snapshots, estimates, insights ---------- */
const SNAPK='fasttrack.snaps';
function snaps(){try{return JSON.parse(localStorage.getItem(SNAPK)||'[]')}catch(e){return[]}}
function takeSnap(force){try{if(!S.prof.done)return;const L=snaps(),last=L[L.length-1];if(!force&&last&&Date.now()-last.t<3*H1)return;L.push({t:Date.now(),n:S.fasts.length,m:S.meals.length,d:JSON.stringify(S)});while(L.length>4)L.shift();localStorage.setItem(SNAPK,JSON.stringify(L))}catch(e){try{const L=snaps();L.shift();localStorage.setItem(SNAPK,JSON.stringify(L))}catch(x){}}}
function restoreSnap(i){const L=snaps();if(!L[i])throw new Error('Snapshot not found');S=norm(JSON.parse(L[i].d));recalc();save()}
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
const fuel=h=>{const gly=Math.max(0,1-Math.pow(h/26,1.15)),ket=Math.min(1,Math.max(0,(h-10)/38)),fat=Math.min(.92,.38+h/38);return{gly,ket,fat}};
const burned=h=>{const rest=S.tgt.bmr/24*h;return{k:Math.round(rest),fat:Math.round(rest*Math.min(.9,.4+h/40))}};
function adherence(days=30){let n=0,ok=0;const ok2=new Set(doneFasts().filter(fastOk).map(fastDay));const t=dkey();for(let i=1;i<=days;i++){const k=addDays(t,-i);if(k<(S.fasts[0]?dkey(sortedFasts()[0].s):t))break;if(dayInfo(k).fastH){n++;if(ok2.has(k))ok++}}return{n,ok,pct:n?Math.round(ok/n*100):0}}
function suggestion(){if(S.plan.mode!=='single')return null;const a=adherence(14),id=S.plan.base,P=PL[id];if(!P||P.kind!=='window'||a.n<6)return null;const i=LADDER.indexOf(id),risky=recommend().risky;
 if(a.pct>=85&&i>=0&&LADDER[i+1]&&!risky&&PL[LADDER[i+1]].lvl<=3)return{up:1,id:LADDER[i+1],t:`You hit ${a.ok} of your last ${a.n} fasts. Ready to try ${PL[LADDER[i+1]].name}?`};
 if(a.pct<50&&i>0)return{up:0,id:LADDER[i-1],t:`You completed ${a.ok} of ${a.n} recent fasts. A gentler ${PL[LADDER[i-1]].name} may be easier to keep.`};return null}
function records(){const d=doneFasts(),hs=d.map(fh);const wk={};d.forEach(f=>{const dt=dparse(fastDay(f)),mon=addDays(fastDay(f),-((dt.getDay()+6)%7));wk[mon]=(wk[mon]||0)+fh(f)});
 return{longest:hs.length?Math.max(...hs):0,bestWeek:Object.values(wk).length?Math.max(...Object.values(wk)):0,bestStreak:streak().best,total:hs.reduce((a,b)=>a+b,0),n:d.length,first:d.length?d[0].s:null}}
function monthStat(y,m){const d=doneFasts().filter(f=>{const x=new Date(f.e);return x.getFullYear()===y&&x.getMonth()===m});return{n:d.length,h:d.reduce((a,f)=>a+fh(f),0),ok:d.filter(fastOk).length,avg:d.length?d.reduce((a,f)=>a+fh(f),0)/d.length:0}}
function xpInfo(){const st=stats(),dm=new Set(S.meals.map(m=>dkey(m.t))).size,wd=Object.values(S.water).filter(v=>v>=S.tgt.water).length;
 const xp=Math.round(st.tot*3+st.ok*25+S.weights.length*5+dm*4+wd*3+Object.keys(S.checks).length*2);let li=0;LEVELS.forEach((l,i)=>{if(xp>=l[0])li=i});const nx=LEVELS[li+1];
 return{xp,lvl:li+1,name:LEVELS[li][1],base:LEVELS[li][0],next:nx?nx[0]:null,frac:nx?(xp-LEVELS[li][0])/(nx[0]-LEVELS[li][0]):1}}
function challenges(){const t=dkey(),mon=addDays(t,-((dparse(t).getDay()+6)%7)),days=[];for(let i=0;i<7;i++)days.push(addDays(mon,i));
 const f14=doneFasts().filter(f=>days.includes(fastDay(f))&&fh(f)>=14).length;
 const pd=days.filter(k=>k<=t&&sumM(mealsOn(k)).p>=S.tgt.p*.9).length;const wd=days.filter(k=>k<=t&&waterOn(k)>=S.tgt.water).length;
 return[{id:'c1',t:'Three fasts of 14 hours or more',v:f14,m:3,ic:'flame'},{id:'c2',t:'Hit your protein on four days',v:pd,m:4,ic:'fork'},{id:'c3',t:'Reach your water goal five days',v:wd,m:5,ic:'drop'}]}
function bestDay(){const a=[[],[],[],[],[],[],[]];doneFasts().forEach(f=>a[new Date(f.e).getDay()].push(fh(f)));let best=null;a.forEach((l,i)=>{if(l.length>=2){const v=l.reduce((x,y)=>x+y,0)/l.length;if(!best||v>best.v)best={d:i,v,n:l.length}}});return best}
function weightFit(days=28){const w=weightTrend().filter(x=>x.t>Date.now()-days*D1);if(w.length<3)return null;const t0=w[0].t,xs=w.map(x=>(x.t-t0)/D1),ys=w.map(x=>x.kg),n=xs.length,mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;let num=0,den=0;for(let i=0;i<n;i++){num+=(xs[i]-mx)*(ys[i]-my);den+=(xs[i]-mx)**2}if(!den)return null;const sl=num/den;return{perWeek:sl*7,now:my+sl*((Date.now()-t0)/D1-mx)}}
function projection(){const f=weightFit(),gw=S.prof.gw;if(!f||!gw||!(gw>0))return null;const cur=f.now;if((gw<cur&&f.perWeek>=-.02)||(gw>cur&&f.perWeek<=.02))return{stalled:true,cur};const days=(gw-cur)/(f.perWeek/7);if(days<0||days>900)return{stalled:true,cur};return{date:Date.now()+days*D1,days:Math.round(days),cur,rate:f.perWeek}}
function compliance(k){const w=winOf(k),ml=mealsOn(k);if(!w||!ml.length)return null;const inn=ml.filter(m=>m.t>=w.s-6e4&&m.t<=w.e+6e4).length;return Math.round(inn/ml.length*100)}
function dailyInsight(){const a=activeFast(),ph=phase(),st=streak(),ad=adherence(14);const now=Date.now();
 if(a){const h=(now-a.s)/H1;if(h>=a.g)return{ic:'check',t:'Goal reached',b:'You are past your goal. End the fast whenever you are ready, there is no extra credit for going longer.'};if(h>=12)return{ic:'flame',t:'Fat burning is ramping up',b:'Past 12 hours your body leans more on fat for fuel. Keep water and a pinch of salt handy.'};if(h>=4)return{ic:'drop',t:'Stay topped up',b:'Hunger comes in waves. Drink some water and it usually passes in about 20 minutes.'};return{ic:'moon',t:'Just getting started',b:'The first hours are the easiest. Digestion is still working through your last meal.'}}
 if(ph.k==='eat'){const t=sumM(mealsOn(dkey()));const left=Math.max(0,S.tgt.p-t.p);if(left>20)return{ic:'fork',t:`${Math.round(left)} g protein to go`,b:'Put protein in your next meal. Eggs, fish, chicken, yoghurt or beans all help.'}}
 if(st.cur>=3)return{ic:'trophy',t:`${st.cur} days in a row`,b:'Consistency beats intensity. Keep the routine simple.'};
 if(ad.n>=6&&ad.pct>=80)return{ic:'star',t:`${ad.pct}% of recent fasts completed`,b:'You are in a great rhythm. Check the Plan tab to see if you want to step up.'};
 const w=weightFit();if(w&&w.perWeek<-.1)return{ic:'scale',t:'Trending down',b:`Your weekly average is moving about ${Math.abs(r1(wDisp(w.perWeek)))} ${wUnit()} a week.`};
 return{ic:'leaf',t:'Tip of the day',b:TIPS_FAST[Math.floor(now/D1)%TIPS_FAST.length]}}
function weekReport(){const t=dkey(),days=[];for(let i=6;i>=0;i--)days.push(addDays(t,-i));const fs=doneFasts().filter(f=>days.includes(fastDay(f)));const hrs=fs.reduce((a,f)=>a+fh(f),0);
 const kc=days.map(k=>sumM(mealsOn(k)).k).filter(x=>x>0);const ws=weightTrend().filter(w=>w.t>=dparse(days[0]).getTime());
 return{fasts:fs.length,ok:fs.filter(fastOk).length,hours:hrs,avgK:kc.length?Math.round(kc.reduce((a,b)=>a+b,0)/kc.length):0,wd:ws.length>1?ws[ws.length-1].kg-ws[0].kg:null,water:days.filter(k=>waterOn(k)>=S.tgt.water).length}}
function reportText(){const r=weekReport();return`FastTrack week\nFasts: ${r.fasts} (${r.ok} goals met)\nHours fasted: ${r1(r.hours)}\nAverage calories: ${r.avgK||'not logged'}\nWater goal days: ${r.water} of 7${r.wd!=null?`\nWeight change: ${r.wd>0?'+':''}${r1(wDisp(r.wd))} ${wUnit()}`:''}`}
