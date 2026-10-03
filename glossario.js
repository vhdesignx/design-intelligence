'use strict';
const el=id=>document.getElementById(id),normal=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const terms=GLOSSARY.terms,examples=VISUAL_STUDIES,references=CATALOG.references;
const asset=p=>(window.SITE_PUBLIC?'':'../')+p.split('/').map(encodeURIComponent).join('/');
const termExample=new Map();for(const s of examples)for(const r of s.regions)if(!termExample.has(r.term))termExample.set(r.term,{study:s.id,region:r.id});
const categories=[...new Set(terms.map(t=>t.category))];
for(const category of categories){const option=document.createElement('option');option.value=category;option.textContent=category;el('termCategory').append(option)}
el('editorialNote').textContent=GLOSSARY.editorial_note;
const aliases={principios:'lei psicologia percepcao gestalt comportamento heuristica',composicao:'layout visual tipografia espacamento design',elementos:'componente interface ui',pesquisa:'ux research usuario teste',qualidade:'acessibilidade responsividade performance'};
const exampleLink=t=>{const ex=termExample.get(t.id);return ex?'<a class="term-example" href="#estudo='+ex.study+':'+ex.region+'">Ver marcado na referência ↗</a>':''};
function renderTerms(){
const query=normal(el('termSearch').value).split(/\s+/).filter(Boolean);
const found=terms.filter(t=>{const search=normal(JSON.stringify(t)+' '+(aliases[normal(t.category)]||''));return (!el('termCategory').value||t.category===el('termCategory').value)&&query.every(q=>search.includes(q))});
el('termCount').textContent=found.length+' de '+terms.length+' termos';el('noTerms').hidden=found.length>0;
el('terms').innerHTML=found.map(t=>{const source=GLOSSARY.sources[t.source];return '<article class="term" id="'+t.id+'"><p class="eyebrow">'+safe(t.category)+'</p><h3><a href="#'+t.id+'">'+safe(t.name)+'</a></h3><p class="definition">'+safe(t.definition)+'</p>'+exampleLink(t)+'<details><summary>Como aplicar e avaliar</summary><dl><dt>Aplicação</dt><dd>'+safe(t.apply)+'</dd><dt>Exemplo</dt><dd>'+safe(t.example)+'</dd><dt>Cuidado</dt><dd>'+safe(t.caution)+'</dd><dt>Pergunta de revisão</dt><dd>'+safe(t.check)+'</dd></dl>'+(source?'<p class="term-source">'+safe(source.kind)+' · <a href="'+safe(source.url)+'" target="_blank" rel="noopener">'+safe(source.label)+' ↗</a></p>':'<p class="term-source">Vocabulário e exemplo prático de projeto; não é uma lei universal.</p>')+(t.refs?.length?'<div class="related"><span>No acervo:</span> '+t.refs.map(id=>{const r=references.find(r=>r.id===id);return r?'<a href="index.html?ref='+encodeURIComponent(id)+'">'+safe(r.review.title)+' ↗</a>':''}).join(' ')+'</div>':'')+'</details></article>'}).join('');
}
let activeStudy,activeRegion;
function renderStudy(studyId,regionId){
const study=examples.find(s=>s.id===studyId)||examples[0],ref=references.find(r=>r.id===study.reference);activeStudy=study;
el('studyChoices').innerHTML=examples.map(s=>'<button data-study="'+s.id+'" aria-pressed="'+(s.id===study.id)+'"><span>'+safe(s.name)+'</span><small>'+safe(s.type)+'</small></button>').join('');
const [x,y,w,h]=study.crop;
el('studyScene').innerHTML='<div class="study-heading"><div><h3>'+safe(study.name)+'</h3><p>'+safe(study.intro)+'</p></div><a href="index.html?ref='+study.reference+'">Abrir referência completa ↗</a></div><div class="study-layout"><div class="study-figure"><div class="study-canvas" style="aspect-ratio:'+study.width*w+'/'+study.height*h+'" role="group" aria-label="Referência '+safe(study.name)+' com marcações de estudo"><img src="'+asset(ref.preview)+'" alt="'+safe(ref.review.observation)+'" style="width:'+(100/w)+'%;left:'+(-x/w*100)+'%;top:'+(-y/h*100)+'%" decoding="async"><div class="regions">'+study.regions.map((r,i)=>'<button class="region" data-region="'+r.id+'" aria-pressed="false" aria-label="'+(i+1)+'. '+safe(r.label)+'" style="left:'+r.box[0]*100+'%;top:'+r.box[1]*100+'%;width:'+r.box[2]*100+'%;height:'+r.box[3]*100+'%"><span>'+(i+1)+'</span></button>').join('')+'</div></div><div class="figure-caption"><span>'+safe(ref.author)+' · '+safe(study.type)+'</span><button id="toggleMarks" aria-pressed="true">Ocultar marcações</button></div><p class="study-note">Imagem de referência com recorte de enquadramento. As marcações abrem explicações, não operam o produto.</p></div><aside class="study-notes"><div class="region-list" role="group" aria-label="Partes da referência">'+study.regions.map((r,i)=>'<button data-region="'+r.id+'" aria-pressed="false"><span>'+String(i+1).padStart(2,'0')+'</span>'+safe(r.label)+'</button>').join('')+'</div><div id="regionDescription" aria-live="polite"></div></aside></div>';
el('toggleMarks').onclick=()=>{const hidden=el('studyScene').querySelector('.regions').hidden=!el('studyScene').querySelector('.regions').hidden;el('toggleMarks').setAttribute('aria-pressed',!hidden);el('toggleMarks').textContent=hidden?'Mostrar marcações':'Ocultar marcações'};
selectRegion(regionId||study.regions[0].id);
}
function selectRegion(id){
const region=activeStudy.regions.find(r=>r.id===id)||activeStudy.regions[0];activeRegion=region;
document.querySelectorAll('[data-region]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.region===region.id)));
const term=terms.find(t=>t.id===region.term);
el('regionDescription').innerHTML='<p class="eyebrow">'+safe(term.category)+' / '+safe(term.name)+'</p><h4>'+safe(region.label)+'</h4><dl><dt>O que está na tela</dt><dd>'+safe(region.observation)+'</dd><dt>Efeito na leitura · interpretação</dt><dd>'+safe(region.effect)+'</dd><dt>Como levar para seu projeto</dt><dd>'+safe(region.transfer)+'</dd></dl><p class="review-question">'+safe(region.question)+'</p><a href="#'+region.term+'">Consultar '+safe(term.name)+' ↓</a>';
}
document.addEventListener('click',e=>{const study=e.target.closest('[data-study]'),region=e.target.closest('[data-region]');if(study){renderStudy(study.dataset.study);el('studyChoices').querySelector('[data-study="'+activeStudy.id+'"]').focus()}if(region)selectRegion(region.dataset.region)});
function openHash(){
const id=decodeURIComponent(location.hash.slice(1));
if(id.startsWith('estudo=')){const [study,region]=id.slice(7).split(':');renderStudy(study,region);el('visualStudies').scrollIntoView({block:'start'});el('studyChoices').querySelector('[aria-pressed="true"]').focus({preventScroll:true});return}
const t=terms.find(t=>t.id===id);if(!t)return;el('termSearch').value='';el('termCategory').value='';renderTerms();const card=el(id);card.querySelector('details').open=true;card.setAttribute('tabindex','-1');card.focus({preventScroll:true});card.scrollIntoView({block:'start'});
}
el('termSearch').oninput=renderTerms;el('termCategory').onchange=renderTerms;
el('clearTerms').onclick=()=>{el('termSearch').value='';el('termCategory').value='';renderTerms();el('termSearch').focus()};
window.addEventListener('hashchange',openHash);
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a&&a.hash===location.hash)openHash()});
renderTerms();renderStudy(examples[0].id);openHash();

