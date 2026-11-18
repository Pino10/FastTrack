'use strict';
/* FastTrack interface */
const IP={timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2.5h6"/>',cal:'<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',fork:'<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 3c-2 1.5-3 4-3 7 0 1.7 1 2.5 3 2.5V21"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',scale:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 9a5 5 0 0 1 7 0M12 9.2l1.6-1.6"/>',plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',flame:'<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/>',moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',trophy:'<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4"/>',down:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',up:'<path d="M12 20V9M7 13l5-5 5 5M5 4h14"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',barcode:'<path d="M4 5v14M8 5v14M12 5v14M16 5v14M20 5v14" stroke-width="2.4"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',chev:'<path d="M9 5l7 7-7 7"/>',back:'<path d="M15 5l-7 7 7 7"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',edit:'<path d="M4 20l1-4L16 5a2 2 0 0 1 3 3L8 19z"/>',trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',star:'<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/>',heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',share:'<path d="M12 15V3M8 7l4-4 4 4M5 12v8h14v-8"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',restore:'<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',leaf:'<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5"/>',swap:'<path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',dot:'<circle cx="12" cy="12" r="3"/>'};
const ico=(n,s=22,w=1.9)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IP[n]||''}</svg>`;
let TAB='today',ONB=null,PH='',DAYSEL=dkey(),FOODDAY=dkey(),PUSHED=false;

/* ---------- toast and sheets ---------- */
function toast(m,undo){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}
 t.innerHTML=`<span>${esc(m)}</span>${undo?'<button data-a="undo">Undo</button>':''}`;t._u=undo||null;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),undo?5200:2600)}
function buzz(){try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}}
function sheet(html,mount,o={}){const L=$('#layer');const had=!!$('.sheet',L);if(had){L.innerHTML=''}else{try{history.pushState({sh:1},'');PUSHED=true}catch(e){}}
 L.innerHTML=`<div class="scrim" data-a="close"></div><div class="sheet${o.tall?' tall':''}" role="dialog" aria-modal="true"><i class="grab"></i>${html}</div>`;document.body.classList.add('sl0');
 const sh=$('.sheet',L);requestAnimationFrame(()=>{$('.scrim',L).classList.add('on');sh.classList.add('on')});if(mount)mount(sh);return sh}
function closeSheet(fromPop){const L=$('#layer'),sh=$('.sheet',L);if(!sh)return;const cb=SHC;SHC=null;$('.scrim',L).classList.remove('on');sh.classList.remove('on');document.body.classList.remove('sl0');
 setTimeout(()=>{if(!$('.sheet.on',L))L.innerHTML=''},380);if(PUSHED&&!fromPop){PUSHED=false;try{history.back()}catch(e){}}else if(fromPop)PUSHED=false;if(cb)cb()}
let SHC=null;
window.addEventListener('popstate',()=>{if($('#layer .sheet.on'))closeSheet(true)});
const SX=`<button class="sx" data-a="close" aria-label="Close">${ico('x',18)}</button>`;

/* ---------- small pieces ---------- */
const dtl=ts=>{const d=new Date(ts);return`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`};
const fromDtl=v=>{const t=new Date(v).getTime();return Number.isFinite(t)?t:null};
const lvlDots=n=>`<span class="lv">${[1,2,3,4,5].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</span>`;
function stageAt(h){let s=STAGES[0];for(const x of STAGES)if(h>=x.h)s=x;return s}
function nextStage(h){return STAGES.find(x=>x.h>h)||null}
function ringSvg(){let t='';for(let i=0;i<60;i++){const a=i/60*Math.PI*2-Math.PI/2,c=Math.cos(a),s=Math.sin(a),big=i%5===0;t+=`<line class="tk" data-i="${i}" x1="${150+c*(big?124:128)}" y1="${150+s*(big?124:128)}" x2="${150+c*141}" y2="${150+s*141}"/>`}
 return`<svg class="ring" viewBox="0 0 300 300" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--a)"/><stop offset="1" stop-color="var(--a2)"/></linearGradient></defs>${t}<circle class="trk" cx="150" cy="150" r="104"/><circle id="arc" class="arc" cx="150" cy="150" r="104" transform="rotate(-90 150 150)" stroke="url(#rg)"/></svg>`}
function setRing(f,instant){const C=2*Math.PI*104,a=$('#arc');if(a){if(instant){a.style.transition='none';requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=''}))}a.style.strokeDasharray=C;a.style.strokeDashoffset=C*(1-Math.min(1,Math.max(0,f)))}
 const n=Math.floor(Math.min(1,f)*60),part=Math.min(1,f)*60-n;$$('.tk').forEach(l=>{const i=+l.dataset.i;l.classList.toggle('lit',i<n);l.style.opacity=i===n&&f<1?.35+part*.65:''})}
const chips=(arr,cur,a,extra='')=>arr.map(([v,l])=>`<button class="chip ${String(cur)===String(v)?'on':''}" data-a="${a}" data-v="${v}" ${extra}>${l}</button>`).join('');
const num=(v,d=0)=>Number.isFinite(+v)?(+v).toLocaleString(undefined,{maximumFractionDigits:d}):'0';

/* ---------- onboarding ---------- */
const OSTEPS=['welcome','safety','body','about','goal','exp','act','day','result'];
const FL=[['minor','I am under 18'],['preg','I am pregnant or breastfeeding'],['diab','I have diabetes or take insulin or glucose lowering medicine'],['ed','I have had an eating disorder or struggle with food restriction'],['med','I have another medical condition or take regular medication']];
function onbView(){const d=ONB.d,st=OSTEPS[ONB.i],pr=Math.round(ONB.i/(OSTEPS.length-1)*100);
 const top=ONB.i>0?`<div class="otop"><button class="ib" data-a="oback" aria-label="Back">${ico('back',20)}</button><div class="obar"><i style="width:${pr}%"></i></div><span>${ONB.i}/${OSTEPS.length-1}</span></div>`:'';
 let b='',nx=`<button class="btn big" data-a="onext">Continue</button>`;
 if(st==='welcome'){b=`<div class="wel"><div class="logo">${ringMini()}</div><h1>Fasting that fits your day</h1><p>Answer a few quick questions. We build your plan, set your eating window and track every fast, meal and kilo. Everything stays on your device.</p></div>`;nx=`<button class="btn big" data-a="onext">Get started</button>`}
 else if(st==='safety'){b=`<h1>Quick safety check</h1><p class="sub">Tick anything that applies. Fasting is not right for everyone.</p><div class="opts">${FL.map(([k,l])=>`<button class="opt ck ${d.flags.includes(k)?'on':''}" data-a="oflag" data-v="${k}"><i>${ico('check',16,2.6)}</i><span>${l}</span></button>`).join('')}</div>${d.flags.length?`<div class="note warn">${ico('warn',18)}<div>Please talk to your doctor before you fast. We will keep your plan gentle in the meantime. ${d.flags.includes('minor')?'Fasting is not recommended under 18.':''}${d.flags.includes('preg')?' Fasting is not recommended while pregnant or breastfeeding.':''}</div></div>`:'<p class="mini">None of these? Just continue.</p>'}`}
 else if(st==='body'){const lb=d.units.w==='lb',ft=d.units.h==='ft';b=`<h1>Your body</h1><p class="sub">Used to work out your calories, protein and water.</p>
  <div class="two"><div class="seg">${chips([['kg','kg'],['lb','lb']],d.units.w,'ounit','data-k="w"')}</div><div class="seg">${chips([['cm','cm'],['ft','ft in']],d.units.h,'ounit','data-k="h"')}</div></div>
  <label class="fl">Weight (${lb?'lb':'kg'})<input class="in lg" id="o-w" inputmode="decimal" value="${lb?r1(toLb(d.wkg)):r1(d.wkg)}"></label>
  ${ft?`<div class="two"><label class="fl">Feet<input class="in lg" id="o-ft" inputmode="numeric" value="${ONB.ft}"></label><label class="fl">Inches<input class="in lg" id="o-in" inputmode="numeric" value="${ONB.inch}"></label></div>`:`<label class="fl">Height (cm)<input class="in lg" id="o-h" inputmode="decimal" value="${Math.round(d.hcm)}"></label>`}`}
 else if(st==='about'){b=`<h1>About you</h1><p class="sub">Age and sex change how many calories you burn.</p><label class="fl">Age<input class="in lg" id="o-age" inputmode="numeric" value="${d.age}"></label><div class="lbl">Sex</div><div class="seg wide">${chips([['f','Female'],['m','Male'],['x','Prefer not to say']],d.sex,'osex')}</div>`}
 else if(st==='goal'){b=`<h1>What is your goal?</h1><div class="opts">${[['lose','Lose weight','Steady fat loss while keeping muscle',  'target'],['energy','More energy and focus','Even energy across the day','bolt'],['health','Better health','Metabolic health and a daily rhythm','heart'],['keep','Keep my weight','Maintain and stay consistent','scale']].map(([k,t,s,i])=>`<button class="opt big ${d.goal===k?'on':''}" data-a="ogoal" data-v="${k}"><i>${ico(i,22)}</i><span><b>${t}</b><small>${s}</small></span></button>`).join('')}</div>`}
 else if(st==='exp'){b=`<h1>Have you fasted before?</h1><div class="opts">${[['new','Never','I am brand new to it'],['some','A little','I have tried it on and off'],['pro','Regularly','I fast most weeks']].map(([k,t,s])=>`<button class="opt big ${d.exp===k?'on':''}" data-a="oexp" data-v="${k}"><span><b>${t}</b><small>${s}</small></span></button>`).join('')}</div>`}
 else if(st==='act'){b=`<h1>How active are you?</h1><div class="opts">${[[1.2,'Mostly sitting','Desk job, little exercise'],[1.375,'Lightly active','Walks or exercise 1 to 3 days'],[1.55,'Moderately active','Exercise 3 to 5 days'],[1.725,'Very active','Hard training or a physical job']].map(([k,t,s])=>`<button class="opt big ${d.act===k?'on':''}" data-a="oact" data-v="${k}"><span><b>${t}</b><small>${s}</small></span></button>`).join('')}</div>`}
 else if(st==='day'){b=`<h1>Your day</h1><p class="sub">We place your eating window around your sleep.</p><div class="two"><label class="fl">I wake up at<input class="in lg" type="time" id="o-wake" value="${d.wake}"></label><label class="fl">I go to bed at<input class="in lg" type="time" id="o-sleep" value="${d.sleep}"></label></div>${d.goal==='lose'?`<label class="fl">Goal weight (${d.units.w}) <small>optional</small><input class="in lg" id="o-gw" inputmode="decimal" placeholder="e.g. ${d.units.w==='lb'?Math.round(toLb(d.wkg*.9)):Math.round(d.wkg*.9)}" value="${d.gw?wOf(d.gw,d):''}"></label>`:''}`}
 else{const r=recommend(d),P=PL[r.target],pk=ONB.pick||r.target,PP=PL[pk],c=r.calc;const eat=suggestEat(pk,d.wake,d.sleep),eh=PP.eat||8;
  b=`<div class="resh"><small>Your plan</small><h1>${PP.name} <em>${PP.title}</em></h1></div>
  <div class="card plan-hero"><div class="pw"><b>${pk==='5-2'||pk==='adf'?'Weekly':PP.fast+'h'}</b><span>${PP.kind==='window'?'fast':PP.kind==='long'?'fast':'low days'}</span></div><div><p>${esc(PP.desc)}</p>${PP.kind==='window'?`<div class="tags"><span>Eat ${eat} to ${minHM(hmMin(eat)+eh*60)}</span><span>${eh}h window</span></div>`:''}</div></div>
  ${pk===r.target&&r.steps.length>1?`<div class="card"><div class="lbl">Ease in</div><div class="steps">${r.steps.map((s,i)=>`<div><b>${PL[s].name}</b><small>Week ${i+1}</small></div>`).join('<i></i>')}</div></div>`:''}
  <div class="card"><div class="lbl">Why this plan</div><ul class="why">${r.why.map(w=>`<li>${esc(w)}</li>`).join('')}</ul></div>
  <div class="tiles3"><div><b>${num(c.kcal)}</b><small>kcal a day</small></div><div><b>${c.p} g</b><small>protein</small></div><div><b>${(c.water/1000).toFixed(1)} L</b><small>water</small></div></div>
  <p class="mini">BMI ${c.bmi.toFixed(1)}, ${bmiLabel(c.bmi).toLowerCase()}. Estimates only. This is not medical advice.</p>`;
  nx=`<button class="btn big" data-a="ofinish">Start this plan</button><button class="btn ghost" data-a="oother">Choose another plan</button>`}
 return`<div class="onb">${top}<div class="obody">${b}</div><div class="ofoot">${nx}</div></div>`}
