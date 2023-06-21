import { SaveCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class CreditCardRepository implements SaveCreditCardRepositoryInterface {
  async save (data: SaveCreditCardRepositoryInterface.Input): Promise<void> {
    await prismaClient.creditCard.create({ data })
  }
}
