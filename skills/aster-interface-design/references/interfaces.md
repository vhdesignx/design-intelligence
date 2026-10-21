# Compor para uma tarefa

## Hierarquia e identidade
Construa primeiro com o conteúdo mais longo plausível. Marque a ação principal e a pergunta respondida por cada bloco. Espaçamento deve agrupar significado: espaço interno menor que separação entre grupos distintos. Use uma escala consistente, com exceções justificadas por leitura, não “mágicos 8 px” em tudo.
Tipo: poucos papéis claros (título, seção, corpo, metadado, número), comprimento confortável e entrelinha que suporte acentos. Verifique licença/fontes disponíveis; não adivinhe família de screenshot. Números tabulares ajudam comparação.
Cor: base, texto, ação e status têm papéis separados. Cor de marca não deve apagar distinção entre erro e sucesso. Rótulos/ícones reforçam status. Cards só quando o agrupamento, seleção ou autonomia do bloco os justificar.
Imagem: defina assunto, recorte e função narrativa. Garanta direitos e consistência. Ilustração gerada é conceito, não prova de cliente, equipe ou resultado.

## Por superfície
| Superfície | Prioridade | Evitar |
|---|---|---|
| Institucional / landing | entender oferta, adequação, prova e próximo passo | slogan que cabe em qualquer empresa; depoimento fictício |
| Dashboard | responder pergunta e indicar ação | coleção de KPIs sem período, comparação ou consequência |
| Fluxo mobile | concluir uma tarefa com contexto preservado | formulário desktop apertado; teclado cobrindo confirmação |
| Leitura / ajuda | encontrar resposta e retomada da tarefa | ornamentação competindo com conteúdo |

Dashboard: escolha gráficos pela pergunta. Linha para evolução; barras para comparação; distribuição deve explicitar total e categorias; tabela para valores precisos e trabalho sobre itens. Sempre período, unidade, fonte/atualização e estado sem dados. Zero não é ausência de dado. Sem eixo enganoso ou suavização que invente precisão. Dados sensíveis precisam de ocultação contextual; não usar CVV como decoração.
Landing: cada seção resolve uma objeção distinta. Alternar ritmo por conteúdo, não por obrigação de “hero + 3 cards + logos”. CTA descreve destino; custo, requisitos e próximos passos aparecem quando relevantes.
Mobile: solicite só o necessário para a etapa, com padrão útil, rótulo persistente, teclado correto e voltar sem perder rascunho.

## Estados e contratos
Para cada componente decisivo, especifique:
- dado mínimo e conteúdo longo;
- inicial, carregando, sucesso, vazio, erro e sem permissão quando aplicáveis;
- ação e feedback; prevenção de envio duplicado;
- recuperação sem perda do que já foi feito;
- nome acessível, foco e alternativa a gesto/hover.

**Controles compostos:** reutilizar um primitive não garante coerência do conjunto.
Um select pode combinar wrapper com rótulo flutuante, trigger baseado em botão,
menu em portal e estilos globais. Confira quem desenha fundo, borda, raio e foco
em cada camada; evite superfícies sobrepostas ou retângulos internos que parecem
outro controle. Quando o resultado divergir do padrão, rastreie variantes,
seletores globais, especificidade e tokens antes de acrescentar overrides.

Separe repouso, hover, foco de teclado, aberto e opção selecionada. Hover indica
interatividade; seleção indica valor; foco indica onde o teclado atua. A cor de
marca pode participar, mas seu uso no CTA não justifica automaticamente tingir
todos esses estados. Escolha a intensidade pelo papel e pelo padrão aprovado;
não remova o foco visível para eliminar uma borda indesejada. Confira o conjunto
fechado e aberto, com ponteiro e teclado, nos temas suportados. A seleção funcionar
não demonstra que o acabamento ficou correto.

**Gate visual de campos (calibração RuralZap, 20/10/2026):** não encerrar uma
revisão de formulário vendo apenas o controle fechado. Abra cada família de
seletor e confira opções, seleção, foco, erro, conteúdo longo e relação com o
campo numérico ao lado, em uma janela larga e estreita. Um popup nativo que
rompe a linguagem do projeto precisa ser uma escolha consciente, não um
resultado ignorado. Quando o projeto exigir menu personalizado, reutilize o
componente acessível do stack ou implemente e teste seu contrato: teclado,
Escape, seleção, retorno de foco, toque, colisão com a viewport e rolagem.
Não trocar semântica por aparência. Seletores nativos continuam adequados
quando sua experiência é deliberada e compatível com o contexto.

O componente personalizado também precisa de julgamento: não transportar
o mesmo campo alto e transformar cada opção em outro card. Compare a
quantidade e o comprimento das escolhas antes de decidir entre select,
segmentos e seleção em linhas. Uma explicação contextual pode evitar
repetição, desde que a informação necessária à escolha continue disponível.
Avalie rótulo externo, unidade integrada e densidade pelo trabalho real,
sem impor essas soluções como regra universal. Quando Victor pedir escolha
conjunta após uma rejeição, traga componentes reais abertos e exemplos de
composição antes de implementar outra variação cosmética.

