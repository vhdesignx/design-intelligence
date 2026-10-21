/* Busca local: mesma lista de ferramentas usada pelas calculadoras. */
(()=>{
 'use strict';
 const root=document.querySelector('.tool-search');
 const input=root.querySelector('input'),panel=root.querySelector('.search-panel');
 const list=root.querySelector('[role=listbox]'),status=root.querySelector('[role=status]');
 const toggle=root.querySelector('.search-toggle'),clear=root.querySelector('.search-clear');
 const compact=matchMedia('(max-width:1000px)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const aliases={safra:'plantio lavoura hectare saca custo',equilibrio:'lucro receita produtividade preco producao',compra:'parcelas pagamento financiamento juros insumos',leite:'pecuaria vaca litros coe cot',areas:'alqueire hectares metros m2 terreno medidas conversao',itr:'imposto tributacao propriedade rural terra'};
 let opened=false,selected=-1,matches=[],animation=null;
 function render(){
  const words=normalize(input.value).split(/\s+/).filter(Boolean);
  matches=RuralTools.filter(t=>words.every(word=>normalize([t.title,t.short,t.category,aliases[t.id]].join(' ')).includes(word)));
  selected=-1;input.removeAttribute('aria-activedescendant');
  root.querySelector('.search-label').textContent=words.length?'Resultados':'Escolha uma ferramenta';
  list.replaceChildren();
  for(const tool of matches){
   const link=document.createElement('a');link.id='search-'+tool.id;link.href='#'+tool.id;
   link.role='option';link.tabIndex=-1;link.setAttribute('aria-selected','false');
   const symbol=document.createElement('span');symbol.className='search-symbol';symbol.innerHTML=tool.icon;
   const text=document.createElement('span'),title=document.createElement('strong'),category=document.createElement('small');
   title.textContent=tool.title;category.textContent=tool.category;text.append(title,category);
   const arrow=document.createElement('span');arrow.className='search-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
   link.append(symbol,text,arrow);list.append(link);
  }
  root.querySelector('.search-empty').hidden=matches.length>0;
  status.textContent=words.length?`${matches.length} ${matches.length===1?'ferramenta encontrada':'ferramentas encontradas'}.`:'';
  clear.hidden=!input.value;
 }
 function siblings(inert){
  if(!compact.matches)inert=false;
  document.querySelector('.brand').inert=inert;
  document.querySelector('.topbar > nav').inert=inert;
 }
 function open(){
  if(opened)return;
  window.RuralScroll?.interrupt();window.RuralNavigation?.close();
  opened=true;root.classList.add('is-open');panel.hidden=false;
  input.setAttribute('aria-expanded','true');toggle.setAttribute('aria-expanded','true');
  render();siblings(true);animation?.cancel();
  if(!reduced.matches)animation=panel.animate([{opacity:0,transform:'translateY(-5px)'},{opacity:1,transform:'none'}],{duration:180,easing:'cubic-bezier(.2,.8,.2,1)'});
 }
 function close(restore=false){
  if(!opened)return;
  opened=false;animation?.cancel();root.classList.remove('is-open');panel.hidden=true;
  input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');toggle.setAttribute('aria-expanded','false');siblings(false);
  if(restore)(compact.matches?toggle:input).focus({preventScroll:true});
 }
 function choose(index){
  if(!matches.length)return;
  selected=(index+matches.length)%matches.length;
  const options=[...list.children];options.forEach((option,i)=>option.setAttribute('aria-selected',i===selected));
  input.setAttribute('aria-activedescendant',options[selected].id);options[selected].scrollIntoView({block:'nearest',behavior:'instant'});
 }
 toggle.addEventListener('click',()=>{open();input.focus({preventScroll:true});});
 input.addEventListener('focus',open);input.addEventListener('click',open);
 input.addEventListener('input',()=>{open();render();});
 clear.addEventListener('click',()=>{input.value='';render();input.focus({preventScroll:true});});
 root.querySelector('.search-close').addEventListener('click',()=>close(true));
 input.addEventListener('keydown',event=>{
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();open();choose(selected+(event.key==='ArrowDown'?1:-1));}
  else if(event.key==='Enter'){event.preventDefault();open();list.children[selected<0?0:selected]?.click();}
  else if(event.key==='Escape'){event.preventDefault();close(true);}
 });
 list.addEventListener('click',event=>{
  const link=event.target.closest('a');if(!link)return;
  close();input.value='';clear.hidden=true;
  // O destino já aberto também recebe foco; nunca deixa o foco numa opção oculta.
  requestAnimationFrame(()=>document.querySelector('#main').focus({preventScroll:true}));
 });
 document.addEventListener('pointerdown',event=>{if(opened&&!root.contains(event.target))close();});
 document.addEventListener('focusin',event=>{if(opened&&!root.contains(event.target))close();});
 addEventListener('hashchange',()=>close());
 compact.addEventListener('change',()=>{close();});
})();
