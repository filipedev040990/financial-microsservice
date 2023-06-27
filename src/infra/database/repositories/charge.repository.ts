import { SaveChargeRepositoryInterface, UpdateChargeStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class ChargeRepository implements SaveChargeRepositoryInterface, UpdateChargeStatusRepositoryInterface {
  async save (data: SaveChargeRepositoryInterface.Input): Promise<void> {
    await prismaClient.charge.create({ data })
  }

  async updateStatus (input: UpdateChargeStatusRepositoryInterface.Input): Promise<void> {
    await prismaClient.charge.update({
      data: {
        status: input.status,
        updatedAt: input.updatedAt
      },
      where: {
        id: input.id
      }
    })
  }
}
