import { SaveChargeTraceRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class ChargeTraceRepository implements SaveChargeTraceRepositoryInterface {
  async saveTrace (data: SaveChargeTraceRepositoryInterface.Input): Promise<void> {
    await prismaClient.chargeTrace.create({ data })
  }
}
