import { GetChargeByIdRepositoryInterface, GetChargeToProcessRepositoryInterface, SaveChargeRepositoryInterface, UpdateChargeStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { prismaClient } from '../prisma-client.repository'

export class ChargeRepository implements SaveChargeRepositoryInterface, UpdateChargeStatusRepositoryInterface, GetChargeByIdRepositoryInterface, GetChargeToProcessRepositoryInterface {
  async save (data: SaveChargeRepositoryInterface.Input): Promise<void> {
    await prismaClient.charge.create({ data })
  }

  async updateStatus (input: UpdateChargeStatusRepositoryInterface.Input): Promise<void> {
    await prismaClient.charge.update({
      data: {
        status: input.status,
        updatedAt: input.updatedAt,
        processingAttempts: input.processingAttempts
      },
      where: {
        id: input.id
      }
    })
  }

  async getById (id: string): Promise<GetChargeByIdRepositoryInterface.Output | undefined> {
    const charge = await prismaClient.charge.findUnique({
      where: { id }
    })

    return charge ?? undefined
  }

  async getToProcess (status: string): Promise<GetChargeToProcessRepositoryInterface.Output[] | undefined> {
    const output: GetChargeToProcessRepositoryInterface.Output [] = []

    const charges = await prismaClient.charge.findMany({
      select: {
        id: true,
        clientId: true,
        payerId: true,
        totalValue: true,
        paymentMethod: true,
        processingAttempts: true,
        client: {
          select: {
            id: true,
            identifier: true,
            name: true,
            email: true,
            document: true,
            birthDate: true,
            phoneNumber: true
          }
        },
        payer: {
          select: {
            id: true,
            personType: true,
            name: true,
            email: true,
            document: true,
            phoneNumber: true,
            cep: true,
            street: true,
            number: true,
            complement: true,
            neighborhood: true,
            city: true,
            state: true,
            CreditCard: {
              select: {
                id: true,
                payerId: true,
                encryptedData: true
              }
            }
          }
        }
      },
      where: {
        status
      }
    })

    if (charges) {
      charges.map((res) => {
        output.push({
          charge: {
            id: res.id,
            clientId: res.clientId,
            payerId: res.payerId,
            totalValue: res.totalValue,
            paymentMethod: res.paymentMethod,
            processingAttempts: res.processingAttempts
          },
          client: res.client,
          payer: {
            id: res.payer.id,
            personType: res.payer.personType,
            name: res.payer.name,
            email: res.payer.email,
            document: res.payer.document,
            phoneNumber: res.payer.phoneNumber,
            cep: res.payer.cep,
            street: res.payer.street,
            number: res.payer.number,
            complement: res.payer.complement ?? undefined,
            neighborhood: res.payer.neighborhood,
            city: res.payer.city,
            state: res.payer.state
          },
          creditCard: {
            id: res.payer.CreditCard!.id,
            payerId: res.payer.CreditCard!.payerId,
            encryptedData: res.payer.CreditCard!.encryptedData
          }
        })
        return output
      })
    }

    return output.length ? output : undefined
  }
}
