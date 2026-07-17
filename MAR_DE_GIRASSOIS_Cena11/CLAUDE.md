# CLAUDE.md — Instruções para o Claude Code LOCAL operar esta cena

> Este arquivo é lido automaticamente pelo Claude Code quando aberto nesta pasta.
> Ele existe para permitir que uma sessão **local** (rodando na máquina do usuário)
> continue o trabalho de montagem da cena direto no After Effects instalado.

## Quem é você (agente local)
Você é o Claude Code rodando **na máquina do usuário** (não na nuvem). Diferente
da sessão web, aqui você TEM acesso ao sistema de arquivos local, ao terminal e
aos aplicativos instalados — incluindo o **Adobe After Effects**. Sua missão é
montar/animar a cena "Mar de Girassóis — Cena da Dança" usando os materiais e o
script já preparados nesta pasta.

O usuário fala **português**. Responda em português. Ele pode não ter experiência
com terminal — explique cada passo com clareza e confirme antes de qualquer ação
destrutiva.

## Contexto da cena (leia estes arquivos primeiro)
- `DECUPAGEM_MAPA.md` — a cena inteira em tabela: tempo → ação → material (a fonte
  da verdade sobre a ordem).
- `GUIA_MONTAGEM.md` — técnicas no AE (setup 24 fps, chroma key, linha de costura,
  efeito borracha) e a ordem de trabalho.
- `01_MATERIAIS/**/_LISTA.md` — cada pasta lista os clipes na ordem + link do Drive.
- `00_PROJETO/Montar_Cena11.jsx` — script ExtendScript que monta o projeto sozinho.

Regras fixas do projeto: **24 fps**, **1920×1080**, master ~2:30. O vídeo é
composto pelas próprias imagens das pastas (não há take base da dançarina).
Sequência elemental: cósmico → fogo → terra → água → ar → pintura/desenho.

## Fluxo de trabalho que você deve seguir

### 1. Reconhecer o ambiente
- Descubra o SO: Windows ou macOS.
- Confirme que os materiais foram baixados do Drive para `01_MATERIAIS/` (cada
  subpasta deve ter os `.mov/.mp4` além do `_LISTA.md`). Se estiver faltando
  clipe, avise o usuário e liste o que falta (compare com os `_LISTA.md`).
- Localize a instalação do After Effects:
  - **Windows:** normalmente
    `C:\Program Files\Adobe\Adobe After Effects <versão>\Support Files\AfterFX.exe`
  - **macOS:** normalmente
    `/Applications/Adobe After Effects <versão>/Adobe After Effects <versão>.app/Contents/MacOS/After Effects`
  Use busca no sistema se o caminho variar (versão muda o nome da pasta).

### 2. Rodar a montagem automática
O script `00_PROJETO/Montar_Cena11.jsx` monta tudo (importa clipes, cria 9
pré-comps na ordem, posiciona na `MASTER_Cena11`, aplica Screen, cria linha de
costura e matte de apagamento).

Duas formas de executar:

**A) Interativo (mais simples):** peça ao usuário para abrir o AE e ir em
`File > Scripts > Run Script File...` e escolher o `.jsx`; quando pedir, seleciona
a pasta `01_MATERIAIS`.

**B) Por linha de comando (você mesmo dispara):** o `.jsx` usa um diálogo de
seleção de pasta (`Folder.selectDialog`). Para rodar headless, crie uma cópia
`Montar_Cena11_auto.jsx` trocando essa linha por um caminho fixo, por exemplo:
```js
// var root = Folder.selectDialog("Selecione a pasta 01_MATERIAIS");
var root = new Folder("<CAMINHO_ABSOLUTO_ATÉ>/01_MATERIAIS");
```
Depois execute com a flag `-r` (roda um script ao abrir):
- **Windows (PowerShell):**
  ```powershell
  & "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\AfterFX.exe" -r "<caminho>\00_PROJETO\Montar_Cena11_auto.jsx"
  ```
- **macOS (Terminal):**
  ```bash
  "/Applications/Adobe After Effects 2024/Adobe After Effects 2024.app/Contents/MacOS/After Effects" -r "<caminho>/00_PROJETO/Montar_Cena11_auto.jsx"
  ```
Ajuste "2024" para a versão instalada. Salve o `.aep` em `00_PROJETO/` ao final.

> Para o AE permitir scripts sem bloqueio: `Edit/AE > Preferences > Scripting &
> Expressions >` marque **"Allow Scripts to Write Files and Access Network"**.

### 3. Ajustes artísticos (ainda manuais — guie o usuário ou faça via script)
Depois do esqueleto montado:
- **Chroma key** em `Efeitos_02` e `Efeitos_08` (green screen): aplicar Keylight
  (1.2), pegar o verde, limpar matte. Pode ser scriptado, mas o ajuste fino é visual.
- **Sincronia** de cada clipe com a batida da coreografia (trim/slip).
- **Track Matte do apagamento** na `COMP_09_PINCELADAS_FINAL`: definir a camada de
  baixo como **Luma Inverted Matte** do clipe de brush (o script já deixa o brush
  no topo).
- **Linha de costura**: conferir o traçado/zigzag e a cor (branca no bloco 07,
  vermelha no 08). Ajustar o `Trim Paths > End` se necessário.

### 4. Render / entrega
- Preferir fechar no **Premiere via Dynamic Link** para som e cor, e exportar.
- Ou renderizar direto do AE (`aerender` na CLI) para `04_EXPORTS/`. Confirme
  codec/preset com o usuário antes.

## Princípios de operação
- **Confirme antes de sobrescrever** `.aep` existentes ou apagar arquivos.
- Não mova/renomeie os materiais originais sem avisar.
- Trabalhe **bloco a bloco na ordem** (01 → 09); cada bloco herda o clima do
  anterior via transições.
- Se um passo do `.jsx` falhar (varia por versão do AE), diagnostique pelo
  console/ExtendScript Toolkit e ajuste o script — não desista do bloco.

## Como o USUÁRIO instala o Claude Code local (pré-requisito)
Se ainda não instalou, oriente:
1. Instalar **Node.js LTS** (https://nodejs.org).
2. No terminal: `npm install -g @anthropic-ai/claude-code`
3. Entrar na pasta do projeto e rodar `claude` (na primeira vez, fazer login).
   - **Windows:** abrir *PowerShell*, `cd` até a pasta `MAR_DE_GIRASSOIS_Cena11`.
   - **macOS:** abrir *Terminal*, `cd` até a pasta `MAR_DE_GIRASSOIS_Cena11`.
4. Pronto — a partir daí esta sessão local lê este `CLAUDE.md` e continua o trabalho.
