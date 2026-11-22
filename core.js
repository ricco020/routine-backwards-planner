(function(g){
function hm(s){const[h,m]=String(s).split(':').map(Number);return h*60+m}
function fmt(n){const d=Math.floor(n/1440),m=((n%1440)+1440)%1440;return{time:String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'),day:d}}
function routine(o){
 const b=Math.max(0,+o.buffer||0),st=o.steps.filter(s=>+s.min>0);
 const pad=st.map(s=>Math.ceil(+s.min*(1+b/100)-1e-9));
 const end=hm(o.end);let t=end;const out=[];
 for(let i=st.length-1;i>=0;i--){const e=t;t-=pad[i];out.unshift({name:st[i].name,est:+st[i].min,planned:pad[i],start:fmt(t),end:fmt(e)})}
 const est=st.reduce((a,s)=>a+ +s.min,0),tot=pad.reduce((a,x)=>a+x,0);
 const cal=st.filter(s=>+s.actual>0);let factor=null,suggested=null;
 if(cal.length){const ce=cal.reduce((a,s)=>a+ +s.min,0),ca=cal.reduce((a,s)=>a+ +s.actual,0);factor=ca/ce;suggested=Math.max(0,Math.ceil((factor-1)*100-1e-9))}
 return{steps:out,estimate:est,planned:tot,startAt:fmt(end-tot),factor,suggested}}
g.routine=routine;if(typeof module!=='undefined')module.exports={routine,hm,fmt};
})(typeof window!=='undefined'?window:globalThis);
