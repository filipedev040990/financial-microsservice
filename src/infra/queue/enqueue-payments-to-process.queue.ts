import { GetChargeByStatusUseCaseInterface } from '@/application/contratcs/get-charge-by-status-usecase.interface'
import constants from '../constants'
import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'
import { QueueInterface } from '@/application/contratcs/queue'

export class EnqueuePaymentsToProcess {
  constructor (
    private readonly getChargeByStatus: GetChargeByStatusUseCaseInterface,
    private readonly updateChargeStatus: UpdateChargeStatusUseCaseInterface,
    private readonly queue: QueueInterface
  ) {}

  async execute (): Promise<void> {
    const charges = await this.getChargeByStatus.execute(constants.CHARGE_STATUS_WAITING)

    if (charges) {
      charges.map(async (charge) => {
        const shouldEnqueue = charge.processingAttempts < constants.MAXIMUM_PROCESSING_ATTEMPTS

        if (shouldEnqueue) {
          await this.updateChargeStatus.execute({
            id: charge.id,
            status: constants.CHARGE_STATUS_PROCESSING
          })
        }
      })
    }
  }
}
