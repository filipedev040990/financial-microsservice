import { SavePayerRepositoryInterface } from '@/application/contratcs/payer-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class PayerRepository implements SavePayerRepositoryInterface {
  async save (data: SavePayerRepositoryInterface.Input): Promise<void> {
    await prismaClient.payer.create({ data })
  }
}
