const $=id=>document.getElementById(id),F='Arial,Helvetica,sans-serif',K=1.5;
const NM={rect:'Persegi',ellipse:'Elips',tri:'Segitiga',trap:'Trapesium',hex:'Segi enam',L:'Bentuk L',poly:'Poligon'};
const DS={rect:[4,3],ellipse:[3,3],tri:[3,3],trap:[4,3],hex:[3,3],L:[4,4]};
const P={rect:(w,h)=>[[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]],
tri:(w,h)=>[[0,-h/2],[w/2,h/2],[-w/2,h/2]],
trap:(w,h)=>[[-w*.3,-h/2],[w*.3,-h/2],[w/2,h/2],[-w/2,h/2]],
hex:(w,h)=>[[-w/2,0],[-w/4,-h/2],[w/4,-h/2],[w/2,0],[w/4,h/2],[-w/4,h/2]],
L:(w,h)=>[[-w/2,-h/2],[0,-h/2],[0,0],[w/2,0],[w/2,h/2],[-w/2,h/2]],
poly:(w,h,it)=>it.pts.map(([a,b])=>[a*w,b*h])};
let S={info:{act:'Nama Kegiatan',loc:'',des:'',date:'',note:''},W:20,H:12,grid:1,snap:true,nid:1,sel:null,
cats:[{id:1,n:'Panggung',c:'#2e2e2e'},{id:2,n:'Area penonton',c:'#c9c9c9'},{id:3,n:'Properti',c:'#b36a66'},{id:4,n:'Akses / sirkulasi',c:'#f0f0f0'}],items:[]},drag=null;

S.sel=null;
const cv=$('cv'),ctx=cv.getContext('2d'),cur=()=>S.items.find(i=>i.id===S.sel);
const sn=v=>+(S.snap?Math.round(v/S.grid)*S.grid:v).toFixed(3);
const dark=c=>{const n=parseInt(c.slice(1),16);return(((n>>16)&255)*299+((n>>8)&255)*587+(n&255)*114)/1000<140};
const ln=(c,a,b,d,e)=>{c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke()};
function path(c,t,w,h,it){c.beginPath();if(t==='ellipse'){c.ellipse(0,0,w/2,h/2,0,0,7);return}
P[t](w,h,it).forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath()}
function wrap(c,t,x,y,mw,lh,max){const o=[];String(t).split('\n').forEach(p=>{let l='';p.split(' ').forEach(w=>{const s=l?l+' '+w:w;if(c.measureText(s).width>mw&&l){o.push(l);l=w}else l=s});o.push(l)});
o.slice(0,max).forEach((s,i)=>c.fillText(s,x,y+i*lh));return y+Math.min(o.length,max)*lh}
function lay(v){const f=Math.min(1112/S.W,852/S.H),z=v?V.z:1,bx=24+(1292-S.W*f)/2,by=24+(1032-S.H*f)/2;return{sc:f*z,ox:670+(bx-670)*z+(v?V.x:0),oy:540+(by-540)*z+(v?V.y:0)}}

