import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { config } from '@/infra/config'
import { ConsumePaymentProcessedQueue } from '@/infra/queue/consume-payments-processed.queue'
import { makeUpdateChargeStatusUseCase } from '../usecases/update-charge-status.factory'
import { makeGetChargeByIdUseCase } from '../usecases/get-charge-by-id.factory'
import { makeDeleteCardExternalUseCase } from '../usecases/delete-card-external.factory'
import { makeGetTokenUseCase } from '../usecases/get-token.factory'

export const makeConsumePaymentsProcesseds = (): ConsumePaymentProcessedQueue => {
  const queue = new RabbitmqAdapter(config.rabbitmq.uri)
  const getChargeByIdRepository = makeGetChargeByIdUseCase()
  const updateChargeStatusUseCase = makeUpdateChargeStatusUseCase()
  const getTokenUseCase = makeGetTokenUseCase()
  const deleteCardExternalUseCase = makeDeleteCardExternalUseCase()
  return new ConsumePaymentProcessedQueue(queue, getChargeByIdRepository, updateChargeStatusUseCase, getTokenUseCase, deleteCardExternalUseCase)
}