Movimento do controle pertence à mudança de estado: abertura e fechamento
devem compartilhar origem, permitir interrupção e não atrasar a seleção.
Confira uma sequência temporal, inclusive abre-fecha-abre, e a alternativa
com movimento reduzido. Uma captura de repouso não demonstra fluidez. Evite
transformar este feedback em obrigação de animar todos os elementos ou em
uma receita cosmética para “não parecer IA”.

**Campos numéricos:** separar apresentação, rascunho e validação. Conferir digitação progressiva, separadores locais, precisão por unidade, valor muito longo, colagem, seleção, edição central e desfazer/refazer. A máscara não deve perder dígitos, mover o cursor para o fim ou depender de um valor já válido para agrupar milhares. Tratar estados incompletos (como vírgula no final) sem erro prematuro; completar moeda ao concluir a entrada. Quando o contrato aceitar apenas números, impedir novas letras e precisão excedente durante a entrada, com retorno breve; `inputmode` sozinho não restringe caracteres. Colagem inválida deve preservar o valor anterior e explicar a rejeição, sem remover caracteres e transformar silenciosamente o número. Continuar validando no cálculo e permitir corrigir dados antigos inválidos. Testar também fallback de entrada, composição e desfazer; não confiar só em `keydown`. Calibração de Victor em 21/10/2026: a revisão inicialmente agrupou milhares, mas ainda aceitava letras e casas excedentes, apenas marcando erro. O limite numérico específico é do produto, não uma regra da skill.

**Exploração de gráficos:** vincular controles ao resultado visual e numérico que prometem alterar. Um slider que muda apenas uma nota pode parecer quebrado enquanto o ponto permanece parado. Identificar referências e marcadores diretamente; a forma do traçado deve corresponder ao modelo (por exemplo, receita linear quando preço e custo são mantidos). Distinguir a conta calculada do teste temporário e oferecer retorno ao valor base. Conferir cruzamento, valores acima/abaixo, limites alcançáveis, unidade, escala estável, teclado e atualização contínua; não recalcular a escala a cada movimento se isso mascarar o efeito explorado. Este critério surgiu na revisão da calculadora de equilíbrio RuralZap, sem exigir sliders em outros gráficos.

Mensagem de erro: o que falhou + como corrigir. Vazio de primeira utilização pode ensinar; nenhum resultado de filtro deve permitir limpar; indisponibilidade deve informar recuperação. Não mostrar fake “salvo” enquanto falhou.
**Diálogos e ajuda contextual:** explicitar o contrato de fechamento por tipo. Em ajuda informativa descartável, permitir clique/toque no fundo, Escape e botão visível; verificar foco inicial, contenção de Tab/Shift+Tab e retorno ao disparador. Não fechar ao clicar no padding, selecionar texto ou arrastar de dentro para fora. Formulários com rascunho e ações críticas exigem decisão própria sobre descarte; não propagar o clique fora a todos os modais automaticamente. No mobile, manter a ajuda encontrável, o fechamento alcançável e a rolagem interna sem mover o fundo. Testar esses caminhos no componente funcionando: aparência e presença de um “X” não comprovam o contrato.

Metodologia e fontes secundárias podem ficar nessa ajuda, relacionadas ao contexto aberto e sem repetir os mesmos parágrafos. Unidades, erros e consequências necessárias à decisão continuam junto da tarefa. Botão executa; link navega. Uma informação essencial não pode morar só em tooltip. Calibração RuralZap de 21/10/2026: o modal informativo não fechava pelo fundo e a metodologia ocupava dois blocos permanentes. A lacuna era de interação e distribuição, não uma exigência de modal para toda ajuda. Base para teclado e foco: [W3C APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/); fechamento pelo fundo é a escolha contextual acima, não uma obrigação universal do APG.
Movimento: defina evento, propósito e frequência. Prefira transição interrompível e conteúdo disponível imediatamente. Teste preferência de movimento reduzido. Não acrescentar atraso para parecer sofisticado.

Legendas decorativas: por orientação de Victor em 21/10/2026, não adicionar por padrão “Ilustração conceitual”, “fake” ou explicações equivalentes a uma arte decorativa. Explicar sua natureza quando solicitado; não ocupar a interface com uma ressalva que não ajuda a tarefa. Essa preferência não elimina identificações necessárias de dados de exemplo ou informações que afetem uma decisão.

## Teste de especificidade
Troque marca e textos por outro setor: se a interface continuar igualmente coerente, talvez a composição seja funcionalmente reutilizável — isso pode ser correto em um formulário. Em uma página de apresentação, procure expressão própria em narrativa, imagem e relação entre seções. Originalidade deve contribuir para o trabalho, não tornar controles desconhecidos.

## Lacunas preenchidas com sistemas reais
- [Carbon: tabelas](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines), consultado em 03/10/2026: organização de ações, expansão e densidade. Útil porque o acervo de screenshots não demonstra estes estados; consultar o componente vivo antes de implementar. Não requer adotar Carbon no projeto.
- [GOV.UK: conferir respostas](https://design-system.service.gov.uk/patterns/check-answers/), consultado em 03/10/2026: revisar dados e corrigir antes da conclusão. Referência para transações/formulários; a expressão visual deve seguir a marca do produto.