const wOf=(kg,d)=>d.units.w==='lb'?r1(toLb(kg)):r1(kg);
const ringMini=()=>{let t='';for(let i=0;i<36;i++){const a=i/36*Math.PI*2-Math.PI/2;t+=`<line x1="${50+Math.cos(a)*34}" y1="${50+Math.sin(a)*34}" x2="${50+Math.cos(a)*44}" y2="${50+Math.sin(a)*44}" stroke="${i<26?'var(--a)':'var(--line2)'}" stroke-width="3.2" stroke-linecap="round"/>`}return`<svg viewBox="0 0 100 100" width="120" height="120">${t}<circle cx="50" cy="50" r="7" fill="var(--a)"/></svg>`};
function onbCapture(){if(!ONB)return;const d=ONB.d,v=id=>{const e=$('#'+id);return e?e.value:null};const st=OSTEPS[ONB.i];
 if(st==='body'){const w=parseFloat(v('o-w'));if(w>0)d.wkg=d.units.w==='lb'?toKg(w):w;
  if(d.units.h==='ft'){const ft=parseFloat(v('o-ft')),inn=parseFloat(v('o-in'));if(ft>=0){ONB.ft=ft;ONB.inch=inn>=0?inn:0;d.hcm=(ft*12+(inn||0))*2.54}}else{const h=parseFloat(v('o-h'));if(h>0)d.hcm=h}}
 if(st==='about'){const a=parseInt(v('o-age'));if(a>0)d.age=a}
 if(st==='day'){if(v('o-wake'))d.wake=v('o-wake');if(v('o-sleep'))d.sleep=v('o-sleep');const g=parseFloat(v('o-gw'));d.gw=g>0?(d.units.w==='lb'?toKg(g):g):0}}
function onbNext(){onbCapture();const d=ONB.d,st=OSTEPS[ONB.i];
 if(st==='body'&&(d.wkg<25||d.wkg>350||d.hcm<100||d.hcm>230)){toast('Please check your weight and height');return}
 if(st==='about'&&(d.age<10||d.age>100)){toast('Please enter a valid age');return}
 if(ONB.i<OSTEPS.length-1){ONB.i++;ONB.pick=null;render();$('#app').scrollTop=0}}
function onbFinish(){onbCapture();const d=ONB.d,r=recommend(d),pk=ONB.pick||r.target;const D=defState();
 S.prof=Object.assign(D.prof,{done:true,units:d.units,sex:d.sex,age:d.age,hcm:d.hcm,wkg:d.wkg,gw:d.gw,act:d.act,goal:d.goal,exp:d.exp,wake:d.wake,sleep:d.sleep,flags:d.flags.slice()});recalc();
 const P=PL[pk];S.plan.eat=suggestEat(pk);S.plan.ov={};S.plan.rampStart=dkey();S.plan.target=pk;S.plan.base=pk;
 if(!ONB.pick&&r.steps.length>1){S.plan.mode='ramp';S.plan.ramp=r.steps}else{S.plan.mode='single';S.plan.ramp=[]}
 if(P.kind==='days')S.plan.adfStart=dkey();
 S.weights=[{id:uid(),t:Date.now(),kg:d.wkg,wc:0}];ONB=null;TAB='today';save();$('#app').scrollTop=0;render();toast('Your plan is ready')}

/* ---------- top level render ---------- */
const TABS=[['today','Today','timer'],['plan','Plan','cal'],['eat','Eat','fork'],['progress','Progress','chart'],['me','Me','user']];
const nav=()=>`<nav class="tabs">${TABS.map(([k,l,i])=>`<button class="${TAB===k?'on':''}" data-a="tab" data-v="${k}">${ico(i,22,TAB===k?2.2:1.8)}<span>${l}</span></button>`).join('')}</nav>`;
function render(){const app=$('#app');const sc=app.scrollTop;
 if(!S.prof.done){if(!ONB)ONB={i:0,d:onbStart2(),pick:null,ft:5,inch:7};app.innerHTML=onbView();return}
 const V={today:vToday,plan:vPlan,eat:vEat,progress:vProgress,me:vMe}[TAB]||vToday;
 app.innerHTML=`<main class="v-${TAB}">${V()}</main>${nav()}`;app.scrollTop=sc;PH=phase().k;tick(true)}
function onbStart2(){return{units:{w:'kg',h:'cm'},sex:'x',age:30,hcm:170,wkg:70,gw:0,act:1.375,goal:'lose',exp:'new',wake:'07:00',sleep:'23:00',flags:[],name:''}}
const head=(s,t,r='')=>`<header class="top"><div><small>${s}</small><h1>${t}</h1></div>${r}</header>`;

