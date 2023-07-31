import { DeleteCardExternal } from '@/application/usecases/credit-card/delete-external.usecase'

export const makeDeleteCardExternalUseCase = (): DeleteCardExternal => {
  return new DeleteCardExternal()
}
