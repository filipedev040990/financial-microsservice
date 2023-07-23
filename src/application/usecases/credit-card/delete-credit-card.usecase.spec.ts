import { mock } from 'jest-mock-extended'
import { DeleteCardUseCase } from './delete-credit-card.usecase'
import { DeleteCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'

const cardRepository = mock<DeleteCreditCardRepositoryInterface>()

describe('DeleteCardUseCase', () => {
  let sut: DeleteCardUseCase
  let externalIdentifier: string

  beforeAll(() => {
    sut = new DeleteCardUseCase(cardRepository)
    externalIdentifier = 'anyexternalIdentifier'
  })

  test('should call CardRepository.delete once and with correct externalIdentifier', async () => {
    await sut.execute(externalIdentifier)

    expect(cardRepository.delete).toHaveBeenCalledTimes(1)
    expect(cardRepository.delete).toHaveBeenCalledWith('anyexternalIdentifier')
  })
})
