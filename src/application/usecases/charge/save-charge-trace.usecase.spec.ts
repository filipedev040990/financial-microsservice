import { SaveChargeTraceUseCaseInterface } from '@/application/contratcs/save-charge-trace-usecase.interface'
import { SaveChargeTraceUseCase } from './save-charge-trace.usecase'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { mock } from 'jest-mock-extended'

const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveChargeTraceUseCase', () => {
  let sut: SaveChargeTraceUseCase
  let input: SaveChargeTraceUseCaseInterface.Input

  beforeAll(() => {
    sut = new SaveChargeTraceUseCase(uuidGenerator)

    input = {
      chargeId: 'anyChargeId',
      status: 'anyStatus',
      createdAt: new Date()
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  test('should call uuidGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