/* ---------- Today ---------- */
function vToday(){const now=Date.now(),k=dkey(),ph=phase(now),inf=dayInfo(k),st=streak();
 const hr=new Date().getHours(),greet=hr<5?'Late night':hr<12?'Good morning':hr<18?'Good afternoon':'Good evening';
 const w=winOf(k);let lab='',big='',sub='',btn='',frac=0,cls=ph.k;
 if(ph.k==='fast'){const el=now-ph.since;frac=el/(ph.goal*H1);lab='Fasting';big=`<b id="tm">${clock(el)}</b>`;sub=`<span id="pc">${Math.round(frac*100)}%</span> of your ${ph.goal}h goal`;
  btn=`<button class="btn big stop" data-a="endfast">End fast</button><button class="btn ghost" data-a="editfast" data-v="${ph.act.id}">Started ${fT(ph.since)}, edit</button>`}
 else if(ph.k==='eat'){frac=1-ph.left/ph.total;lab='Eating window';big=`<b id="tm">${hh(ph.left)}</b>`;sub=`left, closes ${fT(ph.end)}`;btn=`<button class="btn big" data-a="startfast">Start fast</button><button class="btn ghost" data-a="addfood">${ico('plus',16)} Log a meal</button>`}
 else if(ph.k==='due'){lab='Window closed';big=`<b id="tm">${hh(ph.over)}</b>`;sub=`ago. Time to start fasting`;frac=1;btn=`<button class="btn big" data-a="startfast">Start fast</button><button class="btn ghost" data-a="addfood">${ico('plus',16)} Log a meal</button>`}
 else if(ph.k==='pre'){lab=ph.long?'Fast starts':'Window opens';big=`<b id="tm">${hh(ph.left)}</b>`;sub=`at ${fT(ph.opens)}`;btn=`<button class="btn big" data-a="startfast">Start fast now</button><button class="btn ghost" data-a="addfood">${ico('plus',16)} Log a meal</button>`}
 else{lab=ph.k==='low'?'Low calorie day':'Free day';big=`<b>${ph.k==='low'?inf.kcal:'No fast'}</b>`;sub=ph.k==='low'?'calories today':'eat normally today';btn=`<button class="btn big" data-a="startfast">Start a fast anyway</button><button class="btn ghost" data-a="addfood">${ico('plus',16)} Log a meal</button>`}
 const act=ph.k==='fast'?ph.act:null,stg=act?stageAt((now-act.s)/H1):null,nxt=act?nextStage((now-act.s)/H1):null;
 const tot=sumM(mealsOn(k)),wat=waterOn(k),ck=S.checks[k]||{};
 const planLine=inf.k==='win'?`Window ${fTs(w.s)} to ${fTs(w.e)}`:inf.k==='long'?`${inf.fastH} hour fast`:inf.k==='low'?`${inf.kcal} calories`:'No fasting today';
 const wk=[];for(let i=-3;i<=3;i++){const d=addDays(k,i),di=dayInfo(d),ok=doneFasts().some(f=>fastDay(f)===d&&fastOk(f));wk.push(`<button class="wd ${i===0?'now':''} ${ok?'ok':''} ${di.k==='free'?'off':''}" data-a="day" data-v="${d}"><small>${DOW[dparse(d).getDay()]}</small><b>${dparse(d).getDate()}</b><em>${ok?ico('check',12,3):esc(di.short)}</em></button>`)}
 const ctile=(l,v,m,u)=>`<div class="mt"><small>${l}</small><b>${v}</b><i><u style="width:${Math.min(100,m)}%"></u></i><span>${u}</span></div>`;
 return head(`${DOWL[new Date().getDay()]}, ${fDL(now)}`,greet,`<button class="stk ${st.cur?'':'z'}" data-a="tab" data-v="progress">${ico('flame',18)}<b>${st.cur}</b></button>`)+
 `<section class="card hero ${cls}"><div class="ringw">${ringSvg()}<div class="rc"><small>${lab}</small>${big}<span>${sub}</span></div></div><div class="hbtn">${btn}</div></section>`+
 `<button class="card strip" data-a="day" data-v="${k}"><span class="pl"><b>${esc(inf.name)}</b><small>${planLine}</small></span><span class="go">Change ${ico('chev',16)}</span></button>`+
 (stg?`<section class="card stage"><div class="lbl">Where you are</div><h3>${stg.n}</h3><p>${stg.d}</p>${nxt?`<div class="nx">Next: ${nxt.n} in ${hh((nxt.h*H1)-(now-act.s))}</div>`:''}<div class="tl">${STAGES.slice(0,8).map(s=>`<i class="${(now-act.s)/H1>=s.h?'on':''}" title="${s.h}h"></i>`).join('')}</div></section>`:'')+
 (ph.k==='eat'&&now-ph.since<3*H1?`<section class="card tip"><div class="lbl">Breaking your fast</div><p>${AFTERFAST[Math.floor(now/6e5)%AFTERFAST.length]}</p></section>`:'')+
 `<div class="tiles3 mts">${ctile('Calories',num(tot.k),tot.k/inf.kcal*100,'of '+num(inf.kcal))}${ctile('Protein',Math.round(tot.p)+' g',tot.p/S.tgt.p*100,'of '+S.tgt.p+' g')}<button class="mt wtr" data-a="water" data-v="250"><small>Water</small><b>${num(wat/1000,2)} L</b><i><u style="width:${Math.min(100,wat/S.tgt.water*100)}%"></u></i><span>${ico('plus',12,2.6)} 250 ml</span></button></div>`+
 `<section class="wkrow">${wk.join('')}</section>`+
 `<section class="card chk"><div class="lbl">How do you feel?</div>${[['e','Energy'],['h','Hunger'],['m','Mood']].map(([f,l])=>`<div class="cr"><span>${l}</span><div>${[1,2,3,4,5].map(n=>`<button class="dot ${ck[f]===n?'on':''}" data-a="chk" data-f="${f}" data-v="${n}">${n}</button>`).join('')}</div></div>`).join('')}</section>`}
function tick(force){const ph=phase(),now=Date.now();if(S.prof.done&&ph.k!==PH&&!force){PH=ph.k;if(!$('#layer .sheet.on'))render();return}
 const tm=$('#tm');if(ph.k==='fast'){const el=now-ph.since,f=el/(ph.goal*H1);if(tm)tm.textContent=clock(el);const pc=$('#pc');if(pc)pc.textContent=Math.round(f*100)+'%';setRing(f,force);$('.hero')?.classList.toggle('over',f>=1)}
 else if(tm){tm.textContent=hh(ph.left!=null?ph.left:ph.over||0);setRing(ph.k==='eat'?1-ph.left/ph.total:ph.k==='due'?1:0,force)}else setRing(0,force)}
setInterval(()=>{if(TAB==='today'&&S.prof.done&&!document.hidden)tick()},1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&S.prof.done&&TAB==='today')render()});

/* ---------- Plan ---------- */
function vPlan(){const P=S.plan,k=dkey(),inf=dayInfo(k),PP=PL[P.mode==='ramp'?planId(k):P.base]||PL['16-8'];const w=winOf(k);
 const rows=[];for(let i=0;i<30;i++){const d=addDays(k,i),di=dayInfo(d),ww=winOf(d),ov=P.ov[d];rows.push(`<button class="jr ${i===0?'now':''} ${ov?'ov':''}" data-a="day" data-v="${d}"><span class="dn"><b>Day ${i+1}</b><small>${fD(dparse(d))}</small></span><span class="jp ${di.k}">${esc(di.short)}</span><span class="jw">${ww?fTs(ww.s)+' to '+fTs(ww.e):di.k==='long'?fT(schedFast(d).s)+' start':di.k==='low'?di.kcal+' kcal':'Eat freely'}</span>${ico('chev',16)}</button>`)}
 const wkEd=P.mode==='week'?`<section class="card"><div class="lbl">Weekly pattern</div>${[1,2,3,4,5,6,0].map(d=>`<button class="wr" data-a="wkpick" data-v="${d}"><span>${DOWL[d]}</span><b class="jp ${P.week[d]&&P.week[d]!=='free'?'win':'free'}">${P.week[d]&&P.week[d]!=='free'?PL[P.week[d]].name:'Free'}</b>${ico('chev',16)}</button>`).join('')}</section>`:'';
 const eh=PP.kind==='long'?8:(PP.id==='custom'?24-P.cf:PP.eat);
 return head('Your schedule','Plan')+
 `<section class="card cur"><div class="curh"><div class="pw"><b>${inf.k==='win'?inf.fastH+'h':inf.k==='long'?inf.fastH+'h':'Flex'}</b><span>${inf.k==='win'||inf.k==='long'?'fast':'plan'}</span></div><div class="ct"><h2>${esc(PP.name)} <em>${esc(PP.title)}</em></h2><p>${P.mode==='ramp'?'Easing in: week by week up to '+PL[P.ramp[P.ramp.length-1]].name:P.mode==='week'?'Different plan on different weekdays':'Same plan every day'}</p></div></div>
  <div class="modes">${chips([['single','Every day'],['week','By weekday'],['ramp','Ease in']],P.mode,'mode')}</div>
  <button class="btn big" data-a="plans">Change plan</button></section>`+
 (PP.kind==='window'||PP.kind==='long'||P.mode!=='single'?`<section class="card"><div class="lbl">Eating window</div><div class="winrow"><label>Opens at<input class="in" type="time" id="eatT" value="${P.eat}"></label><div class="wcl"><small>Closes at</small><b>${w?fT(w.e):minHM(hmMin(P.eat)+eh*60)}</b></div></div><button class="link" data-a="suggest">${ico('sun',14)} Suggest a time for my sleep</button></section>`:'')+
 (PL[P.base].id==='5-2'?`<section class="card"><div class="lbl">Your two low days</div><div class="seg wide">${[1,2,3,4,5,6,0].map(d=>`<button class="chip ${P.r52.includes(d)?'on':''}" data-a="r52" data-v="${d}">${DOW[d]}</button>`).join('')}</div><p class="mini">Choose two days that are not next to each other.</p></section>`:'')+
 ((PL[P.base].kind==='long'||Object.values(P.week).some(x=>PL[x]&&PL[x].kind==='long')||Object.values(P.ov).some(x=>PL[x]&&PL[x].kind==='long'))?`<section class="card"><div class="lbl">Long fast days</div><div class="seg wide">${[1,2,3,4,5,6,0].map(d=>`<button class="chip ${P.longDays.includes(d)?'on':''}" data-a="long" data-v="${d}">${DOW[d]}</button>`).join('')}</div><p class="mini">One or two days a week, never back to back.</p></section>`:'')+
 wkEd+
 `<section class="card"><div class="lbl">Next 30 days</div><p class="mini" style="margin:0 0 6px">Tap any day to change just that day.</p><div class="jl">${rows.join('')}</div></section>`+
 `<button class="btn soft wide" data-a="ics">${ico('cal',18)} Add fasting reminders to my calendar</button>`+(Object.keys(P.ov).length?`<button class="link center" data-a="clrov">Clear all day changes</button>`:'')}

