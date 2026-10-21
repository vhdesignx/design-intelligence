# Comparar, exportar e imprimir

Critérios derivados da revisão RuralZap de 21/10/2026. Aplique somente às funções presentes no produto; não acrescente exportação, cenários ou modais a todo projeto.

## Comparação que ajuda a decidir
- Identifique os cenários de forma inequívoca. Se nomes repetidos forem permitidos, proponha sufixos previsíveis `(1)`, `(2)` etc., respeitando nomes já existentes e comprimento. Normalize espaços e caixa para detectar colisão. Renomear registros antigos não pode alterar IDs, dados ou datas.
- Detecte equivalência pelos dados efetivos: ferramenta/modelo, valores numéricos normalizados, unidades e alcance. Não use apenas texto digitado, nome ou resultado arredondado. Entradas diferentes podem produzir o mesmo resultado; isso ainda é uma comparação válida.
- Avise antes de salvar uma cópia idêntica. Ofereça alterar os dados como caminho principal; se cópias forem úteis, deixe salvar explicitamente. Não apague duplicatas antigas por conta própria. Duplicidade não deve se disfarçar de novo cenário.
- O estado vazio não exige um painel grande e permanente. Mostre orientação perto da ação ou sob demanda. Ajuste a composição a um, dois ou três cenários; não reserve três colunas vazias por conveniência.
- Preserve nomes e critérios nas telas, cópia e arquivo exportado. Salvar exige sucesso real; armazenamento indisponível pede recuperação sem perder o formulário.

## Escolher o formato pelo uso
CSV carrega dados tabulares, não logo, largura de coluna, cor ou estilo. Para um relatório visual em planilha, use XLSX real; não renomeie CSV/HTML para fingir esse formato. Mantenha CSV apenas quando houver necessidade de intercâmbio de dados.

No XLSX, use números e datas tipados, formatos locais, percentuais em escala correta e unidades explícitas; ausência não é zero. Preserve nomes como texto, inclusive quando começam por `=`. Organize resumo, entradas, resultados, hipóteses, fontes e cronograma com hierarquia de leitura. Compare cenários lado a lado quando isso ajudar. Integre marca e tipografia com contenção; o arquivo deve continuar útil para selecionar/copiar valores.

Defina se o arquivo é um retrato da conta ou um modelo recalculável. No primeiro, não prometa fórmulas onde só existem valores; no segundo, valide dependências, referências e recálculo. Carregue bibliotecas pesadas sob demanda; capture a conta antes da operação assíncrona, evite cliques duplicados e ofereça erro recuperável. Confira o arquivo gerado de verdade, não só a prévia HTML: tipos, nomes, formatos, imagens, vínculos e limites como 1/120 parcelas e 1/3 cenários.

## Impressão é outra composição
Remova menus e ações, preserve contexto, unidades e informação necessária para conferir a conta. Use a marca sem transportar o fundo decorativo do cabeçalho. Marca d'água, se fizer parte da identidade aprovada, deve ser discreta e não reduzir legibilidade.

Conteúdo necessário que estava num disclosure ou modal precisa aparecer completo: cronograma mensal, cabeçalhos de tabela e totais. Teste quebras, repetição de cabeçalho e páginas longas. Uma simulação de CSS print não verifica paginação real do PDF/impressora; registre essa distinção.

## Apoio sem inflar a tela
Uma ressalva curta pertence à conclusão ou métrica que qualifica quando essa associação preserva entendimento. Não crie uma linha, tag ou card para cada nota. Detalhes extensos podem abrir por ação explícita; a decisão principal não deve depender de descobrir um tooltip. Em telas estreitas, rótulos de ação podem ser mais curtos, como “Salvar”, mantendo nome acessível e acesso às demais funções.
