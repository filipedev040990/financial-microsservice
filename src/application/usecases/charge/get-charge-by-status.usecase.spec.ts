import { mock } from 'jest-mock-extended'
import { GetChargeByStatusUseCase } from './get-charge-by-status.usecase'
import { GetChargeByStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'

const repository = mock<GetChargeByStatusRepositoryInterface>()
const status: string = 'anyStatus'

describe('GetChargeByStatusUseCase', () => {
  let sut: GetChargeByStatusUseCase

  beforeAll(() => {
    sut = new GetChargeByStatusUseCase(repository)
    repository.getByStatus.mockResolvedValue([{
      id: 'anyChargeId',
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000,
      createdAt: new Date('2023-01-01 00:00:00'),
      updatedAt: null,
      processingAttempts: 1
    }])
  })

  test('should call ChargeRepository.getByStatus once and with correct id', async () => {
    await sut.execute(status)

    expect(repository.getByStatus).toHaveBeenCalledTimes(1)
    expect(repository.getByStatus).toHaveBeenCalledWith('anyStatus')
  })

  test('should return undefined if ChargeRepository.getByStatus returns undefined', async () => {
    repository.getByStatus.mockResolvedValueOnce(undefined as any)

    const output = await sut.execute(status)

    expect(output).toBeUndefined()
  })

  test('should return a Charge', async () => {
    const output = await sut.execute(status)

    expect(output).toEqual([{
      id: 'anyChargeId',
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000,
      createdAt: new Date('2023-01-01 00:00:00'),
      updatedAt: null,
      processingAttempts: 1
    }])
  })
})
