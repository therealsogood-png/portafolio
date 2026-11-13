/* Geometría propia: K extruida y biselada. WebGL nativo, sin librerías externas. */
(() => {
 'use strict';
 const canvas=document.querySelector('#sculpture');
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let angles=[-.18,-.48,-.12],target=[...angles],velocity=[0,0],dragging=false,material=0,visible=true,last=0,lastInteraction=0,paused=reduced.matches,frameId=0;
 function fallback(){canvas.hidden=true;const letter=document.createElement('span');letter.className='sculpture-unavailable';letter.textContent='K';letter.setAttribute('aria-hidden','true');canvas.parentElement.append(letter);document.querySelector('.rotation-label span').textContent='VISTA ESTÁTICA · WEBGL NO DISPONIBLE';document.querySelector('.stage-controls').hidden=true;}
 if(!gl){fallback();return;}
 const vertex=`attribute vec3 position;attribute vec3 normal;uniform vec3 angle;uniform float aspect;uniform float bob;varying vec3 vNormal;varying vec3 vPosition;
 vec3 rotate(vec3 p){float a=angle.x,b=angle.y,c=angle.z;p=vec3(p.x,p.y*cos(a)-p.z*sin(a),p.y*sin(a)+p.z*cos(a));p=vec3(p.x*cos(b)+p.z*sin(b),p.y,-p.x*sin(b)+p.z*cos(b));return vec3(p.x*cos(c)-p.y*sin(c),p.x*sin(c)+p.y*cos(c),p.z);}
 void main(){vec3 p=rotate(position);vNormal=rotate(normal);vPosition=p;p.y+=0.25+bob;float z=p.z-5.2;gl_Position=vec4(p.x*3.1/aspect,p.y*3.1,-1.002002*z-0.2002,-z);}`;
 const fragment=`precision highp float;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 tint;uniform float material;
 float band(float v,float center,float size){return 1.0-smoothstep(size,size+.07,abs(v-center));}
 void main(){vec3 N=normalize(vNormal+vPosition*.065);vec3 V=normalize(vec3(0.,0.,5.2)-vPosition);vec3 R=reflect(-V,N);float fres=pow(1.-max(dot(N,V),0.),3.);float light=max(dot(N,normalize(vec3(-1.,2.,3.))),0.);float soft=.5+.5*R.y;
 vec3 env=mix(vec3(.065,.08,.12),vec3(.62,.69,.83),soft);env+=vec3(.85,.89,1.)*band(R.x,-.48,.1)*(.35+.65*soft);env+=vec3(.8,.91,1.)*band(R.y,.55,.035)*.75;env*=1.-.8*band(R.y,-.03,.075);env+=vec3(.7,.38,.22)*band(R.x,.8,.06)*.5;
 float spec=pow(max(dot(reflect(-normalize(vec3(-1.,2.,3.)),N),V),0.),70.);vec3 col=env*tint+vec3(spec)*.85;col+=vec3(.27,.32,.46)*fres;col+=tint*.055*light;col=mix(col,col+vec3(.04),.3);col=pow(max(col,vec3(0.)),vec3(.8));gl_FragColor=vec4(col,1.);}`;
 function shader(type,text){const s=gl.createShader(type);gl.shaderSource(s,text);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader compilation failed');return s;}
 let program;
 try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader link failed');}catch{fallback();return;}
 gl.useProgram(program);
 let contour=[[-.88,-1.28],[-.37,-1.28],[-.37,-.29],[.40,-1.28],[1.04,-1.28],[.01,.02],[1.08,1.28],[.42,1.28],[-.37,.3],[-.37,1.28],[-.88,1.28]];
 // Canvas y points upward; this polygon retains the K silhouette after conversion.
 contour=contour.map(([x,y])=>[x-.08,-y]);
 const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 const area=contour.reduce((sum,p,i)=>{const q=contour[(i+1)%contour.length];return sum+p[0]*q[1]-q[0]*p[1];},0);
 if(area<0)contour.reverse();
 function triangulate(points){const ids=points.map((_,i)=>i),out=[];let guard=100;
  while(ids.length>3&&guard--){let clipped=false;for(let j=0;j<ids.length;j++){const a=ids[(j+ids.length-1)%ids.length],b=ids[j],c=ids[(j+1)%ids.length];if(cross(points[a],points[b],points[c])<=0)continue;
   const inside=ids.some(k=>k!==a&&k!==b&&k!==c&&cross(points[a],points[b],points[k])>=0&&cross(points[b],points[c],points[k])>=0&&cross(points[c],points[a],points[k])>=0);if(inside)continue;out.push([a,b,c]);ids.splice(j,1);clipped=true;break;}if(!clipped)throw Error('Invalid sculpture geometry');}
  if(ids.length===3)out.push(ids);return out;}
 const verts=[],normals=[];
 function triangle(a,b,c,n){verts.push(...a,...b,...c);for(let k=0;k<3;k++)normals.push(...n);}
 function quad(a,b,c,d,n){triangle(a,b,c,n);triangle(a,c,d,n);}
 const rings=[{scale:.94,z:-.31},{scale:1,z:-.24},{scale:1,z:.24},{scale:.94,z:.31}].map(({scale,z})=>contour.map(([x,y])=>[x*scale,y*scale,z]));
 for(const [a,b,c] of triangulate(contour)){triangle(rings[3][a],rings[3][b],rings[3][c],[0,0,1]);triangle(rings[0][c],rings[0][b],rings[0][a],[0,0,-1]);}
 for(let i=0;i<contour.length;i++){const j=(i+1)%contour.length,dx=contour[j][0]-contour[i][0],dy=contour[j][1]-contour[i][1],len=Math.hypot(dx,dy);for(let r=0;r<3;r++){const z=r===0?-.7:r===2?.7:0;quad(rings[r][i],rings[r][j],rings[r+1][j],rings[r+1][i],[dy/len,-dx/len,z]);}}
 function attribute(name,data){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);}
 attribute('position',verts);attribute('normal',normals);
 const u={angle:gl.getUniformLocation(program,'angle'),aspect:gl.getUniformLocation(program,'aspect'),bob:gl.getUniformLocation(program,'bob'),tint:gl.getUniformLocation(program,'tint'),material:gl.getUniformLocation(program,'material')};
 gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
 let w=0,h=0;
 function resize(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);w=rect.width;h=rect.height;if(!w||!h)return;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);gl.viewport(0,0,canvas.width,canvas.height);draw(performance.now(),true);}
 function draw(time,force=false){if(!visible&&!force)return;const dt=Math.min(40,time-last||16)/16.67;last=time;if(!paused&&!dragging&&time-lastInteraction>5000){target[1]+=.0022*dt;}if(!dragging&&!paused){target[0]+=velocity[0]*dt;target[1]+=velocity[1]*dt;velocity=velocity.map(v=>v*.94);}angles=angles.map((v,i)=>v+(target[i]-v)*.16);const colors=[[.93,.98,1.09],[.25,.43,1.22],[1.3,.58,.32]];gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform3fv(u.angle,angles);gl.uniform1f(u.aspect,w/h||1);gl.uniform1f(u.bob,paused?0:Math.sin(time*.0008)*.025);gl.uniform3fv(u.tint,colors[material]);gl.uniform1f(u.material,material);gl.drawArrays(gl.TRIANGLES,0,verts.length/3);canvas.dataset.rotation=angles.map(v=>v.toFixed(2)).join(',');canvas.dataset.material=String(material);}
 function loop(time){frameId=0;if(document.hidden||!visible)return;draw(time);if(!paused||dragging||angles.some((v,i)=>Math.abs(v-target[i])>.001))frameId=requestAnimationFrame(loop);}
 function wake(){if(!frameId&&!document.hidden&&visible)frameId=requestAnimationFrame(loop);}
 let previous={x:0,y:0};
 canvas.addEventListener('pointerdown',e=>{dragging=true;canvas.setPointerCapture(e.pointerId);previous={x:e.clientX,y:e.clientY};velocity=[0,0];lastInteraction=performance.now();wake();});
 canvas.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-previous.x,dy=e.clientY-previous.y;target[0]+=dy*.008;target[1]+=dx*.008;velocity=[dy*.0015,dx*.0015];previous={x:e.clientX,y:e.clientY};lastInteraction=performance.now();wake();});
 function release(){dragging=false;lastInteraction=performance.now();wake();}
 canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',()=>{dragging=false;});
 function reset(){target=[-.18,-.48,-.12];velocity=[0,0];lastInteraction=performance.now();wake();}
 canvas.addEventListener('keydown',e=>{const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','r','R'];if(!keys.includes(e.key))return;e.preventDefault();if(e.key.toLowerCase()==='r'){reset();return;}target[e.key==='ArrowUp'||e.key==='ArrowDown'?0:1]+=(e.key==='ArrowUp'||e.key==='ArrowLeft'?-.18:.18);lastInteraction=performance.now();wake();});
 document.querySelector('#reset-3d').addEventListener('click',reset);
 document.querySelectorAll('[data-material]').forEach(button=>button.addEventListener('click',()=>{material=Number(button.dataset.material);document.querySelectorAll('[data-material]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});document.querySelector('#material-label').textContent=['CROMO','COBALTO','CORAL'][material];draw(performance.now(),true);wake();}));
 document.addEventListener('portfolio-motion',e=>{paused=e.detail.paused;velocity=[0,0];wake();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frameId);frameId=0;}else wake();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frameId);frameId=0;}},{rootMargin:'100px'}).observe(canvas);
 new ResizeObserver(resize).observe(canvas);canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frameId);canvas.dataset.context='lost';});canvas.addEventListener('webglcontextrestored',()=>location.reload());resize();wake();
})();
