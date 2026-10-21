/* Modelo da exploração: preço e custo constantes, sem alterar a conta salva. */
(function(root){
 'use strict';
 function model(data,width=460){
  const equilibrium=data.custo/data.preco;
  const step=10**-Math.max(2,Math.min(4,(String(data.produtividade).split('.')[1]||'').length));
  const max=Math.ceil(Math.max(data.produtividade*1.5,equilibrium*1.25,1)*100)/100;
  const maxY=Math.max(max*data.preco,data.custo,1)*1.12;
  const left=58,right=width-28;
  const x=value=>left+value/max*(right-left);
  const y=value=>174-value/maxY*143;
  function point(value){
   const quantity=Math.min(max,Math.max(0,value));
   const revenue=data.preco*quantity;
   const difference=revenue-data.custo;
   const balance=Math.abs(difference)<Number.EPSILON*Math.max(revenue,data.custo,1)*8?0:difference;
   return {quantity,revenue,balance,x:x(quantity),y:y(revenue),costY:y(data.custo)};
  }
  return {equilibrium,min:0,max,step,maxY,x,y,point,width,left,right};
 }
 const api={model};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.RuralEquilibrio=api;
})(typeof window==='object'?window:globalThis);
