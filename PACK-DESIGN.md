# Pack Aster · UX/UI e direção de arte

Versão consolidada em 21/10/2026 a partir da revisão profissional de Victor Hugo nas Ferramentas do campo RuralZap.

| Entrada | Uso |
|---|---|
| [Aster Design](skills/aster-design/SKILL.md) | contexto, repertório observado, direção e aprendizado |
| [Aster Interface Design](skills/aster-interface-design/SKILL.md) | componentes, estados, adaptação, comparação e saída |
| [Aster Design Review](skills/aster-design-review/SKILL.md) | inspeção real de composição, comportamento e evidência |
| [Aster UX Research](skills/aster-ux-research/SKILL.md) | investigar necessidades e validar hipóteses sem confundir aprovação com pesquisa |

Em criação e redesign, pesquisar referências pertinentes faz parte do processo: acervo, Pinterest, Dribbble, Awwwards, Behance e produtos reais conforme a pergunta. Abrir e analisar vale mais que acumular links. Uma correção pequena usa a direção aprovada; não exige nova rodada de pesquisa por rotina.

## Padrão RuralZap salvo para o redesign
[Guia visual e demonstração](padroes/ruralzap-2026-10-21/GUIA.md) · [Ilustrações e receita](padroes/ruralzap-2026-10-21/ILUSTRACOES.md) · [Contratos](padroes/ruralzap-2026-10-21/CONTRATOS.md) · [Pedido para integrar ao produto](padroes/ruralzap-2026-10-21/REDESIGN.md).

O pacote registra o acabamento mineral, campos A, menu/hero, busca, mobile, formulários, ajuda, gráficos, comparação, Excel e impressão. Mantém a arte aprovada e seis miniaturas SVG. Não impõe essa aparência a outras marcas. Não substitui o inventário funcional e a arquitetura do produto de destino.

## Usar e verificar
Mantenha a estrutura `skills/` junto de `padroes/`. Leia a skill pelo agente ou use vínculos conforme seu ambiente; este pacote não altera configuração, permissões ou autonomia. As instalações locais existentes continuam apontando para a fonte canônica.

Sirva a raiz com um servidor estático e abra `padroes/ruralzap-2026-10-21/demo/`. Exemplo: `python -m http.server 8770 --bind 127.0.0.1`. HTTP local é necessário para carregar o modelo de Excel e os módulos de melhoria da rolagem; não basta abrir o HTML em `file:` para verificar todas as funções.

Dentro da pasta `demo/`, execute os testes com Node: `node testes/calculos.test.cjs`, `node testes/numeros.test.cjs`, `node testes/equilibrio.test.cjs` e `node testes/cenarios.test.cjs`.

Na biblioteca canônica, `scripts/gerar_pack_design.py` atualiza esta distribuição por lista delimitada, valida os hashes do snapshot e recusa caminhos pessoais/credenciais. Não republica o catálogo privado. A cópia pública contém o acervo anteriormente publicado; `skills/aster-design/scripts/repertorio.py` também o consulta sem executar JavaScript.

As capturas documentam estados vistos. Os limites de plataforma e impressão estão nos contratos. Marcas e ativos de terceiros mantêm seus direitos; as licenças de Manrope, Lenis e ExcelJS acompanham a demonstração. Nenhuma licença sobre RuralZap é concedida por este registro.
