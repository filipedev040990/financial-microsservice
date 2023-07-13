import { SaveCardExternal } from '@/application/usecases/credit-card/save-external.usecase'

export const makeSaveCardExternalUseCase = (): SaveCardExternal => {
  return new SaveCardExternal()
}
