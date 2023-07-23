export interface DeleteCardInterface {
  execute(externalIdentifier: string): Promise<void>
}
