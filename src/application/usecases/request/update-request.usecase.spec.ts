
import { UpdateRequestUseCaseInterface } from '@/application/contratcs/update-request-usecase.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { UpdateRequestUseCase } from './update-request.usecase'
import { UpdateRequestRepositoryInterface } from '@/application/contratcs/update-request-repository.interface'

const updateRepository = mock<UpdateRequestRepositoryInterface>()

describe('UpdateRequestUseCase', () => {
  let sut: UpdateRequestUseCase
  let input: UpdateRequestUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateRequestUseCase(updateRepository)
    input = {
      id: 'any request id',
      output: 'any output',
      status: 200
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UpdateRequestRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(updateRepository.update).toHaveBeenCalledTimes(1)
    expect(updateRepository.update).toHaveBeenCalledWith({
      id: 'any request id',
      output: 'any output',
      status: 200,
      updatedAt: new Date()
    })
  })
})
