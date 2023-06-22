
import { SaveRequestRepositoryInterface } from '@/application/contratcs/save-request-repository.interface'
import { SaveRequestUseCaseInterface } from '@/application/contratcs/save-request-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { SaveRequestUseCase } from './save-request.usecase'

const requestRepository = mock<SaveRequestRepositoryInterface>()
const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveRequestUseCase', () => {
  let sut: SaveRequestUseCase
  let input: SaveRequestUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new SaveRequestUseCase(uuidGenerator, requestRepository)
    input = {
      path: 'any url',
      input: '{any input}',
      method: 'any method'
    }
    uuidGenerator.generate.mockReturnValue('any id')
    requestRepository.save.mockResolvedValue('any request id')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LogRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(requestRepository.save).toHaveBeenCalledTimes(1)
    expect(requestRepository.save).toHaveBeenCalledWith({
      id: 'any id',
      path: 'any url',
      input: '{any input}',
      method: 'any method',
      createdAt: new Date()
    })
  })

  test('should return a request id correctly', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('any request id')
  })
})
