## Enviar cobranças para fila de processamento

> ## Caso de sucesso

1. ⛔ Buscar cobranças com status 'waiting'
2. ⛔ Verifica se a cobrança pode ser processada (deve ter no máximo 3 tentativas de processamento)
3. ⛔ Descriptografa os dados do cartão
4. ⛔ Publica mensagem na fila payment_to_process
5. ⛔ Acrescenta tentativa de processamento na cobrança
6. ⛔ Altera status da cobrança para processing

✅
⛔