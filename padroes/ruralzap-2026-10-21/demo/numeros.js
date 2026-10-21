/* Apresentação decimal em pt-BR sem converter o texto para Number. */
(function(root){
 'use strict';
 const tokens=s=>(s.match(/[\d,]/g)||[]).length;
 function format(raw,{money=false,final=false,regroup=false,caret=String(raw).length}={}){
  raw=String(raw);let text=raw.trim();
  if(money)text=text.replace(/^R\$\s*/, '');
  if(!text)return {value:'',caret:0,valid:true};
  const shape=regroup?/^(?:\d[\d.]*|)(?:,\d*)?$/:/^(?:\d+|\d{1,3}(?:\.\d{3})+|)(?:,\d*)?$/;
  if(!shape.test(text))return {value:raw,caret,valid:false};
  const comma=text.includes(','),[integer,fraction='']=text.split(',');
  const digits=integer.replaceAll('.','');
  const whole=digits.replace(/^0+(?=\d)/,'')||'0';
  let value=whole.replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  if(final){
   if(money)value+=','+fraction.padEnd(2,'0');
   else if(fraction)value+=','+fraction;
  }else if(comma)value+=','+fraction;
  // Contar dígitos, não posições visuais: os pontos não deslocam a edição.
  let count=tokens(raw.slice(0,caret))-Math.max(0,digits.length-whole.length);
  if(!digits&&comma&&count)count++;
  count=Math.max(0,count);
  let cursor=0,seen=0;
  while(cursor<value.length&&seen<count){if(/[\d,]/.test(value[cursor]))seen++;cursor++;}
  return {value,caret:cursor,valid:true};
 }
 function edit(raw,caret,previous,type,data,options={}){
  let regroup=false;
  const prior=previous&&format(previous.value,{money:options.money});
  if(prior?.valid){
   regroup=type?.startsWith('delete')||(type==='insertText'&&data?.length===1);
   if(previous.start===previous.end){
    const at=previous.start;
    // Apagar junto a um ponto elimina o dígito adjacente, sem prender o cursor.
    if(type==='deleteContentBackward'&&previous.value[at-1]==='.'){
     raw=previous.value.slice(0,at-2)+previous.value.slice(at);caret=at-2;
    }else if(type==='deleteContentForward'&&previous.value[at]==='.'){
     raw=previous.value.slice(0,at)+previous.value.slice(at+2);caret=at;
    }
   }
   // Teclados numéricos podem emitir ponto como tecla decimal.
   if(type==='insertText'&&data==='.'&&options.decimals>0&&!previous.value.includes(',')){
    raw=raw.slice(0,caret-1)+','+raw.slice(caret);regroup=true;
   }
  }
  return format(raw,{...options,regroup,caret});
 }
 function history(initial){
  const entries=[{...initial}];let index=0;
  return {
   record(before,after){
    if(before.value===after.value)return;
    entries[index]={...before};entries.splice(index+1);
    entries.push({...after});index++;
    if(entries.length>100){entries.shift();index--;}
   },
   amend(current){entries[index]={...current};},
   move(direction){
    const next=index+direction;
    if(next<0||next>=entries.length)return null;
    index=next;return {...entries[index]};
   }
  };
 }
 // A apresentação preserva dados antigos; a entrada nova tem um contrato estrito.
 function problem(result,{decimals=4,max=1e9}={}){
  if(!result.valid)return 'Use apenas números no formato 1.234,56.';
  if(!result.value)return '';
  const fraction=result.value.split(',')[1];
  if((fraction!==undefined&&decimals===0)||(fraction?.length||0)>decimals)return decimals===0?'Este campo aceita somente números inteiros.':`Este campo aceita até ${decimals} ${decimals===1?'casa decimal':'casas decimais'}.`;
  if(Number(result.value.replaceAll('.','').replace(',','.'))>max)return `O valor máximo é ${max.toLocaleString('pt-BR')}.`;
  return '';
 }
 function propose(previous,data,type,options={}){
  const raw=previous.value.slice(0,previous.start)+data+previous.value.slice(previous.end);
  const result=edit(raw,previous.start+data.length,previous,type,data,options);
  return {...result,message:problem(result,options)};
 }
 const api={format,edit,history,problem,propose};
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.RuralNumeros=api;
})(typeof window==='object'?window:globalThis);
