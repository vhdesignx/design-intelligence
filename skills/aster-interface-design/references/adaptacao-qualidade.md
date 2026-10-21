# Adaptação, acesso e qualidade técnica
Defina primeiro as janelas e entradas realmente usadas. Matriz inicial web: 320×800, 390×844, 768×1024, 800×800, 1440×900 e 1920×1080; teste também redimensionamento contínuo. São amostras, não todos os dispositivos.

| Elemento | Janela estreita | Janela ampla / quadrada |
|---|---|---|
| Navegação | poucas tarefas frequentes visíveis; menu com rótulo para restante | lateral ou superior conforme frequência; não preencher largura por obrigação |
| Tabela | manter colunas decisivas, detalhe acessível; scroll local anunciado se necessário | densidade adequada, cabeçalho e ordenação claros |
| Gráfico | reduzir ticks/legenda, manter unidade e acesso a valores | comparar sem esticar proporção indefinidamente |
| Formulário | uma sequência, teclado adequado e ação não coberta | agrupar semanticamente; não transformar tudo em duas colunas |
| Lista/detalhe | navegar e voltar com posição/seleção preservadas | dois painéis quando ambos ajudam a tarefa |
| Conteúdo | prioridade determina ordem; nenhuma ação essencial desaparece | largura máxima por leitura, não texto de ponta a ponta |

Container queries e CSS intrínseco podem resolver componentes sem adivinhar aparelhos. Dobrar, girar e abrir teclado não pode reiniciar tarefa. Use safe areas quando pertinentes. Teste toque, teclado, zoom e textos ampliados; hover não pode ser o único caminho.
Android nativo: [guia adaptativo](https://developer.android.com/develop/adaptive-apps/guides/get-started-with-adaptive-apps). Consulte classes de janela e postura/hinge atuais. iOS/iPadOS/visionOS: consultar HIG da plataforma no projeto; não extrapolar medidas web ou afirmar teste em hardware que não houve.

## Acesso: referência WCAG 2.2 AA
[WCAG 2.2](https://www.w3.org/TR/WCAG22/) é a fonte normativa. Verificar contraste (texto normal 4,5:1; texto grande 3:1), contraste de controles, ordem/visibilidade de foco, operação por teclado, rótulos, erros, nomes/estados e alternativas textuais. Reflow a 320 CSS px e zoom não devem perder conteúdo essencial; existem exceções normativas para conteúdos bidimensionais. Alvos mínimos AA têm critério de 24×24 CSS px e exceções; 44×44 é uma meta prática de toque, não o limiar universal AA.
Automação detecta parte dos problemas. Fazer percurso manual e teste com tecnologia assistiva compatível com o alvo. Relatar critérios e escopo verificados; não declarar conformidade total por um score.

## Desempenho
Defina orçamento por projeto: tamanho inicial, JS, imagens/fontes e tempo de resposta de tarefa em rede/aparelho representativos. Meça antes de otimizar.
Imagem com dimensões, formatos apropriados e variantes; lazy abaixo da dobra, prioridade só no necessário. Evite fontes/pacotes grandes sem benefício, layout instável e animação que bloqueia input.
[Core Web Vitals](https://web.dev/articles/vitals): bons limiares LCP ≤2,5 s, INP ≤200 ms e CLS ≤0,1 no percentil75, separados por dispositivo. Lighthouse/laboratório não são dados de campo; INP exige interações e coleta adequada. Anote hardware, rede, cache, viewport e versão ao medir.

## Movimento como melhoria progressiva
Ao adotar rolagem suave, parallax ou efeitos que interceptam entrada, preserve uma versão nativa completa. Escolha pelo tipo de entrada, capacidades e limitações comprovadas do navegador, não pelo nome do aparelho: “MacBook” não determina navegador, taxa de atualização ou desempenho. Consulte a implementação de uma referência antes de atribuir o efeito a uma biblioteca.

Defina condições de ativação, interrupção e retorno ao nativo antes de aplicar o efeito. Considere movimento reduzido com mudança em tempo real, toque e inércia do sistema, pinch/zoom, teclado, âncoras, histórico, foco, seletores e diálogos com rolagem própria. Evite RAF permanente quando nada se move; falha de importação não pode impedir navegação. Se houver degradação automática por desempenho, use uma janela sustentada e registre seu critério, sem prometer detecção universal de aparelhos lentos.

Componentes ligados ao scroll precisam compartilhar a posição realmente desenhada. Não conduza menu/sticky pela posição-alvo de uma animação enquanto o conteúdo ainda está em outro ponto. Teste parar exatamente no encontro das superfícies, inverter a direção e mudar de rota durante a inércia: nenhum recorte intermediário pode ficar preso. O shell mantém sua identidade entre lista e detalhe; mudanças de estado não justificam trocar o desenho da navegação inteira.

Em navegação entre ferramentas, investigar se a piscada vem da recriação do shell e de uma animação global que parte de transparência zero. Preservar os elementos compartilhados e o foco; animar a seleção a partir da posição visual corrente e manter a ação interruptível. Não reiniciar animações de gráficos ou resultados já existentes apenas por retornar à tela. Verificar cliques rápidos, volta pelo histórico, dados preenchidos, posição da página e menu compacto. Calibração RuralZap de 21/10/2026; duração e estilo do indicador pertencem à composição, não a um template obrigatório.

Validação: diferencie viewport redimensionado, entrada emulada, motor e hardware real. Um teste em Chrome no Windows não aprova Safari/macOS/iOS. Registre a combinação exercitada e a alternativa nativa; a ausência de teste não prova incompatibilidade. Parâmetros e biblioteca pertencem ao projeto, não viram padrão obrigatório para toda interface.

## Páginas públicas: descoberta
HTML semântico, título e descrição coerentes, URLs/indexação/canonical corretos, conteúdo útil verificável, autoria quando relevante, links internos e dados estruturados compatíveis com o conteúdo visível. Validar robots/noindex, status HTTP, sitemap e ferramentas de busca quando houver ambiente publicado.
[Google Search Central — recursos de IA](https://developers.google.com/search/docs/appearance/ai-features): os fundamentos de SEO continuam aplicáveis; não há requisito especial de arquivo/schema para aparecer nas experiências de IA.
AEO/GEO: declarar hipótese e medir consultas, impressões/citações observáveis e tráfego útil; não prometer posição ou atribuir variação a uma única intervenção. Sem produção, registrar “não medido”.
