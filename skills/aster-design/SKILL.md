---
name: aster-design
description: Conduzir projetos de UX/UI, sites, landing pages, apps e dashboards com repertório visual, contexto de produto e direção própria. Use para criar, redesenhar ou coordenar uma mudança visual; capturar referências e aprendizados reutilizáveis.
---

# Aster Design
Transforme contexto e repertório em decisões específicas. Leia apenas os recursos necessários.

## Comece pelo trabalho real
1. Leia instruções locais, identidade existente, telas e componentes do projeto. Preserve o que funciona em refinamentos; diferencie redesenho de correção. A especialização Aethos continua válida quando aplicável.
2. Registre em até 6 linhas: público, tarefa prioritária, contexto de uso, sucesso esperado, restrições e incerteza de maior risco. Pergunte somente se a resposta mudar a solução; use o que Victor já informou.
3. Se a dúvida for sobre necessidade, jornada ou incentivo, use `aster-ux-research`. Não simule participantes nem apresente opinião como pesquisa.

## Repertório que muda a decisão
A biblioteca fica na raiz do Design Intelligence, três níveis acima desta pasta de skill; o script resolve a localização também por junction. Na distribuição, o acervo publicado pode ser menor que o privado.
- Quando Victor fornecer referências visuais, leia `references/fidelidade-visual.md`. Uma referência pede proximidade por padrão; várias pedem escolha dirigida de elementos com o usuário. As imagens fornecidas têm precedência sobre a seleção automática do acervo.
- Em telas do RuralZap/MEYJE-Finance, leia [padrão RuralZap aprovado](references/ruralzap-padrao-aprovado.md): direção consolidada em 21/10/2026, ilustrações, campos A e contratos de interação; preserve as exceções do shell operacional de 04/10. Não generalize essa identidade a outros produtos.
- Consulte `scripts/repertorio.py search "problema"` desta skill. Retorna registros e caminhos absolutos.
- Quando o briefing não trouxer referências suficientes, selecione 2–4 pertinentes, incluindo um contraponto. Abra as imagens indicadas com a ferramenta visual; para vídeo, veja a sequência e o movimento. Não trabalhe apenas dos resumos.
- Extraia de cada referência: decisão observada → por que pode ajudar esta tarefa → risco → adaptação. Cite os IDs na direção.
- Em referências conceituais, explique primeiro composição, hierarquia, tipografia, ritmo, cor e UX visível. Lorem ipsum, arredondamentos e dados fictícios não são defeitos centrais do design. Só destaque conteúdo quando sua forma prejudicar leitura, entendimento ou ação; conferência de cálculos pertence à implementação funcional.
- Respeite a intenção de uso: transferir conceitos, obter parentesco visual ou reproduzir fielmente. Em réplica, não substitua a composição por suas preferências; compare capturas equivalentes e declare aproximações. Se houver várias referências, atribua um papel a cada uma; telas incompatíveis não viram uma fusão “fiel”.
- Em criação e redesign, pesquisar referências visuais faz parte do processo padrão: combine acervo e busca externa pertinente em Pinterest, Dribbble, Awwwards, Behance ou produtos reais. Leia [pesquisa visual](references/pesquisa-visual.md). Escolha fontes pela pergunta; não percorra todas por obrigação. Correções pequenas partem da direção aprovada. Registre URL, data, acesso e limites; screenshots não demonstram conversão.
- Orbix é uma preferência de Victor para painéis, não um modelo obrigatório. Veja `references/direcao.md`.

## Direção antes de polimento
Escolha uma ideia que organize conteúdo, composição, tipografia, imagens e interação. Faça duas alternativas pequenas se a escolha for incerta; não produza três temas cosméticos da mesma estrutura.
Escreva uma direção curta: conceito, prioridade visual, combinação de referências, tokens essenciais, comportamento adaptativo e o que tornaria a solução inadequada. Trabalhe com conteúdo realista e coerente.
Gradiente, card, serifada, Inter e simetria não são falhas em si. Justifique a combinação no contexto.

Na composição, exercite [julgamento sobre posição, espaço e informação](../aster-interface-design/references/julgamento-de-composicao.md). A preferência de Victor é resolver relações e reduzir redundância com discernimento: um novo dado não exige um novo bloco, e compactar só ajuda quando mantém compreensão. Transfira esse raciocínio entre projetos, preservando liberdade de linguagem visual e estrutura.

Ao usar ilustrações, confira duas decisões distintas: a ação e os objetos da cena explicam o conteúdo onde ela aparece; a paleta se integra à marca em tom, saturação e proporção. A cor padrão do SVG e a facilidade de encontrar um personagem não justificam a escolha. Compare outras cenas quando necessário e varie pessoas, objetos e ambientes conforme a narrativa. Preserve flexibilidade de cor e estilo; preferências de uma marca não viram regras de outra.

## Conduza e feche
Use `aster-interface-design` para jornada, estados e implementação; `aster-design-review` para conferir a interface funcionando. Para ajustes pequenos, faça só a etapa pertinente.
Entregue interface utilizável, comparação visual com a direção escolhida, evidências técnicas e limitações. Responsividade e ausência de bugs não demonstram fidelidade nem aprovação estética. Não prometa exclusividade absoluta nem ausência eterna de aparência genérica.
Em aplicações operacionais, confira a composição das subviews alteradas, os estados visuais dos controles e a utilidade dos textos. A aprovação do template não aprova automaticamente cada componente derivado. A revisão deve identificar as telas e estados realmente vistos; uma captura da visão geral ou um detector sem achados não cobre o restante do fluxo.
Registre apenas aprendizados que mudariam outra decisão: contexto → escolha → evidência → resultado/limite → regra condicional. Use `references/direcao.md` para incorporação. Nunca transforme feedback isolado em lei estética.
