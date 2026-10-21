/* Hero fixa; ao cobri-la, o menu assume a forma final no mesmo frame. */
(()=>{
 'use strict';
 const main=document.querySelector('#main'),header=document.querySelector('.topbar');
 const stage=document.querySelector('.header-stage'),footer=document.querySelector('.site-footer');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,slot=null,catalog=null,measure=true,top=0,closed=null;
 const resize=new ResizeObserver(()=>schedule(true));
 function sync(force=false){
  if(frame){cancelAnimationFrame(frame);frame=0;}
  measure=measure||force;
  const next=main.querySelector('.hero-slot'),changed=next!==slot;
  if(changed){
   resize.disconnect();slot=next;catalog=main.querySelector('#ferramentas');measure=true;
   resize.observe(stage);
   if(slot){resize.observe(slot);slot.addEventListener('focusin',event=>{if(event.target.matches(':focus-visible')){window.RuralScroll?.interrupt();scrollTo({top:0,behavior:'instant'});}});}
  }
  if(measure){
   measure=false;top=stage.offsetHeight;
   header.style.setProperty('--brand-end',(header.querySelector('.brand').offsetWidth+12)+'px');
   const home=main.querySelector('.home');
   if(home){
    home.style.setProperty('--hero-stick-top',top+'px');
    home.style.setProperty('--catalog-stick-top',top+'px');
    const minimum=innerHeight-top-footer.offsetHeight+slot.offsetHeight+2;
    home.style.setProperty('--banner-min-height',motion.matches||innerWidth<=760?'0px':Math.ceil(minimum)+'px');
   }
  }
  const distance=slot?catalog.getBoundingClientRect().top-header.getBoundingClientRect().bottom:-1;
  const covered=!slot||motion.matches||distance<=.5;
  if(covered!==closed||force){
   closed=covered;
   header.toggleAttribute('data-hero-covered',covered);
   // As três partes trocam juntas: recorte da marca, superfície verde e moldura.
   // A rolagem continua suave; o desenho não atravessa a faixa sob o logo.
   header.style.setProperty('--menu-progress',covered?'1':'0');
   header.style.setProperty('--menu-seal',covered?'1':'0');
  }
 }
 function schedule(remeasure=false){measure=measure||remeasure;if(!frame)frame=requestAnimationFrame(()=>sync());}
 window.RuralBanner={update:sync,scrollToTools(){
  sync(true);
  const el=main.querySelector('#ferramentas');if(!el)return;
  // Lenis 1.3.27 já aplica o scroll-margin-top do destino.
  if(window.RuralScroll)RuralScroll.to(el);
  else el.scrollIntoView({behavior:motion.matches?'instant':'smooth'});
 }};
 addEventListener('scroll',()=>sync(),{passive:true});
 addEventListener('resize',()=>schedule(true),{passive:true});
 motion.addEventListener('change',()=>sync(true));
 new MutationObserver(()=>schedule(true)).observe(main,{childList:true});
 sync(true);
})();
