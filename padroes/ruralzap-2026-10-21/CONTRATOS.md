# Contratos preservados e evidência

| Área | Comportamento esperado nesta direção |
|---|---|
| Hero/menu | seção cobre a hero estacionária; fechamento no contato geométrico; todos os fundos/recortes mudam juntos; reversão correta e nenhum vazamento nas bordas |
| Rolagem | melhoria progressiva; rolagem nativa completa, seleção por capacidade/entrada, respeito a movimento reduzido; não excluir “MacBook” por nome sem evidência |
| Navegação | mesmo shell; indicador ativo suave e interrompível; conteúdo não desaparece a cada troca; preservar rascunho/resultado e foco pertinente |
| Busca | junto da marca; lupa em pouco espaço; abrir/focar, pesquisar, selecionar, limpar, fechar por fora/Escape e devolver foco |
| Campos A | identificar valor/rótulo/unidade; foco, erro e seletor aberto coerentes; mouse, toque e teclado; popup cabe na viewport |
| Números | formatação pt-BR durante edição; letras/casas excedentes impedidas; colagem inválida preserva valor; edição central, cursor, composição e desfazer; validação novamente ao calcular |
| Ajuda | método/fontes/cuidados reunidos no “i”; fechar por fundo/Escape/botão e foco devolvido; seleção de texto não fecha; conteúdo longo rola internamente |
| Formulário em modal | rascunho preservado; clique fora não descarta dados automaticamente por copiar o contrato da ajuda |
| Equilíbrio | identificar o cruzamento receita/custo; retas coerentes com preço/custo constantes; slider atualiza ponto e valores, reset restaura base; teste temporário não altera conta salva |
| Cenários | até três por ferramenta; nomes com sufixos sem colisão; equivalência pelos dados completos; aviso e cópia explícita; legado preservado; zero cenários não ocupa painel vazio |
| Resultado | apoio junto da conclusão que qualifica; aviso de taxa/CET não cria bloco dispensável; cronograma abre por ação compacta |
| Exportação | XLSX com marca, números tipados, unidades, percentuais, hipóteses e cronograma; snapshot da conta, sem prometer modelo todo recalculável |
| Impressão | logo limpa, chat cinza muito claro ao fundo, sem superfícies do menu; cronograma completo, não só botão/tag |
| Mobile | sem quebra do grupo de ações; “Salvar” visível com nome acessível completo; navegação compacta, footer e apoios com composição própria |

## O que fundamenta esta versão
As revisões ocorreram no protótipo local em Chromium/Chrome e no navegador do aplicativo, com janelas amplas e estreitas, incluindo 320 px. Foram exercitados formulários, ajuda, busca, trocas de ferramenta, cenários, slider e exportação. Os registros detalhados continuam no projeto canônico, separados por revisão. As capturas nesta pasta e no [guia](GUIA.md) fixam a direção visual, não substituem testes temporais.

Os testes de `demo/testes/` conferem motor de cálculo, números, exploração de equilíbrio e cenários. Exportação teve inspeção do XLSX gerado (tipos, formatos, imagem da marca, nomes, percentuais, casos limites e cronograma), além de prévias renderizadas. A impressão teve inspeção de CSS print em prévia; **paginação nativa de impressão/PDF não foi comprovada**. Não houve execução em Safari/iOS/macOS ou tecnologia assistiva nesta revisão; não declarar compatibilidade universal.

## Revisão para integrar ao produto
Revalidar com o stack, dados, temas e dispositivos reais do destino. Inspecionar os estados intermediários da rolagem e a sequência abre/fecha/reabre; não aprovar movimento por uma captura dos extremos. Conferir zoom, teclado virtual, safe areas, conteúdo longo, modo escuro quando existente, armazenamento bloqueado, fontes tardias, rede lenta e preferência de movimento reduzido. Testar apenas o que o produto usa, mantendo cada resultado como observado, falha ou não verificado.

Preferência de direção aprovada não é pesquisa de eficácia. A aceitação de Victor encerra as pendências estéticas desta versão; não encerra validações de produção que ainda não ocorreram.
