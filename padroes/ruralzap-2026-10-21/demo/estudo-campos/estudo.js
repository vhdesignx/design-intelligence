/* Acabamento A escolhido por Victor em 21/10/2026. Não muda fórmulas. */
(()=>{
 'use strict';
 document.body.dataset.controlStyle='a';
 function mount(form){
  form.querySelectorAll('.account-control').forEach(control=>{
   const input=control.querySelector('input');
   const sync=()=>control.classList.toggle('is-filled',input.value.trim().length>0);
   if(!input.dataset.studyStates){input.addEventListener('input',sync);input.addEventListener('change',sync);input.dataset.studyStates='bound';}sync();
  });
  form.parentElement.querySelector('.field-study')?.remove();
 }
 window.RuralEstudo={mount};
})();
