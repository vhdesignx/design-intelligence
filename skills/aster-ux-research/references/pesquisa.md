# Pesquisa proporcional à decisão

| Pergunta | Método | Saída que muda o projeto |
|---|---|---|
| Como a tarefa acontece hoje e por que falha? | Entrevista sobre episódio recente + observação contextual | sequência, atalhos, barreiras e vocabulário |
| As pessoas encontram o conteúdo? | teste de árvore/tarefas de navegação | agrupamento e rótulos revisados |
| Entendem e concluem este fluxo? | teste moderado com protótipo funcional | falhas observadas, gravidade e correção |
| Qual opção preferem e por quê? | comparação qualitativa sem revelar intenção | percepção, sem afirmar taxa de conversão |
| A mudança melhora resultado em produção? | experimento controlado com eventos confiáveis | efeito estimado, intervalo e efeitos adversos |
| Onde abandonam? | funil + sessões autorizadas + entrevistas | hipóteses por etapa, não explicação causal automática |

**Roteiro mínimo:** decisão; hipótese de maior risco; participantes pertinentes; tarefa neutra; o que observar; métrica; regra de decisão; consentimento e retenção dos dados. Comece com uma rodada pequena e diversa para detectar problemas; não a use para estimar percentuais populacionais. Tamanho quantitativo depende de taxa base, efeito mínimo relevante, variabilidade, poder e unidade de randomização.

**Entrevista:** “Conte a última vez que…” → “O que disparou isso?” → “Mostre como fez, se puder” → “Onde parou e o que aconteceu depois?”. Evite “Você usaria nossa solução?”. Investigue casos em que a pessoa conseguiu sem o produto.
**Teste:** dê objetivo, não rótulos da UI. Observe sem conduzir; se ajudar, registre a ajuda. Meça conclusão sem ajuda, erros, hesitações e esforço percebido; peça que explique o resultado com suas palavras. Alterne ordem de variantes para reduzir aprendizagem.
**Análise:** uma linha por evento: contexto, ação/fala, resultado, interpretação, alternativa, confiança. Agrupe padrões e exceções. “3 de 6 participantes” é descrição daquela rodada, não estimativa de mercado.
**Experimento:** predefina evento de sucesso, horizonte, população, exclusões e guardrails. Valide instrumentação antes de expor variantes. Não encerre ao primeiro p<0,05; reporte incerteza e mudança prática, não só significância. Sem volume, use observação e acompanhamento longitudinal.

## Psicologia aplicada, sem fórmulas mágicas
| Mecanismo | Decisão possível | Verificação / limite |
|---|---|---|
| Agrupamento e proximidade | aproximar rótulo, valor, período e ação relacionados | usuário associa corretamente; espaços não corrigem texto ambíguo |
| Reconhecimento e familiaridade | ações visíveis, linguagem conhecida, padrões estáveis | encontrar sem lembrar instrução anterior; novidade visual não deve reinventar controles |
| Carga de memória | mostrar contexto e resumo na confirmação | menos retorno entre telas, sem ocultar informação necessária |
| Feedback e controle | estado imediato, progresso verdadeiro e recuperação | usuário sabe o que ocorreu e o que pode fazer; não confirmar antes do servidor |
| Autonomia | escolher objetivo, adiar lembrete, sair de incentivo | uso útil sem pressão; não confundir escolha aparente com controle real |
| Competência | mostrar tarefa concluída e impacto compreensível | usuário explica o que melhorou; pontos arbitrários não bastam |
| Vínculo | colaboração contextual com pessoas relevantes | utilidade e consentimento; não expor finanças em ranking |
| Rotina contextual | lembrete associado à ocasião em que a tarefa é útil | retorno com tarefa útil ao longo de semanas; não promessa de hábito em prazo fixo |

As aplicações acima são hipóteses de design, não efeitos universais.

Fontes primárias consultadas em 03/10/2026:
- [GOV.UK: planejar pesquisa](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service): perguntas e método devem responder à decisão.
- [GOV.UK: testes moderados](https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing): observar pessoas pertinentes executando tarefas.
- [W3C: hierarquia familiar](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p02-familiar-design/): padrões reconhecíveis ajudam orientação; orientação suplementar, não critério normativo WCAG.
- [Ryan e Deci, 2000](https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf): autonomia, competência e vínculo no estudo de motivação. Teoria não valida uma UI específica.
