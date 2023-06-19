import { SaveClientUseCaseInterface } from '../contratcs/save-client-usecase.interface'
import { UUIDGeneratorInterface } from '../contratcs/uuid-generator.interface'
import { SaveClientUseCase } from './save-client.usecase'
import { mock } from 'jest-mock-extended'

const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveClientUseCase', () => {
  let sut: SaveClientUseCase
  let input: SaveClientUseCaseInterface.Input

  beforeAll(() => {
    sut = new SaveClientUseCase(uuidGenerator)

    input = {
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      phoneNumber: 'anyPhoneNumber',
      birthDate: new Date('anyDate')
    }
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
