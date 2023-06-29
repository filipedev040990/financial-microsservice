import { QueueInterface } from '@/application/contratcs/queue'
import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'
import constants from '../constants'
import { GetChargeByIdUseCaseInterface } from '@/application/contratcs/get-charge-by-id-usecase.interface'

export class ConsumePaymentProcessedQueue {
  constructor (
    private readonly queue: QueueInterface,
    private readonly getChargeById: GetChargeByIdUseCaseInterface,
    private readonly updateChargeStatusUseCase: UpdateChargeStatusUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    await this.queue.start()
    await this.queue.consume('financial_payment_processed', async (data: any) => {
      const response = JSON.parse(data.content.toString())
      const charge = await this.getChargeById.execute(response.charge.id)

      if (charge) {
        let newStatus = constants.CHARGE_STATUS_PAID

        if (response.status === constants.PAYMENT_STATUS_REFUSED) {
          if (charge.processingAttempts < constants.MAXIMUM_PROCESSING_ATTEMPTS) {
            newStatus = constants.CHARGE_STATUS_WAITING
          } else {
            newStatus = constants.CHARGE_STATUS_UNPAID

            const message = {
              subject: constants.UNCONFIRMED_PAYMENT_NOTIFICATION_SUBJECT,
              to: response.client.email,
              body: `Olá, ${response.client.name as string} tudo bem? Cobrança recusada pela operadora de cartão referente à compra do seu curso. <br> Motivo: <br> ${response.reason as string}.<br> Tente realizar um novo pagamento.`
            }

            await this.queue.publish(
              constants.RABBITMQ_EXCHANGE_TO_PROCESS,
              constants.RABBITMQ_ROUTING_NOTIFICATION,
              JSON.stringify(message)
            )
          }
        }

        await this.updateChargeStatusUseCase.execute({
          id: charge.id,
          status: newStatus
        })
      }
    })
  }
}
