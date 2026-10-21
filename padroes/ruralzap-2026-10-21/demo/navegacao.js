/* Navegação persistente: indicador compartilhado e conteúdo sem apagar a página. */
(()=>{
 'use strict';
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let trigger=null,panel=null,animation=null,opened=false,events=null,observer=null;
 let nav=null,indicator=null,slide=null,geometry='',content=[];
 function close(restore=false){
  if(!opened)return;
  opened=false;trigger.setAttribute('aria-expanded','false');panel.inert=true;
  animate(false);if(restore)trigger.focus({preventScroll:true});
 }
 function animate(show){
  const el=panel,style=animation?getComputedStyle(el):null;
  const start=style?{opacity:style.opacity,transform:style.transform}:{opacity:show?0:1,transform:show?'translateY(-5px) scale(.985)':'none'};
  animation?.cancel();animation=null;
  if(motion.matches){el.hidden=!show;return;}
  animation=el.animate([start,{opacity:show?1:0,transform:show?'none':'translateY(-4px) scale(.99)'}],{duration:show?200:130,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
  const current=animation;
  current.onfinish=()=>{if(animation!==current)return;el.hidden=!show;current.cancel();animation=null;};
 }
 function open(keyboard=false){
  if(opened)return;
  opened=true;panel.hidden=false;panel.inert=false;
  trigger.setAttribute('aria-expanded','true');animate(true);
  if(keyboard)(panel.querySelector('[aria-current=page]')||panel.querySelector('a')).focus({preventScroll:true});
 }
 function position(smooth=false,force=false){
  if(!nav||!indicator)return;
  const selected=nav.querySelector('[aria-current=page]');if(!selected)return;
  const box=nav.getBoundingClientRect(),target=selected.getBoundingClientRect();
  if(!box.width||!target.width){slide?.cancel();slide=null;geometry='';return;}
  const left=target.left-box.left-nav.clientLeft,top=target.top-box.top-nav.clientTop;
  const key=[left,top,target.width,target.height,box.width].join('|');
  if(!force&&key===geometry)return;
  const from=indicator.getBoundingClientRect(),hadPosition=Boolean(geometry);
  geometry=key;slide?.cancel();slide=null;
  Object.assign(indicator.style,{width:target.width+'px',height:target.height+'px',top:top+'px',transform:`translateX(${left}px)`});
  nav.classList.add('has-indicator');
  if(!smooth||motion.matches||!hadPosition||!from.width)return;
  const x=from.left-box.left-nav.clientLeft,scale=from.width/target.width;
  slide=indicator.animate([
   {transform:`translateX(${x}px) scaleX(${scale})`},
   {transform:`translateX(${left}px) scaleX(1)`}
  ],{duration:260,easing:'cubic-bezier(.22,.8,.2,1)'});
  const current=slide;current.onfinish=()=>{if(slide===current){current.cancel();slide=null;}};
 }
 function transition(){
  content.forEach(item=>item.cancel());content=[];
  if(motion.matches)return;
  // Superfícies e barra permanecem visíveis. Não existe frame de tela vazia.
  document.querySelectorAll('.workspace-heading,.workspace .calc-shell').forEach(el=>{
   const item=el.animate([{opacity:.82,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:190,easing:'cubic-bezier(.2,.8,.2,1)'});
   content.push(item);item.onfinish=()=>{item.cancel();content=content.filter(value=>value!==item);};
  });
 }
 function mount(){
  events?.abort();observer?.disconnect();animation?.cancel();animation=null;opened=false;
  content.forEach(item=>item.cancel());content=[];
  events=new AbortController();const options={signal:events.signal};
  trigger=document.querySelector('.tool-switch-trigger');panel=document.querySelector('.tool-switch-options');
  const next=document.querySelector('.tool-nav');
  if(next!==nav){slide?.cancel();slide=null;geometry='';indicator=null;nav=next;}
  if(!trigger)return;
  panel.hidden=true;panel.inert=true;trigger.setAttribute('aria-expanded','false');
  if(nav){
   indicator=nav.querySelector('.tool-active-indicator');
   if(!indicator){indicator=document.createElement('span');indicator.className='tool-active-indicator';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);}
   position(true);
   observer=new ResizeObserver(()=>position());observer.observe(nav);
   nav.querySelectorAll('a').forEach(link=>observer.observe(link));
  }
  trigger.addEventListener('click',()=>opened?close():open(),options);
  trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();open(true);}},options);
  panel.addEventListener('keydown',e=>{
   if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
   e.preventDefault();const items=[...panel.querySelectorAll('a,button')],i=items.indexOf(document.activeElement);
   const next=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;
   items[next].focus();
  },options);
  panel.addEventListener('click',e=>{if(e.target.closest('a'))close();},options);
 }
 function destroy(){
  events?.abort();observer?.disconnect();animation?.cancel();slide?.cancel();
  content.forEach(item=>item.cancel());content=[];
  trigger=panel=nav=indicator=slide=animation=null;opened=false;geometry='';
 }
 document.addEventListener('pointerdown',e=>{if(opened&&!trigger.contains(e.target)&&!panel.contains(e.target))close();});
 document.addEventListener('focusin',e=>{if(opened&&!trigger.contains(e.target)&&!panel.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(opened&&e.key==='Escape'){e.preventDefault();close(true);}});
 addEventListener('hashchange',()=>close());
 addEventListener('resize',()=>{if(opened&&getComputedStyle(trigger.closest('.tool-switcher')).display==='none')close();position();});
 motion.addEventListener('change',()=>{
  if(motion.matches){content.forEach(item=>item.cancel());content=[];animation?.cancel();animation=null;if(panel)panel.hidden=!opened;}
  position(false,true);
 });
 window.RuralNavigation={mount,close,destroy,transition};
})();
