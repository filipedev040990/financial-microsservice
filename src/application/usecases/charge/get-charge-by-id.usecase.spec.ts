import { mock } from 'jest-mock-extended'
import { GetChargeByIdUseCase } from './get-charge-by-id.usecase'
import { GetChargeByIdRepositoryInterface } from '@/application/contratcs/charge-repository.interface'

const repository = mock<GetChargeByIdRepositoryInterface>()
const id: string = 'anyId'

describe('GetChargeByIdUseCase', () => {
  let sut: GetChargeByIdUseCase

  beforeAll(() => {
    sut = new GetChargeByIdUseCase(repository)
    repository.getById.mockResolvedValue({
      id: 'anyChargeId',
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000,
      createdAt: new Date('2023-01-01 00:00:00'),
      updatedAt: null,
      processingAttempts: 1
    })
  })

  test('should call ChargeRepository.getById once and with correct id', async () => {
    await sut.execute(id)

    expect(repository.getById).toHaveBeenCalledTimes(1)
    expect(repository.getById).toHaveBeenCalledWith('anyId')
  })

  test('should return undefined if ChargeRepository.getById returns undefined', async () => {
    repository.getById.mockResolvedValueOnce(undefined as any)

    const output = await sut.execute(id)

    expect(output).toBeUndefined()
  })

  test('should return a Charge', async () => {
    const output = await sut.execute(id)

    expect(output).toEqual({
      id: 'anyChargeId',
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000,
      createdAt: new Date('2023-01-01 00:00:00'),
      updatedAt: null,
      processingAttempts: 1
    })
  })
})