/* plan chooser and detail */
function openPlans(onPick){sheet(`${SX}<h2>Choose a plan</h2><p class="sub">Pick one to see details. You can change it any time.</p><div class="pl-list">${PLANS.filter(p=>p.id!=='custom').map(p=>`<button class="pc" data-p="${p.id}"><span class="pwx"><b>${p.kind==='days'?'7d':p.kind==='long'?p.fast+'h':p.fast+':'+p.eat}</b></span><span class="pt"><b>${p.name} <em>${p.title}</em></b><small>${p.tag}</small></span>${lvlDots(p.lvl)}</button>`).join('')}<button class="pc" data-p="custom"><span class="pwx"><b>Any</b></span><span class="pt"><b>Custom <em>Your own window</em></b><small>You choose</small></span>${lvlDots(2)}</button></div><div style="height:28px"></div>`,sh=>{sh.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;buzz();if(ONB&&!S.prof.done){ONB.pick=b.dataset.p;closeSheet();render();return}openPlanDetail(b.dataset.p,onPick)})},{tall:1})}
function openPlanDetail(id,onPick){const p=PL[id],cap=S.prof.flags.length||bmi(S.prof.wkg,S.prof.hcm)<18.5||S.prof.age<18;
 sheet(`${SX}<div class="pdh"><div class="pw"><b>${p.kind==='days'?'7d':id==='custom'?'Any':p.fast+'h'}</b><span>${p.kind==='window'?'fast':p.kind==='long'?'fast':'plan'}</span></div><div><h2>${p.name}</h2><small>${p.title} ${lvlDots(p.lvl)}</small></div></div>
 <p>${esc(p.desc)}</p><div class="lbl">Best for</div><p>${esc(p.best)}</p><div class="lbl">Tips</div><ul class="why">${p.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
 <div class="note ${p.lvl>=4?'warn':''}">${ico('info',18)}<div>${esc(p.watch)}</div></div>${cap&&p.lvl>=2?`<div class="note warn">${ico('warn',18)}<div>Based on your answers we suggest gentle plans only. Speak to a doctor before using this one.</div></div>`:''}
 ${id==='custom'?`<div class="lbl">Fasting hours</div><div class="stepper"><button data-a2="cm">-</button><b id="cf">${S.plan.cf}</b><button data-a2="cp">+</button></div>`:''}
 <div class="lbl">Use it</div><div class="uses">
 <button class="btn big" data-use="single">Every day</button>
 ${p.kind==='window'&&p.lvl>=2?`<button class="btn soft" data-use="ramp">Ease in over ${LADDER.indexOf(id)+1} weeks</button>`:''}
 <button class="btn soft" data-use="days">Only for a set number of days</button>
 <button class="btn soft" data-use="week">On chosen weekdays</button></div><div style="height:24px"></div>`,sh=>{
  sh.addEventListener('click',e=>{const b=e.target.closest('[data-use]'),s=e.target.closest('[data-a2]');
   if(s){const d=s.dataset.a2==='cp'?1:-1;S.plan.cf=Math.max(10,Math.min(23,S.plan.cf+d));$('#cf',sh).textContent=S.plan.cf;save();return}
   if(!b)return;buzz();const u=b.dataset.use;
   if(u==='single')applyPlan({mode:'single',base:id});
   else if(u==='ramp'){const t=id==='custom'?'16-8':id,i=LADDER.indexOf(t);applyPlan({mode:'ramp',base:t,ramp:LADDER.slice(0,i+1)})}
   else if(u==='days')askDays(id);else if(u==='week')askWeekdays(id)})})}
function applyPlan(o){const P=S.plan;P.mode=o.mode;if(o.base)P.base=o.base;if(o.ramp){P.ramp=o.ramp;P.rampStart=dkey();P.target=o.ramp[o.ramp.length-1]}else if(o.mode==='single'){P.ramp=[];P.target=P.base}
 const pl=PL[P.base];if(pl.kind==='days')P.adfStart=dkey();if(pl.kind!=='days'||true)P.eat=suggestEat(P.mode==='ramp'?P.target:P.base)||P.eat;
 save();closeSheet();TAB='plan';render();toast(PL[P.base].name+' is set')}
function askDays(id){sheet(`${SX}<h2>For how many days?</h2><p class="sub">Starting today. After that your normal plan returns.</p><div class="seg wide">${[3,7,14,21,30].map(n=>`<button class="chip" data-n="${n}">${n}</button>`).join('')}</div><div style="height:30px"></div>`,sh=>sh.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;const n=+b.dataset.n;for(let i=0;i<n;i++)S.plan.ov[addDays(dkey(),i)]=id;save();closeSheet();TAB='plan';render();toast(PL[id].name+' for '+n+' days')}))}
function askWeekdays(id){const sel=new Set();sheet(`${SX}<h2>Which weekdays?</h2><p class="sub">${PL[id].name} on these days. Other days keep what they have now.</p><div class="seg wide">${[1,2,3,4,5,6,0].map(d=>`<button class="chip" data-d="${d}">${DOW[d]}</button>`).join('')}</div><button class="btn big" id="wkgo" style="margin-top:18px">Apply</button><div style="height:24px"></div>`,sh=>{sh.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b){const d=+b.dataset.d;sel.has(d)?sel.delete(d):sel.add(d);b.classList.toggle('on')}});
  $('#wkgo',sh).onclick=()=>{if(!sel.size){toast('Pick at least one day');return}const P=S.plan,wk={};for(let i=0;i<7;i++){const d=addDays(dkey(),i),dw=dparse(d).getDay();wk[dw]=planId(d)}sel.forEach(d=>wk[d]=id);P.week=wk;P.mode='week';P.ov={};if(PL[id].kind==='days')P.adfStart=dkey();save();closeSheet();TAB='plan';render();toast('Weekly pattern saved')}})}
function openDay(k){const inf=dayInfo(k),ov=S.plan.ov[k],fs=doneFasts().filter(f=>fastDay(f)===k),ml=mealsOn(k),sm=sumM(ml);
 sheet(`${SX}<h2>${fD(dparse(k))}</h2><p class="sub">${esc(inf.name)}${inf.k==='win'?' . '+fT(winOf(k).s)+' to '+fT(winOf(k).e):''}</p>
 ${fs.length||ml.length?`<div class="tiles3 sm">${fs.length?`<div><b>${r1(Math.max(...fs.map(fh)))}h</b><small>fasted</small></div>`:''}${ml.length?`<div><b>${num(sm.k)}</b><small>kcal</small></div><div><b>${Math.round(sm.p)} g</b><small>protein</small></div>`:''}</div>`:''}
 <div class="lbl">Plan for this day</div><div class="seg wide wrap">${PLANS.filter(p=>p.id!=='custom').map(p=>`<button class="chip ${planId(k)===p.id?'on':''}" data-pl="${p.id}">${p.name}</button>`).join('')}<button class="chip ${planId(k)==='free'?'on':''}" data-pl="free">Free day</button></div>
 ${ov?`<button class="link center" data-pl="">Back to my normal schedule</button>`:''}<div style="height:24px"></div>`,sh=>sh.addEventListener('click',e=>{const b=e.target.closest('[data-pl]');if(!b)return;buzz();const v=b.dataset.pl;if(v)S.plan.ov[k]=v;else delete S.plan.ov[k];if(v==='5-2'||v==='adf')S.plan.adfStart=S.plan.adfStart||dkey();save();closeSheet();render()}))}

/* ---------- Fast sheets ---------- */
function openStart(){const ts=Date.now(),g0=goalFor(ts);let st=ts,g=g0;
 sheet(`${SX}<h2>Start a fast</h2><div class="lbl">Started</div><div class="seg wide">${[['0','Now'],['15','15 min ago'],['30','30 min ago'],['60','1 hour ago'],['120','2 hours ago']].map(([m,l],i)=>`<button class="chip ${i===0?'on':''}" data-m="${m}">${l}</button>`).join('')}</div><input class="in" type="datetime-local" id="sts" value="${dtl(ts)}">
 <div class="lbl">Goal</div><div class="stepper big"><button data-g="-1">-</button><b id="sg">${g}h</b><button data-g="1">+</button></div><div class="seg wide wrap">${[12,14,16,18,20,24,36].map(h=>`<button class="chip ${h===g?'on':''}" data-h="${h}">${h}h</button>`).join('')}</div>
 <button class="btn big" id="sgo" style="margin-top:18px">Start fasting</button><div style="height:20px"></div>`,sh=>{
  const setG=v=>{g=Math.max(1,Math.min(72,v));$('#sg',sh).textContent=g+'h';$$('[data-h]',sh).forEach(b=>b.classList.toggle('on',+b.dataset.h===g))};
  sh.addEventListener('click',e=>{const m=e.target.closest('[data-m]'),gg=e.target.closest('[data-g]'),h=e.target.closest('[data-h]');
   if(m){$$('[data-m]',sh).forEach(x=>x.classList.toggle('on',x===m));st=Date.now()-(+m.dataset.m)*6e4;$('#sts',sh).value=dtl(st)}
   if(gg)setG(g+ +gg.dataset.g);if(h)setG(+h.dataset.h)});
  $('#sts',sh).onchange=e=>{const t=fromDtl(e.target.value);if(t){st=t;$$('[data-m]',sh).forEach(x=>x.classList.remove('on'))}};
  $('#sgo',sh).onclick=()=>{if(st>Date.now()+6e4){toast('The start time is in the future');return}startFast(st,g);buzz();closeSheet();render()}})}
function openEnd(){const a=activeFast();if(!a)return;const el=Date.now()-a.s;
 sheet(`${SX}<h2>End this fast?</h2><p class="sub">You have fasted ${hh(el)}${el>=a.g*H1?' and reached your goal':', '+hh(a.g*H1-el)+' short of your goal'}.</p><button class="btn big stop" id="eg">End fast now</button><button class="btn ghost" data-a="close">Keep fasting</button><div style="height:20px"></div>`,sh=>{$('#eg',sh).onclick=()=>{const f=endFast();buzz();render();openDone(f)}})}
function openDone(f){const h=fh(f),ok=fastOk(f),stg=stageAt(h),st=streak();
 sheet(`${SX}<div class="done ${ok?'win':''}"><div class="dbig">${ok?ico('check',40,2.6):ico('moon',36)}</div><h2>${ok?'Goal reached':'Fast complete'}</h2><b class="dh">${r1(h)}<small>hours</small></b><p>${ok?'You reached '+esc(stg.n.toLowerCase())+'.':'Every hour counts. You reached '+esc(stg.n.toLowerCase())+'.'}${st.cur>1?` That is ${st.cur} days in a row.`:''}</p></div>
 <div class="note">${ico('leaf',18)}<div>${AFTERFAST[0]}</div></div><button class="btn big" data-a="addfood">Log your first meal</button><button class="btn ghost" data-a="close">Done</button><div style="height:20px"></div>`)}
