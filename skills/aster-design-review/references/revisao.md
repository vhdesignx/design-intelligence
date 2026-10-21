# Revisão com evidência
Use a matriz para organizar uma passagem, não para gerar um relatório volumoso.

Para estudar uma referência conceitual, use outra pergunta: “que decisões tornam este design bem resolvido, em que contexto e com quais tensões?”. Localize a escolha (ex.: área, alinhamento, contraste), explique seu efeito provável e extraia uma aplicação. Diferencie a UI da moldura do post. Conteúdo de demonstração é aceitável; não transformar aritmética fictícia em crítica principal. A matriz a seguir se aplica à validação de uma interface funcional.

| Dimensão | Teste concreto |
|---|---|
| Clareza | explicar público, tarefa e próxima ação a partir da tela |
| Hierarquia | primeira leitura corresponde à decisão prioritária? |
| Espaço | cada subview relaciona largura, altura e alinhamentos à tarefa, inclusive quando um painel fica sozinho? |
| Identidade | conteúdo, composição, imagens e detalhes apoiam a mesma atividade? |
| Conteúdo | nomes, unidades, datas, somas, provas e promessas conferem? |
| Comparação | nomes únicos, aviso para dados equivalentes, mesmo resultado com entradas diferentes, legado sem perda e composição com 0/1/2/3 cenários; aplicar [comparação e saída](../../aster-interface-design/references/comparacao-e-saida.md) quando houver essas funções |
| Exportação / impressão | arquivo real com tipos, formatos, marca e dados coerentes; cronograma inteiro na impressão, não só o disparador; distinguir prévia de paginação real |
| Texto de apoio | retirar subtítulo ou rodapé faria perder informação útil? Se não, por que ele ocupa espaço recorrente? |
| Jornada | concluir, voltar, corrigir, cancelar e retomar sem perda |
| Estados | vazio, carregamento, erro, sucesso, indisponibilidade e permissão pertinentes |
| Controles | repouso, hover, foco, aberto e selecionado têm papéis claros, sem conflito entre wrapper, trigger e menu? |
| Entrada numérica | digitar letra/casas excedentes, colar inválido, editar no meio, desfazer, valor longo, composição e separador local; impedir entrada nova inválida sem transformar silenciosamente o valor |
| Diálogos | verificar o contrato definido: botão, Escape, clique/toque fora quando cabível, foco inicial/contido/devolvido, seleção e arraste sem fechamento acidental, conteúdo longo e rolagem no mobile. Distinguir ajuda descartável de edição com dados. |
| Adaptação | janela estreita, ampla, quadrada, orientação e teclado virtual |
| Movimento e continuidade | parar/reverter no ponto de encontro, navegar durante inércia e manter o mesmo shell entre telas; testar alternativa nativa, movimento reduzido, foco e scroll interno conforme a [matriz de movimento](../../aster-interface-design/references/adaptacao-qualidade.md#movimento-como-melhoria-progressiva) |
| Fechamento da página | último conteúdo, avisos e rodapé formam uma composição intencional no mobile, inclusive com poucos resultados? Verificar quebras, colunas vazias e espaçamento acumulado. |
| Acesso | teclado, foco, semântica, contraste medido, zoom e tecnologia assistiva |
| Desempenho | tarefa responde em ambiente representativo; distinguir laboratório/campo |
| Descoberta | apenas público: semântica, indexação e conteúdo rastreável |

## Registro mínimo de achado
`ID · tela/versão · viewport/entrada · condição · evidência/captura · impacto · correção · estado`.
Prioridade: P0 perda/ação financeira errada; P1 impede tarefa ou acesso; P2 causa esforço/erro recuperável; P3 acabamento. Preferência estética tem rótulo próprio, não severidade fingida.
Exemplo: “P1, 320px, abrir confirmação: botão fora da área rolável, usuário não conclui; permitir scroll do diálogo e manter foco visível.” Evite “falta respiro” sem dizer onde e com qual efeito.

## Passagem
1. Identifique as subviews e controles afetados e faça uma passagem agrupada com dados determinísticos. Inclua a subview isolada, pouco conteúdo e o controle nos estados pertinentes; não repita a mesma visão geral em várias larguras como substituto dessa cobertura. Percorra a tarefa, inclusive erro/recuperação.
2. Execute auditoria automática quando disponível; confirme falsos positivos e marque testes ausentes.
3. Liste poucos problemas de maior impacto e corrija em lote.
4. Capture os mesmos estados após correção e repita os caminhos afetados. Registre de forma curta `tela/subview · viewport/tema · estado/entrada · evidência · resultado`; se não foi inspecionado, marque como não verificado. Screenshot sem inspeção e teste que só verifica overflow não aprovam composição.
5. Pare quando critérios passaram; ampliar apenas por nova alteração, falha ou risco.

Para acessibilidade integral, incluir tecnologia assistiva e critérios pertinentes; scanner sozinho não basta. Para animação, testar interrupção, frequência e preferência de movimento reduzido, não só um GIF.

## Calibração de qualidade
Para formulários com direção visual exigente, a passagem precisa incluir o
seletor **aberto** e a transição em sequência, além do estado fechado. Aplique o
[gate visual de campos](../../aster-interface-design/references/interfaces.md#estados-e-contratos).
Registre quais controles e entradas foram exercitados; não extrapole a aprovação
de um painel ou testes de cálculo para o acabamento dos campos.

Peça julgamento de Victor sobre escolhas concretas quando necessário: duas composições com mesmo conteúdo e explicação do efeito. Guarde preferência atribuída e escopo.
Em comparação com/sem skills, fixe briefing, dados, recursos, modelo/configuração, tempo, iterações e critérios antes de produzir. Idealmente separar contextos e avaliação cega. Se não houver execução independente, rotular **demonstração pareada, não experimento de eficácia**. Não apresentar diferença como ganho causado pelas skills.
