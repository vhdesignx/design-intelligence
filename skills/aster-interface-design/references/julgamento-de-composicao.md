# Julgamento de composição e economia de informação

Calibração de Victor em 11/10/2026, durante a revisão de um app: ações relacionadas estavam separadas, informações repetidas aumentavam os cards e metadados ocupavam linhas sem precisar. Ele pediu que o aprendizado melhore decisões futuras, preservando criatividade. Esta é uma preferência de trabalho apoiada em correções concretas; não um teste de usabilidade nem a aprovação de um layout universal. Dados e capturas privadas do projeto não integram esta referência.

## Traduzir o “feeling” em julgamento

Leia a tarefa e a composição inteira antes de escolher um componente. Decida o que precisa ser percebido de imediato, o que orienta a próxima ação e o que só explica ou aprofunda. Essa distinção orienta posição, peso e visibilidade; não exige três blocos na tela. Exercite a intuição propondo uma relação entre os elementos e conferindo seu efeito, em vez de aplicar automaticamente um card para cada dado e uma linha para cada frase.

## Operações possíveis, não uma receita

| Decisão | Quando pode melhorar a tela | Quando preservar outra solução |
|---|---|---|
| Aproximar ações | Se respondem à mesma situação, testar uma área comum, com pesos diferentes para ação principal e secundária. Um espaço junto da ação pode acomodar a segunda sem aumentar a altura. | Separar quando a proximidade causar toques acidentais, competição, confusão de sequência ou rótulos espremidos. Não agrupar funções só porque cabem. |
| Substituir em vez de acrescentar | Se o estado mudou, atualizar o rótulo existente antes de adicionar outra explicação. Um estado específico pode dispensar a frase que apenas o repete. | Manter causa, data ou instrução quando forem necessárias para decidir, corrigir ou distinguir situações. Estado deve vir dos dados, não da aparência. |
| Vincular um metadado | Associar período, quantidade ou progresso ao dado que ele qualifica, usando proximidade e hierarquia, antes de criar uma linha isolada. | Uma fração perto de “concluído” pode parecer contagem de conclusões quando indica a etapa atual. Se a relação não for inequívoca, explicitar o referente; tooltip não corrige um rótulo visível enganoso. |
| Derivar a informação útil | Mostrar saldo, diferença ou progresso calculado quando isso responder à pergunta melhor que campos redundantes. Fazer o sistema trabalhar, evitando cálculo mental repetitivo. | Conservar total, composição ou histórico onde comparação e auditoria exigirem. Ausência de dado não é zero, e passagem do tempo não confirma conclusão. |
| Revelar explicação sob demanda | Uma explicação secundária de uma regra já resumida pode ficar num “i”, expansão ou detalhe acessível por toque e teclado. | Não esconder valor, prazo decisivo, consequência ou impedimento necessário para agir. Evitar depender de hover ou obrigar abertura repetida para informação frequente. |

## Espaço tem função

Antes de diminuir fonte ou padding, reveja redundância, ordem, agrupamento e distribuição. Uma linha extra, divisor ou rodapé deve acrescentar compreensão; não existe por hábito do componente. Espaço vazio pode separar assuntos, proteger a ação, melhorar leitura ou dar ritmo. Preserve-o quando cumprir essa função; reavalie-o quando fragmentar uma mesma tarefa e empurrar conteúdo útil para baixo. Menor altura, mais densidade e mais elementos lado a lado não são objetivos por si só.

Em telas estreitas, teste rótulos reais, quebra de texto, área de toque e estados longos. Reorganize se o agrupamento deixar de funcionar. Em variantes de leitura e edição, preserve a hierarquia das informações compartilhadas; acrescente controles no contexto em que são úteis, sem manter duas composições divergentes por acidente.

## Conferir antes de encerrar