function openFastEdit(id,isNew){let f=S.fasts.find(x=>x.id===id);const nu=!f;if(nu)f={id:uid(),s:Date.now()-16*H1,e:Date.now(),g:16,p:'',n:''};
 sheet(`${SX}<h2>${nu?'Add a past fast':'Edit fast'}</h2><div class="lbl">Started</div><input class="in" type="datetime-local" id="fs" value="${dtl(f.s)}">${f.e||nu?`<div class="lbl">Ended</div><input class="in" type="datetime-local" id="fe" value="${dtl(f.e||Date.now())}">`:''}
 <div class="lbl">Goal (hours)</div><input class="in" id="fg" inputmode="numeric" value="${f.g}"><div class="lbl">Note</div><input class="in" id="fn" maxlength="120" placeholder="Optional" value="${esc(f.n)}">
 <button class="btn big" id="fsv" style="margin-top:18px">Save</button>${nu?'':`<button class="btn ghost danger" id="fdl">${ico('trash',16)} Delete this fast</button>`}<div style="height:20px"></div>`,sh=>{
  $('#fsv',sh).onclick=()=>{const s=fromDtl($('#fs',sh).value),eEl=$('#fe',sh),e=eEl?fromDtl(eEl.value):null;if(!s||s>Date.now()+6e4){toast('Check the start time');return}if(eEl&&(!e||e<=s)){toast('The end must be after the start');return}if(e&&e>Date.now()+6e4){toast('The end is in the future');return}
   f.s=s;if(eEl)f.e=e;f.g=Math.max(1,Math.min(72,parseInt($('#fg',sh).value)||f.g));f.n=$('#fn',sh).value.slice(0,120);if(nu)S.fasts.push(f);save();closeSheet();render()};
  const dl=$('#fdl',sh);if(dl)dl.onclick=()=>{const keep=S.fasts.slice();S.fasts=S.fasts.filter(x=>x.id!==f.id);save();closeSheet();render();toast('Fast deleted',()=>{S.fasts=keep;save();render()})}})}

/* ---------- Eat ---------- */
function vEat(){const k=FOODDAY,ml=mealsOn(k),tot=sumM(ml),inf=dayInfo(k),isT=k===dkey(),T=S.tgt,w=winOf(k);
 const f=Math.min(1,tot.k/inf.kcal),C=2*Math.PI*46;const pc=Math.round(tot.p/T.p*100);
 const mac=(l,v,t,c)=>`<div class="mc"><span><b>${l}</b>${Math.round(v)} g</span><i><u style="width:${Math.min(100,t?v/t*100:0)}%;background:${c}"></u></i></div>`;
 const carbT=Math.round(inf.kcal*.4/4),fatT=Math.round(inf.kcal*.3/9);
 const groups=MEALTYPES.map(([mt,l])=>{const it=ml.filter(m=>m.mt===mt);return it.length?`<div class="mg"><div class="lbl">${l} <span>${num(it.reduce((a,m)=>a+m.k,0))} kcal</span></div>${it.map(m=>`<button class="mi" data-a="meal" data-v="${m.id}"><span><b>${esc(m.n)}</b><small>${fT(m.t)}${w&&(m.t<w.s||m.t>w.e)?' . outside window':''}</small></span><em>${num(m.k)}<small>kcal</small></em></button>`).join('')}</div>`:''}).join('');
 const wat=waterOn(k),glass=Math.ceil(T.water/250);
 return head(isT?'Today':fDL(dparse(k)),'Eat',`<div class="dnav"><button class="ib" data-a="fday" data-v="-1" aria-label="Previous day">${ico('back',18)}</button><button class="ib" data-a="fday" data-v="1" ${isT?'disabled':''} aria-label="Next day">${ico('chev',18)}</button></div>`)+
 `<section class="card kc"><div class="kr"><svg viewBox="0 0 110 110" width="116" height="116"><circle cx="55" cy="55" r="46" class="trk"/><circle cx="55" cy="55" r="46" class="arc" transform="rotate(-90 55 55)" stroke="url(#rg)" style="stroke-dasharray:${C};stroke-dashoffset:${C*(1-f)}"/><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--a)"/><stop offset="1" stop-color="var(--a2)"/></linearGradient></defs></svg><div class="kn"><b>${num(tot.k)}</b><small>of ${num(inf.kcal)} kcal</small></div></div>
  <div class="macs">${mac('Protein',tot.p,T.p,'var(--a)')}${mac('Carbs',tot.c,carbT,'var(--a3)')}${mac('Fat',tot.f,fatT,'var(--a2)')}</div></section>
 ${inf.kcal-tot.k<0?`<div class="note warn">${ico('info',18)}<div>You are ${num(tot.k-inf.kcal)} kcal over today's target.</div></div>`:''}
 <button class="btn big" data-a="addfood">${ico('plus',18)} Add food</button>
 ${groups||`<section class="empty"><p>Nothing logged ${isT?'yet today':'this day'}.</p></section>`}
 <section class="card"><div class="lbl">Water <span>${num(wat/1000,2)} of ${num(T.water/1000,1)} L</span></div><div class="gl">${Array.from({length:Math.min(14,glass)},(_,i)=>`<i class="${wat>=(i+1)*250?'on':''}">${ico('drop',16)}</i>`).join('')}</div><div class="seg wide"><button class="chip" data-a="water" data-v="250" data-d="${k}">+250 ml</button><button class="chip" data-a="water" data-v="500" data-d="${k}">+500 ml</button><button class="chip" data-a="water" data-v="-250" data-d="${k}">-250 ml</button></div></section>
 <p class="credit">Food data from Open Food Facts (ODbL). Calorie values are estimates.</p>`}

/* food search */
let OFFC={};
async function offGet(url){const c=new AbortController();const t=setTimeout(()=>c.abort(),9000);try{const r=await fetch(url,{signal:c.signal,headers:{Accept:'application/json'},credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw new Error('http');return await r.json()}finally{clearTimeout(t)}}
const FLDS='code,product_name,brands,serving_size,serving_quantity,nutriments';
function offItem(p){const n=p&&p.nutriments||{};let k=+n['energy-kcal_100g'];if(!(k>=0)){const kj=+n['energy_100g'];k=kj>0?kj/4.184:NaN}if(!(k>=0))return null;const nm=String(p.product_name||'').trim();if(!nm)return null;
 const sg=parseFloat(p.serving_quantity);return{n:nm.slice(0,80),b:String(p.brands||'').split(',')[0].trim().slice(0,40),per:1,k:k,p:+n.proteins_100g||0,c:+n.carbohydrates_100g||0,f:+n.fat_100g||0,sg:sg>0&&sg<2000?sg:0,src:'off'}}
async function offSearch(q){const key='s:'+q;if(OFFC[key])return OFFC[key];const j=await offGet(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=20&fields=${FLDS}`);const r=(j.products||[]).map(offItem).filter(Boolean);OFFC[key]=r;return r}
async function offCode(c){const j=await offGet(`https://world.openfoodfacts.org/api/v2/product/${c}.json?fields=${FLDS}`);return j&&j.status===1?offItem(j.product):null}
const qf=([n,s,k,p,c,f])=>({n,b:s,per:0,k,p,c,f,src:'q'});
function openFood(){let tab='q',timer=0;const recent=(()=>{const seen=new Set(),o=[];for(const m of [...S.meals].sort((a,b)=>b.t-a.t)){const key=m.n.toLowerCase();if(seen.has(key))continue;seen.add(key);o.push({n:m.n,b:'Recent',per:0,k:m.k,p:m.p,c:m.c,f:m.f,src:'r'});if(o.length>=30)break}return o})();
 const hasBD='BarcodeDetector' in window;
 sheet(`${SX}<h2>Add food</h2><div class="seg wide">${[['q','Quick'],['s','Search'],['r','Recent'],['m','Manual']].map(([k,l])=>`<button class="chip ${k===tab?'on':''}" data-t="${k}">${l}</button>`).join('')}</div><div id="ft"></div>`,sh=>{
  const ft=$('#ft',sh),list=(arr,empty)=>arr.length?arr.map((x,i)=>`<button class="fi" data-i="${i}"><span><b>${esc(x.n)}</b><small>${esc(x.b||'')}${x.per?' . per 100 g':''}</small></span><em>${Math.round(x.k)}<small>kcal</small></em></button>`).join(''):`<p class="mini c">${empty}</p>`;
  let cur=[];const show=arr=>{cur=arr;$('#fl',sh).innerHTML=list(arr,'Nothing found.')};
  const draw=()=>{$$('[data-t]',sh).forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
   if(tab==='q'){ft.innerHTML=`<input class="in" id="fq" placeholder="Filter quick foods" autocomplete="off"><div id="fl" class="fl2"></div>`;const all=FOODS.map(qf);show(all);$('#fq',sh).oninput=e=>{const q=e.target.value.toLowerCase();show(all.filter(x=>x.n.toLowerCase().includes(q)))}}
   else if(tab==='s'){ft.innerHTML=`<div class="srow"><input class="in" id="fq" placeholder="Search any food or brand" autocomplete="off" enterkeyhint="search"><button class="ib" id="bsc" aria-label="Scan barcode">${ico('barcode',20)}</button></div><input class="in" id="bc" inputmode="numeric" placeholder="Or type a barcode number"><div id="fl" class="fl2"><p class="mini c">Search 3 million products from Open Food Facts.</p></div><video id="bv" playsinline muted hidden></video>`;
    const go=async q=>{if(q.length<2)return;$('#fl',sh).innerHTML='<p class="mini c">Searching...</p>';try{show(await offSearch(q))}catch(e){$('#fl',sh).innerHTML='<p class="mini c">Could not reach the food database. Check your connection or use Quick or Manual.</p>'}};
    $('#fq',sh).oninput=e=>{clearTimeout(timer);const q=e.target.value.trim();timer=setTimeout(()=>go(q),550)};
    $('#bc',sh).onchange=async e=>{const c=e.target.value.trim();if(!/^\d{6,14}$/.test(c)){toast('Enter 6 to 14 digits');return}$('#fl',sh).innerHTML='<p class="mini c">Looking up...</p>';try{const it=await offCode(c);if(it){show([it])}else $('#fl',sh).innerHTML='<p class="mini c">Product not found.</p>'}catch(err){$('#fl',sh).innerHTML='<p class="mini c">Could not reach the food database.</p>'}};
    $('#bsc',sh).onclick=()=>scan(sh,async c=>{$('#bc',sh).value=c;$('#bc',sh).dispatchEvent(new Event('change'))},hasBD)}
   else if(tab==='r'){ft.innerHTML=`<div id="fl" class="fl2"></div>`;show(recent);$('#fl',sh).innerHTML=list(recent,'Your recent meals show up here.')}
   else{ft.innerHTML=`<label class="fl">Name<input class="in" id="mn" maxlength="80" placeholder="e.g. Lunch at work"></label><div class="two"><label class="fl">Calories<input class="in" id="mk" inputmode="decimal"></label><label class="fl">Protein g<input class="in" id="mp" inputmode="decimal"></label></div><div class="two"><label class="fl">Carbs g<input class="in" id="mc" inputmode="decimal"></label><label class="fl">Fat g<input class="in" id="mf" inputmode="decimal"></label></div><button class="btn big" id="mgo">Continue</button>`;
    $('#mgo',sh).onclick=()=>{const k=parseFloat($('#mk',sh).value);if(!(k>=0)){toast('Add the calories');return}foodQty({n:$('#mn',sh).value.trim()||'Meal',b:'Manual',per:0,k,p:+$('#mp',sh).value||0,c:+$('#mc',sh).value||0,f:+$('#mf',sh).value||0,src:'m'})}}};
  sh.addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(t){tab=t.dataset.t;draw();return}const i=e.target.closest('[data-i]');if(i&&cur[+i.dataset.i])foodQty(cur[+i.dataset.i])});draw()},{tall:1})}
