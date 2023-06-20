import { SaveChargeUseCaseInterface } from '@/application/contratcs/save-charge-usecase.interface'
import { SaveChargeUseCase } from './save-charge.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { SaveChargeRepositoryInterface } from '@/application/contratcs/charge-repository.interface'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SaveChargeRepositoryInterface>()

describe('SaveChargeUseCase', () => {
  let sut: SaveChargeUseCase
  let input: SaveChargeUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveChargeUseCase(uuidGenerator, repository)

    input = {
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call ChargeRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      clientId: 'anyClientId',
      payerId: 'anyPayerId',
      paymentMethod: 'credit_card',
      status: 'waiting',
      totalValue: 10000,
      createdAt: new Date()
    })
  })

  test('should return a chargeId on success', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('anyUUID')
  })
})
