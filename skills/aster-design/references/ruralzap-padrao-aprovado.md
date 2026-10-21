# RuralZap — padrão visual aprovado

Direção consolidada com Victor em 21/10/2026, preservando as decisões do painel operacional de 04/10. Este registro não transforma a identidade RuralZap em padrão de outros projetos ou resellers.

## Padrão para o redesign · aprovado em 21/10/2026

Victor aprovou o resultado final das Ferramentas do campo e pediu sua preservação para o redesign, incluindo o padrão das ilustrações. Abra o [guia versionado](../../../padroes/ruralzap-2026-10-21/GUIA.md), os [contratos](../../../padroes/ruralzap-2026-10-21/CONTRATOS.md) e a [direção de ilustrações](../../../padroes/ruralzap-2026-10-21/ILUSTRACOES.md). O pacote contém demonstração preservada, tokens, SVGs, arte, evidências e manifesto. Essa aprovação encerra as pendências estéticas intermediárias desta versão, sem afirmar integração de produção ou teste com usuários.

Aplicar o acabamento mineral claro, campos A, hierarquia enxuta e identidade contínua entre entrada e ferramentas. Preservar busca junto da marca, mobile com composição própria, ajuda contextual, validação numérica durante entrada, gráficos exploratórios com reset, cenários identificáveis e aviso de duplicidade, XLSX com marca e impressão composta para papel. Os contratos explicam cada condição; não reproduzir apenas as cores.

No MEYJE-Finance, transferir a direção aos componentes e tokens oficiais. As exceções abaixo sobre menus operacionais, funções, tema/reseller e radius continuam válidas. Não trocar o shell financeiro pelo cabeçalho público das calculadoras.

## Fonte e precedência

O template em `propostas/ruralzap-template-2026-10-04/`, relativo à raiz canônica, recebeu aprovação estética explícita de Victor: “Ficou incrível”. Quando esse histórico estiver disponível, abra a interface, as capturas desktop/mobile e `DIRECAO-VISUAL.md`. A versão de 03/10 e os primeiros cards não são a referência aprovada. A distribuição do pack inclui a base de 21/10; o histórico privado de 04/10 pode não acompanhá-la.

Transfira o acabamento com proximidade: proporções, hierarquia, ícones com volume, rodapés suaves, superfícies claras, gráficos distintos, hachuras e carteiras sobrepostas. Edaca orienta o Dashboard; Cashly, os gráficos e a densidade; Orbix, carteiras e adaptação mobile. As cores continuam sendo as do RuralZap. Efeitos aprovados não devem ser achatados por uma regra genérica contra gradientes ou por conveniência técnica.

As exceções posteriores de Victor prevalecem sobre o HTML demonstrativo:

- **Menus:** preservar estrutura e capacidades dos menus lateral e superior do sistema existente. A sidebar e o cabeçalho do template não são substitutos obrigatórios. Integrar o novo conteúdo ao shell atual.
- **Botões:** incorporar acabamento, contraste e estados do template, mantendo o radius/token do projeto. O botão flutuante circular é uma exceção específica, não um novo radius global.
- **Campos:** preservar os componentes existentes de rótulo flutuante, compacto, dentro do campo ou junto à borda. Não converter tudo em label externo acima. O label deve continuar identificável com foco, valor, autofill e erro; placeholder sozinho não o substitui.
- **Funções:** perguntar a Victor antes de remover uma capacidade, filtro, ação, tipo de lançamento, informação necessária ou caminho de acesso. Simplificar a hierarquia não autoriza empobrecer o produto. O template é uma especificação visual parcial, não um inventário funcional.

## Hierarquia e ação principal

Saldo das carteiras vem primeiro e tem um pouco mais de destaque; a pagar e a receber seguem, depois receitas/despesas. Separar saldo, realizado, previsto, reserva e limite de crédito conforme os contratos reais. Não transportar números fictícios.

Uma ação principal clara: **Novo lançamento**, também acessível por botão flutuante com `+` no canto inferior direito, acima da navegação inferior e da safe area. Reutilizar o fluxo global, permissões e validações existentes. Prever teclado, diálogos, outras ações flutuantes e conteúdo no fim da página. Evitar concorrência visual entre CTAs; preservar acesso às demais funções e aos menus aprovados.

