import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { SaveChargeTraceUseCase } from './save-charge-trace.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { SaveChargeTraceRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SaveChargeTraceRepositoryInterface>()

describe('SaveChargeTraceUseCase', () => {
  let sut: SaveChargeTraceUseCase
  let input: SaveChargeTraceUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new SaveChargeTraceUseCase(uuidGenerator, repository)

    input = {
      chargeId: 'anyChargeId',
      status: 'anyStatus'
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

  test('should call ChargeRepository.saveTrace once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.saveTrace).toHaveBeenCalledTimes(1)
    expect(repository.saveTrace).toHaveBeenCalledWith({
      id: 'anyUUID',
      chargeId: 'anyChargeId',
      status: 'anyStatus',
      createdAt: new Date()
    })
  })
})