function draw(c,k,ui){
c.setTransform(k,0,0,k,0,0);c.fillStyle='#fff';c.fillRect(0,0,1920,1080);
c.strokeStyle='#111';c.lineWidth=2;c.strokeRect(24,24,1872,1032);ln(c,1316,24,1316,1056);
const{sc,ox,oy}=lay(ui),pw=S.W*sc,ph=S.H*sc;let g=S.grid;while(g*sc<8)g*=2;c.save();c.beginPath();c.rect(25,25,1290,1030);c.clip();
c.lineWidth=1;
for(let i=0;i*g<=S.W+1e-9;i++){c.strokeStyle=i%5?'#ececec':'#d0d0d0';ln(c,ox+i*g*sc,oy,ox+i*g*sc,oy+ph)}
for(let i=0;i*g<=S.H+1e-9;i++){c.strokeStyle=i%5?'#ececec':'#d0d0d0';ln(c,ox,oy+i*g*sc,ox+pw,oy+i*g*sc)}
c.strokeStyle='#111';c.lineWidth=3;c.strokeRect(ox,oy,pw,ph);
c.lineWidth=1.5;c.fillStyle='#2e2e2e';c.font='600 18px '+F;c.textAlign='center';c.textBaseline='alphabetic';
ln(c,ox,oy-32,ox+pw,oy-32);ln(c,ox,oy-40,ox,oy-24);ln(c,ox+pw,oy-40,ox+pw,oy-24);c.fillText(S.W+' m',ox+pw/2,oy-42);
ln(c,ox-32,oy,ox-32,oy+ph);ln(c,ox-40,oy,ox-24,oy);ln(c,ox-40,oy+ph,ox-24,oy+ph);
c.save();c.translate(ox-42,oy+ph/2);c.rotate(-Math.PI/2);c.fillText(S.H+' m',0,0);c.restore();
S.items.forEach(it=>{const col=(S.cats.find(q=>q.id===it.c)||S.cats[0]).c,w=it.w*sc,h=it.h*sc,t=ox+it.x*sc,u=oy+it.y*sc;
c.save();c.translate(t,u);c.rotate(it.r*Math.PI/180);path(c,it.t,w,h,it);c.fillStyle=col;c.fill();c.strokeStyle='#111';c.lineWidth=2;c.stroke();
if(ui&&it.id===S.sel){path(c,it.t,w+12,h+12,it);c.strokeStyle='#b36a66';c.lineWidth=3;c.setLineDash([10,6]);c.stroke();c.setLineDash([]);c.lineWidth=2;c.fillStyle='#fff';const a=w/2+6,b=h/2+6;ln(c,0,-b,0,-b-34);
for(const sy of[-1,0,1])for(const sx of[-1,0,1])if(sx||sy){c.fillRect(sx*a-11,sy*b-11,22,22);c.strokeRect(sx*a-11,sy*b-11,22,22)}
c.beginPath();c.arc(0,-b-34,13,0,7);c.fillStyle='#b36a66';c.fill()}
c.restore();
const fs=Math.max(11,Math.min(22,Math.min(w,h)/5));c.fillStyle=dark(col)?'#fff':'#111';c.textAlign='center';c.textBaseline='middle';
if(it.n){c.font='600 '+fs+'px '+F;c.fillText(it.n.toUpperCase(),t,u-(it.d?fs*.6:0))}
if(it.d){c.font='400 '+fs*.85+'px '+F;c.fillText(it.w+' × '+it.h+' m',t,u+(it.n?fs*.7:0))}});
c.restore();
const X=1348,PW=520;c.textAlign='left';c.textBaseline='alphabetic';
let y=76;c.fillStyle='#b36a66';c.font='600 14px '+F;c.letterSpacing='3px';c.fillText('DENAH TAMPAK ATAS',X,y);c.letterSpacing='0px';
y+=54;c.fillStyle='#111';c.font='700 44px '+F;y=wrap(c,(S.info.act||'—').toUpperCase(),X,y,PW,52,3);
const rule=()=>{c.strokeStyle='#111';c.lineWidth=1.5;ln(c,X,y,X+PW,y)},lab=t=>{c.fillStyle='#777';c.font='600 12px '+F;c.letterSpacing='2px';c.fillText(t.toUpperCase(),X,y);c.letterSpacing='0px'};
y+=4;rule();y+=30;
[['Lokasi',S.info.loc],['Desainer',S.info.des],['Tanggal',S.info.date]].forEach(([a,b])=>{lab(a);c.fillStyle='#111';c.font='400 22px '+F;y=wrap(c,b||'—',X,y+28,PW,28,2)+22});
y-=6;rule();y+=30;lab('Legenda');y+=14;
S.cats.forEach(q=>{c.fillStyle=q.c;c.fillRect(X,y,28,28);c.strokeStyle='#111';c.lineWidth=1.5;c.strokeRect(X,y,28,28);
c.fillStyle='#111';c.font='400 21px '+F;c.fillText(q.n.toUpperCase(),X+44,y+22);y+=40});
if(S.info.note){y+=10;rule();y+=30;lab('Keterangan');c.fillStyle='#2e2e2e';c.font='400 18px '+F;wrap(c,S.info.note,X,y+28,PW,26,6)}
const L=[.5,1,2,5,10,20,50,100].find(v=>v*sc>=100)||100,bw=L*sc;
c.strokeStyle='#111';c.lineWidth=2;c.strokeRect(X,985,bw,10);c.fillStyle='#111';c.fillRect(X,985,bw/2,10);
c.font='600 15px '+F;c.fillText('0',X,976);c.fillText(L+' m',X+bw+12,995);
c.fillStyle='#777';c.font='400 16px '+F;c.fillText('Ukuran denah '+S.W+' × '+S.H+' m',X,1030)}

