import constants from '../constants'
import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'
import { QueueInterface } from '@/application/contratcs/queue'
import { GetChargeToProcessUseCaseInterface } from '@/application/contratcs/get-charge-to-process-usecase.interface'

type EnqueuePaymentsToProcessInput = {
  client: {
    id: string
    identifier: string
    name: string
    email: string
    document: string
    birthDate: Date
    phoneNumber: string
  }
  payer: {
    id: string
    personType: string
    name: string
    email: string
    document: string
    phoneNumber: string
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
  creditCard: {
    id: string
    payerId: string
    externalIdentifier: string
  }
  charge: {
    id: string
    clientId: string
    payerId: string
    totalValue: number
    paymentMethod: string
  }
}

export class EnqueuePaymentsToProcess {
  constructor (
    private readonly getChargesToProcess: GetChargeToProcessUseCaseInterface,
    private readonly updateChargeStatus: UpdateChargeStatusUseCaseInterface,
    private readonly queue: QueueInterface
  ) {}

  async execute (): Promise<void> {
    const charges: GetChargeToProcessUseCaseInterface.Output [] | undefined = await this.getChargesToProcess.execute()

    if (charges) {
      charges.map(async (charge: GetChargeToProcessUseCaseInterface.Output) => {
        const shouldEnqueue = charge.charge.processingAttempts < constants.MAXIMUM_PROCESSING_ATTEMPTS

        if (shouldEnqueue) {
          await this.updateChargeStatus.execute({
            id: charge.charge.id,
            status: constants.CHARGE_STATUS_PROCESSING,
            processingAttempts: charge.charge.processingAttempts + 1
          })

          const payload = this.makePayloadToEnqueue(charge)

          await this.queue.start()
          await this.queue.publish(
            constants.RABBITMQ_EXCHANGE_TO_PROCESS,
            constants.RABBITMQ_ROUTING_KEY_TO_PROCESS,
            JSON.stringify(payload)
          )
        }
      })
    }
  }

  makePayloadToEnqueue (charge: GetChargeToProcessUseCaseInterface.Output): EnqueuePaymentsToProcessInput {
    return {
      charge: {
        id: charge.charge.id,
        clientId: charge.charge.clientId,
        payerId: charge.charge.payerId,
        totalValue: charge.charge.totalValue,
        paymentMethod: charge.charge.paymentMethod
      },
      client: {
        id: charge.client.id,
        identifier: charge.client.identifier,
        name: charge.client.name,
        email: charge.client.email,
        document: charge.client.document,
        birthDate: charge.client.birthDate,
        phoneNumber: charge.client.phoneNumber
      },
      payer: {
        id: charge.payer.id,
        personType: charge.payer.personType,
        name: charge.payer.name,
        email: charge.payer.email,
        document: charge.payer.document,
        phoneNumber: charge.payer.phoneNumber,
        cep: charge.payer.cep,
        street: charge.payer.street,
        number: charge.payer.number,
        complement: charge.payer.complement,
        neighborhood: charge.payer.neighborhood,
        city: charge.payer.city,
        state: charge.payer.state
      },
      creditCard: {
        id: charge.creditCard.id,
        payerId: charge.creditCard.payerId,
        externalIdentifier: charge.creditCard.externalIdentifier
      }
    }
  }
}
