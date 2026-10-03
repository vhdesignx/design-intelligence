# Design Intelligence

Galeria, glossário visual e guia de uso em um único site de Victor Hugo.

- **Galeria:** 157 referências analisadas, busca, filtros, ampliação e comparação de até quatro peças.
- **Copiar referências:** prompts para conceitos, linguagem visual ou reprodução fiel; cópia de imagem e download PNG. O vídeo fornece um quadro para copiar.
- **Glossário visual:** 46 termos, quatro referências reais anotadas e 14 regiões com observação, interpretação, aplicação e pergunta de revisão.
- **Guia de uso:** seleção, pesquisa, direção, implementação e crítica.
- **Laboratório:** três exercícios pareados (institucional, dashboard e fluxo mobile), acessíveis pelo guia. São demonstrações, não um experimento de eficácia.

## Executar

Site estático em HTML, CSS e JavaScript, sem dependências de produção e sem build obrigatório. Abra `index.html` ou sirva esta pasta com um servidor estático. Para testar todas as funções de clipboard, use localhost ou HTTPS e permita o acesso no navegador. Em arquivo local, o site público pode exigir salvar a imagem pelo link de original.

A cópia de texto não inclui imagens. Copie ou baixe cada imagem e anexe junto do prompt. As prévias orientadas têm até 1.800 px no maior lado; os originais estão disponíveis separadamente.

## Vercel

Importe `vhdesignx/design-intelligence`, selecione **Other**, use a raiz do repositório e deixe Build Command vazio. Não há variáveis de ambiente nem serviços externos obrigatórios. `vercel.json` habilita URLs sem extensão. O domínio definitivo deve ser escolhido antes de adicionar canonical e sitemap.

## Organização e manutenção

`index.html` é a galeria; `glossario.html` é o glossário; `guia.html` é o guia. Dados carregam de `data.js`, `glossario-data.js` e `estudos-data.js`. Imagens estão em `biblioteca/` e exercícios em `laboratorio/`.

A fonte editorial canônica é a biblioteca local Design Intelligence. Esta distribuição é produzida por `scripts/gerar_glossario.py` e `scripts/gerar_site.py` naquele núcleo. Alterações editoriais devem voltar à fonte antes de regenerar, para evitar divergência. A distribuição pública exclui caminhos pessoais, configurações de agentes, memórias e pacotes de bibliotecas upstream.

## Autoria e limites

Curadoria: Victor Hugo. Análises e implementação: Aster, com revisão de Victor. As peças de referência pertencem aos autores indicados em cada registro. Quando a autoria deriva do nome do arquivo, isso fica declarado; URLs de posts não verificadas não são inventadas. A inclusão no acervo não concede licença para usar os ativos em outros projetos. Nenhuma licença geral sobre imagens de terceiros é concedida por este repositório.

Observações visuais, interpretações e hipóteses são diferenciadas. Capturas não demonstram interação, acessibilidade completa, desempenho ou conversão. Lorem ipsum e dados fictícios são aceitáveis em estudos de composição. Os quatro arquivos ausentes estão identificados e não foram analisados.

As fontes de princípios e termos estão junto das respectivas entradas. Os estudos anotados mantêm os pixels da referência: recorte e marcações são apresentados por CSS, sem redesenhar a peça.