function R(){draw(ctx,K,true);ov();$('zl').textContent=Math.round(V.z*100)+'%';clearTimeout(tm);tm=setTimeout(commit,400)}
function opts(){const s=$('p_cat'),v=s.value;s.innerHTML='';S.cats.forEach(k=>s.add(new Option(k.n||'(tanpa nama)',k.id)));s.value=v}
function sync(){const it=cur();$('sel').hidden=!it;if(!it)return;opts();$('p_label').value=it.n;$('p_cat').value=it.c;
['w','h','x','y','r'].forEach(k=>$('p_'+k).value=it[k]);$('p_dim').checked=it.d}
function catsUI(){const box=$('cats');box.innerHTML='';
S.cats.forEach(k=>{const d=document.createElement('div');d.className='cat';
const a=document.createElement('input');a.type='color';a.value=k.c;a.oninput=()=>{k.c=a.value;R()};
const b=document.createElement('input');b.value=k.n;b.oninput=()=>{k.n=b.value;opts();R()};
const x=document.createElement('button');x.textContent='×';x.title='Hapus';
x.onclick=()=>{if(S.cats.length<2)return;S.cats=S.cats.filter(q=>q!==k);S.items.forEach(i=>{if(i.c===k.id)i.c=S.cats[0].id});catsUI();sync();R()};
d.append(a,b,x);box.append(d)});opts()}
$('addCat').onclick=()=>{S.cats.push({id:Math.max(...S.cats.map(q=>q.id))+1,n:'Kategori baru',c:'#8a8a8a'});catsUI();R()};

