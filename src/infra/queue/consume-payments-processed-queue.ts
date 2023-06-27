import { QueueInterface } from '@/application/contratcs/queue'
import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'
import constants from '../constants'

export class ConsumePaymentProcessedQueue {
  constructor (
    private readonly queue: QueueInterface,
    private readonly updateChargeStatusUseCase: UpdateChargeStatusUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    await this.queue.start()
    await this.queue.consume('financial_payment_processed', async (data: any) => {
      const response = JSON.parse(data.content.toString())
      if (response.status === constants.PAYMENT_STATUS_APPROVED) {
        await this.updateChargeStatusUseCase.execute({
          id: response.charge.id,
          status: constants.CHARGE_STATUS_PAID
        })
      }
    })
  }
}
