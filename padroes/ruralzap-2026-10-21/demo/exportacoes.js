/* Relatórios locais: modelo visual em XLSX; biblioteca carregada somente ao exportar. */
(function(root){
  'use strict';
  const green='617C0B', muted='65705D';
  const number='#,##0.####', decimal='#,##0.00', percent='0.00%';
  const metrics={
    safra:[['saca','Custo por saca','R$/sc'],['hectare','Custo por hectare','R$/ha'],['produtividade','Produtividade','sc/ha'],['kg','Produtividade em quilos','kg/ha'],['total','Custo total informado','R$']],
    equilibrio:[['sacas','Produção de equilíbrio','sc/ha'],['preco','Preço de equilíbrio','R$/sc'],['receita','Receita prevista','R$/ha'],['saldo','Saldo previsto','R$/ha'],['margem','Margem sobre a receita','%'],['kg','Produção de equilíbrio em quilos','kg/ha']],
    compra:[['presente','Valor presente do prazo','R$'],['total','Total nominal a prazo','R$'],['diferenca','Diferença nominal para à vista','R$'],['diferencaVP','Diferença presente para à vista','R$'],['taxa','Taxa implícita mensal','% a.m.']],
    leite:[['ct','Custo total por litro','R$/litro'],['coe','COE por litro','R$/litro'],['cot','COT por litro','R$/litro'],['totalCot','Custo operacional total (COT)','R$'],['total','Custo total do período','R$']],
    areas:[['destino','Área convertida','unid. destino'],['ha','Área em hectares','ha'],['m2','Área em metros quadrados','m²']],
    itr:[['itr','ITR devido estimado','R$'],['calculado','Imposto antes do mínimo legal','R$'],['tributavel','Área tributável','ha'],['aproveitavel','Área aproveitável','ha'],['gu','Grau de utilização (GU)','%'],['aliquota','Alíquota','%'],['vtnT','Valor da Terra Nua tributável','R$']]
  };
  const clone=value=>JSON.parse(JSON.stringify(value));
  const formatFor=unit=>unit.startsWith('%')?percent:unit.startsWith('R$')?decimal:number;
  function typed(value,unit,fmt=formatFor(unit)){
    if(value===null)return {value:'Não se aplica',format:'@'};
    if(typeof value==='number'){
      if(!Number.isFinite(value))throw new Error('Resultado inválido. Recalcule a conta.');
      if(fmt===number)fmt=Number.isInteger(value)?'#,##0':Math.abs(value)<.0001?'0.0000E+00':number;
      return {value:unit.startsWith('%')?value/100:value,format:fmt};
    }
    return {value:String(value??''),format:'@'};
  }
  function describe({id,tool,accounts,generatedAt=new Date()}){
    if(!metrics[id]||!accounts.length||accounts.length>3||accounts.some(a=>a.result.blocked))throw new Error('Calcule uma conta válida antes de exportar.');
    const report={id,title:tool.title,generatedAt:new Date(generatedAt),names:accounts.map(a=>a.name||'Sua conta'),formula:tool.formula,caution:tool.caution,source:'https://www.ruralzap.com.br/ferramentas/'+tool.slug};
    report.results=metrics[id].map(([key,label,unit])=>({label,unit,cells:accounts.map(a=>typed(a.result[key],unit))}));
    if(id==='areas')report.results.splice(1,0,{label:'Unidade de destino',unit:'',cells:accounts.map(a=>typed(tool.fields.find(f=>f.id==='destino').options.find(([key])=>key===a.data.destino)?.[1],''))});
    report.inputs=tool.fields.map(f=>({label:f.label,unit:f.options?'':f.unit,cells:accounts.map(a=>{
      if(f.options)return typed(f.options.find(([value])=>value===a.data[f.id])?.[1]||a.data[f.id],'');
      const cell=typed(a.data[f.id],f.unit,f.dec===0?'#,##0':formatFor(f.unit));
      return cell;
    })}));
    if(id==='areas')report.inputs[0].unit='unid. origem';
    if(id==='compra')report.schedules=accounts.map(a=>a.result.fluxo.map(row=>({...row})));
    return report;
  }
  function merge(sheet,row,last,value){
    sheet.mergeCells(row,2,row,last);
    sheet.getCell(row,2).value=value;
  }
  function rowHeight(text,width=92){return Math.max(28,Math.ceil(text.length/width)*15+12);}
  function writeCells(sheet,row,entry,start=4){
    sheet.getCell(row,2).value=entry.label;
    sheet.getCell(row,2).alignment={vertical:'middle',wrapText:true};
    sheet.getCell(row,3).value=entry.unit||null;
    sheet.getCell(row,3).alignment={vertical:'middle',horizontal:'center',wrapText:true};
    entry.cells.forEach((item,i)=>{
      const c=sheet.getCell(row,start+i);c.value=item.value;c.numFmt=item.format;
      c.alignment={vertical:'middle',horizontal:typeof item.value==='number'?'right':'left',wrapText:typeof item.value!=='number'};
    });
    sheet.getRow(row).height=Math.max(row===10?44:30,...entry.cells.map(c=>typeof c.value==='string'?rowHeight(c.value,24):30),rowHeight(entry.label,36));
  }
  function page(sheet,last,lastRow,count){
    sheet.views=[{state:'frozen',ySplit:9,showGridLines:false,activeCell:'B5'}];
    sheet.getColumn(last+1).width=3;sheet.getColumn(last+1).hidden=false;
    for(let row=1;row<=lastRow;row++){const gutter=sheet.getCell(row,last+1);gutter.value=null;gutter.style={fill:{type:'pattern',pattern:'solid',fgColor:{argb:'FFFFFFFF'}}};}
    sheet.pageSetup={paperSize:9,orientation:count===1?'portrait':'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0,printArea:`A1:${String.fromCharCode(65+last)}${lastRow}`,printTitlesRow:'8:9',margins:{left:.3,right:.3,top:.4,bottom:.4,header:.15,footer:.15}};
    sheet.headerFooter={oddFooter:'&LRuralZap&C&P / &N'};
  }
  async function build(ExcelJS,template,report){
    const wb=new ExcelJS.Workbook();
    await wb.xlsx.load(template);
    // Imported equal styles are shared by ExcelJS: detach before changing cells.
    wb.eachSheet(sheet=>sheet.eachRow({includeEmpty:true},row=>row.eachCell({includeEmpty:true},cell=>{cell.style=clone(cell.style);})));
    wb.creator='RuralZap';wb.lastModifiedBy='RuralZap';wb.created=report.generatedAt;wb.modified=report.generatedAt;
    wb.subject=report.title;wb.title=report.title;
    const s=wb.getWorksheet('Relatório'),count=report.names.length,last=3+count;
    for(const row of [5,6,31,32,33,34])s.unMergeCells(`B${row}:F${row}`);
    for(let col=last+1;col<=8;col++)s.getColumn(col).hidden=true;
    merge(s,5,last,report.title);s.getRow(5).height=count===1?48:36;s.getCell('B5').alignment={vertical:'middle',wrapText:true};
    merge(s,6,last,count>1?`${count} cenários · comparação dos resultados`:'Registro dos resultados da sua conta');
    s.getCell(3,last).value=report.generatedAt;s.getCell(3,last).numFmt='dd/mm/yyyy';
    s.getCell(3,last).font={name:'Arial',size:10,color:{argb:muted}};
    s.getCell(3,last).alignment={horizontal:'right',vertical:'middle'};
    for(const row of [9,21]){
      report.names.forEach((name,i)=>{s.getCell(row,4+i).value=name;});
      s.getRow(row).height=Math.max(34,...report.names.map(name=>rowHeight(name,24)));
    }
    report.results.forEach((entry,i)=>writeCells(s,10+i,entry));
    for(let row=10+report.results.length;row<=18;row++)s.getRow(row).hidden=true;
    report.inputs.forEach((entry,i)=>writeCells(s,22+i,entry));
    for(let row=22+report.inputs.length;row<=28;row++)s.getRow(row).hidden=true;
    merge(s,31,last,report.formula);merge(s,32,last,report.caution);
    merge(s,33,last,{text:'Metodologia da ferramenta no RuralZap ↗',hyperlink:report.source});
    s.getCell('B33').font={name:'Arial',size:10,color:{argb:green},underline:true};
    merge(s,34,last,'Gerado no RuralZap · Ferramentas do campo');
    for(const row of [31,32])s.getRow(row).height=rowHeight(s.getCell(row,2).value,count===1?84:count===2?113:145);
    page(s,last,35,count);
    const schedule=wb.getWorksheet('Cronograma');
    if(!report.schedules){wb.removeWorksheet(schedule.id);return wb;}
    // Reuse the template's branded header and body styles for any payment count.
    const body=clone(schedule.getCell('D12').style),header=clone(schedule.getCell('D9').style),band=clone(schedule.getCell('B8').style);
    for(const row of [5,6,31,32,33,34])schedule.unMergeCells(`B${row}:F${row}`);
    schedule.eachRow(row=>row.eachCell(cell=>{cell.value=null;}));
    const end=2+2*count,max=Math.max(...report.schedules.map(rows=>rows.length)),totalRow=10+max;
    schedule.getColumn(2).width=10;
    for(let col=3;col<=end;col++)schedule.getColumn(col).width=23;
    for(let col=end+1;col<=8;col++)schedule.getColumn(col).hidden=true;
    merge(schedule,5,end,'Cronograma mensal');
    merge(schedule,6,end,'Pagamentos e valor presente · valores em R$');
    schedule.getCell('B8').value=null;schedule.getCell('B9').value='Mês';
    report.names.forEach((name,i)=>{
      const col=3+i*2;schedule.mergeCells(8,col,8,col+1);schedule.getCell(8,col).value=name;schedule.getCell(8,col).style=clone(band);schedule.getCell(8,col).alignment={horizontal:'center',vertical:'middle',wrapText:true};
      ['Pagamento','Valor presente'].forEach((text,j)=>{const c=schedule.getCell(9,col+j);c.value=text;c.style=clone(header);});
    });
    schedule.getRow(8).height=Math.max(30,...report.names.map(n=>rowHeight(n,44)));
    for(let i=0;i<max;i++){
      const row=10+i;schedule.getRow(row).height=26;
      for(let col=2;col<=end;col++)schedule.getCell(row,col).style=clone(body);
      schedule.getCell(row,2).value=i===0?'Hoje':i;schedule.getCell(row,2).numFmt='0';schedule.getCell(row,2).alignment={horizontal:'center',vertical:'middle'};
      report.schedules.forEach((rows,j)=>{
        ['nominal','presente'].forEach((key,k)=>{const c=schedule.getCell(row,3+j*2+k);c.value=rows[i]?rows[i][key]:'—';c.numFmt=decimal;c.alignment={horizontal:'right',vertical:'middle'};});
      });
    }
    for(let col=2;col<=end;col++)schedule.getCell(totalRow,col).style=clone(band);
    schedule.getCell(totalRow,2).value='Total';schedule.getRow(totalRow).height=32;
    report.schedules.forEach((rows,i)=>['nominal','presente'].forEach((key,j)=>{
      const col=3+i*2+j,letter=String.fromCharCode(64+col),c=schedule.getCell(totalRow,col);
      c.value={formula:`SUM(${letter}10:${letter}${totalRow-1})`,result:rows.reduce((sum,item)=>sum+item[key],0)};c.numFmt=decimal;c.alignment={horizontal:'right',vertical:'middle'};
    }));
    // Remove unused template formatting below short schedules, without changing drawings.
    for(let row=totalRow+1;row<=Math.max(35,totalRow+1);row++){
      schedule.getRow(row).eachCell(c=>{c.value=null;c.style={};});schedule.getRow(row).height=14;
    }
    page(schedule,end,totalRow,count);
    return wb;
  }
  let libraryPromise,templatePromise;
  function library(){
    if(root.ExcelJS)return Promise.resolve(root.ExcelJS);
    if(!libraryPromise)libraryPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src='vendor/exceljs-4.4.0/exceljs.min.js';
      const fail=()=>{script.remove();reject(new Error('Não foi possível carregar a exportação. Tente novamente.'));};
      script.onload=()=>root.ExcelJS?resolve(root.ExcelJS):fail();script.onerror=fail;document.head.appendChild(script);
    }).catch(error=>{libraryPromise=null;throw error;});
    return libraryPromise;
  }
  function template(){
    if(!templatePromise)templatePromise=fetch('assets/relatorio-ruralzap.xlsx?v=1').then(response=>{
      if(!response.ok)throw new Error('Não foi possível abrir o modelo da planilha.');return response.arrayBuffer();
    }).catch(error=>{templatePromise=null;throw error;});
    return templatePromise;
  }
  async function download(payload){
    const report=describe(payload),[ExcelJS,model]=await Promise.all([library(),template()]);
    const wb=await build(ExcelJS,model,report),buffer=await wb.xlsx.writeBuffer();
    const url=URL.createObjectURL(new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
    const a=document.createElement('a');a.href=url;a.download=`ruralzap-${report.names.length>1?'comparacao-':''}${report.id}.xlsx`;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  }
  const api={describe,build,download};
  if(typeof module!=='undefined')module.exports=api;else root.RuralExport=api;
})(typeof window==='undefined'?globalThis:window);
