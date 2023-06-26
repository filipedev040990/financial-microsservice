const config = {
  rabbitmq: {
    exchange: [{
      name: 'payments',
      bindQueues: ['payments_processed'],
      routingKey: 'payments_processed'
    }, {
      name: 'payments',
      bindQueues: ['payment_to_process'],
      routingKey: 'payment_to_process'
    }]
  }
}

export { config }
