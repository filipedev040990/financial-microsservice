## Consomir fila payments_processed

> ## Caso de sucesso

1. ✅ Consome a fila payments_processed
2. ✅ Atualiza o status da cobrança
  2.1 ✅ Se a resposta for approved, o novo status será paid
  2.2 ✅ Se a resposta for refused
    2.2.1 ✅ Se o número de tentativas for menor que 3, o status será waiting e incrementa as tentativas
    2.2.2 ✅ Se o número de tentativas for maior ou igual a 3, o status será unpaid
3. ✅ Atualiza status da charge

✅
⛔