No gráfico principal, fluxo de caixa é a prioridade. Permitir escolher informação e alternar linha/barras mantendo os mesmos dados e período. Categorias podem alternar rosca/barras. Usar adaptação mobile própria, incluindo os atalhos úteis já aprovados, sem suprimir destinos do sistema.

## Mini gráficos: tentar dados reais, preservar o acabamento

Victor pediu para tentar tornar os mini gráficos funcionais; depois autorizou explicitamente: **se não for possível manter bonito e real, podem ficar como estão por enquanto**. Essa concessão vale somente para os pequenos motivos visuais dos cards. Valores, contagens, estados e gráficos analíticos continuam usando dados reais.

Preferir a biblioteca já adotada pelo projeto. Em 04/10/2026, `apps/web/package.json` do MEYJE-Finance declara Recharts `^3.7.0`; conferir a situação atual antes de integrar. SVG próprio também é válido para preservar o desenho quando a série e a geometria forem simples. Não trocar o acabamento por um gráfico padrão da biblioteca.

Se funcional, definir significado e período antes de desenhar: saldo histórico por carteira selecionada, compromissos/recebimentos por vencimento, receitas/despesas realizadas por dia são possibilidades, sujeitas aos contratos disponíveis. Não converter uma faixa decorativa em percentual sem denominador, nem pontos em uma série arbitrária. Usar a mesma base dos valores, com estados sem dados, carregamento e erro; histórico ausente não é zero. Datas/valores devem ser acessíveis além de hover. Não inventar projeções, comparações ou percentuais.

Se permanecer decorativo, manter o visual aprovado, registrar a pendência e tratá-lo como ilustração sem significado quantitativo: `aria-hidden`, sem tooltip ou legenda que alegue dados reais, sem percentuais fabricados e sem apresentá-lo como tendência medida. Não bloquear a entrega visual por essa melhoria opcional nem remover os desenhos por padrão.

## Integração e revisão

Usar a arquitetura Next.js e os componentes do MEYJE-Finance. Em 04/10/2026, existem `CompactFloatingLabelControl`/`CompactTextField` em `packages/ui/src/components/compact-form-field.tsx`, Button em `packages/ui/src/components/button.tsx` e fluxo global de lançamento em `apps/web/src/components/layout/shell.tsx`. Revalidar esses pontos no código atual; reaproveitar em vez de criar um segundo sistema de formulários.

Aplicar a identidade pelo mecanismo oficial de tema/reseller e tokens semânticos, respeitando personalização e radius configurados. Não aplicar hex da demonstração globalmente a todos os tenants nem criar uma família paralela de tokens. Preservar modo escuro existente; a aprovação do template claro não autorizou removê-lo.

Prioridade: Dashboard, Transações, Faturas; propagar a família de componentes às outras telas, preservando necessidades de cada fluxo. Compare capturas equivalentes e verifique funcionalidade separadamente. A aprovação estética do template não valida cálculos, permissões, acessibilidade integral ou a integração de produção.

O roteiro com caminhos e critérios está em `propostas/ruralzap-template-2026-10-04/PROMPT-PARA-MEYJE-FINANCE.md`, relativo à raiz canônica da biblioteca.

## Calibração dos campos · 21/10/2026

Na ferramenta local de calculadoras, Victor rejeitou os selects nativos, a primeira revisão customizada e a curadoria visual de demonstrações Untitled UI/Mantine/Radix. A rejeição é do acabamento apresentado; não é proibição técnica desses primitives. Ele solicitou presença visual, minimalismo na medida, sofisticação e animações suaves de ação sem prejudicar performance.

Depois forneceu duas referências de menus claros com profundidade (catálogo `r67a118c70f7a` e `r112c81ed8d2b`) e estados de input com label que sobe à borda (`r4f71e3d7c4ce`). O recorte está em `propostas/ruralzap-ferramentas-2026-10-20/estudo-campos/`. Após comparar, Victor escolheu **A** e rejeitou a execução de B porque escurecia os campos e fazia o destaque ir para fora deles. Preservar presença nos próprios campos: superfície clara, contorno/luz/sombra, estado ativo legível e rótulo identificável. O julgamento de B é da execução; não invalida universalmente a referência ou fundos preenchidos. A escolha de acabamento não aprova toda a aplicação.