['act','loc','des','date','note'].forEach(k=>{const e=$('i_'+k);e.value=S.info[k];e.oninput=()=>{S.info[k]=e.value;R()}});
['W','H','grid'].forEach(k=>{const e=$('s_'+k);e.value=S[k];e.oninput=()=>{const v=parseFloat(e.value);if(v>0){S[k]=v;R()}}});
$('s_snap').checked=S.snap;$('s_snap').onchange=e=>{S.snap=e.target.checked;R()};
let tool=null,dr=null,pts=[],mouse=null,rs=null,ro=false,pn=null,sp=false,hand=false,V={z:1,x:0,y:0},hist=[],hi=-1,tm;
const st=()=>JSON.stringify({...S,sel:null});
function commit(){clearTimeout(tm);const j=st();if(j!==hist[hi]){hist=hist.slice(0,hi+1);hist.push(j);if(hist.length>100)hist.shift();hi=hist.length-1}}
function fill(){['act','loc','des','date','note'].forEach(k=>$('i_'+k).value=S.info[k]);['W','H','grid'].forEach(k=>$('s_'+k).value=S[k]);$('s_snap').checked=S.snap;catsUI();sync()}
function go(d){commit();const j=hi+d;if(j<0||j>=hist.length)return;hi=j;const sl=S.sel;S=JSON.parse(hist[j]);S.sel=S.items.some(i=>i.id===sl)?sl:null;fill();R()}
function zoomAt(nz,sx,sy){nz=Math.max(.2,Math.min(40,nz));const l=lay(true),m=(sx-l.ox)/l.sc,n=(sy-l.oy)/l.sc;V.z=nz;V.x=V.y=0;const q=lay(true);V.x=sx-m*q.sc-q.ox;V.y=sy-n*q.sc-q.oy}
function loc(x0,y0,r,m,n){const a=-r*Math.PI/180,dx=m-x0,dy=n-y0;return[dx*Math.cos(a)-dy*Math.sin(a),dx*Math.sin(a)+dy*Math.cos(a)]}
const HT={0:'Pilih bentuk, lalu seret di kanvas untuk menggambar, atau klik untuk meletakkan sesuai ukuran di atas.',1:'Seret di kanvas untuk menentukan ukuran, atau klik untuk meletakkan dengan ukuran di atas.',poly:'Klik untuk membuat titik. Tutup dengan klik titik awal, dobel klik, atau Enter. Esc untuk batal.'};
function setTool(t){tool=t;pts=[];dr=null;[...$('shapes').children].forEach(b=>b.classList.toggle('on',b.dataset.t===t));$('tSel').classList.toggle('on',!t);
hand=false;$('zh').classList.remove('on');cv.style.cursor=t?'crosshair':'default';$('hint').textContent=HT[t=='poly'?'poly':t?1:0];if(t&&DS[t]){$('n_w').value=DS[t][0];$('n_h').value=DS[t][1]}R()}
function mk(t,x,y,w,h,ex){const f=v=>+v.toFixed(3),it={id:S.nid++,t,x:f(x),y:f(y),w:f(w),h:f(h),r:0,c:S.cats[0].id,n:NM[t],d:true,...ex};S.items.push(it);S.sel=it.id;sync()}
function closePoly(){if(pts.length<3)return;const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),w=x1-x0||.05,h=y1-y0||.05;
mk('poly',(x0+x1)/2,(y0+y1)/2,w,h,{pts:pts.map(([a,b])=>[(a-x0)/w-.5,(b-y0)/h-.5])});setTool(null)}
function ov(){const{sc,ox,oy}=lay(true),c=ctx,X=v=>ox+v*sc,Y=v=>oy+v*sc;c.save();c.beginPath();c.rect(25,25,1290,1030);c.clip();c.setLineDash([8,5]);c.lineWidth=2.5;c.strokeStyle='#b36a66';c.fillStyle='rgba(179,106,102,.18)';c.font='700 15px '+F;c.textAlign='left';c.textBaseline='alphabetic';
if(dr){const x=Math.min(dr.a,dr.m),y=Math.min(dr.b,dr.n),w=Math.abs(dr.m-dr.a),h=Math.abs(dr.n-dr.b);
c.save();c.translate(X(x+w/2),Y(y+h/2));path(c,tool,w*sc,h*sc);c.fill();c.stroke();c.restore();
c.setLineDash([]);c.fillStyle='#b36a66';c.fillText(w.toFixed(2)+' × '+h.toFixed(2)+' m',X(dr.m)+12,Y(dr.n)-10)}
if(tool=='poly'&&pts.length){const l=pts[pts.length-1],q=mouse||l;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.lineTo(X(q[0]),Y(q[1]));c.stroke();
c.setLineDash([]);c.fillStyle='#b36a66';pts.forEach((p,i)=>{const s=i?5:8;c.fillRect(X(p[0])-s,Y(p[1])-s,2*s,2*s)});
c.fillText(Math.hypot(q[0]-l[0],q[1]-l[1]).toFixed(2)+' m',X(q[0])+12,Y(q[1])-10)}
c.restore()}
Object.keys(NM).forEach(t=>{const b=document.createElement('button');b.textContent=t=='poly'?'Poligon titik':NM[t];b.dataset.t=t;b.className='w';b.onclick=()=>setTool(tool===t?null:t);$('shapes').append(b)});
$('tSel').onclick=()=>setTool(null);
$('p_label').oninput=e=>{cur().n=e.target.value;R()};
$('p_cat').onchange=e=>{cur().c=+e.target.value;R()};
$('p_dim').onchange=e=>{cur().d=e.target.checked;R()};
['w','h','x','y','r'].forEach(k=>$('p_'+k).oninput=e=>{const v=parseFloat(e.target.value);if(isNaN(v)||((k=='w'||k=='h')&&v<.05))return;cur()[k]=v;R()});
function del(){S.items=S.items.filter(i=>i.id!==S.sel);S.sel=null;sync();R()}
$('b_del').onclick=del;
$('b_dup').onclick=()=>{const i=cur();if(!i)return;const n={...i,id:S.nid++,x:+(i.x+S.grid).toFixed(3),y:+(i.y+S.grid).toFixed(3)};S.items.push(n);S.sel=n.id;sync();R()};
const mv=d=>{const i=cur(),x=S.items.indexOf(i),y=x+d;if(!i||y<0||y>=S.items.length)return;S.items.splice(x,1);S.items.splice(y,0,i);R()};
$('b_up').onclick=()=>mv(1);$('b_dn').onclick=()=>mv(-1);
$('nw').onclick=()=>{if(confirm('Mulai denah baru? Pekerjaan yang belum disimpan akan hilang.')){location.reload()}};

