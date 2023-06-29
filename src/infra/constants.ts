export default {
  CHARGE_STATUS_WAITING: 'waiting',
  CHARGE_STATUS_CREATED: 'created',
  CHARGE_STATUS_PAID: 'paid',
  CHARGE_STATUS_PROCESSING: 'processing',
  CHARGE_STATUS_UNPAID: 'unpaid',
  PAYMENT_STATUS_APPROVED: 'approved',
  PAYMENT_STATUS_REFUSED: 'refused',
  MAXIMUM_PROCESSING_ATTEMPTS: 3,
  RABBITMQ_EXCHANGE_TO_PROCESS: 'payments',
  RABBITMQ_ROUTING_KEY_TO_PROCESS: 'payment_to_process',
  RABBITMQ_URI: 'amqp://admin:admin@rabbitmq:5672'
}
