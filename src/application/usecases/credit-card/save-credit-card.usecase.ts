import { SaveCreditCardRepositoryInterface } from '@/application/contratcs/credit-card-repository.interface'
import { SaveCreditCardUseCaseInterface } from '@/application/contratcs/save-credit-card-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'

export class SaveCreditCardUseCase implements SaveCreditCardUseCaseInterface {
  constructor (
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: SaveCreditCardRepositoryInterface
  ) {}

  async execute (input: SaveCreditCardUseCaseInterface.Input): Promise<string> {
    const number = input.number
    const identifier = this.identifierGenerator()

    await this.repository.save({
      id: this.uuidGenerator.generate(),
      identifier,
      brand: input.brand,
      number: `${number.substring(0, 6)}XXXXXX${number.slice(number.length - 4)}`,
      expiration: `${input.yearExpiration}-${input.monthExpiration}`,
      createdAt: new Date()
    })

    return identifier
  }

  private identifierGenerator (): string {
    const max: number = 5
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789'
    let str: string = ''

    for (let i = 0; i <= max; i++) {
      str += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const timeStamp = new Date().getTime()
    return `${str}-${timeStamp}`
  }
}
