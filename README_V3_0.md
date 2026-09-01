# Robô Léo — Versão 3.0

## Arquivos principais
- `index.html`
- `style.css`
- `script.js`
- `CONTRATO_DA_JORNADA_ROBO.docx`

## Nova Fase 1 do CONSCIÊNCIA+
A Fase 1 foi reorganizada em **4 blocos de atividades**, todos dentro do tabuleiro 5×5:

1. Sono que restaura
2. Higiene e alimentação
3. Dedicação aos estudos
4. Trabalho e Lazer

Os quatro destinos permanecem fixos nos cantos:
- superior esquerdo: bloco 1
- superior direito: bloco 2
- inferior esquerdo: bloco 3
- inferior direito: bloco 4

Antes de cada bloco, o jogador escolhe a pista correta. Somente o canto correspondente fica iluminado e todas as tarefas daquele bloco são sorteadas simultaneamente nas células livres.

## Imagens 01–40
As novas imagens devem ficar na **raiz do GitHub**, com estes nomes físicos:
`01.jpg`, `02.jpg`, ... `40.jpg`.

O número é usado para carregar o arquivo. O código pedagógico (MCF, MT, FCF, FT etc.) fica apenas internamente. Ao clicar para ampliar, o jogador vê **somente o nome da ação**, nunca o código.

- versão masculina: imagens 01–20
- versão feminina: imagens 21–40
- `20.jpg`: MT15 — Tarefas concluídas
- `40.jpg`: FT15 — Tarefas concluídas

As imagens 20 e 40 aparecem somente na conclusão dos quatro blocos, como mensagem de parabéns.

## Pontuação e Pentágono
Cada eixo começa com **2,0** e pode ganhar até **+1,0 na Fase 1**:
- até +0,50 pelas tarefas;
- até +0,50 pelo quiz.

Tarefas são normalizadas pela quantidade do bloco:
- Bloco 1: 3 tarefas → 0,50 / 3 por tarefa no eixo Sono.
- Bloco 2: 3 tarefas → 0,50 / 3 por tarefa nos eixos Higiene e Alimentação.
- Bloco 3: 5 tarefas → 0,10 por tarefa no eixo Estudos.
- Bloco 4: 4 tarefas → 0,125 por tarefa no eixo Lazer/bem-estar.

Quiz da Fase 1: 9 questões no total:
- Sono: 2
- Higiene e alimentação: 3
- Estudos: 2
- Lazer/bem-estar: 2

Ao final da Fase 1, cada eixo pode chegar a **3,0**. As estruturas das Fases 2 e 3 permanecem preparadas para futuras atualizações, com teto planejado de 4,0 e 5,0 respectivamente.

## Importante: ECOTECH+ e HUMANO+
As versões anteriores já usavam `01.jpg` a `54.jpg` na raiz. Como a nova Fase 1 agora reserva `01.jpg` a `40.jpg`, há conflito de nomes.

Para preservar os níveis antigos, coloque a série antiga 01–54 na pasta `legacy/`. O código 3.0 já está preparado para procurar essas imagens nesse local.

## Perfis
A Versão 3.0 mantém:
- nome do jogador;
- sexo masculino/feminino;
- PIN de 4 dígitos;
- exportação/importação de progresso;
- Contrato da Jornada;
- progresso separado por perfil.

Perfis de versões anteriores são migrados para a arquitetura 3.0. O progresso de ECOTECH+ e HUMANO+ é preservado; a nova Fase 1 do CONSCIÊNCIA+ começa com o Pentágono em 2,0 para os cinco eixos.
