/* Controles locais. Valores e fórmulas continuam no motor de cálculo. */
(()=>{'use strict';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=(path,cls='')=>`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;
const check=svg('m5 12 4 4L19 6','option-check');
const hints={desembolso:'Pagamentos feitos para produzir.',operacional:'Custeio, depreciação e trabalho familiar.',total:'Custo operacional + remuneração da terra e do capital.',tributavel:'Calcular uma estimativa para imóvel tributável.',incerta:'Conferir o enquadramento antes de calcular.'};
const optionIcons={desembolso:'M4 6h14v14H4zM4 6V4h12v2M13 11h7v5h-7zM16 13.5h.01',operacional:'M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6m-6 4h3',total:'M4 19V9m5 10V5m5 14v-7m5 7V3M2 21h20',tributavel:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6',incerta:'M12 8v.01M12 11v6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'};
let cleanup=()=>{},active=null;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function field(f,raw){
 let value=raw[f.id]??(f.options?f.options[0][0]:'');
 if(!f.options)value=RuralNumeros.format(value,{money:f.unit==='R$',final:true}).value;
 const id='f-'+f.id,help='help-'+f.id,error='error-'+f.id;
 let control;
 if(f.options){
  const text=f.options.find(([v])=>v===value)?.[1]||'Escolha uma opção';
  control=`<input type="hidden" id="value-${f.id}" name="${f.id}" value="${escape(value)}"><button type="button" id="${id}" class="account-select" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="label-${f.id}" aria-describedby="${help} ${error}" data-select="${f.id}"><span class="select-copy"><span class="account-label" id="label-${f.id}">${escape(f.label)}</span><span class="select-value">${escape(text)}</span></span>${svg('m6 9 6 6 6-6','select-chevron')}</button>`;
 }else{
  control=`<div class="account-control"><label class="account-label" for="${id}">${escape(f.label)}</label><div class="account-input-row">${f.unit==='R$'?'<span class="input-prefix" id="unit-'+f.id+'">R$</span>':''}<input id="${id}" class="account-input" name="${f.id}" type="text" inputmode="${f.dec===0?'numeric':'decimal'}" autocomplete="off" spellcheck="false" value="${escape(value)}" placeholder="${f.unit==='R$'?'0,00':'0'}" aria-describedby="${help} ${error}${f.unit?' unit-'+f.id:''}">${f.unit&&f.unit!=='R$'?`<span class="input-unit" id="unit-${f.id}">${escape(f.unit)}</span>`:''}</div></div>`;
 }
 return `<div class="field-group ${f.wide?'wide':''} ${f.unit==='R$'?'money-field':''}" data-field="${f.id}">${control}<p class="field-help" id="${help}">${escape(f.help)}</p><p class="error-message" id="${error}" aria-live="polite"></p></div>`;
}
function report(input,f,final){
 let message='',text=input.value.trim();
 // A vírgula no final é uma etapa normal enquanto a pessoa digita.
 if(!final&&text.endsWith(','))text=text.slice(0,-1);
 if(text||final){
  try{
   const value=RuralCalculos.parse(text,f.dec);
   if(final&&f.positive&&value<=0)throw new Error('Informe um valor maior que zero.');
   if((final&&value<f.min)||value>(f.max??1e9))throw new Error(`Use um valor entre ${f.min.toLocaleString('pt-BR')} e ${(f.max??1e9).toLocaleString('pt-BR')}.`);
  }catch(error){message=error.message;}
 }
 const group=input.closest('.field-group');
 group.classList.toggle('invalid',Boolean(message));
 group.querySelector('.error-message').textContent=message;
 if(message)input.setAttribute('aria-invalid','true');else input.removeAttribute('aria-invalid');
}
function mount(form,fields){
 cleanup();const disposers=[],commits=[];
 window.RuralEstudo?.mount(form);
 function listen(el,type,fn,options){el.addEventListener(type,fn,options);disposers.push(()=>el.removeEventListener(type,fn,options));}
 for(const f of fields){
  if(!f.options){
   const input=form.querySelector('#f-'+f.id);
   const options={money:f.unit==='R$',decimals:f.dec,max:f.max??1e9};
   let previous=null,composing=false,restoring=false,compositionStart=null;
   const notice=document.createElement('p');notice.className='entry-notice';notice.hidden=true;notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');notice.setAttribute('aria-atomic','true');input.closest('.field-group').append(notice);
   disposers.push(()=>notice.remove());
   const reject=message=>{notice.textContent=message;notice.hidden=false;};
   const clearNotice=()=>{notice.hidden=true;notice.textContent='';};
   const snapshot=()=>({value:input.value,start:input.selectionStart,end:input.selectionEnd});
   const history=RuralNumeros.history(snapshot());
   let last=snapshot();
   const remember=()=>{previous=snapshot();};
   const apply=result=>{
    if(input.value!==result.value){input.value=result.value;input.setSelectionRange(result.caret,result.caret);}
    input.closest('.account-control').classList.toggle('is-filled',input.value.trim().length>0);
   };
   function restore(direction){
    const state=history.move(direction);if(!state)return;
    clearNotice();
    restoring=true;input.value=state.value;input.setSelectionRange(state.start,state.end);
    input.closest('.account-control').classList.toggle('is-filled',Boolean(input.value));
    input.dispatchEvent(new Event('input',{bubbles:true}));restoring=false;
    previous=null;last=snapshot();
   }
   listen(input,'keydown',event=>{
    if(composing||event.altKey||!(event.ctrlKey||event.metaKey))return;
    const key=event.key.toLowerCase();
    if(key==='z'||(key==='y'&&event.ctrlKey)){
     event.preventDefault();restore(key==='y'||event.shiftKey?1:-1);
    }
   });
   listen(input,'beforeinput',event=>{
    if(event.inputType==='historyUndo'||event.inputType==='historyRedo'){
     event.preventDefault();restore(event.inputType==='historyUndo'?-1:1);return;
    }
    if(composing||event.isComposing)return;
    remember();
    if(event.inputType?.startsWith('insert')&&event.data!==null&&event.data!==undefined&&event.cancelable){
     const candidate=RuralNumeros.propose(previous,event.data,event.inputType,options);
     if(candidate.message){event.preventDefault();reject(candidate.message);previous=null;}
    }
   });
   listen(input,'paste',event=>{
    if(!event.clipboardData)return;
    const candidate=RuralNumeros.propose(snapshot(),event.clipboardData.getData('text/plain'),'insertFromPaste',options);
    if(candidate.message){event.preventDefault();reject(candidate.message);previous=null;}
   });
   listen(input,'compositionstart',()=>{compositionStart=snapshot();composing=true;});
   listen(input,'compositionend',()=>{
    composing=false;previous=compositionStart;compositionStart=null;
    input.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertFromComposition'}));
   });
   listen(input,'input',event=>{
    if(composing||event.isComposing){event.stopPropagation();return;}
    if(restoring)return;
    const before=previous||last;
    const result=RuralNumeros.edit(input.value,input.selectionStart,previous,event.inputType,event.data,options);
    const message=RuralNumeros.problem(result,options);
    if(message&&!event.inputType?.startsWith('delete')){
     input.value=before.value;input.setSelectionRange(before.start,before.end);previous=null;
     reject(message);event.stopImmediatePropagation();return;
    }
    clearNotice();apply(result);
    history.record(before,snapshot());last=snapshot();previous=null;
   });
   const commit=()=>{
    clearNotice();
    const result=RuralNumeros.format(input.value,{...options,final:true});
    if(input.value!==result.value){restoring=true;apply(result);input.dispatchEvent(new Event('input',{bubbles:true}));restoring=false;}
    history.amend(snapshot());last=snapshot();previous=null;report(input,f,true);
   };
   listen(input,'blur',commit);commits.push(commit);
   if(input.value.trim())report(input,f,false);
   continue;
  }
  const trigger=form.querySelector('#f-'+f.id),input=form.querySelector('#value-'+f.id);
  let popup=null,animation=null,opened=false,index=0,buffer='',lastKey=0;
  const controller={close};
  function selected(){return Math.max(0,f.options.findIndex(([v])=>v===input.value));}
  function place(){
   if(!popup||!opened)return;
   const r=trigger.getBoundingClientRect(),vw=document.documentElement.clientWidth,vh=window.visualViewport?.height||innerHeight;
   popup.style.width=Math.min(r.width,vw-24)+'px';
   const availableBelow=vh-r.bottom-20,availableAbove=r.top-20;
   const up=availableBelow<Math.min(popup.scrollHeight,260)&&availableAbove>availableBelow;
   popup.style.maxHeight=Math.max(80,Math.min(340,up?availableAbove:availableBelow))+'px';
   popup.style.left=Math.max(12,Math.min(r.left,vw-popup.offsetWidth-12))+'px';
   popup.style.top=Math.max(8,up?r.top-popup.offsetHeight-8:r.bottom+8)+'px';
   popup.dataset.side=up?'top':'bottom';
   popup.style.transformOrigin=up?'bottom center':'top center';
  }
  function highlight(next,scroll=false){
   index=Math.max(0,Math.min(next,f.options.length-1));
   if(!popup)return;
   popup.querySelectorAll('[role=option]').forEach((el,i)=>el.dataset.active=String(i===index));
   const context=popup.querySelector('.option-context');if(context)context.textContent=hints[f.options[index][0]]||'';
   trigger.setAttribute('aria-activedescendant','option-'+f.id+'-'+index);
   if(scroll){const option=popup.querySelectorAll('[role=option]')[index],top=option.offsetTop,bottom=top+option.offsetHeight;if(top<popup.scrollTop)popup.scrollTop=top;else if(bottom>popup.scrollTop+popup.clientHeight)popup.scrollTop=bottom-popup.clientHeight;}
  }
  function transition(show){
   if(!popup)return;
   const el=popup,existing=animation,style=getComputedStyle(el);
   const shift=el.dataset.side==='top'?5:-5;
   const start=existing?{opacity:style.opacity,transform:style.transform}:{opacity:show?0:1,transform:show?`translateY(${shift}px) scale(.975)`:'none'};
   existing?.cancel();
   if(reduced()){if(!show){el.remove();popup=null;}animation=null;return;}
   animation=el.animate([start,{opacity:show?1:0,transform:show?'none':`translateY(${shift}px) scale(.985)`}],{duration:show?240:150,easing:show?'cubic-bezier(.2,.85,.25,1)':'cubic-bezier(.4,0,1,1)',fill:'both'});
   const thisAnimation=animation;
   animation.onfinish=()=>{if(animation!==thisAnimation)return;if(!show){el.remove();popup=null;}thisAnimation.cancel();animation=null;};
  }
  function open(){
   if(opened)return;
   active?.close(false);active=controller;opened=true;index=selected();
   if(!popup){
    popup=document.createElement('div');popup.className='account-options';popup.id='options-'+f.id;popup.setAttribute('role','listbox');popup.setAttribute('aria-labelledby','label-'+f.id);
    popup.innerHTML=f.options.map(([value,label],i)=>`<div class="account-option" id="option-${f.id}-${i}" role="option" aria-selected="${value===input.value}" data-index="${i}" aria-labelledby="option-title-${f.id}-${i}" ${hints[value]?`aria-describedby="option-hint-${f.id}-${i}"`:''}>${window.RuralEstudo&&optionIcons[value]?svg(optionIcons[value],'option-icon'):''}<span class="option-text"><span class="option-title" id="option-title-${f.id}-${i}">${escape(label)}</span>${hints[value]?`<span class="option-hint" id="option-hint-${f.id}-${i}">${escape(hints[value])}</span>`:''}</span>${check}</div>`).join('')+(window.RuralEstudo&&f.options.some(([v])=>hints[v])?'<div class="option-context" aria-hidden="true"></div>':'');
    popup.addEventListener('pointerdown',e=>e.preventDefault());
    popup.addEventListener('pointermove',e=>{const option=e.target.closest('[data-index]');if(option&&e.pointerType==='mouse')highlight(Number(option.dataset.index));});
    popup.addEventListener('click',e=>{const option=e.target.closest('[data-index]');if(option){highlight(Number(option.dataset.index));close(true,true);}});
    document.body.append(popup);
   }
   popup.inert=false;popup.removeAttribute('aria-hidden');
   popup.querySelectorAll('[role=option]').forEach((el,i)=>el.setAttribute('aria-selected',String(i===selected())));
   trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-controls',popup.id);
   highlight(index);place();highlight(index,true);transition(true);
  }
  function close(commit=false,focus=false){
   if(!opened)return;
   opened=false;if(active===controller)active=null;
   if(commit&&f.options[index][0]!==input.value){input.value=f.options[index][0];trigger.querySelector('.select-value').textContent=f.options[index][1];input.dispatchEvent(new Event('input',{bubbles:true}));}
   trigger.setAttribute('aria-expanded','false');trigger.removeAttribute('aria-activedescendant');trigger.removeAttribute('aria-controls');
   if(popup){popup.inert=true;popup.setAttribute('aria-hidden','true');transition(false);}
   if(focus)trigger.focus({preventScroll:true});
  }
  listen(trigger,'click',()=>opened?close(false):open());
  listen(trigger,'keydown',e=>{
   const k=e.key;
   if(k==='Tab'){if(opened)close(true);return;}
   if(k==='Escape'){if(opened){e.preventDefault();close(false);}return;}
   if(e.altKey&&k==='ArrowUp'){e.preventDefault();close(true);return;}
   if(['Enter',' ','ArrowDown','ArrowUp','Home','End','PageDown','PageUp'].includes(k)){
    e.preventDefault();const wasOpen=opened;
    if(!wasOpen)open();
    if((k==='Enter'||k===' ')&&wasOpen)close(true);
    else if(k==='Home'||(k==='ArrowUp'&&!wasOpen))highlight(0,true);
    else if(k==='End')highlight(f.options.length-1,true);
    else if(wasOpen&&k==='ArrowDown')highlight(index+1,true);
    else if(wasOpen&&k==='ArrowUp')highlight(index-1,true);
    else if(k==='PageDown')highlight(index+10,true);
    else if(k==='PageUp')highlight(index-10,true);
    return;
   }
   if(k.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    e.preventDefault();open();const now=Date.now();buffer=now-lastKey<700?buffer+k:k;lastKey=now;
    const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    let query=normalize(buffer);const repeated=[...query].every(c=>c===query[0]);if(repeated)query=query[0];
    const order=f.options.map((_,i)=>(i+(repeated?index+1:0))%f.options.length);
    const match=order.find(i=>normalize(f.options[i][1]).startsWith(query));if(match!==undefined)highlight(match,true);
   }
  });
  listen(trigger,'blur',()=>close(false));
  listen(document,'pointerdown',e=>{if(opened&&!trigger.contains(e.target)&&!popup?.contains(e.target))close(false);});
  listen(window,'resize',place);
  listen(window,'scroll',e=>{if(opened&&!popup?.contains(e.target))place();},true);
  if(window.visualViewport)listen(window.visualViewport,'resize',place);
  disposers.push(()=>{opened=false;animation?.cancel();popup?.remove();if(active===controller)active=null;});
 }
 listen(form,'submit',()=>commits.forEach(commit=>commit()),true);
 // Depois do listener do aplicativo: ele registra o rascunho e limpa erros antigos.
 listen(form,'input',event=>{
  if(event.isComposing)return;
  const f=fields.find(item=>!item.options&&item.id===event.target.name);
  if(f)report(event.target,f,false);
 });
 cleanup=()=>{disposers.forEach(fn=>fn());cleanup=()=>{};};
}
window.RuralControles={field,mount,destroy:()=>cleanup()};
})();