async function scan(sh,cb,ok){const v=$('#bv',sh);if(!ok){toast('Scanning is not supported here. Type the number instead.');return}
 try{const st=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});v.hidden=false;v.srcObject=st;await v.play();const bd=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e']});let live=true;
  const stop=()=>{live=false;st.getTracks().forEach(t=>t.stop());v.hidden=true};setTimeout(stop,30000);
  const loop=async()=>{if(!live)return;try{const r=await bd.detect(v);if(r.length){stop();buzz();cb(r[0].rawValue);return}}catch(e){}requestAnimationFrame(loop)};loop()}catch(e){toast('Could not open the camera')}}
function mealTypeNow(t=Date.now()){const h=new Date(t).getHours();return h<11?'b':h<15?'l':h<21?'d':'s'}
function foodQty(it,edit){const per=it.per,def=per?(it.sg||100):1;let q=def,mt=edit?edit.mt:mealTypeNow(),t=edit?edit.t:Date.now();
 const val=()=>{const f=per?q/100:q;return{k:Math.round(it.k*f),p:r1(it.p*f),c:r1(it.c*f),f:r1(it.f*f)}};
 sheet(`${SX}<h2>${esc(it.n)}</h2><p class="sub">${esc(it.b||'')}${per?' . values per 100 g':''}</p>
 <div class="lbl">${per?'Amount in grams':'Servings'}</div><div class="qrow">${per?'':`<button class="ib" data-q="-.5">-</button>`}<input class="in lg" id="qq" inputmode="decimal" value="${q}">${per?'':`<button class="ib" data-q=".5">+</button>`}</div>
 <div class="tiles3 sm" id="qv"></div><div class="lbl">Meal</div><div class="seg wide">${MEALTYPES.map(([k,l])=>`<button class="chip ${k===mt?'on':''}" data-mt="${k}">${l}</button>`).join('')}</div><div class="lbl">Time</div><input class="in" type="datetime-local" id="qt" value="${dtl(t)}">
 <button class="btn big" id="qgo" style="margin-top:18px">${edit?'Save':'Add to my day'}</button>${edit?`<button class="btn ghost danger" id="qdl">${ico('trash',16)} Delete</button>`:''}<div style="height:20px"></div>`,sh=>{
  const upd=()=>{const v=val();$('#qv',sh).innerHTML=`<div><b>${num(v.k)}</b><small>kcal</small></div><div><b>${v.p}</b><small>protein g</small></div><div><b>${v.c}</b><small>carbs g</small></div><div><b>${v.f}</b><small>fat g</small></div>`};upd();
  $('#qq',sh).oninput=e=>{const n=parseFloat(e.target.value);q=n>0?Math.min(n,per?5000:50):0;upd()};
  sh.addEventListener('click',e=>{const m=e.target.closest('[data-mt]'),b=e.target.closest('[data-q]');if(m){mt=m.dataset.mt;$$('[data-mt]',sh).forEach(x=>x.classList.toggle('on',x===m))}if(b){q=Math.max(.5,r1(q+ +b.dataset.q));$('#qq',sh).value=q;upd()}});
  $('#qt',sh).onchange=e=>{const x=fromDtl(e.target.value);if(x)t=x};
  $('#qgo',sh).onclick=()=>{if(!(q>0)){toast('Enter an amount');return}const v=val();const nm=it.n+(per?` (${Math.round(q)} g)`:q!==1?` x${q}`:'');
   if(edit){Object.assign(edit,{n:edit.n,k:v.k,p:v.p,c:v.c,f:v.f,mt,t});save();closeSheet();render();return}
   const m={id:uid(),t,n:nm,k:v.k,p:v.p,c:v.c,f:v.f,mt,src:it.src||''};const a=activeFast();
   if(a&&t>=a.s&&t<=Date.now()+6e4){askBreak(m,a)}else{S.meals.push(m);save();closeSheet();FOODDAY=dkey(t);render();toast('Added')}};
  const dl=$('#qdl',sh);if(dl)dl.onclick=()=>{const keep=S.meals.slice();S.meals=S.meals.filter(x=>x.id!==edit.id);save();closeSheet();render();toast('Meal deleted',()=>{S.meals=keep;save();render()})}})}
function askBreak(m,a){sheet(`${SX}<div class="done"><div class="dbig">${ico('fork',34)}</div><h2>You are fasting</h2><p>Eating now ends your fast after ${hh(m.t-a.s)}${m.t-a.s>=a.g*H1?', goal reached':''}.</p></div><button class="btn big" id="bk">End fast and log meal</button><button class="btn soft" id="lg">Log meal, keep fasting</button><button class="btn ghost" data-a="close">Cancel</button><div style="height:20px"></div>`,sh=>{
  $('#bk',sh).onclick=()=>{S.meals.push(m);const f=endFast(m.t);save();closeSheet();FOODDAY=dkey(m.t);render();toast('Fast ended at '+fT(m.t))};
  $('#lg',sh).onclick=()=>{S.meals.push(m);save();closeSheet();FOODDAY=dkey(m.t);render();toast('Logged')}})}

/* ---------- Progress ---------- */
function vProgress(){const st=stats(),sk=streak(),wk=weekHours(),w=weightTrend();
 const mx=Math.max(24,...wk.map(x=>Math.max(x.h,x.g)));
 const bars=wk.map(x=>`<div class="bc"><i style="height:${x.h/mx*100}%" class="${x.g&&x.h>=x.g*.9?'ok':''}"></i>${x.g?`<u style="bottom:${x.g/mx*100}%"></u>`:''}<small>${DOW[dparse(x.k).getDay()][0]}</small><b>${x.h?Math.round(x.h):''}</b></div>`).join('');
 const mon=addDays(dkey(),-((dparse(dkey()).getDay()+6)%7)-28),cells=[];for(let i=0;i<35;i++){const d=addDays(mon,i),h=doneFasts().filter(f=>fastDay(f)===d).reduce((a,f)=>Math.max(a,fh(f)),0),g=dayInfo(d).fastH||16;const lv=d>dkey()?-1:h>=g*.9?4:h>=12?3:h>=8?2:h>0?1:0;cells.push(`<button class="hc l${lv}" data-a="day" data-v="${d}" title="${d}"></button>`)}
 const ener=(()=>{const A=[],B=[];for(const k of Object.keys(S.checks)){const e=S.checks[k].e;if(!e)continue;const long=doneFasts().some(f=>fastDay(f)===k&&fh(f)>=16);(long?A:B).push(e)}if(A.length<3||B.length<3)return`<p class="mini">Check in each day on the Today tab. After a few days you will see how long fasts change your energy.</p>`;const a=A.reduce((x,y)=>x+y,0)/A.length,b=B.reduce((x,y)=>x+y,0)/B.length;return`<div class="cmp"><div><b>${a.toFixed(1)}</b><small>energy on 16h+ days</small></div><div><b>${b.toFixed(1)}</b><small>other days</small></div></div>`})();
 const hist=[...doneFasts()].reverse().slice(0,12).map(f=>`<button class="hrow" data-a="editfast" data-v="${f.id}"><span><b>${fD(f.s)}</b><small>${fT(f.s)} to ${fT(f.e)}</small></span><em class="${fastOk(f)?'ok':''}">${r1(fh(f))}h</em>${ico('chev',16)}</button>`).join('');
 return head('Your numbers','Progress')+
 `<div class="tiles4"><div><b>${sk.cur}</b><small>day streak</small></div><div><b>${sk.best}</b><small>best streak</small></div><div><b>${Math.round(st.tot)}</b><small>hours fasted</small></div><div><b>${st.avg?r1(st.avg):0}</b><small>avg hours</small></div></div>`+
 `<section class="card"><div class="lbl">This week <span>hours fasted</span></div><div class="bars">${bars}</div></section>`+
 `<section class="card"><div class="lbl">Last 5 weeks</div><div class="hm"><small>M</small><small>T</small><small>W</small><small>T</small><small>F</small><small>S</small><small>S</small>${cells.join('')}</div></section>`+
 `<section class="card"><div class="lbl">Weight ${w.length?`<button class="link" data-a="addw">${ico('plus',14)} Add</button>`:''}</div>${w.length>1?wChart(w):`<p class="mini">${w.length?'Add another weigh in to see your trend.':'Log your weight to see your trend.'}</p>`}${w.length?wStats(w):`<button class="btn soft" data-a="addw">${ico('scale',16)} Log weight</button>`}</section>`+
 `<section class="card"><div class="lbl">Energy and fasting</div>${ener}</section>`+
 `<section class="card"><div class="lbl">Achievements <span>${ACH.filter(a=>a.ok()).length} of ${ACH.length}</span></div><div class="ach">${ACH.map(a=>{const o=a.ok();return`<div class="${o?'on':''}"><i>${ico(a.ic,22)}</i><b>${a.n}</b><small>${a.d}</small></div>`}).join('')}</div></section>`+
 `<section class="card"><div class="lbl">Recent fasts <button class="link" data-a="addpast">${ico('plus',14)} Add past fast</button></div>${hist||'<p class="mini">Your finished fasts will show here.</p>'}</section>`}
