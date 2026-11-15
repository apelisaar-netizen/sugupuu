const $=id=>document.getElementById(id);let people=[],families=[],mode='tree',selected='',source='demo';const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function parseGed(text){const records=[];let stack=[];for(const line of text.replace(/^\uFEFF/,'').split(/\r?\n/)){const m=line.match(/^(\d+)\s+(?:(@[^@]+@)\s+)?(\S+)(?:\s+(.*))?$/);if(!m)continue;const level=+m[1],r={tag:m[3],id:m[2],value:m[4]||'',children:[]};if(level===0){records.push(r);stack=[r]}else if(stack[level-1]){stack[level-1].children.push(r);stack[level]=r;stack.length=level+1}}const get=(r,t)=>r.children.find(c=>c.tag===t);const val=(r,t)=>get(r,t)?.value||'';const ps=records.filter(r=>r.tag==='INDI').map(r=>{const birth=get(r,'BIRT'),death=get(r,'DEAT');return{id:r.id,name:val(r,'NAME').replaceAll('/','').trim()||'Nimi puudub',sex:val(r,'SEX'),birth:birth?val(birth,'DATE'):'',place:birth?val(birth,'PLAC'):'',death:death?val(death,'DATE'):''}});const fs=records.filter(r=>r.tag==='FAM').map(r=>({parents:r.children.filter(c=>['HUSB','WIFE'].includes(c.tag)).map(c=>c.value),children:r.children.filter(c=>c.tag==='CHIL').map(c=>c.value)}));return{people:ps,families:fs}}
const demoText=`0 HEAD
1 CHAR UTF-8
0 @I1@ INDI
1 NAME Mari /Tamm/
1 BIRT
2 DATE 1988
2 PLAC Tallinn
0 @I2@ INDI
1 NAME Jaan /Tamm/
1 BIRT
2 DATE 1959
2 PLAC Tartu
0 @I3@ INDI
1 NAME Liisa /Kask/
1 BIRT
2 DATE 1962
2 PLAC Pärnu
0 @I4@ INDI
1 NAME Karl /Tamm/
1 BIRT
2 DATE 1928
2 PLAC Viljandi
0 @I5@ INDI
1 NAME Anna /Mets/
1 BIRT
2 DATE 1933
2 PLAC Võru
0 @I6@ INDI
1 NAME Peeter /Kask/
1 BIRT
2 DATE 1930
2 PLAC Kuressaare
0 @I7@ INDI
1 NAME Helmi /Saar/
1 BIRT
2 DATE 1937
2 PLAC Haapsalu
0 @F1@ FAM
1 HUSB @I2@
1 WIFE @I3@
1 CHIL @I1@
0 @F2@ FAM
1 HUSB @I4@
1 WIFE @I5@
1 CHIL @I2@
0 @F3@ FAM
1 HUSB @I6@
1 WIFE @I7@
1 CHIL @I3@
0 TRLR`;
function setData(data,label){if(!data.people.length)throw Error('Failist ei leitud GEDCOM-isikuid. Vali Geni GEDCOM-eksport.');people=data.people;families=data.families;selected=people[0].id;$('root').innerHTML=people.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');$('title').textContent=label;$('search').value='';$('stats').textContent=`${people.length} inimest · ${families.length} peret`;$('status').textContent='';render();detail(selected)}
function person(id){return people.find(p=>p.id===id)}function parents(id){return[...new Set(families.filter(f=>f.children.includes(id)).flatMap(f=>f.parents))].filter(id=>person(id))}
function detail(id){selected=id;const p=person(id);if(!p)return;const par=parents(id).map(id=>person(id).name).join(', ');const children=[...new Set(families.filter(f=>f.parents.includes(id)).flatMap(f=>f.children))].map(person).filter(Boolean).map(p=>p.name).join(', ');$('detail').innerHTML=`<div class="eyebrow">INIMESE LUGU</div><h3>${esc(p.name)}</h3><dl><dt>Sündinud</dt><dd>${esc(p.birth||'Aeg teadmata')}</dd><dt>Sünnikoht</dt><dd>${esc(p.place||'Koht teadmata')}</dd>${p.death?`<dt>Surnud</dt><dd>${esc(p.death)}</dd>`:''}<dt>Vanemad</dt><dd>${esc(par||'Andmed puuduvad')}</dd><dt>Lapsed</dt><dd>${esc(children||'Andmed puuduvad')}</dd></dl>`}
let mapData=null;fetch('map.json').then(r=>r.json()).then(d=>{mapData=d;if(mode==='map')render()}).catch(()=>{});
const places={'tallinn':[59.437,24.754],'tartu':[58.378,26.729],'pärnu':[58.386,24.497],'viljandi':[58.364,25.59],'võru':[57.834,27.019],'kuressaare':[58.253,22.485],'haapsalu':[58.943,23.541],'jõgeva':[58.746,26.394],'kursi':[58.65,26.30],'põltsamaa':[58.653,25.972],'neu oberpahlen':[58.653,25.972],'õisu':[58.193,25.571],'narva':[59.377,28.19],'rakvere':[59.346,26.356],'paide':[58.885,25.557],'valga':[57.777,26.047],'põlva':[58.06,27.069],'kärdla':[58.998,22.749],'rapla':[59.007,24.792]};function locate(place){const s=place.toLocaleLowerCase('et').trim();const k=Object.keys(places).sort((a,b)=>b.length-a.length).find(k=>s===k||s.startsWith(k+',')||s.startsWith(k+' '));return k?places[k]:null}
function render(){const svg=$('view'),q=$('search').value.toLocaleLowerCase('et');$('treeTab').classList.toggle('active',mode==='tree');$('mapTab').classList.toggle('active',mode==='map');svg.setAttribute('viewBox','0 0 900 490');let html='';if(mode==='tree'){const root=$('root').value||people[0]?.id,levels=[[root]],seen=new Set([root]);for(let g=1;g<5;g++){const next=[...new Set(levels[g-1].flatMap(parents))].filter(id=>!seen.has(id));if(!next.length)break;next.forEach(id=>seen.add(id));levels.push(next)}const pos=new Map;levels.forEach((ids,g)=>ids.forEach((id,i)=>pos.set(id,[450+(i-(ids.length-1)/2)*Math.max(135,760/Math.max(ids.length,1)),425-g*92])));let minX=Math.min(...[...pos.values()].map(p=>p[0]))-70,maxX=Math.max(...[...pos.values()].map(p=>p[0]))+70;svg.setAttribute('viewBox',`${Math.min(0,minX)} 0 ${Math.max(900,maxX-minX+30)} 490`);for(const[id,[x,y]]of pos)for(const parent of parents(id)){if(!pos.has(parent))continue;const[px,py]=pos.get(parent);html+=`<path class="link" d="M${x},${y-24} V${(y+py)/2} H${px} V${py+24}"/>`}for(const[id,[x,y]]of pos){const p=person(id),dim=q&&!p.name.toLocaleLowerCase('et').includes(q);html+=`<g class="person" data-id="${esc(id)}" tabindex="0" role="button" aria-label="${esc(p.name)}" opacity="${dim?.2:1}" transform="translate(${x},${y})"><rect x="-64" y="-29" width="128" height="58" rx="8" fill="${id===root?'#dbe7ba':'#fffefa'}" stroke="#cad5bf"/><text text-anchor="middle" y="-3" fill="#263f37" font-family="Georgia" font-size="13">${esc(p.name.length>19?p.name.slice(0,18)+'…':p.name)}</text><text text-anchor="middle" y="16" fill="#7b8575" font-size="10">${esc(p.birth||'Sünniaeg teadmata')}</text></g>`}$('legend').textContent=`Lähteisik ja kuni 4 põlvkonda esivanemaid · ${pos.size} inimest. Teise haru jaoks vali lähteisik.`;$('status').textContent=q?`${people.filter(p=>p.name.toLocaleLowerCase('et').includes(q)).length} nimevastet kogu failis. Teised harud avad lähteisiku valikust.`:'';}else{const xy=(lat,lon)=>[(lon-21.5)*110+75,(59.8-lat)*175+30];if(mapData){for(const ring of mapData.land||[])html+=`<path d="${ring.map(([lon,lat],i)=>(i?'L':'M')+xy(lat,lon).join(',')).join(' ')}Z" fill="#e4ead8" stroke="#c2ceb5"/>`;for(const ring of mapData.lakes||[])html+=`<path d="${ring.map(([lon,lat],i)=>(i?'L':'M')+xy(lat,lon).join(',')).join(' ')}Z" fill="#f6f8ef"/>`}for(const name of ['Tallinn','Tartu','Pärnu','Kuressaare','Narva']){const [x,y]=xy(...locate(name));html+=`<text x="${x+8}" y="${y-8}" fill="#929d87" font-size="11">${name}</text>`}const unknown=[],groups=new Map;for(const p of people){const loc=locate(p.place);if(!loc){unknown.push(p);continue}if(q&&!p.name.toLocaleLowerCase('et').includes(q))continue;const key=loc.join(',');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p)}for(const[key,ps]of groups){const base=xy(...key.split(',').map(Number));ps.forEach((p,i)=>{const a=i*2.4,r=ps.length>1?6+5*Math.sqrt(i):0,x=base[0]+Math.cos(a)*r,y=base[1]+Math.sin(a)*r;html+=`<g class="person" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}"><title>${esc(p.name+' · '+p.place)}</title><circle cx="${x}" cy="${y}" r="6" fill="#607e43" stroke="white" stroke-width="2"/></g>`})}$('legend').textContent='Kohanimede ligikaudsed keskpunktid. Kattuvad punktid on loetavuse jaoks nihutatud.';$('status').textContent=`${people.length-unknown.length}/${people.length} inimest kaardil. ${unknown.length?'Sünnikoht puudub või ei ole sõnastikus: '+[...new Set(unknown.map(p=>p.place||'teadmata'))].join('; '):''}`;}svg.innerHTML=html;svg.querySelectorAll('[data-id]').forEach(el=>{el.onclick=()=>detail(el.dataset.id);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();detail(el.dataset.id)}}})}
async function unzipGed(buffer){const d=new DataView(buffer);let eoc=-1;for(let i=d.byteLength-22;i>=Math.max(0,d.byteLength-65557);i--)if(d.getUint32(i,true)===0x06054b50){eoc=i;break}if(eoc<0)throw Error('ZIP-faili ei saa lugeda. Proovi lahtipakitud .ged-faili.');const entries=d.getUint16(eoc+10,true);let off=d.getUint32(eoc+16,true),found=[];for(let i=0;i<entries;i++){if(d.getUint32(off,true)!==0x02014b50)throw Error('Vigane ZIP.');const flags=d.getUint16(off+8,true),method=d.getUint16(off+10,true),size=d.getUint32(off+20,true),raw=d.getUint32(off+24,true),nl=d.getUint16(off+28,true),xl=d.getUint16(off+30,true),cl=d.getUint16(off+32,true),local=d.getUint32(off+42,true),name=new TextDecoder().decode(new Uint8Array(buffer,off+46,nl));if(/\.(ged|gedcom)$/i.test(name))found.push({flags,method,size,raw,local});off+=46+nl+xl+cl}if(found.length!==1)throw Error('ZIP peab sisaldama täpselt ühte .ged või .gedcom faili.');const f=found[0];if(f.flags&1)throw Error('Parooliga ZIP pole toetatud.');if(f.raw>10*1024*1024)throw Error('GEDCOM-faili ülempiir on 10 MB.');const start=f.local+30+d.getUint16(f.local+26,true)+d.getUint16(f.local+28,true);const bytes=new Uint8Array(buffer,start,f.size);if(f.method===0)return new TextDecoder().decode(bytes);if(f.method!==8)throw Error('See ZIP-tihendus pole toetatud. Laadi .ged-fail.');const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));const reader=stream.getReader();let chunks=[],length=0;while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>10*1024*1024){await reader.cancel();throw Error('Lahtipakitud fail ületab 10 MB.')}chunks.push(value)}return new Blob(chunks).text()}
$('load').onclick=$('loadTop').onclick=()=>$('file').click();$('file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>10*1024*1024)throw Error('Faili ülempiir on 10 MB.');$('status').textContent='Loen sugupuud…';const txt=/\.zip$/i.test(f.name)?await unzipGed(await f.arrayBuffer()):await f.text();if(!/^0 HEAD/m.test(txt.replace(/^\uFEFF/,'')))throw Error('Valitud fail ei ole toetatud GEDCOM-eksport.');const data=parseGed(txt);setData(data,'Minu sugupuu');source='upload'}catch(err){$('status').textContent=err.message}finally{e.target.value=''}};$('demo').onclick=()=>{source='demo';setData(parseGed(demoText),'Näidispere · väljamõeldud andmed')};$('root').onchange=()=>{render();detail($('root').value)};$('search').oninput=render;$('treeTab').onclick=()=>{mode='tree';render()};$('mapTab').onclick=()=>{mode='map';render()};$('reset').onclick=()=>{$('search').value='';$('root').selectedIndex=0;render();detail($('root').value)};setData(parseGed(demoText),'Näidispere · väljamõeldud andmed');
