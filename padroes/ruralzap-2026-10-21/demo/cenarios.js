/* Identidade de cenários: nomes legíveis e igualdade dos dados, não dos resultados. */
(function(root){
  'use strict';
  const clean=name=>String(name??'').normalize('NFC').trim().replace(/\s+/g,' ');
  const key=name=>clean(name).toLocaleLowerCase('pt-BR');
  function uniqueName(name,names,max=48){
    const requested=clean(name).slice(0,max),occupied=new Set(names.map(key));
    if(!occupied.has(key(requested)))return requested;
    const base=requested.replace(/\s+\(\d+\)$/,'');
    for(let n=1;;n++){
      const suffix=` (${n})`,candidate=base.slice(0,max-suffix.length).trimEnd()+suffix;
      if(!occupied.has(key(candidate)))return candidate;
    }
  }
  function normalizeNames(items){
    // Reserve original names first so an existing "Plano (1)" keeps its identity.
    const reserved=new Map(),seen=new Map();
    for(const item of items){if(!reserved.has(item.tool))reserved.set(item.tool,[]);reserved.get(item.tool).push(item.name);}
    return items.map(item=>{
      if(!seen.has(item.tool))seen.set(item.tool,new Set());
      const used=seen.get(item.tool);let name=clean(item.name).slice(0,48)||'Cenário';
      if(used.has(key(name)))name=uniqueName(name,reserved.get(item.tool));
      used.add(key(name));reserved.get(item.tool).push(name);
      return name===item.name?item:{...item,name};
    });
  }
  function signature(tool,data){
    if(!data||typeof data!=='object')return null;
    const entries=Object.keys(data).sort().map(k=>[k,data[k]]);
    if(!entries.length||entries.some(([,v])=>typeof v==='number'?!Number.isFinite(v):typeof v!=='string'))return null;
    return JSON.stringify([tool,entries]);
  }
  function matching(items,tool,data,read){
    const target=signature(tool,data);if(!target)return [];
    return items.filter(item=>{try{return item.tool===tool&&signature(item.tool,read(item))===target;}catch{return false;}});
  }
  function duplicateGroups(items,read){
    const groups=new Map();
    for(const item of items){
      try{const id=signature(item.tool,read(item));if(!id)continue;if(!groups.has(id))groups.set(id,[]);groups.get(id).push(item);}catch{/* Invalid legacy entries retain their existing recovery UI. */}
    }
    return [...groups.values()].filter(group=>group.length>1);
  }
  const api={uniqueName,normalizeNames,matching,duplicateGroups};
  if(typeof module!=='undefined')module.exports=api;else root.RuralScenarios=api;
})(typeof window==='undefined'?globalThis:window);
