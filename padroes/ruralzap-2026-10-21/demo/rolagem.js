/* Lenis: melhora progressiva; a posição continua sendo a rolagem real do navegador. */
(()=>{
 'use strict';
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let instance=null,frame=0,generation=0,failed=false,last=0,samples=[];
 const root=document.documentElement;
 function interrupt(){
  if(instance?.isScrolling==='smooth')instance.scrollTo(instance.actualScroll,{immediate:true});
  cancelAnimationFrame(frame);frame=0;last=0;samples=[];
 }
 function dispose(reason){
  interrupt();instance?.destroy();instance=null;root.dataset.scrollMode=reason;
 }
 function tick(time){
  frame=0;
  if(!instance||document.hidden)return;
  if(last){const gap=time-last;if(gap<250)samples.push(gap);}
  last=time;
  // Só degrada após movimento sustentado; não confunde uma pausa da aba com lentidão.
  if(samples.length>=60){
   if(samples.filter(x=>x>32).length>45){failed=true;dispose('native-performance');return;}
   samples=[];
  }
  instance.raf(time);
  if(instance.isScrolling==='smooth')frame=requestAnimationFrame(tick);
  else{last=0;samples=[];}
 }
 function wake(){
  if(instance&&!frame&&!document.hidden){
   // Reinicia o relógio depois de ocioso, antes de consumir o novo gesto.
   instance.raf(performance.now());frame=requestAnimationFrame(tick);
  }
 }
 async function setup(){
  const token=++generation;
  dispose(reduced.matches?'native-reduced-motion':'native');
  if(failed||!fine.matches||reduced.matches||!window.ResizeObserver)return;
  try{
   const {default:Lenis}=await import('./vendor/lenis-1.3.27/lenis.mjs');
   if(token!==generation||!fine.matches||reduced.matches)return;
   instance=new Lenis({
    lerp:.12,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:false,
    stopInertiaOnNavigate:true,
    prevent:node=>node.matches('input,textarea,select,dialog,[role=listbox],.tool-switch-options,.tool-nav,[data-native-scroll]'),
    virtualScroll:({event})=>!event.ctrlKey&&!event.metaKey&&!event.shiftKey
   });
   instance.on('virtual-scroll',wake);
   instance.on('scroll',()=>window.RuralBanner?.update());
   root.dataset.scrollMode='smooth';
  }catch{failed=true;dispose('native-unavailable');}
 }
 window.RuralScroll={interrupt,to(target,options={}){
  interrupt();
  if(instance){instance.resize();instance.raf(performance.now());instance.scrollTo(target,options);wake();}
  else if(typeof target==='number')scrollTo({top:target,behavior:'instant'});
  else target?.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
 }};
 addEventListener('pointerdown',interrupt,{passive:true,capture:true});
 addEventListener('keydown',event=>{if(['Tab','Home','End','PageUp','PageDown','ArrowUp','ArrowDown',' '].includes(event.key))interrupt();},{capture:true});
 addEventListener('hashchange',interrupt);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)interrupt();});
 document.addEventListener('click',event=>{if(event.target.closest('a[href^="#"]'))interrupt();},{capture:true});
 fine.addEventListener('change',setup);reduced.addEventListener('change',setup);
 setup();
})();