## Banner e legendas decorativas · 21/10/2026

Victor pediu o banner compacto para priorizar as ferramentas e preferiu os dois elementos flutuando sobre a arte, pois não reservam altura para uma faixa de legendas. A faixa inferior com divisória foi rejeitada. Manter as frases nos elementos sobrepostos, sem aumentar a altura ou cobrir o título e as ações.

Não acrescentar automaticamente “Ilustração conceitual”, “fake” ou explicações sobre a natureza de uma arte decorativa. Victor pediu a remoção desse texto e que explicações desse tipo só apareçam quando solicitadas. Isso não altera a identificação necessária de valores de exemplo nos cálculos nem autoriza apresentar uma ilustração como evidência factual.


### Atualização: menu unido à hero
Victor forneceu o recorte Klim (`rcc67c7504bb1`) e delimitou a transferência: moldura branca, recorte curvo junto à marca e fundo contínuo entre menu e hero. Manter os elementos agrícolas locais. O movimento solicitado é a hero parada enquanto a seção seguinte a cobre; não mover/recolher a hero para cima. Texto de apresentação curto, com quantidade derivada da lista real de ferramentas. Essa direção é da entrada das calculadoras locais, não uma substituição do shell do MEYJE-Finance. Estudo de 3D interativo fica separado.

No fechamento, Victor pediu menu inteiramente arredondado e transição fluida. Rejeitou a moldura que começava antes de a hero estar coberta, pois criava uma linha separando as peças. Para essa composição, manter a união até o contato real da seção com o menu; assumir a forma final no próprio encontro. Após ver a transição de 220 ms, Victor pediu troca direta para eliminar a faixa intermediária sob o logo. Recorte da marca, fundo verde e moldura devem mudar juntos; a suavidade permanece na rolagem. A união inferior precisa estar aberta quando a hero reaparecer. Conferir os estados intermediários e os cantos com conteúdo passando atrás, além dos extremos. Não generalizar o timing ou as medidas a outras composições.

## Telas menores e botões · 21/10/2026

Victor apontou quebra e má posição na navegação e nos campos das calculadoras: “No mobile menos é mais”. Pediu botões e navegação mais minerais para combinar com a nova identidade. Reduzir repetição de categoria, introdução e títulos na janela pequena; preservar dados necessários e todos os destinos. Evitar que título e ação secundária disputem largura ou que campos estreitos prejudiquem rótulos, valores e unidades. Uma coluna e um menu compacto são soluções desta revisão, não regras universais para todo formulário ou navegação.

O laboratório “Mineral Vivo” em `MEYJE-Finance/docs/design/redesign-discovery-2026-10-14/comparacao/DESIGN.md` e seu CSS orientaram superfícies claras, oliva e relevo discreto. Isso não afirma aprovação de todo esse laboratório. Manter o acabamento A escolhido para os campos. A revisão integra o resultado final aprovado em 21/10; documentação histórica e capturas estão em `propostas/ruralzap-ferramentas-2026-10-20/mobile-revisao/`.

### Continuidade e busca · 21/10/2026
Victor pediu o mesmo desenho de menu no início e dentro das calculadoras, busca no cabeçalho (campo em espaço amplo, lupa expansível em espaço reduzido) e redução do caminho redundante acima do título. A revisão remove o breadcrumb, preserva navegação entre todas as ferramentas e categoria/título/descrição onde úteis. Também pediu a suavidade de rolagem do Aethos com adaptação por dispositivo/navegador; o código consultado usa Lenis, mas isso não obriga outras interfaces a adotar essa biblioteca. Implementação e evidências históricas em `propostas/ruralzap-ferramentas-2026-10-20/navegacao-revisao/`; a versão final está preservada no padrão aprovado de 21/10.

Victor escolheu posicionar a busca no início da faixa verde, junto à marca, com navegação complementar à direita. A posição se mantém nas calculadoras; em janela estreita, a lupa abre o campo sobre o cabeçalho. Escolha desta composição, não regra universal de posição de busca.