function wChart(w){const W=300,Hh=110,p=14,v=w.map(x=>wDisp(x.kg)),gw=S.prof.gw?wDisp(S.prof.gw):null;let lo=Math.min(...v,...(gw?[gw]:[])),hi=Math.max(...v,...(gw?[gw]:[]));if(hi-lo<2){hi+=1;lo-=1}
 const t0=w[0].t,t1=w[w.length-1].t||t0+1,X=t=>p+(t1===t0?.5:(t-t0)/(t1-t0))*(W-2*p),Y=x=>p+(1-(x-lo)/(hi-lo))*(Hh-2*p);
 const pts=w.map((x,i)=>[X(x.t),Y(v[i])]);const d=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join('');
 return`<svg class="wc" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Weight over time">${gw?`<line x1="${p}" x2="${W-p}" y1="${Y(gw)}" y2="${Y(gw)}" class="gl2"/>`:''}<path d="${d}" class="wl"/>${pts.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="3.2"/>`).join('')}</svg>`}
function wStats(w){const a=w[0],b=w[w.length-1],ch=b.kg-a.kg,bm=bmi(b.kg,S.prof.hcm);return`<div class="tiles3 sm"><div><b>${wDisp(b.kg)}</b><small>${wUnit()} now</small></div><div><b>${ch>0?'+':''}${r1(wDisp(ch*1)-0)}</b><small>${wUnit()} since start</small></div><div><b>${bm.toFixed(1)}</b><small>BMI, ${bmiLabel(bm).toLowerCase()}</small></div></div>`}
function openWeight(){sheet(`${SX}<h2>Log weight</h2><label class="fl">Weight (${wUnit()})<input class="in lg" id="ww" inputmode="decimal" value="${S.weights.length?wDisp(weightTrend().slice(-1)[0].kg):wDisp(S.prof.wkg)}"></label><label class="fl">Waist (cm) <small>optional</small><input class="in" id="wc" inputmode="decimal"></label><label class="fl">When<input class="in" type="datetime-local" id="wt" value="${dtl(Date.now())}"></label><button class="btn big" id="wgo">Save</button><div style="height:20px"></div>`,sh=>{
 $('#wgo',sh).onclick=()=>{const kg=wIn(parseFloat($('#ww',sh).value));if(!(kg>25&&kg<350)){toast('Check the weight');return}const t=fromDtl($('#wt',sh).value)||Date.now();S.weights.push({id:uid(),t,kg,wc:parseFloat($('#wc',sh).value)||0});const last=weightTrend().slice(-1)[0];S.prof.wkg=last.kg;recalc();save();closeSheet();render();toast('Weight saved')}})}

/* ---------- Me ---------- */
function vMe(){const p=S.prof,c=calc(),bk=S.set.lastBackup,days=bk?Math.floor((Date.now()-bk)/D1):null;
 const row=(a,ic,t,s,v='')=>`<button class="sr" data-a="${a}" ${v?`data-v="${v}"`:''}><i>${ico(ic,20)}</i><span><b>${t}</b><small>${s}</small></span>${ico('chev',16)}</button>`;
 return head('Settings','Me')+
 `<section class="card prof"><div class="pg"><div><b>${wDisp(p.wkg)}</b><small>${wUnit()}</small></div><div><b>${hDisp(p.hcm)}</b><small>height</small></div><div><b>${c.bmi.toFixed(1)}</b><small>BMI</small></div></div><div class="tiles3 sm"><div><b>${num(S.tgt.kcal)}</b><small>kcal</small></div><div><b>${S.tgt.p} g</b><small>protein</small></div><div><b>${(S.tgt.water/1000).toFixed(1)} L</b><small>water</small></div></div><button class="btn soft wide" data-a="editprof">${ico('edit',16)} Update my details</button><p class="mini">${bmiLabel(c.bmi)}. Estimates use the Mifflin St Jeor formula.</p></section>`+
 `<section class="group"><div class="gt">Look</div><div class="card"><div class="lbl">Theme</div><div class="seg wide">${chips([['auto','Auto'],['light','Light'],['dark','Dark']],S.set.theme,'theme')}</div><div class="lbl" style="margin-top:14px">Units</div><div class="two"><div class="seg">${chips([['kg','kg'],['lb','lb']],p.units.w,'unit','data-k="w"')}</div><div class="seg">${chips([['cm','cm'],['ft','ft in']],p.units.h,'unit','data-k="h"')}</div></div></div></section>`+
 `<section class="group"><div class="gt">Your plan</div>${row('tab','cal','Schedule and plan',esc(PL[S.plan.base].name)+' . '+S.plan.mode,'plan')}${row('ics','clock','Calendar reminders','Add fast start times to your calendar')}${row('redo','swap','Run setup again','Re-answer the questions for a new recommendation')}</section>`+
 `<section class="group"><div class="gt">Your data</div><div class="card save ${days===null||days>7?'warn':''}"><i>${ico(days===null||days>7?'warn':'check',20)}</i><div><b>${days===null?'Not backed up yet':days===0?'Backed up today':'Backed up '+days+' days ago'}</b><small>Saved on this device. A backup file protects you if you clear your browser.</small></div></div>${row('backup','save','Back up now','Save a backup file')}${row('restore','restore','Restore a backup','Pick a FastTrack backup file')}${row('csv','down','Export as CSV','Fasts, meals and weights for a spreadsheet')}</section>`+
 `<section class="group"><div class="gt">Good to know</div><div class="card safety">${ico('info',18)}<div><b>Fasting safely</b><p>FastTrack is a tracking tool, not medical advice. Avoid fasting if you are under 18, pregnant or breastfeeding, underweight, or have had an eating disorder. If you take medication or have diabetes, talk to your doctor first. Stop and eat if you feel faint, dizzy or unwell.</p></div></div></section>`+
 `<section class="group"><div class="gt">About</div><div class="card"><b>FastTrack ${VER}</b><p class="mini" style="margin:4px 0 0">Open source. Your data stays on this device. Food data from Open Food Facts.</p></div>${row('chkupd','swap','Check for updates','Looks for a newer version')}${row('wipe','trash','Erase everything','Removes all fasts, meals and weights from this device')}</section>`}
function openProfile(){const p=S.prof;let d=JSON.parse(JSON.stringify({units:p.units,sex:p.sex,goal:p.goal,exp:p.exp,act:p.act}));
 const lb=p.units.w==='lb',ft=p.units.h==='ft',t=Math.round(p.hcm/2.54);
 sheet(`${SX}<h2>Your details</h2><label class="fl">Weight (${wUnit()})<input class="in" id="pw" inputmode="decimal" value="${wDisp(p.wkg)}"></label>${ft?`<div class="two"><label class="fl">Feet<input class="in" id="pft" inputmode="numeric" value="${Math.floor(t/12)}"></label><label class="fl">Inches<input class="in" id="pin" inputmode="numeric" value="${t%12}"></label></div>`:`<label class="fl">Height (cm)<input class="in" id="ph" inputmode="decimal" value="${Math.round(p.hcm)}"></label>`}
 <label class="fl">Age<input class="in" id="pa" inputmode="numeric" value="${p.age}"></label><label class="fl">Goal weight (${wUnit()}) <small>optional</small><input class="in" id="pg" inputmode="decimal" value="${p.gw?wDisp(p.gw):''}"></label>
 <div class="lbl">Sex</div><div class="seg wide">${chips([['f','Female'],['m','Male'],['x','Prefer not to say']],p.sex,'psex')}</div>
 <div class="lbl">Goal</div><div class="seg wide wrap">${chips([['lose','Lose weight'],['energy','Energy'],['health','Health'],['keep','Maintain']],p.goal,'pgoal')}</div>
 <div class="lbl">Activity</div><div class="seg wide wrap">${chips([[1.2,'Sitting'],[1.375,'Light'],[1.55,'Moderate'],[1.725,'Very active']],p.act,'pact')}</div>
 <div class="two"><label class="fl">Wake<input class="in" type="time" id="pwk" value="${p.wake}"></label><label class="fl">Bed<input class="in" type="time" id="psl" value="${p.sleep}"></label></div>
 <button class="btn big" id="psv">Save</button><div style="height:20px"></div>`,sh=>{
  sh.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const a=b.dataset.a,v=b.dataset.v;const g=a==='psex'?'sex':a==='pgoal'?'goal':a==='pact'?'act':null;if(!g)return;d[g]=g==='act'?+v:v;$$(`[data-a="${a}"]`,sh).forEach(x=>x.classList.toggle('on',x===b))});
  $('#psv',sh).onclick=()=>{const w=wIn(parseFloat($('#pw',sh).value));let h=p.hcm;if(ft){const a=parseFloat($('#pft',sh).value),i=parseFloat($('#pin',sh).value)||0;h=(a*12+i)*2.54}else h=parseFloat($('#ph',sh).value);const a=parseInt($('#pa',sh).value);
   if(!(w>25&&w<350&&h>100&&h<230&&a>=10&&a<=100)){toast('Please check the numbers');return}const gw=parseFloat($('#pg',sh).value);
   Object.assign(p,{wkg:w,hcm:h,age:a,sex:d.sex,goal:d.goal,act:d.act,wake:$('#pwk',sh).value||p.wake,sleep:$('#psl',sh).value||p.sleep,gw:gw>0?wIn(gw):0});recalc();save();closeSheet();render();toast('Details updated')}})}

/* ---------- actions ---------- */
async function doBackup(){const ok=await shareFile(`FastTrack-backup-${dkey()}.json`,exportJSON(),'application/json');if(ok){S.set.lastBackup=Date.now();S.set.bkN++;save();render();toast('Backup saved')}}
function doRestore(){const i=document.createElement('input');i.type='file';i.accept='.json,application/json';i.onchange=async()=>{const f=i.files[0];if(!f)return;if(f.size>30e6){toast('That file is too large');return}try{const t=await f.text();JSON.parse(t);sheet(`${SX}<h2>Replace your data?</h2><p class="sub">This replaces everything on this device with the backup. Back up first if you are unsure.</p><button class="btn big" id="rg2">Restore</button><button class="btn ghost" data-a="close">Cancel</button><div style="height:20px"></div>`,sh=>{$('#rg2',sh).onclick=()=>{try{restoreText(t);closeSheet();TAB='today';render();toast('Backup restored')}catch(e){toast(e.message||'Restore failed')}}})}catch(e){toast('That file is not a FastTrack backup.')}};i.click()}
function wipe(){sheet(`${SX}<h2>Erase everything?</h2><p class="sub">This removes all data from this device and cannot be undone. Back up first if you want to keep it.</p><button class="btn big stop" id="wp">Erase everything</button><button class="btn ghost" data-a="close">Cancel</button><div style="height:20px"></div>`,sh=>{$('#wp',sh).onclick=()=>{try{localStorage.removeItem(KEY)}catch(e){}S=defState();closeSheet();ONB=null;render()}})}
function applyTheme(){const t=S.set.theme;document.documentElement.dataset.theme=t==='auto'?'':t;const dark=t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);document.querySelectorAll('meta[name=theme-color]').forEach(m=>m.remove());const m=document.createElement('meta');m.name='theme-color';m.content=dark?'#0d0e13':'#f7f2ea';document.head.appendChild(m)}
let UPD=false;async function chkUpdate(manual){try{const r=await fetch('version.json?'+Date.now(),{cache:'no-store'});const j=await r.json();if(j.v&&j.v!==VER){if(manual||!sessionStorage.getItem('ftu'+j.v)){sessionStorage.setItem('ftu'+j.v,'1');await hardRefresh()}}else if(manual)toast('You are on the latest version')}catch(e){if(manual)toast('Could not check right now')}}
async function hardRefresh(){try{const k=await caches.keys();await Promise.all(k.map(x=>caches.delete(x)));const r=await navigator.serviceWorker.getRegistrations();await Promise.all(r.map(x=>x.unregister()))}catch(e){}location.reload()}

function act(a,el){const v=el.dataset.v;switch(a){
 case'close':closeSheet();break;case'undo':{const t=$('#toast');if(t&&t._u){t._u();t.classList.remove('on')}break}
 case'tab':TAB=v;render();$('#app').scrollTop=0;break;
 case'startfast':openStart();break;case'endfast':openEnd();break;case'editfast':openFastEdit(v);break;case'addpast':openFastEdit(null);break;
 case'addfood':openFood();break;
 case'day':openDay(v);break;case'plans':openPlans();break;
 case'water':{const k=el.dataset.d||dkey();S.water[k]=Math.max(0,(S.water[k]||0)+ +v);save();render();buzz();break}
 case'chk':{const k=dkey(),f=el.dataset.f;S.checks[k]=S.checks[k]||{};S.checks[k][f]=S.checks[k][f]===+v?0:+v;save();render();break}
 case'mode':{const P=S.plan;if(v==='week'){const wk={};for(let i=0;i<7;i++){const d=addDays(dkey(),i);wk[dparse(d).getDay()]=planId(d)}P.week=wk}if(v==='ramp'){const t=PL[P.base].kind==='window'?P.base:'16-8';const i=LADDER.indexOf(t);P.ramp=LADDER.slice(0,Math.max(1,i)+1);P.rampStart=dkey();P.target=t}P.mode=v;save();render();break}
 case'wkpick':{const d=+v;sheet(`${SX}<h2>${DOWL[d]}</h2><div class="seg wide wrap">${PLANS.filter(p=>p.id!=='custom').map(p=>`<button class="chip ${S.plan.week[d]===p.id?'on':''}" data-pl="${p.id}">${p.name}</button>`).join('')}<button class="chip ${S.plan.week[d]==='free'?'on':''}" data-pl="free">Free</button></div><div style="height:28px"></div>`,sh=>sh.addEventListener('click',e=>{const b=e.target.closest('[data-pl]');if(!b)return;S.plan.week[d]=b.dataset.pl;save();closeSheet();render()}));break}
 case'r52':{const d=+v,a=S.plan.r52;const i=a.indexOf(d);if(i>=0)a.splice(i,1);else{a.push(d);if(a.length>2)a.shift()}save();render();break}
 case'long':{const d=+v,a=S.plan.longDays;const i=a.indexOf(d);if(i>=0){if(a.length>1)a.splice(i,1)}else{a.push(d);if(a.length>2)a.shift()}save();render();break}
 case'suggest':S.plan.eat=suggestEat(S.plan.mode==='ramp'?planId(dkey()):S.plan.base)||S.plan.eat;save();render();toast('Window set to fit your sleep');break;
 case'clrov':S.plan.ov={};save();render();toast('Day changes cleared');break;
 case'ics':shareFile('FastTrack-reminders.ics',icsText(14),'text/calendar').then(ok=>ok&&toast('Open the file to add it to your calendar'));break;
 case'meal':{const m=S.meals.find(x=>x.id===v);if(m)foodQty({n:m.n,b:'',per:0,k:m.k,p:m.p,c:m.c,f:m.f,src:m.src},m);break}
 case'fday':{FOODDAY=addDays(FOODDAY,+v);if(FOODDAY>dkey())FOODDAY=dkey();render();break}
 case'addw':openWeight();break;case'editprof':openProfile();break;
 case'theme':S.set.theme=v;save();applyTheme();render();break;
 case'unit':{const k=el.dataset.k;S.prof.units[k]=v;save();render();break}
 case'backup':doBackup();break;case'restore':doRestore();break;case'csv':shareFile(`FastTrack-${dkey()}.csv`,exportCSV(),'text/csv');break;
 case'redo':{sheet(`${SX}<h2>Run setup again?</h2><p class="sub">Your logs stay. Your plan and targets are rebuilt from your new answers.</p><button class="btn big" id="rd">Start setup</button><button class="btn ghost" data-a="close">Cancel</button><div style="height:20px"></div>`,sh=>{$('#rd',sh).onclick=()=>{closeSheet();S.prof.done=false;ONB={i:1,pick:null,ft:5,inch:7,d:Object.assign(onbStart2(),{units:{w:S.prof.units.w,h:S.prof.units.h},sex:S.prof.sex,age:S.prof.age,hcm:S.prof.hcm,wkg:S.prof.wkg,gw:S.prof.gw,act:S.prof.act,goal:S.prof.goal,exp:S.prof.exp,wake:S.prof.wake,sleep:S.prof.sleep})};render()}});break}
 case'wipe':wipe();break;case'chkupd':chkUpdate(true);break;
 /* onboarding */
 case'onext':onbNext();break;case'oback':onbCapture();if(ONB.i>0){ONB.i--;ONB.pick=null;render()}break;
 case'oflag':{const a=ONB.d.flags,i=a.indexOf(v);i>=0?a.splice(i,1):a.push(v);render();break}
 case'ounit':{onbCapture();const k=el.dataset.k;ONB.d.units[k]=v;render();break}
 case'osex':ONB.d.sex=v;render();break;case'ogoal':ONB.d.goal=v;render();break;case'oexp':ONB.d.exp=v;render();break;case'oact':ONB.d.act=+v;render();break;
 case'ofinish':onbFinish();break;
 case'oother':openPlans();break}}
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(el)act(el.dataset.a,el)});
document.addEventListener('change',e=>{if(e.target.id==='eatT'){const v=e.target.value;if(/^\d\d:\d\d$/.test(v)){S.plan.eat=v;save();render()}}});
/* ---------- start ---------- */
applyTheme();matchMedia('(prefers-color-scheme: dark)').addEventListener&&matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme);
const qs=new URLSearchParams(location.search);if(['today','plan','eat','progress','me'].includes(qs.get('tab')))TAB=qs.get('tab');
if(S.prof.done&&!S.plan.ov)S.plan.ov={};
render();
if(qs.get('add')==='meal'&&S.prof.done)setTimeout(openFood,300);
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});setTimeout(()=>chkUpdate(false),2500)}
window.__ft={S:()=>S,render,phase,dayInfo,planId,recommend,calc,startFast,endFast,restoreText,norm,streak,openFood,offItem,suggestEat,setTab:t=>{TAB=t;render()},FOODDAY:()=>FOODDAY};
