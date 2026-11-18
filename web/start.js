'use strict';
/* ---------- start ---------- */
applyTheme();matchMedia('(prefers-color-scheme: dark)').addEventListener&&matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme);
const qs=new URLSearchParams(location.search);if(['today','plan','eat','progress','me'].includes(qs.get('tab')))TAB=qs.get('tab');
if(S.prof.done&&!S.plan.ov)S.plan.ov={};
render();
if(qs.get('add')==='meal'&&S.prof.done)setTimeout(openFood,300);
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});setTimeout(()=>chkUpdate(false),2500)}
window.__ft={S:()=>S,render,phase,dayInfo,planId,recommend,calc,startFast,endFast,restoreText,norm,streak,openFood,offItem,suggestEat,setTab:t=>{TAB=t;render()},FOODDAY:()=>FOODDAY};
afInit&&afInit();
