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
  }
}

export { config }
