# 🤖 TAREFA PARA CLAUDE (com acesso ao navegador) — Criar filtros automáticos no Gmail

Você é um agente com controle do Chrome. Sua tarefa é **criar 3 filtros no Gmail** da usuária
para que e-mails **novos** sejam etiquetados automaticamente. Siga este runbook à risca.

- **Conta:** admcrisia@gmail.com
- **URL:** https://mail.google.com
- **Idioma da interface:** Português (Brasil)

---

## ⚠️ REGRAS CRÍTICAS (não viole)

1. **NÃO** marque a opção **"Aplicar filtro também às conversas correspondentes"** em nenhum filtro.
   → A usuária quer que os filtros ajam **apenas em e-mails NOVOS**, não nos antigos.
2. **NÃO** apague, mova ou desmarque e-mails existentes. **Não reorganize nada antigo.**
3. **NÃO** marque "Ignorar Caixa de Entrada / Arquivar" — os e-mails devem continuar aparecendo na
   Caixa de Entrada, só que já etiquetados.
4. As **etiquetas já existem** (Exposições e Editais, Reuniões, Compras). **Não crie etiquetas novas.**
   Se alguma não aparecer na lista, pare e avise a usuária.
5. Se algo estiver diferente do descrito (tela, botão, idioma), **pare e pergunte** — não improvise.

---

## PASSO A PASSO (repita para cada um dos 3 filtros)

### Como criar um filtro no Gmail
1. Abra https://mail.google.com e confirme que está logada como **admcrisia@gmail.com**
   (canto superior direito). Se não estiver, pare e avise.
2. Clique na **barra de pesquisa** no topo.
3. Clique no ícone de **opções de pesquisa** (as barrinhas deslizantes / "Mostrar opções de pesquisa",
   à direita da barra). Abre um formulário com campos (De, Para, Assunto, Contém as palavras...).
4. No campo **"Contém as palavras"** (ou **"De"**, conforme a receita indicar), **cole a string** da receita.
5. Clique em **"Criar filtro"** (botão no canto inferior direito do formulário).
6. Na próxima tela (ações do filtro), marque **☑ "Aplicar o marcador:"** e no seletor escolha a
   etiqueta indicada na receita.
7. **CONFIRA:** a caixa **"Aplicar filtro também às N conversas correspondentes"** deve ficar
   **DESMARCADA**.
8. Clique em **"Criar filtro"** para salvar.
9. Confirme que o filtro apareceu em **Configurações → Filtros e endereços bloqueados**.

---

## AS 3 RECEITAS

### FILTRO 1 → etiqueta **Exposições e Editais**
- Campo a usar: **"Contém as palavras"**
- Colar exatamente:
```
from:(comunicacao@siga.ufrj.br OR divulgacao@siga.ufrj.br OR siga@sistemas.tic.ufrj.br) ("exposição" OR "chamada aberta" OR "open call" OR edital OR bienal OR vernissage OR "salão" OR "residência" OR curadoria OR concurso OR mostra OR portfólio OR artista)
```
- Ação: **Aplicar o marcador → Exposições e Editais**

### FILTRO 2 → etiqueta **Reuniões**
- Campo a usar: **"De"** (From)
- Colar exatamente:
```
executiveassistant@e.read.ai
```
- Ação: **Aplicar o marcador → Reuniões**
- Nota: use SÓ esse endereço. NÃO use `read.ai` genérico (o endereço `support@e.read.ai` manda
  avisos de conta/segurança que não são reunião).

### FILTRO 3 → etiqueta **Compras**
- Campo a usar: **"Contém as palavras"**
- Colar exatamente:
```
("recibo" OR "seu pedido" OR "nota fiscal" OR "pedido confirmado" OR "confirmação de compra" OR "your order" OR "order confirmation" OR receipt OR "comprovante de pagamento")
```
- Ação: **Aplicar o marcador → Compras**

---

## VERIFICAÇÃO FINAL
Após criar os 3:
1. Vá em **⚙️ (engrenagem) → Ver todas as configurações → Filtros e endereços bloqueados**.
2. Confirme que existem **3 filtros novos**, cada um com "Aplica o marcador: [etiqueta correta]".
3. Reporte à usuária: quais filtros foram criados, com qual etiqueta cada um, e confirme que
   **nenhum** foi aplicado a conversas antigas.

## SE DER PROBLEMA
- Etiqueta não aparece no seletor → pare, avise qual falta.
- Gmail em inglês → os botões equivalem a: Show search options / Create filter / Apply the label /
  "Also apply filter to matching conversations" (deixar DESMARCADO).
- Qualquer tela inesperada → pare e pergunte, não adivinhe.

---

### Contexto (para referência, não precisa agir)
- Trabalho anterior já feito manualmente: 30 avisos de arte antigos já estão em *Exposições e Editais*.
- O objetivo desta tarefa é SÓ a automação dos e-mails futuros. Não mexer no passado.
