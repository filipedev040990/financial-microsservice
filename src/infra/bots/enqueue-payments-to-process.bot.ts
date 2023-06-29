import schedule from 'node-schedule'
import { EnqueuePaymentsToProcess } from '../queue/enqueue-payments-to-process.queue'
import { makeGetChargesToProcessUseCase } from '../factories/usecases/get-charge-to-process.factory'
import { makeUpdateChargeStatusUseCase } from '../factories/usecases/update-charge-status.factory'
import { RabbitmqAdapter } from '../adapters/rabbitmq.adapter'
import constants from '../constants'

const enqueuePaymentsToProcess = (): void => {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const getChargesToProcessUseCase = makeGetChargesToProcessUseCase()
    const updateChargeStatusUseCase = makeUpdateChargeStatusUseCase()
    const queue = new RabbitmqAdapter(constants.RABBITMQ_URI)
    const job = new EnqueuePaymentsToProcess(getChargesToProcessUseCase, updateChargeStatusUseCase, queue)
    await job.execute()
  })
}

export { enqueuePaymentsToProcess }
