
import { SaveCreditCardUseCase } from '@/application/usecases/credit-card/save-credit-card.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { CreditCardRepository } from '@/infra/database/repositories/credit-card.repository'

export const makeSaveCreditCardUseCase = (): SaveCreditCardUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new CreditCardRepository()
  return new SaveCreditCardUseCase(uuidGenerator, repository)
}
