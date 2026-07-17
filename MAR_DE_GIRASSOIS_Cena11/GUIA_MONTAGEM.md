# GUIA DE MONTAGEM — Mar de Girassóis (Cena da Dança)

Guia prático pra montar e animar a cena. Feito pra quem está começando no
After Effects, mas com o fluxo profissional (AE + Premiere).

---

## 1. Premiere ou After Effects?

**Comece no After Effects.** Quase todo beat desta cena é **efeito/composição**,
não corte: chroma key (green screen), sobreposição de partículas, a linha de
costura animada, slow-motion e o apagamento com borracha no final. Isso é
território de AE. O Premiere sozinho não faz a linha de costura nem os green
screens direito.

**Fluxo recomendado (híbrido):**
- **After Effects** = cada bloco pesado vira uma *composition* (comp). É onde
  você anima os efeitos.
- **Premiere** = a espinha: montagem final na ordem da coreografia, sincronia
  com a música, ajuste de tempo, cor e export.
- **Dynamic Link** liga os dois: você manda a comp do AE pro Premiere e ela
  atualiza sozinha quando você edita no AE.

Se for usar **só um** por enquanto: **After Effects**.

---

## 2. Configuração do projeto (AE)

1. `Composition > New Composition`
   - Preset: **HDTV 1080 25** (ou 24, conforme o resto do filme — confirme o fps padrão do projeto).
   - Resolução: **1920×1080** (Full HD). Vários materiais são 4K, então dá pra
     dar zoom/reframe sem perder qualidade.
   - Duração: **2:30** (2min30s).
   - Nome da comp master: `MASTER_Cena11`.
2. Salve o `.aep` dentro da pasta `00_PROJETO/`.
3. Importe o material: `File > Import > File...` — importe cada pasta de
   `01_MATERIAIS/` mantendo os bins com o **mesmo nome numerado** no painel
   Project. Assim a organização do disco = organização do projeto.

**Estrutura de bins no painel Project (espelhe as pastas):**
```
01_COSMICOS · 02_FOGO · 03_TERRA · 04_AGUA · 05_AR
06_FOGO_CHAO · 07_COSTURA_EFEITOS · 08_LINHA_VERMELHA · 09_PINCELADAS_FINAL
_COMPS  (suas pré-comps)   _SOLIDS   _AUDIO
```

**Uma pré-comp por bloco:** crie `COMP_01_Cosmicos`, `COMP_02_Fogo`, etc. Anima
cada uma isolada e depois encaixa todas na `MASTER_Cena11` na ordem da timeline
(ver `DECUPAGEM_MAPA.md`). Isso mantém o projeto leve e organizado.

---

## 3. Técnicas por tipo de material

### Fogo, Cósmicos, Terra (poeira), Ar (fumaça)
- Modo de mesclagem **Screen** ou **Add** (menu de blending da camada). O preto
  do fundo some e só o brilho/fumaça aparece.
- Ajuste **Levels/Curves** pra reforçar o contraste antes do Screen.

### Água
- São 5 clipes em sequência ("o giro"). Encadeie com **cross-dissolve** curtos.
- Alguns são verticais (`0_Wave_Ocean_2160x3840`) — use como textura em movimento
  vertical ou reframe.

### Green screen (Efeitos_02 e Efeitos_08)
1. Aplique o efeito **Keylight (1.2)**.
2. Com o conta-gotas de `Screen Colour`, clique no verde do fundo.
3. `Screen Gain` e `Screen Balance` pra limpar; `Screen Matte > Clip Black/White`
   pra fechar as bordas.
4. Se sobrar borda verde, `Screen Colour` → aba de despill.

---

## 4. Linha de costura (bloco 07 — 01:30) — a peça-chave a CRIAR

A cicatriz é uma **linha que percorre a tela e faz um zigzag vertical pra baixo**
no fim. No AE:

1. Ferramenta **Pen (G)** → desenhe o caminho da linha sobre uma **camada Shape**
   (não feche o traçado). No final do caminho, faça os pontos em **zigzag
   vertical** (sobe-desce curtinho) simulando o ponto de costura.
2. Na Shape Layer: `Add > Trim Paths`.
3. Anime **`Trim Paths > End`** de **0% → 100%** ao longo do tempo. A linha "se
   desenha" percorrendo a tela.
4. Estilo do traço: `Stroke` com espessura ~6–10px. Para a costura, ative
   **`Dashes`** no Stroke (linha tracejada = pontos de costura).
5. Cor: comece **branco/escuro** no bloco 07; no bloco 08 (01:49) troque para
   **vermelho** (a "linha vermelha" da decupagem é a continuação desta).
6. Suavize com `Easy Ease (F9)` nos keyframes do End.
7. (Opcional) `Layer Styles > Bevel/Emboss` leve pra dar relevo de cicatriz.

---

## 5. Efeito borracha / brush no final (bloco 09 — 02:09)

Objetivo: os desenhos **desaparecem como se uma borracha/pincel apagasse**.

**Método com Track Matte (recomendado):**
1. Junte tudo que deve sumir numa pré-comp: `PINCELADAS_FINAL`.
2. Acima dela, ponha o clipe `0_Brush_Stroke_4096x2304.mp4` (traço de pincel em
   branco sobre preto).
3. Na camada de baixo, defina **Track Matte = Luma Inverted Matte** apontando pro
   brush. Onde o pincel passa (branco), a imagem some.
4. Ajuste o tempo do brush pra "varrer" a tela no ritmo do apagamento.

**Alternativa manual:** aplique o efeito **Eraser**/máscara animada e anime a
máscara revelando o fundo, com `Mask Feather` alto pra borda macia.

Instrução da decupagem: no final, deixe **todos os vídeos de pinceladas e efeitos
agrupados de modo destacado** — por isso a pré-comp única `PINCELADAS_FINAL`.

---

## 6. Ordem de trabalho sugerida

1. Monte o **esqueleto**: arraste as 9 pré-comps na ordem certa na `MASTER`, só
   pra ver o tempo total bater com a coreografia (~2:30).
2. Anime bloco a bloco, **na ordem** (01 → 09). Não pule — cada bloco herda o
   clima do anterior (transições por dissolve).
3. Deixe **linha de costura** e **apagamento final** por último (são os mais
   trabalhosos).
4. Só então leve pro Premiere via Dynamic Link pra sincronizar com a música e
   fechar cor + export.

Dúvidas de qualquer passo, me chama que eu detalho.
