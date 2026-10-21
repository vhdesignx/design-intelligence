# RuralZap — investigar retorno útil
Status: roteiro e hipótese. Não houve pesquisa com usuários do RuralZap nem redesenho da tela real nesta versão.

## Decisão
Uma revisão semanal com progresso contextual ajuda o usuário a manter registros confiáveis e compreender seu caixa? Compare com a mesma experiência simplificada sem incentivo de progresso.

Antes de gamificar, investigue: esquecimento, conexão, tempo, confiança nos valores, confusão de categorias, retrabalho entre WhatsApp e painel, sazonalidade e pouca utilidade percebida. Pontos não resolvem uma captura que falha.

## Rodada qualitativa
Recrutar perfis reais relevantes: usuários ativos, recém-chegados e pessoas que abandonaram; considerar conectividade, familiaridade digital e rotina de registro. Evitar usar apenas colegas da equipe.
Pedir um episódio recente de recebimento/despesa, como foi registrado e quando conferiu o saldo. Observar a tarefa atual. Não solicitar exposição desnecessária de dados financeiros; usar exemplos sintéticos no teste.

Tarefas neutras para protótipos A/B:
1. Registrar uma despesa e corrigir a categoria.
2. Encontrar uma movimentação ainda não revisada e conferir valor/data.
3. Explicar o saldo, o período e uma diferença entre previsto e realizado.
4. Encerrar a revisão e descobrir quando seria útil voltar.

A: mesma captura, pendências e resumo, sem camada de progresso.
B: “Revisão da semana” opcional, baseada em itens reais: conferir 2 pendências → revisar categorias → entender resumo. Progresso 1 de 3 etapas, próxima ação específica e mensagem de conclusão. Se não há pendências, dizer isso; não criar tarefas para preencher barra.
Ordem alternada e dados equivalentes; registrar transferência de aprendizagem.

## UI hipotética
Um módulo discreto junto às pendências, não um placar ocupando o resumo financeiro.
- “Sua revisão da semana” + intervalo de datas.
- “2 movimentações para conferir” como ação principal quando aplicável.
- Etapas textuais com estado e resumo do que foi conferido.
- Adiar/ocultar disponível; sem sequência perdida, vergonha, sorteio ou ranking de patrimônio.
- Conclusão: “Movimentações conferidas. Veja o resumo do período.” Sem afirmar saúde financeira ou ganho garantido.
- Mobile: priorizar próxima tarefa; resumo permanece acessível, com estado preservado ao voltar.

## O que medir
Sucesso principal: proporção de usuários elegíveis que concluem uma revisão **válida**, sem erros críticos.
Retorno útil: usuários que voltam em janela predefinida e fazem ação financeira válida, não simples abertura.
Guardrails: duplicação, registros sem sentido para ganhar pontos, correção posterior, esforço percebido, pressão percebida e desativação dos lembretes.
Eventos mínimos: revisão ofertada/iniciada; pendência conferida; correção salva; resumo consultado; revisão concluída; incentivo ocultado. Deduplicar evento e documentar elegibilidade. Não registrar valores privados desnecessariamente.
Escolher janela pela rotina real, inclusive períodos sem movimento. Não punir inatividade legítima.

Se B melhora compreensão e conclusão sem pressão, avançar a piloto. Se apenas aumenta cliques, simplificar A. Se não há volume, acompanhamento qualitativo ao longo de ciclos; não inventar significância.
Para experimento em produção, confirmar instrumentação, taxa base, efeito mínimo, amostra/poder e tempo antes da execução.

## Evidência externa e limite
[Bitrián, Buil e Catalán, 2021 — Making finance fun](https://selfdeterminationtheory.org/wp-content/uploads/2024/03/2021_BitrianBuilCatalan_IJBM.pdf): estudo com 208 usuários do Mint, modelagem PLS e medidas por questionário. Oferece associações úteis para hipóteses sobre gamificação e motivação; desenho transversal não demonstra causalidade no RuralZap.
[Duolingo: experimento sobre sequência](https://blog.duolingo.com/improving-the-streak/): relato do próprio produto em aprendizagem de idiomas. Frequência e significado da tarefa diferem de finanças; não transportar efeito ou mecânica automaticamente.
