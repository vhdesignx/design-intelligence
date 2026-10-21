(()=>{'use strict';
const {calc,parse,units,rates}=RuralCalculos;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=(n,d=2)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const flexible=n=>n>0&&n<.0001?'< 0,0001':Number(n).toLocaleString('pt-BR',{maximumFractionDigits:4});
const money=n=>'R$ '+num(n);
const icons={reset:'M3 10a9 9 0 1 1 2 8M3 4v6h6',arrow:'M5 12h14m-5-5 5 5-5 5',back:'M19 12H5m5-5-5 5 5 5',leaf:'M20 4c-9-2-17 4-14 11 7 4 15-2 14-11ZM4 21 15 10',chart:'M4 18 10 12l4 3 6-11M4 4v16h16',milk:'M9 3h6v4l3 5v9H6v-9l3-5V3Zm0 4h6M6 14h12',area:'m4 7 8-4 8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4m-8 4v10',receipt:'M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6m-6 4h3',purchase:'M3 5h3l2 11h10l3-8H7M9 20h.01M18 20h.01',lock:'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5V10Zm7 4v3',check:'m5 12 4 4L19 6',save:'M5 3h14v18l-7-4-7 4V3Z',copy:'M9 8h11v13H9V8ZM5 16H3V3h12v2',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',close:'m6 6 12 12M6 18 18 6',spark:'m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z',info:'M12 8v.01M12 11v6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',swap:'M4 8h16m-4-4 4 4-4 4M20 16H4m4-4-4 4 4 4',print:'M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7v-7Z',chevron:'m9 5 7 7-7 7',clock:'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'};
const icon=n=>`<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="${icons[n]||icons.leaf}"/></svg>`;
const scope=[['desembolso','Desembolso'],['operacional','Custo operacional'],['total','Custo total econômico']];
const field=(id,label,unit,help='',opt={})=>({id,label,unit,help,dec:unit==='R$'?2:4,min:0,...opt});
const select=(id,label,options,help='')=>({id,label,options,help,wide:true});
const sourceBase='https://www.ruralzap.com.br/ferramentas/';
const official='https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/ditr/manual-itr/declarar/calculo-imposto';
const tools={
 safra:{title:'Custo por hectare e por saca',short:'Custo da safra',category:'Safra e insumos',group:'safra',icon:'leaf',action:'Calcular custo',desc:'Saiba quanto cada hectare e cada saca custam para a sua produção.',intro:'A mesma safra, vista pela área e pela produção.',empty:'Seu custo, em uma leitura clara.',slug:'custo-por-hectare-e-saca',fields:[select('escopo','Quais custos você incluiu?',scope,'O cálculo distribui o valor informado. Não acrescenta custos.'),field('custo','Custos totais da safra','R$','Total da área cultivada.',{wide:true}),field('area','Área cultivada','ha','',{positive:true}),field('producao','Produção total','sc','Produção após perdas.',{positive:true}),field('peso','Peso da saca','kg','Peso usado na venda.',{positive:true,wide:true})],example:{escopo:'total',custo:'120.000,00',area:'20',producao:'1.200',peso:'60'},formula:'Custo/ha = custo total ÷ área. Custo/saca = custo total ÷ produção.',method:'Use área, produção e custos do mesmo ciclo. O peso da saca define a unidade; não altera o número de sacas informado. Produtividade em kg/ha = sacas/ha × peso.',caution:'Desembolso, custo operacional e custo econômico têm alcances diferentes. Compare cenários com a mesma base. A seleção não inclui depreciação ou oportunidade automaticamente.'},
 equilibrio:{title:'Ponto de equilíbrio da safra',short:'Ponto de equilíbrio',category:'Safra e insumos',group:'safra',icon:'chart',action:'Encontrar equilíbrio',desc:'Descubra quanto precisa produzir ou receber para cobrir os custos.',intro:'Encontre a produção e o preço que cobrem o custo informado.',empty:'Descubra onde a safra se paga.',slug:'ponto-de-equilibrio-safra',fields:[select('escopo','Qual custo você quer cobrir?',scope),field('custo','Custo por hectare','R$','Valor referente a um hectare.',{wide:true}),field('preco','Preço por saca','R$','Preço líquido ou despesas já no custo.',{positive:true}),field('produtividade','Produtividade prevista','sc/ha','Após perdas esperadas.',{positive:true}),field('peso','Peso da saca','kg','O preço e a produção usam este peso.',{positive:true,wide:true})],example:{escopo:'total',custo:'6.000,00',preco:'120,00',produtividade:'60',peso:'60'},formula:'Produção de equilíbrio = custo/ha ÷ preço/saca. Preço de equilíbrio = custo/ha ÷ sacas/ha.',method:'O custo por hectare permanece constante. Os mínimos são arredondados para cima em 0,01 saca e R$ 0,01. Receita = preço × produtividade; saldo = receita − custo.',caution:'É uma conta de nivelamento. Se colher ou vender mais alterar os custos, atualize o orçamento. O saldo cobre somente os componentes informados; não equivale ao caixa disponível.'},
 compra:{title:'Insumos: à vista ou a prazo?',short:'À vista ou a prazo',category:'Safra e insumos',group:'safra',icon:'purchase',action:'Comparar opções',desc:'Compare o custo das propostas e o efeito do tempo sobre o dinheiro.',intro:'Coloque as duas propostas na mesma base para comparar.',empty:'O prazo também tem um preço.',slug:'compra-insumos-a-vista-ou-a-prazo',fields:[field('vista','Preço à vista','R$','Preço total da mesma compra.',{wide:true,positive:true}),field('entrada','Entrada paga hoje','R$','Use 0 se não houver.'),field('parcela','Valor da parcela','R$','Parcelas iguais.',{positive:true}),field('meses','Número de parcelas','meses','De 1 a 120, primeira em um mês.',{min:1,max:120,dec:0}),field('taxa','Taxa de comparação','% a.m.','Sua hipótese mensal; 0 compara totais.',{max:100})],example:{vista:'10.000,00',entrada:'0',parcela:'1.800,00',meses:'6',taxa:'1'},formula:'Valor presente = entrada + Σ parcela ÷ (1 + taxa mensal)ᵐ.',method:'A entrada vence hoje. Parcelas mensais iguais começam em um mês. O total nominal soma pagamentos; o valor presente desconta cada vencimento pela taxa escolhida.',caution:'A taxa implícita iguala o valor presente das parcelas ao valor financiado. Pode ser negativa e não é CET. O cálculo não atende carência, parcelas irregulares ou pagamentos por safra. Confira o caixa antes de decidir.'},
 leite:{title:'Custo por litro de leite',short:'Custo do leite',category:'Pecuária',group:'pecuaria',icon:'milk',action:'Calcular custo do leite',desc:'Enxergue o custo efetivo, operacional e total de cada litro produzido.',intro:'Separe os componentes para entender o custo do seu leite.',empty:'Cada litro tem uma conta.',slug:'custo-por-litro-de-leite',fields:[field('litros','Leite produzido no período','litros','Toda a produção medida, incluindo o leite não vendido.',{wide:true,positive:true}),field('coe','Custeio da atividade (COE)','R$','Insumos e serviços consumidos no período.',{wide:true}),field('depreciacao','Depreciação','R$','Desgaste atribuído ao período.'),field('familia','Trabalho familiar','R$','Somente o que não entrou no COE.'),field('oportunidade','Oportunidade: capital e terra','R$','Remuneração alternativa, sem repetir juros ou arrendamento.',{wide:true})],example:{litros:'15.000',coe:'22.500,00',depreciacao:'1.200,00',familia:'1.800,00',oportunidade:'1.500,00'},formula:'COT = COE + depreciação + trabalho familiar. CT = COT + oportunidade. Custo/litro = custo ÷ produção.',method:'Todos os componentes usam o mesmo período. Inclua a produção destinada a bezerros, consumo e descartes registrados. Não use apenas os litros vendidos.',caution:'A ferramenta recebe os totais já atribuídos ao leite. Uma compra de insumo para vários meses precisa ser apropriada ao consumo. Oportunidade não é um pagamento a fazer.'},
 areas:{title:'Conversor de áreas rurais',short:'Hectares e alqueires',category:'Terra e imposto',group:'terra',icon:'area',action:'Converter área',desc:'Hectares, metros quadrados e alqueires. Com a medida regional certa.',intro:'Transforme medidas sem perder de vista qual alqueire está usando.',empty:'A mesma terra. Outra medida.',slug:'conversor-hectares-alqueires',fields:[field('quantidade','Área a converter','','Até quatro casas decimais. Zero é aceito.',{wide:true}),select('origem','Unidade de origem',Object.entries(units).map(([k,u])=>[k,u.label])),select('destino','Unidade de destino',Object.entries(units).map(([k,u])=>[k,u.label]))],example:{quantidade:'10',origem:'ha',destino:'paulista'},formula:'Destino = área de origem × fator de origem em m² ÷ fator de destino em m².',method:'1 ha = 10.000 m². Alqueire paulista = 24.200 m²; mineiro/goiano = 48.400 m²; baiano = 96.800 m². A precisão é mantida durante a conta, com até quatro casas na exibição.',caution:'Confirme a medida do documento: o nome do estado não garante a convenção usada. A conversão não substitui medição ou georreferenciamento. Ao inverter, preservamos a área exata até você editar o valor.'},
 itr:{title:'Calculadora de ITR',short:'Imposto rural · ITR',category:'Terra e imposto',group:'terra',icon:'receipt',action:'Calcular estimativa',desc:'Entenda a estimativa do imposto, da área tributável à alíquota.',intro:'Confira cada etapa da estimativa antes da declaração.',empty:'O imposto explicado, etapa a etapa.',slug:'calculadora-itr',fields:[select('situacao','Situação do imóvel',[['tributavel','Simular imóvel sujeito ao ITR'],['incerta','Preciso verificar imunidade ou isenção']]),field('total','Área total do imóvel','ha','Até uma casa decimal.',{positive:true,dec:1}),field('excluida','Área não tributável','ha','Exclusões legais, sem sobreposição.',{dec:1}),field('benfeitoria','Benfeitorias úteis','ha','Reduzem área aproveitável, não tributável.',{dec:1}),field('utilizada','Área utilizada','ha','Reconhecida conforme critérios legais.',{dec:1}),field('vtn','Valor da Terra Nua total','R$','Do imóvel inteiro em 1º de janeiro; exclui benfeitorias e culturas.',{wide:true})],example:{situacao:'tributavel',total:'100',excluida:'20',benfeitoria:'5',utilizada:'60',vtn:'1.000.000,00'},formula:'VTNt = VTN × área tributável ÷ área total. ITR = VTNt × alíquota, mínimo de R$ 10.',method:'Tributável = total − não tributável. Aproveitável = tributável − benfeitorias. GU = utilizada ÷ aproveitável. Sem área aproveitável, aplica-se a faixa GU > 80%. As faixas usam o GU sem arredondar.',caution:'Estimativa para imóvel sujeito ao imposto, sem multas ou juros. Não determina imunidade, isenção, validade das exclusões ou índices de lotação. Áreas: uma decimal; VTNt e imposto: centavos, meio para cima. Confirme na Receita.'}
};
window.RuralTools=Object.entries(tools).map(([id,t])=>({id,title:t.title,short:t.short,category:t.category,icon:icon(t.icon)}));
const drafts={},results={},examples={},savedKey='ruralzap-ferramentas-v1';let current='',filter='todos',toastTimer,exactArea=null;
let cleanupEquilibrium=()=>{};
let scenarios=[];try{const data=JSON.parse(localStorage.getItem(savedKey)||'[]');if(Array.isArray(data))scenarios=data.filter(x=>x&&tools[x.tool]&&typeof x.name==='string'&&x.raw&&typeof x.raw==='object').slice(0,60);}catch{}
// Migrate only conflicting labels; preserve ids, values, dates and saved copies.
const namedScenarios=RuralScenarios.normalizeNames(scenarios);
if(namedScenarios.some((s,i)=>s!==scenarios[i])&&!persist(namedScenarios))scenarios=namedScenarios;
function illustration(id){
 const defs='<defs><linearGradient id="g-'+id+'" x2="1" y2="1"><stop stop-color="#c5d98e"/><stop offset="1" stop-color="#6a8925"/></linearGradient><linearGradient id="p-'+id+'" x2="0" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#e8eddb"/></linearGradient></defs>';
 const g=`url(#g-${id})`,p=`url(#p-${id})`;let content='';
 if(id==='safra')content=`<ellipse cx="110" cy="110" rx="69" ry="9" fill="#455a2210"/><g class="floating"><path d="m35 78 68-33 77 29-72 36Z" fill="#758b45"/><path d="m35 78 73 32v10L35 88Z" fill="#7b7149"/><path d="m108 110 72-36v10l-72 36Z" fill="#555d34"/>${[0,1,2,3,4].map(i=>`<path d="m${48+i*12} ${76-i*6} 67 26" stroke="${i%2?'#b9cf79':'#d9e6aa'}" stroke-width="7"/>`).join('')}<path d="M112 64V28m0 15c-18-1-22-11-20-18 13 0 20 8 20 18Zm0-8c2-15 10-19 18-18-1 12-7 18-18 18Z" fill="${g}" stroke="#7c9d37" stroke-width="1.5"/></g>`;
 if(id==='equilibrio')content=`<ellipse cx="110" cy="114" rx="65" ry="7" fill="#455a2210"/><g class="floating"><rect x="40" y="22" width="140" height="88" rx="9" fill="${p}" stroke="#d2ddbc"/><path d="M55 92h109M55 73h109M55 54h109" stroke="#e0e6d4"/><path d="M58 92 83 79 109 65 134 49 163 31v61Z" fill="#d8e6b1"/><path d="M58 92 83 79 109 65 134 49 163 31" fill="none" stroke="#7a963b" stroke-width="3"/><path d="M54 66h114" stroke="#ac977a" stroke-width="2" stroke-dasharray="4 4"/><circle cx="109" cy="65" r="7" fill="#fff" stroke="#7a963b" stroke-width="3"/><rect x="117" y="11" width="59" height="22" rx="7" fill="#e3edc8"/><path d="m137 22 4 4 8-9" fill="none" stroke="#6d892e" stroke-width="2"/></g>`;
 if(id==='compra')content=`<ellipse cx="110" cy="113" rx="66" ry="7" fill="#455a2210"/><g class="floating"><g transform="rotate(-9 87 65)"><rect x="43" y="31" width="101" height="69" rx="8" fill="#d8c4a3" stroke="#bdad8e"/><rect x="51" y="38" width="85" height="55" rx="5" fill="none" stroke="#eee1c9"/><circle cx="94" cy="65" r="17" fill="#ecdfc7"/><text x="94" y="71" text-anchor="middle" font-size="17" fill="#968261" font-family="Arial">$</text></g><rect x="100" y="45" width="76" height="65" rx="8" fill="${p}" stroke="#ccd6b8"/><path d="M100 65h76" stroke="#ccd6b8"/><rect x="112" y="78" width="13" height="16" rx="3" fill="${g}"/><rect x="133" y="78" width="13" height="16" rx="3" fill="#c5d49f"/><rect x="154" y="78" width="10" height="16" rx="3" fill="#dfe7cf"/><path d="M119 39v12m39-12v12" stroke="#9aa980" stroke-width="4" stroke-linecap="round"/></g>`;
 if(id==='leite')content=`<ellipse cx="109" cy="116" rx="63" ry="7" fill="#455a2210"/><g class="floating"><path d="M74 27h42v16l13 20v48H62V63l12-20Z" fill="${p}" stroke="#c6d2c1"/><rect x="72" y="19" width="46" height="14" rx="4" fill="#9cad8d"/><path d="M63 76h65v22H63Z" fill="#c9d9ae"/><path d="M97 79c-14 14-11 21-2 21s12-7 2-21Z" fill="#f9fcf3"/><rect x="135" y="79" width="13" height="32" rx="3" fill="#b4c4ac"/><rect x="153" y="60" width="13" height="51" rx="3" fill="#8fa77f"/><rect x="171" y="43" width="13" height="68" rx="3" fill="#607e50"/></g>`;
 if(id==='areas')content=`<ellipse cx="109" cy="112" rx="70" ry="7" fill="#455a2210"/><g class="floating"><path d="m35 77 70-40 77 39-74 38Z" fill="#a5bb73" stroke="#8ea95a"/><path d="m35 77 73 37v9L35 86Zm73 37 74-38v9l-74 36Z" fill="#889862"/><path d="m49 77 56-32 62 31-59 31Z" fill="none" stroke="#eef6d7" stroke-width="2" stroke-dasharray="4 3"/><path d="m75 53 67 37M61 62l66 37m-38 3 62-34m-77 27 62-34" stroke="#c9d9a6" stroke-width="1.5"/><circle cx="35" cy="77" r="5" fill="#f6faed" stroke="#859f4c"/><circle cx="182" cy="76" r="5" fill="#f6faed" stroke="#859f4c"/><circle cx="105" cy="37" r="5" fill="#f6faed" stroke="#859f4c"/><circle cx="108" cy="114" r="5" fill="#f6faed" stroke="#859f4c"/></g>`;
 if(id==='itr')content=`<ellipse cx="109" cy="114" rx="62" ry="7" fill="#455a2210"/><g class="floating"><path d="M63 18h75l18 18v76l-10-5-10 5-10-5-10 5-10-5-10 5-10-5-13 5V18Z" fill="${p}" stroke="#ced5bf"/><path d="M138 18v20h18" fill="#dce4cf"/><path d="M78 43h43m-43 13h59m-59 13h34m-34 13h28" stroke="#b5c39d" stroke-width="4" stroke-linecap="round"/><circle cx="144" cy="88" r="24" fill="${g}" stroke="#fff" stroke-width="3"/><path d="m134 88 7 7 13-16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
 return `<svg viewBox="0 0 220 135" aria-hidden="true">${defs}${content}</svg>`;
}
function home(){cleanupEquilibrium();window.RuralNavigation?.destroy();current='';document.title='Ferramentas do campo · RuralZap';$('#main').innerHTML=`<div class="home coming-in"><div class="hero-slot"><section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><h1 id="hero-title">${Object.keys(tools).length} ferramentas para<br>as contas do campo.</h1><p>Calcule custos, compare compras e converta áreas.</p><div class="hero-bottom"><a class="button dark" href="#ferramentas">Ver ferramentas ${icon('arrow')}</a><span class="hero-note">${icon('check')} Grátis e sem cadastro</span></div></div><div class="hero-art"><img class="farm-image" src="assets/fazenda.png" width="1456" height="1088" alt="Miniatura ilustrada de uma propriedade com lavoura, pasto e celeiro"><span class="hero-float hero-float-origin">${icon('leaf')}<span>Da terra à sua <strong>próxima decisão.</strong></span></span><span class="hero-float hero-float-steps">${icon('chart')}<span>Simule. Compare. <strong>Planeje.</strong></span></span></div></section></div><section id="ferramentas" aria-labelledby="catalog-title"><div class="catalog-heading"><h2 id="catalog-title">Qual conta vamos fazer? <span>${Object.keys(tools).length}</span></h2><div class="filters" role="group" aria-label="Filtrar ferramentas">${[['todos','Todas'],['safra','Safra e insumos'],['pecuaria','Pecuária'],['terra','Terra e imposto']].map(([v,l])=>`<button class="filter" data-filter="${v}" aria-pressed="${filter===v}">${l}</button>`).join('')}</div></div><div class="tool-grid" id="tool-grid">${cards()}</div><ul class="trust-strip" aria-label="Sobre as ferramentas"><li>${icon('lock')}<span>Cálculos no seu navegador</span></li><li>${icon('save')}<span>Cenários salvos por você</span></li><li>${icon('info')}<span>Fórmulas e fontes abertas</span></li></ul></section></div>`;
 $$('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#tool-grid').innerHTML=cards();});
 $('.hero-bottom a').onclick=event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();if(location.hash!=='#ferramentas')history.pushState(null,'','#ferramentas');window.RuralBanner?.scrollToTools();const title=$('#catalog-title');title.tabIndex=-1;title.focus({preventScroll:true});};
}
function cards(){return Object.entries(tools).filter(([,t])=>filter==='todos'||t.group===filter).map(([id,t])=>`<a class="tool-card" href="#${id}" aria-label="${esc(t.title)}"><div class="mini-art">${illustration(id)}</div><div class="card-text"><div class="card-kicker"><span>${t.category}</span><span class="time">${id==='itr'?'3':'2'} min</span></div><h3>${t.title}</h3><p>${t.desc}</p><div class="card-action"><span>${t.action}</span>${icon('arrow')}</div></div></a>`).join('');}
function renderField(f,raw){
 return RuralControles.field(f,raw);
}
function paintWorkspace(markup){
 const existing=$('#main > .workspace');
 if(!existing){$('#main').innerHTML=markup;return;}
 const template=document.createElement('template');template.innerHTML=markup;
 const next=template.content.firstElementChild;
 for(const child of [...next.children]){
  const previous=existing.querySelector(':scope > .'+child.classList[0]);
  if(child.matches('.tool-toolbar')&&previous){
   // A barra e seus links mantêm identidade, foco e a animação em curso.
   previous.querySelectorAll('.tool-nav a').forEach(link=>{
    if(link.hash==='#'+current)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
   });
   const restoreFocus=previous.querySelector('.tool-switch-options').contains(document.activeElement);
   previous.querySelector('.tool-switch-trigger').innerHTML=child.querySelector('.tool-switch-trigger').innerHTML;
   previous.querySelector('.tool-switch-options').innerHTML=child.querySelector('.tool-switch-options').innerHTML;
   previous.querySelector('#saved-count').textContent=child.querySelector('#saved-count').textContent;
   if(restoreFocus)previous.querySelector('.tool-switch-trigger').focus({preventScroll:true});
  }else if(previous)previous.replaceWith(child);
  else existing.append(child);
 }
}
function workspace(id){const switching=Boolean(current&&current!==id);current=id;const t=tools[id],raw=drafts[id]||{};document.title=t.title+' · RuralZap';paintWorkspace(`<div class="workspace"><div class="workspace-heading"><div><div class="eyebrow">${icon(t.icon)} ${t.category}</div><h1>${t.title}</h1><p>${t.intro}</p></div></div><div class="tool-toolbar"><nav class="tool-nav" aria-label="Ferramentas">${Object.entries(tools).map(([k,v])=>`<a href="#${k}" ${k===id?'aria-current="page"':''}>${icon(v.icon)}${v.short}</a>`).join('')}</nav><div class="tool-switcher"><button class="tool-switch-trigger" type="button" aria-expanded="false" aria-controls="tool-options">${icon(t.icon)}<span class="tool-switch-full">Trocar ferramenta</span><span class="tool-switch-compact">Ferramentas</span>${icon('chevron')}</button><nav class="tool-switch-options" id="tool-options" aria-label="Escolher ferramenta" hidden>${Object.entries(tools).map(([k,v])=>`<a href="#${k}" ${k===id?'aria-current="page"':''}>${icon(v.icon)}<span>${v.short}</span>${k===id?icon('check'):''}</a>`).join('')}</nav></div><div class="head-actions"><button class="button small outline" id="scenarios-link">${icon('save')}<span>Cenários</span><span id="saved-count">${scenarios.filter(x=>x.tool===id).length}</span></button><button class="icon-button" id="about" aria-label="Como funciona esta conta" title="Como funciona esta conta">${icon('info')}</button></div></div><div class="calc-shell"><section class="input-panel" aria-labelledby="input-title"><div class="panel-heading"><h2 id="input-title">${id==='areas'?'Sua medida':'<span class=heading-full>Dados da sua conta</span><span class=heading-compact>Sua conta</span>'}</h2><button class="text-button" id="example">${icon('spark')} Usar exemplo</button></div><form id="calc-form" novalidate><div class="field-grid">${t.fields.map(f=>renderField(f,raw)).join('')}${id==='areas'?`<div class="swap-row"><button type="button" id="swap">${icon('swap')} Inverter unidades</button></div>`:''}</div><div class="form-actions"><button type="submit" class="button">${t.action} ${icon('arrow')}</button><button type="button" class="text-button" id="clear">Limpar</button></div><div class="form-note">${icon('lock')}<span>Vírgula para decimais, ponto para milhar.<br>Esta conta fica no navegador. Só salvamos se você pedir.</span></div></form></section><section class="result-panel" aria-label="Resultado da conta" id="result"></section></div><section class="scenario-section" id="cenarios" aria-labelledby="scenario-title" hidden></section><p class="print-only">RuralZap · Simulação educativa · ${t.caution} · Fonte: ${sourceBase+t.slug}</p></div>`);
 $('#calc-form').onsubmit=e=>{e.preventDefault();run(true);};
 $('#calc-form').addEventListener('input',e=>{drafts[id]=rawForm();examples[id]=false;if(id==='areas'&&e.target.name==='quantidade')exactArea=null;results[id]=null;renderResult();const group=e.target.closest('.field-group');if(group){group.classList.remove('invalid');group.querySelector('.error-message').textContent='';group.querySelector('[aria-invalid]')?.removeAttribute('aria-invalid');}});
 $('#example').onclick=()=>{drafts[id]={...t.example};examples[id]=true;exactArea=null;workspace(id);run(false);$('#example').focus({preventScroll:true});};
 $('#clear').onclick=()=>{drafts[id]={};results[id]=null;examples[id]=false;exactArea=null;workspace(id);$('#calc-form input:not([type=hidden])')?.focus();};
 $('#scenarios-link').onclick=openScenarios;
 $('#about').onclick=()=>openInfo();
 RuralNavigation.mount();
 if(id==='areas')$('#swap').onclick=swap;
 $('#calc-form').classList.add('account-form');
 $('#example').innerHTML=icon('copy')+' Usar exemplo';
 RuralControles.mount($('#calc-form'),t.fields);
 renderResult(false);renderScenarios();if(switching)RuralNavigation.transition();
}
function rawForm(){return Object.fromEntries(new FormData($('#calc-form')).entries());}
function clearErrors(){$$('.field-group.invalid').forEach(e=>e.classList.remove('invalid'));$$('.error-message').forEach(e=>e.textContent='');$$('[aria-invalid]').forEach(e=>e.removeAttribute('aria-invalid'));}
function error(field,message){$(`[data-field="${field}"]`).classList.add('invalid');$(`#error-${field}`).textContent=message;$(`#f-${field}`).setAttribute('aria-invalid','true');}
function validate(raw){const t=tools[current],d={};let bad=false;clearErrors();
 if(current==='itr'&&raw.situacao==='incerta')return {situacao:'incerta'};
 for(const f of t.fields){if(f.options){if(!f.options.some(([v])=>v===raw[f.id])){error(f.id,'Escolha uma opção válida.');bad=true;}else d[f.id]=raw[f.id];continue;}
 try{const v=parse(raw[f.id],f.dec);if(f.positive&&v<=0)throw new Error('Informe um valor maior que zero.');if(v<f.min||v>(f.max??1e9))throw new Error(`Use um valor entre ${f.min} e ${f.max??1e9}.`);d[f.id]=v;}catch(e){error(f.id,e.message);bad=true;}}
 if(!bad&&current==='itr'){
  if(d.excluida>d.total){error('excluida','Não pode superar a área total.');bad=true;}
  if(Math.round((d.excluida+d.benfeitoria)*10)>Math.round(d.total*10)){error('benfeitoria','Exclusões e benfeitorias ultrapassam a área total.');bad=true;}
  if(Math.round(d.utilizada*10)>Math.round((d.total-d.excluida-d.benfeitoria)*10)){error('utilizada','Não pode superar a área aproveitável.');bad=true;}
 }
 if(current==='areas'&&exactArea!==null&&!bad)d.quantidade=exactArea;
 return bad?null:d;
}
function run(focus){const raw=rawForm();drafts[current]=raw;const d=validate(raw);if(!d){results[current]=null;renderResult();if(focus)$('[aria-invalid=true]')?.focus();toast('Confira os campos destacados.');return;}
 try{results[current]={data:d,result:calc(current,d)};renderResult();if(focus&&innerWidth<761){$('#result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}toast('Conta atualizada.');}catch(e){results[current]=null;renderResult();toast('Confira os valores antes de calcular.');}
}
function swap(){const raw=rawForm(),d=validate(raw);if(!d)return;const value=calc('areas',d).destino;drafts.areas={quantidade:value.toLocaleString('pt-BR',{maximumFractionDigits:4}),origem:raw.destino,destino:raw.origem};exactArea=value;examples.areas=false;workspace('areas');run(false);}
function mainNumber(n,unit='',currency=false){return `<div class="big-value">${currency?'<span class="currency">R$</span>':''}<span data-number>${currency?num(n):flexible(n)}</span>${unit?`<span class="suffix">${unit}</span>`:''}</div>`;}
function metric(label,val,unit=''){return `<div class="metric"><span class="metric-label">${label}</span><div class="metric-value">${val}${unit?`<span class="metric-unit">${unit}</span>`:''}</div></div>`;}
function bars(items,max=Math.max(...items.map(i=>i[1]),1)){return items.map(([label,value,display,type])=>`<div class="chart-bar-row"><span>${label}</span><div class="bar-track"><div class="bar-fill ${type||''}" style="width:${Math.max(0,Math.min(100,value/max*100))}%"></div></div><strong>${display}</strong></div>`).join('');}
function insight(text,negative=false){return `<div class="insight ${negative?'negative':''}">${icon(negative?'info':'check')}<span>${text}</span></div>`;}
function renderResult(animate=true){cleanupEquilibrium();const el=$('#result');if(!el)return;el.dataset.animate=String(animate);const t=tools[current],saved=results[current];
 if(!saved){el.innerHTML=`<div class="result-toolbar"><span class="eyebrow">Sua próxima decisão</span><span class="status-badge">${icon('lock')} Só no seu navegador</span></div><div class="result-empty"><div class="mini-art">${illustration(current)}</div><h2>${t.empty}</h2><p>Preencha os dados ao lado ou experimente uma conta pronta para conhecer a ferramenta.</p><button class="button outline small" id="empty-example">Experimentar com exemplo ${icon('arrow')}</button></div>`;$('#empty-example').onclick=()=>$('#example').click();return;}
 const {data:d,result:r}=saved;let out='';
 if(r.blocked){el.innerHTML=`<div class="result-toolbar"><span class="eyebrow">Antes de calcular</span></div><div class="result-empty"><div class="mini-art">${illustration('itr')}</div><h2>Primeiro, confirme o enquadramento.</h2><p>Área pequena, por si só, não determina imunidade ou isenção. Esta ferramenta não decide se o imóvel está dispensado do ITR.</p><a class="button outline" href="${official}" target="_blank" rel="noopener">Consultar a Receita ${icon('arrow')}</a></div>`;return;}
 if(current==='safra'){
  out=`<div class="result-main-label">Cada saca custa</div>${mainNumber(r.saca,'/ saca',true)}<p class="result-caption">Saca de ${flexible(d.peso)} kg · ${scope.find(x=>x[0]===d.escopo)[1]}</p><div class="result-metrics">${metric('Custo por hectare',money(r.hectare),'/ ha')}${metric('Produtividade',flexible(r.produtividade),'sc/ha')}</div><div class="result-visual"><div class="visual-heading"><span>O efeito da produção no custo</span><small>Custos constantes</small></div>${bars([['−20% safra',r.saca/.8,money(r.saca/.8),'light'],['Sua safra',r.saca,money(r.saca),''],['+20% safra',r.saca/1.2,money(r.saca/1.2),'light']])}<div class="chart-legend"><span>Valores por saca · cenários hipotéticos de produção</span></div></div>${insight(`Com os mesmos custos, produzir 20% mais reduz o custo por saca para <strong>${money(r.saca/1.2)}</strong>. Revise gastos que variam com a produção.`)}<p class="help-copy">Total: ${money(r.total)} · Produção: ${flexible(d.producao)} sc · ${flexible(r.kg)} kg/ha</p>`;
 }
 if(current==='equilibrio'){
  out=`<div class="result-main-label">Para cobrir seu custo, produza</div>${mainNumber(r.sacas,'sacas / ha')}<p class="result-caption">Ao preço de ${money(d.preco)}/saca de ${flexible(d.peso)} kg</p><div class="result-metrics">${metric('Preço de equilíbrio',money(r.preco),'/ sc')}${metric('Saldo calculado',money(r.saldo),'/ ha')}</div><div class="result-visual"><div class="visual-heading"><span>Onde receita e custo se encontram</span><small>R$ por hectare</small></div><div id="equilibrium-view">${equilibriumChart(d,r)}</div></div>${sensitivityControls(d)}`;
 }
 if(current==='leite'){
 out=`<div class="result-main-label">Custo total por litro</div>${mainNumber(r.ct,'/ litro',true)}<p class="result-caption">Inclui custeio, depreciação, família e oportunidade</p><div class="result-metrics">${metric('Custo efetivo · COE',money(r.coe),'/ L')}${metric('Operacional total · COT',money(r.cot),'/ L')}</div><div class="result-visual"><div class="visual-heading"><span>De onde vem o custo</span><small>R$ por litro produzido</small></div>${bars([['Custeio',d.coe,money(d.coe/d.litros),''],['Desgaste',d.depreciacao,money(d.depreciacao/d.litros),'light'],['Família',d.familia,money(d.familia/d.litros),'light'],['Oportunidade',d.oportunidade,money(d.oportunidade/d.litros),'light']],Math.max(d.coe,d.depreciacao,d.familia,d.oportunidade,1))}</div>${insight(`A diferença entre COE e custo total é <strong>${money(r.ct-r.coe)}/litro</strong>. Ela revela custos além do custeio da atividade.`)}<p class="help-copy">${flexible(d.litros)} litros produzidos · COT: ${money(r.totalCot)} · Custo total: ${money(r.total)}</p>`;
 }
 if(current==='areas'){
 out=`<div class="result-main-label">${flexible(d.quantidade)} ${units[d.origem].short} equivalem a</div>${mainNumber(r.destino)}<p class="result-caption">${units[d.destino].label}</p><div class="result-metrics">${metric('Em hectares',flexible(r.ha),'ha')}${metric('Em metros quadrados',flexible(r.m2),'m²')}</div><div class="result-visual"><div class="visual-heading"><span>Uma unidade, por dentro</span><small>Desenho ilustrativo</small></div><div class="area-graphic"><div class="area-map" aria-hidden="true"></div><div class="area-equivalence">1 ${units[d.destino].short}<strong>${flexible(units[d.destino].factor)} m²</strong>${units[d.destino].factor===10000?'100 × 100 metros':flexible(units[d.destino].factor/10000)+' hectares'}</div></div></div>${insight(d.destino.includes('a')&&d.destino!=='ha'?`O <strong>${units[d.destino].label.toLowerCase()}</strong> adotado aqui tem ${flexible(units[d.destino].factor)} m². Confirme essa medida no seu documento.`:'A área permanece a mesma; só a unidade muda. A conversão mantém a precisão até a exibição.')}<div class="table-wrap"><table class="detail-table"><caption class="sr-only">Equivalências regionais</caption><tbody>${Object.entries(units).filter(([k])=>!['ha','m2'].includes(k)).map(([k,u])=>`<tr><td>${u.label}</td><td>${flexible(r.m2/u.factor)}</td></tr>`).join('')}</tbody></table></div>`;
 }
 if(current==='compra'){
 const win=r.diferencaVP>0?'À vista tem menor custo presente':r.diferencaVP<0?'A prazo tem menor custo presente':'As opções se equivalem em valor presente';
 out=`<div class="result-main-label">Diferença em valor presente</div>${mainNumber(Math.abs(r.diferencaVP),'',true)}<p class="result-caption">${win} · hipótese de ${flexible(d.taxa)}% a.m.</p><div class="result-metrics">${metric('Total nominal a prazo',money(r.total))}${metric('Taxa implícita mensal',r.taxa===null?'Não calculável':num(r.taxa,4)+'%')}</div><div class="result-visual"><div class="visual-heading purchase-heading"><span>Compare na data de hoje</span><button type="button" class="schedule-link" id="open-cashflow" aria-label="Ver cronograma mensal" aria-haspopup="dialog">${icon('clock')} Cronograma</button></div>${bars([['À vista',d.vista,money(d.vista),''],['A prazo',r.presente,money(r.presente),'light']])}<div class="number-list"><li><span>Diferença nominal</span><b>${money(r.diferenca)}</b></li><li><span>Entrada + parcelas</span><b>${money(d.entrada)} + ${d.meses} × ${money(d.parcela)}</b></li></div></div>${insight(`${win}. Considere os vencimentos, a liquidez e as condições da proposta. A taxa de comparação é uma hipótese sua; a taxa implícita não é CET.${r.taxa===null?' Para calcular a taxa implícita, a entrada deve ser menor que o preço à vista.':''}`)}`;
 }
 if(current==='itr'){
 out=`<div class="result-main-label">Estimativa anual de ITR</div>${mainNumber(r.itr,'',true)}<p class="result-caption">Imóvel sujeito ao imposto · sem multas e juros</p><div class="result-metrics">${metric('Grau de utilização',r.gu===null?'Não se aplica':num(r.gu,2)+'%')}${metric('Alíquota aplicada',num(r.aliquota,2)+'%')}</div><div class="result-visual"><div class="visual-heading"><span>Da área ao imposto</span><small>Memória de cálculo</small></div><ol class="number-list"><li><span>Área tributável</span><b>${flexible(r.tributavel)} ha</b></li><li><span>Área aproveitável</span><b>${flexible(r.aproveitavel)} ha</b></li><li><span>VTN tributável</span><b>${money(r.vtnT)}</b></li><li><span>Imposto calculado</span><b>${money(r.calculado)}</b></li></ol></div>${insight(r.gu===null?'Sem área aproveitável: aplicada a coluna GU acima de 80%, conforme a lei.':`O enquadramento usa o GU <strong>sem arredondamento</strong>. ${r.gu===80?'Exatamente 80% permanece na faixa de 65% a 80%.':'A linha considera a área total de '+flexible(d.total)+' ha.'}`)}${r.calculado<10?'<p class="help-copy">Aplicado o mínimo de R$ 10,00 para imóvel sujeito ao imposto.</p>':''}<p class="help-copy">Estimativa educativa. Confira o enquadramento e a declaração oficial.</p>`;
 }
 el.innerHTML=`<div class="result-toolbar"><span class="eyebrow">${icon('chart')} Sua conta, em perspectiva</span><span class="status-badge ${examples[current]?'example':''}">${examples[current]?'Dados de exemplo':'Cálculo concluído'}</span></div><div class="result-content coming-in">${out}</div>${current==='compra'?`<section class="print-cashflow"><h2>Cronograma mensal</h2>${cashflowTable(r)}</section>`:''}<div class="result-actions"><button class="button light" id="save-result" aria-label="Salvar cenário">${icon('save')}<span>Salvar<span class="save-label-detail"> cenário</span></span></button><button class="button outline" id="copy-result">${icon('copy')} Copiar</button><button class="button outline" id="download-result" aria-label="Baixar planilha Excel">${icon('download')} Excel</button><button class="icon-button" id="print-result" aria-label="Imprimir ou salvar PDF">${icon('print')}</button></div><p class="scenario-save-hint" ${scenarios.some(s=>s.tool===current)?'hidden':''}>Salve esta conta para comparar depois.</p>`;
 $('#save-result').onclick=saveDialog;$('#copy-result').onclick=copy;$('#download-result').onclick=e=>exportExcel(e.currentTarget);$('#print-result').onclick=()=>window.print();
 if(current==='equilibrio')bindEquilibrium(d,r);
 if(current==='compra')$('#open-cashflow').onclick=()=>openCashflow(d,r);
}
function cashflowTable(r){
 return `<table class="detail-table cashflow-table"><caption class="sr-only">Pagamentos e valores presentes por mês</caption><thead><tr><th scope="col">Mês</th><th scope="col">Pagamento</th><th scope="col">Valor presente</th></tr></thead><tbody>${r.fluxo.map(x=>`<tr><th scope="row">${x.mes===0?'Hoje':x.mes}</th><td>${money(x.nominal)}</td><td>${money(x.presente)}</td></tr>`).join('')}</tbody><tfoot><tr><th scope="row">Total</th><td>${money(r.total)}</td><td>${money(r.presente)}</td></tr></tfoot></table>`;
}
function openCashflow(d,r){
 $('#open-cashflow').focus({preventScroll:true});
 openDialog('Cronograma mensal',`<div class="info-body cashflow-body" data-native-scroll tabindex="0" role="region" aria-label="Pagamentos mensais">
 <p class="cashflow-context">${d.meses} ${d.meses===1?'parcela mensal':'parcelas mensais'} de ${money(d.parcela)}${d.entrada>0?`, com entrada de ${money(d.entrada)}`:''}. Valor presente à taxa de ${flexible(d.taxa)}% a.m.</p>
 ${cashflowTable(r)}
 </div>`,'',{informative:true});
}
function equilibriumChart(d,r,width=460){
 const m=RuralEquilibrio.model(d,width),cross=m.x(m.equilibrium),cost=m.y(d.custo);
 const axis=n=>n>=1e9?flexible(Math.round(n/1e8)/10)+' bi':n>=1e6?flexible(Math.round(n/1e5)/10)+' mi':n>=1000?flexible(Math.round(n/100)/10)+' mil':flexible(Math.round(n*10000)/10000);
 const exact=Math.abs(m.equilibrium-r.sacas)<1e-9,label=(exact?'':'≈ ')+flexible(m.equilibrium)+' sc/ha';
 const anchor=cross<112?'start':cross>m.right-72?'end':'middle',labelX=cross+(anchor==='start'?8:anchor==='end'?-8:0);
 return `<div class="equilibrium-key"><i class="equilibrium-ring" aria-hidden="true"></i><span>Ponto de equilíbrio <strong>${label}</strong></span></div><svg class="chart-svg equilibrium-chart" id="equilibrium-chart" viewBox="0 0 ${width} 220" role="img" aria-label="Ponto de equilíbrio em ${label}.">
 ${[0,.5,1].map(f=>`<path d="M${m.left} ${m.y(f*m.maxY)}H${m.right}" stroke="#e3e8d9" stroke-dasharray="3 4"/><text x="${m.left-9}" y="${m.y(f*m.maxY)+4}" text-anchor="end">${axis(f*m.maxY)}</text>`).join('')}
 <path d="M${m.left} 174 ${m.right} ${m.y(m.max*d.preco)}" fill="none" stroke="#7c9d30" stroke-width="2.5"/>
 <path d="M${m.left} ${cost}H${m.right}" stroke="#b99475" stroke-width="2" stroke-dasharray="5 4"/>
 <path d="M${cross} ${cost}V174" stroke="#a0ad87" stroke-dasharray="2 4"/>
 <text class="equilibrium-label" x="${labelX}" y="${Math.max(18,cost-16)}" text-anchor="${anchor}">Equilíbrio</text>
 <path class="simulation-guide" fill="none" stroke="#829958" stroke-dasharray="3 4"/>
 <path class="simulation-gap" fill="none" stroke="#6d8a23" stroke-width="3"/>
 <circle cx="${cross}" cy="${cost}" r="6" fill="#fff" stroke="#6d8a23" stroke-width="2.5"/>
 <circle class="simulation-point" r="4" fill="#46651a" stroke="#fff" stroke-width="1.5"/>
 ${[0,.5,1].map(f=>`<text x="${m.x(f*m.max)}" y="197" text-anchor="${f===0?'start':f===1?'end':'middle'}">${axis(f*m.max)}</text>`).join('')}
 <text x="${m.right}" y="217" text-anchor="end">Produtividade · sc/ha</text></svg><div class="chart-legend equilibrium-legend"><span><i class="legend-line revenue-line"></i> Receita</span><span><i class="legend-line cost-line"></i> Custo constante</span><span><i class="legend-point"></i> Produtividade em teste</span></div>`;
}
function sensitivityControls(d){
 const m=RuralEquilibrio.model(d);
 return `<div class="sensitivity equilibrium-simulation"><div class="sensitivity-top"><div><label for="sensitivity">Teste outra produtividade</label><output id="sensitivity-value" for="sensitivity">${flexible(d.produtividade)} <span>sc/ha</span></output></div><button class="icon-button sensitivity-reset" id="sensitivity-reset" type="button" aria-label="Voltar à produtividade calculada de ${flexible(d.produtividade)} sacas por hectare" title="Voltar ao calculado: ${flexible(d.produtividade)} sc/ha" disabled>${icon('reset')}</button></div><input id="sensitivity" type="range" min="0" max="${m.max}" step="${m.step}" value="${d.produtividade}" aria-describedby="sensitivity-context"><div class="range-extremes"><span>0 sc/ha</span><span>${flexible(m.max)} sc/ha</span></div><dl class="simulation-values"><div><dt>Receita em teste</dt><dd id="simulation-revenue"></dd></div><div><dt>Saldo em teste</dt><dd id="simulation-balance"></dd></div></dl><p class="sr-only" id="sensitivity-note"></p><p id="sensitivity-context">Preço e custo constantes. Não altera sua conta calculada.</p><span id="simulation-announcement" class="sr-only" role="status" aria-live="polite"></span></div>`;
}
function bindEquilibrium(d,r){
 const input=$('#sensitivity'),reset=$('#sensitivity-reset'),view=$('#equilibrium-view');
 let m=RuralEquilibrio.model(d),svg=$('#equilibrium-chart');
 function update(announce=false){
  const p=m.point(Number(input.value)),baseline=Math.abs(p.quantity-d.produtividade)<m.step/10;
  $('#sensitivity-value').innerHTML=flexible(p.quantity)+' <span>sc/ha</span>';
  input.setAttribute('aria-valuetext',flexible(p.quantity)+' sacas por hectare');
  input.style.setProperty('--range-progress',p.quantity/m.max*100+'%');
  reset.disabled=baseline;
  svg.querySelector('.simulation-point').setAttribute('cx',p.x);svg.querySelector('.simulation-point').setAttribute('cy',p.y);
  svg.querySelector('.simulation-guide').setAttribute('d',`M${p.x} ${p.y}V174`);
  const gap=svg.querySelector('.simulation-gap');gap.setAttribute('d',`M${p.x} ${p.y}V${p.costY}`);gap.setAttribute('stroke',p.balance<0?'#ab654c':'#6d8a23');
  svg.setAttribute('aria-label',`Equilíbrio em ${flexible(m.equilibrium)} sacas por hectare. Teste: ${flexible(p.quantity)} sacas por hectare; receita de ${money(p.revenue)}, custo de ${money(d.custo)} e saldo de ${money(p.balance)} por hectare.`);
  $('#simulation-revenue').textContent=money(p.revenue).replace(' ',' ')+' /ha';$('#simulation-balance').textContent=money(p.balance).replace(' ',' ')+' /ha';
  $('#simulation-balance').dataset.negative=String(p.balance<0);
  const note=Math.abs(p.balance)<.005?'Receita e custo se igualam neste teste.':p.balance>0?'Esta produtividade cobre o custo informado.':'Esta produtividade ainda não cobre o custo informado.';
  $('#sensitivity-note').textContent=note;
  if(announce)$('#simulation-announcement').textContent=`${flexible(p.quantity)} sacas por hectare. Saldo em teste: ${money(p.balance)} por hectare. ${note}`;
 }
 input.oninput=()=>update();input.onchange=()=>update(true);
 reset.onclick=()=>{input.value=String(d.produtividade);update(true);input.focus({preventScroll:true});};
 function resize(){
  const width=view.clientWidth<380?330:460;
  if(m.width!==width){view.innerHTML=equilibriumChart(d,r,width);svg=$('#equilibrium-chart');m=RuralEquilibrio.model(d,width);}
  update();
 }
 const observer=new ResizeObserver(resize);observer.observe(view);resize();
 cleanupEquilibrium=()=>{observer.disconnect();cleanupEquilibrium=()=>{};};
}
function itrTable(){const labels=['Até 50','> 50 a 200','> 200 a 500','> 500 a 1.000','> 1.000 a 5.000','> 5.000'];return `<div class="table-wrap" tabindex="0" role="region" aria-label="Tabela de alíquotas com rolagem horizontal"><table class="detail-table"><caption>Alíquotas em % · área total × GU</caption><thead><tr><th>Área (ha)</th>${['≤ 30%','≤ 50%','≤ 65%','≤ 80%','> 80%'].map(v=>`<th>${v}</th>`).join('')}</tr></thead><tbody>${rates.map((row,i)=>`<tr><td>${labels[i]}</td>${row.map(v=>`<td>${num(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('toast-show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('toast-show'),2800);}
function openDialog(title,body,actions='',options={}){
 const dlg=$('#dialog');let outsideStart=null;
 dlg.classList.toggle('info-dialog',Boolean(options.informative));
 $('#dialog-content').innerHTML=`<div class="dialog-header"><h2 id="dialog-title" tabindex="-1">${title}</h2><button class="icon-button" id="dialog-close" aria-label="Fechar">${icon('close')}</button></div>${body}${actions}`;
 const isOutside=e=>{const rect=dlg.getBoundingClientRect();return e.target===dlg&&(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom);};
 dlg.onpointerdown=e=>{outsideStart=options.informative&&e.button===0&&e.isPrimary&&isOutside(e)?{x:e.clientX,y:e.clientY}:null;};
 dlg.onpointercancel=()=>{outsideStart=null;};
 dlg.onclick=e=>{const start=outsideStart;outsideStart=null;if(start&&isOutside(e)&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<8)dlg.close();};
 dlg.onkeydown=e=>{
  if(e.key!=='Tab')return;
  const items=[...dlg.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));
  const first=items[0],last=items.at(-1),active=document.activeElement;
  if(!first){e.preventDefault();$('#dialog-title').focus();return;}
  if(e.shiftKey&&(active===first||!items.includes(active))){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(active===last||!items.includes(active))){e.preventDefault();first.focus();}
 };
 dlg.onclose=()=>{outsideStart=null;};
 $('#dialog-close').onclick=()=>dlg.close();
 window.RuralScroll?.interrupt();dlg.showModal();
 if(options.informative)$('#dialog-title').focus({preventScroll:true});
}
function openInfo(){
 const t=tools[current];if(!t)return;
 $('#about').focus({preventScroll:true});
 openDialog('Como esta conta funciona',`<div class="info-body" data-native-scroll>
 <p class="info-context">${t.title}</p>
 <section class="info-section" aria-labelledby="info-calculation"><h3 id="info-calculation">Como a conta é feita</h3><p class="formula">${t.formula}</p><p>${t.method}</p></section>
 <section class="info-section" aria-labelledby="info-care"><h3 id="info-care">Cuidados para comparar</h3><p>${t.caution}</p>${current==='itr'?`<details class="info-rates"><summary>Tabela de alíquotas</summary>${itrTable()}</details>`:''}</section>
 <section class="info-section" aria-labelledby="info-sources"><h3 id="info-sources">Fontes</h3><ul class="info-sources"><li><a href="${sourceBase+t.slug}" target="_blank" rel="noopener">Metodologia do RuralZap <span aria-hidden="true">↗</span></a></li>${current==='itr'?`<li><a href="${official}" target="_blank" rel="noopener">Receita Federal: cálculo do ITR <span aria-hidden="true">↗</span></a></li><li><a href="https://www.planalto.gov.br/ccivil_03/leis/l9393.htm" target="_blank" rel="noopener">Lei nº 9.393/1996, arts. 10 e 11 <span aria-hidden="true">↗</span></a></li>`:''}</ul><p class="info-meta">Consultadas em 20/10/2026 · Valores de exemplo são fictícios.</p></section>
 <section class="info-section info-privacy" aria-labelledby="info-privacy"><h3 id="info-privacy">Seus dados</h3><p>Os cálculos ficam no navegador. Cenários salvos também: exporte as contas que quiser guardar antes de limpar os dados do navegador.</p></section>
 </div>`,'',{informative:true});
}
function saveDialog(){
 if(!results[current]||results[current].result.blocked)return;
 const id=current,list=scenarios.filter(s=>s.tool===id),count=list.length;
 const matches=RuralScenarios.matching(list,id,results[id].data,s=>scenarioResult(s).data),duplicate=matches[0];
 if(count>=3){
  toast(duplicate?`Esta conta já está salva como “${duplicate.name}”. Você já tem 3 cenários; ajuste ou remova um para salvar outro.`:'Você já tem 3 cenários desta ferramenta. Remova um para salvar outro.');
  $('#cenarios').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;
 }
 const defaultName=RuralScenarios.uniqueName(examples[id]?'Exemplo':`Cenário ${count+1}`,list.map(s=>s.name));
 const context=duplicate?`Os dados são iguais aos de <strong>“${esc(duplicate.name)}”</strong>. Ajuste algum valor para comparar uma hipótese diferente, ou salve uma cópia.`:'Salve até 3 cenários desta ferramenta para comparar. Eles ficam somente neste navegador.';
 openDialog(duplicate?'Esta conta já está salva':'Guarde esta possibilidade',`<p class="dialog-copy" id="save-context">${context}</p><div class="field"><label for="scenario-name">Nome do cenário</label><input id="scenario-name" maxlength="48" value="${esc(defaultName)}" autocomplete="off" aria-describedby="save-context save-name-note"></div><p class="save-name-note" id="save-name-note" role="status"></p><p class="dialog-error" id="save-error" role="alert"></p>`,duplicate?`<div class="dialog-actions"><button class="button outline" id="confirm-save">Salvar cópia ${icon('save')}</button><button class="button" id="adjust-scenario">Ajustar dados</button></div>`:`<div class="dialog-actions"><button class="button outline" id="cancel-save">Cancelar</button><button class="button" id="confirm-save">Salvar cenário ${icon('save')}</button></div>`);
 const input=$('#scenario-name'),confirm=$('#confirm-save');
 const nameForSave=()=>RuralScenarios.uniqueName(input.value,scenarios.filter(s=>s.tool===id).map(s=>s.name));
 input.oninput=()=>{const name=nameForSave();$('#save-name-note').textContent=input.value.trim()&&name!==input.value.trim()?`Será salvo como “${name}”.`:'';$('#save-error').textContent='';input.removeAttribute('aria-invalid');};
 if(duplicate){$('#adjust-scenario').onclick=()=>{$('#dialog').close();$('#calc-form input:not([type=hidden])')?.focus();};$('#adjust-scenario').focus();}
 else{$('#cancel-save').onclick=()=>$('#dialog').close();input.select();}
 confirm.onclick=()=>{
  if(confirm.disabled)return;
  if(!input.value.trim()){$('#save-error').textContent='Dê um nome ao cenário.';input.setAttribute('aria-invalid','true');input.focus();return;}
  confirm.disabled=true;
  const name=nameForSave(),item={id:Date.now()+'-'+Math.random().toString(36).slice(2,7),tool:id,name,raw:{...drafts[id]},example:!!examples[id],exactArea:id==='areas'?exactArea:null,created:new Date().toISOString()};
  if(!persist([...scenarios,item])){$('#save-error').textContent='O navegador não permitiu salvar. Exporte a planilha Excel para guardar esta conta.';confirm.disabled=false;return;}
  $('#dialog').close();renderScenarios();toast(`“${name}” salvo neste navegador.`);
 };
 input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();confirm.click();}};
}
function scenarioDuplicateNotice(list){
 const groups=RuralScenarios.duplicateGroups(list,s=>scenarioResult(s).data);
 if(!groups.length)return '';
 const text=groups.map(group=>group.length===list.length&&group.length>2?`Os ${group.length} cenários têm os mesmos dados.`:`“${group.map(s=>esc(s.name)).join('” e “')}” têm os mesmos dados.`).join(' ');
 return `<p class="scenario-duplicate-note" role="status">${icon('info')}<span><strong>${text}</strong> Abra um deles e ajuste os valores para comparar hipóteses diferentes.</span></p>`;
}
function persist(next){try{localStorage.setItem(savedKey,JSON.stringify(next));scenarios=next;return true;}catch{return false;}}
function scenarioResult(s){const d={};for(const f of tools[s.tool].fields){d[f.id]=f.options?s.raw[f.id]:parse(s.raw[f.id],f.dec);}if(s.tool==='areas'&&s.exactArea!==null&&s.exactArea!==undefined)d.quantidade=s.exactArea;return {data:d,result:calc(s.tool,d)};}
function summary(id,d,r){if(id==='safra')return ['Custo por saca',money(r.saca)];if(id==='equilibrio')return ['Produção de equilíbrio',num(r.sacas)+' sc/ha'];if(id==='leite')return ['Custo total por litro',money(r.ct)];if(id==='areas')return [units[d.destino].label,flexible(r.destino)];if(id==='compra')return ['Prazo em valor presente',money(r.presente)];return ['ITR estimado',money(r.itr)];}
function openScenarios(){
 const section=$('#cenarios');
 if(!section.hidden){$('#scenario-title').focus({preventScroll:true});section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});return;}
 if(results[current]&&!results[current].result.blocked){saveDialog();return;}
 openDialog('Compare suas contas',`<p class="dialog-copy">Calcule e use <strong>Salvar cenário</strong>. Depois, mude uma hipótese e salve outra conta para comparar as duas.</p>`,`<div class="dialog-actions"><button class="button" id="start-scenario">Ir para os dados ${icon('arrow')}</button></div>`);
 $('#start-scenario').onclick=()=>{$('#dialog').close();$('#calc-form input:not([type=hidden])')?.focus();};
}
function renderScenarios(){
 const list=scenarios.filter(x=>x.tool===current),section=$('#cenarios');if(!section)return;
 $('#saved-count').textContent=list.length;
 section.hidden=!list.length;
 section.style.setProperty('--scenario-columns',list.length||1);
 const hint=$('.scenario-save-hint');if(hint)hint.hidden=Boolean(list.length);
 if(!list.length){section.replaceChildren();return;}
 section.innerHTML=`<div class="scenario-top"><div><h2 id="scenario-title" tabindex="-1">Cenários salvos</h2><p>${list.length} de 3 · neste navegador</p></div>${list.length>1?`<button class="button small outline" id="compare-export">${icon('download')} Comparação Excel</button>`:''}</div>${scenarioDuplicateNotice(list)}<div class="scenario-grid">${list.map(s=>{try{const {data:d,result:r}=scenarioResult(s),[label,value]=summary(s.tool,d,r);return `<article class="scenario"><h3>${esc(s.name)}</h3><div class="scenario-meta">${s.example?'Exemplo · ':''}${new Date(s.created).toLocaleDateString('pt-BR')}</div><div class="scenario-value">${esc(value)}</div><div class="scenario-label">${label}</div>${scenarioFacts(s.tool,d,r)}<div class="scenario-controls"><button class="text-button" data-restore="${s.id}">Abrir cenário ${icon('arrow')}</button><button class="text-button" data-remove="${s.id}" aria-label="Remover cenário ${esc(s.name)}">Remover</button></div></article>`;}catch{return `<article class="scenario"><h3>${esc(s.name)}</h3><p>Cenário incompatível com esta versão.</p><button class="text-button" data-remove="${s.id}">Remover</button></article>`;}}).join('')}</div>`;
 $$('[data-restore]').forEach(b=>b.onclick=()=>{const s=scenarios.find(x=>x.id===b.dataset.restore);drafts[current]={...s.raw};examples[current]=s.example;exactArea=s.exactArea??null;workspace(current);run(false);$('#main').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});toast('Cenário carregado. Você pode ajustar os dados.');});
 $$('[data-remove]').forEach(b=>b.onclick=()=>{const s=scenarios.find(x=>x.id===b.dataset.remove);openDialog('Remover este cenário?',`<p class="dialog-copy">O cenário <strong>${esc(s.name)}</strong> será removido deste navegador. Os dados abertos na calculadora continuam disponíveis.</p>`,`<div class="dialog-actions"><button class="button outline" id="keep-scenario">Manter</button><button class="button" id="remove-confirm">Remover cenário</button></div>`);$('#keep-scenario').onclick=()=>$('#dialog').close();$('#remove-confirm').onclick=()=>{if(persist(scenarios.filter(x=>x.id!==s.id))){$('#dialog').close();renderScenarios();($('#cenarios button')||$('#scenarios-link')).focus({preventScroll:true});toast('Cenário removido.');}else toast('Não foi possível remover.');};});
 if($('#compare-export'))$('#compare-export').onclick=e=>exportExcel(e.currentTarget,list);
}
function reportRows(bundle=results[current],raw=drafts[current]){const t=tools[current],{data:d,result:r}=bundle;const rows=[['Ferramenta',t.title],...t.fields.map(f=>[f.label,f.options?(f.options.find(([v])=>v===d[f.id])?.[1]||''):String(raw[f.id])+(f.unit?' '+f.unit:'')]),['Resultado principal',summary(current,d,r)[1]]];const labels={hectare:'Custo/ha',saca:'Custo/saca',produtividade:'Sacas/ha',kg:'Quilos/ha ou meta em kg',total:'Total (R$)',sacas:'Equilíbrio (sc/ha)',preco:'Preço de equilíbrio (R$/sc)',receita:'Receita (R$/ha)',saldo:'Saldo (R$/ha)',margem:'Margem (%)',coe:'COE/litro',cot:'COT/litro',ct:'CT/litro',totalCot:'COT total',destino:'Área convertida',ha:'Hectares',m2:'Metros quadrados',presente:'Valor presente (R$)',diferenca:'Diferença nominal (R$)',diferencaVP:'Diferença em valor presente (R$)',taxa:'Taxa implícita mensal (%)',tributavel:'Área tributável (ha)',aproveitavel:'Área aproveitável (ha)',gu:'GU (%)',aliquota:'Alíquota (%)',vtnT:'VTNt (R$)',calculado:'Imposto calculado (R$)',itr:'ITR devido estimado (R$)'};for(const [k,v]of Object.entries(r)){if(k in labels)rows.push([labels[k],v===null?'Não se aplica':typeof v==='number'?flexible(v):String(v)]);}rows.push(['Cuidados',t.caution],['Fonte',sourceBase+t.slug]);return rows;}
async function copy(){const text=reportRows().map(r=>r.join(': ')).join('\n');try{await navigator.clipboard.writeText(text);toast('Conta copiada.');}catch{openDialog('Copie sua conta',`<p class="dialog-copy">O navegador não liberou a cópia automática. Selecione o texto abaixo para copiar.</p><textarea class="copy-area" readonly>${esc(text)}</textarea>`);$('.copy-area').select();}}
async function exportExcel(button,saved){
 if(button.disabled)return;
 button.disabled=true;button.setAttribute('aria-busy','true');
 try{
  // Capture this calculation before loading files: navigation may change meanwhile.
  const id=current,tool=tools[id],accounts=saved?saved.map(s=>({name:s.name,...scenarioResult(s)})):[{name:'Sua conta',...results[id]}];
  const payload={id,tool,accounts:JSON.parse(JSON.stringify(accounts)),generatedAt:new Date()};
  toast('Preparando sua planilha…');
  await RuralExport.download(payload);
  toast('Planilha Excel preparada para download.');
 }catch(error){console.error('Falha na exportação Excel:',error);toast('Não foi possível gerar a planilha. Tente novamente.');}
 finally{button.disabled=false;button.removeAttribute('aria-busy');}
}
function scenarioFacts(id,d,r){let pairs=[];if(id==='safra')pairs=[['Área / produção',flexible(d.area)+' ha · '+flexible(d.producao)+' sc'],['Custo/ha',money(r.hectare)]];if(id==='equilibrio')pairs=[['Produção prevista',flexible(d.produtividade)+' sc/ha'],['Saldo do cenário',money(r.saldo)+'/ha']];if(id==='leite')pairs=[['Produção',flexible(d.litros)+' litros'],['COE / COT por litro',money(r.coe)+' / '+money(r.cot)]];if(id==='areas')pairs=[['Origem',flexible(d.quantidade)+' '+units[d.origem].short],['Área em hectares',flexible(r.ha)+' ha']];if(id==='compra')pairs=[['Hipótese mensal',flexible(d.taxa)+'%'],['Diferença presente',money(r.diferencaVP)]];if(id==='itr')pairs=[['Área total',flexible(d.total)+' ha'],['GU / alíquota',(r.gu===null?'—':num(r.gu)+'%')+' / '+num(r.aliquota)+'%']];return `<dl class="scenario-facts">${pairs.map(([l,v])=>`<div><dt>${l}</dt><dd>${v}</dd></div>`).join('')}</dl>`;}
function route(){window.RuralScroll?.interrupt();const id=location.hash.slice(1),toolbar=$('.tool-toolbar'),bounds=toolbar?.getBoundingClientRect();const keepScroll=Boolean(current&&tools[id]&&bounds&&bounds.top<innerHeight&&bounds.bottom>$('.header-stage').getBoundingClientRect().bottom);RuralControles.destroy();if(id==='main'){if(!$('#main').children.length)home();else if(current)RuralControles.mount($('#calc-form'),tools[current].fields);$('#main').focus();return;}if(id==='ferramentas'){if(current||!$('#ferramentas'))home();requestAnimationFrame(()=>window.RuralBanner?RuralBanner.scrollToTools():$('#ferramentas')?.scrollIntoView({behavior:'instant'}));return;}if(tools[id])workspace(id);else home();if(!keepScroll)window.scrollTo({top:0,behavior:'instant'});window.RuralBanner?.update(true);}
window.addEventListener('hashchange',route);route();
})();




