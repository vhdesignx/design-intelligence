const assert=require('node:assert/strict');
const {uniqueName,normalizeNames,matching,duplicateGroups}=require('../cenarios.js');
const {parse,calc}=require('../calculos.js');
const s=(id,name,raw={},tool='safra',exactArea=null)=>({id,name,tool,raw,exactArea,created:'2026-10-21',example:true});

assert.equal(uniqueName('Exemplo',['Exemplo']),'Exemplo (1)');
assert.equal(uniqueName('exemplo',['Exemplo','Exemplo (1)']),'exemplo (2)');
assert.equal(uniqueName('Exemplo (1)',['Exemplo','Exemplo (1)']),'Exemplo (2)');
assert.equal(uniqueName('  Plano   de safra  ',[]),'Plano de safra');
assert.equal(uniqueName('A'.repeat(48),['A'.repeat(48)]).length,48);
assert.equal(uniqueName('A'.repeat(48),['A'.repeat(48)]).endsWith(' (1)'),true);
const legacy=[s('a','Exemplo',{custo:'120.000,00'}),s('b','Exemplo',{custo:'120.000'}),s('c','Exemplo (1)'),s('d','Exemplo',{},'compra')];
const snapshot=JSON.stringify(legacy),named=normalizeNames(legacy);
assert.deepEqual(named.map(s=>s.name),['Exemplo','Exemplo (2)','Exemplo (1)','Exemplo']);
assert.equal(JSON.stringify(legacy),snapshot,'Não muda o objeto original');
for(let i=0;i<legacy.length;i++){const {name,...before}=legacy[i],{name:afterName,...after}=named[i];assert.deepEqual(after,before,'Renomear preserva ids, valores, datas e ferramenta');}
assert.deepEqual(normalizeNames(named),named,'Migração idempotente');

const data=raw=>({escopo:raw.escopo??'total',custo:parse(raw.custo,2),area:parse(raw.area),producao:parse(raw.producao),peso:parse(raw.peso)});
const base={custo:'120.000,00',area:'20',producao:'1.200',peso:'60'};
const a=s('a','Original',base),b=s('b','Outro nome',{custo:'120000',area:'20,0000',producao:'1200',peso:'60,0'});
const c=s('c','Mesmo resultado',{...base,custo:'240.000',area:'40',producao:'2400'});
assert.equal(calc('safra',data(a.raw)).saca,calc('safra',data(c.raw)).saca);
assert.deepEqual(matching([a,b,c],'safra',data(a.raw),s=>data(s.raw)).map(s=>s.id),['a','b']);
assert.deepEqual(duplicateGroups([a,b,c],s=>data(s.raw)).map(g=>g.map(s=>s.id)),[['a','b']]);
assert.equal(matching([a],'safra',data({...base,escopo:'desembolso'}),s=>data(s.raw)).length,0,'Alcance diferente é hipótese diferente');
assert.equal(matching([a],'safra',data({...base,custo:'120.000,01'}),s=>data(s.raw)).length,0,'Não compara números arredondados');
assert.equal(matching([a],'compra',data(a.raw),s=>data(s.raw)).length,0);
assert.deepEqual(duplicateGroups([a,s('bad','Legado ilegível',{})],s=>data(s.raw)),[]);
const areaA=s('aa','Área',{quantidade:'4,1322',origem:'paulista',destino:'ha'},'areas',100000/24200);
const areaB=s('bb','Área arredondada',{...areaA.raw},'areas',null);
const readArea=s=>({...s.raw,quantidade:s.exactArea??parse(s.raw.quantidade)});
assert.deepEqual(duplicateGroups([areaA,areaB],readArea),[],'Considera precisão preservada ao inverter área');
console.log('Cenários: sufixos, colisões, migração sem perda, equivalência numérica, hipóteses diferentes, precisão e legados inválidos verificados.');
