# Cadastrar um novo cliente

> ## Caso de sucesso

1. ⛔ Salva os dados do cliente
2. ⛔ Salva os dados do pagador
3. ⛔ Salva os dados do cartão de crédito
4. ⛔ Salva os dados da cobrança
5. ⛔ Registra log
6. ⛔ Registra trace da charge
7. ⛔ Retorna status 201

> ## Exceções
6. ⛔ Retorna 400 se o nome do cliente não for fornecido
7. ⛔ Retorna 400 se o email do cliente não for fornecido
8. ⛔ Retorna 400 se a data de nascimento do cliente não for fornecido
9. ⛔ Retorna 400 se numero de telefone do cliente não for fornecido


10. ⛔ Retorna 400 se o tipo de pessoa do pagador não for fornecido
11. ⛔ Retorna 400 se o nome do pagador não for fornecido
12. ⛔ Retorna 400 se o email do pagador não for fornecido
13. ⛔ Retorna 400 se o documento do pagador não for fornecido
14. ⛔ Retorna 400 se o telefone do pagador não for fornecido
15. ⛔ Retorna 400 se o cep do pagador não for fornecido
16. ⛔ Retorna 400 se o logradouro do pagador não for fornecido
17. ⛔ Retorna 400 se o numero do pagador não for fornecido
18. ⛔ Retorna 400 se o bairro do pagador não for fornecido
19. ⛔ Retorna 400 se a cidade do pagador não for fornecido
20. ⛔ Retorna 400 se o estado do pagador não for fornecido


21. ⛔ Retorna 400 se o nome do titular do cartão de crédito não for fornecido
22. ⛔ Retorna 400 se o número do cartão de crédito não for fornecido
23. ⛔ Retorna 400 se o mês de vencimento do cartão de crédito não for fornecido
24. ⛔ Retorna 400 se o ano de vencimento do cartão de crédito não for fornecido
25. ⛔ Retorna 400 se o cvv de vencimento do cartão de crédito não for fornecido

26. ⛔ Retorna 400 se o número de parcelas não for fornecido

27. ⛔ Retorna 500 se houver alguma falha ao salvar os dados


## Objeto client
{
  id: string
  identifier: string
  name: string
  email: string
  document: string
  birthDate: Date
  phoneNumber: string
  createdAt: Date
  updatedAt?: Date
}

## Objeto payer
{
  id string
  personType: string
  name: string
  email: string
  document: string
  phoneNumber: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  createdAt: Date
  updatedAt?: Date
}

## Objeto creditCard
{
  id: string
  identifier: string (pode ser um uuid)
  holderName: string
  brand: string
  monthExpiration: string
  yearExpiration: string
  cvv: string
  sentToPciSecurityMicroService: boolean
  createdAt: Date

  ** Neste microsserviço devem ser armazenado apenas:
      máscara do número do cartão (123456XXXXXX1234)
      expiration (2023-12)
      brand

  ** As outras informações devem ser criptografadas e salvas em um microsserviço a parte
}

## Objeto charges
{
  id: string
  clientId: string
  payerId: string
  status: string (waiting, paid, unpaid)
  totalValue: number
  paymentMethod: string
  paidAt: Date
  unpaidAt: Date
  createdAt: Date
}

✅
⛔