function inP(x,y,p){let o=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const[a,b]=p[i],[d,e]=p[j];if((b>y)!=(e>y)&&x<(d-a)*(y-b)/(e-b)+a)o=!o}return o}
function hit(mx,my){for(let i=S.items.length-1;i>=0;i--){const it=S.items[i],a=-it.r*Math.PI/180,dx=mx-it.x,dy=my-it.y,
x=dx*Math.cos(a)-dy*Math.sin(a),y=dx*Math.sin(a)+dy*Math.cos(a);
if(it.t==='ellipse'?(x/(it.w/2))**2+(y/(it.h/2))**2<=1:inP(x,y,P[it.t](it.w,it.h,it)))return it}return null}
function pt(e){const r=cv.getBoundingClientRect(),{sc,ox,oy}=lay(true);return[((e.clientX-r.left)*1920/r.width-ox)/sc,((e.clientY-r.top)*1080/r.height-oy)/sc]}
cv.onpointerdown=e=>{if(document.activeElement)document.activeElement.blur();if(e.button==1||e.button==2||sp||hand){pn={x:e.clientX,y:e.clientY,vx:V.x,vy:V.y};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';return}const[m,n]=pt(e);
if(tool=='poly'){const p=[sn(m),sn(n)],q=pts[pts.length-1];
if(pts.length>2&&Math.hypot(p[0]-pts[0][0],p[1]-pts[0][1])<=12/lay(true).sc){closePoly();return}
if(!q||q[0]!=p[0]||q[1]!=p[1])pts.push(p);R();return}
if(tool){dr={a:sn(m),b:sn(n),m:sn(m),n:sn(n)};cv.setPointerCapture(e.pointerId);R();return}
const hd=hh(m,n);if(hd){const sl=cur();if(hd.ro)ro=true;else rs={sx:hd.sx,sy:hd.sy,x:sl.x,y:sl.y,w:sl.w,h:sl.h};cv.setPointerCapture(e.pointerId);return}
const it=hit(m,n);S.sel=it?it.id:null;
if(it){drag={dx:m-it.x,dy:n-it.y};cv.setPointerCapture(e.pointerId)}sync();R()};
cv.onpointermove=e=>{if(pn){const r=cv.getBoundingClientRect();V.x=pn.vx+(e.clientX-pn.x)*1920/r.width;V.y=pn.vy+(e.clientY-pn.y)*1080/r.height;R();return}
const[m,n]=pt(e);mouse=[sn(m),sn(n)];
if(!rs&&!ro&&!dr&&!drag&&!tool&&!hand&&!sp){const d=hh(m,n);cv.style.cursor=d?(d.ro?'grab':d.sx&&d.sy?(d.sx*d.sy>0?'nwse-resize':'nesw-resize'):d.sx?'ew-resize':'ns-resize'):hit(m,n)?'move':'default'}
if(rs){const it=cur(),[lx,ly]=loc(rs.x,rs.y,it.r,m,n),th=it.r*Math.PI/180;let w=rs.w,h=rs.h,cx=0,cy=0;
if(rs.sx){w=Math.max(.05,sn(rs.sx*lx+rs.w/2));cx=rs.sx*(w-rs.w)/2}
if(rs.sy){h=Math.max(.05,sn(rs.sy*ly+rs.h/2));cy=rs.sy*(h-rs.h)/2}
it.w=+w.toFixed(3);it.h=+h.toFixed(3);it.x=+(rs.x+cx*Math.cos(th)-cy*Math.sin(th)).toFixed(3);it.y=+(rs.y+cx*Math.sin(th)+cy*Math.cos(th)).toFixed(3);sync();R();return}
if(ro){const it=cur();let d=Math.atan2(n-it.y,m-it.x)*180/Math.PI+90;if(e.shiftKey)d=Math.round(d/15)*15;d=Math.round(d);if(d>180)d-=360;it.r=d;sync();R();return}
if(dr){dr.m=mouse[0];dr.n=mouse[1];R()}
else if(drag){const it=cur();it.x=sn(m-drag.dx);it.y=sn(n-drag.dy);$('p_x').value=it.x;$('p_y').value=it.y;R()}
else if(tool=='poly'&&pts.length)R()};
cv.onpointerup=()=>{if(pn){pn=null;cv.style.cursor=sp||hand?'grab':tool?'crosshair':'default'}drag=rs=null;ro=false;if(!dr)return;const w=Math.abs(dr.m-dr.a),h=Math.abs(dr.n-dr.b);
if(w<.05||h<.05)mk(tool,dr.a,dr.b,+$('n_w').value||4,+$('n_h').value||3);else mk(tool,(dr.a+dr.m)/2,(dr.b+dr.n)/2,w,h);
setTool(null)};
cv.ondblclick=()=>{if(tool=='poly')closePoly()};
cv.onmousedown=e=>{if(e.button==1)e.preventDefault()};
$('zh').onclick=()=>{const h=!hand;setTool(null);hand=h;$('zh').classList.toggle('on',h);cv.style.cursor=h?'grab':'default'};
function hh(m,n){const sl=cur();if(!sl||tool)return null;const sc=lay(true).sc,[x,y]=loc(sl.x,sl.y,sl.r,m,n);
if(Math.hypot(x*sc,(y+sl.h/2)*sc+40)<24)return{ro:1};
for(const sy of[-1,0,1])for(const sx of[-1,0,1])if((sx||sy)&&Math.hypot((x-sx*(sl.w/2+6/sc))*sc,(y-sy*(sl.h/2+6/sc))*sc)<22)return{sx,sy};return null}
cv.oncontextmenu=e=>e.preventDefault();
cv.onwheel=e=>{e.preventDefault();const r=cv.getBoundingClientRect();zoomAt(V.z*Math.exp(-Math.max(-300,Math.min(300,e.deltaY*(e.deltaMode==1?33:e.deltaMode==2?400:1)))*.0015),(e.clientX-r.left)*1920/r.width,(e.clientY-r.top)*1080/r.height);R()};
$('zi').onclick=()=>{zoomAt(V.z*1.25,670,540);R()};$('zo').onclick=()=>{zoomAt(V.z/1.25,670,540);R()};$('zf').onclick=()=>{V={z:1,x:0,y:0};R()};
$('bUn').onclick=()=>go(-1);$('bRe').onclick=()=>go(1);
$('bSave').onclick=()=>dl(new Blob([st()],{type:'application/json'}),slug()+'.matamap.json');
$('bOpen').onclick=()=>$('fOpen').click();
$('fOpen').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
try{const d=JSON.parse(await f.text());if(!d||!Array.isArray(d.items)||!Array.isArray(d.cats)||!d.cats.length||!d.info||!(d.W>0)||!(d.H>0))throw 0;S={...S,...d,sel:null}}catch(x){alert('File proyek tidak valid.');return}
V={z:1,x:0,y:0};fill();R()};
onkeyup=e=>{if(e.code=='Space'){if(!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))e.preventDefault();sp=false;cv.style.cursor=hand?'grab':tool?'crosshair':'default'}};
onkeydown=e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key=='Escape'){setTool(null);return}if(e.key=='Enter'&&tool=='poly'){closePoly();return}
if((e.ctrlKey||e.metaKey)&&/^[zy]$/i.test(e.key)){e.preventDefault();go(e.key.toLowerCase()=='y'||e.shiftKey?1:-1);return}
if(e.code=='Space'){e.preventDefault();sp=true;cv.style.cursor='grab';return}const it=cur();if(!it)return;
if(e.key=='Delete'||e.key=='Backspace'){del();return}
const m={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
if(m){e.preventDefault();const s=S.snap?S.grid:.1;it.x=+(it.x+m[0]*s).toFixed(3);it.y=+(it.y+m[1]*s).toFixed(3);sync();R()}};

