import { DeleteCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { DeleteCardInterface } from '@/application/contratcs/delete-card.interface'

export class DeleteCardUseCase implements DeleteCardInterface {
  constructor (private readonly cardRepository: DeleteCreditCardRepositoryInterface) {}
  async execute (externalIdentifier: string): Promise<void> {
    await this.cardRepository.delete(externalIdentifier)
  }
}
