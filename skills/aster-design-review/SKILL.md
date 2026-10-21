---
name: aster-design-review
description: Revisar UX/UI em interfaces funcionando, com evidência visual e comportamento, priorizar problemas e verificar correções. Use para auditoria de design, acessibilidade, responsividade, estados, conteúdo e aparência genérica.
---

# Aster Design Review
Julgue pela tarefa, pelo contexto e pela direção escolhida.

Ao revisar RuralZap/MEYJE-Finance, compare com o [padrão consolidado em 21/10/2026](../aster-design/references/ruralzap-padrao-aprovado.md), respeitando as exceções do shell operacional, radius e campos de 04/10. Mini gráficos decorativos têm uma concessão específica; conferir essa condição sem tratá-los como dados reais ou bloquear a entrega por ela.

**Estudo de referência ou auditoria de produto?** Para conceitos e screenshots de inspiração, comece por composição, hierarquia, tipografia, cor, espaçamento, imagem e UX visível. Explique acertos e tensões com localização e efeito esperado. Lorem ipsum, contas fictícias e arredondamentos não invalidam a direção visual; comentários de conteúdo só são centrais quando afetam leitura, entendimento ou ação. Use o procedimento abaixo para a interface funcional. Em reprodução fiel, avalie os desvios em relação à imagem, sem impor um redesenho.

1. Identifique URL/tela, tarefa, público, versão, dados e direção. Abra a interface e execute o caminho principal. Se só houver screenshot, limite explicitamente o parecer ao que aparece.
2. Inspecione primeiro o conjunto: o que chama atenção, o que se entende, o que se faz a seguir e o que torna esta interface específica do produto. Depois examine os detalhes.
   Quando houver referências fornecidas por Victor, compare capturas equivalentes com o mapa de elementos escolhido: proporções, escala tipográfica, espaço, densidade, gráficos, ícones, superfícies e acabamento. Use [fidelidade visual](../aster-design/references/fidelidade-visual.md). Registre desvios concretos; não declare proximidade com uma referência apenas por compartilhar cor ou estrutura de cards.
3. Aplique `references/revisao.md` a desktop, janela estreita e fluxo mobile pertinente, incluindo as subviews alteradas e os estados visuais dos controles. Na distribuição de informação e ações, use [julgamento de composição](../aster-interface-design/references/julgamento-de-composicao.md): confira espaço sem função, texto de apoio dispensável e redundância, preservando significado, acesso e espaço útil. Para campos e pickers, use [estados e contratos](../aster-interface-design/references/interfaces.md#estados-e-contratos). Leia estados de erro, vazio e conteúdo longo; verifique números e textos, não apenas CSS.
4. Separe: **defeito observado**, **risco ainda não testado**, **preferência estética**. Não reprove fonte, gradiente ou card isoladamente. Use repertório como alternativa contextual, não autoridade.
5. Cada problema precisa de: captura/localização, condição de reprodução, evidência, impacto na tarefa, prioridade e correção proposta. Priorize perda de dados/ação errada, impedimento, esforço e depois acabamento.
6. Corrija dentro do escopo autorizado, agrupe ajustes e confira os caminhos afetados. Registre antes/depois. Não repita testes sem nova alteração, falha ou risco.
7. Entregue problemas resolvidos, pendências e o que não foi verificado. Sem nota de “premium” ou “100k”. Teste automático não substitui revisão visual, tecnologia assistiva nem calibração estética de Victor.

Para comparar com/sem skills, mantenha briefing, dados, runtime, tempo e critérios equivalentes; declare autoria, contaminação de contexto e ausência de teste independente quando existirem. Uma demonstração pareada não prova causalidade.
