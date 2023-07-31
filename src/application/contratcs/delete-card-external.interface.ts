export interface DeleteCardExternalInterface {
  execute(externalIdentifier: string, token: string): Promise<void>
}
