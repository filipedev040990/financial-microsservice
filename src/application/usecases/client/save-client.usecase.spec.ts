import { SaveClientRepositoryInterface } from '../../contratcs/client-repository.interface'
import { SaveClientUseCaseInterface } from '../../contratcs/save-client-usecase.interface'
import { UUIDGeneratorInterface } from '../../contratcs/uuid-generator.interface'
import { SaveClientUseCase } from './save-client.usecase'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const uuidGenerator = mock<UUIDGeneratorInterface>()
const repository = mock<SaveClientRepositoryInterface>()

describe('SaveClientUseCase', () => {
  let sut: SaveClientUseCase
  let input: SaveClientUseCaseInterface.Input

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveClientUseCase(uuidGenerator, repository)

    input = {
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber',
      birthDate: new Date('1990-01-01')
    }

    uuidGenerator.generate.mockReturnValue('anyUUID')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })

  test('should call ClientRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date()
    })
  })
})
