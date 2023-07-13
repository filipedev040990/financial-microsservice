const config = {
  rabbitmq: {
    exchanges: [{
      name: 'payments',
      bindQueues: ['financial_payments_processed'],
      routingKey: 'payments_processed'
    }, {
      name: 'payments',
      bindQueues: ['payment_to_process'],
      routingKey: 'payment_to_process'
    }],
    uri: 'amqp://admin:admin@rabbitmq:5672'
  },
  cache: {
    cardEncryptorKey: 'cardEncryptorToken',
    cardEncryptorTtl: 24 * 60 * 60
  },
  application: {
    appId: '27621c52-bfcb-4428-bd25-026ff0cf1209',
    secretKey: 'financial-microsservice'
  }
}

export { config }
