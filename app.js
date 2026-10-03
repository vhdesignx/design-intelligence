'use strict';
const $=id=>document.getElementById(id),refs=CATALOG.references,picked=new Set();
let shown=24,lastFocus,promptRefs=[];
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=p=>(window.SITE_PUBLIC?'':'../')+p.split('/').map(encodeURIComponent).join('/');
const text=v=>Array.isArray(v)?v.join(' · '):typeof v==='object'?JSON.stringify(v):v||'Não identificado';
for(const key of ['product','device','author']){const values=[...new Set(refs.map(r=>key==='author'?r.author:r.review[key]))].sort((a,b)=>a.localeCompare(b,'pt-BR'));for(const v of values){const o=document.createElement('option');o.value=v;o.textContent=v;$(key).append(o)}}
refs.forEach(r=>r._search=norm(JSON.stringify(r)));$('total').textContent=refs.length;
$('missing').innerHTML=CATALOG.missing.map(m=>'<li>'+esc(m.filename)+'</li>').join('');
function filtered(){const terms=norm($('q').value).split(/\s+/).filter(Boolean);return refs.filter(r=>terms.every(t=>r._search.includes(t))&&['product','device','author'].every(k=>!$(k).value||$(k).value===(k==='author'?r.author:r.review[k])))}
function render(){const all=filtered();$('count').textContent=all.length+' referências · '+Math.min(shown,all.length)+' visíveis';$('empty').hidden=all.length>0;$('more').hidden=all.length<=shown;
$('grid').innerHTML=all.slice(0,shown).map(r=>'<article class="card"><button class="art" data-open="'+r.id+'" aria-label="Abrir análise: '+esc(r.review.title)+'"><img loading="lazy" decoding="async" src="'+asset(r.thumbnail)+'" alt="'+esc(r.review.title)+'">'+(r.kind==='video'?'<span class="badge">VÍDEO · 1,5 s</span>':'')+'</button><p class="meta">'+esc(r.author)+' · '+esc(r.review.device)+'</p><h3>'+esc(r.review.title)+'</h3><p>'+esc(text(r.review.transfer))+'</p><div class="card-foot"><button data-open="'+r.id+'">Ver análise ↗</button><button class="add" data-pick="'+r.id+'" aria-pressed="'+picked.has(r.id)+'" aria-label="Comparar: '+esc(r.review.title)+'">'+(picked.has(r.id)?'Selecionada ✓':'Comparar +')+'</button></div></article>').join('')}
function selection(){const n=picked.size;$('compareBar').hidden=!n;$('selected').textContent=n+' de 4 selecionadas';$('compare').disabled=n<2;$('compare').textContent='Comparar '+n+' referências';render()}
document.addEventListener('click',e=>{
const open=e.target.closest('[data-open]'),pick=e.target.closest('[data-pick]'),query=e.target.closest('[data-query]');
if(open)detail(refs.find(r=>r.id===open.dataset.open));
if(pick){const id=pick.dataset.pick;if(picked.has(id))picked.delete(id);else if(picked.size<4)picked.add(id);else{$('selected').textContent='Limite de 4. Remova uma seleção para trocar.';return}selection();document.querySelector('[data-pick="'+id+'"]')?.focus()}
if(query){$('q').value=query.dataset.query;shown=24;render()}
const copy=e.target.closest('[data-copy-image]'),dl=e.target.closest('[data-download-image]');
if(copy)copyReferenceImage(refs.find(r=>r.id===copy.dataset.copyImage),copy);
if(dl)downloadReferenceImage(refs.find(r=>r.id===dl.dataset.downloadImage),dl);
});
for(const id of ['q','product','device','author'])$(id).addEventListener(id==='q'?'input':'change',()=>{shown=24;render()});
$('reset').onclick=()=>{['q','product','device','author'].forEach(k=>$(k).value='');shown=24;render();$('q').focus()};
$('more').onclick=()=>{shown+=24;render()};$('clearCompare').onclick=()=>{picked.clear();selection()};$('close').onclick=()=>$('detail').close();
$('detail').addEventListener('close',()=>{$('detail').querySelectorAll('video').forEach(v=>v.pause());lastFocus?.focus()});
function show(title,html){if(!$('detail').open)lastFocus=document.activeElement;$('detail').querySelectorAll('video').forEach(v=>v.pause());$('dialogTitle').textContent=title;$('detailBody').innerHTML=html;if(!$('detail').open)$('detail').showModal();$('detail').scrollTop=0}
function paragraph(label,value){return '<h3>'+label+'</h3><p>'+esc(text(value))+'</p>'}
function exporter(chosen){
promptRefs=chosen;
return '<section class="exporter" aria-labelledby="exportTitle"><div class="export-heading"><div><h3 id="exportTitle">'+(chosen.length>1?'Um briefing com as '+chosen.length+' referências':'Copiar esta referência')+'</h3></div><a href="glossario.html">Consultar glossário ↗</a></div><div class="export-controls"><label>Como você quer usar?<select id="promptMode">'+Object.entries(DesignPrompts.modes).map(([k,v])=>'<option value="'+k+'"'+(k==='visual'?' selected':'')+'>'+v+'</option>').join('')+'</select></label><button id="copyPrompt" class="primary">Copiar prompt'+(chosen.length>1?' conjunto':'')+'</button></div><p class="export-help">Copie o prompt e anexe as imagens pelos botões abaixo.</p><details id="promptPreview"><summary>Personalizar e ver o prompt</summary><label>Seu projeto / tarefa <span class="optional">(opcional)</span><input id="promptContext" placeholder="Ex.: RuralZap — entender o caixa da semana"></label><label class="sr-only" for="promptText">Prompt para copiar</label><textarea id="promptText" rows="13" spellcheck="false"></textarea><button id="downloadPrompt">Baixar prompt .txt</button></details><p id="copyStatus" class="copy-status" role="status" aria-live="polite"></p></section>';
}
function bindExporter(){
const refresh=()=>{$('promptText').value=DesignPrompts.buildPrompt(promptRefs,{mode:$('promptMode').value,context:$('promptContext').value});$('copyStatus').textContent=''};
$('promptMode').onchange=refresh;$('promptContext').oninput=refresh;refresh();
$('copyPrompt').onclick=async()=>{
const value=$('promptText').value;
$('copyStatus').textContent='Copiando prompt…';
try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);else{$('promptPreview').open=true;$('promptText').focus();$('promptText').select();if(!document.execCommand('copy'))throw new Error('indisponível')}
$('copyStatus').textContent='Prompt copiado. Agora anexe as imagens da referência.';
}catch{$('promptPreview').open=true;$('promptText').focus();$('promptText').select();$('copyStatus').textContent='O navegador bloqueou a cópia automática. O texto está selecionado: use Ctrl+C ou baixe o .txt.'}
};
$('downloadPrompt').onclick=()=>download(new Blob([$('promptText').value],{type:'text/plain;charset=utf-8'}),'referencias-'+promptRefs.map(r=>r.id).join('-')+'.txt');
}
function imageTools(r){return '<div class="media-tools"><button data-copy-image="'+r.id+'">'+(r.kind==='video'?'Copiar quadro':'Copiar imagem')+'</button><button data-download-image="'+r.id+'">Baixar PNG</button><a href="'+asset(r.file)+'" target="_blank" rel="noopener">Abrir original ↗</a></div><small class="image-caption">PNG da prévia orientada. O original mantém a resolução integral.</small><p class="image-status" data-image-status="'+r.id+'" role="status" aria-live="polite"></p>'}
function detail(r){
const v=r.review,media=r.kind==='video'?'<video controls playsinline preload="metadata" poster="'+asset(r.preview)+'" src="'+asset(r.file)+'" aria-label="'+esc(v.title)+'"></video>':'<div class="zoom" id="zoom" tabindex="0" role="region" aria-label="Imagem da referência; role para explorar os detalhes"><img src="'+asset(r.preview)+'" alt="'+esc(v.observation)+'"></div>';
show(v.title,exporter([r])+'<div class="detail-layout"><div class="image-zone">'+media+'<div class="media-tools">'+(r.kind==='image'?'<button id="zoomToggle" aria-pressed="false">Ampliar detalhes</button>':'')+(r.timeline?'<a href="'+asset(r.timeline)+'" target="_blank" rel="noopener">Sequência temporal ↗</a>':'')+'</div>'+imageTools(r)+'<p class="meta">'+esc(r.author)+' · '+esc((r.dimensions||[720,900]).join(' × '))+' px · '+r.id+'</p><p class="note">'+esc(r.rights)+'</p></div><div class="analysis"><p class="analysis-lens">Leitura de referência visual · conteúdo pode ser demonstrativo</p>'+paragraph('O que vemos',v.observation)+paragraph('Composição e linguagem',v.visual)+paragraph('Leitura de design · acertos e tensões',v.critique)+paragraph('O que levar para outro projeto',v.transfer)+paragraph('Quando aplicar',v.application)+paragraph('Quando evitar',v.avoid)+paragraph('Como adaptar',v.adaptation)+'<details class="secondary-notes"><summary>Limites e cuidados ao implementar</summary>'+paragraph('Limitações',v.limitations)+(v.implementation_note?paragraph('Em um produto funcional',v.implementation_note):'')+'</details><details><summary>Rastreabilidade</summary><p>'+esc(r.origin)+'</p><p>'+esc(v.inspection.method)+'</p><code>SHA-256 '+r.sha256+'</code><p>'+esc(r.file)+'</p></details></div></div>');bindExporter();
if($('zoomToggle'))$('zoomToggle').onclick=()=>{const enabled=$('zoom').classList.toggle('enlarged');$('zoomToggle').setAttribute('aria-pressed',enabled);$('zoomToggle').textContent=enabled?'Ajustar à janela':'Ampliar detalhes'};
}
function compare(){const chosen=[...picked].map(id=>refs.find(r=>r.id===id));show('Comparar referências',exporter(chosen)+'<div class="compare-grid">'+chosen.map((r,i)=>'<section class="compare-item"><p class="eyebrow">REFERÊNCIA '+(i+1)+'</p><h3>'+esc(r.review.title)+'</h3><img src="'+asset(r.preview)+'" alt="'+esc(r.review.observation)+'">'+imageTools(r)+paragraph('Composição',r.review.visual)+paragraph('Leitura de design',r.review.critique)+paragraph('O que transferir',r.review.transfer)+'<button data-open="'+r.id+'">Abrir análise completa</button></section>').join('')+'</div>');bindExporter()}
$('compare').onclick=compare;
$('copySelection').onclick=()=>{compare();$('promptPreview').open=true;$('copyPrompt').focus()};
const imagePromises=new Map();
function imageBlob(r){
if(imagePromises.has(r.id))return imagePromises.get(r.id);
const promise=(window.SITE_PUBLIC?fetch(asset(r.preview)).then(response=>{if(!response.ok)throw new Error('Prévia indisponível');return response.blob()}).then(async blob=>{const bitmap=await createImageBitmap(blob);const canvas=document.createElement('canvas');canvas.width=bitmap.width;canvas.height=bitmap.height;canvas.getContext('2d').drawImage(bitmap,0,0);bitmap.close();return new Promise((resolve,reject)=>canvas.toBlob(png=>png?resolve(png):reject(new Error('PNG indisponível')),'image/png'))}):new Promise((resolve,reject)=>{
 const script=document.createElement('script');script.src='clipboard/'+r.id+'.js';
 script.onload=()=>{const encoded=window.REFERENCE_PNG?.[r.id];script.remove();if(!encoded){reject(new Error('Imagem não preparada'));return}
 const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));resolve(new Blob([bytes],{type:'image/png'}));delete window.REFERENCE_PNG[r.id]};
 script.onerror=()=>{script.remove();reject(new Error('Arquivo de imagem indisponível'))};document.head.append(script);
})).catch(e=>{imagePromises.delete(r.id);throw e});
imagePromises.set(r.id,promise);return promise;
}
function download(blob,filename){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)}
function imageStatus(r,button,value){const target=button.closest('.image-zone,.compare-item')?.querySelector('[data-image-status]');if(target)target.textContent=value}
async function copyReferenceImage(r,button){
button.disabled=true;imageStatus(r,button,'Preparando a imagem…');
try{if(!navigator.clipboard?.write||typeof ClipboardItem==='undefined')throw new Error('indisponível');
// Chamada dentro do gesto do clique; o PNG é resolvido em seguida.
await navigator.clipboard.write([new ClipboardItem({'image/png':imageBlob(r)})]);
imageStatus(r,button,(r.kind==='video'?'Quadro copiado':'Imagem copiada')+'. Cole junto do prompt no seu projeto.');
}catch{imageStatus(r,button,'O navegador não permitiu copiar a imagem. Use “Baixar PNG” e anexe o arquivo ao projeto.')}finally{button.disabled=false}
}
async function downloadReferenceImage(r,button){button.disabled=true;try{download(await imageBlob(r),r.id+(r.kind==='video'?'-quadro':'')+'.png');imageStatus(r,button,'PNG preparado para download, com a orientação da prévia.')}catch{imageStatus(r,button,'PNG indisponível. Use “Abrir original” para salvar o arquivo.')}finally{button.disabled=false}}
const initial=new URLSearchParams(location.search);if(initial.has('q'))$('q').value=initial.get('q');render();
if(initial.has('ref')){const r=refs.find(r=>r.id===initial.get('ref'));if(r)detail(r)}

