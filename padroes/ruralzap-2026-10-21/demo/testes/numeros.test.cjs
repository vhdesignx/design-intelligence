const assert=require('node:assert/strict');
const N=require('../numeros.js');
const C=require('../calculos.js');
const money={money:true,decimals:2};
const value=(raw,options={})=>N.format(raw,options).value;

assert.equal(value('120000',money),'120.000');
assert.equal(value('120000',{...money,final:true}),'120.000,00');
assert.equal(value('1234,5',{...money,final:true}),'1.234,50');
assert.equal(value('120,',money),'120,');
assert.equal(value('120,',{...money,final:true}),'120,00');
assert.equal(value('',{...money,final:true}),'');
assert.equal(value('0',{...money,final:true}),'0,00');
assert.equal(value(',5',money),'0,5');
assert.equal(value('0001234'),'1.234');
assert.equal(value('1234,5678',{final:true}),'1.234,5678');
assert.equal(value('R$ 1.234,56',money),'1.234,56');

// Nenhum dígito é perdido por Number, arredondamento ou corte silencioso.
const huge='555516556646161511611511';
assert.equal(value(huge,{...money,final:true}),'555.516.556.646.161.511.611.511,00');
assert.throws(()=>C.parse(value(huge,money),2),/1 bilhão/);
assert.equal(value('120,0061665163',{...money,final:true}),'120,0061665163');
assert.throws(()=>C.parse(value('120,0061665163',money),2),/2 casas decimais/);
for(const text of ['-123','1e3','1,234.56','1.23','12 reais']){
 assert.equal(value(text,money),text);
 assert.throws(()=>C.parse(value(text,money),2));
}

// Digitação real: agrupamento crescente, vírgula parcial e posição do cursor.
let state={value:'',caret:0};
for(const digit of '1234567,89'){
 const before={value:state.value,start:state.caret,end:state.caret};
 const raw=state.value.slice(0,state.caret)+digit+state.value.slice(state.caret);
 state=N.edit(raw,state.caret+1,before,'insertText',digit,money);
 assert.equal(state.caret,state.value.length);
}
assert.equal(state.value,'1.234.567,89');
assert.equal(C.parse(state.value,2),1234567.89);

assert.deepEqual(N.edit('19.234',2,{value:'1.234',start:1,end:1},'insertText','9',money),{value:'19.234',caret:2,valid:true});
assert.deepEqual(N.edit('1234',1,{value:'1.234',start:2,end:2},'deleteContentBackward',null,money),{value:'234',caret:0,valid:true});
assert.deepEqual(N.edit('1234',1,{value:'1.234',start:1,end:1},'deleteContentForward',null,money),{value:'134',caret:1,valid:true});
assert.equal(N.edit('12.',3,{value:'12',start:2,end:2},'insertText','.',money).value,'12,');
assert.equal(N.edit('1.23',4,{value:'',start:0,end:0},'insertFromPaste',null,money).value,'1.23');
assert.equal(value('1000000000,00',money),'1.000.000.000,00');
assert.equal(C.parse(value('1000000000,00',money),2),1e9);
const start={value:'',start:0,end:0};
const first={value:'123',start:3,end:3},second={value:'1.234',start:5,end:5};
const h=N.history(start);
h.record(start,first);h.record(first,second);
assert.deepEqual(h.move(-1),first);
assert.deepEqual(h.move(1),second);
h.amend({...second,value:'1.234,00'});
assert.deepEqual(h.move(-1),first);
h.record(first,{value:'123,5',start:5,end:5});
assert.equal(h.move(1),null);
assert.deepEqual(h.move(-1),first);
assert.deepEqual(h.move(-1),start);
assert.equal(h.move(-1),null);
console.log('Números: moeda, medidas, colagem, precisão, limite e edição do cursor verificados.');

// A entrada rejeita a operação inteira; não transforma texto ambíguo em outro valor.
const prior={value:'120.000,00',start:10,end:10};
assert.match(N.propose(prior,'5','insertText',money).message,/2 casas/);
assert.match(N.propose(prior,'a','insertText',money).message,/apenas números/);
assert.match(N.propose({...prior,start:0,end:10},'1250sadas','insertFromPaste',money).message,/apenas números/);
assert.match(N.propose({...prior,start:0,end:10},'1,234.56','insertFromPaste',money).message,/apenas números/);
assert.equal(N.propose({...prior,start:0,end:10},'R$ 1.234,56','insertFromPaste',money).value,'1.234,56');
assert.equal(N.propose({...prior,start:0,end:10},'R$ 1.234,56','insertFromPaste',money).message,'');
assert.equal(N.propose({...prior,start:8,end:10},'52','insertText',money).value,'120.000,52');
assert.equal(N.propose({...prior,start:8,end:10},'52','insertText',money).message,'');
assert.match(N.propose({value:'10',start:2,end:2},',','insertText',{decimals:0}).message,/inteiros/);
assert.match(N.propose({value:'1',start:1,end:1},',12','insertFromPaste',{decimals:1}).message,/1 casa decimal/);
assert.match(N.propose({value:'1000000000',start:10,end:10},'1','insertText',money).message,/máximo/);
console.log('Entrada: letras, precisão e colagem inválida bloqueadas; seleção e moeda preservadas.');
