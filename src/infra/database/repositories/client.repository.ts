import { SaveClientRepositoryInterface } from '@/application/contratcs/client-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class ClientRepository implements SaveClientRepositoryInterface {
  async save (data: SaveClientRepositoryInterface.Input): Promise<void> {
    await prismaClient.client.create({ data })
  }
}