Em uma aplicação com abas ou subviews, julgue a composição de cada contexto
alterado. Um painel resumido ao lado de outro pode precisar de outra distribuição
quando passa a ser o conteúdo principal. Investigue `max-width`, colunas
reservadas, alturas mínimas e alinhamento com título e ações antes de preencher
o vazio. A largura do texto pode continuar limitada dentro de uma região maior.
O resultado pode ocupar mais espaço ou assumir uma coluna deliberadamente
contida; precisa manter relações claras. Não estique linhas indefinidamente nem
adicione KPIs, ilustrações ou frases apenas para ocupar a área restante.

Em telas de uso recorrente, aplique um filtro ao texto de apoio: ele informa
estado, escopo, consequência, instrução necessária ou próxima ação? Se removê-lo
mantém essas informações e melhora o acesso ao conteúdo útil, omita-o. Um título
não exige subtítulo, e um painel não exige rodapé. Preserve ajuda contextual,
erros, unidades, períodos e avisos de simulação. Conteúdo de acolhimento pode
servir ao onboarding ou a um vazio real; não precisa reaparecer em toda consulta.

Calibração de Victor em 13/10/2026, na demonstração de pecuária RuralZap: rejeitou
o grande vazio lateral em Manejos, o acabamento verde do select e frases como
“Seu rebanho bem acompanhado. Seu dia bem organizado.” A agenda isolada mantinha
`max-width: 960px`; a validação responsiva registrada cobria a visão geral.
É evidência de falha de composição e cobertura, não uma proibição universal de
largura máxima, verde ou subtítulo. A expectativa de rejeição pelos produtores
é feedback do responsável pelo produto, ainda sem pesquisa com esses usuários.
Para controles, aplicar também [estados e contratos](interfaces.md#estados-e-contratos).

Faça uma passagem curta no resultado renderizado: o usuário identifica situação, valor ou dado relevante e próxima ação sem decifrar? Alguma informação aparece duas vezes sem benefício? O que foi reduzido continua verdadeiro, compreensível e encontrável na hora certa? O espaço aproxima o que pertence junto e separa o que exige distinção?

Se houver uma tensão real, compare uma composição mais integrada com outra mais separada, usando o mesmo conteúdo. Escolha pelo efeito na tarefa, hierarquia e identidade — não por simetria automática ou número de pixels economizados. Não é necessário apresentar alternativas ao usuário para cada ajuste rotineiro.

Transfira o raciocínio, não as coordenadas: este aprendizado não obriga usar “i”, badges, frações, botões lado a lado, cores ou cards em todos os produtos. Outra tarefa pode pedir texto completo, maior espaço ou uma sequência de telas. “Sem cara de IA” pede decisões específicas e conteúdo bem relacionado, não um estilo visual obrigatório.

## Fechamento da página em telas menores

Inspecione o último bloco de conteúdo, os avisos auxiliares e o rodapé juntos. O fim da página também precisa de hierarquia: uma lista que quebra em duas linhas desiguais e um rodapé herdado de duas colunas podem caber sem formar uma composição coerente. Confira alinhamento, proximidade e equilíbrio com o conteúdo real, incluindo um filtro com poucos resultados. Investigue padding acumulado e alturas mínimas impostas por efeitos antes de adicionar elementos ao vazio.

Ícones podem substituir texto secundário quando o significado continua reconhecível ou tem explicação acessível por toque e teclado. Não esconder sentido apenas para compactar. Considere rótulos breves, grupos de mesma largura ou uma assinatura centralizada com símbolo da marca; são opções, não um template obrigatório. Quebra de texto e alinhamento lateral precisam de relação com outro elemento ou de uma razão de leitura, não de uma coluna desktop que ficou vazia.

Calibração de Victor em 21/10/2026 nas calculadoras RuralZap: os avisos de navegador/cenários/fontes ficaram em linhas desequilibradas, com espaço excessivo até um rodapé solto. Ele propôs ícones, centralização ou o símbolo monocromático da marca. A correção local usa três grupos alinhados e assinatura compacta. Isso registra a direção e a lacuna observada; não equivale à aprovação dessa execução.

## Valores grandes: espaço e precisão são decisões diferentes

Aprendizado documental de 12/10/2026, sem teste com usuários. Um valor que não
cabe pode revelar uma distribuição inadequada do espaço antes de revelar uma
fonte inadequada. Descontar padding, gaps e vizinhos da mesma linha; observar
largura mínima e a quantidade de colunas. Comparar reorganização, hierarquia e
escala legível antes de reduzir conteúdo. Não escolher a densidade pelo número
de cards que cabem nem reduzir fonte indefinidamente para preservar uma grade.

Se a tarefa exige conferir precisão, favorecer o valor completo. Se busca
somente ordem de grandeza, uma abreviação localizada pode ajudar, desde que o
usuário compreenda a aproximação. Quando o exato ainda fizer parte da tarefa,
oferecer acesso explícito por toque, clique e teclado, com tempo para ler e
selecionar; eventual cópia deve preservar o exato. Tooltip pode complementar,
mas não resolve sozinho descoberta, persistência ou leitura por toque. A
consulta frequente ao detalhe é um motivo para reavaliar a compactação.

Esse raciocínio não define moeda, fonte, breakpoint, grade ou identidade para
outros produtos. Apoia-se na distinção do
[Carbon entre tooltip e conteúdo necessário à tarefa](https://www.carbondesignsystem.com/building-blocks/core/components/tooltip/guidelines)
e no [padrão disclosure do W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/);
a escolha de priorizar precisão é uma aplicação de projeto, não uma regra que
essas fontes imponham a toda métrica.

## Quando a grade cria vazio sem propósito

Feedback de Victor em 12/10/2026: a mistura de um acabamento aprovado com uma
grade existente produziu blocos altos, sem uso proporcional do espaço. A posição
dos cards estava correta e os testes passaram; a composição continuou ruim.
O aprendizado não é uma nova altura obrigatória. Separar topologia (o que fica
ao lado do quê) de dimensionamento (quanto cada grupo precisa ocupar). Um card
que atravessa linhas, um `stretch` ou um gráfico podem aumentar todos os vizinhos.
Investigar essa causa antes de inserir ilustração, texto ou margem automática.

Usar mecanismos perceptivos como hipóteses concretas: proximidade para conectar
valor, prazo e ação; reconhecimento para rótulos e destinos; divulgação
progressiva para detalhes pouco frequentes. Não basta citar Gestalt ou Hick para
justificar uma tela. Registrar qual relação mudou e observar o resultado. Não
converter o conhecido “7±2” em limite arbitrário de opções de uma interface.

A fonte visual também precisa ser conferida: um branch atualizado com produção
pode não incluir a evolução que o usuário aprovou em outro branch ou worktree.
Testes provam contratos; screenshots permitem julgar composição; nenhum dos dois
substitui aprovação estética ou observação de uso por clientes.

Na revisão do estúdio RuralZap, a ação flutuante estava sempre alcançável, mas
cobria valores durante a rolagem. Padding no fim da página não resolvia essa
colisão intermediária. A solução experimental foi dar ao registro um espaço
próprio na navegação fixa. O princípio transferível é reservar área para a ação;
o botão central não vira uma regra para todo produto.

A mesma revisão recuperou data e carteira na linha mobile e agrupou período e
filtros para trazer os registros para cima. Densidade útil vem de reduzir
redundâncias e preservar contexto, não de encolher texto nem ocultar campos
decisivos. Em finanças, uma série realizada não deve continuar sólida no futuro;
uma legenda não corrige sozinha uma forma que comunica outra coisa.

Capturas também são evidência sujeita a erro: um frame durante a troca de tema
pareceu uma superfície incoerente. Reabrir a imagem e capturar o estado estável
resolveu a dúvida sem alterar tokens corretos. Registrar essa distinção entre
defeito do produto, erro de captura e preferência estética.
