# 📧 Organização Automática do Gmail — Guia de Execução

> **Objetivo:** configurar **filtros automáticos** no Gmail para que **e-mails novos** já cheguem
> etiquetados sozinhos, sem marcação manual. Foco em e-mails **novos** — não reorganizar os antigos.
>
> **Conta:** admcrisia@gmail.com
> **Onde executar:** Gmail no navegador (Chrome) — `https://mail.google.com`

---

## 1. Contexto / o que já foi feito

- As etiquetas já existem e algumas já foram povoadas manualmente. **Não precisa recriar etiquetas.**
- O que falta é a parte **automática**: criar as **regras (filtros)** para o Gmail classificar sozinho o que chega.
- Filtro do Gmail, por padrão, só afeta **e-mails futuros** — que é exatamente o que a Crisia quer.
  Basta **NÃO** marcar a opção "aplicar também às conversas correspondentes".

### Etiquetas existentes (referência)
| Etiqueta | Uso | ID interno (API) |
|---|---|---|
| **Exposições e Editais** | Open calls, editais, chamadas, bienais, exposições, prêmios, residências, festivais de arte | `Label_8` |
| **Reuniões** | Relatórios de reunião do Read AI | `Label_7` |
| **Compras** | Recibos, pedidos, notas fiscais | `Label_3` |
| Estudos | Monte antigo/geral (não usar nos filtros novos) | `Label_1` |
| Trabalho | — | `Label_2` |

---

## 2. Como criar um filtro (passo a passo genérico)

Vale para **todas** as receitas abaixo:

1. Abra o Gmail no Chrome: `https://mail.google.com`
2. Na **barra de pesquisa** do topo, cole a **string de busca** da receita.
3. Clique no ícone de **opções de pesquisa / filtro** (as barrinhas deslizantes à direita da barra).
   - *Alternativa:* aperte Enter na busca, veja os resultados e clique em **"Criar filtro"** no rodapé do painel.
4. Na caixa que abre, confira os campos e clique em **"Criar filtro"**.
5. Marque **☑ Aplicar o marcador:** e escolha a etiqueta correta (ex.: *Exposições e Editais*).
6. *(Opcional)* Marque também **☑ Marcar como importante** ou **☑ Nunca enviar para Spam**, se quiser.
7. ⚠️ **NÃO** marque **"Aplicar filtro também às X conversas correspondentes"**
   → assim o filtro age **só nos e-mails novos**.
8. Clique em **"Criar filtro"**. Pronto — fica automático pra sempre.

> 💡 **Atalho:** abrir um e-mail do tipo desejado → menu **⋮** (três pontinhos, topo do e-mail) →
> **"Filtrar mensagens como estas"** → o Gmail já preenche o remetente.

---

## 3. As receitas (copiar e colar na busca)

### 🎨 Filtro A — Exposições e Editais (remetentes de arte confiáveis) — **RECOMENDADO**
Cobre as fontes que historicamente mandam chamadas/exposições de arte para a Crisia:

```
from:(comunicacao@siga.ufrj.br OR divulgacao@siga.ufrj.br OR siga@sistemas.tic.ufrj.br OR newsletter@file.org.br OR hello@uaad.art OR labarteciencia@gmail.com OR artesobrepapelebaufrj@gmail.com OR dac@eba.ufrj.br OR instituto.ling@institutoling.org.br)
```
→ Aplicar marcador: **Exposições e Editais**

> ⚠️ Observação: `comunicacao@siga.ufrj.br` e `siga@sistemas.tic.ufrj.br` também mandam avisos
> **não-artísticos** (saúde, esporte, monitoria). Se quiser evitar que esses entrem, use o **Filtro A+**
> abaixo em vez do A.

### 🎨 Filtro A+ — versão mais precisa (remetente de arte **E** palavra-chave de arte)
Reduz falso-positivo dos remetentes institucionais mistos:

```
from:(comunicacao@siga.ufrj.br OR divulgacao@siga.ufrj.br OR siga@sistemas.tic.ufrj.br) ("exposição" OR "chamada aberta" OR "open call" OR edital OR bienal OR vernissage OR "salão" OR "residência" OR curadoria OR concurso OR mostra OR portfólio OR artista)
```
→ Aplicar marcador: **Exposições e Editais**

### 🎨 Filtro A++ — capturar open calls de qualquer remetente (opcional, mais amplo)
Pega oportunidades de arte mesmo de remetentes novos/desconhecidos. Pode gerar algum falso-positivo:

```
subject:("open call" OR "chamada aberta" OR "chamada para artistas" OR "edital de" OR bienal OR vernissage OR "salão de arte" OR "residência artística")
```
→ Aplicar marcador: **Exposições e Editais**

> Sugestão: comece com **A+** (preciso). Se sentir que está perdendo oportunidades externas,
> adicione o **A++**.

---

### 🤝 Filtro B — Reuniões (relatórios do Read AI) — ✅ REMETENTE CONFIRMADO
Os relatórios de reunião do Read AI vêm **todos** de `executiveassistant@e.read.ai`:

```
from:(executiveassistant@e.read.ai)
```
→ Aplicar marcador: **Reuniões**

> ⚠️ **NÃO usar `from:(read.ai)` genérico.** O Read AI usa outro endereço,
> `support@e.read.ai`, só para avisos de conta/segurança (login novo, reautorizar integração) —
> esses **não** são reunião e devem ir para *Segurança*, não para *Reuniões*.
> Por isso o filtro mira só o `executiveassistant@e.read.ai`.
>
> Reforço opcional por assunto (redundante, mas seguro):
> `from:(executiveassistant@e.read.ai) OR subject:("Read Meeting Report" OR "Relatório de Reunião Read")`

---

### 🛒 Filtro C — Compras (recibos / pedidos)

```
("recibo" OR "seu pedido" OR "nota fiscal" OR "pedido confirmado" OR "confirmação de compra" OR "your order" OR "order confirmation" OR receipt OR "comprovante de pagamento")
```
→ Aplicar marcador: **Compras**

---

## 4. Ajustes finos a confirmar antes de criar

- [x] **Endereço exato do Read AI:** ✅ confirmado = `executiveassistant@e.read.ai`
      (avisos de conta vêm de `support@e.read.ai` → deixar fora de *Reuniões*).
- [ ] **Remetentes de arte recorrentes** que faltem na lista do Filtro A (adicionar dentro do `from:( ... OR ... )`).
- [ ] Decidir entre **Filtro A** (simples) vs **A+** (preciso) para Exposições e Editais.
- [ ] Se quiser que os itens etiquetados **saiam da Caixa de Entrada** automaticamente, marcar também
      **☑ Ignorar a Caixa de Entrada (Arquivar)** no passo 6 — **por padrão, deixar DESMARCADO**
      (a Crisia quer continuar vendo na entrada, só que já etiquetado).

---

## 5. Checklist de execução no Chrome

- [ ] Criar **Filtro A ou A+** → etiqueta *Exposições e Editais*
- [ ] Criar **Filtro B** → etiqueta *Reuniões* (após confirmar remetente Read AI)
- [ ] Criar **Filtro C** → etiqueta *Compras*
- [ ] Em cada um: **NÃO** aplicar às conversas antigas
- [ ] Testar: mandar/esperar um e-mail novo de cada tipo e verificar se caiu na etiqueta

---

## 6. Regra de ouro
**Não reorganizar e-mails antigos.** O objetivo é só a **classificação automática dos novos**.
Os antigos já organizados (30 avisos de arte em *Exposições e Editais*) ficam como estão.
