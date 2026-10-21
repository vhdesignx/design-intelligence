/* Motor independente da UI. Valores de entrada já validados; moeda em reais. */
(function(root){
  'use strict';
  const round = n => Math.round((n + Number.EPSILON) * 100) / 100;
  const ceil = n => Math.max(0,Math.ceil((n - Number.EPSILON * Math.max(1, n) * 4) * 100) / 100);
  const units = {ha:{label:'Hectares',short:'ha',factor:10000},m2:{label:'Metros quadrados',short:'m²',factor:1},paulista:{label:'Alqueire paulista',short:'alq. paulista',factor:24200},mineiro:{label:'Alqueire mineiro/goiano',short:'alq. mineiro/goiano',factor:48400},baiano:{label:'Alqueire baiano',short:'alq. baiano',factor:96800}};
  const rates = [[1,.7,.4,.2,.03],[2,1.4,.8,.4,.07],[3.3,2.3,1.3,.6,.1],[4.7,3.3,1.9,.85,.15],[8.6,6,3.4,1.6,.3],[20,12,6.4,3,.45]];
  function parse(value, decimals=4){
    const s=String(value).trim();
    if(!s) throw new Error('Preencha este campo.');
    if(!/^\d+(?:,\d+)?$/.test(s) && !/^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(s)) throw new Error('Use vírgula para decimais. Ex.: 1.234,56.');
    if((s.split(',')[1]||'').length>decimals) throw new Error(`Use até ${decimals} ${decimals===1?'casa decimal':'casas decimais'}.`);
    const n=Number(s.replaceAll('.','').replace(',','.'));
    if(!Number.isFinite(n)||n>1e9) throw new Error('Informe um valor de até 1 bilhão.');
    return n;
  }
  function pv(payment,n,rate){let sum=0; for(let m=1;m<=n;m++) sum+=payment/(1+rate)**m; return sum;}
  function irr(cash,entry,payment,n){
    const financed=cash-entry;
    if(financed<=0 || payment<=0) return null;
    if(Math.abs(payment*n-financed)<1e-8) return 0;
    let low=-.999999,high=1;
    while(pv(payment,n,high)>financed && high<1e12) high*=2;
    if(pv(payment,n,high)>financed) return null;
    for(let i=0;i<180;i++){const mid=(low+high)/2; if(pv(payment,n,mid)>financed)low=mid;else high=mid;}
    return (low+high)/2*100;
  }
  function calc(id,d){
    if(id==='safra')return {hectare:d.custo/d.area,saca:d.custo/d.producao,produtividade:d.producao/d.area,kg:d.producao*d.peso/d.area,total:d.custo};
    if(id==='equilibrio'){const receita=d.preco*d.produtividade;return {sacas:ceil(d.custo/d.preco),preco:ceil(d.custo/d.produtividade),receita,saldo:receita-d.custo,margem:receita?((receita-d.custo)/receita*100):0,kg:ceil(d.custo/d.preco)*d.peso};}
    if(id==='leite'){const cot=round(d.coe+d.depreciacao+d.familia),ct=round(cot+d.oportunidade);return {coe:d.coe/d.litros,cot:cot/d.litros,ct:ct/d.litros,total:ct,totalCot:cot};}
    if(id==='areas'){const m2=d.quantidade*units[d.origem].factor;return {destino:m2/units[d.destino].factor,ha:m2/10000,m2};}
    if(id==='compra'){const total=round(d.entrada+d.parcela*d.meses),presente=round(d.entrada+pv(d.parcela,d.meses,d.taxa/100));return {total,presente,diferenca:round(total-d.vista),diferencaVP:round(presente-d.vista),taxa:irr(d.vista,d.entrada,d.parcela,d.meses),fluxo:Array.from({length:d.meses+1},(_,m)=>({mes:m,nominal:m?d.parcela:d.entrada,presente:m?d.parcela/(1+d.taxa/100)**m:d.entrada}))};}
    if(id==='itr'){
      if(d.situacao!=='tributavel')return {blocked:true};
      // Áreas em décimos inteiros evitam cruzar uma faixa por erro binário.
      const a=BigInt(Math.round(d.total*10)),ex=BigInt(Math.round(d.excluida*10)),b=BigInt(Math.round(d.benfeitoria*10)),u=BigInt(Math.round(d.utilizada*10));
      if(a<=0n || ex>a || ex+b>a || u>a-ex-b)throw new Error('Áreas incompatíveis.');
      const t=a-ex,ap=t-b;
      let col=4;if(ap>0n){col=[30n,50n,65n,80n].findIndex(k=>u*100n<=ap*k);if(col<0)col=4;}
      let row=[50,200,500,1000,5000].findIndex(k=>d.total<=k);if(row<0)row=5;
      const aliquota=rates[row][col],centavos=BigInt(Math.round(d.vtn*100));
      const divRound=(num,den)=>(num*2n+den)/(den*2n);
      const vtnT=divRound(centavos*t,a),imposto=divRound(vtnT*BigInt(Math.round(aliquota*100)),10000n);
      return {tributavel:Number(t)/10,aproveitavel:Number(ap)/10,gu:ap>0n?Number(u)/Number(ap)*100:null,aliquota,vtnT:Number(vtnT)/100,calculado:Number(imposto)/100,itr:Number(imposto<1000n?1000n:imposto)/100,row,col};
    }
    throw new Error('Ferramenta desconhecida.');
  }
  const api={parse,calc,units,rates,round,ceil,irr,pv};
  if(typeof module!=='undefined')module.exports=api;else root.RuralCalculos=api;
})(typeof window==='undefined'?globalThis:window);
