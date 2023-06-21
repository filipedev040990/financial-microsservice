import { SaveChargeRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class ChargeRepository implements SaveChargeRepositoryInterface {
  async save (data: SaveChargeRepositoryInterface.Input): Promise<void> {
    await prismaClient.charge.create({ data })
  }
}
