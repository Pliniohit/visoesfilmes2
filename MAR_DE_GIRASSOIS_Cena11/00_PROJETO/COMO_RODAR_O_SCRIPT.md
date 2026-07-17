# Como montar a cena automaticamente no After Effects

O arquivo **`Montar_Cena11.jsx`** monta o projeto inteiro pra você.
Ele cria o projeto a **24 fps**, importa os clipes, faz os 9 bins, monta as 9
pré-comps na ordem da decupagem, posiciona tudo na `MASTER_Cena11` no tempo
certo, aplica os modos de mesclagem e já cria a **linha de costura** e o
**matte de apagamento**.

## Passo a passo

1. **Baixe os materiais do Drive** e coloque cada clipe na subpasta certa de
   `01_MATERIAIS/` (cada pasta tem um `_LISTA.md` com os arquivos e links).
   > O script importa **os arquivos que existirem** em cada pasta — então baixe
   > tudo antes de rodar. Onde faltar clipe, ele cria um sólido placeholder.

2. Abra o **After Effects**.

3. Menu **File > Scripts > Run Script File...**

4. Selecione **`00_PROJETO/Montar_Cena11.jsx`**.

5. Quando abrir a janela, selecione a pasta **`01_MATERIAIS`**.

6. Espere. No fim aparece um resumo do que foi montado e abre a `MASTER_Cena11`.

> Se o AE bloquear o script, ative:
> **Edit > Preferences > Scripting & Expressions > "Allow Scripts to Write Files
> and Access Network"** (não é obrigatório, mas evita avisos).

## O que ainda é manual (ajuste fino)

O script monta a **estrutura e o esqueleto**. Estes ajustes são artísticos e
ficam por sua conta (o `GUIA_MONTAGEM.md` explica cada um):

- **Chroma key** nos clipes green screen (Efeitos_02 e Efeitos_08) — aplicar Keylight.
- **Trim / sincronia fina** de cada clipe com a batida da coreografia.
- **Track Matte do apagamento**: o script já deixa o clipe de brush no topo da
  pré-comp `COMP_09_PINCELADAS_FINAL`. Você só define, no painel Timeline, o
  **Track Matte = Luma Inverted** da camada de baixo apontando pro brush.
- Cor final e export (ideal: fechar no Premiere via Dynamic Link).

## Reexecução

Pode rodar de novo sem medo — ele cria comps novas. Se quiser recomeçar limpo,
crie um projeto novo (`File > New Project`) antes de rodar.
