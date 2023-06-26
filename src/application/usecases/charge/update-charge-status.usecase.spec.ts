import { UpdateChargeStatusUseCaseInterface } from '@/application/contratcs/update-charge-status-usecase.interface'
import { UpdateChargeStatusUseCase } from './update-charge-status.usecase'
import { UpdateChargeStatusRepositoryInterface } from '@/application/contratcs/charge-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const repository = mock<UpdateChargeStatusRepositoryInterface>()

describe('UpdateChargeStatusUseCase', () => {
  let sut: UpdateChargeStatusUseCase
  let input: UpdateChargeStatusUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateChargeStatusUseCase(repository)

    input = {
      id: 'anyChargeId',
      status: 'anyStatus'
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call ChargeRepository.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.updateStatus).toHaveBeenCalledTimes(1)
    expect(repository.updateStatus).toHaveBeenCalledWith({
      id: 'anyChargeId',
      status: 'anyStatus',
      updatedAt: new Date()
    })
  })
})
