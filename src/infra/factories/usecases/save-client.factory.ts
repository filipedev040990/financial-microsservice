
import { SaveClientUseCase } from '@/application/usecases/client/save-client.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeSaveClientUseCase = (): SaveClientUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new ClientRepository()
  return new SaveClientUseCase(uuidGenerator, repository)
}