// ekspor 4K (3840×2160)
function big(){const o=document.createElement('canvas');o.width=3840;o.height=2160;draw(o.getContext('2d'),2,false);return o}
const slug=()=>(S.info.act||'denah').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'denah';
function dl(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4e3)}
function pdf(jpg,w,h){const enc=new TextEncoder(),parts=[],off=[];let len=0;
const add=d=>{const b=typeof d==='string'?enc.encode(d):d;parts.push(b);len+=b.length};
const obj=(n,d)=>{off[n]=len;add(n+' 0 obj\n'+d+'\nendobj\n')},pw=842,ph=Math.round(842*h/w);
add('%PDF-1.4\n');obj(1,'<</Type/Catalog/Pages 2 0 R>>');obj(2,'<</Type/Pages/Kids[3 0 R]/Count 1>>');
obj(3,`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${pw} ${ph}]/Resources<</XObject<</I 4 0 R>>>>/Contents 5 0 R>>`);
off[4]=len;add(`4 0 obj\n<</Type/XObject/Subtype/Image/Width ${w}/Height ${h}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${jpg.length}>>\nstream\n`);add(jpg);add('\nendstream\nendobj\n');
const c=`q ${pw} 0 0 ${ph} 0 0 cm /I Do Q`;obj(5,`<</Length ${c.length}>>\nstream\n${c}\nendstream`);
const x=len;add('xref\n0 6\n0000000000 65535 f \n'+[1,2,3,4,5].map(n=>String(off[n]).padStart(10,'0')+' 00000 n \n').join(''));
add(`trailer\n<</Size 6/Root 1 0 R>>\nstartxref\n${x}\n%%EOF`);return new Blob(parts,{type:'application/pdf'})}
$('exPng').onclick=()=>big().toBlob(b=>dl(b,slug()+'.png'));
$('exPdf').onclick=()=>big().toBlob(async b=>dl(pdf(new Uint8Array(await b.arrayBuffer()),3840,2160),slug()+'.pdf'),'image/jpeg',.95);

catsUI();sync();setTool(null);commit();
