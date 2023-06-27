import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { config } from '@/infra/config'
import { ConsumePaymentProcessedQueue } from '@/infra/queue/consume-payments-processed-queue'
import { makeUpdateChargeStatusUseCase } from '../usecases/update-charge-status.factory'

export const makeConsumePaymentsProcesseds = (): ConsumePaymentProcessedQueue => {
  const queue = new RabbitmqAdapter(config.rabbitmq.uri)
  const updateChargeStatusUseCase = makeUpdateChargeStatusUseCase()
  return new ConsumePaymentProcessedQueue(queue, updateChargeStatusUseCase)
}
